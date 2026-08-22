/**
 * High-efficiency browser DOCX parser (plain JavaScript).
 * DOCX = ZIP of OOXML. Reads the ZIP central directory once, inflates only
 * needed entries, then extracts paragraph text with a single-pass scanner
 * (no full DOM tree).
 */
(function (global) {
  "use strict";

  var BuildCV = (global.BuildCV = global.BuildCV || {});
  var TD = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8") : null;

  var SIG_LOCAL = 0x04034b50;
  var SIG_CENTRAL = 0x02014b50;
  var SIG_EOCD = 0x06054b50;
  var METHOD_STORE = 0;
  var METHOD_DEFLATE = 8;
  var FLAG_UTF8 = 0x800;

  /* ---------- helpers ---------- */

  function decodeUtf8(bytes) {
    if (!TD) throw new Error("TextDecoder is required to read DOCX files.");
    return TD.decode(bytes);
  }

  function decodeName(bytes, utf8) {
    if (utf8 && TD) return TD.decode(bytes);
    var s = "";
    for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    try {
      return decodeURIComponent(escape(s));
    } catch (e) {
      return s;
    }
  }

  function u16(view, offset) {
    return view.getUint16(offset, true);
  }

  function u32(view, offset) {
    return view.getUint32(offset, true);
  }

  /* ---------- ZIP (central-directory based) ---------- */

  /**
   * Locate End of Central Directory. Scans backward from EOF — comment ≤ 64 KiB.
   */
  function findEocd(view, length) {
    var min = Math.max(0, length - 65557);
    for (var i = length - 22; i >= min; i--) {
      if (u32(view, i) === SIG_EOCD) {
        var commentLen = u16(view, i + 20);
        if (i + 22 + commentLen <= length) return i;
      }
    }
    throw new Error("Invalid DOCX: ZIP end-of-central-directory not found.");
  }

  /**
   * Build a name → entry map from the central directory (O(entries)).
   */
  function readCentralDirectory(buffer) {
    var view = new DataView(buffer);
    var bytes = new Uint8Array(buffer);
    var eocd = findEocd(view, bytes.length);
    var entryCount = u16(view, eocd + 10);
    var cdSize = u32(view, eocd + 12);
    var cdOffset = u32(view, eocd + 16);

    if (cdOffset + cdSize > bytes.length) {
      throw new Error("Invalid DOCX: central directory is truncated.");
    }

    var map = Object.create(null);
    var offset = cdOffset;
    var end = cdOffset + cdSize;

    for (var n = 0; n < entryCount && offset + 46 <= end; n++) {
      if (u32(view, offset) !== SIG_CENTRAL) {
        throw new Error("Invalid DOCX: corrupt central directory.");
      }
      var flags = u16(view, offset + 8);
      var method = u16(view, offset + 10);
      var compSize = u32(view, offset + 20);
      var uncompSize = u32(view, offset + 24);
      var nameLen = u16(view, offset + 28);
      var extraLen = u16(view, offset + 30);
      var commentLen = u16(view, offset + 32);
      var localOffset = u32(view, offset + 42);
      var nameBytes = bytes.subarray(offset + 46, offset + 46 + nameLen);
      var name = decodeName(nameBytes, !!(flags & FLAG_UTF8)).replace(/\\/g, "/");

      map[name] = {
        name: name,
        flags: flags,
        method: method,
        compSize: compSize,
        uncompSize: uncompSize,
        localOffset: localOffset
      };

      offset += 46 + nameLen + extraLen + commentLen;
    }

    return map;
  }

  /**
   * Inflate a Deflate-raw payload via the browser DecompressionStream API.
   */
  async function inflateRaw(compressed) {
    if (typeof DecompressionStream === "undefined") {
      throw new Error("This browser cannot decompress DOCX files (DecompressionStream missing).");
    }
    var stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  /**
   * Extract one ZIP entry by central-directory metadata (handles data descriptors).
   */
  async function extractEntry(buffer, entry) {
    var view = new DataView(buffer);
    var bytes = new Uint8Array(buffer);
    var lo = entry.localOffset;

    if (lo + 30 > bytes.length || u32(view, lo) !== SIG_LOCAL) {
      throw new Error("Invalid DOCX: local file header missing for " + entry.name);
    }

    var nameLen = u16(view, lo + 26);
    var extraLen = u16(view, lo + 28);
    var dataStart = lo + 30 + nameLen + extraLen;
    var compSize = entry.compSize;

    if (dataStart + compSize > bytes.length) {
      throw new Error("Invalid DOCX: compressed data truncated for " + entry.name);
    }

    var compressed = bytes.subarray(dataStart, dataStart + compSize);

    if (entry.method === METHOD_STORE) {
      return compressed.slice();
    }
    if (entry.method === METHOD_DEFLATE) {
      return inflateRaw(compressed);
    }
    throw new Error("Unsupported DOCX compression method (" + entry.method + ").");
  }

  /**
   * Inflate selected entries in parallel using an existing central-directory map.
   */
  async function extractPaths(buffer, map, paths) {
    var out = Object.create(null);
    var jobs = [];

    for (var i = 0; i < paths.length; i++) {
      (function (path) {
        var entry = map[path];
        if (!entry) return;
        jobs.push(
          extractEntry(buffer, entry).then(function (data) {
            out[path] = data;
          })
        );
      })(paths[i]);
    }

    await Promise.all(jobs);
    return out;
  }

  /**
   * Read named entries from a DOCX ArrayBuffer. Only requested paths are inflated.
   */
  async function unzipDocx(buffer, paths) {
    return extractPaths(buffer, readCentralDirectory(buffer), paths);
  }

  /* ---------- OOXML text extraction (single-pass) ---------- */

  var ENTITY_MAP = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'"
  };

  function decodeEntities(str) {
    if (str.indexOf("&") === -1) return str;
    return str.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, function (_, body) {
      if (body.charAt(0) === "#") {
        var code =
          body.charAt(1) === "x" || body.charAt(1) === "X"
            ? parseInt(body.slice(2), 16)
            : parseInt(body.slice(1), 10);
        return code === code ? String.fromCharCode(code) : _;
      }
      return ENTITY_MAP[body] != null ? ENTITY_MAP[body] : _;
    });
  }

  /**
   * True if xml[i..] starts with tagName followed by space, '/', or '>'.
   * Avoids false hits like <w:pPr matching <w:p.
   */
  function isTagAt(xml, i, tagName) {
    var n = tagName.length;
    if (i + n >= xml.length) return false;
    if (xml.substr(i, n) !== tagName) return false;
    var c = xml.charCodeAt(i + n);
    return c === 32 || c === 9 || c === 10 || c === 13 || c === 47 || c === 62;
  }

  function skipToTagEnd(xml, i) {
    var len = xml.length;
    var quote = 0;
    while (i < len) {
      var c = xml.charCodeAt(i);
      if (quote) {
        if (c === quote) quote = 0;
      } else if (c === 34 || c === 39) {
        quote = c;
      } else if (c === 62) {
        return i + 1;
      }
      i++;
    }
    return len;
  }

  /**
   * Single-pass OOXML scanner → paragraph strings.
   * Handles w:t, w:tab, w:br, w:cr, and paragraph boundaries w:p.
   */
  function extractParagraphsFromXml(xml) {
    var paragraphs = [];
    var parts = [];
    var inPara = false;
    var i = 0;
    var len = xml.length;

    function flushPara() {
      if (!inPara) return;
      var text = parts.join("").replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n").trim();
      text = text.replace(/[ \t]{2,}/g, " ");
      if (text) paragraphs.push(text);
      parts.length = 0;
      inPara = false;
    }

    while (i < len) {
      if (xml.charCodeAt(i) !== 60) {
        i++;
        continue;
      }

      // Paragraph open: <w:p ...> or <w:p/>
      if (isTagAt(xml, i + 1, "w:p")) {
        flushPara();
        var pEnd = skipToTagEnd(xml, i + 4);
        var selfClose = xml.charCodeAt(pEnd - 2) === 47;
        inPara = !selfClose;
        if (selfClose) flushPara();
        i = pEnd;
        continue;
      }

      // Paragraph close
      if (xml.substr(i, 5) === "</w:p") {
        i = skipToTagEnd(xml, i + 5);
        flushPara();
        continue;
      }

      // Text run: <w:t ...>…</w:t>
      if (isTagAt(xml, i + 1, "w:t")) {
        var tOpenEnd = skipToTagEnd(xml, i + 4);
        var tClose = xml.indexOf("</w:t", tOpenEnd);
        if (tClose === -1) {
          i = tOpenEnd;
          continue;
        }
        if (!inPara) {
          inPara = true;
        }
        parts.push(decodeEntities(xml.substring(tOpenEnd, tClose)));
        i = skipToTagEnd(xml, tClose + 5);
        continue;
      }

      // Tab
      if (isTagAt(xml, i + 1, "w:tab")) {
        if (inPara) parts.push("\t");
        i = skipToTagEnd(xml, i + 5);
        continue;
      }

      // Break / carriage return inside a paragraph
      if (isTagAt(xml, i + 1, "w:br") || isTagAt(xml, i + 1, "w:cr")) {
        if (inPara) parts.push("\n");
        i = skipToTagEnd(xml, i + 5);
        continue;
      }

      i = skipToTagEnd(xml, i + 1);
    }

    flushPara();
    return paragraphs;
  }

  /**
   * Collect document + header/footer XML paths that exist in the archive.
   */
  function collectXmlPaths(map) {
    var paths = [];
    var preferred = ["word/document.xml"];
    var name;
    for (var i = 0; i < preferred.length; i++) {
      if (map[preferred[i]]) paths.push(preferred[i]);
    }
    for (name in map) {
      if (
        /^word\/header\d*\.xml$/i.test(name) ||
        /^word\/footer\d*\.xml$/i.test(name)
      ) {
        paths.push(name);
      }
    }
    return paths;
  }

  /* ---------- public API ---------- */

  function isArrayBuffer(value) {
    return (
      value instanceof ArrayBuffer ||
      Object.prototype.toString.call(value) === "[object ArrayBuffer]"
    );
  }

  /**
   * Parse a DOCX File, Blob, or ArrayBuffer into structured text.
   * @returns {Promise<{paragraphs:string[], lines:string[], text:string}>}
   */
  async function parseDocx(input) {
    var buffer;
    if (isArrayBuffer(input)) {
      buffer = input;
    } else if (input && typeof input.arrayBuffer === "function") {
      buffer = await input.arrayBuffer();
    } else {
      throw new Error("parseDocx expects a File, Blob, or ArrayBuffer.");
    }

    if (buffer.byteLength < 22) {
      throw new Error("File is too small to be a valid DOCX.");
    }

    var map = readCentralDirectory(buffer);
    if (!map["word/document.xml"]) {
      throw new Error("Could not find word/document.xml inside the DOCX file.");
    }

    var paths = collectXmlPaths(map);
    var files = await extractPaths(buffer, map, paths);
    var paragraphs = [];
    var seen = Object.create(null);

    // document body first, then headers/footers
    var order = paths.slice().sort(function (a, b) {
      if (a === "word/document.xml") return -1;
      if (b === "word/document.xml") return 1;
      return a < b ? -1 : a > b ? 1 : 0;
    });

    for (var i = 0; i < order.length; i++) {
      var path = order[i];
      var bytes = files[path];
      if (!bytes) continue;
      var xml = decodeUtf8(bytes);
      if (xml.charCodeAt(0) === 0xfeff) xml = xml.slice(1);
      var paras = extractParagraphsFromXml(xml);
      for (var j = 0; j < paras.length; j++) {
        var line = paras[j];
        // Deduplicate header/footer echoes that often match body contact lines
        if (path !== "word/document.xml" && seen[line]) continue;
        seen[line] = 1;
        paragraphs.push(line);
      }
    }

    if (!paragraphs.length) {
      throw new Error("No readable text was found in the DOCX file.");
    }

    return {
      paragraphs: paragraphs,
      lines: paragraphs,
      text: paragraphs.join("\n")
    };
  }

  BuildCV.DocxParser = {
    parse: parseDocx,
    unzip: unzipDocx,
    extractParagraphs: extractParagraphsFromXml,
    readCentralDirectory: readCentralDirectory
  };

  BuildCV.parseDocx = parseDocx;
})(typeof window !== "undefined" ? window : this);

/**
 * JavaScript online compiler.
 * User code runs in a sandboxed iframe (allow-scripts only), not in the main page.
 */
(function () {
  "use strict";

  var BuildCV = window.BuildCV;
  var editor;
  var output;
  var sandbox;
  var runToken = 0;

  var SAMPLE =
    "function greet(name) {\n" +
    "  return 'Hello, ' + name + '!';\n" +
    "}\n\n" +
    "console.log(greet('BuildCV'));\n" +
    "console.log('2 + 3 =', 2 + 3);\n\n" +
    "const numbers = [1, 2, 3, 4, 5];\n" +
    "console.log('Sum:', numbers.reduce((a, b) => a + b, 0));\n";

  var RUNNER_SRCDOC =
    "<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body>" +
    "<script>" +
    "(function () {" +
    "  function send(type, args) {" +
    "    parent.postMessage({ source: 'buildcv-compiler', type: type, args: args }, '*');" +
    "  }" +
    "  function format(value) {" +
    "    if (typeof value === 'string') return value;" +
    "    try { return JSON.stringify(value); } catch (e) { return String(value); }" +
    "  }" +
    "  window.addEventListener('message', function (event) {" +
    "    if (!event.data || event.data.type !== 'run') return;" +
    "    console.log = function () { send('log', Array.prototype.map.call(arguments, format)); };" +
    "    console.info = console.log;" +
    "    console.warn = function () { send('warn', Array.prototype.map.call(arguments, format)); };" +
    "    console.error = function () { send('error', Array.prototype.map.call(arguments, format)); };" +
    "    window.onerror = function (msg) { send('error', [String(msg)]); return true; };" +
    "    try {" +
    "      var fn = new Function(event.data.code);" +
    "      var result = fn();" +
    "      if (result !== undefined) send('log', [format(result)]);" +
    "    } catch (err) {" +
    "      send('error', [err && err.stack ? String(err.stack) : String(err)]);" +
    "    }" +
    "    send('done', []);" +
    "  });" +
    "  send('ready', []);" +
    "})();" +
    "<\/script></body></html>";

  function writeOutput(text, className) {
    var line = document.createElement("div");
    if (className) line.className = className;
    line.textContent = text;
    output.appendChild(line);
  }

  function clearOutput() {
    output.textContent = "";
  }

  function persistCode() {
    try {
      localStorage.setItem(BuildCV.CONFIG.storage.compiler, editor.value);
    } catch (err) {
      /* ignore quota errors */
    }
  }

  /**
   * Recreate the iframe so each run starts from a clean isolated context.
   * Listener is attached before srcdoc is set to avoid missing the ready message.
   */
  function runCode() {
    var code = editor.value;
    var token = (runToken += 1);
    clearOutput();
    writeOutput("Running…", "meta");
    persistCode();

    var frame = document.createElement("iframe");
    frame.id = "compiler-sandbox";
    frame.className = "compiler-sandbox";
    frame.title = "Isolated JavaScript execution environment";
    frame.setAttribute("sandbox", "allow-scripts");
    frame.setAttribute("hidden", "");

    function onMessage(event) {
      if (!event.data || event.data.source !== "buildcv-compiler") return;
      if (token !== runToken) return;
      var type = event.data.type;
      var args = event.data.args || [];
      if (type === "ready") {
        try {
          frame.contentWindow.postMessage({ type: "run", code: code }, "*");
        } catch (err) {
          writeOutput("Could not reach the isolated runner: " + err.message, "err");
        }
        return;
      }
      if (type === "log" || type === "warn") {
        if (output.querySelector(".meta")) output.textContent = "";
        writeOutput(args.join(" "));
      }
      if (type === "error") {
        if (output.querySelector(".meta")) output.textContent = "";
        writeOutput(args.join(" "), "err");
      }
      if (type === "done") {
        window.removeEventListener("message", onMessage);
        if (output.querySelector(".meta") && output.children.length === 1) {
          output.textContent = "";
          writeOutput("Completed with no console output.", "meta");
        }
      }
    }

    window.addEventListener("message", onMessage);
    sandbox.replaceWith(frame);
    sandbox = frame;
    frame.srcdoc = RUNNER_SRCDOC;

    setTimeout(function () {
      if (token !== runToken) return;
      var running = output.querySelector(".meta");
      if (running && /Running/.test(output.textContent)) {
        writeOutput("The runner did not finish. Check for infinite loops or browser restrictions.", "err");
      }
    }, 5000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    editor = document.getElementById("js-editor");
    output = document.getElementById("compiler-output");
    sandbox = document.getElementById("compiler-sandbox");
    if (!editor || !output || !sandbox) return;

    var saved = "";
    try {
      saved = localStorage.getItem(BuildCV.CONFIG.storage.compiler) || "";
    } catch (err) {
      saved = "";
    }
    editor.value = saved || SAMPLE;
    sandbox.srcdoc = RUNNER_SRCDOC;

    editor.addEventListener("input", persistCode);

    document.getElementById("compiler-run").addEventListener("click", runCode);
    document.getElementById("compiler-clear").addEventListener("click", function () {
      clearOutput();
    });
    document.getElementById("compiler-sample").addEventListener("click", function () {
      editor.value = SAMPLE;
      persistCode();
      BuildCV.showToast("Sample JavaScript loaded.");
    });

    editor.addEventListener("keydown", function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        runCode();
      }
    });
  });
})();

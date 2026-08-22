/**
 * Resume builder: data model, form, live preview, DOCX import, persistence, and print.
 */
(function () {
  "use strict";

  var BuildCV = (window.BuildCV = window.BuildCV || {});

  function emptyResume() {
    return {
      personal: {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: ""
      },
      summary: "",
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      achievements: [],
      languages: []
    };
  }

  BuildCV.emptyResume = emptyResume;

  function asArray(value) {
    if (Array.isArray(value)) return value;
    if (value == null || value === "") return [];
    return [value];
  }

  function textList(value) {
    return asArray(value)
      .map(function (item) {
        if (item && typeof item === "object") {
          return String(item.text || item.name || item.description || "").trim();
        }
        return String(item).trim();
      })
      .filter(Boolean);
  }

  /**
   * Normalize JSON or form state into a consistent resume object.
   * Missing optional fields are tolerated.
   */
  BuildCV.normalizeResume = function (raw) {
    var data = raw && typeof raw === "object" ? raw : {};
    var personal = data.personal && typeof data.personal === "object" ? data.personal : {};
    var base = emptyResume();

    base.personal = {
      name: String(personal.name || data.name || ""),
      title: String(personal.title || data.title || ""),
      email: String(personal.email || data.email || ""),
      phone: String(personal.phone || data.phone || ""),
      location: String(personal.location || data.location || ""),
      website: String(personal.website || data.website || ""),
      linkedin: String(personal.linkedin || data.linkedin || ""),
      github: String(personal.github || data.github || "")
    };
    base.summary = String(data.summary || "");

    base.skills = asArray(data.skills).map(function (skill) {
      if (typeof skill === "string") return { id: BuildCV.uid(), name: skill };
      return { id: skill.id || BuildCV.uid(), name: String(skill.name || skill.skill || "") };
    }).filter(function (s) { return s.name.trim(); });

    base.experience = asArray(data.experience).map(function (item) {
      item = item || {};
      return {
        id: item.id || BuildCV.uid(),
        company: String(item.company || ""),
        role: String(item.role || ""),
        location: String(item.location || ""),
        startDate: String(item.startDate || ""),
        endDate: String(item.endDate || ""),
        description: textList(item.description || item.bullets),
        technologies: textList(item.technologies)
      };
    });

    base.education = asArray(data.education).map(function (item) {
      item = item || {};
      return {
        id: item.id || BuildCV.uid(),
        school: String(item.school || item.institution || ""),
        degree: String(item.degree || ""),
        field: String(item.field || ""),
        location: String(item.location || ""),
        startDate: String(item.startDate || ""),
        endDate: String(item.endDate || ""),
        details: String(item.details || item.description || "")
      };
    });

    base.projects = asArray(data.projects).map(function (item) {
      item = item || {};
      return {
        id: item.id || BuildCV.uid(),
        name: String(item.name || ""),
        url: String(item.url || ""),
        description: String(item.description || ""),
        technologies: textList(item.technologies)
      };
    });

    base.certifications = asArray(data.certifications).map(function (item) {
      item = item || {};
      return {
        id: item.id || BuildCV.uid(),
        name: String(item.name || ""),
        issuer: String(item.issuer || ""),
        date: String(item.date || "")
      };
    });

    base.achievements = asArray(data.achievements).map(function (item) {
      if (typeof item === "string") return { id: BuildCV.uid(), text: item };
      return { id: item.id || BuildCV.uid(), text: String(item.text || item.name || "") };
    }).filter(function (a) { return a.text.trim(); });

    base.languages = asArray(data.languages).map(function (item) {
      if (typeof item === "string") return { id: BuildCV.uid(), name: item, proficiency: "" };
      return {
        id: item.id || BuildCV.uid(),
        name: String(item.name || ""),
        proficiency: String(item.proficiency || "")
      };
    }).filter(function (l) { return l.name.trim(); });

    return base;
  };

  function hasContent(sectionItems, keys) {
    return sectionItems.some(function (item) {
      return keys.some(function (key) {
        var val = item[key];
        if (Array.isArray(val)) return val.length > 0;
        return String(val || "").trim();
      });
    });
  }

  /**
   * Render an ATS-friendly CV. Empty sections are omitted.
   */
  BuildCV.renderResumeHtml = function (raw) {
    var data = BuildCV.normalizeResume(raw);
    var e = BuildCV.escapeHtml;
    var p = data.personal;
    var contact = [p.email, p.phone, p.location, p.website, p.linkedin, p.github]
      .map(function (item) { return String(item || "").trim(); })
      .filter(Boolean);

    if (!p.name.trim() && !p.title.trim() && !contact.length && !data.summary.trim() &&
        !data.skills.length && !hasContent(data.experience, ["company", "role"]) &&
        !hasContent(data.education, ["school", "degree"]) &&
        !hasContent(data.projects, ["name"]) &&
        !hasContent(data.certifications, ["name"]) &&
        !data.achievements.length && !data.languages.length) {
      return '<p class="cv-empty">Your live preview will appear here as you add resume details.</p>';
    }

    var html = "";
    html += "<header>";
    if (p.name.trim()) html += '<p class="cv-name">' + e(p.name) + "</p>";
    if (p.title.trim()) html += '<p class="cv-title">' + e(p.title) + "</p>";
    if (contact.length) {
      html += '<div class="cv-contact">' + contact.map(function (item) {
        return "<span>" + e(item) + "</span>";
      }).join("") + "</div>";
    }
    html += "</header>";

    if (data.summary.trim()) {
      html += '<section class="cv-section"><h2>Summary</h2><p>' + e(data.summary) + "</p></section>";
    }

    if (data.skills.length) {
      html += '<section class="cv-section"><h2>Skills</h2><p>' +
        e(data.skills.map(function (s) { return s.name; }).join(" · ")) +
        "</p></section>";
    }

    if (hasContent(data.experience, ["company", "role", "description"])) {
      html += '<section class="cv-section"><h2>Experience</h2>';
      data.experience.forEach(function (item) {
        if (!item.company && !item.role && !item.description.length) return;
        html += '<article class="cv-item">';
        html += '<div class="cv-item-head"><span>' + e(item.role || "Role") + "</span><span>" +
          e([item.startDate, item.endDate].filter(Boolean).join(" – ")) + "</span></div>";
        html += '<div class="cv-item-sub"><span>' + e([item.company, item.location].filter(Boolean).join(" · ")) +
          "</span></div>";
        if (item.description.length) {
          html += "<ul>" + item.description.map(function (line) {
            return "<li>" + e(line) + "</li>";
          }).join("") + "</ul>";
        }
        if (item.technologies.length) {
          html += '<p class="cv-tech">' + e(item.technologies.join(" · ")) + "</p>";
        }
        html += "</article>";
      });
      html += "</section>";
    }

    if (hasContent(data.projects, ["name", "description"])) {
      html += '<section class="cv-section"><h2>Projects</h2>';
      data.projects.forEach(function (item) {
        if (!item.name && !item.description) return;
        html += '<article class="cv-item">';
        html += '<div class="cv-item-head"><span>' + e(item.name) + "</span><span>" + e(item.url) + "</span></div>";
        if (item.description) html += "<p>" + e(item.description) + "</p>";
        if (item.technologies.length) {
          html += '<p class="cv-tech">' + e(item.technologies.join(" · ")) + "</p>";
        }
        html += "</article>";
      });
      html += "</section>";
    }

    if (hasContent(data.education, ["school", "degree"])) {
      html += '<section class="cv-section"><h2>Education</h2>';
      data.education.forEach(function (item) {
        if (!item.school && !item.degree) return;
        html += '<article class="cv-item">';
        html += '<div class="cv-item-head"><span>' + e([item.degree, item.field].filter(Boolean).join(" in ")) +
          "</span><span>" + e([item.startDate, item.endDate].filter(Boolean).join(" – ")) + "</span></div>";
        html += '<div class="cv-item-sub"><span>' + e([item.school, item.location].filter(Boolean).join(" · ")) +
          "</span></div>";
        if (item.details) html += "<p>" + e(item.details) + "</p>";
        html += "</article>";
      });
      html += "</section>";
    }

    if (hasContent(data.certifications, ["name"])) {
      html += '<section class="cv-section"><h2>Certifications</h2><ul>';
      data.certifications.forEach(function (item) {
        if (!item.name) return;
        html += "<li>" + e([item.name, item.issuer, item.date].filter(Boolean).join(" — ")) + "</li>";
      });
      html += "</ul></section>";
    }

    if (data.achievements.length) {
      html += '<section class="cv-section"><h2>Achievements</h2><ul>';
      data.achievements.forEach(function (item) {
        html += "<li>" + e(item.text) + "</li>";
      });
      html += "</ul></section>";
    }

    if (data.languages.length) {
      html += '<section class="cv-section"><h2>Languages</h2><p>' +
        e(data.languages.map(function (item) {
          return item.proficiency ? item.name + " (" + item.proficiency + ")" : item.name;
        }).join(" · ")) +
        "</p></section>";
    }

    return html;
  };

  BuildCV.mountResume = function (container, data) {
    if (!container) return;
    container.innerHTML = BuildCV.renderResumeHtml(data);
  };

  var state = emptyResume();
  var formEl;
  var previewEl;
  var persistTimer = null;

  function persist() {
    clearTimeout(persistTimer);
    persistTimer = setTimeout(function () {
      BuildCV.writeStorage(BuildCV.CONFIG.storage.resume, state);
    }, 200);
  }

  function refreshPreview() {
    BuildCV.mountResume(previewEl, state);
    persist();
  }

  function setError(id, message) {
    var el = document.getElementById(id);
    if (!el) return;
    if (!message) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = message;
  }

  function field(label, attrs, isFull) {
    var extra = attrs || "";
    return '<label class="field' + (isFull ? " full" : "") + '">' + label + "<input " + extra + "></label>";
  }

  function area(label, attrs, value) {
    return '<label class="field full">' + label + "<textarea " + (attrs || "") + ">" +
      BuildCV.escapeHtml(value || "") + "</textarea></label>";
  }

  /**
   * Build the editor form from current state. Repeatable blocks are rendered in JS.
   */
  function renderForm() {
    if (!formEl) return;
    var p = state.personal;
    var html = "";

    html += '<section class="form-section"><h3>Personal information</h3><div class="form-grid">';
    html += field("Full name", 'data-path="personal.name" value="' + BuildCV.escapeHtml(p.name) + '" required autocomplete="name"');
    html += field("Professional title", 'data-path="personal.title" value="' + BuildCV.escapeHtml(p.title) + '"');
    html += field("Email", 'type="email" data-path="personal.email" value="' + BuildCV.escapeHtml(p.email) + '" autocomplete="email"');
    html += field("Phone", 'type="tel" data-path="personal.phone" value="' + BuildCV.escapeHtml(p.phone) + '" autocomplete="tel"');
    html += field("Location", 'data-path="personal.location" value="' + BuildCV.escapeHtml(p.location) + '"');
    html += field("Website", 'data-path="personal.website" value="' + BuildCV.escapeHtml(p.website) + '"');
    html += field("LinkedIn", 'data-path="personal.linkedin" value="' + BuildCV.escapeHtml(p.linkedin) + '"');
    html += field("GitHub", 'data-path="personal.github" value="' + BuildCV.escapeHtml(p.github) + '"');
    html += "</div></section>";

    html += '<section class="form-section"><h3>Professional summary</h3>';
    html += area("Summary", 'data-path="summary"', state.summary);
    html += "</section>";

    html += '<section class="form-section" data-list="skills"><h3>Skills</h3>';
    html += '<div class="chip-row" id="skill-chips"></div>';
    html += '<div class="inline-add"><label class="field" for="skill-input">Add a skill</label><input id="skill-input" type="text" placeholder="e.g. React"><button class="btn btn-tiny btn-primary" type="button" data-action="add-skill">Add</button></div>';
    html += "</section>";

    html += listSection("Work experience", "experience", state.experience, experienceFields, "add-experience");
    html += listSection("Education", "education", state.education, educationFields, "add-education");
    html += listSection("Projects", "projects", state.projects, projectFields, "add-project");
    html += listSection("Certifications", "certifications", state.certifications, certFields, "add-cert");
    html += listSection("Achievements", "achievements", state.achievements, achieveFields, "add-achievement");
    html += listSection("Languages", "languages", state.languages, languageFields, "add-language");

    formEl.innerHTML = html;
    renderSkillChips();
  }

  function listSection(title, key, items, fieldFn, addAction) {
    var html = '<section class="form-section"><div class="entry-head"><h3>' + title + "</h3>";
    html += '<button class="btn btn-tiny btn-ghost" type="button" data-action="' + addAction + '">Add</button></div>';
    if (!items.length) {
      html += "<p class='file-name'>No entries yet.</p>";
    }
    items.forEach(function (item, index) {
      html += '<article class="entry-card" data-list="' + key + '" data-id="' + item.id + '">';
      html += '<div class="entry-head"><strong>Entry ' + (index + 1) + "</strong>";
      html += '<button class="btn btn-tiny btn-ghost" type="button" data-action="remove">Remove</button></div>';
      html += '<div class="form-grid">' + fieldFn(item) + "</div></article>";
    });
    html += "</section>";
    return html;
  }

  function experienceFields(item) {
    return (
      field("Role", 'data-field="role" value="' + BuildCV.escapeHtml(item.role) + '"') +
      field("Company", 'data-field="company" value="' + BuildCV.escapeHtml(item.company) + '"') +
      field("Location", 'data-field="location" value="' + BuildCV.escapeHtml(item.location) + '"') +
      field("Start date", 'data-field="startDate" placeholder="Jan 2022" value="' + BuildCV.escapeHtml(item.startDate) + '"') +
      field("End date", 'data-field="endDate" placeholder="Present" value="' + BuildCV.escapeHtml(item.endDate) + '"') +
      area("Description (one bullet per line)", 'data-field="description"', item.description.join("\n")) +
      field("Technologies (comma separated)", 'data-field="technologies" value="' + BuildCV.escapeHtml(item.technologies.join(", ")) + '"', true)
    );
  }

  function educationFields(item) {
    return (
      field("School / Institution", 'data-field="school" value="' + BuildCV.escapeHtml(item.school) + '"') +
      field("Degree", 'data-field="degree" value="' + BuildCV.escapeHtml(item.degree) + '"') +
      field("Field of study", 'data-field="field" value="' + BuildCV.escapeHtml(item.field) + '"') +
      field("Location", 'data-field="location" value="' + BuildCV.escapeHtml(item.location) + '"') +
      field("Start date", 'data-field="startDate" value="' + BuildCV.escapeHtml(item.startDate) + '"') +
      field("End date", 'data-field="endDate" value="' + BuildCV.escapeHtml(item.endDate) + '"') +
      area("Details", 'data-field="details"', item.details)
    );
  }

  function projectFields(item) {
    return (
      field("Project name", 'data-field="name" value="' + BuildCV.escapeHtml(item.name) + '"') +
      field("URL", 'data-field="url" value="' + BuildCV.escapeHtml(item.url) + '"') +
      area("Description", 'data-field="description"', item.description) +
      field("Technologies (comma separated)", 'data-field="technologies" value="' + BuildCV.escapeHtml(item.technologies.join(", ")) + '"', true)
    );
  }

  function certFields(item) {
    return (
      field("Name", 'data-field="name" value="' + BuildCV.escapeHtml(item.name) + '"') +
      field("Issuer", 'data-field="issuer" value="' + BuildCV.escapeHtml(item.issuer) + '"') +
      field("Date", 'data-field="date" value="' + BuildCV.escapeHtml(item.date) + '"')
    );
  }

  function achieveFields(item) {
    return area("Achievement", 'data-field="text"', item.text);
  }

  function languageFields(item) {
    var options = ["", "Native", "Fluent", "Professional", "Intermediate", "Basic"];
    var select = '<label class="field">Proficiency<select data-field="proficiency">';
    options.forEach(function (opt) {
      select += '<option value="' + opt + '"' + (item.proficiency === opt ? " selected" : "") + ">" +
        (opt || "Select") + "</option>";
    });
    select += "</select></label>";
    return field("Language", 'data-field="name" value="' + BuildCV.escapeHtml(item.name) + '"') + select;
  }

  function renderSkillChips() {
    var row = document.getElementById("skill-chips");
    if (!row) return;
    row.innerHTML = state.skills.map(function (skill) {
      return '<span class="chip">' + BuildCV.escapeHtml(skill.name) +
        '<button type="button" data-action="remove-skill" data-id="' + skill.id + '" aria-label="Remove ' +
        BuildCV.escapeHtml(skill.name) + '">×</button></span>';
    }).join("");
  }

  function setByPath(path, value) {
    var parts = path.split(".");
    var cursor = state;
    for (var i = 0; i < parts.length - 1; i += 1) {
      cursor = cursor[parts[i]];
    }
    cursor[parts[parts.length - 1]] = value;
  }

  function findItem(listName, id) {
    return state[listName].filter(function (item) { return item.id === id; })[0];
  }

  function parseCsv(value) {
    return String(value || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function showWorkspace() {
    var chooser = document.getElementById("home-chooser");
    var workspace = document.getElementById("home-workspace");
    if (chooser) chooser.classList.add("hidden");
    if (workspace) workspace.classList.remove("hidden");
    renderForm();
    refreshPreview();
    workspace.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hideWorkspace() {
    var chooser = document.getElementById("home-chooser");
    var workspace = document.getElementById("home-workspace");
    if (chooser) chooser.classList.remove("hidden");
    if (workspace) workspace.classList.add("hidden");
    setError("docx-notice", "");
    var notice = document.getElementById("docx-notice");
    if (notice) notice.hidden = true;
  }

  function validateForDownload() {
    var name = (state.personal.name || "").trim();
    var email = (state.personal.email || "").trim();
    if (!name) {
      setError("resume-form-error", "Please enter your full name before downloading.");
      return false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("resume-form-error", "Please enter a valid email address or leave it blank.");
      return false;
    }
    setError("resume-form-error", "");
    return true;
  }

  /* ---------- DOCX import (isolated, pluggable) ---------- */

  /**
   * Validate that the selected file looks like a .docx document.
   */
  BuildCV.validateDocxFile = function (file) {
    if (!file) return "Please choose a .docx file.";
    var name = (file.name || "").toLowerCase();
    var type = file.type || "";
    var allowedType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (!name.endsWith(".docx") && type !== allowedType) {
      return "Only .docx files are supported.";
    }
    return "";
  };

  function looksLikeHeading(line) {
    var key = String(line || "").replace(/[:\-–—|•.]+$/g, "").trim().toLowerCase();
    return /^(summary|professional summary|profile|objective|about me|experience|work experience|professional experience|employment|work history|education|academic background|skills|technical skills|core skills|key skills|technologies|tech stack|projects|personal projects|key projects|certifications?|licenses?|achievements?|awards|accomplishments|languages|contact|contact information)$/i.test(key);
  }

  function headingBucket(line) {
    var key = String(line || "").toLowerCase();
    if (/skill|technolog|tech stack/.test(key)) return "skills";
    if (/educat|academic/.test(key)) return "education";
    if (/project/.test(key)) return "projects";
    if (/certif|license/.test(key)) return "certifications";
    if (/achieve|award|accomplish/.test(key)) return "achievements";
    if (/language/.test(key)) return "languages";
    if (/experience|employment|work history/.test(key)) return "experience";
    if (/summary|profile|objective|about/.test(key)) return "summary";
    return null;
  }

  function isContactLine(line) {
    return /@|linkedin|github|https?:\/\/|\+?\d[\d\s().-]{7,}\d/i.test(line);
  }

  function splitExperienceBlocks(lines) {
    var blocks = [];
    var current = [];
    var dateRe = /\b((?:19|20)\d{2}|\w{3,9}\s+(?:19|20)\d{2})\s*[-–—to]+\s*((?:19|20)\d{2}|present|current|now|\w{3,9}\s+(?:19|20)\d{2})\b/i;

    lines.forEach(function (line) {
      var looksNew =
        current.length > 0 &&
        (dateRe.test(line) || (/^[A-Z].{2,60}$/.test(line) && !/^[•\-\*]/.test(line) && current.length >= 2));

      if (looksNew && dateRe.test(line) && current.length) {
        blocks.push(current);
        current = [line];
        return;
      }
      if (looksNew && /^[A-Z]/.test(line) && current.length >= 3 && !/^[•\-\*]/.test(line)) {
        var prev = current[current.length - 1];
        if (dateRe.test(prev) || dateRe.test(current[0]) || dateRe.test(current[1] || "")) {
          blocks.push(current);
          current = [line];
          return;
        }
      }
      current.push(line);
    });
    if (current.length) blocks.push(current);
    return blocks.length ? blocks : [lines];
  }

  function parseExperienceBlock(block) {
    var dateRe = /\b((?:19|20)\d{2}|\w{3,9}\s+(?:19|20)\d{2})\s*[-–—to]+\s*((?:19|20)\d{2}|present|current|now|\w{3,9}\s+(?:19|20)\d{2})\b/i;
    var role = "";
    var company = "";
    var startDate = "";
    var endDate = "";
    var location = "";
    var description = [];
    var used = {};

    for (var i = 0; i < Math.min(block.length, 4); i++) {
      var m = block[i].match(dateRe);
      if (m) {
        startDate = m[1];
        endDate = m[2];
        used[i] = true;
        var rest = block[i].replace(dateRe, "").replace(/[|•·]/g, " ").trim();
        if (rest && rest.length < 60) location = rest;
        break;
      }
    }

    for (var j = 0; j < Math.min(block.length, 3); j++) {
      if (used[j]) continue;
      var line = block[j].trim();
      if (/^[•\-\*]/.test(line)) continue;
      if (!role) {
        role = line;
        used[j] = true;
      } else if (!company) {
        company = line;
        used[j] = true;
      }
    }

    block.forEach(function (line, idx) {
      if (used[idx]) return;
      var cleaned = line.replace(/^[•\-\*]\s*/, "").trim();
      if (cleaned) description.push(cleaned);
    });

    return {
      id: BuildCV.uid(),
      company: company,
      role: role,
      location: location,
      startDate: startDate,
      endDate: endDate,
      description: description,
      technologies: []
    };
  }

  /**
   * Best-effort mapping from extracted DOCX lines into resume fields.
   * Callers must still let the user review the result.
   */
  BuildCV.parseResumeLines = function (lines) {
    var resume = emptyResume();
    if (!lines || !lines.length) return resume;

    var joined = lines.join("\n");
    var email = joined.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    var phone = joined.match(/(\+?\d[\d\s().-]{7,}\d)/);
    var linkedin = joined.match(/https?:\/\/[^\s]*linkedin[^\s]*/i);
    var github = joined.match(/https?:\/\/[^\s]*github[^\s]*/i);
    var website = joined.match(/https?:\/\/(?![^\s]*(?:linkedin|github))[^\s]+/i);

    if (email) resume.personal.email = email[0];
    if (phone) resume.personal.phone = phone[0].trim();
    if (linkedin) resume.personal.linkedin = linkedin[0].replace(/[.,);]+$/, "");
    if (github) resume.personal.github = github[0].replace(/[.,);]+$/, "");
    if (website) resume.personal.website = website[0].replace(/[.,);]+$/, "");

    var headerEnd = 0;
    for (var h = 0; h < Math.min(lines.length, 8); h++) {
      if (looksLikeHeading(lines[h])) break;
      headerEnd = h + 1;
    }

    var headerLines = lines.slice(0, headerEnd).filter(function (line) {
      return line && !isContactLine(line);
    });
    if (headerLines[0]) resume.personal.name = headerLines[0];
    if (headerLines[1] && headerLines[1].length < 80) resume.personal.title = headerLines[1];

    var current = "summary";
    var buckets = {
      summary: [],
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      achievements: [],
      languages: []
    };

    lines.slice(headerEnd).forEach(function (line) {
      if (looksLikeHeading(line)) {
        var bucket = headingBucket(line);
        if (bucket) current = bucket;
        return;
      }
      if (isContactLine(line) && current === "summary" && !buckets.summary.length) return;
      if (buckets[current]) buckets[current].push(line);
    });

    resume.summary = buckets.summary.join(" ").trim();
    resume.skills = buckets.skills.join(", ").split(/[,•|·/;]+/).map(function (name) {
      return { id: BuildCV.uid(), name: name.trim() };
    }).filter(function (s) { return s.name; });

    if (buckets.experience.length) {
      resume.experience = splitExperienceBlocks(buckets.experience).map(parseExperienceBlock);
    }

    if (buckets.education.length) {
      var eduBlocks = splitExperienceBlocks(buckets.education);
      resume.education = eduBlocks.map(function (block) {
        var dateRe = /\b((?:19|20)\d{2}|\w{3,9}\s+(?:19|20)\d{2})\s*[-–—to]+\s*((?:19|20)\d{2}|present|current|now|\w{3,9}\s+(?:19|20)\d{2})\b/i;
        var school = block[0] || "";
        var degree = block[1] || "";
        var startDate = "";
        var endDate = "";
        var details = [];
        block.forEach(function (line, idx) {
          var m = line.match(dateRe);
          if (m) {
            startDate = m[1];
            endDate = m[2];
            return;
          }
          if (idx > 1) details.push(line);
        });
        return {
          id: BuildCV.uid(),
          school: school,
          degree: degree,
          field: "",
          location: "",
          startDate: startDate,
          endDate: endDate,
          details: details.join(" ")
        };
      });
    }

    if (buckets.projects.length) {
      var projBlocks = splitExperienceBlocks(buckets.projects);
      resume.projects = projBlocks.map(function (block) {
        var urlMatch = block.join(" ").match(/https?:\/\/[^\s]+/i);
        return {
          id: BuildCV.uid(),
          name: block[0] || "Project",
          url: urlMatch ? urlMatch[0].replace(/[.,);]+$/, "") : "",
          description: block.slice(1).join(" "),
          technologies: []
        };
      });
    }

    resume.certifications = buckets.certifications.map(function (text) {
      return { id: BuildCV.uid(), name: text, issuer: "", date: "" };
    });
    resume.achievements = buckets.achievements.map(function (text) {
      return { id: BuildCV.uid(), text: text };
    });
    resume.languages = buckets.languages.join(", ").split(/[,•|·/;]+/).map(function (name) {
      return { id: BuildCV.uid(), name: name.trim(), proficiency: "" };
    }).filter(function (l) { return l.name; });

    return resume;
  };

  /**
   * DOCX import entry point — uses BuildCV/js/docx-parser.js.
   */
  BuildCV.importDocx = async function (file) {
    if (!BuildCV.parseDocx) {
      throw new Error("DOCX parser is not loaded. Ensure js/docx-parser.js is included.");
    }
    var parsed = await BuildCV.parseDocx(file);
    return BuildCV.parseResumeLines(parsed.paragraphs || parsed.lines || []);
  };

  function bindFormEvents() {
    formEl.addEventListener("input", function (event) {
      var target = event.target;
      if (target.dataset.path) {
        setByPath(target.dataset.path, target.value);
        refreshPreview();
        return;
      }
      var card = target.closest("[data-list][data-id]");
      if (!card || !target.dataset.field) return;
      var item = findItem(card.getAttribute("data-list"), card.getAttribute("data-id"));
      if (!item) return;
      var fieldName = target.dataset.field;
      if (fieldName === "description" && card.getAttribute("data-list") === "experience") {
        item.description = target.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
      } else if (fieldName === "technologies") {
        item.technologies = parseCsv(target.value);
      } else {
        item[fieldName] = target.value;
      }
      refreshPreview();
    });

    formEl.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-action]");
      if (!btn) return;
      var action = btn.getAttribute("data-action");

      if (action === "add-skill") {
        var input = document.getElementById("skill-input");
        var name = input && input.value.trim();
        if (!name) return;
        state.skills.push({ id: BuildCV.uid(), name: name });
        input.value = "";
        renderSkillChips();
        refreshPreview();
        return;
      }
      if (action === "remove-skill") {
        state.skills = state.skills.filter(function (s) { return s.id !== btn.getAttribute("data-id"); });
        renderSkillChips();
        refreshPreview();
        return;
      }
      if (action === "add-experience") {
        state.experience.push({
          id: BuildCV.uid(), company: "", role: "", location: "", startDate: "", endDate: "", description: [], technologies: []
        });
        renderForm();
        refreshPreview();
        return;
      }
      if (action === "add-education") {
        state.education.push({
          id: BuildCV.uid(), school: "", degree: "", field: "", location: "", startDate: "", endDate: "", details: ""
        });
        renderForm();
        refreshPreview();
        return;
      }
      if (action === "add-project") {
        state.projects.push({ id: BuildCV.uid(), name: "", url: "", description: "", technologies: [] });
        renderForm();
        refreshPreview();
        return;
      }
      if (action === "add-cert") {
        state.certifications.push({ id: BuildCV.uid(), name: "", issuer: "", date: "" });
        renderForm();
        refreshPreview();
        return;
      }
      if (action === "add-achievement") {
        state.achievements.push({ id: BuildCV.uid(), text: "" });
        renderForm();
        refreshPreview();
        return;
      }
      if (action === "add-language") {
        state.languages.push({ id: BuildCV.uid(), name: "", proficiency: "" });
        renderForm();
        refreshPreview();
        return;
      }
      if (action === "remove") {
        var card = btn.closest("[data-list][data-id]");
        if (!card) return;
        var list = card.getAttribute("data-list");
        var id = card.getAttribute("data-id");
        state[list] = state[list].filter(function (item) { return item.id !== id; });
        renderForm();
        refreshPreview();
      }
    });

    formEl.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && event.target.id === "skill-input") {
        event.preventDefault();
        var addBtn = formEl.querySelector('[data-action="add-skill"]');
        if (addBtn) addBtn.click();
      }
    });
  }

  function bindHomeActions() {
    var fileInput = document.getElementById("docx-input");
    var fileName = document.getElementById("docx-file-name");

    if (fileInput) {
      var dropZone = fileInput.closest(".file-drop");

      fileInput.addEventListener("change", function () {
        var file = fileInput.files && fileInput.files[0];
        fileName.textContent = file ? file.name : "No file selected";
        if (dropZone) dropZone.classList.toggle("has-file", !!file);
        var err = BuildCV.validateDocxFile(file);
        if (file && err) setError("docx-error", err);
        else setError("docx-error", "");
      });

      if (dropZone) {
        ["dragenter", "dragover"].forEach(function (type) {
          dropZone.addEventListener(type, function (event) {
            event.preventDefault();
            dropZone.classList.add("is-dragover");
          });
        });
        ["dragleave", "drop"].forEach(function (type) {
          dropZone.addEventListener(type, function () {
            dropZone.classList.remove("is-dragover");
          });
        });
        dropZone.addEventListener("drop", function (event) {
          event.preventDefault();
          var file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
          if (!file) return;
          try {
            var transfer = new DataTransfer();
            transfer.items.add(file);
            fileInput.files = transfer.files;
          } catch (err) {
            /* DataTransfer may be unavailable; fall back to showing the name only */
          }
          fileInput.dispatchEvent(new Event("change"));
          if (!fileInput.files || !fileInput.files.length) {
            fileName.textContent = file.name;
            var dropErr = BuildCV.validateDocxFile(file);
            if (dropErr) setError("docx-error", dropErr);
            else setError("docx-error", "");
          }
        });
      }
    }

    document.getElementById("docx-continue").addEventListener("click", async function () {
      var file = fileInput.files && fileInput.files[0];
      var err = BuildCV.validateDocxFile(file);
      if (err) {
        setError("docx-error", err);
        return;
      }
      setError("docx-error", "");
      try {
        var imported = await BuildCV.importDocx(file);
        state = BuildCV.normalizeResume(imported);
        showWorkspace();
        var notice = document.getElementById("docx-notice");
        notice.hidden = false;
        notice.textContent = "Text was extracted from your DOCX file. Please review every section — layout and headings may need manual cleanup.";
      } catch (error) {
        setError("docx-error", "Could not parse the DOCX file: " + (error && error.message ? error.message : "unknown error") + " Start from scratch if this file cannot be read.");
      }
    });

    document.getElementById("start-from-scratch").addEventListener("click", function () {
      var saved = BuildCV.readStorage(BuildCV.CONFIG.storage.resume, null);
      state = saved ? BuildCV.normalizeResume(saved) : emptyResume();
      var notice = document.getElementById("docx-notice");
      if (notice) notice.hidden = true;
      showWorkspace();
    });

    document.getElementById("back-to-options").addEventListener("click", hideWorkspace);

    document.getElementById("resume-reset").addEventListener("click", function () {
      if (!window.confirm("Clear all resume fields? This cannot be undone.")) return;
      state = emptyResume();
      BuildCV.writeStorage(BuildCV.CONFIG.storage.resume, state);
      renderForm();
      refreshPreview();
    });

    document.getElementById("resume-print").addEventListener("click", function () {
      if (!validateForDownload()) return;
      BuildCV.printActiveResume();
    });

    document.getElementById("resume-download").addEventListener("click", function () {
      if (!validateForDownload()) return;
      BuildCV.printActiveResume();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    formEl = document.getElementById("resume-form");
    previewEl = document.getElementById("home-cv-preview");
    if (!formEl || !previewEl) return;
    bindFormEvents();
    bindHomeActions();
  });
})();

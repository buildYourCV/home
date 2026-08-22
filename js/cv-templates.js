/**
 * Shared CV / resume layout templates with a popup selector.
 * Open with any [data-template-open] button.
 * Plain browser JavaScript — no dependencies.
 */
(function (global) {
  "use strict";

  var BuildCV = (global.BuildCV = global.BuildCV || {});
  var STORAGE_KEY = "buildcv.template.v3";
  var DEFAULT_ID = "clarity";
  var EVENT_NAME = "buildcv:templatechange";
  var pendingId = null;

  BuildCV.CV_TEMPLATES = [
    { id: "clarity", label: "Clarity", description: "Clean teal professional layout — ATS-friendly classic", layout: "stack", preview: "#0f9d8e" },
    { id: "aurora", label: "Aurora", description: "Gradient hero with glowing section pills", layout: "stack", preview: "#0f766e" },
    { id: "noir", label: "Noir", description: "Dramatic dark masthead, high contrast", layout: "stack", preview: "#111827" },
    { id: "prism", label: "Prism", description: "Vivid dual-column skills rail", layout: "sidebar", preview: "#7c3aed" },
    { id: "horizon", label: "Horizon", description: "Cinematic wide header and airy spacing", layout: "stack", preview: "#0369a1" },
    { id: "summit", label: "Summit", description: "Geometric corner slash, sharp edges", layout: "stack", preview: "#b45309" },
    { id: "pulse", label: "Pulse", description: "Rounded tech cards and pill titles", layout: "stack", preview: "#be185d" },
    { id: "ember", label: "Ember", description: "Fiery warm banner with energetic rules", layout: "stack", preview: "#ea580c" },
    { id: "neon", label: "Neon", description: "Cyber dark canvas with electric accents", layout: "stack", preview: "#22d3ee" },
    { id: "folio", label: "Folio", description: "Magazine editorial with oversized name", layout: "stack", preview: "#0f172a" },
    { id: "cascade", label: "Cascade", description: "Timeline cascade with glowing markers", layout: "stack", preview: "#059669" },
    { id: "orbit", label: "Orbit", description: "Circular orbital rings around the header", layout: "stack", preview: "#4f46e5" },
    { id: "velvet", label: "Velvet", description: "Luxury wine panel with gold accents", layout: "sidebar", preview: "#9f1239" },
    { id: "lumen", label: "Lumen", description: "Soft luminous pastels with airy light", layout: "stack", preview: "#8b5cf6" },
    { id: "bolt", label: "Bolt", description: "Electric diagonal slash full of energy", layout: "stack", preview: "#eab308" },
    { id: "meadow", label: "Meadow", description: "Fresh botanical greens and leaf marks", layout: "stack", preview: "#16a34a" },
    { id: "coral", label: "Coral", description: "Warm peach waves and friendly cards", layout: "stack", preview: "#f97316" },
    { id: "inkwell", label: "Inkwell", description: "Classic ink editorial with serif punch", layout: "stack", preview: "#1e293b" },
    { id: "glacier", label: "Glacier", description: "Cool crystalline blues and ice edges", layout: "stack", preview: "#0284c7" },
    { id: "mosaic", label: "Mosaic", description: "Color-block sections with playful rhythm", layout: "stack", preview: "#db2777" },
    { id: "nova", label: "Nova", description: "Cosmic right-rail with starry accents", layout: "sidebar-right", preview: "#6366f1" }
  ];

  function escapeHtml(value) {
    if (BuildCV.escapeHtml) return BuildCV.escapeHtml(value);
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readStoredId() {
    try {
      if (BuildCV.readStorage) {
        var fromHelper = BuildCV.readStorage(STORAGE_KEY, null);
        if (fromHelper && fromHelper.id) return fromHelper.id;
        if (typeof fromHelper === "string") return fromHelper;
      }
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_ID;
      var parsed = JSON.parse(raw);
      if (typeof parsed === "string") return parsed;
      return (parsed && parsed.id) || DEFAULT_ID;
    } catch (err) {
      return DEFAULT_ID;
    }
  }

  function writeStoredId(id) {
    var payload = { id: id };
    try {
      if (BuildCV.writeStorage) {
        BuildCV.writeStorage(STORAGE_KEY, payload);
        return;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {}
  }

  function templateById(id) {
    var list = BuildCV.CV_TEMPLATES;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return list[0];
  }

  BuildCV.getTemplateId = function () {
    return templateById(readStoredId()).id;
  };

  BuildCV.getActiveTemplate = function () {
    return templateById(BuildCV.getTemplateId());
  };

  BuildCV.renderTemplateMini = function (template) {
    var id = template.id;
    var tint = template.preview || "#1e3d6b";
    var html = '<div class="tpl-mini tpl-mini--' + escapeHtml(id) +
      '" style="--tpl-ink:' + escapeHtml(tint) + '" aria-hidden="true">';

    if (id === "clarity") {
      html += '<div class="tpl-mini-name tpl-mini-name--clarity"></div>';
      html += '<div class="tpl-mini-line tpl-mini-line--muted"></div>';
      html += '<div class="tpl-mini-clarity-cols"><span></span><span></span></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-line tpl-mini-line--short"></div>';
    } else if (id === "aurora") {
      html += '<div class="tpl-mini-aurora"></div><div class="tpl-mini-name tpl-mini-name--light"></div>';
      html += '<div class="tpl-mini-pills"><i></i><i></i><i></i></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-line tpl-mini-line--short"></div>';
    } else if (id === "noir") {
      html += '<div class="tpl-mini-noir"></div><div class="tpl-mini-line"></div>';
      html += '<div class="tpl-mini-line tpl-mini-line--short"></div><div class="tpl-mini-block"></div>';
    } else if (id === "prism" || id === "velvet") {
      html += '<div class="tpl-mini-prism' + (id === "velvet" ? " tpl-mini-prism--velvet" : "") + '">';
      html += '<div class="tpl-mini-prism-rail"><b></b><i></i><i></i><i></i></div>';
      html += '<div class="tpl-mini-body"><div class="tpl-mini-name"></div><div class="tpl-mini-line"></div>';
      html += '<div class="tpl-mini-line tpl-mini-line--short"></div></div></div>';
    } else if (id === "horizon") {
      html += '<div class="tpl-mini-horizon"></div><div class="tpl-mini-name tpl-mini-name--wide"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-block"></div>';
    } else if (id === "summit") {
      html += '<div class="tpl-mini-summit"></div><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-block"></div>';
    } else if (id === "pulse") {
      html += '<div class="tpl-mini-name"></div><div class="tpl-mini-chip"></div>';
      html += '<div class="tpl-mini-card"></div><div class="tpl-mini-card"></div>';
    } else if (id === "ember") {
      html += '<div class="tpl-mini-ember"></div><div class="tpl-mini-name tpl-mini-name--light"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-block"></div>';
    } else if (id === "neon") {
      html += '<div class="tpl-mini-neon"><div class="tpl-mini-name tpl-mini-name--light"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-glow"></div></div>';
    } else if (id === "folio") {
      html += '<div class="tpl-mini-folio"><span>A</span><div><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-line tpl-mini-line--short"></div></div></div>';
    } else if (id === "cascade") {
      html += '<div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-cascade"><i></i><i></i><i></i></div>';
    } else if (id === "orbit") {
      html += '<div class="tpl-mini-orbit"><b></b><div class="tpl-mini-name"></div></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-line tpl-mini-line--short"></div>';
    } else if (id === "lumen") {
      html += '<div class="tpl-mini-lumen"></div><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-pills"><i></i><i></i></div><div class="tpl-mini-line"></div>';
    } else if (id === "bolt") {
      html += '<div class="tpl-mini-bolt"></div><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-block"></div>';
    } else if (id === "meadow") {
      html += '<div class="tpl-mini-meadow"></div><div class="tpl-mini-name tpl-mini-name--light"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-block"></div>';
    } else if (id === "coral") {
      html += '<div class="tpl-mini-coral"></div><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-card"></div><div class="tpl-mini-card"></div>';
    } else if (id === "inkwell") {
      html += '<div class="tpl-mini-inkwell"><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-line tpl-mini-line--short"></div></div>';
    } else if (id === "glacier") {
      html += '<div class="tpl-mini-glacier"></div><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-block"></div>';
    } else if (id === "mosaic") {
      html += '<div class="tpl-mini-mosaic"><i></i><i></i><i></i><i></i></div>';
      html += '<div class="tpl-mini-name"></div><div class="tpl-mini-line"></div>';
    } else if (id === "nova") {
      html += '<div class="tpl-mini-nova"><div class="tpl-mini-body"><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-line"></div></div><div class="tpl-mini-prism-rail"><b></b><i></i><i></i></div></div>';
    } else {
      html += '<div class="tpl-mini-accent"></div><div class="tpl-mini-name"></div>';
      html += '<div class="tpl-mini-line"></div><div class="tpl-mini-block"></div>';
    }

    html += "</div>";
    return html;
  };

  function samplePreviewHtml(template) {
    var useSidebar = template.layout === "sidebar" || template.layout === "sidebar-right";
    var html = '<div class="tpl-preview-scale"><div class="cv-paper tpl-preview-paper" data-template="' + escapeHtml(template.id) + '">';
    html += '<header class="cv-header-block">';
    html += '<p class="cv-name">Alex Rivera</p>';
    html += '<p class="cv-title">Product Engineer</p>';
    html += '<div class="cv-contact"><span>alex@email.com</span><span>+1 555 0100</span><span>Remote</span></div>';
    html += "</header>";

    var skills = '<section class="cv-section"><h2>Skills</h2><div class="cv-skills">' +
      '<span class="cv-tag">React</span><span class="cv-tag">TypeScript</span>' +
      '<span class="cv-tag">Node</span><span class="cv-tag">Design Systems</span></div></section>';
    var summary = '<section class="cv-section"><h2>Summary</h2><p>Builds polished product experiences with clear systems thinking and measurable impact.</p></section>';
    var experience = '<section class="cv-section"><h2>Experience</h2><article class="cv-item cv-item--timeline">';
    experience += '<div class="cv-item-head"><span>Senior Engineer</span><span>2022 – Present</span></div>';
    experience += '<div class="cv-item-sub"><span>Northwind Labs</span></div>';
    experience += "<ul><li>Shipped a design system used across 8 product teams.</li>";
    experience += "<li>Cut page load time by 35% with smarter data fetching.</li></ul></article></section>";
    var education = '<section class="cv-section"><h2>Education</h2><article class="cv-item cv-item--timeline">';
    education += '<div class="cv-item-head"><span>B.S. Computer Science</span><span>2018 – 2022</span></div>';
    education += '<div class="cv-item-sub"><span>State University</span></div></article></section>';

    if (useSidebar) {
      var aside = '<aside class="cv-aside">' + skills +
        '<section class="cv-section"><h2>Languages</h2><div class="cv-langs">' +
        '<div class="cv-lang"><span class="cv-lang-name">English</span><span class="cv-lang-level">Proficient</span></div>' +
        '<div class="cv-lang"><span class="cv-lang-name">Spanish</span><span class="cv-lang-level">Conversational</span></div>' +
        "</div></section></aside>";
      var main = '<div class="cv-main">' + summary + experience + education + "</div>";
      html += '<div class="cv-columns">' +
        (template.layout === "sidebar-right" ? main + aside : aside + main) +
        "</div>";
    } else {
      html += summary + skills + experience + education;
    }

    html += "</div></div>";
    return html;
  }

  function surfaceSelector() {
    return ".cv-paper:not(.tpl-preview-paper), .page[data-cv-surface], [data-cv-surface]:not(.tpl-preview-paper)";
  }

  function updateModalPreview(id) {
    var modal = getModal();
    if (!modal) return;
    var template = templateById(id);
    var stage = modal.querySelector("[data-template-preview]");
    var meta = modal.querySelector("[data-template-preview-meta]");
    if (stage) {
      stage.innerHTML = samplePreviewHtml(template);
      var paper = stage.querySelector(".tpl-preview-paper");
      if (paper) {
        var accent = getComputedStyle(document.documentElement).getPropertyValue("--cv-accent");
        var live = document.querySelector(".cv-paper[data-cv-surface], .page[data-cv-surface]");
        if (live) {
          paper.style.setProperty("--cv-accent", getComputedStyle(live).getPropertyValue("--cv-accent") || accent || template.preview);
        } else {
          paper.style.setProperty("--cv-accent", template.preview || "#1e3d6b");
        }
      }
    }
    if (meta) {
      meta.innerHTML = "<strong>" + escapeHtml(template.label) + "</strong>" +
        "<span>" + escapeHtml(template.description) + "</span>";
    }
    modal.querySelectorAll(".tpl-card").forEach(function (card) {
      var selected = card.getAttribute("data-template-id") === template.id;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-pressed", String(selected));
    });
  }

  BuildCV.applyResumeTemplate = function (id, options) {
    var template = templateById(id || BuildCV.getTemplateId());
    writeStoredId(template.id);
    pendingId = template.id;

    document.querySelectorAll(surfaceSelector()).forEach(function (el) {
      el.setAttribute("data-template", template.id);
    });

    /* Keep Clarity looking teal like the reference design */
    if (template.id === "clarity" && BuildCV.applyResumeTheme) {
      BuildCV.applyResumeTheme({ id: "teal", color: "#0f9d8e" });
    }

    document.querySelectorAll("[data-template-open]").forEach(function (btn) {
      btn.setAttribute("data-template-active", template.id);
      btn.setAttribute("title", "Select a resume template (current: " + template.label + ")");
      btn.setAttribute("aria-label", "Select a resume template (current: " + template.label + ")");
      var label = btn.querySelector("[data-template-label]");
      if (label) label.textContent = "Select template";
      var badge = btn.querySelector(".tpl-open-btn-badge");
      if (badge) badge.textContent = template.label;
    });

    updateModalPreview(template.id);

    if (!options || options.emit !== false) {
      try {
        document.dispatchEvent(
          new CustomEvent(EVENT_NAME, { detail: { id: template.id, template: template } })
        );
      } catch (err) {}
    }

    return template;
  };

  function getModal() {
    return document.getElementById("buildcv-template-modal");
  }

  BuildCV.closeTemplateModal = function () {
    var modal = getModal();
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("tpl-modal-open");
    var opener = document.querySelector("[data-template-open][data-template-last-focus='1']");
    if (opener) {
      opener.removeAttribute("data-template-last-focus");
      try { opener.focus(); } catch (err) {}
    }
  };

  BuildCV.openTemplateModal = function (opener) {
    ensureModal();
    var modal = getModal();
    if (!modal) return;
    pendingId = BuildCV.getTemplateId();
    updateModalPreview(pendingId);
    document.querySelectorAll("[data-template-open][data-template-last-focus]").forEach(function (btn) {
      btn.removeAttribute("data-template-last-focus");
    });
    if (opener) opener.setAttribute("data-template-last-focus", "1");
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("tpl-modal-open");
    var selectedCard = modal.querySelector(".tpl-card.is-selected");
    if (selectedCard) {
      try { selectedCard.focus(); } catch (err) {}
    }
  };

  function styleOpenButtons() {
    document.querySelectorAll("[data-template-open]").forEach(function (btn) {
      btn.classList.add("tpl-open-btn");
      if (!btn.querySelector("[data-template-label]")) {
        var current = templateById(BuildCV.getTemplateId());
        var icon = '<span class="tpl-open-btn-icon" aria-hidden="true">✦</span>';
        var text = '<span data-template-label>Select template</span>';
        var badge = '<span class="tpl-open-btn-badge">' + escapeHtml(current.label) + "</span>";
        btn.innerHTML = icon + text + badge;
        btn.setAttribute("title", "Select a resume template (current: " + current.label + ")");
        btn.setAttribute("aria-label", "Select a resume template (current: " + current.label + ")");
      }
    });
  }

  function ensureModal() {
    var existing = getModal();
    if (existing) {
      var cards = existing.querySelectorAll(".tpl-card").length;
      if (cards === BuildCV.CV_TEMPLATES.length) return;
      existing.parentNode.removeChild(existing);
    }

    var wrap = document.createElement("div");
    wrap.id = "buildcv-template-modal";
    wrap.className = "tpl-modal";
    wrap.hidden = true;
    wrap.setAttribute("aria-hidden", "true");
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "buildcv-template-modal-title");

    var current = BuildCV.getTemplateId();
    var html = "";
    html += '<div class="tpl-modal-backdrop" data-template-close tabindex="-1"></div>';
    html += '<div class="tpl-modal-panel tpl-modal-panel--split">';
    html += '<div class="tpl-modal-head">';
    html += '<div><h2 id="buildcv-template-modal-title">Choose a template</h2>';
    html += '<p class="tpl-modal-sub">Select a layout and check the live preview before applying.</p></div>';
    html += '<button type="button" class="tpl-modal-close" data-template-close aria-label="Close templates">&times;</button>';
    html += "</div>";

    html += '<div class="tpl-modal-split">';
    html += '<div class="tpl-modal-preview-pane">';
    html += '<div class="tpl-modal-preview-label">Live preview</div>';
    html += '<div class="tpl-modal-preview-meta" data-template-preview-meta></div>';
    html += '<div class="tpl-modal-preview-stage" data-template-preview></div>';
    html += "</div>";

    html += '<div class="tpl-modal-body"><div class="tpl-picker tpl-picker--modal" role="group" aria-label="Resume templates">';
    html += '<div class="tpl-grid">';

    BuildCV.CV_TEMPLATES.forEach(function (template) {
      var selected = template.id === current;
      html += '<button type="button" class="tpl-card' + (selected ? " is-selected" : "") +
        '" data-template-id="' + escapeHtml(template.id) +
        '" aria-pressed="' + String(selected) +
        '" title="' + escapeHtml(template.description) + '">';
      html += BuildCV.renderTemplateMini(template);
      html += '<span class="tpl-card-label">' + escapeHtml(template.label) + "</span>";
      html += '<span class="tpl-card-desc">' + escapeHtml(template.description) + "</span>";
      html += "</button>";
    });

    html += "</div></div></div></div>";
    html += '<div class="tpl-modal-foot">';
    html += '<button type="button" class="tpl-modal-btn tpl-modal-btn--ghost" data-template-close>Cancel</button>';
    html += '<button type="button" class="tpl-modal-btn tpl-modal-btn--primary" data-template-apply>Apply template</button>';
    html += "</div></div>";

    wrap.innerHTML = html;
    document.body.appendChild(wrap);
    updateModalPreview(current);

    wrap.addEventListener("click", function (event) {
      if (event.target.closest("[data-template-close]")) {
        BuildCV.closeTemplateModal();
        return;
      }
      if (event.target.closest("[data-template-apply]")) {
        BuildCV.applyResumeTemplate(pendingId || BuildCV.getTemplateId());
        if (BuildCV.showToast) {
          BuildCV.showToast("Template: " + templateById(pendingId || BuildCV.getTemplateId()).label);
        }
        BuildCV.closeTemplateModal();
        return;
      }
      var card = event.target.closest(".tpl-card");
      if (!card || !wrap.contains(card)) return;
      pendingId = card.getAttribute("data-template-id");
      updateModalPreview(pendingId);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && getModal() && !getModal().hidden) {
        BuildCV.closeTemplateModal();
      }
    });
  }

  BuildCV.initTemplatePickers = function () {
    ensureModal();
    styleOpenButtons();

    document.querySelectorAll("[data-template-open]").forEach(function (btn) {
      if (btn.getAttribute("data-template-bound") === "1") return;
      btn.setAttribute("data-template-bound", "1");
      btn.setAttribute("type", btn.getAttribute("type") || "button");
      btn.addEventListener("click", function () {
        BuildCV.openTemplateModal(btn);
      });
    });

    BuildCV.applyResumeTemplate(BuildCV.getTemplateId(), { emit: false });
  };

  BuildCV.TEMPLATE_CHANGE_EVENT = EVENT_NAME;

  if (BuildCV.CONFIG && BuildCV.CONFIG.storage) {
    BuildCV.CONFIG.storage.template = STORAGE_KEY;
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector("[data-template-open]")) {
      BuildCV.initTemplatePickers();
    }
  });
})(typeof window !== "undefined" ? window : this);

/**
 * BuildCV core: configuration, routing, navigation, and shared helpers.
 * Scripts are loaded as classic files so the app can run from file:// without module CORS issues.
 */
(function () {
  "use strict";

  var BuildCV = (window.BuildCV = window.BuildCV || {});

  BuildCV.CONFIG = {
    routes: {
      home: "home",
      getMyCv: "get-my-cv",
      buildJson: "build-json",
      compiler: "javascript-compiler",
      about: "about"
    },
    files: {
      cvEditor: "cvEditor.html",
      quiz: "quiz.html",
      typescript: "typescript.html",
      pythonPdf: "python.pdf",
      fastapiPdf: "fastapi.pdf",
      cvPdf: "cv.pdf"
    },
    storage: {
      resume: "buildcv.resume.v1",
      json: "buildcv.json.v1",
      compiler: "buildcv.compiler.v1",
      theme: "buildcv.theme.v1",
      template: "buildcv.template.v3"
    }
  };

  BuildCV.THEMES = [
    { id: "navy", label: "Navy", accent: "#1e3d6b" },
    { id: "teal", label: "Teal", accent: "#0f9d8e" },
    { id: "indigo", label: "Indigo", accent: "#4338ca" },
    { id: "burgundy", label: "Burgundy", accent: "#9f1239" },
    { id: "forest", label: "Forest", accent: "#166534" },
    { id: "charcoal", label: "Charcoal", accent: "#1f2937" },
    { id: "copper", label: "Copper", accent: "#c2410c" }
  ];

  function defaultThemeState() {
    return { id: "navy", color: "#1e3d6b" };
  }

  function themeById(id) {
    return BuildCV.THEMES.filter(function (theme) { return theme.id === id; })[0];
  }

  /**
   * Apply a resume color theme to every live CV preview and keep pickers in sync.
   */
  BuildCV.applyResumeTheme = function (next) {
    var current = BuildCV.readStorage(BuildCV.CONFIG.storage.theme, defaultThemeState()) || defaultThemeState();
    var preset = next && next.id ? themeById(next.id) : null;
    var state = {
      id: next && next.id ? next.id : current.id,
      color: (next && next.color) || (preset && preset.accent) || current.color || "#1e3d6b"
    };
    if (state.id !== "custom" && preset) {
      state.color = preset.accent;
    }
    BuildCV.writeStorage(BuildCV.CONFIG.storage.theme, state);

    document.querySelectorAll(".cv-paper").forEach(function (paper) {
      paper.setAttribute("data-theme", state.id === "custom" ? "custom" : state.id);
      paper.style.setProperty("--cv-accent", state.color);
    });

    document.querySelectorAll("[data-theme-picker]").forEach(function (picker) {
      picker.querySelectorAll(".theme-swatch").forEach(function (btn) {
        var selected = btn.getAttribute("data-theme-id") === state.id;
        btn.classList.toggle("is-selected", selected);
        btn.setAttribute("aria-pressed", String(selected));
      });
      var colorInput = picker.querySelector('input[type="color"]');
      if (colorInput && colorInput.value.toLowerCase() !== state.color.toLowerCase()) {
        colorInput.value = state.color;
      }
    });
  };

  /**
   * Render theme swatches and a custom color input on resume builder toolbars.
   */
  BuildCV.initThemePickers = function () {
    var saved = BuildCV.readStorage(BuildCV.CONFIG.storage.theme, defaultThemeState()) || defaultThemeState();
    document.querySelectorAll("[data-theme-picker]").forEach(function (picker) {
      var html = '<div class="theme-picker" role="group" aria-label="Resume theme">';
      html += '<span class="theme-label">Theme</span><div class="theme-swatches">';
      BuildCV.THEMES.forEach(function (theme) {
        html += '<button class="theme-swatch" type="button" data-theme-id="' + theme.id +
          '" style="background:' + theme.accent + '" title="' + theme.label +
          '" aria-label="' + theme.label + ' theme"></button>';
      });
      html += "</div>";
      html += '<label class="theme-custom"><span>Color</span>';
      html += '<input type="color" value="' + BuildCV.escapeHtml(saved.color || "#1e3d6b") +
        '" aria-label="Custom resume color"></label></div>';
      picker.innerHTML = html;

      picker.addEventListener("click", function (event) {
        var btn = event.target.closest(".theme-swatch");
        if (!btn) return;
        BuildCV.applyResumeTheme({ id: btn.getAttribute("data-theme-id") });
      });

      var colorInput = picker.querySelector('input[type="color"]');
      if (colorInput) {
        colorInput.addEventListener("input", function () {
          BuildCV.applyResumeTheme({ id: "custom", color: colorInput.value });
        });
      }
    });
    BuildCV.applyResumeTheme(saved);
  };

  var toastTimer = null;

  /**
   * Escape user text before inserting into HTML.
   */
  BuildCV.escapeHtml = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  BuildCV.uid = function () {
    if (window.crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  };

  BuildCV.readStorage = function (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  };

  BuildCV.writeStorage = function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      BuildCV.showToast("Could not save locally. Storage may be full or blocked.");
    }
  };

  BuildCV.showToast = function (message) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.hidden = true;
    }, 2600);
  };

  function removePrintRoot() {
    var root = document.getElementById("print-root");
    if (root && root.parentNode) {
      root.parentNode.removeChild(root);
    }
  }

  function clearPrintState() {
    document.documentElement.classList.remove("is-printing");
    document.body.classList.remove("is-printing");
    removePrintRoot();
    document.querySelectorAll(".cv-paper").forEach(function (paper) {
      paper.classList.remove("print-target");
    });
  }

  /**
   * Clone the visible CV to the document body so print/download matches the
   * live preview (including the active template), then open the print dialog.
   */
  BuildCV.printActiveResume = function () {
    var activeView = document.querySelector(".view.is-active");
    var target = activeView ? activeView.querySelector(".cv-paper") : null;
    if (!target || !target.innerHTML.trim()) {
      BuildCV.showToast("There is no resume to print yet.");
      return;
    }

    removePrintRoot();

    var clone = target.cloneNode(true);
    clone.id = "print-root";
    clone.className = (target.className || "cv-paper") + " print-target";
    clone.classList.remove("hidden");

    var templateId =
      target.getAttribute("data-template") ||
      (BuildCV.getTemplateId ? BuildCV.getTemplateId() : "clarity");
    clone.setAttribute("data-template", templateId);
    if (target.hasAttribute("data-cv-surface")) {
      clone.setAttribute("data-cv-surface", target.getAttribute("data-cv-surface") || "");
    }

    var accent =
      getComputedStyle(target).getPropertyValue("--cv-accent").trim() || "#1e3d6b";
    clone.style.setProperty("--cv-accent", accent);

    // Keep template-critical inline styles from the live preview when present.
    if (target.style && target.style.cssText) {
      clone.style.cssText = target.style.cssText;
      clone.style.setProperty("--cv-accent", accent);
    }

    document.documentElement.classList.add("is-printing");
    document.body.classList.add("is-printing");
    document.body.appendChild(clone);

    // Let layout paint with print classes before the dialog opens.
    requestAnimationFrame(function () {
      window.print();
    });
  };

  window.addEventListener("afterprint", clearPrintState);

  function routeFromHash() {
    var hash = (location.hash || "#home").replace(/^#/, "");
    var known = Object.keys(BuildCV.CONFIG.routes).map(function (k) {
      return BuildCV.CONFIG.routes[k];
    });
    return known.indexOf(hash) === -1 ? "home" : hash;
  }

  /**
   * SPA hash routing: show one view and highlight the matching nav item.
   */
  BuildCV.showRoute = function (route) {
    var views = document.querySelectorAll(".view");
    views.forEach(function (view) {
      var match = view.getAttribute("data-view") === route;
      view.hidden = !match;
      view.classList.toggle("is-active", match);
    });

    document.querySelectorAll(".nav-link[data-route]").forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-route") === route);
    });

    closeMobileNav();
    closeInterviewMenu();

    window.scrollTo(0, 0);
  };

  function closeMobileNav() {
    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    if (nav) nav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  function closeInterviewMenu() {
    var menu = document.getElementById("interview-menu");
    var trigger = document.getElementById("interview-trigger");
    if (menu) menu.hidden = true;
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  }

  function openInterviewMenu() {
    var menu = document.getElementById("interview-menu");
    var trigger = document.getElementById("interview-trigger");
    if (menu) menu.hidden = false;
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    var first = menu.querySelector("a, button");
    if (first) first.focus();
  }

  function bindNavigation() {
    document.querySelectorAll("[data-route]").forEach(function (el) {
      el.addEventListener("click", function () {
        closeMobileNav();
      });
    });

    window.addEventListener("hashchange", function () {
      BuildCV.showRoute(routeFromHash());
    });

    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = !nav.classList.contains("is-open");
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
    }

    var trigger = document.getElementById("interview-trigger");
    var menu = document.getElementById("interview-menu");
    var dropdown = document.getElementById("interview-dropdown");

    if (trigger && menu) {
      trigger.addEventListener("click", function (event) {
        event.stopPropagation();
        if (menu.hidden) openInterviewMenu();
        else closeInterviewMenu();
      });

      trigger.addEventListener("keydown", function (event) {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          if (menu.hidden) openInterviewMenu();
        }
        if (event.key === "Escape") {
          closeInterviewMenu();
          trigger.focus();
        }
      });

      menu.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeInterviewMenu();
          trigger.focus();
        }
      });
    }

    document.addEventListener("click", function (event) {
      if (dropdown && !dropdown.contains(event.target)) {
        closeInterviewMenu();
      }
    });

    var javaBtn = document.getElementById("java-coming-soon");
    if (javaBtn) {
      javaBtn.addEventListener("click", function () {
        window.alert("Java interview preparation is coming soon!");
        closeInterviewMenu();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var editorLink = document.getElementById("open-cv-editor");
    if (editorLink) editorLink.setAttribute("href", BuildCV.CONFIG.files.cvEditor);

    var files = BuildCV.CONFIG.files;
    var interviewHrefs = [files.quiz, files.typescript, files.pythonPdf, files.fastapiPdf];
    document.querySelectorAll("#interview-menu a").forEach(function (link, index) {
      if (interviewHrefs[index]) link.setAttribute("href", interviewHrefs[index]);
    });

    var pdfFrame = document.getElementById("cv-pdf-frame");
    var downloadCv = document.getElementById("download-stored-cv");
    if (pdfFrame) pdfFrame.src = files.cvPdf;
    if (downloadCv) {
      downloadCv.href = files.cvPdf;
      downloadCv.setAttribute("download", "BuildCV-Resume.pdf");
    }
    document.querySelectorAll('a[href="cv.pdf"]').forEach(function (link) {
      link.href = files.cvPdf;
    });

    bindNavigation();
    BuildCV.initThemePickers();
    if (BuildCV.initTemplatePickers) BuildCV.initTemplatePickers();
    if (!location.hash) {
      history.replaceState(null, "", "#home");
    }
    BuildCV.showRoute(routeFromHash());
  });
})();

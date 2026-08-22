/**
 * JSON CV builder: validate, preview, persist, copy, and reset to sample JSON.
 */
(function () {
  "use strict";

  var BuildCV = window.BuildCV;
  var editor;
  var preview;
  var statusEl;
  var debounceTimer = null;
  var lastValid = null;

  var SAMPLE = {
    personal: {
      name: "Abhishek Kumar",
      title: "React JS Developer",
      email: "example@email.com",
      phone: "+91 XXXXX XXXXX",
      location: "India",
      website: "https://www.buildcv.co.in/",
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/"
    },
    summary: "Frontend developer focused on accessible React applications, clean component design, and practical tooling for resumes and developer workflows.",
    skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "REST APIs"],
    experience: [
      {
        company: "Example Tech",
        role: "React JS Developer",
        location: "Remote",
        startDate: "Jan 2022",
        endDate: "Present",
        description: [
          "Built reusable UI components and kept client-side state predictable.",
          "Improved form validation, accessibility, and responsive layouts."
        ],
        technologies: ["React", "JavaScript"]
      }
    ],
    education: [
      {
        school: "Example University",
        degree: "B.Tech",
        field: "Computer Science",
        location: "India",
        startDate: "2018",
        endDate: "2022",
        details: ""
      }
    ],
    projects: [
      {
        name: "BuildCV",
        url: "https://www.buildcv.co.in/",
        description: "Browser-based resume builder with live preview and JSON generation.",
        technologies: ["HTML", "CSS", "JavaScript"]
      }
    ],
    certifications: [
      { name: "Example Certification", issuer: "Example Org", date: "2024" }
    ],
    achievements: ["Shipped production UI used by job seekers to generate ATS-friendly resumes."],
    languages: [
      { name: "English", proficiency: "Professional" },
      { name: "Hindi", proficiency: "Native" }
    ]
  };

  function setStatus(message, ok) {
    if (!statusEl) return;
    if (!message) {
      statusEl.hidden = true;
      statusEl.textContent = "";
      statusEl.className = "container status-banner";
      return;
    }
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.className = "container status-banner " + (ok ? "is-ok" : "is-error");
  }

  function pretty(obj) {
    return JSON.stringify(obj, null, 2);
  }

  /**
   * Parse editor text. Returns { ok, data, error }.
   */
  BuildCV.parseResumeJson = function (text) {
    try {
      var data = JSON.parse(text);
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return { ok: false, error: "JSON must be an object with resume fields." };
      }
      return { ok: true, data: BuildCV.normalizeResume(data) };
    } catch (err) {
      return { ok: false, error: err.message || "Invalid JSON." };
    }
  };

  function applyPreview(data) {
    lastValid = data;
    BuildCV.mountResume(preview, data);
  }

  function validateAndRender(showSuccess) {
    var result = BuildCV.parseResumeJson(editor.value);
    if (!result.ok) {
      setStatus("Invalid JSON: " + result.error, false);
      return false;
    }
    applyPreview(result.data);
    BuildCV.writeStorage(BuildCV.CONFIG.storage.json, editor.value);
    if (showSuccess) setStatus("JSON is valid. Live preview updated.", true);
    else setStatus("", true);
    return true;
  }

  function resetSample() {
    editor.value = pretty(SAMPLE);
    validateAndRender(true);
    setStatus("Sample JSON loaded.", true);
  }

  async function copyJson() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(editor.value);
      } else {
        editor.select();
        document.execCommand("copy");
      }
      BuildCV.showToast("JSON copied to clipboard.");
    } catch (err) {
      setStatus("Could not copy JSON. Select the editor text and copy manually.", false);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    editor = document.getElementById("json-editor");
    preview = document.getElementById("json-cv-preview");
    statusEl = document.getElementById("json-status");
    if (!editor || !preview) return;

    var saved = BuildCV.readStorage(BuildCV.CONFIG.storage.json, null);
    editor.value = typeof saved === "string" && saved.trim() ? saved : pretty(SAMPLE);
    validateAndRender(false);

    editor.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        validateAndRender(false);
      }, 250);
    });

    document.getElementById("json-validate").addEventListener("click", function () {
      validateAndRender(true);
    });

    document.getElementById("json-reset").addEventListener("click", resetSample);
    document.getElementById("json-copy").addEventListener("click", copyJson);

    document.getElementById("json-download").addEventListener("click", function () {
      if (!validateAndRender(true)) {
        BuildCV.showToast("Fix JSON errors before downloading.");
        return;
      }
      var name = lastValid && lastValid.personal && lastValid.personal.name;
      if (!name) {
        setStatus("Add personal.name before downloading.", false);
        return;
      }
      BuildCV.printActiveResume();
    });

    document.addEventListener(BuildCV.TEMPLATE_CHANGE_EVENT || "buildcv:templatechange", function () {
      if (lastValid) {
        BuildCV.mountResume(preview, lastValid);
      } else if (preview) {
        validateAndRender(false);
      }
    });
  });
})();

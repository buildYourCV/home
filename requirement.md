# BuildCV Web Application — Code Generation Requirements

## 1. Project Overview

Create a responsive web application for **BuildCV** using only:

- HTML5
- CSS3
- Vanilla JavaScript

The generated application must run directly in a modern browser without requiring a backend.

The website is for **https://www.buildcv.co.in/** and should provide CV/resume creation, editing, preview, downloading, a JSON-based CV builder, a JavaScript online compiler, and interview-preparation resources.

## 2. Required Entry File

The main entry file **must be named**:

`index.html`

The application should be launchable by opening `index.html` in a browser.

Recommended supporting structure:

```text
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── cvEditor.html
├── quiz.html
├── typescript.html
├── python.pdf
├── fastapi.pdf
└── cv.pdf
```

If the implementation uses separate CSS/JS files, keep them clearly referenced from `index.html`.

## 3. General UI Requirements

Build a professional, modern, responsive UI suitable for a CV/resume website.

Requirements:

- Responsive on desktop, tablet, and mobile.
- Clean header/navigation bar.
- Consistent typography, spacing, buttons, cards, borders, and shadows.
- Navigation should work without a backend.
- Active menu item should be visually highlighted.
- Use semantic HTML5.
- Use accessible labels, buttons, links, and form controls.
- Avoid unnecessary external dependencies.
- Prefer vanilla JavaScript.
- Do not use inline JavaScript unless there is a strong reason.
- Do not hard-code large amounts of repeated HTML where JavaScript rendering is more appropriate.

## 4. Header Navigation

The header must contain the following menu options:

1. Home
2. Get My CV
3. Build CV Using JSON
4. Javascript Online Compiler
5. Interview Preparation
6. About

### Interview Preparation Dropdown

`Interview Preparation` must be a dropdown menu containing:

1. React & Beyond Quiz
2. TypeScript
3. Python
4. FastAPI
5. Java

Behavior:

- React & Beyond Quiz → open `quiz.html`
- TypeScript → open `typescript.html`
- Python → open `python.pdf`
- FastAPI → open `fastapi.pdf`
- Java → display an alert:
  `Java interview preparation is coming soon!`

The dropdown should work with mouse and keyboard where practical and should be responsive on mobile.

## 5. Home Page

The Home page is the main landing page.

It must provide three primary options.

### Option 1 — Upload Existing Resume

Allow the user to upload an existing `.docx` resume.

UI should include:

- File upload control.
- Only `.docx` files should be accepted.
- A clear "Continue" button.
- Validation/error message for unsupported files.
- After continuing, show a CV/resume editor or editable resume representation.
- Show a **live preview on the right side**.
- Provide a **Download Resume/CV** button.

Important:

Because browser-only JavaScript cannot reliably parse every DOCX document without a DOCX parser library, structure the implementation so that DOCX processing can be plugged in cleanly.

If a client-side DOCX library is used, isolate the integration in a dedicated function/module.

The application should not silently pretend that a DOCX was parsed successfully when it was not.

### Option 2 — Build CV From Scratch

Provide a form/editor that allows the user to create a resume from scratch.

At minimum support:

- Personal information
  - Full name
  - Professional title
  - Email
  - Phone
  - Location
  - Website/LinkedIn/GitHub
- Professional summary
- Skills
- Work experience
- Education
- Projects
- Certifications
- Achievements
- Languages

Allow users to add/remove repeatable sections such as:

- Work experience
- Education
- Projects
- Certifications
- Achievements
- Skills

The page must use a two-column layout:

```text
+----------------------+--------------------------+
| Resume Editor/Form   | Live Resume Preview      |
|                      |                          |
| User enters data     | Updates immediately      |
|                      |                          |
+----------------------+--------------------------+
```

The preview must update immediately when the user changes form data.

Provide:

- Download Resume/CV button.
- Print option where useful.
- Reset/Clear option.
- Basic form validation.
- Persistent state using `localStorage` where appropriate so accidental refresh does not immediately lose data.

### Option 3 — Open CV Editor

Display an option/button that opens the existing file:

`cvEditor.html`

The file is already available and must be treated as an existing application.

Behavior:

- Clicking the option should open `cvEditor.html`.
- Prefer same-tab navigation unless the design explicitly provides an "Open in new tab" action.

## 6. Live Resume Preview

The live preview should resemble a professional ATS-friendly CV.

Requirements:

- Clean A4-like visual layout.
- Good typography.
- Clear section headings.
- Proper spacing.
- Avoid excessive graphics that could reduce ATS readability.
- Preview must update dynamically.
- Long content must wrap correctly.
- The preview must not overflow horizontally.
- Multiple work-experience, education, project, and certification entries must render correctly.
- Empty sections should not appear in the final CV.

### Download/Print

Provide a prominent:

`Download Resume`

button.

The preferred browser-compatible implementation is print-to-PDF using:

`window.print()`

with dedicated print CSS.

The print version should:

- Hide navigation and editor controls.
- Print only the CV.
- Use A4 dimensions.
- Avoid unnecessary blank pages.
- Avoid clipping content.
- Preserve typography and spacing as much as practical.
- Avoid showing browser-only UI elements.

If a client-side PDF library is included, keep the PDF implementation modular.

## 7. Get My CV Page

The `Get My CV` menu must display the user's CV stored as a PDF.

Expected file:

`cv.pdf`

The page should contain:

- Embedded PDF viewer using an `<iframe>` or `<embed>`.
- A prominent `Download CV` button.
- A fallback link if the browser cannot display the PDF.

Example behavior:

```text
Get My CV
--------------------------------
|                              |
|          CV PDF              |
|                              |
|                              |
--------------------------------

[ Download CV ]
```

Do not attempt to recreate the PDF content in HTML.

## 8. Build CV Using JSON

Create a dedicated page/view for:

`Build CV Using JSON`

The page must have a two-column layout.

Left:

- JSON editor

Right:

- Live CV preview

Top area:

- Validate JSON button
- Download Resume/CV button
- Reset to Sample JSON button
- Optional Copy JSON button

Layout:

```text
+------------------------------------------------------+
| Validate JSON | Download CV | Reset | Copy JSON      |
+----------------------------+-------------------------+
|                            |                         |
| JSON Editor                | Live CV Preview         |
|                            |                         |
| {                          |                         |
|   "name": "..."            |      Resume             |
| }                          |                         |
|                            |                         |
+----------------------------+-------------------------+
```

### JSON Editor Requirements

Use a textarea or a lightweight code-editor implementation.

Features:

- Syntax-friendly formatting.
- Clear error messages.
- JSON parsing using `JSON.parse()`.
- Validation before rendering.
- Do not render malformed JSON.
- Display useful parsing errors.
- Reset to valid sample JSON.

### Suggested JSON Structure

Support a structure similar to:

```json
{
  "personal": {
    "name": "Abhishek Kumar",
    "title": "React JS Developer",
    "email": "example@email.com",
    "phone": "+91 XXXXX XXXXX",
    "location": "India",
    "website": "",
    "linkedin": "",
    "github": ""
  },
  "summary": "",
  "skills": [],
  "experience": [
    {
      "company": "",
      "role": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "description": [],
      "technologies": []
    }
  ],
  "education": [],
  "projects": [],
  "certifications": [],
  "achievements": [],
  "languages": []
}
```

The renderer should tolerate missing optional fields.

## 9. JavaScript Online Compiler

Create a page named/view called:

`Javascript Online Compiler`

The UI must contain:

- Left section: JavaScript editor.
- Right section: output/console.
- Run button.
- Clear button.
- Optional sample code button.

Layout:

```text
+-----------------------------------------------+
| JavaScript Online Compiler                    |
+-----------------------------------------------+
|                                               |
| [ Run ] [ Clear ] [ Sample ]                  |
|                                               |
+----------------------+------------------------+
| JavaScript Editor   | Output                 |
|                      |                        |
| const x = 10;       | 20                     |
| console.log(x * 2); |                        |
|                      |                        |
+----------------------+------------------------+
```

### Compiler Behavior

When the user clicks `Run`:

- Execute the entered JavaScript in a controlled browser context.
- Capture `console.log()` output.
- Display output in the right panel.
- Display runtime errors clearly.
- Provide a clear-output option.

Do not execute arbitrary code using `eval()` in the main application context if a safer isolated execution approach is practical.

Prefer an isolated iframe for user code execution.

The implementation should clearly separate:

- Editor
- Execution
- Console capture
- Error handling

The compiler is intended for learning/demo purposes and should not claim to be a secure sandbox for hostile code.

## 10. Interview Preparation

The Interview Preparation menu must be a dropdown.

### React & Beyond Quiz

Open:

`quiz.html`

Use normal navigation.

### TypeScript

Open:

`typescript.html`

Use normal navigation.

### Python

Open:

`python.pdf`

Use normal navigation or a PDF viewer.

### FastAPI

Open:

`fastapi.pdf`

Use normal navigation or a PDF viewer.

### Java

Show an alert:

`Java interview preparation is coming soon!`

Do not navigate to a non-existent Java resource.

## 11. About Page

Create an About page describing BuildCV.

The page should communicate that BuildCV is a platform designed to help users:

- Create professional CVs/resumes.
- Build resumes from scratch.
- Generate CVs using JSON.
- Preview resumes live.
- Download/print resumes.
- Access an existing CV.
- Practice JavaScript through an online compiler.
- Prepare for technical interviews.
- Access React, TypeScript, Python, FastAPI, and Java preparation resources.
- Build ATS-friendly resumes quickly.

Mention the official website:

`https://www.buildcv.co.in/`

Use a strong, professional description similar in spirit to:

"BuildCV is a simple and practical online platform designed to help developers and job seekers create professional, ATS-friendly resumes quickly. It combines CV creation, live preview, JSON-based resume generation, interview preparation resources, and developer-focused learning tools in one place."

Do not make unsupported claims such as accreditation, guaranteed interviews, guaranteed jobs, or official partnerships.

## 12. Application Architecture

Use a simple maintainable architecture.

Suggested structure:

```text
index.html
css/
  style.css
js/
  app.js
  resume-builder.js
  json-cv.js
  js-compiler.js
assets/
  images/
  icons/
cvEditor.html
quiz.html
typescript.html
cv.pdf
python.pdf
fastapi.pdf
```

It is acceptable to simplify the file structure if the final application remains maintainable.

### JavaScript Modules

Separate functionality conceptually into:

1. Navigation
2. Home page
3. Resume builder
4. Live preview
5. DOCX import
6. JSON CV editor
7. PDF/print/download
8. JavaScript compiler
9. Interview dropdown
10. Local storage

Avoid creating one extremely large JavaScript function.

## 13. Navigation

The application can be implemented as either:

### Option A — Single-page application style

Use one `index.html` and dynamically switch sections.

Recommended for the main application.

OR

### Option B — Multiple HTML pages

Use separate HTML pages.

If using SPA-style navigation:

- Each menu item should update the visible content.
- Browser back/forward behavior should work if practical.
- Use URL hash routing such as:
  - `#home`
  - `#get-my-cv`
  - `#build-json`
  - `#javascript-compiler`
  - `#about`

Interview resources can still navigate to their existing files.

## 14. Responsive Design

Desktop:

- Header navigation across the top.
- Editor and preview displayed side-by-side.
- JSON editor and preview displayed side-by-side.
- JavaScript editor and output displayed side-by-side.

Mobile:

- Collapsible navigation.
- Editor and preview stack vertically.
- JSON editor and preview stack vertically.
- JavaScript editor and output stack vertically.
- Buttons remain usable without horizontal scrolling.

## 15. Error Handling

Implement user-friendly error handling.

Examples:

- Invalid JSON.
- Unsupported resume file.
- Missing linked resource.
- JavaScript runtime error.
- Empty required resume fields.
- Browser print/download limitations.

Errors should be displayed in the UI rather than only logged to the developer console.

## 16. Security Considerations

Because the application includes a JavaScript compiler:

- Do not execute user JavaScript directly in the main page where avoidable.
- Prefer an iframe-based execution environment.
- Clearly isolate compiler output.
- Do not expose application secrets.
- Never place API keys in frontend source code.
- Treat uploaded resume files as untrusted input.
- Escape user-provided text before inserting it into HTML.
- Avoid unsafe `innerHTML` usage for arbitrary user input where possible.

## 17. Performance

The application should:

- Avoid unnecessary DOM re-rendering.
- Debounce expensive live-preview operations if required.
- Keep CSS and JavaScript organized.
- Avoid unnecessary external libraries.
- Load resources only when needed where practical.

## 18. Accessibility

Implement:

- Proper button labels.
- `<label>` elements for form controls.
- Keyboard-accessible navigation.
- Visible focus states.
- Sufficient text/background contrast.
- Semantic headings.
- ARIA attributes only where necessary.

## 19. Browser Compatibility

Target current versions of:

- Google Chrome
- Microsoft Edge
- Firefox
- Safari

The application should gracefully handle browser limitations.

## 20. Acceptance Criteria

The implementation is considered complete when all of the following work:

### Header

- [ ] Home menu works.
- [ ] Get My CV menu works.
- [ ] Build CV Using JSON menu works.
- [ ] Javascript Online Compiler menu works.
- [ ] Interview Preparation dropdown works.
- [ ] About menu works.

### Home

- [ ] DOCX upload control exists.
- [ ] DOCX extension validation exists.
- [ ] Continue action exists.
- [ ] Build-from-scratch CV editor exists.
- [ ] Live preview appears on the right on desktop.
- [ ] Live preview updates as the user edits.
- [ ] Download/print CV works.
- [ ] CV Editor option opens `cvEditor.html`.

### Get My CV

- [ ] `cv.pdf` is displayed.
- [ ] Download CV button works.
- [ ] PDF fallback is provided.

### JSON CV Builder

- [ ] JSON editor exists.
- [ ] JSON validation works.
- [ ] Invalid JSON displays an error.
- [ ] Valid JSON generates a live CV preview.
- [ ] Preview updates when JSON changes.
- [ ] Download/print CV works.
- [ ] Reset to sample JSON works.

### JavaScript Compiler

- [ ] JavaScript editor exists.
- [ ] Run button exists.
- [ ] Code executes.
- [ ] `console.log()` output is displayed.
- [ ] Runtime errors are displayed.
- [ ] Clear button works.
- [ ] Execution is isolated as much as practical.

### Interview Preparation

- [ ] React & Beyond Quiz opens `quiz.html`.
- [ ] TypeScript opens `typescript.html`.
- [ ] Python opens `python.pdf`.
- [ ] FastAPI opens `fastapi.pdf`.
- [ ] Java displays the Coming Soon alert.

### About

- [ ] About page describes BuildCV.
- [ ] Official website `https://www.buildcv.co.in/` is included.

### Quality

- [ ] Responsive layout.
- [ ] No unnecessary horizontal scrolling.
- [ ] Clean professional UI.
- [ ] No broken navigation.
- [ ] No JavaScript errors during normal usage.
- [ ] User input is safely escaped before rendering.
- [ ] Print output is CV-focused and A4-friendly.

## 21. Important Implementation Notes

1. The generated code must be directly runnable in a browser.
2. `index.html` is the required entry point.
3. Existing files such as `cvEditor.html`, `quiz.html`, `typescript.html`, `cv.pdf`, `python.pdf`, and `fastapi.pdf` should be referenced rather than recreated.
4. Do not assume a backend exists.
5. Do not add authentication unless explicitly requested.
6. Do not add a database unless explicitly requested.
7. Use client-side storage where persistence is useful.
8. Keep the implementation easy to extend.
9. Clearly comment important JavaScript functions.
10. Keep the UI professional enough for a production-style BuildCV website.
11. Ensure all navigation paths and file names are configurable from a central JavaScript configuration where practical.
12. The final generated application should prioritize working functionality over decorative UI.

## 22. Expected Final Deliverables

Generate the complete frontend implementation consisting of:

- `index.html`
- CSS file(s)
- JavaScript file(s)

The implementation must satisfy all requirements above and must be ready to run locally by opening:

`index.html`

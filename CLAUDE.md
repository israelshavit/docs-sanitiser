# Docs Sanitiser

A single-page web app that takes a screenshot (upload, drag and drop, or Ctrl+V) or a PDF (upload or drag and drop), reads its text in the browser, and paints realistic dummy values over every name, email address and number. Names and emails are linked into consistent "personas" (e.g. Daniel Levy + d.levy@example.com becomes Moshe Chaim + m.chaim@mail.com). Currency amounts are kept; dates keep their format. Originally built with Gemini; developed here from 2026-11-07.

## PDFs (added 2026-11-07)

- Each page is rendered with PDF.js and the pages are stacked into one tall canvas, so the existing engine links personas across pages.
- Text comes from the PDF's own text layer when it has one; pages with little or no text (scans) go through Tesseract OCR.
- The download is a flattened PDF built with jsPDF: one JPEG image per page, same page sizes. Text in it is not selectable, and hidden text, comments and document metadata do not survive (this is intended).
- Limits: 20 pages; total canvas height capped at 30,000 px (render scale shrinks for long documents). Password-protected PDFs are rejected with a message.

## Live site

- Repo: https://github.com/israelshavit/docs-sanitiser (public)
- Site: https://israelshavit.github.io/docs-sanitiser/ (GitHub Pages, served from `main`, root folder)
- Every push to `main` goes live about a minute later, so always ask before pushing.

## Files

- `index.html`: the whole app (markup, inline script, small inline style)
- `tailwind.css`: prebuilt Tailwind stylesheet; commit it
- `tailwind.config.js`, `tailwind.input.css`: inputs for rebuilding `tailwind.css`
- `.gitignore`: keeps PDFs and images (the user's manual, summary and screenshots) out of the public repo

The original Gemini file lives at `C:\Data\AI Projects\My Masker\` and is not edited.

## Tech choices

- Plain HTML and JavaScript, no framework. Opening `index.html` directly from disk must keep working.
- Tailwind 3 is prebuilt, not loaded from the Play CDN. After adding or changing Tailwind classes, rebuild:
  `npx tailwindcss@3.4.19 -i tailwind.input.css -o tailwind.css --minify`
- External resources are pinned to exact versions: Tesseract.js `5.1.1`, PDF.js (`pdfjs-dist`) `3.11.174` and jsPDF `4.2.1` (all jsDelivr), Font Awesome `6.5.1` (cdnjs), Google Fonts (Inter, JetBrains Mono). PDF.js stays on 3.x because 4.x+ ships only as ES modules.
- Browsers block cross-origin workers, so the PDF.js worker is fetched and started from a blob URL (`ensurePdfWorker`).
- Node 24 is only for tooling (Tailwind build, test scripts).

## Conventions

- Text that comes from OCR or from a file must be inserted with `textContent` or DOM nodes, never `innerHTML`.
- Images are never uploaded anywhere. The page itself does download code, fonts and OCR language data from CDNs; keep the footer wording honest about that.
- The public repo must not contain the user's real name, email or other personal data. The sample screenshot uses the fake person Daniel Levy / d.levy@example.com.
- Commits use the GitHub noreply email set in this repo's git config.
- Ask before adding anything not agreed with the user.

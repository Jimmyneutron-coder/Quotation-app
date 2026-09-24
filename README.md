# Quotation Builder

A client-side quotation generator built with **React**, **Vite** and **Tailwind CSS**. Enter customer details and line items, preview a formatted quotation, and download it as a PDF, all in the browser with no backend.

I built it for a friend's small business to replace their manual, daily quotation workflow.

**Live demo:** [quotation-app-0.netlify.app](https://quotation-app-0.netlify.app/)

<!-- Add 2 screenshots here (the form and the preview), e.g.:
![Quotation form](./docs/form.png)
![Quotation preview](./docs/preview.png)
-->

## Features

- Customer details form (name, phone) with dynamic line items: add and remove rows freely
- Validation before preview (required fields, positive quantity and price) with toast feedback
- Live-styled quotation preview with automatic line totals and grand total
- "Go Back" returns to the form with your data intact, so you can edit and re-preview
- One-click PDF download (A4), generated entirely on the client
- Responsive layout that works on mobile and desktop

## Tech stack

| Area | Tools |
|---|---|
| UI | React 19, React Router 7 |
| Build | Vite 6 |
| Styling | Tailwind CSS 3 |
| PDF generation | jsPDF, html2canvas |
| Notifications | react-hot-toast |
| Tooling | ESLint |
| Hosting | Netlify |

## How it works

- **State across routes:** The form data is passed to the preview page through React Router's `location.state` and passed back on "Go Back", so there is no global store or backend.
- **PDF generation:** `html2canvas` renders the quotation DOM node to a canvas, and `jsPDF` places that image on an A4 page and saves it.

## Performance

The initial JavaScript bundle was cut by about **72%** (843 KB → ~235 KB) with three changes:

1. **Route-based code splitting:** `Home` and `QuotationPreview` are loaded with `React.lazy` and `Suspense`, so each page downloads only when visited.
2. **Dynamic imports for heavy libraries:** `jsPDF` and `html2canvas` are imported inside the download handler, so they load only when the user clicks "Download Quotation".
3. **Manual chunking:** the PDF libraries are placed in their own chunk in `vite.config.js`.

I also audited the npm dependencies, resolved vulnerabilities (including a critical CVE) and checked changelogs for breaking changes before upgrading.

## Getting started

### Prerequisites
- Node.js 18+

### Install and run
```bash
git clone https://github.com/Jimmyneutron-coder/Quotation-app.git
cd Quotation-app
npm install
npm run dev
```
The app runs at `http://localhost:5173`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run host` | Start the dev server exposed on your network (test on your phone) |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  App.jsx                        Routes, lazy loading, toaster
  pages/Home.jsx                 Home route (renders the form)
  components/
    QuotationForm.jsx            Customer + line items form, validation
    QuotationPreview.jsx         Formatted quotation and PDF download
    BackgroundComponent.jsx      Page background
    Footer.jsx
vite.config.js                   Manual chunk for PDF libraries
```

## Customising for another business

The business details shown on the quotation (name, address, contact, GST number, services, proprietor) are written directly in `src/components/QuotationPreview.jsx`. Edit that block to adapt the quotation for a different business. The currency symbol (₹) is defined in the same file.

## Known limitations and next steps

- Quotations are not saved. Refreshing the preview page clears the data (there is no backend or local storage).
- The bill number field is left blank on the printed quotation.
- The PDF is a single-page image, so very long item lists may not fit on one A4 page.
- Possible improvements: multi-page PDF, auto-generated bill numbers, saved quotation history, and tests for the form validation.
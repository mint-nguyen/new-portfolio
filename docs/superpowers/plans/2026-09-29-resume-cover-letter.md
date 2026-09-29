# Resume and Cover Letter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a one-page resume and a one-page reusable cover letter as PDF and Word from one data file, with the resume PDF replacing the file the site already links to.

**Architecture:** `resume/data.js` holds every sentence and fact and loads both as a browser script and as a CommonJS module. Two HTML pages render it and are printed to PDF by Edge headless. One Node script renders the same data to `.docx` with the `docx` package. A shell script runs all of it.

**Tech Stack:** Plain HTML/CSS/JS, Edge headless `--print-to-pdf`, `docx` npm package (docx-js), Python `pypdf` for page counts, Word (COM via PowerShell) to render the .docx for a visual check.

**Spec:** `docs/superpowers/specs/2026-09-29-resume-cover-letter-design.md`

---

### Task 1: Data file

**Files:**
- Create: `resume/data.js`

- [x] **Step 1: Write `resume/data.js`**

```js
/* Single source of truth for the resume and cover letter.
   Loaded by resume.html and cover-letter.html as a plain <script> (window.RESUME)
   and by build-docx.js as a CommonJS module. Edit text here, then run resume/build.sh. */
const RESUME = {
  name: 'Mint Nguyen',
  headline: 'Full Stack Software Engineer · Founding Engineer at Hatch',
  location: 'Calgary, AB',
  email: 'pnguyen.lhp@gmail.com',
  phone: '+1 672 999 6118',
  linkedin: 'linkedin.com/in/mintnguyen',
  github: 'github.com/mint-nguyen',
  site: 'mintnguyen.com',
  summary:
    'Full stack software engineer with 6 years of shipping. Founding Engineer at Hatch, where I built a loan management platform for lenders from the first commit and now guide a team of 7+ engineers through it. Concurrently building pricing and operations software at S&T Properties, including a price-prediction model and a property management system that unifies every online travel agency. Strongest in TypeScript, React, Next.js, Node, NestJS, PostgreSQL, Python, Azure DevOps and Figma.',
  experience: [
    {
      company: 'Hatch Inc.',
      location: 'Montreal, QC (remote)',
      role: 'Founding Engineer',
      dates: 'Feb 2024 – Present',
      bullets: [
        'Built the loan management platform for personal and business lending from the first commit: decision automation, disbursements, and the admin tooling around them.',
        'Guide a team of 7+ engineers through the codebase: onboarding, code review standards, and architecture decisions.',
        'Work directly with founders and stakeholders to turn business goals into scoped, shippable work; design wireframes in Figma, then build them.',
        'Own the deployment pipeline from development to production on Azure DevOps.',
      ],
    },
    {
      company: 'S&T Properties Inc.',
      location: 'Calgary, AB',
      role: 'Full Stack Software Engineer',
      dates: 'Apr 2024 – Present',
      bullets: [
        'Build internal software for the pricing team, including a price-prediction model that informs pricing decisions and improved revenue.',
        'Build internal tools for the operations team that streamline day-to-day property operations.',
        'Building a property management system that brings every online travel agency the company lists on into one system.',
      ],
    },
    {
      company: 'Rocketplace Inc.',
      location: 'Vancouver, BC',
      role: 'Software Engineer',
      dates: 'Sep 2022 – Nov 2023',
      bullets: [
        'Designed and deployed new web features with a cross-functional team, resulting in a 20% increase in website performance.',
        'Revamped the dashboard and portfolio pages, leading to a 10% increase in signups.',
      ],
    },
    {
      company: 'Resilience Corporate Services',
      location: 'Toronto, ON',
      role: 'Frontend Developer',
      dates: 'Feb 2022 – Sep 2022',
      bullets: [
        "Sole frontend developer; built a web application visualizing TradeX's arbitrage platform alongside its data scientists.",
      ],
    },
    {
      company: 'InterU Network Inc.',
      location: 'Vancouver, BC',
      role: 'Data Engineer',
      dates: 'Oct 2021 – Feb 2022',
      bullets: [
        'Built and maintained scalable data pipelines for large-volume analysis and optimized database performance and query execution.',
      ],
    },
  ],
  skills: [
    { label: 'Languages', items: 'TypeScript, JavaScript (ES6+), Python' },
    { label: 'Backend', items: 'Node, NestJS, GraphQL, Django' },
    { label: 'Frontend', items: 'React, Next.js, Redux, React Native' },
    { label: 'Data', items: 'PostgreSQL, MySQL, MongoDB, Redis' },
    { label: 'Infra and delivery', items: 'Docker, Azure DevOps, Google Cloud, Firebase' },
    { label: 'Design and UI', items: 'Figma, Chakra UI, Material UI, Framer Motion' },
  ],
  education: {
    degree: 'BS Information Technology',
    school: 'Fairleigh Dickinson University',
    location: 'Vancouver, BC',
    dates: 'Jan 2021 – May 2024',
    honors: "Summa Cum Laude · Honor's List every semester",
  },
  coverLetter: {
    date: '[Date]',
    recipient: ['[Hiring manager name, or "Hiring team"]', '[Company]'],
    salutation: 'Dear [Hiring manager name or team],',
    paragraphs: [
      "I'm a full stack engineer who likes being there from the first commit. At Hatch I built a loan management platform for lenders from an empty repo, and as the team grew to 7+ engineers I became the person everyone pings about the codebase. I'd love to bring that same energy to the [Role] role at [Company], [one sentence on why this company].",
      "Building Hatch's platform meant owning the whole path: gathering requirements with the founders, wireframing in Figma, shipping the APIs and front ends, automating decisioning and disbursements, and running the pipeline that takes a change from laptop to production. Just as important, it meant keeping a growing team unblocked with small PRs, honest code review, and a map of the codebase that every new engineer gets in their first week.",
      'Alongside Hatch, I build internal software at S&T Properties: pricing tools with a price-prediction model that improved revenue, operations tools, and a property management system that pulls every online travel agency into one place. Different domain, same habit of turning a fuzzy business goal into something a team can ship.',
      "I work best in small teams that move fast and care about the details, which is why [Company] caught my eye. I'd welcome a conversation about how I can help. Thank you for your time, and if we do talk, the mint tea is on me.",
    ],
    closing: 'Sincerely,',
    signature: 'Mint Nguyen',
    signatureLine: 'pnguyen.lhp@gmail.com · +1 672 999 6118 · mintnguyen.com',
  },
}

if (typeof module !== 'undefined') module.exports = RESUME
```

- [x] **Step 2: Verify it loads as a module and contains no forbidden titles**

```bash
node -e "const r=require('./resume/data.js'); console.log(r.experience.length, 'roles;', r.coverLetter.paragraphs.length, 'paragraphs')"
grep -niE "tech lead|manager" resume/data.js || echo "CLEAN"
```

Expected: `5 roles; 4 paragraphs` and then `CLEAN` (the only "manager" hits allowed are "Hiring manager" in the letter template; if grep prints those lines only, that is fine).

---

### Task 2: HTML renderers

**Files:**
- Create: `resume/resume.html`, `resume/cover-letter.html`

- [x] **Step 1: Write `resume/resume.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Mint Nguyen – Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  @page { size: Letter; margin: 0.6in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #fff; }
  body {
    font-family: 'Poppins', 'Segoe UI', sans-serif;
    font-size: 10.2pt;
    line-height: 1.34;
    color: #12211a;
    width: 7.3in;
    margin: 0 auto;
  }
  a { color: inherit; text-decoration: none; }
  header { margin-bottom: 8pt; }
  .name { font-size: 22pt; font-weight: 700; letter-spacing: -0.01em; line-height: 1.1; }
  .headline { font-size: 11pt; font-weight: 600; color: #1f7a5c; margin-top: 2pt; }
  .contact { font-size: 9.2pt; color: #4e6a5c; margin-top: 4pt; }
  .contact span + span::before { content: ' · '; color: #9fb5a9; }
  h2 {
    font-size: 9.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
    color: #1f7a5c; border-bottom: 1px solid #1f7a5c; padding-bottom: 2pt;
    margin: 9pt 0 5pt;
  }
  .summary { text-align: left; }
  .role { display: flex; justify-content: space-between; align-items: baseline; margin-top: 6pt; }
  .role:first-of-type { margin-top: 0; }
  .role .title { font-weight: 700; }
  .role .company { color: #1f7a5c; font-weight: 600; }
  .role .where { color: #4e6a5c; }
  .role .dates { color: #4e6a5c; font-size: 9.2pt; white-space: nowrap; margin-left: 12pt; }
  ul { list-style: none; margin-top: 2pt; }
  li { position: relative; padding-left: 11pt; font-size: 9.8pt; margin-top: 1.5pt; }
  li::before { content: ''; position: absolute; left: 0; top: 0.52em; width: 5px; height: 5px; background: #1f7a5c; border-radius: 1px; }
  .skills div { margin-top: 1.5pt; }
  .skills b { font-weight: 600; }
  .edu { display: flex; justify-content: space-between; align-items: baseline; }
  .edu .honors { color: #4e6a5c; font-size: 9.6pt; margin-top: 1pt; }
</style>
</head>
<body>
<script src="./data.js"></script>
<script>
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const r = RESUME
  const exp = r.experience.map((e) => `
    <div class="role">
      <div><span class="title">${esc(e.role)}</span> · <span class="company">${esc(e.company)}</span> · <span class="where">${esc(e.location)}</span></div>
      <div class="dates">${esc(e.dates)}</div>
    </div>
    <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`).join('')
  const skills = r.skills.map((s) => `<div><b>${esc(s.label)}:</b> ${esc(s.items)}</div>`).join('')
  document.body.insertAdjacentHTML('beforeend', `
    <header>
      <div class="name">${esc(r.name)}</div>
      <div class="headline">${esc(r.headline)}</div>
      <div class="contact">
        <span>${esc(r.location)}</span>
        <span><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></span>
        <span>${esc(r.phone)}</span>
        <span><a href="https://${esc(r.linkedin)}">${esc(r.linkedin)}</a></span>
        <span><a href="https://${esc(r.github)}">${esc(r.github)}</a></span>
        <span><a href="https://${esc(r.site)}">${esc(r.site)}</a></span>
      </div>
    </header>
    <h2>Summary</h2>
    <p class="summary">${esc(r.summary)}</p>
    <h2>Experience</h2>
    ${exp}
    <h2>Skills</h2>
    <div class="skills">${skills}</div>
    <h2>Education</h2>
    <div class="edu">
      <div><span class="title" style="font-weight:700">${esc(r.education.degree)}</span> · <span class="company" style="color:#1f7a5c;font-weight:600">${esc(r.education.school)}</span> · <span class="where" style="color:#4e6a5c">${esc(r.education.location)}</span></div>
      <div class="dates" style="color:#4e6a5c;font-size:9.2pt;white-space:nowrap;margin-left:12pt">${esc(r.education.dates)}</div>
    </div>
    <div class="honors" style="color:#4e6a5c;font-size:9.6pt;margin-top:1pt">${esc(r.education.honors)}</div>
  `)
</script>
</body>
</html>
```

- [x] **Step 2: Write `resume/cover-letter.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Mint Nguyen – Cover Letter</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  @page { size: Letter; margin: 0.75in 0.8in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: #fff; }
  body {
    font-family: 'Poppins', 'Segoe UI', sans-serif;
    font-size: 10.8pt;
    line-height: 1.5;
    color: #12211a;
    width: 6.9in;
    margin: 0 auto;
  }
  a { color: inherit; text-decoration: none; }
  header { border-bottom: 1px solid #1f7a5c; padding-bottom: 8pt; margin-bottom: 18pt; }
  .name { font-size: 20pt; font-weight: 700; line-height: 1.1; }
  .headline { font-size: 10.5pt; font-weight: 600; color: #1f7a5c; margin-top: 2pt; }
  .contact { font-size: 9.2pt; color: #4e6a5c; margin-top: 3pt; }
  .contact span + span::before { content: ' · '; color: #9fb5a9; }
  .meta { color: #4e6a5c; margin-bottom: 14pt; }
  .meta div { line-height: 1.4; }
  p { margin-bottom: 10pt; }
  .field { color: #1f7a5c; font-weight: 600; }
  .closing { margin-top: 14pt; }
  .signature { font-weight: 700; margin-top: 14pt; }
  .sigline { color: #4e6a5c; font-size: 9.6pt; }
</style>
</head>
<body>
<script src="./data.js"></script>
<script>
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  // Bracketed template fields get a mint highlight so they are easy to find.
  const fields = (s) => esc(s).replace(/\[[^\]]+\]/g, (m) => `<span class="field">${m}</span>`)
  const r = RESUME
  const c = r.coverLetter
  document.body.insertAdjacentHTML('beforeend', `
    <header>
      <div class="name">${esc(r.name)}</div>
      <div class="headline">${esc(r.headline)}</div>
      <div class="contact">
        <span>${esc(r.location)}</span>
        <span><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></span>
        <span>${esc(r.phone)}</span>
        <span><a href="https://${esc(r.linkedin)}">${esc(r.linkedin)}</a></span>
        <span><a href="https://${esc(r.site)}">${esc(r.site)}</a></span>
      </div>
    </header>
    <div class="meta">
      <div>${fields(c.date)}</div>
      <div style="margin-top:8pt">${c.recipient.map(fields).join('<br />')}</div>
    </div>
    <p>${fields(c.salutation)}</p>
    ${c.paragraphs.map((p) => `<p>${fields(p)}</p>`).join('')}
    <p class="closing">${esc(c.closing)}</p>
    <div class="signature">${esc(c.signature)}</div>
    <div class="sigline">${esc(c.signatureLine)}</div>
  `)
</script>
</body>
</html>
```

- [x] **Step 3: Print both to PDF and check page counts**

```bash
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
ROOT="C:/Users/pnguy/Projects/kl_portfolio"
"$EDGE" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="C:\Users\pnguy\Projects\kl_portfolio\public\Mint_Nguyen.pdf" "file:///$ROOT/resume/resume.html"
"$EDGE" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="C:\Users\pnguy\Projects\kl_portfolio\resume\Mint_Nguyen_Cover_Letter.pdf" "file:///$ROOT/resume/cover-letter.html"
python -c "import pypdf; [print(p, len(pypdf.PdfReader(p).pages), 'page(s)') for p in ['public/Mint_Nguyen.pdf','resume/Mint_Nguyen_Cover_Letter.pdf']]"
```

Expected: both report `1 page(s)`. If the resume reports 2, reduce `body { font-size }` in `resume.html` by 0.3pt and `li { font-size }` by 0.3pt and reprint; repeat once more if needed. Then open both PDFs with the Read tool and confirm Poppins rendered, nothing clipped, dates right-aligned, bracket fields highlighted in the letter.

---

### Task 3: Word files and build script

**Files:**
- Create: `resume/build-docx.js`, `resume/build.sh`

- [x] **Step 1: Write `resume/build-docx.js`**

```js
/* Renders resume/data.js to two .docx files with docx-js. Run: node resume/build-docx.js */
const fs = require('fs')
const path = require('path')
const {
  Document, Packer, Paragraph, TextRun, Tab, TabStopType, AlignmentType,
  BorderStyle, LevelFormat,
} = require('docx')
const R = require('./data.js')

const MINT = '1F7A5C'
const MUTED = '4E6A5C'
const INK = '12211A'
const FONT = 'Calibri'
const PAGE = { size: { width: 12240, height: 15840 }, margin: { top: 864, right: 864, bottom: 864, left: 864 } }
const CONTENT_WIDTH = 12240 - 864 * 2 // 10512 DXA

const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: 21, color: INK, ...opts })

const header = (small = false) => [
  new Paragraph({ children: [run(R.name, { bold: true, size: small ? 40 : 44 })], spacing: { after: 20 } }),
  new Paragraph({ children: [run(R.headline, { bold: true, size: 22, color: MINT })], spacing: { after: 40 } }),
  new Paragraph({
    children: [run([R.location, R.email, R.phone, R.linkedin, R.github, R.site].join('  ·  '), { size: 18, color: MUTED })],
    spacing: { after: 120 },
  }),
]

const sectionHeading = (text) =>
  new Paragraph({
    children: [run(text.toUpperCase(), { bold: true, size: 18, color: MINT, characterSpacing: 30 })],
    border: { bottom: { color: MINT, space: 1, style: BorderStyle.SINGLE, size: 6 } },
    spacing: { before: 160, after: 80 },
  })

const roleLine = (e) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
    spacing: { before: 100, after: 20 },
    children: [
      run(e.role, { bold: true }),
      run('  ·  ', { color: MUTED }),
      run(e.company, { bold: true, color: MINT }),
      run('  ·  ', { color: MUTED }),
      run(e.location, { color: MUTED }),
      new TextRun({ children: [new Tab(), e.dates], font: FONT, size: 18, color: MUTED }),
    ],
  })

const bullet = (text) =>
  new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 20 }, children: [run(text, { size: 20 })] })

const resumeDoc = new Document({
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 300, hanging: 200 } } } }],
    }],
  },
  styles: { default: { document: { run: { font: FONT, size: 21, color: INK } } } },
  sections: [{
    properties: { page: PAGE },
    children: [
      ...header(),
      sectionHeading('Summary'),
      new Paragraph({ children: [run(R.summary)], spacing: { after: 40 } }),
      sectionHeading('Experience'),
      ...R.experience.flatMap((e) => [roleLine(e), ...e.bullets.map(bullet)]),
      sectionHeading('Skills'),
      ...R.skills.map((s) => new Paragraph({ spacing: { after: 20 }, children: [run(s.label + ': ', { bold: true }), run(s.items)] })),
      sectionHeading('Education'),
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
        spacing: { after: 20 },
        children: [
          run(R.education.degree, { bold: true }),
          run('  ·  ', { color: MUTED }),
          run(R.education.school, { bold: true, color: MINT }),
          run('  ·  ', { color: MUTED }),
          run(R.education.location, { color: MUTED }),
          new TextRun({ children: [new Tab(), R.education.dates], font: FONT, size: 18, color: MUTED }),
        ],
      }),
      new Paragraph({ children: [run(R.education.honors, { size: 20, color: MUTED })] }),
    ],
  }],
})

const c = R.coverLetter
const para = (text, opts = {}) =>
  new Paragraph({ spacing: { after: 200, line: 300 }, children: [run(text, { size: 22, ...opts })] })

const letterDoc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 22, color: INK } } } },
  sections: [{
    properties: { page: { size: PAGE.size, margin: { top: 1080, right: 1152, bottom: 1080, left: 1152 } } },
    children: [
      ...header(true),
      new Paragraph({ border: { bottom: { color: MINT, space: 1, style: BorderStyle.SINGLE, size: 6 } }, spacing: { after: 280 } }),
      para(c.date, { color: MUTED }),
      ...c.recipient.map((line) => new Paragraph({ spacing: { after: 0, line: 280 }, children: [run(line, { size: 22, color: MUTED })] })),
      new Paragraph({ spacing: { after: 200 } }),
      para(c.salutation),
      ...c.paragraphs.map((p) => para(p)),
      new Paragraph({ spacing: { before: 200, after: 300 }, children: [run(c.closing, { size: 22 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [run(c.signature, { bold: true, size: 22 })] }),
      new Paragraph({ children: [run(c.signatureLine, { size: 19, color: MUTED })] }),
    ],
  }],
})

const out = (name) => path.join(__dirname, name)
Promise.all([Packer.toBuffer(resumeDoc), Packer.toBuffer(letterDoc)]).then(([a, b]) => {
  fs.writeFileSync(out('Mint_Nguyen_Resume.docx'), a)
  fs.writeFileSync(out('Mint_Nguyen_Cover_Letter.docx'), b)
  console.log('wrote resume/Mint_Nguyen_Resume.docx and resume/Mint_Nguyen_Cover_Letter.docx')
})
```

- [x] **Step 2: Write `resume/build.sh`**

```bash
#!/usr/bin/env bash
# Rebuilds both PDFs (Edge headless) and both Word files (docx-js) from resume/data.js.
# Usage, from the repo root in Git Bash:  bash resume/build.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
URLROOT="$(cygpath -m "$ROOT")"
WINROOT="$(cygpath -w "$ROOT")"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"

print_pdf() {
  "$EDGE" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
    --print-to-pdf="$2" "file:///$1" 2>/dev/null
}

print_pdf "$URLROOT/resume/resume.html"       "$WINROOT\\public\\Mint_Nguyen.pdf"
print_pdf "$URLROOT/resume/cover-letter.html" "$WINROOT\\resume\\Mint_Nguyen_Cover_Letter.pdf"
node "$ROOT/resume/build-docx.js"

python - <<'PY'
import pypdf
for p in ['public/Mint_Nguyen.pdf', 'resume/Mint_Nguyen_Cover_Letter.pdf']:
    print(p, len(pypdf.PdfReader(p).pages), 'page(s)')
PY
```

- [x] **Step 3: Run the build**

```bash
bash resume/build.sh
ls -la public/Mint_Nguyen.pdf resume/*.pdf resume/*.docx
```

Expected: the docx script prints its "wrote" line, both PDFs report `1 page(s)`, four output files exist.

- [x] **Step 4: Render the Word files through Word and inspect**

Use the PowerShell tool:

```powershell
$w = New-Object -ComObject Word.Application
$w.Visible = $false
$w.DisplayAlerts = 0
foreach ($n in @('Mint_Nguyen_Resume', 'Mint_Nguyen_Cover_Letter')) {
  $d = $w.Documents.Open("C:\Users\pnguy\Projects\kl_portfolio\resume\$n.docx", $false, $true)
  $d.ExportAsFixedFormat("C:\Users\pnguy\AppData\Local\Temp\claude\c--Users-pnguy-Projects-kl-portfolio\d180a4ed-90dc-4b24-87d0-a482257234b5\scratchpad\$n-word.pdf", 17)
  Write-Output "$n : $($d.ComputeStatistics(2)) page(s)"
  $d.Close($false)
}
$w.Quit()
```

Expected: each reports `1 page(s)`. Open the two exported PDFs with the Read tool and confirm the layout: right-aligned dates, mint headings with rules, bullets, bracket fields in the letter. If Word is unavailable, fall back to `python -c "import docx; print('\n'.join(p.text for p in docx.Document('resume/Mint_Nguyen_Resume.docx').paragraphs))"` and compare against `data.js`.

- [x] **Step 5: Commit**

```bash
git add resume public/Mint_Nguyen.pdf package.json package-lock.json
git commit -m "feat(resume): one-page resume and cover letter as PDF and Word from one data file

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

## Self-review notes

- Spec coverage: facts and all sentences (T1), single-column Letter layout with mint accents (T2, T3), one page each (T2 step 3, T3 step 4), PDF replaces `public/Mint_Nguyen.pdf` (T2 step 3), Word copies (T3), bracket fields kept literal and highlighted (T2 letter renderer), no forbidden titles (T1 step 2).
- Type consistency: `RESUME` fields used by both renderers and the docx script are exactly those defined in T1 (`name, headline, location, email, phone, linkedin, github, site, summary, experience[].{company,location,role,dates,bullets}, skills[].{label,items}, education.{degree,school,location,dates,honors}, coverLetter.{date,recipient,salutation,paragraphs,closing,signature,signatureLine}`).
- Known risk: docx-js `Tab` and `characterSpacing` names are checked at install time; if `Tab` is missing, replace `new Tab()` with `new TextRun({ text: '\t' })` semantics by using `children: ['\t', e.dates]`.

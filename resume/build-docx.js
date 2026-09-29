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
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
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

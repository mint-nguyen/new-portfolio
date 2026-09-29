# Resume and cover letter

Date: 2026-09-29
Status: design approved by Mint
Target: Senior and Founding Full Stack Engineer roles (individual contributor)

## 1. Goal

Produce a one-page resume and a one-page reusable cover letter that tell the
same story as mintnguyen.com: a Founding Engineer who built Hatch's lending
platform from the first commit and now guides 7+ engineers, who also builds
pricing and operations software at S&T Properties. Deliver each as PDF and as
Word. The resume PDF replaces the file the site's "Download resume" button
already serves.

## 2. Non-goals

- No numbers that Mint has not supplied. Bullets read well without them; the
  spots where a figure would help are listed in section 8.
- No photo, no two-column layout, no tables, no icons in the documents:
  applicant tracking systems parse single-column text most reliably.
- No "Tech Lead" or "manager" title anywhere (see the portfolio spec).
- The S&T Properties role does not go on the portfolio site.

## 3. Facts

| Field | Value |
| --- | --- |
| Name | Mint Nguyen |
| Headline | Full Stack Software Engineer · Founding Engineer at Hatch |
| Location | Calgary, AB |
| Email | pnguyen.lhp@gmail.com |
| Phone | +1 672 999 6118 (from the current resume PDF) |
| LinkedIn | linkedin.com/in/mintnguyen |
| GitHub | github.com/mint-nguyen |
| Site | mintnguyen.com |
| Hatch | Hatch Inc., Montreal, QC (remote), Founding Engineer, Feb 2024 to Present |
| S&T Properties | S&T Properties Inc., Calgary, AB, Full Stack Software Engineer, Apr 2024 to Present |
| Rocketplace | Rocketplace Inc., Vancouver, BC, Software Engineer, Sep 2022 to Nov 2023 |
| RCS | Resilience Corporate Services, Toronto, ON, Frontend Developer, Feb 2022 to Sep 2022 |
| InterU | InterU Network Inc., Vancouver, BC, Data Engineer, Oct 2021 to Feb 2022 |
| Education | BS Information Technology, Fairleigh Dickinson University, Vancouver, BC, Jan 2021 to May 2024, Summa Cum Laude, Honor's List every semester |

## 4. Resume content

**Summary.** Full stack software engineer with 6 years of shipping. Founding
Engineer at Hatch, where I built a loan management platform for lenders from
the first commit and now guide a team of 7+ engineers through it.
Concurrently building pricing and operations software at S&T Properties,
including a price-prediction model and a property management system that
unifies every online travel agency. Strongest in TypeScript, React, Next.js,
Node, NestJS, PostgreSQL, Python, Azure DevOps and Figma.

**Hatch Inc.**, Founding Engineer, Feb 2024 to Present
- Built the loan management platform for personal and business lending from
  the first commit: decision automation, disbursements, and the admin tooling
  around them.
- Guide a team of 7+ engineers through the codebase: onboarding, code review
  standards, and architecture decisions.
- Work directly with founders and stakeholders to turn business goals into
  scoped, shippable work; design wireframes in Figma, then build them.
- Own the deployment pipeline from development to production on Azure
  DevOps.

**S&T Properties Inc.**, Full Stack Software Engineer, Apr 2024 to Present
- Build internal software for the pricing team, including a price-prediction
  model that informs pricing decisions and improved revenue.
- Build internal tools for the operations team that streamline day-to-day
  property operations.
- Building a property management system that brings every online travel
  agency the company lists on into one system.

**Rocketplace Inc.**, Software Engineer, Sep 2022 to Nov 2023
- Designed and deployed new web features with a cross-functional team,
  resulting in a 20% increase in website performance.
- Revamped the dashboard and portfolio pages, leading to a 10% increase in
  signups.

**Resilience Corporate Services**, Frontend Developer, Feb 2022 to Sep 2022
- Sole frontend developer; built a web application visualizing TradeX's
  arbitrage platform alongside its data scientists.

**InterU Network Inc.**, Data Engineer, Oct 2021 to Feb 2022
- Built and maintained scalable data pipelines for large-volume analysis and
  optimized database performance and query execution.

**Skills** (six lines, same groups as `config/skills.ts`): Languages;
Backend; Frontend; Data; Infra and delivery; Design and UI.

**Education**: degree, school, dates, honors on two lines.

## 5. Cover letter content

Header identical to the resume. Then:

```
[Date]

[Hiring manager name, or "Hiring team"]
[Company]

Dear [Hiring manager name or team],

I'm a full stack engineer who likes being there from the first commit. At
Hatch I built a loan management platform for lenders from an empty repo, and
as the team grew to 7+ engineers I became the person everyone pings about the
codebase. I'd love to bring that same energy to the [Role] role at [Company],
[one sentence on why this company].

Building Hatch's platform meant owning the whole path: gathering requirements
with the founders, wireframing in Figma, shipping the APIs and front ends,
automating decisioning and disbursements, and running the pipeline that takes
a change from laptop to production. Just as important, it meant keeping a
growing team unblocked with small PRs, honest code review, and a map of the
codebase that every new engineer gets in their first week.

Alongside Hatch, I build internal software at S&T Properties: pricing tools
with a price-prediction model that improved revenue, operations tools, and a
property management system that pulls every online travel agency into one
place. Different domain, same habit of turning a fuzzy business goal into
something a team can ship.

I work best in small teams that move fast and care about the details, which
is why [Company] caught my eye. I'd welcome a conversation about how I can
help. Thank you for your time, and if we do talk, the mint tea is on me.

Sincerely,
Mint Nguyen
pnguyen.lhp@gmail.com · +1 672 999 6118 · mintnguyen.com
```

Bracketed fields are rendered in the documents exactly as brackets so they are
easy to find and replace.

## 6. Design

- Letter size (8.5 by 11 in), 0.6 in margins, single column.
- Poppins from Google Fonts for the PDF; the Word file uses Calibri so it
  opens identically everywhere.
- Body 10.5 pt (resume) and 11 pt (letter). Name 22 pt weight 700. Section
  headings 10 pt uppercase, letter-spaced, mint `#1F7A5C`, with a 1 px mint
  rule beneath. Bullets use a small mint square. Dates right-aligned on the
  role line. Everything else near-black `#12211A` on white.
- Each document must fit on exactly one page.

## 7. Files

| Path | Purpose |
| --- | --- |
| `resume/data.js` | every fact and sentence above, one object; works both as a browser script and a CommonJS module |
| `resume/resume.html` | renders `data.js` into the resume layout |
| `resume/cover-letter.html` | renders `data.js` into the letter layout |
| `resume/build-docx.js` | Node script that writes both .docx files from `data.js` with the `docx` package |
| `resume/build.sh` | prints both HTML files to PDF with Edge headless and runs the docx script |
| `public/Mint_Nguyen.pdf` | resume PDF, replaces the 2024 file the site links to |
| `resume/Mint_Nguyen_Cover_Letter.pdf` | letter PDF |
| `resume/Mint_Nguyen_Resume.docx`, `resume/Mint_Nguyen_Cover_Letter.docx` | Word copies |

## 8. Spots where a real number would land harder (optional, from Mint)

- S&T pricing model: revenue lift in percent or dollars.
- S&T PMS: number of online travel agencies or properties it covers.
- S&T tech stack, if it differs from Hatch's; the S&T bullets are written
  stack-agnostic on purpose.
- Hatch platform: loans processed, lenders onboarded, or release cadence.

## 9. Verification

- Both PDFs open with the Read tool and show exactly one page each, no
  clipped text, Poppins rendered.
- Both .docx files unzip cleanly and re-render to text with the docx
  skill's tooling containing the same sentences as `data.js`.
- `grep -i "tech lead\|manager" resume/data.js` returns nothing.
- The site's "Download resume" button serves the new PDF (file replaced in
  `public/`).

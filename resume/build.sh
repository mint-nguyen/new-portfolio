#!/usr/bin/env bash
# Rebuilds both PDFs (Edge headless) and both Word files (docx-js) from resume/data.js.
# Usage, from the repo root in Git Bash:  bash resume/build.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
URLROOT="$(cygpath -m "$ROOT")"
WINROOT="$(cygpath -w "$ROOT")"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
# Headless Edge needs its own profile directory or it refuses to start while a normal Edge window is open.
PROFILE="$(cygpath -w "${TEMP:-/tmp}")\kl-edge-headless-profile"

print_pdf() {
  "$EDGE" --headless=new --disable-gpu --user-data-dir="$PROFILE" --no-pdf-header-footer \
    --virtual-time-budget=8000 --print-to-pdf="$2" "file:///$1" 2>/dev/null
}

print_pdf "$URLROOT/resume/resume.html"       "$WINROOT\public\Mint_Nguyen.pdf"
print_pdf "$URLROOT/resume/cover-letter.html" "$WINROOT\resume\Mint_Nguyen_Cover_Letter.pdf"
node "$ROOT/resume/build-docx.js"

python - <<'PY'
import pypdf
for p in ['public/Mint_Nguyen.pdf', 'resume/Mint_Nguyen_Cover_Letter.pdf']:
    print(p, len(pypdf.PdfReader(p).pages), 'page(s)')
PY

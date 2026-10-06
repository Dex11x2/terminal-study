# Project: الترمنال والبرمجة بإيدك (Egyptian-Arabic study site)

Read `PLAN.md` first: current state, ordered remaining work, agreed rules. Update and commit it after every batch.

## Map

- `js/tabs/<tab>/01.js, 02.js…`: a folder per tab, lessons split into ~1200-line files of whole categories (90% of edits). `01.js` calls `TAB()` and documents the lesson fields; the rest call `MORE("<tab>", [...])`. New file → add its `<script>` in `index.html` right after the tab's previous file.
- Find lessons with the tool, not by reading files: `node tools/lesson.js <tab>` (categories, file:line per lesson), `node tools/lesson.js <tab> "<cmd>"` (that lesson's source and exact range), `node tools/lesson.js find "<text>"`.
- When a tab's files grow past ~1200 lines (e.g. after teach sections), `node tools/resplit.js <tab>` re-chunks them and updates index.html (refuses if lessons would change). Never run it while an agent is editing that tab; it renumbers files.
- Review log: `verified.json` via `node tools/verify.js` (summary), `todo <tab>` (lessons never verified or edited since), `mark <tab> "<cmd>"… --on "<where it ran>"` after actually running a lesson. Mark only what was really run; write `docs:` for doc-only parts.
- `js/core.js`: `TAB()` registration. `js/app.js`: rendering, search, progress, OS boxes (`osBoxes`, `RUNS_IN`). `css/style.css`. `index.html`: tab cards and script list.
- `tools/check.js` (content lint), `tools/build.js` (single file `dist/terminal.html`). Never read `dist/` or `vendor/`.

## Lesson format (details: README.md «شكل الدرس» and «قواعد كتابة الدروس»)

`cmd` (never rename: progress key), `title`, `desc` (first paragraph = summary), `teach` (the full step-by-step explanation: mini-markdown with `~~~lang` fences; style rules in README «الشرح خطوة بخطوة», reference lesson start «CPU و RAM والديسك»), `example`, `try`, `deep{why,how,when,mistakes}`, `lines` (one per non-empty non-comment example line), `sol`/`solCode`, `flag`, bash-only `mac`. Inside R`...`: `${` → `$__{`, backtick → `$__bt`. `[[code]]` single-line, balanced. Egyptian dialect, terms in English.

## Rules

- Run every command before writing it (Linux: `docker run --rm ubuntu:24.04`; Windows: `pwsh -NoProfile` and `powershell -NoProfile`). If it can't be run, the sol says it's from official docs.
- Per-OS sections: comment lines that are only an OS header ending in `:` (`# Linux (and WSL):`, `# Windows (PowerShell):`, `# Mac:`). Don't use `flag: "script"` on them.
- Before a content batch, audit related tabs for important missing topics and add them.
- Never run destructive or system-changing commands on the user's machine; never `docker volume prune` or other global Docker cleanup.
- After changes: `npm run check`, bump `CACHE` in `sw.js`, `npm run build`, commit, push, confirm GitHub Actions passed.

## Token budget

- Review/verification subagents: `model: "sonnet"`, one tab (or part) per agent, short reports. Writing new lessons and final review: stronger model.
- Prefer `npm run check` over opening the browser; when the browser is needed, use `browser_evaluate`, not snapshots.

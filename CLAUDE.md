# Project: الترمنال والبرمجة بإيدك (Egyptian-Arabic study site)

Read `PLAN.md` first: current state, ordered remaining work, agreed rules. Update and commit it after every batch.

## Map
- `js/tabs/<tab>.js`: one file per tab, all lessons (90% of edits). Files are huge (up to ~9k lines): never read a whole tab; grep for `cmd: "<name>"` and read only that range.
- `js/core.js`: `TAB()` registration. `js/app.js`: rendering, search, progress, OS boxes (`osBoxes`, `RUNS_IN`). `css/style.css`. `index.html`: tab cards and script list.
- `tools/check.js` (content lint), `tools/build.js` (single file `dist/terminal.html`). Never read `dist/` or `vendor/`.

## Lesson format (details: README.md «شكل الدرس» and «قواعد كتابة الدروس»)
`cmd` (never rename: progress key), `title`, `desc` (first paragraph = summary), `example`, `try`, `deep{why,how,when,mistakes}`, `lines` (one per non-empty non-comment example line), `sol`/`solCode`, `flag`, bash-only `mac`. Inside R`...`: `${` → `$__{`, backtick → `$__bt`. `[[code]]` single-line, balanced. Egyptian dialect, terms in English.

## Rules
- Run every command before writing it (Linux: `docker run --rm ubuntu:24.04`; Windows: `pwsh -NoProfile` and `powershell -NoProfile`). If it can't be run, the sol says it's from official docs.
- Per-OS sections: comment lines that are only an OS header ending in `:` (`# Linux (and WSL):`, `# Windows (PowerShell):`, `# Mac:`). Don't use `flag: "script"` on them.
- Before a content batch, audit related tabs for important missing topics and add them.
- Never run destructive or system-changing commands on the user's machine; never `docker volume prune` or other global Docker cleanup.
- After changes: `npm run check`, bump `CACHE` in `sw.js`, `npm run build`, commit, push, confirm GitHub Actions passed.

## Token budget
- Review/verification subagents: `model: "sonnet"`, one tab (or part) per agent, short reports. Writing new lessons and final review: stronger model.
- Prefer `npm run check` over opening the browser; when the browser is needed, use `browser_evaluate`, not snapshots.

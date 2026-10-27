# Brief for writing NEW lessons in a tab

Give this file to a subagent together with its tab(s), the file(s) it may write, and the topics to add. Every rule in `tools/teach-brief.md` (facts must be real, secrets, privacy, scratch folder, Docker, processes, disk space, syntax reminders) applies here too: read it first.

## Read first

1. `CLAUDE.md`, then `README.md` sections «شكل الدرس», «الشرح خطوة بخطوة (teach)», «تمرين بيتصحح لوحده» (only if you add a `check`), «قواعد كتابة الدروس».
2. `tools/teach-brief.md` (all of it).
3. The reference lesson: `node tools/lesson.js start "CPU و RAM والديسك"`, and two lessons from your own tab, to match its tone, depth and field style.
4. Your tab's existing lessons: `node tools/lesson.js <tab>` (and `node tools/lesson.js find "<word>"` across all tabs) so you never duplicate a lesson that already exists elsewhere; link to it instead («شوف درس … في تاب …»).

## Task

Add the requested topics as new categories (`{ t, l, n, items: [...] }`) in the file(s) you were given. Each prepared file already contains `MORE("<tab>", [ ]);` (or a `TAB()` skeleton for a new tab) and is already loaded by `index.html`. If you need more room, tell the lead in your report instead of creating files.

- Before writing, audit: within your topics, what would a working developer expect to find? Add the important missing pieces too (proactively), but stay inside your tab's subject.
- Each lesson has every field: `cmd` (unique in the tab, short, never renamed later), `title`, `desc` (first paragraph = one or two sentence summary), `deep{why,how,when,mistakes}`, `teach`, `example`, `try`, `lines` (one per non-empty non-comment example line, same order), `sol` (+ `solCode` when the answer is code). Shell-command tabs may use `flag`/`mac` like their neighbours.
- `l` (level 1/2/3) must fit the tab's `levels`; put basics in 1, real-project use in 2, production/advanced in 3.
- Length: a category is usually 3–6 lessons. Prefer fewer, complete, verified lessons over many thin ones.
- Use current stable versions as of today; say the version you ran in the text where it matters.
- Per-OS examples: follow CLAUDE.md (comment-only headers like `# Linux (and WSL):`, `# Windows (PowerShell):`, `# Mac:`). Test Windows parts in `pwsh -NoProfile` / `powershell -NoProfile`, Linux parts in Docker. Mac-only parts: say they come from the official docs.
- Anything needing an account, a paid API or real cloud resources: run it against a local stand-in (mock server, Docker image, LocalStack, Ollama) or say it's from the official docs. Never sign up or log in anywhere, never use the user's keys.
- Security-sensitive topics: teach on your own machine/own app/lab containers only, with the defensive purpose stated.

## Don't

Don't edit files other than the ones you were given, don't edit `index.html`, `css/`, `js/app.js`, `js/core.js`, `tools/`, `verified.json`, don't build, don't commit, don't run `resplit`.

## Finish

1. `npm run check` must show `0 خطأ، 0 تنبيه`.
2. Pull/remove Docker images per `teach-brief.md`: remove by exact tag every image you pulled that wasn't there before you started (`docker images` at start and end).
3. Report briefly (under 40 lines + MARK lines): categories/lessons added (count), wrong facts found elsewhere in the tab and fixed, anything only from docs, images pulled/removed.
4. MARK lines, TAB-separated, one per lesson you actually ran: `<tab>\t<cmd>\t<where it ran>` (add `docs:` parts honestly). Lessons with no runnable code: `<tab>\t<cmd>\tdocs: concept`.

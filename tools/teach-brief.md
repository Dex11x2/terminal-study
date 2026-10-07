# Brief for writing «الشرح خطوة بخطوة» (field `teach`) in one lesson file

Give this file to a subagent together with ONE lesson file path (e.g. `js/tabs/start/02.js`). Only that file may be edited.

## Read first

1. `CLAUDE.md`, then `README.md` sections «شكل الدرس», «الشرح خطوة بخطوة (teach)», «قواعد كتابة الدروس».
2. The reference lesson: `node tools/lesson.js start "CPU و RAM والديسك"`. Match its depth, structure, tone and formatting.
3. The lessons in your file: `node tools/lesson.js <tab>` lists them with line numbers; read each lesson with `node tools/lesson.js <tab> "<cmd>"`.

## Task

Add a `teach: R\`...\`,` field to EVERY lesson in the file that doesn't have one, placed right after `deep: {...},` (before `example:`). The goal: a beginner understands every line of the example (and of solCode), why each piece is there, and could write it alone.

- The point is explaining the CODE itself. One or two sentences on what it does, then take the example (and solCode) apart line by line. Diagrams/ASCII drawings are not required: use one only when the idea can't be said clearly in words (rare); tables for summarizing steps or reading output columns are fine; a long line is taken apart inside-out in execution order, one heading per piece.
- Explain every name, flag, symbol and abbreviation the first time it appears, show the output after each step, explain the numbers/concepts behind the output, end long commands with a summary table and the lesson with a short «الخلاصة».
- If the lesson's example has several OS sections, cover each (at least a comparison table for the others).
- Length follows the content: a one-word command gets a short teach; a long pipeline or a script gets a long one. Never pad.
- Concept-only lessons (no runnable code) still get a teach that explains the idea step by step (a table where it helps).
- If a lesson has an auto-graded exercise (`check`), explain the example and the concepts but never reveal `check.solution` or write code that solves the exercise.
- Egyptian dialect like the rest of the site (يعني، هات، ليه), not فصحى. Technical terms stay English inside `[[ ]]`.

## Syntax reminders

Literal escapes like `س` or `\n` that the reader must SEE as text: insert them with a Node script that writes the backslash explicitly (`String.fromCharCode(92)`), not with the Write/Edit tool, which can turn `\uXXXX` into the real character. Grep the file afterwards to confirm the backslash is there.

`## ` / `### ` headings, `---`, code/output boxes with `~~~powershell` / `~~~bash` / `~~~cmd` / `~~~zsh` / `~~~text Title` ... `~~~` (never backticks: inside R`...` write a backtick as `$__bt` and `${` as `$__{`), tables `| a | b |` + `|---|---|`, lists `- ` / `1. ` (a sub-item under an item: two spaces then `- `), notes `> `, `**bold**`, inline `[[code]]` (single line, balanced). In diagrams separate pieces by 2+ spaces so each keeps its column.

## Facts must be real

Every output you show must come from actually running it: Linux in `docker run --rm ubuntu:24.04 ...` (check `docker info`; if Docker is down start it with PowerShell `Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"` and wait), Windows in `pwsh -NoProfile -c` and `powershell -NoProfile -c`, cmd via `cmd /c`. Say in the text where it ran. If something can't be run here (macOS, admin-only, destructive), say it comes from the official docs. If you find a wrong fact elsewhere in the lesson, fix it.

Privacy: in every output you paste, replace the real Windows username with `ali` and the machine name with `ALI-PC` (paths like `C:\Users\ali\...`), and mask MAC addresses, public IPs, Wi-Fi names and emails.
Other agents work in parallel and share the scratchpad: keep ALL your scratch files in a subfolder named after your file inside the session scratchpad directory given in your instructions (an absolute path OUTSIDE the repo, e.g. `C:Users...Tempclaude...scratchpadash-03`), never in a shared folder, and NEVER inside the repo (no `scratchpad/` folder, keys or test files in the project).
Never create anything that persists on the machine, even "harmless" test items: no scheduled tasks (`schtasks /create`, `Register-ScheduledTask`), services, registry values, users, shares, firewall rules or environment variables (`setx`). Show their syntax and quote real output already in the lesson's sol, or say it's from the docs. Never run a command that waits for input (a Y/N prompt) in the background.
Docker: never run any `prune` command, even with `--filter` (build cache ignores label filters), never `docker compose pull`/`docker pull` a tag that already exists locally (it updates the user's image), and name everything you create with a unique prefix so you remove only your own resources.
Processes: stop ONLY processes you started, by the exact PID you recorded when starting them. Never stop processes by name, command-line pattern, port or window title (Stop-Process -Name, taskkill /IM, pkill, killall, Where-Object CommandLine -like ...), since that can kill the user's apps.
Never run destructive or system-changing commands on this machine; never global Docker cleanup (`docker system/volume/image prune`). Remove only containers you created.

## Don't

Don't rename `cmd`, don't edit other files, don't build, don't commit, don't touch `verified.json`.

## Finish

1. `npm run check` must show `0 خطأ، 0 تنبيه`.
2. Don't run `verify.js mark` yourself (other agents write the same log in parallel). Instead put in your report, per lesson you actually ran, a line `MARK <tab> | <cmd> | <where it ran>` (add `docs:` parts honestly). The lead records them.
3. Report briefly: lessons done, anything not runnable, wrong facts you fixed.

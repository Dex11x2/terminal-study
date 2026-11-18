# Brief for writing a unit of the HTML & CSS course from its syllabus

Give this to a writing agent with: the file it owns, the unit name, and the syllabus items the unit must cover. It adds to `tools/lesson-brief.md` and `tools/teach-brief.md`; where they differ, this file wins.

## Read first (in this order)

1. `ROADMAP.md` (the frozen definition of done, rule 3) and `CLAUDE.md`.
2. `LESSON-CHECKLIST.md` in full. You follow every item without being asked.
3. `README.md`: «شكل الدرس», «الشرح خطوة بخطوة (teach)», «قواعد كتابة الدروس».
4. `tools/lesson-brief.md` and `tools/teach-brief.md`.
5. Two existing lessons of the course for tone, depth and field style: `node tools/lesson.js css "semantic HTML"` and `node tools/lesson.js css "a و button"`. And the unit's project ladder at the top of `js/tabs/css/01.js` (lines 30–40).
6. Your syllabus items: `node tools/syllabus.js css` lists what is missing. Each item's official page is the `url`/`mdn` in `syllabus/css.json`. Read the official page (MDN and the WHATWG section) for every item before writing about it; your memory is not the reference.

## What you write

One unit (a category object) in the file you were given, which already holds `MORE("css", [ ]);` and is already loaded by `index.html`:

`{ t, l: 1, n, pre: [...], goal: [...], projects: [...], items: [ lessons ] }`

- **The reader is a beginner** who finished the first unit («HTML: هيكل الصفحة ومعناها») only. No CSS yet unless the unit says so; when a line of CSS is needed to show a point, explain it in one sentence and say which later lesson teaches it.
- **Every syllabus item given to you is taught by name**: it is in a lesson `cmd`, or has its own `##`/`###` heading in `teach` written as the tag in code (`### [[<abbr title="...">]]`), or (for the rarest ones) a row in a table whose first column header is «العنصر» and whose first cell is `[[<name>]]`. Attributes: a heading or first table cell holding the attribute inside a tag (`[[<ol reversed>]]`, `[[<time datetime="...">]]`). After writing, `node tools/syllabus.js css --all | grep` each of your items: it must say درس, قسم or جدول, not «مذكور».
- For each element: what it means (the semantics, in the standard's own terms, said simply), what the browser does with it by default (measured: computed style from a real Chrome run), what a screen reader and a search engine get from it, when to use it and when not (the neighbour it gets confused with: `strong` vs `b`, `em` vs `i`, `del` vs `s`, `cite` vs `q`…), its attributes, the real mistakes (with what actually happens), and where it shows up in real pages.
- **Lesson fields, all of them**: `cmd`, `title`, `desc`, `teach`, `example`, `lines`, `try`, `sol`, `deep{why,how,when,mistakes}`, `practice`, `ref`, and `pre` when the lesson leans on a specific earlier lesson.
  - `ref`: `[{ t: "MDN: <strong>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/strong" }, { t: "WHATWG: the strong element", url: "https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element" }]`. Real URLs you opened.
  - `pre`: `["css/<cmd>"]` or `[{ to: "css/<cmd>", why: R`...` }]`; the target must exist (`npm run check` verifies).
  - `practice`: 5–6 drills for a basic lesson, 3 at least otherwise, of different kinds (LESSON-CHECKLIST §٣), each with `lvl`, `t`, `done`, `sol`.
- **Drills are solved in the page** (owner, 18 Nov: «الاختبارات محتاجه تكون اوضح والنتيجه تكون باينه بشكل واقعي… ومتناسبه مع الشرح»). Every drill whose answer is HTML the reader writes or fixes (ابني، صلّح الكود البايظ، بيانات حقيقية، refactor، and اقرا وتوقّع when the prediction can be tried) gets a `work` field, placed before `sol`: `work: { h: 220, start: R`...`, checks: [ { say: R`...`, q: "...", ... } ] }`. See README «تمرين HTML بيتحل جوه الصفحة» for the fields and the sample in `js/tabs/css/22.js` (lesson «strong و em», drill «صلّح الكود البايظ»).
  - `start`: for a fix drill, the broken code exactly as the task shows it; for a build drill, the raw text or a minimal skeleton the reader marks up (never empty: give them the content so they practise the elements, not typing Arabic).
  - `checks`: 3–6 conditions, each one thing the reader can understand and act on, worded as a result («كلمة «طازة» عليها [[<em>]]»), in the order a learner would do them. Together they must be true for the solution, false in at least one place for `start`, and should fail the common wrong answer you describe in `sol`. Check structure and meaning (element, nesting via selectors like `blockquote > p`, attribute values, text inside), not exact wording or whitespace.
  - The first `live` fence of the drill's `sol` is the reference solution the checker runs (or set `work.solAt` to its index among the `live`/`html`/`view` fences, or `work.sol` to explicit code). `node tools/work-check.js css` must report 0 problems.
  - Explain-only drills (اشرحها، دوّر بنفسك، قارن وقيس with DevTools) have no `work`.
- **Every drill says which part of the lesson it practises**: start `t` with the kind in bold as now, and end it with «(من قسم ٣ في الشرح)» or the heading's words, so the reader knows where to look back. The drill uses the same vocabulary and the same kind of example as that section.
- **A fix drill's `sol` shows before and after**: the broken page as `live` titled «قبل» only when the breakage is visible, then the fixed page as the first... no: keep the fixed page as the FIRST `live` fence (the checker reads it) and put the «قبل» preview after it under a line «وده اللي كان باين قبل التصليح».
- **Results in words a beginner reads**: after the live solution, a short «هتشوف إيه» list in plain words (what is bold, what moved, what the reader should notice in the page). Measured numbers (`computed` values, roles, counts) stay, but in a `text` fence titled «القياس من Chrome» with one line saying what each number means.
- **Every project has `dir`** (its folder name: lowercase English, digits and dashes, e.g. `dir: "bakery-menu"`). The site then shows, under the task, the six «ابدأ إزاي» steps (make the folder and files in the terminal, `code .`, write, open in Chrome, inspect with DevTools, compare with the solution). So in the `sol`: every file is one fence whose title ends with the file name (`live 400 index.html`, `css style.css`), because the file list in those steps is read from the fence titles. Don't repeat the six steps in `what` or `sol`. A project that goes on inside the folder of an earlier project (or of the unit's lessons) also sets `cont: true`: step 1 then says «ادخل الفولدر اللي عملته» instead of `mkdir`.
- **The ladder is one road, not six unrelated tasks** (owner, 18 Nov: «خلي كل حاجه مكمله لل بعدها»): order the projects so each one uses what the one before it practised and adds one new thing; say so in `what` in a few words («زي المشروع اللي فات، وزوّد عليه…»). The كبير project should reuse pieces the reader already built in the صغير and متوسط ones (say which), and name the lessons it draws on.
- **`what` is a clear brief**: who the page is for, the exact content it must hold (as a short list in the sentence), and which elements each part is expected to use. A beginner should be able to start without guessing.
- **Unit `projects`**: the full ladder (2 صغير, 2 متوسط, 1–2 كبير, 1 فكرة), each with `what`, `done`, `sol` (and `ext` for كبير and فكرة). Real things someone would build, using only what the course taught up to this unit. Invented names only.

## The solution shows what it looks like (ROADMAP rule 3.4)

This is the point of the batch. In `teach`, in every drill `sol` and in every project `sol`:

- An HTML snippet or page whose result matters is written in a `~~~live` fence: the reader sees the code and, under it, the real page rendered. `~~~live 160 عنوان` sets the height in px and the title (default 240); `~~~live 90 120 عنوان` gives two heights: at full width, then at 360px (phone). Pick a height that fits the content without a big empty gap.
- `~~~view [height] [title]` renders the page without repeating the code (when the files were shown above one by one).
- A fragment is wrapped for you in an Arabic RTL document. A full document (`<!doctype html>…`) is used as is.
- The preview is a sandboxed iframe with no access to the site and no network files: no external images, fonts or scripts. Use text, emoji, inline SVG or a `data:` URI. Inline `<style>` is fine.
- Use `~~~live` for anything visual, and keep `~~~html` (code only) for things with nothing to see (head metadata, a diff of two versions where only one is rendered).
- Next to the live result, still say in words what to look at («الكلمة التقيلة هي strong، والمايلة em»), and give measured facts in a `~~~text` fence when a number matters (computed `font-weight`, the accessibility role).
- In `teach`, show the wrong version and the right version both live when the difference is visible.

## Verify everything in a real browser

- Chrome is installed: `"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --dump-dom "file:///<abs path>/t.html"` prints the DOM after scripts ran. Put a `<pre id="out">` in the test page and a script that writes `getComputedStyle(...)`, `el.computedRole`/`el.computedName` (add `--enable-experimental-web-platform-features` if they come back undefined), `document.querySelectorAll(...).length`, etc. into it; read it from the dump. `--screenshot=<path> --window-size=400,300` gives a picture you can Read.
- Do NOT use the Playwright/Chrome MCP browser tools (another agent may be using them).
- Test pages live in your own folder under the session scratchpad given in your task; delete it at the end.
- Every claim about default rendering, parsing or roles comes from such a run; write the Chrome version once in the unit. What you could not run (screen reader speech, Safari/Firefox differences) is said to be from the official docs, with the doc named.
- Every `~~~live` block: load its exact code in headless Chrome once and check it renders what the text says.

## Writing rules that are easy to miss

- Egyptian Arabic, terms in English. No real brands, sites, people or domains: invented names (`example.test` for URLs).
- Inside R`...`: `${` → `$__{`, a backtick → `$__bt`. `[[code]]` is single-line and balanced; code that itself contains `[[` or `]]` goes in a fence.
- A closing script tag inside lesson text is fine in tab files (the build handles it).
- `lines`: one entry per non-empty, non-comment line of `example`, same order. For an HTML example use `flag: "script"`; HTML comments `<!-- -->` count as code lines.
- `cmd` is the progress key: short, unique in the tab, never renamed. Use the element names joined by « و » (`strong و em`).
- No em dashes in the Arabic text; follow the punctuation of the neighbouring lessons.

## Don't

Don't edit any file but yours. Don't touch `index.html`, `js/app.js`, `js/core.js`, `css/`, `tools/`, `syllabus/`, `PLAN.md`, `verified.json`. Don't run `resplit`, `git commit` or `git push`. Don't install anything globally; no `npm install` in the repo.

## Finish

1. `npm run check` → `0 خطأ، 0 تنبيه`. `node tools/thin.js css` shows nothing for your lessons. `node tools/syllabus.js css --all | grep` confirms each of your items.
2. Delete your scratch folder.
3. Report (under 40 lines): lessons and their `cmd`s, drill and project counts, how many `~~~live`/`~~~view` blocks, items you could not cover and why, any syllabus item you believe should be excluded (with the reason, for the lead to decide), facts that came from docs only, wrong facts you noticed in other lessons (don't fix them, list them).
4. MARK lines, TAB-separated, one per lesson: `css\t<cmd>\tChrome <version> headless on Windows 11` (add `docs:` parts honestly).

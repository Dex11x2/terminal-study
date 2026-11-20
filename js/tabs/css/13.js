// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "اختبار الـ accessibility",
      l: 3,
      n: "WCAG 2.2 AA هو المعيار، والأدوات الأوتوماتيك بتمسك جزء، والباقي بالكيبورد وقارئ الشاشة",
      projects: [
        { lvl: 'صغير', dir: "axe-scan", t: R`سكربت فحص صفحة بـ axe`, what: R`سكربت Node بـ [[playwright-core]] و [[@axe-core/playwright]] بياخد URL من الـ arguments، ويفتح الصفحة، ويطبع جدول: الـ rule و الـ impact وعدد العناصر وأول selector، ويخرج بكود ١ لو فيه أي violation. من درس axe و Lighthouse.`, done: R`على صفحة فيها صورة من غير alt وحقل من غير label بيطبع [[image-alt]] و [[label]] ويخرج بـ ١، وعلى صفحة سليمة بيطبع «مفيش مشاكل» ويخرج بـ ٠، و URL غلط بيطبع رسالة مفهومة مش stack trace.`, sol: R`~~~bash الترمنال
mkdir axe-scan && cd axe-scan
npm init -y
npm pkg set type=module
npm i -D playwright-core@1.64.1 @axe-core/playwright@4.14.0
~~~

[[playwright-core]] من غير متصفح: السكربت بيستخدم Chrome اللي على جهازك ([[channel: "chrome"]])، فمفيش تنزيل ٢٠٠ ميجا.

~~~js scan.mjs
// node scan.mjs <url>: opens the page in Chrome, runs axe (WCAG 2.2 A + AA), prints a table, exits 1 on any violation
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const url = process.argv[2];
if (!url) {
  console.error("اكتب الـ URL: node scan.mjs https://example.com");
  process.exit(2);
}

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });   // the Chrome already on the machine, no download
  const context = await browser.newContext();               // AxeBuilder refuses a page from browser.newPage()
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 15000 });

  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  if (violations.length === 0) {
    console.log("مفيش مشاكل (" + url + ")");
    process.exitCode = 0;
  } else {
    console.table(violations.map(v => ({
      rule: v.id,
      impact: v.impact,
      count: v.nodes.length,
      first: v.nodes[0].target.join(" "),
    })));
    for (const v of violations) console.log("- " + v.id + ": " + v.help + "\n  " + v.helpUrl);
    process.exitCode = 1;
  }
} catch (err) {
  // a wrong URL or a site that's down: one clear line, not a stack trace
  const reason = err.message.split("\n")[0];
  console.error("مقدرتش أفتح " + url + "\nالسبب: " + reason);
  process.exitCode = 2;
} finally {
  await browser?.close();
}
~~~

صفحتين للتجربة (والصورة [[map.svg]] جنبهم):

~~~html pages/bad.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نشرة «مسار»</title>
</head>
<body>
<main>
  <h1>اشترك في نشرة «مسار»</h1>
  <img src="map.svg" width="320" height="160">
  <form>
    <p>اسمك</p>
    <input type="text">
    <input type="email" placeholder="الإيميل">
    <button>اشترك</button>
  </form>
</main>
</body>
</html>
~~~

~~~html pages/good.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نشرة «مسار»</title>
</head>
<body>
<main>
  <h1>اشترك في نشرة «مسار»</h1>
  <img src="map.svg" width="320" height="160" alt="خريطة فيها ٣ محطات على خط واحد">
  <form>
    <label for="name">اسمك</label>
    <input id="name" type="text" autocomplete="name">
    <label for="email">الإيميل</label>
    <input id="email" type="email" autocomplete="email">
    <button>اشترك</button>
  </form>
</main>
</body>
</html>
~~~

~~~view 400 420 الصفحة اللي بنفحصها (bad.html)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نشرة «مسار»</title>
</head>
<body>
<main>
  <h1>اشترك في نشرة «مسار»</h1>
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgMTYwIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgcng9IjEyIiBmaWxsPSIjZTBmMmZlIi8+PHBhdGggZD0iTTMwIDEyMCBDIDExMCAyMCwgMjEwIDE0MCwgMjkwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMzY5YTEiIHN0cm9rZS13aWR0aD0iNiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMTIwIiByPSIxMCIgZmlsbD0iIzBjNGE2ZSIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjgyIiByPSIxMCIgZmlsbD0iIzBjNGE2ZSIvPjxjaXJjbGUgY3g9IjI5MCIgY3k9IjQwIiByPSIxMCIgZmlsbD0iIzBjNGE2ZSIvPjwvc3ZnPgo=" width="320" height="160">
  <form>
    <p>اسمك</p>
    <input type="text">
    <input type="email" placeholder="الإيميل">
    <button>اشترك</button>
  </form>
</main>
</body>
</html>
~~~

**هتشوف إيه:** في الترمنال جدول فيه سطر لكل rule فيها مشكلة (الاسم، والخطورة، وعدد العناصر، وأول عنصر)، وتحته لينك يشرح كل rule. والصفحة نفسها بسيطة: عنوان، وصورة خريطة، وخانتين، وزرار.

**أكواد الخروج:** ٠ = سليمة، ١ = فيه مشاكل، ٢ = مقدرتش أفحص أصلًا. الـ CI بيقرا ده من غير ما يفهم الكلام، فـ [[if node scan.mjs …]] في bash أو [[$LASTEXITCODE]] في PowerShell بيعرفوا يكمّلوا ولا يقفوا.

**[[process.exitCode]] مش [[process.exit()]]:** [[exit]] بيقفل البرنامج فورًا، فالمتصفح يفضل مفتوح. [[exitCode]] بيسيب [[finally]] يقفل المتصفح الأول.

**الـ URL الغلط:** الـ [[try/catch]] حوالين كل حاجة، وبيطبع أول سطر بس من الغلط. من غيره كنت هتشوف stack trace ٢٠ سطر.

**غلطتين حصلوا وأنا ببنيه:**
- **[[browser.newPage()]]:** أول تشغيل طلع «Please use browser.newContext()». الـ [[AxeBuilder]] محتاج page جوه context انت عامله بنفسك، عشان يقدر يفتح الـ iframes. التصليح سطر: [[browser.newContext()]] وبعدين [[context.newPage()]].
- **axe مامسكش الـ placeholder:** الـ [[done]] بيقول «حقل من غير label». الحقل [[<input placeholder="الإيميل">]] **عدّى** قاعدة [[label]]: axe بيقبل الـ placeholder كاسم ([[non-empty-placeholder]])، و Chrome نفسه بيدي الخانة الاسم «الإيميل». بس ده لسه غلط يدوي: الكلام بيختفي أول ما تكتب. عشان قاعدة [[label]] تقع لازم حقل مالوش اسم خالص، زي «اسمك» المكتوب في [[<p>]] جنب الخانة.

~~~text الناتج (Windows، Chrome 157)
> node scan.mjs http://localhost:8813/axe-scan/pages/bad.html
┌─────────┬─────────────┬────────────┬───────┬──────────────────────┐
│ (index) │ rule        │ impact     │ count │ first                │
├─────────┼─────────────┼────────────┼───────┼──────────────────────┤
│ 0       │ 'image-alt' │ 'critical' │ 1     │ 'img'                │
│ 1       │ 'label'     │ 'critical' │ 1     │ 'input[type="text"]' │
└─────────┴─────────────┴────────────┴───────┴──────────────────────┘
- image-alt: Images must have alternative text
  https://dequeuniversity.com/rules/axe/4.14/image-alt?application=playwright
- label: Form elements must have labels
  https://dequeuniversity.com/rules/axe/4.14/label?application=playwright
exit=1

> node scan.mjs http://localhost:8813/axe-scan/pages/good.html
مفيش مشاكل (http://localhost:8813/axe-scan/pages/good.html)
exit=0

> node scan.mjs http://localhost:9999/nothing.html
مقدرتش أفتح http://localhost:9999/nothing.html
السبب: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:9999/nothing.html
exit=2

> node scan.mjs not-a-url
مقدرتش أفتح not-a-url
السبب: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
exit=2

PowerShell: node scan.mjs <good>; $LASTEXITCODE → 0 | <bad> → 1 | URL غلط → 2
~~~

**فخ في PowerShell:** [[node scan.mjs … | Select-Object -First 1]] طلّع [[$LASTEXITCODE]] = ١ بدل ٢، لأن [[-First]] بيوقف البرنامج بدري. لو عايز الكود، شغّله من غير pipe.` },
        { lvl: 'صغير', dir: "tab-map", t: R`خريطة الـ Tab على الصفحة`, what: R`snippet في DevTools › Sources › Snippets بيسمع لـ [[focusin]] ويحط رقم صغير جنب كل عنصر بياخد focus بالترتيب، ويطبع في الكونسول لستة بالـ role والاسم. من درس الكيبورد وقارئ الشاشة.`, done: R`بعد ما تعدّي الصفحة بـ Tab، الأرقام ظاهرة على الصفحة بالترتيب، وأي رقم «بيتنط» لمكان غريب أو عنصر مخفي واخد focus بيبان على طول، واللستة فيها نفس عدد الأرقام.`, sol: R`~~~js tabmap.js
// Tab map: paste in DevTools › Sources › Snippets, run it (Ctrl+Enter), then press Tab through the page.
// Every element that takes focus gets a number at its corner, in order; hidden ones get a red number.
// Run it again to start over. tabmap.list() prints the table again.
(() => {
  window.tabmap?.stop();                                   // a second run cleans up the first one

  const layer = document.createElement("div");
  layer.style.cssText = "position:absolute;inset:0 auto auto 0;z-index:2147483647;pointer-events:none";
  document.body.append(layer);
  const rows = [];

  const ROLES = { A: "link", BUTTON: "button", SELECT: "combobox", TEXTAREA: "textbox", SUMMARY: "button", H1: "heading", H2: "heading", MAIN: "main" };
  function role(el) {
    if (el.getAttribute("role")) return el.getAttribute("role");
    if (el.tagName === "INPUT") return { checkbox: "checkbox", radio: "radio", range: "slider", submit: "button", button: "button" }[el.type] || "textbox";
    return ROLES[el.tagName] || el.tagName.toLowerCase();
  }
  function name(el) {
    const by = el.getAttribute("aria-labelledby");
    const text =
      el.getAttribute("aria-label") ||
      (by && by.split(" ").map(id => document.getElementById(id)?.textContent).join(" ")) ||
      (el.labels && el.labels[0]?.textContent) ||
      el.textContent ||
      el.querySelector("img")?.alt ||
      el.getAttribute("title") ||
      el.getAttribute("placeholder") || "";
    return text.replace(/\s+/g, " ").trim().slice(0, 40);
  }
  // "hidden" = it took focus but you can't see it: no size, transparent, invisible, or outside the page
  function hiddenWhy(el) {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (r.width < 1 || r.height < 1) return "مقاسه صفر";
    if (cs.visibility === "hidden") return "visibility hidden";
    for (let e = el; e; e = e.parentElement) if (getComputedStyle(e).opacity === "0") return "opacity 0";
    if (r.right < 0 || r.bottom < 0 || r.left > innerWidth + scrollX + 1000) return "برّه الشاشة";
    return "";
  }

  function onFocus(e) {
    const el = e.target;
    if (el === document.body) return;
    const r = el.getBoundingClientRect();
    const why = hiddenWhy(el);
    const n = rows.length + 1;
    rows.push({ n, role: role(el), name: name(el) || "(من غير اسم!)", tabindex: el.getAttribute("tabindex") ?? "", hidden: why });

    const tag = document.createElement("span");
    tag.textContent = n;
    tag.style.cssText =
      "position:absolute;min-width:20px;height:20px;padding:0 4px;border-radius:10px;font:700 12px/20px system-ui;text-align:center;color:#fff;" +
      "background:" + (why ? "#b91c1c" : "#1d4ed8") + ";box-shadow:0 0 0 2px #fff";
    // pinned to the element's top-left corner in page coordinates, so it stays put when you scroll
    tag.style.left = Math.max(0, r.left + scrollX - 8) + "px";
    tag.style.top = Math.max(0, r.top + scrollY - 8) + "px";
    layer.append(tag);
    console.log(n + ". " + rows[n - 1].role + ' "' + rows[n - 1].name + '"' + (why ? "   ⚠ مخفي: " + why : ""));
  }

  document.addEventListener("focusin", onFocus);
  window.tabmap = {
    list: () => console.table(rows),
    stop: () => { document.removeEventListener("focusin", onFocus); layer.remove(); },
  };
  console.log("خريطة الـ Tab شغالة: اضغط Tab. اكتب tabmap.list() للجدول، و tabmap.stop() للقفل.");
})();
~~~

**تحطه إزاي:** DevTools › Sources › Snippets › New snippet، والصق الكود، و Ctrl+Enter. الـ snippet بيفضل محفوظ في DevTools لأي موقع. ولو عايز تجربه هنا، الصفحة دي فيها غلطتين مقصودين:

~~~html demo.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة خريطة الـ Tab: «سِكّة» لتأجير العجل</title>
<style>
  body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1f2937; background: #f9fafb; }
  header { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fff; border-block-end: 1px solid #d1d5db; }
  header nav { display: flex; gap: 1rem; margin-inline-start: auto; }
  a { color: #1d4ed8; }
  .logo { font-weight: 800; color: #1f2937; text-decoration: none; }
  /* bug 1: the phone menu is "hidden" with opacity only, so its links still take focus */
  .drawer { position: absolute; inset-inline-end: 1rem; top: 3.5rem; display: grid; padding: 0.75rem; background: #fff; box-shadow: 0 8px 20px #0002; opacity: 0; }
  main { max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
  .card { display: grid; gap: 0.5rem; padding: 1rem; margin-block-end: 1rem; background: #fff; border: 1px solid #d1d5db; border-radius: 0.75rem; }
  button { justify-self: start; padding: 0.5rem 1rem; border: 0; border-radius: 0.5rem; background: #1d4ed8; color: #fff; font: inherit; }
  :focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
</style>
</head>
<body>
<header>
  <a class="logo" href="#">سِكّة</a>
  <nav aria-label="الأقسام"><a href="#bikes">العجل</a><a href="#prices">الأسعار</a></nav>
  <div class="drawer"><a href="#">حسابي</a><a href="#">خروج</a></div>
</header>
<main>
  <h1>أجّر عجلة بالساعة</h1>
  <div class="card" id="bikes">
    <h2>عجلة مدينة</h2>
    <p>٢٥ ج الساعة.</p>
    <button>احجز</button>
  </div>
  <div class="card" id="prices">
    <h2>عجلة جبلي</h2>
    <p>٤٠ ج الساعة.</p>
    <!-- bug 2: a positive tabindex jumps the queue -->
    <button tabindex="1">احجز الجبلي</button>
  </div>
</main>
<script src="tabmap.js"></script>
</body>
</html>
~~~

~~~view 680 680 دوس جوه الصفحة واضغط Tab
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تجربة خريطة الـ Tab: «سِكّة» لتأجير العجل</title>
<style>
  body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1f2937; background: #f9fafb; }
  header { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fff; border-block-end: 1px solid #d1d5db; }
  header nav { display: flex; gap: 1rem; margin-inline-start: auto; }
  a { color: #1d4ed8; }
  .logo { font-weight: 800; color: #1f2937; text-decoration: none; }
  /* bug 1: the phone menu is "hidden" with opacity only, so its links still take focus */
  .drawer { position: absolute; inset-inline-end: 1rem; top: 3.5rem; display: grid; padding: 0.75rem; background: #fff; box-shadow: 0 8px 20px #0002; opacity: 0; }
  main { max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
  .card { display: grid; gap: 0.5rem; padding: 1rem; margin-block-end: 1rem; background: #fff; border: 1px solid #d1d5db; border-radius: 0.75rem; }
  button { justify-self: start; padding: 0.5rem 1rem; border: 0; border-radius: 0.5rem; background: #1d4ed8; color: #fff; font: inherit; }
  :focus-visible { outline: 3px solid #b45309; outline-offset: 2px; }
</style>
</head>
<body>
<header>
  <a class="logo" href="#">سِكّة</a>
  <nav aria-label="الأقسام"><a href="#bikes">العجل</a><a href="#prices">الأسعار</a></nav>
  <div class="drawer"><a href="#">حسابي</a><a href="#">خروج</a></div>
</header>
<main>
  <h1>أجّر عجلة بالساعة</h1>
  <div class="card" id="bikes">
    <h2>عجلة مدينة</h2>
    <p>٢٥ ج الساعة.</p>
    <button>احجز</button>
  </div>
  <div class="card" id="prices">
    <h2>عجلة جبلي</h2>
    <p>٤٠ ج الساعة.</p>
    <!-- bug 2: a positive tabindex jumps the queue -->
    <button tabindex="1">احجز الجبلي</button>
  </div>
</main>
<script>
// Tab map: paste in DevTools › Sources › Snippets, run it (Ctrl+Enter), then press Tab through the page.
// Every element that takes focus gets a number at its corner, in order; hidden ones get a red number.
// Run it again to start over. tabmap.list() prints the table again.
(() => {
  window.tabmap?.stop();                                   // a second run cleans up the first one

  const layer = document.createElement("div");
  layer.style.cssText = "position:absolute;inset:0 auto auto 0;z-index:2147483647;pointer-events:none";
  document.body.append(layer);
  const rows = [];

  const ROLES = { A: "link", BUTTON: "button", SELECT: "combobox", TEXTAREA: "textbox", SUMMARY: "button", H1: "heading", H2: "heading", MAIN: "main" };
  function role(el) {
    if (el.getAttribute("role")) return el.getAttribute("role");
    if (el.tagName === "INPUT") return { checkbox: "checkbox", radio: "radio", range: "slider", submit: "button", button: "button" }[el.type] || "textbox";
    return ROLES[el.tagName] || el.tagName.toLowerCase();
  }
  function name(el) {
    const by = el.getAttribute("aria-labelledby");
    const text =
      el.getAttribute("aria-label") ||
      (by && by.split(" ").map(id => document.getElementById(id)?.textContent).join(" ")) ||
      (el.labels && el.labels[0]?.textContent) ||
      el.textContent ||
      el.querySelector("img")?.alt ||
      el.getAttribute("title") ||
      el.getAttribute("placeholder") || "";
    return text.replace(/\s+/g, " ").trim().slice(0, 40);
  }
  // "hidden" = it took focus but you can't see it: no size, transparent, invisible, or outside the page
  function hiddenWhy(el) {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    if (r.width < 1 || r.height < 1) return "مقاسه صفر";
    if (cs.visibility === "hidden") return "visibility hidden";
    for (let e = el; e; e = e.parentElement) if (getComputedStyle(e).opacity === "0") return "opacity 0";
    if (r.right < 0 || r.bottom < 0 || r.left > innerWidth + scrollX + 1000) return "برّه الشاشة";
    return "";
  }

  function onFocus(e) {
    const el = e.target;
    if (el === document.body) return;
    const r = el.getBoundingClientRect();
    const why = hiddenWhy(el);
    const n = rows.length + 1;
    rows.push({ n, role: role(el), name: name(el) || "(من غير اسم!)", tabindex: el.getAttribute("tabindex") ?? "", hidden: why });

    const tag = document.createElement("span");
    tag.textContent = n;
    tag.style.cssText =
      "position:absolute;min-width:20px;height:20px;padding:0 4px;border-radius:10px;font:700 12px/20px system-ui;text-align:center;color:#fff;" +
      "background:" + (why ? "#b91c1c" : "#1d4ed8") + ";box-shadow:0 0 0 2px #fff";
    // pinned to the element's top-left corner in page coordinates, so it stays put when you scroll
    tag.style.left = Math.max(0, r.left + scrollX - 8) + "px";
    tag.style.top = Math.max(0, r.top + scrollY - 8) + "px";
    layer.append(tag);
    console.log(n + ". " + rows[n - 1].role + ' "' + rows[n - 1].name + '"' + (why ? "   ⚠ مخفي: " + why : ""));
  }

  document.addEventListener("focusin", onFocus);
  window.tabmap = {
    list: () => console.table(rows),
    stop: () => { document.removeEventListener("focusin", onFocus); layer.remove(); },
  };
  console.log("خريطة الـ Tab شغالة: اضغط Tab. اكتب tabmap.list() للجدول، و tabmap.stop() للقفل.");
})();
</script>
</body>
</html>
~~~

**هتشوف إيه:** كل ما تضغط Tab يظهر رقم أزرق صغير على ركن العنصر اللي خد الـ focus، وفي الكونسول سطر «3. link "العجل"». والرقم الأحمر معناه إن العنصر خد focus وانت مش شايفه.

**على الصفحة دي الخريطة كشفت الغلطتين:**
- **رقم ١ على «احجز الجبلي» تحت خالص:** عليه [[tabindex="1"]]، فبيسبق كل حاجة. والـ Tab الأول بينط لآخر الصفحة.
- **٥ و ٦ أحمر:** «حسابي» و «خروج» في منيو مستخبية بـ [[opacity: 0]] بس. الـ opacity بتخفي الشكل، بس العنصر لسه موجود وبياخد focus. [[visibility: hidden]] أو [[display: none]] بيشيلوه من الـ Tab كمان.

بعد التصليح (شيل [[tabindex]]، و [[visibility: hidden]] على المنيو) الترتيب بقى طبيعي ومفيش أحمر.

**إزاي الكود شغال:**
- **[[focusin]] مش [[focus]]:** [[focus]] مبيطلعش لفوق (bubble)، فلازم تحط listener على كل عنصر. [[focusin]] بيطلع لـ [[document]]، فـ listener واحد بيكفي للصفحة كلها.
- **الرقم في مكانه وانت بتعمل scroll:** [[getBoundingClientRect()]] بيدي المكان بالنسبة للشاشة، فبنزوّد [[scrollX]] و [[scrollY]] ونحط الرقم [[position: absolute]] في طبقة فوق الصفحة. ولو استخدمنا [[fixed]] الأرقام كانت هتمشي مع الـ scroll.
- **[[pointer-events: none]] على الطبقة:** عشان الأرقام متاخدش الضغطات من الصفحة.
- **الاسم:** [[aria-label]]، وبعده [[aria-labelledby]]، وبعده الـ [[<label>]]، وبعده الكلام. ده تقريب لحساب الاسم الحقيقي مش كله. للاسم الدقيق: DevTools › Accessibility.
- **تشغيله تاني:** أول سطر بيقفل التشغيل اللي قبله ([[window.tabmap?.stop()]])، فمفيش أرقام مكررة.

~~~text الناتج (Playwright بـ Chrome 157، ٨ ضغطات Tab)
demo.html:
1. button "احجز الجبلي"
2. link "سِكّة"
3. link "العجل"
4. link "الأسعار"
5. link "حسابي"   ⚠ مخفي: opacity 0
6. link "خروج"   ⚠ مخفي: opacity 0
7. button "احجز"
الأرقام على الصفحة: 1 2 3 4 5(أحمر) 6(أحمر) 7، نفس عدد سطور الكونسول

بعد التصليح:
1. link "سِكّة"   2. link "العجل"   3. link "الأسعار"   4. button "احجز"   5. button "احجز الجبلي"
ومفيش ولا رقم أحمر
~~~

**ملحوظة عن آخر الصفحة:** بعد آخر عنصر، الـ Tab في المتصفح بيروح لشريط العنوان. في Playwright headless بيلف لأول الصفحة على طول، فهتلاقي «سِكّة» بيتكرر. لو شفت الأرقام بتعيد نفسها، يبقى انت لفّيت.` },
        { lvl: 'متوسط', dir: "landing-audit", t: R`مراجعة landing فيها ٨ مشاكل`, what: R`ابني (أو خد) صفحة landing فيها المشاكل اللي بتتكرر في المشاريع الحقيقية: aria-labels إنجليزي في صفحة عربي، و marquee شغال على طول من غير زرار وقوف، و [[cursor: none]] بمؤشر مخصص، وكلام 10px باهت، و accordion من غير [[aria-controls]]، ومنيو موبايل مبيحبسش الـ focus، ومفيش [[prefers-reduced-motion]]، وأيقونات emoji من غير اسم. افحصها بـ axe وبإيدك، وصلّح، واكتب تقرير.`, done: R`التقرير فيه لكل مشكلة: اتمسكت إزاي (axe ولا يدوي)، وبند WCAG، ولقطة قبل وبعد. axe بعد التصليح صفر، والمشاكل اللي axe مشافهاش (الـ marquee، والـ cursor، والـ reduced motion، والـ focus في المنيو) متعلّم عليها «يدوي».`, sol: R`المثال: landing لورشة خط عربي متخيلة «بيت الخط». [[before.html]] بالـ ٨ مشاكل، و [[index.html]] بعد التصليح، و [[check.mjs]] بيقيس الـ ٨ على النسختين، و [[REPORT.md]] التقرير.

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيت الخط: ورشة خط عربي</title>
<link rel="stylesheet" href="before.css">
<script src="before.js" defer></script>
</head>
<body>
<div class="cursor" aria-hidden="true"></div>
<header class="header">
  <a class="logo" href="#">بيت الخط</a>
  <nav class="links" aria-label="Main menu">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
  </nav>
  <button class="menu-btn" aria-label="Open menu">☰</button>
  <div class="drawer" id="drawer">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
    <button class="drawer-close" aria-label="Close">✕</button>
  </div>
</header>

<main>
  <section class="hero">
    <h1>اتعلّم الرقعة والنسخ في ٨ أسابيع</h1>
    <p>مجموعات صغيرة، وأدوات علينا، وكراسة بتاخدها معاك.</p>
    <a class="btn" href="#join">احجز مكانك</a>
  </section>

  <section class="partners" aria-label="Partners">
    <div class="marquee">
      <ul class="track">
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
      </ul>
    </div>
  </section>

  <section id="courses" class="section">
    <h2>الكورسات</h2>
    <ul class="cards">
      <li class="card"><h3>رقعة للمبتدئين</h3><p class="small">٨ حصص، كل سبت، ١٢٠٠ ج</p></li>
      <li class="card"><h3>نسخ</h3><p class="small">١٠ حصص، كل اتنين، ١٥٠٠ ج</p></li>
      <li class="card"><h3>ثلث متقدم</h3><p class="small">١٢ حصة، كل أربع، ٢٠٠٠ ج</p></li>
    </ul>
  </section>

  <section id="faq" class="section">
    <h2>أسئلة</h2>
    <div class="acc">
      <div class="acc-q">لازم أكون بعرف أرسم؟</div>
      <div class="acc-a">لأ، بنبدأ من مسكة القلم.</div>
    </div>
    <div class="acc">
      <div class="acc-q">الأدوات عليا؟</div>
      <div class="acc-a">لأ، القلم والحبر والورق علينا في أول شهر.</div>
    </div>
  </section>

  <section id="join" class="section">
    <h2>احجز</h2>
    <p>كلّمنا وهنرد في نفس اليوم.</p>
    <div class="social">
      <a href="#">📞</a>
      <a href="#">💬</a>
      <a href="#">📍</a>
    </div>
  </section>
</main>
<footer class="footer"><p class="small">بيت الخط، ورشة متخيلة للتجربة.</p></footer>
</body>
</html>
~~~

~~~css before.css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #292524; background: #fffbf5; cursor: none; }
a, button { cursor: none; }
a { color: #9a3412; }

.cursor { position: fixed; top: 0; left: 0; z-index: 50; width: 28px; height: 28px; border: 2px solid #9a3412; border-radius: 50%; pointer-events: none; transition: translate 0.15s ease-out; }

.header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fffbf5; border-block-end: 1px solid #e7e5e4; }
.logo { font-weight: 800; color: #292524; text-decoration: none; }
.links { display: flex; gap: 1rem; margin-inline-start: auto; }
.menu-btn { display: none; margin-inline-start: auto; border: 0; background: none; font-size: 1.4rem; }
.drawer { display: none; position: fixed; inset: 0 0 0 30%; padding: 4rem 1.5rem; background: #fff; box-shadow: 0 0 30px #0003; flex-direction: column; gap: 1rem; }
.drawer.open { display: flex; }
.drawer-close { position: absolute; top: 1rem; inset-inline-start: 1rem; border: 0; background: none; font-size: 1.2rem; }
@media (max-width: 40rem) {
  .links { display: none; }
  .menu-btn { display: block; }
}

.hero { padding: 4rem 1rem; text-align: center; background: linear-gradient(#fde7d1, #fffbf5); }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); }
.btn { display: inline-block; padding: 0.7rem 1.4rem; border-radius: 999px; background: #9a3412; color: #fff; text-decoration: none; font-weight: 700; }

.partners { overflow: hidden; padding-block: 1rem; background: #292524; color: #fafaf9; }
.track { display: flex; gap: 3rem; width: max-content; margin: 0; padding: 0; list-style: none; animation: slide 18s linear infinite; }
@keyframes slide { to { translate: 50% 0; } }

.section { max-width: 52rem; margin: 0 auto; padding: 2.5rem 1rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; }
.card h3 { margin: 0 0 0.25rem; }
.small { margin: 0; font-size: 10px; color: #b8b0a8; }

.acc { border-block-end: 1px solid #e7e5e4; }
.acc-q { padding: 0.75rem 0; font-weight: 700; }
.acc-a { display: none; padding-block-end: 0.75rem; }
.acc.open .acc-a { display: block; }

.social { display: flex; gap: 1rem; font-size: 1.6rem; }
.social a { text-decoration: none; }
.footer { padding: 1.5rem 1rem; text-align: center; border-block-start: 1px solid #e7e5e4; }
~~~

~~~js before.js
// custom cursor follows the mouse
const cursor = document.querySelector(".cursor");
addEventListener("mousemove", e => { cursor.style.translate = (e.clientX - 14) + "px " + (e.clientY - 14) + "px"; });

// phone menu: opens and closes, nothing else
const drawer = document.getElementById("drawer");
document.querySelector(".menu-btn").addEventListener("click", () => drawer.classList.add("open"));
document.querySelector(".drawer-close").addEventListener("click", () => drawer.classList.remove("open"));

// accordion: click on the question
document.querySelectorAll(".acc-q").forEach(q => q.addEventListener("click", () => q.parentElement.classList.toggle("open")));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيت الخط: ورشة خط عربي</title>
<link rel="stylesheet" href="style.css">
<script src="main.js" defer></script>
</head>
<body>
<div class="cursor" aria-hidden="true"></div>
<header class="header">
  <a class="logo" href="#">بيت الخط</a>
  <nav class="links" aria-label="القايمة الرئيسية">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
  </nav>
  <button type="button" class="menu-btn" aria-label="افتح القايمة" aria-haspopup="dialog">☰</button>
  <dialog class="drawer" id="drawer" aria-label="القايمة">
    <nav aria-label="القايمة على الموبايل">
      <a href="#courses">الكورسات</a>
      <a href="#faq">أسئلة</a>
      <a href="#join">احجز</a>
    </nav>
    <form method="dialog"><button class="drawer-close" aria-label="اقفل القايمة">✕</button></form>
  </dialog>
</header>

<main>
  <section class="hero">
    <h1>اتعلّم الرقعة والنسخ في ٨ أسابيع</h1>
    <p>مجموعات صغيرة، وأدوات علينا، وكراسة بتاخدها معاك.</p>
    <a class="btn" href="#join">احجز مكانك</a>
  </section>

  <section class="partners" aria-labelledby="partners-t">
    <h2 id="partners-t" class="sr-only">شركاؤنا</h2>
    <button type="button" class="pause" aria-pressed="false">وقّف الحركة</button>
    <div class="marquee">
      <ul class="track">
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
        <li aria-hidden="true">مكتبة الورّاق</li><li aria-hidden="true">دار الحبر</li><li aria-hidden="true">جمعية الفنون</li><li aria-hidden="true">مرسم النيل</li><li aria-hidden="true">ورق وقلم</li>
      </ul>
    </div>
  </section>

  <section id="courses" class="section">
    <h2>الكورسات</h2>
    <ul class="cards">
      <li class="card"><h3>رقعة للمبتدئين</h3><p class="small">٨ حصص، كل سبت، ١٢٠٠ ج</p></li>
      <li class="card"><h3>نسخ</h3><p class="small">١٠ حصص، كل اتنين، ١٥٠٠ ج</p></li>
      <li class="card"><h3>ثلث متقدم</h3><p class="small">١٢ حصة، كل أربع، ٢٠٠٠ ج</p></li>
    </ul>
  </section>

  <section id="faq" class="section">
    <h2>أسئلة</h2>
    <div class="acc">
      <h3><button type="button" class="acc-q" aria-expanded="false" aria-controls="a1">لازم أكون بعرف أرسم؟</button></h3>
      <div class="acc-a" id="a1" hidden>لأ، بنبدأ من مسكة القلم.</div>
    </div>
    <div class="acc">
      <h3><button type="button" class="acc-q" aria-expanded="false" aria-controls="a2">الأدوات عليا؟</button></h3>
      <div class="acc-a" id="a2" hidden>لأ، القلم والحبر والورق علينا في أول شهر.</div>
    </div>
  </section>

  <section id="join" class="section">
    <h2>احجز</h2>
    <p>كلّمنا وهنرد في نفس اليوم.</p>
    <ul class="social">
      <li><a href="#"><span aria-hidden="true">📞</span> اتصل بينا</a></li>
      <li><a href="#"><span aria-hidden="true">💬</span> واتساب</a></li>
      <li><a href="#"><span aria-hidden="true">📍</span> العنوان على الخريطة</a></li>
    </ul>
  </section>
</main>
<footer class="footer"><p class="small">بيت الخط، ورشة متخيلة للتجربة.</p></footer>
</body>
</html>
~~~

~~~css style.css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #292524; background: #fffbf5; }
a { color: #9a3412; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* 3. the ring follows the mouse, but the real cursor stays (no cursor: none) */
.cursor { position: fixed; top: 0; left: 0; z-index: 50; width: 28px; height: 28px; border: 2px solid #9a3412; border-radius: 50%; pointer-events: none; transition: translate 0.15s ease-out; }
@media (pointer: coarse) { .cursor { display: none; } }

.header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fffbf5; border-block-end: 1px solid #e7e5e4; }
.logo { font-weight: 800; color: #292524; text-decoration: none; }
.links { display: flex; gap: 1rem; margin-inline-start: auto; }
.menu-btn { display: none; margin-inline-start: auto; min-width: 44px; min-height: 44px; border: 0; background: none; color: inherit; font-size: 1.4rem; }
/* 6. the phone menu is a modal <dialog>: Tab stays inside, Escape closes, focus goes back to ☰ */
.drawer { margin: 0 0 0 auto; width: min(20rem, 85vw); height: 100dvh; max-height: none; padding: 4rem 1.5rem; border: 0; background: #fff; box-shadow: 0 0 30px #0003; }
.drawer nav { display: grid; gap: 1rem; }
.drawer::backdrop { background: rgb(0 0 0 / 0.4); }
.drawer-close { position: absolute; top: 1rem; inset-inline-start: 1rem; min-width: 44px; min-height: 44px; border: 0; background: none; color: inherit; font-size: 1.2rem; }
@media (max-width: 40rem) {
  .links { display: none; }
  .menu-btn { display: block; }
}

.hero { padding: 4rem 1rem; text-align: center; background: linear-gradient(#fde7d1, #fffbf5); }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); }
.btn { display: inline-block; padding: 0.7rem 1.4rem; border-radius: 999px; background: #9a3412; color: #fff; text-decoration: none; font-weight: 700; }

/* 2. the marquee: a pause button, and it also stops on hover and while focus is inside */
.partners { position: relative; overflow: hidden; padding-block: 1rem; background: #292524; color: #fafaf9; }
.pause { position: absolute; inset-inline-end: 0.5rem; top: 50%; translate: 0 -50%; z-index: 1; padding: 0.3rem 0.8rem; border: 1px solid #fafaf9; border-radius: 999px; background: #292524; color: #fafaf9; font: inherit; font-size: 0.875rem; }
.track { display: flex; gap: 3rem; width: max-content; margin: 0; padding: 0; list-style: none; animation: slide 18s linear infinite; }
.partners:hover .track, .partners:focus-within .track, .partners.paused .track { animation-play-state: paused; }
@keyframes slide { to { translate: 50% 0; } }

.section { max-width: 52rem; margin: 0 auto; padding: 2.5rem 1rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; }
.card h3 { margin: 0 0 0.25rem; }
/* 4. 10px #b8b0a8 (2.1:1) -> 0.875rem #57534e */
.small { margin: 0; font-size: 0.875rem; color: #57534e; }

/* 5. the accordion question is a real button inside a heading */
.acc { border-block-end: 1px solid #e7e5e4; }
.acc h3 { margin: 0; }
.acc-q { display: flex; justify-content: space-between; width: 100%; padding: 0.75rem 0; border: 0; background: none; color: inherit; font: inherit; font-weight: 700; text-align: start; }
.acc-q::after { content: "+"; }
.acc-q[aria-expanded="true"]::after { content: "−"; }
.acc-a { padding-block-end: 0.75rem; }

/* 8. every link has words; the emoji is decoration */
.social { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0; padding: 0; list-style: none; }
.social a { display: inline-flex; gap: 0.4rem; align-items: center; padding: 0.4rem 0.9rem; border: 1px solid #d6d3d1; border-radius: 999px; text-decoration: none; }
.footer { padding: 1.5rem 1rem; text-align: center; border-block-start: 1px solid #e7e5e4; }

/* 7. reduced motion: no marquee (a plain row), no smooth scroll, no cursor ring */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .track { animation: none; flex-wrap: wrap; width: auto; gap: 0.5rem 2rem; padding-inline: 1rem; }
  .track [aria-hidden="true"], .pause, .cursor { display: none; }
}
~~~

~~~js main.js
// 3. the ring follows the mouse (decoration only: the system cursor is still there)
const cursor = document.querySelector(".cursor");
addEventListener("mousemove", e => { cursor.style.translate = (e.clientX - 14) + "px " + (e.clientY - 14) + "px"; });

// 6. phone menu: a modal dialog, so the browser keeps focus inside and Escape closes it
const drawer = document.getElementById("drawer");
document.querySelector(".menu-btn").addEventListener("click", () => drawer.showModal());
drawer.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => drawer.close()));

// 2. pause the marquee (WCAG 2.2.2): the button says its state with aria-pressed
const partners = document.querySelector(".partners");
const pause = document.querySelector(".pause");
pause.addEventListener("click", () => {
  const paused = pause.getAttribute("aria-pressed") !== "true";
  pause.setAttribute("aria-pressed", String(paused));
  pause.textContent = paused ? "شغّل الحركة" : "وقّف الحركة";
  partners.classList.toggle("paused", paused);
});

// 5. accordion: aria-expanded on the button, hidden on the answer it controls
document.querySelectorAll(".acc-q").forEach(btn => btn.addEventListener("click", () => {
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", String(open));
  document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
}));
~~~

~~~js check.mjs
// node check.mjs <base-url>: measures the 8 problems on before.html and index.html
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const base = process.argv[2] || "http://localhost:8813/landing-audit/";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

// WCAG contrast from two "rgb(r, g, b)" strings
const lum = c => { const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return ((x + 0.05) / (y + 0.05)).toFixed(2); };

const browser = await chromium.launch({ channel: "chrome" });
for (const file of ["before.html", "index.html"]) {
  console.log("\n=== " + file);
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base + file);

  const axe = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const axeMain = await new AxeBuilder({ page }).include("main").withTags(TAGS).analyze();
  const cc = r => (r.violations.find(v => v.id === "color-contrast")?.nodes.length ?? 0);
  console.log("axe الصفحة كلها: " + axe.violations.length + " violations (color-contrast " + cc(axe) + ")" + " | axe على main بس: " + axeMain.violations.map(v => v.id + ":" + v.nodes.length).join(", "));

  // 1. aria-label language
  console.log("1. aria-labels: " + (await page.$$eval("[aria-label]", els => els.map(e => e.getAttribute("aria-label")))).join(" | "));

  // 2. marquee: can it be paused?
  const pauseBtn = await page.$(".pause");
  if (pauseBtn) { await pauseBtn.click(); await page.mouse.move(5, 790); }
  console.log("2. marquee: زرار وقوف " + (pauseBtn ? "موجود" : "مش موجود") + " | الحركة بعد الضغط: " + await page.$eval(".track", t => t.getAnimations()[0]?.playState));

  // 3. cursor
  console.log("3. cursor على body و .btn: " + await page.$eval("body", e => getComputedStyle(e).cursor) + " و " + await page.$eval(".btn", e => getComputedStyle(e).cursor));

  // 4. small text
  const sm = await page.$eval(".card .small", e => { const cs = getComputedStyle(e); return { size: cs.fontSize, fg: cs.color, bg: getComputedStyle(e.closest(".card")).backgroundColor }; });
  console.log("4. .small: " + sm.size + "، تباين " + ratio(sm.fg, sm.bg));

  // 5. accordion by keyboard
  const accFocusable = await page.$eval(".acc-q", e => e.tabIndex >= 0);
  let acc = "مش بيتوصل بـ Tab";
  if (accFocusable) { await page.focus(".acc-q"); await page.keyboard.press("Enter"); acc = "Enter: aria-expanded=" + await page.$eval(".acc-q", e => e.getAttribute("aria-expanded")) + " والإجابة hidden=" + await page.$eval("#a1", e => e.hidden) + " | aria-controls=" + await page.$eval(".acc-q", e => e.getAttribute("aria-controls")); }
  console.log("5. accordion: " + acc);

  // 6. phone menu: Tab 6 times after opening, is focus still inside?
  await page.setViewportSize({ width: 375, height: 700 });
  await page.focus(".menu-btn"); await page.keyboard.press("Enter"); await page.waitForTimeout(200);
  const where = [];
  for (let i = 0; i < 6; i++) { await page.keyboard.press("Tab"); where.push(await page.evaluate(() => (document.activeElement === document.body ? "المتصفح" : document.activeElement.closest("#drawer") ? "جوه" : "برّه:" + document.activeElement.textContent.trim().slice(0, 12)))); }
  await page.keyboard.press("Escape"); await page.waitForTimeout(200);
  console.log("6. المنيو: " + where.join(" ← ") + " | بعد Escape الـ focus على: " + await page.evaluate(() => document.activeElement.className || document.activeElement.tagName));
  await page.setViewportSize({ width: 1280, height: 800 });

  // 7. reduced motion
  await page.emulateMedia({ reducedMotion: "reduce" });
  console.log("7. reduce: animation-name=" + await page.$eval(".track", e => getComputedStyle(e).animationName) + " | scroll-behavior=" + await page.$eval("html", e => getComputedStyle(e).scrollBehavior));
  await page.emulateMedia({ reducedMotion: "no-preference" });

  // 8. emoji links: the accessibility tree
  console.log("8. اللينكات:\n" + (await page.locator("#join").ariaSnapshot()).split("\n").filter(l => l.includes("link")).join("\n"));

  await page.screenshot({ path: "shots/" + file.replace(".html", "") + ".png", fullPage: true });
  await ctx.close();
}
await browser.close();
~~~

~~~text REPORT.md
# بيت الخط: مراجعة الـ accessibility

$__btbefore.html$__bt قبل، و $__btindex.html$__bt بعد. القياس كله من $__btnode check.mjs$__bt (Chrome 157، axe-core 4.14.0)، واللقطات في $__btshots/$__bt.

## الملخص

axe على الصفحة كلها قال **0** قبل وبعد. يعني axe لوحده كان هيقول إن الصفحة البايظة سليمة. ٧ من الـ ٨ مشاكل اتمسكوا يدوي، والتامنة (التباين) axe مسكها بس لما اتشغّل على $__btmain$__bt لوحده (السبب تحت).

| # | المشكلة | اتمسكت إزاي | بند WCAG | قبل | بعد |
|---|---|---|---|---|---|
| ١ | $__btaria-label$__bt إنجليزي في صفحة عربي | يدوي: لستة كل $__bt[aria-label]$__bt | 3.1.2 Language of Parts | Main menu، Open menu، Close، Partners | القايمة الرئيسية، افتح القايمة، اقفل القايمة… |
| ٢ | marquee شغال على طول من غير وقوف | يدوي | 2.2.2 Pause, Stop, Hide | مفيش زرار، والحركة $__btrunning$__bt | زرار «وقّف الحركة» ($__btaria-pressed$__bt)، والحركة $__btpaused$__bt |
| ٣ | $__btcursor: none$__bt بمؤشر مخصص | يدوي: $__btgetComputedStyle().cursor$__bt | مفيش بند مباشر: اللي مكبّر مؤشر الويندوز أو لونه بيخسره | $__btnone$__bt | $__btauto$__bt و $__btpointer$__bt، والدايرة زينة بس |
| ٤ | كلام 10px باهت | axe على $__btmain$__bt بس، والحساب بإيدك | 1.4.3 Contrast | 10px، تباين 2.14 | 14px، تباين 7.63 |
| ٥ | accordion $__btdiv$__bt بيتفتح بالماوس بس، من غير $__btaria-expanded$__bt ولا $__btaria-controls$__bt | يدوي: Tab مبيوصلش | 2.1.1 Keyboard، 4.1.2 Name, Role, Value | مش بيتوصل بـ Tab | $__bt<button aria-expanded aria-controls>$__bt جوه $__bt<h3>$__bt، و Enter بيفتح |
| ٦ | منيو الموبايل مبيحبسش الـ focus | يدوي: Tab ٦ مرات بعد الفتح | 2.4.3 Focus Order | جوه ×٤ ← «احجز مكانك» ← 📞 (ورا المنيو) | $__bt<dialog>$__bt بـ $__btshowModal()$__bt: جوه ← المتصفح ← جوه، و Escape بيرجّع للزرار |
| ٧ | مفيش $__btprefers-reduced-motion$__bt | يدوي: $__btemulateMedia({ reducedMotion: "reduce" })$__bt | 2.3.3 Animation from Interactions (AAA)، و 2.2.2 | $__btslide$__bt و $__btsmooth$__bt | $__btnone$__bt و $__btauto$__bt |
| ٨ | لينكات emoji بس | يدوي: شجرة الـ accessibility | 2.4.4 Link Purpose | $__btlink "📞"$__bt، $__btlink "💬"$__bt، $__btlink "📍"$__bt | $__btlink "اتصل بينا"$__bt، $__btlink "واتساب"$__bt، $__btlink "العنوان على الخريطة"$__bt |

## ليه axe قال 0 على صفحة فيها تباين 2.14

axe بيحاول يعرف الخطوط بتاعة الأيقونات (زي Material Icons) عشان مايقيسش تباينها: بيرسم الكلمة على canvas ويقارن. الحروف العربي المتوصلة بتطلع زي «ligature»، فـ axe بيعلّم «بيت الخط» و «الكورسات» و «أسئلة» إنهم أيقونات. وبعد ٣ مرات في نفس الخط، بيعتبر الخط كله ($__btsystem-ui…$__bt) خط أيقونات ويتخطى **كل** الكلام اللي بيه. فـ $__btcolor-contrast$__bt بتطلع $__btinapplicable$__bt للصفحة كلها.

اتأكدت من ده بـ $__btaxe.commons.text.isIconLigature()$__bt على كل نص في الصفحة: أول ٣ نصوص عربي $__btICON$__bt. والتشغيل على $__btmain$__bt بس بيبدأ العد من جديد، فمسك الكارت الأول والتالت (2.13) وفاته التاني، والفوتر برّه $__btmain$__bt أصلًا.

**الدرس:** على صفحة عربي، صفر في $__btcolor-contrast$__bt مش معناه إن التباين كويس. احسبه بنفسك (زي $__btcheck.mjs$__bt).
~~~

~~~view 760 900 بعد التصليح
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيت الخط: ورشة خط عربي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #292524; background: #fffbf5; }
a { color: #9a3412; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* 3. the ring follows the mouse, but the real cursor stays (no cursor: none) */
.cursor { position: fixed; top: 0; left: 0; z-index: 50; width: 28px; height: 28px; border: 2px solid #9a3412; border-radius: 50%; pointer-events: none; transition: translate 0.15s ease-out; }
@media (pointer: coarse) { .cursor { display: none; } }

.header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fffbf5; border-block-end: 1px solid #e7e5e4; }
.logo { font-weight: 800; color: #292524; text-decoration: none; }
.links { display: flex; gap: 1rem; margin-inline-start: auto; }
.menu-btn { display: none; margin-inline-start: auto; min-width: 44px; min-height: 44px; border: 0; background: none; color: inherit; font-size: 1.4rem; }
/* 6. the phone menu is a modal <dialog>: Tab stays inside, Escape closes, focus goes back to ☰ */
.drawer { margin: 0 0 0 auto; width: min(20rem, 85vw); height: 100dvh; max-height: none; padding: 4rem 1.5rem; border: 0; background: #fff; box-shadow: 0 0 30px #0003; }
.drawer nav { display: grid; gap: 1rem; }
.drawer::backdrop { background: rgb(0 0 0 / 0.4); }
.drawer-close { position: absolute; top: 1rem; inset-inline-start: 1rem; min-width: 44px; min-height: 44px; border: 0; background: none; color: inherit; font-size: 1.2rem; }
@media (max-width: 40rem) {
  .links { display: none; }
  .menu-btn { display: block; }
}

.hero { padding: 4rem 1rem; text-align: center; background: linear-gradient(#fde7d1, #fffbf5); }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); }
.btn { display: inline-block; padding: 0.7rem 1.4rem; border-radius: 999px; background: #9a3412; color: #fff; text-decoration: none; font-weight: 700; }

/* 2. the marquee: a pause button, and it also stops on hover and while focus is inside */
.partners { position: relative; overflow: hidden; padding-block: 1rem; background: #292524; color: #fafaf9; }
.pause { position: absolute; inset-inline-end: 0.5rem; top: 50%; translate: 0 -50%; z-index: 1; padding: 0.3rem 0.8rem; border: 1px solid #fafaf9; border-radius: 999px; background: #292524; color: #fafaf9; font: inherit; font-size: 0.875rem; }
.track { display: flex; gap: 3rem; width: max-content; margin: 0; padding: 0; list-style: none; animation: slide 18s linear infinite; }
.partners:hover .track, .partners:focus-within .track, .partners.paused .track { animation-play-state: paused; }
@keyframes slide { to { translate: 50% 0; } }

.section { max-width: 52rem; margin: 0 auto; padding: 2.5rem 1rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; }
.card h3 { margin: 0 0 0.25rem; }
/* 4. 10px #b8b0a8 (2.1:1) -> 0.875rem #57534e */
.small { margin: 0; font-size: 0.875rem; color: #57534e; }

/* 5. the accordion question is a real button inside a heading */
.acc { border-block-end: 1px solid #e7e5e4; }
.acc h3 { margin: 0; }
.acc-q { display: flex; justify-content: space-between; width: 100%; padding: 0.75rem 0; border: 0; background: none; color: inherit; font: inherit; font-weight: 700; text-align: start; }
.acc-q::after { content: "+"; }
.acc-q[aria-expanded="true"]::after { content: "−"; }
.acc-a { padding-block-end: 0.75rem; }

/* 8. every link has words; the emoji is decoration */
.social { display: flex; flex-wrap: wrap; gap: 1rem; margin: 0; padding: 0; list-style: none; }
.social a { display: inline-flex; gap: 0.4rem; align-items: center; padding: 0.4rem 0.9rem; border: 1px solid #d6d3d1; border-radius: 999px; text-decoration: none; }
.footer { padding: 1.5rem 1rem; text-align: center; border-block-start: 1px solid #e7e5e4; }

/* 7. reduced motion: no marquee (a plain row), no smooth scroll, no cursor ring */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .track { animation: none; flex-wrap: wrap; width: auto; gap: 0.5rem 2rem; padding-inline: 1rem; }
  .track [aria-hidden="true"], .pause, .cursor { display: none; }
}
</style>
</head>
<body>
<div class="cursor" aria-hidden="true"></div>
<header class="header">
  <a class="logo" href="#">بيت الخط</a>
  <nav class="links" aria-label="القايمة الرئيسية">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
  </nav>
  <button type="button" class="menu-btn" aria-label="افتح القايمة" aria-haspopup="dialog">☰</button>
  <dialog class="drawer" id="drawer" aria-label="القايمة">
    <nav aria-label="القايمة على الموبايل">
      <a href="#courses">الكورسات</a>
      <a href="#faq">أسئلة</a>
      <a href="#join">احجز</a>
    </nav>
    <form method="dialog"><button class="drawer-close" aria-label="اقفل القايمة">✕</button></form>
  </dialog>
</header>

<main>
  <section class="hero">
    <h1>اتعلّم الرقعة والنسخ في ٨ أسابيع</h1>
    <p>مجموعات صغيرة، وأدوات علينا، وكراسة بتاخدها معاك.</p>
    <a class="btn" href="#join">احجز مكانك</a>
  </section>

  <section class="partners" aria-labelledby="partners-t">
    <h2 id="partners-t" class="sr-only">شركاؤنا</h2>
    <button type="button" class="pause" aria-pressed="false">وقّف الحركة</button>
    <div class="marquee">
      <ul class="track">
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
        <li aria-hidden="true">مكتبة الورّاق</li><li aria-hidden="true">دار الحبر</li><li aria-hidden="true">جمعية الفنون</li><li aria-hidden="true">مرسم النيل</li><li aria-hidden="true">ورق وقلم</li>
      </ul>
    </div>
  </section>

  <section id="courses" class="section">
    <h2>الكورسات</h2>
    <ul class="cards">
      <li class="card"><h3>رقعة للمبتدئين</h3><p class="small">٨ حصص، كل سبت، ١٢٠٠ ج</p></li>
      <li class="card"><h3>نسخ</h3><p class="small">١٠ حصص، كل اتنين، ١٥٠٠ ج</p></li>
      <li class="card"><h3>ثلث متقدم</h3><p class="small">١٢ حصة، كل أربع، ٢٠٠٠ ج</p></li>
    </ul>
  </section>

  <section id="faq" class="section">
    <h2>أسئلة</h2>
    <div class="acc">
      <h3><button type="button" class="acc-q" aria-expanded="false" aria-controls="a1">لازم أكون بعرف أرسم؟</button></h3>
      <div class="acc-a" id="a1" hidden>لأ، بنبدأ من مسكة القلم.</div>
    </div>
    <div class="acc">
      <h3><button type="button" class="acc-q" aria-expanded="false" aria-controls="a2">الأدوات عليا؟</button></h3>
      <div class="acc-a" id="a2" hidden>لأ، القلم والحبر والورق علينا في أول شهر.</div>
    </div>
  </section>

  <section id="join" class="section">
    <h2>احجز</h2>
    <p>كلّمنا وهنرد في نفس اليوم.</p>
    <ul class="social">
      <li><a href="#"><span aria-hidden="true">📞</span> اتصل بينا</a></li>
      <li><a href="#"><span aria-hidden="true">💬</span> واتساب</a></li>
      <li><a href="#"><span aria-hidden="true">📍</span> العنوان على الخريطة</a></li>
    </ul>
  </section>
</main>
<footer class="footer"><p class="small">بيت الخط، ورشة متخيلة للتجربة.</p></footer>
<script>
// 3. the ring follows the mouse (decoration only: the system cursor is still there)
const cursor = document.querySelector(".cursor");
addEventListener("mousemove", e => { cursor.style.translate = (e.clientX - 14) + "px " + (e.clientY - 14) + "px"; });

// 6. phone menu: a modal dialog, so the browser keeps focus inside and Escape closes it
const drawer = document.getElementById("drawer");
document.querySelector(".menu-btn").addEventListener("click", () => drawer.showModal());
drawer.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => drawer.close()));

// 2. pause the marquee (WCAG 2.2.2): the button says its state with aria-pressed
const partners = document.querySelector(".partners");
const pause = document.querySelector(".pause");
pause.addEventListener("click", () => {
  const paused = pause.getAttribute("aria-pressed") !== "true";
  pause.setAttribute("aria-pressed", String(paused));
  pause.textContent = paused ? "شغّل الحركة" : "وقّف الحركة";
  partners.classList.toggle("paused", paused);
});

// 5. accordion: aria-expanded on the button, hidden on the answer it controls
document.querySelectorAll(".acc-q").forEach(btn => btn.addEventListener("click", () => {
  const open = btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", String(open));
  document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
}));
</script>
</body>
</html>
~~~

~~~view 760 900 قبل
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيت الخط: ورشة خط عربي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #292524; background: #fffbf5; cursor: none; }
a, button { cursor: none; }
a { color: #9a3412; }

.cursor { position: fixed; top: 0; left: 0; z-index: 50; width: 28px; height: 28px; border: 2px solid #9a3412; border-radius: 50%; pointer-events: none; transition: translate 0.15s ease-out; }

.header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fffbf5; border-block-end: 1px solid #e7e5e4; }
.logo { font-weight: 800; color: #292524; text-decoration: none; }
.links { display: flex; gap: 1rem; margin-inline-start: auto; }
.menu-btn { display: none; margin-inline-start: auto; border: 0; background: none; font-size: 1.4rem; }
.drawer { display: none; position: fixed; inset: 0 0 0 30%; padding: 4rem 1.5rem; background: #fff; box-shadow: 0 0 30px #0003; flex-direction: column; gap: 1rem; }
.drawer.open { display: flex; }
.drawer-close { position: absolute; top: 1rem; inset-inline-start: 1rem; border: 0; background: none; font-size: 1.2rem; }
@media (max-width: 40rem) {
  .links { display: none; }
  .menu-btn { display: block; }
}

.hero { padding: 4rem 1rem; text-align: center; background: linear-gradient(#fde7d1, #fffbf5); }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); }
.btn { display: inline-block; padding: 0.7rem 1.4rem; border-radius: 999px; background: #9a3412; color: #fff; text-decoration: none; font-weight: 700; }

.partners { overflow: hidden; padding-block: 1rem; background: #292524; color: #fafaf9; }
.track { display: flex; gap: 3rem; width: max-content; margin: 0; padding: 0; list-style: none; animation: slide 18s linear infinite; }
@keyframes slide { to { translate: 50% 0; } }

.section { max-width: 52rem; margin: 0 auto; padding: 2.5rem 1rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; }
.card h3 { margin: 0 0 0.25rem; }
.small { margin: 0; font-size: 10px; color: #b8b0a8; }

.acc { border-block-end: 1px solid #e7e5e4; }
.acc-q { padding: 0.75rem 0; font-weight: 700; }
.acc-a { display: none; padding-block-end: 0.75rem; }
.acc.open .acc-a { display: block; }

.social { display: flex; gap: 1rem; font-size: 1.6rem; }
.social a { text-decoration: none; }
.footer { padding: 1.5rem 1rem; text-align: center; border-block-start: 1px solid #e7e5e4; }
</style>
</head>
<body>
<div class="cursor" aria-hidden="true"></div>
<header class="header">
  <a class="logo" href="#">بيت الخط</a>
  <nav class="links" aria-label="Main menu">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
  </nav>
  <button class="menu-btn" aria-label="Open menu">☰</button>
  <div class="drawer" id="drawer">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
    <button class="drawer-close" aria-label="Close">✕</button>
  </div>
</header>

<main>
  <section class="hero">
    <h1>اتعلّم الرقعة والنسخ في ٨ أسابيع</h1>
    <p>مجموعات صغيرة، وأدوات علينا، وكراسة بتاخدها معاك.</p>
    <a class="btn" href="#join">احجز مكانك</a>
  </section>

  <section class="partners" aria-label="Partners">
    <div class="marquee">
      <ul class="track">
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
      </ul>
    </div>
  </section>

  <section id="courses" class="section">
    <h2>الكورسات</h2>
    <ul class="cards">
      <li class="card"><h3>رقعة للمبتدئين</h3><p class="small">٨ حصص، كل سبت، ١٢٠٠ ج</p></li>
      <li class="card"><h3>نسخ</h3><p class="small">١٠ حصص، كل اتنين، ١٥٠٠ ج</p></li>
      <li class="card"><h3>ثلث متقدم</h3><p class="small">١٢ حصة، كل أربع، ٢٠٠٠ ج</p></li>
    </ul>
  </section>

  <section id="faq" class="section">
    <h2>أسئلة</h2>
    <div class="acc">
      <div class="acc-q">لازم أكون بعرف أرسم؟</div>
      <div class="acc-a">لأ، بنبدأ من مسكة القلم.</div>
    </div>
    <div class="acc">
      <div class="acc-q">الأدوات عليا؟</div>
      <div class="acc-a">لأ، القلم والحبر والورق علينا في أول شهر.</div>
    </div>
  </section>

  <section id="join" class="section">
    <h2>احجز</h2>
    <p>كلّمنا وهنرد في نفس اليوم.</p>
    <div class="social">
      <a href="#">📞</a>
      <a href="#">💬</a>
      <a href="#">📍</a>
    </div>
  </section>
</main>
<footer class="footer"><p class="small">بيت الخط، ورشة متخيلة للتجربة.</p></footer>
<script>
// custom cursor follows the mouse
const cursor = document.querySelector(".cursor");
addEventListener("mousemove", e => { cursor.style.translate = (e.clientX - 14) + "px " + (e.clientY - 14) + "px"; });

// phone menu: opens and closes, nothing else
const drawer = document.getElementById("drawer");
document.querySelector(".menu-btn").addEventListener("click", () => drawer.classList.add("open"));
document.querySelector(".drawer-close").addEventListener("click", () => drawer.classList.remove("open"));

// accordion: click on the question
document.querySelectorAll(".acc-q").forEach(q => q.addEventListener("click", () => q.parentElement.classList.toggle("open")));
</script>
</body>
</html>
~~~

**هتشوف إيه:** النسختين قريبين جدًا في الشكل: هيدر، وهيرو «اتعلّم الرقعة والنسخ»، وشريط أسود بأسامي الشركا بيتحرك، و ٣ كروت، وأسئلة، ولينكات تواصل. الفرق: في «بعد» الكلام الصغير غامق ومقري، وفيه زرار «وقّف الحركة»، والأسئلة بتتفتح بالكيبورد، ولينكات التواصل فيها كلام جنب الـ emoji، والماوس العادي باين.

**أهم حاجة في المشروع: axe قال ٠ على الصفحة البايظة.** قبل وبعد، [[color-contrast]] طلعت [[inapplicable]] للصفحة كلها، مع إن الكلام الصغير تباينه 2.14. دوّرت ولقيت السبب بالترتيب ده:
1. صفحة صغيرة فيها [[<p style="color:#aaa">]] عربي: axe مسكها. يبقى المشكلة في حاجة في صفحتي.
2. شيلت أجزاء من الصفحة واحد واحد: لما الهيدر اتشال، axe رجع يقيس. وجوه الهيدر: لو اللوجو أو الـ nav اتشال، أو كلامهم بقى إنجليزي، axe بيقيس.
3. القاعدة اتشغّلت ومطلعتش غلط: [[matches]] رجّعت [[false]] للـ 69 عنصر. والسطر اللي بيرجّع [[false]] هو [[hasRealTextChildren]].
4. جواها [[isIconLigature]]: axe بيرسم الكلمة على canvas عشان يعرف خطوط الأيقونات. الحروف العربي المتوصلة بتتحسب ligature. وبعد ٣ مرات في نفس الخط، كل الكلام بالخط ده بيتعتبر أيقونات ويتساب.

الحل العملي: احسب التباين بنفسك ([[check.mjs]] بيعمله، ومشروع «أداة فحص بتاعتك» تحت أداة لده). وتشغيل axe على [[main]] لوحده مسك كارتين من ٣، فده مش حل كفاية.

**التصليحات بالترتيب اللي في الكود ([[style.css]] متعلّم عليه بالأرقام):**
- **١:** كل [[aria-label]] بالعربي، زي كلام الصفحة. قارئ الشاشة بينطق الكلام بلغة الصفحة، فـ «Open menu» بالنطق العربي بتطلع حاجة غريبة.
- **٢:** زرار [[aria-pressed]] بيوقّف الحركة، وكمان [[:hover]] و [[:focus-within]]. والنسخة التانية من الأسامي (عشان اللفة متقطعش) [[aria-hidden]]، فالقارئ مبيقراش كل اسم مرتين.
- **٣:** شيلت [[cursor: none]]. الدايرة فضلت زينة بس، والمؤشر الحقيقي باين، ومع اللمس الدايرة مش موجودة.
- **٤:** الكلام الصغير بقى 0.875rem و [[#57534e]].
- **٥:** السؤال بقى [[<button aria-expanded aria-controls>]] جوه [[<h3>]]. ده نمط accordion في APG: العنوان بيفضل عنوان، والزرار بيقول مفتوح ولا مقفول.
- **٦:** المنيو بقت [[<dialog>]] بـ [[showModal()]]. المتصفح بيحبس الـ Tab جواها، و Escape بيقفلها، والـ focus بيرجع لزرار ☰.
- **٧:** [[@media (prefers-reduced-motion: reduce)]]: مفيش حركة، والأسامي بقت صف عادي، والـ scroll مبقاش smooth.
- **٨:** كل لينك فيه كلام، والـ emoji [[aria-hidden]] للزينة.

~~~text node check.mjs (Chrome 157، axe-core 4.14.0)
=== before.html
axe الصفحة كلها: 0 violations (color-contrast 0) | axe على main بس: color-contrast:2
1. aria-labels: Main menu | Open menu | Close | Partners
2. marquee: زرار وقوف مش موجود | الحركة بعد الضغط: running
3. cursor على body و .btn: none و none
4. .small: 10px، تباين 2.14
5. accordion: مش بيتوصل بـ Tab
6. المنيو: جوه ← جوه ← جوه ← جوه ← برّه:احجز مكانك ← برّه:📞 | بعد Escape الـ focus على: A
7. reduce: animation-name=slide | scroll-behavior=smooth
8. اللينكات:
- link "📞"
- link "💬"
- link "📍"

=== index.html
axe الصفحة كلها: 0 violations (color-contrast 0) | axe على main بس:
1. aria-labels: القايمة الرئيسية | افتح القايمة | القايمة | القايمة على الموبايل | اقفل القايمة
2. marquee: زرار وقوف موجود | الحركة بعد الضغط: paused
3. cursor على body و .btn: auto و pointer
4. .small: 14px، تباين 7.63
5. accordion: Enter: aria-expanded=true والإجابة hidden=false | aria-controls=a1
6. المنيو: جوه ← جوه ← جوه ← المتصفح ← جوه ← جوه | بعد Escape الـ focus على: menu-btn
7. reduce: animation-name=none | scroll-behavior=auto
8. اللينكات:
- link "اتصل بينا"
- link "واتساب"
- link "العنوان على الخريطة"

السبب في axe (axe.commons.text.isIconLigature على كل نص بالترتيب):
ICON بيت الخط: ورشة خط عربي   ICON بيت الخط   ICON الكورسات   ICON أسئلة   ICON احجز …
الـ validator: مفيش رسايل على الصفحتين   CSS validator: No Error Found (الملفين)
~~~

**«المتصفح» في السطر ٦ مش غلط:** في المنيو المصلّحة، الـ Tab بعد آخر عنصر راح لشريط المتصفح ([[document.activeElement === document.body]]) ورجع جوه. الـ modal بيمنع الصفحة اللي وراه بس، مش المتصفح نفسه. في القديمة الـ Tab الخامس راح لـ «احجز مكانك»، يعني لينك ورا المنيو والمستخدم مش شايفه.

**اللقطات:** [[check.mjs]] بيحفظ لقطة كاملة لكل نسخة في [[shots/]]، وهي اللي في التقرير. قارئ الشاشة نفسه ماتجرّبش: الأسامي من شجرة الـ accessibility.` },
        { lvl: 'متوسط', dir: "a11y-tests", t: R`اختبارات a11y لأربع مكوّنات`, what: R`Vitest و Testing Library و axe-core لأربع مكوّنات: زرار أيقونة، و Dialog، و Tabs، وفورم تسجيل. كل اختبار بيجيب العناصر بـ [[getByRole]] بالاسم، ويتأكد من الـ focus بعد الفتح والقفل، و [[aria-expanded]] أو [[aria-selected]]، ومفيش violations. ومعاهم jsx-a11y في الـ lint. بيجمع درس jsx-a11y و getByRole مع aria من الوحدة اللي فاتت.`, done: R`كل الاختبارات خضرا، ولو شلت label أو [[aria-expanded]] أو رجّعت الـ focus غلط بيقع اختبار واحد على الأقل برسالة مفهومة، و [[npx eslint .]] صفر errors.`, sol: R`~~~json package.json
{
  "name": "a11y-tests",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "19.1.10",
    "react-dom": "19.1.10"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "7.0.1",
    "@testing-library/react": "16.3.3",
    "@testing-library/user-event": "14.6.8",
    "@vitejs/plugin-react": "6.2.1",
    "axe-core": "4.14.0",
    "eslint": "9.39.5",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "globals": "17.14.0",
    "jsdom": "30.1.3",
    "vite": "8.3.6",
    "vitest": "5.1.0"
  }
}
~~~

**ليه eslint 9 مش 10:** [[eslint-plugin-jsx-a11y@6.10.2]] (آخر نسخة) بيقبل لحد [[eslint ^9]] بس. [[npm]] بيطلّع تحذير إن 9 بقت «no longer supported»، وده مقبول لحد ما الـ plugin يدعم 10.

~~~js vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setup.js"],
  },
});
~~~

~~~js eslint.config.js
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default [
  { ignores: ["dist/"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
  },
  jsxA11y.flatConfigs.recommended,
];
~~~

~~~js src/setup.js
import "@testing-library/jest-dom/vitest";
import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import axe from "axe-core";

afterEach(cleanup);

// jsdom has no <dialog> methods: just enough to flip "open" and fire "close" like the browser does.
// The real browser also traps focus; that part can only be tested in a browser (Playwright).
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () {
    if (!this.open) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

// expect(container).toHaveNoA11yViolations(): runs axe and, on failure, names each rule and its first elements
expect.extend({
  async toHaveNoA11yViolations(container) {
    const { violations } = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },   // jsdom doesn't draw anything: contrast needs a real browser
        region: { enabled: false },             // a component alone isn't a whole page with landmarks
      },
    });
    return {
      pass: violations.length === 0,
      message: () => "axe لقى مشاكل:\n" + violations.map(v => "- " + v.id + ": " + v.help + "\n    " + v.nodes.slice(0, 3).map(n => n.target.join(" ")).join("\n    ")).join("\n"),
    };
  },
});
~~~

~~~jsx src/IconButton.jsx
// a button that shows only an icon: the name comes from label, the icon is hidden from screen readers
export function IconButton({ label, icon, expanded, controls, pressed, onClick }) {
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      aria-pressed={pressed}
      onClick={onClick}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}
~~~

~~~jsx src/IconButton.test.jsx
import { useState } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "./IconButton.jsx";

// a tiny menu that uses the button, the way a real header would
function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton label="القايمة" icon="☰" expanded={open} controls="nav" onClick={() => setOpen(!open)} />
      <nav id="nav" aria-label="الأقسام" hidden={!open}><a href="#a">الكورسات</a></nav>
    </>
  );
}

describe("IconButton", () => {
  it("has a name even though it shows only an icon", () => {
    render(<IconButton label="المفضّلة" icon="♥" pressed={false} />);
    expect(screen.getByRole("button", { name: "المفضّلة" })).toHaveAttribute("aria-pressed", "false");
  });

  it("opens and closes the menu, and says so with aria-expanded", async () => {
    const user = userEvent.setup();
    const { container } = render(<Menu />);
    const btn = screen.getByRole("button", { name: "القايمة" });

    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();   // hidden = not in the accessibility tree

    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "الأقسام" })).toBeVisible();
    await expect(container).toHaveNoA11yViolations();

    await user.keyboard("{Enter}");        // the keyboard closes it too (focus is still on the button)
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });
});
~~~

~~~jsx src/Dialog.jsx
import { useEffect, useRef } from "react";

// a modal on top of the native <dialog>: the browser traps Tab and closes on Escape;
// we put focus on the first field when it opens, and back on the button that opened it when it closes
export function Dialog({ open, onClose, title, children }) {
  const ref = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
      dialog.querySelector("input, select, textarea, button")?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      onClose={() => { onClose(); opener.current?.focus(); }}
      onKeyDown={e => { if (e.key === "Escape") { e.preventDefault(); ref.current.close(); } }}
    >
      <h2 id="dialog-title">{title}</h2>
      {children}
      <button type="button" onClick={() => ref.current.close()}>اقفل</button>
    </dialog>
  );
}
~~~

~~~jsx src/Dialog.test.jsx
import { useState } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "./Dialog.jsx";

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <h1>الإعدادات</h1>
      <button type="button" onClick={() => setOpen(true)}>غيّر الاسم</button>
      <Dialog open={open} onClose={() => setOpen(false)} title="الاسم الجديد">
        <label htmlFor="new-name">الاسم</label>
        <input id="new-name" />
      </Dialog>
    </main>
  );
}

describe("Dialog", () => {
  it("puts focus inside when it opens, and back on the button when Escape closes it", async () => {
    const user = userEvent.setup();
    const { container } = render(<Page />);
    const opener = screen.getByRole("button", { name: "غيّر الاسم" });

    await user.click(opener);
    const dialog = screen.getByRole("dialog", { name: "الاسم الجديد" });
    expect(dialog).toHaveAttribute("open");
    expect(screen.getByRole("textbox", { name: "الاسم" })).toHaveFocus();
    await expect(container).toHaveNoA11yViolations();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it("does the same with the close button", async () => {
    const user = userEvent.setup();
    render(<Page />);
    await user.click(screen.getByRole("button", { name: "غيّر الاسم" }));
    await user.click(screen.getByRole("button", { name: "اقفل" }));
    expect(screen.getByRole("button", { name: "غيّر الاسم" })).toHaveFocus();
  });
});
~~~

~~~jsx src/Tabs.jsx
import { useId, useRef, useState } from "react";

// the APG Tabs pattern: one tab stop (roving tabindex), arrows move between tabs.
// In RTL the next tab is on the left, so ArrowLeft goes forward.
export function Tabs({ label, tabs }) {
  const [current, setCurrent] = useState(0);
  const refs = useRef([]);
  const id = useId();

  function onKeyDown(e) {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl" || e.currentTarget.closest("[dir]")?.dir === "rtl";
    const next = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1 }[e.key];
    let to = null;
    if (next) to = (current + next + tabs.length) % tabs.length;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = tabs.length - 1;
    if (to === null) return;
    e.preventDefault();
    setCurrent(to);
    refs.current[to].focus();
  }

  return (
    <div className="tabs">
      <div role="tablist" aria-label={label}>
        {tabs.map((t, i) => (
          <button
            key={t.title}
            ref={el => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={id + "-tab-" + i}
            aria-selected={i === current}
            aria-controls={id + "-panel-" + i}
            tabIndex={i === current ? 0 : -1}
            onClick={() => setCurrent(i)}
            onKeyDown={onKeyDown}
          >
            {t.title}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.title} role="tabpanel" id={id + "-panel-" + i} aria-labelledby={id + "-tab-" + i} hidden={i !== current} tabIndex={0}>
          {t.body}
        </div>
      ))}
    </div>
  );
}
~~~

~~~jsx src/Tabs.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs.jsx";

const tabs = [
  { title: "المواعيد", body: "كل سبت من ٦ لـ ٨." },
  { title: "الأسعار", body: "١٢٠٠ ج للكورس." },
  { title: "المكان", body: "وسط البلد." },
];

describe("Tabs", () => {
  it("one tab is selected and its panel is the only one shown", async () => {
    const { container } = render(<div dir="rtl"><Tabs label="تفاصيل الكورس" tabs={tabs} /></div>);
    expect(screen.getByRole("tablist", { name: "تفاصيل الكورس" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "المواعيد" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "المواعيد" })).toHaveTextContent("كل سبت");
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);    // hidden panels are out of the tree
    await expect(container).toHaveNoA11yViolations();
  });

  it("one Tab stop, then arrows move (ArrowLeft = next in RTL), Home and End", async () => {
    const user = userEvent.setup();
    render(<div dir="rtl"><button>قبل</button><Tabs label="تفاصيل الكورس" tabs={tabs} /></div>);

    await user.click(screen.getByRole("button", { name: "قبل" }));
    await user.tab();
    expect(screen.getByRole("tab", { name: "المواعيد" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    const prices = screen.getByRole("tab", { name: "الأسعار" });
    expect(prices).toHaveFocus();
    expect(prices).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "الأسعار" })).toHaveTextContent("١٢٠٠");

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "المكان" })).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "المواعيد" })).toHaveFocus();

    await user.tab();                       // Tab leaves the tab list and lands on the panel
    expect(screen.getByRole("tabpanel", { name: "المواعيد" })).toHaveFocus();
  });
});
~~~

~~~jsx src/SignupForm.jsx
import { useRef, useState } from "react";

const rules = {
  name: v => (v.trim() ? "" : "اكتب اسمك."),
  email: v => (!v ? "اكتب الإيميل." : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? "" : "الإيميل شكله غلط، مثلًا sara@example.com."),
  password: v => (v.length >= 8 ? "" : "الباسورد ٨ حروف على الأقل."),
};

// each field: a <label>, a hint and an error tied with aria-describedby, aria-invalid when wrong,
// and on submit the focus goes to the first wrong field
export function SignupForm({ onSubmit }) {
  const [errors, setErrors] = useState({});
  const form = useRef(null);

  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form.current));
    const found = Object.fromEntries(Object.entries(rules).map(([k, rule]) => [k, rule(data[k] ?? "")]));
    setErrors(found);
    const first = Object.keys(rules).find(k => found[k]);
    if (first) form.current.elements[first].focus();
    else onSubmit(data);
  }

  const field = (name, label, props, hint) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={[hint && name + "-hint", errors[name] && name + "-err"].filter(Boolean).join(" ") || undefined}
        {...props}
      />
      {hint && <p id={name + "-hint"} className="hint">{hint}</p>}
      {errors[name] && <p id={name + "-err"} className="err">{errors[name]}</p>}
    </div>
  );

  return (
    <form ref={form} noValidate onSubmit={submit} aria-labelledby="signup-t">
      <h2 id="signup-t">حساب جديد</h2>
      {field("name", "الاسم", { autoComplete: "name" })}
      {field("email", "الإيميل", { type: "email", autoComplete: "email", dir: "ltr" })}
      {field("password", "الباسورد", { type: "password", autoComplete: "new-password", dir: "ltr" }, "٨ حروف على الأقل.")}
      <button type="submit">سجّل</button>
    </form>
  );
}
~~~

~~~jsx src/SignupForm.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm.jsx";

describe("SignupForm", () => {
  it("every field is found by its label, and the hint is read with the password", async () => {
    const { container } = render(<SignupForm onSubmit={() => {}} />);
    expect(screen.getByRole("form", { name: "حساب جديد" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "الاسم" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "الإيميل" })).toBeInTheDocument();
    expect(screen.getByLabelText("الباسورد")).toHaveAccessibleDescription("٨ حروف على الأقل.");
    await expect(container).toHaveNoA11yViolations();
  });

  it("a wrong submit: focus on the first wrong field, and its error is its description", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { container } = render(<SignupForm onSubmit={onSubmit} />);

    await user.type(screen.getByRole("textbox", { name: "الاسم" }), "سارة");
    await user.type(screen.getByRole("textbox", { name: "الإيميل" }), "sara@");
    await user.click(screen.getByRole("button", { name: "سجّل" }));

    const email = screen.getByRole("textbox", { name: "الإيميل" });
    expect(email).toHaveFocus();
    expect(email).toBeInvalid();
    expect(email).toHaveAccessibleDescription("الإيميل شكله غلط، مثلًا sara@example.com.");
    expect(screen.getByLabelText("الباسورد")).toHaveAccessibleDescription("٨ حروف على الأقل. الباسورد ٨ حروف على الأقل.");
    expect(onSubmit).not.toHaveBeenCalled();
    await expect(container).toHaveNoA11yViolations();
  });

  it("a right submit sends the data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SignupForm onSubmit={onSubmit} />);
    await user.type(screen.getByRole("textbox", { name: "الاسم" }), "سارة");
    await user.type(screen.getByRole("textbox", { name: "الإيميل" }), "sara@example.com");
    await user.type(screen.getByLabelText("الباسورد"), "12345678");
    await user.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalledWith({ name: "سارة", email: "sara@example.com", password: "12345678" });
  });
});
~~~

الشكل تحت اتعمل من نفس المكوّنات بـ [[renderToStaticMarkup]] ([[render-demo.jsx]] و [[src/demo.css]])، في الحالة اللي بتستاهل تتشاف: المنيو مفتوحة، والـ dialog ظاهر، والفورم بعد إرسال غلط.

~~~css src/demo.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; }
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr)); }
.box { padding: 1rem; background: #fff; border: 1px solid #cbd5e1; border-radius: 0.75rem; }
.box > h2 { color: #475569; font-size: 0.9rem; }
button { font: inherit; }
:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }

.icon-btn { display: inline-grid; place-items: center; min-width: 44px; min-height: 44px; border: 1px solid #94a3b8; border-radius: 0.5rem; background: #fff; color: inherit; font-size: 1.2rem; }
.icon-btn[aria-expanded="true"], .icon-btn[aria-pressed="true"] { background: #1e293b; color: #fff; }
.menu-nav a { display: inline-block; margin-block-start: 0.5rem; color: #1d4ed8; }

dialog { position: static; display: block; margin: 0; padding: 1rem; border: 1px solid #94a3b8; border-radius: 0.75rem; background: #fff; color: inherit; }
dialog h2 { margin-top: 0; }
dialog input, .field input { display: block; width: 100%; margin-block: 0.25rem 0.75rem; padding: 0.5rem 0.6rem; border: 1px solid #64748b; border-radius: 0.4rem; font: inherit; }
dialog button { padding: 0.4rem 1rem; border: 1px solid #64748b; border-radius: 0.4rem; background: #fff; }

[role="tablist"] { display: flex; gap: 0.25rem; border-block-end: 2px solid #cbd5e1; }
[role="tab"] { padding: 0.5rem 0.9rem; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; background: none; color: #475569; }
[role="tab"][aria-selected="true"] { border-color: #1d4ed8; color: #1e293b; font-weight: 700; }
[role="tabpanel"] { padding: 0.75rem 0.25rem; }

.field label { font-weight: 700; }
.field [aria-invalid="true"] { border: 2px solid #b91c1c; }
.hint { margin: -0.5rem 0 0.75rem; color: #475569; font-size: 0.875rem; }
.err { margin: -0.5rem 0 0.75rem; color: #b91c1c; font-weight: 700; font-size: 0.875rem; }
form > button { padding: 0.5rem 1.4rem; border: 0; border-radius: 999px; background: #1d4ed8; color: #fff; font-weight: 700; }
~~~

~~~view 860 1180 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مكوّنات ليها اختبارات a11y</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 1rem; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; }
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr)); }
.box { padding: 1rem; background: #fff; border: 1px solid #cbd5e1; border-radius: 0.75rem; }
.box > h2 { color: #475569; font-size: 0.9rem; }
button { font: inherit; }
:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }

.icon-btn { display: inline-grid; place-items: center; min-width: 44px; min-height: 44px; border: 1px solid #94a3b8; border-radius: 0.5rem; background: #fff; color: inherit; font-size: 1.2rem; }
.icon-btn[aria-expanded="true"], .icon-btn[aria-pressed="true"] { background: #1e293b; color: #fff; }
.menu-nav a { display: inline-block; margin-block-start: 0.5rem; color: #1d4ed8; }

dialog { position: static; display: block; margin: 0; padding: 1rem; border: 1px solid #94a3b8; border-radius: 0.75rem; background: #fff; color: inherit; }
dialog h2 { margin-top: 0; }
dialog input, .field input { display: block; width: 100%; margin-block: 0.25rem 0.75rem; padding: 0.5rem 0.6rem; border: 1px solid #64748b; border-radius: 0.4rem; font: inherit; }
dialog button { padding: 0.4rem 1rem; border: 1px solid #64748b; border-radius: 0.4rem; background: #fff; }

[role="tablist"] { display: flex; gap: 0.25rem; border-block-end: 2px solid #cbd5e1; }
[role="tab"] { padding: 0.5rem 0.9rem; border: 0; border-block-end: 3px solid transparent; margin-block-end: -2px; background: none; color: #475569; }
[role="tab"][aria-selected="true"] { border-color: #1d4ed8; color: #1e293b; font-weight: 700; }
[role="tabpanel"] { padding: 0.75rem 0.25rem; }

.field label { font-weight: 700; }
.field [aria-invalid="true"] { border: 2px solid #b91c1c; }
.hint { margin: -0.5rem 0 0.75rem; color: #475569; font-size: 0.875rem; }
.err { margin: -0.5rem 0 0.75rem; color: #b91c1c; font-weight: 700; font-size: 0.875rem; }
form > button { padding: 0.5rem 1.4rem; border: 0; border-radius: 999px; background: #1d4ed8; color: #fff; font-weight: 700; }
</style>
</head>
<body>
<main><h1>٤ مكوّنات ليها اختبارات a11y</h1><div class="grid"><section class="box" aria-labelledby="t1"><h2 id="t1">IconButton (القايمة مفتوحة)</h2><button type="button" class="icon-btn" aria-label="القايمة" aria-expanded="true" aria-controls="nav"><span aria-hidden="true">☰</span></button> <button type="button" class="icon-btn" aria-label="المفضّلة" aria-pressed="true"><span aria-hidden="true">♥</span></button><nav id="nav" class="menu-nav" aria-label="الأقسام"><a href="#a">الكورسات</a></nav></section><section class="box" aria-labelledby="t2"><h2 id="t2">Dialog (مفتوح)</h2><dialog open="" aria-labelledby="dialog-title"><h2 id="dialog-title">الاسم الجديد</h2><label for="new-name">الاسم</label><input id="new-name" value="سارة"/><button type="button">اقفل</button></dialog></section><section class="box" aria-labelledby="t3"><h2 id="t3">Tabs</h2><div class="tabs"><div role="tablist" aria-label="تفاصيل الكورس"><button type="button" role="tab" id="«R2e»-tab-0" aria-selected="true" aria-controls="«R2e»-panel-0" tabindex="0">المواعيد</button><button type="button" role="tab" id="«R2e»-tab-1" aria-selected="false" aria-controls="«R2e»-panel-1" tabindex="-1">الأسعار</button><button type="button" role="tab" id="«R2e»-tab-2" aria-selected="false" aria-controls="«R2e»-panel-2" tabindex="-1">المكان</button></div><div role="tabpanel" id="«R2e»-panel-0" aria-labelledby="«R2e»-tab-0" tabindex="0">كل سبت من ٦ لـ ٨.</div><div role="tabpanel" id="«R2e»-panel-1" aria-labelledby="«R2e»-tab-1" hidden="" tabindex="0">١٢٠٠ ج للكورس.</div><div role="tabpanel" id="«R2e»-panel-2" aria-labelledby="«R2e»-tab-2" hidden="" tabindex="0">وسط البلد.</div></div></section><section class="box" aria-labelledby="t4"><h2 id="t4">SignupForm (بعد إرسال غلط)</h2><form noValidate="" aria-labelledby="signup-t"><h2 id="signup-t">حساب جديد</h2><div class="field"><label for="name">الاسم</label><input id="name" autoComplete="name" value="سارة"/></div><div class="field"><label for="email">الإيميل</label><input id="email" type="email" dir="ltr" aria-invalid="true" aria-describedby="email-err" autoComplete="email" value="sara@"/><p id="email-err" class="err">الإيميل شكله غلط، مثلًا sara@example.com.</p></div><div class="field"><label for="password">الباسورد</label><input id="password" type="password" dir="ltr" aria-invalid="true" aria-describedby="password-hint password-err" autoComplete="new-password"/><p id="password-hint" class="hint">٨ حروف على الأقل.</p><p id="password-err" class="err">الباسورد ٨ حروف على الأقل.</p></div><button type="submit">سجّل</button></form></section></div></main>
</body>
</html>
~~~

**هتشوف إيه:** ٤ كروت: زرارين أيقونة (☰ و ♥) غامقين لأنهم شغالين وتحتهم لينك المنيو، و dialog «الاسم الجديد»، و tabs «المواعيد / الأسعار / المكان»، وفورم «حساب جديد» فيه الإيميل والباسورد بحد أحمر ورسالة تحت كل واحد.

**كل اختبار بيجيب العناصر زي ما المستخدم بيشوفها:** [[getByRole("button", { name: "القايمة" })]] مش [[querySelector(".icon-btn")]]. لو الاسم اتشال، الاختبار مش هيلاقي الزرار. يعني الاختبار نفسه بيتأكد من الـ accessibility.

**[[toHaveNoA11yViolations]]:** matcher عملناه في [[setup.js]]. بيشغّل axe على المكوّن، ولو وقع بيطبع كل rule وأول عناصرها بدل «expected [] to equal [...]». قاعدتين مقفولين: [[color-contrast]] (jsdom مبيرسمش، فمفيش ألوان يقيسها) و [[region]] (مكوّن لوحده مش صفحة).

**[[toHaveAccessibleDescription]]:** بيتأكد إن رسالة الغلط **مربوطة** بالخانة ([[aria-describedby]])، مش بس ظاهرة جنبها. ده اللي قارئ الشاشة بيقراه مع الخانة.

**٣ مشاكل ظهرت وأنا ببنيه:**
- **jsdom مفيهوش [[showModal()]]:** «dl.showModal is not a function». الـ Dialog بيستخدم [[<dialog>]] الحقيقي، وفي [[setup.js]] fallback صغير بيقلب [[open]] بس. حبس الـ Tab الحقيقي جوه الـ modal **مبيتختبرش في jsdom**: ده محتاج متصفح (Playwright، زي بوابة الـ CI). ولذلك الـ Dialog بيحط الـ focus ويرجّعه بنفسه، والاختبار بيتأكد من ده.
- **jsx-a11y مسك Tabs:** «Elements with the 'tablist' interactive role must be focusable». كنت حاطط [[onKeyDown]] على الـ [[tablist]]. نقلته لكل [[tab]]، اللي هو العنصر اللي عليه الـ focus فعلًا.
- **الإيميل اتقلب في RTL:** اللقطة الأولى طلّعت «@sara» بدل «sara@». خانات الإيميل والباسورد محتاجة [[dir="ltr"]]. اللقطة كشفت حاجة الاختبارات مكانتش هتشوفها.

~~~text npx vitest run && npx eslint .
✓ src/IconButton.test.jsx (2 tests)
✓ src/Dialog.test.jsx (2 tests)
✓ src/Tabs.test.jsx (2 tests)
✓ src/SignupForm.test.jsx (3 tests)
 Test Files  4 passed (4)
      Tests  9 passed (9)
npx eslint .  →  (مفيش ولا سطر) exit 0
~~~

~~~text جرّبت أكسّر ٣ حاجات، كل واحدة لوحدها
١. <label> بقت <span> في SignupForm:
   × 3 اختبارات: Unable to find an accessible element with the role "textbox" and name "الاسم"
٢. شلت aria-expanded من IconButton:
   × opens and closes the menu…: expect(element).toHaveAttribute("aria-expanded", "false")
٣. شلت opener.current?.focus() من Dialog:
   × 2 اختبارات: expect(element).toHaveFocus() عند السطر 35 و 43
ورجعت كل حاجة: Tests 9 passed (9)

ولو axe لقى حاجة (اختبار تجربة فيه <img> من غير alt وزرار فيه svg بس):
Error: axe لقى مشاكل:
- button-name: Buttons must have discernible text
    button
- image-alt: Images must have alternative text
    img

و jsx-a11y على ملف فيه الأخطاء المشهورة:
  4:7   jsx-a11y/alt-text                       <img src="a.png" />
  5:7   jsx-a11y/click-events-have-key-events   <div onClick={save}>
  5:7   jsx-a11y/no-static-element-interactions
  6:7   jsx-a11y/anchor-is-valid                <a href="#" onClick={save}>
  7:14  jsx-a11y/no-autofocus                   <input autoFocus />
✖ 5 problems (5 errors, 0 warnings)

صفحة الشكل: axe على Chrome 0، الـ validator مفيش رسايل، CSS validator: No Error Found
~~~` },
        { lvl: 'كبير', dir: "a11y-gate", t: R`بوابة a11y في الـ CI`, what: R`workflow في GitHub Actions بيبني الموقع ويشغّل Playwright على كل الصفحات (من [[sitemap.xml]] أو لستة)، وفي كل صفحة: axe بقواعد WCAG 2.2 AA، واختبار كيبورد بيمشي بـ Tab ويحفظ ترتيب العناصر ويقارنه بـ snapshot، واختبار تغيير الصفحة (الـ title اتغير والـ focus على [[h1]]). النتايج بتطلع تقرير HTML كـ artifact، وفيه ملف استثناءات لكل واحد سبب وتاريخ انتهاء. بيجمع الوحدة كلها مع وحدة Accessibility.`, done: R`PR بيشيل [[alt]] من صورة بيقع والتقرير بيقول الصفحة والعنصر، وPR بيغيّر ترتيب الـ Tab بيقع على الـ snapshot، والاستثناء اللي تاريخه عدّى بيوقّع الـ CI لوحده، والـ workflow بيتشغّل تاني على نفس الـ commit بنفس النتيجة.`, ext: R`زوّد فحص بالثيم الغامق و [[prefers-reduced-motion]]، واطبع ملخص في تعليق على الـ PR (عدد المشاكل قبل وبعد)، وخلّيه يفحص الصفحات اللي اتغيرت بس عشان يبقى أسرع.`, sol: R`المثال: موقع صغير لاستوديو يوجا متخيل «نَفَس»: ٣ صفحات بـ hash router (‏[[#/classes]])، فاختبار تغيير الصفحة ليه معنى.

~~~text a11y-gate/
package.json  package-lock.json  playwright.config.js  serve.mjs
pages.json  a11y-exceptions.json
tests/a11y.spec.js  tests/__snapshots__/tab-home.txt  tab-classes.txt  tab-contact.txt
site/index.html  site/app.js  site/style.css  site/img/garden.svg
.github/workflows/a11y.yml
~~~

~~~json package.json
{
  "name": "a11y-gate",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "playwright test",
    "test:update": "playwright test --update-snapshots",
    "serve": "node serve.mjs site 4173"
  },
  "devDependencies": {
    "@axe-core/playwright": "4.14.0",
    "@playwright/test": "1.64.1"
  }
}
~~~

~~~js playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  // one snapshot for every OS: a Tab order is the same on Windows and on the Linux in CI (the default name ends in -win32 / -linux)
  snapshotPathTemplate: "{testDir}/__snapshots__/{arg}{ext}",
  fullyParallel: true,
  retries: 0,                       // an a11y failure is not "flaky": no retries hiding it
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4173",
    // in CI: the Chromium that $__btnpx playwright install$__bt downloads; on your machine: the Chrome you already have
    channel: process.env.CI ? undefined : "chrome",
  },
  webServer: {
    command: "node serve.mjs site 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
});
~~~

~~~js serve.mjs
// node serve.mjs [dir] [port]: a static server with no packages, for Playwright's webServer
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] || "site");
const port = Number(process.argv[3] || 4173);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".json": "application/json" };

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }      // no ../ out of the folder
  if (file.endsWith(path.sep)) file = path.join(file, "index.html");
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(port, () => console.log("http://localhost:" + port));
~~~

~~~json pages.json
[
  { "name": "home", "path": "/#/" },
  { "name": "classes", "path": "/#/classes" },
  { "name": "contact", "path": "/#/contact" }
]
~~~

~~~json a11y-exceptions.json
[
  {
    "rule": "landmark-unique",
    "page": "contact",
    "reason": "مثال: مشكلة معروفة متسجلة في تذكرة A11Y-12، والتصليح في الـ sprint الجاي",
    "until": "2026-12-31"
  }
]
~~~

~~~js tests/a11y.spec.js
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const pages = JSON.parse(fs.readFileSync("pages.json", "utf8"));
const exceptions = JSON.parse(fs.readFileSync("a11y-exceptions.json", "utf8"));
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const today = new Date().toISOString().slice(0, 10);

// 0. an exception is a debt with a date: once the date passes, the build fails until someone fixes it or renews it on purpose
test("كل استثناء ليه سبب وتاريخه لسه ماعدّاش", () => {
  for (const e of exceptions) {
    expect(e.reason, "استثناء " + e.rule + " من غير سبب").toBeTruthy();
    expect(e.until >= today, "الاستثناء " + e.rule + " على " + e.page + " انتهى في " + e.until + " (" + e.reason + ")").toBe(true);
  }
});

// WCAG contrast of every text element, computed from the real colors (axe skips Arabic text it takes for icon ligatures)
async function lowContrast(page) {
  return page.evaluate(() => {
    const rgb = s => s.match(/[\d.]+/g).map(Number);
    const lum = ([r, g, b]) => [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
    const bg = el => { for (; el; el = el.parentElement) { const c = rgb(getComputedStyle(el).backgroundColor); if (c.length < 4 || c[3] === 1) return c.slice(0, 3); } return [255, 255, 255]; };
    const bad = [];
    for (const el of document.querySelectorAll("body *")) {
      const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      if (!own || r.width === 0 || cs.visibility === "hidden" || r.bottom < 0) continue;   // offscreen skip link: skipped
      const [a, b] = [lum(rgb(cs.color)), lum(bg(el))].sort((x, y) => y - x);
      const ratio = (a + 0.05) / (b + 0.05);
      const large = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && Number(cs.fontWeight) >= 700);
      if (ratio < (large ? 3 : 4.5)) bad.push(el.tagName.toLowerCase() + ' "' + el.textContent.trim().slice(0, 20) + '" ' + ratio.toFixed(2));
    }
    return bad;
  });
}

// every page reached by keyboard: the order of the stops, written as "role name"
async function tabOrder(page) {
  const stops = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => {
      const el = document.activeElement;
      if (el === document.body) return null;
      const role = el.getAttribute("role") || { A: "link", BUTTON: "button", INPUT: "textbox" }[el.tagName] || el.tagName.toLowerCase();
      const name = (el.getAttribute("aria-label") || el.labels?.[0]?.textContent || el.textContent).trim().replace(/\s+/g, " ");
      return role + " " + name;
    });
    if (!stop || stops[0] === stop) break;          // left the page, or came round to the start
    stops.push(stop);
  }
  return stops;
}

for (const p of pages) {
  test.describe(p.name, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator("main h1")).toBeVisible();
    });

    test("axe: WCAG 2.2 AA", async ({ page }, testInfo) => {
      const skip = exceptions.filter(e => e.page === p.name).map(e => e.rule);
      const results = await new AxeBuilder({ page }).withTags(TAGS).disableRules(skip).analyze();
      await testInfo.attach("axe-" + p.name + ".json", { body: JSON.stringify(results.violations, null, 2), contentType: "application/json" });
      const list = results.violations.map(v => v.id + " (" + v.impact + "): " + v.nodes.map(n => n.target.join(" ")).join(" , "));
      expect(list, "صفحة " + p.name).toEqual([]);
    });

    test("التباين محسوب بإيدينا", async ({ page }) => {
      expect(await lowContrast(page), "صفحة " + p.name).toEqual([]);
    });

    test("ترتيب الـ Tab", async ({ page }) => {
      expect((await tabOrder(page)).join("\n") + "\n").toMatchSnapshot("tab-" + p.name + ".txt");
    });
  });
}

test("تغيير الصفحة: الـ title بيتغير والـ focus على h1", async ({ page }) => {
  await page.goto("/#/");
  await page.getByRole("link", { name: "الحصص" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveTitle("الحصص: نَفَس");
  await expect(page.locator("main h1")).toBeFocused();
  await expect(page.getByRole("link", { name: "الحصص" })).toHaveAttribute("aria-current", "page");
});
~~~

~~~yaml .github/workflows/a11y.yml
name: a11y

on:
  pull_request:
  push:
    branches: [main]

jobs:
  a11y:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      # if your site has a build step, it goes here: - run: npm run build
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
      - name: the HTML report, even when the tests fail
        if: $__{{ !cancelled() }}
        uses: actions/upload-artifact@v7
        with:
          name: a11y-report
          path: playwright-report/
          retention-days: 14
~~~

~~~html site/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نَفَس: يوجا في الجنينة</title>
<link rel="stylesheet" href="style.css">
<script src="app.js" defer></script>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header class="header">
  <a class="logo" href="#/">نَفَس</a>
  <nav aria-label="الأقسام">
    <ul>
      <li><a href="#/">الرئيسية</a></li>
      <li><a href="#/classes">الحصص</a></li>
      <li><a href="#/contact">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main"></main>

<template id="page-home" data-title="نَفَس: يوجا في الجنينة">
  <h1 tabindex="-1">يوجا الصبح في الجنينة</h1>
  <p class="lead">حصص صغيرة، ٨ أشخاص بالكتير، والمات علينا.</p>
  <img src="img/garden.svg" alt="ناس قاعدين على مات تحت شجرة" width="480" height="240">
  <p><a class="btn" href="#/classes">شوف المواعيد</a></p>
</template>

<template id="page-classes" data-title="الحصص: نَفَس">
  <h1 tabindex="-1">الحصص</h1>
  <ul class="cards">
    <li class="card"><h2>مبتدئين</h2><p class="muted">السبت ٧ الصبح، ١٥٠ ج</p></li>
    <li class="card"><h2>تنفّس وتأمل</h2><p class="muted">التلات ٧ الصبح، ١٢٠ ج</p></li>
    <li class="card"><h2>متوسط</h2><p class="muted">الخميس ٨ الصبح، ١٨٠ ج</p></li>
  </ul>
</template>

<template id="page-contact" data-title="تواصل: نَفَس">
  <h1 tabindex="-1">تواصل</h1>
  <form class="form" novalidate>
    <label for="name">الاسم</label>
    <input id="name" name="name" autocomplete="name">
    <label for="phone">الموبايل</label>
    <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr">
    <button type="submit">ابعت</button>
  </form>
</template>
</body>
</html>
~~~

~~~js site/app.js
// a tiny hash router: #/classes shows <template id="page-classes">.
// After every change: a new <title>, and focus on the new <h1> so a screen reader reads where you are.
const main = document.getElementById("main");
let first = true;

function show() {
  const name = location.hash.replace(/^#\/?/, "") || "home";
  const tpl = document.getElementById("page-" + name) || document.getElementById("page-home");
  main.replaceChildren(tpl.content.cloneNode(true));
  document.title = tpl.dataset.title;
  document.querySelectorAll("nav a").forEach(a => {
    if (a.getAttribute("href") === "#/" + (name === "home" ? "" : name)) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (!first) main.querySelector("h1").focus();   // not on the first load: the page starts at the top as usual
  first = false;
}

addEventListener("hashchange", show);
show();
~~~

~~~css site/style.css
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #f7fee7; }
a { color: #3f6212; }
:focus-visible { outline: 3px solid #7c2d12; outline-offset: 2px; }
h1:focus { outline: none; }                    /* the heading gets focus from the router, not from the reader */
h1:focus-visible { outline: 3px solid #7c2d12; }
.skip { position: absolute; inset-inline-start: 1rem; top: -10rem; padding: 0.5rem 1rem; background: #1c1917; color: #fff; }
.skip:focus { top: 1rem; }
.header { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1.5rem; padding: 0.75rem 1rem; background: #fff; border-block-end: 1px solid #a3a3a3; }
.logo { font-weight: 800; font-size: 1.2rem; color: #1c1917; text-decoration: none; }
nav ul { display: flex; gap: 1rem; margin: 0; padding: 0; list-style: none; }
nav [aria-current="page"] { font-weight: 700; text-decoration-thickness: 3px; }
main { max-width: 44rem; margin: 0 auto; padding: 2rem 1rem; }
img { max-width: 100%; height: auto; border-radius: 1rem; }
.lead { font-size: 1.15rem; }
.btn { display: inline-block; padding: 0.6rem 1.3rem; border-radius: 999px; background: #3f6212; color: #fff; text-decoration: none; font-weight: 700; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1rem; background: #fff; border: 1px solid #a3a3a3; border-radius: 0.75rem; }
.card h2 { margin: 0; font-size: 1.1rem; }
.muted { margin: 0; color: #57534e; }
.form { display: grid; gap: 0.3rem; max-width: 22rem; }
.form input { margin-block-end: 0.7rem; padding: 0.5rem 0.6rem; border: 1px solid #78716c; border-radius: 0.4rem; font: inherit; }
.form button { justify-self: start; padding: 0.5rem 1.4rem; border: 0; border-radius: 999px; background: #3f6212; color: #fff; font: inherit; font-weight: 700; }
~~~

~~~view 600 560 الموقع اللي البوابة بتفحصه
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>نَفَس: يوجا في الجنينة</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #1c1917; background: #f7fee7; }
a { color: #3f6212; }
:focus-visible { outline: 3px solid #7c2d12; outline-offset: 2px; }
h1:focus { outline: none; }                    /* the heading gets focus from the router, not from the reader */
h1:focus-visible { outline: 3px solid #7c2d12; }
.skip { position: absolute; inset-inline-start: 1rem; top: -10rem; padding: 0.5rem 1rem; background: #1c1917; color: #fff; }
.skip:focus { top: 1rem; }
.header { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1.5rem; padding: 0.75rem 1rem; background: #fff; border-block-end: 1px solid #a3a3a3; }
.logo { font-weight: 800; font-size: 1.2rem; color: #1c1917; text-decoration: none; }
nav ul { display: flex; gap: 1rem; margin: 0; padding: 0; list-style: none; }
nav [aria-current="page"] { font-weight: 700; text-decoration-thickness: 3px; }
main { max-width: 44rem; margin: 0 auto; padding: 2rem 1rem; }
img { max-width: 100%; height: auto; border-radius: 1rem; }
.lead { font-size: 1.15rem; }
.btn { display: inline-block; padding: 0.6rem 1.3rem; border-radius: 999px; background: #3f6212; color: #fff; text-decoration: none; font-weight: 700; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1rem; background: #fff; border: 1px solid #a3a3a3; border-radius: 0.75rem; }
.card h2 { margin: 0; font-size: 1.1rem; }
.muted { margin: 0; color: #57534e; }
.form { display: grid; gap: 0.3rem; max-width: 22rem; }
.form input { margin-block-end: 0.7rem; padding: 0.5rem 0.6rem; border: 1px solid #78716c; border-radius: 0.4rem; font: inherit; }
.form button { justify-self: start; padding: 0.5rem 1.4rem; border: 0; border-radius: 999px; background: #3f6212; color: #fff; font: inherit; font-weight: 700; }
</style>
</head>
<body>
<a class="skip" href="#main">اتخطى للمحتوى</a>
<header class="header">
  <a class="logo" href="#/">نَفَس</a>
  <nav aria-label="الأقسام">
    <ul>
      <li><a href="#/">الرئيسية</a></li>
      <li><a href="#/classes">الحصص</a></li>
      <li><a href="#/contact">تواصل</a></li>
    </ul>
  </nav>
</header>
<main id="main"></main>

<template id="page-home" data-title="نَفَس: يوجا في الجنينة">
  <h1 tabindex="-1">يوجا الصبح في الجنينة</h1>
  <p class="lead">حصص صغيرة، ٨ أشخاص بالكتير، والمات علينا.</p>
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0ODAgMjQwIj48cmVjdCB3aWR0aD0iNDgwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI2Q5Zjk5ZCIvPjxyZWN0IHk9IjE3MCIgd2lkdGg9IjQ4MCIgaGVpZ2h0PSI3MCIgZmlsbD0iIzY1YTMwZCIvPjxyZWN0IHg9IjMzMCIgeT0iNzAiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxMTAiIGZpbGw9IiM3ODM1MGYiLz48Y2lyY2xlIGN4PSIzNDAiIGN5PSI3MCIgcj0iNjAiIGZpbGw9IiM0ZDdjMGYiLz48cmVjdCB4PSI2MCIgeT0iMTc1IiB3aWR0aD0iOTAiIGhlaWdodD0iMTIiIHJ4PSI2IiBmaWxsPSIjZmRlNjhhIi8+PHJlY3QgeD0iMTgwIiB5PSIxNzgiIHdpZHRoPSI5MCIgaGVpZ2h0PSIxMiIgcng9IjYiIGZpbGw9IiNmZWNhY2EiLz48Y2lyY2xlIGN4PSIxMDUiIGN5PSIxNDAiIHI9IjEyIiBmaWxsPSIjMWMxOTE3Ii8+PHBhdGggZD0iTTg1IDE3NSBsMjAgLTI1IGwyMCAyNSIgZmlsbD0iIzFjMTkxNyIvPjxjaXJjbGUgY3g9IjIyNSIgY3k9IjE0MyIgcj0iMTIiIGZpbGw9IiMxYzE5MTciLz48cGF0aCBkPSJNMjA1IDE3OCBsMjAgLTI1IGwyMCAyNSIgZmlsbD0iIzFjMTkxNyIvPjwvc3ZnPgo=" alt="ناس قاعدين على مات تحت شجرة" width="480" height="240">
  <p><a class="btn" href="#/classes">شوف المواعيد</a></p>
</template>

<template id="page-classes" data-title="الحصص: نَفَس">
  <h1 tabindex="-1">الحصص</h1>
  <ul class="cards">
    <li class="card"><h2>مبتدئين</h2><p class="muted">السبت ٧ الصبح، ١٥٠ ج</p></li>
    <li class="card"><h2>تنفّس وتأمل</h2><p class="muted">التلات ٧ الصبح، ١٢٠ ج</p></li>
    <li class="card"><h2>متوسط</h2><p class="muted">الخميس ٨ الصبح، ١٨٠ ج</p></li>
  </ul>
</template>

<template id="page-contact" data-title="تواصل: نَفَس">
  <h1 tabindex="-1">تواصل</h1>
  <form class="form" novalidate>
    <label for="name">الاسم</label>
    <input id="name" name="name" autocomplete="name">
    <label for="phone">الموبايل</label>
    <input id="phone" name="phone" type="tel" autocomplete="tel" dir="ltr">
    <button type="submit">ابعت</button>
  </form>
</template>
<script>
// a tiny hash router: #/classes shows <template id="page-classes">.
// After every change: a new <title>, and focus on the new <h1> so a screen reader reads where you are.
const main = document.getElementById("main");
let first = true;

function show() {
  const name = location.hash.replace(/^#\/?/, "") || "home";
  const tpl = document.getElementById("page-" + name) || document.getElementById("page-home");
  main.replaceChildren(tpl.content.cloneNode(true));
  document.title = tpl.dataset.title;
  document.querySelectorAll("nav a").forEach(a => {
    if (a.getAttribute("href") === "#/" + (name === "home" ? "" : name)) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  if (!first) main.querySelector("h1").focus();   // not on the first load: the page starts at the top as usual
  first = false;
}

addEventListener("hashchange", show);
show();
</script>
</body>
</html>
~~~

**هتشوف إيه:** موقع أخضر فاتح: هيدر «نَفَس» و ٣ لينكات، وعنوان «يوجا الصبح في الجنينة» ورسمة جنينة وزرار «شوف المواعيد». «الحصص» بيعرض ٣ كروت، و «تواصل» فورم. الأهم مش الموقع: [[npx playwright test]] بيطلع ١١ اختبار، وتقرير HTML في [[playwright-report/]].

**الـ ١١ اختبار:** لكل صفحة من الـ ٣: axe، والتباين محسوب بإيدينا، وترتيب الـ Tab. وكمان اختبار الاستثناءات، واختبار تغيير الصفحة.

**ليه فيه اختبار تباين غير axe:** على الصفحات العربي axe ممكن ميقيسش التباين خالص (مشروع «مراجعة landing» فوق شرح السبب). واتجرّب هنا: لما الكلام الهادي بقى [[#a8a29e]]، axe **عدّاه**، واختبارنا وقّع.

**ترتيب الـ Tab كـ snapshot:** أول تشغيل بيكتب [[tests/__snapshots__/tab-home.txt]] ويقع. ده الطبيعي: راجع الملف بعينك، واعمله commit. بعد كده أي تغيير في الترتيب يوقّع الـ PR. ولو التغيير مقصود: [[npm run test:update]] وتعمل commit للملف الجديد، فالـ review بيشوف الترتيب الجديد.

**الاستثناءات بتاريخ:** كل استثناء بيقفل rule على صفحة، ولازم يبقى ليه [[reason]] و [[until]]. أول ما التاريخ يعدّي، الاختبار الأول بيوقع برسالة فيها السبب. فالاستثناء ميبقاش دايم ومحدش فاكر ليه اتعمل.

**غلطتين حصلوا وأنا ببنيه:**
- **الـ snapshot اسمه فيه الـ OS:** Playwright كتب [[tab-home-win32.txt]]. على GitHub (Linux) كان هيدوّر على [[tab-home-linux.txt]] ومش هيلاقيه، فالـ CI يقع على طول. [[snapshotPathTemplate]] من غير [[{platform}]] بيخلّي ملف واحد للكل، وده صح هنا لأن ترتيب الـ Tab مش بيفرق بين نظام ونظام. (لقطات الشاشة **بتفرق**، فسيبهم بالـ OS.)
- **[[retries: 0]]:** لو الـ CI بيعيد الاختبار اللي وقع، مشكلة a11y ممكن تعدّي في المحاولة التانية لو فيها توقيت. ومشكلة a11y مش «flaky».

**[[channel]]:** على جهازك Chrome اللي عندك، وفي الـ CI ([[process.env.CI]] بيبقى موجود لوحده في GitHub Actions) الـ Chromium اللي [[npx playwright install]] بينزّله.

~~~text npx playwright test (Windows، Chrome 157، ٣ مرات ورا بعض)
أول مرة: 3 failed (A snapshot doesn't exist … writing actual.)  8 passed
التانية: 11 passed (5.0s)
التالتة: 11 passed (13.6s)

tests/__snapshots__/tab-home.txt:
link اتخطى للمحتوى
link نَفَس
link الرئيسية
link الحصص
link تواصل
link شوف المواعيد
~~~

~~~text الـ ٤ حالات من الـ done، كل واحدة لوحدها
١. شلت alt من صورة الرئيسية:
  x  home › axe: WCAG 2.2 AA
    Error: صفحة home
    + Array [
    +   "image-alt (critical): img",
    + ]

٢. tabindex="1" على «تواصل»:
  x  home › ترتيب الـ Tab  (و classes و contact كمان)
    Error: expect(string).toMatchSnapshot(expected) failed
      +link تواصل
       link اتخطى للمحتوى
       link نَفَس
       link الرئيسية
       link الحصص
      -link تواصل
       link شوف المواعيد

٣. until بقى "2026-11-01":
  x  كل استثناء ليه سبب وتاريخه لسه ماعدّاش
    Error: الاستثناء landmark-unique على contact انتهى في 2026-11-01 (مثال: مشكلة معروفة متسجلة في تذكرة A11Y-12، والتصليح في الـ sprint الجاي)

٤. .muted بقى #a8a29e:
  ok classes › axe: WCAG 2.2 AA           ← axe عدّاه
  x  classes › التباين محسوب بإيدينا
    + Array [
    +   "p \"السبت ٧ الصبح، ١٥٠ ج\" 2.52",
    +   "p \"التلات ٧ الصبح، ١٢٠ \" 2.52",
    +   "p \"الخميس ٨ الصبح، ١٨٠ \" 2.52",
    + ]

بعد ما رجّعت كل حاجة: 11 passed
الـ validator: مفيش رسايل   CSS validator: No Error Found
~~~

**اللي ماتجرّبش:** الـ workflow نفسه ماتشغّلش على GitHub. اللي اتعمل: نفس الأوامر اتشغّلت على Windows، والـ YAML اتقرا بـ [[js-yaml]] صح (الخطوات بالترتيب)، والـ actions بآخر نسخ ([[checkout@v7]] و [[setup-node@v7]] و [[upload-artifact@v7]]). [[npm ci]] محتاج [[package-lock.json]]: اعمله مرة بـ [[npm install]] واعمله commit. والـ ext (الثيم الغامق، وتعليق على الـ PR، والصفحات اللي اتغيرت بس) ماتعملش هنا.` },
        { lvl: 'فكرة', dir: "contrast-tool", t: R`أداة فحص بتاعتك`, what: R`فكّر في حاجة بتفحصها بإيدك كل مرة ومحدش بيعملها أوتوماتيك: أهداف أصغر من 24×24، أو عناصر بتستخبى تحت الهيدر الـ sticky، أو عناوين بتتنط مستوى، أو صور alt بتاعها اسم ملف. اعملها bookmarklet أو extension صغيرة أو rule زيادة لـ axe.`, done: R`الأداة بتلاقي المشكلة دي على ٣ مواقع حقيقية مختلفة، ومبتطلّعش إنذار غلط على صفحة سليمة اختبرتها بإيدك.`, ext: R`انشرها على GitHub بـ README فيه مثال، أو ابعتها كـ custom rule لـ axe في مشروعك.`, sol: R`**الفكرة اللي اخترتها:** حاجة لقيت نفسي بعملها بإيدي في كل مشروع عربي في الوحدة دي: **حساب التباين**. axe بيعتبر الحروف العربي المتوصلة أيقونات، وبعد ٣ مرات بيسيب الخط كله (مشروع «مراجعة landing» شرح ده). فعملت bookmarklet اسمه «تباين بجد» بيقيس كل كلام في الصفحة.

~~~js contrast-check.js
// «تباين بجد»: measures WCAG contrast for every piece of text on the page, Arabic included.
// Why: axe takes joined Arabic letters for icon-font ligatures and then skips the whole font,
// so color-contrast can say 0 on a page full of pale Arabic text.
// Red tag = fails, yellow "؟" = text over an image or gradient (check it by eye), nothing = passes.
(() => {
  document.getElementById("cc-layer")?.remove();               // a second click starts over

  const parse = s => (s.match(/[\d.]+/g) || []).map(Number);    // "rgb(1, 2, 3)" or "rgba(1, 2, 3, 0.5)"
  const lin = v => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const mix = (top, a, under) => top.map((c, i) => c * a + under[i] * (1 - a));   // a see-through color over another

  // the color behind an element: walk up, blending semi-transparent backgrounds, until something solid
  function behind(el) {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage !== "none") return { image: true };
      const c = parse(cs.backgroundColor), a = c.length === 4 ? c[3] : 1;
      if (a > 0) layers.push([c.slice(0, 3), a]);
      if (a === 1) break;
    }
    let color = [255, 255, 255];                                 // the canvas is white when nothing is solid
    for (const [c, a] of layers.reverse()) color = mix(c, a, color);
    return { color };
  }

  const rows = [];
  for (const el of document.body.querySelectorAll("*")) {
    if (el.closest("#cc-layer, script, style, noscript, template")) continue;
    const text = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join("").trim();
    if (!text) continue;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || cs.visibility === "hidden" || Number(cs.opacity) === 0) continue;
    if (el.closest('[aria-hidden="true"]') && /^\W*$/.test(text)) continue;     // decorative symbols

    const size = parseFloat(cs.fontSize), bold = Number(cs.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);             // WCAG "large": 18pt, or 14pt bold
    const need = large ? 3 : 4.5;
    const bg = behind(el);
    const fgRaw = parse(cs.color), fgA = fgRaw.length === 4 ? fgRaw[3] : 1;
    let ratio = null;
    if (!bg.image) {
      const fg = mix(fgRaw.slice(0, 3), fgA, bg.color);
      const [hi, lo] = [lum(fg), lum(bg.color)].sort((a, b) => b - a);
      ratio = Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
    }
    const status = ratio === null ? "؟" : ratio < need ? "✗" : "✓";
    rows.push({ status, ratio, need, size: Math.round(size) + "px", text: text.slice(0, 30), el });
  }

  // tags on the page
  const layer = document.createElement("div");
  layer.id = "cc-layer";
  layer.style.cssText = "position:absolute;inset:0 auto auto 0;z-index:2147483647;pointer-events:none";
  for (const row of rows.filter(r => r.status !== "✓")) {
    const r = row.el.getBoundingClientRect();
    const tag = document.createElement("span");
    tag.textContent = row.status === "؟" ? "؟" : row.ratio;
    tag.style.cssText = "position:absolute;padding:0 4px;border-radius:4px;font:700 11px/16px system-ui;direction:ltr;" +
      (row.status === "؟" ? "background:#fde047;color:#000" : "background:#b91c1c;color:#fff");
    tag.style.left = r.left + scrollX + "px";
    tag.style.top = Math.max(0, r.top + scrollY - 16) + "px";
    layer.append(tag);
    if (row.status === "✗") row.el.style.outline = "2px dashed #b91c1c";
  }
  document.body.append(layer);

  const fail = rows.filter(r => r.status === "✗"), check = rows.filter(r => r.status === "؟");
  console.table(rows.filter(r => r.status !== "✓").map(({ el, ...r }) => r));
  console.log("تباين بجد: " + rows.length + " نص، " + fail.length + " ساقط، " + check.length + " محتاج عينك (فوق صورة أو gradient).");
  window.__contrast = { total: rows.length, fail: fail.map(r => r.text + " " + r.ratio), check: check.map(r => r.text) };
})();
~~~

~~~js make-bookmarklet.mjs
// node make-bookmarklet.mjs: turns contrast-check.js into one line you paste as a bookmark's URL
import fs from "node:fs";

const src = fs.readFileSync(new URL("contrast-check.js", import.meta.url), "utf8")
  .split("\n")
  .filter(line => !line.trim().startsWith("//"))       // whole-line comments out
  .join("\n");
const url = "javascript:" + encodeURIComponent(src);
fs.writeFileSync(new URL("bookmarklet.txt", import.meta.url), url + "\n");
console.log("bookmarklet.txt: " + url.length + " حرف");
~~~

~~~bash الترمنال
node make-bookmarklet.mjs
~~~

**تركّبه إزاي:** اعمل bookmark جديد في المتصفح (Ctrl+Shift+O في Chrome › Add new bookmark)، والاسم «تباين بجد»، والـ URL محتوى [[bookmarklet.txt]] كله. افتح أي صفحة ودوس عليه.

~~~view 760 900 الأداة شغالة على landing «قبل»
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بيت الخط: ورشة خط عربي</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.7; color: #292524; background: #fffbf5; cursor: none; }
a, button { cursor: none; }
a { color: #9a3412; }

.cursor { position: fixed; top: 0; left: 0; z-index: 50; width: 28px; height: 28px; border: 2px solid #9a3412; border-radius: 50%; pointer-events: none; transition: translate 0.15s ease-out; }

.header { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; background: #fffbf5; border-block-end: 1px solid #e7e5e4; }
.logo { font-weight: 800; color: #292524; text-decoration: none; }
.links { display: flex; gap: 1rem; margin-inline-start: auto; }
.menu-btn { display: none; margin-inline-start: auto; border: 0; background: none; font-size: 1.4rem; }
.drawer { display: none; position: fixed; inset: 0 0 0 30%; padding: 4rem 1.5rem; background: #fff; box-shadow: 0 0 30px #0003; flex-direction: column; gap: 1rem; }
.drawer.open { display: flex; }
.drawer-close { position: absolute; top: 1rem; inset-inline-start: 1rem; border: 0; background: none; font-size: 1.2rem; }
@media (max-width: 40rem) {
  .links { display: none; }
  .menu-btn { display: block; }
}

.hero { padding: 4rem 1rem; text-align: center; background: linear-gradient(#fde7d1, #fffbf5); }
.hero h1 { margin: 0 0 0.5rem; font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); }
.btn { display: inline-block; padding: 0.7rem 1.4rem; border-radius: 999px; background: #9a3412; color: #fff; text-decoration: none; font-weight: 700; }

.partners { overflow: hidden; padding-block: 1rem; background: #292524; color: #fafaf9; }
.track { display: flex; gap: 3rem; width: max-content; margin: 0; padding: 0; list-style: none; animation: slide 18s linear infinite; }
@keyframes slide { to { translate: 50% 0; } }

.section { max-width: 52rem; margin: 0 auto; padding: 2.5rem 1rem; }
.cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr)); margin: 0; padding: 0; list-style: none; }
.card { padding: 1.25rem; background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; }
.card h3 { margin: 0 0 0.25rem; }
.small { margin: 0; font-size: 10px; color: #b8b0a8; }

.acc { border-block-end: 1px solid #e7e5e4; }
.acc-q { padding: 0.75rem 0; font-weight: 700; }
.acc-a { display: none; padding-block-end: 0.75rem; }
.acc.open .acc-a { display: block; }

.social { display: flex; gap: 1rem; font-size: 1.6rem; }
.social a { text-decoration: none; }
.footer { padding: 1.5rem 1rem; text-align: center; border-block-start: 1px solid #e7e5e4; }
</style>
</head>
<body>
<div class="cursor" aria-hidden="true"></div>
<header class="header">
  <a class="logo" href="#">بيت الخط</a>
  <nav class="links" aria-label="Main menu">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
  </nav>
  <button class="menu-btn" aria-label="Open menu">☰</button>
  <div class="drawer" id="drawer">
    <a href="#courses">الكورسات</a>
    <a href="#faq">أسئلة</a>
    <a href="#join">احجز</a>
    <button class="drawer-close" aria-label="Close">✕</button>
  </div>
</header>

<main>
  <section class="hero">
    <h1>اتعلّم الرقعة والنسخ في ٨ أسابيع</h1>
    <p>مجموعات صغيرة، وأدوات علينا، وكراسة بتاخدها معاك.</p>
    <a class="btn" href="#join">احجز مكانك</a>
  </section>

  <section class="partners" aria-label="Partners">
    <div class="marquee">
      <ul class="track">
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
        <li>مكتبة الورّاق</li><li>دار الحبر</li><li>جمعية الفنون</li><li>مرسم النيل</li><li>ورق وقلم</li>
      </ul>
    </div>
  </section>

  <section id="courses" class="section">
    <h2>الكورسات</h2>
    <ul class="cards">
      <li class="card"><h3>رقعة للمبتدئين</h3><p class="small">٨ حصص، كل سبت، ١٢٠٠ ج</p></li>
      <li class="card"><h3>نسخ</h3><p class="small">١٠ حصص، كل اتنين، ١٥٠٠ ج</p></li>
      <li class="card"><h3>ثلث متقدم</h3><p class="small">١٢ حصة، كل أربع، ٢٠٠٠ ج</p></li>
    </ul>
  </section>

  <section id="faq" class="section">
    <h2>أسئلة</h2>
    <div class="acc">
      <div class="acc-q">لازم أكون بعرف أرسم؟</div>
      <div class="acc-a">لأ، بنبدأ من مسكة القلم.</div>
    </div>
    <div class="acc">
      <div class="acc-q">الأدوات عليا؟</div>
      <div class="acc-a">لأ، القلم والحبر والورق علينا في أول شهر.</div>
    </div>
  </section>

  <section id="join" class="section">
    <h2>احجز</h2>
    <p>كلّمنا وهنرد في نفس اليوم.</p>
    <div class="social">
      <a href="#">📞</a>
      <a href="#">💬</a>
      <a href="#">📍</a>
    </div>
  </section>
</main>
<footer class="footer"><p class="small">بيت الخط، ورشة متخيلة للتجربة.</p></footer>
<script>
// custom cursor follows the mouse
const cursor = document.querySelector(".cursor");
addEventListener("mousemove", e => { cursor.style.translate = (e.clientX - 14) + "px " + (e.clientY - 14) + "px"; });

// phone menu: opens and closes, nothing else
const drawer = document.getElementById("drawer");
document.querySelector(".menu-btn").addEventListener("click", () => drawer.classList.add("open"));
document.querySelector(".drawer-close").addEventListener("click", () => drawer.classList.remove("open"));

// accordion: click on the question
document.querySelectorAll(".acc-q").forEach(q => q.addEventListener("click", () => q.parentElement.classList.toggle("open")));
</script>
<script>
// «تباين بجد»: measures WCAG contrast for every piece of text on the page, Arabic included.
// Why: axe takes joined Arabic letters for icon-font ligatures and then skips the whole font,
// so color-contrast can say 0 on a page full of pale Arabic text.
// Red tag = fails, yellow "؟" = text over an image or gradient (check it by eye), nothing = passes.
(() => {
  document.getElementById("cc-layer")?.remove();               // a second click starts over

  const parse = s => (s.match(/[\d.]+/g) || []).map(Number);    // "rgb(1, 2, 3)" or "rgba(1, 2, 3, 0.5)"
  const lin = v => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const mix = (top, a, under) => top.map((c, i) => c * a + under[i] * (1 - a));   // a see-through color over another

  // the color behind an element: walk up, blending semi-transparent backgrounds, until something solid
  function behind(el) {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage !== "none") return { image: true };
      const c = parse(cs.backgroundColor), a = c.length === 4 ? c[3] : 1;
      if (a > 0) layers.push([c.slice(0, 3), a]);
      if (a === 1) break;
    }
    let color = [255, 255, 255];                                 // the canvas is white when nothing is solid
    for (const [c, a] of layers.reverse()) color = mix(c, a, color);
    return { color };
  }

  const rows = [];
  for (const el of document.body.querySelectorAll("*")) {
    if (el.closest("#cc-layer, script, style, noscript, template")) continue;
    const text = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join("").trim();
    if (!text) continue;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || cs.visibility === "hidden" || Number(cs.opacity) === 0) continue;
    if (el.closest('[aria-hidden="true"]') && /^\W*$/.test(text)) continue;     // decorative symbols

    const size = parseFloat(cs.fontSize), bold = Number(cs.fontWeight) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);             // WCAG "large": 18pt, or 14pt bold
    const need = large ? 3 : 4.5;
    const bg = behind(el);
    const fgRaw = parse(cs.color), fgA = fgRaw.length === 4 ? fgRaw[3] : 1;
    let ratio = null;
    if (!bg.image) {
      const fg = mix(fgRaw.slice(0, 3), fgA, bg.color);
      const [hi, lo] = [lum(fg), lum(bg.color)].sort((a, b) => b - a);
      ratio = Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
    }
    const status = ratio === null ? "؟" : ratio < need ? "✗" : "✓";
    rows.push({ status, ratio, need, size: Math.round(size) + "px", text: text.slice(0, 30), el });
  }

  // tags on the page
  const layer = document.createElement("div");
  layer.id = "cc-layer";
  layer.style.cssText = "position:absolute;inset:0 auto auto 0;z-index:2147483647;pointer-events:none";
  for (const row of rows.filter(r => r.status !== "✓")) {
    const r = row.el.getBoundingClientRect();
    const tag = document.createElement("span");
    tag.textContent = row.status === "؟" ? "؟" : row.ratio;
    tag.style.cssText = "position:absolute;padding:0 4px;border-radius:4px;font:700 11px/16px system-ui;direction:ltr;" +
      (row.status === "؟" ? "background:#fde047;color:#000" : "background:#b91c1c;color:#fff");
    tag.style.left = r.left + scrollX + "px";
    tag.style.top = Math.max(0, r.top + scrollY - 16) + "px";
    layer.append(tag);
    if (row.status === "✗") row.el.style.outline = "2px dashed #b91c1c";
  }
  document.body.append(layer);

  const fail = rows.filter(r => r.status === "✗"), check = rows.filter(r => r.status === "؟");
  console.table(rows.filter(r => r.status !== "✓").map(({ el, ...r }) => r));
  console.log("تباين بجد: " + rows.length + " نص، " + fail.length + " ساقط، " + check.length + " محتاج عينك (فوق صورة أو gradient).");
  window.__contrast = { total: rows.length, fail: fail.map(r => r.text + " " + r.ratio), check: check.map(r => r.text) };
})();
</script>
</body>
</html>
~~~

**هتشوف إيه:** نفس صفحة «بيت الخط» البايظة، بس كل كلام ساقط عليه إطار أحمر متقطع ورقم التباين فوقه (2.14 على الكروت، و 2.08 في الفوتر). والعنوان والكلام اللي على الـ gradient عليهم «؟» أصفر. ولو فتحت الكونسول هتلاقي جدول.

**بيحسب إزاي:**
- **لون الكلام:** [[getComputedStyle(el).color]]، ولو شفاف شوية بيتخلط مع الخلفية ([[mix]]).
- **لون الخلفية:** بيطلع من العنصر لفوق لحد أول خلفية مش شفافة، ويخلط كل الطبقات النص شفافة في السكة. ولو مفيش، الخلفية أبيض.
- **صورة أو gradient:** مفيش لون واحد يتحسب، فبيقول «؟» بدل ما يخمّن. ده أحسن من رقم غلط، سواء بيقول «ساقط» على حاجة سليمة أو العكس.
- **الكلام الكبير:** 24px، أو 18.66px و bold، محتاج 3:1 بس (WCAG 1.4.3).
- **العناصر:** أي عنصر جواه كلام مباشر ([[nodeType === 3]])، فالكلمة اللي في [[<strong>]] جوه فقرة بتتقاس لوحدها بلونها.

**اللي مبيعملهوش:** حدود الخانات والأيقونات (1.4.11، 3:1)، والكلام اللي جاي من [[::before]]، و [[text-shadow]]. ودول لسه بالعين أو بالـ DevTools color picker.

~~~text على ٥ صفحات (Playwright بـ Chrome 157، والأداة جنب axe 4.14.0)
== landing before | axe color-contrast: inapplicable 0 | الأداة: 33 نص، ساقط 4، ؟ 2
  ✗ ٨ حصص، كل سبت، ١٢٠٠ ج 2.14
  ✗ ١٠ حصص، كل اتنين، ١٥٠٠ ج 2.14
  ✗ ١٢ حصة، كل أربع، ٢٠٠٠ ج 2.14
  ✗ بيت الخط، ورشة متخيلة للتجربة. 2.08
  ؟ اتعلّم الرقعة والنسخ في ٨ أساب
  ؟ مجموعات صغيرة، وأدوات علينا، و
== fix-a-site broken (وحدة Accessibility) | axe color-contrast: passes 0 | الأداة: 7 نص، ساقط 3
  ✗ بنجمع الحيوانات من الشارع، ونع 2.32
  ✗ مرة في الشهر بس، ومفيش إعلانات 1.92
  ✗ اشترك 2.15
== landing بعد  | الأداة: 30 نص، ساقط 0، ؟ 2 (الهيرو على gradient)
== ابتسامة      | الأداة: 33 نص، ساقط 0، ؟ 2 (الهيرو على gradient)
== نَفَس (gate) | الأداة: 12 نص، ساقط 0
bookmarklet.txt: 6425 حرف، و new Function(decodeURIComponent(...)) بيقراه من غير غلط، وتشغيله على fix-a-site طلّع نفس الـ ٣
~~~

**الأرقام دي اتراجعت:** 2.32 و 1.92 و 2.15 هم نفس اللي اتحسبوا بإيدي في مشروع «صلّح موقع» في وحدة Accessibility. وعلى الـ ٣ صفحات السليمة مفيش ولا «ساقط» غلط. الـ «؟» بس على الكلام اللي فوق gradient، وده مقصود. واتجرّب على ٥ صفحات من الكورس، مش على مواقع حقيقية: جرّبه على مواقع حقيقية من عندك وقارن بالعين.` },
      ],
      items: [
        {
          cmd: "WCAG 2.2",
          title: "WCAG 2.2 AA يعني إيه بالظبط؟",
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من صفحة «What's New in WCAG 2.2» على موقع W3C هات البنود الجديدة اللي مستواها A أو AA، وإيه البند اللي اتشال من 2.1.`, done: R`جدول ٦ صفوف (2.4.11 Focus Not Obscured، و 2.5.7 Dragging Movements، و 2.5.8 Target Size 24×24، و 3.2.6 Consistent Help، و 3.3.7 Redundant Entry، و 3.3.8 Accessible Authentication) وجنب كل واحد مثال من موقعك، وكتبت إن 4.1.1 Parsing اتشال.`, sol: R`**إجابة نموذجية من «What's New in WCAG 2.2» على موقع W3C:**

| البند | المستوى | المعنى | مثال من موقعك |
|---|---|---|---|
| 2.4.11 Focus Not Obscured (Minimum) | AA | العنصر اللي عليه focus ميستخباش كله | هيدر sticky أو بانر كوكيز |
| 2.5.7 Dragging Movements | AA | أي سحب ليه بديل بالضغط | ترتيب بالسحب |
| 2.5.8 Target Size (Minimum) | AA | الهدف 24×24 على الأقل | أيقونة مسح في جدول |
| 3.2.6 Consistent Help | A | المساعدة في نفس المكان | لينك «كلّمنا» |
| 3.3.7 Redundant Entry | A | متطلبش نفس البيانات مرتين | عنوان الشحن والفاتورة |
| 3.3.8 Accessible Authentication (Minimum) | AA | تسجيل دخول من غير اختبار ذاكرة | السماح بـ paste في الباسورد |

**اللي اتشال:** 4.1.1 Parsing، لأن المتصفحات الحديثة بقت بتصلّح الـ HTML بنفس الطريقة.

و WCAG 2.2 فيها بنود AAA جديدة كمان (زي 2.4.12 و 2.4.13)، بس السؤال عن A و AA.

**الغلطة الشائعة:** تفتكر إن 2.5.8 بتطلب 44×44. دي بند 2.5.5 في AAA. الـ AA 24×24.

~~~text الناتج
٦ بنود A و AA ، والمشال 4.1.1 Parsing.
(إجابة من الوثائق، مش ناتج تشغيل.)
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب سطر في الكونسول بيطلّع كل [[a]] و [[button]] و [[input]] و [[[role=button]]] مقاسه أصغر من 24×24 (بـ [[getBoundingClientRect()]])، وشغّله على صفحة من موقعك. وصلّح اللي طالع بـ padding أو [[min-block-size]].`, done: R`اللستة قبل التصليح فيها الأيقونات الصغيرة، وبعده فاضية ما عدا اللينكات اللي جوه جملة (مستثناة في 2.5.8)، وكاتب جنب كل استثناء سببه.`, sol: R`~~~js console
[...document.querySelectorAll("a, button, input, [role=button]")]
  .map((el) => ({ el, box: el.getBoundingClientRect() }))
  .filter(({ box }) => box.width > 0 && (box.width < 24 || box.height < 24))
  .map(({ el, box }) => $__bt$__{el.tagName} «$__{el.textContent.trim() || el.getAttribute("aria-label")}» $__{Math.round(box.width)}×$__{Math.round(box.height)}$__bt);
~~~

~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أهداف صغيرة</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  .icon { padding: 0; border: 0; background: none; font-size: 14px; line-height: 1; }
  /* التصليح: شيل التعليق عن السطر اللي تحته */
  /* .icon { min-inline-size: 24px; min-block-size: 24px; } */
</style>
</head>
<body>
<main>
  <h1>المفضلة</h1>
  <button class="icon" aria-label="امسح">✕</button>
  <button class="icon" aria-label="عدّل">✎</button>
  <p>اقرا <a href="/terms">الشروط</a> قبل ما تكمّل.</p>
</main>
</body>
</html>
~~~

**السطر بيعمل إيه:** بيجيب كل العناصر، ويقيس كل واحد، ويفلتر الأصغر من 24 في أي اتجاه. و [[box.width > 0]] بيشيل العناصر المخفية. و [[.map]] الأخيرة بتطبع سطر مقري.

**التصليح:** [[min-inline-size]] و [[min-block-size]] بيكبّروا مساحة الضغط من غير ما يغيّروا شكل الأيقونة.

**الاستثناءات في 2.5.8:** اللينك جوه جملة مستثنى، وعشان كده [[الشروط]] فضل في اللستة. كمان فيه استثناء لو حوالين الهدف فراغ كفاية، ولو الحجم من المتصفح.

**الغلطة الشائعة:** تكبّر الأيقونة نفسها. المطلوب مساحة الضغط، و padding أو min-size بيحلوها.

~~~text الناتج
قبل:
BUTTON «✕» 11×14
BUTTON «✎» 14×14
A «الشروط» 48×21

بعد min-inline-size و min-block-size:
A «الشروط» 48×21     ← لينك جوه جملة، مستثنى في 2.5.8
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** planner أسبوعي بيرتّب الأيام بـ drag and drop بس. ده بيكسر 2.5.7 Dragging Movements. زوّد زرارين لكل كارت «لفوق» و «لتحت» بأسامي فيها اسم اليوم ([[aria-label="انقل الاتنين لفوق"]]).`, done: R`تقدر ترتّب كل الأيام بالكيبورد وبالضغط من غير سحب، وبعد الضغط الـ focus فاضل على نفس الزرار في المكان الجديد، ورسالة «الاتنين بقى رقم ٢» بتتقري في [[role="status"]].`, sol: R`~~~html planner.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>planner أسبوعي</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  ol { list-style: none; margin: 0; padding: 0; display: grid; gap: .5rem; max-width: 24rem; }
  li { display: flex; align-items: center; gap: .5rem; padding: .5rem; border: 1px solid #94a3b8; border-radius: .5rem; background: #fff; cursor: grab; }
  li span { flex: 1; }
  button { min-inline-size: 2.75rem; min-block-size: 2.75rem; }
</style>
</head>
<body>
<main>
  <h1>ترتيب الأسبوع</h1>
  <ol id="days"></ol>
  <p id="status" role="status" class="note"></p>
</main>
<script>
  const days = ["السبت", "الأحد", "الاتنين", "التلات", "الأربع"];
  const list = document.getElementById("days");
  const status = document.getElementById("status");
  let dragged = null;

  function render() {
    list.replaceChildren(...days.map((day, i) => {
      const li = document.createElement("li");
      li.draggable = true;
      li.dataset.day = day;
      li.innerHTML = $__bt<span>$__{i + 1}. $__{day}</span>
        <button type="button" data-dir="-1" aria-label="انقل $__{day} لفوق" $__{i === 0 ? "disabled" : ""}>▲</button>
        <button type="button" data-dir="1" aria-label="انقل $__{day} لتحت" $__{i === days.length - 1 ? "disabled" : ""}>▼</button>$__bt;
      return li;
    }));
  }

  function move(day, to) {
    const from = days.indexOf(day);
    days.splice(from, 1);
    days.splice(to, 0, day);
    render();
    status.textContent = $__bt$__{day} بقى رقم $__{to + 1}$__bt;
  }

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const dir = Number(btn.dataset.dir);
    const day = btn.closest("li").dataset.day;
    const to = days.indexOf(day) + dir;
    move(day, to);
    // الزرار اترسم من جديد: رجّع الـ focus لنفس الزرار، ولو بقى disabled للزرار التاني
    const row = list.querySelector($__bt[data-day="$__{day}"]$__bt);
    const same = row.querySelector($__bt[data-dir="$__{dir}"]$__bt);
    (same.disabled ? row.querySelector($__bt[data-dir="$__{-dir}"]$__bt) : same).focus();
  });

  // السحب لسه موجود للي عايزه
  list.addEventListener("dragstart", (e) => { dragged = e.target.dataset.day; });
  list.addEventListener("dragover", (e) => e.preventDefault());
  list.addEventListener("drop", (e) => {
    const target = e.target.closest("li");
    if (target) move(dragged, days.indexOf(target.dataset.day));
  });

  render();
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- كل كارت ليه زرارين، والاسم فيه اليوم، فقارئ الشاشة ميقولش «لفوق» ١٠ مرات من غير ما تعرف لفوق إيه.
- [[render()]] بيعيد رسم كل الكروت، فالزرار القديم بيتمسح، والـ focus كان هيروح لـ body. عشان كده بعد النقل بندوّر على نفس الزرار في مكانه الجديد ونعمله [[focus()]].
- أول يوم زرار «فوق» بيبقى [[disabled]]، فلو الزرار اتعطل بننقل لزرار الاتجاه التاني. كده المستخدم مبيقعش في الفراغ.
- [[role="status"]] بيعلن النتيجة. السحب لسه موجود: البند بيطلب بديل، مش إلغاء.

**الغلطة الشائعة:** تعيد الرسم وتنسى الـ focus. الترتيب بيشتغل، بس مستخدم الكيبورد لازم يبدأ من أول الصفحة بعد كل نقلة.

~~~text الناتج
البداية:  1. السبت  2. الأحد  3. الاتنين  4. التلات  5. الأربع
Enter على «انقل الاتنين لفوق»:
          1. السبت  2. الاتنين  3. الأحد  4. التلات  5. الأربع

الـ focus: فضل على «انقل الاتنين لفوق»
role=status: «الاتنين بقى رقم 2»

لما وصل رقم 1: زرار فوق disabled ، والـ focus راح لـ «انقل الاتنين لتحت»
axe صفر ، وعلى 360 مفيش scroll أفقي
~~~` },
            { lvl: 'سريع', t: R`**اشرحها:** carousel بيقلب لوحده كل ٣ ثواني ومفيهوش زرار وقوف، و marquee لوجوهات شغال على طول. اكتب لزميلك ٣ سطور: البند اللي بيكسروه، وليه بيضايق مين، والتصليح.`, done: R`الـ ٣ سطور فيهم 2.2.2 Pause, Stop, Hide (أي حركة بتطول أكتر من ٥ ثواني محتاجة وقوف)، وإنها بتضايق اللي بيقرا ببطء أو عنده تشتت أو قارئ شاشة، والتصليح زرار وقوف ظاهر ووقوف مع hover و focus و [[prefers-reduced-motion]].`, sol: R`**إجابة نموذجية:**

> الاتنين بيكسروا 2.2.2 Pause, Stop, Hide: أي حاجة بتتحرك لوحدها أكتر من ٥ ثواني لازم يبقى ليها وقوف.
> بيضايقوا اللي بيقرا ببطء (الشريحة بتتبدّل قبل ما يخلص)، واللي عنده تشتت، ومستخدم قارئ الشاشة.
> التصليح: زرار وقوف ظاهر، والحركة تقف مع hover و focus، ومع [[prefers-reduced-motion]] متبدأش أصلًا.

**شكل التصليح:**

~~~css marquee.css
.marquee:hover .track,
.marquee:focus-within .track { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .track { animation: none; }
}
~~~

**الغلطة الشائعة:** تعتمد على الوقوف بالـ hover بس. على الموبايل مفيش hover، فالزرار الظاهر هو اللي بيوفي البند.

~~~text الناتج
٣ سطور: البند ، ومين بيتضايق ، والتصليح.
(إجابة من الوثائق. نسخة الـ marquee الكاملة في تمرين marquee في درس الحركة.)
~~~` },
          ],
          desc: R`WCAG قواعد من W3C بتقول الموقع يبقى accessible إزاي. متقسمة على 4 مبادئ اسمها POUR: Perceivable (تقدر تدرك المحتوى: alt، وترجمة، وتباين)، و Operable (تقدر تستخدمه: كيبورد، ووقت كفاية، ومفيش حاجة بتومض)، و Understandable (مفهوم: لغة الصفحة، وأخطاء واضحة، وسلوك متوقع)، و Robust (شغال مع قارئات الشاشة: HTML سليم و role و name).

كل مبدأ تحته success criteria، ولكل واحد مستوى: A (الحد الأدنى)، و AA (اللي العقود والقوانين بتطلبه)، و AAA (أعلى، ومحدش بيطلبه على الموقع كله). فـ «WCAG 2.2 AA» معناها كل قواعد A و AA في نسخة 2.2.

نسخة 2.2 (أكتوبر 2023) زوّدت 9 قواعد، منهم 6 في A و AA: الـ focus ميستخباش ورا header ثابت، وبديل للسحب (dragging)، وأهداف اللمس 24×24 على الأقل، والمساعدة في نفس المكان في كل صفحة، ومتطلبش نفس البيانات مرتين، وتسجيل الدخول من غير اختبار ذاكرة (تسمح بالـ paste ومديري كلمات السر). وشالت قاعدة Parsing القديمة.`,
          example: R`html { scroll-padding-top: 5rem; }
.icon-btn { min-inline-size: 24px; min-block-size: 24px; }
<a href="/help" class="help-link">مساعدة</a>
<label><input type="checkbox" name="billing_same" checked> عنوان الفاتورة هو نفس عنوان الشحن</label>
<input type="password" name="password" autocomplete="current-password">
<button type="button" aria-label="انقل لفوق">↑</button>`,
          try: R`خد صفحة من مشروعك وامشي على الـ 6 قواعد الجديدة: دوس Tab تحت الـ header الثابت (الـ focus بيستخبى؟)، وقيس أصغر زرار أيقونة في DevTools، ودوّر على أي حاجة بتتسحب (ترتيب، slider)، وشوف لينك المساعدة في نفس المكان في كل صفحة؟ وفي الـ checkout بتطلب العنوان مرتين؟ وفي تسجيل الدخول جرّب تعمل paste في الباسورد.`,
          flag: "script",
          deep: {
            why: R`العملاء الكبار والحكومات والبنوك بيطلبوا WCAG AA في العقد. وفيه قوانين: الـ European Accessibility Act بقى مطبّق من يونيو 2025 على منتجات وخدمات كتير بتتباع في أوروبا (متاجر، وبنوك، وتذاكر)، وفي أمريكا قضايا الـ ADA على المواقع كتير. والقوانين دي غالبًا بتشاور على WCAG 2.1 AA (بشكل مباشر أو من خلال مواصفات زي EN 301 549)، و 2.2 متوافقة معاها، فلو اشتغلت على 2.2 AA انت مغطي الاتنين. وسؤال «تعرف إيه عن WCAG؟» بيتسأل في انترفيوهات الفرونت.`,
            how: R`القواعد الجديدة في 2.2 بأرقامها: 2.4.11 Focus Not Obscured (Minimum) في AA: العنصر اللي عليه focus ميبقاش مستخبي كله ورا sticky header أو cookie banner، والحل [[scroll-padding-top]] بارتفاع الـ header. و 2.5.7 Dragging Movements في AA: أي حاجة بتتعمل بالسحب ليها بديل بضغطة (أزرار فوق وتحت للترتيب). و 2.5.8 Target Size (Minimum) في AA: أي هدف بيتضغط 24×24 CSS px على الأقل أو حواليه مسافة كفاية (مع استثناءات زي اللينكات جوه الكلام). و 3.2.6 Consistent Help في A: لو فيه مساعدة (تواصل، شات) تبقى في نفس الترتيب في كل الصفحات. و 3.3.7 Redundant Entry في A: متطلبش من المستخدم يكتب حاجة كتبها قبل كده في نفس العملية (اعرضها أو خليه يختارها). و 3.3.8 Accessible Authentication (Minimum) في AA: متطلبش تذكّر أو حل لغز عشان يدخل، يعني اسمح بالـ paste و autocomplete ومديري كلمات السر، و CAPTCHA بصور لازم ليها بديل.

وفيه 3 في AAA: 2.4.12 (الـ focus ميستخباش خالص)، و 2.4.13 Focus Appearance (شكل الـ focus بمقاس وتباين محددين)، و 3.3.9 (دخول من غير أي اختبار حتى التعرف على صور).

و 4.1.1 Parsing اتشالت لأن المتصفحات وقارئات الشاشة بقت بتتعامل مع الـ HTML الغلط بنفس الطريقة.

POUR مش checklist، هي طريقة تفكير: لكل مكون اسأل: حد أعمى يدركه؟ حد من غير ماوس يستخدمه؟ حد مشتت يفهمه؟ وقارئ الشاشة يعرف هو إيه؟`,
            when: R`في بداية المشروع (التصميم بيحدد التباين وأحجام الأزرار)، وفي كل review لمكون جديد، وقبل أي تسليم لعميل كبير. والمعيار العملي: 2.2 AA.`,
            mistakes: R`تفتكر AAA هو الهدف فتيأس، أو A كفاية فتسقط في عقد. تمنع الـ paste في حقل الباسورد «للأمان» (بيكسر 3.3.8 وبيخلي الناس تختار باسوردات أضعف). header ثابت بياكل الحقل اللي عليه الـ focus. أيقونات 16px من غير مساحة حواليها. و «الموقع accessible عشان Lighthouse 100»: ده مش WCAG. وفي الانترفيو: «AA ولا AAA؟» الإجابة AA، و AAA لأجزاء معينة لو المستخدمين محتاجينها.`
          },
          teach: R`## كل سطر في المثال = قاعدة من الجديد في 2.2

الأرقام زي [[2.4.11]] هي أرقام القواعد (success criteria) في WCAG: الرقم الأول المبدأ (1 Perceivable، و 2 Operable، و 3 Understandable، و 4 Robust)، والتاني الـ guideline، والتالت القاعدة نفسها. المثال سطرين CSS وأربع عناصر HTML، كل واحد بيحل قاعدة. حطيناهم في صفحة فيها header ثابت ارتفاعه 5rem و 30 حقل، وجربناها في Chrome من Playwright.

---

## ١. 2.4.11 Focus Not Obscured: [[html { scroll-padding-top: 5rem; }]]

- [[html]]: الـ selector هو العنصر الجذر، لأنه هو اللي بيعمل scroll للصفحة.
- [[scroll-padding-top]]: «لما المتصفح يعمل scroll عشان يوريك عنصر، اعتبر إن أول 5rem من فوق مش موجودين». 5rem = 80px (الـ rem = حجم خط الـ html، 16px افتراضيًا).
- القيمة لازم تبقى قد ارتفاع الـ header الثابت أو أكتر.

جربنا لينك لـ [[#f10]] و [[scrollIntoView()]]، ودول بيحطوا العنصر في أول الشاشة:

~~~text اتقاس في Chrome (header ارتفاعه 80px)
من غير scroll-padding-top:   الحقل top = 0    ← مستخبي كله ورا الـ header
مع scroll-padding-top: 5rem: الحقل top = 80   ← تحت الـ header على طول
~~~

ومع الـ Tab نفسه: Chrome بيحط الحقل اللي خد focus في نص الشاشة لو كان برا الشاشة، فاتنقل من top=289 لـ top=329 لما ضفنا الـ padding (النص اتحسب من المساحة الباقية بعد الـ 80px). يعني القاعدة دي بتحمي كل الطرق اللي المتصفح بيعمل بيها scroll لعنصر.

---

## ٢. 2.5.8 Target Size: [[.icon-btn { min-inline-size: 24px; min-block-size: 24px; }]]

- [[min-inline-size]]: أقل عرض، بس بالاسم «المنطقي»: inline = اتجاه الكلام (أفقي في العربي والإنجليزي).
- [[min-block-size]]: أقل ارتفاع (block = الاتجاه اللي السطور بتنزل فيه).
- ليه مش [[min-width]]؟ نفس النتيجة في صفحة أفقية، بس الأسماء المنطقية بتفضل صح لو الكتابة رأسي.

عملنا زرار [[↑]] من غير padding وخطه 10px، مرة بالكلاس ومرة من غيره:

~~~text اتقاس في Chrome
مع .icon-btn:   24.0 × 24.0
من غيره:        5.0 × 10.0
~~~

5×10 بكسل هدف مستحيل تدوس عليه بصباعك. الـ 24 هي الحد الأدنى في AA (والـ 44 اللي بتسمع عنها في AAA وفي توصيات Apple).

---

## ٣. 3.2.6 Consistent Help: [[<a href="/help" class="help-link">مساعدة</a>]]

سطر HTML عادي: لينك للمساعدة. القاعدة مش في الكود نفسه، في **مكانه**: لو موقعك فيه مساعدة، تبقى في نفس الترتيب في كل الصفحات (مثلًا دايمًا آخر حاجة في الـ header). فالمكان الطبيعي للسطر ده هو الـ layout المشترك، مش كل صفحة لوحدها.

---

## ٤. 3.3.7 Redundant Entry: الـ checkbox

~~~text HTML
<label><input type="checkbox" name="billing_same" checked> عنوان الفاتورة هو نفس عنوان الشحن</label>
~~~

- [[<label>]] حوالين الـ input: الكلام اللي جواه بقى اسم الـ checkbox، والضغط على الكلام بيعلّم المربع.
- [[name="billing_same"]]: الاسم اللي بيتبعت مع الفورم.
- [[checked]]: attribute من غير قيمة = متعلّم من الأول.

شجرة الـ accessibility في Chrome:

~~~text
- checkbox "عنوان الفاتورة هو نفس عنوان الشحن" [checked]
~~~

الفكرة: المستخدم كتب عنوان الشحن خلاص، فمتطلبوش تاني. ده أسهل كتير على أي حد، ومهم جدًا لحد بيكتب ببطء أو بيتلخبط.

---

## ٥. 3.3.8 Accessible Authentication: الباسورد

~~~text HTML
<input type="password" name="password" autocomplete="current-password">
~~~

- [[type="password"]]: الحروف بتظهر نقط.
- [[autocomplete="current-password"]]: بيقول للمتصفح ولمدير كلمات السر «ده باسورد موجود، املاه». ولو صفحة إنشاء حساب: [[new-password]] (فيقترح باسورد جديد).
- اللي **مش** موجود مهم بنفس القدر: مفيش [[onpaste]] بيمنع اللصق. منع الـ paste بيجبر المستخدم يفتكر الباسورد ويكتبه، وده بالظبط «اختبار الذاكرة» اللي القاعدة بتمنعه.

---

## ٦. 2.5.7 Dragging Movements: زرار بدل السحب

~~~text HTML
<button type="button" aria-label="انقل لفوق">↑</button>
~~~

- [[type="button"]]: من غيرها الزرار جوه فورم بيبقى submit افتراضيًا ويبعت الفورم.
- [[aria-label="انقل لفوق"]]: السهم لوحده مش اسم مفهوم. شجرة Chrome:

~~~text
مع aria-label:  button "انقل لفوق"
من غيره:        button "↑"
~~~

لو قايمة بتترتب بالسحب، الزرار ده (ومعاه «انقل لتحت») بيخلّي اللي مبيعرفش يسحب (رعشة في الإيد، أو كيبورد بس) يرتّب برضه.

---

## الملخص

| السطر | القاعدة | المستوى | الفكرة |
|---|---|---|---|
| [[scroll-padding-top: 5rem]] | 2.4.11 | AA | الـ focus ميستخباش ورا header ثابت |
| [[min-inline-size: 24px]] | 2.5.8 | AA | الهدف 24×24 على الأقل |
| لينك المساعدة | 3.2.6 | A | نفس المكان في كل صفحة |
| checkbox «نفس العنوان» | 3.3.7 | A | متطلبش نفس البيانات مرتين |
| [[autocomplete]] ومن غير منع paste | 3.3.8 | AA | دخول من غير اختبار ذاكرة |
| زرار «انقل لفوق» | 2.5.7 | AA | بديل بضغطة لأي سحب |

## الخلاصة

- «WCAG 2.2 AA» = كل قواعد A و AA في النسخة 2.2، والقواعد الست دي هي الجديد فيها على مستوى A و AA.
- أغلبها سطر واحد: [[scroll-padding-top]]، و min size، و [[autocomplete]]، و زرار بديل.
- القواعد عن تجربة المستخدم، مش عن الكود: لينك المساعدة صح أو غلط حسب مكانه.`,
          lines: [
            R`2.4.11: لما Tab ينقلك لعنصر تحت الـ header الثابت، المتصفح يسيب 5rem فوقه فميستخباش.`,
            "2.5.8: أي زرار أيقونة 24×24 على الأقل.",
            "3.2.6: لينك المساعدة في نفس المكان في كل صفحة (في الـ header أو الـ footer).",
            "3.3.7: متطلبش العنوان مرتين، خليه يختار «نفس العنوان».",
            R`3.3.8: [[autocomplete]] ومفيش منع للـ paste، فمدير كلمات السر يشتغل.`,
            "2.5.7: أزرار تنقل العنصر كبديل للسحب."
          ],
          sol: R`النتيجة المعتادة في أول مرة: الـ focus بيستخبى ورا الـ header لما تعمل Tab وانت نازل (الحل [[scroll-padding-top]] بارتفاع الـ header على [[html]])، وفيه أزرار أيقونات أصغر من 24px (زرار قفل المودال أو أيقونات الجدول غالبًا)، وقوايم بتترتب بالسحب بس من غير أزرار.

في تسجيل الدخول: لو الـ paste اتمنع (فيه [[onPaste={e => e.preventDefault()}]] أو مكتبة بتعمل كده) ده سقوط في 3.3.8، شيله. ولو الـ checkout بيطلب عنوان الفاتورة والشحن كل واحد لوحده من غير اختيار «نفس العنوان»، ده 3.3.7.

لو ملقيتش حاجة خالص، جرّب على الموبايل: أغلب مشاكل 2.5.8 بتبان هناك.`
        },
        {
          cmd: "axe و Lighthouse",
          title: "الفحص الأوتوماتيك: بيمسك إيه وبيفوّت إيه؟",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة من غير [[lang]]، فيها [[<img>]] من غير alt، و [[<input type="email">]] من غير label، وزرار جواه svg بس، وكلام لونه [[#aaa]] على أبيض، و [[<a href="/x"></a>]] فاضي، ومفيش [[h1]]. axe هيطلّع أنهي rules؟ اكتب لستة، وبعدين شغّله.`, done: R`axe-core 4.14 على Chrome 156 طلّع ٧: [[button-name]] و [[color-contrast]] و [[html-has-lang]] و [[image-alt]] و [[label]] و [[link-name]] و [[page-has-heading-one]]. ولما شغّلته بـ [[withTags(["wcag2a","wcag2aa"])]] الأخيرة اختفت لأنها best-practice مش بند WCAG.`, sol: R`~~~html page.html
<!doctype html>
<html>
<head><meta charset="utf-8"><title>صفحة فيها مشاكل</title>
<style>p { color: #aaa; }</style></head>
<body>
<main>
  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="50" height="50">
  <input type="email">
  <button><svg width="16" height="16"><path d="M0 8h16"/></svg></button>
  <p>نص باهت</p>
  <a href="/x"></a>
</main>
</body>
</html>
~~~

**التوقع:** كل مشكلة ليها rule:

| المشكلة | الـ rule | النوع |
|---|---|---|
| من غير [[lang]] | [[html-has-lang]] | WCAG |
| [[<img>]] من غير alt | [[image-alt]] | WCAG |
| [[input]] من غير label | [[label]] | WCAG |
| زرار جواه svg بس | [[button-name]] | WCAG |
| [[#aaa]] على أبيض | [[color-contrast]] | WCAG |
| لينك فاضي | [[link-name]] | WCAG |
| مفيش h1 | [[page-has-heading-one]] | best-practice |

**فخ مهم في العربي:** التجربة الأولى كان الكلام «كلام باهت»، و axe مطلّعش [[color-contrast]] خالص، ولا حتى في [[incomplete]]. بنفس اللون: «نص باهت» اتمسك، و «كلام باهت» و «لا باهت» و «كلمة باهتة» و «سلام عليكم» مانمسكوش. الأقرب إن فحص axe للـ ligature بيتلخبط من الحروف العربي الموصولة. فمتعتمدش على axe لوحده للتباين في العربي: قس الألوان نفسها.

**الغلطة الشائعة:** تستنتج من التقرير النضيف إن الألوان سليمة.

~~~text الناتج
axe-core 4.14 على Chrome 156:
button-name ، color-contrast ، html-has-lang ، image-alt ،
label ، link-name ، page-has-heading-one

بـ wcag2a و wcag2aa بس: نفس اللستة من غير page-has-heading-one
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على صفحة واحدة شغّل axe و Lighthouse › Accessibility، وبعدين اعمل فيها ٣ حاجات غلط مفيش أداة بتشوفها: [[alt="IMG_2041.jpg"]]، وترتيب Tab بالعكس بـ [[order]] في flex، و [[outline: none]] على زرار من غير بديل.`, done: R`جدول: عدد مشاكل كل أداة قبل وبعد التغييرات التلاتة. الأرقام ماتغيرتش أو اتغيرت قليل، فكتبت إن الفحص الأوتوماتيك بيمسك «الحاجة موجودة ولا لأ» مش «هي صح ولا لأ».`, sol: R`نضيفة:

~~~html clean.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صفحة شكلها سليم</title>
<meta name="description" content="تجربة">
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  nav { display: flex; }
  nav a { padding: .75rem; }
</style>
</head>
<body>
<header><nav aria-label="الرئيسية"><a href="/1">واحد</a><a href="/2">اتنين</a><a href="/3">تلاتة</a></nav></header>
<main>
  <h1>منتجاتنا</h1>
  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="50" height="50" alt="سماعة سودا">
  <button id="plain" type="button">اشتري</button>
</main>
</body>
</html>
~~~

بعد الـ ٣ حاجات الغلط:

~~~html broken.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صفحة شكلها سليم</title>
<meta name="description" content="تجربة">
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  nav { display: flex; }
  nav a:first-child { order: 3; }
  nav a:nth-child(2) { order: 2; }
  nav a:last-child { order: 1; }
  nav a { padding: .75rem; }
  #plain { outline: none; }
</style>
</head>
<body>
<header><nav aria-label="الرئيسية"><a href="/1">واحد</a><a href="/2">اتنين</a><a href="/3">تلاتة</a></nav></header>
<main>
  <h1>منتجاتنا</h1>
  <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="50" height="50" alt="IMG_2041.jpg">
  <button id="plain" type="button">اشتري</button>
</main>
</body>
</html>
~~~

**الفكرة:** الأدوات بتسأل «الحاجة موجودة؟»، مش «هي صح؟».

- [[alt="IMG_2041.jpg"]]: فيه alt، فالأداة راضية. بس القارئ هيقول اسم ملف.
- [[order]]: ترتيب الشكل بقى عكس ترتيب الـ HTML، فـ Tab بيمشي عكس اللي شايفه.
- [[outline: none]]: مفيش إطار، والأدوات مبتجرّبش Tab فعلًا.

**القاعدة المعروفة:** الفحص الأوتوماتيك بيلاقي جزء من المشاكل بس. الباقي محتاج جولة كيبورد وقارئ شاشة، وده في الدرس اللي جاي.

**الغلطة الشائعة:** تعتبر 100 في Lighthouse شهادة accessibility.

~~~text الناتج
                        axe     Lighthouse
الصفحة النضيفة          0       100
بعد الـ ٣ حاجات الغلط   0       100

الأرقام متغيرتش خالص، رغم إن الصفحة بقت أوحش بوضوح.
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** اختبار Playwright واحد بيلف على ٣ صفحات بـ [[for]]، ويشغّل axe بـ [[.exclude("#chat-widget")]] لويدجت من برا، ويحط الـ JSON كـ attachment بـ [[testInfo.attach]].`, done: R`لو صفحة واحدة فيها مشكلة الاختبار بيقع ويقول اسمها، والتقرير فيه ملف JSON لكل صفحة، والويدجت مش داخل في النتيجة.`, sol: R`~~~js a11y.spec.mjs
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/home.html", "/products.html", "/contact.html"];

for (const path of pages) {
  test($__btمفيش مشاكل accessibility في $__{path}$__bt, async ({ page }, testInfo) => {
    await page.goto(process.env.BASE + path);

    const results = await new AxeBuilder({ page }).exclude("#chat-widget").analyze();

    await testInfo.attach($__btaxe$__{path.replace("/", "-")}.json$__bt, {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json",
    });

    const problems = results.violations.map((v) => $__bt$__{v.id}: $__{v.nodes.map((n) => n.target).join(", ")}$__bt);
    expect(problems).toEqual([]);
  });
}
~~~

~~~js playwright.config.mjs
export default {
  testDir: ".",
  testMatch: "a11y.spec.mjs",
  outputDir: "results",
  reporter: [["line"], ["json", { outputFile: "report.json" }]],
  use: { channel: "chrome", headless: true },
};
~~~

~~~bash
npm i -D @playwright/test @axe-core/playwright
BASE=http://localhost:4000 npx playwright test
~~~

**ليه شغال:**

- [[for]] بيعمل test لكل صفحة، فالفشل بيقول اسم الصفحة.
- [[.exclude("#chat-widget")]]: الويدجت مش بتاعك، فمش هتقدر تصلّحه. استبعده بالاسم، وخليك واعي إنك استبعدته.
- [[testInfo.attach]] بيحط الـ JSON في التقرير، قبل الـ [[expect]]، عشان يتحفظ حتى لو الاختبار وقع.

في المعمل [[home.html]] فيها زرار من غير اسم جوه [[#chat-widget]]، و [[contact.html]] فيها صورة من غير alt.

**الغلطة الشائعة:** تحط الـ attach بعد الـ [[expect]]. لما الاختبار يقع، السطر ده مبيشتغلش، وتخسر التقرير في الوقت اللي محتاجه.

~~~text الناتج
1 failed
2 passed (3.0s)

/contact.html:
+ Array [
+   "image-alt: img",
+ ]

attachments:
home      نجح   axe-home.html.json       (زرار الويدجت مش في النتيجة)
products  نجح   axe-products.html.json
contact   فشل   axe-contact.html.json
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** اختبار مكتوب [[expect(results.violations.length).toBe(0)]]، ولما بيقع بيقول بس «Expected: 0، Received: 3». غيّره بحيث الفشل يطبع اسم كل rule وأول selectors.`, done: R`الفشل بقى بيطبع حاجة زي [[image-alt: img.hero]] لكل مشكلة، من [[violations.map(v => v.id + ": " + v.nodes.map(n => n.target).join(", "))]] أو [[toEqual([])]].`, sol: R`قبل:

~~~js before.spec.mjs
expect(results.violations.length).toBe(0);
~~~

بعد:

~~~js after.spec.mjs
const problems = results.violations.map((v) => $__bt$__{v.id}: $__{v.nodes.map((n) => n.target).join(", ")}$__bt);
expect(problems).toEqual([]);
~~~

**ليه:** [[toBe(0)]] بيقارن رقم، فالفشل بيقول «3» بس، وتضطر تشغّل الاختبار تاني وتطبع. [[toEqual([])]] بيقارن لستة نصوص، فـ Playwright بيطبع الـ diff كله: اسم الـ rule وأول selector، من غير تغيير في معنى الاختبار.

**الغلطة الشائعة:** تطبع [[violations]] كلها بـ [[console.log]]. ده آلاف الأسطر من HTML. سطر لكل مشكلة كفاية، والـ JSON في الـ attachment.

~~~text الناتج
قبل:
Expected: 0
Received: 1

بعد:
+ Array [
+   "image-alt: img",
+ ]
~~~` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** شغّل Lighthouse من الترمنال بـ [[--only-categories=accessibility --output=json]] على صفحتك، واكتب سكربت بيقرا الملف ويطبع الدرجة (‏[[categories.accessibility.score]] × 100) وكل audit درجته صفر بعنوانه وعدد عناصره.`, done: R`السكربت بيطبع نفس الدرجة اللي في DevTools، ولستة المشاكل بنفس عددها، ولو الملف مش موجود أو مش JSON بيطبع رسالة واضحة.`, sol: R`~~~bash
npx lighthouse http://localhost:4000/page --quiet --only-categories=accessibility --output=json --output-path=lh.json
node lh-report.mjs lh.json
~~~

~~~js lh-report.mjs
import { readFileSync } from "node:fs";

const file = process.argv[2] ?? "lh.json";
let report;
try {
  report = JSON.parse(readFileSync(file, "utf8"));
} catch (err) {
  console.error($__btمش قادر أقرا $__{file}: $__{err.message}$__bt);
  process.exit(1);
}

const category = report.categories.accessibility;
console.log($__btالدرجة: $__{Math.round(category.score * 100)}$__bt);

for (const ref of category.auditRefs) {
  const audit = report.audits[ref.id];
  if (audit.score !== 0) continue;
  const count = audit.details?.items?.length ?? 0;
  console.log($__bt- $__{audit.title} ($__{count})$__bt);
}
~~~

**ليه:**

- [[categories.accessibility.score]] من 0 لـ 1، فبنضرب في 100.
- [[auditRefs]] لستة الـ audits بتاعة الفئة دي، والنتيجة نفسها في [[report.audits[id]]].
- [[score !== 0]] بيتخطى اللي عدّى، واللي [[null]] (مش منطبق).
- [[details?.items?.length ?? 0]]: مش كل audit ليه عناصر.
- [[try/catch]] بيغطي الملف المش موجود والـ JSON البايظ، و [[process.exit(1)]] عشان الـ CI يعرف.

**الغلطة الشائعة:** تعمل [[score < 1]]. بعض الـ audits بتاخد درجات جزئية أو [[null]]، فالعدد يختلف عن اللي الأداة بتعرضه.

~~~text الناتج
$ node lh-report.mjs lh.json
الدرجة: 44
- Buttons do not have an accessible name (1)
- $__bt<html>$__bt element does not have a $__bt[lang]$__bt attribute (1)
- Image elements do not have $__bt[alt]$__bt attributes (1)
- Form elements do not have associated labels (1)
- Links do not have a discernible name (1)

$ node lh-report.mjs nope.json
مش قادر أقرا nope.json: ENOENT: no such file or directory ...
(exit 1)

ملف مش JSON:
مش قادر أقرا targets.js: Unexpected token '.' ... is not valid JSON
(exit 1)
~~~

(التقرير ده اتولّد من الـ Node API بتاع Lighthouse 13.6، بنفس شكل الـ JSON.)` },
          ],
          desc: R`axe DevTools (extension من Deque) و Lighthouse › Accessibility (جوه Chrome DevTools، وبيستخدم axe-core من جوه) بيفحصوا الصفحة في ثواني: صور من غير alt، وحقول من غير label، وتباين ضعيف، وأزرار ملهاش اسم، و ids متكررة، و aria غلط، وصفحة من غير [[lang]].

بس بيفوّتوا كتير: مبيعرفوش الـ alt ده بيوصف الصورة صح ولا لأ، ولا ترتيب الـ focus منطقي، ولا فيه keyboard trap، ولا الـ div اللي عليه onClick المفروض يبقى زرار. الأرقام المشهورة إن الأدوات دي بتغطي جزء بس من قواعد WCAG (أقل من النص في أغلب التقديرات)، فـ Lighthouse 100 مش معناها إن الموقع accessible.

وتقدر تشغّل axe في الاختبارات نفسها (Playwright مثلًا) عشان أي مشكلة واضحة متدخلش الـ main تاني.`,
          example: R`import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('الصفحة الرئيسية مفيهاش مشاكل a11y واضحة', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});`,
          try: R`اعمل صفحة فيها 5 مشاكل: [[<input placeholder="ابحث">]] من غير label، و [[<img src="a.png">]] من غير alt، و [[<button>]] جواه أيقونة SVG بس، وكلام [[color: #aaa]] على أبيض، و [[<div onclick="save()">حفظ</div>]]. شغّل axe DevTools و Lighthouse › Accessibility، وعدّ كل واحد مسك كام من الـ 5. أو من التيرمنال: [[npx lighthouse http://localhost:5173 --only-categories=accessibility --view]].`,
          flag: "script",
          deep: {
            why: R`الفحص الأوتوماتيك رخيص وسريع ومبيتعبش، فبيمسك المشاكل الواضحة قبل ما توصل لحد. بس لو اعتمدت عليه لوحده هتفتكر إنك خلصت وانت لسه في النص، ودا اللي بيحصل في مشاريع كتير: score أخضر وموقع مستحيل بالكيبورد.`,
            how: R`axe-core بيمشي على الـ DOM ويطبق قواعد (rules) ليها tags زي [[wcag2a]] و [[wcag2aa]] و [[wcag22aa]] و [[best-practice]]. كل قاعدة بتطلّع violations (غلط أكيد) أو incomplete (محتاج إنسان يبص، زي تباين الكلام فوق صورة أو gradient). و axe قاصد يبقى «zero false positives»: لو قال غلط يبقى غلط، بس ده معناه إنه بيسكت عن حاجات مش متأكد منها.

Lighthouse بيشغّل جزء من قواعد axe ويحسب score بأوزان. الـ score ده للمتابعة بس: مشكلة واحدة critical (زرار الدفع ملوش اسم) ممكن تسيب الـ score فوق 90.

اللي مستحيل على أداة: الـ alt مناسب؟ ([[alt="صورة"]] بيعدّي). العنوان بيوصف المحتوى؟ ترتيب الـ Tab منطقي؟ المودال بيرجّع الـ focus؟ div عليه onClick (الأداة شايفة div عادي فيه كلام، والـ listener مش باين في الـ HTML). المحتوى بيتقري بترتيب منطقي بعد CSS grid؟

في الـ CI: [[@axe-core/playwright]] مع [[withTags]] بيمنع أي regression واضحة. وفي React فيه كمان axe في اختبارات Vitest (الدرس الجاي).`,
            when: R`axe DevTools وانت بتشتغل على أي صفحة جديدة. Lighthouse قبل الـ release. و axe في Playwright على أهم الصفحات (الرئيسية، والتسجيل، والدفع) في كل PR. وبعد كل ده، الفحص اليدوي (بعد درسين).`,
            mistakes: R`Lighthouse 100 = تمام. تتجاهل الـ incomplete أو «Needs review» (غالبًا فيها التباين الحقيقي). تفحص الصفحة وهي مقفولة بس (المودال والمنيو المفتوحة ليهم مشاكل تانية، افتحهم وافحص تاني). تحط [[disableRules]] عشان الاختبار يعدّي. وفي الانترفيو: «بتختبر الـ accessibility إزاي؟» لو قلت Lighthouse بس ده ضعيف: قول أوتوماتيك (axe في CI) + lint + كيبورد يدوي + قارئ شاشة للمسارات المهمة.`
          },
          teach: R`## اختبار Playwright بيفتح الصفحة ويشغّل axe عليها

المثال اختبار واحد: افتح الصفحة، شغّل axe-core بقواعد WCAG من A لـ 2.2 AA، واتأكد إن مفيش ولا مخالفة. شغّلناه حرفيًا ([[@playwright/test]] 1.63 و [[@axe-core/playwright]] 4.13 على Chrome) على صفحتين: صفحة سليمة، وصفحة فيها الـ 5 مشاكل اللي في «جرّب».

---

## ١. الـ imports

~~~text a11y.spec.mjs
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
~~~

- [[{ test, expect }]]: الأقواس دي معناها «هات الحاجتين دول بالاسم» من الباكدج. [[test]] بيعرّف اختبار، و [[expect]] بيتأكد من قيمة.
- [[AxeBuilder]] من غير أقواس: ده الـ default export، الحاجة الأساسية اللي الباكدج بيطلّعها. اسمه Builder لأنك بتبني الإعداد خطوة خطوة وبعدين تشغّله.

## ٢. الاختبار

~~~text
test('الصفحة الرئيسية مفيهاش مشاكل a11y واضحة', async ({ page }) => {
~~~

- أول argument: اسم الاختبار، بيظهر في النتيجة.
- [[async ({ page }) => {]]: دالة [[async]] (جواها [[await]]). و Playwright بيدّيها object فيه حاجات جاهزة اسمها fixtures، و [[{ page }]] بيطلّع منه تاب متصفح جديد.
- [[a11y]] اختصار accessibility: 11 حرف بين الـ a والـ y.

## ٣. فتح الصفحة

~~~text
await page.goto('/');
~~~

[[await]] = استنى لحد ما الصفحة تحمّل. و [[/]] مسار نسبي، بيتركّب على [[baseURL]] اللي في [[playwright.config]] (عندنا كان سيرفر محلي على [[http://localhost:47913]]).

## ٤. تشغيل axe (السطور 5 لـ 7)

~~~text
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  .analyze();
~~~

من جوه لبرة:

1. [[new AxeBuilder({ page })]]: اعمل builder مربوط بالتاب ده.
2. [[.withTags([...])]]: شغّل القواعد اللي عليها التاجات دي بس. كل تاج = نسخة ومستوى:

| التاج | يعني |
|---|---|
| [[wcag2a]] و [[wcag2aa]] | قواعد WCAG 2.0 مستوى A و AA |
| [[wcag21a]] و [[wcag21aa]] | اللي اتزاد في 2.1 |
| [[wcag22aa]] | اللي اتزاد في 2.2 (زي [[target-size]]) |

ومن غير [[best-practice]]: دي قواعد كويسة بس مش جزء من WCAG، فممكن توقّع الاختبار على حاجة مش مطلوبة قانونًا.

3. [[.analyze()]]: بيحقن axe-core في الصفحة ويشغّله ويرجّع النتيجة. النقط اللي في أول السطور معناها إن كل method بترجّع نفس الـ builder، فبتكمّل عليه (method chaining).

[[results]] فيه أربع قوايم: [[violations]] (غلط أكيد)، و [[incomplete]] (محتاج إنسان)، و [[passes]]، و [[inapplicable]] (القاعدة ملهاش عناصر تفحصها).

## ٥. الحكم

~~~text
expect(results.violations).toEqual([]);
~~~

[[toEqual([])]] = لازم تبقى array فاضية. لو فيها حاجة، الاختبار بيقع ويطبع الفرق.

---

## النتيجة على الصفحة السليمة

~~~text الناتج (Playwright)
  ok 1 a11y.spec.mjs:3:1 › الصفحة الرئيسية مفيهاش مشاكل a11y واضحة (1.5s)
  1 passed (2.7s)
~~~

## النتيجة على صفحة الـ 5 مشاكل

~~~text الناتج (مختصر)
violations: button-name (critical, 1 عنصر), image-alt (critical, 1 عنصر)

Error: expect(received).toEqual(expected) // deep equality
- Expected  -   1
+ Received  + 173
+     "id": "button-name",
+     "impact": "critical",
+     "message": "Element does not have inner text that is visible to screen readers",
~~~

الـ 173 سطر دول تفاصيل كل مخالفة: العنصر، وليه، ولينك [[helpUrl]] بيشرح الحل.

| المشكلة | axe مسكها؟ |
|---|---|
| [[<img src="a.png">]] من غير alt | ✓ [[image-alt]] |
| [[<button>]] جواه SVG بس | ✓ [[button-name]] |
| [[<input placeholder="ابحث">]] من غير label | ✗ بيعتبر الـ placeholder اسم |
| [[<div onclick>]] | ✗ شايفه div عادي فيه كلام |
| [[color: #aaa]] على أبيض | ✗ لو الكلام عربي، ✓ لو إنجليزي |

### ليه التباين اتفوّت في الكلام العربي؟

جربنا [[<p style="color:#aaa">]] بكلام إنجليزي: axe طلّع [[color-contrast]] بنسبة 2.32. وبنفس الصفحة بكلام عربي متصل: ولا violation ولا incomplete. ولما سألنا axe نفسه ([[axe.commons.text.isIconLigature]]) عن الكلام «كلام باهت» قال [[true]]، وعن «ك ل ا م» (حروف منفصلة) قال [[false]]. يعني الحروف العربية المتصلة شكلها عنده زي أيقونة من خط أيقونات (icon ligature)، فبيتخطاها. ولقينا نفس الحاجة في Lighthouse 13.5:

~~~text Lighthouse › Accessibility على نفس الصفحة
كلام عربي:     score 75   فشل: button-name, image-alt         (color-contrast ناجح!)
كلام إنجليزي:  score 67   فشل: button-name, color-contrast, image-alt
~~~

فالـ score العالي على موقع عربي مش ضمان للتباين: قيسه بإيدك.

**وفيه حاجة بتخلّيها أسوأ في صفحة كاملة:** axe بيعدّ لكل [[font-family]]. بعد ٣ نصوص في نفس الخط كلهم «ligature»، بيعتبر **الخط كله** خط أيقونات ويتخطى كل كلام بيه في الصفحة، حتى الكلام اللي لو لوحده كان هيتقاس. اتقاس على axe-core 4.14.0 و Chrome 157:

~~~text color-contrast على فقرة عربي لونها #aaa
صفحة فيها الفقرة دي بس:                          violations 1 (2.32)
نفس الفقرة في صفحة فيها هيدر عربي (لوجو و ٣ لينكات): inapplicable، ولا عنصر اتقاس
isIconLigature بالترتيب: ICON (title)، ICON «بيت الخط»، ICON «الكورسات»، ICON «أسئلة»…
~~~

يعني الفقرة الواحدة اتمسكت، وفي صفحة حقيقية الهيدر لوحده كفاية يطفي القاعدة. أداة بتحسب التباين بنفسها موجودة في مشروع «أداة فحص بتاعتك» تحت.

---

## Lighthouse من الترمنال

~~~bash
npx lighthouse http://localhost:5173 --only-categories=accessibility --view
~~~

- [[npx lighthouse]]: شغّل Lighthouse من npm من غير تسطيب دايم.
- [[--only-categories=accessibility]]: الـ accessibility بس (من غير Performance و SEO...).
- [[--view]]: افتح التقرير في المتصفح بعد ما يخلص. (احنا استخدمنا [[--output=json]] عشان نقرا الأرقام.)

## الخلاصة

- [[AxeBuilder]] + [[withTags]] + [[analyze]] + [[toEqual([])]] = اختبار بيوقّع أي مشكلة a11y واضحة في الـ CI.
- الأداة بتمسك اللي ملوش اسم أو alt بثقة، وبتفوّت المعنى (placeholder بدل label، و div بدل button).
- في المواقع العربي، فحص التباين الأوتوماتيك ممكن يسكت تمامًا.`,
          lines: [
            R`[[test]] و [[expect]] من Playwright Test: الأولى بتعرّف اختبار، والتانية بتتأكد من النتيجة.`,
            "axe مخصوص لـ Playwright.",
            R`اختبار واحد للصفحة الرئيسية، و [[page]] متصفح جديد فاضي بيتعمل لكل اختبار.`,
            "افتح الصفحة (الـ baseURL في الـ config).",
            "شغّل axe على الصفحة المفتوحة...",
            "...بقواعد WCAG من A لـ 2.2 AA بس (من غير best-practice).",
            R`...و [[analyze()]] بيرجّع object فيه [[violations]] و [[passes]] و [[incomplete]].`,
            "أي violation يوقّع الاختبار ويطبع العناصر والسبب.",
            "قفلة."
          ],
          sol: R`لما جربنا الصفحة دي بـ axe-core: مسك [[image-alt]] (الصورة من غير alt) و [[button-name]] (الزرار اللي فيه أيقونة بس)، الاتنين critical. والتباين بيطلع violation ([[color-contrast]]، 2.32:1) **لو الكلام إنجليزي بس**: جربنا [[#aaa]] على كلام عربي متصل («كلام باهت») و axe-core (4.13 و 4.14) مقالش حاجة خالص، لأنه بيفتكر الحروف العربية المتصلة icon ligature (زي أيقونات الخطوط) فبيتخطاها، و Lighthouse 13.5 علّم الـ audit ناجح. يعني على كلام إنجليزي 3 من 5، وعلى كلام عربي 2 من 5، فالتباين في موقع عربي لازم تقيسه بإيدك من DevTools.

اللي فات: الـ input اللي عليه placeholder بس، axe بيعتبر الـ placeholder اسم فمبيقولش حاجة (مع إن الـ placeholder مش بديل للـ label، شوف درس «form و label»). والـ div اللي عليه onclick مبيظهرش خالص لأن الأداة مش عارفة إنه المفروض يبقى زرار.

Lighthouse 13.5 طلّع نفس النتيجة: score ‏75 للصفحة العربي (فشل [[button-name]] و [[image-alt]] بس)، و 67 لنفس الصفحة بكلام إنجليزي (زائد [[color-contrast]]). الدرس: 2 أو 3 من 5 مشاكل حقيقية عدّوا من الأداة.`
        },
        {
          cmd: "jsx-a11y و getByRole",
          title: "امسك غلط الـ accessibility وانت بتكتب وفي الاختبارات",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** أنهي سطر من دول jsx-a11y recommended هيعترض عليه، وبأنهي rule: [[<img src="a.png" />]]، و [[<div onClick={f}>x</div>]]، و [[<a href="#" onClick={f}>y</a>]]، و [[<button onClick={f}>z</button>]]، و [[<input autoFocus />]]؟`, done: R`eslint 9.39 و jsx-a11y 6.10 طلّعوا ٥ errors: [[alt-text]] للصورة، و [[click-events-have-key-events]] و [[no-static-element-interactions]] للـ div، و [[anchor-is-valid]] للينك («Anchor used as a button»)، و [[no-autofocus]]. والزرار مفيهوش حاجة.`, sol: R`~~~jsx Sample.jsx
export function Sample({ f }) {
  return (
    <>
      <img src="a.png" />
      <div onClick={f}>x</div>
      <a href="#" onClick={f}>y</a>
      <button onClick={f}>z</button>
      <input autoFocus />
    </>
  );
}
~~~

~~~js eslint.config.mjs
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    files: ["**/*.jsx"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    ...jsxA11y.flatConfigs.recommended,
  },
];
~~~

~~~bash
npm i -D eslint@9 eslint-plugin-jsx-a11y
npx eslint Sample.jsx
~~~

**كل سطر:**

- الصورة: مفيش [[alt]].
- الـ div: عليه [[onClick]] من غير كيبورد، و div أصلًا مش عنصر تفاعلي. فبيطلع errorين، والتصليح الواحد هو [[<button>]].
- [[<a href="#">]]: لينك بيتصرف كزرار. لو مش بيودّي مكان، يبقى [[<button>]].
- الزرار سليم.
- [[autoFocus]]: بينقل القارئ فجأة من غير سياق.

**الغلطة الشائعة:** تصلّح الـ div بإضافة [[onKeyDown]] و [[role]] و [[tabIndex]]. كل ده بديل أوحش عن [[<button>]].

~~~text الناتج
سطر 4   jsx-a11y/alt-text
سطر 5   jsx-a11y/click-events-have-key-events
سطر 5   jsx-a11y/no-static-element-interactions
سطر 6   jsx-a11y/anchor-is-valid    Anchor used as a button.
سطر 8   jsx-a11y/no-autofocus

٥ errors من eslint 9.39 و jsx-a11y 6.10. سطر الزرار مفيهوش حاجة.
~~~` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[getByRole("textbox", { name: "الإيميل" })]] بيقع بـ «Unable to find an accessible element with the role "textbox" and name "الإيميل"». الـ label مكتوب [[<label for="e">الإيميل *</label>]]. ليه؟ وصلّحه مرتين: مرة في الاختبار ومرة في الـ HTML.`, done: R`عرفت إن الاسم بقى «الإيميل *» بالنجمة فمش مطابق بالظبط. في الاختبار [[name: /الإيميل/]] لقاه، وفي الـ HTML النجمة بقت [[<span aria-hidden="true">*</span>]] والحقل عليه [[required]]. ونفس الرسالة طلعت لـ label مش مربوط بـ for (اتجرّب على Testing Library 10.4).`, sol: R`~~~jsx name.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

afterEach(cleanup);   // من غير globals: true الـ cleanup مش بيشتغل لوحده

test("الاسم فيه النجمة: الاسم الكامل مش مطابق", () => {
  render(<><label htmlFor="e">الإيميل *</label><input id="e" /></>);
  expect(() => screen.getByRole("textbox", { name: "الإيميل" })).toThrow(/Unable to find an accessible element/);
});

test("تصليح الاختبار: regex", () => {
  render(<><label htmlFor="e">الإيميل *</label><input id="e" /></>);
  expect(screen.getByRole("textbox", { name: /الإيميل/ })).toBeTruthy();
});

test("تصليح الـ HTML: النجمة aria-hidden", () => {
  render(<><label htmlFor="e">الإيميل <span aria-hidden="true">*</span></label><input id="e" required /></>);
  expect(screen.getByRole("textbox", { name: "الإيميل" })).toBeTruthy();
});

test("label مش مربوط بـ for: نفس الرسالة", () => {
  render(<><label>الإيميل</label><input /></>);
  expect(() => screen.getByRole("textbox", { name: "الإيميل" })).toThrow(/Unable to find an accessible element/);
});
~~~

**ليه وقع:** [[name]] نص بيتقارن بالمطابقة الكاملة. الاسم المحسوب من الـ label هو «الإيميل *» بالنجمة، فمش مساوي لـ «الإيميل».

**التصليحين:**

- في الاختبار: regex [[/الإيميل/]] بتطابق جزء من الاسم.
- في الـ HTML: النجمة [[aria-hidden="true"]]، فالاسم يبقى «الإيميل»، و [[required]] هو اللي بيقول للقارئ إن الحقل إلزامي. ده الأحسن، لأن القارئ كان بيقول «الإيميل نجمة».

**[[afterEach(cleanup)]]:** من غير [[globals: true]] في vitest، الـ cleanup مبيشتغلش، فالـ render بتاع كل test بيفضل، و [[getByRole]] يلاقي حقلين. قابلتني في التشغيل الأول.

**الغلطة الشائعة:** رسالة «Unable to find» هي نفسها لما الـ label مش مربوط أصلًا. افتح DOM المطبوع وشوف الاسم.

~~~text الناتج
Test Files  1 passed
     Tests  4 passed

الاسم «الإيميل *» مع name: "الإيميل":
Unable to find an accessible element with the role "textbox" and name "الإيميل"
ونفس الرسالة لـ label مش مربوط بـ for.
~~~` },
            { lvl: 'تطبيق', t: R`**refactor:** اختبار مليان [[container.querySelector(".btn-primary")]] و [[getByTestId("email-input")]]. غيّره كله لـ [[getByRole]] بالاسم و [[getByLabelText]].`, done: R`مفيش ولا querySelector ولا getByTestId، والاختبارات لسه خضرا، ولو شلت اسم الزرار أو ربط الـ label بيقع اختبار. فالاختبار بقى بيختبر الـ accessibility ببلاش.`, sol: R`قبل:

~~~jsx before.test.jsx
const { container } = render(<Signup onSubmit={onSubmit} />);
await user.type(screen.getByTestId("email-input"), "sara@example.com");
await user.click(container.querySelector(".btn-primary"));
~~~

بعد:

~~~jsx signup.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Signup } from "./Signup";

test("التسجيل بيبعت الفورم", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn((e) => e.preventDefault());
  render(<Signup onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText("الإيميل"), "sara@example.com");
  await user.click(screen.getByRole("button", { name: "سجّل" }));

  expect(onSubmit).toHaveBeenCalledOnce();
});
~~~

~~~jsx Signup.jsx
export function Signup({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">الإيميل</label>
      <input id="email" type="email" className="field" />
      <button type="submit" className="btn-primary">سجّل</button>
    </form>
  );
}
~~~

**الفرق:** [[.btn-primary]] تفصيلة شكل، و [[data-testid]] مش موجود عند المستخدم. [[getByRole("button", { name })]] و [[getByLabelText]] بيدوّروا زي المستخدم الحقيقي. لو غيّرت كلاس الزرار الاختبار يفضل أخضر، ولو شلت اسمه يقع. ده بالظبط المطلوب.

**الغلطة الشائعة:** تستخدم [[getByText]] للزرار. ده هيلاقي أي نص، حتى لو مش زرار.

~~~text الناتج
✓ التسجيل بيبعت الفورم
Test Files  passed ، Tests passed
مفيش querySelector ولا getByTestId في الملف
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لمكوّن Dialog: الزرار بيفتحه، والـ focus بيروح لأول حقل جواه، و Escape بيقفله، والـ focus بيرجع لزرار الفتح، و axe مفيهوش violations وهو مفتوح.`, done: R`الاختبار بيستخدم [[toHaveFocus()]] مرتين و [[queryByRole("dialog")]] بيبقى [[null]] بعد Escape، ولو شلت رجوع الـ focus من المكوّن بيقع على السطر ده بالظبط.`, sol: R`~~~jsx EditName.jsx
import { Dialog } from "radix-ui";

export function EditName({ brokenReturn = false }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>عدّل الاسم</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={brokenReturn ? (e) => e.preventDefault() : undefined}
        >
          <Dialog.Title>الاسم الجديد</Dialog.Title>
          <label htmlFor="name">الاسم</label>
          <input id="name" />
          <Dialog.Close>قفل</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
~~~

~~~jsx dialog.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import "@testing-library/jest-dom/vitest";
import axe from "axe-core";
import { EditName } from "./EditName";

afterEach(cleanup);

test("الفتح والقفل والـ focus و axe", async () => {
  const user = userEvent.setup();
  render(<EditName />);

  const opener = screen.getByRole("button", { name: "عدّل الاسم" });
  await user.click(opener);

  const dialog = screen.getByRole("dialog", { name: "الاسم الجديد" });
  expect(screen.getByLabelText("الاسم")).toHaveFocus();

  // jsdom مبيرسمش، فقواعد الألوان بتتقفل
  const { violations } = await axe.run(dialog, { rules: { "color-contrast": { enabled: false }, region: { enabled: false } } });
  expect(violations.map((v) => v.id)).toEqual([]);

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(opener).toHaveFocus();
});
~~~

**ليه:**

- [[getByRole("dialog", { name })]] بيأكد إن فيه role واسم في نفس السطر.
- [[toHaveFocus()]] مرتين: أول حقل بعد الفتح، وزرار الفتح بعد القفل.
- [[queryByRole]] بيرجع [[null]] بعد Escape.
- axe في jsdom: مفيش رسم، فقفلنا [[color-contrast]]. و [[region]] قفلناها لأننا بنفحص الـ dialog لوحده.

**ازاي تثبت إن الاختبار بيمسك:** [[onCloseAutoFocus]] بـ [[preventDefault]] بيعطّل رجوع الـ focus. عملت prop تجريبي، والاختبار وقع على سطر [[toHaveFocus]].

**الغلطة الشائعة:** تستنى في اختبار jsdom تكشف مشكلة ألوان أو layout. جوه jsdom مفيش رسم، فده شغل Playwright.

~~~text الناتج
المكوّن السليم:
✓ الفتح والقفل والـ focus و axe

من غير رجوع الـ focus:
FAIL  من غير رجوع الـ focus
Error: expect(element).toHaveFocus()
Expected element with focus: زرار «عدّل الاسم»
> expect(opener).toHaveFocus();
~~~` },
          ],
          desc: R`[[eslint-plugin-jsx-a11y]] بيقرا الـ JSX وانت بتكتب ويطلّع error على [[<img>]] من غير alt، و [[<div onClick>]] من غير كيبورد، و [[<a href="#" onClick>]] المفروض يبقى زرار. (إعداد ESLint نفسه في «تاب فحص الكود».)

وفي الاختبارات، Testing Library بتدوّر على العناصر زي قارئ الشاشة: [[getByRole('button', { name: 'حفظ' })]]. لو الاختبار مش لاقي الزرار بالطريقة دي، يبقى قارئ الشاشة كمان مش لاقيه، فالاختبار نفسه بقى اختبار accessibility.

ومع [[user-event]] تقدر تعمل [[user.tab()]] وتتأكد إن الـ focus راح المكان الصح.`,
          example: R`// eslint.config.mjs
import jsxA11y from 'eslint-plugin-jsx-a11y';
export default [jsxA11y.flatConfigs.recommended];
// Signup.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { expect, test } from 'vitest';
test('الخطأ مربوط بالحقل والفورم بيتوصل بالكيبورد', async () => {
  const user = userEvent.setup();
  const { container } = render(<Signup />);
  const email = screen.getByRole('textbox', { name: 'الإيميل' });
  await user.tab();
  expect(email).toHaveFocus();
  await user.click(screen.getByRole('button', { name: 'سجّل' }));
  expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(email).toHaveAccessibleDescription('اكتب الإيميل');
  expect((await axe.run(container)).violations).toEqual([]);
});`,
          try: R`في مشروع React فيه ESLint، ركّب [[npm i -D eslint-plugin-jsx-a11y]] وضيفه للـ config، واكتب component فيه [[<div onClick={save}>حفظ</div>]] و [[<img src="x.png" />]] و [[<a href="#" onClick={save}>حفظ</a>]] و [[<input placeholder="ابحث" />]] وشغّل [[npx eslint]]. وبعدين اكتب اختبار فيه [[screen.getByRole('button', { name: 'حفظ' })]] على نفس الـ component واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`أرخص وقت تصلّح فيه غلط accessibility هو وانت بتكتب السطر. الـ lint بيمسك الغلطات المتكررة (div بيتضغط، img من غير alt) قبل الـ commit، والاختبارات بـ getByRole بتضمن إن المكون لسه ليه اسم و role صح بعد أي refactor.`,
            how: R`jsx-a11y تحليل ثابت: بيشوف الكود مش الصفحة. فبيعرف إن [[<div onClick>]] ملوش [[onKeyDown]] ولا role، بس ميعرفش لو [[<Button>]] بتاعك بيطلّع div ولا button (إلا لو عرّفته في [[settings]] بتاعت components). و [[recommended]] مبيشغّلش كل القواعد، مثلًا حقل عليه placeholder بس بيعدّي.

[[getByRole]] بيحسب الـ role والـ accessible name بنفس قواعد المتصفح (من الـ label، و aria-label، والمحتوى). و [[textbox]] للـ input العادي، و [[spinbutton]] لـ number، و [[combobox]] لـ select، و [[checkbox]] و [[radio]] و [[group]] لـ fieldset، و [[columnheader]] لـ th. وترتيب أولوية الـ queries في دوكس Testing Library: [[getByRole]] الأول، و [[getByLabelText]]، وفي الآخر خالص [[getByTestId]].

[[toHaveFocus]] و [[toHaveAccessibleDescription]] من [[@testing-library/jest-dom]]، وبتتفعل بـ [[import '@testing-library/jest-dom/vitest']] في ملف الـ setup. و [[axe.run(container)]] على الـ container مش الـ body، عشان قواعد الصفحة الكاملة (زي landmarks) متطلعش على component لوحده.

و Next.js بيجي ومعاه جزء من قواعد jsx-a11y في [[eslint-config-next]] كـ warnings، فلو عايز الـ recommended كاملة ضيف الـ plugin صريح. ولو npm اشتكى من peer dependency مع نسخة ESLint أحدث من اللي الـ plugin معلن إنه بيدعمها، شوف صفحة الـ plugin قبل ما تستخدم [[--legacy-peer-deps]] (في تجربتنا مع ESLint 10 اشتغل عادي).`,
            when: R`jsx-a11y في أي مشروع React من أول يوم، ومع lint-staged قبل الـ commit («تاب فحص الكود»). getByRole في كل اختبار component. و axe في الاختبارات للمكونات المعقدة (فورمات، ومودالات، وجداول).`,
            mistakes: R`[[getByTestId]] في كل حتة: الاختبار بيعدّي حتى لو الزرار ملوش اسم. تطفي قاعدة jsx-a11y بـ [[eslint-disable]] بدل ما تصلّح. تفتكر إن الـ lint بيشوف الـ components بتاعتك من جوه. [[fireEvent.click]] بدل [[user-event]] (مبيعملش focus ولا keyboard زي المستخدم). وفي الانترفيو: «ليه getByRole أحسن من getByTestId؟» لأنه بيختبر اللي المستخدم (وقارئ الشاشة) شايفه، ولو فشل يبقى فيه مشكلة حقيقية.`
          },
          teach: R`## ملفين: إعداد ESLint، واختبار بيدوّر زي قارئ الشاشة

المثال فيه ملف [[eslint.config.mjs]] بيشغّل قواعد jsx-a11y، وملف اختبار [[Signup.test.jsx]] بيرسم فورم ويمشي فيه بالكيبورد ويتأكد من الـ aria. نفّذناهم حرفيًا: ESLint 9.39 و eslint-plugin-jsx-a11y 6.10، و Vitest 5 بـ jsdom و Testing Library، على component [[Signup]] كتبناه (label «الإيميل» مربوط بالحقل، وزرار «سجّل»، ولو الحقل فاضي رسالة «اكتب الإيميل»).

---

## ١. [[eslint.config.mjs]]

~~~text eslint.config.mjs
import jsxA11y from 'eslint-plugin-jsx-a11y';
export default [jsxA11y.flatConfigs.recommended];
~~~

- [[.mjs]]: ملف JavaScript بصيغة الـ modules ([[import]] و [[export]]).
- [[jsxA11y.flatConfigs.recommended]]: الـ plugin جايب إعدادات جاهزة. [[flatConfigs]] = بصيغة الـ flat config الجديدة (ملف واحد فيه array)، و [[recommended]] = مجموعة القواعد المقترحة.
- [[export default [ ... ]]]: الـ config عبارة عن array، كل عنصر فيها object إعدادات، و ESLint بيدمجهم بالترتيب.

### حاجة اكتشفناها وانت بتجرّب

بالسطر ده لوحده [[npx eslint src]] قال «all of the files matching the glob pattern "src" are ignored». السبب إن ESLint 9 من غير [[files]] بيفحص [[.js]] و [[.mjs]] و [[.cjs]] بس، و [[.jsx]] لأ. في مشروع حقيقي الـ config فيه أصلًا عنصر بيحدد الملفات (ده معنى «ضيفه جنب باقي الإعدادات»)، ولو مفيش ضيف:

~~~text eslint.config.mjs
export default [{ files: ['**/*.{js,jsx}'] }, jsxA11y.flatConfigs.recommended];
~~~

[[**/*.{js,jsx}]]: [[**]] أي فولدر بأي عمق، و [[{js,jsx}]] الامتدادين دول.

### الناتج على component «جرّب»

~~~text الناتج (npx eslint src)
4:7  error  Visible, non-interactive elements with click handlers must have at least one keyboard listener   jsx-a11y/click-events-have-key-events
4:7  error  Avoid non-native interactive elements...                                                     jsx-a11y/no-static-element-interactions
5:7  error  img elements must have an alt prop...                                                         jsx-a11y/alt-text
6:7  error  Anchor used as a button...                                                                    jsx-a11y/anchor-is-valid
✖ 4 problems (4 errors, 0 warnings)
~~~

[[4:7]] = السطر 4 والعمود 7. الـ div خد غلطتين (مفيش keyboard، ومفيش role)، والـ img غلطة، واللينك اللي [[href="#"]] غلطة. والـ [[<input placeholder="ابحث">]] عدّى.

---

## ٢. الـ imports في الاختبار

~~~text Signup.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { expect, test } from 'vitest';
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[render]] | يرسم الـ component في DOM وهمي (jsdom) |
| [[screen]] | يدوّر في الـ DOM ده ([[getByRole]] وأخواتها) |
| [[userEvent]] | يقلّد المستخدم: Tab وضغطات وكتابة، بالترتيب الحقيقي للأحداث |
| [[axe]] | axe-core نفسه، من غير Playwright |
| [[expect]] و [[test]] | من Vitest |

والـ matchers زي [[toHaveFocus]] مش من Vitest، من [[@testing-library/jest-dom]]، واتفعّلت بسطر [[import '@testing-library/jest-dom/vitest';]] في ملف setup، مع [[environment: 'jsdom']] في [[vitest.config]].

## ٣. التجهيز

~~~text
const user = userEvent.setup();
const { container } = render(<Signup />);
~~~

- [[userEvent.setup()]]: جهّز «مستخدم» واحد للاختبار كله.
- [[render]] بيرجّع object، و [[{ container }]] بياخد منه الـ div اللي الـ component اترسم جواه.

## ٤. هات الحقل زي قارئ الشاشة

~~~text
const email = screen.getByRole('textbox', { name: 'الإيميل' });
~~~

[[textbox]] = الـ role بتاع [[<input type="email">]]، و [[name]] = الاسم المحسوب من الـ label. جربنا نشيل [[htmlFor]] من الـ label:

~~~text الناتج من غير ربط الـ label
TestingLibraryElementError: Unable to find an accessible element with the role "textbox" and name "الإيميل"
Here are the accessible roles:
  textbox:
  Name "":
~~~

يعني الحقل موجود بس اسمه فاضي، وده بالظبط اللي قارئ الشاشة كان هيقوله.

## ٥. الكيبورد

~~~text
await user.tab();
expect(email).toHaveFocus();
~~~

[[user.tab()]] = دوسة Tab واحدة من أول الصفحة. والحقل لازم يبقى أول حاجة بتاخد focus. لو حد حط قبله لينك أو زرار، الاختبار يقع.

## ٦. الغلط

~~~text
await user.click(screen.getByRole('button', { name: 'سجّل' }));
expect(email).toHaveAttribute('aria-invalid', 'true');
expect(email).toHaveAccessibleDescription('اكتب الإيميل');
~~~

- دوس «سجّل» والحقل فاضي.
- [[toHaveAttribute('aria-invalid', 'true')]]: الحقل اتعلّم غلط. أول مرة الـ component بتاعنا كان فيه bug فطلع: [[Expected aria-invalid="true" / Received aria-invalid="false"]]. الاختبار مسكه.
- [[toHaveAccessibleDescription]]: الوصف المحسوب من [[aria-describedby]] هو نص الرسالة. لو الـ id غلط أو الـ attribute ناقص، يقع.

## ٧. axe على الـ component

~~~text
expect((await axe.run(container)).violations).toEqual([]);
~~~

من جوه لبرة: [[axe.run(container)]] افحص الـ div ده بس، و [[await]] استنى النتيجة، و [[( ... ).violations]] خد قايمة المخالفات، و [[toEqual([])]] لازم تبقى فاضية.

### النتيجة

~~~text الناتج (npx vitest run)
Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

السطر الأول تحذير من jsdom: axe بيحاول يستخدم canvas (لفحوصات زي التباين)، و jsdom مفيهوش canvas ولا layout حقيقي. فالتباين والمقاسات مش بتتفحص في jsdom أصلًا، دي شغلة Playwright في متصفح حقيقي (الدرس اللي فات).

---

## getByRole و getByTestId

جربنا [[getByRole('button', { name: 'حفظ' })]] على component «جرّب» (div و img ولينك و input):

~~~text الناتج
Unable to find an accessible element with the role "button" and name "حفظ"
Here are the accessible roles:
  img:      Name ""
  link:     Name "حفظ"
  textbox:  Name ""
~~~

مفيش button خالص: الـ div ملوش role. ولاحظ إن الـ placeholder مطلعش اسم للـ textbox هنا. [[getByTestId]] كان هيلاقي الـ div عادي والاختبار يعدّي، وده سبب ترتيب الأولوية: role الأول.

## الخلاصة

| الأداة | بتشوف | بتمسك |
|---|---|---|
| jsx-a11y | الكود وانت بتكتب | div بيتضغط، img من غير alt، لينك بيشتغل زرار |
| [[getByRole]] | الـ role والاسم المحسوب | label مش مربوط، زرار من غير اسم |
| [[user.tab()]] + [[toHaveFocus]] | ترتيب الـ focus | عنصر دخل قبل الحقل |
| [[axe.run(container)]] | قواعد axe في jsdom | aria غلط (من غير تباين) |`,
          lines: [
            R`الـ recommended من jsx-a11y بصيغة الـ flat config (ESLint 9 وطالع).`,
            "مصفوفة الإعدادات (ضيفه جنب باقي الإعدادات بتاعتك).",
            "Testing Library لـ React.",
            "user-event: كيبورد وماوس زي المستخدم الحقيقي.",
            R`axe-core نفسه، من غير Playwright: بيشتغل على أي عنصر DOM حتى في jsdom.`,
            R`Vitest (أو فعّل [[globals: true]] في الـ config).`,
            R`اختبار واحد بيتأكد من حاجتين: الخطأ مربوط بالحقل، والفورم بيتوصل بالكيبورد.`,
            R`[[userEvent.setup()]] بيجهّز كيبورد وماوس وهميين، ولازم يتعمل قبل الـ render.`,
            R`ارسم الفورم في DOM وهمي، و [[container]] هو العنصر اللي هنشغّل عليه axe.`,
            R`هات الحقل بالـ role والاسم زي قارئ الشاشة. لو الـ label مش مربوط، السطر ده بيفشل.`,
            R`دوس Tab مرة واحدة زي ما المستخدم بيعمل أول ما يفتح الصفحة.`,
            "الـ focus لازم يبقى على الإيميل (أول حقل).",
            "دوس سجّل والحقل فاضي.",
            R`الحقل بقى [[aria-invalid="true"]]، فقارئ الشاشة بيقول «invalid» مع اسمه.`,
            R`والرسالة مربوطة بيه بـ [[aria-describedby]].`,
            "ومفيش أي مخالفة axe في الـ component.",
            "قفلة."
          ],
          sol: R`[[npx eslint]] بيطلّع 4 errors: [[click-events-have-key-events]] و [[no-static-element-interactions]] على الـ div، و [[alt-text]] على الـ img، و [[anchor-is-valid]] على اللينك (رسالته «Anchor used as a button»). والـ input اللي عليه placeholder بس عدّى، لأن القاعدة بتاعته مش في الـ recommended.

والاختبار بيفشل برسالة زي: [[Unable to find an accessible element with the role "button" and name "حفظ"]] وتحتها «Here are the accessible roles:» وفيها [[img]] باسم فاضي، و [[link]] اسمه «حفظ»، و [[textbox]] باسم فاضي (الـ placeholder مش اسم هنا)، ومفيش [[button]] خالص لأن الـ div ملوش role. ولو الـ component فيه الـ div بس، الرسالة بتبقى «There are no accessible roles». ودا بالظبط اللي قارئ الشاشة شايفه: مفيش زرار.

الحل: [[<button type="button" onClick={save}>حفظ</button>]] والاختبار والـ lint الاتنين يعدّوا.`
        },
        {
          cmd: "كيبورد وقارئ شاشة",
          title: "الـ checklist اليدوي: كيبورد بس، و NVDA و VoiceOver",
          practice: [
            { lvl: 'تطبيق', t: R`**محاكاة:** اعمل جولة الكيبورد على صفحة تسجيل من موقعك: الماوس بعيد، و snippet في الكونسول بيطبع كل عنصر بياخد focus ([[document.addEventListener("focusin", e => console.log(e.target))]]). خلّص التسجيل كله بالكيبورد.`, done: R`لستة بكل وقفة بالترتيب، وجنبها أي مشكلة (عنصر مخفي واخد focus، أو focus مختفي، أو ترتيب غريب، أو مكان مبتعرفش تخرج منه)، وعدد المشاكل قبل وبعد التصليح.`, sol: R`الصفحة التجريبية فيها مشكلتين متعمدين:

~~~html signup.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>تسجيل</title>
<style>.promo { position: absolute; inset-inline-start: -9999px; }</style></head>
<body>
<main>
  <h1>تسجيل</h1>
  <a class="promo" href="/promo">عرض مخفي</a>
  <h3>بياناتك</h3>
  <label for="n">الاسم</label><input id="n">
  <label for="m">الإيميل</label><input id="m" type="email">
  <button id="s">سجّل</button>
</main>
</body>
</html>
~~~

~~~js console
document.addEventListener("focusin", (e) => console.log(e.target));
~~~

**الطريقة:** الماوس بعيد، والصق السطر، ودوس Tab لآخر الصفحة، واكتب جنب كل وقفة: شايف الـ focus؟ الترتيب منطقي؟ أقدر أرجع؟

**اللي ظهر:**

| الوقفة | المشكلة | التصليح |
|---|---|---|
| «عرض مخفي» | لينك برا الشاشة واخد focus، فالإطار مش ظاهر | [[hidden]] لو مش مستخدم، أو يظهر مع [[:focus]] |
| الاسم | مفيش | |
| الإيميل | مفيش | |
| سجّل | مفيش | |

**الغلطة الشائعة:** تخفي عنصر بـ [[position]] برا الشاشة. الشكل راح، بس لسه في ترتيب Tab.

~~~text الناتج
الوقفات بالترتيب:
عرض مخفي    ← مشكلة: عنصر مش باين واخد focus
n
m
s

قبل التصليح: مشكلة واحدة. بعد hidden على اللينك: الوقفات n و m و s بس.
~~~` },
            { lvl: 'سريع', t: R`**مسألة:** قارئ الشاشة بيتنقّل بالعناوين (H في NVDA). اكتب سطر في الكونسول بيطبع كل عناوين الصفحة بمستواها، وشوف فيه مستوى بيتنط (h2 بعده h4) ولا أكتر من h1.`, done: R`السطر [[[...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(h => h.tagName + " " + h.textContent.trim())]] طبع اللستة، وبعد التصليح فيه h1 واحد ومفيش مستوى بيتنط، واللستة لوحدها بتشرح الصفحة.`, sol: R`~~~js console
[...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.tagName + " " + h.textContent.trim())
~~~

**السطر:** [[querySelectorAll]] بيرجع العناوين بترتيب الصفحة، و [[...]] بيحوّلها لـ array، و [[.map]] بيعمل سطر لكل عنوان. ده نفس اللي قارئ الشاشة بيقراه لما تدوس H.

**اللستة دي لوحدها** لازم تشرح الصفحة. لو مش فاهم منها الصفحة بتتكلم عن إيه، فالعناوين ضعيفة.

**التصليح:** مستوى العنوان بيقول مكانه في الهيكل، مش حجمه. عايز حجم صغير؟ استخدم CSS وسيب [[h2]].

**الغلطة الشائعة:** تختار [[h3]] عشان حجمه أنسب، فالقارئ يحس إن فيه قسم ناقص.

~~~text الناتج
قبل:
H1 تسجيل
H3 بياناتك     ← نط من h1 لـ h3

بعد h2:
H1 تسجيل
H2 بياناتك
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** dropdown مخصص لاختيار الدولة فيه [[keydown]] بيعمل [[e.preventDefault()]] على أي زرار عشان الأسهم تشتغل، فـ Tab جواه مبيخرجش (keyboard trap، بند 2.1.2). صلّحه.`, done: R`الأسهم بتتنقل بين الدول، و Enter بيختار، و Escape بيقفل ويرجّع الـ focus للزرار، و Tab بيخرج للعنصر اللي بعده. والـ [[preventDefault]] بقى على الأسهم بس.`, sol: R`~~~html dropdown.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اختيار الدولة</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
  ul { margin: 0; padding: 0; list-style: none; border: 1px solid #94a3b8; max-inline-size: 14rem; }
  li { padding: .5rem; }
  li[aria-selected="true"] { font-weight: 700; }
  li:focus { outline: 2px solid #0f766e; outline-offset: -2px; }
</style>
</head>
<body>
<main>
  <h1>العنوان</h1>
  <button id="btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="list">اختار الدولة</button>
  <ul id="list" role="listbox" aria-label="الدولة" tabindex="-1" hidden>
    <li role="option" id="o1" tabindex="-1">مصر</li>
    <li role="option" id="o2" tabindex="-1">السعودية</li>
    <li role="option" id="o3" tabindex="-1">الإمارات</li>
  </ul>
  <a id="next" href="#next">الخطوة الجاية</a>
</main>
<script>
  const btn = document.getElementById("btn");
  const list = document.getElementById("list");
  const options = [...list.querySelectorAll("li")];

  function open() {
    list.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    options[0].focus();
  }
  function close(backToButton) {
    list.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    if (backToButton) btn.focus();
  }

  btn.addEventListener("click", open);
  list.addEventListener("keydown", (e) => {
    const i = options.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); options[(i + 1) % options.length].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); options[(i - 1 + options.length) % options.length].focus(); }
    else if (e.key === "Enter") {
      e.preventDefault();
      options.forEach((o) => o.setAttribute("aria-selected", String(o === options[i])));
      btn.textContent = options[i].textContent;
      close(true);
    }
    else if (e.key === "Escape") close(true);
    else if (e.key === "Tab") close(false);   // من غير preventDefault: Tab يكمل لوحده
  });
$__lt/script>
</body>
</html>
~~~

**الباج:** [[e.preventDefault()]] في أول الـ handler بيلغي سلوك كل الأزرار، ومنها Tab، فالمستخدم محبوس جوه.

**التصليح:** [[preventDefault]] على الأسهم و Enter بس. و Tab بيقفل القايمة ويسيب المتصفح يكمل لوحده للعنصر اللي بعده. ودا بند 2.1.2 No Keyboard Trap.

- [[(i + 1) % options.length]] بيلف من الآخر للأول.
- [[close(true)]] بيرجّع الـ focus للزرار، و [[close(false)]] لأ، لأن Tab بينقله.

**الغلطة الشائعة:** تعمل [[if (e.key !== "Tab") e.preventDefault()]] في أول الـ handler. كده أي اختصار زي F5 أو Ctrl+L اتلغى كمان.

~~~text الناتج
فتح:         o1
سهم تحت:     o2 ← o3 ← o1 (لف)
سهم فوق:     o3
Enter:       رجع للزرار ، ونص الزرار بقى «الإمارات»
Escape:      الزرار ، aria-expanded = false
Tab:         next ، والقايمة hidden = true
axe صفر
~~~` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من وثائق Microsoft لـ Narrator هات: إزاي تشغّله وتقفله، وإزاي تدخل scan mode، وإزاي تتنقّل بالعناوين واللينكات جوّه.`, done: R`٣ اختصارات مكتوبة ومجرّبة: [[Ctrl+Win+Enter]] تشغيل وقفل، و [[Caps Lock+Space]] للـ scan mode، و H للعنوان اللي بعده جوه الـ scan mode، وجرّبتهم على صفحة من موقعك.`, sol: R`**إجابة نموذجية من وثائق Microsoft لـ Narrator:**

| الأمر | الاختصار |
|---|---|
| تشغيل وقفل | [[Ctrl+Win+Enter]] |
| Scan mode | [[Caps Lock+Space]] |
| العنوان اللي بعده جوه Scan mode | H |
| اللي قبله | [[Shift+H]] |
| اللينك اللي بعده | K |

[[Caps Lock]] هنا مفتاح Narrator، و [[Insert]] كمان بينفع افتراضيًا.

**جرّبها كده:** افتح صفحة، شغّل Narrator، و [[Caps Lock+Space]]، ودوس H كذا مرة، واسمع هل العناوين بتشرح الصفحة.

**الغلطة الشائعة:** تجرّب الموقع بـ Tab بس مع القارئ. مستخدمين القارئ بيتنقلوا بالعناوين واللاندماركس أكتر من Tab.

~~~text الناتج
Ctrl+Win+Enter ، Caps Lock+Space ، H

(إجابة من الوثائق. المعمل ده من غير صوت، فشغّلها بنفسك على ويندوز.)
~~~` },
          ],
          desc: R`الفحص اليدوي هو اللي بيمسك الباقي. أولًا الكيبورد (5 دقايق لكل صفحة): شيل الماوس، ودوس Tab من أول الصفحة لآخرها. كل حاجة بتتضغط بتتوصل؟ الـ focus باين دايمًا؟ الترتيب زي ترتيب القراية؟ Enter و Space بيشغّلوا الأزرار؟ Escape بيقفل المودال والـ focus بيرجع للزرار؟ مفيش مكان بتدخله ومتعرفش تخرج؟

ثانيًا قارئ الشاشة للمسارات المهمة (التسجيل، والدفع): NVDA على ويندوز (مجاني) مع Chrome أو Firefox، و VoiceOver على الماك والآيفون. اسمع: كل حاجة ليها اسم؟ العناوين بالترتيب؟ الأخطاء بتتقري؟

المثال تحت أهم الاختصارات عشان تبدأ.`,
          example: R`Tab / Shift+Tab           العنصر اللي بعده / قبله
Enter / Space            Enter: الزرار واللينك، Space: الزرار والـ checkbox
Esc                      اقفل المودال أو المنيو
NVDA: Ctrl+Alt+N         شغّل NVDA (ويندوز)
NVDA: H / Shift+H        العنوان اللي بعده / قبله
NVDA: D                  الـ landmark اللي بعده (main و nav)
NVDA: Insert+F7          لستة كل اللينكات والعناوين
NVDA: Ctrl               اسكت
Mac: Cmd+F5              شغّل واقفل VoiceOver
Mac: Ctrl+Option+←/→     العنصر اللي قبله / بعده
Mac: Ctrl+Option+Space   اضغط على العنصر
Mac: Ctrl+Option+U       الـ rotor: لستة العناوين واللينكات والحقول`,
          try: R`خد صفحة التسجيل في مشروعك واعمل الـ checklist بالكيبورد بس، واكتب كل مشكلة. وبعدين شغّل NVDA أو VoiceOver وسجّل حساب من غير ما تبص على الشاشة (أو غمّض عينك): دوس H عشان تعرف الصفحة فيها إيه، وبعدين املا الفورم واغلط عمدًا في الإيميل.`,
          flag: "keys",
          deep: {
            why: R`حوالي نص قواعد WCAG محتاجة حكم إنسان. والمستخدم الحقيقي بيستخدم الموقع بقارئ شاشة ومتصفح معين، والأداة مبتسمعش اللي هو بيسمعه. خمس دقايق كيبورد بتلاقي مشاكل أكتر من أي أداة.`,
            how: R`checklist الكيبورد الكامل: (1) لينك «تخطى للمحتوى» أول Tab. (2) كل عنصر تفاعلي بيتوصل ومفيش حاجة مش تفاعلية بتاخد focus على الفاضي. (3) الـ focus ظاهر وتباينه واضح ومش مستخبي ورا header. (4) ترتيب الـ Tab زي ترتيب القراية (من اليمين لليسار في العربي، ومن فوق لتحت). (5) المنيو والـ dropdown بيفتحوا بـ Enter ويقفلوا بـ Esc. (6) المودال بيحبس الـ focus جواه ويرجّعه بعد ما يقفل. (7) مفيش keyboard trap (حتة بتدخلها ومتعرفش تخرج، زي iframe أو editor). (8) الـ tabs والـ radio بتتحرك بالأسهم.

قارئ الشاشة بيشتغل في وضعين: browse mode (بتقرا الصفحة بالأسهم وبحروف زي H للعناوين و K للينكات و F للحقول و B للأزرار و T للجداول)، و focus mode (لما تدخل حقل، الحروف بتتكتب فيه). NVDA بيبدّل لوحده، و Insert هو «مفتاح NVDA» (أو Caps Lock في إعداد laptop).

VoiceOver: الـ VO هو Ctrl+Option، و الـ rotor (VO+U) بيدّيك لستة بالعناوين واللينكات والحقول والـ landmarks، تتنقل بينهم بالأسهم يمين وشمال. على الآيفون: من Settings › Accessibility، وبتتنقل بـ swipe يمين وشمال و double tap للضغط.

التركيبات الشائعة: NVDA + Chrome أو Firefox، و JAWS + Chrome (مدفوع وشائع في الشركات)، و VoiceOver + Safari، و TalkBack + Chrome على أندرويد. اختبر على اتنين على الأقل لو المشروع مهم.

واسمع لـ: اسم كل زرار (مش «button» بس)، والـ state (expanded، checked، invalid)، والرسايل الديناميكية (اتحفظ، خطأ) بتتقري من غير ما تدور عليها.`,
            when: R`الكيبورد: قبل ما تقفل أي PR فيه UI. قارئ الشاشة: للمسارات المهمة قبل الـ release، وأي مكون مخصص (combobox، و tabs، و date picker).`,
            mistakes: R`تختبر VoiceOver مع Chrome (التركيبة مش مستقرة، استخدم Safari). تشغّل قارئ الشاشة وانت بتبص على الشاشة فتشوف اللي هو مبيقولوش. تختبر بالماوس جنب الكيبورد. تنسى الموبايل (TalkBack و VoiceOver على iOS بيتصرفوا مختلف). وتقرر «محدش من مستخدمينا بيستخدم قارئ شاشة» من غير ما تعرف، لأن محدش بيقولك.`
          },
          teach: R`## المثال مش كود: دي لستة اختصارات

كل سطر في المثال: الاختصار على الشمال، وبيعمل إيه على اليمين. التلات سطور الأولى مفاتيح المتصفح نفسه، وده اللي هتختبر بيه أي صفحة. وبعدها NVDA (قارئ شاشة مجاني لويندوز)، وبعدها VoiceOver (جوه الماك). مفاتيح المتصفح جربناها في Chrome على صفحة فيها لينك وزرار و checkbox و [[<dialog>]]. أما اختصارات NVDA و VoiceOver فمن الـ docs الرسمية بتاعتهم (مش متجرّبة هنا: محتاجة قارئ الشاشة شغال على جهاز حقيقي).

---

## ١. مفاتيح المتصفح (اتجرّبت في Chrome)

### [[Tab]] و [[Shift+Tab]]

~~~text اتقاس في Chrome
Tab × 4:      لينك > زرار > checkbox > زرار «افتح»
Shift+Tab:    رجع للـ checkbox
~~~

[[Tab]] = العنصر اللي بعده، و [[Shift+Tab]] = اللي قبله، بترتيب الـ HTML. (الـ [[+]] في الاختصار معناها «دوس الاتنين مع بعض».)

### [[Enter]] و [[Space]]: مش نفس الحاجة

جربنا كل مفتاح على كل عنصر:

| العنصر | Enter | Space |
|---|---|---|
| [[<button>]] | اتضغط | اتضغط |
| [[<a href>]] | اتضغط واتنقل لـ [[#target]] | **ما اتضغطش**، الصفحة عملت scroll |
| [[<input type="checkbox">]] | **ما اتعلّمش** | اتعلّم |

يعني اللينك بيتفتح بـ Enter بس، والـ checkbox بيتعلّم بـ Space بس، والزرار بالاتنين. وده مفيد في الاختبار: لو عامل «زرار» بـ div أو لينك ومش بيشتغل بـ Space، يبقى مش زرار حقيقي.

### [[Esc]]

فتحنا [[<dialog>]] بـ [[showModal()]]: الـ focus راح لأول زرار جواه. دسنا Escape: الـ dialog اتقفل والـ focus رجع لزرار «افتح» لوحده. ده السلوك اللي لازم أي مودال معمول بإيدك يقلّده.

---

## ٢. NVDA على ويندوز (من الـ docs)

| الاختصار | بيعمل إيه | ليه مهم |
|---|---|---|
| [[Ctrl+Alt+N]] | يشغّل NVDA | اختصار بيتعمل وقت التسطيب لو سبت الاختيار ده |
| [[H]] و [[Shift+H]] | العنوان اللي بعده / قبله | أسرع طريقة تعرف الصفحة فيها إيه، زي ما المستخدم الحقيقي بيعمل |
| [[D]] | الـ landmark اللي بعده | landmark = أجزاء الصفحة الكبيرة: [[<main>]] و [[<nav>]] و [[<header>]] |
| [[Insert+F7]] | Elements List | لستة باللينكات والعناوين والـ landmarks في شباك واحد |
| [[Ctrl]] | اسكت | بيوقف الكلام الحالي بس، مش NVDA |

- الحروف لوحدها (H و D) شغالة في **browse mode**: لما تكون بتقرا الصفحة. ولما تدخل حقل كتابة NVDA بيتنقل لـ **focus mode**، والحروف بتتكتب في الحقل.
- [[Insert]] هو «مفتاح NVDA»، وفي إعداد اللابتوب ممكن يبقى [[Caps Lock]].

---

## ٣. VoiceOver على الماك (من الـ docs)

| الاختصار | بيعمل إيه |
|---|---|
| [[Cmd+F5]] | يشغّل ويقفل VoiceOver |
| [[Ctrl+Option+←]] و [[→]] | العنصر اللي قبله / بعده |
| [[Ctrl+Option+Space]] | اضغط على العنصر الحالي |
| [[Ctrl+Option+U]] | الـ rotor |

- [[Cmd]] = مفتاح Command (⌘)، و [[Option]] = ⌥.
- [[Ctrl+Option]] بيتسمّى **VO** في docs بتاعة Apple، فـ [[VO+U]] = [[Ctrl+Option+U]].
- الـ **rotor** قايمة بتلف فيها بالأسهم يمين وشمال بين أنواع: العناوين، واللينكات، والحقول، والـ landmarks، وبالأسهم فوق وتحت جوه النوع.

---

## ٤. مقارنة سريعة

| عايز | المتصفح لوحده | NVDA | VoiceOver |
|---|---|---|---|
| العنصر اللي بعده | [[Tab]] | [[Tab]] أو السهم لتحت | [[VO+→]] |
| اضغط | [[Enter]] / [[Space]] | [[Enter]] | [[VO+Space]] |
| العناوين | مفيش | [[H]] | الـ rotor |
| لستة بكل حاجة | مفيش | [[Insert+F7]] | [[VO+U]] |
| اسكت | | [[Ctrl]] | [[Ctrl]] |

## الخلاصة

- Tab و Shift+Tab للتنقل، و Enter للينك والزرار، و Space للزرار والـ checkbox، و Esc للقفل والـ focus يرجع مكانه.
- في قارئ الشاشة: [[H]] (أو الـ rotor) أول حاجة، عشان تشوف الصفحة زي ما المستخدم الكفيف بيشوفها.
- اختبر بعينك مقفولة أو الشاشة مطفية، وإلا هتشوف اللي قارئ الشاشة مقالوش.`,
          lines: [
            R`التنقل بين العناصر اللي بتتضغط بالترتيب: Tab للأمام و Shift+Tab للخلف.`,
            R`تشغيل العنصر: Enter للينك والزرار، و Space للزرار والـ checkbox (و Space على لينك بيعمل scroll).`,
            R`Escape المفروض يقفل أي حاجة فوق الصفحة (مودال، منيو، tooltip) ويرجّع الـ focus مكانه.`,
            "تشغيل NVDA (لو اخترت الاختصار ده وقت التسطيب).",
            "القفز بين العناوين: أسرع طريقة تعرف الصفحة فيها إيه.",
            "القفز بين أجزاء الصفحة الأساسية.",
            "Elements List: كل اللينكات أو العناوين في لستة واحدة.",
            R`Ctrl لوحده بيسكّت الجملة اللي NVDA بيقولها دلوقتي من غير ما يقفله.`,
            R`تشغيل VoiceOver وقفله على الماك (وعلى الآيفون من Settings › Accessibility).`,
            "التنقل بين العناصر (VO = Ctrl+Option).",
            R`تفعيل العنصر اللي VoiceOver واقف عليه، زي الضغط على زرار أو لينك.`,
            "الـ rotor: قوايم بالعناوين واللينكات والحقول."
          ],
          sol: R`المشاكل اللي غالبًا هتلاقيها في صفحة تسجيل: لينك التخطي مش موجود، وزرار «إظهار الباسورد» أيقونة من غير اسم (قارئ الشاشة بيقول «button» بس)، والأخطاء بتظهر تحت بالأحمر ومحدش بيقراها (ناقص [[aria-describedby]] أو [[aria-live]])، والـ focus فاضل على زرار التسجيل بعد الغلط بدل ما يروح للحقل الغلط.

ولو دوست H ومسمعتش أي عنوان، أو سمعت «heading level 3» من غير h1، يبقى هيكل العناوين محتاج تظبيط (درس semantic HTML).

الغلط الشائع في التجربة نفسها: تبص على الشاشة وتفتكر إن كله تمام. لو مش قادر تغمّض، اطفي الشاشة (في NVDA فيه Screen Curtain، و VoiceOver فيه Screen Curtain بـ VO+Fn+Shift+-).`
        },
        {
          cmd: "إعلان تغيير الصفحة",
          title: "SPA بتغيّر الصفحة وقارئ الشاشة ساكت",
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** في SPA من غير [[RouteFocus]] دوس على لينك «المنتجات» بالكيبورد، واطبع [[document.activeElement]] و [[document.title]]. وبعدين حط المكوّن واعمل نفس الحاجة.`, done: R`من غيره الـ focus فاضل على اللينك (والـ title بيتغيّر من [[<title>]] اللي في الصفحة، مش من المكوّن)، ومعاه الـ focus على [[h1]] «المنتجات»، و Tab اللي بعدها بيروح لأول عنصر في الصفحة الجديدة مش اللي بعد اللينك.`, sol: R`~~~jsx RouteFocus.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function RouteFocus() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    const h1 = document.querySelector("main h1");
    if (!h1) return;
    h1.tabIndex = -1;
    h1.focus();
  }, [pathname]);
  return null;
}
~~~

~~~js console
[document.activeElement, document.title]
~~~

**الفرق:** في SPA الصفحة مبتعملش reload، فالمتصفح مبيعملش reset للـ focus. اللينك بيفضل عليه focus، وقارئ الشاشة مبيقولش حاجة، والمستخدم مش عارف إن حاجة اتغيرت.

[[RouteFocus]] بينقل الـ focus للعنوان، فالقارئ بيقراه، و Tab اللي بعدها بيبدأ من الصفحة الجديدة.

**ملحوظة:** الـ [[document.title]] بيتغيّر من [[<title>]] اللي في الصفحة، مش من [[RouteFocus]]. فالمكوّن شغلته الـ focus بس.

**الغلطة الشائعة:** تعمل [[prev]] بـ [[useState]]. ده بيعمل render زيادة، و [[useRef]] كفاية.

~~~text الناتج
                 activeElement     title                   Tab اللي بعدها
من غير المكوّن   لينك المنتجات     المنتجات | متجر النور   لينك بعده (نفس الـ nav)
معاه             h1 «المنتجات»     المنتجات | متجر النور   أول منتج
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** بعد ما حطيت [[RouteFocus]] الديزاينر اشتكى من إطار حوالين العنوان، فحد كتب [[h1:focus { outline: none }]]. ده بيخفيه للكيبورد كمان. خلّي الإطار يختفي لو التنقّل بالماوس بس.`, done: R`استخدمت [[h1:focus:not(:focus-visible) { outline: none }]] (أو مبتكتبش حاجة)، واتقاس في Chrome 156: بعد ضغطة ماوس [[h1.matches(":focus-visible")]] = [[false]] والإطار مش باين، وبعد Enter من الكيبورد = [[true]] والإطار باين.`, sol: R`~~~css style.css
/* الصح: متكتبش حاجة. أو لو حد لازم يكتب، اكتبها كده */
h1:focus:not(:focus-visible) { outline: none; }
~~~

**ليه:** المتصفح أصلًا بيقرر: بعد ضغطة ماوس [[:focus-visible]] بيبقى [[false]] والإطار مش بيظهر، وبعد الكيبورد بيبقى [[true]] والإطار بيظهر. فالشكوى كانت على حاجة غير موجودة، أو على متصفح قديم.

- [[h1:focus { outline: none }]] بيشيله عن الكل، ومنهم الكيبورد.
- [[:focus:not(:focus-visible)]] بيشيله في الحالة اللي المتصفح أصلًا مش محتاجها.

**الغلطة الشائعة:** تعتبر الإطار باج في الديزاين. الكيبورد محتاجه عشان يعرف هو فين.

~~~text الناتج
                        ماوس                 كيبورد
من غير CSS              fv false ، none      fv true ، auto
h1:focus:not(...)       fv false ، none      fv true ، auto
h1:focus {outline:none} -                    fv true ، none   ← كسر الكيبورد
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** الطريقة التانية: مكوّن announcer فيه [[<div aria-live="assertive" class="sr-only">]] بيتكتب فيه [[document.title]] بعد كل تنقّل (زي اللي Next.js بيعمله). قارنه بطريقة الـ focus.`, done: R`الطريقتين قارئ الشاشة بيقول اسم الصفحة. بس مع الـ announcer بس، الـ focus فاضل على اللينك القديم، فكتبت جدول: كل طريقة بتعلن إيه، وبتحرّك الـ focus ولا لأ، وإمتى تختار أنهي.`, sol: R`~~~jsx RouteAnnouncer.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export function RouteAnnouncer() {
  const { pathname } = useLocation();
  const box = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const id = setTimeout(() => { box.current.textContent = document.title; }, 50);
    return () => clearTimeout(id);
  }, [pathname]);
  return <div ref={box} aria-live="assertive" className="sr-only" />;
}
~~~

**ليه [[setTimeout]]:** [[<title>]] بتتحدث مع الـ render، فبنستنى لحظة عشان نقرا العنوان الجديد.

| | الـ focus | القارئ بيقول | Tab اللي بعدها |
|---|---|---|---|
| RouteFocus | بيتنقل لـ h1 | العنوان | أول حاجة في الصفحة |
| Announcer | فاضل على اللينك | [[document.title]] | عنصر تاني في الـ nav |

**تختار إيه:** لو الصفحة الجديدة صفحة كاملة، الـ focus أحسن لأن المستخدم بيبدأ من أولها. ولو الـ nav ثابت وعايز المستخدم يكمل تنقل، زي تابات، الـ announcer. ونطق القارئ نفسه محتاج تجربة بـ NVDA أو Narrator، والمعمل ده قاس الـ DOM بس.

**الغلطة الشائعة:** تستخدم الاتنين مع بعض، فالقارئ يقول الاسم مرتين.

~~~text الناتج
Announcer بعد Enter على «المنتجات»:
#announcer = «المنتجات | متجر النور»
activeElement = لينك المنتجات
Tab: لينك بعده
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** بـ Playwright: افتح الرئيسية، ودوس اللينك بالكيبورد ([[focus]] و [[press("Enter")]])، واتأكد بـ [[toHaveTitle]] من العنوان الجديد و [[toBeFocused]] على [[main h1]].`, done: R`الاختبار بيعدّي، ولو شلت [[<RouteFocus />]] من الـ layout بيقع على [[toBeFocused]]، ولو شلت الـ [[<title>]] من الصفحة بيقع على [[toHaveTitle]].`, sol: R`~~~js route.spec.mjs
import { test, expect } from "@playwright/test";

test("التنقل بينقل الـ focus ويغيّر العنوان", async ({ page }) => {
  await page.goto(process.env.BASE);
  const link = page.getByRole("link", { name: "المنتجات" });
  await link.focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveTitle("المنتجات | متجر النور");
  await expect(page.locator("main h1")).toBeFocused();
});
~~~

~~~js playwright.config.mjs
export default {
  testDir: ".",
  testMatch: "route.spec.mjs",
  reporter: "line",
  timeout: 15000,
  use: { channel: "chrome", headless: true },
  expect: { timeout: 2000 },
};
~~~

**ليه [[focus()]] و [[press("Enter")]] مش [[click()]]:** ضغطة الماوس تحرك الـ focus بنفسها، فالاختبار يبقى مش بيجرّب مسار الكيبورد.

و [[toHaveTitle]] و [[toBeFocused]] بيستنوا لوحدهم، فمش محتاج [[waitForTimeout]].

**جرّب تكسره:** لو شلت [[<RouteFocus />]] الاختبار يقع على [[toBeFocused]]، ولو شلت [[<title>]] يقع على [[toHaveTitle]]. دي الطريقة اللي بتثبت إن الاختبار بيحرس حاجة.

**الغلطة الشائعة:** تعمل الاختبار بعد [[page.goto("/products")]] مباشرة. ده reload كامل، مش تنقل SPA.

~~~text الناتج
الأصلي:             1 passed (1.2s)
من غير RouteFocus:  1 failed  > await expect(page.locator("main h1")).toBeFocused();
من غير <title>:     1 failed  > await expect(page).toHaveTitle("المنتجات | متجر النور");
~~~` },
          ],
          desc: R`في موقع عادي، كل لينك بيحمّل صفحة جديدة وقارئ الشاشة بيقول عنوانها. في SPA (React Router مثلًا)، اللينك بيغيّر المحتوى بـ JavaScript: مفيش page load، فقارئ الشاشة ساكت، والـ focus فاضل على اللينك اللي اتداس (أو راح لأول الصفحة). المستخدم مش عارف إن حاجة اتغيرت.

الحل: غيّر [[document.title]]، وانقل الـ focus لعنوان الصفحة الجديدة ([[<h1 tabIndex={-1}>]])، أو أعلن التغيير في منطقة [[aria-live]].

و Next.js App Router عامل ده لوحده: فيه route announcer بيقرا [[document.title]]، ولو مفيش يقرا أول [[<h1>]]، ولو مفيش يقرا الـ URL. فكل صفحة لازم ليها title مختلف ومفهوم (من [[metadata]]).`,
          example: R`import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
export function RouteFocus() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    const h1 = document.querySelector('main h1');
    if (!h1) return;
    h1.tabIndex = -1;
    h1.focus();
  }, [pathname]);
  return null;
}
// في الـ layout: <main><Outlet /></main><RouteFocus />
// وفي كل صفحة (React 19 بينقلها للـ head لوحده):
<title>المنتجات | متجر النور</title>`,
          try: R`في مشروع React Router، شغّل قارئ الشاشة واتنقل بين صفحتين بلينك في الـ nav: قال حاجة؟ وبعدين حط [[<RouteFocus />]] في الـ layout و [[<title>]] في كل صفحة وجرّب تاني. وفي Next.js شيل الـ [[title]] من [[metadata]] بتاعت صفحة وشوف الـ announcer بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`ده من أشهر مشاكل الـ SPAs وأقلها ملاحظة، لأن اللي بيبص على الشاشة شايف الصفحة اتغيرت. المستخدم الكفيف بيدوس «المنتجات» ومبيسمعش حاجة، فيفتكر اللينك مش شغال ويدوس تاني، أو الـ focus يفضل في الـ nav فيضطر يعدّي 30 عنصر عشان يوصل للمحتوى الجديد.`,
            how: R`فيه طريقتين والاتنين مقبولين. (1) نقل الـ focus: [[tabIndex={-1}]] بيخلي الـ h1 ياخد focus من الكود ومش بيدخل الـ Tab، وقارئ الشاشة بيقرا العنوان لما الـ focus يوصله، والـ Tab اللي بعده بيكمّل من المحتوى الجديد. عيبها إن الـ focus بيبعد عن الـ nav. (2) إعلان: منطقة [[<div aria-live="polite" className="sr-only">]] موجودة في الـ layout من الأول، ولما الـ route يتغير تحط فيها «اتنقلت لـ: المنتجات». الـ focus فاضل مكانه، وده اللي Next.js بيعمله.

أول تحميل للصفحة مش محتاج أي حاجة (المتصفح بيعلن الصفحة لوحده)، عشان كده [[prev]] بيبدأ بالمسار الحالي: من غيره الـ focus هيتنقل للـ h1 أول ما الموقع يفتح ويعدّي لينك التخطي. والمقارنة بالمسار أأمن من flag «أول مرة»، لأن React StrictMode بيشغّل الـ effect مرتين في الـ development، والـ flag كان هينقل الـ focus في التانية.

المكون ده لازم يبقى في الـ layout اللي فاضل ثابت بين الصفحات، مش جوه كل صفحة: لو جوه الصفحة، كل تنقل بيعمل نسخة جديدة منه والـ ref بيبدأ من الأول فمش هيعرف إن المسار اتغير. والـ effect بتاع الأب بيشتغل بعد ما الصفحة الجديدة اترسمت، فالـ h1 بيبقى موجود. لو الصفحة بتحمّل بياناتها بعد كده (loading)، انقل الـ focus بعد ما المحتوى يظهر.

والـ outline على الـ h1 لما ياخد focus من الكود: ممكن تشيله بـ [[h1:focus { outline: none }]] لأنه مش عنصر تفاعلي، بس أي عنصر بيتضغط لازم الـ outline يفضل.

وخلي الـ title فيه اسم الصفحة الأول واسم الموقع بعده، عشان اللي بيسمع يعرف الصفحة من أول كلمة، وعشان التابات في المتصفح.`,
            when: R`أي SPA فيها client-side routing: React Router، و TanStack Router، و Vue Router. وفي Next.js: اتأكد إن كل صفحة ليها [[title]] مختلف، وخلاص. وكمان لما محتوى كبير يتغير من غير تغيير الـ URL (خطوة جديدة في wizard): نفس الفكرة.`,
            mistakes: R`كل الصفحات نفس الـ title («متجر النور») فالـ announcer بيقول نفس الكلمة كل مرة. نقل الـ focus في أول تحميل. نقل الـ focus للـ [[<body>]] أو لـ div ملوش اسم فقارئ الشاشة يقول «blank». عمل منطقة aria-live مع الرسالة (لازم تبقى موجودة قبل ما المحتوى يتغير). وتنقل الـ focus وتعلن في نفس الوقت فالمستخدم يسمع الكلام مرتين.`
          },
          teach: R`## component صغير بينقل الـ focus للعنوان كل ما الصفحة تتغير

[[RouteFocus]] مبيرسمش أي حاجة. شغلته كلها: كل ما الـ URL يتغير، يدوّر على [[<h1>]] الصفحة الجديدة ويحط عليه الـ focus، فقارئ الشاشة يقول اسم الصفحة. حطيناه حرفيًا في تطبيق React 19.3 و react-router 8.4 (Vite، build production، جوه [[StrictMode]])، بـ layout فيه nav بلينكين و [[<main><Outlet /></main>]]، وصفحتين كل واحدة فيها [[<title>]] و [[<h1>]]، وجربناه في Chrome من Playwright مرة بالـ component ومرة من غيره.

---

## ١. الـ imports

~~~text
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
~~~

- [[useEffect]]: hook بيشغّل كود **بعد** ما React يرسم.
- [[useRef]]: صندوق بيفضل محتفظ بقيمته بين الـ renders، وتغييره مش بيعمل render جديد.
- [[useLocation]]: بيرجّع مكان الصفحة الحالي (المسار وغيره). من v7 بيتعمله import من [[react-router]] على طول (زمان كان [[react-router-dom]]).

## ٢. المسار الحالي وآخر مسار شفناه

~~~text
export function RouteFocus() {
  const { pathname } = useLocation();
  const prev = useRef(pathname);
~~~

- [[{ pathname }]]: خد خانة [[pathname]] بس من الـ object، زي [[/products]].
- [[useRef(pathname)]]: القيمة الأولى بس هي اللي بتتحط. فـ [[prev.current]] بيبدأ بالمسار اللي الموقع فتح عليه، ومش بيتغير لوحده بعد كده.

## ٣. الـ effect

~~~text
useEffect(() => {
  if (prev.current === pathname) return;
  prev.current = pathname;
  ...
}, [pathname]);
~~~

- [[[pathname]]] في الآخر = الـ dependencies: الـ effect بيشتغل أول مرة، وبعدين بس لما [[pathname]] يتغير.
- [[if (prev.current === pathname) return;]]: [[===]] مقارنة. لو المسار زي آخر واحد، اخرج من غير ما تعمل حاجة. وده بيحصل في حالتين: أول تحميل للموقع، والتشغيل التاني اللي [[StrictMode]] بيعمله في الـ development.
- [[prev.current = pathname;]]: افتكر المسار الجديد.

## ٤. نقل الـ focus

~~~text
const h1 = document.querySelector('main h1');
if (!h1) return;
h1.tabIndex = -1;
h1.focus();
~~~

- [[document.querySelector('main h1')]]: أول [[h1]] جوه [[main]] (المسافة = «جوه»). لو مفيش بيرجّع [[null]].
- [[if (!h1) return;]]: [[!]] = «مش». لو ملقيناش عنوان، متعملش حاجة بدل ما الكود يقع.
- [[h1.tabIndex = -1]]: العنوان مش عنصر تفاعلي، فمبيقبلش focus. [[-1]] بتخليه يقبله من الكود، من غير ما يدخل ترتيب الـ Tab.
- [[h1.focus()]]: حط الـ focus عليه، وقارئ الشاشة بيقرا اللي عليه الـ focus.

## ٥. [[return null;]]

الـ component لازم يرجّع حاجة يرسمها، و [[null]] = ولا حاجة.

## ٦. مكانه والـ title

~~~text
// في الـ layout: <main><Outlet /></main><RouteFocus />
<title>المنتجات | متجر النور</title>
~~~

- [[<Outlet />]]: المكان اللي react-router بيحط فيه الصفحة الحالية جوه الـ layout.
- [[<RouteFocus />]] في الـ layout مش في الصفحة: الـ layout فاضل ثابت، فالـ ref بتاعه بيفتكر المسار القديم.
- [[<title>]] جوه الصفحة: React 19 بينقله للـ [[<head>]] لوحده.

---

## القياس

| | بعد التحميل | بعد Enter على «المنتجات» | الـ Tab الجاي |
|---|---|---|---|
| مع RouteFocus | الـ focus على الـ body | الـ focus على [[H1 المنتجات]] و [[tabindex="-1"]] | زرار «أول منتج» |
| من غيره | الـ focus على الـ body | الـ focus فاضل على [[A المنتجات]] (اللينك اللي في الـ nav) | زرار «أول منتج» |

وفي الحالتين [[document.title]] اتغير من «الرئيسية | متجر النور» لـ «المنتجات | متجر النور»، والـ URL بقى [[/products]]. يعني:

- أول تحميل: الـ focus متحركش (الـ [[prev]] شغال صح، ولينك التخطي هيفضل أول Tab).
- من غير RouteFocus: الـ focus فاضل على لينك الـ nav، فقارئ الشاشة مش هيقول إن حاجة اتغيرت. (هنا الـ Tab الجاي وصل للمحتوى بسرعة لأن «المنتجات» آخر لينك في الـ nav؛ في nav فيه 30 لينك كان هيعدّي عليهم كلهم.)
- مع RouteFocus: قارئ الشاشة بيقرا العنوان («المنتجات، heading level 1» في NVDA، حسب الـ docs).

## الخلاصة

| السطر | ليه |
|---|---|
| [[useRef(pathname)]] | أول تحميل ميتحسبش تنقل |
| [[if (prev.current === pathname) return]] | ولا تشغيل StrictMode التاني |
| [[querySelector('main h1')]] | العنوان الحقيقي للصفحة الجديدة |
| [[tabIndex = -1]] + [[focus()]] | قارئ الشاشة يقراه، والـ Tab يكمّل من المحتوى |
| في الـ layout | عشان الـ ref يفضل فاكر |
| [[<title>]] لكل صفحة | التاب، و announcer بتاع Next.js، والسجل |`,
          lines: [
            R`[[useEffect]] عشان نشتغل بعد الرسم، و [[useRef]] عشان نفتكر قيمة من غير re-render.`,
            "الـ URL الحالي من React Router (v7 بيتعمله import من react-router).",
            "مكون بيتحط مرة واحدة في الـ layout ومبيرسمش حاجة.",
            "المسار الحالي: بيتغير مع كل تنقل.",
            "آخر مسار شفناه، وبيبدأ بالحالي عشان أول تحميل ميتحسبش تنقل.",
            R`effect بيتنفّذ بعد ما الصفحة الجديدة تترسم، فالـ [[h1]] بتاعها موجود في الـ DOM...`,
            "...لو المسار متغيرش (أول تحميل، أو تشغيل StrictMode التاني) متعملش حاجة.",
            R`احفظ المسار الجديد في الـ ref عشان المقارنة الجاية تبقى معاه.`,
            "العنوان الرئيسي للصفحة الجديدة.",
            R`لو الصفحة مفيهاش [[h1]] اخرج من غير ما تعمل حاجة، بدل error على [[null]].`,
            "خليه يقبل focus من الكود من غير ما يدخل الـ Tab.",
            "حط الـ focus عليه، فقارئ الشاشة يقول «المنتجات، heading level 1».",
            "بيتنفذ لما المسار يتغير بس.",
            R`[[return null]]: المكوّن شغله في الـ effect بس، فمبيرسمش ولا عنصر.`,
            "قفلة.",
            R`عنوان كل صفحة: React 19 بينقل [[<title>]] للـ head لوحده، فالتاب وقارئ الشاشة يعرفوا الصفحة.`
          ],
          sol: R`من غير RouteFocus: لما تدوس لينك في الـ nav، NVDA أو VoiceOver ممكن ميقولوش حاجة خالص، أو يقروا اللينك تاني، والـ Tab اللي بعده بيكمّل في الـ nav. مع RouteFocus: بتسمع «المنتجات، heading level 1» على طول، والـ Tab اللي بعده بيروح لأول حاجة في المحتوى الجديد، وعنوان التاب بقى «المنتجات | متجر النور».

جربناه في اختبار (Vitest و React Testing Library و MemoryRouter جوه StrictMode): أول ما الصفحة تفتح الـ focus فاضل على الـ body، وبعد الضغط على «المنتجات» الـ focus على الـ h1 و [[document.title]] اتغير.

في Next.js من غير title: الـ announcer بيقرا أول [[<h1>]]، ولو مفيش بيقرا المسار. ولو كل الصفحات ورثت نفس الـ title من الـ layout، هيقول نفس الاسم في كل صفحة.

الغلط الشائع: تحط المكون جوه كل صفحة بدل الـ layout، فمبيحصلش أي حاجة (كل صفحة بتعمل نسخة جديدة والـ ref بيبدأ بالمسار الجديد).`
        }
      ]
    }
]);

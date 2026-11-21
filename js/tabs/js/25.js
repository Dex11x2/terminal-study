// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "regex",
      l: 2,
      n: "تدوّر وتتحقق وتستبدل بـ patterns: classes و quantifiers و anchors و groups و flags، والعربي، وإمتى regex غلط",
      pre: [
        { to: "js/string methods", why: R`[[match]] و [[replace]] و [[split]] كلهم string methods، والـ regex بيديهم قوة زيادة` },
        { to: "js/escape sequences و String.raw", why: R`الـ backslash في [[\d]] و [[new RegExp("\\d")]] هو نفس فكرة الـ escape في النصوص` },
        { to: "js/regex والعربي: Unicode properties", why: R`[[\p{L}]] و [[\p{Nd}]] مع [[u]] هما اللي بيخلّوا الـ regex يفهم العربي في التمارين` },
        { to: "js/textContent و classList", why: R`مشاريع الوحدة بتعرض النتايج في صفحة، ولازم نص اليوزر يتحط كنص مش HTML` },
      ],
      projects: [
        { lvl: 'صغير', t: R`تنضيف أرقام الموبايل`, what: R`[[normalizePhone(s)]] بتقبل [["+20 10 1234 5678"]] و [["0020101234 5678"]] و [["010-1234-5678"]] والأرقام العربي [["٠١٠١٢٣٤٥٦٧٨"]]، وترجّع [["01012345678"]] أو [[null]]. من درسي classes و replace.`, done: R`الأربع أشكال دول بيرجّعوا [["01012345678"]]، و [["0131234567"]] ← null، و [[""]] ← null. والفحص الأخير بـ [[^]] و [[$]]: شيلهم وشوف رقم أطول بيعدّي.`, sol: R`## الشكل النهائي

~~~text الناتج (node main.js، Node 24)
"+20 10 1234 5678"   → 01012345678
"0020101234 5678"    → 01012345678
"010-1234-5678"      → 01012345678
"٠١٠١٢٣٤٥٦٧٨"        → 01012345678
"(012) 3456-7890"    → 01234567890
"0131234567"         → null
""                   → null
"010123456789"       → null
"+2001012345678x"    → null
من غير ^ و $: true true
~~~

## هتشوف إيه

الأربع أشكال اللي في المطلوب (ومعاهم [["(012) 3456-7890"]]) بقوا رقم واحد نضيف من ١١ رقم، والأرقام الغلط والفاضي [[null]]. وآخر سطر بيوري ليه [[^]] و [[$]] لازمين.

## الكود

~~~js phone.js
// أي رقم عربي أو فارسي -> إنجليزي: \p{Nd} وبعدين نحسب قيمته من أول رقم في نفس الـ block
function toLatinDigits(s) {
  return s.replace(/\p{Nd}/gu, d => {
    const code = d.codePointAt(0);
    if (code >= 0x660 && code <= 0x669) return String(code - 0x660); // ٠-٩
    if (code >= 0x6f0 && code <= 0x6f9) return String(code - 0x6f0); // ۰-۹
    return d;
  });
}

export function normalizePhone(s) {
  if (typeof s !== "string") return null;
  let digits = toLatinDigits(s).replace(/[\s\-().]/g, "");
  digits = digits.replace(/^(?:\+|00)20/, "0");
  return /^01[0125]\d{8}$/.test(digits) ? digits : null;
}
~~~

~~~js main.js
import { normalizePhone } from "./phone.js";

const inputs = ["+20 10 1234 5678", "0020101234 5678", "010-1234-5678", "٠١٠١٢٣٤٥٦٧٨", "(012) 3456-7890", "0131234567", "", "010123456789", "+2001012345678x"];
for (const s of inputs) {
  console.log(JSON.stringify(s).padEnd(20), "→", normalizePhone(s));
}

// من غير ^ و $: الرقم الأطول بيعدّي
const loose = /01[0125]\d{8}/;
console.log("من غير ^ و $:", loose.test("010123456789"), loose.test("x01012345678y"));
~~~

~~~json package.json
{ "type": "module" }
~~~

## كل حتة مهمة بتعمل إيه

- **[[toLatinDigits]]:** [[/\p{Nd}/gu]] بيمسك أي رقم في Unicode، والدالة بتحسب قيمته من كوده: [[٠]] كودها [[0x660]]، فـ [[code - 0x660]] بيدّي الرقم. ونفس الكلام للأرقام الفارسي ([[۰]] = [[0x6f0]]).
- **[[replace(/[\s\-().]/g, "")]]:** بيشيل المسافات والشرط والأقواس والنقط. الـ [[-]] جوه الأقواس عليها [[\]] عشان متتفهمش range.
- **[[replace(/^(?:\+|00)20/, "0")]]:** كود مصر في الأول بس ([[^]])، بـ [[+]] أو [[00]]، بيتبدّل بـ [[0]]. [[(?:...)]] تجميع من غير group. و [[\+]] لأن [[+]] لوحدها quantifier.
- **[[/^01[0125]\d{8}$/]]:** الفحص الأخير على النص **كله**: [[010123456789]] (١٢ رقم) و [["+2001012345678x"]] اترفضوا. من غير [[^]] و [[$]] الاتنين كانوا عدّوا (آخر سطر).
- **[[typeof s !== "string"]]:** [[normalizePhone(undefined)]] ترجّع null بدل ما تقع على [[.replace]].

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة كانت [[s.replace(/\D/g, "")]]** (شيل أي حاجة مش رقم). [["+2001012345678x"]] بقت [[2001012345678]]، والـ [[x]] اختفت في السكوت. والأرقام العربي اتشالت كلها لأن [[\D]] من غير [[u]] بيعتبرها «مش رقم». الحل: نشيل الفواصل المعروفة بس، ونحوّل العربي الأول، وأي حرف تاني يخلي الفحص يفشل.
- **[[^\+20]] لوحدها:** [["0020..."]] مكانتش بتتشال. اتصلحت بـ [[(?:\+|00)]].`  },
        { lvl: 'صغير', dir: "search-highlighter", t: R`مظلّل نتايج البحث`, what: R`صفحة فيها مقال و input، الكلمات اللي بتطابق بتتحط في [[<mark>]] من غير حساسية للحروف، والـ query بيتعمله escape، وجنب الـ input «لقيت X مرة». من درسي إمتى regex غلط و replace.`, done: R`كتابة [[c++]] أو [[(]] مبتكسرش الصفحة، والعدد صح، والكلمة بحروف كبيرة بتتظلل، ولما الـ input يفضى المقال بيرجع زي الأول بالظبط من غير [[<mark>]] فاضل.`, sol: R`## الشكل النهائي

~~~live 330 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>دوّر في المقال</title>
<style>
  body { font: 16px/1.8 system-ui, sans-serif; margin: 16px; max-width: 620px; }
  .bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
  input { font: inherit; padding: 4px 8px; }
  #count { color: #555; }
  mark { background: #fde047; border-radius: 3px; }
</style>
</head>
<body>
<div class="bar">
  <input id="q" type="search" aria-label="دوّر في المقال" placeholder="دوّر...">
  <span id="count" aria-live="polite"></span>
</div>
<article id="article">
  <h2>ليه تتعلم JavaScript؟</h2>
  <p>JavaScript هي لغة المتصفح، و javascript نفسها بتشتغل على السيرفر بـ Node. لو بتحب C++ أو Java هتلاقي الـ syntax قريب.</p>
  <p>ابدأ بالأساسيات (المتغيرات والدوال)، وبعدين الـ DOM، وبعدين async. وكل يوم اكتب كود: ده أهم من أي كورس.</p>
</article>
<script>
  const article = document.getElementById("article");
  const count = document.getElementById("count");
  const originalHTML = article.innerHTML;
  const escapeRegex = s => (RegExp.escape ? RegExp.escape(s) : s.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&"));

  // بيلف على عقد النص بس، فالـ tags نفسها عمرها ما بتتلمس
  function highlight(query) {
    article.innerHTML = originalHTML;
    if (!query.trim()) { count.textContent = ""; return; }
    const re = new RegExp(escapeRegex(query), "gi");
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    let total = 0;
    for (const node of nodes) {
      const text = node.nodeValue;
      const matches = [...text.matchAll(re)];
      if (matches.length === 0) continue;
      total += matches.length;
      const frag = document.createDocumentFragment();
      let last = 0;
      for (const m of matches) {
        frag.append(text.slice(last, m.index));
        const mark = document.createElement("mark");
        mark.textContent = m[0];
        frag.append(mark);
        last = m.index + m[0].length;
      }
      frag.append(text.slice(last));
      node.replaceWith(frag);
    }
    count.textContent = "لقيت " + total + " مرة";
  }

  document.getElementById("q").addEventListener("input", e => highlight(e.target.value));
</script>
</body>
</html>
~~~

## هتشوف إيه

خانة بحث فوق مقال. اكتب [[javascript]]: الـ ٣ أماكن (العنوان والفقرة) بيتظللوا بالأصفر حتى لو مكتوبة [[JavaScript]]، وجنب الخانة «لقيت 3 مرة». امسح الخانة: المقال بيرجع زي الأول.

## اتقاس (Chrome 158 بـ Playwright)

~~~text الناتج
javascript → لقيت 3 مرة | marks: JavaScript,JavaScript,javascript
c++        → لقيت 1 مرة | marks: C++
(          → لقيت 1 مرة | marks: (
الـ        → لقيت 2 مرة | marks: الـ,الـ
مش موجودة  → لقيت 0 مرة
فاضي: نفس الـ HTML الأصلي؟ true | marks: 0 | count: ""
~~~

[[c++]] و [[(]] مكسروش الصفحة، والعنوان [[<h2>]] اتظلل جواه من غير ما يبوظ، والخانة الفاضية رجّعت الـ HTML الأصلي بالظبط (المقارنة بـ [[===]] طلعت true).

## كل حتة مهمة بتعمل إيه

- **[[originalHTML]] محفوظ أول ما الصفحة تفتح:** كل بحث بيبدأ من النسخة الأصلية، فمفيش [[<mark>]] قديم بيفضل من البحث اللي قبله.
- **[[escapeRegex]]:** [[RegExp.escape]] لو المتصفح فيه، ولو لأ [[replace]] بيحط [[\]] قبل كل رمز ليه معنى. من غيره [[c++]] بيرمي SyntaxError.
- **[[new RegExp(..., "gi")]]:** [[g]] لكل الأماكن (و [[matchAll]] لازمها [[g]])، و [[i]] من غير حساسية للحروف.
- **[[createTreeWalker(article, NodeFilter.SHOW_TEXT)]]:** بيلف على عقد **النص** بس. لو عملنا [[replace]] على [[innerHTML]]، البحث عن [[h2]] أو [[p]] كان هيظلل جوه الـ tags نفسها ويبوّظ الصفحة.
- **بنجمع العقد في array الأول:** لأننا هنبدّلها، والـ walker بيتلخبط لو العقد اتغيّرت وهو ماشي.
- **[[DocumentFragment]] و [[replaceWith]]:** كل عقدة نص بتتبدّل بـ: نص قبل الـ match، و [[<mark>]] فيه الـ match بـ [[textContent]]، ونص بعده.

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة:** [[article.innerHTML = originalHTML.replace(re, "<mark>$&</mark>")]]. البحث عن [[p]] ظلل حرف [[p]] جوه [[<p>]] نفسها فبقت [[<<mark>p</mark>>]] والفقرات اختفت (عدد [[<p>]] في الصفحة بقى 0 بدل 2، قسناها في Chrome). اتصلحت بالـ TreeWalker.
- **الخانة فيها مسافة بس:** [[" "]] كانت بتظلل كل المسافات وتعدّ عشرات المرات (٤٥ في المقال ده، ومنهم مسافات الـ indentation اللي بين الـ tags). اتصلحت بـ [[query.trim()]].`  },
        { lvl: 'متوسط', dir: "log-analyzer", t: R`محلل لوج سيرفر`, what: R`[[analyze(logText)]] بتفك كل سطر بـ named groups (method و path و status و ms) و matchAll، وترجّع عدد كل status، ومتوسط الـ ms، وأبطأ ٣ endpoints، وعدد السطور اللي مش مفهومة (من غير ما تقع عليها). وصفحة فيها textarea تلزق فيها اللوج وجدول بالنتيجة. من دروس groups و matchAll.`, done: R`على لوج ١٠ سطور منهم سطرين بايظين: ٨ مفهومين و ٢ مش مفهومين، والأرقام زي العد بإيدك، والـ path اللي فيه query زي [[/api/x?id=1]] بيتحسب صح، واللوج الفاضي بيدّي جدول فاضي مش NaN.`, sol: R`## الشكل النهائي

~~~live 520 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محلل اللوج</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  textarea { width: 100%; box-sizing: border-box; height: 150px; font: 13px/1.5 monospace; direction: ltr; }
  table { border-collapse: collapse; margin: 8px 0 16px; }
  th, td { border: 1px solid #ccc; padding: 3px 10px; text-align: start; }
  td.n { direction: ltr; text-align: right; font-variant-numeric: tabular-nums; }
  h3 { margin: 12px 0 0; font-size: 16px; }
</style>
</head>
<body>
<label for="log">الصق اللوج هنا:</label>
<textarea id="log">GET /api/products 200 120ms
GET /api/products?id=1 200 95ms
POST /api/orders 201 340ms
GET /api/users 404 12ms
broken line here
GET /api/products 200 110ms
DELETE /api/orders/7 500 980ms
PUT /api/users/3 200 210ms
GET /health 200 3ms
POST /api/login</textarea>
<div id="out"></div>
<script>
  const LINE = /^(?<method>GET|POST|PUT|PATCH|DELETE) (?<path>\S+) (?<status>\d{3}) (?<ms>\d+)ms$/gm;

  function analyze(logText) {
    const lines = logText.split(/\r?\n/).filter(l => l.trim() !== "");
    const statuses = {};
    const byPath = {};
    let parsed = 0, totalMs = 0;
    for (const m of logText.replace(/\r/g, "").matchAll(LINE)) {
      const { method, path, status } = m.groups;
      const ms = Number(m.groups.ms);
      parsed++;
      totalMs += ms;
      statuses[status] = (statuses[status] ?? 0) + 1;
      const key = method + " " + path.split("?")[0];
      byPath[key] = Math.max(byPath[key] ?? 0, ms);
    }
    const slowest = Object.entries(byPath).sort((a, b) => b[1] - a[1]).slice(0, 3);
    return { parsed, unparsed: lines.length - parsed, statuses, avgMs: parsed ? Math.round(totalMs / parsed) : 0, slowest };
  }

  function table(title, rows) {
    const h = document.createElement("h3");
    h.textContent = title;
    const t = document.createElement("table");
    for (const [k, v] of rows) {
      const tr = t.insertRow();
      tr.insertCell().textContent = k;
      const td = tr.insertCell();
      td.className = "n";
      td.textContent = v;
    }
    return [h, t];
  }

  function render() {
    const r = analyze(document.getElementById("log").value);
    document.getElementById("out").replaceChildren(
      ...table("الملخص", [["سطور مفهومة", r.parsed], ["سطور مش مفهومة", r.unparsed], ["متوسط الوقت", r.avgMs + "ms"]]),
      ...table("كل status", Object.entries(r.statuses)),
      ...table("أبطأ ٣ endpoints", r.slowest.map(([k, v]) => [k, v + "ms"])),
    );
  }
  document.getElementById("log").addEventListener("input", render);
  render();
</script>
</body>
</html>
~~~

## هتشوف إيه

textarea فيها لوج ١٠ سطور جاهز، وتحتها ٣ جداول بتتحدث وانت بتكتب: ملخص، وعدد كل status، وأبطأ ٣ endpoints.

## اتقاس (Chrome 158 بـ Playwright)

~~~text الناتج: الجداول على اللوج اللي في الصفحة
الملخص
سطور مفهومة       8
سطور مش مفهومة    2
متوسط الوقت       234ms
كل status
200   5
201   1
404   1
500   1
أبطأ ٣ endpoints
DELETE /api/orders/7   980ms
POST /api/orders       340ms
PUT /api/users/3       210ms

analyze("") → {"parsed":0,"unparsed":0,"statuses":{},"avgMs":0,"slowest":[]}
~~~

اتأكدنا بالعد بإيدنا: ٨ سطور سليمة (السطر [[broken line here]] و [[POST /api/login]] من غير status ووقت مش مفهومين)، والمتوسط (120+95+340+12+110+980+210+3) / 8 = 233.75 ≈ 234. و [[/api/products?id=1]] اتحسب مع [[/api/products]] من غير الـ query.

## كل حتة مهمة بتعمل إيه

- **الـ regex بـ named groups:** [[(?<method>GET|POST|PUT|PATCH|DELETE)]] و [[(?<path>\S+)]] (أي حاجة مش مسافة) و [[(?<status>\d{3})]] و [[(?<ms>\d+)ms]]. و [[^]] و [[$]] مع flag [[m]] معناهم أول وآخر **كل سطر**، فـ [[matchAll]] على النص كله بيلاقي السطور السليمة بس، والبايظ بيتعدّى من غير error.
- **[[replace(/\r/g, "")]]:** لوج من Windows، من غيرها [[$]] مكانش هيتطابق قبل [[\r]].
- **[[unparsed = lines.length - parsed]]:** عدد السطور الغير فاضية ناقص اللي اتفهم.
- **[[path.split("?")[0]]]:** الـ endpoint من غير query، عشان [[?id=1]] و [[?id=2]] يتحسبوا endpoint واحد.
- **[[byPath[key] = Math.max(...)]]:** أبطأ وقت لكل endpoint، وبعدين [[sort]] تنازلي و [[slice(0, 3)]].
- **[[parsed ? ... : 0]]:** اللوج الفاضي بيدّي متوسط 0 مش [[NaN]] (القسمة على صفر).
- **[[insertRow]] و [[insertCell]] و [[textContent]]:** الجداول بتتبني من غير [[innerHTML]]، فلو اللوج فيه [[<script>]] في الـ path بيظهر كنص.

## الغلطات اللي حصلت وإزاي اتصلحت

- **من غير flag [[m]]:** [[^]] و [[$]] كانوا أول وآخر النص كله، فـ [[matchAll]] على لوج سطرين رجّع 0 matches، ومع [[m]] رجّع 2 (اتجرّبت في Node 24). ده الفرق اللي flag [[m]] بيعمله.
- **[[\S+]] للـ path كان [[.+]]:** [[.+]] greedy أكلت [[200 120]] مع الـ path والـ regex رجع يدوّر (backtrack) لحد ما لقى الأرقام. اشتغل، بس بخطوات رجوع كتير على كل سطر. [[\S+]] بتقف عند أول مسافة.`  },
        { lvl: 'متوسط', dir: "mini-markdown", t: R`Markdown صغير لـ HTML`, what: R`[[md(text)]] بتحوّل [[**bold**]] و [[*italic*]] وسطر بيبدأ بـ [[# ]] لعنوان، واللينكات [[[نص](url)]]. الأول escape للـ HTML ([[&]] و [[<]] و [[>]]) وبعدين الـ regex، والـ url لازم يبدأ بـ [[https://]] أو [[/]]. وصفحة فيها textarea وpreview حي. من دروس groups و replace.`, done: R`[["**مهم** و *مايل*"]] ← [[<strong>مهم</strong> و <em>مايل</em>]]. [[<script>]] في النص بيظهر كنص. لينك [[javascript:alert(1)]] مبيتحولش لينك. و [[**]] من غير قفلة بتفضل نجوم زي ما هي.`, sol: R`## الشكل النهائي

~~~live 330 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Markdown صغير</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
  textarea { font: 14px/1.5 monospace; width: 100%; box-sizing: border-box; height: 180px; }
  #preview { border: 1px dashed #aaa; padding: 8px 12px; min-height: 160px; }
  #preview h1 { font-size: 22px; margin: 4px 0; }
</style>
</head>
<body>
<div class="cols">
  <textarea id="src" aria-label="Markdown"># أهلا

**مهم** و *مايل* و [الكورس](/js) و [موقع](https://site.example)
&lt;script&gt;alert(1)&lt;/script&gt;
[فخ](javascript:alert(1)) و **من غير قفلة</textarea>
  <div id="preview"></div>
</div>
<script>
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  const escapeHTML = s => s.replace(/[&<>"]/g, c => ESC[c]);

  function md(text) {
    return escapeHTML(text)
      .split(/\r?\n/)
      .map(line => {
        const h = line.match(/^# (.+)$/);
        if (h) return "<h1>" + inline(h[1]) + "</h1>";
        return line.trim() ? "<p>" + inline(line) + "</p>" : "";
      })
      .join("\n");
  }

  function inline(s) {
    return s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(((?:https:\/\/|\/)[^\s)]*)\)/g, '<a href="$2">$1</a>');
  }

  const src = document.getElementById("src");
  const preview = document.getElementById("preview");
  const render = () => { preview.innerHTML = md(src.value); };
  src.addEventListener("input", render);
  render();
</script>
</body>
</html>
~~~

## هتشوف إيه

عمودين (واحد تحت التاني على الموبايل): Markdown على الشمال وانت بتكتب، والـ preview على اليمين بيتحدث مع كل حرف. النص الجاهز فيه كل الحالات الصعبة: script، ولينك [[javascript:]]، ونجمتين من غير قفلة.

## اتقاس (Chrome 158 بـ Playwright)

~~~text الناتج: الـ HTML اللي اتولّد في الـ preview
<h1>أهلا</h1>

<p><strong>مهم</strong> و <em>مايل</em> و <a href="/js">الكورس</a> و <a href="https://site.example">موقع</a></p>
<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>
<p>[فخ](javascript:alert(1)) و **من غير قفلة</p>

عناصر script في الـ preview: 0، واللينكات: /js https://site.example
~~~

و [[md("**مهم** و *مايل*")]] من الـ console طلّعت [[<p><strong>مهم</strong> و <em>مايل</em></p>]] زي المطلوب.

## كل حتة مهمة بتعمل إيه

- **[[escapeHTML]] الأول:** قبل أي regex، كل [[<]] و [[>]] و [[&]] و [["]] بقت entities. فالـ [[<script>]] بقى نص، وأي HTML بنولّده بعد كده هو اللي احنا كاتبينه بس.
- **سطر سطر بـ [[split(/\r?\n/)]]:** [[/^# (.+)$/]] بيشوف لو السطر عنوان، ولو لأ فقرة [[<p>]]، والسطور الفاضية بتتشال.
- **[[/\*\*(.+?)\*\*/g]] قبل [[/\*(.+?)\*/g]]:** الترتيب مهم: لو الـ italic اشتغل الأول، [[**مهم**]] كانت هتبقى [[<em></em>مهم<em></em>]]. و [[.+?]] lazy عشان [[**أ** و **ب**]] تبقى bold مرتين مش bold واحد من أول نجمة لآخر نجمة. والنجمتين من غير قفلة مفيش ليهم match ففضلوا زي ما هم.
- **اللينك:** آخر [[replace]] في [[inline]]: نص بين قوسين مربعين، وبعده URL بين قوسين عاديين **لازم** يبدأ بـ [[https://]] أو [[/]] (الجزء [[(?:https://|/)]] في الـ regex). [[javascript:alert(1)]] مبيبدأش بيهم فمبيتحولش (المتصفح كان هينفّذه لو اتضغط). و [[$1]] و [[$2]] في نص الاستبدال هنا آمنين لأن القيم دي اتعملها escape خلاص.

## الغلطات اللي حصلت وإزاي اتصلحت

- **الـ escape بعد الـ regex في أول نسخة:** كل [[<strong>]] ظهر كنص على الشاشة. الحل: escape الأول وبعدين الـ regex.
- **اللينك كان [[\((.+?)\)]] من غير فحص البداية:** [[javascript:alert(1)]] اتحوّل لينك. الحل: allowlist للبداية بدل ما تحاول تمنع [[javascript:]] بالاسم (فيه [[JavaScript:]] و [[java&#09;script:]] وغيرهم).
- **[[(1)]] جوه الـ URL:** [[[^\s)]*]] بيقف عند أول [[)]]، فـ URL فيه قوس هيتقطع. ده حد معروف في الـ regex البسيط، والـ parser الحقيقي ([[marked]] مثلًا) بيعدّ الأقواس.`  },
        { lvl: 'كبير', dir: "signup-validators", t: R`validator لفورم تسجيل`, what: R`module [[validators.js]] فيه دوال للـ username والموبايل والباسورد والكود البريدي، كل واحدة بترجّع رسالة غلط بالعربي أو null. الفورم بيعرض الغلط تحت كل حقل وانت بتكتب، والإرسال بيرمي ValidationError فيه كل الحقول. وكل pattern متجرّب ضد ReDoS بـ input طويل ([[repeat(10000)]]) في [[test.js]] بيقيس الوقت. من الوحدة دي ووحدات الأخطاء والـ modules والـ DOM.`, done: R`test.js فيه ٣ أمثلة صح و ٣ غلط لكل حقل وكلهم بينجحوا، وأي pattern ياخد أكتر من 50ms على الـ input الطويل بيطبع تحذير (ومفيش ولا واحد). الأرقام العربي مقبولة في الموبايل. والفورم مبيتبعتش وفيه غلط، والرسايل بتختفي أول ما الحقل يتصلّح.`, ext: R`خلّي نفس [[validators.js]] يشتغل في المتصفح وفي سيرفر Node من غير تعديل، وزوّد فحص «الـ username متاخد» بـ fetch و debounce.`, sol: R`## الشكل النهائي

~~~view 470 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تسجيل حساب</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 420px; }
  label { display: block; margin-top: 10px; font-weight: 600; }
  input { font: inherit; width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #888; border-radius: 6px; }
  input[aria-invalid="true"] { border-color: #b91c1c; background: #fef2f2; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1.4em; margin: 2px 0 0; }
  button { font: inherit; margin-top: 14px; padding: 8px 20px; }
  #done { color: #15803d; }
</style>
</head>
<body>
<form id="signup" novalidate>
  <label for="username">اسم المستخدم</label>
  <input id="username" name="username" autocomplete="username" aria-describedby="username-err">
  <p class="err" id="username-err"></p>
  <label for="phone">الموبايل</label>
  <input id="phone" name="phone" inputmode="tel" autocomplete="tel" aria-describedby="phone-err">
  <p class="err" id="phone-err"></p>
  <label for="password">الباسورد</label>
  <input id="password" name="password" type="password" autocomplete="new-password" aria-describedby="password-err">
  <p class="err" id="password-err"></p>
  <label for="postal">الكود البريدي</label>
  <input id="postal" name="postal" inputmode="numeric" aria-describedby="postal-err">
  <p class="err" id="postal-err"></p>
  <button>سجّل</button>
  <p id="done" aria-live="polite"></p>
</form>
<script>
  class ValidationError extends Error {
    constructor(fields) {
      super("البيانات فيها غلط");
      this.name = "ValidationError";
      this.fields = fields;
    }
  }

  const toLatin = s => s.replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660));

  const PATTERNS = {
    username: /^[a-z][a-z0-9_]{2,19}$/,
    phone: /^01[0125]\d{8}$/,
    postal: /^\d{5}$/,
    lower: /[a-z]/,
    upper: /[A-Z]/,
    digit: /\p{Nd}/u,
  };

  function username(v) {
    if (!v) return "اسم المستخدم مطلوب";
    return PATTERNS.username.test(v) ? null : "من ٣ لـ ٢٠ حرف: حروف إنجليزي صغيرة وأرقام و _، ويبدأ بحرف";
  }

  function phone(v) {
    if (!v) return "الموبايل مطلوب";
    const digits = toLatin(v).replace(/[\s-]/g, "");
    return PATTERNS.phone.test(digits) ? null : "موبايل مصري ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015";
  }

  function password(v) {
    if (!v || v.length < 8) return "الباسورد ٨ حروف على الأقل";
    if (v.length > 128) return "الباسورد طويل أوي";
    const missing = [];
    if (!PATTERNS.lower.test(v)) missing.push("حرف صغير");
    if (!PATTERNS.upper.test(v)) missing.push("حرف كبير");
    if (!PATTERNS.digit.test(v)) missing.push("رقم");
    return missing.length ? "ناقصه: " + missing.join(" و ") : null;
  }

  function postal(v) {
    if (!v) return "الكود البريدي مطلوب";
    return PATTERNS.postal.test(toLatin(v.trim())) ? null : "الكود البريدي ٥ أرقام";
  }

  const VALIDATORS = { username, phone, password, postal };

  function validateAll(data) {
    const fields = {};
    for (const [name, check] of Object.entries(VALIDATORS)) {
      const msg = check(data[name] ?? "");
      if (msg) fields[name] = msg;
    }
    if (Object.keys(fields).length) throw new ValidationError(fields);
    return true;
  }


  const form = document.getElementById("signup");
  const touched = new Set();

  function showField(name, msg) {
    form.elements[name].setAttribute("aria-invalid", msg ? "true" : "false");
    document.getElementById(name + "-err").textContent = msg ?? "";
  }

  form.addEventListener("input", e => {
    const name = e.target.name;
    touched.add(name);
    showField(name, VALIDATORS[name](e.target.value));
    document.getElementById("done").textContent = "";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    try {
      validateAll(data);
      for (const name of Object.keys(VALIDATORS)) showField(name, null);
      document.getElementById("done").textContent = "اتسجّل (تجربة: مفيش سيرفر)";
    } catch (err) {
      if (!(err instanceof ValidationError)) throw err;
      for (const name of Object.keys(VALIDATORS)) showField(name, err.fields[name]);
      form.elements[Object.keys(err.fields)[0]].focus();
    }
  });
</script>
</body>
</html>
~~~

(الـ preview فوق نفس الصفحة بس [[validators.js]] متحط جواها، لأن الـ preview مبيقراش ملفات جنبه. في مشروعك هي [[index.html]] بتعمل import زي تحت.)

## الملفات

~~~text الشجرة
signup-validators/
├── package.json     "type": "module" و npm test
├── validators.js    الدوال والـ patterns و ValidationError (المتصفح و Node)
├── index.html       الفورم: <script type="module"> بيستورد validators.js
└── test.js          ٣ صح و ٣ غلط لكل حقل، و validateAll، وفحص ReDoS
~~~

اتبنى بالترتيب ده: [[validators.js]] والاختبارات بتاعته في Node الأول (من غير متصفح خالص)، وبعدين الفورم فوقه.

~~~json package.json
{
  "name": "signup-validators",
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
~~~

~~~js validators.js
// نفس الملف بيشتغل في المتصفح (<script type="module">) وفي Node (import)
export class ValidationError extends Error {
  constructor(fields) {
    super("البيانات فيها غلط");
    this.name = "ValidationError";
    this.fields = fields;
  }
}

const toLatin = s => s.replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660));

export const PATTERNS = {
  username: /^[a-z][a-z0-9_]{2,19}$/,
  phone: /^01[0125]\d{8}$/,
  postal: /^\d{5}$/,
  lower: /[a-z]/,
  upper: /[A-Z]/,
  digit: /\p{Nd}/u,
};

export function username(v) {
  if (!v) return "اسم المستخدم مطلوب";
  return PATTERNS.username.test(v) ? null : "من ٣ لـ ٢٠ حرف: حروف إنجليزي صغيرة وأرقام و _، ويبدأ بحرف";
}

export function phone(v) {
  if (!v) return "الموبايل مطلوب";
  const digits = toLatin(v).replace(/[\s-]/g, "");
  return PATTERNS.phone.test(digits) ? null : "موبايل مصري ١١ رقم بيبدأ بـ 010 أو 011 أو 012 أو 015";
}

export function password(v) {
  if (!v || v.length < 8) return "الباسورد ٨ حروف على الأقل";
  if (v.length > 128) return "الباسورد طويل أوي";
  const missing = [];
  if (!PATTERNS.lower.test(v)) missing.push("حرف صغير");
  if (!PATTERNS.upper.test(v)) missing.push("حرف كبير");
  if (!PATTERNS.digit.test(v)) missing.push("رقم");
  return missing.length ? "ناقصه: " + missing.join(" و ") : null;
}

export function postal(v) {
  if (!v) return "الكود البريدي مطلوب";
  return PATTERNS.postal.test(toLatin(v.trim())) ? null : "الكود البريدي ٥ أرقام";
}

export const VALIDATORS = { username, phone, password, postal };

export function validateAll(data) {
  const fields = {};
  for (const [name, check] of Object.entries(VALIDATORS)) {
    const msg = check(data[name] ?? "");
    if (msg) fields[name] = msg;
  }
  if (Object.keys(fields).length) throw new ValidationError(fields);
  return true;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تسجيل حساب</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 420px; }
  label { display: block; margin-top: 10px; font-weight: 600; }
  input { font: inherit; width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #888; border-radius: 6px; }
  input[aria-invalid="true"] { border-color: #b91c1c; background: #fef2f2; }
  .err { color: #b91c1c; font-size: 14px; min-height: 1.4em; margin: 2px 0 0; }
  button { font: inherit; margin-top: 14px; padding: 8px 20px; }
  #done { color: #15803d; }
</style>
</head>
<body>
<form id="signup" novalidate>
  <label for="username">اسم المستخدم</label>
  <input id="username" name="username" autocomplete="username" aria-describedby="username-err">
  <p class="err" id="username-err"></p>
  <label for="phone">الموبايل</label>
  <input id="phone" name="phone" inputmode="tel" autocomplete="tel" aria-describedby="phone-err">
  <p class="err" id="phone-err"></p>
  <label for="password">الباسورد</label>
  <input id="password" name="password" type="password" autocomplete="new-password" aria-describedby="password-err">
  <p class="err" id="password-err"></p>
  <label for="postal">الكود البريدي</label>
  <input id="postal" name="postal" inputmode="numeric" aria-describedby="postal-err">
  <p class="err" id="postal-err"></p>
  <button>سجّل</button>
  <p id="done" aria-live="polite"></p>
</form>
<script type="module">
  import { VALIDATORS, validateAll, ValidationError } from "./validators.js";

  const form = document.getElementById("signup");
  const touched = new Set();

  function showField(name, msg) {
    form.elements[name].setAttribute("aria-invalid", msg ? "true" : "false");
    document.getElementById(name + "-err").textContent = msg ?? "";
  }

  form.addEventListener("input", e => {
    const name = e.target.name;
    touched.add(name);
    showField(name, VALIDATORS[name](e.target.value));
    document.getElementById("done").textContent = "";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    try {
      validateAll(data);
      for (const name of Object.keys(VALIDATORS)) showField(name, null);
      document.getElementById("done").textContent = "اتسجّل (تجربة: مفيش سيرفر)";
    } catch (err) {
      if (!(err instanceof ValidationError)) throw err;
      for (const name of Object.keys(VALIDATORS)) showField(name, err.fields[name]);
      form.elements[Object.keys(err.fields)[0]].focus();
    }
  });
</script>
</body>
</html>
~~~

~~~js test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { username, phone, password, postal, validateAll, ValidationError, PATTERNS } from "./validators.js";

const cases = {
  username: [username, ["sara_99", "ali", "omar2026"], ["Sara", "9lives", "a b"]],
  phone: [phone, ["01012345678", "015 1234 5678", "٠١٢٣٤٥٦٧٨٩٠"], ["0131234567", "01312345678", "+201012345678"]],
  password: [password, ["Passw0rd", "Abcdefg١", "xY7xxxxx"], ["short1A", "password1", "PASSWORD1"]],
  postal: [postal, ["11511", "٢١٥٣٢", " 12345 "], ["1234", "123456", "12a45"]],
};

for (const [name, [fn, good, bad]] of Object.entries(cases)) {
  test(name + ": ٣ صح و ٣ غلط", () => {
    for (const v of good) assert.equal(fn(v), null, "المفروض يعدّي: " + v);
    for (const v of bad) assert.equal(typeof fn(v), "string", "المفروض يترفض: " + v);
  });
}

test("validateAll بيرمي ValidationError فيه كل الحقول الغلط", () => {
  assert.throws(() => validateAll({ username: "x", phone: "1", password: "", postal: "11511" }), err => {
    assert.ok(err instanceof ValidationError);
    assert.deepEqual(Object.keys(err.fields), ["username", "phone", "password"]);
    return true;
  });
  assert.equal(validateAll({ username: "sara_99", phone: "01012345678", password: "Passw0rd", postal: "11511" }), true);
});

test("ReDoS: كل pattern على input طويل أقل من 50ms", () => {
  const evil = ["a".repeat(10000) + "!", "0".repeat(10000), "_".repeat(10000) + " "];
  for (const [name, re] of Object.entries(PATTERNS)) {
    for (const s of evil) {
      const t = performance.now();
      re.test(s);
      const ms = performance.now() - t;
      if (ms > 50) console.log("تحذير:", name, ms.toFixed(1) + "ms");
      assert.ok(ms < 50, name + " أخد " + ms.toFixed(1) + "ms");
    }
  }
});
~~~

الصفحة لازم تتفتح من server (مثلًا [[npx serve]] أو Live Server في VS Code)، لأن [[import]] مبيشتغلش من [[file://]].

## الاختبارات

~~~text الناتج (npm test، Node 24)
✔ username: ٣ صح و ٣ غلط (1.2931ms)
✔ phone: ٣ صح و ٣ غلط (0.2797ms)
✔ password: ٣ صح و ٣ غلط (0.3176ms)
✔ postal: ٣ صح و ٣ غلط (0.1862ms)
✔ validateAll بيرمي ValidationError فيه كل الحقول الغلط (0.9733ms)
✔ ReDoS: كل pattern على input طويل أقل من 50ms (0.8556ms)
ℹ tests 6
ℹ suites 0
ℹ pass 6
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 84.0868
~~~

## اتقاس في الصفحة (Chrome 158 بـ Playwright)

~~~text الناتج
ضغطت سجّل والفورم فاضي:
username: اسم المستخدم مطلوب
phone: الموبايل مطلوب
password: الباسورد ٨ حروف على الأقل
postal: الكود البريدي مطلوب
الـ focus راح على: username

وانا بكتب (Sara و ٠١٠١٢٣٤٥٦٧٨ و password1 و 1151):
username: من ٣ لـ ٢٠ حرف: حروف إنجليزي صغيرة وأرقام و _، ويبدأ بحرف
phone: —
password: ناقصه: حرف كبير
postal: الكود البريدي ٥ أرقام

بعد التصليح وسجّل:
username: —   phone: —   password: —   postal: —
اتسجّل (تجربة: مفيش سيرفر)
~~~

## كل حتة مهمة بتعمل إيه

- **كل validator بيرجّع رسالة أو [[null]]:** شكل واحد للأربعة، فالفورم و [[validateAll]] بيلفوا عليهم في [[VALIDATORS]] من غير [[if]] لكل حقل.
- **[[PATTERNS]] متصدّرة:** عشان الاختبار يجرّب كل regex على input طويل.
- **[[username]]:** [[/^[a-z][a-z0-9_]{2,19}$/]]: أول حرف، وبعده ٢ لـ ١٩، فالطول من ٣ لـ ٢٠. ومفيش quantifier جوه quantifier.
- **[[phone]]:** [[toLatin]] بيحوّل [[٠-٩]] (الـ range من [[٠]] لـ [[٩]] في Unicode متتالي) وبعدين نفس regex المشروع الصغير.
- **[[password]]:** طول الأول ([[length]] مش regex)، وحد أقصى ١٢٨، وبعدين ٣ regex صغيرين، ورسالة بالناقص بس.
- **[[validateAll]]:** بيجمع كل الحقول الغلط في [[fields]] ويرمي **error واحد**، فاليوزر يشوف كل الغلطات مرة واحدة.
- **في الفورم:** [[input]] على الفورم كله (event delegation) بيفحص الحقل اللي اتغيّر بس، و [[aria-invalid]] و [[aria-describedby]] بيخلّوا قارئ الشاشة يقرا الرسالة. والـ submit بيعمل [[focus]] على أول حقل غلط.
- **فحص ReDoS:** ٣ نصوص طول كل واحد ١٠ آلاف (حروف وآخرها [[!]]، وأصفار، و [[_]] وآخرها مسافة) على كل pattern، وأي واحد ياخد أكتر من 50ms بيطبع تحذير ويفشّل الاختبار. كلهم خلصوا في أقل من 1ms.

## الغلطات اللي حصلت وإزاي اتصلحت

**أول pattern لاسم المستخدم** كان [[/^([a-z0-9]+_?)+$/]] (كلمات بينها [[_]] اختيارية). بيشتغل على كل الأمثلة، بس:

~~~js redos-demo.js
// الـ pattern اللي كان في أول نسخة لاسم المستخدم
const first = /^([a-z0-9]+_?)+$/;
const now = /^[a-z][a-z0-9_]{2,19}$/;
for (const n of [20, 24, 28]) {
  const s = "a".repeat(n) + "!";
  let t = performance.now();
  first.test(s);
  const a = performance.now() - t;
  t = performance.now();
  now.test(s);
  const b = performance.now() - t;
  console.log("n=" + n, "أول نسخة:", a.toFixed(1) + "ms", "| النسخة الحالية:", b.toFixed(2) + "ms");
}
~~~

~~~text الناتج (node redos-demo.js، Node 24 على Windows)
n=20 أول نسخة: 63.0ms | النسخة الحالية: 0.04ms
n=24 أول نسخة: 94.5ms | النسخة الحالية: 0.08ms
n=28 أول نسخة: 1478.0ms | النسخة الحالية: 0.00ms
~~~

٢٨ حرف وعلامة تعجب = أكتر من ثانية والصفحة واقفة. ده نفس الـ quantifier جوه quantifier بتاع درس «إمتى regex غلط». البديل بيحدد الطول ومش بيدّي طريقتين لنفس الحروف.

**ومن غير [[aria-invalid="false"]]** الحقل اللي اتصلّح كان بيفضل أحمر لحد الضغط على سجّل، فـ [[showField]] بتكتب الحالتين.`  },
        { lvl: 'فكرة', t: R`استخرج من نص طويل`, what: R`أداة بتاخد نص طويل (لوج، أو شات متصدّر، أو كود) وتطلّع منه حاجات: لينكات، أو أرقام موبايل، أو تواريخ، أو أكتر كلمة اتكررت. انت اللي تختار.`, done: R`كل pattern في ملف لوحده معاه أمثلة صح وغلط، ومفيش regex لـ HTML أو JSON (parser بداله)، والأداة بتتعامل صح مع العربي.`, ext: R`اعرض النتايج في جدول وزوّد تصدير CSV، أو حوّلها CLI بـ Node بتقرا ملف.`, sol: R`## نسخة نموذجية: أداة بتطلّع البيانات من شات متصدّر

اخترنا ملف شات (زي اللي بيتصدّر من أي تطبيق محادثة) لأنه فيه كل حاجة: لينكات، وأرقام موبايل بالعربي والإنجليزي، وتواريخ، وكلام عربي فيه تشكيل.

## الشكل النهائي

~~~text chat.txt
[2026-11-20 10:01] سلمى: الميعاد 2026-11-21 الساعة ١٠، اللينك https://meet.example/abc-123.
[2026-11-20 10:03] كريم: تمام، ولو اتأخرت كلّموني على ٠١٠١٢٣٤٥٦٧٨ أو 0155 123 4567
[2026-11-20 10:04] سلمى: الكود في https://git.example/team/app?tab=files، و الكود لازم يتراجع قبل الميعاد
[2026-11-20 10:05] ندى: الكُود جاهز من 2026-11-19، وفيه رقم غلط 0101234567 ومتاريخ غلط 2026-13-40
~~~

~~~text الناتج (node extract.js chat.txt، Node 24)
لينكات: [
  'https://meet.example/abc-123',
  'https://git.example/team/app?tab=files'
]
موبايلات: [ '01012345678', '0155 123 4567' ]
تواريخ: [ '2026-11-20', '2026-11-21', '2026-11-19' ]
أكتر ٣ كلمات: [ [ 'الكود', 3 ], [ 'سلمى', 2 ], [ 'الميعاد', 2 ] ]
~~~

## الملفات

~~~text الشجرة
extractor/
├── package.json
├── patterns/
│   ├── links.js     كل ملف: name و re وأمثلة good و bad
│   ├── phones.js    (و prepare: يحوّل الأرقام العربي قبل الـ regex)
│   ├── dates.js
│   └── words.js
├── check.js         بيجرّب كل pattern على أمثلته
├── extract.js       CLI: node extract.js file.txt
└── chat.txt         ملف للتجربة
~~~

~~~json package.json
{ "type": "module", "scripts": { "check": "node check.js" } }
~~~

~~~js patterns/links.js
export default {
  name: "لينكات",
  re: /\bhttps?:\/\/[^\s<>"'()]+[^\s<>"'().,،!?؟:;]/gu,
  good: ["شوف https://shop.example/p?id=7 كده", "http://a.example/x."],
  bad: ["ftp://a.example", "https://"],
};
~~~

~~~js patterns/phones.js
// الأرقام العربي بتتحوّل إنجليزي الأول، وبعدين الـ regex بأرقام إنجليزي بس
const toLatin = s => s.replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x660));

export default {
  name: "موبايلات",
  prepare: toLatin,
  re: /(?<!\d)(?:\+20|0020|0)?1[0125](?:[\s-]?\d){8}(?!\d)/g,
  good: ["كلمني 01012345678", "0155 123 4567", "+201012345678 ده رقمي", "٠١٠١٢٣٤٥٦٧٨"],
  bad: ["0101234567", "12345678901234"],
};
~~~

~~~js patterns/dates.js
export default {
  name: "تواريخ ISO",
  re: /\b\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])\b/g,
  good: ["الميعاد 2026-11-21 الصبح", "من 2026-01-31"],
  bad: ["2026-13-01", "2026-1-5"],
};
~~~

~~~js patterns/words.js
export default {
  name: "كلمات",
  re: /[\p{L}\p{M}]+/gu,
  good: ["الْكود", "hello"],
  bad: ["123", "!!!"],
};
~~~

~~~js check.js
import { readdir } from "node:fs/promises";

// كل pattern لازم يمسك أمثلته الصح ويسيب الغلط
let failed = 0;
for (const file of await readdir(new URL("./patterns/", import.meta.url))) {
  const before = failed;
  const { default: p } = await import("./patterns/" + file);
  const prep = p.prepare ?? (s => s);
  for (const s of p.good) if (!(prep(s).match(p.re) ?? []).length) { failed++; console.log("✗", p.name, "مسكش:", s); }
  for (const s of p.bad) if ((prep(s).match(p.re) ?? []).length) { failed++; console.log("✗", p.name, "مسك غلط:", s); }
  console.log(failed === before ? "✓" : "✗", p.name, p.good.length + p.bad.length, "مثال");
}
process.exitCode = failed ? 1 : 0;
~~~

~~~js extract.js
import { readFile } from "node:fs/promises";
import links from "./patterns/links.js";
import phones from "./patterns/phones.js";
import dates from "./patterns/dates.js";
import words from "./patterns/words.js";

const file = process.argv[2];
if (!file) {
  console.error("الاستخدام: node extract.js chat.txt");
  process.exit(1);
}
const text = await readFile(file, "utf8");

const unique = ({ re, prepare = s => s }) => [...new Set(prepare(text).match(re) ?? [])];
const STOP = new Set(["في", "من", "و", "على", "ده", "دي", "انا", "مش", "لو"]);

console.log("لينكات:", unique(links));
console.log("موبايلات:", unique(phones));
console.log("تواريخ:", unique(dates));

// أكتر كلمة: من غير اللينكات، وبعد ما نشيل التشكيل
const counts = new Map();
for (const w of text.replace(links.re, " ").match(words.re) ?? []) {
  const key = w.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  if (key.length < 2 || STOP.has(key)) continue;
  counts.set(key, (counts.get(key) ?? 0) + 1);
}
console.log("أكتر ٣ كلمات:", [...counts].sort((a, b) => b[1] - a[1]).slice(0, 3));
~~~

~~~text الناتج (node check.js)
✓ تواريخ ISO 4 مثال
✓ لينكات 4 مثال
✓ موبايلات 6 مثال
✓ كلمات 4 مثال
exit=0
~~~

~~~text الناتج (node extract.js من غير ملف)
الاستخدام: node extract.js chat.txt
exit=1
~~~

## ليه التصميم ده

- **كل pattern في ملف ومعاه أمثلته:** زي ما المطلوب قال. [[check.js]] بيقرا الفولدر كله بـ [[readdir]] و [[import()]]، فأي pattern جديد بيتفحص لوحده، و [[process.exitCode = 1]] لو أي مثال فشل (ينفع في CI).
- **اللينك:** [[https?:\/\/]] وبعده أي حاجة مش مسافة أو علامة HTML، و **آخر حرف** مش علامة ترقيم ([[.]] و [[،]] و [[؟]]...). عشان كده [[https://meet.example/abc-123.]] طلع من غير النقطة اللي في آخر الجملة.
- **الموبايل:** [[(?<!\d)]] و [[(?!\d)]] (lookbehind و lookahead) بيقولوا «مفيش رقم قبله ولا بعده»، فـ [[0101234567]] (١٠ أرقام) اترفض ومفيش رقم بيتقطع من نص أطول. و [[(?:[\s-]?\d){8}]] بيسمح بمسافة أو شَرطة قبل أي رقم، فـ [[0155 123 4567]] اتمسك.
- **التاريخ:** الشهر [[(?:0[1-9]|1[0-2])]] واليوم [[(?:0[1-9]|[12]\d|3[01])]]، فـ [[2026-13-40]] اترفض. (ده فحص شكل بس؛ [[2026-02-30]] هيعدّي، والفحص الكامل بـ [[parseISODate]] من وحدة التواريخ.)
- **الكلمات:** [[[\p{L}\p{M}]+]]: حروف وعلامات تشكيل ([[\p{M}]]) مع بعض، وبعدين [[normalize("NFD")]] وشيل [[\p{M}]]، فـ [[الكُود]] و [[الكود]] اتحسبوا كلمة واحدة (٣ مرات). واللينكات بتتشال قبل العد.
- **مفيش regex لـ HTML أو JSON:** الأداة بتقرا نص عادي. لو الملف JSON (تصدير تاني) يبقى [[JSON.parse]] الأول وبعدين الـ regex على حقل النص بس.

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول تشغيل لـ [[check.js]]:** [[✗ موبايلات مسكش: ٠١٠١٢٣٤٥٦٧٨]]. الـ regex فيه [[0]] و [[1]] حرفيًا، والأرقام العربي حروف تانية خالص. الحل كان [[prepare]]: نحوّل النص لأرقام إنجليزي قبل الـ regex، بدل regex فيه [[[0٠]]] في كل مكان.
- **[[0155 123 4567]] مكانش بيتمسك:** النسخة الأولى كانت [[\d{4}[\s-]?\d{4}]]، يعني المسافة بعد ٤ أرقام بس. لما زوّدناه للأمثلة [[check.js]] فشل، فبقت [[(?:[\s-]?\d){8}]].
- **«أكتر كلمة» طلعت [[https]]:** كان بيعد حروف اللينكات. اتصلحت بـ [[text.replace(links.re, " ")]] قبل العد.`  },
      ],
      items: [
        {
          cmd: "regex: classes و quantifiers",
          title: "تكتب pattern إزاي؟ (classes و quantifiers و anchors)",
          desc: R`الـ regex (regular expression) نص بيوصف شكل نصوص: «01 وبعدها رقم من 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام». بيتكتب بين [[/ /]] و [[pattern.test(text)]] بترجّع true أو false.

الـ classes (نوع الحرف): [[\d]] رقم، و [[\w]] حرف إنجليزي أو رقم أو [[_]]، و [[\s]] مسافة أو tab أو سطر جديد، و [[.]] أي حرف غير السطر الجديد. والكابيتال عكسهم ([[\D]] أي حاجة مش رقم). و [[[abc]]] واحد من دول، و [[[a-z]]] مدى، و [[[^0-9]]] أي حاجة غير دول.

الـ quantifiers (كام مرة): [[?]] صفر أو مرة، و [[*]] صفر أو أكتر، و [[+]] مرة أو أكتر، و [[{8}]] ٨ بالظبط، و [[{2,}]] ٢ أو أكتر، و [[{2,5}]] من ٢ لـ ٥. ولو حطيت [[?]] بعدهم ([[*?]] و [[+?]]) بيبقوا lazy: ياخدوا أقل حاجة ممكنة بدل أكبر حاجة.

الـ anchors (مكان مش حرف): [[^]] أول النص، و [[$]] آخره، و [[\b]] حدود كلمة. من غير [[^...$]]، الـ test بتدوّر على الـ pattern في أي حتة في النص.`,
          example: R`const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone.test("0101234567"), phone.test("01312345678"));
console.log(/colou?r/.test("color"), /\bcat\b/.test("concat"), /\bcat\b/.test("a cat!"));
console.log("a1 b22 c333".match(/\d+/g), "a1 b22".match(/\d{2,}/g));
console.log("<b>x</b><b>y</b>".match(/<b>.*<\/b>/)[0]);
console.log("<b>x</b><b>y</b>".match(/<b>.*?<\/b>/)[0]);
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
console.log(slug.test("my-first-post"), slug.test("My--post"));
console.log("١٢٣ و 45".match(/\d+/g), "١٢٣ و 45".match(/\p{Nd}+/gu));
console.log("سعر القهوة 45 جنيه".match(/\p{Script=Arabic}+/gu));`,
          try: R`اكتب regex لـ: (١) كود بريدي مصري ٥ أرقام بالظبط، (٢) username من ٣ لـ ١٦ حرف إنجليزي صغير أو رقم أو [[_]] ولازم يبدأ بحرف، (٣) لون hex زي [[#fff]] أو [[#1F2430]]. جرّب كل واحد على ٣ أمثلة صح و ٣ غلط. وبعدين شيل [[^]] و [[$]] من الـ phone وجرّب [[phone.test("x010123456789999")]].`,
          ref: [
            { t: "MDN: Regular expressions (guide)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions" },
            { t: "MDN: Character classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes" },
            { t: "MDN: Quantifiers", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers" },
            { t: "MDN: RegExp.prototype.test()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**ابني:** [[<input id="pin" inputmode="numeric">]] لـ PIN من ٤ أرقام، ومع كل [[input]] event الحدود تبقى خضرا لو [[/^\d{4}$/.test(value)]] وحمرا لو لأ. جرّب [[1234]] و [[12345]] و [[12a4]] والأرقام العربي [[١٢٣٤]].`, done: R`[[1234]] بس اللي أخضر، والتلاتة التانيين أحمر، ومنهم [[١٢٣٤]] لأن [[\d]] من غير [[u]] إنجليزي بس. ولو عايز تقبل العربي: [[/^\p{Nd}{4}$/u]] وبعدها حوّلهم لأرقام إنجليزي قبل ما تبعت.`, sol: R`~~~live 170 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>PIN</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  input { font: 24px monospace; width: 6ch; padding: 4px 8px; border: 3px solid #999; border-radius: 6px; direction: ltr; }
  input.ok { border-color: #15803d; }
  input.bad { border-color: #b91c1c; }
</style>
</head>
<body>
<label for="pin">الـ PIN (٤ أرقام)</label><br>
<input id="pin" inputmode="numeric" autocomplete="off">
<p id="msg" aria-live="polite"></p>
<script>
  const PIN = /^\d{4}$/;
  const input = document.getElementById("pin");
  const msg = document.getElementById("msg");
  input.addEventListener("input", () => {
    const ok = PIN.test(input.value);
    input.classList.toggle("ok", ok);
    input.classList.toggle("bad", !ok);
    msg.textContent = ok ? "تمام" : "لازم ٤ أرقام إنجليزي بالظبط";
  });
</script>
</body>
</html>
~~~

~~~text اللي اتعرض في Chrome 158 (Playwright)، بعد ما كتبنا كل قيمة
1234   → ok   حدود rgb(21, 128, 61)  | تمام
12345  → bad  حدود rgb(185, 28, 28)  | لازم ٤ أرقام إنجليزي بالظبط
12a4   → bad  حدود rgb(185, 28, 28)  | لازم ٤ أرقام إنجليزي بالظبط
١٢٣٤   → bad  حدود rgb(185, 28, 28)  | لازم ٤ أرقام إنجليزي بالظبط
~~~

ونفس الـ regex في Node، ومعاه النسخة اللي بتقبل الأرقام العربي:

~~~js pin.js
const pin = /^\d{4}$/;
const pinAnyDigits = /^\p{Nd}{4}$/u;
for (const value of ["1234", "12345", "12a4", "١٢٣٤"]) {
  console.log(value.padEnd(6), pin.test(value), pinAnyDigits.test(value));
}
~~~

~~~text الناتج (node pin.js، Node 24)
1234   true true
12345  false false
12a4   false false
١٢٣٤   false true
~~~

**كل حتة بتعمل إيه:**

- [[/^\d{4}$/]]: [[^]] أول النص، و [[\d]] رقم، و [[{4}]] بالظبط ٤ مرات، و [[$]] آخر النص. يعني النص **كله** ٤ أرقام.
- [[input]] event: بيشتغل مع كل حرف (ومع اللصق كمان)، و [[classList.toggle("ok", ok)]] بيحط الكلاس لو [[ok]] بـ true ويشيله لو false.
- [[١٢٣٤]] أحمر: [[\d]] من غير flag [[u]] (ومعاه كمان) معناها [[[0-9]]] بس. عشان تقبل العربي: [[\p{Nd}]] (أي رقم عشري في Unicode) مع [[u]]، والعمود التالت في ناتج Node بيوريها بتقبل [[١٢٣٤]]. وبعدها حوّلها لأرقام إنجليزي قبل ما تبعتها.
- [[inputmode="numeric"]]: بيفتح كيبورد الأرقام على الموبايل، بس مبيمنعش الحروف، فالفحص لازم.

**الغلطة الشائعة:** تنسى [[^]] و [[$]]، فـ [[/\d{4}/]] بيقبل [[12345]] و [[ab1234]] لأنه لقى ٤ أرقام في النص. وغلطة تانية: [[type="number"]] للـ PIN، بيشيل الأصفار اللي في الأول ([[0123]] تبقى 123).`  },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج دول قبل التشغيل: [[/colou?r/.test("color")]] و [[/^a.c$/.test("a\nc")]] و [[/\bcat\b/.test("concat")]] و [[/[^0-9]/.test("123")]] و [["aaa".match(/a+?/)[0]]].`, done: R`توقعت وطلع true و false و false و false و [["a"]]. وتقدر تقول ليه: [[?]] بتخلي الحرف اختياري، و [[.]] مبتطابقش سطر جديد، و [[\b]] حدود كلمة، و [[^]] جوه الأقواس نفي، و [[+?]] بتاخد أقل حاجة.`, sol: R`**التوقع:** true، false، false، false، [["a"]].

~~~js predict.js
console.log(/colou?r/.test("color"));
console.log(/^a.c$/.test("a\nc"));
console.log(/\bcat\b/.test("concat"));
console.log(/[^0-9]/.test("123"));
console.log("aaa".match(/a+?/)[0]);
console.log("aaa".match(/a+/)[0], /^a.c$/s.test("a\nc"));
~~~

~~~text الناتج (node predict.js، Node 24)
true
false
false
false
a
aaa true
~~~

**ليه، سطر سطر:**

1. [[/colou?r/]]: [[?]] بعد [[u]] بتخليها اختيارية (صفر أو مرة)، فـ [["color"]] و [["colour"]] الاتنين بيعدّوا: **true**.
2. [[/^a.c$/]] على [["a\nc"]]: [[.]] أي حرف **ما عدا** السطر الجديد (وإخواته [[\r]])، فـ **false**. ومع flag [[s]] (آخر سطر) [[.]] بتطابق السطر الجديد: true.
3. [[/\bcat\b/]] على [["concat"]]: [[\b]] حدود كلمة (بين حرف وحاجة مش حرف). [[cat]] هنا آخر الكلمة بس قبلها [[n]] حرف، فمفيش حد في الأول: **false**.
4. [[/[^0-9]/]] على [["123"]]: [[^]] **جوه** الأقواس معناها «أي حرف مش من دول». مفيش حرف مش رقم: **false**. (و [[^]] برّه الأقواس معناها أول النص، نفس الرمز بمعنيين.)
5. [["aaa".match(/a+?/)[0]]]: [[+]] لوحدها greedy بتاخد أكتر حاجة ([["aaa"]] في آخر سطر)، و [[+?]] lazy بتاخد أقل حاجة تكفي: حرف واحد **[["a"]]**.

**الغلطة الشائعة:** تخلط بين [[^]] جوه الأقواس وبرّه، أو تفتكر إن [[.]] بتطابق كل حاجة. لو بتدوّر في نص فيه سطور، خلي بالك من [[.]] وفكّر في [[s]].`  },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** regex لوقت 24 ساعة [["HH:MM"]] (من [["00:00"]] لـ [["23:59"]]، والساعة رقمين). قبل ما تكتبه، اعمل array فيها ١٠ حالات [[[input, expected]]] منهم [["23:59"]] و [["00:00"]] و [["24:00"]] و [["9:05"]] و [["12:60"]] و [[" 12:30"]]، و loop بيطبع أي حالة فشلت.`, done: R`الـ loop مبيطبعش ولا حالة فاشلة: [["23:59"]] و [["00:00"]] مقبولين، و [["24:00"]] و [["9:05"]] و [["12:60"]] و [[" 12:30"]] مرفوضين. ولو [["24:00"]] عدّى يبقى [[\d{2}]] للساعة مش كفاية، ولو [[" 12:30"]] عدّى يبقى ناسي [[^]].`, sol: R`~~~js time24.js
const time24 = /^([01]\d|2[0-3]):[0-5]\d$/;

const cases = [
  ["23:59", true],
  ["00:00", true],
  ["09:05", true],
  ["12:30", true],
  ["24:00", false],
  ["9:05", false],
  ["12:60", false],
  [" 12:30", false],
  ["12:30 ", false],
  ["1230", false],
];

let failed = 0;
for (const [input, expected] of cases) {
  const got = time24.test(input);
  if (got !== expected) {
    failed++;
    console.log("فشل:", JSON.stringify(input), "متوقع", expected, "طلع", got);
  }
}
console.log(cases.length + " حالات، " + failed + " فشلوا");

// نفس الحالات على نسخة ناقصة: \d{2} للساعة ومن غير ^
const weak = /\d{2}:[0-5]\d$/;
for (const [input, expected] of cases) {
  if (weak.test(input) !== expected) console.log("النسخة الناقصة غلطت في:", JSON.stringify(input));
}
~~~

~~~text الناتج (node time24.js، Node 24)
10 حالات، 0 فشلوا
النسخة الناقصة غلطت في: "24:00"
النسخة الناقصة غلطت في: " 12:30"
~~~

**الـ regex حتة حتة:**

| الحتة | معناها |
|---|---|
| [[^]] | أول النص (عشان [[" 12:30"]] يترفض) |
| [[([01]\d\|2[0-3])]] | الساعة: إما [[0]] أو [[1]] وبعدها أي رقم (00 لـ 19)، أو [[2]] وبعدها 0 لـ 3 (20 لـ 23) |
| [[:]] | النقطتين حرفيًا |
| [[[0-5]\d]] | الدقايق: رقم من 0 لـ 5 وبعده أي رقم (00 لـ 59) |
| [[$]] | آخر النص |

**ليه الاختبار قبل الـ regex:** الـ array هو «المواصفات». كتبناها الأول، وبعدين الـ loop بيطبع أي حالة فشلت، فأي تعديل على الـ regex بيتجرّب على الـ ١٠ حالات في ثانية. السطر الأول في الناتج: ولا حالة فشلت.

**والنسخة الناقصة** ([[/\d{2}:[0-5]\d$/]] من غير [[^]]) غلطت في حالتين بالظبط زي ما الـ done قال: [["24:00"]] عدّت لأن [[\d{2}]] بيقبل 24، و [[" 12:30"]] عدّت لأن مفيش [[^]].

**الغلطة الشائعة:** [[/^[0-2][0-9]:[0-5][0-9]$/]]: بيقبل [["29:00"]]. الساعة مش «رقمين أولهم 0 لـ 2»، هي حالتين، وده اللي الـ [[|]] جوه الـ group بيعمله.`  },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فحص موبايل مصري [[/01[0125]\d{8}/.test(phone)]]. جرّبه على [["abc010123456789xyz"]] وعلى [["01312345678"]].`, done: R`قبل التصليح الأول بيعدّي (true) لأن الـ regex لقى ١١ رقم في النص وسط الزبالة. بعد [[^]] و [[$]]: الأول false، و [["01012345678"]] true، و [["01312345678"]] false.`, sol: R`~~~js phone-fix.js
const buggy = /01[0125]\d{8}/;
const fixed = /^01[0125]\d{8}$/;
for (const phone of ["abc010123456789xyz", "01012345678", "01312345678"]) {
  console.log(phone.padEnd(19), "قبل:", buggy.test(phone), " بعد:", fixed.test(phone));
}
console.log("abc010123456789xyz".match(buggy)[0]);
~~~

~~~text الناتج (node phone-fix.js، Node 24)
abc010123456789xyz  قبل: true  بعد: false
01012345678         قبل: true  بعد: true
01312345678         قبل: false  بعد: false
01012345678
~~~

**السبب:** [[test]] بيدوّر على الـ pattern **في أي مكان** في النص. [["abc010123456789xyz"]] جواه [[01012345678]] (آخر سطر في الناتج: ده اللي الـ regex لقاه)، فالنص كله عدّى وهو مش رقم موبايل أصلًا.

**التصليح:** [[^]] في الأول و [[$]] في الآخر: النص من أوله لآخره لازم يبقى الـ pattern ده بالظبط.

- [[01]]: أول رقمين.
- [[[0125]]]: الشبكة: 0 أو 1 أو 2 أو 5. عشان كده [[01312345678]] اترفض قبل وبعد.
- [[\d{8}]]: ٨ أرقام كمان، فالإجمالي ١١.

**الغلطة الشائعة:** تصلّحها بـ [[\b]] بدل [[^]] و [[$]]: [[/\b01[0125]\d{8}\b/]] بيرفض الحالة دي بس بيقبل [["رقمي 01012345678 ده"]]، وده مش اللي عايزه في فحص خانة. للفحص [[^...$]]، وللبحث جوه نص [[\b]] أو lookaround.`  },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[checkPassword(p)]] بترجّع array بالقواعد الناقصة بالعربي، وكل قاعدة regex لوحدها (مش pattern واحد عملاق): ٨ حروف على الأقل، ورقم (عربي أو إنجليزي)، وحرف إنجليزي كبير، ورمز (أي حاجة مش حرف ولا رقم).`, done: R`[[checkPassword("Passw0rd!")]] ← array فاضي. [[checkPassword("password")]] ← ٣ قواعد (رقم وكبير ورمز). [[checkPassword("Pass١٢٣٤!")]] ← فاضي، يعني الرقم بـ [[\p{Nd}]] مع [[u]] والرمز مبيعدّش الأرقام العربي رموز. و [[checkPassword("")]] ← الأربع قواعد.`, sol: R`~~~js check-password.js
const RULES = [
  [/.{8,}/u, "٨ حروف على الأقل"],
  [/\p{Nd}/u, "رقم واحد على الأقل"],
  [/[A-Z]/, "حرف إنجليزي كبير"],
  [/[^\p{L}\p{N}]/u, "رمز زي ! أو @"],
];

function checkPassword(p) {
  return RULES.filter(([re]) => !re.test(p)).map(([, msg]) => msg);
}

for (const p of ["Passw0rd!", "password", "Pass١٢٣٤!", ""]) {
  console.log(JSON.stringify(p).padEnd(12), checkPassword(p));
}
~~~

~~~text الناتج (node check-password.js، Node 24)
"Passw0rd!"  []
"password"   [ 'رقم واحد على الأقل', 'حرف إنجليزي كبير', 'رمز زي ! أو @' ]
"Pass١٢٣٤!"  []
""           [
  '٨ حروف على الأقل',
  'رقم واحد على الأقل',
  'حرف إنجليزي كبير',
  'رمز زي ! أو @'
]
~~~

**كل قاعدة:**

| الـ regex | بيتأكد من |
|---|---|
| [[/.{8,}/u]] | ٨ حروف أو أكتر. و [[u]] عشان الإيموجي يتحسب حرف واحد مش اتنين |
| [[/\p{Nd}/u]] | رقم من أي نظام: [[0-9]] و [[٠-٩]] |
| [[/[A-Z]/]] | حرف إنجليزي كبير |
| [[/[^\p{L}\p{N}]/u]] | حرف مش حرف ([[\p{L}]]) ومش رقم ([[\p{N}]]): يعني رمز. الأرقام العربي جوه [[\p{N}]] فمبتتحسبش رموز |

- [[RULES.filter(([re]) => !re.test(p))]]: القواعد اللي **فشلت**. و [[([re])]] destructuring بياخد أول عنصر في الزوج.
- [[.map(([, msg]) => msg)]]: الفاصلة الأولى بتسيب العنصر الأول، وبتاخد الرسالة.
- [["Pass١٢٣٤!"]] عدّت: [[١٢٣٤]] اتحسبت رقم بـ [[\p{Nd}]]، ومتحسبتش رمز.

**ليه regex لكل قاعدة مش واحد عملاق:** pattern زي [[/^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/]] بيقول «لأ» بس، ومش بيقول أنهي قاعدة ناقصة. وكل قاعدة لوحدها سهل تتقري وتتغيّر.

**الغلطة الشائعة:** [[\W]] للرمز: من غير [[u]] الحروف العربي نفسها بتتحسب [[\W]] (مش [[\w]])، فباسورد زي [["كلمةسر1A"]] هيعدّي على إنه فيه رمز.`  }
          ],
          flag: "script",
          deep: {
            why: "هتحتاجه أكتر ما تتخيل: تحقق من رقم موبايل و slug و كود خصم، و [[.regex()]] في Zod (تاب TypeScript)، وتقطيع logs، و find & replace في VS Code (Alt+R بيشغّل regex)، و [[grep -E]] و [[sed]] في الترمنال (تاب bash). نفس الـ syntax تقريبًا في كل حتة.",
            how: R`الـ engine بيمشي على النص حرف حرف ويحاول يطابق الـ pattern من كل مكان. [[+]] و [[*]] greedy: بياخدوا أكبر حاجة ممكنة وبعدين يرجعوا لورا لو اللي بعدهم مش مطابق. عشان كده [[<b>.*<\/b>]] أكلت من أول [[<b>]] لآخر [[</b>]]، و [[.*?]] وقفت عند أول واحد.

[[\d]] في JS بيطابق [[0-9]] بس، مش الأرقام العربية المشرقية (١٢٣). عشان تدعم العربي استخدم Unicode property escapes مع flag [[u]]: [[\p{Nd}]] أي رقم في أي لغة، و [[\p{L}]] أي حرف، و [[\p{Script=Arabic}]] حروف عربي. و [[\w]] و [[\b]] كمان إنجليزي بس، فـ [[\bقهوة\b]] مش هتشتغل زي ما متوقع.

الحروف اللي ليها معنى ([[. * + ? ^ $ ( ) [ ] { } | \ /]]) لو عايزها حرفيًا حط قبلها [[\]]: [[\.]] نقطة، و [[<\/b>]] عشان [[/]] بتقفل الـ regex. وجوه [[[...]]] أغلبهم بيبقوا حرفيين.

[[(?:...)]] group من غير ما يتحفظ (الدرس الجاي)، هنا بيخلي [[-[a-z0-9]+]] يتكرر كوحدة. فالـ slug: كلمة، وبعدين صفر أو أكتر من (شرطة + كلمة)، فمفيش شرطتين ورا بعض ولا شرطة في الأول أو الآخر.`,
            when: R`تحقق من شكل نص قصير (phone و slug و postal code)، وتدوّر أو تستبدل في نصوص، وتقطّع سطور logs. ولو الـ pattern بقى أطول من سطر، أو محتاج «فهم» (HTML، JSON، URL، تواريخ)، استخدم parser (آخر درس في القسم).`,
            mistakes: R`تنسى [[^]] و [[$]] في التحقق فـ [["abc01012345678xyz"]] تعدّي. و [[.]] وانت عايز نقطة حرفية. و [[\d]] مع أرقام عربي من الموبايل (كيبورد عربي بيكتب ١٢٣): طبّع الأرقام الأول أو استخدم [[\p{Nd}]]. و [[[A-z]]] (فيها رموز بين Z و a). و [[.*]] greedy في نص فيه أكتر من match.`
          },
          teach: R`## الفكرة

الـ regex بيوصف **شكل** نص، مش نص بعينه. والمثال ٥ تجارب: رقم موبايل، وكلمة بحدودها، وأرقام كتير، و greedy ضد lazy، و slug، والعربي. الناتج كله من Node 24 على Windows.

قبل أي حاجة: الـ regex في JavaScript بيتكتب بين شرطتين [[/.../]]، والشرطتين مش جزء منه، زي علامتين التنصيص حوالين النص.

---

## ١. رقم موبايل مصري

~~~text app.js
const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone.test("0101234567"), phone.test("01312345678"));
~~~

نفك الـ pattern حتة حتة من الشمال لليمين، بنفس ترتيب ما الـ engine بيقراه:

| الحتة | نوعها | معناها |
|---|---|---|
| [[^]] | anchor | لازم نكون في أول النص |
| [[01]] | حروف عادية | الحرفين 0 و 1 بالظبط |
| [[[0125]]] | class | حرف واحد بس، يا 0 يا 1 يا 2 يا 5 (فودافون وإتصالات وأورنج و WE) |
| [[\d]] | class | رقم واحد من 0 لـ 9 (d = digit) |
| [[{8}]] | quantifier | اللي قبله يتكرر ٨ مرات بالظبط |
| [[$]] | anchor | لازم نكون في آخر النص |

و [[phone.test(text)]] بيسأل: «النص ده ماشي على الـ pattern؟» ويرجّع [[true]] أو [[false]].

~~~text الناتج
true false false
~~~

- [["01012345678"]]: 01 ثم 0 ثم ٨ أرقام. صح.
- [["0101234567"]]: بعد [[010]] فيه ٧ أرقام بس، و [[{8}]] عايزة ٨.
- [["01312345678"]]: 3 مش من [[[0125]]].

### ليه [[^]] و [[$]] مهمين؟

من غيرهم، [[test]] بتدوّر على الـ pattern **في أي حتة** جوه النص. جرّبنا في الحل:

~~~text app.js
console.log(/01[0125]\d{8}/.test("x010123456789999"));
~~~

~~~text الناتج
true
~~~

لقى [["01012345678"]] في النص وقال true، رغم إن النص كله زبالة. فأي regex للتحقق (validation) لازم يبقى [[^...$]].

---

## ٢. [[?]] و [[\b]]

~~~text app.js
console.log(/colou?r/.test("color"), /\bcat\b/.test("concat"), /\bcat\b/.test("a cat!"));
~~~

- [[u?]]: الـ [[?]] بعد حرف معناها «الحرف ده مرة أو مفيش». فـ [[colou?r]] بتقبل color و colour.
- [[\b]]: (b = boundary) **مكان** مش حرف: الحد بين حرف كلمة ([[\w]]) وحاجة مش حرف كلمة (مسافة أو علامة أو أول/آخر النص).

~~~text الناتج
true false true
~~~

في [["concat"]] الـ cat موجودة بس قبلها n، فمفيش حد كلمة: false. وفي [["a cat!"]] قبلها مسافة وبعدها [[!]]: true.

---

## ٣. [[+]] و [[{2,}]] و flag [[g]]

~~~text app.js
console.log("a1 b22 c333".match(/\d+/g), "a1 b22".match(/\d{2,}/g));
~~~

- [[\d+]]: [[+]] = «مرة أو أكتر»، يعني سلسلة أرقام ورا بعض.
- [[g]] بعد الشرطة الأخيرة اسمه **flag** (global): هات **كل** الـ matches مش أول واحد بس. ومع [[str.match(re)]] بيرجّع array بالنصوص.
- [[{2,}]]: «٢ أو أكتر». (و [[{2,5}]] من ٢ لـ ٥.)

~~~text الناتج
[ '1', '22', '333' ] [ '22' ]
~~~

في التاني الـ [[1]] لوحده اترمى لأنه رقم واحد.

---

## ٤. greedy ضد lazy

~~~text app.js
console.log("<b>x</b><b>y</b>".match(/<b>.*<\/b>/)[0]);
console.log("<b>x</b><b>y</b>".match(/<b>.*?<\/b>/)[0]);
~~~

- [[.]]: أي حرف (غير السطر الجديد). و [[.*]]: أي حاجة، أي عدد من المرات (حتى صفر).
- [[<\/b>]]: الـ [[/]] لوحدها كانت هتقفل الـ regex، فقبلها [[\]] (escape) عشان تبقى حرف عادي.
- [[match]] من غير [[g]] بيرجّع array أولها ([[[0]]]) النص اللي اتطابق.

~~~text الناتج
<b>x</b><b>y</b>
<b>x</b>
~~~

[[.*]] **greedy** (طمّاع): بياكل لحد آخر النص، وبعدين يرجع لورا حرف حرف لحد ما يلاقي [[</b>]]، فبيقف عند **آخر** واحدة. ولما تحط [[?]] بعده ([[.*?]]) بيبقى **lazy** (كسول): ياخد أقل حاجة ممكنة، فبيقف عند **أول** [[</b>]].

---

## ٥. slug

~~~text app.js
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
console.log(slug.test("my-first-post"), slug.test("My--post"));
~~~

slug هو الجزء اللي في اللينك زي [[my-first-post]].

| الحتة | معناها |
|---|---|
| [[^[a-z0-9]+]] | من الأول: حرف صغير أو رقم، مرة أو أكتر (كلمة أولى) |
| [[(?:-[a-z0-9]+)]] | group: شرطة وبعدها كلمة |
| [[*]] بعد الـ group | الـ group كله يتكرر صفر مرة أو أكتر |
| [[$]] | لحد الآخر |

[[[a-z]]] **مدى** (range): أي حرف من a لـ z. والأقواس [[(?:...)]] بتجمّع حتة عشان الـ [[*]] يتطبّق عليها كلها، و [[?:]] معناها «متحفظش اللي اتطابق» (الدرس الجاي).

~~~text الناتج
true false
~~~

[["My--post"]] فيها M كابيتال، وشرطتين ورا بعض (كل شرطة لازم بعدها كلمة).

---

## ٦. الأرقام والحروف العربي

~~~text app.js
console.log("١٢٣ و 45".match(/\d+/g), "١٢٣ و 45".match(/\p{Nd}+/gu));
console.log("سعر القهوة 45 جنيه".match(/\p{Script=Arabic}+/gu));
~~~

- [[\d]] في JavaScript = [[[0-9]]] بس. الأرقام المشرقية (١٢٣) مش منها.
- [[\p{...}]] اسمها **Unicode property escape**: «أي حرف ليه الخاصية دي في Unicode». [[\p{Nd}]] = أي رقم عشري في أي لغة (N = Number، d = decimal digit). و [[\p{Script=Arabic}]] = أي حرف من الكتابة العربي.
- **فخ التشكيل:** علامات التشكيل (الفتحة والشدة والتنوين) مش «Arabic» في Unicode، دي Script=Inherited. فـ [["مُحَمَّد أهلًا".match(/\p{Script=Arabic}+/gu)]] بيطلع [[[ 'م', 'ح', 'م', 'د', 'أهل', 'ا' ]]]: الكلمة اتقطّعت عند كل علامة. لو النص ممكن يبقى متشكّل استخدم [[\p{scx=Arabic}+]] (Script_Extensions، بتضم العلامات اللي بتتكتب مع العربي) أو [[[\p{L}\p{M}]+]]، والاتنين بيطلّعوا [[[ 'مُحَمَّد', 'أهلًا' ]]] (اتجرّب على Node 24). التفاصيل في درس «regex والعربي: Unicode properties».
- [[u]] flag (unicode): لازم عشان [[\p{...}]] تتفهم. وهنا معاها [[g]]: الـ flags بتتكتب جنب بعض.

~~~text الناتج
[ '45' ] [ '١٢٣', '45' ]
[ 'سعر', 'القهوة', 'جنيه' ]
~~~

---

## ٧. الحل (solCode)

~~~text app.js
const postal = /^\d{5}$/;
const username = /^[a-z][a-z0-9_]{2,15}$/;
const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
console.log(["11511", "1151", "115111"].map((s) => postal.test(s)));
console.log(["sara_99", "9sara", "ab", "a".repeat(16), "a".repeat(17)].map((s) => username.test(s)));
console.log(["#fff", "#1F2430", "#ffff", "fff"].map((s) => hex.test(s)));
console.log(/01[0125]\d{8}/.test("x010123456789999"));
~~~

- [[postal]]: ٥ أرقام بالظبط من الأول للآخر.
- [[username]]: [[[a-z]]] حرف أول واحد، وبعده [[[a-z0-9_]{2,15}]] من ٢ لـ ١٥. المجموع من ٣ لـ ١٦.
- [[hex]]: [[#]] وبعدها group فيها بديلين يفصل بينهم [[|]] (يعني «أو»): ٣ أو ٦ من [[[0-9a-f]]]. و [[i]] flag = مش حساس للكابيتال، فـ [[1F2430]] بيعدّي.
- [[.map((s) => re.test(s))]]: بيجرّب الـ regex على كل نص ويرجّع array بالنتايج. و [["a".repeat(16)]] = ١٦ حرف a.

~~~text الناتج
[ true, false, false ]
[ true, false, false, true, false ]
[ true, true, false, false ]
true
~~~

[["9sara"]] بتبدأ برقم، و [["ab"]] حرفين بس، و ١٧ حرف أكتر من اللازم. و [["#ffff"]] ٤ حروف (لا ٣ ولا ٦)، و [["fff"]] من غير [[#]].

---

## الخلاصة

| النوع | أمثلة | معناه |
|---|---|---|
| class | [[\d]] [[\w]] [[\s]] [[.]] [[[abc]]] [[[^0-9]]] [[\p{L}]] | حرف واحد من نوع معيّن |
| quantifier | [[?]] [[*]] [[+]] [[{8}]] [[{2,}]] [[{2,5}]] | اللي قبله يتكرر كام مرة |
| lazy | [[*?]] [[+?]] | أقل تكرار ممكن |
| anchor | [[^]] [[$]] [[\b]] | مكان، مش حرف |
| flag | [[g]] [[i]] [[u]] | بيغيّر طريقة البحث |

وأي regex للتحقق: [[^...$]] دايمًا.`,
          lines: [
            R`regex لموبايل مصري: [[^]] و [[$]] بيجبروا النص **كله** يطابق مش جزء منه، وبعدها [[01]] حرفيًا، وبعدها حرف واحد من اللي بين الأقواس المربعة (0 أو 1 أو 2 أو 5)، و [[\d{8}]] تمن أرقام بالظبط. من غير [[^]] و [[$]] نص زي [["x01012345678y"]] كان هيعدّي.`,
            R`[[test]] بترجّع [[true]] أو [[false]] بس. الأول صح (11 رقم)، والتاني [[false]] لأنه 10 أرقام فـ [[\d{8}]] مش متحققة لحد [[$]]، والتالت [[false]] لأن [[3]] بعد [[01]] مش من الحروف المسموحة.`,
            R`[[?]] بعد حرف بتخليه اختياري (مرة أو صفر)، فـ [[colou?r]] بتقبل [[color]] و [[colour]]. و [[\b]] حدود كلمة: [[cat]] لازم تبقى كلمة لوحدها، فـ [["concat"]] بترجّع [[false]] (الـ cat في آخر كلمة أكبر) و [["a cat!"]] بترجّع [[true]].`,
            R`[[\d+]] يعني رقم أو أكتر ورا بعض، والـ flag [[g]] بيخلي [[match]] يرجّع **كل** الـ matches كـ array من strings: [[1]] و [[22]] و [[333]]. و [[\d{2,}]] يعني رقمين أو أكتر، فـ [[1]] مبيعدّيش ويطلع [[22]] بس. من غير [[g]] كان هيرجّع أول match بس بتفاصيله.`,
            R`[[.*]] greedy: بتاكل أكتر حاجة ممكنة وبعدين ترجع لورا لحد ما تلاقي [[</b>]]، فالـ match امتد لآخر [[</b>]] في النص وطلع [[<b>x</b><b>y</b>]] كله، مش أول tag بس. و [[\/]] لأن [[/]] لوحدها بتقفل الـ regex.`,
            R`[[?]] بعد [[*]] بتخليها lazy: تاخد أقل حاجة ممكنة، فبتقف عند أول [[</b>]] ويطلع [[<b>x</b>]] بس. ده الحل المعتاد لما الـ greedy ياخد أكتر من اللازم.`,
            R`slug بتاع URL: كلمة من حروف صغيرة وأرقام، وبعدها صفر أو أكتر من «شرطة وبعدها كلمة». الـ [[(?:...)]] group مبيحفظش الـ match، موجود بس عشان [[*]] تكرر الشرطة والكلمة مع بعض، فمفيش شرطتين ورا بعض ولا شرطة في الأول أو الآخر.`,
            R`[[my-first-post]] بترجّع [[true]]. و [[My--post]] بترجّع [[false]] لسببين: [[M]] كبيرة ومش من الحروف المسموحة، والشرطتين ورا بعض لأن بعد كل شرطة لازم حرف أو رقم.`,
            R`[[\d]] في JS بتطابق الأرقام الإنجليزي (0 لـ 9) بس، فالأرقام العربي [[١٢٣]] اتجاهلت وطلع [[45]] بس. أما [[\p{Nd}]] (أي رقم عشري في Unicode) مع الـ flag [[u]] فلقت الاتنين. لو بتفحص input من يوزر عربي، [[\d]] لوحدها هترفض أرقامه.`,
            R`[[\p{Script=Arabic}+]] بتطابق حروف عربي ورا بعض، فطلّعت الكلمات العربي بس ([[سعر]] و [[القهوة]] و [[جنيه]]) وسابت [[45]] والمسافات. والـ [[\p{...}]] محتاجة الـ flag [[u]]: من غيره [[\p]] بتتفهم حرف [[p]] عادي، ولما جرّبتها رجّعت [[null]].`,
          ],
          sol: R`الكود البريدي: [[/^\d{5}$/]] (أو [[/^\p{Nd}{5}$/u]] لو هتقبل أرقام عربي). الـ username: [[/^[a-z][a-z0-9_]{2,15}$/]]: حرف واحد وبعده من ٢ لـ ١٥، فالمجموع من ٣ لـ ١٦. الغلطة الشائعة [[{3,16}]] بعد الحرف الأول فيبقى المجموع لـ ١٧. الـ hex: [[/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i]]، و [[i]] عشان الحروف الكبيرة، والـ [[|]] جوه group عشان «٣ أو ٦» (من غيرها [[{3,6}]] كانت هتقبل ٤ و ٥).

ومن غير anchors [[phone.test("x010123456789999")]] بـ true: لقى [["01012345678"]] في النص وخلاص. ده ليه أي regex للتحقق لازم يبقى [[^...$]].`,
          solCode: R`const postal = /^\d{5}$/;
const username = /^[a-z][a-z0-9_]{2,15}$/;
const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
console.log(["11511", "1151", "115111"].map((s) => postal.test(s)));
console.log(["sara_99", "9sara", "ab", "a".repeat(16), "a".repeat(17)].map((s) => username.test(s)));
console.log(["#fff", "#1F2430", "#ffff", "fff"].map((s) => hex.test(s)));
console.log(/01[0125]\d{8}/.test("x010123456789999"));`
        },
        {
          cmd: "groups و flags",
          title: "تمسك أجزاء من الـ match إزاي؟ (groups و named groups و flags)",
          desc: R`الأقواس [[( )]] بتعمل group: بتجمّع جزء عشان quantifier يتطبق عليه كله، وبتحفظ اللي اتطابق فيه عشان تقراه بعدين ([[m[1]]] و [[m[2]]]). و [[(?<year>...)]] named group: تقراه بالاسم [[m.groups.year]] بدل الرقم، وده أوضح بكتير. و [[(?:...)]] group بيجمّع بس من غير ما يحفظ.

والـ flags بعد [[/]] الأخيرة: [[g]] (global: كل الـ matches مش أول واحد)، و [[i]] (مش حساس للحروف الكبيرة)، و [[m]] (multiline: [[^]] و [[$]] لكل سطر)، و [[s]] (dotAll: [[.]] تطابق السطر الجديد كمان)، و [[u]] (unicode: emoji صح و [[\p{...}]])، و [[y]] (sticky: لازم يطابق من [[lastIndex]] بالظبط)، و [[v]] (الأحدث، بديل u بـ set operations جوه [[[...]]]، مدعوم في كل المتصفحات الحديثة و Node 20+).

و [[(?=...)]] lookahead: «بعده كذا» من غير ما ياخده، و [[(?<=...)]] lookbehind: «قبله كذا».`,
          example: R`const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m = "الطلب اتعمل 2026-09-29 الصبح".match(re);
console.log(m[0], m[1], m.groups.month, m.index);
console.log(/^b/m.test("a\nb"), /^b/.test("a\nb"), /a.b/.test("a\nb"), /a.b/s.test("a\nb"));
console.log(/hello/i.test("HeLLo"), /(\w)\1/.test("hello"), /(?:ab)+/.exec("ababx")[0]);
const g = /o/g;
console.log(g.test("foo"), g.lastIndex, g.test("foo"), g.test("foo"));
const sticky = /\d+/y;
sticky.lastIndex = 4;
console.log(sticky.exec("abc 42")?.[0], /\d+/y.exec("abc 42"));
console.log("😀".length, /^.$/.test("😀"), /^.$/u.test("😀"));
console.log(/[\p{L}--\p{Ll}]/v.test("A"), /[\p{L}--\p{Ll}]/v.test("a"), /[\p{L}--\p{Ll}]/v.test("ع"));
console.log("price: 100 EGP".match(/\d+(?= EGP)/)[0], "$50 €30".match(/(?<=€)\d+/)[0]);`,
          try: R`اكتب regex بـ named groups يفك [["Sara Ahmed <sara@example.com>"]] لـ [[name]] و [[email]]. وبعدين اعمل bug الـ [[g]] بإيدك: [[const re = /\d/g]] وفلتر [[["1", "2", "3"].filter((s) => re.test(s))]]. الناتج المتوقع كل الـ ٣، طلع كام؟ وليه؟ اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[parseContact(str)]] بترجّع [[{ name, email }]] من الـ named groups، أو null لو النص مش بالشكل ده.`,
          ref: [
            { t: "MDN: Groups and backreferences", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences" },
            { t: "MDN: Assertions (lookahead وحدود الكلمة)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions" },
            { t: "MDN: RegExp.prototype.flags", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags" },
            { t: "MDN: RegExp: lastIndex", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [["2026-09-29".match(/(\d+)-(\d+)-(\d+)/).slice(1)]] هيطبع إيه؟ وبعدين اكتبها بـ named groups وفكّها بـ [[const { year, month, day } = m.groups]] واطبع [[typeof month]].`, done: R`الأولى [[[ '2026', '09', '29' ]]]: من غير الـ [[m[0]]] اللي هو الـ match كله. والـ named groups بتدّي نفس القيم بأساميها، و [[typeof month]] بيطلع [["string"]]: الـ regex دايمًا بيرجّع نصوص، فحوّل بـ Number قبل أي حساب.`, sol: R`**التوقع:** [[[ '2026', '09', '29' ]]].

~~~js groups.js
console.log("2026-09-29".match(/(\d+)-(\d+)-(\d+)/).slice(1));

const m = "2026-09-29".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
const { year, month, day } = m.groups;
console.log(year, month, day, typeof month);
console.log(Number(month) + 1, month + 1);
~~~

~~~text الناتج (node groups.js، Node 24)
[ '2026', '09', '29' ]
2026 09 29 string
10 091
~~~

- [[match]] من غير [[g]] بيرجّع array: [[m[0]]] الـ match كله ([["2026-09-29"]])، و [[m[1]]] و [[m[2]]] و [[m[3]]] اللي جوه كل قوس. [[.slice(1)]] بيشيل العنصر الأول.
- [[(?<year>\d{4})]]: named group. نفس القوس، بس ليه اسم، وبيتحط في [[m.groups.year]].
- [[const { year, month, day } = m.groups]]: object destructuring، ٣ متغيرات من ٣ خصايص.
- [[typeof month]] بـ [["string"]]: الـ regex بيقطع من نص، فبيرجّع نصوص. آخر سطر بيوري الفرق: [[Number(month) + 1]] = 10، و [[month + 1]] = [["091"]] (لزق نصوص).

**الغلطة الشائعة:** تحسب على القيم اللي راجعة من الـ regex على طول ([[month + 1]] أو [[year > 2025]] اللي بتشتغل بالصدفة لأن [[>]] بيحوّل). حوّل بـ [[Number]] أول ما تطلّعها.`  },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const re = /a/g;]] وبعدها [[re.test("a")]] مرتين ورا بعض في فحص فورم. اطبع الناتجين و [[re.lastIndex]].`, done: R`طلع true وبعدين false و lastIndex بـ 0 (المرة التانية بدأت من 1 وملقتش). الـ flag [[g]] بيخلي الـ regex يفتكر مكانه، فشيله من أي regex بتعمل بيه [[test]] بس، والفحص بيرجع true كل مرة.`, sol: R`~~~js lastindex.js
const re = /a/g;
console.log(re.test("a"), re.lastIndex);
console.log(re.test("a"), re.lastIndex);
console.log(re.test("a"), re.lastIndex);

const fixed = /a/;
console.log(fixed.test("a"), fixed.test("a"), fixed.test("a"));
~~~

~~~text الناتج (node lastindex.js، Node 24)
true 1
false 0
true 1
true true true
~~~

**اللي بيحصل:**

1. أول [[test]]: لقى [["a"]] عند index 0، والـ flag [[g]] بيخلي الـ regex يحفظ «أكمّل منين المرة الجاية» في [[lastIndex]]: **1**.
2. تاني [[test]] على نفس النص: بيبدأ من index 1، والنص طوله 1، فمفيش: **false**، و [[lastIndex]] بيرجع **0**.
3. التالت: بدأ من 0 تاني فـ **true**. يعني الفحص بيطلع صح ثم غلط ثم صح، بالتبادل.

في فورم، ده معناه إن اليوزر يكتب نفس القيمة مرتين ويتقاله مرة «سليم» ومرة «غلط».

**التصليح:** شيل [[g]]: [[/a/]] مبيستخدمش [[lastIndex]] مع [[test]]، فآخر سطر: true التلات مرات. الـ [[g]] مكانه مع [[matchAll]] و [[replace]] و [[match]] لما عايز كل النتايج.

**الغلطة الشائعة:** تعمل regex بـ [[g]] كـ constant برّه الدالة وتستخدمه في [[test]] جوه loop أو handler: الباج بيظهر بس في المرة التانية، فصعب تمسكه.`  },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اكتب [[parseEnv(text)]] بتحوّل محتوى ملف [[.env]] لـ object: كل سطر [[KEY=value]] (ومسموح مسافات حوالين [[=]])، والسطور اللي بتبدأ بـ [[#]] أو الفاضية تتجاهل. استخدم named groups [[key]] و [[val]] على كل سطر.`, done: R`[[parseEnv("PORT=3000\n# x\nDEBUG = true")]] بترجّع [[{ PORT: "3000", DEBUG: "true" }]]. سطر زي [[=oops]] مبيتضافش، وقيمة فيها [[=]] زي [[URL=a=b]] بتفضل [["a=b"]] كاملة، والملف اللي سطوره [[\r\n]] (من Windows) بيدّي نفس النتيجة: لو قسّمت بـ [["\n"]] بس، [[.]] مبيطابقش [[\r]] فكل سطر بيضيع، والحل [[split(/\r?\n/)]].`, sol: R`~~~js parse-env.js
const LINE = /^\s*(?<key>[A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?<val>.*?)\s*$/;

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    if (line.trim() === "" || line.trimStart().startsWith("#")) continue;
    const m = line.match(LINE);
    if (m) out[m.groups.key] = m.groups.val;
  }
  return out;
}

console.log(parseEnv("PORT=3000\n# x\nDEBUG = true"));
console.log(parseEnv("=oops\nURL=a=b\n\nNAME= Sara Ali "));
console.log(parseEnv("PORT=3000\r\nDEBUG=true\r\n"));

// الغلطة: split("\n") بس على ملف Windows
const broken = {};
for (const line of "PORT=3000\r\nDEBUG=true\r\n".split("\n")) {
  const m = line.match(/^(?<key>\w+)=(?<val>.*)$/);
  if (m) broken[m.groups.key] = m.groups.val;
}
console.log("split(\"\\n\") بس:", broken);
~~~

~~~text الناتج (node parse-env.js، Node 24)
{ PORT: '3000', DEBUG: 'true' }
{ URL: 'a=b', NAME: 'Sara Ali' }
{ PORT: '3000', DEBUG: 'true' }
split("\n") بس: {}
~~~

**الـ regex حتة حتة:**

- [[^\s*]]: مسافات اختيارية في أول السطر.
- [[(?<key>[A-Za-z_][A-Za-z0-9_]*)]]: اسم المتغير: حرف أو [[_]] وبعده حروف وأرقام. ده اللي بيرفض [[=oops]] (مفيش اسم قبل [[=]]).
- [[\s*=\s*]]: الـ [[=]] ومسافات اختيارية حواليها، عشان [[DEBUG = true]].
- [[(?<val>.*?)]]: القيمة، lazy عشان متاكلش المسافات اللي في الآخر.
- [[\s*$]]: مسافات في الآخر وبعدين آخر السطر.

و [[URL=a=b]]؟ الـ key مبيقبلش [[=]]، فأول [[=]] بس هي اللي بتتطابق مع [[\s*=\s*]]، والباقي [["a=b"]] كله بيدخل في [[val]].

- **[[split(/\r?\n/)]]:** ملف من Windows سطوره بتخلص بـ [[\r\n]]. [[\r?]] بتشيل الـ [[\r]] لو موجودة، فالسطر التالت في الناتج نفس الأول.
- **السطور الفاضية والتعليقات:** بتتجاهل قبل الـ regex بـ [[trim()]] و [[startsWith("#")]].

**الغلطة اللي في آخر الناتج:** [[split("\n")]] بس على ملف Windows: كل سطر بيفضل آخره [[\r]]، و [[.]] مبتطابقش [[\r]]، فـ [[.*$]] مبيوصلش لآخر السطر، والنتيجة object فاضي من غير أي error.`  },
            { lvl: 'تطبيق', t: R`**refactor:** [[const m = s.match(/(\d+)-(\d+)-(\d+)/); const out = m[3] + "/" + m[2] + "/" + m[1];]]. خليها named groups ومتغيرات بأسامي، من غير ما الناتج يتغيّر.`, done: R`الاتنين بيطبعوا [[29/09/2026]] لـ [["2026-09-29"]]، والجديدة مفيهاش ولا رقم [[m[1]]] و [[m[3]]]، فلو زوّدت group في النص الكود مش هيبوظ.`, sol: R`~~~js refactor-date.js
const s = "2026-09-29";

// قبل
const m1 = s.match(/(\d+)-(\d+)-(\d+)/);
const out1 = m1[3] + "/" + m1[2] + "/" + m1[1];

// بعد
const { year, month, day } = s.match(/(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups;
const out2 = $__bt$__{day}/$__{month}/$__{year}$__bt;

console.log(out1, out2, out1 === out2);

// ولو زوّدنا group للوقت في الأول: القديمة باظت والجديدة لأ
const t = "10:30 2026-09-29";
const m3 = t.match(/(\d+):(\d+) (\d+)-(\d+)-(\d+)/);
console.log("القديمة بنفس الأرقام:", m3[3] + "/" + m3[2] + "/" + m3[1]);
const g = t.match(/(\d+):(\d+) (?<year>\d+)-(?<month>\d+)-(?<day>\d+)/).groups;
console.log("الجديدة:", $__bt$__{g.day}/$__{g.month}/$__{g.year}$__bt);
~~~

~~~text الناتج (node refactor-date.js، Node 24)
29/09/2026 29/09/2026 true
القديمة بنفس الأرقام: 2026/30/10
الجديدة: 29/09/2026
~~~

- **قبل:** [[m[3]]] و [[m[2]]] و [[m[1]]] أرقام لازم تعدّ الأقواس عشان تفهمها.
- **بعد:** [[(?<year>...)]] وأخواتها، و [[.groups]] بيتفك لـ ٣ متغيرات بأساميها، والناتج بـ template literal: [[29/09/2026]] زي الأول بالظبط (السطر الأول: [[true]]).
- **ليه ده أحسن:** آخر جزء في الكود زوّد group للوقت في أول الـ pattern. النسخة القديمة بنفس الأرقام طلعت [[2026/30/10]] (الأرقام اتزحلقت)، والجديدة فضلت [[29/09/2026]] لأن الأسامي مبتتزحلقش.

**الغلطة الشائعة:** تعمل الـ refactor وتغيّر الناتج من غير ما تاخد بالك. عشان كده طبعنا القديم والجديد جنب بعض وقارنّاهم بـ [[===]] قبل ما نشيل القديم.`  },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[addCommas(str)]] بتحط فاصلة كل ٣ أرقام من اليمين بـ replace واحد و lookahead (من غير loops)، واستخدمها على [["Total: 1234567 EGP"]].`, done: R`[["1234567"]] ← [["1,234,567"]]، و [["999"]] ← [["999"]]، و [["1000"]] ← [["1,000"]]، و [["Total: 1234567 EGP"]] ← [["Total: 1,234,567 EGP"]]. وقارن بـ [[(1234567).toLocaleString("en-US")]] اللي بيدّي نفس الناتج: في الشغل الحقيقي استخدم Intl للأرقام، والـ regex للنصوص اللي فيها أرقام.`, sol: R`~~~js add-commas.js
function addCommas(str) {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

for (const s of ["1234567", "999", "1000", "Total: 1234567 EGP", "12.5 و 1500000"]) {
  console.log(JSON.stringify(s).padEnd(22), "→", addCommas(s));
}
console.log((1234567).toLocaleString("en-US"));
~~~

~~~text الناتج (node add-commas.js، Node 24)
"1234567"              → 1,234,567
"999"                  → 999
"1000"                 → 1,000
"Total: 1234567 EGP"   → Total: 1,234,567 EGP
"12.5 و 1500000"       → 12.5 و 1,500,000
1,234,567
~~~

**الـ regex [[/\B(?=(\d{3})+(?!\d))/g]] بيدوّر على أماكن مش حروف:**

- [[\B]]: مكان **مش** حد كلمة، يعني بين رقمين. ده بيمنع فاصلة في أول الرقم ([[,123]]).
- [[(?=...)]]: lookahead: «اللي بعد المكان ده لازم يبقى كذا»، من غير ما ياكله. فالـ replace بيحط [[","]] في المكان ومش بيمسح حاجة.
- [[(\d{3})+]]: مجموعات من ٣ أرقام، مرة أو أكتر.
- [[(?!\d)]]: وبعدها مفيش رقم: يعني المجموعات دي لحد آخر الرقم بالظبط.

فالمكان بين [[1]] و [[234567]] بيتطابق (بعده ٦ أرقام = مجموعتين)، والمكان بين [[12]] و [[34567]] لأ (٥ أرقام). و [[g]] بيلاقي كل الأماكن.

**الحالة اللي ممكن تغلط فيها:** [["12.5"]] فضلت زي ما هي، بس رقم عشري طويل زي [["1234.5678"]] الـ regex هيحط فاصلة في الكسر كمان ([[1,234.5,678]]). عشان كده للأرقام نفسها [[toLocaleString("en-US")]] (آخر سطر) هو الصح، والـ regex للنصوص اللي جواها أرقام صحيحة.`  }
          ],
          flag: "script",
          deep: {
            why: "التحقق بـ test بيقولك «الشكل صح» بس. أغلب الشغل الحقيقي «هات لي الجزء ده»: السنة من تاريخ، والـ status من سطر log، والإيميل من نص. والـ groups هي اللي بتعمل كده، والـ named groups بتخلي الكود يتقري بعد ٦ شهور.",
            how: R`[[match]] من غير g بيرجّع array: [[m[0]]] الـ match كله، و [[m[1]]] أول group، و [[m.groups]] الـ named، و [[m.index]] مكانه في النص. ولو مفيش match بيرجّع [[null]] (مش array فاضية)، فلازم تفحص قبل ما تقرا.

[[\1]] back-reference: «نفس اللي اتطابق في group 1»، فـ [[(\w)\1]] حرف متكرر ورا بعض (ll في hello).

فخ الـ g: الـ regex اللي فيه [[g]] أو [[y]] عنده [[lastIndex]] بيتحفظ بين النداءات. [[test]] الأولى لقت o عند 1 وخلّت [[lastIndex = 2]]، والتانية بدأت من 2 ولقت o تانية، والتالتة بدأت من 3 وملقتش فرجعت false ورجّعت lastIndex لـ 0. فلو regex بـ g متخزّن في متغير واستخدمته في test جوه loop أو filter، النتيجة بتتبادل true و false. متحطش g مع test.

[[y]] (sticky) بيطابق من lastIndex بالظبط وبس، مفيدة للـ tokenizers. و [[u]] بيخلي الـ emoji (اللي هو ٢ UTF-16 code units، عشان كده [[length]] بـ 2) حرف واحد. و [[v]] بيضيف طرح وتقاطع جوه الـ class: [[[\p{L}--\p{Ll}]]] «أي حرف ما عدا الحروف الصغيرة» (فـ A و ع يعدّوا و a لأ). v و u مينفعش مع بعض.

الـ lookaround مش بياكل حروف: [[\d+(?= EGP)]] رجّع [[100]] من غير [[" EGP"]].`,
            when: R`named groups في أي regex فيه أكتر من group. و [[i]] في التحقق من حاجات مش حساسة (hex، أوامر). و [[m]] مع النصوص متعددة السطور (logs). و [[u]] أو [[v]] دايمًا لو فيه عربي أو emoji.`,
            mistakes: R`[[g]] مع [[test]] أو [[exec]] على regex متشارك. و [[m[1]]] على null لما مفيش match. وتنسى [[u]] مع [[\p{...}]]: مفيش error، بس من غير u الـ [[\p{L}]] بتتقري حرفيًا «p{L}»، فـ [[/\p{L}+/.test("سعر")]] بترجّع false في صمت. وتعد الـ groups غلط بعد ما تضيف قوس في النص فالأرقام تتزحلق (named groups بتحل ده). وفي الانترفيو: «ليه test بترجع نتيجة مختلفة كل مرة؟» الإجابة: lastIndex مع g.`
          },
          teach: R`## المثال بيعمل إيه

الدرس اللي فات كان «النص ماشي على الشكل ولا لأ». هنا بنمسك **أجزاء** من النص بالأقواس (groups)، ونغيّر طريقة البحث بالـ flags. المثال ١٣ سطر، كل سطر فكرة. الناتج كله من Node 24 على Windows.

---

## ١. named groups: [[(?<name>...)]]

~~~text app.js
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m = "الطلب اتعمل 2026-09-29 الصبح".match(re);
console.log(m[0], m[1], m.groups.month, m.index);
~~~

الـ pattern: ٤ أرقام، شرطة، رقمين، شرطة، رقمين. وكل جزء جوه أقواس شكلها [[(?<اسم>...)]]:

- الأقواس [[( )]] لوحدها = **capturing group**: بتحفظ اللي اتطابق جواها.
- [[?<year>]] في أولها بتدّي الـ group اسم. فتقدر تقراه بالاسم أو بالرقم.

و [[str.match(re)]] من غير [[g]] بيرجّع array فيها تفاصيل أول match. جرّبنا نطبعها كلها على نص أقصر ([["x 2026-09-29"]]):

~~~text الناتج
[
  '2026-09-29',
  '2026',
  '09',
  '29',
  index: 2,
  input: 'x 2026-09-29',
  groups: [Object: null prototype] { year: '2026', month: '09', day: '29' }
]
~~~

| الحتة | فيها إيه |
|---|---|
| [[m[0]]] | الـ match كله |
| [[m[1]]] و [[m[2]]] و [[m[3]]] | الـ groups بالترتيب (من أول قوس مفتوح) |
| [[m.groups]] | الـ named groups كـ object |
| [[m.index]] | مكان أول حرف في الـ match جوه النص (من 0) |
| [[m.input]] | النص الأصلي |

([[null prototype]] معناها object فاضي من غير methods موروثة، عادي تقرا منه بالاسم.)

ونرجع للمثال:

~~~text الناتج
2026-09-29 2026 09 12
~~~

[[m.index]] = 12 لأن قبل التاريخ [["الطلب اتعمل "]]: ٥ حروف + مسافة + ٥ + مسافة = 12.

> لو مفيش match، [[match]] بترجّع [[null]] مش array فاضية: [["hello".match(/z/)]] طلع [[null]]. فـ [[m[1]]] هنا هترمي TypeError، لازم تفحص [[if (m)]] الأول.

---

## ٢. flags [[m]] و [[s]]

~~~text app.js
console.log(/^b/m.test("a\nb"), /^b/.test("a\nb"), /a.b/.test("a\nb"), /a.b/s.test("a\nb"));
~~~

النص [["a\nb"]] سطرين: [[\n]] حرف السطر الجديد.

| الـ regex | الناتج | ليه |
|---|---|---|
| [[/^b/m]] | true | [[m]] (multiline): [[^]] بتطابق أول **كل سطر**، و b أول السطر التاني |
| [[/^b/]] | false | من غير m: [[^]] أول النص كله بس، وهو a |
| [[/a.b/]] | false | [[.]] مش بتطابق السطر الجديد |
| [[/a.b/s]] | true | [[s]] (dotAll): [[.]] بتطابق أي حرف حتى [[\n]] |

~~~text الناتج
true false false true
~~~

---

## ٣. [[i]] و back-reference و [[(?:)]]

~~~text app.js
console.log(/hello/i.test("HeLLo"), /(\w)\1/.test("hello"), /(?:ab)+/.exec("ababx")[0]);
~~~

- [[i]] (ignore case): الكابيتال زي الصغير.
- [[(\w)\1]]: [[(\w)]] بيمسك حرف، و [[\1]] معناها «نفس الحرف اللي group 1 مسكه بالظبط». يعني حرف متكرر ورا بعض. في hello: [[ll]].
- [[(?:ab)+]]: [[(?:...)]] group **من غير حفظ** (non-capturing): بيجمّع [[ab]] عشان [[+]] يكرّرها كوحدة. و [[exec]] نفس [[match]] بس method على الـ regex نفسه: [[re.exec(str)]].

~~~text الناتج
true true abab
~~~

لو كتبتها [[(ab)+]] الـ match برضه [[abab]]، بس الـ array هيبقى فيها group زيادة ([['abab', 'ab']]). [[?:]] بتوفّر ده لما مش محتاجه.

---

## ٤. فخ [[g]] مع [[test]]: [[lastIndex]]

~~~text app.js
const g = /o/g;
console.log(g.test("foo"), g.lastIndex, g.test("foo"), g.test("foo"));
~~~

الـ regex اللي فيه [[g]] (أو [[y]]) عنده خانة اسمها [[lastIndex]]: «هبدأ أدوّر من الحرف رقم كام المرة الجاية». وهي **بتتحفظ على الـ regex نفسه** بين النداءات. تتبّعنا ٤ نداءات على [["foo"]] (f في 0، و o في 1 و 2):

| النداء | بدأ من | لقى | [[lastIndex]] بعده |
|---|---|---|---|
| ١ | 0 | o عند 1: true | 2 |
| ٢ | 2 | o عند 2: true | 3 |
| ٣ | 3 | مفيش: false | رجع 0 |
| ٤ | 0 | true | 2 |

~~~text الناتج
true 2 true false
~~~

نفس النص، ونتايج مختلفة. ولو regex بـ g في متغير واستخدمته في [[filter]] أو loop، هيحصل كده بالظبط (الحل تحت).

---

## ٥. [[y]] (sticky)

~~~text app.js
const sticky = /\d+/y;
sticky.lastIndex = 4;
console.log(sticky.exec("abc 42")?.[0], /\d+/y.exec("abc 42"));
~~~

[[y]] معناها «لازم الـ match **يبدأ** عند [[lastIndex]] بالظبط، متدوّرش بعده».

- حطينا [[lastIndex = 4]]: الحرف رقم 4 في [["abc 42"]] هو 4، فلقى [["42"]].
- [[?.[0]]]: [[?.]] اسمها optional chaining: لو اللي قبلها [[null]] رجّع [[undefined]] بدل ما ترمي error، ولو مش null خد [[[0]]].
- التاني regex جديد [[lastIndex]] بتاعه 0، والحرف 0 هو a مش رقم، فـ [[null]].

~~~text الناتج
42 null
~~~

الـ [[y]] بتتستخدم في الـ tokenizers: كود بيقطّع نص لأجزاء ورا بعض من غير ما يقفز.

---

## ٦. [[u]] والـ emoji

~~~text app.js
console.log("😀".length, /^.$/.test("😀"), /^.$/u.test("😀"));
~~~

النصوص في JavaScript متخزّنة UTF-16: وحدات كل واحدة 16 bit. الـ emoji ده محتاج **وحدتين** (اسمهم surrogate pair)، فـ [[length]] بيقول 2.

~~~text الناتج
2 false true
~~~

من غير [[u]]، [[.]] بتشوف «حرفين» فـ [[^.$]] (حرف واحد بس) فشلت. ومع [[u]] الـ engine بيفهم إن دول حرف واحد.

---

## ٧. [[v]]: طرح جوه الـ class

~~~text app.js
console.log(/[\p{L}--\p{Ll}]/v.test("A"), /[\p{L}--\p{Ll}]/v.test("a"), /[\p{L}--\p{Ll}]/v.test("ع"));
~~~

- [[\p{L}]]: أي حرف (L = Letter) في أي لغة. و [[\p{Ll}]]: حرف صغير (Ll = Lowercase letter).
- [[--]] جوه [[[ ]]] مع flag [[v]]: **طرح**. يعني «أي حرف ما عدا الصغير».

~~~text الناتج
true false true
~~~

A كابيتال فعدّى، و a صغير فاتشال، و ع ملوش صغير وكبير أصلًا فمش من [[\p{Ll}]] وعدّى.

و [[v]] بديل [[u]] (فيها كل حاجة في u وزيادة)، ومينفعوش مع بعض. جرّبنا [[new RegExp("x", "uv")]]:

~~~text الناتج
SyntaxError: Invalid flags supplied to RegExp constructor 'uv'
~~~

---

## ٨. lookahead و lookbehind

~~~text app.js
console.log("price: 100 EGP".match(/\d+(?= EGP)/)[0], "$50 €30".match(/(?<=€)\d+/)[0]);
~~~

- [[(?= EGP)]] **lookahead**: «لازم بعدي يبقى [[" EGP"]]»، بس من غير ما ياخدها في الـ match.
- [[(?<=€)]] **lookbehind**: «لازم قبلي يبقى €». فـ [[50]] اللي قبلها [[$]] اتجاهلت.

~~~text الناتج
100 30
~~~

الاتنين بيتسموا lookaround: بيبصوا من غير ما ياكلوا حروف.

---

## ٩. فخ [[g]] في [[filter]] (من الحل)

~~~text app.js
const withG = /\d/g;
console.log(["1", "2", "3"].filter((s) => withG.test(s)));
const noG = /\d/;
console.log(["1", "2", "3"].filter((s) => noG.test(s)));
~~~

~~~text الناتج
[ '1', '3' ]
[ '1', '2', '3' ]
~~~

مع [[g]]: أول test لقت 1 وخلّت [[lastIndex = 1]]. التانية على [["2"]] (حرف واحد) بدأت من 1، يعني بعد آخر النص، ففشلت ورجّعت [[lastIndex]] لـ 0. التالتة نجحت. فالـ [["2"]] وقعت من غير سبب. ومن غير [[g]] مفيش [[lastIndex]] بيتحفظ، فكله صح.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[( )]] | group بيتحفظ: [[m[1]]] |
| [[(?<name>...)]] | group باسم: [[m.groups.name]] |
| [[(?:...)]] | تجميع من غير حفظ |
| [[\1]] | نفس اللي group 1 مسكه |
| [[(?=...)]] و [[(?<=...)]] | بعده / قبله كذا، من غير ما ياخده |
| [[g]] [[i]] [[m]] [[s]] [[u]] [[v]] [[y]] | كله، مش حساس، كل سطر، النقطة تاخد السطر الجديد، unicode، unicode + طرح، من lastIndex بالظبط |

ومتحطش [[g]] على regex بتستخدمه مع [[test]] أكتر من مرة.`,
          lines: [
            R`regex لتاريخ بشكل [[YYYY-MM-DD]]. كل [[(?<name>...)]] اسمه named group: بيمسك الجزء ده ويحفظه باسم، فبدل ما تفتكر «الشهر هو group رقم ٢» تكتب [[groups.month]].`,
            R`[[match]] من غير [[g]] بيرجّع أول match بس، بس بكل تفاصيله: النص كله، وكل group، و [[groups]]، و [[index]]. ولو مفيش match بيرجّع [[null]]، فلازم تتأكد قبل ما تكمّل وإلا السطر اللي بعده يرمي TypeError.`,
            R`العنصر صفر هو النص اللي طابق كله ([[2026-09-29]])، والعنصر 1 أول group ([[2026]])، و [[m.groups.month]] الشهر بالاسم ([[09]] كـ string مش رقم)، و [[m.index]] مكان بداية الـ match في النص ([[12]]).`,
            R`من غير flags [[^]] معناها بداية النص كله، و [[.]] أي حرف ما عدا السطر الجديد. الـ [[m]] (multiline) بتخلي [[^]] و [[$]] لكل سطر، فـ [[b]] في أول السطر التاني اتلاقت، والـ [[s]] (dotAll) بتخلي [[.]] تطابق [[\n]] كمان. فالناتج [[true false false true]].`,
            R`[[i]] بتتجاهل الكبير والصغير. و [[(\w)\1]] يعني حرف وبعده نفس الحرف تاني ([[\1]] بترجع لأول group)، فلقت [[ll]] في hello. و [[(?:ab)+]] بيكرر [[ab]] كوحدة من غير ما يحفظها، فطابق [[abab]] ووقف قبل [[x]].`,
            R`regex بـ [[g]] متحفوظ في متغير. الـ regex ده object ليه حالة: [[lastIndex]] بيفتكر وقف فين آخر مرة، وده اللي هيعمل الفخ في السطر الجاي.`,
            R`أول [[test]] لقى [[o]] عند index 1 فـ [[lastIndex]] بقى 2. التاني بدأ من 2 ولقى [[o]] التانية ([[lastIndex]] بقى 3). التالت بدأ من 3 وملقاش فرجّع [[false]] (ورجّع [[lastIndex]] لـ 0). نفس النص ونفس الـ regex ونتايج مختلفة، فمتستخدمش [[g]] مع [[test]] على regex متشارك.`,
            R`الـ flag [[y]] (sticky): الـ match لازم يبدأ **بالظبط** عند [[lastIndex]]، مش أي مكان بعده. مفيد في الـ tokenizers اللي بتقرا النص حتة ورا حتة.`,
            R`بنقول للـ regex يبدأ من index 4، وده مكان [[4]] في [["abc 42"]] (بعد [["abc "]]).`,
            R`الأول لقى [[42]] لأنه بدأ من 4 والرقم هناك بالظبط. التاني regex جديد [[lastIndex]] بتاعه 0، وعند 0 فيه [[a]] مش رقم، و [[y]] ممنوع يدوّر لقدّام، فرجّع [[null]]. والـ [[?.]] بتمنع TypeError لو [[exec]] رجّعت [[null]].`,
            R`الـ emoji ده بيتخزن في JS كاتنين code units (UTF-16)، فـ [[length]] بترجّع [[2]]. ومن غير [[u]] الـ [[.]] بتطابق code unit واحد فـ [[^.$]] بتفشل، ومع [[u]] بتتعامل مع الـ emoji كحرف واحد. لو بتعد حروف أو بتقطع نص فيه emoji، استخدم [[u]].`,
            R`الـ flag [[v]] (أحدث من [[u]]) بيسمح بعمليات على الـ classes: [[\p{L}--\p{Ll}]] يعني «أي حرف ناقص الحروف الصغيرة». فـ [[A]] بترجّع [[true]]، و [[a]] بترجّع [[false]]، و [[ع]] بترجّع [[true]] لأن العربي مفيهوش كبير وصغير أصلًا فمش من [[Ll]].`,
            R`[[(?= EGP)]] lookahead: «لازم بعدي [[ EGP]]» من غير ما ياخدها في الـ match، فطلع [[100]] من غير العملة. و [[(?<=€)]] lookbehind: «لازم قبلي [[€]]»، فطلع [[30]] وساب [[50]] لأن قبلها [[$]].`,
          ],
          sol: R`الـ regex: [[/^(?<name>.+?)\s*<(?<email>[^>]+)>$/]]، و [[m.groups]] بـ [[{ name: "Sara Ahmed", email: "sara@example.com" }]]. الـ [[+?]] lazy عشان الاسم ميبلعش المسافة، و [[[^>]+]] «أي حاجة غير >» أحسن وأسرع من [[.+?]] جوه الأقواس.

فخ الـ g: [[filter]] بترجّع [[["1", "3"]]] مش الـ ٣. أول test لقت 1 وخلّت lastIndex = 1، التانية على "2" بدأت من index 1 (بعد آخر النص) ففشلت ورجّعت lastIndex لـ 0، والتالتة نجحت. الحل: شيل g، أو اعمل الـ regex جوه الـ callback.`,
          solCode: R`const contact = /^(?<name>.+?)\s*<(?<email>[^>]+)>$/;
console.log("Sara Ahmed <sara@example.com>".match(contact).groups);
const withG = /\d/g;
console.log(["1", "2", "3"].filter((s) => withG.test(s)));
const noG = /\d/;
console.log(["1", "2", "3"].filter((s) => noG.test(s)));`,
          check: {
            lang: "js",
            starter: R`function parseContact(str) {
  const m = str.match(/(.+) <(.+)>/);
  return m ? { name: m[1], email: m[2] } : null;
}`,
            tests: R`test("'Sara Ahmed <sara@example.com>'", () => expect(parseContact("Sara Ahmed <sara@example.com>")).toEqual({ name: "Sara Ahmed", email: "sara@example.com" }));
test("الاسم ميبلعش المسافة: 'Ali   <ali@x.io>' ← name 'Ali'", () => expect(parseContact("Ali   <ali@x.io>")).toEqual({ name: "Ali", email: "ali@x.io" }));
test("من غير مسافة: 'Mona<m@x.io>'", () => expect(parseContact("Mona<m@x.io>")).toEqual({ name: "Mona", email: "m@x.io" }));
test("من غير <> ← null", () => expect(parseContact("sara@example.com")).toBe(null));
test("كلام بعد الـ > ← null (^ و $)", () => expect(parseContact("Sara <s@x.io> extra")).toBe(null));`,
            solution: R`function parseContact(str) {
  const m = str.match(/^(?<name>.+?)\s*<(?<email>[^>]+)>$/);
  return m ? { name: m.groups.name, email: m.groups.email } : null;
}`
          }
        },
        {
          cmd: "test و match و matchAll و replace",
          title: "تدوّر وتستبدل إزاي؟ (test و match و matchAll و replace)",
          desc: R`[[re.test(str)]]: فيه match ولا لأ (boolean). [[str.match(re)]]: من غير g أول match بالتفاصيل والـ groups، ومع g array نصوص بس (من غير groups). [[str.matchAll(re)]]: لازم g، وبترجّع كل الـ matches بالتفاصيل كل واحد بالـ groups بتاعته، فتلف عليها بـ for...of. [[str.replace(re, x)]]: بتستبدل، ومع g كل الـ matches.

في نص الاستبدال: [[$1]] و [[$2]] الـ groups بالرقم، و [[$<name>]] بالاسم، و [[$&]] الـ match كله. ولو محتاج منطق، ابعت دالة: بتاخد الـ match والـ groups وترجّع النص الجديد.

و [[split]] بتقبل regex كمان، و [[replaceAll]] بنص عادي بتستبدل الكل من غير regex خالص.`,
          example: R`const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const re = /^(?<method>[A-Z]+) (?<path>\S+) (?<status>\d{3}) (?<ms>\d+)ms$/gm;
for (const m of log.matchAll(re)) {
  const { method, path, status, ms } = m.groups;
  if (Number(status) >= 400) console.log(method, path, status, ms);
}
console.log(log.match(/\b\d{3}\b(?= )/g));
console.log("2026-09-29".replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1"));
console.log("2026-09-29".replace(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/, "$<d>/$<m>/$<y>"));
console.log("hello big world".replace(/\b\w/g, (ch) => ch.toUpperCase()));
console.log("a.b.c".replaceAll(".", "/"), "a-b_c  d".split(/[-_\s]+/));
const userInput = "1+1";
const safe = userInput.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
console.log(safe, new RegExp(safe).test("1+1=2"));`,
          try: R`اكتب [[slugify(title)]]: [["  Hello, World! JS 2026  "]] ← [["hello-world-js-2026"]] (حروف صغيرة، وأي حاجة مش حرف أو رقم تبقى شرطة، ومفيش شرطات مكررة ولا في الأطراف). وبعدين اكتب [[maskPhone]] بـ replace ودالة: [["01012345678"]] ← [["010*****678"]]. وبعدين من الـ log اللي فوق اطبع متوسط الـ ms لكل الطلبات. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[slugify]] و [[maskPhone]] و [[avgMs(log)]] (متوسط الـ ms من الـ log).`,
          ref: [
            { t: "MDN: String.prototype.match()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match" },
            { t: "MDN: String.prototype.matchAll()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll" },
            { t: "MDN: String.prototype.replace()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace" },
            { t: "MDN: String.prototype.replaceAll()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه الفرق بين [["a1b22".match(/\d+/g)]] و [["a1b22".match(/\d+/)]] و [["x".match(/\d/)]]؟ وبعدين جرّب [["x".match(/\d/).length]].`, done: R`الأولى [[[ '1', '22' ]]]، والتانية array فيها [['1']] ومعاها [[index: 1]]، والتالتة [[null]] مش array فاضي، فـ [[.length]] بترمي [[TypeError: Cannot read properties of null (reading 'length')]]. والحل [[(str.match(re) ?? []).length]].`, sol: R`~~~js match-kinds.js
console.log("a1b22".match(/\d+/g));
console.log("a1b22".match(/\d+/));
console.log("x".match(/\d/));
try {
  console.log("x".match(/\d/).length);
} catch (err) {
  console.log(err.name + ": " + err.message);
}
console.log(("x".match(/\d/g) ?? []).length);
~~~

~~~text الناتج (node match-kinds.js، Node 24)
[ '1', '22' ]
[ '1', index: 1, input: 'a1b22', groups: undefined ]
null
TypeError: Cannot read properties of null (reading 'length')
0
~~~

- [[match(/\d+/g)]]: مع [[g]] بيرجّع array بكل الـ matches كنصوص بس: [[[ '1', '22' ]]].
- [[match(/\d+/)]]: من غير [[g]] بيرجّع **أول** match، ومعاه تفاصيل: [[index]] (مكانه)، و [[input]] (النص كله)، و [[groups]].
- [["x".match(/\d/)]]: مفيش ولا match ← **[[null]]**، مش array فاضي.
- [[.length]] على [[null]] بيرمي [[TypeError]]، ودي أشهر رسالة في كود الـ regex.
- [[(... ?? []).length]]: لو [[null]] خد array فاضي، فالعدد 0.

**الغلطة الشائعة:** [[str.match(/x/g).length]] على طول عشان «تعد». بيشتغل في كل اختباراتك لأنك دايمًا بتجرّب نص فيه x، وبيقع عند أول يوزر نصه مفيهوش.`  },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[[..."a1".matchAll(/\d/)] ]] و [["a-b-c".replace("-", "_")]]. شغّل الاتنين.`, done: R`الأول بيرمي [[TypeError: String.prototype.matchAll called with a non-global RegExp argument]] (لازم [[g]]). والتاني بيرجّع [["a_b-c"]] (أول واحدة بس). بعد [[/\d/g]] و [[replaceAll("-", "_")]]: [[["1"]]] و [["a_b_c"]].`, sol: R`~~~js matchall-replace.js
try {
  console.log([..."a1".matchAll(/\d/)]);
} catch (err) {
  console.log(err.name + ": " + err.message);
}
console.log("a-b-c".replace("-", "_"));

console.log([..."a1".matchAll(/\d/g)].map(m => m[0]));
console.log("a-b-c".replaceAll("-", "_"), "a-b-c".replace(/-/g, "_"));
~~~

~~~text الناتج (node matchall-replace.js، Node 24)
TypeError: String.prototype.matchAll called with a non-global RegExp argument
a_b-c
[ '1' ]
a_b_c a_b_c
~~~

- **[[matchAll]] من غير [[g]]:** بيرمي [[TypeError]] على طول. ده مقصود في المواصفات: [[matchAll]] معناها «كل»، و regex من غير [[g]] معناه «أول واحد بس»، فالتعارض بيترمي error بدل ما يرجّع حاجة غلط.
- **[[replace("-", "_")]] بنص:** النص بيتبدّل **أول مرة بس**: [["a_b-c"]].
- **التصليح:** [[/\d/g]] لـ matchAll، و [[replaceAll("-", "_")]] أو [[replace(/-/g, "_")]] للكل (آخر سطر: الاتنين [["a_b_c"]]).

**الغلطة الشائعة:** [[replaceAll(/-/, "_")]] بـ regex من غير [[g]]: نفس قاعدة matchAll، بيرمي [[TypeError: String.prototype.replaceAll called with a non-global RegExp argument]] (جرّبناها في Node 24).`  },
            { lvl: 'تطبيق', t: R`**ابني:** [[<textarea>]] لبوست وتحته [[<div id="preview">]]. مع كل كتابة، [[linkify(text)]] بتحوّل كل هاشتاج ([[#]] وبعدها حرف وبعدها حروف أو أرقام أو [[_]]، بـ [[\p{L}]] و [[\p{N}]] و [[u]]) للينك [[/tag/NAME]]. اعمل escape للـ HTML الأول، والاسم في الـ href بـ [[encodeURIComponent]].`, done: R`[["بحب #جافاسكريبت و #JS_2026 مش #"]] بيظهر فيها لينكين بس ([[#]] لوحدها مش هاشتاج)، والـ href بتاع العربي بيبدأ بـ [[/tag/%D8%AC]]. وكتابة [[<b>hi</b>]] بتظهر كنص مش bold.`, sol: R`~~~live 170 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>هاشتاجات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  textarea { font: inherit; width: 100%; box-sizing: border-box; height: 70px; }
  #preview { border: 1px dashed #aaa; padding: 8px; min-height: 2em; margin-top: 8px; white-space: pre-wrap; }
  #preview a { color: #1d4ed8; }
</style>
</head>
<body>
<textarea id="post" aria-label="البوست">بحب #جافاسكريبت و #JS_2026 مش #</textarea>
<div id="preview"></div>
<script>
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const escapeHTML = s => s.replace(/[&<>"']/g, c => ESC[c]);
  const HASHTAG = /#(\p{L}[\p{L}\p{N}_]*)/gu;

  function linkify(text) {
    return escapeHTML(text).replace(HASHTAG, (all, name) => $__bt<a href="/tag/$__{encodeURIComponent(name)}">$__{all}</a>$__bt);
  }

  const post = document.getElementById("post");
  const preview = document.getElementById("preview");
  const render = () => { preview.innerHTML = linkify(post.value); };
  post.addEventListener("input", render);
  render();
</script>
</body>
</html>
~~~

~~~text اللي اتعرض في Chrome 158 (Playwright)
النص الأولاني: لينكين
#جافاسكريبت → /tag/%D8%AC%D8%A7%D9%81%D8%A7%D8%B3%D9%83%D8%B1%D9%8A%D8%A8%D8%AA
#JS_2026 → /tag/JS_2026

بعد ما كتبت <b>hi</b> #تجربة:
النص اللي ظاهر: <b>hi</b> #تجربة | عناصر <b>: 0 | لينكات: 1
~~~

ونفس [[linkify]] في Node عشان تشوف الـ HTML الطالع:

~~~js linkify.js
const escapeHTML = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function linkify(text) {
  return escapeHTML(text).replace(/#(\p{L}[\p{L}\p{N}_]*)/gu, (all, name) => $__bt<a href="/tag/$__{encodeURIComponent(name)}">$__{all}</a>$__bt);
}

console.log(linkify("بحب #جافاسكريبت و #JS_2026 مش #"));
console.log(linkify("<b>hi</b> #تجربة"));
console.log(linkify("#2026 مش هاشتاج"));
~~~

~~~text الناتج (node linkify.js، Node 24)
بحب <a href="/tag/%D8%AC%D8%A7%D9%81%D8%A7%D8%B3%D9%83%D8%B1%D9%8A%D8%A8%D8%AA">#جافاسكريبت</a> و <a href="/tag/JS_2026">#JS_2026</a> مش #
&lt;b&gt;hi&lt;/b&gt; <a href="/tag/%D8%AA%D8%AC%D8%B1%D8%A8%D8%A9">#تجربة</a>
#2026 مش هاشتاج
~~~

**الترتيب مهم: escape الأول وبعدين الـ regex.**

1. [[escapeHTML]]: كل [[<]] و [[>]] و [[&]] والعلامات بتتحوّل لـ entities، فـ [[<b>hi</b>]] بتظهر كنص (عناصر [[<b>]] في الـ preview: 0).
2. [[/#(\p{L}[\p{L}\p{N}_]*)/gu]]: [[#]] وبعدها **حرف** ([[\p{L}]] أي حرف في أي لغة)، وبعده حروف أو أرقام أو [[_]]. فـ [[#]] لوحدها و [[#2026]] (بتبدأ برقم) مش هاشتاج.
3. الدالة في [[replace]]: [[all]] = الـ match كله ([[#جافاسكريبت]])، و [[name]] = الـ group ([[جافاسكريبت]]). اللينك بيتبني بيهم.
4. [[encodeURIComponent(name)]]: الحروف العربي في URL لازم تتحوّل لـ bytes بـ [[%]]، فالـ href بقى [[/tag/%D8%AC...]].

**ليه الـ escape قبل:** لو عملت الـ regex الأول وبعدين escape، الـ [[<a href>]] اللي انت عامله هيتعمله escape ويظهر كنص. ولو معملتش escape خالص، أي حد يكتب [[<img src=x onerror=...>]] في بوست هيشغّل كود عند كل اللي بيشوفه.

**الغلطة الشائعة:** [[\w]] بدل [[\p{L}]]: [[\w]] حروف إنجليزي بس، فـ [[#جافاسكريبت]] مش هتتحوّل لينك.`  },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** لوج فيه سطور زي [[login sara@shop.example ok]] و [[fail omar@mail.example]] و [[login x@@bad]]. طلّع كل إيميل بـ matchAll و named groups [[user]] و [[domain]]، وعدّ كام إيميل لكل domain.`, done: R`على ٤ سطور (منهم واحد بايظ) بيرجّع [[{ 'shop.example': 2, 'mail.example': 1 }]]، والسطر [[x@@bad]] مبيتحسبش. وكل match فيه [[m.groups.user]] و [[m.index]] مكانه في النص.`, sol: R`~~~js emails.js
const log = $__btlogin sara@shop.example ok
fail omar@mail.example
login x@@bad
login ali@shop.example ok$__bt;

const EMAIL = /(?<user>[\w.+-]+)@(?<domain>[\w-]+(?:\.[\w-]+)+)/g;

const perDomain = {};
for (const m of log.matchAll(EMAIL)) {
  console.log(m.groups.user.padEnd(5), m.groups.domain.padEnd(13), "index:", m.index);
  perDomain[m.groups.domain] = (perDomain[m.groups.domain] ?? 0) + 1;
}
console.log(perDomain);
~~~

~~~text الناتج (node emails.js، Node 24)
sara  shop.example  index: 6
omar  mail.example  index: 32
ali   shop.example  index: 69
{ 'shop.example': 2, 'mail.example': 1 }
~~~

**الـ regex:**

- [[(?<user>[\w.+-]+)]]: اسم اليوزر: حروف وأرقام و [[_]] و [[.]] و [[+]] و [[-]]، حرف واحد على الأقل.
- [[@]]: واحدة بس.
- [[(?<domain>[\w-]+(?:\.[\w-]+)+)]]: جزء، وبعده مرة أو أكتر [[.]] وجزء. [[(?:...)]] قوس للتجميع بس من غير ما يبقى group في النتيجة.
- [[x@@bad]]: بعد أول [[@]] جاي [[@]] تاني، والـ domain لازم يبدأ بحرف، فمفيش match. ولو الـ [[x]] اتقرت user مع [["@bad"]]، [[bad]] مفيهوش [[.]] فبرضه مفيش.

**[[matchAll]]:** بيرجّع iterator، كل عنصر match كامل فيه [[groups]] و [[index]] (مكانه في النص: 6 و 32 و 69). والعد بنفس فكرة [[counts[k] ?? 0]].

**ملحوظة:** ده regex «كويس كفاية» لاستخراج من لوج، مش فحص صحة إيميل. الإيميل الحقيقي ليه قواعد أوسع، والفحص الوحيد المضمون إنك تبعتله رسالة.

**الغلطة الشائعة:** [[match(EMAIL)]] بـ [[g]] بيرجّع النصوص بس من غير [[groups]]، فتقطع الـ domain بـ [[split("@")]] تاني. [[matchAll]] بيدّيك الاتنين.`  },
            { lvl: 'تحدي', t: R`**مسألة:** أمان: اكتب [[fill(template, data)]] بتبدّل [[{{name}}]] بقيمتها من data بـ replace ودالة، والمفتاح اللي مش موجود يفضل زي ما هو. وبعدين جرّب قيمة فيها [[$&]] مرة بالدالة ومرة لو كنت بعت نص استبدال عادي بدل الدالة.`, done: R`[[fill("أهلا {{name}}، عندك {{count}} رسالة {{x}}", { name: "سارة", count: 3 })]] ← [[أهلا سارة، عندك 3 رسالة {{x}}]]. والقيمة [["$&"]] بالدالة بتطلع [[$&]] زي ما هي، أما كنص استبدال بتتفهم «الـ match كله» فبيطلع [[{{a}}]] تاني: داتا اليوزر دايمًا بالدالة.`, sol: R`~~~js fill.js
function fill(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (all, key) => (Object.hasOwn(data, key) ? String(data[key]) : all));
}

console.log(fill("أهلا {{name}}، عندك {{count}} رسالة {{x}}", { name: "سارة", count: 3 }));

const evil = { a: "$&" };
console.log("بالدالة:      ", fill("{{a}}", evil));
console.log("بنص استبدال:  ", "{{a}}".replace(/\{\{(\w+)\}\}/g, evil.a));
console.log("$1 كنص:        ", "{{a}}".replace(/\{\{(\w+)\}\}/g, "[$1]"));
~~~

~~~text الناتج (node fill.js، Node 24)
أهلا سارة، عندك 3 رسالة {{x}}
بالدالة:       $&
بنص استبدال:   {{a}}
$1 كنص:         [a]
~~~

- [[/\{\{(\w+)\}\}/g]]: [[{{]] و [[}}]] بـ backslash لأن الأقواس المعووجة ليها معنى في regex ([[{3}]])، وجوه اسم المفتاح كـ group.
- الدالة [[(all, key) => ...]]: بتتنادي لكل match. لو المفتاح موجود في [[data]] نفسها ([[Object.hasOwn]]) بترجّع القيمة كنص، ولو لأ بترجّع [[all]] (الـ match زي ما هو)، فـ [[{{x}}]] فضلت.
- **[["$&"]] بالدالة:** اللي الدالة بترجّعه بيتحط **حرفيًا**، فطلع [[$&]].
- **[["$&"]] كنص استبدال:** في النص التاني لـ replace، [[$&]] معناها «الـ match كله»، و [[$1]] «أول group». فطلع [[{{a}}]] تاني، وآخر سطر بيوري [[$1]] بقت [[a]].

يعني لو داتا يوزر فيها [[$]] (سعر زي [["$5"]] أو باسورد) واتبعتت كنص استبدال، هتتغيّر من غير ما حد يحس. **داتا اليوزر دايمًا من دالة.**

**الغلطة الشائعة:** [[key in data]] بدل [[Object.hasOwn]]: [[{{toString}}]] هتتبدّل بـ [["function toString() { [native code] }"]].`  }
          ],
          flag: "script",
          deep: {
            why: "ده الاستخدام اليومي: تقطّع logs، وتعمل slug، وتخفي بيانات حساسة قبل ما تطبعها (masking)، وتعيد ترتيب تاريخ، وتنظّف input. ومعرفة أنهي method ترجّع إيه بتوفّر عليك «undefined is not iterable» كتير.",
            how: R`[[matchAll]] بترجّع iterator (مش array)، كل عنصر فيه نفس تفاصيل [[match]] من غير g. فهي الطريقة الحديثة لـ «كل الـ matches بالـ groups» بدل loop الـ [[exec]] القديم. ولازم الـ regex فيه g وإلا ترمي TypeError. وبما إن [[m]] موجودة، [[^]] و [[$]] بيطابقوا أول وآخر كل سطر.

[[match]] مع g بيرمي الـ groups وبيرجّع النصوص بس: [[['200', '401', '500']]]. و [[\b\d{3}\b(?= )]]: ٣ أرقام كلمة لوحدها وبعدها مسافة، فـ 230 (بعدها ms) مدخلتش.

الدالة في replace بتاخد [[(match, g1, g2, ..., offset, string, groups)]]. في المثال بتاخد أول حرف كل كلمة وترجعه كابيتال.

آخر سطرين: لو هتبني regex من input اليوزر ([[new RegExp(text)]])، أي [[+]] أو [[.]] أو [[(]] هيبقى ليه معنى، وممكن حد يدخّل pattern يوقّع السيرفر (آخر درس). فلازم تعمل escape لكل الحروف الخاصة: [[$&]] في الاستبدال معناها «الحرف اللي اتطابق»، فكل حرف خاص بيبقى [[\]] + نفسه. وفيه [[RegExp.escape(text)]] الجديدة (ES2025) بتعمل ده، مدعومة في المتصفحات الحديثة و Node 24+، بس مش في Node 22.`,
            when: R`matchAll: استخراج كل الحاجات بتفاصيلها (logs، hashtags، mentions). replace بدالة: تحويلات فيها منطق. split بـ regex: فواصل متعددة. replaceAll بنص: استبدال حرفي من غير regex.`,
            mistakes: R`[[str.replace("a", "b")]] بنص عادي بتستبدل أول واحد بس: استخدم replaceAll. و [[matchAll]] من غير g. و [[match]] بـ g وتتوقع groups. و [[$]] في نص الاستبدال وانت عايزه حرفي (اكتب [[$$]]). و [[new RegExp(userInput)]] من غير escape. و [[new RegExp("\d+")]] بـ backslash واحد: في الـ string بيبقى [["d+"]]، لازم [["\\d+"]].`
          },
          teach: R`## المثال بيعمل إيه

بياخد ٣ سطور log ويطلّع منهم الطلبات اللي فشلت، وبعدين يجرّب كل طريقة استبدال: بالرقم، وبالاسم، وبدالة، ونص عادي، وفي الآخر بيحمي نص جاي من اليوزر قبل ما يحوّله regex. الناتج كله من Node 24 على Windows.

> المربع اللي تحت الدرس بيطلب [[slugify]] و [[maskPhone]] و [[avgMs]]. الشرح هنا بيفك المثال والأدوات اللي هتحتاجها، والحل نفسه عليك.

---

## ١. الـ log والـ regex

~~~text app.js
const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const re = /^(?<method>[A-Z]+) (?<path>\S+) (?<status>\d{3}) (?<ms>\d+)ms$/gm;
~~~

الـ log نص واحد فيه ٣ سطور مفصولين بـ [[\n]]. وكل سطر شكله: method، مسافة، path، مسافة، status، مسافة، وقت بالـ ms.

| الحتة | بتمسك | من السطر الأول |
|---|---|---|
| [[^]] | أول السطر (بسبب [[m]]) | |
| [[(?<method>[A-Z]+)]] | حروف كابيتال | [[GET]] |
| مسافة | المسافة نفسها | |
| [[(?<path>\S+)]] | أي حاجة مش مسافة ([[\S]] عكس [[\s]]) | [[/api/users]] |
| [[(?<status>\d{3})]] | ٣ أرقام | [[200]] |
| [[(?<ms>\d+)ms]] | أرقام وبعدها الحرفين ms | [[12]] |
| [[$]] | آخر السطر | |

والـ flags: [[g]] عشان نلاقي كل السطور، و [[m]] عشان [[^]] و [[$]] يبقوا لكل سطر مش للنص كله.

---

## ٢. [[matchAll]]: كل match بتفاصيله

~~~text app.js
for (const m of log.matchAll(re)) {
  const { method, path, status, ms } = m.groups;
  if (Number(status) >= 400) console.log(method, path, status, ms);
}
~~~

- [[log.matchAll(re)]]: بترجّع **iterator** (حاجة بتلف عليها بـ [[for...of]] أو تفردها بـ [[[...x]]])، مش array. كل عنصر فيه نفس اللي [[match]] من غير g بترجّعه: [[[0]]] و [[groups]] و [[index]].
- [[const { method, path, status, ms } = m.groups]]: **destructuring**: بيطلّع ٤ متغيرات من الـ object مرة واحدة بنفس الأسامي.
- [[Number(status)]]: الـ groups دايمًا **نصوص**، فبنحوّل لرقم قبل المقارنة بـ [[>=]].

لما فردناها ([[[...log.matchAll(re)]]]) لقينا 3 matches، وأول واحد:

~~~text الناتج
3 GET /api/users 200 12ms | {"method":"GET","path":"/api/users","status":"200","ms":"12"} 24
~~~

و [[index]] بتاع التاني 24: السطر الأول ٢٣ حرف + [[\n]].

وناتج المثال (الـ status 400 أو أكتر بس):

~~~text الناتج
POST /api/login 401 8
GET /api/orders 500 230
~~~

ولو نسيت [[g]]:

~~~text الناتج لـ "a1".matchAll(/\d/)
TypeError: String.prototype.matchAll called with a non-global RegExp argument
~~~

---

## ٣. [[match]] مع [[g]]: نصوص بس

~~~text app.js
console.log(log.match(/\b\d{3}\b(?= )/g));
~~~

[[\b\d{3}\b]]: ٣ أرقام لوحدهم ككلمة، و [[(?= )]]: بعدهم مسافة (lookahead، الدرس اللي فات).

~~~text الناتج
[ '200', '401', '500' ]
~~~

[[230]] مدخلتش: بعدها [[ms]] مش مسافة. ولاحظ إن مع [[g]] الـ [[match]] بيرجّع النصوص وخلاص، من غير groups ولا index. عشان كده [[matchAll]] موجودة.

---

## ٤. [[replace]] بـ [[$1]] و [[$<name>]]

~~~text app.js
console.log("2026-09-29".replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1"));
console.log("2026-09-29".replace(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/, "$<d>/$<m>/$<y>"));
~~~

[[str.replace(re, نص)]]: بيستبدل الـ match بالنص التاني. وجوه نص الاستبدال رموز خاصة:

| الرمز | معناه |
|---|---|
| [[$1]] [[$2]] [[$3]] | group رقم 1 و 2 و 3 |
| [[$<name>]] | الـ group اللي اسمه name |
| [[$&]] | الـ match كله |
| [[$$]] | علامة [[$]] حرفية |

فـ [["$3/$2/$1"]] = اليوم/الشهر/السنة:

~~~text الناتج
29/09/2026
29/09/2026
~~~

نفس النتيجة، والتاني أوضح لأنك بتقرا [[$<d>]] وفاهم.

---

## ٥. [[replace]] بدالة

~~~text app.js
console.log("hello big world".replace(/\b\w/g, (ch) => ch.toUpperCase()));
~~~

[[\b\w]]: أول حرف بعد حد كلمة، يعني أول حرف في كل كلمة. ومع [[g]] كل الكلمات. وبدل نص، بعتنا **دالة**: [[replace]] بتناديها مع كل match، واللي ترجّعه بيتحط مكانه.

~~~text الناتج
Hello Big World
~~~

الدالة بتاخد arguments بالترتيب ده: الـ match، وبعدين كل group، وبعدين المكان ([[offset]])، والنص الأصلي، والـ named groups لو فيه. جرّبنا:

~~~text الناتج لـ "a1".replace(/(\d)/, (match, g1, offset, str) => JSON.stringify([match, g1, offset, str]))
a["1","1",1,"a1"]
~~~

---

## ٦. [[replaceAll]] و [[split]]

~~~text app.js
console.log("a.b.c".replaceAll(".", "/"), "a-b_c  d".split(/[-_\s]+/));
~~~

- [[replaceAll(".", "/")]]: بنص عادي (مش regex)، فالنقطة نقطة حرفية، وكل النقط اتغيرت. ([[replace]] بنص عادي بيغيّر **أول واحدة بس**: [["a-b-c".replace("-", "+")]] طلّعت [[a+b-c]].)
- [[split(/[-_\s]+/)]]: يقطّع عند أي سلسلة من شرطة أو [[_]] أو مسافات. والـ [[+]] بتخلي المسافتين فاصل واحد.

~~~text الناتج
a/b/c [ 'a', 'b', 'c', 'd' ]
~~~

---

## ٧. regex من نص اليوزر: escape

~~~text app.js
const userInput = "1+1";
const safe = userInput.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
console.log(safe, new RegExp(safe).test("1+1=2"));
~~~

- [[new RegExp(نص)]]: بيعمل regex من string. مفيد لما الـ pattern مش معروف وانت بتكتب الكود (بحث بكلمة اليوزر).
- المشكلة: [[+]] في [["1+1"]] ليها معنى في الـ regex («واحد أو أكتر»). ولو اليوزر كتب [["(a+"]] الـ regex نفسه هيبوظ:

~~~text الناتج لـ new RegExp("(a+")
SyntaxError: Invalid regular expression: /(a+/: Unterminated group
~~~

- الحل: قبل كل حرف خاص حط [[\]]. الـ class [[[.*+?^$__{}()|[\]\\]]] فيها كل الحروف الخاصة (و [[\]]] و [[\\]] عشان [[]]] و [[\]] نفسهم)، و [["\\$&"]] = [[\]] + الحرف اللي اتطابق ([[$&]]).

~~~text الناتج
1\+1 true
~~~

بقت [[1\+1]]، فبتدوّر على «1+1» حرفيًا.

### RegExp.escape: الدالة الجاهزة (ES2025)

بدل ما تكتب الـ regex اللي فوق بإيدك، اللغة نفسها بقى فيها [[RegExp.escape(str)]]: بتاخد نص وترجّع نسخة آمنة تتحط جوه [[new RegExp]]. موجودة في Node 24 والمتصفحات الحديثة (Chrome 136 و Firefox 134 و Safari 18.2، من MDN)، ومش موجودة في Node 22. جرّبتها على Node 24:

~~~text esc.mjs
console.log(RegExp.escape("1+1"));
console.log(RegExp.escape("price: $5.00 (sale)"));
console.log(RegExp.escape("a-b/c"));
console.log(RegExp.escape("قهوة.شاي"));
~~~

~~~text الناتج (Node 24)
\x31\+1
\x70rice\x3a\x20\$5\.00\x20\(sale\)
\x61\x2db\/c
قهوة\.شاي
~~~

شكلها غريب بس كله مقصود:

- [[\+]] و [[\$]] و [[\.]] و [[\(]]: الحروف الخاصة بـ [[\]] قبلها، زي النسخة اليدوية.
- [[\x31]] و [[\x70]] و [[\x61]]: **أول** حرف لو رقم أو حرف إنجليزي بيتكتب بالكود بتاعه (31 هو كود «1» بالـ hex). ليه؟ عشان لو لزقت النتيجة بعد حاجة زي [[\1]] (back-reference) أو [[\c]]، الحرف الأول ميتقريش جزء منها ويغيّر المعنى.
- [[\x20]] للمسافة و [[\x3a]] لـ [[:]]: حروف ملهاش معنى دلوقتي، بس بتتعمل escape عشان تفضل آمنة في flag [[v]] و [[x]] (الأخير لسه مقترح).
- [[\x2d]] للـ [[-]] و [[\/]] للـ [[/]].
- العربي بيعدّي زي ما هو، والنقطة بس اتعمل لها escape.

### الفرق اللي بيبان: جوه الأقواس المربعة

النسخة اليدوية اللي فوق مبتعملش escape للـ [[-]]. برّه الأقواس المربعة ده مش مشكلة، بس لو حطيت النص **جوه** class:

~~~text esc.mjs
const oldEsc = (s) => s.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
console.log(oldEsc("a-z"), new RegExp("[" + oldEsc("a-z") + "]").test("m"));
console.log(new RegExp("[" + RegExp.escape("a-z") + "]").test("m"));
~~~

~~~text الناتج (Node 24)
a-z true
false
~~~

النسخة اليدوية سابت [[a-z]] زي ما هي، فبقت **range** من a لـ z وطابقت «m» غلط. [[RegExp.escape]] حوّلت الـ [[-]] لـ [[\x2d]] فبقت تطابق الـ ٣ حروف «a» و «-» و «z» بس. يعني لو هتحط نص اليوزر جوه أقواس مربعة النسخة اليدوية محتاجة [[-]] زيادة في الـ class بتاعها.

### كلمة كاملة من اليوزر

~~~text esc.mjs
const word = "c++";
const re = new RegExp($__bt(?<![\\w+])$__{RegExp.escape(word)}(?![\\w+])$__bt, "gi");
console.log("I like C++ and c++11 and c++".replace(re, "[$&]"));
~~~

~~~text الناتج (Node 24)
I like [C++] and c++11 and [c++]
~~~

- [[RegExp.escape(word)]] حوّلت [[c++]] لـ [[\x63\+\+]]، فالـ [[+]] بقت حرف عادي.
- [[\b]] مكانش هينفع هنا: [[\b]] حدود بين حرف وغير حرف، و [[+]] مش «حرف»، فبعد [[c++]] مفيش [[\b]]. عشان كده استخدمنا lookbehind و lookahead (الجزء ٨ في درس «groups و flags»): «قبلها وبعدها مش حرف ولا +».
- في template literal لازم [[\\w]] بـ backslash مزدوج، لأن النص نفسه بياكل واحدة.

### لو الكود هيشتغل على Node قديم

~~~text esc.mjs
const esc = RegExp.escape ?? ((s) => s.replace(/[.*+?^$__{}()|[\]\\-]/g, "\\$&"));
~~~

[[??]] بتستخدم الجاهزة لو موجودة، وغير كده النسخة اليدوية (وزوّدنا فيها [[-]] في آخر الـ class). و [[RegExp.escape(5)]] بترمي [[TypeError: input argument must be a string]]، فحوّل الأرقام لنص الأول.

---

## الخلاصة

| عايز | استخدم | بترجّع |
|---|---|---|
| فيه ولا لأ | [[re.test(str)]] | true / false |
| أول match بتفاصيله | [[str.match(re)]] من غير g | array أو null |
| كل الـ matches كنصوص | [[str.match(re)]] مع g | array نصوص أو null |
| كل الـ matches بتفاصيلها | [[str.matchAll(re)]] (لازم g) | iterator |
| تستبدل | [[str.replace(re, نص أو دالة)]] | نص جديد |
| تستبدل نص حرفي في كل حتة | [[str.replaceAll(نص, نص)]] | نص جديد |
| تقطّع بفواصل مختلفة | [[str.split(re)]] | array |
| نص من اليوزر جوه regex | [[new RegExp(RegExp.escape(text))]] | regex بيدوّر على النص حرفيًا |

والـ groups دايمًا نصوص: حوّلها بـ [[Number]] قبل ما تحسب.`,
          lines: [
            R`3 سطور log في string واحدة مفصولة بـ [[\n]]: method و path و status code ووقت الرد. هنطلّع منها الطلبات اللي فشلت.`,
            R`كل جزء في السطر ليه named group: [[method]] حروف كبيرة، و [[path]] أي حاجة من غير مسافات ([[\S+]])، و [[status]] 3 أرقام، و [[ms]] الرقم اللي قبل [[ms]]. الـ [[g]] عشان [[matchAll]] يلاقي كل السطور، والـ [[m]] عشان [[^]] و [[$]] تبقى لكل سطر بدل النص كله.`,
            R`[[matchAll]] بترجّع iterator فيه كل match بتفاصيله كاملة ([[groups]] و [[index]])، على عكس [[match]] بـ [[g]] اللي بترجّع النصوص بس. ولازم الـ regex يكون بـ [[g]]، وإلا [[matchAll]] بترمي TypeError.`,
            R`بنفك الـ [[groups]] في 4 متغيرات بأسمائهم. كل القيم دي strings، حتى [[status]] و [[ms]].`,
            R`بنحوّل [[status]] لرقم ونطبع اللي 400 أو أكتر (أخطاء)، فيطلع [[POST /api/login 401 8]] و [[GET /api/orders 500 230]]. المقارنة من غير [[Number]] كانت هتشتغل هنا بالتحويل الضمني، بس [[Number]] بيوضّح النية.`,
            R`نهاية الـ [[for...of]].`,
            R`[[match]] مع [[g]] بترجّع array من النصوص بس: [[200]] و [[401]] و [[500]]. الـ [[\b]] من الناحيتين بتمنع إنه يمسك 3 أرقام من جوه حاجة أطول زي [[230ms]]، و [[(?= )]] بتتأكد إن بعده مسافة.`,
            R`[[replace]] بيدوّر على التاريخ، وفي نص الاستبدال [[$1]] و [[$2]] و [[$3]] بيرجعوا للـ groups بالترتيب، فقلبنا الترتيب وطلع [[29/09/2026]]. ومن غير [[g]] بيستبدل أول match بس.`,
            R`نفس الاستبدال بس بـ [[$<name>]]. أوضح لأنك بتقرا الأسماء بدل ما تعد الأقواس، ولو ضفت group جديد بعدين الأرقام مش هتتلخبط.`,
            R`بدل نص، بنبعت دالة: [[replace]] بتناديها لكل match وبتحط اللي رجّعته مكانه. [[\b\w]] أول حرف في كل كلمة، والـ [[g]] عشان الكل مش أول واحد بس، فطلع [[Hello Big World]].`,
            R`[[replaceAll]] بنص عادي بتستبدل **كل** مرة من غير regex، فمش محتاج تعمل escape للنقطة: [[a/b/c]]. و [[split]] بـ regex بتقسم على أي مجموعة من [[-]] أو [[_]] أو مسافات ورا بعض، فطلع [[a]] و [[b]] و [[c]] و [[d]] من غير عناصر فاضية.`,
            R`نص جاي من اليوزر وعايزين ندوّر عليه حرفيًا. المشكلة إن [[+]] حرف خاص في الـ regex (يعني «مرة أو أكتر»)، فـ [[new RegExp("1+1")]] معناها «1 مرة أو أكتر وبعدها 1» ومش هتلاقي [["1+1=2"]] أصلًا.`,
            R`بيحط backslash قبل أي حرف ليه معنى خاص في الـ regex، و [[$&]] في نص الاستبدال معناها «الحرف اللي اتلقى نفسه». فـ [["1+1"]] بقت [[1\+1]]. اعمل كده لأي نص من اليوزر قبل ما تبني منه regex، وإلا ممكن يكسر الـ regex أو يدّي اليوزر تحكم فيه.`,
            R`بيطبع النص بعد الـ escape ([[1\+1]])، و [[new RegExp(safe)]] بقى يدوّر على [[1+1]] حرفيًا فلقاها: [[true]].`,
          ],
          sol: R`[[slugify]]: [[title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "")]]. أول replace بيحوّل أي سلسلة حروف مش حرف ولا رقم (مسافات وفواصل وعلامات) لشرطة واحدة (بسبب الـ [[+]])، والتاني بيشيل الشرطات من الأطراف. استخدمنا [[\p{L}]] مش [[a-z]] عشان العناوين العربي متتمسحش. الناتج [["hello-world-js-2026"]]، وعنوان عربي زي [["أول درس في JS"]] بيطلع [["أول-درس-في-js"]].

[[maskPhone]]: [[/^(\d{3})(\d+)(\d{3})$/]] ودالة ترجّع [[a + "*".repeat(mid.length) + c]]، فالناتج [["010*****678"]] وطوله زي الأصل.

المتوسط: [[(12 + 8 + 230) / 3]] = 83.33. الغلطة الشائعة إنك تجمع [[m.groups.ms]] من غير Number فتلزق نصوص: [["0" + "12" + "8" + "230"]].`,
          solCode: R`const slugify = (title) => title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
console.log(slugify("  Hello, World! JS 2026  "), slugify("أول درس في JS"));
const maskPhone = (p) => p.replace(/^(\d{3})(\d+)(\d{3})$/, (_, a, mid, c) => a + "*".repeat(mid.length) + c);
console.log(maskPhone("01012345678"));
const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
const times = [...log.matchAll(/(?<ms>\d+)ms$/gm)].map((m) => Number(m.groups.ms));
console.log(times, (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2));`,
          check: {
            lang: "js",
            starter: R`const slugify = (title) => title.toLowerCase().replaceAll(" ", "-");
const maskPhone = (p) => p;
function avgMs(log) {
  // matchAll على /(?<ms>\d+)ms$/gm وحوّل لـ Number قبل الجمع
}`,
            tests: R`test("slugify('  Hello, World! JS 2026  ') ← 'hello-world-js-2026'", () => expect(slugify("  Hello, World! JS 2026  ")).toBe("hello-world-js-2026"));
test("العربي ميتمسحش: 'أول درس في JS' ← 'أول-درس-في-js'", () => expect(slugify("أول درس في JS")).toBe("أول-درس-في-js"));
test("مفيش شرطات مكررة ولا في الأطراف: '--a  --  b--' ← 'a-b'", () => expect(slugify("--a  --  b--")).toBe("a-b"));
test("maskPhone('01012345678') ← '010*****678' بنفس الطول", () => expect(maskPhone("01012345678")).toBe("010*****678"));
test("avgMs للـ log اللي في المثال ← 83.33 تقريبًا (Number مش لزق نصوص)", () => {
  const log = "GET /api/users 200 12ms\nPOST /api/login 401 8ms\nGET /api/orders 500 230ms";
  expect(Math.round(avgMs(log) * 100) / 100).toBe(83.33);
});`,
            solution: R`const slugify = (title) => title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
const maskPhone = (p) => p.replace(/^(\d{3})(\d+)(\d{3})$/, (_, a, mid, c) => a + "*".repeat(mid.length) + c);
function avgMs(log) {
  const times = [...log.matchAll(/(?<ms>\d+)ms$/gm)].map((m) => Number(m.groups.ms));
  return times.reduce((a, b) => a + b, 0) / times.length;
}`
          }
        },
        {
          cmd: "إمتى regex غلط",
          title: "إمتى متستخدمش regex؟ (email و HTML و ReDoS)",
          desc: R`regex أداة للأشكال البسيطة. ٣ أماكن هو فيها غلط:

الإيميل: الـ regex «الكامل» حسب المواصفات صفحة كاملة ولسه بيغلط. اللي بيهمك إن الإيميل موجود وبتاع اليوزر، وده مفيش regex بيقوله. اعمل فحص بسيط ([[@]] ونقطة بعدها، أو [[type="email"]] أو [[z.email()]])، وابعت رسالة تأكيد.

HTML و JSON و URLs: دي لغات متداخلة (tag جوه tag، و quotes، و comments)، و regex مبيعرفش يعد العمق. استخدم parser: [[DOMParser]] في المتصفح، و [[JSON.parse]]، و [[new URL()]] و [[URLSearchParams]].

ReDoS (catastrophic backtracking): patterns فيها quantifier جوه quantifier زي [[(a+)+]] أو [[(\w+\s?)*]] ممكن تاخد وقت بيتضاعف مع كل حرف في input معيّن. ولأن Node thread واحد، request واحد بـ ٣٠ حرف ممكن يوقّف السيرفر كله.`,
          example: R`const evil = /^(a+)+$/;
const fixed = /^a+$/;
for (const n of [20, 24, 26]) {
  const input = "a".repeat(n) + "!";
  const t0 = performance.now();
  evil.test(input);
  const t1 = performance.now();
  fixed.test(input);
  console.log(n, Math.round(t1 - t0) + "ms", (performance.now() - t1).toFixed(3) + "ms");
}
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(email.test("sara@example.com"), email.test("sara@localhost"), email.test("a b@x.com"));
console.log(new URL("https://shop.example/p?id=7&ref=fb").searchParams.get("id"));`,
          try: R`شغّل المثال، وبعدين زوّد الـ n لـ 28 و 30 (خلي Ctrl+C جاهز). الوقت بيزيد إزاي مع كل حرفين؟ وبعدين في Console بتاع المتصفح: استخرج كل اللينكات من [['<p>اقرا <a href="/a">ده</a> و <a href="/b" class="x">ده</a></p>']] مرة بـ regex ومرة بـ DOMParser، وبعدين حط [[>]] جوه قيمة attribute وشوف مين فيهم بيبوظ.`,
          ref: [
            { t: "MDN: RegExp.escape()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape" },
            { t: "MDN: URLSearchParams", url: "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" },
            { t: "MDN: RegExp", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp" },
            { t: "OWASP: Regular expression Denial of Service (ReDoS)", url: "https://community.owasp.org/attacks/Regular_expression_Denial_of_Service_-_ReDoS" },
          ],
          pre: [{ to: "js/FormData و URLSearchParams", why: R`أول تمرين بيبدّل regex بـ [[URLSearchParams]]، واتشرحت هناك` }],
          practice: [
            { lvl: 'سريع', t: R`refactor: الكود ده بيطلّع الـ id من URL بـ regex: [[url.match(/id=(\d+)/)[1]]]. اكتبه بـ [[new URL(url).searchParams]] وجرّب الاتنين على [["https://shop.example/p?id=7&tag=a&tag=b"]] وعلى [["https://shop.example/p?pid=9&id=7"]] وعلى URL مفيهوش id.`, done: R`في أول URL الاتنين بيدّوا [["7"]]. في التاني الـ regex بيدّي [["9"]] غلط (لقى [[id=9]] جوه [[pid=9]])، و [[get("id")]] بتدّي [["7"]]. والـ URL اللي مفيهوش id: الـ regex بيقع بـ TypeError، و [[get("id")]] بترجّع [[null]]. و [[getAll("tag")]] بتدّي [[[ 'a', 'b' ]]] اللي كانت محتاجة regex تاني.`, sol: R`~~~js url-params.js
const urls = [
  "https://shop.example/p?id=7&tag=a&tag=b",
  "https://shop.example/p?pid=9&id=7",
  "https://shop.example/p?tag=a",
];

for (const url of urls) {
  let byRegex;
  try {
    byRegex = url.match(/id=(\d+)/)[1];
  } catch (err) {
    byRegex = err.name;
  }
  const params = new URL(url).searchParams;
  console.log("regex:", String(byRegex).padEnd(9), "| get:", params.get("id"), "| getAll(tag):", params.getAll("tag"));
}
~~~

~~~text الناتج (node url-params.js، Node 24)
regex: 7         | get: 7 | getAll(tag): [ 'a', 'b' ]
regex: 9         | get: 7 | getAll(tag): []
regex: TypeError | get: null | getAll(tag): [ 'a' ]
~~~

**المقارنة:**

| الـ URL | الـ regex | [[searchParams.get("id")]] |
|---|---|---|
| [[?id=7&tag=a&tag=b]] | 7 | 7 |
| [[?pid=9&id=7]] | **9** غلط: لقى [[id=9]] جوه [[pid=9]] | 7 |
| [[?tag=a]] | **TypeError**: [[match]] رجّع null | [[null]] |

- [[new URL(url)]]: بيفك الـ URL لحتته (البروتوكول والـ host والـ path والـ query) بنفس قواعد المتصفح.
- [[.searchParams]]: [[URLSearchParams]] فيه الـ query متفكك ومعمول له decode ([[%20]] بتبقى مسافة).
- [[get("id")]]: أول قيمة للمفتاح ده بالظبط، أو [[null]].
- [[getAll("tag")]]: كل القيم لنفس المفتاح: [[[ 'a', 'b' ]]].

**الغلطة الشائعة:** تصلّح الـ regex بـ [[/[?&]id=(\d+)/]]. بيصلّح حالة [[pid]] بس، وبيفضل ناسي الـ decode، و [[#id=3]] في الـ hash، والـ URL اللي الـ id فيه مش أرقام. الـ parser بيعرف كل ده.`  },
            { lvl: 'تطبيق', t: R`ابني: فقرة نص و input بحث، وكل ما تكتب الكلمة بتتحط في [[<mark>]] من غير حساسية للحروف ([[gi]]). جرّب تكتب [[c++]] من غير escape الأول، وبعدين بـ [[RegExp.escape]] (أو الـ replace اللي في درس replace).`, done: R`من غير escape بيقع بـ [[SyntaxError: Invalid regular expression: /c++/gi: Nothing to repeat]] والبحث بيقف. وبعده [["I love C++ and c++"]] بيظلل الاتنين. و [[RegExp.escape("c++")]] (Node 24 والمتصفحات الحديثة) بيطلع [[\x63\+\+]] مش [[c\+\+]]: بيهرّب أول حرف كمان وده سليم.`, sol: R`~~~live 150 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>تظليل البحث</title>
<style>
  body { font: 16px/1.7 system-ui, sans-serif; margin: 16px; }
  input { font: inherit; padding: 4px 8px; }
  #text { direction: ltr; text-align: left; }
  mark { background: #fde047; }
</style>
</head>
<body>
<input id="q" aria-label="دوّر" placeholder="دوّر...">
<p id="text">I love C++ and c++. JavaScript (JS) is not Java.</p>
<script>
  const original = document.getElementById("text").textContent;
  const textEl = document.getElementById("text");
  const escapeRegex = s => (RegExp.escape ? RegExp.escape(s) : s.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&"));

  function highlight(query) {
    textEl.textContent = original;
    if (!query) return;
    const re = new RegExp(escapeRegex(query), "gi");
    const parts = [];
    let last = 0;
    for (const m of original.matchAll(re)) {
      parts.push(document.createTextNode(original.slice(last, m.index)));
      const mark = document.createElement("mark");
      mark.textContent = m[0];
      parts.push(mark);
      last = m.index + m[0].length;
    }
    parts.push(document.createTextNode(original.slice(last)));
    textEl.replaceChildren(...parts);
  }

  document.getElementById("q").addEventListener("input", e => highlight(e.target.value));
</script>
</body>
</html>
~~~

~~~text اللي اتعرض في Chrome 158 (Playwright)
كتبت c++:  I love <mark>C++</mark> and <mark>c++</mark>. JavaScript (JS) is not Java.
كتبت (:    1 mark ومفيش error
مسحت:      I love C++ and c++. JavaScript (JS) is not Java.
~~~

ومن غير escape، ونفس الحاجة في Node:

~~~js escape.js
try {
  new RegExp("c++", "gi");
} catch (err) {
  console.log(err.name + ": " + err.message);
}
console.log(RegExp.escape("c++"));

const escapeRegex = s => s.replace(/[.*+?^$__{}()|[\]\\]/g, "\\$&");
console.log(escapeRegex("c++"));

const text = "I love C++ and c++";
const re = new RegExp(RegExp.escape("c++"), "gi");
console.log(text.replace(re, m => $__bt<mark>$__{m}</mark>$__bt));
~~~

~~~text الناتج (node escape.js، Node 24)
SyntaxError: Invalid regular expression: /c++/gi: Nothing to repeat
\x63\+\+
c\+\+
I love <mark>C++</mark> and <mark>c++</mark>
~~~

**اللي بيحصل:**

- [[new RegExp("c++")]]: [[+]] في regex معناها «مرة أو أكتر»، و [[++]] ورا بعض مفيش قبلها حاجة تتكرر، فـ **SyntaxError: Nothing to repeat**. في الصفحة ده معناه إن الـ handler وقع والتظليل وقف عند أول حرف.
- [[RegExp.escape("c++")]]: بيطلّع [[\x63\+\+]]: الـ [[+]] بقت [[\+]] (حرفيًا)، وأول حرف [[c]] اتكتب [[\x63]] (كوده بالـ hex). ده مقصود في المواصفات عشان النص يفضل آمن لو اتلزق بعد [[\]] أو جوه [[\c]]. الاتنين بيطابقوا نفس النص.
- [[escapeRegex]] بإيدك: [[replace]] على كل رمز ليه معنى ويحط قبله [[\]] ([[$&]] هنا مقصودة: «الـ match نفسه»). دي البديل للمتصفحات القديمة، والصفحة بتختار [[RegExp.escape]] لو موجود.
- [[gi]]: [[g]] كل الأماكن، و [[i]] من غير حساسية لحروف كبيرة وصغيرة، فاتظلل [[C++]] و [[c++]].
- **التظليل بـ [[createElement("mark")]] و text nodes:** مش [[innerHTML]]، فلو حد كتب [[<img>]] في البحث مش هيتنفّذ.

**الغلطة الشائعة:** تعمل escape للنص **بعد** ما تحطه في [[innerHTML]] أو تنسى الـ escape لأن «اليوزر هيكتب كلام عادي». أول واحد يدوّر على [[(]] أو [[?]] أو [[c++]] بيبوّظ الصفحة.`  },
            { lvl: 'تحدي', t: R`قارن وقيس: [[/^(\w+\s?)*$/]] (كلمات بينها مسافة واحدة) فيه ReDoS. اكتب بديل بيقبل ويرفض نفس النصوص بالظبط من غير quantifier جوه quantifier غامض، وقارن الاتنين على ٨ نصوص (منهم [[""]] و [["a "]] و [["a  b"]] و [[" a"]])، وبعدين قيس الوقت على [["a".repeat(20) + "!"]] و 22 و 24.`, done: R`الاتنين بيدّوا نفس true/false في الـ ٨ نصوص ([[""]] و [["a "]] مقبولين، و [["a  b"]] و [[" a"]] مرفوضين). وعلى الـ input الطويل القديم وقته بيتضاعف حوالي ٤ مرات مع كل حرفين، والجديد بيخلص في أقل من 1ms حتى على ٣٠ حرف. اكتب الأرقام اللي قستها.`, sol: R`~~~js redos.js
const bad = /^(\w+\s?)*$/;
const good = /^(?:\w+(?: \w+)* ?)?$/;

const samples = ["", "a ", "a  b", " a", "hello world", "a b c", "abc", "a b "];
for (const s of samples) {
  const b = bad.test(s), g = good.test(s);
  console.log(JSON.stringify(s).padEnd(14), b, g + (b === g ? "" : "  ← مختلفين"));
}

function time(re, s) {
  const t = performance.now();
  re.test(s);
  return (performance.now() - t).toFixed(1);
}
for (const n of [20, 22, 24, 26]) {
  const s = "a".repeat(n) + "!";
  console.log("n=" + n, "القديم:", time(bad, s), "ms", "| الجديد:", time(good, s), "ms");
}
console.log("الجديد على 30000 حرف:", time(good, "a".repeat(30000) + "!"), "ms");
~~~

~~~text الناتج (node redos.js، Node 24 على Windows)
""             true true
"a "           true true
"a  b"         false false
" a"           false false
"hello world"  true true
"a b c"        true true
"abc"          true true
"a b "         true true
n=20 القديم: 5.8 ms | الجديد: 0.0 ms
n=22 القديم: 23.2 ms | الجديد: 0.0 ms
n=24 القديم: 98.6 ms | الجديد: 0.0 ms
n=26 القديم: 415.6 ms | الجديد: 0.0 ms
الجديد على 30000 حرف: 0.1 ms
~~~

**البديل:** [[/^(?:\w+(?: \w+)* ?)?$/]]

- [[\w+]] كلمة، وبعدها [[(?: \w+)*]]: مسافة **واحدة** وكلمة، صفر مرة أو أكتر. كل مسافة لازم بعدها كلمة، فمفيش طريقتين لتقسيم نفس الحروف.
- [[ ?]] في الآخر: مسافة اختيارية بعد آخر كلمة (عشان [["a "]] اتقبلت في الأصلي).
- [[(...)?]] حوالين الكل: عشان [[""]] تتقبل زي الأصلي.

**المقارنة:** نفس true/false في الـ ٨ نصوص (ولا سطر عليه «مختلفين»).

**ليه القديم بيقع:** في [[(\w+\s?)*]] المسافة اختيارية، فـ [["aaaa"]] ممكن تتقسم [[a|a|a|a]] أو [[aa|aa]] أو [[aaaa]]... أو أي تقسيمة. ولما الآخر [["!"]] يفشّل الـ match، الـ engine بيجرّب **كل** التقسيمات قبل ما يقول لأ، وعددها بيتضاعف مع كل حرف. الأرقام اللي قسناها: كل حرفين زيادة الوقت بيتضرب حوالي ٤ مرات، وعلى ٣٠ حرف كان هيبقى ثواني. والجديد صفر تقريبًا حتى على ٣٠ ألف حرف.

**اللي بيتغيّر:** الأرقام بالـ ms بتختلف حسب جهازك وحمله، بس **النسبة** (×٤ كل حرفين) هي اللي ثابتة، وهي اللي بتخلي input طوله ٤٠ حرف يوقّف سيرفر Node بالكامل.

**الغلطة الشائعة:** تجرّب الـ regex على نصوص بتتطابق بس. الـ ReDoS بيظهر في النص اللي **قرب** يتطابق ووقع في الآخر، زي [["aaaa...!"]].`  },
          ],
          flag: "script",
          deep: {
            why: "أشهر outage بسبب regex: Cloudflare في يوليو 2019، سطر regex واحد في قواعد الـ WAF خلّى الـ CPU ١٠٠٪ على كل السيرفرات حوالي نص ساعة. و Stack Overflow وقع سنة 2016 بسبب regex بيشيل المسافات من آخر السطر. وفي Node الموضوع أخطر: الـ event loop واحد، فـ regex بطيء = السيرفر مبيردش على حد (قسم الـ event loop).",
            how: R`الـ engine في JS (زي أغلب اللغات) backtracking: لو فشل بيرجع يجرّب طريقة تقسيم تانية. [[(a+)+]] على [["aaaa...!"]]: الـ a's ممكن تتقسم بين الـ [[+]] الداخلي والخارجي بعدد طرق بيتضاعف مع كل حرف (2^n تقريبًا)، وكلهم هيفشلوا عند [[!]]، والـ engine لازم يجرّبهم كلهم قبل ما يقول false. عشان كده الوقت بيتضاعف مع كل حرف زيادة، و [[/^a+$/]] اللي بتقبل نفس النصوص بالظبط بتخلص في أقل من ملّي ثانية.

العلامات الخطر: quantifier جوه group عليه quantifier ([[(x+)+]] و [[(x*)*]] و [[(x+)*]])، أو بدائل بتتداخل ([[(a|a)+]] و [[(\w|\d)+]])، وبعدهم حاجة ممكن تفشل.

الحماية: حدّد طول الـ input قبل الـ regex (إيميل أقصاه 254 حرف)، واكتب patterns من غير تداخل، وفيه ESLint plugin اسمه [[eslint-plugin-regexp]] بيكشف الـ backtracking الخطر، ولو الـ pattern نفسه جاي من يوزر (بحث متقدم) استخدم مكتبة [[re2]] (engine وقته خطي، مفيهوش backtracking بس كمان مفيهوش back-references ولا lookaround).

الإيميل: الـ regex في المثال عملي: مفيش مسافات، و [[@]] واحدة، ونقطة في الدومين. [["sara@localhost"]] قانوني تقنيًا بس مش مفيد لموقع. والتأكيد الحقيقي لينك في إيميل.`,
            when: R`regex: أشكال قصيرة ومسطحة (أرقام، أكواد، slugs، سطور logs ليها شكل ثابت). parser: أي حاجة فيها تداخل أو quoting أو escaping. مكتبة validation (Zod): إيميلات و URLs و UUIDs، لأنهم كتبوا الـ patterns وجرّبوها.`,
            mistakes: R`regex إيميل من Stack Overflow طوله ٤٠٠ حرف ومحدش فاهمه. و HTML بـ regex (sanitize بالذات: استخدم DOMPurify، تاب الأمان). و [[new RegExp(req.query.q)]] على السيرفر (ReDoS و injection). ومفيش حد للطول. وفي الانترفيو: «إيه هو ReDoS وإزاي تحمي منه؟» الإجابة: backtracking بيتضاعف مع nested quantifiers، والحل patterns من غير تداخل + حد للطول + re2 للـ patterns اللي من برّه.`
          },
          teach: R`## المثال بيعمل إيه

٣ تجارب: regex «شكله بريء» بيبطّأ بشكل مرعب مع كل حرف زيادة (ReDoS)، وفحص إيميل عملي، و URL بـ parser بدل regex. الناتج من Node 24 على Windows، والأوقات بتختلف من جهاز لجهاز.

---

## ١. الـ regex الخطر والآمن

~~~text app.js
const evil = /^(a+)+$/;
const fixed = /^a+$/;
~~~

- [[evil]]: [[a+]] (a مرة أو أكتر) جوه group، والـ group نفسه عليه [[+]]. ده اسمه **nested quantifier**: quantifier جوه quantifier.
- [[fixed]]: a مرة أو أكتر، من الأول للآخر.

الاتنين بيقبلوا **نفس النصوص بالظبط** (a أو أكتر وبس). الفرق في طريقة البحث.

---

## ٢. القياس

~~~text app.js
for (const n of [20, 24, 26]) {
  const input = "a".repeat(n) + "!";
  const t0 = performance.now();
  evil.test(input);
  const t1 = performance.now();
  fixed.test(input);
  console.log(n, Math.round(t1 - t0) + "ms", (performance.now() - t1).toFixed(3) + "ms");
}
~~~

- [[for (const n of [20, 24, 26])]]: نجرّب ٣ أطوال.
- [["a".repeat(n) + "!"]]: n حرف a وفي الآخر [[!]]. الـ [[!]] هي اللي بتخلي الـ match **يفشل**، وده المهم: الـ regex بيتعب لما بيفشل، مش لما بينجح.
- [[performance.now()]]: الوقت بالـ ms بكسور (أدق من [[Date.now()]]). نقيس قبل وبعد كل test.
- [[Math.round(t1 - t0)]]: وقت الخطر مقرّب. و [[.toFixed(3)]]: وقت الآمن بـ ٣ أرقام بعد العلامة، لأنه صغير جدًا.

~~~text الناتج (مرة من التشغيلات)
20 57ms 0.038ms
24 100ms 0.067ms
26 417ms 0.013ms
~~~

وجرّبنا أطوال أكتر في تشغيل لوحده:

~~~text الناتج
20 58ms
22 25ms
24 97ms
26 407ms
28 1593ms
~~~

(أول قياس دايمًا أبطأ من المتوقع، لأن V8 بيجهّز الـ regex أول مرة.) من 22 لـ 28: كل **حرفين** زيادة الوقت تقريبًا **×4**، يعني كل حرف ×2. والآمن فضل أقل من عُشر ملّي ثانية.

### ليه بيحصل كده؟

الـ engine في JavaScript بيشتغل بـ **backtracking**: لو طريقة فشلت، يرجع يجرّب طريقة تانية. وفي [[(a+)+]] الـ a's ممكن تتقسم بين الـ [[+]] اللي جوه والـ [[+]] اللي برّه بطرق كتير جدًا. مثلًا [["aaa"]] ممكن تبقى:

~~~text طرق تقسيم aaa بين المجموعات
(aaa)
(aa)(a)
(a)(aa)
(a)(a)(a)
~~~

٤ طرق لـ ٣ حروف، وكل حرف زيادة بيضاعفهم (2 أس n−1). ولما توصل لـ [[!]] وكل طريقة تفشل، الـ engine لازم يجرّبهم **كلهم** قبل ما يقول false. و [[/^a+$/]] مفيهاش غير طريقة واحدة، فتفشل على طول.

### ليه ده خطر على سيرفر؟

Node بيشغّل JavaScript على **thread واحد** (قسم الـ event loop الجاي). وطول ما الـ regex شغال، مفيش ولا request تاني بيترد. فاليوزر اللي يبعت ٣٠ حرف مختارين صح ممكن يوقّف السيرفر ثواني أو دقايق. ده اسمه **ReDoS**: Regular expression Denial of Service.

---

## ٣. فحص إيميل عملي

~~~text app.js
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(email.test("sara@example.com"), email.test("sara@localhost"), email.test("a b@x.com"));
~~~

| الحتة | معناها |
|---|---|
| [[[^\s@]+]] | حرف أو أكتر، أي حاجة **غير** مسافة و [[@]] ([[^]] في أول الـ class = «غير») |
| [[@]] | @ واحدة |
| [[[^\s@]+]] | اسم الدومين |
| [[\.]] | نقطة حرفية ([[.]] لوحدها = أي حرف) |
| [[[^\s@]+$]] | الامتداد لحد الآخر |

~~~text الناتج
true false false
~~~

[["sara@localhost"]] مفيهاش نقطة، و [["a b@x.com"]] فيها مسافة. والـ regex ده مش «كامل»، ومش محتاج يبقى: الفحص الحقيقي إنك تبعت إيميل تأكيد.

---

## ٤. URL بـ parser

~~~text app.js
console.log(new URL("https://shop.example/p?id=7&ref=fb").searchParams.get("id"));
~~~

- [[new URL(نص)]]: بيفك اللينك لأجزاء (البروتوكول، الدومين، الـ path، الـ query) بنفس قواعد المتصفح.
- [[.searchParams]]: الجزء اللي بعد [[?]] كـ object، و [[.get("id")]] بيجيب قيمة واحدة.

~~~text الناتج
7
~~~

لاحظ إنها نص [["7"]] مش رقم.

---

## ٥. اللينكات من HTML: regex ضد DOMParser

ده من الـ «جرّب»، واتشغّل في Chrome (headless). على HTML بسيط الاتنين جابوا [[["/a", "/b"]]]. وبعدين جرّبنا HTML فيه ٣ حاجات عادية جدًا: [[>]] جوه قيمة attribute، و href بـ single quotes، ولينك قديم جوه comment، ومسافات حوالين [[=]]:

~~~text HTML التجربة
<p><a title="1 > 0" href='/a'>ده</a> <!-- <a href="/old"> --> <a href = "/b">ده</a></p>
~~~

~~~text app.js
const rx = (h) => [...h.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
const dp = (h) => [...new DOMParser().parseFromString(h, "text/html").querySelectorAll("a")].map((a) => a.getAttribute("href"));
~~~

~~~text الناتج
rx: ["/old"]
dp: ["/a","/b"]
~~~

الـ regex جاب اللينك الوحيد **الغلط** (اللي جوه الـ comment) وفوّت الاتنين الصح. و [[DOMParser]] بيقرا الـ HTML بنفس الـ parser اللي المتصفح بيعرض بيه الصفحة، فجاب الصح.

---

## الخلاصة

| الحالة | الأداة |
|---|---|
| شكل قصير ومسطح (رقم، كود، slug) | regex |
| HTML | [[DOMParser]] (وللـ sanitize: DOMPurify) |
| URL | [[new URL()]] و [[URLSearchParams]] |
| JSON | [[JSON.parse]] |
| إيميل | فحص بسيط + رسالة تأكيد (أو [[z.email()]]) |

وعلامة الخطر في أي regex: quantifier جوه group عليه quantifier ([[(x+)+]] و [[(x*)*]])، وبعده حاجة ممكن تفشل.`,
          lines: [
            R`nested quantifier: [[+]] جوه group عليه [[+]] تاني. لو النص طويل وفي آخره حاجة تبوّظ الـ match، المحرك بيجرّب كل الطرق الممكنة لتقسيم الـ a's بين الاتنين قبل ما يقول «لأ»، وعددها بيتضاعف مع كل حرف (catastrophic backtracking، وده اللي بيعمل ReDoS).`,
            R`بيقبل ويرفض نفس النصوص بالظبط زي [[evil]]، بس مفيش غير طريقة واحدة يطابق بيها، فلو فشل بيفشل بسرعة. الحل المعتاد: شيل التكرار المتداخل.`,
            R`بنجرّب 3 أطوال قريبة من بعض، عشان نشوف الوقت بيزيد إزاي مع كل حرف زيادة.`,
            R`[[n]] حرف [[a]] وفي الآخر [[!]]. الـ [[!]] هي اللي بتخلي [[$]] تفشل، فالمحرك يرجع يجرّب كل التقسيمات. من غيرها الاتنين كانوا هيطابقوا فورًا.`,
            R`[[performance.now()]] بترجّع الوقت بالملي ثانية بكسور، أدق من [[Date.now()]] لقياس حاجة سريعة.`,
            R`هنا الوقت كله بيروح: الـ regex الخطر بيفشل في الآخر، بس بعد ما يجرّب عدد ضخم من الاحتمالات. وطول ما هو شغال الـ main thread واقف، فلو ده سيرفر Node كل الطلبات التانية بتستنى.`,
            R`نقطة نهاية قياس الخطر وبداية قياس الآمن.`,
            R`نفس النص على الـ regex الآمن: بيفشل في خطوات قد عدد الحروف تقريبًا.`,
            R`بيطبع الطول ووقت كل واحد. عندي: [[20 46ms]] و [[24 119ms]] و [[26 461ms]] للخطر، والآمن [[0.0x ms]] كل مرة. الوقت بيتضاعف تقريبًا مع كل حرف زيادة (28 حرف أخدت أكتر من ثانية)، فـ input طويل شوية من يوزر ممكن يوقف السيرفر.`,
            R`نهاية الـ loop.`,
            R`فحص إيميل عملي: حاجة من غير مسافة ولا [[@]]، وبعدها [[@]]، وبعدها domain فيه نقطة. مش بيغطي كل الإيميلات الصحيحة نظريًا ومش محتاج: الطريقة الوحيدة تتأكد إن الإيميل حقيقي إنك تبعتله رسالة تأكيد.`,
            R`[[sara@example.com]] بترجّع [[true]]، و [[sara@localhost]] بترجّع [[false]] لأن الـ domain مفيهوش نقطة، و [[a b@x.com]] بترجّع [[false]] بسبب المسافة.`,
            R`بدل regex لـ URL، [[new URL]] بيفهم الـ URL كله (حتى الـ encoding والـ [[&]]) و [[searchParams.get("id")]] بترجّع [["7"]]. لأي format معروف (URL و JSON و HTML و CSV) استخدم الـ parser بتاعه، الـ regex بيقع في الحالات الغريبة.`,
          ],
          sol: R`الأرقام بتختلف حسب جهازك، بس الشكل ثابت: كل حرف زيادة الوقت تقريبًا بيتضاعف (من 24 لـ 26 حوالي ٤ أضعاف). يعني 30 حوالي ٨ ثواني، و 40 ساعات. وطول الوقت ده الـ process واقف: لو ده سيرفر Node، ولا request تاني بيترد. والـ regex الآمن ثابت تقريبًا في كل الأطوال.

اللينكات بـ regex: [[/href="([^"]+)"/g]] بيشتغل على المثال ده، بس بيبوظ لو الـ attribute بـ single quotes، أو فيه مسافة حوالين [[=]]، أو اللينك جوه comment، أو [[href]] مكتوب في نص عادي. و DOMParser: [[[...new DOMParser().parseFromString(html, "text/html").querySelectorAll("a")].map((a) => a.getAttribute("href"))]] بيرجّع [[["/a", "/b"]]] مهما كان شكل الـ HTML، لأنه نفس الـ parser اللي المتصفح بيعرض بيه الصفحة.`
        }
      ]
    }
]);

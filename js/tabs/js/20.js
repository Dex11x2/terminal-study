// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "APIs المتصفح",
      l: 3,
      n: "IntersectionObserver و ResizeObserver و MutationObserver، ورفع الملفات بمعاينة و progress، ودورة حياة الصفحة و bfcache، و pushState، والإشعارات و Permissions API",
      projects: [
        { lvl: 'صغير', t: R`زرار «ارجع لفوق» من غير scroll listener`, what: R`div صغير في أول الصفحة عليه [[IntersectionObserver]] (درس ١): لما يخرج من الشاشة يظهر زرار «لفوق» ثابت في الركن، ولما يرجع يختفي. والزرار بيعمل [[scrollTo({ top: 0, behavior: "smooth" })]].`, done: R`الزرار مش ظاهر وانت في أول الصفحة، بيظهر بعد ما تنزل شوية ويختفي لما ترجع، ومفيش ولا [[addEventListener("scroll")]] في الكود، و Performance في DevTools مفيهوش شغل JS مستمر وانت بتعمل scroll.` },
        { lvl: 'صغير', t: R`اختيار صورة البروفايل`, what: R`[[<input type="file" accept="image/*">]] لصورة واحدة (درس ٣): معاينة في دايرة بـ [[URL.createObjectURL]]، ورفض أي ملف أكبر من 1MB أو مش صورة فعلًا (أول bytes بتوعه مش PNG ولا JPEG)، و [[revokeObjectURL]] للقديمة كل ما تختار جديدة.`, done: R`صورة PNG أو JPEG بتظهر في الدايرة، وملف [[.txt]] اتغيّر اسمه لـ [[.png]] بيترفض برسالة مع إن [[file.type]] بتاعه [[image/png]]، والملف الكبير بيترفض ومعاه حجمه بالـ MB، واختيار ٥ صور ورا بعض بيسيب blob URL واحد بس شغال.` },
        { lvl: 'متوسط', t: R`رافع صور كامل`, what: R`منطقة سحب وإفلات (درس ٤) وجواها [[<label>]] و [[<input type="file" multiple>]] للي مش بيستخدم ماوس (درس ٣)، ومعاينة لكل صورة ومعاها حجمها ومقاسها، وفحص النوع والحجم قبل أي رفع، وشريط تقدم وزرار إلغاء لكل ملف لوحده بـ [[XMLHttpRequest]]، على سيرفر Express فيه multer على localhost.`, done: R`تسحب ٤ صور منهم واحدة كبيرة: ٣ بيترفعوا كل واحد بشريطه والكبيرة بتترفض قبل ما تتبعت (مفيش request ليها في Network)، والإلغاء بيوقّف ملف واحد بس والباقي يكمّل، و Tab ثم Enter بيفتح اختيار الملفات من غير ماوس، والشكل مبيرعشش وانت بتسحب فوق الصور اللي جوه المنطقة.` },
        { lvl: 'متوسط', t: R`SPA صغير بيفتكر مكانك`, what: R`راوتر بـ [[pushState]] و [[popstate]] (درس ٦) لـ ٣ صفحات، وصفحة «اكتب رسالة» بتحفظ المسودة في [[localStorage]] على [[visibilitychange]] (درس ٥)، والأقسام بتظهر بـ reveal بـ IntersectionObserver (درس ١)، والبحث في [[?q=]] بـ [[replaceState]].`, done: R`back و forward بيرجّعوا الصفحة الصح من غير reload (Network مفيهوش طلب document جديد)، والمسودة بترجع بعد ما تقفل التاب وتفتحه، و refresh على [[/contact?q=x]] بيفتح نفس الصفحة ونفس البحث، و Ctrl+Click على أي لينك بيفتح تاب جديد زي أي موقع.` },
        { lvl: 'كبير', t: R`feed لانهائي متين`, what: R`feed من [[jsonplaceholder.typicode.com]] أو API على localhost بـ IntersectionObserver (درس ١)، والكروت بتتقسم أعمدة حسب عرض الـ container بـ ResizeObserver (درس ٢)، ورقم الصفحة في الـ URL بـ [[replaceState]] (درس ٦)، و [[pageshow]] بيحدّث لو رجعت من bfcache (درس ٥). ومن الوحدات اللي فاتت: [[AbortController]] و timeout على كل fetch، و debounce على الـ resize، ورسالة خطأ فيها زرار «حاول تاني».`, done: R`مفيش صفحة بتتطلب مرتين حتى لو نزلت بسرعة جدًا (Network يأكد)، وفي آخر الداتا بتظهر «خلصت» والـ observer بيقف، ولو قطعت النت من DevTools بتظهر رسالة الخطأ والزرار بيكمّل من نفس الصفحة، و refresh بيرجّعك لنفس رقم الصفحة، وعدد الأعمدة بيتغير لما تصغّر الـ sidebar مش الشاشة بس، و Test back/forward cache بيقول الصفحة اترجعت من الـ cache.`, ext: R`زوّد virtual scrolling لما الكروت تعدّي ١٠٠٠ عشان الـ DOM ميتقلش، وبحث بـ [[?q=]]، وحوّله لـ component تستخدمه في مشروع حقيقي.` },
        { lvl: 'فكرة', t: R`سلوك بتحبه في موقع تاني`, what: R`اختار حاجة بتعجبك في موقع بتستخدمه: الفيديو اللي بيقف لما تسيب التاب، أو الفهرس اللي بيعلّم القسم اللي انت فيه، أو الصورة اللي بتتحمّل وانت قربت منها، أو اللينك اللي بيتغيّر وانت بتفلتر. ابنيها بـ APIs الوحدة دي من غير مكتبات.`, done: R`السلوك شغال في صفحة لوحدها، ومكتوب جنبه الـ API اللي استخدمته، ومفيش listener بيفضل شغال بعد ما العنصر يتشال (اتأكد إن فيه [[disconnect]] أو [[unobserve]] أو [[removeEventListener]] في مكانه).`, ext: R`حوّله لدالة أو component بتاخد options، وحطه في مشروع بتاعك، وقيس الفرق بـ Lighthouse قبل وبعد.` },
      ],
      items: [
        {
          cmd: "IntersectionObserver",
          title: "تعرف إن عنصر ظهر على الشاشة إزاي؟ (infinite scroll و reveal)",
          desc: R`[[IntersectionObserver]] بيقولك لما عنصر يدخل أو يخرج من الشاشة (أو من عنصر أب بيعمل scroll)، من غير ما تسمع لـ [[scroll]] وتحسب المقاسات بنفسك. بتعمله مرة بـ callback وخيارات، وبعدين [[observe(el)]] لأي عدد عناصر.

أشهر استخدامين: infinite scroll (عنصر فاضي في آخر الليستة اسمه sentinel، أول ما يقرّب من الشاشة حمّل الصفحة الجاية)، وأنيميشن عند الظهور (ضيف كلاس لما الكارت يظهر، وبطّل تراقبه). و [[rootMargin: "300px"]] بيوسّع منطقة الشاشة ٣٠٠ بكسل، فالتحميل يبدأ قبل ما اليوزر يوصل للآخر. و [[threshold: 0.2]] يعني «لما ٢٠٪ من العنصر يظهر».`,
          example: R`const feed = document.querySelector("#feed");
const sentinel = document.querySelector("#sentinel");
let page = 1, loading = false, done = false;
async function loadMore() {
  if (loading || done) return;
  loading = true;
  try {
    const res = await fetch($__bt/api/posts?page=$__{page}$__bt);
    const posts = await res.json();
    if (posts.length === 0) done = true;
    for (const p of posts) {
      const li = document.createElement("li");
      li.textContent = p.title;
      feed.append(li);
    }
    page++;
  } finally {
    loading = false;
  }
  if (!done) { io.unobserve(sentinel); io.observe(sentinel); }
}
const io = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: "300px" });
io.observe(sentinel);
const reveal = new IntersectionObserver((entries, obs) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("visible");
    obs.unobserve(e.target);
  }
}, { threshold: 0.2 });
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));`,
          try: R`اعمل صفحة فيها [[<ul id="feed">]] وبعدها [[<div id="sentinel">]]، واستبدل الـ fetch بـ [[https://jsonplaceholder.typicode.com/posts?_page=$__{page}&_limit=5]]. افتح Network وانزل: الطلبات بتحصل إمتى؟ وبعدين شيل سطر [[unobserve/observe]] وخلي الـ limit 2 على شاشة كبيرة: التحميل بيكمّل لوحده ولا بيقف؟`,
          practice: [
            { lvl: 'سريع', t: R`ابني سكشن «أرقامنا» فيه ٣ أرقام ([[data-to="1200"]] مثلًا) تحت أول شاشة: الأرقام بتعدّ من 0 لحد [[data-to]] في ثانية واحدة أول ما السكشن يظهر بـ [[threshold: 0.5]]، وبعدين [[unobserve]].`, done: R`الأرقام بتفضل 0 لحد ما تنزل للسكشن، وبتعدّ مرة واحدة بس وتقف على الرقم بالظبط (مش 1199 ولا 1201) مهما طلعت ونزلت، وفتح الصفحة على السكشن على طول بيعدّ برضه.` },
            { lvl: 'تطبيق', t: R`refactor: صفحة منتجات فيها [[cards.forEach((el) => new IntersectionObserver(cb).observe(el))]] لـ ١٠٠ كارت وبتحمّل صورة كل كارت لما يظهر. خليها observer واحد لكل الكروت، مع [[unobserve]] بعد التحميل و [[rootMargin: "200px"]]، من غير ما السلوك يتغير.`, done: R`عدد الـ observers بقى 1 بدل 100 (عدّهم بمتغير)، وكل صورة لسه بتتطلب مرة واحدة لما تقرّب منها (Network يأكد)، والكارت اللي اتحمّل مبيتناداش تاني لو طلعت ونزلت، وتقدر تقول ليه observer واحد أرخص.` },
            { lvl: 'تحدي', t: R`ابني فهرس جانبي (scroll spy) لمقالة: لينك لكل [[<section>]]، واللينك بتاع القسم اللي في نص الشاشة عليه [[class="active"]] بـ [[rootMargin: "-50% 0px -50% 0px"]]، والـ URL بيتحدّث بـ [[#id]] القسم بـ [[replaceState]] (درس pushState).`, done: R`اللينك النشط بيتغير لما القسم يعدّي نص الشاشة، وفي أي لحظة لينك واحد بس عليه [[active]] (حتى في آخر الصفحة)، و refresh على [[#section-3]] بيفتح عنده واللينك بتاعه نشط، ومفيش [[getBoundingClientRect]] ولا scroll listener في الكود.` },
          ],
          flag: "script",
          deep: {
            why: "الطريقة القديمة: [[scroll]] listener بيشتغل عشرات المرات في الثانية، وجواه [[getBoundingClientRect()]] لكل عنصر، وده بيجبر المتصفح يحسب الـ layout كل مرة (layout thrashing، تاب HTML و CSS) فالـ scroll يقطّع على الموبايل. IntersectionObserver بيعمل الحساب ده جوه المتصفح بكفاءة ويناديك بس لما الحالة تتغير.",
            how: R`الـ callback بيتنادى مرة أول ما تعمل observe (بالحالة الحالية)، وبعدين كل ما العنصر يعدّي threshold دخول أو خروج. كل entry فيه [[isIntersecting]] و [[intersectionRatio]] (نسبة الظاهر) و [[target]] و [[boundingClientRect]]. الـ callback بيشتغل async بعد الـ frame، مش أثناء الـ scroll.

الفخ الشهير: لو الصفحة الأولى قصيرة والـ sentinel لسه ظاهر بعد التحميل، مفيش «تغيير» في الحالة (كان ظاهر وفضل ظاهر)، فالـ callback مش هيتنادى تاني والتحميل يقف. [[unobserve]] ثم [[observe]] بيجبره يبعت entry جديد بالحالة الحالية، فلو لسه ظاهر يحمّل الصفحة اللي بعدها.

و [[loading]] بيمنع طلبين مع بعض (الـ callback ممكن يتنادى تاني قبل ما الأول يخلص)، و [[done]] بيوقف لما السيرفر يرجّع ليستة فاضية. و [[finally]] بيضمن إن loading يرجع false حتى لو الطلب فشل.

في الـ reveal: [[unobserve]] بعد أول ظهور عشان الأنيميشن يحصل مرة، ومنراقبش عناصر خلاص. وللصور مش محتاج JS أصلًا: [[<img loading="lazy">]] بيعمل lazy loading لوحده.`,
            when: R`infinite scroll، و lazy loading لحاجات تقيلة (فيديو، خرايط، iframes، charts)، وأنيميشن عند الظهور، وتحديد القسم الحالي في جدول المحتويات، و analytics «الإعلان اتشاف». وفي React فيه hooks جاهزة زي [[react-intersection-observer]]، أو [[useEffect]] + ref (تاب React).`,
            mistakes: R`تنسى الفخ ده فالتحميل يقف على الشاشات الكبيرة. ومفيش حماية من التحميل المزدوج. وتنسى [[disconnect()]] لما الـ component يتشال (memory leak، درس memory leaks). و [[threshold: 1]] على عنصر أطول من الشاشة: عمره ما هيبقى ظاهر ١٠٠٪. وفي infinite scroll: الفوتر بقى مستحيل توصله، وزرار back بيرجّعك لأول الليستة؛ فكّر في زرار «حمّل أكتر» أو احفظ الصفحة في الـ URL.`
          },
          teach: R`## الفكرة في سطر

بدل ما تسأل المتصفح كل شوية «العنصر ده ظهر؟»، بتقوله مرة: «لما يظهر، ناديني». المثال فيه استخدامين: تحميل صفحة بوستات جديدة لما عنصر فاضي في آخر الليستة يقرّب، وإضافة كلاس لكروت أول ما تظهر.

جرّبت الكود ده في Chrome headless (عن طريق playwright-core) على صفحة فيها [[<ul id="feed">]] وبعدها [[<div id="sentinel">]]، وسيرفر Node صغير على localhost بيرد على [[/api/posts?page=N]] بـ 12 بوست متقسمين صفحات، والشاشة 1280×900. كل سطر [[li]] طوله 60px.

---

## ١. التجهيز

~~~text app.js
const feed = document.querySelector("#feed");
const sentinel = document.querySelector("#sentinel");
let page = 1, loading = false, done = false;
~~~

- [[document.querySelector("#feed")]]: هات أول عنصر الـ id بتاعه feed ([[#]] في CSS معناها id).
- [[sentinel]] يعني «الحارس»: div فاضي تحت الليستة. مش بيعرض حاجة، وظيفته الوحيدة إنه لما يقرّب من الشاشة يبقى اليوزر وصل للآخر.
- ٣ متغيرات في سطر واحد: [[page]] رقم الصفحة الجاية، و [[loading]] «فيه طلب شغال دلوقتي؟»، و [[done]] «السيرفر خلّص البوستات؟».

---

## ٢. [[loadMore]]: حمّل صفحة

~~~text app.js
async function loadMore() {
  if (loading || done) return;
  loading = true;
  try {
    const res = await fetch($__bt/api/posts?page=$__{page}$__bt);
    const posts = await res.json();
    if (posts.length === 0) done = true;
    for (const p of posts) {
      const li = document.createElement("li");
      li.textContent = p.title;
      feed.append(li);
    }
    page++;
  } finally {
    loading = false;
  }
  if (!done) { io.unobserve(sentinel); io.observe(sentinel); }
}
~~~

1. [[if (loading || done) return]]: لو فيه طلب شغال **أو** خلصنا، اخرج. الـ [[||]] يعني «أو».
2. [[loading = true]]: اقفل الباب قبل أي [[await]]، عشان أي نداء تاني ييجي وإحنا مستنيين يخرج من السطر اللي فوق.
3. [[fetch($__bt/api/posts?page=$__{page}$__bt)]]: اطلب الصفحة. الـ template literal بيحط رقم الصفحة في الـ URL، و [[await]] بتستنى الرد.
4. [[res.json()]]: حوّل الرد لـ array (وهي كمان بتتستنى).
5. [[posts.length === 0]]: السيرفر رجّع ليستة فاضية، يبقى مفيش أكتر.
6. الـ loop: لكل بوست اعمل [[<li>]] جديد بـ [[createElement]]، وحط العنوان بـ [[textContent]] (نص عادي، فلو العنوان فيه HTML مش هيتنفّذ)، وضيفه في آخر الليستة بـ [[append]].
7. [[page++]]: المرة الجاية اطلب اللي بعدها.
8. [[try { ... } finally { ... }]]: الـ [[finally]] بيتنفّذ **دايمًا**، سواء الطلب نجح أو رمى error. فـ [[loading]] بيرجع false حتى لو النت وقع، وإلا التحميل كان هيتقفل للأبد.
9. آخر سطر هو أهم سطر، وهنشرحه بعد ما نفهم الـ observer.

---

## ٣. الـ observer نفسه

~~~text app.js
const io = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
}, { rootMargin: "300px" });
io.observe(sentinel);
~~~

- [[new IntersectionObserver(callback, options)]]: بتعمل مراقب. intersection يعني «تقاطع»: هل العنصر متقاطع مع منطقة الشاشة؟
- [[entries]]: array، كل عنصر فيها (entry) بيوصف عنصر واحد اتغيرت حالته. إحنا بنراقب الـ sentinel بس، فـ [[entries[0]]] هو هو.
- [[isIntersecting]]: [[true]] لو العنصر جوه المنطقة دلوقتي.
- [[rootMargin: "300px"]]: كبّر المنطقة 300px من كل ناحية، فالـ sentinel يتحسب «ظاهر» وهو لسه تحت الشاشة بـ 300px. فالتحميل يبدأ قبل ما اليوزر يوصل.
- [[io.observe(sentinel)]]: ابدأ راقب. وأول ما تعمل observe، الـ callback بيتنادى **مرة فورًا** بالحالة الحالية.

### اللي حصل لما شغّلته (5 بوستات في الصفحة)

حطيت [[console.log]] جوه الـ callback:

~~~text الناتج (السيرفر والـ Console بالترتيب)
GET /api/posts?page=1
IO callback: isIntersecting = true
GET /api/posts?page=2
IO callback: isIntersecting = true
GET /api/posts?page=3
IO callback: isIntersecting = true
IO callback: isIntersecting = true
GET /api/posts?page=4
li count after load: 12
~~~

- الصفحات 1 و 2 و 3 جابوا 5 و 5 و 2 (الـ 12 كلهم)، و 12 × 60px = 720px، يعني الليستة كلها لسه أقصر من الشاشة، والـ sentinel فضل ظاهر، فالتحميل كمّل لوحده.
- الصفحة 4 رجعت [[[]]] فـ [[done = true]] ووقف.
- فيه callback اتنادى من غير طلب: وصل والطلب اللي قبله لسه شغال، فـ [[loading]] خرّجه من أول سطر. ده بالظبط ليه الحماية دي موجودة.

---

## ٤. الفخ: [[unobserve]] ثم [[observe]]

الـ observer بيناديك لما الحالة **تتغير**: من برّه لجوه أو العكس. لو الـ sentinel كان ظاهر، واتحمّلت صفحة، وفضل ظاهر، فمفيش تغيير، فمفيش نداء، والتحميل بيقف.

السطر [[io.unobserve(sentinel); io.observe(sentinel);]] بيشيل المراقبة ويرجّعها، و [[observe]] جديدة بتبعت callback فورًا بالحالة الحالية، فلو لسه ظاهر يحمّل الصفحة اللي بعدها. والـ [[if (!done)]] عشان لو خلصنا منعملش كده على الفاضي.

جرّبت الفرق بصفحات من بوستين بس (2 × 60 = 120px، يعني الشاشة فاضية تقريبًا):

| | من غير السطر | مع السطر |
|---|---|---|
| الطلبات | صفحة 1 بس | من 1 لحد 7 (الـ 7 رجعت [[[]]]) |
| عدد الـ [[li]] | 2 | 12 |
| الشاشة | فاضية والتحميل واقف | اتملت لحد ما الداتا خلصت |

من غير السطر، الـ callback اتنادى مرة واحدة بـ [[true]] ومرجعش تاني غير لما عملت scroll ونزل بـ [[false]] (الـ sentinel خرج). يعني على شاشة لابتوب ممكن متلاحظش، وعلى شاشة كبيرة الليستة بتقف.

---

## ٥. الـ reveal: أنيميشن عند الظهور

~~~text app.js
const reveal = new IntersectionObserver((entries, obs) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add("visible");
    obs.unobserve(e.target);
  }
}, { threshold: 0.2 });
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
~~~

- observer واحد بيراقب **كل** العناصر اللي عليها كلاس [[reveal]]، فالـ entries ممكن يبقى فيها أكتر من واحد، عشان كده loop.
- [[obs]]: التاني في الـ callback هو الـ observer نفسه.
- [[continue]]: لو العنصر ده مش ظاهر، عدّي للي بعده.
- [[e.target]]: العنصر نفسه. [[classList.add("visible")]] بتضيفله كلاس، والـ CSS بيعمل الأنيميشن.
- [[obs.unobserve(e.target)]]: بطّل تراقبه، فالأنيميشن يحصل مرة واحدة.
- [[threshold: 0.2]]: نادي لما 20٪ من العنصر يبقى ظاهر.

جرّبته بكارتين: [[r1]] فوق الصفحة و [[r2]] تحت بـ 1500px:

~~~text الناتج
reveal callback: entries = 2 r1:true r2:false
r1: reveal visible | r2: reveal
(scroll لتحت)
reveal callback: entries = 1 r2:true
r2: reveal visible
~~~

أول نداء جه فيه الاتنين مع بعض (الحالة الأولى)، [[r1]] ظاهر فاخد الكلاس، و [[r2]] لأ. وبعد الـ scroll جه [[r2]] لوحده. و [[r1]] مجاش تاني لأننا شلناه من المراقبة.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[new IntersectionObserver(cb, opts)]] | مراقب واحد لأي عدد عناصر |
| [[observe(el)]] / [[unobserve(el)]] | ابدأ / وقّف مراقبة عنصر (و observe بتنادي فورًا) |
| [[entry.isIntersecting]] | العنصر في المنطقة دلوقتي؟ |
| [[entry.target]] | العنصر نفسه |
| [[rootMargin]] | كبّر المنطقة (ابدأ بدري) |
| [[threshold]] | نسبة الظهور المطلوبة (0 لـ 1) |

- الـ callback بيتنادى عند **تغيّر** الحالة بس، فلازم الحركة بتاعة unobserve/observe في infinite scroll.
- [[loading]] يمنع طلبين مع بعض، و [[finally]] يضمن إنه يرجع false.`,
          lines: [
            R`بنمسك الليستة ([[#feed]]) اللي البوستات هتتضاف فيها. بنجيبها مرة واحدة برّه الدالة بدل ما ندوّر عليها في الـ DOM مع كل تحميل.`,
            R`الـ sentinel: عنصر فاضي حاطينه بعد الليستة مباشرة. مش هنراقب الـ scroll نفسه (event بيتنادى مئات المرات)، هنراقب العنصر ده: لما يقرّب من الشاشة يبقى اليوزر قرّب من الآخر ونحمّل الجديد.`,
            R`تلات متغيرات حالة: [[page]] رقم الصفحة الجاية، و [[loading]] بتمنع طلبين في نفس الوقت (من غيرها ممكن نفس الصفحة تتجاب مرتين وتتكرر البوستات)، و [[done]] بتوقف التحميل لما السيرفر يقول مفيش أكتر.`,
            R`دالة التحميل. [[async]] عشان جواها [[await]] للـ [[fetch]]، والـ observer هو اللي بيناديها كل ما الـ sentinel يظهر.`,
            R`الحارس: لو فيه تحميل شغّال أو الداتا خلصت، اخرج من غير ما تعمل حاجة. من غيره، scroll سريع ممكن يبعت كذا طلب لنفس الصفحة.`,
            R`بنقفل الباب قبل أي [[await]]: من اللحظة دي أي نداء تاني لـ [[loadMore]] هيخرج من السطر اللي فوق لحد ما نفتحه تاني.`,
            R`[[try]] معاها [[finally]] (من غير catch) عشان [[loading]] يرجع [[false]] مهما حصل. لو الطلب فشل ومرجّعناهاش، التحميل هيفضل مقفول للأبد والليستة تقف.`,
            R`بنطلب الصفحة الحالية من الـ API، ورقمها داخل في الـ URL بالـ template literal. الـ [[await]] بيستنى الرد من غير ما يجمّد الصفحة.`,
            R`[[res.json()]] بتقرا الـ body وتحوّله من JSON لـ array of objects، وهي كمان Promise فمحتاجة [[await]]. ملحوظة: [[fetch]] مبيرميش error على 404 أو 500، فلو عايز تتعامل معاهم افحص [[res.ok]] الأول.`,
            R`لو السيرفر رجّع array فاضية يبقى خلصنا، فنعلّم [[done]] عشان منبعتش طلبات تانية على الفاضي.`,
            R`بنلف على البوستات اللي جت عشان نضيف كل واحد في الليستة.`,
            R`بنعمل [[<li>]] جديد لكل بوست. العنصر لسه في الذاكرة ومش ظاهر لحد ما نضيفه.`,
            R`بنحط العنوان بـ [[textContent]] مش [[innerHTML]]: لو العنوان جواه HTML أو script كاتبه يوزر هيظهر كنص عادي ومش هيتنفذ، فمفيش XSS.`,
            R`بنضيف الـ [[<li>]] في آخر الليستة فيظهر. ولأن الـ sentinel بعد الليستة، بيتزق لتحت مع كل بوست جديد.`,
            R`نهاية الـ [[for]] اللي بتضيف البوستات.`,
            R`نزوّد رقم الصفحة عشان المرة الجاية نطلب اللي بعدها. موجود جوه الـ [[try]] بعد النجاح، فلو الطلب فشل هنعيد نفس الصفحة المرة الجاية.`,
            R`[[finally]] بيتنفذ في كل الحالات: نجح الطلب، أو رمى error، أو حتى عمل [[return]].`,
            R`نفتح الباب تاني عشان التحميل الجاي يقدر يبدأ.`,
            R`نهاية الـ [[finally]].`,
            R`الفخ: الـ observer بيبلّغ لما الحالة **تتغير** بس (دخل أو خرج). لو البوستات الجديدة قليلة والـ sentinel لسه ظاهر، مفيش تغيير فمفيش نداء والتحميل يقف. [[unobserve]] وبعدها [[observe]] بيجبره يبلّغ بالحالة الحالية من جديد، فلو لسه ظاهر هيحمّل الصفحة اللي بعدها.`,
            R`نهاية [[loadMore]].`,
            R`بنعمل الـ observer وبنديله callback بيتنادى كل ما حالة عنصر متراقب تتغير. [[entries]] array فيها entry لكل عنصر اتغيّر، وهنا بنراقب عنصر واحد فبناخد الأول.`,
            R`[[isIntersecting]] بـ [[true]] لما الـ sentinel يدخل المنطقة المراقبة، فنحمّل. ولازم نفحصها لأن الـ callback بيتنادى برضه لما العنصر **يخرج**، ومن غير الفحص هتحمّل وهو بيختفي.`,
            R`[[rootMargin: "300px"]] بيكبّر منطقة المراقبة 300 بكسل حوالين الشاشة، فالتحميل يبدأ قبل ما اليوزر يوصل للآخر فعلًا ومش هيشوف فراغ وهو مستني. ونهاية الـ observer.`,
            R`نبدأ نراقب الـ sentinel. الـ observer بينادي الـ callback مرة فورًا بالحالة الحالية، فلو الـ sentinel ظاهر من الأول، أول صفحة هتتحمّل لوحدها من غير ما نناديها بإيدنا.`,
            R`observer تاني منفصل للأنيميشن: عناصر تظهر بحركة لما توصلها في الـ scroll. الـ callback بياخد [[obs]] كمان (الـ observer نفسه) عشان نقدر نوقف المراقبة من جوه.`,
            R`بنلف على كل الـ entries، لأن لو اليوزر عمل scroll سريع ممكن كذا عنصر يدخلوا مع بعض ويتبلّغوا في نفس النداء.`,
            R`العنصر ده خرج من الشاشة مش دخل، فـ [[continue]] تعدّيه للي بعده.`,
            R`نضيف كلاس [[visible]]، والـ CSS هو اللي عامل الحركة: [[.reveal]] مستخبي و [[.reveal.visible]] ظاهر بـ transition. الـ JS بيقول «إمتى» بس، والـ CSS بيقول «إزاي».`,
            R`بطّل تراقب العنصر ده بعد ما ظهر، فالأنيميشن يحصل مرة واحدة ومش بيتعاد كل ما تطلع وتنزل، وكمان بيوفّر شغل على المتصفح.`,
            R`نهاية الـ [[for]].`,
            R`[[threshold: 0.2]] معناها بلّغني لما 20٪ من العنصر يبقى ظاهر، مش أول بكسل. كده الحركة تبدأ والعنصر باين فعلًا. ونهاية الـ observer.`,
            R`بنجيب كل العناصر اللي عليها كلاس [[reveal]] ونراقبهم كلهم بنفس الـ observer. observer واحد لعناصر كتير أوفر من observer لكل عنصر.`,
          ],
          sol: R`الطلبات بتحصل قبل ما توصل للآخر بشوية (الـ 300px)، وكل طلب بيضيف ٥ عناصر. ولما [[_page]] يعدّي 20 (١٠٠ بوست ÷ ٥) السيرفر بيرجّع [[[]]] فـ [[done = true]] والطلبات تقف.

من غير سطر [[unobserve/observe]] وبـ limit 2 على شاشة كبيرة: بيحمّل الصفحة الأولى، والعنصرين مش مالين الشاشة، فالـ sentinel لسه ظاهر، وبيقف هنا. ولو عملت scroll بسيط لفوق ولتحت يحمّل تاني (لأن الحالة اتغيرت). ده بالظبط الـ bug اللي بيظهر على الشاشات الكبيرة بس ومحدش بيلاحظه على اللابتوب. مع السطر، بيحمّل لوحده لحد ما الشاشة تتملي.`
        },
        {
          cmd: "ResizeObserver",
          title: "مكوّن يتصرف حسب مقاسه هو، مش مقاس الشاشة",
          desc: R`[[ResizeObserver]] بيناديك لما عنصر يتغير مقاسه، مهما كان السبب: الشاشة اتغيرت، أو sidebar اتقفل، أو المحتوى زاد. [[window.resize]] بيعرف مقاس الشاشة بس، والكارت ممكن يكون في عمود ضيق على شاشة كبيرة.

الـ entry فيه [[contentBoxSize[0].inlineSize]] (العرض) و [[blockSize]] (الطول)، وفيه [[contentRect]] الأقدم بـ [[width]] و [[height]].

قبل ما تكتب JS: لو كل اللي عايزه تغيير شكل حسب عرض الأب، [[@container]] في CSS بيعمل ده من غير JS (درس «container queries» في تاب HTML و CSS). ResizeObserver للحاجات اللي CSS ميقدرش عليها: canvas، و charts، وحساب عدد عناصر، ومحرر نص.`,
          example: R`const card = document.querySelector(".card");
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentBoxSize[0].inlineSize;
    entry.target.dataset.size = width < 400 ? "s" : width < 700 ? "m" : "l";
  }
});
ro.observe(card);
// CSS لازم للـ canvas: canvas { display: block; width: 100%; height: 100%; } والأب ليه ارتفاع، وإلا هيكبر لوحده
const canvas = document.querySelector("canvas");
new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect;
  canvas.width = Math.round(width * devicePixelRatio);
  canvas.height = Math.round(height * devicePixelRatio);
  draw();
}).observe(canvas.parentElement);
function draw() {
  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
}`,
          try: R`حط الكارت جوه div عرضه [[resize: horizontal; overflow: auto]] عشان تقدر تسحبه بالماوس، واكتب CSS لـ [[.card[data-size="s"]]] يخلي الصورة فوق النص. اسحب وشوف الـ data-size بيتغير في Elements. وبعدين اعمل نفس الشكل بـ [[container-type: inline-size]] و [[@container (width < 400px)]] من غير JS. أنهي أسهل؟`,
          practice: [
            { lvl: 'سريع', t: R`ابني عنوان عمود في جدول بيكتب اسم اليوم كامل ([[Wednesday]]) لو عرضه 120px أو أكتر، ومختصر ([[Wed]]) لو أقل، بـ ResizeObserver على العنوان نفسه و [[Intl.DateTimeFormat]] بـ [[weekday: "long"]] و [["short"]].`, done: R`لما تضيّق العمود الأسماء بتتقلب مختصرة والعكس، ومفيش نص بيتقص بـ «...»، والتبديل بيحصل عند 120px من عرض العمود مش الشاشة (جرّب تضيّق العمود بس والشاشة كبيرة).` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب [[pickSize(width, breakpoints)]] من غير DOM: [[pickSize(399, { m: 400, l: 700 })]] بترجّع [["s"]]. وبعدين استخدمها جوه الـ callback بتاع الدرس بدل الـ ternary.`, done: R`400 بالظبط بترجّع [["m"]] و 700 بترجّع [["l"]]، والـ breakpoints لو اتبعتت بترتيب عكسي ([[{ l: 700, m: 400 }]]) بترجّع نفس النتيجة، و [[NaN]] أو رقم سالب بيرمي [[RangeError]]، و ٦ assertions بـ [[node:assert]] في Node بيعدّوا، والكارت في المتصفح لسه بيتصرف زي الأول.` },
            { lvl: 'تحدي', t: R`ابني navbar «priority+»: لينكات كتير في سطر واحد، واللي مش لاقي مكان يتنقل لقايمة «المزيد». راقب الـ nav نفسه مش اللينكات اللي بتنقلها، واسمع لـ [[window.addEventListener("error", (e) => console.log(e.message))]] عشان لو وقعت في loop تعرف.`, done: R`وانت بتضيّق الشاشة اللينكات بتتنقل لـ «المزيد» من الآخر للأول، ولما توسّع بترجع بنفس الترتيب، ومفيش لينك بيلف لسطر تاني، وزرار «المزيد» بيختفي لما كل اللينكات تكفي، والـ listener مطبعش أي رسالة فيها «ResizeObserver loop» (نصها الكامل: «ResizeObserver loop completed with undelivered notifications.»).` },
          ],
          flag: "script",
          deep: {
            why: "الـ components بقت بتتحط في أماكن مختلفة: نفس الكارت في grid بـ ٤ أعمدة وفي sidebar ضيق. الـ media queries بتسأل عن الشاشة، والسؤال الصح «أنا عرضي كام». و canvas بالذات لازم تعرف مقاسه بالبكسل الحقيقي وإلا الرسمة تبقى مغبشة.",
            how: R`المتصفح بيحسب المقاسات في الـ layout، وبعده (قبل الرسم) بيبعت للـ ResizeObservers التغييرات مرة في الـ frame. فمفيش حاجة زي resize event بيتنادى ١٠٠ مرة، ومش محتاج debounce غالبًا.

[[contentBoxSize]] array لأن عنصر ممكن يتقسم (multi-column)، وعادةً [[[0]]]. و [[inlineSize]] العرض في الكتابة الأفقية (عربي أو إنجليزي). و [[borderBoxSize]] لو عايز المقاس بالـ padding والـ border.

الـ canvas له مقاسين: الـ CSS (بيتحكم فيه الـ layout) والداخلي [[canvas.width]] (عدد البكسلات). لو الداخلي أقل، الرسمة بتتمط وتغبش. [[devicePixelRatio]] بـ 2 أو 3 على شاشات الموبايل، فبنضرب فيه. وتغيير [[canvas.width]] بيمسح الرسمة، فلازم [[draw()]] بعده.

لو غيّرت جوه الـ callback حاجة بتغيّر مقاس نفس العنصر، ممكن تدخل loop، والمتصفح بيوقفها ويطبع [[ResizeObserver loop completed with undelivered notifications]] في الـ console. غالبًا مش خطر بس معناه إن التصميم بيتذبذب.`,
            when: R`charts و canvas و محررات، و virtualized lists (تحسب كام صف يظهر)، و «اعرض ٣ tags والباقي +2». ولتغيير الشكل بس: container queries أولًا.`,
            mistakes: R`ResizeObserver لحاجة CSS يقدر عليها. وتنسى [[ro.disconnect()]] لما العنصر يتشال. وتغيّر مقاس العنصر المراقب جوه الـ callback (loop). و [[canvas.width = el.clientWidth]] من غير devicePixelRatio فالرسمة مغبشة على الموبايل. و canvas من غير [[width: 100%; height: 100%]] في الـ CSS: مقاسه على الشاشة بيبقى هو [[canvas.width]] نفسه، فالأب بيكبر، فالـ observer يكبّره تاني، وهكذا للأبد.`
          },
          teach: R`## الفكرة في سطر

بتقول للمتصفح «لما مقاس العنصر ده يتغير، ناديني بالمقاس الجديد». المثال فيه استخدامين: كارت بياخد [[data-size]] حسب عرضه هو، و canvas بيظبط عدد البكسلات بتاعته على مقاس أبوه.

جرّبت الكود في Chrome headless (عن طريق playwright-core) بشاشة [[deviceScaleFactor: 2]] (زي شاشات الموبايل والماك)، والكارت جوه [[.wrap]] غيّرت عرضه بالـ JS.

---

## ١. الكارت

~~~text app.js
const card = document.querySelector(".card");
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentBoxSize[0].inlineSize;
    entry.target.dataset.size = width < 400 ? "s" : width < 700 ? "m" : "l";
  }
});
ro.observe(card);
~~~

- [[new ResizeObserver(callback)]]: مراقب. مفيش options زي IntersectionObserver، بس callback.
- [[entries]]: array، entry لكل عنصر اتغير مقاسه في الـ frame ده. observer واحد ينفع تراقب بيه كروت كتير، عشان كده loop.
- [[entry.contentBoxSize]]: مقاس الـ **content** بس (من غير padding ولا border). وهي array لأن العنصر ممكن يتقسم على كذا عمود، وعادةً [[[0]]].
- [[.inlineSize]]: المقاس في اتجاه السطر، يعني العرض في العربي والإنجليزي. والطول اسمه [[blockSize]].
- [[entry.target]]: العنصر نفسه.
- [[dataset.size = ...]]: [[dataset]] بيكتب attributes اسمها [[data-*]]، فده بيحط [[data-size="s"]] على العنصر، والـ CSS يستخدمه: [[.card[data-size="s"] { ... }]].
- [[width < 400 ? "s" : width < 700 ? "m" : "l"]]: ternary جوه ternary: أقل من 400 ← s، غير كده أقل من 700 ← m، غير كده l.
- [[ro.observe(card)]]: ابدأ راقب، وأول مرة بيتنادى على طول بالمقاس الحالي.

### الناتج

الكارت فيه [[padding: 10px]] و [[border: 1px]]، وغيّرت عرض الأب 800 ثم 500 ثم 300 ثم 799:

~~~text الناتج
card 778 l
card 478 m
card 278 s
card 777 l
~~~

ليه 778 مش 800؟ لأن [[contentBoxSize]] من غير الـ padding (10 من كل ناحية) والـ border (1 من كل ناحية): 800 − 22 = 778. لو عايز المقاس بالـ padding والـ border استخدم [[borderBoxSize[0].inlineSize]] (طلعت 799 لما الأب كان 799). وفيه [[entry.contentRect.width]] الأقدم وبيدّي نفس رقم الـ content.

### مرة واحدة في الـ frame

غيّرت عرض الأب 50 مرة ورا بعض في نفس الكود: الـ callback اتنادى **مرة واحدة** بالمقاس الأخير. المتصفح بيجمّع التغييرات ويناديك بعد ما يحسب الـ layout وقبل ما يرسم، فمش محتاج debounce زي [[window.resize]].

---

## ٢. الـ canvas

~~~text app.js
const canvas = document.querySelector("canvas");
new ResizeObserver(([entry]) => {
  const { width, height } = entry.contentRect;
  canvas.width = Math.round(width * devicePixelRatio);
  canvas.height = Math.round(height * devicePixelRatio);
  draw();
}).observe(canvas.parentElement);
~~~

- [[([entry]) => ...]]: array destructuring في الـ parameter: خد أول عنصر من [[entries]] في متغير اسمه entry (بنراقب عنصر واحد).
- [[const { width, height } = entry.contentRect]]: object destructuring: خد الخاصيتين دول في متغيرين بنفس الاسم.
- [[canvas.parentElement]]: بنراقب **الأب** مش الـ canvas، لأن الأب هو اللي الـ layout بيحدد مقاسه.
- [[new ResizeObserver(...).observe(...)]]: عملنا المراقب ونادينا observe في نفس السطر من غير ما نحفظه في متغير (يعني مش هنقدر نعمله disconnect بعدين).

### ليه [[devicePixelRatio]]؟

الـ canvas ليه مقاسين:

| المقاس | بيتحدد بـ | معناه |
|---|---|---|
| على الشاشة | الـ CSS | قد إيه بياخد مكان في الصفحة (CSS pixels) |
| الداخلي | [[canvas.width]] و [[canvas.height]] | عدد البكسلات اللي بترسم فيها |

[[devicePixelRatio]] عدد بكسلات الشاشة الحقيقية في كل CSS pixel: 1 على شاشة عادية، و 2 أو 3 على الموبايل. لو الداخلي = مقاس الـ CSS بس، المتصفح بيمط الرسمة فتغبش. فبنضرب في الـ ratio، و [[Math.round]] عشان عدد البكسلات لازم رقم صحيح.

و [[draw()]] بعدها لأن أي تغيير في [[canvas.width]] بيمسح الرسمة كلها.

### الفخ اللي ظهر لما شغّلته

جرّبت الكود زي ما هو، والأب عرضه 300px ومن غير ارتفاع ثابت ومن غير أي CSS للـ canvas:

~~~text الناتج
canvas parent 300 x 154 → 600 x 308 css 600 x 308
canvas parent 300 x 312 → 600 x 624 css 600 x 624
canvas parent 300 x 628 → 600 x 1256 css 600 x 1256
window error: ResizeObserver loop completed with undelivered notifications.
...
~~~

canvas من غير CSS مقاسه على الشاشة **بيساوي** المقاس الداخلي. فلما خليناه 600×308، بقى 600×308 على الشاشة، فالأب طوله زاد، فالـ observer اتنادى تاني فضربنا في 2 تاني... والمتصفح بيوقف اللفة دي كل frame ويطبع [[ResizeObserver loop completed with undelivered notifications]]، بس الـ canvas بيفضل يكبر.

الحل في الـ CSS (عشان كده ضفته كتعليق في المثال):

~~~text style.css
canvas { display: block; width: 100%; height: 100%; }
.cw { width: 300px; height: 150px; }
~~~

وبعدها:

~~~text الناتج
canvas parent 300 x 150 → 600 x 300 css 300 x 150
~~~

على الشاشة 300×150، وجواه 600×300 بكسل: رسمة حادة، والـ callback اتنادى مرة واحدة بس. و [[display: block]] بتشيل المسافة الصغيرة اللي تحت أي عنصر inline.

---

## ٣. [[draw]]

~~~text app.js
function draw() {
  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);
}
~~~

- [[getContext("2d")]]: هات أداة الرسم ثنائية الأبعاد.
- [[fillRect(x, y, w, h)]]: ارسم مستطيل مليان يبدأ من الركن الشمال فوق [[(0, 0)]]، وعرضه وطوله نص الـ canvas، يعني ربعه.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[new ResizeObserver(cb)]] و [[observe(el)]] | ناديني لما مقاس el يتغير |
| [[contentBoxSize[0].inlineSize]] | العرض من غير padding و border |
| [[borderBoxSize[0].inlineSize]] | العرض بالـ padding و border |
| [[contentRect.width/height]] | الطريقة الأقدم لمقاس الـ content |
| [[devicePixelRatio]] | بكسلات الشاشة لكل CSS pixel |
| [[disconnect()]] | وقّف المراقبة كلها |

- بيتنادى مرة في الـ frame، فمش محتاج debounce.
- متغيّرش جوه الـ callback حاجة بتكبّر نفس العنصر اللي بتراقبه، والـ canvas لازم مقاسه على الشاشة يتحدد بالـ CSS.
- لو المطلوب تغيير شكل بس، [[@container]] في CSS أسهل ومن غير JS.`,
          lines: [
            R`الكارت اللي عايزين شكله يتغير حسب **عرضه هو** مش عرض الشاشة. ده الفرق عن media query: نفس الكارت ممكن يبقى في sidebar ضيق أو واخد الصفحة كلها.`,
            R`[[ResizeObserver]] بينادي الـ callback كل ما مقاس عنصر متراقب يتغير، مهما كان السبب (الشاشة اتصغرت، أو sidebar اتقفل، أو المحتوى زاد). و observer واحد ينفع تراقب بيه كذا عنصر.`,
            R`[[entries]] فيها entry لكل عنصر مقاسه اتغير من آخر مرة، فبنلف عليهم.`,
            R`العرض الجديد لمحتوى العنصر (من غير الـ padding والـ border). [[contentBoxSize]] array فبناخد أول عنصر فيها، و [[inlineSize]] هو العرض في الكتابة الأفقية. القيمة جاهزة في الـ entry، فمش محتاج تقيس بنفسك.`,
            R`بنحوّل العرض لمقاس من تلاتة ([["s"]] أو [["m"]] أو [["l"]]) ونحطه في [[data-size]] على العنصر، والـ CSS بيختار الشكل بـ attribute selector على [[data-size]]. فالـ JS بيقيس بس والـ CSS بيرسم. وخلي بالك: لو غيّرت جوه الـ callback حاجة بتغيّر مقاس نفس العنصر، ممكن تعمل loop والمتصفح يكتب تحذير «ResizeObserver loop» في الـ console.`,
            R`نهاية الـ [[for]].`,
            R`نهاية الـ callback والـ [[ResizeObserver]].`,
            R`نبدأ نراقب الكارت. أول ما تعمل [[observe]] الـ callback بيتنادى مرة بالمقاس الحالي (لو العنصر ظاهر)، فالـ [[data-size]] بيتحط من أول ما الصفحة تفتح.`,
            R`مثال تاني: الـ [[<canvas>]] لازم نظبط مقاسه بإيدنا، لأن عدد البكسلات اللي بيرسم عليها منفصل عن مقاسه في الـ CSS.`,
            R`بنعمل observer من غير ما نحفظه في متغير، والـ destructuring في الباراميتر بياخد أول entry بس لأننا بنراقب عنصر واحد.`,
            R`[[contentRect]] فيه عرض وطول المحتوى بالـ CSS pixels، يعني المقاس اللي انت شايفه في DevTools.`,
            R`بنظبط عدد بكسلات الرسم = المقاس في الـ CSS مضروب في [[devicePixelRatio]] (1 على شاشة عادية، و 2 أو 3 على الموبايل والشاشات الكثيفة). من غيرها الرسمة هتتمط وتطلع مغبّشة. و [[Math.round]] لأن [[canvas.width]] بياخد عدد صحيح من البكسلات.`,
            R`نفس الكلام للطول، عشان النسبة بين العرض والطول تفضل مظبوطة.`,
            R`تغيير [[canvas.width]] أو [[canvas.height]] بيمسح كل اللي اترسم ويرجّع الـ context لحالته الأولانية، فلازم نرسم تاني بعد كل تغيير مقاس، وإلا الـ canvas هيفضل فاضي.`,
            R`بنراقب **أب** الـ canvas مش الـ canvas نفسه: الأب هو اللي مقاسه بيتغير مع الصفحة، واحنا بنغيّر مقاس الـ canvas جوه الـ callback، فلو راقبناه هو ممكن نعمل loop. ونهاية الـ observer.`,
            R`دالة رسم بسيطة عشان نشوف النتيجة.`,
            R`[[getContext("2d")]] بيرجّع الـ object اللي فيه أوامر الرسم الـ 2D (مستطيلات، خطوط، نصوص)، وبيرجّع نفس الـ context كل مرة لنفس الـ canvas.`,
            R`بيرسم مستطيل مليان بيبدأ من الركن [[(0, 0)]]، عرضه نص عرض الـ canvas وطوله نص طوله، يعني ربع المساحة. ولأنه بيعتمد على [[canvas.width]] بيفضل ربع مهما المقاس اتغير.`,
            R`نهاية [[draw]].`,
          ],
          sol: R`لما تسحب الـ div تحت 400px الـ [[data-size]] يبقى [["s"]] والـ CSS يقلب الترتيب، وبين 400 و 700 [["m"]]. التغيير بيحصل مع السحب نفسه من غير تأخير ومن غير debounce.

نسخة CSS: [[.wrap { container-type: inline-size }]] على الأب، و [[@container (width < 400px) { .card { flex-direction: column } }]]. نفس النتيجة، ومفيش JS، وبتشتغل قبل ما الـ JS يتحمّل (من غير flash). عشان كده للشكل استخدم CSS، وخلي ResizeObserver للحاجات اللي محتاجة رقم في JS (الـ canvas مثلًا).`
        },
        {
          cmd: "input type=file",
          title: "تختار صور وتعاينها قبل الرفع إزاي؟",
          desc: R`[[<input type="file">]] بيفتح اختيار الملفات. [[accept="image/png,image/jpeg,image/webp"]] أو [[accept="image/*"]] بيفلتر اللي يظهر (اقتراح بس، اليوزر يقدر يختار أي حاجة)، و [[multiple]] يسمح بأكتر من ملف، وعلى الموبايل [[capture="environment"]] بيفتح الكاميرا.

[[input.files]] ليستة [[File]]: كل واحد فيه [[name]] و [[size]] (بالبايت) و [[type]] (MIME زي [["image/png"]]). و [[URL.createObjectURL(file)]] بيعمل URL مؤقت ([[blob:...]]) تحطه في [[img.src]] فتعرض الصورة من غير ما ترفعها، وبعد ما تخلص [[URL.revokeObjectURL(url)]] عشان الذاكرة.`,
          example: R`// HTML: <input type="file" id="pics" accept="image/png,image/jpeg,image/webp" multiple> <div id="preview"></div>
const input = document.querySelector("#pics");
const preview = document.querySelector("#preview");
const MAX = 2 * 1024 * 1024;
let urls = [];
input.addEventListener("change", () => {
  urls.forEach((u) => URL.revokeObjectURL(u));
  urls = [];
  preview.replaceChildren();
  for (const file of input.files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > MAX) {
      preview.append($__bt$__{file.name}: أكبر من 2MB. $__bt);
      continue;
    }
    const url = URL.createObjectURL(file);
    urls.push(url);
    const img = document.createElement("img");
    img.src = url;
    img.alt = file.name;
    img.width = 120;
    preview.append(img);
  }
});`,
          try: R`اختار ٣ صور منهم واحدة أكبر من 2MB وملف PDF (غيّر الـ accept لـ [[*/*]] عشان يظهر). إيه اللي اتعرض؟ وبعدين غيّر اسم ملف [[.txt]] لـ [[.png]] واختاره: [[file.type]] بيقول إيه؟ وآخر حاجة: اعرض تحت كل صورة حجمها بالـ KB ومقاسها بالبكسل ([[img.naturalWidth]] بعد [[img.onload]]).`,
          practice: [
            { lvl: 'سريع', t: R`ابني تحت [[<input type="file" multiple>]] جدول فيه لكل ملف: الاسم، والحجم بالـ KB بـ [[(file.size / 1024).toFixed(1)]]، والنوع، وزرار «شيل». الشيل بيبني [[input.files]] من جديد بـ [[new DataTransfer()]] و [[dt.items.add(file)]] و [[input.files = dt.files]].`, done: R`ملف 1536 بايت بيظهر 1.5 KB، والنوع الفاضي بيظهر «غير معروف»، و «شيل» بيمسح السطر و [[input.files.length]] بيقل واحد، والفورم لما تبعته مبيبعتش الملف اللي شلته.` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب [[async function sniffImage(file)]] بترجّع [["png"]] أو [["jpeg"]] أو [[null]] من أول bytes مش من الامتداد: [[new Uint8Array(await file.slice(0, 4).arrayBuffer())]]. PNG بيبدأ بـ [[89 50 4E 47]] و JPEG بـ [[FF D8 FF]]. جرّبها في Node بملفات بتعملها بـ [[new File([bytes], "a.png")]].`, done: R`ملف أوله bytes الـ PNG بيرجّع [["png"]]، وملف [[new File(["hello"], "fake.png", { type: "image/png" })]] بيرجّع [[null]] مع إن [[file.type]] بتاعه [[image/png]] (في المتصفح النوع بيتخمّن من الامتداد)، وملف فاضي أو أقل من 4 bytes بيرجّع [[null]] من غير error.` },
            { lvl: 'تحدي', t: R`قارن وقيس: [[resizeImage(file, max = 1024)]] بـ [[createImageBitmap(file)]] و canvas أكبر ضلع فيه [[max]] بنفس النسبة، و [[canvas.toBlob(cb, "image/jpeg", 0.8)]] ملفوفة في Promise، وبترجّع [[File]] جديد. اعرض الحجم والمقاس قبل وبعد لـ ٣ صور.`, done: R`صورة 4000×3000 بتطلع 1024×768 بالظبط، وصورة طولية 3000×4000 بتطلع 768×1024، وصورة أصغر من 1024 أصلًا بترجع بمقاسها مبتكبرش، وجدول قبل وبعد فيه الحجم بالـ KB للتلات صور، وملف مش صورة بيرفض الـ Promise برسالة مفهومة.` },
          ],
          flag: "script",
          deep: {
            why: "صورة بروفايل، وصور منتجات، ومرفقات. المعاينة قبل الرفع بتوفر وقت اليوزر والباندويدث، والفحص في المتصفح بيقول «الملف كبير» فورًا بدل ما يستنى رفع ٢٠ ميجا يترفض في الآخر.",
            how: R`[[File]] نوع من [[Blob]] (داتا binary) ومعاه اسم وتاريخ تعديل. المتصفح مبيقراش الملف لما تختاره، بيدّيك reference بس. [[createObjectURL]] بيربط الـ reference ده بـ URL جوه الصفحة، فالـ img بيقرا من الديسك مباشرة، وده أسرع وأخف من [[FileReader.readAsDataURL]] (اللي بيحوّل الملف كله نص base64 في الذاكرة، أكبر بحوالي الثلث).

كل URL بيفضل شايل الملف في الذاكرة لحد ما تعمل revoke أو الصفحة تتقفل، فلو اليوزر اختار صور ١٠ مرات من غير revoke، الذاكرة بتتراكم.

[[file.type]] المتصفح بيخمّنه من الامتداد (مش من محتوى الملف)، و [[accept]] اقتراح لنافذة الاختيار. يعني الاتنين للراحة (UX) مش للأمان. السيرفر لازم يفحص الحجم وأول bytes في الملف (magic bytes) ويعيد تسمية الملف (درس «multer» في تاب Backend بـ Node، و «presigned URL» في تاب Cloud و DevOps). ولو عايز تصغّر الصورة قبل الرفع: ارسمها على canvas بمقاس أصغر و [[canvas.toBlob(cb, "image/webp", 0.8)]].`,
            when: R`أي رفع ملفات. و [[multiple]] للمعارض والمرفقات. والتصغير في المتصفح للصور الكبيرة من الموبايل (١٢ ميجا بكسل) قبل ما ترفعها.`,
            mistakes: R`تعتمد على accept أو file.type كأمان. و createObjectURL من غير revoke. و FileReader base64 لملفات كبيرة. وتعرض [[file.name]] بـ innerHTML (اسم الملف input من اليوزر: [["<img onerror=...>.png"]] اسم ملف قانوني). وتنسى إن اختيار نفس الملف مرتين مش بيطلق [[change]] (اعمل [[input.value = ""]] بعد ما تخلص).`
          },
          teach: R`## الفكرة في سطر

اليوزر يختار صور، فنعرضها على طول من الجهاز بتاعه من غير ما نرفع حاجة، ونتخطى أي ملف مش صورة أو أكبر من 2MB.

جرّبته في Chrome headless (عن طريق playwright-core): اخترت للـ input بـ [[setInputFiles]] خمس ملفات عملتهم بنفسي: [[cat.png]] (صورة 1×1)، و [[big.png]] (3MB)، و [[doc.pdf]]، و [[notes.png]] (ملف نص اسمه png)، و [[dog.jpg]].

---

## ١. الـ HTML

~~~text index.html
<input type="file" id="pics" accept="image/png,image/jpeg,image/webp" multiple>
<div id="preview"></div>
~~~

- [[type="file"]]: زرار «Choose Files» بيفتح نافذة اختيار الملفات.
- [[accept="image/png,image/jpeg,image/webp"]]: أنواع (MIME types) مفصولة بـ [[,]]. نافذة الاختيار بتعرض دول بس. **اقتراح** مش منع: اليوزر يقدر يغيّر الفلتر لـ «All files».
- [[multiple]]: يسمح باختيار أكتر من ملف.
- [[#preview]]: المكان اللي هنحط فيه المعاينات.

---

## ٢. التجهيز

~~~text app.js
const input = document.querySelector("#pics");
const preview = document.querySelector("#preview");
const MAX = 2 * 1024 * 1024;
let urls = [];
~~~

- [[MAX = 2 * 1024 * 1024]]: 2MB بالبايت = [[2097152]]. (1KB = 1024 byte، و 1MB = 1024KB.) كتبناها ضرب عشان تتقري «2 ميجا» بدل رقم مش مفهوم.
- [[urls]]: هنحفظ فيها كل URL مؤقت بنعمله، عشان نمسحه بعدين. [[let]] مش [[const]] لأننا هنبدّلها بـ array فاضية.

---

## ٣. لما اليوزر يختار: [[change]]

~~~text app.js
input.addEventListener("change", () => {
  urls.forEach((u) => URL.revokeObjectURL(u));
  urls = [];
  preview.replaceChildren();
~~~

- [[change]]: بيحصل لما اليوزر يقفل نافذة الاختيار وهو مختار حاجة **مختلفة** عن اللي كان مختارها.
- أول ٣ سطور تنضيف للاختيار اللي فات: [[revokeObjectURL]] لكل URL قديم (هنفهمها تحت)، وفضّي الـ array، و [[replaceChildren()]] من غير arguments بتمسح كل اللي جوه [[preview]].

### [[input.files]]

~~~text app.js
  for (const file of input.files) {
~~~

[[input.files]] ليستة (FileList) فيها object من نوع [[File]] لكل ملف. طبعت اللي فيها بعد ما اخترت الخمسة:

~~~text الناتج
change: files = 5 cat.png image/png 70 | big.png image/png 3145798 | doc.pdf application/pdf 9 | notes.png image/png 16 | dog.jpg image/jpeg 70
~~~

| الخاصية | معناها | مثال |
|---|---|---|
| [[name]] | اسم الملف من غير المسار | [[cat.png]] |
| [[type]] | الـ MIME type | [[image/png]] |
| [[size]] | الحجم بالبايت | [[3145798]] |

لاحظ [[notes.png]]: ملف نص جواه [[hello, I am text]]، و [[type]] بتاعه [[image/png]]. المتصفح بيخمّن النوع من **الامتداد** مش من المحتوى.

### الفلترة

~~~text app.js
    if (!file.type.startsWith("image/")) continue;
    if (file.size > MAX) {
      preview.append($__bt$__{file.name}: أكبر من 2MB. $__bt);
      continue;
    }
~~~

- [[startsWith("image/")]]: النص بيبدأ بـ [["image/"]]؟ الـ PDF نوعه [["application/pdf"]] فـ [[continue]] تعدّيه من غير ما تعرض حاجة.
- [[file.size > MAX]]: [[big.png]] حجمه 3145798 أكبر من 2097152، فبنضيف رسالة. [[append]] بنص (string) بيضيفه كـ **نص** مش HTML، فلو اسم الملف فيه [[<img onerror=...>]] مش هيتنفّذ.

---

## ٤. المعاينة: [[URL.createObjectURL]]

~~~text app.js
    const url = URL.createObjectURL(file);
    urls.push(url);
    const img = document.createElement("img");
    img.src = url;
    img.alt = file.name;
    img.width = 120;
    preview.append(img);
  }
});
~~~

- [[URL.createObjectURL(file)]]: بيعمل URL مؤقت بيشاور على الملف اللي على جهاز اليوزر. شكله على صفحة شغالة من localhost:

~~~text الناتج
blob:http://localhost:PORT/b238a9a3-8884-45b4-8586-18d241d0729d
~~~

[[blob:]] + الـ origin بتاع الصفحة + ID عشوائي. الـ URL ده شغال **جوه الصفحة دي بس**، ومحدش غيرك يقدر يفتحه.
- [[img.src = url]]: الصورة بتتقري من الجهاز مباشرة، من غير رفع ومن غير base64.
- [[img.alt = file.name]]: نص بديل للي مش شايف الصورة. ولأنه property مش HTML فآمن.
- [[img.width = 120]]: عرض المعاينة 120px.

### النتيجة

~~~text الناتج (محتوى #preview)
<img src="blob:..." alt="cat.png" width="120">
big.png: أكبر من 2MB.
<img src="blob:..." alt="notes.png" width="120">
<img src="blob:..." alt="dog.jpg" width="120">
~~~

| الملف | حصل إيه | ليه |
|---|---|---|
| [[cat.png]] | اتعرض | صورة وصغيرة |
| [[big.png]] | رسالة | أكبر من MAX |
| [[doc.pdf]] | ولا حاجة | type مش image |
| [[notes.png]] | img مكسور (المقاس [[0x0]]) | type بتاعه image/png من الامتداد، بس المحتوى نص |
| [[dog.jpg]] | اتعرض | |

> [[file.type]] و [[accept]] للراحة بس. السيرفر لازم يفحص الملف بنفسه.

### ليه [[revokeObjectURL]]؟

كل blob URL بيفضل ماسك الملف في الذاكرة لحد ما الصفحة تتقفل. جرّبت: [[fetch(url)]] قبل الـ revoke رجّع الملف (70 byte)، وبعد [[URL.revokeObjectURL(url)]]:

~~~text الناتج
TypeError: Failed to fetch
~~~

يعني الـ URL اتقفل والذاكرة اتحررت. عشان كده بنعمل revoke للقديم في أول كل [[change]].

### نفس الملف مرتين

اخترت [[cat.png]] لوحده، وبعدين [[cat.png]] تاني: المرة التانية مطلعتش [[change]] خالص، لأن الاختيار متغيرش. لو محتاج تسمح بكده، اعمل [[input.value = ""]] بعد ما تخلص.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[accept]] و [[multiple]] | فلتر لنافذة الاختيار، وأكتر من ملف |
| [[input.files]] | ليستة [[File]]: name و type و size |
| [[URL.createObjectURL(file)]] | URL مؤقت [[blob:...]] للملف |
| [[URL.revokeObjectURL(url)]] | اقفله وحرّر الذاكرة |
| [[replaceChildren()]] | فضّي العنصر |

- النوع جاي من الامتداد، فمتعتمدش عليه للأمان.
- الحجم بالبايت: 2MB = [[2 * 1024 * 1024]].`,
          lines: [
            R`بنمسك الـ [[<input type="file">]] اللي اليوزر بيختار منه الصور.`,
            R`العنصر اللي هنحط فيه صور المعاينة ورسايل الأخطاء.`,
            R`أقصى حجم مسموح: 2 ميجابايت بالبايت (2 × 1024 × 1024)، لأن [[file.size]] بيتقاس بالبايت. كتابتها كده أوضح من رقم كبير محدش فاهم جه منين. والفحص ده لراحة اليوزر بس، والسيرفر لازم يفحص تاني.`,
            R`هنحفظ هنا كل blob URL بنعمله عشان نمسحهم بعدين. كل URL من دول ماسك الملف في الذاكرة لحد ما تعمله revoke أو الصفحة تتقفل.`,
            R`[[change]] بيحصل لما اليوزر يخلص اختيار ويقفل نافذة الملفات، مش مع كل ضغطة. وكل اختيار جديد بيستبدل اللي قبله في [[input.files]].`,
            R`قبل ما نعرض الاختيار الجديد، بنمسح الـ blob URLs بتاعة الاختيار اللي فات بـ [[revokeObjectURL]]. من غير ده، كل مرة اليوزر يختار صور، القديمة تفضل في الذاكرة (memory leak).`,
            R`نرجّع الليستة فاضية، لأن الـ URLs اللي كانت فيها اتمسحت ومبقتش تشتغل.`,
            R`[[replaceChildren()]] من غير arguments بتمسح كل اللي جوه المعاينة، فالصور القديمة متفضلش جنب الجديدة.`,
            R`[[input.files]] هي [[FileList]] فيها object [[File]] لكل ملف اختاره، وفيه [[name]] و [[size]] و [[type]]. مش array حقيقية (مفيهاش [[map]])، بس [[for...of]] بتلف عليها عادي.`,
            R`[[file.type]] هو الـ MIME type زي [["image/png"]]. بنفحص هنا لأن [[accept]] في الـ HTML مجرد اقتراح لنافذة الاختيار، واليوزر يقدر يختار «All files» ويجيب أي ملف. ولو مش صورة، [[continue]] تعدّيه.`,
            R`[[file.size]] حجم الملف بالبايت. لو أكبر من الحد هنعرض رسالة بدل الصورة.`,
            R`بنضيف رسالة فيها اسم الملف. [[append]] لما تديها string بتحطه كـ text node، يعني اسم ملف فيه [[<script>]] هيظهر كنص ومش هيتنفذ، زي [[textContent]] بالظبط.`,
            R`نكمّل على الملف اللي بعده من غير ما نعمل blob URL للملف الكبير ده.`,
            R`نهاية الـ [[if]] بتاع الحجم.`,
            R`[[URL.createObjectURL]] بتعمل URL مؤقت شكله [[blob:...]] بيشاور على الملف اللي على جهاز اليوزر. كده المعاينة بتظهر فورًا من غير ما ترفع حاجة للسيرفر.`,
            R`نحفظ الـ URL في الليستة عشان نعمله revoke في الاختيار الجاي.`,
            R`نعمل عنصر [[<img>]] جديد لكل صورة، لسه في الذاكرة ومش ظاهر لحد ما نضيفه في المعاينة.`,
            R`الـ [[src]] هو الـ blob URL، فالمتصفح بيعرض الصورة من الملف المحلي مباشرة.`,
            R`[[alt]] باسم الملف، عشان قارئ الشاشة يقول الصورة دي إيه. وبنحطه كـ property مش بنركّب HTML، فلو اسم الملف فيه علامات HTML مش هتتنفذ.`,
            R`عرض المعاينة 120 بكسل. بنحدد العرض بس، فالمتصفح بيحسب الطول بنفس نسبة الصورة.`,
            R`نضيف الصورة جوه المعاينة، وهنا بتظهر لليوزر.`,
            R`نهاية الـ [[for]] اللي على الملفات.`,
            R`نهاية الـ listener بتاع [[change]].`,
          ],
          sol: R`الصورتين الصغيرين بيظهروا، والكبيرة بيظهر مكانها «اسمها: أكبر من 2MB.»، والـ PDF مش بيظهر خالص (اتنط بـ continue لأن type بتاعه [["application/pdf"]]).

الـ [[.txt]] اللي اسمه [[.png]]: [[file.type]] بـ [["image/png"]]، والـ img بيظهر مكسور. ده الدليل إن النوع جاي من الامتداد، ودي بالظبط الحركة اللي حد هيعملها عشان يرفع حاجة مش صورة على السيرفر بتاعك.

الحجم: [[(file.size / 1024).toFixed(0) + " KB"]]، والمقاس لازم يستنى التحميل: [[img.onload = () => caption.textContent += $__bt $__{img.naturalWidth}×$__{img.naturalHeight}$__bt]]. قبل الـ onload الـ naturalWidth بـ 0.`
        },
        {
          cmd: "drag and drop و progress",
          title: "تسحب ملف وترفعه بشريط تقدم إزاي؟",
          desc: R`السحب والإفلات: على العنصر اللي هيستقبل اسمع لـ [[dragover]] واعمل [[preventDefault()]] (من غيرها المتصفح مش هيسمح بالإفلات هنا وهيفتح الملف في التاب)، و [[drop]] واعمل [[preventDefault()]] واقرا [[e.dataTransfer.files]] (نفس نوع [[input.files]]). و [[dragenter]] و [[dragleave]] عشان تغيّر الشكل.

شريط التقدم: [[XMLHttpRequest]] عنده [[xhr.upload.onprogress]] بيقولك اترفع كام byte من كام. [[fetch]] مفيهوش حدث تقدم للرفع. فلحد النهارده لو عايز progress bar للرفع بتستخدم XHR (أو مكتبة زي axios، اللي هي XHR من تحت في المتصفح).`,
          example: R`const zone = document.querySelector("#drop");
const bar = document.querySelector("progress");
zone.addEventListener("dragover", (e) => {
  e.preventDefault();
  zone.classList.add("over");
});
zone.addEventListener("dragleave", () => zone.classList.remove("over"));
zone.addEventListener("drop", (e) => {
  e.preventDefault();
  zone.classList.remove("over");
  for (const file of e.dataTransfer.files) upload(file);
});
function upload(file) {
  const fd = new FormData();
  fd.append("file", file);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload");
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) bar.value = e.loaded / e.total;
  };
  xhr.onload = () => console.log(xhr.status, xhr.responseText);
  xhr.onerror = () => console.log("النت وقع");
  xhr.send(fd);
}`,
          try: R`اعمل سيرفر Express صغير فيه [[POST /api/upload]] بـ multer (تاب Backend بـ Node)، وافتح DevTools ← Network ← Throttling ← «Slow 4G»، واسحب صورة ٥ ميجا. الشريط بيتحرك؟ وبعدين زوّد زرار «إلغاء» بيعمل [[xhr.abort()]]، و keyboard fallback: الـ zone يبقى [[<label>]] فيه [[<input type="file">]] مخفي، عشان اللي مبيستخدمش ماوس.`,
          practice: [
            { lvl: 'سريع', t: R`ابني Kanban صغير: عمودين «لسه» و «خلص» وكروت عليها [[draggable="true"]]. في [[dragstart]] اعمل [[e.dataTransfer.setData("text/plain", card.id)]]، وفي [[dragover]] على العمود [[preventDefault()]]، وفي [[drop]] انقل الكارت بـ [[append]].`, done: R`الكارت بيتنقل للعمود اللي تفلته فيه، والإفلات برا العمودين مبيعملش حاجة، والكارت مبيتكررش، وعدد الكروت في عنوان كل عمود بيتحدّث بعد كل نقلة.` },
            { lvl: 'تطبيق', t: R`صلّح الباج: حط جوه منطقة الإفلات بتاعة الدرس أيقونة ونص، واسحب ملف فوقهم: الـ class [[over]] بيرعش. صلّحها بعدّاد بيزيد في [[dragenter]] ويقل في [[dragleave]] ويتصفّر في [[drop]]، وارفض أي سحب مش ملفات ([[e.dataTransfer.types.includes("Files")]]).`, done: R`قبل التصليح الإطار بيختفي ويظهر كل ما تعدّي فوق الأيقونة أو النص (لأن [[dragleave]] بيحصل على الأب لما تدخل عنصر جواه)، وبعده بيفضل ثابت لحد ما تخرج من المنطقة كلها أو تفلت، وسحب نص متعلّم من الصفحة مبيفعّلش المنطقة.` },
            { lvl: 'تحدي', t: R`محاكاة طابور رفع: اكتبه الأول في Node، كل «رفع» [[setTimeout]] وقته عشوائي ونسبة فشل ٢٠٪: ١٠ ملفات، ٢ بس في نفس الوقت، والفاشل يتعاد مرة واحدة. وبعدين بدّل الـ setTimeout بـ XHR بتاع الدرس ومعاه [[<progress>]] وزرار إلغاء ([[xhr.abort()]]) لكل ملف.`, done: R`الـ simulation بيطبع إن أكبر عدد شغال مع بعض 2، وكل ملف نهايته «تم» أو «فشل بعد محاولتين»، ومجموعهم 10. وفي المتصفح على Slow 4G مفيش أكتر من ٢ upload في Network في أي لحظة، والإلغاء بيكتب «اتلغى» وبيسيب مكانه للي بعده.` },
          ],
          flag: "script",
          deep: {
            why: "رفع ملف كبير على نت بطيء من غير أي مؤشر، اليوزر بيفتكر إن الموقع علّق فيعمل refresh ويضيّع الرفع. والسحب والإفلات متوقع في أي dashboard أو محرر.",
            how: R`[[dragover]] بيتنادى كل كام ملّي ثانية وانت ساحب فوق العنصر، و [[preventDefault]] فيه هي اللي بتقول للمتصفح «العنصر ده بيقبل drop». [[dragleave]] بيحصل كمان لما تعدّي فوق عنصر ابن جوه الـ zone، فالشكل ممكن يرمش؛ الحل عداد بـ dragenter/dragleave أو [[pointer-events: none]] على الأبناء وقت السحب.

XHR بيبعت الـ body وبيطلق [[upload.progress]] كل ما جزء يخرج من الجهاز. [[lengthComputable]] بتبقى true لما الحجم الكلي معروف (مع FormData و File دايمًا معروف). والتقدم ده «اتبعت من الجهاز»، مش «السيرفر حفظه»؛ بعد ١٠٠٪ لسه فيه وقت لحد [[onload]].

ليه fetch لأ؟ [[fetch]] بيدّيك download progress عن طريق [[res.body.getReader()]] (تقرا الرد chunk chunk). بس الرفع: المواصفات فيها streaming request body ([[body: ReadableStream]] مع [[duplex: "half"]])، وده مدعوم في Chromium بس ومحتاج HTTP/2، وحتى معاه اللي بتعدّه هو اللي الـ stream بتاعك سلّمه للمتصفح مش اللي وصل للشبكة فعلًا. فمفيش طريقة بسيطة ومضمونة. عشان كده XHR لسه موجود ومش deprecated.

للملفات الكبيرة (فيديو): ارفع مباشرة لـ S3/R2 بـ presigned URL من غير ما تعدّي على سيرفرك (بـ XHR PUT برضه عشان الـ progress)، أو multipart/resumable uploads (tus) عشان لو النت قطع تكمّل.`,
            when: R`أي رفع أكبر من كام ميجا، أو على موبايل. والسحب للـ dashboards والمحررات، مع input عادي دايمًا.`,
            mistakes: R`تنسى preventDefault في dragover فالمتصفح يفتح الصورة بدل ما يرفعها. و progress بـ fetch. وتحط [[Content-Type]] بإيدك مع FormData. وتعتبر ١٠٠٪ نجاح قبل ما [[onload]] يقول status 200. ومفيش بديل للكيبورد والموبايل (السحب مش شغال على iOS Safari من الملفات). وفي الانترفيو: «إزاي تعمل progress bar لرفع ملف؟» الإجابة XHR upload.onprogress، وليه fetch مبيعملهاش.`
          },
          teach: R`## الفكرة في سطر

جزئين: منطقة تسحب عليها ملف من الجهاز وتسيبه (drag and drop)، ودالة بترفع الملف للسيرفر وبتحرّك شريط تقدم وهي بترفع.

جرّبته في Chrome headless (عن طريق playwright-core): صفحة فيها [[<div id="drop">]] و [[<progress>]]، وسيرفر Node صغير على localhost بيستقبل [[POST /api/upload]] ويرد بعدد البايتات اللي وصلته. عملت في الصفحة [[File]] حجمه 5MB، وبعتّه للـ zone بأحداث [[dragover]] و [[dragleave]] و [[drop]] مصنوعة بـ [[new DragEvent(...)]] (headless مفيهوش ماوس يسحب من الديسك)، وبطّأت الشبكة بـ DevTools Protocol لـ 1MB في الثانية رفع و 100ms latency.

---

## ١. العناصر

~~~text app.js
const zone = document.querySelector("#drop");
const bar = document.querySelector("progress");
~~~

[[<progress>]] عنصر HTML جاهز بيرسم شريط. [[value]] بتاعه من 0 لحد [[max]]، و [[max]] الافتراضي [[1]] (طبعته وطلع 1)، فلو حطيت [[bar.value = 0.5]] يبقى نص الشريط مليان.

---

## ٢. السحب فوق المنطقة: [[dragover]]

~~~text app.js
zone.addEventListener("dragover", (e) => {
  e.preventDefault();
  zone.classList.add("over");
});
~~~

- [[dragover]]: بيتنادى كل شوية (كل كام ملّي ثانية) طول ما انت ساحب حاجة فوق العنصر.
- [[e.preventDefault()]]: أهم سطر. الافتراضي في المتصفح إن العناصر **مبتقبلش** drop، ولو سبت الملف المتصفح بيفتحه في التاب (صورة أو PDF). [[preventDefault]] في dragover معناها «العنصر ده بيقبل». (ده من المواصفات ومن MDN، وتقدر تجرّبه بإيدك: شيل السطر واسحب صورة.)
- [[classList.add("over")]]: كلاس الـ CSS بتاعه يغيّر الشكل («سيبه هنا»).

~~~text app.js
zone.addEventListener("dragleave", () => zone.classList.remove("over"));
~~~

[[dragleave]]: الماوس خرج برّه المنطقة، فرجّع الشكل. بعد dragover الكلاس كان [["over"]]، وبعد dragleave بقى [[""]].

---

## ٣. الإفلات: [[drop]]

~~~text app.js
zone.addEventListener("drop", (e) => {
  e.preventDefault();
  zone.classList.remove("over");
  for (const file of e.dataTransfer.files) upload(file);
});
~~~

- [[preventDefault()]] تاني: هنا بتمنع المتصفح يفتح الملف.
- [[e.dataTransfer]]: الـ object اللي شايل الحاجة المسحوبة. و [[.files]] فيه نفس نوع [[input.files]] بالظبط (ليستة [[File]])، فكل اللي اتعلمته في درس «input type=file» شغال هنا.
- لكل ملف نادي [[upload]].

---

## ٤. [[upload]]: الرفع بـ XHR

### الـ body: [[FormData]]

~~~text app.js
  const fd = new FormData();
  fd.append("file", file);
~~~

[[FormData]] بيبني body من نوع [[multipart/form-data]]، نفس اللي بيتبعت لو فورم HTML فيه input file. [[append("file", file)]] بيضيف الملف تحت اسم [["file"]] (السيرفر بيدوّر بالاسم ده، زي [[upload.single("file")]] في multer). السيرفر عندي طبع الـ header اللي وصله:

~~~text الناتج
multipart/form-data; boundary=----WebKit...
~~~

المتصفح حط الـ [[Content-Type]] **و** الـ boundary (الفاصل بين الأجزاء) لوحده، عشان كده متكتبش Content-Type بإيدك مع FormData.

### الطلب

~~~text app.js
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload");
~~~

[[XMLHttpRequest]] (اختصاره XHR) الطريقة القديمة لعمل requests قبل [[fetch]]. الاسم فيه XML لأسباب تاريخية، وبيبعت أي حاجة. [[open(method, url)]] بتجهّز الطلب بس، ولسه مبعتش.

### التقدم

~~~text app.js
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) bar.value = e.loaded / e.total;
  };
~~~

- [[xhr.upload]]: object منفصل لأحداث **الرفع** (و [[xhr.onprogress]] من غير upload للتحميل).
- [[e.loaded]]: اتبعت كام byte لحد دلوقتي. [[e.total]]: الحجم الكلي.
- [[e.lengthComputable]]: الحجم الكلي معروف؟ مع FormData فيها File دايمًا [[true]].
- [[e.loaded / e.total]]: نسبة من 0 لـ 1، بالظبط اللي [[<progress>]] عايزه.

### الرد والأخطاء والإرسال

~~~text app.js
  xhr.onload = () => console.log(xhr.status, xhr.responseText);
  xhr.onerror = () => console.log("النت وقع");
  xhr.send(fd);
~~~

- [[onload]]: السيرفر رد، **أي** رد (200 أو 404 أو 500)، فلازم تبص على [[xhr.status]].
- [[onerror]]: مفيش رد خالص: النت قطع أو السيرفر مش موجود.
- [[send(fd)]]: دلوقتي بس الطلب بيتبعت.

---

## ٥. اللي حصل لما رفعت 5MB على 1MB/s

حطيت [[console.log]] جوه onprogress بالوقت من لحظة الـ drop (مختصر):

~~~text الناتج
progress 106ms 98304 / 5243063 lengthComputable true bar 0.02
progress 211ms 196608 / 5243063 lengthComputable true bar 0.04
progress 325ms 311296 / 5243063 lengthComputable true bar 0.06
...
progress 2719ms 2670592 / 5243063 lengthComputable true bar 0.51
...
progress 5338ms 5243063 / 5243063 lengthComputable true bar 1.00
5448ms 200 {"ok":true,"bytes":5243063,...}
~~~

- الحدث اتنادى تقريبًا كل 100ms، وكل مرة زيادة حوالي 100KB، وده منطقي مع 1MB في الثانية.
- الـ [[total]] بـ 5243063 مش 5242880 (5 × 1024 × 1024): الفرق 183 byte هما الـ boundary والـ headers بتاعة الجزء جوه الـ multipart.
- الشريط وصل 1.00 عند 5338ms، والـ [[onload]] جه بعدها بحوالي 110ms. الـ 100٪ معناها «اتبعت من الجهاز»، والنجاح الحقيقي هو [[200]] في onload.
- السيرفر عدّ نفس الرقم [[bytes: 5243063]].

### وليه مش [[fetch]]؟

[[fetch]] مفيهوش حدث زي [[upload.onprogress]]. عشان كده لحد النهارده أي progress bar للرفع بيبقى XHR، ومكتبة axios في المتصفح XHR من تحت برضه.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[dragover]] + [[preventDefault()]] | العنصر ده بيقبل drop |
| [[drop]] + [[preventDefault()]] | متفتحش الملف، و [[e.dataTransfer.files]] فيها الملفات |
| [[dragleave]] | خرج برّه، رجّع الشكل |
| [[FormData]] + [[append]] | body من نوع multipart، والمتصفح بيحط الـ Content-Type |
| [[xhr.upload.onprogress]] | [[e.loaded]] من [[e.total]] |
| [[onload]] / [[onerror]] | رد (افحص status) / مفيش رد |

- [[<progress>]] قيمته من 0 لـ 1 افتراضيًا.
- ١٠٠٪ مش نجاح: استنى [[onload]] و [[status]].`,
          lines: [
            R`المنطقة اللي اليوزر هيسيب فيها الملفات ([[#drop]])، غالبًا [[<div>]] عليه كلام زي «اسحب الملفات هنا».`,
            R`[[<progress>]] عنصر HTML جاهز بيرسم شريط تقدم. الـ [[max]] الافتراضي بتاعه 1، فبنحط [[value]] من 0 لـ 1 والشريط بيتملا لوحده.`,
            R`[[dragover]] بيتكرر طول ما اليوزر ساحب حاجة فوق المنطقة، فبنعرف منه إنه فوقها.`,
            R`افتراضيًا المتصفح مش بيسمح بالإفلات على أي عنصر، و [[preventDefault]] هنا معناها «اسمح بالإفلات هنا». من غيرها حدث [[drop]] مش هيحصل خالص، والمتصفح هيفتح الملف في التاب بدل صفحتك.`,
            R`نضيف كلاس [[over]] عشان الـ CSS يغيّر شكل المنطقة (border أو لون) ويقول لليوزر «سيبه هنا». ولأن [[classList.add]] مبتكررش الكلاس، تكرار الحدث مش مشكلة.`,
            R`نهاية الـ listener بتاع [[dragover]].`,
            R`[[dragleave]] بيحصل لما الماوس يخرج برّه المنطقة، فبنشيل الكلاس ونرجّع الشكل. خلي بالك: بيحصل كمان لما تعدّي فوق عنصر جوه المنطقة، فالشكل ممكن يرمش، وحل شائع ليها [[pointer-events: none]] على العناصر اللي جوه.`,
            R`[[drop]] بيحصل لما اليوزر يسيب الماوس فوق المنطقة، وده الحدث اللي فيه الملفات.`,
            R`[[preventDefault]] تاني هنا عشان المتصفح ميعملش السلوك الافتراضي، وهو إنه يفتح الملف اللي اتسحب ويسيب صفحتك.`,
            R`نرجّع شكل المنطقة، لأن [[dragleave]] مش بيحصل بعد الإفلات.`,
            R`[[e.dataTransfer.files]] من نفس نوع [[input.files]] ([[FileList]])، فنفس الكود اللي بيتعامل مع ملفات الـ input ينفع هنا. وبنرفع كل ملف لوحده.`,
            R`نهاية الـ listener بتاع [[drop]].`,
            R`دالة بترفع ملف واحد وتحدّث الشريط.`,
            R`[[FormData]] بيبني body بصيغة [[multipart/form-data]]، الصيغة اللي الفورمز بتبعت بيها ملفات.`,
            R`نحط الملف تحت اسم [[file]]. الاسم ده لازم يطابق اللي السيرفر مستنيه (زي [[upload.single("file")]] في multer)، وإلا السيرفر مش هيلاقي الملف.`,
            R`بنستخدم [[XMLHttpRequest]] القديم مش [[fetch]] لسبب واحد: XHR عنده [[upload.onprogress]] بيقولك اترفع كام، و [[fetch]] مالوش طريقة بسيطة لكده.`,
            R`نجهّز طلب [[POST]] على الـ endpoint. [[open]] مش بيبعت حاجة لسه، بيجهّز بس.`,
            R`[[xhr.upload.onprogress]] بيتنادى كذا مرة والملف بيترفع. لاحظ الـ [[upload]]: [[xhr.onprogress]] من غيرها بتاعة تحميل **الرد** مش الرفع.`,
            R`[[lengthComputable]] بتقول إن الحجم الكلي معروف. لو معروف، [[e.loaded / e.total]] بتدّي نسبة من 0 لـ 1، وده بالظبط اللي الـ [[<progress>]] مستنيه.`,
            R`نهاية الـ [[onprogress]].`,
            R`[[onload]] بيتنادى لما السيرفر يرد بأي status، حتى 400 أو 500. فلازم تبص على [[xhr.status]] عشان تعرف الرفع نجح فعلًا ولا لأ.`,
            R`[[onerror]] بيتنادى بس لو الطلب موصلش خالص (النت قطع أو السيرفر مش شغّال)، مش لما السيرفر يرد بخطأ.`,
            R`نبعت الطلب بالـ [[FormData]]. متحطش [[Content-Type]] بإيدك: المتصفح بيحطه لوحده ومعاه الـ boundary اللي بيفصل الأجزاء، ولو كتبته من غيره السيرفر مش هيعرف يقرا الملف.`,
            R`نهاية [[upload]].`,
          ],
          sol: R`مع Slow 4G والـ ٥ ميجا الشريط بيتحرك تدريجيًا على مدار ثواني، وبعد ما يوصل ١٠٠٪ فيه لحظة لحد ما [[onload]] يطبع [[200]] والرد (السيرفر لسه بيكتب الملف).

الإلغاء: خزّن الـ xhr في متغير برّه، والزرار [[xhr.abort()]]، واسمع لـ [[xhr.onabort]] ورجّع الشريط 0. في Network الطلب هيظهر «(canceled)».

الـ fallback: [[<label id="drop"><input type="file" hidden multiple> اسحب هنا أو اضغط للاختيار</label>]]، والضغط على الـ label بيفتح اختيار الملفات لوحده، و [[change]] على الـ input بتنادي نفس [[upload]]. كده الكيبورد (Tab ثم Enter) والموبايل شغالين.`
        },
        {
          cmd: "visibilitychange و bfcache",
          title: "تعرف إن اليوزر ساب الصفحة أو رجعلها إزاي؟",
          desc: R`[[visibilitychange]]: الصفحة بقت مخفية (اليوزر غيّر التاب، أو صغّر، أو قفل الشاشة، أو ساب التطبيق على الموبايل) أو ظهرت تاني. ده آخر حدث مضمون تقريبًا على الموبايل، فأي حفظ مسودة أو إرسال analytics يبقى هنا، بـ [[navigator.sendBeacon]] اللي بيبعت حتى لو الصفحة بتتقفل.

[[beforeunload]]: الحدث اللي يطلّع «متأكد إنك عايز تخرج؟». استخدمه بس لما فيه تغييرات مش محفوظة، وشيله أول ما تتحفظ.

وbfcache (back/forward cache): لما اليوزر يضغط back، المتصفح بيرجّع الصفحة زي ما هي من الذاكرة (JS و state و scroll) من غير تحميل. [[pageshow]] بـ [[e.persisted === true]] بيقولك إنها رجعت من الـ bfcache، فحدّث الداتا اللي ممكن تكون قدمت.`,
          example: R`const form = document.querySelector("#post-form");
function warn(e) {
  e.preventDefault();
  e.returnValue = "";
}
form.addEventListener("input", () => window.addEventListener("beforeunload", warn));
form.addEventListener("submit", () => window.removeEventListener("beforeunload", warn));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "hidden") return;
  const draft = JSON.stringify(Object.fromEntries(new FormData(form)));
  navigator.sendBeacon("/api/draft", draft);
});
window.addEventListener("pageshow", (e) => {
  if (e.persisted) console.log("رجعت من الـ bfcache: حدّث السلة والإشعارات");
});
window.addEventListener("pagehide", (e) => console.log("pagehide، هتتحفظ في bfcache؟", e.persisted));`,
          try: R`افتح الصفحة، واكتب في الفورم، وجرّب تقفل التاب: الرسالة ظهرت؟ اعمل submit وجرّب تاني. وبعدين روح لصفحة تانية وارجع بـ back وبص على Console (فعّل Preserve log). وآخر حاجة: DevTools ← Application ← Back/forward cache ← «Test back/forward cache»: الصفحة eligible؟ ولو لأ، إيه السبب اللي بيقوله؟`,
          practice: [
            { lvl: 'سريع', t: R`محاكاة شات: [[setInterval]] بيضيف رسالة وهمية كل ٣ ثواني. لما الصفحة تبقى [[hidden]] عدّ الرسايل اللي جت وخلّي [[document.title]] يبقى «(3) الشات»، ولما ترجع [[visible]] رجّع العنوان وصفّر العدّاد.`, done: R`تسيب التاب ١٠ ثواني: عنوان التاب بيبان فيه رقم بيزيد (حوالي 3)، وأول ما ترجع العنوان بيرجع «الشات» والعدّاد صفر، وانت جوه الصفحة العنوان مبيتغيرش خالص.` },
            { lvl: 'تطبيق', t: R`ابني عدّاد «وقت المذاكرة الفعلي» لصفحة درس: بيعدّ الوقت اللي الصفحة كانت ظاهرة فيه بس، بـ [[performance.now()]] مش بعدّ ticks، وبيبعت المجموع بـ [[navigator.sendBeacon("/api/time", ...)]] كل ما الصفحة تتخبى.`, done: R`تسيب التاب ١٠ ثواني وترجع: العدّاد مزادش الـ ١٠ ثواني دول (بفرق ثانية بالكتير)، و Network فيه request لـ [[/api/time]] كل مرة الصفحة اتخبت، والرقم اللي اتبعت هو المجموع لحد اللحظة دي.` },
            { lvl: 'تحدي', t: R`صلّح صفحة bfcache مبيرجّعهاش: صفحة فاتحة WebSocket لسيرفر [[ws]] على localhost. اقفل الـ socket في [[pagehide]]، وافتحه تاني في [[pageshow]] لما [[e.persisted]] يبقى [[true]]، وشغّل Test back/forward cache قبل وبعد.`, done: R`لو الاختبار قال الصفحة مش eligible قبل التصليح، بتكتب السبب اللي DevTools طلّعه. بعد التصليح: back بيرجّع الصفحة من bfcache، و [[pageshow]] بيطبع [[persisted: true]]، والـ socket اتفتح تاني والرسايل بتوصل، ولوج السيرفر فيه اتصال اتقفل واتصال جديد.` },
          ],
          flag: "script",
          deep: {
            why: "اليوزر كتب بوست طويل وقفل التاب بالغلط. أو فتح الموبايل بعد ساعة ولقى السلة قديمة. أو الـ analytics بتقول إن نص الزيارات «ملهاش نهاية». كل ده دورة حياة الصفحة، وأغلب المواقع بتتعامل معاها غلط بـ [[unload]].",
            how: R`[[beforeunload]]: [[preventDefault()]] هي الطريقة الحديثة، و [[returnValue = ""]] للمتصفحات القديمة. والرسالة نفسها بتاعة المتصفح ومتقدرش تغيّرها. وبيطلع بس لو اليوزر اتفاعل مع الصفحة قبل كده. وإضافة الـ listener بس وقت الحاجة مهمة لأن وجود beforeunload طول الوقت بيمنع الـ bfcache في بعض المتصفحات (Firefox مثلًا).

[[unload]] متستخدمهاش: مش بتتنادى بشكل موثوق على الموبايل (النظام بيقفل التطبيق من غير ما يسأل)، ووجودها بيمنع الـ bfcache، و Chrome بيلغيها تدريجيًا. البديل [[visibilitychange]] (hidden) للحفظ، و [[pagehide]] لو محتاج لحظة الخروج نفسها.

[[sendBeacon(url, data)]] بيبعت POST صغير (حوالي 64KB كحد) والمتصفح بيكمّله حتى لو الصفحة اتقفلت، ومبيرجّعش رد. البديل الحديث [[fetch(url, { method: "POST", body, keepalive: true })]].

الـ bfcache بيجمّد الصفحة كلها: الـ timers واقفة، والـ promises متعلقة، ولما ترجع بتكمّل. أسباب إن الصفحة متدخلوش: [[unload]] listener، أو WebSocket أو IndexedDB transaction مفتوحين، أو (تاريخيًا) [[Cache-Control: no-store]] على الـ HTML. والـ DevTools test بيقولك السبب بالظبط.`,
            when: R`حفظ مسودات، و analytics نهاية الزيارة، و pause للفيديو والـ polling لما التاب مخفي (توفير بطارية وrequests)، وتحديث داتا حساسة للوقت لما الصفحة ترجع (سلة، رصيد، إشعارات).`,
            mistakes: R`[[unload]] لأي حاجة. و beforeunload متسجل على طول. و [[fetch]] عادي في visibilitychange من غير keepalive فيتلغي. وتفترض إن الصفحة «فتحت من جديد» لما اليوزر يرجع بـ back فمتحدّثش الداتا. و polling شغال في تاب مخفي طول اليوم.`
          },
          teach: R`## الفكرة في سطر

٣ حاجات بتحصل للصفحة واليوزر مش بيقولك: هيقفل وهو كاتب حاجة (نحذّره)، أو التاب اتخفى (نحفظ المسودة)، أو رجع للصفحة بزرار back (نحدّث الداتا). المثال بيسمع للتلاتة.

جرّبته في Chrome headless (عن طريق playwright-core) على صفحة من سيرفر Node على localhost فيها فورم بـ [[<input name="title">]] و [[<textarea name="body">]]، والسيرفر بيطبع أي [[POST /api/draft]] يوصله. ولاحظ: Playwright بيقفل الـ bfcache افتراضيًا ([[--disable-back-forward-cache]])، فشغّلته بـ [[ignoreDefaultArgs]] عشان أجرّب الـ bfcache بجد.

---

## ١. التحذير قبل الخروج: [[beforeunload]]

~~~text app.js
const form = document.querySelector("#post-form");
function warn(e) {
  e.preventDefault();
  e.returnValue = "";
}
form.addEventListener("input", () => window.addEventListener("beforeunload", warn));
form.addEventListener("submit", () => window.removeEventListener("beforeunload", warn));
~~~

- [[beforeunload]]: حدث على [[window]] قبل ما الصفحة تتقفل أو تروح لصفحة تانية أو تعمل refresh.
- [[warn]] دالة **ليها اسم** (مش arrow جوه addEventListener)، لأن [[removeEventListener]] محتاج نفس الدالة بالظبط عشان يشيلها.
- [[e.preventDefault()]]: الطريقة الحديثة تقول «اسأل اليوزر». و [[e.returnValue = ""]] نفس الطلب للمتصفحات القديمة. النص اللي بتحطه مبيظهرش: المتصفح بيعرض رسالته هو.
- [[input]] على الفورم: بيحصل مع أي حرف في أي خانة جواه (الـ event بيطلع من الخانة للفورم). أول ما يكتب نسجّل التحذير، وتسجيل نفس الدالة مرتين مبيعملش حاجة، فمش مشكلة إنه بيتنادى مع كل حرف.
- [[submit]]: اتحفظ، فشيل التحذير.

### اللي حصل

| الحالة | قفلت التاب | النتيجة |
|---|---|---|
| مكتبتش حاجة | اتقفل على طول | مفيش listener أصلًا |
| كتبت في الخانتين | ظهر dialog نوعه [[beforeunload]] ورسالته [[""]] | رفضته فالتاب فضل مفتوح ([[closed? false]]) |
| كتبت وعملت submit | اتقفل على طول | الـ listener اتشال |

الرسالة فاضية من ناحية الكود لأن المتصفح هو اللي بيكتب «Leave site? Changes you made may not be saved» (أو بلغة المتصفح).

---

## ٢. حفظ المسودة: [[visibilitychange]]

~~~text app.js
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "hidden") return;
  const draft = JSON.stringify(Object.fromEntries(new FormData(form)));
  navigator.sendBeacon("/api/draft", draft);
});
~~~

- [[visibilitychange]] على [[document]]: الصفحة اتخفت أو ظهرت (تاب تاني، تصغير، قفل الشاشة، الخروج من التطبيق على الموبايل، أو قفل التاب نفسه).
- [[document.visibilityState]]: [["visible"]] أو [["hidden"]]. بنكمّل لما تبقى hidden بس.
- السطر التالت من جوه لبرّه:

| الخطوة | الناتج |
|---|---|
| [[new FormData(form)]] | كل خانات الفورم بأساميها ([[name]]) |
| [[Object.fromEntries(...)]] | بتحوّل الأزواج دي لـ object عادي: [[{ title: "...", body: "..." }]] |
| [[JSON.stringify(...)]] | حوّله نص JSON |

- [[navigator.sendBeacon(url, data)]]: بيبعت POST صغير، والمتصفح **بيكمّله حتى لو الصفحة اتقفلت**. بيرجّع [[true]] لو قبل يبعته (مش لو السيرفر رد)، ومفيش طريقة تقرا الرد.

### اللي وصل السيرفر

كل مرة الصفحة اتقفلت أو اتنقلت منها، السيرفر طبع:

~~~text الناتج (السيرفر)
SERVER got POST /api/draft content-type=text/plain;charset=UTF-8 body={"title":"","body":""}
SERVER got POST /api/draft content-type=text/plain;charset=UTF-8 body={"title":"","body":"x"}
SERVER got POST /api/draft content-type=text/plain;charset=UTF-8 body={"title":"draft1","body":""}
~~~

- الطلبات وصلت حتى من التابات اللي اتقفلت.
- لاحظ [[content-type=text/plain]]: لما تبعت string لـ sendBeacon بيروح كنص. فالسيرفر لازم يقراه نص ويعمل [[JSON.parse]] (مثلًا [[express.text()]] مش [[express.json()]])، أو ابعت [[new Blob([draft], { type: "application/json" })]].

---

## ٣. الرجوع بـ back: [[pageshow]] و [[pagehide]]

~~~text app.js
window.addEventListener("pageshow", (e) => {
  if (e.persisted) console.log("رجعت من الـ bfcache: حدّث السلة والإشعارات");
});
window.addEventListener("pagehide", (e) => console.log("pagehide، هتتحفظ في bfcache؟", e.persisted));
~~~

- [[pageshow]]: الصفحة اتعرضت، سواء تحميل جديد أو رجوع من الـ bfcache.
- [[pagehide]]: الصفحة بتمشي. ده البديل الصح لـ [[unload]].
- [[e.persisted]]: في pageshow معناها «رجعت من الـ bfcache»، وفي pagehide معناها «هتتحفظ في الـ bfcache».

bfcache اختصار back/forward cache: المتصفح بيجمّد الصفحة كلها في الذاكرة (الـ JS والمتغيرات والخانات ومكان الـ scroll)، ولما ترجع بيصحّيها بدل ما يحمّلها من الأول.

### اللي حصل

كتبت [[draft1]] في الخانة، ورحت لصفحة تانية ([[/other]])، ورجعت بـ back (بالترتيب، بعد ما وافقت على dialog الـ beforeunload):

~~~text الناتج (Console)
pageshow persisted = false
pagehide، هتتحفظ في bfcache؟ true
visibilitychange: hidden
sendBeacon returned true
visibilitychange: visible
pageshow persisted = true
رجعت من الـ bfcache: حدّث السلة والإشعارات
~~~

| السطر | معناه |
|---|---|
| [[pageshow persisted = false]] | أول تحميل عادي |
| [[pagehide ... true]] | ماشي، والصفحة هتتجمّد في الـ bfcache |
| [[visibilitychange: hidden]] + beacon | الصفحة اختفت، فالمسودة اتبعتت بـ [[sendBeacon]] قبل ما المتصفح يجمّدها |
| [[visibilitychange: visible]] | الصفحة رجعت تظهر تاني لما دوست Back |
| [[pageshow persisted = true]] | من الـ bfcache، مش تحميل جديد |

وبعد الرجوع، الخانة لسه فيها [[draft1]]: الصفحة نفسها رجعت زي ما هي. يعني أي كود في أول الصفحة (زي «هات السلة من السيرفر») **مش هيتنفّذ تاني**، وعشان كده بنحدّث في [[pageshow]] لما [[persisted]] تبقى true.

ولما قفلت التاب (مش navigation) [[pagehide]] طلعت [[false]]: تاب اتقفل مفيش حاجة يرجعلها.

> Chrome حط الصفحة في الـ bfcache هنا مع إن الـ beforeunload listener كان متسجّل. بس Firefox ممكن يرفض بسببه، وده سبب تاني إنك تسجّله وقت الحاجة بس.

---

## الخلاصة

| الحدث | على | إمتى تستخدمه |
|---|---|---|
| [[beforeunload]] | [[window]] | تحذير لو فيه تغييرات مش محفوظة، وشيله بعد الحفظ |
| [[visibilitychange]] (hidden) | [[document]] | احفظ واعمل analytics، مع [[sendBeacon]] |
| [[pagehide]] | [[window]] | لحظة الخروج نفسها (بدل [[unload]]) |
| [[pageshow]] + [[persisted]] | [[window]] | رجع من الـ bfcache: حدّث الداتا |

- [[removeEventListener]] محتاج نفس الدالة، فاديها اسم.
- [[sendBeacon]] مبيرجّعش رد، والـ string بيروح [[text/plain]].
- متستخدمش [[unload]].`,
          lines: [
            R`الفورم اللي اليوزر بيكتب فيه البوست، وده اللي مش عايزين كلامه يضيع.`,
            R`دالة التحذير متعرّفة باسم (مش arrow جوه [[addEventListener]]) عشان [[removeEventListener]] محتاج **نفس** الدالة بالظبط علشان يشيلها.`,
            R`في [[beforeunload]]، [[preventDefault]] بيطلب من المتصفح يسأل اليوزر «عايز تمشي فعلًا؟». النص اللي بيظهر بتاع المتصفح ومتقدرش تغيّره.`,
            R`متصفحات قديمة كانت بتبص على [[returnValue]] مش [[preventDefault]] عشان تظهر التحذير، فبنحطه برضه عشان يشتغل عندهم كمان.`,
            R`نهاية [[warn]].`,
            R`أول ما اليوزر يكتب أي حاجة نفعّل التحذير، فصفحة فاضية متسألوش على الفاضي. [[input]] بيحصل مع كل حرف، بس إضافة نفس الدالة لنفس الحدث أكتر من مرة بتتجاهل، فمفيش تكرار.`,
            R`لما الفورم يتبعت الكلام اتحفظ، فبنشيل التحذير عشان الصفحة تمشي من غير سؤال.`,
            R`[[visibilitychange]] بيحصل لما التاب يتخفى أو يرجع يظهر: اليوزر غيّر التاب، أو صغّر المتصفح، أو قفل الموبايل. ده أضمن وقت تحفظ فيه، لأن الموبايل ممكن يقفل الصفحة وهي في الخلفية من غير أي حدث تاني.`,
            R`يهمنا لحظة الاختفاء بس، فلو التاب رجع ظاهر نخرج.`,
            R`[[new FormData(form)]] بيقرا كل خانات الفورم، و [[Object.fromEntries]] بيحوّلها لـ object عادي، و [[JSON.stringify]] بيحوّله لنص نبعته.`,
            R`[[sendBeacon]] بيبعت POST صغير والمتصفح بيكمّله حتى لو الصفحة اتقفلت. مالوش رد تقراه، وبيرجّع [[true]] لو الطلب اتحط في الطابور بس. ولأن الـ body string، السيرفر هيستقبله [[text/plain]] فلازم يعمل parse للـ JSON بنفسه.`,
            R`نهاية الـ listener بتاع [[visibilitychange]].`,
            R`[[pageshow]] بيحصل كل ما الصفحة تظهر: أول تحميل، أو رجوع ليها بزرار back.`,
            R`[[e.persisted]] بـ [[true]] معناها الصفحة رجعت من الـ bfcache (المتصفح كان حافظها في الذاكرة زي ما هي)، فالكود مش بيشتغل من الأول والداتا اللي فيها ممكن تكون قديمة. ده المكان اللي تحدّث فيه السلة والإشعارات.`,
            R`نهاية الـ listener بتاع [[pageshow]].`,
            R`[[pagehide]] بيحصل لما اليوزر يسيب الصفحة، و [[e.persisted]] بتقول هتتحفظ في الـ bfcache ولا لأ. استخدمه بدل [[unload]]: وجود listener على [[unload]] بيمنع الصفحة من الـ bfcache في متصفحات كتير.`,
          ],
          sol: R`قبل الـ submit: قفل التاب بيطلّع رسالة المتصفح «Leave site?» (أو بالعربي حسب لغة المتصفح)، ونصها ثابت. بعد الـ submit مفيش رسالة لأن الـ listener اتشال. لو مطلعتش خالص، غالبًا مكتبتش حاجة بجد (المتصفح بيطلب تفاعل).

الـ back: Console فيها [[pagehide، هتتحفظ في bfcache؟ true]] وبعد الرجوع [[رجعت من الـ bfcache...]]. ولاحظ إن الـ input لسه فيه اللي كتبته والـ scroll مكانه: ده الـ bfcache.

لو الـ test قال «not eligible» الأسباب الشائعة: listener على [[unload]] (من مكتبة أو analytics)، أو الصفحة مفتوحة من DevTools بطريقة معيّنة، أو WebSocket مفتوح. وفي الحالة دي back بتعمل تحميل كامل و [[persisted]] بـ false.`
        },
        {
          cmd: "pushState و popstate",
          title: "تغيّر الـ URL من غير تحميل صفحة جديدة إزاي؟ (راوتر صغير)",
          desc: R`[[history.pushState(state, "", "/about")]] بيغيّر الـ URL في الشريط ويضيف خطوة في الـ history من غير ما يطلب الصفحة من السيرفر. و [[replaceState]] نفس الكلام بس بيستبدل الخطوة الحالية (للفلاتر والبحث). ومفيش حاجة بتتعرض لوحدها: انت اللي بترسم المحتوى المناسب.

و [[popstate]] بيتنادى لما اليوزر يضغط back أو forward، فتقرا [[location.pathname]] وترسم. ده كل الـ SPA router (React Router و Next.js client navigation) من تحت: اعترض ضغطة اللينك، و pushState، وارسم، واسمع لـ popstate.`,
          example: R`const content = document.querySelector("#content");
const pages = { "/": "الرئيسية", "/about": "عننا", "/contact": "كلمنا" };
function render(path) {
  content.textContent = pages[path] ?? "404: الصفحة مش موجودة";
  document.title = pages[path] ?? "مش موجود";
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const path = new URL(a.href).pathname;
  if (path === location.pathname) return;
  history.pushState({ path }, "", path);
  render(path);
});
window.addEventListener("popstate", () => render(location.pathname));
render(location.pathname);`,
          try: R`اعمل [[index.html]] فيه ٣ لينكات [[<a href="/about" data-link>]] و [[<main id="content">]]، وشغّله بـ [[npx serve -s]] (الـ [[-s]] بيرجّع index.html لأي path). اتنقل، واضغط back و forward، واعمل refresh على [[/about]]. وبعدين شغّله بـ [[npx serve]] من غير [[-s]] واعمل refresh على [[/about]]: إيه اللي حصل؟ وجرّب Ctrl+Click على لينك.`,
          practice: [
            { lvl: 'سريع', t: R`ابني tabs component (٣ تابات «الوصف» و «المواصفات» و «التقييمات»): الضغط على تاب بيعمل [[pushState]] لـ [[?tab=specs]]، و [[popstate]] بيرجّع التاب الصح، وفتح الصفحة بيقرا [[?tab=]] من [[location.search]].`, done: R`تضغط تابين ورا بعض وتعمل back مرتين: بترجع للتابين اللي قبل بالترتيب، و refresh على [[?tab=reviews]] بيفتح التقييمات، و [[?tab=xyz]] بيفتح التاب الأول من غير error.` },
            { lvl: 'تطبيق', t: R`صلّح الباج: راوتر الدرس بيمسك كل [[a[data-link]]] حتى لو اللينك لموقع تاني، أو عليه [[target="_blank"]] أو [[download]]. حط ٣ لينكات زي دول جنب اللينكات العادية وصلّح الشرط عشان يسيبهم للمتصفح.`, done: R`لينك لـ [[https://example.com]] بيفتح الموقع ده فعلًا، و [[target="_blank"]] بيفتح تاب جديد، و [[download]] بينزّل الملف، واللينكات الداخلية لسه بتتنقل من غير reload، والشرط فيه مقارنة [[a.origin !== location.origin]].` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[matchRoute(path, routes)]] بترجّع [[{ route, params }]] أو [[null]]، لـ routes زي [[/users/:id]] و [[/users/:id/posts]]، بـ [[URLPattern]] أو regex، واكتب لها تستات بـ [[node:test]]، وبعدين وصّلها بالراوتر.`, done: R`[[matchRoute("/users/42", routes).params.id]] بيرجّع [["42"]]، و [[/users/42/posts]] بيطابق الـ route التاني، و [[/users]] لوحدها و [[/users/42/x]] بيرجّعوا [[null]] (يعني 404)، و [[node --test]] بيعدّي، و back و forward و refresh (مع [[npx serve -s]]) بيفتحوا الصفحة الصح.` },
          ],
          flag: "script",
          deep: {
            why: "تحميل الصفحة كلها مع كل ضغطة بيضيّع الـ state (فيديو شغال، فورم نص مكتوب) وبيحمّل الـ JS والـ CSS تاني. الـ SPA بيغيّر الجزء اللي اتغير بس. بس اليوزر لسه متوقع إن back يشتغل، وإن اللينك يتنسخ ويتبعت، وإن refresh يرجّعه لنفس المكان، و pushState هو اللي بيحافظ على ده.",
            how: R`[[pushState]] بيغيّر [[location]] ويضيف entry في الـ history stack ومبيطلقش أي event. [[popstate]] بيتنادى لما الـ entry الحالي يتغير بـ back/forward (أو [[history.back()]])، مش لما تعمل pushState بنفسك. عشان كده بتنادي [[render]] بإيدك بعد pushState.

الـ [[state]] (أول argument) object بيتحفظ مع الـ entry وبيرجعلك في [[e.state]] وقت popstate، مفيد لحاجات زي مكان الـ scroll. لازم يبقى قابل للنسخ (structured clone): مفيش دوال ولا عناصر DOM.

شرط اللينك: [[e.button !== 0]] (مش الزرار الشمال) وأزرار Ctrl/Cmd/Shift معناها «افتح في تاب جديد»، فسيبها للمتصفح. و [[data-link]] عشان اللينكات الخارجية أو التحميلات تفضل عادية.

السيرفر: لما اليوزر يعمل refresh على [[/about]]، المتصفح بيطلب [[/about]] من السيرفر فعلًا. لو السيرفر مش عارفه هيرد 404. لازم أي path مش ملف يرجّع [[index.html]] (درس «SPA» في تاب Nginx: [[try_files $uri /index.html]]).

وفيه Navigation API الأحدث ([[navigation.addEventListener("navigate", ...)]]) بيعترض كل التنقلات في مكان واحد بدل click و popstate. دعمه اتسع في 2025/2026، بس اتأكد من caniuse قبل ما تعتمد عليه من غير fallback.`,
            when: R`لما تبني SPA صغير من غير framework، أو تحط الفلاتر والتابات في الـ URL ([[replaceState]]). وفي React/Next استخدم الراوتر بتاعهم، بس افهم إن ده اللي تحته.`,
            mistakes: R`تستنى popstate بعد pushState. ومتعملش render في الأول ([[render(location.pathname)]]) فالـ refresh يعرض صفحة فاضية. والسيرفر مش راجع index.html. وتعترض Ctrl+Click. وتنسى [[document.title]] والـ focus (قارئات الشاشة مش هتعرف إن الصفحة اتغيرت: حرّك الـ focus للعنوان الجديد). و pushState لكل حرف في البحث فالـ back يبقى ١٠٠ خطوة (استخدم replaceState).`
          },
          teach: R`## الفكرة في سطر

راوتر SPA كامل في 17 سطر: لما اليوزر يدوس لينك، بنمنع التحميل، ونغيّر الـ URL بإيدنا، ونرسم المحتوى المناسب. ولما يدوس back أو forward، نرسم حسب الـ URL الجديد.

جرّبته في Chrome headless (عن طريق playwright-core) على [[index.html]] فيه ٤ لينكات عليها [[data-link]] ([[/]] و [[/about]] و [[/contact]] و [[/nope]]) و [[<main id="content">]]. بدل [[npx serve -s]] استخدمت سيرفر Node صغير على localhost بنفس السلوك: مرة بيرجّع [[index.html]] لأي path (زي [[-s]])، ومرة بيرجّعه لـ [[/]] بس و 404 لأي حاجة تانية (زي [[serve]] من غير [[-s]]).

---

## ١. الصفحات والرسم

~~~text app.js
const content = document.querySelector("#content");
const pages = { "/": "الرئيسية", "/about": "عننا", "/contact": "كلمنا" };
function render(path) {
  content.textContent = pages[path] ?? "404: الصفحة مش موجودة";
  document.title = pages[path] ?? "مش موجود";
}
~~~

- [[pages]]: object كل key فيه path وكل value المحتوى بتاعه. في مشروع حقيقي الـ value بتبقى دالة بترسم component.
- [[pages[path]]]: الأقواس المربعة بتجيب الخاصية اللي اسمها في متغير. [[pages["/about"]]] = [["عننا"]]، و [[pages["/nope"]]] = [[undefined]].
- [[?? "404: ..."]]: لو [[undefined]] خد النص ده.
- [[document.title]]: العنوان اللي في التاب. لازم نغيّره بإيدنا، المتصفح مش هيعمل كده لوحده.

---

## ٢. اعتراض الضغط على اللينكات

~~~text app.js
document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  const path = new URL(a.href).pathname;
  if (path === location.pathname) return;
  history.pushState({ path }, "", path);
  render(path);
});
~~~

### listener واحد على الـ document

بدل listener على كل لينك، واحد على [[document]] بيمسك أي ضغطة في الصفحة (event delegation، درس في نفس التاب). كده لو ضفت لينكات بعدين هتشتغل لوحدها.

### [[e.target.closest("a[data-link]")]]

- [[e.target]]: العنصر اللي اتضغط عليه بالظبط (ممكن [[<span>]] أو أيقونة جوه اللينك).
- [[closest(selector)]]: اطلع من العنصر ده لفوق (هو نفسه، وأبوه، وجدّه...) ورجّع أول واحد بيطابق الـ selector، أو [[null]].
- [[a[data-link]]]: لينك [[<a>]] عليه attribute اسمه [[data-link]]. اللينكات من غيره (موقع خارجي، ملف للتحميل) بتفضل عادية.

### الشرط الطويل

[[return]] (سيب المتصفح يتصرف عادي) لو أي واحدة من دول صح، و [[||]] يعني «أو»:

| الشرط | معناه |
|---|---|
| [[!a]] | مش لينك من بتوعنا |
| [[e.button !== 0]] | مش الزرار الشمال (0 الشمال، 1 العجلة، 2 اليمين) |
| [[e.metaKey]] | Cmd على الماك ماسك (تاب جديد) |
| [[e.ctrlKey]] | Ctrl ماسك (تاب جديد) |
| [[e.shiftKey]] | Shift ماسك (شباك جديد) |

### الباقي

1. [[e.preventDefault()]]: امنع المتصفح يحمّل الصفحة من السيرفر.
2. [[new URL(a.href).pathname]]: [[a.href]] بيرجّع الـ URL **كامل** ([[http://localhost:PORT/about]]) حتى لو مكتوب في الـ HTML [[/about]]. [[new URL]] بيفكّه، و [[.pathname]] الجزء بتاع المسار بس: [["/about"]].
3. [[path === location.pathname]]: [[location.pathname]] المسار الحالي. لو نفس الصفحة اخرج، عشان منضيفش خطوة في الـ history على الفاضي.
4. [[history.pushState({ path }, "", path)]]: غيّر الـ URL وضيف خطوة في الـ history (تحت تفصيل الـ arguments).
5. [[render(path)]]: [[pushState]] بيغيّر الـ URL **بس**، ومش بيطلق أي event ولا بيرسم حاجة، فبنرسم بإيدنا.

| الـ argument | معناه |
|---|---|
| [[{ path }]] | الـ state: object بيتحفظ مع الخطوة دي ويرجعلك وقت back. وهو اختصار [[{ path: path }]] |
| [[""]] | مكان قديم لعنوان، المتصفحات بتتجاهله |
| [[path]] | الـ URL الجديد اللي هيظهر في الشريط |

---

## ٣. back و forward: [[popstate]]

~~~text app.js
window.addEventListener("popstate", () => render(location.pathname));
render(location.pathname);
~~~

- [[popstate]]: بيتنادى لما اليوزر يتنقّل في الـ history بـ back أو forward. وقتها [[location.pathname]] بقى الـ path الجديد، فبنرسمه. (والـ state اللي حفظناه في [[e.state]].)
- آخر سطر: ارسم أول مرة حسب الـ URL اللي الصفحة فتحت عليه. من غيره، refresh على [[/about]] يعرض [[<main>]] فاضي.

---

## ٤. اللي حصل لما شغّلته (السيرفر بيرجّع index.html لأي path)

ضفت [[console.log]] في popstate يطبع الـ path والـ state:

~~~text الناتج
load /             → url=/        content=الرئيسية  history.length=2
click about        → url=/about   content=عننا      history.length=3
click about again  → url=/about   content=عننا      history.length=3
click contact      → url=/contact content=كلمنا     history.length=4
click nope         → url=/nope    content=404: الصفحة مش موجودة  history.length=5
popstate /contact {"path":"/contact"}
back               → url=/contact content=كلمنا
popstate /about {"path":"/about"}
back               → url=/about   content=عننا
popstate /contact {"path":"/contact"}
forward            → url=/contact content=كلمنا
~~~

- [[history.length]] (عدد الخطوات في الـ history) بدأ 2 لأن التاب كان فاتح [[about:blank]] الأول، وزاد واحد مع كل [[pushState]].
- الضغط على about وانت في about: [[history.length]] فضل 3، بسبب سطر [[path === location.pathname]].
- [[/nope]] مش في [[pages]] فاتعرض نص الـ 404 والعنوان [[مش موجود]].
- back و forward بيطلقوا [[popstate]]، والـ state رجع زي ما حفظناه.
- السيرفر مجالوش ولا طلب صفحة طول التنقل ده (غير [[favicon.ico]] اللي المتصفح بيطلبه لأيقونة التاب).

### refresh على [[/about]] و Ctrl+Click

| | السيرفر بيرجّع index.html لأي path | السيرفر بيرجّع 404 |
|---|---|---|
| refresh على [[/about]] | status 200، والمحتوى «عننا» | status 404، ولا [[#content]] ولا JS |
| Ctrl+Click على about | تاب جديد اتفتح وطلب [[/about]] من السيرفر، والتاب الأصلي فضل مكانه | نفس الكلام، بس التاب الجديد 404 |

ليه؟ في الـ refresh المتصفح بيطلب [[/about]] من السيرفر **فعلًا**. لو السيرفر مش عارف إن ده مسار في الـ SPA بيرد 404، والـ JS بتاعك مبيوصلش أصلًا. الحل في السيرفر (fallback لـ index.html)، مش في الـ JS. و Ctrl+Click اتساب للمتصفح بسبب [[e.ctrlKey]]، فاتفتح تاب جديد عادي.

---

## الخلاصة

| الحاجة | بتعمل إيه | بتطلق event؟ |
|---|---|---|
| [[history.pushState(state, "", url)]] | تغيّر الـ URL وتضيف خطوة | لأ، ارسم بإيدك |
| [[history.replaceState(state, "", url)]] | تغيّر الـ URL من غير خطوة جديدة | لأ |
| back / forward | اليوزر اتنقل | [[popstate]] |
| [[location.pathname]] | المسار الحالي | |

- اعترض بس الضغطة الشمال من غير Ctrl/Cmd/Shift، على لينكات [[data-link]].
- ارسم مرة في الأول بـ [[render(location.pathname)]].
- السيرفر لازم يرجّع [[index.html]] لأي path من بتاع الـ SPA.`,
          lines: [
            R`العنصر اللي هنحط فيه محتوى كل «صفحة». الصفحة نفسها مش هتتحمّل تاني، احنا اللي هنغيّر اللي جوه العنصر ده.`,
            R`object بيربط كل path بمحتواه. في تطبيق حقيقي القيمة هتبقى دالة بترسم الصفحة، بس الفكرة واحدة: الـ URL مفتاح بنختار بيه نرسم إيه.`,
            R`دالة بترسم الصفحة المناسبة للـ path. هي المكان الوحيد اللي بيرسم، فكل الطرق (ضغطة لينك، back، أول تحميل) بتعدّي عليها.`,
            R`بنحط المحتوى بـ [[textContent]]، ولو الـ path مش موجود في [[pages]] الـ [[??]] بتحط رسالة 404 بدل [[undefined]].`,
            R`ونغيّر عنوان التاب كمان، لأن مفيش تحميل صفحة جديد هيغيّره لوحده، وده اللي بيظهر في الـ history والـ bookmarks.`,
            R`نهاية [[render]].`,
            R`listener واحد على الـ [[document]] كله بدل listener على كل لينك (event delegation): الضغطة بتطلع لفوق (bubbling) لحد الـ document، فحتى اللينكات اللي هتتضاف بعدين هتشتغل من غير ما تسجّلها.`,
            R`[[closest]] بيدوّر من العنصر اللي اتضغط ولفوق على أقرب [[<a>]] عليه [[data-link]]. محتاجينها لأن الضغطة ممكن تكون على أيقونة أو [[<span>]] جوه اللينك، و [[data-link]] بتفرّق اللينكات الداخلية عن اللي رايحة لموقع تاني.`,
            R`نسيب المتصفح يتصرف عادي لو مش لينك داخلي، أو مش الزرار الشمال ([[e.button !== 0]])، أو اليوزر داس Ctrl أو Cmd أو Shift: دول معناهم «افتح في تاب أو نافذة جديدة»، ولو منعناهم هنكسر حاجة اليوزر متعوّد عليها.`,
            R`نمنع المتصفح يروح للينك ويحمّل الصفحة من السيرفر، احنا اللي هنرسم.`,
            R`[[a.href]] كـ property بيرجّع الـ URL كامل حتى لو الـ HTML فيه [[/about]] بس، فبنعدّيه على [[new URL]] وناخد [[pathname]] لوحده.`,
            R`لو اليوزر داس على لينك الصفحة اللي هو فيها، منضيفش خطوة جديدة في الـ history، وإلا زرار back هيحتاج كذا ضغطة عشان يرجع.`,
            R`[[pushState]] بيغيّر الـ URL في شريط العنوان ويضيف خطوة في الـ history من غير ما يحمّل حاجة. الأول (state) بيتحفظ مع الخطوة دي، والتاني مش مستخدم فبيتساب [[""]]، والتالت هو الـ URL الجديد.`,
            R`[[pushState]] مش بيرسم ولا بيطلق أي حدث، فلازم ننادي [[render]] بنفسنا. لو نسيت السطر ده، الـ URL هيتغير والصفحة زي ما هي.`,
            R`نهاية الـ click listener.`,
            R`[[popstate]] بيحصل لما اليوزر يدوس back أو forward، والمتصفح بيكون غيّر الـ URL خلاص، فبنرسم حسب [[location.pathname]] الجديد. ومش بيحصل مع [[pushState]] نفسها.`,
            R`أول ما الصفحة تفتح بنرسم الـ path الحالي، عشان لو اليوزر فتح [[/about]] مباشرة أو عمل refresh يشوف الصفحة الصح. وده محتاج السيرفر يرجّع نفس الـ [[index.html]] لأي path، وإلا الـ refresh هيدّي 404 من السيرفر.`,
          ],
          sol: R`مع [[serve -s]]: التنقل من غير تحميل (Network مفيهاش طلبات HTML جديدة)، و back/forward بيغيّروا المحتوى والعنوان، و refresh على [[/about]] بيرجّع «عننا» لأن السيرفر رجّع index.html والسطر الأخير رسم الـ path.

من غير [[-s]]: refresh على [[/about]] بيطلع 404 من السيرفر نفسه، والـ JS بتاعك مشتغلش أصلًا. ده أشهر bug بعد نشر SPA، والحل في السيرفر مش في الـ JS.

Ctrl+Click بيفتح تاب جديد عادي لأن الشرط سابه للمتصفح، والتاب الجديد بيطلب [[/about]] من السيرفر (فمحتاج [[-s]] برضه).`
        },
        {
          cmd: "MutationObserver",
          title: "تعرف إن الـ DOM اتغيّر (عنصر اتضاف أو اتشال، أو attribute اتغيّر) إزاي؟",
          desc: R`[[MutationObserver]] بيناديك لما حاجة تتغيّر في الـ DOM: عنصر اتضاف أو اتشال ([[childList]])، أو attribute اتغيّر ([[attributes]])، أو نص اتعدّل ([[characterData]]). بتديله callback، وبعدين [[observe(el, options)]] بتقوله يراقب إيه بالظبط.

التغييرات مش بتوصلك واحدة واحدة وقت ما تحصل: المتصفح بيجمّعها في array ويناديك مرة واحدة كـ **microtask** بعد ما الكود اللي شغّال يخلص. ده نفس عيلة [[IntersectionObserver]] و [[ResizeObserver]] (الدرسين الأولانيين في الوحدة دي)، بس بيراقب **شكل الشجرة** مش الشاشة ولا المقاس.

بتستخدمه لما مش انت اللي بتغيّر الـ DOM: widget من بره بيحط عناصر، أو مكتبة قديمة، أو extension، أو محتوى بييجي من السيرفر وعايز تعمله حاجة أول ما يظهر. لو انت اللي بتضيف العنصر بإيدك، اعمل اللي عايزه في نفس السطر من غير observer.`,
          example: R`const chat = document.querySelector("#chat");
const mo = new MutationObserver((records) => {
  console.log("records:", records.length);
  for (const r of records) {
    if (r.type === "childList") console.log("childList +" + r.addedNodes.length, "-" + r.removedNodes.length);
    else console.log(r.attributeName, r.oldValue, "→", r.target.getAttribute(r.attributeName));
  }
});
mo.observe(chat, { childList: true, subtree: true, attributeFilter: ["data-state"], attributeOldValue: true });
const msg = document.createElement("li");
msg.textContent = "أهلًا";
chat.append(msg);
chat.dataset.state = "busy";
chat.dataset.state = "idle";
chat.title = "مش متراقب";
msg.remove();
console.log("الكود خلص");
// استخدام حقيقي: الشات ينزل لآخر رسالة لوحده
new MutationObserver(() => { chat.scrollTop = chat.scrollHeight; }).observe(chat, { childList: true });`,
          try: R`اعمل صفحة فيها [[<ul id="chat">]] و [[<script>]] بالمثال، وافتح الـ Console. اتوقع الأول: «الكود خلص» هتتطبع قبل ولا بعد [[records: 4]]؟ وبعدين ضيف [[mo.disconnect()]] كآخر سطر في الـ script وشوف الـ callback لسه بيتنادى ولا لأ، وصلّحها بـ [[mo.takeRecords()]] قبل الـ disconnect.`,
          practice: [
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[observe(el, { attributes: true })]] وبعدين [[el.className = "a"; el.className = "b"; el.className = "b";]] في نفس الكود. الـ callback هيتنادى كام مرة؟ وكام record؟ وإيه [[oldValue]] في كل واحد لو ضفت [[attributeOldValue: true]]؟ اكتب توقعك وبعدين شغّله.`, done: R`الـ callback اتنادى **مرة واحدة** بـ ٣ records (حتى التالت اللي مغيّرش القيمة اتسجّل)، و [[oldValue]] بالترتيب [[null]] و [["a"]] و [["b"]]، وتقدر تشرح ليه مرة واحدة: الـ records بتتجمّع وتتبعت كـ microtask بعد ما الكود يخلص.` },
            { lvl: 'تطبيق', t: R`ابني «عدّاد غير مقروء»: [[<ul id="inbox">]] فيه رسايل [[<li data-read="false">]]، وزرار بيضيف رسالة جديدة، وضغطة على رسالة بتخلّي [[data-read="true"]]. العدّاد في العنوان ([[document.title = "(3) البريد"]]) بيتحسب من MutationObserver واحد بس، مش من كود الزرار ولا كود الضغطة.`, done: R`إضافة رسالة بتزوّد الرقم، وقراية رسالة بتنقّصه، و [[inbox.innerHTML = ""]] من الـ Console بيخلّي العنوان [[البريد]] من غير رقم، والـ observer عليه [[attributeFilter: ["data-read"]]] و [[subtree: true]]، والعدّ بيحصل مرة واحدة لكل دفعة تغييرات مش لكل record.` },
            { lvl: 'تحدي', t: R`صلّح الكود البايظ: observer على [[document.body]] بـ [[{ childList: true, subtree: true }]] بيضيف [[<span class="badge">جديد</span>]] جوه أي [[li]] جديد. شغّله وشوف الصفحة بتعلّق، واعرف ليه، وصلّحه من غير ما تشيل الـ subtree.`, done: R`عرفت إن إضافة الـ badge نفسها mutation جديدة فالـ callback بينادي نفسه للأبد (ومن غير ما الصفحة ترسم، لأنه microtask)، وصلّحته بإنك تتجاهل العناصر اللي عليها الـ badge أو تعمل [[disconnect]] وتضيف وتعمل [[observe]] تاني، وإضافة ١٠٠ [[li]] بتطلّع ١٠٠ badge بالظبط والصفحة مبتعلّقش.` },
          ],
          flag: "script",
          deep: {
            why: R`قبل MutationObserver كان فيه Mutation Events ([[DOMNodeInserted]] وأخواتها) وكانت بتتنادى **جوه** كل تغيير، فالصفحة كانت بتبطأ جدًا، واتشالت من Chrome خالص (من الـ docs: اتشالت في Chrome 127 سنة 2024). الحل الجديد بيجمّع التغييرات ويبعتها مرة واحدة بعد ما الكود يخلص، فمش بيقاطع شغلك.`,
            how: R`كل observer ليه طابور records. أي تغيير متراقب بيضيف record، وأول record بيحجز microtask واحدة. لما الكود الحالي يخلص (قبل أي [[setTimeout]] وقبل الرسم)، المتصفح بيدّي الـ callback كل الـ records مرة واحدة. عشان كده «الكود خلص» بتطلع الأول.

الـ options: [[childList]] للأولاد المباشرين، و [[subtree]] يمدّها لكل الأحفاد، و [[attributes]] أو [[attributeFilter: [...]]] (الفلتر لوحده بيشغّل الـ attributes)، و [[characterData]] لنص الـ text nodes، و [[attributeOldValue]] و [[characterDataOldValue]] عشان تاخد القيمة القديمة. لازم واحد على الأقل من التلاتة الأولانيين وإلا [[TypeError]].

[[disconnect()]] بيوقّف كل حاجة **وبيرمي** الـ records اللي لسه موصلتش، و [[takeRecords()]] بيرجّعهم ليك ويفضّي الطابور.`,
            when: R`widget من بره (chat أو إعلانات أو تعليقات) بيضيف عناصر وعايز تظبطها، و auto-scroll لشات، و تفعيل حاجة على أي عنصر جديد بـ class معين (زي tooltips)، و تستات بتستنى عنصر يظهر، و extensions. ومش لحاجة انت اللي بتعملها بإيدك: نادي الدالة في نفس المكان.`,
            mistakes: R`تعدّل نفس الجزء المتراقب جوه الـ callback فيبقى loop بيعلّق الصفحة. و [[subtree: true]] على [[document.body]] في صفحة كبيرة من غير فلتر فالـ callback بيشتغل على كل حاجة. و [[disconnect()]] من غير [[takeRecords()]] فتضيع آخر التغييرات. وتفتكر إن [[r.target.getAttribute(...)]] هي القيمة وقت التغيير: هي القيمة **دلوقتي**، والقديمة في [[oldValue]] بس. وتنسى إن [[textContent = "..."]] بيبدّل الـ text node (childList) مش characterData.`
          },
          teach: R`## الفكرة في سطر

بتقول للمتصفح «لو حاجة اتغيرت جوه العنصر ده، ابعتلي لستة باللي حصل». المثال بيراقب شات: رسالة بتتضاف وتتشال، و [[data-state]] بيتغير مرتين، و [[title]] بيتغير بس مش متراقب.

شغّلت المثال في Chrome 156 headless (عن طريق playwright-core) وفي jsdom 30، والناتج طلع واحد بالحرف.

---

## ١. الـ observer والـ callback

~~~text app.js
const mo = new MutationObserver((records) => {
  console.log("records:", records.length);
  for (const r of records) { ... }
});
~~~

- [[new MutationObserver(callback)]]: بتعمل مراقب. لسه مبيراقبش حاجة لحد ما تنادي [[observe]].
- [[records]]: array من [[MutationRecord]]، record لكل تغيير حصل من آخر مرة اتنادى فيها.
- [[r.type]]: نوع التغيير، واحد من تلاتة: [["childList"]] (أولاد اتضافوا أو اتشالوا)، أو [["attributes"]]، أو [["characterData"]] (نص اتعدّل).
- [[r.addedNodes]] و [[r.removedNodes]]: الـ nodes اللي اتضافت واللي اتشالت (NodeList، فبنستخدم [[.length]]).
- [[r.attributeName]]: اسم الـ attribute اللي اتغير، و [[r.oldValue]] قيمته **قبل** التغيير، و [[r.target]] العنصر اللي اتغير.

## ٢. [[observe]]: تراقب إيه بالظبط

~~~text app.js
mo.observe(chat, { childList: true, subtree: true, attributeFilter: ["data-state"], attributeOldValue: true });
~~~

| الـ option | معناه |
|---|---|
| [[childList: true]] | أولاد [[chat]] المباشرين لما يتضافوا أو يتشالوا |
| [[subtree: true]] | نفس الكلام على كل الأحفاد كمان، مش الأولاد المباشرين بس |
| [[attributeFilter: ["data-state"]]] | راقب الـ attributes دي بس، وأي attribute تاني (زي [[title]]) يتجاهل |
| [[attributeOldValue: true]] | سجّل القيمة القديمة في [[r.oldValue]]، من غيرها بتبقى [[null]] |
| [[characterData: true]] | تعديل نص جوه text node (مع [[subtree]] عشان توصل للنص اللي جوه العنصر) |

جرّبت [[attributeFilter]] لوحده من غير [[attributes: true]]: شغّال، لأن الفلتر بيشغّل الـ attributes لوحده. وجرّبت [[observe(chat, {})]]:

~~~text الناتج (Chrome)
TypeError: Failed to execute 'observe' on 'MutationObserver': The options object must set at least one of 'attributes', 'characterData', or 'childList' to true.
~~~

ونفس الرسالة لو نسيت الـ options خالص. ولو العنصر مش موجود ([[querySelector]] رجّع [[null]]):

~~~text الناتج (Chrome)
TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.
~~~

## ٣. التغييرات والناتج

~~~text app.js
const msg = document.createElement("li");
msg.textContent = "أهلًا";
chat.append(msg);
chat.dataset.state = "busy";
chat.dataset.state = "idle";
chat.title = "مش متراقب";
msg.remove();
console.log("الكود خلص");
~~~

~~~text الناتج (Chrome 156 و jsdom)
الكود خلص
records: 4
childList +1 -0
data-state null → idle
data-state busy → idle
childList +0 -1
~~~

خمس حاجات تتعلمها من الناتج ده:

1. **«الكود خلص» طلعت الأول.** الـ callback مش بيتنادى جوه [[append]]، بيتنادى بعد ما الـ script كله يخلص، كـ microtask (درس «microtasks و macrotasks»).
2. **مرة واحدة بـ 4 records**، مش ٤ مرات. المتصفح جمّعهم.
3. **[[msg.textContent = "أهلًا"]] مااتسجّلش**: ساعتها [[msg]] كان لسه برّه [[chat]]، والـ observer بيشوف اللي جوه بس.
4. **[[title]] مااتسجّلش** بسبب [[attributeFilter]].
5. **السطرين بتوع [[data-state]] بيقولوا [[→ idle]] الاتنين.** [[r.oldValue]] صح لكل record ([[null]] وبعدين [[busy]])، بس [[r.target.getAttribute(...)]] بيقرا القيمة **دلوقتي** وقت الـ callback، وهي [[idle]]. لو عايز القيمة الجديدة لكل خطوة، هي الـ [[oldValue]] بتاع الـ record اللي بعده.

## ٤. الاستخدام الحقيقي: auto-scroll

~~~text app.js
new MutationObserver(() => { chat.scrollTop = chat.scrollHeight; }).observe(chat, { childList: true });
~~~

- [[chat.scrollHeight]]: طول المحتوى كله جوه الـ [[ul]]، حتى الجزء المستخبي.
- [[chat.scrollTop = ...]]: انزل لحد كده، يعني آخر رسالة.
- مش فارق مين اللي ضاف الرسالة (WebSocket، أو مكتبة، أو انت): الشات بينزل لوحده. جرّبت ٥ رسايل ورا بعض في [[ul]] طوله 40px: الـ callback اتنادى مرة واحدة، و [[scrollTop]] بقى 104 وده بالظبط [[scrollHeight - clientHeight]] (يعني تحت خالص).

## ٥. [[disconnect]] و [[takeRecords]]

جرّبت أضيف عنصر وبعدين [[mo.disconnect()]] على طول في نفس الكود: الـ callback **عمره ما اتنادى**. الـ disconnect بيرمي أي records لسه في الطابور. لو محتاجهم:

~~~text app.js
const pending = mo.takeRecords();
mo.disconnect();
console.log(pending.length, pending[0].type);
~~~

~~~text الناتج (Chrome، بعد إضافة عنصرين)
2 childList
~~~

## ٦. الفخ: الـ callback بيغيّر اللي بيراقبه

لو الـ callback ضاف عنصر جوه نفس الـ [[chat]]، ده تغيير جديد، فيتنادى تاني، ويضيف تاني... جرّبتها بعدّاد بيقف عند 1000: الـ callback اتنادى 1000 مرة و [[setTimeout(..., 0)]] اللي كان مستني اتنفّذ **بعدهم كلهم**. يعني من غير العدّاد الصفحة كانت هتعلّق ومش هترسم أبدًا، لأن الـ microtasks بتخلص كلها قبل أي رسم.

الحل: اتجاهل التغييرات اللي انت عملتها (فحص زي [[if (el.querySelector(".badge")) continue]])، أو [[disconnect]] وعدّل وبعدين [[observe]] تاني.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[new MutationObserver(cb)]] و [[observe(el, opts)]] | ابعتلي لستة بالتغييرات اللي حصلت جوه el |
| [[childList]] و [[subtree]] | عناصر اتضافت أو اتشالت، في الأولاد بس أو في الشجرة كلها |
| [[attributeFilter]] و [[attributeOldValue]] | attributes معينة بس، ومعاها قيمتها القديمة |
| [[characterData]] | نص اتعدّل جوه text node موجود |
| [[takeRecords()]] | هات اللي في الطابور دلوقتي وفضّيه |
| [[disconnect()]] | وقّف المراقبة وارمي اللي لسه موصلش |

- الـ callback microtask: بيتنادى مرة واحدة بعد ما الكود يخلص، وقبل الـ timers والرسم.
- [[getAttribute]] جوه الـ callback = القيمة دلوقتي، والقديمة في [[oldValue]].
- متغيّرش اللي بتراقبه جوه الـ callback من غير شرط يوقف.`,
          lines: [
            R`العنصر اللي هنراقبه: لستة رسايل الشات. لازم يكون موجود في الصفحة قبل السطر ده، وإلا [[querySelector]] هيرجّع [[null]] و [[observe]] هيرمي TypeError.`,
            R`بنعمل المراقب ونديله callback. الـ callback بياخد [[records]]: array فيها record لكل تغيير حصل من آخر مرة اتنادى، مش تغيير واحد.`,
            R`بنطبع عدد التغييرات في الدفعة دي، عشان نشوف بعينينا إن المتصفح جمّعهم ونادانا مرة واحدة بس.`,
            R`بنلف على كل record. كل واحد فيه [[type]] و [[target]] وحاجات تانية حسب النوع.`,
            R`لو النوع [["childList"]] يبقى عناصر اتضافت أو اتشالت: [[addedNodes]] و [[removedNodes]] لستتين بالـ nodes، وبنطبع عددهم.`,
            R`غير كده هنا يبقى [["attributes"]]: بنطبع اسم الـ attribute وقيمته القديمة ([[oldValue]]) والقيمة **الحالية** من [[getAttribute]]. والحالية دي وقت الـ callback مش وقت التغيير، عشان كده الاتنين هيطلعوا [[idle]].`,
            R`نهاية الـ [[for]].`,
            R`نهاية الـ callback والـ [[MutationObserver]].`,
            R`نبدأ نراقب [[chat]]: الأولاد اللي بيتضافوا أو بيتشالوا ([[childList]]) في كل الشجرة ([[subtree]])، والـ attribute [[data-state]] بس ([[attributeFilter]])، ومعاه القيمة القديمة ([[attributeOldValue]]).`,
            R`بنعمل [[li]] جديد. لسه في الذاكرة بس، مش في الصفحة.`,
            R`بنحط فيه نص. التغيير ده مش هيتسجّل، لأن [[msg]] لسه برّه [[chat]] اللي بنراقبه.`,
            R`بنضيفه في آخر [[chat]]: أول record من نوع [[childList]] فيه [[addedNodes]] بعنصر واحد.`,
            R`[[dataset.state]] بيكتب الـ attribute [[data-state="busy"]]: record من نوع [[attributes]] و [[oldValue]] بتاعه [[null]] لأنه مكانش موجود.`,
            R`تغيير تاني لنفس الـ attribute: record تالت، و [[oldValue]] بتاعه [[busy]].`,
            R`تغيير [[title]]: مش هيتسجّل خالص، لأن [[attributeFilter]] فيه [[data-state]] بس.`,
            R`بنشيل الرسالة: record رابع من نوع [[childList]] فيه [[removedNodes]] بعنصر واحد.`,
            R`السطر ده بيطلع **قبل** [[records: 4]]، لأن الـ callback microtask بيستنى الكود اللي شغّال يخلص.`,
            R`observer تاني صغير بيعمل حاجة حقيقية: كل ما رسالة تتضاف، بينزّل الشات لآخره بإنه يخلّي [[scrollTop]] قد [[scrollHeight]]. مش فارق مين ضاف الرسالة، ومش محتاج تفتكر تنادي دالة scroll في كل مكان بيضيف رسايل.`,
          ],
          sol: R`«الكود خلص» بتطلع الأول، وبعدها [[records: 4]] والأربع سطور: [[childList +1 -0]]، و [[data-state null → idle]]، و [[data-state busy → idle]]، و [[childList +0 -1]] (اتجرّب في Chrome 156 و jsdom 30).

لما تضيف [[mo.disconnect()]] كآخر سطر، الـ callback مبيتناداش خالص: الـ disconnect رمى الأربع records اللي كانوا مستنيين الـ microtask. التصليح: [[const pending = mo.takeRecords(); mo.disconnect();]] وبعدين لف على [[pending]] بنفسك، وهتلاقي فيها نفس الأربعة.`
        },
        {
          cmd: "Notification و permissions",
          title: "تبعت إشعار للنظام، وتسأل عن الإذن الأول من غير ما تزعج اليوزر",
          desc: R`[[Notification]] بيطلّع إشعار من النظام نفسه (الركن بتاع ويندوز أو ماك أو أندرويد)، حتى لو التاب مش قدامك. بس لازم اليوزر يوافق الأول: [[Notification.requestPermission()]] بتطلّع سؤال المتصفح، وبترجّع [["granted"]] أو [["denied"]] أو [["default"]] (قفل السؤال من غير ما يختار).

و [[navigator.permissions.query({ name })]] (اسمها Permissions API) بتقولك حالة أي إذن **من غير ما تسأل**: [["granted"]] أو [["denied"]] أو [["prompt"]]، وبتدّيك [[onchange]] لو اتغيّرت. دي نفس الطريقة اللي بتسأل بيها عن الكاميرا والموقع والـ clipboard (الـ Clipboard والـ Share ليهم درس لوحدهم في التاب ده: «Clipboard و Geolocation و Share»).

القاعدة الذهبية: متسألش أول ما الصفحة تفتح. اسأل بعد ضغطة على زرار اليوزر فاهم هو بيعمل إيه. و [["denied"]] مبيتغيّرش من الكود أبدًا: اليوزر بس يغيّره من إعدادات الموقع.`,
          example: R`const btn = document.querySelector("#notify");
const status = await navigator.permissions.query({ name: "notifications" });
console.log("الحالة:", status.state, "| Notification.permission:", Notification.permission);
status.onchange = () => console.log("اتغيرت لـ", status.state);
btn.addEventListener("click", async () => {
  if (!("Notification" in window)) return console.log("المتصفح مبيدعمش");
  if (Notification.permission === "denied") return console.log("اترفض قبل كده: من إعدادات الموقع بس");
  const result = await Notification.requestPermission();
  console.log("الرد:", result);
  if (result !== "granted") return;
  const n = new Notification("طلب جديد", { body: "رقم 42", tag: "order-42", icon: "/icon-192.png" });
  n.onshow = () => console.log("ظهر:", n.title, n.body, n.tag);
  n.onclick = () => { window.focus(); n.close(); };
});`,
          try: R`حط المثال في [[<script type="module">]] (عشان الـ [[await]] اللي برّه أي دالة) مع [[<button id="notify">]]، وافتحه من [[http://localhost]] (بـ [[npx serve]] مثلًا)، لأن الـ service worker في درس الـ push مش هيشتغل غير كده. دوس الزرار ووافق، وبعدين من القفل اللي جنب العنوان ← Site settings ← Notifications خليها Block، وارجع الصفحة ودوس تاني. وجرّب كمان تبعت نفس الإشعار مرتين بنفس الـ [[tag]] وشوف بيظهروا كام واحد.`,
          practice: [
            { lvl: 'سريع', t: R`دوّر بنفسك: من MDN (صفحة [[Permissions.query()]] وصفحة [[Notification.requestPermission()]])، إيه الفرق بين [["prompt"]] و [["default"]]؟ وإيه اللي بيحصل لو ناديت [[requestPermission()]] من غير ضغطة من اليوزر في Firefox و Safari؟`, done: R`كتبت إن الاتنين معناهم «لسه مسألناش» بس [["prompt"]] اسمها في Permissions API و [["default"]] في [[Notification.permission]]، وإن Firefox و Safari بيطلبوا user gesture (ضغطة) وإلا السؤال مبيظهرش، ومعاك لينك الصفحتين.` },
            { lvl: 'تطبيق', t: R`ابني زرار «فعّل الإشعارات» بـ ٣ أشكال حسب الحالة: [["prompt"]] زرار عادي، و [["granted"]] علامة ✓ «الإشعارات شغالة»، و [["denied"]] رسالة بتقول «اتقفلت من إعدادات الموقع» من غير زرار. والشكل بيتغير لوحده بـ [[status.onchange]] لو اليوزر غيّر الإعدادات والصفحة مفتوحة.`, done: R`كل حالة من التلاتة بتطلّع شكلها، وتغيير الإذن من القفل اللي جنب العنوان بيقلب الشكل من غير refresh، وفي حالة [["denied"]] مفيش أي نداء لـ [[requestPermission]] (اتأكد بـ [[console.log]] جواها).` },
            { lvl: 'تحدي', t: R`محاكاة: «مؤقّت بومودورو» بيبعت إشعار بعد ٢٥ دقيقة (خليها ١٠ ثواني وانت بتجرّب)، بس **لو التاب مستخبي بس** ([[document.hidden]] من درس «visibilitychange و bfcache»)، ولو التاب قدامك يطلّع رسالة جوه الصفحة بدل الإشعار. والإشعار بـ [[tag: "pomodoro"]] عشان ميتكوّموش، والضغط عليه يرجّعك للتاب.`, done: R`وانت في التاب مفيش إشعار نظام وفيه رسالة في الصفحة، ولو بدّلت لتاب تاني بيظهر إشعار واحد، وتشغيل المؤقت مرتين ورا بعض بيسيب إشعار واحد بس في مركز الإشعارات (نفس الـ [[tag]] بيبدّل القديم)، والضغط عليه بيجيب التاب قدام.` },
          ],
          flag: "script",
          deep: {
            why: R`الإشعار أقوى طريقة توصل بيها لليوزر وهو مش بيبص على موقعك، وعشان كده أكتر حاجة بتتساء استخدامها. المتصفحات بقت بتخبّي السؤال لو المواقع بتسأل كتير من غير سبب (Chrome بيعمله «quiet UI» جنب العنوان)، واليوزر اللي داس Block مش هيرجع. فالسؤال في الوقت الغلط ممكن يخسّرك الإذن للأبد.`,
            how: R`[[Notification.permission]] قيمة متزامنة بتقرا الحالة دلوقتي. و [[requestPermission()]] بترجّع Promise: لو الحالة [["default"]] بتطلّع السؤال، ولو [["granted"]] أو [["denied"]] بترجّع على طول من غير سؤال (جرّبتها: في [["denied"]] الكود وقف عند الشرط قبل ما يسأل أصلًا).

[[new Notification(title, options)]] بيطلّع الإشعار على طول. أهم الـ options: [[body]] النص، و [[icon]]، و [[tag]] (إشعار جديد بنفس الـ tag بيبدّل القديم بدل ما يتكوّموا)، و [[data]] أي داتا تحتاجها في الضغطة.

[[navigator.permissions.query]] بتاخد [[{ name }]] من لستة أسامي ثابتة ([["notifications"]] و [["geolocation"]] و [["camera"]] و [["clipboard-read"]]...)، واسم غلط بيرمي [[TypeError]]، وبترجّع [[PermissionStatus]] فيه [[state]] و [[onchange]].

الإشعار ده بيشتغل والصفحة مفتوحة بس. عشان يوصل والموقع مقفول محتاج Push API و service worker (درس «push و Background Sync» في وحدة PWA)، وهناك بيبقى [[registration.showNotification]] مش [[new Notification]].`,
            when: R`حاجة اليوزر طلبها بنفسه ومهمة له وهو مش في التاب: رسالة جديدة في شات، أو طلب اتوصّل، أو مؤقت خلص، أو build خلص. ومش للإعلانات ولا «ارجعلنا وحشتنا». ولو اليوزر قدام الصفحة، رسالة جوه الصفحة أحسن من إشعار نظام.`,
            mistakes: R`[[requestPermission()]] أول ما الصفحة تفتح، فاليوزر يرفض من غير ما يفهم. وتفتكر إنك تقدر تسأل تاني بعد [["denied"]]: مش هيظهر حاجة. وتجرّب من الموبايل على [[http://192.168.1.5:3000]] فالـ API مش موجود، لأنه محتاج secure context: HTTPS أو localhost (و Chrome بيعتبر [[file://]] secure كمان: جرّبتها و [[isSecureContext]] طلع [[true]]). و [[new Notification]] على Chrome أندرويد بيرمي [[TypeError: Illegal constructor]] (من الـ docs): هناك لازم [[registration.showNotification]] من service worker. ونسيان الـ [[tag]] فاليوزر يلاقي ٢٠ إشعار لنفس الحاجة.`
          },
          teach: R`## الفكرة في سطر

قبل ما تبعت إشعار لازم تعرف الإذن حالته إيه، ولو لسه مسألتش، تسأل بعد ضغطة زرار. المثال بيعمل التلاتة: يقرا الحالة، ويسمع لو اتغيّرت، ويسأل ويبعت إشعار لما اليوزر يدوس.

جرّبت المثال في Chrome 156 headless (عن طريق playwright-core، من [[http://127.0.0.1]]) في ٣ حالات: إذن لسه متسألش وبعدين اتوافق عليه والصفحة مفتوحة، وإذن مرفوض، وإذن موافق عليه من الأول. الـ playwright بيوافق أو بيرفض مكان اليوزر، فشكل نافذة السؤال نفسها والإشعار على الشاشة **من الـ docs** مش من التجربة.

---

## ١. الحالة من غير ما تسأل: [[navigator.permissions.query]]

~~~text app.js
const status = await navigator.permissions.query({ name: "notifications" });
console.log("الحالة:", status.state, "| Notification.permission:", Notification.permission);
status.onchange = () => console.log("اتغيرت لـ", status.state);
~~~

- [[navigator.permissions]]: الـ Permissions API. فيها دالة واحدة مهمة: [[query]].
- [[{ name: "notifications" }]]: اسم الإذن. الأسامي ثابتة، وأي اسم غلط بيرمي:

~~~text الناتج (Chrome، name: "banana")
TypeError: Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'banana' is not a valid enum value of type PermissionName.
~~~

- [[await]]: [[query]] بترجّع Promise. و [[await]] برّه أي دالة محتاج [[<script type="module">]].
- [[status.state]]: [["granted"]] أو [["denied"]] أو [["prompt"]].
- [[status.onchange]]: بيتنادى لو الحالة اتغيرت والصفحة مفتوحة (اليوزر غيّرها من الإعدادات، أو وافق على السؤال).

جرّبت أسامي تانية في نفس الصفحة:

~~~text الناتج (Chrome 156، إذن مااتسألش)
notifications prompt
geolocation prompt
camera prompt
clipboard-read prompt
push NotSupportedError: Push Permission without userVisibleOnly:true isn't supported yet.
~~~

الـ [["push"]] محتاج [[{ name: "push", userVisibleOnly: true }]]، ودي بتاعة درس الـ push في وحدة PWA.

### [["prompt"]] و [["default"]]: نفس المعنى باسمين

~~~text الناتج
الحالة: prompt | Notification.permission: default
~~~

الاتنين معناهم «لسه مسألناش». الـ Permissions API بتسمّيها [["prompt"]]، و [[Notification.permission]] (الأقدم) بتسمّيها [["default"]]. والتانيين ([["granted"]] و [["denied"]]) نفس الاسم في الاتنين.

## ٢. الزرار: الفحص قبل السؤال

~~~text app.js
btn.addEventListener("click", async () => {
  if (!("Notification" in window)) return console.log("المتصفح مبيدعمش");
  if (Notification.permission === "denied") return console.log("اترفض قبل كده: من إعدادات الموقع بس");
~~~

- [[async]] على الـ listener عشان نقدر نستخدم [[await]] جواه.
- [[("Notification" in window)]]: هل الـ API موجود أصلًا؟ مش موجود على Safari على iPhone غير لو الموقع متسطّب كـ PWA على الشاشة الرئيسية (من الـ docs)، ومش موجود لو الصفحة مش secure context.
- [[return console.log(...)]]: اطبع واخرج من الدالة في سطر واحد.
- [[=== "denied"]]: اليوزر رفض قبل كده. مفيش أي كود يقدر يسأله تاني، فبدل ما تنادي [[requestPermission]] على الفاضي، قوله يغيّرها من الإعدادات.

## ٣. السؤال

~~~text app.js
  const result = await Notification.requestPermission();
  console.log("الرد:", result);
  if (result !== "granted") return;
~~~

- [[requestPermission()]]: لو الحالة [["default"]] بتطلّع نافذة المتصفح «Allow / Block». بترجّع Promise بالرد.
- لو اليوزر قفل النافذة من غير ما يختار، الرد [["default"]] وتقدر تسأل تاني بعدين.
- [[!== "granted"]]: أي حاجة غير الموافقة، خلاص.

ليه السؤال جوه الـ click؟ Firefox و Safari مبيطلّعوش السؤال أصلًا غير بعد ضغطة من اليوزر (user gesture)، و Chrome بيخبّي السؤال في أيقونة صغيرة جنب العنوان (اسمها quiet UI) للمواقع اللي الناس بترفضها كتير (من الـ docs). فالسؤال بعد ضغطة بيشتغل في كله وبيجيب موافقات أكتر.

## ٤. الإشعار نفسه

~~~text app.js
  const n = new Notification("طلب جديد", { body: "رقم 42", tag: "order-42", icon: "/icon-192.png" });
  n.onshow = () => console.log("ظهر:", n.title, n.body, n.tag);
  n.onclick = () => { window.focus(); n.close(); };
~~~

| الـ option | معناه |
|---|---|
| أول argument ([["طلب جديد"]]) | العنوان، بيظهر بخط تقيل |
| [[body]] | السطر اللي تحت العنوان |
| [[tag]] | إشعار جديد بنفس الـ tag بيبدّل القديم بدل ما يتكوّموا جنب بعض |
| [[icon]] | صورة صغيرة جنب الكلام (لو مش موجودة الإشعار بيظهر من غيرها) |

- [[onshow]]: الإشعار ظهر فعلًا.
- [[onclick]]: اليوزر داس عليه. [[window.focus()]] بيجيب التاب قدام، و [[n.close()]] بيشيله من مركز الإشعارات.

## ٥. اللي حصل لما شغّلته

~~~text الناتج (إذن مااتسألش، وبعدين اتوافق عليه والصفحة مفتوحة، وبعدين ضغطة)
الحالة: prompt | Notification.permission: default
اتغيرت لـ granted
الرد: granted
ظهر: طلب جديد رقم 42 order-42
~~~

~~~text الناتج (الإذن مرفوض قبل كده)
الحالة: denied | Notification.permission: denied
اترفض قبل كده: من إعدادات الموقع بس
~~~

~~~text الناتج (موافق عليه من الأول)
الحالة: granted | Notification.permission: granted
الرد: granted
ظهر: طلب جديد رقم 42 order-42
~~~

- في الأولى [[onchange]] اشتغل لوحده أول ما الإذن اتغير، قبل ما ندوس الزرار.
- في التالتة [[requestPermission]] رجّعت [["granted"]] على طول من غير سؤال.

## ٦. الإشعار والموقع مقفول؟

[[new Notification]] بيشتغل بس والصفحة مفتوحة (في أي تاب). عشان إشعار يوصل والمتصفح مش فاتح موقعك، محتاج service worker و Push API، وهناك بتستخدم [[registration.showNotification(...)]] من جوه الـ service worker. ده درس «push و Background Sync» في وحدة PWA. وعلى Chrome أندرويد، [[new Notification]] من الصفحة نفسها بيرمي [[TypeError: Illegal constructor]] وبيقولك تستخدم [[showNotification]] (من الـ docs).

---

## الخلاصة

| الحاجة | بترجّع | بتسأل اليوزر؟ |
|---|---|---|
| [[Notification.permission]] | [["default"]] أو [["granted"]] أو [["denied"]] على طول | لأ، بتقرا الحالة بس |
| [[navigator.permissions.query({ name })]] | Promise بـ [[state]] و [[onchange]] | لأ، وبتشتغل لأي إذن |
| [[Notification.requestPermission()]] | Promise بالرد | آه، لو الحالة لسه [["default"]] |
| [[new Notification(title, opts)]] | الإشعار، ومعاه [[onclick]] و [[close()]] | لأ، ولازم الإذن [["granted"]] |

- اسأل بعد ضغطة، مش أول ما الصفحة تفتح.
- [["denied"]] نهائي من ناحية الكود: وجّه اليوزر للإعدادات.
- محتاج HTTPS أو localhost، و [[tag]] عشان الإشعارات متتكوّمش.`,
          lines: [
            R`الزرار اللي اليوزر هيدوس عليه عشان يفعّل الإشعارات. السؤال لازم يطلع من ضغطة عليه، مش لوحده.`,
            R`بنسأل الـ Permissions API عن حالة إذن الإشعارات **من غير** ما نطلّع أي سؤال لليوزر. [[await]] هنا برّه أي دالة، فالـ script لازم يكون [[type="module"]].`,
            R`بنطبع الحالة بالطريقتين: [[status.state]] بتقول [["prompt"]] لو لسه مسألناش، و [[Notification.permission]] بتقول نفس المعنى بكلمة [["default"]].`,
            R`[[onchange]] بيتنادى لو الإذن اتغيّر والصفحة مفتوحة، سواء اليوزر وافق على السؤال أو غيّرها من إعدادات الموقع. فتقدر تحدّث شكل الزرار لوحده.`,
            R`بنسمع للضغطة، و [[async]] عشان هنستنى رد السؤال بـ [[await]] جوه.`,
            R`لو المتصفح مفيهوش [[Notification]] أصلًا (Safari على iPhone من غير ما الموقع يتسطّب، أو صفحة مش HTTPS) بنطبع رسالة ونخرج بدل ما الكود يقع.`,
            R`لو اليوزر رفض قبل كده، مفيش كود يقدر يسأله تاني: [[requestPermission]] هترجّع [["denied"]] من غير ما يظهر حاجة. فبنقوله يغيّرها من الإعدادات ونخرج.`,
            R`بنطلّع سؤال المتصفح «Allow / Block» ونستنى الرد. لو الحالة كانت [["granted"]] خلاص بترجّع على طول من غير سؤال.`,
            R`بنطبع الرد: [["granted"]] أو [["denied"]] أو [["default"]] لو اليوزر قفل النافذة من غير ما يختار.`,
            R`أي رد غير الموافقة، بنخرج ومبنحاولش نبعت إشعار (كان هيترمي أو ميظهرش).`,
            R`بنطلّع الإشعار: العنوان، و [[body]] السطر اللي تحته، و [[tag]] اللي بيخلّي إشعار تاني بنفس الاسم يبدّل ده بدل ما يتكوّموا، و [[icon]] صورة صغيرة.`,
            R`[[onshow]] بيتنادى لما الإشعار يظهر فعلًا، وبنطبع العنوان والنص والـ tag عشان نتأكد إنهم وصلوا صح.`,
            R`لما اليوزر يدوس على الإشعار: [[window.focus()]] بيجيب التاب بتاعنا قدام، و [[n.close()]] بيشيل الإشعار من مركز الإشعارات.`,
            R`نهاية الـ click listener.`,
          ],
          sol: R`اتجرّب في Chrome 156 headless من [[http://127.0.0.1]] (playwright بيوافق ويرفض مكانك): أول تحميل بيطبع [[الحالة: prompt | Notification.permission: default]]، ولما الإذن اتوافق عليه والصفحة مفتوحة [[onchange]] طبع [[اتغيرت لـ granted]]، والضغطة طبعت [[الرد: granted]] وبعدها [[ظهر: طلب جديد رقم 42 order-42]]. ولما الإذن مرفوض الضغطة طبعت [[اترفض قبل كده: من إعدادات الموقع بس]] ومسألتش.

شكل نافذة السؤال والإشعار على الشاشة، وإن إشعارين بنفس الـ [[tag]] بيبقوا واحد في مركز الإشعارات، من الـ docs (MDN: Notification و Notification.tag)، لأن الـ headless مبيرسمش إشعارات حقيقية. ولو فتحتها من الموبايل على IP الجهاز بـ [[http]]، [[Notification]] مش هيبقى موجود أصلًا لأن الصفحة مش secure context، فشرط [["Notification" in window]] هو اللي هيشتغل.`
        }
      ]
    }
]);

// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "APIs المتصفح",
      l: 3,
      n: "IntersectionObserver و ResizeObserver، ورفع الملفات بمعاينة و progress، ودورة حياة الصفحة و bfcache، و pushState",
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
            "الليستة.",
            "عنصر فاضي في آخرها: لما يظهر نحمّل.",
            "رقم الصفحة، وحماية من طلبين مع بعض، ووقفة لما الداتا تخلص.",
            "دالة التحميل.",
            "بيحمّل فعلًا أو خلصنا: متعملش حاجة.",
            "علّم إننا بنحمّل.",
            R`[[try/finally]] عشان loading يرجع false مهما حصل.`,
            "الصفحة الحالية.",
            "حوّل الرد لـ array.",
            "ليستة فاضية: مفيش أكتر.",
            "ضيف كل بوست.",
            "عنصر لكل بوست.",
            "بـ textContent: آمن.",
            "ضيفه.",
            "قفلة.",
            "الصفحة الجاية المرة الجاية.",
            R`[[finally]]: بيتنفذ في النجاح والفشل.`,
            "افتح الباب لتحميل جديد.",
            "قفلة.",
            R`الفخ: لو الـ sentinel لسه ظاهر، الـ observer مش هيبلّغ تاني. ده بيجبره يبلّغ بالحالة الحالية.`,
            "قفلة.",
            "الـ observer.",
            R`[[isIntersecting]]: الـ sentinel دخل المنطقة.`,
            R`[[rootMargin]]: ابدأ قبل الآخر بـ ٣٠٠ بكسل.`,
            "ابدأ المراقبة (وبيتنادى مرة فورًا بالحالة الحالية).",
            "observer تاني للأنيميشن.",
            "ممكن كذا عنصر في نفس الـ callback.",
            "مش ظاهر: عدّي.",
            R`ضيف الكلاس (والـ CSS فيه transition).`,
            "بطّل تراقبه: الأنيميشن مرة واحدة.",
            "قفلة.",
            "لما ٢٠٪ منه يظهر.",
            R`راقب كل العناصر اللي عليها [[.reveal]].`
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
            "الكارت.",
            "observer واحد ينفع لكذا عنصر.",
            "كل عنصر اتغير مقاسه.",
            "العرض الجديد.",
            R`[[data-size]] يستخدمه الـ CSS: [[.card[data-size="s"]]].`,
            "قفلة الـ loop.",
            "قفلة.",
            "ابدأ المراقبة.",
            "canvas.",
            R`راقب الأب، و [[[entry]]] بتاخد أول entry.`,
            "مقاسه بالـ CSS pixels.",
            R`بالبكسلات الحقيقية: [[devicePixelRatio]] 2 أو 3 على الموبايل.`,
            "والطول.",
            "تغيير المقاس بيمسح الرسمة، فارسم تاني.",
            "راقب أب الـ canvas.",
            "رسمة بسيطة.",
            "الـ context بتاع الرسم 2D.",
            "ربع المساحة.",
            "قفلة."
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
            "الـ input.",
            "مكان المعاينة.",
            "٢ ميجا بالبايت.",
            "الـ URLs المؤقتة عشان نمسحها بعدين.",
            R`[[change]]: اليوزر اختار ملفات.`,
            "امسح الـ URLs القديمة من الذاكرة.",
            "وفضّي الليستة.",
            "وامسح المعاينات القديمة.",
            R`[[input.files]]: ليستة File.`,
            R`مش صورة (الـ accept اقتراح بس): عدّي.`,
            R`[[size]] بالبايت.`,
            R`رسالة كنص: [[append]] بنص آمن زي textContent.`,
            "وكمّل للملف اللي بعده.",
            "قفلة.",
            R`[[blob:...]]: الصورة من الديسك من غير رفع.`,
            "احفظه عشان revoke.",
            "img جديد.",
            "الـ src هو الـ blob URL.",
            "alt باسم الملف (property مش HTML، فآمن).",
            "عرض المعاينة.",
            "اعرضه.",
            "قفلة الـ loop.",
            "قفلة."
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
            "منطقة الإفلات.",
            R`[[<progress>]]: قيمته من 0 لـ 1.`,
            "وانت ساحب فوقها.",
            R`لازم: من غيرها الـ drop مش هيحصل.`,
            "شكل «سيبه هنا».",
            "قفلة.",
            "خرج برّه: رجّع الشكل.",
            "أفلت.",
            "امنع المتصفح يفتح الملف.",
            "رجّع الشكل.",
            R`[[dataTransfer.files]]: نفس [[input.files]].`,
            "قفلة.",
            "الرفع.",
            "multipart body.",
            R`الملف تحت اسم [[file]] (زي ما multer مستنيه).`,
            "XHR عشان الـ progress.",
            "POST على الـ endpoint.",
            R`[[upload.onprogress]]: اترفع كام من كام.`,
            "حدّث الشريط.",
            "قفلة.",
            R`[[onload]]: السيرفر رد (ممكن 4xx، افحص status).`,
            R`[[onerror]]: مشكلة شبكة.`,
            "ابعت.",
            "قفلة."
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
| [[Object.fromEntries(...)]] | حوّلها object: [[{ title: "...", body: "..." }]] |
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
| [[visibilitychange: hidden]] + beacon | المسودة اتبعتت |
| [[visibilitychange: visible]] | رجعت |
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
            "الفورم.",
            "دالة التحذير (باسم عشان نقدر نشيلها).",
            "الطريقة الحديثة.",
            "للمتصفحات القديمة.",
            "قفلة.",
            "أول ما يكتب: فعّل التحذير (إضافة نفس الدالة مرتين مبتعملش حاجة).",
            "اتحفظ: شيل التحذير.",
            "التاب اتخفى أو ظهر.",
            "يهمنا لما يتخفى بس.",
            "المسودة كـ JSON.",
            R`[[sendBeacon]]: بيكمّل حتى لو الصفحة اتقفلت.`,
            "قفلة.",
            "الصفحة ظهرت.",
            R`[[persisted]]: رجعت من الـ bfcache، مش تحميل جديد.`,
            "قفلة.",
            R`[[pagehide]] بدل unload.`
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
            "المكان اللي هنرسم فيه.",
            "الصفحات: path ← محتوى.",
            "ارسم حسب الـ path.",
            R`[[??]] للـ 404.`,
            "والعنوان في التاب.",
            "قفلة.",
            "listener واحد للّينكات كلها (event delegation).",
            R`لينك داخلي عليه [[data-link]].`,
            "مش لينك، أو Ctrl/Cmd/Shift/زرار تاني: سيبه للمتصفح.",
            "امنع التحميل.",
            R`الـ path من اللينك (href بيبقى URL كامل).`,
            "نفس الصفحة: متضيفش خطوة.",
            "غيّر الـ URL وضيف خطوة في الـ history.",
            "ارسم بنفسك: pushState مبيعملش حاجة تانية.",
            "قفلة.",
            R`back/forward: ارسم الـ path الجديد.`,
            "أول تحميل (أو refresh على أي path)."
          ],
          sol: R`مع [[serve -s]]: التنقل من غير تحميل (Network مفيهاش طلبات HTML جديدة)، و back/forward بيغيّروا المحتوى والعنوان، و refresh على [[/about]] بيرجّع «عننا» لأن السيرفر رجّع index.html والسطر الأخير رسم الـ path.

من غير [[-s]]: refresh على [[/about]] بيطلع 404 من السيرفر نفسه، والـ JS بتاعك مشتغلش أصلًا. ده أشهر bug بعد نشر SPA، والحل في السيرفر مش في الـ JS.

Ctrl+Click بيفتح تاب جديد عادي لأن الشرط سابه للمتصفح، والتاب الجديد بيطلب [[/about]] من السيرفر (فمحتاج [[-s]] برضه).`
        }
      ]
    }
]);

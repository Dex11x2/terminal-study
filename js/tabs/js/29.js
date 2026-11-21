// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "APIs المتصفح",
      l: 3,
      n: "IntersectionObserver و ResizeObserver و MutationObserver، ورفع الملفات بمعاينة و progress، ودورة حياة الصفحة و bfcache، و pushState، والإشعارات و Permissions API",
      pre: [
        { to: "js/window و navigator و document", why: R`كل API هنا معلّق على [[window]] أو [[navigator]] أو [[document]]` },
        { to: "js/event delegation", why: R`listener واحد على الأب للكروت واللينكات، في أغلب التمارين` },
        { to: "js/fetch و AbortController", why: R`الـ feed والرفع بيستخدموا timeout وإلغاء` },
        { to: "js/Web Storage: localStorage و sessionStorage", why: R`المسودات والمكان اللي وقفت فيه، ومع try لأن التخزين ممكن يبقى ممنوع` },
        { to: "js/microtasks و macrotasks", why: R`الـ MutationObserver بيسلّم التغييرات في microtask، وده سبب نصّ تمارينه` },
      ],
      projects: [
        { lvl: 'صغير', dir: "back-to-top", t: R`زرار «ارجع لفوق» من غير scroll listener`, what: R`div صغير في أول الصفحة عليه [[IntersectionObserver]] (درس ١): لما يخرج من الشاشة يظهر زرار «لفوق» ثابت في الركن، ولما يرجع يختفي. والزرار بيعمل [[scrollTo({ top: 0, behavior: "smooth" })]].`, done: R`الزرار مش ظاهر وانت في أول الصفحة، بيظهر بعد ما تنزل شوية ويختفي لما ترجع، ومفيش ولا [[addEventListener("scroll")]] في الكود، و Performance في DevTools مفيهوش شغل JS مستمر وانت بتعمل scroll.`, sol: R`## الشكل النهائي

~~~view 420
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقالة طويلة</title>
<style>
  body { font: 16px/1.8 system-ui, sans-serif; margin: 0; }
  main { max-width: 640px; margin: 0 auto; padding: 16px; }
  #top-sentinel { position: absolute; top: 0; width: 1px; height: 400px; pointer-events: none; }   /* أول 400px من الصفحة */
  #to-top {
    position: fixed; inset-inline-end: 16px; bottom: 16px;
    font: inherit; padding: 10px 14px; border: 0; border-radius: 999px;
    background: #1d4ed8; color: #fff; box-shadow: 0 2px 8px #0003;
    opacity: 0; transform: translateY(12px); pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  #to-top.show { opacity: 1; transform: none; pointer-events: auto; }
  @media (prefers-reduced-motion: reduce) { #to-top { transition: none; } }
</style>
</head>
<body>
<div id="top-sentinel"></div>
<main>
  <h1>إزاي تذاكر برمجة كل يوم</h1>
  <p>اقرا الفقرة دي وانزل لتحت. الزرار هيظهر في الركن بعد ما تنزل حوالي 400px.</p>
</main>
<button id="to-top" aria-label="ارجع لأول الصفحة" tabindex="-1">↑ لفوق</button>
<script>
  // محتوى طويل للتجربة
  const main = document.querySelector("main");
  for (let i = 1; i <= 30; i++) main.insertAdjacentHTML("beforeend", $__bt<p>فقرة $__{i}: خصّص وقت ثابت، واكتب كود بإيدك، وراجع اللي فات قبل ما تبدأ الجديد.</p>$__bt);

  const btn = document.querySelector("#to-top");
  const sentinel = document.querySelector("#top-sentinel");

  new IntersectionObserver(([entry]) => {
    const show = !entry.isIntersecting;            // أول الصفحة خرج من الشاشة
    btn.classList.toggle("show", show);
    btn.tabIndex = show ? 0 : -1;                  // مخفي = مش في ترتيب Tab
  }, { root: document }).observe(sentinel);

  btn.addEventListener("click", () => {
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  });
</script>
</body>
</html>
~~~

**هتشوف إيه:** مقالة طويلة. انزل جوه الصفحة اللي فوق: بعد حوالي 400px زرار «↑ لفوق» بيظهر في الركن بحركة خفيفة، والضغط عليه بيطلعك لأول الصفحة بنعومة والزرار بيختفي.

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقالة طويلة</title>
<style>
  body { font: 16px/1.8 system-ui, sans-serif; margin: 0; }
  main { max-width: 640px; margin: 0 auto; padding: 16px; }
  #top-sentinel { position: absolute; top: 0; width: 1px; height: 400px; pointer-events: none; }   /* أول 400px من الصفحة */
  #to-top {
    position: fixed; inset-inline-end: 16px; bottom: 16px;
    font: inherit; padding: 10px 14px; border: 0; border-radius: 999px;
    background: #1d4ed8; color: #fff; box-shadow: 0 2px 8px #0003;
    opacity: 0; transform: translateY(12px); pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  #to-top.show { opacity: 1; transform: none; pointer-events: auto; }
  @media (prefers-reduced-motion: reduce) { #to-top { transition: none; } }
</style>
</head>
<body>
<div id="top-sentinel"></div>
<main>
  <h1>إزاي تذاكر برمجة كل يوم</h1>
  <p>اقرا الفقرة دي وانزل لتحت. الزرار هيظهر في الركن بعد ما تنزل حوالي 400px.</p>
</main>
<button id="to-top" aria-label="ارجع لأول الصفحة" tabindex="-1">↑ لفوق</button>
<script>
  // محتوى طويل للتجربة
  const main = document.querySelector("main");
  for (let i = 1; i <= 30; i++) main.insertAdjacentHTML("beforeend", $__bt<p>فقرة $__{i}: خصّص وقت ثابت، واكتب كود بإيدك، وراجع اللي فات قبل ما تبدأ الجديد.</p>$__bt);

  const btn = document.querySelector("#to-top");
  const sentinel = document.querySelector("#top-sentinel");

  new IntersectionObserver(([entry]) => {
    const show = !entry.isIntersecting;            // أول الصفحة خرج من الشاشة
    btn.classList.toggle("show", show);
    btn.tabIndex = show ? 0 : -1;                  // مخفي = مش في ترتيب Tab
  }, { root: document }).observe(sentinel);

  btn.addEventListener("click", () => {
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  });
</script>
</body>
</html>
~~~

## الشرح

- **[[#top-sentinel]]:** عنصر شفاف [[position: absolute]] في أول الصفحة طوله 400px. مش بيبان ومش بياخد مكان في المقالة. الـ observer بيسأل سؤال واحد: «العنصر ده لسه ظاهر؟».
- **[[!entry.isIntersecting]]:** لما آخر جزء من الـ 400px يطلع من فوق الشاشة، الـ callback بيتنادى مرة وبيظهر الزرار. ولما ترجع، بيتنادى مرة تانية ويخفيه. مفيش حسابات مع كل scroll.
- **[[root: document]]:** عشان يشتغل كمان وهو جوه iframe من origin تاني زي الـ preview (من غيره الـ observer بيحسب على شاشة الصفحة اللي برا). في صفحة عادية نفس النتيجة.
- **[[tabIndex = show ? 0 : -1]] و [[pointer-events: none]]:** الزرار المخفي بالـ [[opacity]] لسه موجود، فلو مقفلناش الـ Tab عليه، اللي بيستخدم الكيبورد هيوصل لزرار مش شايفه.
- **[[aria-label]]:** النص «↑ لفوق» فيه سهم، والـ label بيقول لقارئ الشاشة الزرار بيعمل إيه بالظبط.
- **[[prefers-reduced-motion]]:** اللي مفعّل «قلّل الحركة» في النظام بيروح لفوق على طول ([[behavior: "auto"]]) ومن غير transition.

## اتقاس

~~~text الناتج (Chrome 158 headless، 400×700، مرة من http://localhost ومرة جوه iframe معزول زي الـ preview)
scroll listeners في الكود: 0
[localhost] أول الصفحة: show=false scrollY=0
[localhost] نزلنا 300px: show=false scrollY=300
[localhost] نزلنا 1500px: show=true scrollY=1500
[localhost] بعد الضغط على الزرار: show=false scrollY=0
[sandbox] أول الصفحة: show=false scrollY=0
[sandbox] نزلنا 300px: show=false scrollY=300
[sandbox] نزلنا 1500px: show=true scrollY=1500
[sandbox] بعد الضغط على الزرار: show=false scrollY=0
41 scroll من 0 لـ 4000: الزرار اتغيّر 1 مرة
pageerrors: 0
~~~

السطر قبل الأخير هو البديل بتاعنا لـ Performance في DevTools: عملنا scroll ٤١ مرة (كل 100px وفريمين بين كل واحدة)، والـ [[class]] بتاع الزرار اتغيّر **مرة واحدة** بس (لما عدّى الـ 400px). الـ callback مبيشتغلش غير لما الحالة تتغيّر، فمفيش شغل JS مستمر وانت بتعمل scroll. افتح Performance وسجّل وانت بتعمل scroll وهتلاقي مفيش [[Function Call]] من الصفحة غير لحظة الظهور والاختفاء.

## اللي حصل وإحنا بنبنيه

أول نسخة كان الـ sentinel طوله 1px، فالزرار ظهر بعد أول 1px من الـ scroll (القياس قال [[show=true]] عند 50px). زرار بيظهر وانت لسه بتقرا أول سطر مزعج، فبقى طول الـ sentinel هو المسافة اللي عايزها (400px)، من غير أي رقم في الـ JS.

**الغلطة الشائعة:** [[addEventListener("scroll", () => btn.hidden = scrollY < 400)]]. بيشتغل، بس بيتنادى عشرات المرات في الثانية على كل الأجهزة، وده اللي الـ observer معمول عشان تستغنى عنه.` },
        { lvl: 'صغير', dir: "avatar-picker", t: R`اختيار صورة البروفايل`, what: R`[[<input type="file" accept="image/*">]] لصورة واحدة (درس ٣): معاينة في دايرة بـ [[URL.createObjectURL]]، ورفض أي ملف أكبر من 1MB أو مش صورة فعلًا (أول bytes بتوعه مش PNG ولا JPEG)، و [[revokeObjectURL]] للقديمة كل ما تختار جديدة.`, done: R`صورة PNG أو JPEG بتظهر في الدايرة، وملف [[.txt]] اتغيّر اسمه لـ [[.png]] بيترفض برسالة مع إن [[file.type]] بتاعه [[image/png]]، والملف الكبير بيترفض ومعاه حجمه بالـ MB، واختيار ٥ صور ورا بعض بيسيب blob URL واحد بس شغال.`, sol: R`## الشكل النهائي

~~~view 200
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صورة البروفايل</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  .picker { display: flex; align-items: center; gap: 16px; }
  .avatar { width: 112px; height: 112px; border-radius: 50%; background: #e5e7eb center / cover no-repeat; display: grid; place-items: center; color: #6b7280; font-size: 40px; overflow: hidden; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  label.btn { display: inline-block; padding: 8px 14px; border-radius: 8px; background: #1d4ed8; color: #fff; cursor: pointer; }
  label.btn:focus-within { outline: 3px solid #93c5fd; }
  #file { position: absolute; opacity: 0; width: 1px; height: 1px; }
  #msg { min-height: 1.6em; }
  #msg.err { color: #b91c1c; }
  #msg.ok { color: #065f46; }
</style>
</head>
<body>
<div class="picker">
  <div class="avatar" id="avatar" aria-hidden="true">👤</div>
  <div>
    <label class="btn">اختار صورة <input type="file" id="file" accept="image/png,image/jpeg"></label>
    <p id="msg" role="status">PNG أو JPEG، 1MB بالكتير.</p>
  </div>
</div>
<script>
  const MAX = 1024 * 1024;
  const input = document.querySelector("#file");
  const avatar = document.querySelector("#avatar");
  const msg = document.querySelector("#msg");
  let currentUrl = null;                       // الـ blob URL الشغال دلوقتي

  async function sniffImage(file) {
    const b = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    if (b.length >= 4 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
    if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
    return null;
  }

  function say(text, kind) {
    msg.textContent = text;
    msg.className = kind;
  }

  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;
    if (file.size > MAX) {
      say($__btالصورة $__{(file.size / 1024 / 1024).toFixed(1)}MB، والحد 1MB.$__bt, "err");
      input.value = "";                        // عشان اختيار نفس الملف تاني يعمل change
      return;
    }
    const kind = await sniffImage(file);
    if (!kind) {
      say($__bt«$__{file.name}» مش صورة PNG ولا JPEG (حتى لو امتداده بيقول كده).$__bt, "err");
      input.value = "";
      return;
    }
    if (currentUrl) URL.revokeObjectURL(currentUrl);   // القديمة مبقتش محتاجينها
    currentUrl = URL.createObjectURL(file);
    const img = new Image();
    img.alt = "صورة البروفايل";
    img.src = currentUrl;
    avatar.replaceChildren(img);
    say($__btتمام: $__{kind.toUpperCase()}، $__{(file.size / 1024).toFixed(0)}KB.$__bt, "ok");
  });
</script>
</body>
</html>
~~~

**هتشوف إيه:** دايرة فاضية فيها 👤 وزرار «اختار صورة». اختار PNG أو JPEG من جهازك (جوه الـ preview اللي فوق شغال) وهتظهر في الدايرة. ملف نصي اسمه [[.png]] بيترفض برسالة، وصورة أكبر من 1MB بتترفض ومعاها حجمها.

## الكود

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صورة البروفايل</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  .picker { display: flex; align-items: center; gap: 16px; }
  .avatar { width: 112px; height: 112px; border-radius: 50%; background: #e5e7eb center / cover no-repeat; display: grid; place-items: center; color: #6b7280; font-size: 40px; overflow: hidden; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; }
  label.btn { display: inline-block; padding: 8px 14px; border-radius: 8px; background: #1d4ed8; color: #fff; cursor: pointer; }
  label.btn:focus-within { outline: 3px solid #93c5fd; }
  #file { position: absolute; opacity: 0; width: 1px; height: 1px; }
  #msg { min-height: 1.6em; }
  #msg.err { color: #b91c1c; }
  #msg.ok { color: #065f46; }
</style>
</head>
<body>
<div class="picker">
  <div class="avatar" id="avatar" aria-hidden="true">👤</div>
  <div>
    <label class="btn">اختار صورة <input type="file" id="file" accept="image/png,image/jpeg"></label>
    <p id="msg" role="status">PNG أو JPEG، 1MB بالكتير.</p>
  </div>
</div>
<script>
  const MAX = 1024 * 1024;
  const input = document.querySelector("#file");
  const avatar = document.querySelector("#avatar");
  const msg = document.querySelector("#msg");
  let currentUrl = null;                       // الـ blob URL الشغال دلوقتي

  async function sniffImage(file) {
    const b = new Uint8Array(await file.slice(0, 4).arrayBuffer());
    if (b.length >= 4 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
    if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
    return null;
  }

  function say(text, kind) {
    msg.textContent = text;
    msg.className = kind;
  }

  input.addEventListener("change", async () => {
    const file = input.files[0];
    if (!file) return;
    if (file.size > MAX) {
      say($__btالصورة $__{(file.size / 1024 / 1024).toFixed(1)}MB، والحد 1MB.$__bt, "err");
      input.value = "";                        // عشان اختيار نفس الملف تاني يعمل change
      return;
    }
    const kind = await sniffImage(file);
    if (!kind) {
      say($__bt«$__{file.name}» مش صورة PNG ولا JPEG (حتى لو امتداده بيقول كده).$__bt, "err");
      input.value = "";
      return;
    }
    if (currentUrl) URL.revokeObjectURL(currentUrl);   // القديمة مبقتش محتاجينها
    currentUrl = URL.createObjectURL(file);
    const img = new Image();
    img.alt = "صورة البروفايل";
    img.src = currentUrl;
    avatar.replaceChildren(img);
    say($__btتمام: $__{kind.toUpperCase()}، $__{(file.size / 1024).toFixed(0)}KB.$__bt, "ok");
  });
</script>
</body>
</html>
~~~

## الشرح

- **[[<label class="btn">]] حوالين الـ [[input]]:** الـ input نفسه مخفي بصريًا (مش [[display: none]]، عشان يفضل بيوصله الكيبورد وقارئ الشاشة)، والـ label هو اللي بيبان. الضغط على الـ label بيفتح اختيار الملفات، و [[:focus-within]] بيرسم إطار لما الـ input ياخد focus بالـ Tab.
- **[[accept="image/png,image/jpeg"]]:** بيفلتر نافذة الاختيار بس، واليوزر يقدر يختار «All files». فالفحص الحقيقي بعده.
- **الحجم الأول:** أرخص فحص (رقم موجود في [[file.size]] من غير قراية). [[(file.size / 1024 / 1024).toFixed(1)]] بيكتب الحجم بالـ MB.
- **[[sniffImage]]:** أول ٤ bytes من الملف، نفس دالة تمرين «input type=file». ملف نصي اسمه [[notes.png]] نوعه [[image/png]] عند المتصفح (قسناها في التمرين ده: النوع بييجي من الامتداد)، بس الـ bytes بتقول الحقيقة.
- **[[input.value = ""]] بعد الرفض:** من غيره، لو اليوزر اختار نفس الملف تاني بعد ما صغّره بنفس الاسم، الـ [[change]] مش هيحصل لأن القيمة متغيرتش.
- **[[URL.revokeObjectURL(currentUrl)]] قبل الجديد:** كل [[createObjectURL]] بيخلّي المتصفح ماسك الملف في الميموري لحد ما الصفحة تتقفل أو تعمل [[revoke]]. اختيار ٥٠ صورة ورا بعض من غيره = ٥٠ ملف محجوزين.
- **الصورة القديمة بتفضل لو الجديدة اترفضت:** الـ [[revoke]] والتبديل بيحصلوا بعد ما الفحص ينجح بس.

## اتقاس

٣ صور اتعملت بـ canvas واتحفظت على الديسك ([[me.png]] 7KB، و [[me.jpg]] 17KB، و [[big.png]] 2.5MB) وملف نصي اسمه [[notes.png]]، واتختاروا بالترتيب في الصفحة جوه iframe معزول زي الـ preview. ولفّينا [[createObjectURL]] و [[revokeObjectURL]] عشان نعدّ الـ URLs اللي لسه شغالة:

~~~text الناتج (Chrome 158 headless)
me.png     | تمام: PNG، 7KB. | file.type: image/png | في الدايرة: صورة
notes.png  | «notes.png» مش صورة PNG ولا JPEG (حتى لو امتداده بيقول كده). | file.type: (اتمسح) | في الدايرة: صورة
big.png    | الصورة 2.5MB، والحد 1MB. | file.type: (اتمسح) | في الدايرة: صورة
me.jpg     | تمام: JPEG، 17KB. | file.type: image/jpeg | في الدايرة: صورة
بعد ٥ اختيارات ورا بعض: blob URLs شغالة = 1
pageerrors: 0
~~~

[[(اتمسح)]] معناها إن [[input.value = ""]] اشتغل بعد الرفض، و «في الدايرة: صورة» بعد الرفض هي الصورة اللي قبلها لسه موجودة.

**الغلطة الشائعة:** [[avatar.style.backgroundImage = $__bturl($__{URL.createObjectURL(file)})$__bt]] من غير ما تمسك الـ URL في متغير. بيشتغل، بس مفيش أي طريقة تعمل له [[revoke]] بعد كده.` },
        { lvl: 'متوسط', dir: "image-uploader", t: R`رافع صور كامل`, what: R`منطقة سحب وإفلات (درس ٤) وجواها [[<label>]] و [[<input type="file" multiple>]] للي مش بيستخدم ماوس (درس ٣)، ومعاينة لكل صورة ومعاها حجمها ومقاسها، وفحص النوع والحجم قبل أي رفع، وشريط تقدم وزرار إلغاء لكل ملف لوحده بـ [[XMLHttpRequest]]، على سيرفر Express فيه multer على localhost.`, done: R`تسحب ٤ صور منهم واحدة كبيرة: ٣ بيترفعوا كل واحد بشريطه والكبيرة بتترفض قبل ما تتبعت (مفيش request ليها في Network)، والإلغاء بيوقّف ملف واحد بس والباقي يكمّل، و Tab ثم Enter بيفتح اختيار الملفات من غير ماوس، والشكل مبيرعشش وانت بتسحب فوق الصور اللي جوه المنطقة.`, sol: R`## الشكل النهائي

~~~view 420
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ارفع صورك</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; max-width: 720px; }
  #drop { border: 3px dashed #9ca3af; border-radius: 12px; padding: 28px; text-align: center; }
  #drop.over { border-color: #2563eb; background: #eff6ff; }
  #drop label { color: #1d4ed8; text-decoration: underline; cursor: pointer; }
  #drop input { position: absolute; opacity: 0; width: 1px; height: 1px; }
  #drop:focus-within { outline: 3px solid #93c5fd; }
  #list { list-style: none; padding: 0; display: grid; gap: 8px; margin-top: 16px; }
  #list li { display: grid; grid-template-columns: 64px 1fr auto; gap: 12px; align-items: center; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; }
  #list img { width: 64px; height: 64px; object-fit: cover; border-radius: 6px; background: #f3f4f6; }
  #list progress { width: 100%; }
  .err { color: #b91c1c; }
  .ok { color: #065f46; }
  #note { font-size: 13px; color: #92400e; }
</style>
</head>
<body>
<h1>ارفع صورك</h1>
<div id="drop">
  <p>اسحب الصور هنا أو <label for="files">اختار من جهازك</label></p>
  <input type="file" id="files" accept="image/png,image/jpeg,image/webp" multiple>
  <p>PNG أو JPEG أو WebP، 2MB بالكتير للصورة.</p>
</div>
<p id="note"></p>
<ul id="list"></ul>
<script>
  const MAX = 2 * 1024 * 1024;
  const OFFLINE = location.origin === "null";      // الـ preview: مفيش سيرفر
  if (OFFLINE) document.querySelector("#note").textContent = "مفيش سيرفر هنا (صفحة معزولة): الفحص والمعاينة شغالين، والرفع هيفشل. شغّل node server.js.";
  const list = document.querySelector("#list");
  const drop = document.querySelector("#drop");
  const input = document.querySelector("#files");

  async function sniff(file) {
    const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
    if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
    if (String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP") return "webp";
    return null;
  }

  function row(file) {
    const li = document.createElement("li");
    li.innerHTML = '<img alt=""><div><strong></strong><div class="meta"></div><progress max="1" value="0" hidden></progress><div class="status" role="status"></div></div><button type="button" hidden>إلغاء</button>';
    li.querySelector("strong").textContent = file.name;
    list.append(li);
    return {
      li, img: li.querySelector("img"), meta: li.querySelector(".meta"), bar: li.querySelector("progress"),
      status: li.querySelector(".status"), cancel: li.querySelector("button"),
    };
  }

  function uploadFile(file, ui) {
    const fd = new FormData();
    fd.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    ui.bar.hidden = false;
    ui.cancel.hidden = false;
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) ui.bar.value = e.loaded / e.total; };
    xhr.onload = () => {
      ui.cancel.hidden = true;
      if (xhr.status === 201) { ui.bar.value = 1; ui.status.textContent = "اترفعت"; ui.status.className = "status ok"; }
      else { ui.status.textContent = "السيرفر رفضها (" + xhr.status + ")"; ui.status.className = "status err"; }
    };
    xhr.onerror = () => { ui.cancel.hidden = true; ui.status.textContent = "النت وقع، جرّب تاني"; ui.status.className = "status err"; };
    xhr.onabort = () => { ui.cancel.hidden = true; ui.status.textContent = "اتلغت"; ui.status.className = "status err"; };
    ui.cancel.addEventListener("click", () => xhr.abort(), { once: true });   // يلغي الملف ده بس
    xhr.send(fd);
  }

  async function handle(files) {
    for (const file of files) {
      const ui = row(file);
      const kind = await sniff(file);
      if (!kind) { ui.status.textContent = "مش صورة PNG/JPEG/WebP، اترفضت"; ui.status.className = "status err"; continue; }
      if (file.size > MAX) { ui.status.textContent = $__bt$__{(file.size / 1024 / 1024).toFixed(1)}MB أكبر من 2MB، اترفضت قبل الرفع$__bt; ui.status.className = "status err"; continue; }
      const url = URL.createObjectURL(file);
      ui.img.src = url;
      try {
        const bmp = await createImageBitmap(file);
        ui.meta.textContent = $__bt$__{bmp.width}×$__{bmp.height} | $__{(file.size / 1024).toFixed(0)}KB | $__{kind}$__bt;
        bmp.close();
      } catch {
        ui.meta.textContent = $__bt$__{(file.size / 1024).toFixed(0)}KB$__bt;
      }
      ui.img.onload = () => URL.revokeObjectURL(url);   // الصورة اترسمت: مش محتاجين الـ URL
      uploadFile(file, ui);
    }
  }

  input.addEventListener("change", () => { handle([...input.files]); input.value = ""; });

  // سحب وإفلات من غير رعشة (درس drag and drop)
  let depth = 0;
  const isFiles = (e) => e.dataTransfer?.types.includes("Files");
  drop.addEventListener("dragenter", (e) => { if (isFiles(e)) { depth++; drop.classList.add("over"); } });
  drop.addEventListener("dragover", (e) => { if (isFiles(e)) e.preventDefault(); });
  drop.addEventListener("dragleave", (e) => { if (isFiles(e) && --depth === 0) drop.classList.remove("over"); });
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    depth = 0;
    drop.classList.remove("over");
    handle([...e.dataTransfer.files]);
  });
</script>
</body>
</html>
~~~

**هتشوف إيه:** منطقة إفلات كبيرة فيها لينك «اختار من جهازك». اسحب صور أو اختارها: كل صورة بتظهر في سطر فيه معاينة ومقاسها وحجمها ونوعها، وشريط تقدم وزرار «إلغاء» لوحدها. الصورة الكبيرة أو الملف اللي مش صورة بيترفض في السطر بتاعه قبل ما يتبعت. (في الـ preview اللي فوق مفيش سيرفر، فالفحص والمعاينة شغالين والرفع نفسه هيقول «النت وقع». الصفحة بتكتب ده فوق.)

## الملفات

~~~text
image-uploader/
├── package.json
├── server.js          # Express + multer على localhost
├── public/
│   └── index.html     # الصفحة: سحب وإفلات، ومعاينة، وفحص، ورفع بـ XHR
└── uploads/           # multer بيحط الملفات هنا (بيتعمل لوحده)
~~~

التشغيل: [[npm install]] ثم [[npm start]]، وافتح [[http://localhost:3000]].

~~~json package.json
{
  "name": "image-uploader",
  "private": true,
  "type": "commonjs",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express": "^5.3.0",
    "multer": "^2.5.0"
  }
}
~~~

~~~js server.js
const express = require("express");
const multer = require("multer");
const path = require("node:path");

const app = express();
const upload = multer({
  dest: path.join(__dirname, "uploads"),
  limits: { fileSize: 2 * 1024 * 1024, files: 1 },          // نفس حد الصفحة: السيرفر مبيثقش في الصفحة
  fileFilter: (req, file, cb) => cb(null, /^image\/(png|jpeg|webp)$/.test(file.mimetype)),
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) console.log(new Date().toISOString().slice(11, 19), req.method, req.path);
  next();
});
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "مفيش صورة PNG أو JPEG أو WebP في الطلب" });
  console.log("  اتحفظ:", req.file.originalname, req.file.size, "bytes");
  res.status(201).json({ name: req.file.originalname, size: req.file.size });
});

// أخطاء multer (زي الحجم) بترجع JSON واضح مش صفحة HTML
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) return res.status(413).json({ error: err.code });
  if (req.aborted || err.message === "Request aborted") {     // اليوزر داس إلغاء: multer مسح الجزء اللي وصل
    console.log("  اتلغى من الصفحة:", req.path);
    return;
  }
  next(err);
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log("الرافع على http://localhost:" + port));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ارفع صورك</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; max-width: 720px; }
  #drop { border: 3px dashed #9ca3af; border-radius: 12px; padding: 28px; text-align: center; }
  #drop.over { border-color: #2563eb; background: #eff6ff; }
  #drop label { color: #1d4ed8; text-decoration: underline; cursor: pointer; }
  #drop input { position: absolute; opacity: 0; width: 1px; height: 1px; }
  #drop:focus-within { outline: 3px solid #93c5fd; }
  #list { list-style: none; padding: 0; display: grid; gap: 8px; margin-top: 16px; }
  #list li { display: grid; grid-template-columns: 64px 1fr auto; gap: 12px; align-items: center; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; }
  #list img { width: 64px; height: 64px; object-fit: cover; border-radius: 6px; background: #f3f4f6; }
  #list progress { width: 100%; }
  .err { color: #b91c1c; }
  .ok { color: #065f46; }
  #note { font-size: 13px; color: #92400e; }
</style>
</head>
<body>
<h1>ارفع صورك</h1>
<div id="drop">
  <p>اسحب الصور هنا أو <label for="files">اختار من جهازك</label></p>
  <input type="file" id="files" accept="image/png,image/jpeg,image/webp" multiple>
  <p>PNG أو JPEG أو WebP، 2MB بالكتير للصورة.</p>
</div>
<p id="note"></p>
<ul id="list"></ul>
<script>
  const MAX = 2 * 1024 * 1024;
  const OFFLINE = location.origin === "null";      // الـ preview: مفيش سيرفر
  if (OFFLINE) document.querySelector("#note").textContent = "مفيش سيرفر هنا (صفحة معزولة): الفحص والمعاينة شغالين، والرفع هيفشل. شغّل node server.js.";
  const list = document.querySelector("#list");
  const drop = document.querySelector("#drop");
  const input = document.querySelector("#files");

  async function sniff(file) {
    const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
    if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
    if (String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP") return "webp";
    return null;
  }

  function row(file) {
    const li = document.createElement("li");
    li.innerHTML = '<img alt=""><div><strong></strong><div class="meta"></div><progress max="1" value="0" hidden></progress><div class="status" role="status"></div></div><button type="button" hidden>إلغاء</button>';
    li.querySelector("strong").textContent = file.name;
    list.append(li);
    return {
      li, img: li.querySelector("img"), meta: li.querySelector(".meta"), bar: li.querySelector("progress"),
      status: li.querySelector(".status"), cancel: li.querySelector("button"),
    };
  }

  function uploadFile(file, ui) {
    const fd = new FormData();
    fd.append("file", file);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");
    ui.bar.hidden = false;
    ui.cancel.hidden = false;
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) ui.bar.value = e.loaded / e.total; };
    xhr.onload = () => {
      ui.cancel.hidden = true;
      if (xhr.status === 201) { ui.bar.value = 1; ui.status.textContent = "اترفعت"; ui.status.className = "status ok"; }
      else { ui.status.textContent = "السيرفر رفضها (" + xhr.status + ")"; ui.status.className = "status err"; }
    };
    xhr.onerror = () => { ui.cancel.hidden = true; ui.status.textContent = "النت وقع، جرّب تاني"; ui.status.className = "status err"; };
    xhr.onabort = () => { ui.cancel.hidden = true; ui.status.textContent = "اتلغت"; ui.status.className = "status err"; };
    ui.cancel.addEventListener("click", () => xhr.abort(), { once: true });   // يلغي الملف ده بس
    xhr.send(fd);
  }

  async function handle(files) {
    for (const file of files) {
      const ui = row(file);
      const kind = await sniff(file);
      if (!kind) { ui.status.textContent = "مش صورة PNG/JPEG/WebP، اترفضت"; ui.status.className = "status err"; continue; }
      if (file.size > MAX) { ui.status.textContent = $__bt$__{(file.size / 1024 / 1024).toFixed(1)}MB أكبر من 2MB، اترفضت قبل الرفع$__bt; ui.status.className = "status err"; continue; }
      const url = URL.createObjectURL(file);
      ui.img.src = url;
      try {
        const bmp = await createImageBitmap(file);
        ui.meta.textContent = $__bt$__{bmp.width}×$__{bmp.height} | $__{(file.size / 1024).toFixed(0)}KB | $__{kind}$__bt;
        bmp.close();
      } catch {
        ui.meta.textContent = $__bt$__{(file.size / 1024).toFixed(0)}KB$__bt;
      }
      ui.img.onload = () => URL.revokeObjectURL(url);   // الصورة اترسمت: مش محتاجين الـ URL
      uploadFile(file, ui);
    }
  }

  input.addEventListener("change", () => { handle([...input.files]); input.value = ""; });

  // سحب وإفلات من غير رعشة (درس drag and drop)
  let depth = 0;
  const isFiles = (e) => e.dataTransfer?.types.includes("Files");
  drop.addEventListener("dragenter", (e) => { if (isFiles(e)) { depth++; drop.classList.add("over"); } });
  drop.addEventListener("dragover", (e) => { if (isFiles(e)) e.preventDefault(); });
  drop.addEventListener("dragleave", (e) => { if (isFiles(e) && --depth === 0) drop.classList.remove("over"); });
  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    depth = 0;
    drop.classList.remove("over");
    handle([...e.dataTransfer.files]);
  });
</script>
</body>
</html>
~~~

## الشرح

**الصفحة:**

- **[[<label for="files">]] جوه منطقة الإفلات والـ input مخفي بصريًا:** اللي مش بيستخدم ماوس بيوصل للـ input بـ Tab ويفتح اختيار الملفات بـ Enter، و [[:focus-within]] بيرسم إطار حوالين المنطقة كلها.
- **[[handle(files)]] واحدة للطريقتين:** الـ [[change]] بتاع الـ input والـ [[drop]] الاتنين بيبعتوا array ملفات لنفس الدالة.
- **الفحص قبل أي رفع:** النوع من أول bytes ([[sniff]]، وزوّدنا WebP: بيبدأ بـ [[RIFF]] وفيه [[WEBP]] من byte 8)، والحجم. اللي يفشل بيكتب السبب في السطر بتاعه و [[continue]]، فمفيش [[XMLHttpRequest]] بيتعمل له أصلًا.
- **[[createImageBitmap(file)]]:** عشان المقاس ([[4000×3000]]) من غير ما نستنى [[<img>]] يتحمّل، وبعدين [[bmp.close()]].
- **[[ui.img.onload = () => URL.revokeObjectURL(url)]]:** الصورة اترسمت، فالـ blob URL مش محتاجينه تاني.
- **XHR لكل ملف لوحده:** [[xhr.upload.onprogress]] بيحرّك الشريط بتاعه، وزرار الإلغاء بينادي [[abort()]] على الـ XHR بتاعه بس ([[{ once: true }]] عشان الـ listener ميتسجّلش مرتين). [[fetch]] لسه مفيهوش upload progress في كل المتصفحات، عشان كده XHR هنا.
- **[[depth]] في السحب:** نفس تصليح تمرين الرعشة: الإطار مبيختفيش وانت بتعدّي فوق النص واللينك اللي جوه المنطقة.

**السيرفر:**

- **[[multer({ dest, limits, fileFilter })]]:** بيقرا الـ [[multipart/form-data]] ويكتب الملف في [[uploads/]]. [[limits.fileSize]] نفس حد الصفحة، لأن أي حد يقدر يبعت للـ API من غير الصفحة. [[fileFilter]] بيرفض أي [[mimetype]] مش صورة (ولو عايز فحص الـ bytes على السيرفر كمان، اقرا أول bytes من الملف اللي اتحفظ).
- **[[upload.single("file")]]:** اسم الحقل لازم يبقى نفس [[fd.append("file", ...)]] في الصفحة.
- **error handler بـ ٤ arguments:** أخطاء multer (زي [[LIMIT_FILE_SIZE]]) بترجع 413 و JSON بدل صفحة HTML.

## اتقاس

Chrome 158 headless على [[http://localhost:8832]]، و upload مخنوق لحوالي 150KB/s (DevTools Protocol). ضغطنا Tab لحد الـ input و Enter، وبعدين أفلتنا ٤ صور حقيقية مرة واحدة (منهم [[big.png]] 2.5MB)، وضغطنا «إلغاء» على [[landscape.jpg]] وهي بتترفع:

~~~text الناتج (Chrome 158 headless)
الـ focus على: files
Enter → اختيار الملفات: اتفتح
بعد 0.6s:
me.png | 300×300 | 7KB | png | 1.00 | اترفعت
big.png |  | - | 2.5MB أكبر من 2MB، اترفضت قبل الرفع
landscape.jpg | 4000×3000 | 1192KB | jpeg | 0.05 | 
me.jpg | 300×300 | 17KB | jpeg | 1.00 | اترفعت
الآخر:
me.png | 300×300 | 7KB | png | 1.00 | اترفعت
big.png |  | - | 2.5MB أكبر من 2MB، اترفضت قبل الرفع
landscape.jpg | 4000×3000 | 1192KB | jpeg | 0.05 | اتلغت
me.jpg | 300×300 | 17KB | jpeg | 1.00 | اترفعت
requests من الصفحة: ["POST /api/upload","POST /api/upload","POST /api/upload"]
لوج السيرفر:
الرافع على http://localhost:8832
08:56:18 POST /api/upload
08:56:18 POST /api/upload
08:56:18 POST /api/upload
اتحفظ: me.png 6981 bytes
اتحفظ: me.jpg 16937 bytes
اتلغى من الصفحة: /api/upload
big.png بـ fetch مباشرة: 413 {"error":"LIMIT_FILE_SIZE"}
a.txt بـ fetch مباشرة: 400 {"error":"مفيش صورة PNG أو JPEG أو WebP في الطلب"}
pageerrors: 0
~~~

- ٣ requests بس من ٤ صور: [[big.png]] اترفضت في الصفحة ومتبعتتش.
- الإلغاء وقّف [[landscape.jpg]] عند 5٪ والتانيين كمّلوا.
- آخر سطرين: بعتنا للـ API مباشرة من غير الصفحة، والسيرفر رفض الكبير (413) والنص (400) لوحده.
- الإفلات اتعمل بأحداث [[dragenter]] و [[dragover]] و [[drop]] بـ [[DataTransfer]] فيه الملفات الحقيقية، لأن headless مبيقدرش يسحب من الويندوز.

## اللي حصل وإحنا بنبنيه

- **الإلغاء طبع stack trace في السيرفر:** أول نسخة من الـ error handler كانت بتعدّي أي حاجة مش [[MulterError]] لـ [[next(err)]]، فإلغاء اليوزر طلّع [[Error: Request aborted]] بـ ١٠ سطور في الـ stderr كأنه عطل. الإلغاء حاجة طبيعية، فبقى سطر واحد «اتلغى من الصفحة». ونتأكد إن multer مسح الجزء اللي وصل: فولدر [[uploads/]] فيه الملفات اللي اترفعت بس.
- **[[input.value = ""]] بعد [[handle]]:** من غيره، اختيار نفس الصور تاني مبيعملش [[change]].

**الغلطة الشائعة:** تفحص الحجم على السيرفر بس. اليوزر بيستنى صورة 20MB تترفع على موبايل بطيء دقيقة كاملة عشان يعرف في الآخر إنها مرفوضة.` },
        { lvl: 'متوسط', dir: "spa-draft", t: R`SPA صغير بيفتكر مكانك`, what: R`راوتر بـ [[pushState]] و [[popstate]] (درس ٦) لـ ٣ صفحات، وصفحة «اكتب رسالة» بتحفظ المسودة في [[localStorage]] على [[visibilitychange]] (درس ٥)، والأقسام بتظهر بـ reveal بـ IntersectionObserver (درس ١)، والبحث في [[?q=]] بـ [[replaceState]].`, done: R`back و forward بيرجّعوا الصفحة الصح من غير reload (Network مفيهوش طلب document جديد)، والمسودة بترجع بعد ما تقفل التاب وتفتحه، و refresh على [[/contact?q=x]] بيفتح نفس الصفحة ونفس البحث، و Ctrl+Click على أي لينك بيفتح تاب جديد زي أي موقع.`, sol: R`## الشكل النهائي

~~~view 460
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرئيسية</title>
<style>
  body { font: 15px/1.7 system-ui, sans-serif; margin: 0; }
  header { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; padding: 10px 16px; background: #111827; color: #fff; position: sticky; top: 0; }
  header a { color: #fff; }
  header a[aria-current="page"] { font-weight: 700; text-decoration: none; border-bottom: 2px solid #fbbf24; }
  header input { font: inherit; padding: 4px 8px; border-radius: 6px; border: 0; margin-inline-start: auto; }
  main { padding: 16px; max-width: 640px; margin: 0 auto; }
  .card { padding: 12px; border-radius: 8px; background: #f3f4f6; margin: 12px 0; }
  .reveal { opacity: 0; transform: translateY(16px); transition: opacity .4s, transform .4s; }
  .reveal.visible { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { .reveal { transition: none; } }
  textarea { width: 100%; min-height: 120px; font: inherit; }
  #note { font-size: 13px; color: #92400e; }
  .spacer { height: 60vh; }
</style>
</head>
<body>
<header>
  <a href="/" data-link>الرئيسية</a>
  <a href="/about" data-link>عننا</a>
  <a href="/contact" data-link>اكتب رسالة</a>
  <input type="search" id="q" placeholder="دوّر في الصفحة..." aria-label="بحث">
</header>
<main id="view"></main>
<p id="note"></p>
<script>
  // ---------- التخزين: ممكن يبقى ممنوع (preview معزول أو إعدادات المتصفح) ----------
  let storageOk = true;
  const store = (() => {
    try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return localStorage; }
    catch {
      storageOk = false;                      // مجرد قراية localStorage بترمي SecurityError هنا
      const m = new Map();
      return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k) };
    }
  })();
  // ---------- الـ history: pushState بيرمي في صفحة معزولة ----------
  let urlWorks = location.origin !== "null";   // صفحة معزولة: الـ URL مبيتغيّرش أصلًا
  function go(url, replace = false) {
    try { history[replace ? "replaceState" : "pushState"]({}, "", url); }
    catch { urlWorks = false; current = new URL(url, current); }
  }
  // في صفحة معزولة location.href = "about:srcdoc"، فبنبدأ من عنوان وهمي ونمشي عليه
  let current = new URL(location.origin === "null" ? "https://preview.invalid/" : location.href);
  const here = () => (urlWorks ? new URL(location.href) : current);
  const notes = [];
  if (!storageOk) notes.push("التخزين مقفول هنا، المسودة هتتنسي مع الـ reload");

  // ---------- الصفحات ----------
  const pages = {
    "/": { title: "الرئيسية", html: () => cards(["أهلًا بيك في الموقع", "بنعمل تطبيقات صغيرة بتشتغل", "انزل تحت تشوف الأقسام بتظهر", "آخر قسم"]) },
    "/about": { title: "عننا", html: () => cards(["فريق صغير من القاهرة", "بنحب الكود البسيط", "بنكتب tests قبل ما ننشر"]) },
    "/contact": {
      title: "اكتب رسالة",
      html: () => $__bt<h1>اكتب رسالة</h1><label for="draft">رسالتك (بتتحفظ لو سبت التاب):</label><textarea id="draft"></textarea>$__bt + cards(["سؤال: الرد بياخد قد إيه؟ يوم عمل", "سؤال: ينفع أبعت ملف؟ لأ، لينك بس"]),
      mount() {
        const ta = document.querySelector("#draft");
        ta.value = store.getItem("draft") ?? "";
      },
    },
  };
  const cards = (items) => '<div class="spacer"></div>' + items.map((t) => $__bt<section class="card reveal">$__{t}</section>$__bt).join("");

  const reveal = new IntersectionObserver((entries, obs) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
  }, { root: document, threshold: 0.2 });

  function render() {
    const url = here();
    const page = pages[url.pathname];
    const view = document.querySelector("#view");
    view.innerHTML = page ? page.html() : "<h1>404: الصفحة مش موجودة</h1>";
    document.title = page?.title ?? "مش موجود";
    page?.mount?.();
    document.querySelectorAll("header a").forEach((a) => a.getAttribute("href") === url.pathname ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    const q = url.searchParams.get("q") ?? "";
    document.querySelector("#q").value = q;
    filter(q);
    view.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    document.querySelector("#note").textContent = notes.concat(urlWorks ? [] : ["الصفحة معزولة: الـ URL مبيتغيّرش"]).join(" | ");
  }

  function filter(q) {
    for (const card of document.querySelectorAll("#view .card")) card.hidden = q !== "" && !card.textContent.includes(q);
  }

  // ---------- اللينكات ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;   // Ctrl+Click = تاب جديد
    const target = new URL(a.getAttribute("href"), here());
    if (target.origin !== here().origin) return;                   // موقع تاني
    e.preventDefault();
    if (target.pathname === here().pathname) return;
    saveDraft();
    go(target.pathname);
    render();
  });
  window.addEventListener("popstate", render);

  // ---------- البحث في ?q= بـ replaceState: مش عايزين entry لكل حرف ----------
  document.querySelector("#q").addEventListener("input", (e) => {
    const url = here();
    if (e.target.value) url.searchParams.set("q", e.target.value); else url.searchParams.delete("q");
    go(url.pathname + url.search, true);
    filter(e.target.value);
  });

  // ---------- المسودة: تتحفظ لما الصفحة تتخبى (آخر لحظة مضمونة) ----------
  function saveDraft() {
    const ta = document.querySelector("#draft");
    if (ta) store.setItem("draft", ta.value);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) saveDraft(); });

  render();
</script>
</body>
</html>
~~~

**هتشوف إيه:** موقع ٣ صفحات بشريط فوق فيه لينكات وبحث. التنقل من غير reload، والكروت بتظهر بحركة خفيفة وهي داخلة الشاشة، والبحث بيفلتر الكروت وبيتكتب في العنوان [[?q=]]، وصفحة «اكتب رسالة» بتفتكر المسودة لو قفلت التاب. في الـ preview اللي فوق التنقل والبحث والحركة شغالين، بس الصفحة معزولة: الـ URL مبيتغيّرش والتخزين مقفول، والصفحة بتقول كده تحت.

## الملفات

~~~text
spa-draft/
├── index.html       # الصفحة كلها (HTML و CSS و JS)
└── spa-server.mjs   # أي مسار من غير امتداد بيرجّع index.html (زي npx serve -s)
~~~

التشغيل: [[node spa-server.mjs]] وافتح [[http://localhost:8831]].

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرئيسية</title>
<style>
  body { font: 15px/1.7 system-ui, sans-serif; margin: 0; }
  header { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; padding: 10px 16px; background: #111827; color: #fff; position: sticky; top: 0; }
  header a { color: #fff; }
  header a[aria-current="page"] { font-weight: 700; text-decoration: none; border-bottom: 2px solid #fbbf24; }
  header input { font: inherit; padding: 4px 8px; border-radius: 6px; border: 0; margin-inline-start: auto; }
  main { padding: 16px; max-width: 640px; margin: 0 auto; }
  .card { padding: 12px; border-radius: 8px; background: #f3f4f6; margin: 12px 0; }
  .reveal { opacity: 0; transform: translateY(16px); transition: opacity .4s, transform .4s; }
  .reveal.visible { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) { .reveal { transition: none; } }
  textarea { width: 100%; min-height: 120px; font: inherit; }
  #note { font-size: 13px; color: #92400e; }
  .spacer { height: 60vh; }
</style>
</head>
<body>
<header>
  <a href="/" data-link>الرئيسية</a>
  <a href="/about" data-link>عننا</a>
  <a href="/contact" data-link>اكتب رسالة</a>
  <input type="search" id="q" placeholder="دوّر في الصفحة..." aria-label="بحث">
</header>
<main id="view"></main>
<p id="note"></p>
<script>
  // ---------- التخزين: ممكن يبقى ممنوع (preview معزول أو إعدادات المتصفح) ----------
  let storageOk = true;
  const store = (() => {
    try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return localStorage; }
    catch {
      storageOk = false;                      // مجرد قراية localStorage بترمي SecurityError هنا
      const m = new Map();
      return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k) };
    }
  })();
  // ---------- الـ history: pushState بيرمي في صفحة معزولة ----------
  let urlWorks = location.origin !== "null";   // صفحة معزولة: الـ URL مبيتغيّرش أصلًا
  function go(url, replace = false) {
    try { history[replace ? "replaceState" : "pushState"]({}, "", url); }
    catch { urlWorks = false; current = new URL(url, current); }
  }
  // في صفحة معزولة location.href = "about:srcdoc"، فبنبدأ من عنوان وهمي ونمشي عليه
  let current = new URL(location.origin === "null" ? "https://preview.invalid/" : location.href);
  const here = () => (urlWorks ? new URL(location.href) : current);
  const notes = [];
  if (!storageOk) notes.push("التخزين مقفول هنا، المسودة هتتنسي مع الـ reload");

  // ---------- الصفحات ----------
  const pages = {
    "/": { title: "الرئيسية", html: () => cards(["أهلًا بيك في الموقع", "بنعمل تطبيقات صغيرة بتشتغل", "انزل تحت تشوف الأقسام بتظهر", "آخر قسم"]) },
    "/about": { title: "عننا", html: () => cards(["فريق صغير من القاهرة", "بنحب الكود البسيط", "بنكتب tests قبل ما ننشر"]) },
    "/contact": {
      title: "اكتب رسالة",
      html: () => $__bt<h1>اكتب رسالة</h1><label for="draft">رسالتك (بتتحفظ لو سبت التاب):</label><textarea id="draft"></textarea>$__bt + cards(["سؤال: الرد بياخد قد إيه؟ يوم عمل", "سؤال: ينفع أبعت ملف؟ لأ، لينك بس"]),
      mount() {
        const ta = document.querySelector("#draft");
        ta.value = store.getItem("draft") ?? "";
      },
    },
  };
  const cards = (items) => '<div class="spacer"></div>' + items.map((t) => $__bt<section class="card reveal">$__{t}</section>$__bt).join("");

  const reveal = new IntersectionObserver((entries, obs) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
  }, { root: document, threshold: 0.2 });

  function render() {
    const url = here();
    const page = pages[url.pathname];
    const view = document.querySelector("#view");
    view.innerHTML = page ? page.html() : "<h1>404: الصفحة مش موجودة</h1>";
    document.title = page?.title ?? "مش موجود";
    page?.mount?.();
    document.querySelectorAll("header a").forEach((a) => a.getAttribute("href") === url.pathname ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    const q = url.searchParams.get("q") ?? "";
    document.querySelector("#q").value = q;
    filter(q);
    view.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    document.querySelector("#note").textContent = notes.concat(urlWorks ? [] : ["الصفحة معزولة: الـ URL مبيتغيّرش"]).join(" | ");
  }

  function filter(q) {
    for (const card of document.querySelectorAll("#view .card")) card.hidden = q !== "" && !card.textContent.includes(q);
  }

  // ---------- اللينكات ----------
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;   // Ctrl+Click = تاب جديد
    const target = new URL(a.getAttribute("href"), here());
    if (target.origin !== here().origin) return;                   // موقع تاني
    e.preventDefault();
    if (target.pathname === here().pathname) return;
    saveDraft();
    go(target.pathname);
    render();
  });
  window.addEventListener("popstate", render);

  // ---------- البحث في ?q= بـ replaceState: مش عايزين entry لكل حرف ----------
  document.querySelector("#q").addEventListener("input", (e) => {
    const url = here();
    if (e.target.value) url.searchParams.set("q", e.target.value); else url.searchParams.delete("q");
    go(url.pathname + url.search, true);
    filter(e.target.value);
  });

  // ---------- المسودة: تتحفظ لما الصفحة تتخبى (آخر لحظة مضمونة) ----------
  function saveDraft() {
    const ta = document.querySelector("#draft");
    if (ta) store.setItem("draft", ta.value);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) saveDraft(); });

  render();
</script>
</body>
</html>
~~~

~~~js spa-server.mjs
// زي npx serve -s: أي مسار مش ملف بيرجّع index.html
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const types = { ".html": "text/html; charset=utf-8", ".mjs": "text/javascript", ".js": "text/javascript" };
createServer(async (req, res) => {
  const path = new URL(req.url, "http://x").pathname;
  const file = extname(path) ? join(".", path) : "index.html";
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(Number(process.env.PORT) || 8831, () => console.log("على http://localhost:" + (Number(process.env.PORT) || 8831)));
~~~

## الشرح: كل درس فين

| الجزء | الدرس | بيعمل إيه |
|---|---|---|
| [[go()]] و [[popstate]] و [[render()]] | pushState و popstate | التنقل من غير reload، و back و forward |
| [[saveDraft]] على [[visibilitychange]] | visibilitychange و bfcache | المسودة تتحفظ في آخر لحظة مضمونة |
| [[reveal]] | IntersectionObserver | الكروت تظهر مرة واحدة وهي داخلة |
| البحث و [[go(..., true)]] | pushState (replaceState) | [[?q=]] في العنوان من غير entry لكل حرف |

- **[[render()]] بتقرا كل حاجة من الـ URL:** المسار بيختار الصفحة، و [[?q=]] بيملا البحث ويفلتر. عشان كده refresh على [[/contact?q=ملف]] بيفتح نفس الصفحة ونفس البحث، ومفيش حالة مخبّية في متغيرات.
- **[[go(url, replace)]]:** [[pushState]] للتنقل (entry جديد، back يرجعله) و [[replaceState]] للبحث (بيبدّل العنوان الحالي). لو اتكتبت «ملف» بـ [[pushState]] كان back هيلف على «م» و «مل» و «ملف».
- **[[e.ctrlKey]] وأخواتها:** الراوتر بيسيب الضغطة للمتصفح، فـ Ctrl+Click بيفتح تاب جديد زي أي موقع. والتاب الجديد بيطلب الـ URL من السيرفر و [[spa-server.mjs]] بيرجّع [[index.html]].
- **[[visibilitychange]] و [[document.hidden]]:** بيحصل لما تبدّل التاب أو تقفله أو تصغّر الشباك أو الموبايل يقفل الشاشة. والتنقل لصفحة تانية جوه الموقع بيحفظ برضه ([[saveDraft()]] قبل [[go()]])، لأن الـ textarea هتتمسح.
- **[[store]]:** [[localStorage]] لو متاح، وإلا [[Map]] في الذاكرة. مجرد قراية [[localStorage]] في صفحة معزولة بترمي [[SecurityError]]، فالفحص جوه [[try]] وبنحفظ النتيجة في [[storageOk]] بدل ما نلمس [[localStorage]] تاني.
- **[[root: document]] في الـ reveal:** عشان يشتغل جوه iframe من origin تاني (الـ preview).
- **[[a.getAttribute("href")]] مش [[a.pathname]]:** في الصفحة المعزولة العنوان [[about:srcdoc]]، و [[/about]] مبيتحسبش بالنسبة له. فبنحسب المسار بنفسنا على [[here()]].

## اتقاس

Chrome 158 headless على [[http://localhost:8833]]. عدّينا كل طلبات الـ document (يعني تحميل صفحة كامل):

~~~text الناتج (Chrome 158 headless)
فتح /                        / | الرئيسية | documents: 1
ضغط عننا                     /about | عننا | documents: 1
ضغط اكتب رسالة               /contact | اكتب رسالة | documents: 1
back                         /about | عننا | documents: 1
back                         / | الرئيسية | documents: 1
forward                      /about | عننا | documents: 1
forward                      /contact | اكتب رسالة | documents: 1
بحث «ملف»                    /contact?q=ملف | اكتب رسالة | documents: 1
  كروت ظاهرة: [ 'سؤال: ينفع أبعت ملف؟ لأ، لينك بس' ]
  history.length: 4
تاب جديد على /contact?q=ملف  /contact?q=ملف | اكتب رسالة | documents: 2
  المسودة: مسودة مهمة: عايز أسأل عن الأسعار | البحث: ملف | كروت ظاهرة: 1
Ctrl+Click «عننا»: تاب جديد على /about | التاب الأصلي لسه: /contact
reveal قبل الـ scroll: 1110
reveal بعد الـ scroll: 1111
[sandbox] اكتب رسالة | اكتب رسالة | التخزين مقفول هنا، المسودة هتتنسي مع الـ reload | الصفحة معزولة: الـ URL مبيتغيّرش
pageerrors: 0
~~~

- ٧ تنقلات و back و forward ولسه [[documents: 1]]: مفيش reload.
- [[history.length]] فضل 4 بعد البحث: الـ [[replaceState]] مضافش entries.
- كتبنا المسودة و **قفلنا التاب** ([[page.close()]]) من غير ما ندوس حاجة، وفتحنا تاب جديد على [[/contact?q=ملف]]: المسودة رجعت والبحث اتملا والفلتر اشتغل. يعني [[visibilitychange]] اتبعت وهو بيتقفل وحفظ.

## اللي حصل وإحنا بنبنيه

- **الـ preview كان بيطلّع 404:** أول نسخة كانت بتقرا [[new URL(location.href)]]، وفي الصفحة المعزولة ده [[about:srcdoc]] والـ pathname بتاعه [[srcdoc]]، فالصفحة الأولى طلعت «404». وبعدها أول ضغطة رمت [[Failed to construct 'URL': Invalid URL]] لأن [[about:srcdoc]] مينفعش يبقى base لـ URL نسبي. التصليح: في الصفحة المعزولة نبدأ من عنوان وهمي ([[https://preview.invalid/]]) ونمشي عليه في الذاكرة.
- **[[store === localStorage]]:** كتبناها عشان نعرف التخزين شغال ولا لأ، فرمت [[SecurityError]] في الـ preview، لأن قراية الاسم [[localStorage]] نفسها هي اللي بترمي. بقت [[storageOk]].

**الغلطة الشائعة:** تحفظ المسودة في [[beforeunload]]. على الموبايل الحدث ده غالبًا مبيحصلش (النظام بيقتل التاب في الخلفية)، و [[visibilitychange]] هو اللي بيحصل.` },
        { lvl: 'كبير', dir: "infinite-feed", t: R`feed لانهائي متين`, what: R`feed من [[jsonplaceholder.typicode.com]] أو API على localhost بـ IntersectionObserver (درس ١)، والكروت بتتقسم أعمدة حسب عرض الـ container بـ ResizeObserver (درس ٢)، ورقم الصفحة في الـ URL بـ [[replaceState]] (درس ٦)، و [[pageshow]] بيحدّث لو رجعت من bfcache (درس ٥). ومن الوحدات اللي فاتت: [[AbortController]] و timeout على كل fetch، و debounce على الـ resize، ورسالة خطأ فيها زرار «حاول تاني».`, done: R`مفيش صفحة بتتطلب مرتين حتى لو نزلت بسرعة جدًا (Network يأكد)، وفي آخر الداتا بتظهر «خلصت» والـ observer بيقف، ولو قطعت النت من DevTools بتظهر رسالة الخطأ والزرار بيكمّل من نفس الصفحة، و refresh بيرجّعك لنفس رقم الصفحة، وعدد الأعمدة بيتغير لما تصغّر الـ sidebar مش الشاشة بس، و Test back/forward cache بيقول الصفحة اترجعت من الـ cache.`, ext: R`زوّد virtual scrolling لما الكروت تعدّي ١٠٠٠ عشان الـ DOM ميتقلش، وبحث بـ [[?q=]]، وحوّله لـ component تستخدمه في مشروع حقيقي.`, sol: R`## الشكل النهائي

اللقطة دي من الصفحة الحقيقية شغالة على السيرفر (اتاخدت من Chrome بعد أول تحميل، والـ scripts اتشالت لأن الـ preview مفيهوش السيرفر بتاعها):

~~~view 420
<!DOCTYPE html><html lang="ar" dir="rtl"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الـ feed</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 0; }
  .layout { display: flex; min-height: 100vh; }
  aside { width: 320px; flex: none; background: #f3f4f6; padding: 16px; transition: width .2s; overflow: hidden; }
  aside.closed { width: 48px; }
  main { flex: 1; min-width: 0; padding: 16px; }
  #grid { display: grid; grid-template-columns: repeat(var(--cols, 1), 1fr); gap: 12px; }
  .post { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; min-height: 90px; }
  #status { text-align: center; padding: 16px; color: #374151; }
  #status button { font: inherit; padding: 6px 14px; }
  #sentinel { height: 1px; }
  #new { position: sticky; top: 8px; z-index: 1; text-align: center; }
  #new:empty { display: none; }
  #new span { background: #1d4ed8; color: #fff; padding: 4px 12px; border-radius: 999px; }
</style>
</head>
<body>
<div class="layout">
  <aside id="side"><button id="toggle" type="button" aria-expanded="true">☰</button><p>الأقسام</p></aside>
  <main>
    <p id="info">عرض الـ feed 616px ← 2 أعمدة</p>
    <div id="new" role="status"></div>
    <div id="grid" aria-live="polite" style="--cols: 2;"><article class="post" data-id="60"><h2 style="font-size: 16px;">بوست رقم 60</h2><p>❤ 0</p></article><article class="post" data-id="59"><h2 style="font-size: 16px;">بوست رقم 59</h2><p>❤ 37</p></article><article class="post" data-id="58"><h2 style="font-size: 16px;">بوست رقم 58</h2><p>❤ 74</p></article><article class="post" data-id="57"><h2 style="font-size: 16px;">بوست رقم 57</h2><p>❤ 111</p></article><article class="post" data-id="56"><h2 style="font-size: 16px;">بوست رقم 56</h2><p>❤ 148</p></article><article class="post" data-id="55"><h2 style="font-size: 16px;">بوست رقم 55</h2><p>❤ 185</p></article></div>
    <div id="sentinel"></div>
    <div id="status" role="status">بيحمّل...</div>
  </main>
</div>
</body></html>
~~~

**هتشوف إيه:** sidebar على اليمين وفيه زرار ☰، وجنبه grid كروت بوستات. انزل والكروت بتتحمّل لوحدها ١٢ ورا ١٢، والعنوان بيتغيّر لـ [[?page=3]]. صغّر الـ sidebar والأعمدة بتزيد من غير ما الشاشة تتغيّر. اقطع النت وهتلاقي «حاول تاني» بتكمّل من نفس المكان. وفي الآخر «خلصت».

## الملفات

~~~text
infinite-feed/
├── server.mjs              # API بصفحات + الملفات الثابتة، node:http من غير مكتبات
├── feed-core.test.mjs      # node --test للمنطق
└── public/
    ├── index.html
    ├── feed.js             # الـ DOM والـ observers والأحداث
    ├── feed-core.mjs       # المنطق من غير DOM: الأعمدة، رقم الصفحة، fetch بـ timeout، اللودر
    └── other.html          # صفحة تروح لها وترجع (تجربة الـ bfcache)
~~~

التشغيل: [[node server.mjs]] وافتح [[http://localhost:3000]]. والتستات: [[node --test]].

~~~js server.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const LIMIT = 12;
const posts = Array.from({ length: 60 }, (_, i) => ({ id: 60 - i, title: $__btبوست رقم $__{60 - i}$__bt, likes: (i * 37) % 200 }));
const types = { ".html": "text/html; charset=utf-8", ".mjs": "text/javascript", ".js": "text/javascript", ".css": "text/css" };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/api/posts") {
    const since = Number(url.searchParams.get("since") || 0);
    const page = Number(url.searchParams.get("page") || 1);
    console.log("GET", url.pathname + url.search);
    await sleep(300);                                                // شبكة حقيقية مش فورية
    if (since) return json(res, { items: posts.filter((p) => p.id > since), hasMore: false });
    const items = posts.slice((page - 1) * LIMIT, page * LIMIT);
    return json(res, { items, page, hasMore: page * LIMIT < posts.length });
  }
  if (url.pathname === "/api/new" && req.method === "POST") {          // بوست جديد (للتجربة)
    const id = posts[0].id + 1;
    posts.unshift({ id, title: $__btبوست رقم $__{id} (جديد)$__bt, likes: 0 });
    return json(res, { id });
  }
  const file = join("public", url.pathname === "/" ? "index.html" : url.pathname);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
});
const json = (res, data) => res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(data));
const port = Number(process.env.PORT) || 3000;
server.listen(port, () => console.log("الـ feed على http://localhost:" + port));
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الـ feed</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 0; }
  .layout { display: flex; min-height: 100vh; }
  aside { width: 320px; flex: none; background: #f3f4f6; padding: 16px; transition: width .2s; overflow: hidden; }
  aside.closed { width: 48px; }
  main { flex: 1; min-width: 0; padding: 16px; }
  #grid { display: grid; grid-template-columns: repeat(var(--cols, 1), 1fr); gap: 12px; }
  .post { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; min-height: 90px; }
  #status { text-align: center; padding: 16px; color: #374151; }
  #status button { font: inherit; padding: 6px 14px; }
  #sentinel { height: 1px; }
  #new { position: sticky; top: 8px; z-index: 1; text-align: center; }
  #new:empty { display: none; }
  #new span { background: #1d4ed8; color: #fff; padding: 4px 12px; border-radius: 999px; }
</style>
</head>
<body>
<div class="layout">
  <aside id="side"><button id="toggle" type="button" aria-expanded="true">☰</button><p>الأقسام</p></aside>
  <main>
    <p id="info"></p>
    <div id="new" role="status"></div>
    <div id="grid" aria-live="polite"></div>
    <div id="sentinel"></div>
    <div id="status" role="status"></div>
  </main>
</div>
<script type="module" src="/feed.js"></script>
</body>
</html>
~~~

~~~js feed-core.mjs
// المنطق من غير DOM: بيتختبر في Node بـ node --test

// عدد الأعمدة من عرض الـ container (مش الشاشة): عمود لكل 260px، من 1 لـ 4
export function columnsFor(width, min = 260, max = 4) {
  if (!Number.isFinite(width) || width < 0) throw new RangeError($__btwidth غلط: $__{width}$__bt);
  return Math.max(1, Math.min(max, Math.floor(width / min)));
}

// رقم الصفحة من ?page=، وأي حاجة غلط = 1
export function pageFromSearch(search) {
  const n = Number(new URLSearchParams(search).get("page"));
  return Number.isInteger(n) && n >= 1 && n <= 1000 ? n : 1;
}

// fetch بـ timeout و AbortController، وبيرمي لو الـ status مش ok
export async function fetchJSON(url, { timeout = 5000, signal, fetchImpl = fetch } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(new DOMException("الطلب أخد أكتر من " + timeout + "ms", "TimeoutError")), timeout);
  const onAbort = () => ctrl.abort(signal.reason);
  signal?.addEventListener("abort", onAbort, { once: true });
  try {
    const res = await fetchImpl(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error($__btالسيرفر رجّع $__{res.status}$__bt);
    return await res.json();
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

// اللودر: صفحة واحدة في نفس الوقت، ومفيش صفحة بتتطلب مرتين، والفشل بيسيب نفس الصفحة للمحاولة الجاية
export function createLoader(loadPage, { startPage = 1 } = {}) {
  let next = startPage;        // الصفحة اللي عليها الدور
  let busy = null;             // الـ Promise الشغال
  let done = false;
  return {
    get next() { return next; },
    get done() { return done; },
    get busy() { return busy !== null; },
    load() {
      if (done) return Promise.resolve(null);
      if (busy) return busy;                       // نداء تاني وهو شغال = نفس الـ Promise
      const page = next;
      busy = loadPage(page)
        .then((data) => {
          next = page + 1;
          if (!data.hasMore) done = true;
          return data;
        })
        .finally(() => { busy = null; });
      return busy;
    },
  };
}

export function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
~~~

~~~js feed.js
import { columnsFor, pageFromSearch, fetchJSON, createLoader, debounce } from "./feed-core.mjs";

const grid = document.querySelector("#grid");
const status = document.querySelector("#status");
const sentinel = document.querySelector("#sentinel");
let pageCtrl = new AbortController();          // بيتلغي مع pagehide
let newest = 0;

// ---------- الكروت ----------
function card(p) {
  const el = document.createElement("article");
  el.className = "post";
  el.dataset.id = p.id;
  const h = document.createElement("h2");
  h.textContent = p.title;
  h.style.fontSize = "16px";
  const meta = document.createElement("p");
  meta.textContent = $__bt❤ $__{p.likes}$__bt;
  el.append(h, meta);
  return el;
}

// ---------- تحميل الصفحات ----------
const loader = createLoader(async (page) => {
  const data = await fetchJSON($__bt/api/posts?page=$__{page}$__bt, { timeout: 5000, signal: pageCtrl.signal });
  grid.append(...data.items.map(card));
  newest = Math.max(newest, ...data.items.map((p) => p.id));
  history.replaceState(null, "", page === 1 ? location.pathname : $__bt?page=$__{page}$__bt);   // مش pushState
  return data;
});

async function loadMore() {
  status.textContent = "بيحمّل...";
  try {
    await loader.load();
    if (loader.done) {
      status.textContent = "خلصت، مفيش بوستات تانية.";
      io.disconnect();                          // مفيش داعي نراقب تاني
    } else {
      status.textContent = "";
      recheck();
    }
  } catch (err) {
    if (err.name === "AbortError") return;      // الصفحة بتتقفل
    status.innerHTML = "";
    const msg = document.createElement("span");
    msg.textContent = (err.name === "TimeoutError" ? "الشبكة بطيئة جدًا." : "مقدرناش نجيب البوستات (النت؟).") + " ";
    const retry = document.createElement("button");
    retry.textContent = "حاول تاني";
    retry.addEventListener("click", loadMore, { once: true });   // نفس الصفحة اللي فشلت
    status.append(msg, retry);
  }
}

// لو الـ sentinel لسه ظاهر بعد التحميل (شاشة طويلة)، الـ observer مش هينادي تاني لوحده
function recheck() {
  io.unobserve(sentinel);
  io.observe(sentinel);
}

const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !loader.busy) loadMore();
}, { root: document, rootMargin: "400px" });

// ---------- الأعمدة حسب عرض الـ container ----------
const applyColumns = debounce((width) => {
  grid.style.setProperty("--cols", columnsFor(width));
  document.querySelector("#info").textContent = $__btعرض الـ feed $__{Math.round(width)}px ← $__{columnsFor(width)} أعمدة$__bt;
}, 100);
new ResizeObserver(([entry]) => applyColumns(entry.contentBoxSize[0].inlineSize)).observe(grid);

document.querySelector("#toggle").addEventListener("click", (e) => {
  const side = document.querySelector("#side");
  side.classList.toggle("closed");
  e.currentTarget.setAttribute("aria-expanded", String(!side.classList.contains("closed")));
});

// ---------- bfcache ----------
window.addEventListener("pagehide", () => pageCtrl.abort());
window.addEventListener("pageshow", async (e) => {
  if (!e.persisted) return;
  pageCtrl = new AbortController();
  try {
    const data = await fetchJSON($__bt/api/posts?since=$__{newest}$__bt, { signal: pageCtrl.signal });
    if (data.items.length) {
      grid.prepend(...data.items.map(card));
      newest = Math.max(newest, ...data.items.map((p) => p.id));
      document.querySelector("#new").innerHTML = $__bt<span>$__{data.items.length} بوست جديد</span>$__bt;
    }
  } catch {}
  if (!loader.done) recheck();
});

// ---------- البداية: لو الـ URL فيه ?page=3 حمّل لحد 3 ----------
const upTo = pageFromSearch(location.search);
for (let p = 1; p <= upTo && !loader.done; p++) {
  try { await loader.load(); } catch { break; }
}
if (loader.done) { status.textContent = "خلصت، مفيش بوستات تانية."; } else io.observe(sentinel);
~~~

~~~js feed-core.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { columnsFor, pageFromSearch, fetchJSON, createLoader, debounce } from "./public/feed-core.mjs";

test("columnsFor: من عرض الـ container", () => {
  assert.equal(columnsFor(200), 1);
  assert.equal(columnsFor(520), 2);
  assert.equal(columnsFor(800), 3);
  assert.equal(columnsFor(5000), 4);
  assert.throws(() => columnsFor(NaN), RangeError);
});

test("pageFromSearch: أي قيمة غلط = 1", () => {
  assert.equal(pageFromSearch("?page=3"), 3);
  for (const s of ["", "?page=0", "?page=-2", "?page=abc", "?page=2.5", "?page=99999"]) assert.equal(pageFromSearch(s), 1, s);
});

test("loader: نداءين مع بعض = request واحد", async () => {
  const calls = [];
  const loader = createLoader(async (p) => { calls.push(p); await new Promise((r) => setTimeout(r, 20)); return { items: [p], hasMore: true }; });
  const [a, b] = await Promise.all([loader.load(), loader.load()]);
  assert.equal(a, b);
  assert.deepEqual(calls, [1]);
  await loader.load();
  assert.deepEqual(calls, [1, 2]);
});

test("loader: الفشل بيسيب نفس الصفحة للمحاولة الجاية", async () => {
  let fail = true; const calls = [];
  const loader = createLoader(async (p) => { calls.push(p); if (fail) throw new Error("offline"); return { items: [], hasMore: true }; });
  await assert.rejects(loader.load(), /offline/);
  fail = false;
  await loader.load();
  assert.deepEqual(calls, [1, 1]);
  assert.equal(loader.next, 2);
});

test("loader: بعد آخر صفحة مفيش requests", async () => {
  const calls = [];
  const loader = createLoader(async (p) => { calls.push(p); return { items: [], hasMore: p < 2 }; });
  await loader.load(); await loader.load(); await loader.load(); await loader.load();
  assert.deepEqual(calls, [1, 2]);
  assert.equal(loader.done, true);
});

test("fetchJSON: timeout بيرمي TimeoutError", async () => {
  const never = (url, { signal }) => new Promise((_, rej) => signal.addEventListener("abort", () => rej(signal.reason)));
  await assert.rejects(fetchJSON("/x", { timeout: 30, fetchImpl: never }), { name: "TimeoutError" });
});

test("fetchJSON: status مش ok بيرمي", async () => {
  const bad = async () => new Response("no", { status: 503 });
  await assert.rejects(fetchJSON("/x", { fetchImpl: bad }), /503/);
});

test("debounce: آخر نداء بس", async () => {
  const got = [];
  const d = debounce((x) => got.push(x), 20);
  d(1); d(2); d(3);
  await new Promise((r) => setTimeout(r, 50));
  assert.deepEqual(got, [3]);
});
~~~

~~~html other.html
<!doctype html><meta charset="utf-8"><title>صفحة تانية</title><p>دوس back</p>
~~~

## ترتيب البناء

1. **السيرفر:** ٦٠ بوست، ١٢ في الصفحة، و ٣٠٠ms تأخير عشان التحميل يبقى زي الحقيقة (من غيره كل حاجة بتحصل في نفس اللحظة ومش هتشوف باجات التكرار).
2. **[[feed-core.mjs]] وتستاته الأول:** كل قرار ليه دالة من غير DOM (عدد الأعمدة، رقم الصفحة من الـ URL، اللودر اللي بيمنع التكرار، الـ timeout). ٨ تستات بتعدّي في أقل من ثانية.
3. **[[feed.js]]:** بيوصّل الدوال دي بالـ observers والأحداث.
4. **القياس في Chrome** لكل سطر في المطلوب.

## الشرح

- **[[createLoader]] هو اللي بيمنع التكرار:** طول ما فيه طلب شغال، أي [[load()]] تاني بيرجّع **نفس** الـ Promise (التست «نداءين مع بعض = request واحد»). و [[next]] مبيزيدش غير لما الطلب ينجح، فالفشل بيسيب نفس الصفحة لـ «حاول تاني». وبعد [[hasMore: false]] مفيش طلبات خالص.
- **[[recheck()]]:** الـ IntersectionObserver بينادي لما الحالة **تتغيّر**. لو بعد التحميل الـ sentinel لسه ظاهر (شاشة طويلة)، مفيش تغيير فمفيش نداء والتحميل بيقف. [[unobserve]] ثم [[observe]] بيجبره يبعت الحالة الحالية من جديد. ده نفس اللي في كود الدرس.
- **[[io.disconnect()]] بعد «خلصت»:** مفيش داعي يفضل يراقب.
- **[[history.replaceState]] بـ [[?page=N]]:** مش [[pushState]]، وإلا كل ١٢ بوست يبقوا entry وزرار back هيلف على الصفحات. وفي الفتح، [[pageFromSearch]] بتقرا الرقم (وأي قيمة غلط = 1) والصفحة بتحمّل لحد الرقم ده.
- **[[fetchJSON]] بـ [[AbortController]] و timeout:** أي طلب بياخد أكتر من ٥ ثواني بيتلغي برسالة «الشبكة بطيئة جدًا». والـ [[signal]] بتاع الصفحة كلها بيتلغي في [[pagehide]]، فمفيش طلب بيكمّل والصفحة في الـ bfcache.
- **[[ResizeObserver]] على الـ grid نفسه و [[debounce]] 100ms:** العرض بييجي من الـ grid مش الشاشة، فقفل الـ sidebar بيزوّد الأعمدة. والـ debounce عشان الـ transition بتاع الـ sidebar بيغيّر العرض كل فريم لمدة 200ms.
- **[[pageshow]] و [[e.persisted]]:** لما ترجع من الـ bfcache الصفحة بنفس الكروت والـ scroll، فبنطلب [[?since=أحدث id]] بس ونضيف الجديد فوق مع «١ بوست جديد».

## اتقاس

Chrome 158 headless على [[http://localhost:8834]]، 1100×700. (Playwright بيقفل الـ bfcache افتراضيًا بـ [[--disable-back-forward-cache]]، فشلنا الـ flag ده في التجربة دي.)

~~~text الناتج (Chrome 158 headless)
فتح الصفحة                     | كروت: 24 | URL: ?page=2 | status: ""
عرض الـ feed 716px ← 2 أعمدة
بعد 30 scroll سريع             | كروت: 60 | URL: ?page=5 | status: "خلصت، مفيش بوستات تانية."
requests لكل صفحة: {"?page=1":1,"?page=2":1,"?page=3":1,"?page=4":1,"?page=5":1}
في الآخر                       | كروت: 60 | URL: ?page=5 | status: "خلصت، مفيش بوستات تانية."
requests بعد «خلصت» وكمان 5 scroll: 0
offline + scroll               | كروت: 24 | URL: ?page=2 | status: "مقدرناش نجيب البوستات (النت؟). حاول تاني"
رجع النت + حاول تاني           | كروت: 36 | URL: ?page=3 | status: ""
قبل الـ refresh                | كروت: 48 | URL: ?page=4 | status: ""
بعد الـ refresh                | كروت: 48 | URL: ?page=4 | status: ""
الـ sidebar مفتوح: 2 | عرض الـ feed 716px ← 2 أعمدة
الـ sidebar مقفول: 3 | عرض الـ feed 988px ← 3 أعمدة
شاشة 600px: 1 | عرض الـ feed 488px ← 1 أعمدة
رجعنا: pageshow persisted = true | marker = 1 | 1 بوست جديد | أول كارت: بوست رقم 61 (جديد)
لوج السيرفر (آخر 4): GET /api/posts?page=2 , GET /api/posts?page=3 , GET /api/posts?page=4 , GET /api/posts?since=60
pageerrors: 0
~~~

~~~text الناتج (node --test، Node 24)
✔ columnsFor: من عرض الـ container (1.7207ms)
✔ pageFromSearch: أي قيمة غلط = 1 (0.2325ms)
✔ loader: نداءين مع بعض = request واحد (56.5984ms)
✔ loader: الفشل بيسيب نفس الصفحة للمحاولة الجاية (0.6027ms)
✔ loader: بعد آخر صفحة مفيش requests (0.2189ms)
✔ fetchJSON: timeout بيرمي TimeoutError (46.0281ms)
✔ fetchJSON: status مش ok بيرمي (20.3281ms)
✔ debounce: آخر نداء بس (57.6578ms)
ℹ tests 8
ℹ pass 8
ℹ fail 0
~~~

- **٣٠ scroll لآخر الصفحة ورا بعض كل 30ms:** كل صفحة اتطلبت **مرة واحدة** بالظبط.
- **«خلصت» و [[disconnect]]:** ٥ scroll زيادة = صفر requests.
- **Offline:** [[context.setOffline(true)]] (زي Offline في DevTools) طلّع الرسالة والزرار، ورجوع النت و «حاول تاني» جاب صفحة ٣ (اللي فشلت) مش ٤.
- **refresh على [[?page=4]]:** رجع ٤٨ كارت.
- **الأعمدة:** نفس الشاشة (1100px)، الـ sidebar لوحده غيّر العدد من ٢ لـ ٣.
- **bfcache:** [[Page.backForwardCacheNotUsed]] متبعتش، و [[window.__marker]] اللي حطيناه قبل ما نمشي لسه موجود (نفس الصفحة في الميموري)، و [[persisted = true]]، والبوست اللي اتضاف وإحنا برا ظهر فوق. ده نفس اللي زرار Test back/forward cache في DevTools بيقيسه.

## اللي حصل وإحنا بنبنيه

- **الـ feed كان بيقف على الشاشات الطويلة:** جرّبنا نسخة من غير [[recheck()]] على شاشة طولها 2200px: بعد ٣ ثواني ٢٤ كارت بس والـ sentinel لسه ظاهر ومفيش طلبات تانية. الـ observer بلّغ مرة إن الـ sentinel دخل، ومن ساعتها هو جوه، فمفيش «تغيير» يبعت له نداء. مع [[recheck()]] نفس الشاشة حمّلت ٤٨ لحد ما الـ sentinel نزل تحت.
- **الـ bfcache مكانش بيشتغل في التجربة الأولى:** Playwright بيشغّل Chrome بـ [[--disable-back-forward-cache]]، والسبب اللي طلع في [[Page.backForwardCacheNotUsed]] كان [[BackForwardCacheDisabledByCommandLine]]. شيلنا الـ flag بـ [[ignoreDefaultArgs]] والصفحة رجعت من الـ cache.

**الغلطة الشائعة:** متغير [[loading]] بـ [[true]] و [[false]] من غير ما تحمي [[page++]]. لو [[page++]] قبل الـ fetch والـ fetch فشل، الصفحة دي بتضيع، ولو بعده من غير حماية، اتنين scroll ورا بعض بيطلبوا نفس الصفحة.` },
        { lvl: 'فكرة', dir: "reading-resume", t: R`سلوك بتحبه في موقع تاني`, what: R`اختار حاجة بتعجبك في موقع بتستخدمه: الفيديو اللي بيقف لما تسيب التاب، أو الفهرس اللي بيعلّم القسم اللي انت فيه، أو الصورة اللي بتتحمّل وانت قربت منها، أو اللينك اللي بيتغيّر وانت بتفلتر. ابنيها بـ APIs الوحدة دي من غير مكتبات.`, done: R`السلوك شغال في صفحة لوحدها، ومكتوب جنبه الـ API اللي استخدمته، ومفيش listener بيفضل شغال بعد ما العنصر يتشال (اتأكد إن فيه [[disconnect]] أو [[unobserve]] أو [[removeEventListener]] في مكانه).`, ext: R`حوّله لدالة أو component بتاخد options، وحطه في مشروع بتاعك، وقيس الفرق بـ Lighthouse قبل وبعد.`, sol: R`## النسخة النموذجية: المقالة اللي بتفتكر وقفت فين

اخترنا سلوك موجود في مواقع القراية الكبيرة: شريط رفيع فوق بيقول قريت قد إيه، والفقرة اللي بتقراها متعلّمة، والعنوان بيتغيّر لـ [[#p12]] (تقدر تبعت اللينك لحد فيفتح عندها)، ولو قفلت التاب ورجعت يظهر زرار «كمّل من…». ليه ده: بيستخدم ٣ APIs من الوحدة مع بعض في حاجة صغيرة كل قارئ بيحس بيها.

~~~live 420 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مقالة بتفتكر وقفت فين</title>
<style>
  body { font: 17px/1.9 system-ui, sans-serif; margin: 0; }
  #bar { position: fixed; top: 0; inset-inline: 0; height: 4px; background: #e5e7eb; }
  #bar span { display: block; height: 100%; width: 0; background: #1d4ed8; transition: width .2s; }
  article { max-width: 640px; margin: 0 auto; padding: 24px 16px 60vh; }
  article p.current { background: #fef9c3; }
  #resume { position: fixed; bottom: 16px; inset-inline-start: 16px; font: inherit; padding: 8px 14px; border-radius: 8px; border: 0; background: #111827; color: #fff; }
  #resume[hidden] { display: none; }
  #info { font-size: 13px; color: #555; }
</style>
</head>
<body>
<div id="bar" role="progressbar" aria-label="قريت قد إيه" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>
<article id="post">
  <h1>ليه الكود البسيط بيكسب</h1>
  <p id="info"></p>
</article>
<button id="resume" hidden></button>
<script>
  // ---------- التخزين ممكن يكون مقفول (الـ preview) ----------
  const store = (() => {
    try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return localStorage; }
    catch { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; }
  })();

  const post = document.querySelector("#post");
  for (let i = 1; i <= 25; i++) post.insertAdjacentHTML("beforeend", $__bt<p id="p$__{i}">فقرة $__{i}: الكود اللي تقدر تقراه بعد شهر أهم من الكود اللي بيوفّر سطرين. اكتب أسامي واضحة، وقسّم الدوال، واحذف اللي مش مستخدم.</p>$__bt);

  function readingTracker(article, key) {
    const paras = [...article.querySelectorAll("p[id^='p']")];
    let furthest = 0;                     // أبعد فقرة وصلها (رقمها من 1)
    let current = null;

    const show = () => {
      const pct = Math.round((furthest / paras.length) * 100);
      document.querySelector("#bar span").style.width = pct + "%";
      document.querySelector("#bar").setAttribute("aria-valuenow", pct);
    };

    // فقرة «اتقرت» لما تعدّي نص الشاشة، والحالية هي اللي على الخط ده
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        furthest = Math.max(furthest, paras.indexOf(e.target) + 1);
        current?.classList.remove("current");
        current = e.target;
        current.classList.add("current");
        try { history.replaceState(null, "", "#" + current.id); } catch {}   // ممنوعة في صفحة معزولة
      }
      show();
      if (furthest === paras.length) io.disconnect();            // وصل لآخر فقرة
    }, { root: document, rootMargin: "-50% 0px -50% 0px" });
    paras.forEach((p) => io.observe(p));

    const save = () => { if (current) store.setItem(key, current.id); };
    const onVisibility = () => { if (document.hidden) save(); };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", save);

    // تنضيف: لو المقالة اتشالت من الصفحة (SPA مثلًا)
    return function destroy() {
      save();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", save);
    };
  }

  const KEY = "resume:" + location.pathname;
  const saved = store.getItem(KEY);
  const destroy = readingTracker(post, KEY);
  window.__destroy = destroy;

  if (saved && saved !== "p1" && !location.hash) {
    const btn = document.querySelector("#resume");
    btn.textContent = $__btكمّل من «$__{document.getElementById(saved)?.textContent.slice(0, 8)}…»$__bt;
    btn.hidden = false;
    btn.addEventListener("click", () => {
      document.getElementById(saved)?.scrollIntoView({ block: "center" });
      btn.hidden = true;
    }, { once: true });
  }
  document.querySelector("#info").textContent = "انزل واقرا، واقفل التاب في النص وافتحه تاني.";
</script>
</body>
</html>
~~~

في الـ preview الشريط والتعليم شغالين، بس التخزين والـ URL مقفولين (صفحة معزولة)، فـ «كمّل من» مش هيظهر بعد reload. شغّلها من سيرفر محلي.

## الـ APIs اللي استخدمناها

| السلوك | الـ API |
|---|---|
| الفقرة الحالية والشريط | IntersectionObserver بخط في نص الشاشة ([[rootMargin: "-50% 0px -50% 0px"]]) |
| [[#p12]] في العنوان | [[history.replaceState]] (مش [[pushState]]: مش عايزين entry لكل فقرة) |
| حفظ المكان | [[visibilitychange]] لـ [[hidden]] و [[pagehide]]، في [[localStorage]] |
| التنضيف | [[io.disconnect()]] و [[removeEventListener]] في [[destroy()]] |

## الشرح

- **[[readingTracker(article, key)]] بترجّع [[destroy]]:** كل حاجة اتسجّلت جوه الدالة بتتشال من مكان واحد. في SPA، لما المقالة تتشال من الصفحة، تنادي [[destroy()]] فمفيش observer ولا listener بيفضل ماسك عناصر مش موجودة.
- **[[io.disconnect()]] لما توصل لآخر فقرة:** المقالة خلصت، والشريط 100٪، فمفيش داعي يفضل يراقب.
- **[[furthest]]:** الشريط بيقيس أبعد فقرة وصلتلها مش عدد الفقرات اللي عدّت على الخط، عشان لو نطّيت لفقرة 12 بـ «كمّل» يبان 48٪ مش 8٪ (دي كانت أول نسخة).
- **[[store]] بـ [[try]]:** في الـ preview أو لو اليوزر قافل التخزين، الصفحة بتشتغل من الذاكرة.
- **[[key = "resume:" + location.pathname]]:** كل مقالة ليها مكانها.

## اتقاس

~~~text الناتج (Chrome 158 headless، 700×700، http://localhost:8835)
أول ما تفتح                bar=0% | current=undefined | hash= | resume=مخفي
نزلنا لفقرة 12             bar=48% | current=p12 | hash=#p12 | resume=مخفي
تاب جديد                   bar=12% | current=p3 | hash=#p3 | resume=كمّل من «فقرة 12:…»
ضغطنا «كمّل»               bar=48% | current=p12 | hash=#p12 | resume=مخفي
بعد destroy ونزلنا لـ 20   bar=48% | current=p12 | hash=#p12 | resume=مخفي
صفحة جديدة لحد آخر فقرة    bar=100% | current=p25 | hash=#p25 | resume=مخفي
[sandbox] bar=20% current=p5
pageerrors: 0
~~~

- قفلنا التاب على فقرة 12 من غير ما ندوس حاجة، والتاب الجديد عرض «كمّل من «فقرة 12:…»»: الحفظ حصل في [[visibilitychange]] أو [[pagehide]] وهو بيتقفل.
- بعد [[destroy()]] نزلنا لفقرة 20 والحالة مغيّرتش خالص: الـ observer اتفصل فعلًا.

**ليه مش scroll listener:** الشريط في المواقع دي غالبًا بيتحسب من [[scrollY]] في كل scroll. هنا بيتحدّث بس لما فقرة جديدة تعدّي نص الشاشة، وده كفاية لشريط بيقول «فاضلك قد إيه».

**وسّعها (ext):** حوّلها لـ [[readingTracker(article, { key, onProgress })]] بترجّع [[{ destroy, progress }]]، وقيس بـ Lighthouse قبل وبعد ما تضيفها لصفحة حقيقية (المفروض مفيش فرق في Total Blocking Time).` },
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
            { lvl: 'سريع', t: R`ابني سكشن «أرقامنا» فيه ٣ أرقام ([[data-to="1200"]] مثلًا) تحت أول شاشة: الأرقام بتعدّ من 0 لحد [[data-to]] في ثانية واحدة أول ما السكشن يظهر بـ [[threshold: 0.5]]، وبعدين [[unobserve]].`, done: R`الأرقام بتفضل 0 لحد ما تنزل للسكشن، وبتعدّ مرة واحدة بس وتقف على الرقم بالظبط (مش 1199 ولا 1201) مهما طلعت ونزلت، وفتح الصفحة على السكشن على طول بيعدّ برضه.`, sol: R`~~~live 420 count-up.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أرقامنا</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 0; }
  .hero { min-height: 110vh; display: grid; place-items: center; background: #eef2ff; }
  #stats { display: flex; gap: 24px; justify-content: center; padding: 48px 16px; flex-wrap: wrap; }
  .stat { text-align: center; }
  .num { font-size: 40px; font-weight: 700; color: #1d4ed8; font-variant-numeric: tabular-nums; }
  footer { min-height: 60vh; }
</style>
</head>
<body>
<section class="hero"><p>انزل لتحت ↓</p></section>
<section id="stats" aria-label="أرقامنا">
  <div class="stat"><div class="num" data-to="1200">0</div>طالب</div>
  <div class="stat"><div class="num" data-to="85">0</div>درس</div>
  <div class="stat"><div class="num" data-to="37">0</div>مشروع</div>
</section>
<footer></footer>
<script>
  function countUp(el, ms = 1000) {
    const to = Number(el.dataset.to);
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / ms, 1);      // من 0 لـ 1
      el.textContent = Math.round(to * t).toLocaleString("ar-EG");
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.querySelectorAll(".num").forEach((el) => countUp(el));
      obs.unobserve(e.target);                    // مرة واحدة بس
    }
  }, { threshold: 0.5 });
  io.observe(document.querySelector("#stats"));
</script>
</body>
</html>
~~~

انزل جوه الـ preview لحد «أرقامنا»: الأرقام بتعدّ مرة واحدة وتقف.

~~~text الناتج (Chrome 158 headless، نفس الملف جوه iframe معزول زي الـ preview، عرض 400px)
أول ما الصفحة تفتح: 0 / 0 / 0
بعد 300ms: ٣٣٢ / ٢٣ / ١٠
بعد ثانية ونص: ١٬٢٠٠ / ٨٥ / ٣٧
طلعنا ونزلنا تاني: ١٬٢٠٠ / ٨٥ / ٣٧
السكشن ظاهر من الأول: ١٬٢٠٠ / ٨٥ / ٣٧
pageerrors: 0
~~~

**ليه كده:**

- **observer على السكشن مش على كل رقم:** التلات أرقام بيبدأوا مع بعض، فعنصر واحد يكفي. [[threshold: 0.5]] معناها «لما نص السكشن يبقى جوه الشاشة».
- **[[if (!e.isIntersecting) continue]]:** الـ callback بيتنادى **مرة أول ما تعمل [[observe]]** حتى لو العنصر برا الشاشة، ومرة لما يخرج. من غير الشرط ده العدّ كان هيبدأ على طول.
- **[[obs.unobserve(e.target)]]:** بعد أول مرة مبقاش فيه داعي نراقب، فالطلوع والنزول مبيعيدش العدّ (السطر الرابع).
- **[[Math.min((now - start) / ms, 1)]] و [[Math.round(to * t)]]:** العدّ بالوقت مش بعدد الفريمات، فبيخلص في ثانية على أي شاشة (60Hz أو 120Hz). وآخر فريم [[t = 1]] بالظبط، فالرقم بيقف على [[1200]] مش 1199.
- **[[toLocaleString("ar-EG")]]:** بيكتب الأرقام عربي وبفاصل الآلاف ([[١٬٢٠٠]]). امسحها لو عايز [[1200]].
- **فتح الصفحة على السكشن:** أول نداء للـ callback بيلاقي [[isIntersecting: true]] فبيعدّ على طول، من غير أي كود زيادة.

**الغلطة الشائعة:** تعدّ بـ [[setInterval]] وتزوّد رقم ثابت كل مرة ([[n += 12]]). لو الرقم مش بيقبل القسمة بالظبط هيعدّي ([[1204]]) أو يقف قبله، ولو التاب اتخبى الـ interval بيبطّأ والعدّ ياخد أكتر من ثانية.` },
            { lvl: 'تطبيق', t: R`refactor: صفحة منتجات فيها [[cards.forEach((el) => new IntersectionObserver(cb).observe(el))]] لـ ١٠٠ كارت وبتحمّل صورة كل كارت لما يظهر. خليها observer واحد لكل الكروت، مع [[unobserve]] بعد التحميل و [[rootMargin: "200px"]]، من غير ما السلوك يتغير.`, done: R`عدد الـ observers بقى 1 بدل 100 (عدّهم بمتغير)، وكل صورة لسه بتتطلب مرة واحدة لما تقرّب منها (Network يأكد)، والكارت اللي اتحمّل مبيتناداش تاني لو طلعت ونزلت، وتقدر تقول ليه observer واحد أرخص.`, sol: R`**قبل** (الجزء اللي هيتغيّر بس):

~~~js
const cb = (entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const img = e.target.querySelector("img");
    img.src = imageUrl(img.dataset.n);
  }
};
cards.forEach((el) => new IntersectionObserver(cb).observe(el));
~~~

**بعد:** الصفحة كاملة. الصور SVG بتتعمل في الصفحة نفسها عشان تشتغل من غير سيرفر، والشريط اللي فوق بيعدّ الـ observers والتحميلات.

~~~live 420 lazy-cards.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منتجات بتتحمّل لما تقرب</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 0; }
  #bar { position: sticky; top: 0; background: #111827; color: #fff; padding: 8px 12px; font-size: 14px; }
  #grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; padding: 12px; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 8px; }
  .card img { display: block; width: 100%; aspect-ratio: 4 / 3; background: #e5e7eb; border-radius: 4px; }
</style>
</head>
<body>
<div id="bar">observers: <b id="obs">0</b> | صور اتحمّلت: <b id="loaded">0</b> من 100</div>
<div id="grid"></div>
<script>
  // صورة وهمية لكل منتج (SVG) عشان الصفحة تشتغل من غير سيرفر
  const imageUrl = (n) =>
    "data:image/svg+xml," + encodeURIComponent(
      $__bt<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30"><rect width="40" height="30" fill="hsl($__{n * 37 % 360} 70% 70%)"/><text x="20" y="19" font-size="10" text-anchor="middle">$__{n}</text></svg>$__bt,
    );

  const grid = document.querySelector("#grid");
  for (let i = 1; i <= 100; i++) {
    grid.insertAdjacentHTML("beforeend",
      $__bt<div class="card"><img alt="منتج $__{i}" data-n="$__{i}" width="160" height="120">منتج $__{i}</div>$__bt);
  }

  let observers = 0;
  let loaded = 0;
  const loads = {};              // كام مرة كل صورة اتحمّلت

  // observer واحد لكل الكروت
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const img = e.target.querySelector("img");
      img.src = imageUrl(img.dataset.n);
      loads[img.dataset.n] = (loads[img.dataset.n] ?? 0) + 1;
      document.querySelector("#loaded").textContent = ++loaded;
      obs.unobserve(e.target);   // اتحمّل خلاص
    }
  }, { root: document, rootMargin: "200px" });
  observers++;
  document.querySelector("#obs").textContent = observers;

  document.querySelectorAll(".card").forEach((card) => io.observe(card));
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 headless، نفس الملف جوه iframe معزول عرضه 400px، و scroll للأماكن دي بالترتيب)
                   بعد                       قبل
أول ما تفتح:       observers: 1 | 10 من 100   observers: 100 | 8 من 100
scroll 1500:       observers: 1 | 24 من 100   observers: 100 | 16 من 100
scroll 4000:       observers: 1 | 38 من 100   observers: 100 | 26 من 100
scroll 0:          observers: 1 | 38 من 100   observers: 100 | 34 من 100
scroll 4000:       observers: 1 | 38 من 100   observers: 100 | 44 من 100
scroll 99999:      observers: 1 | 48 من 100   observers: 100 | 52 من 100
صورة اتحمّلت أكتر من مرة؟   false             true
pageerrors: 0
~~~

**ليه كده:**

- **observer واحد و [[observe]] لكل كارت:** الـ observer الواحد بيراقب أي عدد من العناصر، والـ callback بياخد [[entries]] فيها كل اللي حالته اتغيّرت مع بعض في نفس الفريم، و [[e.target]] بيقولك أنهي كارت.
- **[[obs.unobserve(e.target)]]:** بعد ما الصورة اتحمّلت مفيش سبب نفضل نسأل عن الكارت. في النسخة القديمة الرجوع لفوق ونزول تاني حمّل نفس الصور تاني (٣٤ بعد ما رجعنا لـ 0، و ٥٢ في الآخر).
- **[[rootMargin: "200px"]]:** بيكبّر منطقة الشاشة ٢٠٠px من كل ناحية، فالصورة بتبدأ تتحمّل قبل ما توصلها بشوية واليوزر ميشوفش مربع فاضي (عشان كده «بعد» حمّلت ١٠ في الأول مش ٨: الصفين اللي تحت الشاشة على طول).
- **[[root: document]]:** من غيره، الـ observer في صفحة جوه iframe من origin تاني (زي الـ preview هنا، أو widget متركّب في موقع حد) بيحسب التقاطع مع شاشة الصفحة **الكبيرة** وبيتجاهل الـ [[rootMargin]] خالص. قسناها: نفس الصفحة من غير [[root: document]] حمّلت ٨ في الأول زي النسخة اللي مفيهاش margin أصلًا. [[root: document]] بيقول «احسب على شاشة الصفحة دي نفسها»، وفي صفحة عادية مش في iframe بيدّي نفس النتيجة.
- **ليه observer واحد أرخص:** كل observer ليه حسابات خاصة بيه في كل فريم والمتصفح بيحسب التقاطع لكل واحد لوحده، وكل واحد بينادي callback لوحده. واحد بـ ١٠٠ target بيعمل الحسبة مرة وبينادي callback واحد بكل التغييرات.
- **الـ scroll بنطّة كبيرة (من 1500 لـ 4000) مبيحمّلش الكروت اللي في النص:** هي معدّتش على الشاشة أصلًا، وده المطلوب.

على سيرفر حقيقي حط الـ URL في [[data-src]] و [[img.src = img.dataset.src]]، وهتشوف كل صورة مرة واحدة في Network. وأسهل من ده كله لصور بسيطة: [[<img loading="lazy">]]، المتصفح بيعمل نفس الحكاية لوحده. الـ observer لما تحتاج تعمل حاجة زيادة (animation، أو fetch لداتا الكارت).

**الغلطة الشائعة:** تنسى [[unobserve]] وتحط شرط [[if (img.src) return]]. بيشتغل، بس الـ observer لسه بيراقب ١٠٠ كارت للأبد وبينادي الـ callback على الفاضي مع كل scroll.` },
            { lvl: 'تحدي', t: R`ابني فهرس جانبي (scroll spy) لمقالة: لينك لكل [[<section>]]، واللينك بتاع القسم اللي في نص الشاشة عليه [[class="active"]] بـ [[rootMargin: "-50% 0px -50% 0px"]]، والـ URL بيتحدّث بـ [[#id]] القسم بـ [[replaceState]] (درس pushState).`, done: R`اللينك النشط بيتغير لما القسم يعدّي نص الشاشة، وفي أي لحظة لينك واحد بس عليه [[active]] (حتى في آخر الصفحة)، و refresh على [[#section-3]] بيفتح عنده واللينك بتاعه نشط، ومفيش [[getBoundingClientRect]] ولا scroll listener في الكود.`, sol: R`~~~live 420 scroll-spy.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فهرس بيتابعك</title>
<style>
  body { font: 15px/1.7 system-ui, sans-serif; margin: 0; display: grid; grid-template-columns: 120px 1fr; }
  nav { position: sticky; top: 0; align-self: start; padding: 12px; }
  nav a { display: block; padding: 4px 8px; border-radius: 4px; color: #374151; text-decoration: none; }
  nav a.active { background: #1d4ed8; color: #fff; }
  main { padding: 12px 16px; }
  section { min-height: 70vh; border-bottom: 1px solid #ddd; }
  section:last-of-type { min-height: 30vh; }
  #note { font-size: 12px; color: #92400e; }
</style>
</head>
<body>
<nav aria-label="الفهرس">
  <a href="#section-1">المقدمة</a>
  <a href="#section-2">التركيب</a>
  <a href="#section-3">الاستخدام</a>
  <a href="#section-4">الأخطاء</a>
  <a href="#section-5">الخلاصة</a>
  <p id="note"></p>
</nav>
<main>
  <section id="section-1"><h2>المقدمة</h2><p>نص المقدمة...</p></section>
  <section id="section-2"><h2>التركيب</h2><p>نص التركيب...</p></section>
  <section id="section-3"><h2>الاستخدام</h2><p>نص الاستخدام...</p></section>
  <section id="section-4"><h2>الأخطاء</h2><p>نص الأخطاء...</p></section>
  <section id="section-5"><h2>الخلاصة</h2><p>نص الخلاصة...</p></section>
  <div id="end" style="height:1px"></div>
</main>
<script>
  const links = new Map(
    [...document.querySelectorAll("nav a")].map((a) => [a.hash.slice(1), a]),
  );
  let current = null;

  function activate(id) {
    if (id === current) return;
    current = id;
    for (const [key, a] of links) a.classList.toggle("active", key === id);
    try {
      history.replaceState(null, "", "#" + id);   // مش pushState: مش عايزين back يلف على الأقسام
    } catch {
      // الصفحة معزولة (زي الـ preview): الـ URL مينفعش يتغيّر، والفهرس شغال عادي
      document.querySelector("#note").textContent = "الـ URL مبيتغيّرش هنا (صفحة معزولة)";
    }
  }

  // خط واحد في نص الشاشة بالظبط: القسم اللي بيعدّي عليه هو النشط
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) activate(e.target.id);
  }, { root: document, rootMargin: "-50% 0px -50% 0px" });
  document.querySelectorAll("main section").forEach((s) => spy.observe(s));

  // آخر قسم قصير وممكن ميوصلش لنص الشاشة: لما آخر الصفحة يبان، فعّله
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) activate("section-5");
  }).observe(document.querySelector("#end"));

  activate(location.hash.slice(1) && links.has(location.hash.slice(1)) ? location.hash.slice(1) : "section-1");
</script>
</body>
</html>
~~~

اعمل scroll جوه الـ preview: اللينك النشط بيتغيّر مع كل قسم يعدّي نص الشاشة. وتحت الفهرس هتلاقي «الـ URL مبيتغيّرش هنا»: الـ preview صفحة معزولة و [[replaceState]] بيرمي فيها [[SecurityError]]، فالصفحة بتكمّل من غيره. انسخها وشغّلها من سيرفر محلي والـ [[#id]] هيبان في العنوان.

~~~text الناتج (Chrome 158 headless، 500×600، نفس الملف مرة جوه iframe معزول ومرة من http://localhost)
[sandbox]   scroll 0     active=المقدمة   hash=""
[sandbox]   scroll 500   active=التركيب   hash=""
[sandbox]   scroll 1300  active=الأخطاء   hash=""
[sandbox]   scroll 99999 active=الخلاصة   hash=""
[localhost] scroll 0     active=المقدمة   hash=#section-1
[localhost] scroll 500   active=التركيب   hash=#section-2
[localhost] scroll 1300  active=الأخطاء   hash=#section-4
[localhost] scroll 99999 active=الخلاصة   hash=#section-5
[localhost] فتح على #section-3: active=الاستخدام  scrollY=910
[localhost] refresh:            active=الاستخدام  hash=#section-3
pageerrors: 0
~~~

**ليه كده:**

- **[[rootMargin: "-50% 0px -50% 0px"]]:** بيقص نص الشاشة من فوق ونصها من تحت، فمنطقة الـ root بقت **خط** في النص. القسم «intersecting» بس وهو معدّي على الخط ده، وفي أي لحظة قسم واحد بس بيعدّي عليه.
- **[[root: document]]:** هنا اكتشاف حقيقي من القياس. أول نسخة كانت من غيره، وفي الـ iframe المعزول طلّعت «التركيب» وانت في أول الصفحة. السبب: في iframe من origin تاني، الـ observer الافتراضي بيحسب على شاشة الصفحة **اللي برا** وبيتجاهل الـ [[rootMargin]]، فكل قسم ظاهر كان بيتحسب intersecting وآخر واحد بيكسب. [[root: document]] خلّاه يحسب على شاشة الصفحة دي، وعلى localhost النتيجة هي هي.
- **[[activate]] بتشيل وتحط في نفس اللفة:** [[classList.toggle("active", key === id)]] على كل اللينكات، فمستحيل يبقى فيه اتنين نشطين.
- **[[#end]] في الآخر:** آخر قسم قصير ([[30vh]]) ومش هيوصل لنص الشاشة أبدًا. عنصر بطول 1px في آخر الصفحة، أول ما يظهر بنفعّل «الخلاصة».
- **[[replaceState]] مش [[pushState]]:** كل قسم بيعدّي لو عمل entry في الـ history، زرار back هيلف على الأقسام واحد واحد بدل ما يرجّعك للصفحة اللي قبل.
- **[[location.hash]] في الآخر:** فتح الصفحة على [[#section-3]] بينزل عنده (المتصفح بيعمل ده لوحده) واللينك بتاعه بيتفعّل من أول لحظة.
- **[[try/catch]] حوالين [[replaceState]]:** في الـ preview بيرمي [[SecurityError]]، ومن غير الـ catch كان [[activate]] الأول هيوقّف السكربت كله.

**الغلطة الشائعة:** تحسب بـ [[getBoundingClientRect]] جوه scroll listener. بيشتغل، بس بيتنادى عشرات المرات في الثانية وكل مرة بيجبر المتصفح يحسب الـ layout. الـ observer بيتنادى بس لما الحالة تتغيّر.` },
          ],
          ref: [
            { t: "MDN: Intersection Observer API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API" },
            { t: "MDN: IntersectionObserver() constructor", url: "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver" },
            { t: "MDN: IntersectionObserver.rootMargin", url: "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin" },
          ],
          flag: "script",
          deep: {
            why: "الطريقة القديمة: [[scroll]] listener بيشتغل عشرات المرات في الثانية، وجواه [[getBoundingClientRect()]] لكل عنصر، وده بيجبر المتصفح يحسب الـ layout كل مرة (layout thrashing، تاب HTML و CSS) فالـ scroll يقطّع على الموبايل. IntersectionObserver بيعمل الحساب ده جوه المتصفح بكفاءة ويناديك بس لما الحالة تتغير.",
            how: R`الـ callback بيتنادى مرة أول ما تعمل observe (بالحالة الحالية)، وبعدين كل ما العنصر يعدّي threshold دخول أو خروج. كل entry فيه [[isIntersecting]] و [[intersectionRatio]] (نسبة الظاهر) و [[target]] و [[boundingClientRect]]. الـ callback بيشتغل async بعد الـ frame، مش أثناء الـ scroll.

الفخ الشهير: لو الصفحة الأولى قصيرة والـ sentinel لسه ظاهر بعد التحميل، مفيش «تغيير» في الحالة (كان ظاهر وفضل ظاهر)، فالـ callback مش هيتنادى تاني والتحميل يقف. [[unobserve]] ثم [[observe]] بيجبره يبعت entry جديد بالحالة الحالية، فلو لسه ظاهر يحمّل الصفحة اللي بعدها.

و [[loading]] بيمنع طلبين مع بعض (الـ callback ممكن يتنادى تاني قبل ما الأول يخلص)، و [[done]] بيوقف لما السيرفر يرجّع ليستة فاضية. و [[finally]] بيضمن إن loading يرجع false حتى لو الطلب فشل.

في الـ reveal: [[unobserve]] بعد أول ظهور عشان الأنيميشن يحصل مرة، ومنراقبش عناصر خلاص. وللصور مش محتاج JS أصلًا: [[<img loading="lazy">]] بيعمل lazy loading لوحده.`,
            when: R`infinite scroll، و lazy loading لحاجات تقيلة (فيديو، خرايط، iframes، charts)، وأنيميشن عند الظهور، وتحديد القسم الحالي في جدول المحتويات، و analytics «الإعلان اتشاف». وفي React فيه hooks جاهزة زي [[react-intersection-observer]]، أو [[useEffect]] + ref (تاب React).`,
            mistakes: R`تنسى الفخ ده فالتحميل يقف على الشاشات الكبيرة. ومفيش حماية من التحميل المزدوج. وتنسى [[disconnect()]] لما الـ component يتشال (memory leak، درس memory leaks). و [[threshold: 1]] على عنصر أطول من الشاشة: عمره ما هيبقى ظاهر ١٠٠٪. وفي infinite scroll: الفوتر بقى مستحيل توصله، وزرار back بيرجّعك لأول الليستة؛ فكّر في زرار «حمّل أكتر» أو احفظ الصفحة في الـ URL. وفخ أخير: لو صفحتك جوه iframe من origin تاني (زي الـ preview الحي في الموقع ده، أو widget متركّب في موقع حد تاني)، [[rootMargin]] بيتجاهل لما الـ root هو الـ viewport الافتراضي، فالتحميل المبكر ميشتغلش. الحل [[{ root: document, rootMargin: "300px" }]]: كده الـ root هو document الصفحة نفسها، والـ margin بيتطبّق (عشان كده حلول التمارين تحت كلها كاتباه).`
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
            { lvl: 'سريع', t: R`ابني عنوان عمود في جدول بيكتب اسم اليوم كامل ([[Wednesday]]) لو عرضه 120px أو أكتر، ومختصر ([[Wed]]) لو أقل، بـ ResizeObserver على العنوان نفسه و [[Intl.DateTimeFormat]] بـ [[weekday: "long"]] و [["short"]].`, done: R`لما تضيّق العمود الأسماء بتتقلب مختصرة والعكس، ومفيش نص بيتقص بـ «...»، والتبديل بيحصل عند 120px من عرض العمود مش الشاشة (جرّب تضيّق العمود بس والشاشة كبيرة).`, sol: R`السلايدر بيغيّر عرض الأعمدة بس، عشان تجرّب «العمود ضاق والشاشة لسه كبيرة».

~~~live 200 day-headers.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسماء الأيام حسب عرض العمود</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  table { border-collapse: collapse; table-layout: fixed; }
  th, td { box-sizing: border-box; border: 1px solid #ccc; padding: 6px; white-space: nowrap; overflow: hidden; }
  th { background: #f3f4f6; }
  label { display: block; margin-bottom: 12px; }
</style>
</head>
<body>
<label>عرض كل عمود: <input type="range" id="w" min="50" max="180" value="150"> <output id="wv">150</output>px</label>
<table>
  <thead><tr id="days"></tr></thead>
  <tbody><tr id="cells"></tr></tbody>
</table>
<script>
  const long = new Intl.DateTimeFormat("en", { weekday: "long" });
  const short = new Intl.DateTimeFormat("en", { weekday: "short" });
  const row = document.querySelector("#days");
  const cells = document.querySelector("#cells");

  // 2026-11-16 يوم اتنين، وبعده ٦ أيام
  for (let i = 0; i < 7; i++) {
    const day = new Date(2026, 10, 16 + i);
    const th = document.createElement("th");
    th.dataset.long = long.format(day);
    th.dataset.short = short.format(day);
    th.textContent = th.dataset.long;
    row.append(th);
    cells.insertAdjacentHTML("beforeend", "<td>—</td>");
  }

  // بنراقب عرض العنوان نفسه، مش الشاشة
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const width = e.borderBoxSize[0].inlineSize;
      const th = e.target;
      const text = width >= 120 ? th.dataset.long : th.dataset.short;
      if (th.textContent !== text) th.textContent = text;
    }
  });
  row.querySelectorAll("th").forEach((th) => ro.observe(th));

  const w = document.querySelector("#w");
  const setWidth = () => {
    row.querySelectorAll("th").forEach((th) => (th.style.width = w.value + "px"));
    document.querySelector("#wv").textContent = w.value;
  };
  w.addEventListener("input", setWidth);
  setWidth();
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 headless، الشاشة 1400px طول الوقت، والسلايدر على القيم دي)
عرض 150px: Monday Tuesday Wednesday Thursday Friday Saturday Sunday | فيه نص مقصوص؟ false
عرض 121px: Monday Tuesday Wednesday Thursday Friday Saturday Sunday | فيه نص مقصوص؟ false
عرض 119px: Mon Tue Wed Thu Fri Sat Sun | فيه نص مقصوص؟ false
عرض 100px: Mon Tue Wed Thu Fri Sat Sun | فيه نص مقصوص؟ false
عرض 60px: Mon Tue Wed Thu Fri Sat Sun | فيه نص مقصوص؟ false
عرض 170px: Monday Tuesday Wednesday Thursday Friday Saturday Sunday | فيه نص مقصوص؟ false
pageerrors: 0
~~~

**ليه كده:**

- **[[ro.observe(th)]] لكل عنوان:** الـ ResizeObserver بيتنادى لما **العنصر** يتغيّر مقاسه لأي سبب (العمود ضاق، الـ sidebar اتفتح، الخط كبر)، مش لما الشاشة تتغيّر. عشان كده الشاشة فضلت 1400px والأسماء اتقلبت.
- **[[e.borderBoxSize[0].inlineSize]]:** العرض شامل الـ padding والـ border، وهو اللي بتشوفه. [[inlineSize]] هو العرض في اتجاه الكتابة (أفقي في العربي والإنجليزي).
- **[[box-sizing: border-box]]:** أول نسخة كانت من غيره، فالعرض الحقيقي طلع 163 لما السلايدر 150 (الـ padding 12 والـ border اتزادوا عليه)، والتبديل حصل عند سلايدر 107 مش 120. مع [[border-box]] السلايدر = العرض بالظبط.
- **[[Intl.DateTimeFormat("en", { weekday: "long" })]] و [["short"]]:** الأسماء من المتصفح نفسه، فلو غيّرت [["en"]] لـ [["ar"]] هتطلع «الاثنين» و «الاثنين» برضه (العربي مفيهوش اختصار)، وده سبب إننا بنخزّن الاتنين في [[data-*]] ونختار.
- **[[if (th.textContent !== text)]]:** متغيّرش النص لو هو هو. تغيير النص ممكن يغيّر مقاس العنصر، وده ممكن يدخّل الـ observer في لف (التمرين التالت بيوريه).

**الغلطة الشائعة:** تستخدم [[window.addEventListener("resize")]] وتقارن بـ [[innerWidth]]. ده بيتنادى بس لما الشاشة تتغيّر، فتضييق العمود نفسه (من السلايدر أو من sidebar) مبيعملش حاجة، والأسماء الطويلة بتتقص بـ «...».` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب [[pickSize(width, breakpoints)]] من غير DOM: [[pickSize(399, { m: 400, l: 700 })]] بترجّع [["s"]]. وبعدين استخدمها جوه الـ callback بتاع الدرس بدل الـ ternary.`, done: R`400 بالظبط بترجّع [["m"]] و 700 بترجّع [["l"]]، والـ breakpoints لو اتبعتت بترتيب عكسي ([[{ l: 700, m: 400 }]]) بترجّع نفس النتيجة، و [[NaN]] أو رقم سالب بيرمي [[RangeError]]، و ٦ assertions بـ [[node:assert]] في Node بيعدّوا، والكارت في المتصفح لسه بيتصرف زي الأول.`, sol: R`**الدالة لوحدها (من غير DOM) وتستها في Node:**

~~~js pick-size.mjs
export function pickSize(width, breakpoints) {
  if (typeof width !== "number" || Number.isNaN(width) || width < 0) {
    throw new RangeError($__btwidth لازم رقم >= 0، جالي $__{width}$__bt);
  }
  // من الأكبر للأصغر، مهما كان ترتيب المفاتيح في الـ object
  const sorted = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
  for (const [name, min] of sorted) {
    if (width >= min) return name;
  }
  return "s";
}
~~~

~~~js pick-size.test.mjs
import assert from "node:assert/strict";
import { pickSize } from "./pick-size.mjs";

const bp = { m: 400, l: 700 };
assert.equal(pickSize(399, bp), "s");
assert.equal(pickSize(400, bp), "m");
assert.equal(pickSize(699, bp), "m");
assert.equal(pickSize(700, bp), "l");
assert.equal(pickSize(700, { l: 700, m: 400 }), "l");
assert.equal(pickSize(500, { l: 700, m: 400 }), "m");
assert.throws(() => pickSize(NaN, bp), RangeError);
assert.throws(() => pickSize(-1, bp), RangeError);
console.log("كل الـ assertions عدّت (8)");
~~~

~~~text الناتج (node pick-size.test.mjs، Node 24)
كل الـ assertions عدّت (8)
~~~

**وفي الصفحة:** نفس الدالة جوه الـ callback بدل الـ ternary. السلايدر بيغيّر عرض الحاوية بس.

~~~live 260 card-size.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كارت بيعرف مقاسه</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #wrap { border: 2px dashed #9ca3af; padding: 8px; }
  .card { display: grid; gap: 8px; padding: 12px; border-radius: 8px; background: #eff6ff; }
  .card[data-size="m"] { grid-template-columns: 120px 1fr; }
  .card[data-size="l"] { grid-template-columns: 160px 1fr 1fr; }
  .pic { background: #93c5fd; min-height: 60px; border-radius: 6px; }
</style>
</head>
<body>
<label>عرض الحاوية: <input type="range" id="w" min="200" max="900" value="600"></label>
<p id="info"></p>
<div id="wrap">
  <article class="card">
    <div class="pic"></div>
    <div>اسم المنتج والوصف</div>
    <div>السعر وزرار الشرا</div>
  </article>
</div>
<script>
  // نفس الدالة اللي في pick-size.mjs (هنا inline عشان الصفحة ملف واحد)
  function pickSize(width, breakpoints) {
    if (typeof width !== "number" || Number.isNaN(width) || width < 0) {
      throw new RangeError($__btwidth لازم رقم >= 0، جالي $__{width}$__bt);
    }
    const sorted = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
    for (const [name, min] of sorted) if (width >= min) return name;
    return "s";
  }

  const card = document.querySelector(".card");
  new ResizeObserver(([entry]) => {
    const width = entry.contentBoxSize[0].inlineSize;
    entry.target.dataset.size = pickSize(width, { m: 400, l: 700 });
    document.querySelector("#info").textContent =
      $__btعرض الكارت $__{Math.round(width)}px ← data-size="$__{entry.target.dataset.size}"$__bt;
  }).observe(card);

  const w = document.querySelector("#w");
  const wrap = document.querySelector("#wrap");
  const apply = () => (wrap.style.width = w.value + "px");
  w.addEventListener("input", apply);
  apply();
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 headless، جوه iframe معزول، الشاشة ثابتة 1000px)
الحاوية 300px → عرض الكارت 276px ← data-size="s"
الحاوية 423px → عرض الكارت 399px ← data-size="s"
الحاوية 424px → عرض الكارت 400px ← data-size="m"
الحاوية 723px → عرض الكارت 699px ← data-size="m"
الحاوية 724px → عرض الكارت 700px ← data-size="l"
pageerrors: 0
~~~

**ليه كده:**

- **[[Object.entries(breakpoints).sort((a, b) => b[1] - a[1])]]:** بنرتّب من الأكبر للأصغر **بالقيمة**، فترتيب المفاتيح في الـ object مبيفرقش ([[{ l: 700, m: 400 }]] و [[{ m: 400, l: 700 }]] نفس النتيجة). وأول breakpoint العرض أكبر منه أو قده هو المقاس.
- **[[width >= min]]:** الحد نفسه تبع المقاس الأكبر: 400 بالظبط = [["m"]]، وده نفس سلوك [[min-width]] في الـ CSS media queries.
- **[[return "s"]]:** أي حاجة أقل من أصغر breakpoint.
- **الفحص الأول:** [[NaN >= 400]] بـ [[false]] و [[-1 >= 400]] بـ [[false]]، فمن غيره كانوا هيرجّعوا [["s"]] ساكتين. الـ [[RangeError]] بيقول إن فيه حاجة غلط في اللي نادى.
- **فايدة إنها من غير DOM:** اتختبرت في Node في أقل من ثانية، من غير متصفح ولا ResizeObserver. الـ callback بقى سطر واحد بيوصّل الدالة بالـ DOM.
- **[[contentBoxSize]] في الصفحة:** عرض المحتوى من غير الـ padding (12 من كل ناحية)، عشان كده الحاوية 424 = كارت 400.

**الغلطة الشائعة:** تلف على الـ object من غير ترتيب وترجع أول واحد ينفع: [[for (const [k, v] of Object.entries(bp)) if (width >= v) return k]]. مع [[{ m: 400, l: 700 }]] العرض 800 هيرجّع [["m"]] لأن [[m]] جت الأول.` },
            { lvl: 'تحدي', t: R`ابني navbar «priority+»: لينكات كتير في سطر واحد، واللي مش لاقي مكان يتنقل لقايمة «المزيد». راقب الـ nav نفسه مش اللينكات اللي بتنقلها، واسمع لـ [[window.addEventListener("error", (e) => console.log(e.message))]] عشان لو وقعت في loop تعرف.`, done: R`وانت بتضيّق الشاشة اللينكات بتتنقل لـ «المزيد» من الآخر للأول، ولما توسّع بترجع بنفس الترتيب، ومفيش لينك بيلف لسطر تاني، وزرار «المزيد» بيختفي لما كل اللينكات تكفي، والـ listener مطبعش أي رسالة فيها «ResizeObserver loop» (نصها الكامل: «ResizeObserver loop completed with undelivered notifications.»).`, sol: R`~~~live 200 priority-nav.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>navbar priority+</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 0; }
  nav { display: flex; align-items: center; gap: 4px; background: #111827; padding: 6px 8px; position: relative; }
  #links { display: flex; gap: 4px; flex: 1; min-width: 0; margin: 0; padding: 0; list-style: none; overflow: hidden; white-space: nowrap; }
  nav a { color: #fff; text-decoration: none; padding: 6px 10px; border-radius: 4px; display: block; }
  nav a:hover { background: #374151; }
  #more { font: inherit; background: #374151; color: #fff; border: 0; border-radius: 4px; padding: 6px 10px; }
  #more[hidden] { display: none; }
  #menu { position: absolute; top: 100%; inset-inline-end: 8px; background: #1f2937; list-style: none; margin: 0; padding: 4px; border-radius: 6px; }
  #log { font-size: 13px; color: #555; padding: 8px; }
</style>
</head>
<body>
<nav aria-label="الرئيسية">
  <ul id="links">
    <li><a href="#">الرئيسية</a></li>
    <li><a href="#">المنتجات</a></li>
    <li><a href="#">العروض</a></li>
    <li><a href="#">المدونة</a></li>
    <li><a href="#">من إحنا</a></li>
    <li><a href="#">الوظائف</a></li>
    <li><a href="#">المساعدة</a></li>
    <li><a href="#">كلمنا</a></li>
  </ul>
  <button id="more" aria-expanded="false" aria-controls="menu" hidden>المزيد ▾</button>
  <ul id="menu" hidden></ul>
</nav>
<p id="log"></p>
<script>
  window.addEventListener("error", (e) => console.log("error event:", e.message));

  const nav = document.querySelector("nav");
  const links = document.querySelector("#links");
  const menu = document.querySelector("#menu");
  const more = document.querySelector("#more");
  const all = [...links.children];               // الترتيب الأصلي

  function layout() {
    links.append(...all);                         // رجّع الكل للسطر
    more.hidden = true;
    if (links.scrollWidth <= links.clientWidth) { menu.replaceChildren(); menu.hidden = true; return; }
    more.hidden = false;                          // الزرار ليه مكان، فاحسب بعد ما يظهر
    const moved = [];
    while (links.children.length && links.scrollWidth > links.clientWidth) {
      moved.unshift(links.lastElementChild);      // من الآخر للأول
      links.lastElementChild.remove();
    }
    menu.replaceChildren(...moved);
    if (more.getAttribute("aria-expanded") !== "true") menu.hidden = true;
    document.querySelector("#log").textContent =
      $__btفي السطر $__{links.children.length}، في «المزيد» $__{moved.length}$__bt;
  }

  // بنراقب الـ nav نفسه: مقاسه بييجي من الأب، فنقل اللينكات مبيغيّروش
  new ResizeObserver(layout).observe(nav);

  more.addEventListener("click", () => {
    const open = more.getAttribute("aria-expanded") !== "true";
    more.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
  });
</script>
</body>
</html>
~~~

جرّب الـ preview على «موبايل» و «تابلت» و «كامل»: اللينكات اللي مش لاقية مكان بتروح لـ «المزيد».

~~~text الناتج (Chrome 158 headless، غيّرنا عرض الـ iframe المعزول بالترتيب ده)
900px | السطر: الرئيسية، المنتجات، العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا | المزيد(مخفي): - | عدد السطور: 1
600px | السطر: الرئيسية، المنتجات، العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا | المزيد(مخفي): - | عدد السطور: 1
420px | السطر: الرئيسية، المنتجات، العروض، المدونة | المزيد(ظاهر): من إحنا، الوظائف، المساعدة، كلمنا | عدد السطور: 1
300px | السطر: الرئيسية، المنتجات | المزيد(ظاهر): العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا | عدد السطور: 1
600px | السطر: الرئيسية، المنتجات، العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا | المزيد(مخفي): - | عدد السطور: 1
900px | السطر: الرئيسية، المنتجات، العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا | المزيد(مخفي): - | عدد السطور: 1
رسايل error: 0 | pageerrors: 0
~~~

**ليه كده:**

- **[[layout()]] بتبدأ من الصفر كل مرة:** بترجّع كل اللينكات للسطر بالترتيب الأصلي ([[all]])، وبعدين تشيل من الآخر لحد ما السطر يكفي. كده الرجوع لما توسّع بيحصل لوحده وبنفس الترتيب، من غير ما تحسب «أنهي واحد يرجع».
- **[[links.scrollWidth > links.clientWidth]]:** السطر عليه [[overflow: hidden]] و [[white-space: nowrap]]، فمستحيل يلف لسطر تاني، و [[scrollWidth]] بيقول المحتوى عايز قد إيه. لو أكبر من المساحة، فيه لينك زيادة.
- **[[more.hidden = false]] قبل اللفة:** الزرار نفسه بياخد مكان، فلازم يظهر **قبل** ما نحسب، وإلا آخر لينك هيتقص بالزرار.
- **[[moved.unshift(...)]]:** بنشيل من الآخر ونحط في أول القايمة، فـ «المزيد» بيفضل بنفس ترتيب الموقع.
- **[[observe(nav)]] مش [[observe(links)]]:** الـ nav عرضه جاي من الشاشة، ونقل اللينكات جواه مبيغيّرش مقاسه، فالـ observer مبيتناداش تاني بسبب شغلنا إحنا.

**جرّبنا الغلط:** نسخة بتراقب [[#links]] نفسه، وعرضه على قد محتواه ([[flex: 0 1 auto]]):

~~~text الناتج (النسخة البايظة، نفس الخطوات)
420px | السطر: الرئيسية، المنتجات، العروض، المدونة | المزيد(ظاهر): من إحنا، الوظائف، المساعدة، كلمنا
300px | السطر: الرئيسية، المنتجات | المزيد(ظاهر): العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا
600px | السطر: الرئيسية، المنتجات | المزيد(ظاهر): العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا
900px | السطر: الرئيسية، المنتجات | المزيد(ظاهر): العروض، المدونة، من إحنا، الوظائف، المساعدة، كلمنا
[
  'error event: ResizeObserver loop completed with undelivered notifications.',
  'error event: ResizeObserver loop completed with undelivered notifications.'
]
~~~

مشكلتين: الـ callback بيغيّر مقاس العنصر اللي بيراقبه، فالمتصفح بيلاقي تغيير جديد في نفس الفريم ويوقّفه برسالة [[ResizeObserver loop completed with undelivered notifications.]]. ولما وسّعنا، السطر عرضه على قد اللينكين اللي فيه، فمقاسه متغيّرش والـ observer متناداش أصلًا، واللينكات فضلت محبوسة في «المزيد».

**الغلطة الشائعة:** تفتكر إن رسالة الـ loop مش مهمة لأنها مش [[pageerror]]. هي بتطلع كـ [[error]] event على [[window]]، يعني أي أداة مراقبة أخطاء (Sentry مثلًا) هتسجّلها عند كل يوزر، ومعناها إن فيه إشعارات اتأجلت للفريم اللي بعده والشكل اترسم مرة غلط.` },
          ],
          ref: [
            { t: "MDN: Resize Observer API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API" },
            { t: "MDN: ResizeObserver", url: "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver" },
            { t: "MDN: ResizeObserverEntry.borderBoxSize", url: "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/borderBoxSize" },
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
            { lvl: 'سريع', t: R`ابني تحت [[<input type="file" multiple>]] جدول فيه لكل ملف: الاسم، والحجم بالـ KB بـ [[(file.size / 1024).toFixed(1)]]، والنوع، وزرار «شيل». الشيل بيبني [[input.files]] من جديد بـ [[new DataTransfer()]] و [[dt.items.add(file)]] و [[input.files = dt.files]].`, done: R`ملف 1536 بايت بيظهر 1.5 KB، والنوع الفاضي بيظهر «غير معروف»، و «شيل» بيمسح السطر و [[input.files.length]] بيقل واحد، والفورم لما تبعته مبيبعتش الملف اللي شلته.`, sol: R`~~~live 300 file-table.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الملفات اللي اخترتها</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  table { border-collapse: collapse; margin: 12px 0; }
  th, td { border-bottom: 1px solid #ddd; padding: 4px 8px; text-align: start; }
  td:nth-child(2) { direction: ltr; text-align: end; }
  button { font: inherit; }
  #sent { color: #065f46; }
</style>
</head>
<body>
<form id="form">
  <label>اختار ملفات: <input type="file" name="files" id="files" multiple></label>
  <table>
    <thead><tr><th>الاسم</th><th>الحجم</th><th>النوع</th><th></th></tr></thead>
    <tbody id="rows"></tbody>
  </table>
  <button>ابعت</button>
</form>
<p id="sent"></p>
<script>
  const input = document.querySelector("#files");
  const rows = document.querySelector("#rows");

  function render() {
    rows.replaceChildren(...[...input.files].map((file, i) => {
      const tr = document.createElement("tr");
      for (const text of [file.name, (file.size / 1024).toFixed(1) + " KB", file.type || "غير معروف"]) {
        const td = document.createElement("td");
        td.textContent = text;
        tr.append(td);
      }
      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.type = "button";                     // مش submit
      btn.textContent = "شيل";
      btn.addEventListener("click", () => removeAt(i));
      td.append(btn);
      tr.append(td);
      return tr;
    }));
  }

  // input.files للقراية بس: بنبني FileList جديدة من DataTransfer
  function removeAt(index) {
    const dt = new DataTransfer();
    [...input.files].forEach((file, i) => { if (i !== index) dt.items.add(file); });
    input.files = dt.files;
    render();
  }

  input.addEventListener("change", render);

  // بدل ما نبعت لسيرفر: نعرض اللي الفورم كانت هتبعته
  document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const names = new FormData(e.target).getAll("files").map((f) => f.name);
    document.querySelector("#sent").textContent = "الفورم هتبعت: " + (names.join("، ") || "ولا ملف");
  });
</script>
</body>
</html>
~~~

اختار كذا ملف من جهازك في الـ preview، ودوس «شيل» على واحد وبعدين «ابعت». (الـ preview مش هيبعت لسيرفر: الصفحة بتعرض اللي الفورم كانت هتبعته.)

~~~text الناتج (Chrome 158 headless، اخترنا ٣ ملفات حقيقية من الديسك بـ setInputFiles)
notes.txt | 1.5 KB | text/plain
photo.png | 200.0 KB | image/png
data.xyz | 0.0 KB | غير معروف
input.files.length: 3
--- بعد «شيل» على photo.png
notes.txt | 1.5 KB | text/plain
data.xyz | 0.0 KB | غير معروف
input.files.length: 2
الفورم هتبعت: notes.txt، data.xyz
pageerrors: 0
~~~

**ليه كده:**

- **[[(file.size / 1024).toFixed(1)]]:** [[file.size]] بالبايت. 1536 ÷ 1024 = 1.5، و [[toFixed(1)]] بيسيب رقم عشري واحد كنص ([["1.5"]]).
- **[[file.type || "غير معروف"]]:** المتصفح بيخمّن النوع **من الامتداد**. امتداد ميعرفوش ([[.xyz]]) = نص فاضي. ولاحظ إن [[photo.png]] هنا كلها أصفار ومع ذلك نوعها [[image/png]]: النوع مش فحص للمحتوى (التمرين اللي جاي بيعمل الفحص ده).
- **[[input.files]] مبتتعدّلش:** دي [[FileList]] للقراية بس، مفيهاش [[remove]] ولا [[splice]]. الطريقة الوحيدة: [[new DataTransfer()]]، تضيف فيه الملفات اللي عايزها بـ [[dt.items.add(file)]]، وبعدين [[input.files = dt.files]].
- **[[btn.type = "button"]]:** أي [[<button>]] جوه [[<form>]] نوعه [[submit]] افتراضيًا، فـ «شيل» كانت هتبعت الفورم.
- **[[new FormData(form).getAll("files")]]:** ده بالظبط اللي الفورم هتبعته، وبيقرا من [[input.files]] الجديدة، فالملف اللي اتشال مش موجود.
- **[[removeAt(i)]] بعدها [[render()]]:** الأرقام [[i]] اتغيّرت بعد الشيل، فبنرسم الجدول من جديد بدل ما نشيل الصف بس، وإلا «شيل» التانية هتشيل ملف غلط.

**الغلطة الشائعة:** تخزّن الملفات في array بتاعتك وتشيل منها، وتنسى الـ input. الجدول هيبان صح، بس الفورم هتبعت كل الملفات القديمة لأنها بتقرا من [[input.files]] مش من الـ array.` },
            { lvl: 'تطبيق', t: R`مسألة: اكتب [[async function sniffImage(file)]] بترجّع [["png"]] أو [["jpeg"]] أو [[null]] من أول bytes مش من الامتداد: [[new Uint8Array(await file.slice(0, 4).arrayBuffer())]]. PNG بيبدأ بـ [[89 50 4E 47]] و JPEG بـ [[FF D8 FF]]. جرّبها في Node بملفات بتعملها بـ [[new File([bytes], "a.png")]].`, done: R`ملف أوله bytes الـ PNG بيرجّع [["png"]]، وملف [[new File(["hello"], "fake.png", { type: "image/png" })]] بيرجّع [[null]] مع إن [[file.type]] بتاعه [[image/png]] (في المتصفح النوع بيتخمّن من الامتداد)، وملف فاضي أو أقل من 4 bytes بيرجّع [[null]] من غير error.`, sol: R`~~~js sniff.mjs
export async function sniffImage(file) {
  const bytes = new Uint8Array(await file.slice(0, 4).arrayBuffer());
  if (bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  return null;
}
~~~

~~~js sniff-demo.mjs
import { sniffImage } from "./sniff.mjs";

const png = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])], "a.png");
const jpeg = new File([new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00])], "b.jpg");
const fake = new File(["hello"], "fake.png", { type: "image/png" });
const empty = new File([], "empty.png");
const tiny = new File([new Uint8Array([0x89, 0x50])], "tiny.png");

for (const f of [png, jpeg, fake, empty, tiny]) {
  console.log(f.name.padEnd(10), "type:", (f.type || '""').padEnd(10), "size:", String(f.size).padEnd(2), "→", await sniffImage(f));
}
~~~

~~~text الناتج (node sniff-demo.mjs، Node 24)
a.png      type: ""         size: 8  → png
b.jpg      type: ""         size: 5  → jpeg
fake.png   type: image/png  size: 5  → null
empty.png  type: ""         size: 0  → null
tiny.png   type: ""         size: 2  → null
~~~

وفي المتصفح: ملف نصي فيه [[hello]] اسمه [[fake.png]] اتختار من [[<input type="file">]]:

~~~text الناتج (Chrome 158 headless)
المتصفح: fake.png type=image/png → null
~~~

**ليه كده:**

- **[[file.slice(0, 4)]]:** بيرجّع [[Blob]] لأول ٤ bytes بس، من غير ما يقرا الملف كله. صورة 20MB هتتقري منها ٤ bytes.
- **[[await ... .arrayBuffer()]] و [[new Uint8Array(...)]]:** الـ ArrayBuffer هو الـ bytes الخام، و [[Uint8Array]] بيخلّيك تقرا كل byte كرقم من 0 لـ 255.
- **الـ magic numbers:** كل صيغة ملفات بتبدأ بتوقيع ثابت. PNG: [[89 50 4E 47]] (والـ 50 4E 47 هما حروف [[PNG]] بالـ ASCII). JPEG: [[FF D8 FF]]. بنقارن بـ [[0x89]] وكده عشان نكتبهم زي ما هما في المواصفات.
- **[[bytes.length >= 4]]:** الملف الفاضي أو الصغير بيرجّع array أقصر، و [[bytes[3]]] هيبقى [[undefined]] فالمقارنة غلط والنتيجة [[null]] من غير error. الشرط مكتوب عشان القارئ يفهم ليه.
- **[[File]] موجود في Node 20 وما بعده كـ global:** فالدالة نفسها اتختبرت في Node والمتصفح من غير تعديل.
- **[[fake.png]]:** نوعه [[image/png]] في الاتنين لأن النوع بييجي من الامتداد (أو من اللي انت كتبته في [[new File]])، والفحص بالـ bytes كشف إنه مش صورة.

**الغلطة الشائعة:** تعتمد على [[file.type]] أو [[accept="image/*"]] وتفتكر ده أمان. الاتنين بيتغيّروا باسم الملف بس. والفحص ده في المتصفح لتجربة اليوزر بس: السيرفر لازم يفحص تاني، لأن أي حد يقدر يبعت request من غير صفحتك خالص.` },
            { lvl: 'تحدي', t: R`قارن وقيس: [[resizeImage(file, max = 1024)]] بـ [[createImageBitmap(file)]] و canvas أكبر ضلع فيه [[max]] بنفس النسبة، و [[canvas.toBlob(cb, "image/jpeg", 0.8)]] ملفوفة في Promise، وبترجّع [[File]] جديد. اعرض الحجم والمقاس قبل وبعد لـ ٣ صور.`, done: R`صورة 4000×3000 بتطلع 1024×768 بالظبط، وصورة طولية 3000×4000 بتطلع 768×1024، وصورة أصغر من 1024 أصلًا بترجع بمقاسها مبتكبرش، وجدول قبل وبعد فيه الحجم بالـ KB للتلات صور، وملف مش صورة بيرفض الـ Promise برسالة مفهومة.`, sol: R`~~~live 260 resize.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صغّر الصور قبل الرفع</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  table { border-collapse: collapse; margin-top: 12px; }
  th, td { border-bottom: 1px solid #ddd; padding: 4px 8px; text-align: start; }
  .err { color: #b91c1c; }
</style>
</head>
<body>
<label>اختار صور: <input type="file" id="pics" accept="image/*" multiple></label>
<table>
  <thead><tr><th>الملف</th><th>قبل</th><th>بعد</th></tr></thead>
  <tbody id="rows"></tbody>
</table>
<script>
  async function resizeImage(file, max = 1024) {
    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      throw new Error($__bt«$__{file.name}» مش صورة المتصفح يقدر يفتحها$__bt);
    }
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));   // مبنكبّرش
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
    const before = [bitmap.width, bitmap.height];
    bitmap.close();                       // بعد close الـ width و height بيبقوا 0
    const blob = await new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob رجّع null"))), "image/jpeg", 0.8),
    );
    const name = file.name.replace(/\.\w+$/, "") + ".jpg";
    return { file: new File([blob], name, { type: "image/jpeg" }), before, after: [w, h] };
  }

  const kb = (n) => (n / 1024).toFixed(0) + " KB";
  document.querySelector("#pics").addEventListener("change", async (e) => {
    const rows = document.querySelector("#rows");
    rows.replaceChildren();
    for (const file of e.target.files) {
      const tr = rows.insertRow();
      tr.insertCell().textContent = file.name;
      try {
        const r = await resizeImage(file);
        tr.insertCell().textContent = $__bt$__{r.before.join("×")} | $__{kb(file.size)}$__bt;
        tr.insertCell().textContent = $__bt$__{r.after.join("×")} | $__{kb(r.file.size)}$__bt;
      } catch (err) {
        const td = tr.insertCell();
        td.colSpan = 2;
        td.className = "err";
        td.textContent = err.message;
      }
    }
  });
</script>
</body>
</html>
~~~

اختار صور من جهازك في الـ preview (صورة موبايل كبيرة تبقى أوضح).

~~~text الناتج (Chrome 158 headless، جوه iframe معزول، ٣ صور اتعملت بـ canvas واتحفظت على الديسك + ملف نصي)
landscape.jpg | 4000×3000 | 1192 KB | 1024×768 | 172 KB
portrait.png | 3000×4000 | 6756 KB | 768×1024 | 173 KB
small.jpg | 800×600 | 118 KB | 800×600 | 75 KB
notes.txt | «notes.txt» مش صورة المتصفح يقدر يفتحها
pageerrors: 0
~~~

**ليه كده:**

- **[[createImageBitmap(file)]]:** بيفك الصورة (JPEG أو PNG أو WebP...) لـ bitmap جاهز للرسم، من غير [[<img>]] ولا [[onload]]. لو الملف مش صورة الـ Promise بيترفض، فبنمسكه ونرمي رسالة بالعربي فيها اسم الملف.
- **[[Math.min(1, max / Math.max(w, h))]]:** النسبة على أكبر ضلع، فالطولية والعرضية الاتنين بيوصلوا 1024 في الضلع الكبير والتاني بنفس النسبة (4000×3000 × 0.256 = 1024×768). والـ [[Math.min(1, ...)]] بتمنع التكبير: 800×600 فضلت زي ما هي.
- **[[canvas.toBlob(cb, "image/jpeg", 0.8)]]:** الـ API قديمة وبـ callback، فبنلفّها في Promise. والـ callback ممكن ياخد [[null]] (canvas كبير زيادة مثلًا)، فبنرفض الـ Promise بدل ما نكمّل بـ [[null]].
- **[[new File([blob], name, { type })]]:** بيرجّع ملف حقيقي باسم [[.jpg]] تقدر تحطه في [[FormData]] زي أي ملف اختاره اليوزر.
- **الأرقام:** صورة الـ PNG نزلت من 6.7MB لـ 173KB (PNG مش مضغوط بخسارة، والصورة كبيرة). وحتى 800×600 نزلت لـ 75KB لأن جودة 0.8 أقل من 0.92 اللي اتعملت بيها.

**اللي حصل وإحنا بنكتبه:** أول نسخة كانت بتقرا [[bitmap.width]] **بعد** [[bitmap.close()]]، فعمود «قبل» طلع [[0×0]] للصورتين. [[close()]] بيرمي الصورة من الميموري وبيخلّي المقاسات صفر، فاتنقلت القراية قبله. والـ [[close()]] نفسه مهم: bitmap بـ 4000×3000 بياخد حوالي 48MB في الميموري لحد ما يتقفل أو الـ garbage collector يشيله.

**الغلطة الشائعة:** تحسب المقاس الجديد بـ [[max / bitmap.width]] بس. الصورة الطولية 3000×4000 هتطلع 1024×1365، أطول من الحد.` },
          ],
          ref: [
            { t: "MDN: <input type=\"file\">", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file" },
            { t: "MDN: Using files from web applications", url: "https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications" },
            { t: "MDN: URL.createObjectURL()", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static" },
            { t: "MDN: DataTransfer", url: "https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer" },
            { t: "MDN: createImageBitmap()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap" },
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
            { lvl: 'سريع', t: R`ابني Kanban صغير: عمودين «لسه» و «خلص» وكروت عليها [[draggable="true"]]. في [[dragstart]] اعمل [[e.dataTransfer.setData("text/plain", card.id)]]، وفي [[dragover]] على العمود [[preventDefault()]]، وفي [[drop]] انقل الكارت بـ [[append]].`, done: R`الكارت بيتنقل للعمود اللي تفلته فيه، والإفلات برا العمودين مبيعملش حاجة، والكارت مبيتكررش، وعدد الكروت في عنوان كل عمود بيتحدّث بعد كل نقلة.`, sol: R`~~~live 320 kanban.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kanban صغير</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  .board { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .col { background: #f3f4f6; border-radius: 8px; padding: 8px; min-height: 180px; }
  .col.over { outline: 2px dashed #2563eb; }
  .col h2 { font-size: 16px; margin: 0 0 8px; }
  .card { background: #fff; border: 1px solid #d1d5db; border-radius: 6px; padding: 8px; margin-bottom: 6px; cursor: grab; }
  .card.dragging { opacity: 0.4; }
</style>
</head>
<body>
<div class="board">
  <section class="col" id="todo"><h2>لسه (<span>0</span>)</h2>
    <div class="card" draggable="true" id="c1">صمّم الصفحة</div>
    <div class="card" draggable="true" id="c2">اكتب الـ API</div>
    <div class="card" draggable="true" id="c3">اختبر الفورم</div>
  </section>
  <section class="col" id="done"><h2>خلص (<span>0</span>)</h2></section>
</div>
<p id="outside">برا العمودين</p>
<script>
  const cols = document.querySelectorAll(".col");

  function updateCounts() {
    for (const col of cols) col.querySelector("h2 span").textContent = col.querySelectorAll(".card").length;
  }

  document.addEventListener("dragstart", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    e.dataTransfer.setData("text/plain", card.id);
    e.dataTransfer.effectAllowed = "move";
    card.classList.add("dragging");
  });
  document.addEventListener("dragend", (e) => e.target.closest(".card")?.classList.remove("dragging"));

  for (const col of cols) {
    col.addEventListener("dragover", (e) => {
      e.preventDefault();                  // من غيره المتصفح بيرفض الـ drop
      e.dataTransfer.dropEffect = "move";
      col.classList.add("over");
    });
    col.addEventListener("dragleave", (e) => {
      if (!col.contains(e.relatedTarget)) col.classList.remove("over");
    });
    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("over");
      const card = document.getElementById(e.dataTransfer.getData("text/plain"));
      if (!card?.classList.contains("card")) return;   // سحب حاجة تانية (نص من برا مثلًا)
      col.append(card);                     // append بينقل، مش بينسخ
      updateCounts();
    });
  }
  updateCounts();
</script>
</body>
</html>
~~~

اسحب الكروت بين العمودين في الـ preview (بالماوس: الـ HTML drag and drop مبيشتغلش باللمس على أغلب الموبايلات).

~~~text الناتج (Chrome 158 headless، جوه iframe معزول، السحب بـ dragAndDrop بتاع Playwright)
البداية: لسه (3): صمّم الصفحة، اكتب الـ API، اختبر الفورم || خلص (0):  | كروت في الصفحة: 3
c2 ← خلص: لسه (2): صمّم الصفحة، اختبر الفورم || خلص (1): اكتب الـ API | كروت في الصفحة: 3
c1 ← خلص: لسه (1): اختبر الفورم || خلص (2): اكتب الـ API، صمّم الصفحة | كروت في الصفحة: 3
c3 ← برا: لسه (1): اختبر الفورم || خلص (2): اكتب الـ API، صمّم الصفحة | كروت في الصفحة: 3
c2 ← لسه: لسه (2): اختبر الفورم، اكتب الـ API || خلص (1): صمّم الصفحة | كروت في الصفحة: 3
pageerrors: 0
~~~

**ليه كده:**

- **[[draggable="true"]]:** الـ div مش بيتسحب لوحده (الصور واللينكات والنص المتعلّم بس اللي بيتسحبوا افتراضيًا).
- **[[dragstart]] على [[document]]:** listener واحد لكل الكروت (event delegation)، و [[e.dataTransfer.setData("text/plain", card.id)]] بيشيل الـ id مع السحبة. الـ [[dataTransfer]] هو الطريقة الوحيدة اللي الـ [[drop]] يعرف بيها إيه اللي اتسحب.
- **[[e.preventDefault()]] في [[dragover]]:** ده اللي بيقول للمتصفح «العنصر ده بيقبل الإفلات». من غيره الـ [[drop]] مبيحصلش خالص. ده أشهر سبب إن drag and drop «مش شغال».
- **[[getData]] في [[drop]] وبعدين [[col.append(card)]]:** [[append]] لعنصر موجود في الصفحة **بينقله** مش بينسخه، فعدد الكروت فضل ٣.
- **[[if (!card?.classList.contains("card")) return]]:** لو حد سحب نص من مكان تاني، [[getData]] هيرجّع النص ده، و [[getElementById]] هيرجّع [[null]] أو عنصر مش كارت. فبنتجاهل.
- **الإفلات برا العمودين:** مفيش [[dragover]] بـ [[preventDefault]] هناك، فالمتصفح رفض الإفلات والكارت رجع مكانه.
- **[[updateCounts()]] بعد كل نقلة:** العدد بيتحسب من الـ DOM نفسه، فمستحيل يختلف عن اللي ظاهر.

**الغلطة الشائعة:** تعمل [[col.append(card.cloneNode(true))]] أو [[innerHTML += ...]] عشان «تحط الكارت في العمود». ده بيعمل نسخة والكارت الأصلي بيفضل مكانه، والنسخة مفيهاش أي listener متربط بيها مباشرة.` },
            { lvl: 'تطبيق', t: R`صلّح الباج: حط جوه منطقة الإفلات بتاعة الدرس أيقونة ونص، واسحب ملف فوقهم: الـ class [[over]] بيرعش. صلّحها بعدّاد بيزيد في [[dragenter]] ويقل في [[dragleave]] ويتصفّر في [[drop]]، وارفض أي سحب مش ملفات ([[e.dataTransfer.types.includes("Files")]]).`, done: R`قبل التصليح الإطار بيختفي ويظهر كل ما تعدّي فوق الأيقونة أو النص (لأن [[dragleave]] بيحصل على الأب لما تدخل عنصر جواه)، وبعده بيفضل ثابت لحد ما تخرج من المنطقة كلها أو تفلت، وسحب نص متعلّم من الصفحة مبيفعّلش المنطقة.`, sol: R`~~~live 300 dropzone.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>منطقة إفلات مبترعشش</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #drop { border: 3px dashed #9ca3af; border-radius: 12px; padding: 32px; text-align: center; }
  #drop.over { border-color: #2563eb; background: #eff6ff; }
  #drop .icon { font-size: 40px; display: block; }
  #log { font-size: 13px; color: #374151; }
</style>
</head>
<body>
<div id="drop">
  <span class="icon" aria-hidden="true">📁</span>
  <p>اسحب <strong>الملفات</strong> هنا</p>
</div>
<p>نص تقدر تعلّمه وتسحبه: <em>جرّبني</em></p>
<p id="log"></p>
<script>
  const zone = document.querySelector("#drop");
  const log = document.querySelector("#log");
  let depth = 0;                                   // جوه كام عنصر في المنطقة دلوقتي

  const isFiles = (e) => e.dataTransfer?.types.includes("Files");

  zone.addEventListener("dragenter", (e) => {
    if (!isFiles(e)) return;
    depth++;
    zone.classList.add("over");
  });
  zone.addEventListener("dragover", (e) => {
    if (!isFiles(e)) return;                       // من غير preventDefault = مرفوض
    e.preventDefault();
  });
  zone.addEventListener("dragleave", (e) => {
    if (!isFiles(e)) return;
    depth--;
    if (depth === 0) zone.classList.remove("over");
  });
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    depth = 0;
    zone.classList.remove("over");
    log.textContent = "وصل: " + [...e.dataTransfer.files].map((f) => f.name).join("، ");
  });
</script>
</body>
</html>
~~~

اسحب ملف من جهازك فوق الأيقونة والنص في الـ preview: الإطار الأزرق بيفضل ثابت. وعلّم كلمة «جرّبني» واسحبها فوق المنطقة: مفيش إطار.

**القياس:** headless Chrome مبيقدرش يسحب ملف حقيقي من الويندوز، فبعتنا نفس الأحداث اللي المتصفح بيبعتها وانت بتعدّي من المنطقة للأيقونة للنص، بنفس الترتيب ([[dragenter]] على الجديد الأول وبعدين [[dragleave]] على القديم)، وقرينا الإطار بعد كل حدث. [[dropzone-bad.html]] هو كود الدرس زي ما هو:

~~~text الناتج (Chrome 158 headless، جوه iframe معزول)
== dropzone-bad.html
dragenter على المنطقة: مخفي
dragover على المنطقة: ظاهر
dragenter على الأيقونة: ظاهر
dragleave من المنطقة: مخفي
dragover على الأيقونة: ظاهر
dragenter على النص: ظاهر
dragleave من الأيقونة: مخفي
dragover على النص: ظاهر
dragleave من النص لبرا الصفحة: مخفي
سحب نص متعلّم: الإطار ظاهر | قبل الإفلات؟ true
== dropzone.html
dragenter على المنطقة: ظاهر
dragover على المنطقة: ظاهر
dragenter على الأيقونة: ظاهر
dragleave من المنطقة: ظاهر
dragover على الأيقونة: ظاهر
dragenter على النص: ظاهر
dragleave من الأيقونة: ظاهر
dragover على النص: ظاهر
dragleave من النص لبرا الصفحة: مخفي
سحب نص متعلّم: الإطار مخفي | قبل الإفلات؟ false
pageerrors: 0
~~~

**ليه بيرعش في كود الدرس:** لما الماوس يدخل الأيقونة، المتصفح بيبعت [[dragenter]] للأيقونة و [[dragleave]] للمنطقة (هي «اتسابت» لصالح عنصر جواها). كود الدرس بيشيل [[over]] على أي [[dragleave]]، فالإطار بيختفي لحد [[dragover]] اللي جاي (بيتبعت كل ~50ms) فيرجع. ده الرعشة: «مخفي» ثم «ظاهر» مع كل عنصر جوه المنطقة.

**التصليح:**

- **[[depth]]:** كل [[dragenter]] (على المنطقة أو أي عنصر جواها، لأنه بيعمل bubble) بيزوّد واحد، وكل [[dragleave]] بينقّص واحد. الدخول لعنصر جوه بيحصل **قبل** الخروج من اللي قبله، فالعدّاد مبيوصلش صفر غير لما تخرج من المنطقة كلها.
- **[[depth = 0]] في [[drop]]:** بعد الإفلات مفيش [[dragleave]] بيتبعت، فلو مصفّرناش هيفضل 1 والإطار هيظهر غلط في السحبة الجاية.
- **[[e.dataTransfer.types.includes("Files")]]:** وقت السحب مينفعش تقرا الملفات نفسها (للأمان)، بس [[types]] متاحة. سحب نص بيبقى [[types]] فيه [["text/plain"]] بس، فبنتجاهله ومش بنعمل [[preventDefault]] فالمتصفح بيرفض الإفلات (السطر الأخير: [[قبل الإفلات؟ false]]). كود الدرس كان بيقبل أي حاجة.

**الغلطة الشائعة:** تصلّحها بـ [[pointer-events: none]] على كل اللي جوه المنطقة. بتشتغل للرعشة، بس اللينكات والزراير اللي جوه (زي «اختار ملف») هتبطّل تتداس.` },
            { lvl: 'تحدي', t: R`محاكاة طابور رفع: اكتبه الأول في Node، كل «رفع» [[setTimeout]] وقته عشوائي ونسبة فشل ٢٠٪: ١٠ ملفات، ٢ بس في نفس الوقت، والفاشل يتعاد مرة واحدة. وبعدين بدّل الـ setTimeout بـ XHR بتاع الدرس ومعاه [[<progress>]] وزرار إلغاء ([[xhr.abort()]]) لكل ملف.`, done: R`الـ simulation بيطبع إن أكبر عدد شغال مع بعض 2، وكل ملف نهايته «تم» أو «فشل بعد محاولتين»، ومجموعهم 10. وفي المتصفح على Slow 4G مفيش أكتر من ٢ upload في Network في أي لحظة، والإلغاء بيكتب «اتلغى» وبيسيب مكانه للي بعده.`, sol: R`**الجزء الأول: المحاكاة في Node.** الـ random بـ seed ثابت عشان تطلع نفس النتيجة عندك.

~~~js queue-sim.mjs
// random ثابت (seed) عشان التشغيل يطلع نفس الناتج عندك
function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const random = mulberry32(2);

let running = 0, maxRunning = 0;
function fakeUpload(name) {
  running++;
  maxRunning = Math.max(maxRunning, running);
  const ms = 100 + Math.floor(random() * 400);
  const fails = random() < 0.2;
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      running--;
      fails ? reject(new Error("الشبكة")) : resolve(ms);
    }, ms),
  );
}

async function uploadWithRetry(name) {
  try {
    await fakeUpload(name);
    return $__bt$__{name}: تم$__bt;
  } catch {
    try {
      await fakeUpload(name);
      return $__bt$__{name}: تم (من المحاولة التانية)$__bt;
    } catch {
      return $__bt$__{name}: فشل بعد محاولتين$__bt;
    }
  }
}

// طابور: limit شغالين بالكتير، وكل واحد يخلص ياخد اللي بعده
async function runQueue(items, limit, worker) {
  const results = [];
  let next = 0;
  async function lane() {
    while (next < items.length) {
      const i = next++;
      results[i] = await worker(items[i]);
      console.log(results[i]);
    }
  }
  await Promise.all(Array.from({ length: limit }, lane));
  return results;
}

const files = Array.from({ length: 10 }, (_, i) => $__btfile-$__{i + 1}.jpg$__bt);
const results = await runQueue(files, 2, uploadWithRetry);
console.log("---");
console.log("أكبر عدد شغال مع بعض:", maxRunning);
console.log("تم:", results.filter((r) => r.includes("تم")).length, "| فشل:", results.filter((r) => r.includes("فشل")).length, "| المجموع:", results.length);
~~~

~~~text الناتج (node queue-sim.mjs، Node 24)
file-2.jpg: تم
file-1.jpg: تم
file-3.jpg: تم
file-4.jpg: تم
file-6.jpg: تم
file-5.jpg: تم (من المحاولة التانية)
file-8.jpg: تم
file-7.jpg: فشل بعد محاولتين
file-10.jpg: تم (من المحاولة التانية)
file-9.jpg: تم (من المحاولة التانية)
---
أكبر عدد شغال مع بعض: 2
تم: 9 | فشل: 1 | المجموع: 10
~~~

- **[[runQueue(items, limit, worker)]]:** بتشغّل [[limit]] «حارات» ([[lane]]) مع بعض بـ [[Promise.all]]. كل حارة بتاخد الملف اللي عليه الدور ([[next++]]) وتستناه يخلص وتاخد اللي بعده. فمستحيل يبقى شغال أكتر من ٢، وأول ما واحد يخلص اللي بعده بيبدأ على طول.
- **[[next++]] آمن هنا:** JS بيشغّل كود واحد في المرة، فحارتين مستحيل ياخدوا نفس الرقم.
- **الترتيب في الناتج مش ١، ٢، ٣:** كل ملف بياخد وقت مختلف، فاللي يخلص الأول يطبع الأول. [[results[i]]] بيحفظ كل نتيجة في مكانها الأصلي.

**الجزء التاني: في المتصفح بـ XHR.** الصفحة بتبعت كل ملف لـ [[/api/upload]] بشريط تقدم وزرار إلغاء. ولو مفيش سيرفر (الـ preview، اللي الـ origin بتاعه [["null"]]) بترفع «وهمي» بتايمر وبتقول كده.

~~~live 300 upload-queue.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>طابور رفع</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  ul { list-style: none; padding: 0; }
  li { display: grid; grid-template-columns: 1fr 120px 90px 60px; gap: 8px; align-items: center; padding: 4px 0; border-bottom: 1px solid #eee; }
  progress { width: 100%; }
  #mode { font-size: 13px; color: #92400e; }
  button { font: inherit; }
</style>
</head>
<body>
<label>اختار ملفات: <input type="file" id="files" multiple></label>
<p id="mode"></p>
<ul id="list"></ul>
<p id="summary"></p>
<script>
  const LIMIT = 2;
  // الـ preview صفحة معزولة من غير سيرفر: نرفع «وهمي» بتايمر عشان تشوف الطابور شغال
  const FAKE = location.origin === "null";
  if (FAKE) document.querySelector("#mode").textContent = "مفيش سيرفر هنا (صفحة معزولة): الرفع وهمي بتايمر. شغّلها من سيرفر محلي للرفع الحقيقي.";

  let running = 0, maxRunning = 0;

  // بترجّع { promise, abort } زي XHR
  function send(file, onProgress) {
    if (FAKE) {
      let timer, done = 0;
      const promise = new Promise((resolve, reject) => {
        timer = setInterval(() => {
          done = Math.min(file.size, done + Math.max(1, file.size / 10));
          onProgress(done / file.size);
          if (done >= file.size) { clearInterval(timer); resolve(); }
        }, 150);
        send.abortFake = () => { clearInterval(timer); reject(new DOMException("اتلغى", "AbortError")); };
      });
      const abort = send.abortFake;
      return { promise, abort };
    }
    const xhr = new XMLHttpRequest();
    const promise = new Promise((resolve, reject) => {
      xhr.open("POST", "/api/upload?name=" + encodeURIComponent(file.name));
      xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
      xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error("HTTP " + xhr.status)));
      xhr.onerror = () => reject(new Error("الشبكة"));
      xhr.onabort = () => reject(new DOMException("اتلغى", "AbortError"));
      xhr.send(file);
    });
    return { promise, abort: () => xhr.abort() };
  }

  async function uploadOne(item) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      if (item.cancelled) throw new DOMException("اتلغى", "AbortError");
      running++;
      maxRunning = Math.max(maxRunning, running);
      const job = send(item.file, (p) => (item.bar.value = p));
      item.abort = job.abort;
      try {
        await job.promise;
        return attempt === 1 ? "تم" : "تم (محاولة ٢)";
      } catch (err) {
        if (err.name === "AbortError" || attempt === 2) throw err;
      } finally {
        running--;
      }
    }
  }

  async function runQueue(items) {
    let next = 0;
    async function lane() {
      while (next < items.length) {
        const item = items[next++];
        if (item.cancelled) continue;
        item.status.textContent = "بيترفع...";
        try {
          item.status.textContent = await uploadOne(item);
        } catch (err) {
          item.status.textContent = err.name === "AbortError" ? "اتلغى" : "فشل بعد محاولتين";
        }
        item.btn.disabled = true;
      }
    }
    await Promise.all(Array.from({ length: LIMIT }, lane));
    document.querySelector("#summary").textContent = $__btخلص. أكبر عدد شغال مع بعض: $__{maxRunning}$__bt;
  }

  document.querySelector("#files").addEventListener("change", (e) => {
    const list = document.querySelector("#list");
    list.replaceChildren();
    const items = [...e.target.files].map((file) => {
      const li = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = file.name;
      const bar = document.createElement("progress");
      bar.max = 1;
      bar.value = 0;
      const status = document.createElement("span");
      status.textContent = "مستني";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "إلغاء";
      li.append(name, bar, status, btn);
      list.append(li);
      const item = { file, bar, status, btn, cancelled: false, abort: null };
      btn.addEventListener("click", () => {
        item.cancelled = true;
        item.abort?.();                        // لو شغال: وقّفه، ولو مستني: مش هيبدأ
        status.textContent = "اتلغى";
        btn.disabled = true;
      });
      return item;
    });
    runQueue(items);
  });
</script>
</body>
</html>
~~~

اتقاس على [[http://localhost:8831]] بسيرفر [[node:http]] صغير بيعدّ الـ uploads الشغالة، و upload مخنوق لحوالي 200KB/s (من DevTools Protocol، زي Slow 4G)، و ٥ ملفات كل واحد 300KB، وضغطنا «إلغاء» على التاني وهو شغال:

~~~text الناتج (Chrome 158 headless)
بعد 0.7s: photo-1.jpg 0.27 بيترفع... | photo-2.jpg 0.21 بيترفع... | photo-3.jpg 0.00 مستني | photo-4.jpg 0.00 مستني | photo-5.jpg 0.00 مستني
الآخر: photo-1.jpg 1.00 تم | photo-2.jpg 0.21 اتلغى | photo-3.jpg 1.00 تم | photo-4.jpg 1.00 تم | photo-5.jpg 1.00 تم
خلص. أكبر عدد شغال مع بعض: 2
السيرفر: أكبر عدد uploads في نفس الوقت = 3
بدأ photo-1.jpg (شغال 1)
بدأ photo-2.jpg (شغال 2)
بدأ photo-3.jpg (شغال 3)
اتقطع photo-2.jpg 65536 bytes
وصل photo-1.jpg 307200 bytes
بدأ photo-4.jpg (شغال 2)
وصل photo-3.jpg 307200 bytes
بدأ photo-5.jpg (شغال 2)
وصل photo-4.jpg 307200 bytes
وصل photo-5.jpg 307200 bytes
pageerrors: 0
[sandbox] photo-1.jpg تم | photo-2.jpg تم | photo-3.jpg تم | خلص. أكبر عدد شغال مع بعض: 2
~~~

- **[[send(file, onProgress)]] بترجّع [[{ promise, abort }]]:** الـ Promise عشان الطابور يستنى بـ [[await]]، و [[abort]] عشان زرار الإلغاء يوقّف الـ XHR. [[xhr.upload.onprogress]] (مش [[xhr.onprogress]]) هو تقدم **الرفع**.
- **[[xhr.send(file)]]:** بيبعت الملف نفسه كـ body. في المشروع المتوسط بنبعته في [[FormData]] لـ multer.
- **[[onabort]] بيرفض بـ [[AbortError]]:** والطابور بيفرّق: الإلغاء بيكتب «اتلغى» ومبيعيدش المحاولة، وأي error تاني بيتعاد مرة واحدة.
- **الإلغاء بيسيب مكانه:** [[uploadOne]] بترمي، والحارة بتكمّل بالملف اللي بعده على طول ([[بدأ photo-3.jpg]] بعد الإلغاء).

**اكتشاف من القياس:** الصفحة عدّت ٢ بالكتير، بس السيرفر شاف ٣ في لحظة. الإلغاء بيقفل الاتصال من ناحية المتصفح على طول وبيبدأ التالت، بس السيرفر بيعرف إن الاتصال اتقفل ([[aborted]]) بعد ما التالت يوصله بشوية. يعني «الحد ٢» حد في المتصفح، ولو السيرفر عنده حد حقيقي لازم يسيب هامش.

**الغلطة الشائعة:** [[Promise.all(files.map(upload))]]. ده بيبدأ الـ ١٠ مع بعض، والمتصفح نفسه بيحدد ٦ اتصالات لكل سيرفر في HTTP/1.1 والباقي بيستنى من غير ما الشريط يتحرك، وأي ملف كبير بياكل كل الـ upload.` },
          ],
          ref: [
            { t: "MDN: HTML Drag and Drop API", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API" },
            { t: "MDN: File drag and drop", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop" },
            { t: "MDN: XMLHttpRequest.upload", url: "https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload" },
            { t: "MDN: <progress>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/progress" },
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
            { lvl: 'سريع', t: R`محاكاة شات: [[setInterval]] بيضيف رسالة وهمية كل ٣ ثواني. لما الصفحة تبقى [[hidden]] عدّ الرسايل اللي جت وخلّي [[document.title]] يبقى «(3) الشات»، ولما ترجع [[visible]] رجّع العنوان وصفّر العدّاد.`, done: R`تسيب التاب ١٠ ثواني: عنوان التاب بيبان فيه رقم بيزيد (حوالي 3)، وأول ما ترجع العنوان بيرجع «الشات» والعدّاد صفر، وانت جوه الصفحة العنوان مبيتغيرش خالص.`, sol: R`~~~live 280 chat-title.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الشات</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #msgs { list-style: none; padding: 0; max-height: 200px; overflow: auto; }
  #msgs li { background: #f3f4f6; border-radius: 8px; padding: 4px 10px; margin: 4px 0; width: fit-content; }
  #title { font-size: 13px; color: #555; }
</style>
</head>
<body>
<p id="title"></p>
<ul id="msgs"></ul>
<script>
  const BASE = "الشات";
  const msgs = document.querySelector("#msgs");
  let unread = 0, n = 0;

  function showTitle() {
    document.title = unread ? $__bt($__{unread}) $__{BASE}$__bt : BASE;
    // جوه الـ preview عنوان التاب مش بتاع الصفحة دي، فبنعرضه هنا كمان
    document.querySelector("#title").textContent = "عنوان التاب: " + document.title;
  }

  setInterval(() => {
    const li = document.createElement("li");
    li.textContent = $__btرسالة $__{++n}$__bt;
    msgs.append(li);
    msgs.scrollTop = msgs.scrollHeight;
    if (document.hidden) {             // اليوزر مش شايف: عدّ
      unread++;
      showTitle();
    }
  }, 3000);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      unread = 0;                      // رجع وشاف
      showTitle();
    }
  });
  showTitle();
</script>
</body>
</html>
~~~

في الـ preview عنوان التاب بتاع الموقع مش بتاع الصفحة دي، فالصفحة بتكتب العنوان فوق كمان. روح لتاب تاني ١٠ ثواني وارجع.

~~~text الناتج (Chrome 158 headless من غير Playwright، تاب جديد اتفتح واتفعّل وبعدين رجعنا للأول)
4.1s جوه الصفحة: الشات
6.6s في تاب تاني: الشات | hidden = true
9.1s في تاب تاني: (1) الشات | hidden = true
11.6s في تاب تاني: (2) الشات | hidden = true
14.1s في تاب تاني: (3) الشات | hidden = true
14.4s رجعنا: الشات | رسايل في الصفحة: 4
17.9s جوه الصفحة تاني: الشات
~~~

**ليه كده:**

- **[[document.hidden]] جوه الـ [[setInterval]]:** كل رسالة جديدة بتسأل «اليوزر شايفني؟». لو لأ، بنزوّد العدّاد ونكتب العنوان. وانت جوه الصفحة العنوان مبيتلمسش (أول وآخر سطر).
- **[[visibilitychange]] و [[visibilityState === "visible"]]:** الحدث بيحصل في الاتجاهين، فبنصفّر بس لما يرجع. ده بيحصل لما تبدّل التاب، أو تصغّر الشباك، أو تقفل شاشة الموبايل.
- **الأرقام:** بعد ١٠ ثواني برا جالنا ٣ رسايل والعنوان «(3) الشات»، وأول ما رجعنا اتصفّر. الصفحة فيها ٤ رسايل لأن واحدة جت وإحنا جوه.

**إزاي اتقاس:** Playwright بيثبّت الصفحات «visible» حتى لو فتحت تاب تاني أو صغّرت الشباك (جرّبنا الاتنين و [[document.hidden]] فضل [[false]]). فشغّلنا Chrome لوحده وكلّمناه بـ DevTools Protocol مباشرة ([[Target.createTarget]] لتاب جديد و [[Target.activateTarget]] للرجوع)، وده بيتصرف زي يوزر بيبدّل تابات بالظبط.

**الغلطة الشائعة:** تستخدم [[window.onblur]] و [[onfocus]]. دول بيحصلوا كمان لما تدوس على الـ DevTools أو على iframe جوه الصفحة أو شريط العنوان، والصفحة لسه قدامك، فالعدّاد هيشتغل غلط. [[visibilitychange]] بيقول «الصفحة مش ظاهرة» بس.` },
            { lvl: 'تطبيق', t: R`ابني عدّاد «وقت المذاكرة الفعلي» لصفحة درس: بيعدّ الوقت اللي الصفحة كانت ظاهرة فيه بس، بـ [[performance.now()]] مش بعدّ ticks، وبيبعت المجموع بـ [[navigator.sendBeacon("/api/time", ...)]] كل ما الصفحة تتخبى.`, done: R`تسيب التاب ١٠ ثواني وترجع: العدّاد مزادش الـ ١٠ ثواني دول (بفرق ثانية بالكتير)، و Network فيه request لـ [[/api/time]] كل مرة الصفحة اتخبت، والرقم اللي اتبعت هو المجموع لحد اللحظة دي.`, sol: R`~~~live 220 study-time.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>وقت المذاكرة</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #time { font-size: 36px; font-variant-numeric: tabular-nums; }
  #log { font-size: 13px; color: #555; }
</style>
</head>
<body>
<h1>درس: الـ closures</h1>
<p>وقت المذاكرة الفعلي: <span id="time">0:00</span></p>
<p id="log"></p>
<script>
  let total = 0;                               // ms اتجمعت قبل كده
  let since = document.hidden ? null : performance.now();   // من إمتى ظاهرة

  const visibleMs = () => total + (since === null ? 0 : performance.now() - since);

  function show() {
    const s = Math.floor(visibleMs() / 1000);
    document.querySelector("#time").textContent = $__bt$__{Math.floor(s / 60)}:$__{String(s % 60).padStart(2, "0")}$__bt;
  }
  setInterval(show, 500);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      total = visibleMs();                     // اقفل الفترة اللي فاتت
      since = null;
      const body = JSON.stringify({ lesson: "closures", seconds: Math.round(total / 1000) });
      let sent = false;
      try {
        sent = navigator.sendBeacon("/api/time", new Blob([body], { type: "application/json" }));
      } catch {}
      document.querySelector("#log").textContent = sent ? "اتبعت: " + body : "مفيش سيرفر هنا، كان هيتبعت: " + body;
    } else {
      since = performance.now();               // فترة جديدة
    }
  });
  show();
</script>
</body>
</html>
~~~

في الـ preview مفيش سيرفر، فلما تبدّل التاب وترجع هتلاقي «مفيش سيرفر هنا، كان هيتبعت: ...» بالرقم اللي كان هيتبعت.

~~~text الناتج (Chrome 158 headless من غير Playwright، http://localhost:8831 وسيرفر node:http بيطبع اللي بيوصله)
3.4s ظاهرة: 0:02
3.4s السيرفر استلم: POST /api/time application/json {"lesson":"closures","seconds":3}
14.0s رجعنا بعد ١٠ ثواني برا: 0:03
16.0s السيرفر استلم: POST /api/time application/json {"lesson":"closures","seconds":6}
17.4s في الآخر: 0:06
~~~

قعدنا ٣ ثواني، وبرا ١٠، وجوه ٢ تاني، وبرا تاني. الـ ١٠ ثواني متحسبتش (العدّاد 0:03 لما رجعنا)، وكل مرة الصفحة اتخبت وصل request فيه المجموع لحد اللحظة دي (3 ثم 6).

**ليه كده:**

- **[[total]] و [[since]]:** بدل عدّاد بيزيد كل ثانية، بنسجّل **إمتى** الفترة الظاهرة بدأت. لما الصفحة تتخبى بنضيف طول الفترة لـ [[total]] ونقفلها ([[since = null]])، ولما ترجع نبدأ فترة جديدة.
- **[[performance.now()]] مش [[Date.now()]]:** ساعة بتزيد بس ومبتتأثرش لو اليوزر غيّر ساعة الجهاز أو الجهاز ظبطها من النت.
- **ليه مش ticks:** المتصفح بيبطّأ الـ [[setInterval]] في التابات المستخبية (لحد مرة في الدقيقة في Chrome بعد شوية)، فالعدّ بالـ ticks بيطلع أرقام غلط. هنا الـ interval للعرض بس، والحساب من الساعة.
- **[[navigator.sendBeacon(url, blob)]]:** بيبعت [[POST]] صغير من غير ما يستنى رد، والمتصفح بيكمّله حتى لو الصفحة اتقفلت بعدها على طول. [[visibilitychange]] لـ [[hidden]] هو آخر لحظة مضمونة قبل ما اليوزر يقفل التاب أو الموبايل يقتل الصفحة.
- **[[new Blob([body], { type: "application/json" })]]:** عشان السيرفر ياخد [[content-type: application/json]]. لو بعتّ النص نفسه هيوصل [[text/plain]].
- **[[try]] حوالين [[sendBeacon]]:** في الصفحة المعزولة الـ URL النسبي ممكن يبقى مش صالح فيرمي [[TypeError]]، و [[sendBeacon]] بترجّع [[false]] لو المتصفح رفض يحطه في الطابور.

**الغلطة الشائعة:** تبعت في [[beforeunload]] أو [[unload]]. على الموبايل الصفحة بتتقفل غالبًا من غير ما الحدثين دول يحصلوا (اليوزر بيروح للهوم والنظام بيقتل التاب)، و [[unload]] كمان بيمنع الـ bfcache.` },
            { lvl: 'تحدي', t: R`صلّح صفحة bfcache مبيرجّعهاش: صفحة فاتحة WebSocket لسيرفر [[ws]] على localhost. اقفل الـ socket في [[pagehide]]، وافتحه تاني في [[pageshow]] لما [[e.persisted]] يبقى [[true]]، وشغّل Test back/forward cache قبل وبعد.`, done: R`لو الاختبار قال الصفحة مش eligible قبل التصليح، بتكتب السبب اللي DevTools طلّعه. بعد التصليح: back بيرجّع الصفحة من bfcache، و [[pageshow]] بيطبع [[persisted: true]]، والـ socket اتفتح تاني والرسايل بتوصل، ولوج السيرفر فيه اتصال اتقفل واتصال جديد.`, sol: R`٣ ملفات وصفحة: سيرفر WebSocket صغير بـ [[node:http]] بس (من غير ما تسطّب [[ws]])، والصفحة اللي فيها التصليح، وصفحة تانية تروح لها وترجع.

~~~js ws-server.mjs
// سيرفر WebSocket صغير جدًا بـ node:http بس (عشان منسطّبش ws): بيبعت «tick» كل ثانية
import { createHash } from "node:crypto";

export function attachWs(server, log = console.log) {
  let nextId = 1;
  server.on("upgrade", (req, socket) => {
    const key = req.headers["sec-websocket-key"];
    const accept = createHash("sha1").update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
    socket.write("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + accept + "\r\n\r\n");
    const id = nextId++;
    log($__btws #$__{id} اتفتح$__bt);
    let n = 0;
    const timer = setInterval(() => {
      const text = Buffer.from($__bttick $__{++n} من #$__{id}$__bt);
      socket.write(Buffer.concat([Buffer.from([0x81, text.length]), text]));   // frame نص صغير (< 126 byte)
    }, 1000);
    const close = () => { if (!timer._destroyed) { clearInterval(timer); log($__btws #$__{id} اتقفل$__bt); } };
    socket.on("data", (buf) => { if ((buf[0] & 0x0f) === 0x8) { socket.end(); close(); } });   // frame قفل من المتصفح
    socket.on("close", close);
    socket.on("error", close);
  });
}
~~~

~~~js live-server.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { attachWs } from "./ws-server.mjs";

const server = createServer(async (req, res) => {
  const file = req.url === "/" ? "live.html" : req.url.slice(1).split("?")[0];
  try {
    const body = await readFile(file);       // اقرا الأول: لو الملف مش موجود نوصل للـ catch قبل أي header
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
attachWs(server);
server.listen(Number(process.env.PORT) || 8831, () => console.log("على http://localhost:" + server.address().port + "/live.html"));
~~~

~~~live 260 live.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>تحديثات مباشرة</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #events { font: 13px/1.6 ui-monospace, monospace; background: #f3f4f6; padding: 8px; border-radius: 6px; }
</style>
</head>
<body>
<p><a href="other.html">روح لصفحة تانية</a> وبعدين ارجع بـ back.</p>
<p>آخر رسالة: <b id="last">-</b></p>
<pre id="events"></pre>
<script>
  const out = document.querySelector("#events");
  const log = (s) => { out.textContent += s + "\n"; (window.__log ||= []).push(s); };
  let socket = null;

  function connect() {
    if (location.origin === "null") { log("مفيش سيرفر هنا (صفحة معزولة): شغّلها من node live-server.mjs"); return; }
    socket = new WebSocket($__btws://$__{location.host}/live$__bt);
    socket.onopen = () => log("الـ socket اتفتح");
    socket.onmessage = (e) => (document.querySelector("#last").textContent = e.data);
    socket.onclose = (e) => log("الـ socket اتقفل (" + e.code + ")");
  }

  // قبل ما الصفحة تتحط في الـ bfcache: اقفل أي اتصال مفتوح
  window.addEventListener("pagehide", (e) => {
    log("pagehide persisted=" + e.persisted);
    socket?.close();
    socket = null;
  });
  // لما ترجع من الـ bfcache: الصفحة بنفس حالتها بس من غير الاتصال، افتحه تاني
  window.addEventListener("pageshow", (e) => {
    log("pageshow persisted=" + e.persisted);
    if (e.persisted) connect();
  });

  connect();
</script>
</body>
</html>
~~~

~~~html other.html
<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>صفحة تانية</title><p>دوس back.</p></html>
~~~

في الـ preview مفيش سيرفر، فالصفحة بتقول كده وبس. التشغيل الحقيقي: [[node live-server.mjs]] وافتح [[http://localhost:8831/live.html]].

**القياس:** Playwright بيقفل الـ bfcache بـ flag ([[--disable-back-forward-cache]]، وطلّعها DevTools Protocol في سبب الرفض: [[BackForwardCacheDisabledByCommandLine]])، فشغّلنا Chrome لوحده وكلّمناه بـ DevTools Protocol: فتحنا الصفحة، ودوسنا اللينك، ورجعنا بـ [[Page.navigateToHistoryEntry]]، وسمعنا لـ [[Page.backForwardCacheNotUsed]] (ده نفس اللي زرار Test back/forward cache بيعرضه في DevTools). [[live-bad.html]] نفس الصفحة من غير [[pagehide]] وإعادة الاتصال:

~~~text الناتج (Chrome 158 headless، http://localhost:8831)
== live-bad.html
  [server] ws #1 اتفتح
  قبل: tick 2 من #1
  [server] ws #1 اتقفل
  بعد back: tick 2 من #1
  لوج الصفحة: ["pageshow persisted=false","الـ socket اتفتح","pageshow persisted=true","الـ socket اتقفل (1006)"]
== live.html
  [server] ws #2 اتفتح
  قبل: tick 2 من #2
  [server] ws #2 اتقفل
  [server] ws #3 اتفتح
  بعد back: tick 2 من #3
  لوج الصفحة: ["pageshow persisted=false","الـ socket اتفتح","pagehide persisted=true","الـ socket اتقفل (1006)","pageshow persisted=true","الـ socket اتفتح"]
  [server] ws #3 اتقفل
~~~

**اللي طلع في Chrome 158 (مختلف عن اللي بتقراه في مقالات قديمة):** [[Page.backForwardCacheNotUsed]] متبعتش ولا مرة، يعني الصفحتين اترجعوا من الـ bfcache ([[persisted=true]]) **حتى** النسخة اللي فاتحة WebSocket. Chrome الجديد مبقاش يرفض الصفحة عشان الـ socket، لكنه **بيقفله** وهي داخلة الـ cache. ففي النسخة البايظة الصفحة رجعت بشكلها، بس الـ socket ميت: «آخر رسالة» واقفة على [[tick 2 من #1]] للأبد ومفيش اتصال جديد في لوج السيرفر. Chrome أقدم (وأي متصفح تاني بقواعد مختلفة) ممكن يرفض الصفحة خالص، فالتصليح لازم في الحالتين.

**ليه التصليح شغال:**

- **[[pagehide]]:** آخر حدث قبل ما الصفحة تتحط في الـ cache ([[persisted=true]]) أو تتقفل. بنقفل الـ socket بإيدينا، فالسيرفر بيعرف على طول ([[ws #2 اتقفل]]) بدل ما يفضل باعت لصفحة مش ظاهرة.
- **[[pageshow]] و [[e.persisted]]:** [[true]] معناها «رجعت من الـ bfcache»: الـ JS والـ DOM زي ما سبتهم بالظبط، بس من غير اتصالات. فبنعمل [[connect()]] تاني، والسيرفر شاف [[ws #3 اتفتح]] والرسايل رجعت ([[tick 2 من #3]]). وأول تحميل [[persisted=false]] فمش بنفتح مرتين.
- **[[socket?.close()]]:** الـ [[?.]] عشان لو الصفحة اتفتحت معزولة ومفيش socket أصلًا.

**غلطة حصلت وإحنا بنبني السيرفر:** أول نسخة من [[live-server.mjs]] كانت [[res.writeHead(200, ...).end(await readFile(file))]]. أول request لملف مش موجود ([[/favicon.ico]]) وقّع السيرفر كله بـ [[ERR_HTTP_HEADERS_SENT: Cannot write headers after they are sent to the client]]، والصفحة شافت الـ socket بيتقفل بـ 1006 ومفيش رسايل. السبب: [[res.writeHead(200)]] بيتنفّذ **قبل** الـ [[await]] اللي في الـ argument، فلما [[readFile]] رمى، الـ catch حاول يكتب 404 بعد ما الـ 200 اتبعت. التصليح: اقرا الملف في سطر لوحده الأول.

**الغلطة الشائعة:** تسمع لـ [[unload]] أو [[beforeunload]] عشان تقفل الاتصال. [[unload]] نفسه بيخلّي Chrome و Firefox يرفضوا الصفحة من الـ bfcache، فبتصلّح حاجة وتبوّظ التانية.` },
          ],
          ref: [
            { t: "MDN: Page Visibility API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API" },
            { t: "MDN: Navigator.sendBeacon()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon" },
            { t: "MDN: pageshow event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event" },
            { t: "web.dev: Back/forward cache", url: "https://web.dev/articles/bfcache" },
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
            { lvl: 'سريع', t: R`ابني tabs component (٣ تابات «الوصف» و «المواصفات» و «التقييمات»): الضغط على تاب بيعمل [[pushState]] لـ [[?tab=specs]]، و [[popstate]] بيرجّع التاب الصح، وفتح الصفحة بيقرا [[?tab=]] من [[location.search]].`, done: R`تضغط تابين ورا بعض وتعمل back مرتين: بترجع للتابين اللي قبل بالترتيب، و refresh على [[?tab=reviews]] بيفتح التقييمات، و [[?tab=xyz]] بيفتح التاب الأول من غير error.`, sol: R`~~~live 220 tabs-url.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>صفحة المنتج</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  [role="tablist"] { display: flex; gap: 4px; border-bottom: 2px solid #e5e7eb; }
  [role="tab"] { font: inherit; border: 0; background: none; padding: 8px 12px; cursor: pointer; }
  [role="tab"][aria-selected="true"] { border-bottom: 3px solid #1d4ed8; font-weight: 700; }
  [role="tabpanel"] { padding: 12px 0; }
  #note { font-size: 12px; color: #92400e; }
</style>
</head>
<body>
<div role="tablist" aria-label="تفاصيل المنتج">
  <button role="tab" id="t-desc" aria-controls="desc" data-tab="desc">الوصف</button>
  <button role="tab" id="t-specs" aria-controls="specs" data-tab="specs">المواصفات</button>
  <button role="tab" id="t-reviews" aria-controls="reviews" data-tab="reviews">التقييمات</button>
</div>
<section role="tabpanel" id="desc" aria-labelledby="t-desc">مج سيراميك ٣٥٠ مل.</section>
<section role="tabpanel" id="specs" aria-labelledby="t-specs">الارتفاع ٩ سم، ينفع في الميكروويف.</section>
<section role="tabpanel" id="reviews" aria-labelledby="t-reviews">٤٫٥ من ٥ (١٢ تقييم).</section>
<p id="note"></p>
<script>
  const TABS = ["desc", "specs", "reviews"];

  function show(tab) {
    if (!TABS.includes(tab)) tab = TABS[0];        // ?tab=xyz أو مفيش = الأول
    for (const t of TABS) {
      document.querySelector($__bt[data-tab="$__{t}"]$__bt).setAttribute("aria-selected", String(t === tab));
      document.getElementById(t).hidden = t !== tab;
    }
  }
  const tabFromUrl = () => new URLSearchParams(location.search).get("tab");

  document.querySelector('[role="tablist"]').addEventListener("click", (e) => {
    const tab = e.target.closest("[data-tab]")?.dataset.tab;
    if (!tab || tab === tabFromUrl()) return;      // نفس التاب: متعملش entry زيادة
    const url = new URL(location.href);
    url.searchParams.set("tab", tab);
    try {
      history.pushState({ tab }, "", url);
    } catch {
      document.querySelector("#note").textContent = "الصفحة معزولة: الـ URL مبيتغيّرش، والتابات شغالة عادي";
    }
    show(tab);
  });

  window.addEventListener("popstate", () => show(tabFromUrl()));
  show(tabFromUrl());
</script>
</body>
</html>
~~~

في الـ preview التابات شغالة بس الـ URL مبيتغيّرش: الصفحة معزولة و [[pushState]] بيرمي فيها [[SecurityError]]، فالـ catch بيكتب ملاحظة ويكمّل. انسخها وشغّلها من سيرفر محلي.

~~~text الناتج (Chrome 158 headless، http://localhost:8831/tabs-url.html)
فتح الصفحة             الوصف      (مفيش) | history.length=2
ضغط المواصفات          المواصفات  ?tab=specs | history.length=3
ضغط التقييمات          التقييمات  ?tab=reviews | history.length=4
نفس التاب تاني         التقييمات  ?tab=reviews | history.length=4
back                   المواصفات  ?tab=specs | history.length=4
back تاني              الوصف      (مفيش) | history.length=4
forward                المواصفات  ?tab=specs | history.length=4
refresh على ?tab=reviews التقييمات  ?tab=reviews | history.length=4
?tab=xyz               الوصف      ?tab=xyz | history.length=5
pageerrors: 0
~~~

(الـ [[history.length]] بيبدأ 2 لأن التاب كان فيه [[about:blank]] قبل الصفحة.)

**ليه كده:**

- **[[show(tab)]] هي المكان الوحيد اللي بيرسم:** الضغطة والـ [[popstate]] وفتح الصفحة التلاتة بينادوها بالتاب من الـ URL. فالشكل دايمًا = الـ URL.
- **[[new URL(location.href)]] و [[searchParams.set("tab", tab)]]:** بيغيّر [[?tab=]] بس ويسيب أي parameter تاني في العنوان ([[?ref=ads]] مثلًا) زي ما هو.
- **[[history.pushState({ tab }, "", url)]]:** entry جديد في الـ history من غير ما الصفحة تتحمّل، فـ back بيرجّع للتاب اللي قبل. الـ [[pushState]] نفسه **مبيعملش** [[popstate]]، فلازم [[show(tab)]] بعده.
- **[[popstate]]:** بيحصل مع back و forward، والـ [[location]] ساعتها اتغيّر خلاص، فبنقرا منه.
- **[[if (... tab === tabFromUrl()) return]]:** ضغطة على نفس التاب مبتعملش entry (الـ [[history.length]] فضل 4). من غيرها، اليوزر هيدوس back كذا مرة ومفيش حاجة بتتغيّر.
- **[[if (!TABS.includes(tab)) tab = TABS[0]]]:** [[?tab=xyz]] أو مفيش [[tab]] خالص بيفتح الأول من غير error.
- **[[role="tab"]] و [[aria-selected]]:** قارئ الشاشة بيقول إن ده تاب ومتحدد ولا لأ. (التنقل بالأسهم بين التابات خطوة زيادة مش في الحل ده.)

**الغلطة الشائعة:** تعمل [[pushState]] في الـ [[popstate]] كمان (عشان «تحدّث الـ URL»). كل back بيعمل entry جديد، فاليوزر بيلف في نفس المكان ومبيعرفش يطلع من الصفحة.` },
            { lvl: 'تطبيق', t: R`صلّح الباج: راوتر الدرس بيمسك كل [[a[data-link]]] حتى لو اللينك لموقع تاني، أو عليه [[target="_blank"]] أو [[download]]. حط ٣ لينكات زي دول جنب اللينكات العادية وصلّح الشرط عشان يسيبهم للمتصفح.`, done: R`لينك لـ [[https://example.com]] بيفتح الموقع ده فعلًا، و [[target="_blank"]] بيفتح تاب جديد، و [[download]] بينزّل الملف، واللينكات الداخلية لسه بتتنقل من غير reload، والشرط فيه مقارنة [[a.origin !== location.origin]].`, sol: R`**قبل التصليح:** راوتر الدرس زي ما هو، ومعاه التلات لينكات، على سيرفر محلي بيرجّع [[index.html]] لأي مسار:

~~~text الناتج (Chrome 158 headless، النسخة القديمة)
خارجي: http://localhost:8831/ | المحتوى: الرئيسية
target=_blank: تابات جديدة = 0 | http://localhost:8831/about
download: تنزيلات = 0 | http://localhost:8831/menu.txt | 404: الصفحة مش موجودة
~~~

لينك [[https://example.com]] فتح «الرئيسية» عندنا (الراوتر خد [[pathname]] بتاعه، [["/"]]، ورماه على موقعنا)، و [[target="_blank"]] فتح في نفس التاب، و [[download]] غيّر الـ URL لـ [[/menu.txt]] وعرض 404 بدل ما ينزّل الملف.

**بعد التصليح:**

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرئيسية</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  nav a { margin-inline-end: 12px; }
  #content { padding: 16px; background: #f3f4f6; border-radius: 8px; margin-top: 12px; }
</style>
</head>
<body>
<nav>
  <a href="/" data-link>الرئيسية</a>
  <a href="/about" data-link>عننا</a>
  <a href="/contact" data-link>كلمنا</a>
  <a href="https://example.com" data-link>موقع تاني</a>
  <a href="/about" data-link target="_blank">عننا في تاب جديد</a>
  <a href="/menu.txt" data-link download>نزّل المنيو</a>
</nav>
<div id="content"></div>
<script>
  const content = document.querySelector("#content");
  const pages = { "/": "الرئيسية", "/about": "عننا", "/contact": "كلمنا" };
  function render(path) {
    content.textContent = pages[path] ?? "404: الصفحة مش موجودة";
    document.title = pages[path] ?? "مش موجود";
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-link]");
    if (!a || e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;  // تاب جديد/شباك
    if (a.origin !== location.origin) return;           // موقع تاني: سيبه للمتصفح
    if (a.target && a.target !== "_self") return;       // target="_blank" وغيره
    if (a.hasAttribute("download")) return;             // تنزيل ملف
    e.preventDefault();
    if (a.pathname === location.pathname) return;
    history.pushState({}, "", a.pathname);
    render(a.pathname);
  });
  window.addEventListener("popstate", () => render(location.pathname));
  render(location.pathname);
</script>
</body>
</html>
~~~

~~~text menu.txt
قهوة 30 / شاي 15
~~~

الصفحة دي محتاجة سيرفر بيرجّع [[index.html]] لأي مسار (refresh على [[/about]])، فمش هتشتغل في الـ preview. اتقاست على [[http://localhost:8831]] بسيرفر [[node:http]] بالشكل ده، و [[example.com]] اتردّ عليه من Playwright نفسه عشان التجربة متطلعش برا الجهاز:

~~~text الناتج (Chrome 158 headless، بعد التصليح)
داخلي «عننا»: http://localhost:8831/about | نفس الصفحة من غير reload: true | requests للـ document: 1
target=_blank: تاب جديد على http://localhost:8831/about | العنوان: عننا
download: اسم الملف menu.txt | الصفحة لسه: http://localhost:8831/about
خارجي: https://example.com/ | Example Domain
لوج السيرفر: GET / , GET /about , GET /menu.txt
pageerrors: 0
~~~

**ليه كده:**

- **[[a.origin !== location.origin]]:** أي لينك لـ origin تاني (دومين أو بورت أو بروتوكول مختلف) مش بتاعنا، فبنرجع من غير [[preventDefault]] والمتصفح بيفتحه عادي. الـ [[<a>]] نفسه فيه [[origin]] و [[pathname]] زي [[URL]] بالظبط.
- **[[a.target && a.target !== "_self"]]:** [[_blank]] أو اسم شباك = اليوزر عايزه في مكان تاني. لوج السيرفر فيه [[GET /about]] من التاب الجديد (تحميل كامل، وده صح هناك).
- **[[a.hasAttribute("download")]]:** المتصفح لازم يعمل التنزيل بنفسه ([[GET /menu.txt]] في اللوج والملف اتنزّل بالاسم).
- **[[e.altKey]] و [[e.defaultPrevented]]:** Alt+Click بينزّل اللينك في Chrome، ولو كود تاني عمل [[preventDefault]] قبلنا منلمسش الضغطة.
- **[[window.__same]]:** متغير حطيناه قبل الضغط. لو الصفحة اتحمّلت تاني كان هيختفي، ولقيناه [[true]]: التنقل الداخلي من غير reload.

**الغلطة الشائعة:** تصلّح الخارجي بـ [[a.href.startsWith("http")]]. كل [[a.href]] بيرجع URL كامل بيبدأ بـ [[http]] حتى اللينكات الداخلية ([[/about]] بتبقى [[http://localhost:8831/about]])، فكل اللينكات هتتساب للمتصفح والـ SPA هيعمل reload في كل ضغطة.` },
            { lvl: 'تحدي', t: R`مسألة: اكتب [[matchRoute(path, routes)]] بترجّع [[{ route, params }]] أو [[null]]، لـ routes زي [[/users/:id]] و [[/users/:id/posts]]، بـ [[URLPattern]] أو regex، واكتب لها تستات بـ [[node:test]]، وبعدين وصّلها بالراوتر.`, done: R`[[matchRoute("/users/42", routes).params.id]] بيرجّع [["42"]]، و [[/users/42/posts]] بيطابق الـ route التاني، و [[/users]] لوحدها و [[/users/42/x]] بيرجّعوا [[null]] (يعني 404)، و [[node --test]] بيعدّي، و back و forward و refresh (مع [[npx serve -s]]) بيفتحوا الصفحة الصح.`, sol: R`**الدالة وتستاتها** (Node 24 فيه [[URLPattern]] كـ global، وكل المتصفحات الحديثة كمان):

~~~js match-route.mjs
// كل route: pattern زي "/users/:id"، و URLPattern بيحوّله لمطابقة كاملة للمسار
export function compileRoutes(routes) {
  return routes.map((route) => ({ route, pattern: new URLPattern({ pathname: route.path }) }));
}

export function matchRoute(path, compiled) {
  for (const { route, pattern } of compiled) {
    const m = pattern.exec({ pathname: path });
    if (m) return { route, params: { ...m.pathname.groups } };
  }
  return null;    // 404
}
~~~

~~~js match-route.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { compileRoutes, matchRoute } from "./match-route.mjs";

const routes = compileRoutes([
  { path: "/", name: "home" },
  { path: "/users/:id", name: "user" },
  { path: "/users/:id/posts", name: "posts" },
]);

test("/users/42 بيطابق user و id = 42", () => {
  const m = matchRoute("/users/42", routes);
  assert.equal(m.route.name, "user");
  assert.equal(m.params.id, "42");
});

test("/users/42/posts بيطابق التاني", () => {
  assert.equal(matchRoute("/users/42/posts", routes).route.name, "posts");
});

test("/users لوحدها و /users/42/x = null (404)", () => {
  assert.equal(matchRoute("/users", routes), null);
  assert.equal(matchRoute("/users/42/x", routes), null);
});

test("الرئيسية بالظبط بس", () => {
  assert.equal(matchRoute("/", routes).route.name, "home");
  assert.equal(matchRoute("/about", routes), null);
});

test("حروف مش إنجليزي في الـ param", () => {
  assert.equal(matchRoute("/users/%D8%B3%D8%A7%D8%B1%D8%A9", routes).params.id, "%D8%B3%D8%A7%D8%B1%D8%A9");
});
~~~

~~~text الناتج (node --test، Node 24)
✔ /users/42 بيطابق user و id = 42 (0.8201ms)
✔ /users/42/posts بيطابق التاني (0.7359ms)
✔ /users لوحدها و /users/42/x = null (404) (0.1662ms)
✔ الرئيسية بالظبط بس (0.1621ms)
✔ حروف مش إنجليزي في الـ param (0.1525ms)
ℹ tests 5
ℹ pass 5
ℹ fail 0
~~~

**موصّلة بالراوتر** (٣ ملفات في فولدر واحد مع [[match-route.mjs]]):

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>يوزرز</title>
<script type="module" src="/app.mjs"></script>
</head>
<body>
<nav>
  <a href="/" data-link>الرئيسية</a> |
  <a href="/users/42" data-link>يوزر 42</a> |
  <a href="/users/42/posts" data-link>بوستات 42</a> |
  <a href="/users/42/x" data-link>لينك بايظ</a>
</nav>
<main id="content"></main>
</body>
</html>
~~~

~~~js app.mjs
import { compileRoutes, matchRoute } from "./match-route.mjs";

const routes = compileRoutes([
  { path: "/", view: () => "الرئيسية" },
  { path: "/users/:id", view: (p) => $__btبروفايل اليوزر $__{p.id}$__bt },
  { path: "/users/:id/posts", view: (p) => $__btبوستات اليوزر $__{p.id}$__bt },
]);

const content = document.querySelector("#content");
function render(path) {
  const m = matchRoute(path, routes);
  content.textContent = m ? m.route.view(m.params) : "404: الصفحة مش موجودة";
  document.title = content.textContent;
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (a.origin !== location.origin || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
  e.preventDefault();
  if (a.pathname === location.pathname) return;
  history.pushState({}, "", a.pathname);
  render(a.pathname);
});
window.addEventListener("popstate", () => render(location.pathname));
render(location.pathname);
~~~

~~~js spa-server.mjs
// زي npx serve -s: أي مسار مش ملف بيرجّع index.html
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const types = { ".html": "text/html; charset=utf-8", ".mjs": "text/javascript", ".js": "text/javascript" };
createServer(async (req, res) => {
  const path = new URL(req.url, "http://x").pathname;
  const file = extname(path) ? join(".", path) : "index.html";
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
}).listen(Number(process.env.PORT) || 8831, () => console.log("على http://localhost:" + (Number(process.env.PORT) || 8831)));
~~~

[[spa-server.mjs]] بيعمل اللي [[npx serve -s]] بيعمله (أي مسار من غير امتداد بيرجّع [[index.html]])، عشان متسطّبش حاجة. شغّله بـ [[node spa-server.mjs]].

~~~text الناتج (Chrome 158 headless، http://localhost:8831)
فتح /                      /                الرئيسية
ضغط يوزر 42                /users/42        بروفايل اليوزر 42
ضغط بوستات 42              /users/42/posts  بوستات اليوزر 42
ضغط لينك بايظ              /users/42/x      404: الصفحة مش موجودة
back                       /users/42/posts  بوستات اليوزر 42
back                       /users/42        بروفايل اليوزر 42
forward                    /users/42/posts  بوستات اليوزر 42
refresh                    /users/42/posts  بوستات اليوزر 42
فتح /users مباشرة          /users           404: الصفحة مش موجودة
pageerrors: 0
~~~

**ليه كده:**

- **[[new URLPattern({ pathname: "/users/:id" })]]:** [[:id]] جزء اسمه [[id]] بيطابق أي حاجة لحد الـ [[/]] اللي بعدها. والمطابقة **كاملة**: [[/users/42/x]] مش بيطابق [[/users/:id]] لأن فيه حاجة زيادة، و [[/users]] مش بيطابق لأن الجزء ناقص.
- **[[compileRoutes]] مرة واحدة:** بنعمل الـ patterns أول ما الصفحة تفتح مش مع كل تنقل.
- **[[m.pathname.groups]]:** فيها الأجزاء بأساميها ([[{ id: "42" }]]). القيم نصوص دايمًا، وزي ما هي في الـ URL (التست الأخير: الاسم العربي فاضل encoded، فك بـ [[decodeURIComponent]] لو محتاج).
- **[[null]] = 404:** الراوتر بيعرض «مش موجودة» بدل ما يقع.
- **[[src="/app.mjs"]] بـ [[/]] في الأول:** جرّبناها من غير الـ [[/]] و refresh على [[/users/42/posts]] جاب صفحة فاضية و [[Failed to load resource: the server responded with a status of 404]] مرتين. المتصفح حسب [[app.mjs]] بالنسبة للمسار الحالي، فطلب [[/users/42/app.mjs]]. في أي SPA بـ pushState، كل الملفات بمسار من الـ root.

**الغلطة الشائعة:** تكتب الـ regex بإيدك [[/^\/users\/(.+)$/]]. الـ [[.+]] بيبلع الـ [[/]] كمان، فـ [[/users/42/posts]] هيطابق الأول و [[id]] يبقى [["42/posts"]]. [[[^/]+]] هو الصح، و [[URLPattern]] بيعمل ده لوحده.` },
          ],
          ref: [
            { t: "MDN: History API", url: "https://developer.mozilla.org/en-US/docs/Web/API/History_API" },
            { t: "MDN: History.pushState()", url: "https://developer.mozilla.org/en-US/docs/Web/API/History/pushState" },
            { t: "MDN: popstate event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event" },
            { t: "MDN: URL Pattern API", url: "https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API" },
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
            { lvl: 'سريع', t: R`اقرا وتوقّع: [[observe(el, { attributes: true })]] وبعدين [[el.className = "a"; el.className = "b"; el.className = "b";]] في نفس الكود. الـ callback هيتنادى كام مرة؟ وكام record؟ وإيه [[oldValue]] في كل واحد لو ضفت [[attributeOldValue: true]]؟ اكتب توقعك وبعدين شغّله.`, done: R`الـ callback اتنادى **مرة واحدة** بـ ٣ records (حتى التالت اللي مغيّرش القيمة اتسجّل)، و [[oldValue]] بالترتيب [[null]] و [["a"]] و [["b"]]، وتقدر تشرح ليه مرة واحدة: الـ records بتتجمّع وتتبعت كـ microtask بعد ما الكود يخلص.`, sol: R`**التوقع:** الـ callback **مرة واحدة** بعد ما الكود يخلص، فيها ٣ records (حتى التالت اللي كتب نفس القيمة)، و [[oldValue]] بالترتيب [[null]] ثم [["a"]] ثم [["b"]].

~~~live 220 mo-predict.html
<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>MutationObserver: كام مرة؟</title>
<style>body { font: 14px/1.6 system-ui, sans-serif; margin: 16px; } pre { background: #f3f4f6; padding: 8px; direction: ltr; text-align: left; }</style>
<div id="el"></div>
<pre id="out"></pre>
<script>
  const out = document.querySelector("#out");
  const log = (s) => (out.textContent += s + "\n");
  const el = document.querySelector("#el");
  let calls = 0;

  new MutationObserver((records) => {
    calls++;
    log($__btcallback رقم $__{calls}: $__{records.length} records$__bt);
    records.forEach((r, i) => log($__bt  $__{i + 1}) $__{r.attributeName} oldValue=$__{JSON.stringify(r.oldValue)}$__bt));
  }).observe(el, { attributes: true, attributeOldValue: true });

  el.className = "a";
  el.className = "b";
  el.className = "b";
  log("الكود خلص");
  queueMicrotask(() => log("microtask اتسجّل بعد التغييرات"));
  setTimeout(() => log("setTimeout: calls = " + calls), 0);
</script>
</html>
~~~

~~~text الناتج (Chrome 158 headless، جوه iframe معزول)
الكود خلص
callback رقم 1: 3 records
  1) class oldValue=null
  2) class oldValue="a"
  3) class oldValue="b"
microtask اتسجّل بعد التغييرات
setTimeout: calls = 1
~~~

**ليه كده:**

- **مرة واحدة:** المتصفح مبينادي الـ callback مع كل تغيير. بيحط الـ records في طابور، وأول تغيير بيجدول **microtask** واحد يسلّم الطابور كله. الـ microtask بيشتغل بعد ما الكود اللي شغال يخلص، فـ «الكود خلص» طلع الأول.
- **التالت اتسجّل:** [[el.className = "b"]] وهي [["b"]] أصلًا لسه «كتابة» على الـ attribute، والـ observer بيسجّل الكتابة مش التغيير. لو عايز التغييرات الحقيقية بس، قارن [[r.oldValue]] بالقيمة الحالية.
- **[[oldValue]]:** القيمة **قبل** كل كتابة. أول مرة الـ [[class]] مكانش موجود أصلًا فـ [[null]]. ومن غير [[attributeOldValue: true]] كانت هتبقى [[null]] في التلاتة.
- **ترتيب الـ microtasks:** الـ [[queueMicrotask]] اتسجّل **بعد** التغييرات، فاشتغل بعد الـ callback (الطابور بالترتيب). والـ [[setTimeout]] task كاملة بعد كل الـ microtasks، وشاف [[calls = 1]].

**الغلطة الشائعة:** تفتكر إنه زي الـ events وتكتب كود بيفترض record واحد ([[records[0]]]). لما الكود بيغيّر حاجات كتير مرة واحدة (زي [[innerHTML]] أو loop)، هتعالج أول تغيير بس وتفوّت الباقي. لف على [[records]] دايمًا.` },
            { lvl: 'تطبيق', t: R`ابني «عدّاد غير مقروء»: [[<ul id="inbox">]] فيه رسايل [[<li data-read="false">]]، وزرار بيضيف رسالة جديدة، وضغطة على رسالة بتخلّي [[data-read="true"]]. العدّاد في العنوان ([[document.title = "(3) البريد"]]) بيتحسب من MutationObserver واحد بس، مش من كود الزرار ولا كود الضغطة.`, done: R`إضافة رسالة بتزوّد الرقم، وقراية رسالة بتنقّصه، و [[inbox.innerHTML = ""]] من الـ Console بيخلّي العنوان [[البريد]] من غير رقم، والـ observer عليه [[attributeFilter: ["data-read"]]] و [[subtree: true]]، والعدّ بيحصل مرة واحدة لكل دفعة تغييرات مش لكل record.`, sol: R`~~~live 320 inbox.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>البريد</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #inbox { list-style: none; padding: 0; }
  #inbox li { padding: 8px; border-bottom: 1px solid #e5e7eb; cursor: pointer; }
  #inbox li[data-read="false"] { font-weight: 700; background: #eff6ff; }
  #title { font-size: 13px; color: #555; }
  button { font: inherit; }
</style>
</head>
<body>
<p id="title"></p>
<button id="add">رسالة جديدة</button>
<button id="clear">امسح الكل (innerHTML = "")</button>
<ul id="inbox">
  <li data-read="false">فاتورة نوفمبر</li>
  <li data-read="false">دعوة اجتماع</li>
  <li data-read="true">أهلًا بيك</li>
</ul>
<script>
  const inbox = document.querySelector("#inbox");
  let n = 0, counts = 0;

  // الزرار والضغطة بيعدّلوا الـ DOM بس، ومحدش فيهم يعرف حاجة عن العنوان
  document.querySelector("#add").addEventListener("click", () => {
    inbox.insertAdjacentHTML("afterbegin", $__bt<li data-read="false">رسالة جديدة $__{++n}</li>$__bt);
  });
  inbox.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li) li.dataset.read = "true";
  });
  document.querySelector("#clear").addEventListener("click", () => (inbox.innerHTML = ""));

  // العدّاد: مكان واحد بس
  function updateTitle() {
    counts++;
    const unread = inbox.querySelectorAll('li[data-read="false"]').length;
    document.title = unread ? $__bt($__{unread}) البريد$__bt : "البريد";
    document.querySelector("#title").textContent = $__btعنوان التاب: $__{document.title} (اتحسب $__{counts} مرة)$__bt;
  }

  new MutationObserver(updateTitle).observe(inbox, {
    childList: true,                 // رسايل اتضافت أو اتشالت
    subtree: true,                   // الـ li جوه الـ ul
    attributes: true,
    attributeFilter: ["data-read"],  // بس ده، مش أي attribute
  });
  updateTitle();
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 headless، جوه iframe معزول)
البداية                          عنوان التاب: (2) البريد (اتحسب 1 مرة)
رسالة جديدة                      عنوان التاب: (3) البريد (اتحسب 2 مرة)
قرينا «فاتورة نوفمبر»            عنوان التاب: (2) البريد (اتحسب 3 مرة)
٥ رسايل في نفس الكود             عنوان التاب: (7) البريد (اتحسب 4 مرة)
attribute تاني (title)           عنوان التاب: (7) البريد (اتحسب 4 مرة)
innerHTML = ""                   عنوان التاب: البريد (اتحسب 5 مرة)
pageerrors: 0
~~~

**ليه كده:**

- **العدّاد في مكان واحد:** كود الزرار بيضيف [[li]] وبس، وكود الضغطة بيغيّر [[data-read]] وبس. أي حاجة تغيّر الـ DOM (حتى [[innerHTML = ""]] من الـ Console، أو سكربت تاني، أو extension) العنوان بيتحدّث لوحده، لأن الـ observer بيراقب النتيجة مش الكود.
- **[[childList: true]] و [[subtree: true]]:** [[childList]] على الـ [[ul]] بيمسك الرسايل اللي بتتضاف وتتشال. و [[subtree]] لازم عشان الـ [[data-read]] على الـ [[li]] اللي جوه، مش على الـ [[ul]] نفسه.
- **[[attributeFilter: ["data-read"]]]:** بيراقب الـ attribute ده بس. تغيير [[title]] متحسبش (العدّاد فضل 4)، فالـ callback مبيشتغلش على تغييرات ملهاش علاقة.
- **[[updateTitle]] بتعدّ من الـ DOM:** مش بتحسب من الـ records (+1 و -1)، بتسأل [[querySelectorAll('li[data-read="false"]').length]]. كده مستحيل الرقم يبعد عن الحقيقة حتى لو فاتك record.
- **«٥ رسايل في نفس الكود» = حسبة واحدة:** الـ ٥ إضافات عملوا ٥ records، بس الـ callback اتنادى مرة واحدة بيهم كلهم (microtask بعد الكود). عشان كده بنتجاهل الـ records ونعدّ مرة.

**الغلطة الشائعة:** [[attributes: true]] من غير [[attributeFilter]] و [[subtree]] على [[document.body]]. أي animation أو class بيتغيّر في الصفحة هينادي الـ callback ويعمل [[querySelectorAll]] على الفاضي عشرات المرات في الثانية.` },
            { lvl: 'تحدي', t: R`صلّح الكود البايظ: observer على [[document.body]] بـ [[{ childList: true, subtree: true }]] بيضيف [[<span class="badge">جديد</span>]] جوه أي [[li]] جديد. شغّله وشوف الصفحة بتعلّق، واعرف ليه، وصلّحه من غير ما تشيل الـ subtree.`, done: R`عرفت إن إضافة الـ badge نفسها mutation جديدة فالـ callback بينادي نفسه للأبد (ومن غير ما الصفحة ترسم، لأنه microtask)، وصلّحته بإنك تتجاهل العناصر اللي عليها الـ badge أو تعمل [[disconnect]] وتضيف وتعمل [[observe]] تاني، وإضافة ١٠٠ [[li]] بتطلّع ١٠٠ badge بالظبط والصفحة مبتعلّقش.`, sol: R`**الكود البايظ** (زي التمرين، ومعاه عدّاد بيوقفه بعد ٢٠٠٠ نداء عشان التجربة متعلّقش المتصفح):

~~~js
new MutationObserver(() => {
  calls++;
  if (calls > 2000) throw new Error("وقفنا بعد 2000 نداء");
  for (const li of document.querySelectorAll("li")) {
    li.insertAdjacentHTML("beforeend", '<span class="badge">جديد</span>');
  }
}).observe(document.body, { childList: true, subtree: true });
~~~

~~~text الناتج (Chrome 158 headless، ضغطة واحدة على «ضيف عنصر»)
[البايظة] بعد عنصر واحد: li: 1 | badge: 1999 | calls: 2001 | pageerror: وقفنا بعد 2000 نداء | 478ms
~~~

**ليه علّق:** إضافة الـ badge نفسها [[childList]] mutation جوه [[body]]، والـ observer عليه [[subtree]]، فالـ callback بيتجدول تاني. والـ callback الجديد بيضيف badge تاني لنفس الـ [[li]]... وهكذا. ولأن الـ callbacks دي microtasks، المتصفح مبيرسمش ولا بيرد على الضغط بينهم، فالصفحة بتتجمّد (من غير العدّاد كانت هتفضل كده).

**المصلّحة:**

~~~live 300 badges.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>badge لكل عنصر جديد</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  .badge { background: #dc2626; color: #fff; border-radius: 999px; padding: 0 8px; font-size: 12px; margin-inline-start: 6px; }
  button { font: inherit; }
</style>
</head>
<body>
<button id="one">ضيف عنصر</button>
<button id="many">ضيف ١٠٠</button>
<p id="info"></p>
<ul id="list"></ul>
<script>
  const list = document.querySelector("#list");
  let calls = 0;

  function addBadge(li) {
    if (li.querySelector(".badge")) return;          // عليه badge خلاص: متضيفش تاني
    li.insertAdjacentHTML("beforeend", '<span class="badge">جديد</span>');
  }

  new MutationObserver((records) => {
    calls++;
    for (const r of records) {
      for (const node of r.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches("li")) addBadge(node);       // الـ span اللي بنضيفه مش li فبيتساب
        node.querySelectorAll?.("li").forEach(addBadge);
      }
    }
    // #info نفسه جوه body: كتابة نص فيه = mutation جديدة. نكتب بس لو النص اتغيّر، وإلا الـ callback هينادي نفسه للأبد
    const text = $__btli: $__{list.querySelectorAll("li").length} | badge: $__{list.querySelectorAll(".badge").length}$__bt;
    const info = document.querySelector("#info");
    if (info.textContent !== text) info.textContent = text;
  }).observe(document.body, { childList: true, subtree: true });

  let n = 0;
  const add = () => list.insertAdjacentHTML("beforeend", $__bt<li>عنصر $__{++n}</li>$__bt);
  document.querySelector("#one").addEventListener("click", add);
  document.querySelector("#many").addEventListener("click", () => { for (let i = 0; i < 100; i++) add(); });
</script>
</body>
</html>
~~~

~~~text الناتج (Chrome 158 headless، جوه iframe معزول)
[المصلّحة] عنصر: li: 1 | badge: 1 | calls: 4
[المصلّحة] +١٠٠: li: 101 | badge: 101 | calls: 6 | 137ms
pageerrors: 0
~~~

**ليه شغالة (والـ subtree لسه موجود):**

- **[[r.addedNodes]] بدل كل الـ [[li]] في الصفحة:** بنبص على العناصر الجديدة بس. الـ [[span]] اللي إحنا ضفناه بيظهر في [[addedNodes]] في النداء اللي بعده، بس هو مش [[li]] فبيتساب، والـ loop بيقف.
- **[[if (li.querySelector(".badge")) return]]:** حماية تانية: [[li]] عليه badge مبياخدش تاني، حتى لو اتشال واتحط في مكان تاني.
- **[[node.querySelectorAll?.("li")]]:** لو حد ضاف [[ul]] كامل فيه [[li]] كتير مرة واحدة، الـ [[li]] اللي جواه مش هيبقوا في [[addedNodes]] لوحدهم، فبندوّر جوه العنصر الجديد.
- **١٠٠ عنصر = ١٠١ badge بالظبط (مع الأولاني)** في نداءين بس للـ ١٠٠، لأن الـ records بتتجمّع.

**الحل التاني اللي في التمرين:** [[mo.disconnect()]] في أول الـ callback، وبعدين تضيف الـ badges، وبعدين [[mo.observe(document.body, options)]] تاني. التغييرات اللي حصلت والـ observer مفصول مبتتسجّلش. بيشتغل، بس لو كود تاني ضاف [[li]] في نفس اللحظة دي هيفوتك.

**وقعنا في نفس الفخ وإحنا بنكتب الحل:** أول نسخة كانت بتكتب في [[#info]] سطر فيه عدد مرات النداء. [[#info]] جوه [[body]]، فكتابة النص mutation، والعدد بيتغيّر كل مرة، فالنص دايمًا جديد، فالصفحة علّقت من غير ولا [[li]] زيادة (التجربة وقفت بعد ١٢٠ ثانية). التصليح: [[if (info.textContent !== text)]] والعدد اتشال من النص، فالنداء التاني بيلاقي نفس النص ومبيكتبش. أي observer على [[body]] لازم ميتأثرش بحاجة هو بيكتبها.

**الغلطة الشائعة:** تحل المشكلة بإنك تشيل [[subtree]] وتراقب [[#list]] بس. بيشتغل هنا، بس أي [[li]] بيتضاف في مكان تاني في الصفحة (أو جوه [[ul]] متداخل) مش هيوصلك.` },
          ],
          ref: [
            { t: "MDN: MutationObserver", url: "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver" },
            { t: "MDN: MutationObserver.observe()", url: "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe" },
            { t: "MDN: MutationRecord", url: "https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord" },
          ],
          pre: [{ to: "js/microtasks و macrotasks", why: R`الـ records بتتسلّم في microtask بعد ما الكود يخلص، وده اللي بيفسّر «مرة واحدة» والـ loop اللانهائي` }],
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
            { lvl: 'سريع', t: R`دوّر بنفسك: من MDN (صفحة [[Permissions.query()]] وصفحة [[Notification.requestPermission()]])، إيه الفرق بين [["prompt"]] و [["default"]]؟ وإيه اللي بيحصل لو ناديت [[requestPermission()]] من غير ضغطة من اليوزر في Firefox و Safari؟`, done: R`كتبت إن الاتنين معناهم «لسه مسألناش» بس [["prompt"]] اسمها في Permissions API و [["default"]] في [[Notification.permission]]، وإن Firefox و Safari بيطلبوا user gesture (ضغطة) وإلا السؤال مبيظهرش، ومعاك لينك الصفحتين.`, sol: R`**الإجابة النموذجية:**

1. **[["prompt"]] و [["default"]] نفس المعنى:** «اليوزر لسه مقررش». الفرق في الاسم بس، لأنهم من API-ين مختلفين:
   - [[navigator.permissions.query({ name: "notifications" })]] بترجّع [[PermissionStatus]] و [[state]] بتاعه واحد من [["granted"]] أو [["denied"]] أو [["prompt"]] (صفحة [[PermissionStatus.state]] على MDN).
   - [[Notification.permission]] (و [[Notification.requestPermission()]]) بترجّع [["granted"]] أو [["denied"]] أو [["default"]]، و MDN بيقول عن [["default"]]: «The user decision is unknown; in this case the application will act as if permission was denied». يعني تعامل معاها زي الرفض لحد ما تسأل.
2. **من غير ضغطة من اليوزر في Firefox و Safari:** السؤال مش هيظهر. صفحة «Using the Notifications API» على MDN: «you should only request consent to display notifications in response to a user gesture (e.g., clicking a button)… Firefox is already doing this from version 72, for example, and Safari has done it for some time». وفي Chrome و Firefox كمان لازم secure context (HTTPS أو localhost)، ومينفعش تطلب الإذن من iframe من origin تاني.

**اتأكدنا بنفسنا من الأسامي في Chrome** على صفحة على [[http://localhost:8831]] بـ ٣ حالات للإذن:

~~~text الناتج (Chrome 158 headless)
لسه مسألناش  permissions.query: "prompt" | Notification.permission: "default"
granted      permissions.query: "granted" | Notification.permission: "granted"
~~~

نفس الحالة، اسمين: [["prompt"]] من ناحية و [["default"]] من الناحية التانية. وفي الـ iframe المعزول بتاع الـ preview في الموقع ده، [[Notification.permission]] رجّعت [["denied"]] على طول.

**اللينكات:**

- MDN: [[Notification.permission]]: https://developer.mozilla.org/en-US/docs/Web/API/Notification/permission_static
- MDN: [[Notification.requestPermission()]]: https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static
- MDN: [[Permissions.query()]]: https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
- MDN: Using the Notifications API: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API

**الغلطة الشائعة:** تكتب [[if (Notification.permission === "prompt")]]. القيمة دي مش موجودة في [[Notification.permission]] أصلًا، فالشرط عمره ما هيبقى [[true]] والزرار مش هيظهر لحد أبدًا.` },
            { lvl: 'تطبيق', t: R`ابني زرار «فعّل الإشعارات» بـ ٣ أشكال حسب الحالة: [["prompt"]] زرار عادي، و [["granted"]] علامة ✓ «الإشعارات شغالة»، و [["denied"]] رسالة بتقول «اتقفلت من إعدادات الموقع» من غير زرار. والشكل بيتغير لوحده بـ [[status.onchange]] لو اليوزر غيّر الإعدادات والصفحة مفتوحة.`, done: R`كل حالة من التلاتة بتطلّع شكلها، وتغيير الإذن من القفل اللي جنب العنوان بيقلب الشكل من غير refresh، وفي حالة [["denied"]] مفيش أي نداء لـ [[requestPermission]] (اتأكد بـ [[console.log]] جواها).`, sol: R`~~~live 160 notify-button.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فعّل الإشعارات</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #box { padding: 12px; border-radius: 8px; background: #f3f4f6; }
  .ok { color: #065f46; font-weight: 700; }
  .no { color: #92400e; }
  button { font: inherit; padding: 6px 16px; }
</style>
</head>
<body>
<div id="box"></div>
<script>
  const box = document.querySelector("#box");
  let calls = 0;                                   // كام مرة نادينا requestPermission

  function render(state) {
    box.dataset.state = state;
    if (state === "granted") {
      box.innerHTML = '<span class="ok">✓ الإشعارات شغالة</span>';
    } else if (state === "denied") {
      box.innerHTML = '<span class="no">الإشعارات اتقفلت من إعدادات الموقع (القفل اللي جنب العنوان ← الإشعارات ← سماح).</span>';
    } else if (state === "unsupported") {
      box.textContent = "المتصفح ده (أو الصفحة دي) مبيدعمش الإشعارات.";
    } else {
      box.innerHTML = '<button id="ask">فعّل الإشعارات</button>';
      box.querySelector("#ask").addEventListener("click", ask);
    }
  }

  async function ask() {
    calls++;
    console.log("requestPermission اتنادت، مرة رقم", calls);
    const result = await Notification.requestPermission();
    render(result === "default" ? "prompt" : result);    // default = قفل السؤال من غير ما يختار
  }

  async function start() {
    // صفحة معزولة (زي الـ preview): الإشعارات ممنوعة فيها خالص
    if (!("Notification" in window) || location.origin === "null") return render("unsupported");
    const status = await navigator.permissions.query({ name: "notifications" });
    render(status.state);
    status.onchange = () => render(status.state);         // اليوزر غيّر الإذن والصفحة مفتوحة
  }
  start();
</script>
</body>
</html>
~~~

في الـ preview هتشوف «المتصفح ده (أو الصفحة دي) مبيدعمش الإشعارات»: الصفحة معزولة ([[origin]] بتاعها [["null"]])، والإشعارات ممنوعة من iframe من origin تاني أصلًا (MDN بيقول كده في «Using the Notifications API»)، وقسناها: [[Notification.permission]] جوه الـ preview بيرجّع [["denied"]] على طول. انسخها وشغّلها من [[http://localhost]].

**القياس:** شغّلنا Chrome لوحده (من غير Playwright، لأنه بيفرض حالة الإذن بتاعته) وغيّرنا الإذن من برا بـ DevTools Protocol ([[Browser.setPermission]])، وده نفس اللي بيحصل لما اليوزر يغيّره من القفل اللي جنب العنوان والصفحة مفتوحة:

~~~text الناتج (Chrome 158 headless، http://localhost:8831)
أول ما تفتح                    prompt | فعّل الإشعارات
السماح من الإعدادات (من غير refresh) granted | ✓ الإشعارات شغالة
المنع من الإعدادات             denied | الإشعارات اتقفلت من إعدادات الموقع (القفل اللي جنب العنوان ← الإشعارات ← سماح).
  في حالة denied: مفيش زرار
رجّعناه «اسأل»                 prompt | فعّل الإشعارات
requestPermission اتنادت: 0 مرة
~~~

وضغطة على الزرار في headless Chrome (بـ [[userGesture: true]]): [[requestPermission]] رجّعت [["denied"]] على طول وبقى [[Notification.permission]] = [["denied"]]، لأن headless مفيهوش شاشة للسؤال فبيرفض لوحده. في Chrome عادي السؤال بيظهر ويستنى اليوزر.

**ليه كده:**

- **[[navigator.permissions.query({ name: "notifications" })]]:** بترجّع [[PermissionStatus]] فيه [[state]] ([["prompt"]] أو [["granted"]] أو [["denied"]]). ده من غير ما تسأل اليوزر حاجة، فينفع أول ما الصفحة تفتح.
- **[[status.onchange]]:** بيتنادى لما الإذن يتغيّر والصفحة مفتوحة، فالشكل اتقلب ٣ مرات من غير refresh.
- **[[render]] بتبني الشكل كله من الحالة:** في [["denied"]] مفيش زرار أصلًا، فمستحيل [[requestPermission]] تتنادى (العدّاد فضل 0). نداها هناك مالوش فايدة: المتصفح بيرجّع [["denied"]] على طول من غير سؤال، والطريق الوحيد إن اليوزر يغيّرها بنفسه.
- **[[result === "default" ? "prompt" : result]]:** [[requestPermission]] بترجّع [["default"]] لو اليوزر قفل السؤال من غير ما يختار. ده نفس [["prompt"]] بأسامي الـ Permissions API، فبنرجّع الزرار.
- **[[requestPermission]] جوه [[click]] بس:** Firefox (من 72) و Safari مبيظهروش السؤال من غير ضغطة من اليوزر.

**الغلطة الشائعة:** تنادي [[requestPermission()]] أول ما الصفحة تفتح. اليوزر بيشوف سؤال من موقع لسه ميعرفوش فبيدوس «منع»، وده قرار مبيتغيّرش غير من الإعدادات. اسأل بعد ما اليوزر يعمل حاجة الإشعار يفيده فيها (زي «تابع الطلب»).` },
            { lvl: 'تحدي', t: R`محاكاة: «مؤقّت بومودورو» بيبعت إشعار بعد ٢٥ دقيقة (خليها ١٠ ثواني وانت بتجرّب)، بس **لو التاب مستخبي بس** ([[document.hidden]] من درس «visibilitychange و bfcache»)، ولو التاب قدامك يطلّع رسالة جوه الصفحة بدل الإشعار. والإشعار بـ [[tag: "pomodoro"]] عشان ميتكوّموش، والضغط عليه يرجّعك للتاب.`, done: R`وانت في التاب مفيش إشعار نظام وفيه رسالة في الصفحة، ولو بدّلت لتاب تاني بيظهر إشعار واحد، وتشغيل المؤقت مرتين ورا بعض بيسيب إشعار واحد بس في مركز الإشعارات (نفس الـ [[tag]] بيبدّل القديم)، والضغط عليه بيجيب التاب قدام.`, sol: R`~~~live 220 pomodoro.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بومودورو</title>
<style>
  body { font: 15px/1.5 system-ui, sans-serif; margin: 16px; }
  #left { font-size: 40px; font-variant-numeric: tabular-nums; }
  #inpage { background: #fef3c7; padding: 8px 12px; border-radius: 8px; }
  #inpage:empty { display: none; }
  button { font: inherit; padding: 6px 14px; }
</style>
</head>
<body>
<p id="left">0:10</p>
<button id="start">ابدأ (١٠ ثواني للتجربة)</button>
<p id="inpage" role="status"></p>
<script>
  const SECONDS = 10;                      // في الحقيقي: 25 * 60
  let timer = null;

  async function finish() {
    const text = "خلصت الجلسة، خد راحة ٥ دقايق";
    const canNotify = "Notification" in window && location.origin !== "null" && Notification.permission === "granted";
    if (document.hidden && canNotify) {
      const n = new Notification("بومودورو", { body: text, tag: "pomodoro" });   // نفس الـ tag = يبدّل القديم
      n.onclick = () => { window.focus(); n.close(); };
    } else {
      document.querySelector("#inpage").textContent = text;     // اليوزر قدام الصفحة (أو مفيش إذن)
    }
  }

  document.querySelector("#start").addEventListener("click", async () => {
    // الإذن من ضغطة اليوزر نفسها، قبل ما المؤقت يبدأ
    if ("Notification" in window && location.origin !== "null" && Notification.permission === "default") {
      await Notification.requestPermission();
    }
    clearInterval(timer);
    document.querySelector("#inpage").textContent = "";
    const end = Date.now() + SECONDS * 1000;
    const tick = () => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      document.querySelector("#left").textContent = $__bt0:$__{String(left).padStart(2, "0")}$__bt;
      if (left === 0) { clearInterval(timer); finish(); }
    };
    timer = setInterval(tick, 250);
    tick();
  });
</script>
</body>
</html>
~~~

في الـ preview الإشعارات ممنوعة (صفحة معزولة)، فالرسالة بتظهر جوه الصفحة دايمًا. التجربة الحقيقية من [[http://localhost]].

**القياس:** Chrome لوحده بـ DevTools Protocol: الإذن [["granted"]] بـ [[Browser.setPermission]]، و [[Notification]] ملفوفة بحيث تسجّل كل إشعار اتعمل بالـ [[tag]] بتاعه وكل [[show]]، والضغط على «ابدأ» بـ [[userGesture: true]]، و «التاب التاني» تاب حقيقي اتفتح واتفعّل:

~~~text الناتج (Chrome 158 headless، http://localhost:8831)
== التجربة ١: التاب قدامك
  إشعارات: [] | جوه الصفحة: خلصت الجلسة، خد راحة ٥ دقايق
== التجربة ٢: بدّلنا لتاب تاني
  hidden: true | إشعارات: ["pomodoro","show"] | جوه الصفحة: ""
== التجربة ٣: مرتين ورا بعض وهو مستخبي
  إشعارات: ["pomodoro","show","pomodoro","show","pomodoro","show"]
~~~

**ليه كده:**

- **[[document.hidden]] ساعة الخلصان:** القرار بيتاخد لحظة ما المؤقت يخلص مش لما يبدأ، لأن اليوزر ممكن يروح ويرجع في النص. قدامك = رسالة في الصفحة (التجربة ١، صفر إشعارات). مستخبي = إشعار نظام (التجربة ٢).
- **[[tag: "pomodoro"]]:** كل إشعار بنفس الـ tag **بيبدّل** اللي قبله بدل ما يتحط جنبه (ده سلوك الـ [[tag]] في مواصفات Notifications API و MDN). في التجربة ٣ اتعمل إشعارين جداد، بس في مركز الإشعارات بيفضل واحد. headless مفيهوش مركز إشعارات نشوفه، فالجزء ده من الوثائق مش من القياس.
- **[[n.onclick = () => { window.focus(); n.close(); }]]:** الضغط على الإشعار بيجيب التاب قدام ويقفل الإشعار. ده كمان محتاج شاشة حقيقية تضغط فيها، فجرّبه في Chrome عادي.
- **[[requestPermission]] جوه ضغطة «ابدأ» وقبل المؤقت:** بعد ١٠ ثواني (أو ٢٥ دقيقة) مفيش ضغطة من اليوزر، و Firefox و Safari مش هيظهروا السؤال. فبنسأل في اللحظة الوحيدة اللي فيها ضغطة.
- **[[Date.now() + SECONDS * 1000]] والعدّ من الوقت:** التاب المستخبي بيبطّأ الـ [[setInterval]]، فالعدّ بالـ ticks كان هيتأخر. هنا كل tick بيحسب الباقي من الساعة، والإشعار طلع في ميعاده وهو مستخبي.

**الغلطة الشائعة:** تبعت الإشعار في كل الحالات. اليوزر قاعد قدام الصفحة وشايف المؤقت، فإشعار نظام فوقها مزعج، وده أسرع طريق إنه يقفل الإشعارات للموقع كله.` },
          ],
          ref: [
            { t: "MDN: Using the Notifications API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API" },
            { t: "MDN: Notification.requestPermission()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static" },
            { t: "MDN: Permissions.query()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query" },
            { t: "MDN: PermissionStatus change event", url: "https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event" },
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

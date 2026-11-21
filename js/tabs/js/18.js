// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "async: الـ Promises و await",
      l: 2,
      n: "callbacks ثم Promises ثم async/await، و Promise.all وأخواتها، و fetch صح، و async جوه loops",
      pre: [
        { to: "js/higher-order functions", why: R`الـ callbacks اللي بتتبعت لـ [[then]] و [[setTimeout]] و [[map]] هي دوال بتاخد دوال` },
        { to: "js/try و catch و finally", why: R`[[await]] بيحوّل الـ Promise المرفوض لـ throw، وبيتمسك بنفس الـ try/catch` },
        { to: "js/custom errors و cause", why: R`المشاريع بترمي [[HttpError]] فيه [[status]] و [[cause]]` },
        { to: "js/الأخطاء العامة: unhandledrejection و uncaughtException", why: R`الـ Promise المرفوض اللي محدش مسكه بيقفل Node، ودي أشهر غلطة في الوحدة` },
      ],
      projects: [
        { lvl: 'صغير', t: R`retry بسيط`, what: R`[[retry(fn, { times = 3, delay = 200 } = {})]] بتنادي fn، ولو فشلت تستنى delay وتحاول تاني لحد times، وتطبع رقم كل محاولة. من دروس Promise و async و await.`, done: R`دالة بتفشل مرتين وتنجح التالتة ← retry بترجّع قيمتها بعد ٣ محاولات في حوالي 400ms. دالة بتفشل دايمًا ← بيترمي آخر error بعد [[times]] محاولات بالظبط. و [[times: 1]] ← محاولة واحدة ومفيش استنا.`, sol: R`## الشكل النهائي

~~~text الناتج: node main.js (Node 24؛ الأوقات متقرّبة لأقرب 100ms)
--- بتنجح في التالتة
  محاولة 1 من 3
  فشلت: السيرفر مشغول
  محاولة 2 من 3
  فشلت: السيرفر مشغول
  محاولة 3 من 3
النتيجة: البيانات وصلت بعد 400ms
--- بتفشل دايمًا
  محاولة 1 من 3
  فشلت: فشل رقم 1
  محاولة 2 من 3
  فشلت: فشل رقم 2
  محاولة 3 من 3
  فشلت: فشل رقم 3
اترمى: فشل رقم 3 | المحاولات: 3 | بعد 400ms
--- times: 1
  محاولة 1 من 1
  فشلت: مرة واحدة
اترمى: مرة واحدة | بعد 0ms
~~~

## هتشوف إيه

٣ حالات: دالة بتفشل مرتين وتنجح في التالتة، فـ [[retry]] رجّعت قيمتها بعد ٣ محاولات واستنايتين (حوالي 400ms). ودالة بتفشل دايمًا، فاترمى **آخر** error بعد ٣ محاولات بالظبط. و [[times: 1]]: محاولة واحدة ومفيش استنا خالص.

## الكود

~~~js retry.js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function retry(fn, { times = 3, delay = 200, log = console.log } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      log($__bt  محاولة $__{attempt} من $__{times}$__bt);
      return await fn(attempt);
    } catch (err) {
      lastError = err;
      log($__bt  فشلت: $__{err.message}$__bt);
      if (attempt < times) await wait(delay);
    }
  }
  throw lastError;
}
~~~

~~~js main.js
import { retry } from "./retry.js";

const start = Date.now();
const elapsed = () => Math.round((Date.now() - start) / 100) * 100 + "ms";

// بتفشل مرتين وتنجح التالتة
let calls = 0;
const flaky = async () => {
  calls++;
  if (calls < 3) throw new Error("السيرفر مشغول");
  return "البيانات وصلت";
};

console.log("--- بتنجح في التالتة");
console.log("النتيجة:", await retry(flaky), "بعد", elapsed());

console.log("--- بتفشل دايمًا");
const t1 = Date.now();
let attempts = 0;
try {
  await retry(async (n) => { attempts = n; throw new Error("فشل رقم " + n); });
} catch (err) {
  console.log("اترمى:", err.message, "| المحاولات:", attempts, "| بعد", Math.round((Date.now() - t1) / 100) * 100 + "ms");
}

console.log("--- times: 1");
const t2 = Date.now();
try {
  await retry(async () => { throw new Error("مرة واحدة"); }, { times: 1 });
} catch (err) {
  console.log("اترمى:", err.message, "| بعد", Math.round((Date.now() - t2) / 100) * 100 + "ms");
}
~~~

وجنبهم [[package.json]] فيه [[{ "type": "module" }]].

## كل حتة مهمة بتعمل إيه

- **[[{ times = 3, delay = 200, log = console.log } = {}]]:** options بـ defaults، و [[= {}]] في الآخر عشان [[retry(fn)]] من غير object متقعش. و [[log]] اختيارية عشان الاختبارات تقدر تسكّتها.
- **[[for (let attempt = 1; attempt <= times; attempt++)]]:** عدد المحاولات محدود، فمستحيل يلف للأبد.
- **[[return await fn(attempt)]] جوه الـ try:** لو نجحت بنرجع على طول ونخرج من الـ loop. والـ [[await]] هنا **لازم** (تحت).
- **[[lastError = err]]:** بنحفظ آخر error، ولو كل المحاولات فشلت بنرميه بعد الـ loop. اللي بينادي بيشوف السبب الحقيقي الأخير مش رسالة عامة.
- **[[if (attempt < times) await wait(delay)]]:** بنستنى **بين** المحاولات بس، مش بعد آخر واحدة. عشان كده ٣ محاولات = استنايتين = 400ms، و [[times: 1]] = صفر.
- **[[fn(attempt)]]:** بنعدّي رقم المحاولة للدالة، مفيد لو عايز تطبعه أو تغيّر حاجة في المحاولة الأخيرة.

## الغلطة اللي ممكن تقع فيها: [[return fn()]] من غير await

جرّبنا نفس الكود بس [[return fn(attempt);]] من غير [[await]]:

~~~js no-await-demo.js
import { retry } from "./retry-no-await.js";

let calls = 0;
try {
  console.log(await retry(async () => {
    calls++;
    throw new Error("السيرفر مشغول");
  }));
} catch (err) {
  console.log("اترمى:", err.message, "| المحاولات الحقيقية:", calls);
}
~~~

~~~text الناتج (node no-await-demo.js، مع retry-no-await.js = نفس retry.js من غير await)
  محاولة 1 من 3
اترمى: السيرفر مشغول | المحاولات الحقيقية: 1
~~~

محاولة واحدة بس، و «فشلت» عمرها ما اتطبعت. [[return fn()]] رجّع الـ Promise **قبل** ما يترفض، فالـ try خلص بنجاح والـ catch متنفّذش، والرفض طلع لبرّه على طول. الـ [[await]] هو اللي بيخلّي الرفض يحصل **جوه** الـ try.` },
        { lvl: 'صغير', dir: "countdown-await", t: R`عدّاد تنازلي بـ await`, what: R`صفحة فيها زرار «ابدأ» بيعد من 5 لـ 0 في عنصر بـ [[for]] و [[await wait(1000)]]، والزرار بيتقفل ([[disabled]]) لحد ما يخلص، وفي الآخر «يلا!». من درس async و await ووحدة الـ DOM.`, done: R`الأرقام بتتغير كل ثانية تقريبًا، والضغط على الزرار وهو شغال مبيبدأش عدّاد تاني، وبعد ما يخلص الزرار بيرجع يشتغل والعد بيبدأ من 5 تاني.`, sol: R`## الشكل النهائي

~~~live 240 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عدّاد تنازلي</title>
<style>
  body { font: 18px/1.5 system-ui, sans-serif; margin: 16px; text-align: center; }
  #count { font-size: 72px; font-weight: 700; margin: 16px 0; min-height: 1.2em; color: #1e3a8a; }
  #count.go { color: #15803d; }
  button { font: inherit; padding: 8px 28px; border-radius: 8px; border: 1px solid #1e3a8a; background: #1e3a8a; color: #fff; cursor: pointer; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
</head>
<body>
<div id="count" aria-live="polite">جاهز؟</div>
<button id="start">ابدأ</button>

<script>
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const countEl = document.querySelector("#count");
  const btn = document.querySelector("#start");

  async function countdown(from) {
    btn.disabled = true;
    countEl.classList.remove("go");
    try {
      for (let n = from; n >= 0; n--) {
        countEl.textContent = n;
        await wait(1000);
      }
      countEl.textContent = "يلا!";
      countEl.classList.add("go");
    } finally {
      btn.disabled = false;
    }
  }

  btn.addEventListener("click", () => countdown(5));
</script>
</body>
</html>
~~~

## هتشوف إيه

«جاهز؟» في النص. لما تدوس «ابدأ» الزرار بيتقفل (باهت ومبيستجيبش)، والرقم بيعد 5، 4، 3، 2، 1، 0، ثانية بين كل واحد، وفي الآخر «يلا!» باللون الأخضر والزرار بيرجع. وتدوس تاني يبدأ من 5.

## اتقاس في Chrome

قرينا الرقم كل 50ms وسجّلنا إمتى اتغيّر، وضغطنا على الزرار وهو شغال:

~~~text الناتج (Chrome headless؛ الأوقات متقرّبة لأقرب 100ms)
الزرار وهو شغال disabled = true
اللي ظهر: 5@500ms  4@1600ms  3@2500ms  2@3600ms  1@4600ms  0@5600ms  يلا!@6600ms
بعد ما خلص disabled = false
ضغطة تانية بعد ما خلص: 5
[chrome] 158
~~~

## كل حتة مهمة بتعمل إيه

- **[[const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))]]:** Promise بيخلص بعد ms، فـ [[await wait(1000)]] = «استنى ثانية» من غير ما الصفحة تتجمّد.
- **[[for (let n = from; n >= 0; n--)]] و [[await]] جواه:** loop عادي بيعد لتحت، والـ [[await]] بيوقّف الـ loop ثانية في كل لفة. ده أوضح بكتير من [[setInterval]] وعدّاد وشرط إيقاف.
- **[[btn.disabled = true]] في الأول:** الزرار المقفول مبيبعتش click، فمستحيل يبدأ عدّادين فوق بعض. ضغطتنا عند 1.5 ثانية معملتش حاجة.
- **[[finally { btn.disabled = false; }]]:** الزرار بيرجع حتى لو حصل أي error في النص.
- **[[aria-live="polite"]]:** قارئ الشاشة بيقرا الرقم الجديد كل ما يتغيّر.
- **[[classList.add("go")]]:** اللون الأخضر لـ «يلا!»، و [[remove]] في أول كل عدّ عشان يرجع أزرق.

## الغلطة الشائعة

[[for (...) { setTimeout(() => countEl.textContent = n, 1000); }]] من غير await: الـ ٦ timers بيتسجّلوا في نفس اللحظة وكلهم بيشتغلوا بعد ثانية واحدة، فتشوف «0» على طول. الـ [[await]] جوه الـ loop هو اللي بيخلّي كل لفة تستنى اللي قبلها.` },
        { lvl: 'متوسط', dir: "github-profile", t: R`بروفايل GitHub`, what: R`input لاسم يوزر وزرار، بيجيب [[https://api.github.com/users/NAME]] و [[https://api.github.com/users/NAME/repos]] بـ [[Promise.all]]، ويعرض الاسم والصورة وأعلى ٥ repos بالنجوم، مع «بيحمّل...»، و 404 بتطلع «اليوزر مش موجود»، وأي error تاني رسالة عامة، والضغط مرة تانية بيلغي الطلب القديم بـ AbortController. من دروس الوحدة ووحدة الـ DOM.`, done: R`يوزر موجود ← طلبين بيبدأوا مع بعض في Network. يوزر مش موجود ← «اليوزر مش موجود» مش صفحة فاضية. ضغطتين ورا بعض ← طلبات الأولى canceled والنتيجة بتاعة التانية. والنت مقطوع (Offline في DevTools) ← رسالة مفهومة.`, sol: R`## الشكل النهائي

الـ preview ده بيكلّم GitHub API الحقيقي ([[api.github.com]]، بيسمح للصفحات من أي مكان). اكتب أي اسم يوزر ودوس «هات». GitHub بيسمح بـ ٦٠ طلب في الساعة من غير تسجيل دخول، وكل بحث = طلبين.

~~~live 460 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بروفايل GitHub</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  form { display: flex; gap: 8px; }
  input { flex: 1; font: inherit; padding: 6px 8px; direction: ltr; }
  button { font: inherit; padding: 6px 16px; }
  .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  #status { min-height: 1.6em; color: #555; }
  #status.error { color: #b91c1c; }
  .card { display: flex; gap: 12px; align-items: center; }
  .card img { width: 72px; height: 72px; border-radius: 50%; }
  .card h2 { margin: 0; font-size: 20px; }
  ol { padding-inline-start: 24px; }
  ol a { direction: ltr; unicode-bidi: isolate; }
</style>
</head>
<body>
<form id="search">
  <label for="user" class="visually-hidden">اسم اليوزر</label>
  <input id="user" value="octocat" autocomplete="off" spellcheck="false">
  <button>هات</button>
</form>
<p id="status" role="status"></p>
<div id="profile"></div>

<script>
  const API = "https://api.github.com/users/";
  const statusEl = document.querySelector("#status");
  const profileEl = document.querySelector("#profile");
  let controller;

  class HttpError extends Error {
    constructor(status) {
      super("HTTP " + status);
      this.name = "HttpError";
      this.status = status;
    }
  }

  async function getJSON(url, signal) {
    const res = await fetch(url, { signal });
    if (!res.ok) throw new HttpError(res.status);
    return res.json();
  }

  function setStatus(text, isError = false) {
    statusEl.textContent = text;
    statusEl.className = isError ? "error" : "";
  }

  function render(user, repos) {
    const top = repos.toSorted((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
    profileEl.replaceChildren();
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = user.avatar_url;
    img.alt = "صورة " + (user.name ?? user.login);
    const info = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = user.name ?? user.login;
    const meta = document.createElement("div");
    meta.textContent = user.public_repos + " repo · " + user.followers + " متابع";
    info.append(h2, meta);
    card.append(img, info);
    const list = document.createElement("ol");
    for (const r of top) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = r.html_url;
      a.textContent = r.name;
      li.append(a, " ★ " + r.stargazers_count);
      list.append(li);
    }
    profileEl.append(card, top.length ? list : "مفيش repos");
  }

  async function load(name) {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;
    setStatus("بيحمّل...");
    profileEl.replaceChildren();
    try {
      const [user, repos] = await Promise.all([
        getJSON(API + encodeURIComponent(name), signal),
        getJSON(API + encodeURIComponent(name) + "/repos?per_page=100", signal),
      ]);
      render(user, repos);
      setStatus("");
    } catch (err) {
      if (err.name === "AbortError") return;
      if (err.status === 404) setStatus("اليوزر مش موجود", true);
      else if (err.status === 403) setStatus("GitHub قفل الطلبات شوية (الحد 60 في الساعة)، جرّب بعدين", true);
      else if (err instanceof TypeError) setStatus("مش قادر أوصل لـ GitHub، اتأكد من النت", true);
      else setStatus("حصلت مشكلة، جرّب تاني", true);
    }
  }

  document.querySelector("#search").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#user").value.trim();
    if (name) load(name);
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

صورة اليوزر واسمه وعدد الـ repos والمتابعين، وتحتهم أعلى ٥ repos بالنجوم. وقت التحميل «بيحمّل...». يوزر مش موجود: «اليوزر مش موجود» بالأحمر. من غير نت: رسالة إن مفيش وصول. ولو دوست مرتين ورا بعض، الطلب القديم بيتلغي والنتيجة بتاعة الأخير.

## اتقاس في Chrome (على GitHub الحقيقي، ٢١ نوفمبر ٢٠٢٦)

سجّلنا كل طلب لـ GitHub ووقت بدايته من أول ما الصفحة فتحت: يوزر موجود ([[octocat]]، حساب GitHub الرسمي للأمثلة)، ويوزر مش موجود، وضغطتين ورا بعض ([[nodejs]] ثم [[github]])، وبعدين Offline:

~~~text الناتج (Chrome headless؛ الأوقات والنجوم بتتغيّر)
  662ms [بدأ] /users/octocat
  663ms [بدأ] /users/octocat/repos?per_page=100
--- octocat: status=«» name=«The Octocat» repos=5
    1. Spoon-Knife ★ 14225
    2. Hello-World ★ 4033
    3. octocat.github.io ★ 1211
    4. hello-worId ★ 839
    5. linguist ★ 782
 1545ms [بدأ] /users/no-such-user-zz-404-qq
 1545ms [بدأ] /users/no-such-user-zz-404-qq/repos?per_page=100
[console] Failed to load resource: the server responded with a status of 404 ()
[console] Failed to load resource: the server responded with a status of 404 ()
--- يوزر مش موجود: status=«اليوزر مش موجود» name=«» repos=0
 1776ms [بدأ] /users/nodejs
 1776ms [بدأ] /users/nodejs/repos?per_page=100
 1777ms [اتلغى] /users/no-such-user-zz-404-qq net::ERR_ABORTED
 1777ms [اتلغى] /users/no-such-user-zz-404-qq/repos?per_page=100 net::ERR_ABORTED
 1797ms [بدأ] /users/github
 1797ms [بدأ] /users/github/repos?per_page=100
 1797ms [اتلغى] /users/nodejs net::ERR_ABORTED
 1797ms [اتلغى] /users/nodejs/repos?per_page=100 net::ERR_ABORTED
--- ضغطتين: الاسم اللي ظاهر = GitHub
 2711ms [بدأ] /users/microsoft
 2711ms [بدأ] /users/microsoft/repos?per_page=100
 2712ms [اتلغى] /users/microsoft net::ERR_INTERNET_DISCONNECTED
[console] Failed to load resource: net::ERR_INTERNET_DISCONNECTED
 2713ms [اتلغى] /users/microsoft/repos?per_page=100 net::ERR_INTERNET_DISCONNECTED
[console] Failed to load resource: net::ERR_INTERNET_DISCONNECTED
--- Offline: status = مش قادر أوصل لـ GitHub، اتأكد من النت
[chrome] 158
~~~

- **الطلبين بيبدأوا في نفس الملي ثانية:** [[Promise.all]] بيبدأهم مع بعض، فالوقت = أبطأ واحد مش مجموعهم.
- **[[ERR_ABORTED]]:** ده اللي DevTools بيكتبه [[(canceled)]]: طلبين [[nodejs]] اتلغوا أول ما الضغطة التانية جت، والاسم اللي ظهر [[GitHub]].
- **[[ERR_INTERNET_DISCONNECTED]]:** Offline، فـ fetch رمى [[TypeError]] والرسالة ظهرت.

## كل حتة مهمة بتعمل إيه

- **[[getJSON(url, signal)]]:** بتعمل fetch بالـ signal، وترمي [[HttpError]] فيه [[status]] لو [[!res.ok]]. من غير الفحص ده، الـ 404 كان هيرجع JSON فيه [[message: "Not Found"]] والصفحة هتحاول ترسمه كيوزر.
- **[[controller?.abort()]] ثم [[new AbortController()]]:** كل بحث بيلغي اللي قبله وبيعمل controller جديد، والـ signal نفسه بيتبعت للطلبين، فـ [[abort]] واحدة بتلغي الاتنين.
- **[[Promise.all([user, repos])]]:** لو واحد فشل (404 مثلًا) الكل بيترفض على طول، وده اللي عايزينه: مفيش معنى نعرض repos من غير يوزر.
- **ترتيب الـ catch:** [[AbortError]] الأول ومبيظهرش (اليوزر هو اللي طلب حاجة أحدث)، وبعدين 404، وبعدين 403 (GitHub قفل الطلبات بعد الـ ٦٠)، وبعدين [[TypeError]] (مفيش نت)، وأي حاجة تانية رسالة عامة.
- **[[repos?per_page=100]] و [[toSorted]]:** GitHub بيرجّع ٣٠ repo بس بشكل افتراضي، مش مترتبين بالنجوم. فبنطلب ١٠٠ ونرتّب احنا بـ [[toSorted]] (نسخة مترتبة من غير ما نغيّر الأصل) وناخد أول ٥.
- **[[textContent]] و [[createElement]]:** كل اللي جاي من الـ API بيتكتب كنص، فلو اسم repo فيه [[<script>]] هيبان حروف ومش هيتنفّذ.
- **[[encodeURIComponent(name)]]:** لو حد كتب [[/]] أو [[?]] في الاسم، مش هيغيّر شكل الـ URL.

## الغلطات اللي حصلت وأنا بقيس

- **الضغطتين على نفس اليوزر مبيّنتش الإلغاء:** أول تجربة ضغطت [[octocat]] مرتين، وملقتش ولا طلب اتلغى. السبب: GitHub بيبعت [[cache-control: max-age=60]]، فالطلب التاني اتجاب من كاش المتصفح فورًا قبل ما يلحق يتلغي. لما جرّبت يوزرين مختلفين ظهر الـ [[ERR_ABORTED]].
- **Offline رجّع داتا!** أول مرة جرّبت Offline بنفس اليوزر اللي لسه جايبه، والصفحة عرضته عادي من الكاش. جرّبت يوزر جديد ([[microsoft]]) فظهرت رسالة النت. يعني عشان تجرّب Offline صح، استخدم حاجة مطلبتهاش قبل كده، أو علّم «Disable cache» في DevTools.` },
        { lvl: 'متوسط', dir: "product-search", t: R`بحث بيلغي القديم`, what: R`input بحث على API منتجات (زي [[https://dummyjson.com/products/search?q=]] أو أي API عندك)، كل حرف بيلغي الطلب اللي قبله بـ AbortController، والنتايج بتتعرض في لستة مع «بيحمّل...» و «مفيش نتايج». من دروس fetch و AbortController و async و await.`, done: R`كتابة [[phone]] بسرعة ← في Network الطلبات القديمة canceled، والنتيجة اللي ظاهرة دايمًا بتاعة آخر نص. الـ AbortError مبيظهرش كرسالة غلط. والـ input الفاضي بيمسح النتايج من غير request.`, sol: R`## الشكل النهائي

الـ preview ده بيكلّم API منتجات تجريبي حقيقي ([[dummyjson.com]]، مجاني ومن غير تسجيل). اكتب [[phone]] أو [[laptop]]:

~~~live 420 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بحث المنتجات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 480px; }
  input { font: inherit; width: 100%; box-sizing: border-box; padding: 8px; }
  #status { min-height: 1.6em; color: #555; }
  #status.error { color: #b91c1c; }
  ul { padding: 0; list-style: none; }
  li { display: flex; justify-content: space-between; border-bottom: 1px solid #ddd; padding: 6px 0; }
  li span:first-child { direction: ltr; unicode-bidi: isolate; }
</style>
</head>
<body>
<label for="q">دوّر على منتج (بالإنجليزي، زي phone)</label>
<input id="q" type="search" autocomplete="off">
<p id="status" role="status"></p>
<ul id="results"></ul>

<script>
  const input = document.querySelector("#q");
  const statusEl = document.querySelector("#status");
  const list = document.querySelector("#results");
  let controller;

  function setStatus(text, isError = false) {
    statusEl.textContent = text;
    statusEl.className = isError ? "error" : "";
  }

  function row(p) {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = p.title;
    const price = document.createElement("span");
    price.textContent = p.price + " دولار";
    li.append(name, price);
    return li;
  }

  async function search(q) {
    controller?.abort();
    if (!q) {
      list.replaceChildren();
      setStatus("");
      return;
    }
    controller = new AbortController();
    setStatus("بيحمّل...");
    try {
      const url = "https://dummyjson.com/products/search?limit=8&select=title,price&q=" + encodeURIComponent(q);
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const { products, total } = await res.json();
      list.replaceChildren(...products.map(row));
      setStatus(products.length ? "لقينا " + total + " (أول " + products.length + ")" : "مفيش نتايج لـ «" + q + "»");
    } catch (err) {
      if (err.name === "AbortError") return;
      list.replaceChildren();
      setStatus("حصلت مشكلة في البحث، جرّب تاني", true);
    }
  }

  input.addEventListener("input", () => search(input.value.trim()));
</script>
</body>
</html>
~~~

## هتشوف إيه

وانت بتكتب، كل حرف بيبعت طلب ويلغي اللي قبله، فالنتيجة اللي بتظهر دايمًا بتاعة آخر نص. «بيحمّل...» وقت الطلب، و «مفيش نتايج لـ «...»» لو الكلمة ملهاش منتجات، والـ input الفاضي بيمسح كل حاجة من غير طلب.

## اتقاس في Chrome (على dummyjson الحقيقي، ٢١ نوفمبر ٢٠٢٦)

كتبنا [[phone]] حرف حرف (30ms بين كل حرف)، وبعدين كلمة ملهاش نتايج، وبعدين مسحنا:

~~~text الناتج (Chrome headless؛ الأوقات بتتغيّر)
   93ms [بدأ] q=p
  133ms [بدأ] q=ph
  180ms [بدأ] q=pho
  226ms [بدأ] q=phon
  258ms [بدأ] q=phone
  366ms [canceled] q=p net::ERR_ABORTED
  366ms [canceled] q=ph net::ERR_ABORTED
  366ms [canceled] q=pho net::ERR_ABORTED
  366ms [canceled] q=phon net::ERR_ABORTED
 1271ms [خلص] q=phone
--- status: لقينا 23 (أول 8)
    Apple AirPods Max Silver — 549.99 دولار
    Apple iPhone Charger — 19.99 دولار
    Apple MagSafe Battery Pack — 99.99 دولار
    Beats Flex Wireless Earphones — 49.99 دولار
    iPhone 12 Silicone Case with MagSafe Plum — 29.99 دولار
    Selfie Lamp with iPhone — 14.99 دولار
    Selfie Stick Monopod — 12.99 دولار
    iPhone 5s — 199.99 دولار
 1609ms [بدأ] q=zzzzqq
 1705ms [خلص] q=zzzzqq
--- zzzzqq: مفيش نتايج لـ «zzzzqq»
--- فاضي: status=«» li=0 طلبات جديدة=0
[chrome] 158
~~~

- ٥ طلبات بدأت ([[p]] و [[ph]] و [[pho]] و [[phon]] و [[phone]])، و ٤ منهم [[canceled]] ([[ERR_ABORTED]])، وواحد بس خلص: [[phone]].
- الـ AbortError مظهرش كرسالة غلط: الـ status فضل «بيحمّل...» لحد ما نتيجة [[phone]] وصلت.
- المسح: [[طلبات جديدة=0]].
- البحث بيدوّر في الوصف كمان، عشان كده ظهرت سماعات مع إنها مش «phone» في الاسم.

## كل حتة مهمة بتعمل إيه

- **[[controller?.abort()]] أول سطر في [[search]]:** حتى قبل فحص النص الفاضي، فلو مسحت والطلب القديم لسه راجع، مش هيكتب نتايج قديمة فوق الشاشة الفاضية.
- **[[if (!q) { ...; return; }]]:** النص الفاضي مبيبعتش طلب.
- **[[encodeURIComponent(q)]]:** لو كتبت [[&]] أو مسافة، الـ URL ميبوظش.
- **[[if (err.name === "AbortError") return;]]:** الطلب اللي اتلغى مش غلط، فمبنكتبش ولا رسالة ولا بنمسح النتايج.
- **[[list.replaceChildren(...products.map(row))]]:** بتشيل القديم وتحط الجديد في خطوة واحدة.
- **[[row(p)]] بـ [[textContent]]:** أسامي المنتجات جاية من برّه، فبتتكتب كنص مش HTML.

## الغلطة الشائعة

تحط [[controller = new AbortController()]] **قبل** [[controller?.abort()]]: كده بتلغي الجديد اللي لسه عامله، وكل طلب بيتلغي قبل ما يبدأ. والغلطة التانية: تكتب النتيجة من غير ما تلغي القديم، فطلب [[p]] (اللي رجع متأخر لأنه نتايجه أكتر) يكتب فوق نتيجة [[phone]].` },
        { lvl: 'كبير', t: R`downloader بحد أقصى ومحاولات`, what: R`سكربت Node بياخد لستة URLs من ملف JSON، ويجيبهم بـ [[pool]] (٣ في نفس الوقت بالكتير)، ولكل طلب [[AbortSignal.timeout]]، و retry مرتين لو الشبكة فشلت أو 5xx بس (مش 4xx). كل نتيجة [[{ url, ok, status, ms, error }]]، وفي الآخر جدول بـ [[console.table]] وكود خروج ١ لو فيه فشل. وكل خطوة بتتكتب في لوج بالوقت، والأخطاء [[HttpError]] بـ status و cause. من الوحدة دي ووحدة الأخطاء.`, done: R`لستة فيها URL سليم و 404 ودومين مش موجود وواحد أبطأ من الـ timeout: الجدول بيقول ١ نجح و ٣ فشلوا وسبب كل واحد، والـ 404 اتجرب مرة واحدة بس، والدومين الغلط ٣ مرات. عدّاد [[active]] مبيعدّيش ٣. ملف JSON بايظ أو لستة فاضية ← رسالة واضحة وكود ١. والتشغيل مرتين بيدّي نفس الجدول.`, ext: R`خلّي الـ retry يستنى أكتر كل مرة (exponential backoff)، واحفظ الـ responses في ملفات، ولو التشغيل اتقطع في النص يكمّل من اللي فاضل بس.`, sol: R`## الشكل النهائي

سيرفر التجارب شغال على port 3200، والـ downloader اتشغّل مرتين ورا بعض، وبعدين على ملف JSON بايظ ولستة فاضية:

~~~text الناتج: bash demo.sh (Node 24 على ويندوز)
=== تشغيل 1
┌─────────┬─────────────────────────────────┬───────┬────────┬──────────┬────────────────────────────┐
│ (index) │ url                             │ ok    │ status │ attempts │ error                      │
├─────────┼─────────────────────────────────┼───────┼────────┼──────────┼────────────────────────────┤
│ 0       │ 'http://127.0.0.1:3200/ok'      │ true  │ 200    │ 1        │ ''                         │
│ 1       │ 'http://127.0.0.1:3200/missing' │ false │ 404    │ 1        │ 'HTTP 404'                 │
│ 2       │ 'http://no-such-host.invalid/'  │ false │ null   │ 3        │ 'fetch failed (ENOTFOUND)' │
│ 3       │ 'http://127.0.0.1:3200/slow'    │ false │ null   │ 3        │ 'timeout'                  │
│ 4       │ 'http://127.0.0.1:3200/flaky'   │ true  │ 200    │ 2        │ ''                         │
└─────────┴─────────────────────────────────┴───────┴────────┴──────────┴────────────────────────────┘
2 نجح و 3 فشل | أكبر عدد طلبات مع بعض: 3
(exit 1)
=== تشغيل 2
┌─────────┬─────────────────────────────────┬───────┬────────┬──────────┬────────────────────────────┐
│ (index) │ url                             │ ok    │ status │ attempts │ error                      │
├─────────┼─────────────────────────────────┼───────┼────────┼──────────┼────────────────────────────┤
│ 0       │ 'http://127.0.0.1:3200/ok'      │ true  │ 200    │ 1        │ ''                         │
│ 1       │ 'http://127.0.0.1:3200/missing' │ false │ 404    │ 1        │ 'HTTP 404'                 │
│ 2       │ 'http://no-such-host.invalid/'  │ false │ null   │ 3        │ 'fetch failed (ENOTFOUND)' │
│ 3       │ 'http://127.0.0.1:3200/slow'    │ false │ null   │ 3        │ 'timeout'                  │
│ 4       │ 'http://127.0.0.1:3200/flaky'   │ true  │ 200    │ 2        │ ''                         │
└─────────┴─────────────────────────────────┴───────┴────────┴──────────┴────────────────────────────┘
2 نجح و 3 فشل | أكبر عدد طلبات مع بعض: 3
(exit 1)
=== JSON بايظ ولستة فاضية
✗ broken.json مش JSON سليم (Unexpected end of JSON input)
(exit 1)
✗ empty.json لازم يبقى array فيها URL واحد على الأقل
(exit 1)
=== أول ١٤ سطر في download.log (الوقت اتشال)
بدأ: 5 URL
http://127.0.0.1:3200/ok محاولة 1
http://127.0.0.1:3200/missing محاولة 1
http://no-such-host.invalid/ محاولة 1
http://127.0.0.1:3200/ok نجح 200
http://127.0.0.1:3200/slow محاولة 1
http://127.0.0.1:3200/missing فشل: HTTP 404
http://127.0.0.1:3200/flaky محاولة 1
http://127.0.0.1:3200/flaky فشل: HTTP 500، هنجرّب تاني
http://no-such-host.invalid/ فشل: fetch failed (ENOTFOUND)، هنجرّب تاني
http://127.0.0.1:3200/flaky محاولة 2
http://127.0.0.1:3200/flaky نجح 200
http://no-such-host.invalid/ محاولة 2
http://no-such-host.invalid/ فشل: fetch failed (ENOTFOUND)، هنجرّب تاني
~~~

~~~text الناتج: node --test test.js (الأوقات اتشالت لأنها بتتغيّر)
✔ لستة فيها سليم و 404 وشبكة واقعة وبطيء و flaky
✔ عدّاد active مبيعدّيش 3 حتى مع 10 URLs
✔ التشغيل مرتين بيدّي نفس الجدول
✔ isRetryable: 5xx والشبكة والمهلة أيوه، 4xx لأ
✔ readUrls: ملف بايظ أو فاضي أو فيه حاجة مش URL = InputError
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
~~~

## هتشوف إيه

٥ URLs: واحد سليم، و 404، ودومين مش موجود، وواحد أبطأ من المهلة، وواحد بيفشل بـ 500 مرة وينجح التانية. الجدول بيقول مين نجح ومين فشل وليه وكام محاولة: الـ 404 **مرة واحدة** (غلط في الطلب نفسه، التكرار مش هيفيد)، والدومين والبطيء **٣ مرات** (الأصلية + ٢ retry)، والـ flaky نجح في التانية. أكبر عدد طلبات مع بعض ٣، والتشغيل التاني طلّع نفس الجدول، وكود الخروج ١ لأن فيه فشل. والـ JSON البايظ واللستة الفاضية سطر واحد مفهوم وكود ١.

## شجرة الملفات وترتيب البناء

~~~text
downloader/
  package.json        { "type": "module" }
  urls.json           اللستة اللي هتتجاب
  download.js         readUrls و downloadAll، والتشغيل من الترمنال
  lib/
    errors.js         HttpError (status و cause) و InputError
    fetch-one.js      طلب واحد بـ timeout و retry
    pool.js           ٣ طلبات مع بعض بالكتير
    log.js            لوج بالوقت في download.log
  test-server.js      سيرفر تجارب محلي
  test.js             ٥ اختبارات بـ node --test
  demo.sh             التشغيل اللي فوق
~~~

اتبنى بالترتيب ده: [[fetchOne]] على URL واحد سليم، وبعدين الـ timeout، وبعدين الـ retry وقاعدة «4xx لأ»، وبعدين [[pool]] وعدّاد [[active]]، وبعدين [[readUrls]] وأخطاء الملف، وفي الآخر الجدول وكود الخروج واللوج، والاختبارات مع كل خطوة على السيرفر المحلي.

## الكود

~~~js lib/errors.js
export class HttpError extends Error {
  constructor(status, url, options) {
    super($__btHTTP $__{status}$__bt, options);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

export class InputError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "InputError";
  }
}
~~~

~~~js lib/fetch-one.js
import { HttpError } from "./errors.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// الشبكة وقعت، أو المهلة خلصت، أو السيرفر عنده مشكلة (5xx): يستاهل نجرّب تاني.
// 4xx معناها الطلب نفسه غلط، فالمحاولة التانية هتفشل بنفس الشكل.
export function isRetryable(err) {
  if (err instanceof HttpError) return err.status >= 500;
  return err.name === "TypeError" || err.name === "TimeoutError";
}

function describe(err) {
  if (err instanceof HttpError) return err.message;
  if (err.name === "TimeoutError") return "timeout";
  const code = err.cause?.code ?? err.cause?.name;
  return code ? $__bt$__{err.message} ($__{code})$__bt : err.message;
}

export async function fetchOne(url, { timeout = 1000, retries = 2, retryDelay = 100, log = () => {} } = {}) {
  const start = performance.now();
  let attempts = 0;
  let status = null;
  while (true) {
    attempts++;
    try {
      log($__bt$__{url} محاولة $__{attempts}$__bt);
      const res = await fetch(url, { signal: AbortSignal.timeout(timeout) });
      status = res.status;
      await res.arrayBuffer(); // نقرا الـ body لآخره عشان الاتصال يتقفل ويتعاد استخدامه
      if (!res.ok) throw new HttpError(res.status, url);
      log($__bt$__{url} نجح $__{res.status}$__bt);
      return { url, ok: true, status, attempts, ms: Math.round(performance.now() - start), error: "" };
    } catch (err) {
      const reason = describe(err);
      const again = isRetryable(err) && attempts <= retries;
      log($__bt$__{url} فشل: $__{reason}$__{again ? "، هنجرّب تاني" : ""}$__bt);
      if (!again) {
        return { url, ok: false, status, attempts, ms: Math.round(performance.now() - start), error: reason };
      }
      await wait(retryDelay);
    }
  }
}
~~~

~~~js lib/pool.js
// limit عمال بيلفوا على الطابور؛ النتايج بنفس ترتيب items
export async function pool(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
~~~

~~~js lib/log.js
import { appendFileSync } from "node:fs";

// كل سطر: الوقت بالـ ISO، وبعدين الرسالة. بيتزوّد على الملف ومبيمسحش القديم
export function createLog(file) {
  return (message) => {
    const line = new Date().toISOString() + " " + message;
    if (file) appendFileSync(file, line + "\n");
    return line;
  };
}
~~~

~~~js download.js
import { readFile } from "node:fs/promises";
import { pool } from "./lib/pool.js";
import { fetchOne } from "./lib/fetch-one.js";
import { createLog } from "./lib/log.js";
import { InputError } from "./lib/errors.js";

export async function readUrls(file) {
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch (err) {
    throw new InputError($__btمش قادر أقرا $__{file}$__bt, { cause: err });
  }
  let urls;
  try {
    urls = JSON.parse(text);
  } catch (err) {
    throw new InputError($__bt$__{file} مش JSON سليم$__bt, { cause: err });
  }
  if (!Array.isArray(urls) || urls.length === 0) throw new InputError($__bt$__{file} لازم يبقى array فيها URL واحد على الأقل$__bt);
  for (const u of urls) {
    if (typeof u !== "string" || !URL.canParse(u)) throw new InputError($__btمش URL: $__{JSON.stringify(u)}$__bt);
  }
  return urls;
}

export async function downloadAll(urls, { limit = 3, timeout = 1000, retries = 2, log = () => {} } = {}) {
  let active = 0;
  let maxActive = 0;
  const results = await pool(urls, limit, async (url) => {
    active++;
    maxActive = Math.max(maxActive, active);
    try {
      return await fetchOne(url, { timeout, retries, log });
    } finally {
      active--;
    }
  });
  return { results, maxActive };
}

// التشغيل من الترمنال: node download.js urls.json
if (import.meta.main) {
  const log = createLog(new URL("./download.log", import.meta.url));
  try {
    const urls = await readUrls(process.argv[2] ?? "urls.json");
    log($__btبدأ: $__{urls.length} URL$__bt);
    const { results, maxActive } = await downloadAll(urls, { log });
    const failed = results.filter((r) => !r.ok).length;
    console.table(results.map(({ url, ok, status, attempts, error }) => ({ url, ok, status, attempts, error })));
    console.log($__bt$__{results.length - failed} نجح و $__{failed} فشل | أكبر عدد طلبات مع بعض: $__{maxActive}$__bt);
    log($__btخلص: $__{results.length - failed} نجح و $__{failed} فشل$__bt);
    if (failed) process.exitCode = 1;
  } catch (err) {
    if (!(err instanceof InputError)) throw err;
    console.error("✗ " + err.message + (err.cause ? " (" + err.cause.message + ")" : ""));
    log("وقف: " + err.message);
    process.exitCode = 1;
  }
}
~~~

~~~json urls.json
[
  "http://127.0.0.1:3200/ok",
  "http://127.0.0.1:3200/missing",
  "http://no-such-host.invalid/",
  "http://127.0.0.1:3200/slow",
  "http://127.0.0.1:3200/flaky"
]
~~~

~~~js test-server.js
import http from "node:http";

// سيرفر تجارب: /ok و /missing (404) و /slow (أبطأ من المهلة) و /flaky (500 مرة و 200 مرة بالتبادل)
export function startTestServer(port = 0) {
  let flakyCalls = 0;
  const server = http.createServer((req, res) => {
    const send = (status, body) => {
      res.writeHead(status, { "content-type": "text/plain; charset=utf-8" });
      res.end(body);
    };
    if (req.url === "/ok") return send(200, "تمام");
    if (req.url === "/slow") return setTimeout(() => send(200, "متأخر"), 3000);
    if (req.url === "/flaky") return ++flakyCalls % 2 === 1 ? send(500, "وقعت") : send(200, "رجعت");
    send(404, "مش موجود");
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

if (import.meta.main) {
  const server = await startTestServer(3200);
  console.log("سيرفر التجارب على http://127.0.0.1:" + server.address().port);
}
~~~

~~~js test.js
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { startTestServer } from "./test-server.js";
import { downloadAll, readUrls } from "./download.js";
import { isRetryable } from "./lib/fetch-one.js";
import { HttpError, InputError } from "./lib/errors.js";

let server, base;
before(async () => {
  server = await startTestServer(0);
  base = "http://127.0.0.1:" + server.address().port;
});
after(() => {
  server.closeAllConnections();
  server.close();
});

const summary = (results) => results.map((r) => [r.url.replace(base, ""), r.ok, r.status, r.attempts, r.error]);

test("لستة فيها سليم و 404 وشبكة واقعة وبطيء و flaky", async () => {
  const urls = ["/ok", "/missing", "/slow", "/flaky"].map((p) => base + p);
  urls.splice(2, 0, "http://127.0.0.1:59999/"); // port مفيش حد سامع عليه = الشبكة فشلت
  const { results, maxActive } = await downloadAll(urls, { timeout: 500, retries: 2 });
  assert.deepEqual(summary(results), [
    ["/ok", true, 200, 1, ""],
    ["/missing", false, 404, 1, "HTTP 404"],
    ["http://127.0.0.1:59999/", false, null, 3, "fetch failed (ECONNREFUSED)"],
    ["/slow", false, null, 3, "timeout"],
    ["/flaky", true, 200, 2, ""],
  ]);
  assert.ok(maxActive <= 3, "active عدّى 3: " + maxActive);
});

test("عدّاد active مبيعدّيش 3 حتى مع 10 URLs", async () => {
  const urls = Array.from({ length: 10 }, () => base + "/ok");
  const { maxActive, results } = await downloadAll(urls);
  assert.equal(maxActive, 3);
  assert.ok(results.every((r) => r.ok));
});

test("التشغيل مرتين بيدّي نفس الجدول", async () => {
  const urls = [base + "/ok", base + "/missing", base + "/flaky"];
  const a = summary((await downloadAll(urls)).results);
  const b = summary((await downloadAll(urls)).results);
  assert.deepEqual(a, b);
});

test("isRetryable: 5xx والشبكة والمهلة أيوه، 4xx لأ", () => {
  assert.equal(isRetryable(new HttpError(503, "x")), true);
  assert.equal(isRetryable(new HttpError(404, "x")), false);
  assert.equal(isRetryable(new TypeError("fetch failed")), true);
  assert.equal(isRetryable(Object.assign(new Error("t"), { name: "TimeoutError" })), true);
});

test("readUrls: ملف بايظ أو فاضي أو فيه حاجة مش URL = InputError", async () => {
  const dir = mkdtempSync(join(tmpdir(), "urls-"));
  const cases = { "bad.json": "[", "empty.json": "[]", "obj.json": "{}", "num.json": "[1]", "words.json": '["مش لينك"]' };
  for (const [name, text] of Object.entries(cases)) {
    writeFileSync(join(dir, name), text);
    await assert.rejects(readUrls(join(dir, name)), InputError, name);
  }
  await assert.rejects(readUrls(join(dir, "nope.json")), InputError);
});
~~~

~~~bash demo.sh
rm -f download.log
node test-server.js > server.out &
server=$!
sleep 0.5
for run in 1 2; do
  echo "=== تشغيل $run"
  node download.js urls.json
  echo "(exit $?)"
done
kill $server
echo "=== JSON بايظ ولستة فاضية"
node download.js broken.json; echo "(exit $?)"
node download.js empty.json; echo "(exit $?)"
echo "=== أول ١٤ سطر في download.log (الوقت اتشال)"
head -14 download.log | cut -c26-
~~~

وملفين للتجربة: [[broken.json]] فيه [[[]] بس (قوس مش مقفول)، و [[empty.json]] فيه [[[]]].

## كل حتة مهمة بتعمل إيه

- **[[AbortSignal.timeout(timeout)]] في كل محاولة:** كل محاولة ليها مهلتها (1000ms افتراضي). لو خلصت، fetch بيرمي [[TimeoutError]].
- **[[isRetryable(err)]]:** القرار في دالة صغيرة لوحدها عشان يتختبر: [[HttpError]] بـ status 500 أو أكتر أيوه، و 4xx لأ، و [[TypeError]] (الشبكة) و [[TimeoutError]] أيوه.
- **[[await res.arrayBuffer()]] حتى لو مش محتاجين الـ body:** من غير ما تقرا الـ body لآخره، الاتصال بيفضل مشغول ومش بيتعاد استخدامه.
- **[[describe(err)]]:** بتطلّع سبب قصير للجدول: [[HTTP 404]] أو [[timeout]] أو [[fetch failed (ECONNREFUSED)]] من [[err.cause.code]].
- **[[pool(urls, 3, fn)]]:** ٣ workers بيلفوا على الطابور، والنتايج بترتيب الـ input. و [[active]] بيزيد قبل [[fetchOne]] ويقل في [[finally]]، فحتى لو حاجة رمت العدّاد بيرجع صح.
- **[[readUrls]]:** كل مشكلة في الملف بتطلع [[InputError]] برسالة لليوزر والسبب في [[cause]]: الملف مش موجود، أو JSON بايظ، أو مش array، أو فاضي، أو فيه حاجة مش URL ([[URL.canParse]] بترجّع [[false]] من غير ما ترمي).
- **[[if (import.meta.main)]]:** [[true]] لما الملف يتشغّل مباشرة بـ [[node download.js]]، و [[false]] لما [[test.js]] يستورده (Node 24.2 وأحدث). كده نفس الملف أداة وفي نفس الوقت module يتختبر من غير ما يشغّل الـ CLI.
- **[[console.table]]:** بيرسم الـ array كجدول، وشلنا منه [[ms]] عشان الجدول يبقى نفسه في كل تشغيل (الوقت موجود في النتيجة وفي اللوج).
- **[[process.exitCode = 1]]:** لو فيه أي فشل، فأي سكربت أو CI بيعرف من غير ما يقرا الجدول.

## اتقاس

- ٥ اختبارات عدّوا: اللستة المختلطة بعدد المحاولات الصح لكل واحد، و [[active]] = 3 بالظبط مع 10 URLs، والتشغيل مرتين بنفس الجدول، و [[isRetryable]]، و ٦ أشكال ملف غلط.
- الاختبارات بتستخدم port مقفول ([[127.0.0.1:59999]]) لـ «الشبكة فشلت» بدل الدومين الغلط، عشان تخلص في ٤ ثواني.

## الغلطات اللي حصلت وإزاي اتصلحت

- **التشغيل التاني طلّع جدول مختلف:** أول نسخة من [[/flaky]] كانت بتفشل **أول مرة بس** في عمر السيرفر. التشغيل الأول: محاولتين. التاني: محاولة واحدة، لأن السيرفر لسه فاكر. الكود كان سليم، والسيرفر هو اللي كان شايل state. خليته يفشل مرة وينجح مرة بالتبادل، فكل تشغيل بيشوف نفس الحاجة.
- **سبب الدومين الغلط اتغيّر بين تشغيلين:** أول تشغيل للـ demo كتب [[timeout]] قدام [[no-such-host.invalid]]، والتشغيل اللي فوق كتب [[fetch failed (ENOTFOUND)]]. على الجهاز ده الـ DNS ساعات بياخد حوالي ١١ ثانية عشان يقول «مش موجود» (لقيناها في درس fetch)، فالمهلة (ثانية) بتخلص قبله. الكود صح في الحالتين (فشل بعد ٣ محاولات وكود ١)، وعشان كده الاختبارات بتستخدم port مقفول، نتيجته ثابتة.
- **البرنامج بيخلص الجدول ويستنى قبل ما يخرج:** في التشغيل اللي الـ DNS كان بطيء فيه، طلبات الـ DNS اللي لسه شغالة مسكت Node لحد ما رجعت، فـ [[demo.sh]] كله خد حوالي ٤٥ ثانية. ده من الـ DNS مش من الكود.` },
        { lvl: 'فكرة', dir: "daily-board", t: R`لوحة بيانات لحاجة بتحبها`, what: R`اختار API مجاني (طقس، أو أسعار عملات، أو ماتشات، أو أفلام) واعمل صفحة بتجيب أكتر من endpoint مع بعض، وبتعرض اللي نجح حتى لو حاجة فشلت (allSettled)، وزرار تحديث بيلغي القديم. انت اللي بتختار الـ API والشكل.`, done: R`الصفحة بتشتغل لما endpoint واحد يفشل (غيّر الـ URL بتاعه وجرّب)، ومفيش [[await]] جوه forEach، وكل fetch بيفحص [[res.ok]].`, ext: R`زوّد cache في [[Map]] بحيث نفس الطلب في خلال ٣٠ ثانية ميتبعتش تاني، وزرار «جرّب تاني» للحتة اللي فشلت لوحدها.`, sol: R`## الشكل النهائي

الـ preview ده بيجيب من [[dummyjson.com]] الحقيقي (اقتباسات ووصفات ومهام تجريبية، مجاني ومن غير تسجيل). علّم «بوّظ endpoint الوصفات» ودوس «تحديث»:

~~~live 380 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحة اليوم</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; background: #f8fafc; color: #111827; }
  header { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  h1 { font-size: 20px; margin: 0; flex: 1; }
  button { font: inherit; padding: 6px 14px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 12px; }
  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; min-height: 90px; }
  .card h2 { font-size: 15px; margin: 0 0 6px; color: #374151; }
  .card .body { direction: ltr; text-align: left; unicode-bidi: isolate; }
  .card.failed { border-color: #fca5a5; background: #fef2f2; }
  .card.failed .body { direction: rtl; text-align: right; color: #b91c1c; }
  #status { color: #555; min-height: 1.6em; }
</style>
</head>
<body>
<header>
  <h1>لوحة اليوم</h1>
  <label><input type="checkbox" id="break"> بوّظ endpoint الوصفات</label>
  <button id="refresh">تحديث</button>
</header>
<p id="status" role="status"></p>
<div class="grid">
  <section class="card" id="quote"><h2>اقتباس</h2><div class="body"></div></section>
  <section class="card" id="recipe"><h2>وصفة</h2><div class="body"></div></section>
  <section class="card" id="todo"><h2>مهمة عشوائية</h2><div class="body"></div></section>
</div>

<script>
  const API = "https://dummyjson.com";
  const statusEl = document.querySelector("#status");
  let controller;

  async function getJSON(path, signal) {
    const res = await fetch(API + path, { signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  }

  const widgets = [
    { id: "quote", path: () => "/quotes/random", show: (d) => "“" + d.quote + "” — " + d.author },
    {
      id: "recipe",
      path: () => (document.querySelector("#break").checked ? "/recipes-typo" : "/recipes?limit=1&skip=" + Math.floor(Math.random() * 40) + "&select=name,cuisine,prepTimeMinutes"),
      show: (d) => d.recipes[0].name + " (" + d.recipes[0].cuisine + "، " + d.recipes[0].prepTimeMinutes + " دقيقة)",
    },
    { id: "todo", path: () => "/todos/random", show: (d) => d.todo },
  ];

  async function refresh() {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;
    statusEl.textContent = "بيحمّل...";
    for (const w of widgets) document.querySelector("#" + w.id + " .body").textContent = "…";

    const results = await Promise.allSettled(widgets.map((w) => getJSON(w.path(), signal)));
    if (signal.aborted) return; // فيه تحديث أحدث بدأ، سيب الشاشة ليه

    let failed = 0;
    results.forEach((r, i) => {
      const card = document.querySelector("#" + widgets[i].id);
      const body = card.querySelector(".body");
      if (r.status === "fulfilled") {
        card.classList.remove("failed");
        body.textContent = widgets[i].show(r.value);
      } else {
        failed++;
        card.classList.add("failed");
        body.textContent = "مش متاح دلوقتي (" + r.reason.message + ")";
      }
    });
    statusEl.textContent = failed ? (3 - failed) + " من 3 اتحمّلوا" : "اتحدّث " + new Date().toLocaleTimeString("ar-EG");
  }

  document.querySelector("#refresh").addEventListener("click", refresh);
  refresh();
</script>
</body>
</html>
~~~

## النسخة النموذجية: «لوحة اليوم»

٣ كروت من ٣ endpoints مختلفة: اقتباس، ووصفة، ومهمة. اخترنا dummyjson عشان من غير مفتاح API وبيسمح للصفحة تكلّمه من أي مكان، فالـ preview بيشتغل هنا على طول. والـ checkbox بيغيّر مسار الوصفات لمسار غلط، عشان تجرّب «endpoint واحد فشل» بإيدك.

## اتقاس في Chrome (على dummyjson الحقيقي، ٢١ نوفمبر ٢٠٢٦)

~~~text الناتج (Chrome headless)
--- أول فتح | status: اتحدّث <الساعة>
    ✓ اقتباس: (فيها داتا)
    ✓ وصفة: (فيها داتا)
    ✓ مهمة عشوائية: (فيها داتا)
[console] Failed to load resource: the server responded with a status of 404 ()
--- بعد ما بوّظنا الوصفات | status: 2 من 3 اتحمّلوا
    ✓ اقتباس: (فيها داتا)
    ✗ وصفة: مش متاح دلوقتي (HTTP 404)
    ✓ مهمة عشوائية: (فيها داتا)
--- ٣ ضغطات تحديث ورا بعض | status: اتحدّث <الساعة>
    ✓ اقتباس: (فيها داتا)
    ✓ وصفة: (فيها داتا)
    ✓ مهمة عشوائية: (فيها داتا)
طلبات اتلغت: 7
[chrome] 158
~~~

- endpoint الوصفات رجّع 404، والكارت بتاعه بقى أحمر ومكتوب فيه السبب، والكارتين التانيين اتعرضوا عادي.
- ٣ ضغطات تحديث ورا بعض: أول تحديثين اتلغوا (٣ طلبات × ٢ = ٦ طلبات اتلغت)، والشاشة عرضت نتيجة الأخير.

## ليه التصميم ده

- **[[Promise.allSettled]] مش [[Promise.all]]:** الكروت مستقلة. بـ [[all]]، فشل الوصفات كان هيمسح الاقتباس والمهمة كمان.
- **[[widgets]] array:** كل كارت = [[id]] و [[path]] و [[show]]. الـ fetch والرسم والأخطاء مكتوبين مرة واحدة، وكارت رابع = سطر رابع في الـ array. و [[path]] دالة مش نص، عشان الوصفة العشوائية والـ checkbox يتقروا وقت التحديث.
- **[[getJSON]] بتفحص [[res.ok]]:** من غيرها الـ 404 كان هيرجّع JSON فيه رسالة خطأ، و [[show]] هتقع بـ TypeError وهي بتقرا [[d.recipes[0]]].
- **signal واحد لكل تحديث:** [[controller?.abort()]] بيلغي الـ ٣ طلبات القديمة مرة واحدة.
- **[[if (signal.aborted) return]] بعد الـ allSettled:** [[allSettled]] **مبيترفضش** أبدًا، حتى لو الطلبات اتلغت (بترجع كـ [[rejected]] بـ [[AbortError]]). فلو مفحصناش، التحديث القديم كان هيكتب «مش متاح (AbortError)» في الكروت فوق الجديد.
- **[[results.forEach]] من غير [[await]]:** الـ await خلص قبلها مرة واحدة. الـ forEach بيرسم بس.
- **الأخطاء بالعربي وجنبها السبب:** «مش متاح دلوقتي (HTTP 404)»: اليوزر فاهم، واللي بيصلّح عارف.

## الغلطة اللي تتجنبها

تكتب [[widgets.forEach(async (w) => { const d = await getJSON(...); render(d); })]]. بيشتغل، بس مفيش لحظة تعرف فيها إن الكل خلص (عشان تكتب «2 من 3 اتحمّلوا»)، وكل كارت بيترسم في وقت مختلف، والإلغاء بيبقى أصعب. [[allSettled]] بتديك الكل في نقطة واحدة.

## خليه بتاعك

بدّل الـ endpoints بأي API بتحبه (طقس، أو ماتشات، أو أفلام) وخلّي [[show]] ترسم اللي محتاجه. وزوّد [[Map]] كـ cache: المفتاح الـ path، والقيمة الداتا ووقتها، ولو أقل من ٣٠ ثانية متبعتش الطلب.` },
      ],
      items: [
        {
          cmd: "Promise",
          title: "يعني إيه Promise؟",
          desc: R`الـ Promise object بيمثّل نتيجة لسه مجتش: طلب شبكة، أو قراية ملف، أو timer. ليه ٣ حالات: pending (لسه)، و fulfilled (نجح وفيه قيمة)، و rejected (فشل وفيه سبب). ولما يخلص مبيتغيرش تاني.

بتسجّل اللي هيحصل بعد كده بـ [[.then(onSuccess)]] و [[.catch(onError)]] و [[.finally()]]، وكل واحدة بترجّع Promise جديد، فتقدر توصّلهم سلسلة. وده كان الحل لـ «callback hell»: callbacks جوه callbacks جوه callbacks.`,
          example: R`function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("id غلط"));
      else resolve({ id, name: "Sara" });
    }, 300);
  });
}
getUser(1)
  .then((user) => user.name)
  .then((name) => console.log("الاسم:", name))
  .catch((err) => console.log("فشل:", err.message))
  .finally(() => console.log("خلص"));
wait(500).then(() => console.log("بعد نص ثانية"));
const { promise, resolve } = Promise.withResolvers();`,
          try: R`نادي [[getUser(0)]] وشوف أنهي then اتخطت. وبعدين ارمي error جوه أول then ([[throw new Error("x")]]) وشوف الـ catch مسكته.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log("1"); new Promise((r) => { console.log("2"); r(); }).then(() => console.log("3")); console.log("4");]]. اكتب الترتيب على ورقة وبعدين شغّله.`, done: R`الترتيب [[1 2 4 3]]: الـ executor اللي جوه [[new Promise]] بيشتغل فورًا (sync)، والـ then بس هي اللي بتستنى. ولو كتبت [[1 4 2 3]] ارجع لجملة «الـ executor بيتنادي على طول».`, sol: R`**التوقع:** [[1]] ثم [[2]] ثم [[4]] ثم [[3]].

~~~js order.js
console.log("1");
new Promise((r) => {
  console.log("2");
  r();
}).then(() => console.log("3"));
console.log("4");
~~~

~~~text الناتج (node order.js، Node 24)
1
2
4
3
~~~

**ليه كده سطر سطر:**

1. [[console.log("1")]] عادي: [[1]].
2. [[new Promise((r) => { ... })]]: الدالة اللي جوه (اسمها **executor**) بتتنادى **فورًا** وقت ما الـ Promise بيتعمل، مش بعدين. فـ [[2]] بتتطبع على طول، و [[r()]] بتخلّي الـ Promise «خلص بنجاح».
3. [[.then(() => console.log("3"))]]: الـ Promise خلص فعلًا، بس الـ then **مبتتناداش في نفس اللحظة أبدًا**. بتتحط في طابور اسمه microtasks، وبتستنى الكود الحالي يخلص.
4. [[console.log("4")]]: لسه جزء من الكود الحالي: [[4]].
5. الكود الحالي خلص، فطابور الـ microtasks بيشتغل: [[3]].

**الغلطة الشائعة:** تكتب [[1 4 2 3]] على أساس إن «كل حاجة في Promise بتستنى». اللي بيستنى هو الـ [[then]] بس. الـ executor sync، وعشان كده لو حطيت فيه loop تقيل هيوقّف البرنامج زي أي كود عادي.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[getUser(1).then((u) => { getOrders(u.id); }).then((orders) => console.log("orders:", orders));]]. ليه بيطبع undefined؟`, done: R`قبل التصليح بيطبع [[orders: undefined]] لأن الـ then الأولى مرجّعتش الـ Promise (الأقواس [[{ }]] من غير return). بعد [[(u) => getOrders(u.id)]] بيطبع الطلبات.`, sol: R`[[getUser]] من الدرس، و [[getOrders]] دالة وهمية زيها بتستنى 200ms:

~~~js fake-api.js
// نفس getUser بتاعة الدرس، و getOrders زيها
export function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("id غلط"));
      else resolve({ id, name: "Sara" });
    }, 300);
  });
}

export function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 7, userId, total: 120 }]), 200);
  });
}
~~~

## قبل التصليح

~~~js chain-broken.js
import { getUser, getOrders } from "./fake-api.js";

getUser(1)
  .then((u) => {
    getOrders(u.id);
  })
  .then((orders) => console.log("orders:", orders));
~~~

~~~text الناتج (node chain-broken.js، Node 24)
orders: undefined
~~~

## بعد التصليح

~~~js chain-fixed.js
import { getUser, getOrders } from "./fake-api.js";

getUser(1)
  .then((u) => getOrders(u.id))
  .then((orders) => console.log("orders:", orders));
~~~

~~~text الناتج (node chain-fixed.js)
orders: [ { id: 7, userId: 1, total: 120 } ]
~~~

**ليه [[undefined]]:**

- كل [[.then(fn)]] بترجّع Promise **جديد**، وقيمته هي اللي [[fn]] رجّعتها.
- [[(u) => { getOrders(u.id); }]]: الأقواس [[{ }]] بتعمل جسم دالة، ومن غير [[return]] الدالة بترجّع [[undefined]]. [[getOrders]] اتنادت فعلًا وبدأت، بس الـ Promise بتاعها اترمى ومحدش مستنيه.
- فالـ then اللي بعدها اتنادت على طول بـ [[undefined]].
- [[(u) => getOrders(u.id)]] من غير أقواس = return ضمني. والـ then لما ترجّع Promise، السلسلة **بتستنى** الـ Promise ده يخلص وتعدّي قيمته (الطلبات) للـ then اللي بعدها.

**الغلطة الشائعة:** تصلّحها بـ [[.then((u) => { return getOrders(u.id) })]]، ده صح برضه. الغلط إنك تحط then جوه then ([[getOrders(u.id).then(...)]] جوه الأولى): بترجع لـ callback hell، والـ [[.catch]] اللي برّه مش هيمسك أخطاء الجوّانية لو منسيتش الـ return.` },
            { lvl: 'تطبيق', t: R`**refactor:** عندك دالة قديمة بـ callback: [[loadUser(id, cb)]] بتستنى 300ms بـ setTimeout وبتنادي [[cb(new Error("id غلط"))]] لو [[id <= 0]] أو [[cb(null, { id, name: "Sara" })]]. اكتب [[loadUserP(id)]] بترجّع Promise بتلفها بـ [[new Promise]] من غير ما تغيّر loadUser نفسها.`, done: R`[[loadUserP(1).then((u) => console.log(u.name))]] بيطبع [[Sara]] بعد حوالي 300ms، و [[loadUserP(0).catch((e) => console.log(e.message))]] بيطبع [[id غلط]]، و [[loadUser]] الأصلية لسه شغالة بالـ callback زي الأول.`, sol: R`~~~js promisify.js
// الدالة القديمة: متتغيّرش
function loadUser(id, cb) {
  setTimeout(() => {
    if (id <= 0) cb(new Error("id غلط"));
    else cb(null, { id, name: "Sara" });
  }, 300);
}

// الجديدة: بتلفها في Promise
function loadUserP(id) {
  return new Promise((resolve, reject) => {
    loadUser(id, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
}

const start = Date.now();
const t = () => Math.round((Date.now() - start) / 100) * 100 + "ms";

loadUserP(1).then((u) => console.log(t(), u.name));
loadUserP(0).catch((e) => console.log(t(), e.message));
loadUser(2, (err, u) => console.log(t(), "callback لسه شغال:", u.name));
~~~

~~~text الناتج (node promisify.js، Node 24؛ الأوقات متقرّبة لأقرب 100ms)
300ms Sara
300ms id غلط
300ms callback لسه شغال: Sara
~~~

**ليه كده:**

- **[[new Promise((resolve, reject) => { ... })]]:** بنعمل Promise ونستلم الدالتين اللي بيحسموه.
- **جواه بننادي [[loadUser]] الأصلية** بـ callback من عندنا. الـ callback ده هو «الكوبري»: لو جه [[err]] نعمل [[reject(err)]]، غير كده [[resolve(user)]].
- **الـ convention:** callbacks بتاعة Node بتاخد [[(err, result)]]: أول argument الـ error أو [[null]]. عشان كده [[if (err)]] الأول.
- **التلاتة خلصوا عند 300ms:** اتنادوا كلهم مع بعض، وكل واحد بيستنى 300ms لوحده. و [[loadUser]] الأصلية لسه شغالة بالـ callback زي ما هي، لأننا ملمسناهاش.

**الغلطة الشائعة:** تنسى [[return]] أو [[else]] بعد [[reject(err)]] وتكمّل تقرا [[user.name]]: [[user]] بـ [[undefined]] فتقع بـ TypeError جوه الـ callback. (Node عنده [[util.promisify(loadUser)]] بيعمل نفس اللفّة دي لوحده لأي دالة بالـ convention ده.)` },
            { lvl: 'تطبيق', t: R`**ابني:** [[wait(ms)]] بترجّع Promise بيخلص بعد ms، واستخدمها في سلسلة then تطبع عدّ تنازلي [[3]] ثم [[2]] ثم [[1]] ثم «انطلق»، ثانية بين كل واحدة.`, done: R`الأربع سطور بيطلعوا بالترتيب، و [[console.time]] حواليهم بيقول حوالي 3 ثواني (3000ms وشوية). ومفيش setTimeout جوه setTimeout.`, sol: R`~~~js countdown.js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.time("العد");
console.log(3);
wait(1000)
  .then(() => {
    console.log(2);
    return wait(1000);
  })
  .then(() => {
    console.log(1);
    return wait(1000);
  })
  .then(() => {
    console.log("انطلق");
    console.timeEnd("العد");
  });
~~~

~~~text الناتج (node countdown.js، Node 24؛ الكسور الأخيرة بتتغيّر كل تشغيل)
3
2
1
انطلق
العد: 3.029s
~~~

**ليه كده:**

- **[[wait(ms)]]:** Promise بيتحسم بعد ms. [[setTimeout(resolve, ms)]] بتنادي [[resolve]] لما الوقت يخلص، ومحتاجين نحسمه بس من غير قيمة.
- **[[return wait(1000)]] جوه كل then:** ده اللي بيخلّي السلسلة **تستنى** ثانية قبل الـ then اللي بعدها. السلسلة مسطّحة: كل خطوة تحت التانية، مفيش timer جوه timer.
- **الوقت 3 ثواني وشوية:** ٣ استنايات ورا بعض = 3000ms، والزيادة (بتاعة الـ ms القليلة) هي وقت تشغيل الكود نفسه ودقة الـ timers. [[setTimeout]] بيوعد إنه **مش أقل** من المدة، مش إنها بالظبط.
- **[[console.time("العد")]] و [[console.timeEnd("العد")]]:** بيقيسوا الوقت بين السطرين بنفس الاسم.

**الغلطة الشائعة:** [[.then(() => { console.log(2); wait(1000); })]] من غير [[return]]: الـ wait بتبدأ بس محدش بيستناها، فـ 2 و 1 و «انطلق» بيطلعوا ورا بعض بعد ثانية واحدة بس.` },
            { lvl: 'تحدي', t: R`**محاكاة:** بوابة ماتش: اكتب [[createGate()]] بـ [[Promise.withResolvers()]] بترجّع [[{ wait, open }]]. ٣ مشجعين بينادوا [[gate.wait().then(() => console.log("دخل", name))]]، وبعد ثانية [[gate.open()]]، وبعدها [[gate.open()]] تاني، وبعدها مشجع رابع بيوصل متأخر وبينادي wait.`, done: R`محدش بيطبع قبل الثانية. بعد أول open التلاتة بيطبعوا «دخل» بنفس ترتيب ما وصلوا، و open التانية مبتعملش حاجة ومفيش error (الـ Promise بيتحسم مرة واحدة). والرابع بيدخل على طول لأن الـ Promise خلص خلاص.`, sol: R`~~~js gate.js
function createGate() {
  const { promise, resolve } = Promise.withResolvers();
  return {
    wait: () => promise,
    open: () => resolve(),
  };
}

const start = Date.now();
const t = () => String(Math.round((Date.now() - start) / 100) * 100).padStart(4) + "ms";
const gate = createGate();

for (const name of ["أحمد", "منى", "كريم"]) {
  console.log(t(), "وصل", name);
  gate.wait().then(() => console.log(t(), "دخل", name));
}

setTimeout(() => {
  console.log(t(), "--- open() أول مرة");
  gate.open();
  console.log(t(), "--- open() تاني مرة");
  gate.open();
}, 1000);

setTimeout(() => {
  console.log(t(), "وصل متأخر: يوسف");
  gate.wait().then(() => console.log(t(), "دخل يوسف"));
}, 1500);
~~~

~~~text الناتج (node gate.js، Node 24؛ الأوقات متقرّبة لأقرب 100ms)
   0ms وصل أحمد
   0ms وصل منى
   0ms وصل كريم
1000ms --- open() أول مرة
1000ms --- open() تاني مرة
1000ms دخل أحمد
1000ms دخل منى
1000ms دخل كريم
1500ms وصل متأخر: يوسف
1500ms دخل يوسف
~~~

**ليه كده:**

- **[[Promise.withResolvers()]]** بترجّع [[{ promise, resolve, reject }]]: Promise ودالتين يحسموه **من برّه**. ده بالظبط اللي البوابة محتاجاه: الناس بتستنى في حتة، والفتح بيحصل من حتة تانية.
- **[[wait: () => promise]]:** كل مشجع بياخد **نفس** الـ Promise. التلاتة سجّلوا [[.then]] عليه ومحدش طبع «دخل» قبل الثانية.
- **[[open()]] الأولى:** [[resolve()]] حسمت الـ Promise، فالـ then التلاتة اتحطوا في الطابور **بنفس ترتيب تسجيلهم**: أحمد، منى، كريم.
- **ليه «open() تاني مرة» اتطبعت قبل «دخل أحمد»؟** الـ then مبتتناداش جوه [[resolve()]]، بتستنى الكود الحالي (جسم الـ setTimeout كله) يخلص. والكود الحالي فيه السطرين.
- **[[open()]] التانية:** Promise اتحسم خلاص ميتحسمش تاني. [[resolve]] التانية بتتجاهل بهدوء من غير error.
- **يوسف المتأخر:** [[.then]] على Promise محسوم بيشتغل على طول (في أول microtask)، فدخل في نفس اللحظة اللي وصل فيها.

**الغلطة الشائعة:** تعمل [[new Promise]] جديد جوه [[wait()]] كل مرة. كده كل مشجع بيستنى Promise لوحده، و [[open()]] مش عارفة تحسمهم. لازم Promise **واحد** متشارك.` }
          ],
          ref: [
            { t: "MDN: Promise", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" },
            { t: "MDN: Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
            { t: "MDN: Promise.prototype.then()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then" },
            { t: "MDN: Promise.withResolvers()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers" },
          ],
          flag: "script",
          deep: {
            why: "كل حاجة بتاخد وقت في JS async: fetch، و قاعدة البيانات، والملفات. وأي مكتبة حديثة بترجّع Promises، و async/await نفسها مبنية عليهم. من غير ما تفهمهم هتقابل bugs زي «الداتا undefined» لأنك قريتها قبل ما توصل.",
            how: R`[[new Promise(executor)]]: الـ executor بيشتغل فورًا ومعاه دالتين، [[resolve(value)]] و [[reject(reason)]]. أول واحدة تتنادي بس هي اللي بتفرق.

[[then]] بترجّع Promise جديد قيمته اللي الـ callback رجّعه. لو الـ callback رجّع Promise، السلسلة بتستناه (flattening). ولو رمى error، الـ Promise الجديد بيبقى rejected، والسلسلة بتتخطى لأقرب catch.

الـ callbacks بتاعة then مبتشتغلش فورًا حتى لو الـ Promise خلص أصلًا: بتتحط في microtask queue وتشتغل بعد الكود المتزامن الحالي (درس event loop في المستوى ٣).

Promise اترفض ومحدش عمله catch: المتصفح بيطبع «Uncaught (in promise)»، و Node من نسخة 15 بيقفل البرنامج كله (unhandled rejection).

[[Promise.withResolvers()]] (ES2024) بترجّع promise و resolve و reject برّه الـ executor، مفيدة لما الـ resolve هيتنادي من مكان تاني (event مثلًا).`,
            when: R`هتستخدم Promises جاهزة (fetch وغيره) كل يوم، غالبًا بـ await. و [[new Promise]] بنفسك لما تلف API قديم شغال بـ callbacks (زي setTimeout أو events).`,
            mistakes: R`تنسى [[return]] جوه then فالـ then اللي بعدها تاخد undefined. وتنسى catch. وتلف Promise جاهز في [[new Promise]] من غير لزمة (explicit construction anti-pattern). وفي الانترفيو: «إيه حالات الـ Promise؟» و «callback vs promise؟».`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيعمل دالتين بيرجّعوا Promises بإيدنا: [[wait]] (استنى وقت معيّن)، و [[getUser]] (API وهمي بياخد 300ms وينجح أو يفشل). وبعدين بيوصّل سلسلة [[then]] و [[catch]] و [[finally]] على getUser. اتشغّل في Node 24، وزوّدنا قدام كل سطر مطبوع الوقت من أول البرنامج بالملي ثانية (ms) عشان تشوف الترتيب.

---

## ١. [[wait]]: أبسط Promise

~~~text app.js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
~~~

- [[new Promise(executor)]]: بيعمل Promise جديد. الـ **executor** هو الدالة اللي بتديهاله، وبتشتغل **فورًا**، وبياخد منه دالة اسمها [[resolve]].
- [[resolve]]: لما تناديها، الـ Promise بيخلص بنجاح (fulfilled).
- [[setTimeout(resolve, ms)]]: نادي resolve بعد ms ملي ثانية.

يعني [[wait(500)]] بيرجّع Promise بيخلص بعد نص ثانية.

---

## ٢. [[getUser]]: نجاح أو فشل

~~~text app.js
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("id غلط"));
      else resolve({ id, name: "Sara" });
    }, 300);
  });
}
~~~

- الـ executor هنا بياخد دالتين: [[resolve]] و [[reject]]. [[reject]] بتخلّي الـ Promise يفشل (rejected) بالسبب اللي تديهوله.
- [[setTimeout(() => { ... }, 300)]]: بنقلّد طلب شبكة بياخد 300ms.
- [[reject(new Error("id غلط"))]] لو id صفر أو سالب، و [[resolve({ id, name: "Sara" })]] غير كده. و [[{ id, name: "Sara" }]] اختصار [[{ id: id, name: "Sara" }]].

### الـ Promise ليه ٣ حالات

طبعنا Promise من getUser في ٣ أوقات:

~~~text الناتج
   0ms Promise { <pending> }                        ← لحظة النداء
 407ms Promise { { id: 1, name: 'Sara' } }          ← بعد ما نجح
 407ms Promise { <rejected> Error: id غلط ... }     ← getUser(0) بعد ما فشل
~~~

| الحالة | معناها |
|---|---|
| pending | لسه مخلصش |
| fulfilled | نجح ومعاه قيمة |
| rejected | فشل ومعاه سبب (error) |

ولما يخلص (نجح أو فشل) **مبيتغيرش تاني**. ولو ناديت resolve أو reject تاني، بيتجاهلهم.

---

## ٣. السلسلة

~~~text app.js
getUser(1)
  .then((user) => user.name)
  .then((name) => console.log("الاسم:", name))
  .catch((err) => console.log("فشل:", err.message))
  .finally(() => console.log("خلص"));
~~~

نمشيها حلقة حلقة:

1. [[getUser(1)]]: بيرجّع Promise pending **على طول**، والكود بيكمّل.
2. [[.then((user) => user.name)]]: «لما ينجح، خد القيمة (user) ورجّع name منها». كل then بترجّع **Promise جديد** قيمته اللي الـ callback رجّعه، يعني هنا [["Sara"]].
3. [[.then((name) => console.log(...))]]: اللي بعدها بتاخد [["Sara"]] وتطبعها.
4. [[.catch((err) => ...)]]: لو **أي** حلقة قبلها فشلت (الـ Promise الأصلي أو throw جوه then)، التنفيذ بينط هنا على طول.
5. [[.finally(() => ...)]]: بتشتغل في الحالتين، ومبتاخدش قيمة.

---

## ٤. الترتيب الحقيقي

~~~text app.js
wait(500).then(() => console.log("بعد نص ثانية"));
const { promise, resolve } = Promise.withResolvers();
~~~

- [[Promise.withResolvers()]] (ES2024): بترجّع object فيه [[promise]] و [[resolve]] و [[reject]] جاهزين، فتقدر تنادي resolve **من برّه** الـ executor (من event مثلًا). جرّبنا نعمل resolve بعد 700ms من setTimeout تانية.

~~~text الناتج
   2ms آخر سطر متزامن
 312ms الاسم: Sara
 313ms خلص
 502ms بعد نص ثانية
 705ms withResolvers: اتحلّت من برّه
~~~

لاحظ إن [[آخر سطر متزامن]] (console.log عادي في آخر الملف) اتطبع **الأول**: كل الـ Promises بتسجّل اللي هيحصل وتسيب الكود يكمّل، والـ callbacks بتشتغل بعدين.

---

## ٥. الفشل (التجربة)

مع [[getUser(0)]] بنفس السلسلة:

~~~text الناتج
فشل: id غلط
خلص
~~~

الاتنين then اتخطّوا خالص، والـ catch مسك. ولما رمينا [[throw new Error("x")]] جوه أول then (مع getUser(1)):

~~~text الناتج
فشل: x
خلص
~~~

نفس الـ catch مسك الاتنين: الرفض الأصلي وأي throw جوه then.

### Promise فشل ومحدش عمله catch

جرّبنا [[getUser(0)]] لوحده من غير catch (في ملف تجربة getUser فيه في أول سطر):

~~~text الناتج
C:\Users\ali\code\app.js:4
      if (id <= 0) reject(new Error("id غلط"));
                          ^

Error: id غلط
    at Timeout._onTimeout (C:\Users\ali\code\app.js:4:27)

Node.js v24.19.0
~~~

ده اسمه **unhandled rejection**، و Node بيقفل البرنامج كله بـ exit code 1. في المتصفح بيظهر [[Uncaught (in promise)]] أحمر في Console.

---

## ٦. unhandled rejection: ليه Node بيوقّع البرنامج كله

من Node 15 الوضع الافتراضي إن أي Promise اترفض ومحدش مسكه **بيوقّع الـ process**، زي throw محدش مسكه بالظبط. قبل كده كان بيطبع تحذير ويكمّل، وده كان بيخبّي bugs لحد ما السيرفر يبقى في حالة غريبة. Node بيقرر إن الـ Promise «ملوش handler» بعد ما الكود المتزامن والـ microtasks يخلصوا، فـ [[.catch]] لازم يتحط قبل كده.

الوضع ده بيتغيّر بـ flag اسمه [[--unhandled-rejections]]. جرّبت كل وضع على [[Promise.reject(new Error("x"))]] وبعده timer بيطبع «كمّل»، من غير أي listener:

| الوضع | اللي حصل (Node 24) | كود الخروج |
|---|---|---|
| [[throw]] (الافتراضي) | البرنامج وقع بالـ stack، و «كمّل» متطبعتش | 1 |
| [[warn]] | طبع [[UnhandledPromiseRejectionWarning: Error: x]] على stderr وكمّل | 0 |
| [[none]] | ساكت خالص وكمّل، ودي أخطر حاجة | 0 |
| [[strict]] | وقع حتى لو فيه [[unhandledRejection]] listener | 1 |

> متغيّرش الافتراضي عشان «التحذير يختفي». الصح إنك تمسك الـ rejection في مكانه ([[.catch]] أو [[await]] جوه try)، وتحط handler عام يسجّل أي حاجة فلتت ويخرج. ده درس «الأخطاء العامة: unhandledrejection و uncaughtException» في وحدة الأخطاء.

والمتصفح مختلف: الصفحة **مبتقعش**، بس بيكتب [[Uncaught (in promise)]] في Console وبيطلّع event اسمه [[unhandledrejection]] على [[window]] (نفس الدرس).

---

## ٧. Promise.try: كود ممكن يرمي sync أو async في سلسلة واحدة

مشكلة: دالة بترجّع Promise، بس جواها سطر ممكن يرمي **قبل** ما الـ Promise يتعمل. الـ [[.catch]] مش هيشوفه:

~~~text pt.mjs
function readConfig(text) {
  return JSON.parse(text);
}
function readConfigAsync(text) {
  return Promise.resolve(readConfig(text));
}
try {
  readConfigAsync("{").catch((e) => console.log("catch اتنادت؟"));
} catch (e) { console.log("لأ: اترمى sync:", e.name); }
~~~

~~~text الناتج (Node 24)
لأ: اترمى sync: SyntaxError
~~~

[[readConfig("{")]] رمت وهي بتتحسب كـ argument لـ [[Promise.resolve]]، يعني قبل ما يبقى فيه Promise أصلًا، فالـ [[.catch]] عمره ما اتنادى. اللي بينادي الدالة لازم يحط try **و** catch، وده سهل يتنسي.

[[Promise.try(fn, ...args)]] (ES2025، موجودة في Node 24 والمتصفحات الحديثة) بتنادي [[fn]] **على طول** وتحوّل أي نتيجة لـ Promise: لو رجّعت قيمة يبقى fulfilled، ولو رمت يبقى rejected، ولو رجّعت Promise بتستناه:

~~~text pt.mjs
Promise.try(readConfig, "{").catch((e) => console.log("Promise.try:", e.name));
Promise.try(readConfig, '{"port":3000}').then((c) => console.log("port", c.port));
Promise.try(async () => { throw new Error("async"); }).catch((e) => console.log("async:", e.message));
console.log(Promise.try(() => 5) instanceof Promise);
console.log("sync انتهى");
~~~

~~~text الناتج (Node 24)
true
sync انتهى
Promise.try: SyntaxError
port 3000
async: async
~~~

- [[Promise.try(readConfig, "{")]]: الـ arguments بعد الدالة بتتبعتلها، فده زي [[readConfig("{")]] بس الـ throw بقى rejection.
- الدالة اتنادت **فورًا** (sync)، بس الـ [[then]] و [[catch]] بيتنادوا بعدين كـ microtasks، عشان كده «sync انتهى» اتطبعت الأول.
- الفرق عن [[Promise.resolve().then(fn)]] (الحيلة القديمة، وبتمسك الـ throw برضه): هناك [[fn]] بتتأجّل لـ microtask، وهنا بتتنفّذ في نفس اللحظة.

| الطريقة | الـ throw المتزامن | [[fn]] بتتنفّذ إمتى |
|---|---|---|
| [[Promise.resolve(fn())]] | بيطلع برّه كـ throw عادي، والـ catch مش شايفه | فورًا |
| [[Promise.resolve().then(fn)]] | بيبقى rejection | بعدين، في microtask |
| [[Promise.try(fn)]] | بيبقى rejection | فورًا |
| [[async () => fn()]] ونداها | بيبقى rejection | فورًا |

آخر سطر: أي دالة [[async]] بتعمل نفس الحماية، فـ [[Promise.try]] مفيدة بالذات لما مش عايز تكتب wrapper، أو مع مكتبات بتاخد callback ممكن يرجّع قيمة أو Promise.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[new Promise((resolve, reject) => ...)]] | تعمل Promise وتقرر إمتى ينجح أو يفشل |
| [[.then(fn)]] | لما ينجح. اللي fn بترجّعه يروح للحلقة اللي بعدها |
| [[.catch(fn)]] | لو أي حاجة قبلها فشلت |
| [[.finally(fn)]] | في الحالتين |
| [[Promise.withResolvers()]] | promise و resolve و reject في متغيرات |

- كل then بترجّع Promise جديد، فالسلسلة ممكن تطول. **ولو نسيت return جوه then، الحلقة اللي بعدها هتاخد undefined**.
- حط catch في آخر كل سلسلة، وإلا Node هيقفل البرنامج (الافتراضي من Node 15، ويتغيّر بـ [[--unhandled-rejections]] بس متغيّروش).
- [[Promise.try(fn)]] بتخلّي الـ throw المتزامن rejection، فـ [[.catch]] واحد يمسك الاتنين.`,
          lines: [
            R`دالة [[wait]] بتاخد عدد milliseconds وبترجّع Promise بيخلص بعد المدة دي. هي نسخة من [[setTimeout]] تقدر تعمل عليها [[then]] أو [[await]].`,
            R`[[new Promise]] بياخد دالة (executor) بتتنفذ على طول، وبيدّيها [[resolve]]. بنسلّم [[resolve]] نفسها للـ [[setTimeout]]، فأول ما الوقت يخلص بتتنادى والـ Promise يبقى fulfilled. مفيش [[reject]] هنا لأن الاستنا مبيفشلش.`,
            R`نهاية [[wait]].`,
            R`[[getUser]] بتمثّل API وهمي: بترجّع Promise فيه يوزر بعد شوية، أو بتفشل لو الـ id غلط. كده نجرّب حالة النجاح وحالة الفشل من غير شبكة.`,
            R`الـ executor هنا بياخد [[resolve]] (نجاح) و [[reject]] (فشل). الـ Promise بيفضل pending لحد ما واحدة منهم تتنادى، وأول واحدة بس هي اللي بتحسب: أي نداء بعدها بيتجاهَل.`,
            R`[[setTimeout]] بيأجّل الرد ٣٠٠ms عشان يقلّد وقت الطلب على الشبكة. من غيره الـ Promise هيخلص بسرعة جدًا ومش هتحس إن فيه استنا.`,
            R`لو الـ id صفر أو سالب بننادي [[reject]] ومعاها [[Error]] (مش نص)، عشان اللي يمسكه يلاقي [[message]] و stack trace يعرف منهم الغلط حصل فين.`,
            R`غير كده بننادي [[resolve]] بالـ object بتاع اليوزر، والقيمة دي هي اللي هتوصل لأول [[then]].`,
            R`نهاية دالة الـ [[setTimeout]]، و [[300]] هي المدة بالـ milliseconds.`,
            R`نهاية الـ executor والـ [[new Promise]].`,
            R`نهاية [[getUser]].`,
            R`النداء نفسه مبيستناش حاجة: بيرجّع Promise لسه pending على طول، والكود بيكمّل. اللي بعده بيقول «لما يخلص اعمل كذا».`,
            R`[[then]] بتتنادى لما الـ Promise ينجح ومعاها القيمة (اليوزر). اللي الدالة بترجّعه (الاسم) بيبقى قيمة Promise جديد، وده اللي بيخلّي السلسلة تكمّل.`,
            R`[[then]] التانية بتستلم الاسم اللي رجع من اللي قبلها وتطبعه: «الاسم: Sara». كل [[then]] بتشتغل بس بعد ما اللي قبلها تخلص.`,
            R`[[catch]] بتمسك أي reject أو error اترمى في أي خطوة قبلها في السلسلة. جرّب [[getUser(0)]] وهتلاقي الـ [[then]] الاتنين اتخطّوا ووصلنا هنا على طول بـ «فشل: id غلط».`,
            R`[[finally]] بتتنادى في الحالتين، نجاح أو فشل، ومبتاخدش القيمة. مكانها الطبيعي إنك تقفل loading spinner أو تنضّف حاجة.`,
            R`استخدام [[wait]]: بعد ٥٠٠ms الـ Promise بيخلص والـ [[then]] تطبع. ولأن الكود مبيقفش، أي سطر بعده هيتنفذ قبل الطباعة دي.`,
            R`[[Promise.withResolvers]] بترجّع Promise ومعاه [[resolve]] و [[reject]] بتوعه برّه الـ executor، فتقدر تخلّصه من مكان تاني خالص (زي event listener). موجودة في Node 22 والمتصفحات الحديثة.`
          ],
          sol: R`[[getUser(0)]] بتطبع [[فشل: id غلط]] وبعدين [[خلص]]: الـ promise اترفضت، فالاتنين then اتخطوا ونطّت على طول للـ catch، والـ finally اشتغلت في الآخر.

لما ترمي [[throw new Error("x")]] جوه أول then (مع [[getUser(1)]])، التانية اتخطت والـ catch طبعت [[فشل: x]]: أي error جوه then بيحوّل الـ promise اللي بعدها لـ rejected. فـ catch واحدة في آخر السلسلة بتمسك الاتنين: الرفض الأصلي وأي throw بعده. لو ملقتش الرسالة خالص، غالبًا حطيت الـ catch قبل الـ then اللي فيها الـ throw.`
        },
        {
          cmd: "async و await",
          title: "تكتب كود async كأنه سطر ورا سطر",
          desc: R`[[async function]] دايمًا بترجّع Promise. وجواها [[await promise]] بتوقف الدالة دي بس (مش البرنامج) لحد ما الـ Promise يخلص، وترجّع قيمته، أو ترمي الـ error لو اترفض.

فبدل سلسلة then، بتكتب كود شكله متزامن، وبتمسك الأخطاء بـ try/catch عادي. وفي ES modules تقدر تستخدم await في أول الملف من غير async (top-level await).`,
          example: R`async function loadDashboard(userId) {
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{userId}$__bt);
    if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
    const user = await res.json();
    const ordersRes = await fetch($__bthttps://api.example.com/orders?user=$__{user.id}$__bt);
    return { user, orders: await ordersRes.json() };
  } catch (err) {
    console.error("فشل التحميل:", err);
    return null;
  }
}
const data = await loadDashboard(1);
const p = loadDashboard(2);
console.log(p instanceof Promise); // true`,
          try: R`امسح [[await]] من قدام [[res.json()]] واطبع [[user]]: هتلاقي [[Promise { <pending> }]]. وبعدين نادي [[loadDashboard]] من غير await وشوف إيه اللي بيتطبع الأول.`,
          practice: [
            { lvl: 'سريع', t: R`**ابني:** زرار «حمّل البروفايل» و [[<p id="out">]]: الـ click بينادي [[async function load()]] بتكتب «بيحمّل...» وبعدين [[await getUser(1)]] (من درس Promise) وتكتب الاسم، ولو [[getUser(0)]] تكتب «فشل: » والرسالة. وجرّب [[console.log(load())]].`, done: R`النص بيبقى «بيحمّل...» حوالي 300ms وبعدين [[Sara]]، ومع id صفر «فشل: id غلط». و [[console.log(load())]] بيطبع [[Promise { <pending> }]] مش الاسم: async دايمًا بترجّع Promise.`, sol: R`~~~live 150 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>حمّل البروفايل</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  button { font: inherit; padding: 6px 14px; margin-left: 6px; }
</style>
<button data-id="1">حمّل البروفايل</button>
<button data-id="0">جرّب id غلط (0)</button>
<p id="out">لسه محدش داس</p>
<script>
  function getUser(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id <= 0) reject(new Error("id غلط"));
        else resolve({ id, name: "Sara" });
      }, 300);
    });
  }

  const out = document.querySelector("#out");

  async function load(id) {
    out.textContent = "بيحمّل...";
    try {
      const user = await getUser(id);
      out.textContent = user.name;
    } catch (err) {
      out.textContent = "فشل: " + err.message;
    }
  }

  for (const btn of document.querySelectorAll("button")) {
    btn.addEventListener("click", () => {
      const p = load(Number(btn.dataset.id));
      console.log("load() رجّعت:", p instanceof Promise ? "Promise" : p);
    });
  }
</script>
</html>
~~~

## اتقاس في Chrome

~~~text الناتج (Chrome headless: ضغطة على كل زرار، وقراية النص بعد 50ms وبعد 450ms)
[console] load() رجّعت: Promise
id 1 بعد 50ms: بيحمّل...
id 1 بعد 450ms: Sara
[console] load() رجّعت: Promise
id 0 بعد 50ms: بيحمّل...
id 0 بعد 450ms: فشل: id غلط
[chrome] 157
~~~

## [[console.log(load())]] في Node

في الـ Console بتاع Chrome بيظهر object قابل للفتح، فجرّبناه في Node عشان الشكل يبان نص:

~~~js log-load.js
import { getUser } from "./fake-api.js";

async function load() {
  const user = await getUser(1);
  return user.name;
}

console.log(load());
console.log(await load());
~~~

~~~text الناتج (node log-load.js، Node 24)
Promise { <pending> }
Sara
~~~

**ليه كده:**

- **[[async function load(id)]]:** جواها نقدر نستخدم [[await]].
- **[[out.textContent = "بيحمّل..."]] الأول:** ده بيتنفّذ على طول، فاليوزر بيشوفه قبل ما الـ 300ms تعدّي.
- **[[const user = await getUser(id)]]:** الدالة **بتقف هنا** لحد ما الـ Promise يخلص، والصفحة مش متجمّدة (تقدر تدوس على أي حاجة تانية). لما يخلص بنجاح، [[user]] بياخد القيمة.
- **[[try/catch]]:** لو الـ Promise اترفض، الـ [[await]] **بترمي** الـ error كأنه throw عادي، فالـ catch بيمسكه: «فشل: id غلط».
- **[[load()]] بترجّع Promise دايمًا:** أي async function بترجّع Promise، حتى لو جواها [[return user.name]]. فـ [[console.log(load())]] طبع [[Promise { <pending> }]]: لسه مخلصش. و [[await load()]] هي اللي بتديك الاسم.

**الغلطة الشائعة:** [[const name = load(); out.textContent = name;]]. هيكتب [[[object Promise]]] في الصفحة. القيمة جوه الـ Promise، ومش بتطلع غير بـ [[await]] أو [[.then]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[async function g() { console.log(1); await null; console.log(3); } g(); console.log(2);]]. اكتب الترتيب.`, done: R`توقعت وطلع [[1]] ثم [[2]] ثم [[3]]: الـ async function بتشتغل sync لحد أول await، وبعدها الباقي بيستنى لحد ما الكود اللي بعد النداء يخلص.`, sol: R`**التوقع:** [[1]] ثم [[2]] ثم [[3]].

~~~js order.js
async function g() {
  console.log(1);
  await null;
  console.log(3);
}
g();
console.log(2);
~~~

~~~text الناتج (node order.js، Node 24)
1
2
3
~~~

**ليه كده:**

1. [[g()]] اتنادت. الـ async function بتشتغل **sync** زي أي دالة عادية لحد أول [[await]]: [[1]].
2. [[await null]]: حتى لو القيمة مش Promise، الـ await بتوقّف الدالة وبتحط الباقي ([[console.log(3)]]) في طابور الـ microtasks. و [[g()]] بترجع للي ناداها على طول (بـ Promise لسه مخلصش).
3. الكود اللي بعد النداء بيكمّل: [[2]].
4. الكود الحالي خلص، فالباقي من [[g]] بيكمّل: [[3]].

**الغلطة الشائعة:** تفتكر إن الـ async function «كلها» بتشتغل في الخلفية من أول سطر. لأ: اللي قبل أول await بيتنفّذ فورًا. فلو فيه loop تقيل قبل أول await، هيوقّف اللي ناداها.` },
            { lvl: 'تطبيق', t: R`**refactor:** حوّل سلسلة [[getUser(1).then(...).then(...).catch(...).finally(...)]] اللي في درس Promise لـ [[async function show(id)]] بـ await و try/catch/finally، ونادي [[await show(1)]] وبعدها [[await show(0)]].`, done: R`[[show(1)]] بتطبع [[الاسم: Sara]] وبعدين [[خلص]]، و [[show(0)]] بتطبع [[فشل: id غلط]] وبعدين [[خلص]]: نفس ناتج سلسلة الـ then بالظبط، ومفيش ولا then فاضلة في الكود.`, sol: R`السلسلة الأصلية من درس Promise كانت:

~~~js
getUser(1)
  .then((user) => user.name)
  .then((name) => console.log("الاسم:", name))
  .catch((err) => console.log("فشل:", err.message))
  .finally(() => console.log("خلص"));
~~~

النسخة بـ await (و [[fake-api.js]] فيه [[getUser]] بتاعة الدرس):

~~~js show.js
import { getUser } from "./fake-api.js";

async function show(id) {
  try {
    const user = await getUser(id);
    console.log("الاسم:", user.name);
  } catch (err) {
    console.log("فشل:", err.message);
  } finally {
    console.log("خلص");
  }
}

await show(1);
await show(0);
~~~

~~~text الناتج (node show.js، Node 24)
الاسم: Sara
خلص
فشل: id غلط
خلص
~~~

**كل then بقت إيه:**

| السلسلة | async/await |
|---|---|
| [[getUser(1).then((user) => ...)]] | [[const user = await getUser(id)]] |
| [[.then((user) => user.name)]] + [[.then((name) => console.log(...))]] | [[console.log("الاسم:", user.name)]] سطر عادي |
| [[.catch((err) => ...)]] | [[catch (err) { ... }]] |
| [[.finally(() => ...)]] | [[finally { ... }]] |

- **[[await show(1)]] ثم [[await show(0)]]:** الـ await في أول الملف (top-level await، لأن الملف ESM) بيخلّي التانية تستنى الأولى تخلص، فالسطور بتطلع بالترتيب. من غير await التلاتة كانوا هيتلخبطوا مع بعض.

**الغلطة الشائعة:** تحط الـ [[try]] حوالين النداء بس ([[try { show(0) } catch]]) من غير await. الـ Promise بيترفض بعد ما الـ try خلص، والـ catch عمره ما يشتغل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في [[load.cjs]]: [[function load() { const d = await fetch("x"); }]]. شغّله بـ node واقرا الرسالة.`, done: R`node بيقع قبل أي سطر بـ [[SyntaxError: await is only valid in async functions and the top level bodies of modules]]. بعد [[async function load()]] الملف بيتقري عادي، وعرفت إن top-level await شغال في [[.mjs]] بس.`, sol: R`~~~js load.cjs
function load() {
  const d = await fetch("x");
}
~~~

~~~text الناتج (node load.cjs، Node 24، أول ٥ سطور)
C:\Users\ali\code\await-basics\load.cjs:2
  const d = await fetch("x");
            ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
~~~

## التصليح

~~~js load-fixed.cjs
async function load() {
  const d = await fetch("x");
}
console.log("الملف اتقري، و load:", typeof load);
~~~

~~~text الناتج (node load-fixed.cjs)
الملف اتقري، و load: function
~~~

**ليه وقع قبل أي سطر:** دي **SyntaxError**، يعني Node رفض يفهم الملف من الأساس وهو بيقراه، قبل ما ينفّذ حاجة. [[await]] كلمة ليها معنى بس جوه [[async function]] أو في أول ملف ESM. جوه [[function]] عادية Node مش عارف يقراها.

التصليح كلمة واحدة: [[async]] قبل [[function]]. الملف اتقري، و [[load]] بقت دالة (مناديناهاش، فالـ [[fetch("x")]] متنفّذش).

## top-level await: ESM بس

~~~js tla.mjs
const res = await fetch("data:text/plain,top-level await شغال");
console.log(await res.text());
~~~

~~~text الناتج (node tla.mjs)
top-level await شغال
~~~

ونفس السطر في ملف [[tla.cjs]]:

~~~text الناتج (node tla.cjs، أول ٧ سطور)
(node:210248) Warning: Failed to load the ES module: C:\Users\ali\code\await-basics\tla.cjs. Make sure to set "type": "module" in the nearest package.json file or use the .mjs extension.
(Use $__btnode --trace-warnings ...$__bt to show where the warning was created)
C:\Users\ali\code\await-basics\tla.cjs:1
const res = await fetch("data:text/plain,x");
            ^^^^^

SyntaxError: await is only valid in async functions and the top level bodies of modules
~~~

Node حاول يقراه CommonJS وفشل، وجرّب يشوفه ESM بس الامتداد [[.cjs]] بيقول CommonJS، فطلّع تحذير بيقترح [[.mjs]] أو [[type: module]] وبعدين نفس الـ SyntaxError. (الـ [[data:]] URL في المثال ده نص مكتوب جوه الـ URL نفسه، عشان نجرّب fetch من غير نت.)

**الغلطة الشائعة:** تصلّحها بإنك تشيل [[await]] بس: الكود هيتقري، بس [[d]] هتبقى Promise مش Response، والسطر اللي بعده هيقع.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قيس بـ [[console.time]]: (أ) [[await wait(300); await wait(300);]] ورا بعض، و (ب) [[const a = wait(300), b = wait(300); await a; await b;]]. وبعدين في (ب) خلّي [[a]] يترفض بعد 100ms و [[b]] 500ms، وحط الكل جوه try/catch.`, done: R`(أ) حوالي 600ms و (ب) حوالي 300ms لأن الاتنين بدأوا مع بعض. والفخ: لما a يترفض وانت لسه مستني b، Node بيقع ويخرج بكود ١ حتى إن فيه try/catch، لأن محدش كان عامل await على a ساعة ما اترفض (unhandled rejection). و [[await Promise.all([a, b])]] بتمسكه صح في الـ catch.`, sol: R`## القياس

~~~js compare.js
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

console.time("(أ) ورا بعض");
await wait(300);
await wait(300);
console.timeEnd("(أ) ورا بعض");

console.time("(ب) مع بعض");
const a = wait(300), b = wait(300);
await a;
await b;
console.timeEnd("(ب) مع بعض");
~~~

~~~text الناتج (node compare.js، Node 24؛ الكسور بتتغيّر كل تشغيل)
(أ) ورا بعض: 617.986ms
(ب) مع بعض: 306.242ms
~~~

- **(أ):** التانية مبتبدأش غير لما الأولى تخلص: 300 + 300.
- **(ب):** [[wait(300)]] بيبدأ الـ timer **ساعة ما يتنادى**، مش ساعة الـ await. الاتنين بدأوا في نفس السطر، فـ [[await a]] استنت 300، ولما خلصت كان [[b]] خلص هو كمان. المجموع حوالي 300.

## الفخ: [[a]] يترفض وانت مستني [[b]]

~~~js trap.js
const failAfter = (ms, msg) => new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const a = failAfter(100, "a وقع");
  const b = wait(500);
  await b;
  await a;
  console.log("مش هتوصل هنا");
} catch (err) {
  console.log("اتمسك في الـ catch:", err.message);
}
~~~

~~~text الناتج (node trap.js، أول ٤ سطور وكود الخروج)
file:///C:/Users/ali/code/await-basics/trap.js:1
const failAfter = (ms, msg) => new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms));
                                                                                  ^

exit code: 1
~~~

البرنامج وقع بكود ١ مع إن كله جوه try، و «اتمسك في الـ catch» متطبعتش:

1. عند 100ms [[a]] اترفض. احنا ساعتها واقفين عند [[await b]]، ومحدش عامل [[await]] ولا [[.catch]] على [[a]].
2. Node بيلاقي Promise مرفوض من غير handler بعد ما الـ microtasks تخلص، فده **unhandled rejection**، والسلوك الافتراضي إنه يقفل البرنامج (درس الأخطاء العامة).
3. الـ [[await a]] اللي كانت هتمسكه كانت هتيجي عند 500ms، متأخر.

## التصليح: [[Promise.all]]

~~~js trap-fixed.js
const failAfter = (ms, msg) => new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

console.time("وقت الـ catch");
try {
  const a = failAfter(100, "a وقع");
  const b = wait(500);
  await Promise.all([a, b]);
} catch (err) {
  console.log("اتمسك في الـ catch:", err.message);
}
console.timeEnd("وقت الـ catch");
~~~

~~~text الناتج (node trap-fixed.js; echo "exit code: $?")
اتمسك في الـ catch: a وقع
وقت الـ catch: 109.757ms
exit code: 0
~~~

[[Promise.all([a, b])]] بيحط handler على الاتنين **فورًا**، فلما [[a]] يترفض عند 100ms، الـ Promise بتاع [[all]] بيترفض على طول والـ catch بيمسكه، من غير ما يستنى [[b]]. ولاحظ إن الـ catch اشتغل بعد حوالي 100ms مش 500.

**الغلطة الشائعة:** تبدأ كذا Promise في متغيرات وتعملهم await واحد واحد «عشان الأداء». لو مش متأكد إن ولا واحد هيترفض قبل دوره، استخدم [[Promise.all]] (أو [[allSettled]]).` }
          ],
          ref: [
            { t: "MDN: async function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" },
            { t: "MDN: await", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await" },
            { t: "MDN: Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
          ],
          flag: "script",
          deep: {
            why: "ده الشكل اللي هتكتب بيه كل كود async تقريبًا في 2026: fetch و Prisma و fs و أي SDK. أسهل في القراية من then، والـ try/catch والـ loops والـ if بيشتغلوا عادي.",
            how: R`[[async]] بتخلي الدالة ترجّع Promise دايمًا: لو رجّعت قيمة بتتلف في Promise fulfilled، ولو رمت error بيبقى rejected.

[[await x]] بيوقف تنفيذ الدالة الحالية، ويرجّع التحكم للي ناداها، والـ event loop يكمّل شغل تاني. لما الـ Promise يخلص، الدالة بتكمّل من نفس المكان (كأنها generator من جوه). عشان كده await مبتجمّدش الصفحة.

كل [[await]] ورا التاني بيستنى اللي قبله. في المثال طلب الـ orders محتاج [[user.id]] فلازم يستنى، بس لو الطلبين مستقلين، شغّلهم مع بعض بـ [[Promise.all]] (الدرس الجاي).

[[return await]] جوه try بيفرق: من غير await، الـ Promise بيترجع قبل ما يخلص، ولو اترفض الـ catch اللي في الدالة مش هتمسكه.

الـ top-level await شغال في ES modules بس (المتصفح بـ type=module، و Node مع ESM)، وبيخلّي أي module بيعمل import للملف ده يستناه.`,
            when: "أي كود async جديد. then لسه مفيدة في سلسلة قصيرة أو لما مش عايز توقف الدالة.",
            mistakes: R`تنسى await فتاخد Promise بدل القيمة. و await جوه [[forEach]] (الدرس الأخير هنا). و awaits ورا بعض لحاجات مستقلة فالصفحة تبقى أبطأ من غير سبب (waterfall). وتنسى إن fetch مبترميش error على 404 و 500، لازم تفحص [[res.ok]]. وفي الانترفيو: «async/await بيعمل إيه من تحت؟» (Promises و microtasks).`
          },
          teach: R`## الكود ده بيعمل إيه؟

دالة [[loadDashboard]] بتجيب يوزر، وبعده طلباته (محتاجة id اليوزر)، وبترجّعهم مع بعض. لو أي حاجة فشلت، بتسجّل الـ error وترجّع [[null]]. مكتوبة بـ [[async]] و [[await]] فشكلها سطر ورا سطر، بس من تحت كلها Promises.

اتشغّل في Node 24 كملف [[.mjs]] (عشان الـ await اللي في أول الملف). و [[api.example.com]] مش API حقيقي، فجرّبنا عليه مرة، ومرة على سيرفر صغير محلي فيه [[/users/1]] و [[/orders]].

---

## ١. [[async function]]

~~~text app.mjs
async function loadDashboard(userId) {
~~~

كلمة [[async]] قبل function بتعمل حاجتين:

1. الدالة **دايمًا بترجّع Promise**. لو رجّعت قيمة عادية، بتتلف في Promise ناجح. ولو رمت error، الـ Promise بيفشل.
2. بتسمح تستخدم [[await]] جواها.

---

## ٢. الطلب الأول

~~~text app.mjs
  try {
    const res = await fetch($__bthttps://api.example.com/users/$__{userId}$__bt);
    if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt);
~~~

- [[try {]]: أي await جواه يفشل، التنفيذ ينط على الـ catch.
- [[fetch(url)]]: بتبعت طلب HTTP وبترجّع Promise بالرد (Response).
- [[await]]: «وقّف **الدالة دي** لحد ما الـ Promise يخلص، وهات قيمته». الدالة بس هي اللي بتقف، باقي البرنامج شغال عادي.
- [[res.ok]]: [[true]] لو الـ status بين 200 و 299. fetch **مبترميش** error على 404 أو 500، فبنفحص بنفسنا.
- [[res.status]]: الرقم نفسه (404 مثلًا).

~~~text app.mjs
    const user = await res.json();
~~~

[[res.json()]] بتقرا جسم الرد وتحوّله لـ object، وده كمان Promise (الجسم ممكن يكون لسه بيوصل)، فمحتاج await تاني.

---

## ٣. الطلب التاني

~~~text app.mjs
    const ordersRes = await fetch($__bthttps://api.example.com/orders?user=$__{user.id}$__bt);
    return { user, orders: await ordersRes.json() };
~~~

- الطلب ده **محتاج** [[user.id]]، فلازم يستنى الأول. لو الطلبين مستقلين كنا هنشغّلهم مع بعض بـ Promise.all (الدرس الجاي).
- [[?user=...]]: الـ query string: بيانات زيادة في الـ URL بعد [[?]].
- [[{ user, orders: await ordersRes.json() }]]: [[await]] ينفع جوه أي expression، حتى جوه object.

اللي السيرفر المحلي شافه:

~~~text الناتج
[server] /users/1
[server] /orders?user=1
~~~

طلبين ورا بعض، والتاني فيه id من الأول.

---

## ٤. الـ catch

~~~text app.mjs
  } catch (err) {
    console.error("فشل التحميل:", err);
    return null;
  }
}
~~~

- [[console.error]]: زي console.log بس على قناة الأخطاء (stderr).
- [[return null]]: رجّع قيمة واضحة معناها «مفيش داتا»، بدل ما الـ error يطلع للي نادى.

---

## ٥. النداء

~~~text app.mjs
const data = await loadDashboard(1);
~~~

ده **top-level await**: await في أول الملف من غير async function، شغال في ES modules بس (ملف [[.mjs]] أو [[type="module"]]).

~~~text الناتج: على api.example.com
فشل التحميل: [TypeError: fetch failed] {
  [cause]: Error: getaddrinfo ENOTFOUND api.example.com
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26) {
    errno: -3008,
    code: 'ENOTFOUND',
    syscall: 'getaddrinfo',
    hostname: 'api.example.com'
  }
}
null
~~~

الدومين مش موجود: الـ DNS (اللي بيحوّل اسم الدومين لـ IP) رد بـ [[ENOTFOUND]]، فـ fetch رمت [[TypeError: fetch failed]] وجواها السبب في [[cause]]. والـ catch طبعه ورجّع null.

~~~text الناتج: على السيرفر المحلي
{"user":{"id":1,"name":"Sara"},"orders":[{"id":10,"total":250}]}
~~~

---

## ٦. من غير await

~~~text app.mjs
const p = loadDashboard(2);
console.log(p instanceof Promise);
~~~

~~~text الناتج
true
فشل التحميل: Error: HTTP 404
    at loadDashboard (file:///C:/Users/ali/code/app.mjs:...)
    ...
~~~

- من غير await، [[p]] هو الـ **Promise** نفسه مش النتيجة. و [[instanceof Promise]] بـ true.
- لاحظ الترتيب: [[true]] اتطبعت **قبل** رسالة الفشل. الدالة اشتغلت لحد أول await ورجعت Promise فورًا، والسطر اللي بعدها كمّل، وباقي الدالة اشتغل بعدين.
- [[/users/2]] مش موجود في السيرفر المحلي، فرجع 404، و [[!res.ok]] رمت.

---

## ٧. نسيت await (التجربة)

~~~text app.mjs
const user = res.json();
console.log(user, user.id);
~~~

~~~text الناتج
Promise { <pending> } undefined
~~~

[[user]] بقى Promise مش object، و [[user.id]] بـ undefined. والكود **مبيقعش**: الـ URL التاني هيبقى [[orders?user=undefined]]. ده أشهر bug في الـ async.

---

## الخلاصة

| الكتابة | معناها |
|---|---|
| [[async function f()]] | f بترجّع Promise دايمًا |
| [[await p]] | وقّف الدالة دي لحد ما p يخلص، وهات قيمته، أو ارمي الـ error |
| [[try/catch]] حوالين await | بيمسك أي Promise فشل |
| [[await]] في أول ملف ESM | top-level await |
| نداء async من غير await | بتاخد Promise مش النتيجة |

- كل await ورا التاني بيستنى اللي قبله. ده صح لو التاني محتاج الأول، وبطء من غير لازمة لو مستقلين.
- [[res.ok]] لازم تتفحص، fetch مبترميش على 404 و 500.`,
          lines: [
            R`[[async]] قبل الدالة بتخليها ترجّع Promise دايمًا: اللي بترجّعه بـ [[return]] بيبقى قيمة الـ Promise، وأي error بيترمي جواها بيبقى reject. وكمان بتسمح تستخدم [[await]] جواها.`,
            R`[[try]] بيلف كل الخطوات، فلو أي [[await]] اترفض أو أي [[throw]] حصل، التنفيذ ينط على [[catch]] بدل ما الـ error يطلع برّه الدالة.`,
            R`[[await]] بيوقف الدالة دي بس (مش البرنامج كله) لحد ما الـ [[fetch]] يرجّع الرد، و [[res]] بيبقى object الـ Response. الـ body نفسه لسه مقريناهوش.`,
            R`[[fetch]] بيترفض بس لو الشبكة وقعت؛ لو السيرفر رد بـ 404 أو 500 بيعتبرها نجاح. فبنفحص [[res.ok]] (true للـ status من 200 لـ 299) ونرمي error بنفسنا عشان يروح للـ [[catch]].`,
            R`[[res.json]] بتقرا الـ body وتحوّله لـ object، وهي كمان بترجّع Promise فلازم [[await]]. لو الرد مش JSON صالح هترمي SyntaxError وهيوصل للـ [[catch]] برضه.`,
            R`الطلب ده محتاج [[user.id]] من اللي قبله، فلازم يستناه. ده المكان الصح للـ [[await]] ورا بعض؛ لو الطلبين مستقلين يبقى [[Promise.all]] أسرع.`,
            R`[[await]] ينفع في أي حتة في expression، فهنا بنقرا الـ JSON بتاع الطلبات جوه الـ object اللي راجع على طول. الدالة بترجّع Promise قيمته object فيه اليوزر وطلباته.`,
            R`[[catch]] بيستلم الـ error من أي خطوة فوق: شبكة وقعت، أو status غلط، أو JSON بايظ.`,
            R`[[console.error]] بيسجّل الـ error كامل (رسالة و stack) في الـ console كـ error مش log عادي، عشان تلاقيه وانت بتعمل debug.`,
            R`بدل ما نرمي الـ error لبرّه، بنرجّع [[null]] كقيمة واضحة معناها «فشل». اللي نادى الدالة يفحص [[null]] بدل ما يحتاج [[try]] بنفسه. ده اختيار تصميم: أحيانًا الأحسن ترمي.`,
            R`نهاية [[catch]].`,
            R`نهاية [[loadDashboard]].`,
            R`top-level await: [[await]] برّه أي دالة. شغال بس في ES modules (ملف [[.mjs]] أو [[type="module"]])، وفي script عادي هيدّي SyntaxError.`,
            R`من غير [[await]] مش بتاخد النتيجة، بتاخد الـ Promise نفسه وهو لسه pending. ده غلط شائع: تنسى [[await]] وتلاقي [[Promise { pending }]] بدل الداتا.`,
            R`بيطبع [[true]]: دليل إن أي دالة [[async]] بترجّع Promise مهما كانت بترجّع إيه جوّاها.`
          ],
          sol: R`من غير [[await]] قدام [[res.json()]]، [[user]] بيطبع [[Promise { <pending> }]]، و [[user.id]] بـ undefined، فالـ URL التاني بيبقى [[orders?user=undefined]]. ده أشهر bug في async: الكود مبيقعش، بس بيبعت داتا غلط.

من غير await قدام loadDashboard، السطر اللي بعدها بيتطبع الأول ([[true]] من [[instanceof Promise]])، وبعدين النتيجة أو رسالة «فشل التحميل». الدالة الـ async بتشتغل لحد أول await وترجع promise فورًا، والباقي بيكمّل بعدين. ولو [[api.example.com]] مش شغال عندك، هتشوف «فشل التحميل» و [[null]]، وده برضه صح: الـ catch شغالة.`
        },
        {
          cmd: "Promise.all و allSettled",
          title: "تشغّل كذا طلب مع بعض بدل ورا بعض",
          desc: R`[[await Promise.all([a, b, c])]] بتستنى كلهم مع بعض، وترجّع array بالنتايج بنفس الترتيب. لو واحد فشل، الكل بيفشل فورًا بالـ error بتاعه.

[[Promise.allSettled]] بتستنى كلهم مهما حصل، وترجّع لكل واحد [[{ status, value }]] أو [[{ status, reason }]]. و [[Promise.race]] بترجّع أول واحد يخلص (نجح أو فشل)، و [[Promise.any]] أول واحد ينجح.`,
          example: R`const api = (path) => fetch($__bthttps://api.example.com$__{path}$__bt).then((r) => r.json());
const [user, orders, settings] = await Promise.all([
  api("/me"),
  api("/orders"),
  api("/settings"),
]);
const results = await Promise.allSettled([api("/a"), api("/b")]);
const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
const failed = results.filter((r) => r.status === "rejected").map((r) => r.reason);
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
const fast = await Promise.race([api("/slow"), timeout(3000)]);
const first = await Promise.any([api("/mirror1"), api("/mirror2")]);`,
          try: R`اعمل ٣ دوال بـ [[wait]] (500 و 1000 و 1500 ms). استناهم ورا بعض واحسب الوقت بـ [[console.time]]، وبعدين بـ Promise.all وقارن (3 ثواني مقابل 1.5).`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[await Promise.all([1, wait(100).then(() => 2), Promise.resolve(3)])]] و [[await Promise.all([])]] هيرجّعوا إيه؟ وبعدين شغّلهم في ملف [[.mjs]] (بـ wait بتاعة درس Promise).`, done: R`الأول [[[ 1, 2, 3 ]]] بنفس ترتيب الـ array مش ترتيب الخلصان، والقيمة العادية [[1]] بتتعامل كأنها Promise خلص. والتاني [[[]]] على طول.`, sol: R`**التوقع:** [[[ 1, 2, 3 ]]] و [[[]]].

~~~js all-values.mjs
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log(await Promise.all([1, wait(100).then(() => 2), Promise.resolve(3)]));
console.log(await Promise.all([]));
~~~

~~~text الناتج (node all-values.mjs، Node 24)
[ 1, 2, 3 ]
[]
~~~

**ليه كده:**

- **الترتيب ترتيب الـ array مش ترتيب الخلصان:** [[Promise.resolve(3)]] خلص قبل [[wait(100)]] بكتير، ومع ذلك الـ 3 في آخر مكان. [[Promise.all]] بيحط كل نتيجة في نفس الـ index بتاعها في الـ input، فتقدر تفكها بـ destructuring وانت متأكد مين مين.
- **[[1]] مش Promise:** [[Promise.all]] بيعدّي كل عنصر على [[Promise.resolve]] الأول، والقيمة العادية بتبقى Promise خلص بيها على طول.
- **[[Promise.all([])]]:** مفيش حاجة يستناها، فبيخلص فورًا بـ array فاضية. (ده عكس [[Promise.any([])]] اللي بيترفض، في تمرين «مسألة» تحت.)

**الغلطة الشائعة:** تفتكر إن النتايج بتيجي بترتيب السرعة فتعمل [[results[0]]] على أساس «أسرع واحد». لو عايز أسرع واحد، ده [[Promise.race]] أو [[Promise.any]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const users = await Promise.all(ids.map((id) => { getUser(id); }));]] على [[[1, 2]]]. اطبع users.`, done: R`قبل التصليح بيطبع [[[ undefined, undefined ]]] على طول ومن غير ما يستنى، لأن الـ map رجّعت undefined مش Promises. بعد [[ids.map((id) => getUser(id))]] (أو [[ids.map(getUser)]]) بيطبع اليوزرين.`, sol: R`## قبل التصليح

~~~js map-broken.js
import { getUser } from "./fake-api.js";

const ids = [1, 2];
console.time("استنى قد إيه");
const users = await Promise.all(ids.map((id) => { getUser(id); }));
console.timeEnd("استنى قد إيه");
console.log(users);
~~~

~~~text الناتج (node map-broken.js، Node 24؛ الأرقام بتتغيّر شوية)
استنى قد إيه: 0.103ms
[ undefined, undefined ]
~~~

## بعد التصليح

~~~js map-fixed.js
import { getUser } from "./fake-api.js";

const ids = [1, 2];
console.time("استنى قد إيه");
const users = await Promise.all(ids.map((id) => getUser(id)));
console.timeEnd("استنى قد إيه");
console.log(users);
~~~

~~~text الناتج (node map-fixed.js)
استنى قد إيه: 312.701ms
[ { id: 1, name: 'Sara' }, { id: 2, name: 'Sara' } ]
~~~

**ليه [[undefined]] وعلى طول:**

- [[(id) => { getUser(id); }]] جسم دالة بأقواس من غير [[return]]، فبترجّع [[undefined]]. فالـ [[map]] طلّعت [[[undefined, undefined]]].
- [[Promise.all]] شاف قيم عادية مش Promises، فخلص فورًا (أقل من ملي ثانية) بيهم.
- الطلبين اتبعتوا فعلًا ([[getUser]] اتنادت)، بس محدش مستنيهم.
- [[(id) => getUser(id)]] من غير أقواس بترجّع الـ Promise، فالـ array بقت Promises، و [[Promise.all]] استناهم الاتنين مع بعض (300ms، مش 600). وممكن تكتبها [[ids.map(getUser)]] لأن [[map]] بتعدّي العنصر كأول argument.

**الغلطة الشائعة:** نفس الباج بالظبط في [[forEach]]: [[ids.forEach(async (id) => await save(id))]] مبترجّعش حاجة خالص تستناها. [[map]] + [[Promise.all]] هي الطريقة الصح.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** dashboard: ٣ دوال وهمية: [[getUser]] تنجح بعد 200ms، و [[getOrders]] تنجح بعد 300ms، و [[getAds]] تفشل بعد 100ms. حمّلهم مرة بـ [[Promise.all]] ومرة بـ [[Promise.allSettled]]، واعرض اللي نجح، وللي فشل «الإعلانات مش متاحة».`, done: R`الـ all بيترفض بعد حوالي 100ms برسالة getAds ومبيرجّعش ولا قيمة حتى اللي نجحوا. والـ allSettled بيخلص بعد حوالي 300ms ومعاك الـ user والـ orders، و [[status: 'rejected']] للـ ads ومعاه [[reason.message]]، والصفحة بتعرض الاتنين و «الإعلانات مش متاحة».`, sol: R`~~~js dashboard.js
const after = (ms, value, fail) =>
  new Promise((resolve, reject) => setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms));

const getUser = () => after(200, { name: "Sara" });
const getOrders = () => after(300, [{ id: 7, total: 120 }]);
const getAds = () => after(100, "سيرفر الإعلانات واقع", true);

const start = Date.now();
const t = () => Math.round((Date.now() - start) / 100) * 100 + "ms";

console.log("--- Promise.all");
try {
  const [user, orders, ads] = await Promise.all([getUser(), getOrders(), getAds()]);
  console.log(user, orders, ads);
} catch (err) {
  console.log(t(), "اترفض:", err.message);
}

await after(400); // نستنى الطلبات القديمة تخلص قبل التجربة التانية

console.log("--- Promise.allSettled");
const t0 = Date.now();
const [user, orders, ads] = await Promise.allSettled([getUser(), getOrders(), getAds()]);
console.log(Math.round((Date.now() - t0) / 100) * 100 + "ms", "خلص");
console.log("ads:", ads.status, "-", ads.reason.message);
console.log("اليوزر:", user.status === "fulfilled" ? user.value.name : "مش متاح");
console.log("الطلبات:", orders.status === "fulfilled" ? orders.value.length + " طلب" : "مش متاحة");
console.log("الإعلانات:", ads.status === "fulfilled" ? ads.value : "الإعلانات مش متاحة");
~~~

~~~text الناتج (node dashboard.js، Node 24؛ الأوقات متقرّبة لأقرب 100ms)
--- Promise.all
100ms اترفض: سيرفر الإعلانات واقع
--- Promise.allSettled
300ms خلص
ads: rejected - سيرفر الإعلانات واقع
اليوزر: Sara
الطلبات: 1 طلب
الإعلانات: الإعلانات مش متاحة
~~~

**ليه كده:**

- **[[after(ms, value, fail)]]:** دالة وهمية بتنجح أو تفشل بعد مدة ثابتة، فالنتيجة نفسها كل تشغيل.
- **[[Promise.all]] = «كله أو مفيش»:** أول ما [[getAds]] فشل عند 100ms، الـ Promise كله اترفض **على طول** ومستناش الـ user والـ orders. والـ destructuring متنفّذش، فمعندناش ولا قيمة حتى اللي نجحوا بعدين.
- **[[await after(400)]]:** الطلبات القديمة (user و orders) فضلت شغالة بعد رفض الـ all، فبنستنى تخلص عشان التوقيت في التجربة التانية يبقى نضيف.
- **[[Promise.allSettled]] بيستنى الكل:** خلص عند 300ms (أبطأ واحد)، ورجّع لكل واحد object: [[{ status: "fulfilled", value }]] أو [[{ status: "rejected", reason }]]. فبنعرض كل حتة لوحدها: اليوزر والطلبات ظهروا، والإعلانات «مش متاحة».

**إمتى أنهي واحد:** [[all]] لما الصفحة **مينفعش** تشتغل من غير الكل (اليوزر والصلاحيات مثلًا). [[allSettled]] لما كل حتة مستقلة، وفشل واحدة مش لازم يبوّظ الباقي (إعلانات، توصيات).

**الغلطة الشائعة:** تستخدم [[allSettled]] وتنسى تفحص [[status]]، فتقرا [[ads.value]] وهو [[undefined]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** هات [[/users/1]] و [[/users/2]] و [[/users/3]] من jsonplaceholder مرة بـ for...of و await ورا بعض، ومرة بـ [[Promise.all]]، واطبع الأسامي والوقت بـ console.time.`, done: R`الطريقتين بيطبعوا نفس ٣ أسامي بنفس الترتيب (1 ثم 2 ثم 3)، والـ Promise.all وقتها قريب من وقت أبطأ طلب واحد، والـ for...of قريب من مجموع التلاتة. ولو الشبكة وقعت في النص، الـ Promise.all بيترفض كله، فتقدر تقول إمتى allSettled أحسن هنا.`, sol: R`التمرين ده بيضرب API حقيقي على النت ([[jsonplaceholder.typicode.com]]، API مجاني للتجارب). اتشغّل يوم ٢١ نوفمبر ٢٠٢٦ من لابتوب على نت منزلي، فالأرقام عندك هتختلف، بس النسبة بينهم هي المهمة.

~~~js real-users.mjs
const base = "https://jsonplaceholder.typicode.com/users/";
const ids = [1, 2, 3];

async function getName(id) {
  const res = await fetch(base + id);
  if (!res.ok) throw new Error("HTTP " + res.status + " من " + base + id);
  return (await res.json()).name;
}

async function oneByOne() {
  const names = [];
  for (const id of ids) names.push(await getName(id));
  return names;
}

const together = () => Promise.all(ids.map((id) => getName(id)));

async function measure(fn) {
  const start = performance.now();
  const names = await fn();
  return { ms: Math.round(performance.now() - start), names };
}

await getName(1); // طلب تسخين: أول طلب بيدفع DNS وفتح اتصال TLS، فمنحسبهوش

for (let round = 1; round <= 3; round++) {
  const a = await measure(oneByOne);
  const b = await measure(together);
  console.log($__btجولة $__{round}: for...of = $__{a.ms}ms | Promise.all = $__{b.ms}ms$__bt);
  if (round === 3) console.log(a.names, b.names);
}
~~~

~~~text الناتج (node real-users.mjs، Node 24)
جولة 1: for...of = 620ms | Promise.all = 606ms
جولة 2: for...of = 671ms | Promise.all = 185ms
جولة 3: for...of = 716ms | Promise.all = 187ms
[ 'Leanne Graham', 'Ervin Howell', 'Clementine Bauch' ] [ 'Leanne Graham', 'Ervin Howell', 'Clementine Bauch' ]
~~~

**ليه كده:**

- **[[oneByOne]]:** [[for...of]] و [[await]] جواه، فالطلب التاني مبيبدأش غير لما الأول يخلص. الوقت = مجموع التلاتة.
- **[[together]]:** الـ [[map]] بتبدأ التلاتة في نفس اللحظة، و [[Promise.all]] بيستناهم. من الجولة التانية الوقت بقى قريب من وقت **طلب واحد** (تلت وقت الـ for...of تقريبًا).
- **نفس الترتيب:** الاتنين طلّعوا 1 ثم 2 ثم 3، لأن [[Promise.all]] بيحافظ على ترتيب الـ array.
- **[[if (!res.ok) throw ...]]:** [[fetch]] مبيرميش على 404 أو 500 (درس fetch)، فبنفحص بنفسنا.

## اللي لقيناه وإحنا بنقيس

أول نسخة كانت بتقيس مرة واحدة بس، والنتيجة كانت بتلف: مرة [[Promise.all]] أسرع بالضعف، ومرة **أبطأ** من الـ for...of (طلعت 1.6 ثانية قصاد 1.3). السبب: كل طلب HTTPS محتاج اتصال مفتوح بالسيرفر، وفتح اتصال جديد (DNS و TLS) بياخد وقت أكتر من الطلب نفسه. الـ for...of بيستخدم **نفس** الاتصال للتلاتة، و [[Promise.all]] محتاج ٣ اتصالات مع بعض، فأول مرة بيدفع تمن فتح اتنين جداد. عشان كده زوّدنا طلب تسخين وقسنا ٣ جولات: الجولة ١ لسه الفرق صغير (بيفتح الاتصالات)، والجولتين ٢ و ٣ الاتصالات مفتوحة والفرق بان.

الدرس: قيس أكتر من مرة، ومتحكمش من أول تشغيل.

**لو الشبكة وقعت في النص:** [[Promise.all]] بيترفض كله ومبيرجّعش حتى الاسمين اللي وصلوا. لو عايز تعرض اللي وصل وتكتب «فشل» جنب الباقي، [[Promise.allSettled]] أحسن هنا. ولو بتجيب ١٠٠ يوزر مش ٣، متبعتش ١٠٠ طلب مرة واحدة: استخدم دفعات أو pool (درس async في loops).

**الغلطة الشائعة:** [[const names = ids.map(async (id) => ...)]] من غير [[Promise.all]]: [[names]] بقت array فيها ٣ Promises مش أسامي.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[withTimeout(promise, ms)]] بـ [[Promise.race]]، وبعدين [[firstOk(fns, ms)]] بتنادي كل الدوال وتاخد أول واحدة تنجح في خلال ms بـ [[Promise.any]] و withTimeout. جرّبها لما واحدة بس تنجح، ولما كلهم يفشلوا، ولما [[fns]] فاضية.`, done: R`لما واحدة تنجح بترجّع قيمتها حتى لو التانيين فشلوا قبلها. لما كلهم يفشلوا بيترمي [[AggregateError]] رسالته [[All promises were rejected]] و [[e.errors.length]] بيساوي عدد الدوال (وفيهم [[timeout]] للي اتأخرت). ومع لستة فاضية برضه AggregateError على طول، مش Promise بيستنى للأبد.`, sol: R`~~~js first-ok.mjs
function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("timeout")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function firstOk(fns, ms) {
  return Promise.any(fns.map((fn) => withTimeout(fn(), ms)));
}

const after = (ms, value, fail) =>
  new Promise((resolve, reject) => setTimeout(() => (fail ? reject(new Error(value)) : resolve(value)), ms));

const fastFail = () => after(50, "mirror1 واقع", true);
const slowOk = () => after(150, "بيانات من mirror2");
const tooSlow = () => after(900, "mirror3 متأخر");
const alsoFail = () => after(80, "mirror4 رفض", true);

console.log("1:", await firstOk([fastFail, slowOk, alsoFail], 300));

try {
  await firstOk([fastFail, tooSlow, alsoFail], 300);
} catch (err) {
  console.log("2:", err.name, "-", err.message, "- errors:", err.errors.length, err.errors.map((e) => e.message));
}

try {
  await firstOk([], 300);
} catch (err) {
  console.log("3:", err.name, "-", err.message, "- errors:", err.errors.length);
}
~~~

~~~text الناتج (node first-ok.mjs، Node 24)
1: بيانات من mirror2
2: AggregateError - All promises were rejected - errors: 3 [ 'mirror1 واقع', 'timeout', 'mirror4 رفض' ]
3: AggregateError - All promises were rejected - errors: 0
~~~

**ليه كده:**

- **[[withTimeout]]:** سباق ([[Promise.race]]) بين الـ Promise الأصلي و Promise بيترفض بـ [["timeout"]] بعد ms. اللي يخلص الأول (نجاح أو فشل) هو النتيجة.
- **[[.finally(() => clearTimeout(timer))]]:** لو الأصلي كسب، التايمر بتاع الـ timeout لسه شغال. بنلغيه عشان ميفضلش ماسك البرنامج.
- **[[firstOk]]:** بننادي كل دالة ونلف نتيجتها في [[withTimeout]]، و [[Promise.any]] بياخد **أول واحد ينجح** ويتجاهل الفشل.
- **الحالة ١:** [[mirror1]] فشل عند 50ms و [[mirror4]] عند 80ms، و [[Promise.any]] كمّل يستنى، و [[mirror2]] نجح عند 150ms فرجّع قيمته.
- **الحالة ٢:** الكل فشل (واحد منهم بالـ timeout عند 300ms)، فـ [[Promise.any]] رمى [[AggregateError]] رسالته [[All promises were rejected]]، وجواه [[errors]]: array فيها سبب كل واحد **بترتيب الـ input** مش بترتيب الفشل.
- **الحالة ٣:** لستة فاضية = مفيش حد ممكن ينجح، فـ [[AggregateError]] على طول بـ [[errors]] فاضية. ده عكس [[Promise.all([])]].

**حاجة لاحظناها:** البرنامج كله خد حوالي ثانية مش 300ms، لأن [[tooSlow]] (900ms) لسه شغال بعد ما الـ timeout كسب. [[Promise.race]] بيختار نتيجة، **مبيوقّفش** الشغل التاني. في fetch حقيقي، استخدم [[AbortSignal.timeout]] عشان الطلب نفسه يتلغي (درس fetch و AbortController).

**الغلطة الشائعة:** تستخدم [[Promise.race]] مكان [[Promise.any]]: لو أسرع واحد **فشل**، الـ race بيرجّع الفشل ده حتى لو التاني كان هينجح بعده بشوية.` }
          ],
          ref: [
            { t: "MDN: Promise.all()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all" },
            { t: "MDN: Promise.allSettled()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled" },
            { t: "MDN: Promise.race()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race" },
            { t: "MDN: Promise.any()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any" },
            { t: "MDN: AggregateError", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError" },
          ],
          flag: "script",
          deep: {
            why: R`صفحة dashboard بتجيب ٥ حاجات مستقلة: لو عملتهم await ورا بعض، كل طلب 300ms، يبقى 1.5 ثانية. مع Promise.all يبقوا 300ms. ده من أسهل تحسينات الأداء وأكترها تأثير، وسؤال انترفيو مشهور: «اكتب Promise.all بإيدك» (المستوى ٣).`,
            how: R`الطلبات بتبدأ لحظة ما تنادي الدوال (وانت بتبني الـ array)، مش لما تعمل await. Promise.all بس بتستنى. عشان كده [[const a = api("/a"); const b = api("/b"); await a; await b;]] برضه بيشغّلهم مع بعض، بس خطر: لو b اترفض وانت لسه مستني a، الرفض بيبقى unhandled و Node بيقفل البرنامج حتى لو جوه try/catch. فاستخدم Promise.all.

[[all]] بتفشل مع أول rejection (fail-fast)، بس الطلبات التانية مبتتلغيش، بتكمّل ونتايجها بتترمي. لو محتاج تلغيها فعلًا استخدم AbortController (الدرس الجاي).

[[race]] مفيدة للـ timeout، بس الطلب الأصلي بيفضل شغال. [[any]] بتتجاهل الفشل لحد ما واحد ينجح، ولو كلهم فشلوا ترمي [[AggregateError]] فيه كل الأسباب.

كل دول بيقبلوا أي iterable، والقيم اللي مش Promises بتتعامل كأنها نجحت.`,
            when: R`[[all]] لما كلهم لازم ينجحوا (الصفحة محتاجة الكل). [[allSettled]] لما كل واحد مستقل (رفع صور متعددة، إشعارات). [[race]] للـ timeout. [[any]] لـ mirrors أو fallback.`,
            mistakes: R`await ورا بعض لحاجات مستقلة. و Promise.all على آلاف الطلبات مرة واحدة فتضرب السيرفر أو الـ rate limit: قسّمهم batches أو استخدم مكتبة زي p-limit. وتفتكر إن race بتلغي الخاسر.`
          },
          teach: R`## الكود ده بيعمل إيه؟

٤ طرق تستنى كذا Promise مع بعض: [[Promise.all]] (كلهم لازم ينجحوا)، و [[Promise.allSettled]] (هات نتيجة كل واحد مهما حصل)، و [[Promise.race]] (أول واحد يخلص)، و [[Promise.any]] (أول واحد ينجح).

اتشغّل في Node 24 كملف [[.mjs]] على سيرفر صغير محلي بدل [[api.example.com]]، وكل مسار بيرد بعد وقت محدد: [[/me]] و [[/orders]] و [[/settings]] 300ms، و [[/a]] و [[/b]] 100ms (و [[/b]] بيرد 500 بنص مش JSON)، و [[/slow]] 5 ثواني، و [[/mirror1]] 400ms و [[/mirror2]] 200ms. وقِسنا الوقت حوالين كل خطوة.

---

## ١. الـ helper

~~~text app.mjs
const api = (path) => fetch($__bthttps://api.example.com$__{path}$__bt).then((r) => r.json());
~~~

- arrow function بتاخد path، وتعمل fetch، و [[.then((r) => r.json())]] تحوّل الرد لـ object.
- بترجّع Promise. ولاحظ إنها **مبتفحصش** [[r.ok]]، وده هيبان تحت.

---

## ٢. [[Promise.all]]

~~~text app.mjs
const [user, orders, settings] = await Promise.all([
  api("/me"),
  api("/orders"),
  api("/settings"),
]);
~~~

من جوه لبرّه:

1. **وانت بتبني الـ array**، كل [[api(...)]] بيتنادي، فالـ ٣ طلبات **بيبدأوا فورًا مع بعض**. الـ array فيها ٣ Promises.
2. [[Promise.all([...])]]: بترجّع Promise واحد بيخلص لما **كلهم** يخلصوا، وقيمته array بالنتايج **بنفس ترتيب** الـ array، مش بترتيب الوصول.
3. [[await]]: استنى.
4. [[const [user, orders, settings] = ...]]: array destructuring: أول نتيجة في user، والتانية في orders، والتالتة في settings.

~~~text الناتج
all: 362ms { path: '/me' } { path: '/orders' } { path: '/settings' }
ورا بعض: 955ms
~~~

الـ ٣ مع بعض خدوا وقت **واحد** منهم تقريبًا (300ms + شوية). ولما جرّبنا [[await]] ورا بعض للـ ٣، خدوا 300 + 300 + 300.

### لو واحد فشل

جرّبنا [[Promise.all([api("/a"), api("/b")])]]: [[/b]] رجّع 500 ونص مش JSON، و api مبتفحصش ok، فـ [[r.json()]] وقعت:

~~~text الناتج
SyntaxError: Unexpected token 'o', "not json" is not valid JSON
~~~

all **فشلت كلها** بالـ error ده، ونتيجة [[/a]] الناجحة ضاعت. ده اسمه **fail-fast**.

---

## ٣. [[Promise.allSettled]]

~~~text app.mjs
const results = await Promise.allSettled([api("/a"), api("/b")]);
~~~

بتستنى الكل مهما حصل، **ومبتفشلش أبدًا**. بترجّع لكل Promise object بيوصف حصله إيه:

~~~text الناتج: console.log(results)
[
  { status: 'fulfilled', value: { path: '/a' } },
  {
    status: 'rejected',
    reason: SyntaxError: Unexpected token 'o', "not json" is not valid JSON
        at JSON.parse (<anonymous>)
        ...
  }
]
~~~

- [[status]]: [["fulfilled"]] (نجح) أو [["rejected"]] (فشل).
- [[value]]: القيمة لو نجح. [[reason]]: الـ error لو فشل.

~~~text app.mjs
const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
const failed = results.filter((r) => r.status === "rejected").map((r) => r.reason);
~~~

- [[filter]]: سيب العناصر اللي الشرط عليها true بس. و [[map]]: حوّل كل عنصر لحاجة تانية.
- فـ ok = قيم الناجحين، و failed = أسباب الفاشلين. طبعناهم (وحوّلنا كل reason لنص بـ [[e.name + ": " + e.message]]):

~~~text الناتج
ok: [ { path: '/a' } ] failed: [ $__btSyntaxError: Unexpected token 'o', "not json" is not valid JSON$__bt ]
~~~

---

## ٤. [[Promise.race]] للـ timeout

~~~text app.mjs
const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
const fast = await Promise.race([api("/slow"), timeout(3000)]);
~~~

- [[timeout(ms)]]: Promise **بيفشل** بعد ms. و [[_]] اسم باراميتر معناه «مش محتاجه» (resolve مش مستخدمة).
- [[Promise.race([...])]]: بتاخد نتيجة **أول واحد يخلص**، نجح أو فشل.
- [[/slow]] بياخد 5 ثواني، و timeout بعد 3، فالـ timeout كسب:

~~~text الناتج
race: timeout 3011ms
~~~

خلي بالك: الطلب نفسه **فضل شغال** في الخلفية لحد ما خلص. race مبتلغيش حاجة (الإلغاء الحقيقي بـ AbortController، الدرس الجاي).

---

## ٥. [[Promise.any]]

~~~text app.mjs
const first = await Promise.any([api("/mirror1"), api("/mirror2")]);
~~~

أول واحد **ينجح**، وبتتجاهل الفاشلين:

~~~text الناتج
any: { path: '/mirror2' } 217ms
~~~

[[/mirror2]] أسرع (200ms) فكسب. ولو **كلهم** فشلوا:

~~~text الناتج: Promise.any على اتنين rejected
AggregateError: All promises were rejected [ 'x1', 'x2' ]
~~~

[[AggregateError]] error فيه [[errors]]: array بكل الأسباب.

---

## ٦. المقارنة بالوقت (الـ solCode)

~~~text app.mjs
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const a = () => wait(500), b = () => wait(1000), c = () => wait(1500);
console.time("ورا بعض");
await a(); await b(); await c();
console.timeEnd("ورا بعض");
console.time("Promise.all");
await Promise.all([a(), b(), c()]);
console.timeEnd("Promise.all");
~~~

- [[console.time("اسم")]] بيبدأ ساعة بالاسم ده، و [[console.timeEnd("اسم")]] بيطبع الوقت من ساعتها.

~~~text الناتج
ورا بعض: 3.020s
Promise.all: 1.509s
~~~

ورا بعض = 0.5 + 1 + 1.5 = 3 ثواني. مع بعض = وقت **أطولهم** بس (1.5).

---

## الخلاصة

| الدالة | بتخلص إمتى | لو فيه فشل |
|---|---|---|
| [[Promise.all]] | لما كلهم ينجحوا | بتفشل فورًا بأول error |
| [[Promise.allSettled]] | لما كلهم يخلصوا | مبتفشلش، كل واحد ليه status |
| [[Promise.race]] | أول واحد يخلص | لو الأول فشل، بتفشل |
| [[Promise.any]] | أول واحد ينجح | بتفشل بـ AggregateError لو كلهم فشلوا |

- الطلبات بتبدأ **لحظة ما تنادي الدالة**، مش لحظة الـ await. والدوال دي بتستنى بس، ومبتلغيش حاجة.
- وكمان القيم اللي مش Promises بتتقبل عادي: [[Promise.all([1, Promise.resolve(2), "three"])]] رجّعت 1 و 2 و [['three']] بالترتيب.`,
          lines: [
            R`helper صغير: بياخد path، يعمل [[fetch]]، ويحوّل الرد لـ JSON. كل نداء ليه بيرجّع Promise، وده اللي هنبعته لـ [[Promise.all]] تحت. (مش بيفحص [[res.ok]]، فده للتجربة بس.)`,
            R`[[Promise.all]] بتاخد array من Promises بقت شغالة بالفعل، وتستنى الكل يخلص. النتيجة array بنفس ترتيب الطلبات (مش ترتيب اللي خلص الأول)، فبنفكها لـ ٣ متغيرات بالـ destructuring.`,
            R`الطلب الأول ([[/me]]): بيبدأ فورًا أول ما السطر يتنفذ، مش لما [[Promise.all]] تتنادى. قيمته هتروح لـ [[user]].`,
            R`الطلب التاني ([[/orders]]) بيتبعت في نفس الوقت من غير ما يستنى الأول، وقيمته تروح لـ [[orders]].`,
            R`الطلب التالت ([[/settings]])، وقيمته تروح لـ [[settings]]. الوقت الكلي بقى وقت أبطأ طلب، مش مجموع التلاتة.`,
            R`نهاية الـ array. لو أي طلب فشل، [[Promise.all]] بتترفض فورًا بالـ error بتاعه ومش هتدّيك نتايج الباقيين (رغم إنهم بيكمّلوا في الخلفية).`,
            R`[[Promise.allSettled]] بتستنى الكل مهما حصل ومبتترفضش أبدًا. كل عنصر في النتيجة object فيه [[status]] ([[fulfilled]] أو [[rejected]]) ومعاه [[value]] أو [[reason]].`,
            R`بنسيب الناجحين بس ([[status]] بـ [[fulfilled]])، ونطلّع من كل واحد [[value]] بتاعه، يعني الداتا اللي رجعت.`,
            R`ونفس الفكرة للفاشلين: [[reason]] هو الـ error اللي اترفض بيه، فتقدر تسجّله أو تعرضه من غير ما يبوّظ الناجحين.`,
            R`[[timeout]] بترجّع Promise ملوش غير نهاية واحدة: يترفض بـ Error بعد ms. الـ [[_]] معناها إننا مش محتاجين [[resolve]].`,
            R`[[Promise.race]] بتاخد نتيجة أول واحد يخلص، نجاح أو فشل. لو الطلب أبطأ من ٣ ثواني الـ [[timeout]] يكسب ويرمي error. بس خلي بالك: الطلب مش بيتلغي وبيكمّل في الخلفية؛ عشان تلغيه فعلًا محتاج AbortController.`,
            R`[[Promise.any]] بتاخد أول واحد **ينجح** وبتتجاهل الفشل. مفيدة مع سيرفرات بديلة (mirrors). لو كلهم فشلوا بترمي AggregateError فيه [[errors]] بكل الأسباب.`
          ],
          sol: R`الناتج حاجة زي [[ورا بعض: 3.004s]] و [[Promise.all: 1.500s]]. ورا بعض كل await بتستنى اللي قبلها (500 + 1000 + 1500)، و Promise.all بتبدأهم مع بعض فالوقت بيبقى وقت أطولهم بس.

خلي بالك إن الـ promises بتبدأ لحظة ما تنادي الدالة، مش لحظة الـ await. لو كتبت [[const pa = a(), pb = b(), pc = c();]] وبعدين [[await pa; await pb; await pc;]] هتاخد 1.5 ثانية برضه. والغلطة الشائعة العكس: تكتب [[Promise.all([await a(), await b()])]] فتستنى كل واحدة قبل ما Promise.all تشوفها وترجع لـ 3 ثواني.`,
          solCode: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const a = () => wait(500), b = () => wait(1000), c = () => wait(1500);
console.time("ورا بعض");
await a(); await b(); await c();
console.timeEnd("ورا بعض");      // ~3s
console.time("Promise.all");
await Promise.all([a(), b(), c()]);
console.timeEnd("Promise.all");  // ~1.5s`
        },
        {
          cmd: "fetch و AbortController",
          title: "تعمل fetch صح: تفحص الرد وتلغي الطلب",
          desc: R`[[fetch(url, options)]] بترجّع Promise بالـ Response. خد بالك من حاجتين: fetch بتترفض بس لو النت فشل، أما 404 و 500 بيعدّوا عادي، فلازم تفحص [[res.ok]]. والـ body بيتقري مرة واحدة بـ [[res.json()]] أو [[res.text()]].

وعشان تلغي طلب (اليوزر خرج من الصفحة، أو كتب حرف جديد في البحث)، ابعت [[signal]] من [[AbortController]]، أو [[AbortSignal.timeout(ms)]] لـ timeout جاهز.`,
          example: R`async function api(path, { body, ...options } = {}) {
  const res = await fetch($__bthttps://api.example.com$__{path}$__bt, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: body ? JSON.stringify(body) : undefined,
    signal: options.signal ?? AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error($__btHTTP $__{res.status}: $__{await res.text()}$__bt);
  return res.status === 204 ? null : res.json();
}
await api("/orders", { method: "POST", body: { productId: 5 } });
let controller;
async function search(q) {
  controller?.abort();
  controller = new AbortController();
  try {
    return await api($__bt/search?q=$__{encodeURIComponent(q)}$__bt, { signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") return;
    throw err;
  }
}`,
          try: R`في Console على أي موقع، اعمل [[fetch("/not-found")]] واطبع [[res.ok]] و [[res.status]]: هتلاقيه نجح عادي بـ 404. وبعدين جرّب [[fetch(url, { signal: AbortSignal.timeout(1) })]] واقرا الـ error.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** توقّع وبعدين جرّب في ملف [[.mjs]]: [[const r = await fetch("https://example.com/nope")]]، هل هيترمي error؟ اطبع [[r.ok]] و [[r.status]]، وبعدين اقرا [[await r.text()]] مرتين ورا بعض.`, done: R`مفيش error: بيطبع [[false 404]]. والقراية التانية بتقع بـ [[TypeError: Body is unusable: Body has already been read]]: الـ body بيتقري مرة واحدة.`, sol: R`**التوقع:** مفيش error، و [[false 404]]، والقراية التانية تقع.

التمرين ده بيطلب صفحة حقيقية على النت ([[example.com]]، دومين محجوز للأمثلة). اتشغّل يوم ٢١ نوفمبر ٢٠٢٦:

~~~js nope.mjs
const r = await fetch("https://example.com/nope");
console.log(r.ok, r.status, r.statusText);

const text = await r.text();
console.log("أول قراية:", text.length, "حرف");

try {
  await r.text();
} catch (err) {
  console.log(err.name + ": " + err.message);
}
~~~

~~~text الناتج (node nope.mjs، Node 24)
false 404 Not Found
أول قراية: 577 حرف
TypeError: Body is unusable: Body has already been read
~~~

**ليه كده:**

- **[[fetch]] بيترفض بس لو الطلب نفسه موصلش:** مفيش نت، أو الدومين غلط، أو اتلغى. أي **رد** من السيرفر، حتى 404 أو 500، يعتبر نجاح للـ fetch، لأن السيرفر رد فعلًا. فلازم تفحص [[r.ok]] بنفسك ([[true]] لو الـ status من 200 لـ 299).
- **[[r.status]] و [[r.statusText]]:** الرقم والكلمة اللي معاه ([[Not Found]]).
- **الـ body بيتقري مرة واحدة:** الـ body بييجي **stream** (بيانات بتنزل حتة حتة). [[r.text()]] قرا الـ stream لآخره، فمفيش حاجة فاضلة تتقري تاني: [[TypeError: Body is unusable: Body has already been read]]. (عدد الحروف ممكن يختلف لو الصفحة اتغيّرت.)

**الغلطة الشائعة:** تعمل [[await r.json()]] جوه try، ولو فشل تعمل [[await r.text()]] عشان تشوف الرد: الـ text هتقع بنفس الـ TypeError. اقرا [[text()]] مرة، وبعدين [[JSON.parse]] عليها لو محتاج الاتنين. أو استخدم [[r.clone()]] **قبل** أول قراية.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[fetch(url, { method: "POST", body: { name: "Sara" } })]]. اعمل سيرفر Node صغير بيرجّع الـ body والـ Content-Type اللي وصلوه، وشوف وصله إيه.`, done: R`قبل التصليح السيرفر استلم [[[object Object]]] و [[text/plain;charset=UTF-8]]. بعد [[body: JSON.stringify({ name: "Sara" })]] و [[headers: { "Content-Type": "application/json" }]] استلم [[{"name":"Sara"}]] و [[application/json]].`, sol: R`السيرفر الصغير ده هنستخدمه في كل تمارين الدرس: بيشتغل جوه نفس البرنامج على port فاضي، و [[/echo]] بيرجّع الـ body والـ Content-Type اللي وصلوه:

~~~js local-api.mjs
import http from "node:http";

// سيرفر تجارب على جهازك: بيختار port فاضي لوحده، وبيرجّع عنوانه
export function startApi() {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    const delay = Number(url.searchParams.get("delay") ?? 0);
    await new Promise((r) => setTimeout(r, delay));

    if (url.pathname === "/echo") {
      let body = "";
      for await (const chunk of req) body += chunk;
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ contentType: req.headers["content-type"] ?? null, body }));
    }
    if (url.pathname === "/search") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ q: url.searchParams.get("q") }));
    }
    if (url.pathname === "/ok") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ ok: true }));
    }
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "مش موجود" }));
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      server.unref();
      resolve({ base: "http://127.0.0.1:" + server.address().port, server });
    });
  });
}
~~~

~~~js post-body.mjs
import { startApi } from "./local-api.mjs";

const { base } = await startApi();

const broken = await fetch(base + "/echo", { method: "POST", body: { name: "Sara" } });
console.log("قبل:", await broken.json());

const fixed = await fetch(base + "/echo", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Sara" }),
});
console.log("بعد:", await fixed.json());
~~~

~~~text الناتج (node post-body.mjs، Node 24)
قبل: { contentType: 'text/plain;charset=UTF-8', body: '[object Object]' }
بعد: { contentType: 'application/json', body: '{"name":"Sara"}' }
~~~

**ليه [[[object Object]]]:**

- [[body]] في fetch بياخد نص أو [[FormData]] أو [[Blob]] أو bytes، **مش** object عادي. لما تديله object، بيحوّله لنص بـ [[String(obj)]]، و [[String({ name: "Sara" })]] = [["[object Object]"]]. والـ Content-Type بقى [[text/plain;charset=UTF-8]] لأنه نص.
- [[JSON.stringify({ name: "Sara" })]] بيعمل النص الصح [[{"name":"Sara"}]].
- [[headers: { "Content-Type": "application/json" }]] بيقول للسيرفر «الـ body ده JSON». من غيره، سيرفر Express مثلًا مش هيعمل parse وهيلاقي [[req.body]] فاضي.

**تفاصيل السيرفر:** [[for await (const chunk of req)]] بيقرا الـ body حتة حتة لحد ما يخلص. و [[server.listen(0)]] = «أي port فاضي»، و [[server.unref()]] عشان البرنامج يخرج لما الشغل يخلص من غير ما السيرفر يمسكه.

**الغلطة الشائعة:** تحط الـ header وتنسى [[JSON.stringify]] أو العكس. لازم الاتنين.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[getJSON(url, { timeout = 5000 } = {})]]: بتعمل fetch بـ [[AbortSignal.timeout(timeout)]]، وترمي [[HttpError]] فيه [[status]] لو [[!res.ok]]، وفي الـ catch تفرّق بين ٣ أنواع بـ [[err.name]]. جرّبها على 404، وعلى [[timeout: 1]]، وعلى دومين مش موجود.`, done: R`الـ 404 بيطلع HttpError فيه [[status: 404]]. الـ timeout بيطلع [[err.name === "TimeoutError"]] (مش AbortError). والدومين الغلط بيطلع [[TypeError]] رسالته [[fetch failed]] والسبب الحقيقي في [[err.cause]]. والتلاتة رسايلهم لليوزر مختلفة.`, sol: R`بيستخدم [[local-api.mjs]] اللي في التمرين اللي قبله (فيه [[/ok]] و [[?delay=]] و 404 لأي مسار تاني):

~~~js get-json.mjs
import { startApi } from "./local-api.mjs";

class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} من $__{url}$__bt);
    this.name = "HttpError";
    this.status = status;
  }
}

async function getJSON(url, { timeout = 5000 } = {}) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    if (!res.ok) throw new HttpError(res.status, url);
    return await res.json();
  } catch (err) {
    if (err instanceof HttpError) throw err;
    if (err.name === "TimeoutError") throw new Error($__btالسيرفر مردّش في $__{timeout}ms، الشبكة بطيئة$__bt, { cause: err });
    if (err.name === "TypeError") throw new Error("مش قادر أوصل للسيرفر، اتأكد من النت", { cause: err });
    throw err;
  }
}

const { base } = await startApi();
const cases = [
  ["سليم", base + "/ok", {}],
  ["404", base + "/nothing", {}],
  ["timeout: 1", base + "/ok?delay=200", { timeout: 1 }],
  ["port مقفول", "http://127.0.0.1:59999/", {}],
  ["دومين مش موجود", "http://no-such-host.invalid/", {}],
];

for (const [label, url, opts] of cases) {
  try {
    console.log(label.padEnd(15), "←", await getJSON(url, opts));
  } catch (err) {
    console.log(label.padEnd(15), "←", err.name, "|", err.message);
    if (err.status) console.log(" ".repeat(18) + "status:", err.status);
    if (err.cause) console.log(" ".repeat(18) + "cause:", err.cause.name, "-", err.cause.message, err.cause.cause ? "| cause.cause.code = " + err.cause.cause.code : "");
  }
}
~~~

~~~text الناتج (node get-json.mjs، Node 24 على ويندوز؛ رقم الـ port بيتغيّر كل تشغيل)
سليم            ← { ok: true }
404             ← HttpError | HTTP 404 من http://127.0.0.1:61430/nothing
                  status: 404
timeout: 1      ← Error | السيرفر مردّش في 1ms، الشبكة بطيئة
                  cause: TimeoutError - The operation was aborted due to timeout 
port مقفول      ← Error | مش قادر أوصل للسيرفر، اتأكد من النت
                  cause: TypeError - fetch failed | cause.cause.code = ECONNREFUSED
دومين مش موجود  ← Error | السيرفر مردّش في 5000ms، الشبكة بطيئة
                  cause: TimeoutError - The operation was aborted due to timeout
~~~

**ليه كده:**

- **[[AbortSignal.timeout(timeout)]]:** signal بيتلغي لوحده بعد المدة، و fetch بيقف ويترفض بـ error اسمه [[TimeoutError]] (مش [[AbortError]]). كده تقدر تفرّق بين «اليوزر لغى» و «المهلة خلصت».
- **[[if (!res.ok) throw new HttpError(res.status, url)]]:** الـ 404 رد عادي من وجهة نظر fetch، فاحنا اللي بنحوّله لـ error، ومعاه [[status]] عشان اللي فوق يقرر (404 = «مش موجود»، 401 = «سجّل دخول»).
- **[[err.name === "TypeError"]]:** fetch بيرمي [[TypeError: fetch failed]] لما الطلب موصلش خالص، والسبب الحقيقي في [[err.cause]]. في حالة الـ port المقفول: [[cause.code = ECONNREFUSED]] (مفيش برنامج سامع على الـ port ده).
- **[[{ cause: err }]]:** الرسالة لليوزر مفهومة، والتفاصيل التقنية محفوظة للّوج.

## اللي لقيناه: الدومين الغلط طلع timeout مش TypeError

كنا متوقعين إن [[no-such-host.invalid]] (دومين محجوز إنه مايتواجدش) يطلع [[TypeError]] بـ [[ENOTFOUND]] على طول. على الجهاز ده الـ DNS بياخد حوالي ١١ ثانية عشان يقول «مش موجود» (قسناه بـ [[dns.lookup]]: [[ENOTFOUND]] بعد 11246ms)، فمهلة الـ 5 ثواني خلصت الأول وطلع [[TimeoutError]]. على جهاز الـ DNS بتاعه سريع هيطلع [[TypeError]] و [[err.cause.code]] بـ [[ENOTFOUND]].

الدرس: نوع الـ error بيعتمد على **مين يخلص الأول**، فكود الواجهة لازم يتعامل مع الاتنين برسالة معقولة، ومتعتمدش إن «دومين غلط» دايمًا ليه شكل واحد.

**الغلطة الشائعة:** [[catch (err) { if (err.name === "AbortError") ... }]] وانت مستخدم [[AbortSignal.timeout]]: عمرها ما هتدخل، لأن الاسم [[TimeoutError]].` },
            { lvl: 'تحدي', t: R`**محاكاة:** بحث وانت بتكتب: استخدم [[search(q)]] اللي في الدرس، ونادي [[search("a")]] و [[search("ab")]] و [[search("abc")]] ورا بعض من غير await، وخزّن الـ ٣ Promises واطبع [[await Promise.all]] بتاعتهم. جرّبها على endpoint بيتأخر (مثلًا سيرفر Node صغير على localhost بيرد بعد 300ms).`, done: R`أول اتنين [[undefined]] (اتلغوا والـ catch رجّع من غير قيمة) والتالت بس فيه نتيجة [["abc"]]. وفي المتصفح، تاب Network بيكتب canceled جنب أول طلبين. ولو شلت [[controller?.abort()]] التلاتة بيرجعوا وأي واحد ممكن يوصل الأخير ويكتب فوق النتيجة الصح.`, sol: R`## في Node بالسيرفر المحلي

بيستخدم [[local-api.mjs]] (تمرين «صلّح الكود البايظ» فوق)، و [[/search]] بيرجّع [[{ q }]] بعد [[delay]]:

~~~js search.mjs
import { startApi } from "./local-api.mjs";

const { base } = await startApi();
const useAbort = !process.argv.includes("--no-abort");
const delays = { a: 300, ab: 300, abc: 300 };
if (!useAbort) Object.assign(delays, { a: 500, ab: 100, abc: 300 }); // نخلّي الردود ترجع بترتيب عشوائي

async function api(path, options = {}) {
  const res = await fetch(base + path, options);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

let controller;
let shown = null;

async function search(q) {
  if (useAbort) controller?.abort();
  controller = new AbortController();
  try {
    const data = await api($__bt/search?q=$__{encodeURIComponent(q)}&delay=$__{delays[q]}$__bt, { signal: controller.signal });
    shown = data.q; // كأننا بنكتب النتيجة في الصفحة
    console.log("  وصل رد", JSON.stringify(q), "← الصفحة بتعرض:", shown);
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("  اتلغى", JSON.stringify(q));
      return;
    }
    throw err;
  }
}

const promises = [search("a"), search("ab"), search("abc")];
console.log(await Promise.all(promises));
console.log("آخر نتيجة في الصفحة:", shown);
~~~

~~~text الناتج (node search.mjs، ثم من غير abort: node search.mjs --no-abort)
  اتلغى "a"
  اتلغى "ab"
  وصل رد "abc" ← الصفحة بتعرض: abc
[ undefined, undefined, { q: 'abc' } ]
آخر نتيجة في الصفحة: abc
--- من غير abort:
  وصل رد "ab" ← الصفحة بتعرض: ab
  وصل رد "abc" ← الصفحة بتعرض: abc
  وصل رد "a" ← الصفحة بتعرض: a
[ { q: 'a' }, { q: 'ab' }, { q: 'abc' } ]
آخر نتيجة في الصفحة: a
~~~

## في Chrome

نفس [[search]] في صفحة، والسيرفر بيتأخر 300ms، وسجّلنا كل طلب من ناحية الـ Network:

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>بحث بيلغي القديم</title>
<input id="q" placeholder="ابحث">
<p id="out"></p>
<script>
  let controller;
  async function search(q) {
    controller?.abort();
    controller = new AbortController();
    try {
      const res = await fetch("/search?q=" + encodeURIComponent(q) + "&delay=300", { signal: controller.signal });
      const data = await res.json();
      document.querySelector("#out").textContent = data.q;
      return data;
    } catch (err) {
      if (err.name === "AbortError") return;
      throw err;
    }
  }
</script>
</html>
~~~

~~~text الناتج (Chrome headless: Promise.all([search("a"), search("ab"), search("abc")]))
[Network] ?q=a&delay=300 ← net::ERR_ABORTED
[Network] ?q=ab&delay=300 ← net::ERR_ABORTED
[Network] ?q=abc&delay=300 ← 200
Promise.all: [null,null,{"q":"abc"}]
#out: abc
[chrome] 157
~~~

[[net::ERR_ABORTED]] هو اللي DevTools بيكتبه [[(canceled)]] في عمود Status. و [[null]] هنا هي [[undefined]] بعد ما عدّت من الصفحة لبرّه كـ JSON.

**ليه كده:**

- **[[controller?.abort()]]:** قبل أي طلب جديد بنلغي القديم. [[?.]] لأن أول مرة مفيش controller.
- **[[controller = new AbortController()]]:** controller جديد لكل طلب، و [[signal]] بتاعه بيتبعت لـ fetch. الـ controller اللي اتلغى ميرجعش يشتغل، فلازم واحد جديد.
- **الطلب الملغي:** الـ fetch بتاعه بيترفض بـ [[AbortError]]، فالـ catch رجّع من غير قيمة ([[undefined]]) ومن غير ما يكتب في الصفحة. ده مش غلط يتعرض لليوزر.
- **من غير abort:** التلاتة رجعوا، بس بترتيب السرعة: [["ab"]] الأول، ثم [["abc"]]، ثم [["a"]] الأبطأ. وكل واحد كتب فوق اللي قبله، فالصفحة فضلت بتعرض نتايج [["a"]] واليوزر كاتب [["abc"]]. ده اسمه **race condition**، والـ abort بيمنعه.

**الغلطة الشائعة:** تعمل controller واحد برّه الدالة وتستخدمه لكل الطلبات: أول [[abort()]] بيلغيه للأبد، وكل طلب بعده بيترفض فورًا.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة [[AbortSignal.any()]] على MDN، اعمل signal واحد بيتلغي لو اليوزر داس «إلغاء» ([[controller.abort()]]) أو عدّت 5 ثواني، وجرّب الحالتين على endpoint بطيء.`, done: R`[[AbortSignal.any([controller.signal, AbortSignal.timeout(5000)])]]: لما تنادي abort الـ catch بيشوف [[err.name]] بـ [["AbortError"]]، ولما المهلة تخلص بيشوف [["TimeoutError"]]، فرسالة اليوزر بتفرق بين «لغيت» و «الشبكة بطيئة».`, sol: R`## اللي في صفحة MDN

[[AbortSignal.any(signals)]] (static method) بتاخد array من signals وترجّع signal **واحد** بيتلغي أول ما **أي واحد** منهم يتلغي، و [[reason]] بتاعه بيبقى سبب اللي اتلغى الأول. فتقدر تجمع «اليوزر داس إلغاء» و «المهلة خلصت» في signal واحد تديه لـ fetch.

## الحل

بيستخدم [[local-api.mjs]] (تمرين «صلّح الكود البايظ» فوق)، و [[/ok?delay=8000]] بيرد بعد ٨ ثواني، أبطأ من المهلة:

~~~js any-signal.mjs
import { startApi } from "./local-api.mjs";

const { base } = await startApi();

async function load(controller) {
  const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(5000)]);
  const start = Date.now();
  try {
    const res = await fetch(base + "/ok?delay=8000", { signal });
    return await res.json();
  } catch (err) {
    const s = ((Date.now() - start) / 1000).toFixed(1) + "s";
    if (err.name === "AbortError") return $__btلغيت الطلب (بعد $__{s})$__bt;
    if (err.name === "TimeoutError") return $__btالشبكة بطيئة، جرّب تاني (بعد $__{s})$__bt;
    throw err;
  }
}

// ١) اليوزر داس «إلغاء» بعد نص ثانية
const c1 = new AbortController();
setTimeout(() => c1.abort(), 500);
console.log("إلغاء:", await load(c1));

// ٢) محدش داس، والمهلة خلصت
const c2 = new AbortController();
console.log("مهلة:", await load(c2));
~~~

~~~text الناتج (node any-signal.mjs، Node 24)
إلغاء: لغيت الطلب (بعد 0.5s)
مهلة: الشبكة بطيئة، جرّب تاني (بعد 5.0s)
~~~

**ليه كده:**

- **[[AbortSignal.any([controller.signal, AbortSignal.timeout(5000)])]]:** signal بيتلغي بأي واحد من الاتنين.
- **الحالة ١:** [[c1.abort()]] بعد 500ms. [[abort()]] من غير سبب بيدّي reason اسمه [[AbortError]]، فالـ catch كتب «لغيت».
- **الحالة ٢:** محدش لغى، فالـ timeout اتلغى بعد 5 ثواني بـ [[TimeoutError]]، والرسالة «الشبكة بطيئة».
- **[[err.name]] هو اللي بيفرّق:** نفس الـ fetch ونفس الـ catch، بس الاسم بيقول مين اللي لغى. في الواجهة: «لغيت» ملهاش زرار، و «الشبكة بطيئة» جنبها زرار «جرّب تاني».

**الغلطة الشائعة:** تعمل الـ timeout بـ [[setTimeout(() => controller.abort(), 5000)]]. كده الاتنين هيطلعوا [[AbortError]] ومش هتعرف تفرّق، وكمان لازم تفتكر تعمل [[clearTimeout]] لو الطلب نجح. [[AbortSignal.timeout]] بيحل الاتنين.` }
          ],
          ref: [
            { t: "MDN: Window: fetch()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch" },
            { t: "MDN: Using the Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
            { t: "MDN: Response: ok", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok" },
            { t: "MDN: AbortController", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController" },
            { t: "MDN: AbortSignal.timeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static" },
            { t: "MDN: AbortSignal.any()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static" },
            { t: "Node.js: fetch (globals)", url: "https://nodejs.org/api/globals.html" },
          ],
          pre: [{ to: "js/اعرض داتا من fetch", why: R`أول fetch و [[res.json()]] في صفحة اتعملوا هناك، وهنا الأخطاء والإلغاء والـ POST` }],
          flag: "script",
          deep: {
            why: R`كل تطبيق بيكلّم API. ومشاكل زي «بيعرض داتا قديمة لما أكتب بسرعة في البحث» (race condition) و «الطلب واقف دقيقة» و «بيعرض صفحة 500 كأنها داتا» كلها من fetch مكتوب من غير فحص ولا إلغاء.`,
            how: R`الـ Promise بتاع fetch بيخلص أول ما الـ headers توصل، والـ body لسه بيتقري. عشان كده [[res.json()]] Promise تاني. والـ body stream بيتقري مرة واحدة، فلو قريته بـ text مينفعش تقراه بـ json.

[[AbortController]] عنده [[signal]] بتتبعت للـ fetch، و [[abort()]] بترفض الـ Promise بـ error اسمه AbortError، والمتصفح بيقفل الـ connection فعلًا. و [[AbortSignal.timeout(ms)]] signal جاهزة بتعمل abort بعد وقت (الـ error اسمه TimeoutError). و [[AbortSignal.any([a, b])]] بتجمع اتنين.

في البحث: كل حرف بيلغي الطلب اللي قبله. من غير كده، رد قديم بطيء ممكن يوصل بعد رد جديد ويكتب فوقه.

الكوكيز: في نفس الدومين بتتبعت لوحدها. لو دومين تاني محتاج [[credentials: "include"]] والسيرفر يسمح بـ CORS (تاب المتصفح وتاب الانترفيو). و Node 18+ فيه fetch مدمج.

وفي React، مكتبة زي TanStack Query بتعمل الإلغاء والكاش وإعادة المحاولة بدالك (تاب React).`,
            when: R`helper واحد زي [[api()]] في المشروع كله بدل fetch متكررة. و AbortController في البحث والـ autocomplete و useEffect cleanup. و timeout لأي طلب لسيرفر خارجي.`,
            mistakes: R`متفحصش [[res.ok]]. وتنسى [[JSON.stringify]] أو الـ Content-Type. وتبني URL بـ query من اليوزر من غير [[encodeURIComponent]] أو [[URLSearchParams]]. وتعرض AbortError كـ error لليوزر. وتقرا الـ body مرتين.`
          },
          teach: R`## الكود ده بيعمل إيه؟

جزئين: دالة [[api]] واحدة تستخدمها في المشروع كله بدل fetch مكررة (بتبعت JSON، وبتحط timeout، وبترمي error على 404 و 500)، ودالة [[search]] بتلغي طلب البحث القديم كل ما اليوزر يكتب حرف جديد.

اتشغّل في Node 24 كملف [[.mjs]] على سيرفر صغير محلي بدل [[api.example.com]]، والسيرفر بيطبع كل طلب بيوصله: الـ method والمسار والـ Content-Type والـ body. وجزء [[res.ok]] والـ timeout اتجرّب كمان في Chrome.

---

## ١. توقيع الدالة

~~~text app.mjs
async function api(path, { body, ...options } = {}) {
~~~

- [[path]]: المسار، زي [["/orders"]].
- التاني object خيارات، وبنفكّه:
- [[body]]: الداتا اللي هتتبعت، كـ object عادي.
- [[...options]]: اسمها **rest**: «كل الخصايص الباقية (method و headers و signal...) حطها في object اسمه options». فـ body اتشالت منه.
- [[= {}]]: لو مبعتش خيارات خالص.

---

## ٢. نداء fetch

~~~text app.mjs
  const res = await fetch($__bthttps://api.example.com$__{path}$__bt, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: body ? JSON.stringify(body) : undefined,
    signal: options.signal ?? AbortSignal.timeout(8000),
  });
~~~

fetch بتاخد URL و object خيارات. نبنيه سطر سطر:

| السطر | معناه |
|---|---|
| [[...options]] | **spread**: انسخ كل الخيارات اللي اتبعتت (زي [[method: "POST"]]) |
| [[headers: { ... }]] | الـ headers: معلومات زيادة مع الطلب |
| [[Content-Type: application/json]] | قول للسيرفر «الـ body ده JSON» |
| [[...options.headers]] | وزوّد أي headers اتبعتت (ولو فيها Content-Type تغطّي على الافتراضي) |
| [[body ? JSON.stringify(body) : undefined]] | لو فيه body حوّله لنص JSON. fetch مبتبعتش object، بتبعت نص |
| [[options.signal ?? AbortSignal.timeout(8000)]] | استخدم الـ signal اللي اتبعت، ولو مفيش، اعمل واحدة بتلغي بعد 8 ثواني. خلي بالك: لو اتبعت signal الـ timeout بيضيع، والحل بـ [[AbortSignal.any]] في الجزء ٦ |

- [[??]] اسمها **nullish coalescing**: «لو اللي على الشمال null أو undefined، خد اللي على اليمين».
- [[AbortSignal.timeout(ms)]]: signal جاهزة بتلغي الطلب لوحدها بعد الوقت ده.

---

## ٣. فحص الرد

~~~text app.mjs
  if (!res.ok) throw new Error($__btHTTP $__{res.status}: $__{await res.text()}$__bt);
  return res.status === 204 ? null : res.json();
}
~~~

- [[res.ok]]: true لو الـ status من 200 لـ 299. fetch **مبترميش** error على 404 أو 500، الرد بيوصل عادي. جرّبنا [[fetch("/nope")]] من غير الدالة:

~~~text الناتج
fetch 404 بس: false 404 Not Found
~~~

يعني [[ok]] = false، و [[status]] = 404، و [[statusText]] = Not Found، ومفيش error. ونفس الحاجة في Chrome: ok بـ [[false]] و status بـ [[404]] من غير error.

- [[await res.text()]]: اقرا نص الرد وحطه في رسالة الـ error، عشان تعرف السيرفر قال إيه.
- [[res.status === 204]]: 204 = «No Content»، نجح بس مفيش body. لو ناديت json عليه هيقع، فبنرجّع null.

~~~text الناتج: await api("/nope")
HTTP 404: {"error":"Not found"}
~~~

ومن الحاجات اللي اتجرّبت: الـ body **بيتقري مرة واحدة**. بعد [[res.text()]] جرّبنا [[res.json()]]:

~~~text الناتج
TypeError: Body is unusable: Body has already been read
~~~

---

## ٤. POST

~~~text app.mjs
await api("/orders", { method: "POST", body: { productId: 5 } });
~~~

~~~text الناتج
[server] POST /orders application/json {"productId":5}
POST: { id: 7, productId: 5 }
~~~

السيرفر استلم method = POST، و Content-Type = JSON، والـ body نص JSON. وجرّبنا [[DELETE]] على مسار بيرد 204: الدالة رجّعت [[null]] من غير ما تقع.

### الـ timeout

جرّبنا [[api("/slow", { signal: AbortSignal.timeout(300) })]] على مسار بياخد 10 ثواني:

~~~text الناتج
timeout: TimeoutError: The operation was aborted due to timeout
~~~

اسمه [[TimeoutError]]. وفي Chrome نفس التجربة طلّعت [[TimeoutError: signal timed out]].

---

## ٥. [[search]]: الغي القديم

~~~text app.mjs
let controller;
async function search(q) {
  controller?.abort();
  controller = new AbortController();
~~~

- [[let controller;]]: متغير برّه الدالة، بيفتكر الـ controller بتاع **آخر** بحث. [[let]] مش const لأننا هنغيّره.
- [[controller?.abort()]]: لو فيه بحث قبل كده، الغيه. و [[?.]] عشان أول مرة controller بـ undefined.
- [[new AbortController()]]: object فيه حاجتين: [[signal]] (بتتبعت مع الطلب)، و [[abort()]] (بتلغيه).

~~~text app.mjs
  try {
    return await api($__bt/search?q=$__{encodeURIComponent(q)}$__bt, { signal: controller.signal });
~~~

- [[encodeURIComponent(q)]]: بيحوّل أي حروف خاصة أو عربي لشكل آمن في الـ URL. جرّبنا:

~~~text الناتج: encodeURIComponent("قهوة & شاي")
%D9%82%D9%87%D9%88%D8%A9%20%26%20%D8%B4%D8%A7%D9%8A
~~~

المسافة بقت [[%20]]، و [[&]] بقت [[%26]]. من غيرها، الـ [[&]] كانت هتقطع الـ query لحتتين.

- [[{ signal: controller.signal }]]: اربط الطلب ده بالـ controller، فلو حد عمل abort، الطلب يتلغي.
- [[return await]]: await هنا مهمة: من غيرها، لو الطلب اتلغى، الـ catch اللي تحت مش هيمسكه.

~~~text app.mjs
  } catch (err) {
    if (err.name === "AbortError") return;
    throw err;
  }
}
~~~

- الإلغاء بيرمي error اسمه [[AbortError]]. ده مش مشكلة، احنا اللي لغيناه، فرجّع من غير حاجة.
- أي error تاني (404، timeout) ارميه عادي.

### التجربة

نادينا ٣ بحوث ورا بعض بسرعة: [["ق"]] ثم [["قه"]] ثم [["قهوة & شاي"]]:

~~~text الناتج
   اتلغى: ق | This operation was aborted
   اتلغى: قه | This operation was aborted
   [server] GET /search?q=قهوة & شاي application/json -
results: undefined undefined { q: 'قهوة & شاي' }
~~~

أول اتنين اتلغوا قبل ما يوصلوا للسيرفر أصلًا، ورجّعوا undefined. وآخر واحد بس هو اللي وصل ورجع. ده بالظبط اللي محتاجه في autocomplete: رد قديم بطيء ميكتبش فوق رد جديد.

---

## ٦. AbortSignal.any: timeout وإلغاء مع بعض

فيه مشكلة في [[api]] فوق: [[signal: options.signal ?? AbortSignal.timeout(8000)]]. لو اللي نادى بعت signal (زي [[search]])، الـ timeout **بيضيع**، فطلب البحث ممكن يفضل معلّق للأبد. محتاج signal واحد بيتلغي لو **أي** واحد من الاتنين حصل. ده [[AbortSignal.any([...])]] (Node 20.3+ وكل المتصفحات الحديثة):

~~~text any.mjs
const user = new AbortController();
const signal = AbortSignal.any([user.signal, AbortSignal.timeout(300)]);
await fetch(url, { signal });
~~~

- [[AbortSignal.any(signals)]]: بتاخد array من الـ signals وترجّع signal جديد بيتعمله abort أول ما **أول** واحد فيهم يتلغي.
- [[signal.reason]]: سبب الإلغاء، بياخده من الـ signal اللي اتلغى الأول.

جرّبتها على سيرفر محلي بيرد بعد ٢ ثانية، ٣ مرات: مرة سيبت الـ timeout يخلص، ومرة عملت [[user.abort()]] بعد 100ms، ومرة [[user.abort(new Error("اليوزر قفل الصفحة"))]] بعد 50ms:

~~~text الناتج (Node 24)
TimeoutError | The operation was aborted due to timeout | 316 ms | reason: TimeoutError
AbortError | This operation was aborted | 108 ms | reason: AbortError
Error | اليوزر قفل الصفحة | 63 ms | reason: Error
~~~

- الأول: محدش لغى، فالـ timeout كسب بعد حوالي 300ms، والـ error اسمه [[TimeoutError]].
- التاني: اليوزر لغى الأول، والـ error [[AbortError]].
- التالت: [[abort(reason)]] بسبب بتاعك: الـ fetch بيرمي **السبب نفسه** (Error برسالتك)، فـ [[err.name === "AbortError"]] مش هتمسكه. افحص [[signal.aborted]] بدل الاسم لو بتبعت أسباب.

والتصليح في [[api]]:

~~~text app.mjs
const timeout = AbortSignal.timeout(8000);
const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
~~~

وكده [[search]] بيقدر يلغي الطلب القديم، وكل طلب برضه ليه حد أقصى ٨ ثواني. ولو signal من اللي في الـ array كان متلغي من الأول، الناتج بيبقى متلغي على طول ([[AbortSignal.any([AbortSignal.abort()]).aborted]] بـ [[true]]).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[if (!res.ok) throw]] | fetch مبترميش على 404 و 500 |
| [[JSON.stringify(body)]] و Content-Type | fetch بتبعت نص، والسيرفر لازم يعرف إنه JSON |
| [[AbortSignal.timeout(ms)]] | الطلب ميفضلش معلّق للأبد ([[TimeoutError]]) |
| [[new AbortController()]] و [[abort()]] | تلغي طلب بإيدك ([[AbortError]]) |
| [[encodeURIComponent]] | أي input من اليوزر في الـ URL |
| [[res.json()]] أو [[res.text()]] | مرة واحدة بس للـ body |
| [[AbortSignal.any([a, b])]] | signal بيتلغي مع أول واحد فيهم: إلغاء اليوزر والـ timeout مع بعض |`,
          lines: [
            R`helper للـ API: بياخد path وخيارات. الـ destructuring بيطلّع [[body]] لوحده (عشان هنحوّله لنص)، والباقي كله في [[options]]. و [[= {}]] بتخلي نداءه من غير خيارات ميرميش error.`,
            R`بيعمل الطلب على عنوان الـ API ومعاه object الإعدادات اللي جاي، و [[await]] بيستنى الرد.`,
            R`بيفرد كل الخيارات اللي اتبعتت ([[method]] وغيرها) جوه إعدادات [[fetch]]. لازم ييجي الأول عشان اللي تحته يكتب فوقه.`,
            R`بنحط [[Content-Type]] بـ JSON كافتراضي، وبعدين نفرد [[options.headers]]، فأي header بعته اللي نادى الدالة (زي Authorization) يتضاف أو يغطّي الافتراضي.`,
            R`[[fetch]] مبيفهمش objects في الـ body، لازم نص. فلو فيه [[body]] بنحوّله بـ [[JSON.stringify]]، ولو مفيش بنبعت [[undefined]] (طلب GET ملوش body أصلًا).`,
            R`لو اللي نادى بعت [[signal]] بتاعه بنستخدمه، وغير كده [[AbortSignal.timeout]] بيلغي الطلب بعد ٨ ثواني. من غيره طلب معلّق ممكن يفضل مستني للأبد. (الإلغاء بالـ timeout الـ error بتاعه اسمه [[TimeoutError]].) ولو اتبعت signal الـ timeout مبيتحطش خالص، فلو عايز الاتنين ادمجهم بـ [[AbortSignal.any([options.signal, AbortSignal.timeout(8000)])]].`,
            R`نهاية إعدادات [[fetch]].`,
            R`404 و 500 مبيرفضوش الـ Promise، فبنرمي error بنفسنا، ومعاه الـ status ونص الرد اللي غالبًا فيه سبب المشكلة من السيرفر، فالـ debugging يبقى أسهل.`,
            R`الـ status [[204]] (No Content) معناه مفيش body، و [[res.json]] عليه بترمي SyntaxError، فبنرجّع [[null]]. غير كده بنحوّل الرد لـ JSON.`,
            R`نهاية [[api]].`,
            R`استخدامه: POST والـ body object عادي، والـ helper بيحوّله لنص ويضيف الـ header. لو مكانش الـ [[await]] هنا، أي error هيبقى unhandled rejection.`,
            R`[[controller]] برّه الدالة عشان يفضل موجود بين كل نداء والتاني، ويشاور على controller آخر بحث لسه شغال.`,
            R`[[search]] بتتنادى مع كل حرف بيكتبه اليوزر في خانة البحث، فممكن طلبات كتير تبقى شغالة في نفس الوقت.`,
            R`قبل أي طلب جديد بنلغي القديم. من غير كده رد قديم بطيء ممكن يوصل بعد الجديد ويكتب فوقه نتايج غلط. و [[?.]] عشان أول مرة [[controller]] لسه [[undefined]].`,
            R`controller جديد للطلب ده بالذات. الـ controller بيتلغي مرة واحدة بس، فمينفعش نعيد استخدام القديم.`,
            R`[[try]] عشان نفرّق بين الإلغاء المقصود وبين الـ errors الحقيقية.`,
            R`[[encodeURIComponent]] بيحوّل المسافات والـ [[&]] والعربي لشكل آمن في الـ URL، وإلا [[&]] في كلمة البحث هتتقري parameter جديد. وبنبعت [[controller.signal]]، فده بيغطّي الـ timeout الافتراضي (الطلب ده مبقاش ليه حد ٨ ثواني).`,
            R`لو حصل error (شبكة، status غلط، أو إلغاء) بييجي هنا.`,
            R`لما بنعمل [[abort]]، [[fetch]] بيترفض بـ error اسمه [[AbortError]]. ده إحنا اللي عملناه عن قصد، فبنرجع بهدوء من غير ما نعرض رسالة غلط لليوزر.`,
            R`أي error تاني (شبكة أو 500) حقيقي، فبنرميه تاني عشان اللي نادى [[search]] يتعامل معاه.`,
            R`نهاية [[catch]].`,
            R`نهاية [[search]].`
          ],
          sol: R`[[const res = await fetch("/not-found")]] بعدها [[res.ok]] بـ false و [[res.status]] بـ 404، ومفيش error اترمى: fetch بترفض بس لو الطلب نفسه موصلش (نت واقع، DNS، CORS). أي رد من السيرفر، حتى 404 أو 500، يعتبر نجاح. عشان كده الـ [[if (!res.ok) throw]] في الدالة ضروري.

[[AbortSignal.timeout(1)]] بتطلع error اسمه [[TimeoutError]] (في Node الرسالة [[The operation was aborted due to timeout]]، وفي Chrome [[signal timed out]]). لاحظ إنه مش [[AbortError]]: الـ catch في search بيتجاهل AbortError بس، فالـ timeout هيوصل لليوزر كـ error، وده المطلوب (إلغاء مقصود ≠ timeout).`
        },
        {
          cmd: "async في loops",
          title: "ليه await جوه forEach مش بيستنى؟",
          desc: R`[[arr.forEach(async (x) => await save(x))]] مبتستناش حاجة: forEach بتنادي الـ callback وبتتجاهل الـ Promise اللي راجع، فالكود اللي بعدها بيشتغل قبل ما أي save يخلص، والأخطاء بتضيع.

لو عايز واحد ورا واحد: [[for...of]] مع await. ولو عايزهم مع بعض: [[Promise.all(arr.map(async ...))]]. ولو كتير وعايز حد أقصى في نفس الوقت: batches أو مكتبة زي p-limit.`,
          example: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => { await wait(100); console.log("saved", id); return id; };
const ids = [1, 2, 3];
ids.forEach(async (id) => { await save(id); });
console.log("forEach خلصت؟ لأ، لسه محدش اتحفظ");
for (const id of ids) {
  await save(id);
}
const saved = await Promise.all(ids.map((id) => save(id)));
for (let i = 0; i < ids.length; i += 2) {
  await Promise.all(ids.slice(i, i + 2).map(save));
}
const all = await Array.fromAsync(ids, async (id) => save(id));`,
          try: R`حط [[console.time("t")]] و [[console.timeEnd("t")]] حوالين كل طريقة وقارن الوقت: for...of حوالي 300ms، و Promise.all حوالي 100ms. وبعدين خلي save ترمي error لـ id 2 وشوف مين بيمسكه ومين لأ.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[async function saveAll(ids) { ids.forEach(async (id) => { await save(id); }); console.log("تم حفظ الكل"); }]] (بـ save اللي في الدرس). اليوزر بيشوف «تم حفظ الكل» قبل ما أي حاجة تتحفظ. صلّحها مرة ورا بعض ومرة مع بعض.`, done: R`قبل التصليح «تم حفظ الكل» أول سطر وبعدها [[saved 1]] و [[saved 2]] و [[saved 3]]. بعد التصليح «تم حفظ الكل» آخر سطر في الحالتين: بـ [[for...of]] في حوالي 300ms، وبـ [[await Promise.all(ids.map(save))]] في حوالي 100ms.`, sol: R`~~~js save-all.js
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let start = Date.now();
const t = () => String(Math.round((Date.now() - start) / 100) * 100).padStart(4) + "ms";
const save = async (id) => { await wait(100); console.log(t(), "saved", id); return id; };

async function saveAllBroken(ids) {
  ids.forEach(async (id) => { await save(id); });
  console.log(t(), "تم حفظ الكل");
}

async function saveAllSequential(ids) {
  for (const id of ids) await save(id);
  console.log(t(), "تم حفظ الكل");
}

async function saveAllParallel(ids) {
  await Promise.all(ids.map(save));
  console.log(t(), "تم حفظ الكل");
}

const ids = [1, 2, 3];
for (const [label, fn] of [["البايظة", saveAllBroken], ["ورا بعض", saveAllSequential], ["مع بعض", saveAllParallel]]) {
  console.log("---", label);
  start = Date.now();
  await fn(ids);
  await wait(150); // نستنى أي حاجة لسه شغالة قبل التجربة اللي بعدها
}
~~~

~~~text الناتج (node save-all.js، Node 24؛ الأوقات من أول كل تجربة ومتقرّبة لأقرب 100ms)
--- البايظة
   0ms تم حفظ الكل
 100ms saved 1
 100ms saved 2
 100ms saved 3
--- ورا بعض
 100ms saved 1
 200ms saved 2
 300ms saved 3
 300ms تم حفظ الكل
--- مع بعض
 100ms saved 1
 100ms saved 2
 100ms saved 3
 100ms تم حفظ الكل
~~~

**ليه البايظة طبعت «تم حفظ الكل» الأول:**

- [[forEach]] بتنادي الدالة على كل عنصر وتتجاهل اللي بترجّعه. الدالة [[async]] بترجّع Promise، و [[forEach]] بترميه. فالتلات حفظات بدأوا، و [[forEach]] خلصت **فورًا**، والسطر اللي بعدها اتطبع عند 0ms، والحفظ الحقيقي خلص عند 100ms.
- والـ [[await]] اللي جوه الـ callback بيوقّف الـ callback ده بس، مش [[saveAll]].

**التصليحين:**

- **[[for (const id of ids) await save(id)]]:** الـ await هنا في جسم [[saveAll]] نفسها، فهي بتستنى كل حفظ قبل اللي بعده: 100 ثم 200 ثم 300، وبعدين «تم». استخدمه لما الترتيب مهم أو السيرفر مبيستحملش طلبات كتير مع بعض.
- **[[await Promise.all(ids.map(save))]]:** [[map]] بترجّع array فيها الـ Promises (مش بترميها زي forEach)، و [[Promise.all]] بتستناهم. التلاتة مع بعض فكله خلص عند 100ms. استخدمه لما العمليات مستقلة.

**الغلطة الشائعة:** تحط [[await]] قبل [[ids.forEach(...)]]: [[forEach]] بترجّع [[undefined]]، و [[await undefined]] مبتستناش حاجة. مفيش أي طريقة تخلّي [[forEach]] تستنى.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[console.log([1, 2, 3].map(async (x) => x * 2));]] هيطبع إيه في Node؟`, done: R`طلع [[[ Promise { 2 }, Promise { 4 }, Promise { 6 } ] ]] مش [[[2, 4, 6]]]: كل async function بترجّع Promise. والتصليح [[await Promise.all(...)]] بيرجّع [[[ 2, 4, 6 ] ]].`, sol: R`**التوقع:** array فيها ٣ Promises، مش [[[2, 4, 6]]].

~~~js map-async.js
const doubled = [1, 2, 3].map(async (x) => x * 2);
console.log(doubled);
console.log(await Promise.all(doubled));
~~~

~~~text الناتج (node map-async.js، Node 24)
[ Promise { 2 }, Promise { 4 }, Promise { 6 } ]
[ 2, 4, 6 ]
~~~

**ليه كده:**

- كل [[async (x) => x * 2]] بترجّع **Promise** حتى لو مفيش جواها await، فـ [[map]] جمعت ٣ Promises.
- Node بيطبع الـ Promise اللي خلص بقيمته: [[Promise { 2 }]]. الدالة مفيهاش await، فالـ Promise اتحسم فورًا قبل الطباعة. لو كان فيها await لسه مخلصش كان هيطبع [[Promise { <pending> }]].
- [[await Promise.all(doubled)]] بيستنى الـ ٣ ويرجّع قيمهم بنفس الترتيب: [[[ 2, 4, 6 ]]].

**الغلطة الشائعة:** [[const total = doubled.reduce((a, b) => a + b, 0)]] على الـ array دي: هتجمع Promises كنصوص وتطلع حاجة زي [["0[object Promise][object Promise]..."]]. اعمل [[await Promise.all]] الأول.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[inBatches(items, size, fn)]] بتشغّل كل [[size]] مع بعض بـ Promise.all، والدفعة اللي بعدها بعد ما اللي قبلها تخلص، وترجّع كل النتايج بنفس ترتيب الـ input. جرّبها على 5 عناصر و size 2، و fn بتستنى 100ms وترجّع [[x * 10]]، وعلى array فاضية.`, done: R`النتيجة [[[ 10, 20, 30, 40, 50 ]]] بالترتيب في حوالي 300ms (٣ دفعات: ٢ و ٢ و ١)، مش 500 ولا 100. والـ array الفاضية بترجّع [[[]]] من غير ما تنادي fn.`, sol: R`~~~js batches.js
export async function inBatches(items, size, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    results.push(...(await Promise.all(batch.map(fn))));
  }
  return results;
}
~~~

~~~js try-batches.js
import { inBatches } from "./batches.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let calls = 0;
const fn = async (x) => {
  calls++;
  await wait(100);
  return x * 10;
};

console.time("5 عناصر، size 2");
console.log(await inBatches([1, 2, 3, 4, 5], 2, fn));
console.timeEnd("5 عناصر، size 2");

calls = 0;
console.log(await inBatches([], 2, fn), "| fn اتنادت", calls, "مرة");
~~~

~~~text الناتج (node try-batches.js، Node 24؛ الكسور بتتغيّر شوية)
[ 10, 20, 30, 40, 50 ]
5 عناصر، size 2: 336.526ms
[] | fn اتنادت 0 مرة
~~~

**ليه كده:**

- **[[for (let i = 0; i < items.length; i += size)]]:** بنمشي بخطوة [[size]]: [[i]] = 0 ثم 2 ثم 4.
- **[[items.slice(i, i + size)]]:** الدفعة: [[[1, 2]]] ثم [[[3, 4]]] ثم [[[5]]] (الأخيرة أصغر).
- **[[await Promise.all(batch.map(fn))]]:** الدفعة كلها مع بعض، والـ [[await]] جوه الـ [[for]] بيخلّي الدفعة اللي بعدها **تستنى**. ٣ دفعات × 100ms = حوالي 300ms، مش 500 (لو واحد واحد) ولا 100 (لو الكل مع بعض).
- **[[results.push(...)]]:** نتايج كل دفعة بتتزوّد بالترتيب، وجوه الدفعة [[Promise.all]] بيحافظ على الترتيب، فالنتيجة النهائية بترتيب الـ input.
- **الـ array الفاضية:** الـ [[for]] متدخلش خالص، فـ [[fn]] اتنادت 0 مرة ورجعت [[[]]].

**العيب:** الدفعة بتستنى **أبطأ** واحد فيها. لو عنصر واحد بياخد ثانية والباقي 100ms، الدفعة كلها ثانية. الـ pool (التمرين الجاي) بيحل ده.

**الغلطة الشائعة:** [[batch.forEach(async ...)]] جوه الـ for بدل [[Promise.all]]: الدفعات كلها هتبدأ مع بعض والـ size ملوش معنى.` },
            { lvl: 'تحدي', t: R`**محاكاة:** كاشير: اكتب [[pool(items, limit, fn)]]: أول ما واحد يخلص اللي بعده يبدأ على طول، فدايمًا شغالين [[limit]] (زي ٣ كاشير قدامهم طابور). حط عدّاد [[active]] بيزيد قبل الـ await ويقل بعده واحفظ أكبر قيمة. خلّي الزباين الفردي ياخدوا 150ms والزوجي 100ms.`, done: R`النتايج بنفس ترتيب الـ input حتى لو الزباين خلصوا بترتيب تاني، وأكبر [[active]] بيساوي [[limit]] بالظبط ومبيعدّيهوش. ومع [[limit]] أكبر من عدد العناصر، أكبر active بيساوي عدد العناصر ومفيش worker بيعلّق.`, sol: R`~~~js pool.js
export async function pool(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}
~~~

~~~js cashier.js
import { pool } from "./pool.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(customers, limit) {
  let active = 0;
  let maxActive = 0;
  const doneOrder = [];
  const serve = async (n) => {
    active++;
    maxActive = Math.max(maxActive, active);
    await wait(n % 2 ? 150 : 100); // الفردي 150ms والزوجي 100ms
    active--;
    doneOrder.push(n);
    return "زبون " + n;
  };
  const start = Date.now();
  const results = await pool(customers, limit, serve);
  const ms = Math.round((Date.now() - start) / 50) * 50;
  console.log($__btlimit $__{limit}: خلصوا بالترتيب $__{doneOrder.join(",")} | أكبر active = $__{maxActive} | حوالي $__{ms}ms$__bt);
  console.log("  النتايج:", results.join("، "));
}

await run([1, 2, 3, 4, 5, 6, 7], 3);
await run([1, 2], 5);
~~~

~~~text الناتج (node cashier.js، Node 24؛ الوقت متقرّب لأقرب 50ms)
limit 3: خلصوا بالترتيب 2,1,3,4,6,5,7 | أكبر active = 3 | حوالي 350ms
  النتايج: زبون 1، زبون 2، زبون 3، زبون 4، زبون 5، زبون 6، زبون 7
limit 5: خلصوا بالترتيب 2,1 | أكبر active = 2 | حوالي 150ms
  النتايج: زبون 1، زبون 2
~~~

**ليه كده:**

- **الفكرة:** [[limit]] كاشير (workers)، وكل واحد بيلف: ياخد أول زبون في الطابور، يخدمه، ويرجع ياخد اللي بعده، لحد ما الطابور يخلص.
- **[[const i = next++]]:** بياخد رقم الزبون **ويزوّد العدّاد في نفس السطر**. JavaScript بيشغّل سطر واحد في المرة (مفيش اتنين بينفّذوا مع بعض بالظبط)، فمستحيل كاشيرين ياخدوا نفس الزبون.
- **[[results[i] = await fn(items[i], i)]]:** النتيجة بتتحط في **نفس الـ index**، فالنتايج بترتيب الطابور حتى لو الخلصان كان [[2,1,3,4,6,5,7]] (الزوجي أسرع).
- **[[Math.min(limit, items.length)]]:** مع زبونين و [[limit]] 5 بنعمل 2 workers بس. وحتى من غيره الـ [[while]] كان هيخرج على طول، بس مفيش داعي لـ workers فاضيين.
- **أكبر [[active]] = 3:** العدّاد بيزيد قبل الـ await ويقل بعده، وعمره ما عدّى الـ limit لأن فيه ٣ workers بس.
- **الوقت حوالي 350ms:** ٧ زباين على ٣ كاشير، والكاشير بيبدأ زبونه الجديد **أول ما يخلص**، مش لما الدفعة كلها تخلص زي [[inBatches]].

**الغلطة الشائعة:** [[results.push(await fn(...))]] بدل [[results[i] = ...]]: النتايج هتبقى بترتيب الخلصان مش بترتيب الطابور.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لـ [[inBatches]] اكتب اختبار بـ fn وهمية بتزوّد عدّاد [[active]] قبل الـ await وتقلّله بعده، وتحفظ أكبر قيمة. اتأكد من ٣ حاجات: الترتيب، وأكبر active، والوقت.`, done: R`على 5 عناصر و size 2 الاختبار بيطبع: الناتج [[[10, 20, 30, 40, 50]]] (true)، وأكبر active بـ 2 (true)، والوقت أقل من 400ms (true). ولو بوّظت inBatches وخليتها Promise.all على الكل، اختبار active بيطبع 5 ويفشل.`, sol: R`الاختبار بيختبر [[batches.js]] (من تمرين «ابني» فوق) أو أي ملف تديله اسمه:

~~~js test-batches.js
const file = process.argv[2] ?? "./batches.js";
const { inBatches } = await import(file);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let active = 0;
let maxActive = 0;

async function fakeFn(x) {
  active++;
  maxActive = Math.max(maxActive, active);
  await wait(100);
  active--;
  return x * 10;
}

const start = performance.now();
const out = await inBatches([1, 2, 3, 4, 5], 2, fakeFn);
const ms = performance.now() - start;

console.log("الترتيب:", JSON.stringify(out), JSON.stringify(out) === "[10,20,30,40,50]");
console.log("أكبر active:", maxActive, maxActive === 2);
console.log("الوقت بين 250 و 400ms (٣ دفعات):", Math.round(ms / 100) * 100 + "ms تقريبًا", ms >= 250 && ms < 400);
~~~

ونسخة بايظة نجرّب عليها إن الاختبار بيمسكها:

~~~js batches-broken.js
// نسخة بايظة: بتشغّل الكل مع بعض وتتجاهل size
export async function inBatches(items, size, fn) {
  return Promise.all(items.map(fn));
}
~~~

~~~text الناتج (node test-batches.js، ثم node test-batches.js ./batches-broken.js)
الترتيب: [10,20,30,40,50] true
أكبر active: 2 true
الوقت بين 250 و 400ms (٣ دفعات): 300ms تقريبًا true
--- على النسخة البايظة:
الترتيب: [10,20,30,40,50] true
أكبر active: 5 false
الوقت بين 250 و 400ms (٣ دفعات): 100ms تقريبًا false
~~~

**ليه كده:**

- **[[fakeFn]] بتعدّ مين شغال دلوقتي:** [[active++]] قبل الـ await و [[active--]] بعده، و [[maxActive]] بتحفظ أعلى رقم وصله. ده بيقيس «كام واحد كان شغال في نفس اللحظة» من غير ما نبص على الكود.
- **الترتيب:** بنقارن الـ JSON كنص، فأي ترتيب تاني بيفشل.
- **أكبر active = 2:** مع [[size]] 2. النسخة البايظة طلّعت 5 (الكل مع بعض) ففشلت.
- **الوقت بين 250 و 400ms:** ٣ دفعات × 100ms. التمرين كان طالب «أقل من 400ms» بس، فجرّبناه الأول كده: النسخة البايظة خلصت في 100ms وعدّت شرط «أقل من 400» عادي! فزوّدنا حد أدنى 250ms، عشان «أسرع من اللازم» كمان علامة إن الـ size اتجاهل.
- **[[performance.now()]]:** أدق من [[Date.now()]] (فيها كسور ملي ثانية).

**الغلطة الشائعة:** اختبار بيفحص الناتج بس. النسخة البايظة طلّعت نفس الناتج بالظبط ([[true]] في أول سطر)، والفرق كله في **إزاي** اشتغلت. عشان كده محتاج عدّاد [[active]].` }
          ],
          ref: [
            { t: "MDN: for await...of", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of" },
            { t: "MDN: Array.fromAsync()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync" },
            { t: "MDN: Promise.all()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all" },
          ],
          pre: [{ to: "js/map و filter و reduce", why: R`[[ids.map(save)]] اللي بيرجّع array من Promises هو أساس الحل الصح` }],
          flag: "script",
          deep: {
            why: "bug منتشر جدًا: «بحفظ كل العناصر وبعدين أبعت رسالة نجاح»، والرسالة بتطلع قبل الحفظ، أو الـ error بيضيع ومحدش يعرف إن نص العناصر متحفظتش.",
            how: R`[[forEach]] و [[map]] و [[filter]] مبيعرفوش حاجة عن Promises. الـ async callback بيرجّع Promise، و forEach بترميه. و [[filter(async ...)]] أسوأ: كل Promise object truthy، فكل العناصر بتعدّي.

[[for...of]] جوه async function بيستنى كل لفة، فالعمليات ورا بعض. مفيد لما الترتيب مهم، أو كل واحدة معتمدة على اللي قبلها، أو عايز ترحم السيرفر.

[[Promise.all(arr.map(...))]] بيبدأ الكل مرة واحدة ويستناهم. أسرع، بس ممكن يضرب rate limit أو connection pool في قاعدة البيانات.

الـ batches حل وسط: كل مرة n بس. و [[Array.fromAsync]] (ES2026، بس موجودة في Node 22 والمتصفحات الحديثة من بدري) بتعمل array من async iterable أو بتستنى كل عنصر بالترتيب.

و [[for await (const x of stream)]] للـ async iterables زي streams وقراية ملف سطر سطر.`,
            when: R`for...of للترتيب أو الاعتمادية. Promise.all للعمليات المستقلة القليلة. batches للكتير. ومتستخدمش forEach مع async أبدًا.`,
            mistakes: R`async في forEach أو filter. و [[await]] جوه for...of لعمليات مستقلة فتبطّأ من غير سبب. و Promise.all على ١٠ آلاف insert. وفي الانترفيو: «إيه المشكلة في الكود ده؟» على forEach مع await.`
          },
          teach: R`## الكود ده بيعمل إيه؟

بيحفظ ٣ عناصر بدالة [[save]] بتاخد 100ms، بـ ٥ طرق: [[forEach]] (غلط)، و [[for...of]] (واحد ورا واحد)، و [[Promise.all]] (كلهم مع بعض)، و batches (اتنين اتنين)، و [[Array.fromAsync]]. اتشغّل في Node 24 كملف [[.mjs]]، وقدام كل سطر مطبوع الوقت من أول البرنامج.

---

## ١. التجهيز

~~~text app.mjs
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => { await wait(100); console.log("saved", id); return id; };
const ids = [1, 2, 3];
~~~

- [[wait(ms)]]: Promise بيخلص بعد ms (درس Promise).
- [[save]]: async arrow function: بتستنى 100ms (كأنها بتكلم قاعدة بيانات)، وتطبع، وترجّع الـ id.

---

## ٢. [[forEach]]: مبتستناش

~~~text app.mjs
ids.forEach(async (id) => { await save(id); });
console.log("forEach خلصت؟ لأ، لسه محدش اتحفظ");
~~~

- [[forEach]] بتنادي الـ callback لكل عنصر. الـ callback هنا [[async]]، فبيرجّع Promise.
- بس forEach **بترمي** اللي الـ callback بيرجّعه، ومبتستناش حاجة. هي نفسها بترجّع [[undefined]] (طبعناها).

~~~text الناتج
   2ms forEach خلصت؟ لأ، لسه محدش اتحفظ | forEach رجّعت: undefined
 109ms saved 1
 110ms saved 2
 110ms saved 3
~~~

السطر اللي بعد forEach اتطبع عند 2ms، قبل أي حفظ. والـ ٣ اتحفظوا مع بعض بعد كده، ومحدش استناهم.

---

## ٣. [[for...of]]: واحد ورا واحد

~~~text app.mjs
for (const id of ids) {
  await save(id);
}
~~~

- [[for (const id of ids)]]: لف على عناصر الـ array، وكل لفة id بقيمة عنصر.
- [[await]] جوه الـ loop: الـ loop **نفسها** بتقف لحد ما save تخلص، وبعدين تروح للفة اللي بعدها.

~~~text الناتج
 266ms saved 1
 376ms saved 2
 484ms saved 3
~~~

كل واحد بعد اللي قبله بـ 100ms تقريبًا: 300ms كلهم. ده الصح لو الترتيب مهم، أو كل عملية محتاجة اللي قبلها.

---

## ٤. [[Promise.all]] مع [[map]]: كلهم مع بعض

~~~text app.mjs
const saved = await Promise.all(ids.map((id) => save(id)));
~~~

من جوه لبرّه:

1. [[ids.map((id) => save(id))]]: map بتنادي save لكل عنصر **فورًا**، وبترجّع array فيها ٣ Promises. (map زي forEach مبتستناش، بس على الأقل بترجّع الـ Promises.)
2. [[Promise.all([...])]]: Promise واحد بيستنى الـ ٣.
3. [[await]]: استنى، وهات النتايج بالترتيب.

~~~text الناتج
 592ms saved 1
 592ms saved 2
 593ms saved 3
 593ms saved = [ 1, 2, 3 ]
~~~

الـ ٣ في نفس اللحظة: 100ms كلهم. أسرع، بس لو عندك ١٠ آلاف عنصر، هتبعت ١٠ آلاف طلب في نفس الوقت.

---

## ٥. batches: اتنين اتنين

~~~text app.mjs
for (let i = 0; i < ids.length; i += 2) {
  await Promise.all(ids.slice(i, i + 2).map(save));
}
~~~

- [[for (let i = 0; i < ids.length; i += 2)]]: loop عادية بس بتزوّد i اتنين كل لفة: i = 0 ثم 2.
- [[ids.slice(i, i + 2)]]: هات العناصر من i لحد قبل i + 2. فأول لفة [[slice(0, 2)]] = 1 و 2، والتانية [[slice(2, 4)]] = 3 بس (مفيش رابع).
- [[.map(save)]]: نفس [[.map((id) => save(id))]]، بنبعت الدالة نفسها.
- [[await Promise.all(...)]]: استنى الدفعة كلها قبل اللي بعدها.

~~~text الناتج
 702ms saved 1
 702ms saved 2
 812ms saved 3
~~~

1 و 2 مع بعض، وبعد 100ms الـ 3. حل وسط: سريع، ومش بتضرب السيرفر بكل حاجة مرة واحدة.

---

## ٦. [[Array.fromAsync]]

~~~text app.mjs
const all = await Array.fromAsync(ids, async (id) => save(id));
~~~

بتلف على ids، وتنادي الدالة لكل عنصر، و**تستنى كل واحد قبل اللي بعده**، وترجّع array بالنتايج:

~~~text الناتج
 921ms saved 1
1030ms saved 2
1139ms saved 3
1139ms all = [ 1, 2, 3 ]
~~~

يعني زي for...of بالظبط، بس بترجّع array في سطر واحد.

---

## ٧. لو save فشلت (التجربة والـ solCode)

خلّينا save ترمي error لـ id 2:

~~~text app.mjs
try {
  for (const id of ids) await save(id);
} catch (e) { console.log("for...of:", e.message); }
try {
  await Promise.all(ids.map(save));
} catch (e) { console.log("Promise.all:", e.message); }
~~~

~~~text الناتج
saved 1
for...of: فشل حفظ 2
saved 1
Promise.all: فشل حفظ 2
saved 3
~~~

- **for...of**: الـ catch مسك الـ error، والـ loop وقفت، فـ 3 **متحفظش**.
- **Promise.all**: الـ catch مسك أول فشل، بس [[saved 3]] اتطبعت **بعده**: الـ ٣ كانوا بدأوا خلاص، و Promise.all بتفشل من غير ما تلغي الباقي.

وجرّبنا **forEach** بنفس الـ save جوه try:

~~~text الناتج: Node
مفيش error هنا
saved 1
file:///C:/Users/ali/code/app.mjs:2
...
Error: فشل حفظ 2

Node.js v24.19.0
~~~

الـ try **مامسكش حاجة** (السطر اللي بعد forEach اتطبع عادي)، والـ error طلع unhandled rejection، و Node قفل البرنامج بـ exit code 1 قبل ما يوصل لـ saved 3. وفي Chrome نفس الكود طبع [[saved 1]] و [[saved 3]]، والـ error ظهر أحمر في Console ومحدش مسكه.

---

## الخلاصة

| الطريقة | الوقت (3 × 100ms) | الترتيب | الـ error |
|---|---|---|---|
| [[forEach(async ...)]] | مبتستناش خالص | مع بعض ومحدش مستني | بيضيع (unhandled) |
| [[for...of]] + await | ~300ms | واحد ورا واحد | try بيمسكه والباقي يقف |
| [[Promise.all(map)]] | ~100ms | مع بعض | try بيمسكه، والباقي يكمّل |
| batches | ~200ms | n في المرة | زي Promise.all جوه كل دفعة |
| [[Array.fromAsync]] | ~300ms | واحد ورا واحد | try بيمسكه والباقي يقف (اتجرّبت) |

- **متستخدمش forEach مع async أبدًا**. ونفس المشكلة في [[filter(async ...)]]: جرّبناها و رجّعت الـ ٣ عناصر كلهم، لأن كل Promise بيعتبر true.`,
          lines: [
            R`[[wait]] بترجّع Promise بيخلص بعد ms، وبنستخدمها نقلّد وقت حفظ حقيقي على سيرفر.`,
            R`[[save]] حفظ وهمي: بيستنى ١٠٠ms، يطبع «saved» والـ id، ويرجّعه. كده نشوف بالطباعة الترتيب والوقت لكل طريقة loop.`,
            R`٣ ids هنحفظهم بأكتر من طريقة ونقارن.`,
            R`[[forEach]] بتنادي الدالة لكل عنصر بس مبتستناش الـ Promise اللي بترجّعه، فالتلاتة بيبدأوا مع بعض والـ loop بتخلص على طول. ومينفعش تعمل [[await]] على [[forEach]] نفسها لأنها بترجّع [[undefined]].`,
            R`السطر ده بيتطبع قبل أي «saved»، وده الدليل إن [[forEach]] مستنتش. لو بعدها كود معتمد إن الحفظ خلص، هيشتغل على داتا لسه متحفظتش.`,
            R`[[for...of]] بتحترم [[await]]: اللفة الجاية مش بتبدأ غير لما اللي قبلها تخلص. استخدمها لما الترتيب مهم أو السيرفر مش هيستحمل طلبات كتير مع بعض.`,
            R`كل حفظ بيستنى اللي قبله، فالتلاتة بياخدوا ٣٠٠ms تقريبًا، وبيتطبعوا 1 و 2 و 3 بالترتيب.`,
            R`نهاية [[for...of]].`,
            R`[[map]] بتبدأ التلاتة مع بعض وترجّع array Promises، و [[Promise.all]] تستناهم. الوقت ١٠٠ms تقريبًا بدل ٣٠٠، والنتايج بترتيب الـ ids. بس لو واحد فشل الكل بيترفض.`,
            R`batches: [[i]] بيزيد ٢ كل لفة، فبنشتغل على دفعات ٢ في المرة. ده الحل الوسط لما الـ ids كتير وعايز سرعة من غير ما تضرب السيرفر بألف طلب مرة واحدة.`,
            R`[[slice]] بتاخد الدفعة الحالية (عنصرين)، و [[Promise.all]] بتشغّلهم مع بعض، و [[await]] بيستناهم قبل الدفعة اللي بعدها.`,
            R`نهاية loop الـ batches.`,
            R`[[Array.fromAsync]] بتعدّي على العناصر وتستنى دالة الـ map لكل عنصر قبل اللي بعده (ورا بعض زي [[for...of]])، وترجّع array النتايج. موجودة في Node 22 والمتصفحات الحديثة.`
          ],
          sol: R`مع [[console.time]]: forEach بتقول حوالي 0ms لأنها مبتستناش أي حاجة (الحفظ بيحصل بعدين)، و for...of حوالي 300ms، و Promise.all حوالي 100ms.

لما save ترمي لـ id 2: مع forEach الـ error مش بيتمسك بأي try/catch حواليها، وبيطلع unhandled rejection: Node بيقفل البرنامج بـ exit code 1 قبل ما id 3 يتحفظ، وفي المتصفح id 3 بيتحفظ عادي والـ error بيظهر أحمر في Console. مع for...of الـ try/catch بيمسكه، و id 3 مبيتحفظش لأن الـ loop وقفت. مع Promise.all الـ catch بيمسكه بعد 100ms، بس id 3 بيتحفظ برضه لأن الـ promises كانت بدأت كلها، و Promise.all بترفض عند أول فشل من غير ما تلغي الباقي. لو عايز كل النتايج استخدم allSettled.`,
          solCode: R`const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const save = async (id) => {
  await wait(100);
  if (id === 2) throw new Error("فشل حفظ " + id);
  console.log("saved", id);
};
const ids = [1, 2, 3];
try {
  for (const id of ids) await save(id); // saved 1 ثم يقف
} catch (e) { console.log("for...of:", e.message); }
try {
  await Promise.all(ids.map(save));     // saved 1 و saved 3، والـ catch بيمسك 2
} catch (e) { console.log("Promise.all:", e.message); }`
        }
      ]
    }
]);

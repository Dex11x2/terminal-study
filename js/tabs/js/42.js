// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`المكتبات والفريموركات: تستخدم كود غيرك إمتى وإزاي`,
      l: 3,
      time: R`حوالي ٧ ساعات`,
      n: R`انت كتبت كل حاجة بإيدك لحد دلوقتي. الوحدة دي عن الناحية التانية: كود غيرك. تجيبه إزاي (npm و CDN بـ URL متثبت و SRI ونسخ ملف)، وتقيس هو بيوفّر قد إيه وبيكلّف قد إيه بالبايت، والفرق الحقيقي بين library و framework (مين بينادي مين)، وليه الفريموركات بتوفّر وقت وليه السوق بيطلبها (بأرقام من مصادرها)، وإمتى تبقى اختيار غلط: الحجم والتحديثات والـ accessibility في الـ SPA. وبعدين تفحص أي dependency قبل ما تدخل مشروعك بأوامر npm حقيقية، وتكتب مكتبتك الصغيرة صح وتعملها [[npm pack]]. الوحدة مش بتعلّم framework: React و Vue و Angular ليهم كورسات، وهنا بتتعلم تختار وتقرر.`,
      pre: [
        { to: "start/المكتبة والفريمورك", why: R`أول تعريف لـ library و package و framework، و [[npm init]] و [[npm install]]. هنا بنروح أبعد بكتير` },
        { to: "js/import و export", why: R`كل مكتبة هنا بتتجاب بـ [[import]]، ومكتبتك بتطلّع API بـ [[export]]` },
        { to: "node/package-lock و npm ci", why: R`الـ lockfile و [[npm ci]] اللي بيخلّوا التسطيب يتكرر بالظبط` },
        { to: "js/customElements.define", why: R`components من غير framework: الحل اللي جوه المتصفح نفسه` },
        { to: "js/شاشات من غير إعادة تحميل", why: R`الـ routing اللي عملته بإيدك، وهنا مشاكله اللي الفريموركات بتحلها (والـ accessibility)` },
        { to: "js/قسّمه لملفات", why: R`تقسيم الكود لـ modules، أول خطوة قبل ما تحوّل جزء منه لمكتبة` },
      ],
      goal: [
        R`تجيب مكتبة بـ ٣ طرق (npm و CDN بنسخة متثبتة و SRI ونسخ ملف) وتعرف إمتى كل واحدة، وتقيس الفرق بينها وبين الحل بإيدك بالسطور والبايت.`,
        R`تفرّق بين library و framework بسؤال واحد (مين بينادي مين)، وتعرف opinionated من unopinionated، وتختار بينهم لمشروع حقيقي.`,
        R`تعرف ليه الفريموركات بتوفّر وقت (الحالة والشاشات والـ components) وتقرا أرقام السوق من مصدرها بدل الكلام المرسل، وتعرف إمتى تبقى غلط بالأرقام: الحجم، والتحديثات الكبيرة، والـ accessibility.`,
        R`تفحص أي dependency بـ [[npm view]] و [[npm ls]] و [[npm audit]] و [[npm install-scripts]] والـ lockfile، وتكشف typosquatting والـ packages المهجورة.`,
        R`تكتب مكتبة صغيرة بـ API واضح من غير globals، وبـ JSDoc و tests و [[exports]] و [[files]]، وتعملها [[npm pack]] وتستخدمها من مشروع تاني.`,
      ],
      use: {
        prog: R`كل مشروع حقيقي فيه dependencies. القرارات اليومية: أسطّب المكتبة دي ولا أكتب ٢٠ سطر؟ النسخة دي آمنة؟ الـ CDN ده ممكن يتغير من تحتي؟ الصفحة دي محتاجة React أصلًا؟ والباجات المشهورة: [[npm audit]] بيقولك high، و [[npm ci]] بيرفض، واسم package مكتوب غلط، ومكتبتك بتنشر ملفات الاختبار.`,
        work: R`مراجعة PR بيزوّد dependency، واختيار stack لمشروع جديد، وكتابة decision record، وتحديث major version في مشروع قديم، والرد على تقرير أمني. وفي الانترفيو: «الفرق بين library و framework؟» و «إزاي بتختار package؟».`,
        cs: R`inversion of control (الـ framework هو اللي بينادي كودك)، و semantic versioning، و supply-chain security (typosquatting و install scripts و SRI)، و API design (سطح صغير، من غير side effects)، و trade-offs بالأرقام.`,
      },
      items: [
        {
          cmd: "كود غيرك: npm و CDN ونسخ ملف",
          title: "تجيب كود غيرك إزاي، وبيوفّر إيه وبيكلّف إيه: نفس المهمة بمكتبة وبإيدك، بالسطور والبايت",
          desc: R`كود غيرك (third-party code) هو أي كود مكتوب برّه مشروعك وانت بتستخدمه: package من npm، أو ملف من CDN، أو ملف ناسخه في الفولدر. الدرس بيعمل نفس المهمة مرتين (مكتبة [[dayjs]] و Intl بإيدك) ويقيس الفرق.

٣ طرق تجيب بيها كود غيرك:
• **npm:** [[npm install dayjs]] بينزّلها في [[node_modules]] ويسجّلها في [[package.json]]، وبعدين [[import]] وأداة build.
• **CDN:** [[<script type="module">]] بيعمل [[import]] من URL زي [[https://cdn.jsdelivr.net/npm/dayjs@1.11.23/+esm]]، من غير تسطيب. لازم **النسخة في الـ URL**، ومع [[<script src>]] كمان [[integrity]] (SRI).
• **نسخ الملف:** تحط [[dayjs.min.js]] جوه مشروعك ([[vendor/]]) وتكتب نسخته في الاسم.

وليه الناس بتستخدمه أصلًا؟ **الكفاءة** (وقت أقل)، و **التوافق** (المكتبة بتحل اختلافات المتصفحات والحالات الطرفية)، و **الـ ecosystem والدعم** (plugins ولغات وناس بتصلّح الباجات). وكل ده بيتدفع تمنه بايتات وصيانة.`,
          example: R`import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "dayjs/locale/ar.js";
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale("ar");
const now = dayjs("2026-11-21T12:00:00");
console.log(dayjs("2026-11-21T09:00:00").from(now));
console.log(dayjs("2026-11-14T12:00:00").from(now));
const due = dayjs("05/12/2026", "DD/MM/YYYY", true);
console.log(due.isValid(), due.format("YYYY-MM-DD"));
console.log(dayjs("31/02/2026", "DD/MM/YYYY", true).isValid());`,
          try: R`في فولدر جديد: [[npm init -y]] و [[npm pkg set type=module]] و [[npm install dayjs]]، واحفظ المثال كـ [[with-lib.mjs]] وشغّله. وبعدين جرّب [[node -e "console.log(String(new Date('05/12/2026')))"]] وشوف [[Date]] فهم التاريخ إزاي، وقارنه بسطر [[due]] في المثال.`,
          sol: R`~~~text الناتج (Node 24.22، dayjs 1.11.23): node with-lib.mjs
منذ 3 ساعات
منذ 7 أيام
true 2026-12-05
false
~~~

~~~text الناتج (Node 24.22 على Windows، توقيت الجهاز صيفي)
Tue May 12 2026 00:00:00 GMT+0300 (Eastern European Summer Time)
~~~

[[new Date("05/12/2026")]] فهمها **١٢ مايو** (الشكل الأمريكي شهر/يوم)، مش ٥ ديسمبر. ومفيش أي error. و [[dayjs("05/12/2026", "DD/MM/YYYY", true)]] فهمها صح لأنك قلتلها الشكل. ده مثال حقيقي على «المكتبة بتحل الحالات الطرفية».`,
          practice: [
            { lvl: 'سريع', t: R`**اختار الطريقة:** لكل موقف، npm ولا CDN ولا نسخ ملف؟ وليه؟ (١) صفحة HTML واحدة على GitHub Pages من غير أي build. (٢) تطبيق React بـ Vite. (٣) نظام داخلي في شركة على جهاز مفيهوش إنترنت. (٤) سكربت Node بيشتغل كل يوم على السيرفر.`, done: R`كل موقف ليه طريقة وسبب، وعارف إن الـ CDN لازم نسخة متثبتة في الـ URL.`, sol: R`| الموقف | الطريقة | ليه |
|---|---|---|
| صفحة HTML من غير build | CDN بنسخة متثبتة ([[dayjs@1.11.23]]) و SRI | مفيش [[node_modules]] ولا bundler. الـ URL المتثبت jsDelivr بيرجّعه بـ [[max-age=31536000, immutable]] (سنة)، ومن غير نسخة بيرجّع [[max-age=604800]] (أسبوع) والمحتوى ممكن يتغير |
| تطبيق React بـ Vite | npm | الـ bundler بيشيل اللي مش مستخدم ويدمج كله في ملف، والـ lockfile بيثبّت النسخة لكل الفريق |
| نظام داخلي من غير إنترنت | نسخ الملف ([[vendor/dayjs-1.11.23.min.js]]) | مفيش CDN يوصله، والنسخة مكتوبة في الاسم عشان تعرف تحدّث إمتى. جرّبنا: الملف من [[node_modules]] (7161 بايت) هو نفسه بالبايت اللي على الـ CDN ([[cmp]] قال متطابقين) |
| سكربت Node على السيرفر | npm و [[npm ci]] | نفس النسخ بالظبط كل مرة من الـ lockfile، و [[npm audit]] بيفحصها |

**الغلطة الشائعة:** [[https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js]] من غير نسخة. شغّال النهارده (جرّبناه: 200 و 7161 بايت)، بس بكرة ممكن يجيب 2.0 بـ breaking changes من غير ما تغيّر ولا حرف في صفحتك.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** اكتب التاريخ [[2026-11-21]] بالعربي بالشكل الطويل (اسم اليوم والشهر) مرة بـ [[dayjs]] و locale [[ar]]، ومرة بـ [[Intl.DateTimeFormat]] من غير مكتبة. وقيس حجم كل واحدة في bundle مصغّر.`, done: R`الاتنين بيطبعوا «السبت ٢١ نوفمبر ٢٠٢٦» بشكل قريب، ورقمين الحجم قدامك، وعارف ليه الفرق كبير كده.`, sol: R`~~~js fmt-lib.mjs
import dayjs from "dayjs";
import "dayjs/locale/ar.js";
console.log(dayjs("2026-11-21").locale("ar").format("dddd D MMMM YYYY"));
~~~

~~~js fmt-intl.mjs
const fmt = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full" });
console.log(fmt.format(new Date("2026-11-21T12:00:00")));
~~~

~~~text الناتج (Node 24.22)
السبت 21 نوفمبر 2026
السبت، ٢١ نوفمبر ٢٠٢٦
~~~

القياس بسكربت [[measure.mjs]] من درس «إمتى framework غلط» (esbuild 0.28.2 بيعمل bundle مصغّر ويقيسه خام وبعد gzip):

~~~text الناتج: node measure.mjs src/fmt-lib.mjs src/fmt-intl.mjs
src/fmt-lib.mjs    10523 B    4234 B gzip
src/fmt-intl.mjs     114 B     126 B gzip
~~~

- [[Intl.DateTimeFormat]] جوه المتصفح و Node أصلًا، فالـ bundle فيه سطرينك بس (١١٤ بايت). و dayjs بيضيف المكتبة نفسها و ملف اللغة العربي (حوالي ١٠ KB خام).
- Intl بيكتب الأرقام عربي ([[٢١]]) وبيحط فاصلة بعد اليوم، و dayjs بيكتبها إنجليزي. لو عايز أرقام عربي في dayjs محتاج تحويل زيادة.
- **الدرس:** قبل ما تسطّب مكتبة لحاجة، شوف المنصة فيها إيه. التنسيق بقى في Intl، والحسابات المعقدة (zones، و «أول الشهر الجاي») لسه المكتبة أو Temporal أسهل فيها (درس «date-fns و dayjs و Temporal»).` },
            { lvl: 'تطبيق', t: R`**صلّح:** الصفحة دي بتحمّل dayjs كده: [[<script src="https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js"></script>]]. فيها مشكلتين. صلّحهم، واحسب الـ SRI hash بنفسك بـ Node، وجرّب تغيّر حرف في الـ hash وشوف المتصفح بيعمل إيه.`, done: R`الـ URL فيه [[@1.11.23]]، والـ tag فيه [[integrity="sha384-..."]] و [[crossorigin="anonymous"]]، والصفحة شغالة، ولما غيّرت الـ hash المتصفح رفض الملف ورسالته في الـ Console.`, sol: R`~~~bash
curl -s https://cdn.jsdelivr.net/npm/dayjs@1.11.23/dayjs.min.js -o dayjs.min.js
node -e 'const c=require("node:crypto");const b=require("node:fs").readFileSync("dayjs.min.js");console.log("sha384-"+c.createHash("sha384").update(b).digest("base64"))'
~~~

~~~text الناتج
sha384-1Ft4/JTNbt7S/44V0himpcjx+YfQ1a6W6SYBJMr94ba6jwZhWoWoLaZsMmtJILgq
~~~

~~~html ok.html
<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>cdn</title>
<p id="classic">…</p><p id="mod">…</p>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.23/dayjs.min.js" integrity="sha384-1Ft4/JTNbt7S/44V0himpcjx+YfQ1a6W6SYBJMr94ba6jwZhWoWoLaZsMmtJILgq" crossorigin="anonymous"></script>
<script>document.querySelector("#classic").textContent = typeof dayjs === "function" ? dayjs("2026-11-21").add(1, "month").format("YYYY-MM-DD") : "مفيش dayjs";</script>
<script type="module">
  import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.23/+esm";
  document.querySelector("#mod").textContent = dayjs("2026-01-31").add(1, "month").format("YYYY-MM-DD");
</script>
</html>
~~~

~~~text اللي ظهر في الصفحة (Chrome 157)
2026-12-21
2026-02-28
~~~

ولما غيّرنا أول ٤ حروف في الـ hash، السطر الأول بقى «مفيش dayjs» والـ Console كتب:

~~~text Console
Failed to find a valid digest in the 'integrity' attribute for resource 'https://cdn.jsdelivr.net/npm/dayjs@1.11.23/dayjs.min.js' with computed SHA-384 integrity '1Ft4/JTNbt7S/44V0himpcjx+YfQ1a6W6SYBJMr94ba6jwZhWoWoLaZsMmtJILgq'. The resource has been blocked.
~~~

- **المشكلة ١: مفيش نسخة.** [[dayjs/dayjs.min.js]] = «آخر نسخة»، وبيتكاش أسبوع بس. [[dayjs@1.11.23]] متثبت ومتكاش سنة.
- **المشكلة ٢: مفيش SRI.** لو حد اخترق الـ CDN وغيّر الملف، صفحتك هتشغّل كوده. [[integrity]] = بصمة (hash) الملف، والمتصفح بيحسبها ويرفض أي ملف بصمته مختلفة. و [[crossorigin="anonymous"]] لازم معاه عشان المتصفح يقدر يقرا الملف من دومين تاني ويحسب بصمته.
- **الـ module من [[+esm]]:** الـ [[import]] من URL مبيقبلش [[integrity]] جوه الكود نفسه. لو عايز SRI مع modules: [[<script type="importmap">]] فيه [[integrity]]، أو انسخ الملف عندك.` },
            { lvl: 'تحدي', t: R`**ابني بالطريقتين:** [[daysUntil("25/12/2026")]] بترجّع عدد الأيام من النهارده ([[2026-11-21]]) للتاريخ ده، وبترجّع [[null]] للتواريخ الغلط ([[31/02/2026]]) والشكل الغلط ([[2026-12-25]] و [[5/12/2026]]). اكتبها مرة بـ dayjs و [[customParseFormat]] ومرة من غير مكتبة، وقارن النتايج على ٦ حالات.`, done: R`الدالتين بيطلّعوا نفس الأرقام في الـ ٦ حالات ([[34]] و [[0]] و [[41]] و ٣ [[null]])، وعارف أنهي حتة في نسختك كانت سهل تغلط فيها.`, sol: R`~~~js days-until.mjs
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

export function daysUntilLib(text, today = "2026-11-21") {
  const due = dayjs(text, "DD/MM/YYYY", true);
  if (!due.isValid()) return null;
  return due.diff(dayjs(today), "day");
}

export function daysUntilHand(text, today = "2026-11-21") {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!m) return null;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const due = Date.UTC(y, mo - 1, d);
  const check = new Date(due);
  if (check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d) return null;
  const [ty, tm, td] = today.split("-").map(Number);
  return Math.round((due - Date.UTC(ty, tm - 1, td)) / 86400000);
}

for (const t of ["25/12/2026", "21/11/2026", "01/01/2027", "31/02/2026", "2026-12-25", "5/12/2026"]) {
  console.log(t.padEnd(11), daysUntilLib(t), daysUntilHand(t));
}
~~~

~~~text الناتج (Node 24.22): node days-until.mjs
25/12/2026  34 34
21/11/2026  0 0
01/01/2027  41 41
31/02/2026  null null
2026-12-25  null null
5/12/2026   null null
~~~

- **نسخة المكتبة:** [[dayjs(text, "DD/MM/YYYY", true)]]. الـ [[true]] الأخيرة = strict: الشكل لازم يطابق بالظبط، و [[31/02]] مش صالح. و [[diff(..., "day")]] بيعدّ الأيام.
- **نسختك:** ٣ فخاخ كان لازم تفتكرها: الشهر في [[Date.UTC]] من 0 ([[mo - 1]])، و [[Date]] بيقبل ٣١ فبراير ويحوّله لـ ٣ مارس من غير ما يقول (عشان كده بنرجع نتأكد إن الشهر واليوم زي ما هما)، والتوقيت الصيفي بيخلي يوم ٢٣ أو ٢٥ ساعة لو استخدمت التوقيت المحلي (عشان كده [[Date.UTC]] والـ [[Math.round]]).
- **الحساب:** نسختك ١٥ سطر وصفر بايت مكتبة، والمكتبة ٦ سطور. الفرق مش في السطور: في الفخاخ اللي المكتبة شالتها عنك ومختبرة على ملايين المستخدمين (dayjs اتحمّلت 116,841,075 مرة في الأسبوع من 13 لـ 19 نوفمبر 2026، من [[api.npmjs.org]]).` },
          ],
          flag: "script",
          deep: {
            why: R`محدش بيكتب كل حاجة. حتى المشاريع الصغيرة فيها أدوات build و tests ومكتبات. والسؤال مش «أستخدم كود غيري ولا لأ» لكن «لأنهي حاجة، وبأنهي طريقة، وبتكلّفني إيه». والطريقة اللي بتجيب بيها الكود بتفرق في الأمان (CDN من غير نسخة ولا SRI = كود حد تاني بيتغير في صفحتك) وفي الصيانة (ملف منسوخ من غير نسخته = محدش يعرف يحدّثه).`,
            how: R`**npm:** [[npm install]] بيسأل الـ registry ([[registry.npmjs.org]]) عن آخر نسخة بتطابق الـ range، وبينزّل الـ tarball في [[node_modules]]، ويكتب الـ range في [[package.json]] ([[^1.11.23]]) والنسخة بالظبط في [[package-lock.json]]. وأداة الـ build (Vite أو esbuild) بتدمج اللي عملتله [[import]] في ملف واحد للمتصفح.

**CDN:** jsDelivr و unpkg بيخدموا أي ملف من أي package على npm بـ URL. [[+esm]] بيحوّل الـ package لـ ES module يتعمله [[import]] في المتصفح على طول (جرّبنا: 7448 بايت). والنسخة الكاملة في الـ URL بتخلي الملف مبيتغيرش أبدًا، فبيتكاش سنة.

**SRI:** [[integrity="sha384-<base64>"]] هو SHA-384 لمحتوى الملف. المتصفح بيحمّل الملف ويحسب الـ hash، ولو مختلف بيرفضه بالرسالة اللي في التمرين.`,
            when: R`npm لأي مشروع فيه build أو Node. CDN بنسخة متثبتة و SRI لصفحة static أو تجربة سريعة. نسخ الملف لما مفيش إنترنت أو مفيش npm، أو لملف صغير مش هيتغير. والأهم: قبل أي واحدة من التلاتة، شوف المنصة فيها الحاجة دي ولا لأ (Intl و [[fetch]] و [[structuredClone]] و [[URL]] و [[crypto.randomUUID]]).`,
            mistakes: R`CDN من غير نسخة في الـ URL. و [[integrity]] من غير [[crossorigin]]. ومكتبة كاملة لحاجة واحدة صغيرة (١٠ KB عشان تكتب تاريخ). وملف منسوخ اسمه [[lib.js]] من غير نسخته ولا مصدره. والاعتماد على [[new Date("05/12/2026")]] لتواريخ مكتوبة يوم/شهر. ورفع [[node_modules]] على Git بدل [[package-lock.json]].`
          },
          teach: R`## الفكرة

مهمتين حقيقيتين في أي تطبيق مواعيد: «من قد إيه» (منذ ٣ ساعات) و «اقرا تاريخ مكتوب [[05/12/2026]]». المثال بيعملهم بمكتبة [[dayjs]]، وبعدين بنعملهم بإيدك ونقيس الفرق بالسطور والبايت. الكل اتشغّل بـ Node 24.22 و npm 11.19 على Windows يوم ٢١ نوفمبر 2026، و dayjs 1.11.23.

---

## ١. التسطيب من npm

~~~powershell
mkdir due-dates
cd due-dates
npm init -y
npm pkg set type=module
npm install dayjs
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[npm init -y]] | بيعمل [[package.json]] بالإجابات الافتراضية |
| [[npm pkg set type=module]] | بيكتب [[ "type": "module" ]] في [[package.json]] عشان [[import]] يشتغل في ملفات [[.js]] |
| [[npm install dayjs]] | بينزّل آخر نسخة في [[node_modules/dayjs]] ويسجّلها في [[dependencies]] |

~~~text الناتج
added 1 package, and audited 2 packages in 2s

found 0 vulnerabilities
~~~

و [[package.json]] بقى فيه [[ "dayjs": "^1.11.23" ]]. الـ package كلها ١.٨ MB على الديسك: فيها ١٤٣ ملف لغة و ٣٧ plugin. ده الـ **ecosystem**: لغات و plugins جاهزة، وانت بتاخد منهم اللي محتاجه بس.

---

## ٢. المثال سطر سطر

~~~text with-lib.mjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "dayjs/locale/ar.js";
~~~

- [[import dayjs from "dayjs"]]: هات الدالة الأساسية. [[from "dayjs"]] من غير [[./]] معناها «من [[node_modules]]».
- السطرين التانيين: plugins. dayjs الأساسية صغيرة، وأي ميزة زيادة plugin لوحده عشان متدفعش تمن حاجة مش محتاجها.
- [[import "dayjs/locale/ar.js"]] من غير اسم: بيشغّل الملف وبس، والملف بيسجّل اللغة العربي جوه dayjs.

~~~text with-lib.mjs
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale("ar");
~~~

[[extend]] بيركّب الـ plugin، و [[locale("ar")]] بيخلي العربي اللغة الافتراضية.

~~~text with-lib.mjs
const now = dayjs("2026-11-21T12:00:00");
console.log(dayjs("2026-11-21T09:00:00").from(now));
console.log(dayjs("2026-11-14T12:00:00").from(now));
~~~

[[from(now)]] (من الـ plugin) بيكتب المسافة بين التاريخين بالكلام. ثبّتنا [[now]] عشان الناتج يتكرر.

~~~text الناتج
منذ 3 ساعات
منذ 7 أيام
~~~

~~~text with-lib.mjs
const due = dayjs("05/12/2026", "DD/MM/YYYY", true);
console.log(due.isValid(), due.format("YYYY-MM-DD"));
console.log(dayjs("31/02/2026", "DD/MM/YYYY", true).isValid());
~~~

- [["DD/MM/YYYY"]]: قول للمكتبة الشكل: يوم/شهر/سنة.
- [[true]]: strict، الشكل لازم يطابق بالظبط والتاريخ يبقى موجود فعلًا.

~~~text الناتج
true 2026-12-05
false
~~~

---

## ٣. نفس الشغل بإيدك

~~~js by-hand.mjs
const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
const UNITS = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60], ["second", 1]];
function timeAgo(date, now = new Date()) {
  const diff = (date - now) / 1000;
  for (const [unit, sec] of UNITS) {
    if (Math.abs(diff) >= sec || unit === "second") return rtf.format(Math.round(diff / sec), unit);
  }
}
function parseDMY(text) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!m) return null;
  const [, d, mo, y] = m.map(Number);
  const date = new Date(y, mo - 1, d);
  return date.getMonth() === mo - 1 && date.getDate() === d ? date : null;
}
const now = new Date("2026-11-21T12:00:00");
console.log(timeAgo(new Date("2026-11-21T09:00:00"), now));
console.log(timeAgo(new Date("2026-11-14T12:00:00"), now));
const due = parseDMY("05/12/2026");
console.log(due !== null, due.toLocaleDateString("en-CA"));
console.log(parseDMY("31/02/2026") !== null);
~~~

~~~text الناتج (Node 24.22): node by-hand.mjs
قبل 3 ساعات
الأسبوع الماضي
true 2026-12-05
false
~~~

- [[Intl.RelativeTimeFormat("ar", { numeric: "auto" })]]: جاهزة في اللغة (ECMA-402). [[numeric: "auto"]] بيخليها تقول «الأسبوع الماضي» بدل «قبل أسبوع واحد».
- [[UNITS]]: كل وحدة وعدد ثوانيها، من الأكبر للأصغر. الـ loop بتاخد أول وحدة الفرق أكبر منها. والشهر هنا ٣٠ يوم تقريبًا: ده تبسيط **انت** اللي قررته، والمكتبة كانت هتقرره عنك.
- [[parseDMY]]: regex للشكل، وبعدين [[new Date(y, mo - 1, d)]] (الشهر من 0)، وبعدين نتأكد إن [[Date]] مغيّرش اليوم: [[new Date(2026, 1, 31)]] بيبقى ٣ مارس من غير ما يقول.

لاحظ الناتج: «قبل» بدل «منذ»، و «الأسبوع الماضي» بدل «منذ 7 أيام». الاتنين صح، بس **مختلفين**. لو المنتج عايز شكل معين بالظبط، ده قرار لازم يتاخد.

---

## ٤. القياس: سطور وبايتات

بنبني كل ملف بـ esbuild 0.28.2 في bundle واحد مصغّر للمتصفح، ونقيسه خام وبعد gzip (اللي بيتنقل فعلًا على الشبكة). السكربت نفسه في درس «إمتى framework غلط».

~~~text الناتج: node measure.mjs src/with-lib.mjs src/by-hand.mjs
src/with-lib.mjs   16172 B    6521 B gzip
src/by-hand.mjs      712 B     438 B gzip
~~~

| | بالمكتبة | بإيدك |
|---|---|---|
| سطور كودك | ١٣ | ٢١ |
| حجم الـ bundle بعد gzip | ٦٥٢١ بايت | ٤٣٨ بايت |
| الحالات اللي اتغطت | كل اللي المكتبة مختبراه (لغات، و zones بـ plugin، وأشكال تواريخ) | اللي انت فكرت فيه بس |
| لو باج | تحدّث النسخة | تصلّحه انت |

**القرار مش واحد للكل:** صفحة فيها «منذ ٣ ساعات» بس؟ Intl كفاية وأخف ١٥ مرة. تطبيق مواعيد فيه أشكال تواريخ كتير و zones؟ المكتبة (أو Temporal) بتوفّر عليك باجات.

---

## ٥. من CDN من غير تسطيب

~~~html index.html
<script type="module">
  import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.23/+esm";
  console.log(dayjs("2026-01-31").add(1, "month").format("YYYY-MM-DD"));
</script>
~~~

اتجرّب في Chrome 157: طبع [[2026-02-28]]. وقيسنا الـ headers بـ [[curl]]:

| الـ URL | الـ Cache-Control اللي رجع |
|---|---|
| [[dayjs@1.11.23/dayjs.min.js]] | [[max-age=31536000, immutable]]: سنة كاملة، والملف عمره ما هيتغير |
| [[dayjs@1/dayjs.min.js]] | [[max-age=604800]]: أسبوع، لأن [[@1]] ممكن تشاور على نسخة أحدث بكرة |
| [[dayjs/dayjs.min.js]] | [[max-age=604800]]: أسبوع، و «آخر نسخة» ممكن تبقى 2.0 |

ومع [[<script src>]] العادي ضيف [[integrity]] (التمرين التالت). والـ CDN معناه إن موقعك بيعتمد على سيرفر حد تاني: لو وقع أو اتحجب، الصفحة بتقع.

---

## ٦. نسخ الملف

~~~powershell
mkdir vendor
copy node_modules\dayjs\dayjs.min.js vendor\dayjs-1.11.23.min.js
~~~

ملف واحد (7161 بايت)، وهو نفسه بالبايت اللي على الـ CDN. النسخة في الاسم هي الحاجة الوحيدة اللي بتقولك بعد سنة «ده قديم». ومن غير npm مفيش [[npm audit]] يقولك إن فيه ثغرة: انت المسؤول تتابع.

---

## ٧. ليه المطورين بيستخدموا كود غيرهم (وبيدفعوا إيه)

| السبب | معناه في المثال | التمن |
|---|---|---|
| **الكفاءة** | ٦ سطور بدل ١٥ في [[daysUntil]]، ومن غير ما تفتكر إن الشهر من 0 | بايتات زيادة، ووقت تتعلم الـ API |
| **التوافق (cross-browser)** | المكتبة بتتعامل مع اختلافات البيئات والحالات الطرفية ([[05/12/2026]] اللي [[Date]] فهمها مايو). وقبل ما Intl.RelativeTimeFormat يبقى Baseline (MDN: متاح في كل المتصفحات من سبتمبر 2020) كانت المكتبة هي الطريقة الوحيدة | لما المنصة تلحق، المكتبة بتبقى وزن زيادة |
| **الـ ecosystem والدعم** | ١٤٣ لغة و ٣٧ plugin، وناس بتبلّغ عن الباجات وبتصلّحها، وأسئلة متجاوبة | لو المكتبة اتهجرت، انت شايل الكود |

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| أجيب المكتبة إزاي؟ | npm لأي مشروع فيه build، و CDN بنسخة متثبتة و SRI لصفحة static، ونسخ الملف لما مفيش نت |
| أستخدم مكتبة أصلًا؟ | شوف المنصة الأول (Intl و fetch و URL)، وقيس: سطور، وبايت، وحالات طرفية |
| CDN من غير نسخة؟ | لأ: الملف ممكن يتغير من تحتك، والكاش أسبوع بدل سنة |
| SRI بيحمي من إيه؟ | من ملف اتغير على الـ CDN: المتصفح بيرفضه لو البصمة مش مطابقة |`,
          lines: [
            R`[[import dayjs from "dayjs"]] بيجيب الدالة الأساسية من [[node_modules/dayjs]]، لأن الاسم مفيهوش [[./]].`,
            R`plugin [[relativeTime]] بيضيف [[from]] و [[fromNow]] اللي بيكتبوا المسافة بين تاريخين بالكلام.`,
            R`plugin [[customParseFormat]] بيخلي dayjs تقرا تاريخ بشكل انت بتحدده ([["DD/MM/YYYY"]]).`,
            R`[[import]] من غير اسم: بيشغّل ملف اللغة العربي وبس، والملف بيسجّل نفسه جوه dayjs.`,
            R`[[dayjs.extend]] بيركّب الـ plugin الأول على الدالة الأساسية، ومن غيره [[from]] مش موجودة.`,
            R`نفس الحاجة لـ plugin قراية الأشكال، عشان سطر [[due]] تحت يشتغل بالشكل اللي بنحدده.`,
            R`[[dayjs.locale("ar")]] بيخلي العربي هو اللغة الافتراضية لكل الكلام اللي جاي.`,
            R`[[now]] ثابت (الساعة ١٢ الضهر يوم ٢١ نوفمبر) عشان الناتج يطلع هو هو كل مرة.`,
            R`[[from(now)]] بتقارن ٩ الصبح بـ ١٢ الضهر وبتكتب [[منذ 3 ساعات]] بالعربي.`,
            R`تاريخ قبلها بأسبوع بالظبط بيطلع [[منذ 7 أيام]]: المكتبة قررت «أيام» مش «أسبوع».`,
            R`بنقرا [["05/12/2026"]] على إنه يوم/شهر/سنة، و [[true]] معناها strict: الشكل يطابق بالظبط.`,
            R`[[isValid()]] بـ [[true]]، و [[format]] بيكتبه [[2026-12-05]]: ٥ ديسمبر زي ما قصدنا.`,
            R`٣١ فبراير مش موجود، فـ strict بيرجّع [[false]] بدل ما يحوّله لـ ٣ مارس ساكت.`,
          ],
          ref: [
            { t: "MDN Curriculum: JavaScript fundamentals (6.14 Libraries and frameworks)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
            { t: "MDN: Introduction to client-side frameworks", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Introduction" },
            { t: "MDN: Subresource Integrity", url: "https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity" },
            { t: "jsDelivr documentation", url: "https://www.jsdelivr.com/documentation" },
            { t: "Day.js: CustomParseFormat plugin", url: "https://day.js.org/docs/en/plugin/custom-parse-format" },
            { t: "MDN: Intl.RelativeTimeFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat" },
          ],
          pre: [{ to: "js/date-fns و dayjs و Temporal", why: R`مقارنة مكتبات التواريخ بالتفصيل، و Temporal البديل اللي جوه اللغة` }, { to: "node/npm install", why: R`[[npm install]] وأنواع الـ dependencies بالتفصيل` }],
        },
        {
          cmd: "library ولا framework: مين بينادي مين",
          title: "الفرق الحقيقي بين library و framework: inversion of control، ونفس العدّاد بـ ٤ طرق",
          desc: R`الفرق في سؤال واحد: **مين بينادي مين؟** الـ library انت اللي بتناديها وقت ما تحب ([[dayjs(date).format()]] و [[new Chart(canvas, config)]]). الـ framework هو اللي بينادي كودك: انت بتكتب أجزاء بشكل هو محدده، وهو بيقرر إمتى تشتغل. ده اسمه **inversion of control** (عكس التحكم).

أمثلة:
• **libraries:** Chart.js (رسوم)، و three.js (3D)، و dayjs، و lodash، و lit-html (بيرسم template لما تقوله).
• **frameworks:** Angular و Vue و Svelte (و SvelteKit)، و Next.js. و React بتسمّي نفسها library، بس هي اللي بتنادي الـ components بتاعتك وتقرر إمتى ترسمها، فشغلك معاها شبه الـ framework.

والفريموركات نفسها نوعين: **opinionated** (Angular: فيها router و forms و HTTP و DI وطريقة واحدة لكل حاجة) و **unopinionated** (React: الـ UI بس، وانت بتختار الباقي). الدرس بيعمل نفس العدّاد ٤ مرات عشان تشوف الفرق بعينك.`,
          example: R`// «فريمورك» من ١٠ سطور: هو اللي بينادي كودك
function mount(el, { state, view, actions }) {
  function draw() {
    el.innerHTML = view(state);
  }
  el.addEventListener("click", (e) => {
    const name = e.target.closest("[data-on]")?.dataset.on;
    if (name) { actions[name](state); draw(); }
  });
  draw();
}
mount(document.querySelector("#app"), {
  state: { count: 0 },
  view: (s) => $__bt<button type="button" data-on="add">دوسات: <output>$__{s.count}</output></button>$__bt,
  actions: { add: (s) => { s.count += 1; } },
});`,
          try: R`اعمل صفحة فيها [[<div id="app"></div>]] وحط المثال في [[<script>]] تحتها، ودوس على الزرار. وبعدين دوس [[Tab]] لحد ما الزرار ياخد الـ focus، ودوس [[Enter]] مرتين: الـ focus راح فين بعد أول مرة؟ وفين في الكود **انت** ناديت [[draw]]؟`,
          sol: R`اتجرّب في Chrome 157: العدّاد بيزيد مع كل ضغطة. بس بعد أول [[Enter]] الـ focus بيروح من الزرار لـ [[<body>]]، فـ [[Enter]] التانية مبتعملش حاجة. قسناها بـ [[document.activeElement.tagName]]: [[BODY]].

**ليه؟** [[draw()]] بيعمل [[el.innerHTML = ...]]، فالزرار القديم (اللي عليه الـ focus) بيتمسح ويتعمل زرار جديد مكانه. واللي بيستخدم الكيبورد أو screen reader بيتوه بعد كل ضغطة.

وانت **مكتبتش** [[draw()]] ولا [[actions.add(...)]] في أي حتة: الـ «framework» هو اللي بينادي [[view]] و [[actions]]. ده الـ inversion of control. وحل مشكلة الـ focus في التمرين التالت، وده بالظبط اللي React و Vue و Svelte و lit-html بيعملوه: بيغيّروا الجزء اللي اتغير بس (قسناها: في الأربعة الـ focus فضل على [[BUTTON]]).`,
          practice: [
            { lvl: 'سريع', t: R`**صنّف:** library ولا framework؟ ومين بينادي مين؟ Chart.js و three.js و lodash و dayjs و lit-html و React و Angular و Vue و Svelte و Express و Next.js و [[node:test]].`, done: R`كل واحد في خانته، ومع كل واحد جملة «أنا بناديه» أو «هو بيناديني»، وعارف ليه React حالة خاصة.`, sol: R`| الأداة | النوع | مين بينادي مين |
|---|---|---|
| Chart.js و three.js | library | انت: [[new Chart(canvas, config)]] و [[renderer.render(scene, camera)]] |
| lodash و dayjs | library | انت: [[_.groupBy(list, "city")]] و [[dayjs().add(1, "day")]] |
| lit-html | library | انت: [[render(template, el)]] كل ما تحب ترسم |
| React | بتسمّي نفسها library | هي بتنادي الـ component بتاعك ([[Counter()]]) وتقرر إمتى ترسمه تاني. الـ routing والـ data برّه، فهي unopinionated |
| Angular | framework (opinionated) | هو بينادي الـ components والـ services، وفيه router و forms و HTTP و DI جوّه |
| Vue و Svelte | framework | هما بينادوا الـ component لما الـ state يتغير. ليهم router رسمي (Vue Router و SvelteKit) |
| Express | framework للسيرفر | هو بينادي الـ handler بتاعك لما طلب ييجي: [[app.get("/", (req, res) => ...)]] |
| Next.js | framework فوق React | هو بيقرر الصفحات من أسماء الفولدرات، وبينادي الـ components على السيرفر والمتصفح |
| [[node:test]] | framework صغير للاختبارات | انت بتسجّل [[test("...", fn)]] وهو اللي بيشغّلها ويقولك نجح ولا وقع (التمرين التاني) |

**القاعدة:** لو بتكتب دالة وبتديها لحاجة **هي** تناديها في الوقت اللي **هي** تحدده، دي framework. لو انت اللي بتنادي وتاخد ناتج، دي library.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ده «framework» اختبارات صغير. إيه ترتيب السطور اللي هتتطبع؟ وأنهي سطر هو الـ inversion of control؟
~~~js tiny-test.mjs
const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}
function run() {
  for (const t of tests) {
    try {
      t.fn();
      console.log("نجح:", t.name);
    } catch (error) {
      console.log("وقع:", t.name, "-", error.message);
    }
  }
}
console.log("١ بنسجّل");
test("الجمع", () => {
  if (1 + 1 !== 2) throw new Error("1 + 1 مش 2");
});
test("القسمة على صفر", () => {
  if (1 / 0 !== 0) throw new Error($__bt1 / 0 = $__{1 / 0}$__bt);
});
console.log("٢ لسه محدش اتشغّل");
run();
~~~`, done: R`توقعت إن السطرين «١» و «٢» بيتطبعوا الأول، وبعدين نتيجة الاختبارين، وعارف إن الدوال اللي جوه [[test]] مااتنادتش وقت ما كتبتها.`, sol: R`~~~text الناتج (Node 24.22): node tiny-test.mjs
١ بنسجّل
٢ لسه محدش اتشغّل
نجح: الجمع
وقع: القسمة على صفر - 1 / 0 = Infinity
~~~

- [[test("الجمع", () => ...)]] **مبيشغّلش** الدالة: بيحطها في [[tests]] وبس. عشان كده «٢» اتطبعت قبل أي نتيجة.
- [[run()]] هو اللي بينادي [[t.fn()]] لكل اختبار، وبيمسك الـ error ويكتب «وقع». ده الـ inversion of control: انت كتبت الدوال، والـ framework قرر إمتى تشتغل وعمل إيه لما وقعت.
- [[node:test]] و Vitest و Jest بيشتغلوا بنفس الفكرة بالظبط، بس بيلاقوا ملفات الاختبار لوحدهم وبيشغّلوا [[run]] من غير ما تكتبها.
- و [[1 / 0]] في JavaScript بيطلع [[Infinity]] مش error، فالاختبار وقع بالرسالة اللي احنا كتبناها.` },
            { lvl: 'تطبيق', t: R`**صلّح الـ framework:** في الـ «framework» بتاع المثال، الـ focus بيضيع بعد كل ضغطة. صلّحه من غير ما تغيّر طريقة الرسم ([[innerHTML]]): افتكر مين كان عليه الـ focus قبل الرسم ورجّعه بعده. وزوّد زرار «صفّر» عشان تتأكد إنه شغال مع أكتر من زرار.`, done: R`بـ [[Tab]] و [[Enter]] تقدر تدوس «زوّد» كذا مرة ورا بعض، والسطر تحت بيقول «الـ focus على: add»، ولما تروح لـ «صفّر» بيقول «reset».`, sol: R`~~~live 160 focus-fix.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>فريمورك صغير بيحافظ على الـ focus</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  button { font: inherit; padding: 6px 14px; margin-inline-end: 8px; }
  button:focus-visible { outline: 3px solid #2563eb; }
</style>
</head>
<body>
<div id="app"></div>
<p id="where"></p>
<script>
  function mount(el, { state, view, actions }) {
    function draw() {
      const focused = document.activeElement?.dataset?.on;
      el.innerHTML = view(state);
      if (focused) el.querySelector($__bt[data-on="$__{focused}"]$__bt)?.focus();
      document.querySelector("#where").textContent = $__btالـ focus على: $__{document.activeElement.dataset.on ?? document.activeElement.tagName}$__bt;
    }
    el.addEventListener("click", (e) => {
      const name = e.target.closest("[data-on]")?.dataset.on;
      if (name) { actions[name](state); draw(); }
    });
    draw();
  }
  mount(document.querySelector("#app"), {
    state: { count: 0 },
    view: (s) => $__bt<button type="button" data-on="add">زوّد ($__{s.count})</button><button type="button" data-on="reset">صفّر</button>$__bt,
    actions: {
      add: (s) => { s.count += 1; },
      reset: (s) => { s.count = 0; },
    },
  });
</script>
</body>
</html>
~~~

اتجرّب في Chrome 157: focus على «زوّد» وضغطتين ورا بعض بـ [[click()]] على [[document.activeElement]]: العدّاد [[2]] والسطر «الـ focus على: add». وبعدها «صفّر»: العدّاد [[0]] والسطر «الـ focus على: reset».

- قبل [[innerHTML]]: [[document.activeElement?.dataset?.on]] بيقول اسم الزرار اللي عليه الـ focus (أو [[undefined]] لو مفيش).
- بعد الرسم: [[el.querySelector(...)?.focus()]] بيلاقي الزرار الجديد بنفس الاسم ويرجّعله الـ focus.
- **ليه ده مش كفاية في الحقيقة؟** لو فيه [[<input>]] الكيبورد هيقفز لأول النص (الـ cursor ضاع)، والـ scroll ممكن يتحرك، وأي listener على عنصر جوه اتمسح. الفريموركات والـ libraries زي lit-html بتحل ده بإنها **متمسحش** العناصر: بتغيّر النص اللي اتغير بس. وده سبب من أسباب استخدامها.` },
            { lvl: 'تطبيق', t: R`**ابني component من غير framework:** [[createCounter(el, { label, start, max })]] بترسم عدّاد فيه [[−]] و [[+]] جوه أي عنصر، وبتمنع النزول تحت 0 والطلوع فوق [[max]] (الزرار بيتقفل)، وبترجّع object فيه [[value]] و [[set]]. استخدمها ٣ مرات في نفس الصفحة (شاي، وقهوة تبدأ من 2، وعصير max 3).`, done: R`٣ عدّادات مستقلين في الصفحة، وكل واحد ليه state لوحده، والـ [[+]] بتاع العصير بيتقفل عند ٣، و [[−]] بيتقفل عند 0.`, sol: R`~~~live 200 counters.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>٣ عدّادات من دالة واحدة</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .counter { display: flex; gap: 8px; align-items: center; margin-block: 8px; }
  button { font: inherit; min-width: 40px; padding: 4px 10px; }
  output { min-width: 2ch; text-align: center; font-weight: 700; }
</style>
</head>
<body>
<div id="tea"></div>
<div id="coffee"></div>
<div id="juice"></div>
<script>
  function createCounter(el, { label, start = 0, max = 10 }) {
    let count = start;
    el.className = "counter";
    el.innerHTML = $__bt<span>$__{label}</span><button type="button" aria-label="قلّل $__{label}">−</button><output>$__{count}</output><button type="button" aria-label="زوّد $__{label}">+</button>$__bt;
    const [minus, plus] = el.querySelectorAll("button");
    const out = el.querySelector("output");
    function set(next) {
      count = Math.min(max, Math.max(0, next));
      out.textContent = count;
      minus.disabled = count === 0;
      plus.disabled = count === max;
    }
    minus.addEventListener("click", () => set(count - 1));
    plus.addEventListener("click", () => set(count + 1));
    set(count);
    return { get value() { return count; }, set };
  }
  const tea = createCounter(document.querySelector("#tea"), { label: "شاي" });
  const coffee = createCounter(document.querySelector("#coffee"), { label: "قهوة", start: 2 });
  const juice = createCounter(document.querySelector("#juice"), { label: "عصير", max: 3 });
</script>
</body>
</html>
~~~

اتجرّب في Chrome 157: ٥ ضغطات على [[+]] العصير، وضغطة على [[+]] الشاي، و ٣ على [[−]] القهوة، والنتيجة [[شاي=1 | قهوة=0 (− مقفول) | عصير=3 (+ مقفول)]].

- كل نداء لـ [[createCounter]] بيعمل [[count]] جديد جوه closure، فالعدّادات مش بتشارك state (درس «closure»).
- [[set(next)]] هي المكان الوحيد اللي بيغيّر الـ state ويحدّث الشاشة والزراير. أي تغيير بيعدّي عليها، فمستحيل الرقم يبان حاجة والزرار حاجة.
- [[aria-label]] بيدّي كل زرار اسم مفهوم لقارئ الشاشة («زوّد شاي») بدل «+».
- ده **component**: دالة بتاخد مكان وإعدادات وبترسم حاجة مستقلة. الفريموركات بتدّيك ده بشكل جاهز (و Web Components كمان، جوه المتصفح نفسه)، ومعاه تحديث الشاشة لوحده لما الـ state يتغير.` },
            { lvl: 'تحدي', t: R`**اشرحها:** صاحبك بيقول «React مش framework، دي library، الموقع بتاعها كاتب كده». اكتبله رد في ٤ سطور: هو صح في إيه، وغلطان في إيه، وده بيفرق معاه في إيه عمليًا.`, done: R`الرد فيه: React فعلًا UI بس (مفيهاش router ولا data fetching رسمي)، بس هي اللي بتنادي الـ components (inversion of control)، والفرق العملي إنك محتاج تختار باقي الأدوات بنفسك أو تستخدم framework فوقها.`, sol: R`**الرد النموذجي:**
1. صح: React بتعرّف نفسها «The library for web and native user interfaces»، ومسؤوليتها الـ UI بس. مفيهاش router ولا طريقة رسمية تجيب بيها داتا ولا forms زي Angular.
2. بس بمقياس «مين بينادي مين»: انت مبتناديش [[Counter()]] بنفسك. React هي اللي بتناديه وقت أول رسم وكل ما الـ state يتغير، وبتقرر الترتيب. ده inversion of control، وده تعريف الـ framework.
3. فالأدق: React = **unopinionated UI framework** (أو library بتشتغل زي framework في الجزء بتاعها). و Next.js أو React Router في framework mode فوقها = framework كامل opinionated.
4. عمليًا: مع React لوحدها انت اللي هتختار الـ router والـ state والـ data fetching (قرارات أكتر، وكل مشروع شكل). ومع Angular أو Next.js القرارات دي متاخدة (أسرع في الفريق، بس أقل حرية).

مصدر الجملة: الصفحة الرئيسية لـ [[react.dev]]، وتفاصيل الـ frameworks اللي فوقها في react.dev/learn (قسم بدء مشروع جديد).` },
          ],
          flag: "script",
          deep: {
            why: R`السؤال ده بيتسأل في كل انترفيو frontend تقريبًا، والإجابة «الـ framework أكبر» غلط. والفرق بيأثر على شغلك: مع library انت صاحب الهيكل وتقدر تشيلها وتحط غيرها، ومع framework الهيكل بتاعه والخروج منه غالي (إعادة كتابة). فلما تختار framework انت بتختار طريقة الشغل كلها لسنين.`,
            how: R`**library:** دوال أو classes بتناديها وترجعلك ناتج. الكنترول عندك: [[main]] بتاعك بيقرر إمتى ينادي [[render(template, el)]] أو [[chart.update()]].

**framework:** فيه حلقة بتاعته هو (event loop للـ UI، أو router للسيرفر). انت بتسجّل أجزاء: components أو handlers أو اختبارات، وهو بيناديها لما حدث يحصل (ضغطة، أو state اتغير، أو طلب HTTP جه). ده بيتسمى أحيانًا «Hollywood principle»: «متكلمناش، احنا هنكلمك».

**opinionated ولا لأ:** Angular بيقرر الهيكل والـ router والـ forms والـ DI والـ testing. Vue وسط: الـ core صغير، والـ router و Pinia رسميين بس اختياريين. React الـ UI بس، والباقي من الـ ecosystem.`,
            when: R`library لما المشكلة محددة (رسم chart، تواريخ، 3D) وانت عايز تفضل صاحب الهيكل. framework لما التطبيق نفسه كبير: شاشات كتير، و state بيتشارك، وفريق محتاج طريقة واحدة. ولو الصفحة بسيطة: ولا ده ولا ده (درس «إمتى framework غلط»).`,
            mistakes: R`«الـ framework = library كبيرة»: الحجم مش هو الفرق (Preact صغير جدًا وبينادي كودك). وتحط library لكل حاجة لحد ما مشروعك يبقى framework من غير تصميم. وتستخدم framework وتحارب طريقته (تعدّل الـ DOM بإيدك جوه React فيتلخبط). وترسم كل حاجة بـ [[innerHTML]] من جديد وتفتكر ده «زي React» (الـ focus بيضيع، وده اللي React بيتجنبه).`
          },
          teach: R`## الفكرة

عدّاد بسيط: زرار، ورقم بيزيد مع كل ضغطة. هنكتبه ٤ مرات: vanilla (من غير أي حاجة)، و library (lit-html)، و «framework» من ١٠ سطور كتبناه بنفسنا عشان نشوف inversion of control من جوه، و Preact (framework صغير بنفس طريقة React). الكل اتبنى بـ esbuild 0.28.2 واتجرّب في Chrome 157 (٣ ضغطات، والرقم بقى [[3]] في الأربعة).

---

## ١. vanilla: انت بتعمل كل حاجة

~~~js vanilla.js
const app = document.querySelector("#app");
let count = 0;
app.innerHTML = $__bt<button type="button">دوسات: <output>0</output></button>$__bt;
const out = app.querySelector("output");
app.querySelector("button").addEventListener("click", () => {
  count += 1;
  out.textContent = count;
});
~~~

- [[let count = 0]]: الـ state (الحالة) في متغير.
- [[innerHTML]] مرة واحدة في الأول، وبعدها مع كل ضغطة انت بتحدّث [[out.textContent]] بإيدك.
- **مين بينادي مين:** انت كاتب كل نداء. المتصفح بينادي الـ listener، وده كل اللي برّه إيدك.

---

## ٢. library: lit-html بيرسم لما **انت** تقوله

~~~js lit.js
import { html, render } from "lit-html";
const app = document.querySelector("#app");
let count = 0;
function update() {
  render(html$__bt<button type="button" @click=$__{() => { count += 1; update(); }}>دوسات: <output>$__{count}</output></button>$__bt, app);
}
update();
~~~

- [[html$__bt...$__bt]]: tagged template (درس «template literals»). lit-html بيفتكر الأماكن اللي فيها [[$__{...}]] بس.
- [[render(template, app)]]: **انت** اللي بتناديها. أول مرة بترسم كله، وبعد كده بتغيّر النص اللي اتغير بس (الرقم)، والزرار نفسه بيفضل هو هو.
- [[@click=$__{...}]]: lit-html بيعمل [[addEventListener]] عنك.
- انت لسه صاحب الحلقة: انت اللي بتقرر تنادي [[update()]] بعد ما [[count]] يتغير.

---

## ٣. «framework» من ١٠ سطور: هو اللي بينادي كودك

ده المثال. اقراه كأنه فريقين: [[mount]] هو الـ framework، والـ object اللي في الآخر هو كودك.

~~~text minifw.js
function mount(el, { state, view, actions }) {
  function draw() {
    el.innerHTML = view(state);
  }
~~~

- [[mount]] بياخد مكان في الصفحة وتلات حاجات منك: [[state]] (البيانات)، و [[view]] (دالة بتحوّل الـ state لـ HTML)، و [[actions]] (دوال بتغيّر الـ state).
- [[draw]] بينادي **دالتك** [[view(state)]] ويحط الناتج في الصفحة.

~~~text minifw.js
  el.addEventListener("click", (e) => {
    const name = e.target.closest("[data-on]")?.dataset.on;
    if (name) { actions[name](state); draw(); }
  });
  draw();
}
~~~

- listener واحد على المكان كله (event delegation). لما تدوس على حاجة عليها [[data-on="add"]]، بينادي **دالتك** [[actions.add(state)]]، وبعدين بيرسم تاني لوحده.
- [[?.]]: لو الضغطة مش على عنصر عليه [[data-on]]، [[closest]] بيرجّع [[null]] والسطر ميقعش.

~~~text minifw.js
mount(document.querySelector("#app"), {
  state: { count: 0 },
  view: (s) => $__bt<button type="button" data-on="add">دوسات: <output>$__{s.count}</output></button>$__bt,
  actions: { add: (s) => { s.count += 1; } },
});
~~~

كودك كله **وصف**: الحالة شكلها إيه، والشاشة شكلها إيه، والزرار بيعمل إيه. مفيش ولا [[addEventListener]] ولا [[textContent]] ولا [[draw()]] في كودك. ده **inversion of control**.

**المشكلة اللي اتقاست:** [[innerHTML]] بيمسح الزرار ويعمل واحد جديد مع كل ضغطة. focus على الزرار + [[click()]] = [[document.activeElement]] بقى [[BODY]]. في التلات تانيين (vanilla و lit و Preact) فضل [[BUTTON]].

---

## ٤. Preact: framework حقيقي بنفس طريقة React

~~~jsx preact.jsx
import { render } from "preact";
import { useState } from "preact/hooks";
function Counter() {
  const [count, setCount] = useState(0);
  return <button type="button" onClick={() => setCount(count + 1)}>دوسات: <output>{count}</output></button>;
}
render(<Counter />, document.querySelector("#app"));
~~~

- [[function Counter()]]: component. دالة بترجّع شكل الشاشة بـ JSX.
- [[useState(0)]]: الـ state جوه Preact نفسه. [[setCount]] بيغيّره **ويطلب** رسم جديد.
- [[render(<Counter />, ...)]]: بتسلّم الـ component لـ Preact مرة واحدة. بعد كده **Preact هو اللي بينادي [[Counter()]]** كل ما الـ state يتغير، ويقارن الناتج بالقديم ويغيّر الرقم بس.

ونفس الكود تقريبًا في React: [[import { useState } from "react"]] و [[createRoot(el).render(<Counter />)]]. التفاصيل في كورس React.

---

## ٥. الأربعة جنب بعض

| | vanilla | lit-html | الـ mini framework | Preact |
|---|---|---|---|---|
| مين بيحدّث الشاشة | انت ([[textContent]]) | انت بتنادي [[render]] | هو ([[draw]] بعد كل action) | هو (بعد [[setCount]]) |
| مين بينادي كودك | المتصفح بس | المتصفح بس | الـ framework بينادي [[view]] و [[actions]] | Preact بينادي [[Counter]] |
| الـ focus بعد الضغط | بيفضل | بيفضل | **بيضيع** | بيفضل |
| الحجم بعد gzip (esbuild، production) | ٢٧١ بايت | ٣٤٧٧ بايت | ٣٥٧ بايت | ٥٨٤٣ بايت |

الأحجام مشروحة في درس «إمتى framework غلط» ومعاها Vue و Svelte و React.

---

## ٦. opinionated و unopinionated

| | بيقرر عنك | انت بتختار |
|---|---|---|
| Angular | الهيكل والـ router والـ forms والـ HTTP والـ DI والاختبارات و TypeScript | قليل جدًا |
| Vue | الـ components والـ reactivity، و router و Pinia رسميين | تستخدمهم ولا لأ |
| Svelte و SvelteKit | الـ compiler والـ components، و SvelteKit للشاشات والسيرفر | الباقي |
| React | الـ components والـ state بس | الـ router والـ data والـ forms والـ styling (أو Next.js يقرر) |

opinionated = أسرع في الفريق وكل المشاريع شكل واحد، بس لو طريقته مش مناسبة هتحاربه. unopinionated = حرية، بس كل فريق بيعمل نسخته وبتاخد قرارات أكتر.

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| library ولا framework؟ | لو انت بتناديه وبياخد ويرجّع: library. لو انت بتديله دوالك وهو بيناديها: framework |
| inversion of control؟ | الـ framework صاحب الحلقة، وكودك أجزاء بتتنادي (components و handlers و tests) |
| React إيه؟ | بتسمّي نفسها library، وبتشتغل زي framework في الـ UI، وهي unopinionated |
| أبني «framework» بنفسي؟ | للتعلم آه، للشغل لأ: الحاجات الصعبة (الـ focus والـ diff والـ accessibility) هي اللي الفريموركات بتحلها |`,
          lines: [
            R`[[mount]] بياخد مكان في الصفحة و object منك فيه [[state]] و [[view]] و [[actions]].`,
            R`[[draw]] دالة داخلية في الـ framework مسؤولة عن الرسم، وكودك عمره ما بيناديها.`,
            R`بينادي دالتك [[view(state)]] ويحط الـ HTML اللي رجع في الصفحة كله من جديد.`,
            R`قفلة [[draw]]. لحد هنا مفيش حاجة اتشغّلت، ده تعريف بس جوه [[mount]].`,
            R`listener واحد على المكان كله: أي ضغطة جوه [[el]] بتوصل هنا (event delegation).`,
            R`[[closest("[data-on]")]] بيدوّر على أقرب عنصر عليه [[data-on]]، و [[?.]] بتمنع الوقوع لو مفيش.`,
            R`لو لقى اسم، بينادي دالتك من [[actions]] بالاسم ده، وبعدين بيرسم تاني لوحده.`,
            R`قفلة الـ listener. الـ framework بيسمع على الضغطات بداله، وكودك مكتبش ولا listener.`,
            R`أول رسم أول ما [[mount]] يتنادي، عشان الزرار يظهر من غير ما حد يدوس.`,
            R`قفلة [[mount]]. من هنا ورايح ده كودك انت، والـ framework فوق خلص.`,
            R`بتنادي [[mount]] مرة واحدة بالمكان ووصف التطبيق، وبعدها الكنترول كله معاه.`,
            R`[[state]]: البيانات بتاعة التطبيق، رقم الدوسات بيبدأ من صفر.`,
            R`[[view]]: دالة بتحوّل الـ state لـ HTML، والزرار عليه [[data-on="add"]] عشان الـ framework يعرف يربطه.`,
            R`[[actions.add]]: الدالة اللي بتغيّر الـ state، والـ framework هو اللي بيناديها لما الزرار يتداس.`,
            R`قفلة الـ object والنداء. مفيش [[addEventListener]] ولا [[draw()]] في كودك: ده inversion of control.`,
          ],
          ref: [
            { t: "MDN Curriculum: JavaScript fundamentals (6.14 Libraries and frameworks)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
            { t: "MDN: Framework main features", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Main_features" },
            { t: "Martin Fowler: InversionOfControl", url: "https://martinfowler.com/bliki/InversionOfControl.html" },
            { t: "Lit: Standalone lit-html templates", url: "https://lit.dev/docs/libraries/standalone-templates/" },
            { t: "React: Learn", url: "https://react.dev/learn" },
            { t: "Angular: Overview", url: "https://angular.dev/overview" },
            { t: "Vue: Introduction", url: "https://vuejs.org/guide/introduction.html" },
          ],
          pre: [{ to: "js/event delegation", why: R`الـ listener الواحد على المكان كله اللي الـ mini framework مبني عليه` }, { to: "react/مقدمة React والـ Components", why: R`الـ components و JSX في React نفسها، بعد ما تشوف الفكرة هنا` }],
        },
        {
          cmd: "ليه frameworks: الحالة والشاشات والشغل",
          title: "ليه الفريموركات موجودة: الحالة اللي بتتعرض في كذا مكان، والشاشات، والـ components، والسوق بأرقام من مصدرها",
          desc: R`الفريمورك بيوفّر وقت في ٣ حاجات بتتكرر في أي تطبيق:
• **الحالة والشاشة (state → UI):** نفس البيانات بتتعرض في كذا مكان. بإيدك لازم تفتكر تحدّث كل مكان، ولو نسيت واحد الشاشة بتكذب. الفريمورك بيخليك تكتب الشاشة كدالة من الحالة، وهو بيحدّثها لوحده.
• **الشاشات (routing):** أكتر من صفحة من غير reload، والـ back button، والـ focus، والعنوان.
• **الـ components والـ ecosystem:** أجزاء بتتكرر، وأدوات جاهزة (forms، اختبارات، devtools)، وطريقة واحدة الفريق كله يفهمها.

والسبب التاني إن **الشغل بيطلبها**. بس متصدقش رقم من غير مصدر: الدرس بيوريك تقرا الأرقام من مصادرها (استبيان Stack Overflow 2026، وتحميلات npm) وتعرف كل رقم بيقيس إيه ومبيقيسش إيه، وتعدّ إعلانات الشغل في مدينتك بنفسك.`,
          example: R`const state = { items: [] };
function render() {
  const { items } = state;
  document.querySelector("#badge").textContent = items.length;
  document.querySelector("#list").innerHTML = items.length
    ? items.map((it, i) => $__bt<li>$__{it.name} $__{it.price} <button type="button" data-remove="$__{i}">شيل</button></li>$__bt).join("")
    : $__bt<li class="empty">السلة فاضية</li>$__bt;
  document.querySelector("#total").textContent = items.reduce((sum, it) => sum + it.price, 0);
  document.querySelector("#pay").disabled = items.length === 0;
}
function setState(change) {
  change(state);
  render();
}
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) setState((s) => s.items.push({ name: add.dataset.add, price: Number(add.dataset.price) }));
  const remove = e.target.closest("[data-remove]");
  if (remove) setState((s) => s.items.splice(Number(remove.dataset.remove), 1));
});
render();`,
          try: R`حط المثال في صفحة فيها [[#badge]] و [[#list]] و [[#total]] و [[#pay]] وزرارين عليهم [[data-add]] و [[data-price]] (الصفحة كاملة في الشرح تحت). زوّد صنفين وشيل واحد، وبص على الـ ٤ أماكن. وبعدين حاول توصل لحالة الرقم فوق فيها مختلف عن عدد السطور. هتلاقي إنك مش قادر، وفكّر ليه.`,
          sol: R`اتجرّب في Chrome 157: كشري وفول وبعدين «شيل» على الكشري، والنتيجة [[badge=1]] والسطر الوحيد [[فول 20]] و [[total=20]] و «ادفع» شغال. وبعد ما شلنا الفول: «السلة فاضية» و «ادفع» اتقفل.

مش هتقدر تخلي الرقم مختلف عن السطور، لأن **مفيش** سطر بيحدّث [[#badge]] لوحده: [[render()]] بتحسب الأربعة من [[state.items]] كل مرة، و [[setState]] هي الطريق الوحيد لتغيير الحالة، وبتنادي [[render()]] بعدها على طول. ده نفس اللي React و Vue و Svelte بيعملوه، بس هما بيغيّروا الأجزاء اللي اتغيرت بس بدل [[innerHTML]] للّستة كلها.`,
          practice: [
            { lvl: 'سريع', t: R`**لاقي الباج:** في السلة دي دوس «+ كشري» مرتين وبعدين «شيل» على واحد. الرقم فوق بيقول إيه؟ والإجمالي؟ وفين السطر الناقص؟
~~~html cart-buggy.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>السلة البايظة</title></head>
<body>
<header>السلة: <b id="badge">0</b></header>
<button type="button" id="add">+ كشري ٤٥</button>
<ul id="list"></ul>
<p>الإجمالي: <b id="total">0</b></p>
<script>
  let total = 0;
  let count = 0;
  document.querySelector("#add").addEventListener("click", () => {
    count += 1;
    total += 45;
    document.querySelector("#badge").textContent = count;
    document.querySelector("#total").textContent = total;
    const li = document.createElement("li");
    li.innerHTML = $__btكشري 45 <button type="button">شيل</button>$__bt;
    li.querySelector("button").addEventListener("click", () => {
      li.remove();
      total -= 45;
      document.querySelector("#total").textContent = total;
    });
    document.querySelector("#list").append(li);
  });
</script>
</body>
</html>
~~~`, done: R`لقيت إن «شيل» بيحدّث الإجمالي وبيشيل السطر بس مبيحدّثش [[count]] ولا [[#badge]]، وعارف ليه التصليح «زوّد سطر» مش الحل الحقيقي.`, sol: R`اتجرّب في Chrome 157 (ضغطتين على الزرار وبعدين «شيل» على أول سطر):

~~~text اللي اتقاس
badge=2 items=1 total=45
~~~

الرقم فوق بيقول ٢ والسلة فيها صنف واحد. السبب: الـ listener بتاع «شيل» بيعمل [[li.remove()]] و [[total -= 45]] ونسي [[count -= 1]] وتحديث [[#badge]].

**التصليح السريع:** زوّد في listener الشيل:

~~~js cart-buggy.html
count -= 1;
document.querySelector("#badge").textContent = count;
~~~

**ليه ده مش كفاية؟** فيه ٣ أماكن بتعرض نفس الحالة، والحالة متقسمة على ٣ حاجات ([[count]] و [[total]] والـ [[li]] اللي في الصفحة). أي ميزة جديدة (زرار «فضّي السلة»، أو خصم) لازم تفتكر فيها الـ ٣. **التصليح الحقيقي** هو مثال الدرس: الحالة في مكان واحد ([[state.items]])، وكل اللي على الشاشة محسوب منها في [[render()]]. ده بالظبط المشكلة اللي الفريموركات اتعملت عشانها.` },
            { lvl: 'تطبيق', t: R`**زوّد ميزتين في نسخة الـ render:** زرار «فضّي السلة» (مقفول لما السلة فاضية)، وعنوان التاب يبقى [[(3) السلة]] لما فيه ٣ أصناف و [[السلة]] لما فاضية. المطلوب تعرف كام سطر اتغيّر وفين.`, done: R`الميزتين شغالين، والتغيير ٣ سطور في [[render]] وسطر في الـ listener، ومفيش ولا مكان تاني اتلمس.`, sol: R`~~~live 300 cart2.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>السلة</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  header { display: flex; justify-content: space-between; background: #f3f4f6; padding: 8px 12px; border-radius: 8px; }
  li { display: flex; gap: 8px; align-items: center; margin-block: 4px; }
  button { font: inherit; }
  .empty { color: #777; }
</style>
</head>
<body>
<header><strong>مطعم سُفرة</strong><span>السلة: <b id="badge">0</b></span></header>
<p><button type="button" data-add="كشري" data-price="45">+ كشري ٤٥</button> <button type="button" data-add="فول" data-price="20">+ فول ٢٠</button></p>
<ul id="list"></ul>
<p>الإجمالي: <b id="total">0</b> جنيه</p>
<button type="button" id="pay">ادفع</button>
<button type="button" id="clear">فضّي السلة</button>
<script>
  const state = { items: [] };
  function render() {
    const { items } = state;
    document.querySelector("#badge").textContent = items.length;
    document.querySelector("#list").innerHTML = items.length
      ? items.map((it, i) => $__bt<li>$__{it.name} $__{it.price} <button type="button" data-remove="$__{i}">شيل</button></li>$__bt).join("")
      : $__bt<li class="empty">السلة فاضية</li>$__bt;
    document.querySelector("#total").textContent = items.reduce((sum, it) => sum + it.price, 0);
    document.querySelector("#pay").disabled = items.length === 0;
    document.querySelector("#clear").disabled = items.length === 0;
    document.title = items.length ? $__bt($__{items.length}) السلة$__bt : "السلة";
  }
  function setState(change) {
    change(state);
    render();
  }
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) setState((s) => s.items.push({ name: add.dataset.add, price: Number(add.dataset.price) }));
    const remove = e.target.closest("[data-remove]");
    if (remove) setState((s) => s.items.splice(Number(remove.dataset.remove), 1));
    if (e.target.closest("#clear")) setState((s) => { s.items = []; });
  });
  render();
</script>
</body>
</html>
~~~

اتجرّب في Chrome 157:

~~~text اللي اتقاس
السلة | clear.disabled=true
(3) السلة | badge=3 total=85
السلة | badge=0 total=0 list=السلة فاضية clear.disabled=true pay.disabled=true
~~~

- في [[render]]: سطر بيقفل «فضّي» لما مفيش أصناف، وسطر بيكتب [[document.title]] من نفس [[items.length]].
- في الـ listener: [[if (e.target.closest("#clear")) setState((s) => { s.items = []; })]]. الحالة بس اتغيرت، و [[render]] حدّث الـ ٦ أماكن (الرقم، واللستة، والإجمالي، و «ادفع»، و «فضّي»، والعنوان).
- **قارن بالنسخة البايظة:** «فضّي السلة» هناك كان محتاج تصفّر [[count]] و [[total]] وتمسح كل [[li]] وتحدّث [[#badge]] و [[#total]]، وأي واحدة تنساها = باج. ده «الوقت اللي الفريمورك بيوفّره» بشكل ملموس.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اكتب سكربت Node بيجيب تحميلات الأسبوع اللي فات لـ [[react]] و [[vue]] و [[@angular/core]] و [[svelte]] و [[preact]] من [[https://api.npmjs.org/downloads/point/last-week/<name>]] ويطبعهم مترتبين. وبعدين اكتب سطرين: الرقم ده بيقيس إيه، ومبيقيسش إيه.`, done: R`السكربت بيطبع ٥ سطور مترتبين بالأسبوع اللي اتقاس، وكتبت ليه preact أعلى من vue رغم إن عدد اللي بيكتبوا بيه أقل.`, sol: R`~~~js downloads.mjs
const names = ["react", "vue", "@angular/core", "svelte", "preact"];
const rows = [];
for (const name of names) {
  const res = await fetch($__bthttps://api.npmjs.org/downloads/point/last-week/$__{name}$__bt);
  if (!res.ok) throw new Error($__bt$__{name}: HTTP $__{res.status}$__bt);
  const data = await res.json();
  rows.push({ name, downloads: data.downloads, week: $__bt$__{data.start} → $__{data.end}$__bt });
}
rows.sort((a, b) => b.downloads - a.downloads);
for (const r of rows) {
  console.log(r.name.padEnd(14), r.downloads.toLocaleString("en").padStart(12), r.week);
}
~~~

~~~text الناتج (Node 24.22، اتشغّل يوم 21 نوفمبر 2026)
react           275,243,399 2026-11-13 → 2026-11-19
preact           63,268,171 2026-11-13 → 2026-11-19
vue              26,626,896 2026-11-13 → 2026-11-19
svelte           10,423,528 2026-11-13 → 2026-11-19
@angular/core     8,492,071 2026-11-13 → 2026-11-19
~~~

- الـ downloads API بيقبل [[@angular/core]] بالـ [[/]] زي ما هو، عكس الـ registry نفسه (التمرين التاني في الدرس الجاي).
- [[toLocaleString("en")]] بيحط الفواصل كل ٣ أرقام، و [[padStart]] بيرصّ الأرقام يمين.

**بيقيس إيه:** عدد مرات تنزيل الـ tarball من الـ registry. **مبيقيسش:** عدد الناس ولا المشاريع. كل [[npm ci]] في CI بيتعد، وكل package تانية معتمدة عليه بتتعد (preact بيتنزّل كـ dependency جوه أدوات كتير، عشان كده أعلى من vue بكتير). والـ mirrors والكاش مبيتعدّوش. فالرقم بيقولك «مستخدم جدًا ومش هيختفي بكرة»، ومبيقولكش «الشركات بتطلبه قد إيه».` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** اعرف السوق في مدينتك بدل ما تصدق حد. خد ٢٠ إعلان شغل junior frontend من مواقع الشغل في مدينتك، واكتبهم في CSV ([[title,city,stack]]، والـ stack مفصول بـ [[;]])، واكتب سكربت بيعدّ كل تقنية اتطلبت في كام إعلان وبالنسبة. جرّبه على عيّنة الـ ٨ سطور دي الأول (بيانات متألّفة للتجربة بس، مش سوق حقيقي).`, done: R`السكربت بيطبع كل تقنية وعددها ونسبتها مترتبين، والتقنية اللي اتكررت في نفس الإعلان بتتعد مرة واحدة، وعندك ملف بإعلاناتك الحقيقية وناتجه.`, sol: R`~~~text jobs.csv
title,city,stack
Junior Frontend Developer,القاهرة,React;TypeScript;Tailwind
Frontend Developer,الجيزة,Angular;RxJS;TypeScript
Junior Web Developer,الإسكندرية,JavaScript;jQuery;PHP
Frontend Engineer,القاهرة,React;Next.js
Junior Frontend,المنصورة,Vue;Nuxt
Web Developer,القاهرة,JavaScript;HTML;CSS
Junior Angular Developer,القاهرة,Angular;TypeScript
Frontend Intern,الجيزة,React;JavaScript
~~~

~~~js tally.mjs
import { readFileSync } from "node:fs";
const [header, ...lines] = readFileSync(process.argv[2], "utf8").trim().split(/\r?\n/);
const stackCol = header.split(",").indexOf("stack");
const counts = new Map();
for (const line of lines) {
  const stack = line.split(",")[stackCol].split(";");
  for (const tech of new Set(stack)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
}
const sorted = [...counts].sort((a, b) => b[1] - a[1]);
console.log($__btإعلانات: $__{lines.length}$__bt);
for (const [tech, n] of sorted) {
  console.log(tech.padEnd(12), String(n).padStart(2), $__bt$__{Math.round((n / lines.length) * 100)}%$__bt);
}
~~~

~~~text الناتج على العيّنة المتألّفة (Node 24.22): node tally.mjs jobs.csv
إعلانات: 8
React         3 38%
TypeScript    3 38%
JavaScript    3 38%
Angular       2 25%
Tailwind      1 13%
RxJS          1 13%
jQuery        1 13%
PHP           1 13%
Next.js       1 13%
Vue           1 13%
Nuxt          1 13%
HTML          1 13%
CSS           1 13%
~~~

- [[split(/\r?\n/)]]: بيقسم السطور سواء الملف اتحفظ على Windows ([[\r\n]]) أو لينكس.
- [[header.split(",").indexOf("stack")]]: بيلاقي عمود الـ stack بالاسم مش بالرقم، فلو زوّدت عمود مش هيبوظ.
- [[new Set(stack)]]: لو الإعلان كاتب React مرتين بيتعد مرة.
- **حدود الطريقة:** ٢٠ إعلان عيّنة صغيرة، وإعلانات الموقع الواحد مش كل السوق، والإعلان مش بيقول الشركة هتعيّن كام. بس ده رقم **انت** عارف جه منين، أحسن من «٩٠٪ من الشغل React» من غير مصدر.
- والأرقام دي متألّفة للتجربة، فمتستنتجش منها أي حاجة عن السوق الحقيقي.` },
          ],
          flag: "script",
          deep: {
            why: R`لما تعرف بالظبط الفريمورك بيحل إيه، بتعرف تتعلمه أسرع (كل ميزة فيه رد على مشكلة شفتها بإيدك) وتعرف إمتى متستخدموش. وفي الانترفيو «ليه React؟» الإجابة الكويسة مش «لأنه مشهور»، لكن «الشاشة بقت دالة من الحالة، فباجات النسيان دي بتختفي، والـ components بتتكرر، والفريق بيشتغل بطريقة واحدة».`,
            how: R`**state → UI:** الفكرة اللي React سمّاها UI = f(state): انت بتكتب دالة بتحوّل البيانات لشكل الشاشة، والفريمورك بيناديها كل ما البيانات تتغير. الفرق بينه وبين [[render()]] بتاعنا: بدل ما يمسح ويرسم بـ [[innerHTML]]، بيقارن الشكل الجديد بالقديم (virtual DOM في React و Preact) أو بيعرف من وقت الـ compile أنهي حتة بتعتمد على أنهي متغير (Svelte، و signals في Vue و Angular)، ويغيّر اللي اتغير بس. فالـ focus والـ cursor في الـ inputs والـ scroll بيفضلوا مكانهم.

**routing:** بيربط الـ URL بالشاشة، ويسمع على [[popstate]]، ويحمّل كود الشاشة لما تحتاجها (code splitting).

**components:** كل جزء ليه state وشكل لوحده، وبيتكرر بـ props مختلفة.`,
            when: R`فكّر في framework لما: شاشات كتير بتتنقل بينها، أو حالة بتتعرض في كذا مكان وبتتغير كتير (سلة، dashboard، chat)، أو فريق أكتر من شخص محتاج طريقة واحدة، أو الشغل اللي بتقدّم عليه بيطلب واحد معين. ولما تختار تتعلم أنهي: عدّ الإعلانات في مدينتك (التمرين الأخير)، مش الترند.`,
            mistakes: R`تتعلم framework قبل ما تعرف DOM و events و async: كل حاجة هتبان سحر. وتصدّق رقم «الأكتر طلبًا» من غير مصدر ولا تاريخ. وتقرا تحميلات npm على إنها عدد مطورين. وتستخدم framework وتعدّل الـ DOM بإيدك من وراه، فالشاشة والحالة يختلفوا تاني. وتفتكر إن الفريمورك بيحل الـ accessibility لوحده (درس «إمتى framework غلط»).`
          },
          teach: R`## الفكرة

سلة مطعم فيها نفس المعلومة في ٣ أماكن: رقم فوق، ولستة، وإجمالي. هنكتبها مرة بالطريقة «العادية» ونقيس الباج، ومرة بطريقة الفريموركات (الشاشة دالة من الحالة) من غير أي مكتبة. وبعدين نشوف الفريمورك بيزوّد إيه فوق ده، ونقرا أرقام السوق من مصادرها. الصفحات اتجرّبت في Chrome 157.

---

## ١. الطريقة العادية: كل حدث بيحدّث الأماكن بإيده

النسخة اللي في التمرين الأول: [[count]] و [[total]] متغيرين، وكل زرار بيحدّث [[#badge]] و [[#total]] ويزوّد أو يشيل [[li]]. ضغطتين على «+ كشري» وبعدين «شيل»:

~~~text اللي اتقاس
badge=2 items=1 total=45
~~~

الشاشة بتكذب: الرقم ٢ والسلة فيها واحد. مش باج «صعب»، باج **نسيان**: listener الشيل نسي يحدّث [[count]]. وكل ميزة جديدة = أماكن أكتر تنساها.

---

## ٢. الشاشة دالة من الحالة

~~~live 300 cart.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>السلة: نفس الحالة في ٣ أماكن</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; }
  header { display: flex; justify-content: space-between; background: #f3f4f6; padding: 8px 12px; border-radius: 8px; }
  li { display: flex; gap: 8px; align-items: center; margin-block: 4px; }
  button { font: inherit; }
  .empty { color: #777; }
</style>
</head>
<body>
<header><strong>مطعم سُفرة</strong><span>السلة: <b id="badge">0</b></span></header>
<p><button type="button" data-add="كشري" data-price="45">+ كشري ٤٥</button> <button type="button" data-add="فول" data-price="20">+ فول ٢٠</button></p>
<ul id="list"></ul>
<p>الإجمالي: <b id="total">0</b> جنيه</p>
<button type="button" id="pay">ادفع</button>
<script>
  const state = { items: [] };
  function render() {
    const { items } = state;
    document.querySelector("#badge").textContent = items.length;
    document.querySelector("#list").innerHTML = items.length
      ? items.map((it, i) => $__bt<li>$__{it.name} $__{it.price} <button type="button" data-remove="$__{i}">شيل</button></li>$__bt).join("")
      : $__bt<li class="empty">السلة فاضية</li>$__bt;
    document.querySelector("#total").textContent = items.reduce((sum, it) => sum + it.price, 0);
    document.querySelector("#pay").disabled = items.length === 0;
  }
  function setState(change) {
    change(state);
    render();
  }
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) setState((s) => s.items.push({ name: add.dataset.add, price: Number(add.dataset.price) }));
    const remove = e.target.closest("[data-remove]");
    if (remove) setState((s) => s.items.splice(Number(remove.dataset.remove), 1));
  });
  render();
</script>
</body>
</html>
~~~

نفكه:

~~~text cart.html
const state = { items: [] };
~~~

**الحالة في مكان واحد بس.** مفيش [[count]] ولا [[total]]: الاتنين محسوبين من [[items]] وقت الرسم.

~~~text cart.html
function render() {
  const { items } = state;
  document.querySelector("#badge").textContent = items.length;
~~~

[[render]] بتكتب **كل** حاجة على الشاشة من [[state]]: الرقم من [[items.length]]، واللستة من [[items.map]]، والإجمالي من [[items.reduce]]، و «ادفع» مقفول لو [[items.length === 0]]. مفيش «زوّد واحد» و «انقص واحد».

~~~text cart.html
function setState(change) {
  change(state);
  render();
}
~~~

الطريق **الوحيد** لتغيير الحالة: [[setState]] بتاخد دالة بتعدّل، وبعدها بترسم على طول. فمستحيل تغيّر الحالة وتنسى الشاشة.

~~~text اللي اتقاس (كشري وفول وبعدين «شيل» على الكشري)
render: badge=1 items=فول 20 شيل total=20 pay.disabled=false
empty: السلة فاضية pay.disabled=true
~~~

> الأسماء والأسعار هنا جاية من [[data-add]] احنا كاتبينه، فـ [[innerHTML]] أمان. لو الاسم جاي من اليوزر لازم تهرّبه الأول (درس «innerHTML هي الباب»). والفريموركات بتهرّب لوحدها.

---

## ٣. الفريمورك بيزوّد إيه فوق [[render]] بتاعنا

| المشكلة | [[render]] بتاعنا | الفريمورك |
|---|---|---|
| تحديث الشاشة من الحالة | بنرسم اللستة كلها بـ [[innerHTML]] | بيغيّر اللي اتغير بس (virtual DOM أو signals أو compiler)، فالـ focus والكتابة في الـ inputs مبيضيعوش |
| الأمان | لازم تهرّب بإيدك | [[{name}]] في JSX أو [[{{ name }}]] في Vue بيتهرّب لوحده |
| الأجزاء اللي بتتكرر | دوال زي [[createCounter]] بإيدك | components بـ props و state و lifecycle |
| الشاشات | [[hashchange]] و [[pushState]] بإيدك | router بـ links و params وتحميل كود الشاشة لما تحتاجها |
| الأدوات | Console | devtools بتوريك الحالة والـ components، وأدوات اختبار، و SSR |
| الفريق | كل واحد بطريقته | طريقة واحدة ووثائق واحدة، وأي حد جديد بيفهم المشروع |

كل سطر في الجدول ده ممكن تكتبه بنفسك، وده بالظبط «الوقت اللي بيتوفّر»: الفريمورك هو الكود ده مكتوب ومختبر ومتوثّق.

---

## ٤. السوق: الأرقام من مصادرها

**استبيان Stack Overflow 2026** (قسم Technology، سؤال الـ web frameworks اللي اشتغلت بيها بجد السنة اللي فاتت). قريناه يوم ٢١ نوفمبر 2026 من [[survey.stackoverflow.co/2026/technology]]، وجاوب على السؤال 10,281 شخص:

| التقنية | عدد اللي اختاروها | النسبة |
|---|---|---|
| Node.js | 4,769 | 46.4٪ |
| React | 4,265 | 41.5٪ |
| Next.js | 2,117 | 20.6٪ |
| jQuery | 2,028 | 19.7٪ |
| Vue.js | 1,773 | 17.2٪ |
| Angular | 1,642 | 16.0٪ |
| Svelte | 802 | 7.8٪ |

بيقيس إيه: ناس **اختاروا يجاوبوا** على استبيان (مش كل المطورين)، وكل واحد بيختار أكتر من حاجة. مبيقيسش: الوظايف المتاحة ولا المرتبات في مدينتك. والسؤال بيخلط runtimes (Node) مع frameworks.

**تحميلات npm** (التمرين التالت): React 275 مليون في أسبوع ١٣–١٩ نوفمبر 2026. بتقيس تنزيلات مش مطورين.

**إعلانات الشغل في مدينتك** (التمرين الرابع): أقرب حاجة لسؤالك الحقيقي «أتعلم إيه عشان أشتغل». عدّها بنفسك.

> متصدقش أي «X٪ من الوظايف بتطلب Y» من غير ما تعرف: مين قاس، وإمتى، وعلى كام عيّنة، وبيقيس إيه بالظبط.

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| الفريمورك بيوفّر إيه؟ | باجات النسيان (الشاشة دالة من الحالة)، والشاشات، والـ components، وطريقة واحدة للفريق |
| أعمل ده من غير framework؟ | آه: حالة في مكان واحد + [[render]] + [[setState]]. كويس للصفحات الصغيرة |
| أي framework السوق عايزه؟ | عدّ إعلانات مدينتك، واقرا الاستبيانات بمصدرها وتاريخها وعيّنتها |
| تحميلات npm = عدد المطورين؟ | لأ: CI والـ dependencies بيتعدّوا، فهي مقياس انتشار مش طلب |`,
          lines: [
            R`الحالة كلها في object واحد: لستة الأصناف. مفيش متغير تاني لعدد أو لإجمالي.`,
            R`[[render]] الدالة الوحيدة اللي بتكتب على الشاشة، وكل حاجة فيها محسوبة من [[state]].`,
            R`destructuring بيطلّع [[items]] من [[state]] عشان السطور اللي تحت تبقى أقصر.`,
            R`الرقم فوق محسوب من [[items.length]]، فمستحيل يختلف عن عدد الأصناف.`,
            R`اللستة: لو فيه أصناف بنرسمها، وإلا سطر «السلة فاضية». والـ [[?]] ده الـ ternary operator.`,
            R`كل صنف بيبقى [[li]] فيه زرار عليه [[data-remove]] برقم مكانه في الـ array عشان نعرف نشيله.`,
            R`لو اللستة فاضية بنرسم سطر واحد بـ class [[empty]] بدل لستة فاضية مش مفهومة.`,
            R`الإجمالي بـ [[reduce]]: بيبدأ من 0 ويجمع سعر كل صنف، ومحسوب كل مرة مش متخزّن.`,
            R`زرار الدفع بيتقفل لوحده لما السلة فاضية، من نفس الحالة.`,
            R`قفلة [[render]]. أي حاجة جديدة تتعرض على الشاشة مكانها هنا بس.`,
            R`[[setState]] الطريق الوحيد لتغيير الحالة: بتاخد دالة بتعدّل [[state]].`,
            R`بتنادي الدالة اللي اتبعتت وبتديها الحالة تعدّل فيها.`,
            R`وبعدين بترسم على طول، فمفيش تغيير في الحالة من غير ما الشاشة تتحدّث.`,
            R`قفلة [[setState]]. كده الحالة والشاشة مربوطين في مكانين بس.`,
            R`listener واحد على الصفحة كلها بيمسك أي ضغطة (event delegation).`,
            R`[[closest("[data-add]")]] بيشوف الضغطة كانت على زرار إضافة ولا لأ.`,
            R`لو آه: صنف جديد بالاسم والسعر من الـ [[data-*]]، و [[Number]] بيحوّل السعر من نص لرقم.`,
            R`نفس الفكرة لزرار «شيل»: بيدوّر على أقرب عنصر عليه [[data-remove]].`,
            R`[[splice(index, 1)]] بيشيل صنف واحد من مكانه، و [[setState]] بيرسم الباقي.`,
            R`قفلة الـ listener. الأحداث بتغيّر الحالة بس، ومبتلمسش الشاشة خالص.`,
            R`أول رسم وقت فتح الصفحة، عشان «السلة فاضية» و «ادفع» المقفول يبانوا من الأول.`,
          ],
          ref: [
            { t: "MDN Curriculum: JavaScript fundamentals (6.14 Libraries and frameworks)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
            { t: "MDN: Introduction to client-side frameworks", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Introduction" },
            { t: "MDN: Framework main features", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Main_features" },
            { t: "Stack Overflow Developer Survey 2026: Technology", url: "https://survey.stackoverflow.co/2026/technology" },
            { t: "npm registry: download counts API", url: "https://github.com/npm/registry/blob/main/docs/download-counts.md" },
          ],
          pre: [{ to: "js/الـ DOM مش مكان الحالة", why: R`نفس فكرة «الحالة في مكان واحد» من أول مرة` }, { to: "react/UI = f(state)", why: R`نفس الفكرة جوه React بالتفصيل` }, { to: "js/innerHTML هي الباب", why: R`ليه [[innerHTML]] بأسماء جاية من اليوزر خطر` }],
        },
        {
          cmd: "إمتى framework غلط: الحجم والصيانة والـ accessibility",
          title: "إمتى الفريمورك اختيار غلط: نفس العدّاد بـ ٧ طرق متقاس بالبايت، والتحديثات الكبيرة، والـ SPA اللي بيتوّه قارئ الشاشة",
          desc: R`الفريمورك مش ببلاش. ٦ أسباب ممكن تخليه اختيار غلط:
• **overkill:** صفحة فيها فورم وعدّاد مش محتاجة نظام كامل.
• **حجم الـ JavaScript:** كل زائر بينزّل الفريمورك ويشغّله قبل ما الصفحة تشتغل. قسناها: نفس العدّاد ٢٧١ بايت vanilla و ٦٩ KB بـ React (بعد gzip).
• **وقت التعلم:** كل فريمورك ليه مفاهيمه وأدواته فوق JavaScript.
• **كود موجود مش متوافق:** موقع قديم بـ jQuery أو plugins بتعدّل الـ DOM بنفسها، والفريمورك عايز يبقى هو المسيطر على الـ DOM.
• **التحديثات:** كل major version فيها breaking changes ووقت migration. Angular بينزّل major كل ٦ شهور تقريبًا.
• **الـ accessibility في الـ SPA:** لما الشاشة تتغير من غير reload، المتصفح مبيعملش اللي بيعمله لوحده في الصفحات العادية: الـ focus بيفضل مكانه، وقارئ الشاشة مبيقولش حاجة، والعنوان مبيتغيرش، إلا لو انت (أو الـ router) عملتهم.`,
          example: R`// يبني كل ملف في bundle واحد مصغّر (production) ويقيس حجمه خام وبعد gzip
import { build } from "esbuild";
import { gzipSync } from "node:zlib";
for (const file of process.argv.slice(2)) {
  const out = await build({
    entryPoints: [file], bundle: true, minify: true, write: false,
    format: "esm", platform: "browser", logLevel: "silent",
    conditions: ["production"], jsx: "automatic",
    jsxImportSource: file.includes("preact") ? "preact" : "react",
    define: {
      "process.env.NODE_ENV": '"production"',
      __VUE_OPTIONS_API__: "false",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    },
  });
  const code = out.outputFiles[0].contents;
  const gz = gzipSync(code, { level: 9 }).length;
  console.log(file.padEnd(16), String(code.length).padStart(7), "B", String(gz).padStart(7), "B gzip");
}`,
          try: R`في فولدر تجربة: [[npm init -y]] و [[npm install esbuild preact]]، واحفظ السكربت كـ [[measure.mjs]] (الامتداد [[.mjs]] بيخلي [[import]] يشتغل من غير [["type": "module"]]). اكتب عدّاد vanilla في [[vanilla.js]] وعدّاد Preact في [[preact.jsx]] (الاتنين في الشرح)، وشغّل [[node measure.mjs vanilla.js preact.jsx]].`,
          sol: R`~~~text الناتج (Node 24.22، esbuild 0.28.2، preact 11.2.0)
vanilla.js           378 B     271 B gzip
preact.jsx         13716 B    5843 B gzip
~~~

Preact من أصغر الفريموركات، ومع ذلك الصفحة بقت أكبر ٢١ مرة بعد gzip. ده مش غلط في Preact: ده تمن الـ diffing والـ hooks والـ components اللي العدّاد ده مش محتاجهم. باقي الأرقام (Vue و Svelte و React) في الشرح.`,
          practice: [
            { lvl: 'سريع', t: R`**احسب:** لو الزائر على اتصال 1.6 ميجابت في الثانية، كل نسخة من العدّاد محتاجة قد إيه عشان تتنزّل بس (من غير parse ولا تشغيل)؟ استخدم أرقام الـ gzip اللي في الشرح، واكتب الحساب بـ Node.`, done: R`عندك جدول بـ ٦ أرقام بالملي ثانية، وعارف إن ده حساب للتنزيل بس، والـ parse والتشغيل وقت زيادة فوقه.`, sol: R`~~~bash
node -e 'const kb={vanilla:271,lit:3477,preact:5843,svelte:22671,vue:23064,react:69209};for(const [k,b] of Object.entries(kb))console.log(k.padEnd(8),(b*8/1.6e6*1000).toFixed(1)+" ms")'
~~~

~~~text الناتج
vanilla  1.4 ms
lit      17.4 ms
preact   29.2 ms
svelte   113.4 ms
vue      115.3 ms
react    346.0 ms
~~~

- [[b * 8]]: البايت = ٨ bits، والسرعة بالـ bits. و [[/ 1.6e6]]: 1.6 مليون bit في الثانية. و [[* 1000]]: من ثانية لملي ثانية.
- ده **حساب**، مش قياس على موبايل حقيقي. وفوقه: الـ latency (كل طلب بياخد رحلة للسيرفر ويرجع)، ووقت الـ parse والـ compile والتشغيل على موبايل ضعيف، وده بيبان في Performance tab في DevTools.
- و 69 KB مش نهاية الدنيا لتطبيق كبير بيتفتح كل يوم. المشكلة لما يبقى ده تمن **عدّاد** أو صفحة هبوط محتاج تفتح بسرعة على 3G.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اكتب سكربت بيجيب من الـ registry تاريخ أول نسخة من كل major ([[16.0.0]] و [[17.0.0]]…) لأي package، وشغّله على [[react]] و [[@angular/core]] و [[vue]]. وبعدين احسب: لو بنيت مشروع على Angular 18 في مايو 2024، كام major نزل لحد النهارده؟`, done: R`السكربت بيطبع آخر ٥ majors بتواريخهم لكل package، وعرفت إن Angular نزل ٤ majors بعد 18 لحد نوفمبر 2026.`, sol: R`~~~js majors.mjs
const name = process.argv[2] ?? "react";
const res = await fetch($__bthttps://registry.npmjs.org/$__{name.replace("/", "%2F")}$__bt);
if (!res.ok) throw new Error($__bt$__{name}: HTTP $__{res.status}$__bt);
const { time } = await res.json();
const firsts = [];
for (const [version, date] of Object.entries(time)) {
  const m = /^([1-9]\d*)\.0\.0$/.exec(version);
  if (m) firsts.push([Number(m[1]), date.slice(0, 10)]);
}
firsts.sort((a, b) => a[0] - b[0]);
console.log($__bt$__{name}: آخر $__{Math.min(5, firsts.length)} نسخ major$__bt);
for (const [major, date] of firsts.slice(-5)) console.log($__bt  $__{String(major).padStart(3)}.0.0  $__{date}$__bt);
~~~

~~~text الناتج (Node 24.22، يوم 21 نوفمبر 2026)
react: آخر 5 نسخ major
   15.0.0  2016-04-07
   16.0.0  2017-09-26
   17.0.0  2020-10-20
   18.0.0  2022-03-29
   19.0.0  2024-12-05
@angular/core: آخر 5 نسخ major
   18.0.0  2024-05-22
   19.0.0  2024-11-19
   20.0.0  2025-05-28
   21.0.0  2025-11-19
   22.0.0  2026-06-03
vue: آخر 3 نسخ major
    1.0.0  2015-10-27
    2.0.0  2016-09-30
    3.0.0  2020-09-18
~~~

- [[name.replace("/", "%2F")]]: الـ scoped packages ([[@angular/core]]) لازم الـ [[/]] يتكتب [[%2F]] في URL الـ registry.
- [[doc.time]]: object فيه تاريخ نشر كل نسخة. والـ regex [[/^([1-9]\d*)\.0\.0$/]] بياخد النسخ اللي على شكل [[X.0.0]] بس ومن غير [[0.0.0]].
- **Angular 18 (مايو 2024) → 22 (يونيو 2026):** ٤ majors في سنتين، كل ٦ شهور تقريبًا، وكل واحدة ليها migration guide و [[ng update]]. **React:** ٥ majors في ٨ سنين ونص، بس 18 → 19 غيّر حاجات كتير. **Vue 2 → 3:** أربع سنين، وكانت إعادة كتابة كبيرة لكتير من المشاريع.
- **أول نسخة مختلفتش:** جرّبنا الأول بـ [[child_process]] و [[npm view]]، وطلع تحذير [[DEP0190]] من Node 24 عن [[shell: true]] مع arguments. الـ [[fetch]] للـ registry على طول أبسط ومن غير shell.` },
            { lvl: 'تطبيق', t: R`**صلّح الـ SPA:** الصفحة دي بتغيّر الشاشة بـ [[hashchange]] وبس. افتحها، دوس [[Tab]] لحد «المنيو» ودوس [[Enter]]. الـ focus فين؟ العنوان اتغير؟ قارئ الشاشة هيقول إيه؟ صلّح التلاتة.`, done: R`بعد الضغط الـ focus على عنوان الشاشة الجديدة ([[H1]])، وعنوان التاب «المنيو | مطعم سُفرة»، وفيه [[aria-live]] بيقول «اتفتحت صفحة المنيو»، والـ back button بيرجّع للرئيسية وعنوانها.`, sol: R`**قبل التصليح** (نفس الصفحة من غير سطور العنوان والـ focus والإعلان)، اتجرّب في Chrome 157:

~~~text اللي اتقاس
broken: title=الرئيسية | مطعم سُفرة | focus=A:المنيو | h1=المنيو | live=""
~~~

الشاشة بقت «المنيو» بس العنوان لسه «الرئيسية»، والـ focus لسه على اللينك فوق، وقارئ الشاشة مقالش أي حاجة. اللي بيستخدم الكيبورد لازم يدوس [[Tab]] من الأول لحد المحتوى الجديد، واللي مبيشوفش ميعرفش إن حاجة اتغيرت أصلًا.

**بعد التصليح:**

~~~live 260 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الرئيسية | مطعم سُفرة</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  nav a { margin-inline-end: 12px; }
  h1:focus { outline: 3px solid #2563eb; outline-offset: 4px; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  #log { font-size: 13px; color: #555; }
</style>
</head>
<body>
<nav aria-label="الصفحات">
  <a href="#/">الرئيسية</a>
  <a href="#/menu">المنيو</a>
  <a href="#/contact">اتصل بينا</a>
</nav>
<main id="view"></main>
<p id="announcer" class="sr-only" aria-live="polite"></p>
<p id="log"></p>
<script>
  const pages = {
    "/": { title: "الرئيسية", body: "أهلا بيك في سُفرة." },
    "/menu": { title: "المنيو", body: "كشري ٤٥، فول ٢٠، شاي ١٠." },
    "/contact": { title: "اتصل بينا", body: "كلمنا من ١٢ الضهر لـ ١٢ بالليل." },
  };
  const view = document.querySelector("#view");
  const announcer = document.querySelector("#announcer");
  function show(first) {
    const path = location.hash.slice(1) || "/";
    const page = pages[path] ?? { title: "مش موجودة", body: "الصفحة دي مش موجودة." };
    view.innerHTML = $__bt<h1 tabindex="-1">$__{page.title}</h1><p>$__{page.body}</p>$__bt;
    document.title = $__bt$__{page.title} | مطعم سُفرة$__bt;
    if (!first) {
      view.querySelector("h1").focus();
      announcer.textContent = $__btاتفتحت صفحة $__{page.title}$__bt;
    }
    document.querySelector("#log").textContent = $__btfocus على: $__{document.activeElement.tagName}$__bt;
  }
  addEventListener("hashchange", () => show(false));
  show(true);
</script>
</body>
</html>
~~~

~~~text اللي اتقاس (Chrome 157)
بعد «المنيو»: title=المنيو | مطعم سُفرة، focus=H1:المنيو، announcer=اتفتحت صفحة المنيو
بعد history.back(): hash=""، title=الرئيسية | مطعم سُفرة، focus على h1 «الرئيسية»
بعد #/nope: title=مش موجودة | مطعم سُفرة
~~~

- [[document.title = ...]]: قارئ الشاشة والتاب والـ history كلهم بيقروا العنوان.
- [[<h1 tabindex="-1">]] و [[.focus()]]: [[tabindex="-1"]] بيخلي العنوان يقبل focus من الكود من غير ما يدخل في ترتيب الـ [[Tab]]. والـ focus عليه = قارئ الشاشة بيقرا العنوان، والـ [[Tab]] الجاية تبدأ من المحتوى الجديد.
- [[aria-live="polite"]]: أي نص يتكتب في العنصر ده بيتقري لما قارئ الشاشة يفضى. والـ class [[sr-only]] بيخفيه من الشاشة بس من غير ما يخفيه عن قارئ الشاشة (مش [[display: none]]).
- [[if (!first)]]: أول تحميل المتصفح بيعمل الصح لوحده، فمنحركش الـ focus.
- الـ back button شغال لوحده لأننا بنستخدم [[#]] و [[hashchange]]. مع [[pushState]] لازم تسمع على [[popstate]] (درس «pushState و popstate»).
- **الفريمورك بيحل ده؟** بعض الـ routers بيعمله (Angular Router و SvelteKit و Next.js بيعلنوا تغيير الصفحة)، وبعضها لأ. اتأكد بنفس الاختبار: [[Tab]] و [[Enter]] وبص على [[document.activeElement]] والعنوان.` },
            { lvl: 'تحدي', t: R`**قرر واكتب ليه:** لكل مشروع اختار vanilla ولا library ولا framework، وفي ٣ سطور ليه، بأرقام من الدرس: (١) صفحة هبوط لعيادة أسنان فيها فورم حجز. (٢) لوحة تحكم لمطعم فيها طلبات بتتحدّث كل دقيقة و ١٢ شاشة و ٣ مطورين. (٣) widget «احسب القسط» هيتحط في مواقع ناس تانية مبنية بأي حاجة.`, done: R`كل قرار فيه رقم (حجم أو عدد شاشات أو فريق) وسبب واحد على الأقل من الـ ٦ أسباب، ومفيش «لأنه مشهور».`, sol: R`| المشروع | القرار | ليه |
|---|---|---|
| صفحة هبوط لعيادة | vanilla (و HTML و CSS) | محتوى ثابت وفورم واحد. الـ JS اللي محتاجه (validation و [[fetch]]) أقل من ١ KB، والصفحة لازم تفتح بسرعة على موبايل من إعلان. React هنا ٦٩ KB عشان فورم = overkill. الـ accessibility بتاعة الفورم من HTML نفسه |
| لوحة تحكم المطعم | framework (React أو Vue أو Angular حسب الفريق) | حالة بتتعرض في كذا مكان وبتتغير كل دقيقة (درس «ليه frameworks»)، و ١٢ شاشة محتاجة router، و ٣ مطورين محتاجين طريقة واحدة. الـ ٦٩ KB بتتنزّل مرة وتتكاش، والناس بتفتحها كل يوم. واختار الفريمورك اللي الفريق يعرفه |
| widget في مواقع تانية | Web Component vanilla أو library صغيرة | الموقع اللي هيتحط فيه ممكن يكون فيه React بنسخة تانية أو Angular أو jQuery: framework جوه framework = تعارض ونسختين. Custom element شغال في أي مكان، وصغير (اتعامل معاه زي التوولتيب: أقل من ١ KB بإيدك) |

**الغلطة الشائعة:** تختار نفس الأداة لكل حاجة لأنها اللي بتعرفها. السؤال الصح: الصفحة دي بتعمل إيه، ومين بيفتحها وعلى إيه، ومين هيصونها بعد سنة.` },
          ],
          flag: "script",
          deep: {
            why: R`أغلب الكلام عن الفريموركات مدح. بس كل dependency ليها تمن بيدفعه كل زائر (بايتات ووقت تشغيل) وكل مطور بعدك (تحديثات ومفاهيم). المحترف بيعرف يقول «مش محتاجين framework هنا» ويثبت ده برقم، أو يقول «محتاجينه» وهو عارف هيدفع إيه.`,
            how: R`**الحجم:** الـ bundler بيضم كود الفريمورك اللي استخدمته (أو اللي مقدرش يثبت إنه مش مستخدم). React بتجيب [[react-dom]] كله تقريبًا مهما كان التطبيق صغير، و Svelte بيحوّل الـ component لكود عادي بس فيه runtime برضه، و Preact معمول صغير من الأساس. والمتصفح لازم ينزّل الـ JS ويعمله parse و compile وينفّذه قبل ما الزرار يشتغل.

**التحديثات:** semver: الـ major معناها «فيه حاجات اتكسرت». الفريموركات بتدعم كل major فترة محددة (Angular بينشر جدول دعم لكل نسخة)، وبعدها مفيش security fixes. فالمشروع لازم يتحدّث، وكل تحديث شغل.

**الـ SPA:** في صفحة عادية، كل لينك = صفحة جديدة: المتصفح بيصفّر الـ focus، وقارئ الشاشة بيقرا العنوان الجديد. في SPA الـ JS بيبدّل المحتوى، فالمتصفح مش عارف إن «صفحة» اتغيرت. لازم الكود (أو الـ router) يعمل ٣ حاجات: العنوان، والـ focus، والإعلان.`,
            when: R`اسأل قبل ما تبدأ: (١) فيه حالة بتتغير وبتتعرض في كذا مكان؟ (٢) فيه شاشات كتير؟ (٣) الفريق كام واحد وبيعرف إيه؟ (٤) الصفحة لازم تفتح بسرعة على موبايل ضعيف أو من محرك بحث؟ (٥) هيتحط جوه موقع تاني؟ (٦) مين هيحدّثه بعد سنتين؟ لو (١) و (٢) لأ: غالبًا vanilla أو HTML بس. ولو (٤) آه مع framework: SSR أو static generation (Next.js و Astro و SvelteKit).`,
            mistakes: R`تقيس الحجم من [[npm view dist.unpackedSize]] (ده حجم الـ package على الديسك، مش اللي بيتنزّل للزائر): قيس الـ bundle. وتقيس بنسخة development (React dev أكبر بكتير). وتفتكر إن الـ router بيعمل الـ accessibility لوحده من غير ما تختبر بالكيبورد. وتسيب مشروع على major قديم لحد ما الدعم يخلص. وتحط framework جوه widget بيتحط في مواقع غيرك.`
          },
          teach: R`## الفكرة

نفس العدّاد بالظبط (زرار ورقم) اتكتب ٧ مرات، واتبنى بنفس الأداة ونفس الإعدادات، واتقاس بالبايت. وبعدين بنشوف التحديثات الكبيرة بتواريخها من الـ registry، والـ accessibility في الـ SPA متقاسة في المتصفح. الكل اتعمل يوم ٢١ نوفمبر 2026 بـ Node 24.22 و esbuild 0.28.2، والصفحات في Chrome 157.

---

## ١. سكربت القياس

ده المثال. بيبني كل ملف بـ esbuild في bundle واحد للمتصفح ويقيسه:

~~~text measure.mjs
const out = await build({
  entryPoints: [file], bundle: true, minify: true, write: false,
  format: "esm", platform: "browser", logLevel: "silent",
~~~

- [[bundle: true]]: يضم الملف وكل اللي عمله [[import]] (من [[node_modules]] كمان) في ملف واحد، زي ما Vite بيعمل في الـ build.
- [[minify: true]]: يشيل المسافات ويقصّر الأسماء: ده اللي بيتنزّل في production.
- [[write: false]]: ميكتبش ملف، يرجّع الناتج في الذاكرة ([[out.outputFiles]]).

~~~text measure.mjs
  conditions: ["production"], jsx: "automatic",
  jsxImportSource: file.includes("preact") ? "preact" : "react",
  define: {
    "process.env.NODE_ENV": '"production"',
    __VUE_OPTIONS_API__: "false",
~~~

- [[conditions: ["production"]]] و [[process.env.NODE_ENV]]: الـ packages بتختار نسخة production (من غير رسايل التطوير). من غيرهم React بتطلع أكبر بكتير، والمقارنة تبقى ظالمة.
- [[jsx: "automatic"]]: يحوّل JSX لنداءات [[jsx()]] من [[preact]] أو [[react]] حسب اسم الملف.
- أعلام Vue ([[__VUE_OPTIONS_API__]] وغيره): نفس اللي Vite بيحطه لما تقول إنك مش محتاج Options API والـ devtools.

~~~text measure.mjs
  const code = out.outputFiles[0].contents;
  const gz = gzipSync(code, { level: 9 }).length;
~~~

[[contents]] بايتات الملف، و [[gzipSync]] (من [[node:zlib]]) بيضغطها زي ما السيرفر بيعمل قبل ما يبعت. **الـ gzip هو اللي بيعدّي على الشبكة فعلًا.**

---

## ٢. النتيجة: ٧ عدّادات

كل نسخة اتجرّبت في Chrome (٣ ضغطات = [[3]]). الكود: vanilla و lit-html والـ mini framework و Preact في درس «library ولا framework»، والباقي هنا:

~~~jsx react.jsx
import { useState } from "react";
import { createRoot } from "react-dom/client";
function Counter() {
  const [count, setCount] = useState(0);
  return <button type="button" onClick={() => setCount(count + 1)}>دوسات: <output>{count}</output></button>;
}
createRoot(document.querySelector("#app")).render(<Counter />);
~~~

~~~js vue.js
import { createApp, ref, h } from "vue";
createApp({
  setup() {
    const count = ref(0);
    return () => h("button", { type: "button", onClick: () => count.value++ }, ["دوسات: ", h("output", count.value)]);
  },
}).mount("#app");
~~~

~~~text Counter.svelte
<script>
  let count = $state(0);
</script>
<button type="button" onclick={() => count++}>دوسات: <output>{count}</output></button>
~~~

~~~text الناتج: node measure.mjs vanilla.js minifw.js lit.js preact.jsx svelte-main.js vue.js react.jsx
vanilla.js           378 B     271 B gzip
minifw.js            500 B     357 B gzip
lit.js              7595 B    3477 B gzip
preact.jsx         13716 B    5843 B gzip
svelte-main.js     60322 B   22671 B gzip
vue.js             57382 B   23064 B gzip
react.jsx         223683 B   69209 B gzip
~~~

| النسخة (النسخة بتاعتها) | بعد gzip | قد vanilla كام مرة |
|---|---|---|
| vanilla | ٢٧١ بايت | ١ |
| lit-html 3.3.3 | ٣٫٤ KB | ١٣ |
| Preact 11.2.0 | ٥٫٧ KB | ٢٢ |
| Svelte 5.59.1 | ٢٢٫١ KB | ٨٤ |
| Vue 3.5.46 | ٢٢٫٥ KB | ٨٥ |
| React 19.3.1 (react-dom) | ٦٧٫٦ KB | ٢٥٥ |

**اقرا الأرقام صح:**
- ده **أقل** حجم لكل فريمورك (التمن الثابت). التطبيق لما يكبر، كودك بيزيد بس الفريمورك مبيزيدش، فالفرق بالنسبة بيقل.
- Svelte اتعمله compile بـ [[svelte/compiler]] وبعدين bundle بـ esbuild. بـ Vite والـ plugin الرسمي ممكن الرقم يختلف شوية، احنا قسنا بـ esbuild بس.
- ده تنزيل بس. الـ parse والتشغيل على موبايل ضعيف بيزوّدوا (Performance tab في DevTools، درس «Performance و Coverage»).

---

## ٣. باقي الأسباب

**overkill:** لو الصفحة فيها فورم وعدّاد، كل اللي الفريمورك بيقدّمه (diffing و router و components) مش هيتستخدم، والزائر بيدفع تمنه.

**وقت التعلم:** فوق JavaScript، كل فريمورك ليه مفاهيمه: JSX و hooks وقواعدها في React، والـ templates والـ directives والـ reactivity في Vue، والـ DI والـ decorators والـ signals و RxJS في Angular، والـ runes ([[$state]]) في Svelte 5. والفريق كله لازم يتعلمها.

**كود موجود مش متوافق:** React بتفترض إنها لوحدها اللي بتغيّر الـ DOM جوه الـ root بتاعها. لو plugin قديم (jQuery مثلًا) غيّر نفس العناصر، React مش هتعرف والشاشة تتلخبط. الحل غالبًا Web Components في النص (درس «Web Components في React و Vue») أو تحويل تدريجي جزء جزء.

**التحديثات:** من الـ registry (التمرين التاني):

| الفريمورك | آخر majors |
|---|---|
| React | 16 (سبتمبر 2017)، 17 (أكتوبر 2020)، 18 (مارس 2022)، 19 (ديسمبر 2024) |
| Angular | 18 (مايو 2024)، 19 (نوفمبر 2024)، 20 (مايو 2025)، 21 (نوفمبر 2025)، 22 (يونيو 2026) |
| Vue | 2 (سبتمبر 2016)، 3 (سبتمبر 2020) |

كل major = اقرا الـ migration guide، وحدّث المكتبات اللي حواليها، واختبر. ومكتبة صغيرة زي dayjs لسه على 1.x من 2018.

---

## ٤. الـ accessibility في الـ SPA

صفحة بـ ٣ «شاشات» بتتبدّل بـ [[hashchange]] و [[innerHTML]]، من غير أي حاجة زيادة. focus على لينك «المنيو» و [[Enter]]:

~~~text اللي اتقاس (Chrome 157)
broken: title=الرئيسية | مطعم سُفرة | focus=A:المنيو | h1=المنيو | live=""
~~~

| المشكلة | في صفحة عادية | في الـ SPA دي |
|---|---|---|
| العنوان | بيتغير مع كل صفحة | فضل «الرئيسية» والمحتوى «المنيو» |
| الـ focus | بيرجع لأول الصفحة الجديدة | فضل على اللينك فوق |
| قارئ الشاشة | بيقرا عنوان الصفحة الجديدة | ساكت |
| الـ back button | شغال | شغال هنا عشان [[#]]، ومع [[pushState]] محتاج [[popstate]] |

التصليح ٣ سطور (العنوان، و [[focus()]] على الـ [[h1]]، و [[aria-live]])، والصفحة كاملة في التمرين التالت.

---

## الخلاصة

| السبب | تعرفه إزاي |
|---|---|
| overkill | الصفحة فيها حالة بتتغير وشاشات كتير؟ لو لأ، مش محتاج |
| الحجم | قيس الـ bundle بعد gzip في production، مش [[unpackedSize]] |
| وقت التعلم | الفريق يعرف إيه، وهيتعلم إيه، وفي قد إيه |
| كود موجود | فيه حاجة تانية بتعدّل نفس الـ DOM؟ |
| التحديثات | تواريخ الـ majors وجدول الدعم الرسمي |
| الـ SPA | [[Tab]] و [[Enter]] وبص على [[document.activeElement]] والعنوان |`,
          lines: [
            R`[[import { build }]] بيجيب دالة البناء من esbuild اللي متسطب في المشروع بـ [[npm install esbuild]].`,
            R`[[gzipSync]] من [[node:zlib]] الجاهز في Node، بيضغط البايتات زي السيرفر بالظبط.`,
            R`بنلف على كل اسم ملف اتكتب بعد اسم السكربت في الترمنال ([[process.argv.slice(2)]]).`,
            R`[[await build(...)]] بيبني الملف ويستنى لحد ما يخلص، والناتج في [[out]].`,
            R`[[bundle]] يضم كل الـ imports، و [[minify]] يصغّر، و [[write: false]] يخلي الناتج في الذاكرة.`,
            R`[[format: "esm"]] و [[platform: "browser"]]: ملف module للمتصفح، و [[logLevel: "silent"]] من غير رسايل.`,
            R`[[conditions: ["production"]]] بيختار نسخ production من الـ packages، و [[jsx: "automatic"]] بيحوّل JSX.`,
            R`لو اسم الملف فيه [[preact]] الـ JSX يتحوّل لنداءات Preact، وإلا React.`,
            R`[[define]] بيبدّل أسماء في الكود بقيم ثابتة وقت البناء، والكود اللي مش هيتنفّذ بيتشال.`,
            R`[[process.env.NODE_ENV]] بـ [["production"]]: React وغيرها بيشيلوا رسايل وفحوصات التطوير.`,
            R`[[__VUE_OPTIONS_API__]] بـ false: Vue يشيل الـ Options API اللي العدّاد مش بيستخدمها.`,
            R`[[__VUE_PROD_DEVTOOLS__]] بـ false: من غير دعم الـ devtools في production، زي الافتراضي في Vite.`,
            R`نفس الحاجة لرسايل تفاصيل الـ hydration، عشان نقيس النسخة اللي فعلًا بتروح للزائر.`,
            R`قفلة الـ [[define]]. كده الإعدادات زي build حقيقي لـ production.`,
            R`قفلة إعدادات [[build]] والنداء نفسه، و [[await]] استنى لحد ما البناء خلص.`,
            R`[[outputFiles[0].contents]] بايتات الملف المبني (Uint8Array) من غير ما يتكتب على الديسك.`,
            R`[[gzipSync(code, { level: 9 })]] أقوى ضغط، و [[.length]] حجمه بالبايت: ده اللي بيعدّي على الشبكة.`,
            R`بنطبع اسم الملف وحجمه خام وبعد gzip، و [[padStart]] بيرصّ الأرقام يمين في عمود.`,
            R`قفلة الـ loop. كل ملف اتبعت بيطلع في سطر لوحده.`,
          ],
          ref: [
            { t: "MDN Curriculum: JavaScript fundamentals (6.14 Libraries and frameworks)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
            { t: "MDN: Introduction to client-side frameworks", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/Introduction" },
            { t: "esbuild: API", url: "https://esbuild.github.io/api/" },
            { t: "web.dev: Rendering on the Web", url: "https://web.dev/articles/rendering-on-the-web" },
            { t: "MDN: aria-live", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live" },
            { t: "MDN: SPA (Single-page application)", url: "https://developer.mozilla.org/en-US/docs/Glossary/SPA" },
          ],
          pre: [{ to: "js/pushState و popstate", why: R`الـ routing بالـ History API و [[popstate]] للـ back button` }, { to: "web/Performance و Coverage", why: R`تقيس وقت تحميل وتشغيل الـ JS نفسه، مش حجمه بس` }, { to: "js/Web Components في React و Vue", why: R`إزاي component يشتغل جوه أي framework أو من غيره` }],
        },
        {
          cmd: "تختار dependency وتفحصها: npm view و audit",
          title: "تختار مكتبة وتفحصها قبل ما تدخل مشروعك: بتحل مشكلتك؟ متصانة؟ رخصتها؟ حجمها؟ آمنة؟ بأوامر npm حقيقية",
          desc: R`أي dependency بتدخل مشروعك بقت كودك انت: باجاتها باجاتك، وثغراتها ثغراتك. فقبل [[npm install]] اسأل ٥ أسئلة، وكل سؤال ليه أمر:
• **بتحل مشكلتك، والمكسب أكبر من التمن؟** قيس الحجم في الـ bundle وقارنه بالحل بإيدك (درس «كود غيرك»).
• **ليها مجتمع ودعم؟** التحميلات، والـ issues، والوثائق.
• **متصانة؟** آخر نسخة نزلت إمتى: [[npm view <pkg> "time[<version>]"]]، مش [[time.modified]]. و [[deprecated]].
• **رخصتها تسمح؟** [[npm view <pkg> license]]: MIT و ISC و Apache-2.0 و BSD سهلين، و GPL ليها شروط، ومن غير رخصة = مش من حقك.
• **آمنة؟** [[npm audit]] للثغرات المعروفة، و [[npm audit signatures]] للتوقيعات، و [[npm install-scripts ls]] للسكربتات اللي بتشتغل وقت التسطيب، والاسم مكتوب صح (typosquatting)، والـ lockfile و [[npm ci]] عشان كل الأجهزة تاخد نفس النسخ.`,
          example: R`npm view dayjs version license time.modified
npm view dayjs "time[1.11.23]" dist.unpackedSize
npm view left-pad deprecated
npm view "lodash@~4.17.20" version
npm ls
npm audit
npm audit signatures
npm install-scripts ls
npm ci --strict-allow-scripts`,
          try: R`اعمل فولدر [[shop-api]] و [[npm init -y]]، وشغّل الـ ٤ سطور الأولانيين (مش محتاجين تسطيب). وبعدين [[npm install lodash@4.17.20 dayjs --save-exact]] و [[npm install esbuild --save-dev]] وكمّل باقي الأوامر بالترتيب. لما [[npm audit]] يقولك high: صلّحها، وشغّله تاني لحد ما يقول [[found 0 vulnerabilities]].`,
          sol: R`الناتج الكامل لكل أمر في الشرح خطوة بخطوة تحت (npm 11.19.1، يوم ٢١ نوفمبر 2026). الخلاصة:

| الأمر | قال إيه |
|---|---|
| [[npm view dayjs version license time.modified]] | [[1.11.23]] و [[MIT]] و [[2026-08-17]] |
| [[npm view left-pad deprecated]] | [[use String.prototype.padStart()]] |
| [[npm audit]] (مع lodash 4.17.20) | [[1 high severity vulnerability]]، ٤ advisories، و exit code [[1]] |
| [[npm install lodash@4.18.1 --save-exact]] ثم [[npm audit]] | [[found 0 vulnerabilities]] و exit code [[0]] |
| [[npm install-scripts ls]] | [[esbuild@0.28.2 (postinstall: node install.js)]] |
| [[npm ci --strict-allow-scripts]] بعد [[approve]] | [[added 4 packages]] و [[found 0 vulnerabilities]] |`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا البطاقة:** شغّل [[npm view chart.js version license time.modified dist.unpackedSize dependencies repository.url]] و [[npm view chart.js "time[4.6.1]"]]، وجاوب: آخر نسخة نزلت إمتى؟ معتمدة على كام package؟ و [[unpackedSize]] ده هو اللي هيتنزّل للزائر؟`, done: R`جاوبت التلاتة من الناتج، وعارف إن ٦ ميجا دي حجم الـ package على الديسك مش حجم الـ bundle.`, sol: R`~~~text الناتج (npm 11.19.1، يوم 21 نوفمبر 2026)
version = '4.6.1'
license = 'MIT'
time.modified = '2026-10-22T17:23:25.099Z'
dist.unpackedSize = 6227928
dependencies = { '@kurkle/color': '^0.3.0' }
repository.url = 'git+https://github.com/chartjs/Chart.js.git'
~~~

~~~text npm view chart.js "time[4.6.1]"
2026-10-22T17:23:24.755Z
~~~

- **آخر نسخة:** 4.6.1 يوم ٢٢ أكتوبر 2026، يعني متصانة. وهنا [[time.modified]] قريب من تاريخ النسخة، بس ده مش دايمًا (الشرح تحت: left-pad و lodash).
- **الـ dependencies:** واحدة بس ([[@kurkle/color]])، وكل واحدة زيادة = كود تاني لازم تثق فيه.
- **[[unpackedSize]] = ٦٫٢ MB:** ده كل الملفات اللي جوه الـ package (نسخ ESM و UMD و types و source maps). اللي بيتنزّل للزائر هو اللي الـ bundler بياخده بس، ولازم يتقاس بـ [[measure.mjs]] زي درس «إمتى framework غلط».
- **المجتمع:** من [[api.npmjs.org]] نفس اليوم: 17,832,083 تحميلة في أسبوع ١٣–١٩ نوفمبر.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في [[package.json]] لو كاتب [["lodash": "^4.17.20"]] أو [["~4.17.20"]] أو [["4.17.20"]]، [[npm install]] على جهاز جديد (من غير lockfile) ممكن ينزّل أنهي نسخ؟ توقّع، وبعدين اسأل npm نفسه بـ [[npm view "lodash@<range>" version]].`, done: R`عارف إن [[^]] بيقبل 4.18.x و [[~]] بيقف عند 4.17.x والنسخة المتثبتة نسخة واحدة، وشفت ده من npm نفسه.`, sol: R`~~~text npm view "lodash@^4.17.20" version
lodash@4.17.20 '4.17.20'
lodash@4.17.21 '4.17.21'
lodash@4.17.23 '4.17.23'
lodash@4.18.0 '4.18.0'
lodash@4.18.1 '4.18.1'
~~~

~~~text npm view "lodash@~4.17.20" version
lodash@4.17.20 '4.17.20'
lodash@4.17.21 '4.17.21'
lodash@4.17.23 '4.17.23'
~~~

| الـ range | معناه | هينزّل (يوم ٢١ نوفمبر 2026) |
|---|---|---|
| [[^4.17.20]] | أي نسخة 4.x من 4.17.20 وطالع (minor و patch) | 4.18.1 |
| [[~4.17.20]] | 4.17.x بس (patch بس) | 4.17.23 |
| [[4.17.20]] | النسخة دي بالظبط | 4.17.20 |

- [[npm install]] بيختار **أعلى** نسخة بتطابق. فـ [[^]] (الافتراضي) بيجيب تحديثات تلقائي، وده كويس للأمان وخطر لو المكتبة كسرت حاجة في minor.
- **الـ lockfile هو اللي بيثبّت فعلًا:** لو [[package-lock.json]] موجود، [[npm ci]] بينزّل النسخة المكتوبة فيه بالظبط مهما كان الـ range. فالـ range بيأثر لما تعمل [[npm install]] أو [[npm update]].
- لاحظ إن lodash 4.17.22 مش في اللستة: النسخة دي مش موجودة في الـ registry، والـ ranges بتتحسب على النسخ الموجودة بس.` },
            { lvl: 'تطبيق', t: R`**لاب الثغرات:** في [[shop-api]] سطّب [[lodash@4.17.20]] بالظبط، وشغّل [[npm audit]] واقرا التقرير: كام ثغرة؟ وأخطرها إيه؟ والحل اللي مقترح ليه بيقول [[--force]]؟ صلّحها من غير [[--force]]، وتأكد بـ [[npm audit]] و [[echo $?]].`, done: R`التقرير قبل فيه ٤ advisories على lodash بـ high و exit code 1، وبعد التحديث [[found 0 vulnerabilities]] و exit code 0، وعارف ليه npm مرضيش يحدّث لوحده.`, sol: R`~~~text npm audit (lodash 4.17.20)
# npm audit report

lodash  <=4.17.23
Severity: high
Command Injection in lodash - https://github.com/advisories/GHSA-35jh-r3h4-6jhm
Regular Expression Denial of Service (ReDoS) in lodash - https://github.com/advisories/GHSA-29mw-wpgm-hmr9
lodash vulnerable to Code Injection via $__bt_.template$__bt imports key names - https://github.com/advisories/GHSA-r5fr-rjxr-66jc
Lodash has Prototype Pollution Vulnerability in $__bt_.unset$__bt, $__bt_.omit$__bt, and $__bt_.pullAt$__bt functions - https://github.com/advisories/GHSA-xxjr-mmjv-4gpg
fix available via $__btnpm audit fix --force$__bt
Will install lodash@4.18.1, which is outside the stated dependency range
node_modules/lodash

1 high severity vulnerability

To address all issues, run:
  npm audit fix --force
~~~

- [[lodash  <=4.17.23]]: كل النسخ لحد 4.17.23 متأثرة. و [[Severity: high]] أعلى درجة في التقرير ده.
- كل سطر advisory ليه لينك GHSA (GitHub Security Advisory) فيه التفاصيل وأنهي دوال متأثرة. **اقرا اللينك:** لو مشروعك مش بيستخدم [[_.template]] ولا [[_.unset]]، الخطر الفعلي أقل، بس التحديث برضه الصح.
- **ليه [[--force]]؟** احنا كاتبين [["lodash": "4.17.20"]] بالظبط ([[--save-exact]])، والتصليح في 4.18.1 «برّه الـ range». npm مش هيغيّر قرارك من غير ما تقوله. [[--force]] بيغيّر أي حاجة لأي نسخة، حتى لو major، فمتستخدموش وانت مش شايف هيغيّر إيه.
- **التصليح الصح:** حدّث المكتبة دي بالاسم، واختبر:

~~~bash
npm install lodash@4.18.1 --save-exact
npm audit
echo $?
~~~

~~~text الناتج
changed 1 package, and audited 5 packages in 2s

found 0 vulnerabilities
found 0 vulnerabilities
0
~~~

- [[echo $?]] (في bash، و [[$LASTEXITCODE]] في PowerShell): [[npm audit]] بيرجّع [[1]] لو فيه ثغرات و [[0]] لو مفيش، فتقدر تحطه في CI يوقف الـ build. و [[npm audit --audit-level=critical]] بيرجّع 0 هنا (جرّبناها) لأن الثغرة high مش critical: اختار المستوى اللي يوقف الـ CI بوعي.` },
            { lvl: 'تطبيق', t: R`**لاب الـ install scripts:** اعمل package صغيرة فيها [[postinstall]] بيكتب ملف [[POSTINSTALL-RAN.txt]]، واعملها [[npm pack]]، وسطّبها في فولدر تاني ٣ مرات: عادي، و [[--ignore-scripts]]، و [[--strict-allow-scripts]]. الملف بيتعمل في أنهي مرة؟`, done: R`الملف اتعمل في التسطيب العادي (و npm طبّع تحذير بس)، ومتعملش مع [[--ignore-scripts]]، و [[--strict-allow-scripts]] وقف التسطيب كله بـ [[ESTRICTALLOWSCRIPTS]].`, sol: R`~~~json scripty/package.json
{ "name": "scripty-demo", "version": "1.0.0", "scripts": { "postinstall": "node -e \"require('fs').writeFileSync(require('path').join(process.env.INIT_CWD,'POSTINSTALL-RAN.txt'),'yes')\"" } }
~~~

~~~bash
cd scripty
npm pack
cd ../consumer
npm init -y
npm install ../scripty/scripty-demo-1.0.0.tgz
ls
~~~

~~~text الناتج (npm 11.19.1)
added 1 package, and audited 2 packages in 1s

found 0 vulnerabilities
npm warn install-scripts 1 package has install scripts not yet covered by allowScripts:
npm warn install-scripts   scripty-demo@1.0.0 (postinstall: node -e "require('fs').writeFileSync(require('path').join(process.env.INIT_CWD,'POSTINSTALL-RAN.txt'),'yes')")
POSTINSTALL-RAN.txt
node_modules
package-lock.json
package.json
~~~

**السكربت اشتغل.** npm 11.19 بيحذّر بس، لكن الكود اتنفّذ على جهازك بصلاحياتك. أي package (أو أي package جواها) تقدر تعمل كده: تقرا ملفاتك أو [[.env]] أو تبعتهم.

~~~text npm install ../scripty/scripty-demo-1.0.0.tgz --ignore-scripts  ثم ls
node_modules
package-lock.json
package.json
~~~

~~~text npm install ../scripty/scripty-demo-1.0.0.tgz --strict-allow-scripts
npm error code ESTRICTALLOWSCRIPTS
npm error --strict-allow-scripts: 1 package(s) have install scripts not covered by allowScripts:
npm error   scripty-demo@1.0.0 (postinstall: node -e "require('fs').writeFileSync(require('path').join(process.env.INIT_CWD,'POSTINSTALL-RAN.txt'),'yes')")
npm error Approve them with $__btnpm install-scripts approve$__bt, deny them with $__btnpm install-scripts deny$__bt, or bypass this check with $__bt--dangerously-allow-all-scripts$__bt.
~~~

| الطريقة | السكربت بيشتغل؟ | إمتى |
|---|---|---|
| عادي | آه، مع تحذير | لما تكون قريت السكربتات ([[npm install-scripts ls]]) |
| [[--ignore-scripts]] | لأ، لأي package | تسطيب أول مرة لحاجة مش واثق فيها. بس packages زي esbuild ممكن تحتاج السكربت عشان تشتغل صح |
| [[--strict-allow-scripts]] | بيوقف لو فيه سكربت مش موافق عليه | في CI: أي package جديدة بسكربت توقف الـ build لحد ما حد يراجعها |

والموافقة: [[npm install-scripts approve esbuild]] بتكتب [[ "allowScripts": { "esbuild@0.28.2": true } ]] في [[package.json]]، **بالنسخة**. لو esbuild اتحدّث، لازم توافق تاني (ده [[allow-scripts-pin = true]] في الإعدادات الافتراضية). وفي pnpm نفس الفكرة اسمها [[pnpm approve-builds]].` },
            { lvl: 'تحدي', t: R`**typosquatting:** حد كتب [[npm install loadsh]] بدل [[lodash]]. من غير ما تسطّب حاجة، قارن الاتنين بـ [[npm view <pkg> version time.created repository.url homepage]] وبالتحميلات من [[api.npmjs.org]]. إيه اللي يكشف إن [[loadsh]] مش هي؟ وإيه اللي **ميكشفش**؟`, done: R`عندك جدول مقارنة بالأرقام، وعارف إن [[repository.url]] و [[homepage]] ممكن يتكتبوا أي حاجة ومش دليل، وإن الدليل هو التحميلات وتاريخ الإنشاء والنسخ.`, sol: R`~~~bash
npm view lodash version time.created repository.url
npm view loadsh name version description time.created repository.url homepage
curl -s https://api.npmjs.org/downloads/point/last-week/lodash
curl -s https://api.npmjs.org/downloads/point/last-week/loadsh
npm view dayjss
~~~

~~~text الناتج (يوم 21 نوفمبر 2026)
version = '4.18.1'
time.created = '2012-04-23T16:37:11.912Z'
repository.url = 'git+https://github.com/lodash/lodash.git'

name = 'loadsh'
version = '0.0.4'
description = 'Lodash modular utilities.'
time.created = '2018-09-13T06:41:39.649Z'
repository.url = 'git+https://github.com/lodash/lodash.git'
homepage = 'https://lodash.com/'

{"downloads":211691463,"start":"2026-11-13","end":"2026-11-19","package":"lodash"}
{"downloads":14147,"start":"2026-11-13","end":"2026-11-19","package":"loadsh"}

npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/dayjss - Not found
~~~

| | lodash | loadsh |
|---|---|---|
| اتعملت | ٢٠١٢ | ٢٠١٨ (بعد ٦ سنين) |
| آخر نسخة | 4.18.1 | 0.0.4 |
| تحميلات الأسبوع | 211,691,463 | 14,147 |
| repository و homepage | lodash | **نفس لينكات lodash بالظبط** |

- **اللي ميكشفش:** الوصف والـ [[repository.url]] والـ [[homepage]] نص بيكتبه صاحب الـ package، ومحدش بيتأكد منه. [[loadsh]] كاتبة لينكات lodash.
- **اللي بيكشف:** الفرق في التحميلات (١٥٠٠٠ مرة تقريبًا)، وتاريخ الإنشاء، ورقم النسخة. واحنا مش بنقول إن [[loadsh]] فيها كود ضار (مش فحصناها ومش هنسطّبها)، بس هي **مش** lodash، وده كفاية.
- **[[dayjss]]:** [[E404]]، مفيش package بالاسم ده دلوقتي. بس أي حد يقدر ينشرها بكرة. الأسماء القريبة من المشهورة هي بالظبط اللي الناس بتسجّلها عشان تصطاد غلطات الكتابة.
- **الحماية:** انسخ اسم الـ package من الوثائق الرسمية بتاعتها مش من الذاكرة، وبص على [[package.json]] في الـ diff قبل الـ merge، و [[npm ci]] من lockfile في CI عشان محدش يسطّب حاجة جديدة من غير مراجعة.` },
          ],
          flag: "script",
          deep: {
            why: R`في npm، المشروع الصغير بيسحب عشرات أو مئات packages (كل dependency ليها dependencies). أي واحدة فيهم ممكن تبقى مهجورة، أو فيها ثغرة، أو اتسرقت (حد خد حساب صاحبها ونشر نسخة ضارة)، أو اسمها شبه حاجة مشهورة. والأوامر دي كلها مجانية وبتاخد دقيقة، وبتوفّر عليك تقرير أمني أو مشروع واقف على مكتبة محدش بيصلّحها.`,
            how: R`[[npm view]] بيقرا الـ packument (الملف اللي فيه كل حاجة عن الـ package) من [[registry.npmjs.org]]: النسخ وتواريخها ([[time]])، والـ dist-tags، ولكل نسخة الـ [[license]] و [[scripts]] و [[dist.unpackedSize]] و [[deprecated]]. **[[time.modified]] = آخر تعديل في الـ packument نفسه** (تغيير maintainers أو dist-tag أو deprecate)، مش آخر نسخة: left-pad آخر نسخة 2018 و [[time.modified]] بتاعها نوفمبر 2026.

[[npm audit]] بيبعت شجرة الـ dependencies من الـ lockfile لقاعدة GitHub Advisory Database ويرجّع الثغرات المعروفة. [[npm audit signatures]] بيتأكد إن كل tarball متوقّع من الـ registry، وإن فيه provenance attestations (إثبات إن النسخة اتبنت من repo معين في CI).

الـ lockfile فيه لكل package [[version]] و [[resolved]] (من فين) و [[integrity]] (sha512 للـ tarball)، فـ [[npm ci]] بينزّل نفس البايتات بالظبط وبيرفض لو [[package.json]] مختلف عنه.`,
            when: R`قبل أي dependency جديدة: [[npm view]] (النسخة والتاريخ والرخصة و [[deprecated]] و [[scripts]])، والتحميلات، وصفحة الـ repo (آخر commit، والـ issues المفتوحة، وفيه حد بيرد؟). وبعد التسطيب: [[npm audit]] و [[npm install-scripts ls]]. وفي CI: [[npm ci]] و [[npm audit --audit-level=high]] و [[--strict-allow-scripts]]. وكل شهر: [[npm outdated]].`,
            mistakes: R`تقرا [[time.modified]] على إنه آخر نسخة. و [[npm audit fix --force]] من غير ما تقرا هيغيّر إيه (ممكن يرفع major). وتتجاهل [[npm audit]] عشان «كله high». وتكتب اسم الـ package من الذاكرة. وتمسح [[package-lock.json]] لما يعمل conflict بدل ما تحلّه. وتقيس الحجم بـ [[unpackedSize]]. وتعتمد على package آخر نسخة ليها من ٥ سنين لحاجة أمنية (تشفير، أو auth، أو parsing).`
          },
          teach: R`## الفكرة

مشروع API صغير اسمه [[shop-api]] محتاج مكتبتين. هنمشي على أسئلة الاختيار واحد واحد، ولكل سؤال أمر وناتجه الحقيقي. الكل اتشغّل بـ npm 11.19.1 و Node 24.22 على Windows يوم ٢١ نوفمبر 2026 (الأرقام والتواريخ بتتغير مع الوقت، فشغّلها انت وقارن).

---

## ١. البطاقة: نسخة ورخصة وتاريخ

~~~bash
npm view dayjs version license time.modified
~~~

~~~text الناتج
version = '1.11.23'
license = 'MIT'
time.modified = '2026-08-17T11:52:35.546Z'
~~~

- [[npm view <pkg> <field>...]]: بيقرا من الـ registry من غير تسطيب. أي حقل في الـ packument تقدر تسأل عنه.
- [[license = 'MIT']]: تقدر تستخدمها في أي مشروع، تجاري أو لأ، بشرط تسيب نص الرخصة.

**فخ [[time.modified]]:**

~~~bash
npm view dayjs "time[1.11.23]" dist.unpackedSize
npm view left-pad deprecated
~~~

~~~text الناتج
time[1.11.23] = '2026-08-17T11:52:35.217Z'
dist.unpackedSize = 681693
use String.prototype.padStart()
~~~

- [["time[1.11.23]"]]: تاريخ نشر النسخة دي بالظبط. ده اللي بيقولك «متصانة ولا لأ». في dayjs التاريخين قريبين.
- بس [[left-pad]]: آخر نسخة 1.3.0 يوم ٩ أبريل 2018، و [[time.modified]] بتاعها ١٨ نوفمبر 2026. و [[lodash]]: آخر نسخة 4.18.1 يوم ١ أبريل 2026، و [[time.modified]] ٢١ نوفمبر 2026. يعني [[modified]] بيتغير مع أي تعديل في البيانات، مش مع نسخة جديدة.
- [[deprecated]]: صاحب الـ package بنفسه بيقولك «متستخدمهاش»، وغالبًا بيقولك البديل: [[String.prototype.padStart()]] جوه اللغة.

---

## ٢. الـ ranges: إيه اللي هيتسطب فعلًا

~~~bash
npm view "lodash@~4.17.20" version
~~~

~~~text الناتج
lodash@4.17.20 '4.17.20'
lodash@4.17.21 '4.17.21'
lodash@4.17.23 '4.17.23'
~~~

[[npm view "<pkg>@<range>" version]] بيوريك كل النسخ اللي الـ range ده يقبلها. [[~]] = patch بس، و [[^]] (الافتراضي في [[npm install]]) = minor و patch. التفاصيل في التمرين التاني.

---

## ٣. التسطيب والشجرة

~~~bash
npm install lodash@4.17.20 dayjs --save-exact
npm install esbuild --save-dev
npm ls
~~~

~~~text الناتج
added 2 packages, and audited 3 packages in 2s

1 high severity vulnerability
...
shop-api@1.0.0
+-- dayjs@1.11.23
+-- esbuild@0.28.2
$__bt-- lodash@4.17.20
~~~

- [[--save-exact]]: بيكتب [["4.17.20"]] من غير [[^]] في [[package.json]]. اخترناه عشان نجبر النسخة القديمة في اللاب.
- [[--save-dev]]: esbuild أداة build، مش محتاجينها في production، فبتروح [[devDependencies]].
- npm قالك على الثغرة **وقت التسطيب** نفسه. متتجاهلهاش.
- [[npm ls]]: الشجرة. [[npm ls --all]] بيوريك dependencies الـ dependencies، و [[npm explain lodash]] بيقولك مين جاب package معينة.

---

## ٤. الأمان: الثغرات والتوقيعات

~~~bash
npm audit
~~~

~~~text الناتج (أوله)
lodash  <=4.17.23
Severity: high
...
fix available via $__btnpm audit fix --force$__bt
Will install lodash@4.18.1, which is outside the stated dependency range
~~~

التقرير كامل وطريقة التصليح في التمرين التالت. وبعد [[npm install lodash@4.18.1 --save-exact]]: [[found 0 vulnerabilities]].

~~~bash
npm audit signatures
~~~

~~~text الناتج
audited 4 packages in 1s

4 packages have verified registry signatures

3 packages have verified attestations
~~~

- **registry signatures:** الـ tarball اللي نزل هو اللي الـ registry وقّعه، محدش غيّره في السكة.
- **attestations (provenance):** ٣ من الـ ٤ ليهم إثبات إنهم اتبنوا من repo معين في CI. ده بيصعّب إن حد يسرق حساب صاحب الـ package وينشر نسخة من جهازه.

---

## ٥. الأمان: السكربتات اللي بتشتغل وقت التسطيب

~~~bash
npm install-scripts ls
~~~

~~~text الناتج
1 package has install scripts not yet covered by allowScripts:
  esbuild@0.28.2 (postinstall: node install.js)

Run $__btnpm install-scripts approve <pkg>$__bt to allow, or $__btnpm install-scripts deny <pkg>$__bt to deny.
~~~

[[postinstall]] = أمر بيشتغل على جهازك بعد التسطيب على طول. esbuild بيستخدمه يتأكد إن الـ binary بتاع نظامك موجود. في npm 11.19 السكربتات **لسه بتشتغل** (مع تحذير)، وده اتقاس في التمرين الرابع. فاقراها، ووافق على اللي فاهمه:

~~~bash
npm install-scripts approve esbuild
npm ci --strict-allow-scripts
~~~

~~~text الناتج
Approved esbuild:
  added esbuild@0.28.2

added 4 packages, and audited 5 packages in 2s

found 0 vulnerabilities
~~~

---

## ٦. الـ lockfile و [[npm ci]]

[[package-lock.json]] فيه لكل package النسخة والمصدر والبصمة:

~~~text package-lock.json
"node_modules/lodash": {
  "version": "4.18.1",
  "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz",
  "integrity": "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q==",
  "license": "MIT"
}
~~~

[[npm ci]] بيمسح [[node_modules]] ويسطّب من الـ lockfile بالظبط، وبيرفض لو [[package.json]] مختلف عنه. جرّبنا نغيّر dayjs في [[package.json]] لـ [[1.11.22]] من غير ما نحدّث الـ lockfile:

~~~text الناتج
npm error code EUSAGE
npm error
npm error $__btnpm ci$__bt can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with $__btnpm install$__bt before continuing.
npm error
npm error Invalid: lock file's dayjs@1.11.23 does not satisfy dayjs@1.11.22
~~~

---

## ٧. الأسئلة الخمسة في جدول

| السؤال | الأمر | الإشارة الحمرا |
|---|---|---|
| بتحل مشكلتي، والمكسب أكبر؟ | [[measure.mjs]] على الـ bundle، وقارن بالحل بإيدك | ١٠ KB عشان حاجة في المنصة أصلًا |
| ليها مجتمع ودعم؟ | [[api.npmjs.org/downloads]]، وصفحة الـ issues في الـ repo | تحميلات قليلة جدًا، و issues محدش بيرد عليها |
| متصانة؟ | [[npm view <pkg> "time[<version>]" deprecated]] | آخر نسخة من سنين، أو [[deprecated]] |
| رخصتها؟ | [[npm view <pkg> license]] | مفيش رخصة، أو GPL في مشروع مقفول من غير مراجعة |
| آمنة؟ | [[npm audit]] و [[npm audit signatures]] و [[npm install-scripts ls]] | ثغرات high، أو سكربت تثبيت مش فاهمه، أو اسم شبه مكتبة مشهورة |

---

## الخلاصة

- آخر نسخة نزلت إمتى = [[time[<latest>]]]، مش [[time.modified]].
- [[npm audit fix --force]] ممكن يغيّر major: حدّث بالاسم واختبر.
- npm 11.19 بيشغّل install scripts مع تحذير: [[npm install-scripts ls]] و [[--strict-allow-scripts]] في CI.
- الـ lockfile في Git، و [[npm ci]] في CI والسيرفر.`,
          lines: [
            R`[[npm view]] بيقرا من الـ registry من غير تسطيب: آخر نسخة، والرخصة، وآخر تعديل في بيانات الـ package.`,
            R`[["time[1.11.23]"]] تاريخ نشر النسخة دي بالظبط، و [[dist.unpackedSize]] حجمها على الديسك (مش في الـ bundle).`,
            R`[[deprecated]] بيطبع رسالة صاحب الـ package لو قال «متستخدمهاش»، وغالبًا فيها البديل.`,
            R`[[npm view "<pkg>@<range>"]] بيوريك كل النسخ اللي الـ range ده بيقبلها، قبل ما تكتبه في [[package.json]].`,
            R`[[npm ls]] بيرسم شجرة الـ dependencies المتسطبة فعلًا بنسخها، و [[--all]] بيوريك اللي جواهم كمان.`,
            R`[[npm audit]] بيقارن الشجرة بقاعدة الثغرات المعروفة، وبيرجّع exit code [[1]] لو لقى حاجة.`,
            R`[[npm audit signatures]] بيتأكد إن الـ tarballs متوقّعة من الـ registry، وبيعدّ اللي ليها provenance.`,
            R`[[npm install-scripts ls]] بيوريك أي package فيها [[preinstall]] أو [[postinstall]] ولسه محدش وافق عليها.`,
            R`[[npm ci]] بيسطّب من الـ lockfile بالظبط، و [[--strict-allow-scripts]] بيوقف لو فيه سكربت مش موافق عليه.`,
          ],
          ref: [
            { t: "MDN Curriculum: JavaScript fundamentals (6.14 Libraries and frameworks)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
            { t: "npm Docs: npm view", url: "https://docs.npmjs.com/cli/v11/commands/npm-view/" },
            { t: "npm Docs: npm audit", url: "https://docs.npmjs.com/cli/v11/commands/npm-audit/" },
            { t: "npm Docs: npm install-scripts", url: "https://docs.npmjs.com/cli/v11/commands/npm-install-scripts/" },
            { t: "npm Docs: npm ci", url: "https://docs.npmjs.com/cli/v11/commands/npm-ci/" },
            { t: "npm Docs: About semantic versioning", url: "https://docs.npmjs.com/about-semantic-versioning/" },
            { t: "npm Docs: Threats and mitigations", url: "https://docs.npmjs.com/threats-and-mitigations/" },
            { t: "choosealicense.com: Licenses", url: "https://choosealicense.com/licenses/" },
          ],
          pre: [{ to: "node/outdated / update / audit", why: R`[[npm outdated]] و [[npm update]] و [[npm audit]] بالتفصيل في تاب Node` }, { to: "node/pnpm approve-builds", why: R`نفس فكرة الموافقة على install scripts في pnpm` }, { to: "node/package-lock و npm ci", why: R`الـ lockfile من جوه` }],
        },
        {
          cmd: "مكتبتك الصغيرة: API و exports و tests",
          title: "الناحية التانية: تكتب مكتبة صغيرة صح، بـ API واضح ومن غير globals، و JSDoc و tests، وتعملها npm pack",
          desc: R`أي كود بتستخدمه في أكتر من مكان (أو أكتر من مشروع) يستاهل يبقى مكتبة صغيرة. والمكتبة الكويسة هي اللي انت كنت عايزها وانت بتختار في الدرس اللي فات:
• **API صغير وواضح:** دوال قليلة بأسماء بتقول بتعمل إيه، و inputs و outputs محددة.
• **من غير globals ولا side effects:** [[import]] مبيغيّرش أي حاجة برّه المكتبة (لا [[window]] ولا [[Array.prototype]]).
• **أخطاء واضحة:** input غلط = error باسم ورسالة مفهومة، مش [[NaN]] ساكت.
• **وثائق:** JSDoc فوق كل دالة (الـ editor بيعرضها وانت بتكتب)، و README فيه مثال.
• **tests:** [[node --test]] بيغطي الحالات الطرفية.
• **package.json صح:** [[exports]] (إيه اللي يتعمله import)، و [[files]] (إيه اللي يتنشر)، و [[version]] بـ semver.

المثال مكتبة [[qersh]] (اسم متألّف): فلوس بالقروش كأعداد صحيحة، عشان [[0.1 + 0.2]] مبيطلعش [[0.3]].`,
          example: R`// qersh: فلوس بالقروش من غير كسور عشرية
const PATTERN = /^\d+(\.\d{1,2})?$/;

/**
 * يحوّل مبلغ بالجنيه (نص زي "12.5") لقروش (عدد صحيح).
 * @param {string} text
 * @returns {number}
 */
export function toPiasters(text) {
  const clean = String(text).trim();
  if (!PATTERN.test(clean)) throw new TypeError($__btمبلغ مش مفهوم: "$__{text}"$__bt);
  const [pounds, frac = ""] = clean.split(".");
  return Number(pounds) * 100 + Number(frac.padEnd(2, "0"));
}

/**
 * يكتب القروش كمبلغ مقروء.
 * @param {number} piasters
 * @param {{ locale?: string }} [options]
 */
export function format(piasters, { locale = "ar-EG" } = {}) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EGP" }).format(piasters / 100);
}

/**
 * يقسم مبلغ على عدد ناس، والقروش الزيادة بتروح للأوائل.
 * @param {number} piasters
 * @param {number} parts
 * @returns {number[]}
 */
export function split(piasters, parts) {
  if (!Number.isInteger(parts) || parts < 1) throw new RangeError("parts لازم عدد صحيح أكبر من 0");
  const base = Math.floor(piasters / parts);
  const extra = piasters % parts;
  return Array.from({ length: parts }, (_, i) => base + (i < extra ? 1 : 0));
}`,
          try: R`اعمل فولدر [[qersh]] فيه [[index.js]] (المثال) و [[package.json]] و [[index.test.js]] (الاتنين في الشرح)، وشغّل [[npm test]] و [[npm pack --dry-run]]. وبعدين اعمل فولدر جنبه، و [[npm install ../qersh/qersh-0.1.0.tgz]] بعد [[npm pack]]، واستخدمها من هناك.`,
          sol: R`~~~text npm test (Node 24.22)
✔ toPiasters: جنيه وقروش (0.9964ms)
✔ toPiasters: يرفض الكلام الغلط (0.9884ms)
✔ split: مفيش قرش بيضيع (0.78ms)
✔ format: عربي وإنجليزي (13.3948ms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~

~~~text من فولدر receipt-app: node app.js
الإجمالي: ٣٣٧٫٥٠ ج.م.
على ٣: ١١٢٫٥٠ ج.م. | ١١٢٫٥٠ ج.م. | ١١٢٫٥٠ ج.م.
~~~

(Intl بيحط علامة اتجاه مخفية U+200F قبل وبعد المبلغ العربي، شلناها من العرض هنا.) الخطوات كاملة في الشرح.`,
          practice: [
            { lvl: 'سريع', t: R`**صلّح المكتبة البايظة:** المكتبة دي بتشتغل، بس فيها غلطتين بيبوظوا كود اللي بيستخدمها. شغّل [[app.mjs]] ولاقيهم، واكتبها من جديد صح.
~~~js bad-lib.js
Array.prototype.total = function () {
  return this.reduce((a, b) => a + b, 0);
};
globalThis.money = { rate: 50 };
~~~

~~~js app.mjs
import "./bad-lib.js";
const prices = [45, 20, 10];
console.log(prices.total());
for (const i in prices) console.log("index:", i);
console.log(typeof money, Object.keys(globalThis).includes("money"));
~~~`, done: R`شفت [[index: total]] طالعة في الـ [[for...in]] و [[money]] على [[globalThis]]، وكتبت نسخة بـ [[export function total(list)]] من غير ما تلمس أي حاجة برّه.`, sol: R`~~~text الناتج (Node 24.22): node app.mjs
75
index: 0
index: 1
index: 2
index: total
object true
~~~

- **الغلطة ١:** [[Array.prototype.total = ...]] بيضيف خاصية لـ **كل** array في البرنامج كله، حتى اللي في مكتبات تانية. وعشان اتضافت بـ [[=]] فهي enumerable، فـ [[for...in]] بقى بيلف عليها ([[index: total]]). ولو مكتبتين عملوا [[total]] بمعنى مختلف، اللي اتحمّلت آخر بتكسب ساكت.
- **الغلطة ٢:** [[globalThis.money]] متغير global: أي كود تاني ممكن يغيّره أو يتعارض معاه، ومحدش عارف جه منين.
- و [[import "./bad-lib.js"]] من غير ما ناخد منها حاجة غيّر البرنامج كله: ده **side effect**.

~~~js good-lib.js
export const RATE = 50;
export function total(list) {
  return list.reduce((a, b) => a + b, 0);
}
~~~

~~~js app.mjs
import { total } from "./good-lib.js";
console.log(total([45, 20, 10]));
~~~

اللي عايز [[total]] بيعملها [[import]] بالاسم، ومفيش حاجة برّه المكتبة بتتغير. و [[ "sideEffects": false ]] في [[package.json]] بيقول للـ bundlers إن الـ import ده مبيعملش حاجة لوحده، فلو مش مستخدم يتشال.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اكتب [[edge.test.js]] لـ [[split]] من المثال بالحالات دي: [[split(0, 3)]]، و ناس أكتر من القروش [[split(5, 7)]]، و عدد ناس مش صحيح ([[2.5]] و [["3"]])، و **مبلغ مش صحيح** [[split(10.5, 2)]] لازم يرمي [[RangeError]]. شغّله. لو حاجة وقعت: الغلط في الاختبار ولا في المكتبة؟`, done: R`٣ اختبارات بتعدّي والرابع بيقع، وعرفت إن [[split(10.5, 2)]] بيرجّع [[[6, 5]]] (١١ قرش من ١٠٫٥!)، وصلّحت المكتبة بسطر والـ ٨ اختبارات عدّوا.`, sol: R`~~~js edge.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { split } from "./index.js";

test("split: صفر قرش", () => {
  assert.deepEqual(split(0, 3), [0, 0, 0]);
});
test("split: ناس أكتر من القروش", () => {
  assert.deepEqual(split(5, 7), [1, 1, 1, 1, 1, 0, 0]);
});
test("split: عدد ناس مش صحيح", () => {
  assert.throws(() => split(100, 2.5), RangeError);
  assert.throws(() => split(100, "3"), RangeError);
});
test("split: مبلغ مش صحيح", () => {
  assert.throws(() => split(10.5, 2), RangeError);
});
~~~

~~~text الناتج قبل التصليح (Node 24.22): node --test edge.test.js
✔ split: صفر قرش (1.2114ms)
✔ split: ناس أكتر من القروش (0.6523ms)
✔ split: عدد ناس مش صحيح (0.3773ms)
✖ split: مبلغ مش صحيح (0.5008ms)
ℹ pass 3
ℹ fail 1
~~~

**الاختبار صح والمكتبة غلط.** جرّبنا:

~~~text node --input-type=module -e "import { split } from './index.js'; console.log(split(10.5, 2), split(-9, 2))"
[ 6, 5 ] [ -5, -5 ]
~~~

[[split(10.5, 2)]] بيرجّع ١١ قرش (فلوس اتخلقت من مفيش)، و [[split(-9, 2)]] بيرجّع [[-10]]. المكتبة كانت بتتأكد من [[parts]] ونسيت [[piasters]]. التصليح سطر في أول [[split]]:

~~~js index.js
  if (!Number.isInteger(piasters) || piasters < 0) throw new RangeError("piasters لازم عدد صحيح مش سالب");
~~~

~~~text الناتج بعد التصليح: node --test
ℹ tests 8
ℹ pass 8
ℹ fail 0
~~~

ده سبب كتابة الاختبارات للحالات الطرفية **قبل** ما تنشر: الباج ده كان هيوصل لكل مشروع بيستخدم المكتبة.` },
            { lvl: 'تطبيق', t: R`**زوّد feature وطلّع نسخة:** زوّد [[sum(...amounts)]] بترجّع مجموع مبالغ بالقروش وبترمي [[TypeError]] لو فيه رقم مش صحيح، بـ JSDoc واختبار بيثبت إن [[0.1 + 0.2]] بالقروش بيطلع [[30]] بالظبط. وبعدين ارفع النسخة صح بـ [[npm version]].`, done: R`الـ ٩ اختبارات بتعدّي، والنسخة بقت [[0.2.0]] (minor، لأنها ميزة جديدة من غير ما تكسر حاجة).`, sol: R`~~~js index.js
/**
 * يجمع أي عدد مبالغ بالقروش.
 * @param {...number} amounts
 * @returns {number}
 */
export function sum(...amounts) {
  for (const a of amounts) {
    if (!Number.isInteger(a)) throw new TypeError($__btمش قروش صحيحة: $__{a}$__bt);
  }
  return amounts.reduce((total, a) => total + a, 0);
}
~~~

~~~js sum.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { sum, toPiasters } from "./index.js";

test("sum: من غير 0.30000000000000004", () => {
  assert.equal(sum(toPiasters("0.1"), toPiasters("0.2")), 30);
  assert.equal(sum(), 0);
  assert.throws(() => sum(10, 0.5), TypeError);
});
~~~

~~~bash
node --test
npm version minor --no-git-tag-version
~~~

~~~text الناتج
ℹ tests 9
ℹ pass 9
ℹ fail 0
v0.2.0
~~~

- [[...amounts]] (rest parameter): أي عدد arguments في array واحدة، و [[sum()]] من غير حاجة بترجّع [[0]].
- **semver لمكتبتك:** patch ([[0.1.1]]) لتصليح باج من غير تغيير الـ API، و minor ([[0.2.0]]) لدالة جديدة الكود القديم مش هيحس بيها، و major ([[1.0.0]] ← [[2.0.0]]) لو غيّرت أو شلت حاجة كانت موجودة. وقبل 1.0.0 الـ API لسه بيتغير، والناس بتتعامل مع minor كأنه ممكن يكسر.
- [[npm version minor]] بيعدّل [[version]] في [[package.json]] والـ lockfile. و [[--no-git-tag-version]] عشان ميعملش commit و tag (الفولدر ده مش git repo).` },
            { lvl: 'تحدي', t: R`**قيس:** امسح [[files]] من [[package.json]] وشغّل [[npm pack --dry-run]]، ورجّعه وشغّله تاني. كام ملف وكام بايت في الحالتين؟ وإيه الملفات اللي كانت هتتنشر من غير قصد؟`, done: R`من غير [[files]]: ٦ ملفات و 2.9 kB، ومعاهم الاختبارات و tarball قديم. ومعاه: ملفين و 1.2 kB.`, sol: R`~~~text npm pack --dry-run (من غير files)
npm notice 574B edge.test.js
npm notice 1.8kB index.js
npm notice 950B index.test.js
npm notice 334B package.json
npm notice 1.0kB qersh-0.1.0.tgz
npm notice 316B sum.test.js
npm notice package size: 2.9 kB
npm notice unpacked size: 4.9 kB
npm notice total files: 6
~~~

~~~text npm pack --dry-run (مع "files": ["index.js"])
npm notice 1.8kB index.js
npm notice 367B package.json
npm notice package size: 1.2 kB
npm notice unpacked size: 2.1 kB
npm notice total files: 2
~~~

- من غير [[files]]، npm بينشر **كل** اللي في الفولدر (غير [[node_modules]] و [[.git]] واللي في [[.npmignore]] أو [[.gitignore]]). هنا كان هينشر الاختبارات و **الـ tarball القديم نفسه** ([[qersh-0.1.0.tgz]]) جوه الجديد.
- وفي مشروع حقيقي ده بيبقى [[.env]] أو ملف بيانات أو مفاتيح. [[files]] قايمة بيضا (allowlist): اللي مكتوب بس هو اللي بيتنشر، فمفيش حاجة بتتسرب بالغلط.
- [[package.json]] و README و LICENSE بيتنشروا دايمًا حتى لو مش مكتوبين في [[files]].
- **عادة:** [[npm pack --dry-run]] قبل أي نشر، واقرا اللستة.` },
          ],
          flag: "script",
          deep: {
            why: R`كل مطور بيبقى في وقت ما صاحب كود بيستخدمه غيره: utils مشتركة بين مشروعين، أو package داخلية في الشركة، أو مكتبة open source. واللي بيفرق المكتبة اللي الناس بتحبها عن اللي بيهربوا منها مش الذكاء، لكن الحاجات اللي في الدرس: API صغير ميتغيرش كل شوية، ومفيش مفاجآت وقت الـ import، وأخطاء مفهومة، واختبارات، ونسخ بتحترم semver.`,
            how: R`**[[exports]]** في [[package.json]] بيحدد الـ entry points: [["exports": "./index.js"]] = [[import ... from "qersh"]] بيفتح [[index.js]] وبس، وأي مسار تاني ([[qersh/index.js]] أو ملف داخلي) بيترفض بـ [[ERR_PACKAGE_PATH_NOT_EXPORTED]]. ده بيخليك تغيّر الملفات الداخلية من غير ما تكسر حد. ولو عايز أكتر من entry: [["exports": { ".": "./index.js", "./format": "./format.js" }]].

**[[type: "module"]]:** ملفات [[.js]] تبقى ES modules. **[[sideEffects: false]]:** إشارة للـ bundlers إن مفيش ملف بيعمل حاجة وقت الـ import، فيقدروا يشيلوا اللي مش مستخدم (tree shaking). **[[engines]]:** أقل نسخة Node بتشتغل عليها. **[[files]]:** إيه اللي يدخل الـ tarball.

**[[npm pack]]** بيعمل نفس الـ tarball اللي [[npm publish]] كان هيرفعه، فتقدر تسطّبه في مشروع تاني ([[npm install ../qersh/qersh-0.1.0.tgz]]) وتجرّب قبل النشر.`,
            when: R`حوّل كود لمكتبة لما بتنسخه بين مشروعين، أو لما فريقين محتاجينه. وقبل ما تنشر على npm للعالم: دوّر الأول (يمكن موجودة)، واتأكد إن الاسم فاضي ([[npm view <name>]] يرجّع [[E404]])، واكتب README فيه مثال، وفكّر هتصونها إزاي. وللكود الداخلي: [[npm pack]] أو workspaces أو registry خاص بالشركة.`,
            mistakes: R`تعدّل built-ins ([[Array.prototype]] و [[String.prototype]]). وتحط حاجات على [[window]] أو [[globalThis]]. وترجّع [[NaN]] أو [[undefined]] بدل error للـ input الغلط. وتنسى [[files]] فتنشر اختباراتك أو أسرارك. وتغيّر سلوك دالة في patch أو minor. وتنشر من غير ما تشغّل الاختبارات (حطها في [[prepack]] زي المشروع المتوسط التاني). وتسمّي المكتبة اسم موجود على npm.`
          },
          teach: R`## الفكرة

مكتبة صغيرة اسمها [[qersh]] (اسم متألّف، اتأكدنا إن [[npm view qersh]] بيرجّع [[E404]]): بتحوّل المبالغ لقروش (أعداد صحيحة) عشان الحساب يبقى مظبوط، وبتكتبها، وبتقسمها على ناس من غير ما قرش يضيع. هنبنيها بنفس الأسئلة اللي سألناها لما كنا بنختار مكتبة غيرنا. Node 24.22 و npm 11.19.1 على Windows.

---

## ١. ليه قروش؟

~~~bash
node -e "console.log(0.1 + 0.2, 1.15 * 100)"
~~~

~~~text الناتج
0.30000000000000004 114.99999999999999
~~~

الأرقام العشرية في JavaScript (IEEE 754) مش دقيقة. لو خزّنت المبلغ بالقروش كعدد صحيح ([[1250]] بدل [[12.5]]) الجمع والطرح بيبقوا مظبوطين، وبتقسم على ١٠٠ بس وقت العرض.

---

## ٢. الـ API: ٣ دوال

| الدالة | بتاخد | بترجّع | لو الـ input غلط |
|---|---|---|---|
| [[toPiasters(text)]] | نص زي [["12.5"]] | [[1250]] | [[TypeError]] برسالة فيها النص |
| [[format(piasters, { locale })]] | عدد صحيح، ولغة اختياري | نص زي [["١٢٫٥٠ ج.م."]] | (الإصدار ده مش بيفحص، التمرين التاني) |
| [[split(piasters, parts)]] | مبلغ وعدد ناس | array مجموعها = المبلغ | [[RangeError]] |

اسم كل دالة فعل بيقول بتعمل إيه، وكل واحدة بتعمل حاجة واحدة. والخيارات اللي مش أساسية في object في الآخر ([[{ locale }]]) عشان تقدر تزوّد خيارات بعدين من غير ما تكسر حد.

---

## ٣. المثال: أهم الحتت

~~~text index.js
const PATTERN = /^\d+(\.\d{1,2})?$/;
~~~

regex بيقبل أرقام، واختياري نقطة ورقم أو رقمين بعدها. [[-5]] و [["12.345"]] و [["12,5"]] و [[""]] كلهم مرفوضين. متعرّف برّه الدوال من غير [[export]]: داخلي للمكتبة.

~~~text index.js
  if (!PATTERN.test(clean)) throw new TypeError($__btمبلغ مش مفهوم: "$__{text}"$__bt);
  const [pounds, frac = ""] = clean.split(".");
  return Number(pounds) * 100 + Number(frac.padEnd(2, "0"));
~~~

- input غلط = error باسم مناسب ([[TypeError]]: النوع أو الشكل غلط) ورسالة فيها القيمة نفسها. جرّبنا [[toPiasters("12,5")]]: [[TypeError: مبلغ مش مفهوم: "12,5"]].
- [[frac = ""]]: default لو مفيش نقطة. و [[padEnd(2, "0")]] بيخلي [["5"]] تبقى [["50"]]، فـ [["12.5"]] = [[1200 + 50]]. من غير ضرب أي رقم عشري في ١٠٠.

~~~text index.js
  const base = Math.floor(piasters / parts);
  const extra = piasters % parts;
  return Array.from({ length: parts }, (_, i) => base + (i < extra ? 1 : 0));
~~~

١٠٠٠ قرش على ٣: [[base]] = ٣٣٣ والباقي ([[%]]) = ١، فأول واحد ياخد ٣٣٤. النتيجة [[[334, 333, 333]]] ومجموعها ١٠٠٠ بالظبط.

---

## ٤. من غير globals ولا side effects

~~~bash
node --input-type=module -e "import * as q from './index.js'; console.log(Object.keys(q)); console.log(typeof globalThis.toPiasters)"
~~~

~~~text الناتج
[ 'format', 'split', 'toPiasters' ]
undefined
~~~

المكتبة كلها ٣ أسماء بتتعمل [[export]]، ومفيش حاجة اتحطت على [[globalThis]]، و [[import]] نفسه مبيعملش أي حاجة غير إنه يعرّف دوال (مفيش [[console.log]] ولا تعديل في built-ins). التمرين الأول بيوريك العكس.

---

## ٥. JSDoc

~~~text index.js
/**
 * يحوّل مبلغ بالجنيه (نص زي "12.5") لقروش (عدد صحيح).
 * @param {string} text
 * @returns {number}
 */
~~~

تعليق بيبدأ بـ [[/**]] فوق الدالة. VS Code بيعرضه لما تكتب [[toPiasters(]] في أي مشروع بيستخدم المكتبة، و [[@param {string} text]] بيخليه يحذّرك لو بعت رقم (مع [[// @ts-check]] في أول الملف). وثائق جنب الكود، فبتتحدّث معاه.

---

## ٦. الاختبارات (وغلطة حصلت فعلًا)

~~~js index.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { toPiasters, format, split } from "./index.js";

test("toPiasters: جنيه وقروش", () => {
  assert.equal(toPiasters("12.5"), 1250);
  assert.equal(toPiasters("0.07"), 7);
  assert.equal(toPiasters(" 3 "), 300);
});

test("toPiasters: يرفض الكلام الغلط", () => {
  assert.throws(() => toPiasters("12.345"), TypeError);
  assert.throws(() => toPiasters("-5"), TypeError);
  assert.throws(() => toPiasters(""), TypeError);
});

test("split: مفيش قرش بيضيع", () => {
  const parts = split(1000, 3);
  assert.deepEqual(parts, [334, 333, 333]);
  assert.equal(parts.reduce((a, b) => a + b, 0), 1000);
  assert.throws(() => split(1000, 0), RangeError);
});

test("format: عربي وإنجليزي", () => {
  assert.equal(format(1250, { locale: "en-US" }).replace(/\s/g, " "), "EGP 12.50");
  assert.match(format(1250), /١٢٫٥٠/);
});
~~~

**أول مرة السطر ده كان:** [[assert.equal(format(1250, { locale: "en-US" }), "EGP 12.50")]] ووقع:

~~~text الناتج
actual: 'EGP 12.50',
expected: 'EGP 12.50',
~~~

النصين **شكلهم واحد** ومش متساويين! طبعنا أكواد الحروف:

~~~text node -e ... [...format(1250, { locale: "en-US" })].map(c => c.codePointAt(0).toString(16))
45 47 50 a0 31 32 2e 35 30
~~~

[[a0]] = U+00A0، مسافة مبتتقطعش (non-breaking space). Intl بيحطها بين العملة والرقم عشان ميتقسموش على سطرين. التصليح: [[.replace(/\s/g, " ")]] (الـ [[\s]] في regex بيشمل U+00A0) قبل المقارنة. وفي العربي كمان فيه U+200F (علامة اتجاه) قبل وبعد المبلغ، عشان كده الاختبار العربي بـ [[assert.match]] على الأرقام بس.

~~~text الناتج: npm test
✔ toPiasters: جنيه وقروش (0.9964ms)
✔ toPiasters: يرفض الكلام الغلط (0.9884ms)
✔ split: مفيش قرش بيضيع (0.78ms)
✔ format: عربي وإنجليزي (13.3948ms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
~~~

---

## ٧. [[package.json]]

~~~json package.json
{
  "name": "qersh",
  "version": "0.1.0",
  "description": "فلوس بالقروش: تحويل وتنسيق وتقسيم من غير كسور عشرية",
  "type": "module",
  "exports": "./index.js",
  "files": ["index.js"],
  "sideEffects": false,
  "engines": { "node": ">=18" },
  "scripts": { "test": "node --test" },
  "license": "MIT"
}
~~~

| الحقل | بيعمل إيه |
|---|---|
| [[name]] و [[version]] | الاسم والنسخة بـ semver. 0.x = الـ API لسه بيتغير |
| [[type: "module"]] | ملفات [[.js]] تبقى ES modules ([[import]] و [[export]]) |
| [[exports]] | المدخل الوحيد: [[import ... from "qersh"]] بيفتح [[index.js]]، وأي مسار تاني ممنوع |
| [[files]] | اللي يدخل الـ tarball بس (التمرين الرابع بيقيس الفرق) |
| [[sideEffects: false]] | بيقول للـ bundlers إن الـ import مبيعملش حاجة لوحده، فيشيلوا الدوال اللي مش مستخدمة |
| [[engines]] | أقل نسخة Node بتشتغل عليها |
| [[scripts.test]] | [[npm test]] بيشغّل [[node --test]] اللي بيلاقي ملفات [[*.test.js]] لوحده |
| [[license]] | من غيرها محدش من حقه يستخدمها |

---

## ٨. [[npm pack]] والاستخدام من مشروع تاني

~~~bash
npm pack --dry-run
~~~

~~~text الناتج
npm notice package: qersh@0.1.0
npm notice Tarball Contents
npm notice 1.3kB index.js
npm notice 347B package.json
npm notice Tarball Details
npm notice filename: qersh-0.1.0.tgz
npm notice package size: 1.0 kB
npm notice unpacked size: 1.7 kB
npm notice total files: 2
~~~

[[--dry-run]] بيوريك اللي **هيتنشر** من غير ما يعمل حاجة. ملفين بس: الاختبارات مش فيهم بسبب [[files]].

~~~bash
npm pack
cd ..
mkdir receipt-app
cd receipt-app
npm init -y
npm pkg set type=module
npm install ../qersh/qersh-0.1.0.tgz
node app.js
~~~

~~~js app.js
import { toPiasters, format, split } from "qersh";
const total = toPiasters("250") + toPiasters("87.5");
console.log("الإجمالي:", format(total));
console.log("على ٣:", split(total, 3).map((p) => format(p)).join(" | "));
~~~

~~~text الناتج (من غير علامات الاتجاه المخفية)
الإجمالي: ٣٣٧٫٥٠ ج.م.
على ٣: ١١٢٫٥٠ ج.م. | ١١٢٫٥٠ ج.م. | ١١٢٫٥٠ ج.م.
~~~

و [[package.json]] بتاع receipt-app بقى فيه [[ "qersh": "file:../qersh/qersh-0.1.0.tgz" ]]. وجرّبنا نعدّي الـ [[exports]]:

~~~text node --input-type=module -e "import 'qersh/index.js'"
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './index.js' is not defined by "exports" in ...\receipt-app\node_modules\qersh\package.json
~~~

---

## الخلاصة

| من ناحية اللي بيختار | اللي انت بتعمله في مكتبتك |
|---|---|
| «بتحل مشكلتي؟» | API صغير بأسماء واضحة، و README فيه مثال |
| «مش هتبوّظ حاجة؟» | من غير globals ولا تعديل built-ins، و [[sideEffects: false]] |
| «هعرف الغلط فين؟» | errors بأسماء ورسايل فيها القيمة |
| «متصانة؟» | tests للحالات الطرفية، و semver، و [[prepack]] بيشغّل الاختبارات |
| «حجمها؟ وإيه اللي جواها؟» | [[files]] و [[npm pack --dry-run]] |`,
          lines: [
            R`regex بيحدد شكل المبلغ المقبول: أرقام واختياري نقطة ورقم أو رقمين. داخلي من غير [[export]].`,
            R`[[/**]] بداية تعليق JSDoc: الـ editor بيعرضه لأي حد بيستخدم الدالة وهو بيكتب.`,
            R`وصف الدالة بالعربي: بتاخد مبلغ بالجنيه كنص وترجّعه قروش كعدد صحيح.`,
            R`[[@param {string} text]]: نوع الـ input واسمه، والـ editor بيحذّر لو بعت نوع تاني.`,
            R`[[@returns {number}]]: نوع اللي بيرجع، عشان اللي بيستخدمها يعرف من غير ما يقرا الكود.`,
            R`قفلة تعليق الـ JSDoc. كل اللي فوق ده وثائق، مش كود بيتنفّذ.`,
            R`[[export function]]: دالة عامة من الـ API، تقدر تعملها [[import { toPiasters }]] من برّه.`,
            R`[[String(text).trim()]] بيقبل رقم أو نص ويشيل المسافات من الأول والآخر.`,
            R`لو الشكل مش مطابق: [[TypeError]] برسالة فيها القيمة نفسها، بدل ما يرجّع [[NaN]] ساكت.`,
            R`[[split(".")]] بيقسم الجنيهات عن القروش، و [[frac = ""]] قيمة افتراضية لو مفيش نقطة.`,
            R`الجنيه × ١٠٠ + القروش بعد ما [[padEnd]] يكمّلها لرقمين، من غير أي رقم عشري.`,
            R`قفلة [[toPiasters]]. أول دالة من التلاتة اللي بيتكوّن منهم الـ API.`,
            R`JSDoc للدالة التانية: بداية الوثائق فوق [[format]].`,
            R`الوصف: بتحوّل القروش لمبلغ مكتوب بالشكل اللي الناس بتقراه.`,
            R`[[@param {number} piasters]]: المبلغ بالقروش كعدد صحيح.`,
            R`[[{ locale?: string }]]: object اختياري فيه لغة، والـ [[?]] معناها الحقل نفسه اختياري.`,
            R`قفلة الـ JSDoc بتاع [[format]]. مفيش [[@returns]] هنا، والتمرين ممكن يزوّده.`,
            R`[[format]] بتاخد الخيارات في object في الآخر بقيمة افتراضية [["ar-EG"]] و [[= {}]] لو متبعتش.`,
            R`[[Intl.NumberFormat]] بعملة [[EGP]] بيكتب المبلغ، والقسمة على ١٠٠ وقت العرض بس.`,
            R`قفلة [[format]]. الدالة مش بتغيّر أي حاجة، بترجّع نص جديد وبس.`,
            R`JSDoc للدالة التالتة: بداية وثائق [[split]].`,
            R`الوصف بيقول القاعدة: القروش الزيادة بتروح لأول الناس، عشان مفيش قرش يضيع.`,
            R`[[@param {number} piasters]]: المبلغ الكلي بالقروش اللي هيتقسم.`,
            R`[[@param {number} parts]]: عدد الناس اللي هيتقسم عليهم المبلغ.`,
            R`[[@returns {number[]}]]: array أرقام، واحد لكل شخص.`,
            R`قفلة الـ JSDoc بتاع [[split]]. التلات دوال كلهم متوثّقين بنفس الشكل.`,
            R`[[split]] بتاخد المبلغ وعدد الناس، وهي آخر دالة في الـ API.`,
            R`لو [[parts]] مش عدد صحيح أكبر من صفر: [[RangeError]]. (ونسينا نفحص [[piasters]]، والتمرين التاني بيلاقيها.)`,
            R`[[Math.floor]] بيدّي كل واحد نصيبه الصحيح من غير كسور.`,
            R`[[%]] باقي القسمة: عدد القروش اللي فضلت وهتتوزع واحد واحد.`,
            R`[[Array.from({ length })]] بيعمل array بعدد الناس، وأول [[extra]] واحد بياخدوا قرش زيادة.`,
            R`قفلة [[split]] وآخر سطر في المكتبة. مفيش أي كود بيشتغل وقت الـ import.`,
          ],
          ref: [
            { t: "MDN Curriculum: JavaScript fundamentals (6.14 Libraries and frameworks)", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
            { t: "Node.js: Packages (exports و type)", url: "https://nodejs.org/api/packages.html" },
            { t: "Node.js: Test runner", url: "https://nodejs.org/api/test.html" },
            { t: "npm Docs: package.json", url: "https://docs.npmjs.com/cli/v11/configuring-npm/package-json/" },
            { t: "npm Docs: npm pack", url: "https://docs.npmjs.com/cli/v11/commands/npm-pack/" },
            { t: "npm Docs: npm version", url: "https://docs.npmjs.com/cli/v11/commands/npm-version/" },
            { t: "Semantic Versioning", url: "https://semver.org/" },
          ],
          pre: [{ to: "js/import و export", why: R`[[export]] اللي بيكوّن الـ API، و [[import * as]]` }, { to: "node/npm publish", why: R`الخطوة اللي بعد [[npm pack]]: النشر على npm بجد` }, { to: "js/اختبار JS بـ Vitest", why: R`نفس فكرة الاختبارات بأداة تانية، لو مشروعك بيستخدم Vite` }],
        },
      ],
      projects: [
        { lvl: 'صغير', dir: "dep-scorecard", t: R`صفحة «أستخدم المكتبة دي؟»`, what: R`صفحة فيها فورم: اسم الـ package، والمكتبة المشهورة اللي انت قاصدها (اختياري)، وتاريخ آخر نسخة، والتحميلات في الأسبوع، والرخصة، والحجم بعد gzip، و checkbox لـ install scripts، و checkbox «المنصة فيها نفس الحاجة». الضغط على «قيّم» بيطلّع درجة من ١٠٠ ولون (أخضر أو أصفر أو أحمر) وكل سبب في سطر. ولو الاسم قريب من المشهورة بحرف أو اتنين ومش هو: تحذير typosquatting. من درسي «تختار dependency وتفحصها» و «كود غيرك».`, done: R`بيانات dayjs الحقيقية (٢١ نوفمبر 2026) بتطلع [[100/100]] أخضر، و [[loadsh]] مع «قاصد lodash» بتطلع أحمر وأول سبب «شبه lodash بس مش هو»، و package من غير رخصة وفيها بديل في المنصة بتطلع [[0/100]]. والنتيجة بتتقري لقارئ الشاشة ([[role="status"]]).`, sol: R`## الشكل النهائي

~~~live 620 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أستخدم المكتبة دي؟</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 16px; max-width: 560px; }
  fieldset { border: 1px solid #ccc; border-radius: 8px; display: grid; gap: 8px; }
  label { display: grid; gap: 2px; }
  label.row { display: flex; gap: 6px; align-items: center; }
  input, select, button { font: inherit; padding: 4px 6px; }
  #verdict { margin-block-start: 12px; padding: 10px; border-radius: 8px; background: #f3f4f6; }
  #verdict.good { background: #dcfce7; }
  #verdict.warn { background: #fef9c3; }
  #verdict.bad { background: #fee2e2; }
  #verdict ul { margin: 6px 0 0; padding-inline-start: 20px; }
</style>
</head>
<body>
<h1>أستخدم المكتبة دي؟</h1>
<form id="form">
  <fieldset>
    <legend>اللي لقيته عن الـ package</legend>
    <label>اسمها <input name="name" required value="dayjs"></label>
    <label>المكتبة المشهورة اللي انت قاصدها (اختياري) <input name="meant" placeholder="lodash"></label>
    <label>تاريخ آخر نسخة <input name="published" type="date" required value="2026-08-17"></label>
    <label>التحميلات في الأسبوع <input name="downloads" type="number" min="0" required value="116841075"></label>
    <label>الرخصة
      <select name="license">
        <option>MIT</option><option>Apache-2.0</option><option>BSD-3-Clause</option><option>ISC</option>
        <option>GPL-3.0</option><option value="">مفيش رخصة</option>
      </select>
    </label>
    <label>الحجم في الـ bundle بعد gzip (KB) <input name="kb" type="number" min="0" step="0.1" required value="6.5"></label>
    <label class="row"><input name="scripts" type="checkbox"> فيها install scripts (preinstall أو postinstall)</label>
    <label class="row"><input name="native" type="checkbox"> المتصفح أو اللغة فيهم نفس الحاجة (Intl، fetch…)</label>
    <button>قيّم</button>
  </fieldset>
</form>
<div id="verdict" role="status" aria-live="polite"></div>
<script>
  const TODAY = new Date("2026-11-21");
  const PERMISSIVE = ["MIT", "Apache-2.0", "BSD-3-Clause", "ISC"];
  function distance(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      let prev = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const keep = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = keep;
      }
    }
    return row[b.length];
  }
  function assess(p) {
    const notes = [];
    let score = 100;
    if (p.meant && p.meant !== p.name && distance(p.name, p.meant) <= 2) {
      score -= 60;
      notes.push($__btالاسم «$__{p.name}» شبه «$__{p.meant}» بس مش هو: غالبًا غلطة كتابة أو typosquatting$__bt);
    }
    const days = Math.round((TODAY - new Date(p.published)) / 86400000);
    if (days > 730) { score -= 30; notes.push($__btآخر نسخة من $__{days} يوم: غالبًا مش متصانة$__bt); }
    else notes.push($__btآخر نسخة من $__{days} يوم$__bt);
    if (p.downloads < 1000) { score -= 25; notes.push("تحميلات قليلة جدًا: اتأكد إن الاسم مش غلط (typosquatting)"); }
    if (!p.license) { score -= 40; notes.push("مفيش رخصة: قانونيًا مش من حقك تستخدمها"); }
    else if (!PERMISSIVE.includes(p.license)) { score -= 15; notes.push($__bt$__{p.license} بتفرض شروط على كودك: اسأل قبل ما تستخدمها في مشروع مقفول$__bt); }
    if (p.kb > 50) { score -= 20; notes.push($__bt$__{p.kb} KB كتير على صفحة: قيس البديل$__bt); }
    if (p.scripts) { score -= 15; notes.push("install scripts بتشتغل على جهازك وقت التسطيب: اقراها الأول"); }
    if (p.native) { score -= 30; notes.push("فيه بديل جاهز في المنصة: جرّبه قبل ما تزوّد dependency"); }
    const level = score >= 70 ? "good" : score >= 40 ? "warn" : "bad";
    return { score: Math.max(0, score), level, notes };
  }
  const form = document.querySelector("#form");
  const box = document.querySelector("#verdict");
  const words = { good: "تمام، استخدمها", warn: "فكّر تاني", bad: "لأ" };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const result = assess({
      name: data.get("name").trim(),
      meant: data.get("meant").trim(),
      published: data.get("published"),
      downloads: Number(data.get("downloads")),
      license: data.get("license"),
      kb: Number(data.get("kb")),
      scripts: data.has("scripts"),
      native: data.has("native"),
    });
    box.className = result.level;
    box.innerHTML = $__bt<strong></strong><ul>$__{result.notes.map(() => "<li></li>").join("")}</ul>$__bt;
    box.querySelector("strong").textContent = $__bt$__{data.get("name")}: $__{result.score}/100، $__{words[result.level]}$__bt;
    box.querySelectorAll("li").forEach((li, i) => { li.textContent = result.notes[i]; });
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

فورم مالي ببيانات dayjs الحقيقية. «قيّم» بيكتب تحت [[dayjs: 100/100، تمام، استخدمها]] على خلفية خضرا وسبب واحد «آخر نسخة من 96 يوم». غيّر الاسم لـ [[loadsh]] واكتب [[lodash]] في «قاصدها»: النتيجة بتبقى حمرا.

## الكود حتة حتة

- **[[assess(p)]]** دالة نقية: بتاخد object وترجّع [[{ score, level, notes }]] ومبتلمسش الصفحة. عشان كده سهل تختبرها لوحدها، والـ submit handler بس هو اللي بيقرا الفورم ويكتب النتيجة.
- **كل قاعدة بتخصم وبتكتب سبب:** مفيش درجة من غير شرح. الأرقام (٣٠ للقديمة، و ٤٠ لمفيش رخصة…) قرار، غيّرها حسب فريقك، بس خليها مكتوبة في مكان واحد.
- **[[distance(a, b)]]:** Levenshtein distance، أقل عدد حروف تتغير أو تتزاد أو تتشال عشان كلمة تبقى التانية. [[loadsh]] و [[lodash]] مسافتهم ٢ (حرفين اتبدلوا مكانهم). الـ [[row]] array واحدة بتتحدّث صف صف بدل جدول كامل.
- **[[TODAY]] ثابت:** عشان النتيجة تتكرر وانت بتختبر. في الاستخدام الحقيقي [[new Date()]].
- **[[textContent]] مش [[innerHTML]] للأسماء:** اسم الـ package جاي من اليوزر، فبنبني الهيكل بـ [[innerHTML]] فاضي وبعدين نحط النص بـ [[textContent]] (درس «innerHTML هي الباب»).
- **[[role="status"]] و [[aria-live="polite"]]:** النتيجة بتتقري لوحدها لقارئ الشاشة بعد الضغط.
- **[[FormData]] و [[data.has("scripts")]]:** الـ checkbox المش متعلّم مبيتبعتش أصلًا، فـ [[has]] = متعلّم ولا لأ.

## اتجرّب إزاي (Chrome 157، [[requestSubmit()]] من الـ Console)

~~~text اللي اتقاس
dayjs: 100/100، تمام، استخدمها | آخر نسخة من 96 يوم
loadsh (قاصد lodash، آخر نسخة 2019-03-12، 14147 تحميلة): 10/100، لأ | الاسم «loadsh» شبه «lodash» بس مش هو: غالبًا غلطة كتابة أو typosquatting | آخر نسخة من 2811 يوم: غالبًا مش متصانة | class=bad
package متألّفة من غير رخصة (2018-04-09، 900 تحميلة، والمنصة فيها البديل): 0/100، لأ
~~~

البيانات الحقيقية لـ dayjs و loadsh من [[npm view]] و [[api.npmjs.org]] يوم ٢١ نوفمبر 2026. والصفحة عرضها 360px من غير scroll أفقي.

## الغلطة اللي حصلت وانت بتبنيها

النسخة الأولى كانت من غير خانة «قاصدها» ومن غير [[distance]]. [[loadsh]] بتاريخها وتحميلاتها الحقيقية طلعت **[[70/100]]، تمام، استخدمها**: آخر نسخة قديمة (−٣٠) والتحميلات ١٤ ألف (مش أقل من ١٠٠٠ فمخصمش). يعني الأداة كانت هتوافق على typosquat. الأرقام لوحدها مبتكشفش إن الاسم غلط، لازم تقارنه بالاسم اللي انت قاصده. ضفنا الخانة والقاعدة (−٦٠)، فبقت [[10/100]].` },
        { lvl: 'صغير', t: R`npm-age: كل package آخر نسخة ليها نزلت إمتى`, what: R`سكربت Node واحد [[npm-age.mjs]] بياخد أسامي packages من الترمنال، ولكل واحدة بيسأل الـ registry بـ [[fetch]] ويطبع سطر: آخر نسخة، وتاريخ نشرها (من [[time[latest]]] مش [[time.modified]])، وعمرها بالأيام، والرخصة، و «قديمة» لو أكتر من سنتين، والـ [[deprecated]] لو فيه. الاسم اللي مش موجود يطبع رسالة واضحة. exit code: 0 كله تمام، و 1 لو فيه اسم مش موجود، و 2 لو متكتبش ولا اسم. من درس «تختار dependency وتفحصها».`, done: R`[[node npm-age.mjs dayjs moment left-pad chart.js @floating-ui/dom]] بيطبع ٥ سطور، و left-pad عليها «قديمة» ورسالة الـ deprecation، و [[node npm-age.mjs dayjss]] بيقول «مش موجودة» و exit code 1.`, sol: R`## الناتج النهائي

~~~text node npm-age.mjs dayjs moment left-pad chart.js @floating-ui/dom (يوم 21 نوفمبر 2026)
dayjs            1.11.23   2026-08-17     95 يوم  MIT
moment           2.31.0    2026-09-15     67 يوم  MIT
left-pad         1.3.0     2018-04-09   3148 يوم  WTFPL  <- قديمة  <- deprecated: use String.prototype.padStart()
chart.js         4.6.1     2026-10-22     29 يوم  MIT
@floating-ui/dom 1.8.0     2026-07-11    132 يوم  MIT
exit=0
~~~

~~~text node npm-age.mjs dayjss  ثم  node npm-age.mjs
dayjss           مش موجودة في الـ registry (الاسم مكتوب صح؟)
exit=1
استخدام: node npm-age.mjs <package> [package...]
exit=2
~~~

## هتشوف إيه

سطر لكل package في أعمدة مرصوصة. أي حاجة تستاهل انتباه ليها سهم [[<-]] في آخر السطر.

## الكود

~~~js npm-age.mjs
// npm-age: كل package آخر نسخة نزلت إمتى ورخصتها إيه
const DAY = 86400000;
const names = process.argv.slice(2);
if (names.length === 0) {
  console.error("استخدام: node npm-age.mjs <package> [package...]");
  process.exit(2);
}
let failed = false;
for (const name of names) {
  const url = $__bthttps://registry.npmjs.org/$__{name.replace("/", "%2F")}$__bt;
  const res = await fetch(url);
  if (res.status === 404) {
    console.log($__bt$__{name.padEnd(16)} مش موجودة في الـ registry (الاسم مكتوب صح؟)$__bt);
    failed = true;
    continue;
  }
  if (!res.ok) throw new Error($__bt$__{name}: HTTP $__{res.status}$__bt);
  const doc = await res.json();
  const latest = doc["dist-tags"].latest;
  const published = new Date(doc.time[latest]);
  const days = Math.floor((Date.now() - published) / DAY);
  const license = doc.versions[latest].license ?? "مفيش";
  const old = days > 730 ? "  <- قديمة" : "";
  const dep = doc.versions[latest].deprecated ? $__bt  <- deprecated: $__{doc.versions[latest].deprecated}$__bt : "";
  console.log($__bt$__{name.padEnd(16)} $__{latest.padEnd(9)} $__{published.toISOString().slice(0, 10)}  $__{String(days).padStart(5)} يوم  $__{license}$__{old}$__{dep}$__bt);
}
process.exit(failed ? 1 : 0);
~~~

## الكود حتة حتة

- **[[process.argv.slice(2)]]:** أول عنصرين مسار [[node]] ومسار السكربت، والباقي أسامي الـ packages.
- **[[process.exit(2)]] من غير أسامي:** 2 = «استخدمت الأداة غلط»، غير 1 = «الأداة اشتغلت ولقت مشكلة». أي سكربت أو CI بيستخدمها يقدر يفرّق.
- **[[name.replace("/", "%2F")]]:** الـ scoped packages ([[@floating-ui/dom]]) الـ [[/]] اللي في اسمها لازم يتكتب [[%2F]] في الـ URL، وإلا الـ registry يفتكرها مسار.
- **[[res.status === 404]] قبل [[res.ok]]:** الـ 404 هنا معلومة (الاسم غلط) مش عطل، فبنكمّل باقي الأسامي ونعلّم [[failed]]. أي status تاني غلط = [[throw]].
- **[[doc["dist-tags"].latest]]** ثم **[[doc.time[latest]]]:** النسخة اللي [[npm install]] بيجيبها، وتاريخ نشرها هي بالظبط.
- **[[doc.versions[latest].license]] و [[.deprecated]]:** من بيانات النسخة الأخيرة نفسها، لأن الرخصة ممكن تتغير بين النسخ.

## الغلطات اللي حصلت وانت بتبنيها

- **النسخة الأولى كانت بتقرا [[time.modified]]:** left-pad طلعت «من ٣ أيام»! [[time.modified]] بيتغير مع أي تعديل في بيانات الـ package (هنا نوفمبر 2026)، وآخر نسخة فعلًا من 2018. التصليح: [[time[latest]]].
- **موضوع moment:** آخر نسخة من ٦٧ يوم، فالسكربت مش هيقول عليها حاجة. بس الـ project نفسه معلن إنه في maintenance mode وبينصح ببدايل. أداة الأرقام مبتعرفش ده: لازم تقرا صفحة المشروع.

## اتقاس

- الـ registry بيرجّع الـ packument كامل (كل النسخ): react ٧٫١ MB، و dayjs ٤٩٧ KB، و lodash ٢٤٨ KB (قسناها بـ [[curl]]). لو هتسأل عن مئات packages، [[https://registry.npmjs.org/<name>/latest]] بيرجّع النسخة الأخيرة بس (react ٢١٥٠ بايت) بس من غير التواريخ.` },
        { lvl: 'متوسط', dir: "tooltip-two-ways", t: R`نفس التوولتيب بإيدك وبمكتبة، وقرار مكتوب`, what: R`توولتيب لـ ٣ زراير (اتنين لازقين في أعلى الشاشة يمين وشمال، وواحد في النص) بيظهر مع الماوس والكيبورد ([[focusin]]) وبيستخبى بـ [[Escape]]، وبيقلب تحت لو مفيش مكان فوق، ومبيخرجش برّه الشاشة يمين أو شمال. اعمله مرة بإيدك ([[getBoundingClientRect]]) ومرة بمكتبة Floating UI ([[computePosition]] و [[flip]] و [[shift]])، واختبر الاتنين على عرض 360px، وقيس حجمهم بعد gzip، واكتب قرار من ٥ سطور: أنهي واحدة للمشروع ده وليه. من دروس «كود غيرك» و «إمتى framework غلط».`, done: R`الاتنين بيحطوا التوولتيب في نفس المكان بالبكسل في الـ ٣ زراير على 360px (اتنين تحت وواحد فوق، وكله جوه الشاشة)، و [[Escape]] بيخفيه، والقياس: بإيدك ٤٥٤ بايت و Floating UI ٦٠٨٤ بايت بعد gzip، والقرار مكتوب بالأرقام.`, sol: R`## الشكل النهائي (النسخة اللي بإيدك)

~~~live 260 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>tooltip بإيدك</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 0; padding: 0 16px 16px; }
  .bar { display: flex; justify-content: space-between; }
  button { font: inherit; padding: 6px 12px; }
  .tip { position: fixed; top: 0; left: 0; max-width: 220px; background: #111827; color: #fff; padding: 6px 10px; border-radius: 6px; font-size: 13px; pointer-events: none; }
  .tip[hidden] { display: none; }
  p { margin-block: 60px; }
</style>
</head>
<body>
<div class="bar">
  <button type="button" data-tip="بيحفظ المسودة في الجهاز ده بس" aria-describedby="tip">احفظ</button>
  <button type="button" data-tip="بيمسح كل اللي في السلة ومفيش رجوع" aria-describedby="tip">فضّي السلة</button>
</div>
<p><button type="button" data-tip="الطلب بيوصل في ٤٥ دقيقة تقريبًا" aria-describedby="tip">اطلب</button></p>
<div class="tip" id="tip" role="tooltip" hidden></div>
<script>
  const tip = document.querySelector("#tip");
  const GAP = 8;
  const PAD = 8;
  function place(target) {
    const r = target.getBoundingClientRect();
    const t = tip.getBoundingClientRect();
    let top = r.top - t.height - GAP;
    let side = "top";
    if (top < PAD) {
      top = r.bottom + GAP;
      side = "bottom";
    }
    let left = r.left + r.width / 2 - t.width / 2;
    left = Math.min(Math.max(left, PAD), innerWidth - t.width - PAD);
    tip.style.translate = $__bt$__{Math.round(left)}px $__{Math.round(top)}px$__bt;
    tip.dataset.side = side;
  }
  function show(e) {
    const target = e.target.closest("[data-tip]");
    if (!target) return;
    tip.textContent = target.dataset.tip;
    tip.hidden = false;
    place(target);
  }
  function hide() {
    tip.hidden = true;
  }
  document.addEventListener("pointerover", show);
  document.addEventListener("focusin", show);
  document.addEventListener("pointerout", hide);
  document.addEventListener("focusout", hide);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hide();
  });
</script>
</body>
</html>
~~~

## هتشوف إيه

٣ زراير. حط الماوس أو دوس [[Tab]] على «احفظ» أو «فضّي السلة»: التوولتيب بيظهر **تحتهم** لأنهم لازقين في أعلى الشاشة. «اطلب» في النص: التوولتيب فوقه. وعلى موبايل التوولتيب مبيخرجش برّه الشاشة يمين ولا شمال.

## النسخة بالمكتبة

~~~bash
npm install @floating-ui/dom esbuild
npx esbuild tooltip-floating.js --bundle --minify --format=esm --outfile=floating.bundle.js
~~~

~~~js tooltip-floating.js
import { computePosition, offset, flip, shift } from "@floating-ui/dom";
const tip = document.querySelector("#tip");
async function show(e) {
  const target = e.target.closest("[data-tip]");
  if (!target) return;
  tip.textContent = target.dataset.tip;
  tip.hidden = false;
  const { x, y, placement } = await computePosition(target, tip, {
    placement: "top",
    strategy: "fixed",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });
  tip.style.translate = $__bt$__{Math.round(x)}px $__{Math.round(y)}px$__bt;
  tip.dataset.side = placement;
}
function hide() {
  tip.hidden = true;
}
document.addEventListener("pointerover", show);
document.addEventListener("focusin", show);
document.addEventListener("pointerout", hide);
document.addEventListener("focusout", hide);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hide();
});
~~~

~~~html floating.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>tooltip بـ Floating UI</title>
<style>
  body { font: 15px/1.6 system-ui, sans-serif; margin: 0; padding: 0 16px 16px; }
  .bar { display: flex; justify-content: space-between; }
  button { font: inherit; padding: 6px 12px; }
  .tip { position: fixed; top: 0; left: 0; max-width: 220px; background: #111827; color: #fff; padding: 6px 10px; border-radius: 6px; font-size: 13px; pointer-events: none; }
  .tip[hidden] { display: none; }
  p { margin-block: 60px; }
</style>
</head>
<body>
<div class="bar">
  <button type="button" data-tip="بيحفظ المسودة في الجهاز ده بس" aria-describedby="tip">احفظ</button>
  <button type="button" data-tip="بيمسح كل اللي في السلة ومفيش رجوع" aria-describedby="tip">فضّي السلة</button>
</div>
<p><button type="button" data-tip="الطلب بيوصل في ٤٥ دقيقة تقريبًا" aria-describedby="tip">اطلب</button></p>
<div class="tip" id="tip" role="tooltip" hidden></div>
<script type="module" src="floating.bundle.js"></script>
</body>
</html>
~~~

(نفس الـ HTML والـ CSS، والفرق سطر الـ script بس.)

## الكود حتة حتة

- **[[getBoundingClientRect()]]:** مكان الزرار والتوولتيب بالنسبة للشاشة. لازم [[tip.hidden = false]] **قبل** القياس، لأن العنصر المخفي مقاسه صفر.
- **القلب:** لو [[r.top - t.height - GAP]] أقل من [[PAD]] (مفيش مكان فوق) → تحت الزرار.
- **الحبس جوه الشاشة:** [[Math.min(Math.max(left, PAD), innerWidth - t.width - PAD)]]: مش أقل من ٨ ومش أكتر من آخر الشاشة ناقص عرض التوولتيب.
- **[[position: fixed]] و [[translate]]:** الإحداثيات من [[getBoundingClientRect]] بالنسبة للشاشة، و [[fixed]] بنفس النظام، فمفيش حساب scroll. و [[translate]] أسرع من [[top]] و [[left]] لأنه مبيعملش layout.
- **[[focusin]] و [[focusout]]:** بيحصلوا للأب كمان (عكس [[focus]])، فـ listener واحد على [[document]] بيكفي، والكيبورد بيشتغل زي الماوس.
- **[[role="tooltip"]] و [[aria-describedby="tip"]]:** قارئ الشاشة بيقرا نص التوولتيب كوصف للزرار. و [[Escape]] بيخفيه (مطلوب في نمط الـ tooltip في WAI-ARIA APG).
- **Floating UI:** [[offset(8)]] المسافة، و [[flip()]] يقلب لو مفيش مكان، و [[shift({ padding: 8 })]] يزق جوه الشاشة. نفس الـ ٣ قرارات بس مكتوبين كـ middleware، و [[computePosition]] بترجّع Promise.

## اتقاس

على عرض 360px في Chrome 157 (focus على كل زرار وقراية [[getBoundingClientRect]] بتاع التوولتيب):

~~~text اللي اتقاس
بإيدك:
احفظ: bottom tip[155..352, 47..80] btn top=0 inside=true
فضّي السلة: bottom tip[8..236, 47..80] btn top=0 inside=true
اطلب: top tip[154..352, 58..91] btn top=99 inside=true
Floating UI:
احفظ: bottom tip[155..352, 47..80] btn top=0 inside=true
فضّي السلة: bottom tip[8..236, 47..80] btn top=0 inside=true
اطلب: top tip[154..352, 58..91] btn top=99 inside=true
esc يخفي: true
~~~

~~~text node measure.mjs tooltip.js tooltip-floating.js (esbuild 0.28.2، @floating-ui/dom 1.8.0)
tooltip-two-ways/tooltip.js     816 B     454 B gzip
tooltip-two-ways/tooltip-floating.js   14927 B    6084 B gzip
~~~

| | بإيدك | Floating UI |
|---|---|---|
| سطور كودك | ٣٤ | ٢٥ |
| بعد gzip | ٤٥٤ بايت | ٦٠٨٤ بايت |
| النتيجة على 360px | نفس البكسل | نفس البكسل |

## القرار (decision record)

~~~text DECISION.md
القرار: التوولتيب بإيدك (tooltip.js) للصفحة دي.
السياق: ٣ زراير في صفحة ثابتة، مفيش scroll جوه containers، ومفيش أسهم ولا dropdowns.
الأرقام: نفس المكان بالبكسل على 360px، و ٤٥٤ بايت مقابل ٦٠٨٤ بايت بعد gzip (١٣ مرة).
نرجع لـ Floating UI لو: التوولتيب جوه عنصر بيعمل scroll، أو محتاج يتحرك مع الـ scroll (autoUpdate)، أو سهم، أو dropdowns و popovers في أماكن كتير.
اتراجع: ٢١ نوفمبر 2026.
~~~

## الغلطات اللي حصلت وانت بتبنيها

- **أول قياس طلع التوولتيب في مكان غلط:** كنا بنقيس [[tip.getBoundingClientRect()]] وهو لسه [[hidden]]، فالعرض والطول صفر والتوولتيب بيتحط فوق الزرار على طول. التصليح: نعرض الأول ونكتب النص، وبعدين نقيس.
- **النسخة اللي بإيدك ناقصها حاجة Floating UI بتعملها:** لو الصفحة عملت scroll والتوولتيب ظاهر، مكانه مبيتحدّثش (Floating UI عندها [[autoUpdate]] لده). مقبول هنا لأن التوولتيب بيستخبى مع [[pointerout]] و [[focusout]]، وده مكتوب في القرار.` },
        { lvl: 'متوسط', t: R`arqamy: مكتبة أرقام عربي من فولدر لفولدر بـ npm pack`, what: R`مكتبة صغيرة فيها [[toLatin]] (٠١٢٣ والفارسي ۱۲۳ لـ 0123) و [[toArabic]] (وخيار [[decimal]] يحوّل النقطة لـ «٫») و [[parseNumber]] (بتقرا [["١٢٫٥"]] و [["١٬٢٥٠"]] وترجّع [[NaN]] للكلام الغلط)، بـ JSDoc و README و [[node --test]]. اعملها [[npm pack]] وسطّبها في فولدر تاني [[invoice-cli]] فيه سكربت فاتورة بياخد [["صنف=سعر"]] من الترمنال. وبعدين طلّع نسخة جديدة بـ [[npm version]] وحدّث الفولدر التاني. اتأكد الأول إن الاسم مش محجوز على npm. من درس «مكتبتك الصغيرة».`, done: R`[[node invoice.js "كشري=٤٥" "شاي=10" "عصير=١٢٫٥"]] بيطبع الأسعار بأرقام عربي و «٫» والإجمالي [[٦٧٫٥٠]]، و [[npm ls]] في invoice-cli بيقول [[arqamy@1.1.1]]، و [[npm pack]] بيرفض يعمل tarball لو اختبار واقع.`, sol: R`## الناتج النهائي

~~~text invoice-cli: node invoice.js "كشري=٤٥" "شاي=10" "عصير=١٢٫٥"
كشري     ٤٥٫٠٠
شاي      ١٠٫٠٠
عصير     ١٢٫٥٠
الإجمالي ٦٧٫٥٠
~~~

~~~text node invoice.js "كشري=خمسة"  ثم  npm ls
سعر مش مفهوم في «كشري=خمسة»
exit=1
invoice-cli@1.0.0
$__bt-- arqamy@1.1.1
~~~

## هتشوف إيه

فولدرين جنب بعض: [[arqamy/]] (المكتبة) و [[invoice-cli/]] (اللي بيستخدمها). المكتبة بتوصل للتاني كـ tarball، زي ما كانت هتوصل من npm بالظبط.

~~~text شجرة الملفات
proj/
  arqamy/
    index.js
    index.test.js
    package.json
    README.md
  invoice-cli/
    invoice.js
    package.json
~~~

## المكتبة

~~~js arqamy/index.js
// arqamy: تحويل الأرقام بين ٠١٢٣ و 0123
const ARABIC = "٠١٢٣٤٥٦٧٨٩";
const PERSIAN = "۰۱۲۳۴۵۶۷۸۹";

/**
 * يحوّل أي أرقام عربي أو فارسي في النص لأرقام إنجليزي.
 * @param {string} text
 * @returns {string}
 */
export function toLatin(text) {
  return String(text).replace(/[٠-٩۰-۹]/g, (d) => {
    const i = ARABIC.indexOf(d);
    return String(i === -1 ? PERSIAN.indexOf(d) : i);
  });
}

/**
 * يحوّل الأرقام الإنجليزي في النص لأرقام عربي.
 * @param {string} text
 * @param {{ decimal?: boolean }} [options] decimal: النقطة بين رقمين تبقى «٫»
 * @returns {string}
 */
export function toArabic(text, { decimal = false } = {}) {
  let out = String(text);
  if (decimal) out = out.replace(/(\d)\.(\d)/g, "$1٫$2");
  return out.replace(/[0-9]/g, (d) => ARABIC[d]);
}

/**
 * يقرا رقم مكتوب بأي شكل ("١٢٫٥" أو "12.5") ويرجّع Number، أو NaN.
 * @param {string} text
 * @returns {number}
 */
export function parseNumber(text) {
  const latin = toLatin(text).trim().replace("٫", ".").replace(/[٬,]/g, "");
  return /^-?\d+(\.\d+)?$/.test(latin) ? Number(latin) : NaN;
}
~~~

~~~js arqamy/index.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { toLatin, toArabic, parseNumber } from "./index.js";

test("toLatin: عربي وفارسي ومخلوط", () => {
  assert.equal(toLatin("٠١٠١٢٣٤٥٦٧٨"), "01012345678");
  assert.equal(toLatin("۱۲۳"), "123");
  assert.equal(toLatin("شقة ٣ دور 2"), "شقة 3 دور 2");
});

test("toArabic", () => {
  assert.equal(toArabic("الطلب 45 جنيه"), "الطلب ٤٥ جنيه");
  assert.equal(toArabic("12.50"), "١٢.٥٠");
  assert.equal(toArabic("12.50", { decimal: true }), "١٢٫٥٠");
  assert.equal(toArabic("آخر جملة.", { decimal: true }), "آخر جملة.");
});

test("parseNumber: الفاصلة العشرية العربي وفاصل الآلاف", () => {
  assert.equal(parseNumber("١٢٫٥"), 12.5);
  assert.equal(parseNumber("١٬٢٥٠"), 1250);
  assert.equal(parseNumber(" 99 "), 99);
  assert.ok(Number.isNaN(parseNumber("١٢ جنيه")));
  assert.ok(Number.isNaN(parseNumber("")));
});
~~~

~~~json arqamy/package.json
{
  "name": "arqamy",
  "version": "1.1.1",
  "description": "تحويل الأرقام بين العربي والإنجليزي وقراية الأرقام المكتوبة بالعربي",
  "type": "module",
  "exports": "./index.js",
  "files": [
    "index.js",
    "README.md"
  ],
  "sideEffects": false,
  "scripts": {
    "test": "node --test",
    "prepack": "npm test"
  },
  "license": "MIT"
}
~~~

~~~text arqamy/README.md
# arqamy

تحويل الأرقام بين ٠١٢٣ و 0123.

$__bt$__bt$__btjs
import { toLatin, toArabic, parseNumber } from "arqamy";
toLatin("٠١٠١٢٣٤٥٦٧٨"); // "01012345678"
toArabic("45");         // "٤٥"
parseNumber("١٢٫٥");    // 12.5
$__bt$__bt$__bt
~~~

## اللي بيستخدمها

~~~js invoice-cli/invoice.js
import { parseNumber, toArabic } from "arqamy";
const lines = process.argv.slice(2);
if (lines.length === 0) {
  console.error('استخدام: node invoice.js "كشري=٤٥" "شاي=10"');
  process.exit(2);
}
let total = 0;
for (const line of lines) {
  const [item, price] = line.split("=");
  const n = parseNumber(price ?? "");
  if (Number.isNaN(n)) {
    console.error($__btسعر مش مفهوم في «$__{line}»$__bt);
    process.exit(1);
  }
  total += n;
  console.log($__bt$__{item.padEnd(8)} $__{toArabic(n.toFixed(2), { decimal: true })}$__bt);
}
console.log($__btالإجمالي $__{toArabic(total.toFixed(2), { decimal: true })}$__bt);
~~~

## ترتيب البناء

~~~bash
npm view arqam name version
npm view arqamy name
cd arqamy
npm test
npm pack
cd ../invoice-cli
npm init -y
npm pkg set type=module
npm install ../arqamy/arqamy-1.0.0.tgz
node invoice.js "كشري=٤٥" "شاي=10" "عصير=١٢٫٥"
~~~

## الكود حتة حتة

- **[[/[٠-٩۰-۹]/g]] و [[indexOf]]:** أي رقم عربي (U+0660 لـ U+0669) أو فارسي (U+06F0 لـ U+06F9) بيتبدّل بمكانه في السلسلة، ومكانه هو الرقم نفسه.
- **[[ARABIC[d]]]:** [[d]] نص زي [["4"]]، والـ index بيقبل نص رقم، فـ [[ARABIC["4"]]] = [["٤"]].
- **[[parseNumber]]:** بيحوّل للإنجليزي، ويبدّل «٫» (U+066B، الفاصلة العشرية العربي) بنقطة، ويشيل فاصل الآلاف («٬» U+066C و [[,]])، وبعدين regex صارم. [["١٢ جنيه"]] = [[NaN]] مش [[12]] زي [[parseFloat]].
- **[[{ decimal = false } = {}]]:** الخيار الجديد اختياري وقيمته الافتراضية السلوك القديم، فاللي بيستخدم 1.0.0 مش هيحس بحاجة: ده minor.
- **[[/(\d)\.(\d)/g]]:** النقطة بس لو بين رقمين، فـ «آخر جملة.» متتغيرش (فيه اختبار ليها).
- **[[prepack]]:** [[npm pack]] (و [[npm publish]]) بيشغّل [[npm test]] الأول، ولو وقع مفيش tarball.

## الغلطات اللي حصلت وانت بتبنيها

- **الاسم كان محجوز:** أول اسم كان [[arqam]]، و [[npm view arqam name version]] رجّع [[arqam]] و [[1.1.2]]: package موجودة بالاسم ده. لو كنا نشرنا كانت هتترفض، ولو حد سطّب [[arqam]] كان هيجيب حاجة تانية خالص. غيّرناه لـ [[arqamy]] بعد ما [[npm view arqamy name]] رجّع [[E404]].
- **نشرنا 1.1.0 بايظة:** زوّدنا [[decimal]] وعملنا [[npm version minor]] و [[npm pack]] من غير ما نشغّل الاختبارات. الـ regex كان اتكتب غلط ([[/(d).(d)/g]] من غير الـ backslashes) والـ tarball طلع. الاختبار كان هيمسكها: [[ℹ pass 2]] و [[ℹ fail 1]]. التصليح: 1.1.1 بالـ regex الصح، و [[npm pkg set scripts.prepack="npm test"]]. وجرّبنا نبوّظ الكود تاني: [[npm pack]] وقف بـ [[npm error code 1]] و exit code 1 ومفيش tarball اتعمل.
- **الفولدر التاني مبيشوفش التعديل:** عدّلنا [[arqamy/index.js]] وجرّبنا من invoice-cli على طول: لسه القديم ([[١٢.٥٠]] بالنقطة). [[npm install]] من tarball بينسخ الملفات في [[node_modules]]، مش لينك. لازم [[npm pack]] تاني و [[npm install ../arqamy/arqamy-1.1.1.tgz]]. (لو عايز لينك وانت بتطوّر: [[npm link]] أو workspaces.)

## اتقاس

- [[npm test]]: ٣ اختبارات (فيهم ٩ assertions) عدّوا في 1.1.1.
- الـ tarball: ٣ ملفات و 941 بايت (1.0.0)، لأن [[files]] فيها [[index.js]] و [[README.md]] بس.` },
        { lvl: 'كبير', t: R`deps-report: تقرير عن كل dependency في أي مشروع`, what: R`أداة CLI بتقرا [[package.json]] أي مشروع (dependencies و devDependencies)، وبتسأل الـ registry عن كل package (٤ في المرة)، وبتطلّع جدول: المستوى (OK أو WARN أو HIGH)، وآخر نسخة وتاريخها، والرخصة، والأسباب. القواعد: مش موجودة أو deprecated أو من غير رخصة أو نسختها [[*]] = HIGH، وقديمة أكتر من سنتين أو فيها install scripts أو رخصة مش في القايمة أو أكبر من 5 MB أو متثبتة على نسخة أقدم من الأخيرة أو من مصدر برّه الـ registry = WARN. [[--json]] للـ CI، و exit code 1 لو فيه HIGH و 2 لو الملف مش موجود. والـ [[fetch]] بيتبعت من برّه عشان كل الاختبارات تشتغل من غير شبكة. من وحدة «المكتبات والفريموركات» كلها، و «try و catch و finally»، و «Promise.all و allSettled».`, done: R`على [[package.json]] تجربة فيه ٩ dependencies، الأداة بتطلّع ٣ HIGH (left-pad و dayjss و react-dom بـ [[*]]) و ٤ WARN و ٢ OK و exit code 1، و [[node --test]] بيعدّي ٩ اختبارات من غير إنترنت، وملف مش موجود بيطلّع [[ENOENT]] و exit code 2.`, ext: R`كاش للردود في ملف ليوم واحد، وقراية [[package-lock.json]] عشان تفحص النسخة المتسطبة فعلًا مش الأخيرة، وربطه بـ [[npm audit --json]]، وقايمة رخص مسموحة من ملف config، وتشغيله في GitHub Actions على كل PR بيغيّر [[package.json]].`, sol: R`## الناتج النهائي

~~~text node bin/deps-report.js ../clinic-booking/package.json (يوم 21 نوفمبر 2026)
OK    dayjs      1.11.23   2026-08-17 MIT
WARN  chart.js   4.6.1     2026-10-22 MIT          حجمها 5.9 MB
OK    moment     2.31.0    2026-09-15 MIT
HIGH  left-pad   1.3.0     2018-04-09 WTFPL        deprecated: use String.prototype.padStart()؛ رخصة WTFPL محتاجة مراجعة؛ آخر نسخة من 3148 يوم
WARN  lodash     4.18.1    2026-04-01 MIT          متثبتة على 4.17.20 والأحدث 4.18.1: شغّل npm audit
HIGH  dayjss     -         -          -            مش موجودة في الـ registry (اسم غلط؟)
WARN  arqamy     -         -          -            مصدر مش من الـ registry: file:../arqamy/arqamy-1.1.1.tgz
WARN  esbuild    0.28.2    2026-08-08 MIT          install scripts: postinstall
HIGH  react-dom  19.3.1    2026-10-14 MIT          النسخة «*» مش متثبتة؛ حجمها 7.7 MB

9 dependency: 3 HIGH، 4 WARN، 2 OK
exit=1
~~~

~~~text node --test (من غير إنترنت)
✔ getPackageInfo: بيقرا آخر نسخة وتاريخها والـ install scripts
✔ getPackageInfo: الشبكة واقعة بترجع error مش exception
✔ main: exit 1 لو فيه HIGH، والتقرير فيه كل dependency
✔ main: كله سليم يبقى exit 0، و --json بيطلع JSON
✔ main: ملف مش موجود يبقى exit 2
✔ package سليمة: ok من غير أسباب
✔ مش موجودة أو deprecated أو من غير رخصة: high
✔ قديمة أو فيها scripts أو رخصة غريبة أو متثبتة على قديم: warn
✔ warn بعدها high: المستوى بيفضل high
ℹ tests 9
ℹ pass 9
ℹ fail 0
~~~

## هتشوف إيه

جدول سطر لكل dependency، الخطير فوق عينك بكلمة HIGH، وكل سبب مكتوب. وفي الآخر العدد. والـ exit code بيخلي CI يوقف لو فيه HIGH.

## الصورة الكبيرة

~~~text شجرة الملفات
deps-report/
  package.json
  bin/deps-report.js      المدخل: بياخد الـ args ويرجّع الـ exit code
  src/main.js             بيقرا package.json، وبيلف بـ 4 في المرة، وبيجمّع
  src/registry.js         بيسأل الـ registry (الـ fetch جاي من برّه)
  src/rules.js            القواعد: info → { level, flags }، من غير I/O
  src/report.js           بيرسم الجدول نص
  fixtures/fake-fetch.js  fetch مزيف للاختبارات
  test/rules.test.js
  test/main.test.js
~~~

| القرار | البديل | ليه ده |
|---|---|---|
| [[fetch]] اللي جوه Node | axios أو got | Node 18+ فيه [[fetch]]، ومفيش ولا dependency (أداة بتفحص الـ dependencies من غير dependencies) |
| [[node:test]] | Vitest أو Jest | جاهز في Node، والأداة صغيرة |
| الـ fetch باراميتر | mock للـ global أو nock | أبسط حاجة: الاختبار بيبعت دالة مزيفة، ومفيش حاجة global بتتغير |
| packument كامل | [[/latest]] بس | محتاجين [[time[latest]]]، و [[/latest]] مفيهوش تواريخ |
| ٤ في المرة | الكل مع بعض أو واحد واحد | الكل = مئات طلبات في نفس اللحظة على مشروع كبير، وواحد واحد أبطأ |

## الكود

~~~json package.json
{
  "name": "deps-report",
  "version": "1.0.0",
  "description": "تقرير عن كل dependency في package.json: آخر نسخة، والرخصة، والحجم، والمخاطر",
  "type": "module",
  "bin": { "deps-report": "./bin/deps-report.js" },
  "scripts": { "test": "node --test" },
  "engines": { "node": ">=20" },
  "license": "MIT",
  "private": true
}
~~~

~~~js bin/deps-report.js
#!/usr/bin/env node
import { main } from "../src/main.js";
process.exitCode = await main(process.argv.slice(2));
~~~

~~~js src/registry.js
// بيجيب بيانات package من الـ npm registry. الـ fetch بيتبعت من برّه عشان الاختبارات
const REGISTRY = "https://registry.npmjs.org";

export async function getPackageInfo(name, { fetch = globalThis.fetch, timeoutMs = 10000 } = {}) {
  const url = $__bt$__{REGISTRY}/$__{name.replace("/", "%2F")}$__bt;
  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  } catch (error) {
    return { name, error: $__btمقدرتش أوصل للـ registry ($__{error.name})$__bt };
  }
  if (res.status === 404) return { name, missing: true };
  if (!res.ok) return { name, error: $__btHTTP $__{res.status}$__bt };
  const doc = await res.json();
  const latest = doc["dist-tags"]?.latest;
  const manifest = doc.versions?.[latest] ?? {};
  const scripts = manifest.scripts ?? {};
  return {
    name,
    latest,
    published: doc.time?.[latest] ?? null,
    license: typeof manifest.license === "string" ? manifest.license : null,
    deprecated: manifest.deprecated ?? null,
    unpackedSize: manifest.dist?.unpackedSize ?? null,
    installScripts: ["preinstall", "install", "postinstall"].filter((s) => s in scripts),
  };
}
~~~

~~~js src/rules.js
// القواعد: كل dependency بتاخد مستوى (ok أو warn أو high) وأسباب
const DAY = 86400000;
export const ALLOWED = ["MIT", "ISC", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "0BSD"];
const BIG = 5 * 1024 * 1024;

export function assess(spec, info, now = new Date()) {
  const flags = [];
  let level = "ok";
  const raise = (to, text) => {
    flags.push(text);
    if (to === "high" || level === "ok") level = to;
  };
  if (spec === "*" || spec === "latest" || spec === "") raise("high", $__btالنسخة «$__{spec || "فاضية"}» مش متثبتة$__bt);
  if (info.error) {
    raise("warn", info.error);
    return { level, flags };
  }
  if (info.missing) {
    raise("high", "مش موجودة في الـ registry (اسم غلط؟)");
    return { level, flags };
  }
  if (/^\d+\.\d+\.\d+$/.test(spec) && info.latest && spec !== info.latest) {
    raise("warn", $__btمتثبتة على $__{spec} والأحدث $__{info.latest}: شغّل npm audit$__bt);
  }
  if (info.deprecated) raise("high", $__btdeprecated: $__{info.deprecated}$__bt);
  if (!info.license) raise("high", "مفيش رخصة");
  else if (!ALLOWED.includes(info.license)) raise("warn", $__btرخصة $__{info.license} محتاجة مراجعة$__bt);
  if (info.published) {
    const days = Math.floor((now - new Date(info.published)) / DAY);
    if (days > 730) raise("warn", $__btآخر نسخة من $__{days} يوم$__bt);
  }
  if (info.installScripts.length) raise("warn", $__btinstall scripts: $__{info.installScripts.join(", ")}$__bt);
  if (info.unpackedSize > BIG) raise("warn", $__btحجمها $__{(info.unpackedSize / 1048576).toFixed(1)} MB$__bt);
  return { level, flags };
}
~~~

~~~js src/report.js
// بيرسم النتايج جدول نص
const MARK = { ok: "OK  ", warn: "WARN", high: "HIGH" };

export function formatTable(rows) {
  const width = Math.max(4, ...rows.map((r) => r.name.length));
  const lines = rows.map((r) => {
    const version = (r.info.latest ?? "-").padEnd(9);
    const date = (r.info.published ?? "-").slice(0, 10).padEnd(10);
    const license = (r.info.license ?? "-").padEnd(12);
    return $__bt$__{MARK[r.result.level]}  $__{r.name.padEnd(width)}  $__{version} $__{date} $__{license} $__{r.result.flags.join("؛ ")}$__bt;
  });
  const count = (lvl) => rows.filter((r) => r.result.level === lvl).length;
  lines.push("", $__bt$__{rows.length} dependency: $__{count("high")} HIGH، $__{count("warn")} WARN، $__{count("ok")} OK$__bt);
  return lines.join("\n");
}
~~~

~~~js src/main.js
// بيقرا package.json، ويسأل الـ registry عن كل dependency (٤ في المرة)، ويرجّع التقرير
import { readFile } from "node:fs/promises";
import { getPackageInfo } from "./registry.js";
import { assess } from "./rules.js";
import { formatTable } from "./report.js";

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export async function main(args, { fetch = globalThis.fetch, now = new Date(), log = console.log } = {}) {
  const json = args.includes("--json");
  const file = args.find((a) => !a.startsWith("--")) ?? "package.json";
  let pkg;
  try {
    pkg = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    log($__btمقدرتش أقرا $__{file}: $__{error.code ?? error.message}$__bt);
    return 2;
  }
  const deps = Object.entries({ ...pkg.dependencies, ...pkg.devDependencies });
  if (deps.length === 0) {
    log("مفيش dependencies");
    return 0;
  }
  const rows = await mapLimit(deps, 4, async ([name, spec]) => {
    if (/^(file:|git|https?:|workspace:)/.test(spec)) {
      return { name, info: {}, result: { level: "warn", flags: [$__btمصدر مش من الـ registry: $__{spec}$__bt] } };
    }
    const info = await getPackageInfo(name, { fetch });
    return { name, info, result: assess(spec, info, now) };
  });
  log(json ? JSON.stringify(rows, null, 2) : formatTable(rows));
  return rows.some((r) => r.result.level === "high") ? 1 : 0;
}
~~~

~~~js fixtures/fake-fetch.js
// fetch مزيف: بيرجّع ردود متجهزة من غير شبكة، وبيسجّل الـ URLs اللي اتطلبت
export function fakeFetch(table) {
  const calls = [];
  async function fetch(url) {
    calls.push(url);
    const name = decodeURIComponent(url.split("/").pop());
    const entry = table[name];
    if (entry instanceof Error) throw entry;
    if (!entry) return { ok: false, status: 404, json: async () => ({}) };
    return { ok: true, status: 200, json: async () => entry };
  }
  fetch.calls = calls;
  return fetch;
}

export function doc({ version = "1.0.0", published = "2026-10-01T00:00:00Z", license = "MIT", deprecated, scripts, unpackedSize = 1000 } = {}) {
  return {
    "dist-tags": { latest: version },
    time: { [version]: published },
    versions: { [version]: { license, deprecated, scripts, dist: { unpackedSize } } },
  };
}
~~~

~~~js test/rules.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { assess } from "../src/rules.js";

const NOW = new Date("2026-11-21T00:00:00Z");
const base = { latest: "2.0.0", published: "2026-10-01T00:00:00Z", license: "MIT", deprecated: null, unpackedSize: 1000, installScripts: [] };

test("package سليمة: ok من غير أسباب", () => {
  assert.deepEqual(assess("^2.0.0", base, NOW), { level: "ok", flags: [] });
});

test("مش موجودة أو deprecated أو من غير رخصة: high", () => {
  assert.equal(assess("^1.0.0", { missing: true }, NOW).level, "high");
  assert.equal(assess("^2.0.0", { ...base, deprecated: "استخدم غيرها" }, NOW).level, "high");
  assert.equal(assess("^2.0.0", { ...base, license: null }, NOW).level, "high");
  assert.equal(assess("*", base, NOW).level, "high");
});

test("قديمة أو فيها scripts أو رخصة غريبة أو متثبتة على قديم: warn", () => {
  const old = assess("^2.0.0", { ...base, published: "2023-01-01T00:00:00Z" }, NOW);
  assert.equal(old.level, "warn");
  assert.match(old.flags[0], /1420 يوم/);
  assert.equal(assess("^2.0.0", { ...base, installScripts: ["postinstall"] }, NOW).level, "warn");
  assert.equal(assess("^2.0.0", { ...base, license: "GPL-3.0" }, NOW).level, "warn");
  assert.equal(assess("1.9.0", base, NOW).level, "warn");
});

test("warn بعدها high: المستوى بيفضل high", () => {
  const r = assess("*", { ...base, license: "GPL-3.0", deprecated: "x" }, NOW);
  assert.equal(r.level, "high");
  assert.equal(r.flags.length, 3);
});
~~~

~~~js test/main.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { main } from "../src/main.js";
import { getPackageInfo } from "../src/registry.js";
import { fakeFetch, doc } from "../fixtures/fake-fetch.js";

const NOW = new Date("2026-11-21T00:00:00Z");

async function withPackage(pkg, fn) {
  const dir = await mkdtemp(join(tmpdir(), "deps-report-"));
  try {
    const file = join(dir, "package.json");
    await writeFile(file, JSON.stringify(pkg));
    return await fn(file);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test("getPackageInfo: بيقرا آخر نسخة وتاريخها والـ install scripts", async () => {
  const fetch = fakeFetch({ "@scope/ui": doc({ version: "3.1.0", scripts: { postinstall: "node x.js", test: "t" } }) });
  const info = await getPackageInfo("@scope/ui", { fetch });
  assert.equal(fetch.calls[0], "https://registry.npmjs.org/@scope%2Fui");
  assert.equal(info.latest, "3.1.0");
  assert.deepEqual(info.installScripts, ["postinstall"]);
});

test("getPackageInfo: الشبكة واقعة بترجع error مش exception", async () => {
  const fetch = fakeFetch({ dayjs: new TypeError("fetch failed") });
  const info = await getPackageInfo("dayjs", { fetch });
  assert.match(info.error, /TypeError/);
});

test("main: exit 1 لو فيه HIGH، والتقرير فيه كل dependency", async () => {
  const lines = [];
  const fetch = fakeFetch({ good: doc(), old: doc({ deprecated: "خلاص" }) });
  const pkg = { dependencies: { good: "^1.0.0", old: "^1.0.0", typo: "^1.0.0" }, devDependencies: { local: "file:../x.tgz" } };
  const code = await withPackage(pkg, (file) => main([file], { fetch, now: NOW, log: (l) => lines.push(l) }));
  assert.equal(code, 1);
  const out = lines.join("\n");
  assert.match(out, /OK {4}good/);
  assert.match(out, /HIGH {2}old/);
  assert.match(out, /HIGH {2}typo .*مش موجودة/);
  assert.match(out, /WARN {2}local .*file:/);
  assert.equal(fetch.calls.length, 3);
});

test("main: كله سليم يبقى exit 0، و --json بيطلع JSON", async () => {
  const lines = [];
  const fetch = fakeFetch({ good: doc() });
  const code = await withPackage({ dependencies: { good: "^1.0.0" } }, (file) => main([file, "--json"], { fetch, now: NOW, log: (l) => lines.push(l) }));
  assert.equal(code, 0);
  assert.equal(JSON.parse(lines[0])[0].result.level, "ok");
});

test("main: ملف مش موجود يبقى exit 2", async () => {
  const lines = [];
  const code = await main(["nope/package.json"], { fetch: fakeFetch({}), log: (l) => lines.push(l) });
  assert.equal(code, 2);
  assert.match(lines[0], /ENOENT/);
});
~~~

~~~json clinic-booking/package.json (مشروع التجربة)
{
  "name": "clinic-booking",
  "version": "0.3.0",
  "private": true,
  "dependencies": {
    "dayjs": "^1.11.23",
    "chart.js": "^4.6.1",
    "moment": "^2.30.1",
    "left-pad": "1.3.0",
    "lodash": "4.17.20",
    "dayjss": "^1.0.0",
    "arqamy": "file:../arqamy/arqamy-1.1.1.tgz"
  },
  "devDependencies": {
    "esbuild": "^0.28.2",
    "react-dom": "*"
  }
}
~~~

## ترتيب البناء

1. **[[rules.js]] واختباراته الأول:** القواعد دالة نقية ([[assess(spec, info, now)]])، فبتتختبر من غير شبكة ولا ملفات. و [[now]] باراميتر عشان «من كام يوم» يتكرر في الاختبار.
2. **[[registry.js]] و [[fake-fetch.js]]:** الدالة بتاخد [[{ fetch }]] وقيمتها الافتراضية [[globalThis.fetch]]. الاختبار بيبعت fetch مزيف بيرجّع ردود جاهزة وبيسجّل الـ URLs ([[fetch.calls]]).
3. **[[report.js]]:** نص بس، من غير ألوان (عشان يتقري في CI ويتعمله [[grep]]).
4. **[[main.js]]:** بيربطهم. [[log]] كمان باراميتر، فالاختبار بيجمع السطور في array.
5. **[[bin/deps-report.js]]:** ٣ سطور. [[process.exitCode = ...]] بدل [[process.exit()]] عشان أي output لسه بيتكتب يخلص.

## الحتت المهمة

- **[[mapLimit(items, 4, fn)]]:** ٤ «عمال» كل واحد بياخد العنصر الجاي ([[next++]]) لحد ما يخلصوا، والنتايج في نفس ترتيب الـ input. قسناها على الـ ٩ packages: ٤ في المرة 1976–2756 ms، وواحد واحد 3395–3540 ms.
- **[[AbortSignal.timeout(10000)]]:** لو الـ registry معلّق، الطلب بيتلغي بعد ١٠ ثواني بدل ما الأداة تستنى للأبد.
- **الأخطاء بترجع بيانات مش exceptions:** [[{ name, error }]] و [[{ name, missing: true }]]. package واحدة الشبكة وقعت عندها متوقّفش التقرير كله.
- **[[raise(to, text)]]:** بيزوّد السبب وبيرفع المستوى بس (ok ← warn ← high)، فـ warn بعد high مبتنزّلوش (اختبار «warn بعدها high»).
- **مصادر برّه الـ registry** ([[file:]] و [[git]] و [[https:]] و [[workspace:]]): مبنسألش عنها الـ registry (هيرجّع 404 غلط)، وبنعلّمها WARN عشان حد يراجعها.
- **[[mkdtemp]] في الاختبار:** كل اختبار بيكتب [[package.json]] في فولدر مؤقت جديد ويمسحه في [[finally]]، فالاختبارات مبتأثرش على بعض ولا على المشروع.

## الغلطات اللي حصلت وانت بتبنيها

- **[[node --test]] شغّل ملف الـ fake كأنه اختبار:** كان في [[test/fake.js]]، و [[node --test]] بيشغّل **أي** ملف جوه فولدر [[test]]، فطلع سطر [[✔ test\fake.js]] زيادة. نقلناه لـ [[fixtures/fake-fetch.js]].
- **lodash 4.17.20 طلعت OK:** القواعد كانت بتبص على آخر نسخة بس (4.18.1، سليمة). بس المشروع متثبت على 4.17.20 اللي فيها ثغرات (درس «تختار dependency»). زوّدنا قاعدة: نسخة متثبتة بالظبط وأقدم من الأخيرة = WARN «شغّل npm audit». ولسه الأداة مبتعرفش الثغرات نفسها: ده شغل [[npm audit]] (في الـ ext).
- **الـ regex اتكتب من غير backslashes:** عدّلنا [[rules.js]] بسكربت، والـ [[\d]] بقت [[d]]، فاختبار «متثبتة على قديم» وقع. الاختبار مسكها قبل ما نجرّب على مشروع حقيقي.
- **moment طلعت OK:** آخر نسخة من شهرين. بس المشروع نفسه في maintenance mode. القواعد بالأرقام مبتعرفش ده، فالتقرير **بداية** المراجعة مش نهايتها.

## اتقاس

- ٩ اختبارات بتعدّي من غير إنترنت في حوالي ١٣٠ ms.
- التشغيل الحقيقي على ٩ packages: من ٢ لـ ٣ ثواني (أغلبها تنزيل الـ packuments: react-dom وحدها ملف كبير).` },
        { lvl: 'فكرة', t: R`قرار مكتوب: framework ولا لأ لمشروع حقيقي`, what: R`اختار مشروع حقيقي عايز تعمله (أو المثال: widget حجز مواعيد هيتحط في موقع عيادة متألّف اسمه «عيادة نور»، الموقع معمول بـ WordPress)، واكتب Architecture Decision Record (ADR): السياق، والاختيارات (vanilla و Web Component و Preact و React)، والأرقام اللي قستها بنفسك (حجم bundle، وعدد الشاشات، ومين هيصونه)، والقرار، والتمن اللي هتدفعه، وإمتى ترجع فيه. من وحدة «المكتبات والفريموركات» كلها.`, done: R`ملف [[docs/adr/0001-ui-approach.md]] فيه الأقسام كلها، وكل اختيار جنبه رقم اتقاس (مش «أخف» و «أحسن»)، وقسم «نرجع في القرار لو».`, ext: R`اعمل الـ widget بالاختيار اللي اخترته، وقيس الـ bundle الحقيقي وقارنه بتقديرك، وحدّث الـ ADR بالفرق. وبعد ٣ شهور اقراه تاني: القرار لسه صح؟`, sol: R`## الشكل النهائي: ADR نموذجي

~~~text docs/adr/0001-ui-approach.md
# 0001: widget الحجز بـ Web Component من غير framework

الحالة: متوافق عليه (21 نوفمبر 2026)

## السياق
- widget حجز مواعيد هيتحط في موقع «عيادة نور» (WordPress، فيه jQuery من الثيم).
- شاشتين: اختيار اليوم والساعة، وبعدين الاسم والموبايل والتأكيد.
- الحالة: يوم وساعة مختارين، ومواعيد فاضية جاية من API، وحالة إرسال.
- هيصونه مطور واحد بيعرف JavaScript، مش بيعرف React.
- أغلب الزوار موبايل جايين من إعلانات، فأول تحميل مهم.

## الاختيارات (اتقاست بـ esbuild 0.28.2، production، gzip، لنفس العدّاد البسيط)
| الاختيار | أقل حجم | ملاحظات |
|---|---|---|
| vanilla داخل custom element | 271 بايت + كودنا | Shadow DOM بيعزله عن CSS الثيم و jQuery |
| lit-html | 3.4 KB | templates بتحدّث اللي اتغير بس |
| Preact | 5.7 KB | components و hooks، بس محتاج build |
| React 19 | 67.6 KB | الفريق مش بيعرفه، و framework جوه صفحة مش بتاعتنا |

## القرار
custom element (<clinic-booking>) بـ vanilla JS، وحالة في object واحد و render() زي درس «ليه frameworks».

## ليه
- شاشتين وحالة صغيرة: مفيش حاجة الفريمورك هيوفّرها تستاهل 5–67 KB على موبايل جاي من إعلان.
- هيتحط في صفحة فيها jQuery وثيم مش بتاعنا: custom element + Shadow DOM شغال في أي صفحة ومعزول.
- المطور اللي هيصونه بيعرف JavaScript: مفيش وقت تعلم.

## التمن اللي هندفعه
- إعادة الرسم و الـ focus بإيدنا (درس «library ولا framework»): render بيحافظ على الـ focus، واختبار بالكيبورد قبل كل نشر.
- مفيش devtools للحالة: console.table(state) وقت التطوير.
- الـ escaping بإيدنا: textContent لأي حاجة جاية من الـ API.

## نرجع في القرار لو
- الشاشات بقت أكتر من 4، أو بقى فيه حساب مستخدم وتاريخ حجوزات.
- فريق من 3 أو أكتر، أو حد بيعرف framework معين انضم.
- الـ widget بقى تطبيق لوحده مش جوه موقع حد.
~~~

## ليه الشكل ده

- **الأرقام من القياس، مش من الذاكرة:** نفس جدول درس «إمتى framework غلط»، ومكتوب الأداة والنسخة والتاريخ. لو حد قاس تاني ولقى رقم مختلف، يعرف ليه.
- **«التمن» و «نرجع لو» أهم من «القرار»:** أي قرار تقني ليه تمن. لو مكتبتهوش، أول باج focus هيبان «غلطة» بدل «تمن متوقع عارفين حله». و «نرجع لو» بيخلي القرار يتراجع لما الظروف تتغير بدل ما يفضل «احنا كده».
- **مرقّم ومتأرّخ في [[docs/adr/]]:** القرار التاني [[0002]]، ولو اتلغى قرار بتكتب واحد جديد بيقول «بيلغي 0001» من غير ما تمسح القديم، فالتاريخ بيفضل.
- **الغلطة الشائعة:** ADR فيه «اخترنا React لأنه الأشهر والأفضل». مفيش سياق، ولا أرقام، ولا تمن، ولا شرط رجوع: يعني مش قرار، رأي.

الشكل مأخوذ من قالب ADR المشهور (Michael Nygard) اللي موصوف في [[adr.github.io]].` },
      ],
    }
]);

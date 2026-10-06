// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "التواريخ والوقت",
      l: 2,
      n: "Date ومطبّاته، وتخزّن UTC وتعرض بتوقيت اليوزر بـ Intl، و «من ٥ دقايق»، و date-fns ولا Temporal في 2026",
      items: [
        {
          cmd: "Date ومطبّاته",
          title: "ليه الشهر في Date بيبدأ من 0، وليه new Date(string) خطر؟",
          desc: R`[[Date]] في JavaScript قيمة واحدة من جوه: عدد الـ milliseconds من [[1970-01-01T00:00:00Z]] (الـ epoch)، ومفيش time zone متخزّن جواه. الـ time zone بيظهر بس لما تقرا ([[getHours]]) أو تطبع: الـ methods العادية بتستخدم توقيت الجهاز، واللي فيها [[UTC]] ([[getUTCHours]]) بتستخدم UTC.

والمطبّات المشهورة: الشهر من 0 ([[new Date(2026, 0, 31)]] يعني ٣١ يناير)، واليوم من 1. و Date بيتعدّل في مكانه ([[setMonth]] بتغيّر نفس الـ object). و الـ overflow: ٣١ يناير + شهر = ٣ مارس مش ٢٨ فبراير. و الـ parsing: [["2026-03-01"]] لوحدها بتتفهم UTC، بس [["2026-03-01T00:00"]] من غير Z بتتفهم بتوقيت الجهاز، وأي شكل تاني ([["01/02/2026"]]) مش standard وكل engine بيفهمه بمزاجه.`,
          example: R`const d = new Date(2026, 0, 31);
console.log(d.getMonth(), d.getDate());
d.setMonth(1);
console.log(d.toDateString());
console.log(new Date("2026-03-01").toISOString());
console.log(new Date("2026-03-01T00:00").toISOString());
console.log(new Date("01/02/2026").getMonth());
console.log(new Date("32/01/2026").getTime());
const a = new Date("2026-09-29T10:00:00Z");
const b = new Date(a);
b.setDate(b.getDate() + 3);
console.log(a.getDate(), b.getDate(), b - a);`,
          try: R`شغّل الملف مرتين: [[TZ=Africa/Cairo node dates.js]] و [[TZ=America/New_York node dates.js]] (على Windows في PowerShell: [[$env:TZ = "America/New_York"; node dates.js]]، أو WSL. Git Bash مش بيعدّي [[TZ]] لـ node). أنهي سطور اتغيرت وليه؟ وبعدين اكتب [[addMonths(date, n)]] ترجّع Date جديد ولو اليوم مش موجود في الشهر الجديد تقف على آخر يوم ([[2026-01-31]] + 1 ← [[2026-02-28]]). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[addMonths]].`,
          flag: "script",
          deep: {
            why: "كل مشروع فيه تواريخ: created_at، وطلبات النهارده، ومواعيد الحجز، وانتهاء الاشتراك. وأخطاء التواريخ خبيثة: الكود بيشتغل تمام على جهازك وعلى السيرفر بيطلع يوم قبله، أو بيبوظ مرتين في السنة بس (التوقيت الصيفي).",
            how: R`[[new Date(y, m, d)]] بيفهم الأرقام بتوقيت الجهاز، والشهر من 0 (ورث ده من Java سنة 1995). ولو الرقم برّه الحدود بيرحّله: [[new Date(2026, 1, 31)]] (٣١ فبراير) بتبقى ٣ مارس. ده اللي حصل مع [[setMonth(1)]] على ٣١ يناير.

الـ parsing حسب المواصفات: [["YYYY-MM-DD"]] لوحدها UTC، وتاريخ + وقت من غير offset محلي، وبـ [[Z]] أو [[+03:00]] محدد. عشان كده السطر الخامس نفس الناتج في أي بلد، والسادس بيتغير: في القاهرة [[2026-02-28T22:00:00.000Z]] (القاهرة UTC+2 في مارس)، وفي نيويورك [[2026-03-01T05:00:00.000Z]]. و [["01/02/2026"]] V8 فهمها أمريكي (MM/DD) فالشهر 0، ومتصفح أو مكتبة تانية ممكن تفهمها ١ فبراير. و [["32/01/2026"]] بتدّي Invalid Date و [[getTime()]] بـ NaN، ومفيش error: لازم تفحص [[Number.isNaN(d.getTime())]] بنفسك.

الطرح [[b - a]] بيحوّلهم milliseconds، فالفرق [[259200000]] (٣ أيام). و [[new Date(a)]] بتعمل نسخة، ومن غيرها [[b = a]] هيبقى نفس الـ object.`,
            when: R`Date لسه موجود في كل API وكل مكتبة، فلازم تعرفه. استخدمه للـ timestamps ([[Date.now()]] و [[toISOString()]])، وللحسابات والعرض استخدم Intl ومكتبة أو Temporal (الدروس الجاية).`,
            mistakes: R`[[new Date(2026, 9, 1)]] وانت فاكرها سبتمبر (دي أكتوبر). وتعمل parse لتاريخ من اليوزر بشكل [["DD/MM/YYYY"]]. وتعدّل Date جاي من برّه ([[setDate]]) فتبوّظه عند الـ caller. وتحسب الأيام بـ [[/ 86400000]] وتنسى إن يوم التوقيت الصيفي ٢٣ أو ٢٥ ساعة. وفي الانترفيو: «ليه [[new Date("2026-03-01")]] ممكن تطبع ٢٨ فبراير؟» الإجابة: اتفهمت UTC منتصف الليل، ولما اتعرضت بتوقيت أمريكا بقت اليوم اللي قبله.`
          },
          teach: R`## الأول: Date من جوه رقم واحد

المثال ١٢ سطر، وكل سطر بيوريك مطبّ من مطبّات [[Date]]. قبل ما نفكّه، لازم تعرف حاجة واحدة: الـ Date مش «تاريخ» متخزّن كيوم وشهر وسنة. هو **رقم واحد**: عدد الـ milliseconds (جزء من ألف من الثانية، اختصارها ms) من لحظة اسمها الـ **epoch**: أول يناير 1970 الساعة 12 بالليل بتوقيت UTC.

~~~text app.js
console.log(new Date(0).toISOString(), typeof Date.now());
~~~

~~~text الناتج (Node 24 على Windows)
1970-01-01T00:00:00.000Z number
~~~

[[new Date(0)]] يعني «صفر ms من الـ epoch»، فطلعت اللحظة نفسها. و [[Date.now()]] بيرجّع اللحظة الحالية كرقم ([[number]]). والـ [[Z]] في الآخر معناها UTC (اختصار Zulu، اسم UTC في الطيران).

والـ time zone؟ **مش متخزّن جوه الـ Date خالص.** هو بيظهر بس لما تسأل «الساعة كام؟» أو «النهارده كام؟»، ساعتها الـ methods العادية بتحسب بتوقيت الجهاز اللي الكود شغال عليه. كل الشرح تحت مبني على الجملة دي.

> الناتج كله تحت اتشغّل بـ Node 24 على Windows والجهاز مضبوط على توقيت القاهرة، إلا لو مكتوب غير كده.

---

## ١. [[new Date(2026, 0, 31)]]: الشهر بيبدأ من 0

~~~text app.js
const d = new Date(2026, 0, 31);
console.log(d.getMonth(), d.getDate());
~~~

- [[const d]]: متغير اسمه d مش هيتغير يشاور على حاجة تانية (بس الـ object نفسه ممكن يتعدّل، وده هيفرق في الخطوة الجاية).
- [[new Date(...)]]: [[new]] بتعمل object جديد من النوع Date.
- الأرقام التلاتة: السنة، و **رقم الشهر من 0** (يناير 0، فبراير 1، ... ديسمبر 11)، واليوم من 1 عادي.
- [[getMonth()]]: بيرجّع رقم الشهر (من 0 برضه)، و [[getDate()]]: رقم اليوم في الشهر. (لاحظ: [[getDay()]] حاجة تانية خالص، يوم الأسبوع من 0 للحد.)

~~~text الناتج
0 31
~~~

يعني ٣١ يناير. والأرقام دي متفسّرة **بتوقيت الجهاز**: نص ليل ٣١ يناير في القاهرة. شوف الرقم الحقيقي اللي جوه:

~~~text app.js
console.log(d.getTime(), d.toISOString());
~~~

~~~text الناتج
1769810400000 2026-01-30T22:00:00.000Z
~~~

[[getTime()]] بيطلّع الرقم الخام، و [[toISOString()]] بيكتبه بتوقيت UTC: الساعة ١٠ بالليل يوم ٣٠. ليه؟ لأن القاهرة في يناير UTC+2، فنص الليل عندنا هو ١٠ بالليل في UTC. نفس اللحظة، مكتوبة بتوقيتين.

---

## ٢. [[setMonth(1)]]: التعديل في نفس الـ object، والـ overflow

~~~text app.js
d.setMonth(1);
console.log(d.toDateString());
~~~

[[setMonth(1)]] معناها «خلي الشهر فبراير» (1 = فبراير). حاجتين بيحصلوا:

1. **التعديل في مكانه (mutable):** مفيش Date جديد، الـ object اللي في [[d]] نفسه اتغيّر. عشان كده [[const]] مامنعتش ده: const بتمنع إنك تكتب [[d = ...]]، مش إنك تعدّل جوه الـ object.
2. **الـ overflow:** اليوم لسه 31، فالتاريخ بقى «٣١ فبراير 2026». ده مش موجود (فبراير 2026 فيه 28 يوم بس، مش سنة كبيسة)، فـ Date مش بيرمي error، بيرحّل الزيادة: 31 − 28 = 3 أيام زيادة، يعني ٣ مارس.

و [[toDateString()]] بيكتب التاريخ بشكل إنجليزي مختصر من غير الساعة:

~~~text الناتج
Tue Mar 03 2026
~~~

| الحتة | معناها |
|---|---|
| [[Tue]] | يوم الأسبوع (Tuesday، التلات) |
| [[Mar]] | الشهر (March، مارس) |
| [[03]] | اليوم |
| [[2026]] | السنة |

نفس الترحيل بيحصل لو كتبتها مباشرة: [[new Date(2026, 1, 31).toDateString()]] بيطلع [[Tue Mar 03 2026]] برضه.

---

## ٣. الـ parsing: النص اللي بتديه لـ Date بيتفهم إزاي؟

ده أخطر جزء. [[new Date("...")]] بنص بيعمل parse (يقرا النص ويحوّله لحظة)، والقاعدة في المواصفات:

| شكل النص | بيتفهم بتوقيت إيه |
|---|---|
| [["2026-03-01"]] (تاريخ بس) | UTC |
| [["2026-03-01T00:00"]] (تاريخ + وقت من غير Z) | توقيت الجهاز |
| [["2026-03-01T00:00Z"]] أو [[+02:00]] في الآخر | المكتوب بالظبط |
| أي شكل تاني ([["01/02/2026"]]) | مش standard، كل engine على مزاجه |

### السطر الخامس: تاريخ بس

~~~text app.js
console.log(new Date("2026-03-01").toISOString());
~~~

~~~text الناتج
2026-03-01T00:00:00.000Z
~~~

اتفهمت نص الليل UTC، و [[toISOString()]] بيكتب بـ UTC، فطلعت زي ما هي في أي بلد.

### السطر السادس: تاريخ ووقت من غير Z

~~~text app.js
console.log(new Date("2026-03-01T00:00").toISOString());
~~~

هنا اتفهمت «نص الليل بتوقيت الجهاز». جرّبنا نفس الملف على توقيتين:

~~~text الناتج (القاهرة)
2026-02-28T22:00:00.000Z
~~~

~~~text الناتج (نيويورك)
2026-03-01T05:00:00.000Z
~~~

القاهرة في مارس UTC+2، فنص الليل عندها هو ١٠ بالليل يوم ٢٨ فبراير في UTC. ونيويورك في أول مارس 2026 لسه UTC−5 (التوقيت الصيفي عندهم بيبدأ ٨ مارس)، فنص الليل عندها هو ٥ الصبح UTC. نفس السطر، نفس الكود، لحظتين مختلفتين.

### السطرين السابع والتامن: أشكال مش standard

~~~text app.js
console.log(new Date("01/02/2026").getMonth());
console.log(new Date("32/01/2026").getTime());
~~~

~~~text الناتج
0
NaN
~~~

- [["01/02/2026"]]: V8 (الـ engine بتاع Node و Chrome) قراها بالطريقة الأمريكية MM/DD، فالشهر يناير (0). اللي كاتبها مصري كان قاصد ١ فبراير. ومتصفح تاني ممكن يقراها بشكل تالت.
- [["32/01/2026"]]: مفيش شهر 32، فالنتيجة **Invalid Date**. ومفيش error بيترمي، الرقم اللي جوه بقى [[NaN]] (Not a Number) وخلاص:

~~~text app.js
console.log(String(new Date("32/01/2026")), Number.isNaN(new Date("32/01/2026").getTime()));
~~~

~~~text الناتج
Invalid Date true
~~~

فلو بتعمل parse لتاريخ جاي من برّه، افحصه بنفسك بـ [[Number.isNaN(d.getTime())]].

---

## ٤. النسخ والطرح

~~~text app.js
const a = new Date("2026-09-29T10:00:00Z");
const b = new Date(a);
b.setDate(b.getDate() + 3);
console.log(a.getDate(), b.getDate(), b - a);
~~~

- السطر الأول: لحظة محددة بـ [[Z]]، فمش هتختلف من جهاز لجهاز.
- [[new Date(a)]]: Date **جديد** بنفس اللحظة، يعني نسخة. ليه مش [[const b = a]]؟ لأن ده مش نسخ، ده اسم تاني لنفس الـ object. جرّبناها: [[const same = a; same.setDate(1);]] وبعدها [[a.getDate()]] طلع [[1]]، الأصل باظ.
- [[b.getDate() + 3]]: اليوم الحالي (29) + 3 = 32، و [[setDate(32)]] بيرحّل زي ما شفنا: ٢ أكتوبر.
- [[b - a]]: الطرح بيحوّل الاتنين للرقم اللي جوه (ms) ويطرح.

~~~text الناتج
29 2 259200000
~~~

[[a]] لسه ٢٩ (النسخة حمته)، و [[b]] بقت ٢ (أكتوبر). والفرق: 3 أيام × 24 ساعة × 60 دقيقة × 60 ثانية × 1000 = 259,200,000 ms.

---

## تشغّله بتوقيت تاني إزاي؟

Node بيقرا متغير البيئة [[TZ]] (Time Zone) عشان يعرف توقيت الجهاز:

~~~powershell
$env:TZ = "America/New_York"; node dates.js
~~~

ده اتجرّب في PowerShell 7 و Windows PowerShell 5.1 وطلّع سطر نيويورك اللي فوق. والمتغير ده بيفضل في نافذة الترمنال دي بس، وتشيله بـ [[Remove-Item Env:TZ]].

~~~bash
TZ=America/New_York node dates.js
~~~

ده الشكل في لينكس و WSL والماك (اتجرّب على Linux في Docker بصورة [[node:22-slim]]). **على Git Bash في Windows مش بيشتغل:** جرّبناه وفضل يطلّع توقيت القاهرة، لأن Git Bash بيشيل قيمة زي [[America/New_York]] من [[TZ]] قبل ما يشغّل برنامج Windows زي node ([[process.env.TZ]] طلع [[undefined]]، و [[TZ=UTC]] بس هي اللي عدّت).

---

## الخلاصة

| المطبّ | الصح |
|---|---|
| الشهر من 0 | [[new Date(2026, 0, 31)]] = ٣١ يناير |
| [[setMonth]] و [[setDate]] بيعدّلوا الأصل | اعمل نسخة بـ [[new Date(a)]] الأول |
| تاريخ مش موجود بيترحّل من غير error | ٣١ فبراير = ٣ مارس |
| [["YYYY-MM-DD"]] = UTC، ومع وقت من غير Z = توقيت الجهاز | ابعت وخزّن بـ Z دايمًا |
| أي شكل تاني مش standard | متعملش parse لـ [["DD/MM/YYYY"]] بـ Date |
| Invalid Date مش بترمي error | افحص [[Number.isNaN(d.getTime())]] |

والـ Date جواه رقم ms واحد بس، والتوقيت بيدخل في الحساب لحظة ما تقرا أو تطبع.`,
          lines: [
            "٣١ يناير: الشهر 0.",
            R`[[0 31]].`,
            "غيّر الشهر لفبراير في نفس الـ object.",
            R`[[Tue Mar 03 2026]]: فبراير مفيهوش ٣١، فرحّل ٣ أيام.`,
            R`تاريخ بس = UTC دايمًا: [[2026-03-01T00:00:00.000Z]].`,
            "تاريخ ووقت من غير Z = توقيت الجهاز، فالناتج بيختلف من بلد لبلد.",
            R`شكل مش standard: V8 فهمه أمريكي فالشهر 0. متعتمدش عليه.`,
            R`تاريخ مستحيل: Invalid Date، و [[getTime()]] بـ NaN من غير error.`,
            R`لحظة محددة بـ [[Z]].`,
            "نسخة، عشان منعدّلش الأصل.",
            "زوّد ٣ أيام.",
            R`[[29 2 259200000]] (في القاهرة): الأصل متغيرش، والفرق ٣ أيام بالـ ms.`
          ],
          sol: R`بين القاهرة ونيويورك اتغير السطر السادس بس: [[2026-02-28T22:00:00.000Z]] مقابل [[2026-03-01T05:00:00.000Z]]، لأن نص الليل «المحلي» لحظة مختلفة في كل بلد. الباقي ثابت: السطر الخامس UTC بالمواصفات، والأرقام اللي بعده متحسبة من لحظة بـ Z. (لو غيّرت [[a]] لـ [["2026-09-29T02:00:00Z"]] هتلاقي [[a.getDate()]] بقت 28 في نيويورك.)

[[addMonths]]: اعمل نسخة، وخد اليوم الأصلي، وحط اليوم 1 قبل ما تغيّر الشهر (عشان متحصلش الترحيلة)، وبعدين رجّع اليوم بـ [[Math.min]] مع آخر يوم في الشهر الجديد. وآخر يوم في أي شهر حيلة معروفة: اليوم 0 من الشهر اللي بعده. [[addMonths(new Date(2026, 0, 31), 1)]] ← ٢٨ فبراير، و 2028 ← ٢٩ فبراير (كبيسة).`,
          solCode: R`function addMonths(date, n) {
  const d = new Date(date);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}
const jan31 = new Date(2026, 0, 31);
console.log(addMonths(jan31, 1).toDateString(), jan31.toDateString());
console.log(addMonths(new Date(2028, 0, 31), 1).toDateString(), addMonths(jan31, 12).toDateString());`,
          check: {
            lang: "js",
            starter: R`function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}`,
            tests: R`const ymd = d => [d.getFullYear(), d.getMonth() + 1, d.getDate()];
test("31 يناير 2026 + شهر ← 28 فبراير (مش 3 مارس)", () => expect(ymd(addMonths(new Date(2026, 0, 31), 1))).toEqual([2026, 2, 28]));
test("2028 كبيسة ← 29 فبراير", () => expect(ymd(addMonths(new Date(2028, 0, 31), 1))).toEqual([2028, 2, 29]));
test("15 مارس + شهر ← 15 أبريل (اليوم العادي زي ما هو)", () => expect(ymd(addMonths(new Date(2026, 2, 15), 1))).toEqual([2026, 4, 15]));
test("بتعدّي السنة: 30 نوفمبر 2026 + 3 ← 28 فبراير 2027", () => expect(ymd(addMonths(new Date(2026, 10, 30), 3))).toEqual([2027, 2, 28]));
test("n سالب: 31 مارس - 1 ← 28 فبراير", () => expect(ymd(addMonths(new Date(2026, 2, 31), -1))).toEqual([2026, 2, 28]));
test("الأصل ميتغيرش", () => {
  const jan31 = new Date(2026, 0, 31);
  addMonths(jan31, 1);
  expect(ymd(jan31)).toEqual([2026, 1, 31]);
});`,
            solution: R`function addMonths(date, n) {
  const d = new Date(date);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}`
          }
        },
        {
          cmd: "UTC و Intl.DateTimeFormat",
          title: "تخزّن الوقت إزاي، وتعرضه بتوقيت اليوزر ولغته إزاي؟",
          desc: R`القاعدة: خزّن وابعت UTC، واعرض بتوقيت اليوزر. في الداتابيز [[timestamptz]] (تاب SQL و Prisma)، وفي الـ JSON نص ISO بـ Z زي [["2026-09-29T21:30:00.000Z"]] ([[toISOString()]]، و [[JSON.stringify]] بيعملها لوحده). ومتحوّلش لتوقيت محلي غير في آخر لحظة: وانت بترسم على الشاشة.

والعرض بـ [[Intl.DateTimeFormat(locale, options)]]: الـ locale زي [["ar-EG"]] أو [["en-GB"]] بيحدد اللغة والترتيب والأرقام، و [[timeZone]] زي [["Africa/Cairo"]] بيحدد التوقيت، و [[dateStyle]] و [[timeStyle]] ([["full"]] و [["long"]] و [["medium"]] و [["short"]]) بيختاروا الشكل. و [[date.toLocaleString(locale, options)]] نفس الكلام في سطر.`,
          example: R`const createdAt = new Date("2026-09-29T21:30:00Z");
console.log(createdAt.toISOString(), JSON.stringify({ createdAt }));
const cairo = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Cairo" });
console.log(cairo.format(createdAt));
const riyadh = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" });
console.log(riyadh.format(createdAt));
console.log(createdAt.toLocaleString("ar-EG-u-nu-latn", { timeZone: "Africa/Cairo", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }));
const dayInCairo = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(createdAt);
console.log(dayInCairo, createdAt.toISOString().slice(0, 10));
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);`,
          try: R`اعرض نفس اللحظة بـ ٣ توقيتات: [["Africa/Cairo"]] و [["Europe/London"]] و [["America/New_York"]] بالعربي والأرقام اللاتيني. وبعدين غيّر اللحظة لـ [["2026-01-15T21:30:00Z"]] (شتا): الفرق بين القاهرة و UTC بقى كام؟ وآخر حاجة: اكتب [[isTodayInCairo(date)]] بترجّع true لو اللحظة دي في نفس يوم «النهارده» بتوقيت القاهرة.`,
          flag: "script",
          deep: {
            why: "السيرفر غالبًا شغال UTC (Docker و VPS و Vercel)، واليوزر في القاهرة، وفريق الدعم في الرياض. لو خزّنت «الساعة 12:30» من غير توقيت محدش هيعرف دي 12:30 فين. ولو حسبت «طلبات النهارده» بتوقيت السيرفر، طلب الساعة 1 بالليل في القاهرة هيتحسب على امبارح.",
            how: R`[[21:30Z]] في القاهرة [[00:30]] اليوم اللي بعده (٣٠ سبتمبر)، لأن مصر رجّعت التوقيت الصيفي من 2023 فهي UTC+3 من آخر جمعة في أبريل لآخر خميس في أكتوبر، و UTC+2 باقي السنة. انت مش محتاج تحفظ ده: [[timeZone: "Africa/Cairo"]] بيستخدم قاعدة بيانات IANA اللي في المتصفح و Node وبتتحدّث معاهم. عشان كده متكتبش offset بإيدك ([[+2]] أو [[+3]]): هيبقى غلط نص السنة.

[[ar-EG]] بيطلع أرقام عربية مشرقية (٣٠) افتراضيًا، و [[-u-nu-latn]] في آخر الـ locale بيخليها لاتيني (30). و [[en-CA]] حيلة معروفة: شكله [[YYYY-MM-DD]]، فبيدّيك التاريخ في توقيت معيّن كنص، وده اللي تستخدمه لـ «طلبات النهارده في القاهرة». لاحظ إن [[toISOString().slice(0, 10)]] بيدّي تاريخ UTC (29) مش تاريخ القاهرة (30).

عمل [[new Intl.DateTimeFormat]] مكلف شوية، فلو بتعرض ليستة طويلة اعمله مرة واحدة برّه الـ loop واستخدم [[format]]. و [[resolvedOptions().timeZone]] بيقولك توقيت الجهاز ([["UTC"]] على أغلب السيرفرات)، وتقدر تبعته من المتصفح للسيرفر لو محتاج تحسب بتوقيت اليوزر هناك.`,
            when: R`أي عرض لتاريخ أو وقت. وفي Next.js/SSR خلي بالك: السيرفر UTC والمتصفح القاهرة، فلو عملت format في الاتنين من غير [[timeZone]] محدد هيطلع نص مختلف وتاخد hydration error (تاب Next.js). حدّد timeZone صريح أو اعرض الوقت في client component.`,
            mistakes: R`تخزّن التاريخ كنص محلي ([["29/09/2026 12:30"]]). و [[toISOString().slice(0, 10)]] على إنه «النهارده» فيطلع امبارح بعد نص الليل في القاهرة. و offset ثابت بإيدك. و [[toLocaleString()]] من غير locale ولا timeZone فالناتج يختلف من جهاز لجهاز. وفي الانترفيو: «إزاي تتعامل مع time zones في تطبيق فيه يوزرز من بلاد مختلفة؟» الإجابة: UTC في التخزين والـ API، والتحويل عند العرض بـ IANA zone، والـ zone بتاع اليوزر محفوظ في البروفايل لو محتاجه في السيرفر (إيميلات، تقارير).`
          },
          teach: R`## الفكرة في سطرين

اللحظة بتتخزّن وتتبعت بـ UTC (نص بـ [[Z]] في الآخر)، وبتتحوّل لتوقيت ولغة اليوزر في آخر خطوة بس، وهي بتتعرض. والأداة اللي بتعمل التحويل ده جوه اللغة نفسها اسمها [[Intl.DateTimeFormat]]. المثال بياخد لحظة واحدة ويعرضها بكذا شكل. الناتج كله من Node 24 على Windows.

---

## ١. اللحظة نفسها

~~~text app.js
const createdAt = new Date("2026-09-29T21:30:00Z");
console.log(createdAt.toISOString(), JSON.stringify({ createdAt }));
~~~

- [["2026-09-29T21:30:00Z"]]: شكل اسمه **ISO 8601**: السنة-الشهر-اليوم، وبعدين [[T]] (فاصل بين التاريخ والوقت)، والوقت، و [[Z]] = UTC. ده الشكل اللي بييجي من أي API أو داتابيز.
- [[toISOString()]]: بيكتب اللحظة بنفس الشكل ده، بـ UTC دايمًا، ومعاه الـ ms ([[.000]]).
- [[JSON.stringify({ createdAt })]]: [[{ createdAt }]] اختصار لـ [[{ createdAt: createdAt }]]. و JSON مالوش نوع «تاريخ»، فـ JSON.stringify بينادي [[toJSON()]] بتاع الـ Date، وده بيرجّع نفس نص [[toISOString()]].

~~~text الناتج
2026-09-29T21:30:00.000Z {"createdAt":"2026-09-29T21:30:00.000Z"}
~~~

النص ده هو اللي يتخزّن ويتبعت. محدش يقدر يفهمه غلط، لأن الـ Z بتقول هو بتوقيت إيه.

---

## ٢. formatter بالعربي وتوقيت القاهرة

~~~text app.js
const cairo = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Cairo" });
console.log(cairo.format(createdAt));
~~~

[[Intl]] (اختصار Internationalization) object جوه JavaScript فيه أدوات لكل حاجة بتختلف من بلد لبلد: تواريخ وأرقام وعملات وجمع. و [[new Intl.DateTimeFormat(locale, options)]] بيعمل **formatter**: حاجة بتحفظ الإعدادات، وبعدين [[format(date)]] بتطبّقها على أي تاريخ.

### الـ locale: [["ar-EG"]]

نص بيقول اللغة والبلد: [[ar]] = عربي، و [[EG]] = مصر. بيحدد أسماء الأيام والشهور، وترتيب اليوم والشهر، وشكل الأرقام.

### الـ options

| الخيار | القيمة هنا | معناه |
|---|---|---|
| [[dateStyle]] | [["full"]] | التاريخ كامل باسم اليوم (فيه كمان [["long"]] و [["medium"]] و [["short"]]) |
| [[timeStyle]] | [["short"]] | الساعة والدقيقة من غير ثواني |
| [[timeZone]] | [["Africa/Cairo"]] | اعرض بتوقيت القاهرة، مهما كان توقيت الجهاز |

~~~text الناتج
الأربعاء، ٣٠ سبتمبر ٢٠٢٦ في ١٢:٣٠ ص
~~~

ليه ٣٠ مش ٢٩؟ اللحظة ٩:٣٠ بالليل UTC، ومصر في سبتمبر UTC+3 (التوقيت الصيفي)، فعندنا ١٢:٣٠ بعد نص الليل، يعني اليوم اللي بعده. و [[ص]] يعني صباحًا (AM). والأرقام طلعت مشرقية (٣٠) لأن ده الافتراضي في [["ar-EG"]].

[["Africa/Cairo"]] اسم من قاعدة بيانات اسمها **IANA time zone database**، وفيها لكل بلد تاريخ تغييرات التوقيت الصيفي كله. فمش محتاج تعرف إمتى مصر بتبقى +2 وإمتى +3: Node والمتصفح عارفين.

---

## ٣. نفس اللحظة بلغة وتوقيت تانيين

~~~text app.js
const riyadh = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Riyadh" });
console.log(riyadh.format(createdAt));
~~~

[["en-GB"]] = إنجليزي بريطاني (اليوم قبل الشهر، و 24 ساعة)، و [["medium"]] = اسم الشهر مختصر. والرياض UTC+3 طول السنة.

~~~text الناتج
30 Sept 2026, 00:30
~~~

---

## ٤. [[toLocaleString]]: نفس الحكاية في سطر

~~~text app.js
console.log(createdAt.toLocaleString("ar-EG-u-nu-latn", { timeZone: "Africa/Cairo", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }));
~~~

[[date.toLocaleString(locale, options)]] بيعمل formatter ويستخدمه مرة واحدة. وفيه حاجتين جداد:

**١. [[-u-nu-latn]] في آخر الـ locale.** [[u]] = Unicode extension (إضافة على الـ locale)، و [[nu]] = numbering system (نظام الأرقام)، و [[latn]] = لاتيني (0123). يعني «عربي، بس بأرقام 30 مش ٣٠».

**٢. بدل [[dateStyle]]، حدّدنا كل حتة لوحدها:**

| الخيار | القيمة | النتيجة |
|---|---|---|
| [[day]] | [["numeric"]] | 30 |
| [[month]] | [["long"]] | سبتمبر (اسم كامل) |
| [[hour]] | [["numeric"]] | 12 |
| [[minute]] | [["2-digit"]] | 30 (دايمًا رقمين: 05 مش 5) |

اللي محدّدتوش (السنة، اسم اليوم) مش بيظهر.

~~~text الناتج
30 سبتمبر في 12:30 ص
~~~

> [[dateStyle]] و [[timeStyle]] مينفعوش مع [[day]] و [[month]] وأخواتهم في نفس الـ options (جرّبناها: [[TypeError: Invalid option : option]]): اختار طريقة من الاتنين.

---

## ٥. حيلة [["en-CA"]]: «التاريخ ده في القاهرة كام؟»

~~~text app.js
const dayInCairo = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(createdAt);
console.log(dayInCairo, createdAt.toISOString().slice(0, 10));
~~~

[["en-CA"]] = إنجليزي كندي، والشكل الافتراضي للتاريخ فيه [[YYYY-MM-DD]]. فمن غير options غير الـ zone، بيطلّعلك تاريخ اللحظة دي في القاهرة كنص تقدر تقارنه أو تستخدمه كـ key.

والجزء التاني: [[toISOString()]] بيدّي النص الـ UTC كله، و [[.slice(0, 10)]] بياخد أول 10 حروف (من index 0 لحد 10 من غير ما ياخده)، يعني [[2026-09-29]].

~~~text الناتج
2026-09-30 2026-09-29
~~~

ده الفخ: تاريخ القاهرة ٣٠، وتاريخ UTC ٢٩. لو حسبت «طلبات النهارده» بـ [[toISOString().slice(0, 10)]] على سيرفر، الطلب ده هيتحسب على امبارح.

---

## ٦. الجهاز ده توقيته إيه؟

~~~text app.js
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
~~~

[[Intl.DateTimeFormat()]] من غير أي حاجة بيستخدم الإعدادات الافتراضية للجهاز، و [[resolvedOptions()]] بيقولك الإعدادات اللي اتختارت فعلًا، ومنها [[timeZone]].

~~~text الناتج (جهاز في مصر)
Africa/Cairo
~~~

~~~text الناتج (Linux في Docker، صورة node:22-slim)
UTC
~~~

وده بالظبط شكل الموضوع في الحقيقة: جهازك القاهرة، والسيرفر UTC.

---

## ٧. الحل (solCode): لحظة واحدة في ٣ مدن، و [[isTodayInCairo]]

~~~text app.js
const cairoDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" });
const isTodayInCairo = (date, now = new Date()) => cairoDay.format(date) === cairoDay.format(now);
const t = new Date("2026-09-29T21:30:00Z");
for (const tz of ["Africa/Cairo", "Europe/London", "America/New_York"]) {
  console.log(tz, t.toLocaleString("ar-EG-u-nu-latn", { timeZone: tz, dateStyle: "medium", timeStyle: "short" }));
}
console.log(isTodayInCairo(t, new Date("2026-09-30T08:00:00Z")), isTodayInCairo(t, new Date("2026-09-29T20:00:00Z")));
~~~

- [[cairoDay]]: formatter واحد بيتعمل **مرة واحدة** برّه الدالة، لأن عمل formatter جديد مكلف نسبيًا.
- [[(date, now = new Date()) => ...]]: arrow function بـ parameter تاني ليه قيمة افتراضية: لو منادتهوش، [[now]] = اللحظة الحالية. وده بيخلّينا نجرّبها بـ «دلوقتي» وهمي.
- [[===]]: بتقارن النصين ([["2026-09-30"]] مع [["2026-09-30"]]).
- [[for (const tz of [...])]]: بيلف على الـ ٣ zones.

~~~text الناتج
Africa/Cairo 30/09/2026، 12:30 ص
Europe/London 29/09/2026، 10:30 م
America/New_York 29/09/2026، 5:30 م
true false
~~~

لندن UTC+1 صيفًا، ونيويورك UTC−4. وأول نداء true: الساعة 8 الصبح UTC يوم ٣٠ في القاهرة يوم ٣٠، زي اللحظة. والتاني false: ٨ بالليل UTC يوم ٢٩ في القاهرة لسه ٢٩.

> لو هتقارن نص الناتج ده بنص كتبته بإيدك: العربي بيحط علامة اتجاه مخفية (U+200F) جنب الـ [[/]]، فـ [["30/09/2026"]] اللي انت كتبتها مش هتساوي اللي طالع. قارن نصوص [[en-CA]] زي ما عملنا، مش نصوص عرض.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تخزّن أو تبعت لحظة | [[toISOString()]] (أو JSON.stringify لوحده) |
| تعرضها لليوزر | [[Intl.DateTimeFormat(locale, { timeZone, ... })]] |
| أرقام لاتيني مع العربي | [[-u-nu-latn]] في الـ locale |
| تاريخ اللحظة في zone معيّن | [[en-CA]] + [[timeZone]] |
| تعرف توقيت الجهاز | [[resolvedOptions().timeZone]] |

ومتكتبش offset بإيدك (+2 أو +3): اكتب اسم الـ zone وسيب IANA يعرف التوقيت الصيفي.`,
          lines: [
            R`لحظة بـ Z: ده اللي بييجي من API أو داتابيز.`,
            R`ISO بـ Z، و JSON.stringify بيعمل نفس الشكل.`,
            R`formatter بالعربي المصري وتوقيت القاهرة.`,
            R`[[الأربعاء، ٣٠ سبتمبر ٢٠٢٦ في ١٢:٣٠ ص]]: اليوم اللي بعده في القاهرة.`,
            "إنجليزي بريطاني وتوقيت الرياض.",
            R`[[30 Sept 2026, 00:30]].`,
            R`[[-u-nu-latn]]: عربي بأرقام لاتيني. [[30 سبتمبر في 12:30 ص]].`,
            R`[[en-CA]] بيدّي [[YYYY-MM-DD]]: تاريخ اللحظة دي في القاهرة.`,
            R`[[2026-09-30 2026-09-29]]: تاريخ القاهرة غير تاريخ UTC.`,
            R`توقيت الجهاز: [["UTC"]] على السيرفرات، و [["Africa/Cairo"]] على جهازك.`
          ],
          sol: R`لـ [[21:30Z]] يوم ٢٩ سبتمبر: القاهرة ٣٠ سبتمبر 12:30 ص، ولندن ٢٩ سبتمبر 10:30 م (لندن UTC+1 صيفًا)، ونيويورك ٢٩ سبتمبر 5:30 م (UTC-4). وفي ١٥ يناير القاهرة بقت 11:30 م نفس اليوم: الفرق بقى ساعتين مش ٣، لأن التوقيت الصيفي خلص. ولا سطر في الكود اتغير، و Intl هو اللي عارف.

[[isTodayInCairo]]: حوّل اللحظة واللحظة الحالية لنص تاريخ بتوقيت القاهرة بـ [[en-CA]] وقارن النصين. متقارنش بـ [[getDate()]]: ده بتوقيت الجهاز. ومتطرحش [[Date.now() - date < 86400000]]: دي «آخر ٢٤ ساعة» مش «النهارده».`,
          solCode: R`const cairoDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" });
const isTodayInCairo = (date, now = new Date()) => cairoDay.format(date) === cairoDay.format(now);
const t = new Date("2026-09-29T21:30:00Z");
for (const tz of ["Africa/Cairo", "Europe/London", "America/New_York"]) {
  console.log(tz, t.toLocaleString("ar-EG-u-nu-latn", { timeZone: tz, dateStyle: "medium", timeStyle: "short" }));
}
console.log(isTodayInCairo(t, new Date("2026-09-30T08:00:00Z")), isTodayInCairo(t, new Date("2026-09-29T20:00:00Z")));`
        },
        {
          cmd: "Intl.RelativeTimeFormat",
          title: "تكتب «من ٥ دقايق» و «امبارح» إزاي من غير مكتبة؟",
          desc: R`[[Intl.RelativeTimeFormat(locale, { numeric: "auto" })]] بيحوّل رقم ووحدة لجملة: [[format(-1, "day")]] بالعربي «أمس»، و [[format(-3, "hour")]] «قبل 3 ساعات»، و [[format(2, "week")]] «خلال أسبوعين». السالب للماضي والموجب للمستقبل. و [[numeric: "auto"]] هو اللي بيخلي -1 day «أمس» بدل «قبل يوم واحد».

هو مبيحسبش الفرق، انت اللي بتحسبه: الفرق بالثواني، وبعدين تختار أكبر وحدة مناسبة (سنة، شهر، أسبوع، يوم، ساعة، دقيقة)، وتقسم عليها. ده كل اللي [[timeAgo]] بتعمله.`,
          example: R`const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
console.log(rtf.format(-1, "day"), "|", rtf.format(-3, "hour"), "|", rtf.format(2, "week"));
const UNITS = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
function timeAgo(date, now = Date.now()) {
  const sec = Math.round((date - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(sec, "second");
}
const now = Date.now();
console.log(timeAgo(now - 5 * 60 * 1000), "|", timeAgo(now - 26 * 3600 * 1000));
console.log(timeAgo(now + 3 * 86400 * 1000), "|", timeAgo(now - 10 * 1000));`,
          try: R`عدّل [[timeAgo]] بحيث أي حاجة أقل من 45 ثانية تطلع «الآن» (جرّب [[rtf.format(0, "second")]]). وبعدين خليها ترجّع التاريخ نفسه (بـ Intl.DateTimeFormat) لو الفرق أكتر من أسبوع، زي ما السوشيال ميديا بتعمل. وجرّب [[new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" })]] بدل [["ar"]]: إيه الفرق في الأرقام؟`,
          flag: "script",
          deep: {
            why: "«من ٥ دقايق» أسهل في القراية من «29/09/2026 23:25» في التعليقات والإشعارات والرسايل. وزمان كان الحل moment.js كلها (مكتبة ضخمة) عشان الجملة دي. دلوقتي هي جوه اللغة، ومترجمة لكل لغة صح (المثنى في العربي: «خلال أسبوعين» مش «خلال 2 أسبوع»).",
            how: R`الوحدات المسموحة: [[year]] و [[quarter]] و [[month]] و [[week]] و [[day]] و [[hour]] و [[minute]] و [[second]]. والرسالة متبنية من قواعد اللغة في ICU (نفس اللي تحت Intl.DateTimeFormat)، فالعربي بيطلع «قبل 5 دقائق» و «قبل 10 ثوانِ» بالمفرد والجمع الصح.

الـ locale [["ar"]] في Node بيطلع أرقام لاتيني، و [["ar-EG"]] بيطلع أرقام مشرقية (٥)، وتقدر تفرض أي واحد بـ [[-u-nu-latn]] أو [[-u-nu-arab]].

[[timeAgo]] بتفترض إن الشهر ٣٠ يوم والسنة ٣٦٥: تقريب مقبول للعرض بس مش للحسابات. و [[Math.round]] بتخلي ٢٦ ساعة «أمس» (يوم واحد)، و ٣٦ ساعة «قبل يومين»، وده غالبًا اللي اليوزر متوقعه. لو عايز «أمس» تبقى أمس بالتقويم فعلًا (مش ٢٤ ساعة) محتاج تقارن التواريخ بتوقيت اليوزر (الدرس اللي فات).

والنص ده بيتغير مع الوقت، فلو الصفحة مفتوحة ساعة لازم تحدّثه ([[setInterval]] كل دقيقة)، ويُفضّل تحط التاريخ الكامل في [[<time datetime="...">]] و [[title]] عشان اليوزر يعرف الوقت بالظبط.`,
            when: R`تعليقات، وإشعارات، و «آخر ظهور»، و «اتعدّل من ...». وللمواعيد المهمة (فاتورة، حجز، مهلة) اعرض التاريخ الكامل، مش «من ٣ أيام».`,
            mistakes: R`تحسبه في السيرفر (SSR) وتبعته نص ثابت: هيبقى قديم، وهيعمل hydration mismatch في Next.js لو اتحسب تاني في المتصفح بثانية مختلفة. وتكتب الجملة بإيدك ([[$__bt منذ $__{n} دقيقة$__bt]]) فتطلع «منذ 2 دقيقة» و «منذ 11 دقيقة» غلط نحويًا. وتنسى المستقبل (مواعيد جاية) فتطلع «قبل -3 أيام».`
          },
          teach: R`## المثال بيعمل إيه

جزئين: الأول بيوريك [[Intl.RelativeTimeFormat]] لوحده (رقم + وحدة ← جملة)، والتاني دالة [[timeAgo]] بتحسب الفرق بين لحظتين وتختار الوحدة المناسبة. الناتج كله من Node 24 على Windows.

---

## ١. الـ formatter

~~~text app.js
const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
console.log(rtf.format(-1, "day"), "|", rtf.format(-3, "hour"), "|", rtf.format(2, "week"));
~~~

- [[Intl.RelativeTimeFormat]]: من عيلة [[Intl]] (الأدوات اللي بتختلف من لغة للغة). «Relative» يعني نسبي: الوقت بالنسبة لدلوقتي.
- [["ar"]]: الـ locale، عربي من غير بلد.
- [[numeric: "auto"]]: لو فيه كلمة خاصة للرقم ده استخدمها («أمس» و «غدًا» و «الآن»). الافتراضي [["always"]]: رقم دايمًا.
- [[rtf.format(رقم, وحدة)]]: السالب ماضي، والموجب مستقبل.

~~~text الناتج
أمس | قبل 3 ساعات | خلال أسبوعين
~~~

لاحظ [["خلال أسبوعين"]]: الـ formatter عارف المثنى في العربي، مش [["خلال 2 أسبوع"]]. وده سبب إنك متكتبش الجملة بإيدك.

### الفرق بتاع [[numeric]]

~~~text app.js
const rtfA = new Intl.RelativeTimeFormat("ar");
console.log(rtfA.format(-1, "day"), "|", rtf.format(0, "second"), "|", rtfA.format(0, "second"), "|", rtf.format(-2, "day"));
~~~

~~~text الناتج
قبل يوم واحد | الآن | خلال 0 ثانية | أول أمس
~~~

من غير [["auto"]] بتطلع «قبل يوم واحد» و «خلال 0 ثانية». ومعاه «الآن» و «أول أمس».

### الوحدات

[[year]] و [[quarter]] و [[month]] و [[week]] و [[day]] و [[hour]] و [[minute]] و [[second]] (والجمع زي [["days"]] بيتقبل كمان). أي حاجة تانية بترمي error:

~~~text الناتج لـ rtf.format(-1, "decade")
RangeError: Invalid unit argument for Intl.RelativeTimeFormat.prototype.format() 'decade'
~~~

---

## ٢. جدول الوحدات

~~~text app.js
const UNITS = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
~~~

array فيها arrays صغيرة، كل واحدة [[[اسم الوحدة, حجمها بالثواني]]]، **من الأكبر للأصغر** (الترتيب مهم، هتشوف ليه).

| الوحدة | الحساب | ثواني |
|---|---|---|
| minute | 60 | 60 |
| hour | 60 × 60 | 3,600 |
| day | 24 × 3600 | 86,400 |
| week | 7 × 86400 | 604,800 |
| month | 30 × 86400 | 2,592,000 |
| year | 365 × 86400 | 31,536,000 |

الشهر ٣٠ يوم والسنة ٣٦٥ تقريب. مقبول لجملة زي «قبل ٣ شهور»، مش لحسابات.

---

## ٣. دالة [[timeAgo]] سطر سطر

~~~text app.js
function timeAgo(date, now = Date.now()) {
  const sec = Math.round((date - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(sec, "second");
}
~~~

1. **[[now = Date.now()]]**: parameter بقيمة افتراضية. لو مبعتّوش، بياخد اللحظة الحالية كرقم ms. ولو بعته (في التجارب) تقدر تثبّت «دلوقتي».
2. **[[(date - now) / 1000]]**: الطرح بيحوّل الاتنين لـ ms (حتى لو [[date]] كان Date، الطرح بيحوّله رقم). والقسمة على 1000 = ثواني. و [[Math.round]] بتقرّب لأقرب رقم صحيح. الماضي بيطلع **سالب**.
3. **[[for (const [unit, size] of UNITS)]]**: بيلف على الجدول، وكل عنصر بيتفك (destructuring) لاسمين: [[unit]] و [[size]].
4. **[[Math.abs(sec) >= size]]**: [[Math.abs]] بتشيل السالب (abs = absolute، القيمة المطلقة)، عشان الماضي والمستقبل يتقارنوا بنفس الطريقة. أول وحدة الفرق أكبر منها أو يساويها هي اللي نختارها، وعشان كده الجدول من الأكبر.
5. **[[Math.round(sec / size)]]**: كام وحدة؟ والإشارة (سالب أو موجب) بتفضل زي ما هي، فالـ formatter يعرف ماضي ولا مستقبل.
6. **[[return]]**: أول ما نلاقي الوحدة نرجع على طول، والـ loop بيقف.
7. **السطر الأخير**: لو ولا وحدة نفعت (أقل من دقيقة)، رجّع بالثواني.

---

## ٤. التجربة

~~~text app.js
const now = Date.now();
console.log(timeAgo(now - 5 * 60 * 1000), "|", timeAgo(now - 26 * 3600 * 1000));
console.log(timeAgo(now + 3 * 86400 * 1000), "|", timeAgo(now - 10 * 1000));
~~~

بنثبّت [[now]] مرة واحدة، ونعمل لحظات قبلها وبعدها بالـ ms ([[5 * 60 * 1000]] = ٥ دقايق). نتتبّع الـ ٤ نداءات:

| النداء | [[sec]] | أول وحدة تنفع | [[Math.round(sec / size)]] | الناتج |
|---|---|---|---|---|
| قبل ٥ دقايق | −300 | minute (60) | −5 | قبل 5 دقائق |
| قبل ٢٦ ساعة | −93,600 | day (86,400) | −1.08 ← −1 | أمس |
| بعد ٣ أيام | 259,200 | day | 3 | خلال 3 أيام |
| قبل ١٠ ثواني | −10 | ولا واحدة | (بالثواني) −10 | قبل 10 ثوانِ |

~~~text الناتج
قبل 5 دقائق | أمس
خلال 3 أيام | قبل 10 ثوانِ
~~~

لاحظ إن ٢٦ ساعة طلعت «أمس» بسبب [[Math.round]]. و «أمس» هنا معناها «حوالي يوم»، مش «امبارح في التقويم».

---

## ٥. الحل (solCode): «الآن» وتاريخ كامل بعد أسبوع

~~~text app.js
const rtf = new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" });
const dateFmt = new Intl.DateTimeFormat("ar-EG", { dateStyle: "long", timeZone: "Africa/Cairo" });
const UNITS = [["day", 86400], ["hour", 3600], ["minute", 60]];
function timeAgo(date, now = Date.now()) {
  const sec = Math.round((date - now) / 1000);
  if (Math.abs(sec) < 45) return rtf.format(0, "second");
  if (Math.abs(sec) >= 604800) return dateFmt.format(date);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(Math.round(sec / 60), "minute");
}
~~~

الفرق عن المثال:

- [["ar-EG"]] بدل [["ar"]]: أرقام مشرقية (٥ مش 5).
- أقل من 45 ثانية: [[rtf.format(0, "second")]] = «الآن».
- أسبوع أو أكتر: التاريخ نفسه بـ [[Intl.DateTimeFormat]]، فالجدول بقى فيه day و hour و minute بس.
- من 45 لـ 59 ثانية: مفيش وحدة تنفع في الـ loop، فالسطر الأخير بيقرّبها لدقيقة.

~~~text app.js
const now = Date.now();
console.log(timeAgo(now - 20 * 1000), "|", timeAgo(now - 50 * 1000), "|", timeAgo(now - 5 * 3600 * 1000));
console.log(timeAgo(new Date("2026-09-12T10:00:00Z"), new Date("2026-09-29T10:00:00Z")));
~~~

~~~text الناتج
الآن | قبل دقيقة واحدة | قبل ٥ ساعات
١٢ سبتمبر ٢٠٢٦
~~~

50 ثانية: [[Math.round(-50 / 60)]] = −1، فطلعت «قبل دقيقة واحدة». والسطر التاني: الفرق ١٧ يوم (أكتر من أسبوع)، فطلع التاريخ.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[Intl.RelativeTimeFormat(locale, { numeric: "auto" })]] | رقم + وحدة ← جملة صح نحويًا |
| السالب / الموجب | ماضي / مستقبل |
| [[timeAgo]] | انت اللي بتحسب الفرق وتختار الوحدة، الـ formatter بيكتب بس |
| الجدول من الأكبر للأصغر | عشان أول وحدة تنفع تبقى الأنسب |

والجملة دي بتقدم مع الوقت: لو الصفحة مفتوحة، حدّثها كل دقيقة.`,
          lines: [
            R`formatter عربي، و [[auto]] عشان «أمس» بدل «قبل يوم واحد».`,
            R`[[أمس | قبل 3 ساعات | خلال أسبوعين]].`,
            "الوحدات من الأكبر للأصغر بالثواني (تقريبي).",
            "الفرق بين التاريخ ودلوقتي.",
            "بالثواني، سالب لو في الماضي.",
            "جرّب من الأكبر.",
            "أول وحدة الفرق أكبر منها: قسّم عليها وارجع.",
            "قفلة.",
            "أقل من دقيقة: بالثواني.",
            "قفلة.",
            "اللحظة الحالية.",
            R`[[قبل 5 دقائق | أمس]].`,
            R`[[خلال 3 أيام | قبل 10 ثوانِ]].`
          ],
          sol: R`[[rtf.format(0, "second")]] مع [[numeric: "auto"]] بتطلع «الآن». فحط في أول الدالة [[if (Math.abs(sec) < 45) return rtf.format(0, "second");]].

وللأسبوع: [[if (Math.abs(sec) >= 604800) return dateFmt.format(date)]] قبل الـ loop، والناتج مع [[dateStyle: "long"]] مثلًا «١٢ سبتمبر ٢٠٢٦» (مع [["medium"]] بالعربي بيطلع أرقام بس «١٢‏/٠٩‏/٢٠٢٦»).

[[ar-EG]] بيطلع «قبل ٥ دقائق» بأرقام مشرقية، و [["ar"]] بيطلع «قبل 5 دقائق». الاتنين صح، اختار حسب تصميم موقعك وخليه ثابت في كل الصفحات.`,
          solCode: R`const rtf = new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" });
const dateFmt = new Intl.DateTimeFormat("ar-EG", { dateStyle: "long", timeZone: "Africa/Cairo" });
const UNITS = [["day", 86400], ["hour", 3600], ["minute", 60]];
function timeAgo(date, now = Date.now()) {
  const sec = Math.round((date - now) / 1000);
  if (Math.abs(sec) < 45) return rtf.format(0, "second");
  if (Math.abs(sec) >= 604800) return dateFmt.format(date);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(Math.round(sec / 60), "minute");
}
const now = Date.now();
console.log(timeAgo(now - 20 * 1000), "|", timeAgo(now - 50 * 1000), "|", timeAgo(now - 5 * 3600 * 1000));
console.log(timeAgo(new Date("2026-09-12T10:00:00Z"), new Date("2026-09-29T10:00:00Z")));`
        },
        {
          cmd: "date-fns و dayjs و Temporal",
          title: "date-fns ولا dayjs ولا Temporal في 2026؟",
          desc: R`Date مبيعرفش يعمل حسابات تقويم صح (زوّد شهر، أول الأسبوع، الفرق بالأيام) ومبيعرفش time zones غير توقيت الجهاز و UTC. عشان كده كان فيه مكتبات:

[[date-fns]]: دوال صغيرة بتاخد Date وترجّع Date جديد ([[addMonths]] و [[format]] و [[differenceInCalendarDays]])، وبتستورد اللي محتاجه بس. و [[date-fns-tz]] أو [[@date-fns/tz]] للـ time zones. [[dayjs]]: API شبه moment.js القديمة ([[dayjs().add(1, "month")]]) وحجمها صغير، والـ time zones بـ plugin.

و Temporal: الـ API الجديد جوه اللغة نفسها، بدل Date. أنواع منفصلة لكل معنى: [[Temporal.Instant]] (لحظة)، و [[PlainDate]] (تاريخ من غير وقت ولا zone، زي عيد ميلاد)، و [[ZonedDateTime]] (لحظة + zone، بيفهم التوقيت الصيفي)، و [[Duration]]. وكله immutable، والشهر من 1. وصل Stage 4 في TC39 سنة 2026 (جزء من ES2026)، وشغال في Firefox (من 139) و Chrome و Edge (من 144)، و Node 26 شغّله افتراضيًا. Safari وقت كتابة الدرس لسه مش في النسخة المستقرة، فللمتصفحات محتاج polyfill ([[@js-temporal/polyfill]] أو [[temporal-polyfill]]). اتأكد من caniuse قبل ما تعتمد عليه من غير polyfill.`,
          example: R`import { Temporal } from "@js-temporal/polyfill";
const jan31 = Temporal.PlainDate.from("2026-01-31");
console.log(jan31.add({ months: 1 }).toString());
const meeting = Temporal.ZonedDateTime.from("2026-10-29T12:00[Africa/Cairo]");
console.log(meeting.add({ hours: 24 }).toString());
console.log(meeting.add({ days: 1 }).toString());
const created = Temporal.Instant.from("2026-09-29T21:30:00Z");
console.log(created.toZonedDateTimeISO("Africa/Cairo").toPlainDate().toString());
const left = Temporal.PlainDate.from("2026-09-29").until("2026-12-25");
console.log(left.days, left.toString());`,
          try: R`في فولدر تجربة: [[npm i @js-temporal/polyfill date-fns dayjs]]، واحفظ المثال كـ [[temporal.mjs]] وشغّله. وبعدين اكتب نفس الـ ٣ حسابات (٣١ يناير + شهر، والأيام لحد ٢٥ ديسمبر، وتاريخ اللحظة [[21:30Z]] في القاهرة) بـ date-fns، وقارن الكود.`,
          flag: "script",
          deep: {
            why: "Date اتصمم في ١٠ أيام سنة 1995 ومليان مشاكل (الشهر من 0، mutable، مفيش zones). المكتبات حلّت ده لسنين، و Temporal هو الحل الرسمي. في 2026 انت في فترة انتقالية: لازم تعرف Date لأنه في كل حتة، ومكتبة للمشاريع اللي شغالة، و Temporal للي جاي.",
            how: R`في المثال: [[PlainDate]] + شهر على ٣١ يناير بيقف على ٢٨ فبراير ([[overflow: "constrain"]] الافتراضي) مش ٣ مارس زي Date. وتقدر تقول [[{ overflow: "reject" }]] يرمي error بدل ما يخمّن.

السطرين بتوع الاجتماع بيوضّحوا الفرق بين «٢٤ ساعة» و «يوم»: مصر بترجع من التوقيت الصيفي نص ليل الخميس ٢٩ أكتوبر 2026، فاليوم ده ٢٥ ساعة. [[add({ hours: 24 })]] بتوصل ١١ الصبح يوم ٣٠، و [[add({ days: 1 })]] بتوصل ١٢ الضهر زي ما اليوزر متوقع. Date مبيقدرش يفرق بينهم لأنه مش عارف الـ zone أصلًا.

[[Instant]] ← [[toZonedDateTimeISO("Africa/Cairo")]] ← [[toPlainDate()]]: نفس «التاريخ في القاهرة» اللي عملناه بحيلة en-CA، بس صريح. و [[until]] بترجّع [[Duration]] ([[P87D]] بصيغة ISO 8601).

الـ polyfill حجمه مش صغير، فلو المشروع بيتحمّل في Safari وهيحتاج حاجات بسيطة، date-fns لسه اختيار عملي. وفي Node 22 و 24 مفيش Temporal جوّه، فالـ polyfill لازم.`,
            when: R`مشروع جديد في 2026: Temporal (مع polyfill للمتصفحات لحد ما Safari يدعمه) لو فيه حسابات zones ومواعيد بجد (حجوزات، جداول). مشروع شغال: خليك على المكتبة اللي فيه. حاجات بسيطة (عرض تاريخ، timeAgo): Intl لوحده كفاية ومفيش مكتبة. و moment.js في maintenance mode من 2020، متبدأش بيها.`,
            mistakes: R`تخلط Date و Temporal في نفس الكود من غير تحويل واضح (بيتحوّلوا عن طريق [[Instant]] و [[epochMilliseconds]]). وتستخدم [[PlainDateTime]] لحاجة ليها توقيت (اجتماع): استخدم ZonedDateTime. وتعتمد إن Temporal موجود في المتصفح من غير ما تفحص. وتخزّن ZonedDateTime في الداتابيز كنص وتتوقع timestamptz يفهمه: خزّن [[Instant]] ([[toString()]] بـ Z) والـ zone في عمود لوحده لو محتاجه.`
          },
          teach: R`## المثال بيعمل إيه

٣ حسابات Date بيغلط فيها أو مبيعرفش يعملها: «٣١ يناير + شهر»، و «بكرة نفس الميعاد» في يوم التوقيت الصيفي اتغيّر فيه، و «اللحظة دي في القاهرة يوم كام». وكلها بـ Temporal. وبعدين الحل بيعمل نفس الحسابات بـ date-fns و dayjs عشان تقارن.

الكل اتشغّل بـ Node 24 على Windows، في فولدر تجربة فيه:

~~~powershell
npm i @js-temporal/polyfill date-fns dayjs
~~~

والنسخ اللي اتسطّبت: [[@js-temporal/polyfill@0.5.1]] و [[date-fns@4.4.0]] و [[dayjs@1.11.23]].

---

## ١. [[import]]: ليه polyfill؟

~~~text app.js
import { Temporal } from "@js-temporal/polyfill";
~~~

- [[import { Temporal } from "..."]]: بيجيب حاجة اسمها [[Temporal]] من package. الأقواس [[{ }]] معناها «هات الحاجة اللي بالاسم ده بالظبط» (named import، درس [[import و export]]).
- **polyfill** يعني كود مكتوب بـ JavaScript عادي بيعمل نفس الـ API الجديد، للأماكن اللي لسه مفيهاش. في Node 24 جرّبنا [[typeof Temporal]] وطلع [[undefined]]، يعني مش موجود، فلازم الـ polyfill.
- الملف لازم يبقى ES module عشان [[import]] تشتغل: سمّيه [[.mjs]] (أو حط [["type": "module"]] في [[package.json]]).

---

## ٢. [[PlainDate]]: تاريخ وبس

~~~text app.js
const jan31 = Temporal.PlainDate.from("2026-01-31");
console.log(jan31.add({ months: 1 }).toString());
~~~

- [[Temporal.PlainDate]]: نوع معناه «تاريخ في التقويم»: من غير ساعة ومن غير time zone. زي عيد ميلاد: ٣١ يناير هو ٣١ يناير في أي بلد.
- [[.from("2026-01-31")]]: بيعمله من نص ISO. والشهر هنا من **1** مش 0: جرّبنا [[jan31.month]] وطلع [[1]].
- [[.add({ months: 1 })]]: زوّد شهر. الـ object اللي بتبعته بيقول تزوّد إيه وقد إيه ([[{ days: 3 }]] و [[{ years: 1, months: 2 }]] وهكذا).
- [[.toString()]]: يكتبه نص ISO.

~~~text الناتج
2026-02-28
~~~

٣١ فبراير مش موجود، فـ Temporal **وقف على آخر الشهر** (ده اسمه constrain، الافتراضي). Date في الدرس الأول رحّلها لـ ٣ مارس. ولو عايز error بدل التخمين:

~~~text الناتج لـ jan31.add({ months: 1 }, { overflow: "reject" })
RangeError: value out of range: 1 <= 31 <= 28
~~~

يعني «اليوم لازم يبقى بين 1 و 28، وانت جايب 31».

وكمان: [[add]] بترجّع object **جديد**، و [[jan31]] نفسه متغيرش (طبعناه بعدها وطلع [[2026-01-31]]). وكل أنواع Temporal كده (immutable): حتى [[jan31.month = 5]] في module بترمي:

~~~text الناتج
TypeError: Cannot set property month of [object Temporal.PlainDate] which has only a getter
~~~

---

## ٣. [[ZonedDateTime]]: «٢٤ ساعة» مش زي «يوم»

~~~text app.js
const meeting = Temporal.ZonedDateTime.from("2026-10-29T12:00[Africa/Cairo]");
console.log(meeting.add({ hours: 24 }).toString());
console.log(meeting.add({ days: 1 }).toString());
~~~

- [[ZonedDateTime]]: لحظة **ومعاها** time zone. ده النوع الصح لاجتماع أو حجز.
- النص: تاريخ ووقت، وبعدين اسم الـ zone بين [[[ ]]]. وده شكل ISO الجديد (اسمه RFC 9557) اللي بيحفظ اسم الـ zone مش بس الـ offset.

الـ ٢٩ أكتوبر 2026 يوم خميس، وهو آخر يوم في التوقيت الصيفي في مصر: آخر الليلة دي الساعة بترجع ساعة. شوف:

~~~text الناتج (meeting.toString() و offset و hoursInDay)
2026-10-29T12:00:00+03:00[Africa/Cairo] +03:00 25
~~~

الاجتماع الساعة 12 والقاهرة [[+03:00]]، واليوم ده [[hoursInDay]] = **25 ساعة**. ويوم ٣٠ طلع [[+02:00]] و 24 ساعة.

~~~text الناتج
2026-10-30T11:00:00+02:00[Africa/Cairo]
2026-10-30T12:00:00+02:00[Africa/Cairo]
~~~

- [[add({ hours: 24 })]]: ٢٤ ساعة بالظبط من الزمن. بس اليوم كان ٢٥ ساعة، فوصلنا ١١ الصبح.
- [[add({ days: 1 })]]: «نفس الساعة بكرة» على الحيطة، فوصلنا ١٢ الضهر، وده اللي اليوزر قاصده لما يقول «كرر الاجتماع كل يوم».

---

## ٤. [[Instant]]: لحظة جاية من API

~~~text app.js
const created = Temporal.Instant.from("2026-09-29T21:30:00Z");
console.log(created.toZonedDateTimeISO("Africa/Cairo").toPlainDate().toString());
~~~

- [[Instant]]: نقطة على خط الزمن وبس، زي Date من جوه، ولازم النص يكون فيه [[Z]] أو offset.
- السطر التاني ٣ خطوات من الشمال لليمين:

| الخطوة | الناتج |
|---|---|
| [[created]] | اللحظة [[2026-09-29T21:30:00Z]] |
| [[.toZonedDateTimeISO("Africa/Cairo")]] | [[2026-09-30T00:30:00+03:00[Africa/Cairo]]] |
| [[.toPlainDate()]] | خُد التاريخ بس: [[2026-09-30]] |

([[ISO]] في اسم الدالة معناها التقويم الميلادي العادي.)

~~~text الناتج
2026-09-30
~~~

ده نفس اللي عملناه في الدرس اللي فات بحيلة [[en-CA]]، بس هنا كل خطوة نوعها واضح.

---

## ٥. [[until]] و [[Duration]]

~~~text app.js
const left = Temporal.PlainDate.from("2026-09-29").until("2026-12-25");
console.log(left.days, left.toString());
~~~

[[a.until(b)]]: المدة من a لحد b، وبترجّع [[Temporal.Duration]].

~~~text الناتج
87 P87D
~~~

[[P87D]] شكل ISO 8601 للمدة: [[P]] = Period، و [[87D]] = 87 يوم. والافتراضي إن أكبر وحدة الأيام. ولو عايز شهور: [[until("2026-12-25", { largestUnit: "months" })]] طلّع [[P2M26D]] (شهرين و ٢٦ يوم).

---

## ٦. الحل (solCode): نفس الحسابات بـ date-fns و dayjs

~~~text app.js
import { addMonths, format, differenceInCalendarDays } from "date-fns";
import dayjs from "dayjs";
console.log(format(addMonths(new Date(2026, 0, 31), 1), "yyyy-MM-dd"));
console.log(differenceInCalendarDays(new Date(2026, 11, 25), new Date(2026, 8, 29)));
console.log(new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date("2026-09-29T21:30:00Z")));
console.log(dayjs("2026-01-31").add(1, "month").format("YYYY-MM-DD"));
~~~

- **date-fns**: [[import { ... }]] بتجيب الدوال اللي محتاجها بس. كلها بتاخد Date وترجّع Date جديد. [[addMonths(date, 1)]]، و [[format(date, "yyyy-MM-dd")]] (في date-fns [[yyyy]] السنة و [[MM]] الشهر و [[dd]] اليوم، بحروف صغيرة للسنة واليوم). و [[differenceInCalendarDays(b, a)]]: كام يوم في التقويم من a لـ b. ولاحظ إن الشهر في [[new Date(2026, 11, 25)]] لسه من 0 (11 = ديسمبر)، لأن date-fns شغالة فوق Date.
- **dayjs**: [[import dayjs from "dayjs"]] من غير أقواس = default import. وكل حاجة بتتسلسل: [[dayjs(نص).add(1, "month").format(...)]]. والـ format هنا [[YYYY]] و [[DD]] كابيتال.
- سطر Intl: تاريخ القاهرة من غير مكتبة.

~~~text الناتج
2026-02-28
87
2026-09-30
2026-02-28
~~~

الـ ٣ وصلوا لنفس الإجابات.

---

## الخلاصة

| النوع في Temporal | معناه | مثال |
|---|---|---|
| [[PlainDate]] | تاريخ من غير وقت ولا zone | عيد ميلاد |
| [[ZonedDateTime]] | لحظة + zone (بيفهم التوقيت الصيفي) | اجتماع، حجز |
| [[Instant]] | لحظة بس | [[created_at]] من API |
| [[Duration]] | مدة | [[P87D]] |

والشهر من 1، وكل حاجة immutable، و [[days: 1]] غير [[hours: 24]]. وفي Node 24 محتاج polyfill.`,
          lines: [
            "الـ polyfill. في Node 26 و Chrome و Firefox الحديثين Temporal موجود global.",
            "تاريخ بس، من غير وقت ولا zone.",
            R`[[2026-02-28]]: بيقف على آخر الشهر، مش ٣ مارس.`,
            R`لحظة + zone، والشكل [[...[Africa/Cairo]]].`,
            R`[[2026-10-30T11:00:00+02:00]]: ٢٤ ساعة بالظبط، والساعة رجعت ورا.`,
            R`[[2026-10-30T12:00:00+02:00]]: «بكرة نفس الميعاد».`,
            "لحظة بـ Z، زي اللي جاية من API.",
            R`تاريخها في القاهرة: [[2026-09-30]].`,
            R`[[until]] بترجّع Duration.`,
            R`[[87 P87D]].`
          ],
          sol: R`ناتج [[temporal.mjs]]: [[2026-02-28]]، و [[2026-10-30T11:00:00+02:00[Africa/Cairo]]]، و [[2026-10-30T12:00:00+02:00[Africa/Cairo]]]، و [[2026-09-30]]، و [[87 P87D]].

بـ date-fns: [[addMonths(new Date(2026, 0, 31), 1)]] بترجّع ٢٨ فبراير كمان (date-fns بتعمل clamp زي Temporal)، و [[differenceInCalendarDays(new Date(2026, 11, 25), new Date(2026, 8, 29))]] بـ 87. لاحظ الشهر من 0 لسه، لأن date-fns شغالة على Date. وتاريخ القاهرة محتاج [[@date-fns/tz]] أو حيلة en-CA.

و dayjs: [[dayjs("2026-01-31").add(1, "month").format("YYYY-MM-DD")]] بـ [["2026-02-28"]]. الـ ٣ وصلوا لنفس الإجابة، الفرق في الوضوح: Temporal بيقولك نوع كل قيمة (تاريخ، لحظة، لحظة في zone).`,
          solCode: R`import { addMonths, format, differenceInCalendarDays } from "date-fns";
import dayjs from "dayjs";
console.log(format(addMonths(new Date(2026, 0, 31), 1), "yyyy-MM-dd"));
console.log(differenceInCalendarDays(new Date(2026, 11, 25), new Date(2026, 8, 29)));
console.log(new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date("2026-09-29T21:30:00Z")));
console.log(dayjs("2026-01-31").add(1, "month").format("YYYY-MM-DD"));`
        }
      ]
    }
]);

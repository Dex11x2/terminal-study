// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`Date كامل: كل getters و setters و UTC والتحويل`,
      l: 2,
      n: "الـ Date من جوه رقم ms واحد، وكل طرق إنشائه وقراية النصوص، وكل getter و setter بنسخته المحلية والـ UTC، و getTimezoneOffset والتوقيت الصيفي في مصر، وكل طرق تحويله لنص، والحساب الصح للأيام والأسابيع، وجدول بكل الـ members، ومشاريع: تقويم، وفاحص فورم، ومنظّف لوج، وأيام الشغل، وحجز ملعب بيعدّي ليالي تغيير الساعة",
      pre: [
        { to: "js/Date ومطبّاته", why: R`الشهر من 0، والـ overflow، وإن [[setMonth]] بتعدّل الأصل، وقواعد الـ parsing في أبسط صورها: الوحدة دي بتكمّل كل اللي ماتقالش هناك` },
        { to: "js/UTC و Intl.DateTimeFormat", why: R`خزّن UTC واعرض بتوقيت اليوزر، و [[Intl.DateTimeFormat]] و [[timeZone]]: هنا بنستخدمهم مع [[toLocaleDateString]] و [[toLocaleTimeString]]` },
        { to: "js/valueOf و toString و Symbol.toPrimitive", why: R`إزاي أي object بيتحوّل لرقم أو نص والـ hints التلاتة، عشان تفهم ليه [[d1 - d2]] رقم و [[d1 + d2]] نص` },
      ],
      goal: [
        R`تعرف إن الـ Date رقم ms واحد ([[getTime]] و [[valueOf]] و [[setTime]] و [[Date.now()]])، وتقارن وترتّب وتطرح تواريخ صح، وتفسّر سلوك [[ [Symbol.toPrimitive] ]].`,
        R`تعمل Date من أرقام محلية أو [[Date.UTC(...)]] أو نص، وتعرف أنهي نص آمن مع [[Date.parse]] وأنهي بيتفهم بتوقيت الجهاز، وتجرّب ده بنفسك بـ [[TZ]].`,
        R`تقرا أي جزء من التاريخ بالـ ١٦ getter (محلي و UTC) وتعرف إمتى كل واحدة، وتقرا [[getTimezoneOffset]] بإشارته الصح وتعرف الساعة اللي مش موجودة والساعة المتكررة في مصر.`,
        R`تعدّل أي جزء بالـ setters ([[setHours(0, 0, 0, 0)]] و [[setDate(0)]] و [[setUTCMinutes]]...) وتستغل الـ overflow بدل ما يفاجئك، وتعرف إنها بتعدّل الأصل وبترجّع رقم.`,
        R`تحوّل التاريخ للنص المناسب لكل مكان ([[toISOString]] للتخزين، و [[toLocaleDateString]] لليوزر، و [[toJSON]] في الـ JSON) وتتعامل مع Invalid Date و [[RangeError]].`,
        R`تحسب فرق أيام التقويم، وتزوّد يوم مش ٢٤ ساعة، ورقم الأسبوع ISO، وأقرب ميعاد جاي، من غير ما التوقيت الصيفي يبوّظ الحساب.`,
      ],
      use: {
        prog: R`أي برنامج فيه وقت: created_at، ومواعيد، وتقارير يومية، وتذاكر بتنتهي، ولوجات. ومعظم الكود اللي هتقابله في المشاريع مكتوب بـ [[Date]] نفسه، حتى لو المشروع الجديد بيستخدم مكتبة.`,
        work: R`حجز مواعيد وملاعب وعيادات، وحساب ميعاد تسليم بأيام الشغل، وفلترة «طلبات النهارده»، وتوحيد أوقات لوجات من سيرفرات مختلفة، وتقويم في صفحة، وإيصالات بتاريخ عربي.`,
        cs: R`تمثيل الوقت كرقم من لحظة ثابتة (Unix time و الـ epoch)، والفرق بين اللحظة (instant) والوقت اللي على الحيطة (wall-clock time)، وقاعدة بيانات IANA للتوقيتات، و ISO 8601.`,
      },
      projects: [
        { lvl: 'صغير', t: R`تقويم الشهر في الترمنال`, what: R`[[node cal.js 2026 11]] بيطبع شهر نوفمبر 2026 كجدول، الأسبوع بيبدأ السبت زي التقويم المصري، والنهارده عليه [[*]]. ومعاه argument تالت اختياري [[YYYY-MM-DD]] تحدد بيه «النهارده» عشان تجرّب. من دروس «Date: الـ getters و getUTC» و «Date: الـ setters و setUTC».`, done: R`نوفمبر 2026 بيبدأ تحت «حد» (أول نوفمبر حد)، وفبراير 2026 آخره 28 وفبراير 2028 آخره 29، و [[node cal.js 2026 4 2026-04-24]] بيعلّم ٢٤ حتى لو شغّلته بتوقيت نيويورك، و [[node cal.js 2026 13]] بيطبع طريقة الاستخدام ويخرج بـ exit code 1.`, sol: R`**هتشوف إيه:** جدول الشهر بأسماء الأيام فوق، والأيام تحت كل يوم في عموده، و [[*]] جنب النهارده:

~~~text الناتج: node cal.js 2026 11 2026-11-21
نوفمبر 2026
   سبت    حد اتنين  تلات  أربع  خميس  جمعة
          1     2     3     4     5     6
    7     8     9    10    11    12    13
   14    15    16    17    18    19    20
   21*   22    23    24    25    26    27
   28    29    30
~~~

~~~js cal.js
// تقويم شهر في الترمنال: الأسبوع بيبدأ السبت، والنهارده عليه علامة
const NAMES = ["سبت", "حد", "اتنين", "تلات", "أربع", "خميس", "جمعة"];
const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

function monthGrid(year, month) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (first.getDay() + 1) % 7;
  const cells = Array(offset).fill(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  while (cells.length % 7) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function render(year, month, today) {
  const sameMonth = today.getFullYear() === year && today.getMonth() === month;
  const lines = [$__bt$__{MONTHS[month]} $__{year}$__bt, NAMES.map(n => n.padStart(6)).join("")];
  for (const week of monthGrid(year, month)) {
    lines.push(week.map(day => {
      if (day === null) return "".padStart(6);
      const mark = sameMonth && day === today.getDate() ? "*" : " ";
      return (String(day) + mark).padStart(6);
    }).join(""));
  }
  return lines.join("\n");
}

const [y, m, todayArg] = process.argv.slice(2);
const year = Number(y), month = Number(m) - 1;
if (!Number.isInteger(year) || !Number.isInteger(month) || month < 0 || month > 11) {
  console.error("الاستخدام: node cal.js <السنة> <الشهر 1-12> [النهارده YYYY-MM-DD]");
  process.exit(1);
}
const today = todayArg ? new Date(todayArg + "T12:00") : new Date();
console.log(render(year, month, today));
~~~

**كل حتة بتعمل إيه:**

- [[new Date(year, month + 1, 0).getDate()]]: اليوم 0 من الشهر الجاي = آخر يوم في الشهر ده، فبيدّيك عدد أيامه (28 أو 29 أو 30 أو 31) من غير جدول بإيدك.
- [[(first.getDay() + 1) % 7]]: [[getDay()]] بيعدّ من الحد (0) للسبت (6)، واحنا عايزين السبت أول عمود. فالسبت (6) يبقى 0، والحد (0) يبقى 1، وهكذا. ده عدد الخانات الفاضية قبل يوم 1.
- [[while (cells.length % 7) cells.push(null)]]: بيكمّل آخر أسبوع بخانات فاضية عشان الجدول يبقى مستطيل.
- [[sameMonth && day === today.getDate()]]: بيقارن السنة والشهر الأول، وبعدين اليوم. لو قارنت اليوم بس، ٢١ هتتعلّم في كل شهر.
- [[padStart(6)]]: كل خانة ٦ حروف، فالأعمدة بتقف تحت بعض.

**الغلطة اللي حصلت وأنا ببنيه:** أول نسخة كانت [[new Date(todayArg)]]. بتوقيت القاهرة كانت شغالة، ولما جرّبتها بتوقيت نيويورك العلامة راحت على ٢٣:

~~~text الناتج من النسخة الأولى: $env:TZ="America/New_York"; node cal.js 2026 4 2026-04-24
   18    19    20    21    22    23*   24
~~~

ليه؟ [["2026-04-24"]] لوحدها بتتفهم **UTC** نص الليل، ونص الليل UTC في نيويورك لسه ٨ بالليل يوم ٢٣، و [[getDate()]] بيقرا بتوقيت الجهاز. الحل: [[todayArg + "T12:00"]]: تاريخ ومعاه وقت من غير Z بيتفهم **محلي**، وأنا اخترت الضهر عشان أبعد عن نص الليل (يوم ٢٤ أبريل 2026 نص الليل نفسه مش موجود في القاهرة، الساعة بتنط من 00:00 لـ 01:00).

~~~text الناتج بعد التصليح: نفس الأمر بتوقيت نيويورك
   18    19    20    21    22    23    24*
~~~

~~~text الناتج: node cal.js 2026 13
الاستخدام: node cal.js <السنة> <الشهر 1-12> [النهارده YYYY-MM-DD]
~~~

(اتشغّل بـ Node 24.22 على Windows، والتوقيت القاهرة إلا لو مكتوب غير كده. لو الطرفية عندك بتعرض العربي معكوس، شغّله في VS Code أو Windows Terminal.)` },
        { lvl: 'صغير', t: R`فاحص تاريخ ووقت الفورم`, what: R`[[form-datetime.js]] فيه [[parseLocalDateTime(dateText, timeText)]]: بياخد قيمة [[<input type="date">]] ([["2026-11-21"]]) وقيمة [[<input type="time">]] ([["10:30"]]) ويرجّع [[{ ok: true, iso, offsetMinutes, ambiguous }]] أو [[{ ok: false, error }]] برسالة عربي. بيرفض ٣٠ فبراير، و 25:00، والساعة اللي مش موجودة يوم بداية التوقيت الصيفي، وبيقولك لو الساعة متكررة يوم نهايته. من دروس «Date.UTC و Date.parse» و «Date: getTimezoneOffset والتوقيت الصيفي».`, done: R`بتوقيت القاهرة: [["2026-02-30"]] و [["25:00"]] و [["21/11/2026"]] بيترفضوا برسالة، و [["2026-04-24", "00:30"]] بيترفض (الساعة اتقدّمت)، و [["2026-10-29", "23:30"]] بيرجّع [[ambiguous: true]]، و [["2026-11-21", "10:30"]] بيرجّع [["2026-11-21T08:30:00.000Z"]]. وبتوقيت UTC نفس الـ 00:30 بتتقبل.`, sol: R`**هتشوف إيه:** سطر لكل حالة، فيه الـ input وبعده النتيجة كـ JSON:

~~~text الناتج: $env:TZ="Africa/Cairo"; node form-datetime.js
2026-11-21 10:30 → {"ok":true,"iso":"2026-11-21T08:30:00.000Z","offsetMinutes":120,"ambiguous":false}
2026-02-30 10:00 → {"ok":false,"error":"اليوم 2026-02-30 مش موجود في التقويم"}
2026-13-01 10:00 → {"ok":false,"error":"اليوم 2026-13-01 مش موجود في التقويم"}
2026-04-24 00:30 → {"ok":false,"error":"الساعة 00:30 مش موجودة يوم 2026-04-24 (الساعة اتقدّمت للتوقيت الصيفي)"}
2026-04-24 01:30 → {"ok":true,"iso":"2026-04-23T22:30:00.000Z","offsetMinutes":180,"ambiguous":false}
2026-10-29 23:30 → {"ok":true,"iso":"2026-10-29T20:30:00.000Z","offsetMinutes":180,"ambiguous":true}
2026-07-01 25:00 → {"ok":false,"error":"الوقت 25:00 مش موجود"}
21/11/2026 10:00 → {"ok":false,"error":"التاريخ لازم يبقى YYYY-MM-DD"}
2028-02-29 09:00 → {"ok":true,"iso":"2028-02-29T07:00:00.000Z","offsetMinutes":120,"ambiguous":false}
~~~

~~~js form-datetime.js
// بيقرا تاريخ ووقت من فورم (<input type="date"> و <input type="time">) كوقت محلي، ويرفض أي حاجة مش موجودة
function parseLocalDateTime(dateText, timeText) {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateText ?? "");
  const tm = /^(\d{2}):(\d{2})$/.exec(timeText ?? "");
  if (!dm) return { ok: false, error: "التاريخ لازم يبقى YYYY-MM-DD" };
  if (!tm) return { ok: false, error: "الوقت لازم يبقى HH:MM" };
  const [y, mo, d] = dm.slice(1).map(Number);
  const [h, mi] = tm.slice(1).map(Number);
  if (h > 23 || mi > 59) return { ok: false, error: $__btالوقت $__{timeText} مش موجود$__bt };
  const date = new Date(y, mo - 1, d, h, mi);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) {
    return { ok: false, error: $__btاليوم $__{dateText} مش موجود في التقويم$__bt };
  }
  if (date.getHours() !== h || date.getMinutes() !== mi) {
    return { ok: false, error: $__btالساعة $__{timeText} مش موجودة يوم $__{dateText} (الساعة اتقدّمت للتوقيت الصيفي)$__bt };
  }
  const later = new Date(date.getTime() + 60 * 60 * 1000);
  const ambiguous = later.getHours() === h && later.getDate() === d;
  return { ok: true, iso: date.toISOString(), offsetMinutes: -date.getTimezoneOffset(), ambiguous };
}

const cases = [
  ["2026-11-21", "10:30"],
  ["2026-02-30", "10:00"],
  ["2026-13-01", "10:00"],
  ["2026-04-24", "00:30"],
  ["2026-04-24", "01:30"],
  ["2026-10-29", "23:30"],
  ["2026-07-01", "25:00"],
  ["21/11/2026", "10:00"],
  ["2028-02-29", "09:00"],
];
for (const [d, t] of cases) console.log(d, t, "→", JSON.stringify(parseLocalDateTime(d, t)));
~~~

**الفكرة كلها: ابني، واقرا تاني، وقارن.** [[new Date(y, m, d, h, mi)]] عمره ما بيرمي error: لو اليوم أو الساعة مش موجودين بيرحّلهم. فبعد ما تبني الـ Date بتقرا الأجزاء تاني بالـ getters المحلية، ولو أي جزء اختلف عن اللي اليوزر كتبه يبقى اللي كتبه مش موجود:

- اليوم اختلف ([[getDate()]] رجّع 2 بدل 30): التاريخ نفسه مش في التقويم (٣٠ فبراير اترحّل لـ ٢ مارس).
- اليوم سليم بس الساعة اختلفت ([[getHours()]] رجّع 1 بدل 0): الساعة دي اتنطّت. يوم ٢٤ أبريل 2026 الساعة في مصر نطت من 00:00 لـ 01:00، فـ V8 حط 00:30 على 01:30.

**الساعة المتكررة:** يوم ٢٩ أكتوبر 2026 الساعة ٢٤:٠٠ رجعت ٢٣:٠٠، فالساعة من 23:00 لـ 23:59 بتحصل مرتين. V8 بيختار المرة الأولى (لسه +3). عشان أعرف إنها متكررة: بزوّد ساعة حقيقية ([[getTime() + 3600000]])، ولو الساعة على الحيطة طلعت نفس الرقم ونفس اليوم يبقى الساعة دي هتتكرر. و [[offsetMinutes]] هو [[-getTimezoneOffset()]] عشان يبقى موجب شرق جرينتش (120 = +2).

**الغلطة اللي حصلت وأنا ببنيه:** أول نسخة كانت بتفحص الساعة بعد ما تبني الـ Date. [["25:00"]] اترحّلت لليوم اللي بعده، فالفحص الأول (اليوم) هو اللي مسكها والرسالة طلعت غلط:

~~~text الناتج من النسخة الأولى
2026-07-01 25:00 → {"ok":false,"error":"اليوم 2026-07-01 مش موجود في التقويم"}
~~~

اليوم موجود، الساعة هي اللي غلط. الحل: [[if (h > 23 || mi > 59)]] قبل ما تبني الـ Date خالص، فكل رسالة بتقول السبب الحقيقي.

**وبتوقيت UTC؟** مفيش توقيت صيفي، فنفس الحالات بتتقبل:

~~~text الناتج: TZ=UTC node form-datetime.js (Git Bash)، السطور ٤ و ٥ و ٦
2026-04-24 00:30 → {"ok":true,"iso":"2026-04-24T00:30:00.000Z","offsetMinutes":0,"ambiguous":false}
2026-04-24 01:30 → {"ok":true,"iso":"2026-04-24T01:30:00.000Z","offsetMinutes":0,"ambiguous":false}
2026-10-29 23:30 → {"ok":true,"iso":"2026-10-29T23:30:00.000Z","offsetMinutes":0,"ambiguous":false}
~~~

يعني الفحص ده لازم يتعمل بتوقيت المكان اللي الميعاد فيه: في المتصفح ده توقيت جهاز اليوزر، وعلى السيرفر لازم تحدده انت (المشروع الكبير بيعمل كده بـ [[process.env.TZ]]).` },
        { lvl: 'متوسط', t: R`منظّف أوقات اللوج`, what: R`[[node normalize-log.js mixed.log]]: لوج متجمّع من كذا مصدر، كل واحد كاتب الوقت بشكل: ISO بـ [[Z]]، و ISO بـ offset، و epoch بالثواني (١٠ أرقام)، و epoch بالـ ms (١٣ رقم)، وشكل nginx ([[21/Nov/2026:10:15:01 +0200]])، و [["2026-11-21 10:15:07"]] من غير منطقة. الأداة بتحوّل الكل لـ ISO بـ UTC، وترتّب السطور بالوقت، وتطبع السطور اللي مفهمتش وقتها على stderr. من دروس «Date.UTC و Date.parse» و «Date: toISOString و toJSON و toLocaleDateString» و «Date: الحساب الصح».`, done: R`الـ ٨ سطور بيطلعوا ٧ مترتبين من [[08:15:00]] لـ [[08:15:07]] بتوقيت القاهرة، وسطر [[yesterday 10am]] بيتطبع إنه مش مفهوم، وسطر nginx بـ [[+0200]] بيبقى [[08:15:01Z]]، و epoch بالـ ms بيحتفظ بالـ [[.123]]. والملف اللي مش موجود بيطبع [[ENOENT]] ويخرج بـ 1.`, sol: R`**هتشوف إيه:** السطور كلها بنفس الشكل ومترتبة، وتحت الملخص:

~~~text mixed.log
2026-11-21T08:15:02Z api started
1795248905 worker-1 job=42 done
21/Nov/2026:10:15:01 +0200 GET /health 200
2026-11-21T10:15:03+02:00 db connected
1795248904123 worker-2 job=41 done
2026-11-21 10:15:07 cron cleanup
yesterday 10am something odd
2026-11-21T08:15:00Z boot
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"; node normalize-log.js mixed.log
2026-11-21T08:15:00.000Z boot
2026-11-21T08:15:01.000Z GET /health 200
2026-11-21T08:15:02.000Z api started
2026-11-21T08:15:03.000Z db connected
2026-11-21T08:15:04.123Z worker-2 job=41 done
2026-11-21T08:15:05.000Z worker-1 job=42 done
2026-11-21T08:15:07.000Z cron cleanup

1 سطر من غير وقت مفهوم:
  سطر 7: yesterday 10am something odd

7 سطر، من 2026-11-21T08:15:00.000Z لـ 2026-11-21T08:15:07.000Z
~~~

~~~js normalize-log.js
// بيوحّد أشكال الوقت في لوج مختلط لـ ISO بـ UTC، ويرتّب السطور بالوقت
const fs = require("fs");
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

const parsers = [
  // ISO كامل بـ Z أو offset: آمن مع Date.parse
  [/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))\s/, m => Date.parse(m[1])],
  // epoch بالـ ms (13 رقم) قبل الثواني (10 أرقام)
  [/^(\d{13})\s/, m => Number(m[1])],
  [/^(\d{10})\s/, m => Number(m[1]) * 1000],
  // شكل nginx: 21/Nov/2026:10:15:01 +0200
  [/^(\d{2})\/([A-Z][a-z]{2})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+-])(\d{2})(\d{2})\s/, m => {
    const month = MONTHS[m[2]];
    if (month === undefined) return NaN;
    const utc = Date.UTC(+m[3], month, +m[1], +m[4], +m[5], +m[6]);
    const offset = (m[7] === "-" ? -1 : 1) * (+m[8] * 60 + +m[9]);
    return utc - offset * 60000;
  }],
  // من غير منطقة: بنفترضه بتوقيت الجهاز اللي شغّال عليه (TZ)
  [/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})\s/, m => new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +m[6]).getTime()],
];

function parseLine(line) {
  for (const [re, toMs] of parsers) {
    const m = re.exec(line);
    if (!m) continue;
    const ms = toMs(m);
    if (Number.isNaN(ms)) return null;
    return { ms, rest: line.slice(m[0].length) };
  }
  return null;
}

function normalize(text) {
  const ok = [], bad = [];
  text.split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    const p = parseLine(line);
    if (p) ok.push({ ...p, lineNo: i + 1 });
    else bad.push({ lineNo: i + 1, line });
  });
  ok.sort((a, b) => a.ms - b.ms || a.lineNo - b.lineNo);
  return { ok, bad };
}

const file = process.argv[2];
if (!file) { console.error("الاستخدام: node normalize-log.js <ملف اللوج>"); process.exit(1); }
let text;
try { text = fs.readFileSync(file, "utf8"); }
catch (e) { console.error($__btمش قادر أقرا $__{file}: $__{e.code}$__bt); process.exit(1); }
const { ok, bad } = normalize(text);
for (const r of ok) console.log(new Date(r.ms).toISOString(), r.rest);
if (bad.length) {
  console.error($__bt\n$__{bad.length} سطر من غير وقت مفهوم:$__bt);
  for (const b of bad) console.error($__bt  سطر $__{b.lineNo}: $__{b.line}$__bt);
}
console.log($__bt\n$__{ok.length} سطر، من $__{new Date(ok[0].ms).toISOString()} لـ $__{new Date(ok.at(-1).ms).toISOString()}$__bt);
~~~

**كل حتة بتعمل إيه:**

- **[[parsers]]:** لستة أزواج [regex، دالة بتحوّل الـ match لـ ms]. أول regex يمسك السطر هو اللي بيكسب، فالترتيب مهم: الأشكال الأكثر تحديدًا الأول.
- **ISO بـ Z أو offset:** ده الشكل الوحيد اللي [[Date.parse]] مضمون فيه، فبنستخدمه على طول.
- **epoch:** [[Number(m[1])]] للـ ms، و [[* 1000]] للثواني. و [[\s]] في آخر الـ regex بيضمن إن الرقم ١٠ أرقام بالظبط مش أول ١٠ من ١٣.
- **nginx:** [[Date.UTC(...)]] بيبني اللحظة كأن الأرقام UTC، وبعدين بنطرح الـ offset: [[10:15:01 +0200]] يعني الساعة دي أسرع من UTC بساعتين، فـ UTC = 10:15 − 2 = 08:15. الإشارة: [[+]] تطرح و [[-]] تزوّد.
- **من غير منطقة:** [[new Date(y, m - 1, d, h, mi, s)]] بيفهمها بتوقيت الجهاز. ده افتراض، ولازم يتقال (التعليق فوقه). جرّبها بـ UTC:

~~~text الناتج: TZ=UTC node normalize-log.js mixed.log (آخر سطر من اللوج)
2026-11-21T10:15:07.000Z cron cleanup
~~~

بقت ساعتين بعد الباقي، وبقت آخر سطر. نفس الملف، ترتيب تاني: عشان كده أي سيستم لازم يكتب الوقت بـ Z أو offset.

- **[[a.ms - b.ms || a.lineNo - b.lineNo]]:** الترتيب بالوقت، ولو وقتين متساويين بترتيب السطور الأصلي. الطرح بيرجّع رقم سالب أو موجب أو صفر، وده اللي [[sort]] محتاجه.
- **[[new Date(r.ms).toISOString()]]:** كل الأشكال بقت رقم ms، والرقم ده بيتكتب بشكل واحد.

**الغلطة اللي حصلت وأنا ببنيه:** أول نسخة كانت بتاخد أول كلمة في السطر وتديها لـ [[new Date()]] على أمل إنه «يفهم أي حاجة»:

~~~text الناتج: new Date() على كل شكل لوحده (TZ=UTC)
"1795248905" Invalid Date
"1795248904123" Invalid Date
"21/Nov/2026:10:15:01" Invalid Date
"2026-11-21 10:15:07" 2026-11-21T10:15:07.000Z
"yesterday" Invalid Date
~~~

٣ أشكال من ٦ بقوا Invalid Date، والـ epoch كنص مش بيتفهم رقم (لازم [[Number()]] الأول)، وحتى nginx لو اتفهم كان هيضيّع الـ [[+0200]] اللي بعد المسافة. عشان كده كل شكل ليه regex ودالة تحويل صريحة.

~~~text الناتج: node normalize-log.js nope.log
مش قادر أقرا nope.log: ENOENT
~~~` },
        { lvl: 'متوسط', t: R`حاسبة أيام الشغل والإجازات`, what: R`[[workdays.js]] module فيه [[makeCalendar(holidays)]] بيرجّع [[isWorkDay(date)]] و [[addWorkDays(date, n)]] و [[workDaysBetween(from, to)]]، والويك إند الجمعة والسبت، والإجازات لستة [["YYYY-MM-DD"]]. ولما تشغّله مباشرة: [[node workdays.js 2026-11-19 5]] بيطبع ميعاد التسليم بعد ٥ أيام شغل. من دروس «Date: الحساب الصح» و «Date: الـ getters و getUTC».`, done: R`الخميس ١٩ نوفمبر 2026 + ٥ أيام شغل (وفيه إجازة ٢٦) = [[2026-11-29]]، وأول أكتوبر + ٤ (وفيه إجازة ٦ أكتوبر) = [[2026-10-08]]، و [["2026-02-30"]] وعدد سالب بيطلعوا رسالة خطأ و exit code 1، ونفس النتيجة بتوقيت القاهرة ونيويورك حتى في أسبوع تغيير الساعة.`, sol: R`**هتشوف إيه:** ميعاد التسليم، وعدد أيام الشغل في الفترة كتأكيد:

~~~text الناتج
$ node workdays.js 2026-11-19 5
من 2026-11-19 + 5 يوم شغل = 2026-11-29
أيام الشغل من 2026-11-19 لـ 2026-11-29 (الاتنين داخلين): 6
$ node workdays.js 2026-10-01 4
من 2026-10-01 + 4 يوم شغل = 2026-10-08
أيام الشغل من 2026-10-01 لـ 2026-10-08 (الاتنين داخلين): 5
$ node workdays.js 2026-02-30 3
خطأ: اليوم 2026-02-30 مش موجود
$ node workdays.js 2026-11-19 -2
خطأ: عدد الأيام لازم رقم صحيح موجب أو صفر
~~~

~~~js workdays.js
// أيام الشغل: الويك إند الجمعة والسبت، والإجازات من لستة، وكل الحساب بأيام تقويم UTC عشان التوقيت الصيفي ميأثرش
const DAY = 24 * 60 * 60 * 1000;
const WEEKEND = new Set([5, 6]);

function toDay(text) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (!m) throw new Error($__btتاريخ مش مفهوم: $__{text}$__bt);
  const ms = Date.UTC(+m[1], m[2] - 1, +m[3]);
  if (new Date(ms).toISOString().slice(0, 10) !== text) throw new Error($__btاليوم $__{text} مش موجود$__bt);
  return ms;
}
const fromDay = ms => new Date(ms).toISOString().slice(0, 10);

function makeCalendar(holidays = []) {
  const off = new Set(holidays.map(toDay));
  const isWorkDay = ms => !WEEKEND.has(new Date(ms).getUTCDay()) && !off.has(ms);
  return {
    isWorkDay: text => isWorkDay(toDay(text)),
    addWorkDays(text, n) {
      if (!Number.isInteger(n) || n < 0) throw new Error("عدد الأيام لازم رقم صحيح موجب أو صفر");
      let ms = toDay(text);
      while (n > 0) { ms += DAY; if (isWorkDay(ms)) n--; }
      return fromDay(ms);
    },
    workDaysBetween(fromText, toText) {
      let a = toDay(fromText), b = toDay(toText), sign = 1;
      if (a > b) { [a, b] = [b, a]; sign = -1; }
      let count = 0;
      for (let ms = a; ms <= b; ms += DAY) if (isWorkDay(ms)) count++;
      return sign * count;
    },
  };
}

module.exports = { makeCalendar };

if (require.main === module) {
  const holidays = ["2026-10-06", "2026-11-26"];
  const cal = makeCalendar(holidays);
  const [from, n] = process.argv.slice(2);
  try {
    const due = cal.addWorkDays(from, Number(n));
    console.log($__btمن $__{from} + $__{n} يوم شغل = $__{due}$__bt);
    console.log($__btأيام الشغل من $__{from} لـ $__{due} (الاتنين داخلين): $__{cal.workDaysBetween(from, due)}$__bt);
  } catch (e) {
    console.error("خطأ:", e.message);
    process.exitCode = 1;
  }
}
~~~

**كل حتة بتعمل إيه:**

- **[[toDay]]:** بيحوّل [["YYYY-MM-DD"]] لـ ms نص الليل **UTC** بـ [[Date.UTC(...)]]. احنا مش مهتمين بلحظة، مهتمين بـ «يوم في التقويم»، و UTC مفيهوش توقيت صيفي فكل يوم فيه ٢٤ ساعة بالظبط. والسطر التاني بيرجّع التاريخ نص ويقارنه باللي اتكتب: [["2026-02-30"]] بقى [["2026-03-02"]] فبيترفض.
- **[[new Date(ms).getUTCDay()]]:** يوم الأسبوع من الـ ms، بالنسخة الـ UTC (لأن الـ ms دي نص ليل UTC). لو استخدمت [[getDay()]] على جهاز في نيويورك هتاخد يوم الأسبوع اللي قبله.
- **[[off]] Set من الـ ms:** المقارنة بأرقام. لو خليتها Dates، [[set.has(date)]] هيقارن objects ويرجّع false دايمًا.
- **[[addWorkDays]]:** بيمشي يوم يوم ([[ms += DAY]]) ويعدّ بس الأيام اللي فيها شغل، فاليوم اللي بدأت منه مش محسوب (زي «التسليم بعد ٥ أيام»).
- **[[workDaysBetween]]:** بيعدّ الاتنين داخلين، ولو [[from]] بعد [[to]] بيبدّلهم ويرجّع سالب.
- **[[require.main === module]]:** الجزء ده بيشتغل بس لو شغّلت الملف مباشرة، مش لو عملته [[require]] من ملف تاني.

**الغلطة اللي حصلت وأنا ببنيه:** أول نسخة كانت بتمشي على أيام محلية: [[new Date(2026, 9, 27)]] وبعدين [[+ 24 ساعة]] كل لفة. بتوقيت القاهرة، في أسبوع نهاية الصيفي:

~~~text الناتج من النسخة الأولى ($env:TZ="Africa/Cairo")
28/10 0:00 | 29/10 0:00 | 29/10 23:00 | 30/10 23:00
~~~

يوم ٢٩ أكتوبر فيه ٢٥ ساعة، فـ «نص الليل + ٢٤ ساعة» وقفت على ١١ بالليل **نفس اليوم**، والأربعاء اتحسب مرتين. الحل اللي فوق: أيام UTC، أو لو لازم محلي: [[setDate(getDate() + 1)]] مش [[+ 86400000]].

~~~text الناتج بتوقيت القاهرة ونيويورك: node workdays.js 2026-04-22 3
من 2026-04-22 + 3 يوم شغل = 2026-04-27
أيام الشغل من 2026-04-22 لـ 2026-04-27 (الاتنين داخلين): 4
~~~

نفس الناتج في الاتنين، والأسبوع ده فيه بداية الصيفي في مصر.` },
        { lvl: 'كبير', t: R`حجز ملعب بيعدّي نص الليل وليالي تغيير الساعة`, what: R`نظام حجز لملعب خماسي فاتح من 4 العصر لـ 2 بالليل بتوقيت القاهرة. [[booking.js]] فيه [[createBook(saved)]] بـ [[request({ date, time, minutes, name, fold })]] و [[cancel(id)]] و [[night(date)]]، و [[openHours(date)]]. كل حجز متخزّن لحظتين UTC، والمدة دقايق حقيقية. بيرفض: التعارض مع حجز تاني، وبرّه المواعيد، والمدة الغلط، والساعة اللي مش موجودة ليلة بداية الصيفي، وبيفرّق بين المرتين بتوع الساعة المتكررة ليلة نهايته ([[fold: 1]] = المرة التانية). و [[cli.js]] بيحفظ في [[bookings.json]] ويقراه تاني، و [[booking.test.js]] بـ [[node --test]]. من الوحدة كلها، ووحدة الأخطاء والـ modules.`, done: R`[[node --test]] بيعدّي الـ ٩ اختبارات أيًّا كان توقيت جهازك. ليلة ٢٣ أبريل 2026 الملعب فاتح ٩ ساعات، وليلة ٢٩ أكتوبر ١١ ساعة، وأي ليلة تانية ١٠. حجز 23:00 يوم ٢٩ أكتوبر مرتين (مرة عادي ومرة [[--second]]) بيتقبلوا الاتنين وبينهم ساعة حقيقية، و 23:30 بعدهم بيترفض تعارض. والـ [[bookings.json]] البايظ بيطلّع رسالة مش crash.`, ext: R`زوّد أسعار مختلفة لساعات الذروة (من 8 لـ 12 بالليل) والحساب بالدقايق الحقيقية، وقايمة انتظار لما الحجز يتلغي، وخلي الملعب يتحدد توقيته من ملف إعدادات وجرّبه بـ [[PITCH_TZ=Asia/Riyadh]].`, sol: R`**هتشوف إيه:** ليلة نهاية التوقيت الصيفي (٢٩ أكتوبر 2026) بـ ٤ حجوزات، منهم اتنين الساعة 23:00 بالظبط، وكل واحد مكتوب جنبه الـ UTC offset بتاعه:

~~~text الناتج: node cli.js night 2026-10-29
ليلة 2026-10-29: الملعب فاتح 11 ساعة
  #1 22:00-23:00 UTC+3 النسور
  #2 23:00-23:00 UTC+3 الصقور
  #3 23:00-00:00 UTC+2 الأبطال
  #4 00:00-02:00 UTC+2 سهرانين
~~~

[[23:00-23:00]] مش غلط: «الصقور» بدأوا 23:00 (بالصيفي) ولعبوا ساعة كاملة، والساعة رجعت ٢٣:٠٠ تاني وهم بيخلصوا. وبعدها «الأبطال» حجزوا الـ 23:00 التانية.

~~~text شجرة الملفات
pitch/
├── booking.js        المنطق كله: تحويل الوقت، والفحص، والتعارض، والحفظ
├── booking.test.js   9 اختبارات بـ node --test، بتشتغل بتوقيت القاهرة دايمًا
├── cli.js            أوامر book و night و cancel، وبيحفظ في bookings.json
└── bookings.json     بيتعمل لوحده أول حجز
~~~

**ترتيب البناء:** [[resolveLocal]] الأول (من غيرها مفيش لحظة صح)، وبعدين [[closingFor]] و [[isOpenAt]]، وبعدين [[request]] بالتعارض، وبعدين الحفظ والتحميل، وفي الآخر الـ CLI. وكل خطوة ليها اختبار قبل اللي بعدها.

~~~js booking.js
// حجز ملعب بيفتح من 4 العصر لـ 2 بالليل بتوقيت الجهاز (process.env.TZ).
// كل حجز متخزّن لحظتين UTC (start و end)، والمدة بالدقايق الحقيقية مش بالساعة اللي على الحيطة.
const MIN = 60 * 1000;
const OPEN_HOUR = 16, CLOSE_HOUR = 2;

const pad = n => String(n).padStart(2, "0");
const localHHMM = d => $__bt$__{pad(d.getHours())}:$__{pad(d.getMinutes())}$__bt;
const localDay = d => $__bt$__{d.getFullYear()}-$__{pad(d.getMonth() + 1)}-$__{pad(d.getDate())}$__bt;
const fail = (code, error) => ({ ok: false, code, error });

// بيحوّل تاريخ ووقت محليين للحظة، ويرفض اللي مش موجود، ويعرف الساعة المتكررة
function resolveLocal(dateText, timeText, fold = 0) {
  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateText ?? "");
  const tm = /^(\d{2}):(\d{2})$/.exec(timeText ?? "");
  if (!dm || !tm) return fail("BAD_INPUT", "التاريخ YYYY-MM-DD والوقت HH:MM");
  const [y, mo, d] = dm.slice(1).map(Number);
  const [h, mi] = tm.slice(1).map(Number);
  if (h > 23 || mi > 59) return fail("BAD_INPUT", $__btالوقت $__{timeText} مش موجود$__bt);
  const first = new Date(y, mo - 1, d, h, mi);
  if (first.getFullYear() !== y || first.getMonth() !== mo - 1 || first.getDate() !== d) {
    return fail("BAD_INPUT", $__btاليوم $__{dateText} مش موجود$__bt);
  }
  if (first.getHours() !== h || first.getMinutes() !== mi) {
    return fail("NO_SUCH_TIME", $__btالساعة $__{timeText} مش موجودة يوم $__{dateText}: الساعة اتقدّمت (توقيت صيفي)$__bt);
  }
  const second = new Date(first.getTime() + 60 * MIN);
  const ambiguous = localDay(second) === dateText && localHHMM(second) === timeText;
  if (fold === 1 && !ambiguous) return fail("BAD_INPUT", $__btالساعة $__{timeText} مش متكررة يوم $__{dateText}$__bt);
  return { ok: true, at: fold === 1 ? second : first, ambiguous };
}

// لحظة القفل للحجز اللي بيبدأ في اللحظة دي: 2 بالليل الجاية
function closingFor(start) {
  const c = new Date(start);
  if (start.getHours() >= OPEN_HOUR) c.setDate(c.getDate() + 1);
  c.setHours(CLOSE_HOUR, 0, 0, 0);
  return c;
}

function isOpenAt(start) {
  const h = start.getHours();
  return h >= OPEN_HOUR || h < CLOSE_HOUR;
}

// كام ساعة حقيقية الملعب فاتح ليلة اليوم ده (من 4 العصر لـ 2 بالليل اللي بعده)
function openHours(dateText) {
  const r = resolveLocal(dateText, pad(OPEN_HOUR) + ":00");
  if (!r.ok) throw new Error(r.error);
  return (closingFor(r.at) - r.at) / (60 * MIN);
}

function createBook(saved = []) {
  let nextId = 1;
  const bookings = saved.map(b => {
    nextId = Math.max(nextId, b.id + 1);
    return { ...b, start: new Date(b.start), end: new Date(b.end) };
  });

  function view(b) {
    const offset = -b.start.getTimezoneOffset() / 60;
    return {
      id: b.id, name: b.name,
      day: localDay(b.start), from: localHHMM(b.start), to: localHHMM(b.end),
      minutes: (b.end - b.start) / MIN, utcOffset: (offset >= 0 ? "+" : "") + offset,
      start: b.start.toISOString(), end: b.end.toISOString(),
    };
  }

  function request({ date, time, minutes, name, fold = 0 }) {
    if (typeof name !== "string" || !name.trim()) return fail("BAD_INPUT", "اسم الحاجز مطلوب");
    if (!Number.isInteger(minutes) || minutes < 30 || minutes > 180 || minutes % 30) {
      return fail("BAD_INPUT", "المدة من 30 لـ 180 دقيقة، ومضاعفات 30");
    }
    const r = resolveLocal(date, time, fold);
    if (!r.ok) return r;
    const start = r.at;
    if (!isOpenAt(start)) return fail("CLOSED", $__btالملعب بيفتح $__{pad(OPEN_HOUR)}:00 ويقفل $__{pad(CLOSE_HOUR)}:00$__bt);
    const end = new Date(start.getTime() + minutes * MIN);
    if (end > closingFor(start)) return fail("CLOSED", $__btالحجز بيخلص $__{localHHMM(end)} بعد القفل$__bt);
    const clash = bookings.find(b => start < b.end && b.start < end);
    if (clash) return fail("OVERLAP", $__btمتعارض مع حجز «$__{clash.name}» من $__{localHHMM(clash.start)} لـ $__{localHHMM(clash.end)}$__bt);
    const booking = { id: nextId++, name: name.trim(), start, end };
    bookings.push(booking);
    return { ok: true, booking: view(booking), ambiguous: r.ambiguous };
  }

  function cancel(id) {
    const i = bookings.findIndex(b => b.id === id);
    if (i === -1) return fail("NOT_FOUND", $__btمفيش حجز رقم $__{id}$__bt);
    bookings.splice(i, 1);
    return { ok: true };
  }

  // حجوزات «ليلة» اليوم ده: من 4 العصر لحد القفل
  function night(dateText) {
    const r = resolveLocal(dateText, pad(OPEN_HOUR) + ":00");
    if (!r.ok) return r;
    const from = r.at, to = closingFor(from);
    return bookings.filter(b => b.start >= from && b.start < to).sort((a, b) => a.start - b.start).map(view);
  }

  const toJSON = () => bookings.map(b => ({ id: b.id, name: b.name, start: b.start, end: b.end }));
  return { request, cancel, night, toJSON };
}

module.exports = { createBook, resolveLocal, openHours };
~~~

~~~js booking.test.js
process.env.TZ = "Africa/Cairo";
const test = require("node:test");
const assert = require("node:assert/strict");
const { createBook, resolveLocal, openHours } = require("./booking.js");

const req = (book, date, time, minutes = 60, name = "فريق", fold) => book.request({ date, time, minutes, name, fold });

test("حجز عادي بيتخزّن UTC ويتعرض محلي", () => {
  const r = req(createBook(), "2026-11-21", "20:00", 90);
  assert.equal(r.ok, true);
  assert.equal(r.booking.start, "2026-11-21T18:00:00.000Z");
  assert.equal(r.booking.from, "20:00");
  assert.equal(r.booking.to, "21:30");
});

test("حجز بيعدّي نص الليل", () => {
  const r = req(createBook(), "2026-11-21", "23:30", 120);
  assert.equal(r.booking.to, "01:30");
});

test("التعارض بيترفض، واللي لازق في آخره مقبول", () => {
  const book = createBook();
  assert.equal(req(book, "2026-11-21", "20:00", 60).ok, true);
  assert.equal(req(book, "2026-11-21", "20:30", 60).code, "OVERLAP");
  assert.equal(req(book, "2026-11-21", "19:30", 60).code, "OVERLAP");
  assert.equal(req(book, "2026-11-21", "21:00", 60).ok, true);
  assert.equal(req(book, "2026-11-21", "19:00", 60).ok, true);
});

test("برّه المواعيد", () => {
  const book = createBook();
  assert.equal(req(book, "2026-11-21", "15:00").code, "CLOSED");
  assert.equal(req(book, "2026-11-22", "01:30", 60).code, "CLOSED");
  assert.equal(req(book, "2026-11-22", "01:00", 60).ok, true);
});

test("مدخلات غلط", () => {
  const book = createBook();
  assert.equal(req(book, "2026-02-30", "20:00").code, "BAD_INPUT");
  assert.equal(req(book, "2026-11-21", "24:00").code, "BAD_INPUT");
  assert.equal(req(book, "2026-11-21", "20:00", 45).code, "BAD_INPUT");
  assert.equal(req(book, "2026-11-21", "20:00", 60, "  ").code, "BAD_INPUT");
});

test("ليلة بداية الصيفي: 00:30 يوم 24 أبريل مش موجودة", () => {
  assert.equal(resolveLocal("2026-04-24", "00:30").code, "NO_SUCH_TIME");
  const r = req(createBook(), "2026-04-23", "23:00", 60);
  assert.equal(r.booking.to, "01:00");
  assert.equal(r.booking.minutes, 60);
  assert.equal(openHours("2026-04-23"), 9);
});

test("ليلة نهاية الصيفي: 23:00 يوم 29 أكتوبر متكررة", () => {
  const book = createBook();
  const a = req(book, "2026-10-29", "23:00", 60, "الأولى");
  assert.equal(a.ambiguous, true);
  assert.equal(a.booking.utcOffset, "+3");
  const b = req(book, "2026-10-29", "23:00", 60, "التانية", 1);
  assert.equal(b.ok, true);
  assert.equal(b.booking.utcOffset, "+2");
  assert.equal(new Date(b.booking.start) - new Date(a.booking.start), 60 * 60 * 1000);
  assert.equal(openHours("2026-10-29"), 11);
  assert.equal(req(book, "2026-11-21", "20:00", 60, "x", 1).code, "BAD_INPUT");
});

test("ليلة عادية 10 ساعات", () => assert.equal(openHours("2026-11-21"), 10));

test("الحفظ والتحميل بـ JSON", () => {
  const book = createBook();
  req(book, "2026-11-21", "20:00", 60, "النسور");
  const json = JSON.stringify(book);
  const again = createBook(JSON.parse(json));
  assert.equal(req(again, "2026-11-21", "20:30").code, "OVERLAP");
  const c = req(again, "2026-11-21", "22:00");
  assert.equal(c.booking.id, 2);
  assert.deepEqual(again.night("2026-11-21").map(b => b.from), ["20:00", "22:00"]);
  assert.equal(again.cancel(1).ok, true);
  assert.equal(again.cancel(1).code, "NOT_FOUND");
});
~~~

~~~js cli.js
// توقيت الملعب، قبل أي Date: لو مش محدد من برّه يبقى القاهرة
process.env.TZ = process.env.PITCH_TZ || "Africa/Cairo";
const fs = require("fs");
const { createBook, openHours } = require("./booking.js");

const FILE = "bookings.json";
const load = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : []);
const save = book => fs.writeFileSync(FILE, JSON.stringify(book, null, 2));

const [cmd, ...args] = process.argv.slice(2);
let book;
try { book = createBook(load()); }
catch (e) { console.error($__bt$__{FILE} بايظ: $__{e.message}$__bt); process.exit(1); }

if (cmd === "book") {
  const [date, time, minutes, name, second] = args;
  const r = book.request({ date, time, minutes: Number(minutes), name, fold: second === "--second" ? 1 : 0 });
  if (!r.ok) { console.error($__bt[$__{r.code}] $__{r.error}$__bt); process.exit(2); }
  save(book);
  const b = r.booking;
  console.log($__btاتحجز #$__{b.id} «$__{b.name}» يوم $__{b.day} من $__{b.from} لـ $__{b.to} ($__{b.minutes} دقيقة، UTC$__{b.utcOffset})$__bt);
  if (r.ambiguous && second !== "--second") console.log("تنبيه: الساعة دي بتتكرر الليلة دي (آخر التوقيت الصيفي). ده أول مرة؛ للتانية زوّد --second");
} else if (cmd === "night") {
  const [date] = args;
  const list = book.night(date);
  if (!Array.isArray(list)) { console.error(list.error); process.exit(2); }
  console.log($__btليلة $__{date}: الملعب فاتح $__{openHours(date)} ساعة$__bt);
  for (const b of list) console.log($__bt  #$__{b.id} $__{b.from}-$__{b.to} UTC$__{b.utcOffset} $__{b.name}$__bt);
  if (!list.length) console.log("  مفيش حجوزات");
} else if (cmd === "cancel") {
  const r = book.cancel(Number(args[0]));
  if (!r.ok) { console.error(r.error); process.exit(2); }
  save(book);
  console.log($__btاتلغى #$__{args[0]}$__bt);
} else {
  console.log("الاستخدام:\n  node cli.js book <YYYY-MM-DD> <HH:MM> <دقايق> <الاسم> [--second]\n  node cli.js night <YYYY-MM-DD>\n  node cli.js cancel <رقم>");
}
~~~

**أهم الحتت وليه كده:**

- **[[process.env.TZ = ...]] في أول سطر في الاختبار والـ CLI:** Node بيقرا [[TZ]] وقت التشغيل، وتغييره من جوه البرنامج بيأثر على أي Date بعده (اتجرّب: [[new Date(0).getHours()]] طلع 2 ثم 19 ثم 2 لما غيّرته القاهرة ثم نيويورك ثم القاهرة). الملعب في القاهرة، فالمنطق لازم يشتغل بتوقيت القاهرة حتى لو السيرفر UTC.
- **[[resolveLocal]]:** نفس فكرة المشروع الصغير «فاحص تاريخ ووقت الفورم»: ابني بـ [[new Date(y, m, d, h, mi)]]، واقرا بالـ getters، وقارن. وزوّدنا [[fold]]: لو الساعة متكررة، المرة التانية = الأولى + ساعة حقيقية.
- **[[closingFor]]:** نسخة من البداية ([[new Date(start)]])، ولو الحجز بعد 4 العصر نروح لليوم اللي بعده بـ [[setDate(getDate() + 1)]]، وبعدين [[setHours(2, 0, 0, 0)]]. ده بيدّي «2 بالليل» على الحيطة، مهما كان طول الليلة.
- **المدة بالـ ms مش بالساعة اللي على الحيطة:** [[end = start + minutes * 60000]]. لو كنا بنعمل [[setHours(getHours() + 1)]]، حجز 23:00 الأولى ليلة ٢٩ أكتوبر كان هيبقى ساعتين حقيقيتين.
- **التعارض:** [[start < b.end && b.start < end]]. الحجزين بيتداخلوا لو كل واحد بيبدأ قبل ما التاني يخلص. ولأن المقارنة [[<]] مش [[<=]]، الحجز اللي بيبدأ لحظة ما اللي قبله بيخلص مقبول (اختبار «اللي لازق في آخره»).
- **[[toJSON]]:** [[JSON.stringify(book)]] بينادي [[toJSON]] بتاعة الـ book، اللي بترجّع objects فيها Dates، و JSON.stringify بينادي [[Date.prototype.toJSON]] على كل Date فبتتكتب ISO بـ Z. وفي [[createBook(saved)]] كل نص بيرجع [[new Date(...)]].
- **[[view]]:** العرض بس هو اللي بيحوّل لوقت محلي ([[localHHMM]] بالـ getters)، والـ offset من [[-getTimezoneOffset() / 60]].

~~~text الناتج: node --test (Node 24.22)
✔ حجز عادي بيتخزّن UTC ويتعرض محلي (3.4138ms)
✔ حجز بيعدّي نص الليل (0.6981ms)
✔ التعارض بيترفض، واللي لازق في آخره مقبول (2.4837ms)
✔ برّه المواعيد (0.5771ms)
✔ مدخلات غلط (0.428ms)
✔ ليلة بداية الصيفي: 00:30 يوم 24 أبريل مش موجودة (0.5883ms)
✔ ليلة نهاية الصيفي: 23:00 يوم 29 أكتوبر متكررة (0.5592ms)
✔ ليلة عادية 10 ساعات (0.2305ms)
✔ الحفظ والتحميل بـ JSON (3.2591ms)
ℹ tests 9
ℹ suites 0
ℹ pass 9
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 231.9233
~~~

~~~text الناتج: الـ CLI خطوة خطوة (exit code بين القوسين)
$ node cli.js book 2026-10-29 22:00 60 "النسور"
اتحجز #1 «النسور» يوم 2026-10-29 من 22:00 لـ 23:00 (60 دقيقة، UTC+3)   (0)
$ node cli.js book 2026-10-29 23:00 60 "الصقور"
اتحجز #2 «الصقور» يوم 2026-10-29 من 23:00 لـ 23:00 (60 دقيقة، UTC+3)
تنبيه: الساعة دي بتتكرر الليلة دي (آخر التوقيت الصيفي). ده أول مرة؛ للتانية زوّد --second   (0)
$ node cli.js book 2026-10-29 23:00 60 "الأبطال" --second
اتحجز #3 «الأبطال» يوم 2026-10-29 من 23:00 لـ 00:00 (60 دقيقة، UTC+2)   (0)
$ node cli.js book 2026-10-29 23:30 60 "متأخرين"
[OVERLAP] متعارض مع حجز «الصقور» من 23:00 لـ 23:00   (2)
$ node cli.js book 2026-10-30 00:00 120 "سهرانين"
اتحجز #4 «سهرانين» يوم 2026-10-30 من 00:00 لـ 02:00 (120 دقيقة، UTC+2)   (0)
$ node cli.js book 2026-04-24 00:30 60 "بدري"
[NO_SUCH_TIME] الساعة 00:30 مش موجودة يوم 2026-04-24: الساعة اتقدّمت (توقيت صيفي)   (2)
$ node cli.js night 2026-04-23
ليلة 2026-04-23: الملعب فاتح 9 ساعة
  مفيش حجوزات   (0)
$ node cli.js book 2026-11-21 20:00 45 "x"
[BAD_INPUT] المدة من 30 لـ 180 دقيقة، ومضاعفات 30   (2)
$ node cli.js book 2026-11-21 15:00 60 "x"
[CLOSED] الملعب بيفتح 16:00 ويقفل 02:00   (2)
$ node cli.js cancel 9
مفيش حجز رقم 9   (2)
$ echo '{bad' > bookings.json; node cli.js night 2026-10-29
bookings.json بايظ: Expected property name or '}' in JSON at position 1 (line 1 column 2)   (1)
~~~

**الغلطات اللي حصلت وأنا ببنيه (حقيقية، واتصلحت):**

1. **نسيت أرجّع الـ Dates بعد التحميل.** أول [[createBook(saved)]] كانت [[{ ...b }]] بس، يعني [[start]] و [[end]] فضلوا نصوص. مفيش error، بس المقارنة [[start < b.end]] بقت Date مع نص: الـ Date بيتحوّل رقم والنص بيتحوّل [[NaN]]، وأي مقارنة مع NaN بـ [[false]]، فالتعارض عمره ما اتمسك:

~~~text الناتج: node --test (النسخة من غير new Date، مقتطف)
✖ الحفظ والتحميل بـ JSON (1.6912ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
    actual: undefined,
    expected: 'OVERLAP',
~~~

[[actual: undefined]] لأن الطلب اتقبل ([[ok: true]] ومفيش [[code]]). الاختبار ده هو اللي مسكها، عشان كده فيه اختبار للحفظ والتحميل مش بس للمنطق.

2. **التنبيه كان بيطلع غلط مع [[--second]].** أول CLI كانت [[if (r.ambiguous)]] بس، فلما حجزت المرة التانية طبع «ده أول مرة». التصليح: [[if (r.ambiguous && second !== "--second")]].

**ليه مش مكتبة؟** في مشروع حقيقي ممكن تستخدم [[Temporal.ZonedDateTime]] (فيه [[disambiguation: "earlier" | "later"]] جاهز للساعة المتكررة) لما يبقى Baseline، أو مكتبة زي date-fns-tz. المشروع ده بيوريك المشكلة نفسها اللي المكتبات دي بتحلها، وإنها ممكن تتحل بـ Date لوحده لو فهمت الـ getters والـ offset.` },
        { lvl: 'فكرة', t: R`مواعيد بتتكرر بقاعدة: «آخر خميس في الشهر»`, what: R`فكّر في حاجة في حياتك ميعادها بقاعدة مش برقم: اجتماع «آخر خميس»، أو قسط «تاني حد»، أو جمعية «أول سبت». اكتب [[nthWeekday(year, month, weekday, n)]] (و [[n = -1]] = آخر واحد) واطبع مواعيد السنة كلها، وجرّبها على قاعدة معروفة نتيجتها تتأكد منها.`, done: R`مواعيد ٢٠٢٦ بتطلع صح (آخر خميس في ديسمبر ٣١، والحد التاني في يناير ١١)، والشهور اللي مفيهاش «جمعة خامسة» بتتساب، والدالة بتطلّع نفس أيام التوقيت الصيفي في مصر اللي [[getTimezoneOffset]] بيتغيّر فيها.`, ext: R`خلي القاعدة تتكتب كنص ([["last thu"]] و [["2nd sun"]]) وتتقري، وطلّع المواعيد كملف [[.ics]] يتفتح في أي تقويم، وزوّد «لو الميعاد إجازة يتأجل يوم شغل» من مشروع أيام الشغل.`, sol: R`**نسخة نموذجية:** ٣ قواعد، وفي الآخر تأكيد بقاعدة التوقيت الصيفي المصري (آخر جمعة في أبريل لآخر خميس في أكتوبر):

~~~js recurring.js
// مواعيد بتتكرر بقاعدة «الخميس التاني» أو «آخر جمعة» في الشهر
const DAYS = ["الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت"];

// n = 1 أول، 2 تاني ... و -1 آخر واحد. بيرجّع رقم اليوم في الشهر أو null
function nthWeekday(year, month, weekday, n) {
  if (n > 0) {
    const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
    const day = 1 + ((weekday - firstDay + 7) % 7) + (n - 1) * 7;
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    return day <= daysInMonth ? day : null;
  }
  const last = new Date(Date.UTC(year, month + 1, 0));
  return last.getUTCDate() - ((last.getUTCDay() - weekday + 7) % 7);
}

function schedule(year, weekday, n) {
  const out = [];
  for (let m = 0; m < 12; m++) {
    const day = nthWeekday(year, m, weekday, n);
    if (day !== null) out.push($__bt$__{year}-$__{String(m + 1).padStart(2, "0")}-$__{String(day).padStart(2, "0")}$__bt);
  }
  return out;
}

console.log("اجتماع الفريق، آخر خميس في كل شهر 2026:");
console.log(schedule(2026, 4, -1).join("  "));
console.log("\nالقسط، الحد التاني في الشهر (أول ٤ شهور):", schedule(2026, 0, 2).slice(0, 4).join("  "));
console.log("الجمعة الخامسة 2026 (مش في كل شهر):", schedule(2026, 5, 5).join("  "));

// تأكيد بقاعدة التوقيت الصيفي في مصر: آخر جمعة في أبريل وآخر خميس في أكتوبر
const start = nthWeekday(2026, 3, 5, -1), end = nthWeekday(2026, 9, 4, -1);
console.log($__bt\nالصيفي في مصر 2026: من $__{DAYS[5]} $__{start} أبريل لـ $__{DAYS[4]} $__{end} أكتوبر$__bt);
process.env.TZ = "Africa/Cairo";
const before = new Date(2026, 3, start - 1, 12).getTimezoneOffset();
const after = new Date(2026, 3, start, 12).getTimezoneOffset();
console.log($__btgetTimezoneOffset قبلها $__{before} وبعدها $__{after}$__bt);
~~~

~~~text الناتج: node recurring.js
اجتماع الفريق، آخر خميس في كل شهر 2026:
2026-01-29  2026-02-26  2026-03-26  2026-04-30  2026-05-28  2026-06-25  2026-07-30  2026-08-27  2026-09-24  2026-10-29  2026-11-26  2026-12-31

القسط، الحد التاني في الشهر (أول ٤ شهور): 2026-01-11  2026-02-08  2026-03-08  2026-04-12
الجمعة الخامسة 2026 (مش في كل شهر): 2026-01-30  2026-05-29  2026-07-31  2026-10-30

الصيفي في مصر 2026: من الجمعة 24 أبريل لـ الخميس 29 أكتوبر
getTimezoneOffset قبلها -120 وبعدها -180
~~~

**ليه اخترت التصميم ده:**

- **حساب مش لفّ:** أول يوم في الشهر يومه [[firstDay]]، فأول [[weekday]] بعده بعد [[(weekday - firstDay + 7) % 7]] يوم، وبعدين [[(n - 1) * 7]]. مفيش loop على أيام الشهر.
- **«آخر» من آخر الشهر:** آخر يوم ([[Date.UTC(year, month + 1, 0)]]) وارجع لورا لحد أول [[weekday]].
- **UTC في الحساب:** «الخميس» صفة لليوم في التقويم مش لحظة، فـ [[getUTCDay()]] على نص ليل UTC بيدّي نفس الإجابة على أي جهاز.
- **[[null]] لما مفيش:** «الجمعة الخامسة» مش في كل شهر، فالدالة بترجّع null والـ schedule بيسيب الشهر بدل ما يطلّع يوم من الشهر اللي بعده.
- **التأكيد في الآخر:** القاعدة طلّعت ٢٤ أبريل و ٢٩ أكتوبر، و [[getTimezoneOffset]] (بـ [[process.env.TZ = "Africa/Cairo"]]) اتغيّر من -120 لـ -180 بالظبط يوم ٢٤. يعني حسابك ماشي مع قاعدة بيانات IANA.

**الغلطة اللي حصلت:** أول نسخة كانت [[1 + (weekday - firstDay) + (n - 1) * 7]] من غير [[+ 7]] و [[% 7]]. يناير 2026 بيبدأ خميس (4)، والحد (0) قبله في الأسبوع، فالفرق طلع سالب:

~~~text الناتج: الحد التاني في يناير 2026
firstDay: 4   النسخة الأولى: 4   بعد التصليح: 11
~~~

٤ يناير هو أول حد مش التاني. الـ [[% 7]] بعد [[+ 7]] بيخلّي الفرق دايمًا من 0 لـ 6.` },
      ],
      items: [
        {
          cmd: "Date: getTime و valueOf و Symbol.toPrimitive",
          title: "الـ Date من جوه رقم: تقراه وتغيّره وتقارنه إزاي، وليه d1 - d2 رقم و d1 + d2 نص؟",
          desc: R`أي [[Date]] جواه رقم واحد بس: عدد الـ milliseconds من [[1970-01-01T00:00:00Z]]. [[Date.now()]] بيرجّع الرقم ده للحظة الحالية من غير ما يعمل object، و [[getTime()]] و [[valueOf()]] بيقروه من Date موجود، و [[setTime(ms)]] بيحط رقم جديد في نفس الـ object.

ولما Date يدخل في عملية، بيتحوّل لـ primitive عن طريق [[Date.prototype[Symbol.toPrimitive] ]] الخاصة بيه: في الطرح والمقارنة ([[-]] و [[<]]) بيبقى الرقم، وفي [[+]] و [[==]] مع نص بيبقى **نص** ([[toString()]])، بعكس أي object تاني. عشان كده [[d2 - d1]] بيدّيك الفرق بالـ ms، و [[d1 + d2]] بيلزق نصين، و [[d1 == d2]] بيقارن objects مش لحظات.`,
          example: R`const d = new Date(Date.UTC(2026, 10, 21, 9, 30));
console.log(d.getTime(), d.valueOf(), +d);
const start = Date.now();
const copy = new Date(0);
console.log(copy.setTime(d.getTime()), copy.toISOString());
console.log(d - new Date(Date.UTC(2026, 10, 20, 9, 30)));
console.log(typeof (d + 1), typeof (d - 1));
console.log(d[Symbol.toPrimitive]("number"), d[Symbol.toPrimitive]("default") === String(d));
const a = new Date(Date.UTC(2026, 0, 1)), b = new Date(Date.UTC(2026, 0, 1));
console.log(a == b, a.getTime() === b.getTime(), a <= b);
console.log(Date.now() - start >= 0);`,
          try: R`اعمل Date واحد واعمل عليه [[Object.defineProperty]] لـ [[Symbol.toPrimitive]] بدالة بتطبع الـ [[hint]] وبعدين بتنادي الأصلية ([[Date.prototype[Symbol.toPrimitive].call(this, hint)]]). جرّب عليه ٧ أماكن: [[d + ""]] و [[d * 1]] و template literal و [[d > 0]] و [[String(d)]] و [[d == "x"]] و [[[d].join()]]. وبعدين جرّب تعمل [[d[Symbol.toPrimitive] = ...]] بالـ [[=]] العادي في ملف [[.mjs]].`,
          sol: R`~~~js hints.mjs
const spy = new Date(0);
try { spy[Symbol.toPrimitive] = () => 1; } catch (e) { console.log(e.constructor.name + ": " + e.message); }
const orig = Date.prototype[Symbol.toPrimitive];
Object.defineProperty(spy, Symbol.toPrimitive, { value(hint) { console.log("hint:", hint); return orig.call(this, hint); } });
spy + ""; spy * 1; $__bt$__{spy}$__bt; spy > 0; String(spy); spy == "x"; [spy].join();
~~~

~~~text الناتج: TZ=UTC node hints.mjs
TypeError: Cannot assign to read only property 'Symbol(Symbol.toPrimitive)' of object '[object Date]'
hint: default
hint: number
hint: string
hint: number
hint: string
hint: default
hint: string
~~~

- [[+]] و [[==]] بيبعتوا [[default]]، والـ Date بيعامل default كـ string. ده الفرق بينه وبين أي object تاني (اللي بيعامل default كـ number).
- [[*]] و [[>]] بيبعتوا [[number]]، والـ template و [[String()]] و [[join]] بيبعتوا [[string]].
- الـ [[=]] العادي فشل لأن [[Symbol.toPrimitive]] على [[Date.prototype]] متعرّفة [[writable: false]]: الخاصية الموروثة اللي مش writable بتمنع إنك تعمل خاصية بنفس الاسم بالـ [[=]]. في ملف [[.mjs]] (strict mode) ده [[TypeError]]، وفي [[.js]] عادي (CommonJS، sloppy) **بيفشل في صمت** ومفيش ولا سطر [[hint]] بيتطبع (جرّبتها الأول كده ومفهمتش ليه). [[Object.defineProperty]] بيعدّي القيد ده لأنه بيعرّف الخاصية مباشرة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الـ ٥ قيم قبل ما تشغّل، وبعدين شغّل بتوقيتين ([[TZ=UTC]] في Git Bash و [[$env:TZ="Africa/Cairo"]] في PowerShell):

~~~js
const d = new Date(0);
console.log(d + 1);
console.log(d - 1, d * 1, $__bt$__{d}$__bt === String(d), d + d === String(d) + String(d));
~~~`, done: R`توقعت إن [[d + 1]] نص آخره [[1]]، و [[d - 1]] بـ [[-1]] و [[d * 1]] بـ [[0]]، والاتنين التانيين [[true]]، وعرفت ليه أول سطر بس هو اللي اتغيّر بين التوقيتين.`, sol: R`~~~text الناتج: TZ=UTC
Thu Jan 01 1970 00:00:00 GMT+0000 (Coordinated Universal Time)1
-1 0 true true
~~~

~~~text الناتج: $env:TZ="Africa/Cairo" (أول سطر بس)
Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)1
~~~

- [[d + 1]]: الـ [[+]] بيبعت hint [[default]]، والـ Date بيرجّع [[toString()]]، ونص + رقم = لزق. فالـ [[1]] لزقت في آخر النص.
- [[d - 1]] و [[d * 1]]: الطرح والضرب مالهمش معنى غير مع أرقام، فالـ hint [[number]] والـ Date بقى 0 (لحظة الـ epoch).
- [[d + d]]: نصين لازقين، مش ضعف الرقم.
- أول سطر بس بيتغيّر لأن [[toString()]] بيكتب بتوقيت الجهاز. باقي الحسابات على الرقم اللي جوه، وده واحد في كل الدنيا.

الغلطة الشائعة: [[total = total + d]] جوه loop عشان «تجمع» أوقات، والنتيجة نص طويل. اجمع [[d.getTime()]] أو استخدم [[-]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة بتقول «النهارده إجازة؟» والكود ده بيطبع [[false]] دايمًا حتى يوم ٦ أكتوبر:

~~~js
const holidays = [new Date(2026, 9, 6), new Date(2026, 6, 23)];
const day = new Date(2026, 9, 6);
console.log(holidays.includes(day), holidays.indexOf(day));
~~~

لاقي السبب وصلّحه بطريقتين.`, done: R`الكود القديم بيطبع [[false -1]]، والتصليح بيطبع [[true]] بطريقتين: Set من الأرقام، و [[some]] بمقارنة الأرقام.`, sol: R`~~~js holidays.js
const holidays = [new Date(2026, 9, 6), new Date(2026, 6, 23)];
const day = new Date(2026, 9, 6);
console.log(holidays.includes(day), holidays.indexOf(day));
const stamps = new Set(holidays.map(h => h.getTime()));
console.log(stamps.has(day.getTime()), holidays.some(h => +h === +day));
~~~

~~~text الناتج: TZ=UTC node holidays.js
false -1
true true
~~~

**السبب:** [[includes]] و [[indexOf]] بيقارنوا بـ [[===]] (تقريبًا)، و [[===]] على objects بيسأل «ده نفس الـ object؟» مش «نفس القيمة؟». [[new Date(2026, 9, 6)]] اتعمل مرتين، فهما objectين مختلفين حتى لو نفس اللحظة.

**التصليح:** قارن الأرقام اللي جوه. [[h.getTime()]] (أو [[+h]] اختصار) بيدّي رقم، والأرقام بتتقارن بالقيمة. والـ Set من الأرقام أحسن لو اللستة طويلة وهتسأل كتير، لأن [[has]] مش بيلف على اللستة.

> لو التواريخ جاية بساعات مختلفة (يوم ٦ الساعة ٩ ويوم ٦ الساعة ٣) قارن «اليوم» مش اللحظة: نص [[YYYY-MM-DD]] أو [[setHours(0, 0, 0, 0)]] على نسخة.` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[isValidDate(x)]] بترجّع [[true]] بس لو [[x]] Date سليم، و [[clampDate(d, min, max)]] بترجّع Date **جديد** محصور بين [[min]] و [[max]] من غير ما تغيّر الأصل. اكتب الحل في مربع «شغّل واختبر» تحت.`, done: R`الاختبارات اللي تحت عدّت: [[isValidDate(new Date("x"))]] و [[isValidDate("2026-01-01")]] و [[isValidDate(Date.now())]] بـ [[false]]، و [[clampDate]] بيرجّع الحد لو برّه، ونسخة جديدة دايمًا.`, sol: R`~~~js valid-clamp.js
function isValidDate(x) { return x instanceof Date && !Number.isNaN(x.getTime()); }
function clampDate(d, min, max) {
  return new Date(Math.min(Math.max(d.getTime(), min.getTime()), max.getTime()));
}
console.log(isValidDate(new Date()), isValidDate(new Date("x")), isValidDate("2026-01-01"), isValidDate(Date.now()), isValidDate(null));
const min = new Date("2026-01-01T00:00:00Z"), max = new Date("2026-12-31T23:59:59Z");
console.log(clampDate(new Date("2025-06-01T00:00:00Z"), min, max).toISOString(), clampDate(new Date("2027-02-01T00:00:00Z"), min, max).toISOString());
const orig = new Date("2027-02-01T00:00:00Z");
console.log(orig.toISOString(), clampDate(orig, min, max) === orig);
~~~

~~~text الناتج: TZ=UTC node valid-clamp.js
true false false false false
2026-01-01T00:00:00.000Z 2026-12-31T23:59:59.000Z
2027-02-01T00:00:00.000Z false
~~~

- [[instanceof Date]] الأول: نص أو رقم أو null مش Date أصلًا، و [[x.getTime]] عليهم كان هيرمي أو يدّي غلط.
- [[!Number.isNaN(x.getTime())]]: الـ Invalid Date لسه Date (نفس النوع)، الفرق إن الرقم اللي جوه [[NaN]].
- [[Math.max]] و [[Math.min]] على الأرقام: الأول ميقلّش عن [[min]]، والتاني ميزيدش عن [[max]]. وكان ينفع [[Math.max(d, min)]] على الـ Dates نفسها (بتتحوّل أرقام)، بس [[getTime()]] أوضح.
- [[new Date(...)]] حوالين النتيجة: دايمًا object جديد، فاللي نادى الدالة ميتفاجئش إن الـ Date بتاعه اتغيّر.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** قيس loop بيجمع الأرقام من 0 لمليون مرة بـ [[Date.now()]] ومرة بـ [[performance.now()]]. شغّله ٣ مرات. الرقمين بيختلفوا في إيه؟ وأنهي واحد تستخدمه لقياس الأداء؟`, done: R`طبعت الرقمين، ولاحظت إن [[Date.now()]] رقم صحيح بالـ ms و [[performance.now()]] فيه كسور، وتقدر تقول ليه [[performance.now()]] هو اللي للقياس.`, sol: R`~~~js timing.js
const t0 = Date.now();
const p0 = performance.now();
let s = 0;
for (let i = 0; i < 1e6; i++) s += i;
console.log("Date.now:", Date.now() - t0, "ms", "performance.now:", (performance.now() - p0).toFixed(3), "ms");
~~~

~~~text الناتج: node timing.js (جهاز عادي، الأرقام بتتغير كل تشغيلة)
Date.now: 3 ms performance.now: 2.237 ms
~~~

- [[Date.now()]] بيرجّع ms صحيحة، فأي حاجة أقل من 1ms بتطلع 0 أو 1، والقياس بيتلخبط بالتقريب.
- [[performance.now()]] بيعدّ من بداية البرنامج بكسور ms (في المتصفح دقته متقلّلة شوية لأسباب أمان)، والأهم إنه **monotonic**: مبيرجعش لورا. [[Date.now()]] بيمشي مع ساعة الجهاز، فلو الجهاز ظبط ساعته من النت (NTP) في نص القياس الفرق ممكن يطلع سالب أو كبير.

يعني: [[Date.now()]] لـ «إمتى حصل» (timestamp تخزّنه)، و [[performance.now()]] لـ «خد قد إيه».` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك كتب [[if (order.createdAt == lastSeen)]] و [[const total = start + end]] وقالك «Date بيتحوّل رقم زي أي object فيه valueOf». اكتبله ٣ سطور تصحّح الفكرة، وكل سطر بمثال يتشغّل.`, done: R`الشرح فيه: إن [[==]] بين objectين مش بيحوّل، وإن [[+]] على Date بيدّي نص بسبب [[Symbol.toPrimitive]]، وإن الصح [[getTime()]] أو [[-]]، وكل مثال اتشغّل وطلع زي ما قلت.`, sol: R`**إجابة نموذجية:**

1. [[==]] بين **اتنين objects** مبيحوّلش أي حاجة: بيسأل «نفس الـ object؟». [[new Date(0) == new Date(0)]] بـ [[false]]. قارن بـ [[a.getTime() === b.getTime()]].
2. الـ Date عنده [[Symbol.toPrimitive]] خاص بيرجّع **نص** لما الـ hint [[default]] (ده اللي [[+]] و [[==]] مع primitive بيبعتوه)، فـ [[start + end]] بيلزق نصين. أي object عادي فيه [[valueOf]] كان هيبقى رقم.
3. [[-]] و [[<]] و [[>]] بيبعتوا [[number]]، فدول بيشتغلوا صح على Dates: [[end - start]] = المدة بالـ ms.

~~~js explain.js
const a = new Date(0), b = new Date(0);
console.log(a == b, a.getTime() === b.getTime());
console.log(typeof (a + b), (a + b).length > 50, b - a, a < new Date(1));
~~~

~~~text الناتج: TZ=UTC node explain.js
false true
string true 0 true
~~~

والمقارنة [[<=]] و [[>=]] الاتنين مع بعض بتدّي «متساويين» من غير [[getTime]]، بس [[===]] على الأرقام أوضح للي هيقرا.` },
          ],
          check: {
            lang: "js",
            starter: R`function isValidDate(x) {
  return x instanceof Date;
}
function clampDate(d, min, max) {
  if (d < min) return min;
  if (d > max) return max;
  return d;
}`,
            tests: R`const min = new Date("2026-01-01T00:00:00Z"), max = new Date("2026-12-31T23:59:59Z");
test("Date سليم", () => expect(isValidDate(new Date(0))).toBe(true));
test("Invalid Date", () => expect(isValidDate(new Date("x"))).toBe(false));
test("نص مش Date", () => expect(isValidDate("2026-01-01")).toBe(false));
test("رقم مش Date", () => expect(isValidDate(1795248904000)).toBe(false));
test("null", () => expect(isValidDate(null)).toBe(false));
test("قبل الحد ← min", () => expect(clampDate(new Date("2025-06-01T00:00:00Z"), min, max).getTime()).toBe(min.getTime()));
test("بعد الحد ← max", () => expect(clampDate(new Date("2027-02-01T00:00:00Z"), min, max).toISOString()).toBe("2026-12-31T23:59:59.000Z"));
test("جوه الحد زي ما هو", () => expect(clampDate(new Date("2026-06-01T12:00:00Z"), min, max).toISOString()).toBe("2026-06-01T12:00:00.000Z"));
test("نسخة جديدة مش الأصل", () => { const d = new Date("2026-06-01T12:00:00Z"); expect(clampDate(d, min, max) === d).toBe(false); });
test("مش بيرجّع min نفسه", () => { const r = clampDate(new Date(0), min, max); r.setUTCFullYear(1999); expect(min.getUTCFullYear()).toBe(2026); });`,
            solution: R`function isValidDate(x) {
  return x instanceof Date && !Number.isNaN(x.getTime());
}
function clampDate(d, min, max) {
  return new Date(Math.min(Math.max(d.getTime(), min.getTime()), max.getTime()));
}`
          },
          flag: "script",
          deep: {
            why: R`كل حاجة في التواريخ مبنية على الرقم ده: التخزين في الداتابيز كـ timestamp، والترتيب، و «فاضل كام»، و «الحجزين بيتداخلوا؟». ولو مفهمتش إن الـ Date بيتحوّل نص في [[+]] و [[==]]، هتكتب مقارنات بتطلع [[false]] من غير سبب واضح، أو مجموع أوقات بيطلع نص طوله ٣٠٠ حرف.`,
            how: R`الـ Date object فيه خانة داخلية واحدة اسمها في المواصفات DateValue: رقم ms أو [[NaN]]. [[getTime]] و [[valueOf]] بيرجّعوها زي ما هي (نفس الدالة تقريبًا: [[valueOf]] موجودة عشان التحويل التلقائي)، و [[setTime(x)]] بيحوّل [[x]] لرقم ويقصّه لصحيح (TimeClip: [[new Date(1.5).getTime()]] بـ 1) ويرجّعه. والحد ±8.64e15 ms (حوالي ٢٧٥ ألف سنة من ١٩٧٠): [[new Date(8.64e15).toISOString()]] طلع [[+275760-09-13T00:00:00.000Z]] وواحد زيادة بيبقى [[NaN]].

[[Date.prototype[Symbol.toPrimitive](hint)]] بيقبل [["number"]] (بيرجّع [[valueOf()]]) و [["string"]] و [["default"]] (الاتنين بيرجّعوا [[toString()]])، وأي hint تاني بيرمي [[TypeError: Invalid hint: bad]]. وعلى حاجة مش Date: [[TypeError: Method Date.prototype [ @@toPrimitive ] called on incompatible receiver 5]] (اتجرّبوا).`,
            when: R`[[Date.now()]] لما محتاج رقم اللحظة بس (timestamp، أو seed، أو مدة تقريبية)، من غير ما تعمل object. [[getTime()]] للمقارنة والتخزين والـ keys في Map أو Set. [[setTime]] لما عايز تعيد استخدام object (نادر، [[new Date(ms)]] أوضح). و [[-]] و [[<]] و [[>]] مباشرة على الـ Dates للفرق والترتيب.`,
            mistakes: R`[[a == b]] أو [[a === b]] على Dates. و [[list.includes(date)]]. و [[start + duration]] عشان تزوّد وقت (بيدّي نص: اكتب [[new Date(start.getTime() + duration)]]). و [[Date.now]] من غير أقواس (بتدّي الدالة نفسها). و [[new Date().getTime()]] بدل [[Date.now()]] (شغال بس بيعمل object على الفاضي). وفي الانترفيو: «ليه [[new Date() + 0]] نص و [[new Date() - 0]] رقم؟» الإجابة: [[Symbol.toPrimitive]] بتاع Date بيعامل hint الـ default كـ string.`
          },
          teach: R`## الفكرة: الـ Date رقم واحد

درس «Date ومطبّاته» قال إن الـ Date جواه رقم ms من الـ epoch ومفيش time zone متخزّن فيه. الدرس ده عن الرقم ده نفسه: إزاي تقراه، وتغيّره، وتطرحه، وتقارنه، وليه الـ Date بيتصرف غريب مع [[+]].

> كل الناتج هنا من Node 24.22 على Windows. اتشغّل مرة بـ [[TZ=UTC]] (Git Bash) ومرة بـ [[$env:TZ="Africa/Cairo"]] (PowerShell)، وطلع نفس الأرقام بالظبط في الاتنين، لأن المثال مبيقراش ولا بيطبع حاجة بتوقيت الجهاز. ونفس الكود في Chrome 157 طلّع نفس الحاجة (نفس الـ engine، V8).

---

## ١. [[Date.UTC(...)]] و [[getTime]] و [[valueOf]]: الرقم اللي جوه

~~~js
const d = new Date(Date.UTC(2026, 10, 21, 9, 30));
console.log(d.getTime(), d.valueOf(), +d);
~~~

- [[Date.UTC(2026, 10, 21, 9, 30)]]: بيحسب رقم الـ ms للحظة دي **بتوقيت UTC** (الشهر 10 = نوفمبر، من 0)، وبيرجّع **رقم** مش Date. درسه الكامل اللي بعد ده.
- [[new Date(رقم)]]: Date جواه الرقم ده بالظبط.
- [[getTime()]] و [[valueOf()]]: الاتنين بيرجّعوا الرقم اللي جوه.
- [[+d]]: الـ [[+]] لوحدها قبل حاجة (unary plus) معناها «حوّلها رقم»، وبتنادي [[valueOf]] من تحت.

~~~text الناتج
1795253400000 1795253400000 1795253400000
~~~

١٧٩٥ مليار ms تقريبًا = حوالي ٥٧ سنة من ١٩٧٠. نفس الرقم في كل جهاز في الدنيا، ودي النقطة كلها.

---

## ٢. [[Date.now()]]: اللحظة دلوقتي كرقم

~~~js
const start = Date.now();
~~~

[[Date.now()]] دالة **static** (على [[Date]] نفسه مش على object منه) بترجّع رقم ms للحظة الحالية. زي [[new Date().getTime()]] بس من غير ما تعمل object. ناتجه بيتغيّر كل مرة، فمطبعناهوش: آخر سطر في المثال بيستخدمه.

---

## ٣. [[setTime]]: رقم جديد في نفس الـ object

~~~js
const copy = new Date(0);
console.log(copy.setTime(d.getTime()), copy.toISOString());
~~~

- [[new Date(0)]]: لحظة الـ epoch نفسها.
- [[copy.setTime(...)]]: بيحط رقم جديد جوه [[copy]] (بيعدّل الـ object نفسه) و **بيرجّع الرقم الجديد**. كل الـ setters بترجّع الرقم مش الـ Date، وده هيفرق في درس الـ setters.

~~~text الناتج
1795253400000 2026-11-21T09:30:00.000Z
~~~

---

## ٤. الطرح: الفرق بالـ ms

~~~js
console.log(d - new Date(Date.UTC(2026, 10, 20, 9, 30)));
~~~

الـ [[-]] بيحوّل الاتنين لأرقام ويطرح:

~~~text الناتج
86400000
~~~

يوم واحد = 24 × 60 × 60 × 1000 = 86,400,000 ms. (اليوم ده UTC فهو ٢٤ ساعة بالظبط. «اليوم» المحلي مش دايمًا ٢٤ ساعة، ودي حكاية درس «Date: الحساب الصح».)

---

## ٥. [[date[Symbol.toPrimitive](hint)]]: ليه [[+]] نص و [[-]] رقم

~~~js
console.log(typeof (d + 1), typeof (d - 1));
console.log(d[Symbol.toPrimitive]("number"), d[Symbol.toPrimitive]("default") === String(d));
~~~

لما JavaScript محتاج يحوّل object لـ primitive بيبص الأول على method اسمها [[Symbol.toPrimitive]] (Symbol = مفتاح خاص مش نص، شرحه في درس «valueOf و toString و Symbol.toPrimitive»)، ويبعتلها **hint** بيقول المكان ده عايز إيه:

| المكان | الـ hint | الـ Date بيرجّع |
|---|---|---|
| [[d - 1]] و [[d * 2]] و [[d < x]] و [[+d]] | [["number"]] | الرقم ([[valueOf()]]) |
| [[String(d)]] و template literal و [[join]] | [["string"]] | النص ([[toString()]]) |
| [[d + x]] و [[d == "نص"]] | [["default"]] | **النص**: ده الاستثناء |

أي object عادي بيعامل [["default"]] كأنه [["number"]]. الـ Date بالذات (هو و Symbol) عنده [[Symbol.toPrimitive]] خاص على [[Date.prototype]] بيعامل [["default"]] كـ [["string"]]، لأن المصممين شافوا إن [["الميعاد: " + d]] أشيع من إنك تجمع تاريخ على رقم.

~~~text الناتج
string number
1795253400000 true
~~~

- [[d + 1]]: نص (التاريخ كله وبعده [[1]]).
- [[d - 1]]: رقم.
- نادينا الـ method بنفسنا: [["number"]] رجّعت الرقم، و [["default"]] رجّعت نفس [[String(d)]].

---

## ٦. المقارنة: [[==]] بيقارن objects

~~~js
const a = new Date(Date.UTC(2026, 0, 1)), b = new Date(Date.UTC(2026, 0, 1));
console.log(a == b, a.getTime() === b.getTime(), a <= b);
~~~

~~~text الناتج
false true true
~~~

- [[a == b]]: الاتنين objects، و [[==]] بين objectين مش بيحوّل حاجة: بيسأل «نفس الـ object في الميموري؟» والإجابة لأ.
- [[a.getTime() === b.getTime()]]: أرقام، فبيقارن القيمة. **ده الصح.**
- [[a <= b]]: الـ [[<=]] بيبعت hint [["number"]] فبيقارن الأرقام. شغال، بس للمساواة استخدم [[getTime]].

~~~js
console.log(Date.now() - start >= 0);
~~~

~~~text الناتج
true
~~~

الطرح بين رقمين من [[Date.now()]]: الوقت اللي عدّى من أول المثال (صفر أو كام ms).

---

## ٧. الحدود و Invalid Date

| الحالة | اللي حصل (اتجرّب) |
|---|---|
| [[new Date(8.64e15)]] | آخر لحظة مسموحة: [[+275760-09-13T00:00:00.000Z]] |
| [[new Date(8.64e15 + 1)]] | برّه الحد، فـ [[getTime()]] بـ [[NaN]] |
| [[new Date(-1)]] | قبل الـ epoch بـ ms: [[1969-12-31T23:59:59.999Z]]، يعني السالب مسموح |
| [[new Date(1.5)]] | الكسور بتتقص: [[getTime()]] بـ 1 |
| [[copy.setTime("abc")]] | بيرجّع [[NaN]] والـ Date بقى Invalid Date من غير error |

والـ Invalid Date لسه [[instanceof Date]] و [[typeof]] بتاعه [["object"]]، فالفحص الوحيد السليم: [[Number.isNaN(d.getTime())]].

---

## الخلاصة

| عايز | استخدم |
|---|---|
| رقم اللحظة دي | [[Date.now()]] |
| الرقم اللي جوه Date | [[d.getTime()]] (أو [[+d]]) |
| تحط رقم جديد في نفس الـ object | [[d.setTime(ms)]]، وبيرجّع الرقم |
| الفرق بين لحظتين | [[b - a]] بالـ ms |
| هل لحظتين زي بعض | [[a.getTime() === b.getTime()]]، مش [[==]] |
| تزوّد مدة | [[new Date(a.getTime() + ms)]]، مش [[a + ms]] |`,
          lines: [
            R`بيعمل Date من رقم [[Date.UTC(...)]] رجّعه للحظة ٢١ نوفمبر 2026 الساعة 9:30 UTC (الشهر 10 = نوفمبر). استخدمنا UTC عشان الرقم يبقى واحد على أي جهاز.`,
            R`٣ طرق تقرا بيها نفس الرقم: [[getTime()]] و [[valueOf()]] والـ unary [[+]] اللي بتنادي [[valueOf]] من تحت. التلاتة بيطبعوا [[1795253400000]].`,
            R`[[Date.now()]] دالة static بترجّع رقم ms اللحظة الحالية من غير ما تعمل object، بنحفظه عشان نطرحه في آخر سطر.`,
            R`Date جديد على لحظة الـ epoch (رقم 0)، هنحط فيه رقم تاني في السطر الجاي.`,
            R`[[setTime]] بيحط الرقم في نفس الـ object ويرجّع الرقم الجديد (مش الـ Date)، و [[toISOString]] بتورينا اللحظة: [[2026-11-21T09:30:00.000Z]].`,
            R`طرح Date من Date: الـ [[-]] بيحوّل الاتنين لأرقام، فالناتج [[86400000]] = يوم بالـ ms.`,
            R`بيطبع [[string number]]: [[+]] بيبعت hint [["default"]] والـ Date بيرجّع نص فبيلزق، و [[-]] بيبعت [["number"]] فبيطرح.`,
            R`بنادي [[Symbol.toPrimitive]] بنفسنا: مع [["number"]] رجّعت الرقم، ومع [["default"]] رجّعت نفس نص [[String(d)]]، فبيطبع الرقم و [[true]].`,
            R`تاريخين بنفس اللحظة بالظبط، بس كل واحد object لوحده في الميموري.`,
            R`بيطبع [[false true true]]: [[==]] بيقارن objects فبيقول لأ، ومقارنة الأرقام بـ [[getTime]] بتقول آه، و [[<=]] بيحوّل لأرقام فبيقول آه.`,
            R`طرح رقمين من [[Date.now()]]: الوقت اللي عدّى من أول المثال، صفر أو كام ms، فالشرط [[true]].`,
          ],
          pre: [
            { to: "js/Date ومطبّاته", why: R`إن الـ Date رقم ms من الـ epoch، و [[new Date(a)]] للنسخ` },
            { to: "js/valueOf و toString و Symbol.toPrimitive", why: R`الـ hints التلاتة وترتيب [[valueOf]] و [[toString]] في أي object` },
          ],
          ref: [
            { t: "MDN: Date.now()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now" },
            { t: "MDN: Date.prototype.getTime()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime" },
            { t: "MDN: Date.prototype.valueOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf" },
            { t: "MDN: Date.prototype.setTime()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime" },
            { t: "MDN: Date.prototype[Symbol.toPrimitive]()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Symbol.toPrimitive" },
          ],
        },
        {
          cmd: "Date.UTC و Date.parse",
          title: "تعمل Date من أرقام أو نص إزاي، وأنهي نص يتفهم UTC وأنهي يتفهم بتوقيت الجهاز؟",
          desc: R`فيه ٥ طرق تعمل بيها Date: [[new Date()]] (دلوقتي)، و [[new Date(ms)]]، و [[new Date(y, m, d, h, mi, s, ms)]] (الأرقام **بتوقيت الجهاز**)، و [[new Date(Date.UTC(y, m, ...))]] (نفس الأرقام **بتوقيت UTC**)، و [[new Date(نص)]] اللي بيستخدم نفس قواعد [[Date.parse(نص)]]. و [[Date.UTC]] و [[Date.parse]] الاتنين بيرجّعوا **رقم ms** مش Date، و [[Date.parse]] بيرجّع [[NaN]] للنص اللي مفهمهوش.

النص الآمن الوحيد هو ISO: [["2026-04-24"]] (تاريخ بس) بيتفهم UTC، و [["2026-04-24T10:30"]] (معاه وقت من غير Z) بيتفهم بتوقيت الجهاز، و [["2026-04-24T10:30Z"]] أو [[+03:00]] في الآخر بيتفهموا بالظبط. أي شكل تاني (زي [["24/04/2026"]] أو [["2026-04-24 10:30"]] بمسافة) مش في المواصفات، وكل engine بيعمل فيه اللي هو عايزه.`,
          example: R`const local = new Date(2026, 3, 24, 10, 30);
const utcMs = Date.UTC(2026, 3, 24, 10, 30);
console.log(local.toISOString(), new Date(utcMs).toISOString());
console.log(Date.parse("2026-04-24"), Date.parse("2026-04-24T10:30"));
console.log(Date.parse("2026-04-24T10:30Z"), Date.parse("2026-04-24T10:30+03:00"));
console.log(Date.parse("24/04/2026"), new Date(99, 0, 1).getFullYear());
console.log(typeof Date(), typeof new Date());
console.log(new Date(2026, 0, 1, 25).getDate(), new Date(null).getTime(), new Date(undefined).getTime());`,
          try: R`شغّل المثال ٣ مرات: [[TZ=UTC node f.js]] في Git Bash، و [[$env:TZ="Africa/Cairo"; node f.js]] و [[$env:TZ="America/New_York"; node f.js]] في PowerShell. حط علامة على كل رقم اتغيّر بين التلاتة وقول ليه. وبعدين اكتب [[parseISOStrict(s)]] بتقبل ISO كامل بـ Z أو offset بس، وترجّع Date أو [[null]] (ولا تقبل [["2026-02-30T10:00Z"]]).`,
          sol: R`~~~text الناتج: TZ=UTC
2026-04-24T10:30:00.000Z 2026-04-24T10:30:00.000Z
1776988800000 1777026600000
1777026600000 1777015800000
NaN 1999
string object
2 0 NaN
~~~

~~~text الناتج: $env:TZ="Africa/Cairo" (أول سطرين بس، والباقي زي UTC)
2026-04-24T07:30:00.000Z 2026-04-24T10:30:00.000Z
1776988800000 1777015800000
~~~

~~~text الناتج: $env:TZ="America/New_York" (أول سطرين بس)
2026-04-24T14:30:00.000Z 2026-04-24T10:30:00.000Z
1776988800000 1777041000000
~~~

اتغيّر رقمين بس: [[local]] (أرقام محلية) و [[Date.parse("2026-04-24T10:30")]] (وقت من غير Z = محلي). القاهرة يوم ٢٤ أبريل 2026 بقت UTC+3 (أول يوم صيفي)، فـ 10:30 عندها = 07:30 UTC. ونيويورك UTC−4، فـ 10:30 عندها = 14:30 UTC. أما [[Date.UTC]] والتاريخ لوحده والنصوص اللي فيها Z أو offset: نفس الرقم في الـ ٣.

[[parseISOStrict]] في التمرين التاني تحت، بحلّه وناتجه.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بتوقيت القاهرة، أنهي من دول هيطلع [[2026-04-24T00:00:00.000Z]] وأنهي لأ؟ اكتب توقعك لكل سطر، وبعدين شغّل بالقاهرة ونيويورك.

~~~js
for (const s of ["2026-04-24", "2026-04-24T00:00", "2026-04-24T00:00Z", "2026-04-24 00:00", "2026-04-24T00:00+02:00", "April 24, 2026"]) console.log(s.padEnd(24), new Date(s).toISOString());
~~~`, done: R`توقعت إن [["2026-04-24"]] و [["2026-04-24T00:00Z"]] بس اللي ثابتين، وإن الباقي اتأثر بالتوقيت أو بالـ offset المكتوب، وعرفت ليه [["2026-04-24T00:00"]] في القاهرة مش [[22:00Z]] زي ما متوقع لـ UTC+3.`, sol: R`~~~text الناتج: $env:TZ="Africa/Cairo"
2026-04-24               2026-04-24T00:00:00.000Z
2026-04-24T00:00         2026-04-23T22:00:00.000Z
2026-04-24T00:00Z        2026-04-24T00:00:00.000Z
2026-04-24 00:00         2026-04-23T22:00:00.000Z
2026-04-24T00:00+02:00   2026-04-23T22:00:00.000Z
April 24, 2026           2026-04-23T22:00:00.000Z
~~~

~~~text الناتج: $env:TZ="America/New_York"
2026-04-24               2026-04-24T00:00:00.000Z
2026-04-24T00:00         2026-04-24T04:00:00.000Z
2026-04-24T00:00Z        2026-04-24T00:00:00.000Z
2026-04-24 00:00         2026-04-24T04:00:00.000Z
2026-04-24T00:00+02:00   2026-04-23T22:00:00.000Z
April 24, 2026           2026-04-24T04:00:00.000Z
~~~

- **ثابتين في البلدين:** التاريخ لوحده (UTC بالمواصفات)، و [[Z]]، و [[+02:00]] (الـ offset مكتوب فمحدش بيخمّن).
- **اتغيّروا:** الوقت من غير Z، والمسافة بدل [[T]]، و [["April 24, 2026"]]. الاتنين الأخرانيين مش ISO أصلًا، و V8 قرر يفهمهم محلي (engine تاني ممكن يقرر غير كده أو يرجّع Invalid Date).
- **المفاجأة:** في القاهرة كان المفروض نص الليل المحلي يبقى [[21:00Z]] (لأن UTC+3)، بس طلع [[22:00Z]]. السبب: ٢٤ أبريل 2026 هو يوم بداية الصيفي في مصر، والساعة نطت من 00:00 لـ 01:00، فنص الليل **مش موجود**. V8 حسبه بالـ offset القديم (+2)، فاللحظة دي على الحيطة 01:00. درس «Date: getTimezoneOffset والتوقيت الصيفي» فيه التفاصيل.` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[parseISOStrict(s)]]: بتقبل ISO كامل بس (تاريخ و [[T]] ووقت بالدقايق أو الثواني أو الـ ms، وبعدين [[Z]] أو [[±HH:MM]])، وترجّع Date أو [[null]]. لازم ترفض الوقت من غير منطقة، والتاريخ لوحده، و [["2026-02-30T10:00Z"]] (V8 بيقبلها ويرحّلها)، والساعة 25، وأي حاجة مش نص. اكتب الحل في مربع «شغّل واختبر» تحت.`, done: R`الاختبارات اللي تحت عدّت، و [["2026-04-24T23:30-05:00"]] رجعت [[2026-04-25T04:30:00.000Z]] (اليوم اللي بعده في UTC بس اليوم المكتوب سليم فاتقبلت).`, sol: R`~~~js strict.js
const ISO_FULL = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/;
function parseISOStrict(s) {
  if (typeof s !== "string" || !ISO_FULL.test(s)) return null;
  const ms = Date.parse(s);
  if (Number.isNaN(ms)) return null;
  const [y, m, d] = s.slice(0, 10).split("-").map(Number);
  const offset = s.endsWith("Z") ? 0 : (s.at(-6) === "-" ? -1 : 1) * (Number(s.slice(-5, -3)) * 60 + Number(s.slice(-2)));
  const wall = new Date(ms + offset * 60000);
  if (wall.getUTCFullYear() !== y || wall.getUTCMonth() !== m - 1 || wall.getUTCDate() !== d) return null;
  return new Date(ms);
}
for (const s of ["2026-04-24T10:30:00Z", "2026-04-24T10:30+03:00", "2026-04-24T10:30", "2026-04-24", "2026-02-30T10:00Z", "2026-04-24T25:00Z", "2026-04-24T23:30-05:00", 42]) {
  const r = parseISOStrict(s); console.log(String(s).padEnd(24), r ? r.toISOString() : null);
}
~~~

~~~text الناتج: node strict.js (نفس الناتج بأي TZ)
2026-04-24T10:30:00Z     2026-04-24T10:30:00.000Z
2026-04-24T10:30+03:00   2026-04-24T07:30:00.000Z
2026-04-24T10:30         null
2026-04-24               null
2026-02-30T10:00Z        null
2026-04-24T25:00Z        null
2026-04-24T23:30-05:00   2026-04-25T04:30:00.000Z
42                       null
~~~

**إزاي شغال:**

1. **الـ regex الأول:** بيرفض أي شكل مش ISO كامل قبل ما [[Date.parse]] يلحق «يخمّن». [[(Z|[+-]\d{2}:\d{2})$]] بيجبر وجود المنطقة.
2. **[[Date.parse]] بيرجّع NaN؟** الساعة 25 والشهر 13 بيقعوا هنا.
3. **التاريخ اترحّل؟** [[Date.parse("2026-02-30T10:00Z")]] بيرجّع رقم ٢ مارس من غير اعتراض. فبنرجّع «الوقت اللي على الحيطة» في المنطقة المكتوبة: [[ms + offset]]، ونقرا اليوم بالـ [[getUTC…]]، ونقارنه باليوم المكتوب في النص. لو اختلف يبقى اليوم مش موجود.
4. **الـ offset:** [[s.at(-6)]] هو حرف الإشارة في [[+03:00]]، و [[s.slice(-5, -3)]] الساعات و [[s.slice(-2)]] الدقايق.

الغلطة اللي ناس كتير بتقع فيها: إنها تكتفي بـ [[!Number.isNaN(Date.parse(s))]] على إنه «تاريخ سليم»، و ٣٠ فبراير بيعدّي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فورم فيها [[<input type="date">]] (قيمته زي [["2026-04-24"]])، والكود بيعمل [[const due = new Date(input.value)]] ويعرض [[due.getDate()]]. يوزرز في أمريكا بيقولوا التاريخ بيظهر يوم قبل اللي اختاروه. صلّحه من غير مكتبة.`, done: R`بتوقيت نيويورك الكود القديم بيطبع [[23]] و [[Thu Apr 23 2026]]، والمصلّح بيطبع [[24]] و [[Fri Apr 24 2026]]، وبالقاهرة الاتنين ٢٤.`, sol: R`~~~js form-date.js
const value = "2026-04-24";
const wrong = new Date(value);
const [y, m, d] = value.split("-").map(Number);
const right = new Date(y, m - 1, d);
console.log(wrong.getDate(), right.getDate(), wrong.toDateString(), right.toDateString());
~~~

~~~text الناتج: $env:TZ="America/New_York"
23 24 Thu Apr 23 2026 Fri Apr 24 2026
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
24 24 Fri Apr 24 2026 Fri Apr 24 2026
~~~

**السبب:** [["2026-04-24"]] لوحدها = نص ليل **UTC**. نيويورك متأخرة ٤ ساعات، فنص الليل UTC عندها ٨ بالليل يوم ٢٣، و [[getDate()]] بيقرا بتوقيت الجهاز. في مصر (قدام UTC) الباج مش باين، فالمطوّر ميشوفهوش.

**التصليح:** فك النص لأرقام وابنيه بـ [[new Date(y, m - 1, d)]]: كده بقى نص ليل **محلي**. والـ [[m - 1]] لأن الشهر في Date من 0. (وفي المتصفح فيه [[input.valueAsDate]] بس ده بيرجّع UTC برضه، فنفس المشكلة.)` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من صفحة [[Date.UTC()]] على MDN جاوب: (١) بيحصل إيه لو السنة من 0 لـ 99؟ (٢) ينفع تبعت السنة بس؟ (٣) لو مبعتّش حاجة خالص؟ وبعدين اتأكد بالتشغيل، ولو محتاج سنة 5 ميلادي بجد تعملها إزاي؟`, done: R`جاوبت الـ ٣ من الصفحة، والتشغيل أكّدهم: [[Date.UTC(5, 0, 1)]] بقت 1905، و [[Date.UTC(2026)]] بقت أول يناير، و [[Date.UTC()]] بـ [[NaN]]، وعملت سنة 5 بـ [[setUTCFullYear(5)]].`, sol: R`**الإجابة من MDN:** (١) السنة من 0 لـ 99 بتتفهم **1900 + السنة** (ورث قديم من أيام السنين برقمين)، ونفس الكلام في [[new Date(y, m)]]. (٢) آه: من ES2017 ينفع [[Date.UTC(year)]] لوحدها والباقي بيتحسب أول الشهر ونص الليل. (٣) [[NaN]].

~~~js utc-docs.js
console.log(new Date(Date.UTC(5, 0, 1)).toISOString(), new Date(Date.UTC(2026)).toISOString(), Date.UTC());
const year5 = new Date(Date.UTC(2000, 0, 1));
year5.setUTCFullYear(5);
console.log(year5.toISOString());
~~~

~~~text الناتج: TZ=UTC node utc-docs.js
1905-01-01T00:00:00.000Z 2026-01-01T00:00:00.000Z NaN
0005-01-01T00:00:00.000Z
~~~

[[setUTCFullYear]] (و [[setFullYear]]) مش عندهم قاعدة الـ 1900، فدي الطريقة الوحيدة لسنين أقل من 100. وده نادر جدًا في شغل حقيقي، بس الفخ بيطلع لو يوزر كتب السنة برقمين ([["26"]]) وانت عملت [[Date.UTC(26, ...)]]: هتطلع 1926.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** عندك تواريخ جاية من ٧ APIs مختلفة: [["2026-11-21"]] و [["2026-11-21T09:00:00Z"]] و [["2026-11-21T11:00:00+02:00"]] و [["2026-11-21T11:00"]] و [["21/11/2026"]] و [["Sat, 21 Nov 2026 09:00:00 GMT"]] و [["2026-11-21 11:00"]]. اكتب [[classify(s)]] بترجّع [["utc-date"]] أو [["exact"]] أو [["local"]] أو [["non-standard"]]، واطبع جنب كل واحد ناتج [[new Date(s)]] بتوقيت القاهرة ونيويورك، من غير ما البرنامج يقع.`, done: R`الجدول طلع، والسطور اللي اتغيّرت بين القاهرة ونيويورك هي [["local"]] و [["2026-11-21 11:00"]] بس، و [["21/11/2026"]] بيطبع Invalid Date مش [[RangeError]].`, sol: R`~~~js classify.js
function classify(s) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return "utc-date";
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/.test(s)) return "exact";
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(s)) return "local";
  return "non-standard";
}
const fromApis = ["2026-11-21", "2026-11-21T09:00:00Z", "2026-11-21T11:00:00+02:00", "2026-11-21T11:00", "21/11/2026", "Sat, 21 Nov 2026 09:00:00 GMT", "2026-11-21 11:00"];
const show = d => (Number.isNaN(d.getTime()) ? "Invalid Date" : d.toISOString());
for (const s of fromApis) console.log(s.padEnd(30), classify(s).padEnd(13), show(new Date(s)));
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
2026-11-21                     utc-date      2026-11-21T00:00:00.000Z
2026-11-21T09:00:00Z           exact         2026-11-21T09:00:00.000Z
2026-11-21T11:00:00+02:00      exact         2026-11-21T09:00:00.000Z
2026-11-21T11:00               local         2026-11-21T09:00:00.000Z
21/11/2026                     non-standard  Invalid Date
Sat, 21 Nov 2026 09:00:00 GMT  non-standard  2026-11-21T09:00:00.000Z
2026-11-21 11:00               non-standard  2026-11-21T09:00:00.000Z
~~~

~~~text الناتج: $env:TZ="America/New_York" (السطور اللي اتغيّرت بس)
2026-11-21T11:00               local         2026-11-21T16:00:00.000Z
2026-11-21 11:00               non-standard  2026-11-21T16:00:00.000Z
~~~

- **[[show]]:** أول نسخة كانت [[new Date(s).toISOString()]] على طول، ووقعت عند [["21/11/2026"]] بـ [[RangeError: Invalid time value]]. [[toISOString]] هي الطريقة الوحيدة في Date اللي بترمي error على Invalid Date، فلازم تفحص قبلها.
- **الـ HTTP date** ([["Sat, 21 Nov 2026 09:00:00 GMT"]]، الشكل اللي بييجي في header زي [[Last-Modified]]) مش ISO، بس V8 فهمه صح عشان فيه [[GMT]] صريح. المواصفات بتقول الشكل اللي [[toUTCString()]] بيطلّعه لازم [[Date.parse]] يقبله، فده آمن.
- **[["2026-11-21 11:00"]]** (مسافة بدل T): شكل الداتابيز المشهور. V8 فهمه محلي، بس مش مضمون في كل engine. حوّله لـ [[T]] وزوّد المنطقة بنفسك.` },
          ],
          check: {
            lang: "js",
            starter: R`function parseISOStrict(s) {
  const ms = Date.parse(s);
  return Number.isNaN(ms) ? null : new Date(ms);
}`,
            tests: R`const iso = s => { const r = parseISOStrict(s); return r ? r.toISOString() : null; };
test("Z", () => expect(iso("2026-04-24T10:30:00Z")).toBe("2026-04-24T10:30:00.000Z"));
test("offset موجب", () => expect(iso("2026-04-24T10:30+03:00")).toBe("2026-04-24T07:30:00.000Z"));
test("offset سالب بيعدّي اليوم", () => expect(iso("2026-04-24T23:30-05:00")).toBe("2026-04-25T04:30:00.000Z"));
test("ms", () => expect(iso("2026-04-24T10:30:00.250Z")).toBe("2026-04-24T10:30:00.250Z"));
test("وقت من غير منطقة ← null", () => expect(iso("2026-04-24T10:30")).toBe(null));
test("تاريخ بس ← null", () => expect(iso("2026-04-24")).toBe(null));
test("30 فبراير ← null", () => expect(iso("2026-02-30T10:00Z")).toBe(null));
test("الساعة 25 ← null", () => expect(iso("2026-04-24T25:00Z")).toBe(null));
test("شكل تاني ← null", () => expect(iso("24/04/2026 10:30")).toBe(null));
test("مش نص ← null", () => expect(iso(1777026600000)).toBe(null));
test("29 فبراير في سنة كبيسة", () => expect(iso("2028-02-29T00:00Z")).toBe("2028-02-29T00:00:00.000Z"));`,
            solution: R`const ISO_FULL = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/;
function parseISOStrict(s) {
  if (typeof s !== "string" || !ISO_FULL.test(s)) return null;
  const ms = Date.parse(s);
  if (Number.isNaN(ms)) return null;
  const [y, m, d] = s.slice(0, 10).split("-").map(Number);
  const offset = s.endsWith("Z") ? 0 : (s.at(-6) === "-" ? -1 : 1) * (Number(s.slice(-5, -3)) * 60 + Number(s.slice(-2)));
  const wall = new Date(ms + offset * 60000);
  if (wall.getUTCFullYear() !== y || wall.getUTCMonth() !== m - 1 || wall.getUTCDate() !== d) return null;
  return new Date(ms);
}`
          },
          flag: "script",
          deep: {
            why: R`كل تاريخ بيدخل برنامجك جاي من حتة: فورم، أو API، أو داتابيز، أو ملف. والغلطة في اللحظة دي (نص اتفهم بتوقيت غلط، أو تاريخ مش موجود اتقبل) بتمشي مع الداتا لحد التقرير أو الإيميل أو الفاتورة. و [[Date.UTC]] هو الطريقة اللي بتبني بيها لحظة من أرقام من غير ما توقيت السيرفر يدخل.`,
            how: R`[[new Date(y, m, d, h, mi, s, ms)]] بيحسب «الوقت ده على الحيطة في توقيت الجهاز» وبيحوّله لـ ms. أي رقم برّه مداه بيترحّل ([[new Date(2026, 0, 1, 25)]] = ٢ يناير الساعة 1)، والسنة من 0 لـ 99 بتبقى 1900+. ولو الوقت مش موجود (ساعة اتنطّت) V8 بيستخدم الـ offset اللي قبل التغيير، ولو متكرر بياخد المرة الأولى. [[Date.UTC]] نفس الحساب بالظبط بس من غير توقيت، وبيرجّع الرقم.

[[new Date(نص)]] و [[Date.parse(نص)]] بيجرّبوا الأول شكل ISO 8601 المبسّط اللي في المواصفات (Date Time String Format)، ولو مش هو بيروحوا لـ «fallback» خاص بكل engine. في V8: [["2026-4-24"]] و [["April 24, 2026"]] و [["04/24/2026"]] اتفهموا محلي، و [["24/04/2026"]] Invalid Date، و [["0"]] بقت سنة 2000 (!). و [["2026-02-30"]] اتقبلت وبقت ٢ مارس، و [["2026-02-32"]] بس هي اللي NaN. و [[new Date(null)]] = الـ epoch (null بيتحوّل 0)، و [[new Date(undefined)]] Invalid Date، و [[new Date(true)]] = 1 ms. وأي ms أكتر من ٣ أرقام بتتقص: [["10:00:00.123456Z"]] بقت [[.123]]. ونفس النتايج دي طلعت في Chrome 157 على نفس الجهاز (نفس V8). و [[Date()]] من غير [[new]] بيرجّع **نص** اللحظة الحالية مش Date.`,
            when: R`[[Date.UTC]] لما معاك أرقام وعارف إنها UTC، أو لما بتحسب بأيام التقويم ومش عايز التوقيت الصيفي يدخل. و [[new Date(y, m, d)]] لما الأرقام جاية من يوزر وقصده توقيته (الفورم في المتصفح). و [[Date.parse]] لما عايز الرقم بس من نص ISO كامل ومش محتاج object. ولأي نص جاي من برّه: افحص شكله الأول بـ regex.`,
            mistakes: R`[[new Date("2026-04-24")]] لقيمة [[<input type="date">]] (يوم قبل في أمريكا). و [[Date.parse(x) > 0]] كفحص (تواريخ قبل ١٩٧٠ سالبة). و [[new Date(year, month)]] والشهر من 1. و [[Date.UTC(26, ...)]] لسنة برقمين. و [["2026-11-21 11:00"]] بمسافة من الداتابيز من غير ما تحدد المنطقة. و [[new Date(dateObj.toString())]] للنسخ (بيضيّع الـ ms، استخدم [[new Date(dateObj)]]). وفي الانترفيو: «إيه الفرق بين [[new Date(2026, 3, 24)]] و [[new Date("2026-04-24")]]؟» الأول نص ليل محلي والتاني نص ليل UTC.`
          },
          teach: R`## الفكرة: ٥ طرق، وكل واحدة بتفترض توقيت

أي Date بيتعمل بيبقى رقم ms. السؤال دايمًا: الأرقام أو النص اللي ادّيتهوله **بتوقيت مين**؟ الدرس ده بيعدّي على كل طريقة وإجابتها.

> الناتج اتشغّل بـ Node 24.22 على Windows ٣ مرات: [[TZ=UTC]] من Git Bash، و [[$env:TZ="Africa/Cairo"]] و [[$env:TZ="America/New_York"]] من PowerShell 7. كل ناتج مكتوب عليه اتشغّل بأنهي واحد.

---

## ١. [[new Date(y, m, d, h, mi)]]: أرقام بتوقيت الجهاز

~~~js
const local = new Date(2026, 3, 24, 10, 30);
~~~

السنة، والشهر من 0 (3 = أبريل)، واليوم، والساعة، والدقيقة. وفيه كمان الثواني والـ ms لو عايز، واللي مش مكتوب بيبقى أوله (اليوم 1، والباقي 0). المعنى: «الساعة 10:30 يوم ٢٤ أبريل **على ساعة الحيطة هنا**».

---

## ٢. [[Date.UTC(...)]]: نفس الأرقام بتوقيت UTC

~~~js
const utcMs = Date.UTC(2026, 3, 24, 10, 30);
console.log(local.toISOString(), new Date(utcMs).toISOString());
~~~

[[Date.UTC]] بياخد نفس الأرقام بنفس الترتيب، بس بيفهمها UTC، وبيرجّع **رقم** (مش Date)، فبنلفّه بـ [[new Date(...)]].

~~~text الناتج: TZ=UTC
2026-04-24T10:30:00.000Z 2026-04-24T10:30:00.000Z
~~~

~~~text الناتج: القاهرة
2026-04-24T07:30:00.000Z 2026-04-24T10:30:00.000Z
~~~

~~~text الناتج: نيويورك
2026-04-24T14:30:00.000Z 2026-04-24T10:30:00.000Z
~~~

التاني ثابت في التلاتة، والأول بيتحرك: 10:30 في القاهرة (UTC+3 اليوم ده) = 07:30 UTC، وفي نيويورك (UTC−4) = 14:30 UTC.

| | [[new Date(y, m, ...)]] | [[Date.UTC(y, m, ...)]] |
|---|---|---|
| الأرقام بتوقيت | الجهاز | UTC |
| بيرجّع | Date | رقم ms |
| الشهر | من 0 | من 0 |
| السنة 0–99 | 1900+ | 1900+ |
| أقل حاجة | سنة وشهر | سنة بس ([[Date.UTC(2026)]]) |

---

## ٣. [[Date.parse]]: نص لرقم

~~~js
console.log(Date.parse("2026-04-24"), Date.parse("2026-04-24T10:30"));
console.log(Date.parse("2026-04-24T10:30Z"), Date.parse("2026-04-24T10:30+03:00"));
~~~

[[Date.parse(نص)]] بيرجّع رقم ms (أو [[NaN]])، و [[new Date(نص)]] بيستخدم نفس القواعد بالظبط بس بيرجّع Date.

~~~text الناتج: TZ=UTC
1776988800000 1777026600000
1777026600000 1777015800000
~~~

~~~text الناتج: القاهرة (السطر الأول)
1776988800000 1777015800000
~~~

| النص | بيتفهم بتوقيت | ثابت؟ |
|---|---|---|
| [["2026-04-24"]] | UTC (قاعدة في المواصفات للتاريخ لوحده) | آه |
| [["2026-04-24T10:30"]] | الجهاز (وقت من غير منطقة) | لأ: اتغيّر في القاهرة |
| [["2026-04-24T10:30Z"]] | UTC، الـ [[Z]] بتقول كده | آه |
| [["2026-04-24T10:30+03:00"]] | +3، فالـ UTC = 07:30 | آه |

الرقم الأخير (+03:00) طلع زي ناتج [[local]] في القاهرة بالظبط ([[1777015800000]]): نفس اللحظة اتكتبت بطريقتين.

---

## ٤. اللي بيرجّع NaN، والسنين برقمين

~~~js
console.log(Date.parse("24/04/2026"), new Date(99, 0, 1).getFullYear());
~~~

~~~text الناتج
NaN 1999
~~~

- [["24/04/2026"]]: مش ISO، و V8 بيحاول يقراه أمريكي (شهر/يوم) والشهر 24 مش موجود، فـ [[NaN]]. مفيش error: لازم تفحص.
- [[new Date(99, 0, 1)]]: السنة 99 اتفهمت 1999. أي سنة من 0 لـ 99 بيتزوّد عليها 1900.

### جدول V8 للأشكال اللي برّه المواصفات

ده سلوك V8 (Node 24.22 و Chrome 157 طلّعوا نفس الحاجة بتوقيت القاهرة)، مش مضمون في Firefox أو Safari:

| النص | V8 فهمه (القاهرة) |
|---|---|
| [["04/24/2026"]] | ٢٤ أبريل محلي (أمريكي: شهر/يوم) |
| [["24/04/2026"]] | Invalid Date |
| [["2026-4-24"]] | ٢٤ أبريل **محلي** (من غير الأصفار مبقاش ISO) |
| [["2026-04-24 10:00"]] | محلي (المسافة بدل [[T]]) |
| [["April 24, 2026"]] | محلي |
| [["2026-02-30"]] | ٢ مارس UTC (اتقبل واترحّل) |
| [["0"]] | سنة 2000 محلي (!) |

---

## ٥. [[Date()]] من غير [[new]]، والقيم الغريبة

~~~js
console.log(typeof Date(), typeof new Date());
console.log(new Date(2026, 0, 1, 25).getDate(), new Date(null).getTime(), new Date(undefined).getTime());
~~~

~~~text الناتج
string object
2 0 NaN
~~~

- [[Date()]] كدالة عادية بيرجّع **نص** اللحظة الحالية (زي [[new Date().toString()]]) ومش بيبص على أي argument. نادرًا ما ده اللي انت عايزه.
- الساعة 25 اترحّلت لـ ٢ يناير الساعة 1.
- [[new Date(null)]]: الـ null بيتحوّل 0، فبقى الـ epoch. يعني قيمة فاضية من الداتابيز بتبقى «١ يناير ١٩٧٠» بدل ما تبقى خطأ.
- [[new Date(undefined)]]: Invalid Date. لاحظ الفرق: [[new Date()]] من غير argument خالص = دلوقتي، بس [[undefined]] صريح = Invalid.

---

## ٦. تشغّل بتوقيت تاني إزاي (Windows)

| الشِل | الأمر | اشتغل؟ |
|---|---|---|
| PowerShell 7 و Windows PowerShell 5.1 | [[$env:TZ="Africa/Cairo"; node f.js]] | آه، أي اسم IANA |
| Git Bash | [[TZ=UTC node f.js]] | آه مع [[UTC]] بس |
| Git Bash | [[TZ=America/New_York node f.js]] | لأ: [[process.env.TZ]] وصل [[undefined]] وفضل توقيت الجهاز |
| Linux و macOS و WSL | [[TZ=Africa/Cairo node f.js]] | آه (من الوثائق ودرس «Date ومطبّاته») |

وجوه البرنامج نفسه: [[process.env.TZ = "Africa/Cairo"]] قبل أي Date بيشتغل في Node (المشروع الكبير في الوحدة دي بيعتمد عليه).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| لحظة من أرقام اليوزر (توقيته) | [[new Date(y, m - 1, d, h, mi)]] |
| لحظة من أرقام UTC | [[new Date(Date.UTC(y, m - 1, d, h, mi))]] |
| رقم ms من نص ISO كامل | [[Date.parse("...Z")]] |
| تاريخ من [[<input type="date">]] | فكّه لأرقام، مش [[new Date(value)]] |
| تفحص النص | regex الأول، وبعدين [[Number.isNaN]]، وبعدين قارن الأجزاء |`,
          lines: [
            R`Date من أرقام **بتوقيت الجهاز**: ٢٤ أبريل 2026 الساعة 10:30 على ساعة الحيطة هنا. الشهر 3 = أبريل لأن العدّ من 0.`,
            R`[[Date.UTC]] بنفس الأرقام بس بيفهمها UTC، وبيرجّع **رقم ms** مش Date. ده اللي بتستخدمه لما الأرقام اللي معاك UTC.`,
            R`بيطبع اللحظتين بـ UTC: التانية [[10:30Z]] دايمًا، والأولى بتتغيّر حسب توقيت الجهاز ([[07:30Z]] في القاهرة و [[14:30Z]] في نيويورك).`,
            R`[[Date.parse]] بيرجّع رقم: التاريخ لوحده بيتفهم UTC فثابت، والتاريخ ومعاه وقت من غير Z بيتفهم محلي فبيتغيّر من جهاز لجهاز.`,
            R`نصين محددين: [[Z]] = UTC، و [[+03:00]] = متقدم ٣ ساعات، فالتاني أقل بـ ٣ ساعات بالـ ms. الاتنين ثابتين على أي جهاز.`,
            R`[["24/04/2026"]] مش ISO و V8 قراه شهر/يوم فرجّع [[NaN]] من غير error، والسنة 99 اتفهمت 1999 لأن أي سنة من 0 لـ 99 بيتزوّد عليها 1900.`,
            R`[[Date()]] من غير [[new]] بيرجّع **نص** مش object، فالناتج [[string object]]. استخدم [[new Date()]] دايمًا.`,
            R`الساعة 25 اترحّلت لليوم اللي بعده ([[2]])، و [[null]] بقت 0 يعني الـ epoch، و [[undefined]] بقت Invalid Date فـ [[getTime]] بـ [[NaN]].`,
          ],
          pre: [
            "js/Date: getTime و valueOf و Symbol.toPrimitive",
            { to: "js/Date ومطبّاته", why: R`جدول الـ parsing المختصر والـ overflow في أبسط صوره` },
            { to: "js/regex: classes و quantifiers", why: R`الـ regex اللي بنفحص بيه شكل النص قبل [[Date.parse]]` },
          ],
          ref: [
            { t: "MDN: Date.UTC()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC" },
            { t: "MDN: Date.parse()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse" },
            { t: "MDN: Date() constructor", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date" },
            { t: "ECMAScript: Date Time String Format", url: "https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-time-string-format" },
          ],
        },
        {
          cmd: "Date: الـ getters و getUTC",
          title: "تقرا السنة والشهر واليوم والساعة من Date إزاي، وإمتى getHours وإمتى getUTCHours؟",
          desc: R`فيه ٨ getters بيقروا أجزاء اللحظة **بتوقيت الجهاز**: [[getFullYear]] و [[getMonth]] (من 0) و [[getDate]] (اليوم في الشهر) و [[getDay]] (يوم الأسبوع، 0 = الحد) و [[getHours]] و [[getMinutes]] و [[getSeconds]] و [[getMilliseconds]]. ولكل واحد توأم بيقرا **بتوقيت UTC**: [[getUTCFullYear]] و [[getUTCMonth]] و [[getUTCDate]] و [[getUTCDay]] و [[getUTCHours]] و [[getUTCMinutes]] و [[getUTCSeconds]] و [[getUTCMilliseconds]].

نفس اللحظة ممكن تبقى يوم وشهر وسنة مختلفين بين النسختين: [["2026-12-31T22:45Z"]] في القاهرة الجمعة ١ يناير 2027، وفي UTC الخميس ٣١ ديسمبر 2026. استخدم المحلية لما بتعرض لليوزر على جهازه، و UTC لما بتحسب بأيام تقويم أو على سيرفر.`,
          example: R`const d = new Date("2026-12-31T22:45:30.250Z");
console.log(d.getFullYear(), d.getMonth(), d.getDate(), d.getDay());
console.log(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
console.log(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCDay());
console.log(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
const days = ["الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت"];
console.log(days[d.getDay()], days[d.getUTCDay()]);
const bad = new Date("x");
console.log(bad.getFullYear(), bad.getDay());`,
          try: R`شغّل المثال بالقاهرة ونيويورك و UTC، واعمل جدول: كل getter وقيمته في التلاتة. أنهي getters بس اللي فضلوا ثابتين في كل التوقيتات؟ وبعدين اكتب [[formatLocal(d)]] بترجّع [["YYYY-MM-DD HH:mm:ss"]] بتوقيت الجهاز من الـ getters بس.`,
          sol: R`~~~text الناتج: $env:TZ="Africa/Cairo"
2027 0 1 5
0 45 30 250
2026 11 31 4
22 45 30 250
الجمعة الخميس
NaN NaN
~~~

~~~text الناتج: $env:TZ="America/New_York"
2026 11 31 4
17 45 30 250
2026 11 31 4
22 45 30 250
الخميس الخميس
NaN NaN
~~~

~~~text الناتج: TZ=UTC
2026 11 31 4
22 45 30 250
2026 11 31 4
22 45 30 250
الخميس الخميس
NaN NaN
~~~

الثابتين في التلاتة: كل الـ [[getUTC…]]، و [[getMinutes]] و [[getSeconds]] و [[getMilliseconds]] المحلية (لأن فرق القاهرة ونيويورك ساعات كاملة. في الهند +5:30 الدقايق كمان بتتغيّر). و [[formatLocal]] في التمرين التاني تحت.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بتوقيت نيويورك (UTC−5 في مارس قبل الصيفي بتاعهم)، الـ ٦ أرقام دول هيطلعوا إيه؟

~~~js
const d = new Date("2026-03-01T03:30:00Z");
console.log(d.getDate(), d.getUTCDate(), d.getDay(), d.getUTCDay(), d.getHours(), d.getMonth());
~~~`, done: R`كتبت [[28 1 6 0 22 1]] قبل التشغيل وطلع كده، وتقدر تقول ليه الشهر المحلي [[1]] (فبراير) والـ UTC مارس.`, sol: R`~~~text الناتج: $env:TZ="America/New_York"
28 1 6 0 22 1
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
1 1 0 0 5 2
~~~

3:30 الفجر UTC يوم ١ مارس = 10:30 بالليل يوم ٢٨ فبراير في نيويورك (−5). فـ [[getDate()]] بـ 28 و [[getMonth()]] بـ 1 (فبراير) و [[getDay()]] بـ 6 (السبت)، والـ UTC: يوم 1 والحد (0). وفي القاهرة (+2) بقت 5:30 الصبح يوم ١ مارس، فالمحلي والـ UTC نفس اليوم.

اللي يتعلّم: أول الشهر وآخره وأول السنة هما اللي بيكشفوا الفرق، عشان كده اختبر كودك على لحظة قريبة من نص الليل UTC.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[formatLocal(d)]] بترجّع [["YYYY-MM-DD HH:mm:ss"]] بتوقيت الجهاز، و [[formatUTC(d)]] بترجّع [["YYYY-MM-DD HH:mm:ss.SSS"]] بـ UTC. من غير [[toISOString]] ولا Intl: getters و [[padStart]] بس. واكتب [[formatUTC]] في مربع «شغّل واختبر» تحت.`, done: R`[[formatUTC(new Date("2026-12-31T22:45:30.250Z"))]] بترجّع [["2026-12-31 22:45:30.250"]] في أي توقيت، و [[formatLocal]] بنفس اللحظة في القاهرة [["2027-01-01 00:45:30"]] وفي نيويورك [["2026-12-31 17:45:30"]]، وكل رقم من رقمين (5 بتبقى 05).`, sol: R`~~~js format.js
const pad = (n, w = 2) => String(n).padStart(w, "0");
const formatLocal = x => $__bt$__{x.getFullYear()}-$__{pad(x.getMonth() + 1)}-$__{pad(x.getDate())} $__{pad(x.getHours())}:$__{pad(x.getMinutes())}:$__{pad(x.getSeconds())}$__bt;
const formatUTC = x => $__bt$__{x.getUTCFullYear()}-$__{pad(x.getUTCMonth() + 1)}-$__{pad(x.getUTCDate())} $__{pad(x.getUTCHours())}:$__{pad(x.getUTCMinutes())}:$__{pad(x.getUTCSeconds())}.$__{pad(x.getUTCMilliseconds(), 3)}$__bt;
const e = new Date("2026-12-31T22:45:30.250Z");
console.log(formatLocal(e), "|", formatUTC(e));
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
2027-01-01 00:45:30 | 2026-12-31 22:45:30.250
~~~

~~~text الناتج: $env:TZ="America/New_York"
2026-12-31 17:45:30 | 2026-12-31 22:45:30.250
~~~

- [[pad(n, w = 2)]]: [[String(n).padStart(w, "0")]] بيكمّل بأصفار من الشمال لحد الطول [[w]]. الـ ms محتاجة ٣ ([[pad(42, 3)]] = [["042"]]).
- [[getMonth() + 1]]: الشهر من 0، والناس بتقرا من 1. دي الغلطة رقم ١ في الـ formatters اليدوي.
- **ليه مش [[toISOString().replace("T", " ")]]؟** ده UTC بس. لو عايز المحلي لازم getters (أو Intl).

الشكل ده (من غير [[T]] ومن غير منطقة) كويس للعرض في لوج أو جدول، بس متخزّنهوش ولا تبعته: مفيهوش منطقة فمحدش هيعرف يقراه صح.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[arabicDate(d)]] بترجّع [["الجمعة 1 يناير 2027"]]: اسم يوم الأسبوع من array، واليوم، واسم الشهر من array، والسنة، كلهم بتوقيت الجهاز. وقارنها بـ [[toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })]].`, done: R`بالقاهرة طلع [["الجمعة 1 يناير 2027"]] وبنيويورك [["الخميس 31 ديسمبر 2026"]]، وعارف إن الـ arrays دي بالترتيب اللي [[getDay]] و [[getMonth]] بيعدّوا بيه (الحد 0 ويناير 0).`, sol: R`~~~js arabic-date.js
const DAYS = ["الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت"];
const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const arabicDate = x => $__bt$__{DAYS[x.getDay()]} $__{x.getDate()} $__{MONTHS[x.getMonth()]} $__{x.getFullYear()}$__bt;
const e = new Date("2026-12-31T22:45:30.250Z");
console.log(arabicDate(e));
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
الجمعة 1 يناير 2027
~~~

~~~text الناتج: $env:TZ="America/New_York"
الخميس 31 ديسمبر 2026
~~~

- [[DAYS[x.getDay()] ]]: [[getDay()]] رقم من 0 لـ 6 بادئ بالحد، فالـ array لازم تبدأ بالحد. لو بدأتها بالسبت (زي التقويم المصري) كل الأيام هتتزحلق.
- **إمتى تستخدم ده وإمتى Intl؟** [[toLocaleDateString("ar-EG", ...)]] بيدّيك [[الجمعة، ١ يناير ٢٠٢٧]] بالأرقام العربي والفاصلة، وبيعرف أسماء الشهور الصح لكل لغة. الـ arrays اليدوية مفيدة لما عايز كلمات بعينها (المصري «الحد» و «التلات» بدل «الأحد» و «الثلاثاء») أو شكل Intl مبيطلّعوش.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** فاتورة بتطبع تاريخ الاستحقاق كده، والعميل بيشتكي إن التاريخ «6/10/126» وهو المفروض ٢١ نوفمبر 2026:

~~~js
const due = new Date(2026, 10, 21);
console.log($__bt$__{due.getDay()}/$__{due.getMonth()}/$__{due.getYear()}$__bt);
~~~

فيه ٣ غلطات في سطر واحد.`, done: R`الكود المصلّح بيطبع [[21/11/2026]] بتوقيت القاهرة ونيويورك، وعارف كل غلطة من التلاتة مصدرها إيه.`, sol: R`~~~js due.js
const due = new Date(2026, 10, 21);
console.log("قبل:", $__bt$__{due.getDay()}/$__{due.getMonth()}/$__{due.getYear()}$__bt);
console.log("بعد:", $__bt$__{due.getDate()}/$__{due.getMonth() + 1}/$__{due.getFullYear()}$__bt);
~~~

~~~text الناتج: node due.js
قبل: 6/10/126
بعد: 21/11/2026
~~~

1. [[getDay()]] ← [[getDate()]]: الأولى يوم الأسبوع (6 = السبت)، والتانية رقم اليوم في الشهر. الاسمين شبه بعض، وده أشهر باج في Date.
2. [[getMonth()]] ← [[getMonth() + 1]]: 10 هو نوفمبر لأن العدّ من 0.
3. [[getYear()]] ← [[getFullYear()]]: [[getYear()]] قديمة ومش مستحبة (deprecated) وبترجّع السنة ناقص 1900 (126). اتشالت من الاستخدام من زمان بس لسه موجودة عشان المواقع القديمة متبوظش.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[countWeekendDays(year, month)]] (الشهر من 0) بترجّع عدد أيام الجمعة والسبت في الشهر ده. لازم تطلع نفس الإجابة على أي جهاز في الدنيا، فاستخدم النسخ الـ UTC. اكتب الحل في مربع «شغّل واختبر» تحت.`, done: R`الاختبارات اللي تحت عدّت: نوفمبر 2026 فيه 8، ومايو 2026 فيه 10 (بيبدأ جمعة وسبت وبيخلص جمعة وسبت)، وفبراير 2028 الكبيسة فيه 8.`, sol: R`~~~js weekend.js
function countWeekendDays(year, month) {
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  let n = 0;
  for (let day = 1; day <= days; day++) {
    const wd = new Date(Date.UTC(year, month, day)).getUTCDay();
    if (wd === 5 || wd === 6) n++;
  }
  return n;
}
console.log(countWeekendDays(2026, 10), countWeekendDays(2026, 1), countWeekendDays(2026, 4));
~~~

~~~text الناتج: node weekend.js (القاهرة ونيويورك، نفس الناتج)
8 8 10
~~~

- [[Date.UTC(year, month + 1, 0)]]: اليوم 0 من الشهر اللي بعده = آخر يوم في الشهر ده، و [[getUTCDate()]] رقمه = عدد الأيام.
- [[new Date(Date.UTC(year, month, day)).getUTCDay()]]: نص ليل UTC لليوم ده، ويوم الأسبوع بتاعه بـ UTC. لو استخدمت [[new Date(year, month, day).getDay()]] برضه هيطلع صح (محلي مع محلي)، بس لو خلطت ([[Date.UTC]] مع [[getDay()]]) هتاخد اليوم اللي قبله في أي بلد غرب جرينتش.
- [[wd === 5 || wd === 6]]: الجمعة 5 والسبت 6.` },
          ],
          check: {
            lang: "js",
            starter: R`function countWeekendDays(year, month) {
  let n = 0;
  // لف على أيام الشهر وعدّ الجمعة والسبت
  return n;
}`,
            tests: R`test("نوفمبر 2026", () => expect(countWeekendDays(2026, 10)).toBe(8));
test("مايو 2026 فيه 10", () => expect(countWeekendDays(2026, 4)).toBe(10));
test("فبراير 2026", () => expect(countWeekendDays(2026, 1)).toBe(8));
test("فبراير 2028 كبيسة", () => expect(countWeekendDays(2028, 1)).toBe(8));
test("يناير 2027 بيبدأ جمعة", () => expect(countWeekendDays(2027, 0)).toBe(10));
test("ديسمبر 2026", () => expect(countWeekendDays(2026, 11)).toBe(8));`,
            solution: R`function countWeekendDays(year, month) {
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  let n = 0;
  for (let day = 1; day <= days; day++) {
    const wd = new Date(Date.UTC(year, month, day)).getUTCDay();
    if (wd === 5 || wd === 6) n++;
  }
  return n;
}`
          },
          flag: "script",
          deep: {
            why: R`كل عرض لتاريخ يدوي، وكل «هل النهارده جمعة؟» و «اطلع كل طلبات شهر ١١»، مبني على getter. ولو اخترت النسخة الغلط (محلي ولا UTC) الكود هيشتغل عندك ويغلط عند يوزر في بلد تاني أو على السيرفر، وغالبًا بس قرب نص الليل أو أول الشهر.`,
            how: R`الـ getters المحلية بتعمل خطوتين: تاخد رقم الـ ms، وتزوّد عليه offset توقيت الجهاز في اللحظة دي (من قاعدة بيانات IANA اللي جوه Node والمتصفح)، وبعدين تفك الرقم الناتج لسنة وشهر ويوم وساعة. الـ UTC بتفك الرقم على طول من غير الخطوة الأولى. عشان كده [[getUTCMinutes]] و [[getMinutes]] بيختلفوا بس في البلاد اللي الـ offset فيها مش ساعات كاملة (الهند +5:30، ونيبال +5:45).

[[getDay]] و [[getUTCDay]] بيتحسبوا من رقم الأيام من الـ epoch (١ يناير ١٩٧٠ كان خميس، يعني 4). وكل getter على Invalid Date بيرجّع [[NaN]] من غير error، و [[days[NaN] ]] بيبقى [[undefined]]: فالـ NaN بيعدّي في صمت لحد ما يظهر في الواجهة.`,
            when: R`**محلي:** العرض في المتصفح (ساعة جهاز اليوزر هي اللي هو عايشها)، وفورم بياخد ميعاد من اليوزر، و «النهارده» من وجهة نظر اللي قاعد قدام الجهاز. **UTC:** أي حساب بأيام التقويم (فرق أيام، أيام شغل، أيام أسبوع لتاريخ [["YYYY-MM-DD"]])، وأي كود على سيرفر، وأي تاريخ اتعمل بـ [[Date.UTC]] أو جه [["YYYY-MM-DD"]] لوحده. **ولا ده ولا ده:** لو عايز توقيت مدينة معيّنة مش جهازك، استخدم Intl بـ [[timeZone]] (درس «UTC و Intl.DateTimeFormat»).`,
            mistakes: R`[[getDay()]] مكان [[getDate()]]. ونسيان [[+ 1]] على الشهر. و [[getYear()]]. وخلط [[Date.UTC]] أو [["YYYY-MM-DD"]] مع getters محلية (يوم قبل في أمريكا). و array أيام بادئة بالسبت مع [[getDay()]]. وقراية [[getHours()]] على السيرفر على إنها ساعة اليوزر. وفي الانترفيو: «اكتب دالة بترجّع عدد أيام أي شهر» الإجابة المتوقعة: [[new Date(y, m + 1, 0).getDate()]] مع شرح ليه اليوم 0.`
          },
          teach: R`## الفكرة: نفس اللحظة، قرايتين

الـ getter بيفك رقم الـ ms لجزء واحد (سنة، شهر، ساعة...). والسؤال: تفكه بتوقيت الجهاز ولا بتوقيت UTC؟ كل getter ليه نسختين، والمثال بيستخدم لحظة قريبة من نص الليل في آخر السنة عشان يبيّن الفرق في كل جزء مرة واحدة.

> الناتج من Node 24.22 على Windows. اتشغّل بالقاهرة ([[$env:TZ="Africa/Cairo"]])، ونيويورك، و [[TZ=UTC]]، وكل ناتج مكتوب عليه.

~~~js
const d = new Date("2026-12-31T22:45:30.250Z");
~~~

اللحظة: ٣١ ديسمبر 2026 الساعة 10:45:30 بالليل و 250 ms بتوقيت UTC (الـ [[Z]]). القاهرة في ديسمبر UTC+2، يعني عندها 12:45 بعد نص الليل: **سنة جديدة**.

---

## ١. التاريخ المحلي: [[getFullYear]] و [[getMonth]] و [[getDate]] و [[getDay]]

~~~js
console.log(d.getFullYear(), d.getMonth(), d.getDate(), d.getDay());
~~~

~~~text الناتج: القاهرة
2027 0 1 5
~~~

~~~text الناتج: نيويورك
2026 11 31 4
~~~

| الـ getter | بيرجّع | المدى | القاهرة |
|---|---|---|---|
| [[getFullYear()]] | السنة كاملة | أي سنة (حتى سالبة) | 2027 |
| [[getMonth()]] | الشهر | **0** (يناير) لـ 11 (ديسمبر) | 0 |
| [[getDate()]] | اليوم في الشهر | 1 لـ 31 | 1 |
| [[getDay()]] | يوم الأسبوع | **0** (الحد) لـ 6 (السبت) | 5 (الجمعة) |

في القاهرة كل حاجة اتقلبت: سنة 2027، شهر يناير، يوم 1، جمعة. وفي نيويورك (UTC−5) لسه 5:45 العصر يوم ٣١ ديسمبر الخميس.

---

## ٢. الوقت المحلي: [[getHours]] و [[getMinutes]] و [[getSeconds]] و [[getMilliseconds]]

~~~js
console.log(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
~~~

~~~text الناتج: القاهرة
0 45 30 250
~~~

~~~text الناتج: نيويورك
17 45 30 250
~~~

| الـ getter | بيرجّع | المدى |
|---|---|---|
| [[getHours()]] | الساعة بنظام ٢٤ | 0 لـ 23 |
| [[getMinutes()]] | الدقيقة | 0 لـ 59 |
| [[getSeconds()]] | الثانية | 0 لـ 59 |
| [[getMilliseconds()]] | الـ ms | 0 لـ 999 |

الساعة بس اللي اتغيّرت (0 في القاهرة و 17 في نيويورك)، لأن الفرق بين البلدين ساعات كاملة. ومفيش AM و PM: الـ getters أرقام بس، والشكل شغلة Intl.

---

## ٣. نسخ UTC: [[getUTCFullYear]] و [[getUTCMonth]] و [[getUTCDate]] و [[getUTCDay]]

~~~js
console.log(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCDay());
~~~

~~~text الناتج: القاهرة ونيويورك و UTC (نفس الناتج)
2026 11 31 4
~~~

| الـ getter | توأمه المحلي | الناتج هنا |
|---|---|---|
| [[getUTCFullYear()]] | [[getFullYear()]] | 2026 |
| [[getUTCMonth()]] | [[getMonth()]] (من 0 برضه) | 11 (ديسمبر) |
| [[getUTCDate()]] | [[getDate()]] | 31 |
| [[getUTCDay()]] | [[getDay()]] (0 = الحد) | 4 (الخميس) |

نفس الأرقام على أي جهاز، لأنها مبتبصّش على توقيته.

---

## ٤. وقت UTC: [[getUTCHours]] و [[getUTCMinutes]] و [[getUTCSeconds]] و [[getUTCMilliseconds]]

~~~js
console.log(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
~~~

~~~text الناتج: أي توقيت
22 45 30 250
~~~

| الـ getter | بيرجّع | إمتى بيختلف عن المحلي |
|---|---|---|
| [[getUTCHours()]] | الساعة في جرينتش | دايمًا، إلا لو الجهاز UTC |
| [[getUTCMinutes()]] | الدقيقة في جرينتش | بس في offsets زي +5:30 (الهند) |
| [[getUTCSeconds()]] | الثانية | عمليًا مبتختلفش |
| [[getUTCMilliseconds()]] | الـ ms | مبتختلفش |

---

## ٥. أسماء الأيام من [[getDay]]

~~~js
const days = ["الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت"];
console.log(days[d.getDay()], days[d.getUTCDay()]);
~~~

array فيها الأسماء **بنفس ترتيب** [[getDay]]: الحد في index 0. والـ [[days[...] ]] بياخد العنصر اللي رقمه طلع من الـ getter.

~~~text الناتج: القاهرة
الجمعة الخميس
~~~

نفس اللحظة: الجمعة في القاهرة والخميس في UTC.

---

## ٦. Invalid Date

~~~js
const bad = new Date("x");
console.log(bad.getFullYear(), bad.getDay());
~~~

~~~text الناتج
NaN NaN
~~~

كل getter على Invalid Date بيرجّع [[NaN]] ومفيش error. و [[days[NaN] ]] بيبقى [[undefined]]، فالغلط بيظهر في الصفحة كـ «undefined» بعد خطوات كتير. افحص [[Number.isNaN(d.getTime())]] أول ما التاريخ يدخل.

---

## الخلاصة

| عايز | محلي (جهاز اليوزر) | UTC |
|---|---|---|
| السنة | [[getFullYear()]] | [[getUTCFullYear()]] |
| الشهر (من 0) | [[getMonth()]] | [[getUTCMonth()]] |
| اليوم في الشهر | [[getDate()]] | [[getUTCDate()]] |
| يوم الأسبوع (0 = الحد) | [[getDay()]] | [[getUTCDay()]] |
| الساعة والدقيقة والثانية والـ ms | [[getHours()]] و [[getMinutes()]] و [[getSeconds()]] و [[getMilliseconds()]] | [[getUTCHours()]] و [[getUTCMinutes()]] و [[getUTCSeconds()]] و [[getUTCMilliseconds()]] |
| عدد أيام الشهر | [[new Date(y, m + 1, 0).getDate()]] | [[new Date(Date.UTC(y, m + 1, 0)).getUTCDate()]] |

والفرق بين النسختين كله في رقم واحد اسمه الـ offset: الدرس اللي جاي.`,
          lines: [
            R`لحظة محددة بـ [[Z]]: ٣١ ديسمبر 2026 الساعة 22:45:30.250 UTC. اخترناها قريبة من نص الليل في آخر السنة عشان كل جزء يختلف بين القاهرة و UTC.`,
            R`الأجزاء الأربعة للتاريخ بتوقيت الجهاز: في القاهرة [[2027 0 1 5]] (سنة جديدة، يناير، يوم 1، جمعة)، وفي نيويورك [[2026 11 31 4]].`,
            R`أجزاء الوقت بتوقيت الجهاز: الساعة بس هي اللي بتختلف بين البلاد ([[0]] في القاهرة و [[17]] في نيويورك)، والدقايق والثواني والـ ms زي ما هم.`,
            R`نفس الأجزاء الأربعة بس بـ UTC: [[2026 11 31 4]] على أي جهاز، لأن [[getUTC…]] مبيبصّش على توقيت الجهاز خالص.`,
            R`وقت UTC: [[22 45 30 250]] في كل مكان. ده اللي بتستخدمه لو عايز الساعة اللي في اللحظة المخزّنة نفسها.`,
            R`array بأسماء الأيام بالمصري، مترتبة زي [[getDay]] بالظبط: الحد الأول (index 0) والسبت الأخير (6).`,
            R`بيطبع اسم اليوم المحلي واسم يوم UTC: في القاهرة [[الجمعة الخميس]]، يعني نفس اللحظة يومين مختلفين.`,
            R`Date من نص مش مفهوم، يعني Invalid Date: الرقم اللي جوه [[NaN]].`,
            R`أي getter على Invalid Date بيرجّع [[NaN]] من غير ما يرمي error، فبيطبع [[NaN NaN]]. ده سبب إنك تفحص التاريخ أول ما يدخل.`,
          ],
          pre: [
            "js/Date.UTC و Date.parse",
            { to: "js/template literals", why: R`الـ formatters في التمارين مكتوبة بـ template literals و [[padStart]]` },
          ],
          ref: [
            { t: "MDN: Date.prototype.getFullYear()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear" },
            { t: "MDN: Date.prototype.getMonth()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth" },
            { t: "MDN: Date.prototype.getDate()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate" },
            { t: "MDN: Date.prototype.getDay()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay" },
            { t: "MDN: Date.prototype.getHours()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours" },
            { t: "MDN: Date.prototype.getMinutes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes" },
            { t: "MDN: Date.prototype.getSeconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds" },
            { t: "MDN: Date.prototype.getMilliseconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds" },
            { t: "MDN: Date.prototype.getUTCFullYear()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear" },
            { t: "MDN: Date.prototype.getUTCMonth()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth" },
            { t: "MDN: Date.prototype.getUTCDate()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate" },
            { t: "MDN: Date.prototype.getUTCDay()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay" },
            { t: "MDN: Date.prototype.getUTCHours()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCHours" },
            { t: "MDN: Date.prototype.getUTCMinutes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMinutes" },
            { t: "MDN: Date.prototype.getUTCSeconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCSeconds" },
            { t: "MDN: Date.prototype.getUTCMilliseconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds" },
          ],
        },
        {
          cmd: "Date: getTimezoneOffset والتوقيت الصيفي",
          title: "الجهاز متأخر أو متقدم عن UTC بكام في اللحظة دي، وإيه اللي بيحصل للساعة اللي بتتنط أو بتتكرر؟",
          desc: R`[[getTimezoneOffset()]] بيرجّع الفرق بين UTC وتوقيت الجهاز **في اللحظة دي** بالدقايق، والإشارة عكس اللي متعوّد عليه: UTC ناقص المحلي. القاهرة (+2) بيرجّع [[-120]]، ونيويورك (−5) بيرجّع [[300]]. والرقم بيتغيّر مع التوقيت الصيفي: نفس الجهاز في القاهرة بيرجّع [[-120]] في يناير و [[-180]] في يوليو.

مصر رجّعت التوقيت الصيفي من 2023: من آخر جمعة في أبريل لآخر خميس في أكتوبر. في 2026 الساعة نطت يوم الجمعة ٢٤ أبريل من 00:00 لـ 01:00 (فالـ 00:30 مش موجودة)، ورجعت ليلة الخميس ٢٩ أكتوبر من 24:00 لـ 23:00 (فالساعة 23:00–23:59 حصلت مرتين). [[new Date(y, m, d, h)]] بيحط الساعة اللي مش موجودة بعد النطّة، ويختار المرة الأولى من الساعة المتكررة.`,
          example: R`const winter = new Date("2026-01-15T10:00:00Z");
const summer = new Date("2026-07-15T10:00:00Z");
console.log(winter.getTimezoneOffset(), summer.getTimezoneOffset());
console.log(winter.getHours(), summer.getHours());
const hasDST = winter.getTimezoneOffset() !== summer.getTimezoneOffset();
console.log(hasDST, summer.getTimezoneOffset() < winter.getTimezoneOffset());
const gap = new Date(2026, 3, 24, 0, 30);
console.log(gap.getHours(), gap.getMinutes(), gap.toISOString());
const twice = [new Date("2026-10-29T20:30:00Z"), new Date("2026-10-29T21:30:00Z")];
console.log(twice.map(x => $__bt$__{x.getHours()}:$__{x.getMinutes()} $__{x.getTimezoneOffset()}$__bt));`,
          try: R`شغّل المثال بـ ٤ توقيتات: القاهرة ونيويورك والرياض و UTC (PowerShell: [[$env:TZ="Asia/Riyadh"; node f.js]]). أنهي توقيتات فيها صيفي؟ وفي الرياض، السطر الأخير ليه ساعتين مختلفتين مع إن الـ offset واحد؟ وبعدين اكتب [[toLocalISO(d)]] بترجّع ISO بتوقيت الجهاز ومعاه الـ offset ([["2026-11-21T11:05:07+02:00"]]).`,
          sol: R`~~~text الناتج: $env:TZ="Africa/Cairo"
-120 -180
12 13
true true
1 30 2026-04-23T22:30:00.000Z
[ '23:30 -180', '23:30 -120' ]
~~~

~~~text الناتج: $env:TZ="America/New_York"
300 240
5 6
true true
0 30 2026-04-24T04:30:00.000Z
[ '16:30 240', '17:30 240' ]
~~~

~~~text الناتج: $env:TZ="Asia/Riyadh"
-180 -180
13 13
false false
0 30 2026-04-23T21:30:00.000Z
[ '23:30 -180', '0:30 -180' ]
~~~

~~~text الناتج: TZ=UTC
0 0
10 10
false false
0 30 2026-04-24T00:30:00.000Z
[ '20:30 0', '21:30 0' ]
~~~

القاهرة ونيويورك فيهم صيفي، والرياض و UTC لأ. وفي الرياض اللحظتين بينهم ساعة حقيقية والـ offset ثابت، فالساعة على الحيطة اتحركت عادي (23:30 ثم 0:30). في القاهرة بس اللحظتين اتقروا **نفس الساعة** 23:30 بـ offset مختلف: ده معنى «الساعة اتكررت». و [[toLocalISO]] في التمرين التاني تحت.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب رقمين لكل مدينة ([[getTimezoneOffset]] يوم ١٥ يناير ويوم ١٥ يوليو 2026)، وبعدين شغّل:

~~~js
for (const tz of ["Asia/Riyadh", "Asia/Kolkata", "America/New_York", "Australia/Sydney"]) {
  process.env.TZ = tz;
  console.log(tz.padEnd(18), new Date(Date.UTC(2026, 0, 15)).getTimezoneOffset(), new Date(Date.UTC(2026, 6, 15)).getTimezoneOffset());
}
~~~`, done: R`كتبت الإشارات صح (شرق جرينتش سالب)، وتوقعت إن سيدني الصيفي بتاعها في يناير مش يوليو، وإن الهند بـ 330 مش 300.`, sol: R`~~~text الناتج: node offsets.js (Node 24.22)
Asia/Riyadh        -180 -180
Asia/Kolkata       -330 -330
America/New_York   300 240
Australia/Sydney   -660 -600
~~~

- **الإشارة:** [[getTimezoneOffset]] = UTC − المحلي بالدقايق. الرياض +3 يعني المحلي قدام UTC بـ 180 دقيقة، فالناتج سالب. نيويورك ورا UTC فموجب.
- **الهند:** +5:30 = 330 دقيقة. عشان كده الوحدة دقايق مش ساعات.
- **سيدني:** في نص الكرة الجنوبي، فالصيف (والتوقيت الصيفي +11) في يناير، والشتا (+10) في يوليو.
- **[[process.env.TZ = tz]] جوه الـ loop:** Node بيعيد قراية التوقيت كل ما تغيّره، فكل لفة بتشتغل كأنها جهاز في بلد تاني. ده مفيد في الاختبارات، وخطر في سيرفر شغال (بيأثر على كل الكود اللي في نفس الـ process).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[formatOffset(minutes)]] بتاخد رقم زي اللي [[getTimezoneOffset]] بيرجّعه وترجّع [["+02:00"]] أو [["-05:00"]] أو [["+05:30"]]، و [[toLocalISO(d)]] بترجّع [["YYYY-MM-DDTHH:mm:ss+HH:MM"]] بتوقيت الجهاز. اكتب [[formatOffset]] في مربع «شغّل واختبر» تحت.`, done: R`[[formatOffset(-120)]] بـ [["+02:00"]] و [[formatOffset(300)]] بـ [["-05:00"]] و [[formatOffset(-330)]] بـ [["+05:30"]] و [[formatOffset(0)]] بـ [["+00:00"]]، و [[toLocalISO]] على ٤ توقيتات بيرجّع نص لما تعمله [[new Date(...)]] بيرجع لنفس اللحظة.`, sol: R`~~~js local-iso.js
const pad = n => String(n).padStart(2, "0");
function formatOffset(minutes) {
  const east = -minutes;
  const abs = Math.abs(east);
  return $__bt$__{east >= 0 ? "+" : "-"}$__{pad(Math.floor(abs / 60))}:$__{pad(abs % 60)}$__bt;
}
function toLocalISO(d) {
  return $__bt$__{d.getFullYear()}-$__{pad(d.getMonth() + 1)}-$__{pad(d.getDate())}T$__{pad(d.getHours())}:$__{pad(d.getMinutes())}:$__{pad(d.getSeconds())}$__{formatOffset(d.getTimezoneOffset())}$__bt;
}
const d = new Date("2026-11-21T09:05:07Z");
console.log(toLocalISO(d), new Date(toLocalISO(d)).getTime() === d.getTime());
~~~

~~~text الناتج: القاهرة ونيويورك والهند و UTC (٤ تشغيلات)
2026-11-21T11:05:07+02:00 true
2026-11-21T04:05:07-05:00 true
2026-11-21T14:35:07+05:30 true
2026-11-21T09:05:07+00:00 true
~~~

- **[[-minutes]]:** بنقلب الإشارة عشان نرجع للشكل اللي الناس بتكتبه (شرق جرينتش موجب).
- **[[Math.abs]] الأول:** لو قسمت [[-330 / 60]] و [[Math.floor]] هتاخد [[-6]] مش [[-5]]. نشتغل على القيمة الموجبة ونحط الإشارة لوحدها.
- **[[true]] في الآخر:** النص اللي طلع ISO سليم فيه offset، و [[new Date(...)]] رجّعه لنفس اللحظة بالظبط. ده الشكل اللي تبعته لو عايز الطرف التاني يشوف الوقت المحلي واللحظة في نفس الوقت (وده اللي [[toISOString]] مبيعملوش: دايمًا [[Z]]).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سيرفر شغال UTC، وعايز يطبع الساعة في القاهرة، فالمطوّر كتب:

~~~js
const cairo = new Date(d.getTime() + 2 * 3600 * 1000);
console.log(cairo.getUTCHours() + ":00");
~~~

جرّبه على [[2026-01-15T10:00:00Z]] و [[2026-07-15T10:00:00Z]] وصلّحه.`, done: R`الكود القديم بيطبع 12:00 في الاتنين، والمصلّح بيطبع 12:00 في يناير و 13:00 في يوليو، وبيطبع كمان الـ offset الصح لكل لحظة ([[GMT+02:00]] و [[GMT+03:00]]).`, sol: R`~~~js cairo-hour.js
const at = [new Date("2026-01-15T10:00:00Z"), new Date("2026-07-15T10:00:00Z")];
for (const d of at) {
  const manual = new Date(d.getTime() + 2 * 3600 * 1000);
  console.log("يدوي:", manual.getUTCHours() + ":00", "| Intl:", d.toLocaleTimeString("en-GB", { timeZone: "Africa/Cairo", hour: "2-digit", minute: "2-digit" }),
    "| offset:", new Intl.DateTimeFormat("en", { timeZone: "Africa/Cairo", timeZoneName: "longOffset" }).formatToParts(d).find(p => p.type === "timeZoneName").value);
}
~~~

~~~text الناتج: TZ=UTC node cairo-hour.js
يدوي: 12:00 | Intl: 12:00 | offset: GMT+02:00
يدوي: 12:00 | Intl: 13:00 | offset: GMT+03:00
~~~

**السبب:** الـ [[+ 2 ساعة]] ثابت، ومصر +3 نص السنة. والأسوأ إن [[cairo]] بقى Date «مزيّف»: لحظة تانية غير الحقيقية، ولو اتخزّن أو اتقارن هيبوّظ حاجات تانية.

**التصليح:** متغيّرش اللحظة أبدًا. اعرضها بتوقيت المدينة بـ [[toLocaleTimeString]] و [[timeZone]]، و Intl بيعرف قواعد الصيفي من IANA. ولو محتاج الـ offset كرقم لمدينة مش جهازك: [[timeZoneName: "longOffset"]] و [[formatToParts]]. [[getTimezoneOffset]] بيدّيك توقيت **الجهاز** بس، مفيش منه نسخة بتاخد مدينة.` },
            { lvl: 'تحدي', t: R`**ابني:** [[findTransitions(year)]] بترجّع كل لحظات تغيير الساعة في السنة دي بتوقيت الجهاز: [[{ at, from, to }]] (اللحظة بـ ISO والـ offset قبل وبعد بالساعات). لف ساعة ساعة بـ [[getTimezoneOffset]]، ولما يتغيّر دوّر بالدقيقة جوه الساعة دي.`, done: R`بالقاهرة طلعت لحظتين: [[2026-04-23T22:00:00.000Z]] (+2 لـ +3) و [[2026-10-29T21:00:00.000Z]] (+3 لـ +2)، وبنيويورك ٨ مارس وأول نوفمبر، وبالرياض لستة فاضية.`, sol: R`~~~js transitions.js
function findTransitions(year) {
  const HOUR = 3600000, out = [];
  let t = Date.UTC(year, 0, 1), prev = new Date(t).getTimezoneOffset();
  const end = Date.UTC(year + 1, 0, 1);
  for (t += HOUR; t <= end; t += HOUR) {
    const off = new Date(t).getTimezoneOffset();
    if (off === prev) continue;
    let lo = t - HOUR, hi = t;
    while (hi - lo > 60000) {
      const mid = lo + Math.floor((hi - lo) / 120000) * 60000;
      if (new Date(mid).getTimezoneOffset() === prev) lo = mid; else hi = mid;
    }
    out.push({ at: new Date(hi).toISOString(), from: -prev / 60, to: -off / 60 });
    prev = off;
  }
  return out;
}
console.log(findTransitions(2026));
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
[
  { at: '2026-04-23T22:00:00.000Z', from: 2, to: 3 },
  { at: '2026-10-29T21:00:00.000Z', from: 3, to: 2 }
]
~~~

~~~text الناتج: $env:TZ="America/New_York"
[
  { at: '2026-03-08T07:00:00.000Z', from: -5, to: -4 },
  { at: '2026-11-01T06:00:00.000Z', from: -4, to: -5 }
]
~~~

~~~text الناتج: $env:TZ="Asia/Riyadh"
[]
~~~

- **اللف بالـ ms مش بالساعة المحلية:** [[t += HOUR]] على رقم UTC، فمفيش ساعة بتتنط ولا بتتكرر في اللف نفسه.
- **البحث جوه الساعة (binary search):** [[lo]] آخر لحظة بالـ offset القديم و [[hi]] أول لحظة بالجديد، وكل لفة بنقسم المسافة نصين (مقرّبة لدقيقة) لحد ما يفضل دقيقة. ١٠ مقارنات تقريبًا بدل ٦٠.
- **قراية الناتج:** [[2026-04-23T22:00Z]] = 00:00 بتوقيت +2 يوم ٢٤ أبريل: الساعة نطت لـ 01:00. و [[2026-10-29T21:00Z]] = 24:00 بتوقيت +3: رجعت 23:00.

النتيجة طابقت قاعدة مصر بالظبط (آخر جمعة في أبريل وآخر خميس في أكتوبر)، والمشروع «مواعيد بتتكرر بقاعدة» بيحسبها من القاعدة نفسها.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عمل [[new Date(2026, 3, 24, 0, 30)]] على جهاز في القاهرة ولقى [[getHours()]] بـ 1 مش 0، وفاكر إنه باج في Node. اكتبله ٣ سطور: إيه اللي حصل، وليه ده مش باج، وإزاي كود الحجز يتعامل معاه.`, done: R`الشرح فيه إن 00:30 يوم ٢٤ أبريل 2026 مش موجودة في القاهرة، وإن المواصفات بتقول تتحسب بالـ offset اللي قبل النطّة فتطلع 01:30، وإن الصح ترفضها وتقول لليوزر (بمقارنة الـ getters).`, sol: R`**إجابة نموذجية:**

1. يوم الجمعة ٢٤ أبريل 2026 مصر دخلت التوقيت الصيفي: الساعة 00:00 بقت 01:00 على طول. فالـ 00:30 «على الحيطة» مش موجودة في القاهرة اليوم ده.
2. ده سلوك المواصفات مش باج: الوقت المحلي اللي مش موجود بيتحسب بالـ offset اللي **قبل** التغيير (+2)، فـ 00:30+02:00 = 22:30 UTC، واللحظة دي على ساعة القاهرة الجديدة (+3) = 01:30. Chrome بيعمل نفس الحاجة.
3. في كود حجز: ابني الـ Date واقرا [[getHours()]] و [[getMinutes()]] تاني، ولو مختلفين عن اللي اليوزر كتبه قوله «الساعة دي مش موجودة اليوم ده»، متقبلش 01:30 من وراه.

~~~text الناتج: $env:TZ="Africa/Cairo" (من المثال)
1 30 2026-04-23T22:30:00.000Z
~~~

والعكس يوم ٢٩ أكتوبر: 23:30 موجودة مرتين، و [[new Date(2026, 9, 29, 23, 30)]] بياخد الأولى ([[getTimezoneOffset()]] بـ [[-180]]). المشروع «فاحص تاريخ ووقت الفورم» والمشروع الكبير بيتعاملوا مع الحالتين.` },
          ],
          check: {
            lang: "js",
            starter: R`function formatOffset(minutes) {
  return "+" + minutes / 60;
}`,
            tests: R`test("القاهرة شتا", () => expect(formatOffset(-120)).toBe("+02:00"));
test("القاهرة صيفي", () => expect(formatOffset(-180)).toBe("+03:00"));
test("نيويورك", () => expect(formatOffset(300)).toBe("-05:00"));
test("الهند +5:30", () => expect(formatOffset(-330)).toBe("+05:30"));
test("نيبال +5:45", () => expect(formatOffset(-345)).toBe("+05:45"));
test("نيوفاوندلاند -3:30", () => expect(formatOffset(210)).toBe("-03:30"));
test("UTC", () => expect(formatOffset(0)).toBe("+00:00"));`,
            solution: R`function formatOffset(minutes) {
  const east = -minutes;
  const abs = Math.abs(east);
  const pad = n => String(n).padStart(2, "0");
  return (east >= 0 ? "+" : "-") + pad(Math.floor(abs / 60)) + ":" + pad(abs % 60);
}`
          },
          flag: "script",
          deep: {
            why: R`مرتين في السنة في مصر الساعة بتتغيّر، وأي كود بيحسب «بكرة نفس الساعة» أو «الحجز ساعة» أو «طلبات النهارده» بـ ٢٤ ساعة ثابتة بيغلط في اليومين دول. والمشاكل دي مش بتظهر في التجربة، بتظهر في الـ production يوم الجمعة الصبح. و [[getTimezoneOffset]] هو الطريقة الوحيدة في Date نفسه تعرف بيها الجهاز ده فين من UTC دلوقتي.`,
            how: R`الـ offset مش رقم ثابت للجهاز: هو دالة في اللحظة. Node والمتصفح فيهم قاعدة بيانات IANA (ملفات tzdata جوه ICU) فيها لكل منطقة تاريخ كل تغيير، فـ [[getTimezoneOffset]] بيدوّر على اللحظة دي فين في الجدول. لما تبني Date من وقت محلي ([[new Date(y, m, d, h)]]) بيحصل العكس: محتاج يعرف الـ offset عشان يحوّل لـ UTC، والوقت اللي مش موجود (gap) بيتحسب بالـ offset اللي قبل التغيير فبيتزحلق لقدام، والوقت المتكرر (overlap) بياخد الـ offset الأول (اللي قبل الرجوع). ده اتجرّب في Node 24.22 و Chrome 157 بنفس النتيجة، وهو اللي المواصفات بتطلبه في عملية [[UTC(t)]] (المرجع تحت).

ولو الحكومة غيّرت القواعد (زي مصر في 2023)، النتيجة بتتغيّر بس لما الـ Node أو المتصفح يتحدّث بـ tzdata جديدة. عشان كده التواريخ المستقبلية «بتوقيت محلي» مش مضمونة، واللحظة بـ UTC مضمونة.`,
            when: R`لما محتاج تعرف الجهاز ده فين: تبني ISO بـ offset ([[toLocalISO]])، أو تعرف هل فيه صيفي، أو تبعت للسيرفر «اليوزر ده +2 دلوقتي» (الأحسن تبعت اسم الـ zone من [[Intl.DateTimeFormat().resolvedOptions().timeZone]]، لأن الرقم بيتغيّر). ولمدينة مش الجهاز: Intl بـ [[timeZone]]، مش [[getTimezoneOffset]].`,
            mistakes: R`تقرا الإشارة غلط ([[-120]] مش «متأخر ساعتين»). وتحفظ offset اليوزر كرقم واحد في البروفايل (بيتغيّر نص السنة). وتعمل [[+ 2 * 3600000]] على اللحظة «عشان تحوّلها للقاهرة». وتفتكر إن [[getTimezoneOffset()]] على [[new Date()]] بيقول offset أي تاريخ تاني. وتفترض إن كل offset ساعات كاملة. وفي الانترفيو: «إيه اللي ممكن يحصل لكود بيعمل setInterval كل ٢٤ ساعة عشان يبعت تقرير الساعة 9 الصبح؟» الإجابة: بعد تغيير الساعة هيبعته 8 أو 10، والصح تحسب ميعاد 9 الجاية بتوقيت المدينة كل مرة.`
          },
          teach: R`## الفكرة: الفرق عن UTC رقم بيتغيّر

درس «Date: الـ getters و getUTC» وراك إن [[getHours()]] و [[getUTCHours()]] بيختلفوا. الفرق بينهم رقم واحد اسمه الـ **offset**، و [[getTimezoneOffset()]] بيرجّعه. الدرس ده عن الرقم ده وعن اليومين اللي بيتغيّر فيهم في مصر.

> الناتج من Node 24.22 على Windows بتوقيت القاهرة ([[$env:TZ="Africa/Cairo"]] في PowerShell)، إلا لو مكتوب غير كده.

---

## ١. [[getTimezoneOffset()]]: الرقم وإشارته

~~~js
const winter = new Date("2026-01-15T10:00:00Z");
const summer = new Date("2026-07-15T10:00:00Z");
console.log(winter.getTimezoneOffset(), summer.getTimezoneOffset());
~~~

~~~text الناتج: القاهرة
-120 -180
~~~

- بالدقايق مش بالساعات (فيه بلاد +5:30 و +5:45).
- **الإشارة:** UTC − المحلي. القاهرة قدام UTC بساعتين، فـ UTC − المحلي = −120. اقلب الإشارة عشان تاخد الشكل اللي الناس بتكتبه (+2).
- يناير [[-120]] (+2) ويوليو [[-180]] (+3): نفس الجهاز، offset مختلف، لأن الرقم بيتحسب **للحظة دي** مش للجهاز.

| المدينة | يناير | يوليو | معناه |
|---|---|---|---|
| القاهرة | [[-120]] | [[-180]] | +2 شتا و +3 صيفي (من 2023) |
| الرياض | [[-180]] | [[-180]] | +3 طول السنة، مفيش صيفي |
| نيويورك | [[300]] | [[240]] | −5 شتا و −4 صيفي |
| الهند | [[-330]] | [[-330]] | +5:30 ثابت |
| سيدني | [[-660]] | [[-600]] | الصيفي في يناير (نص الكرة الجنوبي) |
| UTC | [[0]] | [[0]] | السيرفرات و Docker غالبًا |

---

## ٢. نفس الساعة UTC، ساعة مختلفة محليًا

~~~js
console.log(winter.getHours(), summer.getHours());
~~~

~~~text الناتج: القاهرة
12 13
~~~

اللحظتين 10:00 UTC. في يناير القاهرة 12:00، وفي يوليو 13:00. ده نفسه [[getUTCHours() - getTimezoneOffset() / 60]].

---

## ٣. الجهاز ده فيه توقيت صيفي؟

~~~js
const hasDST = winter.getTimezoneOffset() !== summer.getTimezoneOffset();
console.log(hasDST, summer.getTimezoneOffset() < winter.getTimezoneOffset());
~~~

~~~text الناتج: القاهرة
true true
~~~

- لو الـ offset في يناير غير يوليو، يبقى فيه صيفي.
- التاني: هل يوليو هو الصيفي (الـ offset أصغر = أبعد شرق)؟ [[true]] في القاهرة، وفي سيدني كان هيطلع [[false]].
- والـ offset «العادي» (standard) للبلد = الأكبر فيهم: [[Math.max(jan, jul)]].

---

## ٤. الساعة اللي مش موجودة (gap)

~~~js
const gap = new Date(2026, 3, 24, 0, 30);
console.log(gap.getHours(), gap.getMinutes(), gap.toISOString());
~~~

يوم الجمعة ٢٤ أبريل 2026، الساعة 00:00 في مصر بقت 01:00. يعني من 00:00 لـ 00:59 **مفيش**.

~~~text الناتج: القاهرة
1 30 2026-04-23T22:30:00.000Z
~~~

~~~text الناتج: نيويورك (يوم عادي عندهم)
0 30 2026-04-24T04:30:00.000Z
~~~

طلبنا 00:30 وأخدنا 01:30. القاعدة (المواصفات، و V8 بيطبقها): الوقت اللي مش موجود يتحسب بالـ offset **اللي قبل** النطّة (+2)، فـ 00:30+02:00 = 22:30 UTC، واللحظة دي بالتوقيت الجديد (+3) = 01:30. يعني الوقت بيتزحلق لقدام بطول النطّة. ومفيش error ولا تنبيه: لازم تقارن الـ getters باللي طلبته عشان تعرف.

> ونص الليل نفسه يوم ٢٤ مش موجود، فـ [[new Date(2026, 3, 24)]] في القاهرة [[getHours()]] بتاعه 1. أي كود بيعمل «بداية اليوم» بيبدأ الساعة 1 اليوم ده.

---

## ٥. الساعة اللي بتتكرر (overlap)

~~~js
const twice = [new Date("2026-10-29T20:30:00Z"), new Date("2026-10-29T21:30:00Z")];
console.log(twice.map(x => $__bt$__{x.getHours()}:$__{x.getMinutes()} $__{x.getTimezoneOffset()}$__bt));
~~~

ليلة الخميس ٢٩ أكتوبر 2026 الساعة 24:00 (+3) رجعت 23:00 (+2). اخترنا لحظتين بينهم ساعة حقيقية، والـ [[map]] بيطبع لكل واحدة الساعة والدقيقة والـ offset في نص (template literal).

~~~text الناتج: القاهرة
[ '23:30 -180', '23:30 -120' ]
~~~

~~~text الناتج: الرياض (مفيش تغيير)
[ '23:30 -180', '0:30 -180' ]
~~~

في القاهرة اللحظتين **نفس الساعة على الحيطة** (23:30)، والفرق الوحيد الـ offset. فلو حد قالك «23:30 يوم ٢٩ أكتوبر» من غير offset، مش هتعرف قصده أنهي واحدة. و [[new Date(2026, 9, 29, 23, 30)]] بياخد الأولى (+3). عشان كده الحجز والمواعيد بتتخزّن بـ UTC أو بـ offset.

---

## ٦. مصر بالتواريخ

| الحدث | القاعدة | 2026 | اللي بيحصل |
|---|---|---|---|
| بداية الصيفي | آخر جمعة في أبريل | الجمعة ٢٤ أبريل | 00:00 بتبقى 01:00، و [[getTimezoneOffset]] من [[-120]] لـ [[-180]] |
| نهاية الصيفي | آخر خميس في أكتوبر | الخميس ٢٩ أكتوبر | 24:00 بتبقى 23:00، والساعة دي بتتكرر |

اللحظات دي بالظبط بـ UTC: [[2026-04-23T22:00:00Z]] و [[2026-10-29T21:00:00Z]] (التمرين «findTransitions» بيطلّعهم بالكود). واليومين دول في Node: ٢٣ ساعة و ٢٥ ساعة.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الفرق عن UTC دلوقتي (دقايق، الإشارة مقلوبة) | [[d.getTimezoneOffset()]] |
| بالشكل اللي الناس بتكتبه | [[-d.getTimezoneOffset() / 60]] أو [[formatOffset]] |
| الجهاز فيه صيفي؟ | قارن يناير ويوليو |
| offset مدينة مش الجهاز | Intl و [[timeZoneName: "longOffset"]] |
| تعرف إن الوقت اللي اليوزر كتبه مش موجود | ابنيه واقرا الـ getters وقارن |

ومتخزّنش offset كرقم ثابت لأي حد: خزّن اسم الـ zone ([["Africa/Cairo"]]).`,
          lines: [
            R`لحظة في الشتا بـ [[Z]]: ١٥ يناير 2026 الساعة 10 UTC.`,
            R`نفس الساعة UTC بس في الصيف: ١٥ يوليو. الفرق بين اللحظتين بس الموسم، عشان نشوف أثر التوقيت الصيفي.`,
            R`بيطبع الـ offset بالدقايق للحظتين: في القاهرة [[-120 -180]]. الإشارة UTC ناقص المحلي، فالقيمة سالبة لأن مصر قدام UTC.`,
            R`نفس الـ 10:00 UTC على ساعة الحيطة: [[12 13]] في القاهرة، لأن الـ offset اتغيّر من +2 لـ +3 في الصيف.`,
            R`لو الـ offset في يناير مختلف عن يوليو يبقى الجهاز ده في منطقة فيها توقيت صيفي. مقارنة رقمين بسيطة.`,
            R`بيطبع [[true true]] في القاهرة: فيه صيفي، والصيفي في يوليو (الـ offset أصغر). في سيدني التاني كان هيبقى [[false]].`,
            R`بنطلب 00:30 يوم ٢٤ أبريل 2026، يوم ما الساعة في مصر نطت من 00:00 لـ 01:00، يعني الوقت ده مش موجود.`,
            R`بيطبع [[1 30]] في القاهرة: V8 حسب 00:30 بالـ offset القديم فطلعت 01:30 على الساعة الجديدة، من غير error. وفي أي بلد تاني [[0 30]].`,
            R`لحظتين بينهم ساعة حقيقية بالظبط، ليلة ٢٩ أكتوبر لما الساعة في مصر رجعت من 24:00 لـ 23:00.`,
            R`بيطبع لكل لحظة الساعة والـ offset: في القاهرة الاتنين [[23:30]] والـ offset [[-180]] ثم [[-120]]، يعني الساعة على الحيطة اتكررت.`,
          ],
          pre: [
            "js/Date: الـ getters و getUTC",
            { to: "js/UTC و Intl.DateTimeFormat", why: R`[[timeZone]] في Intl، والحل الصح لعرض وقت مدينة مش جهازك` },
          ],
          ref: [
            { t: "MDN: Date.prototype.getTimezoneOffset()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset" },
            { t: "MDN: Date (Date components and time zones)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_components_and_time_zones" },
            { t: "ECMAScript: LocalTime و UTC(t)", url: "https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-utc-t" },
          ],
        },
        {
          cmd: "Date: الـ setters و setUTC",
          title: "تغيّر جزء من التاريخ إزاي، وإيه اللي بيحصل لما الرقم يعدّي حدوده؟",
          desc: R`كل getter ليه setter بيغيّر الجزء ده **في نفس الـ object** و **بيرجّع رقم الـ ms الجديد** (مش الـ Date): [[setFullYear(y, m?, d?)]] و [[setMonth(m, d?)]] و [[setDate(d)]] و [[setHours(h, mi?, s?, ms?)]] و [[setMinutes(mi, s?, ms?)]] و [[setSeconds(s, ms?)]] و [[setMilliseconds(ms)]] بتوقيت الجهاز، ونفسهم بـ UTC: [[setUTCFullYear]] و [[setUTCMonth]] و [[setUTCDate]] و [[setUTCHours]] و [[setUTCMinutes]] و [[setUTCSeconds]] و [[setUTCMilliseconds]]. الأجزاء اللي بين أقواس [[?]] اختيارية وبتتغيّر مع بعض في نداء واحد.

والرقم اللي برّه المدى بيترحّل من غير error: [[setDate(0)]] = آخر يوم في الشهر اللي قبله، و [[setDate(32)]] بيعدّي للشهر اللي بعده، و [[setHours(24)]] = بكرة الساعة 0، و [[setMinutes(-1)]] = الدقيقة الأخيرة في الساعة اللي قبلها. و [[setHours(0, 0, 0, 0)]] هو «بداية اليوم» المحلي.`,
          example: R`const d = new Date(2026, 0, 31, 15, 40);
console.log(d.setFullYear(2026, 1, 14), d.toDateString());
d.setDate(0);
console.log(d.toDateString());
d.setHours(0, 0, 0, 0);
console.log(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
d.setMinutes(90);
d.setSeconds(75, 20);
console.log(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
const u = new Date("2026-03-31T23:30:00Z");
u.setUTCMonth(1);
console.log(u.toISOString());
u.setUTCFullYear(2028, 1, 29);
u.setUTCHours(0, 0, 0, 0);
console.log(u.toISOString());
const bad = new Date("x");
console.log(bad.setDate(5), bad.setFullYear(2026) > 0);`,
          try: R`اكتب ٤ دوال بترجّع Date **جديد** ومتغيّرش الأصل: [[startOfDay]] و [[endOfDay]] (23:59:59.999) و [[startOfMonth]] و [[endOfMonth]]، بالـ setters المحلية بس. جرّبهم على ١٤ فبراير 2026 الساعة 6:20 المسا، وعلى ٢٤ أبريل 2026 بتوقيت القاهرة: [[startOfDay]] طلعت الساعة كام؟ وليه؟`,
          sol: R`~~~js bounds.js
const startOfDay = x => { const d = new Date(x); d.setHours(0, 0, 0, 0); return d; };
const endOfDay = x => { const d = new Date(x); d.setHours(23, 59, 59, 999); return d; };
const startOfMonth = x => { const d = new Date(x); d.setDate(1); d.setHours(0, 0, 0, 0); return d; };
const endOfMonth = x => { const d = new Date(x); d.setMonth(d.getMonth() + 1, 0); d.setHours(23, 59, 59, 999); return d; };
const now = new Date(2026, 1, 14, 18, 20);
const show = d => $__bt$__{d.toDateString()} $__{d.toTimeString().slice(0, 8)}.$__{String(d.getMilliseconds()).padStart(3, "0")}$__bt;
for (const f of [startOfDay, endOfDay, startOfMonth, endOfMonth]) console.log(f.name.padEnd(13), show(f(now)));
console.log("original:", show(now));
console.log("Apr 24 start:", show(startOfDay(new Date(2026, 3, 24, 15))));
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
startOfDay    Sat Feb 14 2026 00:00:00.000
endOfDay      Sat Feb 14 2026 23:59:59.999
startOfMonth  Sun Feb 01 2026 00:00:00.000
endOfMonth    Sat Feb 28 2026 23:59:59.999
original: Sat Feb 14 2026 18:20:00.000
Apr 24 start: Fri Apr 24 2026 01:00:00.000
~~~

- كل دالة بتبدأ بـ [[new Date(x)]]: نسخة، فالأصل ([[original]]) فضل 18:20.
- [[setMonth(getMonth() + 1, 0)]]: الشهر الجاي واليوم 0 في نداء واحد = آخر يوم في الشهر ده. لو عملتهم نداءين ([[setMonth(getMonth() + 1)]] وبعدين [[setDate(0)]]) على ٣١ يناير، [[setMonth(1)]] لوحدها بتروح «٣١ فبراير» = ٣ مارس، و [[setDate(0)]] بترجّعها ٢٨ فبراير: **آخر الشهر الغلط**. جرّبناها: النداءين طلّعوا [[Sat Feb 28 2026]] والنداء الواحد [[Sat Jan 31 2026]]. وعلى ٣٠ أبريل الاتنين طلّعوا ٣٠ أبريل، فالباج بيظهر بس في الأيام ٢٩ و ٣٠ و ٣١.
- **٢٤ أبريل في القاهرة:** [[startOfDay]] طلعت **01:00** مش 00:00، لأن نص الليل اليوم ده مش موجود (الساعة نطت). فـ «اليوم بيبدأ نص الليل» مش صح في كل الأيام، وأي فلتر «من بداية النهارده» لازم يستخدم [[startOfDay]] مش [[00:00]] مكتوبة بإيدك.
- [[f.name]]: كل دالة متعرّفة بـ [[const x = () =>]] بتاخد اسم المتغير، فبنطبعه.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب التواريخ التلاتة قبل ما تشغّل:

~~~js
const a = new Date(2026, 2, 15, 10);
a.setDate(0); console.log(a.toDateString());
a.setMonth(12); console.log(a.toDateString());
a.setHours(-1); console.log(a.toDateString(), a.getHours());
~~~`, done: R`كتبت [[Sat Feb 28 2026]] ثم [[Thu Jan 28 2027]] ثم [[Wed Jan 27 2027 23]] وطلعوا كده، وتقدر تشرح كل ترحيلة.`, sol: R`~~~text الناتج: $env:TZ="Africa/Cairo"
Sat Feb 28 2026
Thu Jan 28 2027
Wed Jan 27 2027 23
~~~

1. [[setDate(0)]] على ١٥ مارس: اليوم 0 من مارس = اليوم اللي قبل ١ مارس = ٢٨ فبراير.
2. [[setMonth(12)]] على ٢٨ فبراير 2026: الشهر 12 مش موجود (آخر شهر 11)، فبيترحّل لشهر 0 في السنة الجاية: ٢٨ يناير 2027.
3. [[setHours(-1)]]: الساعة −1 = الساعة 23 من اليوم اللي قبله: ٢٧ يناير الساعة 23.

الترحيل ده هو اللي بيخلّي [[setDate(getDate() + 30)]] تشتغل عبر الشهور والسنين من غير ما تحسب أيام كل شهر.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** الكود ده هيطبع إيه؟ وبعدين اكتب السطر الأخير صح:

~~~js
const c = new Date(2026, 0, 1);
const r = c.setDate(5);
console.log(typeof r, r === c.getTime());
c.setDate(5).setMonth(1);
~~~`, done: R`توقعت [[number true]] وإن آخر سطر بيرمي [[TypeError]]، وكتبته سطرين أو بـ [[setFullYear(2026, 1, 5)]].`, sol: R`~~~text الناتج: node chain.js
number true
TypeError: c.setDate(...).setMonth is not a function
~~~

(السطر الأخير اتلف بـ try/catch عشان يطبع الرسالة.)

- كل setter بيرجّع **رقم الـ ms الجديد**، مش الـ Date. فـ [[c.setDate(5)]] بقت [[1767564000000]] (رقم)، والرقم مفيهوش [[setMonth]].
- ده عكس مكتبات زي dayjs اللي بترجّع object وتقدر تعمل chaining.
- **الصح:** سطرين ([[c.setDate(5); c.setMonth(1);]])، أو نداء واحد بياخد الأجزاء مع بعض: [[c.setFullYear(2026, 1, 5)]] أو [[c.setMonth(1, 5)]]. النداء الواحد أحسن لأنه بيمنع ترحيلة في النص (لو اليوم 31 والشهر الجديد فبراير).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** دالة بتاخد تاريخ من يوزر وتثبّت السنة على 2026، والـ validation بعدها بيقول إن [["bla"]] تاريخ سليم:

~~~js
function parseUserDate(text) {
  const d = new Date(text);
  d.setFullYear(2026);
  return d;
}
const v = parseUserDate("bla");
console.log(Number.isNaN(v.getTime()) ? "رفض" : "قبلها: " + v.toISOString());
~~~

شغّله الأول وشوف بنفسك، وبعدين صلّحه.`, done: R`شفت [[قبلها: 2025-12-31T22:00:00.000Z]] (بالقاهرة)، وعرفت إن [[setFullYear]] بالذات بيحيي الـ Invalid Date، والمصلّح بيرجّع [[null]] لـ [["bla"]].`, sol: R`~~~text الناتج: $env:TZ="Africa/Cairo" (الكود البايظ)
قبلها: 2025-12-31T22:00:00.000Z
~~~

**السبب (ودي حاجة مش معروفة):** كل الـ setters على Invalid Date بترجّع [[NaN]] والتاريخ بيفضل Invalid، **إلا** [[setFullYear]] و [[setUTCFullYear]]: المواصفات بتقول لو الرقم اللي جوه [[NaN]] يبدأ من 0 (الـ epoch) ويحط السنة. فـ [["bla"]] بقت أول يناير 2026 نص الليل بتوقيت الجهاز، والفحص اللي بعدها عدّاها.

~~~js parse-user-date.js
function parseUserDateFixed(text) {
  const d = new Date(text);
  if (Number.isNaN(d.getTime())) return null;
  d.setFullYear(2026);
  return d;
}
console.log(parseUserDateFixed("bla"), parseUserDateFixed("2025-05-05T10:00:00Z").toISOString());
~~~

~~~text الناتج: node parse-user-date.js
null 2026-05-05T10:00:00.000Z
~~~

القاعدة: افحص التاريخ **قبل** أي setter، مش بعده. (اتجرّب في Chrome 157 كمان: نفس السلوك.)` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[roundUpToSlot(iso, minutes)]]: بتاخد لحظة ISO وترجّع ISO لأول بداية «خانة» من [[minutes]] دقيقة عندها أو بعدها، بـ UTC: 09:07 مع 15 ← 09:15، و 09:15 بالظبط ← زي ما هي، و 09:15 وواحد ms ← 09:30، و 23:50 ← اليوم اللي بعده 00:00. بالـ setters الـ UTC بس. اكتب الحل في مربع «شغّل واختبر» تحت.`, done: R`الاختبارات اللي تحت عدّت، ومنها آخر دقيقة في السنة ← [[2027-01-01T00:00:00.000Z]] من غير ما تكتب حالة خاصة لآخر السنة.`, sol: R`~~~js slots.js
function roundUpToSlot(iso, minutes) {
  const d = new Date(iso);
  if (d.getUTCSeconds() || d.getUTCMilliseconds() || d.getUTCMinutes() % minutes) {
    d.setUTCMinutes(Math.floor(d.getUTCMinutes() / minutes) * minutes + minutes, 0, 0);
  }
  return d.toISOString();
}
for (const s of ["2026-11-21T09:07:00Z", "2026-11-21T09:15:00Z", "2026-11-21T09:15:00.001Z", "2026-11-21T23:50:10Z", "2026-12-31T23:59:00Z"]) console.log(s, "→", roundUpToSlot(s, 15));
~~~

~~~text الناتج: node slots.js (القاهرة و UTC نفس الناتج)
2026-11-21T09:07:00Z → 2026-11-21T09:15:00.000Z
2026-11-21T09:15:00Z → 2026-11-21T09:15:00.000Z
2026-11-21T09:15:00.001Z → 2026-11-21T09:30:00.000Z
2026-11-21T23:50:10Z → 2026-11-22T00:00:00.000Z
2026-12-31T23:59:00Z → 2027-01-01T00:00:00.000Z
~~~

- **الشرط:** لو مفيش ثواني ولا ms والدقايق على حدود الخانة، اللحظة نفسها بداية خانة فمتغيّرهاش.
- [[Math.floor(min / minutes) * minutes + minutes]]: بداية الخانة الحالية + خانة. 7 ← 0 + 15 = 15. و 50 ← 45 + 15 = 60.
- [[setUTCMinutes(60, 0, 0)]]: الدقيقة 60 مش موجودة فبتترحّل للساعة اللي بعدها، والساعة 24 لليوم اللي بعده، و ٣٢ ديسمبر للسنة اللي بعدها. التلات ترحيلات حصلوا لوحدهم.
- [[, 0, 0]]: نفس النداء بيصفّر الثواني والـ ms، فمش محتاج [[setUTCSeconds]] لوحدها.
- **ليه UTC؟** الخانات بالدقايق، والـ offset بتاع مصر ساعات كاملة، فالمحلي كان هيطلع نفس الحاجة هنا، بس في الهند (+5:30) خانات الساعة المحلية مش هي خانات UTC. اختار حسب «الخانة دي بتوقيت مين».` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** لحظة [["2026-09-29T22:30:00Z"]] (يعني 1:30 بعد نص الليل يوم ٣٠ في القاهرة). اعمل «بداية اليوم» مرة بـ [[setHours(0, 0, 0, 0)]] ومرة بـ [[setUTCHours(0, 0, 0, 0)]] على نسختين، واطبع الاتنين بـ [[toISOString]] بالقاهرة و UTC. الفرق كام ساعة؟ وأنهي واحدة «النهارده» لليوزر؟`, done: R`بالقاهرة طلع يومين مختلفين ([[2026-09-29T21:00Z]] و [[2026-09-29T00:00Z]]) بفرق ٢١ ساعة، وبـ UTC الاتنين واحد، وعرفت إن «النهارده» لليوزر هي المحلية.`, sol: R`~~~js start-of-day.js
const t = new Date("2026-09-29T22:30:00Z");
const a = new Date(t); a.setHours(0, 0, 0, 0);
const b = new Date(t); b.setUTCHours(0, 0, 0, 0);
console.log("local start", a.toISOString(), "utc start", b.toISOString(), (a - b) / 3600000);
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
local start 2026-09-29T21:00:00.000Z utc start 2026-09-29T00:00:00.000Z 21
~~~

~~~text الناتج: TZ=UTC
local start 2026-09-29T00:00:00.000Z utc start 2026-09-29T00:00:00.000Z 0
~~~

- **المحلية:** اللحظة في القاهرة ٣٠ سبتمبر 1:30 (+3)، وبدايته نص ليل ٣٠ بتوقيت القاهرة = [[21:00Z]] يوم ٢٩.
- **UTC:** اللحظة في UTC لسه ٢٩ سبتمبر، فبدايته [[00:00Z]] يوم ٢٩.
- الفرق ٢١ ساعة: يعني «طلبات النهارده» بالـ UTC على سيرفر هتجيب طلبات يوم مختلف تمامًا عن اللي اليوزر في القاهرة قاصده.

على سيرفر UTC، [[setHours]] و [[setUTCHours]] نفس الحاجة، فالباج مش هيبان غير على جهاز اليوزر أو لو السيرفر اتنقل. ولو محتاج «بداية اليوم في القاهرة» على سيرفر: [[process.env.TZ]] أو Intl، مش واحدة من دول.` },
          ],
          check: {
            lang: "js",
            starter: R`function roundUpToSlot(iso, minutes) {
  const d = new Date(iso);
  d.setUTCMinutes(Math.ceil(d.getUTCMinutes() / minutes) * minutes);
  return d.toISOString();
}`,
            tests: R`test("09:07 ← 09:15", () => expect(roundUpToSlot("2026-11-21T09:07:00Z", 15)).toBe("2026-11-21T09:15:00.000Z"));
test("على الحد بالظبط ← زي ما هي", () => expect(roundUpToSlot("2026-11-21T09:15:00Z", 15)).toBe("2026-11-21T09:15:00.000Z"));
test("بعد الحد بـ ms ← الخانة الجاية", () => expect(roundUpToSlot("2026-11-21T09:15:00.001Z", 15)).toBe("2026-11-21T09:30:00.000Z"));
test("بعد الحد بثواني", () => expect(roundUpToSlot("2026-11-21T09:15:30Z", 15)).toBe("2026-11-21T09:30:00.000Z"));
test("آخر اليوم ← بكرة", () => expect(roundUpToSlot("2026-11-21T23:50:10Z", 15)).toBe("2026-11-22T00:00:00.000Z"));
test("آخر السنة", () => expect(roundUpToSlot("2026-12-31T23:59:00Z", 15)).toBe("2027-01-01T00:00:00.000Z"));
test("خانات نص ساعة", () => expect(roundUpToSlot("2026-11-21T10:31:00Z", 30)).toBe("2026-11-21T11:00:00.000Z"));
test("خانات ساعة", () => expect(roundUpToSlot("2026-11-21T10:00:00.000Z", 60)).toBe("2026-11-21T10:00:00.000Z"));`,
            solution: R`function roundUpToSlot(iso, minutes) {
  const d = new Date(iso);
  if (d.getUTCSeconds() || d.getUTCMilliseconds() || d.getUTCMinutes() % minutes) {
    d.setUTCMinutes(Math.floor(d.getUTCMinutes() / minutes) * minutes + minutes, 0, 0);
  }
  return d.toISOString();
}`
          },
          flag: "script",
          deep: {
            why: R`«بداية اليوم» و «آخر الشهر» و «بكرة نفس الساعة» و «اقفل الخانة على ربع ساعة» كلهم setters. ولو فاكر إنها بترجّع Date أو إنها مبتعدّلش الأصل، أو مش عارف الترحيل بيعمل إيه، هتكتب كود بيشتغل ٣٥٠ يوم في السنة.`,
            how: R`كل setter محلي بيعمل ٣ خطوات: يفك الرقم اللي جوه لأجزاء بتوقيت الجهاز (زي الـ getters)، ويبدّل الأجزاء اللي ادّيتهاله، ويرجّع يحسب الـ ms من الأجزاء الجديدة (زي [[new Date(y, m, d, ...)]] بالظبط، بنفس الترحيل ونفس قاعدة الساعة اللي مش موجودة). والـ UTC نفس الكلام من غير توقيت. وبعدين بيحط الرقم الجديد جوه نفس الـ object ويرجّعه.

عشان الخطوة الأخيرة «بتحسب من الأجزاء»، [[setHours(getHours() + 1)]] مش دايمًا ساعة حقيقية: ليلة ٢٩ أكتوبر في القاهرة الساعة 23:30 (+3) + 1 على الحيطة = 00:30 (+2) = ساعتين حقيقيتين. و [[setTime(getTime() + 3600000)]] دايمًا ساعة حقيقية. والاستثناء الوحيد في الـ Invalid Date: [[setFullYear]] و [[setUTCFullYear]] بيبدأوا من 0 لو الرقم [[NaN]] (اتجرّب في Node 24.22 و Chrome 157)، والباقي بيفضل [[NaN]].`,
            when: R`المحلية للحاجات اللي اليوزر شايفها على ساعته (بداية يومه، آخر شهره، نفس الساعة بكرة). والـ UTC للحسابات على أيام تقويم أو لحظات مخزّنة. و [[setTime]] أو [[new Date(ms + ...)]] لما المدة بالدقايق الحقيقية (حجز ساعة، timeout، صلاحية token). ودايمًا على نسخة ([[new Date(x)]]) لو الـ Date جايلك من برّه.`,
            mistakes: R`[[d.setDate(5).setMonth(1)]] (رقم مش Date). و [[setMonth(m + 1)]] على ٣١ (بيعدّي شهر). و [[setHours(0)]] لوحدها (الدقايق والثواني فاضلين). و setters على Date جاي من دالة تانية (بتعدّله عندها). و [[setFullYear]] قبل الفحص. و [[setMonth()]] من غير argument (بيبقى [[NaN]] والتاريخ Invalid). وفي الانترفيو: «اكتب آخر يوم في الشهر» الإجابة: [[new Date(y, m + 1, 0)]] أو [[d.setMonth(d.getMonth() + 1, 0)]].`
          },
          teach: R`## الفكرة: الـ setter بيعدّل في مكانه ويرحّل

درس «Date ومطبّاته» استخدم [[setMonth]] و [[setDate]] وعرّفك إنهم بيعدّلوا الأصل وبيرحّلوا. هنا كل الـ setters، والأشكال اللي بتاخد أكتر من جزء، وقيمة الرجوع، والنسخ الـ UTC.

> الناتج من Node 24.22 على Windows بتوقيت القاهرة، إلا لو مكتوب غير كده. أول سطر بس هو اللي بيتغيّر بـ [[TZ=UTC]].

---

## ١. [[setFullYear(y, m, d)]]: أكتر من جزء في نداء، والرجوع رقم

~~~js
const d = new Date(2026, 0, 31, 15, 40);
console.log(d.setFullYear(2026, 1, 14), d.toDateString());
~~~

[[setFullYear]] بياخد السنة، واختياري الشهر واليوم. هنا غيّرنا التلاتة مرة واحدة لـ ١٤ فبراير 2026.

~~~text الناتج: القاهرة
1771076400000 Sat Feb 14 2026
~~~

~~~text الناتج: TZ=UTC (الرقم بس اتغيّر)
1771083600000 Sat Feb 14 2026
~~~

- الرقم = الـ ms الجديد اللي اتحط جوه [[d]]. بيختلف بين القاهرة و UTC لأن «١٤ فبراير 3:40 العصر» لحظة مختلفة في كل بلد.
- **ليه نداء واحد؟** لو كتبت [[setMonth(1)]] لوحدها على ٣١ يناير، كانت هتبقى ٣١ فبراير = ٣ مارس قبل ما تغيّر اليوم. الأجزاء اللي في نفس النداء بتتحط مع بعض وبعدين بيتحسب الترحيل.

| الـ setter (محلي) | الأجزاء اللي بياخدها | مثال |
|---|---|---|
| [[setFullYear()]] | سنة، شهر؟، يوم؟ | [[d.setFullYear(2027, 0, 1)]] = أول يناير 2027 |
| [[setMonth()]] | شهر (من 0)، يوم؟ | [[d.setMonth(1, 0)]] = آخر يناير |
| [[setDate()]] | يوم في الشهر | [[d.setDate(0)]] = آخر الشهر اللي فات |
| [[setHours()]] | ساعة، دقيقة؟، ثانية؟، ms؟ | [[d.setHours(0, 0, 0, 0)]] = بداية اليوم |
| [[setMinutes()]] | دقيقة، ثانية؟، ms؟ | [[d.setMinutes(90)]] = الساعة الجاية + نص |
| [[setSeconds()]] | ثانية، ms؟ | [[d.setSeconds(0, 0)]] = أول الدقيقة |
| [[setMilliseconds()]] | ms | [[d.setMilliseconds(1000)]] = الثانية الجاية |
| [[setTime()]] | رقم ms كامل | [[d.setTime(0)]] = الـ epoch |

ومفيش [[setDay]]: يوم الأسبوع نتيجة مش حاجة تتحط. عشان تروح للحد الجاي: [[d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7))]].

---

## ٢. [[setDate(0)]]: آخر يوم في الشهر اللي فات

~~~js
d.setDate(0);
console.log(d.toDateString());
~~~

~~~text الناتج
Sat Jan 31 2026
~~~

اليوم 0 = «اليوم اللي قبل يوم 1». من ١٤ فبراير، اليوم 0 من فبراير = ٣١ يناير. ونفس الفكرة: [[setDate(-1)]] = ٣٠ يناير، و [[setDate(45)]] من شهر ٣٠ يوم = ١٥ من الشهر اللي بعده (جرّبناهم).

---

## ٣. [[setHours(0, 0, 0, 0)]]: بداية اليوم

~~~js
d.setHours(0, 0, 0, 0);
console.log(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
~~~

~~~text الناتج
0 0 0 0
~~~

الأربعة أصفار: الساعة والدقيقة والثانية والـ ms. لو كتبت [[setHours(0)]] بس، الدقايق والثواني اللي كانت قبل كده (40 دقيقة هنا) هتفضل. و [[setHours(23, 59, 59, 999)]] = آخر لحظة في اليوم.

> يوم ٢٤ أبريل 2026 في القاهرة [[setHours(0, 0, 0, 0)]] بتدّي **01:00**: نص الليل مش موجود اليوم ده (درس «Date: getTimezoneOffset والتوقيت الصيفي»).

---

## ٤. [[setMinutes]] و [[setSeconds]] و [[setMilliseconds]]: الترحيل في الوقت

~~~js
d.setMinutes(90);
d.setSeconds(75, 20);
console.log(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
~~~

~~~text الناتج
1 31 15 20
~~~

- [[setMinutes(90)]]: 90 دقيقة = ساعة و 30، فالساعة بقت 1 والدقيقة 30.
- [[setSeconds(75, 20)]]: 75 ثانية = دقيقة و 15، فالدقيقة بقت 31 والثانية 15، والـ ms بقت 20 في نفس النداء.
- [[setMilliseconds(1500)]] بالمنطق ده = ثانية زيادة و 500 ms. والأرقام السالبة بترجع لورا: [[setMinutes(-1)]] = الدقيقة 59 من الساعة اللي فاتت.

---

## ٥. نسخ UTC: [[setUTCMonth]] و [[setUTCFullYear]] و [[setUTCHours]]

~~~js
const u = new Date("2026-03-31T23:30:00Z");
u.setUTCMonth(1);
console.log(u.toISOString());
~~~

~~~text الناتج: أي توقيت
2026-03-03T23:30:00.000Z
~~~

نفس فخ آخر الشهر بالـ UTC: ٣١ مارس ← «٣١ فبراير» ← ٣ مارس. الساعة 23:30 UTC فضلت زي ما هي لأن [[setUTCMonth]] مبيلمسش الوقت.

~~~js
u.setUTCFullYear(2028, 1, 29);
u.setUTCHours(0, 0, 0, 0);
console.log(u.toISOString());
~~~

~~~text الناتج
2028-02-29T00:00:00.000Z
~~~

٢٩ فبراير 2028 (كبيسة) و بداية اليوم UTC. لو عملت بعدها [[setUTCFullYear(2029)]] هتبقى [[2029-03-01]]: 2029 مش كبيسة، والـ ٢٩ اترحّل (جرّبناها).

| الـ setter (UTC) | توأمه المحلي | مثال على [[2026-11-21T09:05:07.042Z]] (اتجرّب) |
|---|---|---|
| [[setUTCFullYear()]] | [[setFullYear()]] | [[setUTCFullYear(2028)]] ← [[2028-11-21T09:05:07.042Z]] |
| [[setUTCMonth()]] | [[setMonth()]] | [[setUTCMonth(11, 31)]] ← [[2026-12-31T09:05:07.042Z]] |
| [[setUTCDate()]] | [[setDate()]] | [[setUTCDate(1)]] ← [[2026-11-01T09:05:07.042Z]] |
| [[setUTCHours()]] | [[setHours()]] | [[setUTCHours(23, 59)]] ← [[2026-11-21T23:59:07.042Z]] |
| [[setUTCMinutes()]] | [[setMinutes()]] | [[setUTCMinutes(0, 0, 0)]] ← [[2026-11-21T09:00:00.000Z]] |
| [[setUTCSeconds()]] | [[setSeconds()]] | [[setUTCSeconds(60)]] ← [[2026-11-21T09:06:00.042Z]] |
| [[setUTCMilliseconds()]] | [[setMilliseconds()]] | [[setUTCMilliseconds(-1)]] ← [[2026-11-21T09:05:06.999Z]] |

---

## ٦. الـ setters على Invalid Date

~~~js
const bad = new Date("x");
console.log(bad.setDate(5), bad.setFullYear(2026) > 0);
~~~

~~~text الناتج
NaN true
~~~

- [[setDate(5)]] على Invalid Date: [[NaN]] والتاريخ فضل Invalid. ونفس الكلام [[setHours]] وكل الباقي.
- [[setFullYear(2026)]]: **رجّع رقم صحيح!** المواصفات بتقول [[setFullYear]] و [[setUTCFullYear]] لو الرقم [[NaN]] يبدأوا من 0، فالـ Invalid Date بقى ١ يناير 2026. ده بيخلّي تاريخ بايظ يعدّي أي فحص بعده، فافحص قبل.
- و [[setMonth()]] من غير argument: [[NaN]] والتاريخ بقى Invalid (اتجرّب).

---

## الخلاصة

| المطبّ | الصح |
|---|---|
| الـ setter بيرجّع رقم | متعملش chaining، أو استخدم نداء بأكتر من جزء |
| بيعدّل الأصل | [[const x = new Date(d)]] الأول |
| [[setHours(0)]] لوحدها | [[setHours(0, 0, 0, 0)]] |
| آخر الشهر | [[setMonth(m + 1, 0)]] أو [[setDate(0)]] |
| ساعة على الحيطة مش ساعة حقيقية | [[setTime(getTime() + 3600000)]] للمدة الحقيقية |
| [[setFullYear]] بيحيي Invalid Date | افحص [[Number.isNaN]] قبل |`,
          lines: [
            R`٣١ يناير 2026 الساعة 3:40 العصر بتوقيت الجهاز. يوم ٣١ مقصود عشان نشوف الترحيل.`,
            R`[[setFullYear]] بياخد السنة والشهر واليوم في نداء واحد وبيرجّع رقم الـ ms الجديد، والتاريخ بقى [[Sat Feb 14 2026]] والساعة زي ما هي.`,
            R`اليوم 0 من فبراير = اليوم اللي قبل أول فبراير، يعني آخر يوم في يناير. أسهل طريقة لـ «آخر يوم في الشهر اللي فات».`,
            R`بيطبع [[Sat Jan 31 2026]]: الـ [[d]] نفسه اتغيّر، مفيش نسخة.`,
            R`بيصفّر الساعة والدقيقة والثانية والـ ms مرة واحدة: ده «بداية اليوم» بتوقيت الجهاز.`,
            R`بيطبع [[0 0 0 0]]: الأربع أجزاء اتصفّروا. لو كتبت [[setHours(0)]] بس كانت الـ 40 دقيقة فضلت.`,
            R`90 دقيقة مش موجودة في ساعة، فبتترحّل: ساعة كاملة لقدام والدقيقة 30.`,
            R`75 ثانية = دقيقة و 15 ثانية، والرقم التاني (20) بيحط الـ ms في نفس النداء.`,
            R`بيطبع [[1 31 15 20]]: الترحيلتين اتجمعوا على الساعة والدقيقة.`,
            R`لحظة بـ [[Z]] في آخر يوم في مارس، عشان نشوف نفس فخ آخر الشهر بالـ UTC.`,
            R`بيغيّر الشهر لفبراير بتوقيت UTC، واليوم لسه 31 فبيترحّل لـ ٣ مارس.`,
            R`بيطبع [[2026-03-03T23:30:00.000Z]] في أي توقيت: الـ UTC setters مبتبصّش على توقيت الجهاز.`,
            R`سنة وشهر ويوم بـ UTC في نداء واحد: ٢٩ فبراير 2028، وهي سنة كبيسة فاليوم موجود.`,
            R`بداية اليوم بـ UTC: الساعة والدقيقة والثانية والـ ms أصفار في جرينتش.`,
            R`بيطبع [[2028-02-29T00:00:00.000Z]]: نص ليل ٢٩ فبراير UTC.`,
            R`تاريخ بايظ، الرقم اللي جوه [[NaN]].`,
            R`[[setDate]] على Invalid Date بيرجّع [[NaN]]، بس [[setFullYear]] بيبدأ من الـ epoch ويرجّع رقم سليم، فبيطبع [[NaN true]]. افحص قبل أي setter.`,
          ],
          pre: [
            "js/Date: الـ getters و getUTC",
            { to: "js/Date ومطبّاته", why: R`[[setMonth]] و [[setDate]] والـ overflow و [[addMonths]] لأول مرة` },
          ],
          ref: [
            { t: "MDN: Date.prototype.setFullYear()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear" },
            { t: "MDN: Date.prototype.setMonth()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth" },
            { t: "MDN: Date.prototype.setDate()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate" },
            { t: "MDN: Date.prototype.setHours()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours" },
            { t: "MDN: Date.prototype.setMinutes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes" },
            { t: "MDN: Date.prototype.setSeconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds" },
            { t: "MDN: Date.prototype.setMilliseconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds" },
            { t: "MDN: Date.prototype.setUTCFullYear()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear" },
            { t: "MDN: Date.prototype.setUTCMonth()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMonth" },
            { t: "MDN: Date.prototype.setUTCDate()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCDate" },
            { t: "MDN: Date.prototype.setUTCHours()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCHours" },
            { t: "MDN: Date.prototype.setUTCMinutes()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMinutes" },
            { t: "MDN: Date.prototype.setUTCSeconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCSeconds" },
            { t: "MDN: Date.prototype.setUTCMilliseconds()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMilliseconds" },
          ],
        },
        {
          cmd: "Date: toISOString و toJSON و toLocaleDateString",
          title: "تحوّل Date لنص إزاي، وأنهي شكل للتخزين وأنهي لليوزر وأنهي للوج؟",
          desc: R`الـ Date فيه ٩ طرق تطلّع بيها نص، وكل واحدة لمكان: [[toISOString()]] (و [[toJSON()]] اللي [[JSON.stringify]] بيناديها) بتكتب ISO بـ UTC وده اللي يتخزّن ويتبعت؛ و [[toString()]] و [[toDateString()]] و [[toTimeString()]] بالإنجليزي بتوقيت الجهاز للـ debugging؛ و [[toUTCString()]] لشكل HTTP؛ و [[toLocaleString()]] و [[toLocaleDateString()]] و [[toLocaleTimeString()]] بلغة وتوقيت تختارهم (نفس options بتاعة [[Intl.DateTimeFormat]]) وده اللي يتعرض لليوزر.

ومع Invalid Date: كلهم بيرجّعوا [["Invalid Date"]] ما عدا اتنين: [[toJSON()]] بيرجّع [[null]] (فالـ JSON بيبقى [[{"at":null}]])، و [[toISOString()]] بيرمي [[RangeError: Invalid time value]]. والـ JSON مبيرجّعش Date لوحده: [[JSON.parse]] بيدّيك نص، ولازم reviver أو [[new Date(...)]] بإيدك.`,
          example: R`const d = new Date("2026-11-21T09:05:07.042Z");
console.log(d.toString());
console.log(d.toDateString(), "|", d.toTimeString());
console.log(d.toISOString(), d.toJSON());
console.log(d.toLocaleDateString("ar-EG", { timeZone: "Africa/Cairo" }), d.toLocaleTimeString("ar-EG", { timeZone: "Africa/Cairo" }));
console.log(d.toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Cairo" }));
const json = JSON.stringify({ id: 7, at: d });
const back = JSON.parse(json, (key, value) => (key === "at" ? new Date(value) : value));
console.log(json, back.at.getTime() === d.getTime());
const bad = new Date("nope");
console.log(String(bad), bad.toJSON(), JSON.stringify({ at: bad }));
try { bad.toISOString(); } catch (e) { console.log(e.name + ": " + e.message); }`,
          try: R`اعمل «إيصال» لطلب اتعمل [["2026-11-21T19:45:00Z"]]: سطر بالتاريخ العربي الكامل (اسم اليوم واليوم واسم الشهر والسنة)، وسطر بالساعة بالعربي (ساعة ودقيقة بس)، وسطر إنجليزي ([[en-GB]] بـ [[dateStyle: "medium"]] و [[timeStyle: "short"]])، كلهم بتوقيت القاهرة، وشغّله بـ [[TZ=UTC]] عشان تتأكد إن الناتج مبيعتمدش على الجهاز.`,
          sol: R`~~~js receipt.js
const at = new Date("2026-11-21T19:45:00Z");
const opts = { timeZone: "Africa/Cairo" };
console.log($__btالتاريخ: $__{at.toLocaleDateString("ar-EG", { ...opts, weekday: "long", day: "numeric", month: "long", year: "numeric" })}$__bt);
console.log($__btالساعة: $__{at.toLocaleTimeString("ar-EG", { ...opts, hour: "numeric", minute: "2-digit" })}$__bt);
console.log($__btDate: $__{at.toLocaleDateString("en-GB", { ...opts, dateStyle: "medium" })} $__{at.toLocaleTimeString("en-GB", { ...opts, timeStyle: "short" })}$__bt);
~~~

~~~text الناتج: TZ=UTC node receipt.js
التاريخ: السبت، ٢١ نوفمبر ٢٠٢٦
الساعة: ٩:٤٥ م
Date: 21 Nov 2026 21:45
~~~

- [[{ ...opts, weekday: ... }]]: الـ spread بيحط [[timeZone]] في كل options من غير ما تكرره، فلو المحل اتنقل لبلد تانية تغيّر سطر واحد.
- 19:45 UTC = 21:45 في القاهرة (+2 في نوفمبر)، وبالعربي [[٩:٤٥ م]] (مساءً). اتشغّل على جهاز UTC وطلع وقت القاهرة: يعني الـ [[timeZone]] هو اللي بيحدد، مش الجهاز.
- [[dateStyle]] مع [[toLocaleDateString]] و [[timeStyle]] مع [[toLocaleTimeString]] بس: لو عكستهم بترمي TypeError (الدرس تحت).`,
          practice: [
            { lvl: 'سريع', t: R`**اختار الـ method:** لكل مكان من دول، أنهي طريقة تحويل تستخدم؟ (١) عمود [[created_at]] في JSON رايح لـ API. (٢) header [[Last-Modified]] في رد HTTP. (٣) «آخر دخول: السبت ٢١ نوفمبر» في صفحة البروفايل. (٤) [[console.log]] وانت بتدوّر على باج. (٥) اسم ملف backup. (٦) الساعة بس جنب رسالة شات.`, done: R`جاوبت الـ ٦ وكل إجابة معاها السبب، وشغّلت [[toUTCString()]] وشفت الشكل بتاعه.`, sol: R`**الإجابة:**

| المكان | الطريقة | ليه |
|---|---|---|
| (١) JSON لـ API | [[toISOString()]] (أو سيب [[JSON.stringify]] يعملها بـ [[toJSON]]) | UTC بـ Z، أي لغة تقراه |
| (٢) [[Last-Modified]] | [[toUTCString()]] | ده شكل HTTP-date اللي المواصفات طالباه |
| (٣) صفحة البروفايل | [[toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" })]] | بلغة اليوزر وتوقيته |
| (٤) debugging | [[toISOString()]] أو [[toString()]] | ISO مش بيتلخبط بالتوقيت، و toString بيوريك توقيت الجهاز |
| (٥) اسم ملف | [[toISOString()]] بعد ما تشيل [[:]] | الـ [[:]] ممنوعة في أسامي ملفات Windows، والترتيب بالاسم = الترتيب بالوقت |
| (٦) جنب رسالة | [[toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit" })]] | الساعة بس بشكل اليوزر |

~~~js which.js
console.log(new Date("2026-11-21T09:05:07.042Z").toUTCString());
~~~

~~~text الناتج: node which.js
Sat, 21 Nov 2026 09:05:07 GMT
~~~

[[toUTCString]] من غير ms ودايمًا [[GMT]]، وده الشكل اللي [[Date.parse]] مطلوب منه يقراه (درس «Date.UTC و Date.parse»).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[reviveDates(text)]] بتعمل [[JSON.parse]] وترجّع كل نص ISO كامل بـ Z (في أي مستوى في الـ object) كـ Date، وتسيب النصوص التانية زي [["2026-11-21"]] نصوص. جرّبها على طلب فيه [[createdAt]] و array فيها [[shippedAt]].`, done: R`[[createdAt]] و [[items[0].shippedAt]] رجعوا [[instanceof Date]]، و [[note: "2026-11-21"]] فضل نص، والـ round trip بيرجّع نفس الـ ms.`, sol: R`~~~js revive.js
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
const reviveDates = text => JSON.parse(text, (k, v) => (typeof v === "string" && ISO.test(v) ? new Date(v) : v));
const order = { id: 7, note: "2026-11-21", createdAt: new Date("2026-11-21T09:05:07.042Z"), items: [{ shippedAt: new Date("2026-11-22T10:00:00Z") }] };
const text = JSON.stringify(order);
const back = reviveDates(text);
console.log(text);
console.log(back.createdAt instanceof Date, back.items[0].shippedAt instanceof Date, typeof back.note);
~~~

~~~text الناتج: node revive.js
{"id":7,"note":"2026-11-21","createdAt":"2026-11-21T09:05:07.042Z","items":[{"shippedAt":"2026-11-22T10:00:00.000Z"}]}
true true string
~~~

- **الـ reviver:** [[JSON.parse(text, (key, value) => ...)]] بينادي الدالة على كل قيمة، من جوه لبرّه، واللي ترجّعه بيتحط مكانها. فبتوصل لـ [[shippedAt]] جوه الـ array من غير ما تلف بنفسك.
- **الـ regex صارم:** بس الشكل اللي [[toISOString]] بيطلّعه (بـ Z). لو قبلت أي نص [[Date.parse]] بيفهمه، [["2026-11-21"]] في [[note]] هيتحوّل Date وهو مقصود نص، ورقم تليفون زي [["2026"]] ممكن يتحوّل كمان.
- **ليه مش [[key === "createdAt"]]؟** ده كويس لو عارف الأسامي (زي المثال في الدرس)، بس كل field جديد محتاج تعديل. الـ regex بيغطّي الكل، بس افتكر إن أي نص ISO «بالصدفة» هيتحوّل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** جدول بيعرض عمود تواريخ جاي من ملف CSV، والصفحة كلها بتقع لما صف واحد فاضي أو فيه كلام:

~~~js
const rows = ["2026-11-21T09:05:07Z", "", "garbage", null, 1795248904000];
console.log(rows.map(r => new Date(r).toISOString()));
~~~

خلّي الصفوف البايظة تتعرض [["—"]] والباقي يكمّل. وفيه صف هيفاجئك.`, done: R`الكود القديم بيرمي [[RangeError: Invalid time value]]، والمصلّح بيطبع [["—"]] للفاضي و [["garbage"]]، ولقيت إن [[null]] بقى [[1970-01-01]] وقررت تعمل فيه إيه.`, sol: R`~~~text الناتج: الكود البايظ
RangeError: Invalid time value
~~~

~~~js safe-list.js
const rows = ["2026-11-21T09:05:07Z", "", "garbage", null, 1795248904000];
const show = r => {
  if (r === null || r === undefined || r === "") return "—";
  const d = new Date(r);
  return Number.isNaN(d.getTime()) ? "—" : d.toISOString();
};
for (const r of rows) console.log(JSON.stringify(r), "→", show(r));
~~~

~~~text الناتج: node safe-list.js
"2026-11-21T09:05:07Z" → 2026-11-21T09:05:07.000Z
"" → —
"garbage" → —
null → —
1795248904000 → 2026-11-21T08:15:04.000Z
~~~

- **[[toISOString]] هي الوحيدة اللي بترمي** على Invalid Date. [[toString]] و [[toLocaleDateString]] بيرجّعوا [["Invalid Date"]] في هدوء. فأي [[map]] فيها [[toISOString]] على داتا من برّه لازم فحص.
- **المفاجأة:** [[new Date(null)]] = الـ epoch (null بيتحوّل 0)، فمن غير الشرط الأول كانت هتطلع [[1970-01-01T00:00:00.000Z]] كأنه تاريخ حقيقي. أول نسخة من التصليح (بالـ [[isNaN]] بس) طلّعت كده بالظبط. القيمة الفاضية لازم تتعامل لوحدها.
- **الرقم:** epoch بالـ ms بيتقري عادي، فـ [[1795248904000]] بقى تاريخ سليم.` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[fileStamp(d)]] بترجّع [["2026-11-21_09-05-07"]] (UTC، من غير ms، و [[_]] بدل [[T]] و [[-]] بدل [[:]]) عشان تتحط في اسم ملف backup. ولو الـ Date بايظ ترجّع [[null]] مش error. اكتب الحل في مربع «شغّل واختبر» تحت.`, done: R`الاختبارات اللي تحت عدّت، وتقدر تقول ليه الأسامي دي بتترتب بالاسم بنفس ترتيب الوقت.`, sol: R`~~~js file-stamp.js
const fileStamp = d => (Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 19).replace("T", "_").replaceAll(":", "-"));
console.log(fileStamp(new Date("2026-11-21T09:05:07.042Z")), $__btbackup-$__{fileStamp(new Date(0))}.sql$__bt, fileStamp(new Date("x")));
~~~

~~~text الناتج: node file-stamp.js
2026-11-21_09-05-07 backup-1970-01-01_00-00-00.sql null
~~~

- [[slice(0, 19)]]: أول ١٩ حرف من [["2026-11-21T09:05:07.042Z"]] = لحد الثواني، من غير [[.042Z]].
- [[replace("T", "_")]] مرة واحدة، و [[replaceAll(":", "-")]] لكل النقطتين. الـ [[:]] ممنوعة في أسامي الملفات على Windows.
- **ليه ISO؟** السنة الأول وبعدين الشهر وبعدين اليوم، وكل حتة بعدد أرقام ثابت، فالترتيب الأبجدي = الترتيب الزمني. [[ls]] أو File Explorer بيرتّبوا الـ backups صح من غير ما تعمل حاجة. ولو استخدمت [[toLocaleString]] ([["21/11/2026"]]) الترتيب هيبوظ.
- **UTC:** على سيرفر بيعمل backups بالليل، التوقيت المحلي ممكن يكرر نفس الاسم في الساعة اللي بتتكرر آخر أكتوبر. UTC مفيهوش ساعة متكررة.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** إيه اللي هيطلع من كل سطر؟ (فيهم اتنين بيرموا error)

~~~js
const d = new Date("2026-11-21T09:05:07.042Z");
console.log(d.toLocaleDateString("ar-EG", { hour: "numeric" }));
console.log(d.toLocaleTimeString("ar-EG", { month: "long" }));
console.log(d.toLocaleDateString("ar-EG", { timeStyle: "short" }));
console.log(d.toLocaleTimeString("ar-EG", { dateStyle: "short" }));
~~~`, done: R`توقعت إن الأولانيين بيطلّعوا تاريخ ووقت **مع بعض** مش جزء واحد، والتانيين بيرموا [[TypeError]]، وشغّلتهم (كل واحد في try) وطلع كده.`, sol: R`~~~text الناتج: $env:TZ="Africa/Cairo"
٢١‏/١١‏/٢٠٢٦، ١١ ص
نوفمبر في ١١:٠٥:٠٧ ص
TypeError: Invalid option : timeStyle
TypeError: Invalid option : dateStyle
~~~

- **[[toLocaleDateString]] = «لازم تاريخ»:** لو الـ options مفيهاش ولا جزء من التاريخ (year أو month أو day أو weekday)، بيزوّد اليوم والشهر والسنة الافتراضيين، **وبيسيب الأجزاء اللي انت طلبتها**. فـ [[{ hour }]] طلّعت تاريخ + ساعة.
- **[[toLocaleTimeString]] = «لازم وقت»:** نفس الفكرة، [[{ month }]] طلّعت الشهر + الساعة والدقيقة والثانية.
- **[[timeStyle]] مع [[toLocaleDateString]]:** ممنوع، والعكس كمان: [[TypeError: Invalid option : timeStyle]]. كل واحدة بتقبل الـ style بتاعها بس. (Node 24.22 و Chrome 157 طلّعوا نفس الرسالة بالظبط.)

يعني الـ method بيحدد «لازم يبقى فيه إيه»، والـ options بتزوّد عليه. لو عايز تحكم كامل في الأجزاء استخدم [[toLocaleString]] أو [[Intl.DateTimeFormat]] مباشرة.` },
          ],
          check: {
            lang: "js",
            starter: R`function fileStamp(d) {
  return d.toISOString();
}`,
            tests: R`test("الشكل", () => expect(fileStamp(new Date("2026-11-21T09:05:07.042Z"))).toBe("2026-11-21_09-05-07"));
test("الـ epoch", () => expect(fileStamp(new Date(0))).toBe("1970-01-01_00-00-00"));
test("مفيش : في الناتج", () => expect(fileStamp(new Date("2026-01-02T03:04:05Z")).includes(":")).toBe(false));
test("Invalid Date ← null", () => expect(fileStamp(new Date("x"))).toBe(null));
test("الترتيب بالاسم = الترتيب بالوقت", () => {
  const a = fileStamp(new Date("2026-09-30T23:00:00Z")), b = fileStamp(new Date("2026-10-01T01:00:00Z"));
  expect([b, a].sort()).toEqual([a, b]);
});`,
            solution: R`function fileStamp(d) {
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 19).replace("T", "_").replaceAll(":", "-");
}`
          },
          flag: "script",
          deep: {
            why: R`كل تاريخ بيخرج من البرنامج بيخرج كنص: في JSON، أو في الصفحة، أو في اللوج، أو في اسم ملف. والنص الغلط في المكان الغلط هو مصدر نص باجات التواريخ: [[toLocaleString()]] متخزّن في داتابيز ومحدش عارف يقراه، أو [[toString()]] في API، أو [[toISOString()]] بيوقع الصفحة على صف فاضي.`,
            how: R`[[toString()]] = [[toDateString()]] + مسافة + [[toTimeString()]]، والشكل محدد في المواصفات (اسم اليوم والشهر بالإنجليزي، و [[GMT+0200]])، بس الاسم اللي بين القوسين ([[Eastern European Standard Time]]) من الـ engine. [[toISOString()]] دايمًا [[YYYY-MM-DDTHH:mm:ss.sssZ]] بـ UTC، والسنين برّه 0–9999 بتتكتب ٦ أرقام بإشارة ([[+010000-01-01T00:00:00.000Z]] و [[-000001-01-01T00:00:00.000Z]]، اتجرّبوا). [[toJSON()]] بتنادي [[toISOString]] لو الرقم سليم وإلا [[null]]، وهي generic: [[Date.prototype.toJSON.call({ toISOString() { return "custom"; } })]] رجّع [["custom"]]. و [[toLocale…String(locale, options)]] بتعمل [[Intl.DateTimeFormat]] جديد كل نداء: في ليستة طويلة اعمل formatter مرة واحدة واستخدم [[format]] (درس «UTC و Intl.DateTimeFormat»).

ومن غير locale: الناتج بلغة النظام. على الجهاز ده Node طلّع [[11/21/2026, 11:05:07 AM]] (إنجليزي أمريكي) وده مش هيبقى نفس الشكل على جهاز تاني.`,
            when: R`للتخزين والـ APIs والـ logs اللي مكنة هتقراها: [[toISOString()]]. لليوزر: [[toLocaleDateString]] و [[toLocaleTimeString]] (أو Intl) بـ locale و [[timeZone]] صريحين. لـ HTTP headers والإيميل: [[toUTCString()]]. للـ debugging بس: [[toString()]]. و [[toDateString()]] و [[toTimeString()]] نادرًا، لما محتاج نص إنجليزي ثابت سريع في سكربت.`,
            mistakes: R`[[toLocaleString()]] من غير locale ولا timeZone (بيختلف من جهاز لجهاز). وتخزين نص عرض في الداتابيز. و [[toISOString().slice(0, 10)]] على إنه «تاريخ النهارده» (ده تاريخ UTC). و [[toISOString]] على داتا مش مفحوصة. و [[JSON.parse]] وافتراض إن الـ Dates رجعت Dates. ومقارنة نصوص [[toLocaleDateString("ar-EG")]] (فيها علامة اتجاه مخفية U+200F). وفي الانترفيو: «ليه [[JSON.stringify(new Date())]] بيطلع نص بين علامتين تنصيص؟» الإجابة: [[toJSON]] بترجّع [[toISOString()]] و JSON بيكتبه string.`
          },
          teach: R`## الفكرة: كل نص ليه مكان

نفس اللحظة، ٩ نصوص. الدرس بيعدّي عليهم بالترتيب ويقولك كل واحد لمين.

> الناتج من Node 24.22 على Windows بتوقيت القاهرة، والسطور اللي بتختلف بـ [[TZ=UTC]] مكتوب ناتجها التاني.

~~~js
const d = new Date("2026-11-21T09:05:07.042Z");
~~~

---

## ١. [[toString()]]: كل حاجة بتوقيت الجهاز

~~~js
console.log(d.toString());
~~~

~~~text الناتج: القاهرة
Sat Nov 21 2026 11:05:07 GMT+0200 (Eastern European Standard Time)
~~~

~~~text الناتج: TZ=UTC
Sat Nov 21 2026 09:05:07 GMT+0000 (Coordinated Universal Time)
~~~

ده اللي بيطلع لو عملت [[String(d)]] أو [[d + ""]] أو حطيته في template literal. مفيد في الـ debugging لأنه بيقولك الجهاز شايف اللحظة دي إزاي، بس الاسم اللي بين القوسين بيختلف من engine لـ engine، فمتعملوش parse ولا تخزّنه.

---

## ٢. [[toDateString()]] و [[toTimeString()]]: نصين الـ toString

~~~js
console.log(d.toDateString(), "|", d.toTimeString());
~~~

~~~text الناتج: القاهرة
Sat Nov 21 2026 | 11:05:07 GMT+0200 (Eastern European Standard Time)
~~~

[[toString()]] متقسّم: التاريخ لوحده (إنجليزي، بتوقيت الجهاز) والوقت لوحده ومعاه الـ offset. مفيش منهم نسخة UTC.

---

## ٣. [[toISOString()]] و [[toJSON()]]: للتخزين والإرسال

~~~js
console.log(d.toISOString(), d.toJSON());
~~~

~~~text الناتج: أي توقيت
2026-11-21T09:05:07.042Z 2026-11-21T09:05:07.042Z
~~~

- [[toISOString()]]: ISO 8601 بـ UTC، والـ ms دايمًا ٣ أرقام، و [[Z]] في الآخر. نفس النص على أي جهاز، وأي لغة برمجة أو داتابيز بتقراه.
- [[toJSON()]]: نفس النص. موجودة عشان [[JSON.stringify]] بيدوّر على method بالاسم ده في أي object وبيستخدم اللي بترجّعه.

---

## ٤. [[toLocaleDateString()]] و [[toLocaleTimeString()]]: لليوزر

~~~js
console.log(d.toLocaleDateString("ar-EG", { timeZone: "Africa/Cairo" }), d.toLocaleTimeString("ar-EG", { timeZone: "Africa/Cairo" }));
~~~

~~~text الناتج: أي توقيت (لأن timeZone محدد)
٢١‏/١١‏/٢٠٢٦ ١١:٠٥:٠٧ ص
~~~

- الـ argument الأول **locale**: [["ar-EG"]] = عربي مصر (أرقام عربي، و ص و م).
- التاني **options**: نفس options بتاعة [[Intl.DateTimeFormat]]. و [[timeZone]] هنا هو اللي خلّى الناتج القاهرة حتى على جهاز UTC.
- [[toLocaleDateString]] التاريخ بس، و [[toLocaleTimeString]] الوقت بس، و [[toLocaleString]] الاتنين.

~~~js
console.log(d.toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Cairo" }));
~~~

~~~text الناتج
السبت، ٢١ نوفمبر
~~~

حددنا الأجزاء: اسم اليوم كامل، واليوم رقم، واسم الشهر كامل. اللي متحددش (السنة) مش بيظهر.

| الطريقة | لازم يبقى فيها | ممنوع معاها | من غير options |
|---|---|---|---|
| [[toLocaleDateString()]] | جزء تاريخ (لو مفيش بيزوّد يوم/شهر/سنة) | [[timeStyle]] | [[11/21/2026]] على الجهاز ده |
| [[toLocaleTimeString()]] | جزء وقت (لو مفيش بيزوّد ساعة/دقيقة/ثانية) | [[dateStyle]] | [[11:05:07 AM]] |
| [[toLocaleString()]] | الاتنين افتراضيًا | مفيش | [[11/21/2026, 11:05:07 AM]] |

والـ «من غير options» ده بلغة **النظام** وتوقيته: Node على الجهاز ده طلّع إنجليزي أمريكي. على جهاز تاني هيطلع غير كده، فحدد الـ locale دايمًا.

---

## ٥. الـ JSON رايح جاي

~~~js
const json = JSON.stringify({ id: 7, at: d });
const back = JSON.parse(json, (key, value) => (key === "at" ? new Date(value) : value));
console.log(json, back.at.getTime() === d.getTime());
~~~

~~~text الناتج
{"id":7,"at":"2026-11-21T09:05:07.042Z"} true
~~~

- [[JSON.stringify]] لقى Date فنادى [[toJSON()]]: الـ Date بقى **نص** في الـ JSON. JSON مفيهوش نوع تاريخ.
- [[JSON.parse(json)]] لوحده كان هيرجّع [[at]] نص. التاني (reviver) دالة بتتنادى على كل key: لو [["at"]] نعمله [[new Date(value)]].
- [[true]]: رجع نفس الـ ms بالظبط، ومفيش حاجة ضاعت (الـ ms محفوظة في ISO).

---

## ٦. Invalid Date: نص، و null، و RangeError

~~~js
const bad = new Date("nope");
console.log(String(bad), bad.toJSON(), JSON.stringify({ at: bad }));
try { bad.toISOString(); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
Invalid Date null {"at":null}
RangeError: Invalid time value
~~~

| الطريقة | على Invalid Date |
|---|---|
| [[toString()]] و [[toDateString()]] و [[toTimeString()]] و [[toUTCString()]] | بترجّع النص [["Invalid Date"]] في هدوء من غير error |
| [[toLocaleString()]] و [[toLocaleDateString()]] و [[toLocaleTimeString()]] | نفس النص [["Invalid Date"]] بالإنجليزي حتى مع [["ar-EG"]] |
| [[toJSON()]] | [[null]]، فالـ JSON بيبقى [[null]] من غير error |
| [[toISOString()]] | **بترمي** [[RangeError: Invalid time value]] وبتوقف الكود لو مفيش try |

يعني الـ API ممكن يستلم [[null]] من غير ما حد يعرف إن فيه تاريخ باظ، و [[toISOString]] بتوقّع الصفحة. الاتنين بيتعالجوا بنفس الطريقة: افحص أول ما التاريخ يدخل.

---

## ٧. [[toUTCString()]]: شكل HTTP

~~~text الناتج: d.toUTCString()
Sat, 21 Nov 2026 09:05:07 GMT
~~~

UTC دايمًا، من غير ms، والشكل اللي headers زي [[Date]] و [[Last-Modified]] و [[Expires]] بيستخدموه. (اسمها القديم [[toGMTString]] لسه موجود وهو نفس الدالة بالظبط: [[Date.prototype.toGMTString === Date.prototype.toUTCString]] بـ [[true]].)

---

## الخلاصة

| الطريقة | توقيت | لمين |
|---|---|---|
| [[toISOString()]] و [[toJSON()]] | UTC | التخزين والـ APIs واللوج وأسامي الملفات |
| [[toUTCString()]] | UTC | HTTP headers والإيميل |
| [[toString()]] و [[toDateString()]] و [[toTimeString()]] | الجهاز | الـ debugging |
| [[toLocaleString()]] و [[toLocaleDateString()]] و [[toLocaleTimeString()]] | اللي تحدده بـ [[timeZone]] | اليوزر |`,
          lines: [
            R`لحظة محددة بـ [[Z]] و ms (042) عشان نشوف كل طريقة بتعمل إيه في الـ ms والتوقيت.`,
            R`[[toString()]] بالإنجليزي بتوقيت الجهاز ومعاه الـ offset واسم المنطقة: في القاهرة [[11:05:07 GMT+0200]]. للـ debugging مش للتخزين.`,
            R`نصين الـ toString: التاريخ لوحده والوقت لوحده، الاتنين بتوقيت الجهاز.`,
            R`نفس النص مرتين: ISO بـ UTC وآخره [[Z]]، و [[toJSON]] بترجّع نفس [[toISOString]]. ده الشكل اللي يتخزّن ويتبعت.`,
            R`تاريخ ووقت بالعربي بتوقيت القاهرة لأن [[timeZone]] محدد في الـ options، فبيطلع [[٢١‏/١١‏/٢٠٢٦ ١١:٠٥:٠٧ ص]] على أي جهاز.`,
            R`الأجزاء متحددة واحد واحد (اسم اليوم واليوم واسم الشهر)، فبيطبع [[السبت، ٢١ نوفمبر]] من غير سنة.`,
            R`[[JSON.stringify]] بينادي [[toJSON]] على الـ Date فبيتكتب نص ISO جوه الـ JSON.`,
            R`[[JSON.parse]] بـ reviver: الدالة بتتنادى على كل key، ولما يبقى [["at"]] بنرجّعه Date. من غيرها كان هيفضل نص.`,
            R`بيطبع الـ JSON و [[true]]: الـ Date اللي رجع نفس الـ ms بالظبط.`,
            R`Invalid Date عشان نشوف كل طريقة بتتصرف إزاي معاه.`,
            R`بيطبع [[Invalid Date null {"at":null}]]: [[String]] بيرجّع نص، و [[toJSON]] بيرجّع [[null]]، فالـ JSON فيه [[null]] من غير أي error.`,
            R`[[toISOString]] الوحيدة اللي بترمي: [[RangeError: Invalid time value]]. عشان كده اتلفّت في try/catch.`,
          ],
          pre: [
            "js/Date: الـ getters و getUTC",
            { to: "js/UTC و Intl.DateTimeFormat", why: R`options بتاعة [[Intl.DateTimeFormat]] (dateStyle و timeZone و [[-u-nu-latn]]) هي نفسها اللي بتتبعت لـ [[toLocaleDateString]]` },
            { to: "js/JSON", why: R`[[JSON.stringify]] و [[JSON.parse]] في أبسط صورهم` },
          ],
          ref: [
            { t: "MDN: Date.prototype.toISOString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString" },
            { t: "MDN: Date.prototype.toJSON()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON" },
            { t: "MDN: Date.prototype.toString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString" },
            { t: "MDN: Date.prototype.toDateString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString" },
            { t: "MDN: Date.prototype.toTimeString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toTimeString" },
            { t: "MDN: Date.prototype.toUTCString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString" },
            { t: "MDN: Date.prototype.toLocaleString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString" },
            { t: "MDN: Date.prototype.toLocaleDateString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString" },
            { t: "MDN: Date.prototype.toLocaleTimeString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString" },
          ],
        },
        {
          cmd: "Date: الحساب الصح",
          title: "تحسب فرق الأيام، وتزوّد يوم، ورقم الأسبوع، وترتّب تواريخ إزاي من غير ما التوقيت الصيفي يغلّطك؟",
          desc: R`فيه نوعين حساب ولازم تفرّق بينهم: **مدة حقيقية** (ساعة، ٢٤ ساعة، ٩٠ دقيقة) بتتحسب بالـ ms: [[new Date(d.getTime() + ms)]] و [[b - a]]؛ و **أيام تقويم** («بكرة»، «بعد ٣ أيام»، «فاضل كام يوم») بتتحسب بـ [[setDate(getDate() + n)]] أو بأرقام [[Date.UTC(y, m, d)]] اللي كل يوم فيها ٢٤ ساعة بالظبط. الاتنين بيدّوا نفس النتيجة ٣٦٣ يوم في السنة في مصر، ويختلفوا في يومي تغيير الساعة.

والمقارنة والترتيب على الأرقام: [[a.getTime() === b.getTime()]] للمساواة، و [[<]] و [[>]] مباشرة، و [[toSorted((p, q) => p - q)]] للترتيب. ورقم الأسبوع ISO (الأسبوع بيبدأ الاتنين، وأسبوع 1 هو اللي فيه أول خميس في السنة) بيتحسب بـ [[getUTCDay]] و [[setUTCDate]]، و [[2027-01-01]] بيطلع في أسبوع 53 من 2026.`,
          example: R`const DAY = 24 * 60 * 60 * 1000;
const a = new Date(2026, 3, 23), b = new Date(2026, 3, 25);
console.log((b - a) / DAY, Math.floor((b - a) / DAY));
const calendarDays = (x, y) => (Date.UTC(y.getFullYear(), y.getMonth(), y.getDate()) - Date.UTC(x.getFullYear(), x.getMonth(), x.getDate())) / DAY;
console.log(calendarDays(a, b));
const start = new Date(2026, 3, 23, 9, 0);
const plus24h = new Date(start.getTime() + DAY);
const plusDay = new Date(start);
plusDay.setDate(plusDay.getDate() + 1);
console.log(plus24h.getHours(), plusDay.getHours());
const list = ["2026-03-01T10:00:00Z", "2025-12-31T23:00:00Z", "2026-01-15T08:30:00+02:00"].map(s => new Date(s));
console.log(list.toSorted((p, q) => p - q).map(x => x.toISOString().slice(0, 10)));
const x1 = new Date(2026, 0, 1), x2 = new Date(2026, 0, 1);
console.log(x1 === x2, x1.getTime() === x2.getTime(), x1 <= x2 && x1 >= x2);`,
          try: R`اكتب [[durationText(ms)]] بترجّع [["2 يوم و 3 ساعة و 5 دقيقة"]] (الوحدات اللي قيمتها صفر متظهرش)، و [["أقل من دقيقة"]] لو أقل من دقيقة، و [["مدة غلط"]] لو سالب أو مش رقم. ليه هنا مسموح نعتبر اليوم ٢٤ ساعة؟`,
          sol: R`~~~js duration.js
const DAY = 86400000;
function durationText(ms) {
  if (!Number.isFinite(ms) || ms < 0) return "مدة غلط";
  const parts = [];
  const units = [["يوم", DAY], ["ساعة", 3600000], ["دقيقة", 60000]];
  for (const [name, size] of units) {
    const n = Math.floor(ms / size);
    if (n) parts.push($__bt$__{n} $__{name}$__bt);
    ms -= n * size;
  }
  return parts.join(" و ") || "أقل من دقيقة";
}
console.log(durationText(2 * DAY + 3 * 3600000 + 5 * 60000), "|", durationText(59000), "|", durationText(3600000), "|", durationText(-1));
~~~

~~~text الناتج: node duration.js
2 يوم و 3 ساعة و 5 دقيقة | أقل من دقيقة | 1 ساعة | مدة غلط
~~~

- بنلف على الوحدات من الأكبر للأصغر: كام وحدة كاملة ([[Math.floor]])، ونطرحهم، ونكمّل بالباقي.
- [[parts.join(" و ") || "أقل من دقيقة"]]: لو مفيش ولا وحدة، الـ join بيرجّع [[""]] (falsy) فبناخد النص التاني.
- **ليه اليوم ٢٤ ساعة هنا؟** لأن ده **مدة** («الرفع خد قد إيه»، «فاضل قد إيه على انتهاء الـ token»)، مش أيام تقويم. ٤٨ ساعة حقيقية = «2 يوم» حتى لو عدّوا على ليلة تغيير الساعة. لو السؤال «فاضل كام يوم على ميعاد في التقويم» يبقى [[calendarDays]] اللي في الدرس.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بتوقيت القاهرة، الرقمين دول هيطلعوا إيه؟ وبتوقيت UTC؟

~~~js
const DAY = 86400000;
const a = new Date(2026, 3, 23), b = new Date(2026, 3, 25);
console.log(Math.floor((b - a) / DAY), Math.round((b - a) / DAY));
~~~`, done: R`توقعت [[1 2]] في القاهرة و [[2 2]] في UTC قبل التشغيل، وتقدر تقول ليه [[Math.round]] «نجح» بس ده مش حل.`, sol: R`~~~text الناتج: $env:TZ="Africa/Cairo"
1 2
~~~

~~~text الناتج: TZ=UTC
2 2
~~~

من نص ليل ٢٣ أبريل لنص ليل ٢٥ في القاهرة = **٤٧ ساعة** مش ٤٨، لأن يوم ٢٤ الساعة نطت ساعة. [[47 / 24 = 1.958]]، و [[Math.floor]] بيرميها لـ 1: «فاضل يوم» وهو فاضل يومين.

[[Math.round]] طلّع 2، وده بيشتغل طول ما الفرق ساعة واحدة (٢٣ أو ٢٥ ساعة). بس هو بيخبّي المشكلة: لو أي واحد من التاريخين مش نص ليل (مثلًا ٢٣ الساعة 9 بالليل لـ ٢٥ الساعة 9 الصبح = ٣٥ ساعة) هيقرّب لـ 1 أو 2 حسب الساعة. الحل اللي مش بيعتمد على الصدفة: حوّل الاتنين لأيام تقويم بـ [[Date.UTC(y, m, d)]] واطرح (التمرين الجاي).` },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[daysBetweenISO(from, to)]] بتاخد نصين [["YYYY-MM-DD"]] وترجّع عدد الأيام (سالب لو [[to]] قبل [[from]])، و [[isoWeek(y, m, d)]] (الشهر من 1) بترجّع [["2026-W47"]]. الاتنين لازم يدّوا نفس الإجابة على أي جهاز. اكتب الحل في مربع «شغّل واختبر» تحت.`, done: R`الاختبارات اللي تحت عدّت: [[daysBetweenISO("2026-04-23", "2026-04-25")]] بـ 2 حتى في القاهرة، و 2024 فيها 366 يوم، و [[isoWeek(2027, 1, 1)]] بـ [["2026-W53"]] و [[isoWeek(2024, 12, 30)]] بـ [["2025-W01"]].`, sol: R`~~~js weeks.js
const DAY = 86400000;
function daysBetweenISO(fromText, toText) {
  const ms = t => { const [y, m, d] = t.split("-").map(Number); return Date.UTC(y, m - 1, d); };
  return (ms(toText) - ms(fromText)) / DAY;
}
function isoWeek(y, m, d) {
  const t = new Date(Date.UTC(y, m - 1, d));
  const wd = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - wd);
  const year = t.getUTCFullYear();
  const week = Math.ceil(((t - Date.UTC(year, 0, 1)) / DAY + 1) / 7);
  return $__bt$__{year}-W$__{String(week).padStart(2, "0")}$__bt;
}
console.log(daysBetweenISO("2026-04-23", "2026-04-25"), daysBetweenISO("2026-10-29", "2026-10-30"), daysBetweenISO("2026-03-01", "2026-02-01"), daysBetweenISO("2024-01-01", "2025-01-01"));
console.log(isoWeek(2026, 1, 1), isoWeek(2026, 11, 21), isoWeek(2026, 12, 31), isoWeek(2027, 1, 1), isoWeek(2027, 1, 4), isoWeek(2024, 12, 30));
~~~

~~~text الناتج: $env:TZ="Africa/Cairo" (ونفسه بأي توقيت)
2 1 -28 366
2026-W01 2026-W47 2026-W53 2026-W53 2027-W01 2025-W01
~~~

**[[daysBetweenISO]]:** كل تاريخ بقى رقم ms نص ليل UTC، ومفيش توقيت صيفي في UTC، فالطرح دايمًا مضاعف ٨٦٤٠٠٠٠٠ بالظبط والقسمة بتطلع رقم صحيح من غير تقريب.

**[[isoWeek]]** (قاعدة ISO 8601: الأسبوع من الاتنين للحد، وأسبوع 1 هو اللي فيه أول خميس):

1. [[getUTCDay() || 7]]: الحد عند ISO آخر يوم (7) مش أول يوم (0).
2. [[setUTCDate(getUTCDate() + 4 - wd)]]: نروح لخميس نفس الأسبوع. الخميس دايمًا في نفس «سنة الأسبوع».
3. السنة بتاعة الخميس ده هي سنة الأسبوع: [[2027-01-01]] (جمعة) خميسه ٣١ ديسمبر 2026، فهو في 2026.
4. رقم الأسبوع = كام يوم من أول السنة للخميس ده، مقسوم على 7، مقرّب لفوق.

الغلطة الشائعة: [[Math.ceil(dayOfYear / 7)]] على طول. بتغلط في أول وآخر كام يوم في السنة، وهي دي اللي بتبوّظ تقارير «الأسبوع 1».` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك جدول فعاليات، الأوقات جاية بـ Z وبـ offset ومش مترتبة. اكتب [[nextEvent(list, now)]] بترجّع أقرب فعالية **بعد** [[now]] (أو [[null]] لو مفيش)، واطبع فاضل عليها كام دقيقة لـ [[now = 2026-11-21T09:30:00Z]].

~~~js
const events = [
  { name: "ورشة CSS", at: "2026-11-25T16:00:00Z" },
  { name: "لقاء الفريق", at: "2026-11-20T10:00:00Z" },
  { name: "مراجعة الكود", at: "2026-11-21T12:00:00+02:00" },
  { name: "ديمو", at: "2026-11-21T11:00:00Z" },
];
~~~`, done: R`طلعت «مراجعة الكود» بعد 30 دقيقة (مش «ديمو» اللي شكلها أقرب لو قريت الساعة بعينك)، وبعد آخر فعالية بترجّع [[null]]، والـ array الأصلية مترتبتش.`, sol: R`~~~js next-event.js
const events = [
  { name: "ورشة CSS", at: "2026-11-25T16:00:00Z" },
  { name: "لقاء الفريق", at: "2026-11-20T10:00:00Z" },
  { name: "مراجعة الكود", at: "2026-11-21T12:00:00+02:00" },
  { name: "ديمو", at: "2026-11-21T11:00:00Z" },
];
function nextEvent(list, now) {
  return list.map(e => ({ ...e, t: new Date(e.at) })).filter(e => e.t > now).sort((a, b) => a.t - b.t)[0] ?? null;
}
const now = new Date("2026-11-21T09:30:00Z");
const n = nextEvent(events, now);
console.log(n.name, n.t.toISOString(), Math.round((n.t - now) / 60000), "دقيقة");
console.log(nextEvent(events, new Date("2026-12-01T00:00:00Z")));
~~~

~~~text الناتج: node next-event.js
مراجعة الكود 2026-11-21T10:00:00.000Z 30 دقيقة
null
~~~

- [[12:00:00+02:00]] = 10:00 UTC، يعني **قبل** «ديمو» (11:00Z). لو رتّبت النصوص نفسها ([[sort()]] على [[at]]) الترتيب هيغلط، لأن الـ offset مختلف. الترتيب الأبجدي على ISO بيشتغل بس لو كلهم بـ Z.
- [[map]] بيعمل objects جديدة فيها [[t]]، فالـ [[sort]] بعدها مبيلمسش [[events]] الأصلية.
- [[e.t > now]]: مقارنة Dates بـ [[>]] (بتتحوّل أرقام). والـ [[?? null]]: لو الفلتر فضّى، العنصر رقم 0 بيبقى [[undefined]]، فنرجّع [[null]] صريحة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل الكود ده بتوقيت القاهرة، وقول ليه الرقمين مختلفين، وأنهي فيهم تستخدم في «فكّرني بكرة نفس الميعاد» وأنهي في «الجلسة بتنتهي بعد ٢٤ ساعة»:

~~~js
const start = new Date(2026, 9, 29, 9, 0);
const plus24h = new Date(start.getTime() + 86400000);
const plusDay = new Date(start); plusDay.setDate(plusDay.getDate() + 1);
console.log(plus24h.getHours(), plusDay.getHours(), (plusDay - start) / 3600000);
~~~`, done: R`طلع [[8 9 25]]، وقلت إن التذكير بـ [[setDate]] (نفس الساعة على الحيطة) والجلسة بـ [[+ 86400000]] (مدة حقيقية).`, sol: R`~~~text الناتج: $env:TZ="Africa/Cairo"
8 9 25
~~~

~~~text الناتج: TZ=UTC
9 9 24
~~~

- ليلة ٢٩ أكتوبر الساعة رجعت ساعة، فاليوم ده ٢٥ ساعة. ٢٤ ساعة حقيقية من 9 الصبح بتوصل 8 الصبح بكرة على الحيطة.
- [[setDate(getDate() + 1)]] بيقول «نفس الساعة بكرة على الحيطة»، فبقت 9 تاني، والفرق الحقيقي ٢٥ ساعة.
- **«فكّرني بكرة نفس الميعاد»:** اليوزر عايز 9 على ساعته، فـ [[setDate]].
- **«الجلسة بتنتهي بعد ٢٤ ساعة»:** ده أمان ومدة، فـ [[+ 86400000]] (ومحدش يقدر يطوّل جلسته ساعة بتغيير الساعة).

وفي يوم ٢٣ أبريل العكس: [[plus24h]] بتطلع 10 والـ [[setDate]] بتطلع 9 والفرق ٢٣ ساعة (ده في مثال الدرس).` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** الدالة دي في مشروع شغال، ومحدش اشتكى لحد دلوقتي:

~~~js add-days.js
const DAY = 86400000;
function addDays(d, n) {
  return new Date(d.getTime() + n * DAY);
}
module.exports = { addDays };
~~~

اكتب [[add-days.test.js]] بـ [[node:test]] فيه ٦ اختبارات على الأقل (يوم عادي، وعبر يومي تغيير الساعة في مصر، ونص الليل، وعدد سالب، والأصل ميتغيّرش) بحيث تقع على النسخة دي وتعدّي على النسخة المصلّحة، وبتوقيت القاهرة مهما كان جهاز اللي بيشغّلها.`, done: R`[[node --test]] على النسخة القديمة طلّع ٣ اختبارات واقعة (منهم واحد رجّع ٢٩ أكتوبر بدل ٣٠)، وعلى النسخة بـ [[setDate]] الـ ٦ عدّوا.`, sol: R`~~~js add-days.test.js
process.env.TZ = "Africa/Cairo";
const test = require("node:test");
const assert = require("node:assert/strict");
const { addDays } = require("./add-days.js");

const wall = d => $__bt$__{d.getFullYear()}-$__{d.getMonth() + 1}-$__{d.getDate()} $__{d.getHours()}:$__{String(d.getMinutes()).padStart(2, "0")}$__bt;

test("يوم عادي", () => assert.equal(wall(addDays(new Date(2026, 10, 21, 9, 0), 1)), "2026-11-22 9:00"));
test("عبر بداية الصيفي: نفس الساعة", () => assert.equal(wall(addDays(new Date(2026, 3, 23, 9, 0), 1)), "2026-4-24 9:00"));
test("عبر نهاية الصيفي: نفس الساعة", () => assert.equal(wall(addDays(new Date(2026, 9, 29, 9, 0), 1)), "2026-10-30 9:00"));
test("نص الليل ميرجعش لنفس اليوم", () => assert.equal(wall(addDays(new Date(2026, 9, 29, 0, 0), 1)), "2026-10-30 0:00"));
test("سالب", () => assert.equal(wall(addDays(new Date(2026, 2, 1, 12, 0), -1)), "2026-2-28 12:00"));
test("الأصل ميتغيّرش", () => { const d = new Date(2026, 0, 31); addDays(d, 1); assert.equal(d.getDate(), 31); });
~~~

~~~text الناتج: node --test على النسخة القديمة (مقتطف)
✔ يوم عادي (0.7439ms)
✖ عبر بداية الصيفي: نفس الساعة (0.9032ms)
✖ عبر نهاية الصيفي: نفس الساعة (0.1791ms)
✖ نص الليل ميرجعش لنفس اليوم (0.1891ms)
✔ سالب (0.1495ms)
✔ الأصل ميتغيّرش (0.1125ms)
ℹ pass 3
ℹ fail 3
    actual: '2026-4-24 10:00',
    expected: '2026-4-24 9:00',
    actual: '2026-10-30 8:00',
    expected: '2026-10-30 9:00',
    actual: '2026-10-29 23:00',
~~~

~~~js add-days.js
function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
module.exports = { addDays };
~~~

~~~text الناتج: node --test بعد التصليح
✔ يوم عادي (0.7384ms)
✔ عبر بداية الصيفي: نفس الساعة (0.1192ms)
✔ عبر نهاية الصيفي: نفس الساعة (0.1034ms)
✔ نص الليل ميرجعش لنفس اليوم (0.1007ms)
✔ سالب (0.6122ms)
✔ الأصل ميتغيّرش (0.1133ms)
ℹ tests 6
ℹ pass 6
ℹ fail 0
~~~

- **[[process.env.TZ = "Africa/Cairo"]] أول سطر:** من غيره الاختبارات هتعدّي على أي CI شغال UTC (زي GitHub Actions) والباج هيفضل مستخبي. الاختبار لازم يحدد التوقيت اللي الباج بيظهر فيه.
- **[[wall(d)]]:** بنقارن «اللي على الحيطة» (السنة-الشهر-اليوم الساعة) مش الـ ms، لأن المطلوب من [[addDays]] إن الساعة متتغيرش.
- **اختيار الحالات:** يوم عادي (الاتنين بيعدّوا فيه، فمش كفاية لوحده)، ويومي التغيير، ونص ليل ٢٩ أكتوبر (أخطر واحد: النسخة القديمة رجّعت **نفس اليوم** الساعة 11)، والسالب، وإن الأصل ميتغيّرش (عشان التصليح بـ [[setDate]] ميعدّلش الـ Date اللي جاي).
- اللي يتعلّم: الاختبار اللي بيعدّي على الكود الغلط مش بيختبر حاجة. اكتب الاختبار الأول، وشوفه بيقع، وبعدين صلّح.` },
          ],
          check: {
            lang: "js",
            starter: R`function daysBetweenISO(fromText, toText) {
  return Math.floor((new Date(toText) - new Date(fromText)) / 86400000);
}
function isoWeek(y, m, d) {
  const t = new Date(Date.UTC(y, m - 1, d));
  const dayOfYear = (t - Date.UTC(y, 0, 1)) / 86400000 + 1;
  return y + "-W" + String(Math.ceil(dayOfYear / 7)).padStart(2, "0");
}`,
            tests: R`test("يومين عبر بداية الصيفي", () => expect(daysBetweenISO("2026-04-23", "2026-04-25")).toBe(2));
test("يوم عبر نهاية الصيفي", () => expect(daysBetweenISO("2026-10-29", "2026-10-30")).toBe(1));
test("سالب", () => expect(daysBetweenISO("2026-03-01", "2026-02-01")).toBe(-28));
test("سنة كبيسة", () => expect(daysBetweenISO("2024-01-01", "2025-01-01")).toBe(366));
test("نفس اليوم", () => expect(daysBetweenISO("2026-11-21", "2026-11-21")).toBe(0));
test("أول يوم في 2026", () => expect(isoWeek(2026, 1, 1)).toBe("2026-W01"));
test("21 نوفمبر 2026", () => expect(isoWeek(2026, 11, 21)).toBe("2026-W47"));
test("أول يناير 2027 في أسبوع 53 من 2026", () => expect(isoWeek(2027, 1, 1)).toBe("2026-W53"));
test("4 يناير 2027 أول أسبوع", () => expect(isoWeek(2027, 1, 4)).toBe("2027-W01"));
test("30 ديسمبر 2024 في 2025", () => expect(isoWeek(2024, 12, 30)).toBe("2025-W01"));
test("الحد آخر الأسبوع", () => expect(isoWeek(2026, 11, 22)).toBe("2026-W47"));`,
            solution: R`const DAY = 86400000;
function daysBetweenISO(fromText, toText) {
  const ms = t => { const [y, m, d] = t.split("-").map(Number); return Date.UTC(y, m - 1, d); };
  return (ms(toText) - ms(fromText)) / DAY;
}
function isoWeek(y, m, d) {
  const t = new Date(Date.UTC(y, m - 1, d));
  const wd = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - wd);
  const year = t.getUTCFullYear();
  const week = Math.ceil(((t - Date.UTC(year, 0, 1)) / DAY + 1) / 7);
  return year + "-W" + String(week).padStart(2, "0");
}`
          },
          flag: "script",
          deep: {
            why: R`«فاضل كام يوم على الامتحان»، و «الاشتراك بيخلص بعد ٣٠ يوم»، و «تقرير الأسبوع ٤٧»، و «رتّب الطلبات بالأحدث»، و «الجلسة ٢٤ ساعة»: كل ده حساب تواريخ، وكل واحد فيهم ليه طريقة صح. الغلط فيه بيطلع «فاضل 0 يوم» على تاريخ بكرة، أو تذكير بيوصل الساعة 8 بدل 9، أو أسبوع ناقص في تقرير.`,
            how: R`الـ Date جواه لحظة، وأي طرح بيدّيك ms حقيقية. والـ «يوم» المحلي مش وحدة ثابتة: في القاهرة 2026 فيه يوم ٢٣ ساعة (٢٤ أبريل) ويوم ٢٥ ساعة (٢٩ أكتوبر). فأي قسمة على ٨٦٤٠٠٠٠٠ لوقتين محليين ممكن تطلع كسر. الحل: يا تحوّل لأرقام أيام تقويم ([[Date.UTC(y, m, d)]] = نص ليل UTC لنفس الأرقام، وكل الأيام هناك ٢٤ ساعة)، يا تخلّي الـ setters المحلية تحسب ([[setDate(getDate() + n)]] بيحافظ على الساعة على الحيطة).

الترتيب: [[sort]] بيقارن بالـ comparator، و [[p - q]] بيحوّل الـ Dates لأرقام. والـ [[toSorted]] (من ES2023، موجود في Node 20+ وكل المتصفحات الحالية) بيرجّع array جديدة. و [[Math.max(...dates)]] بيرجّع رقم مش Date. والسن: [[ageOn]] في درس «Date ومطبّاته» بالمنطق ده (السنين، وناقص واحد لو عيد الميلاد لسه مجاش)، مش [[ms / 365]].

و **Temporal** (الـ API الجديد) بيحل ده من جوه: [[Temporal.PlainDate]] للأيام من غير ساعة، و [[until()]] بيرجّع أيام تقويم، و [[ZonedDateTime.add({ days: 1 })]] بيعرف الفرق بين يوم و ٢٤ ساعة. لسه مش Baseline (في Node 24.22 [[typeof Temporal]] بـ [["undefined"]])، ودرس «date-fns و dayjs و Temporal» فيه المقارنة.`,
            when: R`**بالـ ms:** المدد الحقيقية (timeout، صلاحية token أو جلسة، «اتعمل من قد إيه»، مدة حجز). **بأيام التقويم:** «بعد n يوم»، و «فاضل كام يوم»، والسن، والأسابيع، والشهور، وأيام الشغل. **بالـ setters المحلية:** «نفس الساعة بكرة» عند اليوزر. ولو الحساب بتوقيت مدينة مش الجهاز، حوّل الأول لأرقام التقويم بتاعتها (Intl بـ [[en-CA]] أو [[formatToParts]]) واحسب عليها بـ UTC.`,
            mistakes: R`[[Math.floor((b - a) / 86400000)]] على أوقات محلية. و [[d.getTime() + 86400000]] لـ «بكرة». و [[a === b]] أو [[includes]] على Dates. و [[sort()]] من غير comparator (بيرتّب نص [[toString()]]: «Fri» قبل «Mon»). وترتيب نصوص ISO فيها offsets مختلفة. و [[Math.ceil(dayOfYear / 7)]] كرقم أسبوع. و [[(now - birth) / (365 * DAY)]] للسن. وفي الانترفيو: «احسب عدد الأيام بين تاريخين» والإجابة اللي بيدوّروا عليها: حوّلهم لـ UTC midnight واطرح، مع ذكر مشكلة التوقيت الصيفي.`
          },
          teach: R`## الفكرة: مدة ولا أيام تقويم؟

قبل أي حساب اسأل: أنا بحسب **مدة** (كام ساعة حقيقية عدّت) ولا **أيام تقويم** (كام يوم في النتيجة)؟ في UTC الاتنين واحد. في القاهرة بيختلفوا يومين في السنة، والمثال اختار واحد منهم.

> الناتج من Node 24.22 على Windows. اتشغّل بـ [[$env:TZ="Africa/Cairo"]] وبـ [[TZ=UTC]]، والفرق مكتوب.

---

## ١. فرق الأيام بالقسمة: الفخ

~~~js
const DAY = 24 * 60 * 60 * 1000;
const a = new Date(2026, 3, 23), b = new Date(2026, 3, 25);
console.log((b - a) / DAY, Math.floor((b - a) / DAY));
~~~

- [[DAY]]: يوم بالـ ms (86,400,000)، مكتوب كضرب عشان يتقري.
- [[a]] و [[b]]: نص ليل ٢٣ ونص ليل ٢٥ أبريل بتوقيت الجهاز.

~~~text الناتج: القاهرة
1.9583333333333333 1
~~~

~~~text الناتج: UTC
2 2
~~~

في القاهرة يوم ٢٤ أبريل الساعة نطت من 00:00 لـ 01:00، فبين نص ليل ٢٣ ونص ليل ٢٥ **٤٧ ساعة**. القسمة طلعت 1.958، و [[Math.floor]] قالت «يوم واحد».

---

## ٢. أيام التقويم: [[Date.UTC]] على الأرقام المحلية

~~~js
const calendarDays = (x, y) => (Date.UTC(y.getFullYear(), y.getMonth(), y.getDate()) - Date.UTC(x.getFullYear(), x.getMonth(), x.getDate())) / DAY;
console.log(calendarDays(a, b));
~~~

- بناخد أرقام التاريخ المحلية (سنة وشهر ويوم) بالـ getters.
- [[Date.UTC(...)]] بيحوّل كل تلات أرقام لنص ليل UTC بنفس الأرقام. احنا مش بنقول إن اللحظة بقت UTC، احنا بنستخدم UTC «كمسطرة» كل يوم فيها ٢٤ ساعة بالظبط.
- الطرح والقسمة بيطلعوا رقم صحيح دايمًا.

~~~text الناتج: القاهرة و UTC
2
~~~

---

## ٣. «بكرة»: [[setDate]] ولا [[+ 24 ساعة]]؟

~~~js
const start = new Date(2026, 3, 23, 9, 0);
const plus24h = new Date(start.getTime() + DAY);
const plusDay = new Date(start);
plusDay.setDate(plusDay.getDate() + 1);
console.log(plus24h.getHours(), plusDay.getHours());
~~~

- [[plus24h]]: اللحظة + ٢٤ ساعة حقيقية.
- [[plusDay]]: نسخة، وبعدين «اليوم + 1» على التقويم، والساعة على الحيطة زي ما هي.

~~~text الناتج: القاهرة
10 9
~~~

~~~text الناتج: UTC
9 9
~~~

٢٤ ساعة حقيقية من 9 الصبح يوم ٢٣ بتوصل 10 الصبح يوم ٢٤ في القاهرة (الساعة اتقدّمت في النص). [[setDate]] بيدّي 9.

| السؤال | الطريقة | ليه |
|---|---|---|
| «فكّرني بكرة نفس الساعة» | [[setDate(getDate() + 1)]] | اليوزر عايز 9 على ساعته |
| «الكوبون صالح ٢٤ ساعة» | [[getTime() + DAY]] | مدة، محدش يكسب أو يخسر ساعة |
| «فاضل كام يوم» | [[calendarDays]] | أيام تقويم مش ساعات |
| «اتعمل من قد إيه» | [[now - created]] | مدة حقيقية بالـ ms |

---

## ٤. الترتيب

~~~js
const list = ["2026-03-01T10:00:00Z", "2025-12-31T23:00:00Z", "2026-01-15T08:30:00+02:00"].map(s => new Date(s));
console.log(list.toSorted((p, q) => p - q).map(x => x.toISOString().slice(0, 10)));
~~~

- [[map(s => new Date(s))]]: كل نص بقى Date (فيهم واحد بـ offset).
- [[toSorted((p, q) => p - q)]]: نسخة مترتبة. الـ comparator بيرجّع سالب لو [[p]] قبل [[q]]، والطرح بيعمل ده لوحده. ولو عايز الأحدث الأول: [[q - p]].
- [[toISOString().slice(0, 10)]]: أول ١٠ حروف = التاريخ بـ UTC، عشان نطبع حاجة قصيرة.

~~~text الناتج
[ '2025-12-31', '2026-01-15', '2026-03-01' ]
~~~

من غير comparator، [[sort()]] بيحوّل كل عنصر لنص [[toString()]] ويرتّب أبجدي. جرّبناها ([[[...list].sort()]] وطبعنا أول ١٥ حرف):

~~~text الناتج: القاهرة
[ 'Sun Mar 01 2026', 'Thu Jan 01 2026', 'Thu Jan 15 2026' ]
~~~

مارس الأول لأن [[S]] قبل [[T]]: ترتيب بأسماء الأيام، غلط تمامًا. (ولاحظ إن [[2025-12-31T23:00Z]] في القاهرة بقى ١ يناير 2026.)

---

## ٥. المساواة

~~~js
const x1 = new Date(2026, 0, 1), x2 = new Date(2026, 0, 1);
console.log(x1 === x2, x1.getTime() === x2.getTime(), x1 <= x2 && x1 >= x2);
~~~

~~~text الناتج
false true true
~~~

[[===]] على objects بيسأل «نفس الـ object؟». [[getTime()]] هو الصح. و [[<=]] و [[>=]] مع بعض شغالين (بيحوّلوا أرقام) بس أطول وأقل وضوحًا.

---

## ٦. رقم الأسبوع ISO

ISO 8601: الأسبوع من الاتنين للحد، وأسبوع 1 في السنة هو اللي فيه أول خميس. فأول كام يوم في يناير ممكن يبقوا في آخر أسبوع في السنة اللي فاتت، والعكس.

| التاريخ | يوم | أسبوع ISO |
|---|---|---|
| [[2026-01-01]] | خميس | [[2026-W01]] |
| [[2026-11-21]] | سبت | [[2026-W47]] |
| [[2026-12-31]] | خميس | [[2026-W53]] |
| [[2027-01-01]] | جمعة | [[2026-W53]] (لسه 2026!) |
| [[2027-01-04]] | اتنين | [[2027-W01]] |
| [[2024-12-30]] | اتنين | [[2025-W01]] (بقت 2025!) |

الكود والشرح في تمرين [[isoWeek]] تحت (اتشغّل وطلّع الجدول ده). ولو عايز أسبوع بيبدأ السبت (الشغل في مصر)، نفس الفكرة بـ [[(getUTCDay() + 1) % 7]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| مدة بين لحظتين | [[b - a]] (ms) |
| أيام تقويم بين تاريخين | [[Date.UTC]] للاتنين واطرح واقسم على [[DAY]] |
| بكرة نفس الساعة | [[setDate(getDate() + 1)]] على نسخة |
| بعد ٢٤ ساعة حقيقية | [[new Date(d.getTime() + DAY)]] |
| ترتيب | [[toSorted((p, q) => p - q)]] |
| مساواة | [[a.getTime() === b.getTime()]] |
| رقم الأسبوع | [[isoWeek]] (الخميس بتاع الأسبوع) |`,
          lines: [
            R`يوم بالـ ms: ٢٤ ساعة × ٦٠ دقيقة × ٦٠ ثانية × ١٠٠٠، مكتوب كضرب عشان أي حد يقراه يفهمه.`,
            R`نص ليل ٢٣ ونص ليل ٢٥ أبريل 2026 بتوقيت الجهاز. اخترنا الأيام دي لأن ٢٤ أبريل هو يوم بداية الصيفي في مصر.`,
            R`القسمة المباشرة: في القاهرة [[1.958...]] و [[Math.floor]] بيقول [[1]] لأن الفرق ٤٧ ساعة مش ٤٨. في UTC [[2 2]].`,
            R`بتحوّل أرقام التاريخ المحلية (سنة وشهر ويوم) لنص ليل UTC وتطرح، فكل يوم ٢٤ ساعة بالظبط والقسمة رقم صحيح.`,
            R`بيطبع [[2]] على أي جهاز: يومين تقويم، ودي الإجابة اللي اليوزر مستنيها.`,
            R`٢٣ أبريل الساعة 9 الصبح بتوقيت الجهاز، نقطة البداية لـ «بكرة».`,
            R`٢٤ ساعة حقيقية بعد البداية: نضيف الـ ms ونعمل Date جديد.`,
            R`نسخة من البداية عشان نعدّل فيها من غير ما نلمس [[start]].`,
            R`«اليوم + 1» على التقويم: الساعة على الحيطة بتفضل زي ما هي حتى لو اليوم ٢٣ أو ٢٥ ساعة.`,
            R`بيطبع [[10 9]] في القاهرة: الـ ٢٤ ساعة وصلت 10 لأن الساعة اتقدّمت، و [[setDate]] حافظ على 9. وفي UTC [[9 9]].`,
            R`٣ نصوص مش مترتبة (واحد فيهم بـ offset [[+02:00]])، و [[map]] بيحوّل كل واحد لـ Date.`,
            R`[[toSorted]] بـ comparator بيطرح (الـ Dates بتتحوّل أرقام) فبيرتّب من الأقدم للأحدث، ونطبع التاريخ بس: [[2025-12-31]] ثم [[2026-01-15]] ثم [[2026-03-01]].`,
            R`تاريخين بنفس اللحظة، كل واحد object لوحده.`,
            R`بيطبع [[false true true]]: [[===]] بيقارن objects، ومقارنة [[getTime]] هي الصح، و [[<=]] مع [[>=]] شغالين بس ملفوفين.`,
          ],
          pre: [
            "js/Date: الـ setters و setUTC",
            "js/Date: getTimezoneOffset والتوقيت الصيفي",
            { to: "js/sort و toSorted", why: R`الـ comparator و [[toSorted]] في أبسط صورهم` },
          ],
          ref: [
            { t: "MDN: Date (Calculating elapsed time)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#calculating_elapsed_time" },
            { t: "MDN: Date.UTC()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC" },
            { t: "MDN: Array.prototype.toSorted()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted" },
            { t: "MDN: Temporal", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal" },
          ],
        },
        {
          cmd: "Date: جدول كل الـ members",
          title: "كل حاجة في Date في جدول واحد: كل method بمثال يتشغّل وناتجه",
          desc: R`[[Date]] نفسه فيه ٣ دوال static ([[Date.now()]] و [[Date.parse()]] و [[Date.UTC()]])، و [[Date.prototype]] فيه ٤٦ method بالاسم (من غير [[constructor]]) و [[Symbol.toPrimitive]]: ١٩ getter و ١٦ setter و ١٠ طرق تحويل لنص و [[valueOf]]. منهم ٣ قديمة متسابة عشان المواقع القديمة بس: [[getYear]] و [[setYear]] و [[toGMTString]].

الدرس ده مرجع: جدول لكل member بسطر يتشغّل وناتجه الحقيقي، مقسوم زي دروس الوحدة. كل الأمثلة على نفس اللحظة [["2026-11-21T09:05:07.042Z"]] واتشغّلت بـ [[TZ=UTC]]، عشان المحلي و UTC يطلعوا زي بعض وتقارن الشكل بس.`,
          example: R`const names = Object.getOwnPropertyNames(Date.prototype).filter(n => n !== "constructor");
console.log(names.length, Object.getOwnPropertyNames(Date).join(" "));
const count = prefix => names.filter(n => n.startsWith(prefix)).length;
console.log(count("get"), count("set"), count("to"), names.filter(n => !/^(get|set|to)/.test(n)));
console.log(typeof Date.prototype[Symbol.toPrimitive], Object.getOwnPropertySymbols(Date.prototype).length);
const d = new Date("2026-11-21T09:05:07.042Z");
console.log(d.getYear(), Date.prototype.toGMTString === Date.prototype.toUTCString);`,
          try: R`اعمل ملف [[cheatsheet.js]] بيطبع سطر لكل member من الجدول (الاسم وناتجه على اللحظة دي)، وشغّله مرة بـ [[TZ=UTC]] ومرة بالقاهرة. علّم على كل سطر اتغيّر: هتلاقي إن كل اللي اتغيّر methods محلية، ومفيش ولا [[UTC]] ولا [[ISO]] اتغيّر.`,
          sol: R`~~~js cheatsheet.js
const d = () => new Date("2026-11-21T09:05:07.042Z");
const rows = [
  ["getHours", () => d().getHours()],
  ["getUTCHours", () => d().getUTCHours()],
  ["getTimezoneOffset", () => d().getTimezoneOffset()],
  ["setHours(0,0,0,0)", () => { const x = d(); x.setHours(0, 0, 0, 0); return x.toISOString(); }],
  ["setUTCHours(0,0,0,0)", () => { const x = d(); x.setUTCHours(0, 0, 0, 0); return x.toISOString(); }],
  ["toISOString", () => d().toISOString()],
  ["toString", () => d().toString()],
  ["toLocaleTimeString en-GB", () => d().toLocaleTimeString("en-GB")],
];
for (const [name, f] of rows) console.log(name.padEnd(26), JSON.stringify(f()));
~~~

~~~text الناتج: TZ=UTC
getHours                   9
getUTCHours                9
getTimezoneOffset          0
setHours(0,0,0,0)          "2026-11-21T00:00:00.000Z"
setUTCHours(0,0,0,0)       "2026-11-21T00:00:00.000Z"
toISOString                "2026-11-21T09:05:07.042Z"
toString                   "Sat Nov 21 2026 09:05:07 GMT+0000 (Coordinated Universal Time)"
toLocaleTimeString en-GB   "09:05:07"
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
getHours                   11
getUTCHours                9
getTimezoneOffset          -120
setHours(0,0,0,0)          "2026-11-20T22:00:00.000Z"
setUTCHours(0,0,0,0)       "2026-11-21T00:00:00.000Z"
toISOString                "2026-11-21T09:05:07.042Z"
toString                   "Sat Nov 21 2026 11:05:07 GMT+0200 (Eastern European Standard Time)"
toLocaleTimeString en-GB   "11:05:07"
~~~

اتغيّر ٥ سطور، كلهم محلي: [[getHours]] و [[getTimezoneOffset]] و [[setHours]] (بداية اليوم في القاهرة = ١٠ بالليل UTC اليوم اللي قبله) و [[toString]] و [[toLocaleTimeString]] من غير [[timeZone]]. والتلاتة اللي فيهم UTC أو ISO ثابتين. كل عنصر في [[rows]] دالة ([[() => ...]]) بتعمل Date جديد، عشان الـ setters متأثرش على السطر اللي بعدها.`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** في الجدول ٣ members مكتوب جنبهم «قديمة». من MDN جاوب: إيه اللي بيعملوه بالظبط؟ وليه لسه موجودين لو مش مستحبين؟ وإيه اللي تستخدمه بدلهم؟ وبعدين شغّل كل واحد مرة.`, done: R`جاوبت لكل واحد (بيعمل إيه، وبديله)، وشغّلتهم وشفت [[getYear()]] بـ 126 و [[setYear(99)]] بتحط 1999.`, sol: R`**الإجابة (من MDN، واتأكدت بالتشغيل):**

| القديمة | بتعمل إيه | البديل |
|---|---|---|
| [[getYear()]] | السنة ناقص 1900 (2026 ← 126) | [[getFullYear()]] |
| [[setYear(y)]] | زي [[setFullYear]] بس لو [[y]] من 0 لـ 99 بيزوّد 1900 | [[setFullYear(y)]] |
| [[toGMTString()]] | نفس دالة [[toUTCString]] بالظبط (alias) | [[toUTCString()]] |

~~~js legacy.js
const d = new Date("2026-11-21T09:05:07Z");
console.log(d.getYear(), Date.prototype.toGMTString === Date.prototype.toUTCString);
d.setYear(99);
console.log(d.getFullYear());
~~~

~~~text الناتج: TZ=UTC node legacy.js
126 true
1999
~~~

**ليه لسه موجودين؟** المواصفات حاطاهم في ملحق «Additional ECMAScript Features for Web Browsers» (Annex B): حاجات متسابة عشان مواقع قديمة بتستخدمها، ومحدش يقدر يشيلها من غير ما يبوّظ صفحات شغالة من التسعينات. لينترز زي ESLint ([[no-restricted-properties]]) و TypeScript بيعلّموا عليهم. متكتبهمش في كود جديد، بس لازم تعرفهم عشان تفهم كود قديم (و [[getYear]] بالذات سبب باجات «السنة 126» و «سنة 19100» المشهورة).` },
            { lvl: 'تطبيق', t: R`**اشرحها:** لكل مهمة من دول اكتب الـ member (أو الاتنين) اللي هتستخدمهم في سطر واحد، من غير ما تبص على الجدول، وبعدين قارن: (١) رقم اللحظة دي. (٢) اسم يوم الأسبوع لتاريخ [["YYYY-MM-DD"]]. (٣) نص يتحفظ في الداتابيز. (٤) أول الشهر بتوقيت اليوزر. (٥) الجهاز ده قدام UTC بكام. (٦) لحظة من سنة وشهر ويوم UTC. (٧) هل التاريخ ده Invalid. (٨) الوقت بالعربي جنب رسالة.`, done: R`كتبت الـ ٨ وطابقت ٦ على الأقل من الإجابة النموذجية، وفهمت ليه اللي اختلف.`, sol: R`**إجابة نموذجية:**

| المهمة | الـ member | ليه |
|---|---|---|
| (١) رقم اللحظة | [[Date.now()]] | من غير ما تعمل object |
| (٢) يوم الأسبوع لـ [["YYYY-MM-DD"]] | [[Date.UTC]] + [[getUTCDay()]] | التاريخ ده يوم تقويم، و UTC مع UTC بيمنع اليوم اللي قبله |
| (٣) للداتابيز | [[toISOString()]] | UTC بـ Z، أي حد يقراه |
| (٤) أول الشهر عند اليوزر | [[setDate(1)]] + [[setHours(0, 0, 0, 0)]] على نسخة | محلي لأنه «شهر اليوزر» |
| (٥) الفرق عن UTC | [[getTimezoneOffset()]] (واقلب الإشارة) | الوحيدة اللي بتقول توقيت الجهاز كرقم |
| (٦) لحظة من أرقام UTC | [[new Date(Date.UTC(y, m - 1, d))]] | الأرقام مش بتتفسّر بتوقيت الجهاز |
| (٧) Invalid؟ | [[Number.isNaN(d.getTime())]] | الـ getter الوحيد اللي بيرجّع الرقم نفسه |
| (٨) الوقت بالعربي | [[toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit" })]] | بلغة اليوزر وشكله |

~~~js tasks.js
const day = "2026-11-21";
const [y, m, dd] = day.split("-").map(Number);
console.log(new Date(Date.UTC(y, m - 1, dd)).getUTCDay(), new Date("2026-11-21T19:45:00Z").toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Cairo" }));
~~~

~~~text الناتج: TZ=UTC node tasks.js
6 ٩:٤٥ م
~~~

6 = السبت. والغلطة اللي ناس كتير بتقع فيها في (٢): [[new Date(day).getDay()]]: في أمريكا بيطلع 5 (الجمعة).` },
            { lvl: 'تحدي', t: R`**ابني:** [[describe(d)]] بترجّع object فيه كل حاجة ممكن تحتاجها عن Date في الـ debugging: [[valid]] و [[ms]] و [[iso]] و [[local]] (السنة-الشهر-اليوم الساعة:الدقيقة بتوقيت الجهاز) و [[offset]] ([["+02:00"]]) و [[weekday]] (محلي، بالمصري) و [[dst]] (الجهاز في الصيفي دلوقتي؟). ولو Invalid: [[{ valid: false }]] بس. استخدم أعضاء من الجدول بس.`, done: R`[[describe(new Date("2026-07-15T10:00:00Z"))]] بالقاهرة بيرجّع [[local: "2026-07-15 13:00"]] و [[offset: "+03:00"]] و [[dst: true]]، ونفس اللحظة بـ UTC [[dst: false]]، و [[describe(new Date("x"))]] بيرجّع [[{ valid: false }]] من غير error.`, sol: R`~~~js describe.js
const DAYS = ["الحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة", "السبت"];
const pad = n => String(n).padStart(2, "0");
function describe(d) {
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return { valid: false };
  const off = -d.getTimezoneOffset();
  const jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
  return {
    valid: true,
    ms: d.getTime(),
    iso: d.toISOString(),
    local: $__bt$__{d.getFullYear()}-$__{pad(d.getMonth() + 1)}-$__{pad(d.getDate())} $__{pad(d.getHours())}:$__{pad(d.getMinutes())}$__bt,
    offset: $__bt$__{off >= 0 ? "+" : "-"}$__{pad(Math.floor(Math.abs(off) / 60))}:$__{pad(Math.abs(off) % 60)}$__bt,
    weekday: DAYS[d.getDay()],
    dst: jan !== jul && d.getTimezoneOffset() === Math.min(jan, jul),
  };
}
console.log(describe(new Date("2026-07-15T10:00:00Z")));
console.log(describe(new Date("x")));
~~~

~~~text الناتج: $env:TZ="Africa/Cairo"
{
  valid: true,
  ms: 1784109600000,
  iso: '2026-07-15T10:00:00.000Z',
  local: '2026-07-15 13:00',
  offset: '+03:00',
  weekday: 'الأربع',
  dst: true
}
{ valid: false }
~~~

~~~text الناتج: TZ=UTC (السطور اللي اتغيّرت)
  local: '2026-07-15 10:00',
  offset: '+00:00',
  dst: false
~~~

- **[[dst]]:** لو الجهاز فيه صيفي (يناير غير يوليو)، الصيفي هو الـ offset الأصغر ([[Math.min]]: الأبعد شرق، زي [[-180]] قدام [[-120]]). ده بيشتغل في نص الكرة الجنوبي كمان لأننا بنقارن بالـ min مش بيوليو.
- **الفحص الأول:** [[instanceof]] و [[isNaN]] قبل أي حاجة، عشان [[toISOString]] مترميش.
- كل حقل من member واحد أو اتنين من الجدول، ومفيش Intl: ده اللي Date لوحده يقدر يقوله.` },
          ],
          flag: "script",
          deep: {
            why: R`لما تقرا كود حد تاني أو مكتبة، هتقابل members مشفتهاش في دروس الوحدة أو اتنسيت. والجدول ده بيجاوب «الحاجة دي بتعمل إيه بالظبط وبترجّع إيه» في سطر، من غير ما تفتح ١٠ صفحات. وعدّ الـ members نفسه بيوريك إن Date صغير: كل حاجة فيه getter أو setter أو تحويل.`,
            how: R`كل الـ instance methods على [[Date.prototype]] وبتشتغل على الخانة الداخلية (رقم الـ ms). الـ getters بتفكه، والـ setters بتبنيه من جديد وترجّعه، والتحويلات بتكتبه. ولو ناديت أي واحدة على حاجة مش Date ([[Date.prototype.getTime.call({})]]) بترمي [[TypeError: this is not a Date object.]]، ما عدا اتنين generic: [[toJSON]] (بتنادي [[toISOString]] بتاعة أي object)، و [[Symbol.toPrimitive]] اللي بتقبل أي object ([[Date.prototype[Symbol.toPrimitive].call({}, "number")]] رجّع [["[object Object]"]]) وبترمي بس على primitive زي 5. و [[Object.getOwnPropertyNames(Date.prototype)]] بيطلّع الأسامي (٤٧ بالـ [[constructor]] في Node 24.22)، و [[getOwnPropertySymbols]] بيطلّع [[Symbol.toPrimitive]] لوحده.`,
            when: R`ارجعله لما تشوف member مش فاكره، أو قبل ما تكتب دالة تواريخ عشان تتأكد إنها مش موجودة جاهزة (زي آخر يوم في الشهر بـ [[setDate(0)]])، أو وانت بتقرر بين المحلي و UTC. ولو الجدول مكفّاكش (توقيت مدينة، أو «من ٥ دقايق»، أو فترات)، يبقى محتاج Intl أو Temporal (دروس «UTC و Intl.DateTimeFormat» و «Intl.RelativeTimeFormat» و «date-fns و dayjs و Temporal»).`,
            mistakes: R`تدوّر على [[setDay]] (مش موجودة: يوم الأسبوع نتيجة). وتستخدم [[getYear]] أو [[toGMTString]] في كود جديد. وتفتكر إن فيه [[getUTCTimezoneOffset]] (مش موجود: UTC مالوش offset). وتفتكر إن [[Date.now]] و [[Date.parse]] و [[Date.UTC]] بيرجّعوا Date (التلاتة أرقام). وتنادي [[d.now()]] على instance ([[TypeError: d.now is not a function]]).`
          },
          teach: R`## الفكرة: Date صغير

قبل الجدول، خلّي الكود يعدّ الـ members بنفسه:

~~~js
const names = Object.getOwnPropertyNames(Date.prototype).filter(n => n !== "constructor");
console.log(names.length, Object.getOwnPropertyNames(Date).join(" "));
~~~

- [[Object.getOwnPropertyNames(obj)]]: أسامي كل الخصايص اللي على الـ object نفسه (حتى المخفية). على [[Date.prototype]] = كل الـ methods اللي أي Date بيورثها.
- [[filter(n => n !== "constructor")]]: بنشيل [[constructor]] (بيشاور على [[Date]] نفسه، مش method).
- على [[Date]] نفسه: الخصايص الـ static.

~~~text الناتج: Node 24.22
46 length name prototype now parse UTC
~~~

٤٦ method على الـ prototype، و ٣ دوال static ([[now]] و [[parse]] و [[UTC]]). و [[length]] و [[name]] و [[prototype]] موجودين على أي دالة.

~~~js
const count = prefix => names.filter(n => n.startsWith(prefix)).length;
console.log(count("get"), count("set"), count("to"), names.filter(n => !/^(get|set|to)/.test(n)));
console.log(typeof Date.prototype[Symbol.toPrimitive], Object.getOwnPropertySymbols(Date.prototype).length);
~~~

~~~text الناتج
19 16 10 [ 'valueOf' ]
function 1
~~~

١٩ getter و ١٦ setter و ١٠ تحويل لنص، والوحيدة اللي برّه التلاتة [[valueOf]]. والـ Symbol الوحيد [[Symbol.toPrimitive]].

~~~js
const d = new Date("2026-11-21T09:05:07.042Z");
console.log(d.getYear(), Date.prototype.toGMTString === Date.prototype.toUTCString);
~~~

~~~text الناتج
126 true
~~~

الاتنين قديمين: [[getYear]] بترجّع السنة ناقص 1900، و [[toGMTString]] هي نفس دالة [[toUTCString]]. الجدول تحت فيه كل حاجة، والقديم متعلّم عليه.

> كل الأمثلة في الجداول على [[d = new Date("2026-11-21T09:05:07.042Z")]] (نسخة جديدة لكل سطر)، واتشغّلت بـ [[TZ=UTC]] فالمحلي = UTC. لاحظ إن السبت ٢١ نوفمبر 2026.

---

## ١. Static: على [[Date]] نفسه

| الـ member | المثال | الناتج |
|---|---|---|
| [[Date.now()]] | [[typeof Date.now()]] | [["number"]] (رقم اللحظة الحالية، بيتغيّر) |
| [[Date.parse()]] | [[Date.parse("2026-11-21T09:05:07.042Z")]] | [[1795251907042]] |
| [[Date.UTC()]] | [[Date.UTC(2026, 10, 21, 9, 5, 7, 42)]] | [[1795251907042]] |
| [[new Date()]] | [[new Date(1795251907042).toISOString()]] | [["2026-11-21T09:05:07.042Z"]] |

الدرسين: «Date: getTime و valueOf و Symbol.toPrimitive» و «Date.UTC و Date.parse».

---

## ٢. الرقم اللي جوه

| الـ member | المثال | الناتج |
|---|---|---|
| [[getTime()]] | [[d.getTime()]] | [[1795251907042]] |
| [[valueOf()]] | [[d.valueOf()]] | [[1795251907042]] |
| [[setTime()]] | [[d.setTime(0)]] ثم [[toISOString()]] | [["1970-01-01T00:00:00.000Z"]] |
| [[[Symbol.toPrimitive]()]] | [[d[Symbol.toPrimitive]("number")]] | [[1795251907042]] (و [["default"]] بيرجّع نص) |

---

## ٣. الـ getters المحلية

| الـ member | المثال | الناتج |
|---|---|---|
| [[getFullYear()]] | [[d.getFullYear()]] | [[2026]] |
| [[getMonth()]] | [[d.getMonth()]] | [[10]] (نوفمبر، من 0) |
| [[getDate()]] | [[d.getDate()]] | [[21]] |
| [[getDay()]] | [[d.getDay()]] | [[6]] (السبت، 0 = الحد) |
| [[getHours()]] | [[d.getHours()]] | [[9]] |
| [[getMinutes()]] | [[d.getMinutes()]] | [[5]] |
| [[getSeconds()]] | [[d.getSeconds()]] | [[7]] |
| [[getMilliseconds()]] | [[d.getMilliseconds()]] | [[42]] |
| [[getTimezoneOffset()]] | [[d.getTimezoneOffset()]] | [[0]] (القاهرة شتا [[-120]]) |
| [[getYear()]] | قديمة | [[126]] (السنة − 1900) |

---

## ٤. الـ getters الـ UTC

| الـ member | المثال | الناتج |
|---|---|---|
| [[getUTCFullYear()]] | [[d.getUTCFullYear()]] | [[2026]] |
| [[getUTCMonth()]] | [[d.getUTCMonth()]] | [[10]] |
| [[getUTCDate()]] | [[d.getUTCDate()]] | [[21]] |
| [[getUTCDay()]] | [[d.getUTCDay()]] | [[6]] |
| [[getUTCHours()]] | [[d.getUTCHours()]] | [[9]] |
| [[getUTCMinutes()]] | [[d.getUTCMinutes()]] | [[5]] |
| [[getUTCSeconds()]] | [[d.getUTCSeconds()]] | [[7]] |
| [[getUTCMilliseconds()]] | [[d.getUTCMilliseconds()]] | [[42]] |

الدرسين: «Date: الـ getters و getUTC» و «Date: getTimezoneOffset والتوقيت الصيفي».

---

## ٥. الـ setters المحلية (كلهم بيرجّعوا رقم الـ ms الجديد)

| الـ member | المثال | الناتج بعده ([[toISOString()]]) |
|---|---|---|
| [[setFullYear()]] | [[d.setFullYear(2027, 0, 1)]] | [["2027-01-01T09:05:07.042Z"]] |
| [[setMonth()]] | [[d.setMonth(0)]] | [["2026-01-21T09:05:07.042Z"]] |
| [[setDate()]] | [[d.setDate(0)]] | [["2026-10-31T09:05:07.042Z"]] (آخر أكتوبر) |
| [[setHours()]] | [[d.setHours(0, 0, 0, 0)]] | [["2026-11-21T00:00:00.000Z"]] |
| [[setMinutes()]] | [[d.setMinutes(90)]] | [["2026-11-21T10:30:07.042Z"]] |
| [[setSeconds()]] | [[d.setSeconds(0, 0)]] | [["2026-11-21T09:05:00.000Z"]] |
| [[setMilliseconds()]] | [[d.setMilliseconds(1000)]] | [["2026-11-21T09:05:08.000Z"]] |
| [[setYear()]] | قديمة | زي [[setFullYear]]، و 0–99 بتبقى 1900+ |

---

## ٦. الـ setters الـ UTC

| الـ member | المثال | الناتج بعده |
|---|---|---|
| [[setUTCFullYear()]] | [[d.setUTCFullYear(2028)]] | [["2028-11-21T09:05:07.042Z"]] |
| [[setUTCMonth()]] | [[d.setUTCMonth(11, 31)]] | [["2026-12-31T09:05:07.042Z"]] |
| [[setUTCDate()]] | [[d.setUTCDate(1)]] | [["2026-11-01T09:05:07.042Z"]] |
| [[setUTCHours()]] | [[d.setUTCHours(23, 59)]] | [["2026-11-21T23:59:07.042Z"]] |
| [[setUTCMinutes()]] | [[d.setUTCMinutes(0, 0, 0)]] | [["2026-11-21T09:00:00.000Z"]] |
| [[setUTCSeconds()]] | [[d.setUTCSeconds(60)]] | [["2026-11-21T09:06:00.042Z"]] |
| [[setUTCMilliseconds()]] | [[d.setUTCMilliseconds(-1)]] | [["2026-11-21T09:05:06.999Z"]] |

الدرس: «Date: الـ setters و setUTC».

---

## ٧. التحويل لنص

| الـ member | المثال | الناتج |
|---|---|---|
| [[toISOString()]] | [[d.toISOString()]] | [["2026-11-21T09:05:07.042Z"]] |
| [[toJSON()]] | [[d.toJSON()]] | [["2026-11-21T09:05:07.042Z"]] (وده اللي [[JSON.stringify]] بيستخدمه) |
| [[toString()]] | [[d.toString()]] | [["Sat Nov 21 2026 09:05:07 GMT+0000 (Coordinated Universal Time)"]] |
| [[toDateString()]] | [[d.toDateString()]] | [["Sat Nov 21 2026"]] |
| [[toTimeString()]] | [[d.toTimeString()]] | [["09:05:07 GMT+0000 (Coordinated Universal Time)"]] |
| [[toUTCString()]] | [[d.toUTCString()]] | [["Sat, 21 Nov 2026 09:05:07 GMT"]] |
| [[toGMTString()]] | قديمة | نفس دالة [[toUTCString]] |
| [[toLocaleString()]] | [[d.toLocaleString("ar-EG-u-nu-latn")]] | [["21‏/11‏/2026، 9:05:07 ص"]] |
| [[toLocaleDateString()]] | [[d.toLocaleDateString("en-GB")]] | [["21/11/2026"]] |
| [[toLocaleTimeString()]] | [[d.toLocaleTimeString("en-GB")]] | [["09:05:07"]] |

الدرس: «Date: toISOString و toJSON و toLocaleDateString». (في [[toLocaleString]] بالعربي فيه علامة اتجاه مخفية U+200F جنب الـ [[/]]، فمتقارنش النص ده بنص مكتوب بإيدك.)

---

## الخلاصة

| النوع | العدد | بيرجّع |
|---|---|---|
| static ([[Date.now]] و [[Date.parse]] و [[Date.UTC]]) | 3 | رقم ms (أو NaN) |
| getters | 19 (8 محلي + 8 UTC + [[getTime]] + [[getTimezoneOffset]] + [[getYear]]) | رقم |
| setters | 16 (7 + 7 + [[setTime]] + [[setYear]]) | رقم الـ ms الجديد، وبيعدّل الأصل |
| تحويل لنص | 10 | نص (و [[toJSON]] ممكن [[null]]، و [[toISOString]] ممكن ترمي) |
| [[valueOf]] و [[Symbol.toPrimitive]] | 2 | رقم أو نص حسب الـ hint |`,
          lines: [
            R`أسامي كل الـ methods على [[Date.prototype]] (اللي أي Date بيورثها)، من غير [[constructor]] لأنه مش method.`,
            R`بيطبع عددهم ([[46]]) وأسامي الخصايص اللي على [[Date]] نفسه: [[now]] و [[parse]] و [[UTC]] هم الـ static، والباقي موجود على أي دالة.`,
            R`دالة صغيرة بتعدّ الأسامي اللي بتبدأ بحروف معيّنة، عشان نقسّم الـ members لمجموعات.`,
            R`بيطبع [[19 16 10]] (getters و setters وتحويلات)، واللي برّه التلاتة [[valueOf]] بس.`,
            R`[[Symbol.toPrimitive]] مش بيظهر في [[getOwnPropertyNames]] لأنه Symbol مش نص، فبنسأل عليه لوحده: [[function]] وهو الـ Symbol الوحيد.`,
            R`اللحظة اللي كل أمثلة الجداول عليها: السبت ٢١ نوفمبر 2026 الساعة 9:05:07.042 UTC.`,
            R`الاتنين القديمين: [[getYear()]] بترجّع [[126]] (السنة ناقص 1900)، و [[toGMTString]] هي نفس دالة [[toUTCString]] فالمقارنة [[true]].`,
          ],
          pre: [
            "js/Date: getTime و valueOf و Symbol.toPrimitive",
            "js/Date: الـ getters و getUTC",
            "js/Date: الـ setters و setUTC",
            "js/Date: toISOString و toJSON و toLocaleDateString",
          ],
          ref: [
            { t: "MDN: Date", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date" },
            { t: "ECMAScript: Date Objects", url: "https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-date-objects" },
            { t: "ECMAScript Annex B: Date.prototype.getYear و setYear و toGMTString", url: "https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-date.prototype.getyear" },
          ],
        },
      ],
    }
]);

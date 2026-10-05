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
          try: R`شغّل الملف مرتين: [[TZ=Africa/Cairo node dates.js]] و [[TZ=America/New_York node dates.js]] (على Windows استخدم WSL أو Git Bash). أنهي سطور اتغيرت وليه؟ وبعدين اكتب [[addMonths(date, n)]] ترجّع Date جديد ولو اليوم مش موجود في الشهر الجديد تقف على آخر يوم ([[2026-01-31]] + 1 ← [[2026-02-28]]). اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[addMonths]].`,
          flag: "script",
          deep: {
            why: "كل مشروع فيه تواريخ: created_at، وطلبات النهارده، ومواعيد الحجز، وانتهاء الاشتراك. وأخطاء التواريخ خبيثة: الكود بيشتغل تمام على جهازك وعلى السيرفر بيطلع يوم قبله، أو بيبوظ مرتين في السنة بس (التوقيت الصيفي).",
            how: R`[[new Date(y, m, d)]] بيفهم الأرقام بتوقيت الجهاز، والشهر من 0 (ورث ده من Java سنة 1995). ولو الرقم برّه الحدود بيرحّله: [[new Date(2026, 1, 31)]] (٣١ فبراير) بتبقى ٣ مارس. ده اللي حصل مع [[setMonth(1)]] على ٣١ يناير.

الـ parsing حسب المواصفات: [["YYYY-MM-DD"]] لوحدها UTC، وتاريخ + وقت من غير offset محلي، وبـ [[Z]] أو [[+03:00]] محدد. عشان كده السطر الخامس نفس الناتج في أي بلد، والسادس بيتغير: في القاهرة [[2026-02-28T22:00:00.000Z]] (القاهرة UTC+2 في مارس)، وفي نيويورك [[2026-03-01T05:00:00.000Z]]. و [["01/02/2026"]] V8 فهمها أمريكي (MM/DD) فالشهر 0، ومتصفح أو مكتبة تانية ممكن تفهمها ١ فبراير. و [["32/01/2026"]] بتدّي Invalid Date و [[getTime()]] بـ NaN، ومفيش error: لازم تفحص [[Number.isNaN(d.getTime())]] بنفسك.

الطرح [[b - a]] بيحوّلهم milliseconds، فالفرق [[259200000]] (٣ أيام). و [[new Date(a)]] بتعمل نسخة، ومن غيرها [[b = a]] هيبقى نفس الـ object.`,
            when: R`Date لسه موجود في كل API وكل مكتبة، فلازم تعرفه. استخدمه للـ timestamps ([[Date.now()]] و [[toISOString()]])، وللحسابات والعرض استخدم Intl ومكتبة أو Temporal (الدروس الجاية).`,
            mistakes: R`[[new Date(2026, 9, 1)]] وانت فاكرها سبتمبر (دي أكتوبر). وتعمل parse لتاريخ من اليوزر بشكل [["DD/MM/YYYY"]]. وتعدّل Date جاي من برّه ([[setDate]]) فتبوّظه عند الـ caller. وتحسب الأيام بـ [[/ 86400000]] وتنسى إن يوم التوقيت الصيفي ٢٣ أو ٢٥ ساعة. وفي الانترفيو: «ليه [[new Date("2026-03-01")]] ممكن تطبع ٢٨ فبراير؟» الإجابة: اتفهمت UTC منتصف الليل، ولما اتعرضت بتوقيت أمريكا بقت اليوم اللي قبله.`
          },
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
    },
    {
      t: "regex",
      l: 2,
      n: "تدوّر وتتحقق وتستبدل بـ patterns: classes و quantifiers و anchors و groups و flags، والعربي، وإمتى regex غلط",
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
          lines: [
            R`موبايل مصري: 01 وبعدها 0 أو 1 أو 2 أو 5 وبعدها ٨ أرقام، من الأول للآخر.`,
            R`[[true false false]]: التاني ١٠ أرقام بس، والتالت 013.`,
            R`[[?]] الحرف اختياري، و [[\b]] حدود كلمة: [[true false true]].`,
            R`flag [[g]] مع [[match]] بيرجّع كل الـ matches: [[['1', '22', '333']]] و [[['22']]].`,
            R`greedy: [[<b>x</b><b>y</b>]] كلها.`,
            R`lazy بـ [[?]]: [[<b>x</b>]] بس.`,
            "slug: كلمات صغيرة بينها شرطة واحدة.",
            R`[[true false]]: فيه حرف كبير وشرطتين.`,
            R`[[\d]] إنجليزي بس: [['45']]، و [[\p{Nd}]] بـ u: [['١٢٣', '45']].`,
            R`الكلمات العربي بس: [['سعر', 'القهوة', 'جنيه']].`
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
          flag: "script",
          deep: {
            why: "التحقق بـ test بيقولك «الشكل صح» بس. أغلب الشغل الحقيقي «هات لي الجزء ده»: السنة من تاريخ، والـ status من سطر log، والإيميل من نص. والـ groups هي اللي بتعمل كده، والـ named groups بتخلي الكود يتقري بعد ٦ شهور.",
            how: R`[[match]] من غير g بيرجّع array: [[m[0]]] الـ match كله، و [[m[1]]] أول group، و [[m.groups]] الـ named، و [[m.index]] مكانه في النص. ولو مفيش match بيرجّع [[null]] (مش array فاضية)، فلازم تفحص قبل ما تقرا.

[[\1]] back-reference: «نفس اللي اتطابق في group 1»، فـ [[(\w)\1]] حرف متكرر ورا بعض (ll في hello).

فخ الـ g: الـ regex اللي فيه [[g]] أو [[y]] عنده [[lastIndex]] بيتحفظ بين النداءات. [[test]] الأولى لقت o عند 1 وخلّت [[lastIndex = 2]]، والتانية بدأت من 2 ولقت o تانية، والتالتة بدأت من 3 وملقتش فرجعت false ورجّعت lastIndex لـ 0. فلو regex بـ g متخزّن في متغير واستخدمته في test جوه loop أو filter، النتيجة بتتبادل true و false. متحطش g مع test.

[[y]] (sticky) بيطابق من lastIndex بالظبط وبس، مفيدة للـ tokenizers. و [[u]] بيخلي الـ emoji (اللي هو ٢ UTF-16 code units، عشان كده [[length]] بـ 2) حرف واحد. و [[v]] بيضيف طرح وتقاطع جوه الـ class: [[[\p{L}--\p{Ll}]]] «أي حرف ما عدا الحروف الصغيرة» (فـ A و ع يعدّوا و a لأ). v و u مينفعش مع بعض.

الـ lookaround مش بياكل حروف: [[\d+(?= EGP)]] رجّع [[100]] من غير [[" EGP"]].`,
            when: R`named groups في أي regex فيه أكتر من group. و [[i]] في التحقق من حاجات مش حساسة (hex، أوامر). و [[m]] مع النصوص متعددة السطور (logs). و [[u]] أو [[v]] دايمًا لو فيه عربي أو emoji.`,
            mistakes: R`[[g]] مع [[test]] أو [[exec]] على regex متشارك. و [[m[1]]] على null لما مفيش match. وتنسى [[u]] مع [[\p{...}]] فيرمي SyntaxError. وتعد الـ groups غلط بعد ما تضيف قوس في النص فالأرقام تتزحلق (named groups بتحل ده). وفي الانترفيو: «ليه test بترجع نتيجة مختلفة كل مرة؟» الإجابة: lastIndex مع g.`
          },
          lines: [
            "٣ named groups لتاريخ.",
            R`[[match]] من غير g: أول match بالتفاصيل.`,
            R`[[2026-09-29 2026 09 12]]: الكل، وأول group، والشهر بالاسم، والمكان.`,
            R`[[true false false true]]: m بتخلي ^ لكل سطر، و s بتخلي . تاخد السطر الجديد.`,
            R`[[true true abab]]: i، و [[\1]] حرف متكرر، و [[(?:)]] بيكرر وحدة.`,
            R`regex بـ g في متغير.`,
            R`[[true 2 true false]]: lastIndex بيفتكر، فالتالتة فشلت. فخ مشهور.`,
            R`[[y]]: لازم يطابق من lastIndex بالظبط.`,
            "ابدأ من الحرف الرابع.",
            R`[[42 null]]: من 4 لقى، ومن 0 لأ (a مش رقم).`,
            R`[[2 false true]]: الـ emoji اتنين code units، و u بتخليه حرف واحد.`,
            R`[[true false true]]: v بتسمح بطرح classes (العربي ملوش صغير وكبير فبيعدّي).`,
            R`lookahead و lookbehind: [[100 30]] من غير EGP ولا €.`
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
          lines: [
            "٣ سطور log.",
            R`named groups لكل جزء، و [[g]] لكل الـ matches، و [[m]] عشان ^ و $ لكل سطر.`,
            R`[[matchAll]]: كل match بالـ groups بتاعته.`,
            R`فك الـ groups في متغيرات.`,
            R`الأخطاء بس: [[POST /api/login 401 8]] و [[GET /api/orders 500 230]].`,
            "قفلة.",
            R`match بـ g: نصوص بس، [[['200', '401', '500']]].`,
            R`[[$3/$2/$1]]: [[29/09/2026]].`,
            R`نفس الحاجة بالأسماء: أوضح.`,
            R`دالة استبدال: [[Hello Big World]].`,
            R`[[replaceAll]] بنص: [[a/b/c]]، و split بـ regex: [['a', 'b', 'c', 'd']].`,
            "نص من اليوزر فيه + (حرف خاص).",
            R`escape لكل الحروف الخاصة: بقى [[1\+1]].`,
            R`[[1\+1 true]]: بيدوّر على «1+1» حرفيًا.`
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
          lines: [
            R`nested quantifier: [[+]] جوه [[+]]. خطر.`,
            "بتقبل نفس النصوص بالظبط، من غير تداخل.",
            "جرّب ٣ أطوال.",
            R`a's كتير وفي الآخر حرف بيخلي الـ match يفشل.`,
            "وقت البداية.",
            "الـ regex الخطر.",
            "وقت بداية الآمن.",
            "الآمن.",
            R`عندي: [[20 46ms]] و [[24 119ms]] و [[26 461ms]]، والآمن [[0.0xms]].`,
            "قفلة.",
            "فحص إيميل عملي، والتأكيد الحقيقي برسالة.",
            R`[[true false false]].`,
            R`URL بـ parser مش regex: [["7"]].`
          ],
          sol: R`الأرقام بتختلف حسب جهازك، بس الشكل ثابت: كل حرف زيادة الوقت تقريبًا بيتضاعف (من 24 لـ 26 حوالي ٤ أضعاف). يعني 30 حوالي ٨ ثواني، و 40 ساعات. وطول الوقت ده الـ process واقف: لو ده سيرفر Node، ولا request تاني بيترد. والـ regex الآمن ثابت تقريبًا في كل الأطوال.

اللينكات بـ regex: [[/href="([^"]+)"/g]] بيشتغل على المثال ده، بس بيبوظ لو الـ attribute بـ single quotes، أو فيه مسافة حوالين [[=]]، أو اللينك جوه comment، أو [[href]] مكتوب في نص عادي. و DOMParser: [[[...new DOMParser().parseFromString(html, "text/html").querySelectorAll("a")].map((a) => a.getAttribute("href"))]] بيرجّع [[["/a", "/b"]]] مهما كان شكل الـ HTML، لأنه نفس الـ parser اللي المتصفح بيعرض بيه الصفحة.`
        }
      ]
    },
    {
      t: "الـ event loop",
      l: 3,
      n: "JS بيشغّل حاجة واحدة في المرة، فإزاي بيعمل async؟ الـ call stack والـ queues والـ microtasks، وليه الصفحة بتتجمد",
      items: [
        {
          cmd: "event loop",
          title: "JS بـ thread واحد، فإزاي بيعمل كذا حاجة مع بعض؟",
          desc: R`JavaScript بينفّذ الكود على thread واحد: حاجة واحدة في المرة، في call stack واحد. الحاجات اللي بتاخد وقت (timers و fetch و events و الملفات) مش JS اللي بيستناها، المتصفح أو Node هو اللي بيعملها برّه، ولما تخلص بيحط الـ callback بتاعها في طابور (queue).

الـ event loop لفّة بسيطة: لو الـ call stack فاضي، خد أول حاجة من الطابور وشغّلها. عشان كده [[setTimeout(fn, 0)]] مبيشتغلش فورًا: بيستنى الكود الحالي كله يخلص.`,
          example: R`function a() { b(); }
function b() { console.trace("الـ stack دلوقتي: b ← a ← global"); }
a();
setTimeout(() => console.log("3: timeout"), 0);
fetch("https://example.com").then(() => console.log("4: fetch خلص"));
console.log("1: آخر سطر sync");
console.log("2: لسه sync");`,
          try: R`افتح loupe (latentflip.com/loupe) أو أي visualizer للـ event loop وحط كود فيه setTimeout و console.log، وشوف الـ stack والـ queue بيتحركوا. وبعدين في DevTools حط breakpoint جوه [[b]] وبص على Call Stack على اليمين.`,
          flag: "script",
          deep: {
            why: R`ده أشهر سؤال JS في الانترفيو للـ mid و senior: «اشرح الـ event loop». وفهمه بيفسّر كل حاجة غريبة في async: ليه الـ setTimeout بتتأخر، وليه loop تقيل بيجمّد الصفحة، وليه Promise بيشتغل قبل setTimeout.`,
            how: R`الأجزاء: الـ call stack (الدوال اللي شغالة دلوقتي، فوق بعض)، والـ heap (الـ objects)، والـ Web APIs في المتصفح أو libuv في Node (اللي بيعملوا الشغل البطيء فعلًا، وأحيانًا على threads تانية)، والطوابير.

اللفة الواحدة في المتصفح تقريبًا: ١. خد task واحدة من طابور الـ tasks (macrotask) وشغّلها لحد ما الـ stack يفضى. ٢. شغّل كل الـ microtasks (Promises) لحد ما طابورها يفضى. ٣. لو جه وقت رسم الشاشة (حوالي كل 16ms على شاشة 60Hz)، شغّل [[requestAnimationFrame]] callbacks، واحسب الـ layout، وارسم. وارجع لـ ١.

يعني مفيش حاجة بتقطع الكود وهو شغال. أي دالة بتبدأ بتخلص للآخر (run-to-completion). وعشان كده مش محتاج locks زي اللغات اللي فيها threads.

في Node الفكرة نفسها بس الطوابير مقسمة phases (timers ثم I/O ثم setImmediate...)، و [[process.nextTick]] بيشتغل قبل الـ Promises. التفاصيل في تاب «Node و npm» وتاب الانترفيو (concurrency vs parallelism).`,
            when: "كل ما تشوف ترتيب تنفيذ غريب، أو صفحة بتهنّج، أو callback بيتأخر. وفي أي انترفيو فرونت أو Node.",
            mistakes: R`تفتكر إن setTimeout بـ 1000 معناه بعد ثانية بالظبط: معناها «مش قبل ثانية»، ولو الـ stack مشغول هتتأخر. وتفتكر إن async معناه parallel: الكود بتاعك لسه على thread واحد، اللي بيحصل بالتوازي هو الـ I/O بس. وفي الانترفيو ارسم الـ stack والـ queue والـ microtask queue، واشرح مثال بالترتيب.`
          },
          lines: [
            "دالة بتنادي دالة.",
            R`[[console.trace]] بيطبع الـ call stack الحالي.`,
            R`[[a]] دخلت الـ stack، ونادت b فوقها، وبعدين الاتنين خرجوا.`,
            "الـ timer بيتسجّل في المتصفح، والـ callback هيتحط في الطابور بعد 0ms، بس هيستنى الـ stack يفضى.",
            "الطلب بيتبعت، والـ then هتشتغل لما الرد ييجي، أكيد بعد الكود المتزامن.",
            "بيتطبع قبل الـ timeout والـ fetch.",
            "ولسه قبلهم: الكود المتزامن كله بيخلص الأول."
          ],
          sol: R`في loupe هتشوف [[console.log]] تدخل الـ Call Stack وتخرج على طول، والـ [[setTimeout]] تدخل وتسيب الـ callback عند الـ Web APIs، وبعد الوقت يروح الـ Callback Queue، ومبيدخلش الـ stack غير لما يفضى. حتى لو الوقت 0.

في DevTools لما الكود يقف عند الـ breakpoint جوه b، الـ Call Stack هيبقى [[b]] فوق، وتحتها [[a]]، وتحتها [[(anonymous)]] وده الكود الـ global. ونفس الترتيب بيطبعه [[console.trace]] في Node ([[at b]] ثم [[at a]]). والناتج كله: الـ trace، و [[1: آخر سطر sync]]، و [[2: لسه sync]]، وبعدين [[3: timeout]] (أو fetch قبلها لو خلصت أسرع، لأنهم الاتنين async). اللي بيتوقع [[3]] قبل [[1]] ده اللي محتاج الدرس ده.`
        },
        {
          cmd: "microtasks و macrotasks",
          title: "ليه Promise.then بيشتغل قبل setTimeout 0؟",
          desc: R`فيه طابورين مش واحد. الـ macrotasks (أو tasks): setTimeout و setInterval و events و الـ I/O. والـ microtasks: [[.then]] و [[await]] و [[queueMicrotask]] و MutationObserver.

القاعدة: بعد كل task، الـ event loop بيفضّي طابور الـ microtasks كله قبل ما ياخد task تانية. عشان كده أي Promise جاهز بيشتغل قبل أي setTimeout، حتى لو الـ setTimeout اتسجّل الأول.

و [[await x]] معناه: الجزء اللي بعد الـ await في الدالة دي بقى microtask.`,
          example: R`console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));
queueMicrotask(() => console.log("E"));
(async () => {
  console.log("F");
  await null;
  console.log("G");
})();
console.log("H");
// الناتج: A F H C E G D B`,
          try: R`اكتب الناتج على ورقة قبل ما تشغّل، وبعدين شغّله بـ [[node]]. وبعدين ضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، وحاول تتوقع مكانه.`,
          flag: "script",
          deep: {
            why: "سؤال «رتّب الـ console.log» ده بيتسأل تقريبًا في كل انترفيو JS. وفي الشغل بيفسّر ليه الـ state مش متحدثة لما تقراها بعد await، وليه microtasks كتير ممكن تجمّد الصفحة زي loop تقيل.",
            how: R`نمشي على المثال: الكود المتزامن الأول: A، ثم تسجيل B في طابور الـ tasks، ثم C في الـ microtasks، ثم E في الـ microtasks. الـ async function بتبدأ متزامن فبتطبع F، وأول await بيحط الباقي (G) في الـ microtasks ويرجع. ثم H.

الـ stack فضي، فنفضّي الـ microtasks بالترتيب: C (ولما خلصت، D اتسجّلت في آخر الطابور)، ثم E، ثم G، ثم D. الطابور فضي. دلوقتي بس task واحدة: B.

ليه الـ microtasks موجودة؟ عشان نتيجة الـ Promise تتعالج في أقرب وقت ممكن وبترتيب ثابت، قبل ما المتصفح يرسم أو يعالج events جديدة.

الخطر: microtask بتعمل microtask بتعمل microtask... الطابور مش هيفضى أبدًا، والصفحة هتتجمد، لأن الرسم مبيحصلش غير بعد ما يفضى. setTimeout المتكرر مش بيعمل كده لأنه بيدي فرصة للرسم بين كل مرة.

في Node: [[process.nextTick]] ليه طابور بيتفضّى قبل الـ Promises كمان، و [[setImmediate]] بيشتغل بعد مرحلة الـ I/O.`,
            when: R`[[queueMicrotask]] لما عايز حاجة تشتغل بعد الكود الحالي بس قبل أي event أو رسم (نادرًا في كود التطبيقات). setTimeout 0 لما عايز تدي المتصفح فرصة يرسم ويستجيب الأول.`,
            mistakes: R`تفتكر إن الترتيب حسب وقت التسجيل بس. وتنسى إن الجزء قبل أول await في async function متزامن (F اتطبعت قبل H). وتنسى إن كل then بتسجّل اللي بعدها لما تخلص بس (D جت بعد E و G).`
          },
          lines: [
            "sync: أول حاجة.",
            "task (macrotask): هتستنى لآخر خالص.",
            "Promise جاهز.",
            "microtask: أول واحدة في الطابور.",
            "مش هتتسجّل غير لما C تخلص، فهتبقى في آخر طابور الـ microtasks.",
            "microtask تانية.",
            "async function: بتبدأ متزامن.",
            "F بتتطبع على طول قبل H.",
            "أي await (حتى على null) بيحط الباقي microtask.",
            "G بعد C و E.",
            "نداء الدالة.",
            "sync: آخر حاجة متزامنة."
          ],
          sol: R`الناتج [[A F H C E G D B]]. الـ sync الأول (A و F و H، و F لأن الـ async function بتشتغل sync لحد أول await). بعدين كل الـ microtasks بالترتيب اللي اتسجلت بيه: C و E و G، وبعدها D لأنها اتسجلت لما C خلصت. وفي الآخر الـ macrotask: B.

لما تضيف [[setTimeout(() => console.log("I"), 0)]] جوه أول then، I بتطلع بعد B: [[A F H C E G D B I]]. الـ timeout ده اتسجّل وقت ما C اتنفّذت، يعني بعد ما B كان في الطابور أصلًا، والـ timers بتطلع بترتيب تسجيلها. اللي بيحط I قبل D فاكر إن setTimeout بيقاطع الـ microtasks، وده الغلط.`
        },
        {
          cmd: "blocking و الـ main thread",
          title: "ليه الصفحة بتتجمد، وإزاي تشغّل حسابات تقيلة من غير تجميد",
          desc: R`في المتصفح، نفس الـ thread اللي بيشغّل JS هو اللي بيرسم الصفحة ويستجيب للضغط والكتابة. أي كود متزامن بياخد وقت طويل (loop على مليون عنصر، أو JSON ضخم، أو sort كبير) بيجمّد كل ده. المتصفح بيعتبر أي task أطول من 50ms «long task»، وده بيبوظ مقياس INP في Core Web Vitals.

الحلول: قسّم الشغل لدفعات وسيب المتصفح يتنفس بينهم، أو انقله لـ Web Worker على thread تاني خالص، أو اتأكد إن التعديلات البصرية في [[requestAnimationFrame]].`,
          example: R`const start = Date.now();
while (Date.now() - start < 2000) {}   // الصفحة متجمدة ثانيتين
async function processInChunks(items, fn, size = 500) {
  for (let i = 0; i < items.length; i += size) {
    items.slice(i, i + size).forEach(fn);
    await (globalThis.scheduler?.yield?.() ?? new Promise((r) => setTimeout(r, 0)));
  }
}
const worker = new Worker(new URL("./sum.worker.js", import.meta.url), { type: "module" });
worker.postMessage({ n: 1e9 });
worker.onmessage = (e) => console.log("النتيجة:", e.data);
// sum.worker.js: self.onmessage = (e) => { let s = 0; for (let i = 0; i < e.data.n; i++) s += i; self.postMessage(s); };
requestAnimationFrame(() => { document.body.style.opacity = "0.9"; });`,
          try: R`في Console على أي صفحة شغّل أول سطرين، وحاول تعمل scroll أو تضغط زرار وانت مستني. وبعدين افتح تاب Performance في DevTools وسجّل وانت بتشغّله: هتشوف long task بالأحمر.`,
          flag: "script",
          deep: {
            why: "«الموقع بيهنّج لما أدوس على الزرار» مشكلة حقيقية بيحسها اليوزر أكتر من أي حاجة. و Google بيقيس الاستجابة (INP) كجزء من الـ SEO. وسؤال انترفيو: «إزاي تعالج ١٠٠ ألف صف من غير ما الصفحة تقف؟».",
            how: R`طول ما فيه task شغالة، الـ event loop مش هيوصل لمرحلة الرسم ولا هيعالج الضغطات. فالحل يا إما تقصّر الـ tasks، يا إما تطلّعها برّه الـ main thread.

التقسيم (chunking): كل دفعة task لوحدها، و [[setTimeout(r, 0)]] بينهم بيدي الـ event loop فرصة يرسم ويستجيب. و [[scheduler.yield()]] (موجود في Chrome و Edge ومتصفحات تانية بتلحق) بيعمل نفس الحاجة بس بيرجّعك في أول الطابور بدل آخره. الكود فوق بيستخدمه لو موجود.

Web Worker: ملف JS بيشتغل على thread تاني، مالوش DOM ولا window. بتكلّمه بـ [[postMessage]]، والداتا بتتنسخ (structured clone، زي structuredClone) مش بتتشارك، إلا لو بعت ArrayBuffer كـ transferable. في Node فيه [[worker_threads]] بنفس الفكرة.

[[requestAnimationFrame(fn)]] بيشغّل fn قبل الرسم الجاي بالظبط، فأي animation أو تعديل بصري فيه بيبقى ناعم ومتزامن مع الشاشة، ومبيشتغلش والتاب في الخلفية.

وقبل أي حاجة من دول: قيس الأول بـ Performance tab، وغالبًا المشكلة الحقيقية حاجة أبسط (تاب HTML و CSS: layout thrashing، وتاب React للـ re-renders).`,
            when: "Worker للحسابات التقيلة المستقلة (معالجة صور، parsing ملفات كبيرة، تشفير، بحث في داتا ضخمة). Chunking لما الشغل محتاج الـ DOM. rAF لأي animation بـ JS. و virtualization لليستات الطويلة جدًا.",
            mistakes: R`تحط الشغل التقيل في Promise وتفتكر إنه بقى «في الخلفية»: الـ Promise مش thread، والكود جوه الـ executor بيشتغل متزامن على نفس الـ thread. وتعمل animation بـ setInterval. وتبعت objects ضخمة للـ worker كل شوية فالنسخ نفسه يبقى تقيل.`
          },
          lines: [
            "وقت البداية.",
            "loop فاضي بيشغل الـ thread ثانيتين: مفيش رسم ولا ضغط.",
            "دالة بتعالج array كبيرة على دفعات.",
            "كل لفة دفعة.",
            "عالج الدفعة دي.",
            R`ادي المتصفح فرصة يرسم ويستجيب: [[scheduler.yield]] لو موجود، وإلا setTimeout 0.`,
            "قفلة.",
            "قفلة.",
            "worker على thread تاني، من ملف module.",
            "ابعتله الشغل.",
            "استقبل النتيجة من غير ما الصفحة تقف.",
            "التعديل البصري قبل الرسم الجاي بالظبط."
          ],
          sol: R`وانت مستني الـ ٢ ثانية: الـ scroll مبيتحركش، والضغط على أي زرار مبيعملش حاجة، وحتى الـ hover. أول ما الـ loop تخلص كل اللي ضغطته بيتنفذ مرة واحدة، لأن الأحداث كانت واقفة في الطابور. الـ main thread مشغول، ومفيش حد يرسم أو يرد.

في تاب Performance هتلاقي مستطيل طويل في الـ Main track عليه مثلث أحمر في الركن مكتوب [[Task]] بطول حوالي 2000ms، ولو عدّيت عليه هيقولك إنه long task (أي task أطول من 50ms). ده اللي بيبوّظ INP. لو ملقتهوش، اتأكد إنك دوست Record قبل ما تشغّل الكود ووقفت بعده.`
        }
      ]
    },
    {
      t: "الأداء والذاكرة",
      l: 3,
      n: "debounce و throttle للأحداث الكتير، والـ memory leaks وإزاي تمنعها",
      items: [
        {
          cmd: "debounce و throttle",
          title: "تقلل عدد مرات تنفيذ دالة بتتنادي كتير",
          desc: R`أحداث زي [[input]] و [[scroll]] و [[resize]] بتتنادي عشرات المرات في الثانية. لو كل مرة بتبعت request أو تحسب layout، الصفحة هتتقل والسيرفر هيتضرب.

debounce: استنى لحد ما الأحداث تقف فترة (مثلًا 300ms بعد آخر حرف)، ونفّذ مرة واحدة. مثالي للبحث وأنت بتكتب وحفظ الـ drafts.

throttle: نفّذ مرة واحدة بالكتير كل فترة (مثلًا كل 200ms)، مهما الحدث اتكرر. مثالي للـ scroll والـ resize وتتبّع الماوس.`,
          example: R`function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn.apply(this, args);
  };
}
const input = document.querySelector("#search");
const search = debounce((q) => console.log("ابحث عن", q), 300);
input.addEventListener("input", (e) => search(e.target.value));
window.addEventListener("scroll", throttle(() => console.log(scrollY), 200), { passive: true });`,
          try: R`حط counter بيعد مرات تنفيذ الـ callback الأصلي، واكتب كلمة ١٠ حروف بسرعة: من غير debounce ١٠ مرات، ومعاه مرة. وبعدين ضيف لـ debounce method اسمها [[cancel]] بتلغي الـ timer. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات مش بتستنى وقت حقيقي، بتبعت ساعة وهمية كـ argument تالت [[clock]] فيها [[setTimeout]] و [[clearTimeout]]، فاستخدم [[clock.setTimeout]] و [[clock.clearTimeout]]، وضيف [[cancel]].`,
          flag: "script",
          deep: {
            why: "بحث بيبعت request مع كل حرف = ١٠ requests لكلمة واحدة، والردود ممكن توصل بترتيب غلط. و scroll handler تقيل = scroll بيقطّع. والاتنين من أشهر أسئلة انترفيو الفرونت: «اكتب debounce بإيدك».",
            how: R`debounce مبني على closure: [[timer]] متغير عايش بين النداءات. كل نداء بيلغي الـ timer القديم ويبدأ واحد جديد، فالتنفيذ الفعلي بيحصل بس لما يعدّي ms من غير نداء جديد. الشكل ده اسمه trailing (في الآخر). فيه نسخة leading بتنفّذ أول نداء على طول وتتجاهل الباقي لحد ما يهدى.

throttle بيحفظ وقت آخر تنفيذ، ويتجاهل أي نداء قبل ما الفترة تعدّي. النسخة البسيطة دي ممكن تضيّع آخر نداء، والنسخ الكاملة (lodash) بتضمن تنفيذ أخير في الآخر.

[[function (...args)]] مش arrow، و [[fn.apply(this, args)]]، عشان لو الدالة المتغلفة method محتاجة this، تفضل شغالة.

للـ scroll والـ animation، [[requestAnimationFrame]] كـ throttle طبيعي (مرة لكل frame) غالبًا أحسن. وللبحث: debounce + AbortController (درس fetch) عشان الرد القديم ميكتبش فوق الجديد.

في React لازم الدالة الـ debounced تتعمل مرة واحدة ([[useMemo]] أو [[useRef]])، وإلا كل render بيعمل واحدة جديدة بـ timer جديد.`,
            when: "debounce: بحث، و autosave، و validation وانت بتكتب، و resize نهائي. throttle: scroll، و mousemove، و infinite scroll، و analytics events.",
            mistakes: R`تعمل debounce جوه الـ handler نفسه ([[input.oninput = () => debounce(fn, 300)()]]) فكل مرة timer جديد ومفيش حاجة بتتلغي. وتنسى this و args. و debounce للزرار «ادفع»: الأحسن تعطّل الزرار. وفي الانترفيو: «الفرق بين debounce و throttle؟» بمثال لكل واحد.`
          },
          lines: [
            "debounce: بياخد الدالة والمدة.",
            R`[[timer]] في الـ closure، مشترك بين كل النداءات.`,
            "بترجّع دالة جديدة بتاخد أي arguments.",
            "كل نداء بيلغي اللي قبله.",
            "ويبدأ timer جديد: التنفيذ بس لو عدّى ms من غير نداء.",
            "قفلة.",
            "قفلة.",
            "throttle.",
            "وقت آخر تنفيذ.",
            "الدالة الجديدة.",
            "دلوقتي.",
            "لسه الفترة معدّتش: تجاهل.",
            "سجّل وقت التنفيذ.",
            "نفّذ بنفس this و args.",
            "قفلة.",
            "قفلة.",
            "خانة البحث.",
            "نسخة debounced من البحث، اتعملت مرة واحدة برا الـ handler.",
            "كل حرف بينادي search، والبحث الحقيقي بعد 300ms من آخر حرف.",
            R`مرة كل 200ms بالكتير. و [[passive]] هنا ملوش تأثير فعلي لأن الـ scroll event مش cancelable أصلًا، فايدته الحقيقية مع [[wheel]] و [[touchstart]] و [[touchmove]].`
          ],
          sol: R`مع ١٠ حروف بسرعة: الـ counter بتاع الـ callback الأصلي بيعد 10، ونسخة debounce بتعد 1 بآخر قيمة ([["javascript"]] كاملة) بعد 300ms من آخر حرف. لو بتكتب ببطء (أكتر من 300ms بين الحروف) هتلاقيها اشتغلت أكتر من مرة، وده صح.

[[cancel]] بتعمل [[clearTimeout(timer)]]، فلو ناديت [[search("x")]] وبعدين [[search.cancel()]] على طول، الـ callback مش هيشتغل خالص. مفيدة لما الـ component يتشال أو اليوزر يمسح الـ input. الغلطة الشائعة إنك تعمل debounce جوه الـ listener نفسه ([[input.addEventListener("input", (e) => debounce(fn, 300)(e.target.value))]]): كده بتعمل timer جديد في كل حرف، فمفيش debounce خالص.`,
          solCode: R`function debounce(fn, ms) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}
let raw = 0, calls = 0;
const search = debounce((q) => { calls++; console.log("ابحث عن", q); }, 300);
const word = "javascript";
for (let i = 1; i <= word.length; i++) {
  raw++;
  search(word.slice(0, i));
  await new Promise((r) => setTimeout(r, 50));
}
await new Promise((r) => setTimeout(r, 400));
console.log({ raw, calls }); // { raw: 10, calls: 1 }`,
          check: {
            lang: "js",
            starter: R`function debounce(fn, ms, clock = globalThis) {
  let timer;
  function debounced(...args) {
    // clock.clearTimeout(timer) وبعدين timer = clock.setTimeout(...)
  }
  debounced.cancel = () => {};
  return debounced;
}`,
            tests: R`function fakeClock() {
  let now = 0, id = 0;
  const timers = new Map();
  return {
    setTimeout(f, ms) { timers.set(++id, { at: now + ms, f }); return id; },
    clearTimeout(t) { timers.delete(t); },
    tick(ms) {
      now += ms;
      for (const [t, { at, f }] of [...timers].sort((a, b) => a[1].at - b[1].at)) if (at <= now) { timers.delete(t); f(); }
    }
  };
}
test("10 نداءات ورا بعض ← الـ fn بتتنادي مرة واحدة بآخر قيمة", () => {
  const clock = fakeClock(), got = [];
  const search = debounce((q) => got.push(q), 300, clock);
  const word = "javascript";
  for (let i = 1; i <= word.length; i++) { search(word.slice(0, i)); clock.tick(50); }
  clock.tick(300);
  expect(got).toEqual(["javascript"]);
});
test("قبل ما الـ ms تخلص مفيش نداء", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 300, clock);
  f();
  clock.tick(299);
  expect(calls).toBe(0);
  clock.tick(1);
  expect(calls).toBe(1);
});
test("نداءين بينهم أكتر من ms ← مرتين", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 100, clock);
  f(); clock.tick(150); f(); clock.tick(150);
  expect(calls).toBe(2);
});
test("cancel بتلغي النداء اللي مستني", () => {
  const clock = fakeClock();
  let calls = 0;
  const f = debounce(() => calls++, 100, clock);
  f("x"); f.cancel(); clock.tick(500);
  expect(calls).toBe(0);
});
test("بتعدّي الـ arguments و this", () => {
  const clock = fakeClock();
  const obj = { name: "Sara", hi: debounce(function (g) { obj.out = g + " " + this.name; }, 10, clock) };
  obj.hi("Hi"); clock.tick(10);
  expect(obj.out).toBe("Hi Sara");
});`,
            solution: R`function debounce(fn, ms, clock = globalThis) {
  let timer;
  function debounced(...args) {
    clock.clearTimeout(timer);
    timer = clock.setTimeout(() => fn.apply(this, args), ms);
  }
  debounced.cancel = () => clock.clearTimeout(timer);
  return debounced;
}`
          }
        },
        {
          cmd: "memory leaks",
          title: "الذاكرة بتكبر ومبتنزلش: إيه اللي بيمسكها؟",
          desc: R`JS فيه garbage collector: أي object محدش يقدر يوصله (من الـ globals أو الـ stack أو closures عايشة) بيتمسح لوحده. الـ memory leak معناه إنك سايب reference لحاجة مش محتاجها، فمبتتمسحش.

أشهر الأسباب: event listeners متشالتش، و setInterval متوقفش، و cache أو Map بيكبر للأبد، و closures شايلة objects ضخمة، وعناصر DOM اتشالت من الصفحة بس لسه في متغير.

الحلول: شيل اللي ضفته (cleanup)، و [[AbortController]] لـ listeners كتير مرة واحدة، و [[WeakMap]] لداتا مربوطة بـ objects، وحد أقصى لأي cache.`,
          example: R`const cache = new Map();
function remember(key, value) { cache.set(key, value); }  // بيكبر للأبد: حط حد أقصى
const meta = new WeakMap();
function tag(el, info) { meta.set(el, info); }            // لما el يتمسح، info تتمسح معاه
function startPolling() {
  const id = setInterval(() => fetch("/api/ping"), 5000);
  return () => clearInterval(id);
}
const stopPolling = startPolling();
stopPolling();
const controller = new AbortController();
window.addEventListener("resize", () => console.log(innerWidth), { signal: controller.signal });
document.addEventListener("keydown", (e) => console.log(e.key), { signal: controller.signal });
controller.abort();`,
          try: R`في DevTools افتح Memory، وخد Heap snapshot، واعمل حاجة في الصفحة ١٠ مرات (افتح وقفل modal)، وخد snapshot تاني، واختار «Comparison». لو فيه objects بتزيد مع كل مرة ومبتقلش، عندك leak. دوّر على «Detached» عشان عناصر DOM اتشالت ولسه ممسوكة.`,
          flag: "script",
          deep: {
            why: "في SPA الصفحة مبتعملش reload بالساعات، فأي leak صغير في كل navigation بيتراكم لحد ما التاب يتقل أو يقع. وفي Node، leak في سيرفر شغال أسابيع بيوصل لـ «JavaScript heap out of memory» (تاب «Node و npm»: الذاكرة).",
            how: R`الـ GC في V8 بيستخدم mark-and-sweep: بيبدأ من الـ roots (الـ globals والـ stack) ويعلّم كل حاجة يقدر يوصلها، والباقي يتمسح. فالـ references الدائرية (a بيشاور على b و b على a) مش مشكلة لو محدش من برّه بيوصلهم. المشكلة دايمًا reference من حاجة عايشة.

الـ listener على [[window]] أو [[document]] عايش طول الصفحة، والـ callback بتاعه closure شايل كل اللي حواليه. لو الـ component اتشال ومشلتش الـ listener، الـ component وكل داتته لسه ممسوكين. ده سبب cleanup function في useEffect (تاب React).

[[setInterval]] نفس الفكرة: المتصفح شايل الـ callback لحد clearInterval.

[[WeakMap]] مفاتيحها objects ومبتمنعش الـ GC يمسحها. لما المفتاح يتمسح، الـ entry كلها بتختفي. عشان كده مفيهاش size ولا تقدر تلف عليها. و [[WeakRef]] و [[FinalizationRegistry]] موجودين بس نادرًا بتحتاجهم ومش مضمون إمتى بيشتغلوا.

[[{ signal }]] في addEventListener: أول ما تعمل [[abort()]] كل الـ listeners اللي بنفس الـ signal بتتشال مرة واحدة.`,
            when: R`اسأل نفسك مع كل [[addEventListener]] و [[setInterval]] و [[subscribe]] و [[new WebSocket]]: «مين هيقفل ده وإمتى؟». و WeakMap لما تربط داتا بعناصر DOM أو objects مش بتاعتك.`,
            mistakes: R`useEffect بيضيف listener أو interval من غير return cleanup. و cache global في سيرفر Node بمفاتيح من الـ requests من غير حد. و [[console.log]] لـ objects كبيرة في الإنتاج (DevTools بيمسكها). وفي الانترفيو: «إيه أسباب الـ memory leak في JS وإزاي تلاقيها؟».`
          },
          lines: [
            "Map عادية.",
            "أي حاجة بتتحط فيها مبتتمسحش غير بإيدك.",
            "WeakMap: المفتاح object.",
            "مش هتمنع العنصر إنه يتمسح.",
            "بتبدأ polling.",
            "كل 5 ثواني request.",
            "بترجّع دالة توقفه: دي اللي تناديها في الـ cleanup.",
            "قفلة.",
            "شغّله واحفظ دالة الإيقاف.",
            "وقّفه لما مبقاش محتاجه.",
            "controller واحد لكل الـ listeners.",
            R`listener مربوط بالـ [[signal]].`,
            "وكمان واحد.",
            "سطر واحد بيشيلهم كلهم."
          ],
          sol: R`صفحة سليمة: في الـ Comparison الـ [[# Delta]] حوالي صفر، أو بيزيد مرة وبعدين يثبت. صفحة فيها leak: رقم بيزيد بنفس النسبة مع كل مرة (فتحت 10 مرات فزاد 10 أو مضاعفاتها)، زي [[HTMLDivElement]] أو [[Detached HTMLDivElement]] أو closures بتاعة listeners.

لو كتبت «Detached» في خانة الفلتر ولقيت عناصر، دي عناصر اتشالت من الصفحة بس لسه فيه حاجة ماسكاها: listener على window مش اتشال، أو متغير أو Map شايلها، أو setInterval لسه شغال. افتح العنصر وبص في «Retainers» تحت، هتلاقي السلسلة لحد اللي ماسكه. وقبل الـ snapshot التاني دوس زرار الزبالة (Collect garbage) عشان متتلخبطش بحاجات لسه متمسحتش.`
        }
      ]
    }
]);

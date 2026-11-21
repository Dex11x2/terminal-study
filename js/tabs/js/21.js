// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "التواريخ والوقت",
      l: 2,
      n: "Date ومطبّاته، وتخزّن UTC وتعرض بتوقيت اليوزر بـ Intl، و «من ٥ دقايق»، و date-fns ولا Temporal في 2026",
      pre: [
        { to: "js/reference و copy", why: R`[[setMonth]] و [[setDate]] بيعدّلوا نفس الـ Date، وده نفس فكرة الـ reference: اسمين لنفس الـ object` },
        { to: "js/Number: toFixed و toString و toLocaleString", why: R`[[toLocaleString]] و [[Intl]] للأرقام هما نفس الفكرة اللي هنعملها للتواريخ: locale و options` },
        { to: "js/addEventListener", why: R`مشاريع الوحدة صفحات: خانة تاريخ وزرار بيسمعوا لـ [[input]] و [[submit]]` },
        { to: "js/custom errors و cause", why: R`المشروع الكبير بيرمي [[ValidationError]] فيه اسم الحقل` },
        { to: "js/import و export", why: R`المشروع الكبير ملفات بتستورد من بعض، ودرس Temporal بيستورد polyfill` },
      ],
      projects: [
        { lvl: 'صغير', dir: "days-left", t: R`فاضل كام يوم`, what: R`صفحة بتاخد تاريخ مناسبة من [[<input type="date">]] (قيمته [["YYYY-MM-DD"]]) وتطبع «فاضل X يوم» محسوبة بأيام التقويم في القاهرة، ولو التاريخ فات «من X يوم»، ولو النهارده «النهارده!». من دروس Date و UTC و Intl.`, done: R`تاريخ بكرة ← «فاضل 1 يوم» مهما الساعة كام دلوقتي (حتى 11:59 بالليل). النهارده ← «النهارده!». التاريخ الفاضي ← رسالة بدل NaN.`, sol: R`## الشكل النهائي

~~~live 230 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>فاضل كام يوم</title>
<style>
  body { font: 17px/1.7 system-ui, sans-serif; margin: 16px; max-width: 420px; }
  label { display: block; font-weight: 600; margin-bottom: 4px; }
  input { font: inherit; padding: 6px 8px; }
  #result { font-size: 26px; font-weight: 700; margin: 16px 0 4px; min-height: 1.5em; }
  #today { color: #555; font-size: 14px; }
</style>
</head>
<body>
<label for="event">تاريخ المناسبة</label>
<input type="date" id="event">
<p id="result" aria-live="polite">اختار تاريخ</p>
<p id="today"></p>
<script>
  const ZONE = "Africa/Cairo";
  const DAY_MS = 86400000;
  const cairoDay = new Intl.DateTimeFormat("en-CA", { timeZone: ZONE });
  const longDate = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full", timeZone: ZONE });

  // "YYYY-MM-DD" -> عدد أيام من 1970، من غير ساعات ولا توقيت
  function dayNumber(ymd) {
    const [y, m, d] = ymd.split("-").map(Number);
    return Date.UTC(y, m - 1, d) / DAY_MS;
  }

  function daysLeftText(target, now = new Date()) {
    if (!target) return "اختار تاريخ";
    const diff = dayNumber(target) - dayNumber(cairoDay.format(now));
    if (Number.isNaN(diff)) return "التاريخ ده مش مفهوم";
    if (diff === 0) return "النهارده!";
    return diff > 0 ? "فاضل " + diff + " يوم" : "من " + -diff + " يوم";
  }

  const input = document.getElementById("event");
  const result = document.getElementById("result");
  input.addEventListener("input", () => {
    result.textContent = daysLeftText(input.value);
  });
  document.getElementById("today").textContent = "النهارده في القاهرة: " + longDate.format(new Date());
</script>
</body>
</html>
~~~

## هتشوف إيه

خانة تاريخ، وتحتها جملة واحدة كبيرة: «فاضل 34 يوم» أو «من 20 يوم» أو «النهارده!»، وتحتها تاريخ النهارده في القاهرة بالعربي. والخانة الفاضية بتكتب «اختار تاريخ» مش NaN.

## اتقاس (Chrome 158 بـ Playwright)

نادينا [[daysLeftText]] من الـ console بـ «دلوقتي» وهمي عشان نجرّب الساعات الحرجة:

~~~text الناتج
بكرة والساعة 11:59 بالليل في القاهرة: فاضل 1 يوم
بكرة والساعة 12:01 الصبح: فاضل 1 يوم
النهارده: النهارده!
بعد رجوع الساعة (من 20 أكتوبر لـ 5 نوفمبر): فاضل 16 يوم
فات: من 20 يوم
فاضي: اختار تاريخ
~~~

وفي الصفحة نفسها يوم ٢١ نوفمبر: كتبنا [[2026-12-25]] فطلع «فاضل 34 يوم»، ومسحنا الخانة فرجعت «اختار تاريخ».

## كل حتة مهمة بتعمل إيه

- **[[cairoDay.format(now)]]:** «النهارده كام في القاهرة» كنص [[YYYY-MM-DD]] بحيلة [["en-CA"]]. مهما كان توقيت جهاز اليوزر، الحساب بأيام القاهرة زي ما المشروع طالب.
- **[[dayNumber(ymd)]]:** بيحوّل النص لرقم اليوم من 1970: [[Date.UTC(...) / 86400000]]. الاتنين نص ليل UTC، ومفيش توقيت صيفي في UTC، فالطرح بيدّي عدد صحيح دايمًا. ده سبب إن سطر «بعد رجوع الساعة» طلع 16 مش 16.04.
- **[[diff === 0]] و السالب والموجب:** تلات رسايل، و [[-diff]] عشان «من 20 يوم» من غير علامة سالب.
- **[[Number.isNaN(diff)]]:** لو النص مش تاريخ، الطرح بيدّي NaN، فبنكتب رسالة.
- **[[daysLeftText(target, now = new Date())]]:** [[now]] parameter بقيمة افتراضية، عشان نقدر نجرّب الساعة 11:59 بالليل من غير ما نستنى.
- **[[aria-live="polite"]]:** قارئ الشاشة بيقرا الجملة الجديدة لوحده لما تتغير.

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة:** [[Math.ceil((new Date(target) - Date.now()) / 86400000)]]. بكرة الساعة 11:59 بالليل كانت بتقول «فاضل 1 يوم» والساعة 12:01 الصبح بتقول «فاضل 2 يوم»، لأنها بتحسب ساعات مش أيام تقويم، و [[new Date("2026-11-22")]] أصلًا نص ليل UTC (٢ الصبح في القاهرة). الحل: نقارن **يوم** بـ **يوم**، الاتنين نصوص في نفس الـ zone.
- **[[input.value]] فاضي:** [[""]] و [[split]] بيدّوا [[NaN]]، فحطّينا [[if (!target)]] الأول.`  },
        { lvl: 'صغير', dir: "world-clock", t: R`ساعة عالمية`, what: R`٤ مدن (القاهرة والرياض ولندن ونيويورك) بالوقت الحالي، بتتحدث كل ثانية بـ setInterval، وكل واحدة بـ Intl.DateTimeFormat وجنبها الفرق عن UTC. من درس UTC و Intl.DateTimeFormat.`, done: R`الأوقات بتتغير كل ثانية، ولو غيّرت توقيت جهازك الأرقام مبتتغيرش (كل مدينة ليها timeZone)، والـ ٤ formatters متعمولين مرة واحدة بره الـ interval.`, sol: R`## الشكل النهائي

~~~live 230 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ساعة عالمية</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; }
  .clocks { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
  .clock { border: 1px solid #ccc; border-radius: 10px; padding: 10px 12px; }
  .city { font-weight: 700; }
  .time { font-size: 28px; font-variant-numeric: tabular-nums; direction: ltr; text-align: right; }
  .off { color: #555; font-size: 14px; direction: ltr; text-align: right; }
</style>
</head>
<body>
<div class="clocks" id="clocks"></div>
<script>
  const CITIES = [
    ["القاهرة", "Africa/Cairo"],
    ["الرياض", "Asia/Riyadh"],
    ["لندن", "Europe/London"],
    ["نيويورك", "America/New_York"],
  ];

  // كل حاجة غالية بتتعمل مرة واحدة هنا، برّه الـ interval
  const clocks = CITIES.map(([name, timeZone]) => {
    const box = document.createElement("div");
    box.className = "clock";
    const city = document.createElement("div");
    city.className = "city";
    city.textContent = name;
    const time = document.createElement("div");
    time.className = "time";
    const off = document.createElement("div");
    off.className = "off";
    box.append(city, time, off);
    document.getElementById("clocks").append(box);
    return {
      time, off,
      clock: new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      offset: new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" }),
    };
  });

  function utcOffset(formatter, date) {
    const part = formatter.formatToParts(date).find(p => p.type === "timeZoneName").value;
    return part === "GMT" ? "UTC" : part.replace("GMT", "UTC");
  }

  function tick() {
    const now = new Date();
    for (const c of clocks) {
      c.time.textContent = c.clock.format(now);
      c.off.textContent = utcOffset(c.offset, now);
    }
  }
  tick();
  setInterval(tick, 1000);
</script>
</body>
</html>
~~~

## هتشوف إيه

٤ كروت (بتنزل تحت بعض على الموبايل بـ [[auto-fit]])، في كل كارت اسم المدينة والساعة بالثواني والفرق عن UTC، والثواني بتعدّ.

## اتقاس (Chrome 158 بـ Playwright، ٢١ نوفمبر 2026)

لقطتين من نص الكروت بينهم ٢ ثانية:

~~~text الناتج
القاهرة 09:41:43 UTC+2 || الرياض 10:41:43 UTC+3 || لندن 07:41:43 UTC+0 || نيويورك 02:41:43 UTC-5
القاهرة 09:41:45 UTC+2 || الرياض 10:41:45 UTC+3 || لندن 07:41:45 UTC+0 || نيويورك 02:41:45 UTC-5
~~~

القاهرة +2 في نوفمبر (الصيفي خلص ٢٩ أكتوبر)، ولندن +0 (خلص عندهم ٢٥ أكتوبر)، ونيويورك −5 (من ١ نوفمبر). في سبتمبر الأرقام كانت هتبقى +3 و +1 و −4، من غير ما تغيّر سطر.

## كل حتة مهمة بتعمل إيه

- **[[CITIES.map(...)]] مرة واحدة:** بيعمل الكروت، ولكل مدينة formatter الساعة و formatter الفرق، ويرجّع object فيه العناصر والـ formatters. كل ده برّه [[setInterval]]، والـ [[tick]] بيعمل [[format]] و [[textContent]] بس.
- **[[timeZone]] في كل formatter:** الوقت بيتحسب لكل مدينة، فلو غيّرت توقيت جهازك من إعدادات Windows الأرقام مبتتغيرش.
- **[[timeZoneName: "shortOffset"]]:** بيطلّع جزء زي [[GMT+2]]. و [[formatToParts]] بيرجّع الناتج حتت متسمية ([[{ type: "timeZoneName", value: "GMT+2" }]])، فبناخد الحتة دي بس بـ [[find]]، ونبدّل GMT بـ UTC. ولندن في الشتا بتطلع [[GMT]] لوحدها، فبنكتبها [[UTC]].
- **[["en-GB"]] و [[hour: "2-digit"]]:** ٢٤ ساعة وأرقام بنفس العرض، و [[font-variant-numeric: tabular-nums]] بيخلي الأرقام متتهزّش وهي بتتغير.
- **[[tick()]] قبل [[setInterval]]:** عشان الكروت متبقاش فاضية أول ثانية.

## الغلطات اللي حصلت وإزاي اتصلحت

- **الساعة بالعربي اتقلبت:** [[direction: rtl]] بتاع الصفحة كان بيعرض [[09:41:43]] بشكل غريب جنب الأرقام. الحل [[direction: ltr]] على [[.time]] و [[.off]] مع [[text-align: right]].
- **حساب الفرق بإيدك:** أول فكرة كانت [[getTimezoneOffset()]]، وده بيدّي فرق **جهازك** بس، مش أي مدينة. [[shortOffset]] هو اللي بيدّي فرق المدينة.`  },
        { lvl: 'متوسط', dir: "comments-time-ago", t: R`تعليقات بـ «من ٥ دقايق»`, what: R`array تعليقات فيها [[createdAt]] ISO، بتتعرض بـ [[timeAgo]]، و [[title]] على كل وقت فيه التاريخ الكامل بـ Intl، والأوقات بتتحدث كل دقيقة من غير ما تعيد رسم التعليقات، واللي أقدم من أسبوع بيظهر التاريخ بدل «قبل ٣ أسابيع». من دروس الوحدة ووحدة الـ DOM.`, done: R`تعليق من 10 ثواني ← «الآن»، من 26 ساعة ← «أمس»، من 10 أيام ← تاريخ. الـ hover بيدّي الوقت الكامل بتوقيت القاهرة. وبعد دقيقة النص بيتغير لوحده، والـ input اللي في التعليق (لو فيه) مبيفقدش الـ focus لأنك مبتعيدش رسم العنصر.`, sol: R`## الشكل النهائي

~~~live 380 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>التعليقات</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 520px; }
  .comment { border-bottom: 1px solid #ddd; padding: 8px 0; }
  .who { font-weight: 700; }
  time { color: #666; font-size: 14px; margin-inline-start: 6px; cursor: help; }
  input { font: inherit; width: 100%; box-sizing: border-box; margin-top: 6px; padding: 4px 6px; }
</style>
</head>
<body>
<div id="comments"></div>
<script>
  const ZONE = "Africa/Cairo";
  const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
  const fullDate = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full", timeStyle: "short", timeZone: ZONE });
  const shortDate = new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long", year: "numeric", timeZone: ZONE });
  const UNITS = [["day", 86400], ["hour", 3600], ["minute", 60]];

  function timeAgo(date, now = Date.now()) {
    const sec = Math.round((date - now) / 1000);
    if (sec < -7 * 86400) return shortDate.format(date);
    if (Math.abs(sec) < 45) return rtf.format(0, "second");
    for (const [unit, size] of UNITS) {
      if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
    }
    return rtf.format(sec, "second");
  }

  const now = Date.now();
  const comments = [
    { who: "سلمى", text: "الشرح ده نفعني جدًا", createdAt: new Date(now - 10e3).toISOString() },
    { who: "كريم", text: "فيه مثال تاني؟", createdAt: new Date(now - 5 * 60e3).toISOString() },
    { who: "ندى", text: "جربته واشتغل", createdAt: new Date(now - 26 * 3600e3).toISOString() },
    { who: "يوسف", text: "أول تعليق", createdAt: new Date(now - 10 * 86400e3).toISOString() },
  ];

  // الرسم مرة واحدة بس
  const box = document.getElementById("comments");
  for (const c of comments) {
    const div = document.createElement("div");
    div.className = "comment";
    const who = document.createElement("span");
    who.className = "who";
    who.textContent = c.who;
    const time = document.createElement("time");
    time.dateTime = c.createdAt;
    time.title = fullDate.format(new Date(c.createdAt));
    const text = document.createElement("p");
    text.textContent = c.text;
    const reply = document.createElement("input");
    reply.placeholder = "اكتب رد...";
    reply.setAttribute("aria-label", "رد على " + c.who);
    div.append(who, time, text, reply);
    box.append(div);
  }

  // التحديث: النص اللي جوه time بس
  function refreshTimes() {
    for (const el of box.querySelectorAll("time")) {
      el.textContent = timeAgo(new Date(el.dateTime));
    }
  }
  refreshTimes();
  setInterval(refreshTimes, 60000);
</script>
</body>
</html>
~~~

## هتشوف إيه

٤ تعليقات: «الآن» و «قبل 5 دقائق» و «أمس» وتاريخ (١١ نوفمبر) للي عدّى عليه ١٠ أيام. وقف بالماوس على أي وقت يظهر التاريخ الكامل بتوقيت القاهرة. وكل تعليق تحته خانة رد.

## اتقاس (Chrome 158 بـ Playwright، ٢١ نوفمبر 2026)

~~~text الناتج: النص و title بتاع كل time
سلمى · الآن · title=السبت، ٢١ نوفمبر ٢٠٢٦ في ٩:٤١ ص
كريم · قبل 5 دقائق · title=السبت، ٢١ نوفمبر ٢٠٢٦ في ٩:٣٦ ص
ندى · أمس · title=الجمعة، ٢٠ نوفمبر ٢٠٢٦ في ٧:٤١ ص
يوسف · ١١ نوفمبر ٢٠٢٦ · title=الأربعاء، ١١ نوفمبر ٢٠٢٦ في ٩:٤١ ص
~~~

وبعدين كتبنا «شكرًا» في أول خانة رد، وقدّمنا الساعة ٦١ ثانية ([[Date.now]] وهمي) ونادينا [[refreshTimes()]]:

~~~text الناتج بعد دقيقة
قبل دقيقة واحدة | focus: INPUT value=شكرًا
~~~

النص اتغيّر، والكتابة في الخانة فضلت والـ focus فضل فيها.

## كل حتة مهمة بتعمل إيه

- **الرسم مرة واحدة:** الـ loop الأول بيعمل العناصر بـ [[createElement]] و [[textContent]] (نص اليوزر عمره ما بيتفهم HTML)، وبيحط [[time.dateTime]] (ISO) و [[time.title]] (التاريخ الكامل) مرة واحدة.
- **[[refreshTimes]]:** بتلف على عناصر [[time]] الموجودة وتغيّر [[textContent]] بس. مفيش [[innerHTML]] للقايمة كلها، فالـ input مبيتشالش ويترسم تاني، وعشان كده الكتابة والـ focus مبيضيعوش.
- **[[timeAgo]]:** ٣ قواعد بالترتيب: أقدم من أسبوع ← التاريخ بـ [[shortDate]]. أقل من ٤٥ ثانية ← [[rtf.format(0, "second")]] = «الآن». غير كده أكبر وحدة (يوم، ساعة، دقيقة). و ٢٦ ساعة = [[Math.round(26 / 24)]] = 1 يوم = «أمس» بفضل [[numeric: "auto"]].
- **[[setInterval(refreshTimes, 60000)]]:** كل دقيقة. أقل من كده مالوش لازمة لأن أصغر وحدة بنعرضها دقيقة.

## الغلطات اللي حصلت وإزاي اتصلحت

- **أول نسخة كانت [[render()]] واحدة بتعمل [[box.innerHTML = ...]] كل دقيقة.** كتبنا في خانة الرد واستنينا: الكلام اتمسح والـ focus راح، لأن العناصر اتشالت واتعملت جديدة. الحل: نفصل «ارسم» (مرة) عن «حدّث» (كل دقيقة).
- **[[title]] بتوقيت الجهاز:** من غير [[timeZone: ZONE]] في [[fullDate]]، اليوزر برّه مصر كان هيشوف توقيته هو. المشروع طالب القاهرة، فالـ zone متكتب صريح.`  },
        { lvl: 'متوسط', dir: "cross-border-booking", t: R`حجز مواعيد بين بلدين`, what: R`فورم بتختار فيه يوم وساعة بتوقيت القاهرة، والكود بيحوّلهم لـ UTC ISO للتخزين بـ [[Temporal.ZonedDateTime]]، ويعرض الميعاد لليوزر بتوقيته ([[resolvedOptions().timeZone]]) ولزميل في لندن. من دروس الوحدة.`, done: R`[[2026-10-15 10:00]] في القاهرة ← [[2026-10-15T07:00:00Z]]، و [[2026-11-15 10:00]] ← [[2026-11-15T08:00:00Z]] (بعد ما الصيفي خلص)، ولندن بتشوف 08:00 في الحالتين. وساعة مش موجودة أو يوم غلط بيطلع رسالة تحت الحقل.`, sol: R`## الشكل النهائي

~~~live 300 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>حجز ميعاد</title>
<style>
  body { font: 16px/1.6 system-ui, sans-serif; margin: 16px; max-width: 440px; }
  label { display: block; font-weight: 600; margin-top: 10px; }
  input, button { font: inherit; padding: 5px 8px; }
  .err { color: #b91c1c; min-height: 1.4em; margin: 2px 0; font-size: 14px; }
  dl { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; }
  dt { color: #555; }
  dd { margin: 0; direction: ltr; text-align: right; }
</style>
</head>
<body>
<form id="book" novalidate>
  <label for="day">اليوم (بتوقيت القاهرة)</label>
  <input type="date" id="day" required>
  <label for="time">الساعة</label>
  <input type="time" id="time" required>
  <p class="err" id="err" aria-live="polite"></p>
  <button>احجز</button>
</form>
<dl id="out" hidden>
  <dt>يتخزّن (UTC)</dt><dd id="utc"></dd>
  <dt id="mine-label">عندك</dt><dd id="mine"></dd>
  <dt>زميلك في لندن</dt><dd id="london"></dd>
</dl>
<script>
  const ZONE = "Africa/Cairo";

  // يوم وساعة على الحيطة في القاهرة -> لحظة UTC، أو error برسالة عربي
  function cairoToUtc(day, time) {
    if (!day || !time) throw new Error("اختار اليوم والساعة");
    let local;
    try {
      local = Temporal.PlainDateTime.from(day + "T" + time);
    } catch {
      throw new Error("اليوم أو الساعة مش مفهومين");
    }
    try {
      return local.toZonedDateTime(ZONE, { disambiguation: "reject" }).toInstant();
    } catch {
      throw new Error("الساعة دي مش موجودة في القاهرة اليوم ده (الساعة اتقدّمت)");
    }
  }

  function show(instant, zone) {
    return instant.toZonedDateTimeISO(zone).toPlainDateTime().toString().replace("T", " ").slice(0, 16);
  }

  const err = document.getElementById("err");
  const out = document.getElementById("out");
  if (!globalThis.Temporal) {
    err.textContent = "متصفحك لسه مفيهوش Temporal: جرّب Chrome أو Firefox حديث، أو زوّد polyfill.";
  }
  document.getElementById("book").addEventListener("submit", e => {
    e.preventDefault();
    try {
      const instant = cairoToUtc(document.getElementById("day").value, document.getElementById("time").value);
      const myZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      document.getElementById("utc").textContent = instant.toString();
      document.getElementById("mine-label").textContent = "عندك (" + myZone + ")";
      document.getElementById("mine").textContent = show(instant, myZone);
      document.getElementById("london").textContent = show(instant, "Europe/London");
      err.textContent = "";
      out.hidden = false;
    } catch (error) {
      err.textContent = error.message;
      out.hidden = true;
    }
  });
</script>
</body>
</html>
~~~

الصفحة بتستخدم [[Temporal]] اللي جوه المتصفح (Chrome و Edge من 144، و Firefox من 139). في متصفح لسه مفيهوش، بتكتب رسالة بدل ما تقع.

## هتشوف إيه

خانة يوم وخانة ساعة وزرار. بعد «احجز» بيظهر جدول صغير: اللحظة اللي هتتخزّن بـ UTC، والميعاد بتوقيتك (واسم الـ zone بتاعك)، والميعاد عند زميل في لندن. والساعة اللي مش موجودة بتطلع رسالة حمرا تحت.

## اتقاس (Chrome 158 بـ Playwright، الجهاز على توقيت القاهرة)

~~~text الناتج
يتخزّن (UTC): 2026-10-15T07:00:00Z | عندك (Africa/Cairo): 2026-10-15 10:00 | زميلك في لندن: 2026-10-15 08:00
يتخزّن (UTC): 2026-11-15T08:00:00Z | عندك (Africa/Cairo): 2026-11-15 10:00 | زميلك في لندن: 2026-11-15 08:00
غلط: الساعة دي مش موجودة في القاهرة اليوم ده (الساعة اتقدّمت)
~~~

والزرار والخانة فاضية: «اختار اليوم والساعة».

نفس الدالة في Node بالـ polyfill، ومعاها يوم مش موجود وخانة فاضية:

~~~js booking.mjs
import { Temporal } from "@js-temporal/polyfill";

const ZONE = "Africa/Cairo";

function cairoToUtc(day, time) {
  if (!day || !time) throw new Error("اختار اليوم والساعة");
  let local;
  try {
    local = Temporal.PlainDateTime.from(day + "T" + time);
  } catch {
    throw new Error("اليوم أو الساعة مش مفهومين");
  }
  try {
    return local.toZonedDateTime(ZONE, { disambiguation: "reject" }).toInstant();
  } catch {
    throw new Error("الساعة دي مش موجودة في القاهرة اليوم ده (الساعة اتقدّمت)");
  }
}

const show = (instant, zone) => instant.toZonedDateTimeISO(zone).toPlainDateTime().toString().replace("T", " ").slice(0, 16);

for (const [day, time] of [["2026-10-15", "10:00"], ["2026-11-15", "10:00"], ["2026-04-24", "00:30"], ["2026-02-30", "10:00"], ["", "10:00"]]) {
  try {
    const i = cairoToUtc(day, time);
    console.log(day, time, "→", i.toString(), "| لندن:", show(i, "Europe/London"), "| نيويورك:", show(i, "America/New_York"));
  } catch (err) {
    console.log(day || '""', time, "→ غلط:", err.message);
  }
}
~~~

~~~text الناتج (node booking.mjs، Node 24، @js-temporal/polyfill 0.5.1)
2026-10-15 10:00 → 2026-10-15T07:00:00Z | لندن: 2026-10-15 08:00 | نيويورك: 2026-10-15 03:00
2026-11-15 10:00 → 2026-11-15T08:00:00Z | لندن: 2026-11-15 08:00 | نيويورك: 2026-11-15 03:00
2026-04-24 00:30 → غلط: الساعة دي مش موجودة في القاهرة اليوم ده (الساعة اتقدّمت)
2026-02-30 10:00 → غلط: اليوم أو الساعة مش مفهومين
"" 10:00 → غلط: اختار اليوم والساعة
~~~

## كل حتة مهمة بتعمل إيه

- **[[Temporal.PlainDateTime.from(day + "T" + time)]]:** «يوم وساعة على الحيطة» من غير zone. ولو النص مش تاريخ حقيقي ([["2026-02-30"]]) بيرمي، ومش بيرحّل زي Date.
- **[[toZonedDateTime(ZONE, { disambiguation: "reject" })]]:** بيقول «الساعة دي في القاهرة». يوم ٢٤ أبريل 2026 الساعة بتنط من 12:00 لـ 1:00 بالليل، فـ 00:30 مش موجودة. الافتراضي ([["compatible"]]) كان هيزحلقها لـ 1:30 من غير ما يقول، و [["reject"]] بيرمي فنكتب رسالة.
- **[[toInstant()]]:** اللحظة نفسها، و [[toString()]] بتاعها ISO بـ [[Z]]: ده اللي يتخزّن. أكتوبر +3 فطلعت [[07:00Z]]، ونوفمبر +2 فطلعت [[08:00Z]].
- **[[show(instant, zone)]]:** اللحظة في أي zone كنص [[YYYY-MM-DD HH:MM]]. لندن شافت 08:00 في الحالتين لأنها هي كمان غيّرت ساعتها بين أكتوبر ونوفمبر.
- **[[Intl.DateTimeFormat().resolvedOptions().timeZone]]:** zone اليوزر نفسه.
- **try حوالين كل خطوة:** كل error من Temporal بيتحوّل لرسالة عربي بتقول المشكلة فين، والـ [[catch]] بتاع الـ submit بيعرضها ويخبّي الجدول.

## الغلطات اللي حصلت وإزاي اتصلحت

- **من غير [[disambiguation: "reject"]]:** 00:30 يوم ٢٤ أبريل اتحجزت عادي على إنها [[2026-04-23T22:30:00Z]]، يعني 1:30 مش 00:30. اليوزر كان هيجي في ميعاد غير اللي اختاره.
- **Node 24 مفيهوش Temporal:** أول تشغيل لـ [[booking.mjs]] من غير import رمى [[ReferenceError: Temporal is not defined]]، فالـ import من [[@js-temporal/polyfill]] (وفي المتصفح [[globalThis.Temporal]] بيتفحص الأول).`  },
        { lvl: 'كبير', t: R`مواعيد تجديد الاشتراكات`, what: R`[[renewals(startDate, count, plan)]] بتطلع مواعيد التجديد الجاية لاشتراك [[monthly]] أو [[yearly]]. كل تجديد محسوب من تاريخ البداية الأصلي (مش من اللي قبله)، ولو اليوم مش موجود يقف على آخر الشهر. الـ input بيتفحص (تاريخ سليم بـ parseISODate، و count من 1 لـ 120، و plan من الاتنين دول بس) بـ ValidationError، والتواريخ بتتعرض بالعربي، وفيه [[test.js]] بحالات معروفة. من الوحدة دي ووحدات الأخطاء والـ modules.`, done: R`من [[2026-01-31]] شهري ← [[2026-02-28]] و [[2026-03-31]] و [[2026-04-30]] (مش 28 و 28 و 28). من [[2028-02-29]] سنوي ← [[2029-02-28]] و [[2030-02-28]] و [[2031-02-28]] و [[2032-02-29]]. و [["2026-02-30"]] ← ValidationError مش تاريخ في مارس. والاختبارات كلها بتنجح بـ [[TZ]] القاهرة ونيويورك.`, ext: R`زوّد خطة [[weekly]] وفترة تجربة مجانية بالأيام، واطلع ملف [[.ics]] بالمواعيد يتفتح في Google Calendar.`, sol: R`## الشكل النهائي

~~~text الناتج (node main.js، TZ=Africa/Cairo)
TZ = Africa/Cairo
2026-01-31 monthly → 2026-02-28  2026-03-31  2026-04-30
    ٢٨ فبراير ٢٠٢٦ · ٣١ مارس ٢٠٢٦ · ٣٠ أبريل ٢٠٢٦
2028-02-29 yearly → 2029-02-28  2030-02-28  2031-02-28  2032-02-29
    ٢٨ فبراير ٢٠٢٩ · ٢٨ فبراير ٢٠٣٠ · ٢٨ فبراير ٢٠٣١ · ٢٩ فبراير ٢٠٣٢
2026-02-30 monthly → ValidationError [startDate]: تاريخ البداية لازم يبقى YYYY-MM-DD وتاريخ موجود فعلًا
2026-01-15 monthly → ValidationError [count]: عدد التجديدات من 1 لـ 120
2026-01-15 weekly → ValidationError [plan]: الخطة monthly أو yearly بس
~~~

ونفس الملف بـ [[TZ=America/New_York]]: نفس التواريخ بالظبط، أول سطر بس اتغيّر:

~~~text الناتج (node main.js، TZ=America/New_York)
TZ = America/New_York
2026-01-31 monthly → 2026-02-28  2026-03-31  2026-04-30
    ٢٨ فبراير ٢٠٢٦ · ٣١ مارس ٢٠٢٦ · ٣٠ أبريل ٢٠٢٦
2028-02-29 yearly → 2029-02-28  2030-02-28  2031-02-28  2032-02-29
    ٢٨ فبراير ٢٠٢٩ · ٢٨ فبراير ٢٠٣٠ · ٢٨ فبراير ٢٠٣١ · ٢٩ فبراير ٢٠٣٢
2026-02-30 monthly → ValidationError [startDate]: تاريخ البداية لازم يبقى YYYY-MM-DD وتاريخ موجود فعلًا
2026-01-15 monthly → ValidationError [count]: عدد التجديدات من 1 لـ 120
2026-01-15 weekly → ValidationError [plan]: الخطة monthly أو yearly بس
~~~

## الملفات وترتيب البناء

~~~text الشجرة
renewals/
├── package.json    "type": "module" و npm test
├── errors.js       ValidationError فيه field
├── dates.js        parseISODate و addMonthsClamped (كله UTC)
├── renewals.js     renewals() و formatArabic()
├── main.js         تشغيل بأمثلة
└── test.js         7 اختبارات بـ node:test
~~~

اتبنى بالترتيب ده: [[errors.js]]، وبعدين [[dates.js]] (أصغر حاجة ممكن تتجرّب لوحدها)، وبعدين [[renewals.js]] فوقها، وفي الآخر الاختبارات والتشغيل.

~~~json package.json
{
  "name": "renewals",
  "type": "module",
  "scripts": {
    "test": "node --test"
  }
}
~~~

~~~js errors.js
export class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
~~~

~~~js dates.js
// كل التواريخ هنا Date على نص الليل UTC، وكل القراية بـ getUTC
// عشان النتيجة متتغيرش مع توقيت الجهاز

const isDigits = s => s.length > 0 && [...s].every(c => c >= "0" && c <= "9");

export function parseISODate(s) {
  if (typeof s !== "string") return null;
  const parts = s.split("-");
  if (parts.length !== 3) return null;
  const [ys, ms, ds] = parts;
  if (ys.length !== 4 || ms.length !== 2 || ds.length !== 2 || !parts.every(isDigits)) return null;
  const [y, m, d] = parts.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return date;
}

export const daysInMonth = (year, monthIndex) => new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

// تاريخ البداية + n شهر، ولو اليوم مش موجود يقف على آخر الشهر
export function addMonthsClamped(start, n) {
  const total = start.getUTCMonth() + n;
  const year = start.getUTCFullYear() + Math.floor(total / 12);
  const month = ((total % 12) + 12) % 12;
  const day = Math.min(start.getUTCDate(), daysInMonth(year, month));
  return new Date(Date.UTC(year, month, day));
}

export const toISODate = d => d.toISOString().slice(0, 10);
~~~

~~~js renewals.js
import { ValidationError } from "./errors.js";
import { parseISODate, addMonthsClamped, toISODate } from "./dates.js";

const STEP = { monthly: 1, yearly: 12 };

export function renewals(startDate, count, plan) {
  const start = parseISODate(startDate);
  if (!start) throw new ValidationError("startDate", "تاريخ البداية لازم يبقى YYYY-MM-DD وتاريخ موجود فعلًا");
  if (!Number.isInteger(count) || count < 1 || count > 120) throw new ValidationError("count", "عدد التجديدات من 1 لـ 120");
  if (!Object.hasOwn(STEP, plan)) throw new ValidationError("plan", "الخطة monthly أو yearly بس");
  const out = [];
  for (let i = 1; i <= count; i++) {
    // كل مرة من تاريخ البداية الأصلي، مش من التجديد اللي قبله
    out.push(toISODate(addMonthsClamped(start, i * STEP[plan])));
  }
  return out;
}

const arabic = new Intl.DateTimeFormat("ar-EG", { dateStyle: "long", timeZone: "UTC" });
export const formatArabic = iso => arabic.format(parseISODate(iso));
~~~

~~~js main.js
import { renewals, formatArabic } from "./renewals.js";
import { ValidationError } from "./errors.js";

function show(start, count, plan) {
  try {
    const list = renewals(start, count, plan);
    console.log(start, plan, "→", list.join("  "));
    console.log("   ", list.map(formatArabic).join(" · "));
  } catch (err) {
    if (!(err instanceof ValidationError)) throw err;
    console.log(start, plan, "→", err.name + " [" + err.field + "]: " + err.message);
  }
}

console.log("TZ =", Intl.DateTimeFormat().resolvedOptions().timeZone);
show("2026-01-31", 3, "monthly");
show("2028-02-29", 4, "yearly");
show("2026-02-30", 3, "monthly");
show("2026-01-15", 0, "monthly");
show("2026-01-15", 2, "weekly");
~~~

~~~js test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { renewals } from "./renewals.js";
import { parseISODate, addMonthsClamped, toISODate } from "./dates.js";
import { ValidationError } from "./errors.js";

test("شهري من 31 يناير: آخر كل شهر، مش 28 على طول", () => {
  assert.deepEqual(renewals("2026-01-31", 3, "monthly"), ["2026-02-28", "2026-03-31", "2026-04-30"]);
});

test("سنوي من 29 فبراير: 28 في السنين العادية و 29 في الكبيسة", () => {
  assert.deepEqual(renewals("2028-02-29", 4, "yearly"), ["2029-02-28", "2030-02-28", "2031-02-28", "2032-02-29"]);
});

test("بيعدّي السنة: 30 نوفمبر شهري", () => {
  assert.deepEqual(renewals("2026-11-30", 4, "monthly"), ["2026-12-30", "2027-01-30", "2027-02-28", "2027-03-30"]);
});

test("120 تجديد شهري: آخر واحد بعد 10 سنين بالظبط", () => {
  const list = renewals("2026-01-31", 120, "monthly");
  assert.equal(list.length, 120);
  assert.equal(list.at(-1), "2036-01-31");
});

test("تاريخ مش موجود بيترفض بدل ما يترحّل", () => {
  assert.equal(parseISODate("2026-02-30"), null);
  assert.throws(() => renewals("2026-02-30", 3, "monthly"), e => e instanceof ValidationError && e.field === "startDate");
});

test("count و plan بيتفحصوا", () => {
  for (const bad of [0, 121, 2.5, "3"]) {
    assert.throws(() => renewals("2026-01-15", bad, "monthly"), e => e.field === "count");
  }
  assert.throws(() => renewals("2026-01-15", 2, "weekly"), e => e.field === "plan");
  assert.throws(() => renewals("2026-01-15", 2, "toString"), e => e.field === "plan");
});

test("addMonthsClamped مش بيعدّل الأصل وبيقبل سالب", () => {
  const start = parseISODate("2026-03-31");
  assert.equal(toISODate(addMonthsClamped(start, -1)), "2026-02-28");
  assert.equal(toISODate(start), "2026-03-31");
});
~~~

## الاختبارات بتوقيتين

في PowerShell: [[$env:TZ = "Africa/Cairo"; npm test]] وبعدين [[$env:TZ = "America/New_York"; npm test]].

~~~text الناتج (node --test، TZ=Africa/Cairo)
✔ شهري من 31 يناير: آخر كل شهر، مش 28 على طول (1.5273ms)
✔ سنوي من 29 فبراير: 28 في السنين العادية و 29 في الكبيسة (0.1473ms)
✔ بيعدّي السنة: 30 نوفمبر شهري (0.1818ms)
✔ 120 تجديد شهري: آخر واحد بعد 10 سنين بالظبط (0.3371ms)
✔ تاريخ مش موجود بيترفض بدل ما يترحّل (0.4118ms)
✔ count و plan بيتفحصوا (0.275ms)
✔ addMonthsClamped مش بيعدّل الأصل وبيقبل سالب (0.1251ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 97.0461
~~~

~~~text الناتج (node --test، TZ=America/New_York)
✔ شهري من 31 يناير: آخر كل شهر، مش 28 على طول (1.4618ms)
✔ سنوي من 29 فبراير: 28 في السنين العادية و 29 في الكبيسة (0.1561ms)
✔ بيعدّي السنة: 30 نوفمبر شهري (0.1478ms)
✔ 120 تجديد شهري: آخر واحد بعد 10 سنين بالظبط (0.3307ms)
✔ تاريخ مش موجود بيترفض بدل ما يترحّل (0.4031ms)
✔ count و plan بيتفحصوا (0.2969ms)
✔ addMonthsClamped مش بيعدّل الأصل وبيقبل سالب (0.123ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 97.2365
~~~

## كل حتة مهمة بتعمل إيه

- **كل التواريخ نص ليل UTC وكل القراية بـ [[getUTC...]]:** تاريخ التجديد «يوم»، مش لحظة، فمش لازم يتأثر بتوقيت الجهاز. ده اللي خلّى الناتج واحد في القاهرة ونيويورك.
- **[[addMonthsClamped(start, n)]]:** [[total]] = رقم الشهر الجديد من غير حدود (ممكن 13 أو سالب). [[Math.floor(total / 12)]] بيزوّد السنين، و [[((total % 12) + 12) % 12]] بيرجّع الشهر بين 0 و 11 حتى لو سالب (في JS، [[-1 % 12]] بـ -1 مش 11). و [[Math.min]] مع [[daysInMonth]] بيوقف على آخر الشهر.
- **[[daysInMonth]]:** اليوم 0 من الشهر اللي بعده = آخر يوم في الشهر ده.
- **[[i * STEP[plan]]] من [[start]] الأصلي:** التجديد التالت = البداية + ٣ شهور، مش «التاني + شهر». ده الفرق بين ٣١ مارس و ٢٨ مارس.
- **[[Object.hasOwn(STEP, plan)]]:** الخطة لازم تبقى مفتاح في الـ object نفسه.
- **[[ValidationError]] فيه [[field]]:** الـ caller يعرف أنهي حقل غلط، و [[main.js]] بيمسك النوع ده بس وأي error تاني بيعدّي.
- **[[formatArabic]] بـ [[timeZone: "UTC"]]:** التاريخ مخزّن نص ليل UTC، فلازم يتعرض بـ UTC. من غيرها، جهاز في نيويورك كان هيعرض اليوم اللي قبله.

## الغلطات اللي حصلت وإزاي اتصلحت

أول نسخة كانت بتحسب كل تجديد من اللي قبله، بـ Date محلي ([[getDate]] و [[setMonth]]):

~~~js first-try.js
// أول محاولة: كل تجديد من اللي قبله، و Date محلي
function addMonthClamped(d) {
  const next = new Date(d);
  const day = next.getDate();
  next.setDate(1);
  next.setMonth(next.getMonth() + 1);
  const last = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(day, last));
  return next;
}

let d = new Date("2026-01-31");
const out = [];
for (let i = 0; i < 3; i++) {
  d = addMonthClamped(d);
  out.push(d.toISOString().slice(0, 10));
}
console.log("TZ =", Intl.DateTimeFormat().resolvedOptions().timeZone, "→", out.join(" "));

const STEP = { monthly: 1, yearly: 12 };
console.log('"toString" in STEP:', "toString" in STEP, "| Object.hasOwn:", Object.hasOwn(STEP, "toString"));
~~~

~~~text الناتج (مرة بالقاهرة ومرة بنيويورك)
TZ = Africa/Cairo → 2026-02-28 2026-03-28 2026-04-27
"toString" in STEP: true | Object.hasOwn: false
TZ = America/New_York → 2026-03-01 2026-03-28 2026-04-28
"toString" in STEP: true | Object.hasOwn: false
~~~

تلات باجات في ٣ سطور:

1. **28 و 28 و 27 بدل 28 و 31 و 30:** أول ما وقفنا على ٢٨ فبراير، كل اللي بعده بقى من ٢٨. الحل: كل تجديد من تاريخ البداية الأصلي.
2. **[[2026-04-27]] في القاهرة:** [[new Date("2026-01-31")]] نص ليل UTC، وبعد ما اتعدّل بـ setters محلية بقى نص ليل القاهرة، و [[toISOString]] بعد ٢٤ أبريل (الصيفي، +3) بيطلع ٩ بالليل اليوم اللي قبله. و **[[2026-03-01]] في نيويورك:** النص اتقري ٧ بالليل ٣٠ يناير هناك. الحل: [[Date.UTC]] و [[getUTC]] في كل حتة.
3. **[["toString" in STEP]] بـ true:** [[in]] بيدوّر في الـ prototype كمان، فـ [[plan = "toString"]] كان هيعدّي الفحص و [[STEP[plan]]] يبقى function. الحل [[Object.hasOwn]]، وعليه اختبار.`  },
        { lvl: 'فكرة', t: R`أداة وقت لشغلك`, what: R`فكّر في حاجة وقتها بيلخبطك: ميعاد اجتماع مع ناس في بلاد تانية، أو حساب ساعات شغل، أو تذكير دفع شهري، أو جدول مذاكرة. ابنيها.`, done: R`الأداة بتخزن UTC وبتعرض بتوقيت اليوزر، ومفيش [[new Date("01/02/2026")]] في الكود، وفيها اختبار لليوم اللي فيه تغيير التوقيت.`, ext: R`خليها تشتغل بلغتين ([["ar-EG"]] و [["en"]]) بزرار، وكل التواريخ والأرقام بتتغير بالـ locale.`, sol: R`## نسخة نموذجية: منظّم اجتماعات لفريق في ٤ بلاد

الفكرة اللي اخترناها: الاجتماع الأسبوعي بتاع فريق في القاهرة ولندن ونيويورك والرياض. المنظّم بيكتبه بساعته («الخميس ٣ العصر»)، والأداة بتخزّنه UTC، وبتوري كل واحد الميعاد بتوقيته، وبتعلّم اللي برّه ساعات شغله، وبتعرف إن الأسابيع اللي فيها تغيير ساعة بتغيّر كل حاجة.

## الشكل النهائي

~~~text الناتج (node main.js، Node 24)
يتخزّن: {"title":"اجتماع الفريق","startUtc":"2026-10-22T12:00:00Z","minutes":30,"zone":"Africa/Cairo"}
في القاهرة بالعربي: ٢٢‏/١٠‏/٢٠٢٦، ٣:٠٠ م

2026-10-22T12:00:00Z
  Africa/Cairo      2026-10-22 15:00 +03:00
  Europe/London     2026-10-22 13:00 +01:00
  America/New_York  2026-10-22 08:00 -04:00  ← برّه ساعات الشغل
  Asia/Riyadh       2026-10-22 15:00 +03:00

2026-10-29T12:00:00Z
  Africa/Cairo      2026-10-29 15:00 +03:00
  Europe/London     2026-10-29 12:00 +00:00
  America/New_York  2026-10-29 08:00 -04:00  ← برّه ساعات الشغل
  Asia/Riyadh       2026-10-29 15:00 +03:00

2026-11-05T13:00:00Z
  Africa/Cairo      2026-11-05 15:00 +02:00
  Europe/London     2026-11-05 13:00 +00:00
  America/New_York  2026-11-05 08:00 -05:00  ← برّه ساعات الشغل
  Asia/Riyadh       2026-11-05 16:00 +03:00
~~~

بص على العمود ده: القاهرة فضلت 15:00 في التلات أسابيع (ده المطلوب)، و UTC اتغيّر من [[12:00Z]] لـ [[13:00Z]] بعد ٢٩ أكتوبر، ولندن نزلت من 13:00 لـ 12:00 في الأسبوع التاني (غيّرت ساعتها ٢٥ أكتوبر قبلنا) ورجعت 13:00، والرياض (مفيهاش توقيت صيفي) طلعت 16:00 في الآخر.

## الملفات

~~~json package.json
{
  "name": "meeting-planner",
  "type": "module",
  "scripts": {
    "test": "node --test"
  },
  "dependencies": {
    "@js-temporal/polyfill": "^0.5.1"
  }
}
~~~

~~~js planner.js
import { Temporal } from "@js-temporal/polyfill";

const WORK_START = 9;
const WORK_END = 17;

// الاجتماع بيتكتب بساعة على الحيطة في zone المنظّم، ويتخزّن لحظة UTC
export function createMeeting({ title, date, time, zone, minutes }) {
  const start = Temporal.PlainDateTime.from(date + "T" + time).toZonedDateTime(zone, { disambiguation: "reject" });
  return { title, startUtc: start.toInstant().toString(), minutes, zone };
}

// اجتماع أسبوعي: نفس الساعة على الحيطة عند المنظّم كل أسبوع (days، مش hours)
export function weekly(meeting, count) {
  const first = Temporal.Instant.from(meeting.startUtc).toZonedDateTimeISO(meeting.zone);
  return Array.from({ length: count }, (_, i) => ({ ...meeting, startUtc: first.add({ weeks: i }).toInstant().toString() }));
}

// كل حاضر بيشوف الميعاد بتوقيته، ومعلّم لو برّه ساعات شغله
export function forAttendee(meeting, zone) {
  const start = Temporal.Instant.from(meeting.startUtc).toZonedDateTimeISO(zone);
  const end = start.add({ minutes: meeting.minutes });
  const endHour = end.hour + end.minute / 60;
  const inHours = start.hour >= WORK_START && endHour <= WORK_END && start.toPlainDate().equals(end.toPlainDate());
  return {
    zone,
    local: start.toPlainDateTime().toString().replace("T", " ").slice(0, 16),
    offset: start.offset,
    inHours,
  };
}
~~~

~~~js main.js
import { createMeeting, weekly, forAttendee } from "./planner.js";

const TEAM = ["Africa/Cairo", "Europe/London", "America/New_York", "Asia/Riyadh"];
const fmt = new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Cairo" });

const standup = createMeeting({ title: "اجتماع الفريق", date: "2026-10-22", time: "15:00", zone: "Africa/Cairo", minutes: 30 });
console.log("يتخزّن:", JSON.stringify(standup));
console.log("في القاهرة بالعربي:", fmt.format(new Date(standup.startUtc)));

for (const m of weekly(standup, 3)) {
  console.log("\n" + m.startUtc);
  for (const zone of TEAM) {
    const a = forAttendee(m, zone);
    console.log(" ", zone.padEnd(17), a.local, a.offset + (a.inHours ? "" : "  ← برّه ساعات الشغل"));
  }
}
~~~

~~~js test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { createMeeting, weekly, forAttendee } from "./planner.js";

const m = createMeeting({ title: "t", date: "2026-10-22", time: "15:00", zone: "Africa/Cairo", minutes: 30 });

test("بيتخزّن UTC", () => {
  assert.equal(m.startUtc, "2026-10-22T12:00:00Z");
});

test("الأسبوعي بيفضل 15:00 في القاهرة بعد رجوع الساعة (29 أكتوبر)", () => {
  const [, second] = weekly(m, 2);
  assert.equal(second.startUtc, "2026-10-29T12:00:00Z");
  const [, , third] = weekly(m, 3);
  assert.equal(third.startUtc, "2026-11-05T13:00:00Z");
  assert.equal(forAttendee(third, "Africa/Cairo").local, "2026-11-05 15:00");
});

test("نيويورك فضلت 08:00: البلدين غيّروا الساعة في نفس الأسبوعين", () => {
  const list = weekly(m, 3).map(x => forAttendee(x, "America/New_York").local.slice(11));
  assert.deepEqual(list, ["08:00", "08:00", "08:00"]);
});

test("ساعة مش موجودة في القاهرة بترمي", () => {
  assert.throws(() => createMeeting({ title: "t", date: "2026-04-24", time: "00:30", zone: "Africa/Cairo", minutes: 30 }), RangeError);
});

test("برّه ساعات الشغل", () => {
  assert.equal(forAttendee(m, "America/New_York").inHours, false);
  assert.equal(forAttendee(m, "Europe/London").inHours, true);
});
~~~

~~~text الناتج (npm install وبعدين node --test)
✔ بيتخزّن UTC (0.7354ms)
✔ الأسبوعي بيفضل 15:00 في القاهرة بعد رجوع الساعة (29 أكتوبر) (3.6306ms)
✔ نيويورك فضلت 08:00: البلدين غيّروا الساعة في نفس الأسبوعين (2.4099ms)
✔ ساعة مش موجودة في القاهرة بترمي (0.5034ms)
✔ برّه ساعات الشغل (0.7679ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 116.9171
~~~

## ليه التصميم ده

- **التخزين UTC ([[startUtc]]) ومعاه [[zone]] المنظّم:** اللحظة وحدها مش كفاية للمتكرر: «كل خميس ٣ العصر» معناها ساعة على حيطة القاهرة، فلازم نعرف الـ zone عشان نحسب الأسبوع الجاي.
- **[[first.add({ weeks: i })]] على [[ZonedDateTime]]:** أسابيع تقويم في zone المنظّم، فالساعة على الحيطة ثابتة والـ UTC هو اللي بيتغير. لو زوّدنا [[7 * 86400000]] كان الاجتماع التالت بقى ٢ الضهر في القاهرة.
- **[[disambiguation: "reject"]]:** ساعة مش موجودة (٢٤ أبريل 00:30) بترمي بدل ما تتزحلق، وعليها اختبار.
- **[[forAttendee]]:** كل حاضر بيشوف بتوقيته، و [[inHours]] بيقول لو الاجتماع كله (البداية والنهاية ونفس اليوم) بين ٩ و ٥.
- **ومفيش [[new Date("01/02/2026")]]:** كل النصوص ISO، والعرض بالعربي بـ [[Intl.DateTimeFormat]] بـ zone صريح.

## الغلطة اللي اتمسكت

أول اسم لاختبار نيويورك كان «الفرق بيتغير لما الساعة بتتغير عندهم»، على أساس إن نيويورك غيّرت ساعتها في النص. لما طبعنا القيم طلعت 08:00 التلات مرات: نيويورك غيّرت ساعتها ١ نوفمبر والقاهرة ٢٩ أكتوبر، فالفرق بينهم رجع زي ما هو بعد الأسبوعين. الاختبار هو اللي صحّح فهمنا، فغيّرنا اسمه للي بيحصل فعلًا. ولو اجتماع وقع في الأسبوع اللي بين ٢٩ أكتوبر و ١ نوفمبر بالظبط كان الفرق هيبقى ساعة أقل.`  },
      ],
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
          ref: [
            { t: "MDN: Date", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date" },
            { t: "MDN: Date.parse()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse" },
            { t: "MDN: Date.prototype.setMonth()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth" },
            { t: "MDN: Representing dates & times", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Representing_dates_times" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[new Date(2026, 1, 30)]] هيبقى أنهي يوم؟ اكتب توقعك، وبعدين اطبع [[getMonth()]] و [[getDate()]].`, done: R`بيطبع [[2 2]]: يعني ٢ مارس، لأن فبراير 2026 ٢٨ يوم فالـ ٣٠ فاضت يومين، والشهر [[2]] هو مارس لأن العد من 0. ومفيش error ولا Invalid Date.`, sol: R`**التوقع:** ٣٠ فبراير مش موجود، فـ Date هيرحّل الزيادة لمارس.

~~~js feb30.js
const d = new Date(2026, 1, 30);
console.log(d.getMonth(), d.getDate());
console.log(d.toDateString());
~~~

~~~text الناتج (node feb30.js، Node 24، TZ=Africa/Cairo)
2 2
Mon Mar 02 2026
~~~

**ليه [[2 2]]:**

1. [[new Date(2026, 1, 30)]]: الشهر [[1]] هو **فبراير** (العد من 0)، واليوم 30.
2. فبراير 2026 فيه 28 يوم بس (2026 مش كبيسة: مش بتقبل القسمة على 4). فاليوم 30 = آخر فبراير + يومين.
3. Date مبيرميش error ولا بيعمل Invalid Date، بيرحّل: 30 − 28 = 2، يعني **٢ مارس**.
4. [[getMonth()]] بيرجّع [[2]] (مارس، من 0)، و [[getDate()]] بيرجّع [[2]].

و [[toDateString()]] بيأكد: [[Mon Mar 02 2026]].

**الغلطة الشائعة:** تقرا [[getMonth()]] اللي طالعة [[2]] على إنها فبراير. اللي بيظهر لليوزر لازم [[getMonth() + 1]]. والغلطة التانية: تفتكر إن التاريخ الغلط هيرمي error فتعتمد على try/catch للفحص؛ مفيش error هنا خالص، والفحص الصح في تمرين [[parseISODate]] تحت.`  },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صفحة فاتورة فيها [[function addDays(d, n) { d.setDate(d.getDate() + n); return d; }]] و [[const due = addDays(issued, 30)]]، وبعدها بتعرض «اتعملت» و «آخر ميعاد». اليوزرز بيشتكوا إن التاريخين زي بعض. لاقي السبب وصلّح [[addDays]] بس.`, done: R`قبل التصليح [[issued === due]] بتدّي [[true]] والتاريخين بيطلعوا ٣٠ يوم بعد الإصدار، لأن setDate بتعدّل نفس الـ object. بعد التصليح (نسخة جديدة [[new Date(d)]] وتعدّل فيها) [[issued]] مبيتغيرش و [[due - issued]] بيساوي ٣٠ يوم بالـ ms (أو ساعة أقل أو أكتر لو التوقيت الصيفي اتغيّر في النص).`, sol: R`**السبب:** [[setDate]] بتعدّل **نفس الـ object** اللي اتبعت، فـ [[addDays]] غيّرت [[issued]] نفسها ورجّعته هو. [[issued]] و [[due]] بقوا اسمين لنفس الـ Date.

~~~js invoice-bug.js
function addDays(d, n) {
  d.setDate(d.getDate() + n);
  return d;
}

const issued = new Date(2026, 9, 1);
const due = addDays(issued, 30);
console.log("اتعملت:     ", issued.toDateString());
console.log("آخر ميعاد:  ", due.toDateString());
console.log("نفس الـ object؟", issued === due);
~~~

~~~text الناتج قبل التصليح (Node 24، TZ=Africa/Cairo)
اتعملت:      Sat Oct 31 2026
آخر ميعاد:   Sat Oct 31 2026
نفس الـ object؟ true
~~~

[[issued]] بقت ٣١ أكتوبر هي كمان، و [[issued === due]] بـ [[true]]: نفس الـ object.

**التصليح:** نسخة جديدة جوه الدالة، والتعديل يحصل على النسخة.

~~~js invoice.js
function addDays(d, n) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

const issued = new Date(2026, 9, 1);
const due = addDays(issued, 30);
console.log("اتعملت:     ", issued.toDateString());
console.log("آخر ميعاد:  ", due.toDateString());
console.log("نفس الـ object؟", issued === due);
console.log("الفرق بالـ ms:", due - issued, "=", (due - issued) / 3600000, "ساعة");
~~~

~~~text الناتج بعد التصليح
اتعملت:      Thu Oct 01 2026
آخر ميعاد:   Sat Oct 31 2026
نفس الـ object؟ false
الفرق بالـ ms: 2595600000 = 721 ساعة
~~~

- [[new Date(d)]]: Date جديد بنفس اللحظة. التعديل عليه مبيلمسش الأصل.
- [[issued]] رجعت ١ أكتوبر، و [[issued === due]] بقت [[false]].
- **الفرق ٧٢١ ساعة مش ٧٢٠:** بين ١ و ٣١ أكتوبر 2026 القاهرة رجّعت الساعة ساعة (ليلة ٢٩ أكتوبر، آخر خميس في الشهر)، فيوم ٢٩ كان ٢٥ ساعة. [[setDate]] بتزوّد أيام **تقويم** (نص الليل لنص الليل)، مش ٢٤ × ٣٠ ساعة. وده الصح لميعاد فاتورة.

**الغلطة الشائعة:** تصلّحها برّه الدالة ([[addDays(new Date(issued), 30)]] عند كل نداء). ده بيشتغل لحد ما حد ينسى مرة. الدالة نفسها هي اللي لازم متعدّلش اللي جايلها.`  },
            { lvl: 'تطبيق', t: R`**ابني:** [[ageOn(birth, today)]] بتاخد تاريخين [["YYYY-MM-DD"]] وترجّع السن بالسنين الكاملة: اطرح السنين، وانقص واحد لو عيد الميلاد لسه مجاش السنة دي. من غير ما تقسم ms على 365.`, done: R`[[ageOn("2000-11-04", "2026-11-03")]] بترجّع 25 (فاضل يوم)، و [[ageOn("2000-11-03", "2026-11-03")]] بترجّع 26، والمولود 29 فبراير: [[ageOn("2004-02-29", "2026-02-28")]] بـ 21 و [["2026-03-01"]] بـ 22.`, sol: R`~~~js age.js
function ageOn(birth, today) {
  const [by, bm, bd] = birth.split("-").map(Number);
  const [ty, tm, td] = today.split("-").map(Number);
  let age = ty - by;
  const birthdayNotYet = tm < bm || (tm === bm && td < bd);
  if (birthdayNotYet) age--;
  return age;
}

console.log(ageOn("2000-11-04", "2026-11-03"));
console.log(ageOn("2000-11-03", "2026-11-03"));
console.log(ageOn("2004-02-29", "2026-02-28"));
console.log(ageOn("2004-02-29", "2026-03-01"));
~~~

~~~text الناتج (node age.js، Node 24)
25
26
21
22
~~~

**إزاي بيشتغل:**

- [[birth.split("-").map(Number)]]: [["2000-11-04"]] تبقى [[[2000, 11, 4]]]. مفيش Date خالص، فمفيش time zone ولا شهر من 0.
- [[ty - by]]: فرق السنين، ده السن **لو** عيد الميلاد عدّى السنة دي.
- [[birthdayNotYet]]: عيد الميلاد لسه مجاش لو شهر النهارده قبل شهر الميلاد، أو نفس الشهر واليوم قبله. ساعتها نطرح 1.
- المولود ٢٩ فبراير: في 2026 (مش كبيسة) يوم ٢٨ فبراير لسه «قبل» ٢٩/٢، فالسن 21، ويوم ١ مارس بقى 22. ده نفس اللي القانون في أغلب البلاد بيعمله.

**ليه مش [[(today - birth) / (365 * 86400000)]]:** السنة مش ٣٦٥ يوم دايمًا (الكبيسة ٣٦٦)، فالقسمة بتغلط في الأيام اللي حوالين عيد الميلاد: [[ageOn("2000-11-04", "2026-11-03")]] بالقسمة بتطلع 26.01 ومع [[Math.floor]] 26، والصح 25.

**الغلطة الشائعة:** تقارن الشهر لوحده ([[tm < bm]]) وتنسى حالة نفس الشهر واليوم لسه مجاش.`  },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[parseISODate(s)]] بتقبل [["YYYY-MM-DD"]] بس وترجّع Date أو [[null]]. قبل ما تكتب، جرّب [[new Date("2026-02-30")]] لوحدها.`, done: R`[[new Date("2026-02-30")]] مش Invalid Date: V8 بيقبلها وبتبقى [[2026-03-02T00:00:00.000Z]]، و [["2026-02-32"]] بس هي اللي NaN. فدالتك لازم تقارن السنة والشهر واليوم اللي رجعوا (بـ getUTC) باللي اتكتب: [["2026-02-30"]] و [["2026-13-01"]] و [["26-1-1"]] و [[""]] ← null، و [["2028-02-29"]] ← Date سليم.`, sol: R`~~~js parse-iso-date.js
console.log(new Date("2026-02-30").toISOString());
console.log(new Date("2026-02-32").getTime());

const isDigits = s => s.length > 0 && [...s].every(c => c >= "0" && c <= "9");

function parseISODate(s) {
  if (typeof s !== "string") return null;
  const parts = s.split("-");
  if (parts.length !== 3) return null;
  const [ys, ms, ds] = parts;
  if (ys.length !== 4 || ms.length !== 2 || ds.length !== 2) return null;
  if (!parts.every(isDigits)) return null;
  const [y, m, d] = parts.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return date;
}

for (const s of ["2026-02-30", "2026-13-01", "26-1-1", "", "2026-1a-05", "2028-02-29", "2026-11-03"]) {
  const r = parseISODate(s);
  console.log(JSON.stringify(s).padEnd(14), r ? r.toISOString() : r);
}
~~~

~~~text الناتج (node parse-iso-date.js، Node 24)
2026-03-02T00:00:00.000Z
NaN
"2026-02-30"   null
"2026-13-01"   null
"26-1-1"       null
""             null
"2026-1a-05"   null
"2028-02-29"   2028-02-29T00:00:00.000Z
"2026-11-03"   2026-11-03T00:00:00.000Z
~~~

**أول سطرين هما سبب التمرين:** [[new Date("2026-02-30")]] مش Invalid Date، V8 قبلها ورحّلها لـ ٢ مارس. و [["2026-02-32"]] بس (يوم فوق ٣١) هي اللي طلعت [[NaN]]. يعني [[Number.isNaN(d.getTime())]] لوحده مش كفاية.

**خطوات الدالة:**

1. **الشكل:** [[split("-")]] لازم يدّي ٣ حتت بطول ٤ و ٢ و ٢، وكل حرف رقم ([[isDigits]] بيلف على الحروف). ده بيرفض [["26-1-1"]] و [[""]] و [["2026-1a-05"]]. (في وحدة regex هتكتب الفحص ده في سطر: [[/^\d{4}-\d{2}-\d{2}$/]].)
2. **[[Date.UTC(y, m - 1, d)]]:** بيعمل اللحظة بـ UTC على طول، فالنتيجة مش بتتأثر بتوقيت الجهاز. و [[m - 1]] لأن الشهر في Date من 0.
3. **المقارنة بعد الرجوع:** لو Date رحّل التاريخ (٣٠ فبراير بقت ٢ مارس، أو الشهر 13 بقى يناير اللي بعده)، اليوم أو الشهر اللي رجعوا مش هيساووا اللي اتكتب، فنرجّع [[null]]. وبنقرا بـ [[getUTC...]] مش [[get...]] عشان نقرا بنفس التوقيت اللي عملنا بيه.

[["2028-02-29"]] عدّت لأن 2028 كبيسة، والمقارنة لقت نفس السنة والشهر واليوم.

**الغلطة الشائعة:** تقارن بـ [[getDate()]] العادية على Date معمول بـ [[Date.UTC]]. على جهاز في نيويورك [[getDate()]] هترجّع اليوم اللي قبله (لأن نص الليل UTC هناك لسه بالليل امبارح)، فكل التواريخ السليمة هترجع null.`  },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** شغّل بتوقيت القاهرة ([[TZ=Africa/Cairo node file.js]] في Git Bash أو Linux): [[new Date("2026-11-03").toISOString()]] و [[new Date("2026-11-03T00:00").toISOString()]]. نفس اليوم؟`, done: R`طلع [[2026-11-03T00:00:00.000Z]] و [[2026-11-02T22:00:00.000Z]]: التاريخ لوحده بيتقري UTC، والتاريخ ومعاه وقت من غير Z بيتقري بتوقيت الجهاز. وبـ [[TZ=UTC]] الاتنين بقوا زي بعض، فعرفت ليه باج زي ده بيظهر عند اليوزر ومش عندك.`, sol: R`~~~js parse-two.js
console.log(new Date("2026-11-03").toISOString());
console.log(new Date("2026-11-03T00:00").toISOString());
~~~

~~~text الناتج بتوقيت القاهرة (TZ=Africa/Cairo، Node 24)
2026-11-03T00:00:00.000Z
2026-11-02T22:00:00.000Z
~~~

~~~text الناتج بـ TZ=UTC
2026-11-03T00:00:00.000Z
2026-11-03T00:00:00.000Z
~~~

في Windows PowerShell التشغيل بالتوقيتين: [[$env:TZ = "Africa/Cairo"; node parse-two.js]] وبعدين [[$env:TZ = "UTC"; node parse-two.js]] (و Git Bash بيعدّي [[TZ=UTC]] بس، زي ما الدرس قال).

**مش نفس اليوم:**

- [["2026-11-03"]] تاريخ بس، والمواصفات بتقول يتفهم **UTC** نص الليل، فطلع [[2026-11-03T00:00:00.000Z]] على أي جهاز.
- [["2026-11-03T00:00"]] تاريخ ووقت من غير [[Z]]، فبيتفهم **بتوقيت الجهاز**: نص الليل في القاهرة. القاهرة في نوفمبر UTC+2 (الصيفي خلص ٢٩ أكتوبر)، فنص الليل عندنا = ١٠ بالليل يوم ٢ في UTC.
- بـ [[TZ=UTC]] الجهاز نفسه بقى UTC، فالسطرين اتساووا.

**ده بيعمل باج إزاي:** المطوّر جهازه أو الـ CI بتاعه UTC، فالاختبارات بتنجح. واليوزر في القاهرة بيكتب التاريخ في فورم، والكود بيلزق عليه [["T00:00"]] قبل ما يبعته، فيوصل للسيرفر يوم ٢ مش ٣.

**الغلطة الشائعة:** تفتكر إن زيادة الوقت للنص بتخليه «أدق» بس، وهي غيّرت التوقيت اللي بيتفهم بيه. لو عايز لحظة محددة اكتبها بـ [[Z]] أو بـ offset زي [[+02:00]].`  }
          ],
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
| [[03]] | اليوم في الشهر، برقمين دايمًا |
| [[2026]] | السنة كاملة بأربع أرقام |

نفس الترحيل بيحصل لو كتبتها مباشرة: [[new Date(2026, 1, 31).toDateString()]] بيطلع [[Tue Mar 03 2026]] برضه.

---

## ٣. الـ parsing: النص اللي بتديه لـ Date بيتفهم إزاي؟

ده أخطر جزء. [[new Date("...")]] بنص بيعمل parse (يقرا النص ويحوّله لحظة)، والقاعدة في المواصفات:

| شكل النص | بيتفهم بتوقيت إيه |
|---|---|
| [["2026-03-01"]] (تاريخ بس) | UTC، يعني منتصف الليل في جرينتش مش عندك |
| [["2026-03-01T00:00"]] (تاريخ + وقت من غير Z) | توقيت الجهاز اللي الكود شغال عليه |
| [["2026-03-01T00:00Z"]] أو [[+02:00]] في الآخر | التوقيت المكتوب في النص بالظبط، على أي جهاز |
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
            R`بيعمل Date لـ ٣١ يناير ٢٠٢٦ بتوقيت الجهاز. الشهر هنا بيبدأ من 0، فـ [[0]] يعني يناير و [[11]] يعني ديسمبر، أما اليوم فبيبدأ من 1 عادي. لو كتبت [[1]] وانت قاصد يناير هتلاقي نفسك في فبراير.`,
            R`بيطبع [[0 31]]: [[getMonth]] بترجّع الشهر بنفس العدّ من صفر، و [[getDate]] بترجّع رقم اليوم في الشهر (مش [[getDay]] اللي بترجّع يوم الأسبوع). عشان تعرض الشهر لليوزر لازم تزوّد عليه 1.`,
            R`بيغيّر الشهر لفبراير ([[1]]) **في نفس الـ object**، مش بيرجّع نسخة جديدة. يعني أي كود تاني شايل [[d]] هيشوف التغيير، وده مطب لو الـ Date جايلك من برّه.`,
            R`بيطبع [[Tue Mar 03 2026]] مش فبراير: اليوم لسه 31، وفبراير ٢٠٢٦ فيه ٢٨ يوم بس، فالـ ٣ أيام الزيادة بتترحّل للشهر اللي بعده من غير أي error. عشان كده «زوّد شهر» محتاجة تتعمل بحرص.`,
            R`نص فيه تاريخ بس من غير وقت، والمواصفات بتقول يتفهم UTC نص الليل، فالناتج [[2026-03-01T00:00:00.000Z]] في أي بلد. و [[toISOString]] دايمًا بتطبع بتوقيت UTC وآخرها [[Z]].`,
            R`نفس اليوم بس معاه وقت ومن غير [[Z]]: هنا بيتفهم بتوقيت الجهاز. في القاهرة (UTC+2 في مارس) نص الليل المحلي = [[2026-02-28T22:00:00.000Z]]، وفي نيويورك هيطلع رقم تاني. مجرد إضافة الوقت غيّرت المعنى.`,
            R`الشكل [["01/02/2026"]] مش من المواصفات، فكل engine بيفهمه بمزاجه. V8 (Node و Chrome) فهمه بالأمريكي (شهر/يوم) فطلع الشهر [[0]] يعني يناير، واحنا في مصر بنقراه ١ فبراير. متعملش parse لنص بالشكل ده أبدًا.`,
            R`مفيش شهر ٣٢، فالناتج Invalid Date و [[getTime()]] بترجّع [[NaN]]، **من غير ما يرمي error**. الكود هيكمّل عادي بقيمة بايظة، فلازم تفحص بنفسك بـ [[Number.isNaN(d.getTime())]] قبل ما تستخدم أي تاريخ جاي من يوزر.`,
            R`لحظة محددة بالظبط: الـ [[Z]] في الآخر معناها UTC، فالنص ده يعني نفس اللحظة على أي جهاز. ده الشكل اللي المفروض تخزّن وتبعت بيه التواريخ.`,
            R`[[new Date(a)]] بتعمل Date جديد بنفس اللحظة: نسخة مستقلة. لو كتبت [[const b = a]] بدلها، الاتنين هيشاوروا على نفس الـ object، والسطر اللي بعده هيعدّل [[a]] كمان.`,
            R`بيزوّد ٣ أيام على النسخة: [[getDate()]] بترجّع ٢٩ فبنحط ٣٢. ومع إن سبتمبر ٣٠ يوم بس، الـ overflow هنا مفيد: [[setDate(32)]] بتترحّل لوحدها لـ ٢ أكتوبر.`,
            R`بيطبع [[29 2 259200000]] في القاهرة: [[a]] لسه ٢٩ لأننا عدّلنا النسخة بس، و [[b]] بقت ٢ أكتوبر. والطرح [[b - a]] بيحوّل الاتنين milliseconds، فالفرق ٣ × ٢٤ ساعة بالـ ms.`,
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
          ref: [
            { t: "MDN: Intl.DateTimeFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat" },
            { t: "MDN: Intl.DateTimeFormat() constructor (كل الـ options)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat" },
            { t: "MDN: Date.prototype.toISOString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString" },
            { t: "MDN: Date.prototype.toLocaleString()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString" },
          ],
          practice: [
            { lvl: 'سريع', t: R`**ابني:** صفحة فيها ٣ عناصر [[<time datetime="2026-09-29T21:30:00Z"></time>]] بأوقات ISO مختلفة. اكتب كام سطر بيلفوا على كل [[time]] ويكتبوا جواه الوقت بتوقيت اليوزر بـ [[Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short" })]].`, done: R`الـ [[datetime]] attribute فاضل ISO زي ما هو (للمكائن)، والنص اللي جوه بقى بالعربي وبتوقيت جهازك. ولو غيّرت [[timeZone]] لـ [["America/New_York"]] النص بيتغيّر والـ attribute لأ.`, sol: R`~~~live 200 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>مواعيد الطلبات</title>
<style>
  body { font: 16px/1.8 system-ui, sans-serif; margin: 16px; }
  li { margin-bottom: 4px; }
  code { direction: ltr; unicode-bidi: embed; color: #555; font-size: 13px; }
</style>
</head>
<body>
<ul>
  <li>الطلب الأول: <time datetime="2026-09-29T21:30:00Z"></time></li>
  <li>الطلب التاني: <time datetime="2026-11-03T08:05:00Z"></time></li>
  <li>الطلب التالت: <time datetime="2027-01-15T23:45:00Z"></time></li>
</ul>
<p>توقيت جهازك: <code id="tz"></code></p>
<script>
  const fmt = new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short" });
  for (const el of document.querySelectorAll("time")) {
    el.textContent = fmt.format(new Date(el.dateTime));
  }
  document.getElementById("tz").textContent = fmt.resolvedOptions().timeZone;
</script>
</body>
</html>
~~~

الصفحة فوق شغالة بتوقيت **جهازك انت**، فلو انت برّه مصر هتشوف أوقات تانية، وده المقصود.

~~~text الناتج (Chrome 158 بـ Playwright، الجهاز على توقيت القاهرة)
الطلب الأول: ٣٠‏/٠٩‏/٢٠٢٦، ١٢:٣٠ ص
الطلب التاني: ٠٣‏/١١‏/٢٠٢٦، ١٠:٠٥ ص
الطلب التالت: ١٦‏/٠١‏/٢٠٢٧، ١:٤٥ ص
توقيت جهازك: Africa/Cairo

ونفس الـ ٣ بـ timeZone: "America/New_York":
٢٩‏/٠٩‏/٢٠٢٦، ٥:٣٠ م
٠٣‏/١١‏/٢٠٢٦، ٣:٠٥ ص
١٥‏/٠١‏/٢٠٢٧، ٦:٤٥ م
~~~

**كل سطر بيعمل إيه:**

- [[new Intl.DateTimeFormat("ar-EG", {...})]] **مرة واحدة برّه الـ loop**: من غير [[timeZone]]، فبياخد توقيت المتصفح.
- [[document.querySelectorAll("time")]]: كل عناصر [[<time>]].
- [[el.dateTime]]: الـ property اللي بتقرا الـ attribute [[datetime]] (زي [[el.getAttribute("datetime")]]). القيمة ISO بـ [[Z]]، فـ [[new Date(...)]] بيفهمها لحظة محددة.
- [[el.textContent = ...]]: النص اللي اليوزر بيشوفه بس اللي اتغيّر. الـ attribute فاضل ISO للمكائن (محركات البحث، والـ screen readers، وأي script تاني).

**الأرقام:** أول طلب [[21:30Z]] بقى ١٢:٣٠ ص يوم ٣٠ (القاهرة UTC+3 في سبتمبر)، والتاني ١٠:٠٥ (UTC+2 في نوفمبر، بعد ما الصيفي خلص)، والتالت [[23:45Z]] بقى يوم ١٦ يناير. كل ده من غير ما تكتب offset بإيدك.

**التجربة التانية:** زوّد [[timeZone: "America/New_York"]] في الـ options، والنص بيتغيّر (آخر ٣ سطور في الناتج فوق، من نفس الـ Chrome)، والـ [[datetime]] attribute زي ما هو.

**الغلطة الشائعة:** تكتب الوقت المتنسق **في** الـ attribute ([[el.setAttribute("datetime", ...)]])، فالقيمة المفهومة للمكائن تضيع. أو تعمل [[new Intl.DateTimeFormat]] جوه الـ loop: بيشتغل، بس بيعمل formatter جديد لكل عنصر.`  },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const d = new Date("2026-09-29T21:30:00Z");]] وشغّل بـ [[TZ=Africa/Cairo]]: [[d.getDate()]] و [[d.getUTCDate()]] و [[d.getHours()]] هيطبعوا إيه؟`, done: R`توقعت وطلع 30 و 29 و 0: في القاهرة اللحظة دي بعد نص الليل (UTC+3 في سبتمبر 2026). فلو تقرير بيستخدم [[getDate()]] على سيرفر وتاني على جهاز اليوزر، الأيام بتختلف.`, sol: R`**التوقع:** في القاهرة [[21:30Z]] في سبتمبر = ١٢:٣٠ بعد نص الليل يوم ٣٠.

~~~js read-parts.js
const d = new Date("2026-09-29T21:30:00Z");
console.log(d.getDate(), d.getUTCDate(), d.getHours());
~~~

~~~text الناتج بتوقيت القاهرة (TZ=Africa/Cairo، Node 24)
30 29 0
~~~

~~~text نفس الملف بـ TZ=UTC (زي أغلب السيرفرات)
29 29 21
~~~

- [[getDate()]]: اليوم **بتوقيت الجهاز**. القاهرة في سبتمبر 2026 UTC+3، فـ ٩:٣٠ بالليل UTC + ٣ ساعات = ١٢:٣٠ بعد نص الليل، يعني يوم **30**.
- [[getUTCDate()]]: اليوم بتوقيت UTC، ثابت على أي جهاز: **29**.
- [[getHours()]]: الساعة بتوقيت الجهاز: **0** (من 0 لـ 23، يعني ١٢ بالليل).

على السيرفر (UTC) [[getDate()]] نفسها بقت 29 و [[getHours()]] بقت 21: نفس الكود ونفس اللحظة، وأرقام مختلفة.

**الغلطة الشائعة:** تقرير «طلبات يوم ٢٩» بيتحسب بـ [[getDate()]] على السيرفر وبيتعرض بـ [[getDate()]] في المتصفح، فاليوزر في القاهرة يلاقي الطلب ده في يوم ٣٠ في صفحة وفي يوم ٢٩ في التقرير. اختار توقيت واحد صريح (بـ [[timeZone]] في Intl) للحسابات.`  },
            { lvl: 'تطبيق', t: R`**مسألة:** اكتب [[dayIn(iso, timeZone)]] بترجّع [["YYYY-MM-DD"]] للحظة دي في المدينة دي (بحيلة [["en-CA"]] اللي في الدرس). جرّبها على [["2026-09-29T21:30:00Z"]] في القاهرة والرياض ولندن، وعلى نص مش تاريخ.`, done: R`القاهرة ← [["2026-09-30"]]، والرياض ← [["2026-09-30"]]، ولندن ← [["2026-09-29"]]: نفس اللحظة في يوم مختلف حسب المدينة. والنص الغلط بيرجّع null أو يرمي error واضح انت اخترته (مش [[RangeError: Invalid time value]] من جوه Intl).`, sol: R`~~~js day-in.js
const dayFormatters = new Map();

function dayIn(iso, timeZone) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  let f = dayFormatters.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-CA", { timeZone });
    dayFormatters.set(timeZone, f);
  }
  return f.format(date);
}

const t = "2026-09-29T21:30:00Z";
console.log("القاهرة:", dayIn(t, "Africa/Cairo"));
console.log("الرياض: ", dayIn(t, "Asia/Riyadh"));
console.log("لندن:   ", dayIn(t, "Europe/London"));
console.log("نص غلط: ", dayIn("امبارح", "Africa/Cairo"));

try {
  new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date("امبارح"));
} catch (err) {
  console.log("من غير الفحص:", err.name + ": " + err.message);
}
try {
  dayIn(t, "Cairo");
} catch (err) {
  console.log("zone غلط:", err.name + ": " + err.message);
}
~~~

~~~text الناتج (node day-in.js، Node 24)
القاهرة: 2026-09-30
الرياض:  2026-09-30
لندن:    2026-09-29
نص غلط:  null
من غير الفحص: RangeError: Invalid time value
zone غلط: RangeError: Invalid time zone specified: Cairo
~~~

**إزاي بيشتغل:**

- [["en-CA"]] شكل تاريخها الافتراضي [[YYYY-MM-DD]]، ومع [[timeZone]] بيطلّع تاريخ اللحظة في المدينة دي كنص.
- **الفحص الأول:** [[new Date(iso)]] على نص مش تاريخ بيدّي Invalid Date من غير error، فبنفحص [[Number.isNaN(date.getTime())]] ونرجّع [[null]] بنفسنا. من غيره، [[format]] بيرمي [[RangeError: Invalid time value]] (السطر اللي قبل الأخير)، ودي رسالة مش بتقول إن المشكلة في النص اللي جه.
- **[[Map]] للـ formatters:** formatter واحد لكل zone، بيتعمل أول مرة ويتعاد استخدامه، عشان الدالة ممكن تتنادي آلاف المرات في تقرير.
- **zone غلط:** [["Cairo"]] مش اسم IANA (الصح [["Africa/Cairo"]])، و Intl بيرمي [[RangeError]] برسالة واضحة، فسيبناه يترمي: ده غلط في الكود مش في الداتا.

**النتايج:** القاهرة والرياض ٣٠ سبتمبر (الاتنين UTC+3 الليلة دي)، ولندن ٢٩ (UTC+1 صيفًا، يعني ١٠:٣٠ بالليل). نفس اللحظة في يومين.

**الغلطة الشائعة:** [[toISOString().slice(0, 10)]] بدل الدالة دي: ده تاريخ UTC (٢٩) مش تاريخ القاهرة.`  },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من صفحة [[Intl.DateTimeFormat]] على MDN، لاقي الـ options اللي تطبع [[2026-11-03T12:00:00Z]] بالعربي كده: اسم اليوم كامل، واليوم، واسم الشهر، والسنة، بتوقيت القاهرة.`, done: R`[[{ weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" }]] مع [["ar-EG"]] بتطبع [[الثلاثاء، ٣ نوفمبر ٢٠٢٦]]. ولقيت إن [[dateStyle]] مينفعش يتجمع مع [[weekday]] في نفس الـ options: Node 24 بيرمي [[TypeError: Invalid option : option]] (رسالة مش واضحة، فافتكر السبب).`, sol: R`**الإجابة النموذجية:** من جدول الـ options في صفحة MDN: [[weekday]] (اسم اليوم)، و [[day]]، و [[month]]، و [[year]]، وكل واحد ليه قيم ([["long"]] للاسم الكامل، و [["numeric"]] للرقم)، و [[timeZone]].

~~~js long-date.js
const when = new Date("2026-11-03T12:00:00Z");
const opts = { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" };
console.log(new Intl.DateTimeFormat("ar-EG", opts).format(when));

try {
  new Intl.DateTimeFormat("ar-EG", { dateStyle: "full", weekday: "long" });
} catch (err) {
  console.log(err.name + ": " + err.message);
}
~~~

~~~text الناتج (node long-date.js، Node 24)
الثلاثاء، ٣ نوفمبر ٢٠٢٦
TypeError: Invalid option : option
~~~

- [[weekday: "long"]] ← «الثلاثاء». ([["short"]] كان هيدّي اختصار.)
- [[day: "numeric"]] ← ٣ من غير صفر قدامها ([["2-digit"]] كانت هتدّي ٠٣).
- [[month: "long"]] ← «نوفمبر» بالاسم.
- [[year: "numeric"]] ← ٢٠٢٦.
- [[timeZone: "Africa/Cairo"]]: [[12:00Z]] في القاهرة ٢ الضهر، نفس اليوم. من غيره كان هياخد توقيت الجهاز، وعلى جهاز في هاواي (UTC−10) كان هيبقى ٢ الصبح نفس اليوم برضه، بس لحظة قريبة من نص الليل كانت هتفرق.
- الأرقام مشرقية (٣ و ٢٠٢٦) لأن ده الافتراضي في [["ar-EG"]].

**اللي هتلاقيه في MDN كمان:** [[dateStyle]] و [[timeStyle]] اختصارات، ومينفعوش يتجمعوا مع [[weekday]] و [[day]] وأخواتهم. السطر التاني في الناتج هو اللي Node 24 بيرميه: [[TypeError: Invalid option : option]]، رسالة مش بتقول أنهي option، فافتكر السبب لما تشوفها.`  },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** عندك طلبات [[createdAt]] بتاعتها [["2026-09-29T10:00:00Z"]] و [["2026-09-29T21:30:00Z"]] و [["2026-09-30T05:00:00Z"]] و [["2026-09-30T22:15:00Z"]]. اعمل تقرير «طلبات كل يوم» مرة بـ [[toISOString().slice(0, 10)]] ومرة بـ [[dayIn]] بتوقيت القاهرة.`, done: R`بـ UTC: ٢٩ سبتمبر ٢ و ٣٠ سبتمبر ٢. بالقاهرة: ٢٩ سبتمبر ١، و ٣٠ سبتمبر ٢، و ١ أكتوبر ١. نفس الداتا، تقرير مختلف: وده اللي بيحصل لما «مبيعات النهارده» تتحسب بـ UTC لمحل في مصر.`, sol: R`~~~js daily-report.js
const orders = [
  { id: 1, createdAt: "2026-09-29T10:00:00Z" },
  { id: 2, createdAt: "2026-09-29T21:30:00Z" },
  { id: 3, createdAt: "2026-09-30T05:00:00Z" },
  { id: 4, createdAt: "2026-09-30T22:15:00Z" },
];

const cairoDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" });
const dayIn = iso => cairoDay.format(new Date(iso));
const utcDay = iso => new Date(iso).toISOString().slice(0, 10);

function countBy(list, keyOf) {
  const counts = {};
  for (const o of list) {
    const k = keyOf(o.createdAt);
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts;
}

console.log("بـ UTC:     ", countBy(orders, utcDay));
console.log("بالقاهرة:   ", countBy(orders, dayIn));
~~~

~~~text الناتج (node daily-report.js، Node 24)
بـ UTC:      { '2026-09-29': 2, '2026-09-30': 2 }
بالقاهرة:    { '2026-09-29': 1, '2026-09-30': 2, '2026-10-01': 1 }
~~~

**إزاي بيشتغل:**

- [[countBy(list, keyOf)]]: دالة عد عامة: بتاخد دالة بتطلّع «اليوم» من كل طلب، وبتعد كام طلب في كل يوم. [[counts[k] ?? 0]] يعني «لو اليوم ده لسه مالوش عدد، ابدأ من صفر».
- [[utcDay]]: أول ١٠ حروف من نص ISO = التاريخ **بـ UTC**.
- [[dayIn]]: التاريخ **في القاهرة** بحيلة [["en-CA"]]، بـ formatter واحد متعمل مرة.

**ليه التقريرين مختلفين، طلب طلب:**

| الطلب | UTC | القاهرة | ليه |
|---|---|---|---|
| [[09-29T10:00Z]] | ٢٩ | ٢٩ | ١ الضهر في القاهرة |
| [[09-29T21:30Z]] | ٢٩ | **٣٠** | ١٢:٣٠ بعد نص الليل (UTC+3) |
| [[09-30T05:00Z]] | ٣٠ | ٣٠ | ٨ الصبح |
| [[09-30T22:15Z]] | ٣٠ | **١ أكتوبر** | ١:١٥ بعد نص الليل |

طلبين من الأربعة اتنقلوا ليوم تاني. محل في مصر بيقفل حساب اليوم الساعة ١٢ بالليل بتوقيته، فالتقرير الصح هو التاني.

**الغلطة الشائعة:** السيرفر بيحسب «مبيعات النهارده» بـ [[toISOString().slice(0, 10)]] أو بـ [[GROUP BY date(created_at)]] على داتابيز UTC، فكل طلبات الساعتين أو التلاتة الأولانيين بعد نص الليل بتروح على امبارح. الحل: حدّد zone المحل صريح في الحساب.`  }
          ],
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
            R`لحظة جاية بـ [[Z]] في آخرها، يعني UTC: ٩:٣٠ بالليل يوم ٢٩ سبتمبر بتوقيت جرينتش. ده الشكل اللي بييجي عادة من API أو داتابيز، وهو لحظة واحدة مش مربوطة بأي بلد.`,
            R`بيطبع نفس النص مرتين: [[toISOString()]] بتطبع بـ UTC وآخرها [[Z]]، و [[JSON.stringify]] لما يلاقي Date بينادي [[toJSON]] اللي بترجّع نفس الشكل. فالـ Date بيوصل في JSON كـ **string** مش Date، والطرف التاني لازم يعمل [[new Date(...)]] تاني.`,
            R`بيعمل formatter مرة واحدة: [[ar-EG]] عربي بشكل مصر (أسماء أيام وأرقام عربية)، و [[dateStyle]] و [[timeStyle]] أشكال جاهزة بدل ما تختار كل جزء، و [[timeZone]] بيحدد التوقيت اللي يتعرض بيه بدل توقيت الجهاز. ومتخلطش [[dateStyle]] مع [[day]] أو [[month]] في نفس الـ options، ده بيرمي TypeError.`,
            R`بيطبع [[الأربعاء، ٣٠ سبتمبر ٢٠٢٦ في ١٢:٣٠ ص]]: نفس اللحظة اللي كانت يوم ٢٩ في UTC بقت ٣٠ بعد نص الليل في القاهرة (UTC+3 وقتها). ده سبب إن التاريخ «بيتزحلق يوم» لو عرضته بتوقيت غلط.`,
            R`formatter تاني لنفس اللحظة: لغة [[en-GB]] (اليوم قبل الشهر) وتوقيت الرياض. الـ Date نفسه مبيتغيرش، اللي بيتغير طريقة العرض بس، فتقدر تعرض نفس اللحظة لكل يوزر بلغته وبلده.`,
            R`بيطبع [[30 Sept 2026, 00:30]]: الرياض UTC+3 طول السنة، فطلعت نفس ساعة القاهرة في سبتمبر. والساعة بنظام ٢٤ ساعة لأن ده عُرف [[en-GB]].`,
            R`[[toLocaleString]] بتاخد نفس الـ options من غير ما تعمل formatter بإيدك، وهنا اخترنا الأجزاء واحد واحد ([[day]] و [[month]] و [[hour]] و [[minute]]). والإضافة [[-u-nu-latn]] في آخر اللغة معناها «numbering system لاتيني»: كلام عربي بأرقام [[0-9]]، فيطبع [[30 سبتمبر في 12:30 ص]].`,
            R`حيلة معروفة: [[en-CA]] بتطبع التاريخ بشكل [[YYYY-MM-DD]]، فبتاخد «تاريخ اللحظة دي في القاهرة» كنص جاهز للمقارنة أو كمفتاح. من غير [[timeZone]] هتاخد تاريخ الجهاز، وده على السيرفر غالبًا UTC.`,
            R`بيطبع [[2026-09-30 2026-09-29]]: الأول تاريخ القاهرة، والتاني أول ١٠ حروف من الـ ISO يعني تاريخ UTC. الغلطة المشهورة إنك تاخد [[toISOString().slice(0, 10)]] على إنه «النهارده»، فطلبات بعد نص الليل في مصر تتحسب على اليوم اللي قبله.`,
            R`[[resolvedOptions().timeZone]] بترجّع الـ time zone اللي الجهاز شغّال بيه: على السيرفرات و Docker غالبًا [["UTC"]]، وعلى جهازك [["Africa/Cairo"]]. اطبعه أول حاجة لما تلاقي تاريخ مختلف بين جهازك والسيرفر.`,
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
          ref: [
            { t: "MDN: Intl.RelativeTimeFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat" },
            { t: "MDN: Intl.RelativeTimeFormat.prototype.format()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format" },
          ],
          pre: [{ to: "js/UTC و Intl.DateTimeFormat", why: R`التمرين التالت بيستخدم [[dayIn]] بحيلة [["en-CA"]] من الدرس ده` }],
          practice: [
            { lvl: 'سريع', t: R`قارن: اعمل [[rtf]] بالعربي مرة بـ [[numeric: "auto"]] ومرة من غيره، واطبع من الاتنين [[format(-1, "day")]] و [[format(1, "day")]] و [[format(0, "day")]] و [[format(0, "second")]].`, done: R`مع auto: [[أمس]] و [[غدًا]] و [[اليوم]] و [[الآن]]. من غيره: [[قبل يوم واحد]] و [[خلال يوم واحد]] و [[خلال 0 يوم]] و [[خلال 0 ثانية]]، والأخيرتين واضح إنهم غلط في واجهة حقيقية.`, sol: R`~~~js numeric-auto.js
const auto = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
const always = new Intl.RelativeTimeFormat("ar");
const cases = [[-1, "day"], [1, "day"], [0, "day"], [0, "second"]];

for (const [n, unit] of cases) {
  console.log(String(n).padStart(2), unit.padEnd(6), "| auto:", auto.format(n, unit).padEnd(8), "| من غيره:", always.format(n, unit));
}
console.log(always.resolvedOptions().numeric);
~~~

~~~text الناتج (node numeric-auto.js، Node 24)
-1 day    | auto: أمس      | من غيره: قبل يوم واحد
 1 day    | auto: غدًا     | من غيره: خلال يوم واحد
 0 day    | auto: اليوم    | من غيره: خلال 0 يوم
 0 second | auto: الآن     | من غيره: خلال 0 ثانية
always
~~~

**الفرق:**

- [[numeric: "auto"]]: لو اللغة عندها كلمة خاصة للقيمة دي، بيستخدمها: -1 يوم «أمس»، و 1 «غدًا»، و 0 يوم «اليوم»، و 0 ثانية «الآن».
- من غيره القيمة الافتراضية [[numeric: "always"]] (آخر سطر في الناتج من [[resolvedOptions()]])، يعني رقم دايمًا: «قبل يوم واحد» و «خلال 0 يوم».

السطرين الأخيرين هما سبب الـ option: «خلال 0 ثانية» تحت كومنت اتكتب حالًا شكلها غلط. و «أمس» أقصر وأطبع من «قبل يوم واحد».

**الغلطة الشائعة:** تنسى [[numeric: "auto"]] وتحاول تعالجها بـ [[if (n === -1) return "أمس"]] بإيدك. ده بيشتغل للعربي بس، والـ formatter عارف الكلمة دي في كل لغة (جرّب [["en"]]: [[yesterday]] و [[now]]).`  },
            { lvl: 'تطبيق', t: R`ابني badge «آخر ظهور»: [[<span class="seen" data-ts="...">]] لكذا يوزر، و function بتملا كل واحد بـ [[timeAgo]] (اللي بتاخد locale كـ argument)، وبتتنادي تاني كل ٣٠ ثانية بـ setInterval. جرّب [["ar"]] و [["ar-EG"]] و [["en"]].`, done: R`يوزر من ٥ دقايق: [["en"]] ← [[5 minutes ago]]، و [["ar"]] ← [[قبل 5 دقائق]]. ويوزر من ٣ ساعات بـ [["ar-EG"]] ← [[قبل ٣ ساعات]] بالأرقام العربي. وبعد دقيقة النص بيتحدث لوحده من غير reload، والـ formatter بيتعمل مرة واحدة مش جوه الـ interval.`, sol: R`## الصفحة

~~~live 170 index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>آخر ظهور</title>
<style>
  body { font: 16px/1.8 system-ui, sans-serif; margin: 16px; }
  .seen { color: #15803d; font-size: 14px; }
  button { font: inherit; margin-inline-end: 6px; }
</style>
</head>
<body>
<p>
  <button data-locale="ar">ar</button>
  <button data-locale="ar-EG">ar-EG</button>
  <button data-locale="en">en</button>
</p>
<ul id="users"></ul>
<script>
  const now = Date.now();
  const users = [
    { name: "سلمى", ts: now - 5 * 60e3 },
    { name: "كريم", ts: now - 3 * 3600e3 },
    { name: "ندى", ts: now - 26 * 3600e3 },
  ];
  const list = document.getElementById("users");
  for (const u of users) {
    const li = document.createElement("li");
    const seen = document.createElement("span");
    seen.className = "seen";
    seen.dataset.ts = u.ts;
    li.append(u.name + " · ", seen);
    list.append(li);
  }

  const UNITS = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
  const formatters = new Map();
  function timeAgo(date, locale, nowMs = Date.now()) {
    let rtf = formatters.get(locale);
    if (!rtf) {
      rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
      formatters.set(locale, rtf);
    }
    const sec = Math.round((date - nowMs) / 1000);
    for (const [unit, size] of UNITS) {
      if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
    }
    return rtf.format(sec, "second");
  }

  let locale = "ar";
  function renderSeen() {
    for (const el of document.querySelectorAll(".seen")) {
      el.textContent = timeAgo(Number(el.dataset.ts), locale);
    }
  }
  document.querySelector("p").addEventListener("click", e => {
    if (e.target.dataset.locale) {
      locale = e.target.dataset.locale;
      renderSeen();
    }
  });
  renderSeen();
  setInterval(renderSeen, 30000);
</script>
</body>
</html>
~~~

~~~text اللي اتعرض في Chrome 158 (Playwright)، بعد الضغط على كل زرار
ar:     سلمى · قبل 5 دقائق | كريم · قبل 3 ساعات | ندى · أمس
ar-EG:  سلمى · قبل ٥ دقائق | كريم · قبل ٣ ساعات | ندى · أمس
en:     سلمى · 5 minutes ago | كريم · 3 hours ago | ندى · yesterday
بعد ٦١ ثانية من غير ما تلمس حاجة (ar):  سلمى · قبل 6 دقائق
~~~

ونفس الدالة في Node بلحظة ثابتة عشان الناتج يبقى متكرر:

~~~js time-ago-locales.js
const UNITS = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
const formatters = new Map();

function timeAgo(date, locale, now = Date.now()) {
  let rtf = formatters.get(locale);
  if (!rtf) {
    rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    formatters.set(locale, rtf);
  }
  const sec = Math.round((date - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(sec, "second");
}

const now = Date.parse("2026-11-21T10:00:00Z");
for (const locale of ["ar", "ar-EG", "en"]) {
  console.log(locale.padEnd(6), "|", timeAgo(now - 5 * 60e3, locale, now), "|", timeAgo(now - 3 * 3600e3, locale, now));
}
console.log("formatters اتعملوا:", formatters.size);
~~~

~~~text الناتج (node time-ago-locales.js، Node 24)
ar     | قبل 5 دقائق | قبل 3 ساعات
ar-EG  | قبل ٥ دقائق | قبل ٣ ساعات
en     | 5 minutes ago | 3 hours ago
formatters اتعملوا: 3
~~~

**كل حتة بتعمل إيه:**

- **[[data-ts]] فيه الـ timestamp:** كل [[span]] شايل اللحظة نفسها، و [[renderSeen]] بتقراها كل مرة وتحسب من جديد. مش محتاج array جانبية تفضل متزامنة مع الصفحة.
- **[[formatters]] Map:** formatter واحد لكل locale، بيتعمل أول مرة بس. [[setInterval]] بينادي [[renderSeen]] كل ٣٠ ثانية من غير ما يعمل formatter جديد (آخر سطر في ناتج Node: ٣ بس).
- **[[setInterval(renderSeen, 30000)]]:** كل ٣٠ ثانية النص بيتحسب تاني، فـ «قبل 5 دقائق» بتبقى «قبل 6 دقائق» لوحدها.
- **[["ar"]] و [["ar-EG"]]:** نفس الكلمات، والفرق في الأرقام: [["ar"]] لاتيني (5) و [["ar-EG"]] مشرقي (٥).
- **[[createElement]] و [[append]]:** الأسماء بتتحط كنص، فلو جت من يوزر فيها [[<]] مش هتتنفّذ.
- **listener واحد على الـ [[<p>]]:** event delegation: الضغطة على أي زرار بتوصل للأب، و [[e.target.dataset.locale]] بيقول أنهي زرار.

**الغلطة الشائعة:** تحط [[new Intl.RelativeTimeFormat]] جوه [[renderSeen]] أو جوه الـ loop، فكل ٣٠ ثانية بيتعمل formatter لكل عنصر. أو تحسب النص مرة واحدة وتنسى الـ interval، فـ «الآن» تفضل «الآن» لحد ما اليوزر يعمل reload.`  },
            { lvl: 'تحدي', t: R`مسألة: [[timeAgo]] بتحسب «أمس» بالثواني (من 24 لـ 48 ساعة). اكتب [[dayLabel(date, now, timeZone)]] بتقارن يوم التقويم في المدينة (بـ [[dayIn]] من الدرس اللي فات): نفس اليوم ← [[rtf.format(0, "day")]]، اليوم اللي قبله ← [[rtf.format(-1, "day")]]، غير كده التاريخ نفسه.`, done: R`رسالة [["2026-10-14T20:50:00Z"]] والوقت دلوقتي [["2026-10-14T21:10:00Z"]] (يعني 23:50 و 00:10 في القاهرة): [[dayLabel]] بترجّع [[أمس]] مع إن الفرق ٢٠ دقيقة، و [[timeAgo]] بترجّع [[قبل 20 دقيقة]]. والعكس: رسالة قبل نفس الـ now بـ ٣٠ ساعة ([["2026-10-13T15:10:00Z"]]، يعني يوم ١٣ في القاهرة والنهارده ١٥): [[dayLabel]] بترجّع تاريخ، و [[timeAgo]] بترجّع [[أمس]] غلط.`, sol: R`~~~js day-label.js
const UNITS = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
const rtf = new Intl.RelativeTimeFormat("ar", { numeric: "auto" });
function timeAgo(date, now = Date.now()) {
  const sec = Math.round((date - now) / 1000);
  for (const [unit, size] of UNITS) {
    if (Math.abs(sec) >= size) return rtf.format(Math.round(sec / size), unit);
  }
  return rtf.format(sec, "second");
}

const dayFormatters = new Map();
function dayIn(date, timeZone) {
  let f = dayFormatters.get(timeZone);
  if (!f) dayFormatters.set(timeZone, (f = new Intl.DateTimeFormat("en-CA", { timeZone })));
  return f.format(date);
}

const fullDate = new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long", timeZone: "Africa/Cairo" });

function dayLabel(date, now, timeZone) {
  const today = dayIn(now, timeZone);
  const day = dayIn(date, timeZone);
  if (day === today) return rtf.format(0, "day");
  const yesterday = new Date(Date.parse(today + "T12:00:00Z") - 86400e3).toISOString().slice(0, 10);
  if (day === yesterday) return rtf.format(-1, "day");
  return fullDate.format(date);
}

const now = new Date("2026-10-14T21:10:00Z");
const cases = ["2026-10-14T20:50:00Z", "2026-10-13T15:10:00Z", "2026-10-14T21:05:00Z"];
for (const iso of cases) {
  const d = new Date(iso);
  console.log(iso, "| dayLabel:", dayLabel(d, now, "Africa/Cairo"), "| timeAgo:", timeAgo(d, now));
}
~~~

~~~text الناتج (node day-label.js، Node 24)
2026-10-14T20:50:00Z | dayLabel: أمس | timeAgo: قبل 20 دقيقة
2026-10-13T15:10:00Z | dayLabel: ١٣ أكتوبر | timeAgo: أمس
2026-10-14T21:05:00Z | dayLabel: اليوم | timeAgo: قبل 5 دقائق
~~~

**إزاي [[dayLabel]] بتشتغل:**

1. [[dayIn(now, timeZone)]] و [[dayIn(date, timeZone)]]: يوم التقويم للحظتين **في القاهرة**، كنصوص [[YYYY-MM-DD]].
2. نفس النص ← [[rtf.format(0, "day")]] = «اليوم».
3. **«امبارح» كنص:** بناخد نص النهارده، ونعمله لحظة الساعة ١٢ الضهر UTC ([[today + "T12:00:00Z"]])، ونطرح ٢٤ ساعة، وناخد أول ١٠ حروف. الضهر عشان أي تغيير ساعة ميوقّعناش في يوم تاني. لو اليوم يساوي النص ده ← «أمس».
4. غير كده ← التاريخ بـ Intl ([[١٣ أكتوبر]]).

**الحالات:**

| الرسالة | في القاهرة | الآن في القاهرة | [[dayLabel]] | [[timeAgo]] |
|---|---|---|---|---|
| [[10-14T20:50Z]] | ١٤ أكتوبر ١١:٥٠ م | ١٥ أكتوبر ١٢:١٠ ص | أمس ✓ | قبل 20 دقيقة |
| [[10-13T15:10Z]] | ١٣ أكتوبر ٦:١٠ م | ١٥ أكتوبر ١٢:١٠ ص | ١٣ أكتوبر ✓ | أمس ✗ |
| [[10-14T21:05Z]] | ١٥ أكتوبر ١٢:٠٥ ص | ١٥ أكتوبر ١٢:١٠ ص | اليوم ✓ | قبل 5 دقائق |

[[timeAgo]] شافت ٣٠ ساعة فرق وقالت «أمس»، مع إن الرسالة كانت **أول امبارح** في التقويم. والعكس: ٢٠ دقيقة بس، بس عدّت نص الليل، فهي «أمس» فعلًا.

**الغلطة الشائعة:** تحسب «امبارح» بـ [[new Date(now - 86400000)]] و [[getDate()]]: ده بيستخدم توقيت الجهاز (السيرفر UTC)، ويوم تغيير الساعة (٢٥ ساعة) ممكن الطرح يوقّعك في نفس اليوم. المقارنة بنصوص اليوم في الـ zone الصح هي اللي مبتغلطش.`  },
          ],
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
            R`بيعمل formatter للوقت النسبي بالعربي. [[numeric: "auto"]] بيخليه يستخدم كلمات زي «أمس» و«غدًا» و«الآن» لما تنفع، ومن غيره (الافتراضي [["always"]]) هيقول «قبل يوم واحد».`,
            R`[[format]] بتاخد رقم ووحدة: السالب ماضي والموجب مستقبل. فبيطبع [[أمس | قبل 3 ساعات | خلال أسبوعين]]، والمثنى والجمع بيتظبطوا لوحدهم. بس هو مبيحسبش فرق بين تاريخين: انت اللي لازم تديله الرقم والوحدة، وده شغل الدالة اللي تحت.`,
            R`جدول الوحدات من الأكبر للأصغر، وجنب كل وحدة عدد ثوانيها: السنة ٣٦٥ يوم والشهر ٣٠ يوم. الأرقام دي **تقريبية**، وكفاية لـ «من قد إيه» في كومنت أو إشعار، مش لحساب فواتير أو أعمار.`,
            R`[[timeAgo]] بتاخد التاريخ اللي عايزين نوصفه، و [[now]] قيمتها الافتراضية [[Date.now()]]. خلّيناها باراميتر عشان في الاختبارات تقدر تثبّت «دلوقتي» وتاخد نفس الناتج كل مرة.`,
            R`الفرق بالثواني: طرح تاريخ من تاريخ بيدّي milliseconds، فبنقسم على ١٠٠٠ ونقرّب. والإشارة مهمة: سالب لو التاريخ في الماضي وموجب لو في المستقبل، وده بالظبط اللي [[format]] مستنياه.`,
            R`بنلف على الوحدات بالترتيب، وكل عنصر بنفكّه لاسم الوحدة ([[unit]]) وعدد ثوانيها ([[size]]). البداية من الأكبر مهمة: لو بدأنا بالدقيقة كان أي فرق هيطلع «قبل ٣٠٠٠ دقيقة».`,
            R`أول وحدة الفرق أكبر منها أو يساويها (بـ [[Math.abs]] عشان السالب) هي الوحدة المناسبة: بنقسم عليها ونقرّب ونرجّع النص على طول. فـ ٢٦ ساعة بتبقى يوم واحد وتطلع «أمس».`,
            R`نهاية الـ [[for]].`,
            R`لو اللفة خلصت من غير ما نرجع، يبقى الفرق أقل من دقيقة فبنعرضه بالثواني. ولو الفرق صفر بالظبط هيطبع «الآن» بسبب [[auto]].`,
            R`نهاية [[timeAgo]].`,
            R`بناخد «دلوقتي» مرة واحدة كرقم milliseconds، وكل التجارب تحت بتطرح منه أو تزوّد عليه، فكلها بتتقاس من نفس اللحظة.`,
            R`بيطبع [[قبل 5 دقائق | أمس]]: ٥ دقايق في الماضي وقفت عند وحدة الدقيقة، و ٢٦ ساعة اتقرّبت ليوم واحد فطلعت «أمس» مش «قبل 26 ساعة».`,
            R`بيطبع [[خلال 3 أيام | قبل 10 ثوانِ]]: الموجب بيدّي «خلال» للمستقبل، و ١٠ ثواني أقل من دقيقة فوصلت للسطر الأخير في [[timeAgo]].`,
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
          ref: [
            { t: "MDN: Temporal (لسه مش Baseline: Safari المستقر مفيهوش)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal" },
            { t: "MDN: Temporal.PlainDate", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/PlainDate" },
            { t: "MDN: Temporal.ZonedDateTime", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime" },
            { t: "date-fns: Getting Started", url: "https://date-fns.org/docs/Getting-Started" },
            { t: "Day.js: Installation", url: "https://day.js.org/docs/en/installation/installation" },
          ],
          practice: [
            { lvl: 'سريع', t: R`دوّر بنفسك: من صفحة [[Temporal.PlainDate.prototype.add]] على MDN، لاقي الـ option اللي بتخلي الحساب يرمي error بدل ما يقف على آخر الشهر. وبعدين في فولدر التجربة (بعد [[npm i @js-temporal/polyfill]]) جرّب [[Temporal.PlainDate.from("2028-02-29").add({ years: 1 })]] بيه ومن غيره. وجرّب [[typeof Temporal]] في Node من غير import.`, done: R`من غير الـ option بيطلع [[2029-02-28]]، ومع [[{ overflow: "reject" }]] بيرمي [[RangeError]]. و [[typeof Temporal]] في Node 24 بيطلع [["undefined"]]، وعشان كده الـ polyfill.`, sol: R`**الإجابة النموذجية:** في صفحة [[Temporal.PlainDate.prototype.add()]] على MDN، الـ parameter التاني [[options]] فيه [[overflow]]: القيمة الافتراضية [["constrain"]] (لو اليوم مش موجود يقف على آخر يوم في الشهر)، و [["reject"]] بترمي [[RangeError]].

~~~bash
npm init -y
npm i @js-temporal/polyfill
~~~

~~~js overflow.mjs
import { Temporal } from "@js-temporal/polyfill";

const leap = Temporal.PlainDate.from("2028-02-29");
console.log(leap.add({ years: 1 }).toString());
try {
  leap.add({ years: 1 }, { overflow: "reject" });
} catch (err) {
  console.log(err.name + ": " + err.message);
}
console.log(typeof globalThis.Temporal);
~~~

~~~text الناتج (node overflow.mjs، Node 24، @js-temporal/polyfill 0.5.1)
2029-02-28
RangeError: value out of range: 1 <= 29 <= 28
undefined
~~~

- [[add({ years: 1 })]] على ٢٩ فبراير 2028: سنة 2029 مفيهاش ٢٩ فبراير، فبالافتراضي [["constrain"]] وقف على **٢٨ فبراير**.
- مع [[{ overflow: "reject" }]]: رمى [[RangeError]]، والرسالة بتقول اليوم 29 والحد 28 (نص الرسالة من الـ polyfill، والنسخة اللي جوه المتصفح ممكن تكتبها بشكل تاني).
- [[typeof globalThis.Temporal]] بـ [["undefined"]]: Node 24 لسه مفيهوش Temporal جواه، فالـ import من الـ polyfill هو اللي جاب الـ object. (الملف [[.mjs]] عشان [[import]] يشتغل من غير [[package.json]] فيه [["type": "module"]].)

**إمتى reject:** لما «اليوم ده بالظبط» يفرق وتحب تعرف إنه مش موجود بدل ما يتغيّر في السكوت، زي تاريخ جاي من يوزر.

**الغلطة الشائعة:** تفتكر إن Temporal زي Date بيرحّل الزيادة لـ ١ مارس. لأ: الافتراضي [["constrain"]] بيقف على آخر الشهر، وده نفس اللي عملناه بإيدنا في [[addMonths]].`  },
            { lvl: 'تطبيق', t: R`قارن وقيس: احسب الأيام من ٢٩ سبتمبر لـ ٢٥ ديسمبر 2026 بـ ٣ طرق: Date عادي (فرق الـ ms على 86400000)، و [[differenceInCalendarDays]] من date-fns، و [[PlainDate.until]]. وبعدين خلّي الأول الساعة 23:00 والتاني الساعة 01:00 وجرّب الطريقتين الأولانيين تاني.`, done: R`التلاتة بيدّوا [[87]] للتواريخ من غير وقت (طريقة الـ ms في القاهرة بالظبط [[87.04]] مش 87، لأن الفترة فيها ليلة رجوع الساعة، فلازم تقرّب). مع الساعات، طريقة الـ ms بتطلع رقم بكسور حوالي [[86.1]] (و Math.floor بيدّي 86، والرقم بالظبط بيتغير حسب التوقيت الصيفي في جهازك)، و date-fns لسه [[87]] لأنها بتعد أيام تقويم.`, sol: R`~~~bash
npm i date-fns @js-temporal/polyfill
~~~

~~~js days-compare.mjs
import { differenceInCalendarDays } from "date-fns";
import { Temporal } from "@js-temporal/polyfill";

const DAY = 86400000;
function compare(a, b, label) {
  const byMs = (b - a) / DAY;
  console.log(label);
  console.log("  ms / 86400000:          ", byMs, "→ floor", Math.floor(byMs));
  console.log("  differenceInCalendarDays:", differenceInCalendarDays(b, a));
}

compare(new Date(2026, 8, 29), new Date(2026, 11, 25), "من غير وقت:");
console.log("  PlainDate.until:         ", Temporal.PlainDate.from("2026-09-29").until("2026-12-25").days);
compare(new Date(2026, 8, 29, 23, 0), new Date(2026, 11, 25, 1, 0), "23:00 → 01:00:");
~~~

~~~text الناتج (node days-compare.mjs، Node 24، TZ=Africa/Cairo، date-fns 4.4.0)
من غير وقت:
  ms / 86400000:           87.04166666666667 → floor 87
  differenceInCalendarDays: 87
  PlainDate.until:          87
23:00 → 01:00:
  ms / 86400000:           86.125 → floor 86
  differenceInCalendarDays: 87
~~~

~~~text نفس الملف بـ TZ=UTC (سطور الـ ms بس اللي اتغيّرت)
من غير وقت:
  ms / 86400000:           87 → floor 87
  differenceInCalendarDays: 87
  PlainDate.until:          87
23:00 → 01:00:
  ms / 86400000:           86.08333333333333 → floor 86
  differenceInCalendarDays: 87
~~~

**اللي اتقاس:**

- **من غير وقت:** التلاتة بيدّوا 87، بس طريقة الـ ms في القاهرة طلعت **87.0417** مش 87 بالظبط. ليه؟ القاهرة رجّعت الساعة ليلة ٢٩ أكتوبر، فالفترة دي فيها ساعة زيادة (1/24 = 0.0417 يوم). وبـ [[TZ=UTC]] طلعت 87 بالظبط: الرقم بيتغير حسب توقيت جهازك.
- **23:00 لـ 01:00:** طريقة الـ ms طلعت 86.125، و [[Math.floor]] بيدّي **86**، لأن الفترة أقصر من ٨٧ يوم كامل. و [[differenceInCalendarDays]] لسه **87**، لأنها بتعد أيام تقويم: من يوم ٢٩ سبتمبر ليوم ٢٥ ديسمبر، مهما كانت الساعة.
- [[PlainDate.until]]: تواريخ من غير وقت ولا zone أصلًا، فمفيش حاجة تلخبطها.

**تختار إيه:** لو السؤال «فاضل كام يوم في النتيجة اللي على الحيطة» يبقى أيام تقويم (date-fns أو PlainDate). لو السؤال «عدّى كام مرة ٢٤ ساعة» يبقى فرق ms. الاتنين أسئلة مختلفة.

**الغلطة الشائعة:** [[Math.round]] على فرق الـ ms عشان «تصلّح» الكسور. بيشتغل في الحالة الأولى (87.04 ← 87)، وبيغلط في التانية (86.125 ← 86) وانت عايز 87.`  },
            { lvl: 'تحدي', t: R`محاكاة اجتماع يومي: بـ Temporal لاقي أول تغيير توقيت جاي في القاهرة بعد يونيو 2026 بـ [[getTimeZoneTransition("next")]]. وبعدين اعمل اجتماع الساعة 12 الضهر يوم التغيير وزوّد عليه [[{ days: 1 }]] مرة و [[{ hours: 24 }]] مرة.`, done: R`التغيير الجاي ليلة ٢٩ أكتوبر 2026 (اللحظة [[2026-10-29T21:00:00Z]]، والساعة بترجع من 24:00 لـ 23:00). و [[days: 1]] بيدّي [[2026-10-30T12:00:00+02:00]] (نفس الساعة على الحيطة)، و [[hours: 24]] بيدّي [[11:00]] لأن اليوم ده ٢٥ ساعة.`, sol: R`~~~js transition.mjs
import { Temporal } from "@js-temporal/polyfill";

const june = Temporal.ZonedDateTime.from("2026-06-01T00:00[Africa/Cairo]");
const change = june.getTimeZoneTransition("next");
console.log("التغيير الجاي:", change.toString());
console.log("كـ Instant:   ", change.toInstant().toString());
console.log("قبله بدقيقة:  ", change.subtract({ minutes: 1 }).toString());

const meeting = change.toPlainDate().toZonedDateTime({ timeZone: "Africa/Cairo", plainTime: "12:00" });
console.log("الاجتماع:      ", meeting.toString());
console.log("+ days: 1     ", meeting.add({ days: 1 }).toString());
console.log("+ hours: 24   ", meeting.add({ hours: 24 }).toString());
console.log("طول اليوم ده: ", meeting.hoursInDay, "ساعة");
~~~

~~~text الناتج (node transition.mjs، Node 24، @js-temporal/polyfill 0.5.1)
التغيير الجاي: 2026-10-29T23:00:00+02:00[Africa/Cairo]
كـ Instant:    2026-10-29T21:00:00Z
قبله بدقيقة:   2026-10-29T23:59:00+03:00[Africa/Cairo]
الاجتماع:       2026-10-29T12:00:00+03:00[Africa/Cairo]
+ days: 1      2026-10-30T12:00:00+02:00[Africa/Cairo]
+ hours: 24    2026-10-30T11:00:00+02:00[Africa/Cairo]
طول اليوم ده:  25 ساعة
~~~

**كل سطر:**

- [[ZonedDateTime.from("2026-06-01T00:00[Africa/Cairo]")]]: لحظة + zone. الـ [[[Africa/Cairo]]] في آخر النص هو اللي بيخلي Temporal يعرف قواعد القاهرة.
- [[getTimeZoneTransition("next")]]: أول لحظة بعد كده الـ offset بيتغيّر فيها. طلعت [[2026-10-29T23:00:00+02:00]]، يعني اللحظة [[21:00Z]].
- **«قبله بدقيقة»:** [[23:59+03:00]]. يعني الساعة كانت بتعدّي ١١:٥٩ بالليل بتوقيت +3، وبدل ما تبقى ١٢ رجعت ١١ بتوقيت +2. الساعة من ١١ لـ ١٢ بالليل اتعاشت مرتين.
- [[toPlainDate().toZonedDateTime({ timeZone, plainTime: "12:00" })]]: نفس اليوم (٢٩ أكتوبر) الساعة ١٢ الضهر.
- **[[add({ days: 1 })]]:** «نفس الساعة بكرة على الحيطة»: [[2026-10-30T12:00+02:00]].
- **[[add({ hours: 24 })]]:** ٢٤ ساعة بالظبط: [[11:00]]، لأن يوم ٢٩ فيه ٢٥ ساعة ([[hoursInDay]] بـ 25).

**للاجتماع اليومي:** [[days: 1]] هو الصح: الناس متعودة إن الاجتماع الساعة ١٢. و [[hours: 24]] صح للحاجات اللي بتتقاس بالمدة، زي «اللينك ده صالح ٢٤ ساعة».

**الغلطة الشائعة:** تخزّن الاجتماعات المتكررة كلحظة UTC وتزوّد [[86400000]] كل يوم. بعد ليلة التغيير كل الاجتماعات بتتزحلق ساعة.`  },
          ],
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
            R`بيستورد [[Temporal]] من الـ polyfill الرسمي، عشان الكود يشتغل في أي بيئة لسه معندهاش Temporal. في Node 26 و Chrome و Firefox الحديثين [[Temporal]] موجود global، فتقدر تشيل السطر ده.`,
            R`[[PlainDate]] تاريخ بس: يوم وشهر وسنة، من غير ساعة ولا time zone. ده المناسب لعيد ميلاد أو ميعاد استحقاق، لأنه مش «لحظة» فمش هيتزحلق يوم لما يتعرض في بلد تاني. والشهور هنا من 1 عادي، مش من 0 زي Date.`,
            R`[[add]] بترجّع object **جديد** (Temporal كله immutable) و [[jan31]] نفسه متغيرش. وبيطبع [[2026-02-28]]: لما اليوم مش موجود في الشهر الجديد بيقف على آخر يوم، مش بيرحّل لـ ٣ مارس زي Date. ولو عايز error بدل كده ادّيله [[overflow: "reject"]].`,
            R`[[ZonedDateTime]] لحظة ومعاها time zone باسمه، والاسم بيتكتب بين قوسين مربعين بعد الوقت. الفرق عن offset ثابت زي [[+03:00]] إنه عارف قواعد التوقيت الصيفي في مصر، فالحسابات بعد كده بتتظبط لوحدها.`,
            R`بيزوّد ٢٤ ساعة حقيقية. ليلة ٢٩ أكتوبر ٢٠٢٦ التوقيت الصيفي في مصر بيخلص، فبعد ٢٤ ساعة الساعة بقت ١١ مش ١٢ والـ offset بقى [[+02:00]]: [[2026-10-30T11:00:00+02:00]] وبعده اسم الـ zone بين قوسين مربعين. ده الصح لو بتحسب مدة (زي «الـ token يخلص بعد ٢٤ ساعة»).`,
            R`[[days: 1]] معناها «نفس الساعة بكرة» على التقويم، فبيطبع ١٢:٠٠ يوم ٣٠ بـ [[+02:00]] مع إن اللي عدّى فعليًا ٢٥ ساعة. ده الصح لمواعيد زي «الاجتماع بكرة نفس الميعاد». والفرق بين السطرين هو الفرق بين مدة وتقويم.`,
            R`[[Instant]] لحظة بس، من غير time zone ولا تقويم، زي اللي جاية من API بـ [[Z]]. هو أقرب حاجة لـ Date القديم، بس مبيعرضش بتوقيت الجهاز من ورا ضهرك.`,
            R`بيحوّل اللحظة لتوقيت القاهرة، وبعدين ياخد الجزء التاريخ بس. فبيطبع [[2026-09-30]] (اليوم اللي بعد تاريخ UTC، زي ما شفنا مع Intl)، وكل خطوة مكتوب فيها انت عايز إيه بدل حيلة [[en-CA]].`,
            R`[[until]] بتحسب المدة من التاريخ الأول لحد التاني وبترجّع [[Duration]]، وبتقبل نص زي [["2026-12-25"]] مش لازم PlainDate. ومن غير options أكبر وحدة بترجعها مع PlainDate هي الأيام، فمش هتلاقي شهور.`,
            R`بيطبع [[87 P87D]]: [[days]] عدد الأيام كرقم، و [[toString()]] بيطبع المدة بصيغة ISO 8601 ([[P]] = period و [[D]] = أيام). لو عايزها شهور وأيام ادّي [[until]] الـ option [[largestUnit: "month"]] فتبقى [[P2M26D]].`,
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

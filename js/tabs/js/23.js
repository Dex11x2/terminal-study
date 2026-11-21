// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: R`Intl كامل: الأرقام والتواريخ والقوايم والجمع واللغات`,
      l: 2,
      time: R`حوالي ٧ ساعات`,
      n: R`[[Intl]] هو اللي بيخلي نفس الكود يكتب «في سلتك ١١ منتجًا، الإجمالي ١٬٩٩٩٫٥٠ ج.م.» لليوزر المصري و «11 items, EGP 1,999.50» للإنجليزي، من غير جداول بإيدك. الوحدة دي بتكمّل الأرقام والتواريخ اللي اتعلمتها، وبتضيف الجمع العربي بحالاته الست، والقوايم بـ «و» و «أو»، وأسامي اللغات والبلاد، والمدد، والترتيب، وإزاي تعرف الـ runtime اختار إيه فعلًا`,
      pre: [
        { to: "js/Number: toFixed و toString و toLocaleString", why: R`[[toLocaleString]] و [[style: "currency"]] و [[notation: "compact"]] متشرحين هناك، وهنا هنكمّل بالـ formatter نفسه و [[formatToParts]] و [[formatRange]]` },
        { to: "js/UTC و Intl.DateTimeFormat", why: R`[[timeZone]] و [[dateStyle]] وقاعدة «خزّن UTC واعرض بتوقيت اليوزر» أساس درس التواريخ هنا` },
        { to: "js/Intl.RelativeTimeFormat", why: R`[[timeAgo]] والـ [[numeric: "auto"]] هناك، وهنا [[formatToParts]] و [[resolvedOptions]] وفخ الـ style القصير في العربي` },
        { to: "js/Intl.Segmenter", why: R`أول [[Intl]] object شغّلته، ومعاه فكرة الـ locale و [[supportedLocalesOf]] و [[resolvedOptions]]` },
        { to: "js/toUpperCase و toLocaleUpperCase", why: R`[[Intl.Collator]] و [[sensitivity: "base"]] اتقاسوا هناك، وهنا باقي الـ options والترتيب الطبيعي للأرقام` },
      ],
      goal: [
        R`تعرف الـ locale بيتكوّن من إيه، وتطلب لغة اليوزر وتعرف بـ [[resolvedOptions]] الـ runtime اختار إيه فعلًا بدل ما تخمّن.`,
        R`تكتب فلوس وأرقام وتواريخ ونطاقات («من ٢٥٠ لـ ٩٠٠ ج.م.»، «٢١–٢٤ نوفمبر») بالعربي والإنجليزي، وتلوّن أجزاءها بـ [[formatToParts]].`,
        R`تكتب رسايل جمع عربي صح بـ [[Intl.PluralRules]] («رسالتين» و «٣ رسائل» و «١١ رسالة»)، وقوايم وأسامي لغات وبلاد ومدد من غير ترجمة بإيدك.`,
        R`تبني مكتبة i18n صغيرة متختبرة بـ [[node --test]]، وتعرف الفروق بين Node والمتصفح في الحروف المخفية والمسافات.`,
      ],
      use: {
        prog: R`أي واجهة فيها رقم أو تاريخ أو عدد: سلة، وفاتورة، وإشعارات، وتعليقات، ومواعيد. والباجات المشهورة: «١ رسائل»، و «سارة, منى and عمر»، وأرقام لاتيني لمصري، وتاريخ بتوقيت السيرفر.`,
        work: R`مواقع ومتاجر بلغتين، وفواتير بلغة العميل، وصفحات حجز بالتاريخ الهجري جنب الميلادي، ولوحات تحكم فيها «من كام لكام». كله في مشاريع الوحدة.`,
        cs: R`Internationalization (i18n) و localization (l10n) مفاهيم في كل لغة برمجة، و CLDR و ICU هما نفس البيانات اللي Java و Python و Android و iOS بيستخدموها.`,
      },
      projects: [
        { lvl: 'صغير', t: R`سطر السلة بلغتين`, what: R`سكربت [[cart-line.js]] فيه دالة [[cartLine(locale, names, total, currency)]] بترجّع سطر ملخص السلة: «في سلتك ٣ منتجات: قهوة وشاي وكيكة. الإجمالي ١٣٦٫٥٠ ج.م.» بالعربي، و «3 items in your cart: coffee, tea, and cake. Total EGP 136.50» بالإنجليزي. الجمع من [[Intl.PluralRules]] بالست حالات العربي، والقايمة من [[Intl.ListFormat]] (ولو أكتر من ٣ منتجات: «و٨ غيرهم»)، والإجمالي من [[Intl.NumberFormat]]، والـ formatters في [[Map]] كاش. والسلة الفاضية جملة لوحدها في اللغتين. من دروس «Intl.PluralRules» و «Intl.ListFormat» و «Intl.NumberFormat».`, done: R`[[node cart-line.js]] بيطبع ١٠ سطور: بالعربي ٠ «سلتك فاضية» و ١ «منتج واحد» و ٢ «منتجين» و ٣ «٣ منتجات» و ١١ «١١ منتجًا: ... و٨ غيرهم» و ١٠٠ «١٠٠ منتج»، وبالإنجليزي «1 item» و «2 items» وفاصلة قبل and في التلاتة. والأرقام في الجملة العربي كلها أرقام مصر.`, sol: R`## هتشوف إيه

نفس الدالة بتكتب ٦ أعداد بالعربي و ٤ بالإنجليزي. كل سطر فيه ٣ حاجات بتتغيّر مع العدد: الجملة نفسها (الجمع)، والقايمة (الواو أو and، والاختصار)، والفلوس. الناتج متمرّر على [[show-hidden.js]] (درس «Intl: الـ locale والتفاوض»)، فالحروف المخفية في الفلوس مكتوبة بأسمائها:

~~~text الناتج: node cart-line.js | node show-hidden.js
  0 سلتك فاضية
  1 في سلتك منتج واحد: قهوة. الإجمالي <RLM>٤٥٫٥٠<NBSP>ج.م.<RLM>
  2 في سلتك منتجين: قهوة وشاي. الإجمالي <RLM>٩١٫٠٠<NBSP>ج.م.<RLM>
  3 في سلتك ٣ منتجات: قهوة وشاي وكيكة. الإجمالي <RLM>١٣٦٫٥٠<NBSP>ج.م.<RLM>
 11 في سلتك ١١ منتجًا: قهوة وشاي وكيكة و٨ غيرهم. الإجمالي <RLM>٥٠٠٫٥٠<NBSP>ج.م.<RLM>
100 في سلتك ١٠٠ منتج: قهوة وشاي وكيكة و٩٧ غيرهم. الإجمالي <RLM>٤٬٥٥٠٫٠٠<NBSP>ج.م.<RLM>
  0 Your cart is empty
  1 1 item in your cart: coffee. Total EGP<NBSP>45.50
  2 2 items in your cart: coffee and tea. Total EGP<NBSP>91.00
  3 3 items in your cart: coffee, tea, and cake. Total EGP<NBSP>136.50
~~~

## الكود

~~~js cart-line.js
// cart-line.js: سطر السلة بالعربي والإنجليزي، والجمع والقايمة والفلوس صح
const TEMPLATES = {
  ar: {
    zero: "سلتك فاضية",
    one: "في سلتك منتج واحد: {items}. الإجمالي {total}",
    two: "في سلتك منتجين: {items}. الإجمالي {total}",
    few: "في سلتك {n} منتجات: {items}. الإجمالي {total}",
    many: "في سلتك {n} منتجًا: {items}. الإجمالي {total}",
    other: "في سلتك {n} منتج: {items}. الإجمالي {total}",
  },
  en: {
    zero: "Your cart is empty",
    one: "{n} item in your cart: {items}. Total {total}",
    other: "{n} items in your cart: {items}. Total {total}",
  },
};

const cache = new Map();
function tools(locale, currency) {
  const key = locale + "|" + currency;
  if (!cache.has(key)) {
    cache.set(key, {
      plural: new Intl.PluralRules(locale),
      list: new Intl.ListFormat(locale, { type: "conjunction" }),
      number: new Intl.NumberFormat(locale),
      money: new Intl.NumberFormat(locale, { style: "currency", currency }),
    });
  }
  return cache.get(key);
}

function cartLine(locale, names, total, currency = "EGP") {
  const lang = new Intl.Locale(locale).language;
  const t = TEMPLATES[lang] ?? TEMPLATES.en;
  const f = tools(locale, currency);
  const n = names.length;
  // الصفر حالة خاصة في الإنجليزي كمان، مع إن PluralRules بيقول other
  const category = n === 0 ? "zero" : f.plural.select(n);
  const template = t[category] ?? t.other;
  const shown = n > 3 ? [...names.slice(0, 3), lang === "ar" ? f.number.format(n - 3) + " غيرهم" : f.number.format(n - 3) + " more"] : names;
  return template
    .replace("{n}", f.number.format(n))
    .replace("{items}", f.list.format(shown))
    .replace("{total}", f.money.format(total));
}

const AR = ["قهوة", "شاي", "كيكة", "عصير", "مياه"];
const EN = ["coffee", "tea", "cake", "juice", "water"];
const make = (base, n) => Array.from({ length: n }, (_, i) => base[i % base.length]);

for (const n of [0, 1, 2, 3, 11, 100]) console.log(String(n).padStart(3), cartLine("ar-EG", make(AR, n), n * 45.5));
for (const n of [0, 1, 2, 3]) console.log(String(n).padStart(3), cartLine("en-US", make(EN, n), n * 45.5));
~~~

## كل حتة بتعمل إيه

- **[[TEMPLATES]]**: جملة لكل فئة جمع. العربي فيه الست، والإنجليزي [[one]] و [[other]] بس (ده كل اللي [[pluralCategories]] بتاعته). و [[zero]] في الإنجليزي **قرار UI** («Your cart is empty» أحسن من «0 items in your cart»)، مش قاعدة لغة.
- **[[tools(locale, currency)]]**: ٤ formatters لكل (لغة + عملة)، بتتعمل أول مرة بس وتتخزن في [[Map]]. الـ ١٠ سطور عملوا ٨ formatters بس (٤ لكل لغة) مش ٤٠.
- **[[new Intl.Locale(locale).language]]**: [["ar-EG"]] ← [["ar"]]، عشان أي بلد عربي ([["ar-SA"]]) ياخد نفس الجمل. ولغة مش موجودة بترجع للإنجليزي بـ [[??]].
- **[[n === 0 ? "zero" : f.plural.select(n)]]**: العربي [[select(0)]] أصلًا [[zero]]، بس الإنجليزي [[other]]، فالسطر ده بيخلي الصفر حالة خاصة في كل اللغات.
- **[[t[category] ?? t.other]]**: لو الترجمة ناقصها فئة، [[other]] بدل [[undefined]].
- **«و٨ غيرهم»**: أول ٣ أسامي، والرابع نص «٨ غيرهم» برقم من [[NumberFormat]] بنفس اللغة، و [[ListFormat]] بيعامله كعنصر عادي فيحط الواو.
- **[[replace("{n}", ...)]]**: placeholders بسيطة. مشروع «i18n-mini» الكبير بيعمم الفكرة دي.

## الغلطات اللي ممكن تقع فيها

- **«٢ منتجات»**: لو كتبت الجملة بـ [[n === 1]] وبس. العربي محتاج [[two]] من غير رقم («منتجين»).
- **أرقام لاتيني في جملة عربي**: لو استخدمت [[String(n)]] بدل [[f.number.format(n)]]، السطر يطلع «في سلتك 11 منتجًا» والإجمالي بأرقام عربي جنبه.
- **[[join(", ")]] للقايمة**: «قهوة, شاي, كيكة» بفاصلة إنجليزي ومن غير واو.
- **formatters جوه [[cartLine]]**: بيشتغل، بس لو بترسم ١٠٠٠ سلة في صفحة الأدمن هيبقى أبطأ بعشرات المرات (اتقاس في درس «Intl: الـ locale والتفاوض»).` },
        { lvl: 'صغير', t: R`كارت إعدادات اللغة`, what: R`سكربت [[locale-card.js]] بياخد tag من سطر الأوامر ([[node locale-card.js ar-EG]]) ويطبع كارت بكل حاجة عن اللغة والبلد دي، مكتوب بلغتها هي: اسمها، والبلد، والاتجاه، وأول يوم في الأسبوع، وأيام الإجازة، والساعة ١٢ ولا ٢٤ بمثال، والأرقام بمثال، والتقاويم بأساميها، والـ time zones. الـ tag من غير بلد ([["ar"]]) بيتكمّل بـ [[maximize()]]، والـ tag البايظ ([["AR_eg"]]) بيطبع رسالة واضحة و exit code 1. من دروس «Intl.Locale» و «Intl.DisplayNames» و «Intl: الـ locale والتفاوض».`, done: R`[[ar-EG]] بيطبع «أول الأسبوع: السبت» و «الويك إند: الجمعة والسبت» و «rtl» و «٥:٠٥ م»، و [[en-US]] بيطبع «Sunday» و ٢٩ zone مختصرين لـ ٣ و «26 كمان»، و [[ar]] بيطبع أرقام عربي مش لاتيني، و [["AR_eg"]] بيخرج بـ 1 من غير stack trace.`, sol: R`## هتشوف إيه

كارت من ١١ سطر لكل tag. السطور كلها جاية من CLDR: مفيش ولا جدول أيام أو بلاد أو اتجاهات في الكود.

~~~text الناتج: node locale-card.js ar-EG، و en-US، و ar (متمرّر على show-hidden.js)
$ node locale-card.js ar-EG
الـ tag           : ar-EG
الكامل (maximize) : ar-Arab-EG
اسمها بلغتها      : العربية (مصر)
البلد             : EG = مصر
الاتجاه           : rtl
أول الأسبوع       : السبت
الويك إند         : الجمعة والسبت
الساعة            : h12 ← ٥:٠٥ م (Africa/Cairo)
الأرقام           : arab ← ١٬٢٣٤٬٥٦٧٫٥
التقاويم          : التقويم الميلادي | التقويم القبطي | التقويم الهجري | التقويم الهجري المدني | التقويم الهجري (الحسابات الفلكية)
المناطق الزمنية   : Africa/Cairo

$ node locale-card.js en-US
الـ tag           : en-US
الكامل (maximize) : en-Latn-US
اسمها بلغتها      : American English
البلد             : US = United States
الاتجاه           : ltr
أول الأسبوع       : Sunday
الويك إند         : Saturday and Sunday
الساعة            : h12 ← 3:05 PM (UTC)
الأرقام           : latn ← 1,234,567.5
التقاويم          : Gregorian Calendar
المناطق الزمنية   : America/Adak, America/Anchorage, America/Boise و 26 كمان

$ node locale-card.js ar
الـ tag           : ar
الكامل (maximize) : ar-Arab-EG
اسمها بلغتها      : العربية
البلد             : EG = مصر
الاتجاه           : rtl
أول الأسبوع       : السبت
الويك إند         : الجمعة والسبت
الساعة            : h12 ← ٥:٠٥ م (Africa/Cairo)
الأرقام           : arab ← ١٬٢٣٤٬٥٦٧٫٥
التقاويم          : التقويم الميلادي | التقويم القبطي | التقويم الهجري | التقويم الهجري المدني | التقويم الهجري (الحسابات الفلكية)
المناطق الزمنية   : Africa/Cairo
~~~

~~~text الناتج: node locale-card.js AR_eg
الـ tag ده مش صالح: "AR_eg" (Incorrect locale information provided)
الشكل الصح: لغة-بلد زي ar-EG أو en-US، بشرطة مش _
exit code: 1
~~~

## الكود

~~~js locale-card.js
// locale-card.js: كارت بكل إعدادات لغة وبلد، مكتوب بلغة اليوزر نفسها
const tag = process.argv[2] ?? "ar-EG";

let loc;
try {
  loc = new Intl.Locale(Intl.getCanonicalLocales(tag)[0]);
} catch (e) {
  console.error("الـ tag ده مش صالح: " + JSON.stringify(tag) + " (" + e.message + ")");
  console.error("الشكل الصح: لغة-بلد زي ar-EG أو en-US، بشرطة مش _");
  process.exit(1);
}

// لو مفيش بلد بنكمّلها من maximize، بس بنفرمت بـ لغة-بلد من غير script
const full = loc.region ? loc : loc.maximize();
const ui = full.language + "-" + full.region;
const langNames = new Intl.DisplayNames(ui, { type: "language" });
const regionNames = new Intl.DisplayNames(ui, { type: "region" });
const calNames = new Intl.DisplayNames(ui, { type: "calendar" });
const dayName = new Intl.DateTimeFormat(ui, { weekday: "long", timeZone: "UTC" });
// ٢٣ نوفمبر ٢٠٢٦ كان يوم اتنين، فاليوم رقم d (١ = الاتنين) هو 22 + d
const weekday = d => dayName.format(new Date(Date.UTC(2026, 10, 22 + d)));
const list = new Intl.ListFormat(ui, { type: "conjunction" });

const week = full.getWeekInfo();
const hc = full.getHourCycles()[0];
const sample = new Date("2026-11-21T15:05:00Z");
const zones = full.getTimeZones() ?? [];
// بلد فيها أكتر من zone (أمريكا ٢٩): مش هنخمّن، نعرض بـ UTC ونقول كده
const zone = zones.length === 1 ? zones[0] : "UTC";

const rows = [
  ["الـ tag", tag + (tag !== loc.toString() ? "  ←  " + loc.toString() : "")],
  ["الكامل (maximize)", full.maximize().toString()],
  ["اسمها بلغتها", langNames.of(loc.baseName)],
  ["البلد", full.region + " = " + regionNames.of(full.region)],
  ["الاتجاه", full.getTextInfo().direction],
  ["أول الأسبوع", weekday(week.firstDay)],
  ["الويك إند", list.format(week.weekend.map(weekday))],
  ["الساعة", hc + " ← " + new Intl.DateTimeFormat(ui, { timeStyle: "short", timeZone: zone }).format(sample) + " (" + zone + ")"],
  ["الأرقام", full.getNumberingSystems()[0] + " ← " + new Intl.NumberFormat(ui).format(1234567.5)],
  ["التقاويم", full.getCalendars().map(c => calNames.of(c)).join(" | ")],
  ["المناطق الزمنية", zones.length > 3 ? zones.slice(0, 3).join(", ") + " و " + (zones.length - 3) + " كمان" : zones.join(", ") || "مفيش بلد"],
];
const w = Math.max(...rows.map(r => r[0].length));
for (const [k, v] of rows) console.log(k.padEnd(w) + " : " + v);
~~~

## كل حتة بتعمل إيه

- **[[Intl.getCanonicalLocales(tag)[0]]] جوه [[try]]**: بيظبط [["en-us"]] لـ [["en-US"]]، والبايظ بيروح للـ [[catch]] برسالة فيها الشكل الصح و [[process.exit(1)]].
- **[[full]]**: لو مفيش بلد، [[maximize()]] بتكمّلها ([["ar"]] ← مصر)، عشان [[getTimeZones()]] محتاجة بلد.
- **[[ui]] = لغة-بلد بس**: الكارت بيتكتب بلغة الـ tag نفسه، و formatters الأرقام والتاريخ بتاخد [["ar-EG"]] مش [["ar-Arab-EG"]] (الغلطة الأولى تحت).
- **[[weekday(d)]]**: ٢٣ نوفمبر ٢٠٢٦ يوم اتنين، فاليوم رقم [[d]] من [[getWeekInfo()]] (١ = الاتنين) هو [[22 + d]] نوفمبر، و [[timeZone: "UTC"]] عشان التاريخ ميزحفش على جهاز في توقيت تاني.
- **[[list.format(week.weekend.map(weekday))]]**: أيام الإجازة بأساميها في جملة بالواو.
- **الساعة**: الـ [[hourCycle]] الأساسي من [[getHourCycles()[0]]]، ومثال حقيقي لنفس اللحظة. لو البلد فيها zone واحدة بنستخدمها، ولو أكتر (أمريكا) بنعرض UTC ونقول كده (الغلطة التانية).
- **التقاويم بأساميها**: [[DisplayNames]] بـ [[type: "calendar"]] حوّل [["islamic-tbla"]] لـ «التقويم الهجري (الحسابات الفلكية)».
- **[[padEnd(w)]]**: [[w]] أطول عنوان، فالـ «:» تحت بعض.

## الغلطات اللي حصلت وأنا ببنيه

1. **[["ar"]] طلع بأرقام لاتيني:** أول نسخة كانت [[const ui = full.baseName]]، يعني [["ar-Arab-EG"]] بعد [[maximize()]]. وسطر الأرقام طلع «arab ← 1,234,567.5»: البيانات بتقول عربي والناتج لاتيني! السبب: [[new Intl.NumberFormat("ar-Arab-EG")]] بيتفاوض لـ [["ar"]] (اتأكدت بـ [[resolvedOptions().locale]])، و [["ar"]] لوحدها لاتيني. الحل: [[full.language + "-" + full.region]].
2. **[["en-US"]] الساعة «5:05 AM»:** أول نسخة كانت بتاخد [[zones[0]]]، وأول zone في أمريكا [["America/Adak"]] (ألاسكا)، ٣:٠٥ م UTC هناك ٥:٠٥ الصبح. الكارت مش لازم يخمّن مدينة اليوزر: zone واحدة نستخدمها، أكتر من واحدة نعرض UTC ونكتبها جنب الساعة.` },
        { lvl: 'متوسط', t: R`عرض نطاق السعر في المتجر`, what: R`ملف [[price-range.js]] فيه دالتين لصفحة منتج أو فلتر بحث: [[priceRange(min, max, { locale, currency })]] بترجّع نص «من كام لكام» بـ [[formatRange]]، و [[priceRangeHtml(...)]] بترجّع HTML فيه أرقام البداية والنهاية في [[<b class="startRange">]] و [[<b class="endRange">]] والعملة في [[<span class="cur">]] و [[~]] في [[<span class="approx">]]، من [[formatRangeToParts]]، وعليه [[dir]] و [[lang]] صح. الأسعار الكبيرة (١٠٠ ألف وفوق) بتتكتب مختصرة («١٥٠ ألف – ٢٫٥ مليون»)، والسعر الواحد من غير [[~]]، والمقلوب بيتعدل، والسالب و [[NaN]] بيترفضوا برسالة. بيتصدّر بـ [[module.exports]] ويتشغّل لوحده كتجربة. من دروس «Intl.NumberFormat» و «Intl.Locale».`, done: R`[[node price-range.js]] بيطبع ١٠ سطور نص و ٣ HTML وسطر خطأ: ٢٥٠–٩٠٠ و ٩٠٠–٢٥٠ نفس الناتج، و ١٢٠٠–١٢٠٠ من غير [[~]]، و ٩٩٫٦–١٠٠٫٤ بـ [[~]]، و ١٥٠٠٠٠–٢٥٠٠٠٠٠ مختصر، والعربي «ج.م.» مرة واحدة، والـ HTML العربي [[dir="rtl"]]، و [[NaN]] بيطبع [[RangeError]] بالعربي.`, sol: R`## هتشوف إيه

لكل لغة ٥ حالات: نطاق عادي، ونفس النطاق مقلوب، وسعر واحد، وطرفين بيبقوا نفس الرقم بعد التقريب، ونطاق كبير. وبعدهم ٣ نسخ HTML وسطر خطأ:

~~~text الناتج: node price-range.js | node show-hidden.js
ar-EG    250     900 <RLM>٢٥٠–٩٠٠<NBSP>ج.م.<RLM>
ar-EG    900     250 <RLM>٢٥٠–٩٠٠<NBSP>ج.م.<RLM>
ar-EG   1200    1200 <RLM>١٬٢٠٠<NBSP>ج.م.<RLM>
ar-EG   99.6   100.4 ~<RLM>١٠٠<NBSP>ج.م.<RLM>
ar-EG 150000 2500000 <RLM>١٥٠<NBSP>ألف<NBSP>ج.م.<RLM> – <RLM>٢٫٥<NBSP>مليون<NBSP>ج.م.<RLM>
en-US    250     900 EGP<NBSP>250–900
en-US    900     250 EGP<NBSP>250–900
en-US   1200    1200 EGP<NBSP>1,200
en-US   99.6   100.4 ~EGP<NBSP>100
en-US 150000 2500000 EGP<NBSP>150K – EGP<NBSP>2.5M
<span class="price" dir="rtl" lang="ar-EG"><RLM><b class="startRange">٢٥٠</b>–<b class="endRange">٩٠٠</b><NBSP><span class="cur">ج.م.</span><RLM></span>
<span class="price" dir="ltr" lang="en-US"><span class="cur">$</span><b class="startRange">150K</b> – <span class="cur">$</span><b class="endRange">2.5M</b></span>
<span class="price" dir="ltr" lang="en-US"><span class="approx" title="تقريبًا">~</span><span class="cur">$</span><b class="shared">100</b></span>
RangeError: السعر لازم رقم موجب: NaN و 5
~~~

## الكود

~~~js price-range.js
// price-range.js: «من كام لكام» لصفحة منتج أو فلتر بحث، بالعربي والإنجليزي، نص و HTML
const cache = new Map();
function formatter(locale, currency, compact) {
  const key = [locale, currency, compact].join("|");
  if (!cache.has(key)) {
    cache.set(key, new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      notation: compact ? "compact" : "standard",
      maximumFractionDigits: compact ? 1 : 0,
    }));
  }
  return cache.get(key);
}

function check(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0) {
    throw new RangeError("السعر لازم رقم موجب: " + min + " و " + max);
  }
  return min > max ? [max, min] : [min, max];
}

function priceRange(min, max, { locale = "ar-EG", currency = "EGP" } = {}) {
  [min, max] = check(min, max);
  const f = formatter(locale, currency, max >= 100000);
  // سعر واحد: format عادي، عشان formatRange بيحط ~ قدامه
  return min === max ? f.format(min) : f.formatRange(min, max);
}

const escapeHtml = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const NUMERIC = new Set(["integer", "group", "decimal", "fraction", "compact"]);

function priceRangeHtml(min, max, { locale = "ar-EG", currency = "EGP" } = {}) {
  [min, max] = check(min, max);
  const f = formatter(locale, currency, max >= 100000);
  const parts = min === max ? f.formatToParts(min).map(p => ({ ...p, source: "startRange" })) : f.formatRangeToParts(min, max);
  // الأجزاء الرقمية اللي جنب بعض ومن نفس الطرف بتتجمع في <b> واحد
  const groups = [];
  for (const p of parts) {
    const kind = NUMERIC.has(p.type) ? "num-" + p.source : p.type;
    const last = groups.at(-1);
    if (last && last.kind === kind && kind.startsWith("num-")) last.text += p.value;
    else groups.push({ kind, text: p.value });
  }
  const body = groups.map(g => {
    const text = escapeHtml(g.text);
    if (g.kind === "currency") return '<span class="cur">' + text + "</span>";
    if (g.kind === "approximatelySign") return '<span class="approx" title="تقريبًا">' + text + "</span>";
    if (g.kind.startsWith("num-")) return '<b class="' + g.kind.slice(4) + '">' + text + "</b>";
    return text;
  }).join("");
  const dir = new Intl.Locale(locale).getTextInfo().direction;
  return '<span class="price" dir="' + dir + '" lang="' + locale + '">' + body + "</span>";
}

module.exports = { priceRange, priceRangeHtml };

if (require.main === module) {
  const cases = [[250, 900], [900, 250], [1200, 1200], [99.6, 100.4], [150000, 2500000]];
  for (const locale of ["ar-EG", "en-US"]) {
    for (const [a, b] of cases) console.log(locale, String(a).padStart(6), String(b).padStart(7), priceRange(a, b, { locale }));
  }
  console.log(priceRangeHtml(250, 900, { locale: "ar-EG" }));
  console.log(priceRangeHtml(150000, 2500000, { locale: "en-US", currency: "USD" }));
  console.log(priceRangeHtml(99.6, 100.4, { locale: "en-US", currency: "USD" }));
  try { priceRange(NaN, 5); } catch (e) { console.log(e.name + ": " + e.message); }
}
~~~

## كل حتة بتعمل إيه

- **[[formatter(locale, currency, compact)]]**: كاش بمفتاح من التلات حاجات. [[compact]] للأسعار الكبيرة بكسر واحد بالكتير («٢٫٥ مليون»)، والعادي من غير كسور (السعر في صفحة منتج مش محتاج قروش).
- **[[check(min, max)]]**: [[Number.isFinite]] بيرفض [[NaN]] و [[Infinity]] والنصوص، والسالب مرفوض، وبيرجّع الطرفين مترتبين. [[formatRange(900, 250)]] نفسه مبيرميش error (بيكتب «900–250»)، فالترتيب مسؤوليتنا.
- **[[min === max ? f.format(min) : f.formatRange(min, max)]]**: السبب في الغلطة الأولى تحت.
- **[[~]] بيفضل لـ ٩٩٫٦–١٠٠٫٤**: الطرفين بقوا «١٠٠» بعد التقريب، و [[~]] هنا معلومة صح («حوالي ١٠٠»).
- **[[groups]] في الـ HTML**: [[formatRangeToParts]] بيقسم «2.5M» لـ ٤ حتت ([[integer]] و [[decimal]] و [[fraction]] و [[compact]])، فالـ loop بيلزق الحتت الرقمية اللي جنب بعض ومن نفس [[source]] في [[<b>]] واحد (الغلطة التانية).
- **[[escapeHtml]]** على كل حتة، و **[[dir]] من [[getTextInfo()]]**: الـ span بيتعرض صح جوه صفحة لغتها مختلفة.
- **[[require.main === module]]**: التجربة بتشتغل لما الملف يتشغّل لوحده بس، ولما حد يعمل [[require]] بياخد الدالتين من غير طباعة.

## الغلطات اللي حصلت وأنا ببنيه

1. **«~١٬٢٠٠ ج.م.» لسعر ثابت:** أول نسخة كانت [[formatRange]] دايمًا، والمنتج اللي سعره ١٢٠٠ من غير نطاق طلع بـ [[~]] قدامه («تقريبًا ١٢٠٠» لسعر مضبوط). [[formatRange]] بيحط [[~]] لما الطرفين نفس النص، حتى لو متساويين أصلًا. الحل: [[format]] لما [[min === max]].
2. **[[<b>]] لكل حرف:** أول نسخة HTML حطت كل part في [[<b>]] لوحده، فـ «2.5M» بقت [[<b>2</b><b>.</b><b>5</b><b>M</b>]]. شكلها في المتصفح واحد، بس الـ HTML تقيل وصعب تعمله style. التجميع حلها: [[<b class="endRange">2.5M</b>]].` },
        { lvl: 'متوسط', t: R`جدول حجوزات العيادة`, what: R`[[bookings.js]] بيعرض حجوزات عيادة (اسم، وبداية ونهاية ISO بـ UTC) لكل حجز في سطر: «النهارده» أو «بكرة» أو «خلال ٤ أيام» بـ [[RelativeTimeFormat]] (بفرق **الأيام في التقويم** بتوقيت القاهرة، مش ٢٤ ساعة)، والتاريخ الميلادي واسم اليوم وجنبه الهجري (أم القرى)، والميعاد من-لحد بـ [[formatRange]]، والمدة بـ [[DurationFormat]] («ساعة و٣٠ دقيقة»). اللحظة «دلوقتي» ثابتة في الكود عشان الناتج ميتغيّرش، والحجز اللي نهايته قبل بدايته بيرمي خطأ باسم صاحبه. بالعربي والإنجليزي. من دروس «Intl.DateTimeFormat: formatToParts و formatRange» و «Intl.DurationFormat» و «Intl.RelativeTimeFormat: formatToParts و resolvedOptions».`, done: R`[[node bookings.js]] بيطبع ٤ سطور عربي و ٤ إنجليزي: سارة «اليوم» و «١٢:٠٠–١٢:٤٥ م» و «٤٥ دقيقة»، وعمر «غدًا» و «ساعة و٣٠ دقيقة»، ومنى (١١:٣٠ بالليل لـ ١٢:٣٠) «خلال ٤ أيام» والتاريخ مكتوب للطرفين، وكريم «خلال ١٣ يومًا» و «٢٤ جمادى الآخرة».`, sol: R`## هتشوف إيه

كل حجز في سطر بـ ٥ خانات مفصولة بـ [[|]]: الاسم، و «إمتى»، واليوم بالتقويمين، والميعاد، والمدة. «دلوقتي» = ٢١ نوفمبر ٢٠٢٦ الساعة ١٠ الصبح في القاهرة.

~~~text الناتج: node bookings.js | node show-hidden.js
سارة | اليوم | السبت، ٢١ نوفمبر (١١ جمادى الآخرة) | ١٢:٠٠–١٢:٤٥ م | ٤٥ دقيقة
عمر | غدًا | الأحد، ٢٢ نوفمبر (١٢ جمادى الآخرة) | ٣:٣٠–٥:٠٠ م | ساعة و٣٠ دقيقة
منى | خلال ٤ أيام | الأربعاء، ٢٥ نوفمبر (١٥ جمادى الآخرة) | ٢٥<RLM>/١١<RLM>/٢٠٢٦، ١١:٣٠ م – ٢٦<RLM>/١١<RLM>/٢٠٢٦، ١٢:٣٠ ص | ساعة
كريم | خلال ١٣ يومًا | الجمعة، ٤ ديسمبر (٢٤ جمادى الآخرة) | ٩:٠٠–٩:٢٠ ص | ٢٠ دقيقة

سارة | today | Saturday, November 21 (Jumada II 11) | 12:00<THINSP>–<THINSP>12:45<NNBSP>PM | 45 minutes
عمر | tomorrow | Sunday, November 22 (Jumada II 12) | 3:30<THINSP>–<THINSP>5:00<NNBSP>PM | 1 hour, 30 minutes
منى | in 4 days | Wednesday, November 25 (Jumada II 15) | 11/25/2026, 11:30<NNBSP>PM<THINSP>–<THINSP>11/26/2026, 12:30<NNBSP>AM | 1 hour
كريم | in 13 days | Friday, December 4 (Jumada II 24) | 9:00<THINSP>–<THINSP>9:20<NNBSP>AM | 20 minutes
~~~

## الكود

~~~js bookings.js
// bookings.js: جدول حجوزات العيادة: التاريخ بالميلادي والهجري، والميعاد من-لحد، والمدة، و«بعد كام يوم»
const ZONE = "Africa/Cairo";
const NOW = new Date("2026-11-21T08:00:00Z"); // ثابت عشان الناتج ميتغيّرش

const bookings = [
  { who: "سارة", start: "2026-11-21T10:00:00Z", end: "2026-11-21T10:45:00Z" },
  { who: "عمر", start: "2026-11-22T13:30:00Z", end: "2026-11-22T15:00:00Z" },
  { who: "منى", start: "2026-11-25T21:30:00Z", end: "2026-11-25T22:30:00Z" },
  { who: "كريم", start: "2026-12-04T07:00:00Z", end: "2026-12-04T07:20:00Z" },
];

function makeFormatters(locale) {
  return {
    day: new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", timeZone: ZONE }),
    hijri: new Intl.DateTimeFormat(locale, { calendar: "islamic-umalqura", day: "numeric", month: "long", timeZone: ZONE }),
    time: new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: ZONE }),
    dur: new Intl.DurationFormat(locale, { style: "long" }),
    rel: new Intl.RelativeTimeFormat(locale, { numeric: "auto" }),
    key: new Intl.DateTimeFormat("en-CA", { timeZone: ZONE }), // YYYY-MM-DD بتوقيت القاهرة
  };
}

// فرق الأيام في التقويم (مش ٢٤ ساعة): ١١:٣٠ بالليل النهارده و ١٢:٣٠ بكرة = يوم واحد
function calendarDays(f, from, to) {
  const a = Date.parse(f.key.format(from)), b = Date.parse(f.key.format(to));
  return Math.round((b - a) / 86400000);
}

function toDuration(ms) {
  const minutes = Math.round(ms / 60000);
  const d = { hours: Math.floor(minutes / 60), minutes: minutes % 60 };
  if (d.hours === 0) delete d.hours;
  if (d.minutes === 0) delete d.minutes;
  return d;
}

function render(locale) {
  const f = makeFormatters(locale);
  return bookings.map(b => {
    const start = new Date(b.start), end = new Date(b.end);
    if (!(end > start)) throw new RangeError(b.who + ": النهاية لازم بعد البداية");
    return [
      b.who,
      f.rel.format(calendarDays(f, NOW, start), "day"),
      f.day.format(start) + " (" + f.hijri.format(start) + ")",
      f.time.formatRange(start, end),
      f.dur.format(toDuration(end - start)),
    ].join(" | ");
  });
}

module.exports = { render, calendarDays, toDuration };
if (require.main === module) {
  for (const locale of ["ar-EG", "en-US"]) console.log(render(locale).join("\n") + "\n");
}
~~~

## كل حتة بتعمل إيه

- **[[ZONE]] و [[NOW]] ثابتين**: كل الـ formatters بـ [[timeZone: ZONE]]، فالناتج واحد على أي جهاز. وفي التطبيق الحقيقي [[NOW]] = [[new Date()]] وبيتبعت للدوال كباراميتر عشان الاختبارات.
- **[[makeFormatters(locale)]]**: ٦ formatters لكل لغة مرة واحدة: [[day]] و [[hijri]] و [[time]] و [[dur]] و [[rel]]، و [[key]] بحيلة [["en-CA"]] (شكلها [[YYYY-MM-DD]]) عشان «اليوم في القاهرة» كنص.
- **[[calendarDays]]**: بيحوّل اللحظتين لتاريخ القاهرة ([["2026-11-21"]])، و [[Date.parse]] على [[YYYY-MM-DD]] بيرجّع نص الليل UTC للتاريخين، فالفرق مضاعف [[86400000]] بالظبط، و [[Math.round]] للأمان. حجز منى ١١:٣٠ بالليل يوم ٢٥ = ٤ أيام في التقويم.
- **[[toDuration(ms)]]**: بيحوّل الـ ms لساعات ودقايق (DurationFormat مبيوزّعش)، ويشيل الصفر عشان «٤٥ دقيقة» متبقاش «٠ ساعة و٤٥ دقيقة».
- **[[if (!(end > start))]]**: لو النهاية قبل البداية أو تساويها، المدة هتبقى سالبة أو [[{}]]، و [[DurationFormat]] بيرمي [[TypeError]] غامض. الفحص ده بيرمي رسالة فيها اسم الحجز.
- **[[f.time.formatRange]]**: formatter فيه ساعة ودقيقة بس. لعمر في نفس اليوم «٣:٣٠–٥:٠٠ م» (م مرة واحدة).

## الغلطات اللي حصلت وأنا ببنيه

1. **سطر منى طويل ومكرر التاريخ:** «٢٥/١١/٢٠٢٦، ١١:٣٠ م – ٢٦/١١/٢٠٢٦، ١٢:٣٠ ص» مع إن الـ formatter مفيهوش تاريخ. ده مش باج: الطرفين في يومين مختلفين، فـ [[formatRange]] زوّد التاريخ لوحده عشان «١١:٣٠ م – ١٢:٣٠ ص» لوحدها ممكن تتفهم ساعة لورا. لو مش عاجبك الشكل، الحل في التصميم (اكتب «لحد ١٢:٣٠ ص اليوم اللي بعده») مش إنك تشيله.
2. **الفرق بالساعات:** لو حسبت [[Math.round((start - NOW) / 86400000)]]، منى (بعد ٤ أيام و ١٣٫٥ ساعة) هتطلع «خلال ٥ أيام» وهي يوم ٢٥ والنهارده ٢١. الأيام في التقويم مش أجزاء من ٢٤ ساعة: ده سبب [[calendarDays]].
3. **«خلال ٤ أيام» مش «بعد ٤ أيام»:** دي صياغة CLDR للمستقبل بالعربي. لو عايز «بعد» لازم جملك انت مع [[PluralRules]] (زي مشروع «سطر السلة»)، و [[RelativeTimeFormat]] مبيقبلش تغيير الكلمة.` },
        { lvl: 'كبير', t: R`i18n-mini: مكتبة رسايل بالعربي والإنجليزي ومتختبرة`, what: R`مكتبة صغيرة تنفع في أي مشروع Node أو متصفح من غير i18next ولا FormatJS. ٥ ملفات: [[i18n.js]] (المكتبة)، و [[messages.js]] (الكتالوجات)، و [[demo.js]] (بيعرض كل الرسايل بأي لغة من سطر الأوامر)، و [[i18n.test.js]] (١١ اختبار بـ [[node --test]])، و [[package.json]]. [[createI18n({ locale, messages, fallback, currency, timeZone, now })]] بيرجّع [[t(key, params)]] و [[locale]] و [[dir]] و [[missing()]]. الرسايل فيها placeholders بنوع: [[{name}]] نص، و [[{total:money}]] و [[{n:number}]] و [[{day:date}]] و [[{at:time}]] و [[{items:list}]] و [[{methods:or}]] و [[{len:duration}]] و [[{when:ago}]]، ورسايل جمع [[{ $plural: "count", zero, one, two, few, many, other }]] و [[#]] جواها = العدد متنسّق. اللغة بتتختار من لستة ([[["fr-FR", "ar-SA"]]] ← كتالوج [["ar"]] بلغة [["ar-SA"]])، والمفتاح الناقص بيرجع للاحتياطي ويتسجل، والـ formatters بتتعمل مرة واحدة أول ما تتطلب، والأخطاء (param ناقص، تاريخ بايظ، عدد مش رقم) برسايل فيها اسم المفتاح. بيجمع الوحدة كلها، ومن دروس «Intl: الـ locale والتفاوض» و «Intl.PluralRules» و «node --test».`, done: R`[[node --test]] بيطبع ١١ اختبار كلهم ✔. [[node demo.js ar-EG]] بيطبع الست حالات جمع صح و «الإجمالي ١٬٩٩٩٫٥٠ ج.م.» و «التوصيل ٢٢ نوفمبر ٢٠٢٦ الساعة ٣:٣٠ م» و «آخر ظهور للمندوب قبل ٥ دقائق» و [[missing: [ 'ar:promo' ]]]. و [[node demo.js fr-FR ar_SA ar-SA]] بيختار [["ar-SA"]] من غير ما يقع على [["ar_SA"]]. و ١٠٠٠ نداء لـ [[t("cart")]] بيعملوا formatterين بس.`, ext: R`زوّد [[select]] للجنس («سارة عملت» و «عمر عمل») بنفس فكرة [[$plural]]. وخلي [[messages]] تتحمّل من ملفات JSON لكل لغة بـ [[import()]] وقت الحاجة. وزوّد [[{n:percent}]] و [[{a,b:range}]] بـ [[formatRange]]. واكتب أمر [[node check-catalog.js]] بيتأكد إن كل مفتاح موجود في كل لغة وإن رسايل الجمع فيها كل [[pluralCategories]] (تمرين ٥ في درس «Intl.PluralRules»)، وشغّله في CI.`, sol: R`## هتشوف إيه

مكتبة بتفصل **الكلام** (الكتالوجات اللي المترجم بيكتبها) عن **التنسيق** (أرقام وتواريخ وجمع، من [[Intl]]). نفس الطلب بالعربي وبالإنجليزي، والجمع صح في الست حالات، والاختبارات بتغطي الحالات الطرفية.

~~~text الناتج: node demo.js ar-EG | node show-hidden.js
locale: ar-EG | catalog: ar | dir: rtl
أهلًا يا سارة
سلتك فاضية
في سلتك منتج واحد
في سلتك منتجين
في سلتك ٣ منتجات
في سلتك ١١ منتجًا
في سلتك ١٠٠ منتج
الطلب: قهوة وشاي وكيكة
الإجمالي <RLM>١٬٩٩٩٫٥٠<NBSP>ج.م.<RLM>
التوصيل ٢٢ نوفمبر ٢٠٢٦ الساعة ٣:٣٠ م
المندوب هيوصل خلال ساعة و٣٠ دقيقة
تقدر تدفع كاش أو كارت أو محفظة
آخر ظهور للمندوب قبل ٥ دقائق
Use code NILE10 for 10% off
missing: [ 'ar:promo' ]
~~~

~~~text الناتج: node demo.js en-US | node show-hidden.js
locale: en-US | catalog: en | dir: ltr
Hi Sara
Your cart is empty
1 item in your cart
2 items in your cart
3 items in your cart
11 items in your cart
100 items in your cart
Order: coffee, tea, and cake
Total EGP<NBSP>1,999.50
Delivery on November 22, 2026 at 3:30 PM
The courier arrives in 1 hour, 30 minutes
You can pay by cash, card, or wallet
Courier last seen 5 minutes ago
Use code NILE10 for 10% off
missing: []
~~~

~~~text الناتج: node demo.js fr-FR ar_SA ar-SA (أول ٣ سطور)
locale: ar-SA | catalog: ar | dir: rtl
أهلًا يا سارة
سلتك فاضية
~~~

~~~text الناتج: node --test
✔ pickLocale: الـ tag كامل، أو لغته، أو الاحتياطي (2.8366ms)
✔ الجمع العربي: الست حالات (12.5273ms)
✔ الإنجليزي: zero و one و other (0.4715ms)
✔ الفلوس بالعملة واللغة (0.8064ms)
✔ القوايم: و / أو (2.5853ms)
✔ التاريخ بتوقيت القاهرة مش UTC (4.1159ms)
✔ المدة و «من قد إيه» (0.7888ms)
✔ مفتاح ناقص: الاحتياطي، ويتسجل (0.2899ms)
✔ الأخطاء واضحة (0.7065ms)
✔ كل formatter بيتعمل مرة واحدة (3.4773ms)
✔ الاتجاه (0.1786ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 116.9017
~~~

## الملفات وترتيب البناء

~~~text الشجرة
i18n-mini/
├── package.json      سكربتات demo و test
├── i18n.js           المكتبة: pickLocale و createI18n
├── messages.js       الكتالوجات: ar و en
├── demo.js           العرض من سطر الأوامر
└── i18n.test.js      ١١ اختبار بـ node:test
~~~

اتبنت بالترتيب ده: [[pickLocale]] واختباره الأول (أبسط جزء ومفيهوش formatters)، وبعدين [[fill]] بالـ placeholders النص بس، وبعدين الأنواع واحد واحد (money ثم date ثم list...) ومع كل نوع اختبار، وبعدين الجمع، وبعدين الاحتياطي والـ missing، وآخر حاجة [[demo.js]].

## الكود

~~~json package.json
{
  "name": "i18n-mini",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "demo": "node demo.js",
    "test": "node --test"
  }
}
~~~

~~~js i18n.js
// i18n.js: رسايل بالعربي والإنجليزي، والجمع والأرقام والفلوس والتواريخ والقوايم والمدد صح، من غير مكتبات
"use strict";

// بيختار أول لغة مطلوبة ليها كتالوج: الـ tag كامل (ar-EG) أو لغته بس (ar)، وإلا الاحتياطي
function pickLocale(requested, available, fallback) {
  const list = Array.isArray(requested) ? requested : [requested];
  for (const tag of list) {
    let canon;
    try {
      [canon] = Intl.getCanonicalLocales(tag);
    } catch {
      continue; // tag بايظ زي ar_EG: نتخطاه بدل ما نوقع
    }
    if (!canon) continue;
    if (available.includes(canon)) return { locale: canon, catalog: canon };
    const lang = new Intl.Locale(canon).language;
    if (available.includes(lang)) return { locale: canon, catalog: lang };
  }
  return { locale: fallback, catalog: fallback };
}

const PLACE = /\{(\w+)(?::(\w+))?\}/g;
const UNITS = [["second", 60], ["minute", 60], ["hour", 24], ["day", Infinity]];

function createI18n({ locale, messages, fallback = "en", currency = "EGP", timeZone = "UTC", now = () => new Date() }) {
  if (!messages[fallback]) throw new Error('مفيش كتالوج للغة الاحتياطية "' + fallback + '"');
  const picked = pickLocale(locale ?? fallback, Object.keys(messages), fallback);
  const L = picked.locale;
  const catalog = messages[picked.catalog];
  const cache = new Map();
  const missing = new Set();
  let fb; // نسخة الاحتياطي، بتتعمل أول ما نحتاجها بس

  // كل formatter بيتعمل مرة واحدة (أول ما يتطلب) ويتخزن
  const get = (kind, make) => {
    if (!cache.has(kind)) cache.set(kind, make());
    return cache.get(kind);
  };
  const fmt = {
    number: () => get("number", () => new Intl.NumberFormat(L)),
    money: () => get("money", () => new Intl.NumberFormat(L, { style: "currency", currency })),
    date: () => get("date", () => new Intl.DateTimeFormat(L, { dateStyle: "long", timeZone })),
    time: () => get("time", () => new Intl.DateTimeFormat(L, { timeStyle: "short", timeZone })),
    list: () => get("list", () => new Intl.ListFormat(L, { type: "conjunction" })),
    or: () => get("or", () => new Intl.ListFormat(L, { type: "disjunction" })),
    duration: () => get("duration", () => new Intl.DurationFormat(L, { style: "long" })),
    ago: () => get("ago", () => new Intl.RelativeTimeFormat(L, { numeric: "auto" })),
    plural: () => get("plural", () => new Intl.PluralRules(L)),
  };

  const needDate = (v, name, key) => {
    if (!(v instanceof Date) || Number.isNaN(v.getTime())) throw new TypeError('"' + name + '" في "' + key + '" لازم Date سليم');
    return v;
  };
  const needNumber = (v, name, key) => {
    if (typeof v !== "number" || !Number.isFinite(v)) throw new TypeError('"' + name + '" في "' + key + '" لازم رقم');
    return v;
  };

  // بيختار الوحدة لوحده: ثواني لحد ٦٠، بعدين دقايق لحد ٦٠، بعدين ساعات لحد ٢٤، بعدين أيام
  function ago(date) {
    let diff = (date.getTime() - now().getTime()) / 1000;
    for (const [unit, size] of UNITS) {
      if (Math.abs(diff) < size) return fmt.ago().format(Math.round(diff), unit);
      diff /= size;
    }
  }

  function fill(text, params, key) {
    return text.replace(PLACE, (_, name, kind) => {
      if (!(name in params)) throw new Error('الرسالة "' + key + '" محتاجة "' + name + '"');
      const v = params[name];
      switch (kind) {
        case undefined: return String(v);
        case "number": return fmt.number().format(needNumber(v, name, key));
        case "money": return fmt.money().format(needNumber(v, name, key));
        case "date": return fmt.date().format(needDate(v, name, key));
        case "time": return fmt.time().format(needDate(v, name, key));
        case "ago": return ago(needDate(v, name, key));
        case "list": return fmt.list().format(v.map(String));
        case "or": return fmt.or().format(v.map(String));
        case "duration": return fmt.duration().format(v);
        default: throw new Error('نوع مش معروف "' + kind + '" في "' + key + '"');
      }
    });
  }

  function t(key, params = {}) {
    const msg = catalog[key];
    if (msg === undefined) {
      missing.add(picked.catalog + ":" + key);
      if (picked.catalog === fallback) return "[missing: " + key + "]";
      fb ??= createI18n({ locale: fallback, messages, fallback, currency, timeZone, now });
      return fb.t(key, params);
    }
    if (typeof msg === "string") return fill(msg, params, key);
    // رسالة جمع: { $plural: "count", zero, one, two, few, many, other }
    const count = needNumber(params[msg.$plural], msg.$plural, key);
    const category = count === 0 && msg.zero !== undefined ? "zero" : fmt.plural().select(count);
    const text = msg[category] ?? msg.other;
    if (text === undefined) throw new Error('الرسالة "' + key + '" ناقصها "other"');
    return fill(text.replaceAll("#", fmt.number().format(count)), params, key);
  }

  return {
    locale: L,
    catalog: picked.catalog,
    dir: new Intl.Locale(L).getTextInfo().direction,
    t,
    missing: () => [...missing, ...(fb ? fb.missing() : [])],
    cacheSize: () => cache.size,
  };
}

module.exports = { createI18n, pickLocale };
~~~

~~~js messages.js
// messages.js: الكتالوجات. كل مفتاح بنفس المعنى في اللغتين
module.exports = {
  ar: {
    hello: "أهلًا يا {name}",
    cart: {
      $plural: "count",
      zero: "سلتك فاضية",
      one: "في سلتك منتج واحد",
      two: "في سلتك منتجين",
      few: "في سلتك # منتجات",
      many: "في سلتك # منتجًا",
      other: "في سلتك # منتج",
    },
    items: "الطلب: {items:list}",
    total: "الإجمالي {total:money}",
    delivery: "التوصيل {day:date} الساعة {at:time}",
    eta: "المندوب هيوصل خلال {len:duration}",
    pay: "تقدر تدفع {methods:or}",
    seen: "آخر ظهور للمندوب {when:ago}",
  },
  en: {
    hello: "Hi {name}",
    cart: { $plural: "count", zero: "Your cart is empty", one: "# item in your cart", other: "# items in your cart" },
    items: "Order: {items:list}",
    total: "Total {total:money}",
    delivery: "Delivery on {day:date} at {at:time}",
    eta: "The courier arrives in {len:duration}",
    pay: "You can pay by {methods:or}",
    seen: "Courier last seen {when:ago}",
    promo: "Use code {code} for 10% off",
  },
};
~~~

~~~js demo.js
// demo.js: نفس الطلب بأي لغة. node demo.js ar-EG، أو أكتر من لغة بالترتيب: node demo.js fr-FR ar-SA
const { createI18n } = require("./i18n");
const messages = require("./messages");

const NOW = new Date("2026-11-21T15:00:00Z"); // ثابت عشان الناتج ميتغيّرش
const requested = process.argv.slice(2);
const i18n = createI18n({ locale: requested.length ? requested : "ar-EG", messages, timeZone: "Africa/Cairo", now: () => NOW });
const ar = i18n.catalog === "ar";

console.log("locale:", i18n.locale, "| catalog:", i18n.catalog, "| dir:", i18n.dir);
console.log(i18n.t("hello", { name: ar ? "سارة" : "Sara" }));
for (const count of [0, 1, 2, 3, 11, 100]) console.log(i18n.t("cart", { count }));
console.log(i18n.t("items", { items: ar ? ["قهوة", "شاي", "كيكة"] : ["coffee", "tea", "cake"] }));
console.log(i18n.t("total", { total: 1999.5 }));
const slot = new Date("2026-11-22T13:30:00Z");
console.log(i18n.t("delivery", { day: slot, at: slot }));
console.log(i18n.t("eta", { len: { hours: 1, minutes: 30 } }));
console.log(i18n.t("pay", { methods: ar ? ["كاش", "كارت", "محفظة"] : ["cash", "card", "wallet"] }));
console.log(i18n.t("seen", { when: new Date("2026-11-21T14:55:00Z") }));
console.log(i18n.t("promo", { code: "NILE10" }));
console.log("missing:", i18n.missing());
~~~

~~~js i18n.test.js
// i18n.test.js: اختبارات node --test
const test = require("node:test");
const assert = require("node:assert/strict");
const { createI18n, pickLocale } = require("./i18n");
const messages = require("./messages");

const NOW = new Date("2026-11-21T15:00:00Z");
const make = locale => createI18n({ locale, messages, timeZone: "Africa/Cairo", now: () => NOW });
// الحروف المخفية والمسافات الخاصة بتختلف بين Node والمتصفح: نشيلها قبل المقارنة
const plain = s => s.replace(/[\u200e\u200f\u061c]/g, "").replace(/\s/g, " ");

test("pickLocale: الـ tag كامل، أو لغته، أو الاحتياطي", () => {
  const av = ["ar", "en"];
  assert.deepEqual(pickLocale("ar-EG", av, "en"), { locale: "ar-EG", catalog: "ar" });
  assert.deepEqual(pickLocale("AR-eg", av, "en"), { locale: "ar-EG", catalog: "ar" });
  assert.deepEqual(pickLocale(["fr-FR", "ar_SA", "ar-SA"], av, "en"), { locale: "ar-SA", catalog: "ar" });
  assert.deepEqual(pickLocale("fr-FR", av, "en"), { locale: "en", catalog: "en" });
});

test("الجمع العربي: الست حالات", () => {
  const { t } = make("ar-EG");
  const got = [0, 1, 2, 3, 11, 100].map(count => t("cart", { count }));
  assert.deepEqual(got, ["سلتك فاضية", "في سلتك منتج واحد", "في سلتك منتجين", "في سلتك ٣ منتجات", "في سلتك ١١ منتجًا", "في سلتك ١٠٠ منتج"]);
});

test("الإنجليزي: zero و one و other", () => {
  const { t } = make("en-US");
  assert.deepEqual([0, 1, 5].map(count => t("cart", { count })), ["Your cart is empty", "1 item in your cart", "5 items in your cart"]);
});

test("الفلوس بالعملة واللغة", () => {
  assert.equal(plain(make("ar-EG").t("total", { total: 1999.5 })), "الإجمالي ١٬٩٩٩٫٥٠ ج.م.");
  assert.equal(plain(make("en-US").t("total", { total: 1999.5 })), "Total EGP 1,999.50");
});

test("القوايم: و / أو", () => {
  assert.equal(make("ar-EG").t("items", { items: ["قهوة", "شاي", "كيكة"] }), "الطلب: قهوة وشاي وكيكة");
  assert.equal(make("en-US").t("pay", { methods: ["cash", "card"] }), "You can pay by cash or card");
});

test("التاريخ بتوقيت القاهرة مش UTC", () => {
  const d = new Date("2026-09-29T21:30:00Z"); // ١٢:٣٠ بعد نص الليل في القاهرة
  assert.equal(plain(make("ar-EG").t("delivery", { day: d, at: d })), "التوصيل ٣٠ سبتمبر ٢٠٢٦ الساعة ١٢:٣٠ ص");
});

test("المدة و «من قد إيه»", () => {
  const { t } = make("ar-EG");
  assert.equal(t("eta", { len: { hours: 1, minutes: 30 } }), "المندوب هيوصل خلال ساعة و٣٠ دقيقة");
  assert.equal(t("seen", { when: new Date("2026-11-20T15:00:00Z") }), "آخر ظهور للمندوب أمس");
});

test("مفتاح ناقص: الاحتياطي، ويتسجل", () => {
  const i18n = make("ar-EG");
  assert.equal(i18n.t("promo", { code: "X1" }), "Use code X1 for 10% off");
  assert.deepEqual(i18n.missing(), ["ar:promo"]);
  assert.equal(make("en-US").t("nope"), "[missing: nope]");
});

test("الأخطاء واضحة", () => {
  const { t } = make("ar-EG");
  assert.throws(() => t("hello"), /محتاجة "name"/);
  assert.throws(() => t("delivery", { day: new Date("x"), at: NOW }), TypeError);
  assert.throws(() => t("cart", { count: "3" }), /لازم رقم/);
  assert.throws(() => createI18n({ locale: "ar", messages: { ar: {} } }), /الاحتياطية/);
});

test("كل formatter بيتعمل مرة واحدة", () => {
  const i18n = make("ar-EG");
  for (let i = 0; i < 1000; i++) i18n.t("cart", { count: i });
  assert.equal(i18n.cacheSize(), 2); // plural و number بس
});

test("الاتجاه", () => {
  assert.equal(make("ar-EG").dir, "rtl");
  assert.equal(make("en-US").dir, "ltr");
});
~~~

## كل حتة بتعمل إيه

- **[[pickLocale]]**: بيلف على اللغات المطلوبة بالترتيب، ولكل واحدة: [[getCanonicalLocales]] جوه [[try]] (البايظ بيتخطى)، وبعدين الـ tag كامل في الكتالوجات، وبعدين اللغة بس ([[new Intl.Locale(canon).language]]). وبيرجّع **حاجتين**: [[locale]] (للتنسيق: [["ar-SA"]] بأرقامها) و [[catalog]] (للكلام: [["ar"]]). الفصل ده هو اللي بيخلي كتالوج عربي واحد يخدم كل البلاد العربي بأرقام كل بلد.
- **[[fmt]] و [[get]]**: كل formatter دالة بتعمله أول مرة بس وتخزنه في [[cache]]. فلو الصفحة فيها جمع وأرقام بس، مفيش [[DateTimeFormat]] ولا [[DurationFormat]] اتعمل. واختبار «كل formatter بيتعمل مرة واحدة» بيتأكد إن ١٠٠٠ رسالة جمع عملوا [[plural]] و [[number]] بس.
- **[[PLACE]] = [[/\{(\w+)(?::(\w+))?\}/g]]**: [[\{]] قوس حرفي، و [[(\w+)]] اسم الـ param، و [[(?::(\w+))?]] نوع اختياري بعد [[:]]. و [[fill]] بيستخدمه في [[replace]] بدالة، والـ [[switch]] بيختار الـ formatter حسب النوع.
- **[[needDate]] و [[needNumber]]**: [[DateTimeFormat]] بيرمي [[RangeError: Invalid time value]] من غير ما يقول أنهي param في أنهي رسالة. الفحص ده بيقول [["day" في "delivery" لازم Date سليم]].
- **[[ago(date)]]**: بيمشي على [[UNITS]]: لو الفرق أقل من ٦٠ ثانية يكتب ثواني، وإلا يقسم على ٦٠ ويجرب الدقايق... لحد الأيام. و [[numeric: "auto"]] بيدّي «أمس» و «الآن».
- **رسالة الجمع**: [[count === 0 && msg.zero !== undefined]] بيخلي [[zero]] يشتغل في الإنجليزي كمان (قرار UI)، وإلا الفئة من [[PluralRules]]، و [[?? msg.other]] لو الفئة ناقصة، و [[replaceAll("#", ...)]] بالعدد متنسّق **قبل** [[fill]] عشان باقي الـ placeholders تشتغل جوه رسالة الجمع.
- **الاحتياطي**: المفتاح الناقص في [["ar"]] بيتسجل في [[missing]] وبيتطلب من نسخة إنجليزي ([[fb]]) **بتنسيق إنجليزي**، عشان متطلعش جملة إنجليزي فيها أرقام عربي. والنسخة دي بتتعمل أول ما تتطلب بس ([[??=]]). والناقص في الاحتياطي نفسه بيرجّع [[[missing: key]]] بدل ما يقع، فالصفحة تفضل شغالة والغلط باين.
- **[[dir]]** من [[getTextInfo()]] للـ [[<html dir>]].
- **[[plain]] في الاختبارات**: بيشيل [[\u200e]] و [[\u200f]] و [[\u061c]] ويوحّد المسافات، عشان الاختبار يعدّي في Node والمتصفح (درس «Intl.DateTimeFormat: formatToParts و formatRange» قسم ٩).

## الغلطات اللي حصلت وأنا ببنيه

1. **اختبار الفلوس وقع والنصين شكلهم واحد:**

~~~text الناتج (أول تشغيل، والحروف المخفية مكتوبة بأسمائها)
✖ الفلوس بالعملة واللغة
  + actual - expected
  + 'الإجمالي <RLM>١٬٩٩٩٫٥٠ ج.م.<RLM>'
  - 'الإجمالي ١٬٩٩٩٫٥٠ ج.م.'
~~~

الفرق [[<RLM>]] على الطرفين، مخفي في الترمنال. (والـ [[<NBSP>]] قبل «ج.م.» كان متشال بالفعل لأن [[plain]] كان بيوحّد المسافات.) الحل مكانه الاختبار مش المكتبة: [[plain()]] قبل المقارنة. شيلهم من الناتج نفسه كان هيبوّظ عرض الفلوس جوه جمل فيها إنجليزي.
2. **[[plain]] نفسها اتكتبت غلط:** لما حاولت أحط الـ escapes بأمر [[sed]] في الترمنال، الـ backslash اتشال والـ regex بقى [[/[200e200f061c]/]]: يعني «أي حرف من 2 و 0 و e و f و 6 و 1 و c»: بيشيل حروف وأرقام إنجليزي من النص وبيسيب الـ RLM زي ما هو! والاختبار فضل بيقع بنفس الطريقة. الدرس: الحروف المخفية تتكتب في الكود بـ [[\u]] من المحرر، وتتأكد منها بـ [[grep]] بعد ما تحفظ.

## ليه مش i18next أو FormatJS؟

| | i18n-mini | i18next / FormatJS |
|---|---|---|
| الحجم | حوالي ١١٥ سطر، صفر dependencies | مكتبات كبيرة ومعاها ecosystem |
| صيغة الرسايل | placeholders بنوع + [[$plural]] | ICU MessageFormat كامل (select و plural متداخلين) |
| إمتى | مشروع صغير أو متوسط، وعايز تفهم إيه اللي بيحصل | تطبيق كبير، مترجمين، أدوات ترجمة جاهزة |

الاتنين بيستخدموا نفس [[Intl]] من جوه. لما تنقل لمكتبة كبيرة، الكتالوجات بتتحوّل بسهولة لأن الفكرة واحدة.` },
        { lvl: 'فكرة', t: R`فاتورة بلغة العميل`, what: R`أي حد بيشتغل freelance أو عنده محل بيبعت فواتير، ولو عملاؤه من بلاد مختلفة محتاج نفس الفاتورة بلغة كل عميل وأرقامه. اعمل [[renderInvoice(invoice, locale)]] بتطلّع الفاتورة كنص: الرقم، والتاريخ، وفترة السداد كنطاق، والبنود (الكمية × السعر = الإجمالي)، وعدد البنود بالجمع الصح، والإجمالي قبل الضريبة، والضريبة بنسبتها، والمطلوب، وطرق الدفع بـ «أو». اختار انت الحساب بإيه (عشان القروش)، والبيانات شكلها إيه، وإيه اللي يحصل للغة مالهاش ترجمة.`, done: R`نفس الـ object بيطلع فاتورة عربي بأرقام مصر و «٣ بنود» و «تحويل بنكي أو إنستاباي أو كاش»، وفاتورة إنجليزي «3 items» و «bank transfer, InstaPay, or cash»، والإجمالي واحد في الاتنين بالقرش (٨١٥٢٫١٤)، ولغة تالتة ([["de-DE"]]) بتطلع بأرقام وتواريخ ألماني وكلام إنجليزي من غير [[undefined]].`, ext: R`طلّعها HTML بـ [[<table>]] و [[dir]] صح، وخلّي العملة تتغيّر لكل عميل، وزوّد خصم بـ [[signDisplay: "exceptZero"]]، وتاريخ هجري جنب الميلادي للعملاء في الخليج، وطلّعها PDF بـ Puppeteer.`, sol: R`## نسخة نموذجية

القرار الأساسي: **الفاتورة بيانات، والكلام والتنسيق طبقة فوقها**. الـ object فيه أرقام وتواريخ [[Date]] وأسامي البنود باللغتين، ومفيهوش ولا نص متنسّق. والحساب كله بالقروش (أرقام صحيحة) وبيتحوّل لجنيه في آخر خطوة بس.

~~~text الناتج: node invoice.js | node show-hidden.js
فاتورة رقم INV-2026-0147
التاريخ: ٢١ نوفمبر ٢٠٢٦
فترة السداد: ٢١ نوفمبر – ٥ ديسمبر ٢٠٢٦

  تصميم لوجو  ١ × <RLM>٢٬٥٠٠٫٠٠<NBSP>ج.م.<RLM> = <RLM>٢٬٥٠٠٫٠٠<NBSP>ج.م.<RLM>
  صفحة هبوط  ٢ × <RLM>١٬٨٠٠٫٥٠<NBSP>ج.م.<RLM> = <RLM>٣٬٦٠١٫٠٠<NBSP>ج.م.<RLM>
  ساعة دعم  ٣ × <RLM>٣٥٠٫٠٠<NBSP>ج.م.<RLM> = <RLM>١٬٠٥٠٫٠٠<NBSP>ج.م.<RLM>

عدد البنود: ٣ بنود
الإجمالي قبل الضريبة: <RLM>٧٬١٥١٫٠٠<NBSP>ج.م.<RLM>
ضريبة القيمة المضافة (١٤٪<ALM>): <RLM>١٬٠٠١٫١٤<NBSP>ج.م.<RLM>
المطلوب: <RLM>٨٬١٥٢٫١٤<NBSP>ج.م.<RLM>
طرق الدفع: تحويل بنكي أو إنستاباي أو كاش

Invoice No. INV-2026-0147
Date: November 21, 2026
Payment window: November 21<THINSP>–<THINSP>December 5, 2026

  Logo design  1 × EGP<NBSP>2,500.00 = EGP<NBSP>2,500.00
  Landing page  2 × EGP<NBSP>1,800.50 = EGP<NBSP>3,601.00
  Support hour  3 × EGP<NBSP>350.00 = EGP<NBSP>1,050.00

Line items: 3 items
Subtotal: EGP<NBSP>7,151.00
VAT (14%): EGP<NBSP>1,001.14
Amount due: EGP<NBSP>8,152.14
Payment methods: bank transfer, InstaPay, or cash
~~~

~~~text الناتج: node invoice.js de-DE | node show-hidden.js
Invoice No. INV-2026-0147
Date: 21. November 2026
Payment window: 21. November<THINSP>–<THINSP>5. Dezember 2026

  Logo design  1 × 2.500,00<NBSP>EGP = 2.500,00<NBSP>EGP
  Landing page  2 × 1.800,50<NBSP>EGP = 3.601,00<NBSP>EGP
  Support hour  3 × 350,00<NBSP>EGP = 1.050,00<NBSP>EGP

Line items: 3 items
Subtotal: 7.151,00<NBSP>EGP
VAT (14<NBSP>%): 1.001,14<NBSP>EGP
Amount due: 8.152,14<NBSP>EGP
Payment methods: bank transfer, InstaPay oder cash
~~~

## الكود

~~~js invoice.js
// invoice.js: نفس الفاتورة بلغة العميل: ar-EG أو en-US أو أي لغة تانية
const VAT = 0.14;
const LABELS = {
  ar: { title: "فاتورة", no: "رقم", issued: "التاريخ", due: "فترة السداد", qty: "الكمية", sub: "الإجمالي قبل الضريبة", vat: "ضريبة القيمة المضافة", total: "المطلوب", lines: "عدد البنود", pay: "طرق الدفع" },
  en: { title: "Invoice", no: "No.", issued: "Date", due: "Payment window", qty: "Qty", sub: "Subtotal", vat: "VAT", total: "Amount due", lines: "Line items", pay: "Payment methods" },
};
const LINES_WORD = {
  ar: { one: "بند واحد", two: "بندين", few: "# بنود", many: "# بندًا", other: "# بند" },
  en: { one: "# item", other: "# items" },
};

function renderInvoice(inv, locale) {
  const lang = new Intl.Locale(locale).language;
  const L = LABELS[lang] ?? LABELS.en;
  const money = new Intl.NumberFormat(locale, { style: "currency", currency: inv.currency });
  const num = new Intl.NumberFormat(locale);
  const pct = new Intl.NumberFormat(locale, { style: "percent" });
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: inv.timeZone });
  const list = new Intl.ListFormat(locale, { type: "disjunction" });
  const plural = new Intl.PluralRules(locale);
  const words = LINES_WORD[lang] ?? LINES_WORD.en;

  // الحساب بالقروش (أرقام صحيحة) عشان مفيش 0.1 + 0.2
  const lines = inv.lines.map(l => ({ ...l, cents: Math.round(l.price * 100) * l.qty }));
  const sub = lines.reduce((s, l) => s + l.cents, 0);
  const vat = Math.round(sub * VAT);
  const n = lines.length;
  const countText = (words[plural.select(n)] ?? words.other).replace("#", num.format(n));

  const out = [
    L.title + " " + L.no + " " + inv.no,
    L.issued + ": " + date.format(inv.issued),
    L.due + ": " + date.formatRange(inv.issued, inv.due),
    "",
    ...lines.map(l => "  " + (l.name[lang] ?? l.name.en) + "  " + num.format(l.qty) + " × " + money.format(l.price) + " = " + money.format(l.cents / 100)),
    "",
    L.lines + ": " + countText,
    L.sub + ": " + money.format(sub / 100),
    L.vat + " (" + pct.format(VAT) + "): " + money.format(vat / 100),
    L.total + ": " + money.format((sub + vat) / 100),
    L.pay + ": " + list.format(inv.pay[lang] ?? inv.pay.en),
  ];
  return out.join("\n");
}

const invoice = {
  no: "INV-2026-0147",
  currency: "EGP",
  timeZone: "Africa/Cairo",
  issued: new Date("2026-11-21T10:00:00Z"),
  due: new Date("2026-12-05T10:00:00Z"),
  lines: [
    { name: { ar: "تصميم لوجو", en: "Logo design" }, qty: 1, price: 2500 },
    { name: { ar: "صفحة هبوط", en: "Landing page" }, qty: 2, price: 1800.5 },
    { name: { ar: "ساعة دعم", en: "Support hour" }, qty: 3, price: 350 },
  ],
  pay: { ar: ["تحويل بنكي", "إنستاباي", "كاش"], en: ["bank transfer", "InstaPay", "cash"] },
};

for (const locale of process.argv.slice(2).length ? process.argv.slice(2) : ["ar-EG", "en-US"]) {
  console.log(renderInvoice(invoice, locale) + "\n");
}
~~~

## ليه التصميم ده

- **القروش:** [[Math.round(l.price * 100) * l.qty]]: الـ float مش دقيق في الكسور ([[0.1 + 0.2]] = [[0.30000000000000004]])، وبالقروش كل حاجة أرقام صحيحة: ١٨٠٠٫٥ بقت [[180050]] قرش، × ٢ = [[360100]] بالظبط. والضريبة [[Math.round(sub * VAT)]] تقريب واحد على الإجمالي (مش على كل بند)، وده اللي المحاسبين بيعملوه. لاحظ إن [[715100 * 0.14]] نفسها طلعت [[100114.00000000001]] (اتقاست)، و [[Math.round]] رجّعتها [[100114]] قرش = ١٠٠١٫١٤.
- **[[LABELS]] و [[LINES_WORD]] لكل لغة، والباقي من [[Intl]]:** المترجم بيكتب ١٠ عناوين وكلمة «بند» بجمعها، وكل الأرقام والتواريخ والقوايم بتتنسّق لوحدها. والجمع بقواعد كل لغة: «٣ بنود» و «3 items».
- **[[date.formatRange(issued, due)]]:** «٢١ نوفمبر – ٥ ديسمبر ٢٠٢٦»: السنة مرة واحدة لأنها مشتركة.
- **[[pct.format(VAT)]]:** «١٤٪» بالعربي و «14 %» بالألماني (بمسافة: قاعدة ألماني) من غير ما تكتب [[%]] بإيدك.
- **[[type: "disjunction"]]:** «أو» لطرق الدفع، و «oder» بالألماني لوحدها.
- **لغة مالهاش ترجمة:** [[LABELS[lang] ?? LABELS.en]] للكلام، بس الـ formatters بالـ [[locale]] الأصلي، فالألماني طلع كلام إنجليزي بأرقام وتواريخ ألماني ([[7.151,00 EGP]] و «21. November»). ده أحسن من صفحة فيها [[undefined]].

## الغلطة اللي حصلت

أول تشغيل بـ [["de-DE"]] طلّع [[undefined  1 × 2.500,00 EGP]]: اللستة استخدمت [[l.name[lang]]] وألماني مش موجود في أسامي البنود. الحل [[(l.name[lang] ?? l.name.en)]]، ونفس الفكرة كانت متعملة للـ labels والدفع بس اتنسيت هنا. الدرس: أي [[obj[lang]]] محتاج [[??]] لاحتياطي، وجرّب دايمًا بلغة مش من لغاتك.` },
      ],
      items: [
        {
          cmd: "Intl: الـ locale والتفاوض و supportedValuesOf",
          title: "Intl بيختار اللغة اللي هيكتب بيها إزاي، وتعرف هو اختار إيه فعلًا؟",
          desc: R`أي حاجة في [[Intl]] بتبدأ بـ **locale**: نص زي [["ar-EG"]] بيقول اللغة والبلد وتفضيلات زي شكل الأرقام. انت بتطلب، و Intl **بيتفاوض**: بيدوّر على أقرب لغة عنده بيانات ليها، ولو ملقاش بيرجع لغة الجهاز من غير ما يقولك. عشان كده لازم تعرف تسأله اختار إيه.
• [[Intl.getCanonicalLocales(tags)]]: بيصلّح شكل الـ tags ([["AR-eg"]] ← [["ar-EG"]]) ويشيل المتكرر، وبيرمي [[RangeError]] لو tag بايظ زي [["ar_EG"]].
• [[new Intl.X(["xx-YY", "ar-EG"])]]: بتبعت لستة بالترتيب، وأول واحدة مدعومة تكسب.
• [[formatter.resolvedOptions().locale]]: اللغة اللي اتختارت فعلًا، ومعاها كل الإعدادات النهائية.
• [[Intl.X.supportedLocalesOf(tags)]]: موجودة على كل constructor، وبترجّع اللي هيتخدم من اللستة من غير ما تعمل formatter.
• [[Intl.supportedValuesOf(key)]]: كل التقاويم والعملات وأنظمة الأرقام والـ time zones والوحدات اللي الـ runtime يعرفها.

وأهم قاعدة أداء في الوحدة كلها: اعمل الـ formatter **مرة واحدة** واستخدمه كتير. عمله جوه loop أبطأ بحوالي ٦٠ مرة (متقاس تحت).`,
          example: R`console.log(Intl.getCanonicalLocales(["AR-eg", "en-us", "iw"]));
const nf = new Intl.NumberFormat(["xx-YY", "ar-EG"]);
console.log(nf.resolvedOptions().locale, nf.resolvedOptions().numberingSystem);
console.log(new Intl.NumberFormat("ar").format(1234.5), new Intl.NumberFormat("ar-EG").format(1234.5));
console.log(Intl.NumberFormat.supportedLocalesOf(["ar-EG", "tlh", "ar-ZZ"]));
console.log(Intl.supportedValuesOf("calendar").length, Intl.supportedValuesOf("currency").includes("EGP"));
console.log(new Intl.NumberFormat().resolvedOptions().locale);`,
          try: R`اعمل [[new Intl.NumberFormat(tag)]] لكل واحد من دول واطبع [[resolvedOptions().locale]] و [[numberingSystem]] و [[format(1234567.5)]]: [["ar"]] و [["ar-EG"]] و [["ar-SA"]] و [["ar-AE"]] و [["ar-MA"]] و [["fa-IR"]] و [["ar-Arab-EG"]]. أنهي واحد فيهم طلع بأرقام لاتيني؟ وليه [["ar-Arab-EG"]] غريبة؟`,
          sol: R`على Node 24.22 (ICU 78.3):

~~~text الناتج
ar          ar          latn     1,234,567.5
ar-EG       ar-EG       arab     ١٬٢٣٤٬٥٦٧٫٥
ar-SA       ar-SA       arab     ١٬٢٣٤٬٥٦٧٫٥
ar-AE       ar-AE       latn     1,234,567.5
ar-MA       ar-MA       latn     1.234.567,5
fa-IR       fa-IR       arabext  ۱٬۲۳۴٬۵۶۷٫۵
ar-Arab-EG  ar          latn     1,234,567.5
~~~

[["ar"]] لوحدها لاتيني (بيانات CLDR الحديثة)، ومصر والسعودية أرقام عربي مشرقية، والإمارات والمغرب لاتيني (والمغرب بنقطة للآلاف). و [["ar-Arab-EG"]] (اللي بيطلع من [[maximize()]]) **التفاوض نزّلها لـ [["ar"]]** لأن ICU معندوش بيانات باسم الـ script ده، فخسرت أرقام مصر. يعني متعملش format بالـ tag اللي فيه script، استخدم لغة-بلد بس.`,
          teach: R`## الفكرة

كل الـ formatters في [[Intl]] (الأرقام والتواريخ والقوايم والجمع...) بيشتغلوا بنفس الطريقة: بتديله **locale** و **options**، وهو بيدوّر في بيانات اسمها CLDR (قاعدة بيانات Unicode لكل لغات العالم) جوه مكتبة اسمها ICU. الدرس ده عن الجزء المشترك بينهم كلهم، قبل ما ندخل على كل واحد. كل الناتج من Node 24.22.1 (ICU 78.3، CLDR 48) على Windows، واتقارن بـ Chrome 157، والفروق مكتوبة.

---

## ١. الـ locale tag: بيتكوّن من إيه

الـ tag مكتوب بقواعد اسمها **BCP 47**: حتت مفصولة بشَرطة [[-]] (مش [[_]]):

~~~text
ar-Arab-EG-u-nu-latn-ca-islamic-umalqura
│  │    │  └─ extension: تفضيلات (nu = الأرقام، ca = التقويم)
│  │    └─ region: البلد، حرفين كبار أو ٣ أرقام (EG، 419)
│  └─ script: الكتابة، ٤ حروف أولهم كبير (Arab، Latn)
└─ language: اللغة، حرفين أو ٣ صغيرين (ar، en، arz)
~~~

| الحتة | مثال | معناها |
|---|---|---|
| language | [[ar]] و [[en]] و [[arz]] | اللغة نفسها (و [[arz]] = العربي المصري كلغة مستقلة) |
| script | [[Arab]] و [[Latn]] و [[Hant]] | طريقة الكتابة، نادرًا ما تحتاجها |
| region | [[EG]] و [[US]] و [[419]] | البلد أو المنطقة ([[419]] = أمريكا اللاتينية) |
| variant | [[valencia]] و [[1996]] | لهجة أو إملا معيّن |
| [[-u-nu-]] | [[-u-nu-latn]] | numbering system: شكل الأرقام |
| [[-u-ca-]] | [[-u-ca-islamic-umalqura]] | calendar: التقويم |
| [[-u-hc-]] | [[-u-hc-h23]] | hour cycle: ١٢ ولا ٢٤ ساعة |
| [[-u-co-]] و [[-u-kn]] | [[-u-co-phonebk]] | collation: قواعد الترتيب، و [[kn]] = الأرقام جوه النص تترتب كأرقام |

الحروف الكبيرة والصغيرة مش فارقة في المعنى، بس فيه شكل «رسمي» (canonical): اللغة صغيرة، والـ script أوله كبير، والبلد كبير.

---

## ٢. [[Intl.getCanonicalLocales]]: صلّح الـ tags قبل ما تستخدمها

~~~js canon.js
console.log(Intl.getCanonicalLocales(["AR-eg", "en-us", "iw"]));
console.log(Intl.getCanonicalLocales(["EN-gb", "en-GB", "ar-eg"]));
console.log(Intl.getCanonicalLocales("zh-hant-tw"));
Intl.getCanonicalLocales(["en-US", "ar_EG"]);
~~~

~~~text الناتج
[ 'ar-EG', 'en-US', 'he' ]
[ 'en-GB', 'ar-EG' ]
[ 'zh-Hant-TW' ]
RangeError: Incorrect locale information provided
~~~

- بيرجّع **array** دايمًا، حتى لو بعتله string واحد.
- بيظبط الحروف ([["AR-eg"]] ← [["ar-EG"]])، ويشيل المتكرر بعد التظبيط ([["EN-gb"]] و [["en-GB"]] بقوا واحد).
- بيبدّل الأسامي القديمة: [["iw"]] (الكود القديم للعبري) بقت [["he"]].
- tag واحد بايظ في اللستة بيوقّع الكل بـ [[RangeError]]. وده نفس الخطأ اللي هتاخده من أي constructor: [[new Intl.NumberFormat("ar_EG")]] بيرمي [[RangeError: Incorrect locale information provided]] (Node و Chrome نفس النص). [["ar_EG"]] بالـ underscore جاية غالبًا من لينكس ([[LANG=ar_EG.UTF-8]]) أو Java: حوّلها بـ [[replace("_", "-")]] الأول.

---

## ٣. التفاوض: Intl بيختار إزاي

~~~js negotiate.js
const nf = new Intl.NumberFormat(["xx-YY", "ar-EG"]);
console.log(nf.resolvedOptions().locale);
console.log(new Intl.NumberFormat("ar-ZZ").resolvedOptions().locale);
console.log(new Intl.NumberFormat("tlh").resolvedOptions().locale);
console.log(new Intl.NumberFormat().resolvedOptions().locale);
~~~

~~~text الناتج
ar-EG
ar
en-US
en-US
~~~

بالترتيب:

1. **لستة:** [[["xx-YY", "ar-EG"]]]: [["xx-YY"]] مش موجودة، فالتانية كسبت. ده اللي بتعمله لما تبعت [[navigator.languages]] (في المتصفح: لستة اللغات اللي اليوزر مختارها بالترتيب).
2. **بلد مش معروفة:** [["ar-ZZ"]] ← [["ar"]]: شال البلد وفضّل اللغة.
3. **لغة مش موجودة خالص:** [["tlh"]] (Klingon) ← **لغة الجهاز** ([["en-US"]] هنا). ومن غير أي خطأ ولا تحذير.
4. **من غير locale:** لغة الجهاز برضه. في Node بتيجي من إعدادات النظام، وفي المتصفح من لغة المتصفح. يعني نفس الكود بيطلع ناتج مختلف على جهاز تاني: لو الناتج مهم (فاتورة، تقرير، اختبار) **اكتب الـ locale دايمًا**.

### [[localeMatcher]]: [["best fit"]] و [["lookup"]]

أي constructor بياخد option اسمه [[localeMatcher]]. الافتراضي [["best fit"]]: الـ runtime بيستخدم ذكاءه (ممكن يختار لغة قريبة). و [["lookup"]] خوارزمية ثابتة من RFC 4647: بيشيل حتة من آخر الـ tag لحد ما يلاقي حاجة. في الواقع النتيجة غالبًا واحدة، و [["best fit"]] كفاية.

---

## ٤. [["ar"]] مش زي [["ar-EG"]]: الأرقام بتتغيّر

~~~text الناتج: new Intl.NumberFormat(tag).format(1234567.891)
ar      latn     1,234,567.891
ar-EG   arab     ١٬٢٣٤٬٥٦٧٫٨٩١
ar-SA   arab     ١٬٢٣٤٬٥٦٧٫٨٩١
ar-AE   latn     1,234,567.891
ar-MA   latn     1.234.567,891
fa-IR   arabext  ۱٬۲۳۴٬۵۶۷٫۸۹۱
hi-IN   latn     12,34,567.891
~~~

- [["ar"]] لوحدها **أرقام لاتيني** في CLDR الحديثة (Node 24 و Chrome 157 الاتنين). لو عايز أرقام مصر اكتب [["ar-EG"]].
- [[arab]] = الأرقام العربية المشرقية (٠١٢٣)، و [[arabext]] = الفارسي (۰۱۲۳)، و [[latn]] = 0123.
- [[٬]] و [[٫]] حروف مختلفة عن [[,]] و [[.]]: فاصل الآلاف والعلامة العشرية العربي.
- الهند بتجمّع بالـ lakh: [[12,34,567]].

**فخ:** [["ar-Arab-EG"]] (الشكل اللي بيطلع من [[new Intl.Locale("ar-EG").maximize()]]) بيتفاوض لـ [["ar"]] مش [["ar-EG"]]، فبيطلع لاتيني. فرمت بلغة-بلد بس.

---

## ٥. الـ [[-u-]] extensions والـ options: مين يكسب؟

~~~js ext.js
console.log(new Intl.NumberFormat("ar-EG-u-nu-latn").format(1234.5));
console.log(new Intl.NumberFormat("ar-EG-u-nu-latn", { numberingSystem: "arab" }).resolvedOptions().locale);
console.log(new Intl.NumberFormat("ar-EG-u-nu-xyz").resolvedOptions().locale);
~~~

~~~text الناتج
1,234.5
ar-EG
ar-EG
~~~

- [[-u-nu-latn]] جوه الـ tag نفس [[{ numberingSystem: "latn" }]] في الـ options.
- لو الاتنين موجودين ومختلفين **الـ option يكسب**، والـ extension بيتشال من [[resolvedOptions().locale]] (عشان مبقاش هو اللي اتطبّق).
- extension بقيمة مش معروفة ([[xyz]]) بيتجاهل بهدوء.

ليه الـ extension موجود أصلًا لو فيه options؟ عشان الـ tag **نص واحد** ينفع يتخزن في إعدادات اليوزر أو يتبعت في URL أو هيدر، وفيه كل تفضيلاته.

---

## ٦. [[supportedLocalesOf]]: موجودة على كل constructor

~~~js supported.js
console.log(Intl.NumberFormat.supportedLocalesOf(["ar-EG", "tlh", "ar-ZZ", "en-u-nu-thai"]));
console.log(Intl.NumberFormat.supportedLocalesOf(["ar-ZZ", "de-AT"], { localeMatcher: "lookup" }));
~~~

~~~text الناتج
[ 'ar-EG', 'ar-ZZ', 'en-u-nu-thai' ]
[ 'ar-ZZ', 'de-AT' ]
~~~

بترجّع **الـ tags اللي بعتها نفسها** (مش اللي هيتختار) اللي ليها بيانات ولو جزئيًا. [["ar-ZZ"]] رجعت لأن [["ar"]] مدعومة. و [["tlh"]] اتشالت. الفايدة: تعرف قبل ما تعمل formatter هل لغة اليوزر هتتخدم ولا هيرجع للافتراضي، فتعرض له رسالة أو تختار انت البديل.

نفس الدالة بنفس الشكل على: [[Intl.Collator]] و [[Intl.DateTimeFormat]] و [[Intl.DisplayNames]] و [[Intl.DurationFormat]] و [[Intl.ListFormat]] و [[Intl.NumberFormat]] و [[Intl.PluralRules]] و [[Intl.RelativeTimeFormat]] و [[Intl.Segmenter]]. كل واحد ليه بياناته، فنظريًا لغة ممكن تكون مدعومة في واحد ومش في التاني.

---

## ٧. [[resolvedOptions()]]: «انت اخترت إيه فعلًا؟»

كل formatter عنده [[resolvedOptions()]] بترجّع object فيه الإعدادات **بعد** التفاوض والقيم الافتراضية:

~~~text الناتج: new Intl.NumberFormat("ar-EG-u-nu-latn").resolvedOptions()
{
  locale: 'ar-EG-u-nu-latn',
  numberingSystem: 'latn',
  style: 'decimal',
  minimumIntegerDigits: 1,
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
  useGrouping: 'auto',
  notation: 'standard',
  signDisplay: 'auto',
  roundingIncrement: 1,
  roundingMode: 'halfExpand',
  roundingPriority: 'auto',
  trailingZeroDisplay: 'auto'
}
~~~

دي أول حاجة تطبعها لما الناتج مش زي ما متوقع: هتعرف إن اللغة رجعت [["en-US"]]، أو إن الكسور بـ ٣ مش ٢، أو إن التقويم مش اللي طلبته. وكمان بتديك المعلومة اللي محتاجها في الكود: [[Intl.DateTimeFormat().resolvedOptions().timeZone]] = توقيت الجهاز ([["Africa/Cairo"]] على الجهاز اللي اتجرّب عليه).

---

## ٨. [[Intl.supportedValuesOf(key)]]: الـ runtime يعرف إيه

~~~js values.js
for (const key of ["calendar", "collation", "currency", "numberingSystem", "timeZone", "unit"]) {
  console.log(key, Intl.supportedValuesOf(key).length);
}
console.log(Intl.supportedValuesOf("calendar").filter(c => c.startsWith("islamic")));
Intl.supportedValuesOf("language");
~~~

| المفتاح | Node 24.22 | Chrome 157 | أمثلة |
|---|---|---|---|
| [["calendar"]] | 18 | 18 | [[gregory]] و [[islamic-umalqura]] و [[coptic]] و [[persian]] |
| [["collation"]] | 12 | 10 | [[phonebk]] (ألماني) و [[pinyin]] و [[compat]] |
| [["currency"]] | 162 | 159 | [[EGP]] و [[SAR]] و [[USD]] |
| [["numberingSystem"]] | 78 | 78 | [[arab]] و [[arabext]] و [[latn]] و [[deva]] |
| [["timeZone"]] | 418 | 418 | [[Africa/Cairo]] و [[Asia/Riyadh]] |
| [["unit"]] | 45 | 45 | [[kilogram]] و [[liter]] و [[megabyte]] |

~~~text الناتج (آخر سطرين)
[
  'islamic',
  'islamic-civil',
  'islamic-rgsa',
  'islamic-tbla',
  'islamic-umalqura'
]
RangeError: Invalid key : language
~~~

- الأعداد بتختلف بين الـ runtimes والنسخ، فمتكتبش رقم ثابت في كود أو اختبار.
- مفيش مفتاح [["language"]] ولا [["locale"]]: اللغات بتتسأل بـ [[supportedLocalesOf]].
- الاستخدام الحقيقي: قايمة اختيار time zone أو عملة في صفحة الإعدادات، أو تتأكد إن قيمة جاية من اليوزر صالحة قبل ما تعمل بيها formatter.

---

## ٩. الأداء: formatter واحد ولا جديد كل مرة؟

نفس الـ ١٠٠ ألف سعر بـ ٣ طرق (Node 24.22، ٣ تشغيلات):

~~~js bench.js
const prices = Array.from({ length: 100000 }, (_, i) => i * 1.5);
const nf = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
// ١) new Intl.NumberFormat(...) جوه الـ loop
// ٢) p.toLocaleString("ar-EG", { style: "currency", currency: "EGP" })
// ٣) nf.format(p)
~~~

| الطريقة | التشغيل ١ | التشغيل ٢ | التشغيل ٣ |
|---|---|---|---|
| [[new]] جوه الـ loop | 4725 ms | 3766 ms | 3550 ms |
| [[toLocaleString]] بـ options | 3673 ms | 3414 ms | 3374 ms |
| formatter واحد برّه | 64 ms | 56 ms | 59 ms |

حوالي **٦٠ مرة** أسرع. عمل formatter معناه تفاوض وتحميل بيانات CLDR وتجهيز patterns، وده بيحصل مرة واحدة. و [[toLocaleString]] بـ locale أو options بيعمل formatter جديد في كل نداء (مفيش كاش مضمون). القاعدة: formatter لكل (locale + options) برّه الـ loop، أو في [[Map]] كاش لو الـ locale بيتغيّر.

---

## ١٠. الحروف المخفية في الناتج

الناتج العربي فيه حروف مبتظهرش على الشاشة بس موجودة في النص:

| الاسم | الكود | بيعمل إيه |
|---|---|---|
| RLM | [[U+200F]] | right-to-left mark: بيثبّت اتجاه الرقم والعملة جوه سطر عربي |
| ALM | [[U+061C]] | arabic letter mark: نفس الفكرة، قبل الـ % والإشارة |
| NBSP | [[U+00A0]] | مسافة متتكسرش: الرقم والعملة ميتفصلوش على سطرين |
| NNBSP | [[U+202F]] | مسافة رفيعة متتكسرش: قبل AM و PM في Node |
| THINSP | [[U+2009]] | مسافة رفيعة: حوالين الشرطة في [[formatRange]] في Node |

عشان تشوفهم، الوحدة دي بتمرّر الناتج على سكربت صغير بيكتب كل واحد باسمه بين [[< >]]:

~~~js show-hidden.js
// show-hidden.js: بيكتب الحروف المخفية بأسمائها. الاستخدام: node app.js | node show-hidden.js
const NAMES = { 0xa0: "NBSP", 0x200e: "LRM", 0x200f: "RLM", 0x61c: "ALM", 0x202f: "NNBSP", 0x2009: "THINSP", 0x200b: "ZWSP" };
let text = require("node:fs").readFileSync(0, "utf8");
text = text.replace(/^\ufeff/, ""); // Windows PowerShell 5.1 بيحط BOM في أول الـ pipe
text = text.replace(/[\u00a0\u200e\u200f\u061c\u202f\u2009\u200b]/g, c => "<" + NAMES[c.charCodeAt(0)] + ">");
process.stdout.write(text);
~~~

- [[readFileSync(0, "utf8")]]: [[0]] هو الـ stdin، يعني بيقرا اللي جاي من الـ pipe [[|]].
- الـ regex فيه الحروف دي مكتوبة بـ [[\uXXXX]] عشان تبان في الكود.
- في Git Bash و PowerShell 7 الـ pipe شغال على طول. في **Windows PowerShell 5.1** العربي بيعدّي [[???]] لأن [[$OutputEncoding]] هناك [[us-ascii]]؛ شغّل الأول [[$OutputEncoding = [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding $false]] (اتجرّب: من غيره [[???? ?????]] ومعاه العربي سليم).

~~~text الناتج: node money.js | node show-hidden.js
<RLM>١٬٩٩٩٫٥٠<NBSP>ج.م.<RLM>
~~~

**الفرق بين Node و Chrome في المسافات (متقاس):**

| الحالة | Node 24.22 | Chrome 157 |
|---|---|---|
| [[format]] لساعة إنجليزي (قبل PM) | [[U+0020]] مسافة عادية | [[U+0020]] |
| [[formatToParts]] لنفس الساعة | [[U+202F]] | [[U+0020]] |
| [[formatRange]] حوالين الشرطة | [[U+2009]] | [[U+0020]] |
| [[U+200F]] في الفلوس العربي | موجود | موجود |

يعني اختبار بيقارن نص التاريخ حرف بحرف ممكن يعدّي في المتصفح ويقع في Node. الحل في الاختبارات: شيل علامات الاتجاه ووحّد المسافات قبل المقارنة: [[s.replace(/[\u200e\u200f\u061c]/g, "").replace(/\s/g, " ")]] ([[\s]] بيمسك [[U+00A0]] و [[U+202F]] و [[U+2009]]). ومتشيلش العلامات دي من الناتج اللي بيتعرض لليوزر: هي اللي بتخلي «١٢٣ ج.م.» تتعرض صح جوه جملة.

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[Intl.getCanonicalLocales(tags)]] | تظبط وتشيل المتكرر، و [[RangeError]] للبايظ |
| لستة locales | أول واحدة مدعومة تكسب، وإلا لغة الجهاز من غير ما يقولك |
| [[resolvedOptions()]] | اللي اتطبّق فعلًا: أول حاجة تطبعها وقت الـ debug |
| [[X.supportedLocalesOf(tags)]] | أنهي tags من اللي بعتها ليها بيانات |
| [[Intl.supportedValuesOf(key)]] | التقاويم والعملات والأرقام والـ zones والوحدات المتاحة |
| formatter واحد برّه الـ loop | حوالي ٦٠ مرة أسرع من جديد كل مرة |

اللي ميتلخبطش: [["ar"]] أرقام لاتيني و [["ar-EG"]] عربي، والـ option يكسب الـ extension، والـ tag بشَرطة مش underscore.`,
          lines: [
            R`[[Intl.getCanonicalLocales]] بيظبط حروف كل tag ويبدّل القديم ([["iw"]] ← [["he"]])، والناتج [[[ 'ar-EG', 'en-US', 'he' ]]]`,
            R`formatter بلستة لغتين بالترتيب: [["xx-YY"]] مش موجودة فالتفاوض هيعدّي للي بعدها`,
            R`[[resolvedOptions()]] بتقول اللي اتختار فعلًا: [[ar-EG]] بأرقام [[arab]]`,
            R`نفس الرقم بـ [["ar"]] طلع لاتيني [[1,234.5]] وبـ [["ar-EG"]] طلع عربي [[١٬٢٣٤٫٥]]: البلد بتفرق في الأرقام`,
            R`[[supportedLocalesOf]] رجّعت [["ar-EG"]] و [["ar-ZZ"]] (لأن العربي مدعوم) وشالت [["tlh"]] اللي ملهاش بيانات`,
            R`[[supportedValuesOf]] بتعد ١٨ تقويم، وبتأكد إن عملة [[EGP]] معروفة للـ runtime ده`,
            R`formatter من غير locale بياخد لغة الجهاز: [["en-US"]] هنا، وده بيختلف من جهاز لجهاز`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[Intl.getCanonicalLocales(["EN-gb", "en-GB", "ar-eg"])]] هيرجّع كام عنصر؟ وبعدين [[Intl.getCanonicalLocales(["en-US", "ar_EG"])]]. اكتب توقعك وشغّل (من قسم ٢ في الشرح).`, done: R`توقعت عنصرين ([[en-GB]] و [[ar-EG]]) لأن الأولين بقوا نفس الحاجة بعد التظبيط، وتوقعت [[RangeError]] للتانية، والتشغيل طابق.`, sol: R`~~~js canon.js
console.log(Intl.getCanonicalLocales(["EN-gb", "en-GB", "ar-eg"]));
console.log(Intl.getCanonicalLocales("zh-hant-tw"));
try {
  Intl.getCanonicalLocales(["en-US", "ar_EG"]);
} catch (e) {
  console.log(e.name + ": " + e.message);
}
~~~

~~~text الناتج (Node 24.22)
[ 'en-GB', 'ar-EG' ]
[ 'zh-Hant-TW' ]
RangeError: Incorrect locale information provided
~~~

- التظبيط بيحصل **الأول**، وبعده شيل المتكرر: [["EN-gb"]] بقت [["en-GB"]] فبقت زي اللي بعدها.
- [["zh-hant-tw"]]: الـ script اتكتب أوله كبير ([[Hant]] = صيني تقليدي) والبلد كبيرة.
- [["ar_EG"]] بتوقّع اللستة كلها، حتى [["en-US"]] السليمة. لو الـ tags جاية من يوزر، ظبّط كل واحد لوحده جوه [[try]] (زي التمرين التاني).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[pickLang(header, available)]] بتاخد هيدر [[Accept-Language]] زي [["fr-CH, fr;q=0.9, ar-SA;q=0.8, en;q=0.7"]] (اللي المتصفح بيبعته للسيرفر) ولستة اللغات اللي موقعك فيها ([[["ar-EG", "en-US"]]])، وبترجّع أحسن لغة: الترتيب بالـ [[q]] (الوزن، الافتراضي 1)، والـ tag بالظبط أو نفس اللغة ببلد تانية، وإلا أول واحدة في [[available]]. والـ tag البايظ يتخطّى من غير ما يوقّع.`, done: R`الهيدر اللي فوق بيرجّع [["ar-EG"]] (الفرنساوي مش عندك، فالعربي اللي بعده كسب)، و [["en-GB,en;q=0.9"]] بيرجّع [["en-US"]]، و [["de, ar_EG;q=0.5"]] بيرجّع [["ar-EG"]] من غير ما يقع، والهيدر الفاضي و [[undefined]] و [["*"]] بيرجّعوا [["ar-EG"]]. والاختبارات اللي في المربع عدّت.`, sol: R`~~~js pick-lang.js
function pickLang(header, available, fallback = available[0]) {
  const wanted = String(header ?? "")
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map(p => p.trim()).find(p => p.startsWith("q="));
      return { tag: tag.trim(), q: q ? Number(q.slice(2)) : 1, i };
    })
    .filter(x => x.tag && x.tag !== "*" && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { tag } of wanted) {
    let canon;
    try { [canon] = Intl.getCanonicalLocales(tag); } catch { continue; }
    if (available.includes(canon)) return canon;
    const lang = canon.split("-")[0];
    const sameLang = available.find(a => a.split("-")[0] === lang);
    if (sameLang) return sameLang;
  }
  return fallback;
}
const av = ["ar-EG", "en-US"];
console.log(pickLang("fr-CH, fr;q=0.9, ar-SA;q=0.8, en;q=0.7", av));
console.log(pickLang("en-GB,en;q=0.9", av));
console.log(pickLang("de, ar_EG;q=0.5", av));
console.log(pickLang("", av), pickLang(undefined, av), pickLang("*", av));
~~~

~~~text الناتج
ar-EG
en-US
ar-EG
ar-EG ar-EG ar-EG
~~~

- **الـ parsing:** كل حتة بين فاصلتين فيها tag، وممكن بعده [[;q=0.8]]. [[i]] بيحفظ الترتيب الأصلي عشان لو وزنين متساويين الأول يكسب ([[b.q - a.q || a.i - b.i]]: لو الفرق صفر، [[||]] بتروح للترتيب).
- **[[q=0]]** معناها «مش عايز اللغة دي»، فبتتشال.
- **[["ar_EG"]]** بترمي جوه [[getCanonicalLocales]]، و [[catch { continue; }]] بتعدّيها لـ اللي بعدها.
- **«نفس اللغة ببلد تانية»:** [["ar-SA"]] مش عندك، بس [["ar-EG"]] عربي برضه، وده أحسن من الإنجليزي.
- الغلطة الشائعة: تاخد أول tag في الهيدر وخلاص. [[q]] موجود عشان اليوزر رتّب اللغات بنفسه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيرسم جدول ٥٠ ألف سعر، ومش شغال، ولما يشتغل هيبقى بطيء. لاقي الغلطتين وصلّحهم، وقيس الوقت قبل وبعد التصليح التاني:
[[const html = rows.map(r => "<td>" + new Intl.NumberFormat("ar_EG", { style: "currency", currency: "EGP" }).format(r.price) + "</td>");]]`, done: R`أول تشغيل بيوقع بـ [[RangeError: Incorrect locale information provided]] وعرفت إنها الـ [[_]]، وبعد تصليحها الوقت حوالي ٢ ثانية، وبعد ما طلّعت الـ formatter برّه الـ [[map]] بقى أقل من ١٠٠ ms لنفس الـ ٥٠ ألف.`, sol: R`**الغلطة ١:** [["ar_EG"]] بالـ underscore:

~~~text الناتج
RangeError: Incorrect locale information provided
    at new NumberFormat (<anonymous>)
~~~

**الغلطة ٢:** formatter جديد لكل صف. بعد تصليح الأولى بس:

~~~text الناتج
render: 1.878s
~~~

**الحل:**

~~~js render.js
const rows = Array.from({ length: 50000 }, (_, i) => ({ id: i, price: i * 3.75 }));
console.time("render");
const money = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
const html = rows.map(r => "<td>" + money.format(r.price) + "</td>");
console.timeEnd("render");
console.log(html.length);
~~~

~~~text الناتج (Node 24.22)
render: 48.52ms
50000
~~~

- [["ar-EG"]] بشَرطة: BCP 47 مبيقبلش [[_]].
- [[money]] اتعمل مرة واحدة: من ١٨٧٨ ms لـ ٤٩ ms، يعني حوالي ٣٨ مرة أسرع على الجهاز ده.
- [[console.time(label)]] و [[console.timeEnd(label)]] بيقيسوا الوقت بين السطرين بنفس الاسم.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من صفحة [[Intl.supportedValuesOf]] على MDN وبالتشغيل، جاوب: (١) [[EGP]] عملة مدعومة؟ (٢) كام time zone اسمها بيبدأ بـ [["Africa/"]]؟ (٣) أنهي تقاويم هجري متاحة؟ (٤) [["kilometer-per-hour"]] جوه قايمة الوحدات؟ وينفع تستخدمها في [[NumberFormat]]؟ (٥) إيه اللي بيحصل لو طلبت مفتاح [["locale"]]؟`, done: R`عندك ٥ إجابات مكتوبة قبل التشغيل، والتشغيل أكّدهم أو صلّحهم، وعرفت ليه الإجابة الرابعة فيها مفاجأة.`, sol: R`~~~js values.js
console.log(Intl.supportedValuesOf("currency").includes("EGP"));
console.log(Intl.supportedValuesOf("timeZone").filter(z => z.startsWith("Africa/")).length);
console.log(Intl.supportedValuesOf("calendar").filter(c => c.startsWith("islamic")));
console.log(Intl.supportedValuesOf("unit").includes("kilometer-per-hour"), Intl.supportedValuesOf("unit").includes("kilogram"));
console.log(new Intl.NumberFormat("ar-EG", { style: "unit", unit: "kilometer-per-hour" }).format(60));
try { Intl.supportedValuesOf("locale"); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج (Node 24.22)
true
52
[
  'islamic',
  'islamic-civil',
  'islamic-rgsa',
  'islamic-tbla',
  'islamic-umalqura'
]
false true
٦٠ كم/س
RangeError: Invalid key : locale
~~~

**الإجابة النموذجية:** (١) أيوه. (٢) ٥٢ في Node 24.22 (الرقم بيتغيّر مع النسخ). (٣) ٥ تقاويم هجري، و [[islamic-umalqura]] هو تقويم أم القرى اللي السعودية بتستخدمه. (٤) **مش** في القايمة، بس [[NumberFormat]] قبلها وطلع «٦٠ كم/س»: القايمة فيها الوحدات البسيطة بس (٤٥ وحدة)، و MDN بيقول إن أي وحدتين بسيطتين بينهم [[-per-]] مقبولين. (٥) [[RangeError: Invalid key : locale]]: اللغات مش هنا، بتتسأل بـ [[supportedLocalesOf]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس فكرة قسم ٩ بس على التواريخ: ١٠٠ ألف [[Date]] (كل دقيقة من أول ٢٠٢٦) بـ [[toLocaleString("ar-EG", opts)]] مقابل [[Intl.DateTimeFormat]] واحد بنفس الـ [[opts]] ([[dateStyle: "medium"]] و [[timeStyle: "short"]] و [[timeZone: "Africa/Cairo"]]). ٣ تشغيلات، واتأكد إن الطريقتين طلّعوا نفس عدد الحروف.`, done: R`عندك ٣ سطور أرقام، والعدد الإجمالي للحروف واحد في الطريقتين (يعني نفس الناتج)، والـ formatter الواحد أسرع بأكتر من ٢٠ مرة.`, sol: R`~~~js dates-bench.js
const dates = Array.from({ length: 100000 }, (_, i) => new Date(Date.UTC(2026, 0, 1) + i * 60000));
const opts = { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Cairo" };
function bench(name, fn) {
  const t = performance.now();
  let n = 0;
  for (const d of dates) n += fn(d).length;
  return name + " " + (performance.now() - t).toFixed(0) + " ms (" + n + ")";
}
for (let r = 0; r < 3; r++) {
  const dtf = new Intl.DateTimeFormat("ar-EG", opts);
  console.log([bench("toLocaleString", d => d.toLocaleString("ar-EG", opts)), bench("formatter واحد", d => dtf.format(d))].join(" | "));
}
~~~

~~~text الناتج (Node 24.22)
toLocaleString 7521 ms (2025000) | formatter واحد 335 ms (2025000)
toLocaleString 7589 ms (2025000) | formatter واحد 262 ms (2025000)
toLocaleString 7329 ms (2025000) | formatter واحد 296 ms (2025000)
~~~

- **الرقم اللي بين القوسين** مجموع طول كل النصوص: متساوي، يعني الطريقتين طلّعوا نفس الناتج بالظبط، والمقارنة عادلة.
- حوالي **٢٥ مرة** أسرع. التواريخ أبطأ من الأرقام في الطريقتين لأن فيها حسابات time zone لكل لحظة.
- [[Date.UTC(2026, 0, 1)]] بيرجّع ms لأول يناير UTC (الشهر من صفر)، و [[+ i * 60000]] دقيقة لكل عنصر.
- في React أو أي UI بيرسم لستة طويلة: اعمل الـ formatter برّه الـ component أو في [[useMemo]]، مش جوه كل صف.` },
          ],
          check: {
            lang: "js",
            starter: R`function pickLang(header, available, fallback = available[0]) {
  // header زي "fr-CH, fr;q=0.9, ar-SA;q=0.8"
}`,
            tests: R`const av = ["ar-EG", "en-US"];
test("الترتيب بالـ q ونفس اللغة", () => expect(pickLang("fr-CH, fr;q=0.9, ar-SA;q=0.8, en;q=0.7", av)).toBe("ar-EG"));
test("نفس اللغة ببلد تانية", () => expect(pickLang("en-GB,en;q=0.9", av)).toBe("en-US"));
test("tag بايظ ميوقّعش", () => expect(pickLang("de, ar_EG;q=0.5", av)).toBe("ar-EG"));
test("الوزن الأعلى يكسب حتى لو جه متأخر", () => expect(pickLang("ar;q=0.2, en;q=0.9", av)).toBe("en-US"));
test("q=0 معناها لأ", () => expect(pickLang("en;q=0, ar", av)).toBe("ar-EG"));
test("فاضي و undefined و *", () => expect([pickLang("", av), pickLang(undefined, av), pickLang("*", av)]).toEqual(["ar-EG", "ar-EG", "ar-EG"]));`,
            solution: R`function pickLang(header, available, fallback = available[0]) {
  const wanted = String(header ?? "")
    .split(",")
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map(p => p.trim()).find(p => p.startsWith("q="));
      return { tag: tag.trim(), q: q ? Number(q.slice(2)) : 1, i };
    })
    .filter(x => x.tag && x.tag !== "*" && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { tag } of wanted) {
    let canon;
    try { [canon] = Intl.getCanonicalLocales(tag); } catch { continue; }
    if (available.includes(canon)) return canon;
    const lang = canon.split("-")[0];
    const sameLang = available.find(a => a.split("-")[0] === lang);
    if (sameLang) return sameLang;
  }
  return fallback;
}`
          },
          ref: [
            { t: "MDN: Intl", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" },
            { t: "MDN: Intl.getCanonicalLocales()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales" },
            { t: "MDN: Intl.supportedValuesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf" },
            { t: "MDN: Intl.NumberFormat.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/supportedLocalesOf" },
            { t: "MDN: Intl.NumberFormat.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/resolvedOptions" },
          ],
          pre: ["js/Number: toFixed و toString و toLocaleString", "js/UTC و Intl.DateTimeFormat"],
          deep: {
            why: R`أي موقع بيتفتح من بلاد مختلفة أو بلغتين محتاج يعرض الأرقام والتواريخ زي ما كل يوزر متعوّد. والغلط هنا مش بيوقّع حاجة: الصفحة بتشتغل عادي بس بأرقام لاتيني بدل العربي، أو بلغة الجهاز بدل لغة اليوزر، أو بتقويم غلط. ومن غير [[resolvedOptions]] مش هتعرف ده حصل غير لما يوزر يشتكي.`,
            how: R`لما تعمل [[new Intl.NumberFormat(locales, options)]]: (١) كل tag بيتظبط زي [[getCanonicalLocales]] (والبايظ بيرمي). (٢) بيلف على اللستة بالترتيب، ولكل واحد بيشوف عنده بيانات ليه أو لـ «أبوه» ([["ar-ZZ"]] ← [["ar"]]). (٣) لو ملقاش، بياخد الـ default locale بتاع الـ runtime. (٤) الـ [[-u-]] extensions اللي الـ formatter ده بيفهمها بتتقرا، والـ options بتكسبها. (٥) الإعدادات النهائية بتتحفظ، وهي اللي [[resolvedOptions()]] بترجّعها. كل ده تقيل، فبيحصل في الـ constructor مرة واحدة، و [[format]] بعد كده سريعة.`,
            when: R`[[getCanonicalLocales]] لأي tag جاي من برّه (إعدادات يوزر، هيدر، URL). [[supportedLocalesOf]] لما تحتاج تعرف قبل ما تعرض («اللغة دي مش مدعومة، هنعرض بالإنجليزي»). [[resolvedOptions]] وقت الـ debug ولما تحتاج معلومة زي timeZone الجهاز. [[supportedValuesOf]] لقوايم الإعدادات (اختار عملتك، اختار توقيتك) وللـ validation. والكاش لأي لستة أو جدول.`,
            mistakes: R`[["ar_EG"]] بـ underscore. افتراض إن [["ar"]] هتطلع أرقام عربي. formatter من غير locale في سيرفر بيعمل فواتير (الناتج بيتغيّر لما السيرفر يتنقل). formatter جديد في كل صف. مقارنة نص متنسّق في اختبار حرف بحرف من غير ما تشيل [[U+200F]] وتوحّد المسافات. وفي الانترفيو: «ليه [[toLocaleString]] جوه loop بطيء؟» الإجابة: بيعمل formatter (تفاوض وتحميل بيانات) في كل نداء.`,
          },
        },
        {
          cmd: "Intl.Locale",
          title: "تفك الـ locale لحتت وتسأله: البلد دي أسبوعها بيبدأ إمتى، واتجاهها إيه، وساعتها ١٢ ولا ٢٤؟",
          desc: R`[[new Intl.Locale(tag, options)]] بيحوّل نص زي [["ar-EG-u-nu-latn"]] لـ object تقرا حتته وتعدّلها من غير ما تقطع النص بإيدك. وفيه بيانات البلد نفسها: أول يوم في الأسبوع، والويك إند، واتجاه الكتابة، والتقاويم وأنظمة الأرقام والساعة المستخدمة.
• الحتت: [[language]] و [[script]] و [[region]] و [[baseName]] (الثلاثة من غير extensions) و [[variants]].
• التفضيلات: [[calendar]] و [[numberingSystem]] و [[hourCycle]] و [[collation]] و [[caseFirst]] و [[numeric]].
• [[maximize()]] بتكمّل الناقص ([["ar"]] ← [["ar-Arab-EG"]])، و [[minimize()]] بتشيل اللي يتعرف لوحده، و [[toString()]] بترجّع الـ tag.
• [[getWeekInfo()]] و [[getTextInfo()]] و [[getHourCycles()]] و [[getCalendars()]] و [[getNumberingSystems()]] و [[getCollations()]] و [[getTimeZones()]]: بيانات البلد من CLDR.`,
          example: R`const loc = new Intl.Locale("ar-EG-u-ca-islamic-umalqura-nu-latn-hc-h23");
console.log(loc.language, loc.region, loc.script, loc.baseName);
console.log(loc.calendar, loc.numberingSystem, loc.hourCycle);
console.log(loc.toString());
const eg = new Intl.Locale("ar-EG");
console.log(eg.maximize().toString(), new Intl.Locale("ar-Arab-EG").minimize().toString());
console.log(eg.getTextInfo(), eg.getWeekInfo(), eg.getHourCycles());
console.log(eg.getCalendars(), eg.getNumberingSystems(), eg.getTimeZones(), eg.getCollations());`,
          try: R`اطبع لـ [["en-US"]] و [["en-GB"]] و [["de-DE"]] و [["ar-SA"]] و [["he-IL"]] و [["fa-IR"]]: [[getWeekInfo()]] و [[getTextInfo().direction]] و [[getHourCycles()]] و [[getCalendars()]]. أنهي بلد أسبوعها بيبدأ السبت؟ وأنهي واحدة الويك إند بتاعها يوم واحد؟`,
          sol: R`~~~js week-info.js
for (const tag of ["en-US", "en-GB", "de-DE", "ar-SA", "he-IL", "fa-IR"]) {
  const l = new Intl.Locale(tag);
  const w = l.getWeekInfo();
  console.log(tag.padEnd(6), ("{ firstDay: " + w.firstDay + ", weekend: [" + w.weekend + "] }").padEnd(32), l.getTextInfo().direction, l.getHourCycles()[0], l.getCalendars().join(", "));
}
~~~

~~~text الناتج (Node 24.22)
en-US  { firstDay: 7, weekend: [6,7] }  ltr h12 gregory
en-GB  { firstDay: 1, weekend: [6,7] }  ltr h23 gregory
de-DE  { firstDay: 1, weekend: [6,7] }  ltr h23 gregory
ar-SA  { firstDay: 7, weekend: [5,6] }  rtl h12 gregory, islamic-umalqura, islamic, islamic-rgsa
he-IL  { firstDay: 7, weekend: [5,6] }  rtl h23 gregory, hebrew, islamic, islamic-civil, islamic-tbla
fa-IR  { firstDay: 6, weekend: [5] }    rtl h23 persian, gregory, islamic, islamic-civil, islamic-tbla
~~~

الأيام بالأرقام: ١ الاتنين لحد ٧ الحد. أمريكا والسعودية وإسرائيل أسبوعهم بيبدأ الحد (٧)، وإيران السبت (٦) زي مصر، وإيران الويك إند بتاعها الجمعة بس ([[[5]]]). وأول تقويم في لستة إيران [[persian]]: ده التقويم الأساسي هناك.`,
          teach: R`## الفكرة

في الدرس اللي فات الـ locale كان نص بتبعته للـ formatter. [[Intl.Locale]] بيحوّله لـ object: بتقرا منه الحتت، وتبني tag جديد بـ options بدل ما تلزق نصوص، وتسأله عن عادات البلد (الأسبوع والاتجاه والساعة). الناتج من Node 24.22 على Windows، والفروق مع Chrome 157 مكتوبة.

---

## ١. [[new Intl.Locale(tag, options)]]

~~~js locale-obj.js
const loc = new Intl.Locale("ar-EG-u-ca-islamic-umalqura-nu-latn-hc-h23");
const same = new Intl.Locale("ar", { region: "EG", calendar: "islamic-umalqura", numberingSystem: "latn", hourCycle: "h23" });
console.log(loc.toString() === same.toString());
console.log(new Intl.Locale("ar-EG-u-nu-arab", { numberingSystem: "latn" }).toString());
~~~

~~~text الناتج
true
ar-EG-u-nu-latn
~~~

- الطريقتين بيعملوا نفس الـ locale: tag فيه كل حاجة، أو tag صغير + options. الـ options أوضح وأأمن من تلزيق نصوص.
- الـ option بيكسب الـ extension اللي في النص ([[nu-arab]] بقت [[nu-latn]]).
- لازم [[new]]: [[Intl.Locale("ar")]] بيرمي [[TypeError: Constructor Intl.Locale requires 'new']]. ومن غير tag: [[TypeError: First argument to Intl.Locale constructor can't be empty or missing]]. و [["ar_EG"]] أو قيمة option بايظة ([[{ calendar: "x" }]]): [[RangeError: Incorrect locale information provided]].

---

## ٢. الـ properties: كل حتة لوحدها

نفس [[loc]] اللي فوق، و [["de-DE-u-co-phonebk-kf-upper-kn"]] للحاجات اللي مش فيه:

| الـ property | القيمة | معناها |
|---|---|---|
| [[Locale.prototype.language]] | [["ar"]] | اللغة بس |
| [[Locale.prototype.region]] | [["EG"]] | البلد، و [[undefined]] لو مش مكتوبة |
| [[Locale.prototype.script]] | [[undefined]] | الكتابة، موجودة بس لو مكتوبة في الـ tag ([["sr-Latn-RS"]] ← [["Latn"]]) |
| [[Locale.prototype.baseName]] | [["ar-EG"]] | اللغة والكتابة والبلد والـ variants من غير الـ [[-u-]]: ده اللي تقارن بيه |
| [[Locale.prototype.variants]] | [["1996"]] لـ [["de-CH-1996"]] | اللهجة أو الإملا، **مش موجودة في Node 24.22** (بترجّع [[undefined]]) وموجودة في Chrome 157 |
| [[Locale.prototype.calendar]] | [["islamic-umalqura"]] | التقويم من [[-u-ca-]] |
| [[Locale.prototype.numberingSystem]] | [["latn"]] | الأرقام من [[-u-nu-]] |
| [[Locale.prototype.hourCycle]] | [["h23"]] | الساعة من [[-u-hc-]]: [[h11]] و [[h12]] و [[h23]] و [[h24]] |
| [[Locale.prototype.collation]] | [["phonebk"]] | قواعد الترتيب من [[-u-co-]] |
| [[Locale.prototype.caseFirst]] | [["upper"]] | الكبير قبل الصغير في الترتيب، من [[-u-kf-]] |
| [[Locale.prototype.numeric]] | [[true]] | من [[-u-kn]]: «file2» قبل «file10» في الترتيب |
| [[Locale.prototype.firstDayOfWeek]] | [["mon"]] لـ [["en-US-u-fw-mon"]] | تفضيل أول يوم من [[-u-fw-]] |

- كلها **قراية بس**: [[loc.region = "SA"]] مبتغيّرش حاجة. عايز تعديل؟ اعمل Locale جديد بـ options.
- كل تفضيل مش مكتوب بيرجّع [[undefined]] (مش القيمة الافتراضية للبلد). [[new Intl.Locale("ar-EG").numberingSystem]] = [[undefined]] مع إن مصر بتستخدم [[arab]]: القيمة الحقيقية بتجيبها من [[getNumberingSystems()]] (قسم ٤).

~~~text الناتج (السطور ٢-٤ من المثال)
ar EG undefined ar-EG
islamic-umalqura latn h23
ar-EG-u-ca-islamic-umalqura-hc-h23-nu-latn
~~~

---

## ٣. [[Locale.prototype.toString]] و [[Locale.prototype.maximize]] و [[Locale.prototype.minimize]]

[[toString()]] بترجّع الـ tag بالشكل الرسمي، والـ extensions **مترتبة أبجدي** ([[ca]] ثم [[hc]] ثم [[nu]]) مهما كان ترتيبك. و [[String(loc)]] بيدّي نفس النتيجة، وأي formatter بيقبل الـ Locale نفسه: [[new Intl.NumberFormat(loc)]].

~~~js max.js
console.log(new Intl.Locale("ar").maximize().toString(), new Intl.Locale("en").maximize().toString());
console.log(new Intl.Locale("zh-TW").maximize().toString());
console.log(new Intl.Locale("ar-Arab-EG").minimize().toString(), new Intl.Locale("ar-Arab-EG-u-nu-latn").minimize().toString());
~~~

~~~text الناتج
ar-Arab-EG en-Latn-US
zh-Hant-TW
ar ar-u-nu-latn
~~~

- **[[maximize()]]** بيكمّل الأرجح من بيانات اسمها «Likely Subtags»: العربي من غير بلد = مصر (أكبر عدد متحدثين)، والإنجليزي = أمريكا، والصيني في تايوان = كتابة تقليدية [[Hant]].
- **[[minimize()]]** بيشيل اللي ممكن يتعرف لوحده، وبيسيب الـ extensions.
- الاستخدام: تكمّل بلد ناقصة عشان تجيب [[getTimeZones()]] أو [[getWeekInfo()]] بتاعة بلد. **بس متفرمتش بالناتج**: [[new Intl.NumberFormat("ar-Arab-EG")]] بيتفاوض لـ [["ar"]] ويطلع أرقام لاتيني (اتقاس في الدرس اللي فات). خد [[language + "-" + region]] بس.

---

## ٤. بيانات البلد: [[getWeekInfo]] و [[getTextInfo]] و [[getHourCycles]] وأخواتهم

~~~text الناتج (آخر سطرين في المثال)
{ direction: 'rtl' } { firstDay: 6, weekend: [ 5, 6 ] } [ 'h12' ]
[ 'gregory', 'coptic', 'islamic', 'islamic-civil', 'islamic-tbla' ] [ 'arab' ] [ 'Africa/Cairo' ] [ 'compat', 'emoji', 'eor' ]
~~~

| الـ method | بترجّع إيه | لـ [["ar-EG"]] |
|---|---|---|
| [[Locale.prototype.getWeekInfo()]] | [[firstDay]] أول يوم (١ الاتنين لحد ٧ الحد) و [[weekend]] أيام الإجازة | السبت أول الأسبوع، والجمعة والسبت إجازة |
| [[Locale.prototype.getTextInfo()]] | [[direction]]: [["rtl"]] أو [["ltr"]] | [["rtl"]]: تحطه في [[dir]] بتاع الـ HTML |
| [[Locale.prototype.getHourCycles()]] | الساعة المستخدمة، الأول هو الأساسي | [[h12]] (٥:٠٥ م) |
| [[Locale.prototype.getCalendars()]] | التقاويم المستخدمة في البلد، الأول هو الأساسي | ميلادي، ثم القبطي، ثم الهجري |
| [[Locale.prototype.getNumberingSystems()]] | أنظمة الأرقام، الأول هو الأساسي | [[arab]] (٠١٢٣) |
| [[Locale.prototype.getCollations()]] | قواعد الترتيب الإضافية المتاحة غير الافتراضي | [[compat]] (ترتيب عربي قديم) و [[emoji]] و [[eor]] (أوروبي) |
| [[Locale.prototype.getTimeZones()]] | الـ time zones في البلد، و [[undefined]] لو مفيش [[region]] | [["Africa/Cairo"]] بس، وأمريكا ٢٩ zone |

لو في الـ tag تفضيل، الـ methods بترجّعه هو بس: [[new Intl.Locale("en-US-u-fw-mon").getWeekInfo()]] = [[{ firstDay: 1, weekend: [6, 7] }]]، و [[new Intl.Locale("ar-EG-u-hc-h23").getHourCycles()]] = [[[ 'h23' ]]].

### مقارنة بلاد (Node 24.22)

| الـ locale | أول الأسبوع | الويك إند | الاتجاه | الساعة |
|---|---|---|---|---|
| [["ar-EG"]] | ٦ السبت | ٥ و ٦ | rtl | h12 |
| [["ar-SA"]] | ٧ الحد | ٥ و ٦ | rtl | h12 |
| [["ar-AE"]] | ١ الاتنين | ٦ و ٧ | rtl | h12 |
| [["en-US"]] | ٧ الحد | ٦ و ٧ | ltr | h12 |
| [["en-GB"]] و [["de-DE"]] | ١ الاتنين | ٦ و ٧ | ltr | h23 |
| [["fa-IR"]] | ٦ السبت | ٥ بس | rtl | h23 |

الإمارات غيّرت الويك إند للسبت والحد سنة ٢٠٢٢، و CLDR متحدّثة بيها: ده سبب إنك تاخدها من [[getWeekInfo()]] مش من جدول مكتوب في الكود.

---

## ٥. الـ getters القديمة: [[weekInfo]] بدون [[get]]

النسخة الأولى من الاقتراح كانت properties: [[loc.weekInfo]] و [[loc.calendars]] و [[loc.textInfo]]... واتغيّرت لـ methods. **Node 24.22 لسه فيه الاتنين**، و **Chrome 157 شال القديم**:

~~~text الناتج: typeof eg.weekInfo و typeof eg.getWeekInfo
Node 24.22    object      function
Chrome 157    undefined   function
~~~

يعني كود بيستخدم [[eg.weekInfo.firstDay]] بيشتغل في Node ويوقع في المتصفح بـ [[TypeError: Cannot read properties of undefined (reading 'firstDay')]]. استخدم الـ [[get]] methods دايمًا.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تقرا اللغة أو البلد من tag | [[new Intl.Locale(tag).language]] و [[.region]] |
| تبني tag من غير تلزيق نصوص | [[new Intl.Locale("ar", { region: "EG", numberingSystem: "latn" })]] |
| تقارن لغتين من غير التفضيلات | [[baseName]] |
| تكمّل بلد ناقصة | [[maximize()]]، ومتفرمتش بناتجها |
| [[dir]] للصفحة | [[getTextInfo().direction]] |
| رأس تقويم وأيام الإجازة | [[getWeekInfo()]] |
| الافتراضي الحقيقي للبلد (أرقام، ساعة، تقويم) | [[getNumberingSystems()[0]]] و [[getHourCycles()[0]]] و [[getCalendars()[0]]] |

اللي ميتلخبطش: الـ properties بترجّع اللي **مكتوب** في الـ tag بس، والـ [[get]] methods بترجّع بيانات البلد.`,
          lines: [
            R`Locale من tag فيه لغة وبلد و ٣ تفضيلات: التقويم الهجري أم القرى، وأرقام لاتيني، وساعة ٢٤`,
            R`الحتت الأساسية: [[ar]] و [[EG]] و [[undefined]] للـ script لأنه مش مكتوب، و [[baseName]] = [[ar-EG]] من غير التفضيلات`,
            R`التفضيلات اللي في الـ [[-u-]]: [[islamic-umalqura]] و [[latn]] و [[h23]]`,
            R`[[toString()]] بترجّع الـ tag والـ extensions مترتبة أبجدي: [[ca]] ثم [[hc]] ثم [[nu]]`,
            R`Locale عادي لمصر من غير تفضيلات، عشان نسأله عن بيانات البلد`,
            R`[[maximize()]] كمّلت الكتابة [[ar-Arab-EG]]، و [[minimize()]] رجّعت [[ar-Arab-EG]] لـ [[ar]] بس لأن الباقي يتعرف لوحده`,
            R`الاتجاه [[rtl]]، والأسبوع بيبدأ السبت (٦) والإجازة الجمعة والسبت، والساعة [[h12]]`,
            R`التقاويم المستخدمة في مصر، والأرقام [[arab]]، والـ zone الوحيدة [["Africa/Cairo"]]، وقواعد ترتيب إضافية`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لـ [[new Intl.Locale("en-Latn-US-u-hc-h23")]]: هيطبع إيه [[language]] و [[script]] و [[region]] و [[hourCycle]] و [[baseName]]؟ و [[minimize().toString()]]؟ وبعدين [[new Intl.Locale("en", { region: "GB", hourCycle: "h12" }).toString()]] (من قسم ٢ و ٣ في الشرح).`, done: R`كتبت التوقع قبل التشغيل، وعرفت إن [[baseName]] فيها [[Latn]] لأنها مكتوبة، وإن [[minimize]] شالت [[Latn-US]] وسابت [[-u-hc-h23]].`, sol: R`~~~js read.js
const l = new Intl.Locale("en-Latn-US-u-hc-h23");
console.log(l.language, l.script, l.region, l.hourCycle, l.baseName);
console.log(l.minimize().toString(), l.toString());
console.log(new Intl.Locale("en", { region: "GB", hourCycle: "h12" }).toString());
~~~

~~~text الناتج
en Latn US h23 en-Latn-US
en-u-hc-h23 en-Latn-US-u-hc-h23
en-GB-u-hc-h12
~~~

- [[baseName]] = كل اللي قبل [[-u-]]، فالـ script فيها لأنه مكتوب.
- [[minimize()]] شالت [[Latn]] و [[US]] لأن [[maximize]] بتاع [["en"]] بيرجّعهم تاني، والـ extensions بتفضل زي ما هي.
- التالت: الـ options بتتحوّل لـ extensions في الـ tag. لاحظ إن [[h12]] في بريطانيا تفضيل شخصي (الافتراضي هناك [[h23]]).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[weekdaysFor(tag, width)]] بترجّع أسامي أيام الأسبوع السبعة بلغة الـ tag **مبتدية من أول يوم في أسبوع البلد دي** (رأس تقويم شهري). من غير جدول أيام في الكود: الأسامي من [[Intl.DateTimeFormat]] بـ [[weekday]]، والبداية من [[getWeekInfo()]] (من قسم ٤ في الشرح).`, done: R`[[weekdaysFor("ar-EG")]] بيبدأ بـ «السبت» ويخلص بـ «الجمعة»، و [["en-US"]] بـ Sun، و [["de-DE"]] بـ Mo، و [["fa-IR"]] بحروف فارسي مبتدية بالسبت.`, sol: R`~~~js weekdays.js
function weekdaysFor(tag, width = "long") {
  const loc = new Intl.Locale(tag);
  const { firstDay } = loc.getWeekInfo(); // ١ = الاتنين ... ٧ = الحد
  const fmt = new Intl.DateTimeFormat(tag, { weekday: width, timeZone: "UTC" });
  // ٢٣ نوفمبر ٢٠٢٦ يوم اتنين، فاليوم رقم d هو 22 + d
  return Array.from({ length: 7 }, (_, i) => {
    const d = ((firstDay - 1 + i) % 7) + 1;
    return fmt.format(new Date(Date.UTC(2026, 10, 22 + d)));
  });
}
console.log(weekdaysFor("ar-EG").join(" "));
console.log(weekdaysFor("en-US", "short").join(" "));
console.log(weekdaysFor("de-DE", "short").join(" "));
console.log(weekdaysFor("fa-IR", "narrow").join(" "));
~~~

~~~text الناتج
السبت الأحد الاثنين الثلاثاء الأربعاء الخميس الجمعة
Sun Mon Tue Wed Thu Fri Sat
Mo Di Mi Do Fr Sa So
ش ی د س چ پ ج
~~~

- **التاريخ المرجعي:** محتاجين ٧ تواريخ معروف يومها. ٢٣ نوفمبر ٢٠٢٦ اتنين (رقم ١ في [[getWeekInfo]])، فرقم [[d]] = [[22 + d]] (و [[Date.UTC]] بيقبل يوم ٢٩ و ٣٠ عادي).
- **[[timeZone: "UTC"]]:** لأن التاريخ اتعمل بـ [[Date.UTC]]. من غيره، على جهاز في توقيت سالب (أمريكا) نص الليل UTC بيبقى اليوم اللي قبله، والأيام كلها تزحف.
- **[[((firstDay - 1 + i) % 7) + 1]]:** بيلف من أول يوم في البلد، ولما يعدّي ٧ يرجع لـ ١. لـ مصر: ٦، ٧، ١، ٢...
- الغلطة الشائعة: جدول [[["الأحد", "الاثنين", ...]]] ثابت في الكود، فرأس التقويم يبقى غلط في مصر (بتبدأ السبت) وأوروبا (الاتنين).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[htmlAttrs(tag)]] بترجّع [[lang="..." dir="..."]] لـ [[<html>]] من أي tag، والـ tag البايظ أو الفاضي يرجع لـ [["ar-EG"]] بدل ما يوقّع الصفحة. جرّبها على [["ar-EG"]] و [["en-US"]] و [["he-IL"]] و [["fa"]] و [["ur-PK"]] و [["ar_EG"]] و [[""]].`, done: R`العربي والعبري والفارسي والأوردو [[dir="rtl"]]، والإنجليزي [[ltr]]، و [["ar_EG"]] و [[""]] رجعوا [[lang="ar-EG" dir="rtl"]] من غير exception.`, sol: R`~~~js html-attrs.js
function htmlAttrs(tag, fallback = "ar-EG") {
  let loc;
  try {
    loc = new Intl.Locale(tag);
  } catch {
    loc = new Intl.Locale(fallback);
  }
  const dir = loc.getTextInfo().direction;
  return 'lang="' + loc.baseName + '" dir="' + dir + '"';
}
for (const t of ["ar-EG", "en-US", "he-IL", "fa", "ur-PK", "ar_EG", ""]) console.log(JSON.stringify(t).padEnd(9), htmlAttrs(t));
~~~

~~~text الناتج
"ar-EG"   lang="ar-EG" dir="rtl"
"en-US"   lang="en-US" dir="ltr"
"he-IL"   lang="he-IL" dir="rtl"
"fa"      lang="fa" dir="rtl"
"ur-PK"   lang="ur-PK" dir="rtl"
"ar_EG"   lang="ar-EG" dir="rtl"
""        lang="ar-EG" dir="rtl"
~~~

- **[[baseName]]** مش [[toString()]]: الـ [[lang]] بتاع HTML مالوش دعوة بـ [[-u-nu-latn]].
- [[""]] بيرمي [[RangeError]] و [["ar_EG"]] كمان، والاتنين بيقعوا في الـ [[catch]].
- ليه مش جدول [[["ar", "he", "fa", "ur"]]]؟ لأنك هتنسى لغات (اليديش [[yi]] والكردي السوراني [[ckb]] والديفيهي [[dv]]...)، و CLDR عارفاهم.
- في React/Next.js: [[<html lang={attrs.lang} dir={attrs.dir}>]] في الـ layout، والـ CSS يستخدم [[margin-inline-start]] بدل [[margin-left]] عشان يقلب لوحده.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الكود ده بيشتغل في Node ويوقع في صفحة على Chrome. ليه؟ وصلّحه: [[const start = new Intl.Locale(userLang).weekInfo.firstDay;]] (من قسم ٥ في الشرح).`, done: R`عرفت إن [[weekInfo]] getter قديم Chrome 157 شاله، وبعد ما بقت [[getWeekInfo().firstDay]] الكود بيطلع نفس الرقم في الاتنين.`, sol: R`~~~js week-old.js
const eg = new Intl.Locale("ar-EG");
console.log(typeof eg.weekInfo, typeof eg.getWeekInfo);
console.log(eg.weekInfo, eg.getWeekInfo());
~~~

~~~text الناتج (Node 24.22)
object function
{ firstDay: 6, weekend: [ 5, 6 ] } { firstDay: 6, weekend: [ 5, 6 ] }
~~~

~~~text الناتج (Chrome 157، Console)
undefined function
TypeError: Cannot read properties of undefined (reading 'firstDay')
~~~

**الحل:**

~~~js week.js
const start = new Intl.Locale(userLang).getWeekInfo().firstDay;
~~~

- الاقتراح الأول كان properties ([[weekInfo]] و [[calendars]] و [[hourCycles]]...)، واتغيّر لـ methods. Node 24.22 (V8 13.6) سايب القديم للتوافق، و Chrome 157 شاله خالص.
- الدرس: كود بيشتغل في Node مش ضمان إنه هيشتغل في المتصفح، حتى في حاجة مكتوبة في الـ standard. اتأكد من صفحة MDN (جدول Browser compatibility) ومن التشغيل في المتصفح نفسه.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[isWeekend(date, tag, timeZone)]] بترجّع [[true]] لو اللحظة دي يوم إجازة في البلد دي **بتوقيت المدينة دي**. جرّبها على جمعة الساعة ١٢ الضهر UTC في مصر وألمانيا، وعلى [["2026-11-21T23:30:00Z"]] في مصر مرة بـ UTC ومرة بـ [["Africa/Cairo"]].`, done: R`الجمعة إجازة في مصر ومش إجازة في ألمانيا، واللحظة التانية [[true]] بـ UTC (لسه السبت) و [[false]] بتوقيت القاهرة (بقت الحد ١:٣٠ الصبح).`, sol: R`~~~js weekend.js
const DAY = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };
function isWeekend(date, tag, timeZone) {
  const short = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone }).format(date);
  return new Intl.Locale(tag).getWeekInfo().weekend.includes(DAY[short]);
}
const fri = new Date("2026-11-20T10:00:00Z");
const satNightCairo = new Date("2026-11-21T23:30:00Z"); // في القاهرة ١:٣٠ الحد
console.log(isWeekend(fri, "ar-EG", "Africa/Cairo"), isWeekend(fri, "de-DE", "Europe/Berlin"));
console.log(isWeekend(satNightCairo, "ar-EG", "UTC"), isWeekend(satNightCairo, "ar-EG", "Africa/Cairo"));
~~~

~~~text الناتج
true false
true false
~~~

- **اليوم في المدينة:** [[date.getDay()]] بيدّي اليوم بتوقيت الجهاز مش المدينة. [[Intl.DateTimeFormat]] بـ [[timeZone]] و [[weekday: "short"]] بلغة ثابتة ([["en-US"]]) بيدّيك اسم اليوم هناك، والـ object [[DAY]] بيحوّله لرقم [[getWeekInfo]] (١ الاتنين).
- **ليه [["en-US"]] للاسم مش لغة اليوزر؟** عشان المفاتيح ثابتة. الاسم ده للكود مش للعرض.
- **[[getDay()]]** بيعد من صفر للحد، و [[getWeekInfo]] من ١ للاتنين: لو استخدمته من غير تحويل هتبقى الجمعة ٥ في الاتنين بالصدفة بس الحد ٠ مقابل ٧. الأأمن تحويل واحد صريح زي [[DAY]].` },
          ],
          ref: [
            { t: "MDN: Intl.Locale", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale" },
            { t: "MDN: Intl.Locale.prototype.maximize()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/maximize" },
            { t: "MDN: Intl.Locale.prototype.getWeekInfo()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo" },
            { t: "MDN: Intl.Locale.prototype.getTextInfo()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo" },
            { t: "MDN: Intl.Locale.prototype.variants", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/variants" },
          ],
          pre: ["js/Intl: الـ locale والتفاوض و supportedValuesOf"],
          deep: {
            why: R`من غيره بتعمل [[tag.split("-")]] وتتلخبط في [["zh-Hant-TW"]] و [["de-CH-1996"]] و [["ar-u-nu-latn"]]، وبتكتب جداول «اللغات اللي من اليمين» و «الدول اللي أسبوعها بيبدأ السبت» بإيدك وتنساها تقدم. [[Intl.Locale]] بيقرا الـ tag بالقواعد، وبيجيب البيانات دي من CLDR اللي بتتحدّث مع المتصفح.`,
            how: R`الـ constructor بيظبط الـ tag (زي [[getCanonicalLocales]])، ويحط الـ options مكان الـ extensions المقابلة، ويحفظ النتيجة. الـ properties بتقرا من النص ده بس. [[maximize]] بيستخدم جدول Likely Subtags من CLDR. والـ [[get]] methods بتسأل CLDR عن البلد ([[region]]، أو من [[maximize]] لو مش موجودة: عشان كده [[new Intl.Locale("ar").getWeekInfo()]] بيرجّع بيانات مصر، بس [[getTimeZones()]] بترجّع [[undefined]] لأنها محتاجة بلد مكتوبة).`,
            when: R`لما تقرا أو تعدّل tag (إعدادات اليوزر)، أو تحتاج [[dir]] للصفحة، أو رأس تقويم، أو أيام إجازة، أو الساعة ١٢ ولا ٢٤ قبل ما ترسم date picker، أو قايمة time zones للبلد اللي اليوزر اختارها.`,
            mistakes: R`تفرمت بناتج [[maximize()]] فتخسر أرقام البلد. تفتكر إن [[numberingSystem]] بترجّع الافتراضي (بترجّع اللي مكتوب بس). تستخدم [[weekInfo]] القديم. تنسى إن [[getTimeZones()]] ممكن ترجّع [[undefined]] أو ٢٩ zone. تعتمد على [[variants]] في Node 24 (لسه [[undefined]]). جدول أيام أو اتجاهات ثابت في الكود.`,
          },
        },
        {
          cmd: "Intl.NumberFormat",
          title: "تكتب الفلوس والنسب والوحدات والنطاقات بأي لغة، وتلوّن كل حتة في الرقم لوحدها",
          desc: R`[[new Intl.NumberFormat(locale, options)]] هو الـ formatter اللي [[toLocaleString]] بيستخدمه من جوه، بس بتعمله مرة وتستخدمه كتير، ومعاه أدوات مش موجودة في [[toLocaleString]]:
• [[format(n)]]: الرقم كنص. بياخد number أو BigInt أو نص رقم (من غير ما يخسر دقة).
• [[formatToParts(n)]]: نفس النص بس متقطّع أجزاء ([[integer]] و [[group]] و [[decimal]] و [[fraction]] و [[currency]] و [[minusSign]]...)، عشان تلوّن أو تحط كل جزء في [[<span>]].
• [[formatRange(a, b)]] و [[formatRangeToParts(a, b)]]: «من كام لكام» بالشكل الصح لكل لغة («٢٥٠–٩٠٠ ج.م.» بعملة واحدة)، و [[~]] لو الطرفين بقوا نفس الرقم بعد التقريب.
• [[resolvedOptions()]] و [[Intl.NumberFormat.supportedLocalesOf()]].
والـ options: [[style]] ([["currency"]] و [["percent"]] و [["unit"]])، و [[signDisplay]]، و [[roundingMode]] و [[roundingIncrement]]، و [[notation]]، و [[numberingSystem]].`,
          example: R`const egp = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
console.log(JSON.stringify(egp.format(1999.5)));
console.log(egp.formatToParts(-1999.5).map(p => p.type).join(" "));
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
console.log(usd.formatRange(100, 250), "|", usd.formatRange(99.996, 100));
console.log(new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" }).format(5));
console.log(new Intl.NumberFormat("en", { maximumFractionDigits: 0, roundingMode: "halfEven" }).format(2.5));
console.log(egp.resolvedOptions().minimumFractionDigits, Intl.NumberFormat.supportedLocalesOf(["ar-EG", "xx"]));`,
          try: R`اعمل formatter واحد لـ [["ar-EG"]] بالجنيه، وواحد لـ [["en-EG"]] بالجنيه، وواحد لـ [["en-US"]] بالجنيه و [[currencyDisplay: "narrowSymbol"]]، واطبع ١٩٩٩٫٥ بالتلاتة. وبعدين بـ [["ar-EG"]] و [[currencyDisplay: "name"]] اطبع 1 و 3 و 11: الكلمة بتتغيّر؟`,
          sol: R`~~~js egp.js
const show = s => JSON.stringify(s).replace(/\u200f/g, "<RLM>").replace(/\u00a0/g, "<NBSP>");
console.log(show(new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(1999.5)));
console.log(show(new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" }).format(1999.5)));
console.log(show(new Intl.NumberFormat("en-US", { style: "currency", currency: "EGP", currencyDisplay: "narrowSymbol" }).format(1999.5)));
const name = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", currencyDisplay: "name" });
console.log([1, 3, 11].map(n => name.format(n)).join(" | "));
~~~

~~~text الناتج (Node 24.22)
"<RLM>١٬٩٩٩٫٥٠<NBSP>ج.م.<RLM>"
"EGP<NBSP>1,999.50"
"E£1,999.50"
١٫٠٠ جنيه مصري | ٣٫٠٠ جنيهات مصرية | ١١٫٠٠ جنيهًا مصريًا
~~~

[["en-EG"]] (إنجليزي في مصر) بيكتب الكود [[EGP]] قبل الرقم، و [[narrowSymbol]] بيدّي الرمز القصير [[E£]]. واسم العملة بيتبع قواعد الجمع العربي (موضوع درس [[Intl.PluralRules]]): «جنيه» و «جنيهات» و «جنيهًا».`,
          teach: R`## الفكرة

درس «Number: toFixed و toString و toLocaleString» علّمك [[toLocaleString]] بـ [[style]] و [[currency]] و [[notation]]. الدرس ده بيكمّل من هناك: الـ formatter نفسه، وأجزاءه، والنطاقات، والتقريب بكل أنواعه. الناتج من Node 24.22 (ICU 78.3)، والحروف المخفية مكتوبة بأسمائها ([[<RLM>]] و [[<NBSP>]] و [[<ALM>]]، اتشرحوا في درس «Intl: الـ locale والتفاوض»).

---

## ١. [[NumberFormat.prototype.format]]

~~~js format.js
const egp = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
console.log([1, 2.5, 1000].map(egp.format));
console.log(new Intl.NumberFormat("en").format(12345678901234567890n));
console.log(new Intl.NumberFormat("en").format("12345678901234567890.123"), "|", new Intl.NumberFormat("en").format(12345678901234567890.123));
console.log(egp.format("abc"));
~~~

~~~text الناتج
[ '<RLM>١٫٠٠<NBSP>ج.م.<RLM>', '<RLM>٢٫٥٠<NBSP>ج.م.<RLM>', '<RLM>١٬٠٠٠٫٠٠<NBSP>ج.م.<RLM>' ]
12,345,678,901,234,567,890
12,345,678,901,234,567,890.123 | 12,345,678,901,234,567,000
<RLM>ليس<NBSP>رقمًا<NBSP>ج.م.<RLM>
~~~

- **[[format]] مربوطة بالـ formatter** (bound getter): [[map(egp.format)]] شغالة من غير [[map(n => egp.format(n))]]. ده مش صح في معظم الـ methods التانية ([[formatToParts]] مثلًا لازم arrow function).
- **BigInt** بيتكتب بكل أرقامه.
- **النص** بيتقرا كرقم عشري بالظبط من غير ما يعدّي على [[Number]]: [["12345678901234567890.123"]] فضل سليم، بس نفس الرقم كـ number خسر آخر أرقامه (الـ [[Number]] دقته حوالي ١٥-١٧ رقم). ده مفيد للفلوس اللي جاية من الداتابيز كنص ([[NUMERIC]] في Postgres).
- **[["abc"]]** مبيرميش error: بيطبع «ليس رقمًا» (NaN بالعربي). فاتأكد من الرقم قبل ما تعرضه.

---

## ٢. الفلوس: نفس الجنيه بكذا شكل

| الكود | الناتج | إمتى |
|---|---|---|
| [["ar-EG"]] و [[currency: "EGP"]] | [[<RLM>١٬٩٩٩٫٥٠<NBSP>ج.م.<RLM>]] | الافتراضي لموقع مصري |
| نفسه + [[numberingSystem: "latn"]] | [[<RLM>1,999.50<NBSP>ج.م.<RLM>]] | لو جمهورك متعوّد على الأرقام الإنجليزي |
| نفسه + [[currencyDisplay: "code"]] | [[<RLM>١٬٩٩٩٫٥٠<NBSP>EGP]] | فواتير وتقارير فيها أكتر من عملة |
| نفسه + [[currencyDisplay: "name"]] | [[١٬٩٩٩٫٥٠ جنيه مصري]] | نص بيتقري بصوت أو مكتوب كجملة |
| [["en-EG"]] | [[EGP<NBSP>1,999.50]] | الواجهة الإنجليزي لموقع مصري |
| [["en-US"]] + [[currencyDisplay: "narrowSymbol"]] | [[E£1,999.50]] | مكان ضيق زي كارت منتج |
| [["en-US"]] و [[USD]] و [[currencySign: "accounting"]] على [[-50]] | [[($50.00)]] | جداول محاسبة: السالب بين قوسين |

- عدد الكسور بييجي من العملة نفسها: الجنيه والدولار ٢، والدينار الكويتي ٣، والين صفر. ومتغيّرهوش إلا لو عارف بتعمل إيه.
- [[<NBSP>]] بين الرقم و «ج.م.» عشان ميتفصلوش على سطرين، و [[<RLM>]] على الطرفين عشان المبلغ يفضل في مكانه جوه جملة فيها إنجليزي.

---

## ٣. [[NumberFormat.prototype.formatToParts]]: الرقم حتت

~~~js parts.js
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
console.log(usd.formatToParts(-1234.5));
~~~

~~~text الناتج
[
  { type: 'minusSign', value: '-' },
  { type: 'currency', value: '$' },
  { type: 'integer', value: '1' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '234' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '50' }
]
~~~

ولـ [["ar-EG"]] على [[-1999.5]] الترتيب: [[literal(<ALM>) minusSign literal(<RLM>) integer group integer decimal fraction literal(<NBSP>) currency literal(<RLM>)]].

| الـ type | إيه هو |
|---|---|
| [[integer]] | الجزء الصحيح، ومتقطّع عند كل فاصل آلاف |
| [[group]] | فاصل الآلاف: [[,]] أو [[٬]] أو [[.]] في الألماني |
| [[decimal]] | العلامة العشرية: [[.]] أو [[٫]] أو [[,]] |
| [[fraction]] | اللي بعد العلامة العشرية |
| [[currency]] | [[$]] أو [[ج.م.]] أو [[EGP]] أو اسم العملة |
| [[minusSign]] و [[plusSign]] | الإشارة لما تتكتب |
| [[percentSign]] | علامة [[%]] أو [[٪]] |
| [[unit]] | الوحدة في [[style: "unit"]]: [[kg]] و [[كم/س]] |
| [[compact]] | [[K]] و [[M]] و «ألف» و «مليون» |
| [[literal]] | أي حاجة تانية: مسافات وحروف مخفية |
| [[nan]] و [[infinity]] | لـ [[NaN]] و [[Infinity]] |
| [[exponentSeparator]] و [[exponentInteger]] | الـ [[E]] والأس في [[notation: "scientific"]] |

ليه مش [[split]] على النص؟ لأن الفاصل والعلامة والأرقام والترتيب بيتغيّروا من لغة للغة. الـ parts بتقولك كل حتة إيه مهما كانت اللغة. (تمرين ٢ بيبني بيها HTML، وتمرين ٣ بيعكسها ويقرا رقم متنسّق.)

---

## ٤. وحدات ونسب وأرقام مختصرة

~~~text الناتج
style: "unit", unit: "kilometer-per-hour"   ar-EG   ٦٠ كم/س
unit: "megabyte", unitDisplay: "narrow"     en-US   512MB
unit: "liter", unitDisplay: "long"          ar-EG   ٢ لتر
notation: "compact", compactDisplay: "long" ar-EG   ٢٫٥ مليون
notation: "compact", compactDisplay: "long" en-US   2.5 million
notation: "compact"                         ar-EG   ١٥<NBSP>ألف   (15300)
notation: "scientific" | "engineering"      en      1.235E5 | 123.456E3
style: "percent", maximumFractionDigits: 1  ar-EG   ١٢٫٣٪<ALM>   (0.1234)
minimumIntegerDigits: 3                     en      007
~~~

- **[[unit]]** لازم معاها اسم وحدة: [[TypeError: Invalid unit argument for Intl.NumberFormat() '']] لو نسيتها، و [[RangeError: Invalid unit argument for Intl.NumberFormat() 'kilogram-per-liter-x']] لو الاسم غلط. الوحدات المركبة بـ [[-per-]] مقبولة.
- **[[engineering]]** الأس بتاعه دايمًا مضاعف ٣ (E3 و E6): نفس الكيلو والميجا.
- **[[percent]]** بيضرب في ١٠٠: ابعت [[0.1234]] مش [[12.34]].

---

## ٥. [[signDisplay]]: الإشارة إمتى تظهر

~~~text الناتج: en-US على 0 | 5 | -5 | -0
auto        0 | 5 | -5 | -0
always      +0 | +5 | -5 | -0
exceptZero  0 | +5 | -5 | 0
negative    0 | 5 | -5 | 0
never       0 | 5 | 5 | 0
~~~

- **[["exceptZero"]]** للتغيير (+١٢٪ و -٣٪) من غير «+٠».
- **[["negative"]]** زي الافتراضي بس بيخفي [[-0]]. و [[-0]] بتطلع من حسابات زي [[Math.round(-0.004 * 100) / 100]]، والافتراضي بيكتبها «-0»: تمرين ٤.
- **[["never"]]** للقيمة المطلقة (المسافة، الفرق).

---

## ٦. التقريب: [[roundingMode]] و [[roundingIncrement]] وأخواتهم

~~~text الناتج: maximumFractionDigits: 0 على 2.5 | -2.5 | 2.4
ceil        3 | -2 | 3
floor       2 | -3 | 2
expand      3 | -3 | 3
trunc       2 | -2 | 2
halfCeil    3 | -2 | 2
halfFloor   2 | -3 | 2
halfExpand  3 | -3 | 2     ← الافتراضي
halfTrunc   2 | -2 | 2
halfEven    2 | -2 | 2     ← تقريب البنوك
~~~

- الـ [[half...]] بيقرّبوا للأقرب، والفرق بينهم بس لما الرقم في النص بالظبط (٢٫٥). [[halfExpand]] (الافتراضي) بيبعد عن الصفر، و [[halfEven]] بيروح للزوجي فمبيميلش لفوق على طول (بيتستخدم في المحاسبة والإحصاء).
- **[[roundingIncrement]]**: التقريب لأقرب ٥ أو ٢٥ في آخر خانة. [[{ minimumFractionDigits: 2, maximumFractionDigits: 2, roundingIncrement: 5 }]] بيخلي 1.23 بقت 1.25 (أقرب ٠٫٠٥). لازم الكسور الأدنى والأقصى متساويين، وإلا [[RangeError: maximumFractionDigits value is out of range.]] (رسالة مش واضحة: السبب الحقيقي إن [[minimumFractionDigits]] مش متحدد).
- **الأرقام المهمة:** [[maximumSignificantDigits: 3]] على 123456 = [[123,000]]. ولو حددت الاتنين (كسور وأرقام مهمة)، [[roundingPriority]] بيختار: [["lessPrecision"]] = [[1.2]] و [["morePrecision"]] = [[1.23]] لـ 1.2345.
- **[[trailingZeroDisplay: "stripIfInteger"]]**: [[$50]] بدل [[$50.00]]، بس [[$50.50]] تفضل زي ما هي.
- **[[useGrouping]]**: [["min2"]] مبيحطش فاصل في الأرقام الـ ٤ خانات ([[1234]])، و [[false]] أبدًا.

---

## ٧. [[NumberFormat.prototype.formatRange]] و [[NumberFormat.prototype.formatRangeToParts]]

~~~js range.js
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
console.log(usd.formatRange(100, 250));
console.log(new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).formatRange(100, 250));
console.log(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).formatRange(99.6, 100.4));
console.log(new Intl.NumberFormat("en-US", { notation: "compact" }).formatRange(1200, 5000000));
console.log(usd.formatRangeToParts(100, 250));
~~~

~~~text الناتج
$100.00 – $250.00
<RLM>١٠٠٫٠٠–٢٥٠٫٠٠<NBSP>ج.م.<RLM>
~$100
1.2K – 5M
[
  { type: 'currency', value: '$', source: 'startRange' },
  { type: 'integer', value: '100', source: 'startRange' },
  { type: 'decimal', value: '.', source: 'startRange' },
  { type: 'fraction', value: '00', source: 'startRange' },
  { type: 'literal', value: ' – ', source: 'shared' },
  { type: 'currency', value: '$', source: 'endRange' },
  { type: 'integer', value: '250', source: 'endRange' },
  { type: 'decimal', value: '.', source: 'endRange' },
  { type: 'fraction', value: '00', source: 'endRange' }
]
~~~

- **كل لغة ليها شكل:** الإنجليزي بيكرر [[$]]، والعربي بيكتب «ج.م.» مرة في الآخر. لو عملتها بإيدك ([[format(a) + "–" + format(b)]]) العملة هتتكرر في العربي (تمرين ٦).
- **[[~]] (approximatelySign):** لما الطرفين يبقوا نفس النص بعد التقريب (99.6 و 100.4 الاتنين [[$100]]) بيكتب رقم واحد بـ [[~]] قدامه. وده بيحصل كمان لو الرقمين متساويين أصلًا ([[formatRange(1200, 1200)]] = «~١٬٢٠٠»)، فلو السعر ثابت استخدم [[format]].
- **[[source]]** في كل part: [["startRange"]] أو [["endRange"]] أو [["shared"]] (الجزء المشترك زي الشرطة أو العملة اللي اتكتبت مرة). ده اللي يخليك تلوّن البداية والنهاية بلونين.
- **الأخطاء:** [[formatRange(NaN, 3)]] بيرمي [[RangeError: Invalid start : NaN]]، و [[formatRange(3)]] بيرمي [[TypeError: Invalid end : undefined]]. أما [[formatRange(5, 3)]] (البداية أكبر) فبيطلع «5–3» من غير error في Node 24.22 و Chrome 157 (نسخ قديمة كانت بترمي [[RangeError]])، فرتّبهم انت.

---

## ٨. [[NumberFormat.prototype.resolvedOptions]] و [[Intl.NumberFormat.supportedLocalesOf]]

~~~text الناتج: egp.resolvedOptions()
{
  locale: 'ar-EG',
  numberingSystem: 'arab',
  style: 'currency',
  currency: 'EGP',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  minimumIntegerDigits: 1,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: 'auto',
  notation: 'standard',
  signDisplay: 'auto',
  roundingIncrement: 1,
  roundingMode: 'halfExpand',
  roundingPriority: 'auto',
  trailingZeroDisplay: 'auto'
}
~~~

منها تعرف إن الجنيه اتكتب بكسرين لوحده، وإن الأرقام [[arab]]. و [[Intl.NumberFormat.supportedLocalesOf(["ar-EG", "en-EG", "xx-XX"])]] بترجّع [[[ 'ar-EG', 'en-EG' ]]].

---

## ٩. الأخطاء

| الكود | الخطأ | السبب والحل |
|---|---|---|
| [[{ style: "currency" }]] من غير [[currency]] | [[TypeError: Currency code is required with currency style.]] | مفيش عملة افتراضية، ابعت كود زي [["EGP"]] |
| [[currency: "EG"]] | [[RangeError: Invalid currency code : EG]] | الكود ٣ حروف من ISO 4217 |
| [[{ style: "unit" }]] من غير [[unit]] | [[TypeError: Invalid unit argument for Intl.NumberFormat() '']] | ابعت اسم وحدة من [[supportedValuesOf("unit")]] |
| [[roundingIncrement: 5]] من غير كسور متساوية | [[RangeError: maximumFractionDigits value is out of range.]] | حدد الأدنى والأقصى بنفس الرقم |
| [[formatRange(NaN, 3)]] | [[RangeError: Invalid start : NaN]] | اتأكد من الرقمين قبل النداء |

(النصوص من Node 24.22، و Chrome 157 بنفس الرسايل لأنهم نفس المحرك V8.)

---

## الخلاصة

| عايز | استخدم |
|---|---|
| فلوس بلغة اليوزر | [[style: "currency"]] و [[currency]]، والكسور من العملة |
| تلوّن أو تقسّم الرقم | [[formatToParts]] مش [[split]] |
| «من كام لكام» | [[formatRange]] (و [[format]] لو الطرفين متساويين) |
| تغيير بإشارة | [[signDisplay: "exceptZero"]] |
| تقريب بنوك أو لأقرب ٢٥ قرش | [[roundingMode: "halfEven"]] أو [[roundingIncrement]] |
| تعرف اللي اتطبّق | [[resolvedOptions()]] |

اللي ميتلخبطش: [[format]] بتقبل نص رقم بدقة كاملة، والـ [[~]] معناه «الطرفين بقوا رقم واحد»، و [[percent]] بيضرب في ١٠٠.`,
          lines: [
            R`formatter للجنيه بالعربي المصري، بيتعمل مرة واحدة ويستخدم في كل الأسعار`,
            R`[[JSON.stringify]] حوالين الناتج عشان الحروف المخفية تبان: [[<RLM>]] على الطرفين و [[<NBSP>]] قبل «ج.م.»`,
            R`[[formatToParts]] على رقم سالب: نوع كل حتة بالترتيب، من [[literal]] و [[minusSign]] لحد [[currency]]`,
            R`formatter بالدولار الأمريكي عشان نجرّب عليه النطاقات`,
            R`[[formatRange]] بيكتب [[$100.00 – $250.00]]، والطرفين اللي بيبقوا نفس الرقم بعد التقريب بيطلعوا [[~$100.00]]`,
            R`[[signDisplay: "exceptZero"]] بيحط علامة زائد قدام أي رقم موجب، فالخمسة بتطلع [[+5]]، والصفر من غير إشارة`,
            R`[[roundingMode: "halfEven"]] بيقرّب ٢٫٥ لـ [[2]] (الزوجي) بدل [[3]]`,
            R`[[resolvedOptions()]] بتقول إن الجنيه اتكتب بكسرين، و [[supportedLocalesOf]] شالت [["xx"]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بـ [["en-US"]] اكتب الناتج لـ [[0]] و [[5]] و [[-5]] و [[-0]] بـ [[signDisplay]] [["exceptZero"]] و [["never"]] و [["negative"]]، وبعدين شغّل (من قسم ٥ في الشرح).`, done: R`١٢ ناتج اتكتبوا قبل التشغيل، وعرفت إن [["never"]] بيشيل السالب كمان، وإن [["negative"]] بيخفي [[-0]] بس.`, sol: R`~~~js sign.js
for (const signDisplay of ["exceptZero", "never", "negative"]) {
  const f = new Intl.NumberFormat("en-US", { signDisplay });
  console.log(signDisplay.padEnd(10), [0, 5, -5, -0].map(n => f.format(n)).join(" | "));
}
~~~

~~~text الناتج
exceptZero 0 | +5 | -5 | 0
never      0 | 5 | 5 | 0
negative   0 | 5 | -5 | 0
~~~

- [["exceptZero"]]: الصفر (موجب أو سالب) من غير إشارة، والباقي بإشارته.
- [["never"]]: مفيش إشارة خالص، فـ [[-5]] بقت [[5]]: خطر لو بتعرض رصيد.
- [["negative"]]: زي الافتراضي بس [[-0]] بقت [[0]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[priceTag(amount, locale, currency)]] بترجّع HTML: الجنيهات وفاصل الآلاف جوه [[<b>]]، والعلامة والقروش جوه [[<small>]]، والعملة جوه [[<span class="cur">]]، وكل قيمة معمولها escape. الـ formatters في [[Map]] كاش (من قسم ٣ في الشرح).`, done: R`[[priceTag(1999.5)]] بيطلع [[<b>١</b><b>٬</b><b>٩٩٩</b><small>٫</small><small>٥٠</small>]] والعملة في span والـ [[<RLM>]] فضلت في مكانها، و [[priceTag(-42, "en-US", "USD")]] فيه [[-]] برّه الـ tags.`, sol: R`~~~js price-tag.js
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const cache = new Map();
function priceTag(amount, locale = "ar-EG", currency = "EGP") {
  const key = locale + currency;
  if (!cache.has(key)) cache.set(key, new Intl.NumberFormat(locale, { style: "currency", currency }));
  return cache.get(key).formatToParts(amount).map(p => {
    if (p.type === "integer" || p.type === "group") return "<b>" + esc(p.value) + "</b>";
    if (p.type === "decimal" || p.type === "fraction") return "<small>" + esc(p.value) + "</small>";
    if (p.type === "currency") return '<span class="cur">' + esc(p.value) + "</span>";
    return esc(p.value);
  }).join("");
}
console.log(priceTag(1999.5));
console.log(priceTag(1999.5, "en-US", "USD"));
console.log(priceTag(-42, "en-US", "USD"));
~~~

~~~text الناتج: node price-tag.js | node show-hidden.js
<RLM><b>١</b><b>٬</b><b>٩٩٩</b><small>٫</small><small>٥٠</small><NBSP><span class="cur">ج.م.</span><RLM>
<span class="cur">$</span><b>1</b><b>,</b><b>999</b><small>.</small><small>50</small>
-<span class="cur">$</span><b>42</b><small>.</small><small>00</small>
~~~

- **الـ [[literal]] بيعدّي زي ما هو:** الـ [[<RLM>]] و [[<NBSP>]] لازم يفضلوا عشان الرقم يتعرض صح جوه صفحة عربي.
- **escape** حتى للأرقام: العملة ممكن تبقى اسم من بيانات خارجية، والعادة الصح إن أي نص داخل HTML يتعمله escape.
- **ممكن تجمّع** الـ [[<b>]] اللي جنب بعض في واحد (مشروع «نطاق السعر» بيعمل كده)، بس الشكل في المتصفح واحد.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[parseLocalized(text, locale)]] بترجّع الرقم من نص متنسّق بلغة معيّنة: [["١٬٢٣٤٫٥"]] بـ [["ar-EG"]] = 1234.5، و [["1.234,5"]] بـ [["de-DE"]] = 1234.5، والنص اللي مش رقم = [[NaN]]. من غير ما تكتب رموز أي لغة في الكود: اعرفها من [[formatToParts]] (من قسم ٣ في الشرح).`, done: R`الحالات الخمسة في الحل طلّعت الأرقام المتوقعة، ونص [[format]] الراجع من [["ar-EG"]] نفسه (بالـ [[<ALM>]] والإشارة) بيرجع لنفس الرقم، والاختبارات عدّت.`, sol: R`~~~js parse-localized.js
function parseLocalized(text, locale) {
  const parts = new Intl.NumberFormat(locale).formatToParts(-12345.6);
  const group = parts.find(p => p.type === "group").value;
  const decimal = parts.find(p => p.type === "decimal").value;
  const minus = parts.find(p => p.type === "minusSign").value;
  // أرقام اللغة دي من ٠ لـ ٩
  const digits = new Intl.NumberFormat(locale, { useGrouping: false }).format(9876543210).split("").reverse();
  let s = String(text).trim().replace(/[\u200e\u200f\u061c]/g, "");
  s = s.split(group).join("").split(decimal).join(".").split(minus).join("-");
  s = s.replace(/./g, c => (digits.includes(c) ? String(digits.indexOf(c)) : c));
  return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
}
console.log(parseLocalized("١٬٢٣٤٫٥", "ar-EG"));
console.log(parseLocalized("1.234,5", "de-DE"));
console.log(parseLocalized("-1,234.5", "en-US"));
console.log(parseLocalized(new Intl.NumberFormat("ar-EG").format(-98765.25), "ar-EG"));
console.log(parseLocalized("abc", "en-US"), parseLocalized("", "en-US"));
~~~

~~~text الناتج
1234.5
1234.5
-1234.5
-98765.25
NaN NaN
~~~

- **الرموز من [[formatToParts(-12345.6)]]:** رقم سالب فيه آلاف وكسر، فكل الأجزاء اللي محتاجها موجودة: [[group]] و [[decimal]] و [[minusSign]].
- **الأرقام:** [[format(9876543210)]] من غير فواصل بيدّي العشر أرقام بتوع اللغة من ٩ لـ ٠، و [[reverse()]] بيخلي مكان كل رقم = قيمته.
- **الترتيب مهم:** شيل الفاصل الأول، وبعدين حوّل العلامة لـ [[.]]. لو عكست، في الألماني النقطة اللي هي فاصل هتتحوّل وتبوّظ الرقم.
- **[[^-?\d+(\.\d+)?$]]** بيتأكد إن اللي فاضل رقم بس، فـ [["abc"]] و [[""]] بيرجعوا [[NaN]] بدل [[0]] (اللي [[Number("")]] كان هيرجّعه).
- الحالة اللي متغطتش: اليوزر كاتب أرقام إنجليزي في فورم عربي ([["1234.5"]] بـ [["ar-EG"]]). في الشغل الحقيقي جرّب اللغتين.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** لوحة بتعرض تغيّر السعر عن امبارح، ويوم السعر اتغيّر بأقل من نص في المية ظهر «-0%». ليه؟ وصلّحها بحيث الصفر يبقى «0%»، والعربي يبقى بإشارة: [[const change = Math.round(-0.004 * 100) / 100; pct.format(change)]] (من قسم ٥ في الشرح).`, done: R`عرفت إن [[change]] طلعت [[-0]] (و [[Object.is(change, -0)]] = [[true]])، والإنجليزي بقى [[0%]] بـ [["negative"]]، والعربي بـ [["exceptZero"]] بيطلع «٠٪» و «-١٢٪» و «+١٢٪».`, sol: R`~~~js change.js
const pct = new Intl.NumberFormat("en-US", { style: "percent" });
const change = Math.round(-0.004 * 100) / 100;
console.log(change, Object.is(change, -0), pct.format(change));
const fixed = new Intl.NumberFormat("en-US", { style: "percent", signDisplay: "negative" });
console.log(fixed.format(change), fixed.format(-0.12), fixed.format(0.12));
const arrow = new Intl.NumberFormat("ar-EG", { style: "percent", signDisplay: "exceptZero" });
console.log(JSON.stringify([arrow.format(change), arrow.format(-0.12), arrow.format(0.12)]));
~~~

~~~text الناتج: node change.js | node show-hidden.js
-0 true -0%
0% -12% 12%
["٠٪<ALM>","<ALM>-١٢٪<ALM>","<ALM>+١٢٪<ALM>"]
~~~

- **[[-0]]** بيطلع من [[Math.round]] على رقم سالب صغير: [[-0.4]] بتتقرّب لـ [[-0]] مش [[0]]. و [[===]] بيقول [[-0 === 0]] = [[true]]، فمش هتلاقيه بـ if عادي؛ [[Object.is]] بس اللي بيفرّق.
- **[["negative"]]** بيكتب الإشارة للسالب الحقيقي بس. و [["exceptZero"]] لو عايز [[+]] للموجب كمان (أسهم البورصة).
- **العربي:** الـ [[<ALM>]] حوالين الإشارة والـ [[٪]] بيخليهم يتعرضوا في الناحية الصح جوه سطر من اليمين.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعرض نطاق سعر بطريقتين: بإيدك [[format(a) + "–" + format(b)]] و [[formatRange(a, b)]]، على [[250]] و [[900]] بالجنيه العربي، وعلى [[99.6]] و [[100.4]] بالدولار من غير كسور. إيه الفرقين؟ وبعدين بـ [[roundingIncrement]] اعمل تقريب الكاش لأقرب ربع جنيه لـ ١٠٫١ و ١٠٫١٣ و ١٠٫٣٨ و ١٠٫٩ (من قسم ٦ و ٧ في الشرح).`, done: R`العربي بإيدك فيه «ج.م.» مرتين و [[formatRange]] مرة، والدولار بإيدك [[$100–$100]] و [[formatRange]] [[~$100]]. والتقريب طلّع ١٠٫٠٠ و ١٠٫٢٥ و ١٠٫٥٠ و ١١٫٠٠.`, sol: R`~~~js range-vs-manual.js
const egp = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" });
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const manual = (f, a, b) => f.format(a) + "–" + f.format(b);
console.log(JSON.stringify(manual(egp, 250, 900)));
console.log(JSON.stringify(egp.formatRange(250, 900)));
console.log(manual(usd, 99.6, 100.4), "|", usd.formatRange(99.6, 100.4));
const quarter = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 2, maximumFractionDigits: 2, roundingIncrement: 25 });
console.log([10.1, 10.13, 10.38, 10.9].map(x => quarter.format(x)).join(" | "));
~~~

~~~text الناتج: node range-vs-manual.js | node show-hidden.js
"<RLM>٢٥٠٫٠٠<NBSP>ج.م.<RLM>–<RLM>٩٠٠٫٠٠<NBSP>ج.م.<RLM>"
"<RLM>٢٥٠٫٠٠–٩٠٠٫٠٠<NBSP>ج.م.<RLM>"
$100–$100 | ~$100
<RLM>١٠٫٠٠<NBSP>ج.م.<RLM> | <RLM>١٠٫٢٥<NBSP>ج.م.<RLM> | <RLM>١٠٫٥٠<NBSP>ج.م.<RLM> | <RLM>١١٫٠٠<NBSP>ج.م.<RLM>
~~~

- **الفرق الأول:** العربي بيكتب العملة مرة واحدة في الآخر. الطريقة اليدوية كررتها، وكمان حطت ٤ علامات [[<RLM>]] اللي ممكن تلخبط الترتيب جوه سطر فيه إنجليزي.
- **الفرق التاني:** «من ١٠٠ لـ ١٠٠» نطاق مضحك. [[formatRange]] عرف إن الطرفين بقوا رقم واحد وكتب [[~$100]] (تقريبًا).
- **[[roundingIncrement: 25]]** مع كسرين بالظبط = أقرب ٠٫٢٥. و ١٠٫١٣ راحت لـ ١٠٫٢٥ لأنها أقرب ليها (٠٫١٢) من ١٠٫٠٠ (٠٫١٣).` },
          ],
          check: {
            lang: "js",
            starter: R`function parseLocalized(text, locale) {
  // اعرف فاصل الآلاف والعلامة العشرية والسالب والأرقام من formatToParts
}`,
            tests: R`test("عربي مصري", () => expect(parseLocalized("١٬٢٣٤٫٥", "ar-EG")).toBe(1234.5));
test("ألماني", () => expect(parseLocalized("1.234,5", "de-DE")).toBe(1234.5));
test("إنجليزي سالب", () => expect(parseLocalized("-1,234.5", "en-US")).toBe(-1234.5));
test("الناتج نفسه بيرجع", () => expect(parseLocalized(new Intl.NumberFormat("ar-EG").format(-98765.25), "ar-EG")).toBe(-98765.25));
test("مش رقم", () => expect(Number.isNaN(parseLocalized("abc", "en-US"))).toBe(true));
test("فاضي مش صفر", () => expect(Number.isNaN(parseLocalized("", "en-US"))).toBe(true));`,
            solution: R`function parseLocalized(text, locale) {
  const parts = new Intl.NumberFormat(locale).formatToParts(-12345.6);
  const group = parts.find(p => p.type === "group").value;
  const decimal = parts.find(p => p.type === "decimal").value;
  const minus = parts.find(p => p.type === "minusSign").value;
  const digits = new Intl.NumberFormat(locale, { useGrouping: false }).format(9876543210).split("").reverse();
  let s = String(text).trim().replace(/[\u200e\u200f\u061c]/g, "");
  s = s.split(group).join("").split(decimal).join(".").split(minus).join("-");
  s = s.replace(/./g, c => (digits.includes(c) ? String(digits.indexOf(c)) : c));
  return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
}`
          },
          ref: [
            { t: "MDN: Intl.NumberFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat" },
            { t: "MDN: Intl.NumberFormat.prototype.formatToParts()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts" },
            { t: "MDN: Intl.NumberFormat.prototype.formatRange()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRange" },
            { t: "MDN: Intl.NumberFormat.prototype.formatRangeToParts()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatRangeToParts" },
            { t: "MDN: Intl.NumberFormat.prototype.format()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format" },
            { t: "MDN: Intl.NumberFormat.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/supportedLocalesOf" },
          ],
          pre: ["js/Number: toFixed و toString و toLocaleString", "js/Intl: الـ locale والتفاوض و supportedValuesOf"],
          deep: {
            why: R`الأرقام هي أكتر حاجة بتتعرض في أي تطبيق، وكل لغة ليها شكل: الفاصل، والعلامة، والأرقام نفسها، ومكان العملة، والإشارة. وكتابة ده بإيدك ([[toFixed]] + [["ج.م."]]) بتطلع ناتج غلط للغات التانية، وبتكسر الاتجاه في الصفحات العربي (من غير [[<RLM>]]).`,
            how: R`الـ constructor بيتفاوض على اللغة، ويقرا الـ options ويكمّلها من العملة والـ locale (الكسور من العملة، والأرقام من البلد)، ويجهّز pattern من CLDR. [[format]] بتقرّب الرقم بالـ [[roundingMode]] على قيمته العشرية (مش الـ binary: عشان كده [[1.005]] بيتقرّب [[1.01]] هنا و [[1.00]] في [[toFixed]])، وتحطه في الـ pattern. و [[formatToParts]] نفس الشغل بس بيرجّع الحتت قبل ما يلزقها. و [[formatRange]] بيستخدم patterns خاصة بالنطاقات من CLDR.`,
            when: R`أي رقم بيتعرض لبني آدم: أسعار، وعدادات، ونسب، ومقاسات، وأحجام ملفات. [[formatToParts]] لما التصميم عايز الجنيهات كبيرة والقروش صغيرة، أو عشان تعكس الشغل وتقرا input. [[formatRange]] لفلاتر الأسعار وجداول الرواتب والتقديرات. أما الأرقام اللي بتتخزن أو بتتبعت لـ API فتفضل أرقام عادية من غير تنسيق.`,
            mistakes: R`تخزّن الرقم بعد التنسيق ([["١٬٢٣٤٫٥"]] في الداتابيز). تعمل [[split(",")]] على ناتج [[format]]. تبعت ١٢٫٣٤ لـ [[percent]] فتطلع ١٢٣٤٪. [[currency]] من غير [[style: "currency"]] (بيتجاهلها). تعتمد على إن [[formatRange(5, 3)]] بيرمي. تشيل الـ [[<RLM>]] من الناتج المعروض. وفي الانترفيو: «إزاي تعرض سعر بلغة اليوزر؟» الإجابة: [[Intl.NumberFormat]] بـ [[style: "currency"]] والعملة، و formatter واحد متخزّن، والرقم يفضل number لحد آخر لحظة.`,
          },
        },
        {
          cmd: "Intl.DateTimeFormat: formatToParts و formatRange",
          title: "تفك التاريخ لحتت وتبني بيها أي شكل، وتكتب «من-لحد» صح، وتعرض الهجري جنب الميلادي",
          desc: R`درس «UTC و Intl.DateTimeFormat» علّمك [[format]] بـ [[timeZone]] و [[dateStyle]]. هنا الباقي:
• [[formatToParts(date)]]: التاريخ كحتت ([[weekday]] و [[day]] و [[month]] و [[year]] و [[hour]] و [[minute]] و [[dayPeriod]]...)، فتبني أي شكل أو تطلّع «السنة والشهر واليوم في القاهرة» كأرقام.
• [[formatRange(a, b)]] و [[formatRangeToParts(a, b)]]: «٢١–٢٤ نوفمبر ٢٠٢٦» من غير تكرار، و [[source]] بيقولك أنهي حتة من البداية وأنهي من النهاية.
• [[calendar: "islamic-umalqura"]] للهجري، و [[hourCycle]] و [[hour12]] للساعة، و [[timeZoneName]] لاسم التوقيت.
• [[resolvedOptions()]] و [[Intl.DateTimeFormat.supportedLocalesOf()]].
وفيه فروق بين Node والمتصفح في المسافات المخفية، مكتوبة في القسم الأخير.`,
          example: R`const d = new Date("2026-11-21T15:05:09Z");
const ar = new Intl.DateTimeFormat("ar-EG", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Cairo" });
console.log(ar.format(d));
console.log(ar.formatToParts(d).filter(p => p.type !== "literal").map(p => p.type + "=" + p.value).join(" "));
const hijri = new Intl.DateTimeFormat("ar-EG", { calendar: "islamic-umalqura", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" });
console.log(hijri.format(d));
const days = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Cairo" });
const from = new Date("2026-11-21T07:00:00Z"), to = new Date("2026-11-24T09:30:00Z");
console.log(days.formatRange(from, to));
console.log(days.formatRangeToParts(from, to).filter(p => p.type !== "literal").map(p => p.type + ":" + p.source).join(" "));
console.log(ar.resolvedOptions().hourCycle, Intl.DateTimeFormat.supportedLocalesOf(["ar-SA-u-ca-islamic-umalqura", "zz"]));`,
          try: R`بـ [[formatToParts]] اعمل كارت ميعاد شكله «السبت ٢١ نوفمبر · ٥:٠٥ م» لـ [["2026-11-21T15:05:09Z"]] بتوقيت القاهرة (من غير الفاصلة و «في» اللي بيحطهم [[format]]). وبعدين اطبع نفس اللحظة بالهجري بالإنجليزي ([["en-u-ca-islamic-umalqura"]]) وبالتقويم القبطي بالعربي ([["ar-EG-u-ca-coptic"]]).`,
          sol: R`~~~js card.js
const f = new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", timeZone: "Africa/Cairo" });
function card(date) {
  const p = Object.fromEntries(f.formatToParts(date).filter(x => x.type !== "literal").map(x => [x.type, x.value]));
  return p.weekday + " " + p.day + " " + p.month + " · " + p.hour + ":" + p.minute + " " + p.dayPeriod;
}
const d = new Date("2026-11-21T15:05:09Z");
console.log(card(d));
console.log(f.format(d));
console.log(new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { dateStyle: "long", timeZone: "Africa/Cairo" }).format(d));
console.log(new Intl.DateTimeFormat("ar-EG-u-ca-coptic", { dateStyle: "long", timeZone: "Africa/Cairo" }).format(d));
~~~

~~~text الناتج (Node 24.22)
السبت ٢١ نوفمبر · ٥:٠٥ م
السبت، ٢١ نوفمبر في ٥:٠٥ م
Jumada II 11, 1448 AH
١٢ هاتور ١٧٤٣ AM
~~~

[[Object.fromEntries]] حوّل لستة [[[type, value]]] لـ object، فبقى عندك [[p.weekday]] و [[p.hour]]... والقبطي: ١٢ هاتور ١٧٤٣ (الـ [[AM]] هنا = Anno Martyrum، سنة الشهداء، مش الصبح).`,
          teach: R`## الفكرة

[[format]] بيدّيك نص جاهز بشكل CLDR. بس ساعات التصميم عايز شكل تاني، أو محتاج الأرقام نفسها (اليوم كام في القاهرة؟)، أو نطاق من-لحد، أو تقويم تاني. الأدوات دي كلها في نفس الـ formatter. الناتج من Node 24.22 والجهاز توقيته [["Africa/Cairo"]]، وكل مثال فيه [[timeZone]] صريح عشان ميتغيّرش على جهازك. والحروف المخفية مكتوبة بأسمائها.

---

## ١. [[DateTimeFormat.prototype.format]]

~~~js format.js
const f = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Cairo" });
console.log([new Date("2026-11-21T10:00:00Z"), Date.UTC(2026, 10, 22)].map(f.format));
try { f.format(new Date("x")); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
[ 'Nov 21, 2026', 'Nov 22, 2026' ]
RangeError: Invalid time value
~~~

- **[[format]] مربوطة** زي [[NumberFormat]]: [[map(f.format)]] شغالة.
- بتقبل [[Date]] أو رقم ms ([[Date.UTC]] بيرجّع رقم). ومن غير باراميتر ([[f.format()]]) = اللحظة دي.
- التاريخ البايظ بيرمي [[RangeError: Invalid time value]]، فلو التاريخ جاي من يوزر اتأكد منه الأول ([[Number.isNaN(d.getTime())]]).

---

## ٢. [[DateTimeFormat.prototype.formatToParts]]

~~~text الناتج: ar.formatToParts(d)
[
  { type: 'weekday', value: 'السبت' },
  { type: 'literal', value: '، ' },
  { type: 'day', value: '٢١' },
  { type: 'literal', value: ' ' },
  { type: 'month', value: 'نوفمبر' },
  { type: 'literal', value: ' ' },
  { type: 'year', value: '٢٠٢٦' },
  { type: 'literal', value: ' في ' },
  { type: 'hour', value: '٥' },
  { type: 'literal', value: ':' },
  { type: 'minute', value: '٠٥' },
  { type: 'literal', value: ' ' },
  { type: 'dayPeriod', value: 'م' }
]
~~~

| الـ type | إيه هو | مثال |
|---|---|---|
| [[weekday]] | اسم اليوم | السبت، Sat |
| [[day]] و [[month]] و [[year]] | التاريخ | ٢١، نوفمبر، ٢٠٢٦ |
| [[hour]] و [[minute]] و [[second]] | الوقت | ٥، ٠٥ |
| [[fractionalSecond]] | أجزاء الثانية مع [[fractionalSecondDigits]] | 123 |
| [[dayPeriod]] | ص أو م، AM أو PM، أو «بعد الظهر» مع [[dayPeriod: "long"]] | م |
| [[era]] | العصر: م و هـ و AD و AH | هـ |
| [[timeZoneName]] | اسم التوقيت مع [[timeZoneName]] | GMT+2 |
| [[literal]] | الفواصل والكلام اللي بين الحتت | «، » و « في » |

### استخدام ١: شكل من عندك

~~~js layout.js
const f = new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", timeZone: "Africa/Cairo" });
function card(date) {
  const p = Object.fromEntries(f.formatToParts(date).filter(x => x.type !== "literal").map(x => [x.type, x.value]));
  return p.weekday + " " + p.day + " " + p.month + " · " + p.hour + ":" + p.minute + " " + p.dayPeriod;
}
~~~

~~~text الناتج
السبت ٢١ نوفمبر · ٥:٠٥ م
~~~

الأسامي والأرقام لسه من CLDR (بالعربي وبأرقام مصر)، انت بس اللي رتّبت. بس خد بالك: الترتيب ده عربي. لو هتدعم لغات تانية، الأحسن تسيب [[format]] يرتّب لكل لغة.

### استخدام ٢: التاريخ «في مدينة» كأرقام

[[date.getDate()]] بيدّي اليوم بتوقيت **الجهاز**. عايز اليوم في القاهرة على سيرفر UTC؟ [[formatToParts]] بـ [["en-US"]] و [[hourCycle: "h23"]] و [[Number(p.value)]] (تمرين ٢). وده نفس اللي مكتبات زي date-fns-tz بتعمله من جوه.

---

## ٣. التقاويم: الهجري والقبطي

~~~js calendars.js
const d = new Date("2026-11-21T15:05:09Z");
const opt = { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" };
console.log(new Intl.DateTimeFormat("ar-EG", { ...opt, calendar: "islamic-umalqura" }).format(d));
console.log(new Intl.DateTimeFormat("ar-EG", { ...opt, calendar: "islamic-umalqura" }).formatToParts(d).map(p => p.type).join(" "));
console.log(new Intl.DateTimeFormat("ar-SA", { dateStyle: "long", timeZone: "Asia/Riyadh" }).resolvedOptions().calendar);
~~~

~~~text الناتج
١١ جمادى الآخرة ١٤٤٨ هـ
day literal month literal year literal era
gregory
~~~

- **[[calendar: "islamic-umalqura"]]** (أو [[-u-ca-islamic-umalqura]] في الـ tag): تقويم أم القرى، المحسوب فلكيًا واللي السعودية بتستخدمه رسميًا. وفيه [["islamic"]] (فلكي) و [["islamic-civil"]] و [["islamic-tbla"]] (جداول ثابتة): ممكن يختلفوا يوم.
- **الهجري المحسوب مش رؤية الهلال:** بداية رمضان أو العيد في مصر بتتحدد بالرؤية، فممكن تختلف يوم عن أي حساب. للمواعيد الدينية الرسمية خد التاريخ من مصدر رسمي، واستخدم الحساب للعرض.
- **[["ar-SA"]] لوحدها ميلادي** في CLDR 48 (Node 24.22 و Chrome 157 الاتنين، [[resolvedOptions().calendar]] = [["gregory"]]). نسخ قديمة كانت بتطلع هجري افتراضيًا. لو عايز هجري **اطلبه صريح**.
- [["ar-EG-u-ca-coptic"]]: التقويم القبطي (توت وبابه وهاتور...)، اللي لسه بيستخدم في الزراعة في مصر.

---

## ٤. الساعة: [[hourCycle]] و [[hour12]] و [[dayPeriod]]

~~~text الناتج: en-US و UTC، الساعة ١٢:٠٥ بعد نص الليل
h11   0:05 AM
h12   12:05 AM
h23   00:05
h24   24:05
~~~

| القيمة | العد | فين |
|---|---|---|
| [[h11]] | ٠ لـ ١١ + AM/PM | اليابان |
| [[h12]] | ١ لـ ١٢ + AM/PM | مصر وأمريكا |
| [[h23]] | ٠ لـ ٢٣ | أوروبا ومعظم الأنظمة |
| [[h24]] | ١ لـ ٢٤ (نص الليل = ٢٤) | نادر جدًا |

- **[[hour12: true/false]]** أسهل: [[hour12: false]] مع [["ar-EG"]] بيطلع «١٧:٠٥»، و [[hour12: true]] مع [["en-GB"]] بيطلع «05:05 pm». لو حطيت الاتنين، [[hour12]] يكسب.
- **[[dayPeriod: "long"]]** مع [[hour]]: «٥ بعد الظهر» و «5 in the afternoon» بدل م و PM.
- لـ [[partsIn]] وأي حسابات: [[hourCycle: "h23"]] دايمًا، عشان نص الليل يبقى [[0]] مش [[12]] أو [[24]].

---

## ٥. [[timeZoneName]] والـ offset

~~~text الناتج: Africa/Cairo، الساعة ٥ م
short        5 PM GMT+2
long         5 PM Eastern European Standard Time
shortOffset  5 PM GMT+2
longOffset   5 PM GMT+02:00
shortGeneric 5 PM Egypt Time
longGeneric  5 PM Eastern European Time
~~~

وبالعربي [["long"]]: «٥ م توقيت شرق أوروبا الرسمي». و [[timeZone]] بيقبل offset ثابت كمان: [[{ timeZone: "+02:00", timeStyle: "long" }]] = «5:05:09 PM GMT+2» (مفيد لو الـ API بيبعت offset مش اسم مدينة، بس مبيعرفش التوقيت الصيفي). والاسم الغلط: [[{ timeZone: "Cairo" }]] بيرمي [[RangeError: Invalid time zone specified: Cairo]].

---

## ٦. [[DateTimeFormat.prototype.formatRange]]: من-لحد

~~~js range.js
const a = new Date("2026-11-21T07:00:00Z"), b = new Date("2026-11-21T09:30:00Z"), c = new Date("2026-11-24T09:30:00Z"), e = new Date("2027-01-03T09:30:00Z");
const days = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Cairo" });
console.log(days.formatRange(a, c));
console.log(days.formatRange(a, e));
console.log(days.formatRange(a, b));
const ar = new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Cairo" });
console.log(ar.formatRange(a, b));
console.log(ar.formatRange(a, c));
~~~

~~~text الناتج: node range.js | node show-hidden.js
Nov 21<THINSP>–<THINSP>24, 2026
Nov 21, 2026<THINSP>–<THINSP>Jan 3, 2027
Nov 21, 2026
٢١<RLM>/١١<RLM>/٢٠٢٦، ٩:٠٠–١١:٣٠ ص
٢١<RLM>/١١<RLM>/٢٠٢٦، ٩:٠٠ ص – ٢٤<RLM>/١١<RLM>/٢٠٢٦، ١١:٣٠ ص
~~~

- **نفس الشهر:** الشهر والسنة مرة واحدة («Nov 21–24, 2026»).
- **سنين مختلفة:** كل طرف كامل.
- **نفس اليوم** والـ formatter مفيهوش ساعة: نص واحد من غير شرطة.
- **نفس اليوم وفيه ساعة:** التاريخ مرة، والساعتين بـ «ص» مرة.
- **الـ formatter بيزوّد اللي ناقص:** formatter فيه ساعة ودقيقة بس، والطرفين في يومين مختلفين (١١:٣٠ م لـ ١٢:٣٠ ص)؟ بيكتب التاريخ كامل للطرفين عشان المعنى ميضيعش (مشروع «جدول الحجوزات» قابل الحالة دي).
- **البداية بعد النهاية:** «Nov 24–21, 2026» من غير error في Node 24.22 و Chrome 157. رتّبهم انت. والطرف الناقص ([[formatRange(a)]]) بيرمي [[TypeError: Invalid time value]].

---

## ٧. [[DateTimeFormat.prototype.formatRangeToParts]]

~~~text الناتج: days.formatRangeToParts(a, c)
[
  { type: 'month', value: 'Nov', source: 'shared' },
  { type: 'literal', value: ' ', source: 'shared' },
  { type: 'day', value: '21', source: 'startRange' },
  { type: 'literal', value: '<THINSP>–<THINSP>', source: 'shared' },
  { type: 'day', value: '24', source: 'endRange' },
  { type: 'literal', value: ', ', source: 'shared' },
  { type: 'year', value: '2026', source: 'shared' }
]
~~~

[[source]]: [["shared"]] للمشترك (الشهر والسنة والشرطة)، و [["startRange"]] و [["endRange"]] للي بيختلف. فتقدر تخلي الأيام بس تقيلة: «Nov **21**–**24**, 2026» (تمرين ٥).

---

## ٨. [[DateTimeFormat.prototype.resolvedOptions]] و [[Intl.DateTimeFormat.supportedLocalesOf]]

~~~text الناتج: ar.resolvedOptions() (formatter المثال)
{
  locale: 'ar-EG',
  calendar: 'gregory',
  numberingSystem: 'arab',
  timeZone: 'Africa/Cairo',
  hourCycle: 'h12',
  hour12: true,
  dateStyle: 'full',
  timeStyle: 'short'
}
~~~

- فيها اللي اتطبّق فعلًا: التقويم والأرقام والساعة. و [[timeZone]] من غير ما تحدده = توقيت الجهاز.
- [[Intl.DateTimeFormat.supportedLocalesOf(["ar-EG", "ar-SA-u-ca-islamic-umalqura", "zz"])]] = [[[ 'ar-EG', 'ar-SA-u-ca-islamic-umalqura' ]]].
- **[[dateStyle]] مبيتجمعش مع الحتت:** [[{ dateStyle: "long", weekday: "long" }]] بيرمي [[TypeError: Invalid option : option]] (نفس النص في Node و Chrome، ومش واضح). يا تستخدم [[dateStyle]]/[[timeStyle]]، يا الحتت ([[weekday]] و [[day]] و [[month]]...)، مش الاتنين.

---

## ٩. Node والمتصفح: المسافات مش واحدة

اتقاس بـ code points على نفس الكود:

| الحالة | Node 24.22 | Chrome 157 |
|---|---|---|
| [[format]] لساعة إنجليزي، قبل PM | [[U+0020]] | [[U+0020]] |
| [[formatToParts]] لنفس الساعة، الـ literal قبل PM | [[U+202F]] (NNBSP) | [[U+0020]] |
| [[formatRange]] حوالين [[–]] | [[U+2009]] (THINSP) | [[U+0020]] |
| [[U+200F]] في التاريخ العربي القصير ([[٢١/١١/٢٠٢٦]]) | موجود | موجود |

V8 بيبدّل [[U+202F]] بمسافة عادية في [[format]] بس (عشان مواقع قديمة كانت بتعمل parse للناتج)، و Chrome بيبدّلها في كله. يعني أي اختبار بيقارن نص تاريخ، وحّد المسافات الأول ([[replace(/\s/g, " ")]])، ومتعملش parse لنص متنسّق.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| شكل من عندك أو أرقام اليوم في مدينة | [[formatToParts]] (و [[hourCycle: "h23"]] للحساب) |
| من-لحد | [[formatRange]]، و [[formatRangeToParts]] لتلوين اللي بيتغيّر |
| هجري | [[calendar: "islamic-umalqura"]] صريح |
| ٢٤ ساعة | [[hourCycle: "h23"]] أو [[hour12: false]] |
| اسم التوقيت | [[timeZoneName]] |
| تعرف اللي اتطبّق | [[resolvedOptions()]] |

اللي ميتلخبطش: [[dateStyle]] مع [[weekday]] = خطأ، و [["ar-SA"]] لوحدها ميلادي، والمسافات في الناتج بتختلف بين Node والمتصفح.`,
          lines: [
            R`لحظة ثابتة بـ UTC: ٣:٠٥ العصر، يعني ٥:٠٥ م في القاهرة (UTC+2 في نوفمبر)`,
            R`formatter عربي مصري بالتاريخ كامل والساعة من غير ثواني، بتوقيت القاهرة صريح`,
            R`[[format]] العادي: «السبت، ٢١ نوفمبر ٢٠٢٦ في ٥:٠٥ م»`,
            R`[[formatToParts]] من غير الـ [[literal]]: كل حتة بنوعها، [[weekday=السبت]] لحد [[dayPeriod=م]]`,
            R`formatter تاني بتقويم أم القرى الهجري، باليوم والشهر والسنة بس`,
            R`نفس اللحظة بالهجري: «١١ جمادى الآخرة ١٤٤٨ هـ»`,
            R`formatter إنجليزي بتاريخ مختصر من غير ساعة، عشان نجرّب عليه النطاقات`,
            R`لحظتين: ٢١ نوفمبر الصبح و ٢٤ نوفمبر الصبح، في نفس الشهر`,
            R`[[formatRange]] بيكتب الشهر والسنة مرة واحدة: «Nov 21–24, 2026»`,
            R`[[formatRangeToParts]] من غير الفواصل: كل حتة ونوعها ومصدرها، الشهر والسنة [[shared]] واليومين [[startRange]] و [[endRange]]`,
            R`[[resolvedOptions().hourCycle]] = [[h12]] لمصر، و [[supportedLocalesOf]] شالت [["zz"]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الساعة ١٢:٠٥ بعد نص الليل UTC، بـ [["en-US"]] و [[hour: "numeric", minute: "2-digit"]]: هتتكتب إزاي بـ [[hourCycle]] [["h11"]] و [["h12"]] و [["h23"]] و [["h24"]]؟ (من قسم ٤ في الشرح).`, done: R`كتبت الأربعة قبل التشغيل، وعرفت إن [[h11]] بيبدأ من صفر بـ AM و [[h24]] بيكتب نص الليل ٢٤.`, sol: R`~~~js hour-cycle.js
const midnight = new Date("2026-11-21T00:05:00Z");
for (const hourCycle of ["h11", "h12", "h23", "h24"]) {
  console.log(hourCycle, new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hourCycle, timeZone: "UTC" }).format(midnight));
}
~~~

~~~text الناتج (Node 24.22)
h11 0:05 AM
h12 12:05 AM
h23 00:05
h24 24:05
~~~

- [[h11]] و [[h12]] الاتنين ١٢ ساعة، والفرق في نص الليل والضهر: صفر ولا ١٢.
- [[h23]] الطبيعي في الـ ٢٤ ساعة. و [[h24]] نادر (٢٤:٠٥ معناها بعد نص الليل بخمس دقايق، من اليوم اللي فات).
- [[timeZone: "UTC"]] عشان اللحظة نفسها تبقى ١٢:٠٥ على أي جهاز.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[partsIn(date, timeZone)]] بترجّع [[{ year, month, day, hour, minute }]] أرقام للحظة دي **في المدينة دي** (مش توقيت الجهاز). formatter واحد لكل zone في [[Map]]. جرّبها على [["2026-09-29T21:30:00Z"]] في القاهرة ونيويورك (من قسم ٢ في الشرح).`, done: R`القاهرة [[{ year: 2026, month: 9, day: 30, hour: 0, minute: 30 }]] ونيويورك يوم ٢٩ الساعة ١٧:٣٠، ونص الليل [[hour: 0]] مش ٢٤، والاختبارات عدّت.`, sol: R`~~~js parts-in.js
const cache = new Map();
function partsIn(date, timeZone) {
  if (!cache.has(timeZone)) {
    cache.set(timeZone, new Intl.DateTimeFormat("en-US", {
      timeZone, hourCycle: "h23",
      year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric",
    }));
  }
  const out = {};
  for (const p of cache.get(timeZone).formatToParts(date)) {
    if (p.type !== "literal") out[p.type] = Number(p.value);
  }
  return out;
}
const t = new Date("2026-09-29T21:30:00Z");
console.log(partsIn(t, "Africa/Cairo"));
console.log(partsIn(t, "America/New_York"));
console.log(partsIn(new Date("2026-01-01T00:00:00Z"), "UTC"));
~~~

~~~text الناتج
{ month: 9, day: 30, year: 2026, hour: 0, minute: 30 }
{ month: 9, day: 29, year: 2026, hour: 17, minute: 30 }
{ month: 1, day: 1, year: 2026, hour: 0, minute: 0 }
~~~

- **[["en-US"]]** عشان الأرقام تبقى لاتيني و [[Number()]] يفهمها. لو استخدمت [["ar-EG"]] هتاخد [[Number("٣٠")]] = [[NaN]].
- **[[hourCycle: "h23"]]**: من غيره [["en-US"]] بيرجّع ساعة ١٢ و [[dayPeriod]]، ونص الليل يبقى [[12]].
- **ترتيب المفاتيح** (month قبل year) جاي من ترتيب الحتت في الشكل الأمريكي، ومش مهم لأننا بنقرا بالاسم.
- القاهرة UTC+3 في سبتمبر ٢٠٢٦ (توقيت صيفي)، فـ ٢١:٣٠ UTC بقت ٠٠:٣٠ اليوم اللي بعده.` },
            { lvl: 'تطبيق', t: R`**ابني:** رأس صفحة فيه التاريخين: «السبت، ٢١ نوفمبر ٢٠٢٦ م — ١١ جمادى الآخرة ١٤٤٨ هـ» بتوقيت القاهرة، بـ formatterين متعملين مرة واحدة. جرّبه على [["2026-11-21T10:00:00Z"]] و [["2027-02-08T10:00:00Z"]]. وبعدين اطبع [["ar-SA"]] بـ [[dateStyle: "full"]] من غير [[calendar]]: هجري ولا ميلادي؟ (من قسم ٣ في الشرح).`, done: R`السطرين بالتاريخين، والتاني طلع «١ رمضان ١٤٤٨ هـ»، و [["ar-SA"]] لوحدها طلعت ميلادي و [[resolvedOptions().calendar]] = [["gregory"]].`, sol: R`~~~js header.js
const greg = new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long", year: "numeric", era: "short", timeZone: "Africa/Cairo" });
const hijri = new Intl.DateTimeFormat("ar-EG", { calendar: "islamic-umalqura", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" });
const header = d => greg.format(d) + " — " + hijri.format(d);
console.log(header(new Date("2026-11-21T10:00:00Z")));
console.log(header(new Date("2027-02-08T10:00:00Z")));
const sa = new Intl.DateTimeFormat("ar-SA", { dateStyle: "full", timeZone: "Asia/Riyadh" });
console.log(sa.format(new Date("2026-11-21T10:00:00Z")));
console.log(sa.resolvedOptions().calendar);
~~~

~~~text الناتج (Node 24.22، ونفس الناتج في Chrome 157)
السبت، ٢١ نوفمبر ٢٠٢٦ م — ١١ جمادى الآخرة ١٤٤٨ هـ
الاثنين، ٨ فبراير ٢٠٢٧ م — ١ رمضان ١٤٤٨ هـ
السبت، ٢١ نوفمبر ٢٠٢٦
gregory
~~~

- **[[era: "short"]]** حط «م» (ميلادي) بعد السنة الميلادية عشان تتفرق عن «هـ».
- **«١ رمضان ١٤٤٨»** ده حساب أم القرى. بداية رمضان الفعلية في مصر بتتحدد بالرؤية وممكن تفرق يوم: الحساب للعرض، والمواعيد الرسمية من مصدرها.
- **[["ar-SA"]] ميلادي:** في CLDR الحديثة الافتراضي اتغيّر، فلو كودك قديم ومعتمد إن السعودية هجري افتراضيًا، هيطلع ميلادي من غير ما يقولك. اطلب [[calendar]] صريح.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[new Intl.DateTimeFormat("ar-EG", { dateStyle: "long", weekday: "long", timeZone: "Africa/Cairo" })]] بيوقّع الصفحة. اقرا الخطأ، وصلّحه بحيث يطلع «السبت، ٢١ نوفمبر ٢٠٢٦» لـ [["2026-11-21T10:00:00Z"]] (من قسم ٨ في الشرح).`, done: R`الخطأ [[TypeError: Invalid option : option]]، وعرفت إن السبب [[dateStyle]] مع [[weekday]]، والنسخة المصلّحة بالحتت بتطلع الشكل المطلوب.`, sol: R`~~~js fix-style.js
try {
  new Intl.DateTimeFormat("ar-EG", { dateStyle: "long", weekday: "long", timeZone: "Africa/Cairo" });
} catch (e) {
  console.log(e.name + ": " + e.message);
}
const fixed = new Intl.DateTimeFormat("ar-EG", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Cairo" });
console.log(fixed.format(new Date("2026-11-21T10:00:00Z")));
~~~

~~~text الناتج
TypeError: Invalid option : option
السبت، ٢١ نوفمبر ٢٠٢٦
~~~

- [[dateStyle]] و [[timeStyle]] «باكدج» جاهزة، والحتت ([[weekday]] و [[day]]...) بتبني انت. الـ spec مانع الخلط.
- الرسالة نفسها مبتقولش أنهي option. لما تشوف [[Invalid option]] في [[DateTimeFormat]]، دوّر على style مع حتة.
- [[dateStyle: "full"]] لوحده بيدّي نفس الشكل هنا بالظبط، لو مش محتاج تتحكم في الحتت.` },
            { lvl: 'تحدي', t: R`**ابني:** [[eventRange(start, end, locale)]] بترجّع نص النطاق، ونسخة HTML فيها الحتت اللي بتختلف بين البداية والنهاية جوه [[<b>]] (من [[formatRangeToParts]] و [[source]]). جرّبها على: نفس اليوم، و ٢١–٢٤ نوفمبر، و ٢٨ نوفمبر–٢ ديسمبر، و ٣٠ ديسمبر–٣ يناير، وبالعربي (من قسم ٦ و ٧ في الشرح).`, done: R`نفس اليوم من غير [[<b>]] خالص، و ٢١–٢٤ الأيام بس تقيلة، و نوفمبر–ديسمبر الشهر والأيام، وآخر السنة السنين كمان. والعربي «<b>٢١</b>–<b>٢٤</b> نوفمبر ٢٠٢٦».`, sol: R`~~~js event-range.js
const fmt = new Map();
function eventRange(start, end, locale = "en-US") {
  if (!fmt.has(locale)) fmt.set(locale, new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Cairo" }));
  const f = fmt.get(locale);
  const text = f.formatRange(start, end);
  const html = f.formatRangeToParts(start, end).map(p => (p.source === "shared" || p.type === "literal" ? p.value : "<b>" + p.value + "</b>")).join("");
  return [text, html];
}
const D = s => new Date(s + "T10:00:00Z");
for (const [a, b] of [["2026-11-21", "2026-11-21"], ["2026-11-21", "2026-11-24"], ["2026-11-28", "2026-12-02"], ["2026-12-30", "2027-01-03"]]) {
  console.log(eventRange(D(a), D(b)).join("   "));
}
console.log(eventRange(D("2026-11-21"), D("2026-11-24"), "ar-EG").join("   "));
~~~

~~~text الناتج: node event-range.js | node show-hidden.js
Nov 21, 2026   Nov 21, 2026
Nov 21<THINSP>–<THINSP>24, 2026   Nov <b>21</b><THINSP>–<THINSP><b>24</b>, 2026
Nov 28<THINSP>–<THINSP>Dec 2, 2026   <b>Nov</b> <b>28</b><THINSP>–<THINSP><b>Dec</b> <b>2</b>, 2026
Dec 30, 2026<THINSP>–<THINSP>Jan 3, 2027   <b>Dec</b> <b>30</b>, <b>2026</b><THINSP>–<THINSP><b>Jan</b> <b>3</b>, <b>2027</b>
٢١–٢٤ نوفمبر ٢٠٢٦   <b>٢١</b>–<b>٢٤</b> نوفمبر ٢٠٢٦
~~~

- **نفس اليوم:** كل الحتت [["shared"]]، فمفيش ولا [[<b>]]: صح، مفيش حاجة بتتغيّر.
- **[[p.type === "literal"]]** برّه الـ [[<b>]] حتى لو مش shared (الفاصلة اللي في «Dec 30, 2026»)، عشان الفواصل متبقاش تقيلة.
- الـ [[<THINSP>]] من Node بس. في Chrome نفس الكود بيطلع مسافات عادية، والشكل في الصفحة نفسه.
- لو الأسامي جاية من يوزر، اعمل escape قبل الـ HTML. هنا كل الحتت من [[Intl]] نفسه.` },
          ],
          check: {
            lang: "js",
            starter: R`function partsIn(date, timeZone) {
  // رجّع { year, month, day, hour, minute } أرقام في المدينة دي
}`,
            tests: R`test("القاهرة بعد نص الليل", () => expect(partsIn(new Date("2026-09-29T21:30:00Z"), "Africa/Cairo")).toEqual({ year: 2026, month: 9, day: 30, hour: 0, minute: 30 }));
test("نيويورك لسه امبارح", () => expect(partsIn(new Date("2026-09-29T21:30:00Z"), "America/New_York")).toEqual({ year: 2026, month: 9, day: 29, hour: 17, minute: 30 }));
test("نص الليل صفر مش ٢٤", () => expect(partsIn(new Date("2026-01-01T00:00:00Z"), "UTC").hour).toBe(0));
test("الشتا في القاهرة +2", () => expect(partsIn(new Date("2026-01-15T22:30:00Z"), "Africa/Cairo")).toEqual({ year: 2026, month: 1, day: 16, hour: 0, minute: 30 }));`,
            solution: R`const cache = new Map();
function partsIn(date, timeZone) {
  if (!cache.has(timeZone)) {
    cache.set(timeZone, new Intl.DateTimeFormat("en-US", {
      timeZone, hourCycle: "h23",
      year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric",
    }));
  }
  const out = {};
  for (const p of cache.get(timeZone).formatToParts(date)) {
    if (p.type !== "literal") out[p.type] = Number(p.value);
  }
  return out;
}`
          },
          ref: [
            { t: "MDN: Intl.DateTimeFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat" },
            { t: "MDN: Intl.DateTimeFormat.prototype.format()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format" },
            { t: "MDN: Intl.DateTimeFormat.prototype.formatToParts()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts" },
            { t: "MDN: Intl.DateTimeFormat.prototype.formatRange()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange" },
            { t: "MDN: Intl.DateTimeFormat.prototype.formatRangeToParts()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRangeToParts" },
            { t: "MDN: Intl.DateTimeFormat.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions" },
            { t: "MDN: Intl.DateTimeFormat.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/supportedLocalesOf" },
          ],
          pre: ["js/UTC و Intl.DateTimeFormat", "js/Intl.Locale"],
          deep: {
            why: R`[[format]] بيكفي لـ ٨٠٪ من الحالات. الباقي هو اللي بيتعب: تصميم عايز التاريخ بشكل معيّن، وتقرير محتاج «اليوم كام في القاهرة» على سيرفر UTC، وحجز «من-لحد»، وعميل خليجي عايز الهجري. لو عملت ده بـ [[getDate()]] و [[split]] وجداول شهور، هتغلط في التوقيت والترتيب واللغة.`,
            how: R`الـ formatter بيحسب الحتت في الـ time zone والتقويم المطلوبين (من قاعدة IANA و ICU)، وبعدين بيرصّها بـ pattern من CLDR. [[formatToParts]] بيرجّع الحتت قبل الرص. و [[formatRange]] بيقارن الطرفين حتة حتة، ويختار من CLDR pattern نطاق مناسب لأكبر حتة بتختلف (السنة ولا الشهر ولا اليوم ولا الساعة)، فاللي مشترك يتكتب مرة.`,
            when: R`[[formatToParts]] لأشكال مخصوصة، ولحسابات «اليوم في مدينة» من غير مكتبة. [[formatRange]] لأي فعالية أو حجز أو فترة تقرير. التقويم الهجري لأي جمهور خليجي أو تطبيقات المواعيد الدينية (مع تحذير الرؤية). [[timeZoneName]] لما المستخدمين في أكتر من توقيت (اجتماعات أونلاين).`,
            mistakes: R`[[dateStyle]] مع [[weekday]]. [[Number()]] على حتت عربي. [[hourCycle]] مش [["h23"]] في الحسابات. افتراض إن [["ar-SA"]] هجري. parse لناتج [[format]] أو مقارنته في اختبار من غير توحيد المسافات. [[formatRange]] بطرفين مقلوبين. وفي الانترفيو: «إزاي تجيب اليوم بتوقيت مدينة على سيرفر UTC من غير مكتبة؟» الإجابة: [[formatToParts]] بـ [[timeZone]] و [["en-US"]] و [[h23]].`,
          },
        },
        {
          cmd: "Intl.PluralRules",
          title: "«رسالتين» و «٣ رسائل» و «١١ رسالة»: تكتب الجمع العربي صح بحالاته الست",
          desc: R`الإنجليزي فيه شكلين للعدد ([[1 item]] و [[2 items]])، والعربي فيه **ستة**: صفر، وواحد، واتنين (المثنى)، و ٣–١٠ (جمع)، و ١١–٩٩ (مفرد منصوب)، و ١٠٠ وما فوق. [[Intl.PluralRules]] مبيترجمش، بيقولك **الرقم ده من أنهي فئة** في اللغة دي، وانت بتختار الكلمة.
• [[new Intl.PluralRules(locale, { type })]]: [[type: "cardinal"]] (الافتراضي، للعدد) أو [["ordinal"]] (للترتيب: 1st و 2nd).
• [[select(n)]]: بترجّع واحدة من [[zero]] و [[one]] و [[two]] و [[few]] و [[many]] و [[other]].
• [[selectRange(a, b)]]: الفئة لنطاق («٣–١١ يومًا»).
• [[resolvedOptions().pluralCategories]]: الفئات اللي اللغة دي بتستخدمها، عشان تتأكد إن الترجمة فيها كلهم.
• [[Intl.PluralRules.supportedLocalesOf()]].`,
          example: R`const ar = new Intl.PluralRules("ar-EG");
console.log([0, 1, 2, 3, 10, 11, 99, 100, 101, 103].map(n => n + ":" + ar.select(n)).join(" "));
console.log(ar.resolvedOptions().pluralCategories);
const en = new Intl.PluralRules("en-US", { type: "ordinal" });
const suffix = { one: "st", two: "nd", few: "rd", other: "th" };
console.log([1, 2, 3, 4, 11, 12, 13, 21, 22, 23].map(n => n + suffix[en.select(n)]).join(" "));
console.log(ar.selectRange(3, 11), new Intl.PluralRules("en").selectRange(1, 5));
console.log(Intl.PluralRules.supportedLocalesOf(["ar-EG", "tlh"]));`,
          try: R`اطبع [[select]] بالعربي لـ 0 و 2 و 7 و 13 و 102 و 211 و 1.5 و -3، **وتوقّع الأول**. وبعدين بـ [["fr"]] لـ 0 و 1 و 1.5 و 2، وبـ [["ja"]] و [["ru"]] اطبع [[pluralCategories]]: كل لغة فيها كام فئة؟`,
          sol: R`~~~js try-plural.js
const ar = new Intl.PluralRules("ar");
console.log([0, 2, 7, 13, 102, 211, 1.5, -3].map(n => n + ":" + ar.select(n)).join(" "));
const fr = new Intl.PluralRules("fr");
console.log([0, 1, 1.5, 2].map(n => n + ":" + fr.select(n)).join(" "));
console.log(new Intl.PluralRules("ja").resolvedOptions().pluralCategories, new Intl.PluralRules("ru").resolvedOptions().pluralCategories);
~~~

~~~text الناتج (Node 24.22)
0:zero 2:two 7:few 13:many 102:other 211:many 1.5:other -3:few
0:one 1:one 1.5:one 2:other
[ 'other' ] [ 'one', 'few', 'many', 'other' ]
~~~

- العربي بيبص على **آخر رقمين**: ٢١١ آخرها ١١ فهي [[many]] زي ١١، و ١٠٢ آخرها ٠٢ فهي [[other]] زي ١٠٠ (مش [[two]]: المثنى للاتنين بس).
- الكسور [[other]]، والسالب زي الموجب.
- الفرنساوي الصفر والكسر الأقل من ٢ مفرد («0 article»، «1,5 kilo»).
- الياباني مفيش جمع خالص (فئة واحدة)، والروسي ٤.`,
          teach: R`## الفكرة

جملة زي [[n + " رسائل"]] بتطلع «١ رسائل» و «٢ رسائل» و «١١ رسائل»: التلاتة غلط. العربي بيقول «رسالة واحدة» و «رسالتين» و «١١ رسالة». القواعد دي مكتوبة لكل لغة في CLDR، و [[Intl.PluralRules]] بيقراها. الناتج من Node 24.22، ونفسه في Chrome 157.

---

## ١. [[PluralRules.prototype.select]]: الرقم ده من أنهي فئة؟

~~~text الناتج: سطر ٢ في المثال
0:zero 1:one 2:two 3:few 10:few 11:many 99:many 100:other 101:other 103:few
~~~

| الفئة | الأرقام (بآخر رقمين) | «رسالة» | «يوم» |
|---|---|---|---|
| [[zero]] | ٠ | مفيش رسايل، أو ٠ رسالة | ٠ يوم |
| [[one]] | ١ | رسالة واحدة | يوم واحد |
| [[two]] | ٢ | رسالتين (رسالتان) | يومين (يومان) |
| [[few]] | ٣–١٠، و ١٠٣–١١٠... | ٣ رسائل | ٣ أيام |
| [[many]] | ١١–٩٩، و ١١١–١٩٩... | ١١ رسالة | ١١ يومًا |
| [[other]] | ١٠٠–١٠٢، و ٢٠٠، والكسور | ١٠٠ رسالة | ١٠٠ يوم |

- **[[few]] و [[many]] بيتكرروا كل ١٠٠:** ١٠٣ زي ٣ («١٠٣ رسائل»)، و ١١١ زي ١١. عشان كده [[n >= 3 && n <= 10]] غلط.
- **الكسور [[other]]:** «١٫٥ ساعة».
- **[[select("11")]]** بيحوّل النص لرقم ([[many]]). و [[select(NaN)]] بيرجّع [[other]] من غير error.
- **انت بتكتب الكلمات:** [[select]] بيرجّع اسم الفئة بس. الكلمة («رسائل» ولا «رسالة») من جدول الترجمة بتاعك، وكل كلمة ليها جمعها.

### الإنجليزي والفرنساوي والباقي

~~~text الناتج: pluralCategories
ar   [ 'zero', 'one', 'two', 'few', 'many', 'other' ]
en   [ 'one', 'other' ]
fr   one و other، بس 0 و 1.5 = one
ru   [ 'one', 'few', 'many', 'other' ]
ja   [ 'other' ]
~~~

الإنجليزي [[select(0)]] = [[other]] («0 items»). ولو عايز «Your cart is empty» للصفر، ده **قرار UI** مش قاعدة لغة: اعمل حالة [[zero]] خاصة بيك قبل [[select]] (مكتبة i18n في مشروع الوحدة الكبير بتعمل كده).

---

## ٢. رسالة جمع كاملة

~~~js messages.js
const rules = new Intl.PluralRules("ar");
const num = new Intl.NumberFormat("ar-EG");
const WORD = { zero: "رسالة", one: "رسالة واحدة", two: "رسالتين", few: "رسائل", many: "رسالة", other: "رسالة" };
const count = n => {
  const c = rules.select(n);
  return c === "one" || c === "two" ? WORD[c] : num.format(n) + " " + WORD[c];
};
console.log([0, 1, 2, 3, 11, 100].map(count).join(" | "));
~~~

~~~text الناتج
٠ رسالة | رسالة واحدة | رسالتين | ٣ رسائل | ١١ رسالة | ١٠٠ رسالة
~~~

- **[[one]] و [[two]] من غير رقم:** العربي بيقول «رسالتين» مش «٢ رسالتين». ده جزء من الترجمة، مش من [[Intl]].
- **الرقم من [[NumberFormat]]** بنفس الـ locale، عشان أرقام الجملة والرقم يبقوا من نفس النظام.
- **formatter واحد و rules واحدة** برّه الدالة، زي أي formatter.
- **المصري ولا الفصحى؟** الجدول بيتكتب بأي لهجة: «رسالتين جداد» أو «رسالتان جديدتان». [[PluralRules]] بيدّيك الفئة بس.

---

## ٣. [[PluralRules.prototype.resolvedOptions]]: فئات اللغة

~~~text الناتج: new Intl.PluralRules("ar-EG").resolvedOptions()
{
  locale: 'ar',
  type: 'cardinal',
  minimumIntegerDigits: 1,
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
  pluralCategories: [ 'zero', 'one', 'two', 'few', 'many', 'other' ],
  roundingIncrement: 1,
  roundingMode: 'halfExpand',
  roundingPriority: 'auto',
  trailingZeroDisplay: 'auto'
}
~~~

- **[[locale: 'ar']] مش [['ar-EG']]:** قواعد الجمع واحدة لكل العربي، فالتفاوض نزل للغة بس (Node و Chrome الاتنين). عادي، ومش غلط.
- **[[pluralCategories]]** أهم حاجة هنا: تمرين ٥ بيكتب اختبار يتأكد إن كل رسالة في ملف الترجمة فيها كل الفئات دي، فالمترجم ميقدرش ينسى [[two]].
- **الكسور بتغيّر الفئة:** [[new Intl.PluralRules("en", { minimumFractionDigits: 1 }).select(1)]] = [[other]]، لأن الرقم هيتعرض «1.0» والإنجليزي بيقول «1.0 items». لو هتعرض الرقم بكسور، ادّي [[PluralRules]] نفس الـ options بتاعة الـ [[NumberFormat]].

---

## ٤. [[type: "ordinal"]]: الأول والتاني

~~~text الناتج: سطر ٦ في المثال
1st 2nd 3rd 4th 11th 12th 13th 21st 22nd 23rd
~~~

الإنجليزي [[ordinal]] ليه ٤ فئات ([[one]] لـ st و [[two]] لـ nd و [[few]] لـ rd و [[other]] لـ th)، و ١١ و ١٢ و ١٣ [[other]]. **العربي الترتيبي فيه [[other]] بس**، لأن «الأول» و «التاني» كلمات مختلفة مش لاحقة: اكتبهم في جدول (تمرين ٣).

---

## ٥. [[PluralRules.prototype.selectRange]]: الفئة لنطاق

~~~text الناتج: selectRange بالعربي
1-2:other 3-5:few 3-11:many 10-14:many 1-3:few 0-1:zero
~~~

«من ٣ لـ ١١ يوم» الكلمة بتتبع إيه؟ CLDR فيها قواعد للنطاقات، وغالبًا الطرف التاني بيكسب: «٣–١١ يومًا» ([[many]]) و «٣–٥ أيام» ([[few]]). وبالإنجليزي [[selectRange(1, 5)]] = [[other]] («1–5 days»)، وبالفرنساوي [[selectRange(0, 1)]] = [[one]].

- **مع [[formatRange]]:** [[num.formatRange(3, 11) + " " + DAY[rules.selectRange(3, 11)]]] = «٣–١١ يومًا» (تمرين ٦).
- **الأخطاء:** [[selectRange(5)]] بيرمي [[TypeError: Invalid endRange : undefined]]، و [[selectRange(NaN, 2)]] بيرمي [[RangeError: Invalid startRange : NaN]]. أما [[selectRange(5, 1)]] فبيرجّع [[other]] من غير error.

---

## ٦. [[Intl.PluralRules.supportedLocalesOf]]

[[Intl.PluralRules.supportedLocalesOf(["ar-EG", "en", "tlh"])]] = [[[ 'ar-EG', 'en' ]]]. وخطأ ناسيين [[new]]: [[Intl.PluralRules("ar")]] بيرمي [[TypeError: Constructor Intl.PluralRules requires 'new']].

---

## الخلاصة

| عايز | استخدم |
|---|---|
| فئة رقم | [[rules.select(n)]] |
| الكلمة | جدولك: [[{ zero, one, two, few, many, other }]] |
| الترتيب (1st) | [[{ type: "ordinal" }]]، والعربي جدول كلمات |
| نطاق | [[selectRange(a, b)]] مع [[NumberFormat.formatRange]] |
| تتأكد إن الترجمة كاملة | [[resolvedOptions().pluralCategories]] |

اللي ميتلخبطش: العربي ٦ فئات، بتتحدد بآخر رقمين، و [[two]] للاتنين بس (١٠٢ [[other]])، و [[PluralRules]] مبيكتبش كلام.`,
          lines: [
            R`قواعد الجمع العربي (العدد العادي cardinal)، معمولة مرة واحدة`,
            R`[[select]] على ١٠ أرقام: [[zero]] و [[one]] و [[two]] و ٣–١٠ [[few]] و ١١–٩٩ [[many]] و ١٠٠–١٠٢ [[other]]، و ١٠٣ رجعت [[few]]`,
            R`[[pluralCategories]] بتقول العربي بيستخدم الست فئات كلهم`,
            R`قواعد الترتيب الإنجليزي ([[type: "ordinal"]]) عشان نكتب 1st و 2nd`,
            R`جدول اللاحقة لكل فئة ترتيبي: st و nd و rd و th`,
            R`[[1st 2nd 3rd 4th 11th 12th 13th 21st 22nd 23rd]]: لاحظ إن ١١ و ١٢ و ١٣ بقوا [[th]]`,
            R`[[selectRange(3, 11)]] بالعربي [[many]] (يعني «يومًا»)، و [[selectRange(1, 5)]] بالإنجليزي [[other]]`,
            R`[[supportedLocalesOf]] رجّعت [["ar-EG"]] وشالت [["tlh"]] اللي ملهاش قواعد`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير تشغيل، [[new Intl.PluralRules("ar").select(n)]] هيرجّع إيه لـ 0 و 2 و 7 و 13 و 102 و 211 و 1.5 و -3؟ (من قسم ١ في الشرح).`, done: R`كتبت الـ ٨ قبل التشغيل وطلع صح على الأقل ٦، وعرفت ليه ١٠٢ [[other]] و ٢١١ [[many]].`, sol: R`~~~js guess.js
const ar = new Intl.PluralRules("ar");
console.log([0, 2, 7, 13, 102, 211, 1.5, -3].map(n => n + ":" + ar.select(n)).join(" "));
~~~

~~~text الناتج
0:zero 2:two 7:few 13:many 102:other 211:many 1.5:other -3:few
~~~

- القاعدة: بص على **آخر رقمين** من الجزء الصحيح: ٠٢ ← [[other]] (المثنى للرقم ٢ بالظبط)، و ١١ ← [[many]].
- الكسر [[other]]، والسالب بياخد فئة قيمته المطلقة (-٣ زي ٣).
- الغلطة الشائعة: تعتبر ١٠٢ مثنى، أو ٢١١ «أكتر من ١٠٠ يبقى [[other]]».` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[countMessages(n)]] بترجّع: ٠ «مفيش رسايل جديدة»، و ١ «رسالة جديدة»، و ٢ «رسالتين جداد»، و [[few]] «N رسائل جديدة»، و [[many]] و [[other]] «N رسالة جديدة» (الرقم بـ [[String(n)]]). من غير [[if]] على الأرقام: الفئة من [[PluralRules]] (من قسم ١ و ٢ في الشرح).`, done: R`[[0]] و [[1]] و [[2]] و [[3]] و [[10]] و [[11]] و [[99]] و [[100]] و [[103]] طلّعوا الجمل الصح، و ١٠٣ «رسائل» مش «رسالة»، والاختبارات عدّت.`, sol: R`~~~js count-messages.js
const rules = new Intl.PluralRules("ar");
const FORMS = {
  zero: () => "مفيش رسايل جديدة",
  one: () => "رسالة جديدة",
  two: () => "رسالتين جداد",
  few: n => n + " رسائل جديدة",
  many: n => n + " رسالة جديدة",
  other: n => n + " رسالة جديدة",
};
function countMessages(n) {
  return FORMS[rules.select(n)](n);
}
console.log([0, 1, 2, 3, 10, 11, 99, 100, 103].map(countMessages).join(" | "));
~~~

~~~text الناتج
مفيش رسايل جديدة | رسالة جديدة | رسالتين جداد | 3 رسائل جديدة | 10 رسائل جديدة | 11 رسالة جديدة | 99 رسالة جديدة | 100 رسالة جديدة | 103 رسائل جديدة
~~~

- **جدول دوال:** كل فئة دالة بتاخد الرقم، فـ [[zero]] و [[one]] و [[two]] بيتجاهلوه، والباقي بيحطه.
- **[[FORMS[rules.select(n)](n)]]**: [[select]] بترجّع اسم المفتاح، والقوسين التانيين بينادوا الدالة.
- **ليه مفيش [[if (n >= 11)]]؟** لأن ١٠٣ و ٢١١ هيقعوا غلط. القاعدة الكاملة طويلة ومكتوبة في CLDR، و [[PluralRules]] بيطبقها.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[ordinalEn(n)]] بترجّع [["1st"]] و [["2nd"]] و [["11th"]] و [["102nd"]] بـ [[{ type: "ordinal" }]]، و [[ordinalAr(n)]] بترجّع «الأول» لحد «العاشر» من جدول، وبعدها «رقم ١١». اطبع [[pluralCategories]] للعربي الترتيبي واشرح ليه الجدول (من قسم ٤ في الشرح).`, done: R`الإنجليزي [[1st 2nd 3rd 11th 12th 13th 21st 102nd 111th]]، والعربي «الأول | التاني | التالت | العاشر | رقم ١١ | رقم ٢٥»، و [[pluralCategories]] للعربي الترتيبي [[[ 'other' ]]].`, sol: R`~~~js ordinal.js
const enOrd = new Intl.PluralRules("en-US", { type: "ordinal" });
const SUFFIX = { one: "st", two: "nd", few: "rd", other: "th" };
const ordinalEn = n => n + SUFFIX[enOrd.select(n)];
// العربي: ICU مالوش غير other في الترتيبي، فالكلمات من عندنا
const AR_ORD = ["الأول", "التاني", "التالت", "الرابع", "الخامس", "السادس", "السابع", "التامن", "التاسع", "العاشر"];
const arNum = new Intl.NumberFormat("ar-EG");
const ordinalAr = n => AR_ORD[n - 1] ?? "رقم " + arNum.format(n);
console.log([1, 2, 3, 11, 12, 13, 21, 102, 111].map(ordinalEn).join(" "));
console.log([1, 2, 3, 10, 11, 25].map(ordinalAr).join(" | "));
console.log(new Intl.PluralRules("ar", { type: "ordinal" }).resolvedOptions().pluralCategories);
~~~

~~~text الناتج
1st 2nd 3rd 11th 12th 13th 21st 102nd 111th
الأول | التاني | التالت | العاشر | رقم ١١ | رقم ٢٥
[ 'other' ]
~~~

- **[[102nd]]** صح و **[[111th]]** صح: القاعدة الإنجليزي بتبص على آخر رقمين برضه (١١ و ١٢ و ١٣ دايمًا th).
- **[[AR_ORD[n - 1] ?? ...]]**: الـ array من صفر، و [[??]] بياخد البديل لما العنصر [[undefined]] (برّه الجدول).
- **العربي [[other]] بس:** مفيش لاحقة تتغيّر، الكلمة كلها بتتغيّر («الحادي عشر»)، وكمان مذكر ومؤنث («الأولى»). ده شغل ترجمة كامل مش قاعدة رقمية، فـ CLDR مبتديش فئات.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** إشعار بيكتب [[n + " " + (n === 1 ? "رسالة" : "رسائل")]]. اطبعه لـ 1 و 2 و 11 و 100 وشوف الغلط، وبعدين صلّحه بـ [[PluralRules]] و [[NumberFormat]] بحيث يطلع «٠ رسالة | رسالة واحدة | رسالتين | ٣ رسائل | ١١ رسالة | ١٠٠ رسالة» (من قسم ٢ في الشرح).`, done: R`النسخة القديمة طلّعت «2 رسائل» و «11 رسائل» و «100 رسائل»، والجديدة طلّعت الست جمل الصح بأرقام عربي.`, sol: R`~~~js fix-plural.js
const bad = n => n + " " + (n === 1 ? "رسالة" : "رسائل");
console.log([1, 2, 11, 100].map(bad).join(" | "));
const rules = new Intl.PluralRules("ar");
const num = new Intl.NumberFormat("ar-EG");
const WORD = { zero: "رسالة", one: "رسالة واحدة", two: "رسالتين", few: "رسائل", many: "رسالة", other: "رسالة" };
const good = n => {
  const c = rules.select(n);
  return c === "one" || c === "two" ? WORD[c] : num.format(n) + " " + WORD[c];
};
console.log([0, 1, 2, 3, 11, 100].map(good).join(" | "));
~~~

~~~text الناتج
1 رسالة | 2 رسائل | 11 رسائل | 100 رسائل
٠ رسالة | رسالة واحدة | رسالتين | ٣ رسائل | ١١ رسالة | ١٠٠ رسالة
~~~

- الكود القديم منقول من الإنجليزي ([[n === 1 ? "item" : "items"]])، وده بيغلط في ٣ فئات من ٦ في العربي.
- **«١ رسالة»** صح لغويًا بس تقيلة؛ العربي بيقول «رسالة واحدة»، فـ [[one]] و [[two]] من غير رقم.
- لو التطبيق بلغتين، الجدول ده يتحط في ملف الترجمة، والدالة نفسها متتغيّرش (مشروع الوحدة الكبير).` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** ملف ترجمة [[catalog.js]] فيه رسايل جمع بالعربي والإنجليزي. اكتب [[catalog.test.js]] بـ [[node:test]] يعمل اختبار لكل رسالة: فيها كل فئات [[pluralCategories]] بتاعة لغتها؟ وخلي في الكتالوج رسالة عربي ناقصة عشان تشوف الاختبار بيقع برسالة واضحة (من قسم ٣ في الشرح).`, done: R`[[node --test catalog.test.js]] بيطبع ٤ اختبارات، ٣ عدّوا وواحد وقع وقال بالظبط «ناقص: zero, two, few, many» للرسالة العربي الناقصة.`, sol: R`~~~js catalog.js
module.exports = {
  ar: { cart: { zero: "فاضية", one: "منتج", two: "منتجين", few: "# منتجات", many: "# منتجًا", other: "# منتج" }, likes: { one: "لايك", other: "# لايك" } },
  en: { cart: { one: "# item", other: "# items" }, likes: { one: "# like", other: "# likes" } },
};
~~~

~~~js catalog.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
const catalog = require("./catalog");

for (const [lang, messages] of Object.entries(catalog)) {
  const needed = new Intl.PluralRules(lang).resolvedOptions().pluralCategories;
  for (const [key, forms] of Object.entries(messages)) {
    test(lang + ":" + key + " فيها كل حالات الجمع", () => {
      const missing = needed.filter(c => !(c in forms));
      assert.deepEqual(missing, [], "ناقص: " + missing.join(", "));
    });
  }
}
~~~

~~~text الناتج: node --test catalog.test.js (السطور المهمة)
✔ ar:cart فيها كل حالات الجمع (5.1488ms)
✖ ar:likes فيها كل حالات الجمع (2.4381ms)
✔ en:cart فيها كل حالات الجمع (0.2646ms)
✔ en:likes فيها كل حالات الجمع (0.1752ms)
ℹ pass 3
ℹ fail 1
  AssertionError [ERR_ASSERTION]: ناقص: zero, two, few, many
~~~

- **اختبار لكل رسالة** (مش اختبار واحد للكل): لما يقع بتعرف الرسالة بالاسم.
- **الفئات من [[PluralRules]] نفسه** مش من جدول مكتوب: لو ضفت [["fr"]] للكتالوج، الاختبار هيعرف لوحده إنه محتاج [[one]] و [[many]] و [[other]].
- **[[c in forms]]**: موجود كمفتاح، حتى لو قيمته نص فاضي.
- ده بالظبط اللي بتشغّله في CI على ملفات الترجمة قبل أي نشر.` },
            { lvl: 'تحدي', t: R`**ابني:** مدة التوصيل «من كام لكام يوم» بالعربي: [[deliveryWindow(a, b)]] = الرقمين بـ [[formatRange]] + كلمة «يوم» بفئة [[selectRange]]. جرّبها على ١–٢ و ٣–٥ و ٣–١١ و ٥–١٠ و ١٠–١٤ و ٢–١٠٠ (من قسم ٥ في الشرح).`, done: R`«١–٢ يوم | ٣–٥ أيام | ٣–١١ يومًا | ٥–١٠ أيام | ١٠–١٤ يومًا | ٢–١٠٠ يوم»، والكلمة بتتبع الطرف التاني في كل الحالات دي.`, sol: R`~~~js delivery.js
const num = new Intl.NumberFormat("ar-EG");
const rules = new Intl.PluralRules("ar");
const DAY = { zero: "يوم", one: "يوم", two: "يوم", few: "أيام", many: "يومًا", other: "يوم" };
const deliveryWindow = (a, b) => num.formatRange(a, b) + " " + DAY[rules.selectRange(a, b)];
console.log(["1-2", "3-5", "3-11", "5-10", "10-14", "2-100"].map(s => deliveryWindow(...s.split("-").map(Number))).join(" | "));
console.log(["1-2", "3-5", "3-11", "10-14"].map(s => s + ":" + rules.selectRange(...s.split("-").map(Number))).join(" "));
~~~

~~~text الناتج
١–٢ يوم | ٣–٥ أيام | ٣–١١ يومًا | ٥–١٠ أيام | ١٠–١٤ يومًا | ٢–١٠٠ يوم
1-2:other 3-5:few 3-11:many 10-14:many
~~~

- **[[formatRange]]** بيحط الشرطة الصح والأرقام العربي.
- **[[selectRange]] مش [[select(b)]]:** في العربي هنا الطرف التاني كسب في كل الحالات، بس لغات تانية ليها قواعد نطاق مختلفة (الفرنساوي [[selectRange(0, 1)]] = [[one]]). استخدم الدالة المخصوصة.
- **[[...s.split("-").map(Number)]]**: [[split]] بيدّي [[["3", "11"]]]، و [[map(Number)]] بيحوّلهم أرقام، و [[...]] بيفردهم كباراميترين.
- «١–٢ يوم» ([[other]]) ممكن تفضّل «يوم أو يومين»: ده قرار ترجمة تعمله في الجدول.` },
          ],
          check: {
            lang: "js",
            starter: R`const rules = new Intl.PluralRules("ar");
function countMessages(n) {
}`,
            tests: R`test("صفر", () => expect(countMessages(0)).toBe("مفيش رسايل جديدة"));
test("واحد", () => expect(countMessages(1)).toBe("رسالة جديدة"));
test("اتنين", () => expect(countMessages(2)).toBe("رسالتين جداد"));
test("٣ و ١٠", () => expect([countMessages(3), countMessages(10)]).toEqual(["3 رسائل جديدة", "10 رسائل جديدة"]));
test("١١ و ٩٩", () => expect([countMessages(11), countMessages(99)]).toEqual(["11 رسالة جديدة", "99 رسالة جديدة"]));
test("١٠٠ و ١٠٣", () => expect([countMessages(100), countMessages(103)]).toEqual(["100 رسالة جديدة", "103 رسائل جديدة"]));`,
            solution: R`const rules = new Intl.PluralRules("ar");
const FORMS = {
  zero: () => "مفيش رسايل جديدة",
  one: () => "رسالة جديدة",
  two: () => "رسالتين جداد",
  few: n => n + " رسائل جديدة",
  many: n => n + " رسالة جديدة",
  other: n => n + " رسالة جديدة",
};
function countMessages(n) {
  return FORMS[rules.select(n)](n);
}`
          },
          ref: [
            { t: "MDN: Intl.PluralRules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules" },
            { t: "MDN: Intl.PluralRules.prototype.select()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select" },
            { t: "MDN: Intl.PluralRules.prototype.selectRange()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/selectRange" },
            { t: "MDN: Intl.PluralRules.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/resolvedOptions" },
            { t: "MDN: Intl.PluralRules.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/supportedLocalesOf" },
            { t: "CLDR: Language Plural Rules", url: "https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html" },
          ],
          pre: ["js/Intl.NumberFormat", { to: "node/node --test", why: R`التمرين الخامس بيكتب اختبار بـ [[node:test]] و [[assert]]` }],
          deep: {
            why: R`«١ رسائل» و «١١ رسائل» من أكتر الباجات اللي بتبان في التطبيقات العربي، وبتدّي إحساس إن التطبيق مترجم بالآلة. والحل اليدوي ([[if]] على الأرقام) بيغلط في ١٠٣ و ٢١١ والكسور. و [[PluralRules]] بيطبق قواعد CLDR لـ ٢٠٠ لغة، فنفس الكود يشتغل لما تضيف لغة.`,
            how: R`CLDR فيها لكل لغة قواعد بمتغيرات زي [[n]] (الرقم) و [[i]] (الجزء الصحيح) و [[v]] (عدد الكسور اللي هتظهر). العربي مثلًا: [[few]] لما [[n % 100]] من ٣ لـ ١٠، و [[many]] من ١١ لـ ٩٩. [[select]] بيقرّب الرقم الأول بنفس options التقريب (زي [[NumberFormat]])، وبعدين يطبّق القواعد بالترتيب. و [[selectRange]] بيجيب فئة الطرفين ويبص في جدول نطاقات من CLDR.`,
            when: R`أي جملة فيها عدد: إشعارات، وسلة، ونتايج بحث، و «منذ ٣ أيام»، ومدد. و [[ordinal]] للترتيب الإنجليزي (المركز 1st). و [[pluralCategories]] في اختبارات ملفات الترجمة. ولو بتستخدم مكتبة (i18next أو FormatJS) فهي بتستخدم [[PluralRules]] من جوه، ولازم ملفاتك فيها الست مفاتيح للعربي.`,
            mistakes: R`[[n === 1 ? ... : ...]] المنقولة من الإنجليزي. نسيان [[two]] و [[zero]] في ملف الترجمة (الاختبار في تمرين ٥ بيمسكها). [[select]] على رقم والعرض بكسور مختلفة («1.0 item»). استخدام الترتيبي للعربي. وفي الانترفيو: «ليه i18n محتاجة أكتر من singular و plural؟» الإجابة: لغات زي العربي فيها ٦ فئات والروسي ٤، والقاعدة بتتحدد بآخر رقمين مش بالرقم كله.`,
          },
        },
        {
          cmd: "Intl.ListFormat",
          title: "«سارة ومنى وعمر» و «كاش أو كارت»: تكتب لستة كلام بالفواصل والحروف الصح لكل لغة",
          desc: R`[[Intl.ListFormat]] بياخد array نصوص ويرجّعها جملة: بالعربي «سارة ومنى وعمر» (الواو لازقة في الكلمة)، وبالأمريكي «Sara, Mona, and Omar» (بفاصلة قبل and)، وبالبريطاني «Sara, Mona and Omar» (من غيرها). حاجة صغيرة، بس [[join(", ")]] بيغلط فيها في كل لغة.
• [[type]]: [["conjunction"]] (و / and، الافتراضي) أو [["disjunction"]] (أو / or) أو [["unit"]] (لمقاسات زي «٣ ساعات و١٠ دقائق»).
• [[style]]: [["long"]] أو [["short"]] أو [["narrow"]].
• [[format(list)]] و [[formatToParts(list)]] (كل عنصر [[element]] وكل فاصل [[literal]])، و [[resolvedOptions()]] و [[Intl.ListFormat.supportedLocalesOf()]].`,
          example: R`const items = ["سارة", "منى", "عمر"];
console.log(new Intl.ListFormat("ar-EG").format(items));
console.log(new Intl.ListFormat("ar-EG", { type: "disjunction" }).format(items));
console.log(new Intl.ListFormat("en-US").format(["Sara", "Mona", "Omar"]), "|", new Intl.ListFormat("en-GB").format(["Sara", "Mona", "Omar"]));
console.log(new Intl.ListFormat("en-US", { style: "short" }).format(["Sara", "Mona", "Omar"]));
console.log(new Intl.ListFormat("ar-EG").formatToParts(["قهوة", "شاي"]));
console.log(new Intl.ListFormat("ar-EG", { type: "unit" }).resolvedOptions(), Intl.ListFormat.supportedLocalesOf(["ar-EG", "zz"]));`,
          try: R`اطبع [["سارة"]] و [["منى"]] و [["عمر"]] بالعربي بالـ ٣ types × الـ ٣ styles (٩ سطور). أنهي توليفة شكلها مختلف؟ وبعدين جرّب لستة فاضية، وعنصر واحد، وعنصرين، و [[new Set(["a", "b"])]] بالإنجليزي.`,
          sol: R`~~~js all-styles.js
const items = ["سارة", "منى", "عمر"];
for (const type of ["conjunction", "disjunction", "unit"]) {
  for (const style of ["long", "short", "narrow"]) console.log(type.padEnd(11), style.padEnd(6), new Intl.ListFormat("ar-EG", { type, style }).format(items));
}
const lf = new Intl.ListFormat("ar-EG");
console.log(JSON.stringify([lf.format([]), lf.format(["سارة"]), lf.format(["سارة", "منى"])]));
console.log(new Intl.ListFormat("en").format(new Set(["a", "b"])));
~~~

~~~text الناتج (Node 24.22)
conjunction long   سارة ومنى وعمر
conjunction short  سارة ومنى وعمر
conjunction narrow سارة ومنى وعمر
disjunction long   سارة أو منى أو عمر
disjunction short  سارة أو منى أو عمر
disjunction narrow سارة أو منى أو عمر
unit        long   سارة، ومنى، وعمر
unit        short  سارة، ومنى، وعمر
unit        narrow سارة ومنى وعمر
["","سارة","سارة ومنى"]
a and b
~~~

العربي الـ styles شبه بعض، والفرق في [["unit"]] ([["long"]] و [["short"]] بفاصلة قبل الواو). اللستة الفاضية نص فاضي، والعنصر الواحد زي ما هو. وبياخد أي iterable، مش array بس.`,
          teach: R`## الفكرة

«قهوة وشاي وكيكة» شكلها سهل لحد ما تكتبها بـ [[join]]: لستة فيها عنصر واحد تطلع «و قهوة»، والإنجليزي محتاج [[and]] قبل الأخير وفاصلة أو لأ حسب البلد، والإسباني «y» بتبقى «e» قبل كلمة بتبدأ بصوت i. [[Intl.ListFormat]] بيعرف القواعد دي. الناتج من Node 24.22، ونفسه في Chrome 157.

---

## ١. [[ListFormat.prototype.format]]

~~~text الناتج: سطور ٢-٥ في المثال
سارة ومنى وعمر
سارة أو منى أو عمر
Sara, Mona, and Omar | Sara, Mona and Omar
Sara, Mona, & Omar
~~~

| الـ type | العربي | الإنجليزي ([["en-US"]]) | إمتى |
|---|---|---|---|
| [["conjunction"]] | سارة ومنى وعمر | Sara, Mona, and Omar | «و»: اللي عملوا لايك، محتويات الطلب |
| [["disjunction"]] | سارة أو منى أو عمر | Sara, Mona, or Omar | «أو»: طرق الدفع، الاختيارات |
| [["unit"]] | سارة، ومنى، وعمر | Sara, Mona, Omar | مقاسات ومدد: «٣ ساعات و١٠ دقائق» |

| الـ style | الإنجليزي [["conjunction"]] |
|---|---|
| [["long"]] | Sara, Mona, and Omar |
| [["short"]] | Sara, Mona, & Omar |
| [["narrow"]] | Sara, Mona, Omar (من غير and خالص) |

**الحالات الطرفية:**

- **صفر عناصر:** [[""]]. اعرض انت رسالة («محدش عمل لايك لسه») قبل ما تنادي [[format]].
- **عنصر واحد:** زي ما هو. **عنصرين:** «سارة ومنى» من غير فاصلة.
- **أي iterable:** [[format(new Set(["a", "b"]))]] = «a and b».
- **العناصر لازم نصوص:** [[format([1, 2])]] بيرمي [[TypeError: Iterable yielded 1 which is not a string]] (Node و Chrome). حوّل الأول: [[list.map(String)]]، أو الأحسن [[map(n => num.format(n))]] عشان الأرقام تتكتب بلغة الجملة.
- **قواعد خاصة:** الإسباني [[format(["Juan", "Irene"])]] = «Juan e Irene» (مش y)، و [[["padres", "hijos"]]] = «padres e hijos»، بس [[["agua", "hielo"]]] = «agua y hielo» (لأن hie بتتنطق «يي»). كل ده من CLDR، انت مش محتاج تعرفه.

---

## ٢. [[ListFormat.prototype.formatToParts]]

~~~text الناتج: سطر ٦ في المثال
[
  { type: 'element', value: 'قهوة' },
  { type: 'literal', value: ' و' },
  { type: 'element', value: 'شاي' }
]
~~~

نوعين بس: [[element]] (عنصر من لستتك، زي ما بعته) و [[literal]] (الفاصل، وهنا [[" و"]]: مسافة وبعدها واو لازقة في اللي بعدها). الاستخدام: تخلي الأسامي لينكات أو تقيلة من غير ما تلمس الفواصل:

~~~js bold.js
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const lf = new Intl.ListFormat("ar-EG");
const boldList = names => lf.formatToParts(names).map(p => (p.type === "element" ? "<b>" + esc(p.value) + "</b>" : esc(p.value))).join("");
console.log(boldList(["سارة", "منى", "عمر"]));
~~~

~~~text الناتج
<b>سارة</b> و<b>منى</b> و<b>عمر</b>
~~~

ليه مش [[replace]] على ناتج [[format]]؟ لأن الواو لازقة في الاسم: «ومنى» كلمة واحدة، فأي regex على الكلمات هيدخّل الواو جوه الـ [[<b>]] (تمرين ٣ بيوريها).

---

## ٣. [[ListFormat.prototype.resolvedOptions]] و [[Intl.ListFormat.supportedLocalesOf]]

~~~text الناتج: آخر سطر في المثال
{ locale: 'ar-EG', type: 'unit', style: 'long' } [ 'ar-EG' ]
~~~

[[resolvedOptions()]] فيها ٣ حاجات بس: اللغة والنوع والـ style. و [[Intl.ListFormat.supportedLocalesOf(["ar-EG", "de", "zz-ZZ"])]] = [[[ 'ar-EG', 'de' ]]]. والـ type الغلط: [[{ type: "or" }]] بيرمي [[RangeError: Value or out of range for Intl.ListFormat options property type]].

---

## ٤. «و٢ غيرهم»: لستة طويلة

ListFormat بيرص اللي تديهوله. لو اللستة ٥٠ اسم، انت اللي تقرر تعرض كام والباقي إزاي:

~~~js short-list.js
const names = ["سارة", "منى", "عمر", "كريم", "هالة"];
const shown = [...names.slice(0, 2), new Intl.NumberFormat("ar-EG").format(names.length - 2) + " غيرهم"];
console.log(new Intl.ListFormat("ar-EG").format(shown));
~~~

~~~text الناتج
سارة ومنى و٣ غيرهم
~~~

العنصر الأخير «٣ غيرهم» نص عادي بالنسبة لـ ListFormat، فبياخد الواو زي أي عنصر. (تمرين ٢ بيكمّلها بالجمع.)

---

## الخلاصة

| عايز | استخدم |
|---|---|
| «أ وب وج» | [[new Intl.ListFormat(locale).format(list)]] |
| «أ أو ب» | [[{ type: "disjunction" }]] |
| مقاسات ومدد | [[{ type: "unit" }]] |
| أسامي تقيلة أو لينكات | [[formatToParts]] والـ [[element]] بس |
| لستة أرقام | [[map(n => num.format(n))]] الأول |

اللي ميتلخبطش: العناصر نصوص بس، واللستة الفاضية نص فاضي، والأمريكي فيه فاصلة قبل and والبريطاني لأ.`,
          lines: [
            R`لستة ٣ أسامي عربي هنجرّب عليها كل الأشكال`,
            R`الافتراضي [["conjunction"]] بالعربي: «سارة ومنى وعمر» والواو لازقة في الاسم اللي بعدها`,
            R`[["disjunction"]] بيحط «أو» بين كل عنصرين: «سارة أو منى أو عمر»`,
            R`الأمريكي بفاصلة قبل [[and]] (Oxford comma) والبريطاني من غيرها: نفس اللغة وقاعدتين`,
            R`[[style: "short"]] بالإنجليزي بيختصر الكلمة: بيحط علامة [[&]] مكان [[and]] قبل آخر عنصر`,
            R`[[formatToParts]] بيرجّع الاسمين [[element]] والفاصل بينهم [[literal]] قيمته مسافة وواو`,
            R`[[resolvedOptions()]] فيها اللغة والنوع والـ style، و [[supportedLocalesOf]] شالت [["zz"]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [["Sara"]] و [["Mona"]] و [["Omar"]] بـ [["en-US"]] بالـ ٣ styles، وبـ [["en-GB"]] الافتراضي. اكتب الأربع سطور قبل التشغيل (من قسم ١ في الشرح).`, done: R`الأربعة صح، وعرفت إن [["narrow"]] شال [[and]] خالص، وإن البريطاني من غير الفاصلة اللي قبل [[and]].`, sol: R`~~~js en-lists.js
const names = ["Sara", "Mona", "Omar"];
for (const style of ["long", "short", "narrow"]) console.log(style.padEnd(6), new Intl.ListFormat("en-US", { style }).format(names));
console.log("en-GB ", new Intl.ListFormat("en-GB").format(names));
~~~

~~~text الناتج
long   Sara, Mona, and Omar
short  Sara, Mona, & Omar
narrow Sara, Mona, Omar
en-GB  Sara, Mona and Omar
~~~

- الفاصلة قبل [[and]] اسمها Oxford comma: الأمريكي بيحطها والبريطاني لأ. ده سبب كفاية إنك متكتبش القاعدة بإيدك.
- [["narrow"]] للأماكن الضيقة جدًا (tags، chips).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[likedBy(names, locale)]] بترجّع «محدش عمل لايك لسه» للفاضية، و «سارة عمل لايك» لواحد، و «سارة ومنى عملوا لايك»، ولأكتر من ٣ «سارة ومنى و٣ غيرهم عملوا لايك»، ونفسها بالإنجليزي («Sara, Mona, and 3 others like this»). الفعل مفرد ولا جمع من [[PluralRules]] (من قسم ٤ في الشرح).`, done: R`من ٠ لـ ٥ أسامي الجمل صح باللغتين، و ٣ أسامي بتتكتب كلها («سارة ومنى وعمر») مش «و١ غيرهم»، والإنجليزي «likes» لواحد و «like» للباقي.`, sol: R`~~~js liked-by.js
const TEXT = {
  ar: { none: "محدش عمل لايك لسه", others: n => n + " غيرهم", verb: c => (c === "one" ? " عمل لايك" : " عملوا لايك") },
  en: { none: "No likes yet", others: n => n + " others", verb: c => (c === "one" ? " likes this" : " like this") },
};
function likedBy(names, locale, show = 2) {
  const lang = new Intl.Locale(locale).language;
  const t = TEXT[lang] ?? TEXT.en;
  if (names.length === 0) return t.none;
  const rest = names.length - show;
  // واحد زيادة بس؟ اكتب اسمه أحسن من «و١ غيرهم»
  const shown = rest >= 2 ? [...names.slice(0, show), t.others(new Intl.NumberFormat(locale).format(rest))] : names;
  const category = new Intl.PluralRules(locale).select(names.length);
  return new Intl.ListFormat(locale).format(shown) + t.verb(category);
}
const ar = ["سارة", "منى", "عمر", "كريم", "هالة"];
const en = ["Sara", "Mona", "Omar", "Karim", "Hala"];
for (const n of [0, 1, 2, 3, 4, 5]) console.log(likedBy(ar.slice(0, n), "ar-EG"), "|", likedBy(en.slice(0, n), "en-US"));
~~~

~~~text الناتج
محدش عمل لايك لسه | No likes yet
سارة عمل لايك | Sara likes this
سارة ومنى عملوا لايك | Sara and Mona like this
سارة ومنى وعمر عملوا لايك | Sara, Mona, and Omar like this
سارة ومنى و٢ غيرهم عملوا لايك | Sara, Mona, and 2 others like this
سارة ومنى و٣ غيرهم عملوا لايك | Sara, Mona, and 3 others like this
~~~

- **غلطة حصلت في أول نسخة:** كان الشرط [[rest > 0]]، فـ ٣ أسامي طلعت «سارة ومنى و١ غيرهم» و «1 others». الحل [[rest >= 2]]: لو فاضل واحد، اسمه أقصر من «و١ غيرهم».
- **الفعل:** [[PluralRules]] على العدد الكلي، [[one]] مفرد والباقي جمع. ولاحظ إن «سارة عمل» غلط لغويًا (عملت): الجنس محتاج معلومة عن اليوزر ومش موجود في [[Intl]]. مكتبات زي FormatJS بتحلها بـ [[select]] على الجنس.
- **الـ formatters هنا جوه الدالة** للتبسيط. في لستة بوستات كبيرة اعمل كاش زي أي formatter.` },
            { lvl: 'تطبيق', t: R`**ابني وقارن:** [[boldList(names)]] بتخلي كل اسم [[<b>]] بـ [[formatToParts]] مع escape. جرّبها على اسم فيه [[<img src=x onerror=alert(1)>]]. وبعدين جرّب الطريقة الغلط: [[format(names).replace(/[^ ]+/g, "<b>$&</b>")]] على [["سارة"]] و [["منى"]]: إيه اللي باظ؟ (من قسم ٢ في الشرح).`, done: R`[[boldList]] طلّعت الأسامي تقيلة والواو برّه، والاسم الخبيث اتكتب [[&lt;img]] كنص، والطريقة الغلط حطت «ومنى» كلها جوه [[<b>]].`, sol: R`~~~js bold-list.js
const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const lf = new Intl.ListFormat("ar-EG");
function boldList(names) {
  return lf.formatToParts(names).map(p => (p.type === "element" ? "<b>" + esc(p.value) + "</b>" : esc(p.value))).join("");
}
console.log(boldList(["سارة", "منى", "عمر"]));
console.log(boldList(["سارة", "<img src=x onerror=alert(1)>"]));
console.log(new Intl.ListFormat("ar-EG").format(["سارة", "منى"]).replace(/[^ ]+/g, "<b>$&</b>"));
~~~

~~~text الناتج
<b>سارة</b> و<b>منى</b> و<b>عمر</b>
<b>سارة</b> و<b>&lt;img src=x onerror=alert(1)&gt;</b>
<b>سارة</b> <b>ومنى</b>
~~~

- **الـ escape** هو اللي منع الـ XSS: الاسم جاي من يوزر، ولو اتحط في [[innerHTML]] من غير escape كان [[alert]] اشتغل. ([[$&]] في [[replace]] = النص اللي اتطابق.)
- **الطريقة الغلط** قسمت على المسافات، والواو العربي لازقة في الاسم، فبقت «**ومنى**». [[formatToParts]] بيعرف إن الواو [[literal]].
- **[[esc(p.value)]] للـ literal كمان**: النهارده الفاصل واو، بس في لغة تانية ممكن يبقى رمز.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[const join = list => list.slice(0, -1).join(", ") + " and " + list.at(-1);]]. اطبعه لعنصر واحد، واتنين، وتلاتة. وبعدين بدّله بـ [[ListFormat]]، وجرّب لستة أرقام [[[1, 2, 3]]]: إيه الخطأ وإزاي تصلّحه؟ (من قسم ١ في الشرح).`, done: R`القديم طلّع « and Sara» للعنصر الواحد (بمسافة في الأول)، والجديد صح في الحالات الأربعة (والفاضية [[""]])، والأرقام رمت [[TypeError]] واتصلحت بـ [[map(String)]].`, sol: R`~~~js fix-join.js
const join = list => list.slice(0, -1).join(", ") + " and " + list.at(-1);
console.log(JSON.stringify([join(["Sara"]), join(["Sara", "Mona"]), join(["Sara", "Mona", "Omar"])]));
const lf = new Intl.ListFormat("en-US");
console.log(JSON.stringify([lf.format(["Sara"]), lf.format(["Sara", "Mona"]), lf.format(["Sara", "Mona", "Omar"]), lf.format([])]));
try { lf.format([1, 2, 3]); } catch (e) { console.log(e.name + ": " + e.message); }
console.log(lf.format([1, 2, 3].map(String)));
~~~

~~~text الناتج
[" and Sara","Sara and Mona","Sara, Mona and Omar"]
["Sara","Sara and Mona","Sara, Mona, and Omar",""]
TypeError: Iterable yielded 1 which is not a string
1, 2, and 3
~~~

- **عنصر واحد:** [[slice(0, -1)]] فاضي، فالنتيجة « and Sara».
- **التلاتة:** القديم من غير Oxford comma، و [["en-US"]] بيحطها. ولو عايز من غيرها: [["en-GB"]] مش تعديل في الكود.
- **الأرقام:** ListFormat بيقبل نصوص بس عمدًا، عشان انت تقرر شكل الرقم ([[String]] أو [[NumberFormat]] بلغة الجملة).
- **[[list.at(-1)]]**: آخر عنصر (الـ [[-1]] من الآخر).` },
          ],
          ref: [
            { t: "MDN: Intl.ListFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat" },
            { t: "MDN: Intl.ListFormat.prototype.format()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format" },
            { t: "MDN: Intl.ListFormat.prototype.formatToParts()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/formatToParts" },
            { t: "MDN: Intl.ListFormat.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/resolvedOptions" },
            { t: "MDN: Intl.ListFormat.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/supportedLocalesOf" },
          ],
          pre: ["js/Intl.PluralRules", { to: "js/innerHTML هي الباب", why: R`التمرين التالت بيحط أسامي يوزرز في HTML، والـ escape هو اللي بيمنع XSS` }],
          deep: {
            why: R`اللستة في جملة بتظهر في كل حتة: محتويات الطلب، واللي عملوا لايك، وطرق الدفع، والمقاسات المتاحة. و [[join]] بيغلط في الحالات الطرفية (عنصر واحد، عنصرين)، وفي العربي (الواو لازقة)، وبين الأمريكي والبريطاني.`,
            how: R`CLDR فيها لكل لغة ٤ patterns لكل type و style: لعنصرين، ولأول عنصرين، وللنص، ولآخر عنصرين ([[{0}، {1}]] و [[{0} و{1}]]...). [[format]] بيبني الجملة من الطرفين بالـ patterns دي، ولغات زي الإسباني فيها قواعد إضافية بتبص على أول حرف في العنصر اللي بعده.`,
            when: R`أي لستة قصيرة جوه جملة يقراها بني آدم. مش للـ CSV ولا للـ logs ولا لأي حاجة بيقراها برنامج (هناك [[join(",")]] هو الصح). وللستة الطويلة: اختصر الأول («و٣ غيرهم») وبعدين format.`,
            mistakes: R`أرقام في اللستة من غير تحويل ([[TypeError]]). regex على ناتج [[format]] بدل [[formatToParts]]. [[innerHTML]] بأسامي يوزرز من غير escape. «و١ غيرهم». نسيان اللستة الفاضية. فعل مفرد مع لستة أكتر من واحد.`,
          },
        },
        {
          cmd: "Intl.DisplayNames",
          title: "أسامي اللغات والبلاد والعملات والتقاويم بأي لغة، من غير ملف ترجمة",
          desc: R`[[new Intl.DisplayNames(locale, { type })]] بيترجم **كود** لاسمه: [["EG"]] ← «مصر»، و [["en-US"]] ← «الإنجليزية (الولايات المتحدة)»، و [["EGP"]] ← «جنيه مصري»، و [["islamic-umalqura"]] ← «التقويم الهجري (أم القرى)». بتستخدمه في قوايم اختيار اللغة والبلد والعملة بدل ملف أسامي بتترجمه بإيدك.
• [[type]] لازم: [["language"]] و [["region"]] و [["currency"]] و [["script"]] و [["calendar"]] و [["dateTimeField"]].
• [[of(code)]]: الاسم. والكود الصالح شكلًا بس مش معروف بيرجع زي ما هو، أو [[undefined]] مع [[fallback: "none"]].
• [[style]] ([["long"]] و [["short"]] و [["narrow"]]) و [[languageDisplay]] ([["dialect"]] أو [["standard"]]).
• [[resolvedOptions()]] و [[Intl.DisplayNames.supportedLocalesOf()]].`,
          example: R`const langs = new Intl.DisplayNames("ar-EG", { type: "language" });
console.log(langs.of("en-US"), "|", langs.of("de"), "|", langs.of("ar-EG"));
const regions = new Intl.DisplayNames("ar-EG", { type: "region" });
console.log(regions.of("EG"), "|", regions.of("SA"), "|", regions.of("419"));
console.log(new Intl.DisplayNames("ar-EG", { type: "currency" }).of("EGP"), "|", new Intl.DisplayNames("en", { type: "currency" }).of("EGP"));
console.log(new Intl.DisplayNames("ar-EG", { type: "calendar" }).of("islamic-umalqura"));
console.log(new Intl.DisplayNames("ar-EG", { type: "script" }).of("Latn"), "|", new Intl.DisplayNames("ar-EG", { type: "dateTimeField" }).of("weekday"));
console.log(new Intl.DisplayNames("en", { type: "region", fallback: "none" }).of("QZ"), new Intl.DisplayNames("en", { type: "region" }).of("QZ"));`,
          try: R`اطبع اسم كل لغة من دول **بلغتها هي**: [["ar"]] و [["de"]] و [["ja"]] و [["fr"]] (يعني [[new Intl.DisplayNames(code, ...).of(code)]]). وبعدين بالإنجليزي اطبع [["en-GB"]] و [["ar-EG"]] مرة بـ [[languageDisplay: "dialect"]] (الافتراضي) ومرة بـ [["standard"]]. وآخر حاجة: [["arz"]] (العربي المصري) بالعربي والإنجليزي.`,
          sol: R`~~~js self-names.js
console.log(["ar", "de", "ja", "fr"].map(c => new Intl.DisplayNames(c, { type: "language" }).of(c)).join(" | "));
for (const languageDisplay of ["dialect", "standard"]) {
  const dn = new Intl.DisplayNames("en", { type: "language", languageDisplay });
  console.log(languageDisplay.padEnd(8), dn.of("en-GB"), "|", dn.of("ar-EG"));
}
console.log(new Intl.DisplayNames("ar-EG", { type: "language" }).of("arz"), "|", new Intl.DisplayNames("en", { type: "language" }).of("arz"));
~~~

~~~text الناتج (Node 24.22، ونفسه في Chrome 157)
العربية | Deutsch | 日本語 | français
dialect  British English | Arabic (Egypt)
standard English (United Kingdom) | Arabic (Egypt)
arz | Egyptian Arabic
~~~

- [["dialect"]] بيستخدم اسم اللهجة لو موجود («British English»)، و [["standard"]] دايمًا «اللغة (البلد)».
- **[["arz"]] بالعربي رجعت الكود نفسه:** CLDR معندهاش اسم عربي للعربي المصري (بالإنجليزي موجود). ده [[fallback: "code"]] الافتراضي. لو بتعرض قايمة لازم تعرف إن الاسم ممكن يرجع كود.`,
          teach: R`## الفكرة

أي صفحة إعدادات فيها «اختار لغتك» و «اختار بلدك» و «العملة». الأسامي دي متترجمة في CLDR لكل اللغات، و [[Intl.DisplayNames]] بيقراها. الناتج من Node 24.22، والأسامي نفسها في Chrome 157.

---

## ١. [[new Intl.DisplayNames(locale, { type })]] و [[of(code)]]

~~~text الناتج: سطور ٢ لـ ٨ في المثال
الإنجليزية (الولايات المتحدة) | الألمانية | العربية (مصر)
مصر | المملكة العربية السعودية | أمريكا اللاتينية
جنيه مصري | Egyptian Pound
التقويم الهجري (أم القرى)
اللاتينية | اليوم
undefined QZ
~~~

| الـ type | الكود | مثال بالعربي |
|---|---|---|
| [["language"]] | BCP 47 tag: [["de"]] و [["en-US"]] و [["zh-Hant"]] | الألمانية، الصينية التقليدية |
| [["region"]] | حرفين كبار أو ٣ أرقام: [["EG"]] و [["419"]] و [["001"]] | مصر، أمريكا اللاتينية، العالم |
| [["currency"]] | ٣ حروف ISO 4217: [["EGP"]] و [["KWD"]] | جنيه مصري، دينار كويتي |
| [["script"]] | ٤ حروف: [["Arab"]] و [["Latn"]] و [["Cyrl"]] | العربية، اللاتينية، السيريلية |
| [["calendar"]] | اسم تقويم: [["gregory"]] و [["coptic"]] | التقويم الميلادي، التقويم القبطي |
| [["dateTimeField"]] | اسم حقل: [["year"]] و [["weekday"]] و [["hour"]] | السنة، اليوم، الساعات |

- **[["dateTimeField"]]** أسامي حقول التاريخ نفسها: عناوين أعمدة في فورم أو date picker («الساعات» و «الدقائق»).
- **الأكواد مش حساسة لحالة الحروف** في العملة: [[of("usd")]] = «US Dollar».

---

## ٢. [[style]] و [[languageDisplay]]

~~~text الناتج: region بالإنجليزي على US | GB | HK | EG
long   United States | United Kingdom | Hong Kong SAR China | Egypt
short  US | UK | Hong Kong | Egypt
narrow US | UK | Hong Kong | Egypt
~~~

[["short"]] للأماكن الضيقة. و [[languageDisplay]] للغات بس: [["dialect"]] (الافتراضي) بيقول «American English»، و [["standard"]] بيقول «English (United States)». الـ standard أحسن في قايمة طويلة لأن الأسامي بتترتب جنب بعض (كل الـ English ورا بعض).

---

## ٣. الكود المش معروف والكود الغلط

~~~js unknown.js
const r = new Intl.DisplayNames("en", { type: "region" });
console.log(r.of("ZZ"), "|", r.of("XA"), "|", new Intl.DisplayNames("en", { type: "language" }).of("xx"));
console.log(new Intl.DisplayNames("en", { type: "currency", fallback: "none" }).of("XXY"));
r.of("Egypt");
~~~

~~~text الناتج
Unknown Region | Pseudo-Accents | xx
undefined
RangeError: invalid_argument
~~~

فيه حالتين مختلفتين:

1. **الكود شكله صح ومش معروف** ([["QZ"]] و [["xx"]] و [["XXY"]]): بيرجع الكود نفسه (الافتراضي [[fallback: "code"]])، أو [[undefined]] مع [[fallback: "none"]]. الـ [["none"]] أحسن لو عايز تعرف إن الاسم مش موجود وتعرض حاجة من عندك. (وبعض الأكواد ليها أسامي غريبة: [["ZZ"]] = «Unknown Region» و [["XA"]] = «Pseudo-Accents»، أكواد اختبار.)
2. **الكود شكله غلط** ([["Egypt"]] و [["EG"]] كعملة و [["ar_EG"]] كلغة): بيرمي [[RangeError: invalid_argument]] (الرسالة دي من V8 في Node و Chrome، ومش بتقول السبب). يعني أي كود جاي من يوزر اتأكد من شكله الأول (تمرين ٤).

ومن غير [[type]]: [[new Intl.DisplayNames("en")]] بيرمي [[TypeError: invalid_argument]]، والـ type الغلط ([["country"]]): [[RangeError: Value country out of range for Intl.DisplayNames options property type]].

---

## ٤. [[DisplayNames.prototype.resolvedOptions]] و [[Intl.DisplayNames.supportedLocalesOf]]

~~~text الناتج
{
  locale: 'ar-EG',
  style: 'long',
  type: 'language',
  fallback: 'code',
  languageDisplay: 'dialect'
}
[ 'ar-EG', 'en-US' ]
~~~

السطر الأول [[langs.resolvedOptions()]] (و [[languageDisplay]] بيظهر في [["language"]] بس). والتاني [[Intl.DisplayNames.supportedLocalesOf(["ar-EG", "en-US", "xx"])]].

---

## ٥. قايمة اللغات: كل لغة باسمها

اللي بيدوّر على لغته في قايمة بيدوّر على **اسمها بلغتها** (اللي مبيعرفش عربي مش هيدوّر على «الألمانية»). عشان كده القايمة الصح: «Deutsch (الألمانية)». الاسم الأول [[new Intl.DisplayNames(code, ...)]] بلغة الكود نفسه، والتاني بلغة الصفحة (تمرين ٢).

---

## الخلاصة

| عايز | استخدم |
|---|---|
| اسم بلد أو لغة أو عملة بلغة الصفحة | [[new Intl.DisplayNames(uiLocale, { type }).of(code)]] |
| اسم اللغة بلغتها | [[new Intl.DisplayNames(code, { type: "language" }).of(code)]] |
| تعرف إن الاسم مش موجود | [[fallback: "none"]] بيرجّع [[undefined]] |
| كود من يوزر | اتأكد من شكله قبل [[of]]، وإلا [[RangeError]] |

اللي ميتلخبطش: [[type]] لازم، والكود الغلط شكلًا بيرمي، والمش معروف بيرجع الكود نفسه.`,
          lines: [
            R`formatter لأسامي اللغات بالعربي المصري: بياخد كود لغة ويرجّع اسمها`,
            R`«الإنجليزية (الولايات المتحدة)» و «الألمانية» و «العربية (مصر)»: الاسم بيتبني من اللغة والبلد`,
            R`formatter لأسامي البلاد بالعربي، بياخد كود حرفين أو ٣ أرقام`,
            R`«مصر» و «المملكة العربية السعودية»، و [["419"]] كود منطقة مش بلد: «أمريكا اللاتينية»`,
            R`نفس العملة [["EGP"]] باللغتين: «جنيه مصري» و «Egyptian Pound»`,
            R`اسم التقويم الهجري: «التقويم الهجري (أم القرى)»، بينفع في قايمة اختيار التقويم`,
            R`[["script"]] بيدّي اسم الكتابة «اللاتينية»، و [["dateTimeField"]] اسم الحقل [[weekday]] = «اليوم»`,
            R`[[fallback: "none"]] بيرجّع [[undefined]] للكود المش معروف [["QZ"]]، والافتراضي بيرجّع الكود نفسه`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بالإنجليزي و [[type: "region"]]، [["US"]] و [["GB"]] و [["HK"]] و [["EG"]] هيطلعوا إيه بالـ ٣ styles؟ (من قسم ٢ في الشرح).`, done: R`كتبت التوقع وعرفت إن [["long"]] بيطلع «Hong Kong SAR China»، وإن [["narrow"]] زي [["short"]] هنا.`, sol: R`~~~js region-styles.js
for (const style of ["long", "short", "narrow"]) {
  const r = new Intl.DisplayNames("en", { type: "region", style });
  console.log(style.padEnd(6), ["US", "GB", "HK", "EG"].map(c => r.of(c)).join(" | "));
}
~~~

~~~text الناتج
long   United States | United Kingdom | Hong Kong SAR China | Egypt
short  US | UK | Hong Kong | Egypt
narrow US | UK | Hong Kong | Egypt
~~~

- [["GB"]] اسمه القصير «UK» مش «GB»: الكود الرسمي غير الاسم اللي الناس بتقوله.
- [["narrow"]] مبيختلفش عن [["short"]] لو مفيش اسم أقصر في CLDR.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[languageOptions(codes, uiLocale)]] بترجّع [[<option>]] لكل لغة: اسمها بلغتها، وجنبه بين قوسين اسمها بلغة الصفحة (إلا لو هي نفس لغة الصفحة)، و [[lang]] على كل option. جرّبها على [[["ar", "en", "fr", "de", "tr"]]] والصفحة [["ar-EG"]] (من قسم ٥ في الشرح).`, done: R`٥ سطور، أولهم «العربية» لوحدها، والباقي زي «Deutsch (الألمانية)» و «Türkçe (التركية)»، وكل option عليه [[lang]] بكوده.`, sol: R`~~~js language-options.js
function languageOptions(codes, uiLocale) {
  const inUi = new Intl.DisplayNames(uiLocale, { type: "language" });
  return codes.map(code => {
    const self = new Intl.DisplayNames(code, { type: "language" }).of(code);
    const label = code.split("-")[0] === uiLocale.split("-")[0] ? self : self + " (" + inUi.of(code) + ")";
    return '<option value="' + code + '" lang="' + code + '">' + label + "</option>";
  });
}
console.log(languageOptions(["ar", "en", "fr", "de", "tr"], "ar-EG").join("\n"));
~~~

~~~text الناتج
<option value="ar" lang="ar">العربية</option>
<option value="en" lang="en">English (الإنجليزية)</option>
<option value="fr" lang="fr">français (الفرنسية)</option>
<option value="de" lang="de">Deutsch (الألمانية)</option>
<option value="tr" lang="tr">Türkçe (التركية)</option>
~~~

- **[[lang]] على الـ option:** قارئ الشاشة بينطق «Deutsch» بنطق ألماني، والمتصفح بيختار الخط الصح.
- **«français» بحرف صغير:** CLDR بتكتب أسامي اللغات زي ما بتتكتب في اللغة دي (الفرنساوي بحرف صغير). متعملهاش capitalize.
- formatter [[DisplayNames]] لكل كود هنا عشان كل اسم بلغته؛ القايمة صغيرة فمش فارقة في الأداء، ولو كبيرة اعمل كاش.` },
            { lvl: 'تطبيق', t: R`**ابني:** قايمة بلاد ([[["SA", "EG", "IR", "ET", "AF", "ES", "JO", "OM", "IT"]]]) بأساميها العربي **مترتبة زي القاموس**. رتّبها مرة بـ [[Intl.Collator("ar")]] ومرة بمقارنة [[<]] العادية: الفرق فين؟`, done: R`بالـ Collator «إثيوبيا» و «إسبانيا» و «أفغانستان» و «الأردن» جنب بعض في أول القايمة، و «إيران» و «إيطاليا» بعد «المملكة»، وبالمقارنة العادية كل اللي بيبدأ بـ «أ» قبل «إ» قبل «ا».`, sol: R`~~~js countries.js
const codes = ["SA", "EG", "IR", "ET", "AF", "ES", "JO", "OM", "IT"];
const names = new Intl.DisplayNames("ar-EG", { type: "region" });
const byName = new Intl.Collator("ar").compare;
const list = codes.map(code => ({ code, name: names.of(code) }));
console.log([...list].sort((a, b) => byName(a.name, b.name)).map(c => c.name).join(" | "));
console.log([...list].sort((a, b) => (a.name < b.name ? -1 : 1)).map(c => c.name).join(" | "));
~~~

~~~text الناتج
إثيوبيا | إسبانيا | أفغانستان | الأردن | المملكة العربية السعودية | إيران | إيطاليا | عُمان | مصر
أفغانستان | إثيوبيا | إسبانيا | إيران | إيطاليا | الأردن | المملكة العربية السعودية | عُمان | مصر
~~~

- **الـ Collator** بيعتبر أ و إ و ا نفس الحرف في الترتيب الأساسي، فبيرتّب بالحروف اللي بعدها: «إث» قبل «إس» قبل «أف» قبل «ال» قبل «إي» (ث < س < ف < ل < ي).
- **[[<]]** بيقارن الـ code units: أ (U+0623) قبل إ (U+0625) قبل ا (U+0627)، فبيعمل ٣ مجموعات منفصلة.
- القايمة الصح بتحفظ [[code]] جنب الاسم: الـ [[value]] في الفورم هو الكود، والاسم للعرض بس.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** صفحة بتعرض اسم بلد اليوزر من [[profile.country]]، ويوزر كاتب [["Egypt"]] بدل [["EG"]] فالصفحة وقعت. اكتب [[safeRegionName(code)]]: بتنضّف (مسافات وحروف صغيرة)، وبتتأكد من الشكل بـ regex، وبـ [[fallback: "none"]]، وبترجّع «غير معروف» بدل ما توقع. جرّبها على [["eg"]] و [[" sa "]] و [["QZ"]] و [["Egypt"]] و [[""]] و [[null]] و [["419"]] (من قسم ٣ في الشرح).`, done: R`«مصر | المملكة العربية السعودية | غير معروف | غير معروف | غير معروف | غير معروف | أمريكا اللاتينية» من غير ولا exception.`, sol: R`~~~js safe-region.js
const names = new Intl.DisplayNames("ar-EG", { type: "region" });
try { names.of("Egypt"); } catch (e) { console.log(e.name + ": " + e.message); }
const strict = new Intl.DisplayNames("ar-EG", { type: "region", fallback: "none" });
function safeRegionName(code) {
  const c = String(code ?? "").trim().toUpperCase();
  if (!/^([A-Z]{2}|\d{3})$/.test(c)) return "غير معروف";
  return strict.of(c) ?? "غير معروف";
}
console.log(["eg", " sa ", "QZ", "Egypt", "", null, "419"].map(safeRegionName).join(" | "));
console.log(strict.resolvedOptions(), Intl.DisplayNames.supportedLocalesOf(["ar-EG", "zz"]));
~~~

~~~text الناتج
RangeError: invalid_argument
مصر | المملكة العربية السعودية | غير معروف | غير معروف | غير معروف | غير معروف | أمريكا اللاتينية
{ locale: 'ar-EG', style: 'long', type: 'region', fallback: 'none' } [ 'ar-EG' ]
~~~

- **[[String(code ?? "")]]**: [[null]] و [[undefined]] بقوا [[""]] قبل [[trim]].
- **الـ regex** نفس شكل كود المنطقة في BCP 47: حرفين أو ٣ أرقام. أي حاجة تانية مش هتوصل لـ [[of]] أصلًا، فمفيش [[RangeError]].
- **[[fallback: "none"]]** و [[??]]: [["QZ"]] شكله صح بس مش معروف، فـ [[of]] رجّعت [[undefined]] و [[??]] حطت «غير معروف».
- الحل الأحسن على المدى الطويل: الفورم يخلّي اليوزر **يختار** من قايمة (مشروع «كارت اللغة» والتمرين اللي فات) بدل ما يكتب.` },
          ],
          ref: [
            { t: "MDN: Intl.DisplayNames", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames" },
            { t: "MDN: Intl.DisplayNames.prototype.of()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/of" },
            { t: "MDN: Intl.DisplayNames.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/resolvedOptions" },
            { t: "MDN: Intl.DisplayNames.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/supportedLocalesOf" },
          ],
          pre: ["js/Intl.Locale"],
          deep: {
            why: R`ملف «أسامي البلاد» المترجم بإيدك فيه ٢٥٠ بلد × كل لغة بتدعمها، وبيقدم (أسامي بتتغيّر، وبلاد بتتضاف). CLDR مترجمة ومتحدّثة ومع المتصفح، فالقايمة بتطلع بأي لغة من سطر واحد.`,
            how: R`الـ constructor بيتفاوض على اللغة ويحمّل جداول الأسامي للـ type المطلوب. [[of]] بيتأكد إن الكود شكله صالح للـ type (وإلا [[RangeError]])، ويظبطه، ويدوّر عليه. للغات: بيدوّر على الـ tag كامل كلهجة ([["en-GB"]] ← «British English») لو [["dialect"]]، وإلا بيبني «اللغة (البلد)».`,
            when: R`قوايم اختيار اللغة والبلد والعملة، وعرض بيانات زي «الشحن إلى: ألمانيا»، وعناوين حقول التاريخ في date picker مترجم. مش لأسامي المدن (مش موجودة في [[DisplayNames]]) ولا لأسامي الأيام والشهور (دي من [[DateTimeFormat]]).`,
            mistakes: R`نسيان [[type]]. كود من يوزر من غير validation. افتراض إن [[of]] دايمًا بيرجّع اسم (ممكن الكود نفسه). قايمة لغات بأساميها بلغة الصفحة بس. ترتيب الأسامي العربي بـ [[<]] أو [[sort()]] من غير Collator.`,
          },
        },
        {
          cmd: "Intl.DurationFormat",
          title: "«ساعة و٤٦ دقيقة» و «1:46:40»: تكتب المدة بأي لغة، والمثنى العربي لوحده",
          desc: R`[[Intl.DurationFormat]] بياخد مدة كـ object ([[{ hours: 1, minutes: 46, seconds: 40 }]]) ويكتبها جملة باللغة: «ساعة، و٤٦ دقيقة، و٤٠ ثانية» أو «1h 46m 40s» أو «1:46:40». وبيعرف الجمع والمثنى («ساعتان» و «دقيقتان»).
• [[style]]: [["long"]] و [["short"]] و [["narrow"]] و [["digital"]] (شكل الساعة).
• لكل وحدة option ([[hours: "numeric"]]) و [[...Display]] ([[hoursDisplay: "always"]] عشان تظهر حتى لو صفر).
• [[format(duration)]] و [[formatToParts(duration)]] (وكل حتة عليها [[unit]])، و [[resolvedOptions()]] و [[Intl.DurationFormat.supportedLocalesOf()]].
• **مش بيوزّع:** [[{ minutes: 125 }]] بيفضل «125 minutes». انت اللي بتحوّل الثواني لساعات ودقايق.
موجود في Node 23+ و Chrome 129+ و Firefox 136+ و Safari 16.4+ (من جدول التوافق في MDN)، والدرس فيه بديل للنسخ الأقدم.`,
          example: R`const dur = { hours: 1, minutes: 46, seconds: 40 };
for (const style of ["long", "short", "narrow", "digital"]) console.log(style.padEnd(7), new Intl.DurationFormat("ar-EG", { style }).format(dur));
console.log(new Intl.DurationFormat("en", { style: "long" }).format(dur));
console.log(new Intl.DurationFormat("ar-EG", { style: "long" }).format({ hours: 2 }));
console.log(new Intl.DurationFormat("en", { style: "digital", fractionalDigits: 3 }).format({ minutes: 3, seconds: 5, milliseconds: 250 }));
console.log(new Intl.DurationFormat("ar-EG-u-nu-latn", { style: "long" }).format({ hours: 3, minutes: 46 }));
console.log(new Intl.DurationFormat("en").formatToParts({ hours: 2, minutes: 5 }).map(p => p.type + ":" + p.value).join("|"));
console.log(new Intl.DurationFormat("ar-EG").resolvedOptions().style, Intl.DurationFormat.supportedLocalesOf(["ar-EG", "zz"]));`,
          try: R`اطبع بـ [["ar-EG"]] و [[style: "long"]] الساعات ١ و ٢ و ٣ و ١١ و ١٠٠ (كل واحدة لوحدها). وبعدين [[{ years: 1, months: 2, weeks: 1, days: 3 }]]. وبعدين [[{ minutes: 125 }]] بالإنجليزي: بقت «2 hours, 5 minutes»؟`,
          sol: R`~~~js try-duration.js
const ar = new Intl.DurationFormat("ar-EG", { style: "long" });
console.log([1, 2, 3, 11, 100].map(h => ar.format({ hours: h })).join(" | "));
console.log(ar.format({ years: 1, months: 2, weeks: 1, days: 3 }));
console.log(new Intl.DurationFormat("en", { style: "long" }).format({ minutes: 125 }));
~~~

~~~text الناتج (Node 24.22)
ساعة | ساعتان | ٣ ساعات | ١١ ساعة | ١٠٠ ساعة
سنة، وشهران، وأسبوع، و٣ أيام
125 minutes
~~~

قواعد الجمع العربي اتطبقت لوحدها (من [[PluralRules]] من جوه): «ساعة» من غير رقم للواحد، و «ساعتان» للاتنين. و [[{ minutes: 125 }]] فضلت «125 minutes»: [[DurationFormat]] بيكتب اللي تديهوله بس، مبيحوّلش ١٢٠ دقيقة لساعتين.`,
          teach: R`## الفكرة

مدة فيديو، ووقت التوصيل، والوقت الباقي في رفع ملف، ومدة الاشتراك. كل لغة بتكتبها بشكل («1 hr, 46 min» و «١ س، و٤٦ د»)، والعربي فيه مثنى. [[Intl.DurationFormat]] آخر formatter اتضاف لـ [[Intl]] (ES2025). الناتج من Node 24.22، واتجرّب في Chrome 157 وطلع نفسه.

---

## ١. [[DurationFormat.prototype.format]] والـ styles

~~~text الناتج: سطور ٢ لـ ٦ في المثال
long    ساعة، و٤٦ دقيقة، و٤٠ ثانية
short   ١ س، و٤٦ د، و٤٠ ث
narrow  ١ س و٤٦ د و٤٠ ث
digital ١:٤٦:٤٠
1 hour, 46 minutes, 40 seconds
ساعتان
0:03:05.250
3 ساعات و46 دقيقة
~~~

| الـ style | العربي | الإنجليزي | إمتى |
|---|---|---|---|
| [["long"]] | ساعة، و٤٦ دقيقة، و٤٠ ثانية | 1 hour, 46 minutes, 40 seconds | جملة يقراها بني آدم |
| [["short"]] (الافتراضي) | ١ س، و٤٦ د، و٤٠ ث | 1 hr, 46 min, 40 sec | جداول وكروت |
| [["narrow"]] | ١ س و٤٦ د و٤٠ ث | 1h 46m 40s | مكان ضيق جدًا |
| [["digital"]] | ١:٤٦:٤٠ | 1:46:40 | مشغل فيديو، عدّاد |

**الـ object:** مفاتيحه [[years]] و [[months]] و [[weeks]] و [[days]] و [[hours]] و [[minutes]] و [[seconds]] و [[milliseconds]] و [[microseconds]] و [[nanoseconds]] (جمع دايمًا). أي مفتاح غلط ([[hour]] من غير s) بيتجاهل، ولو مفيش ولا مفتاح صح بيرمي (قسم ٤).

**[[fractionalDigits: 3]]** مع [["digital"]] بيحط الـ ms بعد الثواني: «0:03:05.250».

---

## ٢. كل وحدة لوحدها: [[hours: "numeric"]] و [[hoursDisplay]]

~~~js units.js
console.log(new Intl.DurationFormat("en", { style: "long", minutes: "narrow" }).format({ hours: 1, minutes: 5 }));
console.log(new Intl.DurationFormat("en", { style: "short", hoursDisplay: "always" }).format({ minutes: 5 }));
console.log(new Intl.DurationFormat("en", { style: "digital" }).format({ minutes: 3, seconds: 5 }));
console.log(new Intl.DurationFormat("en", { style: "digital", hours: "numeric", hoursDisplay: "auto" }).format({ minutes: 3, seconds: 5 }));
~~~

~~~text الناتج
1 hour, 5m
0 hr, 5 min
0:03:05
03:05
~~~

- **style لوحدة واحدة** ([[minutes: "narrow"]]) بيكسب الـ style العام ليها بس.
- **[[...Display: "auto"]]** (الافتراضي) بيخفي الوحدة لو صفر، و [["always"]] بيظهرها.
- **[["digital"]] بيظهر الساعات دايمًا** («0:03:05»). عايز «03:05» زي مشغل فيديو قصير؟ [[hoursDisplay: "auto"]].

---

## ٣. هو مبيوزّعش: انت بتحوّل

~~~text الناتج
{ minutes: 125 }              125 minutes
{ hours: -1, minutes: -30 }   -1 hour, 30 minutes
~~~

- **[[{ minutes: 125 }]]** فضلت ١٢٥ دقيقة. اللي معاك غالبًا ثواني أو ms (من [[video.duration]] أو فرق تاريخين)، فحوّلها انت: [[Math.floor(total / 3600)]] للساعات و [[Math.floor((total % 3600) / 60)]] للدقايق و [[total % 60]] للثواني (تمرين ٢).
- **السالب:** كل الوحدات لازم نفس الإشارة، والإشارة بتتكتب مرة («-1 hour, 30 minutes»).

---

## ٤. الحالات الطرفية والأخطاء

| الحالة | Node 24.22 | Chrome 157 |
|---|---|---|
| [[{ seconds: 0 }]] بـ [["long"]] | [[""]] نص فاضي | [[""]] |
| [[{}]] أو [[{ hour: 1 }]] (مفيش مفتاح صح) | [[TypeError: Invalid argument for Temporal ..\..\deps\v8\src\objects\js-temporal-objects.cc:7905]] | [[TypeError: Temporal error: Did not provide any valid Duration fields.]] |
| [[{ hours: 1.5 }]] (كسر) | [[RangeError: Invalid time value for Temporal ...]] | [[RangeError: Temporal error: Expected finite integer.]] |
| [[{ hours: 1, minutes: -30 }]] (إشارتين) | [[RangeError: Invalid object : #<Object>]] | [[RangeError: Temporal error: Duration was not valid.]] |
| [[format("PT1H")]] (نص ISO) | [[RangeError: Invalid object : PT1H]] | نفس الفكرة |

- **الصفر نص فاضي:** «باقي » من غير حاجة بعدها. لو المدة ممكن تبقى صفر، اعمل حالة ليها (تمرين ٤)، أو [[secondsDisplay: "always"]] لو عايز «٠ ثانية».
- **رسايل Node فيها مسار ملف من كود V8 نفسه** (ده تفصيلة داخلية في Node 24.22، مش من كودك). Chrome بيقول السبب. المعنى واحد: الـ object مش مدة صالحة.
- **الكسور ممنوعة:** «ساعة ونص» = [[{ hours: 1, minutes: 30 }]].

---

## ٥. [[numberingSystem]]: فخ في Node و Chrome

~~~js nu.js
console.log(new Intl.DurationFormat("ar-EG", { style: "long", numberingSystem: "latn" }).format({ hours: 3, minutes: 46 }));
console.log(new Intl.DurationFormat("ar-EG", { style: "long", numberingSystem: "latn" }).resolvedOptions().numberingSystem);
console.log(new Intl.DurationFormat("ar-EG-u-nu-latn", { style: "long" }).format({ hours: 3, minutes: 46 }));
~~~

~~~text الناتج (Node 24.22، ونفس الأول والتالت في Chrome 157)
٣ ساعات و٤٦ دقيقة
latn
3 ساعات و46 دقيقة
~~~

الـ option [[numberingSystem: "latn"]] بيتسجّل في [[resolvedOptions()]] بس **الأرقام بتفضل عربي**. والـ extension في الـ tag ([[-u-nu-latn]]) شغال. ده باج في التنفيذ (V8) موجود في الاتنين وقت كتابة الدرس. عايز أرقام لاتيني؟ اكتبها في الـ tag. ولاحظ إن [[resolvedOptions]] نفسه ممكن يكذب، فالناتج الحقيقي هو الحَكَم.

---

## ٦. [[DurationFormat.prototype.formatToParts]]

~~~text الناتج: سطر ٧ في المثال
integer:2|literal: |unit:hr|literal:, |integer:5|literal: |unit:min
~~~

وبالعربي [[formatToParts({ hours: 2, minutes: 5 })]] بـ [["long"]]:

~~~text الناتج
[
  { type: 'unit', value: 'ساعتان', unit: 'hour' },
  { type: 'literal', value: ' و' },
  { type: 'integer', value: '٥', unit: 'minute' },
  { type: 'literal', value: ' ', unit: 'minute' },
  { type: 'unit', value: 'دقائق', unit: 'minute' }
]
~~~

- كل حتة تبع وحدة عليها [[unit]] ([["hour"]] و [["minute"]]، مفرد)، والفاصل بين الوحدات من غير [[unit]].
- المثنى «ساعتان» حتة واحدة نوعها [[unit]] من غير [[integer]]: مفيش رقم أصلًا.
- الاستخدام: تكبّر الأرقام بس، أو تلوّن كل وحدة.

---

## ٧. [[DurationFormat.prototype.resolvedOptions]] و [[Intl.DurationFormat.supportedLocalesOf]]

[[new Intl.DurationFormat("ar-EG", { style: "short" }).resolvedOptions()]] بترجّع [[locale]] و [[numberingSystem]] و [[style]]، ولكل وحدة من الـ ١٠ قيمتين: الـ style بتاعها ([[hours: 'short']]) والـ Display ([[hoursDisplay: 'auto']]). يعني ٢٣ مفتاح. و [[Intl.DurationFormat.supportedLocalesOf(["ar-EG", "zz"])]] = [[[ 'ar-EG' ]]].

---

## ٨. لو مش موجود: بديل بـ [[NumberFormat]] و [[ListFormat]]

[[typeof Intl.DurationFormat === "function"]] بيقولك موجود ولا لأ. لو لأ (Node 22، Safari قديم): كل وحدة بـ [[NumberFormat]] بـ [[style: "unit"]] و [[unitDisplay: "long"]]، والوحدات مع بعض بـ [[ListFormat]] بـ [[type: "unit"]]. الناتج «ساعة و٣٠ دقيقة» بالظبط زي الأصلي في الحالة دي (تمرين ٣). أو polyfill من FormatJS.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| مدة كجملة | [[{ style: "long" }]] |
| عدّاد أو مشغل | [[{ style: "digital" }]]، و [[hoursDisplay: "auto"]] للقصير |
| من ثواني | حوّل انت لـ [[{ hours, minutes, seconds }]] |
| أرقام لاتيني | [[-u-nu-latn]] في الـ tag، مش الـ option |
| المدة صفر | حالة خاصة، لأن الناتج [[""]] |

اللي ميتلخبطش: مبيوزّعش، ومبيقبلش كسور ولا إشارتين، والصفر نص فاضي.`,
          lines: [
            R`مدة كـ object: ساعة و ٤٦ دقيقة و ٤٠ ثانية، المفاتيح جمع دايمًا`,
            R`نفس المدة بالـ ٤ styles بالعربي: من الجملة الكاملة لحد شكل الساعة [[١:٤٦:٤٠]]`,
            R`نفس المدة بالإنجليزي [["long"]]: «1 hour, 46 minutes, 40 seconds»`,
            R`ساعتين بالعربي طلعت «ساعتان» من غير رقم: المثنى من قواعد الجمع`,
            R`[["digital"]] مع [[fractionalDigits: 3]] حط الـ ms بعد الثواني: [[0:03:05.250]]`,
            R`[[-u-nu-latn]] في الـ tag بيدّي أرقام لاتيني جوه الجملة العربي (الـ option لوحده مبيشتغلش)`,
            R`[[formatToParts]] بنوع كل حتة: [[integer]] و [[unit]] و [[literal]]`,
            R`الـ style الافتراضي [["short"]]، و [[supportedLocalesOf]] شالت [["zz"]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[{ minutes: 5, seconds: 7 }]] بالإنجليزي بالـ ٤ styles (من قسم ١ في الشرح).`, done: R`الأربعة صح، وعرفت إن [["digital"]] حط [[0:]] للساعات.`, sol: R`~~~js guess-duration.js
const d = { minutes: 5, seconds: 7 };
for (const style of ["long", "short", "narrow", "digital"]) console.log(style.padEnd(7), new Intl.DurationFormat("en", { style }).format(d));
~~~

~~~text الناتج
long    5 minutes, 7 seconds
short   5 min, 7 sec
narrow  5m 7s
digital 0:05:07
~~~

- [["digital"]] بيكمّل الدقايق والثواني لرقمين ([[05]] و [[07]]) ويظهر الساعات صفر.
- مفيش [[hours]] في الـ object، فالـ ٣ التانيين مكتبوهاش.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[fromSeconds(total)]] بتحوّل ثواني لـ [[{ hours, minutes, seconds }]] (وبترمي [[RangeError]] للسالب والكسر)، واطبع طول الفيديو بـ [["long"]] بالعربي وبـ [["digital"]] من غير ساعات لو أقل من ساعة. جرّبها على 3780 و 125 و 59 و 7322 و -5 (من قسم ٢ و ٣ في الشرح).`, done: R`3780 بقت «ساعة و٣ دقائق» و [[1:03:00]]، و 125 «دقيقتان و٥ ثوان» و [[02:05]]، و 7322 «ساعتان، ودقيقتان، وثانيتان»، و -5 رمت رسالة واضحة.`, sol: R`~~~js from-seconds.js
function fromSeconds(total) {
  if (!Number.isInteger(total) || total < 0) throw new RangeError("الثواني لازم رقم صحيح موجب: " + total);
  return { hours: Math.floor(total / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
}
const long = new Intl.DurationFormat("ar-EG", { style: "long" });
const digital = new Intl.DurationFormat("en", { style: "digital", hoursDisplay: "auto" });
for (const s of [3780, 125, 59, 7322]) {
  const d = fromSeconds(s);
  console.log(String(s).padStart(5), JSON.stringify(d), "|", long.format(d), "|", digital.format(d));
}
try { fromSeconds(-5); } catch (e) { console.log(e.name + ": " + e.message); }
~~~

~~~text الناتج
 3780 {"hours":1,"minutes":3,"seconds":0} | ساعة و٣ دقائق | 1:03:00
  125 {"hours":0,"minutes":2,"seconds":5} | دقيقتان و٥ ثوان | 02:05
   59 {"hours":0,"minutes":0,"seconds":59} | ٥٩ ثانية | 00:59
 7322 {"hours":2,"minutes":2,"seconds":2} | ساعتان، ودقيقتان، وثانيتان | 2:02:02
RangeError: الثواني لازم رقم صحيح موجب: -5
~~~

- **[[%]]** باقي القسمة: [[3780 % 3600]] = 180 ثانية = ٣ دقايق.
- **الأصفار مش مشكلة:** [["long"]] بيخفي الوحدات الصفر لوحده ([[hoursDisplay: "auto"]])، فـ 125 طلعت من غير «٠ ساعة».
- **[[hoursDisplay: "auto"]] مع [["digital"]]** خلى الفيديو القصير «02:05» والطويل «1:03:00».
- «٥ ثوان» (من غير ياء) شكل CLDR الفصيح لجمع «ثانية» مع ٣–١٠.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[formatDuration(d, locale)]] بتستخدم [[Intl.DurationFormat]] لو موجود، وإلا [[NumberFormat]] بـ [[style: "unit"]] لكل وحدة + [[ListFormat]] بـ [[type: "unit"]]. اختبر البديل بإنك تمسح [[Intl.DurationFormat]] مؤقتًا وترجّعه (من قسم ٨ في الشرح).`, done: R`[[{ hours: 1, minutes: 30 }]] طلعت «ساعة و٣٠ دقيقة» و «1 hour, 30 minutes» بالطريقتين، والـ [[Intl.DurationFormat]] رجع بعد التجربة.`, sol: R`~~~js duration-fallback.js
const UNITS = ["hours", "minutes", "seconds"];
function formatDuration(d, locale) {
  if (typeof Intl.DurationFormat === "function") return new Intl.DurationFormat(locale, { style: "long" }).format(d);
  const parts = UNITS.filter(u => d[u]).map(u =>
    new Intl.NumberFormat(locale, { style: "unit", unit: u.slice(0, -1), unitDisplay: "long" }).format(d[u]));
  return new Intl.ListFormat(locale, { type: "unit", style: "long" }).format(parts);
}
const d = { hours: 1, minutes: 30 };
console.log("native  :", formatDuration(d, "ar-EG"), "|", formatDuration(d, "en"));
const saved = Intl.DurationFormat;
delete Intl.DurationFormat; // نجرّب كأن المتصفح قديم
console.log("fallback:", formatDuration(d, "ar-EG"), "|", formatDuration(d, "en"));
Intl.DurationFormat = saved;
~~~

~~~text الناتج
native  : ساعة و٣٠ دقيقة | 1 hour, 30 minutes
fallback: ساعة و٣٠ دقيقة | 1 hour, 30 minutes
~~~

- **[[u.slice(0, -1)]]**: [["hours"]] بقت [["hour"]]: [[NumberFormat]] بياخد اسم الوحدة مفرد، و [[DurationFormat]] جمع.
- **[[filter(u => d[u])]]**: بيشيل الوحدات الصفر زي [[DurationFormat]].
- **[[delete Intl.DurationFormat]]** طريقة سريعة تختبر البديل في نفس البرنامج. في اختبار حقيقي اعمل الدالة تاخد الـ constructor كباراميتر بدل ما تلعب في الـ global.
- البديل مش هيعرف [["digital"]] ولا المثنى في كل اللغات بنفس الدقة، بس للعربي والإنجليزي في [["long"]] طابق.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** شريط رفع ملف بيكتب [["باقي " + left.format(remaining)]]، ولما الرفع يخلص بيبان «باقي » لوحدها. ليه؟ جرّب [[secondsDisplay: "always"]] كحل وشوف مشكلته، وبعدين صلّحها صح (من قسم ٤ في الشرح).`, done: R`عرفت إن [[{ minutes: 0, seconds: 0 }]] بيرجّع [[""]]، وإن [["always"]] بيطلع «دقيقتان و٠ ثانية» في نص الرفع، والحل النهائي بيطلع «دقيقتان» و «٩ ثوان» و «خلاص، الرفع خلص».`, sol: R`~~~js remaining.js
const left = new Intl.DurationFormat("ar-EG", { style: "long" });
console.log(JSON.stringify("باقي " + left.format({ minutes: 0, seconds: 0 })));
const always = new Intl.DurationFormat("ar-EG", { style: "long", secondsDisplay: "always" });
console.log(JSON.stringify(always.format({ minutes: 2, seconds: 0 })));
// الحل: الفاضي ليه رسالة لوحده، والباقي زي ما هو
const remaining = d => left.format(d) || "خلاص، الرفع خلص";
console.log([{ minutes: 2, seconds: 0 }, { minutes: 0, seconds: 9 }, { minutes: 0, seconds: 0 }].map(d => JSON.stringify(remaining(d))).join(" | "));
~~~

~~~text الناتج
"باقي "
"دقيقتان و٠ ثانية"
"دقيقتان" | "٩ ثوان" | "خلاص، الرفع خلص"
~~~

- **الصفر [[""]]**: كل الوحدات [["auto"]] وكلها صفر، فمفيش حاجة تتكتب. وده متطابق مع الـ spec (Chrome نفس الناتج).
- **[["always"]] مش حل:** بيظهر «و٠ ثانية» في كل مرة الثواني فيها صفر.
- **[[||]]**: النص الفاضي falsy، فـ [[left.format(d) || "..."]] بياخد الرسالة البديلة بس لما الناتج فاضي. وكمان الجملة نفسها اتغيّرت («خلاص» مش «باقي خلاص»): الحالة الخاصة محتاجة جملة خاصة.` },
          ],
          ref: [
            { t: "MDN: Intl.DurationFormat", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat" },
            { t: "MDN: Intl.DurationFormat.prototype.format()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/format" },
            { t: "MDN: Intl.DurationFormat.prototype.formatToParts()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/formatToParts" },
            { t: "MDN: Intl.DurationFormat.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/resolvedOptions" },
            { t: "MDN: Intl.DurationFormat.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/supportedLocalesOf" },
          ],
          pre: ["js/Intl.ListFormat", { to: "js/date-fns و dayjs و Temporal", why: R`[[Temporal.Duration]] نفس شكل الـ object ده، و [[DurationFormat]] بيقبله` }],
          deep: {
            why: R`المدد في كل حتة (فيديو، توصيل، اشتراك، رفع)، والعربي فيها صعب: «ساعة» و «ساعتان» و «٣ ساعات» و «١١ ساعة»، والفواصل والواو. قبل [[DurationFormat]] الناس كانت بتكتب [[h + " س " + m + " د"]] وتنسى المثنى والجمع، أو تستخدم مكتبة كاملة عشان سطر.`,
            how: R`بيتأكد إن الـ object مدة صالحة (نفس قواعد [[Temporal.Duration]]: أرقام صحيحة، نفس الإشارة، مفتاح واحد على الأقل)، وبعدين لكل وحدة مش مخفية بيستخدم [[NumberFormat]] بـ [[style: "unit"]] من جوه (عشان كده الجمع صح)، ويرص الوحدات بـ [[ListFormat]] بـ [[type: "unit"]]. و [["digital"]] بيستخدم فاصل الوقت بتاع اللغة.`,
            when: R`أي مدة بتتعرض. ولو المدة جاية كفرق تاريخين: احسب الفرق بالـ ms، وحوّل لوحدات، وبعدين format. ولو محتاج «من قد إيه» («قبل ٣ أيام») ده [[RelativeTimeFormat]] مش [[DurationFormat]].`,
            mistakes: R`تفتكره بيوزّع ([[{ minutes: 125 }]]). كسور. مفاتيح مفرد ([[hour]]). [[numberingSystem]] كـ option. الصفر بيدّي [[""]]. تستخدمه من غير ما تتأكد إنه موجود في المتصفحات اللي بتدعمها.`,
          },
        },
        {
          cmd: "Intl.RelativeTimeFormat: formatToParts و resolvedOptions",
          title: "«قبل ٣ أيام» بالرقم تقيل، وتعرف الـ formatter اختار إيه، وفخ الـ style القصير في العربي",
          desc: R`درس «Intl.RelativeTimeFormat» علّمك [[format(value, unit)]] و [[numeric: "auto"]] ودالة [[timeAgo]]. هنا الباقي:
• [[formatToParts(value, unit)]]: الجملة حتت، والرقم عليه [[unit]]، فتقدر تخلي الرقم بس تقيل («قبل **٣** أيام»). ومع [["auto"]] و «أمس» مفيش رقم أصلًا.
• [[resolvedOptions()]]: اللغة و [[style]] و [[numeric]] و [[numberingSystem]] اللي اتطبقوا.
• [[Intl.RelativeTimeFormat.supportedLocalesOf()]].
• **فخ:** [[style: "short"]] بالعربي بيكتب الماضي «خلال ٣ أشهر» (يعني المستقبل!) في Node 24.22 و Chrome 157. استخدم [["long"]] للعربي.`,
          example: R`const rtf = new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" });
console.log(rtf.format(-1, "day"), "|", rtf.format(-2, "day"), "|", rtf.format(-11, "day"), "|", rtf.format(0, "second"));
console.log(rtf.formatToParts(-3, "day"));
console.log(rtf.formatToParts(-1, "day"));
console.log(rtf.resolvedOptions());
console.log(["long", "short", "narrow"].map(style => new Intl.RelativeTimeFormat("ar-EG", { style }).format(-3, "month")));
console.log(Intl.RelativeTimeFormat.supportedLocalesOf(["ar-EG", "zz"]));`,
          try: R`اعمل formatter بـ [["ar-EG"]] و [[numberingSystem: "latn"]] واطبع [[format(-3, "day")]]: الأرقام بقت لاتيني؟ وبعدين قارن [[format(0, "day")]] و [[format(-0, "day")]] بالإنجليزي مرة بالافتراضي ومرة بـ [[numeric: "auto"]].`,
          sol: R`~~~js try-rtf.js
console.log(new Intl.RelativeTimeFormat("ar-EG", { numberingSystem: "latn" }).format(-3, "day"));
const def = new Intl.RelativeTimeFormat("en");
const auto = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log([def.format(0, "day"), def.format(-0, "day"), auto.format(0, "day"), auto.format(-0, "day")].join(" | "));
~~~

~~~text الناتج (Node 24.22)
قبل 3 أيام
in 0 days | 0 days ago | today | today
~~~

- هنا [[numberingSystem]] كـ option **شغال** (عكس [[DurationFormat]] اللي اتشرح في درسه).
- **[[-0]]** بيتعامل كماضي: «0 days ago»، و [[0]] مستقبل: «in 0 days». مع [["auto"]] الاتنين «today». ده سبب تاني تستخدم [["auto"]]، لأن [[Math.round(-0.3)]] = [[-0]].`,
          teach: R`## الفكرة

[[format]] بيكفي غالبًا. بس لو التصميم عايز الرقم بلون أو حجم تاني، أو عايز تعرف إيه اللي اتطبق، أو بتكتب العربي بـ style قصير، محتاج الحاجات اللي في الدرس ده. الناتج من Node 24.22، والفخ اتأكد في Chrome 157.

---

## ١. [[RelativeTimeFormat.prototype.format]]: حاجات متقالتش

~~~text الناتج: سطر ٢ في المثال
أمس | أول أمس | قبل ١١ يومًا | الآن
~~~

- **الوحدات:** [["second"]] و [["minute"]] و [["hour"]] و [["day"]] و [["week"]] و [["month"]] و [["quarter"]] و [["year"]]، والجمع مقبول ([["days"]]). و [[quarter]] = ربع سنة («next quarter»).
- **الوحدة الغلط:** [[format(1, "fortnight")]] بيرمي [[RangeError: Invalid unit argument for Intl.RelativeTimeFormat.prototype.format() 'fortnight']].
- **الرقم:** [[NaN]] بيرمي [[RangeError: Value need to be finite number for Intl.RelativeTimeFormat.prototype.format()]]، والنص [["2"]] بيتحوّل لرقم.
- **الجمع العربي** لوحده: «قبل ٣ أيام» و «قبل ١١ يومًا» (من [[PluralRules]] من جوه).
- **[[0, "second"]]** مع [["auto"]] = «الآن».

---

## ٢. [[RelativeTimeFormat.prototype.formatToParts]]

~~~text الناتج: سطور ٣ و ٤ في المثال
[
  { type: 'literal', value: 'قبل ' },
  { type: 'integer', value: '٣', unit: 'day' },
  { type: 'literal', value: ' أيام' }
]
[ { type: 'literal', value: 'أمس' } ]
~~~

- **الرقم** بيتقسم زي [[NumberFormat]]: [[integer]] و [[group]] و [[decimal]] و [[fraction]]، وكلهم عليهم [[unit]]. يعني [[formatToParts(-1234.5, "hour")]] بالإنجليزي فيه [[integer:1]] و [[group:,]] و [[integer:234]] و [[decimal:.]] و [[fraction:5]]، وبعدهم [[literal]] « hours ago».
- **الكلام حوالين الرقم** [[literal]] من غير [[unit]].
- **«أمس»** حتة واحدة [[literal]]: مع [["auto"]] لما فيه كلمة خاصة، مفيش رقم. فكودك لازم يشتغل لو مفيش [[integer]] خالص (تمرين ٢).

---

## ٣. [[RelativeTimeFormat.prototype.resolvedOptions]] و [[Intl.RelativeTimeFormat.supportedLocalesOf]]

~~~text الناتج: سطر ٥ في المثال
{
  locale: 'ar-EG',
  style: 'long',
  numeric: 'auto',
  numberingSystem: 'arab'
}
~~~

٤ حاجات: اللغة، والـ style ([["long"]] افتراضي)، و [[numeric]] ([["always"]] افتراضي)، ونظام الأرقام. و [[Intl.RelativeTimeFormat.supportedLocalesOf(["ar-EG", "en", "zz"])]] = [[[ 'ar-EG', 'en' ]]].

---

## ٤. الفخ: [[style: "short"]] بالعربي

~~~text الناتج: سطر ٦ في المثال، الشهور (-3)
[ 'قبل ٣ أشهر', 'خلال ٣ أشهر', 'قبل ٣ أشهر' ]
~~~

| الـ style | [[format(-3, "month")]] | [[format(3, "month")]] | [[format(-3, "day")]] |
|---|---|---|---|
| [["long"]] | قبل ٣ أشهر | خلال ٣ أشهر | قبل ٣ أيام |
| [["short"]] | **خلال ٣ أشهر** | خلال ٣ أشهر | قبل ٣ أيام |
| [["narrow"]] | قبل ٣ أشهر | خلال ٣ أشهر | قبل ٣ أيام |

[["short"]] للشهور في الماضي بيطلع كلام المستقبل. اتأكد في Node 24.22 و Chrome 157 (الاتنين بنفس بيانات CLDR). ده غلط في البيانات نفسها مش في كودك، ومش في كل الوحدات (الأيام سليمة)، فممكن يعدّي من اختبار سريع. الحل: [["long"]] للعربي (هو أصلًا مش أطول كتير)، واختبار بيلف على كل الوحدات والـ styles (تمرين ٣) يمسك أي حاجة زي دي لما البيانات تتحدّث.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| الرقم بلون أو حجم | [[formatToParts]] والحتت اللي عليها [[unit]] |
| تعرف اللي اتطبق | [[resolvedOptions()]] |
| أرقام لاتيني | [[numberingSystem: "latn"]] (شغال هنا) |
| العربي | [["long"]]، لأن [["short"]] فيه غلط في الماضي |
| [[-0]] | [[numeric: "auto"]] |

اللي ميتلخبطش: مع [["auto"]] ممكن ميبقاش فيه رقم خالص، و [[-0]] ماضي، و [["short"]] بالعربي متتوثقش فيه.`,
          lines: [
            R`formatter عربي بـ [[numeric: "auto"]] عشان «أمس» و «أول أمس» بدل «قبل يوم واحد»`,
            R`«أمس» و «أول أمس» و «قبل ١١ يومًا» (المفرد المنصوب)، و [[0]] ثانية = «الآن»`,
            R`[[formatToParts]] لـ ٣ أيام: [[literal]] «قبل » و [[integer]] ٣ عليه [[unit: 'day']] و [[literal]] « أيام»`,
            R`[[formatToParts]] لـ «أمس»: حتة واحدة [[literal]] ومفيش رقم خالص`,
            R`[[resolvedOptions()]]: اللغة والـ style والـ numeric ونظام الأرقام [[arab]]`,
            R`نفس [[-3]] شهور بالـ ٣ styles: [["short"]] طلّع «خلال» (مستقبل) بدل «قبل»`,
            R`[[supportedLocalesOf]] بتسأل من غير ما تعمل formatter: رجّعت [["ar-EG"]] اللي ليها بيانات وشالت [["zz"]] المش معروفة`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بالإنجليزي، [[format(0, "day")]] و [[format(-0, "day")]] بالافتراضي وبـ [[numeric: "auto"]]، و [[format(-1, "days")]] (بالجمع) بالافتراضي. اكتب الخمسة قبل التشغيل.`, done: R`الخمسة صح، وعرفت إن [[-0]] بيتكتب «0 days ago» وإن [["days"]] مقبولة.`, sol: R`~~~js zero.js
const def = new Intl.RelativeTimeFormat("en");
const auto = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
console.log([def.format(0, "day"), def.format(-0, "day"), auto.format(0, "day"), auto.format(-0, "day"), def.format(-1, "days")].join(" | "));
~~~

~~~text الناتج
in 0 days | 0 days ago | today | today | 1 day ago
~~~

- [[Object.is(-0, 0)]] = [[false]]، و [[RelativeTimeFormat]] بيبص على الإشارة نفسها.
- [["days"]] و [["day"]] واحد، والناتج بيتبع الرقم («1 day»).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[agoHtml(value, unit)]] بترجّع الجملة والرقم بس جوه [[<b>]] (كل حتة عليها [[unit]] ونوعها رقمي). جرّبها على [[-3, "day"]] و [[-1, "day"]] و [[-1234, "hour"]] و [[2, "week"]] بـ [["ar-EG"]] و [[numeric: "auto"]] (من قسم ٢ في الشرح).`, done: R`«قبل <b>٣</b> أيام» و «أمس» من غير [[<b>]] ولا error، والـ ١٢٣٤ ساعة أرقامها وفاصلها جوه [[<b>]]، و «خلال أسبوعين» من غير رقم.`, sol: R`~~~js ago-html.js
const rtf = new Intl.RelativeTimeFormat("ar-EG", { numeric: "auto" });
const NUMERIC = new Set(["integer", "group", "decimal", "fraction"]);
function agoHtml(value, unit) {
  return rtf.formatToParts(value, unit).map(p => (NUMERIC.has(p.type) ? "<b>" + p.value + "</b>" : p.value)).join("");
}
console.log(agoHtml(-3, "day"), "|", agoHtml(-1, "day"), "|", agoHtml(-1234, "hour"), "|", agoHtml(2, "week"));
~~~

~~~text الناتج
قبل <b>٣</b> أيام | أمس | قبل <b>١</b><b>٬</b><b>٢٣٤</b> ساعة | خلال أسبوعين
~~~

- **«أمس» و «خلال أسبوعين»** مفيهمش أجزاء رقمية: «أسبوعين» مثنى من غير رقم، فالكود اشتغل عادي لأنه بيلف على اللي موجود بس.
- **[[group]] جوه الـ [[<b>]]** عشان «١٬٢٣٤» يبان رقم واحد (ممكن تجمّع الأجزاء اللي جنب بعض في [[<b>]] واحد زي مشروع «نطاق السعر»).
- لو هتحطها في [[innerHTML]]، الحتت كلها من [[Intl]] نفسه، فمفيش نص من يوزر محتاج escape هنا.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[style.test.js]] بـ [[node:test]]: لكل style من التلاتة، [[format(-3, unit)]] بالعربي لـ [["day"]] و [["week"]] و [["month"]] و [["year"]] لازم يبدأ بـ «قبل ». شغّله: أنهي style بيقع، وفي أنهي وحدة؟ (من قسم ٤ في الشرح).`, done: R`الاختبار وقع في [["short"]] بس، والرسالة بتقول [[month: خلال ٣ أشهر]]، و [["long"]] و [["narrow"]] عدّوا.`, sol: R`~~~js style.test.js
const test = require("node:test");
const assert = require("node:assert/strict");
// «قبل» للماضي في كل style؟ لو لأ، يبقى style ده مينفعش للعربي
for (const style of ["long", "short", "narrow"]) {
  test("ar-EG " + style + ": الماضي بيبدأ بـ «قبل»", () => {
    const f = new Intl.RelativeTimeFormat("ar-EG", { style });
    for (const unit of ["day", "week", "month", "year"]) {
      assert.match(f.format(-3, unit), /^قبل /, unit + ": " + f.format(-3, unit));
    }
  });
}
~~~

~~~text الناتج: node --test style.test.js (السطور المهمة)
✔ ar-EG long: الماضي بيبدأ بـ «قبل» (35.8963ms)
✖ ar-EG short: الماضي بيبدأ بـ «قبل» (1.5275ms)
✔ ar-EG narrow: الماضي بيبدأ بـ «قبل» (0.5722ms)
ℹ pass 2
ℹ fail 1
  AssertionError [ERR_ASSERTION]: month: خلال ٣ أشهر
~~~

- **[[assert.match(text, regex, message)]]**: بيتأكد إن النص بيطابق الـ regex، والرسالة التالتة هي اللي بتظهر لما يقع، فبتعرف الوحدة والنص على طول.
- **اختبار لكل style** عشان تعرف أنهي واحد فيهم بايظ، مش «في حاجة غلط».
- الاختبار ده بيحميك من بيانات CLDR نفسها: لما Node يتحدّث والغلط يتصلح أو يظهر غلط جديد، الـ CI هيقولك.` },
          ],
          ref: [
            { t: "MDN: Intl.RelativeTimeFormat.prototype.format()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format" },
            { t: "MDN: Intl.RelativeTimeFormat.prototype.formatToParts()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts" },
            { t: "MDN: Intl.RelativeTimeFormat.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/resolvedOptions" },
            { t: "MDN: Intl.RelativeTimeFormat.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/supportedLocalesOf" },
          ],
          pre: ["js/Intl.RelativeTimeFormat", "js/Intl.NumberFormat"],
          deep: {
            why: R`«قبل ٣ أيام» في كل تعليق وإشعار ورسالة. والتصميم كتير بيبقى عايز الرقم مميز، أو التطبيق عايز يعرف هو بيكتب بأنهي لغة. والأهم: الغلط في بيانات CLDR نفسها بيحصل، والطريقة الوحيدة تمسكه إنك تختبر الناتج الحقيقي.`,
            how: R`الـ formatter بيختار من CLDR pattern للوحدة والإشارة والفئة («قبل {0} أيام» للماضي و [[few]])، والفئة من [[PluralRules]] داخلي على قيمة الرقم المطلقة، وبعدين بيحط في الـ pattern الرقم متنسّق بـ [[NumberFormat]] داخلي بنفس الـ locale ونظام الأرقام. مع [["auto"]] بيدوّر الأول في جدول تاني على كلمة خاصة للرقم ده بالظبط (أمس، الآن، أول أمس، الأسبوع الماضي)، ولو لقاها بيرجّعها من غير رقم. [[formatToParts]] بيرجّع نفس الحتت قبل ما تتلزق، والرقم مقسوم لأجزائه زي [[NumberFormat.formatToParts]] وعلى كل جزء اسم الوحدة. وغلط زي «خلال» في [["short"]] جاي من الـ pattern نفسه في بيانات CLDR، فكود الـ formatter مش هو اللي بيغلط.`,
            when: R`[[formatToParts]] لما الرقم محتاج تنسيق مختلف. [[resolvedOptions]] للـ debug ولما تبعت إعدادات العرض لجزء تاني من التطبيق. واختبار الـ styles لما تضيف لغة جديدة.`,
            mistakes: R`[["short"]] للعربي. كود بيفترض إن فيه [[integer]] دايمًا. [[-0]] من [[Math.round]] مع [["always"]]. حساب الفرق بالقسمة على [[86400000]] من غير مراعاة اليوم في التقويم (اتشرح في درس [[timeAgo]] ومشروع «جدول الحجوزات»).`,
          },
        },
        {
          cmd: "Intl.Collator: الترتيب و resolvedOptions",
          title: "ترتّب أسامي عربي وملفات فيها أرقام زي ما البني آدم متوقع، وتعرف الـ Collator بيقارن بإيه",
          desc: R`[[sort()]] من غير دالة بيرتّب بأكواد UTF-16: «File1» قبل «file1»، و «file10» قبل «file2»، وكل «أ» قبل كل «ا». [[Intl.Collator]] بيرتّب بقواعد اللغة. درس «toUpperCase و toLocaleUpperCase» استخدم [[compare]] و [[sensitivity: "base"]] للمقارنة؛ هنا الترتيب نفسه وباقي الـ options:
• [[numeric: true]]: «file2» قبل «file10».
• [[caseFirst]]: [["upper"]] أو [["lower"]] أو [["false"]] (الافتراضي).
• [[sensitivity]]: [["base"]] و [["accent"]] و [["case"]] و [["variant"]]، و [[ignorePunctuation]]، و [[usage]] ([["sort"]] أو [["search"]])، و [[collation]] ([["phonebk"]] للألماني مثلًا).
• [[resolvedOptions()]] و [[Intl.Collator.supportedLocalesOf()]].`,
          example: R`const files = ["file10.txt", "file2.txt", "File1.txt", "file1.txt"];
console.log([...files].sort());
console.log([...files].sort(new Intl.Collator("en", { numeric: true }).compare));
console.log([...files].sort(new Intl.Collator("en", { numeric: true, caseFirst: "upper" }).compare));
const names = ["إسراء", "أحمد", "احمد", "آمنة", "ابراهيم", "ياسر", "زياد", "Zeina", "adam"];
console.log(names.sort(new Intl.Collator("ar").compare));
console.log(new Intl.Collator("ar-EG", { sensitivity: "base" }).resolvedOptions());
console.log(Intl.Collator.supportedLocalesOf(["ar-EG", "de-u-co-phonebk", "zz"]));`,
          try: R`رتّب [[["إسراء", "أحمد", "احمد", "آمنة", "ابراهيم", "ياسر", "زياد", "Zeina", "adam"]]] بـ [[sort()]] العادي وبـ [[new Intl.Collator("ar").compare]] وبـ [[new Intl.Collator("en").compare]]. فين الإنجليزي في كل مرة؟ وأنهي ترتيب «أحمد» و «احمد» جنب بعض فيه؟`,
          sol: R`~~~js sort-names.js
const names = ["إسراء", "أحمد", "احمد", "آمنة", "ابراهيم", "ياسر", "زياد", "Zeina", "adam"];
console.log([...names].sort().join(" "));
console.log([...names].sort(new Intl.Collator("ar").compare).join(" "));
console.log([...names].sort(new Intl.Collator("en").compare).join(" "));
~~~

~~~text الناتج (Node 24.22)
Zeina adam آمنة أحمد إسراء ابراهيم احمد زياد ياسر
آمنة ابراهيم أحمد احمد إسراء زياد ياسر adam Zeina
adam Zeina آمنة أحمد إسراء ابراهيم احمد زياد ياسر
~~~

- **[[sort()]]**: الكبير قبل الصغير (Z = 90 و a = 97)، والإنجليزي قبل العربي، و آ و أ و إ و ا أربع مجموعات منفصلة.
- **[["ar"]]**: العربي الأول والإنجليزي بعده، و «أحمد» جنب «احمد» (الهمزة فرق صغير).
- **[["en"]]**: الإنجليزي الأول، والعربي بعده بس **بقواعد مش عربي**: «أحمد» بعيد عن «احمد» و «إسراء» قبل «ابراهيم» (رجع يفرّق أشكال الألف). يعني الـ locale بيحدد مين الأول بين الكتابات، وكمان قواعد كل كتابة. أي لستة فيها عربي: [["ar"]].`,
          teach: R`## الفكرة

[[compare(a, b)]] بترجّع رقم سالب لو [[a]] قبل [[b]]، وموجب لو بعده، وصفر لو «زي بعض». و [[sort]] بتاخدها مباشرة: [[list.sort(collator.compare)]] (الـ [[compare]] مربوطة بالـ collator زي [[format]]). الناتج من Node 24.22، وترتيب العربي اتأكد في Chrome 157.

---

## ١. [[numeric]] و [[caseFirst]]

~~~text الناتج: سطور ٢ لـ ٤ في المثال
[ 'File1.txt', 'file1.txt', 'file10.txt', 'file2.txt' ]
[ 'file1.txt', 'File1.txt', 'file2.txt', 'file10.txt' ]
[ 'File1.txt', 'file1.txt', 'file2.txt', 'file10.txt' ]
~~~

- **[[sort()]]**: «file10» قبل «file2» لأنه بيقارن حرف حرف و «1» قبل «2».
- **[[numeric: true]]**: أي أرقام جوه النص بتتقارن كأرقام. ده «الترتيب الطبيعي» اللي مستكشف الملفات بيعمله.
- **[[caseFirst: "upper"]]**: لو الفرق الوحيد الحروف الكبيرة، الكبير الأول. والافتراضي [["false"]] (نص، مش boolean) = قواعد اللغة (الصغير الأول في الإنجليزي).

---

## ٢. [[sensitivity]]: إيه اللي يفرق

~~~text الناتج: compare على ٤ أزواج
           أحمد/احمد  a/A  a/á  مُحَمَّد/محمد
base         0         0    0     0
accent      -1         0   -1     0
case         0        -1    0     0
variant     -1        -1   -1     1
~~~

| الـ sensitivity | بيعتبر مختلف | استخدامه |
|---|---|---|
| [["base"]] | الحروف المختلفة بس | البحث: «احمد» يلاقي «أحمد» و «Ahmed» يلاقي «ahmed» |
| [["accent"]] | + العلامات والهمزات | لما «أ» و «ا» يفرقوا والكبير والصغير لأ |
| [["case"]] | + الكبير والصغير | نادر |
| [["variant"]] | كل حاجة (الافتراضي لـ [[usage: "sort"]]) | الترتيب: بيدّي ترتيب ثابت للكلمات اللي شبه بعض |

- **التشكيل** ([[مُحَمَّد]] و [[محمد]]) زي بعض في كل حاجة غير [["variant"]].
- **[[ignorePunctuation: true]]**: بيتجاهل العلامات والمسافات: [[compare("re-do", "redo")]] بقت [[0]] بدل [[-1]]، و «عبد-الله» زي «عبد الله».
- **[[usage: "search"]]** مع [["base"]] للمقارنة في البحث، و [[usage: "sort"]] (الافتراضي) للترتيب.
- **ة و ه حرفين مختلفين** حتى في [["base"]]: [[compare("شاشة", "شاشه")]] = [[-1]]. أما ى و ي فزي بعض في [["base"]] ([[compare("هدى", "هدي")]] = [[0]]). لو عايزهم واحد، نضّف قبل المقارنة ([[searchKey]] في مشروع «بحث في أسماء العملاء» في وحدة «النصوص بعمق»).

---

## ٣. [[collation]]: قواعد ترتيب تانية لنفس اللغة

~~~text الناتج: ["Müller", "Mueller", "Muller"]
de                Mueller Muller Müller
de-u-co-phonebk   Mueller Müller Muller
~~~

الألماني العادي بيعتبر [[ü]] زي [[u]] بعلامة، ودليل التليفونات الألماني بيعتبرها [[ue]]. نفس اللغة وترتيبين، والاختيار بـ [[-u-co-phonebk]] أو [[{ collation: "phonebk" }]]. والمتاح لكل لغة من [[new Intl.Locale("de").getCollations()]] = [[[ 'emoji', 'eor', 'phonebk' ]]]، والعربي [[[ 'compat', 'emoji', 'eor' ]]].

---

## ٤. [[Collator.prototype.resolvedOptions]]

~~~text الناتج: سطر ٦ في المثال
{
  locale: 'ar',
  usage: 'sort',
  sensitivity: 'base',
  ignorePunctuation: false,
  collation: 'default',
  numeric: false,
  caseFirst: 'false'
}
~~~

- **[[locale: 'ar']] مش [['ar-EG']]**: قواعد الترتيب واحدة لكل العربي، فالتفاوض نزل للغة (Node و Chrome).
- **[[caseFirst: 'false']]** نص [["false"]] مش [[false]]: قارن بـ [[=== "false"]].
- **[[collation: 'default']]** لو مطلبتش حاجة.

---

## ٥. [[Intl.Collator.supportedLocalesOf]]

[[Intl.Collator.supportedLocalesOf(["ar-EG", "de-u-co-phonebk", "zz"])]] = [[[ 'ar-EG', 'de-u-co-phonebk' ]]]: الـ tags اللي ليها قواعد ترتيب، بالـ extension زي ما بعتها.

---

## ٦. الأداء

زي أي formatter: [[new Intl.Collator]] مرة واحدة. و [[a.localeCompare(b, "ar", options)]] بيعمل collator جديد كل نداء: اتقاس في درس «toUpperCase و toLocaleUpperCase» حوالي ٤٠ مرة أبطأ على ٢٠٠ ألف مقارنة. في [[sort]] على لستة كبيرة الفرق بيبان.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| ترتيب أسامي عربي | [[list.sort(new Intl.Collator("ar").compare)]] |
| «file2» قبل «file10» | [[{ numeric: true }]] |
| البحث من غير همزة ولا حالة حروف | [[{ sensitivity: "base", usage: "search" }]] |
| تتجاهل الشرط والمسافات | [[{ ignorePunctuation: true }]] |
| قواعد ترتيب تانية | [[collation]] من [[getCollations()]] |

اللي ميتلخبطش: [[sort()]] من غير دالة مش ترتيب لغوي، والـ locale بيحدد أنهي كتابة الأول، و ة/ه مختلفين حتى في [["base"]].`,
          lines: [
            R`٤ ملفات فيها كبير وصغير وأرقام بعدد خانات مختلف`,
            R`[[sort()]] العادي: [[File1]] الأول (الكبير كوده أصغر) و [[file10]] قبل [[file2]]`,
            R`[[numeric: true]] رتّب الأرقام كأرقام: ١ ثم ٢ ثم ١٠، والصغير قبل الكبير`,
            R`[[caseFirst: "upper"]] حط [[File1.txt]] قبل [[file1.txt]] لما الفرق الوحيد حالة الحرف`,
            R`أسامي عربي بأشكال الألف والهمزة، واسمين إنجليزي واحد كبير وواحد صغير`,
            R`Collator عربي: العربي الأول بترتيب القاموس، و «أحمد» جنب «احمد»، والإنجليزي في الآخر`,
            R`[[resolvedOptions()]]: اللغة نزلت لـ [[ar]]، و [[sensitivity]] اللي طلبناها [[base]]`,
            R`[[supportedLocalesOf]] رجّعت [["ar-EG"]] و [["de-u-co-phonebk"]] بالـ extension، وشالت [["zz"]]`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بـ [[new Intl.Collator("ar", { sensitivity })]] لكل sensitivity من الأربعة: [[compare]] هترجّع إيه لـ «أحمد»/«احمد» و [["a"]]/[["A"]] و [["a"]]/[["á"]] و «مُحَمَّد»/«محمد»؟ اكتب الـ ١٦ رقم (سالب أو صفر أو موجب) قبل التشغيل (من قسم ٢ في الشرح).`, done: R`الجدول بتاعك طابق التشغيل في ١٢ خانة على الأقل، وعرفت ليه التشكيل صفر في الكل إلا [["variant"]].`, sol: R`~~~js sensitivity.js
const pairs = [["أحمد", "احمد"], ["a", "A"], ["a", "á"], ["مُحَمَّد", "محمد"]];
for (const sensitivity of ["base", "accent", "case", "variant"]) {
  const c = new Intl.Collator("ar", { sensitivity });
  console.log(sensitivity.padEnd(8), pairs.map(([x, y]) => c.compare(x, y)).join(" "));
}
~~~

~~~text الناتج
base     0 0 0 0
accent   -1 0 -1 0
case     0 -1 0 0
variant  -1 -1 -1 1
~~~

- **الهمزة** بتتعامل زي علامة (accent): بتفرق في [["accent"]] و [["variant"]].
- **التشكيل** بيفرق في [["variant"]] بس، وهنا موجب: «مُحَمَّد» بعد «محمد».
- **[["case"]]** = الحروف الأساسية + حالة الحرف، من غير العلامات، فـ á زي a.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[sortProducts(list)]] بترجّع نسخة مترتبة بالاسم ترتيب طبيعي (الأرقام كأرقام، ومن غير ما الحالة تفرق)، ولو الاسمين زي بعض الأرخص الأول. من غير ما تغيّر اللستة الأصلية (من قسم ١ و ٢ في الشرح).`, done: R`«شاشة 9» قبل «شاشة 27» قبل «شاشة 100»، و «Mouse 2» قبل «mouse 10»، واللستة الأصلية متغيرتش، والاختبارات عدّت.`, sol: R`~~~js sort-products.js
const natural = new Intl.Collator("ar", { numeric: true, sensitivity: "base" });
function sortProducts(list) {
  return [...list].sort((a, b) => natural.compare(a.name, b.name) || a.price - b.price);
}
const products = [{ name: "شاشة 27", price: 9000 }, { name: "شاشة 9", price: 2500 }, { name: "شاشة 100", price: 50000 }, { name: "Mouse 2", price: 300 }, { name: "mouse 10", price: 450 }, { name: "شاشه 9", price: 2400 }];
console.log(sortProducts(products).map(p => p.name + " (" + p.price + ")").join(" | "));
console.log(products.map(p => p.name).sort().join(" | "));
~~~

~~~text الناتج
شاشة 9 (2500) | شاشة 27 (9000) | شاشة 100 (50000) | شاشه 9 (2400) | Mouse 2 (300) | mouse 10 (450)
Mouse 2 | mouse 10 | شاشة 100 | شاشة 27 | شاشة 9 | شاشه 9
~~~

- **[[[...list]]]** نسخة، لأن [[sort]] بيغيّر الـ array نفسه (أو استخدم [[toSorted]]).
- **[[|| a.price - b.price]]**: لو [[compare]] رجّعت صفر (نفس الاسم)، [[||]] بتروح للسعر.
- **«شاشه 9» بعد «شاشة 100»**: ة و ه حرفين مختلفين حتى في [["base"]]، فالاسمين مش «زي بعض». لو المنتجات جاية من إدخال يدوي، نضّف الاسم الأول.
- **[[sort()]] العادي** (السطر التاني): الإنجليزي الأول، و ١٠٠ قبل ٢٧ قبل ٩.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[dedupeNames(names)]] بتشيل الأسامي المكررة لو هي «نفس الاسم» من غير همزة ولا تشكيل ولا حالة حروف ولا شرطة، وبتسيب أول ظهور. جرّبها على [["أحمد سامي"]] و [["احمد سامي"]] و [["إسراء"]] و [["اسراء"]] و [["Sara"]] و [["sara"]] و «سارة» و «مُحَمَّد» و «محمد» و [["عبد-الله"]] و [["عبد الله"]] (من قسم ٢ في الشرح).`, done: R`فضلوا ٦ أسامي: «أحمد سامي» و «إسراء» و «Sara» و «سارة» و «مُحَمَّد» و «عبد-الله»، و «Sara» و «سارة» الاتنين فضلوا لأنهم كتابتين مختلفين.`, sol: R`~~~js dedupe.js
const same = new Intl.Collator("ar", { sensitivity: "base", ignorePunctuation: true });
function dedupeNames(names) {
  const kept = [];
  for (const n of names) if (!kept.some(k => same.compare(k, n) === 0)) kept.push(n);
  return kept;
}
console.log(dedupeNames(["أحمد سامي", "احمد سامي", "إسراء", "اسراء", "Sara", "sara", "سارة", "مُحَمَّد", "محمد", "عبد-الله", "عبد الله"]));
~~~

~~~text الناتج
[ 'أحمد سامي', 'إسراء', 'Sara', 'سارة', 'مُحَمَّد', 'عبد-الله' ]
~~~

- **[[sensitivity: "base"]]** شال الهمزة والتشكيل والحالة، و **[[ignorePunctuation]]** شال الشرطة والمسافة.
- **[[kept.some(...)]]** بيقارن كل اسم بكل اللي فات: O(n²). لـ ١٠٠ اسم مفيش مشكلة، ولـ ١٠٠ ألف اعمل «مفتاح» لكل اسم (زي [[searchKey]]) وحطه في [[Set]].
- مش كل «زي بعض» تكرار حقيقي: ممكن «أحمد سامي» و «احمد سامي» شخصين. في الشغل الحقيقي ده اقتراح للمراجعة، مش مسح أوتوماتيك.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من صفحة [[Intl.Collator]] على MDN: إيه [[-u-co-phonebk]] و [[-u-kn]]؟ اطبع [[resolvedOptions()]] لـ [[new Intl.Collator("de-u-co-phonebk-kn")]]، ورتّب [[["Müller", "Mueller", "Muller", "Mzik"]]] بـ [["de"]] وبالـ collator ده، واطبع [[getCollations()]] للعربي والألماني (من قسم ٣ و ٤ في الشرح).`, done: R`[[collation: 'phonebk']] و [[numeric: true]] في الناتج، و «Müller» اتنقلت بعد «Mueller» في الـ phonebk، وعرفت إن الاختيارات المتاحة بتختلف بين اللغتين.`, sol: R`~~~js phonebook.js
const c = new Intl.Collator("de-u-co-phonebk-kn");
console.log(c.resolvedOptions());
const names = ["Müller", "Mueller", "Muller", "Mzik"];
console.log([...names].sort(new Intl.Collator("de").compare).join(" "), "|", [...names].sort(c.compare).join(" "));
console.log(new Intl.Locale("ar").getCollations(), new Intl.Locale("de").getCollations());
~~~

~~~text الناتج
{
  locale: 'de-u-co-phonebk-kn',
  usage: 'sort',
  sensitivity: 'variant',
  ignorePunctuation: false,
  collation: 'phonebk',
  numeric: true,
  caseFirst: 'false'
}
Mueller Muller Müller Mzik | Mueller Müller Muller Mzik
[ 'compat', 'emoji', 'eor' ] [ 'emoji', 'eor', 'phonebk' ]
~~~

**الإجابة النموذجية:** [[co]] = collation (نوع قواعد الترتيب)، و [[phonebk]] قواعد دليل التليفون الألماني اللي بتعامل [[ü]] كأنها [[ue]]، فـ «Müller» بقت جنب «Mueller». و [[kn]] = numeric (الأرقام كأرقام). والـ extensions اتطبقوا وظهروا في [[locale]]. و [[getCollations()]] بيقول المتاح لكل لغة: [[compat]] في العربي ترتيب قديم، و [[eor]] ترتيب أوروبي موحّد للقواميس متعددة اللغات.` },
          ],
          check: {
            lang: "js",
            starter: R`function sortProducts(list) {
  // نسخة مترتبة: الاسم ترتيب طبيعي، ولو زي بعض الأرخص الأول
}`,
            tests: R`const products = [{ name: "شاشة 27", price: 9000 }, { name: "شاشة 9", price: 2500 }, { name: "شاشة 100", price: 50000 }, { name: "Mouse 2", price: 300 }, { name: "mouse 10", price: 450 }];
test("الأرقام كأرقام", () => expect(sortProducts(products).map(p => p.name)).toEqual(["شاشة 9", "شاشة 27", "شاشة 100", "Mouse 2", "mouse 10"]));
test("اللستة الأصلية متتغيرش", () => { sortProducts(products); expect(products[0].name).toBe("شاشة 27"); });
test("نفس الاسم: الأرخص الأول", () => expect(sortProducts([{ name: "كيبورد", price: 500 }, { name: "كيبورد", price: 300 }]).map(p => p.price)).toEqual([300, 500]));
test("الحالة مش فارقة", () => expect(sortProducts([{ name: "b", price: 1 }, { name: "A", price: 1 }]).map(p => p.name)).toEqual(["A", "b"]));`,
            solution: R`const natural = new Intl.Collator("ar", { numeric: true, sensitivity: "base" });
function sortProducts(list) {
  return [...list].sort((a, b) => natural.compare(a.name, b.name) || a.price - b.price);
}`
          },
          ref: [
            { t: "MDN: Intl.Collator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator" },
            { t: "MDN: Intl.Collator.prototype.compare()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare" },
            { t: "MDN: Intl.Collator.prototype.resolvedOptions()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/resolvedOptions" },
            { t: "MDN: Intl.Collator.supportedLocalesOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/supportedLocalesOf" },
          ],
          pre: ["js/toUpperCase و toLocaleUpperCase", "js/sort و toSorted"],
          deep: {
            why: R`أي لستة بيشوفها بني آدم مترتبة: أسامي عملاء، ومنتجات، وملفات، وبلاد. و [[sort()]] الافتراضي بيرتّب بأكواد الحروف، فالعربي بيطلع في مجموعات حسب شكل الألف، والملفات «10» قبل «2». ده بيبان «بايظ» لأي يوزر.`,
            how: R`الـ Collator بيستخدم خوارزمية Unicode Collation Algorithm (UCA) مع تعديلات CLDR لكل لغة. كل حرف ليه أوزان على مستويات: الحرف الأساسي، ثم العلامات، ثم الحالة، ثم الباقي. [[compare]] بيقارن المستوى الأول للكلمة كلها، ولو متساوي ينزل للي بعده. [[sensitivity]] بيحدد يوقف عند أنهي مستوى. و [[numeric]] بيخلي أي سلسلة أرقام وزن واحد بقيمتها.`,
            when: R`أي [[sort]] على نص للعرض. والمقارنة في البحث بـ [["base"]]. ومش للمفاتيح التقنية (IDs و hashes): هناك الترتيب بالكود أسرع وثابت، والـ Collator ممكن يعتبر نصين مختلفين «زي بعض».`,
            mistakes: R`[[sort()]] من غير دالة على أسامي. [[localeCompare]] بـ options جوه [[sort]] لستة كبيرة. افتراض إن [["base"]] بيوحّد ة و ه. [[caseFirst]] كـ boolean. وفي الانترفيو: «ترتّب ["file10", "file2", "file1"] إزاي؟» الإجابة: [[new Intl.Collator(undefined, { numeric: true }).compare]].`,
          },
        },
      ]
    }
]);

// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "ابني ٣ مشاريع بإيدك",
      l: 2,
      time: R`حوالي ٦ ساعات للتلاتة (ساعتين لكل مشروع)، وكل واحد بيطلع شغّال لوحده`,
      goal: [
        R`تبني تطبيق كامل من فولدر فاضي لحد ما يشتغل: HTML و CSS و JavaScript عادي، من غير فريمورك ومن غير مكتبة.`,
        R`تتعامل مع الفلوس والتواريخ صح: قروش بدل كسور، و [[Intl]] للعرض، و [[timeZone: 'UTC']] عشان اليوم ميرجعش يوم.`,
        R`تخلي الواجهة تكلّم سيرفر بأدب: [[debounce]] و [[AbortController]] وكاش، وتقيس بنفسك إنها بتبعت طلب واحد مش عشرة.`,
        R`تقيس الوقت صح بـ [[performance.now()]] و [[requestAnimationFrame]]، وتتعامل مع العربي والإنجليزي في نفس الصفحة.`,
        R`تختبر كل حتة من غير متصفح: المنطق في Node، والـ DOM في [[jsdom]]، والسيرفر بطلبات حقيقية.`,
      ],
      use: {
        prog: R`التلات مشاريع دول بيجمعوا تقريبًا كل اللي في التاب: الحالة والرسم من «ابني تطبيق بإيدك»، والـ [[fetch]] من «مشروع: fetch محترم»، والـ closures والـ event loop والتواريخ و regex. المشروع هو المكان اللي الدروس دي بتقابل بعض فيه.`,
        work: R`دي نفس الحاجات اللي بتتطلب في أول شغل frontend: فورم بيتحقق، وجدول بيتحسب، وبحث مش بيقتل السيرفر، وواجهة بتتعامل مع العربي. واللي عمل التلاتة بإيده بيعرف يقرا كود React اللي بيعمل نفس الحاجة.`,
        cs: R`فصل المنطق عن العرض (المنطق يتجرّب لوحده)، والأرقام الصحيحة بدل الـ floating point، والـ race conditions في الطلبات، والفرق بين الوقت اللي بيتعدّ والوقت اللي بيتقاس.`,
      },
      lab: R`mkdir -p ~/lab/js-projects && cd ~/lab/js-projects && node --version   # محتاج Node 20.11 أو أحدث`,
      projects: [
        { lvl: 'صغير', t: R`وضع متساهل في لعبة الكتابة`, what: R`في «لعبة سرعة الكتابة» ضيف checkbox «متساهل»: لو متعلّم، [[أ]] و [[إ]] و [[آ]] تتحسب [[ا]]، و [[ى]] تتحسب [[ي]]، و [[ة]] تتحسب [[ه]]. اعمل دالة [[normalize(ch)]] في [[game.js]] واستخدمها في [[marks]] و [[stats]] بس، من غير ما تغيّر النص الأصلي.`, done: R`لما تكتب [[اقرا]] مكان [[أقرأ]] والوضع متعلّم، الحروف كلها خضرا والدقة ١٠٠٪. ولما تشيل العلامة نفس الكتابة بتطلع حرفين أحمر. وأحسن نتيجة للوضعين متخزنة لوحدها.` },
        { lvl: 'صغير', t: R`اختصار [[/]] للبحث`, what: R`في «بحث بيستنى انت تخلص» خلي زرار [[/]] في أي حتة في الصفحة يحط المؤشر في خانة البحث، إلا لو انت أصلًا بتكتب في خانة تانية. ومن «addEventListener» و [[document.activeElement]].`, done: R`لما تدوس [[/]] والصفحة فاضية المؤشر بيروح للبحث والحرف مش بيتكتب فيها. ولو انت جوه خانة تانية الـ [[/]] بيتكتب عادي.` },
        { lvl: 'متوسط', t: R`ميزانية لكل تصنيف`, what: R`في «متتبّع مصاريف» ضيف ميزانية شهرية لكل تصنيف (مثلًا أكل ٣٠٠٠). جنب كل تصنيف في «حسب التصنيف» اعرض شريط [[<progress>]] والنسبة، ولو عدّى ٨٠٪ يبقى برتقاني، ولو عدّى ١٠٠٪ أحمر. الميزانيات بتتحفظ مع المصاريف، فزوّد [[VERSION]] لـ ٢ واكتب تحويل من النسخة ١ زي ما «خلّي التطبيق يفتكر» شرح.`, done: R`لو عندك داتا محفوظة بالنسخة ١ وفتحت النسخة الجديدة، المصاريف كلها لسه موجودة والميزانيات فاضية. والنسبة بتتحسب من الشهر الحالي بس، وبتتغيّر فورًا لما تضيف أو تمسح بند.` },
        { lvl: 'متوسط', t: R`استيراد CSV`, what: R`ضيف زرار «استورد» بيقرا ملف بـ [[<input type="file">]] (درس «input type=file»)، ويفك نفس الـ CSV اللي التطبيق بيصدّره: الـ BOM في الأول، والخانات اللي بين علامتين تنصيص، و [[""]] جواها. وكل صف يعدّي على [[validate]] نفسها، والصف البايظ ميتضافش.`, done: R`تصدّر، وتمسح كل حاجة، وتستورد نفس الملف: الإجماليات بالظبط زي الأول. ولو عدّلت صف في الملف وخليت المبلغ [[abc]]، التطبيق بيقول «صف ٣: المبلغ مش صحيح» ويضيف الباقي.` },
        { lvl: 'كبير', t: R`مصاريف بسيرفر حقيقي`, what: R`انقل الحفظ من [[localStorage]] لسيرفر Node زي [[server.js]] بتاع مشروع البحث: [[GET]] و [[POST]] و [[PUT]] و [[DELETE]] على [[/api/expenses]]، والداتا في ملف JSON بيتكتب في ملف مؤقت وبعدين [[rename]] عشان ميتقطعش. السيرفر بيستخدم [[validate]] نفسها (نفس الملف بيتستورد في الاتنين). والواجهة بتستخدم [[request()]] من «مشروع: fetch محترم» بمهلة وإعادة محاولة، وبتعمل optimistic update: البند بيظهر على طول، ولو السيرفر رفض بيرجع زي ما كان ويظهر الخطأ. والسيرفر بيكتب لوج سطر لكل طلب. وفيه اختبارات بـ [[node --test]].`, done: R`تقفل السيرفر وانت بتضيف بند: البند بيختفي ورسالة «مقدرناش نحفظ» بتظهر، ومفيش بند متكرر لما السيرفر يرجع. و [[curl -X POST]] بمبلغ سالب بيرجّع 400 برسالة [[validate]] نفسها. والاختبارات بتعدّي، والسيرفر بيتقفل ويتفتح والداتا موجودة.`, ext: R`ضيف يوزرز (كل واحد يشوف مصاريفه بس)، وبعدها انقل الملف لـ SQLite أو PostgreSQL (تاب «SQL و Prisma»)، وحطه على VPS ورا Nginx.` },
        { lvl: 'كبير', t: R`مدرّب كتابة للكود`, what: R`لعبة كتابة نصوصها سطور كود حقيقية: هات أسامي الـ methods من [[data.json]] بتاع مشروع البحث، واعمل منها سطور زي [[arr.toSorted((a, b) => a - b)]]. الاتجاه دايمًا [[ltr]] حتى لو الصفحة عربي. سجّل كل جولة (الوقت، و WPM، والدقة، وأكتر ٣ حروف غلطت فيهم) في [[IndexedDB]] (درس «IndexedDB و BroadcastChannel»)، واعرض صفحة «تقدّمي» فيها آخر ٣٠ جولة، وبحث في الجولات القديمة بـ [[debounce]].`, done: R`بعد ١٠ جولات، الصفحة بتعرض الـ ١٠ ومتوسطهم، والحروف اللي بتغلط فيها أكتر (غالبًا [[(]] و [[{]] و [[=>]]) ليها رقم. والداتا بتفضل بعد ما تقفل المتصفح. ولو مسحت قاعدة البيانات من DevTools التطبيق بيفتح عادي من غير ولا error.`, ext: R`ضيف وضع «حروفك الضعيفة»: النص بيتولّد من الحروف اللي بتغلط فيها أكتر. وخليه PWA بيشتغل من غير نت (تاب «PWA و service worker»).` },
        { lvl: 'فكرة', t: R`تطبيقك انت بالتلات مهارات`, what: R`اختار مشكلة حقيقية عندك أو عند حد تعرفه: مذاكرة بالـ flashcards، أو متابعة تمارين الجيم، أو حسابات محل صغير، أو جدول مواعيد. التطبيق لازم يستخدم التلات حاجات اللي اتبنوا هنا: حالة بتتحفظ وبتستحمل الداتا البايظة وبتتصدّر (المصاريف)، وبحث بـ [[debounce]] وكاش (البحث)، ووقت متقاس بـ [[performance.now()]] (اللعبة). انت اللي بتحدد الشاشات.`, done: R`حد غيرك استخدمه أسبوع من غير ما تشرحله. وفيه README فيه صورة وطريقة التشغيل، و [[npm test]] بيعدّي، والمنطق كله في ملفات من غير DOM.`, ext: R`انشره على GitHub Pages، واكتب في الـ README اتنين قرارات أخدتهم وليه (زي «القروش مش كسور»). ده اللي بيتسأل عليه في الانترفيو.` },
      ],
      n: R`تلات تطبيقات حقيقية من فولدر فاضي: متتبّع مصاريف بيحسب ويصدّر CSV، وبحث بيستنى لحد ما تخلص كتابة، ولعبة سرعة كتابة بالعربي والإنجليزي. كل سطر فيهم اتشغّل: المنطق في Node 24.22، والصفحة في jsdom 30.1، واللعبة كمان في Chrome 156. والأرقام اللي في الشرح اتقاست`,
      items: [
        {
          cmd: "مشروع: expense tracker",
          title: "متتبّع مصاريف",
          learn: R`تبني متتبّع مصاريف كامل: إضافة وتعديل ومسح، وإجمالي لكل تصنيف ولكل شهر، وحفظ، وتصدير CSV.`,
          out: R`تطبيق شغّال في ٤ ملفات (٢١٦ سطر)، والمنطق بتاعه بيتجرّب في Node من غير متصفح.`,
          use: {
            prog: R`أي تطبيق فيه فلوس بيقع في نفس الفخاخ: [[19.99 * 100]] مش بيطلع [[1999]]، والتاريخ بيرجع يوم في بلد تانية، والـ CSV بيتفتح في Excel حروف ملخبطة. المشروع ده بيوريك الفخ وبعدين الحل.`,
            work: R`«التقرير الشهري مش مطابق» و «الملف اللي نزل من الموقع عربيه بايظ» — شكويين بيوصلوا لأي فريق frontend. والاتنين ليهم سطر حل واحد هنا.`,
            cs: R`الأرقام الصحيحة (integers) بدل الـ floating point في الفلوس، والـ aggregation بـ [[Map]] (نفس فكرة [[GROUP BY]] في SQL)، والهروب (escaping) في الـ CSV.`,
          },
          desc: R`هنبني متتبّع مصاريف من فولدر فاضي: تضيف مصروف بمبلغ وتصنيف وتاريخ، وتعدّله وتمسحه، والتطبيق بيحسب إجمالي لكل تصنيف ولكل شهر، وبيفتكر بعد الـ reload، وبينزّل ملف CSV.

ده تكملة لـ «ابني تطبيق بإيدك»: هناك اتعلمت إن الحالة مصدر الحقيقة، وإن [[innerHTML]] باب XSS، وإن المحفوظ ممكن يكون بايظ. هنا هنستخدم الكلام ده في تطبيق أكبر، وهنزوّد عليه الحاجات اللي بتظهر لما التطبيق يتعامل مع **فلوس وتواريخ** بجد:

• المبلغ بيتخزن **قروش** (رقم صحيح)، لأن [[19.99 * 100]] بيطلع [[1998.9999999999998]].
• التاريخ بيتعرض بـ [[Intl.DateTimeFormat]] و [[timeZone: 'UTC']]، لأن من غيرها [[2026-10-01]] بيظهر ٣٠ سبتمبر في نيويورك (اتجرّب).
• التحقق بيرفض [[1e3]] و [[toString]] كتصنيف و [[2026-02-30]]، وبيقبل الأرقام العربي [[١٢]].
• الـ CSV فيه BOM عشان Excel يقرا العربي، وبيهرب الفاصلة وعلامة التنصيص والـ formula.

| الملف | فيه إيه | السطور |
|---|---|---|
| [[index.html]] | الفورم والجدول والإجماليات | ٣٥ |
| [[style.css]] | شكل بسيط ولون الخطأ | ٧ |
| [[expenses.js]] | المنطق كله من غير DOM: التحقق والإجماليات والـ CSV والحفظ | ٥٩ |
| [[app.js]] | الحالة والرسم والأحداث | ١١٥ |`,
          example: R`// expenses.js — المنطق كله من غير DOM: يتجرّب في Node
export const CATS = { food: 'أكل', transport: 'مواصلات', bills: 'فواتير', fun: 'خروج', other: 'تاني' };
const KEY = 'expenses';
const VERSION = 1;

export function validate(input) {
  const errors = {};
  const raw = String(input.amount ?? '').trim()
    .replace(/[٠-٩]/g, d => d.charCodeAt(0) - 0x660).replace('٫', '.');
  const amount = Number(raw);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) errors.amount = 'اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة';
  else if (amount <= 0 || amount > 1_000_000) errors.amount = 'المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون';
  if (!Object.hasOwn(CATS, input.cat)) errors.cat = 'اختار تصنيف من اللستة';
  if (!isRealDate(input.date)) errors.date = 'التاريخ مش صحيح';
  const note = String(input.note ?? '').trim().slice(0, 80);
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { cents: Math.round(amount * 100), cat: input.cat, date: input.date, note } };
}

export function isRealDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function totalsBy(items, keyOf) {
  const out = new Map();
  for (const it of items) out.set(keyOf(it), (out.get(keyOf(it)) ?? 0) + it.cents);
  return [...out].sort((a, b) => b[1] - a[1]);
}

export function toCSV(items) {
  const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return /[",\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  const rows = [['date', 'category', 'amount', 'note']];
  for (const it of items) rows.push([it.date, CATS[it.cat], (it.cents / 100).toFixed(2), it.note]);
  return '\uFEFF' + rows.map(r => r.map(cell).join(',')).join('\r\n');
}

export function load(storage) {
  let raw;
  try { raw = storage.getItem(KEY); } catch { return []; }
  if (!raw) return [];
  let data;
  try { data = JSON.parse(raw); } catch { return []; }
  if (data?.version !== VERSION || !Array.isArray(data.items)) return [];
  return data.items.filter(it => it && typeof it.id === 'string'
    && Number.isInteger(it.cents) && it.cents > 0
    && Object.hasOwn(CATS, it.cat) && isRealDate(it.date)
    && typeof it.note === 'string');
}

export function save(storage, items) {
  try { storage.setItem(KEY, JSON.stringify({ version: VERSION, items })); return true; }
  catch { return false; }
}`,
          lines: [
            R`التصنيفات المسموحة: المفتاح بالإنجليزي هو اللي بيتخزن ([[food]])، والقيمة العربي هي اللي بتتعرض ([[أكل]]). كده لو غيّرت اسم «أكل» لـ «أكل وشرب» بعدين، الداتا المحفوظة متتأثرش. و [[export]] عشان [[app.js]] يستورده ويملا منه الـ [[<select>]].`,
            R`اسم المفتاح اللي كل المصاريف بتتحفظ تحته في [[localStorage]]. ثابت في مكان واحد عشان القراية والكتابة ميختلفوش في حرف.`,
            R`رقم نسخة شكل الداتا المحفوظة، زي اللي في «خلّي التطبيق يفتكر». لو غيّرت شكل البند بعدين (مثلًا ضفت ميزانية)، تزوّده وتكتب تحويل بدل ما الكود الجديد يقرا الشكل القديم غلط.`,
            R`[[validate]] بتاخد اللي اليوزر كتبه (نصوص من الفورم) وبترجّع حاجة من اتنين: [[{ ok: true, value }]] جاهز يتخزن، أو [[{ ok: false, errors }]] فيه رسالة لكل خانة غلط. ومبتلمسش الـ DOM خالص، فتتجرّب في Node.`,
            R`object فاضي هنحط فيه رسالة لكل خانة فيها مشكلة، والمفتاح هو [[name]] الخانة ([[amount]] أو [[cat]] أو [[date]]) عشان [[app.js]] يعرف يحط كل رسالة جنب خانتها.`,
            R`بنحوّل المبلغ لنص الأول ([[?? '']] بيحمي من [[undefined]] لو الخانة مش موجودة)، و [[trim()]] بيشيل المسافات من الأول والآخر لأن «٤٥ » بمسافة في الآخر مش غلطة اليوزر.`,
            R`**الأرقام العربي**: لوحة المفاتيح العربي بتكتب [[١٢]] مش [[12]]، و [[Number('١٢')]] بيطلع [[NaN]] (اتجرّب). فالـ regex [[ [٠-٩] ]] بيمسك كل رقم عربي، و [[charCodeAt(0) - 0x660]] بيحوّله لرقمه (كود [[٠]] هو [[0x660]])، و [[٫]] (الفاصلة العشرية العربي) بتبقى نقطة.`,
            R`[[Number]] بيحوّل النص لرقم. بنحسبه هنا بس **مش بنثق فيه لوحده**: [[Number('')]] بيطلع [[0]] و [[Number('1e3')]] بيطلع [[1000]] و [[Number('0x10')]] بيطلع [[16]] (كلهم اتجرّبوا). عشان كده الفحص اللي بعده regex على النص نفسه.`,
            R`الـ regex بيقول شكل المبلغ المقبول بالظبط: أرقام ([[\d+]])، وبعدها اختياري نقطة وواحد أو اتنين أرقام ([[(\.\d{1,2})?]]). و [[^]] و [[$]] بيجبروه يطابق النص **كله** مش حتة منه. فـ [['']] و [[1e3]] و [[12.345]] و [[-5]] كلهم بيترفضوا برسالة واحدة واضحة.`,
            R`[[else if]] عشان لو الشكل غلط أصلًا ميتفحصش الحجم. والحد [[0]] بيرفض «٠» و «٠.٠٠»، والمليون حد معقول بيمسك غلطة زي إنك تكتب المبلغ مرتين ورا بعض. و [[1_000_000]] نفس [[1000000]]؛ الـ [[_]] بيخلي الرقم يتقري بس.`,
            R`[[Object.hasOwn]] بيسأل: المفتاح ده موجود في الـ object نفسه؟ **مش** [[in]]: لأن [[('toString' in CATS)]] بيطلع [[true]] (جاية من الـ prototype)، فحد يعدّل الـ HTML ويبعت [[cat=toString]] كان هيعدّي. ده اتجرّب: [[in]] قال [[true]] و [[hasOwn]] قال [[false]].`,
            R`التاريخ بيتفحص بدالة لوحدها تحت، لأن الفحص محتاج كذا خطوة ومحتاجينه تاني في [[load]].`,
            R`الملاحظة اختيارية: بنحوّلها نص، ونشيل المسافات، ونقصّها على ٨٠ حرف بـ [[slice(0, 80)]] حتى لو حد شال [[maxlength]] من الـ HTML. الحد اللي في الـ HTML راحة لليوزر، والحد اللي هنا هو الحماية.`,
            R`لو فيه ولا خطأ، نرجّع كل الأخطاء مرة واحدة (مش أول واحد بس)، عشان اليوزر يصلّح كل الخانات في محاولة واحدة.`,
            R`كل حاجة سليمة: نرجّع البند بالشكل اللي هيتخزن. [[Math.round(amount * 100)]] بيحوّل الجنيه لقروش **رقم صحيح**: [[19.99 * 100]] بيطلع [[1998.9999999999998]] و [[Math.round]] بيرجّعه [[1999]] (اتجرّب). ومن هنا ورايح كل الحسابات على أرقام صحيحة، فالجمع عمره ما يطلع كسور غريبة.`,
            R`قفلة [[validate]].`,
            R`[[isRealDate]] بترد بـ [[true]] لو النص تاريخ موجود فعلًا في الشكل [[YYYY-MM-DD]] اللي [[<input type="date">]] بيرجّعه.`,
            R`أول فحص على الشكل: لازم يكون نص، و ٤ أرقام وشرطة واتنين وشرطة واتنين. ده بيرفض [[undefined]] و [[5/10/2026]] و [[2026-1-5]] قبل ما نوصل لـ [[Date]] اللي بتقبل أشكال كتير بطرق مختلفة.`,
            R`بنعمل [[Date]] من النص ونزوّد [[T00:00:00Z]]: الـ [[Z]] معناها UTC صريح، عشان النتيجة متتأثرش بالمنطقة الزمنية للجهاز (درس «Date ومطبّاته»).`,
            R`**الفحص بالرجوع**: بنحوّل التاريخ لنص تاني ونقارن بالأصل. ده لازم لأن [[new Date('2026-02-30')]] **مش** بيقول غلط، بيعدّيها لـ ٢ مارس (اتجرّب: [[2026-03-02T00:00:00.000Z]]). فلو النص اللي رجع مختلف، اليوم ده مش موجود. و [[isNaN(getTime())]] بيمسك حاجات زي [[2026-13-45]] اللي بتطلع Invalid Date.`,
            R`قفلة [[isRealDate]].`,
            R`[[totalsBy]] دالة واحدة لكل أنواع الإجماليات: بتاخد البنود ودالة [[keyOf]] بتقول «البند ده يتجمع تحت إيه». للتصنيف بنبعت [[it => it.cat]]، وللشهر [[it => it.date.slice(0, 7)]] (يعني [[2026-10]]). ده نفس [[GROUP BY]] في SQL.`,
            R`[[Map]] فاضية: المفتاح هو التصنيف أو الشهر، والقيمة مجموع القروش. [[Map]] أحسن من object هنا لأنها بتحافظ على ترتيب الإضافة ومفيهاش مفاتيح موروثة زي [[toString]] (درس «Map و Set»).`,
            R`لكل بند: هات المجموع اللي فات للمفتاح ده ([[?? 0]] لو أول مرة)، وزوّد عليه قروش البند، واكتبه تاني. ولأن القروش أرقام صحيحة، المجموع صحيح بالظبط مهما كان عدد البنود.`,
            R`[[ [...out] ]] بيحوّل الـ [[Map]] لمصفوفة أزواج [[ [مفتاح, مجموع] ]]، و [[sort]] بيرتّبها من الأكبر للأصغر ([[b[1] - a[1] ]]). الناتج الحقيقي: [[ [ ['bills', 120000], ['food', 7050], … ] ]].`,
            R`قفلة [[totalsBy]].`,
            R`[[toCSV]] بتحوّل البنود لنص CSV جاهز يتنزّل كملف، ويتفتح في Excel أو Google Sheets.`,
            R`[[cell]] دالة صغيرة جوه [[toCSV]] بتجهّز خانة واحدة: بتهرب أي حاجة ممكن تبوّظ شكل الملف أو تتنفّذ في Excel.`,
            R`بنحوّل القيمة لنص الأول، عشان الأرقام والنصوص يتعاملوا بنفس الطريقة. و [[let]] لأننا هنعدّل [[s]] في السطر اللي بعده.`,
            R`**حماية من CSV injection**: Excel بيعتبر أي خانة بتبدأ بـ [[=]] أو [[+]] أو [[-]] أو [[@]] معادلة وبينفّذها. ملاحظة زي [[=HYPERLINK(...)]] ممكن تبقى لينك خبيث. فبنحط [[']] قبلها، و Excel بيعرضها نص. (الـ [[\-]] جوه الأقواس عشان الشرطة متتفهمش range.)`,
            R`لو الخانة فيها علامة تنصيص أو فاصلة أو سطر جديد، لازم تتحط بين علامتين تنصيص، وأي [["]] جواها تبقى [[""]]. ده قانون الـ CSV (RFC 4180). من غيره «مترو, وتاكسي» هتتقسم خانتين وكل الأعمدة اللي بعدها تتزحلق.`,
            R`قفلة [[cell]].`,
            R`أول صف هو أسامي الأعمدة بالإنجليزي، عشان أي برنامج أو سكربت يقرا الملف بعدين يلاقي أسامي ثابتة.`,
            R`لكل بند صف: التاريخ زي ما هو، واسم التصنيف بالعربي، والمبلغ بالجنيه بـ [[toFixed(2)]] (يعني [[45.50]] مش [[45.5]])، والملاحظة. **من غير** [[Intl]] هنا: الملف للبرامج، و [[٤٥٫٥٠ ج.م.]] Excel مش هيفهمه رقم.`,
            R`[['\uFEFF']] هو الـ BOM (Byte Order Mark): ٣ بايتات [[ef bb bf]] في أول الملف بتقول لـ Excel «ده UTF-8». من غيرها Excel على ويندوز بيفتح العربي حروف ملخبطة. وبعدها كل صف خاناته بفاصلة، والصفوف بـ [[\r\n]] اللي الـ RFC بيطلبها.`,
            R`قفلة [[toCSV]].`,
            R`[[load]] بتقرا المصاريف المحفوظة، ومعمولة إنها **عمرها ما ترمي**. أسوأ حالة بترجّع مصفوفة فاضية والتطبيق يفتح. نفس طريقة «خلّي التطبيق يفتكر» بالظبط، بس بفحص أشد لكل بند. و [[storage]] بتتبعت كـ parameter عشان نعرف نجرّبها في Node بـ object وهمي.`,
            R`متغير النص الخام، متعرّف برّه الـ [[try]] لأن [[let]] جوه البلوك مش بيبان برّاه.`,
            R`[[getItem]] جوه [[try]] لوحدها، لأنها بترمي لما بيانات المواقع مقفولة. ولما [[app.js]] بيبعت [[null]] (لأن [[localStorage]] نفسها رمت) [[null.getItem]] بترمي [[TypeError]] جوه نفس الـ [[try]]، فالحالتين بيرجّعوا [[ [] ]].`,
            R`أول زيارة: مفيش حاجة محفوظة و [[getItem]] رجّعت [[null]]، فنبدأ فاضي.`,
            R`متغير للداتا بعد التحويل، متعرّف برّه الـ [[try]] لنفس السبب.`,
            R`[[JSON.parse]] بترمي على النص البايظ. الرسالة الحقيقية لنص اتقطع في النص: [[SyntaxError: Unexpected end of JSON input]]. فبنمسكها ونرجّع فاضي بدل ما الصفحة تقع.`,
            R`[[?.]] بيحمي لو الـ JSON كان [[null]] صريح. ولو النسخة مختلفة أو [[items]] مش مصفوفة، الشكل مش اللي احنا عارفينه فمنقراهوش.`,
            R`**كل بند بيتفحص لوحده** بـ [[filter]]: البند البايظ بيتشال والباقي يعيش. ولازم يكون object و [[id]] بتاعه نص.`,
            R`القروش لازم رقم **صحيح** موجب. [[Number.isInteger]] بيرفض [[10.5]] وبيرفض [['100']] النص كمان، وده اتجرّب: بند فيه [[cents: '100']] اتشال.`,
            R`التصنيف لازم من اللستة (بـ [[hasOwn]] تاني، مش [[in]])، والتاريخ لازم حقيقي بنفس [[isRealDate]] اللي الفورم بيستخدمها. فداتا اتعدّلت بإيد في DevTools ميعدّيش منها حاجة الفورم كان هيرفضها.`,
            R`والملاحظة لازم نص، وده آخر شرط في الـ [[filter]]. القوس الأخير بيقفل الـ [[filter]] والـ [[return]].`,
            R`قفلة [[load]].`,
            R`[[save]] بتكتب كل البنود مع رقم النسخة، وبترجّع [[true]] أو [[false]] بدل ما ترمي. كده [[app.js]] يقرر يقول لليوزر إيه.`,
            R`[[JSON.stringify]] بيحوّل الـ object لنص، و [[setItem]] بتكتبه. ممكن ترمي [[QuotaExceededError]] لو المساحة (حوالي ٥ ميجا) خلصت، أو [[TypeError]] لو [[storage]] كانت [[null]]. الحالتين اتجرّبوا ورجّعوا [[false]].`,
            R`[[catch]] من غير متغير (مش محتاجين الخطأ نفسه، بس إنه حصل) بترجّع [[false]]، و [[app.js]] بيكتب «مقدرناش نحفظ» في [[#status]].`,
            R`قفلة [[save]].`,
          ],
          teach: R`## ٠. هنبني إيه

تطبيق صفحة واحدة: فورم فوق، وجدول المصاريف تحته، وإجماليات، وزرار تنزيل.

~~~text الشكل النهائي (اتشغّل في jsdom، والأرقام والتواريخ حقيقية)
المبلغ [______]  التصنيف [أكل ▾]  التاريخ [2026-10-29]  ملاحظة [____]  [ضيف]

التاريخ        التصنيف   المبلغ             ملاحظة
٠٦‏/١٠‏/٢٠٢٦    مواصلات   ‏٣٠٫٠٠ ج.م.‏         مترو
٠٥‏/١٠‏/٢٠٢٦    أكل       ‏٤٥٫٥٠ ج.م.‏         فطار          [عدّل] [امسح]
٢٨‏/٠٩‏/٢٠٢٦    فواتير    ‏١٬٢٠٠٫٠٠ ج.م.‏       كهربا

حسب التصنيف: فواتير ١٬٢٠٠٫٠٠ · أكل ٤٥٫٥٠ · مواصلات ٣٠٫٠٠
حسب الشهر:   أكتوبر ٢٠٢٦ ٧٥٫٥٠ · سبتمبر ٢٠٢٦ ١٬٢٠٠٫٠٠
[نزّل CSV]
~~~

### الملفات

~~~text
expense/
├── index.html     الفورم والجدول (٣٥ سطر)
├── style.css      الشكل (٧ سطور)
├── expenses.js    المنطق من غير DOM (٥٩ سطر)  ← بيتجرّب في Node
└── app.js         الحالة والرسم والأحداث (١١٥ سطر)
~~~

**ليه المنطق في ملف لوحده؟** عشان [[expenses.js]] مفيهوش ولا [[document]]. فتقدر تشغّله في Node وتجرّب ١٠ مدخلات غلط في ثانية، من غير ما تفتح متصفح وتكتب في الفورم ١٠ مرات. ده نفس الاتجاه اللي في «قسّمه لملفات»: [[app.js]] بيستورد من [[expenses.js]]، والعكس لأ.

### هتشغّله إزاي

الملفات بتستخدم [[import]] (يعني [[<script type="module">]])، والمتصفح **مش بيشغّل modules من [[file://]]** (ده من وثائق MDN). فمحتاج سيرفر صغير:

~~~bash
mkdir -p ~/lab/js-projects/expense && cd ~/lab/js-projects/expense
python3 -m http.server 8000      # أو: npx serve
# وافتح http://localhost:8000
~~~

---

## ١. index.html

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>مصاريفي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>مصاريفي</h1>
    <form id="form" novalidate>
      <label>المبلغ <input name="amount" inputmode="decimal" autocomplete="off"></label>
      <small class="err" data-for="amount"></small>
      <label>التصنيف <select name="cat"></select></label>
      <small class="err" data-for="cat"></small>
      <label>التاريخ <input name="date" type="date"></label>
      <small class="err" data-for="date"></small>
      <label>ملاحظة <input name="note" maxlength="80"></label>
      <button id="submit">ضيف</button>
      <button type="button" id="cancel" hidden>إلغاء التعديل</button>
    </form>
    <p id="status" role="status"></p>
    <table>
      <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>ملاحظة</th><th></th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty">لسه مفيش مصاريف.</p>
    <section><h2>حسب التصنيف</h2><ul id="by-cat"></ul></section>
    <section><h2>حسب الشهر</h2><ul id="by-month"></ul></section>
    <button id="export">نزّل CSV</button>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

الحاجات اللي ليها سبب:

| الحتة | ليه |
|---|---|
| [[dir="rtl"]] | الصفحة كلها من اليمين، والجدول بيبدأ من اليمين لوحده |
| [[novalidate]] | بيقفل رسايل المتصفح الجاهزة، عشان رسايلنا احنا هي اللي تظهر بالعربي وجنب الخانة |
| [[inputmode="decimal"]] | على الموبايل بيفتح كيبورد أرقام فيها علامة عشرية. **مش** [[type="number"]]: ده بيرجّع [['']] لأي حاجة مش فاهمها، فمش هتعرف اليوزر كتب إيه عشان تقوله الغلط فين |
| [[type="date"]] | المتصفح بيعرض نتيجة، والقيمة دايمًا [[YYYY-MM-DD]] مهما كانت لغة الجهاز |
| [[data-for="amount"]] | الـ [[<small>]] ده مكان رسالة خطأ خانة [[amount]]. الكود بيلف على كل [[.err]] ويقرا [[data-for]] |
| [[role="status"]] | قارئ الشاشة بيقرا أي نص جديد فيه من غير ما اليوزر يتحرك |
| [[type="button"]] على الإلغاء | أي [[<button>]] جوه فورم نوعه الافتراضي [[submit]]، فمن غيرها زرار الإلغاء كان هيضيف البند |
| [[type="module"]] | بيسمح بـ [[import]]، وبيتأجّل لحد ما الـ HTML يخلص (زي [[defer]]، درس «defer و async و module») |

---

## ٢. الفلوس: ليه قروش؟

~~~js
console.log(0.1 + 0.2);
console.log(19.99 * 100, Math.round(19.99 * 100));
console.log(1.005 * 100);
~~~

~~~text اتشغّل فعلًا · Node 24.22
0.30000000000000004
1998.9999999999998 1999
100.49999999999999
~~~

الأرقام في JavaScript **floating point** (درس «number و NaN»): الكمبيوتر بيخزن [[0.1]] كقيمة قريبة جدًا مش بالظبط. ولو جمعت ١٠٠ مصروف بكسور، الإجمالي ممكن يطلع [[1234.5600000000002]].

**الحل:** حوّل لقروش **مرة واحدة** وانت داخل ([[Math.round(amount * 100)]])، واحسب كل حاجة على أرقام صحيحة، ورجّع لجنيه **وانت بتعرض بس** ([[cents / 100]]).

> البنوك وStripe وكل نظام فلوس بيعمل كده: المبلغ بيتخزن بأصغر وحدة (قرش، سنت) كرقم صحيح.

---

## ٣. التحقق: [[validate]]

الكود في المثال. وده اللي بترجّعه لمدخلات حقيقية:

~~~js test-logic.mjs
import { validate } from './expenses.js';
const cases = [
  { amount: '45.5', cat: 'food', date: '2026-10-05' },
  { amount: '', cat: 'food', date: '2026-10-05' },
  { amount: '0', cat: 'food', date: '2026-10-05' },
  { amount: '12.345', cat: 'food', date: '2026-10-05' },
  { amount: '1e3', cat: 'food', date: '2026-10-05' },
  { amount: '١٢', cat: 'food', date: '2026-10-05' },
  { amount: '20', cat: 'toString', date: '2026-10-05' },
  { amount: '20', cat: 'food', date: '2026-02-30' },
];
for (const c of cases) console.log(JSON.stringify(c.amount), c.cat, c.date, '->', JSON.stringify(validate(c)));
~~~

~~~text اتشغّل فعلًا · node test-logic.mjs
"45.5"   food     -> {"ok":true,"value":{"cents":4550,"cat":"food","date":"2026-10-05","note":""}}
""       food     -> {"ok":false,"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
"0"      food     -> {"ok":false,"errors":{"amount":"المبلغ لازم يبقى أكبر من صفر ومش أكتر من مليون"}}
"12.345" food     -> {"ok":false,"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
"1e3"    food     -> {"ok":false,"errors":{"amount":"اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة"}}
"١٢"     food     -> {"ok":true,"value":{"cents":1200,...}}
"20"     toString -> {"ok":false,"errors":{"cat":"اختار تصنيف من اللستة"}}
"20"     food 2026-02-30 -> {"ok":false,"errors":{"date":"التاريخ مش صحيح"}}
~~~

### الأربع مفاجآت اللي طلعت وانا بجرّب

| المدخل | الطريقة الساذجة بتعمل إيه | اتجرّب |
|---|---|---|
| مبلغ فاضي | [[Number('')]] بيطلع [[0]]، يعني «مصروف بصفر» بيتضاف | [[0]] |
| [[1e3]] | [[Number]] بيفهمها ألف، واليوزر ممكن يكون كتب «1» و «e» بالغلط | [[1000]] |
| [[١٢]] بالكيبورد العربي | [[Number]] مش بيفهمها خالص | [[NaN]] |
| تصنيف [[toString]] | [[('toString' in CATS)]] بيقول موجود، لأنه جاي من الـ prototype | [[true]] |
| [[2026-02-30]] | [[new Date]] مش بيرفضه، بيعدّيه لـ ٢ مارس | [[2026-03-02]] |

**الدرس:** متسألش [[Number]] «ده رقم؟». اسأل regex «ده **الشكل** اللي أنا عايزه؟»، وبعدين حوّل.

---

## ٤. الإجماليات: [[totalsBy]]

~~~js
const items = [
  { id: 'a', cents: 4550,   cat: 'food',      date: '2026-10-05', note: '' },
  { id: 'b', cents: 3000,   cat: 'transport', date: '2026-10-06', note: '' },
  { id: 'c', cents: 120000, cat: 'bills',     date: '2026-09-28', note: '' },
  { id: 'd', cents: 2500,   cat: 'food',      date: '2026-09-30', note: '' },
];
console.log(totalsBy(items, it => it.cat));
console.log(totalsBy(items, it => it.date.slice(0, 7)));
~~~

~~~text اتشغّل فعلًا
[ [ 'bills', 120000 ], [ 'food', 7050 ], [ 'transport', 3000 ] ]
[ [ '2026-09', 122500 ], [ '2026-10', 7550 ] ]
~~~

دالة واحدة لأي تجميع. **ليه [[slice(0, 7)]] للشهر؟** لأن التاريخ متخزن نص [[2026-10-05]]، وأول ٧ حروف هي السنة والشهر. ومن غير [[new Date]] خالص، فمفيش منطقة زمنية تلعب في الموضوع.

وفي [[app.js]] الشهور بتترتب بالتاريخ مش بالمبلغ: [[.sort((a, b) => b[0].localeCompare(a[0]))]]. ده شغّال لأن [[2026-10]] أكبر من [[2026-09]] كنص، وده سبب إن الشكل [[YYYY-MM]] مفيد.

---

## ٥. العرض بـ [[Intl]]: والتاريخ اللي بيرجع يوم

~~~js
const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
money.format(45.5);        // '‏٤٥٫٥٠ ج.م.‏'
money.format(1234567.891); // '‏١٬٢٣٤٬٥٦٧٫٨٩ ج.م.‏'
~~~

[[Intl.NumberFormat]] بيحط الأرقام العربي، والفاصلة العشرية العربي [[٫]]، وفاصل الآلاف [[٬]]، والعملة، وبيقرّب لقرشين. ولو عايز أرقام إنجليزي: [[en-EG]] بيطلع [[EGP 45.50]] (اتجرّب).

### المصيدة

~~~js tz.mjs
const d = new Date('2026-10-01');
console.log(new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(d));
console.log(new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' }).format(d));
~~~

~~~text اتشغّل فعلًا · PowerShell: $env:TZ='America/New_York'; node tz.mjs
٣٠‏/٠٩‏/٢٠٢٦      ← من غير timeZone: اليوم رجع يوم
٠١‏/١٠‏/٢٠٢٦      ← مع timeZone: 'UTC'
~~~

**ليه؟** [[new Date('2026-10-01')]] (تاريخ من غير ساعة) بيتفهم **منتصف الليل UTC**. ونيويورك ورا UTC بأربع ساعات، فالساعة هناك ٨ بالليل يوم ٣٠. في مصر (قدام UTC) المشكلة مش بتبان، **وبتبان عند أول يوزر برّه**. (وفي Git Bash على ويندوز متغير [[TZ]] مكانش بيوصل لـ Node، فاستخدمت PowerShell.)

**الحل:** التاريخ اتعمل UTC، فاعرضه UTC. وده اللي في [[app.js]]:

~~~js
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
monthName.format(asDate('2026-10-01'));   // 'أكتوبر ٢٠٢٦'
~~~

وتاريخ النهارده للفورم بيتعمل بـ [[new Date().toLocaleDateString('en-CA')]]: الـ locale الكندي بيكتب [[YYYY-MM-DD]] **بتوقيت الجهاز**. أما [[toISOString().slice(0, 10)]] فبيرجّع تاريخ UTC، وده في مصر بعد نص الليل بساعتين أو تلاتة بيبقى «امبارح». (التفاصيل في «UTC و Intl.DateTimeFormat».)

---

## ٦. الحفظ: [[load]] و [[save]]

نفس فكرة «خلّي التطبيق يفتكر»، واتجرّبت بـ storage وهمي في Node:

~~~js
const mem = new Map();
const st = { getItem: k => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)) };
~~~

~~~text اتشغّل فعلًا
أول زيارة                                  -> []
احفظ ٤ بنود واقرا                          -> 4 بنود
'{"version":1,"items":['   (JSON مقطوع)    -> []
بند سليم + null + cents: 10.5 + شهر 13 + تصنيف hack + نص  -> [ 'a' ]
getItem بترمي SecurityError                -> []
setItem بترمي QuotaExceededError           -> save رجّعت false
~~~

**ومصيدة ملاحظتهاش غير وانا بجرّب:** لو [[load]] لقت الداتا بايظة ورجّعت [[ [] ]]، أول [[save]] بعدها **بتكتب فوقها**. يعني البايظ اتمسح للأبد. في تطبيق بجد، خد نسخة من النص الخام الأول ([[setItem(KEY + ':broken', raw)]]) قبل ما ترجّع فاضي. سايبها كتمرين.

---

## ٧. app.js: الحالة والرسم

~~~js app.js — أوله
import { CATS, validate, totalsBy, toCSV, load, save } from './expenses.js';

const money = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
const day = new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const asDate = (s) => new Date(s + 'T00:00:00Z');
const today = () => new Date().toLocaleDateString('en-CA');

const store = (() => { try { return localStorage; } catch { return null; } })();
const state = { items: load(store), editing: null };
const $ = (sel) => document.querySelector(sel);
const form = $('#form');
const f = form.elements;

for (const [key, label] of Object.entries(CATS)) f.cat.append(new Option(label, key));
f.date.value = today();
~~~

- **الـ formatters بتتعمل مرة واحدة** برّه أي دالة. عمل [[Intl.NumberFormat]] جديد مع كل صف أبطأ بكتير من استخدام واحد موجود.
- **[[store]]**: في بعض المتصفحات مجرد **قراية** [[localStorage]] بترمي لما الكوكيز مقفولة. فبنقراها جوه [[try]] مرة واحدة، ولو رمت [[store]] بتبقى [[null]] و [[load]] و [[save]] بيتعاملوا.
- **[[state]]** فيها حاجتين بس: البنود، و [[editing]] (الـ [[id]] اللي بيتعدّل دلوقتي أو [[null]]). أي حاجة تانية (الإجماليات، العدد، فاضي ولا لأ) **بتتحسب** في الرسم.
- **[[form.elements]]** مش [[form.cat]] على طول. الاتنين شغالين في المتصفح، بس [[form.elements]] مفيش فيه تصادم مع خصايص الفورم نفسه ([[form.method]] و [[form.action]])، **و jsdom مش بيدعم [[form.cat]] خالص**: أول تشغيل وقع بـ [[TypeError: Cannot read properties of undefined (reading 'append')]].
- [[new Option(label, key)]] بيعمل [[<option>]] النص بتاعه العربي والقيمة الإنجليزي، من غير HTML نصي.

### الرسم من غير [[innerHTML]]

~~~js
function el(tag, text, data = {}) {
  const node = document.createElement(tag);
  node.textContent = text;
  Object.assign(node.dataset, data);
  return node;
}

function row(it) {
  const tr = document.createElement('tr');
  const cells = [day.format(asDate(it.date)), CATS[it.cat], money.format(it.cents / 100), it.note];
  tr.append(...cells.map(text => el('td', text)));
  const actions = el('td', '');
  actions.append(el('button', 'عدّل', { act: 'edit', id: it.id }), el('button', 'امسح', { act: 'del', id: it.id }));
  tr.append(actions);
  return tr;
}

function render() {
  const newest = state.items.toSorted((a, b) => b.date.localeCompare(a.date));
  $('#rows').replaceChildren(...newest.map(row));
  $('#empty').hidden = state.items.length > 0;
  const byCat = totalsBy(state.items, it => it.cat);
  $('#by-cat').replaceChildren(...byCat.map(([k, c]) => el('li', CATS[k] + ': ' + money.format(c / 100))));
  const byMonth = totalsBy(state.items, it => it.date.slice(0, 7)).sort((a, b) => b[0].localeCompare(a[0]));
  $('#by-month').replaceChildren(...byMonth.map(([k, c]) => el('li', monthName.format(asDate(k + '-01')) + ': ' + money.format(c / 100))));
  $('#export').disabled = state.items.length === 0;
  $('#submit').textContent = state.editing ? 'احفظ التعديل' : 'ضيف';
  $('#cancel').hidden = !state.editing;
}
~~~

| الحتة | ليه |
|---|---|
| [[el()]] | دالة صغيرة بتعمل عنصر بنص و [[data-*]]. كل النصوص بتدخل بـ [[textContent]]، فالملاحظة اللي فيها [[<img onerror>]] بتتعرض **حروف** (درس «innerHTML هي الباب») |
| [[Object.assign(node.dataset, data)]] | [[{ act: 'edit', id }]] بيبقى [[data-act="edit" data-id="..."]] على الزرار |
| [[toSorted]] | بيرجّع **نسخة** مترتبة، ومبيغيّرش [[state.items]] (درس «sort و toSorted») |
| [[localeCompare]] | مقارنة نصوص. [[b]] قبل [[a]] يعني الأحدث فوق |
| [[replaceChildren(...)]] | بيشيل كل اللي جوه ويحط الجديد في خطوة. من غير [[innerHTML = '']] |
| [[hidden]] | خاصية HTML بتخفي العنصر. الرسالة «لسه مفيش» ظاهرة لما مفيش بنود بس |
| [[disabled]] على التنزيل | ملف CSV فيه عناوين بس ملوش لازمة |

اتجرّب: ضفت ملاحظة [[<img src=x onerror=alert(1)>]] وعدّيت على الصفحة: [[img elements: 0]]، والملاحظة ظاهرة زي ما اتكتبت بالظبط.

---

## ٨. الإضافة والتعديل والمسح

~~~js
function commit() {
  $('#status').textContent = save(store, state.items) ? '' : 'مقدرناش نحفظ: التغييرات هتروح لما تقفل الصفحة';
  render();
}

function showErrors(errors) {
  for (const small of form.querySelectorAll('.err')) {
    const name = small.dataset.for;
    small.textContent = errors[name] ?? '';
    f[name].setAttribute('aria-invalid', String(name in errors));
  }
}

function clearForm() {
  state.editing = null;
  f.amount.value = '';
  f.note.value = '';
  showErrors({});
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = validate(Object.fromEntries(new FormData(form)));
  showErrors(result.errors ?? {});
  if (!result.ok) return form.querySelector('[aria-invalid="true"]').focus();
  if (state.editing) {
    state.items = state.items.map(it => it.id === state.editing ? { ...result.value, id: it.id } : it);
  } else {
    state.items.push({ ...result.value, id: crypto.randomUUID() });
  }
  clearForm();
  commit();
  f.amount.focus();
});
~~~

- **[[commit]]** هي الطريق الوحيد لأي تغيير: احفظ وبعدين ارسم. ولو الحفظ فشل اليوزر بيعرف بدل ما يكتشف بعد reload إن شغله راح.
- **[[Object.fromEntries(new FormData(form))]]** بيحوّل الفورم لـ object [[{ amount, cat, date, note }]] في سطر (درس «FormData و URLSearchParams»).
- **[[aria-invalid]]** بيقول لقارئ الشاشة إن الخانة غلط، والـ CSS بيلوّنها بيه ([[ [aria-invalid="true"] ]]). و **[[focus()]]** بيودّي اليوزر لأول خانة غلط.
- **التعديل والإضافة نفس الفورم**: لو [[state.editing]] فيها [[id]]، [[map]] بيبدّل البند ده بس ويحافظ على الـ [[id]] القديم. غير كده [[crypto.randomUUID()]] بيدّي [[id]] جديد.
- [[clearForm]] بيفضّي المبلغ والملاحظة بس، **ويسيب التصنيف والتاريخ**: اللي بيدخل ٥ مصاريف من نفس اليوم مش عايز يختار التاريخ ٥ مرات.

### الأزرار اللي جوه الجدول: مستمع واحد

~~~js
$('#rows').addEventListener('click', (e) => {
  const { act, id } = e.target.dataset;
  const it = state.items.find(x => x.id === id);
  if (!it) return;
  if (act === 'del' && confirm('تمسح ' + money.format(it.cents / 100) + '؟')) {
    state.items = state.items.filter(x => x.id !== id);
    if (state.editing === id) clearForm();
    commit();
  }
  if (act === 'edit') {
    state.editing = id;
    f.amount.value = (it.cents / 100).toFixed(2);
    f.cat.value = it.cat;
    f.date.value = it.date;
    f.note.value = it.note;
    render();
    f.amount.focus();
  }
});

$('#cancel').addEventListener('click', () => { clearForm(); render(); });
~~~

الصفوف بتتشال وتتعمل مع كل [[render]]، فالمستمع على [[#rows]] اللي مبيتشالش (درس «event delegation»). و [[if (!it) return]] بيحمي من ضغطة على خانة عادية ([[dataset]] بتاعها فاضي). **ومسح البند اللي بتعدّله** بيقفل وضع التعديل، وإلا كنت هتحفظ تعديل لبند مش موجود.

### اتشغّل فعلًا (jsdom، نفس الملفات)

~~~text node test-dom.mjs
-- بعد ٣ إضافات
    ٠٦‏/١٠‏/٢٠٢٦ | مواصلات | ‏٣٠٫٠٠ ج.م.‏ | <img src=x onerror=alert(1)>
    ٠٥‏/١٠‏/٢٠٢٦ | أكل | ‏٤٥٫٥٠ ج.م.‏ | فطار
    ٢٨‏/٠٩‏/٢٠٢٦ | فواتير | ‏١٬٢٠٠٫٠٠ ج.م.‏ | كهربا
    month: أكتوبر ٢٠٢٦: ‏٧٥٫٥٠ ج.م.‏  /  سبتمبر ٢٠٢٦: ‏١٬٢٠٠٫٠٠ ج.م.‏
-- مبلغ 12.345 وتاريخ 2026-02-30
    errors = اكتب مبلغ بالأرقام، وبحد أقصى قرشين بعد العلامة | · | التاريخ مش صحيح
    aria-invalid: amount=true cat=false date=true   focused: amount   rows still: 3
-- عدّل «فطار»: الخانة = 45.50 · الزرار = احفظ التعديل · الإلغاء ظاهر
-- كتبت ٥٠ (أرقام عربي) واحفظ
    ٠٥‏/١٠‏/٢٠٢٦ | أكل | ‏٥٠٫٠٠ ج.م.‏ | فطار وقهوة
    month: أكتوبر ٢٠٢٦: ‏٨٠٫٠٠ ج.م.‏
-- امسح «كهربا»
    month: أكتوبر ٢٠٢٦: ‏٨٠٫٠٠ ج.م.‏     (سبتمبر اختفى لوحده)
-- reload                         -> نفس البندين
-- reload بـ JSON مقطوع            -> فاضي، و «لسه مفيش مصاريف» ظاهرة
-- reload ببند سليم + ٢ بايظين     -> البند السليم بس
~~~

---

## ٩. التنزيل: CSV

~~~js
$('#export').addEventListener('click', () => {
  const blob = new Blob([toCSV(state.items)], { type: 'text/csv;charset=utf-8' });
  const a = el('a', '');
  a.href = URL.createObjectURL(blob);
  a.download = 'expenses-' + today() + '.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 0);
});
~~~

- [[Blob]] ملف في الذاكرة. [[URL.createObjectURL]] بيدّيله عنوان مؤقت [[blob:...]].
- [[a.download]] بيخلي الضغطة **تنزّل** بدل ما تفتح، وبالاسم ده.
- [[a.click()]] بيضغط على لينك مش متضاف للصفحة أصلًا. وده شغّال في المتصفحات الحالية.
- [[revokeObjectURL]] بيفضّي الذاكرة. في [[setTimeout]] عشان التنزيل ياخد فرصته يبدأ الأول.

### الملف اللي طلع

~~~text اتشغّل فعلًا · node test-csv.mjs
\ufeffdate,category,amount,note
2026-10-05,أكل,50.00,فطار وقهوة
2026-10-06,مواصلات,30.00,"مترو, وتاكسي"
2026-10-07,خروج,19.99,"قال ""حلو"""
2026-10-08,تاني,1.00,'=1+1
first bytes: ef bb bf 64 61 74
~~~

وعشان أتأكد إن برنامج تاني بيقراه صح، فتحته بـ PowerShell:

~~~text اتشغّل فعلًا · Import-Csv out.csv
date       category amount note
----       -------- ------ ----
2026-10-05 أكل      50.00  فطار وقهوة
2026-10-06 مواصلات  30.00  مترو, وتاكسي
2026-10-07 خروج     19.99  قال "حلو"
2026-10-08 تاني     1.00   '=1+1
~~~

الفاصلة جوه «مترو, وتاكسي» فضلت جوه الخانة، وعلامات التنصيص رجعت زي ما اتكتبت، و [[=1+1]] متنفذتش.

---

## ١٠. اتشغّل على إيه

| إيه | على إيه |
|---|---|
| [[expenses.js]] | Node 24.22 مباشرة: ٩ مدخلات للتحقق، و ٦ حالات حفظ، والـ CSV |
| [[app.js]] و [[index.html]] | jsdom 30.1.3 (متسطّب محلي في فولدر التجربة)، بنفس الملفات من غير تعديل |
| الـ CSV | اتقرا بـ [[Import-Csv]] في PowerShell 7 |
| الـ timezone | [[$env:TZ='America/New_York']] في PowerShell |

**ومش متجرّب:** فتح الملف في Excel نفسه (الـ BOM ده المعروف في وثائق Microsoft)، والتنزيل الفعلي (jsdom مفيهوش [[URL.createObjectURL]]).

---

## ملخص الخطوات

| # | الخطوة | الفخ اللي بتقفله |
|---|---|---|
| ١ | الفورم بـ [[novalidate]] و [[inputmode]] | رسايل المتصفح الإنجليزي، و [[type="number"]] اللي بيخبّي الغلط |
| ٢ | قروش بدل جنيه | [[19.99 * 100]] = [[1998.999…]] |
| ٣ | [[validate]] بـ regex و [[hasOwn]] | [[Number('')]] = 0، و [[toString]]، و ٣٠ فبراير |
| ٤ | [[totalsBy]] بـ [[Map]] | كود تجميع مكرر لكل نوع إجمالي |
| ٥ | [[Intl]] مع [[timeZone: 'UTC']] | اليوم بيرجع يوم برّه مصر |
| ٦ | [[load]] بتفحص كل بند | بند بايظ بيوقّع التطبيق |
| ٧ | [[textContent]] بس | XSS من الملاحظة |
| ٨ | مستمع واحد على الجدول | أزرار بتفقد مستمعيها بعد كل رسمة |
| ٩ | CSV فيه BOM وهروب | عربي ملخبط، وأعمدة متزحلقة، و formula injection |

## الخلاصة

- الفلوس **قروش رقم صحيح**، والتحويل لجنيه وقت العرض بس.
- متثقش في [[Number]]: افحص **شكل** النص بـ regex الأول.
- [[Object.hasOwn]] مش [[in]] لما تفحص مفتاح جاي من برّه.
- تاريخ اتعمل UTC يتعرض UTC.
- المنطق في ملف من غير DOM، فيتجرّب في ثانية.`,
          try: R`ابني التطبيق من الأربع ملفات، وشغّله بـ [[python3 -m http.server 8000]]. ضيف ٣ مصاريف في شهرين مختلفين، وواحد منهم ملاحظته «مترو, وتاكسي». عدّل واحد، وامسح واحد، واعمل reload. وبعدين نزّل الـ CSV وافتحه في Excel أو Google Sheets. وآخر حاجة: افتح DevTools، وفي Console اكتب [[localStorage.setItem('expenses', '{"version":1,"items":[')]] واعمل reload.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير ما تشغّل، اكتب [[validate]] هترجّع إيه لكل واحد: [[{ amount: ' 7 ', cat: 'fun', date: '2026-12-31' }]] و [[{ amount: '7.', cat: 'fun', date: '2026-12-31' }]] و [[{ amount: '٧٫٥', cat: 'fun', date: '2026-12-31' }]] و [[{ amount: '7', cat: 'constructor', date: '2026-12-31' }]] و [[{ amount: '7', cat: 'fun', date: '2026-11-31' }]]. وبعدين شغّلهم في Node.`, done: R`كتبت توقعك قبل التشغيل، والتلاتة الأولانيين: مقبول بـ [[700]] قرش، ومرفوض (النقطة من غير أرقام بعدها)، ومقبول بـ [[750]]. والاتنين الأخرانيين مرفوضين: [[constructor]] زي [[toString]] بالظبط، و ٣١ نوفمبر مش موجود. وتقدر تقول لكل غلطة في توقعك السطر اللي في [[validate]] كان سببها.` },
            { lvl: 'تطبيق', t: R`**ابني حاجة:** ضيف [[<select id="month">]] فوق الجدول فيه «كل الشهور» وكل شهر فيه مصاريف (من [[totalsBy]] نفسها). لما تختار شهر، الجدول وإجمالي التصنيفات بيعرضوا الشهر ده بس، و «حسب الشهر» يفضل يعرض كل الشهور. الفلتر جزء من [[state]] ومش بيتحفظ.`, done: R`تختار أكتوبر: الجدول فيه بنود أكتوبر بس، ومجموع «حسب التصنيف» = رقم أكتوبر في «حسب الشهر» بالظبط. وتضيف بند في سبتمبر والفلتر على أكتوبر: البند مش ظاهر في الجدول بس سبتمبر زاد في «حسب الشهر». ومفيش ولا [[innerHTML]] اتضاف.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** النسخة دي «شغّالة» بس فيها ٣ باجات: [[if (!(input.cat in CATS)) errors.cat = '...']] و [[const value = { cents: Number(raw) * 100, ... }]] و [[day.format(new Date(it.date))]] مع [[day]] من غير [[timeZone]]. لكل باج: اكتب مدخل أو موقف بيكشفه في Node، وشغّله قبل وبعد التصليح.`, done: R`عندك ٣ أسطر Node بتطبع الغلط قبل التصليح: تصنيف [[toString]] بيعدّي، و [[19.99]] بيتخزن [[1998.9999999999998]]، و [[2026-10-01]] بيتعرض ٣٠/٩ مع [[$env:TZ='America/New_York']]. وبعد التصليح نفس الأسطر بتطبع الصح.` },
          ],
          deep: {
            why: R`لأن تطبيق المصاريف **صغير كفاية** إنك تخلصه في يوم، و**حقيقي كفاية** إنه يقع في كل الفخاخ اللي بتقابلها في أي نظام فيه فلوس: الكسور، والتواريخ، والمدخلات الغريبة، والداتا المحفوظة البايظة، والتصدير لبرنامج تاني. كل فخ منهم اتشاف هنا بتشغيل حقيقي مش بالكلام.`,
            how: R`**الترتيب اللي بنيت بيه، وتقدر تمشي عليه في أي تطبيق:**

1. **المنطق الأول، من غير DOM.** [[expenses.js]] اتكتب واتجرّب في Node بـ ٩ مدخلات قبل ما يبقى فيه HTML أصلًا. لما بتلاقي باج في [[validate]]، بتصلّحه وتشغّل السكربت تاني في ثانية.
2. **شكل الداتا المحفوظة بيتقرر بدري:** [[{ id, cents, cat, date, note }]]. قروش رقم صحيح، والتصنيف مفتاح إنجليزي، والتاريخ نص [[YYYY-MM-DD]]. كل قرار منهم بيشيل فئة باجات كاملة: الكسور، وتغيير أسامي التصنيفات، والـ timezone.
3. **الـ HTML بعدين**، وكل خانة ليها [[name]] بنفس اسم الحقل، عشان [[FormData]] يطلّع الـ object جاهز.
4. **[[app.js]] بيوصّل بس:** بيقرا الفورم، ويسأل [[validate]]، ويغيّر [[state]]، وينادي [[commit]]. مفيش فيه ولا قاعدة عن «المبلغ الصح شكله إيه».
5. **التجربة في jsdom** بنفس الملفات، بـ [[requestSubmit()]] و [[click()]] زي اليوزر بالظبط.

**والعرض منفصل عن التخزين في كل حتة:** [[cents]] بيتخزن و [[money.format(cents / 100)]] بيتعرض، و [[food]] بيتخزن و [[CATS.food]] بيتعرض، و [[2026-10-05]] بيتخزن و [[day.format]] بيتعرض. ولو غيّرت لغة العرض بكره، مفيش بند محفوظ هيتغيّر.`,
            when: R`أي مرة التطبيق فيه أرقام بتتجمع (فلوس، نقط، أوزان)، أو تواريخ بتتعرض، أو داتا بتتصدّر. ونفس البنية (منطق من غير DOM + [[app.js]] بيوصّل) تنفع لأي تطبيق فورم وجدول: حجوزات، أو مخزن، أو درجات طلبة.`,
            mistakes: R`تخزين الجنيه كسور وجمعه ([[0.1 + 0.2]]). [[Number(x)]] من غير فحص شكل ([[Number('')]] بيبقى [[0]]). [[in]] بدل [[Object.hasOwn]]. [[new Date('2026-10-01')]] بتتعرض من غير [[timeZone: 'UTC']]. تخزين النص المنسّق ([[٤٥٫٥٠ ج.م.]]) بدل الرقم. CSV من غير BOM ومن غير هروب للفاصلة. و [[innerHTML]] عشان «الملاحظة قصيرة».`
          },
          sol: R`اللي هتشوفه لو مشيت على «جرّب» بالظبط (نفس الخطوات اتشغّلت في jsdom، والـ CSV اتقرا بـ [[Import-Csv]]):`,
          solCode: R`// بعد ٣ مصاريف (٤٥.٥ أكل ٥/١٠، و ٣٠ مواصلات ٦/١٠ «مترو, وتاكسي»، و ١٢٠٠ فواتير ٢٨/٩):
//   حسب التصنيف: فواتير: ‏١٬٢٠٠٫٠٠ ج.م.‏  /  أكل: ‏٤٥٫٥٠ ج.م.‏  /  مواصلات: ‏٣٠٫٠٠ ج.م.‏
//   حسب الشهر:   أكتوبر ٢٠٢٦: ‏٧٥٫٥٠ ج.م.‏  /  سبتمبر ٢٠٢٦: ‏١٬٢٠٠٫٠٠ ج.م.‏
// عدّل الأكل لـ ٥٠ وامسح الفواتير:
//   حسب الشهر:   أكتوبر ٢٠٢٦: ‏٨٠٫٠٠ ج.م.‏      (سبتمبر اختفى)
// reload: نفس البندين.
// الـ CSV (أول ٣ بايتات ef bb bf):
//   date,category,amount,note
//   2026-10-05,أكل,50.00,
//   2026-10-06,مواصلات,30.00,"مترو, وتاكسي"
// بعد setItem بـ JSON مقطوع و reload:
//   الجدول فاضي، و «لسه مفيش مصاريف.» ظاهرة، وزرار CSV مقفول، ومفيش error في الـ Console.
//   (وأول بند تضيفه بعدها بيكتب فوق النص البايظ — شوف ٦ في الشرح.)`
        },
        {
          cmd: "مشروع: بحث بـ debounce",
          title: "بحث بيستنى انت تخلص",
          learn: R`تبني خانة بحث بتكلّم سيرفر: بتستنى لحد ما تخلص كتابة، وبتلغي الطلب القديم، وبتفتكر اللي دوّرت عليه، وبتتحرك بالكيبورد.`,
          out: R`كتابة [[startsWith]] بسرعة (١٠ حروف) بتبعت طلب **واحد** بدل ٩، والنتيجة اللي على الشاشة دايمًا بتاعة آخر حاجة كتبتها.`,
          use: {
            prog: R`أي خانة بحث أو autocomplete في أي موقع فيها التلات حاجات دول: debounce عشان متضربش السيرفر مع كل حرف، وإلغاء عشان الرد القديم ميكتبش فوق الجديد، وكاش عشان الرجوع لكلمة قديمة يبقى فوري.`,
            work: R`«البحث بيعرض نتايج غلط ساعات» — باج مشهور ومش بيتكرر عندك على الـ localhost لأن الشبكة سريعة. هنا هتشوفه بعينك بتأخير عشوائي، وهتقيس هو بيحصل كام مرة من ٢٠.`,
            cs: R`الـ race condition (ردين بيوصلوا بترتيب غير اللي اتبعتوا بيه)، والـ closure اللي ماسك الـ timer في [[debounce]]، و LRU cache بسيط بـ [[Map]].`,
          },
          desc: R`هنبني خانة بحث عن methods في JavaScript، بتكلّم سيرفر Node صغير على جهازك: بتستنى ٣٠٠ ميلي ثانية بعد آخر حرف قبل ما تبعت، وبتلغي أي طلب قديم لسه مردّش، وبتفتكر النتايج اللي جاتلها قبل كده، وبتتحرك فيها بالأسهم و Enter.

والسيرفر بيتأخر عن قصد (من ٢٠٠ لـ ٦٠٠ ميلي ثانية عشوائي) وبيكتب في الترمنال كل طلب بيوصله، عشان **تشوف بعينك** الفرق:

| الطريقة | كتابة [[startsWith]] بسرعة (حرف كل ١٢٠ms) | اتقاس |
|---|---|---|
| من غير debounce | ٩ طلبات (الحرف الأول لوحده مش بيتبعت)، و ٨ منهم اتلغوا | ٩ |
| مع debounce ٣٠٠ms | طلب واحد بعد آخر حرف بـ ٣٠٠ms | ١ |
| من غير debounce ومن غير إلغاء | ٩ طلبات، وفي ٣ لـ ٥ مرات من ٢٠ الشاشة عرضت نتايج كلمة **قديمة** | ٣–٥ / ٢٠ |

الدروس اللي بنستخدمها: «debounce و throttle» (هنكتبه بإيدنا هنا)، و «fetch و AbortController»، و «closure»، و «event delegation»، و «Map و Set».

| الملف | فيه إيه | السطور |
|---|---|---|
| [[data.json]] | ١٩٣ method حقيقي من Node (اسم وصاحبه) | ١٩٥ |
| [[server.js]] | بيقدّم الملفات، و [[/api/search]] بتأخير وعدّاد | ٤٠ |
| [[debounce.js]] | الـ debounce بإيدك | ١٠ |
| [[index.html]] و [[style.css]] | الخانة والليستة | ٢٩ |
| [[app.js]] | الحالة والرسم والبحث والكيبورد | ١٣١ |`,
          example: R`// app.js (الجزء المهم): debounce، وإلغاء الطلب القديم، والكاش
import { debounce } from './debounce.js';

const cache = new Map();
const CACHE_MAX = 50;
let controller = null;

function remember(q, data) {
  cache.delete(q);
  cache.set(q, data);
  if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value);
}

async function search(raw) {
  const q = raw.trim().toLowerCase();
  controller?.abort();
  if (q.length < 2) return set({ phase: q ? 'short' : 'idle', q, data: [], active: -1, busy: false });
  if (cache.has(q)) {
    const data = cache.get(q);
    return set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  }
  controller = new AbortController();
  const { signal } = controller;
  set({ phase: 'loading', q, busy: true });
  try {
    const url = new URL('/api/search', location.href);
    url.searchParams.set('q', q);
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error('السيرفر رد بـ ' + res.status);
    const data = await res.json();
    remember(q, data);
    set({ phase: data.length ? 'ok' : 'empty', q, data, active: -1, busy: false });
  } catch (e) {
    if (e.name === 'AbortError') return;
    set({ phase: 'error', q, data: [], error: e.message, active: -1, busy: false });
  }
}

const debouncedSearch = debounce(search, 300);
input.addEventListener('input', () => debouncedSearch(input.value));`,
          lines: [
            R`بنستورد [[debounce]] من ملفها. هي في ملف لوحدها عشان تتجرّب في Node بـ [[node --test]] من غير صفحة (التمرين التالت).`,
            R`الكاش: [[Map]] المفتاح فيها الكلمة اللي اتدوّر عليها ([[map]])، والقيمة النتايج اللي رجعت. [[Map]] مش object عشان بتحافظ على ترتيب الإضافة، وده اللي هنشيل بيه الأقدم.`,
            R`أقصى عدد كلمات في الكاش. من غيره، اليوزر اللي فاتح الصفحة طول اليوم بيدوّر على مئات الكلمات والذاكرة بتكبر من غير حد (درس «memory leaks»).`,
            R`الـ [[AbortController]] بتاع **آخر** طلب اتبعت. متعرّف برّه [[search]] عشان كل نداء جديد يلاقي اللي قبله ويلغيه. [[null]] في الأول لأن لسه مفيش طلب.`,
            R`[[remember]] بتحط نتيجة في الكاش، وبتشيل الأقدم لو الكاش اتملى.`,
            R`بنمسح المفتاح الأول لو موجود، عشان لما نحطه تاني يروح **آخر** الترتيب. كده الكلمة اللي اتدوّر عليها من شوية عمرها ما تبقى «الأقدم».`,
            R`نحط الكلمة ونتايجها. [[set]] على مفتاح جديد بيحطه في آخر الـ [[Map]].`,
            R`لو عدّينا الحد، [[cache.keys().next().value]] بيدّينا **أول** مفتاح (الأقدم، لأن [[Map]] بتمشي بترتيب الإضافة) ونمسحه. ده LRU بسيط (Least Recently Used) في ٣ سطور.`,
            R`قفلة [[remember]].`,
            R`[[search]] هي اللي بتتنادي بعد ما اليوزر يبطّل كتابة. [[async]] عشان جواها [[await]] على [[fetch]]، و [[raw]] هو النص زي ما هو في الخانة.`,
            R`بنوحّد الكلمة: [[trim]] بيشيل المسافات، و [[toLowerCase]] عشان [[Map]] و [[map]] يبقوا نفس البحث ونفس مفتاح الكاش. من غيره [[ map]] بمسافة كانت هتبعت طلب جديد لنفس النتيجة.`,
            R`**إلغاء الطلب اللي قبله** لو لسه شغّال. [[?.]] لأن أول مرة [[controller]] بـ [[null]]. ولازم يحصل **قبل** أي [[return]]: حتى لو الكلمة الجديدة قصيرة أو في الكاش، الرد القديم لو وصل بعدين هيكتب فوقها. والرد اللي اتلغى بيرمي [[AbortError]] في الـ [[await]] بتاعه.`,
            R`أقل من حرفين: منبعتش. حرف واحد زي [[s]] بيطابق نص الداتا، وده بطء وملوش فايدة. لو الخانة فاضية الحالة [[idle]] (مفيش رسالة)، ولو فيها حرف واحد [[short]] (رسالة «اكتب حرفين على الأقل»). و [[set]] بتغيّر الحالة وترسم.`,
            R`الكلمة دي اتدوّر عليها قبل كده؟ يبقى مفيش طلب خالص.`,
            R`نجيب النتايج المحفوظة من الـ [[Map]]. هي نفس المصفوفة اللي السيرفر رجّعها أول مرة، من غير نسخ.`,
            R`ونعرضها على طول بنفس شكل الرد الجديد. ولو كانت مصفوفة فاضية الحالة [[empty]] مش [[ok]]: الكاش بيفتكر «مفيش نتايج» كمان، فكتابة [[zzzz]] تاني مش بتبعت طلب.`,
            R`قفلة الـ [[if]] بتاع الكاش.`,
            R`[[AbortController]] جديد لكل طلب. الـ controller بيتلغي **مرة واحدة** بس، فمينفعش نستخدم واحد لكل الطلبات.`,
            R`[[signal]] هو اللي بيتبعت لـ [[fetch]]. وماسكينه في متغير محلي عشان لو [[controller]] اتغيّر في نداء تاني، الطلب ده لسه عارف الـ signal بتاعه هو.`,
            R`حالة التحميل: الرسالة بتبقى «بيدوّر على «startswith»…»، و [[busy: true]] بيخلي الليستة القديمة باهتة ([[aria-busy]] في الـ CSS) **من غير ما تختفي**، عشان الشاشة متنطّش مع كل حرف.`,
            R`كل اللي ممكن يرمي جوه [[try]]: الشبكة، والسيرفر، والـ JSON، والإلغاء.`,
            R`بنبني العنوان بـ [[new URL]] جنب عنوان الصفحة. [[location.href]] بيخليه يشتغل على أي بورت، وفي jsdom كمان (هناك [[fetch]] بتاع Node مش بيقبل عنوان نسبي).`,
            R`[[searchParams.set]] بيعمل encoding للكلمة لوحده: [[a&b]] بتبقى [[a%26b]] مش parameter تاني، والعربي والمسافات بيتبعتوا صح. لو لزقت النص بإيدك في العنوان، كلمة فيها [[&]] أو [[#]] هتبوّظ الطلب.`,
            R`[[fetch]] مع [[signal]]: لو حد نادى [[abort()]] قبل ما الرد يكمل، الـ [[await]] ده بيرمي [[AbortError]]. الرسالة في Node بنصها: [[This operation was aborted]] (اتجرّب). والسيرفر بيشوف الاتصال اتقفل، وبيطبع «اتلغى من المتصفح».`,
            R`[[fetch]] **مش بترمي** على 500 أو 404 (درس «مشروع — fetch مش بترمي على 404»). فبنفحص [[res.ok]] بنفسنا ونرمي خطأ فيه الرقم، عشان يروح للـ [[catch]] ويظهر كحالة خطأ.`,
            R`[[res.json()]] بيقرا الرد ويحوّله. هو كمان [[await]] لأن الرد بيوصل حتة حتة، وهو كمان ممكن يرمي [[AbortError]] لو الإلغاء حصل في النص.`,
            R`النتيجة سليمة: تتحفظ في الكاش. الأخطاء **مش** بتتحفظ، عشان المحاولة الجاية تجرّب تاني فعلًا.`,
            R`نعرض النتايج: [[ok]] لو فيه، [[empty]] لو المصفوفة فاضية. و [[active: -1]] يعني مفيش اختيار بالأسهم لسه، و [[busy: false]] بيرجّع الليستة لونها.`,
            R`أي خطأ وصل هنا: شبكة، أو 500، أو JSON بايظ، أو إلغاء.`,
            R`**الإلغاء مش خطأ.** ده احنا اللي لغيناه لأن فيه كلمة أحدث. لو عرضنا رسالة خطأ هنا، كل حرف سريع كان هيعمل رسالة حمرا تظهر وتختفي. فبنرجع ساكتين.`,
            R`أي خطأ تاني يظهر لليوزر بنصه: [[السيرفر رد بـ 500]]، أو [[fetch failed]] لو السيرفر مقفول (ده نص Node، و Chrome بيقول [[Failed to fetch]] حسب وثائق MDN). والنتايج القديمة بتتشال عشان متتفهمش إنها بتاعة الكلمة دي.`,
            R`قفلة الـ [[catch]].`,
            R`قفلة [[search]].`,
            R`نسخة من [[search]] متغلّفة بـ debounce ٣٠٠ms: كل نداء بيلغي الـ timer اللي قبله ويبدأ من جديد، فـ [[search]] نفسها بتتنادي بس لما يعدّي ٣٠٠ms من غير ولا حرف. ٣٠٠ أطول من الفرق بين حرفين عند أي حد بيكتب بسرعة (١٢٠ لـ ٢٠٠ms)، وأقصر من إن اليوزر يحس إنه مستني.`,
            R`مع كل حرف (حدث [[input]] مش [[keyup]]: [[input]] بيمسك اللزق والمسح بالماوس والكيبورد العربي) بننادي النسخة المتأجّلة بالنص الحالي. والحروف اللي في النص بتلغي بعض.`,
          ],
          teach: R`## ٠. هنبني إيه

~~~text الشكل (اتشغّل في jsdom، والنتيجة حقيقية من data.json)
دوّر على method في JavaScript
اسم الـ method
[ to                    ]
19 نتيجة لـ «to»
  ▸ toReversed      Array.prototype      ← متعلّم بالسهم
    toSorted        Array.prototype
    toSpliced       Array.prototype
    toLocaleString  Array.prototype
    ...
اخترت: Array.prototype.toReversed
~~~

### الملفات

~~~text
search/
├── data.json      ١٩٣ method حقيقي
├── server.js      سيرفر Node من غير مكتبات (٤٠ سطر)
├── debounce.js    ١٠ سطور
├── index.html
├── style.css
└── app.js         ١٣١ سطر
~~~

**ليه سيرفر محلي مش API عام؟** عشان تتحكم في التأخير وتشوف كل طلب بيوصل في الترمنال. الـ API العام سريع ومش بيقولك وصله كام طلب، فالباج مش هيبان.

---

## ١. الداتا

بدل ما نألّف داتا، طلّعتها من Node نفسه: كل الـ functions اللي على [[Array.prototype]] و [[String.prototype]] و [[Object]] و [[Math]] و [[Promise]] و [[Number]] و [[JSON]] و [[Map.prototype]] و [[Set.prototype]]:

~~~js gen-data.cjs
const owners = { 'Array.prototype': Array.prototype, 'String.prototype': String.prototype, Object, Math, Promise, Number, JSON, Array, 'Map.prototype': Map.prototype, 'Set.prototype': Set.prototype };
const out = [];
for (const [o, obj] of Object.entries(owners))
  for (const n of Object.getOwnPropertyNames(obj)) {
    if (['constructor', 'length', 'name', 'prototype', 'size'].includes(n) || /^[A-Z_0-9]+$/.test(n) || n.startsWith('__')) continue;
    const d = Object.getOwnPropertyDescriptor(obj, n);
    if (typeof d.value !== 'function') continue;
    out.push({ id: out.length + 1, name: n, owner: o });
  }
require('fs').writeFileSync('data.json', '[\n' + out.map(d => JSON.stringify(d)).join(',\n') + '\n]\n');
~~~

~~~text اتشغّل فعلًا · Node 24.22
193 method
[
{"id":1,"name":"at","owner":"Array.prototype"},
{"id":2,"name":"concat","owner":"Array.prototype"},
~~~

**مفاجأة وانا بكتبه:** أول نسخة كانت بتقرا [[obj[n] ]] على طول، ووقعت بـ [[TypeError: Method get Map.prototype.size called on incompatible receiver #<Map>]]. لأن [[size]] getter، وقرايته على [[Map.prototype]] نفسه (مش على Map حقيقية) بترمي. الحل [[Object.getOwnPropertyDescriptor]]: بيقرا **وصف** الخاصية من غير ما يشغّل الـ getter.

---

## ٢. السيرفر

~~~js server.js
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = Number(process.env.PORT) || 8000;
const ROOT = import.meta.dirname;
const DATA = JSON.parse(await fs.readFile(path.join(ROOT, 'data.json'), 'utf8'));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
let count = 0;

async function api(url, res) {
  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const n = ++count;
  console.log($__bt#$__{n} q=$__{q}$__bt);
  res.on('close', () => { if (!res.writableFinished) console.log($__bt#$__{n} اتلغى من المتصفح$__bt); });
  await new Promise(r => setTimeout(r, 200 + Math.random() * 400));
  if (res.destroyed) return;
  if (q === '500') { res.writeHead(500); return res.end('boom'); }
  const hits = DATA.filter(d => d.name.toLowerCase().includes(q)).slice(0, 20);
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(hits));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/search') return api(url, res);
  const file = path.join(ROOT, url.pathname === '/' ? 'index.html' : url.pathname);
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  try {
    const body = await fs.readFile(file);
    res.writeHead(200, { 'content-type': (TYPES[path.extname(file)] ?? 'application/octet-stream') + '; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

server.listen(PORT, () => console.log($__bthttp://localhost:$__{PORT}$__bt));
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[import.meta.dirname]] | فولدر الملف نفسه (Node 20.11 وأحدث)، عشان السيرفر يلاقي ملفاته مهما شغّلته منين |
| [[await]] في أول الملف | top-level await: مسموح في ES modules، فالداتا بتتقرا مرة واحدة قبل ما السيرفر يفتح |
| [[++count]] | رقم لكل طلب، عشان تقرا اللوج وتعرف مين اتلغى |
| [[res.on('close')]] مع [[writableFinished]] | لو الاتصال اتقفل **قبل** ما نكمّل الرد، يبقى المتصفح لغاه. ده اللي بيطبع «اتلغى» |
| [[setTimeout]] عشوائي | الشبكة الحقيقية: كل طلب بياخد وقت مختلف، فالردود ممكن توصل بغير ترتيبها |
| [[res.destroyed]] | الطلب اتلغى وإحنا مستنيين، فمنكتبش رد لاتصال مقفول |
| [[q === '500']] | باب نجرّب منه حالة الخطأ: اكتب [[500]] في الخانة |
| [[slice(0, 20)]] | أقصى ٢٠ نتيجة. الليستة الطويلة محدش بيقراها، والرد بيبقى أصغر |
| [[file.startsWith(ROOT + path.sep)]] | حماية من [[/../../secret]]: لو المسار طلع برّه الفولدر يبقى 403 |

~~~text اتشغّل فعلًا
$ PORT=8133 node server.js
http://localhost:8133
$ curl "http://localhost:8133/api/search?q=map"
[{"id":27,"name":"flatMap","owner":"Array.prototype"},{"id":28,"name":"map","owner":"Array.prototype"}]
~~~

---

## ٣. index.html

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>دوّر على method</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>دوّر على method في JavaScript</h1>
    <label for="q">اسم الـ method</label>
    <input id="q" dir="ltr" autocomplete="off" spellcheck="false"
           role="combobox" aria-controls="results" aria-expanded="false" aria-autocomplete="list">
    <p id="status" role="status"></p>
    <ul id="results" role="listbox" dir="ltr"></ul>
    <p>اخترت: <output id="picked">—</output></p>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

- **[[dir="ltr"]] على الخانة والليستة بس**: الصفحة عربي، بس أسامي الـ methods إنجليزي. من غيره [[toString]] بيتكتب من اليمين والمؤشر بيتلخبط.
- **[[role="combobox"]] و [[role="listbox"]]**: قارئ الشاشة بيفهم إن دي خانة بحث ليها اقتراحات. و [[aria-expanded]] بتتغيّر من الكود لما فيه نتايج.
- **[[autocomplete="off"]]**: من غيره المتصفح بيفتح اقتراحاته هو فوق اقتراحاتنا.

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 34rem; margin: 2rem auto; padding: 0 1rem; }
input { width: 100%; font-size: 1.1rem; padding: .5rem; box-sizing: border-box; }
#results { list-style: none; padding: 0; margin: 0; max-height: 18rem; overflow: auto; }
#results li { padding: .35rem .5rem; cursor: pointer; }
#results li[aria-selected="true"] { background: #1a73e8; color: #fff; }
#results[aria-busy="true"] { opacity: .5; }
small { opacity: .7; margin-inline-start: .5rem; }
[data-phase="error"] { color: #b00020; }
~~~

الـ CSS بيقرا حالة الصفحة من الـ attributes ([[aria-selected]] و [[aria-busy]] و [[data-phase]])، فالكود مش محتاج يضيف ويشيل classes.

---

## ٤. debounce بإيدك

~~~js debounce.js
export function debounce(fn, ms) {
  let timer;
  const wrapped = (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  wrapped.cancel = () => clearTimeout(timer);
  return wrapped;
}
~~~

- **[[let timer]]** متعرّف جوه [[debounce]] وبيستخدمه [[wrapped]]: ده **closure** (درس «closure»). كل نسخة من [[debounce]] ليها [[timer]] بتاعها لوحدها.
- **[[clearTimeout(timer)]]** بيلغي النداء اللي كان مستني. ده السطر اللي بيعمل الفكرة كلها: كل حرف جديد بيلغي اللي قبله.
- **[[setTimeout(() => fn(...args), ms)]]** بيستنى من الأول. و [[...args]] بيعدّي آخر قيمة بس، لأن اللي قبلها اتلغوا.
- **[[wrapped.cancel]]**: الدوال في JavaScript objects، فنقدر نحط عليها خاصية. هنستخدمها في Escape.

### شوفه بيشتغل

~~~js try-debounce.mjs
import { debounce } from './debounce.js';
const t0 = performance.now();
const ms = () => String(Math.round(performance.now() - t0)).padStart(5) + 'ms';
const search = debounce((q) => console.log(ms(), 'search:', q), 300);
let text = '';
for (const ch of 'startsWith') {
  text += ch;
  console.log(ms(), 'key  :', text);
  search(text);
  await new Promise(r => setTimeout(r, 120));
}
~~~

~~~text اتشغّل فعلًا · node try-debounce.mjs
    0ms key  : s
  123ms key  : st
  248ms key  : sta
  ...
  998ms key  : startsWit
 1123ms key  : startsWith
 1435ms search: startsWith
~~~

١٠ نداءات، و [[search]] اتنادت **مرة واحدة** بعد آخر حرف بـ ٣١٢ms (٣٠٠ + الوقت اللي الـ timer بياخده). وقبل كده ولا مرة، لأن كل حرف جه قبل ما الـ ٣٠٠ تخلص.

**ليه مش throttle؟** الـ throttle بينفّذ مرة كل X ms **وانت بتكتب**، فالكلمة دي (١٠ حروف في ١.١ ثانية) كانت هتبعت حوالي ٤ طلبات (بالحساب، مش متقاس). ده كويس للـ scroll. للبحث احنا عايزين **آخر** كلمة بس، فـ debounce. (المقارنة في «debounce و throttle».)

---

## ٥. الحالة والرسم

~~~js app.js — أوله
import { debounce } from './debounce.js';

const input = document.querySelector('#q');
const list = document.querySelector('#results');
const status = document.querySelector('#status');
const picked = document.querySelector('#picked');

const opts = new URLSearchParams(location.search);
const WAIT = opts.has('nodebounce') ? 0 : 300;
const ABORT = !opts.has('noabort');

const ui = { phase: 'idle', q: '', data: [], error: '', active: -1, busy: false };
const cache = new Map();
const CACHE_MAX = 50;
const stats = { sent: 0, aborted: 0, fromCache: 0 };
window.searchStats = stats;
let controller = null;

function set(patch) {
  Object.assign(ui, patch);
  render();
}
~~~

- **[[?nodebounce]] و [[?noabort]]**: مفاتيح للتجربة بس. افتح [[http://localhost:8000/?nodebounce]] وقارن بنفسك. (في الملف الكامل [[search]] فيها [[if (ABORT)]] قبل الإلغاء، و [[stats.sent++]] و [[stats.aborted++]] و [[stats.fromCache++]]. شلتهم من المثال عشان يبقى أوضح.)
- **[[window.searchStats]]**: اكتبها في الـ Console وانت بتجرّب، هتلاقي العدادات.
- **[[ui]]** هي الحالة كلها في object واحد، و **[[set]]** الطريق الوحيد لتغييرها (بيدمج اللي اتبعت وبيرسم). نفس فكرة «الـ DOM مش مكان الحالة».

### الحالات الخمسة

| [[phase]] | إمتى | الرسالة |
|---|---|---|
| [[idle]] | الخانة فاضية، أو بعد Escape أو الاختيار | مفيش |
| [[short]] | حرف واحد | اكتب حرفين على الأقل |
| [[loading]] | طلب لسه شغّال | بيدوّر على «…» والنتايج القديمة باهتة |
| [[ok]] | فيه نتايج | ١٩ نتيجة لـ «to» |
| [[empty]] | الرد مصفوفة فاضية | مفيش نتايج لـ «zzzz» |
| [[error]] | الشبكة أو السيرفر | حصلت مشكلة: … اكتب تاني عشان تعيد المحاولة |

**ليه الرسالة فيها الكلمة؟** أول نسخة كانت بتقول «1 نتيجة» بس. ولما جرّبت من غير إلغاء، الشاشة كانت بتعرض نتايج [[startswit]] والخانة فيها [[startsWith]]، **والاتنين ليهم نفس النتيجة**، فالغلط مكانش باين. لما الرسالة بقت «1 نتيجة لـ «startswit»» الباج ظهر.

~~~js
function highlight(text, q) {
  const at = text.toLowerCase().indexOf(q);
  if (!q || at < 0) return [text];
  const mark = document.createElement('mark');
  mark.textContent = text.slice(at, at + q.length);
  return [text.slice(0, at), mark, text.slice(at + q.length)];
}

function option(d, i) {
  const li = document.createElement('li');
  li.id = 'opt-' + i;
  li.setAttribute('role', 'option');
  li.setAttribute('aria-selected', String(i === ui.active));
  const owner = document.createElement('small');
  owner.textContent = d.owner;
  li.append(...highlight(d.name, ui.q), owner);
  return li;
}
~~~

**تعليم الحروف من غير [[innerHTML]]:** الطريقة المشهورة [[name.replace(q, '<mark>' + q + '</mark>')]] مع [[innerHTML]] هي بالظبط باب XSS (درس «innerHTML هي الباب»): الكلمة جاية من اليوزر. هنا [[highlight]] بترجّع **مصفوفة**: نص، وعنصر [[<mark>]] نصه بـ [[textContent]]، ونص. و [[append]] لما ياخد نص بيعمله text node، يعني حروف مش HTML.

اتجرّب: كتبت [[<img src=x onerror=alert(1)>]] في الخانة: الرسالة «مفيش نتايج لـ «<img src=x onerror=alert(1)>»» و [[img count 0]].

~~~js
function render() {
  const messages = {
    idle: '',
    short: 'اكتب حرفين على الأقل',
    loading: 'بيدوّر على «' + ui.q + '»…',
    ok: ui.data.length + ' نتيجة لـ «' + ui.q + '»',
    empty: 'مفيش نتايج لـ «' + ui.q + '»',
    error: 'حصلت مشكلة: ' + ui.error + '. اكتب تاني عشان تعيد المحاولة.',
  };
  status.textContent = messages[ui.phase];
  status.dataset.phase = ui.phase;
  list.replaceChildren(...ui.data.map(option));
  list.setAttribute('aria-busy', String(ui.busy));
  input.setAttribute('aria-expanded', String(ui.data.length > 0));
  if (ui.active >= 0) {
    input.setAttribute('aria-activedescendant', 'opt-' + ui.active);
    document.getElementById('opt-' + ui.active).scrollIntoView({ block: 'nearest' });
  } else input.removeAttribute('aria-activedescendant');
}
~~~

- object الرسايل بيخلي كل حالة ليها رسالة في مكان واحد. حالة جديدة = سطر جديد.
- [[aria-activedescendant]] بيقول لقارئ الشاشة «الاختيار دلوقتي العنصر ده» **والمؤشر لسه في الخانة**. فاليوزر يكمّل كتابة عادي.
- [[scrollIntoView({ block: 'nearest' })]] بيحرّك الليستة بس لو الاختيار برّه الجزء الظاهر. (jsdom مفيهوش layout فالدالة دي مش موجودة فيه أصلًا، فحطيت بدالها دالة فاضية في التجربة.)

---

## ٦. البحث نفسه

الكود في المثال. **الترتيب في [[search]] مهم:**

~~~text
١. وحّد الكلمة          trim + toLowerCase
٢. الغي الطلب القديم     قبل أي return
٣. قصيرة؟                 short / idle
٤. في الكاش؟              اعرض على طول، من غير طلب
٥. طلب جديد               controller جديد + loading
٦. الرد                   ok / empty + احفظ في الكاش
٧. الخطأ                  AbortError = سكوت، غيره = error
~~~

**ليه الإلغاء قبل الكاش؟** لو كتبت [[startsWith]] (طلب شغّال) ومسحت ورجعت لـ [[map]] (في الكاش)، الكاش هيعرض [[map]] على طول. ولو مالغيتش، رد [[startsWith]] يوصل بعدها بـ ٢٠٠ms ويكتب فوق [[map]]. ده اتشاف وانا بحرّك سطر الإلغاء تحت.

---

## ٧. القياس: طلب واحد مش عشرة

التجربة: صفحة jsdom بنفس [[app.js]] و [[index.html]]، و [[fetch]] حقيقي لسيرفر حقيقي على البورت 8123، وبنكتب [[startsWith]] حرف حرف بـ [[input.value += ch]] و [[dispatchEvent(new Event('input'))]]، وبنعدّ السطور اللي السيرفر طبعها.

~~~text اتشغّل فعلًا · node test.mjs
-- debounce 300ms, حرف كل 120ms   (١٠ حروف في 1243ms)
   stats {"sent":1,"aborted":0,"fromCache":0}
   السيرفر: #1 q=startswith

-- debounce 300ms, حرف كل 200ms
   stats {"sent":1,"aborted":0,"fromCache":0}
   السيرفر: #2 q=startswith

-- debounce 300ms, حرف كل 350ms   (كتابة بطيئة)
   stats {"sent":9,"aborted":5,"fromCache":0}
   السيرفر: #3 q=st  #4 q=sta  #5 q=star  #5 اتلغى من المتصفح  #6 q=start  #6 اتلغى ... #11 q=startswith

-- ?nodebounce, حرف كل 120ms
   stats {"sent":9,"aborted":8,"fromCache":0}
   السيرفر: #12 q=st  #12 اتلغى من المتصفح  #13 q=sta  #13 اتلغى ... #20 q=startswith
~~~

| الموقف | طلبات | اتلغت | ليه |
|---|---|---|---|
| debounce، كتابة سريعة | **١** | ٠ | ولا فرق بين حرفين وصل ٣٠٠ms |
| debounce، حرف كل ٣٥٠ms | ٩ | ٥ | كل فرق أكبر من ٣٠٠، فكل حرف بقى «آخر حرف». والسيرفر بيتأخر لحد ٦٠٠، فطلبات كتير لسه شغالة لما اللي بعدها اتبعت |
| من غير debounce | ٩ | ٨ | حرف = طلب (إلا الحرف الأول). والإلغاء أنقذ الشاشة، بس السيرفر استلم ٩ |

**يعني الـ debounce مش رقم سحري:** هو بيراهن إن الفرق بين حرفين أقل من ٣٠٠ms. اللي بيكتب ببطء بيبعت طلب مع كل حرف، وده **مقبول**: هو كده كده مستني.

---

## ٨. ليه الإلغاء لازم حتى مع الـ debounce

~~~text اتشغّل فعلًا · ?nodebounce&noabort ، ٢٠ مرة
-- 5/20 runs ended showing results of an older query
   { '1 نتيجة لـ «startswith»': 15, '1 نتيجة لـ «startswit»': 5 }
~~~

واتعادت ٣ مرات: **٣ و ٤ و ٥ من ٢٠**. الطلبات اتبعتت بالترتيب، بس السيرفر بيتأخر عشوائي، فرد [[startswit]] وصل **بعد** رد [[startswith]] وكتب فوقه.

~~~text
الوقت ──────────────────────────────────────────────▶
طلب startswit   ├──────────────────── 560ms ─────────┤ ← وصل الأخير، فكسب
طلب startswith         ├──── 230ms ────┤
~~~

والـ debounce لوحده مش بيقفل الباب ده: اكتب كلمة، واستنى ٣٥٠ms، وكمّل حرف. دلوقتي فيه طلبين شغالين. **الـ debounce بيقلّل الطلبات، والإلغاء بيضمن الترتيب.** محتاج الاتنين.

---

## ٩. الكاش

~~~text اتشغّل فعلًا
-- map:                {"status":"2 نتيجة لـ «map»","results":["flatMap","map"]}   sent:1 fromCache:0
-- فضّيت الخانة:        {"status":"","results":[]}
-- حرف واحد «m»:        {"status":"اكتب حرفين على الأقل","results":[]}
-- map تاني:            {"status":"2 نتيجة لـ «map»", ...}   sent:1 fromCache:1   السيرفر: سطر واحد بس
-- zzzz:                {"status":"مفيش نتايج لـ «zzzz»","results":[]}
~~~

**والمشكلة اللي الكاش بيعملها:** لو الداتا على السيرفر بتتغيّر (منتجات بتتضاف)، الكاش بيعرض نتيجة قديمة لحد ما تعمل reload. هنا الداتا ثابتة فمفيش مشكلة. في تطبيق بجد حط وقت لكل نتيجة ([[{ data, at: Date.now() }]]) وارمي اللي عدّى عليه دقيقة.

---

## ١٠. الكيبورد

~~~js
input.addEventListener('keydown', (e) => {
  const n = ui.data.length;
  if (e.key === 'ArrowDown' && n) {
    e.preventDefault();
    set({ active: (ui.active + 1) % n });
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault();
    set({ active: ui.active <= 0 ? n - 1 : ui.active - 1 });
  } else if (e.key === 'Enter' && ui.active >= 0) {
    e.preventDefault();
    choose(ui.active);
  } else if (e.key === 'Escape') {
    debouncedSearch.cancel();
    controller?.abort();
    set({ phase: 'idle', data: [], active: -1, busy: false });
  }
});

list.addEventListener('mousedown', (e) => {
  const li = e.target.closest('li');
  if (li) choose(Number(li.id.slice(4)));
});
~~~

| الحتة | ليه |
|---|---|
| [[preventDefault()]] على الأسهم | من غيره السهم بيحرّك المؤشر لأول أو آخر الكلمة جوه الخانة |
| [[(ui.active + 1) % n]] | بعد آخر واحد يرجع للأول. الـ [[%]] باقي القسمة |
| [[ui.active <= 0 ? n - 1 : ...]] | السهم لفوق من «مفيش اختيار» أو من الأول يروح للآخر |
| Escape | بيلغي الـ timer **والطلب**، وإلا النتايج هترجع تظهر بعد ٣٠٠ms من غير ما حد طلبها |
| [[mousedown]] مش [[click]] | الـ [[click]] بيحصل بعد [[blur]] الخانة. لو فيه كود بيقفل الليستة عند الـ blur، الليستة هتختفي قبل ما الـ click يوصل |

**باج اتمسك:** أول نسخة كانت [[(ui.active - 1 + n) % n]] للسهم لفوق، زي السهم لتحت. شكلها صح، بس من «مفيش اختيار» ([[-1]]) بتدّي [[n - 2]]: يعني قبل الأخير. اتجرّب بـ ١٩ نتيجة: راحت [[opt-17]]. والنسخة الحالية راحت [[opt-18]].

~~~text اتشغّل فعلًا
-- to: 19 نتيجة لـ «to»   toReversed,toSorted,toSpliced,toLocaleString,toString,...
   ArrowUp من غير اختيار  -> opt-18
   ArrowDown              -> opt-0  toReversed
   Enter                  -> اخترت: Array.prototype.toReversed   الخانة: toReversed   الليستة: 0
~~~

---

## ١١. الأخطاء

~~~text اتشغّل فعلًا
-- كتبت 500:              حصلت مشكلة: السيرفر رد بـ 500. اكتب تاني عشان تعيد المحاولة.   phase=error
-- قفلت السيرفر وكتبت:    حصلت مشكلة: fetch failed. اكتب تاني عشان تعيد المحاولة.
~~~

[[fetch failed]] هو نص Node. في Chrome نفس الموقف بيطلع [[TypeError: Failed to fetch]] (من وثائق MDN، مش متجرّب هنا). وفي الحالتين النوع [[TypeError]]، فمتعتمدش على النص لو عايز تفرّق، اعتمد على [[e.name]].

---

## ١٢. اتشغّل على إيه

| إيه | على إيه |
|---|---|
| [[server.js]] | Node 24.22، و [[curl]] |
| [[app.js]] كله | jsdom 30.1.3 + [[fetch]] بتاع Node لسيرفر حقيقي على 8123 |
| [[debounce.js]] | Node لوحده، وبـ [[node --test]] و [[mock.timers]] (التمرين التالت) |
| أرقام الطلبات | من لوج السيرفر نفسه، مش من الكود اللي بيعدّ |

## ملخص الخطوات

| # | الخطوة | بتمنع إيه |
|---|---|---|
| ١ | سيرفر بتأخير عشوائي ولوج | الباج مستخبي لأن الـ localhost سريع |
| ٢ | [[debounce]] بـ closure و [[clearTimeout]] | طلب مع كل حرف |
| ٣ | [[AbortController]] قبل أي [[return]] | رد قديم يكتب فوق الجديد |
| ٤ | [[AbortError]] = سكوت | رسايل خطأ بتنطّ مع الكتابة |
| ٥ | [[Map]] كـ LRU | طلب مكرر لنفس الكلمة، وذاكرة بتكبر |
| ٦ | [[highlight]] بـ [[textContent]] | XSS من خانة البحث |
| ٧ | الأسهم و [[aria-activedescendant]] | بحث مش بيتستخدم من غير ماوس |

## الخلاصة

- الـ debounce **بيقلّل** الطلبات، والإلغاء **بيضمن** إن آخر كلمة هي اللي على الشاشة. الاتنين مع بعض.
- الإلغاء مش خطأ: اتعامل مع [[AbortError]] بسكوت.
- اكتب الكلمة في رسالة الحالة: الباجات اللي النتيجة فيها شبه بعض بتبان.
- قيس من السيرفر، مش من الكود اللي انت كاتبه.`,
          try: R`ابني الستة ملفات وشغّل [[node server.js]]. افتح [[http://localhost:8000]] و DevTools على تاب Network، واكتب [[startsWith]] بسرعة: عدّ الطلبات في Network وفي الترمنال. وبعدين افتح [[http://localhost:8000/?nodebounce]] واكتبها تاني. وجرّب: [[500]]، و [[zzzz]]، والأسهم و Enter، و Escape وانت بتكتب. وآخر حاجة: اكتب [[map]]، وامسح، واكتب [[map]] تاني، وبص في Console على [[searchStats]].`,
          practice: [
            { lvl: 'سريع', t: R`**قارن وقيس:** في Chrome افتح DevTools، و Network، واختار «Slow 4G» من قايمة الـ throttling. اكتب [[includes]] بسرعة ٣ مرات: مرة عادي، ومرة بـ [[?nodebounce]]، ومرة بـ [[?nodebounce&noabort]]. سجّل لكل مرة: عدد الطلبات، وكام واحد مكتوب جنبه [[(canceled)]]، والنتيجة النهائية بتاعة أنهي كلمة.`, done: R`عندك جدول فيه ٣ صفوف بالأرقام اللي شفتها. العادي فيه طلب واحد، و [[?nodebounce]] فيه طلب لكل حرف من التاني وكلهم [[(canceled)]] إلا الأخير، و [[?nodebounce&noabort]] مفيش ولا [[(canceled)]]. وتقدر تشرح الفرق في جملة لكل صف.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** غيّر سطر السهم لفوق لـ [[set({ active: (ui.active - 1 + n) % n })]]، وشيل [[debouncedSearch.cancel()]] من Escape. لاقي الباجين بالتجربة في المتصفح (من غير ما تبص على الكود الأصلي)، واكتب لكل واحد خطوات تكرّره، وبعدين صلّحهم.`, done: R`كاتب خطوتين بيكرّروا كل باج: (١) اكتب [[to]] واستنى، ودوس سهم لفوق: الاختيار بيروح على قبل الأخير مش الأخير. (٢) اكتب [[fil]] ودوس Escape على طول: الليستة بترجع تظهر لوحدها بعد أقل من ثانية. وبعد التصليح الخطوتين بيدّوا الصح.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** ملف [[debounce.test.mjs]] بـ [[node:test]] و [[mock.timers.enable({ apis: ['setTimeout'] })]]: نادي الـ debounce ١٠ مرات وبين كل مرة [[mock.timers.tick(100)]]، واتأكد إن الدالة اتنادت مرة واحدة بس بآخر قيمة. واختبار تاني لـ [[cancel]]. وبعدين اكسر [[debounce.js]] (شيل [[clearTimeout]]) وشوف الاختبار بيقع.`, done: R`[[node --test debounce.test.mjs]] بيطبع [[pass 2]] و [[fail 0]] في أقل من ١٠٠ms (من غير ما يستنى ٣ ثواني فعلًا). ولما شلت [[clearTimeout]] الاتنين وقعوا، والأول قال [[actual: 8]] و [[expected: 0]] (ده اللي طلع لما اتجرّب).` },
          ],
          deep: {
            why: R`لأن خانة البحث أصغر حتة في أي موقع، وفيها أكتر باجات async في الويب كله: طلبات كتير، وردود بترتيب عشوائي، وإلغاء، وكاش، وحالات تحميل وخطأ. ولو فهمتها هنا بإيدك، [[useDeferredValue]] في React و [[TanStack Query]] بيبقوا اختصارات لحاجة انت عارفها.`,
            how: R`**الفكرة في ٣ طبقات، وكل طبقة بتحل مشكلة مختلفة:**

1. **[[debounce]] بيقرر إمتى تسأل.** closure ماسك timer، وكل حرف بيلغيه ويبدأ من جديد. النتيجة: [[search]] بتتنادي بعد ٣٠٠ms من آخر حرف. اتقاس: ١٠ حروف = نداء واحد بعد 312ms من آخرهم.
2. **[[AbortController]] بيقرر مين يكسب.** كل طلب ليه controller، وأول حاجة في [[search]] إنها تلغي اللي قبله. والطلب الملغي بيرمي [[AbortError]] في الـ [[await]] بتاعه، فمبيوصلش لـ [[set]] أبدًا. اتقاس: من غيره ٣–٥ من ٢٠ مرة الشاشة غلط.
3. **الكاش بيقرر لو محتاج تسأل أصلًا.** [[Map]] بالكلمة، والأقدم بيتشال لما تعدّي ٥٠.

**والحالة واحدة:** [[ui.phase]] فيها واحدة من ستة، و [[render]] بيرسم منها الرسالة والليستة والـ attributes. فمفيش موقف تبقى فيه الرسالة «بيدوّر» والليستة فيها نتايج خطأ.

**وفي React نفس الكلام بالظبط:** [[useEffect]] بيعمل [[AbortController]] ويرجّع [[() => controller.abort()]] كـ cleanup، و [[setTimeout]] جوه نفس الـ effect هو الـ debounce. الشكل اتغيّر والتلات طبقات زي ما هم.`,
            when: R`أي خانة بتكلّم سيرفر مع الكتابة: البحث، والـ autocomplete، و «الاسم ده متاح؟» في التسجيل، والفلاتر اللي بتحدّث النتايج. والإلغاء لوحده (من غير debounce) لأي طلب ممكن يتطلب تاني قبل ما يخلص: تغيير صفحة، أو تاب، أو فلتر.`,
            mistakes: R`debounce من غير إلغاء (الترتيب لسه ممكن يتلخبط). إلغاء بعد [[return]] الكاش مش قبله. عرض [[AbortError]] كرسالة خطأ. [[keyup]] بدل [[input]] (مش بيمسك اللزق). عنوان باللزق ([['?q=' + q]]) بدل [[searchParams]]. [[innerHTML]] عشان تعلّم الحروف. كاش من غير حد. وتجربة على localhost من غير تأخير، فالباج ميبانش.`
          },
          sol: R`ده اللي طلع في التجربة الآلية بنفس الخطوات (jsdom + سيرفر حقيقي)، وفي المتصفح هتشوف نفس الأعداد في Network:`,
          solCode: R`// startsWith بسرعة، عادي:
//   الترمنال:  #1 q=startswith
//   searchStats: {"sent":1,"aborted":0,"fromCache":0}
//   الشاشة:   1 نتيجة لـ «startswith»   startsWith  String.prototype
//
// نفس الكلمة على /?nodebounce:
//   الترمنال:  #2 q=st  #2 اتلغى من المتصفح  #3 q=sta  #3 اتلغى من المتصفح ... #10 q=startswith
//   searchStats: {"sent":9,"aborted":8,"fromCache":0}
//
// 500   -> حصلت مشكلة: السيرفر رد بـ 500. اكتب تاني عشان تعيد المحاولة.
// zzzz  -> مفيش نتايج لـ «zzzz»
// to + ArrowDown + Enter -> اخترت: Array.prototype.toReversed
// Escape وانت بتكتب -> الليستة فاضية، ومفيش طلب بيتبعت بعدها
// map، امسح، map -> searchStats.fromCache زاد 1، والترمنال مطبعش سطر جديد`
        },
        {
          cmd: "مشروع: لعبة كتابة",
          title: "لعبة سرعة الكتابة",
          learn: R`تبني لعبة سرعة كتابة: نص عشوائي، وكل حرف بيتلوّن وانت بتكتب، ووقت وسرعة ودقة حيين، وأحسن نتيجة بتتحفظ، والنص العربي والإنجليزي كل واحد في اتجاهه.`,
          out: R`لعبة شغّالة في ٥ ملفات (١٨٠ سطر)، والوقت فيها مظبوط حتى لو الصفحة علّقت ثانية.`,
          use: {
            prog: R`أي حاجة فيها وقت حي (عدّاد، تايمر، رسم متحرك، لعبة) بتقع في نفس الفخ: إنك **تعدّ** الوقت بدل ما **تقيسه**. وأي حاجة فيها نص عربي بتقع في الاتجاه وتقطيع الحروف.`,
            work: R`اختبارات الكتابة، ومؤقّت الامتحان أونلاين، ومؤقّت الطبخ، وشريط تقدّم الرفع: كلهم وقت حي على الشاشة. و «العدّاد بيقدّم/بيأخّر» شكوى حقيقية سببها [[setInterval]].`,
            cs: R`الفرق بين clock time و counted ticks، و Unicode (code units و code points و graphemes)، والـ bidi algorithm اللي بيرتّب العربي والإنجليزي في سطر واحد.`,
          },
          desc: R`هنبني لعبة: النص بيظهر، وانت بتكتب في خانة تحته، وكل حرف بيبقى أخضر لو صح وأحمر لو غلط، والوقت والسرعة (WPM) والدقة بيتحدّثوا وانت بتكتب، ولما تخلص النتيجة بتتقارن بأحسن نتيجة ليك المحفوظة. وفيه نصوص عربي ونصوص إنجليزي، وكل واحد بيتعرض في اتجاهه.

**الحاجات اللي اتعلمتها وانا ببنيها (كلها اتجرّبت):**

• الوقت **بيتقاس** بـ [[performance.now()]] مش **بيتعدّ** بـ [[setInterval]]: لما الصفحة علّقت ٧٠٠ms، العدّاد قال 2100ms والوقت الحقيقي كان 3015ms.
• [[requestAnimationFrame]] للرسم بس، والحساب من وقت البداية.
• [[Array.from(text)]] مش [[text.split('')]]: [[split]] بيقسم الإيموجي نصّين.
• Chrome 156 بيوصّل الحروف العربي حتى لو كل حرف في [[<span>]] لون مختلف، **بس** [[display: inline-block]] بيقطّعها.
• أول نسخة من «اختار نص عشوائي غير اللي فات» عمرها ما كانت بتختار النص الأخير.

| الملف | فيه إيه | السطور |
|---|---|---|
| [[texts.js]] | النصوص العربي والإنجليزي | ١٥ |
| [[game.js]] | الحسابات من غير DOM: الاختيار والتلوين و WPM والدقة | ٢٩ |
| [[index.html]] و [[style.css]] | الصفحة وألوان الحروف | ٣١ |
| [[app.js]] | اللعبة: الحالة والوقت والأحداث والحفظ | ١٠٥ |`,
          example: R`// game.js — حسابات اللعبة من غير DOM
export function pick(count, last) {
  if (count < 2) return 0;
  if (last < 0 || last >= count) return Math.floor(Math.random() * count);
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last ? i + 1 : i;
}

export function isArabic(text) {
  return /\p{Script=Arabic}/u.test(text);
}

export function marks(target, typed) {
  return target.map((ch, i) => {
    if (i === typed.length) return 'cur';
    if (i > typed.length) return '';
    return typed[i] === ch ? 'ok' : 'bad';
  });
}

export function stats({ target, typed, keystrokes, mistakes }, ms) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
  const minutes = Math.max(ms, 1000) / 60000;
  return {
    wpm: Math.round(correct / 5 / minutes),
    accuracy: keystrokes ? Math.round((keystrokes - mistakes) / keystrokes * 100) : 100,
  };
}

// app.js — الوقت والكتابة
function tick() {
  showStats(performance.now() - game.start);
  game.raf = requestAnimationFrame(tick);
}

input.addEventListener('input', () => {
  if (game.done) return;
  const typed = Array.from(input.value);
  if (!game.start) {
    game.start = performance.now();
    game.raf = requestAnimationFrame(tick);
  }
  for (let i = game.typed.length; i < typed.length; i++) {
    game.keystrokes++;
    if (typed[i] !== game.target[i]) game.mistakes++;
  }
  game.typed = typed;
  paint();
  if (typed.length >= game.target.length) finish();
});`,
          lines: [
            R`[[pick]] بتختار رقم نص عشوائي **غير** النص اللي لسه لاعبه ([[last]])، عشان Esc ميجيبش نفس النص تاني. [[count]] عدد النصوص.`,
            R`لو فيه نص واحد بس، مفيش اختيار: رجّع [[0]]. من غير السطر ده [[pick(1, 0)]] كانت بترجّع [[1]]، يعني نص **مش موجود** (اتجرّب).`,
            R`أول لعبة ([[last]] بـ [[-1]]) أو [[last]] غلط: أي نص من الكل. [[Math.random()]] بيدّي رقم من ٠ لأقل من ١، و [[* count]] و [[Math.floor]] بيحوّلوه لـ [[0]] أو [[1]] أو ... [[count - 1]].`,
            R`**الحيلة:** اختار من [[count - 1]] بس (يعني من غير خانة واحدة)، وبعدين «فوّت» اللي فات. لو عندك ٤ نصوص وآخرهم [[2]]، بنختار من [[0]] و [[1]] و [[2]]...`,
            R`... ولو الرقم اللي طلع [[>=]] اللي فات بنزوّده واحد، فالـ [[2]] بتبقى [[3]]. كده النتيجة [[0]] أو [[1]] أو [[3]]، **بنفس الاحتمال**، ومن غير loop بيعيد لحد ما يطلع رقم مختلف. اتجرّب ١٠,٠٠٠ مرة: [[ [2509, 2448, 2520, 2523] ]] تقريبًا متساويين، والتكرار [[0]].`,
            R`قفلة [[pick]].`,
            R`[[isArabic]] بترد بـ [[true]] لو النص فيه أي حرف عربي، عشان نحدد اتجاهه.`,
            R`[[\p{Script=Arabic}]] بيطابق أي حرف من «الكتابة العربي» في Unicode، والـ [[u]] في الآخر لازم عشان [[\p]] يشتغل. اتجرّب: [[JavaScript]] بـ [[false]]، و [[اتعلم JavaScript]] بـ [[true]]، و [[١٢٣]] بـ [[true]]، **والفاصلة العربي [[،]] بـ [[false]]** لأن Unicode بيعتبرها «مشتركة» (Common) مش عربي.`,
            R`قفلة [[isArabic]].`,
            R`[[marks]] بتقول لكل حرف في النص لونه إيه، من غير ما تلمس الـ DOM: [[target]] حروف النص، و [[typed]] الحروف اللي اتكتبت.`,
            R`[[map]] على حروف النص: لكل حرف [[ch]] ورقمه [[i]] بنرجّع اسم class.`,
            R`الحرف اللي عليه الدور (أول حرف لسه متكتبش) بياخد [[cur]] (خلفية صفرا)، عشان اليوزر يعرف هو فين.`,
            R`الحروف اللي بعده لسه متكتبتش: من غير لون ([['']]).`,
            R`أي حرف اتكتب: [[ok]] (أخضر) لو زي النص، و [[bad]] (أحمر) لو غيره. والمقارنة حرف بحرف، فلو نسيت حرف في النص كل اللي بعده بيبقى أحمر، وده بالظبط اللي بيحصل في أي لعبة كتابة.`,
            R`قفلة الـ [[map]].`,
            R`قفلة [[marks]]. الناتج الحقيقي لـ [[marks(Array.from('cat sat'), Array.from('cas'))]]: [[ok,ok,bad,cur,,,]].`,
            R`[[stats]] بتحسب السرعة والدقة من حالة اللعبة والوقت اللي عدّى بالميلي ثانية. بتاخد الحالة كلها بـ destructuring (بتاخد اللي محتاجاه بس من الـ object).`,
            R`عدّاد الحروف اللي في مكانها صح، بيبدأ من صفر في كل حساب. [[let]] لأننا هنزوّده جوه الـ loop.`,
            R`بنعدّ الحروف اللي في مكانها صح. السرعة بتتحسب من الصح بس: اللي يكتب بسرعة وغلط ميكسبش.`,
            R`الوقت بالدقايق. و [[Math.max(ms, 1000)]] **حد أدنى ثانية**: من غيره، حرف واحد صح بعد 150ms بيطلع [[80]] WPM (اتحسب)، والرقم بيقفز بشكل مجنون أول ما تبدأ. معاه بيطلع [[12]].`,
            R`بنرجّع object فيه الرقمين، الاتنين مقرّبين لأرقام صحيحة للعرض.`,
            R`**WPM (Words Per Minute):** المعيار في كل اختبارات الكتابة إن «الكلمة» = ٥ حروف بالمسافات، مهما كان طول الكلمات الحقيقي. فالحروف الصح ÷ ٥ ÷ الدقايق. ٢٥٠ حرف صح في دقيقة = [[50]] WPM (اتجرّب). والعربي كلماته أطول شوية، بس بنستخدم نفس المعيار عشان الرقم يتقارن.`,
            R`**الدقة:** من كل ضغطة حرف، كام كانت صح **وقت ما اتكتبت**. يعني لو غلطت ومسحت وصلّحت، الغلطة لسه محسوبة. و [[keystrokes ?]] بيحمي من القسمة على صفر قبل أول حرف (بترجّع [[100]]). ٢٦٠ ضغطة منهم ١٠ غلط = [[96]]٪.`,
            R`قفلة الـ object.`,
            R`قفلة [[stats]].`,
            R`[[tick]] بتتنادي مع كل فريم الشاشة بترسمه (حوالي ٦٠ مرة في الثانية) طول ما اللعبة شغالة، وبتحدّث الوقت والسرعة.`,
            R`**الوقت بيتحسب من البداية** في كل فريم: [[performance.now() - game.start]]. مش بنزوّد ١٦ms كل مرة. فلو المتصفح فوّت فريمات (الصفحة علّقت، أو التاب في الخلفية)، أول فريم بعدها بيعرض الوقت الصح على طول.`,
            R`[[requestAnimationFrame(tick)]] بيقول للمتصفح «نادي [[tick]] قبل الرسمة الجاية». وبيرجّع رقم بنحفظه في [[game.raf]] عشان نقدر نلغيه بـ [[cancelAnimationFrame]] لما اللعبة تخلص أو تبدأ من جديد. والمتصفح بيوقّفه لوحده لما التاب مش ظاهر (ده من وثائق MDN)، وده سبب تاني إن الوقت لازم يتقاس مش يتعدّ.`,
            R`قفلة [[tick]].`,
            R`بنسمع لـ [[input]] مش [[keydown]]: [[input]] بيقولك **النص بقى إيه** بعد أي تغيير، سواء كيبورد عربي أو إنجليزي، أو مسح، أو كيبورد الموبايل اللي بيصحّح. أما [[keydown]] فبيقولك «الزرار اتداس»، و [[e.key]] على الموبايل وفي الـ IME ساعات بيبقى [[Unidentified]] أو [[Process]] (ده من الوثائق).`,
            R`لو اللعبة خلصت، أي كتابة متتحسبش. (الخانة كمان [[disabled]]، بس ده حماية زيادة.)`,
            R`**[[Array.from]] مش [[split('')]]:** [[split]] بيقسم على UTF-16 code units، فإيموجي زي 👍 بيبقى حتتين. اتجرّب: [[split]] على [[👍ok]] بيدّي [[4]]، و [[Array.from]] بيدّي [[3]]. النصوص هنا مفيهاش إيموجي، بس اللي بيلعب ممكن يكتب واحد بالغلط، والمقارنة لازم تفضل حرف قصاد حرف.`,
            R`أول حرف اتكتب؟ الوقت بيبدأ **دلوقتي** مش لما الصفحة فتحت. كده اللي بيقرا النص الأول ميتحسبش عليه.`,
            R`وقت البداية. [[performance.now()]] بالميلي ثانية من وقت فتح الصفحة، وبكسور (زي [[1243.7]])، و**مبيرجعش لورا** لو حد غيّر ساعة الجهاز. [[Date.now()]] بيتغيّر لو الساعة اتظبطت وانت بتلعب.`,
            R`أول نداء لـ [[tick]]، ومن هنا هي بتنادي نفسها.`,
            R`قفلة الـ [[if]].`,
            R`بنعدّ الحروف **الجديدة** بس: من آخر طول كان عندنا لحد الطول الجديد. لو مسحت حرف، الطول قل والـ loop مش بيلف خالص، فالمسح مش بيتحسب ضغطة.`,
            R`كل حرف جديد اتضاف بيتعدّ ضغطة، صح كان ولا غلط، وده المقام بتاع الدقة.`,
            R`ولو الحرف الجديد مش زي النص في مكانه = غلطة. ودي **مبتتمسحش** لو صلّحت بعدين، وده الفرق بين الدقة و «كام حرف أحمر دلوقتي».`,
            R`قفلة الـ [[for]].`,
            R`نحفظ الحروف الحالية عشان المرة الجاية نعرف إيه الجديد.`,
            R`[[paint]] بتنادي [[marks]] وبتحط الـ class على كل [[<span>]]. بتتنادي مع الكتابة بس، مش مع كل فريم: اللون مبيتغيّرش غير لما تكتب.`,
            R`وصلت لطول النص؟ اللعبة خلصت حتى لو فيه غلط (زي معظم ألعاب الكتابة). [[finish]] بتوقّف الوقت وتقارن بأحسن نتيجة. والخانة عليها [[maxLength]] بطول النص، فمش هتكتب أكتر منه.`,
            R`قفلة المستمع.`,
          ],
          teach: R`## ٠. هنبني إيه

~~~text الشكل (لقطة حقيقية من Chrome 156 بعد ما كتبت ٢٤ حرف وغلطت في واحد)
سرعة الكتابة
النص [عربي ▾]
┌──────────────────────────────────────────────────────┐
│  لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل  │
│  في أي مكان تاني.                                    │
│  ─────────────────────                               │
│  أخضر، والـ «ق» أحمر، والمسافة اللي بعد «رسالة» صفرا  │
└──────────────────────────────────────────────────────┘
[ لما الكود يقع افرا رسالة                              ]
الوقت 1.1 ث · السرعة 256 WPM · الدقة 96%
أحسن نتيجة: —
[نص جديد (Esc)]
~~~

### الملفات

~~~text
typing/
├── texts.js     النصوص (١٥ سطر)
├── game.js      الحسابات من غير DOM (٢٩ سطر)  ← بيتجرّب في Node
├── index.html
├── style.css
└── app.js       اللعبة (١٠٥ سطر)
~~~

وبيشتغل بنفس الطريقة: [[python3 -m http.server 8000]] أو [[server.js]] بتاع مشروع البحث.

---

## ١. النصوص

~~~js texts.js
export const TEXTS = {
  ar: [
    'البرمجة مش حفظ أوامر. البرمجة إنك تفهم المشكلة كويس وبعدين تكتب أبسط حل يشتغل.',
    'لما الكود يقع اقرا رسالة الخطأ للآخر قبل ما تدور على حل في أي مكان تاني.',
    'اتعلم JavaScript خطوة خطوة وابني حاجة صغيرة كل يوم بدل ما تقرا من غير ما تجرب.',
    'الكمبيوتر بيعمل اللي انت كاتبه بالظبط مش اللي انت قاصده وده أول درس في الشغلانة.',
  ],
  en: [
    'Programming is not about typing fast. It is about thinking clearly and then typing.',
    'Read the whole error message before you search for it. The answer is often right there.',
    'Small apps you finish teach you more than big apps you only plan to build one day.',
    'The computer does exactly what you wrote, not what you meant. That is the whole job.',
  ],
};
~~~

**ليه من غير تشكيل؟** التشكيل في Unicode حرف لوحده:

~~~text اتشغّل فعلًا · Node
Array.from('مُبرمج')   ->  [ 'م', 'ُ', 'ب', 'ر', 'م', 'ج' ]     ← ٦ مش ٥
~~~

فالـ [[span]] بتاع الضمة هيبقى لوحده، واليوزر لازم يكتب الضمة كضغطة منفصلة. ممكن تتعمل (بـ [[Intl.Segmenter]] اللي بيقسم على «الحرف زي ما العين شايفاه»)، بس ده مشروع لوحده. وفيه نص فيه [[JavaScript]] جوه جملة عربي، عشان نشوف الاتجاهين في سطر واحد.

---

## ٢. index.html و style.css

~~~html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>سرعة الكتابة</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <h1>سرعة الكتابة</h1>
    <label>النص <select id="lang"><option value="ar">عربي</option><option value="en">English</option></select></label>
    <p id="text" aria-label="النص اللي هتكتبه"></p>
    <input id="input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" aria-label="اكتب هنا">
    <p class="stats">
      الوقت <b id="time">0.0</b> ث · السرعة <b id="wpm">0</b> WPM · الدقة <b id="acc">100%</b>
    </p>
    <p id="result" role="status"></p>
    <p>أحسن نتيجة: <span id="best">—</span></p>
    <button id="restart">نص جديد (Esc)</button>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>
~~~

[[autocorrect]] و [[autocapitalize]] و [[spellcheck]] بـ [[off]]: من غيرهم كيبورد الموبايل بيصلّح الكلمة أو يكبّر أول حرف، واللعبة تحسبها غلطة انت ماعملتهاش.

~~~css style.css
body { font-family: system-ui, sans-serif; max-width: 44rem; margin: 2rem auto; padding: 0 1rem; }
#text { font-size: 1.5rem; line-height: 2.4; padding: 1rem; background: #f4f4f4; border-radius: 8px; }
#text .ok { color: #188038; }
#text .bad { color: #fff; background: #d93025; }
#text .cur { background: #fde293; }
#input { width: 100%; font-size: 1.3rem; padding: .5rem; box-sizing: border-box; }
.stats b { font-variant-numeric: tabular-nums; }
~~~

[[tabular-nums]] بيخلي كل الأرقام بنفس العرض، فالسطر مبيترعشش لما الوقت يتغيّر من [[1.1]] لـ [[1.8]].

### الحروف العربي و [[<span>]] لكل حرف: اتقاست في Chrome

كل حرف في [[<span>]] لوحده عشان نلوّنه. **السؤال:** الحروف العربي هتفضل موصولة ولا هتتقطّع؟ قست عرض كلمة [[البرمجة]] بـ [[getBoundingClientRect()]] في Chrome 156 (حجم 24px):

| الشكل | العرض | موصولة؟ |
|---|---|---|
| الكلمة نص واحد | 70.15px | أيوه |
| كل حرف في [[<span>]] | 70.20px | أيوه، نفس العرض |
| كل حرف بلون مختلف | 70.20px | أيوه |
| حرف بخلفية صفرا | 70.20px | أيوه |
| كل حرف عليه [[padding: 0 1px]] | 86.20px | أيوه، بس فيه فراغات |
| الحروف مفصولة بـ ZWNJ (منفصلة عن قصد) | 92.19px | لأ، وده شكل الحروف المنفصلة |

وفي لقطة الشاشة: الألوان والخلفية و [[font-weight]] كلهم سابوها موصولة، **و [[display: inline-block]] على حرف واحد قطّعه**: الـ «ر» اتكتبت منفصلة. يعني لو حبيت تعمل مؤشر بيتحرك بـ [[transform]] على الحرف الحالي (والـ [[transform]] محتاج [[inline-block]])، العربي هيتكسر. خلّي المؤشر خلفية.

> ده Chrome 156. في متصفحات تانية أو نسخ أقدم ممكن السلوك يختلف (ده مش متجرّب هنا)، فجرّب في المتصفح اللي يهمّك.

---

## ٣. game.js

الكود في المثال. واتجرّب في Node:

~~~js test-game.mjs
import { pick, isArabic, marks, stats } from './game.js';
const counts = [0, 0, 0, 0]; let last = 2, repeats = 0;
for (let k = 0; k < 10000; k++) { const i = pick(4, last); counts[i]++; if (i === last) repeats++; last = i; }
console.log('pick 10000x:', counts, 'repeats:', repeats);
console.log(marks(Array.from('cat sat'), Array.from('cas')).join(','));
const x = Array.from('x'.repeat(250));
console.log(stats({ target: x, typed: x, keystrokes: 260, mistakes: 10 }, 60000));
~~~

~~~text اتشغّل فعلًا · Node 24.22
pick 10000x: [ 2509, 2448, 2520, 2523 ] repeats: 0
ok,ok,bad,cur,,,
{ wpm: 50, accuracy: 96 }
~~~

### الباج اللي الاختبار ده مسكه

أول نسخة من [[pick]] كانت كده:

~~~js pick — النسخة الأولى
export function pick(count, last) {
  if (count < 2) return 0;
  const i = Math.floor(Math.random() * (count - 1));
  return i >= last && last >= 0 ? i + 1 : i;
}
~~~

~~~text اتشغّل فعلًا
first pick (last=-1):  0 0 1 2 2 1 1 1
~~~

**ولا مرة [[3]].** في أول لعبة [[last]] بـ [[-1]]، فالاختيار من [[count - 1]] بس ومفيش «تفويت»، يعني النص الأخير عمره ما بيطلع في أول لعبة. والتصليح الأولاني (شلت [[count < 2]]) كسر حاجة تانية: [[pick(1, 0)]] رجّعت [[1]]. **الاتنين اتمسكوا بتشغيل مش بقراية.**

~~~text بعد التصليح · ١٠,٠٠٠ مرة لكل واحد
pick(4, 2):   [ 2509, 2448, 2520, 2523 ]  repeats: 0
pick(4, -1):  [ 2509, 2577, 2480, 2434 ]
pick(1, 0):   0
~~~

---

## ٤. app.js: لعبة جديدة

~~~js app.js — أوله
import { TEXTS } from './texts.js';
import { pick, isArabic, marks, stats } from './game.js';

const $ = (sel) => document.querySelector(sel);
const box = $('#text');
const input = $('#input');
const lang = $('#lang');
const BEST_KEY = 'typing-best';
let game = null;

function newGame() {
  if (game) cancelAnimationFrame(game.raf);
  const key = lang.value;
  const index = pick(TEXTS[key].length, game?.lang === key ? game.index : -1);
  const text = TEXTS[key][index];
  game = { lang: key, index, target: Array.from(text), typed: [], keystrokes: 0, mistakes: 0, start: 0, raf: 0, done: false };
  const dir = isArabic(text) ? 'rtl' : 'ltr';
  for (const node of [box, input]) { node.dir = dir; node.lang = key; }
  box.replaceChildren(...game.target.map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    return span;
  }));
  input.value = '';
  input.maxLength = text.length;
  input.disabled = false;
  $('#result').textContent = '';
  paint();
  showStats(0);
  showBest();
  input.focus();
}
~~~

| السطر | ليه |
|---|---|
| [[cancelAnimationFrame(game.raf)]] | لو بدأت من جديد في نص اللعبة، الـ [[tick]] القديمة لازم تقف. من غيره فيه حلقتين بيكتبوا في نفس الأرقام |
| [[game?.lang === key ? game.index : -1]] | «متكررش» معناها في نفس اللغة بس. لو غيّرت اللغة، أي نص |
| [[game = { ... }]] | object جديد كل لعبة، مش تصفير خانة خانة. مستحيل تنسى خانة من اللعبة اللي فاتت |
| [[node.dir = dir]] | الاتجاه **على النص والخانة الاتنين**. لو الخانة فضلت [[rtl]] والنص إنجليزي، المؤشر بيبدأ من اليمين والكتابة بتبان معكوسة وانت بتكتب |
| [[node.lang = key]] | بيقول للمتصفح اللغة: بيختار خط مناسب، وقارئ الشاشة بينطق صح |
| [[span.textContent = ch]] | كل حرف [[<span>]]، بالنص الآمن |
| [[input.maxLength]] | مبتقدرش تكتب أطول من النص |
| [[input.focus()]] | تقدر تبدأ كتابة على طول بعد Esc من غير ماوس |

**والنص اللي فيه [[JavaScript]]:** الـ spans بترتيب الكتابة (logical order)، والمتصفح بيرتّبهم على الشاشة بالـ bidi algorithm. فالـ J على الشمال والـ t على اليمين جوه الكلمة، والتلوين ماشي صح لأن [[marks]] بتقارن بالترتيب المنطقي مش بالمكان على الشاشة.

---

## ٥. الكتابة: [[input]] مش [[keydown]]

الكود في المثال. وكمان:

~~~js
input.addEventListener('paste', (e) => e.preventDefault());
~~~

اللزق ممنوع، وإلا أي حد يلزق النص ويطلع ١٠٠٠٠ WPM.

~~~text اتشغّل فعلًا · jsdom 30.1.3
-- كتبت أول حرفين صح، وبعدين x
   الألوان: ok,ok,bad,cur      الدقة: 67%       (٣ ضغطات، واحدة غلط)
-- مسحت الـ x وكمّلت صح لآخر النص (حرف كل 40ms)
   live {"i":25,"time":"1.2","wpm":"251","acc":"96%"}
   live {"i":50,"time":"2.4","wpm":"253","acc":"98%"}
   live {"i":75,"time":"3.6","wpm":"254","acc":"99%"}
   final: 3.6 ث · 258 WPM · 99%   الخانة مقفولة: true
~~~

**الأرقام دي منطقية؟** ٧٨ حرف صح في ٣.٦ ثانية = ٧٨ ÷ ٥ ÷ ٠.٠٦ دقيقة = ٢٦٠. طلعت [[258]] لأن الوقت الحقيقي أكتر من [[3.6]] شوية. و ٧٩ ضغطة (٧٨ حرف والـ x) منهم واحدة غلط = ٩٨.٧٪ ← [[99%]]. والغلطة **فضلت محسوبة** بعد ما صلّحتها.

---

## ٦. الوقت: يتقاس، ميتعدّش

الطريقة اللي بتيجي في البال الأول:

~~~js
let elapsed = 0;
setInterval(() => { elapsed += 100; show(elapsed); }, 100);
~~~

دي بتفترض إن الـ callback بيتنادي كل 100ms **بالظبط**. وده مش حقيقي: لو الـ main thread مشغول (درس «blocking و الـ main thread»)، النداءات بتتأخر أو بتتجمع.

~~~js drift.mjs
const t0 = performance.now();
let counted = 0;
const id = setInterval(() => { counted += 100; }, 100);
setTimeout(() => { const end = performance.now() + 700; while (performance.now() < end); }, 500);
setTimeout(() => {
  clearInterval(id);
  console.log('setInterval counted:', counted, 'ms   performance.now():', Math.round(performance.now() - t0), 'ms');
}, 3000);
~~~

~~~text اتشغّل فعلًا · node drift.mjs
setInterval counted: 2100 ms   performance.now(): 3015 ms
~~~

الصفحة علّقت ٧٠٠ms، **والعدّاد خسر ٩١٥ms**: النداءات اللي كانت المفروض تحصل وقت التعليق مرجعتش. في لعبة، ده يخلي WPM أعلى من الحقيقي.

**والحل اللي في اللعبة:** خزّن وقت البداية مرة، واحسب الفرق كل مرة بتعرض:

| | بيعدّ (setInterval) | بيقيس (performance.now) |
|---|---|---|
| الصفحة علّقت | بيخسر الوقت ده | أول فريم بعدها مظبوط |
| التاب في الخلفية | بيبطّأ (المتصفح بيخنق الـ timers) | لما ترجع، مظبوط |
| بيتحدّث كام مرة | كل ما تحدد | [[requestAnimationFrame]]: مع كل رسمة، مش أكتر |
| لو الساعة اتغيّرت | مش فارق | [[performance.now]] مش بيتأثر، و [[Date.now]] بيتأثر |

و [[requestAnimationFrame]] مش هو اللي بيقيس، هو **بس بيقول إمتى ترسم**: مرة قبل كل frame، فمش بنحدّث الرقم ٢٠٠ مرة في الثانية والشاشة بترسم ٦٠.

اتجرّب في Chrome: كتبت ٢٤ حرف في ١.١ ثانية والسرعة [[256]]. وسبتها من غير ما أكتب: بعد ١٢.٢ ثانية الوقت كان لسه بيعدّ والسرعة نزلت لـ [[23]] لوحدها، لأن [[tick]] بتحسب من نفس الحروف على وقت أطول.

---

## ٧. النهاية وأحسن نتيجة

~~~js
function loadBest() {
  const ok = (r) => r && Number.isFinite(r.wpm) && Number.isFinite(r.accuracy);
  try {
    const data = JSON.parse(localStorage.getItem(BEST_KEY));
    return { ar: ok(data?.ar) ? data.ar : null, en: ok(data?.en) ? data.en : null };
  } catch {
    return { ar: null, en: null };
  }
}

function finish() {
  game.done = true;
  cancelAnimationFrame(game.raf);
  input.disabled = true;
  const s = showStats(performance.now() - game.start);
  const best = loadBest();
  const old = best[game.lang];
  const record = s.accuracy >= 90 && (!old || s.wpm > old.wpm);
  if (record) {
    best[game.lang] = { wpm: s.wpm, accuracy: s.accuracy };
    try { localStorage.setItem(BEST_KEY, JSON.stringify(best)); } catch {}
  }
  $('#result').textContent = (record ? 'رقم قياسي جديد! ' : 'خلصت. ') + s.wpm + ' WPM بدقة ' + s.accuracy + '%';
  showBest();
}
~~~

- **أحسن نتيجة لكل لغة لوحدها**: سرعتك بالعربي غير بالإنجليزي، ومقارنتهم ببعض ملهاش معنى.
- **[[s.accuracy >= 90]]**: من غيرها حد يضرب على الكيبورد عشوائي بسرعة ياخد رقم قياسي. اتجرّب: جولة بدقة [[67%]] و [[261]] WPM **متسجلتش**، والرقم القديم ([[258]] بدقة [[99%]]) فضل.
- **[[loadBest]] بتفحص كل رقم بـ [[Number.isFinite]]**: [[JSON.parse(null)]] بيرجّع [[null]] (أول زيارة) و [[data?.ar]] بيحميه. و [[Number.isFinite('999')]] بـ [[false]]، فحد يكتب [[{"ar":{"wpm":"999"}}]] بإيده ميطلعش رقم قياسي نصّي.
- **[[try]] حوالين القراية والكتابة**: نفس سبب «خلّي التطبيق يفتكر».

~~~text اتشغّل فعلًا · jsdom
-- المحفوظ بعد الجولة:      {"ar":{"wpm":258,"accuracy":99},"en":null}
-- JSON مقطوع:              أحسن نتيجة: —
-- wpm نص ("999"):          أحسن نتيجة: —
~~~

---

## ٨. من الأول: Esc والزرار واللغة

~~~js
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') newGame(); });
$('#restart').addEventListener('click', newGame);
lang.addEventListener('change', newGame);

newGame();
~~~

Esc على [[document]] مش على الخانة، لأن الخانة بتبقى [[disabled]] بعد النهاية ومبتستقبلش أحداث.

~~~text اتشغّل فعلًا · jsdom
-- الوقت بعد النهاية بـ 300ms:  نفس الرقم (الـ tick وقفت)
-- بعد Esc:   0.0 ث · 0 WPM · 100%   نص مختلف: true   الخانة مفتوحة: true
-- English:   dir ltr ltr   أحسن نتيجة: —   «Read the whole error message before...»
~~~

---

## ٩. اتشغّل على إيه

| إيه | على إيه |
|---|---|
| [[game.js]] | Node 24.22: [[pick]] ١٠,٠٠٠ مرة، و [[marks]] و [[stats]] بأرقام معروفة |
| [[app.js]] كله | jsdom 30.1.3 بـ [[pretendToBeVisual: true]] (من غيرها مفيش [[requestAnimationFrame]] في jsdom) |
| الحروف العربي في spans | Chrome 156: قياس عرض، ولقطة شاشة |
| اللعبة نفسها | Chrome 156: كتبت جملة عربي فيها غلطة، والألوان والوقت والسرعة اتحدّثوا |
| [[setInterval]] ضد [[performance.now]] | Node |

## ملخص الخطوات

| # | الخطوة | بتمنع إيه |
|---|---|---|
| ١ | نصوص من غير تشكيل، و [[Array.from]] | إيموجي متقسوم، وحروف تشكيل لوحدها |
| ٢ | [[<span>]] لكل حرف بألوان وخلفية بس | حروف عربي متقطعة ([[inline-block]]) |
| ٣ | [[pick]] بـ «تفويت» | نفس النص مرتين، أو نص عمره ما بيطلع |
| ٤ | [[dir]] و [[lang]] على النص **والخانة** | كتابة معكوسة في الخانة |
| ٥ | [[input]] مش [[keydown]]، واللزق ممنوع | كيبورد الموبايل، والغش |
| ٦ | الوقت = [[performance.now() - start]] | عدّاد بيقدّم لما الصفحة تعلّق |
| ٧ | أحسن نتيجة بدقة ٩٠٪ وبفحص | أرقام قياسية بالضرب العشوائي أو بداتا متعدّلة |
| ٨ | [[cancelAnimationFrame]] في كل بداية ونهاية | حلقتين شغالين على نفس الأرقام |

## الخلاصة

- **قيس الوقت، متعدّهوش.** خزّن البداية، واطرح.
- [[requestAnimationFrame]] بيقول إمتى ترسم، مش الوقت كام.
- [[Array.from(text)]] للحروف، و [[dir]] على كل عنصر فيه نص.
- اختبر العشوائي بتشغيله آلاف المرات: الباج اللي بيحصل «ساعات» مبيبانش بالعين.`,
          try: R`ابني الخمس ملفات وشغّلهم بسيرفر. العب جولة بالعربي وغلط عن قصد في حرفين وصلّحهم: الحروف بقت حمرا وبعدين خضرا، والدقة فضلت أقل من ١٠٠٪؟ دوس Esc في النص وشوف الوقت رجع صفر. غيّر لـ English وشوف الخانة بقت تكتب من الشمال. واستنى في نص جولة من غير ما تكتب ١٠ ثواني وراقب السرعة. وآخر حاجة: افتح DevTools وفي Console اكتب [[localStorage.setItem('typing-best', '{"ar":{"wpm":999}}')]] واعمل reload.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير ما تشغّل، اكتب ناتج كل سطر: [[Array.from('سلام').length]] و [['🙂🙂'.split('').length]] و [[Array.from('🙂🙂').length]] و [[stats({ target: ['a','b'], typed: ['a','x'], keystrokes: 2, mistakes: 1 }, 500)]] و [[marks(['a','b','c'], [])]]. وبعدين شغّلهم في Node.`, done: R`كاتب توقعاتك قبل التشغيل، والنتايج: [[4]] و [[4]] و [[2]]، و [[{ wpm: 12, accuracy: 50 }]] (الثانية الأدنى شغالة: نص ثانية اتحسبت ثانية)، و [[ ['cur', '', ''] ]]. ولكل توقع غلط تقدر تقول السطر اللي في [[game.js]] كان سببه.` },
            { lvl: 'تطبيق', t: R`**ابني حاجة:** بعد ما الجولة تخلص، اعرض «أكتر ٣ حروف غلطت فيهم» وعدد مرات كل واحد. اعدّ الغلطات في [[Map]] جوه نفس الـ loop اللي بيعدّ [[mistakes]] (المفتاح الحرف اللي **كان المفروض** يتكتب)، واعرضهم بـ [[textContent]]. والمسافة تتعرض كلمة «مسافة» مش فراغ.`, done: R`في جولة غلطت فيها ٣ مرات في [[ة]] ومرة في المسافة، النتيجة بتقول «ة: ٣، مسافة: ١». وجولة من غير ولا غلطة بتقول «مفيش غلطات». وبعد Esc الـ [[Map]] بتبدأ فاضية (هي جزء من [[game]]).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل نسخة من اللعبة الوقت فيها بـ [[setInterval(() => elapsed += 100, 100)]] بدل [[performance.now()]]. في الاتنين، ضيف زرار بيعمل busy loop ٧٠٠ms ([[while (performance.now() < end);]]). العب جولة، ودوس الزرار في نصها، وقارن الوقت اللي اللعبة عرضته بوقت حقيقي من ساعة الموبايل.`, done: R`عندك رقمين لكل نسخة. نسخة [[setInterval]] الوقت فيها أقل من الحقيقي بحوالي ٧٠٠ms أو أكتر، والسرعة أعلى بنسبة باينة. ونسخة [[performance.now()]] فرقها عن ساعة الموبايل أقل من ربع ثانية. وكاتب جملة تشرح ليه.` },
          ],
          deep: {
            why: R`لأن لعبة الكتابة فيها ٣ حاجات صعبة في مكان صغير: **وقت حي** لازم يبقى صح، و**نص عربي** لازم يفضل موصول ومتلوّن حرف حرف، و**مدخلات** بتيجي من كيبوردات مختلفة. وكل واحدة فيهم ليها فخ مبيبانش غير لما تشغّل: العدّاد بيقدّم، والحروف بتتقطّع، والعشوائي عمره ما بيختار الأخير.`,
            how: R`**الدورة الكاملة لجولة واحدة:**

1. **[[newGame]]**: [[pick]] بيختار نص، و [[Array.from]] بيقسمه حروف، وكل حرف [[<span>]]. و [[dir]] و [[lang]] بيتحطوا على النص والخانة.
2. **أول حرف**: [[game.start = performance.now()]] و [[requestAnimationFrame(tick)]]. الوقت بيبدأ من هنا، مش من فتح الصفحة.
3. **كل حرف** (حدث [[input]]): الحروف الجديدة بس بتتعدّ ضغطات، واللي مش زي النص بيتعدّ غلطة ومبيتمسحش. وبعدين [[paint]] بتلوّن من [[marks]].
4. **كل frame** ([[tick]]): [[stats(game, performance.now() - game.start)]] بتحسب WPM من الحروف الصح والدقة من الضغطات، وبتكتبهم. والحساب دايمًا من البداية.
5. **آخر حرف**: [[finish]] بتلغي الـ frame الجاي، وتقفل الخانة، وتقارن بأحسن نتيجة لنفس اللغة لو الدقة ٩٠٪ أو أكتر.
6. **Esc**: [[cancelAnimationFrame]] و [[game]] جديد خالص.

**والفصل:** [[game.js]] مفيهوش [[document]] ولا [[performance]]: بياخد الوقت كرقم. عشان كده اتجرّب بأرقام ثابتة ([[60000]] ms = دقيقة بالظبط) وطلّع [[50]] WPM اللي حسبناه بإيدنا. لو كان بيقرا الوقت بنفسه، مكناش هنعرف نختبره.`,
            when: R`أي حاجة فيها وقت بيتعرض وهو ماشي: تايمر امتحان، و pomodoro، و stopwatch، ولعبة، وشريط تقدّم مبني على الوقت. ونفس فكرة الـ spans لأي تعليم على نص: تصحيح إملاء، أو مقارنة نسختين من نص، أو كاريوكي.`,
            mistakes: R`[[setInterval]] بيزوّد عدّاد بدل ما تقيس من البداية. [[Date.now()]] بدل [[performance.now()]]. [[split('')]] على نص ممكن يبقى فيه إيموجي. [[inline-block]] على حروف عربي. [[dir]] على النص بس والخانة لأ. [[keydown]] و [[e.key]] بدل [[input]]. حساب الدقة من الحروف الحمرا دلوقتي (المسح بيخفي الغلط). ونسيان [[cancelAnimationFrame]] فيبقى فيه حلقتين بعد Esc.`
          },
          sol: R`ده اللي طلع لما الخطوات دي اتعملت (الجزء الأول في Chrome 156، والباقي في jsdom بنفس الملفات):`,
          solCode: R`// جولة عربي بغلطتين اتصلّحوا:
//   الحرفين بقوا أحمر وبعدين أخضر، والدقة في الآخر أقل من 100% (على نص ٧٨ حرف: ٨٠ ضغطة منهم ٢ غلط = 98%)، لأن الغلطات مبتتمسحش
// Esc في النص:
//   0.0 ث · 0 WPM · 100%   ونص تاني (مش نفس النص أبدًا)
// English:
//   الخانة والنص dir="ltr"، والمؤشر بيبدأ من الشمال
// ١٠ ثواني من غير كتابة في نص الجولة:
//   الوقت بيعدّ، والسرعة بتنزل لوحدها (في Chrome: 256 بعد 1.1 ث، و 23 بعد 12.2 ث)
// localStorage.setItem('typing-best', '{"ar":{"wpm":999}}') و reload:
//   أحسن نتيجة: —     (مفيش accuracy، فـ loadBest رفضته)
//   ولما تخلص جولة بدقة 90% أو أكتر، بتتسجل وبتكتب فوق القيمة البايظة`
        },
      ],
    }
]);

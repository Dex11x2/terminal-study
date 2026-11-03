// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "الأداء والجودة",
      l: 3,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`صفحة قبل وبعد للصور`, what: R`خد صفحة فيها ٥ صور PNG أو JPEG كبيرة، وحوّلها AVIF و WebP بـ sharp بمقاسين، وحط [[<picture>]] و [[srcset]] و [[width]]/[[height]]، وقيس الحجم و LCP قبل وبعد. من دروس «صيغ الصور WebP و AVIF» و «Core Web Vitals (LCP/INP)».`, done: R`جدول قبل وبعد فيه الحجم الكلي و LCP و CLS، والحجم نزل أكتر من النص، و [[currentSrc]] لكل صورة بيقول [[avif]].` },
        { lvl: 'صغير', t: R`Snippet الـ Web Vitals`, what: R`Snippet واحد بيطبع LCP وعنصره، و CLS ومين اتحرك، وكل ضغطة فوق ١٠٠ms ووقت الـ handler، بألوان حسب الحدود (أخضر وأصفر وأحمر). من درس «Core Web Vitals (LCP/INP)».`, done: R`على صفحة المعمل المكسورة بيطلع LCP و CLS و INP أحمر أو أصفر بالأرقام، وعلى المتصلّحة أخضر، ومبيرميش error على صفحة مفيهاش صور.` },
        { lvl: 'متوسط', t: R`صيّاد الـ leaks`, what: R`سكربت Playwright بياخد selector لزرار فتح وزرار قفل، ويعمل الدورة ٣٠ مرة، ويقيس DOM Nodes و listeners و heap قبل وبعد (بعد GC)، ويعد الـ detached من heap snapshot، ويقول «leak» أو «سليم». من درس «Memory و heap snapshot».`, done: R`على modal المعمل المكسور بيقول leak ومعاه +٦٣٠ node و +٣٠ listener، وعلى المتصلّح سليم بفرق [[0]]، و selector غلط بيطلّع رسالة واضحة.` },
        { lvl: 'متوسط', t: R`ميزانية أداء في CI`, what: R`GitHub Action بيشغّل Lighthouse (أو [[check.mjs]] بتاع المشروع) على ٣ صفحات بعد الـ build، ويقع لو LCP أو CLS أو حجم JS عدّى حد مكتوب في ملف [[budget.json]]. من دروس «Lighthouse» و «Performance و Coverage».`, done: R`PR بيزوّد صورة ٢ ميجا بيقع والـ log بيقول أنهي صفحة وأنهي رقم، و PR عادي بيعدّي، والحدود في ملف مش في الكود.` },
        { lvl: 'كبير', t: R`فاحص أداء لمواقع الزباين`, what: R`أداة بتاخد URL، وتقيس على موبايل بطيء (throttling و CPU 4x) وديسكتوب، ٣ مرات وتاخد الوسط: LCP وعنصره، و CLS وعناصره، و INP لزراير بتحددها، والحجم حسب النوع، و Coverage (CSS و JS مش مستخدم)، والصور اللي ممكن تتحوّل، وتطلّع تقرير HTML فيه «أهم ٣ تصليحات» بالأثر المتوقع.`, done: R`على معمل «مشروع تشخيص موقع بطيء ومكسور» التقرير بيطلّع نفس المشاكل اللي في الدرس، وبيتعامل مع موقع بطيء أو بيقع (timeout ورسالة)، والتشغيل التاني على نفس الموقع بيطلع أرقام قريبة (الوسط بيقلل التذبذب).`, ext: R`زوّد مقارنة بالتشغيل اللي فات، و CrUX API لأرقام اليوزرز الحقيقيين، واعمله خدمة بتبعت تقرير شهري للزبون.` },
        { lvl: 'فكرة', t: R`موقعك تحت ١٠٠ كيلو`, what: R`خد موقع عملته (portfolio مثلًا) وخلّي الصفحة الرئيسية تتحمّل في أقل من ١٠٠ كيلو و LCP أقل من ١ ثانية على Slow 4G. انت بتقرر تشيل إيه وتأجّل إيه.`, done: R`Network بيقول أقل من ١٠٠ kB transferred، و LCP على Slow 4G مكتوب، وفيه README بكل قرار ورقمه قبل وبعد.`, ext: R`اكتب مقال «إزاي نزّلت موقعي من X لـ ١٠٠ كيلو» بالأرقام والـ screenshots.` },
      ],
      items: [
        {
          cmd: "Lighthouse",
          title: "تقرير شامل بدرجات",
          desc: "تاب Lighthouse بيقيس Performance و Accessibility و Best Practices و SEO، ويقولك تصلّح إيه بالظبط. شغّله في نافذة Incognito عشان الـ extensions متأثرش، وعلى Mobile. من أهم الأرقام في قسم Performance: [[LCP]] أكبر عنصر يظهر في 2.5 ثانية أو أقل، و [[CLS]] الصفحة متتنططش وهي بتحمّل (0.1 أو أقل)، و [[TBT]] (Total Blocking Time) قد إيه الـ JavaScript قفل الصفحة وهي بتحمّل. الـ Core Web Vitals التالت [[INP]] (الصفحة ترد على الضغط في 200ms أو أقل) التقرير العادي ده (وضع Navigation) مبيقيسوش، لأنه محتاج تفاعل حد مع الصفحة (وضع Timespan في DevTools بيقيسه من ضغطاتك انت بس)، فـ TBT هو الرقم اللي بيدلّك عليه في المعمل. INP الحقيقي تلاقيه في PageSpeed Insights (قسم بيانات الزوار الحقيقيين من CrUX، لو موقعك عليه زيارات كفاية) أو تقيسه بنفسك بمكتبة [[web-vitals]].",
          example: R`npx lighthouse https://example.com --view
npx lighthouse https://example.com --preset=desktop --output=html --output-path=report.html`,
          try: "طلّع تقرير Lighthouse لموقعك على Mobile، وصلّح أول 3 حاجات قالك عليها، وقارن الدرجة.",
          flag: "term",
          deep: {
            why: "موقعك شغال، بس محتاج تعرف إزاي Google بيقيّمه من ناحية السرعة والـ SEO والـ accessibility.",
            how: R`Lighthouse بيعمل زيارة ويقيس على ٤ محاور: Performance، وAccessibility، وBest Practices، وSEO. وكل محور درجة من ١٠٠.

Core Web Vitals التلاتة: LCP (Largest Contentful Paint) وقت ظهور أكبر محتوى، والهدف ٢.٥ ثانية أو أقل. CLS (Cumulative Layout Shift) قد إيه عناصر بتتحرك وهي بتتحمّل، ٠.١ أو أقل. INP (Interaction to Next Paint) الوقت بين الضغط والرد، ٢٠٠ms أو أقل.

تقرير Lighthouse العادي (Navigation) بيقيس LCP و CLS في المعمل (lab data)، لكن مبيقيسش INP (وضع Timespan بيقيسه من تفاعلاتك انت بس، مش من الزوار)، لأن INP بيتحسب من تفاعلات الزوار الحقيقيين طول زيارتهم. بداله Lighthouse بيدّيك TBT (Total Blocking Time)، ودا مجموع الوقت اللي الـ main thread كان مقفول فيه بـ long tasks، وهو أقرب مؤشر معملي لـ INP: لو TBT عالي، غالبًا INP هيبقى وحش. الرقم الحقيقي لـ INP بييجي من field data: قسم الزوار الحقيقيين في PageSpeed Insights (من CrUX)، أو مكتبة web-vitals في موقعك بتبعت القياسات للـ analytics بتاعتك.

شغّله في Incognito عشان الـ extensions مش تأثر.`,
            when: "قبل الرفع على إنتاج. لما حد يقولك «الموقع بطيء». بانتظام كل إصدار.",
            mistakes: "تشغّله مرة وتخليها. واجعل الموبايل هو المعيار (دايمًا أبطأ من الديسكتوب). وتفتكر إن درجة ١٠٠ في Lighthouse معناها إن INP كويس: تقرير Lighthouse العادي مبيقيسش INP أصلًا، وسؤال انترفيو مشهور هو الفرق بين lab data (Lighthouse) و field data (CrUX و web-vitals)."
          },
          teach: R`## الأول: Lighthouse زيارة معملية بتتقيس

Lighthouse بيفتح Chrome، ويحمّل الصفحة بظروف ثابتة (موبايل متوسط على نت أبطأ)، ويطلّع تقرير بدرجات من ١٠٠ وقايمة باللي يتصلّح. نفس الأداة موجودة في تاب Lighthouse في DevTools، والمثال بيشغّلها من الترمنال. شغّلتها فعلًا (Lighthouse 13.5.0 بـ [[npx]] على ويندوز، و Chrome المتسطب) على صفحة تجربة على [[http://127.0.0.1:8791/shop]] فيها صورة من غير alt ومن غير مقاسات.

---

## ١. [[npx lighthouse https://example.com --view]]

- [[npx lighthouse]]: نزّل باكدج [[lighthouse]] وشغّلها (أو استخدم المتسطبة).
- الـ URL: الصفحة اللي هتتقاس.
- [[--view]]: افتح التقرير HTML في المتصفح لما يخلص.

من غير أي فلاج تاني القياس **Mobile**. شغّلته بـ [[--output=json --output=html]] عشان أقرا الأرقام:

~~~text الناتج (درجات وأرقام صفحة التجربة)
Performance         100
Accessibility        69
Best Practices       96
SEO                  83
Agentic Browsing    100

First Contentful Paint     0.8 s
Largest Contentful Paint   0.9 s
Total Blocking Time        0 ms
Cumulative Layout Shift    0
Speed Index                0.8 s
~~~

(النسخة 13.5 فيها فئة خامسة اسمها Agentic Browsing، جديدة، والتقرير العادي اللي هتشوفه في DevTools ممكن يعرض الأربعة المعروفين بس حسب نسختك.)

| الرقم | معناه | الحد الكويس |
|---|---|---|
| LCP (Largest Contentful Paint) | أكبر صورة أو نص ظهر إمتى | ٢.٥ ثانية أو أقل |
| TBT (Total Blocking Time) | مجموع الوقت اللي JavaScript قفل فيه الصفحة وهي بتحمّل | أقل من ٢٠٠ms |
| CLS (Cumulative Layout Shift) | قد إيه العناصر اتنططت | ٠.١ أو أقل |
| FCP و Speed Index | أول حاجة ظهرت، وسرعة امتلاء الشاشة | |

ودوّرت في التقرير على [[interaction-to-next-paint]] (INP) **ملقتهوش**: التقرير العادي فعلًا مش بيقيس INP لأن مفيش حد بيدوس على حاجة.

### اللي قال يتصلّح

~~~text من نفس التقرير
image-alt                 Image elements do not have [alt] attributes
unsized-images            Image elements do not have explicit width and height
html-has-lang             <html> element does not have a [lang] attribute
meta-description          Document does not have a meta description
errors-in-console         Browser errors were logged to the console
render-blocking-insight   Render-blocking requests
~~~

كل واحد ليه سبب واضح في الصفحة: صورة من غير alt، صور من غير [[width]] و [[height]] (بيعملوا CLS لما يحمّلوا)، [[<html>]] من غير [[lang]]، مفيش [[<meta name="description">]]، 404 للـ favicon في Console، وملف CSS بيأخّر الرسم.

---

## ٢. [[npx lighthouse URL --preset=desktop --output=html --output-path=report.html]]

| الفلاج | معناه |
|---|---|
| [[--preset=desktop]] | قيس كديسكتوب: شاشة أكبر ومن غير تبطيء الموبايل |
| [[--output=html]] | التقرير HTML (ممكن [[json]] أو [[csv]]) |
| [[--output-path=report.html]] | احفظه في الملف ده بدل ما يفتح |

شغّلته وطلع [[report.html]] حجمه حوالي ٤٠٠ كيلو، تفتحه في أي متصفح.

> لو Chrome مش في مكانه المعتاد، Lighthouse بيقرا مساره من متغير [[CHROME_PATH]]. ولو قالك [[Unable to connect to Chrome]] يبقى مش لاقي Chrome خالص.

## الخلاصة

- Lighthouse = قياس معملي (lab data) بظروف ثابتة، Mobile افتراضيًا.
- LCP و TBT و CLS في التقرير، و INP مش فيه: ده من زوار حقيقيين (field data).
- الدرجة بتتغير كام نقطة بين كل تشغيل والتاني، فقارن متوسط ٢ أو ٣ مرات.`,
          lines: [
            "شغّل Lighthouse من الترمنال (npx بينزّله لو مش موجود) وافتح التقرير في المتصفح.",
            "بإعدادات الديسكتوب، واحفظ التقرير HTML في ملف."
          ],
          sol: R`[[npx lighthouse https://yoursite.com --view]] بيعمل Mobile افتراضيًا ويفتح التقرير. هتلاقي ٤ درجات (Performance و Accessibility و Best Practices و SEO) وتحت Performance أرقام زي LCP و TBT و CLS، وتحتها Opportunities و Diagnostics مرتبين حسب التأثير.

أول ٣ حاجات بتطلع غالبًا: صور كبيرة أو مش WebP/AVIF، render-blocking CSS/JS، صور من غير [[width]] و [[height]] (بتعمل CLS). بعد التصليح شغّله تاني، وخد بالك إن درجة Performance بتتغير كام نقطة بين كل تشغيل والتاني حتى من غير تعديل، فشغّله ٢ أو ٣ مرات وقارن المتوسط.

لو قالك [[Unable to connect to Chrome]] يبقى مفيش Chrome متسطب على الجهاز (أو في مكان غير معتاد، فحط مساره في [[CHROME_PATH]])، وتقدر تستخدم تاب Lighthouse في DevTools أو pagespeed.web.dev. جربته على صفحة تجربة محلية فيها صورة من غير alt ومن غير مقاسات: طلّع Accessibility 69 و SEO 83، وفي القايمة [[image-alt]] و [[unsized-images]] و [[meta-description]] بالظبط.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** شغّل Lighthouse على أي صفحة (Mobile، في Incognito)، واكتب الـ ٤ درجات، وقيم LCP و CLS و TBT، وأول ٣ اقتراحات.`, done: R`الأرقام مكتوبة، وكل اقتراح جنبه اسم الملف أو العنصر اللي بيتكلم عنه.` },
            { lvl: 'تطبيق', t: R`**قيس مرتين:** نفس الصفحة ٣ مرات ورا بعض في Lighthouse. الـ Performance score اتغيّر قد إيه؟ وبعدين مرة والـ extensions شغالة (نافذة عادية).`, done: R`عندك ٤ أرقام، والفرق بين التلاتة الأولانيين مكتوب (التذبذب طبيعي)، والنافذة العادية أقل أو مختلفة، فعرفت ليه بتقيس في Incognito وتاخد أكتر من قياس.` },
            { lvl: 'تطبيق', t: R`**صلّح وقيس:** صفحة فيها صورة hero [[loading="lazy"]] ومفيهاش [[width]] و [[height]]. شغّل Lighthouse، صلّح الاتنين، وشغّله تاني.`, done: R`LCP اتحسّن و CLS نزل، والاقتراحات اللي كانت بتتكلم عن الصورة دي (إنها lazy وهي صورة الـ LCP، وإنها من غير width و height) اختفت. في المعمل بتاع الدرس، [[lazy]] على الـ hero خلّى LCP حوالي ١١٠٠ms بدل ٨٤٠ (latency 150ms).` },
            { lvl: 'تطبيق', t: R`**من الترمنال:** [[npx lighthouse URL --only-categories=performance --output=json --output-path=lh.json --chrome-flags="--headless"]]، وبعدين اطبع LCP و CLS من الـ JSON بسطر [[node -e]].`, done: R`السطر بيطبع الرقمين من [[audits["largest-contentful-paint"].numericValue]] و [[audits["cumulative-layout-shift"].numericValue]].` },
            { lvl: 'تحدي', t: R`**ابني:** سكربت [[budget.js]] بيشغّل Lighthouse على ٣ صفحات ويفشل (exit 1) لو أي صفحة LCP أكبر من ٢٥٠٠ms أو CLS أكبر من ٠٫١، ويطبع جدول.`, done: R`على موقع سليم بيخرج [[0]] والجدول ٣ صفوف، ولما زوّدت صورة من غير مقاس في صفحة بيخرج [[1]] ويقول أنهي صفحة وأنهي رقم.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه Lighthouse ممكن يدّيك ٩٥ والمستخدمين الحقيقيين عندهم LCP وحش في PageSpeed Insights (قسم «Discover what your real users are experiencing»)؟ ٣ سطور (درس «Core Web Vitals (LCP/INP)»).`, done: R`كاتب إن Lighthouse زيارة معملية واحدة بجهاز ونت متقلّدين، و CrUX بيانات زيارات حقيقية (الـ p75 لـ ٢٨ يوم)، وأجهزة المستخدمين ونتهم أبطأ، و INP مبيتقاسش في Lighthouse Navigation أصلًا.` },
          ],
        },
        {
          cmd: "Core Web Vitals (LCP/INP)",
          title: "التلات أرقام اللي جوجل بيقيس بيها: LCP و INP و CLS، تقيسهم من Console بـ PerformanceObserver وتعرف مين السبب",
          desc: R`**Core Web Vitals** تلات أرقام بتقيس تجربة اليوزر الحقيقي: **LCP** (أكبر حاجة في الشاشة ظهرت إمتى: ٢٫٥ ثانية أو أقل كويس)، و **INP** (الصفحة بترد على الضغطة في قد إيه، أسوأ ضغطة تقريبًا: ٢٠٠ms أو أقل كويس، وحل محل FID من مارس ٢٠٢٤)، و **CLS** (الصفحة اتنططت قد إيه وهي بتحمّل: ٠٫١ أو أقل كويس). الحكم بيبقى على **p75**: ٧٥٪ من الزيارات لازم يبقوا تحت الحد.

بتقيسهم بنفسك من Console بـ [[PerformanceObserver]] (المثال)، وبيقولك كمان **مين** السبب: عنصر الـ LCP، والعناصر اللي اتزقت، ونوع الضغطة. وتاب Performance (وانت فاتحه من غير تسجيل) بيعرض الـ ٣ لايف لصفحتك. Lighthouse مبيقيسش INP (مفيش ضغطات)، فبيدّيك TBT كبديل. والأرقام بتاعة اليوزرز الحقيقيين (CrUX) في PageSpeed Insights و Search Console. في معمل الدرس: موقع فيه ٤ أخطاء كان LCP **٢٤٠٠ms** و CLS **٠٫٤٦٧٦** و INP **٣١٢ms**، وبعد التصليح **٨٩٦ms** و **٠** و **٢٤ms**.`,
          example: R`new PerformanceObserver(l => { const e = l.getEntries().at(-1); console.log("LCP", Math.round(e.startTime), e.element, e.url) }).observe({ type: "largest-contentful-paint", buffered: true })
let cls = 0; new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) { cls += e.value; console.log("shift", e.value.toFixed(4), e.sources.map(s => s.node)) } }).observe({ type: "layout-shift", buffered: true })
new PerformanceObserver(l => { for (const e of l.getEntries()) if (e.interactionId) console.log(e.name, Math.round(e.duration), "ms, processing", Math.round(e.processingEnd - e.processingStart)) }).observe({ type: "event", durationThreshold: 16, buffered: true })
performance.getEntriesByType("navigation")[0].responseStart
performance.getEntriesByName("first-contentful-paint")[0].startTime`,
          lines: [
            R`LCP: [[PerformanceObserver]] بيستنى entries من النوع [[largest-contentful-paint]]، و [[buffered: true]] بيجيب كمان اللي حصل قبل ما تكتب السطر. كل ما عنصر أكبر يظهر بييجي entry جديد، فآخر واحد ([[at(-1)]]) هو الـ LCP لحد دلوقتي. [[e.element]] العنصر نفسه (دوس عليه في Console يوديك Elements)، و [[e.url]] رابط الصورة لو صورة.`,
            R`CLS: كل [[layout-shift]] ليه [[value]] (قد إيه من الشاشة اتحرك وبمسافة قد إيه). [[hadRecentInput]] بيبقى [[true]] لو الحركة جات بعد ضغطة اليوزر بأقل من ٥٠٠ms (زي accordion اتفتح)، ودي مش بتتحسب. [[e.sources]] العناصر اللي اتحركت. والمجموع هنا تقريب: CLS الرسمي بياخد أكبر «نافذة» shifts (session window ٥ ثواني).`,
            R`INP: أحداث [[event]] اللي ليها [[interactionId]] (ضغطة أو كيبورد، مش mousemove). [[duration]] من لحظة الضغطة لحد ما الشاشة اترسمت بعدها (input delay + processing + presentation). [[durationThreshold: 16]] بيجيب أي حاجة ١٦ms أو أكتر (الافتراضي ١٠٤). و [[processingEnd - processingStart]] = وقت الـ event handlers بتوعك بس.`,
            R`TTFB تقريبًا: [[responseStart]] من entry الـ navigation = إمتى أول byte من الـ HTML وصل (بالـ ms من أول التنقّل). لو كبير، مشكلة الـ LCP بتبدأ من السيرفر قبل أي صورة.`,
            R`FCP: إمتى أول حاجة (نص أو صورة) اترسمت. لو FCP متأخر يبقى فيه حاجة **بتمنع الرسم** (CSS أو سكربت في [[<head>]])، ولو FCP بدري و LCP متأخر يبقى العنصر الكبير نفسه متأخر.`,
          ],
          try: R`افتح أي صفحة، والصق السطور التلاتة الأولانية في Console، واعمل ريفريش (هتحتاج تلصقهم تاني، أو حطهم في Snippet). اكتب LCP وعنصره، والـ shifts والعناصر اللي اتحركت. وبعدين دوس على أكتر زرار تقيل في الصفحة (فلتر، تاب، أضف للسلة) واقرا الـ duration والـ processing. وقارن بالأرقام اللي في تاب Performance لما تفتحه.`,
          deep: {
            why: R`«الموقع بطيء» كلام مالوش رقم. الـ ٣ أرقام دول بيقسموا البطء لـ ٣ أسئلة اليوزر بيحس بيها: المحتوى ظهر إمتى (LCP)، والصفحة ردت عليا لما دوست (INP)، والزرار اتحرك من تحت صباعي (CLS). وجوجل بيستخدمهم في ترتيب نتايج البحث (جزء من page experience)، و PageSpeed Insights و Search Console بيحكموا عليهم بالـ p75 من زيارات Chrome حقيقية.`,
            how: R`المتصفح بيسجّل كل حاجة كـ performance entries. LCP: كل ما عنصر (صورة، أو [[<video>]] poster، أو بلوك نص، أو background-image) يترسم ويبقى أكبر من اللي قبله، entry جديد، ولما اليوزر يضغط أو يعمل scroll بيوقف. CLS: كل حركة لعنصر ظاهر بتتحسب = نسبة المساحة اللي اتأثرت × نسبة المسافة، والـ shifts بتتجمّع في نوافذ (أقل من ثانية بينهم، وبحد ٥ ثواني) وأكبر نافذة هي الـ CLS. INP: لكل interaction (pointerdown و pointerup و click لنفس الضغطة بياخدوا نفس [[interactionId]]) المدة من الضغطة لحد الـ frame اللي بعد الـ handlers، والـ INP أسوأ واحدة (أو قريب من الأسوأ لو الصفحة فيها ضغطات كتير جدًا). وفي المعمل: الضغطة على «ضيف للسلة» كان فيها [[pointerdown 312]] و [[pointerup 312]] و [[click 312]] و processing الـ click [[300]]: يعني كل الوقت جوه الـ handler.`,
            when: R`بعد أي تغيير في صورة الـ hero، أو الخطوط، أو الـ layout، أو أي handler تقيل. وقبل ما تقول «الموقع سريع» لزبون. وفي CI بـ Lighthouse (LCP و CLS و TBT) أو Playwright بنفس السطور، وفي الإنتاج بمكتبة [[web-vitals]] ([[onLCP]] و [[onINP]] و [[onCLS]]، من وثايقها) اللي بتبعت الأرقام الحقيقية لسيرفرك.`,
            mistakes: R`تقيس على جهازك السريع ونت الفايبر وتصدّق (استخدم CPU 4x و Slow 4G). تحكم من زيارة واحدة. تحط [[loading="lazy"]] على صورة الـ hero (في المعمل LCP بقى حوالي ١١٠٠ms بدل ٨٤٠). تحسب CLS بـ shifts جات بعد ضغطة اليوزر. تدوّر على INP في Lighthouse (مش موجود في وضع Navigation). تفتكر إن FCP بدري يعني النص ظهر (في المعمل FCP كان ١٩٦ms والعنوان مخفي لحد ما الخط وصل عند ٨٢٥ms). أو تصلّح CLS بـ [[min-height]] عشوائي بدل [[width]] و [[height]] أو [[aspect-ratio]] الحقيقيين.`
          },
          teach: R`## الأول: التلات أرقام والحدود

| الرقم | بيقيس | كويس | محتاج تحسين | وحش |
|---|---|---|---|---|
| **LCP** (Largest Contentful Paint) | أكبر عنصر في الشاشة ظهر إمتى | ٢٫٥ ثانية أو أقل | لحد ٤ ثواني | أكتر من ٤ |
| **INP** (Interaction to Next Paint) | الضغطة لحد ما الشاشة اتحدّثت | ٢٠٠ms أو أقل | لحد ٥٠٠ms | أكتر من ٥٠٠ |
| **CLS** (Cumulative Layout Shift) | الصفحة اتنططت قد إيه | ٠٫١ أو أقل | لحد ٠٫٢٥ | أكتر من ٠٫٢٥ |

الحدود من web.dev، والحكم على **p75**: رتّب كل الزيارات، وخد الرقم اللي ٧٥٪ منهم أحسن منه. يعني لو ربع اليوزرز عندهم LCP وحش، الصفحة «محتاجة تحسين» حتى لو انت شايفها سريعة.

---

## المعمل: موقع مخبز فيه ٤ مشاكل

كله اتقاس في Chrome 156 (headless، عرض 1366) بالسطور اللي في المثال (اتحطت قبل التحميل بـ [[addInitScript]] بتاع Playwright)، على سيرفر Node 24 بـ https محلي. الموقع كامل وخطوات تشخيصه في درس «مشروع تشخيص موقع بطيء ومكسور»، وهنا بنقرا الأرقام بس:

~~~text النسخة المكسورة
paint {"first-paint":1584,"first-contentful-paint":1584}
LCP 2400 hero hero.png
CLS 0.4676 [[0.4676, 2362, "cards,H1,promo"]]
INP 312 [["pointerdown",312,0],["pointerup",312,0],["click",312,300]]
~~~

~~~text بعد التصليح
paint {"first-paint":196,"first-contentful-paint":196}
LCP 896 hero hero.avif
CLS 0.0000 []
INP 24 [["pointerdown",24,0],["pointerup",24,0],["click",24,0]]
~~~

---

## ١. LCP: مين العنصر، واتأخر فين

[[LCP 2400 hero hero.png]]: العنصر [[img.hero]] والصورة [[hero.png]] (١٫٨ ميجا PNG)، ظهرت عند ٢٤٠٠ms. LCP بيتقسم ٤ حتت، وكل واحدة ليها سبب:

| الحتة | السؤال | لو كبيرة |
|---|---|---|
| TTFB | الـ HTML وصل إمتى؟ ([[responseStart]]) | السيرفر أو الـ CDN بطيء |
| Resource load delay | الصورة **بدأت** تتطلب إمتى بعد الـ HTML؟ | الصورة متكتشفتش بدري: [[lazy]]، أو جاية من CSS أو JavaScript |
| Resource load time | خدت قد إيه وهي بتنزل؟ | الملف تقيل: صيغة، ومقاس، وضغط |
| Element render delay | نزلت، اترسمت إمتى؟ | CSS أو خط أو سكربت مانع الرسم |

وعشان أعزل أثر [[loading="lazy"]] لوحده، عملت صفحة فيها صورة hero بمقاسها و ١٢ صورة صغيرة، على latency 150ms وعرض موبايل 412، ٣ مرات لكل واحدة:

~~~text LCP بالـ ms (والصورة اتطلبت إمتى)
lazy   LCP ms: 1112(hero req 757), 1100(hero req 746), 1100(hero req 758)
eager  LCP ms:  780(hero req 202),  888(hero req 296),  856(hero req 270)
high   LCP ms:  792(hero req 202),  816(hero req 207),  776(hero req 189)
~~~

- [[lazy]]: المتصفح مبيطلبش الصورة غير بعد ما يعمل layout ويعرف إنها في الشاشة، فاتطلبت عند **٧٥٠ms** بدل **٢٠٠ms**، و LCP اتأخر حوالي ٢٥٠ms. [[lazy]] على صورة الـ LCP غلط دايمًا.
- [[fetchpriority="high"]]: فرق صغير هنا (الصورة كانت أول حاجة في الـ HTML أصلًا) بس أثبت. بيفرق أكتر لما فيه سكربتات وصور كتير قبلها.

---

## ٢. CLS: مين اتحرك

[[0.4676]] shift واحد عند ٢٣٦٢ms، والعناصر اللي اتزقت [[cards]] و [[H1]] و [[promo]]: الصورة وصلت من غير [[width]] و [[height]]، فكانت ارتفاعها صفر، ولما وصلت زقت كل اللي تحتها. ٠٫٤٧ = «وحش» (أكتر من ٠٫٢٥) من حركة واحدة.

التصليح: [[<img width="1600" height="900">]] مع [[height: auto]] في الـ CSS. المتصفح بيحسب [[aspect-ratio]] من الرقمين ويحجز المكان قبل ما الصورة توصل. بعدها: [[CLS 0.0000 []]].

في DevTools: Performance ثم سجّل الريفريش، وفي track **Layout shifts** مربعات بنفسجي، دوس على واحد يقولك العناصر. أو Rendering (Command Menu) ثم **Layout Shift Regions**: كل shift بيلمع أزرق على الصفحة.

---

## ٣. INP: الوقت راح فين

الضغطة الواحدة طلّعت ٣ أحداث بنفس الـ [[interactionId]]: [[pointerdown]] و [[pointerup]] و [[click]]، وكلهم [[312]]. و processing الـ [[click]] = [[300]]. يعني الضغطة مستنية الـ handler يخلص شغل ٣٠٠ms قبل ما الشاشة تترسم:

~~~javascript الـ handler المكسور
b.addEventListener("click", () => {
  const end = performance.now() + 300;   // «بنحسب العروض»
  while (performance.now() < end) {}
  cart.textContent = "السلة (" + (++count) + ")";
});
~~~

التصليح: حدّث الشاشة **الأول**، وأجّل الشغل التقيل لبعد الرسم:

~~~javascript بعد التصليح
b.addEventListener("click", () => {
  cart.textContent = "السلة (" + (++count) + ")";
  setTimeout(() => { /* نفس الـ 300ms */ }, 0);
});
~~~

بعدها [[INP 24]] و processing [[0]]. الشغل لسه موجود، بس بعد الـ frame. وفي Chrome فيه [[await scheduler.yield()]] لنفس الغرض جوه دالة طويلة (من Chrome docs). و [[setTimeout(0)]] مش مضمون يجي بعد الرسم في كل الحالات، فلو الشغل ضروري يبقى بعد الرسم: [[requestAnimationFrame(() => setTimeout(work, 0))]].

INP = **input delay** (الـ main thread كان مشغول قبل ما الضغطة تبدأ) + **processing** (الـ handlers) + **presentation** (الرسم بعدها). لو processing صغير و duration كبير، الـ main thread كان مشغول بحاجة تانية: سجّل Performance ودوّر على long tasks.

---

## ٤. FCP بدري مش معناه إن النص ظهر

في نسخة فيها الخط من غير [[font-display: swap]]، صوّرت الـ header كل شوية (بـ DevTools Protocol مباشرة، لأن [[page.screenshot]] بتاع Playwright بيستنى الخطوط) وعدّيت البكسلات البيضا (النص أبيض على بني):

~~~text بكسلات النص الأبيض في الـ header
من غير swap  300ms:826  500ms:826  700ms:826  1000ms:965  1500ms:965
بـ swap      300ms:961  500ms:961  700ms:961  1000ms:965  1500ms:965
~~~

في الاتنين FCP كان حوالي ١٩٦ms، بس من غير swap عنوان الـ header (حوالي ١٣٥ بكسل) **مخفي** لحد ما الخط وصل (٨٢٥ms). [[swap]] بيعرض النص بالخط الاحتياطي على طول ويبدّل لما الخط يوصل.

---

## ٥. فين تلاقي الأرقام دي

| المكان | نوع البيانات | فيه INP؟ |
|---|---|---|
| السطور في المثال (Console أو Snippet) | زيارتك انت دلوقتي | آه، لما تضغط |
| تاب Performance (من غير تسجيل) | زيارتك، لايف | آه |
| Lighthouse | زيارة معملية متقلّدة | لأ (TBT بداله) |
| PageSpeed Insights (القسم الأول) و Search Console | CrUX: زيارات Chrome حقيقية، p75 لآخر ٢٨ يوم | آه |
| مكتبة [[web-vitals]] في موقعك | زيارات يوزرزك، تبعتها لسيرفرك | آه |

## الخلاصة

- LCP ≤ ٢٫٥s، و INP ≤ ٢٠٠ms، و CLS ≤ ٠٫١، على الـ p75.
- [[PerformanceObserver]] بـ [[buffered: true]] بيقولك الرقم **والسبب** (العنصر، والعناصر اللي اتحركت، ووقت الـ handler).
- LCP: متحطش [[lazy]] على صورة الـ hero، وصغّر الصورة (درس «صيغ الصور WebP و AVIF»).
- CLS: [[width]] و [[height]] على كل صورة. INP: حدّث الشاشة الأول وأجّل الشغل.
- القياس المعملي (Lighthouse) غير الحقيقي (CrUX): الاتنين مهمين.`,
          sol: R`على أغلب المواقع هتلاقي LCP صورة (hero أو أول صورة منتج) أو [[<h1>]] كبير، ورقمه على جهازك أقل من ثانية تقريبًا (جرّب Slow 4G و CPU 4x يطلع أكبر بكتير). الـ shifts: لو فيه صور من غير مقاس أو بانر إعلانات أو خط بيتبدّل هتلاقي entries و [[sources]] بتشاور على العناصر، ولو مفيش هيفضل [[0]].

والضغطة: هتلاقي ٢–٣ أحداث بنفس الوقت تقريبًا ([[pointerdown]] و [[pointerup]] و [[click]]). لو الـ duration أكبر من ٢٠٠ والـ processing قريب منه، الـ handler نفسه تقيل. لو processing صغير والـ duration كبير، الـ main thread كان مشغول قبلها.

وفي المعمل بتاع الدرس: LCP [[2400]] ثم [[896]]، و CLS [[0.4676]] ثم [[0]]، و INP [[312]] ثم [[24]].`,
          flag: "console",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب الـ ٣ أرقام وحدودهم (كويس) من دماغك، وإيه هو p75، وأنهي واحد مش موجود في Lighthouse.`, done: R`LCP ٢٫٥s، و INP ٢٠٠ms، و CLS ٠٫١، و p75 = ٧٥٪ من الزيارات أحسن منه، و INP مش في Lighthouse (Navigation)، وصحّحت من الجدول.` },
            { lvl: 'تطبيق', t: R`**قيس:** حط السطور التلاتة في Snippet، وشغّلها على ٣ صفحات من موقعك (أو أي مواقع) بعد الريفريش، واملى جدول: LCP وعنصره، و CLS ومين اتحرك، وأسوأ ضغطة.`, done: R`جدول ٣ صفوف، وكل LCP جنبه العنصر (اسمه أو الـ url)، وأي shift جنبه العناصر، وأي ضغطة فوق ٢٠٠ms متعلّم عليها.` },
            { lvl: 'تطبيق', t: R`**صلّح وقيس (CLS):** صفحة فيها صورة hero من غير [[width]] و [[height]] وسيرفر بيأخّرها ٨٠٠ms. قيس CLS، وصلّح، وقيس تاني.`, done: R`قبل: shift واحد كبير (في المعمل [[0.4676]]) وعناصره اللي تحت الصورة، وبعد [[width]] و [[height]] و [[height: auto]]: [[0]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس (LCP):** نفس صفحة الـ hero بـ [[loading="lazy"]]، ومن غيره، و [[fetchpriority="high"]]، ٣ مرات لكل واحدة على latency 150ms (custom throttling).`, done: R`جدول ٩ أرقام، و [[lazy]] الأبطأ بوضوح (في المعمل حوالي ١١٠٠ مقابل ٨٤٠ و ٨٠٠ms)، ووقت طلب الصورة ([[requestStart]] من [[performance.getEntriesByName]]) بيشرح ليه.` },
            { lvl: 'تحدي', t: R`**صلّح وقيس (INP):** فلتر منتجات بيرسم ٢٠٠٠ كارت مع كل حرف في الـ search. قيس الـ duration والـ processing لكل ضغطة كيبورد، وبعدين صلّح (debounce، أو ترسم أول ٥٠ وتكمّل بعد [[scheduler.yield()]]، أو [[content-visibility]]) وقيس تاني.`, done: R`قبل: ضغطات فوق ٢٠٠ms و processing كبير، وبعد: كل الضغطات تحت ٢٠٠ms، والنتيجة النهائية للفلتر نفسها مااتغيّرتش.` },
            { lvl: 'تحدي', t: R`**ابني:** سكربت Playwright بيفتح ٣ صفحات بـ CPU throttling 4x (عن طريق [[Emulation.setCPUThrottlingRate]] في CDP)، ويحقن السطور قبل التحميل، ويضغط زرار في كل صفحة، ويطبع جدول LCP و CLS و INP، ويخرج بـ [[1]] لو أي رقم وحش.`, done: R`السكربت بيطبع ٣ صفوف بالأرقام وبيخرج [[0]] على صفحات سليمة، ولما زوّدت [[lazy]] على الـ hero أو حلقة ٣٠٠ms في handler خرج [[1]] وقال أنهي صفحة وأنهي رقم.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`// p75 and the web.dev rating for field samples
const limits = { LCP: [2500, 4000], INP: [200, 500], CLS: [0.1, 0.25] };
function p75(values) {
  const s = [...values].sort((a, b) => a - b);
  return s[Math.ceil(0.75 * s.length) - 1];
}
function rate(metric, v) {
  const [good, poor] = limits[metric];
  return v <= good ? "good" : v <= poor ? "needs-improvement" : "poor";
}
const field = {
  LCP: [900, 1200, 1800, 2100, 2300, 2600, 3100, 5200],
  INP: [40, 60, 80, 90, 120, 180, 240, 650],
  CLS: [0, 0, 0, 0.02, 0.05, 0.08, 0.3, 0.47],
};
for (const [m, vals] of Object.entries(field)) {
  const v = p75(vals);
  console.log(m + " p75=" + v + " " + rate(m, v));
}
console.log("lab broken:", rate("LCP", 2400), rate("CLS", 0.4676), rate("INP", 312));
console.log("lab fixed:", rate("LCP", 896), rate("CLS", 0), rate("INP", 24));`, expect: [R`LCP p75=2600 needs-improvement`, R`INP p75=180 good`, R`CLS p75=0.08 good`, R`lab broken: good poor needs-improvement`, R`lab fixed: good good good`] },
          ],
        },
        {
          cmd: "Performance و Coverage",
          title: "إيه اللي تاقل الصفحة",
          desc: "Performance: دوس Record، اعمل الحاجة البطيئة، ووقف التسجيل. الـ Long tasks (عليها علامة حمرا) هي الـ JavaScript اللي بيعلّق الصفحة. Coverage بيوريك قد إيه من كل ملف JS و CSS اتحمّل ومستخدمش، والأحمر كود تقدر تأجل تحميله.",
          example: R`Ctrl+Shift+P > "Show Coverage" > reload
Performance > Record > do the slow action > Stop`,
          try: "اعرف نسبة الـ CSS اللي مش مستخدم في الصفحة الرئيسية بتاعة موقعك.",
          flag: "keys",
          deep: {
            why: "Lighthouse قالك درجة منخفضة، بس محتاج تعرف بالظبط إيه اللي بياخد الوقت.",
            how: R`Coverage: Ctrl+Shift+P ثم «Show Coverage». الأحمر كود بيتحمّل ومش بيتنفّذ. كتير أحمر يعني code splitting ممكن يحسّن التحميل كتير.

Performance tab: Record ثم افعل الـ action البطيئة ثم Stop. الـ Long Tasks (مستطيلات حمرا) JavaScript بيشتغل لأكتر من ٥٠ms ويعلّق الشاشة.`,
            when: "لما Performance score منخفض. لما تضغط حاجة والصفحة تعلّق.",
            mistakes: "تتجاهل Coverage لأن درجتك مش وحشة. التطبيقات الكبيرة ممكن بتحمّل ضعف ما تحتاجه."
          },
          teach: R`## الأول: أداتين بيجاوبوا سؤالين

- **Performance**: الصفحة بتعمل إيه في كل ms؟ مين قفل الـ main thread؟
- **Coverage**: من الـ CSS والـ JS اللي اتحمّل، قد إيه اتستخدم فعلًا؟

الأزرار من Chrome DevTools docs. والأرقام اللي تحت جربتها في Chrome على صفحة تجربة بنفس البروتوكول اللي اللوحتين بيستخدموه.

---

## ١. [[Ctrl+Shift+P > "Show Coverage" > reload]]

[[Ctrl+Shift+P]] يفتح Command Menu، وتكتب Show Coverage، وتدوس زرار الريفريش اللي في اللوحة عشان يسجّل من أول التحميل.

ملف الـ CSS في صفحة التجربة:

~~~text app.css
h1 { font-size: 2rem; color: navy }
button { background: #0a7 } button:hover { background: #085 }
.modal { position: fixed; inset: 0 } .tooltip { display: none } .footer-old { color: gray }
~~~

~~~text نتيجة الـ coverage
http://127.0.0.1:8791/assets/app.css   total 189   used 62   unused 127   67%
used: "h1 { font-size: 2rem; color: navy }" | "button { background: #0a7 }"
~~~

- **total**: حجم الملف بالـ byte. **used**: الحتت اللي اتطبقت على عناصر موجودة. **unused**: الباقي، وده الأحمر في اللوحة.
- ٦٧٪ مش مستخدم. بس بص مين: [[button:hover]] (هيتستخدم لما الماوس ييجي)، و [[.modal]] و [[.tooltip]] (ممكن لعناصر بتظهر بعدين)، و [[.footer-old]] (ده اللي فعلًا ميت). عشان كده «مش مستخدم دلوقتي» مش معناها «امسحه».

---

## ٢. [[Performance > Record > do the slow action > Stop]]

بتسجّل والصفحة شغالة، وتطلع timeline. الـ **Long task** = أي شغل على الـ main thread أطول من ٥٠ms، وخلاله الصفحة مش بترد على كليك ولا scroll. في اللوحة عليها مثلث أحمر.

جربت أعمل واحدة بإيدي وأمسكها بالـ API اللي بيعدّهم:

~~~javascript Console
window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => __lt.push(Math.round(e.duration)))).observe({ type: "longtask", buffered: true });
setTimeout(() => { const t = Date.now(); while (Date.now() - t < 300) {} }, 10);
__lt
~~~

~~~text الناتج
[299]
~~~

- [[PerformanceObserver]]: «بلّغني لما يحصل نوع معين من الأحداث»، والنوع هنا [[longtask]].
- [[while (Date.now() - t < 300) {}]]: لفّة فاضية ٣٠٠ms، يعني JavaScript تقيل.
- النتيجة task واحدة ٢٩٩ms. في Performance هتبان كمستطيل أحمر، وتدوس عليه تلاقي الفانكشن المسؤولة في Bottom-Up أو Call Tree.

## الخلاصة

- Coverage: الأحمر كود اتحمّل ومتنفّذش، والحل غالبًا تقسيم أو تأجيل مش مسح.
- Performance: دوّر على Long tasks (أكتر من ٥٠ms)، دي اللي بتعلّق الصفحة.`,
          sol: R`Ctrl+Shift+P ثم Show Coverage ثم زرار الريفريش في اللوحة. هتلاقي جدول بكل ملف CSS و JS، وعمود Unused Bytes ونسبته، وشريط أحمر (مش مستخدم) وأخضر (مستخدم). نسبة CSS المش مستخدم في الصفحة الرئيسية بتبقى عادي ٥٠٪ لـ ٩٠٪ لو بتستخدم framework زي Bootstrap كامل.

دوس على الملف وهيفتحه في Sources والسطور المش مستخدمة عليها علامة حمرا. خد بالك: «مش مستخدم في الصفحة دي وقت التحميل» مش معناها «مش مستخدم خالص»، ممكن يكون لصفحة تانية أو لـ hover أو modal. فالحل مش تمسحه، الحل تقسّم الـ CSS أو تستخدم purge (زي اللي Tailwind بيعمله).`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** سجّل Performance لريفريش الصفحة (زرار reload في Performance)، ولاقي: FCP و LCP في الـ Timings، وأطول task عليها مثلث أحمر، واسم الدالة اللي فيها.`, done: R`الأرقام مكتوبة، والـ long task أطول من ٥٠ms، واسم الدالة والملف من Bottom-Up أو من الـ flame chart.` },
            { lvl: 'تطبيق', t: R`**Coverage:** على صفحتك، شغّل Coverage واعمل ريفريش. اكتب أكبر ٣ ملفات ونسبة الـ unused في كل واحد، وبعدين اعمل شوية تفاعل (افتح menu، modal) وشوف النسبة نزلت قد إيه.`, done: R`جدول ٣ ملفات بنسبتين (بعد التحميل وبعد التفاعل)، وكاتب إن الكود اللي لسه أحمر بعد التفاعل مرشّح يتأجّل أو يتشال.` },
            { lvl: 'تطبيق', t: R`**CPU throttling:** نفس الـ recording بـ CPU 4x slowdown (من ترس Performance). الـ long tasks بقت كام ms؟`, done: R`الـ task نفسها بقت أطول بـ ٣–٤ مرات تقريبًا، وكاتب إن الموبايل المتوسط أقرب لده من جهازك.` },
            { lvl: 'تطبيق', t: R`**Layout shifts:** سجّل ريفريش لصفحة فيها صورة من غير مقاس، ولاقي في track الـ Layout shifts المربع البنفسجي، ودوس عليه وشوف العنصر اللي اتحرك.`, done: R`عندك قيمة الـ shift والعناصر اللي اتزقّت. في معمل «مشروع تشخيص موقع بطيء ومكسور» الـ shift كان [[0.4676]] والعناصر [[cards]] و [[H1]] و [[promo]] لما صورة الـ hero وصلت عند ٢٤٠٠ms تقريبًا.` },
            { lvl: 'تحدي', t: R`**صلّح وقيس (INP):** زرار بيعمل حساب ٣٠٠ms قبل ما يحدّث الشاشة. سجّل Performance وانت بتدوسه، ولاقي الـ interaction في track Interactions، وقسّم الشغل بحيث الشاشة تتحدّث الأول.`, done: R`قبل: interaction حوالي ٣١٠ms وفيها Processing ٣٠٠ms، وبعد ([[setTimeout]] أو [[scheduler.yield()]] بعد تحديث الشاشة): حوالي ٢٥–٣٥ms. ده نفس القياس اللي في معمل الدرس (٣١٢ ← ٢٤ms).` },
            { lvl: 'تحدي', t: R`**FOUC (dark flash):** موقع بيحط [[class="dark"]] على [[html]] من سكربت في آخر الـ body، وبيبان أبيض لحظة قبل ما يبقى غامق. سجّل Performance بـ Screenshots، ولاقي الـ frame الأبيض، وصلّحه بسكربت صغير inline في [[<head>]].`, done: R`قبل: فيه frame أو أكتر أبيض في شريط الصور، وبعد: أول frame غامق على طول. ولو الموقع عليه CSP، السكربت الـ inline ده محتاج hash أو nonce (درس «Content Security Policy»).` },
          ],
        },
        {
          cmd: "Memory و heap snapshot",
          title: "الصفحة بتتقل كل ما تفتح modal: heap snapshot قبل وبعد، و Detached، والـ listener اللي ماسك كل حاجة",
          desc: R`لو الصفحة بتبقى أبطأ مع الوقت (أو التاب بيقع في الموبايل بعد شوية)، غالبًا فيه **memory leak**: حاجات خلصت بس لسه محجوزة. تاب **Memory**: اعمل **Heap snapshot**، وكرر الحاجة المشكوك فيها (افتح واقفل الـ modal ٣٠ مرة)، وخد snapshot تاني، واختار **Comparison** واكتب [[Detached]] في الفلتر: هتلاقي عناصر DOM اتشالت من الصفحة ولسه حد ماسكها. وقبل كل snapshot دوس **Collect garbage** (أيقونة الزبالة) عشان تقيس اللي فاضل فعلًا. وأسرع مؤشر من غير snapshots: Command Menu ثم **Show Performance monitor**، وبص على JS heap size و DOM Nodes و JS event listeners: لو بيطلعوا ومبينزلوش، فيه leak.

في المعمل: ٣٠ مرة فتح وقفل modal فيه ٢٠ صورة: الـ heap من **٢٫٢٤** لـ **٢٢٫٩٦ ميجا**، و DOM Nodes من **٩٧** لـ **٧٢٧**، والـ listeners من **١٩** لـ **٤٩**، والـ snapshot فيه **٣١** [[<div class="gallery">]] متعلّمين detached. السبب سطر واحد: [[window.addEventListener("resize", ...)]] مع كل فتحة ومحدش بيشيله، والـ callback ماسك الـ panel وشوية بيانات. التصليح بـ [[AbortController]]: بعدها الـ heap فضل **١٫٤٩ → ١٫٦٠ ميجا** والـ nodes **٨٢ → ٨٢**.`,
          example: R`Ctrl+Shift+P > "Show Performance monitor"
Memory > Collect garbage (trash icon) > Heap snapshot > Take snapshot
Repeat the action 30 times > Collect garbage > Take snapshot
Snapshot 2 > Comparison > Class filter: Detached
getEventListeners(window).resize.length
window.addEventListener("resize", onResize, { signal: ctrl.signal })`,
          lines: [
            R`Performance monitor: شريط لايف تحت DevTools فيه CPU و JS heap size و DOM Nodes و JS event listeners و Layouts/sec. اعمل الحاجة كذا مرة وبص: الرقم بيطلع وينزل (طبيعي) ولا بيطلع بس (leak)؟ ده نفس اللي [[Performance.getMetrics]] بيرجّعه في المعمل.`,
            R`في تاب Memory: Collect garbage الأول (عشان متحسبش زبالة لسه متجمعتش)، وبعدين Heap snapshot: صورة لكل object في الذاكرة دلوقتي ومين ماسكه. الـ snapshot الأول هو «قبل».`,
            R`كرر الحاجة المشكوك فيها كتير (٣٠ مرة بتخلّي أي leak يبان كرقم مضروب في ٣٠)، وارجع للحالة الأولى (الـ modal مقفول)، و Collect garbage، و snapshot تاني. لو مفيش leak المفروض الاتنين قريبين.`,
            R`في الـ snapshot التاني اختار Comparison بدل Summary (بيقارن بالأول)، ورتّب بـ [[# Delta]]، واكتب [[Detached]] في Class filter: العناصر اللي اتشالت من الصفحة ولسه في الذاكرة. دوس على واحد، وتحت في Retainers هتلاقي مين ماسكه (هنا: closure جوه listener على [[window]]).`,
            R`في Console (مش في الكود: [[getEventListeners]] موجودة في Console بس): كام resize listener على [[window]]؟ في المعمل بعد ٣٠ فتحة: [[30]] في النسخة المكسورة و [[0]] بعد التصليح.`,
            R`التصليح: كل listener بتضيفه مع فتحة الـ modal خليه بـ [[signal]] من [[AbortController]]، ولما تقفل: [[ctrl.abort()]] بيشيل كل الـ listeners اللي اتسجّلت بالـ signal ده مرة واحدة، فالـ closure يتساب والـ panel يتمسح.`,
          ],
          try: R`ابني صفحة المعمل اللي في الشرح (زرار بيفتح modal فيه ٢٠ صورة، ومع كل فتحة [[addEventListener("resize", ...)]] من غير ما يتشال). افتح Performance monitor، وافتح واقفل الـ modal ٣٠ مرة وبص على DOM Nodes و listeners. وبعدين خد snapshot قبل وبعد، ولاقي الـ Detached والـ Retainers. صلّح بـ [[AbortController]] وكرر.`,
          deep: {
            why: R`الـ SPA بتفضل مفتوحة ساعات (داشبورد، شات، لوحة أدمن)، ومحدش بيعمل ريفريش. أي حاجة بتتسرّب مع كل فتحة modal أو تغيير صفحة بتتجمع: الصفحة تتقل، والـ garbage collector يشتغل أكتر (تقطيع)، وفي الموبايل التاب بيتقفل لوحده. و Lighthouse ولا Network مش هيبيّنوا ده أبدًا، لأنه مش في التحميل، في الاستخدام.`,
            how: R`الـ garbage collector في V8 بيمسح أي object مفيش طريق ليه من «الجذور» (الـ [[window]] والمتغيرات العامة والـ stack والـ DOM نفسه). عنصر DOM اتشال بـ [[remove()]] بيخرج من الشجرة، بس لو أي object لسه شايل reference ليه (متغير عام، أو Map، أو closure جوه listener متسجّل)، بيفضل حي ومعاه كل اللي جواه: ده «Detached». في المعمل: الـ callback بتاع [[resize]] closure شايل [[panel]] (و ٢١ node جواه) و [[history]] (٢٠ ألف object)، والـ listener متسجّل على [[window]] اللي هو جذر، فولا حاجة فيهم بتتمسح. الـ snapshot بيحفظ كل object وحجمه (Shallow = حجمه هو، Retained = اللي هيتمسح لو هو اتمسح) ومين بيشاور عليه (Retainers)، وفي النسخ الجديدة كل node عليه علامة attached أو detached. و [[AbortController]] بيشيل الـ listener، فالسلسلة تتقطع من عند الجذر.`,
            when: R`لما Performance monitor يبيّن رقم بيطلع بس، أو يوزر يقول «بعد شوية بيتقل»، أو قبل ما تطلّع component بيتفتح ويتقفل كتير (modal، tooltip، تاب، route في SPA). وفي Node نفس الفكرة بـ [[node --inspect]] و Memory من [[chrome://inspect]] (درس «chrome://inspect»)، و [[heap out of memory]] في درس «الذاكرة» في تاب Node.`,
            mistakes: R`تقارن snapshots من غير Collect garbage فتلاقي فرق مش leak. تعمل الحاجة مرة واحدة (الفرق صغير يتوه وسط الضوضاء: اعملها ٣٠). تقارن والـ modal لسه مفتوح (طبيعي يبقى في الذاكرة). تستخدم [[console.log(panel)]] وانت بتديبج: Console نفسه بيمسك الـ object فيبان leak مش موجود (امسح Console). تشيل الـ listener بـ [[removeEventListener]] بدالة مختلفة عن اللي سجّلتها (لازم نفس الـ reference). أو تفتكر [[WeakRef]] حل: الحل تشيل الـ reference مش تخبيها.`
          },
          teach: R`## الأول: إزاي تعرف إن فيه leak أصلًا

Command Menu ([[Ctrl+Shift+P]]) ثم **Show Performance monitor**. هيطلع شريط فيه أرقام لايف. اعمل الحاجة المشكوك فيها ١٠ مرات وبص:

| الرقم | طبيعي | leak |
|---|---|---|
| JS heap size | بيطلع وينزل (GC بيمسح) | بيطلع بس، حتى بعد ما تستنى |
| DOM Nodes | يرجع لنفس الرقم بعد ما تقفل | بيزيد مع كل مرة |
| JS event listeners | يرجع لنفس الرقم | بيزيد مع كل مرة |

---

## المعمل

صفحة المخبز (نفس موقع درس «مشروع تشخيص موقع بطيء ومكسور»)، فيها زرار «التفاصيل» بيفتح modal فيه معرض ٢٠ صورة:

~~~javascript app.js (النسخة المكسورة)
document.querySelectorAll(".more").forEach(b => b.addEventListener("click", () => {
  const panel = document.createElement("div");
  panel.className = "gallery";
  panel.innerHTML = '<img src="/img/card.jpg" alt="">'.repeat(20);
  const history = Array.from({ length: 20000 }, (_, i) => ({ i, at: Date.now() }));
  window.addEventListener("resize", () => { panel.style.width = innerWidth + "px"; history.length; });
  modal.querySelector(".box").prepend(panel);
  modal.hidden = false;
}));
document.getElementById("close").addEventListener("click", () => {
  modal.querySelector(".gallery").remove();
  modal.hidden = true;
});
~~~

الـ [[remove()]] شايل الـ panel من الصفحة. بس الـ listener اللي على [[window]] لسه متسجّل، وجواه [[panel]] و [[history]].

القياس: Chrome 156 (headless) بـ Playwright، و [[HeapProfiler.collectGarbage]] قبل كل قراية (نفس زرار الزبالة)، والأرقام من [[Performance.getMetrics]] (نفس Performance monitor)، والـ snapshot من [[HeapProfiler.takeHeapSnapshot]] (نفس زرار Take snapshot).

---

## ١. قبل وبعد ٣٠ فتحة

~~~text النسخة المكسورة
heap before {"heapMB":2.24,"nodes":97,"listeners":19}
after 30 opens {"heapMB":22.96,"nodes":727,"listeners":49}
~~~

- **الـ heap ١٠ أضعاف**: حوالي ٠٫٧ ميجا لكل فتحة (الـ [[history]] و الـ panel).
- **الـ nodes زادوا ٦٣٠ = ٣٠ × ٢١**: الـ [[div]] و ٢٠ [[img]] في كل فتحة، ولا واحد اتمسح.
- **الـ listeners زادوا ٣٠**: واحد لكل فتحة.

وفي Console:

~~~text getEventListeners(window).resize.length
30
~~~

---

## ٢. الـ snapshot: Detached

في الـ snapshot التاني، Class filter: [[Detached]]. ونفس الحساب من ملف الـ snapshot (كل node عليه [[detachedness]]):

~~~text العناصر الـ detached في الـ snapshot
[["<div class=\"gallery\">", 31]]
~~~

٣١ مش ٣٠: الـ ٣٠ في اللوب + مرة فتحتها قبله وأنا بجرّب الـ z-index. دوس على أي واحد في القايمة، وتحت في **Retainers** هتلاقي السلسلة: الـ [[div]] ← [[panel]] في [[Context]] (الـ closure) ← الدالة ← listener على [[Window]]. أول حاجة في السلسلة **انت** اللي كاتبها هي مكان الباج.

| العمود | معناه |
|---|---|
| Constructor | نوع الـ object ([[Detached <div>]]، [[Array]]، [[Object]]، [[(closure)]]) |
| # New و # Deleted و # Delta | اتعمل كام واتمسح كام بين الـ snapshot ده واللي قبله (في Comparison) |
| Shallow Size | حجم الـ object نفسه |
| Retained Size | اللي هيتحرر لو الـ object ده اتمسح (هو وكل اللي محدش ماسكه غيره) |

---

## ٣. التصليح

~~~javascript app.js (بعد التصليح)
let ctrl;
// ... جوه الـ click بتاع «التفاصيل»:
ctrl = new AbortController();
window.addEventListener("resize", () => { panel.style.width = innerWidth + "px"; history.length; }, { signal: ctrl.signal });

// ... جوه الـ click بتاع «اقفل»:
ctrl.abort();
modal.querySelector(".gallery").remove();
~~~

~~~text بعد التصليح
heap before {"heapMB":1.49,"nodes":82,"listeners":18}
after 30 opens {"heapMB":1.6,"nodes":82,"listeners":18}
detached in snapshot: []
getEventListeners(window).resize.length → 0
~~~

الـ nodes والـ listeners **نفس الرقم بالظبط**، والـ heap زاد ٠٫١ ميجا بس (كاش وحاجات داخلية طبيعية). (الأرقام «قبل» أقل من النسخة المكسورة لأن الصفحة دي فيها عناصر أقل.)

بدايل للتصليح:

- [[removeEventListener("resize", onResize)]] بنفس الدالة (لازم تحفظها في متغير، مش arrow جديدة).
- تسجّل الـ listener **مرة واحدة** بره الـ click، وجواه تشوف الـ panel الحالي.
- في React: [[useEffect]] بيرجّع دالة بتشيل الـ listener (ونفس الباج لو نسيتها).

---

## ٤. أنواع الـ profiles في Memory

| النوع | بيجاوب على |
|---|---|
| Heap snapshot | إيه اللي في الذاكرة دلوقتي ومين ماسكه |
| Allocations on timeline | إيه اللي اتعمل (allocated) إمتى وانت بتسجّل، والأزرق اللي فضل = ممكن leak |
| Allocation sampling | أنهي دالة بتعمل allocation أكتر (أخف من اللي فوق، للتسجيلات الطويلة) |
| Detached elements | لستة العناصر الـ detached على طول من غير snapshot كامل (في النسخ الجديدة) |

(الأسامي من Chrome DevTools docs، والأرقام من المعمل.)

## الخلاصة

- Performance monitor الأول: رقم بيطلع بس = leak.
- snapshot، وكرر ٣٠ مرة، و Collect garbage، و snapshot، و Comparison، وفلتر [[Detached]]، و Retainers.
- أشهر سبب: listener على [[window]] أو [[document]] أو timer ([[setInterval]]) بيتسجّل مع كل فتحة ومحدش بيشيله.
- [[AbortController]] و [[{ signal }]]: [[abort()]] واحدة بتشيل كل listeners الـ component.`,
          sol: R`في Performance monitor مع كل فتحة وقفلة DOM Nodes بيزيد حوالي ٢١ والـ listeners بيزيد ١، ومبيرجعوش حتى لو استنيت أو دوست Collect garbage. وفي المعمل: [[97]] ← [[727]] nodes و [[19]] ← [[49]] listeners و [[2.24]] ← [[22.96]] ميجا.

الـ Comparison بعد ٣٠ فتحة فيه [[Detached <div>]] بـ [[# Delta]] حوالي ٣٠ (والـ [[img]] جواهم)، و Retainers بتاع أي واحد بيوصل لـ closure الـ resize على [[Window]]. و [[getEventListeners(window).resize.length]] = [[30]].

بعد [[AbortController]]: الأرقام بترجع لنفسها بعد كل قفلة، والـ Detached فاضي، و [[getEventListeners(window).resize]] مش موجود ([[0]]).`,
          flag: "keys",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** رتّب خطوات اكتشاف leak (snapshot، و Collect garbage، و كرر ٣٠ مرة، و Comparison، و Detached، و Retainers) واكتب كل خطوة بتجاوب على أنهي سؤال.`, done: R`الترتيب: Collect garbage، و snapshot، و كرر، و Collect garbage، و snapshot، و Comparison، و Detached، و Retainers، وكل خطوة جنبها سؤالها.` },
            { lvl: 'تطبيق', t: R`**ابني المعمل وقيس:** صفحة الـ modal المكسورة، وافتح Performance monitor، واعمل ٣٠ فتحة وقفلة، واكتب DOM Nodes و listeners و JS heap قبل وبعد.`, done: R`الـ ٣ أرقام زادوا بشكل متناسب مع عدد المرات (nodes حوالي ٢١ لكل فتحة، و listeners ١)، وبعد Collect garbage مانزلوش.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** في الـ snapshot التاني لاقي [[Detached <div>]]، وامشي في Retainers لحد أول سطر في كودك انت. اكتب السلسلة.`, done: R`السلسلة مكتوبة من الـ div لحد [[Window]] (أو [[document]])، ومعلّم على اسم الدالة أو المتغير اللي في كودك.` },
            { lvl: 'تطبيق', t: R`**صلّح:** نفس الباج بس بـ [[setInterval]] بيحدّث ساعة جوه الـ modal كل ثانية ومحدش بيعمله [[clearInterval]]. لاقيه بـ Performance monitor و snapshot وصلّحه.`, done: R`قبل: الـ nodes بتزيد مع كل فتحة والـ CPU شغال حتى والـ modal مقفول، وبعد [[clearInterval]] في القفلة: الأرقام بترجع لنفسها.` },
            { lvl: 'تحدي', t: R`**قارن:** ٣ تصليحات لنفس الـ leak: [[removeEventListener]] بالدالة المحفوظة، و [[AbortController]]، وlistener واحد مسجّل مرة واحدة بره. قيس الـ ٣ بـ ٣٠ فتحة واكتب أنهي أبسط في component فيه ٥ listeners.`, done: R`الـ ٣ رجّعوا nodes و listeners لنفس الرقم (أرقامك مكتوبة)، وكاتب إن [[AbortController]] بيشيل الـ ٥ بـ [[abort()]] واحدة، و [[removeEventListener]] بالدالة الغلط (arrow جديدة) مبيشيلش حاجة (جرّبتها).` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** سكربت Playwright بيفتح ويقفل الـ modal ٣٠ مرة، ويقرا [[Nodes]] و [[JSEventListeners]] من [[Performance.getMetrics]] (بعد [[HeapProfiler.collectGarbage]])، ويفشل لو زادوا. شغّله على النسختين.`, done: R`على المكسورة بيفشل ويطبع الفرق (عندنا ٦٣٠ node و ٣٠ listener)، وعلى المتصلّحة بيعدّي بفرق [[0]].` },
          ],
        },
        {
          cmd: "Overrides",
          title: "جرّب تصليح على الموقع الحقيقي من غير deploy",
          desc: "كليك يمين على أي طلب في Network ثم Override content، وعدّل الملف أو الرد. المتصفح هيستخدم نسختك حتى بعد الريفريش. تقدر كمان تعدّل الـ headers، مثلًا تجرب هل إضافة header هتحل مشكلة CORS قبل ما تلمس السيرفر. وأول مرة هيطلب منك تختار فولدر يحفظ فيه.",
          example: R`Network > right-click request > Override content
Network > right-click request > Override headers
Sources > Overrides > Enable Local Overrides`,
          try: "غيّر رد API في موقعك من Override content، واعرف الواجهة بتتعامل إزاي مع array فاضي.",
          flag: "keys",
          deep: {
            why: "عايز تجرّب تصليح على الموقع الحقيقي من غير ما تعدّل الكود وترفعه.",
            how: R`كليك يمين على ملف في Network ثم Override content. بيفتح Sources وبيخليك تعدّل. التعديل بيتطبق على الريفريش الجاي تلقائيًا.

Override headers بيخليك تعدّل response headers، مفيد تجرّب إضافة CORS header.

متنساش توقّف الـ Overrides من Sources ثم Overrides لما تخلص.`,
            when: "تجرّب bug fix على الموقع قبل PR. تتحقق من إن تصليح معين بيحل المشكلة.",
            mistakes: "تنسى Overrides شغال وتتساءل ليه التعديلات اللي بترفعها مش بتظهر."
          },
          teach: R`## الأول: المتصفح يستخدم نسختك بدل نسخة السيرفر

Local Overrides بيخلي Chrome يحفظ نسخة من ملف أو رد في فولدر على جهازك، وكل ما الصفحة تطلبه يرجّع نسختك. التعديل بيفضل بعد الريفريش، وده الفرق عن Elements. الدرس ده من Chrome DevTools docs (صفحة Local overrides)، لأنه أداة واجهة.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Network > right-click request > Override content]] | يفتح الرد في Sources تعدّله، و Ctrl+S يحفظه |
| [[Network > right-click request > Override headers]] | تضيف أو تغيّر headers الرد (زي [[Access-Control-Allow-Origin]]) |
| [[Sources > Overrides > Enable Local Overrides]] | الزرار اللي يشغّل أو يوقف الخاصية كلها |

أول مرة هيطلب فولدر: اعمل فولدر فاضي **بره المشروع** (مثلًا [[C:\Users\ali\devtools-overrides]])، ودوس Allow عشان Chrome يكتب فيه.

## ٢. الخطوات على رد API

1. في Network كليك يمين على [[GET /api/products]] ثم Override content.
2. في Sources هيفتح الرد زي ما جه، مثلًا [[{"id":1,"name":"Pen"}]] وعنصر تاني جوه array.
3. امسح كل اللي فيه واكتب قوسين مربعين فاضيين (array فاضي) و Ctrl+S.
4. ريفريش: الطلب في Network عليه علامة بنفسجية (overridden)، والواجهة شايفة قايمة فاضية.

وده بيكشف: هل فيه empty state؟ ولا spinner بيلف على طول؟ ولا error زي [[Cannot read properties of undefined (reading '0')]] لأن الكود فاكر إن فيه عنصر أول دايمًا؟

## ٣. Override headers

بدل ما تعدّل السيرفر وترفع عشان تجرّب CORS، تضيف [[Access-Control-Allow-Origin: http://localhost:5173]] على الرد من هنا. لو المشكلة اتحلت، تعرف بالظبط تحط إيه في السيرفر.

## الخلاصة

- Overrides = نسخة محلية بتكسب على السيرفر لحد ما تقفلها.
- جرّب بيها الردود الوحشة: فاضي، [[{}]]، status غلط.
- اقفل Enable Local Overrides لما تخلص، وإلا هتفضل شايف نسختك.`,
          sol: R`كليك يمين على طلب الـ API في Network ثم Override content. أول مرة هيطلب منك تختار فولدر وتدوس Allow. هيفتحلك الرد في Sources، امسح اللي فيه واكتب [[[]]] واحفظ Ctrl+S، وبعدين ريفريش. هتلاقي جنب الطلب في Network علامة بنفسجية (overridden)، والواجهة بقت شايفة array فاضي.

اللي المفروض تشوفه: رسالة زي «مفيش طلبات لسه» (empty state). اللي بيطلع كتير: صفحة فاضية خالص، أو spinner بيلف للأبد، أو error في Console زي [[Cannot read properties of undefined (reading '0')]] لأن الكود فاكر إن فيه عنصر أول دايمًا.

جرّب كمان تحط [[{}]] أو تغيّر الـ status من Override headers. ولما تخلص اقفل Enable Local Overrides في Sources ثم Overrides عشان متنساش إن الرد متزوّر.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اعمل Override content لملف CSS في أي موقع، وغيّر لون، واعمل ريفريش، وبعدين اقفل Enable Local Overrides.`, done: R`اللون فضل بعد الريفريش، ورجع لما قفلت الـ overrides، وفي Network جنب الملف علامة إنه overridden.` },
            { lvl: 'تطبيق', t: R`**جرّب تصليح API:** Override content لرد [[/api/products]] بقيمة [[[]]] (لستة فاضية)، وبعدين رد فيه منتج اسمه ٢٠٠ حرف.`, done: R`الصفحة مع اللستة الفاضية بتقول «مفيش منتجات» (ولو وقعت كتبت الباج)، والاسم الطويل اتقص صح أو كسّر الـ layout (وكتبت التصليح بـ [[text-overflow]] أو [[line-clamp]]).` },
            { lvl: 'تحدي', t: R`**Override headers:** صفحة فيها CSP مانع سكربت inline. اعمل Override headers وغيّر الـ CSP لـ Report-Only، وشوف الرسايل اتغيّرت إزاي (درس «Content Security Policy»).`, done: R`الرسايل اتحوّلت من [[The action has been blocked.]] لـ [[The policy is report-only, so the violation has been logged but no further action has been taken.]] والسكربت اشتغل، وعرفت إنك اختبرت السياسة من غير ما تلمس السيرفر.` },
          ],
        },
        {
          cmd: "صيغ الصور WebP و AVIF",
          title: "صورة الـ hero ١٫٨ ميجا PNG: نفس الجودة ١٩ كيلو WebP و ١١ كيلو AVIF، و <picture> بيختار، و Network بيقولك اختار إيه",
          desc: R`أكبر حاجة في أغلب الصفحات الصور، وصورة الـ hero غالبًا هي الـ LCP. **WebP** و **AVIF** صيغ أحدث من JPEG و PNG بيدّوا نفس الجودة بحجم أصغر بكتير، وكل المتصفحات الحديثة بتدعمهم. في المعمل: صورة hero مقاس 1600×900 كانت **١٧٩٥ كيلو** PNG، وبجودة قريبة (PSNR حوالي ٤٤–٤٥ dB) بقت **٣٦ كيلو** JPEG و **١٩ كيلو** WebP و **١١ كيلو** AVIF. وأرقام الجودة ([[quality: 80]]) **مش زي بعض** بين الصيغ: AVIF بـ 40 كانت أحسن من JPEG بـ 70.

بتقدّم الصيغ بـ [[<picture>]]: [[<source type="image/avif">]] ثم [[webp]] ثم [[<img>]] JPEG للباقي، والمتصفح بياخد أول واحد يدعمه. وفي DevTools: عمود **Type** في Network بيقول [[avif]] أو [[webp]]، و [[currentSrc]] في Console بيقولك الملف اللي اتحمّل فعلًا، و Chrome بيبعت header [[Accept: image/jxl,image/avif,image/webp,...]] مع كل طلب صورة (Chrome 156)، وده اللي الـ CDN بيستخدمه لو بيختار الصيغة لوحده. وبتحوّل بـ [[sharp]] في Node أو Squoosh أو [[cwebp]] و [[avifenc]].`,
          example: R`npm i sharp
node -e "require('sharp')('hero.png').webp({ quality: 80 }).toFile('hero.webp')"
node -e "require('sharp')('hero.png').avif({ quality: 40 }).toFile('hero.avif')"
<picture><source srcset="hero.avif" type="image/avif"><source srcset="hero.webp" type="image/webp"><img src="hero.jpg" width="1600" height="900" alt="عيش طازة"></picture>
document.querySelector("picture img").currentSrc
xxd -l 12 hero.webp && xxd -l 12 hero.avif`,
          lines: [
            R`[[sharp]] مكتبة Node لتحويل الصور (مبنية على libvips، سريعة). بتنزل binary جاهز لنظامك، فمش محتاج تسطّب حاجة تانية. في المعمل نزلت sharp 0.35 (libwebp 1.6 و libaom 3.15 للـ AVIF).`,
            R`حوّل [[hero.png]] لـ WebP بجودة 80. [[toFile]] بيرجّع Promise، و Node بيستنى لحد ما يخلص قبل ما يقفل. في المعمل: ١٧٩٥٣٠٠ بايت ← ١٩٢٦٢ (حوالي ٩٣ مرة أصغر).`,
            R`نفس الصورة AVIF بجودة 40 (مش 80: سكيل AVIF مختلف، و 40 هنا جودتها أعلى من WebP 80 بالقياس). الناتج ١١٤٤٢ بايت. الـ encoding أبطأ (٢٦٣ms مقابل ٩٩ms لـ WebP في المعمل)، فاعمله وقت الـ build مش مع كل طلب.`,
            R`[[<picture>]] فيه [[<source>]] لكل صيغة بالترتيب اللي تفضّله، و [[type]] بيخلّي المتصفح يعرف يدعمها ولا لأ **من غير ما يحمّلها**. [[<img>]] في الآخر إجباري: هو اللي بيترسم، وعليه [[width]] و [[height]] و [[alt]] و [[loading]]، والـ [[src]] بتاعه للمتصفحات القديمة.`,
            R`[[currentSrc]] الرابط اللي اتحمّل فعلًا، مش اللي في [[src]]. في المعمل طلع [[.../hero.avif]] رغم إن [[src]] = [[hero.jpg]]. أسرع طريقة تتأكد إن [[<picture>]] شغّال.`,
            R`أول ١٢ بايت في الملف بيقولوا الصيغة الحقيقية (مش الامتداد): WebP بيبدأ بـ [[RIFF]] وبعدين [[WEBP]]، و AVIF فيه [[ftypavif]]. مفيد لو سيرفر بيرجّع صفحة خطأ بامتداد [[.webp]]، أو [[file hero.webp]] لو عندك.`,
          ],
          try: R`خد أي صورة كبيرة (screenshot من موقعك PNG مثلًا)، وحوّلها بـ sharp لـ JPEG و WebP و AVIF بجودات مختلفة، واطبع الأحجام. حط [[<picture>]] في صفحة على سيرفر محلي، وافتحها و Network مفتوح بفلتر Img: عمود Type و Size بيقولوا إيه؟ وفي Console [[currentSrc]]. وبعدين امسح سطر الـ avif وشوف المتصفح اختار إيه.`,
          deep: {
            why: R`الصور غالبًا أكتر من نص حجم الصفحة، وصورة الـ hero بتحدد الـ LCP. في المعمل نفس الصفحة كانت LCP ٢٤٠٠ms بـ PNG ١٫٨ ميجا، وبعد AVIF ١١ كيلو ومعاه width و height و من غير lazy بقت ٨٩٦ms. والموبايل على باقة نت بيدفع تمن كل كيلو.`,
            how: R`JPEG (١٩٩٢) بيقسم الصورة مربعات ٨×٨ ويرمي التفاصيل اللي العين مبتلاحظهاش. WebP (من جوجل، مبني على VP8) بيتوقع كل بلوك من اللي جنبه وبيبعت الفرق بس، وبيدعم شفافية (بدل PNG) و animation (بدل GIF). AVIF مبني على AV1 (الفيديو)، بلوكات بأحجام مختلفة وتوقع أذكى، فبيكسب أكتر في الصور الناعمة والتدرّجات، بس الـ encoding أبطأ. والجودة: كل encoder ليه سكيل [[quality]] بتاعه، فالمقارنة الصح بمقياس زي PSNR أو SSIM: عندي PSNR حوالي ٤٣٫٨ dB طلع JPEG بـ 70 = ٢٢٫٥ كيلو، و WebP بـ 70 = ١٤٫٧ كيلو، و AVIF بـ 30 (٤٣٫١ dB) = ٧ كيلو. والمتصفح مع [[<picture>]] بيقرا الـ [[source]] بالترتيب ويختار أول [[type]] بيدعمه قبل ما يطلب أي حاجة، فبيتطلب ملف واحد بس. والـ CDN اللي بيختار لوحده بيقرا [[Accept]]، ولازم يرد بـ [[Vary: Accept]] عشان الكاش ميدّيش AVIF لمتصفح مبيدعموش.`,
            when: R`أي صورة فوتوغرافية أو hero أو منتج: AVIF أو WebP مع JPEG احتياطي. لوجو وأيقونات: SVG. screenshot فيه نص حاد: WebP lossless أو PNG متضغط. ولو الموقع على Next.js أو Vercel أو Cloudflare Images، الـ image component أو الـ CDN بيعمل التحويل لوحده (بص في Network على Type). ودرس «.webp و .avif و .gif و .ico» في تاب الملفات بيشرح الصيغ نفسها، والدرس ده بيقيس أثرها.`,
            mistakes: R`تقارن [[quality: 80]] في AVIF بـ 80 في JPEG وتقول «AVIF أكبر» (في المعمل AVIF بـ 80 كان ٣٧٫٨ كيلو، أكبر من JPEG بـ 80، بس جودته أعلى بكتير: ٤٨٫٤ مقابل ٤٥٫٥ dB). تحوّل الصيغة وتسيب المقاس 4000px لصورة بتتعرض 400px (المقاس أهم من الصيغة: [[srcset]] و [[sizes]]). تنسى [[type]] في [[<source>]]. تحط [[width]] و [[height]] على [[<source>]] بس مش على [[<img>]]. تعمل AVIF مع كل طلب على السيرفر (بطيء). أو تغيّر الامتداد بس ([[mv a.jpg a.webp]]) والملف لسه JPEG.`
          },
          teach: R`## الأول: نفس الصورة بـ ٤ صيغ

اتجرّب على ويندوز 11 بـ Node 24 و sharp 0.35.5 (libvips 8.18، و libwebp 1.6، و libaom 3.15)، والعرض في Chrome 156.

صورة hero مقاس 1600×900 (تدرّج ألوان وشوية «حبيبات» زي صورة حقيقية)، اتحفظت PNG الأول، وبعدين:

~~~javascript gen.mjs
import sharp from "sharp";
await sharp("hero.png").jpeg({ quality: 80, mozjpeg: true }).toFile("hero.jpg");
await sharp("hero.png").webp({ quality: 80 }).toFile("hero.webp");
await sharp("hero.png").avif({ quality: 40 }).toFile("hero.avif");
~~~

~~~text ls -l
1795300 hero.png
  35785 hero.jpg
  19262 hero.webp
  11442 hero.avif
~~~

من ١٫٨ ميجا لـ ١١ كيلو. بس ده مش كل الحكاية: هل الجودة واحدة؟

---

## ١. الجودة: الأرقام مش زي بعض

قيست كل صيغة بجودات مختلفة، وحسبت **PSNR** (قد إيه الصورة بعد الضغط قريبة من الأصلية بالـ dB، الأعلى أحسن) بسكربت صغير بيفك الصورة لبكسلات ويقارنها:

~~~text الحجم بالبايت / PSNR
jpeg 30:8789B/40.3dB  50:12869B/42.4dB  70:22494B/43.8dB  80:35785B/45.5dB  90:66807B/47.7dB
webp 30:8434B/41.5dB  50:10982B/42.8dB  70:14702B/43.8dB  80:19262B/44.5dB  90:41494B/46.4dB
avif 30:6995B/43.1dB  40:11442B/44.4dB  50:18541B/46.1dB  60:23991B/46.9dB  80:37868B/48.4dB
~~~

اقراها كده: دوّر على **نفس الجودة** مش نفس الرقم.

| جودة حوالي ٤٣٫٨ dB | الحجم |
|---|---|
| JPEG بـ [[quality: 70]] | ٢٢٫٥ كيلو، الأكبر |
| WebP بـ [[quality: 70]] | ١٤٫٧ كيلو، تلت أصغر من JPEG |
| AVIF بـ [[quality: 30]] (٤٣٫١ dB) | ٧ كيلو، نص WebP تقريبًا |

يعني AVIF بنص حجم WebP وتلت JPEG بنفس الجودة تقريبًا. ولو قارنت بالرقم بس (الكل على 80) هتلاقي AVIF **أكبر** من JPEG (٣٧٫٨ مقابل ٣٥٫٨ كيلو)، وده غلط في المقارنة مش في AVIF: AVIF بـ 80 جودته ٤٨٫٤ dB.

> PSNR مقياس رياضي بسيط، مش العين. للحكم النهائي بص على الصورتين جنب بعض (Squoosh بيعمل ده في المتصفح). الفكرة: متصدّقش رقم [[quality]] بين الصيغ.

والسرعة:

~~~text وقت الـ encoding لنفس الصورة
webp 99ms   avif 263ms
~~~

AVIF أبطأ ٢٫٥ مرة، فبتعمله وقت الـ build أو مرة واحدة وتخزّنه، مش مع كل طلب.

---

## ٢. [[<picture>]]: المتصفح بيختار

~~~html
<picture>
  <source srcset="/img/hero.avif" type="image/avif">
  <source srcset="/img/hero.webp" type="image/webp">
  <img class="hero" src="/img/hero.jpg" width="1600" height="900" fetchpriority="high" alt="عيش طازة">
</picture>
~~~

المتصفح بيقرا الـ [[source]] من فوق لتحت، وأول [[type]] بيدعمه بياخده ويطلبه **هو بس**. لو مفيش، بياخد [[img src]]. والـ [[<img>]] هو العنصر اللي بيترسم في كل الحالات، فالـ CSS والـ [[alt]] والمقاس عليه.

في المعمل:

~~~text Console
document.querySelector(".hero").currentSrc
"https://shop.test:8443/slow/img/hero.avif"
~~~

ولوج السيرفر فيه طلب واحد للـ hero: [[/slow/img/hero.avif]]. مفيش webp ولا jpg اتطلبوا.

### اللي Chrome بيبعته

~~~text لوج السيرفر: header Accept مع طلب الصورة (Chrome 156)
accept=image/jxl,image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
~~~

Chrome 156 بيقول إنه بيدعم JPEG XL ([[image/jxl]]) و AVIF و WebP. CDN زي Cloudflare أو Vercel بيقرا ده ويرجّع أحسن صيغة لنفس الرابط، ولازم يحط [[Vary: Accept]] عشان الكاش ميخلطش.

---

## ٣. في DevTools

- **Network، فلتر Img:** عمود **Type** بيقول [[avif]] أو [[webp]] أو [[jpeg]] أو [[png]]، و **Size** الحجم اللي نزل. علّم عمود **Content-Type** لو عايز الـ header نفسه.
- **دوس على الصورة ثم Preview:** الصورة ومقاسها الحقيقي (1600 × 900) وحجمها.
- **Elements، hover على [[src]] بتاع [[<img>]]:** بيقولك المقاس المعروض والمقاس الحقيقي (intrinsic). لو الحقيقي أكبر من المعروض ٤ مرات، المقاس هو المشكلة مش الصيغة: [[srcset]] و [[sizes]].
- **Lighthouse:** بيقول لو فيه صور ممكن تتحوّل لصيغة أحدث أو مقاسها أكبر من اللازم (الاسم في النسخ الجديدة insight «Improve image delivery»، من Lighthouse docs).

---

## ٤. الملف فعلًا بالصيغة دي؟

~~~text xxd -l 12
00000000: 5249 4646 364b 0000 5745 4250            RIFF6K..WEBP
00000000: 0000 001c 6674 7970 6176 6966            ....ftypavif
~~~

~~~text file hero.webp hero.avif
hero.webp: RIFF (little-endian) data, WebP image, VP8 encoding, 1600x900, Scaling: [none]x[none], YUV color, decoders should clamp
hero.avif: ISO Media, AVIF Image
~~~

الامتداد مالوش دعوة. لو [[file]] قال [[HTML document]]، السيرفر رجّع صفحة خطأ اتحفظت بامتداد صورة.

---

## ٥. أثرها على LCP

في معمل درس «مشروع تشخيص موقع بطيء ومكسور»: نفس الصفحة ونفس تأخير السيرفر (٨٠٠ms) للصورة:

~~~text
PNG ١٫٨ ميجا، lazy، من غير مقاس:  LCP 2400 hero hero.png
<picture> AVIF ١١ كيلو، بمقاس:     LCP  896 hero hero.avif
~~~

## الخلاصة

- AVIF ثم WebP ثم JPEG، بـ [[<picture>]] و [[type]]، و [[<img>]] في الآخر بمقاسه.
- قارن الصيغ بنفس الجودة، مش بنفس رقم [[quality]].
- [[currentSrc]] و عمود Type في Network بيقولوا اتحمّل إيه فعلًا.
- المقاس قبل الصيغة: صورة 4000px لمكان 400px غلط بأي صيغة.
- اعمل AVIF وقت الـ build (أبطأ)، أو سيب الـ CDN يعمله بـ [[Accept]] و [[Vary: Accept]].`,
          sol: R`الأحجام بتختلف حسب الصورة، بس الترتيب غالبًا: PNG أكبر حاجة بكتير (صورة فوتوغرافية)، وبعدين JPEG، وبعدين WebP، وبعدين AVIF (لما تقارن بنفس الجودة). في المعمل: [[1795300]] و [[35785]] و [[19262]] و [[11442]] بايت.

في Network بفلتر Img: صف واحد للـ hero، Type [[avif]] و Size حوالي ١١ كيلو، و [[currentSrc]] بينتهي بـ [[hero.avif]]. ولما شيلت سطر الـ avif: Type [[webp]] و [[currentSrc]] بينتهي بـ [[hero.webp]]. ولو شيلت الاتنين: [[jpeg]].

لو لقيت Type [[png]] أو [[jpeg]] رغم إن فيه [[<source>]]: غالبًا [[type]] مكتوب غلط ([[image/avif]] بالظبط)، أو الملف نفسه مش موجود (Network هيقول [[404]] ومش هيرجع للي بعده: المتصفح بيختار قبل ما يحمّل، فلو اختار AVIF ووقع، الصورة مكسورة).`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** رتّب JPEG و PNG و WebP و AVIF و SVG: أنهي لصورة فوتوغرافية، وأنهي للوجو، وأنهي محتاج شفافية، وأنهي أبطأ في الـ encoding.`, done: R`فوتوغرافية: AVIF/WebP مع JPEG احتياطي، ولوجو: SVG، وشفافية: WebP أو AVIF أو PNG، والأبطأ AVIF (٢٦٣ms مقابل ٩٩ لـ WebP في المعمل).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** صورة من عندك، حوّلها JPEG و WebP و AVIF بجودات 30 و 50 و 70 و 90، واطبع جدول الأحجام. وبعدين بص على الصور جنب بعض واختار لكل صيغة أقل جودة شكلها لسه كويس.`, done: R`جدول ١٢ رقم، و ٣ اختيارات (صيغة وجودة وحجم)، و AVIF اللي اخترته أصغر من WebP و JPEG اللي اخترتهم.` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت [[optimize.mjs]] بيلف على فولدر [[images/]]، ويعمل لكل صورة نسختين AVIF و WebP بعرض 800 و 1600 ([[resize]])، ويطبع الحجم قبل وبعد والمجموع، ومبيعيدش صورة اتعملت قبل كده لو مااتغيّرتش.`, done: R`أول تشغيل بيعمل الملفات ويطبع المجموع (مثلًا «٤٫٢ ميجا ← ٣١٠ كيلو»)، وتاني تشغيل بيقول «0 converted»، ولو غيّرت صورة واحدة بيعمل هي بس.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** على ٣ مواقع كبيرة، افتح Network بفلتر Img، وعلّم عمود Type. أنهي صيغة بيستخدموا؟ ولو الرابط نفسه مكتوب [[.jpg]] والـ Type [[avif]]؟`, done: R`جدول ٣ مواقع وصيغهم، وكاتب إن الرابط [[.jpg]] بـ Type [[avif]] = CDN بيختار بالـ [[Accept]]، ولقيت [[Vary]] في Response Headers بتاعة صورة.` },
            { lvl: 'تحدي', t: R`**صلّح:** صفحة فيها [[<picture>]] والصورة بتظهر JPEG دايمًا. فيه ٣ باجات: [[type="image/avf"]] (غلطة إملائية)، و [[srcset]] في [[<source>]] بيشاور على ملف [[404]]، و [[width]] على [[<source>]] بدل [[<img>]]. لاقيهم من Network و Elements و Console.`, done: R`بعد التصليح: Type [[avif]] في Network، و [[currentSrc]] بينتهي بـ [[.avif]]، و CLS صفر (المقاس على [[<img>]])، وكاتب أنهي أداة كشفت أنهي باج.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`// the first bytes of the lesson's files (xxd -l 12) and what the extension claims
const files = {
  "hero.webp": [0x52, 0x49, 0x46, 0x46, 0x36, 0x4b, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50],
  "hero.avif": [0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66],
  "hero.jpg": [0xff, 0xd8, 0xff, 0xdb, 0, 0, 0, 0, 0, 0, 0, 0],
  "fake.webp": [...Buffer.from("<!DOCTYPE h")],
};
function sniff(b) {
  const s = Buffer.from(b).toString("latin1");
  if (s.startsWith("RIFF") && s.slice(8, 12) === "WEBP") return "webp";
  if (s.slice(4, 8) === "ftyp" && /avi[fs]/.test(s.slice(8, 12))) return "avif";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpeg";
  if (s.startsWith("\x89PNG")) return "png";
  if (/^\s*</.test(s)) return "html";
  return "unknown";
}
for (const [name, bytes] of Object.entries(files)) {
  const real = sniff(bytes), ext = name.split(".").pop().replace("jpg", "jpeg");
  console.log(name + ": " + real + (real === ext ? " ok" : " MISMATCH"));
}
const sizes = { png: 1795300, jpeg: 35785, webp: 19262, avif: 11442 };
for (const [f, n] of Object.entries(sizes)) console.log(f + " " + (n / 1024).toFixed(1) + " KiB, " + (sizes.png / n).toFixed(0) + "x smaller than png");`, expect: [R`hero.webp: webp ok`, R`hero.avif: avif ok`, R`hero.jpg: jpeg ok`, R`fake.webp: html MISMATCH`, R`avif 11.2 KiB, 157x smaller than png`] },
          ],
        },
        {
          cmd: "playwright screenshot",
          title: "صور الصفحة بكل المقاسات من الترمنال",
          desc: "بدل ما تغيّر حجم المتصفح بإيدك بعد كل تعديل، أمر واحد بياخد screenshot للصفحة بمقاس ديسكتوب وموبايل، وبالوضع الداكن، والصفحة كاملة لآخرها. تحطهم جنب بعض وتقارن قبل وبعد.",
          example: R`npx playwright install chromium
npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 desktop.png
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8791 mobile.png
npx playwright screenshot --device "Pixel 7" --color-scheme dark --wait-for-timeout 1000 http://localhost:8791 pixel-dark.png`,
          try: "صوّر صفحتك بأوامر الـ screenshot التلاتة قبل تعديل CSS وبعده، وافتح الصور جنب بعض.",
          flag: "term",
          deep: {
            why: "تعديل صغير في CSS ممكن يكسر الموبايل وانت شغال على الديسكتوب. الصور بتخليك تشوف كل المقاسات في نظرة، وتقدر تحطها في PR أو تبعتها للعميل.",
            how: R`[[playwright install chromium]]: ينزّل المتصفح اللي Playwright بيستخدمه (مرة واحدة).

[[screenshot URL file.png]]: يفتح الصفحة ويصوّرها. [[--viewport-size "390,844"]]: عرض وطول الشاشة (390 عرض موبايل شائع). [[--full-page]]: الصفحة كلها لآخرها مش الجزء الظاهر بس.

[[--device "Pixel 7"]]: مقاس الجهاز وكثافة البكسل والـ user agent واللمس، زي Device Toolbar في DevTools. أجهزة آيفون (زي [[--device "iPhone 13"]]) بتشتغل على WebKit مش Chromium، فمحتاجة [[npx playwright install webkit]] الأول. [[--color-scheme dark]]: يختبر [[prefers-color-scheme: dark]]. [[--wait-for-timeout 1000]]: استنى ثانية بعد التحميل عشان الخطوط والأنيميشن يخلصوا.

من غير Playwright، Chrome نفسه بيعمل ده: [[chrome --headless --screenshot=out.png --window-size=390,844 URL]] (على ويندوز المسار الكامل لـ chrome.exe).

والخطوة الجاية: اختبار visual regression في Playwright Test ([[toHaveScreenshot]]) بيقارن الصور لوحده ويفشل لو حاجة اتغيرت.`,
            when: "بعد أي تعديل في التصميم، وقبل ما تبعت PR فيه CSS.",
            mistakes: "تصوّر قبل ما الخطوط تحمّل فالصورة بخط مختلف. وتسيب عشرات الصور في فولدر المشروع وتترفع على Git، حطهم في فولدر لوحده في [[.gitignore]]."
          },
          teach: R`## الأول: متصفح من غير شاشة بيصوّر

Playwright مكتبة بتتحكم في متصفح، وفيها أمر [[screenshot]] جاهز من الترمنال. كله اتشغّل على ويندوز (Playwright 1.63) على سيرفر محلي.

---

## ١. [[npx playwright install chromium]]

بينزّل المتصفح اللي Playwright بيستخدمه (مش Chrome بتاعك)، مرة واحدة. في النسخة دي نزّل Chromium و Chrome Headless Shell (نسخة خفيفة من غير واجهة بيستخدمها للـ headless) وأدوات صغيرة معاهم.

## ٢. [[npx playwright screenshot --viewport-size "1440,900" URL desktop.png]]

| الحتة | معناها |
|---|---|
| [[--viewport-size "1440,900"]] | الشاشة ١٤٤٠ عرض × ٩٠٠ طول، بفاصلة ومن غير مسافات |
| URL | الصفحة |
| [[desktop.png]] | اسم الصورة |

~~~text الناتج
Navigating to http://127.0.0.1:8791/ssr
Capturing screenshot into desktop.png
~~~

وقريت مقاس الصورة من ملف الـ PNG: [[1440x900]] بالظبط.

## ٣. [[--viewport-size "390,844" --full-page]]

[[--full-page]] بيصوّر الصفحة كلها لآخرها مش الجزء الظاهر بس. على صفحة قصيرة طلعت [[390x844]]. وعلى صفحة فيها جدول عرضه ٦٠٠px طلعت [[608x844]]: الصورة اتوسّعت للعرض الحقيقي للصفحة، وده نفسه دليل إن فيه حاجة طالعة بره الموبايل.

## ٤. [[--device "Pixel 7" --color-scheme dark --wait-for-timeout 1000]]

| الحتة | معناها |
|---|---|
| [[--device "Pixel 7"]] | مقاس الجهاز وكثافة البكسل والـ user agent واللمس |
| [[--color-scheme dark]] | الصفحة تشوف [[prefers-color-scheme: dark]] |
| [[--wait-for-timeout 1000]] | استنى ١٠٠٠ms بعد التحميل قبل الصورة |

~~~text الناتج
Navigating to http://127.0.0.1:8791/ssr
Waiting for timeout 1000...
Capturing screenshot into pixel-dark.png
~~~

الصورة طلعت [[1082x2202]]. ليه مش ٤١٢ عرض؟ الـ Pixel 7 عرضه ٤١٢ «CSS pixel» بس كثافته ٢.٦٢٥، يعني كل CSS pixel = ٢.٦٢٥ بكسل حقيقي: ٤١٢ × ٢.٦٢٥ ≈ ١٠٨٢، و ٨٣٩ × ٢.٦٢٥ ≈ ٢٢٠٢.

> كان المثال فيه [[--device "iPhone 13"]] وجربته: فشل بـ [[Executable doesn't exist at ...\webkit-...]]. أجهزة آيفون في Playwright بتستخدم WebKit (محرك Safari) افتراضيًا حتى لو كتبت [[--browser chromium]]، و WebKit مش متسطب لأننا نزّلنا chromium بس. عشان كده المثال بقى Pixel 7. لو عايز آيفون: [[npx playwright install webkit]] الأول.

## ٥. الأخطاء اللي جربتها

~~~text الناتج
Error: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:8799/
~~~

مفيش سيرفر على البورت ده. شغّل السيرفر الأول.

| الأمر | الصورة |
|---|---|
| [[--viewport-size "1440,900"]] | ديسكتوب، الجزء الظاهر |
| [[--viewport-size "390,844" --full-page]] | موبايل، الصفحة كلها |
| [[--device "Pixel 7" --color-scheme dark]] | جهاز بعينه، وضع داكن |

## الخلاصة

- [[install chromium]] مرة، و [[screenshot]] لكل صورة.
- [[--full-page]] أعرض من الموبايل = فيه حاجة طالعة بره.
- أجهزة آيفون محتاجة WebKit.`,
          lines: [
            "نزّل Chromium بتاع Playwright (مرة واحدة).",
            "ديسكتوب ١٤٤٠ في ٩٠٠.",
            "موبايل ٣٩٠ عرض، والصفحة كاملة.",
            "موبايل Pixel 7 بالوضع الداكن، بعد ثانية من التحميل."
          ],
          sol: R`جربت الأمر التاني على سيرفر محلي وطبع:

[[Navigating to http://localhost:8791]]
[[Capturing screenshot into mobile.png]]

وطلع ملف PNG. هتلاقي ٣ صور: [[desktop.png]] مقاس 1440×900 بالظبط، و [[mobile.png]] عرضه 390 وطوله قد الصفحة كلها (بسبب [[--full-page]])، و [[pixel-dark.png]] بـ dark mode لو الـ CSS بتاعك فيه [[prefers-color-scheme: dark]] (مقاسها 1082×2202 لأن كثافة Pixel 7 هي 2.625 بكسل لكل CSS pixel). قبل وبعد التعديل حطهم جنب بعض في أي image viewer.

لو طلع [[Executable doesn't exist]] يبقى نسيت [[npx playwright install chromium]]. ولو الصورة فاضية أو نص غير متحمّل، زوّد [[--wait-for-timeout]] أو [[--wait-for-selector]]. ولو [[net::ERR_CONNECTION_REFUSED]] يبقى السيرفر المحلي مش شغال على البورت ده.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** خد ٣ صور لصفحتك: 1440×900 ديسكتوب، و 390×844 موبايل [[--full-page]]، و Pixel 7 dark.`, done: R`الـ ٣ ملفات موجودين وأحجامهم بالـ px صح (بص في خصائص الصورة)، والـ dark فعلًا غامق (لو الموقع بيدعمه).` },
            { lvl: 'تطبيق', t: R`**قبل وبعد:** صوّر الصفحة، غيّر حاجة في الـ CSS، صوّر تاني، وقارن الصورتين بسكربت [[node]] بـ [[sharp]] أو [[pixelmatch]] يطبع عدد البكسلات اللي اتغيّرت.`, done: R`على صفحة مااتغيّرتش الرقم [[0]] (أو قريب منه لو فيه animation)، وبعد التعديل رقم أكبر وصورة فرق.` },
            { lvl: 'تحدي', t: R`**ابني:** سكربت بيصوّر كل صفحات الموقع (من [[sitemap.xml]] أو لستة) على ٣ مقاسات، ويطبع أي صفحة فيها سكرول أفقي على 360 ([[scrollWidth > clientWidth]]).`, done: R`السكربت بيطلّع فولدر صور بأسماء الصفحات، وبيطبع اسم الصفحة اللي فيها overflow، ولما صلّحتها مبقتش تظهر.` },
          ],
        },
        {
          cmd: "Command Menu",
          title: "كل حاجة في DevTools من مكان واحد",
          desc: "Ctrl+Shift+P (زي VS Code) واكتب اللي عايزه. أشهر الأوامر: صورة للصفحة كلها من فوق لتحت، وقفل JavaScript تشوف الموقع من غيره، و Rendering اللي بيخليك تجرب dark mode أو print من غير ما تغيّر إعدادات جهازك.",
          example: R`Capture full size screenshot
Disable JavaScript
Show Rendering  (emulate prefers-color-scheme: dark, print media)
Show Coverage`,
          try: "خد screenshot للصفحة كلها، واعرض موقعك بـ dark mode من Rendering.",
          flag: "keys",
          deep: {
            why: "DevTools فيه حاجات كتير مخبّية. Command Menu بيخليك توصل لأي حاجة بالبحث.",
            how: R`Ctrl+Shift+P بيفتح Command Menu. أكتر الأوامر المفيدة:

«Capture full size screenshot»: صورة للصفحة كلها من فوق لتحت، حتى الجزء اللي مش في الشاشة.

«Disable JavaScript»: بيوقف JavaScript خالص. مفيد تشوف الموقع بدون JavaScript وتختبر SSR.

«Show Rendering»: emulate dark mode من غير ما تغيّر إعدادات النظام. وprint media query.`,
            when: "أي وقت تعرف إيه اللي عايزه بس مش لاقيه.",
            mistakes: "تبقى في تاب واحد وتنسى إن باقي DevTools فيه أدوات مهمة."
          },
          teach: R`## الأول: بحث في كل أوامر DevTools

[[Ctrl+Shift+P]] (على الماك [[Cmd+Shift+P]]) و DevTools مفتوحة بيفتح خانة بحث فيها كل الأوامر، زي VS Code. أسماء الأوامر من Chrome DevTools docs. والتأثير بتاع كل أمر جربته في Chrome ببروتوكول DevTools اللي الأوامر دي بتستخدمه.

---

## ١. [[Capture full size screenshot]]

صورة PNG للصفحة كلها من فوق لتحت. جربت نفس الأمر في البروتوكول ([[Page.captureScreenshot]] مع [[captureBeyondViewport]]) وطلع PNG للصفحة كلها. أخواته في نفس القايمة: [[Capture screenshot]] (الجزء الظاهر بس)، و [[Capture node screenshot]] (العنصر المختار في Elements بس).

## ٢. [[Disable JavaScript]]

جربت صفحة الـ SPA من درس View Source و JavaScript مقفول:

~~~text الـ body
<body><div id="root"></div><script type="module" src="/assets/index.js"></script></body>
~~~

صفحة فاضية. ده اللي bot مش بيشغّل JavaScript هيشوفه. وفي صفحة SSR المحتوى هيفضل موجود.

## ٣. [[Show Rendering]]

لوحة فيها «Emulate CSS media feature». جربت:

~~~javascript Console
matchMedia("(prefers-color-scheme: dark)").matches
~~~

~~~text الناتج
false     قبل
true      بعد ما اخترت prefers-color-scheme: dark
~~~

و [[matchMedia("print").matches]] بقى [[true]] بعد ما اخترت print. [[matchMedia]] بيسأل «الـ media query دي متحققة دلوقتي؟»، وده نفس اللي الـ CSS بيسأله في [[@media]]. يعني الموقع بيشوف dark mode حقيقي، من غير ما تغيّر إعدادات جهازك.

## ٤. [[Show Coverage]]

يفتح لوحة Coverage (درس Performance و Coverage).

| الأمر | تكتب في Command Menu |
|---|---|
| صورة للصفحة كلها | [[full size]] |
| من غير JavaScript | [[disable javascript]] (وارجع بـ [[enable javascript]]) |
| dark أو print | [[rendering]] |
| الكود اللي متستخدمش | [[coverage]] |

## الخلاصة

- مش فاكر الأداة فين؟ [[Ctrl+Shift+P]] واكتب جزء من اسمها.
- Rendering بيغيّر الـ media queries للتاب ده بس.
- Disable JavaScript بيوريك اللي الـ bots شايفينه.`,
          sol: R`Ctrl+Shift+P واكتب [[full size]] ثم Enter: هينزل PNG للصفحة كلها من فوق لتحت (مش بس الجزء الظاهر). لو الصورة مقصوصة أو فيها أجزاء فاضية، غالبًا عندك lazy loading أو عناصر [[position: fixed]]، اعمل scroll للآخر الأول.

الـ dark mode: Ctrl+Shift+P ثم Show Rendering، وانزل لـ [[Emulate CSS media feature prefers-color-scheme]] واختار [[prefers-color-scheme: dark]]. لو موقعك داعم dark mode بالـ media query هيتقلب فورًا. لو ما اتغيرش يبقى الموقع مش بيقرا الـ media query (يمكن معتمد على زرار و localStorage بس).`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من Command Menu اعمل ٤ حاجات من غير ماوس: screenshot للصفحة كلها، وقفل JavaScript، و Show Rendering ثم dark، و Show Coverage.`, done: R`الـ ٤ اتعملوا، والصورة اتحفظت، ورجّعت JavaScript تاني (Enable JavaScript).` },
            { lvl: 'تطبيق', t: R`**قفل JavaScript:** افتح موقعك بـ JavaScript مقفول. إيه اللي فضل شغال؟ اللينكات؟ الفورم؟ المحتوى نفسه؟`, done: R`لستة باللي اشتغل واللي مااشتغلش، ولو الصفحة فاضية خالص كتبت إن ده نفس اللي bots كتير بتشوفه (درس «View Page Source و Inspect»).` },
            { lvl: 'تحدي', t: R`**Rendering:** من Show Rendering جرّب: Paint flashing، و Layout Shift Regions، و Emulate vision deficiencies ثم Achromatopsia، و [[prefers-reduced-motion: reduce]].`, done: R`لكل واحد كاتب مشكلة لقيتها أو «مفيش»، ومنهم: أي زرار حالته باللون بس (اختفى الفرق في Achromatopsia)، وأي animation مااحترمش [[reduce]].` },
          ],
        }
      ]
    }
]);

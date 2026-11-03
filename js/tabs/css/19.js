// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: R`مشروع كامل: portfolio و dashboard`,
      l: 3,
      time: R`حوالي ١٠ ساعات على كذا يوم: ساعة للخريطة والمعمل، وحوالي ٤ ساعات للـ portfolio (٣ خطوات)، و ٤ للـ dashboard (٣ خطوات)، وساعة للمراجعة النهائية والنشر. والتمارين والمشاريع فوق كده`,
      goal: [
        R`تبني منتجين حقيقيين من فولدر فاضي بـ HTML و CSS حديث و JavaScript صغير من غير framework: **portfolio** لمطوّرة متخيلة بالعربي والإنجليزي، و **dashboard** لصالة تسلق متخيلة فيها أرقام وجدول أعضاء وجدول حصص.`,
        R`تستخدم أفكار التصميم اللي بتتكرر في المواقع الحقيقية في مكانها الصح: design tokens، و [[:has()]] كفلتر من غير JS، و grid areas للـ app shell، و sidebar بيصغر ويبقى drawer، و sparkline و progress ring بـ SVG، و skeleton، و [[<dialog>]]، و toasts بـ [[aria-live]]، و dark mode من غير وميض، و View Transitions بين الصفحات، و CV بيتطبع صفحة A4 واحدة.`,
        R`تقيس كل حاجة بـ Chrome الحقيقي (playwright-core و axe): مفيش scroll أفقي من 360 لـ 1440، و axe صفر violations في الثيمين واللغتين، و CLS صفر، و LCP متقاس قبل وبعد كل غلطة.`,
        R`تعرف الغلطات اللي حصلت فعلًا وانا ببني (٢٢ غلطة، و ٨ تجارب متعمّدة، كل واحدة برقمها)، وإزاي اتلقت واتصلحت، عشان لما تحصلك تعرفها من أول نظرة.`,
        R`تنشر الاتنين على GitHub Pages برابط، وتعرف بيكبروا إزاي وبيتكلفوا كام، وتخليهم بتوعك في الـ portfolio.`,
      ],
      use: {
        prog: R`آخر وحدة في التاب: كل اللي اتعلمته (semantic HTML، و grid و flex، و responsive، و RTL، و accessibility، والحركة، والأداء، و SEO) بيشتغل مع بعض في صفحات بجد. ده الفرق بين «عارف [[:has()]]» و «عارف أحطه فين ومتى مينفعش».`,
        work: R`أغلب شغل الـ front-end مقسوم نوعين: صفحات تعريف وتسويق (زي الـ portfolio) ولوحات تحكم داخلية (زي الـ dashboard). اللي بيطلب منك واحد فيهم هيسأل: «بيتفتح على الموبايل؟ بيشتغل بالكيبورد؟ الرابط بيحفظ الفلتر؟ بيتطبع؟». الوحدة دي بتجاوب على كل سؤال بقياس.`,
        cs: R`الحالة في الـ URL كمصدر واحد للحقيقة (single source of truth)، و progressive enhancement (الصفحة شغالة من غير JS والـ JS بيزوّد)، والفصل بين الدوال النقية (بتتختبر في Node) والكود اللي بيلمس الـ DOM، و stacking context و containing block، و bidi algorithm بتاع العربي.`,
      },
      lab: R`mkdir pd-lab && cd pd-lab
npm init -y
npm pkg set type=module
npm i playwright-core@1.64.1 @axe-core/playwright@4.14.0
node serve.mjs`,
      n: R`مشروعين كاملين بيتبنوا خطوة خطوة: portfolio بلغتين (٣ صفحات) و dashboard لصالة تسلق (صفحة فيها ٣ أجزاء). حوالي ١,١٨٠ سطر في ٢٢ ملف، من غير framework ولا مكتبة في المتصفح. كل رقم هنا اتقاس فعلًا بـ Chrome 156 و Node 24.22 و playwright-core 1.64.1 و axe-core 4.14 على ويندوز ١١، والنشر نفسه خطوات من وثائق GitHub Pages`,
      projects: [
        {
          lvl: R`صغير`,
          t: R`زرار الثيم للـ portfolio`,
          what: R`الـ portfolio بيتبع ثيم الجهاز بس، والـ tokens فيها [[[data-theme="dark"]]] جاهزة. زوّد زرار في الـ header بـ [[aria-pressed]] بيبدّل الثيم ويحفظه، و [[boot.js]] بيقراه قبل الرسم، زي الـ dashboard بالظبط. من درسين «بورتفوليو ١» و «داشبورد ٣».`,
          done: R`الزرار بيتقري «الوضع الداكن، pressed/not pressed» في تاب Accessibility، والاختيار بيفضل بعد refresh، و [[vitals.mjs]] بيقول CLS صفر في الحالتين، و axe صفر في الثيمين.`,
        },
        {
          lvl: R`صغير`,
          t: R`رسالة «مفيش مشاريع» في الفلتر`,
          what: R`زوّد فلتر سادس «موبايل» مفيش ولا كارت عليه، واعرض فقرة «مفيش مشاريع من النوع ده لسه» بـ CSS بس: [[.work:has(input[value="mobile"]:checked) .empty]] تظهر. وبعدين اكتبها بشكل عام بـ [[:not(:has(...))]] عشان متكتبش قاعدة لكل فلتر. من درس «بورتفوليو ٢».`,
          done: R`لما تختار «موبايل» الكروت كلها بتختفي والفقرة بتظهر، ولما تختار أي فلتر تاني الفقرة بتستخبى، ومن غير ولا سطر JavaScript جديد.`,
        },
        {
          lvl: R`متوسط`,
          t: R`صفحة دراسة حالة تانية بـ View Transition`,
          what: R`اعمل [[work/bus-board.html]] لمشروع لوحة الأتوبيس بنفس هيكل [[tide-notes.html]]، و [[view-transition-name]] مختلف للصورة، وحوّل كارتها في الرئيسية للينك. وزوّد في [[i18n.js]] الكلمات الإنجليزي بتاعتها، وفي [[check-portfolio.mjs]] الصفحة الجديدة في الـ matrix و axe. من دروس «بورتفوليو ٢» و «بورتفوليو ٣».`,
          done: R`الضغط على الكارت بيعمل انتقال (المتغير [[__vt]] = yes)، والاسم مش متكرر في نفس الصفحة (لو اتكرر الانتقال بيتلغي)، والـ matrix صفر overflow، و axe صفر في اللغتين.`,
        },
        {
          lvl: R`متوسط`,
          t: R`تصدير الأعضاء CSV من نفس الفلتر`,
          what: R`زرار «نزّل CSV» فوق جدول الأعضاء بيصدّر **كل** الصفوف اللي بتطابق الفلتر الحالي (مش الصفحة الحالية بس) من [[view()]] بـ [[size: Infinity]]، ومعاه BOM عشان Excel يقرا العربي. من درس «داشبورد ٢».`,
          done: R`مع [[?status=frozen]] الملف فيه ٥ صفوف وسطر عناوين، وبيتفتح في Excel بالعربي سليم، واسم الملف فيه الفلتر والتاريخ، واختبار Node بيتأكد إن الفاصلة جوه اسم بتتحط بين علامتين تنصيص.`,
        },
        {
          lvl: R`كبير`,
          t: R`الـ dashboard على API حقيقي`,
          what: R`بدّل [[data/*.json]] بـ API صغير (من تاب «Backend بـ Node» أو FastAPI): [[GET /members?status=&q=&sort=&page=]] بيعمل الفلترة والترتيب في السيرفر ويرجّع [[total]]، و [[POST /members]] و [[POST /classes/:id/book]] بيرجّعوا 409 لو الحصة اتملت. الواجهة نفسها متتغيرش غير في [[loadMembers]]: نفس [[parseState]] بيبني الـ query. ومعاه optimistic update للحجز بيرجع لورا لو السيرفر رفض.`,
          done: R`تفتح رابط [[?status=active&page=3]] في تاب جديد فتلاقي نفس الصفحة، وحجز حصة كاملة من تابين في نفس اللحظة: واحد بيكسب والتاني بيشوف toast «الحصة اتملت» والعداد بيرجع، و [[check-dashboard.mjs]] و [[audit-dashboard.mjs]] لسه بيعدّوا كلهم، والسيرفر بيكتب لوج لكل طلب.`,
          ext: R`زوّد تسجيل دخول للأدمن (cookie [[HttpOnly]]) وخلي إخفاء زرار «عضو جديد» عن الموظف مش هو الحماية: السيرفر هو اللي يرفض بـ 403.`,
        },
        {
          lvl: R`كبير`,
          t: R`نسخة الـ portfolio الثابتة بلغتين للـ SEO`,
          what: R`الـ dictionary بيبدّل النص في المتصفح، بس جوجل بيشوف العربي بس. اكتب [[build.mjs]] بيقرا نفس [[dict]] ويطلّع نسختين ثابتين: [[/]] بالعربي و [[/en/]] بالإنجليزي، وكل نسخة فيها [[lang]] و [[dir]] صح من السيرفر، و [[<link rel="alternate" hreflang>]] للتانية، وزرار اللغة يبقى لينك عادي. ومعاه فحص بيفشل لو كلمة ناقصة في أي لغة.`,
          done: R`[[curl -s .../en/ | grep "<html"]] بيطلّع [[lang="en" dir="ltr"]] من غير JS، والنسختين صفر violations، و CLS صفر من غير [[boot.js]] (مفيش تبديل بعد الرسم أصلًا)، وتشغيل [[build.mjs]] مرتين بيطلّع نفس الملفات بالظبط.`,
          ext: R`زوّد لغة تالتة، وخلي [[sitemap.xml]] يتولد لوحده فيه كل الصفحات باللغات.`,
        },
        {
          lvl: R`فكرة`,
          t: R`لوحة لحاجة بتعرفها`,
          what: R`خد هيكل الـ dashboard (shell و KPI و جدول بحالته في الرابط و جدول مواعيد و dialog و toasts و dark mode) وابنيه لحاجة انت عارف تفاصيلها: عيادة، أو مدرسة سواقة، أو ملعب، أو مكتبة، أو كورس أونلاين. الأرقام اللي في الكروت انت اللي بتختار ليه هي اللي مهمة لصاحب المكان.`,
          done: R`صاحب المكان (أو حد بيشتغل فيه) استخدمها ١٠ دقايق من موبايله من غير ما تشرحله، وقال أنهي رقم بيبص عليه الأول، والـ matrix و axe و CLS زي الوحدة دي.`,
          ext: R`ارفعها برابط، واكتب README فيه «ليه الأدوات دي» واللقطات على ٣ مقاسات، وحطها في الـ portfolio اللي بنيته هنا كدراسة حالة.`,
        },
      ],
      items: [
        {
          cmd: R`مشروع portfolio و dashboard: الخريطة`,
          title: R`بنبني إيه ولمين، وشكل الأجزاء، وليه HTML و CSS و JS من غير framework، والمعمل اللي هنقيس بيه كل خطوة`,
          learn: R`تبدأ مشروع واجهة صح من أول ساعة: تعرف بتبني إيه ولمين، وترسم الأجزاء، وتختار كل أداة بسبب مكتوب، وتعمل معمل (سيرفر صغير وسكربتات قياس بـ Chrome الحقيقي) قبل ما تكتب أول سطر CSS.`,
          out: R`فولدر [[pd-lab/]] فيه [[serve.mjs]] شغال على بورتين، و [[contrast.mjs]] بيطبع نسبة التباين لكل زوج ألوان ويقول AA ولا FAIL.`,
          use: {
            prog: R`هنا بتشوف إن الـ CSS اللي اتعلمته (tokens، و grid، و :has، و logical properties) هو أدوات لقرارات، مش حاجات تتحفظ. والدرس ده هو القرارات نفسها: إيه بنبنيه، وبإيه، وإزاي نعرف إنه سليم.`,
            work: R`أول يوم في أي مشروع واجهة: «اعمل الهيكل، واتفق على الألوان والمسافات، وحط طريقة تتأكد بيها إن الشغل سليم». جدول «ليه الأدوات دي» ده نفسه اللي بيتكتب في الـ README، واللي بيسأل عنه اللي بيراجع شغلك.`,
            cs: R`نسبة التباين معادلة رياضية (relative luminance) مش إحساس، فتتحسب وتتختبر في CI. والمعمل اللي بيقلّد بطء البيانات وفشلها هو نفس فكرة الـ test double: بتتحكم في الظروف عشان تختبر كل حالة.`,
          },
          desc: R`الوحدة دي بتبني **منتجين كاملين** خطوة خطوة، بـ HTML و CSS حديث و JavaScript صغير (من غير framework ولا مكتبة في المتصفح):

• **Portfolio** لمطوّرة واجهات متخيلة اسمها «نادين فؤاد»: صفحة رئيسية بالعربي والإنجليزي وزرار بيقلب [[dir]]، وكروت مشاريع بفلتر بـ [[:has()]]، وصفحة دراسة حالة بانتقال View Transition، و CV بيتطبع صفحة A4 واحدة، و Open Graph عشان اللينك يبان كويس لما يتبعت.
• **Dashboard** لصالة تسلق متخيلة اسمها «صالة الصخرة»: app shell بـ grid areas و sidebar بيصغر على الكمبيوتر ويبقى drawer على الموبايل، وكروت أرقام فيها sparkline و progress ring بـ SVG، وجدول أعضاء بترتيب وفلتر وصفحات **محفوظين في الرابط**، وحالات التحميل والخطأ والفاضي، وجدول حصص أسبوعي، و [[<dialog>]] للإضافة والحجز، و toasts بتتقري لقارئ الشاشة، و dark mode.

الدرس ده هو الخريطة: لمين، والأجزاء، وشجرة الملفات، وجدول «ليه الأدوات دي تحديدًا؟»، والألوان كـ tokens، والمعمل: سيرفر Node بيقدر **يبطّأ البيانات أو يفشّلها** عشان نشوف حالات التحميل والخطأ، وسكربت تباين بيحسب كل زوج ألوان. وفي آخره أول غلطة حقيقية: لون «نشط» الأخضر كان 4.35:1 (أقل من 4.5)، و axe مقالش حاجة (الدرس الأخير بيشرح ليه).

الدروس اللي بعده بالترتيب: «بورتفوليو ١: الهيكل واللغتين و dir»، و «بورتفوليو ٢: الكروت والفلتر والظهور بالسكرول»، و «بورتفوليو ٣: دراسة الحالة والطباعة و OG»، و «داشبورد ١: الـ shell والـ sidebar والأرقام»، و «داشبورد ٢: جدول الأعضاء والحالة في الرابط»، و «داشبورد ٣: جدول الحصص و dialog والتنبيهات»، و «المراجعة النهائية: مقاسات و a11y وأداء ونشر».`,
          example: R`npm init -y
npm pkg set type=module
npm i playwright-core@1.64.1 @axe-core/playwright@4.14.0
node serve.mjs
curl -s -o /dev/null -w "%{http_code}\n" "http://127.0.0.1:5502/data/members.json?fail=1"
node contrast.mjs`,
          lines: [
            R`بيعمل [[package.json]] بالقيم الافتراضية من غير أسئلة ([[-y]] = yes لكل سؤال). في npm 11 الملف بيطلع فيه [[ "type": "commonjs" ]] صريحة، ودي هتعمل مشكلة في السطر الجاي.`,
            R`بيغيّر [[type]] لـ [[module]]: كل ملف [[.js]] في الفولدر بيتقري كـ ES module ([[import]] و [[export]]). من غيرها تجربة [[state.js]] في Node وقعت بـ [[Named export 'parseState' not found ... is a CommonJS module]] (اتقابل في المعمل).`,
            R`أداتين القياس بس، ومش بيتحطوا في الموقع: [[playwright-core]] بيتحكم في Chrome المتسطّب عندك (مبينزّلش متصفح، ده الفرق بينه وبين [[playwright]])، و [[@axe-core/playwright]] بيشغّل فحص accessibility جوه الصفحة. الأرقام بعد [[@]] نفس النسخ اللي اتجرّبت.`,
            R`السيرفر (الكود في الشرح): الـ portfolio على [[5501]] والـ dashboard على [[5502]]، و [[?delay=1200]] بيأخر البيانات و [[?fail=1]] بيرجّع 500 عشان نشوف الـ skeleton ورسالة الخطأ. سيبه شغال في ترمنال لوحده.`,
            R`بيتأكد إن الفشل المتعمّد شغال: [[-s]] من غير progress، و [[-o /dev/null]] ارمي الجسم، و [[-w "%{http_code}"]] اطبع كود الرد بس، فالمفروض يطبع [[500]]. على PowerShell اكتب [[curl.exe]] (في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم تاني لـ [[Invoke-WebRequest]]) و [[-o NUL]].`,
            R`بيحسب نسبة التباين لكل زوج ألوان (نص على خلفية) من الـ tokens ويقول [[AA]] لو 4.5 أو أكتر و [[FAIL]] لو أقل. ده الفحص اللي مسك الأخضر الضعيف قبل axe.`,
          ],
          try: R`اعمل الفولدر ونفّذ أوامر المثال واحد واحد. حط [[serve.mjs]] من الشرح، وشغّله، وافتح [[http://127.0.0.1:5502/data/members.json?delay=2000]] في المتصفح وعدّ الثواني قبل ما يرد. وبعدين اكتب [[contrast.mjs]] وجرّب فيه زوج ألوان من موقع عاجبك (خد اللون من DevTools بالـ color picker).`,
          flag: R`term`,
          deep: {
            why: R`أغلب مشاريع الواجهة اللي بتبوظ بتبوظ في أول ساعة: حد بدأ يكتب CSS من غير ما يعرف الصفحة فيها إيه، وحط ألوان hex في ٤٠ مكان، ومفيش طريقة يعرف بيها إن الصفحة سليمة غير «شكلها حلو عندي». الخريطة والـ tokens والمعمل بيخلّوا كل قرار بعد كده سهل: تغيير لون = سطر واحد، ورقم الـ CLS بيتقاس في ثانية بدل ما تخمّن.`,
            how: R`المعمل ٣ حاجات: **سيرفر** static صغير بـ [[node:http]] (بيقرا الملف من الفولدر ويبعته بالـ content-type الصح، وبيأخر أو يفشّل أي رابط تحت [[/data/]] لو الرابط فيه [[delay]] أو [[fail]])، و **سكربتات قياس** بـ playwright-core بتفتح Chrome الحقيقي على مقاسات وثيمات ولغات مختلفة وتقيس (scrollWidth و PerformanceObserver و axe)، و **دوال نقية** (حساب التباين، والحالة في الرابط، ونقط الـ sparkline) بتتختبر في Node من غير متصفح أصلًا. والتباين بيتحسب بمعادلة WCAG: كل لون بيتحول لـ relative luminance (القناة على 255، وبعدين gamma، وبعدين وزن 0.2126 للأحمر و 0.7152 للأخضر و 0.0722 للأزرق)، والنسبة = (الأفتح + 0.05) ÷ (الأغمق + 0.05).`,
            when: R`أي موقع أو لوحة هتتسلم لحد: الخريطة والجدول والـ tokens قبل أول سطر CSS، والمعمل قبل أول خطوة بناء. والمشروع ده نفسه ينفع يبقى أول حاجتين في الـ portfolio بتاعك. وكل جزء هنا ليه درس في التاب لو عايز تتعمق: «CSS variables»، و «contrast ratio»، و «axe و Lighthouse»، و «مصفوفة مقاسات».`,
            mistakes: R`تبدأ بالتصميم من غير ما تحدد الصفحة لمين (الـ dashboard للأدمن على كمبيوتر المكتب والموبايل، والـ portfolio لحد بيقرر يكلّمك في ٣٠ ثانية). تختار framework «عشان الكل بيستخدمه» لمشروع ٢٠ ملف. تحط الألوان hex جوه كل قاعدة فالـ dark mode يبقى ١٠٠ تعديل. تختبر بالعين على مقاس واحد. تفتكر إن axe صفر = التباين سليم (هنا كان فيه زوج 4.35:1 و axe عدّاه). تخلي [[?fail=1]] يأثر على الصفحة نفسها مش البيانات بس (حصل: الصفحة رجعت JSON والاختبار علّق ٣٠ ثانية).`,
          },
          teach: R`## الصورة الكبيرة

### بنبني إيه ولمين

| المنتج | لمين | لازم يعمل إيه في أول ٣٠ ثانية |
|---|---|---|
| portfolio «نادين فؤاد» | حد بيدوّر على مطوّرة واجهات (شركة أو عميل) وفتح اللينك من رسالة | يعرف هي مين وبتعمل إيه، ويشوف شغل حقيقي، ويلاقي الإيميل، ولو عايز يطبع الـ CV يطلع صفحة واحدة |
| dashboard «صالة الصخرة للتسلق» | مدير الصالة والموظف اللي على الاستقبال، على كمبيوتر المكتب والموبايل | يشوف الأرقام المهمة، ويلاقي عضو بالاسم أو الحالة، ويبعت الرابط لزميله فيفتح على نفس الفلتر، ويحجز مكان في حصة |

الأسماء والأرقام كلها متخيلة: «نادين فؤاد» و «صالة الصخرة» والأعضاء الـ ٥٧ اتولدوا بسكربت (درس «داشبورد ٢»).

### الأجزاء وإزاي البيانات بتمشي

~~~text الـ portfolio: ٣ صفحات ثابتة
 index.html ──(لينك + View Transition)──▶ work/tide-notes.html
     │  boot.js  في الـ head: اللغة والثيم قبل الرسم
     │  i18n.js  آخر الـ body: dictionary ← كل [data-i18n]
     │  reveal.js: IntersectionObserver ← .in
     └──▶ cv.html  (@media print + @page A4)
 og.png  ◀── make-og.mjs (Chrome بيصوّر og.html على 1200×630)
~~~

~~~text الـ dashboard: صفحة واحدة، ٣ أجزاء
                 ┌─────────── location.search (?status=&sort=&page=) ───────────┐
                 ▼                                                              │
  state.js  parseState ─▶ view(rows, state) ─▶ table.js يرسم ─▶ toQuery ─▶ history.pushState
                                ▲
  serve.mjs ── data/members.json  (?delay ?fail للمعمل بس)
            ── data/kpi.json ─▶ kpi.js  (أرقام + sparkline + ring)
            ── data/classes.json ─▶ schedule.js ─▶ <dialog> ─▶ toast (aria-live)
  shell.js: sidebar (collapse ≥ 64rem، drawer أقل) + الثيم
~~~

---

## ليه الأدوات دي تحديدًا؟

| الحاجة | اخترنا | البدايل الحقيقية | ليه ده هنا | إمتى تختار البديل |
|---|---|---|---|---|
| الإطار | HTML و CSS و JS عادي | React أو Vue أو Svelte، أو Astro | ٣ صفحات ولوحة واحدة، والـ HTML بيتبعت جاهز (مفيش hydration)، وكل فكرة CSS بتبان من غير طبقة فوقها | لما الواجهة يبقى فيها state كتير بتتشارك بين أجزاء كتير، أو فريق محتاج components موحدة: React (تاب React) أو Astro للمواقع |
| التنسيق | CSS عادي بـ tokens | Tailwind v4، أو CSS Modules | الدرس عن CSS نفسه: [[:has()]] و grid areas و [[@starting-style]] و [[@page]] باينين زي ما هم | Tailwind لما فريق بيبني صفحات كتير بسرعة ومتفقين على نظام (تاب Tailwind في نفس الصفحة) |
| اللغتين | dictionary في JS بيبدّل النص | صفحتين ثابتين [[/]] و [[/en/]]، أو مكتبة i18n | ٣ صفحات، ومفيش build step، والتبديل لحظي من غير reload | لو SEO بالإنجليزي مهم: صفحتين ثابتين من نفس الـ dictionary (مشروع كبير في آخر الوحدة) |
| الرسوم في الكروت | SVG بإيدك (polyline و circle) | Chart.js أو ECharts أو Recharts | sparkline و ring = سطرين، ومفيش ٢٠٠ كيلو مكتبة عشان خط | لما تحتاج محاور وtooltip وتكبير و ١٠ أنواع رسم: مكتبة |
| النافذة | [[<dialog>]] و [[showModal()]] | مكتبة modal، أو div بـ role=dialog | المتصفح بيعمل الـ focus trap و Esc و [[inert]] للخلفية ورجوع الفوكس | لو لازم تدعم متصفح قديم جدًا، أو drawer بيتسحب بالإصبع |
| الحالة | الرابط ([[URLSearchParams]] و [[history]]) | localStorage، أو state في الذاكرة | الرابط بيتبعت ويتحفظ في الـ bookmarks، وزرار Back بيرجّع الفلتر | الحاجات الشخصية اللي ملهاش معنى لحد تاني (الثيم، والـ sidebar مقفول): localStorage |
| السيرفر | [[node:http]] بإيدك (٣٠ سطر) | [[npx serve]]، أو Vite، أو nginx | بنتحكم في التأخير والفشل لكل رابط، ومفيش dependencies | Vite لو هتحتاج HMR وbundling، و nginx في الإنتاج |
| القياس | playwright-core بـ [[channel: "chrome"]] | Puppeteer، أو Lighthouse CI | بيستخدم Chrome المتسطّب (مبينزّلش ١٥٠ ميجا)، وفيه CDP للـ CPU throttling | Lighthouse CI لو عايز الدرجات والتقرير الكامل في كل PR |
| الـ a11y الأوتوماتيك | axe-core 4.14 | Lighthouse a11y (هو axe جواه)، و Pa11y | نفس المحرك، وبيرجع JSON نقدر نطبعه ونفشل عليه | Pa11y لو عايز تفحص sitemap كامل من سطر أوامر |
| الخط | خطوط النظام ([[system-ui]] و Segoe UI و Noto Sans Arabic) | خط من Google Fonts | صفر طلبات، وصفر وميض، والـ LCP مش مستني ملف خط | لما الهوية محتاجة خط معيّن: self-host بـ [[font-display: swap]] و [[preload]] (درس «CLS») |
| النشر | GitHub Pages | Netlify أو Vercel أو Cloudflare Pages | مجاني، وفي نفس الـ repo، والموقع كله ملفات ثابتة | لو محتاج redirects أو headers أو فورم بيتبعت: Netlify أو Cloudflare |

---

## الهيكل

~~~text
pd-lab/
├── package.json             "type": "module" (عشان Node يختبر ملفات .js)
├── serve.mjs                السيرفر: 5501 للـ portfolio و 5502 للـ dashboard
├── contrast.mjs             نسبة التباين لكل زوج ألوان
├── og.html, make-og.mjs     صورة المشاركة 1200×630
├── gen-data.mjs             أعضاء وحصص متخيلين (نفس الـ seed = نفس البيانات)
├── check-portfolio.mjs      اللغة والفلتر والطباعة و axe والمقاسات و CLS/LCP
├── check-dashboard.mjs      الرابط والترتيب والحالات والـ dialog والـ sidebar
├── audit-dashboard.mjs      axe والمقاسات والكيبورد والـ sticky
├── vitals.mjs               CLS و LCP على موبايل و CPU أبطأ ٤ مرات، ٣ مرات
├── portfolio/
│   ├── index.html, cv.html, work/tide-notes.html
│   ├── css/tokens.css       كل الألوان والمقاسات
│   ├── css/site.css, case.css, cv.css
│   ├── js/boot.js           في الـ head: اللغة والثيم قبل الرسم
│   ├── js/i18n.js           الـ dictionary وزرار اللغة
│   ├── js/reveal.js, print.js
│   └── img/og.png, icon.svg
└── dashboard/
    ├── index.html
    ├── css/app.css          tokens والـ shell والجدول والجدول الأسبوعي والـ dialog
    ├── data/members.json, classes.json, kpi.json
    └── js/boot.js, app.js, shell.js, kpi.js, table.js, state.js, lib.js, schedule.js, ui.js
~~~

الفصل المهم: [[state.js]] و [[lib.js]] **مفيهمش ولا سطر بيلمس الصفحة** ([[document]] أو [[window]])، فبيتختبروا في Node وفي الـ CI. الباقي بيرسم وبيسمع للأحداث بس.

---

## الألوان كـ tokens

كل لون له اسم بمعناه (مش بشكله): [[--ink]] للنص، و [[--muted]] للنص الثانوي، و [[--accent]] أو [[--brand]] للأزرار واللينكات، و [[--ok]] و [[--warn]] و [[--bad]] للحالات، وكل حالة ليها نسخة [[-soft]] للخلفية (badge أخضر فاتح ونص أخضر غامق). الحالات ثابتة ومش بتتغير مع البراند. والـ dark مش «اقلب الألوان»: الخلفية كحلي غامق مش أسود، و [[--brand]] بيبقى **أفتح** عشان يتقري عليها.

| token | portfolio فاتح | portfolio داكن | dashboard فاتح | dashboard داكن |
|---|---|---|---|---|
| الخلفية | [[#f7f5f0]] ورقي دافي | [[#12161f]] | [[#f3f5f7]] رمادي بارد | [[#0f1419]] |
| النص | [[#1c2230]] | [[#e9ecf2]] | [[#17202a]] | [[#e6ebf0]] |
| الثانوي | [[#535b6b]] | [[#a6aebd]] | [[#56606b]] | [[#9ba6b2]] |
| الأساسي | [[#0d6b63]] أخضر بحري | [[#5fcfc3]] | [[#1f6f8b]] أزرق بحر | [[#6cc3e0]] |

---

## الخطوة ٠: المعمل

~~~javascript serve.mjs
// static server for the lab: node serve.mjs  (portfolio on :5501, dashboard on :5502)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".ico": "image/x-icon" };

function site(dir, port) {
  const root = path.resolve(dir);
  http.createServer((req, res) => {
    const u = new URL(req.url, "http://x");
    let p = decodeURIComponent(u.pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(root, p);
    const lab = p.startsWith("/data/");                      // ?delay and ?fail only touch the data, never the page itself
    const delay = lab ? Number(u.searchParams.get("delay") || 0) : 0;
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      return res.end("404 " + p);
    }
    setTimeout(() => {
      if (lab && u.searchParams.get("fail") === "1") { res.writeHead(500, { "content-type": "application/json" }); return res.end('{"error":"db down"}'); }
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" });
      fs.createReadStream(file).pipe(res);
    }, delay);
  }).listen(port, "127.0.0.1", () => console.log($__bt$__{dir} -> http://127.0.0.1:$__{port}/$__bt));
}

site("portfolio", 5501);
site("dashboard", 5502);
~~~

- [[types]]: كل امتداد ونوعه. من غيره المتصفح ممكن يرفض الـ CSS (بيتطلب [[text/css]]) أو الـ module (بيتطلب نوع JavaScript).
- [[p.endsWith("/")]]: [[/]] تبقى [[/index.html]]، زي أي سيرفر static.
- [[!file.startsWith(root + path.sep)]]: يمنع أي طلب يطلع بره الفولدر (path traversal). [[new URL]] بيشيل [[/../]] لوحده، بس [[/..%2fserve.mjs]] بيعدّي منه و [[decodeURIComponent]] بيحوّله [[/../serve.mjs]]: من غير السطر ده رجّع كود السيرفر بكود 200، ومعاه 404 (اتجرّب). و [[path.sep]] عشان [[portfolio-old]] ميعدّيش على إنه جوه [[portfolio]].
- [[lab]]: التأخير والفشل **للبيانات بس**. أول نسخة كانت بتطبّقهم على أي رابط، فـ [[/?fail=1]] رجّع الصفحة نفسها JSON بكود 500، والاختبار فضل مستني [[#rows]] ٣٠ ثانية ووقع بـ [[Timeout 30000ms exceeded]].
- [[cache-control: no-store]]: كل ريفريش من جديد، فالقياسات متتأثرش بكاش.

~~~text اتشغّل فعلًا (Git Bash على ويندوز ١١، Node 24.22.1)
$ node serve.mjs
portfolio -> http://127.0.0.1:5501/
dashboard -> http://127.0.0.1:5502/
$ curl -s -o /dev/null -w "page %{http_code} " "http://127.0.0.1:5502/?fail=1"; curl -s -o /dev/null -w "data %{http_code}\n" "http://127.0.0.1:5502/data/members.json?fail=1"
page 200 data 500
~~~

### فحص التباين

~~~javascript contrast.mjs (الأزواج المهمة بس)
const lum = hex => { const c = hex.match(/\w\w/g).map(h => parseInt(h, 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const pairs = { "portfolio light muted/paper": ["#535b6b", "#f7f5f0"], "portfolio light accent/paper": ["#0d6b63", "#f7f5f0"], "portfolio dark muted/paper": ["#a6aebd", "#12161f"], "portfolio dark accent/paper": ["#5fcfc3", "#12161f"],
  "dash light muted/bg": ["#56606b", "#f3f5f7"], "dash light ok/ok-soft": ["#1a7f37", "#dcf3e3"], "dash light warn/warn-soft": ["#8a5a00", "#fbefd5"], "dash light bad/bad-soft": ["#b42318", "#fde4e1"], "dash light brand-ink/brand": ["#ffffff", "#1f6f8b"],
  "dash dark muted/bg": ["#9ba6b2", "#0f1419"], "dash dark ok/ok-soft": ["#57d07a", "#12301c"], "dash dark warn/warn-soft": ["#f2c063", "#362a10"], "dash dark bad/bad-soft": ["#ff8a7a", "#3a1714"], "dash dark brand-ink/brand": ["#08202a", "#6cc3e0"] };
for (const [k, [a, b]] of Object.entries(pairs)) { const r = ratio(a, b); console.log(k.padEnd(30), r.toFixed(2), r >= 4.5 ? "AA" : "FAIL"); }
~~~

- [[lum]]: كل قناة على 255، وبعدين تحويل gamma (اللي تحت 0.04045 بيتقسم على 12.92، والباقي معادلة الأس 2.4)، وبعدين الوزن: العين بتشوف الأخضر أفتح بكتير من الأزرق، عشان كده 0.7152 مقابل 0.0722.
- [[ratio]]: الأفتح على الأغمق بعد ما نزوّد 0.05 للاتنين. أقل نسبة 1 (نفس اللون) وأكبر نسبة 21 (أبيض على أسود).
- WCAG AA: [[4.5]] للنص العادي، و [[3]] للنص الكبير (24px، أو 18.66px bold). الـ badge هنا 13.6px bold، يعني نص عادي، يعني 4.5.

~~~text اتشغّل فعلًا: أول مرة
portfolio light muted/paper    6.26 AA
portfolio light accent/paper   5.84 AA
portfolio dark muted/paper     8.11 AA
portfolio dark accent/paper    9.65 AA
dash light muted/bg            5.86 AA
dash light ok/ok-soft          4.35 FAIL
dash light warn/warn-soft      5.20 AA
dash light bad/bad-soft        5.44 AA
dash light brand-ink/brand     5.67 AA
dash dark muted/bg             7.49 AA
...
~~~

الأخضر [[#1a7f37]] على [[#dcf3e3]] (الـ badge «نشط») = 4.35، و axe كان قايل **صفر violations** على نفس الصفحة. جرّبت ٤ درجات أغمق:

~~~text
#1a7f37 on soft 4.35 on white 5.08
#177232 on soft 5.15 on white 6.02
#156c2f on soft 5.59 on white 6.53
#146a2e on soft 5.74 on white 6.71
~~~

اخترت [[#156c2f]]: 5.59 على الخلفية الفاتحة و 6.53 على الأبيض (نفس اللون بيتكتب بيه سهم «+8.8%» على الكارت الأبيض). والتصليح سطر واحد في [[--ok]] لأن اللون token. ليه axe سكت؟ لأنه **مفحصش الكلمة أصلًا**، والسبب غريب ومتعلق بالعربي بالذات (الدرس الأخير).

---

## خطة البناء

| الخطوة | الدرس | بتضيف إيه | بتتأكد إزاي |
|---|---|---|---|
| ١ | بورتفوليو ١ | الهيكل و tokens واللغتين و [[dir]] | [[lang]] و [[dir]] بيتقلبوا، و CLS صفر بالإنجليزي |
| ٢ | بورتفوليو ٢ | الكروت والفلتر بـ [[:has()]] والظهور بالسكرول | عدد الكروت لكل فلتر، والصفحة كاملة من غير JS |
| ٣ | بورتفوليو ٣ | دراسة الحالة والـ CV و OG و View Transitions | صفحة PDF واحدة، و [[pagereveal]] فيه انتقال |
| ٤ | داشبورد ١ | الـ shell والـ sidebar والكروت | عرض الـ sidebar، و [[inert]]، والـ drawer بره الشاشة |
| ٥ | داشبورد ٢ | الجدول والحالة في الرابط والـ skeleton | الرابط بعد كل فعل، و Back، و CLS صفر |
| ٦ | داشبورد ٣ | الجدول الأسبوعي و dialog و toasts و dark | الفوكس بيرجع، و Esc، والـ toast بيتقري |
| ٧ | المراجعة | المقاسات و axe والكيبورد والأداء والنشر | ٦ عروض صفر overflow، و axe صفر، والمسارات تحت [[/repo/]] |

## الخلاصة

- اكتب «لمين» و «في ٣٠ ثانية لازم يعمل إيه» قبل أي سطر.
- كل أداة ليها سبب مكتوب وإمتى تسيبها لغيرها.
- الألوان tokens بأسماء معناها، والتباين بيتحسب مش بيتشاف.
- المعمل بيتحكم في البطء والفشل للبيانات بس، والدوال النقية بتتختبر من غير متصفح.`,
          sol: R`[[node serve.mjs]] بيطبع السطرين بتوع البورتات، و [[?delay=2000]] بياخد حوالي ثانيتين قبل ما الـ JSON يظهر، و [[curl]] على [[?fail=1]] بيطبع [[500]]. و [[contrast.mjs]] على الأزواج اللي في الشرح بيطلّع الـ ١٤ سطر، وكلهم [[AA]] ما عدا [[dash light ok/ok-soft 4.35 FAIL]] قبل التصليح. لو جرّبت رمادي فاتح [[#999999]] على أبيض هتلاقيه [[2.85 FAIL]]: لون شائع جدًا للـ placeholder وهو مش مقروء.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه [[state.js]] و [[lib.js]] ممنوع يكون فيهم [[document]] ولا [[window]]، وإيه اللي هيحصل للـ CI لو حد زوّد [[document.title]] جوه [[view()]].`,
              done: R`الشرح بيقول إن الملفين بيتشغّلوا في Node (في [[ci-run]] والاختبارات) ومفيش [[document]] هناك، فالسطر ده هيوقع الاختبار بـ [[ReferenceError: document is not defined]]، والتصليح إن الرسم يفضل في [[table.js]].`,
            },
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** قبل ما تشغّل، توقّع نسبة التباين لـ [[#ffffff]] على [[#1f6f8b]] (زرار «عضو جديد») وهل هي أكتر من 4.5. وبعدين زوّد الزوج في [[contrast.mjs]] وشغّله.`,
              done: R`كتبت توقّعك، والسكربت طلّع [[5.67 AA]]، وعرفت ليه الأبيض بينفع على الأزرق ده ومش بينفع على [[#6cc3e0]] (الأزرق الفاتح بتاع الداكن: لازم نص غامق [[#08202a]]، 8.41).`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** زوّد على [[serve.mjs]] باراميتر [[?status=404]] بيرجّع أي كود تختاره للبيانات بس، وباراميتر [[?slow=random]] بيأخر بين ٢٠٠ و ٢٠٠٠ ملي ثانية عشوائي. واتأكد إن الصفحة نفسها مبتتأثرش.`,
              done: R`[[curl -s -o /dev/null -w "%{http_code}" ".../data/members.json?status=404"]] بيطبع [[404]]، ونفس الباراميتر على [[/?status=404]] بيطبع [[200]]، و ٥ طلبات بـ [[slow=random]] أوقاتها مختلفة (اطبعها بـ [[-w "%{time_total}"]]).`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**صلّح الكود البايظ:** النسخة دي من السيرفر بتسيب أي حد يقرا ملفات بره الفولدر: [[const file = path.join(root, p); if (!fs.existsSync(file)) ...]]. ابعت طلب يثبت المشكلة، وبعدين صلّحها.`,
              done: R`عرفت إن [[/../serve.mjs]] بيرجع [[404]] حتى من غير الحماية (لأن [[new URL]] بيشيل [[..]] من الـ pathname)، بس [[curl -s --path-as-is -o /dev/null -w "%{http_code}" "http://127.0.0.1:5501/..%2fserve.mjs"]] رجّع [[200]] وكود السيرفر نفسه: [[%2f]] مش بيتحسب فاصل في الـ URL، و [[decodeURIComponent]] بيحوّله [[/]] بعدها. وبعد ما رجّعت [[file.startsWith(root + path.sep)]] بقى [[404]] (اتجرّب في المعمل: 200 قبل و 404 بعد).`,
            },
            {
              lvl: R`تحدي`,
              t: R`**مسألة:** اكتب [[pick(fg, bg)]] بتاخد لون نص ولون خلفية، ولو النسبة أقل من 4.5 بتغمّق النص (أو تفتّحه لو الخلفية غامقة) خطوة خطوة لحد ما يعدّي، وترجّع أول لون بيعدّي. جرّبها على [[#1a7f37]] و [[#dcf3e3]].`,
              done: R`[[pick("#1a7f37", "#dcf3e3")]] بترجّع لون نسبته 4.5 أو أكتر وقريب من الأصلي (في المعمل التلات درجات الأغمق كلهم عدّوا)، وعلى خلفية غامقة بتفتّح مش بتغمّق، وفيه اختبار بيتأكد إن اللون اللي اتنقى عدّى فعلًا.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** نزّل [[playwright]] (الكامل) في فولدر تجربة تاني و [[playwright-core]] في فولدر، وقارن مساحة [[node_modules]] والفولدر اللي بيتنزّل فيه المتصفح بعد [[npx playwright install chromium]]. اكتب الرقمين وامسح الفولدر التجريبي.`,
              done: R`عندك رقمين بالميجا (المكتبة لوحدها صغيرة، والمتصفح المنزّل أكبر بكتير)، ومكتوب ليه المعمل ده بيستخدم [[channel: "chrome"]]، وفولدر التجربة اتمسح.`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`const lum = hex => { const c = hex.match(/\w\w/g).map(h => parseInt(h, 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const pairs = { "ok/ok-soft old": ["#1a7f37", "#dcf3e3"], "ok/ok-soft new": ["#156c2f", "#dcf3e3"], "muted/bg": ["#56606b", "#f3f5f7"], "dark muted/bg": ["#9ba6b2", "#0f1419"] };
let fail = 0;
for (const [k, [a, b]] of Object.entries(pairs)) { const r = ratio(a, b); if (r < 4.5) fail++; console.log(k + " " + r.toFixed(2) + (r >= 4.5 ? " AA" : " FAIL")); }
console.log("failing pairs: " + fail);`,
              expect: [
                R`ok/ok-soft old 4.35 FAIL`,
                R`ok/ok-soft new 5.59 AA`,
                R`muted/bg 5.86 AA`,
                R`dark muted/bg 7.49 AA`,
                R`failing pairs: 1`,
              ],
            },
          ],
        },
        {
          cmd: R`بورتفوليو ١: الهيكل واللغتين و dir`,
          title: R`صفحة رئيسية بالعربي والإنجليزي: زرار بيقلب lang و dir، و tokens، وخطوط النظام، ونص إنجليزي جوه العربي من غير ما يتلخبط، ومن غير ما الصفحة تتنطط`,
          learn: R`تبني هيكل صفحة بلغتين صح: [[lang]] و [[dir]] على [[<html>]]، و logical properties عشان الـ CSS ميتغيرش لما الاتجاه يتقلب، و dictionary بيبدّل النصوص والـ [[aria-label]] و [[<title>]]، واختيار اللغة بيتحفظ ويتطبق قبل الرسم، والأرقام والإنجليزي جوه سطر عربي بيتعرضوا صح.`,
          out: R`[[index.html]] و [[tokens.css]] و [[boot.js]] و [[i18n.js]]: الزرار بيقلب الصفحة كلها، والـ refresh بيفتكر اللغة، و CLS بالإنجليزي صفر، و [[keys.mjs]] بيقول [[missing in en: none]] للتلات صفحات.`,
          use: {
            prog: R`هنا بتشوف درس «lang و dir» ودرس «logical properties» شغالين مع بعض: سطر [[dir="ltr"]] واحد على [[<html>]] بيقلب الـ header والكروت والمسافات من غير ولا قاعدة CSS زيادة، لأن كل القواعد مكتوبة بـ [[inline-start]] و [[margin-inline]] مش [[left]] و [[right]].`,
            work: R`أي موقع لشركة أو شخص في المنطقة بيتطلب بلغتين. والأسئلة اللي بتيجي بعد التسليم: «ليه الصفحة بتتنطط لما بفتحها بالإنجليزي؟» و «ليه الرقم +40 مقلوب؟» و «ليه قارئ الشاشة بيقرا English بلكنة عربي؟». الدرس ده بيجاوب عليهم بأرقام.`,
            cs: R`الـ Unicode Bidirectional Algorithm: كل حرف ليه اتجاه (العربي قوي RTL، والإنجليزي قوي LTR، والأرقام ضعيفة، والعلامات زي [[+]] محايدة بتاخد اتجاه اللي حواليها). وترتيب تحميل السكربتات: classic مقابل module (اللي بيستنى لحد ما الصفحة تتقري كلها).`,
          },
          desc: R`أول خطوة في الـ portfolio: الصفحة الرئيسية بهيكلها الكامل (skip link، و header فيه nav وزرار اللغة، و hero، والمشاريع، و «عني»، والتواصل، و footer)، والـ tokens، واللغتين.

**اللغتين من غير ما تكتب الكلام مرتين:** العربي هو اللي مكتوب في الـ HTML، وكل عنصر بيتترجم عليه [[data-i18n="key"]] (أو [[data-i18n-label]] للـ [[aria-label]]). [[i18n.js]] بيقرا العربي من الصفحة مرة واحدة، والإنجليزي من [[dict.en]]، والزرار بيحط النص الصح ويغيّر [[lang]] و [[dir]] على [[<html>]] ويحفظ الاختيار في localStorage. و [[<title>]] نفسه عليه [[data-i18n]]، فاسم التاب بيتغير كمان.

**من غير ما الصفحة تتنطط:** [[boot.js]] صغير في الـ head بيقرا اللغة المحفوظة ويحط [[dir]] **قبل الرسم**. أول نسخة كان فيها [[i18n.js]] كـ [[type="module"]]: الـ module بيتأجل لحد ما الصفحة تتقري، فالمتصفح رسم الكلام العربي في اتجاه LTR وبعدين بدّله إنجليزي: **CLS = 0.1402** (فوق 0.1 = «محتاج تحسين»). لما بقى classic script في آخر الـ body: **CLS = 0** (الوسط بتاع ٣ مرات، موبايل 390 و CPU أبطأ ٤ مرات).

**الإنجليزي جوه العربي:** [[40+]] جوه [[<dd>]] في صفحة RTL اتعرض **[[+40]]** (الـ [[+]] محايد فراح على الشمال). التصليح [[<span dir="ltr">40+</span>]]، واتقاس بمكان الحرف. وزرار «English» عليه [[lang="en"]] عشان قارئ الشاشة ينطقه إنجليزي.`,
          example: R`<html lang="ar" dir="rtl">
<title data-i18n="tHome">نادين فؤاد | مطوّرة واجهات</title>
<script src="js/boot.js"></script>
<button class="lang" type="button" id="lang" lang="en">English</button>
<dd><span dir="ltr">40+</span></dd>
<script src="js/i18n.js"></script>`,
          lines: [
            R`اللغة والاتجاه للصفحة كلها: [[lang="ar"]] بيقول لقارئ الشاشة والمتصفح (الخط، والـ hyphenation، والترجمة) إن الكلام عربي، و [[dir="rtl"]] بيقلب ترتيب العناصر والنص. الزرار بيغيّر الاتنين مع بعض.`,
            R`اسم التاب والنتيجة في جوجل. عليه [[data-i18n]] زي أي عنصر، لأن [[textContent]] بتاع [[<title>]] هو نفسه [[document.title]]، فالسكربت مش محتاج حالة خاصة.`,
            R`سكربت عادي (مش [[defer]] ولا module) في الـ head، فبيشتغل قبل ما أي حاجة تترسم: بيقرا [[localStorage]] ويحط [[lang="en" dir="ltr"]] لو آخر زيارة كانت إنجليزي، ويزوّد class [[js]] (درس «بورتفوليو ٢» بيستخدمه).`,
            R`زرار اللغة مكتوب بالإنجليزي وعليه [[lang="en"]] عشان قارئ الشاشة العربي ينطق «English» صح بدل ما يتهجّاه حروف. ولما الصفحة تبقى إنجليزي الزرار بيبقى «عربي» و [[lang="ar"]].`,
            R`رقم وبعده علامة جوه سطر RTL: من غير [[dir="ltr"]] الـ [[+]] بيروح على الشمال ويتقري «+40». الـ span بيعزل اتجاهه، والـ [[<dd>]] نفسه لسه RTL فالمحاذاة متتغيرش.`,
            R`الـ dictionary وزرار اللغة كـ classic script في آخر الـ body (مش [[type="module"]]): بيشتغل وانت لسه بتقرا الصفحة، فالنص الإنجليزي بيتحط قبل أول رسم في المعمل، و CLS نزل من 0.1402 لـ 0.`,
          ],
          try: R`ابني الصفحة من الشرح بالملفات الأربعة وافتحها من [[http://127.0.0.1:5501/]]. دوس على «English» وشوف الـ header اتقلب، واعمل refresh واتأكد إنها فضلت إنجليزي. بعدين حوّل [[<script src="js/i18n.js">]] لـ [[type="module"]] (وامسح [[function t]] من غير export مش هيفرق)، وشغّل [[node rep.mjs]] وقارن الـ CLS بتاع [[en]] قبل وبعد.`,
          flag: R`script`,
          deep: {
            why: R`لو الموقع بلغتين والـ CSS مكتوب بـ [[left]] و [[right]]، كل قاعدة بتتكتب مرتين ([[[dir=rtl] .x]]) وأول ما حد ينسى واحدة الصفحة تتكسر في لغة. ولو اللغة بتتطبق بعد الرسم، كل زائر إنجليزي بيشوف الصفحة بتتقلب قدامه (CLS 0.14 هنا، وده بيتحسب على الموقع في Core Web Vitals). وأي رقم أو كلمة إنجليزي جوه العربي ممكن تتعرض مقلوبة، وده أكتر حاجة بتبان «مش احترافي» في موقع عربي.`,
            how: R`المتصفح بيحدد اتجاه كل سطر من [[dir]]، وجوه السطر بيرتب الحروف بالـ bidi algorithm: الحروف العربي «قوية RTL»، والإنجليزي «قوي LTR»، والأرقام «ضعيفة» (بتتكتب من الشمال لليمين بس مكانها بيتحدد من اللي حواليها)، والعلامات زي [[+]] و [[:]] و [[|]] «محايدة» بتاخد اتجاه السطر لو مفيش جنبها حرف قوي. عشان كده [[40+]] لوحده في سطر RTL بيبقى [[+40]]. و [[dir="ltr"]] على span (أو [[<bdi>]]) بيعمل «جزيرة» ليها اتجاهها. وترتيب السكربتات: classic في الـ head بيوقف القراية لحد ما يخلص (فبيلحق قبل الرسم، وعشان كده [[boot.js]] صغير جدًا)، و [[type="module"]] بيتأجل لحد ما الـ HTML كله يتقري (زي [[defer]])، والمتصفح ممكن يرسم قبله، وده اللي عمل الـ CLS.`,
            when: R`أي صفحة فيها لغتين أو فيها إنجليزي وأرقام جوه العربي (أسعار، وأكواد، وإيميلات، وروابط). [[boot.js]] لأي إعداد لازم يبان من أول رسمة (اللغة والثيم). والـ dictionary في المتصفح ينفع لموقع صغير؛ لو الـ SEO بالإنجليزي مهم اعمل صفحتين ثابتين من نفس الـ dictionary (المشروع الكبير في آخر الوحدة). وكل جزء ليه درس: «lang و dir»، و «logical properties»، و «CLS».`,
            mistakes: R`تحط [[i18n.js]] كـ module أو [[defer]] وتفتكر إن «الصفحة صغيرة فمش هيبان» (اتقاس: 0.1402). تكتب [[left]] و [[margin-left]] وتصلّح الإنجليزي بـ [[[dir=ltr]]] لكل قاعدة. تنسى [[aria-label]] و [[<title>]] فقارئ الشاشة بيقرا عربي في صفحة إنجليزي. تحط [[letter-spacing]] سالب على العنوان كله فالحروف العربي بتنفصل (هنا [[:lang(en) .hero h1]] بس). تقرا localStorage من غير try فالصفحة بتقع في وضع الخصوصية لما المتصفح بيرمي [[SecurityError]]. تحط علم بلد كإيموجي للغة (مبيظهرش على ويندوز) بدل اسم اللغة نفسها.`,
          },
          teach: R`## الخطوة ١: الهيكل واللغتين

### الصفحة كاملة

~~~html portfolio/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n="tHome">نادين فؤاد | مطوّرة واجهات</title>
  <meta name="description" content="نادين فؤاد، مطوّرة واجهات: مواقع سريعة وسهلة الاستخدام بالعربي والإنجليزي.">
  <link rel="canonical" href="https://nadine.example/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="نادين فؤاد | مطوّرة واجهات">
  <meta property="og:description" content="مواقع سريعة وسهلة الاستخدام بالعربي والإنجليزي.">
  <meta property="og:url" content="https://nadine.example/">
  <meta property="og:image" content="https://nadine.example/img/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="اسم نادين فؤاد ووظيفتها على خلفية فاتحة">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="img/icon.svg" type="image/svg+xml">
  <script src="js/boot.js"></script>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/site.css">
</head>
<body>
  <a class="skip" href="#main" data-i18n="skip">اتخطّى للمحتوى</a>
  <header class="top">
    <a class="brand" href="./" data-i18n="name">نادين فؤاد</a>
    <nav aria-label="الأقسام" data-i18n-label="navLabel">
      <a href="#work" data-i18n="navWork">الشغل</a>
      <a href="#about" data-i18n="navAbout">عني</a>
      <a href="#contact" data-i18n="navContact">تواصل</a>
      <a href="cv.html" data-i18n="navCv">السيرة الذاتية</a>
    </nav>
    <button class="lang" type="button" id="lang" lang="en">English</button>
  </header>

  <main id="main">
    <section class="hero">
      <p class="eyebrow" data-i18n="role">مطوّرة واجهات</p>
      <h1 data-i18n="heroTitle">بابني مواقع سريعة، وأي حد يقدر يستخدمها.</h1>
      <p class="lead" data-i18n="heroLead">٦ سنين بكتب HTML و CSS و JavaScript لمواقع عربي وإنجليزي، ومهتمة بالأداء وسهولة الوصول.</p>
      <div class="actions">
        <a class="btn" href="#work" data-i18n="ctaWork">شوف الشغل</a>
        <a class="btn ghost" href="#contact" data-i18n="ctaContact">كلّمني</a>
      </div>
    </section>

    <section id="work" class="work" aria-labelledby="work-h">
      <h2 id="work-h" data-i18n="workTitle">مشاريع مختارة</h2>
      <fieldset class="filters">
        <legend data-i18n="filterBy">فلتر حسب النوع</legend>
        <label><input type="radio" name="f" value="all" checked> <span data-i18n="fAll">الكل</span></label>
        <label><input type="radio" name="f" value="web"> <span data-i18n="fWeb">مواقع</span></label>
        <label><input type="radio" name="f" value="a11y"> <span data-i18n="fA11y">سهولة الوصول</span></label>
        <label><input type="radio" name="f" value="api"> <span data-i18n="fApi">API</span></label>
        <label><input type="radio" name="f" value="design"> <span data-i18n="fDesign">تصميم</span></label>
      </fieldset>
      <ul class="cards" role="list">
        <li class="card" data-tags="web a11y" data-reveal>
          <div class="thumb t1" aria-hidden="true"></div>
          <h3><a href="work/tide-notes.html" data-i18n="p1">Tide Notes: ملاحظات من غير نت</a></h3>
          <p data-i18n="p1d">تطبيق ملاحظات بيشتغل offline، وبيتزامن لما النت يرجع.</p>
          <ul class="tags" role="list"><li>PWA</li><li>IndexedDB</li></ul>
        </li>
        <li class="card" data-tags="web" data-reveal>
          <div class="thumb t2" aria-hidden="true"></div>
          <h3 data-i18n="p2">لوحة مواعيد الأتوبيس</h3>
          <p data-i18n="p2d">شاشة محطة بتتحدّث كل ٣٠ ثانية، مقروءة من ٥ متر.</p>
          <ul class="tags" role="list"><li>SSE</li><li>CSS Grid</li></ul>
        </li>
        <li class="card" data-tags="a11y" data-reveal>
          <div class="thumb t3" aria-hidden="true"></div>
          <h3 data-i18n="p3">فورم حجز لعيادة</h3>
          <p data-i18n="p3d">٧ خطوات بقت ٣، والأخطاء بتتقري بقارئ الشاشة.</p>
          <ul class="tags" role="list"><li>WCAG 2.2</li><li>Forms</li></ul>
        </li>
        <li class="card" data-tags="api" data-reveal>
          <div class="thumb t4" aria-hidden="true"></div>
          <h3 data-i18n="p4">API وصفات أكل</h3>
          <p data-i18n="p4d">بحث بالمكوّنات، و pagination، وكاش ٦٠ ثانية.</p>
          <ul class="tags" role="list"><li>Node</li><li>PostgreSQL</li></ul>
        </li>
        <li class="card" data-tags="design web" data-reveal>
          <div class="thumb t5" aria-hidden="true"></div>
          <h3 data-i18n="p5">مكتبة design tokens</h3>
          <p data-i18n="p5d">ألوان ومسافات وخطوط لـ ٣ مواقع من ملف واحد.</p>
          <ul class="tags" role="list"><li>CSS variables</li><li>Figma</li></ul>
        </li>
      </ul>
    </section>

    <section id="about" class="about" aria-labelledby="about-h">
      <h2 id="about-h" data-i18n="aboutTitle">عني</h2>
      <p data-i18n="aboutText">بدأت بمواقع لمحلات صغيرة، ودلوقتي بشتغل مع فرق منتج على واجهات بيستخدمها آلاف الناس كل يوم. بحب الكود اللي يتقري، والصفحة اللي تفتح في أقل من ثانية.</p>
      <dl class="facts">
        <div><dt data-i18n="f1t">سنين خبرة</dt><dd>6</dd></div>
        <div><dt data-i18n="f2t">مشروع اتسلّم</dt><dd><span dir="ltr">40+</span></dd></div>
        <div><dt data-i18n="f3t">Lighthouse a11y</dt><dd>100</dd></div>
      </dl>
    </section>

    <section id="contact" class="contact" aria-labelledby="contact-h">
      <h2 id="contact-h" data-i18n="contactTitle">نشتغل سوا؟</h2>
      <p data-i18n="contactText">ابعتلي فكرة المشروع وميعاده، وهرد عليك خلال يومين شغل.</p>
      <p><a class="btn" href="mailto:hello@nadine.example" dir="ltr">hello@nadine.example</a>
        <button class="btn ghost" type="button" id="copy" data-i18n="copy">انسخ الإيميل</button></p>
      <p class="sr-status" role="status" id="status"></p>
    </section>
  </main>

  <footer class="foot"><p><span data-i18n="rights">كل الحقوق محفوظة</span> © 2026</p></footer>
  <script src="js/i18n.js"></script>
  <script src="js/reveal.js" type="module"></script>
</body>
</html>
~~~

فك الأجزاء المهمة من فوق لتحت:

- [[<meta name="color-scheme" content="light dark">]]: بيقول للمتصفح إن الصفحة عندها ثيم داكن، فالـ scrollbar والـ inputs بتتلون صح من أول لحظة، قبل ما الـ CSS يتحمّل.
- الـ Open Graph في الـ head (السطور اللي بتبدأ بـ [[og:]]) بيتشرحوا في «بورتفوليو ٣»، ومعاهم [[canonical]].
- [[<a class="skip" href="#main">]]: أول حاجة بيوصلها الـ Tab. بيبقى مستخبي فوق الشاشة ويظهر أول ما يتعمله فوكس، ويودّي على [[<main id="main">]] على طول. في المعمل: Tab ثم Enter، والـ Tab اللي بعدها راح لـ «شوف الشغل» (أول لينك جوه main) مش للـ nav.
- [[<nav aria-label="الأقسام" data-i18n-label="navLabel">]]: اسم الـ nav لقارئ الشاشة، وبيتترجم هو كمان من [[data-i18n-label]].
- [[<section aria-labelledby="work-h">]]: كل section اسمه هو العنوان بتاعه، فقارئ الشاشة بيقول «مشاريع مختارة، region».
- [[<ul class="cards" role="list">]]: Safari بيشيل role القايمة لما تعمل [[list-style: none]]، فبنرجّعها صريحة (سلوك WebKit موثّق، متجرّبش هنا: المعمل Chrome بس).
- [[<a href="mailto:..." dir="ltr">]]: الإيميل نص إنجليزي، فبيتعرض LTR عشان [[@]] و [[.]] ميتلخبطوش.
- [[<p class="sr-status" role="status" id="status">]]: مكان فاضي موجود من الأول، وزرار «انسخ الإيميل» بيكتب فيه «الإيميل اتنسخ»، فقارئ الشاشة بيقولها (لازم يبقى موجود قبل ما النص يتحط، وده بيتشرح في «داشبورد ٣»).
- [[<script src="js/reveal.js" type="module">]]: ده بس اللي module (مش مهم يشتغل قبل الرسم).

### الـ tokens

~~~css portfolio/css/tokens.css
/* every colour, size and curve the site uses lives here; the rest of the CSS only reads var(--x) */
:root {
  color-scheme: light dark;
  --paper: #f7f5f0;
  --surface: #ffffff;
  --ink: #1c2230;
  --muted: #535b6b;
  --line: #dcd8cf;
  --accent: #0d6b63;
  --accent-ink: #ffffff;
  --accent-soft: #dcefec;
  --warm: #9c4f12;
  --font: system-ui, "Segoe UI", "Noto Sans Arabic", Tahoma, sans-serif;
  --step-0: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.1rem + 0.6vw, 1.6rem);
  --step-3: clamp(2rem, 1.4rem + 3vw, 3.6rem);
  --gutter: clamp(16px, 4vw, 48px);
  --r: 14px;
  --r-sm: 8px;
  --shadow: 0 1px 2px rgb(20 24 33 / 0.06), 0 8px 24px rgb(20 24 33 / 0.08);
  --ease: cubic-bezier(0.22, 0.7, 0.2, 1);
  --z-header: 10;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper: #12161f; --surface: #1a202b; --ink: #e9ecf2; --muted: #a6aebd; --line: #2c3442;
    --accent: #5fcfc3; --accent-ink: #0b1513; --accent-soft: #173834; --warm: #f0a868;
    --shadow: 0 1px 2px rgb(0 0 0 / 0.4), 0 8px 24px rgb(0 0 0 / 0.35);
  }
}
:root[data-theme="dark"] {
  --paper: #12161f; --surface: #1a202b; --ink: #e9ecf2; --muted: #a6aebd; --line: #2c3442;
  --accent: #5fcfc3; --accent-ink: #0b1513; --accent-soft: #173834; --warm: #f0a868;
  --shadow: 0 1px 2px rgb(0 0 0 / 0.4), 0 8px 24px rgb(0 0 0 / 0.35);
}
~~~

- [[--step-0]] و [[--step-1]] و [[--step-3]]: أحجام الخط بـ [[clamp(أقل, مفضّل, أكبر)]]: النص بيكبر مع الشاشة بين حدين من غير ولا media query (درس «clamp()»). القيمة المفضلة [[rem + vw]] عشان الـ zoom لسه يأثر (لو [[vw]] لوحدها الـ zoom مبيكبّرش الخط، وده بيوقع WCAG 1.4.4، من الوثائق).
- [[--gutter: clamp(16px, 4vw, 48px)]]: المسافة الجانبية، 16 على الموبايل و 48 على الشاشة الكبيرة.
- [[--shadow]] طبقتين: ظل صغير حاد (الحافة) وظل كبير ناعم (العمق). طبقة واحدة بتبان «مرسومة».
- [[--ease: cubic-bezier(0.22, 0.7, 0.2, 1)]]: منحنى واحد لكل الحركة في الموقع، بيبدأ سريع ويهدى.
- الداكن مكتوب مرتين: مرة جوه [[@media (prefers-color-scheme: dark)]] على [[:root:not([data-theme="light"])]] (الجهاز داكن واليوزر مختارش فاتح)، ومرة على [[:root[data-theme="dark"]]] (اليوزر اختار داكن بزرار). كده الثلاث حالات شغالة: نظام، واختيار فاتح، واختيار داكن.

### قبل الرسم

~~~javascript portfolio/js/boot.js
// runs in <head> before the first paint: language and theme from last visit, so the page never flips after it shows
try {
  const lang = localStorage.getItem("lang");
  if (lang === "en") { document.documentElement.lang = "en"; document.documentElement.dir = "ltr"; }
  const theme = localStorage.getItem("theme");
  if (theme) document.documentElement.dataset.theme = theme;
} catch {}
document.documentElement.classList.add("js");
~~~

- [[try { ... } catch {}]]: [[localStorage]] ممكن **يرمي** error (Safari في وضع الخصوصية القديم، أو لما الكوكيز ممنوعة للموقع؛ من الوثائق): من غير try السطر اللي بعده مش هيشتغل والصفحة تفضل من غير class [[js]].
- [[catch {}]] من غير متغير: بنتجاهل الخطأ عن قصد (الصفحة تفتح بالعربي، وده افتراضي سليم).
- [[classList.add("js")]] بره الـ try: لازم يتحط دايمًا لو الـ JS شغال.

### الـ dictionary والزرار

~~~javascript portfolio/js/i18n.js
// dictionary + switch: every [data-i18n] gets its text from the current language, and <html> gets lang and dir
const dict = {
  en: {
    tHome: "Nadine Fouad | Front-end developer", tCase: "Tide Notes case study | Nadine Fouad", tCv: "CV | Nadine Fouad",
    skip: "Skip to content", name: "Nadine Fouad", navLabel: "Sections", navWork: "Work", navAbout: "About", navContact: "Contact", navCv: "CV",
    role: "Front-end developer", heroTitle: "I build fast websites anyone can use.",
    heroLead: "6 years writing HTML, CSS and JavaScript for Arabic and English sites, with a focus on performance and accessibility.",
    ctaWork: "See the work", ctaContact: "Get in touch", workTitle: "Selected projects", filterBy: "Filter by type",
    fAll: "All", fWeb: "Websites", fA11y: "Accessibility", fApi: "API", fDesign: "Design",
    p1: "Tide Notes: notes without internet", p1d: "A notes app that works offline and syncs when the connection is back.",
    p2: "Bus departures board", p2d: "A station screen that refreshes every 30 seconds, readable from 5 metres.",
    p3: "Clinic booking form", p3d: "7 steps became 3, and errors are announced to screen readers.",
    p4: "Recipes API", p4d: "Search by ingredient, pagination, and a 60-second cache.",
    p5: "Design tokens library", p5d: "Colours, spacing and type for 3 sites from one file.",
    aboutTitle: "About", aboutText: "I started with sites for small shops, and now I work with product teams on interfaces thousands of people use every day. I like code you can read, and pages that open in under a second.",
    f1t: "Years of experience", f2t: "Projects shipped", f3t: "Lighthouse a11y",
    contactTitle: "Work together?", contactText: "Send me the idea and the deadline, and I'll reply within two working days.",
    copy: "Copy email", copied: "Email copied", rights: "All rights reserved",
    caseKind: "Case study · 2025", caseTitle: "Tide Notes: notes that work without internet",
    mRole: "My role", mRoleV: "The whole front end and offline", mTime: "Duration", mTimeV: "10 weeks", mStack: "Stack",
    cProblem: "The problem", cProblemT: "The sales team writes visit notes in places with weak signal, so a note is lost if the page closes before it is sent.",
    cDecisions: "Decisions", d1: "Every note is saved to IndexedDB first, and sent in the background.",
    d2: "A Service Worker caches the page itself, so it opens offline.", d3: "A clear mark on each note: sent or not yet.",
    cResults: "Results", rCap: "Before and after (3-week average)", rMetric: "Metric", rBefore: "Before", rAfter: "After",
    r1: "Page open time on 3G", r2: "Notes lost per week", back: "Back to projects",
    print: "Print or save PDF", exp: "Experience", skills: "Skills",
    j1: "Senior front-end developer · Trips platform company", j1a: "Cut search page LCP on mobile from 3.2 to 1.4 seconds.", j1b: "Built a shared component library for 3 teams.",
    j2: "Front-end developer · Small design agency", j2a: "25 sites for shops and clinics, all in Arabic and English.", j2b: "Ran the agency's first accessibility audit; it became a step in every delivery.",
  },
};
const ar = {};                                   // Arabic is what the HTML already says: read it once, so it isn't written twice
document.querySelectorAll("[data-i18n]").forEach(el => (ar[el.dataset.i18n] = el.textContent));
document.querySelectorAll("[data-i18n-label]").forEach(el => (ar[el.dataset.i18nLabel] = el.getAttribute("aria-label")));
ar.copied = "الإيميل اتنسخ";
dict.ar = ar;

function t(key) { return dict[document.documentElement.lang]?.[key] ?? ar[key] ?? key; }

function apply(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-label]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nLabel)));
  const btn = document.getElementById("lang");
  if (btn) { btn.textContent = lang === "ar" ? "English" : "عربي"; btn.lang = lang === "ar" ? "en" : "ar"; }
  try { localStorage.setItem("lang", lang); } catch {}
}

if (document.documentElement.lang === "en") apply("en");   // boot.js set it from the last visit; now fill the texts
document.getElementById("lang")?.addEventListener("click", () => apply(document.documentElement.lang === "ar" ? "en" : "ar"));

const copy = document.getElementById("copy");
copy?.addEventListener("click", async () => {
  const status = document.getElementById("status");
  try { await navigator.clipboard.writeText("hello@nadine.example"); status.textContent = t("copied"); }
  catch { status.textContent = "hello@nadine.example"; }
});
~~~

- [[dict.en]]: كل الكلام الإنجليزي للتلات صفحات في مكان واحد. العربي مش مكتوب هنا أصلًا.
- [[document.querySelectorAll("[data-i18n]").forEach(el => (ar[el.dataset.i18n] = el.textContent))]]: بيقرا العربي من الصفحة **قبل** أي تبديل ويحفظه، فلما ترجع للعربي يرجع نفس الكلام. [[el.dataset.i18n]] هو قيمة [[data-i18n]] ([[dataset]] بيحوّل [[data-i18n-label]] لـ [[i18nLabel]]).
- [[t(key)]]: الكلمة بلغة الصفحة دلوقتي، ولو مش موجودة العربي، ولو مش موجود المفتاح نفسه (فتشوف [[p6]] على الصفحة بدل فراغ، وده بيبيّن الناقص).
- [[apply(lang)]]: [[html.lang]] و [[html.dir]]، وكل النصوص، وكل الـ [[aria-label]]، ونص الزرار و [[lang]] بتاعه، والحفظ.
- [[if (document.documentElement.lang === "en") apply("en")]]: [[boot.js]] غيّر [[lang]] قبل الرسم، فهنا بنحط الكلام الإنجليزي.
- [[navigator.clipboard.writeText]]: بيشتغل على [[https]] و [[localhost]] و [[127.0.0.1]] بس، ولو اتمنع ([[catch]]) بنكتب الإيميل نفسه في الـ status عشان يتنسخ بإيدك.

### اتشغّل فعلًا

~~~text node check-portfolio.mjs (أول ٣ سطور، Chrome 156)
lang before: ar | rtl | بابني مواقع سريعة، وأي حد يقدر يستخدمها.
lang after:  en | ltr | I build fast websites anyone can use. | Nadine Fouad | Front-end developer | brand x = 48
after reload: en I build fast websites anyone can use.
~~~

[[brand x = 48]]: الاسم بقى على الشمال (48 = الـ gutter على 1280) من غير ولا قاعدة CSS للإنجليزي، لأن [[.brand]] عليه [[margin-inline-end: auto]] (بيزق الباقي لآخر السطر في الاتجاهين).

~~~javascript keys.mjs: كل مفتاح في الصفحات موجود في dict.en؟
// every data-i18n key in the pages must exist in dict.en
import fs from "node:fs";
const src = fs.readFileSync("js/i18n.js", "utf8");
const en = new Set([...src.slice(src.indexOf("en: {"), src.indexOf("},\n};")).matchAll(/(\w+): "/g)].map(m => m[1]));
let bad = 0;
for (const f of ["index.html", "work/tide-notes.html", "cv.html"]) {
  const keys = [...fs.readFileSync(f, "utf8").matchAll(/data-i18n(?:-label)?="([^"]+)"/g)].map(m => m[1]);
  const missing = [...new Set(keys)].filter(k => !en.has(k));
  bad += missing.length;
  console.log(f.padEnd(22), keys.length, "keys, missing in en:", missing.join(", ") || "none");
}
process.exitCode = bad ? 1 : 0;
~~~

~~~text
index.html             39 keys, missing in en: none
work/tide-notes.html   28 keys, missing in en: none
cv.html                14 keys, missing in en: none
~~~

---

## الغلطات اللي حصلت في الخطوة دي

### ١. الصفحة بتتنطط بالإنجليزي: CLS 0.1402

أول نسخة كان آخرها [[<script src="js/i18n.js" type="module">]]. قست بـ [[PerformanceObserver]] على [[layout-shift]]، ومعاه [[MutationObserver]] بيسجّل إمتى [[dir]] اتغيّر، على موبايل 390 و CPU أبطأ ٤ مرات واللغة المحفوظة إنجليزي:

~~~text
B2: boot.js in place, English saved CLS 0.1402 FCP 2364 dir changed at 2468 ... shift sources: SECTION,DIV,NAV,UL
~~~

يعني: أول رسمة (FCP) حصلت عند 2364ms، والـ module اشتغل عند 2468ms وحط الكلام الإنجليزي، فالأقسام اتحركت (السطور الإنجليزي أقصر من العربي). [[boot.js]] كان عامل شغله (الاتجاه اتقلب قبل الرسم)، بس الكلام نفسه اتبدّل بعده. الـ module بيتأجل لحد ما الـ HTML كله يتقري، والمتصفح مش ملزم يستنّاه قبل ما يرسم.

التصليح: [[<script src="js/i18n.js">]] عادي في آخر الـ body (ومن غير [[export]]، لأن الـ classic script مبيفهمش [[export]]). والقياس بالسكربت ده، ٣ مرات والوسط، لأن أول تشغيل لـ Chrome دايمًا أبطأ:

~~~javascript rep.mjs
// median of 3 runs: CLS, FCP, LCP for Arabic and for saved English
import { chromium } from "playwright-core";
const browser = await chromium.launch({ channel: "chrome" });
const url = process.argv[2] || "http://127.0.0.1:5501/";
for (const lang of ["ar", "en"]) {
  const runs = [];
  for (let i = 0; i < 3; i++) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await (await ctx.newCDPSession(page)).send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.addInitScript(l => {
      if (l === "en") localStorage.setItem("lang", "en");
      window.__cls = 0;
      new PerformanceObserver(x => x.getEntries().forEach(e => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver(x => { window.__fcp = x.getEntries()[0].startTime; }).observe({ type: "paint", buffered: true });
      new PerformanceObserver(x => { window.__lcp = x.getEntries().at(-1).startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
    }, lang);
    await page.goto(url); await page.waitForTimeout(1500);
    runs.push(await page.evaluate(() => [window.__cls, window.__fcp, window.__lcp]));
    await ctx.close();
  }
  const med = k => runs.map(r => r[k]).sort((a, b) => a - b)[1];
  console.log(lang, "CLS", med(0).toFixed(4), "FCP", Math.round(med(1)), "LCP", Math.round(med(2)), "(median of 3)");
}
await browser.close();
~~~

- [[Emulation.setCPUThrottlingRate]] بـ [[rate: 4]]: أمر DevTools Protocol بيخلي الـ CPU أبطأ ٤ مرات (زي موبايل متوسط). نفس الاختيار اللي في تاب Performance.
- [[addInitScript]]: بيشتغل في الصفحة قبل أي سكربت بتاعها، فالـ observers بيلحقوا أول shift. و [[buffered: true]] بيجيب اللي حصل قبل ما الـ observer يتعمل.
- [[hadRecentInput]]: الـ shift اللي بيحصل بعد ضغطة بنص ثانية مبيتحسبش (اليوزر هو اللي عمله).
- [[sort]] و [[[1]]]: الوسط من ٣ (مش المتوسط)، عشان قياس واحد شاذ ميغيّرش النتيجة.

~~~text node rep.mjs (الوسط بتاع ٣ مرات)
ar CLS 0.0000 FCP 376 LCP 376 (median of 3)
en CLS 0.0000 FCP 272 LCP 272 (median of 3)
~~~

> ده مش ضمان ١٠٠٪: لو ملف [[i18n.js]] اتأخر في الشبكة، المتصفح ممكن يرسم العربي الأول. الحل المضمون صفحتين ثابتين لكل لغة (المشروع الكبير في آخر الوحدة). وفي المعمل الأول كان فيه نسخة «من غير boot.js» خالص: اللغة المحفوظة **اتجاهلت** لأن [[i18n.js]] بيسأل [[lang]] اللي [[boot.js]] هو اللي بيحطها. الاتنين محتاجين بعض.

### ٢. «40+» بقت «+40»

في لقطة الصفحة على 1280 كارت «مشروع اتسلّم» كان مكتوب فيه [[+40]]. قست مكان الحرف بـ [[Range.getBoundingClientRect]]:

~~~text
<dd>40+</dd>          + on the left: reads +40
<span dir="ltr">40+</span> + on the right: reads 40+
~~~

نفس الحاجة بتحصل في «٥٠٪+» و «C++» و «.NET» و «(2025)» في آخر سطر عربي. أي كلمة أو رقم إنجليزي فيها علامة في الطرف: حطه في [[dir="ltr"]] (أو [[<bdi>]] لو المحتوى جاي من المستخدم ومتعرفش اتجاهه).

### ٣. اسم التاب فضل عربي

أول نسخة كانت بتبدّل كل الكلام ما عدا [[<title>]]، فالتاب واللي بيعمل bookmark بيشوف العربي. التصليح [[data-i18n="tHome"]] على [[<title>]] نفسه (من غير كود زيادة)، ومفتاح لكل صفحة ([[tHome]] و [[tCase]] و [[tCv]]).

---

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| الاتجاه | [[lang]] و [[dir]] على [[<html>]] بس، والـ CSS كله logical |
| الترجمة | [[data-i18n]] على النص و [[data-i18n-label]] على [[aria-label]]، والعربي من الصفحة نفسها |
| قبل الرسم | [[boot.js]] classic في الـ head، و [[i18n.js]] classic في آخر الـ body |
| إنجليزي جوه عربي | [[dir="ltr"]] على الحتة نفسها، و [[lang="en"]] على الكلمة الإنجليزي |
| الفحص | [[keys.mjs]]: كل مفتاح موجود، و [[rep.mjs]]: CLS بالإنجليزي صفر |`,
          sol: R`بعد الزرار [[document.documentElement.dir]] بيبقى [[ltr]] و [[document.title]] بيبقى [[Nadine Fouad | Front-end developer]]، والـ refresh بيفضل إنجليزي. ولما تحوّل [[i18n.js]] لـ module، [[rep.mjs]] بيطلّع CLS للإنجليزي فوق الصفر (في المعمل 0.1402 في قياس واحد)، ولما ترجّعه classic بيرجع [[en CLS 0.0000]]. لو الرقم عندك طلع صفر حتى مع الـ module، زوّد [[setCPUThrottlingRate]] لـ 6: الفرق بيبان أكتر على جهاز أبطأ.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** في صفحة [[dir="rtl"]]، الكلمات دي هتتعرض إزاي؟ [[<p>السعر 250+</p>]]، و [[<p>اتعلمت C++</p>]]، و [[<p>الإصدار (v2)</p>]]. اكتب توقّعك وبعدين افتحهم.`,
              done: R`اتوقعت إن الـ [[+]] في الأول والتاني بيروح على الشمال من الرقم أو الكلمة، والقوس في التالت بيتلخبط، وشفت ده فعلًا، وصلّحت التلاتة بـ [[<span dir="ltr">]] حوالين الحتة الإنجليزي بس.`,
            },
            {
              lvl: R`سريع`,
              t: R`**دوّر بنفسك:** من صفحة [[<bdi>]] على MDN اعرف الفرق بينه وبين [[<span dir="ltr">]]، وإمتى كل واحد أنسب. جاوب بمثال من الـ dashboard: اسم عضو ممكن يبقى عربي أو إنجليزي.`,
              done: R`كتبت إن [[<bdi>]] بيحدد اتجاهه من محتواه (زي [[dir="auto"]]) فمناسب للنص اللي مش عارف اتجاهه زي أسماء الأعضاء، و [[dir="ltr"]] لما انت متأكد إنه إنجليزي (إيميل، رقم بعلامة).`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**صلّح الكود البايظ:** النسخة دي من الـ header بتتكسر بالإنجليزي: [[.brand { margin-right: auto }]] و [[.skip { left: 1rem }]] و [[.lang { margin-left: 0.5rem }]]. اعرف بتتكسر إزاي من غير ما تشغّل، وبعدين صلّحها بـ logical properties.`,
              done: R`عرفت إن [[margin-right: auto]] في LTR بيزق الاسم لليمين (عكس المطلوب)، وإن الـ skip link بيظهر على الشمال في العربي، وبدّلتهم بـ [[margin-inline-end]] و [[inset-inline-start]] و [[margin-inline-start]]، و [[brand x]] في الإنجليزي بقى 48 تاني.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** زوّد لغة تالتة (فرنساوي مثلًا، [[dir="ltr"]]) في [[dict]]، وخلي الزرار [[<select>]] بـ label بدل زرار تبديل، وكل اختيار مكتوب بلغته هو ([[lang]] على كل [[<option>]]).`,
              done: R`الـ select بيقلب الصفحة للغات التلاتة، و [[keys.mjs]] (بعد ما تخليه يفحص [[fr]] كمان) بيقول [[none]]، والـ refresh بيفتكر الاختيار، و axe صفر في التلات لغات.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**مسألة:** اكتب [[missingKeys(html, dict)]] بترجّع لكل لغة في [[dict]] المفاتيح اللي في الـ HTML ومش فيها، والمفاتيح اللي فيها ومش مستخدمة، وتخرج بـ 1 لو فيه ناقص. (شكل فحص الـ ci في الدرس.)`,
              done: R`على صفحة فيها ٥ مفاتيح وقاموس ناقصه [[contactText]] وزيادة فيه [[oldKey]] بتطبع [[missing in en: contactText]] و [[unused in en: oldKey]] وتخرج بـ 1، ولما تزوّد المفتاح بتخرج بـ 0.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** قيس CLS بالإنجليزي بتلات طرق لتحميل [[i18n.js]]: classic في آخر الـ body، و [[defer]] في الـ head، و [[type="module"]]، كل واحدة ٥ مرات على 390 و CPU أبطأ ٦ مرات. اكتب الوسط لكل طريقة وليه.`,
              done: R`عندك جدول ٣ صفوف بالوسط، والـ classic صفر، وكتبت إن [[defer]] و module بيتأجلوا لبعد ما الـ HTML يتقري فممكن يترسم قبلهم، وإن الفرق بيكبر كل ما الـ CPU أبطأ.`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`const html = '<title data-i18n="tHome">x</title><a data-i18n="skip">x</a><nav data-i18n-label="navLabel"></nav><h1 data-i18n="heroTitle">x</h1><p data-i18n="contactText">x</p>';
const en = { tHome: "Nadine Fouad", skip: "Skip to content", navLabel: "Sections", heroTitle: "I build fast websites", oldKey: "not used" };
const keys = [...html.matchAll(/data-i18n(?:-label)?="([^"]+)"/g)].map(m => m[1]);
const missing = keys.filter(k => !(k in en));
const unused = Object.keys(en).filter(k => !keys.includes(k));
console.log("keys in page: " + keys.length);
console.log("missing in en: " + (missing.join(", ") || "none"));
console.log("unused in en: " + (unused.join(", ") || "none"));
process.exitCode = missing.length ? 1 : 0;`,
              code: 1,
              expect: [
                R`keys in page: 5`,
                R`missing in en: contactText`,
                R`unused in en: oldKey`,
              ],
            },
          ],
        },
        {
          cmd: R`بورتفوليو ٢: الكروت والفلتر والظهور بالسكرول`,
          title: R`شبكة كروت بتتظبط لوحدها، وفلتر بـ :has() من غير ولا سطر JS، وكارت كله لينك، وظهور بالسكرول بيحترم reduced motion وبيشتغل من غير JS ومش بيأخر الـ LCP`,
          learn: R`تبني الـ CSS كله للصفحة: header زجاجي sticky، وأزرار بمتغيرات، و grid بـ [[auto-fill]] و [[minmax(min(100%, …))]]، وفلتر بـ radios و [[:has()]]، وكارت كله قابل للضغط من غير ما تلف الكارت في [[<a>]]، وظهور بالسكرول بـ IntersectionObserver بيتلغي مع reduced motion ومن غير JS.`,
          out: R`[[site.css]] و [[reveal.js]]: كل فلتر بيعرض عدد الكروت الصح (5 و 3 و 2 و 1 و 1)، والكروت بتظهر بالسكرول، ومن غير JS أو مع reduced motion كلها ظاهرة من الأول، و LCP مش متأخر.`,
          use: {
            prog: R`درس «:has()» ودرس «auto-fit و minmax» ودرس «motion» في حتة واحدة، ومعاهم سؤال «إمتى الـ CSS لوحده كفاية وإمتى محتاج JS»: الفلتر CSS بس، والظهور محتاج JS بس الصفحة لازم تشتغل من غيره.`,
            work: R`كروت بفلتر موجودة في كل portfolio ومتجر وصفحة خدمات. والحركة بالسكرول أكتر حاجة بتتطلب في التصميم وأكتر حاجة بتبوّظ الأداء والـ accessibility لو اتعملت غلط: هنا اتقاس إنها ممكن تأخر الـ LCP من 380 لـ 1200ms.`,
            cs: R`progressive enhancement: المحتوى والوظيفة الأساسية من HTML و CSS، والـ JS طبقة زيادة. و [[:has()]] أول «parent selector» في CSS: القاعدة بتتطبق على عنصر حسب حالة عنصر جواه.`,
          },
          desc: R`الخطوة التانية في الـ portfolio: **الـ CSS كله** للصفحة الرئيسية (اللي بيتشارك مع الصفحتين التانيين)، و [[reveal.js]].

**الفلتر من غير JS:** ٥ radios في [[<fieldset>]] (الكل، ومواقع، وسهولة الوصول، و API، وتصميم)، وكل كارت عليه [[data-tags="web a11y"]]. القاعدة: [[.work:has(input[value="web"]:checked) .card:not([data-tags~="web"])]] بتخفي أي كارت مش فيه الكلمة. [[~=]] معناها «من ضمن الكلمات المفصولة بمسافات»، فـ [[web]] متطابقش [[webgl]]. والـ radios عادية، فالأسهم بتتنقل بينهم والفلتر بيتغير (اتجرّب: ArrowLeft على «الكل» في صفحة RTL راح لـ «مواقع» و 3 كروت).

**الكارت كله لينك:** [[.card h3 a::after { content: ""; position: absolute; inset: 0 }]] بيمد مساحة اللينك على الكارت كله، واللينك نفسه لسه جوه العنوان، فقارئ الشاشة بيقرا اسم المشروع بس مش الكارت كله، والـ Tab بيقف عليه مرة واحدة.

**الظهور بالسكرول:** الكروت بتبدأ [[opacity: 0]] **بس لو** على [[<html>]] class [[js]] (من [[boot.js]])، و IntersectionObserver بيزوّد [[.in]] أول ما الكارت يدخل الشاشة ويبطّل يراقبه. مع [[prefers-reduced-motion: reduce]] السكربت بيظهّرهم كلهم على طول والـ CSS بيلغي الـ transition. **والغلطة اللي اتقاست:** لما حطيت [[data-reveal]] على الـ hero نفسه، الـ LCP بقى **1200ms بدل 380** (الوسط بتاع ٣)، لأن Chrome مبيحسبش عنصر [[opacity: 0]] كـ «اترسم».

**الشبكة:** [[repeat(auto-fill, minmax(min(100%, 17rem), 1fr))]]. من غير [[min(100%, …)]]، كارت [[22rem]] على موبايل 360 عمل scroll أفقي: [[scrollWidth 368 / 360]].`,
          example: R`.cards { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr)); }
.filters label:has(input:checked) { background: var(--accent-soft); border-color: var(--accent); }
.work:has(input[value="web"]:checked) .card:not([data-tags~="web"]) { display: none; }
.card h3 a::after { content: ""; position: absolute; inset: 0; border-radius: var(--r); }
.js [data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity 0.6s var(--ease) var(--d, 0s), transform 0.6s var(--ease) var(--d, 0s); }
@media (prefers-reduced-motion: reduce) { .js [data-reveal] { opacity: 1; transform: none; transition: none; } }`,
          lines: [
            R`الشبكة: [[auto-fill]] = «حط أعمدة على قد ما يكفي»، وكل عمود أقله [[17rem]] وأكتره [[1fr]] (جزء متساوي من الباقي). و [[min(100%, 17rem)]] بيخلي الحد الأدنى عرض الشاشة لو هي أصغر من 17rem، فمفيش scroll أفقي على أي موبايل.`,
            R`الـ label اللي جواه radio متختار بيتلوّن: [[:has(input:checked)]] بيختار الأب حسب حالة الابن. من غير [[:has()]] كنت محتاج الـ input يبقى **قبل** الـ label ([[input:checked + label]]) أو JS.`,
            R`الفلتر نفسه: لو جوه [[.work]] فيه radio قيمته [[web]] ومتختار، اخفي أي [[.card]] الـ [[data-tags]] بتاعه مفيهوش [[web]] ككلمة كاملة ([[~=]]). سطر زيه لكل فلتر، و «الكل» ملوش سطر فبيعرض كله.`,
            R`الكارت كله بيتضغط: عنصر وهمي فاضي فوق الكارت كله ([[inset: 0]] = top و right و bottom و left صفر) جوه اللينك، فالضغطة في أي حتة بتروح للينك. الكارت لازم عليه [[position: relative]] عشان الوهمي يتقاس عليه.`,
            R`الحالة الأولى للظهور: شفاف ونازل 16px، و [[transition]] بتأخير [[--d]] (السكربت بيحط 0 و 80 و 160ms عشان الكروت تظهر ورا بعض). مربوطة بـ [[.js]] فلو JS مشتغلش الكروت ظاهرة عادي.`,
            R`لو اليوزر مختار «قلّل الحركة» في النظام: الكروت ظاهرة من الأول ومن غير transition. [[transform]] و [[opacity]] بس اللي بيتحركوا، والاتنين مبيعملوش layout فمبيعملوش CLS.`,
          ],
          try: R`حط [[site.css]] و [[reveal.js]] من الشرح، وافتح الصفحة وجرّب كل فلتر بالماوس وبعدين بالكيبورد (Tab لحد الفلتر، وبعدين الأسهم). بعدين من DevTools: Rendering ← [[prefers-reduced-motion: reduce]] واعمل refresh، وبعدين Settings ← Debugger ← Disable JavaScript واعمل refresh. وفي الآخر حط [[data-reveal]] على [[<section class="hero">]] وقيس بـ [[node rep.mjs]].`,
          flag: R`script`,
          deep: {
            why: R`الفلتر بـ JS معناه state وlisteners وحالة «لسه بيحمّل»، وكل ده عشان تخفي كروت موجودة أصلًا في الصفحة. [[:has()]] بيعملها بسطر لكل فلتر، والـ radios بتدّيك الكيبورد والـ semantics ببلاش. والظهور بالسكرول حلو لما يتعمل صح، ووحش جدًا لما يخبّي المحتوى لو JS وقع، أو يحرّك حد عنده دوخة من الحركة، أو يأخر أكبر عنصر في الصفحة فجوجل يحسب الصفحة بطيئة.`,
            how: R`[[:has()]] بيتقيّم من جوه لبرة: المتصفح بيلاقي [[.work]] اللي جواه [[input[value="web"]:checked]]، وبعدين بيطبّق على أي [[.card]] جواه مش متطابق مع [[[data-tags~="web"]]]. [[display: none]] بيشيل الكارت من الشبكة كلها، فـ [[auto-fill]] بيرتب الباقي من غير فراغات. والـ IntersectionObserver بيبلّغك لما عنصر يدخل أو يخرج من الشاشة من غير ما تسمع لـ scroll خالص (مفيش شغل مع كل حركة)، و [[rootMargin: "0px 0px -10% 0px"]] بيعتبر الشاشة أقصر بـ 10% من تحت فالكارت بيظهر لما يطلع شوية مش أول بكسل. و [[unobserve]] بعد أول ظهور عشان ميتراقبش تاني. والـ LCP: Chrome بيسجّل أكبر عنصر **اترسم فعلًا**، والعنصر الشفاف مش محسوب، فلما يبقى ظاهر بعد الـ transition بيتسجّل وقتها.`,
            when: R`[[:has()]] لأي حالة الأب بيتغير فيها حسب ابنه: كارت فيه checkbox متعلّم، وفورم فيه حقل غلط ([[form:has(:invalid)]])، وlayout فيه sidebar ولا لأ. مدعوم في كل المتصفحات من ديسمبر ٢٠٢٣ (درس «Baseline و @supports»). والظهور بالسكرول للحاجات اللي **تحت** أول شاشة بس، ومش للمحتوى اللي اليوزر جاي عشانه. ولو الفلتر هيبقى بحث بالكلام أو ترتيب، ده محتاج JS (زي جدول الـ dashboard).`,
            mistakes: R`تحط [[data-reveal]] على الـ hero (اتقاس: LCP 380 ← 1200ms). تخبّي بـ [[opacity: 0]] من غير [[.js]] فالصفحة فاضية لو الـ JS وقع أو اتمنع. تنسى reduced motion. تستخدم [[minmax(22rem, 1fr)]] من غير [[min(100%, …)]] (اتقاس: 368 على 360). تلف الكارت كله في [[<a>]] فقارئ الشاشة بيقرا الكارت كله كاسم لينك واحد طويل. تعمل الفلتر بـ [[[data-tags*="web"]]] ([[*=]] = جزء من النص) فـ [[webgl]] يعدّي. تحط [[display: none]] على الـ radio نفسه للتصميم فيضيع من الكيبورد وقارئ الشاشة.`,
          },
          teach: R`## الخطوة ٢: الـ CSS كله

~~~css portfolio/css/site.css
/* ---------- base ---------- */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-padding-top: 5rem; -webkit-text-size-adjust: 100%; }
body { margin: 0; font: var(--step-0)/1.7 var(--font); color: var(--ink); background: var(--paper); }
:lang(en) body, body:lang(en) { line-height: 1.6; }
h1, h2, h3 { line-height: 1.25; text-wrap: balance; }
p { text-wrap: pretty; }
a { color: var(--accent); text-underline-offset: 0.2em; }
img, svg { max-width: 100%; height: auto; }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
main > section { padding: clamp(48px, 8vw, 96px) var(--gutter); max-width: 72rem; margin-inline: auto; }

.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; padding: 0.5rem 1rem; background: var(--ink); color: var(--paper); z-index: 100; }
.skip:focus { top: 1rem; }
.sr-status { min-height: 1.7em; color: var(--muted); }

/* ---------- header: sticky glass ---------- */
.top {
  position: sticky; top: 0; z-index: var(--z-header);
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1.25rem;
  padding: 0.75rem var(--gutter);
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: blur(10px);
  border-block-end: 1px solid var(--line);
}
.brand { font-weight: 700; color: var(--ink); text-decoration: none; margin-inline-end: auto; }
.top nav { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; }
.top nav a { color: var(--ink); text-decoration: none; padding-block: 0.5rem; }
.top nav a:hover { color: var(--accent); }
.lang { font: inherit; padding: 0.4rem 0.9rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--ink); cursor: pointer; min-height: 44px; }

/* ---------- hero ---------- */
.hero { padding-block-start: clamp(56px, 12vw, 140px); }
.eyebrow { color: var(--warm); font-weight: 600; margin: 0; }
.hero h1 { font-size: var(--step-3); margin: 0.25em 0 0.4em; max-width: 18ch; }
:lang(en) .hero h1 { letter-spacing: -0.02em; }
.lead { font-size: var(--step-1); color: var(--muted); max-width: 46ch; margin: 0; }
.actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-block-start: 2rem; }
.btn {
  --bg: var(--accent); --fg: var(--accent-ink);
  display: inline-flex; align-items: center; min-height: 44px; padding: 0.5rem 1.25rem;
  border: 2px solid var(--bg); border-radius: 999px; background: var(--bg); color: var(--fg);
  font: inherit; font-weight: 600; text-decoration: none; cursor: pointer;
}
.btn.ghost { --bg: transparent; --fg: var(--accent); border-color: var(--accent); }

/* ---------- work: cards + :has() filter ---------- */
.filters { display: flex; flex-wrap: wrap; gap: 0.5rem; border: 0; padding: 0; margin: 0 0 1.5rem; }
.filters legend { width: 100%; margin-block-end: 0.5rem; color: var(--muted); }
.filters label {
  display: inline-flex; align-items: center; gap: 0.4rem; min-height: 44px; padding: 0.25rem 0.9rem;
  border: 1px solid var(--line); border-radius: 999px; background: var(--surface); cursor: pointer;
}
.filters input { accent-color: var(--accent); }
.filters label:has(input:checked) { background: var(--accent-soft); border-color: var(--accent); font-weight: 600; }
.filters label:has(input:focus-visible) { outline: 3px solid var(--accent); outline-offset: 2px; }

.cards { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr)); }
.card { position: relative; display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 1rem; box-shadow: var(--shadow); }
.card h3 { font-size: var(--step-1); margin: 0.75rem 0 0.25rem; }
.card h3 a { color: var(--ink); }
.card h3 a::after { content: ""; position: absolute; inset: 0; border-radius: var(--r); }
.card:has(a:hover) { border-color: var(--accent); }
.card p { margin: 0 0 0.75rem; color: var(--muted); }
.thumb { aspect-ratio: 16 / 9; border-radius: var(--r-sm); background: linear-gradient(135deg, var(--a, #0d6b63), var(--b, #9c4f12)); }
.t1 { --a: #0d6b63; --b: #4aa79d; view-transition-name: tide-thumb; }
.t2 { --a: #2f4b7c; --b: #6b8fd1; }
.t3 { --a: #7a3e65; --b: #c97fa9; }
.t4 { --a: #6b5b1d; --b: #c2a64a; }
.t5 { --a: #3c3c3c; --b: #9a9a9a; }
.tags { list-style: none; padding: 0; margin: auto 0 0; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tags li { font-size: 0.85rem; padding: 0.1rem 0.6rem; border-radius: 999px; background: var(--paper); border: 1px solid var(--line); direction: ltr; }

.work:has(input[value="web"]:checked) .card:not([data-tags~="web"]),
.work:has(input[value="a11y"]:checked) .card:not([data-tags~="a11y"]),
.work:has(input[value="api"]:checked) .card:not([data-tags~="api"]),
.work:has(input[value="design"]:checked) .card:not([data-tags~="design"]) { display: none; }

/* ---------- scroll reveal (only when JS runs) ---------- */
.js [data-reveal] { opacity: 0; transform: translateY(16px); transition: opacity 0.6s var(--ease) var(--d, 0s), transform 0.6s var(--ease) var(--d, 0s); }
.js [data-reveal].in { opacity: 1; transform: none; }

/* ---------- about + contact ---------- */
.about p, .contact p { max-width: 60ch; }
.facts { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr)); gap: 1rem; margin: 2rem 0 0; }
.facts div { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 1rem; }
.facts dt { color: var(--muted); }
.facts dd { margin: 0; font-size: var(--step-3); font-weight: 700; font-variant-numeric: tabular-nums; }
.contact p:has(.btn) { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.foot { padding: 2rem var(--gutter); border-block-start: 1px solid var(--line); color: var(--muted); text-align: center; }

/* ---------- page to page: View Transitions (Chrome/Edge 126+, Safari 18.2+; others just navigate) ---------- */
@view-transition { navigation: auto; }
::view-transition-group(tide-thumb) { animation-duration: 0.35s; animation-timing-function: var(--ease); }

/* ---------- reduced motion: no reveal, no page animation ---------- */
@media (prefers-reduced-motion: reduce) {
  .js [data-reveal] { opacity: 1; transform: none; transition: none; }
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}

/* ---------- print: any page prints as plain document ---------- */
@media print {
  .top, .skip, .actions, .filters, .lang, #copy, .foot, .thumb { display: none !important; }
  body { background: #fff; color: #000; font-size: 11pt; }
  main > section { padding: 0 0 12pt; max-width: none; }
  .card { box-shadow: none; break-inside: avoid; }
  .js [data-reveal] { opacity: 1; transform: none; }
  a[href^="http"]::after, a[href^="mailto:"]::after { content: " (" attr(href) ")"; font-size: 0.85em; color: #333; }
}
~~~

### فك الأجزاء

**الأساس:**
- [[scroll-padding-top: 5rem]] على [[html]]: لما تدوس على [[#work]] الصفحة بتنزل للقسم بس بتسيب 5rem فوقه، عشان الـ header الـ sticky ميغطيش العنوان.
- [[:lang(en) body, body:lang(en)]]: الإنجليزي بيحتاج line-height أقل من العربي (الحروف العربي فيها نقط وتشكيل فوق وتحت). [[:lang()]] بيقرا [[lang]] من أقرب أب.
- [[text-wrap: balance]] للعناوين (السطور بأطوال قريبة من بعض) و [[pretty]] للفقرات (مفيش كلمة لوحدها في آخر سطر). درس «text-wrap».
- [[:focus-visible]] بدل [[:focus]]: الإطار بيظهر بالكيبورد بس، مش لما تضغط بالماوس.

**الـ header الزجاجي:**
- [[position: sticky; top: 0]] و [[z-index: var(--z-header)]]: بيفضل فوق وانت بتنزل، والطبقة من token مش رقم عشوائي.
- [[color-mix(in srgb, var(--paper) 82%, transparent)]]: لون الخلفية بشفافية 18% من الـ token نفسه، فبيشتغل في الثيمين من غير لون تاني.
- [[backdrop-filter: blur(10px)]]: اللي تحت الـ header بيبان مغبّش.
- [[flex-wrap: wrap]] و [[margin-inline-end: auto]] على الاسم: على 360 الـ nav بينزل سطر لوحده بدل ما يخرج بره الشاشة.

**الأزرار:**
- [[--bg]] و [[--fg]] على [[.btn]]، و [[.btn.ghost]] بيغيّر المتغيرين بس. ده نمط «variant بمتغير»: بتغيّر متغير مش خصائص.
- [[min-height: 44px]]: أقل مساحة ضغط مريحة (WCAG 2.5.8 بيطلب 24 كحد أدنى، و 44 هي التوصية الأقوى).

**الكروت:**
- [[.thumb]] بـ [[aspect-ratio: 16 / 9]]: المكان محجوز قبل أي صورة، فمفيش CLS. والصور هنا gradients (مفيش صور حقيقية للمشاريع المتخيلة) بلونين من [[--a]] و [[--b]] لكل كارت.
- [[.t1 { view-transition-name: tide-thumb }]]: الاسم ده نفسه موجود على صورة صفحة دراسة الحالة، فالمتصفح بيحرّك الصورة من الكارت لمكانها في الصفحة التانية («بورتفوليو ٣»).
- [[.tags li { direction: ltr }]]: الكلمات الإنجليزي جوه الـ chips زي «CSS Grid».
- [[margin: auto 0 0]] على [[.tags]]: الـ tags بتنزل لآخر الكارت حتى لو الوصف قصير، فكل الكروت في الصف آخرها في نفس الخط.

**الطباعة** في آخر الملف (لكل الصفحات): بتخفي الـ header والأزرار والفلتر والصور، وبتكتب الرابط جنب كل لينك خارجي ([[a[href^="http"]::after]]). اتشرحت في «بورتفوليو ٣» مع الـ CV.

### الظهور بالسكرول

~~~javascript portfolio/js/reveal.js
// cards fade in once when they reach the screen; nothing hides without JS (the .js class), and nothing moves with reduced motion
const items = document.querySelectorAll("[data-reveal]");
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (still || !("IntersectionObserver" in window)) {
  items.forEach(el => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }, { rootMargin: "0px 0px -10% 0px" });
  items.forEach((el, i) => { el.style.setProperty("--d", (i % 3) * 80 + "ms"); io.observe(el); });
}
~~~

- [[matchMedia("(prefers-reduced-motion: reduce)").matches]]: نفس الـ media query بتاعة CSS من JS، [[true]] لو اليوزر مختار «قلّل الحركة».
- [[!("IntersectionObserver" in window)]]: متصفح قديم: ظهّر كله بدل ما يفضل مستخبي.
- [[e.isIntersecting]]: العنصر دخل الشاشة (ولو جزء). و [[io.unobserve(e.target)]]: خلاص ظهر، متراقبوش تاني.
- [[(i % 3) * 80 + "ms"]]: الكروت اللي في نفس الصف (لحد ٣) بتتأخر 0 و 80 و 160ms، فبتظهر ورا بعض.

### اتشغّل فعلًا

~~~text node check-portfolio.mjs (Chrome 156، 1280×800)
filter all    visible cards: 5
filter web    visible cards: 3
filter a11y   visible cards: 2
filter api    visible cards: 1
filter design visible cards: 1
card opacity at load: 0 0 0 0 0
after scroll: 1 1 1 1 1
reduced motion at load: 1/0s 1/0s 1/0s 1/0s 1/0s
no JS: 1 1 1 1 1
~~~

- [[0 0 0 0 0]]: الكروت كلها تحت أول شاشة (الـ hero طويل)، فلسه مظهرتش.
- [[1/0s]]: opacity 1 و transition صفر مع reduced motion (اتعمل بـ [[browser.newContext({ reducedMotion: "reduce" })]]).
- [[no JS: 1 ...]]: [[javaScriptEnabled: false]]، فمفيش class [[js]]، فمفيش إخفاء أصلًا.

والكيبورد (من [[kb-port.mjs]] في الدرس الأخير):

~~~text
ArrowLeft on «الكل» → radio:web | visible cards: 3
Tab from the group → Tide Notes: ملاح
~~~

في صفحة RTL السهم الشمال بيروح للاختيار **اللي بعده** (الترتيب من اليمين). وبعد المجموعة، الـ Tab راح للكارت الوحيد اللي فيه لينك، مش لكل radio (المجموعة وقفة واحدة في الـ Tab).

---

## الغلطات اللي حصلت في الخطوة دي

### ١. الـ hero بيظهر بالسكرول: LCP من 380 لـ 1200ms

كان شكلها حلو إن العنوان «يطلع» أول ما الصفحة تفتح، فحطيت [[data-reveal]] على [[<section class="hero">]]:

~~~text node rep.mjs (390، CPU ×4، الوسط بتاع ٣)
قبل:  ar CLS 0.0000 FCP 380 LCP 380
بعد:  ar CLS 0.0000 FCP 484 LCP 1200
~~~

الـ FCP (أول حاجة اترسمت) لسه بدري، بس الـ LCP (أكبر حاجة) بقى بعد الـ transition. وده الرقم اللي جوجل بيحسبه. التصليح: الـ hero من غير [[data-reveal]]، والحركة للحاجات اللي تحت بس.

### ٢. scroll أفقي على 360 من [[minmax]]

جرّبت أكبّر الكروت لـ [[22rem]] (352px) عشان تبان أعرض:

~~~text
D: minmax(22rem, 1fr) at 360          scrollWidth 368 / 360
D fixed: minmax(min(100%, 22rem)) 360 scrollWidth 360 / 360
~~~

المساحة المتاحة على 360 = 360 ناقص 16 من كل ناحية = 328، والعمود مش قادر يبقى أقل من 352. [[min(100%, 22rem)]] بيقول «22rem أو العرض كله، اللي أصغر».

### ٣. ليه [[~=]] مش [[*=]]

[[[data-tags*="web"]]] بيطابق أي نص **فيه** [[web]]: لو زوّدت tag اسمه [[webgl]] الكارت هيظهر في «مواقع» غلط. [[~=]] بيطابق كلمة كاملة من ضمن كلمات مفصولة بمسافات. (اتجرّب في Console: [[document.querySelectorAll('[data-tags~="web"]').length]] بيرجّع 3، وده نفس عدد «مواقع» في الجدول فوق.)

---

## الخلاصة

| الفكرة | السطر |
|---|---|
| شبكة من غير media queries ومن غير overflow | [[repeat(auto-fill, minmax(min(100%, 17rem), 1fr))]] |
| حالة الأب من ابنه | [[label:has(input:checked)]] |
| فلتر من غير JS | [[.work:has(input[value="x"]:checked) .card:not([data-tags~="x"])]] |
| كارت كله بيتضغط واسمه قصير | [[h3 a::after { position: absolute; inset: 0 }]] |
| ظهور بالسكرول بأمان | [[.js]] + IntersectionObserver + [[unobserve]] + reduced motion، ومش على الـ hero |`,
          sol: R`الفلتر بيعرض 5 و 3 و 2 و 1 و 1، والأسهم بتغيّر الفلتر، و Tab بيعدّي المجموعة كلها مرة واحدة. مع reduced motion الكروت ظاهرة من غير حركة، ومن غير JS ظاهرة كلها. ومع [[data-reveal]] على الـ hero، [[rep.mjs]] بيطلّع LCP أعلى بكتير من FCP (في المعمل 1200 مقابل 484)؛ امسحه يرجع LCP = FCP.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** كارت عليه [[data-tags="webgl design"]] وانت اخترت «مواقع» ([[web]]). هيظهر مع [[~=]]؟ ومع [[*=]]؟ ومع [[|=]]؟ اكتب الإجابة وبعدين جرّب في Console بـ [[querySelectorAll]].`,
              done: R`[[~=]] لأ (مفيش كلمة [[web]] كاملة)، و [[*=]] أيوه (النص فيه [[web]])، و [[|=]] لأ ([[|=]] = القيمة كلها [[web]] أو بتبدأ بـ [[web-]])، والأرقام في Console مطابقة.`,
            },
            {
              lvl: R`سريع`,
              t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه [[.js [data-reveal]]] أحسن من [[[data-reveal]]] لوحده، بمثال حصل فعلًا في الدرس.`,
              done: R`الشرح بيقول إن الإخفاء بيحصل بس لو JS اشتغل (class [[js]] من [[boot.js]])، وإن من غيرها الكروت هتفضل [[opacity: 0]] للأبد لو السكربت وقع، والدليل سطر [[no JS: 1 1 1 1 1]].`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** اعمل رسالة «مفيش مشاريع من النوع ده» بـ CSS بس: [[<p class="empty">]] مستخبية، وبتظهر لما يبقى الفلتر المختار مفيش كارت عليه. اكتبها بقاعدة واحدة لكل فلتر الأول، وبعدين حاول تكتبها عامة.`,
              done: R`زوّدت فلتر «موبايل» من غير كروت، والرسالة بتظهر معاه بس، وكاتب القاعدة بـ [[.work:has(input[value="mobile"]:checked):not(:has(.card[data-tags~="mobile"])) .empty]]، وعارف ليه القاعدة العامة لكل القيم مستحيلة في CSS (مفيش متغير بيمسك قيمة الـ radio).`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**صلّح الكود البايظ:** النسخة دي من الفلتر مش شغالة بالكيبورد: [[.filters input { display: none }]] و [[.filters label { cursor: pointer }]]. الماوس شغال. اعرف ليه وصلّحها من غير ما الدواير ترجع تبان لو مش عايزها.`,
              done: R`عرفت إن [[display: none]] بيشيل الـ input من الـ Tab ومن قارئ الشاشة، وبدّلته بإخفاء بصري ([[position: absolute; opacity: 0; width: 1px; height: 1px]] أو clip)، والفوكس بيبان على الـ label بـ [[label:has(input:focus-visible)]]، والأسهم رجعت شغالة.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**مسألة:** اكتب سكربت Node بياخد الـ HTML ويطلّع قواعد [[:has()]] لكل فلتر لوحده، ويطبع الـ tags اللي على كروت ومالهاش فلتر، والفلاتر اللي مفيش عليها كارت. (شكل فحص الـ ci في الدرس.)`,
              done: R`على صفحة فيها فلاتر [[web]] و [[api]] و [[mobile]] وكروت [[web a11y]] و [[api]]، السكربت بيطبع ٣ قواعد، و [[tags without a filter: a11y]]، و [[filters without a card: mobile]].`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** اعمل نفس الفلتر بـ JS (listener على [[change]] بيحط [[hidden]] على الكروت) وقارنه بنسخة [[:has()]]: عدد السطور، والوقت من الضغطة لحد ما الكروت تتغير (Performance ← Interactions، أو [[PerformanceObserver]] على [[event]])، وإيه اللي بيحصل من غير JS.`,
              done: R`عندك جدول فيه السطور والوقت للنسختين، والفرق في الوقت صغير على ٥ كروت، والفرق الحقيقي إن نسخة [[:has()]] شغالة من غير JS ومن غير state.`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`const html = '<input type="radio" name="f" value="all"><input type="radio" name="f" value="web"><input type="radio" name="f" value="api"><input type="radio" name="f" value="mobile"><li class="card" data-tags="web a11y"></li><li class="card" data-tags="api"></li>';
const filters = [...html.matchAll(/name="f" value="([^"]+)"/g)].map(m => m[1]).filter(v => v !== "all");
const tags = new Set([...html.matchAll(/data-tags="([^"]+)"/g)].flatMap(m => m[1].split(" ")));
const css = filters.map(f => '.work:has(input[value="' + f + '"]:checked) .card:not([data-tags~="' + f + '"])').join(",\n") + " { display: none; }";
console.log(css);
console.log("tags without a filter: " + ([...tags].filter(t => !filters.includes(t)).join(", ") || "none"));
console.log("filters without a card: " + (filters.filter(f => !tags.has(f)).join(", ") || "none"));`,
              expect: [
                R`.work:has(input[value="web"]:checked) .card:not([data-tags~="web"]),`,
                R`.work:has(input[value="mobile"]:checked) .card:not([data-tags~="mobile"]) { display: none; }`,
                R`tags without a filter: a11y`,
                R`filters without a card: mobile`,
              ],
            },
          ],
        },
        {
          cmd: R`بورتفوليو ٣: دراسة الحالة والطباعة و OG`,
          title: R`صفحة دراسة حالة بانتقال View Transition من الكارت، و CV بيتطبع صفحة A4 واحدة بـ @media print و @page، وصورة مشاركة 1200×630 بيعملها Chrome، و Open Graph صح`,
          learn: R`تكمّل الـ portfolio: صفحة دراسة حالة (المشكلة والقرارات والنتيجة بجدول)، وانتقال بين الصفحتين بـ [[@view-transition]] و [[view-transition-name]] بيتلغي مع reduced motion، و CV شكله سليم على الشاشة وبيطلع صفحة واحدة على الورق، وصورة [[og.png]] من HTML، و meta tags بتخلي اللينك يبان بكارت لما يتبعت.`,
          out: R`[[work/tide-notes.html]] و [[case.css]] و [[cv.html]] و [[cv.css]] و [[print.js]] و [[make-og.mjs]]: [[pagereveal]] بيقول إن فيه انتقال، والـ CV = صفحة PDF واحدة من غير header، و [[og.png]] مقاسه 1200×630.`,
          use: {
            prog: R`دروس «View Transitions» و «@media print» و «meta و Open Graph» في منتج واحد. ودراسة الحالة نفسها تمرين كتابة: المشكلة بأرقام، والقرار بسببه، والنتيجة بجدول قبل وبعد.`,
            work: R`اللي بيوظّف بيفتح مشروع واحد بس غالبًا، فصفحة دراسة الحالة هي اللي بتقنعه. والـ CV بيتطلب PDF في كل تقديم، والأحسن إنه يطلع من نفس الصفحة بدل ملف Word بيتنسي يتحدّث. واللينك اللي بيتبعت في واتساب أو LinkedIn من غير صورة وعنوان صح بيتعدّى.`,
            cs: R`الـ paged media: الورق ليه صفحات ومقاس وهوامش، والـ CSS عنده قواعد للتقطيع ([[break-inside]] و [[break-after]]). والـ View Transitions بتاخد لقطة للصفحة القديمة والجديدة وتحرّك بينهم بـ pseudo-elements، يعني الحركة مش بتأثر على الـ DOM نفسه.`,
          },
          desc: R`آخر خطوة في الـ portfolio: ٣ حاجات بتتعمل مرة وبتفرق كتير.

**صفحة دراسة الحالة** ([[work/tide-notes.html]]): نفس الـ header والـ tokens، وعمود واحد للقراية ([[max-width: 46rem]])، ومعلومات المشروع في [[<dl>]]، وجدول قبل وبعد بـ [[<caption>]] و [[scope]]. وصورة المشروع عليها نفس [[view-transition-name: tide-thumb]] اللي على الكارت في الرئيسية، و [[@view-transition { navigation: auto; }]] في الصفحتين، فلما تدوس على الكارت المتصفح **بيحرّك الصورة** من مكانها في الكارت لمكانها فوق في الصفحة الجديدة. ده لينك عادي، مفيش JS. اتقاس بحدث [[pagereveal]]: [[view transition on the case page: yes]]. ومع reduced motion القواعد بتلغي الحركة ([[animation: none]]).

**الـ CV** ([[cv.html]]): بيتقري كويس على الشاشة، وجواه [[@page { size: A4; margin: 14mm 16mm; }]] و [[@media print]] بيخفي الـ header والأزرار، ويمنع وظيفة تتقطع بين صفحتين ([[break-inside: avoid]])، وعنوان يفضل لوحده آخر الصفحة ([[break-after: avoid]]). اتقاس بـ [[page.pdf()]]: **صفحة واحدة**. ومن غير CSS الطباعة: **صفحتين** والـ header ظاهر.

**المشاركة:** [[og:title]] و [[og:description]] و [[og:image]] (رابط **كامل** بـ [[https://]]) و [[og:image:width/height/alt]] و [[twitter:card = summary_large_image]]، و [[<link rel="canonical">]]. والصورة نفسها HTML بيتصوّر بـ Chrome على 1200×630 بالظبط.`,
          example: R`@view-transition { navigation: auto; }
.t1 { view-transition-name: tide-thumb; }
@page { size: A4; margin: 14mm 16mm; }
.job { break-inside: avoid; }
a[href^="http"]::after, a[href^="mailto:"]::after { content: " (" attr(href) ")"; }
<meta property="og:image" content="https://nadine.example/img/og.png">`,
          lines: [
            R`في الصفحتين: أي تنقّل عادي بين صفحات نفس الموقع (same-origin) يعمل انتقال. من غيرها في الاتنين مفيش انتقال خالص. المتصفح اللي مش بيدعمها بيتجاهل السطر ويتنقل عادي (Chrome و Edge 126+ و Safari 18.2+، من الوثائق).`,
            R`نفس الاسم على صورة الكارت في الرئيسية وعلى صورة الـ hero في دراسة الحالة: المتصفح بيعتبرهم «نفس العنصر» ويحرّكه من مكان ومقاس لمكان ومقاس. الاسم لازم يبقى مش متكرر في نفس الصفحة، وإلا الانتقال كله بيتلغي.`,
            R`مقاس الورق والهوامش للطباعة وللـ PDF. [[preferCSSPageSize: true]] في [[page.pdf()]] بيحترمها، وزرار «حفظ كـ PDF» في Chrome كمان.`,
            R`وظيفة كاملة (العنوان والسنين والنقط) ميتقطعش نصها في آخر صفحة ونصها في اللي بعدها: بتنزل كلها للصفحة الجاية.`,
            R`على الورق مفيش ضغط، فبنكتب الرابط نفسه جنب أي لينك خارجي أو إيميل: [[attr(href)]] بيجيب قيمة الـ attribute كنص. في الـ CV اتلغت للينكات اللي نصها هو الرابط أصلًا.`,
            R`صورة المشاركة برابط كامل: [[og:image]] لازم URL مطلق (البروتوكول OG بيقول كده، والمواقع اللي بتقرا الكارت مش بتحل المسار النسبي، من الوثائق)، ومعاه العرض والطول والـ alt.`,
          ],
          try: R`حط الملفات من الشرح، وافتح الرئيسية ودوس على كارت Tide Notes وشوف الصورة بتتحرك. اعمل نفس الحاجة مع Rendering ← [[prefers-reduced-motion: reduce]]. بعدين افتح [[cv.html]] واضغط Ctrl+P وشوف عدد الصفحات، وامسح [[@media print]] من [[cv.css]] و [[site.css]] وشوف تاني. وفي الآخر شغّل [[node make-og.mjs]] وافتح [[portfolio/img/og.png]].`,
          flag: R`script`,
          deep: {
            why: R`الانتقال بين الصفحات كان محتاج SPA (router وJS كتير) عشان يحصل؛ دلوقتي بسطرين CSS على موقع ملفات ثابتة. والـ CV اللي بيطلع من نفس الصفحة بيفضل محدّث، والـ PDF بتاعه صفحة واحدة لو اتظبط، وصفحتين ونص بالـ header والأزرار لو اتساب. واللينك من غير OG بيظهر كرابط أزرق بس في أغلب التطبيقات.`,
            how: R`View Transitions بين صفحتين: لما الرابط يتداس، المتصفح بياخد لقطة لكل عنصر عليه [[view-transition-name]] في الصفحة القديمة، ويحمّل الجديدة، ويدوّر على نفس الأسامي فيها، ويعمل شجرة pseudo-elements ([[::view-transition-group(tide-thumb)]] وجواها [[old]] و [[new]]) بتتحرك من المكان والمقاس القديم للجديد، وكل حاجة تانية بتعمل crossfade. والـ DOM الحقيقي للصفحة الجديدة موجود من الأول، فمفيش تأخير في التفاعل. والطباعة: [[@media print]] بيتطبق وقت الطباعة بس، و [[@page]] بيحدد صندوق الصفحة، والمتصفح بيقطّع المحتوى في صفحات ويحترم [[break-*]] لو يقدر. و OG: لما اللينك يتبعت، السيرفر بتاع التطبيق بيجيب الـ HTML ويقرا الـ meta (من غير JS غالبًا)، فلازم تكون مكتوبة في الـ HTML نفسه، وبيجيب الصورة من الرابط الكامل.`,
            when: R`View Transition لموقع صفحات ثابتة فيه عنصر بيتكرر بين صفحتين (صورة منتج، أو كارت، أو عنوان)، ومش لكل حاجة (الحركة الكتير بتتعب). [[@media print]] لأي صفحة حد ممكن يطبعها: CV، وفاتورة، وتذكرة، ووصفة، وتقرير. و OG لأي صفحة ممكن تتبعت، ولكل صفحة قيمها (دراسة الحالة [[og:type = article]]). كل جزء ليه درس: «View Transitions»، و «@media print»، و «meta و Open Graph».`,
            mistakes: R`تحط نفس [[view-transition-name]] على كذا كارت في نفس الصفحة (الانتقال بيتلغي). تنسى [[@view-transition]] في الصفحة الجديدة. تنسى reduced motion. تطبع من غير [[@media print]] (اتقاس: صفحتين والـ header ظاهر). تكتب الرابط جنب كل لينك حتى اللي نصه رابط فيتكرر (اتقاس: [[" (mailto:hello@nadine.example)"]] اتكتب بعد الإيميل). تحط [[og:image]] مسار نسبي، أو صورة أصغر من 1200×630، أو تحط الـ meta بـ JS. تنسى [[canonical]] فنسختين من نفس الصفحة (بـ [[?ref=]] مثلًا) بيتحسبوا صفحتين.`,
          },
          teach: R`## الخطوة ٣: دراسة الحالة

~~~html portfolio/work/tide-notes.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n="tCase">دراسة حالة Tide Notes | نادين فؤاد</title>
  <meta name="description" content="إزاي تطبيق ملاحظات بقى يشتغل من غير نت: المشكلة، والقرارات، والأرقام.">
  <link rel="canonical" href="https://nadine.example/work/tide-notes.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="دراسة حالة: Tide Notes">
  <meta property="og:description" content="تطبيق ملاحظات بيشتغل offline: من ٤٫١ ثانية لـ ٠٫٩ ثانية.">
  <meta property="og:url" content="https://nadine.example/work/tide-notes.html">
  <meta property="og:image" content="https://nadine.example/img/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="اسم نادين فؤاد ووظيفتها على خلفية فاتحة">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="../img/icon.svg" type="image/svg+xml">
  <script src="../js/boot.js"></script>
  <link rel="stylesheet" href="../css/tokens.css">
  <link rel="stylesheet" href="../css/site.css">
  <link rel="stylesheet" href="../css/case.css">
</head>
<body>
  <a class="skip" href="#main" data-i18n="skip">اتخطّى للمحتوى</a>
  <header class="top">
    <a class="brand" href="../" data-i18n="name">نادين فؤاد</a>
    <nav aria-label="الأقسام" data-i18n-label="navLabel">
      <a href="../#work" data-i18n="navWork">الشغل</a>
      <a href="../#contact" data-i18n="navContact">تواصل</a>
    </nav>
    <button class="lang" type="button" id="lang" lang="en">English</button>
  </header>

  <main id="main">
    <article class="case">
      <header class="case-head">
        <p class="eyebrow" data-i18n="caseKind">دراسة حالة · ٢٠٢٥</p>
        <h1 data-i18n="caseTitle">Tide Notes: ملاحظات بتشتغل من غير نت</h1>
        <div class="thumb t1" aria-hidden="true"></div>
      </header>
      <dl class="meta">
        <div><dt data-i18n="mRole">دوري</dt><dd data-i18n="mRoleV">الواجهة كلها والـ offline</dd></div>
        <div><dt data-i18n="mTime">المدة</dt><dd data-i18n="mTimeV">١٠ أسابيع</dd></div>
        <div><dt data-i18n="mStack">الأدوات</dt><dd dir="ltr">HTML · CSS · Service Worker · IndexedDB</dd></div>
      </dl>
      <h2 data-i18n="cProblem">المشكلة</h2>
      <p data-i18n="cProblemT">فريق المبيعات بيكتب ملاحظات الزيارات في مواقع النت فيها ضعيف، فالملاحظة بتضيع لو الصفحة اتقفلت قبل ما تتبعت.</p>
      <h2 data-i18n="cDecisions">القرارات</h2>
      <ol>
        <li data-i18n="d1">كل ملاحظة بتتحفظ في IndexedDB الأول، والإرسال في الخلفية.</li>
        <li data-i18n="d2">Service Worker بيخزّن الصفحة نفسها، فبتفتح من غير نت.</li>
        <li data-i18n="d3">علامة واضحة على كل ملاحظة: اتبعتت ولا لسه.</li>
      </ol>
      <h2 data-i18n="cResults">النتيجة</h2>
      <table class="results">
        <caption data-i18n="rCap">قبل وبعد (متوسط ٣ أسابيع)</caption>
        <thead><tr><th scope="col" data-i18n="rMetric">المقياس</th><th scope="col" data-i18n="rBefore">قبل</th><th scope="col" data-i18n="rAfter">بعد</th></tr></thead>
        <tbody>
          <tr><th scope="row" data-i18n="r1">وقت فتح الصفحة على 3G</th><td dir="ltr">4.1 s</td><td dir="ltr">0.9 s</td></tr>
          <tr><th scope="row" data-i18n="r2">ملاحظات ضاعت في الأسبوع</th><td>23</td><td>0</td></tr>
        </tbody>
      </table>
      <p><a href="../#work" data-i18n="back">ارجع للمشاريع</a></p>
    </article>
  </main>
  <footer class="foot"><p><span data-i18n="rights">كل الحقوق محفوظة</span> © 2026</p></footer>
  <script src="../js/i18n.js"></script>
</body>
</html>
~~~

- كل المسارات بـ [[../]]: الصفحة في فولدر [[work/]]. ده مهم في النشر (الدرس الأخير): مسارات تبدأ بـ [[/]] بتقع لو الموقع على [[/repo-name/]].
- [[og:type = article]] و [[og:url]] و [[canonical]] بتاعة الصفحة دي هي، مش الرئيسية.
- [[<dl class="meta">]]: «دوري، المدة، الأدوات» أزواج اسم وقيمة، وده بالظبط معنى [[<dl>]] (description list). وكل زوج جوه [[<div>]] (مسموح في HTML) عشان الـ grid يرتّبهم.
- [[<table class="results">]] بـ [[<caption>]] (اسم الجدول لقارئ الشاشة) و [[scope="col"]] و [[scope="row"]]: «4.1 s» بتتقري «وقت فتح الصفحة على 3G، قبل، 4.1 s».
- [[<td dir="ltr">4.1 s</td>]]: رقم ووحدة إنجليزي.

~~~css portfolio/css/case.css
/* case study page: one readable column, the same thumbnail as the card (it morphs between the pages) */
.case { max-width: 46rem; margin-inline: auto; padding: clamp(32px, 6vw, 72px) var(--gutter); }
.case-head h1 { font-size: var(--step-3); margin: 0.2em 0 0.6em; }
.case-head .thumb { margin-block-end: 2rem; }
.meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); gap: 1rem; margin: 0 0 2rem; }
.meta dt { color: var(--muted); font-size: 0.9rem; }
.meta dd { margin: 0; font-weight: 600; }
.results { width: 100%; border-collapse: collapse; margin-block: 1rem 2rem; }
.results caption { text-align: start; color: var(--muted); padding-block-end: 0.5rem; }
.results th, .results td { padding: 0.6rem; border-block-end: 1px solid var(--line); text-align: start; }
.results td { font-variant-numeric: tabular-nums; }
~~~

### الانتقال

القاعدتين في [[site.css]] (الدرس اللي فات):

~~~css
@view-transition { navigation: auto; }
::view-transition-group(tide-thumb) { animation-duration: 0.35s; animation-timing-function: var(--ease); }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
~~~

والقياس: [[pagereveal]] حدث بيحصل أول ما الصفحة الجديدة بتظهر، و [[e.viewTransition]] بيبقى object لو فيه انتقال و [[null]] لو مفيش:

~~~javascript من check-portfolio.mjs
await page.addInitScript(() => addEventListener("pagereveal", e => { window.__vt = e.viewTransition ? "yes" : "no"; }));
await page.goto(B);
await page.click('a[href="work/tide-notes.html"]');
await page.waitForLoadState("load");
console.log("view transition on the case page:", await page.evaluate(() => window.__vt));
~~~

~~~text اتشغّل فعلًا
view transition on the case page: yes
with reduced motion: transition object = yes (the CSS sets animation: none)
~~~

مع reduced motion الانتقال لسه «بيحصل» كـ object (المتصفح بيبدّل اللقطات)، بس من غير حركة: التبديل لحظي. لو عايز تلغيه خالص حط [[@view-transition { navigation: auto; }]] نفسها جوه [[@media (prefers-reduced-motion: no-preference)]]: اتجرّب، و [[__vt]] بقى [[no]] مع reduced motion.

~~~text vt.mjs: نفس الضغطة بـ ٣ نسخ
shipped                              vt: yes
same name on 5 cards                 vt: no | error: Unexpected duplicate view-transition-name: card
rule inside no-preference, reduced   vt: no
~~~

---

## الـ CV

~~~html portfolio/cv.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n="tCv">السيرة الذاتية | نادين فؤاد</title>
  <meta name="description" content="السيرة الذاتية لنادين فؤاد، مطوّرة واجهات. الصفحة دي بتتطبع A4 في صفحة واحدة.">
  <link rel="canonical" href="https://nadine.example/cv.html">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="img/icon.svg" type="image/svg+xml">
  <script src="js/boot.js"></script>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/site.css">
  <link rel="stylesheet" href="css/cv.css">
</head>
<body>
  <a class="skip" href="#main" data-i18n="skip">اتخطّى للمحتوى</a>
  <header class="top">
    <a class="brand" href="./" data-i18n="name">نادين فؤاد</a>
    <button class="btn" type="button" id="print" data-i18n="print">اطبع أو احفظ PDF</button>
    <button class="lang" type="button" id="lang" lang="en">English</button>
  </header>
  <main id="main" class="cv">
    <header class="cv-head">
      <h1 data-i18n="name">نادين فؤاد</h1>
      <p data-i18n="role">مطوّرة واجهات</p>
      <ul class="contact-line" role="list">
        <li><a href="mailto:hello@nadine.example" dir="ltr">hello@nadine.example</a></li>
        <li><a href="https://nadine.example/" dir="ltr">https://nadine.example/</a></li>
      </ul>
    </header>
    <section aria-labelledby="exp-h">
      <h2 id="exp-h" data-i18n="exp">الخبرة</h2>
      <article class="job">
        <h3 data-i18n="j1">مطوّرة واجهات أولى · شركة منصة الرحلات</h3>
        <p class="when" dir="ltr">2023 – 2026</p>
        <ul>
          <li data-i18n="j1a">نزّلت LCP لصفحة البحث من ٣٫٢ لـ ١٫٤ ثانية على الموبايل.</li>
          <li data-i18n="j1b">بنيت مكتبة components مشتركة لـ ٣ فرق.</li>
        </ul>
      </article>
      <article class="job">
        <h3 data-i18n="j2">مطوّرة واجهات · وكالة تصميم صغيرة</h3>
        <p class="when" dir="ltr">2020 – 2023</p>
        <ul>
          <li data-i18n="j2a">٢٥ موقع لمحلات وعيادات، كلها بالعربي والإنجليزي.</li>
          <li data-i18n="j2b">أول فحص accessibility في الوكالة، وبقى خطوة في كل تسليم.</li>
        </ul>
      </article>
    </section>
    <section aria-labelledby="skills-h">
      <h2 id="skills-h" data-i18n="skills">المهارات</h2>
      <ul class="skills" role="list" dir="ltr"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>TypeScript</li><li>React</li><li>Accessibility</li><li>Performance</li></ul>
    </section>
  </main>
  <script src="js/i18n.js"></script>
  <script src="js/print.js" type="module"></script>
</body>
</html>
~~~

~~~css portfolio/css/cv.css
/* CV: readable on screen, and one A4 page on paper */
.cv { max-width: 46rem; margin-inline: auto; padding: clamp(24px, 5vw, 56px) var(--gutter); }
.cv-head h1 { font-size: var(--step-3); margin: 0; }
.cv-head p { margin: 0; color: var(--warm); font-weight: 600; }
.contact-line { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.25rem 1.5rem; }
.job { padding-block: 0.5rem; border-block-end: 1px solid var(--line); }
.job h3 { margin: 0; font-size: var(--step-1); }
.when { margin: 0; color: var(--muted); font-variant-numeric: tabular-nums; text-align: start; }
.skills { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem; }
.skills li { padding: 0.15rem 0.7rem; border: 1px solid var(--line); border-radius: 999px; }
.top .btn { min-height: 40px; }

@page { size: A4; margin: 14mm 16mm; }
@media print {
  #print { display: none !important; }
  .cv { padding: 0; max-width: none; }
  .cv-head h1 { font-size: 22pt; }
  .job { break-inside: avoid; border-color: #bbb; }
  h2 { break-after: avoid; font-size: 13pt; margin-block: 10pt 4pt; }
  .contact-line a::after { content: none !important; }
  .skills li { border-color: #999; }
}
~~~

~~~javascript portfolio/js/print.js
document.getElementById("print")?.addEventListener("click", () => window.print());
~~~

- [[<button id="print">]]: [[window.print()]] بيفتح نافذة الطباعة (ومنها «Save as PDF»). ملف لوحده عشان مفيش [[onclick=""]] في الـ HTML (أسهل في CSP).
- [[@page { size: A4; margin: 14mm 16mm; }]] بره الـ media: بيتطبق وقت الطباعة بس أصلًا.
- [[.cv-head h1 { font-size: 22pt }]]: على الورق [[pt]] هي الوحدة الطبيعية (1pt = 1/72 بوصة)، و [[clamp()]] بالـ [[vw]] ملوش معنى.
- [[h2 { break-after: avoid }]]: عنوان «المهارات» ميفضلش لوحده في آخر صفحة والقايمة في اللي بعدها.
- [[.contact-line a::after { content: none !important; }]]: الإيميل والموقع مكتوبين كنص أصلًا، فمش محتاجين الرابط جنبهم تاني.

~~~javascript print-mistakes.mjs
import { chromium } from "playwright-core";
const B = "http://127.0.0.1:5501/cv.html";
const browser = await chromium.launch({ channel: "chrome" });
const pages = pdf => (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
async function run(name, strip) {
  const page = await browser.newPage();
  if (strip) await page.route(strip.url, async r => { const res = await r.fetch(); r.fulfill({ response: res, body: strip.fn(await res.text()) }); });
  await page.goto(B); await page.emulateMedia({ media: "print" });
  const after = await page.$eval(".contact-line a", a => getComputedStyle(a, "::after").content);
  const top = await page.$eval(".top", e => getComputedStyle(e).display);
  console.log(name.padEnd(40), "pages", pages(await page.pdf({ format: "A4", preferCSSPageSize: true })), "| header", top, "| link ::after", after);
  await page.close();
}
const cut = s => s.replace(/@media print \{[\s\S]*?\n\}\n?/g, "").replace(/@page \{[^}]*\}/, "");
await run("shipped");
await run("no print CSS at all", { url: /\/css\/(site|cv)\.css/, fn: cut });
await run("without content: none on the contact line", { url: /\/css\/cv\.css/, fn: s => s.replace("  .contact-line a::after { content: none !important; }\n", "") });
await browser.close();
~~~

- [[page.emulateMedia({ media: "print" })]]: الصفحة بتتعامل كأنها بتتطبع (زي Rendering ← Emulate CSS media type في DevTools).
- [[page.pdf({ format: "A4", preferCSSPageSize: true })]]: بيطلّع PDF حقيقي (headless بس)، و [[/Type /Page]] بيتعد جواه = عدد الصفحات.
- [[cut]]: بيشيل كل بلوكات [[@media print]] و [[@page]] من الـ CSS قبل ما يوصل للصفحة ([[page.route]])، فبنقيس «من غير CSS طباعة» من غير ما نعدّل الملفات.

~~~text اتشغّل فعلًا
shipped                                  pages 1 | header none | link ::after none
no print CSS at all                      pages 2 | header flex | link ::after none
without content: none on the contact line pages 1 | header none | link ::after " (mailto:hello@nadine.example)"
~~~

والرئيسية نفسها بتتطبع صفحتين (المحتوى أطول)، والـ header مستخبي فيها كمان ([[print index.html pages: 2 header display: none,none]]).

---

## صورة المشاركة

~~~html og.html
<!doctype html>
<html lang="ar" dir="rtl"><meta charset="utf-8">
<style>
  body { margin: 0; width: 1200px; height: 630px; display: grid; place-content: center; gap: 12px;
    font-family: system-ui, "Segoe UI", sans-serif; background: radial-gradient(circle at 80% 20%, #dcefec, #f7f5f0 60%); color: #1c2230; }
  h1 { font-size: 96px; margin: 0; } p { font-size: 44px; margin: 0; color: #0d6b63; }
</style>
<h1>نادين فؤاد</h1><p>مطوّرة واجهات · Front-end developer</p>
</html>
~~~

~~~javascript make-og.mjs
// renders og.html at exactly 1200x630 and saves it as the share image
import { chromium } from "playwright-core";
import { pathToFileURL } from "node:url";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL("og.html").href);
await page.screenshot({ path: "portfolio/img/og.png" });
await browser.close();
console.log("saved portfolio/img/og.png");
~~~

~~~text اتشغّل فعلًا
saved portfolio/img/og.png
127353 bytes 1200x630
~~~

الرقمين اتقروا من الملف نفسه: في PNG العرض والطول مكتوبين في البايتات من 16 لـ 23 ([[readUInt32BE(16)]] و [[readUInt32BE(20)]]). و 1200×630 هو المقاس اللي أغلب التطبيقات بتعرضه كبير (نسبة 1.91:1)، و [[summary_large_image]] بيطلب الشكل الكبير ده. الـ HTML أسهل من برنامج تصميم: لو اسمك أو وظيفتك اتغيرت، تعدّل سطر وتشغّل السكربت.

> الـ meta نفسها اتكتبت في الـ head بتاع الصفحتين (اتشرحت في الدرس الأول من الـ portfolio). اختبار الكارت على تطبيق حقيقي (واتساب أو LinkedIn) محتاج رابط منشور، فده من الوثائق: LinkedIn عنده Post Inspector بيقرا الـ meta ويوريك الكارت.

---

## الخلاصة

| الحاجة | السطر | اتأكدت إزاي |
|---|---|---|
| انتقال بين صفحتين | [[@view-transition]] في الاتنين + نفس [[view-transition-name]] | [[pagereveal]] → [[yes]] |
| من غير حركة | [[::view-transition-*(*) { animation: none }]] مع reduced motion | انتقال من غير حركة |
| A4 صفحة واحدة | [[@page]] + [[break-inside: avoid]] + إخفاء الـ UI | [[page.pdf()]] → 1 |
| الرابط على الورق | [[a[href^="http"]::after]] ما عدا اللي نصه رابط | [[::after]] = none في الـ CV |
| المشاركة | OG برابط كامل + 1200×630 + [[summary_large_image]] | [[og.png]] 1200x630، وفحص الـ ci |`,
          sol: R`الصورة بتتحرك من الكارت لفوق الصفحة الجديدة، ومع reduced motion الصفحة بتتبدّل على طول. الـ CV في Ctrl+P صفحة واحدة من غير header ولا زرار الطباعة، ولما تشيل CSS الطباعة بيبقى صفحتين والـ header ظاهر (زي [[print-mistakes.mjs]]). و [[make-og.mjs]] بيطبع [[saved portfolio/img/og.png]] والصورة 1200×630.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** حطيت [[view-transition-name: card]] على [[.card]] (الكروت الخمسة كلها). إيه اللي هيحصل لما تدوس على Tide Notes؟ جرّب وشوف Console.`,
              done: R`الانتقال اتلغى كله لأن الاسم متكرر ٥ مرات في نفس الصفحة، وشفت في Console [[Unexpected duplicate view-transition-name: card]] (نفس اللي طلع في المعمل)، ورجّعت الاسم على [[.t1]] بس (أو [[view-transition-name: match-element]] لو عايز اسم لكل عنصر لوحده، من الوثائق).`,
            },
            {
              lvl: R`سريع`,
              t: R`**دوّر بنفسك:** من صفحة [[@page]] على MDN طلّع إزاي تحط رقم الصفحة في أسفل كل صفحة ([[@bottom-center]] و [[counter(page)]])، وجرّبه في الـ CV، وقول هل Chrome 156 بيطلعه في [[page.pdf()]].`,
              done: R`عندك القاعدة مكتوبة، وجرّبتها على نسخة الـ CV بمحتوى أطول (صفحتين)، وكتبت اللي طلع فعلًا في الـ PDF (ظهر ولا لأ) من غير ما تفترض.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** فاتورة لمحل متخيل بتتطبع A4: جدول أصناف بـ [[thead { display: table-header-group }]] (العناوين بتتكرر في كل صفحة)، و [[tr { break-inside: avoid }]]، و [[print-color-adjust: exact]] عشان لون الهيدر يتطبع، و ٤٠ صنف عشان تطلع صفحتين.`,
              done: R`[[page.pdf()]] بيطلّع صفحتين، والعناوين في أول كل صفحة، ومفيش صف متقطع، ولون الهيدر ظاهر في الـ PDF، ومن غير [[print-color-adjust]] اللون بيختفي (جرّبته).`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**صلّح الكود البايظ:** الـ meta دي في صفحة مشروع: [[<meta property="og:image" content="img/og.png">]] و [[<meta name="twitter:card" content="summary">]] ومفيش [[og:url]] ولا [[og:image:alt]]. اكتب فحص بيطلّع كل المشاكل، وصلّحها.`,
              done: R`الفحص (شكل الـ ci في الدرس) طلّع ٤ مشاكل: [[og:url]] و [[og:image:alt]] ناقصين، والصورة مش رابط كامل، و [[summary]] بدل [[summary_large_image]]، وبعد التصليح طبع [[ok]] وخرج بـ 0.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**ابني:** خلي [[make-og.mjs]] يعمل صورة لكل صفحة: بيقرا [[og:title]] من كل HTML في [[portfolio/]]، ويحطه في القالب، ويحفظ [[img/og-<اسم الصفحة>.png]]، ويغيّر [[og:image]] في الصفحة نفسها للرابط الجديد.`,
              done: R`تشغيل السكربت بيطلّع ٣ صور 1200×630 (اقرا المقاس من البايتات زي الشرح)، وكل صفحة بتشاور على صورتها، وتشغيله مرتين ورا بعض مبيغيّرش الـ HTML التاني مرة.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** اعمل نفس الانتقال بـ JS (SPA صغير: [[fetch]] للصفحة و [[document.startViewTransition]] و [[history.pushState]]) وقارنه بـ [[@view-transition]]: عدد السطور، وزرار Back، وفتح الرابط في تاب جديد، وإيه اللي بيحصل من غير JS.`,
              done: R`عندك جدول بالأربع حاجات، ونسخة الـ CSS ٣ سطور وزرار Back والتاب الجديد شغالين من غير كود، ونسخة الـ JS محتاجة [[popstate]] عشان Back يشتغل، وكتبت إمتى نسخة الـ JS تستاهل (SPA أصلًا).`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`const html = '<meta property="og:title" content="Tide Notes"><meta property="og:description" content="Offline notes"><meta property="og:image" content="img/og.png"><meta name="twitter:card" content="summary">';
const meta = Object.fromEntries([...html.matchAll(/<meta (?:property|name)="([^"]+)" content="([^"]*)"/g)].map(m => [m[1], m[2]]));
const need = ["og:title", "og:description", "og:url", "og:image", "og:image:alt", "twitter:card"];
const problems = need.filter(k => !meta[k]).map(k => "missing " + k);
if (meta["og:image"] && !/^https:\/\//.test(meta["og:image"])) problems.push("og:image must be an absolute https URL: " + meta["og:image"]);
if (meta["twitter:card"] && meta["twitter:card"] !== "summary_large_image") problems.push("twitter:card is " + meta["twitter:card"] + " (a 1200x630 image wants summary_large_image)");
console.log(problems.join("\n") || "ok");
console.log("problems: " + problems.length);
process.exitCode = problems.length ? 1 : 0;`,
              code: 1,
              expect: [
                R`missing og:url`,
                R`missing og:image:alt`,
                R`og:image must be an absolute https URL: img/og.png`,
                R`twitter:card is summary (a 1200x630 image wants summary_large_image)`,
                R`problems: 4`,
              ],
            },
          ],
        },
        {
          cmd: R`داشبورد ١: الـ shell والـ sidebar والأرقام`,
          title: R`App shell بـ grid-template-areas، و sidebar بيصغر لأيقونات على الكمبيوتر ويبقى drawer على الموبايل بـ inert ورجوع الفوكس، وكروت أرقام فيها sparkline و progress ring بـ SVG من غير مكتبة`,
          learn: R`تبني هيكل أي لوحة تحكم: sidebar و topbar و main بـ grid areas، و sidebar بيتقفل لأيقونات (والأسامي لسه بتتقري) وبيتحول drawer تحت 64rem بـ [[visibility]] و [[inert]] و Esc، وكروت KPI بأرقام [[Intl]] و sparkline بـ [[<polyline>]] و ring بـ [[pathLength="100"]]، ومن غير ما الكروت تتنطط لما الأرقام توصل.`,
          out: R`[[index.html]] و [[boot.js]] و [[shell.js]] و [[kpi.js]] و [[lib.js]] وأول نص [[app.css]]: الـ sidebar بيبقى 76px وأسامي اللينكات لسه موجودة، والـ drawer بيفتح والفوكس جواه و [[main.inert = true]]، و Esc بيرجّع الفوكس لزرار القايمة، والكروت فيها 44 و 73 و 186,400 ج.م. و 78%.`,
          use: {
            prog: R`درس «grid-template-areas» ودرس «sticky و fixed» ودرس «SVG» ودرس «focus-visible» شغالين في نفس الشاشة. والمهم هنا إن نفس الـ markup بيتعرض بـ ٣ أشكال (كمبيوتر مفتوح، وكمبيوتر مقفول، وموبايل) بالـ CSS بس، والـ JS بيغيّر attributes مش styles.`,
            work: R`كل لوحة تحكم (أدمن، و CRM، و SaaS، ولوحة مدرّس) بتبدأ بالهيكل ده. والأسئلة اللي بتيجي: «الـ sidebar مخبّي الجدول على الموبايل»، و «الـ Tab بيروح لينكات مستخبية»، و «الرسم محتاج مكتبة؟». هنا كل واحدة ليها رقم.`,
            cs: R`الـ accessibility tree مختلف عن اللي على الشاشة: لينك أيقونة لازم ليه اسم، والعنصر المستخبي بـ [[transform]] لسه في الـ Tab. و [[inert]] بيشيل جزء كامل من التفاعل والـ tree مرة واحدة. والـ sparkline تحويل خطي من مدى القيم لمدى البكسل (normalization).`,
          },
          desc: R`أول خطوة في الـ dashboard بتاع «صالة الصخرة»: الهيكل والقايمة والكروت.

**الهيكل:** [[.shell]] grid فيه منطقتين في كل صف: [[grid-template-areas: "side top" "side main"]]، والعمود الأول [[var(--side-w)]] (15rem). الـ sidebar [[position: sticky; top: 0; height: 100dvh]] فبيفضل مكانه والصفحة بتتسكرول، والـ topbar sticky وزجاجي.

**القايمة بـ ٣ أشكال:**
• **مفتوحة** (كمبيوتر): أيقونة واسم.
• **مقفولة** (زرار [[aria-expanded]] بيحط [[data-collapsed]]): [[--side-w]] بيبقى 4.75rem (اتقاس 76px)، والأسامي **مستخبية بالشكل بس** (clip-path) فقارئ الشاشة لسه بيقرا «نظرة عامة، الأعضاء، جدول الحصص». والاختيار بيتحفظ و [[boot.js]] بيطبقه قبل الرسم.
• **drawer** تحت 64rem: [[position: fixed]] بره الشاشة بـ [[transform]] و [[visibility: hidden]] (فمش في الـ Tab)، وزرار القايمة بيفتحه، والفوكس بيروح لأول لينك، والـ topbar والـ main بيبقوا [[inert]]، و Esc أو الضغط على الخلفية بيقفل ويرجّع الفوكس لزرار القايمة.

**الفخ اللي اتقاس:** في RTL الـ inline-start يمين، فالـ drawer بيستخبى بـ [[translateX(100%)]] (يمين). لو استخدمت [[-100%]] زي الإنجليزي: الـ drawer المقفول بقى عند **[[-154 / 118]]** يعني فوق الصفحة. [[transform]] مش logical، فبيتعكس بمتغير [[--out]].

**الكروت:** ٤ كروت بـ [[auto-fit]]: أعضاء نشطين، ودخول النهارده ومعاه **sparkline** لآخر ١٤ يوم ([[<polyline>]] بنقط بيحسبها [[sparkPoints()]])، وإيراد الشهر بـ [[Intl.NumberFormat]] ومعاه نسبة التغيير بسهم **ونص** (مش لون بس)، ونسبة التجديد **ring** ([[<circle pathLength="100">]] فالـ [[stroke-dashoffset]] = 100 ناقص النسبة).`,
          example: R`.shell { display: grid; grid-template-columns: var(--side-w) minmax(0, 1fr); grid-template-areas: "side top" "side main"; }
.shell[data-collapsed] .side .label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
[dir="rtl"] .side { --out: 100%; }
behind.forEach(el => (el.inert = open));
<circle class="ring-fg" id="ring" cx="18" cy="18" r="15.9" pathLength="100"/>
document.getElementById("spark").setAttribute("points", sparkPoints(k.checkins));`,
          lines: [
            R`الهيكل: عمودين (الـ sidebar بعرض متغير، والباقي [[minmax(0, 1fr)]])، والمنطقة [[side]] واخدة الصفين فالـ sidebar طوله الصفحة كلها. [[minmax(0, 1fr)]] مش [[1fr]] لوحدها عشان جدول عريض جوه main ميزقش العمود ويعمل scroll أفقي للصفحة.`,
            R`إخفاء بالشكل بس: العنصر 1×1 ومقصوص، بس لسه في الـ accessibility tree، فاللينك اسمه «الأعضاء» حتى والقايمة مقفولة (اتقاس). [[display: none]] كان هيخلي اللينك أيقونة من غير اسم (axe: [[link-name]]).`,
            R`المسافة اللي الـ drawer بيستخبى بيها: [[--out: -100%]] افتراضي (LTR: على الشمال)، و [[100%]] في RTL (على اليمين). [[translateX]] مش بيفهم الاتجاه زي [[inset-inline-start]]، فلازم تعكسه بإيدك.`,
            R`لما الـ drawer مفتوح: الـ topbar والـ main [[inert]]، يعني مفيش Tab ولا ضغط ولا قارئ شاشة بيوصلهم، فالفوكس متحبس في القايمة من غير ما تكتب focus trap. ولما يتقفل بيرجعوا.`,
            R`الـ ring: [[pathLength="100"]] بيقول للمتصفح «اعتبر طول الدايرة 100» مهما كان نصف القطر، فـ [[stroke-dasharray: 100]] و [[stroke-dashoffset: 22]] = 78% مرسومة. والـ SVG [[rotate(-90deg)]] عشان الرسم يبدأ من فوق.`,
            R`الـ sparkline: [[sparkPoints]] (في [[lib.js]]) بتحوّل الـ ١٤ رقم لنقط [[x,y]] جوه [[viewBox="0 0 100 32"]]، و [[polyline]] بيوصّلهم. [[preserveAspectRatio="none"]] بيمطّه على عرض الكارت، و [[vector-effect: non-scaling-stroke]] بيخلي الخط سمكه ثابت.`,
          ],
          try: R`حط الملفات من الشرح، وافتح [[http://127.0.0.1:5502/]]. اضغط زرار تصغير القايمة وافتح تاب Accessibility في DevTools على لينك «الأعضاء» واتأكد إن اسمه لسه موجود. صغّر الشاشة لأقل من 1024 وافتح القايمة بالكيبورد بس (Tab لحد الزرار، Enter، Tab جوه القايمة، Esc). وبعدين غيّر [[[dir="rtl"] .side { --out: 100% }]] لـ [[-100%]] وشوف القايمة المقفولة فين.`,
          flag: R`script`,
          deep: {
            why: R`الـ sidebar هو أول حاجة بتبوظ في أي dashboard على الموبايل: يا إما مغطي المحتوى، يا إما مستخبي بس لينكاته لسه في الـ Tab (فاليوزر بالكيبورد بيدوس Tab ٥ مرات على حاجات مش شايفها)، يا إما اتعمل فيه focus trap بـ ٤٠ سطر JS. و [[inert]] و [[visibility]] بيحلوا ده بسطرين. والكروت: مكتبة رسوم ٢٠٠ كيلو عشان خط صغير ودايرة غالية على الأداء وعلى التحكم في الشكل.`,
            how: R`الـ grid areas بتسمّي المناطق، والـ media query تحت 64rem بتغيّر الـ template لعمود واحد [[grid-template-areas: "top" "main"]] والـ sidebar بيخرج من الـ grid خالص بـ [[position: fixed]]. [[visibility: hidden]] مع [[transition: visibility 0s 0.25s]] (تأخير ربع ثانية) بيخلي الـ drawer يستخبى **بعد** ما الحركة تخلص، ولما يفتح [[transition: transform 0.25s]] بس فبيبقى visible على طول. [[matchMedia(...).addEventListener("change")]] بيقفل الـ drawer لو الشاشة كبرت (عشان الـ main ميفضلش inert). والـ sparkline: كل قيمة بتتحول من المدى [[min..max]] لـ [[pad..h-pad]]، ومقلوبة لأن y في SVG بيكبر لتحت. والـ ring: [[stroke-dasharray]] شرطة طولها 100 وفراغ 100، و [[stroke-dashoffset]] بيزق الشرطة، فالمرسوم = 100 ناقص الـ offset.`,
            when: R`أي لوحة فيها أكتر من ٣ أقسام. القايمة المقفولة للشاشات المتوسطة لما الجدول محتاج عرض، والـ drawer للموبايل. ولو الأقسام ٣ أو ٤ بس على الموبايل، bottom nav (شريط تحت فيه أيقونات وأسامي) أسهل من drawer. والـ SVG بإيدك لـ sparkline و ring و bar بسيط؛ ولو محتاج محاور و tooltips وتكبير، مكتبة. دروس للتعمق: «grid-template-areas»، و «SVG»، و «aria»، و «Dialog».`,
            mistakes: R`[[translateX(-100%)]] في RTL (اتقاس: الـ drawer المقفول فوق الصفحة). تخبّي الـ drawer بـ [[transform]] بس من غير [[visibility]] فلينكاته لسه في الـ Tab. تنسى [[inert]] فالـ Tab بيهرب للصفحة اللي ورا. متقفلش الـ drawer لما الشاشة تكبر فالصفحة تفضل inert. تخبّي أسامي القايمة المقفولة بـ [[display: none]]. تكتب الـ label جنب أيقونة زرار التصغير (حصل: «صغّر القايمة» كان مزنوق تحت الأيقونة؛ بقى [[aria-label]]). تقارن ناتج [[Intl]] بنص عادي في اختبار (فيه [[U+200F]] مخفي). تلوّن السهم بس من غير نص.`,
          },
          teach: R`## الخطوة ٤: الـ shell

~~~html dashboard/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>لوحة صالة الصخرة للتسلق</title>
  <meta name="robots" content="noindex">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M4 28 14 6l6 12 3-5 5 15z' fill='%231f6f8b'/%3E%3C/svg%3E">
  <script src="js/boot.js"></script>
  <link rel="stylesheet" href="css/app.css">
</head>
<body>
  <svg width="0" height="0" class="sprite" aria-hidden="true">
    <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11 12 4l9 7v9h-6v-6H9v6H3z"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="4"/><path d="M1 21c0-4 4-7 8-7s8 3 8 7zM16 4a4 4 0 0 1 0 8m3 9c0-3-1-5-3-6 3 0 7 2 7 6z"/></symbol>
    <symbol id="i-cal" viewBox="0 0 24 24"><path d="M4 5h16v16H4zM4 9h16M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="2"/></symbol>
    <symbol id="i-side" viewBox="0 0 24 24"><path d="M3 4h18v16H3zM9 4v16" fill="none" stroke="currentColor" stroke-width="2"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 15A8 8 0 1 1 9 4a7 7 0 0 0 11 11z"/></symbol>
  </svg>
  <a class="skip" href="#main">اتخطّى للمحتوى</a>
  <div class="shell" id="shell">
    <aside class="side" id="side" aria-label="القايمة الرئيسية">
      <div class="side-head">
        <span class="logo" aria-hidden="true">▲</span><span class="label">الصخرة</span>
        <button class="icon-btn collapse" id="collapse" type="button" aria-expanded="true" aria-controls="side" aria-label="القايمة الجانبية">
          <svg aria-hidden="true"><use href="#i-side"/></svg>
        </button>
      </div>
      <nav>
        <a href="#overview" aria-current="page"><svg aria-hidden="true"><use href="#i-home"/></svg><span class="label">نظرة عامة</span></a>
        <a href="#members"><svg aria-hidden="true"><use href="#i-users"/></svg><span class="label">الأعضاء</span></a>
        <a href="#schedule"><svg aria-hidden="true"><use href="#i-cal"/></svg><span class="label">جدول الحصص</span></a>
      </nav>
    </aside>
    <div class="scrim" id="scrim" hidden></div>

    <header class="topbar">
      <button class="icon-btn menu" id="menu" type="button" aria-expanded="false" aria-controls="side" aria-label="افتح القايمة">
        <svg aria-hidden="true"><use href="#i-side"/></svg>
      </button>
      <h1>صالة الصخرة للتسلق</h1>
      <button class="icon-btn" id="theme" type="button" aria-pressed="false" aria-label="الوضع الداكن"><svg aria-hidden="true"><use href="#i-moon"/></svg></button>
      <button class="btn" id="add" type="button">عضو جديد</button>
    </header>

    <main id="main" tabindex="-1">
      <section id="overview" aria-labelledby="ov-h">
        <h2 id="ov-h">نظرة عامة</h2>
        <ul class="kpis" role="list">
          <li class="kpi"><p class="k-label">أعضاء نشطين</p><p class="k-num" id="k-active">—</p><p class="k-sub">من <span id="k-total">—</span> مسجّل</p></li>
          <li class="kpi"><p class="k-label">دخول النهارده</p><p class="k-num" id="k-in">—</p>
            <svg class="spark" viewBox="0 0 100 32" preserveAspectRatio="none" role="img" aria-labelledby="spark-t"><title id="spark-t">دخول آخر ١٤ يوم</title><polyline id="spark" points=""/></svg></li>
          <li class="kpi"><p class="k-label">إيراد الشهر</p><p class="k-num" id="k-rev">—</p><p class="k-sub"><span class="delta" id="k-delta">—</span> عن الشهر اللي فات</p></li>
          <li class="kpi ring-card"><p class="k-label">نسبة التجديد</p>
            <svg class="ring" viewBox="0 0 36 36" role="img" aria-labelledby="ring-t"><title id="ring-t">نسبة التجديد</title>
              <circle class="ring-bg" cx="18" cy="18" r="15.9" pathLength="100"/><circle class="ring-fg" id="ring" cx="18" cy="18" r="15.9" pathLength="100"/></svg>
            <p class="k-num ring-num" id="k-ren">—</p></li>
        </ul>
      </section>

      <section id="members" aria-labelledby="mem-h">
        <h2 id="mem-h">الأعضاء</h2>
        <form class="filters" id="filters" role="search" aria-label="فلترة الأعضاء">
          <label>دوّر بالاسم أو الرقم <input type="search" name="q" autocomplete="off"></label>
          <label>الحالة
            <select name="status"><option value="all">الكل</option><option value="active">نشط</option><option value="frozen">متجمّد</option><option value="expired">منتهي</option></select></label>
          <label>الباقة
            <select name="plan"><option value="all">الكل</option><option value="monthly">شهري</option><option value="quarterly">3 شهور</option><option value="yearly">سنوي</option><option value="pass10">10 زيارات</option></select></label>
          <button class="btn ghost" type="reset">امسح الفلاتر</button>
        </form>
        <p class="count" id="count" aria-live="polite"></p>
        <div class="table-wrap">
          <table class="members" id="table" aria-labelledby="mem-h" aria-busy="true">
            <thead><tr>
              <th scope="col" data-sort="name"><button type="button">الاسم</button></th>
              <th scope="col" data-sort="plan"><button type="button">الباقة</button></th>
              <th scope="col" data-sort="status"><button type="button">الحالة</button></th>
              <th scope="col" data-sort="lastVisit"><button type="button">آخر زيارة</button></th>
              <th scope="col" data-sort="visits"><button type="button">زيارات الشهر</button></th>
            </tr></thead>
            <tbody id="rows"></tbody>
          </table>
        </div>
        <nav class="pager" id="pager" aria-label="صفحات الأعضاء"></nav>
      </section>

      <section id="schedule" aria-labelledby="sch-h">
        <h2 id="sch-h">جدول الحصص</h2>
        <p class="hint">اضغط على حصة عشان تشوف تفاصيلها وتحجز مكان.</p>
        <div class="week-wrap" tabindex="0" aria-label="جدول الأسبوع، بيتسكرول بالعرض">
          <div class="week" id="week"></div>
        </div>
      </section>
    </main>
  </div>

  <dialog id="dlg-member" aria-labelledby="dm-h">
    <form method="dialog" id="member-form">
      <h2 id="dm-h">عضو جديد</h2>
      <label>الاسم <input name="name" required minlength="3" autocomplete="off" autofocus></label>
      <label>الباقة <select name="plan"><option value="monthly">شهري</option><option value="quarterly">3 شهور</option><option value="yearly">سنوي</option><option value="pass10">10 زيارات</option></select></label>
      <div class="dlg-actions">
        <button class="btn" value="save">ضيف</button>
        <button class="btn ghost" value="cancel" formnovalidate>إلغاء</button>
      </div>
    </form>
  </dialog>

  <dialog id="dlg-class" aria-labelledby="dc-h">
    <form method="dialog">
      <h2 id="dc-h"></h2>
      <p id="dc-body"></p>
      <div class="dlg-actions">
        <button class="btn" value="book" id="dc-book">احجز مكان</button>
        <button class="btn ghost" value="cancel">اقفل</button>
      </div>
    </form>
  </dialog>

  <div class="toasts" id="toasts" role="status" aria-live="polite"></div>
  <script type="module" src="js/app.js"></script>
</body>
</html>
~~~

الأجزاء المهمة:

- [[<meta name="robots" content="noindex">]]: لوحة داخلية، متتحطش في جوجل (ده مش حماية! الحماية تسجيل دخول في السيرفر).
- الـ icon كـ [[data:image/svg+xml,...]]: مفيش طلب [[favicon.ico]] بـ 404 (في الـ portfolio أول تشغيل طلّع [[Failed to load resource: ... 404]] لحد ما زوّدت [[icon.svg]]).
- [[<svg class="sprite">]] فيه [[<symbol>]] لكل أيقونة، وكل مكان بيستخدمها بـ [[<svg><use href="#i-home"/></svg>]]: الأيقونة متكتبتش ٣ مرات، و [[fill: currentColor]] بيخليها بلون النص.
- [[aria-hidden="true"]] على كل SVG أيقونة: الاسم جاي من النص اللي جنبها أو من [[aria-label]].
- [[<aside class="side" aria-label="القايمة الرئيسية">]] و [[<nav>]] جواه، و [[aria-current="page"]] على اللينك الحالي.
- [[#collapse]] عليه [[aria-expanded]] و [[aria-controls="side"]] و [[aria-label="القايمة الجانبية"]]: الاسم ثابت، والحالة (مفتوحة/مقفولة) في [[aria-expanded]]، فقارئ الشاشة بيقول «القايمة الجانبية، زرار، expanded».
- [[#menu]] (للموبايل) اسمه بيتغير «افتح القايمة» / «اقفل القايمة».
- [[#theme]] بـ [[aria-pressed]]: زرار تبديل (toggle) مش checkbox.
- [[<main id="main" tabindex="-1">]]: الـ skip link بيودّي هنا، و [[tabindex="-1"]] بيخليه ياخد الفوكس بالكود من غير ما يبقى في الـ Tab.
- الـ KPI في [[<ul role="list">]]، وكل رقم يبدأ [[—]] لحد ما البيانات توصل.
- الـ sparkline: [[role="img"]] و [[aria-labelledby]] على [[<title>]] جوه الـ SVG، و [[kpi.js]] بيكتب فيه الملخص بالكلام («من 51 لـ 81، والنهارده 73»)، لأن الخط نفسه ملوش معنى لقارئ الشاشة.
- الـ [[<dialog>]] الاتنين و [[#toasts]] في آخر الصفحة، بيتشرحوا في «داشبورد ٣».

### الـ CSS: الـ tokens والـ shell والكروت (أول نص app.css)

~~~css dashboard/css/app.css (السطور 1–91)
/* ---------- tokens: light, then dark (system default or the saved choice) ---------- */
:root {
  color-scheme: light;
  --bg: #f3f5f7; --surface: #ffffff; --ink: #17202a; --muted: #56606b; --line: #d9dee4;
  --brand: #1f6f8b; --brand-ink: #ffffff; --brand-soft: #dceef4;
  --ok: #156c2f; --ok-soft: #dcf3e3; --warn: #8a5a00; --warn-soft: #fbefd5; --bad: #b42318; --bad-soft: #fde4e1;
  --skel: #e6eaee; --skel-hi: #f5f7f9;
  --font: system-ui, "Segoe UI", "Noto Sans Arabic", Tahoma, sans-serif;
  --r: 12px; --side-w: 15rem; --top-h: 4rem;
  --shadow: 0 1px 2px rgb(16 24 32 / 0.06), 0 4px 16px rgb(16 24 32 / 0.06);
  --z-top: 20; --z-drawer: 40; --z-toast: 60;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  color-scheme: dark;
  --bg: #0f1419; --surface: #171d24; --ink: #e6ebf0; --muted: #9ba6b2; --line: #2a333d;
  --brand: #6cc3e0; --brand-ink: #08202a; --brand-soft: #16323d;
  --ok: #57d07a; --ok-soft: #12301c; --warn: #f2c063; --warn-soft: #362a10; --bad: #ff8a7a; --bad-soft: #3a1714;
  --skel: #222a33; --skel-hi: #2c3540; --shadow: 0 1px 2px rgb(0 0 0 / 0.5);
} }
:root[data-theme="dark"] {
  color-scheme: dark;
  --bg: #0f1419; --surface: #171d24; --ink: #e6ebf0; --muted: #9ba6b2; --line: #2a333d;
  --brand: #6cc3e0; --brand-ink: #08202a; --brand-soft: #16323d;
  --ok: #57d07a; --ok-soft: #12301c; --warn: #f2c063; --warn-soft: #362a10; --bad: #ff8a7a; --bad-soft: #3a1714;
  --skel: #222a33; --skel-hi: #2c3540; --shadow: 0 1px 2px rgb(0 0 0 / 0.5);
}

/* ---------- base ---------- */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font: 1rem/1.6 var(--font); color: var(--ink); background: var(--bg); }
h1, h2 { line-height: 1.3; margin: 0; }
h1 { font-size: 1.15rem; }
h2 { font-size: 1.3rem; margin-block-end: 1rem; }
:focus-visible { outline: 3px solid var(--brand); outline-offset: 2px; }
.skip { position: absolute; inset-inline-start: 1rem; top: -4rem; z-index: 100; padding: 0.5rem 1rem; background: var(--ink); color: var(--bg); }
.skip:focus { top: 1rem; }
.sprite { position: absolute; }
svg { width: 1.4rem; height: 1.4rem; fill: currentColor; flex: none; }
.btn { --b: var(--brand); --f: var(--brand-ink); min-height: 44px; padding: 0.4rem 1.1rem; border: 2px solid var(--b); border-radius: 10px; background: var(--b); color: var(--f); font: inherit; font-weight: 600; cursor: pointer; }
.btn.ghost { --b: transparent; --f: var(--brand); border-color: var(--line); }
.btn:disabled { opacity: 0.55; cursor: not-allowed; }
.icon-btn { display: inline-grid; place-items: center; min-width: 44px; min-height: 44px; border: 1px solid var(--line); border-radius: 10px; background: var(--surface); color: var(--ink); cursor: pointer; }
.icon-btn[aria-pressed="true"] { background: var(--brand-soft); border-color: var(--brand); }

/* ---------- app shell: grid areas ---------- */
.shell {
  display: grid; min-height: 100dvh;
  grid-template-columns: var(--side-w) minmax(0, 1fr);
  grid-template-rows: auto 1fr;
  grid-template-areas: "side top" "side main";
  transition: grid-template-columns 0.2s ease;
}
.shell[data-collapsed] { --side-w: 4.75rem; }
.side { grid-area: side; position: sticky; top: 0; height: 100dvh; overflow-y: auto; background: var(--surface); border-inline-end: 1px solid var(--line); padding: 0.75rem; }
.side-head { display: flex; align-items: center; gap: 0.5rem; min-height: 44px; margin-block-end: 1rem; font-weight: 700; }
.logo { color: var(--brand); font-size: 1.4rem; width: 2rem; text-align: center; }
.collapse { margin-inline-start: auto; }
.side nav { display: grid; gap: 0.25rem; }
.side nav a { display: flex; align-items: center; gap: 0.75rem; min-height: 44px; padding: 0.4rem 0.75rem; border-radius: 10px; color: var(--ink); text-decoration: none; }
.side nav a:hover { background: var(--bg); }
.side nav a[aria-current="page"] { background: var(--brand-soft); color: var(--ink); font-weight: 600; }
.shell[data-collapsed] .side .label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.shell[data-collapsed] .side-head { flex-direction: column; }
.shell[data-collapsed] .collapse { margin: 0; }
.shell[data-collapsed] .collapse svg { transform: scaleX(-1); }

.topbar { grid-area: top; position: sticky; top: 0; z-index: var(--z-top); display: flex; align-items: center; gap: 0.75rem; min-height: var(--top-h); padding: 0.5rem 1.25rem; background: color-mix(in srgb, var(--surface) 88%, transparent); backdrop-filter: blur(8px); border-block-end: 1px solid var(--line); }
.topbar h1 { margin-inline-end: auto; }
.menu { display: none; }
main { grid-area: main; min-width: 0; padding: 1.25rem; display: grid; gap: 2rem; align-content: start; }
main section { scroll-margin-top: calc(var(--top-h) + 1rem); min-width: 0; }   /* a grid item never shrinks below its content without this */
.scrim { position: fixed; inset: 0; background: rgb(10 14 20 / 0.5); z-index: calc(var(--z-drawer) - 1); }

/* ---------- KPI cards ---------- */
.kpis { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr)); }
.kpi { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 1rem; box-shadow: var(--shadow); min-height: 8.5rem; display: grid; align-content: start; gap: 0.25rem; }
.kpi p { margin: 0; }
.k-label { color: var(--muted); font-size: 0.9rem; }
.k-num { font-size: 1.8rem; font-weight: 700; line-height: 1.2; font-variant-numeric: tabular-nums; min-height: 1.2em; }
.k-sub { color: var(--muted); font-size: 0.9rem; }
.delta { font-weight: 600; display: inline-block; min-width: 5em; }   /* "—" then "▲ +8.8%": same box, so the words after it stay put */
.delta.up { color: var(--ok); } .delta.down { color: var(--bad); }
.spark { width: 100%; height: 2.25rem; }
.spark polyline { fill: none; stroke: var(--brand); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
.ring-card { grid-template-columns: auto 1fr; align-items: center; column-gap: 1rem; }
.ring-card .k-label { grid-column: 1 / -1; }
.ring { width: 4.5rem; height: 4.5rem; transform: rotate(-90deg); }
.ring circle { fill: none; stroke-width: 3.5; }
.ring-bg { stroke: var(--line); }
.ring-fg { stroke: var(--brand); stroke-dasharray: 100; stroke-dashoffset: 100; stroke-linecap: round; transition: stroke-dashoffset 0.8s ease; }

~~~

~~~css dashboard/css/app.css (السطور 152–163): تحت 64rem
/* ---------- under 64rem: sidebar becomes a drawer ---------- */
@media (max-width: 63.99rem) {
  .shell { grid-template-columns: minmax(0, 1fr); grid-template-areas: "top" "main"; }
  .side { --out: -100%; position: fixed; inset-block: 0; inset-inline-start: 0; z-index: var(--z-drawer); width: min(17rem, 85vw);
    transform: translateX(var(--out)); visibility: hidden; transition: transform 0.25s ease, visibility 0s 0.25s; }
  [dir="rtl"] .side { --out: 100%; }
  .shell[data-open] .side { transform: none; visibility: visible; transition: transform 0.25s ease; }
  .collapse { display: none; }
  .menu { display: inline-grid; }
  .shell[data-collapsed] .side .label { position: static; width: auto; height: auto; clip-path: none; }
}

~~~

- [[color-scheme: light]] و [[dark]] جوه الـ tokens: الـ select والـ scrollbar والـ date picker بتتلوّن مع الثيم.
- [[--z-top: 20; --z-drawer: 40; --z-toast: 60]]: طبقات بأسامي، مش [[z-index: 9999]].
- [[transition: grid-template-columns 0.2s ease]]: Chrome بيحرّك تغيير عرض الأعمدة لما [[--side-w]] يتغير، لأن القيمة الجديدة نفس عدد الأعمدة (الحركة نفسها من الوثائق؛ اللي اتقاس هو العرض بعد 400ms: 76px).
- [[.shell[data-collapsed] .collapse svg { transform: scaleX(-1) }]]: الأيقونة بتتقلب عشان تبان «افتح».
- [[.kpi { min-height: 8.5rem }]] و [[.k-num { min-height: 1.2em }]] و [[.delta { min-width: 5em }]]: المكان محجوز قبل الأرقام، فمفيش CLS (الأخيرة اتزوّدت بعد قياس، تحت).
- [[.ring-fg { transition: stroke-dashoffset 0.8s }]]: الدايرة بتتملي لما الرقم يوصل.
- تحت 64rem: [[--out]] و [[visibility: hidden]] و [[transition: transform 0.25s ease, visibility 0s 0.25s]] (اتشرحوا في deep)، و [[#collapse]] بيختفي و [[#menu]] بيظهر، والأسامي المقفولة بترجع (الـ drawer دايمًا مفتوح بالأسامي).

### قبل الرسم

~~~javascript dashboard/js/boot.js
// before the first paint: saved theme and saved sidebar state, so nothing flips after the page shows
try {
  const t = localStorage.getItem("theme");
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
  if (localStorage.getItem("side") === "collapsed") document.documentElement.dataset.side = "collapsed";
} catch {}
~~~

الثيم والقايمة المقفولة: لو اتطبقوا بعد الرسم، الصفحة بتنوّر أبيض ثانية لليوزر اللي مختار داكن، والجدول بيتنطط لما الـ sidebar يصغر. [[dataset.side]] على [[<html>]] و [[shell.js]] بيحوّله لـ [[data-collapsed]].

### الـ sidebar والثيم

~~~javascript dashboard/js/shell.js
// sidebar: collapses on wide screens, becomes a drawer on narrow ones; plus the theme switch
const shell = document.getElementById("shell"), side = document.getElementById("side");
const menu = document.getElementById("menu"), collapse = document.getElementById("collapse"), scrim = document.getElementById("scrim");
const narrow = matchMedia("(max-width: 63.99rem)");
const behind = [document.querySelector(".topbar"), document.getElementById("main")];

function setCollapsed(on) {
  shell.toggleAttribute("data-collapsed", on);
  collapse.setAttribute("aria-expanded", String(!on));
  try { localStorage.setItem("side", on ? "collapsed" : "open"); } catch {}
}
if (document.documentElement.dataset.side === "collapsed") setCollapsed(true);
collapse.addEventListener("click", () => setCollapsed(!shell.hasAttribute("data-collapsed")));

function setDrawer(open) {
  shell.toggleAttribute("data-open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "اقفل القايمة" : "افتح القايمة");
  scrim.hidden = !open;
  behind.forEach(el => (el.inert = open));                 // while the drawer is open, Tab can't wander behind it
  if (open) side.querySelector("a").focus();
  else if (side.contains(document.activeElement) || document.activeElement === document.body) menu.focus();
}
menu.addEventListener("click", () => setDrawer(true));
scrim.addEventListener("click", () => setDrawer(false));
document.addEventListener("keydown", e => { if (e.key === "Escape" && shell.hasAttribute("data-open")) setDrawer(false); });
side.addEventListener("click", e => {
  const a = e.target.closest("a");
  if (!a) return;
  side.querySelectorAll("a").forEach(x => x.toggleAttribute("aria-current", x === a));
  if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "page");
  if (narrow.matches) setDrawer(false);
});
narrow.addEventListener("change", () => setDrawer(false)); // rotate or resize to wide: never leave the page inert

const theme = document.getElementById("theme");
const isDark = () => document.documentElement.dataset.theme === "dark" || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
theme.setAttribute("aria-pressed", String(isDark()));
theme.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  theme.setAttribute("aria-pressed", String(next === "dark"));
  try { localStorage.setItem("theme", next); } catch {}
});
~~~

- [[narrow = matchMedia("(max-width: 63.99rem)")]]: نفس الـ breakpoint بتاع CSS بالظبط. [[63.99]] مش [[64]] عشان [[min-width: 64rem]] و [[max-width: 64rem]] الاتنين بيتطبقوا على 1024 بالظبط.
- [[setDrawer(open)]]: الـ attribute، و [[aria-expanded]]، والاسم، والخلفية ([[scrim.hidden]])، و [[inert]]، والفوكس. لما يتقفل الفوكس بيرجع للزرار **بس** لو كان جوه القايمة أو ضاع على [[body]] (لو اليوزر داس على لينك، الفوكس رايح للقسم).
- [[keydown]] على [[Escape]]: بيقفل لو مفتوح بس.
- الضغط على لينك: [[aria-current]] بينتقل، وعلى الموبايل القايمة بتتقفل.
- [[narrow.addEventListener("change", ...)]]: لف الموبايل أو كبّر الشاشة والقايمة مفتوحة: اقفلها، وإلا [[main]] هيفضل inert على الكمبيوتر.
- الثيم: [[isDark()]] بيبص على الاختيار المحفوظ الأول، ولو مفيش على [[prefers-color-scheme]]. والزرار بيحفظ [[light]] أو [[dark]] صريح.

### الأرقام

~~~javascript dashboard/js/lib.js
// small pure helpers: sparkline points, ring offset, schedule rows, number formats. No DOM, Node can test them.
export function sparkPoints(values, w = 100, h = 32, pad = 2) {
  if (!values.length) return "";
  const min = Math.min(...values), max = Math.max(...values), span = max - min;
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  return values.map((v, i) => {
    const x = pad + i * step;
    const y = span ? h - pad - ((v - min) / span) * (h - pad * 2) : h / 2;   // SVG y grows downward; a flat line sits in the middle
    return +x.toFixed(1) + "," + +y.toFixed(1);
  }).join(" ");
}

export const ringOffset = pct => 100 - Math.min(100, Math.max(0, pct));   // with pathLength="100" the dash is just the percent

export const DAY0 = 7 * 60, SLOT = 30;                                     // the grid starts at 07:00, one row = 30 minutes
export const toMin = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
export function gridRow(start, end) {
  const row = (toMin(start) - DAY0) / SLOT + 1;
  const span = Math.ceil((toMin(end) - toMin(start)) / SLOT);
  return { row, span };
}
export function overlaps(a, b) { return a.day === b.day && toMin(a.start) < toMin(b.end) && toMin(b.start) < toMin(a.end); }

export const num = new Intl.NumberFormat("ar-EG", { numberingSystem: "latn" });
export const money = new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0, numberingSystem: "latn" });
export const shortDate = new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "short", timeZone: "UTC", numberingSystem: "latn" });
export function delta(now, prev) {
  const pct = prev ? ((now - prev) / prev) * 100 : 0;
  return { pct: Math.round(pct * 10) / 10, up: pct >= 0 };
}
~~~

~~~javascript dashboard/js/kpi.js
// KPI cards: numbers, sparkline, ring. The cards keep their size while loading, so nothing jumps.
import { sparkPoints, ringOffset, num, money, delta } from "./lib.js";
export async function loadKpis(members) {
  const k = await (await fetch("data/kpi.json")).json();
  document.getElementById("k-active").textContent = num.format(k.active);
  document.getElementById("k-total").textContent = num.format(members.length);
  document.getElementById("k-in").textContent = num.format(k.checkins.at(-1));
  document.getElementById("spark").setAttribute("points", sparkPoints(k.checkins));
  document.getElementById("spark-t").textContent = "دخول آخر ١٤ يوم: من " + Math.min(...k.checkins) + " لـ " + Math.max(...k.checkins) + "، والنهارده " + k.checkins.at(-1);
  document.getElementById("k-rev").textContent = money.format(k.revenue);
  const d = delta(k.revenue, k.revenuePrev), el = document.getElementById("k-delta");
  el.textContent = (d.up ? "▲ +" : "▼ ") + d.pct + "%";
  el.className = "delta " + (d.up ? "up" : "down");
  document.getElementById("k-ren").textContent = k.renewal + "%";
  document.getElementById("ring-t").textContent = "نسبة التجديد " + k.renewal + "%";
  requestAnimationFrame(() => (document.getElementById("ring").style.strokeDashoffset = ringOffset(k.renewal)));
}
~~~

- [[numberingSystem: "latn"]]: أرقام لاتيني (186,400) جوه كلام عربي. [[new Intl.NumberFormat("ar-EG")]] من غيرها بيطلّع [[١٨٦٬٤٠٠]]. الاتنين صح؛ المهم تختار واحد للوحة كلها (الدرس الجاي فيه غلطة الخلط).
- [[style: "currency", currency: "EGP", maximumFractionDigits: 0]]: [[‏186,400 ج.م.‏]] من غير قروش.
- [[timeZone: "UTC"]] في التاريخ: التاريخ [[2026-10-25]] من غير ساعة بيتقري UTC، ولو اتعرض بتوقيت الجهاز في منطقة غرب جرينتش بيبقى ٢٤ أكتوبر.
- [[requestAnimationFrame(...)]] للـ ring: لو اتغير في نفس اللحظة اللي العنصر اترسم فيها، الـ transition مش هيشتغل (المتصفح ميشوفش «قيمة قديمة»).

### اتشغّل فعلًا

~~~text node check-dashboard.mjs (Chrome 156)
kpi: 44 | 73 | ‏186,400 ج.م.‏ | 78% | delta: ▲ +8.8%
spark points: 14 | ring offset: 100px
collapsed: side width 76 | link names: نظرة عامة, الأعضاء, جدول الحصص | aria-expanded: false
narrow: side visibility hidden | menu shown: grid
drawer open: focus نظرة عامة | main inert: true | side x: 390
Esc: focus on menu | main inert: false | side visibility: hidden
theme: dark | bg: rgb(15, 20, 25) | pressed: true
after reload: dark | pressed: true
~~~

- [[ring offset: 100px]]: اتقرا وهو لسه بيتحرك (أول لحظة في الـ transition). بعد 0.8 ثانية بيبقى 22.
- [[side x: 390]]: الحافة اليمين للـ drawer المفتوح = عرض الشاشة (RTL، داخل من اليمين).

~~~text node: نفس دوال lib.js
2,22.5 18,5.7 34,21.6 50,9.5 66,8.5 82,30 98,2
22 0 100
186,400 | ‏186,400 ج.م.‏ | 25 أكتوبر | ١٨٦٬٤٠٠
{ pct: 8.8, up: true } { pct: 0, up: true }
~~~

---

## الغلطات اللي حصلت في الخطوة دي

### ١. الـ drawer المقفول فوق الصفحة في RTL

~~~text drawer.mjs (390، الـ drawer مقفول)
shipped (--out: 100% in RTL)   closed drawer left/right: 390 / 662 | on screen: false
same -100% for both            closed drawer left/right: -154 / 118 | on screen: true
~~~

الـ drawer عرضه 272 و [[inset-inline-start: 0]] حطه على اليمين (من 118 لـ 390)، و [[-100%]] زقّه 272 للشمال فبقى من [[-154]] لـ [[118]]: نصه على الشاشة. مكانش باين بس لأن [[visibility: hidden]]، بس أول ما الحركة تشتغل كان هيدخل من الناحية الغلط.

### ٢. الخط المستوي بينزل لتحت

أول نسخة من [[sparkPoints]] كان فيها [[span = max - min || 1]]: لو كل الأيام نفس الرقم ([[[5, 5, 5]]]) الخط بيترسم على الحافة التحتانية ([[2,30 50,30 98,30]])، فيبان كأنه «صفر». بقى [[h / 2]] لو المدى صفر: [[2,16 50,16 98,16]].

### ٣. حروف مخفية في ناتج Intl

~~~text
16 200f 31 38 36 2c 34 30 30 a0 62c 2e 645 2e 200f
~~~

[[money.format(186400)]] طوله 16 حرف مش 13: فيه [[U+200F]] (Right-to-Left Mark) في الأول والآخر، و [[U+00A0]] (مسافة مبتتقسمش) قبل [[ج.م.]]. أي اختبار بيقارن بـ [[=== "186,400 ج.م."]] هيفشل وانت مش شايف ليه. الحل: قارن بـ [[includes("186,400")]]، أو نضّف بـ [[replace(/[\u200f\u00a0]/g, ...)]].

### ٤. الكلام جنب النسبة بيتحرك: CLS 0.0010

~~~text vitals.mjs "?delay=1200" (قبل)
run 2 CLS 0.0010 LCP 276ms H1 | 0.0010 "عن الشهر اللي فات" in k-sub
~~~

[[—]] بقت [[▲ +8.8%]] فالكلام اللي بعدها اتزق. صغير، بس في لوحة بتتفتح ١٠٠ مرة في اليوم بيتجمّع. [[.delta { display: inline-block; min-width: 5em }]] حجز المكان: [[CLS 0.0000]] في التلات مرات.

### ٥. زرار التصغير مزنوق

في اللقطة على 1280 الزرار كان فيه أيقونة وتحتها «صغّر القايمة» بخط صغير، شكله مكسور. الاسم بقى [[aria-label]] والزرار أيقونة بس (44×44). ولقطة الشاشة كانت هي اللي مسكتها، مش أي فحص أوتوماتيك.

---

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| الهيكل | [[grid-template-areas: "side top" "side main"]] و [[minmax(0, 1fr)]] |
| قايمة مقفولة بأسامي | [[--side-w]] أصغر + الأسامي مستخبية بـ [[clip-path]] مش [[display: none]] |
| drawer | [[fixed]] + [[translateX(var(--out))]] بيتعكس في RTL + [[visibility]] + [[inert]] للباقي + Esc + رجوع الفوكس |
| أرقام | [[Intl.NumberFormat("ar-EG", { numberingSystem: "latn" })]] ونظام أرقام واحد للوحة |
| sparkline و ring | [[<polyline points>]] من دالة نقية، و [[pathLength="100"]] |
| من غير تنطيط | مقاسات محجوزة للكروت والأرقام والنسبة |`,
          sol: R`لينك «الأعضاء» في تاب Accessibility اسمه «الأعضاء» والقايمة مقفولة. على أقل من 1024 الـ Tab بيعدّي القايمة المقفولة خالص، و Enter على زرار القايمة بيحط الفوكس على «نظرة عامة»، و Tab بيلف جوه القايمة بس (الباقي inert)، و Esc بيقفل والفوكس على الزرار. ومع [[-100%]] في RTL، [[document.getElementById("side").getBoundingClientRect()]] بيطلّع [[left]] سالب و [[right]] جوه الشاشة.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** [[sparkPoints([10, 20])]] بـ [[w = 100, h = 32, pad = 2]]. احسب النقطتين بإيدك قبل ما تشغّل.`,
              done: R`حسبت [[2,30 98,2]] (الأصغر تحت عند [[h - pad]] والأكبر فوق عند [[pad]]، و x من 2 لـ 98)، والدالة طلّعت نفس الناتج.`,
            },
            {
              lvl: R`سريع`,
              t: R`**دوّر بنفسك:** من صفحة [[inert]] على MDN اعرف ٤ حاجات بتتمنع عن العنصر الـ inert، وهل [[<dialog>]] بـ [[showModal()]] بيحط [[inert]] على باقي الصفحة لوحده.`,
              done: R`كتبت إن الـ inert مبياخدش فوكس ولا ضغط ولا بيتختار نصه ولا بيظهر في الـ accessibility tree، وإن [[showModal()]] بيعمل نفس الأثر على كل اللي بره الـ dialog من غير ما يحط attribute.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**صلّح الكود البايظ:** النسخة دي من الـ drawer: [[.side { transform: translateX(100%) } .shell[data-open] .side { transform: none }]] ومن غير [[visibility]] ولا [[inert]]. افتح الصفحة على 390 ودوس Tab ١٠ مرات من أول الصفحة. اكتب فين الفوكس راح، وصلّحها.`,
              done: R`الـ Tab وقف على لينكات القايمة المستخبية (مش ظاهر أي إطار)، وبعد ما زوّدت [[visibility: hidden]] مع التأخير و [[inert]] للباقي لما تفتح، الـ Tab بيعدّي القايمة وهي مقفولة ومبيطلعش منها وهي مفتوحة.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** على الموبايل بدّل الـ drawer بـ bottom nav: شريط [[position: fixed; inset-inline: 0; bottom: 0]] فيه الـ ٣ لينكات بأيقونة واسم، و [[padding-bottom: env(safe-area-inset-bottom)]]، و [[main]] عليه padding من تحت بنفس الارتفاع عشان آخر حاجة متستخباش.`,
              done: R`على 390 الشريط تحت وآخر صف في الجدول الأسبوعي ظاهر فوقه، وكل لينك 44px على الأقل، و axe صفر، و [[aria-current]] على القسم الحالي، والـ drawer مبقاش موجود على الموبايل.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**مسألة:** اكتب [[barPoints(values, w, h, gap)]] بترجّع لكل قيمة [[{ x, y, width, height }]] لـ bar chart جوه [[viewBox]]، والقيمة السالبة بتنزل تحت خط الصفر. (اكتبها نقية جنب [[sparkPoints]] واختبرها في Node.)`,
              done: R`على [[[3, -1, 2]]] بـ [[w = 30, h = 20, gap = 2]] الأعمدة عرضها متساوي والفراغات 2، والسالب [[y]] بتاعه عند خط الصفر وطوله لتحت، والمجموع [[width + gap]] مبيعدّيش 30، وفيه اختبار لقيم كلها صفر.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** ارسم نفس الـ sparkline بـ Chart.js (من CDN) في صفحة تجربة، وقارن بالـ SVG: حجم اللي اتحمّل (Network)، و LCP (بـ [[vitals.mjs]])، وهل قارئ الشاشة بيقرا حاجة (Accessibility tree).`,
              done: R`عندك جدول ٣ صفوف بالأرقام للطريقتين، وفرق الحجم بالكيلو، وكتبت إن الـ canvas ملوش محتوى في الـ accessibility tree غير لو كتبت [[aria-label]] بإيدك، وإمتى المكتبة تستاهل.`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`function sparkPoints(values, w = 100, h = 32, pad = 2) {
  if (!values.length) return "";
  const min = Math.min(...values), max = Math.max(...values), span = max - min;
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  return values.map((v, i) => {
    const x = pad + i * step;
    const y = span ? h - pad - ((v - min) / span) * (h - pad * 2) : h / 2;
    return +x.toFixed(1) + "," + +y.toFixed(1);
  }).join(" ");
}
const ringOffset = pct => 100 - Math.min(100, Math.max(0, pct));
function delta(now, prev) { const pct = prev ? ((now - prev) / prev) * 100 : 0; return { pct: Math.round(pct * 10) / 10, up: pct >= 0 }; }
console.log("spark: " + sparkPoints([59, 77, 60, 73, 74, 51, 81]));
console.log("flat: " + sparkPoints([5, 5, 5]) + " | one: " + sparkPoints([7]) + " | empty: [" + sparkPoints([]) + "]");
console.log("ring: " + [78, 130, -5].map(ringOffset).join(" "));
const d = delta(186400, 171250);
console.log("delta: " + (d.up ? "+" : "") + d.pct + "% | from zero: " + delta(5, 0).pct);`,
              expect: [
                R`spark: 2,22.5 18,5.7 34,21.6 50,9.5 66,8.5 82,30 98,2`,
                R`flat: 2,16 50,16 98,16 | one: 2,16 | empty: []`,
                R`ring: 22 0 100`,
                R`delta: +8.8% | from zero: 0`,
              ],
            },
          ],
        },
        {
          cmd: R`داشبورد ٢: جدول الأعضاء والحالة في الرابط`,
          title: R`جدول أعضاء بعناوين sticky وترتيب بـ aria-sort وبحث عربي وفلاتر وصفحات محفوظين في الرابط (Back شغال)، وكروت على الموبايل، وحالات التحميل والخطأ والفاضي من غير ما الصفحة تتنطط`,
          learn: R`تبني جدول بيانات حقيقي: الحالة كلها في [[location.search]] (تتبعت وتتحفظ وتترجع بـ Back)، ودوال نقية بتفلتر وترتب وتقسّم صفحات وبتتختبر في Node، وبحث بيلاقي «آدم» لو كتبت «ادم»، و [[pushState]] للأفعال و [[replaceState]] للكتابة، وعناوين sticky متكسرهاش [[overflow]]، و skeleton بنفس مقاس الصف، ورسالة خطأ بزرار «جرّب تاني» بياخد الفوكس، وكروت بـ [[data-label]] تحت 40rem.`,
          out: R`[[gen-data.mjs]] و [[state.js]] و [[table.js]] وجزء الجدول في [[app.css]]: [[?status=frozen&sort=visits&dir=desc]] بيفتح على نفس الجدول في أي تاب، و Back بيرجّع الترتيب، و [[?page=99]] بيبقى [[?page=6]]، والبحث مبيزوّدش الـ history، و CLS صفر على 390 والبيانات متأخرة 1.2 ثانية.`,
          use: {
            prog: R`درس «table» و «جدول responsive» و «ترتيب وصفحات في الـ URL» و «aria» بيتجمعوا، ومعاهم أهم فكرة في الواجهات: الحالة مكانها فين. هنا مكانها الرابط، والرسم دالة من الحالة.`,
            work: R`أكتر شاشة في أي لوحة أدمن: جدول بفلاتر. والشكاوى المعروفة كلها هنا: «بعتلك الرابط فتح على الصفحة الأولى»، و «دوست Back خرجت من الصفحة»، و «العناوين بتختفي لما بنزل»، و «على الموبايل لازم أسكرول بالعرض»، و «بيعلّق وانا بكتب».`,
            cs: R`الدالة النقية [[view(rows, state)]]: نفس المدخلات = نفس الناتج، فبتتختبر لوحدها. و stable sort مع tie-breaker ([[a.id - b.id]]). و normalization للنص قبل المقارنة. و clamping للمدخلات اللي جاية من بره (الرابط مدخل من المستخدم).`,
          },
          desc: R`أهم خطوة في الـ dashboard: جدول الـ ٥٧ عضو.

**الحالة في الرابط:** [[parseState(location.search)]] بتقرا [[q]] و [[status]] و [[plan]] و [[sort]] و [[dir]] و [[page]]، وأي قيمة مش معروفة بترجع للافتراضي (الرابط مدخل من اليوزر: [[?sort=password]] مينفعش يوصل للكود). [[toQuery(state)]] بتكتب الرابط **من غير** القيم الافتراضية، فالرابط النضيف [[/]]. وكل تغيير: [[history.pushState]] للفلتر والترتيب والصفحة (Back بيرجّعهم)، و [[replaceState]] للكتابة في البحث (كل حرف مش خطوة في الـ history: اتقاس [[history grew by 0]]). و [[popstate]] بيقرا الرابط تاني ويرسم.

**الرسم دالة:** [[view(rows, state)]] نقية في [[state.js]] (بتتختبر في Node وفي الـ ci): فلتر، وترتيب بـ [[Intl.Collator("ar")]] للأسامي وترتيب منطقي للباقة والحالة (مش أبجدي بالإنجليزي)، و tie-breaker بالـ id، وصفحات، و [[page]] أكبر من الموجود بيتقص لآخر صفحة.

**الجدول:** [[<th>]] فيه [[<button>]] للترتيب و [[aria-sort]] على العمود الحالي، وعناوين [[position: sticky; top: var(--top-h)]] تحت الـ topbar. **وهنا أكبر فخ اتقاس:** لو حطيت [[overflow-x: auto]] على الـ wrapper (الحل المشهور للجداول العريضة)، العنوان بقى عند **[[-75]]** يعني اختفى فوق، لأن الـ sticky بقى بيلزق جوه الـ wrapper. و [[overflow-x: hidden]] على [[body]] كسر الـ topbar نفسه ([[-595]]).

**الحالات:** تحميل (١٠ صفوف skeleton و [[aria-busy="true"]] و «بيحمّل…»)، وخطأ (رسالة فيها كود الـ HTTP وزرار «جرّب تاني» بياخد الفوكس)، وفاضي («مفيش أعضاء بالفلتر ده» وزرار «امسح الفلاتر»). **وتحت 40rem** كل صف كارت بـ [[td::before { content: attr(data-label) }]].

**الـ CLS اللي اتصلّح:** على 390 كان **0.0848**: الـ skeleton كان صفوف قصيرة والكروت الحقيقية أطول، وسهم الترتيب كان بيظهر بعد البيانات فيوسّع العنوان. بعد ما بقى للـ skeleton نفس ارتفاع سطر الكارت والسهم محجوز مكانه بـ [[visibility: hidden]]: صفر.`,
          example: R`const s = parseState(location.search);
history.pushState(null, "", toQuery(s) || location.pathname);
addEventListener("popstate", () => { state = parseState(location.search); syncForm(); render(); });
.members thead th { position: sticky; top: var(--top-h); z-index: 1; background: var(--surface); }
.members th button::after { content: "▲" / ""; visibility: hidden; }
.members td::before { content: attr(data-label); color: var(--muted); }`,
          lines: [
            R`الحالة من الرابط: [[location.search]] هو الجزء من [[?]] لآخره، و [[parseState]] بتحوّله object فيه كل القيم، والقيمة الغلط أو الناقصة بتاخد الافتراضي.`,
            R`الحالة للرابط: [[pushState]] بيغيّر الرابط ويزوّد خطوة في الـ history **من غير** تحميل الصفحة. ولو الحالة كلها افتراضي [[toQuery]] بترجّع [[""]]، فبنكتب [[location.pathname]] عشان [[?]] القديمة تتشال.`,
            R`Back و Forward: المتصفح بيغيّر الرابط ويبعت [[popstate]]، فبنقرا الحالة تاني ونحط القيم في الفورم ([[syncForm]]) ونرسم. من غير السطر ده Back بيغيّر الرابط بس والجدول مكانه.`,
            R`العناوين بتفضل ظاهرة وانت نازل: [[top: var(--top-h)]] تحت الـ topbar (64px) مش [[0]] (كانت هتستخبى وراه). وخلفية عشان الصفوف متبانش من تحتها. وأهم شرط: مفيش أب بين الجدول والصفحة عليه [[overflow]] غير [[visible]] (أو [[clip]]).`,
            R`سهم الترتيب: موجود دايمًا بس مستخبي، فلما يظهر مبيوسّعش العمود (ده كان جزء من الـ CLS). و [[/ ""]] بعد الـ content هو alt text فاضي: من غيره اسم الزرار لقارئ الشاشة كان «الاسم ▲» (اتقاس).`,
            R`على الموبايل كل خلية بتكتب اسم عمودها قبلها من [[data-label]] اللي [[table.js]] حطه على كل [[<td>]]، فالكارت بيتقري «الحالة: نشط» من غير ما الجدول يتكرر.`,
          ],
          try: R`حط الملفات من الشرح وشغّل [[node gen-data.mjs]]. افتح الجدول واعمل فلتر وترتيب وروح صفحة ٣، وانسخ الرابط وافتحه في تاب جديد. دوس Back ٣ مرات وشوف كل مرة إيه اللي رجع. اكتب في البحث «ادم» من غير همزة. افتح [[?delay=2000]] وبعدين [[?fail=1]] وبعدين ابحث عن «zzz». وفي الآخر حط [[.table-wrap { overflow-x: auto }]] في DevTools ونزل تحت.`,
          flag: R`script`,
          deep: {
            why: R`الحالة اللي في الذاكرة بس بتضيع مع أي refresh أو لينك، وده أول حاجة اليوزر بيلاحظها في لوحة أدمن: «بعتلك الرابط بتاع المتجمّدين، فتح على الكل». والرابط ببلاش بيدّيك المشاركة والـ bookmark و Back. والجدول هو أكتر عنصر بيبوظ على الموبايل وبيعمل CLS (الصفوف بتوصل بعد الصفحة) وبيكسر الـ sticky (الـ overflow).`,
            how: R`الدورة: حدث ← [[update(patch)]] بتدمج التغيير في الحالة ← بتكتب الرابط ([[push]] أو [[replace]]) ← [[render()]] بتنادي [[view(all, state)]] وترسم الصفوف والصفحات و [[aria-sort]] والعدد. والـ popstate بيدخل نفس الدورة من الرابط. البحث بيستنى 250ms من آخر حرف ([[setTimeout]] و [[clearTimeout]] = debounce) فالرسم مش مع كل حرف. والـ sticky: العنصر بيلزق جوه أقرب أب «بيعمل scroll» (أي [[overflow]] غير [[visible]] و [[clip]] بيعمل scroll container حتى لو مبيتسكرولش رأسيًا)، فـ [[overflow-x: auto]] على الـ wrapper بيخلي العنوان يلزق فيه هو، والـ wrapper نفسه بيطلع من الشاشة. [[overflow-x: clip]] بيقص من غير ما يعمل scroll container (اتقاس: 64). والـ skeleton: نفس عدد الصفوف ونفس الارتفاع، فلما البيانات توصل المساحة مبتتغيرش.`,
            when: R`أي قايمة فيها فلتر أو ترتيب أو صفحات أو بحث: أعضاء، وطلبات، ومنتجات، ولوج. الحالة في الرابط لكل اللي له معنى لحد تاني (فلتر، وصفحة، وترتيب)، و localStorage للحاجات الشخصية (عدد الصفوف في الصفحة، والأعمدة المخفية). والكروت على الموبايل لما الأعمدة ٥ أو أقل؛ لو أكتر، الأحسن scroll أفقي بأول عمود sticky (والـ sticky ساعتها رأسي مش هيشتغل جوه الـ wrapper، فاختار). دروس: «table»، و «جدول responsive»، و «ترتيب وصفحات في الـ URL»، و «sticky و fixed».`,
            mistakes: R`[[overflow-x: auto]] على wrapper الجدول وتستغرب ليه الـ sticky بطّل (اتقاس: [[-75]]). [[overflow-x: hidden]] على [[html, body]] عشان «تخبّي» scroll أفقي (اتقاس: الـ topbar نفسه بقى [[-595]]). [[pushState]] مع كل حرف بحث (Back بيمسح حرف حرف). تنسى [[popstate]]. تثق في الرابط ([[?page=-3]] أو [[?sort=__proto__]]). ترتب الباقة أبجدي بالإنجليزي ([[monthly]] قبل [[pass10]] قبل [[quarterly]]). skeleton مقاسه مختلف عن الصف (CLS 0.0848). تخلط [[١٠ زيارات]] و [[10]] في نفس اللوحة (حصل، وبقى لاتيني كله). رسالة خطأ من غير زرار ومن غير فوكس. تحط [[display: block]] على الجدول وتفترض إن كل المتصفحات بتسيب الـ roles (Chrome 156 سابها، و Safari كان بيشيلها، من الوثائق).`,
          },
          teach: R`## الخطوة ٥: جدول الأعضاء

### البيانات

~~~javascript gen-data.mjs
// invented members and classes for the climbing gym; same seed = same data every run
import fs from "node:fs";
let seed = 42;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const pick = a => a[Math.floor(rnd() * a.length)];
const first = ["مريم", "يوسف", "سلمى", "عمر", "هنا", "كريم", "ليلى", "آدم", "نور", "زياد", "فرح", "مالك", "جنى", "سيف", "رنا", "تامر"];
const last = ["الشاذلي", "منصور", "عبد الحميد", "رشدي", "الجمّال", "سالم", "فهمي", "النجار", "شوقي", "البنا"];
const plans = ["monthly", "quarterly", "yearly", "pass10"];
const day = n => new Date(Date.UTC(2026, 9, 31) - n * 864e5).toISOString().slice(0, 10);
const members = Array.from({ length: 57 }, (_, i) => {
  const status = rnd() < 0.72 ? "active" : rnd() < 0.5 ? "frozen" : "expired";
  return { id: 1001 + i, name: pick(first) + " " + pick(last), plan: pick(plans), status,
    joined: day(30 + Math.floor(rnd() * 700)), lastVisit: day(Math.floor(rnd() * (status === "active" ? 9 : 90))), visits: status === "active" ? 2 + Math.floor(rnd() * 20) : Math.floor(rnd() * 3) };
});
const titles = [["بولدرينج للمبتدئين", "رحاب"], ["تسلّق بالحبل", "شادي"], ["قوة الأصابع", "رحاب"], ["مرونة ويوجا", "دينا"], ["أطفال 8–12", "شادي"], ["تقنية متقدمة", "مهاب"]];
const classes = [];
let id = 1;
for (let d = 0; d < 7; d++) {
  if (d === 6) continue;                                   // Friday: open climbing only, no classes
  const slots = [["07:00", "08:00"], ["17:00", "18:30"], ["19:00", "20:00"], ["20:30", "22:00"]];
  for (const [s, e] of slots) if (rnd() < 0.7) { const [t, c] = pick(titles); const spots = 8 + Math.floor(rnd() * 8); classes.push({ id: id++, title: t, coach: c, day: d, start: s, end: e, spots, booked: Math.floor(rnd() * (spots + 1)) }); }
}
const checkins = Array.from({ length: 14 }, () => 40 + Math.floor(rnd() * 45));
fs.writeFileSync("dashboard/data/members.json", JSON.stringify(members, null, 1));
fs.writeFileSync("dashboard/data/classes.json", JSON.stringify(classes, null, 1));
fs.writeFileSync("dashboard/data/kpi.json", JSON.stringify({ active: members.filter(m => m.status === "active").length, checkins, revenue: 186400, revenuePrev: 171250, renewal: 78 }, null, 1));
console.log(members.length, "members,", classes.length, "classes, check-ins:", checkins.join(" "));
console.log("status:", ["active", "frozen", "expired"].map(s => s + "=" + members.filter(m => m.status === s).length).join(" "));
~~~

~~~text اتشغّل فعلًا
57 members, 15 classes, check-ins: 59 77 60 73 74 51 81 77 74 64 68 63 79 73
status: active=44 frozen=5 expired=8
~~~

- [[rnd]]: مولّد أرقام عشوائية بـ seed ثابت (LCG: [[seed * 1103515245 + 12345]] باقي القسمة على [[2^31]]). [[Math.random()]] كان هيطلّع بيانات مختلفة كل مرة، فالأرقام اللي في الدرس متتكررش عندك.
- [[day(n)]]: تاريخ من [[2026-10-31]] لورا [[n]] يوم بـ UTC، و [[toISOString().slice(0, 10)]] = [[YYYY-MM-DD]].
- العضو النشط آخر زيارة ليه في آخر ٩ أيام، والمتجمّد والمنتهي لحد ٩٠ يوم: البيانات «منطقية» عشان الترتيب يبان صح.
- اليوم ٦ (الجمعة) مفيش حصص: تسلّق حر بس.

### الحالة: دوال نقية

~~~javascript dashboard/js/state.js
// table state <-> URL, plus filter/sort/page. No DOM here, so Node can test it.
export const DEFAULTS = { q: "", status: "all", plan: "all", sort: "name", dir: "asc", page: 1, size: 10 };
const STATUS = ["active", "frozen", "expired"];
const PLANS = ["monthly", "quarterly", "yearly", "pass10"];
const SORTS = ["name", "plan", "status", "lastVisit", "visits"];
const ORDER = { plan: PLANS, status: STATUS };

export function parseState(search) {
  const p = new URLSearchParams(search);
  const s = { ...DEFAULTS };
  s.q = (p.get("q") || "").trim().slice(0, 50);
  if (STATUS.includes(p.get("status"))) s.status = p.get("status");
  if (PLANS.includes(p.get("plan"))) s.plan = p.get("plan");
  if (SORTS.includes(p.get("sort"))) s.sort = p.get("sort");
  if (p.get("dir") === "desc") s.dir = "desc";
  const page = Number.parseInt(p.get("page"), 10);
  if (page >= 1) s.page = page;
  return s;
}

export function toQuery(s) {
  const p = new URLSearchParams();
  for (const k of ["q", "status", "plan", "sort", "dir", "page"]) if (s[k] !== DEFAULTS[k] && s[k] !== "") p.set(k, s[k]);
  const q = p.toString();
  return q ? "?" + q : "";
}

// Arabic search: «احمد» should find «أحمد», and «هنا» should find «هنا»/«هناء» typed with ة or ى
export const norm = t => t.toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[\u064B-\u0652]/g, "");
const coll = new Intl.Collator("ar");

function compare(k, a, b) {
  if (ORDER[k]) return ORDER[k].indexOf(a[k]) - ORDER[k].indexOf(b[k]);
  if (typeof a[k] === "number") return a[k] - b[k];
  if (k === "name") return coll.compare(a[k], b[k]);
  return a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0;          // ISO dates sort as text
}

export function view(rows, s) {
  const q = norm(s.q);
  const hit = m => (s.status === "all" || m.status === s.status) && (s.plan === "all" || m.plan === s.plan)
    && (!q || norm(m.name).includes(q) || String(m.id) === q);
  const d = s.dir === "desc" ? -1 : 1;
  const sorted = rows.filter(hit).sort((a, b) => d * compare(s.sort, a, b) || a.id - b.id);
  const pages = Math.max(1, Math.ceil(sorted.length / s.size));
  const page = Math.min(s.page, pages);
  return { total: sorted.length, pages, page, rows: sorted.slice((page - 1) * s.size, page * s.size) };
}
~~~

- [[STATUS.includes(p.get("status"))]]: allowlist. أي قيمة مش في اللستة = افتراضي. ده أهم سطر أمان في الملف: الرابط بيكتبه أي حد.
- [[.trim().slice(0, 50)]]: بحث بحد أقصى 50 حرف ومن غير مسافات في الأطراف.
- [[Number.parseInt(p.get("page"), 10)]] و [[page >= 1]]: [[parseInt(null)]] = [[NaN]]، و [[NaN >= 1]] = [[false]]، فالافتراضي بيفضل.
- [[norm]]: [[أ إ آ]] ← [[ا]]، و [[ة]] ← [[ه]]، و [[ى]] ← [[ي]]، ومن غير تشكيل ([[\u064B-\u0652]] = الفتحة لحد السكون). الاتنين (الاسم والبحث) بيتنضّفوا، فـ «ادم» بتلاقي «آدم».
- [[new Intl.Collator("ar")]]: ترتيب أبجدي عربي صح. [[localeCompare]] بيعمل نفس الحاجة بس بيجهّز الـ collator مع كل مقارنة، فـ MDN بينصح بـ [[Intl.Collator]] لما تقارن نصوص كتير (من الوثائق، مش متقاس هنا).
- [[ORDER]]: الباقة والحالة بترتيبهم المنطقي (شهري، ٣ شهور، سنوي، ١٠ زيارات) مش بالحروف.
- [[d * compare(...) || a.id - b.id]]: لو متساويين ([[0]])، الـ id هو اللي بيحسم، فالترتيب ثابت بين كل رسمة والتانية (من غيره صفّين بنفس عدد الزيارات ممكن يبدّلوا مكانهم بين الصفحات).
- [[Math.min(s.page, pages)]]: [[?page=99]] بيعرض آخر صفحة، و [[table.js]] بيصلّح الرابط بـ [[replaceState]].

~~~text node: نفس الدوال على الـ 57 عضو
{ q: '', status: 'frozen', plan: 'all', sort: 'visits', dir: 'desc', page: 2, size: 10 }
"" ?q=%D9%85%D8%B1%D9%8A%D9%85
57 6 1 يوسف الشاذلي:21, مالك النجار:20, مريم الجمّال:20
6 آدم الشاذلي, آدم عبد الحميد
1053 1042 1007 1049 1032
~~~

- السطر الأول من [[?status=frozen&page=2&sort=visits&dir=desc&evil=1]]: [[evil]] اتجاهل.
- [[?q=مريم]] بيتكتب [[%D9%85...]]: [[URLSearchParams]] بيعمل percent-encoding للعربي (بايتات UTF-8)، والمتصفح بيعرضه عربي في شريط العنوان.

### الجدول

~~~javascript dashboard/js/table.js
// members table: the URL is the state. Read it, draw, and write it back on every change.
import { parseState, toQuery, view, DEFAULTS } from "./state.js";
import { num, shortDate } from "./lib.js";

const PLAN = { monthly: "شهري", quarterly: "3 شهور", yearly: "سنوي", pass10: "10 زيارات" };
const STATUS = { active: "نشط", frozen: "متجمّد", expired: "منتهي" };
const COLS = ["الاسم", "الباقة", "الحالة", "آخر زيارة", "زيارات الشهر"];
const table = document.getElementById("table"), tbody = document.getElementById("rows");
const form = document.getElementById("filters"), pager = document.getElementById("pager"), count = document.getElementById("count");
let all = [], state = parseState(location.search);

const lab = new URLSearchParams(location.search);          // lab only: ?delay=1500 slows the data, ?fail=1 breaks the first try
let labDelay = lab.get("delay"), labFail = lab.get("fail") === "1";

function td(text, label, cls) {
  const c = document.createElement("td");
  c.dataset.label = label;
  if (cls) c.className = cls;
  if (text instanceof Node) c.append(text); else c.textContent = text;
  return c;
}

function stateRow(kind, text, button) {
  const tr = document.createElement("tr"), c = document.createElement("td");
  tr.className = "state-row " + kind;
  c.colSpan = COLS.length;
  c.append(text);
  if (button) { c.append(" "); c.append(button); }
  tr.append(c);
  tbody.replaceChildren(tr);
}

export function skeleton(n = DEFAULTS.size) {
  table.setAttribute("aria-busy", "true");
  tbody.replaceChildren(...Array.from({ length: n }, () => {
    const tr = document.createElement("tr");
    tr.className = "skel";
    tr.innerHTML = "<td><span></span></td>".repeat(COLS.length);
    return tr;
  }));
}

function render() {
  const v = view(all, state);
  if (v.page !== state.page) { state.page = v.page; history.replaceState(null, "", toQuery(state) || location.pathname); }
  table.setAttribute("aria-busy", "false");
  for (const th of table.querySelectorAll("th[data-sort]")) {
    if (th.dataset.sort === state.sort) th.setAttribute("aria-sort", state.dir === "asc" ? "ascending" : "descending");
    else th.removeAttribute("aria-sort");
  }
  count.textContent = v.total ? $__bt$__{num.format(v.total)} عضو، صفحة $__{num.format(v.page)} من $__{num.format(v.pages)}$__bt : "مفيش نتايج";
  if (!v.total) {
    const clear = document.createElement("button");
    clear.type = "button"; clear.className = "btn ghost"; clear.textContent = "امسح الفلاتر";
    clear.onclick = () => form.reset();
    stateRow("empty", "مفيش أعضاء بالفلتر ده.", clear);
  } else {
    tbody.replaceChildren(...v.rows.map(m => {
      const tr = document.createElement("tr");
      const b = document.createElement("span");
      b.className = "badge " + m.status; b.textContent = STATUS[m.status];
      tr.append(td(m.name, COLS[0]), td(PLAN[m.plan], COLS[1]), td(b, COLS[2]),
        td(shortDate.format(new Date(m.lastVisit)), COLS[3]), td(num.format(m.visits), COLS[4], "num"));
      return tr;
    }));
  }
  pager.replaceChildren();
  const btn = (label, page, extra = {}) => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = label; b.dataset.page = page;
    Object.assign(b, extra);
    if (page === v.page && !extra.ariaLabel) b.setAttribute("aria-current", "page");
    pager.append(b);
  };
  btn("‹", v.page - 1, { ariaLabel: "الصفحة اللي فاتت", disabled: v.page === 1 });
  for (let p = 1; p <= v.pages; p++) btn(num.format(p), p);
  btn("›", v.page + 1, { ariaLabel: "الصفحة الجاية", disabled: v.page === v.pages });
}

function update(patch, mode = "push") {
  state = { ...state, ...patch };
  const url = toQuery(state) || location.pathname;
  if (mode === "push") history.pushState(null, "", url); else history.replaceState(null, "", url);
  render();
}

function syncForm() {
  form.q.value = state.q; form.status.value = state.status; form.plan.value = state.plan;
}

let timer;
form.addEventListener("input", e => {
  clearTimeout(timer);
  const patch = { [e.target.name]: e.target.value, page: 1 };
  if (e.target.name === "q") timer = setTimeout(() => update({ ...patch, q: e.target.value.trim() }, "replace"), 250);
  else update(patch, "push");
});
form.addEventListener("reset", () => setTimeout(() => update({ q: "", status: "all", plan: "all", page: 1 }, "push")));
form.addEventListener("submit", e => e.preventDefault());
table.querySelector("thead").addEventListener("click", e => {
  const th = e.target.closest("th[data-sort]");
  if (!th) return;
  const k = th.dataset.sort;
  update({ sort: k, dir: state.sort === k && state.dir === "asc" ? "desc" : "asc", page: 1 });
});
pager.addEventListener("click", e => {
  const b = e.target.closest("button[data-page]");
  if (!b || b.disabled) return;
  update({ page: Number(b.dataset.page) });
  document.getElementById("mem-h").scrollIntoView({ block: "start" });
});
addEventListener("popstate", () => { state = parseState(location.search); syncForm(); render(); });

export async function loadMembers() {
  syncForm();
  skeleton();
  count.textContent = "بيحمّل…";
  try {
    const q = labDelay ? "?delay=" + labDelay + (labFail ? "&fail=1" : "") : labFail ? "?fail=1" : "";
    const res = await fetch("data/members.json" + q);
    if (!res.ok) throw new Error("HTTP " + res.status);
    all = await res.json();
    render();
    return all;
  } catch (err) {
    labFail = false; labDelay = null;
    table.setAttribute("aria-busy", "false");
    count.textContent = "حصل خطأ في التحميل";
    const retry = document.createElement("button");
    retry.type = "button"; retry.className = "btn"; retry.textContent = "جرّب تاني";
    retry.onclick = () => loadMembers();
    stateRow("error", "مقدرناش نجيب الأعضاء (" + err.message + ").", retry);
    retry.focus();
    return [];
  }
}

export function addMember(m) { all.push(m); render(); }
export const nextId = () => Math.max(1000, ...all.map(m => m.id)) + 1;
~~~

- [[td(text, label, cls)]]: كل خلية عليها [[data-label]] باسم العمود (للكروت على الموبايل). و [[textContent]] مش [[innerHTML]] لأي بيانات: اسم عضو فيه [[<img onerror>]] هيتعرض نص.
- [[skeleton()]]: [[innerHTML]] هنا بس لأنه نص ثابت مننا مش بيانات. و [[aria-busy="true"]] على الجدول: قارئ الشاشة بيستنى.
- [[render()]]: لو [[view]] قصّ الصفحة، الرابط بيتصلّح بـ [[replaceState]] (مش push: ده تصليح مش فعل). و [[aria-sort]] على عمود واحد بس.
- العدد في [[<p id="count" aria-live="polite">]]: «57 عضو، صفحة 1 من 6» بيتقري بعد كل فلتر.
- [[stateRow("empty", ...)]] و [[stateRow("error", ...)]]: صف واحد بـ [[colSpan]] = عدد الأعمدة.
- [[btn(label, page, extra)]]: أزرار الصفحات، و [[aria-current="page"]] على الحالية، والسهمين ليهم [[aria-label]] («الصفحة اللي فاتت») لأن [[‹]] لوحده ملوش اسم.
- [[form.addEventListener("input", ...)]]: الـ select بيعمل [[push]] على طول، والبحث [[replace]] بعد 250ms.
- [[reset]] بـ [[setTimeout]]: الحدث بيحصل **قبل** ما الفورم يفضى، فبنستنى لفة.
- [[scrollIntoView]] بعد تغيير الصفحة: اليوزر بيرجع لأول الجدول مش يفضل تحت.
- [[catch]]: الرسالة فيها السبب ([[HTTP 500]])، والزرار بياخد الفوكس (فاليوزر بالكيبورد يدوس Enter على طول)، و [[count]] بيقول «حصل خطأ في التحميل» عشان يتقري.
- [[lab]] و [[labFail]]: للمعمل بس، بيعدّوا [[?delay]] و [[?fail]] لطلب البيانات أول مرة. احذفهم في نسخة حقيقية.

### الـ CSS بتاع الجدول

~~~css dashboard/css/app.css (السطور 92–120)
/* ---------- filters + table ---------- */
.filters { display: flex; flex-wrap: wrap; align-items: end; gap: 0.75rem 1rem; margin-block-end: 0.75rem; }
.filters label { display: grid; gap: 0.25rem; color: var(--muted); font-size: 0.9rem; }
input, select { font: inherit; color: var(--ink); background: var(--surface); border: 1px solid var(--line); border-radius: 8px; min-height: 44px; padding: 0.3rem 0.6rem; }
.count { margin: 0 0 0.5rem; color: var(--muted); min-height: 1.6em; }
.table-wrap { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); }
.members { width: 100%; border-collapse: collapse; }
.members th, .members td { padding: 0 0.9rem; height: 3rem; text-align: start; border-block-end: 1px solid var(--line); white-space: nowrap; }
.members thead th { position: sticky; top: var(--top-h); z-index: 1; background: var(--surface); box-shadow: 0 1px 0 var(--line); }
.members th button { all: unset; cursor: pointer; font-weight: 600; display: inline-flex; gap: 0.3rem; align-items: center; min-height: 44px; }
.members th button:focus-visible { outline: 3px solid var(--brand); outline-offset: 2px; border-radius: 4px; }
.members th button::after { content: "▲" / ""; font-size: 0.7em; color: var(--brand); visibility: hidden; }   /* the space is there before sorting, so nothing moves */
.members th[aria-sort] button::after { visibility: visible; }
.members th[aria-sort="descending"] button::after { content: "▼" / ""; }
.members td.num { font-variant-numeric: tabular-nums; }
.members tbody tr:last-child td { border-block-end: 0; }
.badge { display: inline-block; padding: 0.05rem 0.6rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; }
.badge.active { background: var(--ok-soft); color: var(--ok); }
.badge.frozen { background: var(--warn-soft); color: var(--warn); }
.badge.expired { background: var(--bad-soft); color: var(--bad); }
.skel span { display: block; height: 0.9em; border-radius: 6px; background: linear-gradient(90deg, var(--skel) 25%, var(--skel-hi) 50%, var(--skel) 75%); background-size: 200% 100%; animation: shimmer 1.2s linear infinite; }
@keyframes shimmer { to { background-position: -200% 0; } }
.state-row td { height: auto; padding: 2rem 1rem; text-align: center; white-space: normal; }
.state-row.error td { color: var(--bad); }
.pager { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-block-start: 0.75rem; }
.pager button { min-width: 44px; min-height: 44px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); color: var(--ink); font: inherit; cursor: pointer; font-variant-numeric: tabular-nums; }
.pager button[aria-current="page"] { background: var(--brand); color: var(--brand-ink); border-color: var(--brand); }
.pager button:disabled { opacity: 0.5; cursor: default; }

~~~

~~~css dashboard/css/app.css (السطور 164–182): تحت 40rem
/* ---------- under 40rem: rows become cards ---------- */
@media (max-width: 40rem) {
  .topbar { padding-inline: 0.75rem; gap: 0.5rem; }
  .topbar h1 { font-size: 1rem; }
  main { padding: 0.75rem; }
  .filters label, .filters input, .filters select { width: 100%; }
  .table-wrap { background: none; border: 0; }
  .members thead tr { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-block-end: 0.75rem; }
  .members thead th { position: static; height: auto; padding: 0 0.6rem; border: 1px solid var(--line); border-radius: 999px; box-shadow: none; }
  .members tbody, .members tr, .members td { display: block; }
  .members tbody tr { background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); padding: 0.5rem 0.9rem; margin-block-end: 0.75rem; }
  .members td { height: auto; padding: 0.3rem 0; border: 0; display: grid; grid-template-columns: 7.5rem 1fr; white-space: normal; }
  .members td::before { content: attr(data-label); color: var(--muted); }
  .members td > .badge { justify-self: start; }   /* a grid item stretches by default */
  .members .state-row td, .members .skel td { display: block; }
  .members .skel td::before, .members .state-row td::before { content: none; }
  .members .skel td { height: calc(1.6em + 0.6rem); display: flex; align-items: center; }   /* same height as a real card line */
}

~~~

- [[.members th button { all: unset; ... }]]: الزرار شكله نص العنوان، بس لسه زرار (Tab و Enter و Space). و [[all: unset]] شال الإطار كمان، فبنرجّعه بـ [[:focus-visible]].
- [[height: 3rem]] على كل خلية و [[white-space: nowrap]]: كل الصفوف نفس الارتفاع (الـ skeleton كمان).
- [[.badge.active]] لونها [[--ok]] على [[--ok-soft]]: الحالة بلون **ونص** («نشط»)، مش لون بس.
- الـ shimmer: gradient عرضه 200% بيتحرك بـ [[background-position]] (مش [[transform]]، بس على مستطيلات صغيرة مبيفرقش).
- تحت 40rem: [[thead tr]] بقى أزرار ترتيب جنب بعض (لسه شغالين)، والصف [[display: block]] بحدود كارت، والخلية grid عمودين: الاسم والقيمة. و [[.badge { justify-self: start }]] لأن عنصر الـ grid بيتمد بعرض العمود (في اللقطة الأولى «نشط» كانت شريط أخضر بعرض الكارت).
- [[.skel td { height: calc(1.6em + 0.6rem) }]] تحت 40rem: نفس ارتفاع سطر الكارت الحقيقي.

### اتشغّل فعلًا

~~~text node check-dashboard.mjs
count: 57 عضو، صفحة 1 من 6
after status=frozen: /?status=frozen | 5 عضو، صفحة 1 من 1
after sort visits twice: /?status=frozen&sort=visits&dir=desc | aria-sort: descending
after Back: /?status=frozen&sort=visits | aria-sort: ascending
open ?page=4&sort=lastVisit&dir=desc: 57 عضو، صفحة 4 من 6 | first row: سيف منصور
open ?page=99 -> /?page=6 | 57 عضو، صفحة 6 من 6
search ادم: /?q=ادم | rows: آدم الشاذلي, آدم عبد الحميد | history grew by 0
empty state: مفيش أعضاء بالفلتر ده. امسح الفلاتر
after clear: / | 57 عضو، صفحة 1 من 6
while loading: 10 skeleton rows, aria-busy = true | count: بيحمّل…
error: مقدرناش نجيب الأعضاء (HTTP 500). جرّب تاني | focus on: جرّب تاني
after retry: 57 عضو، صفحة 1 من 6
~~~

---

## الغلطات اللي حصلت في الخطوة دي

### ١. الـ sticky والـ overflow

~~~javascript sticky.mjs
import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
for (const [name, extra] of [["shipped", ""], ["wrapper overflow-x: auto", ".table-wrap{overflow-x:auto}"], ["wrapper overflow-x: clip", ".table-wrap{overflow-x:clip}"], ["body overflow-x: hidden", "html,body{overflow-x:hidden}"]]) {
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto("http://127.0.0.1:5502/"); await p.waitForSelector("#rows tr:not(.skel)");
  if (extra) await p.addStyleTag({ content: extra });
  await p.evaluate(() => scrollTo(0, document.getElementById("members").offsetTop + 300));
  await p.waitForTimeout(150);
  const r = await p.evaluate(() => [Math.round(document.querySelector(".members thead th").getBoundingClientRect().top), Math.round(document.querySelector(".topbar").getBoundingClientRect().top)]);
  console.log(name.padEnd(26), "th top:", r[0], "| topbar top:", r[1]);
  await p.close();
}
await b.close();
~~~

~~~text
shipped                    th top: 64 | topbar top: 0
wrapper overflow-x: auto   th top: -75 | topbar top: 0
wrapper overflow-x: clip   th top: 64 | topbar top: 0
body overflow-x: hidden    th top: -139 | topbar top: -595
~~~

الصفحة نازلة لحد 300px بعد أول الجدول. السليم: العنوان عند 64 (تحت الـ topbar بالظبط). مع [[overflow-x: auto]] العنوان بقى بيلزق في الـ wrapper، والـ wrapper نفسه طالع فوق الشاشة. ومع [[body { overflow-x: hidden }]] الـ topbar نفسه طلع (595px فوق)، لأن الـ body بقى scroll container والصفحة بتتسكرول في الـ viewport مش فيه. [[clip]] بيقص من غير ما يعمل scroll container.

### ٢. CLS 0.0848 على الموبايل

~~~text audit-dashboard.mjs (390، قبل)
vitals fast data    CLS 0.0848 LCP 244ms hint | moved: schedule,TH
vitals ?delay=1200  CLS 0.0848 LCP 296ms hint | moved: schedule,TH
~~~

سببين: الـ skeleton كان ١٠ صفوف بارتفاع [[0.9em]] وتحت 40rem الصف الحقيقي كارت فيه ٥ سطور (فالجدول الأسبوعي اتزق لتحت: [[schedule]])، وسهم الترتيب كان [[content]] بيتحط بعد البيانات فبيوسّع العنوان ([[TH]]). بعد التصليحين: [[CLS 0.0010]] (وده كان النسبة جنب الإيراد، في الدرس اللي فات)، وبعدها صفر.

### ٣. اسم الزرار «الاسم ▲»

~~~text aname.mjs (قبل ← بعد [[content: "▲" / ""]])
- button "الاسم ▲" ...
- button "الاسم" | - button "الباقة" | - button "الحالة" | - button "آخر زيارة" | - button "زيارات الشهر"
arrow still drawn: "▲" / ""
~~~

الـ [[::after]] جزء من اسم الزرار، فقارئ الشاشة كان بيقول «الاسم، مثلث لفوق، زرار». [[content: "▲" / ""]] (alt text فاضي بعد [[/]]) بيرسم السهم ويشيله من الاسم. والاتجاه نفسه بيتقري من [[aria-sort]] على الـ [[<th>]].

### ٤. الجدول لسه جدول على الموبايل؟

~~~text aria at 390
- table "الأعضاء": / - rowgroup: / - row "الاسم الباقة الحالة آخر زيارة زيارات الشهر": / - columnheader "الاسم": / - button "الاسم" / - columnheader "الباقة": / - button "الباقة" / ...
~~~

Chrome 156 ساب الـ roles (table و row و columnheader) حتى مع [[display: block]] على الصفوف. Safari كان تاريخيًا بيشيلها (من الوثائق، متجرّبش هنا): لو لازم تضمنها حط [[role="table"]] و [[role="row"]] و [[role="cell"]] صريحة.

### ٥. نظامين أرقام

في لقطة الموبايل كان مكتوب «١٠ زيارات» و «٣ شهور» جنب «29 أكتوبر» و «8». الأسامي كانت مكتوبة بإيدي أرقام هندي، والأرقام من [[Intl]] لاتيني. بقى كله لاتيني ([[10 زيارات]] و [[3 شهور]] و [[أطفال 8–12]] في البيانات).

### ٦. [[?fail=1]] كسر الصفحة نفسها، و [[type: commonjs]]

الاتنين اتشرحوا في درس الخريطة: الفشل والتأخير بقوا للبيانات بس، و [[npm pkg set type=module]] عشان [[state.js]] يتقري في Node.

---

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| الحالة | الرابط: [[parseState]] بـ allowlist، و [[toQuery]] من غير الافتراضي |
| الـ history | [[pushState]] للأفعال، و [[replaceState]] للكتابة والتصليح، و [[popstate]] بيرسم |
| الفلترة والترتيب | دالة نقية، و [[Collator("ar")]]، و ترتيب منطقي، و tie-breaker |
| sticky | مفيش [[overflow]] غير [[visible]]/[[clip]] فوقه، و [[top]] = ارتفاع الـ topbar |
| الحالات | skeleton بنفس المقاس و [[aria-busy]]، وخطأ بزرار وفوكس، وفاضي بزرار |
| الموبايل | [[data-label]] و [[td::before]]، وأزرار الترتيب فوق |`,
          sol: R`الرابط بعد الفلتر والترتيب والصفحة شكله [[?status=frozen&sort=visits&dir=desc]] (ومعاه [[page]] لو مش 1)، وبيفتح على نفس الجدول في تاب جديد. Back مرة بيرجّع اتجاه الترتيب، والتانية الترتيب نفسه، والتالتة الفلتر. «ادم» بيلاقي «آدم الشاذلي» و «آدم عبد الحميد». [[?delay=2000]] بيورّي ١٠ صفوف skeleton، و [[?fail=1]] رسالة فيها [[HTTP 500]] والفوكس على «جرّب تاني»، و «zzz» بيورّي «مفيش أعضاء بالفلتر ده». ومع [[overflow-x: auto]] العناوين بتختفي لما تنزل.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** إيه اللي [[parseState]] هترجّعه لـ [[?status=hacked&page=-3&sort=password&dir=up]]؟ وإيه اللي [[toQuery]] هترجّعه لـ [[?status=all&page=1&q=%20%20]]؟ اكتب قبل ما تشغّل.`,
              done: R`الأولى رجّعت الافتراضي كله (ولا قيمة عدّت)، والتانية رجّعت [[""]] (كلها افتراضي، والبحث بعد [[trim]] فاضي)، زي سطري الـ ci.`,
            },
            {
              lvl: R`سريع`,
              t: R`**اشرحها:** اكتب لزميل في ٣ سطور إمتى [[pushState]] وإمتى [[replaceState]] في الجدول ده، وإيه اللي هيحصل لزرار Back لو كل حرف في البحث بقى [[pushState]].`,
              done: R`الشرح بيقول push للأفعال اللي اليوزر ممكن يرجع منها (فلتر، وترتيب، وصفحة)، و replace للكتابة ولتصليح [[?page=99]]، وإن Back مع push لكل حرف هيمسح حرف حرف بدل ما يرجع للفلتر اللي قبله.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**صلّح الكود البايظ:** [[rows.sort((a, b) => a.visits - b.visits)]] جوه [[view]] من غير [[slice]] أو [[filter]] قبلها، ومن غير tie-breaker. ابني حالة بتبيّن المشكلتين (تلميح: اترتّب مرتين بعمودين مختلفين، وصفّين بنفس الزيارات على حدود صفحتين).`,
              done: R`بيّنت إن [[sort]] بيغيّر المصفوفة الأصلية ([[all]] نفسها اتغير ترتيبها)، وإن صفّين بـ 8 زيارات ممكن يتبادلوا بين صفحة ١ و ٢، وبعد [[filter]] (نسخة جديدة) و [[|| a.id - b.id]] الاتنين اتحلّوا واختبار بيأكد.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** زرار «نزّل CSV» بيصدّر كل الصفوف اللي بتطابق الفلتر (مش الصفحة بس) بـ [[view(all, { ...state, page: 1, size: Infinity })]]، وفيه [[\uFEFF]] في الأول عشان Excel يقرا العربي، والخلية اللي فيها فاصلة أو علامة تنصيص بتتحط بين [[""]].`,
              done: R`مع [[?status=frozen]] الملف ٦ سطور (عناوين و ٥)، و Excel بيفتح العربي سليم، واسم فيه [[,]] متقسمش لعمودين، واسم الملف فيه الفلتر.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**اكتب اختبار:** باستخدام [[node:test]] و [[node:assert]] اكتب ٦ اختبارات لـ [[state.js]]: allowlist، والرابط النضيف، والبحث العربي، والـ tie-breaker، وقص الصفحة، و round trip ([[parseState(toQuery(s))]] = [[s]]).`,
              done: R`[[node --test]] بيطلّع [[# pass 6]]، ولو بوّظت [[norm]] (شيلت سطر الهمزة) اختبار البحث بيفشل بالاسم، والـ round trip مكتوب على ٣ حالات مختلفة على الأقل.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** اعمل نسخة الموبايل بالطريقة التانية: الجدول زي ما هو جوه wrapper بـ [[overflow-x: auto]] وأول عمود [[position: sticky; inset-inline-start: 0]]. قارن على 360: هل فيه scroll أفقي للصفحة، وهل العناوين الـ sticky شغالة، وعدد الصفوف اللي بتبان في أول شاشة.`,
              done: R`عندك جدول للطريقتين بالـ ٣ أرقام، وعرفت إن الـ sticky الرأسي اتكسر في نسخة الـ wrapper (زي [[-75]]) والأفقي شغال، وإن الكروت بتعرض صفوف أقل في الشاشة، وكتبت تختار أنهي لـ ٥ أعمدة وأنهي لـ ١٢.`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`const DEFAULTS = { q: "", status: "all", plan: "all", sort: "name", dir: "asc", page: 1, size: 2 };
const STATUS = ["active", "frozen", "expired"], PLANS = ["monthly", "quarterly", "yearly", "pass10"], SORTS = ["name", "plan", "status", "lastVisit", "visits"];
const ORDER = { plan: PLANS, status: STATUS };
function parseState(search) {
  const p = new URLSearchParams(search), s = { ...DEFAULTS };
  s.q = (p.get("q") || "").trim().slice(0, 50);
  if (STATUS.includes(p.get("status"))) s.status = p.get("status");
  if (PLANS.includes(p.get("plan"))) s.plan = p.get("plan");
  if (SORTS.includes(p.get("sort"))) s.sort = p.get("sort");
  if (p.get("dir") === "desc") s.dir = "desc";
  const page = Number.parseInt(p.get("page"), 10);
  if (page >= 1) s.page = page;
  return s;
}
function toQuery(s) {
  const p = new URLSearchParams();
  for (const k of ["q", "status", "plan", "sort", "dir", "page"]) if (s[k] !== DEFAULTS[k] && s[k] !== "") p.set(k, s[k]);
  const q = p.toString();
  return q ? "?" + q : "";
}
const norm = t => t.toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[\u064B-\u0652]/g, "");
const coll = new Intl.Collator("ar");
function compare(k, a, b) {
  if (ORDER[k]) return ORDER[k].indexOf(a[k]) - ORDER[k].indexOf(b[k]);
  if (typeof a[k] === "number") return a[k] - b[k];
  if (k === "name") return coll.compare(a[k], b[k]);
  return a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0;
}
function view(rows, s) {
  const q = norm(s.q);
  const hit = m => (s.status === "all" || m.status === s.status) && (s.plan === "all" || m.plan === s.plan) && (!q || norm(m.name).includes(q) || String(m.id) === q);
  const d = s.dir === "desc" ? -1 : 1;
  const sorted = rows.filter(hit).sort((a, b) => d * compare(s.sort, a, b) || a.id - b.id);
  const pages = Math.max(1, Math.ceil(sorted.length / s.size)), page = Math.min(s.page, pages);
  return { total: sorted.length, pages, page, rows: sorted.slice((page - 1) * s.size, page * s.size) };
}
const rows = [
  { id: 1, name: "آدم سالم", plan: "yearly", status: "active", lastVisit: "2026-10-29", visits: 8 },
  { id: 2, name: "هنا فهمي", plan: "monthly", status: "frozen", lastVisit: "2026-09-02", visits: 0 },
  { id: 3, name: "زياد النجار", plan: "monthly", status: "active", lastVisit: "2026-10-31", visits: 15 },
  { id: 4, name: "سلمى منصور", plan: "pass10", status: "expired", lastVisit: "2026-08-07", visits: 1 },
  { id: 5, name: "ادم شوقي", plan: "quarterly", status: "active", lastVisit: "2026-10-30", visits: 8 },
];
const show = v => v.total + " rows, page " + v.page + "/" + v.pages + ": " + v.rows.map(m => m.id).join(",");
console.log("parse junk: " + JSON.stringify(parseState("?status=hacked&page=-3&sort=password&dir=up")));
console.log("defaults -> " + JSON.stringify(toQuery(parseState("?status=all&page=1&q=%20%20"))));
console.log("visits desc: " + show(view(rows, parseState("?sort=visits&dir=desc"))));
console.log("search ادم: " + show(view(rows, parseState("?q=ادم"))));
console.log("page 99: " + show(view(rows, parseState("?page=99"))));
console.log("plan order: " + show(view(rows, { ...parseState("?sort=plan"), size: 5 })));
console.log("round trip: " + toQuery(parseState("?dir=desc&sort=visits&status=active&page=2")));`,
              expect: [
                R`parse junk: {"q":"","status":"all","plan":"all","sort":"name","dir":"asc","page":1,"size":2}`,
                R`defaults -> ""`,
                R`visits desc: 5 rows, page 1/3: 3,1`,
                R`search ادم: 2 rows, page 1/1: 1,5`,
                R`page 99: 5 rows, page 3/3: 2`,
                R`plan order: 5 rows, page 1/1: 2,3,5,1,4`,
                R`round trip: ?status=active&sort=visits&dir=desc&page=2`,
              ],
            },
          ],
        },
        {
          cmd: R`داشبورد ٣: جدول الحصص و dialog والتنبيهات`,
          title: R`جدول حصص أسبوعي بـ CSS Grid (اليوم عمود والوقت صفوف) بيتسكرول بالعرض على الموبايل، و <dialog> للإضافة والحجز برسايل تحقق عربي، و toasts بتتقري، و dark mode من غير وميض`,
          learn: R`تبني جدول مواعيد على grid: كل حصة زرار مكانه من custom properties ([[--col]] و [[--row]] و [[--span]])، وعمود الوقت sticky والأيام بـ scroll-snap؛ و [[<dialog>]] بـ [[showModal()]] و [[method="dialog"]] و [[returnValue]] وقفل بالضغط على الخلفية، ورسايل [[setCustomValidity]] بالعربي؛ و toasts في live region موجودة من الأول؛ وثيم داكن بـ tokens بيتحفظ.`,
          out: R`[[schedule.js]] و [[ui.js]] و [[app.js]] وآخر جزء في [[app.css]]: ١٥ حصة في مكانها، والحجز بيكتب toast «اتحجز مكان في …»، والـ dialog بيرجّع الفوكس للزرار اللي فتحه، و Esc بيقفل، والضغط على padding الـ dialog مبيقفلوش، والصفحة من غير scroll أفقي من 360 لـ 1440 والجدول هو اللي بيتسكرول.`,
          use: {
            prog: R`درس «grid» و «Dialog» و «aria» و «dark mode» و «Constraint Validation API» في شاشة واحدة. والدرس المهم: grid بيحط عناصر في أماكن محسوبة من البيانات من غير [[position: absolute]] ولا حسابات بكسل.`,
            work: R`جداول المواعيد في كل حتة: حصص جيم، ومواعيد عيادة، وحصص مدرسة، وحجز ملاعب. والـ modal أكتر مكوّن بيتعمل غلط (من غير فوكس ومن غير Esc)، والـ toast أكتر رسالة مش بتتقري لقارئ الشاشة.`,
            cs: R`تحويل الوقت لإحداثيات (دقائق من بداية اليوم ÷ طول الخانة)، وفحص التداخل بين فترتين ([[a.start < b.end && b.start < a.end]])، والـ top layer: الـ dialog والـ backdrop بيترسموا فوق كل حاجة من غير z-index.`,
          },
          desc: R`آخر خطوة بناء في الـ dashboard.

**جدول الحصص:** [[.week]] grid فيه عمود للوقت و ٧ أعمدة للأيام ([[minmax(9rem, 1fr)]])، وصف للعناوين و ٣٠ صف كل واحد نص ساعة (من ٧ الصبح لـ ١٠ بالليل). [[gridRow("17:00", "18:30")]] بترجّع [[{ row: 21, span: 3 }]]، و [[schedule.js]] بيحطهم كـ [[--row]] و [[--span]] على الزرار، والـ CSS: [[grid-row: calc(var(--row) + 1) / span var(--span)]] (اتقاس: [[grid-row-start]] = 22). وكل حصة خلفيتها متملية بنسبة الحجز ([[--fill]]). عمود الوقت [[position: sticky; inset-inline-start: 0]] فبيفضل ظاهر وانت بتسكرول بالعرض.

**الغلطة الكبيرة:** الصفحة كلها كان فيها scroll أفقي في **كل** المقاسات من 360 لـ 1280 ([[scrollWidth 1086]] على 360). الجدول عرضه 67rem، والـ wrapper عليه [[overflow-x: auto]]، بس الـ section اللي حواليه **عنصر grid** في [[main]]، وعنصر الـ grid أقل عرض ليه افتراضيًا = أقل عرض لمحتواه ([[min-width: auto]]). سطر واحد: [[main section { min-width: 0 }]] والـ matrix بقى صفر overflow والجدول بس هو اللي بيتسكرول.

**الـ dialog:** [[showModal()]] بيحط الـ dialog في الـ top layer، ويخلي باقي الصفحة inert، ويحط الفوكس على [[autofocus]]، و Esc بيقفله، ولما يتقفل الفوكس بيرجع للزرار اللي فتحه (اتقاس: [[focus back on: add]]). الفورم جواه [[method="dialog"]]: الزرار اللي اتداس قيمته بتبقى [[dialog.returnValue]] ([[save]] أو [[cancel]] أو [[book]]). **غلطتين اتقاسوا:** الضغط على padding الـ dialog كان بيقفله (الـ padding جزء من [[<dialog>]] نفسه، فكان بيتحسب «backdrop»)، ورسالة الحقل الفاضي كانت **[[Please fill out this field.]]** بالإنجليزي في صفحة عربي (لغة المتصفح مش الصفحة).

**التنبيهات والثيم:** [[<div role="status" aria-live="polite">]] موجود في الصفحة من الأول، و [[toast()]] بيزوّد فيه فقرة وبيشيلها بعد ٤ ثواني. والداكن نفس الـ tokens بقيم تانية، و [[boot.js]] بيطبق الاختيار قبل الرسم.`,
          example: R`.week { display: grid; grid-template-columns: 4.5rem repeat(7, minmax(9rem, 1fr)); grid-template-rows: 2.5rem repeat(30, 1.75rem); }
.slot { grid-column: calc(var(--col) + 2); grid-row: calc(var(--row) + 1) / span var(--span); }
main section { scroll-margin-top: calc(var(--top-h) + 1rem); min-width: 0; }
dlg.showModal();
document.addEventListener("click", e => { if (e.target instanceof HTMLDialogElement) e.target.close("cancel"); });
nameIn.addEventListener("invalid", () => nameIn.setCustomValidity(nameIn.validity.valueMissing ? "اكتب اسم العضو" : "الاسم لازم ٣ حروف على الأقل"));`,
          lines: [
            R`الشبكة: عمود 4.5rem للوقت و ٧ أيام كل واحد أقله 9rem، وصف 2.5rem لأسامي الأيام و ٣٠ صف كل واحد 1.75rem (نص ساعة). الساعة = صفين = 3.5rem، ونفس الرقم في الـ gradient اللي بيرسم خطوط الساعات.`,
            R`مكان كل حصة من البيانات: العمود = رقم اليوم + 2 (عمود الوقت هو 1، والسبت 0 بيبقى 2)، والصف = [[--row]] + 1 (صف العناوين هو 1)، و [[span]] = عدد الخانات. [[calc()]] بيطلع رقم صحيح فـ grid بيقبله.`,
            R`السطر اللي شال الـ scroll الأفقي من الصفحة كلها: عنصر grid ممكن يصغر عن عرض محتواه. من غيره الـ section بيتمد لعرض الجدول (1086px على موبايل 360).`,
            R`يفتح الـ dialog modal: فوق كل حاجة، والباقي inert، والفوكس جواه، و Esc بيقفل. [[show()]] من غير Modal بيفتحه عادي من غير أي ده.`,
            R`قفل بالضغط بره: الضغطة على الخلفية [[::backdrop]] بيبقى [[target]] بتاعها الـ dialog نفسه. شغال صح بس لو الـ dialog ملوش padding (الفورم جواه هو اللي عليه الـ padding)، وإلا الضغط على الحافة الداخلية بيقفل كمان.`,
            R`رسالة التحقق بالعربي: حدث [[invalid]] بيحصل لما الفورم يتبعت والحقل مش سليم، و [[setCustomValidity]] بيحط النص اللي هيظهر. ولازم [[setCustomValidity("")]] مع كل [[input]] (في [[app.js]])، وإلا الحقل يفضل «غلط» حتى بعد ما يتصلّح.`,
          ],
          try: R`حط الملفات من الشرح وافتح الجدول. دوس على حصة واحجز، واسمع الـ toast بقارئ الشاشة (Narrator: Win+Ctrl+Enter، أو VoiceOver على الماك). افتح «عضو جديد» ودوس «ضيف» فاضي، وبعدين بحرفين، وبعدين اسم صح. جرّب Esc، والضغط على الخلفية، والضغط على حافة الـ dialog من جوه. وبعدين امسح [[min-width: 0]] من [[main section]] وصغّر الشاشة لـ 360.`,
          flag: R`script`,
          deep: {
            why: R`جدول المواعيد بـ [[<table>]] مستحيل يعمل حصة طولها ساعة ونص من غير rowspan يدوي؛ وبـ [[position: absolute]] كل حاجة بالبكسل وبتتكسر مع أي تغيير مقاس. الـ grid بيحوّل الوقت لصف مباشرة. والـ modal المعمول بـ div محتاج حوالي ٤٠ سطر عشان الفوكس و Esc والخلفية، و [[<dialog>]] بيعملهم. والـ toast اللي بيتحط في عنصر لسه معمول مبيتقريش، فاليوزر الكفيف ميعرفش إن الحجز تم.`,
            how: R`[[gridRow]]: الدقايق من 7:00 ÷ 30 + 1 = رقم الخانة، والمدة ÷ 30 لفوق = عدد الخانات. والـ sticky الأفقي: عمود الوقت [[inset-inline-start: 0]] جوه الـ wrapper اللي بيتسكرول بالعرض، فبيلزق في أوله (اليمين في RTL). و [[scroll-snap-type: x mandatory]] على الـ wrapper و [[scroll-snap-align: start]] على أسامي الأيام: السكرول بيقف على أول يوم كامل، و [[scroll-padding-inline-start: 4.5rem]] عشان اليوم ميقفش تحت عمود الوقت. والـ dialog: [[showModal()]] بيحطه في الـ top layer (فوق أي z-index)، و [[::backdrop]] طبقة تحته، و [[form method="dialog"]] لما يتبعت بيقفل الـ dialog ويحط [[value]] الزرار في [[returnValue]]، و [[formnovalidate]] على «إلغاء» بيعدّي التحقق. والحركة: [[@starting-style]] بيدّي قيمة البداية لما العنصر يظهر، و [[transition-behavior: allow-discrete]] (هنا جوه الـ shorthand) بيخلي [[display]] و [[overlay]] يستنوا الـ transition وهو بيتقفل. والـ live region: قارئ الشاشة بيراقب العناصر اللي عليها [[aria-live]] **من ساعة ما اتعملت**، فالتغيير جواها بيتقري، أما عنصر جديد معمول وفيه النص على طول غالبًا مش بيتقري.`,
            when: R`جدول بالأيام والساعات لأي مواعيد ثابتة في الأسبوع. لو المواعيد بتتداخل في نفس اليوم (حصتين في نفس الوقت في أوضتين)، زوّد أعمدة للأوض أو قسّم الخانة ([[overlaps()]] بتكشفها). [[<dialog>]] لأي سؤال أو فورم قصير بيوقف الشغل لحد ما يتجاوب؛ للحاجات الطويلة صفحة لوحدها. و [[role="status"]] للنجاح، و [[role="alert"]] للأخطاء اللي لازم تتقري حالًا. دروس: «grid»، و «Dialog»، و «aria»، و «Constraint Validation API»، و «dark mode».`,
            mistakes: R`تنسى [[min-width: 0]] على عنصر grid أو flex فيه حاجة عريضة (اتقاس: 1086 على 360). تحط padding على [[<dialog>]] وتقفل بـ [[e.target === dialog]] (اتقاس: الضغط جوه الحافة قفله). تعتمد على رسالة المتصفح (اتقاس: [[Please fill out this field.]]). تنسى [[setCustomValidity("")]] فالحقل يفضل غلط للأبد. تستخدم [[form.name]] (ده اسم الفورم نفسه؛ [[form.elements.name]] هو الحقل). تعمل [[<div aria-live>]] جديد مع كل toast. تحط [[z-index: 9999]] للـ modal بدل [[showModal()]]. الأوقات بخط عادي فالأرقام بتتهز ([[tabular-nums]]). تلوّن الحصة الكاملة بلون بس (هنا: حدود متقطعة والزرار نصه «الحصة كاملة» و [[disabled]]).`,
          },
          teach: R`## الخطوة ٦: جدول الحصص

~~~javascript dashboard/js/schedule.js
// weekly schedule: each class is a button placed on the grid by custom properties (day = column, time = rows)
import { gridRow, toMin } from "./lib.js";
import { openDialog, toast } from "./ui.js";
const DAYS = ["السبت", "الأحد", "الاتنين", "التلات", "الأربع", "الخميس", "الجمعة"];
const week = document.getElementById("week"), dlg = document.getElementById("dlg-class");
const ampm = hhmm => { const m = toMin(hhmm), h = Math.floor(m / 60) % 12 || 12; return h + ":" + String(m % 60).padStart(2, "0") + (m < 720 ? " ص" : " م"); };

function cell(cls, text, vars) {
  const el = document.createElement(cls === "slot" ? "button" : "div");
  el.className = cls;
  el.textContent = text;
  for (const [k, v] of Object.entries(vars)) el.style.setProperty("--" + k, v);
  return el;
}

function slot(c) {
  const { row, span } = gridRow(c.start, c.end);
  const b = cell("slot", "", { col: c.day, row, span, fill: Math.round((c.booked / c.spots) * 100) + "%" });
  b.type = "button";
  b.classList.toggle("full", c.booked >= c.spots);
  const title = document.createElement("b");
  title.textContent = c.title;
  b.append(title, $__bt$__{ampm(c.start)} · $__{c.booked}/$__{c.spots}$__bt);
  b.setAttribute("aria-label", $__bt$__{c.title}، $__{DAYS[c.day]} $__{ampm(c.start)} لـ $__{ampm(c.end)}، $__{c.booked} من $__{c.spots} محجوز$__bt);
  b.onclick = () => {
    document.getElementById("dc-h").textContent = c.title;
    document.getElementById("dc-body").textContent = $__bt$__{DAYS[c.day]}، من $__{ampm(c.start)} لـ $__{ampm(c.end)} مع الكوتش $__{c.coach}. محجوز $__{c.booked} من $__{c.spots}.$__bt;
    const book = document.getElementById("dc-book");
    book.disabled = c.booked >= c.spots;
    book.textContent = book.disabled ? "الحصة كاملة" : "احجز مكان";
    openDialog(dlg, v => {
      if (v !== "book") return;
      c.booked++;
      b.replaceWith(slot(c));
      toast($__btاتحجز مكان في «$__{c.title}» يوم $__{DAYS[c.day]}$__bt);
    });
  };
  return b;
}

export async function loadSchedule() {
  const classes = await (await fetch("data/classes.json")).json();
  const parts = DAYS.map((d, i) => cell("day", d, { col: i }));
  for (let h = 7; h < 22; h++) parts.push(cell("hour", ampm(String(h).padStart(2, "0") + ":00"), { row: (h - 7) * 2 + 1 }));
  week.replaceChildren(...parts, ...classes.map(slot));
}
~~~

- [[DAYS]] من السبت: الأسبوع في مصر بيبدأ السبت، و [[day: 0]] في البيانات = السبت.
- [[ampm]]: [[17:00]] ← [[5:00 م]]. [[% 12 || 12]] عشان 12 الضهر و 12 بالليل ميبقوش 0. و [[m < 720]] (قبل 12:00) = ص.
- [[cell(cls, text, vars)]]: كل الـ custom properties بـ [[style.setProperty("--row", 21)]]، مش [[style="..."]] في HTML. الاتنين بيوصلوا لنفس الحاجة، بس الأولى من CSSOM فمش بتتمنع لو حطيت CSP فيه [[style-src]] من غير [[unsafe-inline]] (من الوثائق).
- [[aria-label]] على كل حصة: الزرار بيتقري الجملة كاملة «تسلّق بالحبل، الاتنين 5:00 م لـ 6:30 م، 6 من 9 محجوز»، بدل الأرقام المتقطعة اللي على الشاشة.
- [[b.replaceWith(slot(c))]] بعد الحجز: الزرار بيترسم من جديد بالعدد الجديد. (اتقاس: بعد الحجز [[document.activeElement]] بقى [[BODY]]، لأن الزرار اللي الـ dialog كان هيرجّع له الفوكس اتشال. عيب حقيقي، والتمرين التالت بيصلّحه.)
- حصص الجمعة: مفيش. والعمود فاضي عن قصد.

### الـ dialog والـ toasts

~~~javascript dashboard/js/ui.js
// toasts in one live region that exists from the start, and a helper for native <dialog>
const box = document.getElementById("toasts");
export function toast(text, ms = 4000) {
  const el = document.createElement("p");
  el.className = "toast";
  el.textContent = text;
  box.append(el);
  setTimeout(() => el.remove(), ms);
}

export function openDialog(dlg, onClose) {
  dlg.returnValue = "";
  dlg.showModal();                                         // modal: focus moves in, Esc closes, the rest of the page is inert
  dlg.addEventListener("close", () => onClose?.(dlg.returnValue), { once: true });
}
// a click on the backdrop lands on the <dialog> itself (the form inside covers the box)
document.addEventListener("click", e => { if (e.target instanceof HTMLDialogElement) e.target.close("cancel"); });
~~~

~~~javascript dashboard/js/app.js
// entry: shell first (so the menu works while data loads), then the three data parts in parallel
import "./shell.js";
import { loadMembers, addMember, nextId } from "./table.js";
import { loadKpis } from "./kpi.js";
import { loadSchedule } from "./schedule.js";
import { openDialog, toast } from "./ui.js";

const members = loadMembers();
members.then(m => loadKpis(m)).catch(() => toast("الأرقام مش متاحة دلوقتي"));
loadSchedule().catch(() => toast("الجدول مش متاح دلوقتي"));

const dlg = document.getElementById("dlg-member"), form = document.getElementById("member-form");
const nameIn = form.elements.name;                          // form.elements: form.name is also the form's own name attribute
nameIn.addEventListener("input", () => nameIn.setCustomValidity(""));
nameIn.addEventListener("invalid", () => nameIn.setCustomValidity(nameIn.validity.valueMissing ? "اكتب اسم العضو" : "الاسم لازم ٣ حروف على الأقل"));
document.getElementById("add").addEventListener("click", () => {
  form.reset();
  openDialog(dlg, v => {
    if (v !== "save") return;
    const name = nameIn.value.trim();
    addMember({ id: nextId(), name, plan: form.elements.plan.value, status: "active", joined: "2026-10-31", lastVisit: "2026-10-31", visits: 0 });
    toast($__btاتضاف «$__{name}»$__bt);
  });
});
~~~

- [[dlg.returnValue = ""]] قبل الفتح: من غير ده لو قفلت بـ Esc المرة دي، [[returnValue]] هيفضل قيمة المرة اللي فاتت ([[save]])، والعضو يتضاف تاني.
- [[{ once: true }]]: الـ listener بيتشال بعد أول [[close]]، فمش بيتراكم مع كل فتحة.
- [[import "./shell.js"]] الأول: القايمة والثيم شغالين وانت لسه بتستنى البيانات.
- [[members.then(m => loadKpis(m))]]: الكروت محتاجة عدد الأعضاء الكلي، فبتستنى الجدول. والجدول الأسبوعي مش محتاج حاجة، فبيتحمّل بالتوازي.
- [[form.reset()]] قبل كل فتح: الفورم يبدأ فاضي.
- [[form.elements.name]]: [[HTMLFormElement]] عنده خاصية [[name]] (اسم الفورم)؛ الحقل اللي اسمه [[name]] بيغطي عليها في Chrome، بس [[elements]] أوضح ومضمون.

### الـ CSS: الجدول الأسبوعي والـ dialog والحركة

~~~css dashboard/css/app.css (السطور 121–151)
/* ---------- schedule: 7 days x 30 half-hours ---------- */
.hint { margin: -0.5rem 0 0.75rem; color: var(--muted); }
.week-wrap { overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-inline-start: 4.5rem; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r); }
.week {
  display: grid; grid-template-columns: 4.5rem repeat(7, minmax(9rem, 1fr)); grid-template-rows: 2.5rem repeat(30, 1.75rem);
  background: repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 3.5rem) 0 2.5rem / 100% calc(100% - 2.5rem) no-repeat;
}
.day { grid-row: 1; grid-column: calc(var(--col) + 2); display: grid; place-items: center; font-weight: 600; border-block-end: 1px solid var(--line); scroll-snap-align: start; }
.hour { white-space: nowrap; grid-column: 1; grid-row: calc(var(--row) + 1) / span 2; position: sticky; inset-inline-start: 0; z-index: 1; background: var(--surface); color: var(--muted); font-size: 0.8rem; padding-inline: 0.5rem; font-variant-numeric: tabular-nums; border-inline-end: 1px solid var(--line); }
.slot {
  grid-column: calc(var(--col) + 2); grid-row: calc(var(--row) + 1) / span var(--span);
  margin: 2px 4px; padding: 0.25rem 0.5rem; border: 1px solid var(--brand); border-radius: 8px; text-align: start; font: inherit; font-size: 0.85rem; line-height: 1.3; color: var(--ink); cursor: pointer; overflow: hidden;
  background: linear-gradient(to left, var(--brand-soft) var(--fill), var(--surface) 0);
}
:dir(ltr) .slot { background: linear-gradient(to right, var(--brand-soft) var(--fill), var(--surface) 0); }
.slot b { display: block; }
.slot.full { border-style: dashed; border-color: var(--muted); }

/* ---------- dialog + toasts ---------- */
dialog { border: 0; border-radius: var(--r); padding: 0; width: min(28rem, calc(100% - 2rem)); background: var(--surface); color: var(--ink); box-shadow: 0 20px 50px rgb(0 0 0 / 0.3);
  opacity: 0; translate: 0 12px; transition: opacity 0.2s, translate 0.2s, overlay 0.2s allow-discrete, display 0.2s allow-discrete; }
dialog[open] { opacity: 1; translate: 0 0; }
@starting-style { dialog[open] { opacity: 0; translate: 0 12px; } }
dialog::backdrop { background: rgb(10 14 20 / 0.55); }
dialog form { display: grid; gap: 1rem; padding: 1.5rem; }   /* padding on the form, so a click on the dialog itself = the backdrop */
dialog label { display: grid; gap: 0.3rem; }
.dlg-actions { display: flex; gap: 0.75rem; }
.toasts { position: fixed; inset-block-end: 1rem; inset-inline-end: 1rem; z-index: var(--z-toast); display: grid; gap: 0.5rem; width: min(22rem, calc(100% - 2rem)); }
.toast { padding: 0.75rem 1rem; border-radius: 10px; background: var(--ink); color: var(--bg); box-shadow: var(--shadow); animation: toast-in 0.25s ease; }
@keyframes toast-in { from { opacity: 0; translate: 0 12px; } }

~~~

~~~css dashboard/css/app.css (آخر 3 سطور)
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
~~~

- [[background: repeating-linear-gradient(...) 0 2.5rem / 100% calc(100% - 2.5rem) no-repeat]]: خط 1px كل 3.5rem (ساعة)، وبيبدأ بعد صف الأيام (2.5rem)، فمفيش ٢١٠ عنصر فاضي للخطوط.
- [[.hour { white-space: nowrap }]]: «10:00 ص» كانت بتتقسم سطرين في عمود 4rem (باين في اللقطة)، فبقت سطر و 4.5rem.
- [[linear-gradient(to left, var(--brand-soft) var(--fill), var(--surface) 0)]]: الجزء المحجوز متلوّن من اليمين (بداية السطر في RTL)، و [[:dir(ltr)]] بيعكسه لو الصفحة اتقلبت. [[0]] في آخر stop = «ابدأ على طول من مكان اللي قبله»، فالحد حاد مش متدرّج.
- [[.slot.full { border-style: dashed }]]: الحصة الكاملة شكلها مختلف من غير ما يبقى اللون هو الفرق الوحيد.
- [[dialog { padding: 0 }]] و [[dialog form { padding: 1.5rem }]]: التصليح بتاع «الضغط على الحافة بيقفل».
- [[@starting-style { dialog[open] { opacity: 0; translate: 0 12px; } }]]: لحظة الفتح بيبدأ شفاف ونازل وبيطلع لمكانه. و [[overlay 0.2s allow-discrete, display 0.2s allow-discrete]]: وهو بيتقفل بيفضل في الـ top layer لحد ما الحركة تخلص (Chrome 117+ و Safari 17.5+ و Firefox 129+، من الوثائق؛ المتصفح القديم بيفتح ويقفل من غير حركة).
- [[.toasts]] بـ [[inset-block-end]] و [[inset-inline-end]]: تحت على الشمال في العربي، وعلى اليمين لو الصفحة LTR.
- reduced motion في الآخر: كل animation و transition = 0.01ms (مش [[none]]، عشان الأحداث زي [[transitionend]] لسه تحصل).

### اتشغّل فعلًا

~~~text node check-dashboard.mjs
dialog open: true | focus: name
2 letters -> message: الاسم لازم ٣ حروف على الأقل
save with empty name -> still open: true | message: اكتب اسم العضو
saved -> open: false | focus back on: add | toast: اتضاف «سارة الجندي» | count: 58 عضو، صفحة 1 من 6
Esc -> open: false | focus: add
click on the dialog's own padding -> open: true
click on the backdrop -> open: false
slots: 15 | first slot --row / grid-row-start / end / column: 21 / 22 / span 3 / 2
booked toast: اتضاف «سارة الجندي» || اتحجز مكان في «أطفال 8–12» يوم السبت
~~~

- [[focus back on: add]]: Chrome رجّع الفوكس لزرار «عضو جديد» لوحده بعد [[close()]]، من غير ولا سطر.
- [[21 / 22 / span 3 / 2]]: [[--row]] = 21 (17:00)، والـ grid حطها في الصف 22 (بعد صف الأيام) لمدة ٣ خانات، في العمود 2 (السبت).
- [[booked toast]]: التنبيهين لسه موجودين لأن كل واحد بيقعد ٤ ثواني، وبيتشالوا لوحدهم.

---

## الغلطات اللي حصلت في الخطوة دي

### ١. scroll أفقي في كل المقاسات

~~~text audit-dashboard.mjs (قبل)
matrix: 360 OVERFLOW 1086 | 390 OVERFLOW 1086 | 768 OVERFLOW 1094 | 1024 OVERFLOW 1334 | 1280 OVERFLOW 1334 | 1440 ok
~~~

~~~text بعد main section { min-width: 0 }
matrix: 360 ok(week scrolls) | 390 ok(week scrolls) | 768 ok(week scrolls) | 1024 ok(week scrolls) | 1280 ok(week scrolls) | 1440 ok
~~~

الـ wrapper عليه [[overflow-x: auto]] من الأول، فكنت متأكد إنه «مش ممكن» يعمل overflow. بس [[main]] نفسه [[display: grid]]، والـ section ابنه، وعنصر الـ grid (زي عنصر الـ flex) [[min-width]] الافتراضي بتاعه [[auto]] = «مش أصغر من محتواه». فالـ section اتمد 1086px، والـ wrapper جواه عرضه 1086 برضه فمفيش حاجة يسكرولها. على 1440 بس المساحة كفاية. [[(week scrolls)]] = الـ wrapper هو اللي بيتسكرول دلوقتي، وده المطلوب.

### ٢. الضغط على حافة الـ dialog بيقفله

~~~text قبل ← بعد (padding على الفورم مش الـ dialog)
click on the dialog's own padding -> open: false
click on the dialog's own padding -> open: true
~~~

[[e.target instanceof HTMLDialogElement]] صح للخلفية، بس الـ padding جزء من الـ dialog، فالضغطة على أول 1.5rem جوه الصندوق كانت بتقفل الفورم واليوزر بيكتب. الحل الأول (padding على الفورم) أبسط من حساب [[getBoundingClientRect]] للضغطة.

### ٣. رسالة إنجليزي في فورم عربي

~~~text قبل [[setCustomValidity]]
save with empty name -> still open: true | message: Please fill out this field.
~~~

رسالة [[required]] بتيجي بلغة **المتصفح** (هنا Chrome إنجليزي)، مش [[lang]] الصفحة. بقت [[اكتب اسم العضو]] و [[الاسم لازم ٣ حروف على الأقل]] حسب [[validity.valueMissing]].

### ٤. لازم الـ live region يبقى موجود من الأول

[[#toasts]] مكتوب في الـ HTML فاضي وعليه [[role="status"]]، و [[toast()]] بيزوّد فقرة **جواه**. لو كل toast عمل [[<div aria-live>]] جديد فيه النص، أغلب قارئات الشاشة مش هتقراه لأنها مكانتش بتراقب العنصر قبل ما النص يتحط (من الوثائق وتجارب منشورة؛ القراية نفسها متجرّبتش بقارئ شاشة في المعمل ده، اللي اتقاس إن النص اتحط جوه العنصر الموجود). نفس الحاجة اتعملت في [[#status]] في الـ portfolio و [[#count]] في الجدول.

---

## الخلاصة

| الحاجة | الطريقة |
|---|---|
| مواعيد على grid | الوقت ← [[--row]] و [[--span]]، واليوم ← [[--col]]، و [[calc()]] في [[grid-row]] |
| جدول عريض في صفحة grid | [[overflow-x: auto]] على الـ wrapper **و** [[min-width: 0]] على عنصر الـ grid |
| modal | [[showModal()]] و [[method="dialog"]] و [[returnValue]]، والـ padding على الفورم |
| رسايل التحقق | [[setCustomValidity]] في [[invalid]] و [[""]] في [[input]] |
| تنبيهات بتتقري | live region واحدة من الأول، والنص بيتحط جواها |
| الثيم | نفس الـ tokens بقيم تانية، و [[boot.js]] قبل الرسم، و [[aria-pressed]] |`,
          sol: R`الحجز بيزوّد العدد في الحصة ويظهر toast تحت، والـ dialog الفاضي بيقول «اكتب اسم العضو»، وبحرفين «الاسم لازم ٣ حروف على الأقل»، وبالاسم الصح بيتقفل والعضو بيتضاف والعدد 58. Esc والخلفية بيقفلوا، والحافة من جوه لأ. ولما تشيل [[min-width: 0]]، [[document.documentElement.scrollWidth]] على 360 بيبقى حوالي 1086.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** حصة من [[21:30]] لـ [[23:00]]. [[gridRow]] هترجّع إيه؟ وهتتعرض فين في الجدول اللي فيه ٣٠ صف بس؟ احسب، وبعدين جرّبها في البيانات.`,
              done: R`حسبت [[row 30 span 3]] يعني آخر صف 32 بره الـ ٣٠، وشفت إن الـ grid عمل صفوف ضمنية (implicit): في المعمل الصفوف بقت 33 بدل 31 والارتفاع 901 بدل 880، وزوّدت فحص بيطبع [[OUTSIDE]] زي سطر الـ ci.`,
            },
            {
              lvl: R`سريع`,
              t: R`**دوّر بنفسك:** من صفحة [[<dialog>]] على MDN اعرف الفرق بين [[close()]] و [[requestClose()]]، وأنهي واحد بيبعت حدث [[cancel]] اللي ممكن تلغيه (عشان تسأل «متأكد؟ فيه كلام متكتب»).`,
              done: R`كتبت إن [[requestClose()]] بيبعت [[cancel]] الأول (وتقدر [[preventDefault()]])، و [[close()]] بيقفل على طول، وإن Esc بيبعت [[cancel]] كمان، وجرّبت تمنع القفل لو الحقل فيه كلام.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**صلّح الكود البايظ:** بعد الحجز الفوكس بيضيع لأن [[b.replaceWith(slot(c))]] بيشيل الزرار اللي الـ dialog هيرجّع له الفوكس. صلّحها من غير ما ترسم الجدول كله من جديد.`,
              done: R`بعد الحجز وقفل الـ dialog [[document.activeElement]] هو زرار الحصة الجديد بالعدد الجديد (مش [[body]])، والحل يا إما بتحدّث نص الزرار القديم وخلفيته بدل ما تبدّله، يا إما [[newBtn.focus()]] بعد [[replaceWith]].`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** على أقل من 48rem اعرض الجدول الأسبوعي كـ agenda: يوم النهارده بس كقايمة حصص بالترتيب، وفوقها ٧ أزرار للأيام ([[aria-pressed]] على اليوم المختار)، واليوم المختار في الرابط ([[?day=2]]) زي فلاتر الجدول.`,
              done: R`على 390 مفيش scroll أفقي خالص والحصص قايمة، والأيام بتتبدّل وبتتحفظ في الرابط و Back بيرجّع اليوم اللي قبله، وعلى الكمبيوتر الـ grid زي ما هو، و axe صفر.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**مسألة:** اكتب [[lanes(classes)]] بتوزّع الحصص المتداخلة في نفس اليوم على «حارات» (أول حارة فاضية في الوقت ده)، وترجّع لكل حصة رقم حارتها وعدد الحارات في يومها، عشان تعرضهم جنب بعض بـ [[grid-column]] فرعي.`,
              done: R`على ٣ حصص يوم الاتنين (5–6:30، و 6–7، و 7–8) بترجّع حارات 0 و 1 و 0 وعدد 2 (التالتة رجعت للحارة الأولى لأن الأولى خلصت)، والحصص اللي بتلمس بعض بس ([[18:30]] و [[18:30]]) مش متداخلة زي [[overlaps]]، وفيه اختبار للتلات حالات.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** اعمل نفس الـ modal بـ [[<div role="dialog" aria-modal="true">]] و JS بإيدك (فوكس أول حقل، و Tab متحبس جواه، و Esc، ورجوع الفوكس، والخلفية inert). عدّ السطور، وشغّل [[check-dashboard.mjs]] على الاتنين، وشوف axe.`,
              done: R`عندك رقمين للسطور (الـ div أكتر بكتير)، والفحوصات بتعدّي على الاتنين أو مكتوب أنهي وقع وليه، وعرفت إن [[<dialog>]] اداك الـ top layer كمان (مفيش z-index بيتغلب عليه).`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`const DAY0 = 7 * 60, SLOT = 30, ROWS = 30;
const toMin = hhmm => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
function gridRow(start, end) { return { row: (toMin(start) - DAY0) / SLOT + 1, span: Math.ceil((toMin(end) - toMin(start)) / SLOT) }; }
const overlaps = (a, b) => a.day === b.day && toMin(a.start) < toMin(b.end) && toMin(b.start) < toMin(a.end);
const ampm = hhmm => { const m = toMin(hhmm), h = Math.floor(m / 60) % 12 || 12; return h + ":" + String(m % 60).padStart(2, "0") + (m < 720 ? " ص" : " م"); };
for (const [s, e] of [["07:00", "08:00"], ["17:00", "18:30"], ["20:30", "22:00"], ["21:30", "23:00"]]) {
  const g = gridRow(s, e), last = g.row + g.span - 1;
  console.log(s + "-" + e + " row " + g.row + " span " + g.span + (last > ROWS ? " OUTSIDE (last row " + last + ")" : ""));
}
const a = { day: 1, start: "17:00", end: "18:30" };
console.log("touching: " + overlaps(a, { day: 1, start: "18:30", end: "19:00" }) + " | overlapping: " + overlaps(a, { day: 1, start: "18:00", end: "19:00" }) + " | other day: " + overlaps(a, { day: 2, start: "17:00", end: "18:00" }));
console.log("ampm: " + ["07:00", "12:30", "00:15", "20:30"].map(ampm).join(" | "));`,
              expect: [
                R`07:00-08:00 row 1 span 2`,
                R`17:00-18:30 row 21 span 3`,
                R`21:30-23:00 row 30 span 3 OUTSIDE (last row 32)`,
                R`touching: false | overlapping: true | other day: false`,
                R`ampm: 7:00 ص | 12:30 م | 12:15 ص | 8:30 م`,
              ],
            },
          ],
        },
        {
          cmd: R`المراجعة النهائية: مقاسات و a11y وأداء ونشر`,
          title: R`قبل ما تسلّم: مصفوفة مقاسات من 360 لـ 1440، و axe في الثيمين واللغتين (وليه axe سكت عن كلمة «نشط»)، ومشي بالكيبورد، و CLS و LCP على موبايل بطيء، والنشر على GitHub Pages تحت /repo/، وكل الغلطات في جدول`,
          learn: R`تعمل مراجعة تسليم كاملة بسكربتات بتتعاد في ثواني: overflow على ٦ مقاسات لكل صفحة، و axe على كل صفحة × ثيمين × لغتين ومع الـ dialog والـ drawer مفتوحين، وترتيب الـ Tab، و CLS و LCP بالوسط بتاع ٣، وتعرف حدود axe (بيعدّي كلمات عربي من غير ما يفحصها)، وتنشر صح تحت مسار فرعي، وتعرف المشروع بيكبر إزاي وبيتكلف كام.`,
          out: R`٤ سكربتات بتطبع: صفر overflow في ٢٤ خانة، و صفر violations في ٢٠ فحص axe، و CLS = 0 في كل الصفحات، و LCP حوالي 220–320ms (موبايل و CPU ×4)، و [[0]] طلبات 404 تحت [[/nadine-site/]]، وجدول بالـ ٣٠ غلطة وتجربة.`,
          use: {
            prog: R`درس «مصفوفة مقاسات» و «axe و Lighthouse» و «كيبورد وقارئ شاشة» و «CLS» بيتطبقوا على المنتجين مع بعض. والفكرة الأهم: الفحص كود بيتعاد، مش «بصّيت عليها».`,
            work: R`ده اللي بيفرق بين «خلصت» و «اتسلّم»: تقرير فيه أرقام على كل صفحة، وتعرف تقول للعميل «الموقع بيفتح في ثلث ثانية على موبايل متوسط، وبيشتغل بالكيبورد، ومفيش scroll جانبي على أي موبايل». والسكربتات نفسها تتحط في CI.`,
            cs: R`الأدوات الأوتوماتيك بتلاقي جزء بس من مشاكل الـ accessibility، وليها heuristics ممكن تغلط (هنا: كشف الـ icon ligatures بيغلط في العربي). والقياس الإحصائي: أول تشغيل دايمًا أبطأ (cold start)، فالوسط من ٣ أصدق من رقم واحد.`,
          },
          desc: R`المنتجين خلصوا. الدرس ده المراجعة اللي بتتعمل قبل أي تسليم، بالسكربتات اللي اتبنت في الوحدة، وبالأرقام النهائية:

| الفحص | portfolio (٣ صفحات) | dashboard |
|---|---|---|
| overflow من 360 لـ 1440 (٦ عروض) | صفر في الـ ١٨ خانة | صفر في الـ ٦، والجدول الأسبوعي بس اللي بيتسكرول |
| axe (WCAG 2.2 AA) | صفر في ١٢ فحص (٣ صفحات × ثيمين × لغتين) | صفر في ٨ (ثيمين × عرضين، ومع الـ dialog أو الـ drawer مفتوح) |
| CLS (390، CPU ×4) | 0 | 0 والبيانات متأخرة 1.2 ثانية |
| LCP (الوسط بتاع ٣) | 304–320ms | 208–220ms |
| HTML و CSS و JS | 30.5 كيلو | 41 كيلو |
| الكيبورد | skip link ثم Tab بيدخل main، والفلتر بالأسهم | الـ Tab بيمشي بالترتيب، والـ drawer والـ dialog بيرجّعوا الفوكس |

**والمفاجأة:** axe قال صفر violations، بس لون «نشط» كان 4.35:1. لما غيّرته لـ **1.76:1** (أخضر فاتح جدًا) axe قال **صفر برضه**. السبب في كود axe-core 4.14 نفسه: بيكشف «icon ligatures» (خطوط الأيقونات اللي بتحوّل كلمة لرسمة) بإنه بيقيس عرض الكلمة مكتوبة مرة واحدة مقابل حروفها لوحدها، والحروف العربي **بتتوصل** فالكلمة أقصر من حروفها، فـ «نشط» اتحسبت أيقونة واتشالت من الفحص. «نظرة عامة» اتفحصت، و «نشط» و «الاشتراك نشط» لأ. الدرس: فحص التباين للـ tokens بنفسك (درس الخريطة) مش اختياري في موقع عربي.

**النشر:** GitHub Pages بيحط الـ project site على [[/<اسم الـ repo>/]] مش على [[/]]. اتجرّب بسيرفر بيقلّد ده: المسارات النسبية ([[css/site.css]]) **صفر 404**، والمسارات اللي بتبدأ بـ [[/]] **٥ طلبات 404** والصفحة اتعرضت بـ Times New Roman من غير CSS. وخطوات الرفع نفسها من وثائق GitHub (متعملتش هنا عشان ميتعملش repo حقيقي).`,
          example: R`node check-portfolio.mjs
node check-dashboard.mjs
node audit-dashboard.mjs
node vitals.mjs "http://127.0.0.1:5502/?delay=1200"
node subpath.mjs
gh repo create nadine-site --public --source . --push`,
          lines: [
            R`الـ portfolio كله: اللغة، والفلتر، والظهور، والانتقال، والطباعة، و axe على ٣ صفحات × ثيمين × لغتين، والـ matrix، و CLS و LCP. حوالي دقيقة، والسيرفر لازم يكون شغال.`,
            R`الـ dashboard وظيفيًا: الرابط بعد كل فعل و Back، والحالات، والـ dialog والفوكس، والـ sidebar، والثيم. السطر الوحيد في [[page errors]] هو الـ 500 المتعمّد من [[?fail=1]].`,
            R`مراجعة الـ dashboard: axe في ٨ حالات، والـ matrix، وترتيب الـ Tab، والـ sticky، والـ roles على الموبايل، و CLS و LCP.`,
            R`٣ مرات على موبايل 390 و CPU ×4 والبيانات متأخرة 1.2 ثانية، وبيطبع كل shift بالنص اللي اتحرك. أول مرة دايمًا أبطأ (Chrome بارد)، فبص على التانية والتالتة.`,
            R`بيقلّد GitHub Pages: الموقع تحت [[/nadine-site/]]، وبيعدّ الـ 404 للنسخة المنشورة وللنسخة اللي مساراتها بـ [[/]].`,
            R`من الوثائق (متشغّلش هنا): بيعمل repo عام على GitHub من الفولدر الحالي ويرفعه. [[--source .]] = الفولدر ده، و [[--push]] = ارفع الـ commits. لازم [[git init]] و commit قبله، و [[gh auth login]] مرة واحدة.`,
          ],
          try: R`شغّل السكربتات الأربعة على نسختك واكتب الأرقام في جدول زي اللي في الـ desc. لو أي رقم مختلف، اعرف ليه قبل ما تكمّل. وبعدين جرّب تجربة axe بنفسك: صفحة فيها [[<p style="color:#7fc493;background:#dcf3e3">نشط</p>]] وصفحة فيها نفس اللون على «نظرة عامة»، وشغّل axe على الاتنين. وفي الآخر شغّل [[subpath.mjs]] وغيّر لينك واحد في [[index.html]] لـ [[/css/site.css]] وشوف الـ 404.`,
          flag: R`term`,
          deep: {
            why: R`كل غلطة في الوحدة دي كانت «شكلها سليم» عندي على الكمبيوتر: الـ scroll الأفقي كان في كل المقاسات ما عدا 1440 (المقاس اللي كنت شغال عليه)، والـ CLS كان بالإنجليزي بس، وال 404 تحت المسار الفرعي بس، والتباين الضعيف كان في كلمة axe مبيفحصهاش. المراجعة بسكربت بتلاقي اللي العين مبتلاقيهوش، وبتتعاد بعد كل تعديل في ثواني.`,
            how: R`كل سكربت بيفتح Chrome المتسطّب بـ playwright-core ([[channel: "chrome"]])، وكل [[browser.newContext()]] جلسة نضيفة (من غير localStorage ولا كاش) بخياراتها: [[viewport]] و [[colorScheme]] و [[reducedMotion]] و [[javaScriptEnabled]]. الـ overflow = [[document.documentElement.scrollWidth > innerWidth]]. axe بيتحقن في الصفحة وبيرجّع [[violations]] و [[passes]] و [[incomplete]] (اللي مقدرش يحكم عليه، زي نص على gradient: ٢١ عنصر هنا) و [[inapplicable]] (القاعدة مش بتنطبق، وده اللي حصل للـ badge). والكيبورد [[page.keyboard.press("Tab")]] و [[document.activeElement]]. والـ CLS و LCP بـ [[PerformanceObserver]] من [[addInitScript]] قبل أي سكربت في الصفحة، والـ CPU بـ [[Emulation.setCPUThrottlingRate]]. والمسار الفرعي: سيرفر صغير بيرد بس على اللي بيبدأ بـ [[/nadine-site/]]، فأي [[/css/...]] بيرجع 404 زي GitHub Pages بالظبط.`,
            when: R`قبل كل تسليم، وبعد كل تعديل كبير، وفي CI على كل push (السكربتات بترجع exit code لو حوّلتها PASS/FAIL زي [[check.mjs]] في درس «مشروع تشخيص موقع بطيء ومكسور» في تاب المتصفح). وبعد ما الموقع يتنشر شغّل نفس الـ matrix و axe على الرابط الحقيقي، وزوّد Lighthouse مرة. وفحص التباين بالـ tokens في كل مشروع عربي حتى لو axe أخضر.`,
            mistakes: R`تثق في axe صفر (اتقاس: «نشط» بـ 1.76:1 عدّت). تعمل [[browser.newPage()]] وتدّيها لـ [[AxeBuilder]] (اتقاس: [[Error: Please use browser.newContext()]]). تقيس LCP مرة واحدة (أول مرة 1132–1208ms، والتانية 208–320). تختبر على المقاس اللي بتشتغل عليه بس. تكتب [[href="/css/site.css"]] لأنها شغالة على [[localhost]] (اتقاس: ٥ طلبات 404 تحت [[/repo/]]). تنسى تغيّر [[canonical]] و [[og:url]] و [[og:image]] للدومين الحقيقي بعد النشر. تنشر الـ dashboard للعامة وتفتكر إن [[noindex]] حماية.`,
          },
          teach: R`## المراجعة: السكربتات كاملة

~~~javascript check-portfolio.mjs
// node check-portfolio.mjs : language switch, :has() filter, reveal, View Transition, print, axe, overflow matrix, CLS/LCP
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const B = "http://127.0.0.1:5501/";
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", e => errors.push(e.message));
page.on("console", m => m.type() === "error" && errors.push(m.text()));

// 1. language switch
await page.goto(B);
const before = await page.evaluate(() => [document.documentElement.lang, document.documentElement.dir, document.querySelector("h1").textContent, getComputedStyle(document.querySelector(".brand")).marginInlineEnd]);
await page.click("#lang");
const after = await page.evaluate(() => [document.documentElement.lang, document.documentElement.dir, document.querySelector("h1").textContent, document.title, document.querySelector(".brand").getBoundingClientRect().left]);
console.log("lang before:", before.slice(0, 3).join(" | "));
console.log("lang after: ", after.slice(0, 4).join(" | "), "| brand x =", Math.round(after[4]));
await page.reload();
console.log("after reload:", await page.evaluate(() => document.documentElement.lang + " " + document.querySelector("h1").textContent));
await page.click("#lang");   // back to Arabic for the rest

// 2. filter with :has()
for (const f of ["all", "web", "a11y", "api", "design"]) {
  await page.check($__btinput[value="$__{f}"]$__bt);
  const n = await page.$$eval(".card", cs => cs.filter(c => getComputedStyle(c).display !== "none").length);
  console.log("filter", f.padEnd(6), "visible cards:", n);
}
await page.check('input[value="all"]');

// 3. reveal: cards below the fold are hidden until scrolled to
await page.goto(B);
const op = await page.$$eval(".card", cs => cs.map(c => getComputedStyle(c).opacity));
console.log("card opacity at load:", op.join(" "));
await page.locator(".card").last().scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
console.log("after scroll:", (await page.$$eval(".card", cs => cs.map(c => getComputedStyle(c).opacity))).join(" "));
const still = await browser.newContext({ reducedMotion: "reduce" });
const sp = await still.newPage(); await sp.goto(B);
console.log("reduced motion at load:", (await sp.$$eval(".card", cs => cs.map(c => getComputedStyle(c).opacity + "/" + getComputedStyle(c).transitionDuration))).join(" "));
const nojs = await browser.newContext({ javaScriptEnabled: false });
const np = await nojs.newPage(); await np.goto(B);
console.log("no JS:", (await np.$$eval(".card", cs => cs.map(c => getComputedStyle(c).opacity))).join(" "));

// 4. View Transition between the pages
await page.addInitScript(() => addEventListener("pagereveal", e => { window.__vt = e.viewTransition ? "yes" : "no"; }));
await page.goto(B);
await page.click('a[href="work/tide-notes.html"]');
await page.waitForLoadState("load");
console.log("view transition on the case page:", await page.evaluate(() => window.__vt));
await sp.addInitScript(() => addEventListener("pagereveal", e => { window.__vt = e.viewTransition ? "yes" : "no"; }));
await sp.goto(B); await sp.click('a[href="work/tide-notes.html"]'); await sp.waitForLoadState("load");
const anim = await sp.evaluate(() => window.__vt);
console.log("with reduced motion: transition object =", anim, "(the CSS sets animation: none)");

// 5. print: what hides, and how many A4 pages
for (const p of ["", "cv.html"]) {
  await page.goto(B + p);
  await page.emulateMedia({ media: "print" });
  const hidden = await page.$$eval(".top, .lang, #print", els => els.map(e => getComputedStyle(e).display));
  const pdf = await page.pdf({ format: "A4", preferCSSPageSize: true });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log("print", (p || "index.html").padEnd(10), "pages:", pages, "header display:", hidden.join(","));
  await page.emulateMedia({ media: "screen" });
}

// 6. axe on every page, both languages, both themes
for (const p of ["", "work/tide-notes.html", "cv.html"]) {
  for (const scheme of ["light", "dark"]) {
    for (const lang of ["ar", "en"]) {
      const c = await browser.newContext({ colorScheme: scheme });
      const pg = await c.newPage();
      if (lang === "en") await pg.addInitScript(() => localStorage.setItem("lang", "en"));
      await pg.goto(B + p);
      await pg.evaluate(() => document.querySelectorAll("[data-reveal]").forEach(e => e.classList.add("in")));
      await pg.waitForTimeout(700);
      const r = await new AxeBuilder({ page: pg }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      console.log("axe", (p || "index.html").padEnd(20), scheme.padEnd(5), lang, "violations:", r.violations.length, r.violations.map(v => v.id + "(" + v.nodes.length + ")").join(" "));
      await c.close();
    }
  }
}

// 7. overflow matrix
for (const p of ["", "work/tide-notes.html", "cv.html"]) {
  const row = [];
  for (const w of [360, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.goto(B + p);
    const [sw, iw] = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
    row.push(w + (sw > iw ? " OVERFLOW " + sw : " ok"));
  }
  console.log("matrix", (p || "index.html").padEnd(20), row.join(" | "));
}

// 8. CLS and LCP on a mid phone, 4x slower CPU
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mp = await m.newPage();
const cdp = await m.newCDPSession(mp);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await mp.addInitScript(() => {
  window.__cls = 0; window.__lcp = 0; window.__lcpEl = "";
  new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver(l => { const e = l.getEntries().at(-1); window.__lcp = e.startTime; window.__lcpEl = e.element?.tagName + "." + (e.element?.className || ""); }).observe({ type: "largest-contentful-paint", buffered: true });
});
for (const p of ["", "work/tide-notes.html", "cv.html"]) {
  await mp.goto(B + p); await mp.waitForTimeout(1500);
  const r = await mp.evaluate(() => [window.__cls.toFixed(4), Math.round(window.__lcp), window.__lcpEl]);
  console.log("vitals", (p || "index.html").padEnd(20), "CLS", r[0], "LCP", r[1] + "ms", r[2]);
}
console.log("page errors:", errors.length ? errors : "none");
await browser.close();
~~~

- [[page.on("pageerror")]] و [[console]] من نوع [[error]]: أي خطأ JS أو طلب فاشل بيتجمع ويتطبع في الآخر. ده اللي مسك الـ 404 بتاع [[favicon.ico]] في أول تشغيل.
- [[withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])]]: قواعد WCAG بس لحد 2.2 AA (من غير [[best-practice]]).
- قبل axe: [[classList.add("in")]] على كل الكروت و 700ms: axe بيحسب التباين من اللون المرسوم، والكارت الشفاف كان هيطلّع تباين غلط.
- [[addInitScript(() => localStorage.setItem("lang", "en"))]]: الجلسة تبدأ إنجليزي من غير ما تدوس الزرار.

~~~javascript check-dashboard.mjs
// node check-dashboard.mjs : URL state, sort, states, dialog, toasts, sidebar, theme, axe, matrix, vitals
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const B = "http://127.0.0.1:5502/";
const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", e => errors.push(e.message));
page.on("console", m => m.type() === "error" && errors.push(m.text()));
const rows = () => page.$$eval("#rows tr", t => t.map(r => r.cells[0].textContent));
const say = (...a) => console.log(...a);

// 1. data + KPIs
await page.goto(B);
await page.waitForSelector("#rows tr:not(.skel)");
say("count:", await page.textContent("#count"));
say("kpi:", await page.$$eval(".k-num", e => e.map(x => x.textContent).join(" | ")), "| delta:", await page.textContent("#k-delta"));
say("spark points:", (await page.getAttribute("#spark", "points")).split(" ").length, "| ring offset:", await page.$eval("#ring", e => getComputedStyle(e).strokeDashoffset));

// 2. URL state: filter, sort, page, back
await page.selectOption("select[name=status]", "frozen");
say("after status=frozen:", page.url().replace(B, "/"), "|", await page.textContent("#count"));
await page.click('th[data-sort="visits"] button');
await page.click('th[data-sort="visits"] button');
say("after sort visits twice:", page.url().replace(B, "/"), "| aria-sort:", await page.getAttribute('th[data-sort="visits"]', "aria-sort"));
await page.goBack();
say("after Back:", page.url().replace(B, "/"), "| aria-sort:", await page.getAttribute('th[data-sort="visits"]', "aria-sort"));
await page.goto(B + "?page=4&sort=lastVisit&dir=desc");
await page.waitForSelector("#rows tr:not(.skel)");
say("open ?page=4&sort=lastVisit&dir=desc:", await page.textContent("#count"), "| first row:", (await rows())[0]);
await page.goto(B + "?page=99");
await page.waitForSelector("#rows tr:not(.skel)");
say("open ?page=99 ->", page.url().replace(B, "/"), "|", await page.textContent("#count"));
await page.goto(B);
await page.waitForSelector("#rows tr:not(.skel)");
const len0 = await page.evaluate(() => history.length);
await page.fill("input[name=q]", "ادم");
await page.waitForTimeout(400);
say("search ادم:", decodeURIComponent(page.url().replace(B, "/")), "| rows:", (await rows()).join(", "), "| history grew by", (await page.evaluate(() => history.length)) - len0);
await page.fill("input[name=q]", "zzz");
await page.waitForTimeout(400);
say("empty state:", await page.textContent("#rows"));
await page.click("#rows button");
await page.waitForTimeout(50);
say("after clear:", page.url().replace(B, "/"), "|", await page.textContent("#count"));

// 3. loading and error states
await page.goto(B + "?delay=1200");
await page.waitForTimeout(300);
say("while loading:", await page.$$eval("#rows tr.skel", t => t.length), "skeleton rows, aria-busy =", await page.getAttribute("#table", "aria-busy"), "| count:", await page.textContent("#count"));
await page.goto(B + "?fail=1");
await page.waitForSelector(".state-row.error");
say("error:", await page.textContent(".state-row.error"), "| focus on:", await page.evaluate(() => document.activeElement.textContent));
await page.click(".state-row.error button");
await page.waitForSelector("#rows tr:not(.skel):not(.state-row)");
say("after retry:", await page.textContent("#count"));

// 4. dialog + toast
await page.goto(B);
await page.waitForSelector("#rows tr:not(.skel)");
await page.click("#add");
say("dialog open:", await page.$eval("#dlg-member", d => d.open), "| focus:", await page.evaluate(() => document.activeElement.name));
await page.click('#member-form button[value="save"]');
await page.fill("#member-form input[name=name]", "سا");
await page.click('#member-form button[value="save"]');
say("2 letters -> message:", await page.$eval("#member-form input[name=name]", i => i.validationMessage));
await page.fill("#member-form input[name=name]", "");
await page.click('#member-form button[value="save"]');
say("save with empty name -> still open:", await page.$eval("#dlg-member", d => d.open), "| message:", await page.$eval("#member-form input[name=name]", i => i.validationMessage));
await page.fill("#member-form input[name=name]", "سارة الجندي");
await page.click('#member-form button[value="save"]');
await page.waitForTimeout(100);
say("saved -> open:", await page.$eval("#dlg-member", d => d.open), "| focus back on:", await page.evaluate(() => document.activeElement.id), "| toast:", await page.textContent("#toasts"), "| count:", await page.textContent("#count"));
await page.click("#add");
await page.keyboard.press("Escape");
say("Esc -> open:", await page.$eval("#dlg-member", d => d.open), "| focus:", await page.evaluate(() => document.activeElement.id));
await page.click("#add");
const box = await page.$eval("#dlg-member", d => { const r = d.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
await page.mouse.click(box.x + box.w / 2, box.y + 8);            // inside the dialog, on its padding
say("click on the dialog's own padding -> open:", await page.$eval("#dlg-member", d => d.open));
if (await page.$eval("#dlg-member", d => d.open)) { await page.mouse.click(5, 5); }
say("click on the backdrop -> open:", await page.$eval("#dlg-member", d => d.open));

// 5. schedule
const slots = await page.$$eval(".slot", s => s.map(b => [b.style.getPropertyValue("--row"), getComputedStyle(b).gridRowStart, getComputedStyle(b).gridRowEnd, getComputedStyle(b).gridColumnStart]));
say("slots:", slots.length, "| first slot --row / grid-row-start / end / column:", slots[0].join(" / "));
await page.click(".slot:not(.full)");
await page.click("#dc-book");
await page.waitForTimeout(100);
say("booked toast:", await page.$$eval(".toast", t => t.map(x => x.textContent).join(" || ")));

// 6. sidebar collapse and the drawer
await page.click("#collapse");
await page.waitForTimeout(400);
say("collapsed: side width", await page.$eval("#side", e => Math.round(e.getBoundingClientRect().width)), "| link names:", await page.$$eval("#side nav a", a => a.map(x => x.textContent.trim()).join(", ")), "| aria-expanded:", await page.getAttribute("#collapse", "aria-expanded"));
await page.click("#collapse");
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(400);
say("narrow: side visibility", await page.$eval("#side", e => getComputedStyle(e).visibility), "| menu shown:", await page.$eval("#menu", e => getComputedStyle(e).display));
await page.click("#menu");
await page.waitForTimeout(300);
say("drawer open: focus", await page.evaluate(() => document.activeElement.textContent.trim()), "| main inert:", await page.$eval("#main", e => e.inert), "| side x:", await page.$eval("#side", e => Math.round(e.getBoundingClientRect().right)));
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
say("Esc: focus on", await page.evaluate(() => document.activeElement.id), "| main inert:", await page.$eval("#main", e => e.inert), "| side visibility:", await page.$eval("#side", e => getComputedStyle(e).visibility));

// 7. theme
await page.click("#theme");
say("theme:", await page.evaluate(() => document.documentElement.dataset.theme), "| bg:", await page.$eval("body", e => getComputedStyle(e).backgroundColor), "| pressed:", await page.getAttribute("#theme", "aria-pressed"));
await page.reload();
say("after reload:", await page.evaluate(() => document.documentElement.dataset.theme), "| pressed:", await page.getAttribute("#theme", "aria-pressed"));
say("page errors:", errors.length ? errors : "none");
await browser.close();
~~~

~~~javascript audit-dashboard.mjs
// node audit-dashboard.mjs : axe, overflow matrix, keyboard walk, sticky header, mobile table roles, CLS/LCP
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const B = "http://127.0.0.1:5502/";
const browser = await chromium.launch({ channel: "chrome" });
const ready = p => p.waitForSelector("#rows tr:not(.skel)");

// 1. axe: 2 themes x 2 widths, plus with the dialog open and the drawer open
for (const scheme of ["light", "dark"]) for (const w of [1280, 390]) {
  const c = await browser.newContext({ colorScheme: scheme, viewport: { width: w, height: 900 } });
  const p = await c.newPage(); await p.goto(B); await ready(p); await p.waitForTimeout(900);
  const r = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  console.log("axe", scheme.padEnd(5), String(w).padEnd(4), "violations:", r.violations.length, r.violations.map(v => v.id + "(" + v.nodes.length + ") " + v.nodes[0].target.join(" ")).join(" ; "));
  if (w === 1280) { await p.click("#add"); await p.waitForTimeout(300); } else { await p.click("#menu"); await p.waitForTimeout(400); }
  const r2 = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  console.log("   with", w === 1280 ? "dialog" : "drawer", "open:", r2.violations.length, r2.violations.map(v => v.id + "(" + v.nodes.length + ")").join(" "));
  await c.close();
}

// 2. overflow matrix (page) and which parts scroll on purpose
const page = await browser.newPage();
const row = [];
for (const w of [360, 390, 768, 1024, 1280, 1440]) {
  await page.setViewportSize({ width: w, height: 900 }); await page.goto(B); await ready(page); await page.waitForTimeout(300);
  const r = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth, document.querySelector(".week-wrap").scrollWidth > document.querySelector(".week-wrap").clientWidth]);
  row.push(w + (r[0] > r[1] ? " OVERFLOW " + r[0] : " ok") + (r[2] ? "(week scrolls)" : ""));
}
console.log("matrix:", row.join(" | "));

// 3. keyboard walk from the top on desktop
await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(B); await ready(page);
const stops = [];
for (let i = 0; i < 16; i++) {
  await page.keyboard.press("Tab");
  stops.push(await page.evaluate(() => { const a = document.activeElement; return (a.getAttribute("aria-label") || a.textContent.trim() || a.name || a.tagName).slice(0, 18); }));
}
console.log("tab order:", stops.join(" → "));

// 4. sticky header: scroll the page and see where the header row is
await page.evaluate(() => scrollTo(0, document.getElementById("members").offsetTop + 300));
await page.waitForTimeout(200);
console.log("sticky th top after scroll:", await page.$eval(".members thead th", th => Math.round(th.getBoundingClientRect().top)), "| topbar height:", await page.$eval(".topbar", e => Math.round(e.getBoundingClientRect().height)));

// 5. what a screen reader gets from the table at 390 (rows turned into cards with display:block)
await page.setViewportSize({ width: 390, height: 900 }); await page.goto(B); await ready(page);
const snap = await page.locator("#table").ariaSnapshot();
console.log("aria at 390:", snap.split("\n").slice(0, 6).join(" / "));

// 6. CLS and LCP: data 1.2 s late, phone width, 4x CPU
for (const q of ["", "?delay=1200"]) {
  const c = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await (await c.newCDPSession(p)).send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.addInitScript(() => {
    window.__cls = 0; window.__src = [];
    new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) { window.__cls += e.value; window.__src.push(...e.sources.map(s => s.node?.id || s.node?.className || s.node?.nodeName)); } })).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver(l => { const e = l.getEntries().at(-1); window.__lcp = Math.round(e.startTime); window.__el = e.element?.id || e.element?.className || e.element?.tagName; }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await p.goto(B + q); await p.waitForTimeout(3000);
  console.log("vitals", (q || "fast data").padEnd(12), await p.evaluate(() => "CLS " + window.__cls.toFixed(4) + " LCP " + window.__lcp + "ms " + window.__el + (window.__src.length ? " | moved: " + [...new Set(window.__src)].join(",") : "")));
  await c.close();
}
await browser.close();
~~~

~~~javascript vitals.mjs
// node vitals.mjs <url> : CLS and LCP, phone width, 4x slower CPU, 3 runs, every shift printed with its text
import { chromium } from "playwright-core";
const url = process.argv[2];
const browser = await chromium.launch({ channel: "chrome" });
for (let i = 1; i <= 3; i++) {
  const c = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await c.newPage();
  await (await c.newCDPSession(p)).send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await p.addInitScript(() => {
    window.__cls = 0; window.__s = [];
    new PerformanceObserver(l => l.getEntries().forEach(e => { if (e.hadRecentInput) return; window.__cls += e.value;
      e.sources.forEach(s => window.__s.push(e.value.toFixed(4) + " " + (s.node?.nodeName === "#text" ? '"' + s.node.textContent.trim().slice(0, 30) + '" in ' + s.node.parentElement?.className : s.node?.id || s.node?.className || s.node?.nodeName))); })).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver(l => { const e = l.getEntries().at(-1); window.__lcp = Math.round(e.startTime); window.__el = e.element?.id || e.element?.tagName; }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await p.goto(url); await p.waitForTimeout(3000);
  console.log("run", i, await p.evaluate(() => "CLS " + window.__cls.toFixed(4) + " LCP " + window.__lcp + "ms " + window.__el + (window.__s.length ? " | " + window.__s.join(" ; ") : "")));
  await c.close();
}
await browser.close();
~~~

~~~javascript kb-port.mjs
import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await (await b.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
await p.goto("http://127.0.0.1:5501/");
const name = () => p.evaluate(() => { const a = document.activeElement; return (a.type === "radio" ? "radio:" + a.value : a.textContent.trim()).slice(0, 16); });
const stops = [];
for (let i = 0; i < 11; i++) { await p.keyboard.press("Tab"); stops.push(await name()); }
console.log("tab:", stops.join(" → "));
await p.focus('input[value="all"]'); await p.keyboard.press("ArrowLeft");
console.log("ArrowLeft on «الكل» →", await name(), "| visible cards:", await p.$$eval(".card", cs => cs.filter(c => getComputedStyle(c).display !== "none").length));
await p.keyboard.press("Tab");
console.log("Tab from the group →", await name());
await p.goto("http://127.0.0.1:5501/"); await p.keyboard.press("Tab"); await p.keyboard.press("Enter");
console.log("skip link + Enter → focus in:", await p.evaluate(() => document.activeElement.id || document.activeElement.tagName), "| url:", p.url().split("/").pop());
await p.keyboard.press("Tab"); console.log("next Tab →", await name());
await b.close();
~~~

---

## النتايج

### المقاسات

~~~text
matrix index.html           360 ok | 390 ok | 768 ok | 1024 ok | 1280 ok | 1440 ok
matrix work/tide-notes.html 360 ok | 390 ok | 768 ok | 1024 ok | 1280 ok | 1440 ok
matrix cv.html              360 ok | 390 ok | 768 ok | 1024 ok | 1280 ok | 1440 ok
dashboard: 360 ok(week scrolls) | 390 ok(week scrolls) | 768 ok(week scrolls) | 1024 ok(week scrolls) | 1280 ok(week scrolls) | 1440 ok
~~~

### axe

~~~text
axe index.html           light ar violations: 0      (و light en و dark ar و dark en: 0)
axe work/tide-notes.html light ar violations: 0      (والتلاتة التانيين: 0)
axe cv.html              light ar violations: 0      (والتلاتة التانيين: 0)
axe light 1280 violations: 0 / with dialog open: 0
axe light 390  violations: 0 / with drawer open: 0
axe dark  1280 violations: 0 / with dialog open: 0
axe dark  390  violations: 0 / with drawer open: 0
~~~

### الكيبورد

~~~text portfolio
tab: اتخطّى للمحتوى → نادين فؤاد → الشغل → عني → تواصل → السيرة الذاتية → English → شوف الشغل → كلّمني → radio:all → Tide Notes: ملاح
skip link + Enter → focus in: BODY | url: #main
next Tab → شوف الشغل
~~~

~~~text dashboard
tab order: اتخطّى للمحتوى → القايمة الجانبية → نظرة عامة → الأعضاء → جدول الحصص → الوضع الداكن → عضو جديد → q → الكلنشطمتجمّدمنتهي → الكلشهري3 شهورسنوي → امسح الفلاتر → الاسم → الباقة → الحالة → آخر زيارة → زيارات الشهر
~~~

- الـ skip link في الـ portfolio: [[activeElement]] فضل [[BODY]] لأن [[<main>]] هناك ملوش [[tabindex="-1"]]، بس Chrome نقل «نقطة بداية الـ Tab» للـ main، فالـ Tab اللي بعدها راح لـ «شوف الشغل». في الـ dashboard [[main]] عليه [[tabindex="-1"]] فبياخد الفوكس نفسه (أوضح لقارئ الشاشة).
- [[q]] و [[الكلنشط...]]: السكربت بيطبع [[name]] أو [[textContent]] للعنصر؛ قارئ الشاشة بيقرا الـ label («دوّر بالاسم أو الرقم»، و «الحالة، الكل»).

### الأداء

~~~text vitals.mjs (390، CPU ×4)
dashboard ?delay=1200: run 1 CLS 0.0000 LCP 1208ms H1 | run 2 CLS 0.0000 LCP 220ms H1 | run 3 CLS 0.0000 LCP 208ms H1
portfolio:             run 1 CLS 0.0000 LCP 1132ms P  | run 2 CLS 0.0000 LCP 320ms P  | run 3 CLS 0.0000 LCP 304ms P
~~~

- run 1 دايمًا حوالي ثانية: Chrome لسه فاتح (أول ما يحمّل الـ JS والخطوط). مش رقم الموقع.
- الـ LCP في الـ dashboard هو [[<h1>]] في الـ topbar مش الجدول: الجدول بيترسم skeleton الأول، والـ skeleton مش نص فمبيتحسبش.
- مفيش خط من بره ولا صورة كبيرة في أول شاشة ولا مكتبة: الصفحة كلها ٣٠–٤١ كيلو HTML و CSS و JS.

---

## ليه axe سكت عن «نشط»؟

~~~javascript axe-iso2.mjs
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
const b = await chromium.launch({ channel: "chrome" });
const p = await (await b.newContext()).newPage();
for (const t of ["نشط", "الاشتراك نشط", "نظرة عامة", "مشروع اتسلّم", "Active", "نشط ok", "١٠ زيارات", "10 زيارات"]) {
  await p.setContent($__bt<html lang="ar" dir="rtl"><body><p style="color:#7fc493;background:#dcf3e3">$__{t}</p></body></html>$__bt);
  const r = await new AxeBuilder({ page: p }).withRules(["color-contrast"]).analyze();
  const n = k => r[k].flatMap(x => x.nodes).length;
  console.log(t.padEnd(14), "checked:", n("violations") + n("passes") + n("incomplete"), "violations:", n("violations"));
}
await b.close();
~~~

~~~text اتشغّل فعلًا (axe-core 4.14.0، Chrome 156)
نشط            checked: 0 violations: 0
الاشتراك نشط   checked: 0 violations: 0
نظرة عامة      checked: 1 violations: 1
مشروع اتسلّم   checked: 1 violations: 1
Active         checked: 1 violations: 1
نشط ok         checked: 0 violations: 0
١٠ زيارات      checked: 1 violations: 1
10 زيارات      checked: 1 violations: 1
~~~

نفس اللون (1.76:1، مقروء بالعافية) على كل الكلمات. أي نص فيه «نشط» **مفحصش خالص** ([[checked: 0]]). وعلى الـ dashboard نفسه:

~~~text axe-badge3.mjs
shipped                        violations: 0
.badge.active{color:#7fc493}   violations: 0
visible rows with a green badge: 6
~~~

والسبب في [[node_modules/axe-core/axe.js]]: قبل ما يحسب التباين، axe بيشيل النص اللي شكله «icon ligature» ([[if (ignoreIconLigature && _isIconLigature(child, ...)) return '']]). والكشف بيرسم الكلمة على canvas ويقارن عرضها بمجموع عرض حروفها لوحدها ([[expectedWidth]] مقابل [[actualWidth]])، ولو الفرق كبير يبقى «أيقونة». في العربي الحروف بتتوصل وأشكالها بتتغير، فكلمة قصيرة زي «نشط» عرضها أقل بكتير من «ن» و «ش» و «ط» منفصلين، فبتتحسب أيقونة. والحل اللي اتعمل: [[contrast.mjs]] على أزواج الـ tokens (درس الخريطة)، وفحص بالعين في DevTools (اختار العنصر، وفي Styles دوس على مربع اللون: بيكتب الـ contrast ratio) لكل badge وزرار.

وغلطة في الطريق: أول سكربت للتجربة كان [[browser.newPage()]]، و [[AxeBuilder]] وقع بـ [[Error: Please use browser.newContext()]]. axe محتاج يفتح صفحات في نفس الـ context (للـ iframes)، فلازم [[(await browser.newContext()).newPage()]].

---

## النشر على GitHub Pages

~~~javascript subpath.mjs
// serve portfolio/ under /nadine-site/ like a GitHub Pages project site, and count 404s
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
import { chromium } from "playwright-core";
const root = path.resolve("portfolio"), base = "/nadine-site/";
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!p.startsWith(base)) { res.writeHead(404); return res.end(); }
  p = p.slice(base.length - 1); if (p.endsWith("/")) p += "index.html";
  const f = path.join(root, p);
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml" }[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(5599);
const b = await chromium.launch({ channel: "chrome" });
for (const [name, patch] of [["relative paths (shipped)", null], ['root paths: href="/css/site.css"', s => s.replace(/href="css\//g, 'href="/css/').replace(/src="js\//g, 'src="/js/')]]) {
  const p = await b.newPage(); const bad = [];
  p.on("response", r => r.status() === 404 && bad.push(new URL(r.url()).pathname));
  if (patch) await p.route("**/nadine-site/", async r => { const res = await r.fetch(); r.fulfill({ response: res, body: patch(await res.text()) }); });
  await p.goto("http://127.0.0.1:5599" + base); await p.waitForTimeout(500);
  console.log(name.padEnd(34), "404s:", bad.length, bad.join(" "), "| body font:", await p.$eval("body", e => getComputedStyle(e).fontFamily.slice(0, 20)));
  await p.close();
}
await b.close(); srv.close();
~~~

~~~text اتشغّل فعلًا
relative paths (shipped)           404s: 0  | body font: system-ui, "Segoe UI
root paths: href="/css/site.css"   404s: 5 /js/boot.js /css/tokens.css /css/site.css /js/i18n.js /js/reveal.js | body font: "Times New Roman"
~~~

الخطوات (من وثائق GitHub Pages و GitHub CLI، **متشغّلتش هنا** عشان متتعملش repo حقيقي):

~~~bash من الوثائق
cd pd-lab
printf "node_modules/\n" > .gitignore
git init
git add portfolio dashboard .gitignore
git commit -m "portfolio and dashboard"
gh repo create nadine-site --public --source . --push
gh api -X POST repos/OWNER/nadine-site/pages -f "source[branch]=main" -f "source[path]=/"
~~~

- [[.gitignore]] فيه [[node_modules/]]: أدوات القياس متترفعش.
- [[git add portfolio dashboard]]: الموقعين بس (السكربتات اختيارية؛ لو رفعتها حطها في فولدر [[tools/]]).
- [[gh api -X POST repos/OWNER/nadine-site/pages]]: بيشغّل Pages من فرع [[main]] من الـ root (نفس اللي بيتعمل من Settings ← Pages ← Deploy from a branch). [[OWNER]] = اسم حسابك.
- الروابط بعدها: [[https://OWNER.github.io/nadine-site/portfolio/]] و [[.../dashboard/]]. والـ dashboard فيه بيانات متخيلة بس؛ لو اتوصل بـ API حقيقي لازم تسجيل دخول في السيرفر.
- بعد النشر: غيّر [[canonical]] و [[og:url]] و [[og:image]] للرابط الحقيقي (أو دومين خاص)، وشغّل [[check-portfolio.mjs]] بعد ما تغيّر [[B]] للرابط المنشور.

---

## كل الغلطات في الوحدة

**حصلت فعلًا وانا ببني (٢٢):**

| # | الدرس | العَرَض | الرقم | التصليح |
|---|---|---|---|---|
| 1 | الخريطة | [[state.js]] مش بيتقري في Node | [[Named export 'parseState' not found]] | [[npm pkg set type=module]] |
| 2 | الخريطة | [[?fail=1]] كسر الصفحة نفسها | الاختبار علّق 30000ms | الفشل للبيانات بس |
| 3 | الخريطة | الأخضر «نشط» ضعيف | 4.35:1 | [[#156c2f]] = 5.59 |
| 4 | بورتفوليو ١ | الصفحة بتتنطط بالإنجليزي | CLS 0.1402 | [[i18n.js]] classic |
| 5 | بورتفوليو ١ | «40+» اتقرت «+40» | الـ [[+]] على الشمال | [[<span dir="ltr">]] |
| 6 | بورتفوليو ١ | اسم التاب فضل عربي | — | [[data-i18n]] على [[<title>]] |
| 7 | بورتفوليو ١ | طلب فاشل في Console | [[favicon.ico]] 404 | [[icon.svg]] |
| 8 | داشبورد ١ | الخط المستوي على الأرض | [[2,30 50,30 98,30]] | [[h / 2]] لو المدى صفر |
| 9 | داشبورد ١ | مقارنة ناتج [[Intl]] بتفشل | 16 حرف بدل 13 ([[U+200F]]) | [[includes]] أو تنضيف |
| 10 | داشبورد ١ | الكلام جنب النسبة بيتحرك | CLS 0.0010 | [[min-width: 5em]] |
| 11 | داشبورد ١ | زرار التصغير مزنوق | لقطة الشاشة | [[aria-label]] وأيقونة بس |
| 12 | داشبورد ٢ | الجدول بيتنطط على الموبايل | CLS 0.0848 | skeleton بنفس المقاس وسهم محجوز |
| 13 | داشبورد ٢ | اسم زرار الترتيب فيه «▲» | [[button "الاسم ▲"]] | [[content: "▲" / ""]] |
| 14 | داشبورد ٢ | «١٠ زيارات» جنب «8» | لقطة الشاشة | لاتيني كله |
| 15 | داشبورد ٢ | badge ممدود بعرض الكارت | لقطة الشاشة | [[justify-self: start]] |
| 16 | داشبورد ٣ | scroll أفقي في كل المقاسات | 1086 على 360 | [[min-width: 0]] |
| 17 | داشبورد ٣ | الضغط جوه الحافة بيقفل الـ dialog | [[open: false]] | الـ padding على الفورم |
| 18 | داشبورد ٣ | رسالة التحقق إنجليزي | [[Please fill out this field.]] | [[setCustomValidity]] |
| 19 | داشبورد ٣ | الساعة بتتقسم سطرين | لقطة الشاشة | [[nowrap]] و 4.5rem |
| 20 | داشبورد ٣ | الفوكس بيضيع بعد الحجز | [[BODY]] | تمرين في الدرس |
| 21 | المراجعة | axe مفحصش «نشط» | 1.76:1 وصفر violations | فحص tokens بنفسك |
| 22 | المراجعة | [[AxeBuilder]] وقع | [[Please use browser.newContext()]] | [[newContext().newPage()]] |

**تجارب متعمّدة عشان نشوف الرقم (٨):**

| # | التجربة | الرقم | الدرس |
|---|---|---|---|
| 1 | [[data-reveal]] على الـ hero | LCP 380 ← 1200ms | بورتفوليو ٢ |
| 2 | [[minmax(22rem, 1fr)]] على 360 | 368 / 360 | بورتفوليو ٢ |
| 3 | من غير CSS طباعة | صفحتين والـ header ظاهر | بورتفوليو ٣ |
| 4 | نفس [[view-transition-name]] على ٥ كروت | [[Unexpected duplicate view-transition-name]] | بورتفوليو ٣ |
| 5 | [[-100%]] للـ drawer في RTL | -154 / 118 على الشاشة | داشبورد ١ |
| 6 | [[overflow-x: auto]] على wrapper الجدول | العنوان عند -75 | داشبورد ٢ |
| 7 | السيرفر من غير فحص المسار | [[/..%2fserve.mjs]] = 200 | الخريطة |
| 8 | مسارات بـ [[/]] تحت [[/repo/]] | 5 × 404 | المراجعة |

---

## بعد ما يخلص

**بيكبر إزاي:**
- الـ portfolio: كل مشروع جديد = كارت (سطر في HTML و tags) وصفحة دراسة حالة بنفس الهيكل. لو بقوا أكتر من ١٠، اعمل [[build.mjs]] بيولّد الكروت والصفحات من JSON (ومعاها نسخة إنجليزي ثابتة، المشروع الكبير).
- الـ dashboard: البيانات من API (المشروع الكبير الأول)، والفلترة والترتيب والصفحات بيروحوا للسيرفر لما الأعضاء يبقوا آلاف (نفس [[parseState]] بيبني الـ query)، وتسجيل دخول بأدوار (مدير وموظف) والسيرفر هو اللي بيرفض.
- لو الـ state بقت بتتشارك بين شاشات كتير (سلة، وإشعارات، ومحادثة)، ده الوقت اللي framework بيستاهل فيه (تاب React).

**بيتكلف كام تقريبًا (أسعار تقريبية من صفحات الخدمات، بتتغير):**

| الحاجة | التكلفة |
|---|---|
| GitHub Pages للموقعين | مجاني (للـ repo العام) |
| دومين خاص ([[.com]]) | حوالي 10–15 دولار في السنة |
| الـ dashboard بـ API و قاعدة بيانات | VPS صغير حوالي 5–6 دولار في الشهر، أو خطة مجانية في خدمة managed لحد حجم معيّن |

**خليه بتاعك:**
- غيّر «نادين فؤاد» لاسمك، والمشاريع لشغلك الحقيقي، والـ tokens لألوانك (وشغّل [[contrast.mjs]] على ألوانك قبل أي حاجة).
- الـ dashboard: غيّر الصالة لحاجة بتعرفها (المشروع «فكرة» في آخر الوحدة)، وخلي أرقام الكروت هي اللي صاحب المكان بيسأل عنها فعلًا.
- حط الاتنين في الـ portfolio كدراسات حالة: المشكلة، والقرارات (جدول «ليه الأدوات دي»)، والأرقام (الجداول اللي هنا).

## الخلاصة

- الفحص كود بيتعاد: matrix و axe وكيبورد و CLS/LCP، كل واحد سكربت.
- axe صفر مش نهاية الفحص: في العربي بيعدّي كلمات من غير ما يفحصها، فالتباين بيتحسب من الـ tokens.
- الأرقام بالوسط من ٣، وأول تشغيل مش محسوب.
- المسارات نسبية عشان الموقع يشتغل تحت أي مسار.`,
          sol: R`لو نسختك زي الشرح: ٢٤ خانة [[ok]] في الـ matrix، و [[violations: 0]] في الـ ٢٠ فحص axe، و CLS [[0.0000]] في كل الصفحات، و LCP في التشغيل التاني والتالت بين 200 و 350ms تقريبًا (جهازك ممكن يختلف). تجربة axe: «نظرة عامة» بتطلع violation و «نشط» [[checked: 0]]. و [[subpath.mjs]] بعد ما تغيّر لينك واحد لـ [[/css/site.css]] بيطلّع 404 واحد على الأقل والصفحة من غير التنسيق بتاعها.`,
          practice: [
            {
              lvl: R`سريع`,
              t: R`**اقرا وتوقّع:** في الـ ci بتاع الدرس، أنهي من الروابط دي هيتعلّم: [[css/site.css]]، و [[/js/boot.js]]، و [[https://nadine.example/]]، و [[#work]]، و [[/css/cv.css]]، و [[//cdn.example/x.png]]، و [[./]]؟ اكتب ليه كل واحد قبل ما تشغّل.`,
              done: R`اتنين بس: [[/js/boot.js]] و [[/css/cv.css]] (بيبدأوا بـ [[/]] واحدة). [[//cdn...]] protocol-relative (دومين تاني، مش مسار في الموقع)، والباقي نسبي أو كامل أو anchor، والسكربت طلّع [[root paths: 2]].`,
            },
            {
              lvl: R`سريع`,
              t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه axe عدّى «نشط» ومعدّاش «نظرة عامة»، وإيه اللي تعمله في كل مشروع عربي بسبب ده.`,
              done: R`الشرح فيه إن axe بيشيل النص اللي عرضه مكتوب متوصّل أقل بكتير من حروفه لوحدها (فاكره أيقونة)، وإن الحروف العربي بتتوصل فده بيحصل لكلمات قصيرة، وإن الحل حساب التباين لكل زوج tokens بسكربت وفحص العناصر الصغيرة بالعين في DevTools.`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**ابني:** حوّل [[check-portfolio.mjs]] و [[audit-dashboard.mjs]] لـ [[check.mjs]] واحد بيطبع [[PASS]] أو [[FAIL]] لكل فحص (overflow، و axe، و CLS ≤ 0.1، و LCP ≤ 2500، وصفر page errors)، ويخرج بـ 1 لو أي واحد وقع. وجرّبه على نسخة فيها [[minmax(22rem, 1fr)]].`,
              done: R`على النسخة السليمة كل السطور [[PASS]] والـ exit code صفر، وعلى النسخة البايظة [[FAIL]] في الـ overflow على 360 و 390 والـ exit code 1، و [[node check.mjs || echo blocked]] بيطبع [[blocked]].`,
            },
            {
              lvl: R`تطبيق`,
              t: R`**دوّر بنفسك:** من وثائق GitHub Pages اعرف إزاي تنشر من GitHub Actions بدل الفرع ([[actions/upload-pages-artifact]] و [[actions/deploy-pages]])، واكتب workflow بيشغّل [[contrast.mjs]] و فحص المسارات قبل النشر وبيوقف لو فشلوا.`,
              done: R`عندك [[.github/workflows/pages.yml]] فيه job للفحص بيخرج بـ 1 لو لون وقع أو مسار بـ [[/]]، و job للنشر [[needs]] الفحص، والـ permissions فيها [[pages: write]] و [[id-token: write]] (من الوثائق)، ومكتوب إن ده محتاج Settings ← Pages ← Source = GitHub Actions.`,
            },
            {
              lvl: R`تحدي`,
              t: R`**مسألة:** اكتب [[bidiRisks(html)]] بتلاقي في صفحة [[dir="rtl"]] كل نص قصير بيبدأ أو بيخلص بعلامة محايدة جنب رقم أو حرف لاتيني ([[40+]] و [[C++]] و [[(v2)]] و [[50%]]) ومش جوه عنصر عليه [[dir="ltr"]] أو [[<bdi>]]، وتطبع السطر. جرّبها على [[index.html]] قبل تصليح «40+».`,
              done: R`على النسخة القديمة بتطلّع [[40+]] من [[<dd>]]، وعلى الحالية مبتطلّعش حاجة، وعلى صفحة تجربة فيها [[C++]] و [[(v2)]] بتطلّعهم الاتنين، ومفيش إنذار كاذب على [[hello@nadine.example]] (عليه [[dir="ltr"]]).`,
            },
            {
              lvl: R`تحدي`,
              t: R`**قارن وقيس:** شغّل Lighthouse (Chrome DevTools ← Lighthouse ← Mobile) على الصفحتين الرئيسيتين، وقارن رقم Accessibility و LCP و CLS بأرقام السكربتات هنا. لو اختلفوا، اكتب ليه (Lighthouse بيعمل throttling للشبكة كمان، و Accessibility فيه نفس axe).`,
              done: R`عندك جدول فيه الأرقام من المصدرين للصفحتين، والـ CLS متطابق (صفر)، والـ LCP في Lighthouse أعلى ومكتوب السبب (شبكة 4G متقلّدة)، ودرجة Accessibility ومكتوب إن «نشط» لسه مش متفحوص فيها لنفس السبب.`,
            },
          ],
          ci: [
            {
              os: [
                R`ubuntu`,
                R`macos`,
                R`windows`,
              ],
              sh: R`node`,
              run: R`const pages = {
  "index.html": '<link rel="stylesheet" href="css/site.css"><script src="/js/boot.js"></script><a href="https://nadine.example/">x</a><a href="#work">w</a>',
  "cv.html": '<link href="/css/cv.css" rel="stylesheet"><img src="//cdn.example/x.png" alt=""><a href="./">home</a>',
};
let bad = 0;
for (const [file, html] of Object.entries(pages))
  for (const m of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) { bad++; console.log(file + ": " + m[1] + " breaks under /repo/"); }
console.log("root paths: " + bad);
process.exitCode = bad ? 1 : 0;`,
              code: 1,
              expect: [
                R`index.html: /js/boot.js breaks under /repo/`,
                R`cv.html: /css/cv.css breaks under /repo/`,
                R`root paths: 2`,
              ],
            },
          ],
        },
      ],
    }
]);

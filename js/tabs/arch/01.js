// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("arch", {
  label: "بناء مشروع كامل",
  prompt: "$ ",
  lab: R`mkdir myapp && cd myapp
git init
mkdir -p apps/web apps/api docs`,
  labText: "التاب ده بيربط كل التابات التانية: كل درس بيقولك تعمل إيه ومنين تتعلم الأدوات. ابنِ مشروع واحد صغير من أوله لآخره وانت ماشي.",
  levels: {"1":["التخطيط","الفكرة والمتطلبات، وتصميم الداتا والـ API، وهيكل المشروع"],"2":["الميزات المشهورة","auth وأمان الحساب، والدفع والاشتراكات، ورفع الملفات، و realtime، و i18n، والإشعارات، و multi-tenant SaaS"],"3":["الإنتاج و system design","الأداء، والمراقبة، و scaling، والتكلفة، ومفاهيم الأنظمة الموزعة، وأسئلة system design"]},
  categories: [
    {
      t: "من الفكرة للمتطلبات",
      l: 1,
      n: "قبل أي كود: مين هيستخدم، وعايز يعمل إيه، وإيه اللي يدخل أول نسخة، وهتبنيه بإيه",
      items: [
        {
          cmd: "user stories",
          title: "حوّل الفكرة لجمل تتبني وتتختبر",
          desc: R`الـ user story بتحوّل فكرة زي «منصة كورسات» لجمل صغيرة بالشكل «كـ [مين]، عايز [إيه]، عشان [ليه]»، وتحت كل واحدة acceptance criteria: شروط تقدر تتأكد منها بعينك أو باختبار.

طول التاب ده هنمشي مع مثال واحد من أوله لآخره: منصة كورسات اسمها myapp. الطالب يشتري كورس ويتفرج على دروسه، والمدرّب يرفع الكورس، والأدمن يدير كل حاجة. الـ stories بتتكتب في [[docs/requirements.md]] قبل ما تفتح الـ editor.`,
          example: R`## Stories
- كطالب، عايز أشوف الكورسات من غير حساب، عشان أقرر أشتري إيه
- كطالب، عايز أشتري كورس بالكارت، عشان أبدأ أتعلم على طول
- كمدرّب، عايز أرفع فيديو لكل درس، عشان الطلاب يتفرجوا
- كأدمن، عايز أشوف كل الطلبات والمدفوعات، عشان أحل شكاوى الدفع
## Acceptance: شراء كورس
- صفحة الدفع بتاخد السعر من الداتابيز، مش من الصفحة
- بعد الدفع الكورس يظهر في «كورساتي» في أقل من دقيقة
- لو الدفع فشل، الكورس ميتفتحش ويظهر زرار «حاول تاني»
- نفس الدفعة لو وصلت مرتين، الطالب يتسجّل مرة واحدة`,
          try: "اكتب ٥ stories لمشروع نفسك تبنيه، ولكل واحدة ٣ شروط acceptance. لو فيه شرط مش عارف تختبره إزاي، يبقى لسه مش واضح. اكتبه تاني لحد ما تعرف.",
          flag: "script",
          deep: {
            why: "أغلب المشاريع اللي بتفشل مش بتفشل عشان الكود وحش. بتفشل عشان محدش كان عارف «خلصت» يعني إيه. من غير stories بتبني حاجات محدش طلبها، وبتنسى حاجات أساسية لحد يوم التسليم. ولما بتشتغل مع AI، الـ story المكتوبة هي أحسن prompt: بتقوله مين، وعايز إيه، وإزاي يتأكد إنه خلص.",
            how: R`كل جزء في الـ story بيطلع منه حاجة في التصميم. «مين» بيطلع منه الأدوار: طالب، ومدرّب، وأدمن. ودي هتبقى بعدين roles وصلاحيات. «إيه» بيطلع منه شاشات و endpoints. و «ليه» بيساعدك ترتّب الأولويات: لو السبب ضعيف، الـ story تستنى.

الـ acceptance criteria هي اللي بتحوّل الكلام لحاجة تتقاس. كل شرط منهم هيبقى بعدين اختبار أو خطوة في مراجعة الـ PR. لاحظ إن فيه شروط في المثال شكلها بسيط بس وراها قرارات تقنية كبيرة. «السعر من الداتابيز» معناه إن السيرفر هو اللي بيحسب المبلغ. و «في أقل من دقيقة» معناه إن التفعيل بييجي من webhook مش لحظي. و «مرة واحدة» معناه idempotency.

خلي الـ story صغيرة، تخلص في يوم لتلاتة. «إدارة الكورسات» مش story، دي مجموعة: إنشاء، وتعديل، ونشر، وأرشفة. قسّمها.

والمتطلبات اللي مش ميزات (non-functional) اكتبها في قسم لوحدها: الموقع عربي وإنجليزي، والموبايل الأول، والصفحة تفتح في أقل من ٣ ثواني على 4G، والباسوردات hashed. دي بتأثر على كل story.`,
            when: "أول يوم في أي مشروع، حتى لو بتبنيه لنفسك. ولما العميل يطلب «حاجة صغيرة» في النص: اكتبها story الأول، وساعتها هتعرف حجمها الحقيقي.",
            mistakes: "stories تقنية زي «كمطوّر عايز أعمل جدول users». دي task مش story، والمستخدم ميهمهوش. و story من غير acceptance، فتتقفل وهي شغالة نص شغل. وإنك تكتب الحالات الحلوة بس وتنسى الوحشة: الدفع فشل، والنت قطع، والملف كبير، والإيميل متسجّل قبل كده."
          },
          lines: [
            "الزائر بيتصفح من غير حساب. معناها إن صفحة الكورسات public ومحتاجة SEO.",
            "الشراء. هيطلع منها بعدين endpoint للطلب، وتكامل مع بوابة دفع.",
            "المدرّب. فيها رفع ملفات، ودور (role) جديد غير الطالب.",
            "الأدمن. فيها لوحة، وصلاحيات أعلى، وسجل للمدفوعات.",
            "شرط أمان مكتوب بلغة المستخدم: المبلغ بيتحسب على السيرفر، مش في المتصفح.",
            "شرط بزمن. معناه إن التفعيل هييجي من webhook، ومش لازم يبقى لحظي.",
            "الحالة الوحشة مكتوبة من الأول، عشان متبقاش مفاجأة.",
            "شرط التكرار. ده اللي هيخليك تعمل idempotency في الـ webhook."
          ],
          sol: R`مفيش ناتج واحد صح هنا، بس فيه اختبار: كل شرط acceptance لازم يتقري كـ «لو عملت كذا، المفروض أشوف كذا». مثلًا لمشروع حجز ملاعب: «كلاعب، عايز أحجز ساعة في ملعب، عشان أضمن مكان»، وتحتها: الساعة المحجوزة تختفي من المتاح لأي حد تاني فورًا، ولو اتنين ضغطوا حجز في نفس اللحظة واحد بس ينجح والتاني يشوف «الساعة اتحجزت»، والإلغاء قبل الميعاد بـ ٢٤ ساعة بيرجّع الساعة للمتاح.

أشهر غلطة إن الشرط يطلع صفة مش سلوك: «الحجز يبقى سريع» أو «الواجهة سهلة». دي مش بتتختبر، فحوّلها لرقم أو فعل: «صفحة المواعيد تفتح في أقل من ثانيتين على 4G». وغلطة تانية: story من غير «عشان»، فمتعرفش هي Must ولا لأ لما تيجي تقسّم في درس الـ MVP.`
        },
        {
          cmd: "MVP",
          title: "إيه اللي يدخل أول نسخة وإيه اللي يستنى",
          desc: R`الـ MVP (Minimum Viable Product) هو أصغر نسخة بتحل المشكلة الأساسية لمستخدم حقيقي، وتقدر تتباع أو تتجرّب. مش نسخة وحشة من المنتج الكامل. هي نسخة صغيرة، بس شغالة كويس.

أسهل طريقة تقسّم بيها هي MoSCoW. الـ Must حاجات من غيرها مفيش منتج. الـ Should مهمة بس تقدر تستنى أسبوعين. الـ Could تتعمل لو فيه وقت. والـ Won't مش في النسخة دي، وبتكتبها عشان محدش يفتح موضوعها تاني.`,
          example: R`Must:   تسجيل ودخول، صفحة الكورسات، شراء بـ Paymob، مشاهدة الدروس
Must:   لوحة أدمن بسيطة: كورسات وطلبات
Should: استرجاع الباسورد بالإيميل، بحث وفلترة
Could:  دخول بجوجل، إشعارات لحظية، كوبونات خصم
Won't:  تطبيق موبايل، شهادات، اشتراك شهري، أكتر من عملة`,
          try: "خد الـ stories اللي كتبتها وقسّمها MoSCoW. بعدين شيل نص الـ Must واسأل نفسك: المستخدم يقدر يدفع ويستفيد من غيرها؟ لو أيوه، تبقى مش Must.",
          flag: "script",
          deep: {
            why: "كل ميزة زيادة معناها أسابيع زيادة قبل ما أول مستخدم يجرّب. وأول مستخدمين دايمًا بيغيّروا رأيك في نص الحاجات. فأي أسبوع بتبني فيه حاجة قبل ما تسمع منهم ممكن يروح على حاجة هتترمي.",
            how: R`عشان تعرف الـ Must، دوّر على الـ core loop. ده الطريق اللي بيوصّل القيمة والفلوس: يلاقي كورس، ويشتري، ويتفرج. أي حاجة بره الطريق ده تبقى Should أو أقل. والسؤال اللي تسأله: «لو شلتها، حد هيقدر يستخدم المنتج ويدفع؟»

فيه حاجات كتير ليها بديل يدوي في الأول. الاسترداد مثلًا الأدمن يعمله من لوحة Paymob بدل ما تبني ميزة. والكوبون يبقى تعديل سعر يدوي لمدة أسبوع. والتقارير تبقى query في Prisma Studio. البديل اليدوي بيأجّل الكود لحد ما تتأكد إن الميزة مطلوبة فعلًا.

وفيه حاجات مش ميزات أصلًا، فمتتقسمش MoSCoW. منها الباسوردات hashed، والتحقق من توقيع الـ webhook، والباك أب، ومراقبة الأخطاء. MVP مش معناها مش آمن. دي شروط عشان يبقى من حقك تستلم فلوس الناس.

ولمطوّر واحد، MVP معقول بياخد من ٤ لـ ٨ أسابيع. لو خطتك أطول من كده، فغالبًا فيه Should متخبّية جوه الـ Must.`,
            when: "قبل ما تكتب أول سطر. ومع كل طلب جديد من العميل، اسأل: يدخل في أنهي خانة؟",
            mistakes: "إنك تحط دخول بجوجل وفيسبوك وأبل في الـ MVP. أو تبني اشتراك شهري ولوحة تقارير قبل ما أول كورس يتباع. أو تأجّل الحاجات اللي مش باينة، زي الباك أب والتحقق من الـ webhook، وتقول «ده MVP». أو متكتبش الـ Won't، فكل أسبوع العميل يرجع يسأل عن نفس الميزة."
          },
          lines: [
            "الـ core loop: يدخل، ويلاقي كورس، ويدفع، ويتفرج. من غير أي واحدة منهم مفيش منتج.",
            "الأدمن محتاج يشوف الطلبات عشان يحل مشاكل الدفع من أول يوم.",
            "مهمة، بس ممكن الأدمن يغيّر الباسورد يدوي لحد ما تتعمل.",
            "حلوة، ومفيش حد هيرفض يشتري عشانها.",
            "مكتوبة صريح عشان محدش يبدأ فيها، ولا انت."
          ],
          sol: R`النتيجة المتوقعة: عمود الـ Must يقصر لحد ما يبقى هو الـ core loop بس. في مثال myapp: تسجيل، وصفحة الكورسات، وشراء، ومشاهدة. لوحة الأدمن نفسها ممكن تنزل Should لو تقدر تضيف الكورسات الأولى بـ seed أو Prisma Studio. واسترجاع الباسورد تحس إنه Must، بس في أول أسبوعين ممكن يتعمل يدوي من الإيميل.

علامة إنك قسّمت صح: لو شلت أي Must، المستخدم مبيقدرش يدفع أو ميقدرش ياخد اللي دفع عشانه. ولو لقيت الـ Must فيه أكتر من ٦ أو ٧ حاجات، غالبًا خلطت بين «لازم» و «حلو يبقى موجود». واستثناء مهم: الأمان والباك أب والمراقبة مبيتقسموش MoSCoW أصلًا، دول شروط لأي حاجة تتنشر.`
        },
        {
          cmd: "اختيار الـ stack",
          title: "تختار الأدوات والمعمارية على أساس إيه",
          desc: R`اختار الأدوات اللي انت عارفها كويس واللي بتحل مشكلة المشروع، مش الأحدث. وابدأ بـ monolith: كود واحد، و deploy واحد، وقاعدة بيانات واحدة. في المثال بتاعنا الاختيار Next.js للواجهة، و API بـ Express و Prisma و PostgreSQL.

اكتب القرار وسببه في ملف صغير اسمه ADR (Architecture Decision Record). بعد ٦ شهور هتبقى عارف اتعمل كده ليه، ومحدش هيفتح نفس النقاش تاني.`,
          example: R`# 0001: الـ stack
Status: accepted
Context: مطوّر واحد، MVP في ٦ أسابيع، SEO مهم لصفحات الكورسات، والدفع بـ Paymob
Decision: Next.js للواجهة + Express API + Prisma + PostgreSQL في monorepo
Why not Next.js بس: فيه webhooks و jobs و socket.io، ومحتاجين API لتطبيق موبايل بعدين
Why not microservices: فريق من واحد، ومفيش سبب ندفع تمن الشبكة و ٥ deploys
Consequences: تطبيقين يتعملهم deploy، و CORS بينهم، و types مشتركة في packages/shared`,
          try: R`اكتب ADR لمشروعك في [[docs/adr/0001-stack.md]]. لازم يبقى فيه بديلين اترفضوا وسبب رفض كل واحد. لو ملقتش بديل، يبقى انت مقررتش، انت اخترت اللي متعود عليه.`,
          flag: "script",
          deep: {
            why: "قرار الـ stack من أغلى القرارات لو حبيت ترجع فيه. بعد ٣ شهور كود، تغيير الـ framework أو قاعدة البيانات بيبقى إعادة كتابة. ولو اخترت عشان الأداة trending، هتقضي وقتك تحارب فيها بدل ما تبني المنتج.",
            how: R`عندك ٣ اختيارات مشهورة لتطبيق ويب:

الأول Next.js لوحده (full-stack). الصفحات، و Route Handlers، و Server Actions، و Prisma، كلهم في تطبيق واحد. ميزته deploy واحد ولغة واحدة و SEO ممتاز. وعيبه إن الشغل الطويل مش مكانه هنا: WebSockets، وqueues، وcron. على منصة serverless الـ function ليها مهلة وبتموت، فهتحتاج worker منفصل برضه.

التاني React بـ Vite + Express. فصل واضح، والـ API يقدر يستخدمها تطبيق موبايل. بس مفيش SSR، فالصفحات العامة ضعيفة في SEO، وعندك deploy اتنين.

التالت Next.js للواجهة + API منفصل. ده اختيارنا: SEO من Next، و API مستقلة للـ webhooks والـ jobs والموبايل.

Python (FastAPI) لو قلب المنتج AI أو معالجة داتا، لأن المكتبات هناك. التفاصيل في تاب «Python و FastAPI». و PHP لو العميل على استضافة مشتركة رخيصة، أو عنده WordPress أو Laravel أصلًا (تاب «PHP و MySQL»). و Supabase أو Firebase لو السرعة أهم حاجة والفريق صغير، بس الأمان ساعتها بيبقى في RLS في Supabase، أو Security Rules في Firebase، ودي لازم تفهمها كويس.

وليه monolith في الأول؟ لأن الموديولات بتكلّم بعض بـ function call مش طلب شبكة. والـ transaction بتقدر تلم أكتر من جدول بسهولة. وعندك deploy واحد ولوج واحد. microservices بتحل مشكلة تنظيمية أكتر ما هي تقنية: فرق كتير لازم تعمل deploy من غير ما تستنى بعض. لو انت لوحدك، انت بتدفع التمن ومبتاخدش الفايدة. الـ monolith المرتّب (modular) بيتقسم بعدين بسهولة لو احتجت.`,
            when: "مرة في أول المشروع. وتراجع القرار لو حصل تغيير كبير: الفريق اتضاعف، أو ظهر نوع شغل جديد زي معالجة فيديو تقيلة.",
            mistakes: "microservices من أول يوم لمشروع شخص واحد: ٥ deploys و ٥ قواعد بيانات ومشاكل شبكة قبل أول مستخدم. أو إنك تحط كل حاجة في Server Actions بما فيها webhooks و cron، وتكتشف بعد الرفع إن الـ function ليها مهلة. أو تختار أداة عمرك ما استخدمتها في مشروع بيتباع، عشان شكلها حلو في فيديو."
          },
          lines: [
            "حالة القرار. لو اتغير بعدين، اعمل ADR جديد يلغيه، ومتمسحش القديم.",
            "الظروف وقت القرار: الفريق، والوقت، والمتطلبات اللي بتفرق.",
            "القرار نفسه في سطر واحد.",
            "البديل الأول واترفض ليه: شغل طويل ومحتاجين API لتطبيق موبايل.",
            "البديل التاني: microservices لفريق من واحد تمنها أكبر من فايدتها.",
            "التمن اللي هتدفعه. مفيش قرار ببلاش، واكتبه عشان محدش يتفاجئ."
          ],
          sol: R`الـ ADR الصح فيه ٤ حاجات: السياق بأرقام حقيقية (كام واحد في الفريق، والميعاد، والقيود زي SEO أو بوابة دفع معينة)، والقرار، وبديلين على الأقل اترفضوا وجنب كل واحد سبب مرتبط بالسياق ده، والتمن اللي هتدفعه (Consequences). مثلًا «Why not Django: الفريق كله JavaScript، و types مشتركة بين الواجهة والـ API أهم لينا من الـ admin الجاهز».

الغلطة الأشهر إن سبب الرفض يبقى عام: «Laravel قديم» أو «Go صعب». ده رأي مش قرار. السبب لازم يتربط بالسياق، ولو السياق اتغير (فريق أكبر، أو موبايل) القرار يتراجع بـ ADR جديد، مش بتعديل القديم. وغلطة تانية إن Consequences تبقى فاضية، كأن مفيش قرار ليه تمن.`
        }
      ]
    },
    {
      t: "تصميم الداتا والـ API",
      l: 1,
      n: "الجداول والعلاقات والـ endpoints على الورق الأول، لأن تغييرها بعد ما يبقى فيه داتا غالي",
      items: [
        {
          cmd: "ERD",
          title: "ارسم الجداول والعلاقات قبل أي كود",
          desc: R`الـ ERD (Entity Relationship Diagram) رسمة للكيانات والعلاقات بينها: واحد لواحد، أو واحد لكتير، أو كتير لكتير. ارجع للـ stories: كل اسم فيها (طالب، كورس، درس، طلب) غالبًا جدول. وكل فعل (يشتري، يتفرج) غالبًا علاقة، أو جدول وسيط.

اكتبها بـ Mermaid في [[docs/erd.md]]. GitHub بيرسمها لوحده، و VS Code بإضافة Mermaid، وبتتراجع في الـ PR زي الكود.`,
          example: R`erDiagram
  USER ||--o{ ENROLLMENT : "يشترك"
  COURSE ||--o{ ENROLLMENT : "فيه طلاب"
  COURSE ||--|{ LESSON : "فيه دروس"
  USER ||--o{ ORDER : "بيطلب"
  ORDER }o--|| COURSE : "لكورس"
  USER ||--o{ COURSE : "بيدرّس"`,
          try: R`ارسم ERD لمشروعك وافتحه في GitHub أو في VS Code بإضافة Mermaid. بعدين خد كل story وامشي بيها على الرسمة: «الطالب يشتري كورس» بتكتب في أنهي جداول؟ لو محتاج جدول مش موجود، الرسمة ناقصة.`,
          flag: "script",
          deep: {
            why: "تغيير الـ schema بعد ما يبقى فيه داتا حقيقية معناه migration، والـ migration فيها خطر. الرسمة بتاخد ساعة، وبتكشف الأسئلة الصعبة بدري: الطالب يقدر يشتري نفس الكورس مرتين؟ والدفعة الفاشلة بتتسجّل فين؟",
            how: R`الرموز اسمها crow's foot. [[||]] معناها واحد بالظبط، و [[o{]] صفر أو أكتر، و [[|{]] واحد أو أكتر، و [[o|]] صفر أو واحد. وبتتقري من الناحيتين.

المستخدم والكورس بينهم علاقة كتير لكتير: الطالب عنده كورسات كتير، والكورس عنده طلاب كتير. العلاقة دي بتتعمل بجدول وسيط هو ENROLLMENT. والجدول ده عنده داتا بتاعته هو كمان: اشترك إمتى، ووصل لفين في الكورس.

ORDER منفصل عن ENROLLMENT، ودي أهم نقطة في الرسمة. الطلب معناه «محاولة دفع»: ممكن يبقى PENDING، أو FAILED، أو REFUNDED. أما الاشتراك فمعناه «عنده access». وبنفصلهم عشان في طلبات بتفشل، وفي اشتراكات من غير طلب، زي الأدمن لما يدّي كورس هدية. ولو دمجتهم، هتلاقي كورسات مفتوحة لطلبات مدفعتش.

وفيه قرارات بتتاخد هنا كمان. الفلوس بتتخزن رقم صحيح بالقرش (integer cents). والسعر بيتنسخ في الطلب وقت الشراء، لأن سعر الكورس بيتغير والطلب القديم لازم يفضل بسعره. والكورس اللي عليه طلاب مبيتمسحش، بيتعمله archive.`,
            when: "بعد الـ stories على طول، وقبل أي schema. وحدّثها مع أي ميزة بتضيف جدول.",
            mistakes: "إنك تخلط الطلب والاشتراك في جدول واحد، فتلاقي كورسات مفتوحة لطلبات فشلت. أو تربط الطلب بسعر الكورس بدل ما تنسخه، فلما السعر يتغير التقارير القديمة تبوظ. أو تخزّن الفلوس float وتلاقي 0.1 + 0.2 مش بتساوي 0.3. وفي مشروع حقيقي، العلاقات بين الأسعار والمنتجات اتعدلت ٥ مرات في migrations ورا بعض (أضف foreign key، امسحه، صلّحه، امسحه تاني). كل ده كان ممكن يتحل في ساعة رسم."
          },
          lines: [
            "بداية رسمة ERD بـ Mermaid.",
            "المستخدم ليه صفر أو أكتر اشتراك، وكل اشتراك لمستخدم واحد بالظبط.",
            "والكورس كمان ليه اشتراكات كتير. الاتنين مع بعض علاقة كتير لكتير عن طريق جدول وسيط.",
            "الكورس فيه درس واحد على الأقل ([[|{]] معناها واحد أو أكتر).",
            "المستخدم ليه طلبات كتير، ومنها اللي فشل.",
            "كل طلب لكورس واحد، والكورس ليه طلبات كتير.",
            "نفس جدول المستخدمين فيه المدرّبين كمان، ولكل كورس مدرّب واحد."
          ],
          sol: R`لو الرسمة صح، GitHub هيعرضها صورة جوه بلوك [[mermaid]]. ولو ظهرت كنص، يبقى فيه غلطة syntax: غالبًا علاقة من غير label بين علامتين تنصيص، أو اسم كيان فيه مسافة.

المشي بالـ stories هو الجزء المهم. في myapp، «الطالب يشتري كورس» بتكتب في ORDER (PENDING)، وبعدين الـ webhook بيحدّثه لـ PAID ويكتب في ENROLLMENT. و «أشوف الكورسات» بتقرا COURSE و LESSON بس. أول story هتكشف نقص عادةً هي «الطالب يكمّل من آخر درس وقف عنده»: محتاجة جدول LESSON_PROGRESS (userId و lessonId و completedAt) مش موجود في الرسمة. ده بالظبط اللي التجربة عايزاك تلاقيه.

غلطة شائعة إنك تحط [[courseIds]] كـ array جوه USER بدل جدول ENROLLMENT. ساعتها مفيش مكان لتاريخ الاشتراك ولا تقدر تمنع التكرار بـ unique.`,
          solCode: R`erDiagram
  USER ||--o{ ENROLLMENT : "يشترك"
  COURSE ||--o{ ENROLLMENT : "فيه طلاب"
  COURSE ||--|{ LESSON : "فيه دروس"
  USER ||--o{ ORDER : "بيطلب"
  ORDER }o--|| COURSE : "لكورس"
  USER ||--o{ COURSE : "بيدرّس"
  USER ||--o{ LESSON_PROGRESS : "بيخلّص"
  LESSON ||--o{ LESSON_PROGRESS : "اتخلّص"`
        },
        {
          cmd: "schema.prisma",
          title: "حوّل الرسمة لجداول حقيقية بقيود",
          desc: R`كل كيان في الـ ERD بيبقى model، وكل علاقة بتبقى foreign key. والقيود اللي بتحمي الداتا مكانها في الـ schema نفسها، مش في الكود بس. [[@unique]] بيمنع التكرار، و enum بيمنع أي قيمة مش متوقعة، و [[@@unique([userId, courseId])]] في Enrollment بيمنع إن الطالب يشترك في نفس الكورس مرتين.

تفاصيل Prisma والـ migrations في تاب «SQL و Prisma». هنا بنركّز على القرارات.`,
          example: R`enum OrderStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  courseId    String
  amountCents Int
  currency    String      @default("EGP")
  status      OrderStatus @default(PENDING)
  gatewayTxId String?     @unique
  createdAt   DateTime    @default(now())
  user        User        @relation(fields: [userId], references: [id])
  course      Course      @relation(fields: [courseId], references: [id])
  @@index([userId, createdAt])
}`,
          try: R`اكتب models الـ User و Course و Enrollment و Order، واعمل migration. بعدين جرّب تعمل enrollment لنفس الطالب ونفس الكورس مرتين من Prisma Studio أو بسكربت، ولاحظ إن القاعدة رفضت (P2002).`,
          flag: "script",
          deep: {
            why: "الكود فيه bugs، والطلبات بتوصل في نفس اللحظة. القيد اللي في القاعدة هو خط الدفاع الأخير. هو اللي بيضمن إن الداتا سليمة حتى لو الكود غلط، أو حد كتب في القاعدة بسكربت.",
            how: R`خد التكرار كمثال. لو الكود بيعمل [[findFirst]] وبعدين [[create]]، وطلبين وصلوا في نفس الملّي ثانية، الاتنين هيعدّوا الـ findFirst وهيعملوا create. ده اسمه race condition. لكن القيد unique في القاعدة بيرفض التاني، وPrisma بترجّع الكود [[P2002]]، والـ error handler بيحوّله 409.

الـ id بـ [[cuid()]] بدل autoincrement. الرقم المتسلسل بيبان في الـ URL، وأي حد يقدر يجرّب [[/orders/124]] و [[/orders/125]]. ده مش حماية لوحده، والصلاحيات هي الحماية الحقيقية، بس بيقفل باب سهل.

الـ foreign key في PostgreSQL مبيعملش index لوحده. عشان كده أي عمود بتفلتر بيه لازم تعمله [[@@index]] بنفسك. والـ index المركّب [[userId, createdAt]] بيخدم صفحة «طلباتي» بالظبط، لأنها بتفلتر بالمستخدم وترتّب بالتاريخ.

و [[gatewayTxId @unique]] بيضمن إن نفس المعاملة من البوابة متتسجلش على طلبين. وفي Prisma 7 رابط القاعدة والإعدادات بقوا في [[prisma.config.ts]] بدل الـ schema، والتفاصيل في تاب «SQL و Prisma».`,
            when: "بعد الـ ERD. وأي تغيير بعد كده لازم يبقى migration جوه git، مش تعديل بإيدك على القاعدة.",
            mistakes: "إنك تعتمد على findFirst قبل create بدل unique. أو تنسى index على الأعمدة اللي بتفلتر بيها. أو تخزّن الفلوس Float. أو تستخدم id متسلسل في URL عام. وفي مشروع حقيقي، الـ schema كانت متوزعة على ملفات SQL متفرقة، وملف اسمه «نفّذ ده» في جذر المشروع، وحوالي ٤٠ ملف FIX. ساعتها محدش بيبقى عارف القاعدة الحقيقية شكلها إيه. الحل إن migrations تبقى هي المصدر الوحيد."
          },
          lines: [
            "حالات الطلب محددة، والقاعدة بترفض أي قيمة تانية.",
            "مستني الدفع.",
            "الدفع اتأكد من الـ webhook.",
            "الدفع فشل.",
            "الفلوس رجعت للطالب.",
            "قفلة.",
            "model الطلب. كل محاولة شراء بتتسجّل هنا، حتى اللي فشلت.",
            "id نصي عشوائي (cuid)، فمحدش يقدر يخمّن رقم الطلب اللي بعده.",
            "صاحب الطلب.",
            "الكورس.",
            "السعر وقت الشراء، بالقرش، كرقم صحيح. منسوخ من الكورس، مش مربوط بيه.",
            "العملة.",
            "كل طلب بيبدأ PENDING، والـ webhook بس هو اللي يحوّله PAID.",
            "رقم المعاملة عند البوابة، و unique عشان نفس الدفعة متتسجلش على طلبين.",
            "وقت الإنشاء.",
            "العلاقة بالمستخدم. ده foreign key حقيقي في القاعدة.",
            "العلاقة بالكورس.",
            "index لصفحة «طلباتي»: بتفلتر بالمستخدم وترتّب بالتاريخ.",
            "قفلة."
          ],
          sol: R`بعد [[npx prisma migrate dev --name init]] هتلاقي في [[migration.sql]] سطر زي [[CREATE UNIQUE INDEX "Enrollment_userId_courseId_key"]]. وفي Prisma 7 الـ migrate مبقاش بيعمل generate لوحده، فشغّل [[npx prisma generate]] بعدها، وإلا الكود هيشتغل على client قديم.

أول enrollment بيعدّي. التاني بيرمي [[PrismaClientKnownRequestError]] والـ [[code]] بتاعه [[P2002]]. في Prisma 7 مع الـ driver adapter، اسم الـ constraint مش في [[meta.target]] زي زمان، هتلاقيه جوه [[meta.driverAdapterError.cause]] ومعاه [[originalCode: '23505']] (كود PostgreSQL للـ unique) و [[table: 'Enrollment']]. عشان كده الـ error handler بيعتمد على [[err.code]] بس.

لو التاني عدّى من غير خطأ، يبقى نسيت [[@@unique([userId, courseId])]] أو معملتش migration بعد ما ضفته.`,
          solCode: R`enum Role {
  STUDENT
  INSTRUCTOR
  ADMIN
}

model User {
  id           String       @id @default(cuid())
  name         String
  email        String       @unique
  passwordHash String
  role         Role         @default(STUDENT)
  createdAt    DateTime     @default(now())
  teaching     Course[]
  enrollments  Enrollment[]
  orders       Order[]
}

model Course {
  id           String       @id @default(cuid())
  slug         String       @unique
  title        String
  priceCents   Int
  published    Boolean      @default(false)
  instructorId String
  instructor   User         @relation(fields: [instructorId], references: [id])
  enrollments  Enrollment[]
  orders       Order[]
}

model Enrollment {
  id        String   @id @default(cuid())
  userId    String
  courseId  String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  course    Course   @relation(fields: [courseId], references: [id])
  @@unique([userId, courseId])
  @@index([courseId])
}

// Order زي المثال بالظبط

// src/dup.ts: شغّله بـ npx tsx src/dup.ts
import { Prisma } from "./generated/prisma/client";
import { prisma } from "./db";

const s = await prisma.user.findFirstOrThrow({ where: { role: "STUDENT" } });
const c = await prisma.course.findFirstOrThrow();
await prisma.enrollment.create({ data: { userId: s.id, courseId: c.id } });
try {
  await prisma.enrollment.create({ data: { userId: s.id, courseId: c.id } });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) console.log(e.code); // P2002
  else throw e;
}`
        },
        {
          cmd: "قايمة الـ endpoints",
          title: "صمّم الـ API على الورق قبل ما تكتبها",
          desc: R`من كل story طلّع الـ endpoints بتاعتها: الـ method، والمسار، ومين مسموحله، وبيرجّع إيه. المسار بيبقى اسم جمع ([[courses]])، والفعل هو الـ method نفسه. القايمة دي هي العقد بين الواجهة والسيرفر، فتقدر تبني الاتنين في نفس الوقت.

تفاصيل REST و Express في تاب «Backend بـ Node». و GraphQL والـ versioning والـ OpenAPI في «APIs متقدمة».`,
          example: R`GET    /courses?q=&level=&cursor=    public   الكورسات المنشورة
GET    /courses/:slug                public   كورس ودروسه (الفيديو للمشتركين بس)
POST   /auth/signup                  public   حساب جديد
POST   /auth/login                   public   access token و refresh cookie
POST   /auth/refresh                 cookie   access token جديد
POST   /orders                       student  طلب جديد، وبيرجّع رابط الدفع
GET    /orders/:id                   owner    حالة الطلب للصفحة اللي بعد الدفع
POST   /webhooks/paymob              hmac     البوابة بتأكد الدفع
GET    /me/enrollments               student  كورساتي
POST   /admin/courses                admin    كورس جديد`,
          try: R`اعمل القايمة دي لمشروعك في [[docs/api.md]]. وبعدين عدّي على عمود «مين» سطر سطر، واسأل: لو حد مش مسموحله بعت الطلب ده، إيه اللي هيمنعه؟`,
          flag: "script",
          deep: {
            why: "لو صممت وانت بتكتب، الواجهة بتستنى الـ API، والـ API بتتغير كل شوية، وكل endpoint بيطلع بشكل مختلف. والأهم إن عمود «مين» هو جدول الصلاحيات بتاعك. لو مكتبتوش، هتنسى تحمي endpoint، وده أشهر ثغرة في أي API.",
            how: R`القواعد الأساسية بسيطة. المسار اسم جمع، والـ nesting مستوى واحد بس زي [[/courses/:slug/lessons]]. والـ status codes ليها معنى: 200 تمام، و 201 اتعمل، و 204 تمام ومفيش body، و 400 الداتا غلط، و 401 مش داخل، و 403 داخل بس مش مسموحلك، و 404 مش موجود، و 409 تعارض (زي «مشترك أصلًا»)، و 429 طلبات كتير.

الصفحات العامة بتستخدم [[slug]] بدل الـ id: [[/courses/react-basics]] أحسن للـ SEO وللمستخدم.

وكل حاجة تخص «أنا» بتبدأ بـ [[/me]]. [[GET /me/enrollments]] بياخد الـ userId من التوكن. لكن [[GET /users/:id/enrollments]] بياخده من الـ URL، واللي بيبعته هو العميل، يعني ممكن يبعت أي رقم.

الـ webhook ليه نوع حماية مختلف. مفيش مستخدم داخل، فالحماية بتبقى توقيع HMAC من البوابة. عشان كده مكتوب في العمود «hmac» مش «public».

ولما القايمة تكبر، حوّلها لملف OpenAPI. منه بيطلع توثيق تفاعلي، وتقدر تولّد منه types للواجهة. ده في تاب «APIs متقدمة».`,
            when: "قبل ما تبدأ أي ميزة، وتحدّثها لما تضيف endpoint. وخليها قدامك وانت بتكتب الواجهة.",
            mistakes: R`إنك تعمل [[GET /users/:id/orders]] وتاخد الـ id من الـ URL من غير ما تتأكد إنه نفس اليوزر اللي داخل. ده IDOR. أو تحط أفعال في المسار زي [[/createOrder]]. أو ترجّع 200 لكل حاجة ومعاها [[success: false]]، فالكاش والمراقبة والواجهة كلهم يتلخبطوا.`
          },
          lines: [
            "القايمة العامة بفلاتر في الـ query string، وبترجع المنشور بس.",
            "تفاصيل كورس بالـ slug. الروابط الحقيقية للفيديوهات مبتطلعش هنا.",
            "تسجيل حساب جديد.",
            "الدخول. بيرجّع توكن قصير في الـ body، وتوكن طويل في cookie.",
            "تجديد التوكن. الحماية هنا هي الـ cookie نفسها، مش الـ header.",
            "إنشاء طلب. السيرفر بيحسب السعر وبيكلّم البوابة.",
            "حالة الطلب لصاحبه بس. الصفحة اللي بعد الدفع بتسأل هنا.",
            "البوابة بتكلّمنا. الحماية توقيع HMAC، مش مستخدم داخل.",
            "كورساتي. الـ userId جاي من التوكن مش من الـ URL.",
            "إنشاء كورس للأدمن بس."
          ],
          sol: R`الإجابة الصح لكل سطر بتبقى اسم حاجة في الكود، مش «هنتأكد». في قايمة myapp: [[public]] مفيش حاجة تمنع ودي مقصودة، بس [[GET /courses/:slug]] لازم يشيل رابط الفيديو لغير المشترك. و [[student]] بيمنعها [[requireAuth]]. و [[owner]] في [[GET /orders/:id]] مش بيمنعها الدور خالص: بيمنعها [[userId: req.user.id]] جوه الـ where (درس «ownership»). و [[hmac]] بيمنعها [[verifyPaymob]]. و [[admin]] بيمنعها [[requireRole("ADMIN")]].

أشهر حاجة هتكتشفها إن فيه endpoint عمود «مين» بتاعه [[student]] وهو في الحقيقة [[owner]]: أي طالب مسجل دخول يقدر يقرا طلب طالب تاني لو غيّر الـ id. دي اسمها IDOR، وهي أشهر ثغرة في APIs الحقيقية. وحاجة تانية: [[POST /auth/login]] و [[/auth/signup]] مكتوب قدامهم public، بس محتاجين rate limit، فاكتبه في نفس العمود.`
        },
        {
          cmd: "شكل الأخطاء",
          title: "رد واحد متوقع لأي خطأ",
          desc: R`اتفق من أول يوم على شكل واحد للخطأ: status code صح، وجسم فيه [[code]] ثابت للبرنامج و [[message]] للإنسان. الواجهة بتبني على [[code]]، تترجمه وتعرضه، ومبتبنيش على نص الرسالة. والكلام ده كله بيتعمل في error handler واحد في آخر Express، مش في كل route.`,
          example: R`import { ZodError } from "zod";

export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: { code: "VALIDATION", message: "البيانات مش مظبوطة", details: err.issues } });
  }
  if (err.code === "P2002") return res.status(409).json({ error: { code: "CONFLICT", message: "موجود قبل كده" } });
  if (err.code === "P2025") return res.status(404).json({ error: { code: "NOT_FOUND", message: "مش موجود" } });
  if (err.type === "entity.too.large" || err.type === "entity.parse.failed") return res.status(err.status).json({ error: { code: err.status === 413 ? "TOO_LARGE" : "BAD_JSON", message: "الطلب مش مظبوط" } });
  if (err instanceof AppError) return res.status(err.status).json({ error: { code: err.code, message: err.message } });
  (req.log ?? console).error(err);
  res.status(500).json({ error: { code: "INTERNAL", message: "حصلت مشكلة، جرّب تاني" } });
}`,
          try: R`اعمل route بيعمل [[throw new AppError(403, "FORBIDDEN", "مش مسموحلك")]]، وroute تاني بيعمل [[throw new Error("boom")]]. اطلبهم بـ curl، ولاحظ إن التاني بيرجّع 500 برسالة عامة، و "boom" بتظهر في اللوج بس.`,
          flag: "script",
          deep: {
            why: "من غير شكل موحد، كل route بيرجّع الخطأ بطريقة، والواجهة بتبقى مليانة if وelse عشان تفهم الرد. والأخطر إن رسايل الأخطاء الحقيقية بتطلع للمستخدم، وممكن يبقى فيها SQL أو مسارات ملفات.",
            how: R`Express بيعرف الـ error handler من عدد الـ parameters: لازم ٤ ([[err, req, res, next]]). ولازم يتسجّل بعد كل الـ routes. وفي Express 5، أي async handler بيرمي error أو بيرجّع promise بترفض، الـ error بيوصل هنا لوحده. في Express 4 كنت محتاج try/catch أو مكتبة.

الفكرة إن الـ services بترمي [[AppError]] بمعنى واضح ([[NOT_ENROLLED]] أو [[ALREADY_PAID]])، ومتعرفش حاجة عن HTTP. والـ handler هو اللي بيحوّل. والأخطاء المعروفة من المكتبات بتتحوّل هي كمان: Zod لـ 400، و Prisma [[P2002]] (unique) لـ 409، و [[P2025]] (مش موجود) لـ 404.

أي حاجة مش معروفة تبقى 500 برسالة عامة، والتفاصيل تروح اللوج و Sentry مع request id. متبعتش [[err.message]] للمستخدم أبدًا.

وفيه standard اسمه RFC 9457 (problem+json) بحقول زي type و title و status و detail. لو بتبني API عامة لناس تانية، استخدمه. أما لتطبيقك، الشكل البسيط اللي في المثال كفاية، المهم تلتزم بيه.

وفي الواجهة، الـ [[code]] بيبقى مفتاح ترجمة: [[errors.CONFLICT]] في ملف ar و ملف en.`,
            when: "مع أول route في المشروع. لو أضفته بعد ٣٠ route، هتلاقي ٣٠ شكل مختلف للأخطاء.",
            mistakes: "إنك ترجّع err.message أو الـ stack في الإنتاج. أو تنسى الـ parameter الرابع فـ Express يعتبره middleware عادي. أو تبني الواجهة على نص الرسالة، فأول ما تترجمها كل حاجة تبوظ. وفي مشروع حقيقي، endpoint الـ health كان بيرجّع رسالة خطأ القاعدة زي ما هي، فأي حد يعرف نوع القاعدة وسبب الوقعة."
          },
          lines: [
            "نوع أخطاء Zod عشان نعرفها.",
            "خطأ خاص بالتطبيق، فيه status و code.",
            "بياخد الـ status والـ code والرسالة ويحفظهم.",
            "قفلة.",
            "الـ error handler. الـ ٤ parameters هي اللي بتعرّف Express إنه للأخطاء.",
            "لو الـ validation فشل...",
            "...رد 400، ومعاه كل مشكلة في حقل (issues) عشان الفورم يعرضها.",
            "قفلة.",
            "Prisma P2002 معناها unique اتكسر، زي إيميل متسجّل قبل كده. نرد 409.",
            "Prisma P2025 معناها السجل مش موجود. نرد 404.",
            "أخطاء express.json() نفسه: body أكبر من الـ limit (413) أو JSON بايظ (400). من غير السطر ده الاتنين بيطلعوا 500.",
            "أخطاؤنا المعروفة بتطلع بالـ status والـ code بتوعها.",
            "أي حاجة تانية تروح اللوج بالتفاصيل كاملة (لوجر الطلب لو فيه pino-http، وإلا console)...",
            "...والمستخدم ياخد 500 برسالة عامة من غير أي تفاصيل داخلية.",
            "قفلة."
          ],
          sol: R`الأول يرجّع [[HTTP/1.1 403 Forbidden]] وجسمه [[{"error":{"code":"FORBIDDEN","message":"مش مسموحلك"}}]]. التاني يرجّع [[500]] وجسمه [[{"error":{"code":"INTERNAL","message":"حصلت مشكلة، جرّب تاني"}}]]، وفي ترمنال السيرفر هتلاقي [[Error: boom]] ومعاها الـ stack والملف والسطر. ولو عملت route [[async]] بيرمي، في Express 5 النتيجة نفس الـ 500 بالظبط من غير try/catch.

لو شفت صفحة HTML فيها [[Error: boom]] بدل JSON، يبقى الـ errorHandler مش متسجّل، أو متسجّل قبل الـ routes، أو ناقصه الـ parameter الرابع [[next]]. ولو شفت [[{"error":{"code":"INTERNAL","message":"boom"}}]]، يبقى انت بترجّع [[err.message]] للمستخدم، ودي بالظبط اللي الدرس بيحذّر منها. وجرّب كمان [[curl -d "{bad" -H "Content-Type: application/json"]]: لازم يرجع 400 [[BAD_JSON]] مش 500.`,
          solCode: R`import express from "express";
import { AppError, errorHandler } from "./lib/errors.js";

const app = express();
app.use(express.json());
app.get("/forbidden", () => { throw new AppError(403, "FORBIDDEN", "مش مسموحلك"); });
app.get("/boom", () => { throw new Error("boom"); });
app.get("/async-boom", async () => { throw new Error("async boom"); });
app.use(errorHandler);
app.listen(4000);

// في ترمنال تاني:
// curl -i localhost:4000/forbidden
// curl -i localhost:4000/boom
// curl -i localhost:4000/async-boom`
        }
      ]
    },
    {
      t: "هيكل المشروع وخطة البناء",
      l: 1,
      n: "الفولدرات والبيئات، وتبني بأنهي ترتيب، وإمتى تقول الميزة خلصت",
      items: [
        {
          cmd: "monorepo",
          title: "كل التطبيقات في repo واحد",
          desc: R`الـ monorepo معناه إن الواجهة والـ API والكود المشترك كلهم في repo واحد. أي تغيير في شكل الداتا بيعدّي على الاتنين في commit واحد و PR واحد. مع pnpm workspaces كل فولدر بيبقى package لوحده. و [[packages/shared]] بيبقى فيه الـ types و Zod schemas اللي الاتنين بيستخدموها.

أوامر pnpm (filter و workspace:*) في تاب «Node و npm».`,
          example: R`myapp/
  apps/web/             Next.js: الصفحات والواجهة
  apps/api/             Express + Prisma: الـ API والـ webhooks
  apps/worker/          الـ jobs في الخلفية: إيميلات ومعالجة صور
  packages/shared/      Zod schemas و types مشتركة
  docs/                 requirements و erd و adr و runbook
  pnpm-workspace.yaml   بيعرّف apps/* و packages/*
  .github/workflows/    CI واحد بيفحص الكل`,
          try: R`اعمل الهيكل ده، وفي [[packages/shared]] حط [[export const CreateOrder = z.object({ courseId: z.string() })]]. استورده في الـ api عشان الـ validation، وفي الـ web عشان الفورم. بعدين غيّر اسم الحقل ولاحظ إن الاتنين بيقعوا في typecheck مع بعض.`,
          flag: "script",
          deep: {
            why: "لما كل تطبيق في repo لوحده، الـ API بتغيّر شكل الرد، والواجهة متعرفش غير لما تقع في الإنتاج. وكل ميزة بتحتاج PR في مكانين وتنسيق بينهم. الـ monorepo بيخلي العقد بين الاتنين كود مشترك، والـ typecheck بيمسك الاختلاف.",
            how: R`[[pnpm-workspace.yaml]] فيه [[packages: ["apps/*", "packages/*"]]]. كل فولدر فيه package.json باسم زي [[@myapp/shared]]. والـ api بيعتمد عليه بـ [[workspace:*]]، يعني دايمًا النسخة اللي في الـ repo.

الـ Zod schema المشترك بيستخدم في ٣ أماكن. السيرفر بيعمل بيه validation للطلب. والواجهة بتعمل بيه validation للفورم قبل ما تبعت. وكمان بتطلع منه الـ TypeScript types بـ [[z.infer]]. يعني تعريف واحد، ومفيش اختلاف.

كل تطبيق ليه Dockerfile و deploy لوحده. الـ monorepo بيوحّد الكود، مش الـ deploy. والـ worker ممكن يبقى نفس كود الـ api بس بيشغّل ملف تاني.

وفيه أدوات زي Turborepo و Nx بتعمل cache للـ builds والـ tests، ومفيدة لما المشروع يكبر. في الأول pnpm لوحده كفاية.

إمتى repos منفصلة أحسن؟ لما فرق مختلفة بتنشر في أوقات مختلفة، أو لما جزء منهم open source، أو SDK بيتنشر لعملا.`,
            when: "أول ما يبقى عندك أكتر من تطبيق بيتكلموا مع بعض: واجهة و API، أو API و worker، أو موقع ولوحة أدمن.",
            mistakes: R`إن [[packages/shared]] يستورد من [[apps/api]]، فتعمل دايرة. أو تحط فيه كود سيرفر (Prisma أو أسرار) فيتسحب لبندل المتصفح. أو يبقى فيه lockfile لكل تطبيق لوحده جوه الـ monorepo. وفي مشروع حقيقي كانت ملفات الـ build المضغوطة (zip و tar.gz) متعملها commit جنب الكود. دي مكانها الـ CI والـ releases، مش git.`
          },
          lines: [
            "جذر المشروع.",
            "الواجهة: تطبيق Next.js.",
            "الـ API: Express و Prisma والـ webhooks.",
            "الـ worker: بياخد الشغل التقيل من queue، ونفس الكود ممكن يتشغّل من الـ api.",
            "الكود المشترك: schemas و types من غير أي حاجة سيرفر.",
            "التوثيق جنب الكود، وبيتراجع في نفس الـ PR.",
            "ملف الـ workspace اللي بيخلي pnpm يعرف الـ packages.",
            "CI واحد بيعمل lint و test للكل، أو للي اتغير بس."
          ],
          sol: R`بعد [[pnpm install]] الـ package المشتركة بتتربط بـ symlink جوه [[node_modules/@myapp/shared]] في كل app، فمفيش build ولا publish. و [[pnpm -r typecheck]] يعدّي على الاتنين.

لما تغيّر [[courseId]] لـ [[courseSlug]] في الـ shared، شغّل [[pnpm -r --no-bail typecheck]] (من غير [[--no-bail]] pnpm بيقف عند أول واحد يقع). هتشوف غلطتين في نفس اللحظة: في الـ api [[Property 'courseId' does not exist on type '{ courseSlug: string; }']]، وفي الـ web [[Object literal may only specify known properties, and 'courseId' does not exist]]. ده الهدف كله: العقد بين الواجهة والـ API اتكسر، والـ CI مسكه قبل ما يوصل للمستخدم.

لو محدش وقع، غالبًا الـ web مستورد القيم بـ any، أو الـ package مش متعرّفة كـ [[workspace:*]] ومتسطبة نسخة قديمة من npm.`,
          solCode: R`// pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

// packages/shared/package.json
{
  "name": "@myapp/shared",
  "private": true,
  "type": "module",
  "exports": { ".": "./src/index.ts" },
  "dependencies": { "zod": "^4" }
}

// packages/shared/src/index.ts
import { z } from "zod";
export const CreateOrder = z.object({ courseId: z.string() });
export type CreateOrderInput = z.infer<typeof CreateOrder>;

// apps/api/package.json و apps/web/package.json (الجزء المهم)
"scripts": { "typecheck": "tsc --noEmit" },
"dependencies": { "@myapp/shared": "workspace:*" }

// apps/api/src/orders.ts
import { CreateOrder } from "@myapp/shared";
export function createOrder(body: unknown) {
  const { courseId } = CreateOrder.parse(body);
  return { courseId };
}

// apps/web/src/order-form.ts
import type { CreateOrderInput } from "@myapp/shared";
export const initial: CreateOrderInput = { courseId: "" };

// من الـ root
// pnpm install && pnpm -r --no-bail typecheck`
        },
        {
          cmd: "feature folders",
          title: "رتّب الكود حسب الميزة مش حسب النوع",
          desc: R`بدل ما يبقى عندك [[controllers/]] و [[services/]] و [[models/]]، والميزة الواحدة متفرقة في ٣ أماكن، خلي لكل ميزة فولدر فيه كل حاجتها: routes و service و schema. ده اسمه modular monolith: تطبيق واحد بـ deploy واحد، بس جواه modules حدودها واضحة.

القاعدة إن الـ module بيكلّم التاني عن طريق الـ service بتاعه بس، ومبيقراش جداوله مباشرة.`,
          example: R`apps/api/src/
  modules/auth/        auth.routes.ts  auth.service.ts  auth.schema.ts
  modules/courses/     courses.routes.ts  courses.service.ts  courses.schema.ts
  modules/orders/      orders.routes.ts  orders.service.ts  paymob.ts
  modules/uploads/     uploads.routes.ts  storage.ts
  lib/                 db.ts  logger.ts  errors.ts  config.ts
  middleware/          requireAuth.ts  requireRole.ts  rateLimit.ts
  app.ts               بيجمّع الـ routers والـ middleware
  server.ts            بيشغّل app.listen بس`,
          try: R`اعمل module الـ courses بالتلات ملفات. خلي الـ service ميستوردش حاجة من express خالص. وبعدين اكتب اختبار بينادي [[coursesService.list()]] مباشرة من غير سيرفر.`,
          flag: "script",
          deep: {
            why: "في التقسيم حسب النوع، أي تعديل في «الطلبات» بيلف على ٣ فولدرات. ومسح ميزة مستحيل تعرف هتلمس إيه. ومع الوقت كل حاجة بتكلّم كل حاجة. أما لما الميزة في فولدر واحد، بتفهمها وتعدّلها وتمسحها وحدها. ولو احتجت تفصلها service لوحدها بعدين، حدودها أصلًا جاهزة.",
            how: R`جوه الـ module فيه ٣ طبقات. الـ routes هي HTTP بس: بتقرا الـ input وتعمله parse بـ Zod، وتنادي الـ service، وترد. والـ service فيها القواعد (business rules)، ومتعرفش حاجة عن [[req]] و [[res]]. ودي أهم نقطة: نفس الدالة بيناديها route، أو webhook، أو job، أو اختبار. والوصول للقاعدة من جوه الـ service بـ Prisma. ولو المنطق كبر، ممكن تعمل repository لوحده، بس في الأول مش لازم.

فصل [[app.ts]] عن [[server.ts]] بيخلي الاختبارات تستورد الـ app وتضربه بـ supertest من غير ما تفتح بورت.

والكلام بين الـ modules بيبقى من الـ service. مثلًا الـ orders service لما الدفع ينجح بتنادي [[enrollments.grant(userId, courseId)]]، ومبتكتبش في جدول enrollment بنفسها. كده لو قاعدة الاشتراك اتغيرت، بتتغير في مكان واحد.

الطبقات والـ SOLID والـ patterns بالتفصيل في تاب «هندسة البرمجيات».`,
            when: "من أول module. ولو عندك مشروع قديم مترتب حسب النوع، انقل ميزة ميزة وانت بتعدّل فيها، مش كله مرة واحدة.",
            mistakes: R`إنك تحط الـ business logic جوه الـ route handler، فلما الـ webhook يحتاج نفس المنطق تنسخه، والنسختين يختلفوا بعد شهر. أو service بتاخد [[req]] كـ parameter. أو فولدر [[utils/]] يبقى مخزن لكل حاجة ملهاش مكان. وفي مشروع حقيقي كان controller الدفع لوحده ٢٠٠٠ سطر، وفيه ٣ بوابات. الأحسن ملف لكل بوابة، وواجهة واحدة يناديها الـ orders service.`
          },
          lines: [
            "كود الـ API.",
            "module الدخول: الـ routes، والمنطق، وschemas الـ validation.",
            "module الكورسات بنفس الشكل.",
            "module الطلبات، ومعاه التكامل مع البوابة في ملف لوحده.",
            "module الرفع، وجواه طبقة storage تقدر تبدّلها (local أو S3).",
            "حاجات مشتركة مش ميزات: القاعدة، واللوج، والأخطاء، والإعدادات.",
            "الـ middleware اللي بيتحط قدام الـ routes.",
            "بيبني الـ app ويرجّعه. الاختبارات بتستورده من هنا.",
            "بيشغّل السيرفر بس. ده الملف اللي بيتشغّل في الإنتاج."
          ],
          sol: R`الاختبار لازم يعدّي من غير ما تعمل [[app.listen]] ولا supertest: [[coursesService.list()]] دالة عادية بترجّع array. وعشان تتأكد إن الـ service نضيف، [[grep -rn express src/modules/courses/courses.service.ts]] لازم يرجع فاضي. الناتج المتوقع من Vitest: [[Test Files 1 passed]] و [[Tests 2 passed]].

الـ routes هي الوحيدة اللي تعرف HTTP: بتاخد [[req.query]]، وتعمله parse بالـ schema، وتنادي الـ service، وترجّع JSON. لو لقيت نفسك بتعدّي [[req]] أو [[res]] للـ service، أو بترمي [[res.status(404)]] من جواها، يبقى الحدود باظت. الـ service ترمي [[AppError]]، والـ handler هو اللي يحوّل.`,
          solCode: R`// modules/courses/courses.schema.ts
import { z } from "zod";
export const ListCourses = z.object({
  q: z.string().trim().max(100).optional(),
  take: z.coerce.number().int().min(1).max(50).default(20),
});
export type ListCoursesInput = z.infer<typeof ListCourses>;

// modules/courses/courses.service.ts
import { db } from "../../lib/db";
import type { ListCoursesInput } from "./courses.schema";

export const coursesService = {
  list({ q, take = 20 }: Partial<ListCoursesInput> = {}) {
    return db.course.findMany({
      where: { published: true, ...(q && { title: { contains: q, mode: "insensitive" } }) },
      select: { id: true, slug: true, title: true, priceCents: true },
      orderBy: { title: "asc" },
      take,
    });
  },
};

// modules/courses/courses.routes.ts
import { Router } from "express";
import { ListCourses } from "./courses.schema";
import { coursesService } from "./courses.service";

export const coursesRouter = Router();
coursesRouter.get("/courses", async (req, res) => {
  res.json({ data: await coursesService.list(ListCourses.parse(req.query)) });
});

// modules/courses/courses.service.test.ts
import { afterAll, expect, test } from "vitest";
import { db } from "../../lib/db";
import { coursesService } from "./courses.service";

afterAll(() => db.$disconnect());

test("بيرجّع الكورسات المنشورة بس، ومن غير أعمدة داخلية", async () => {
  const list = await coursesService.list();
  expect(list.length).toBeGreaterThan(0);
  expect(list[0]).not.toHaveProperty("instructorId");
});

test("البحث مش حساس لحالة الحروف", async () => {
  const list = await coursesService.list({ q: "sql" });
  expect(list.every((c) => c.title.toLowerCase().includes("sql"))).toBe(true);
});`
        },
        {
          cmd: ".env لكل بيئة",
          title: "dev و staging و prod وكل واحدة بإعداداتها",
          desc: R`نفس الكود بيشتغل في ٣ أماكن. dev على جهازك. و staging نسخة طبق الأصل من الإنتاج، بداتا تجربة ومفاتيح test من البوابة. و prod للناس الحقيقية. الفرق بينهم متغيرات بيئة بس، مش if جوه الكود.

واتأكد من المتغيرات كلها أول ما السيرفر يقوم. لو فيه متغير ناقص، السيرفر يقع فورًا برسالة واضحة، بدل ما يقع بعد ساعة في نص عملية دفع.`,
          example: R`import { z } from "zod";

const Env = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  WEB_ORIGIN: z.url(),
  PAYMOB_SECRET_KEY: z.string().min(1),
  PAYMOB_HMAC_SECRET: z.string().min(1),
  REDIS_URL: z.url().optional(),
});

export const config = Env.parse(process.env);`,
          try: R`حط الملف ده في [[lib/config.ts]]، وامسح [[JWT_SECRET]] من الـ .env وشغّل السيرفر. لازم يقع في أول ثانية برسالة فيها اسم المتغير. بعدين اعمل [[.env.example]] بنفس الأسماء ومن غير قيم.`,
          flag: "script",
          deep: {
            why: "المتغير الناقص من غير فحص بيطلع undefined، والمشكلة مبتبانش غير لما الكود يوصله: أول دفعة، أو أول إيميل. وفي staging بتكتشف المشاكل دي قبل الإنتاج. وفصل البيئات بيمنع أسوأ غلطة: مفاتيح Paymob الحقيقية في بيئة تجربة، أو قاعدة الإنتاج في جهاز التطوير.",
            how: R`كل تطبيق عنده [[.env.example]] متعمله commit، فيه أسماء المتغيرات ومن غير قيم. وعنده [[.env]] على الجهاز في [[.gitignore]]. وفي الإنتاج القيم بتيجي من المنصة، أو من [[env_file]] في compose على السيرفر.

[[Env.parse(process.env)]] بيشتغل مرة واحدة وقت الـ import. لو فيه حاجة غلط، بيرمي error فيه كل الحقول الغلط مرة واحدة، والسيرفر مبيقومش. ده اسمه fail fast. وكمان [[config]] بيبقى typed، فـ [[config.JWT_SECRET]] نوعه string مش [[string | undefined]].

خلي بالك إن NODE_ENV مش APP_ENV. [[NODE_ENV=production]] لازم يبقى في staging والإنتاج الاتنين، عشان المكتبات تشتغل بالوضع السريع. وعشان تفرّق بينهم استخدم APP_ENV.

وفي الواجهة، أي متغير بيبدأ بـ [[NEXT_PUBLIC_]] بيتحط في الـ JavaScript وقت الـ build، وأي حد يقدر يقراه. عشان كده مفيش أي سر يبدأ بيه. وكمان build الـ staging غير build الإنتاج لو القيم مختلفة.

وكل بيئة ليها حاجتها لوحدها: قاعدة بيانات، و bucket للملفات، و integration في Paymob بوضع test، وإيميلات staging تروح sandbox مش لناس حقيقيين. تفاصيل .env نفسه في تاب «Node و npm»، ولو اترفع على git شوف تاب «الأمان».`,
            when: "أول ملف تكتبه في أي API. وكل ما تضيف متغير: في config.ts، وفي .env.example، وفي إعدادات staging والإنتاج، في نفس الـ PR.",
            mistakes: R`staging بيستخدم قاعدة الإنتاج «مؤقتًا». أو [[NODE_ENV=staging]]، فمكتبات كتير تشتغل بوضع التطوير البطيء. وفي مشاريع حقيقية لقينا ٣ غلطات. الأولى مفاتيح Paymob و Bunny السرية كانت بتبدأ بـ [[NEXT_PUBLIC_]]، يعني كانت في الـ JavaScript عند كل زائر. التانية [[AUTH_SECRET]] كان ليه قيمة افتراضية في الكود، فلو المتغير ناقص السيرفر يشتغل عادي بسر معروف. والتالتة [[.env.example]] كان فيه [[JWT_SECRET]] والكود بيقرا [[JWT_ACCESS_SECRET]]، ومكانش فيه ولا متغير لـ Paymob، مع إنها البوابة الأساسية.`
          },
          lines: [
            "Zod هو اللي هيفحص المتغيرات.",
            "شكل الإعدادات المطلوبة.",
            "البيئة، ومسموح ٣ قيم بس.",
            "رابط القاعدة لازم يبقى URL سليم.",
            "سر التوكنات ٣٢ حرف على الأقل. السر القصير بيتكسر.",
            "رابط الواجهة، وبيتستخدم في CORS وفي روابط الإيميلات.",
            "مفتاح Paymob السري، وده مكانه السيرفر بس.",
            "سر الـ HMAC عشان نتحقق من الـ webhook.",
            "Redis اختياري في dev، بس في الإنتاج هتحتاجه للـ queues.",
            "قفلة الـ schema.",
            "افحص مرة واحدة وقت التشغيل، ولو فيه غلط السيرفر ميقومش خالص."
          ],
          sol: R`السيرفر لازم يقع قبل ما يطبع «listening»، بـ [[ZodError]] فيها [[path: ["JWT_SECRET"]]] و [[message: "Invalid input: expected string, received undefined"]] (ده شكل رسايل Zod 4). ولو حطيت قيمة قصيرة زي [[JWT_SECRET=short]] هتشوف [[Too small: expected string to have >=32 characters]]. ولو [[APP_ENV=dev]] هتشوف [[Invalid option: expected one of "development"|"staging"|"production"]]. وكل المتغيرات الغلط بتظهر مع بعض في نفس الرسالة، مش واحد واحد.

لو السيرفر اشتغل عادي، يبقى في الغالب الـ .env مش بيتقري أصلًا (ناقص [[import "dotenv/config"]] أو [[node --env-file=.env]])، والمتغير جاي من الـ shell. أو [[config]] بيتعمل import بعد ما السيرفر اشتغل. لازم يبقى أول حاجة في [[server.ts]].`,
          solCode: R`# .env.example: الأسماء بس، ويترفع على git
APP_ENV=development
DATABASE_URL=
JWT_SECRET=
WEB_ORIGIN=http://localhost:3000
PAYMOB_SECRET_KEY=
PAYMOB_HMAC_SECRET=
# اختياري
REDIS_URL=

# .gitignore
.env
.env.*
!.env.example`
        },
        {
          cmd: "ترتيب البناء",
          title: "تبدأ بإيه وتخلّص بإيه",
          desc: R`الترتيب اللي بيقلل الرجوع لورا: schema، وبعدين API، وبعدين UI، وبعدين auth، وبعدين الدفع، وفي الآخر الإطلاق. بس قبل ده كله اعمل «walking skeleton»: صفحة واحدة بتنادي endpoint واحد بيقرا من القاعدة، ومرفوعة على staging من أول أسبوع. كده مشاكل الـ deploy والـ CORS والمتغيرات بتظهر وهي لسه صغيرة.

وبعدين ابني ميزة ميزة بالعرض (vertical slice). كل ميزة من القاعدة للشاشة وتخلص. متعملش كل الجداول الأول، وبعدين كل الـ APIs، وبعدين كل الشاشات.`,
          example: R`أسبوع 1: skeleton: GET /health وصفحة بتعرضه، و CI، و deploy على staging
أسبوع 1: schema أولي و seed بكورسات تجربة
أسبوع 2: الكورسات: API القايمة والتفاصيل، وبعدين الصفحات بتاعتهم
أسبوع 3: auth: signup و login و refresh، وبعدين فورم الدخول وصفحة «حسابي»
أسبوع 4: الدفع: order، وبعدين Paymob، وبعدين webhook، وبعدين صفحة النتيجة
أسبوع 5: المشاهدة: الدروس للمشتركين بس، ورفع الفيديو للمدرّب
أسبوع 6: لوحة الأدمن، ومراقبة الأخطاء، والباك أب، والإطلاق`,
          try: R`اعمل الـ skeleton بتاع مشروعك النهارده: [[GET /health]] بيرجّع [[{ ok: true }]] من القاعدة، وصفحة Next بتعرضه، ومرفوعين على سيرفر أو منصة. متكتبش ولا ميزة قبل ما ده يشتغل على رابط حقيقي.`,
          flag: "script",
          deep: {
            why: "لو بنيت كل طبقة لوحدها، مفيش حاجة هتشتغل من أولها لآخرها لحد الأسبوع الخامس، وكل المفاجآت هتطلع في الآخر. والـ deploy تحديدًا مليان مفاجآت: الـ cookies مش شغالة على الدومين الحقيقي، والـ webhook مش واصل، والـ build بيقع على السيرفر.",
            how: R`الترتيب ده ليه منطق. القراية العامة (الكورسات) بتيجي الأول لأنها مش محتاجة auth، وبيبقى عندك حاجة تتشاف بسرعة. الـ auth قبل الطلبات لأن كل طلب محتاج صاحب. والدفع بعد الاتنين لأنه محتاج مستخدم وطلب. والمشاهدة بعد الدفع لأنها محتاجة اشتراك.

والـ vertical slice معناها إن الميزة «خلصت» فعلًا بكل طبقاتها واختباراتها. لو وقفت في أي أسبوع، اللي خلص شغال وتقدر توريه لحد.

الـ seed من أول أسبوع ([[prisma db seed]] في تاب «Node و npm»). من غير داتا تجربة، الواجهة بتتبني على بيانات فاضية، والمشاكل مبتبانش.

وابدأ في الحاجات اللي بتاخد وقت برّه الكود بدري. حساب التاجر في بوابة الدفع مثلًا محتاج أوراق ومراجعة ممكن تاخد أسابيع. والدومين وإعداد الإيميل (DNS) نفس الكلام. قدّمهم من أول يوم، عشان لما توصل للدفع متلاقيش نفسك مستني.

والحاجة اللي مش خلصانة تقدر ترفعها مخفية ورا feature flag، بدل ما تفضل في branch طويل بيبعد كل يوم عن main.`,
            when: "في أول المشروع كخطة، ومع كل ميزة كبيرة: قسّمها slices، وكل slice تخلص لوحدها.",
            mistakes: "إنك تأجّل الـ deploy لآخر أسبوع. أو تبني لوحة أدمن كاملة قبل ما الطالب يقدر يشتري. أو تبدأ الدفع في آخر أسبوع وتكتشف إن حساب التاجر لسه متفعّلش. أو تشتغل branch واحد ٣ أسابيع وتعمل merge مرة واحدة."
          },
          lines: [
            "الهيكل الماشي: طلب واحد بيعدّي على كل الطبقات لحد الإنتاج.",
            "القاعدة وداتا تجربة، عشان الشاشات تتبني على حاجة حقيقية.",
            "أول ميزة كاملة. قراية عامة من غير auth.",
            "المستخدمين، لأن كل اللي بعد كده محتاج صاحب.",
            "أخطر ميزة. خلي قبلها وبعدها وقت.",
            "المحتوى المحمي: معتمد على الاشتراك اللي بيجي من الدفع.",
            "التشغيل: مراقبة وباك أب قبل ما الناس الحقيقية تدخل."
          ],
          sol: R`الـ skeleton خلص لما تفتح الرابط الحقيقي (مش localhost) وتلاقي الصفحة بتعرض [[ok: true]] جاية من API على سيرفر، والـ API سأل القاعدة فعلًا. ولو وقّفت القاعدة، الصفحة المفروض تعرض خطأ مش [[ok: true]] ثابتة. كده انت اتأكدت من الـ DNS والـ HTTPS والـ CORS ومتغيرات البيئة والـ migrations على السيرفر، وكل دول حاجات بتاخد يوم لوحدها لو سيبتها للآخر.

أشهر حاجة هتقابلك: الصفحة بتشتغل على جهازك ومش على السيرفر عشان [[NEXT_PUBLIC_API_URL]] لسه بـ localhost، أو الـ API بيرفض الطلب بـ CORS لأن [[WEB_ORIGIN]] مش متظبط على الدومين الحقيقي. ده بالظبط سبب إنك تعمله أول يوم.`,
          solCode: R`// apps/api/src/app.ts
app.get("/health", async (req, res) => {
  await db.$queryRaw$__btSELECT 1$__bt;
  res.json({ ok: true });
});

// apps/web/app/page.tsx (server component)
export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(process.env.API_URL + "/health", { cache: "no-store" });
  const data = res.ok ? await res.json() : { ok: false };
  return <main>API: {data.ok ? "ok" : "down"}</main>;
}`
        },
        {
          cmd: "definition of done",
          title: "إمتى الميزة تبقى خلصت فعلًا",
          desc: R`«خلصت» مش معناها «شغالة على جهازي». اتفق على قايمة ثابتة، وأي ميزة لازم تعدّيها قبل ما تتقفل. وحطها في PR template عشان تظهر لوحدها مع كل PR. القايمة دي هي الفرق بين مشروع بيكبر بهدوء، ومشروع كل ميزة فيه بتكسر اللي قبلها.`,
          example: R`- [ ] كل الـ acceptance criteria بتاعة الـ story متحققة
- [ ] validation بـ Zod على كل input في السيرفر
- [ ] الصلاحيات: جرّبت بيوزر مش صاحب الداتا، ورجع 403 أو 404
- [ ] الحالات الوحشة: فاضي، وخطأ، وبطيء (loading)، ونت قاطع
- [ ] فيه اختبار للـ service على الأقل، و npm run check عدّى
- [ ] الـ migration اتجرّبت على staging، ومفيش عمود فيه داتا اتمسح
- [ ] عربي وإنجليزي و RTL، وعلى موبايل
- [ ] الأخطاء بتوصل Sentry، ومفيش أسرار في اللوج
- [ ] .env.example والـ docs اتحدّثوا لو فيه متغير أو قرار جديد`,
          try: R`حط القايمة في [[.github/pull_request_template.md]]، وافتح PR لآخر ميزة عملتها وعلّم على اللي اتعمل بجد. اللي معرفتش تعلّم عليه هو شغلك الجاي.`,
          flag: "script",
          deep: {
            why: "من غير تعريف ثابت، كل ميزة بتخلص بمستوى مختلف. واحدة فيها validation والتانية لأ، وواحدة شغالة بالعربي والتانية بتتقلب في RTL. والحاجات دي بتتراكم لحد ما يبقى عندك «تنضيف» بياخد شهر.",
            how: R`القايمة دي معمولة من الغلطات اللي بتتكرر، مش من كتاب. كل بند فيها ورا مشكلة حصلت قبل كده.

بند الصلاحيات هو أهم واحد: افتح الطلب بيوزر تاني فعلًا، متفترضش. أشهر ثغرة في أي API هي إن endpoint بيتأكد إنك داخل ومبيتأكدش إن الحاجة بتاعتك.

بند الـ migration مهم لأن مسح عمود أو تغيير نوعه على قاعدة فيها داتا مبيرجعش. والطريقة الآمنة (expand ثم contract) في أسئلة الانترفيو في آخر التاب.

والـ PR template بيظهر لوحده في GitHub كل ما تفتح PR، فالقايمة متتنسيش. والبنود اللي تقدر تتأتمت (lint و typecheck و test) بتروح في CI، فالقايمة اليدوية تفضل صغيرة. التفاصيل في تاب «فحص الكود» وتاب «GitHub Actions».`,
            when: "مع كل PR، حتى لو بتشتغل لوحدك. انت بعد شهر هتبقى شخص تاني مش فاكر حاجة.",
            mistakes: "قايمة طويلة لدرجة إن محدش بيقراها، فالكل يعلّم عليها وخلاص. أو بنود مش بتتقاس زي «الكود نضيف». أو إنك تعتبر الميزة خلصت قبل ما تتجرّب على staging."
          },
          lines: [
            "الميزة بتعمل اللي الـ story طالباه، بكل شروطها.",
            "السيرفر مبيثقش في أي حاجة جاية من برّه.",
            "أهم بند. افتح الطلب بيوزر تاني فعلًا، متفترضش.",
            "الشاشة ليها ٤ حالات مش حالة واحدة.",
            "المنطق متغطي باختبار، وكل الفحوصات عدّت.",
            "القاعدة اتغيرت بأمان، واتجرّبت على داتا شبه الحقيقية.",
            "اتجرّبت باللغتين وعلى شاشة صغيرة.",
            "لو وقعت في الإنتاج هتعرف، ومفيش باسورد أو توكن في اللوج.",
            "اللي جاي بعدك يلاقي الإعدادات والقرارات مكتوبة."
          ],
          sol: R`GitHub بيقرا الملف ده من [[.github/pull_request_template.md]] على الـ default branch، فأول PR بعد ما يتعمل merge هيفتح والقايمة جواه لوحدها، والـ checkboxes بتتعلّم بالضغط عليها. ولو القايمة مظهرتش، غالبًا الملف لسه في branch تانية، أو اسمه أو مكانه غلط.

النتيجة الطبيعية لأول مرة إنك متعلّمش على كله. أشهر ٣ بيفضلوا فاضيين: الحالات الوحشة (مفيش loading ولا رسالة لما النت يقطع)، واختبار الصلاحيات بيوزر تاني، والموبايل و RTL. ومتعلّمش على حاجة معملتهاش «عشان هي بسيطة»، القايمة دي قيمتها في إنها صادقة. واللي فاضل اعمله issues ليها أصحاب.`
        }
      ]
    }
  ]
});

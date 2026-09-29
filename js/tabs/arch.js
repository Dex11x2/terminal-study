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
    },
    {
      t: "auth من الأول للآخر",
      l: 2,
      n: "من فورم التسجيل لحد logout: القاعدة والـ API والواجهة، والتوكنات بتتخزن فين وليه",
      items: [
        {
          cmd: "signup",
          title: "حساب جديد: validation و hash ورد نضيف",
          desc: R`التسجيل ٣ خطوات: validation للإيميل والباسورد بـ Zod، وبعدين hash للباسورد بـ argon2، وبعدين إنشاء المستخدم. والرد عمره ما يرجّع الـ hash.

ولو الإيميل متسجّل قبل كده، القيد [[@unique]] في القاعدة هو اللي بيمسكها، والـ error handler بيحوّلها 409. أساسيات الباسوردات والـ hashing في تاب «أمان الموقع».`,
          example: R`import argon2 from "argon2";
import { z } from "zod";

const Signup = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().transform((e) => e.toLowerCase()),
  password: z.string().min(8).max(128),
});

router.post("/auth/signup", async (req, res) => {
  const input = Signup.parse(req.body);
  const passwordHash = await argon2.hash(input.password);
  const user = await db.user.create({ data: { name: input.name, email: input.email, passwordHash } });
  res.status(201).json({ data: { id: user.id, name: user.name, email: user.email } });
});`,
          try: R`سجّل بنفس الإيميل مرتين، مرة [[Ali@Example.com]] ومرة [[ali@example.com]]. التانية لازم ترجع 409. بعدين افتح جدول المستخدمين وبص على شكل الـ hash: هتلاقيه بيبدأ بـ [[$argon2id$]] وجواه الإعدادات والـ salt.`,
          flag: "script",
          deep: {
            why: "التسجيل أول مكان المهاجم بيجرّبه، وأول مكان الداتا الوحشة بتدخل منه. وأي غلطة فيه بتفضل في القاعدة للأبد: باسورد متخزن نص عادي، أو حسابين لنفس الشخص عشان مرة كتب الإيميل بحروف كبيرة ومرة صغيرة.",
            how: R`argon2id هو الموصى بيه حاليًا. هو بطيء عن قصد، وبياكل رام، فتجربة مليارات الباسوردات على GPU بتبقى غالية جدًا. والنص اللي بيطلع منه فيه كل حاجة: نوع الخوارزمية، والإعدادات، والـ salt العشوائي، والـ hash. عشان كده [[argon2.verify]] مش محتاج أي حاجة غير النص ده والباسورد.

الإيميل بيتحوّل small قبل الحفظ، وقبل البحث في الـ login كمان. ولو طلبين تسجيل بنفس الإيميل وصلوا في نفس اللحظة، القيد unique بيرفض واحد منهم، ومفيش حاجة في الكود تقدر تضمن ده غير القيد.

فيه قرار صغير هنا: الـ 409 بتقول للمهاجم إن الإيميل ده عنده حساب. في أغلب المنتجات ده مقبول. بس لو المنتج حساس، رد بنفس الرسالة في الحالتين («بعتنالك إيميل»)، وابعت للإيميل الموجود رسالة «عندك حساب بالفعل».

وتأكيد الإيميل نفس فكرة استعادة الباسورد اللي هتيجي: token عشوائي، ومتخزن hash منه، وليه مدة. في الـ MVP ممكن تسمح بالدخول وتمنع الشراء لحد ما الإيميل يتأكد.`,
            when: "أول ميزة في الـ auth. وحط rate limit على المسار ده زي الـ login بالظبط.",
            mistakes: R`إنك تخزّن الباسورد نص، أو MD5، أو SHA256 من غير salt. ودول كلهم سريعين، والسرعة هنا عيب. وفي مشروع حقيقي كان فيه عمود للباسورد كنص عادي، والدخول بيقارن بيه الأول قبل الـ hash، وحسابات الموظفين بتتعمل بباسورد افتراضي واحد للكل. وكمان كان فيه route للتطوير بيعرض المستخدمين بباسورداتهم، ولسه موجود. كفاية تسريب واحد عشان كل الحسابات تتكشف. وغلطة تانية شائعة: إنك ترجّع [[user]] كله من create، فيطلع [[passwordHash]] في الرد.`
          },
          lines: [
            "argon2 عشان الـ hash. ده الموصى بيه حاليًا، و bcrypt مقبول برضه.",
            "Zod للـ validation.",
            "شكل الداتا المطلوبة للتسجيل.",
            "الاسم: من غير مسافات على الأطراف، ومن ٢ لـ ٨٠ حرف.",
            "إيميل سليم، ويتحوّل small عشان الكبير والصغير ميبقوش حسابين.",
            "الباسورد ٨ حروف على الأقل، و ١٢٨ كحد أقصى عشان محدش يبعت ميجا يتعمله hash.",
            "قفلة.",
            "الـ route. مفيش try/catch، لأن Express 5 بيوصّل الأخطاء للـ handler لوحده.",
            "لو الداتا غلط، Zod بيرمي error والـ handler بيرد 400.",
            "الـ hash. بياخد جزء من الثانية، وده مقصود.",
            "إنشاء المستخدم. لو الإيميل موجود، القيد unique بيرفض والرد يبقى 409.",
            "رد 201 بالحقول الآمنة بس. الـ hash مبيطلعش أبدًا.",
            "قفلة."
          ],
          sol: R`الأول يرجّع [[201]] وجسمه [[{"data":{"id":"...","name":"Ali","email":"ali@example.com"}}]]. لاحظ إن الإيميل رجع small letters، لأن الـ [[transform]] في Zod شغّال قبل ما يوصل للقاعدة. التاني يرجّع [[409]] و [[{"error":{"code":"CONFLICT","message":"موجود قبل كده"}}]]: الإيميلين بقوا نفس القيمة، والـ [[@unique]] رمى P2002، والـ error handler حوّله.

في الجدول هتلاقي حاجة شكلها كده: [[$argon2id$v=19$m=65536,p=4,t=3$le7pL+uK...$39opv3ec...]]. [[v=19]] نسخة الخوارزمية، و [[m=65536]] يعني ٦٤ ميجا رام لكل hash، و [[t=3]] عدد اللفات، و [[p=4]] التوازي، وبعدها الـ salt وبعدها الناتج. عشان كل الإعدادات جوه النص، [[argon2.verify]] مش محتاج تديله أي حاجة غير الـ hash والباسورد.

لو التانية رجعت 201، يبقى الـ transform مش شغال (مثلًا بتعمل [[req.body.email]] بدل [[input.email]])، وعندك دلوقتي حسابين لنفس الشخص. ولو رجعت 500، يبقى الـ error handler مش بيحوّل P2002.`
        },
        {
          cmd: "access + refresh",
          title: "الدخول: توكن قصير وتوكن طويل",
          desc: R`لما الباسورد يطلع صح، السيرفر بيطلّع حاجتين. الأول access token (JWT) عمره ١٥ دقيقة، وبيتبعت في header مع كل طلب. والتاني refresh token عشوائي عمره ٣٠ يوم، بيتحط في cookie [[httpOnly]] الـ JavaScript مش شايفها، وبيتخزن hash منه في القاعدة.

القصير لو اتسرق بيموت بسرعة. والطويل مبيتسرقش بـ XSS، وتقدر تلغيه من القاعدة في أي وقت.`,
          example: R`const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");

router.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password } = Login.parse(req.body);
  const user = await db.user.findUnique({ where: { email } });
  const ok = await argon2.verify(user?.passwordHash ?? DUMMY_HASH, password);
  if (!user || !ok) throw new AppError(401, "BAD_CREDENTIALS", "الإيميل أو الباسورد غلط");
  const accessToken = jwt.sign({ sub: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: "15m" });
  const refresh = crypto.randomBytes(32).toString("base64url");
  await db.session.create({ data: { userId: user.id, tokenHash: sha256(refresh), expiresAt: new Date(Date.now() + 30 * 864e5) } });
  res.cookie("rt", refresh, { httpOnly: true, secure: true, sameSite: "lax", path: "/auth", maxAge: 30 * 864e5 });
  res.json({ data: { accessToken, user: { id: user.id, name: user.name, role: user.role } } });
});`,
          try: R`سجّل دخول من المتصفح وافتح DevTools. في Application ثم Cookies هتلاقي [[rt]] وقدامها HttpOnly. بعدين اكتب [[document.cookie]] في الـ Console، ولاحظ إنها مش ظاهرة. خد الـ access token والصقه في jwt.io، هتلاقي الـ payload مقروء، يعني مفيش أي سر يتحط فيه.`,
          flag: "script",
          deep: {
            why: "لو عندك توكن واحد عمره طويل، سرقته معناها حساب مسروق لأسابيع، ومفيش طريقة تلغيه. ولو توكن واحد قصير، المستخدم هيسجّل دخول كل ربع ساعة. الاتنين مع بعض بيدّوك الأمان والراحة في نفس الوقت.",
            how: R`الـ JWT موقّع بالـ secret. السيرفر بيتحقق منه من غير ما يسأل القاعدة، وده أسرع. بس معنى كده إنك مينفعش تلغيه قبل ما يخلص، عشان كده عمره قصير. الـ refresh token العكس: نص عشوائي ملوش معنى، ومتخزن في جدول sessions، فتقدر تلغيه، وتعرض للمستخدم أجهزته، وتعمل «اخرج من كل الأجهزة».

والقاعدة بتخزن sha256 للـ refresh مش التوكن نفسه. لو القاعدة اتسربت، الـ hashes دي ملهاش أي فايدة للمهاجم.

إعدادات الـ cookie كل واحد فيهم ليه سبب. [[httpOnly]] معناها إن JavaScript مش شايفها، فالـ XSS ميقدرش يسرقها. و [[secure]] معناها HTTPS بس. و [[sameSite: "lax"]] معناها إن المتصفح مش هيبعتها مع POST جاي من موقع تاني، ودي حماية من CSRF. و [[path: "/auth"]] معناها إنها بتتبعت لمسارات الـ auth بس، مش مع كل طلب.

والـ access token مكانه الذاكرة، يعني متغير في JavaScript. مش localStorage، لأن أي XSS يقدر يقرا localStorage.

خلي بالك من [[DUMMY_HASH]]. لو المستخدم مش موجود وانت تجاهلت الـ verify، الرد هيطلع أسرع، والمهاجم يقدر يعرف الإيميلات المتسجّلة من الوقت. فبنعمل verify على hash وهمي عشان الوقت يبقى واحد في الحالتين.

وموضوع الدومين: لو الواجهة على [[app.example.com]] والـ API على [[api.example.com]]، الاتنين same-site و lax شغالة. لكن لو على دومينين مختلفين خالص، هتحتاج [[SameSite=None]]، والأحسن تحطهم تحت نفس الدومين.

وفيه بديل أبسط: session id عادي في cookie والبيانات في القاعدة أو Redis. ده مناسب لو التطبيق ويب بس، ومكتبات زي Auth.js و Better Auth بتعمله. أما الـ JWT مع refresh فبيبان فايدته لما نفس الـ API بيخدم ويب وموبايل.`,
            when: "أي API بيخدم أكتر من client، أو عايز دخول طويل من غير ما تخاطر.",
            mistakes: R`في مشروع حقيقي، الـ refresh token كان بيتحط في cookie httpOnly، وبرضه بيرجع في الـ JSON. والواجهة كانت بتحفظه في localStorage، فالـ httpOnly بقت ملهاش لازمة. وفي مشروع تاني، التوكن الوحيد كان في localStorage وعمره أيام. ومن الغلطات الشائعة كمان: بيانات حساسة في الـ payload (ده base64 مش تشفير). أو [[jwt.decode]] بدل [[jwt.verify]]. أو رسالتين مختلفتين للإيميل الغلط والباسورد الغلط. أو login من غير rate limit.`
          },
          lines: [
            "دالة صغيرة بتعمل sha256. بنخزن بيها الـ refresh token في القاعدة.",
            "مسار الدخول، وقدامه rate limit عشان تخمين الباسوردات.",
            "Zod بيتأكد من الشكل، وبيحوّل الإيميل small.",
            "دوّر على المستخدم.",
            "اتحقق من الباسورد. ولو مفيش مستخدم، اتحقق على hash وهمي عشان الوقت يبقى واحد.",
            "رسالة واحدة للحالتين، متقولش أنهي فيهم الغلط.",
            "توكن قصير فيه id المستخدم ودوره، عمره ربع ساعة.",
            "توكن طويل عشوائي، ٣٢ بايت.",
            "سجّل الـ session بالـ hash بتاعه بس، وعمرها ٣٠ يوم.",
            "حطه في cookie محدش يقراها غير المتصفح، ومبتتبعتش غير لمسارات الـ auth.",
            "رجّع التوكن القصير وبيانات المستخدم الأساسية.",
            "قفلة."
          ],
          sol: R`في DevTools هتلاقي [[rt]] وقدامها علامة في HttpOnly و Secure، و SameSite بـ Lax، و Path بـ [[/auth]]. نفس الكلام ظاهر في الـ header: [[Set-Cookie: rt=...; Max-Age=2592000; Path=/auth; HttpOnly; Secure; SameSite=Lax]]. و [[document.cookie]] في الـ Console هترجع نص فاضي أو cookies تانية، بس [[rt]] مش فيها. ده اللي بيحميها من أي XSS.

في jwt.io الـ header هيبقى [[{"alg":"HS256","typ":"JWT"}]]، والـ payload [[{"sub":"cmun8...","role":"STUDENT","iat":1790720120,"exp":1790721020}]]. الفرق بين exp و iat هو 900 ثانية، يعني الـ 15 دقيقة. وأي حد معاه التوكن يقرا الكلام ده من غير المفتاح، التوقيع بس بيمنع التعديل.

لو [[rt]] مظهرتش خالص: على [[http://]] غير localhost المتصفح بيرفض أي cookie عليها Secure. ولو الواجهة على port تاني، لازم [[credentials: "include"]] في الـ fetch، وإلا المتصفح بيتجاهل الـ Set-Cookie.`,
          solCode: R`# نفس الكلام من الترمنال
curl -si -H "Content-Type: application/json" \
  -d '{"email":"ali@example.com","password":"secret123"}' \
  localhost:4000/auth/login | grep -i set-cookie

# فك الـ payload من غير أي مفتاح
node -e 'const t = process.argv[1]; console.log(JSON.parse(Buffer.from(t.split(".")[1], "base64url")))' "ACCESS_TOKEN_HERE"`
        },
        {
          cmd: "refresh rotation",
          title: "تجديد التوكن وتسجيل الخروج",
          desc: R`لما الـ access token يخلص، الواجهة بتنادي [[/auth/refresh]]، والـ cookie بتتبعت لوحدها. السيرفر بيلغي الـ refresh القديم ويطلّع واحد جديد، وده اسمه rotation.

ولو حد استخدم refresh ملغي، يبقى في احتمال كبير إنه اتسرق واتستخدم قبل كده. فالسيرفر بيلغي كل sessions المستخدم ده، وده اسمه reuse detection.`,
          example: R`router.post("/auth/refresh", async (req, res) => {
  const token = req.cookies.rt;
  const session = token && (await db.session.findUnique({ where: { tokenHash: sha256(token) }, include: { user: true } }));
  if (!session || session.expiresAt < new Date()) throw new AppError(401, "NO_SESSION", "سجّل دخول تاني");
  const { count } = await db.session.updateMany({ where: { id: session.id, revokedAt: null }, data: { revokedAt: new Date() } });
  if (count === 0) {
    await db.session.updateMany({ where: { userId: session.userId, revokedAt: null }, data: { revokedAt: new Date() } });
    throw new AppError(401, "TOKEN_REUSED", "سجّل دخول تاني");
  }
  return issueTokens(res, session.user);
});
router.post("/auth/logout", async (req, res) => {
  if (req.cookies.rt) await db.session.updateMany({ where: { tokenHash: sha256(req.cookies.rt) }, data: { revokedAt: new Date() } });
  res.clearCookie("rt", { path: "/auth" }).status(204).end();
});`,
          try: R`سجّل دخول، وانسخ قيمة الـ cookie [[rt]]. اعمل refresh من الواجهة مرة. بعدين ابعت الـ cookie القديمة بإيدك بـ curl ([[-b "rt=..."]]). المفروض ترجع TOKEN_REUSED، وكمان الـ session الجديدة تتلغي.`,
          flag: "script",
          deep: {
            why: "من غير rotation، الـ refresh token المسروق بيفضل شغال ٣٠ يوم، وصاحبه الحقيقي مش حاسس بحاجة. مع الـ rotation والـ reuse detection، أول ما الاتنين (المهاجم وصاحب الحساب) يستخدموا نفس التوكن، السيرفر بيكتشف ويقفل كل حاجة.",
            how: R`[[updateMany]] بشرط [[revokedAt: null]] هو قلب الموضوع. هو قراية وكتابة في خطوة واحدة ذرية. لو رجّع count بـ 1، يبقى احنا اللي لغينا التوكن ده دلوقتي، والاستخدام سليم. ولو رجّع 0، يبقى التوكن كان ملغي قبل كده، يعني حد استخدمه قبلنا.

[[issueTokens]] هي نفس الجزء الأخير من الـ login بعد ما اتنقل لدالة: session جديدة، و cookie جديدة، و access token جديد.

الـ logout مبيمسحش الـ session، بيعلّم عليها إنها ملغية. كده السجل بيفضل موجود، ولو التوكن ده رجع تاني هنعرف إنه reuse. وجدول sessions محتاج job ينضّف المنتهي من زمان.

و [[req.cookies]] محتاجة [[cookie-parser]] في Express.

فيه مشكلة حقيقية هنا: لو المستخدم فاتح تابين، والاتنين عملوا refresh في نفس اللحظة بنفس الـ cookie، التاني هيتعامل كأنه reuse، والمستخدم هيتطرد. الحلول: فترة سماح صغيرة (١٠ ثواني مثلًا) التوكن القديم يفضل مقبول فيها، أو إن الواجهة تنسّق بين التابات بـ [[navigator.locks]] عشان واحد بس يعمل refresh.`,
            when: "مع أي نظام refresh tokens. من غير rotation، التوكن الطويل بيبقى أضعف نقطة عندك.",
            mistakes: R`إنك تلغي الـ access token في الـ logout وتنسى الـ refresh، فيفضل شغال ٣٠ يوم. أو [[clearCookie]] من غير نفس الـ path اللي اتعملت بيه، فالمتصفح ميمسحهاش. أو إنك تتحقق بـ [[findUnique]] وبعدين [[update]] في خطوتين، فطلبين في نفس اللحظة الاتنين يعدّوا. أو reuse detection من غير فترة سماح، فالتابات تطرد بعض.`
          },
          lines: [
            "مسار التجديد. مفيش requireAuth هنا، لأن الـ access token أصلًا خلص.",
            "الـ refresh token من الـ cookie.",
            "دوّر على الـ session بالـ hash، وهات المستخدم معاها.",
            "مفيش session أو خلصت؟ يبقى لازم دخول من الأول.",
            "الغيها بشرط إنها مش ملغية. قراية وكتابة في خطوة واحدة.",
            "لو count بـ 0، يبقى التوكن كان ملغي، وحد استخدمه قبلنا...",
            "...فالغي كل sessions المستخدم ده على كل الأجهزة...",
            "...واطلب دخول من الأول.",
            "قفلة.",
            "اطلّع توكنات جديدة، بنفس كود الـ login.",
            "قفلة.",
            "الخروج.",
            "لو فيه cookie، علّم الـ session بتاعتها إنها ملغية.",
            "امسح الـ cookie بنفس الـ path بالظبط، ورد 204.",
            "قفلة."
          ],
          sol: R`أول refresh من الواجهة بيرجع 200 و cookie [[rt]] جديدة. لما تبعت القديمة بـ curl ترجع [[401]] و [[{"error":{"code":"TOKEN_REUSED","message":"سجّل دخول تاني"}}]]. ولو جربت بعدها الـ cookie الجديدة (اللي في المتصفح)، هترجع هي كمان [[TOKEN_REUSED]]، لأن الكود لغى كل sessions المستخدم ده. يعني المتصفح نفسه اتعمله logout، وده المقصود: لو الـ token القديم اتسرق، الاتنين يخرجوا والمستخدم الحقيقي يدخل تاني.

في جدول الـ sessions هتلاقي كل الصفوف بتاعة المستخدم فيها [[revokedAt]]. ولو بعت من غير cookie خالص، الرد [[401 NO_SESSION]]. و logout بيرجع [[204]] ومعاه [[Set-Cookie: rt=; Path=/auth; Expires=Thu, 01 Jan 1970]].

لو القديمة رجعت 200، يبقى انت مش بتلغي الـ session القديمة في الـ refresh. ولو الواجهة بتعمل ٣ refresh في نفس اللحظة وبتطلع TOKEN_REUSED لوحدها، دي مش مشكلة في السيرفر، دي الواجهة محتاجة الـ [[refreshing]] المشترك اللي في درس «apiFetch».`,
          solCode: R`OLD='rt=...'   # انسخها من DevTools قبل الـ refresh
curl -si -X POST -b "$OLD" localhost:4000/auth/refresh | head -1
# HTTP/1.1 401 Unauthorized  +  {"error":{"code":"TOKEN_REUSED",...}}

psql "$DATABASE_URL" -c 'SELECT id, "revokedAt" FROM "Session" ORDER BY "expiresAt" DESC LIMIT 5;'`
        },
        {
          cmd: "apiFetch",
          title: "الواجهة: التوكن فين، وإزاي يتجدد من غير ما المستخدم يحس",
          desc: R`في الواجهة، كل الطلبات بتعدّي على دالة واحدة. الدالة دي بتحط الـ access token في الـ header، ولو الرد رجع 401 بتعمل refresh مرة واحدة وتعيد الطلب. المستخدم مبيحسش بأي حاجة.

والـ access token متخزن في متغير في الذاكرة. لما الصفحة تعمل reload المتغير بيضيع، وأول طلب بعدها بيرجع 401، فالدالة بتعمل refresh من الـ cookie وتكمّل.`,
          example: R`let accessToken = null;
let refreshing = null;

export async function apiFetch(path, options = {}) {
  const send = () => fetch(API_URL + path, { ...options, credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers, ...(accessToken && { Authorization: $__btBearer $__{accessToken}$__bt }) } });
  let res = await send();
  if (res.status === 401 && !path.startsWith("/auth/")) {
    refreshing ??= fetch(API_URL + "/auth/refresh", { method: "POST", credentials: "include" })
      .then(async (r) => { accessToken = r.ok ? (await r.json()).data.accessToken : null; })
      .finally(() => { refreshing = null; });
    await refreshing;
    if (accessToken) res = await send();
  }
  return res;
}`,
          try: R`خلي عمر الـ access token في السيرفر 20 ثانية للتجربة. افتح صفحة بتعمل ٣ طلبات مع بعض واستنى 30 ثانية واعمل refresh للداتا. في Network لازم تلاقي طلب [[/auth/refresh]] واحد بس، مش ٣.`,
          flag: "script",
          deep: {
            why: "من غير دالة مركزية، كل component بيتعامل مع التوكن بطريقته، واللي ينسى منهم يطلّع للمستخدم «سجّل دخول تاني» في نص الشغل. ومن غير تنسيق، ٥ طلبات بيرجعوا 401 مع بعض فيعملوا ٥ refresh. ومع الـ rotation، الـ ٤ الزيادة هيتعاملوا كأنهم reuse، والمستخدم يتطرد.",
            how: R`[[refreshing]] هو السر. أول طلب يرجع 401 بيبدأ الـ refresh ويحفظ الـ promise. أي طلب تاني يرجع 401 في نفس الوقت بيلاقي الـ promise موجودة ([[??=]] مش هتعمل واحدة جديدة)، فبيستنى نفس الـ refresh. ولما يخلص، [[finally]] بترجّعه null.

[[credentials: "include"]] لازمة عشان المتصفح يبعت الـ cookie للـ API لو على origin مختلف. والـ API لازم يرد بـ CORS فيه origin محدد و [[credentials: true]]. مينفعش [[*]] مع cookies.

الطلبات اللي على [[/auth/]] مستثناة، عشان لو الـ login نفسه رجع 401 (باسورد غلط) ميعملش refresh.

ولو الـ refresh فشل، [[accessToken]] بيبقى null والدالة بترجّع الـ 401 الأصلي. ساعتها الواجهة (hook أو layout) بتوديه لصفحة الدخول. وبعد الـ login بتحتاج دالة صغيرة زي [[setAccessToken(t)]] تحط التوكن في المتغير.

في Next.js فيه طريق تاني: الـ server components بتقرا الـ cookie وتكلّم الـ API من السيرفر (BFF). ساعتها التوكن مبيوصلش للمتصفح أصلًا. التفاصيل في تاب «Next.js»، وجلب الداتا بـ TanStack Query في تاب «React».`,
            when: "في أي واجهة بتكلّم API بتوكنات. اكتبها مرة في [[lib/api.ts]]، وممنوع أي fetch مباشر للـ API في أي مكان تاني.",
            mistakes: "إنك تحفظ التوكن في localStorage عشان «ميضيعش مع الـ reload». الـ refresh cookie هي اللي بتحل المشكلة دي. أو refresh من غير تنسيق، فطلبات كتير تعمل refresh مع بعض. أو إعادة الطلب في loop لا نهائي لو الـ refresh رجع 401. أو تنسى credentials فالـ cookie متتبعتش، وتفضل تدوّر على المشكلة في السيرفر."
          },
          lines: [
            "الـ access token في الذاكرة بس، مش localStorage.",
            "الـ refresh اللي شغال دلوقتي، لو فيه.",
            "الدالة الوحيدة اللي الواجهة بتكلّم بيها الـ API.",
            "دالة بتبعت الطلب، ومعاه الـ cookies (credentials)...",
            "...وبتحط التوكن في Authorization لو موجود.",
            "ابعت الطلب.",
            "لو رجع 401، ومش طلب auth أصلًا...",
            "...ابدأ refresh، إلا لو فيه واحد شغال ([[??=]] بتسيب القديم)...",
            "...ولو نجح خد التوكن الجديد، ولو فشل خليه null...",
            "...ولما يخلص فضّي المكان للمرة الجاية.",
            "استنى الـ refresh، سواء انت اللي بدأته أو طلب تاني.",
            "لو فيه توكن جديد، ابعت الطلب الأصلي تاني.",
            "قفلة.",
            "رجّع الرد. لو لسه 401، الواجهة هتوديه صفحة الدخول.",
            "قفلة."
          ],
          sol: R`في Network بعد الـ 30 ثانية هتشوف الترتيب ده: ٣ طلبات راجعة 401، وبعدين طلب [[/auth/refresh]] واحد بـ 200، وبعدين نفس الـ ٣ طلبات تاني بـ 200. جربناها بـ access عمره ثانيتين و ٣ طلبات مع بعض، والطلبات اللي اتبعتت بالترتيب كانت: [[/me/data, /me/data, /admin/stats, /auth/refresh, /me/data, /me/data, /admin/stats]]. refresh واحد بس.

السر في [[refreshing ??=]]: أول طلب يلاقيه null فيبدأ الـ refresh ويحط الـ promise فيه، والاتنين التانيين يلاقوه موجود فيستنوا نفس الـ promise. لو شلت السطر ده وخليت كل واحد يعمل refresh لوحده، هتشوف ٣ refresh، وأول واحد بس ينجح، والاتنين التانيين يبعتوا الـ cookie القديمة فيرجعوا [[TOKEN_REUSED]] ويعملوا logout للمستخدم كله.

ولو طلب رجع 403 (مش مسموحله)، مفيش refresh ولا إعادة، والـ 403 بترجع زي ما هي. الـ refresh للـ 401 بس.`
        },
        {
          cmd: "password reset",
          title: "نسيت الباسورد: لينك بيشتغل مرة واحدة وبينتهي",
          desc: R`الطالب بيكتب إيميله، والسيرفر بيعمل token عشوائي، ويخزن الـ hash بتاعه بمدة ٣٠ دقيقة، ويبعت لينك فيه التوكن. والرد واحد دايمًا، سواء الإيميل موجود أو لأ.

ولما الطالب يفتح اللينك ويكتب باسورد جديد، السيرفر بيتأكد إن التوكن موجود ومستخدمش ولسه مخلصش. بعدين بيغيّر الباسورد، ويعلّم على التوكن إنه اتستخدم، ويلغي كل الـ sessions.`,
          example: R`router.post("/auth/forgot", forgotLimiter, async (req, res) => {
  const user = await db.user.findUnique({ where: { email: Forgot.parse(req.body).email } });
  if (user) {
    const token = crypto.randomBytes(32).toString("base64url");
    await db.passwordReset.create({ data: { userId: user.id, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 30 * 60e3) } });
    await emailQueue.add("reset", { to: user.email, link: $__bt$__{config.WEB_ORIGIN}/reset?token=$__{token}$__bt });
  }
  res.json({ data: { message: "لو الإيميل مسجّل، هيوصلك لينك خلال دقايق" } });
});
router.post("/auth/reset", async (req, res) => {
  const { token, password } = Reset.parse(req.body);
  const row = await db.passwordReset.findUnique({ where: { tokenHash: sha256(token) } });
  if (!row || row.usedAt || row.expiresAt < new Date()) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى، اطلب واحد جديد");
  await authService.resetPassword(row, password);
  res.status(204).end();
});`,
          try: R`اطلب لينك، واستخدمه مرة، وبعدين جرّب تستخدمه تاني. لازم يرجع BAD_TOKEN. وبعدين اطلب لينك لإيميل مش موجود، وقارن الرد بالأول: لازم يبقوا نفس الشكل بالظبط.`,
          flag: "script",
          deep: {
            why: "استعادة الباسورد باب خلفي للحساب. لو التوكن قابل للتخمين، أو شغال على طول، أو بيتخزن زي ما هو، فأي حد يوصل للقاعدة أو يخمّن يقدر ياخد أي حساب من غير ما يعرف الباسورد.",
            how: R`[[randomBytes(32)]] يعني ٢٥٦ bit عشوائية، وده مستحيل يتخمّن. والقاعدة بتخزن sha256 بتاعه بس، زي الـ refresh token، فلو القاعدة اتسربت اللينكات المفتوحة متتستخدمش. وهنا sha256 كفاية ومش محتاجين argon2، لأن التوكن عشوائي وطويل، مش باسورد ضعيف كتبه إنسان.

الرد الموحد بيمنع المهاجم يعرف الإيميلات المتسجّلة. وخلي بالك إن الوقت نفسه ممكن يفضح: لو الإيميل موجود السيرفر بيكتب في القاعدة ويبعت إيميل، فبياخد وقت أطول. عشان كده الإيميل بيروح queue، والفرق بيبقى صغير.

[[resetPassword]] بتعمل ٣ حاجات جوه transaction واحدة: الـ hash الجديد للمستخدم، و [[usedAt]] للتوكن بـ [[updateMany]] بشرط [[usedAt: null]] (ولو رجع count بـ 0 ترمي BAD_TOKEN، نفس فكرة الـ refresh)، و [[revokedAt]] لكل الـ sessions. لو حد كان داخل على الحساب بباسورد مسروق، بيطلع فورًا. وبعدها ابعت إيميل «الباسورد اتغير، لو مش انت كلّمنا».

التوكن في الـ URL ممكن يتسرب عن طريق الـ Referer، لو الصفحة بتحمّل سكربتات من برّه، أو في لوجات أدوات الـ analytics. فصفحة [[/reset]] تبقى نضيفة من أي سكربت خارجي، وحط عليها [[Referrer-Policy: no-referrer]].`,
            when: "في أي نظام فيه باسوردات. وبنفس الشكل تأكيد الإيميل وتغيير الإيميل: token مرة واحدة، ومتخزن hash، وليه مدة.",
            mistakes: R`إنك تخزن التوكن زي ما هو. أو تعمله من [[Math.random]] أو من الوقت. أو تسيبه شغال أيام. أو تسمح يتستخدم أكتر من مرة. أو ترد «الإيميل ده مش مسجّل». أو تنسى تلغي الـ sessions القديمة. وحاجة مهمة: لو مزوّد الإيميل مش متظبط، متخليش الكود «يطبع الإيميل في اللوج» كبديل في الإنتاج. في مشروع حقيقي كان ده الـ fallback، فلو المفتاح ناقص، لينكات الاستعادة وأكواد الـ OTP كانت هتتكتب في اللوجات.`
          },
          lines: [
            "طلب لينك الاستعادة، وعليه rate limit عشان محدش يغرق إيميل حد برسايل.",
            "دوّر بالإيميل بعد الـ validation. الـ schema بيحوّله small.",
            "لو موجود بس...",
            "...اعمل توكن عشوائي، ٣٢ بايت...",
            "...وخزّن الـ hash بتاعه بس، وعمره ٣٠ دقيقة...",
            "...وحط إيميل فيه اللينك في الـ queue، عشان الرد ميستناش مزوّد الإيميل.",
            "قفلة.",
            "نفس الرد في الحالتين، عشان محدش يعرف مين متسجّل.",
            "قفلة.",
            "تغيير الباسورد باللينك.",
            "التوكن والباسورد الجديد، بعد validation.",
            "دوّر على التوكن بالـ hash.",
            "مش موجود، أو اتستخدم، أو خلص؟ ارفض.",
            "في transaction: الباسورد الجديد، وعلّم التوكن إنه اتستخدم، والغي كل الـ sessions.",
            "رد 204. والواجهة توديه صفحة الدخول.",
            "قفلة."
          ],
          sol: R`أول استخدام للينك يرجّع [[204]]، والباسورد الجديد يشتغل في الـ login. التاني بنفس اللينك يرجّع [[400]] و [[{"error":{"code":"BAD_TOKEN","message":"اللينك انتهى، اطلب واحد جديد"}}]]، لأن [[usedAt]] اتملى.

الطلب لإيميل موجود ولإيميل مش موجود لازم يرجعوا نفس الـ status (200)، ونفس الجسم حرف بحرف، ونفس الـ Content-Length: [[{"data":{"message":"لو الإيميل مسجّل، هيوصلك لينك خلال دقايق"}}]]. قارنهم بـ [[curl -si]] مش بعينك. ولو الإيميل الموجود أبطأ بشكل واضح، يبقى انت بتبعت الإيميل جوه الـ request بدل الـ queue، والوقت نفسه بيكشف مين متسجل.

والصح إن [[resetPassword]] يعمل ٣ حاجات في transaction: يعلّم على كل لينكات المستخدم إنها اتستخدمت، ويحدّث الـ hash، ويلغي كل الـ sessions، عشان لو حد كان داخل بالباسورد القديم يخرج.`,
          solCode: R`const authService = {
  async resetPassword(row, password) {
    const passwordHash = await argon2.hash(password);
    await db.$transaction([
      db.passwordReset.updateMany({ where: { userId: row.userId, usedAt: null }, data: { usedAt: new Date() } }),
      db.user.update({ where: { id: row.userId }, data: { passwordHash } }),
      db.session.updateMany({ where: { userId: row.userId, revokedAt: null }, data: { revokedAt: new Date() } }),
    ]);
  },
};

// المقارنة
// curl -si -H "Content-Type: application/json" -d '{"email":"ali@example.com"}' localhost:4000/auth/forgot
// curl -si -H "Content-Type: application/json" -d '{"email":"nobody@example.com"}' localhost:4000/auth/forgot`
        },
        {
          cmd: "OAuth",
          title: "الدخول بجوجل: أول خطوة (التحويل لجوجل)",
          desc: R`OAuth بيخلي جوجل هي اللي تتأكد من الشخص، وترجّعلك بـ code تبدّله بمعلوماته. اسم الفلو Authorization Code مع PKCE، ومعاه OpenID Connect (OIDC) اللي بيضيف [[id_token]]: توكن موقّع من جوجل فيه مين الشخص وإيميله.

الفلو كله خطوتين. الأولى هنا: بتودي المستخدم لجوجل ومعاه ٣ قيم عشوائية ([[state]] و [[nonce]] و PKCE verifier) محفوظين عندك في cookie. والتانية في الدرس اللي بعده (OAuth callback): جوجل بترجّعه لك بـ code، والسيرفر يبدّله بـ tokens، ويتحقق من الـ id_token، ويدخّله.

في الإنتاج ممكن تستخدم مكتبة (Auth.js، أو Better Auth، أو Supabase Auth، أو Arctic). بس الدرسين دول بيوروك الفلو كامل بالكود، فتقدر تشحن «ادخل بجوجل» شغال، وتفهم إيه اللي بيحصل ورا أي مكتبة.`,
          example: R`router.get("/auth/google", (req, res) => {
  const state = crypto.randomBytes(16).toString("base64url");
  const nonce = crypto.randomBytes(16).toString("base64url");
  const verifier = crypto.randomBytes(32).toString("base64url");
  const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");
  res.cookie("oauth", JSON.stringify({ state, nonce, verifier }), { httpOnly: true, secure: true, sameSite: "lax", path: "/auth/google", maxAge: 600e3 });
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: config.GOOGLE_CLIENT_ID, redirect_uri: $__bt$__{config.API_ORIGIN}/auth/google/callback$__bt,
    response_type: "code", scope: "openid email profile", state, nonce,
    code_challenge: challenge, code_challenge_method: "S256",
  }).toString();
  res.redirect(url.toString());
});`,
          try: R`اعمل OAuth client في Google Cloud Console بنوع Web، وحط الـ redirect URI بتاع جهازك ([[http://localhost:4000/auth/google/callback]]). افتح [[/auth/google]] ووافق، وشوف الـ URL اللي رجعت عليه: هتلاقي فيه [[code]] و [[state]]. قارن الـ state باللي في الـ cookie [[oauth]] في DevTools. وبعدين افتح [[/auth/google]] مرتين في تابين، ووافق في التاب الأول بس: إيه اللي بيحصل للـ state؟`,
          flag: "script",
          deep: {
            why: "الدخول بجوجل بيشيل من المستخدم باسورد جديد، وبيشيل منك مسؤولية تخزينه. بس لو اتعمل غلط، أي حد يقدر يدخل على حساب حد تاني. ومعظم الثغرات بتبقى في الـ callback والربط بين الحسابات، مش في جوجل.",
            how: R`الـ [[state]] بيحمي من CSRF على الـ callback. من غيره، مهاجم يقدر يخلّيك تفتح callback بـ code بتاعه، فتلاقي نفسك داخل على حسابه، وأي حاجة تعملها (تحط كارت، ترفع ملف) تروح عنده. عشان كده بيتحط في cookie، ولما المستخدم يرجع لازم يبقى هو هو.

الـ [[nonce]] بيتحط جوه الـ id_token نفسه. جوجل بتاخده منك وترجّعه في الـ claims. في الـ callback بتقارنه باللي في الـ cookie، فلو حد حاول يعيد استخدام id_token قديم (replay) أو يحقن واحد من جلسة تانية، الـ nonce مش هيطابق.

الـ PKCE: السيرفر بيعمل [[verifier]] سري، ويبعت لجوجل الـ hash بتاعه بس (challenge). لما ييجي يبدّل الـ code بيبعت الـ verifier، وجوجل تتأكد إن الـ hash بتاعه هو هو. كده لو الـ code اتسرب في النص (لوج، أو extension، أو Referer)، ميتستخدمش من غير الـ verifier.

الـ cookie عليها [[path: "/auth/google"]] فمبتتبعتش غير للمسارين دول، وعمرها ١٠ دقايق بس. و [[sameSite: "lax"]] مهمة هنا: الرجوع من جوجل هو GET top-level navigation، و lax بتسمح للـ cookie تتبعت فيه. لو خليتها [[strict]] الـ cookie مش هتوصل للـ callback.

الـ [[scope]]: [[openid]] هو اللي بيخلي جوجل ترجّع id_token، و [[email profile]] بيضيفوا الإيميل والاسم والصورة. متطلبش صلاحيات زيادة (Drive، أو Calendar) غير لو الميزة محتاجاها فعلًا، لأن كل scope حساس بيحتاج مراجعة من جوجل وبيخوّف المستخدم في شاشة الموافقة.`,
            when: "لما يبقى الدخول السهل فارق في التسجيل. وغالبًا بيبقى Could في الـ MVP، مش Must. ولو بتضيفه، اضيف معاه الـ callback والربط كاملين من أول يوم.",
            mistakes: "إنك تتجاهل الـ state أو تقارنه بقيمة ثابتة. أو تحط الـ verifier في الـ URL بدل cookie. أو تنسى الـ nonce وتقبل أي id_token سليم التوقيع. أو تاخد الإيميل من الـ client وتصدّقه. أو تحط الـ client secret في تطبيق موبايل أو في الواجهة. أو redirect_uri مفتوح بياخد أي URL. وسؤال انترفيو مشهور: «state و nonce و PKCE كلهم عشوائي، ليه التلاتة؟» الإجابة: state ضد CSRF على الـ callback، و nonce بيربط الـ id_token بالجلسة دي، و PKCE بيحمي الـ code لو اتسرب."
          },
          lines: [
            "المسار اللي زرار «ادخل بجوجل» بيودّي عليه.",
            "state عشوائي ضد CSRF.",
            "nonce عشوائي، جوجل هترجّعه جوه الـ id_token.",
            "verifier سري، مبيروحش لجوجل غير وقت التبديل. ولحد وقتها بيستنى في cookie httpOnly، مش في الـ URL.",
            "الـ challenge هو sha256 للـ verifier. ده اللي بيروح لجوجل.",
            "خزّن التلاتة في cookie عمرها ١٠ دقايق، ومبتتبعتش غير لمسارات جوجل.",
            "عنوان صفحة الموافقة بتاعة جوجل.",
            "الـ parameters:",
            "رقم التطبيق عند جوجل، والمكان اللي هيرجع عليه (لازم يبقى متسجّل عندهم بالظبط).",
            "عايزين code، وصلاحيات الهوية والإيميل والاسم بس، والـ state والـ nonce.",
            "الـ challenge ونوعه.",
            "قفلة الـ parameters.",
            "ودّي المستخدم لجوجل.",
            "قفلة."
          ],
          sol: R`بعد الموافقة هترجع على [[/auth/google/callback?state=...&code=4/0A...&scope=email+profile+openid...]]. الـ [[state]] في الـ URL لازم يطابق حرف بحرف اللي جوه الـ cookie [[oauth]]. لو الـ callback لسه مش معمول هتشوف 404، وده طبيعي، المهم الـ URL.

لو فتحت [[/auth/google]] في تابين: التاب التاني بيكتب cookie جديدة فوق الأولى. فلو وافقت في التاب الأول، الـ state اللي راجع مش هيطابق الـ cookie، والـ callback الصح لازم يرفض (OAUTH_STATE). ده سلوك مقبول: المستخدم يضغط «ادخل بجوجل» تاني.

لو جوجل رجّعت [[redirect_uri_mismatch]] يبقى الـ URI في الكود مش مطابق حرف بحرف للي متسجل في الـ Console (http مقابل https، أو slash في الآخر، أو port مختلف).`
        },
        {
          cmd: "OAuth callback",
          title: "الدخول بجوجل: الـ callback والتحقق من الـ id_token",
          desc: R`الـ callback هو أهم جزء في «ادخل بجوجل». بيعمل ٥ حاجات بالترتيب: يقارن الـ state بالـ cookie، ويبدّل الـ code بـ tokens من [[https://oauth2.googleapis.com/token]]، ويتحقق من الـ [[id_token]] (توقيعه بمفاتيح جوجل العامة JWKS، و [[iss]] و [[aud]] و [[exp]])، ويقارن الـ [[nonce]]، ويتأكد إن [[email_verified]] بـ true. وبعدين بيدوّر على المستخدم أو يعمله، ويفتح session عادية زي الـ login.

التحقق بمكتبة [[jose]]: [[createRemoteJWKSet]] بتجيب مفاتيح جوجل وتكاشها، و [[jwtVerify]] بتتحقق من التوقيع والـ claims في سطر واحد.`,
          example: R`import { createRemoteJWKSet, jwtVerify } from "jose";

const GOOGLE_JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

router.get("/auth/google/callback", async (req, res) => {
  const saved = JSON.parse(req.cookies.oauth ?? "{}");
  res.clearCookie("oauth", { path: "/auth/google" });
  if (!req.query.code || !saved.state || req.query.state !== saved.state) throw new AppError(400, "OAUTH_STATE", "ابدأ الدخول بجوجل من الأول");
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams({
    grant_type: "authorization_code", code: String(req.query.code), code_verifier: saved.verifier,
    client_id: config.GOOGLE_CLIENT_ID, client_secret: config.GOOGLE_CLIENT_SECRET, redirect_uri: $__bt$__{config.API_ORIGIN}/auth/google/callback$__bt,
  }) });
  if (!r.ok) throw new AppError(401, "OAUTH_EXCHANGE", "جوجل رفضت الكود، جرّب تاني");
  const { id_token } = await r.json();
  const { payload } = await jwtVerify(id_token, GOOGLE_JWKS, { issuer: ["https://accounts.google.com", "accounts.google.com"], audience: config.GOOGLE_CLIENT_ID })
    .catch(() => { throw new AppError(401, "OAUTH_TOKEN", "مش قادرين نتأكد من جوجل"); });
  if (payload.nonce !== saved.nonce) throw new AppError(401, "OAUTH_NONCE", "ابدأ الدخول بجوجل من الأول");
  if (payload.email_verified !== true) throw new AppError(403, "EMAIL_NOT_VERIFIED", "أكّد إيميلك عند جوجل الأول");
  const user = await linkOrCreate("google", payload);
  await createSession(res, user);
  res.redirect($__bt$__{config.WEB_ORIGIN}/courses$__bt);
});`,
          try: R`كمّل الدرس اللي فات: ادخل بجوجل لحد ما توصل لـ [[/courses]] وتلاقي cookie [[rt]]. بعدين اختبر الرفض من غير جوجل: اعمل مفتاح RSA بـ [[generateKeyPair("RS256")]] من jose، وسيرفر صغير بيقدّم JWKS، ووقّع id_tokens بـ [[SignJWT]]: واحد aud بتاعه غلط، وواحد منتهي، وواحد متوقّع بمفتاح تاني، وواحد nonce بتاعه غلط، وواحد [[email_verified: false]]. لكل واحد اكتب الكود اللي المفروض يرجع.`,
          flag: "script",
          deep: {
            why: "الـ id_token هو الدليل الوحيد إن جوجل هي اللي قالت «ده فلان». لو قريته من غير ما تتحقق (jwt.decode)، أي حد يقدر يكتب JSON فيه إيميلك ويدخل على حسابك. ولو اتحققت من التوقيع بس من غير aud، أي id_token طالع لتطبيق تاني خالص (موقع مهاجم عامل «ادخل بجوجل») يدخل عندك.",
            how: R`[[createRemoteJWKSet]] بتعمل resolver: أول مرة بتجيب مفاتيح جوجل العامة من الـ URL، وبتكاشها (١٠ دقايق افتراضيًا). كل id_token فيه [[kid]] في الـ header بيقول اتوقّع بأنهي مفتاح. جوجل بتغيّر مفاتيحها كل فترة (key rotation)، فلو جه kid مش في الكاش، المكتبة بتجيب المفاتيح تاني لوحدها، مع cooldown ٣٠ ثانية عشان محدش يغرقك بطلبات. عشان كده الـ resolver بيتعمل مرة واحدة برّه الـ route، مش مع كل طلب.

[[jwtVerify]] بتعمل ٤ فحوصات: التوقيع (RS256) بالمفتاح الصح، و [[iss]] (جوجل بتستخدم الشكلين، بـ https ومن غيرها، فبنقبل الاتنين)، و [[aud]] لازم يبقى الـ client id بتاعك بالظبط، و [[exp]] مخلصش. أي فحص يفشل بيرمي error، واحنا بنحوّله 401 من غير ما نفضح السبب للمستخدم.

الـ nonce: قيمته في الـ id_token لازم تساوي اللي في الـ cookie. كده الـ id_token ده اتعمل للجلسة دي بالذات.

[[email_verified]]: جوجل بترجّعه true لحسابات Gmail، ولحسابات Workspace. بس لو حد عمل حساب جوجل بإيميل Yahoo مثلًا ومأكدوش، هيبقى false. لو قبلته، حد يقدر يعمل حساب جوجل بإيميلك انت ويدخل على حسابك عندك.

الـ [[sub]] هو رقم الشخص عند جوجل، وده اللي بتربط بيه، مش الإيميل. الإيميل ممكن يتغيّر، والـ sub ثابت للأبد.

[[createSession]] هي نفس جزء الـ session والـ cookie من الـ login، من غير الـ JSON. بعد الـ redirect، الواجهة بتعمل أول طلب، ترجع 401، و [[apiFetch]] بتعمل refresh من الـ cookie وتاخد access token. يعني مفيش أي توكن بيعدّي في الـ URL.

والـ refresh_token بتاع جوجل: مش محتاجه طالما انت بتستخدم جوجل للدخول بس. محتاجه لو هتكلّم Google APIs نيابة عن المستخدم، وساعتها بيتطلب بـ [[access_type=offline]] ويتخزن مشفّر.`,
            when: "مع أي «ادخل بـ ...» (جوجل، أو Apple، أو Microsoft، أو GitHub). الخطوات هي هي في كل مزوّد OIDC، اللي بيتغير الـ URLs والـ issuer. GitHub مش OIDC للدخول العادي، فمفيش id_token، وبتجيب الإيميل من [[/user/emails]] وتبص على [[verified]].",
            mistakes: R`[[jwt.decode]] بدل verify. أو verify من غير [[audience]]. أو تثق في [[email]] من غير [[email_verified]]. أو تربط بالإيميل بدل الـ sub. أو تعمل [[createRemoteJWKSet]] جوه الـ route فتجيب المفاتيح مع كل دخول. أو تحط الـ access token بتاعك في الـ redirect URL ([[/courses?token=...]])، فيتسجل في التاريخ واللوجات. أو تنسى [[clearCookie]] بنفس الـ path فالـ cookie القديمة تفضل. وفي الانترفيو: «إيه الفرق بين access_token و id_token بتوع جوجل؟» الـ id_token ليك انت (مين الشخص)، والـ access_token لـ Google APIs (يعمل إيه)، ومتستخدمش الـ access_token كإثبات هوية.`
          },
          lines: [
            "مكتبة jose للتحقق من الـ JWT.",
            "مفاتيح جوجل العامة. الـ resolver بيكاشها ويجيبها تاني لو جوجل غيّرتها.",
            "الـ callback اللي جوجل بترجّع عليه.",
            "اقرا الـ state والـ nonce والـ verifier من الـ cookie.",
            "امسحها على طول بنفس الـ path. هي تنفع مرة واحدة.",
            "مفيش code، أو الـ state مش هو؟ ارفض. ده الـ CSRF.",
            "بدّل الـ code بـ tokens من سيرفر لسيرفر:",
            "الـ code، والـ verifier بتاع PKCE...",
            "...والـ client secret (على السيرفر بس)، ونفس الـ redirect_uri بالظبط.",
            "قفلة الطلب.",
            "جوجل رفضت (الـ code مستخدم قبل كده أو خلص)؟ ارفض.",
            "خد الـ id_token من الرد.",
            "اتحقق من التوقيع والـ issuer والـ audience والانتهاء مرة واحدة...",
            "...وأي فشل يبقى 401 بكود ثابت.",
            "الـ nonce لازم يطابق اللي بعتناه.",
            "الإيميل لازم يكون متأكد عند جوجل.",
            "دوّر على المستخدم بالـ sub أو اعمله (الدرس الجاي).",
            "افتح session: refresh token في cookie، زي الـ login.",
            "رجّعه للواجهة. أول طلب هناك هيعمل refresh وياخد access token.",
            "قفلة."
          ],
          sol: R`النتايج المتوقعة لكل id_token مزيف: aud غلط، أو منتهي، أو متوقّع بمفتاح تاني، التلاتة بيرجعوا [[401 OAUTH_TOKEN]]. الـ nonce الغلط بيرجع [[401 OAUTH_NONCE]]. و [[email_verified: false]] بيرجع [[403 EMAIL_NOT_VERIFIED]]. والسليم بيرجع 302 على [[/courses]] ومعاه [[Set-Cookie: rt=...]].

عشان تختبر من غير جوجل، خلي عنوان الـ token والـ JWKS في config، وفي الاختبار شاورهم على سيرفر محلي. الـ solCode تحت هو السيرفر المزيف وتوقيع التوكن.

الغلطة الشائعة: تلاقي المزيف بمفتاح تاني بيعدّي. ده معناه إنك بتستخدم [[decodeJwt]] أو [[jwt.decode]] مش [[jwtVerify]]. ولو الـ aud الغلط عدّى، يبقى نسيت [[audience]] في الـ options.`,
          solCode: R`import http from "node:http";
import { generateKeyPair, exportJWK, SignJWT } from "jose";

const { publicKey, privateKey } = await generateKeyPair("RS256");
const jwk = { ...(await exportJWK(publicKey)), kid: "k1", alg: "RS256", use: "sig" };
let nextIdToken = "";
http.createServer((req, res) => {
  res.setHeader("content-type", "application/json");
  if (req.url === "/certs") return res.end(JSON.stringify({ keys: [jwk] }));
  if (req.url === "/token") return res.end(JSON.stringify({ id_token: nextIdToken }));
  res.statusCode = 404; res.end();
}).listen(9999);

export async function fakeIdToken(claims = {}, key = privateKey) {
  nextIdToken = await new SignJWT({ email: "mona@gmail.com", email_verified: true, nonce: claims.nonce, ...claims })
    .setProtectedHeader({ alg: "RS256", kid: "k1" })
    .setIssuer("https://accounts.google.com")
    .setAudience(claims.aud ?? config.GOOGLE_CLIENT_ID)
    .setSubject(claims.sub ?? "g-111")
    .setIssuedAt()
    .setExpirationTime(claims.exp ?? "1h")
    .sign(key);
}`
        },
        {
          cmd: "ربط الحسابات",
          title: "جدول accounts: نفس الشخص بباسورد وبجوجل",
          desc: R`المستخدم ممكن يدخل بأكتر من طريقة: باسورد، وجوجل، و Apple. عشان كده طرق الدخول بتتخزن في جدول [[accounts]] لوحده، مش في جدول users. كل صف فيه [[(provider, providerAccountId)]] و [[userId]]، والمفتاح الأساسي هو الاتنين الأولانيين مع بعض.

[[linkOrCreate]] بتدوّر بالـ [[sub]] الأول. لو لقته، يبقى نفس المستخدم. لو ملقتهوش، بتدوّر بالإيميل: لو فيه مستخدم بالإيميل ده وإيميله متأكد، بتربط جوجل بيه. ولو مش متأكد، بترفض وتطلب منه يدخل بالباسورد ويربط من الإعدادات. ولو مفيش، بتعمل مستخدم جديد إيميله متأكد، ومن غير باسورد.`,
          example: R`model Account {
  provider          String
  providerAccountId String
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt         DateTime @default(now())
  @@id([provider, providerAccountId])
  @@index([userId])
}

export async function linkOrCreate(provider, p) {
  return db.$transaction(async (t) => {
    const acc = await t.account.findUnique({ where: { provider_providerAccountId: { provider, providerAccountId: p.sub } }, include: { user: true } });
    if (acc) return acc.user;
    const email = p.email.toLowerCase();
    const existing = await t.user.findUnique({ where: { email } });
    if (existing && !existing.emailVerifiedAt) throw new AppError(409, "LINK_NEEDS_LOGIN", "فيه حساب بالإيميل ده. ادخل بالباسورد واربط جوجل من الإعدادات");
    const user = existing ?? (await t.user.create({ data: { email, name: p.name ?? email, emailVerifiedAt: new Date() } }));
    await t.account.create({ data: { provider, providerAccountId: p.sub, userId: user.id } });
    return user;
  });
}`,
          try: R`جرّب ٤ سيناريوهات: (١) أول دخول بجوجل بإيميل جديد، (٢) نفس الشخص تاني، (٣) مستخدم عمل حساب بباسورد بنفس إيميل جوجل ومأكدش إيميله، (٤) نفس الحالة بعد ما أكّد. بعد كل واحد عد الصفوف في users و accounts. وبعدين اكتب endpoint [[POST /me/accounts/google]] للربط من الإعدادات: المستخدم داخل بالفعل، ويعدّي على نفس فلو جوجل.`,
          flag: "script",
          deep: {
            why: "من غير جدول accounts، الناس بتعمل حسابين لنفس الشخص (واحد بالباسورد وواحد بجوجل)، وكورساته تتقسم بينهم. ومن غير قواعد ربط صح، الربط نفسه بيبقى ثغرة استيلاء على حسابات (account takeover).",
            how: R`الفخ اللي الكود ده بيقفله اسمه pre-account takeover. مهاجم بيعمل حساب بباسورد بإيميلك قبل ما انت تسجّل، ومبيأكدوش (معندوش إيميلك). بعدين انت بتيجي تدخل بجوجل بنفس الإيميل. لو السيستم ربط جوجل بالحساب الموجود أوتوماتيك، انت بقيت بتستخدم حساب المهاجم عارف الباسورد بتاعه، وكل حاجة تشتريها أو ترفعها هو شايفها. عشان كده الربط بالإيميل بيحصل بس لو الحساب الموجود إيميله متأكد، وإلا الرد 409 ويدخل بالباسورد الأول.

والعكس: مستخدم دخل بجوجل ومعندوش باسورد ([[passwordHash]] بـ null)، وبعدين عايز يدخل بالإيميل والباسورد. هنا «نسيت الباسورد» هي اللي بتعمله باسورد، لأنها بتثبت إنه صاحب الإيميل. والـ login لازم يتعامل مع [[passwordHash]] بـ null (الـ DUMMY_HASH بيغطيها).

الـ transaction بتمنع سباق: لو طلبين callback لنفس الشخص وصلوا مع بعض، التاني هيخبط في الـ primary key ([[P2002]]) بدل ما يعمل مستخدمين. وال error handler بيحوّلها 409، والمستخدم يعيد.

فك الربط ([[DELETE /me/accounts/google]]): ممنوع لو دي آخر طريقة دخول عنده (مفيش باسورد ولا provider تاني)، وإلا الحساب يتقفل عليه. واعمله بـ step-up auth، واتبعت إيميل.

الإيميل في users هو إيميل التواصل، والـ sub في accounts هو الهوية. لو المستخدم غيّر إيميله عند جوجل، الدخول لسه شغال بالـ sub، ومش لازم تغيّر إيميله عندك.`,
            when: "أول ما يبقى عندك أكتر من طريقة دخول. حتى لو جوجل بس دلوقتي، اعمل الجدول من الأول، عشان Apple مطلوبة في iOS لو فيه دخول بطرف تالت.",
            mistakes: R`عمود [[googleId]] في جدول users، وبعدين [[appleId]] و [[githubId]]. أو ربط أوتوماتيك بالإيميل من غير ما تتأكد إنه متأكد في الناحيتين. أو [[provider]] بحروف مختلفة ([[Google]] و [[google]]) فيتعمل حسابين. أو تسمح بفك آخر طريقة دخول. وفي الانترفيو: «إيه هو pre-account takeover وإزاي تمنعه؟» بالظبط الحالة اللي فوق.`
          },
          lines: [
            "جدول طرق الدخول.",
            "اسم المزوّد: google أو apple...",
            "رقم الشخص عند المزوّد (الـ sub). ثابت حتى لو إيميله اتغيّر.",
            "صاحب الحساب عندنا.",
            "العلاقة، ولو المستخدم اتمسح طرق دخوله تتمسح.",
            "إمتى اتربط.",
            "المفتاح الأساسي: نفس الـ sub عند نفس المزوّد مرة واحدة بس.",
            "index عشان تجيب طرق دخول مستخدم بسرعة.",
            "قفلة.",
            "الدالة اللي الـ callback بيناديها بعد التحقق.",
            "كله في transaction واحدة.",
            "دوّر بالـ sub الأول.",
            "لقيته؟ ده هو.",
            "مفيش؟ خد الإيميل small.",
            "فيه حساب بالإيميل ده؟",
            "لو إيميله مش متأكد، متربطش. ده بيمنع الاستيلاء على الحساب.",
            "استخدم الموجود (متأكد)، أو اعمل جديد إيميله متأكد (جوجل أكدته) ومن غير باسورد.",
            "سجّل طريقة الدخول دي.",
            "رجّع المستخدم.",
            "قفلة الـ transaction.",
            "قفلة."
          ],
          sol: R`العدد المتوقع بعد كل سيناريو: (١) user واحد جديد و account واحد، و [[emailVerifiedAt]] متعبي و [[passwordHash]] بـ null. (٢) مفيش أي صف جديد، ونفس الـ user. (٣) الرد [[409 LINK_NEEDS_LOGIN]] ومفيش account جديد. (٤) account جديد مربوط بالـ user القديم، ومفيش user جديد.

endpoint الربط من الإعدادات: بيحط [[linkUserId]] في الـ cookie بتاعة OAuth مع الـ state، والـ callback لو لقى [[linkUserId]] بيعمل [[account.create]] للمستخدم ده مباشرة بدل [[linkOrCreate]]. ولو الـ sub مربوط بمستخدم تاني، يرجع 409 ومينقلوش. وده لازم يعدّي على step-up auth.

الغلطة الشائعة في (٣): الكود يربط ويكمّل، فالمهاجم اللي عمل الحساب الأول يفضل عارف الباسورد.`
        }
      ]
    },
    {
      t: "أمان الحساب",
      l: 2,
      n: "تأكيد الإيميل، و 2FA بـ TOTP و recovery codes، و step-up auth، وتغيير الإيميل والباسورد، و CAPTCHA و lockout، و passkeys",
      items: [
        {
          cmd: "تأكيد الإيميل",
          title: "لينك تأكيد الإيميل: بينتهي، ويتبعت تاني بحد",
          desc: R`تأكيد الإيميل نفس فكرة «نسيت الباسورد»: token عشوائي، ومتخزن الـ hash بتاعه بس، وليه مدة (٢٤ ساعة هنا). الفرق في ٣ حاجات: الصف بيحفظ الإيميل اللي اتبعت له اللينك، وإعادة الإرسال ليها حد (٣ في الساعة)، والتأكيد بيحصل بـ POST مش بمجرد فتح اللينك.

جدول واحد [[EmailToken]] بعمود [[purpose]] بيخدم التأكيد وتغيير الإيميل. والمستخدم يقدر يدخل قبل ما يأكد، بس الحاجات المهمة (الشراء، أو دعوة ناس، أو ربط حساب) بتستنى [[emailVerifiedAt]].`,
          example: R`router.post("/auth/verify-email/send", requireAuth, async (req, res) => {
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (user.emailVerifiedAt) return res.status(204).end();
  const recent = await db.emailToken.count({ where: { userId: user.id, purpose: "VERIFY", createdAt: { gt: new Date(Date.now() - 3600e3) } } });
  if (recent >= 3) throw new AppError(429, "TOO_MANY_EMAILS", "بعتنالك كذا إيميل. استنى ساعة وجرّب تاني");
  const token = crypto.randomBytes(32).toString("base64url");
  await db.emailToken.create({ data: { userId: user.id, purpose: "VERIFY", email: user.email, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 24 * 3600e3) } });
  await emailQueue.add("verify-email", { to: user.email, link: $__bt$__{config.WEB_ORIGIN}/verify-email?token=$__{token}$__bt });
  res.status(202).end();
});
router.post("/auth/verify-email", async (req, res) => {
  const row = await db.emailToken.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } });
  if (!row || row.purpose !== "VERIFY" || row.usedAt || row.expiresAt < new Date()) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى، اطلب واحد جديد");
  const [, { count }] = await db.$transaction([
    db.emailToken.updateMany({ where: { userId: row.userId, purpose: "VERIFY", usedAt: null }, data: { usedAt: new Date() } }),
    db.user.updateMany({ where: { id: row.userId, email: row.email }, data: { emailVerifiedAt: new Date() } }),
  ]);
  if (count === 0) throw new AppError(400, "EMAIL_CHANGED", "الإيميل اتغير بعد اللينك ده");
  res.status(204).end();
});`,
          try: R`اطلب لينك التأكيد ٤ مرات ورا بعض: الرابع لازم يرجع 429. بعدين أكّد بأول لينك، وجرّب تاني لينك بعده. وآخر تجربة: اطلب لينك، وغيّر إيميل المستخدم في القاعدة بإيدك، وافتح اللينك القديم.`,
          flag: "script",
          deep: {
            why: "من غير تأكيد، أي حد يسجّل بإيميل مش بتاعه: يبعت منه دعوات، أو يربطه بحساب جوجل (الدرس «ربط الحسابات»)، أو إيميلاتك تروح لحد تاني وتبوظ سمعة الدومين عند مزوّد الإيميل. ومن غير حد لإعادة الإرسال، زرار «ابعت تاني» بيبقى أداة spam مجانية بإسمك.",
            how: R`عمود [[email]] في صف التوكن هو أهم تفصيلة. تخيل: المستخدم سجّل بإيميل غلط، وطلب لينك، وبعدين غيّر إيميله. لو اللينك القديم اتفتح، مش المفروض يأكد الإيميل الجديد. عشان كده التأكيد بيحصل بـ [[updateMany]] بشرط [[email: row.email]]، ولو count بـ 0 يبقى الإيميل اتغيّر.

الـ [[updateMany]] على كل توكنات VERIFY المفتوحة بيقفل كل اللينكات القديمة مرة واحدة، فمفيش لينك تاني يشتغل بعد التأكيد.

ليه POST مش GET؟ برامج فحص الإيميل في الشركات (Outlook Safe Links مثلًا) بتفتح كل لينك في الرسالة أوتوماتيك. لو الـ GET بيأكد، الإيميل بيتأكد من غير ما البني آدم يشوفه، وأسوأ من كده في لينكات الدخول: التوكن بيتحرق قبل ما المستخدم يضغط. فاللينك بيفتح صفحة في الواجهة، والصفحة بتبعت التوكن بـ POST (أوتوماتيك أو بزرار «أكّد»).

الحد: ٣ في الساعة لكل مستخدم، محسوبين من الجدول نفسه، من غير Redis. وفوقه rate limit بالـ IP على المسار. والـ 202 معناها «استلمنا وهيتبعت»، لأن الإيميل بيروح queue.

المدة: ٢٤ ساعة معقولة للتأكيد، لأن الناس بتسجّل وتفتح الإيميل بعدين. أما لينكات الدخول أو الاستعادة فأقصر بكتير.`,
            when: "في أي منتج فيه تسجيل بإيميل. وفي الـ MVP ممكن تسيبه يدخل ويتفرج، وتقفل الشراء والدعوات لحد ما يأكد.",
            mistakes: R`التأكيد بـ GET. أو لينك من غير انتهاء. أو التوكن متخزن زي ما هو. أو «ابعت تاني» من غير حد. أو تأكيد الإيميل الجديد بلينك اتبعت للقديم. أو إنك تمنع الدخول خالص قبل التأكيد، والإيميل واقع في spam، فالمستخدم مش قادر يعمل حاجة ولا يغيّر إيميله الغلط.`
          },
          lines: [
            "ابعت لينك تأكيد. لازم يكون داخل.",
            "هات المستخدم.",
            "متأكد بالفعل؟ مفيش حاجة تتعمل.",
            "عد الإيميلات اللي اتبعتت له في آخر ساعة، من نفس الجدول.",
            "٣ أو أكتر؟ ارفض بـ 429.",
            "توكن عشوائي ٣٢ بايت.",
            "خزّن الـ hash، والإيميل اللي بنأكده، ومدة ٢٤ ساعة.",
            "حط الإيميل في الـ queue. اللينك بيفتح صفحة في الواجهة، مش الـ API.",
            "202: اتقبل وهيتبعت.",
            "قفلة.",
            "التأكيد نفسه، بـ POST من صفحة الواجهة.",
            "دوّر على التوكن بالـ hash.",
            "مش موجود، أو نوعه غلط، أو اتستخدم، أو خلص؟ ارفض.",
            "في transaction واحدة:",
            "اقفل كل لينكات التأكيد المفتوحة للمستخدم ده...",
            "...وأكّد، بشرط إن الإيميل لسه هو نفس اللي في اللينك.",
            "قفلة الـ transaction.",
            "لو محدش اتأكد، يبقى الإيميل اتغيّر.",
            "تمام.",
            "قفلة."
          ],
          sol: R`الطلبات الـ ٣ الأولى ترجع 202، والرابع يرجع [[429 TOO_MANY_EMAILS]]. أول لينك يرجع 204، و [[emailVerifiedAt]] يتملى. أي لينك تاني بعده يرجع [[400 BAD_TOKEN]]، لأن [[updateMany]] علّمت عليهم كلهم [[usedAt]].

لو غيّرت الإيميل في القاعدة وفتحت لينك قديم: الرد [[400 EMAIL_CHANGED]]، وفي نفس الوقت التوكن اتعلّم إنه مستخدم (لأن الـ transaction خلصت). ده مقبول: المستخدم يطلب لينك للإيميل الجديد.

لو التأكيد عدّى في الحالة دي، يبقى بتحدّث بـ [[update({ where: { id } })]] من غير شرط الإيميل.`
        },
        {
          cmd: "2FA: التفعيل",
          title: "2FA بـ TOTP: السر والـ QR والتفعيل",
          desc: R`الـ TOTP هو الأرقام الـ ٦ اللي بتتغيّر كل ٣٠ ثانية في Google Authenticator أو 1Password أو Authy. السيرفر والموبايل عندهم نفس السر، وكل واحد بيحسب الكود من السر والوقت الحالي، فمش محتاجين يكلموا بعض.

التفعيل خطوتين. الأولى: السيرفر بيعمل سر عشوائي، ويخزنه مشفّر، ويرجّع QR فيه [[otpauth://]] URI. والتانية: المستخدم بيمسح الـ QR ويكتب الكود، والسيرفر بيتأكد إنه صح قبل ما يشغّل الـ 2FA، ويرجّع recovery codes مرة واحدة. المكتبة [[otplib]] (نسخة 13 وما بعدها، الـ API فيها functions و async).`,
          example: R`import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";

router.post("/me/2fa/setup", requireAuth, requireRecentAuth(), async (req, res) => {
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (user.totpEnabledAt) throw new AppError(409, "MFA_ALREADY_ON", "الـ 2FA شغالة بالفعل");
  const secret = generateSecret();
  await db.user.update({ where: { id: user.id }, data: { totpSecretEnc: encrypt(secret) } });
  const uri = generateURI({ issuer: "myapp", label: user.email, secret });
  res.json({ data: { qr: await QRCode.toDataURL(uri), secret } });
});
router.post("/me/2fa/enable", requireAuth, async (req, res) => {
  const { code } = z.object({ code: z.string().regex(/^\d{6}$/) }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (!user.totpSecretEnc || user.totpEnabledAt) throw new AppError(409, "NO_PENDING_SETUP", "ابدأ التفعيل من الأول");
  const r = await verify({ secret: decrypt(user.totpSecretEnc), token: code, epochTolerance: 30 });
  if (!r.valid) throw new AppError(400, "BAD_CODE", "الكود غلط. اتأكد إن ساعة الموبايل مظبوطة");
  const codes = Array.from({ length: 10 }, () => crypto.randomBytes(5).toString("hex"));
  await db.$transaction([
    db.user.update({ where: { id: user.id }, data: { totpEnabledAt: new Date(), totpLastStep: r.timeStep } }),
    db.recoveryCode.deleteMany({ where: { userId: user.id } }),
    db.recoveryCode.createMany({ data: codes.map((c) => ({ userId: user.id, codeHash: sha256(c) })) }),
  ]);
  res.json({ data: { recoveryCodes: codes } });
});`,
          try: R`اكتب [[lib/crypto.js]] فيه [[encrypt(text)]] و [[decrypt(box)]] بـ AES-256-GCM ومفتاح ٣٢ بايت من [[config.TOTP_ENC_KEY]] (base64). اتأكد إن نفس النص بيتشفّر لنتيجتين مختلفتين، وإن تغيير حرف واحد في الناتج بيخلي decrypt ترمي error. بعدين فعّل الـ 2FA لحسابك وامسح الـ QR بتطبيق حقيقي.`,
          flag: "script",
          deep: {
            why: "الباسوردات بتتسرق كل يوم: تسريبات مواقع تانية، و phishing، وناس بتكرر نفس الباسورد. الـ 2FA بيخلي الباسورد لوحده مش كفاية. ولوحة الأدمن بالذات لازم يبقى عليها 2FA إجباري، لأن حساب أدمن واحد مسروق يكشف كل حاجة.",
            how: R`الـ TOTP (RFC 6238): الكود = HMAC للسر مع رقم الفترة الحالية ([[floor(unixTime / 30)]])، ومنه ٦ أرقام. عشان كده ساعة الموبايل لازم تبقى مظبوطة.

الـ [[epochTolerance: 30]] هي الـ drift window: بتقبل كود الفترة اللي فاتت واللي جاية (٣٠ ثانية في كل ناحية). ليه؟ المستخدم كتب الكود في آخر ثانية وقبل ما يوصل خلص، أو ساعة الموبايل متأخرة شوية. أكبر من كده بيوسّع فرصة التخمين من غير فايدة كبيرة.

[[verify]] في otplib 13 بترجّع object مش boolean: [[valid]]، و [[delta]] (بعيد كام فترة)، و [[timeStep]] (رقم الفترة اللي الكود طابقها). الـ timeStep بنخزنه في [[totpLastStep]] عشان الدرس الجاي يمنع إعادة استخدام نفس الكود.

السر متخزن مشفّر (encryption at rest)، مش hash، لأن السيرفر محتاج السر نفسه عشان يحسب الكود. لو القاعدة اتسربت والسر نص عادي، المهاجم يقدر يطلّع أكواد لكل الحسابات. AES-256-GCM بيشفّر وبيضيف tag بيكشف أي تعديل. والمفتاح في متغير بيئة أو secret manager، مش في القاعدة. وكده تسريب القاعدة لوحدها مش كفاية.

الـ QR: [[generateURI]] بتطلّع [[otpauth://totp/myapp:ali%40x.com?secret=...&issuer=myapp]]. و [[QRCode.toDataURL]] بتحوّله صورة base64 الواجهة تعرضها في [[<img>]]. وبنرجّع السر كنص كمان للي مش قادر يمسح (بيكتبه بإيده).

التفعيل مش بيحصل غير بعد كود صح. لو شغّلته بعد الـ setup على طول والمستخدم ممسحش الـ QR صح، الحساب يتقفل عليه.

الـ recovery codes: ١٠ أكواد عشوائية، بتتعرض مرة واحدة بس ([[5 bytes hex]] يعني ١٠ حروف)، ومتخزنين sha256. كفاية لأنهم عشوائيين وطوال، زي توكنات الاستعادة. والتفعيل بيعدّي على [[requireRecentAuth]] (درس step-up auth)، عشان حد لقى لابتوبك مفتوح ميقدرش يشغّل 2FA بموبايله ويقفل عليك.`,
            when: "للأدمن والمدرّبين إجباري. وللطلاب اختياري في الإعدادات. ولو المنتج فيه فلوس (رصيد، أو محفظة، أو payouts للمدرّبين)، اطلبه قبل أي سحب.",
            mistakes: R`السر نص عادي في القاعدة. أو تفعيل من غير كود تأكيد. أو [[epochTolerance]] كبيرة جدًا (دقايق). أو تنسى إن [[verify]] بترجّع object فتكتب [[if (await verify(...))]]، وده دايمًا true لأن الـ object مش falsy. أو تعرض الـ recovery codes تاني من الإعدادات، يعني متخزنين بشكل يترجع. أو تبعت الأكواد بـ SMS كبديل وحيد، والـ SIM swap بيسرقها.`
          },
          lines: [
            "otplib للـ TOTP: سر، و URI للـ QR، وتحقق.",
            "مكتبة بتحوّل الـ URI لصورة QR.",
            "الخطوة الأولى. لازم يكون داخل، ومن قريب.",
            "هات المستخدم.",
            "شغالة بالفعل؟ ارفض.",
            "سر عشوائي بصيغة base32 اللي التطبيقات بتفهمها.",
            "خزّنه مشفّر، ولسه الـ 2FA مش شغالة.",
            "الـ otpauth URI: اسم التطبيق والإيميل والسر.",
            "رجّع صورة QR، والسر كنص للي هيكتبه بإيده.",
            "قفلة.",
            "الخطوة التانية: التأكيد بكود.",
            "٦ أرقام بالظبط.",
            "هات المستخدم.",
            "مفيش setup أو شغالة بالفعل؟ ارفض.",
            "فك تشفير السر، واتحقق من الكود، مع سماحية فترة قبل وبعد.",
            "غلط؟ غالبًا ساعة الموبايل أو QR اتمسح غلط.",
            "١٠ recovery codes عشوائية.",
            "في transaction واحدة:",
            "شغّل الـ 2FA، وخزّن الفترة اللي اتستخدمت عشان متتعادش.",
            "امسح أي recovery codes قديمة...",
            "...وخزّن الجديدة hash بس.",
            "قفلة الـ transaction.",
            "رجّع الأكواد مرة واحدة. الواجهة تقوله يحفظهم.",
            "قفلة."
          ],
          sol: R`[[encrypt("JBSWY3DP")]] مرتين لازم يطلّع نصين مختلفين، لأن الـ IV عشوائي كل مرة. والشكل [[iv.tag.data]] بـ base64url. و [[decrypt]] بترجّع النص الأصلي. ولو غيّرت أي حرف في أي جزء، [[decipher.final()]] بترمي [[Unsupported state or unable to authenticate data]]، وده الـ tag بيكشف التعديل.

بعد مسح الـ QR، التطبيق هيعرض [[myapp (ali@x.com)]]، والكود اللي فيه لازم يعدّي في [[/me/2fa/enable]] ويرجّع ١٠ أكواد. لو رجع BAD_CODE، اتأكد من ساعة الموبايل (خليها أوتوماتيك).

الغلطة الشائعة: IV ثابت أو مشتق من السر. مع GCM ده كارثي، لأن تكرار الـ IV بنفس المفتاح بيكشف الداتا.`,
          solCode: R`import crypto from "node:crypto";

const KEY = Buffer.from(config.TOTP_ENC_KEY, "base64");

export function encrypt(plain) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString("base64url")).join(".");
}

export function decrypt(box) {
  const [iv, tag, data] = box.split(".").map((s) => Buffer.from(s, "base64url"));
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}`
        },
        {
          cmd: "2FA: الدخول",
          title: "الدخول بـ 2FA: خطوة تانية بعد الباسورد، و recovery codes",
          desc: R`لما الـ 2FA شغالة، الـ login مبيطلّعش توكنات بعد الباسورد. بيطلّع [[mfaToken]] قصير (٥ دقايق) موقّع بسر مختلف، معناه «الباسورد صح، ناقص الكود». والواجهة بتعرض خانة الكود وتبعته مع الـ mfaToken على [[/auth/2fa]].

الكود ممكن يكون TOTP (٦ أرقام) أو recovery code. الـ TOTP بيتقبل مرة واحدة بس في نفس الفترة (replay protection بـ [[afterTimeStep]])، والـ recovery code بيتحرق بعد استخدامه ويتبعت إيميل.`,
          example: R`// في آخر /auth/login، بعد ما الباسورد يطلع صح:
if (user.totpEnabledAt) {
  const mfaToken = jwt.sign({ sub: user.id }, config.MFA_JWT_SECRET, { expiresIn: "5m" });
  return res.json({ data: { mfaRequired: true, mfaToken } });
}

async function checkTotp(user, code) {
  const r = await verify({ secret: decrypt(user.totpSecretEnc), token: code, epochTolerance: 30, afterTimeStep: user.totpLastStep ?? undefined });
  if (!r.valid) return false;
  const { count } = await db.user.updateMany({ where: { id: user.id, OR: [{ totpLastStep: null }, { totpLastStep: { lt: r.timeStep } }] }, data: { totpLastStep: r.timeStep } });
  return count === 1;
}
router.post("/auth/2fa", mfaLimiter, async (req, res) => {
  const { mfaToken, code } = z.object({ mfaToken: z.string(), code: z.string().trim().max(20) }).parse(req.body);
  let sub;
  try { sub = jwt.verify(mfaToken, config.MFA_JWT_SECRET).sub; } catch { throw new AppError(401, "MFA_EXPIRED", "ابدأ الدخول من الأول"); }
  const user = await db.user.findUniqueOrThrow({ where: { id: sub } });
  let ok;
  if (/^\d{6}$/.test(code)) ok = await checkTotp(user, code);
  else {
    const { count } = await db.recoveryCode.updateMany({ where: { userId: user.id, codeHash: sha256(code.toLowerCase().replace(/[^0-9a-f]/g, "")), usedAt: null }, data: { usedAt: new Date() } });
    ok = count === 1;
    if (ok) await emailQueue.add("recovery-code-used", { to: user.email });
  }
  if (!ok) throw new AppError(401, "BAD_CODE", "الكود غلط");
  return issueTokens(res, user);
});`,
          try: R`ادخل بحساب عليه 2FA، وابعت نفس الكود الصح مرتين ورا بعض في نفس الـ ٣٠ ثانية. بعدين جرّب recovery code بحروف كبيرة وبشَرطة في النص ([[ABCDE-12345]])، وبعدين نفس الكود تاني. وآخر حاجة: خد الـ mfaToken وابعته كـ [[Authorization: Bearer]] لأي endpoint عليه requireAuth.`,
          flag: "script",
          deep: {
            why: "الخطوة التانية لو اتعملت غلط بتلغي فايدة الـ 2FA كلها. لو الـ mfaToken ينفع كـ access token، الباسورد لوحده بقى كفاية. ولو الكود ينفع أكتر من مرة، اللي شاف شاشتك أو عمل phishing proxy يستخدمه بعدك. ولو مفيش recovery، أول موبايل يضيع يبقى تذكرة دعم ومستخدم زعلان.",
            how: R`السر المختلف ([[MFA_JWT_SECRET]]) هو اللي بيفصل النوعين. [[requireAuth]] بيتحقق بـ [[JWT_SECRET]]، فالـ mfaToken مش هيعدّي عليه أبدًا، والعكس. ممكن بدل كده [[audience]] مختلف، بس ساعتها لازم requireAuth يتحقق من الـ audience بتاعه هو كمان، وده بيتنسي.

الـ replay protection: كل كود صح ليه [[timeStep]]. بنخزن آخر واحد اتقبل في [[totpLastStep]]، و [[afterTimeStep]] بيرفض أي كود فترته أقدم أو زي آخر واحد. والـ [[updateMany]] المشروط بيقفل السباق: لو طلبين بنفس الكود وصلوا مع بعض، واحد بس ياخد count بـ 1. نفس فكرة الـ refresh rotation.

الـ recovery code: بنطبّعه الأول (small، ومن غير شَرط ولا مسافات)، لأن الناس بتكتبه بأي شكل. و [[updateMany]] بشرط [[usedAt: null]] بيحرقه في خطوة واحدة. وإيميل «استخدمت recovery code» بينبّه صاحب الحساب لو مش هو. ولما يفضل له ٢ أو أقل، الواجهة تقوله يولّد جداد.

[[mfaLimiter]]: الكود ٦ أرقام يعني مليون احتمال، ومع سماحية ٣ فترات تبقى ٣ في المليون لكل محاولة. من غير حد، سكربت يخمّن في ساعات. حد زي ٥ محاولات لكل mfaToken و ٢٠ في الساعة للحساب كفاية.

«افتكر الجهاز ده ٣٠ يوم»: cookie موقّعة فيها userId وتاريخ، ولو موجودة وسليمة الـ login يعدّي الخطوة التانية. وأي تغيير باسورد يلغيها.`,
            when: "مع أي 2FA. والـ recovery codes جزء من الـ 2FA نفسه، مش ميزة إضافية.",
            mistakes: R`نفس السر للـ mfaToken والـ access token. أو مفيش rate limit على الكود. أو الكود يتقبل أكتر من مرة. أو recovery codes متخزنة نص، أو بتتقارن بـ [[findFirst]] وبعدين [[update]] في خطوتين. أو «ابعتلي الكود بالإيميل» كبديل من غير أي حد، فبقى الإيميل هو الـ factor التاني بس. وفي الانترفيو: «TOTP بيحمي من phishing؟» لأ مش تمامًا: موقع مزيف ممكن ياخد الكود ويستخدمه في نفس الثانية. اللي بيحمي فعلًا الـ passkeys، لأنها مربوطة بالدومين.`
          },
          lines: [
            "الباسورد صح، والـ 2FA شغالة؟",
            "توكن ٥ دقايق بسر مختلف، معناه «ناقص الكود» بس.",
            "رجّعه للواجهة من غير أي توكنات دخول.",
            "قفلة.",
            "دالة التحقق من TOTP، هنستخدمها هنا وفي الـ step-up.",
            "اتحقق، وارفض أي فترة اتستخدمت قبل كده.",
            "غلط؟ ارجع.",
            "خزّن الفترة دي بشرط إنها أحدث من آخر واحدة. خطوة ذرية ضد الطلبات المتزامنة.",
            "صح لو احنا اللي حدّثنا.",
            "قفلة.",
            "الخطوة التانية، وعليها rate limit.",
            "الـ mfaToken والكود.",
            "المتغير اللي هيشيل id المستخدم.",
            "فك الـ mfaToken بسره هو. منتهي أو مزيف؟ ابدأ من الأول.",
            "هات المستخدم.",
            "النتيجة.",
            "٦ أرقام؟ يبقى TOTP.",
            "غير كده؟ recovery code:",
            "طبّعه، واحرقه لو موجود ومش مستخدم، في خطوة واحدة.",
            "صح لو صف واحد اتحدّث.",
            "ونبّه صاحب الحساب.",
            "قفلة.",
            "غلط؟ 401.",
            "طلّع التوكنات العادية زي أي login.",
            "قفلة."
          ],
          sol: R`نفس الكود مرتين: الأولى ترجع 200 بتوكنات، والتانية [[401 BAD_CODE]]، لأن [[totpLastStep]] بقى نفس فترة الكود و [[afterTimeStep]] بيرفضه. استنى الـ ٣٠ ثانية الجاية والكود الجديد يعدّي.

الـ recovery code بـ [[ABCDE-12345]] (small أو كبير، بشَرطة أو من غيرها) يعدّي أول مرة، ويوصل إيميل [[recovery-code-used]]. والمرة التانية [[401]].

الـ mfaToken على endpoint عليه requireAuth: لازم 401. لو عدّى، يبقى الاتنين موقّعين بنفس السر، والـ 2FA ملهاش لازمة.

لو الكود الصح اترفض أول مرة: غالبًا نفس الكود اللي فعّلت بيه في نفس الفترة، لأن التفعيل خزّن الـ timeStep بتاعه. ده سلوك صح.`
        },
        {
          cmd: "step-up auth",
          title: "العمليات الحساسة: اكتب الباسورد تاني",
          desc: R`الـ session بتعيش ٣٠ يوم، بس مش كل حاجة تتعمل بـ session عمرها أسبوعين. تغيير الإيميل أو الباسورد، وتشغيل أو قفل الـ 2FA، ومسح الحساب، وتغيير بيانات السحب: دي محتاجة إثبات جديد إن صاحب الحساب هو اللي قاعد دلوقتي. ده اسمه step-up auth (أو re-authentication).

الفكرة: الـ session فيها [[authAt]] (إمتى آخر مرة كتب الباسورد أو الكود). الـ access token بيشيله، و [[requireRecentAuth]] بترفض لو عدى أكتر من ١٠ دقايق. والواجهة لما تشوف [[REAUTH_REQUIRED]] بتفتح نافذة «اكتب الباسورد»، وتبعته لـ [[/auth/reauth]]، وتعيد الطلب.`,
          example: R`export function requireRecentAuth(maxAgeSec = 600) {
  return (req, res, next) => {
    if (Date.now() / 1000 - (req.user.authAt ?? 0) > maxAgeSec) throw new AppError(401, "REAUTH_REQUIRED", "اكتب الباسورد تاني عشان تكمّل");
    next();
  };
}
router.post("/auth/reauth", requireAuth, reauthLimiter, async (req, res) => {
  const { password, code } = z.object({ password: z.string().max(128), code: z.string().optional() }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (!user.passwordHash || !(await argon2.verify(user.passwordHash, password))) throw new AppError(401, "BAD_PASSWORD", "الباسورد غلط");
  if (user.totpEnabledAt && !(code && (await checkTotp(user, code)))) throw new AppError(401, "BAD_CODE", "كود الـ 2FA غلط");
  const session = await db.session.update({ where: { id: req.user.sid }, data: { authAt: new Date() } });
  res.json({ data: { accessToken: signAccess(user, session.id, session.authAt) } });
});
router.delete("/me", requireAuth, requireRecentAuth(), deleteAccount);`,
          try: R`ضيف [[sid]] و [[authAt]] للـ access token ([[signAccess]])، وعمود [[authAt]] لجدول sessions. بعدين اعمل access token بإيدك [[authAt]] بتاعه من ساعة، وجرّب [[DELETE /me]]. وبعدين اعمل reauth وجرّب تاني. وفكّر: الـ refresh بعد ٢٠ دقيقة المفروض يحط [[authAt]] إيه في التوكن الجديد؟`,
          flag: "script",
          deep: {
            why: "أغلب الاستيلاء على الحسابات مش بيحصل بالباسورد. بيحصل بـ session مسروقة: cookie من جهاز مشترك، أو لابتوب مفتوح في كافيه، أو XSS. لو الـ session لوحدها تقدر تغيّر الإيميل، المهاجم بيغيّره، ويعمل «نسيت الباسورد» على إيميله هو، والحساب راح للأبد. الـ step-up بيخلي السرقة دي تعمل أضرار محدودة.",
            how: R`[[authAt]] بيتخزن في صف الـ session، مش في الـ JWT بس. الـ login بيحطه [[now()]] (الـ default في الجدول)، والـ reauth بيحدّثه. والـ refresh بيطلّع access token جديد بنفس [[authAt]] اللي في الـ session، مش الوقت الحالي. لو الـ refresh حطّ الوقت الحالي، يبقى أي session شغالة بتعمل step-up لوحدها كل ربع ساعة، والفكرة كلها راحت.

الـ access token بقى فيه [[sid]] (رقم الـ session) كمان، عشان الـ reauth يحدّث الـ session دي بالذات، وعشان «اخرج من الأجهزة التانية» يعرف أنهي session هي الحالية.

الـ 2FA جزء من الـ reauth: لو شغالة، الباسورد لوحده مش كفاية. وإلا اللي سرق الباسورد والـ session يقدر يقفل الـ 2FA.

المستخدم اللي داخل بجوجل ومعندوش باسورد: الـ reauth بتاعه إنه يعدّي على جوجل تاني مع [[prompt=login]] (جوجل تطلب الباسورد عندها)، وتتأكد من [[auth_time]] في الـ id_token إنه قريب. أو passkey لو عنده.

الـ throw جوه middleware عادي (مش async) بيوصل للـ error handler في Express 4 و 5. و ١٠ دقايق رقم شائع: كفاية يعمل كذا تغيير ورا بعض من غير ما يكتب الباسورد كل شوية.

GitHub بيعمل كده بالظبط («sudo mode»)، وجوجل بتطلب الباسورد قبل صفحة الأمان.`,
            when: "على كل endpoint بيغيّر طريقة الدخول أو التواصل (إيميل، باسورد، 2FA، ربط أو فك provider، passkeys)، أو بيطلّع فلوس، أو بيمسح حاجة مبترجعش.",
            mistakes: R`الـ refresh بيحدّث [[authAt]]. أو الـ step-up بالباسورد بس والـ 2FA شغالة. أو [[/auth/reauth]] من غير rate limit، فبقى endpoint تخمين باسورد تاني. أو إنك تعتمد على «الواجهة بتطلب الباسورد» والسيرفر مبيتحققش، يعني أي طلب مباشر يعدّي. أو إنك تطلب الباسورد القديم في فورم تغيير الباسورد بس، وتنسى الإيميل والـ 2FA.`
          },
          lines: [
            "middleware بيتأكد إن آخر إثبات هوية حصل من قريب (١٠ دقايق افتراضي).",
            "دالة الـ middleware.",
            "عدى وقت أكتر من المسموح من [[authAt]] اللي في التوكن؟ اطلب reauth.",
            "غير كده كمّل.",
            "قفلة الدالة.",
            "قفلة.",
            "إثبات الهوية من جديد. داخل بالفعل، وعليه rate limit.",
            "الباسورد، والكود لو فيه 2FA.",
            "هات المستخدم.",
            "مفيش باسورد أو غلط؟ ارفض.",
            "الـ 2FA شغالة؟ الكود لازم يكون صح كمان.",
            "حدّث [[authAt]] في الـ session الحالية بس.",
            "رجّع access token جديد فيه [[authAt]] الجديد.",
            "قفلة.",
            "مثال: مسح الحساب محتاج دخول ومن قريب."
          ],
          sol: R`بالتوكن القديم: [[DELETE /me]] يرجع [[401 REAUTH_REQUIRED]]. بعد [[/auth/reauth]] بالباسورد (والكود لو فيه 2FA) بتاخد access token جديد، و [[DELETE /me]] بيه يعدّي.

إجابة السؤال: الـ refresh بعد ٢٠ دقيقة لازم يحط [[authAt]] بتاع الـ session نفسها (وقت الـ login أو آخر reauth)، يعني قديم، فالـ step-up يتطلب تاني. في كود الـ refresh: [[signAccess(user, session.id, session.authAt)]].

لو جرّبت الـ reauth بالباسورد بس والـ 2FA شغالة، المفروض [[401 BAD_CODE]]. ولو عدّى، يبقى نسيت الشرط التاني.`
        },
        {
          cmd: "تغيير الإيميل والباسورد",
          title: "تغيير الإيميل والباسورد من غير ما تفتح باب للسرقة",
          desc: R`تغيير الباسورد: step-up الأول، وبعدين الـ hash الجديد، وإلغاء كل الـ sessions التانية (الجهاز الحالي يفضل داخل)، وإيميل «الباسورد اتغيّر، لو مش انت كلّمنا».

تغيير الإيميل ٣ خطوات: step-up، وبعدين لينك تأكيد للإيميل الجديد (الإيميل مبيتغيّرش غير لما يتأكد)، وفي نفس الوقت إيميل للعنوان القديم «فيه طلب تغيير». ولما التغيير يتم، إيميل تاني للقديم، وكل الـ sessions تتلغي.`,
          example: R`router.post("/me/password", requireAuth, requireRecentAuth(), async (req, res) => {
  const { newPassword } = z.object({ newPassword: z.string().min(8).max(128) }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  await db.$transaction([
    db.user.update({ where: { id: user.id }, data: { passwordHash: await argon2.hash(newPassword) } }),
    db.session.updateMany({ where: { userId: user.id, revokedAt: null, id: { not: req.user.sid } }, data: { revokedAt: new Date() } }),
  ]);
  await emailQueue.add("password-changed", { to: user.email });
  res.status(204).end();
});
router.post("/me/email", requireAuth, requireRecentAuth(), async (req, res) => {
  const { email } = z.object({ email: z.email().transform((e) => e.toLowerCase()) }).parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  const token = crypto.randomBytes(32).toString("base64url");
  await db.emailToken.create({ data: { userId: user.id, purpose: "CHANGE_EMAIL", email, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 3600e3) } });
  await emailQueue.add("confirm-new-email", { to: email, link: $__bt$__{config.WEB_ORIGIN}/confirm-email?token=$__{token}$__bt });
  await emailQueue.add("email-change-requested", { to: user.email, newEmail: email });
  res.status(202).end();
});`,
          try: R`اكتب [[POST /auth/confirm-email-change]] اللي اللينك بيوصله: يتحقق من التوكن (النوع [[CHANGE_EMAIL]]، مش مستخدم، مخلصش)، ويغيّر الإيميل ويأكده، ويلغي كل الـ sessions، ويبعت إيميل للعنوان القديم. بعدين جرّب: سجّل دخول من متصفحين، وغيّر الباسورد من واحد، وشوف التاني بيحصله إيه.`,
          flag: "script",
          deep: {
            why: "الإيميل هو مفتاح الحساب، لأن «نسيت الباسورد» بتروح عليه. اللي يغيّر الإيميل يملك الحساب. عشان كده ده أول حاجة المهاجم بيعملها بعد ما يدخل، وعشان كده التغيير لازم يعدّي على step-up، ويتأكد من الإيميل الجديد، وصاحب الإيميل القديم يعرف.",
            how: R`الإيميل الجديد مش بيتحفظ في جدول users غير بعد التأكيد. لو حفظته على طول، أي غلطة كتابة تقفل الحساب، ومهاجم معاه session يحط إيميله ويعمل استعادة في نفس الدقيقة. فالإيميل الجديد بيستنى في صف التوكن ([[email]])، والمدة ساعة بس.

إيميل العنوان القديم هو إنذار مبكر: «فيه طلب تغيير إيميلك لـ n***@x.com. لو مش انت، غيّر الباسورد». بعض المنتجات بتحط فيه لينك «مش أنا» بيلغي الطلب ويقفل الـ sessions.

التأكيد (الـ solCode) بيعمل transaction: التوكن مستخدم، والإيميل الجديد و [[emailVerifiedAt]]، وإلغاء كل الـ sessions (حتى الحالية، لأن التأكيد ممكن يتفتح من جهاز تاني). ولو الإيميل الجديد اتسجّل بيه حد تاني في النص، القيد unique بيرفض والـ handler بيرجّع 409.

تغيير الباسورد: الـ sessions التانية بتتلغي لأن سبب التغيير غالبًا «حاسس إن حد عرف الباسورد». والحالية بتفضل عشان المستخدم ميطلعش. والـ access tokens بتاعة الأجهزة التانية بتفضل شغالة لحد ما تخلص (١٥ دقيقة)، ودي الحدود المعروفة للـ JWT. لو محتاج قفل فوري، خلي requireAuth يتأكد إن الـ [[sid]] مش ملغي (من Redis مثلًا).

الـ step-up هنا بيغني عن «اكتب الباسورد القديم» في الفورم. وفي الحالتين، الإيميلات بتروح queue.`,
            when: "في صفحة الإعدادات لأي منتج فيه حسابات. ولو المنتج فيه فلوس، ممكن تضيف فترة انتظار (٢٤ ساعة مثلًا) قبل ما الإيميل الجديد يقدر يعمل سحب.",
            mistakes: R`تغيير الإيميل فورًا من غير تأكيد. أو لينك التأكيد يروح للإيميل القديم. أو متبعتش أي حاجة للقديم. أو تغيير الباسورد من غير إلغاء الـ sessions. أو إلغاء الـ session الحالية كمان فالمستخدم يطلع ويستغرب. أو إنك تنسى تحدّث إيميل Stripe أو مزوّد الإيميلات بعد التغيير.`
          },
          lines: [
            "تغيير الباسورد: داخل، ومن قريب.",
            "الباسورد الجديد بنفس قواعد التسجيل.",
            "هات المستخدم.",
            "في transaction واحدة:",
            "الـ hash الجديد...",
            "...والغي كل الـ sessions ما عدا الحالية.",
            "قفلة الـ transaction.",
            "إيميل تنبيه لصاحب الحساب.",
            "تمام.",
            "قفلة.",
            "تغيير الإيميل: داخل، ومن قريب.",
            "الإيميل الجديد small.",
            "هات المستخدم.",
            "توكن عشوائي.",
            "خزّنه ومعاه الإيميل الجديد، وعمره ساعة. الإيميل في users لسه زي ما هو.",
            "لينك التأكيد يروح للإيميل الجديد.",
            "وتنبيه للإيميل القديم.",
            "202: مستنيين التأكيد.",
            "قفلة."
          ],
          sol: R`بعد ما تفتح لينك التأكيد: الرد 204، والإيميل في users بقى الجديد و [[emailVerifiedAt]] اتملى، وعدد الـ sessions المفتوحة بقى صفر، وفي الـ queue إيميل [[email-changed]] للعنوان القديم. لو فتحت نفس اللينك تاني: [[400 BAD_TOKEN]].

تغيير الباسورد من متصفح: التاني بيفضل شغال لحد ما الـ access token بتاعه يخلص (لحد ١٥ دقيقة)، وبعدين الـ refresh بيرجع 401 وبيطلع لصفحة الدخول. المتصفح اللي غيّرت منه بيفضل داخل.

الغلطة الشائعة: تستخدم [[update]] بدل التحقق من [[purpose]]، فلينك تأكيد إيميل عادي (VERIFY) يتقبل كتغيير إيميل.`,
          solCode: R`router.post("/auth/confirm-email-change", async (req, res) => {
  const row = await db.emailToken.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } });
  if (!row || row.purpose !== "CHANGE_EMAIL" || row.usedAt || row.expiresAt < new Date()) throw new AppError(400, "BAD_TOKEN", "اللينك انتهى");
  const old = await db.user.findUniqueOrThrow({ where: { id: row.userId } });
  await db.$transaction([
    db.emailToken.update({ where: { id: row.id }, data: { usedAt: new Date() } }),
    db.user.update({ where: { id: row.userId }, data: { email: row.email, emailVerifiedAt: new Date() } }),
    db.session.updateMany({ where: { userId: row.userId, revokedAt: null }, data: { revokedAt: new Date() } }),
  ]);
  await emailQueue.add("email-changed", { to: old.email, newEmail: row.email });
  res.status(204).end();
});`
        },
        {
          cmd: "CAPTCHA و lockout",
          title: "Turnstile و lockout: وقف تخمين الباسوردات من غير ما تقفل على الناس",
          desc: R`الـ rate limit بالـ IP (اللي في درس الـ login) مش كفاية: المهاجم عنده آلاف الـ IPs (botnet أو proxies). فبنضيف عداد لكل إيميل في Redis: بعد ٥ محاولات غلط، الـ login بيطلب CAPTCHA. وبعد ٢٠، الإيميل ده بيتقفل ربع ساعة، وصاحبه بياخد إيميل.

الـ CAPTCHA هنا Cloudflare Turnstile: widget في الواجهة بيطلّع token، والسيرفر بيتحقق منه بـ POST لـ [[siteverify]]. والتوكن بيعيش ٥ دقايق وينفع مرة واحدة.`,
          example: R`export async function turnstileOk(token, ip) {
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body: new URLSearchParams({ secret: config.TURNSTILE_SECRET, response: token, remoteip: ip }),
  });
  const out = await r.json();
  return out.success === true && out.action === "login";
}
router.post("/auth/login", loginLimiter, async (req, res) => {
  const { email, password, captcha } = Login.parse(req.body);
  const failKey = $__btlogin:fail:$__{sha256(email)}$__bt;
  const fails = Number(await redis.get(failKey)) || 0;
  if (fails >= 20) throw new AppError(429, "LOCKED", "محاولات كتير. جرّب بعد ربع ساعة أو غيّر الباسورد");
  if (fails >= 5 && !(await turnstileOk(captcha, req.ip))) throw new AppError(400, "CAPTCHA_REQUIRED", "أكّد إنك مش روبوت");
  const user = await db.user.findUnique({ where: { email } });
  const ok = await argon2.verify(user?.passwordHash ?? DUMMY_HASH, password);
  if (!user || !ok) {
    const n = await redis.incr(failKey);
    if (n === 1) await redis.expire(failKey, 15 * 60);
    if (n === 20 && user) await emailQueue.add("login-locked", { to: user.email });
    throw new AppError(401, "BAD_CREDENTIALS", "الإيميل أو الباسورد غلط");
  }
  await redis.del(failKey);
  // ... بعد كده الـ 2FA أو issueTokens زي ما هو
});`,
          try: R`استخدم مفاتيح Turnstile التجريبية: الـ site key [[1x00000000000000000000AA]] في الواجهة بيعدّي دايمًا، والـ secret [[1x0000000000000000000000000000000AA]] بيقبل، و [[2x0000000000000000000000000000000AA]] بيرفض. اكتب باسورد غلط ٥ مرات، وشوف الواجهة بتعرض الـ widget. بعدين كرر نفس الكلام بإيميل مش متسجّل خالص، وقارن الردود.`,
          flag: "script",
          deep: {
            why: "هجمات credential stuffing بتجرّب ملايين (إيميل، باسورد) من تسريبات مواقع تانية، من IPs كتير، ومحاولة أو اتنين لكل حساب. الـ rate limit بالـ IP مش بيشوفها. والعداد لكل حساب بيشوف التخمين المركّز على حساب واحد. والاتنين مع بعض بيغطوا أغلب الهجمات.",
            how: R`العداد بالإيميل مش بالمستخدم. الـ key هو [[sha256(email)]] سواء الإيميل متسجّل أو لأ. ليه؟ لو الـ CAPTCHA بيظهر للإيميلات المتسجّلة بس، المهاجم يعرف مين عنده حساب من مجرد ظهور الـ CAPTCHA. كده الاتنين بيتعاملوا نفس المعاملة. والـ hash عشان الإيميلات متتخزنش في Redis نص.

[[INCR]] ذري، و [[EXPIRE]] أول مرة بس، فالنافذة ١٥ دقيقة من أول غلطة. ولما الدخول ينجح العداد بيتمسح.

ليه CAPTCHA قبل الـ lockout؟ الـ lockout الصريح ليه عيب كبير: أي حد يعرف إيميلك يقدر يقفل حسابك بـ ٥ محاولات غلط، وده DoS على مستخدم بعينه. الـ CAPTCHA بتوقف السكربتات، والبني آدم يعدّي عادي. والقفل بعد ٢٠ بس، ومؤقت، ومعاه إيميل لصاحب الحساب (وفيه لينك استعادة الباسورد).

Turnstile: الواجهة بتحط [[<div class="cf-turnstile" data-sitekey="..." data-action="login">]]، والـ widget بيحط التوكن في حقل مخفي اسمه [[cf-turnstile-response]]. والسيرفر لازم يتحقق، لأن التوكن من الواجهة لوحده ممكن يتزوّر. و [[action]] بيتأكد إن التوكن اتعمل لفورم الـ login مش لفورم تاني. وخلي بالك: [[siteverify]] ممكن يفشل (شبكة)، فقرر هتعمل إيه: الأمان إنك ترفض.

و [[req.ip]] صح بس لو [[trust proxy]] متظبط ورا Nginx أو Cloudflare، وإلا كل الناس ليهم IP الـ proxy (الدرس «security baseline»).

ومفيش CAPTCHA يوقف بني آدم مدفوعله يحلها. ده خط دفاع مش حل كامل. الأقوى: باسوردات مش في تسريبات (API زي Have I Been Pwned بـ k-anonymity وقت التسجيل)، و 2FA، و passkeys.`,
            when: "على الـ login، والتسجيل، و «نسيت الباسورد»، وأي فورم عام بيبعت إيميلات. وابدأ بالـ CAPTCHA بعد عدد محاولات، مش من أول مرة، عشان متضايقش كل الناس.",
            mistakes: R`CAPTCHA من غير تحقق على السيرفر. أو lockout دايم بعد ٥ محاولات (DoS على أي حد). أو عداد بالـ user id فقط، فالإيميلات المش متسجّلة بتتعامل مختلف. أو رسالة «الحساب اتقفل» للإيميلات المتسجّلة بس. أو تنسى تمسح العداد بعد الدخول الصح. أو [[trust proxy]] مش متظبط، فالـ rate limit بالـ IP بيقفل كل الناس مرة واحدة.`
          },
          lines: [
            "دالة التحقق من توكن Turnstile.",
            "مفيش توكن؟ فشل.",
            "ابعته لـ Cloudflare...",
            "...مع الـ secret والتوكن والـ IP.",
            "قفلة الطلب.",
            "اقرا الرد.",
            "لازم ينجح، ويكون معمول لفورم الـ login.",
            "قفلة.",
            "الـ login، وعليه rate limit بالـ IP زي الأول.",
            "الإيميل والباسورد، وتوكن الـ CAPTCHA لو موجود.",
            "مفتاح العداد: hash للإيميل، متسجّل أو لأ.",
            "عدد المحاولات الغلط في آخر ربع ساعة.",
            "٢٠ أو أكتر؟ مقفول مؤقتًا.",
            "٥ أو أكتر؟ لازم CAPTCHA سليم.",
            "كمّل الـ login العادي.",
            "نفس التحقق بوقت ثابت.",
            "غلط؟",
            "زوّد العداد.",
            "أول غلطة؟ النافذة ١٥ دقيقة.",
            "وصل ٢٠ والحساب موجود؟ نبّه صاحبه.",
            "نفس الرسالة الموحدة.",
            "قفلة.",
            "دخل صح؟ صفّر العداد.",
            "قفلة."
          ],
          sol: R`الـ ٥ محاولات الأولى ترجع [[401 BAD_CREDENTIALS]]. السادسة بالباسورد الصح ومن غير captcha ترجع [[400 CAPTCHA_REQUIRED]]، ومع توكن الـ widget التجريبي تعدّي. والإيميل المش متسجّل بيمشي نفس الطريق بالظبط: ٥ مرات 401، وبعدين CAPTCHA_REQUIRED، وبعد ٢٠ [[429 LOCKED]]. ده المقصود، عشان محدش يعرف مين متسجّل.

مع الـ secret [[2x...]] أي توكن بيترفض وبيرجع [[success: false]] و [[error-codes]]، فالـ login بيفضل CAPTCHA_REQUIRED.

لو حاسس إن CAPTCHA_REQUIRED بيظهر من غير سبب، اتأكد إن الـ TTL اتحط ([[redis-cli TTL login:fail:...]])، ولو رجع [[-1]] يبقى العداد عايش للأبد.`
        },
        {
          cmd: "passkeys",
          title: "passkeys باختصار: دخول من غير باسورد ومن غير phishing",
          desc: R`الـ passkey (معيار WebAuthn) مفتاح خاص بيتعمل على جهاز المستخدم (بصمة، أو Face ID، أو PIN الجهاز)، ومتزامن غالبًا في iCloud Keychain أو Google Password Manager. السيرفر بيخزن المفتاح العام بس. وفي الدخول، السيرفر بيبعت challenge عشوائي، والجهاز بيوقّعه، والسيرفر بيتحقق بالمفتاح العام.

المكتبة المشهورة في Node هي SimpleWebAuthn: [[@simplewebauthn/server]] على السيرفر و [[@simplewebauthn/browser]] في الواجهة. الفلو: options من السيرفر، و [[startRegistration]] في المتصفح، و verify على السيرفر.`,
          example: R`import { generateRegistrationOptions, verifyRegistrationResponse } from "@simplewebauthn/server";

router.post("/me/passkeys/options", requireAuth, requireRecentAuth(), async (req, res) => {
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id }, include: { passkeys: true } });
  const options = await generateRegistrationOptions({
    rpName: "myapp", rpID: config.RP_ID, userName: user.email, attestationType: "none",
    excludeCredentials: user.passkeys.map((p) => ({ id: p.credentialId })),
    authenticatorSelection: { residentKey: "preferred", userVerification: "preferred" },
  });
  await redis.set($__btwebauthn:$__{user.id}$__bt, options.challenge, "EX", 300);
  res.json({ data: options });
});
router.post("/me/passkeys", requireAuth, async (req, res) => {
  const expectedChallenge = await redis.getdel($__btwebauthn:$__{req.user.id}$__bt);
  const { verified, registrationInfo } = await verifyRegistrationResponse({ response: req.body, expectedChallenge, expectedOrigin: config.WEB_ORIGIN, expectedRPID: config.RP_ID });
  if (!verified) throw new AppError(400, "PASSKEY_FAILED", "مقدرناش نسجّل المفتاح");
  const { credential } = registrationInfo;
  await db.passkey.create({ data: { userId: req.user.id, credentialId: credential.id, publicKey: Buffer.from(credential.publicKey), counter: credential.counter, transports: credential.transports ?? [] } });
  res.status(201).end();
});`,
          try: R`اعمل جدول [[Passkey]] (credentialId unique، و publicKey Bytes، و counter، و transports، و createdAt، و lastUsedAt). سجّل passkey من Chrome على localhost ([[rpID: "localhost"]] و [[expectedOrigin: "http://localhost:5173"]])، وجرّب في DevTools من More tools ثم WebAuthn تعمل virtual authenticator. بعدين اكتب نص الدخول: [[generateAuthenticationOptions]] و [[verifyAuthenticationResponse]].`,
          flag: "script",
          deep: {
            why: "الـ passkey هو الحاجة الوحيدة اللي بتقفل phishing فعلًا: المتصفح بيربط المفتاح بالدومين ([[rpID]])، فموقع مزيف على [[myapp-login.com]] مش هيقدر يطلب توقيع لـ [[myapp.com]] أصلًا. ومفيش سر على السيرفر يتسرب، لأن المفتاح العام ملوش قيمة لوحده. والمستخدم مش محتاج يفتكر حاجة.",
            how: R`الـ challenge: عشوائي من السيرفر، بيتخزن ٥ دقايق ([[getdel]] بيقراه ويمسحه في خطوة واحدة، فمينفعش يتستخدم مرتين). الجهاز بيوقّعه مع الـ origin، و [[verifyRegistrationResponse]] بتتأكد من الـ challenge والـ origin والـ rpID والتوقيع.

[[rpID]] هو الدومين ([[myapp.com]])، ولازم الصفحة تبقى عليه أو على subdomain منه. و [[attestationType: "none"]] معناها مش مهتمين نعرف نوع الجهاز، وده المناسب لأغلب المنتجات. و [[excludeCredentials]] بيمنع نفس الجهاز يتسجّل مرتين.

[[userName]] هو اللي بيظهر في قايمة الـ passkeys عند المستخدم. و [[userID]] لو مبعتتوش، المكتبة بتعمل واحد عشوائي. ولو هتستخدم discoverable login (المستخدم يضغط «ادخل بـ passkey» من غير ما يكتب إيميل)، خزّن [[options.user.id]] عشان تعرف صاحب المفتاح وقت الدخول.

الـ [[counter]] بيتخزن ويتحدث مع كل دخول. الـ passkeys المتزامنة غالبًا بترجّعه صفر دايمًا، وده طبيعي.

الدخول: [[generateAuthenticationOptions({ rpID })]]، والواجهة [[startAuthentication]]، والسيرفر [[verifyAuthenticationResponse]] مع [[credential]] المتخزن. والنتيجة session عادية، زي الـ login بالظبط.

إمتى تضيفه؟ بعد ما الـ auth الأساسي والـ 2FA يبقوا ثابتين. ابدأ بيه كطريقة إضافية في الإعدادات («ضيف passkey»)، مش بديل للباسورد. وبعدين زرار «ادخل بـ passkey» في صفحة الدخول. والمكتبة بتتحدث كتير (نسخة 13 و 14 غيّروا أسماء حقول)، فارجع لتوثيقها وقت التنفيذ.`,
            when: "منتج فيه حسابات قيّمة (فلوس، أو داتا شركات)، أو جمهور بيستخدم موبايلات حديثة. وللأدمن أحسن من TOTP. ولو المستخدمين عندهم passkey، ممكن يعتبر عامل واحد كفاية بدل باسورد + 2FA.",
            mistakes: R`challenge ثابت أو متخزن في الواجهة. أو rpID مختلف بين التسجيل والدخول (www وبدونها). أو إنك تجرب على IP بدل دومين (WebAuthn محتاج HTTPS أو localhost). أو [[publicKey]] يتخزن كنص من غير encoding صح. أو إنك تشيل الباسورد والإيميل خالص من أول يوم، والمستخدم غيّر موبايله ومعهوش مزامنة.`
          },
          lines: [
            "المكتبة: options و verify للتسجيل.",
            "طلب options لتسجيل passkey. داخل ومن قريب.",
            "هات المستخدم ومفاتيحه الموجودة.",
            "اعمل options:",
            "اسم التطبيق، والدومين، والاسم اللي هيظهر، ومش محتاجين attestation.",
            "متسجلش نفس الجهاز مرتين.",
            "مفتاح discoverable لو ينفع، والبصمة أو الـ PIN لو ينفع.",
            "قفلة.",
            "خزّن الـ challenge ٥ دقايق.",
            "رجّع الـ options للواجهة، وهي تنادي [[startRegistration]].",
            "قفلة.",
            "استلام رد الجهاز.",
            "هات الـ challenge وامسحه في خطوة واحدة.",
            "اتحقق من الـ challenge والـ origin والـ rpID والتوقيع.",
            "فشل؟ ارفض.",
            "المفتاح اللي اتعمل.",
            "خزّن الـ id والمفتاح العام والعداد والـ transports.",
            "تمام.",
            "قفلة."
          ],
          sol: R`مع الـ virtual authenticator في DevTools، [[startRegistration]] بيرجع JSON فيه [[id]] و [[response.attestationObject]]، و [[/me/passkeys]] ترجع 201، وجدول Passkey فيه صف. وفي تاب WebAuthn هتشوف الـ credential اتضاف.

الدخول: [[generateAuthenticationOptions({ rpID, allowCredentials: [] })]] (فاضية عشان discoverable)، والواجهة [[startAuthentication({ optionsJSON })]]، والسيرفر يدوّر على الـ passkey بـ [[response.id]] وينادي [[verifyAuthenticationResponse({ response, expectedChallenge, expectedOrigin, expectedRPID, credential: { id, publicKey, counter, transports } })]]، ولو [[verified]] يحدّث الـ counter و lastUsedAt ويعمل session.

لو ظهر [[Unexpected authentication response origin]]: الـ origin فيه port مختلف أو http بدل https. ولو [[The operation is insecure]] في المتصفح: الصفحة مش على HTTPS أو localhost.`
        }
      ]
    },
    {
      t: "الصلاحيات والدفع",
      l: 2,
      n: "مين يقدر يعمل إيه، وبعدين أهم ميزة في المنتج: الفلوس من الزرار لحد التفعيل",
      items: [
        {
          cmd: "requireAuth و requireRole",
          title: "مين داخل، ومسموحله يعمل إيه",
          desc: R`[[requireAuth]] بيتأكد من الـ access token، ويحط المستخدم في [[req.user]]. و [[requireRole]] بيتأكد إن دوره مسموح. وبيتحطوا قدام الـ route: [[router.post("/admin/courses", requireAuth, requireRole("ADMIN"), handler)]].

401 معناها «مش عارفين انت مين». و 403 معناها «عارفينك، بس مش مسموحلك».`,
          example: R`export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) throw new AppError(401, "UNAUTHENTICATED", "سجّل دخول الأول");
  try {
    const payload = jwt.verify(token, config.JWT_SECRET, { algorithms: ["HS256"] });
    req.user = { id: payload.sub, role: payload.role };
  } catch {
    throw new AppError(401, "TOKEN_EXPIRED", "التوكن انتهى");
  }
  next();
}

export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role) ? next() : next(new AppError(403, "FORBIDDEN", "مش مسموحلك"));`,
          try: R`اعمل route للأدمن بس، واطلبه ٣ مرات: من غير توكن (المفروض 401)، وبتوكن طالب (403)، وبتوكن أدمن (200). بعدين عدّل حرف في التوكن وابعته، ولازم يرجع 401.`,
          flag: "script",
          deep: {
            why: "إخفاء زرار الأدمن في الواجهة مش حماية، ده شكل بس. أي حد يقدر يبعت الطلب بـ curl. الحماية الحقيقية بتبقى على السيرفر، على كل route، من غير استثناء.",
            how: R`[[jwt.verify]] بيتأكد من التوقيع والمدة. و [[algorithms]] بتحدد الخوارزمية المقبولة، ودي بتقفل هجمات قديمة زي توكن بـ [[alg: none]]. وفي Express، الـ throw جوه middleware عادي (مش async) بيوصل للـ error handler لوحده.

الدور متخزن جوه التوكن، فمش محتاج تسأل القاعدة مع كل طلب. بس ده ليه تمن: لو شلت صلاحية أدمن، التوكن اللي معاه هيفضل شغال لحد ما يخلص، يعني لحد ١٥ دقيقة. في أغلب الـ routes ده مقبول. بس في لوحة الأدمن والعمليات الخطيرة، اقرا الدور من القاعدة مع كل طلب. طلب واحد زيادة، في مقابل إن الصلاحية تتشال فورًا.

ولما المنتج يكبر، الأدوار لوحدها مبتكفيش. بتعمل permissions زي [[course:publish]] و [[order:refund]]، وكل دور بيبقى مجموعة permissions. وساعتها الـ middleware بيبقى [[requirePermission("order:refund")]]، وتقدر تعمل دور جديد من غير ما تلمس الكود.

وفي Next.js، الـ proxy (اسمه كان middleware قبل Next 16) مش مكان الحماية الوحيد. الوثائق نفسها بتقول اتحقق جوه كل Server Function و Route Handler. التفاصيل في تاب «Next.js».`,
            when: "على كل route مش public. والأسهل تحطهم على الـ router كله مرة واحدة: [[admin.use(requireAuth, requireRole(\"ADMIN\"))]].",
            mistakes: R`إنك تحمي في الواجهة بس. أو [[jwt.decode]] بدل verify. أو تنسى route واحد في النص. وفي مشروع حقيقي كان الدور بييجي من التوكن في لوحة الأدمن، فأدمن اتشالت صلاحيته فضل شغال لحد ما التوكن خلص. وفي مشروع تاني كانت الواجهة كاتبة قوايم الأدوار بإيدها في كذا مكان ([[role === "dev" || role === ...]])، مكررة من السيرفر، ومع أول تعديل بقوا مختلفين.`
          },
          lines: [
            "middleware بيتأكد إن فيه مستخدم داخل.",
            "الـ header، أو نص فاضي لو مش موجود.",
            "خد التوكن بعد كلمة Bearer.",
            "مفيش توكن؟ 401.",
            "جرّب تتحقق...",
            "...من التوقيع والمدة، وبالخوارزمية دي بس.",
            "حط المستخدم في الطلب عشان اللي بعده يستخدمه.",
            "لو التحقق فشل...",
            "...401، والواجهة هتعمل refresh.",
            "قفلة.",
            "كمّل للي بعده.",
            "قفلة.",
            "middleware بياخد الأدوار المسموحة ويرجّع middleware...",
            "...لو الدور في القايمة كمّل، ولو لأ 403."
          ],
          sol: R`النتايج: من غير توكن [[401 UNAUTHENTICATED]]، وبتوكن طالب [[403 FORBIDDEN]]، وبتوكن أدمن [[200]]، وبتوكن متعدل [[401]]. لاحظ إن الكود بيرجّع [[TOKEN_EXPIRED]] لأي فشل في [[jwt.verify]]، سواء التوكن انتهى أو التوقيع غلط. ده كويس للواجهة (في الحالتين هتعمل refresh)، بس في اللوج فرّق بينهم: [[TokenExpiredError]] عادي، و [[JsonWebTokenError: invalid signature]] ممكن يبقى حد بيجرب.

خلي بالك وانت بتعدّل: لو غيرت آخر حرف في التوكن، ممكن يعدّي! آخر حرف في base64url فيه bits زيادة مش مستخدمة، فساعات حرفين مختلفين بيطلّعوا نفس البايتات. غيّر حرف في نص الـ payload (الجزء اللي في النص) عشان تتأكد. وكمان [[bearer]] بحرف صغير هترجع 401 [[UNAUTHENTICATED]] لأن الكود بيدوّر على [[Bearer ]] بالظبط.

لو الطالب رجع 200، يبقى [[requireRole]] مش متسجّل على الـ route، أو الدور بيتقري من الـ body بدل التوكن.`,
          solCode: R`router.get("/admin/stats", requireAuth, requireRole("ADMIN"), async (req, res) => {
  res.json({ data: { users: await db.user.count() } });
});

# curl -s -w ' %{http_code}\n' localhost:4000/admin/stats                                   # 401
# curl -s -w ' %{http_code}\n' -H "Authorization: Bearer $STUDENT" localhost:4000/admin/stats   # 403
# curl -s -w ' %{http_code}\n' -H "Authorization: Bearer $ADMIN" localhost:4000/admin/stats     # 200`
        },
        {
          cmd: "ownership",
          title: "مسموحلك بالنوع ده، بس الحاجة دي بتاعتك؟",
          desc: R`الدور مش كفاية. الطالب مسموحله يشوف الطلبات، بس طلباته هو بس. عشان كده كل query لازم يبقى فيه شرط الملكية جوه الـ [[where]] نفسه: [[{ id, userId: req.user.id }]]. ولو الحاجة مش بتاعته، رد 404 مش 403، عشان ميعرفش إنها موجودة أصلًا.

ولو شغال بـ Supabase والواجهة بتكلّم القاعدة مباشرة، نفس القاعدة بتتكتب في القاعدة نفسها بـ RLS.`,
          example: R`router.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findFirst({
    where: { id: req.params.id, ...(req.user.role !== "ADMIN" && { userId: req.user.id }) },
    select: { id: true, status: true, amountCents: true, course: { select: { slug: true, title: true } } },
  });
  if (!order) throw new AppError(404, "NOT_FOUND", "الطلب مش موجود");
  res.json({ data: order });
});
router.get("/lessons/:id/video", requireAuth, async (req, res) => {
  const lesson = await db.lesson.findFirst({
    where: { id: req.params.id, OR: [{ isPreview: true }, { course: { enrollments: { some: { userId: req.user.id } } } }] },
  });
  if (!lesson) throw new AppError(403, "NOT_ENROLLED", "اشترك في الكورس الأول");
  res.json({ data: { url: await storage.signedUrl(lesson.videoKey, 3600) } });
});`,
          try: R`اعمل مستخدمين، وكل واحد يعمل طلب. بتوكن الأول اطلب طلب التاني بالـ id بتاعه. لازم يرجع 404. بعدين جرّب تجيب فيديو درس في كورس مش مشترك فيه.`,
          flag: "script",
          deep: {
            why: "دي أشهر ثغرة في الـ APIs، واسمها IDOR أو Broken Access Control، ورقم ١ في OWASP. الـ endpoint بيتأكد إنك داخل، ويجيب أي id تبعته. فتغيّر رقم في الـ URL تشوف طلبات غيرك، أو فواتيرهم، أو فيديوهاتهم المدفوعة.",
            how: R`الشرط جوه الـ where مش بعد ما تجيب الداتا. لو جبت الطلب وبعدين عملت [[if (order.userId !== req.user.id)]]، ده صح برضه، بس سهل تنساه. أما لما الشرط جزء من الـ query، مفيش طريقة الداتا تطلع غلط.

الفيديو مثال على الملكية عن طريق علاقة: الدرس مسموح لو معمول preview، أو لو الكورس بتاعه فيه enrollment للمستخدم ده. Prisma بتحوّل [[some]] لـ EXISTS في SQL. والرابط اللي بيرجع موقّع وعمره ساعة، يعني الفيديو نفسه مش public.

وفي Supabase، الواجهة بتكلّم القاعدة مباشرة، فالـ RLS هو الـ backend بتاعك. سياسة القراية بتبقى كده: [[create policy "own orders" on orders for select using (user_id = auth.uid());]]. وفيه ٣ حاجات لازم تاخد بالك منها:

١. سياسة UPDATE بتسمح بتعديل الصف كله، بكل أعمدته. [[using (auth.uid() = id)]] على profiles معناها إن المستخدم يقدر يغيّر أي عمود في صفّه، ومنهم role. الحل إنك تمنع الأعمدة الحساسة: [[revoke update on profiles from authenticated]] وبعدين [[grant update (name, avatar_url) on profiles to authenticated]] للأعمدة المسموحة بس. الـ revoke على عمود واحد ملوش أي تأثير طول ما فيه grant على الجدول كله، وده الافتراضي في Supabase. أو تخلي التعديل عن طريق function.

٢. الـ RLS بيحمي الصفوف مش الأعمدة. [[using (true)]] على جدول الأسئلة معناها إن الإجابات الصح بتطلع مع الأسئلة. الحل إنك تحط الإجابات في جدول تاني محدش يقراه غير السيرفر.

٣. سياسة الأدمن اللي بتقرا من نفس الجدول ([[exists (select 1 from profiles where ...)]] على جدول profiles نفسه) بتعمل دايرة. الحل function بـ [[security definer]] زي [[is_admin()]].

التفاصيل في تاب «SQL و Prisma»، و OWASP في تاب «أمان الموقع».`,
            when: "كل endpoint بياخد id من برّه. من غير استثناء، حتى لو «محدش هيعرف الـ id».",
            mistakes: R`في مشاريع حقيقية لقينا كل واحدة من دول. سياسة تعديل الـ profile من غير تحديد أعمدة، فأي مستخدم يقدر يخلّي نفسه admin. وطالب يقدر يعدّل نتيجة امتحانه ([[score]] و [[is_passed]]) في صفّه. ولاعب يعدّل الـ xp والـ level بتوعه. وأسئلة الامتحان بإجاباتها الصح مقروءة لأي حد عن طريق [[using (true)]]. وكتب مدفوعة PDF متخزنة بروابط public دايمة، فأي حد معاه اللينك ينزّلها على طول. والصح هنا رابط موقّع عمره ساعة. وكمان في مشروع منهم، ملف «تصليح» الـ RLS كان بيعمل نفس السياسات الغلط تاني.`
          },
          lines: [
            "طلب واحد بالـ id.",
            "دوّر...",
            "...بالـ id، ولو مش أدمن لازم يكون صاحبه. الشرط جوه الـ query نفسه.",
            "رجّع الحقول اللي الصفحة محتاجاها بس.",
            "قفلة.",
            "مش موجود أو مش بتاعه؟ نفس الرد 404.",
            "رجّعه.",
            "قفلة.",
            "رابط فيديو درس.",
            "دوّر على الدرس...",
            "...لو preview مجاني، أو الكورس بتاعه فيه اشتراك للمستخدم ده.",
            "قفلة.",
            "مش مشترك؟ 403 ومعاها سبب واضح.",
            "رابط موقّع عمره ساعة، مش رابط public.",
            "قفلة."
          ],
          sol: R`بتوكن صاحب الطلب: [[200]] و [[{"data":{"id":"...","status":"PENDING","amountCents":50000,"course":{"slug":"...","title":"SQL"}}}]]. وبتوكن المستخدم التاني على نفس الـ id: [[404]] و [[{"error":{"code":"NOT_FOUND","message":"الطلب مش موجود"}}]]، مش 403. كده مبيعرفش إن الطلب ده موجود أصلًا. والأدمن بياخد 200 على أي طلب.

الفيديو: درس [[isPreview: true]] بيرجع الرابط لأي حد مسجّل دخول. ودرس عادي في كورس مش مشترك فيه بيرجع [[403 NOT_ENROLLED]]. هنا 403 مقبولة، لأن الدرس نفسه ظاهر في صفحة الكورس ومفيش سر في وجوده.

لو المستخدم التاني شاف الطلب، يبقى انت عامل [[findUnique({ where: { id } })]] وبعدين بتقارن [[userId]]، ونسيت المقارنة في route من الـ routes. الشرط جوه الـ where نفسه أضمن، لأنه ميتنسيش.`
        },
        {
          cmd: "POST /orders",
          title: "من زرار «اشتري» لطلب مستني الدفع",
          desc: R`الواجهة بتبعت [[courseId]] بس. السعر، والكورس منشور ولا لأ، والطالب مشترك قبل كده ولا لأ، كل ده السيرفر بيقرره من القاعدة. بعدين بيعمل Order بحالة PENDING، ويطلب من البوابة رابط دفع، ويرجّعه. والواجهة بتعمل [[window.location.href = checkoutUrl]].`,
          example: R`router.post("/orders", requireAuth, async (req, res) => {
  const { courseId } = CreateOrder.parse(req.body);
  const course = await db.course.findFirst({ where: { id: courseId, published: true } });
  if (!course) throw new AppError(404, "NOT_FOUND", "الكورس مش موجود");
  const owned = await db.enrollment.findUnique({ where: { userId_courseId: { userId: req.user.id, courseId } } });
  if (owned) throw new AppError(409, "ALREADY_ENROLLED", "الكورس ده عندك أصلًا");
  const order = await db.order.create({ data: { userId: req.user.id, courseId, amountCents: course.priceCents } });
  const user = await db.user.findUniqueOrThrow({ where: { id: req.user.id } });
  const checkoutUrl = await paymob.createCheckout({ order, course, user });
  res.status(201).json({ data: { orderId: order.id, checkoutUrl } });
});`,
          try: R`ابعت الطلب بـ curl ومعاه [[amountCents: 1]] في الـ body. لازم الطلب يتعمل بالسعر الحقيقي، والحقل الزيادة يتجاهل. بعدين اشترك في كورس وحاول تطلبه تاني، ولازم ترجع 409.`,
          flag: "script",
          deep: {
            why: "أي حاجة جاية من المتصفح المستخدم يقدر يغيّرها: الـ DevTools، أو curl، أو إضافة. لو السعر أو الحالة جايين من الواجهة، أي حد يقدر يشتري بجنيه، أو يسجّل طلب مدفوع من غير ما يدفع.",
            how: R`الطلب بيتعمل قبل ما نكلّم البوابة. كده عندنا id نبعته للبوابة كمرجع (special_reference)، والبوابة هترجّعه في الـ webhook، فنعرف أنهي طلب اتدفع. ولو البوابة وقعت، الطلب بيفضل PENDING، ومفيش حاجة باظت.

والسعر بيتنسخ في الطلب ([[amountCents]]). الـ webhook بعدين بيقارن المبلغ اللي اتدفع بالرقم ده، مش بسعر الكورس الحالي اللي ممكن يكون اتغير في النص.

والكوبونات بتتحسب هنا على السيرفر: تتأكد إن الكوبون صالح، وتحسب السعر النهائي، وتنسخه في الطلب. وعدد استخدامات الكوبون بيزيد لما الدفع ينجح، مش هنا، وبـ update ذري: [[updateMany({ where: { code, uses: { lt: maxUses } }, data: { uses: { increment: 1 } } })]].

والكورس المجاني (السعر صفر) السيرفر بيعمله enrollment على طول من غير بوابة. بس ده قرار السيرفر من السعر اللي في القاعدة، مش حقل جاي من الواجهة.

وممكن تعيد استخدام طلب PENDING قديم لنفس الطالب ونفس الكورس بدل ما تعمل واحد جديد مع كل ضغطة. ده بيقلل الطلبات اليتيمة في القاعدة.`,
            when: "أي عملية فيها فلوس أو صلاحيات. الواجهة بتبعت «عايز إيه»، والسيرفر بيقرر «بكام» و «مسموح ولا لأ».",
            mistakes: R`في مشروع حقيقي، صفحة الدفع كانت بتعمل insert للطلب من المتصفح مباشرة في Supabase، ومعاه المبلغ والخصم والحالة. وسياسة RLS كانت بتسمح بطلب حالته [[completed]] لو طريقة الدفع [[free]]. وtrigger في القاعدة بيدّي الكورس لأي طلب completed. النتيجة إن أي عضو يقدر ياخد أي كورس مدفوع ببلاش، أو يدفع المبلغ اللي هو كتبه. وفي مشروع تاني، عداد استخدام الكوبون كان بيزيد قبل الدفع، وبطريقة «اقرا الرقم وضيف واحد واكتبه»، فطلبين مع بعض بيستخدموا نفس آخر كوبون.`
          },
          lines: [
            "إنشاء طلب، ولازم يكون داخل.",
            "الواجهة بتبعت id الكورس بس. أي حقل تاني بيتجاهل.",
            "الكورس لازم يكون موجود ومنشور.",
            "مش موجود؟ 404.",
            "مشترك قبل كده؟",
            "لو أيوه، 409، ومفيش طلب جديد.",
            "الطلب بالسعر اللي في القاعدة وحالته PENDING (الافتراضي من الـ schema).",
            "بيانات المستخدم الكاملة، للبوابة (الاسم والإيميل).",
            "اطلب من البوابة رابط دفع للطلب ده (الدرس الجاي).",
            "رجّع رقم الطلب والرابط، والواجهة تحوّل عليه.",
            "قفلة."
          ],
          sol: R`الطلب بـ [[amountCents: 1]] بيرجع [[201]] و [[{"data":{"orderId":"...","checkoutUrl":"..."}}]]، وفي القاعدة [[amountCents]] بتاع الطلب هو [[priceCents]] بتاع الكورس (50000 مثلًا) والـ status [[PENDING]]. الحقل الزيادة اتشال لأن [[z.object]] في Zod بيشيل أي key مش متعرّف (strip)، والكود أصلًا بياخد السعر من القاعدة.

بعد ما الكورس يبقى عندك (enrollment موجود)، نفس الطلب يرجّع [[409]] و [[{"error":{"code":"ALREADY_ENROLLED","message":"الكورس ده عندك أصلًا"}}]]. ولو بعت [[courseId]] لكورس مش منشور، [[404 NOT_FOUND]].

لو الـ amountCents اللي في القاعدة طلع 1، يبقى انت عامل [[data: { ...req.body, userId }]] أو [[data: input]]. ده بالظبط الـ mass assignment، ومعناه إن أي حد يقدر يشتري أي كورس بقرش.`,
          solCode: R`curl -s -w ' %{http_code}\n' -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"courseId":"COURSE_ID","amountCents":1}' localhost:4000/orders

psql "$DATABASE_URL" -c 'SELECT "amountCents", status FROM "Order" ORDER BY "createdAt" DESC LIMIT 1;'`
        },
        {
          cmd: "Paymob intention",
          title: "اطلب من البوابة صفحة دفع للطلب ده",
          desc: R`Paymob عندها Intention API. السيرفر بيبعت المبلغ، ورقم الـ integration، وبيانات العميل، و [[special_reference]] بيبقى رقم الطلب بتاعنا، ومعاهم رابط الـ webhook ورابط الرجوع. الرد فيه [[client_secret]]، والسيرفر بيركّب منه رابط الـ Unified Checkout.

الكارت بيتكتب في صفحة Paymob، ومبيعدّيش على سيرفرك أبدًا. وتفاصيل الـ webhook والـ tunnel على جهازك في تاب «Node و npm».`,
          example: R`export async function createCheckout({ order, course, user }) {
  const r = await fetch("https://accept.paymob.com/v1/intention/", {
    method: "POST", signal: AbortSignal.timeout(10_000),
    headers: { Authorization: $__btToken $__{config.PAYMOB_SECRET_KEY}$__bt, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: order.amountCents, currency: "EGP", payment_methods: [config.PAYMOB_CARD_INTEGRATION_ID],
      items: [{ name: course.title, amount: order.amountCents, quantity: 1 }],
      billing_data: { first_name: user.name, last_name: "-", email: user.email, phone_number: user.phone ?? "NA" },
      special_reference: order.id, notification_url: $__bt$__{config.API_ORIGIN}/webhooks/paymob$__bt,
      redirection_url: $__bt$__{config.WEB_ORIGIN}/orders/$__{order.id}$__bt,
    }),
  });
  if (!r.ok) throw new AppError(502, "GATEWAY_DOWN", "بوابة الدفع مش متاحة دلوقتي، جرّب كمان شوية");
  const { client_secret } = await r.json();
  return $__bthttps://accept.paymob.com/unifiedcheckout/?publicKey=$__{config.PAYMOB_PUBLIC_KEY}&clientSecret=$__{client_secret}$__bt;
}`,
          try: R`اعمل حساب test في Paymob، وخد المفتاح السري والـ public key ورقم integration الكروت. اعمل طلب وافتح الرابط اللي رجع، وادفع بكارت الاختبار اللي في وثائقهم. شوف اللي وصل للـ webhook من لوحة ngrok.`,
          flag: "script",
          deep: {
            why: "ده الجزء اللي بيحوّل الطلب لصفحة دفع حقيقية. وفيه ٣ حاجات لازم تبقى صح: المبلغ جاي من الطلب، والمفتاح السري على السيرفر بس، والمرجع اللي هيربط الدفعة بالطلب.",
            how: R`الفلو فيه ٣ أطراف. سيرفرك بيعمل intention بالمفتاح السري. Paymob بترجّع [[client_secret]] خاص بالعملية دي. والمتصفح بيتحوّل لصفحة Paymob ومعاه الـ public key والـ client_secret، ودول الاتنين مش أسرار.

بعد ما العميل يدفع، Paymob بتعمل حاجتين منفصلتين. أولًا بتبعت POST لـ [[notification_url]] من سيرفرها لسيرفرك، وده الـ webhook، ودي الحقيقة. وتانيًا بتحوّل المتصفح لـ [[redirection_url]]، وده للعرض بس، ومش دليل على أي حاجة.

[[special_reference]] بيرجع في الـ webhook جوه [[obj.order.merchant_order_id]]، وبيه بنعرف أنهي طلب اتدفع. والمبلغ بالقرش، ومجموع الـ items لازم يساوي الـ amount. ورقم الـ integration بيحدد طريقة الدفع (كارت، أو محفظة، أو تقسيط)، ومن الـ config بيتحوّل رقم بـ [[z.coerce.number()]]. والمهلة ١٠ ثواني، عشان لو البوابة بطيئة طلب المستخدم ميفضلش معلّق.

وكون صفحة الكارت عند Paymob معناه إن بيانات الكارت عمرها ما بتلمس سيرفرك، فانت تقريبًا بره نطاق PCI DSS. ده سبب كفاية إنك متعملش فورم كارت بنفسك.

وفي staging استخدم integration بوضع test ومفاتيح test. وفي Stripe نفس الفكرة بالظبط: Checkout Session بـ [[metadata.orderId]]، والتأكيد من event اسمه [[checkout.session.completed]] في الـ webhook. وفلو Paymob القديم (auth token، وبعدين order، وبعدين payment key، وبعدين iframe) لسه موجود في مشاريع قديمة، بس الـ intention هو الطريقة الحالية.`,
            when: "مرة لكل محاولة دفع. ولو المستخدم رجع من غير ما يدفع وضغط «ادفع» تاني، ممكن تعمل intention جديد لنفس الطلب.",
            mistakes: "إنك تعمل الـ intention من الواجهة، فالمفتاح السري يبقى في الـ JavaScript. أو تبعت المبلغ من الـ request body. أو fetch من غير timeout، فطلب المستخدم يعلق دقايق. أو مفاتيح الإنتاج في staging. أو تعتمد على رابط الرجوع كتأكيد للدفع، ودي الدرس الجاي والتاني بعده."
          },
          lines: [
            "دالة في [[paymob.ts]] بتاخد الطلب والكورس والمستخدم وبترجّع رابط دفع.",
            "POST لـ Intention API بتاعة Paymob...",
            "...ومهلة ١٠ ثواني. لو البوابة بطيئة، منعلقش المستخدم.",
            "المفتاح السري بكلمة Token قبله. ده مكانه السيرفر بس.",
            "جسم الطلب:",
            "المبلغ بالقرش من الطلب، والعملة، ورقم integration الكروت.",
            "الـ items، ومجموعها لازم يساوي المبلغ.",
            "بيانات الفاتورة. رقم التليفون مطلوب عندهم.",
            "رقم طلبنا كمرجع، هيرجع في الـ webhook. ورابط الـ webhook بتاعنا.",
            "المكان اللي المتصفح هيرجع له بعد الدفع. للعرض بس.",
            "قفلة الـ body.",
            "قفلة الـ fetch.",
            "البوابة رفضت أو وقعت؟ 502 برسالة مفهومة.",
            "خد الـ client_secret.",
            "رابط صفحة الدفع الموحدة، بالـ public key والـ client_secret.",
            "قفلة."
          ],
          sol: R`اللي المفروض تشوفه: [[createCheckout]] يرجّع رابط بالشكل [[https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_...&clientSecret=egy_csk_test_...]]، ولما تفتحه تلاقي صفحة Paymob فيها اسم الكورس والمبلغ بالجنيه (المبلغ اللي انت بعته بالقروش مقسوم على 100). وبعد الدفع بكارت الاختبار، البوابة بترجّعك على [[redirection_url]] (صفحة الطلب عندك)، وبتبعت POST على [[notification_url]].

في لوحة ngrok ([[http://127.0.0.1:4040]]) هتلاقي POST على [[/webhooks/paymob?hmac=...]]، وجسمه JSON فيه [["type": "TRANSACTION"]] و [[obj]] فيه [[success]] و [[pending]] و [[amount_cents]] و [[order.merchant_order_id]]. الأخير هو الـ id بتاع الطلب عندك (اللي بعته في [[special_reference]])، ومنه الـ webhook بيعرف أنهي طلب.

أشهر مشاكل: 401 من [[/v1/intention/]] يبقى المفتاح السري غلط أو فيه مسافة، أو بتستخدم مفتاح live مع integration test. ولو الصفحة فتحت من غير الكارت، يبقى [[PAYMOB_CARD_INTEGRATION_ID]] مش رقم integration الكروت. ولو مفيش webhook خالص، يبقى [[API_ORIGIN]] لسه localhost بدل رابط ngrok. الأرقام وأسماء الحقول الدقيقة ممكن تتغير، فراجعها في وثائق Paymob الحالية.`
        },
        {
          cmd: "webhook الدفع",
          title: "البوابة بتأكد: فعّل مرة واحدة بس",
          desc: R`الـ webhook هو المكان الوحيد اللي بيحوّل الطلب لـ PAID. قبل ما يعمل أي حاجة، بيتأكد من ٣ حاجات. التوقيع (HMAC) صح. والدفعة نجحت ومش معلّقة. والمبلغ هو مبلغ الطلب. وبعدين بيحدّث الطلب بشرط إنه لسه مش PAID، ويدّي الاشتراك، والاتنين جوه transaction واحدة.

كود [[verifyPaymob]] وتجربته على جهازك في تاب «Node و npm» في قسم الـ Webhooks.`,
          example: R`router.post("/webhooks/paymob", async (req, res) => {
  if (req.body.type !== "TRANSACTION") return res.status(200).end();
  const tx = req.body.obj;
  if (!verifyPaymob(tx, req.query.hmac, config.PAYMOB_HMAC_SECRET)) return res.status(401).end();
  if (tx.success === true && tx.pending === false) await orders.markPaid(tx.order.merchant_order_id, tx);
  res.status(200).end();
});
export async function markPaid(orderId, tx) {
  await db.$transaction(async (t) => {
    const order = await t.order.findUnique({ where: { id: orderId } });
    if (!order || tx.amount_cents !== order.amountCents) return logger.error({ orderId, txId: tx.id }, "payment mismatch");
    const { count } = await t.order.updateMany({ where: { id: orderId, status: { not: "PAID" } }, data: { status: "PAID", gatewayTxId: String(tx.id) } });
    if (count === 0) return;
    await t.enrollment.upsert({ where: { userId_courseId: { userId: order.userId, courseId: order.courseId } }, create: { userId: order.userId, courseId: order.courseId }, update: {} });
  });
}`,
          try: R`من لوحة ngrok اعمل Replay لنفس الـ webhook الناجح ٣ مرات، وتأكد إن فيه enrollment واحد بس. بعدين ابعت webhook فاشل لنفس الطلب بعد النجاح، ولازم يفضل PAID. وبعدين غيّر حرف في الـ hmac، ولازم ترجع 401 ومفيش حاجة تتغير.`,
          flag: "script",
          deep: {
            why: "ده أخطر endpoint في المشروع. هو عام، وأي حد يقدر يبعتله، وهو اللي بيدّي حاجات بفلوس. أي غلطة فيه معناها واحدة من الاتنين: كورسات ببلاش، أو ناس دفعت ومخدتش حاجة.",
            how: R`الحارس الأول التوقيع. Paymob بتحسب HMAC-SHA512 على حقول معينة بترتيب معين، وبتبعته في [[?hmac=]] في الـ query string. انت بتحسب نفس الحاجة بالسر بتاعك وبتقارن بـ [[timingSafeEqual]]. ولو التوقيع مش موجود، ده رفض. مش «عدّيه وخلاص».

الحارس التاني المبلغ. حتى لو التوقيع سليم، قارن [[amount_cents]] بمبلغ الطلب اللي في القاعدة. أي اختلاف معناه bug أو تلاعب، يتسجّل في اللوج ومفيش تفعيل.

الحارس التالت الحالة. [[updateMany]] بشرط [[status: { not: "PAID" }]] قراية وكتابة في خطوة ذرية. أول webhook بياخد count بـ 1 ويكمّل. وأي تكرار بعده، حتى لو في نفس الملّي ثانية، بياخد 0 ويطلع. والـ upsert على الاشتراك حماية زيادة.

الـ transaction بتضمن إن الطلب والاشتراك يتكتبوا الاتنين أو ولا واحد. ولو القاعدة وقعت في النص، الـ handler بيرمي error، ويرد 500، و Paymob بتعيد بعدين. وده اللي احنا عايزينه: الدفعة متضيعش.

وليه المحاولات الفاشلة مبتغيّرش الحالة لـ FAILED؟ لأن المستخدم ممكن يجرّب كارت تاني في نفس صفحة الدفع وينجح. ولو الطلب بقى FAILED، النجاح اللي بعده ممكن يتعامل غلط. المحاولات الفاشلة بتتسجّل في لوج الـ webhooks بس.

والـ handler هنا سريع، transaction واحدة. أي شغل تقيل بعد الدفع (إيميل الإيصال، والـ analytics) يروح queue بعد الـ commit. وفيه طبقة أمان أخيرة: job كل ربع ساعة بيسأل Paymob عن الطلبات اللي فضلت PENDING أكتر من نص ساعة. لو الـ webhook ضاع، الـ job ده بيلحقه (reconciliation).

وفيه بديل تاني شفناه في مشروع حقيقي وكان كويس: trigger في القاعدة بيدّي الاشتراك لما حالة الطلب تبقى completed، بـ [[on conflict do update]]، والـ function بتاعته محدش يقدر يناديها من برّه.`,
            when: "كل webhook بيأثر على فلوس أو صلاحيات. ونفس الحراس التلاتة بتنطبق على Stripe و Tabby و Tamara، بس شكل التوقيع مختلف.",
            mistakes: R`في مشروع حقيقي، الـ webhook كان بيعدّي من غير تحقق لو الـ header مش موجود أو السر مش متظبط. وكان مكتوب في الكود إن ده «عشان منكسرش الـ setup الحالي». وكمان الـ HMAC كان بيتحسب على الـ body الخام، وبيدوّر عليه في الـ headers، مع إن Paymob بتبعته في الـ query على حقول معينة. يعني عمليًا مفيش أي webhook كان بيتحقق منه. وفي مشروع تاني، مكانش فيه شرط على الحالة، فـ webhook فشل وصل متأخر قلب طلب مدفوع لـ failed. وفي تالت كان منع التكرار «اقرا الحالة، وبعدين اكتب» في خطوتين. وغلطة تانية: إنك تعالج كل حاجة بتوصل، وPaymob بتبعت أنواع تانية زي [[TOKEN]] للكروت المحفوظة. اتأكد إن [[req.body.type]] بيساوي [[TRANSACTION]].`
          },
          lines: [
            "مسار الـ webhook. مفيش requireAuth، الحماية هي التوقيع.",
            "مش معاملة (زي TOKEN للكروت المحفوظة)؟ رد 200 ومتعملش حاجة.",
            "بيانات المعاملة.",
            "التوقيع غلط أو مش موجود؟ 401 ومفيش أي شغل.",
            "نجحت ومش معلّقة بس؟ فعّل الطلب اللي رقمه رجع في merchant_order_id.",
            "200 بعد ما الشغل اتحفظ. لو حصل error قبلها، البوابة هتعيد.",
            "قفلة.",
            "تفعيل الطلب، في الـ orders service عشان الـ job كمان يناديها.",
            "كله جوه transaction: الاتنين يحصلوا أو ولا واحد.",
            "هات الطلب.",
            "مش موجود أو المبلغ مختلف؟ سجّل وماتفعّلش.",
            "حوّله PAID بشرط إنه لسه مش PAID. قراية وكتابة في خطوة واحدة.",
            "0 يعني حد فعّله قبلنا. ده تكرار، اطلع.",
            "ادّي الاشتراك، وupsert عشان لو موجود ميقعش.",
            "قفلة الـ transaction.",
            "قفلة."
          ],
          sol: R`الـ Replay التلاتة كلهم بيرجعوا [[200]]، وفي القاعدة الطلب [[PAID]] و [[gatewayTxId]] فيه رقم المعاملة، وعدد الـ enrollments للطالب ده والكورس ده [[1]]. أول مرة [[updateMany]] رجّعت [[count: 1]]، والمرتين اللي بعدها [[count: 0]] فرجعت قبل الـ upsert.

الـ webhook الفاشل بعد النجاح برضه بيرجع 200، والطلب بيفضل [[PAID]]، لأن الـ route مبينادي [[markPaid]] غير لو [[success === true && pending === false]]. والـ hmac المتعدل بيرجع [[401]] من غير ما حاجة في القاعدة تتلمس.

لو لقيت enrollment مكرر، يبقى نسيت الشرط [[status: { not: "PAID" }]] أو معندكش [[@@unique([userId, courseId])]]. ولو الـ Replay رجع 500 مرة من المرات، ابص على اللوج: غالبًا [[P2002]] على [[gatewayTxId]]، وده معناه إن نفس المعاملة اتسجلت على طلب تاني.`,
          solCode: R`// تجربة من غير ngrok: ابعت webhook موقّع بإيدك
import crypto from "node:crypto";

const [orderId, success = "true"] = process.argv.slice(2);
const obj = { id: 9001, amount_cents: 50000, created_at: "2026-09-29T20:00:00", currency: "EGP", error_occured: false,
  has_parent_transaction: false, integration_id: 111, is_3d_secure: true, is_auth: false, is_capture: false,
  is_refunded: false, is_standalone_payment: true, is_voided: false, order: { id: 555, merchant_order_id: orderId },
  owner: 1, pending: false, source_data: { pan: "2346", sub_type: "MasterCard", type: "card" }, success: success === "true" };
const fields = ["amount_cents","created_at","currency","error_occured","has_parent_transaction","id","integration_id","is_3d_secure","is_auth","is_capture","is_refunded","is_standalone_payment","is_voided","order.id","owner","pending","source_data.pan","source_data.sub_type","source_data.type","success"];
const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
const hmac = crypto.createHmac("sha512", process.env.PAYMOB_HMAC_SECRET).update(fields.map((f) => String(get(obj, f))).join("")).digest("hex");
const r = await fetch("http://localhost:4000/webhooks/paymob?hmac=" + hmac, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "TRANSACTION", obj }),
});
console.log(r.status);

// node hook.mjs ORDER_ID true   (٣ مرات)
// node hook.mjs ORDER_ID false`
        },
        {
          cmd: "صفحة ما بعد الدفع",
          title: "الـ redirect مش دليل إن الفلوس وصلت",
          desc: R`بعد الدفع، Paymob بتحوّل المتصفح لـ [[/orders/:id]]، ومعاه query فيها [[success=true]] وحاجات تانية. أي حد يقدر يكتب الـ URL ده بإيده. عشان كده الصفحة مبتصدقش الـ query، بتسأل الـ API عن حالة الطلب، والحالة دي الـ webhook بس اللي بيغيّرها.

والـ webhook ممكن يوصل بعد الـ redirect بثواني، فالصفحة بتسأل كل ثانيتين لمدة دقيقة.`,
          example: R`"use client";
import { useEffect, useState } from "react";

export default function OrderResult({ orderId }) {
  const [status, setStatus] = useState("PENDING");
  useEffect(() => {
    const id = setInterval(async () => {
      const res = await apiFetch($__bt/orders/$__{orderId}$__bt);
      const s = res.ok ? (await res.json()).data.status : "PENDING";
      if (s !== "PENDING") { setStatus(s); clearInterval(id); }
    }, 2000);
    const stop = setTimeout(() => clearInterval(id), 60_000);
    return () => { clearInterval(id); clearTimeout(stop); };
  }, [orderId]);
  return status === "PAID" ? <a href="/me/courses">الدفع تم. ادخل على كورساتك</a> : <p>بنأكد الدفع مع البنك… لو اتأخر هيوصلك إيميل.</p>;
}`,
          try: R`افتح [[/orders/ID?success=true]] لطلب لسه PENDING، من غير ما تدفع. الصفحة لازم تفضل «بنأكد». بعدين ابعت الـ webhook من لوحة ngrok، وشوف الصفحة بتتغير لوحدها في خلال ثانيتين.`,
          flag: "script",
          deep: {
            why: "صفحة الرجوع هي أول مكان المطوّر بيفكر يفعّل فيه، لأنها «باينة»: المستخدم رجع و success=true. بس المستخدم ممكن يقفل الصفحة قبل ما ترجع، فالـ redirect ميحصلش أصلًا. وممكن كمان يكتب الـ URL بإيده. الـ webhook بيوصل من سيرفر لسيرفر، مهما المستخدم عمل.",
            how: R`الصفحة بتعمل polling: كل ثانيتين تسأل [[GET /orders/:id]]، واللي بيتأكد إن الطلب ده بتاع المستخدم (درس الملكية). أول ما الحالة تتغير بتوقف. وبعد دقيقة بتوقف برضه، وتقول للمستخدم إن الإيميل هيوصله. الـ cleanup في الـ return بيوقف الـ interval لو المستخدم خرج من الصفحة.

الـ query بتاعة الـ redirect ممكن تتستخدم للعرض «السلبي» بس. لو [[success=false]]، اعرض على طول «الدفع مكملش» وزرار «جرّب تاني». الغلط هنا نتيجته زرار زيادة، مش كورس ببلاش. وفي المقابل، النجاح لازم ييجي من الـ API.

وبدل الـ polling ممكن تستخدم socket.io: الـ webhook بعد التفعيل يبعت event للمستخدم. بس الـ polling أبسط، وبيشتغل حتى لو الـ socket مقطوع، ولدقيقة واحدة تمنه تافه. والـ polling والـ state في React في تاب «React».

وفيه حاجة لازم متنساهاش: الإيميل. لو المستخدم قفل الصفحة، إيميل «الكورس اتفعّل» هو اللي بيطمنه. وده بيتبعت من الـ queue بعد الـ webhook.`,
            when: "أي تكامل فيه redirect بعد عملية بتحصل عند طرف تاني: دفع، أو OAuth، أو توقيع مستندات.",
            mistakes: R`في مشروع حقيقي، endpoint التحقق من الدفع كان بيرجّع SUCCESS لطلب لسه PENDING، لمجرد إن المستخدم وصل صفحة الرجوع. وكان مكتوب في الكود «غالبًا نجح بما إن Paymob رجّعته هنا». أي حد يفتح الرابط ده يشوف «تم الدفع». ومن الغلطات كمان: polling من غير حد أقصى، فالصفحة المفتوحة تفضل تضرب الـ API طول اليوم. أو تنسى تعمل cleanup للـ interval، فيفضل شغال بعد ما المستخدم يخرج من الصفحة.`
          },
          lines: [
            "component بيشتغل في المتصفح (hooks).",
            "الـ hooks اللي هنستخدمها.",
            "الصفحة بتاخد رقم الطلب.",
            "الحالة بتبدأ PENDING.",
            "لما الصفحة تفتح...",
            "...كل ثانيتين...",
            "...اسأل الـ API عن الطلب...",
            "...وخد الحالة. لو فيه خطأ، اعتبرها لسه PENDING.",
            "لو اتغيرت، اعرضها ووقّف السؤال.",
            "قفلة الـ interval.",
            "بعد دقيقة وقّف في كل الأحوال.",
            "لما يخرج من الصفحة، وقّف الاتنين.",
            "قفلة الـ effect.",
            "مدفوع؟ لينك للكورسات. غير كده رسالة انتظار.",
            "قفلة."
          ],
          sol: R`وانت فاتح [[/orders/ID?success=true]] لطلب PENDING، الصفحة بتفضل «بنأكد الدفع مع البنك…»، وفي Network هتلاقي [[GET /orders/ID]] كل ثانيتين وكلهم راجعين [[{"data":{"status":"PENDING",...}}]]. الـ [[success=true]] في الـ URL ملهاش أي تأثير، وده المطلوب: أي حد يقدر يكتبها بإيده.

أول ما تبعت الـ webhook، أول polling بعده يرجع [[PAID]]، والصفحة تتحول للينك «الدفع تم» في خلال ثانيتين، والطلبات تقف. ولو استنيت أكتر من دقيقة من غير webhook، الـ polling بيقف لوحده والصفحة بتفضل على الرسالة، وده المقصود (الإيميل هو اللي هيبلّغه).

لو الصفحة قالت «تم» من غير webhook، يبقى انت بتقرا [[searchParams.success]] في مكان ما. ولو الطلبات مبتقفش بعد PAID، يبقى الـ [[clearInterval]] مش شغال. ولو رجعت 401 كل مرة، يبقى [[apiFetch]] مش بيبعت التوكن، والصفحة هتفضل PENDING للأبد.`
        },
        {
          cmd: "اشتراكات Stripe",
          title: "اشتراك شهري بـ Stripe Billing: الخطط والتجربة والتجديد والفشل",
          desc: R`دفع الكورس مرة واحدة اتعمل بـ Paymob في الدروس اللي فاتت. الاشتراك الشهري (خطة Pro للأكاديمية مثلًا) مختلف: التجديد كل شهر، والكارت ممكن يفشل في شهر، والعميل يرقّي أو ينزّل الخطة في النص. Stripe Billing بيدير ده كله: Product و Price شهري في الـ dashboard، و Checkout بـ [[mode: "subscription"]] للاشتراك، و Customer Portal لتغيير الكارت والخطة والإلغاء.

الـ webhook هو مصدر الحقيقة زي Paymob: جدول [[subscriptions]] عندك بيتحدث من الأحداث، والصلاحيات بتتقري منه. Stripe مش متاح كحساب تاجر لكل الدول (راجع قايمة الدول المدعومة)، فلو شغلك في مصر غالبًا هتستخدم Paymob أو شركة ليها كيان برّه.`,
          example: R`router.post("/billing/checkout", tenantScope, requireTenantRole("OWNER"), async (req, res) => {
  const { plan } = z.object({ plan: z.enum(["pro_monthly", "pro_yearly"]) }).parse(req.body);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: req.tenant.stripeCustomerId,
    line_items: [{ price: config.PRICES[plan], quantity: 1 }],
    subscription_data: { trial_period_days: 14, metadata: { tenantId: req.tenant.id } },
    success_url: $__bt$__{config.WEB_ORIGIN}/billing?done=1$__bt,
    cancel_url: $__bt$__{config.WEB_ORIGIN}/billing$__bt,
  });
  res.json({ data: { url: session.url } });
});
router.post("/billing/portal", tenantScope, requireTenantRole("OWNER"), async (req, res) => {
  const portal = await stripe.billingPortal.sessions.create({ customer: req.tenant.stripeCustomerId, return_url: $__bt$__{config.WEB_ORIGIN}/billing$__bt });
  res.json({ data: { url: portal.url } });
});
app.post("/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
  let event;
  try { event = stripe.webhooks.constructEvent(req.body, req.get("stripe-signature"), config.STRIPE_WEBHOOK_SECRET); } catch { return res.status(400).send("bad signature"); }
  if (event.type.startsWith("customer.subscription.")) {
    const sub = event.data.object;
    const item = sub.items.data[0];
    await db.subscription.upsert({
      where: { stripeSubscriptionId: sub.id },
      create: { tenantId: sub.metadata.tenantId, stripeSubscriptionId: sub.id, status: sub.status, priceId: item.price.id, currentPeriodEnd: new Date(item.current_period_end * 1000), cancelAtPeriodEnd: sub.cancel_at_period_end },
      update: { status: sub.status, priceId: item.price.id, currentPeriodEnd: new Date(item.current_period_end * 1000), cancelAtPeriodEnd: sub.cancel_at_period_end },
    });
  }
  if (event.type === "invoice.payment_failed") await emailQueue.add("payment-failed", { invoiceId: event.data.object.id });
  res.json({ received: true });
});`,
          try: R`اعمل حساب Stripe في test mode، و Product بـ Price شهري وسنوي. ثبّت Stripe CLI واعمل [[stripe listen --forward-to localhost:4000/webhooks/stripe]]، واشترك بالكارت [[4242 4242 4242 4242]]. بعدين من الـ Portal غيّر الخطة من شهري لسنوي، وبعدين الغي. وبعدين جرّب [[stripe trigger invoice.payment_failed]]. بعد كل خطوة بص على جدول subscriptions.`,
          flag: "script",
          deep: {
            why: "الاشتراكات فيها حالات أكتر بكتير من الدفع مرة واحدة: تجربة بتخلص، وتجديد بيفشل، وإعادة محاولات، وترقية في نص الشهر، وإلغاء في آخر الفترة. لو بنيت ده بنفسك فوق دفع عادي، هتقضي شهور في حالات حدية. Stripe Billing بيعمله، ودورك إنك تعكس الحالة عندك صح وتفتح وتقفل الميزات على أساسها.",
            how: R`[[status]] بتاع الاشتراك هو اللي بيقرر: [[trialing]] و [[active]] يعني الميزات مفتوحة. و [[past_due]] يعني التجديد فشل و Stripe بيحاول تاني (سيب الميزات مفتوحة فترة سماح وبان banner «حدّث الكارت»). و [[canceled]] و [[unpaid]] يعني اقفل. و [[incomplete]] أول دفعة لسه مكملتش. و [[cancelAtPeriodEnd]] معناها المستخدم لغى بس الفترة المدفوعة لسه شغالة.

التجربة: [[trial_period_days: 14]]، والكارت بيتطلب في الـ Checkout افتراضيًا، فبعد ١٤ يوم بيتحاسب لوحده. وحدث [[customer.subscription.trial_will_end]] بييجي قبلها بـ ٣ أيام، وده وقت إيميل «تجربتك هتخلص».

الـ proration: لما العميل يرقّي من شهري لسنوي أو من Basic لـ Pro في نص الفترة، Stripe بيحسب الفرق للأيام الباقية ويحطه في الفاتورة الجاية (أو يحاسب فورًا حسب الإعداد). من الـ Portal ده بيحصل لوحده. ومن الكود: [[stripe.subscriptions.update(id, { items: [{ id: itemId, price: newPrice }], proration_behavior: "create_prorations" })]].

الـ dunning: لما التجديد يفشل، Stripe بيعمل Smart Retries على كذا يوم، وبيبعت إيميلات للعميل لو فعّلتها من الـ dashboard، وفي الآخر بيلغي أو بيسيبه unpaid حسب إعداداتك. وانت بتاخد [[invoice.payment_failed]] مع كل محاولة، وتبعت إيميلك أو تحط banner.

الـ webhook: [[express.raw]] لازم لأن التوقيع محسوب على الـ body زي ما وصل حرف بحرف، ولازم يتسجّل قبل [[express.json()]] العام أو يبقى route لوحده. و [[constructEvent]] بترمي لو التوقيع غلط أو قديم (أكتر من ٥ دقايق افتراضيًا)، فبنرجّع 400. وبنستخدم أحداث [[customer.subscription.*]] (created و updated و deleted) عشان نعكس الحالة كلها بـ upsert، فالترتيب والتكرار ميبوظوش حاجة. وللدقة الأعلى، ممكن تتجاهل الـ object اللي في الحدث وتجيب الاشتراك من Stripe بـ [[subscriptions.retrieve]]، فتاخد آخر حالة دايمًا.

[[current_period_end]] بقى على مستوى الـ subscription item (أول عنصر في [[items.data]]) من API سنة 2025، مش على الاشتراك نفسه. لو بتقرا كود قديم أو tutorial قديم، دي أول حاجة هتلاقيها مختلفة.

الـ customer: اعمل Stripe customer لكل tenant مرة واحدة ([[stripe.customers.create]]) وخزن الـ id. ولو الاشتراك للشخص مش للـ workspace، يبقى لكل user.`,
            when: "منتج بخطط شهرية أو سنوية لعملاء برّه مصر أو شركة ليها كيان في دولة مدعومة. ولو السوق مصر بس، الاشتراكات بتتعمل بـ Paymob (فيه subscriptions) أو بفواتير شهرية بتتدفع كل مرة.",
            mistakes: R`تفتح الميزات من صفحة [[success_url]] بدل الـ webhook. أو [[express.json]] قبل الـ webhook فالتوقيع يفشل دايمًا. أو تقفل الميزات أول ما [[past_due]] تيجي والعميل لسه Stripe بيحاول. أو تنسى [[cancel_at_period_end]] فتقفل على واحد لسه دافع للشهر. أو تحط السعر من الواجهة بدل price id من config. أو تسيب الـ webhook من غير تسجيل الـ event id، فتتلخبط لو حصل مشكلة. وفي الانترفيو: «الـ webhook وصل قبل ما الـ redirect يرجع، أو العكس؟» الواجهة تعرض «جاري التفعيل» وتسأل السيرفر، نفس «صفحة ما بعد الدفع».`
          },
          lines: [
            "بدء الاشتراك: الـ OWNER بس، جوه الـ workspace.",
            "الخطة من قايمة ثابتة، مش سعر من الواجهة.",
            "Checkout من Stripe:",
            "وضع الاشتراك.",
            "عميل Stripe بتاع الـ workspace.",
            "الـ price id من الإعدادات.",
            "تجربة ١٤ يوم، والـ tenant في الـ metadata عشان الـ webhook يعرف ده لمين.",
            "يرجع هنا بعد الدفع...",
            "...أو لو لغى.",
            "قفلة.",
            "الواجهة تعمل redirect للـ URL ده.",
            "قفلة.",
            "Customer Portal: تغيير الكارت والخطة والإلغاء والفواتير.",
            "session قصيرة للبوابة بتاعة العميل ده.",
            "رجّع الـ URL.",
            "قفلة.",
            "الـ webhook: الـ body خام عشان التوقيع.",
            "الحدث.",
            "اتحقق من التوقيع. لو غلط أو قديم، 400 ومتكملش.",
            "أي تغيير في الاشتراك (إنشاء، أو تحديث، أو إلغاء):",
            "الاشتراك من الحدث.",
            "أول item (الخطة).",
            "اعكس الحالة عندك:",
            "بالـ id بتاع Stripe.",
            "لو جديد: الـ tenant، والحالة، والخطة، ونهاية الفترة، والإلغاء في الآخر.",
            "لو موجود: حدّث نفس الحقول.",
            "قفلة.",
            "قفلة.",
            "تجديد فشل؟ ابعت إيميل «حدّث الكارت».",
            "رد سريع إن الحدث اتستلم.",
            "قفلة."
          ],
          sol: R`بعد الاشتراك: صف في subscriptions بـ [[status: "trialing"]] و [[currentPeriodEnd]] بعد ١٤ يوم. بعد التغيير لسنوي من الـ Portal: نفس الصف بـ [[priceId]] الجديد، و Stripe عامل proration في الفاتورة الجاية. بعد الإلغاء من الـ Portal (الافتراضي في آخر الفترة): [[cancelAtPeriodEnd: true]] والحالة لسه trialing أو active، وبعد ما الفترة تخلص بييجي [[customer.subscription.deleted]] والحالة [[canceled]].

[[stripe trigger invoice.payment_failed]] بيعمل عميل واشتراك تجريبيين من عنده، فهتلاقي إيميل payment-failed في الـ queue. وممكن الـ upsert يرمي لأن [[metadata.tenantId]] فاضي في الاشتراك التجريبي: ده متوقع، واتعامل معاه (تجاهل الاشتراكات من غير tenant، وسجّلها في اللوج).

لو كل الـ webhooks بترجع 400: غالبًا [[express.json()]] اشتغل قبل [[express.raw]]، أو بتستخدم secret الـ dashboard بدل اللي [[stripe listen]] طبعه ([[whsec_...]]).`
        }
      ]
    },
    {
      t: "الملفات والـ realtime والإشعارات",
      l: 2,
      n: "الملفات مبتعدّيش على سيرفرك، والمستخدم يعرف اللي حصل لحظتها أو على إيميله أو موبايله",
      items: [
        {
          cmd: "signed upload URL",
          title: "رفع الملفات من غير ما تعدّي على سيرفرك",
          desc: R`الرفع على ٣ خطوات. الأول، الواجهة بتسأل السيرفر «عايز أرفع صورة نوعها كذا وحجمها كذا»، والسيرفر يتأكد من الصلاحية والنوع والحجم، ويرجّع رابط موقّع (presigned URL) عمره ٥ دقايق. التاني، المتصفح بيرفع الملف مباشرة على S3 أو R2 بـ PUT. التالت، الواجهة بتبلّغ السيرفر بالـ key، والسيرفر يربطه بالكورس.

الملف نفسه عمره ما بيعدّي على الـ API.`,
          example: R`import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: config.S3_REGION, requestChecksumCalculation: "WHEN_REQUIRED" });
const Upload = z.object({ type: z.enum(["image/jpeg", "image/png", "image/webp"]), size: z.number().int().max(5_000_000) });

router.post("/uploads/cover", requireAuth, requireRole("INSTRUCTOR", "ADMIN"), async (req, res) => {
  const { type } = Upload.parse(req.body);
  const key = $__btcovers/$__{req.user.id}/$__{crypto.randomUUID()}.$__{type.split("/")[1]}$__bt;
  const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket: config.S3_BUCKET, Key: key, ContentType: type }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
  res.json({ data: { url, key } });
});`,
          try: R`اطلب رابط، وارفع عليه صورة من المتصفح: [[fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } })]]. بعدين جرّب ترفع بنفس الرابط بعد ٦ دقايق (هيرفض)، وبـ Content-Type مختلف عن اللي اتوقّع (هيرفض برضه). وقبل كل ده لازم تظبط CORS على الـ bucket.`,
          flag: "script",
          deep: {
            why: "لو الملف بيعدّي على Express، كل رفع بياكل رام وCPU وباندويث من السيرفر اللي بيرد على كل الناس. فيديو ٥٠٠ ميجا ممكن يخلي السيرفر يقع، أو يوصل لحد Nginx ([[client_max_body_size]]) أو الـ timeout.",
            how: R`الرابط الموقّع جواه توقيع بمفاتيحك على حاجات محددة: الـ bucket، والـ key، والـ method، والـ Content-Type، ومدة الصلاحية. أي تغيير في أي واحدة منهم، التوقيع بيبقى غلط وS3 بترفض. يعني انت بتدّي إذن لملف واحد، في مكان واحد، لمدة ٥ دقايق. بس الـ SDK مبيوقّعش الـ Content-Type افتراضيًا، عشان كده بنضيف [[signableHeaders]] في المثال.

الـ key بيتعمل على السيرفر: فولدر المستخدم، واسم عشوائي، والامتداد من النوع المسموح. متستخدمش اسم الملف الأصلي، عشان متتعرضش لـ path traversal أو لملف يكتب فوق ملف تاني.

بس خلي بالك: الـ presigned PUT مبيقفلش الحجم. الـ [[size]] اللي الواجهة بتبعته مجرد كلام. عشان تفرض حد حقيقي، إما تستخدم presigned POST ([[createPresignedPost]] من [[@aws-sdk/s3-presigned-post]]) بشرط [[content-length-range]]، أو تعمل [[HeadObject]] في خطوة التأكيد وتمسح الملف لو كبير. وفي خطوة التأكيد كمان، اتأكد إن الـ key بيبدأ بـ [[covers/<userId>/]]، عشان محدش يربط ملف حد تاني.

والـ bucket يبقى private افتراضيًا. القراية تبقى بروابط GET موقّعة قصيرة، أو من CDN. والصور العامة بس (زي أغلفة الكورسات) ممكن تبقى public.

وفي Supabase Storage، نفس الفكرة: [[createSignedUploadUrl(path)]] على السيرفر، وبعدين [[uploadToSignedUrl(path, token, file)]] من الواجهة. والرابط صالح ساعتين. والفيديو قصة لوحده: استخدم خدمة فيديو (Bunny Stream، أو Cloudflare Stream، أو Mux)، بتحوّله HLS وبتحميه بتوكنات. والملفات الكبيرة جدًا بتترفع multipart أو resumable. والملفات اللي اترفعت ومحدش ربطها بحاجة، امسحها بـ lifecycle rule بعد يوم.`,
            when: "أي رفع أكبر من صورة بروفايل صغيرة، وأي منتج فيه فيديو أو PDF.",
            mistakes: R`في مشروع حقيقي، الرفع كان بـ multer و [[memoryStorage]]، وحد أقصى ١٠٠ ميجا للصور و ٥٠٠ للـ PDF. يعني الملف كله بيتحمّل في الرام، وكام رفع مع بعض كفاية يوقّعوا السيرفر. وفي مشروع تاني، route رفع الأدمن مكانش فيه قايمة أنواع مسموحة، والـ bucket كان public. ملف HTML أو SVG هناك ممكن يشغّل JavaScript على الدومين بتاعك. ومن الغلطات كمان: إنك تصدّق الـ Content-Type أو الامتداد اللي جاي من الـ client. أو تسيب bucket public فيه ملفات مدفوعة.`
          },
          lines: [
            "عميل S3 وأمر رفع ملف.",
            "دالة بتعمل رابط موقّع لأي أمر.",
            "العميل بيقرا المفاتيح من البيئة (أو IAM role على السيرفر)، و WHEN_REQUIRED عشان الـ SDK ميحطش checksum لملف فاضي جوه الرابط الموقّع.",
            "مسموح ٣ أنواع صور بس، ولحد ٥ ميجا.",
            "مسار طلب الرابط، للمدرّب والأدمن بس.",
            "اتأكد من النوع والحجم.",
            "الـ key: فولدر المستخدم، واسم عشوائي، وامتداد من النوع. مش اسم الملف الأصلي.",
            "رابط PUT موقّع للـ key ده وبالنوع ده بس، عمره ٥ دقايق.",
            "رجّع الرابط والـ key. الـ key هيتبعت تاني في خطوة التأكيد.",
            "قفلة."
          ],
          sol: R`الرابط اللي بيرجع شكله كده: [[https://BUCKET.s3.REGION.amazonaws.com/covers/USER/UUID.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...&X-Amz-Expires=300&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Signature=...]]. [[X-Amz-Expires=300]] هي الـ ٥ دقايق، و [[SignedHeaders=content-type;host]] معناها إن الـ Content-Type داخل في التوقيع. الرفع الصح بيرجع [[200]] وجسم فاضي.

بعد ٦ دقايق S3 بيرجع [[403]] و XML فيه [[AccessDenied]] و [[Request has expired]]. وبـ Content-Type مختلف (مثلًا image/png على رابط اتعمل لـ webp) بيرجع [[403 SignatureDoesNotMatch]]. ولو شفت في الـ Console [[blocked by CORS policy]] قبل ما الطلب يوصل أصلًا، يبقى CORS الـ bucket مش متظبط: لازم [[AllowedOrigins]] فيه origin الموقع، و [[AllowedMethods]] فيه PUT، و [[AllowedHeaders]] فيه content-type.

لو الرفع الصح نفسه رجع [[SignatureDoesNotMatch]]، اتأكد إنك باعت نفس الـ type بالظبط اللي طلبت بيه الرابط، ومن غير headers زيادة. و [[requestChecksumCalculation: "WHEN_REQUIRED"]] موجودة عشان النسخ الجديدة من SDK متضيفش checksum الـ متصفح مش بيبعته.`,
          solCode: R`// في الواجهة
const file = input.files[0];
const res = await apiFetch("/uploads/cover", { method: "POST", body: JSON.stringify({ type: file.type, size: file.size }) });
const { data: { url, key } } = await res.json();
const put = await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
console.log(put.status, key); // 200

// CORS على الـ bucket (S3 أو R2)
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://myapp.com"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["content-type"],
    "MaxAgeSeconds": 3000
  }
]`
        },
        {
          cmd: "معالجة الصور",
          title: "صورة ١٢ ميجا من الموبايل لازم تصغر قبل ما تتعرض",
          desc: R`الصورة اللي المدرّب بيرفعها من موبايله ممكن تبقى ٤٠٠٠ بكسل و ١٢ ميجا. بعد الرفع، job في الخلفية بيقراها، ويتأكد إنها صورة فعلًا، ويعمل منها مقاسين بصيغة WebP، ويعلّم على الكورس إن الغلاف جاهز. والصفحة بتعرض المقاس المناسب للشاشة.`,
          example: R`import sharp from "sharp";

export async function processCover({ key }) {
  const original = await storage.read(key);
  const meta = await sharp(original).metadata();
  if (!["jpeg", "png", "webp"].includes(meta.format)) throw new Error($__btnot an image: $__{key}$__bt);
  for (const width of [400, 1200]) {
    const out = await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    await storage.write(key.replace(/\.\w+$/, $__bt-$__{width}.webp$__bt), out, "image/webp");
  }
  await db.course.updateMany({ where: { coverKey: key }, data: { coverReady: true } });
}`,
          try: R`صوّر صورة بموبايلك بالطول، وشغّل الدالة عليها مرة بـ [[.rotate()]] ومرة من غيرها. قارن الاتنين، وقارن حجم الأصل بحجم نسخة الـ 400.`,
          flag: "script",
          deep: {
            why: "صورة ١٢ ميجا في صفحة الكورسات معناها تحميل بطيء على الموبايل، و LCP وحش، وباندويث بتدفع تمنها. وكمان الصورة من الموبايل ممكن يبقى فيها مكان التصوير (GPS) في الـ EXIF، وده بيكشف بيت المدرّب.",
            how: R`sharp مبني على libvips، وده سريع وموفّر في الرام. [[metadata()]] بيقرا الـ header بتاع الملف، وده بيكشف ملف عامل نفسه صورة بامتداد مزيف.

[[rotate()]] من غير أرقام بيلف الصورة حسب الـ EXIF، لأن الموبايل بيصوّر بالعرض ويكتب «لفّها» في الـ metadata. والناتج من sharp بيطلع من غير الـ metadata دي افتراضيًا، فالـ GPS بيروح. و [[withoutEnlargement]] بيمنع إنه يكبّر صورة صغيرة فتبوظ.

ومقاسين كفاية لأغلب الحالات: 400 للكروت، و 1200 لصفحة الكورس. والواجهة بتختار بـ [[srcset]] أو [[sizes]]، أو بتسيب next/image يعمل ده.

ده job مش جوه الـ request. المعالجة بتاخد ثانية أو اتنين وبتاكل CPU، والـ worker ممكن يشتغل على سيرفر لوحده. ولو فشل بيتعاد (درس «background jobs» في القسم الجاي). ولحد ما يخلص، الواجهة بتعرض placeholder بسبب [[coverReady: false]].

وsharp عنده حد افتراضي لعدد البكسلات ([[limitInputPixels]])، بيحميك من صورة صغيرة في الحجم لكنها لما تتفك تبقى مليارات البكسلات (decompression bomb).

وبديل الشغل ده كله: خدمة صور زي Cloudflare Images أو imgproxy، أو next/image على سيرفرك. التفاصيل في درس الـ CDN في المستوى التالت.`,
            when: "أي صور جاية من المستخدمين: أغلفة، وصور بروفايل، وإيصالات تحويل.",
            mistakes: "إنك تعرض الأصل زي ما هو. أو تعالج جوه الـ request فالرفع ياخد ١٠ ثواني. أو تنسى rotate فتطلع الصور مقلوبة. أو تسيب الـ EXIF بالـ GPS. أو تثق في الامتداد بدل ما تقرا الـ header."
          },
          lines: [
            "sharp: مكتبة الصور الأسرع في Node.",
            "job بياخد الـ key بتاع الملف اللي اترفع.",
            "اقرا الملف من الـ storage.",
            "اقرا الـ header بتاع الصورة الحقيقي.",
            "مش صورة فعلًا؟ ارمي error، والـ job يتسجّل فاشل.",
            "لكل مقاس من الاتنين...",
            "...لف حسب الـ EXIF، وصغّر من غير تكبير، وحوّل WebP بجودة 80.",
            "...واحفظه جنب الأصل باسم فيه المقاس.",
            "قفلة الـ loop.",
            "علّم إن الغلاف جاهز، عشان الواجهة تعرضه بدل الـ placeholder.",
            "قفلة."
          ],
          sol: R`صورة الموبايل بالطول غالبًا متخزنة بالعرض وجواها EXIF بيقول «لفّها 90 درجة» ([[orientation: 6]]). جربناها على صورة 4000×3000 عليها orientation 6: مع [[.rotate()]] نسخة الـ 400 طلعت [[400 x 533]] (بالطول، صح)، ومن غيرها طلعت [[400 x 300]] (نايمة على جنبها). ده لأن [[.rotate()]] من غير رقم بيلف حسب الـ EXIF، والـ webp الناتج مفيهوش EXIF أصلًا، فمفيش حد تاني هيلفها.

الحجم: الأصل من موبايل حديث بيبقى من ٣ لـ ١٢ ميجا، ونسخة الـ 400 webp بـ quality 80 بتبقى عشرات الكيلو بس (الرقم بيختلف حسب الصورة). يعني تقريبًا ١٠٠ مرة أصغر، وده الفرق بين صفحة كورسات بتحمّل في ثانية وصفحة بتحمّل في ٣٠.

لو النسختين طلعوا نفس الاتجاه، يبقى صورتك مفيهاش EXIF orientation (بعض التطبيقات بتلف البيكسلات نفسها قبل ما تحفظ). جرب صورة طالعة من الكاميرا مباشرة، أو اعمل واحدة بالسكربت اللي تحت.`,
          solCode: R`import sharp from "sharp";

// لو معندكش صورة فيها EXIF، اعمل واحدة: بيكسلات بالعرض و orientation 6
const photo = await sharp({ create: { width: 4000, height: 3000, channels: 3, background: "#4a7" } })
  .jpeg().withMetadata({ orientation: 6 }).toBuffer();

const m = await sharp(photo).metadata();
console.log("original", m.width, "x", m.height, "orientation", m.orientation, photo.length, "bytes");

for (const rotate of [true, false]) {
  let p = sharp(photo);
  if (rotate) p = p.rotate();
  const out = await p.resize({ width: 400, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  const o = await sharp(out).metadata();
  console.log(rotate ? "with rotate" : "no rotate", o.width, "x", o.height, out.length, "bytes");
}
// with rotate 400 x 533
// no rotate 400 x 300`
        },
        {
          cmd: "socket.io",
          title: "إشعار يوصل للمستخدم لحظة ما يحصل",
          desc: R`socket.io بيفتح اتصال دايم بين المتصفح والسيرفر، فالسيرفر يقدر يبعت من غير ما حد يسأله. الاتصال بيتأكد من التوكن أول ما يتفتح، وكل مستخدم بيدخل room باسمه، وأي service عايزة تبلّغه بتنادي [[notify(userId, ...)]].

في الواجهة: [[const socket = io(API_URL, { auth: { token } })]]، وبعدها [[socket.on("notification", show)]].`,
          example: R`import { Server } from "socket.io";

export const io = new Server(httpServer, { cors: { origin: config.WEB_ORIGIN, credentials: true } });
io.use((socket, next) => {
  try {
    const payload = jwt.verify(socket.handshake.auth.token, config.JWT_SECRET);
    socket.data.userId = payload.sub;
    next();
  } catch {
    next(new Error("UNAUTHENTICATED"));
  }
});
io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt));
export async function notify(userId, n) {
  const saved = await db.notification.create({ data: { userId, type: n.type, payload: n.payload } });
  io.to($__btuser:$__{userId}$__bt).emit("notification", saved);
}`,
          try: R`افتح الموقع في تابين بنفس المستخدم، وتاب تالت بمستخدم تاني. نادي [[notify]] للأول من endpoint تجربة. التابين بتوعه يوصلهم، والتالت لأ. بعدين جرّب تتصل بتوكن غلط من الـ Console، ولازم يرفض.`,
          flag: "script",
          deep: {
            why: "من غيره، الواجهة بتسأل كل شوية «فيه جديد؟» (polling)، وده آلاف الطلبات من غير فايدة، والإشعار بيتأخر لحد السؤال الجاي. الاتصال الدايم بيخلي السيرفر يبعت أول ما الحاجة تحصل.",
            how: R`[[io.use]] بيشتغل مرة واحدة لكل اتصال، قبل ما يتفتح. التوكن بيتبعت في [[auth]] مش في الـ query string، لأن الـ query بيتسجّل في لوجات Nginx. ولو التحقق فشل، الاتصال مبيتفتحش خالص. والـ [[userId]] جاي من التوكن اللي السيرفر اتحقق منه، مش من كلام الـ client.

الـ room باسم المستخدم بتخلي [[io.to("user:ID")]] توصل لكل أجهزته وتاباته مع بعض. وفي شات أو كورس، بتعمل rooms للمحادثة أو الكورس، بس لازم تتأكد من العضوية قبل ما تعمل join.

الإشعار بيتحفظ في القاعدة الأول، وبعدين يتبعت. لو المستخدم مش متصل، هيشوفه لما يفتح ([[GET /me/notifications]]). يعني الـ socket للسرعة بس، مش المصدر.

والتوكن بيخلص بعد ربع ساعة، بس الاتصال اللي اتفتح بيفضل مفتوح. لو ده مهم (زي logout)، اقفل الاتصالات بنفسك: [[io.in("user:ID").disconnectSockets()]].

ولو عندك أكتر من سيرفر، المستخدم ممكن يكون متصل بسيرفر والـ notify بيحصل على سيرفر تاني. الحل Redis adapter، ومعاه sticky sessions في الـ load balancer. ده في درس الـ scaling. والـ WebSocket ورا Nginx محتاج headers الـ Upgrade (تاب «Nginx»).

وفيه بدايل. SSE أبسط لو الكلام في اتجاه واحد (من السيرفر للمتصفح بس)، وشغال على HTTP عادي. و Supabase Realtime لو شغال على Supabase. أو خدمة مدفوعة زي Pusher أو Ably لو مش عايز تشغّل حاجة بنفسك.`,
            when: "إشعارات، وشات، وحالة طلب بتتغير، ولوحة أدمن بتتحدث لوحدها. ولو التحديث كل دقيقة كفاية، الـ polling أبسط.",
            mistakes: R`في مشروع حقيقي، سيرفر الـ socket مكانش فيه أي تحقق. الـ client بيبعت [[join]] بالـ userId بتاعه هو، و [[send-message]] ومعاها senderId و senderName. يعني أي حد يقدر يسمع إشعارات أي حد، ويبعت رسايل باسمه. وكمان محتوى الرسايل كان بيتطبع في اللوج. ومن الغلطات كمان: إنك تبعت قبل ما القاعدة تحفظ، فلو الـ transaction فشلت المستخدم يشوف إشعار لحاجة محصلتش.`
          },
          lines: [
            "سيرفر socket.io.",
            "ركّبه على نفس سيرفر HTTP، و CORS للواجهة بس.",
            "middleware بيشتغل قبل ما أي اتصال يتفتح.",
            "جرّب...",
            "...تتحقق من التوكن اللي في auth.",
            "خزّن id المستخدم على الاتصال. ده من التوكن، مش من كلام الـ client.",
            "اسمح بالاتصال.",
            "لو التحقق فشل...",
            "...ارفض الاتصال.",
            "قفلة.",
            "قفلة.",
            "كل اتصال جديد يدخل room المستخدم بتاعه.",
            "دالة بتناديها أي service.",
            "احفظ الإشعار الأول، عشان لو مش متصل يلاقيه بعدين.",
            "ابعته لكل أجهزة المستخدم المتصلة.",
            "قفلة."
          ],
          sol: R`التابين بتوع المستخدم الأول يوصلهم نفس الـ event في نفس اللحظة، بالشكل [[{"id":...,"userId":"u1","type":"order.paid","payload":{...}}]]، والتاب التالت مبيوصلوش حاجة. ده لأن كل socket بيدخل room اسمها [[user:ID]]، و [[io.to(room)]] بيبعت لكل الـ sockets اللي في الـ room، مهما كانوا كام تاب أو جهاز.

الاتصال بتوكن غلط بيطلّع [[connect_error]] ورسالته [[UNAUTHENTICATED]]، ومفيش [[connect]] خالص. وخلي بالك إن socket.io client بيحاول يتصل تاني لوحده بعد الـ connect_error في حالات كتير، فلو التوكن انتهى، حدّث [[socket.auth.token]] قبل [[socket.connect()]].

لو التالت وصله الإشعار، يبقى انت عامل [[io.emit]] بدل [[io.to(...)]]. ولو ولا تاب وصله، اتأكد إن الـ userId اللي بتبعته لـ notify هو نفس الـ [[sub]] اللي في التوكن (string مش number).`,
          solCode: R`// في Console تاب مفتوح (أو ملف client.mjs مع socket.io-client)
import { io } from "socket.io-client";

const good = io("http://localhost:4000", { auth: { token: ACCESS_TOKEN } });
good.on("connect", () => console.log("connected", good.id));
good.on("notification", (n) => console.log("got", n));

const bad = io("http://localhost:4000", { auth: { token: "abc.def.ghi" }, reconnection: false });
bad.on("connect_error", (e) => console.log("rejected:", e.message)); // rejected: UNAUTHENTICATED

// endpoint تجربة في السيرفر
router.post("/dev/notify/:userId", async (req, res) => {
  await notify(req.params.userId, { type: "test", payload: { at: Date.now() } });
  res.status(204).end();
});`
        },
        {
          cmd: "transactional email",
          title: "إيميلات النظام: تأكيد، واستعادة باسورد، وإيصال",
          desc: R`الإيميلات اللي النظام بيبعتها لوحده (استعادة باسورد، وإيصال دفع، وترحيب) بتتبعت من worker مش من الـ request. الـ route بيحط job في queue ويرد، والـ worker بيبعت عن طريق مزوّد زي Resend. ولو فشل، الـ queue بتعيده، بشرط تحدد [[attempts]] (ومعاه [[backoff]] عشان الإعادة تستنى شوية)، لأن الافتراضي في BullMQ محاولة واحدة من غير إعادة. حطهم مرة واحدة في [[defaultJobOptions]] على الـ Queue: [[new Queue("emails", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } })]]، عشان كل الإيميلات (زي reset) تتعاد.`,
          example: R`import { Resend } from "resend";
import { Worker } from "bullmq";

const resend = new Resend(config.RESEND_API_KEY);
const templates = { reset: resetEmail, receipt: receiptEmail, welcome: welcomeEmail };

new Worker("emails", async (job) => {
  const { subject, html } = templates[job.name](job.data);
  const { error } = await resend.emails.send(
    { from: "myapp <no-reply@example.com>", to: job.data.to, subject, html },
    { idempotencyKey: $__bt$__{job.name}/$__{job.id}$__bt },
  );
  if (error) throw new Error(error.message);
}, { connection });`,
          try: R`خلي مفتاح Resend غلط عن قصد، واطلب استعادة باسورد. الـ API لازم يرد عادي، والـ job يفشل ويتعاد أكتر من مرة (شوفه في Bull Board أو في اللوج). رجّع المفتاح الصح، والـ job يعدّي في المحاولة الجاية.`,
          flag: "script",
          deep: {
            why: "مزوّد الإيميل ممكن يبطأ أو يقع. لو الإرسال جوه الـ request، التسجيل كله يبقى بطيء، أو يفشل عشان الإيميل. ولو من غير retry، الإيميل اللي فشل بيروح خالص، والطالب مستني لينك مش هييجي.",
            how: R`الـ worker بيستلم الـ job باسمه ([[reset]] أو [[receipt]]) والداتا بتاعته، ويختار القالب. القالب دالة بترجّع subject و html بلغة المستخدم. خزّن [[locale]] للمستخدم في القاعدة عشان كده، وخلي الإيميل العربي فيه [[dir="rtl"]].

[[idempotencyKey]] بيتبعت كـ argument تاني. لو الإرسال نجح بس الرد اتأخر، والـ job اتعاد، Resend بتعرف إنه نفس الإيميل ومبتبعتوش تاني. والمفتاح ده صالح ٢٤ ساعة عندهم. والـ [[throw]] لو فيه error هو اللي بيخلي BullMQ يعيد.

و [[connection]] جاي من [[lib/redis.ts]]: [[new IORedis(config.REDIS_URL, { maxRetriesPerRequest: null })]]، والـ worker محتاج الإعداد ده.

وعشان الإيميل يوصل للـ inbox مش الـ spam، لازم تأكد الدومين عند المزوّد، وتضيف في الـ DNS سجلات SPF و DKIM اللي بيدّيهالك، وسجل DMARC. وابعت من subdomain زي [[mail.example.com]]، عشان سمعة الإرسال متأثرش على الدومين الأساسي. والإيميلات التسويقية تروح من stream أو subdomain تاني غير إيميلات النظام، عشان الـ spam في التسويق ميوقّعش إيصالات الدفع.

وفي staging، الإيميلات تروح sandbox أو قايمة إيميلات بتاعة الفريق بس. والقوالب ممكن تتكتب بـ React Email أو MJML.`,
            when: "أي إيميل بيطلع نتيجة لفعل المستخدم. والإيميلات التسويقية (newsletter) ليها أداة لوحدها وقواعد إلغاء اشتراك.",
            mistakes: R`إنك تبعت من جوه الـ request. أو تبعت من Gmail شخصي. أو تنسى SPF و DKIM فكل حاجة تروح spam. أو تعيد الإرسال من غير idempotency فالطالب يوصله ٣ إيصالات. وفي مشروع حقيقي، لو مفتاح الإيميل مش موجود، الكود كان بيطبع الإيميل كله في اللوج بدل ما يقع. ده مريح في التطوير، بس في الإنتاج معناه إن لينكات الاستعادة والـ OTP بتتكتب في اللوجات. الصح إن [[config.ts]] يرفض يقوم من غير المفتاح في الإنتاج.`
          },
          lines: [
            "SDK بتاع Resend.",
            "الـ Worker بتاع BullMQ.",
            "العميل بالمفتاح من الـ config.",
            "قالب لكل نوع إيميل. كل قالب دالة بترجّع subject و html.",
            "worker بيسمع على queue الإيميلات.",
            "اختار القالب باسم الـ job، واملاه بالداتا.",
            "ابعت...",
            "...من دومينك المتأكد، للمستخدم، بالقالب.",
            "...ومفتاح idempotency، عشان الإعادة متبعتش مرتين.",
            "قفلة الإرسال.",
            "فشل؟ ارمي error، و BullMQ هيعيد بعدين.",
            "اتصال Redis من lib/redis.ts."
          ],
          sol: R`بالمفتاح الغلط، [[POST /auth/forgot]] بيرجع 200 في ملّي ثواني عادي (جربناها: الـ API رد في حوالي 20ms)، لأنه بيحط job بس. في اللوج هتلاقي الـ job فشل: [[failed attempt 1 of 5]]، وبعدين 2، وهكذا، والوقت بينهم بيزيد (10 ثواني، 20، 40...). رسالة الخطأ هي رسالة Resend عن المفتاح (حاجة زي [[API key is invalid]])، لأن [[resend.emails.send]] مبترميش، بترجّع [[{ data: null, error }]]، وسطر [[if (error) throw]] هو اللي بيحوّلها فشل.

لو رجّعت المفتاح الصح قبل ما المحاولات تخلص، المحاولة الجاية تعدّي والإيميل يوصل مرة واحدة بس، لأن الـ [[idempotencyKey]] ثابت لنفس الـ job. ولو المحاولات خلصت، الـ job بيقعد في الـ failed، وتقدر تعيده من Bull Board.

لو الـ job فشل مرة واحدة ومتعادش، يبقى مفيش [[attempts]] (الافتراضي في BullMQ محاولة واحدة). ولو الـ API نفسه رجع 500، يبقى بتبعت الإيميل جوه الـ request. وفي BullMQ الجديد مكتبة ioredis بقت optional، فلو ظهرلك [[could not load the optional 'ioredis' package]]، سطّبها ([[npm i ioredis]]) واعمل [[connection]] من [[new IORedis(url, { maxRetriesPerRequest: null })]].`
        },
        {
          cmd: "web push",
          title: "إشعار على الموبايل والموقع مقفول",
          desc: R`الـ Web Push بيوصل إشعار للمستخدم حتى لو الموقع مقفول، طول ما المتصفح بيدعمه. المتصفح بيعمل subscription (عنوان وشوية مفاتيح) ويبعته للسيرفر يخزنه. ولما يحصل حاجة، السيرفر بيبعت على العنوان ده بمكتبة [[web-push]] ومفاتيح VAPID بتاعتك.

والـ subscription اللي بترجع 404 أو 410 معناها إن المستخدم لغى الإذن، أو مسح الموقع، وبتتمسح.`,
          example: R`import webpush from "web-push";

webpush.setVapidDetails("mailto:you@example.com", config.VAPID_PUBLIC_KEY, config.VAPID_PRIVATE_KEY);
router.post("/me/push-subscriptions", requireAuth, async (req, res) => {
  const sub = PushSub.parse(req.body);
  await db.pushSubscription.upsert({ where: { endpoint: sub.endpoint }, create: { userId: req.user.id, ...sub }, update: { userId: req.user.id } });
  res.status(204).end();
});
export async function pushTo(userId, payload) {
  for (const s of await db.pushSubscription.findMany({ where: { userId } })) {
    await webpush.sendNotification({ endpoint: s.endpoint, keys: s.keys }, JSON.stringify(payload))
      .catch((e) => [404, 410].includes(e.statusCode) && db.pushSubscription.delete({ where: { id: s.id } }));
  }
}`,
          try: R`اعمل مفاتيح بـ [[npx web-push generate-vapid-keys]]. في الواجهة سجّل service worker، واطلب الإذن من زرار، وابعت الـ subscription. نادي [[pushTo]] واقفل التاب، والإشعار لازم يوصل. بعدين الغي الإذن من إعدادات الموقع ونادي تاني، ولاحظ إن الصف اتمسح.`,
          flag: "script",
          deep: {
            why: "الإيميل بيتقري متأخر، والـ socket محتاج الموقع مفتوح. الـ push بيوصل على شاشة الموبايل: «الدرس الجديد نزل»، أو «الحصة كمان ساعة». وده بيفرق في رجوع المستخدمين.",
            how: R`مفاتيح VAPID بتتعمل مرة واحدة. الـ public key بيروح للواجهة، والـ private بيفضل على السيرفر. وفي الواجهة: [[registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })]] بيرجّع subscription، فيها endpoint (عنوان عند Google أو Mozilla أو Apple) ومفتاحين [[p256dh]] و [[auth]].

المكتبة بتشفّر الـ payload بالمفاتيح دي، وبتبعته للـ endpoint، وخدمة المتصفح هي اللي بتوصّله للجهاز. والـ service worker بيستقبله في event اسمه [[push]] ويعرضه بـ [[showNotification]]. والـ payload صغير (حوالي ٤ كيلو)، فابعت عنوان ورابط، مش الداتا كلها.

الإذن اطلبه من زرار واضح بعد ما المستخدم يفهم هيستفيد إيه. متطلبوش أول ما الصفحة تفتح، لأن لو رفض مش هتقدر تسأله تاني. وعلى iOS، الـ web push بيشتغل بس لو الموقع متضاف على الشاشة الرئيسية كـ PWA. وخلي في جدول تفضيلات: المستخدم يختار أنواع الإشعارات اللي عايزها.

وفي تطبيق موبايل حقيقي (Capacitor مثلًا)، الإشعارات بتبقى عن طريق FCM و APNs. نفس الفكرة: token للجهاز بيتخزن، وبيتمسح لما يرجع «مش متسجّل». التفاصيل في تاب «Desktop و Mobile».`,
            when: "تذكيرات بمواعيد، وتحديثات مهمة. ومش لكل حاجة، لأن الإزعاج بيخلي المستخدم يقفل الإذن خالص.",
            mistakes: R`إنك تطلب الإذن أول ما الصفحة تفتح. أو متمسحش الـ subscriptions الميتة، فالإرسال يبطأ مع الوقت. أو تحط بيانات حساسة في نص الإشعار، وهو بيظهر على شاشة القفل. ودي حاجة كانت معمولة صح في مشروعين حقيقيين: واحد بيمسح الـ subscriptions اللي بترجع 404 و 410، والتاني بيمسح توكنات FCM اللي بترجع «not registered».`
          },
          lines: [
            "مكتبة web-push.",
            "مفاتيح VAPID بتاعتك، وإيميل تواصل لخدمات الـ push.",
            "مسار تسجيل subscription للمستخدم الداخل.",
            "اتأكد من الشكل: endpoint ومفتاحين.",
            "خزّنها، ولو الـ endpoint موجود حدّث صاحبه (جهاز مشترك).",
            "رد 204.",
            "قفلة.",
            "ابعت لكل أجهزة المستخدم.",
            "لكل subscription عنده...",
            "...ابعت الـ payload متشفّر...",
            "...ولو رجع 404 أو 410، الـ subscription ماتت، امسحها.",
            "قفلة الـ loop.",
            "قفلة."
          ],
          sol: R`[[npx web-push generate-vapid-keys]] بيطبع [[Public Key:]] (حوالي 87 حرف base64url بيبدأ غالبًا بـ B) و [[Private Key:]] (43 حرف). العام بيروح للواجهة، والخاص في .env السيرفر بس.

بعد الإذن، الـ subscription اللي بتتبعت شكلها [[{"endpoint":"https://fcm.googleapis.com/fcm/send/...","expirationTime":null,"keys":{"p256dh":"...","auth":"..."}}]] (في Firefox الـ endpoint على mozilla.com). [[pushTo]] وانت قافل التاب لازم يطلّع إشعار من النظام، لأن الـ service worker بيصحى لوحده. ولو المتصفح نفسه مقفول خالص، الإشعار بيوصل أول ما يفتح (على الموبايل بيوصل عادي).

بعد ما تلغي الإذن، خدمة الـ push بترجع [[410 Gone]] (أو 404) للـ endpoint ده، والـ catch بيمسح الصف. ممكن تاخد شوية وقت قبل ما الخدمة تعرف. ولو مفيش إشعار خالص: اتأكد إن الـ SW عنده [[push]] listener بيعمل [[showNotification]] جوه [[event.waitUntil]]، وإن الصفحة على HTTPS أو localhost، وإن إشعارات النظام نفسها مش مقفولة للمتصفح.`,
          solCode: R`// public/sw.js
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title ?? "myapp", { body: data.body, data: { url: data.url ?? "/" } }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// زرار «فعّل الإشعارات» في الواجهة
async function enablePush() {
  const reg = await navigator.serviceWorker.register("/sw.js");
  if ((await Notification.requestPermission()) !== "granted") return;
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY });
  await apiFetch("/me/push-subscriptions", { method: "POST", body: JSON.stringify(sub) });
}

// السيرفر
const PushSub = z.object({
  endpoint: z.url(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});
// await pushTo(userId, { title: "كورس جديد", body: "SQL من الصفر", url: "/courses/sql" });`
        }
      ]
    },
    {
      t: "اللغات والأدمن والبحث والـ jobs",
      l: 2,
      n: "عربي وإنجليزي بجد، ولوحة تحكم متسجّل فيها كل حاجة، وقوايم كبيرة بسرعة، وشغل تقيل في الخلفية",
      items: [
        {
          cmd: "i18n و RTL",
          title: "عربي وإنجليزي من القاعدة للشاشة",
          desc: R`الترجمة مش ملفين JSON وخلاص. اللغة بتبدأ من الـ URL ([[/ar/courses]])، والسيرفر هو اللي بيحط [[lang]] و [[dir]] على [[<html>]] عشان الاتجاه ميترعشش وقت التحميل. والنصوص بتيجي من [[messages/ar.json]] و [[en.json]]، والـ CSS بيبقى logical ([[ms-4]] بدل [[ml-4]]). ومحتوى القاعدة نفسه (اسم الكورس ووصفه) بيتخزن باللغتين.

في Next.js 16 مع next-intl، الـ routing بيتعمل في [[proxy.ts]] بـ [[createMiddleware(routing)]]. التفاصيل في تاب «Next.js»، والـ CSS في تاب «HTML و CSS».`,
          example: R`import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}`,
          try: R`اعمل الـ layout ده، وحط في صفحة كارت فيه صورة على الشمال ونص وسهم. اكتبه مرة بـ [[ml-4]] و [[text-left]] وبص عليه بالعربي، وبعدين بـ [[ms-4]] و [[text-start]] و [[rtl:rotate-180]] للسهم. بعدين اعمل reload للصفحة العربي، ولاحظ إنها بتفتح RTL من أول frame.`,
          flag: "script",
          deep: {
            why: "المنتج العربي اللي معمول إنجليزي وبعدين «اتقلب» بيبان على طول: أسهم بالعكس، ومسافات في المكان الغلط، وأرقام مقلوبة، وصفحة بتترعش من LTR لـ RTL كل مرة تفتح. واللغة لو مش في الـ URL، جوجل مبيشوفش غير لغة واحدة.",
            how: R`الاتجاه من السيرفر: الـ layout بيطلع HTML فيه [[dir="rtl"]] جاهز، فالمتصفح بيرسم صح من أول مرة. لو بتحطه بـ JavaScript بعد التحميل، الصفحة بتظهر LTR لحظة وبعدين تتقلب.

الـ CSS الـ logical هو اللي بيخلي نفس الكلاسات تشتغل في الاتجاهين. [[ms-4]] يعني margin في بداية السطر، وده شمال في الإنجليزي ويمين في العربي. وبنفس الطريقة [[ps-]] و [[pe-]] و [[text-start]] و [[start-0]]. وفي Tailwind v4 فيه [[rtl:]] للحالات الخاصة زي لف الأسهم.

محتوى القاعدة: لو لغتين بس، عمودين ([[titleAr]] و [[titleEn]]) أبسط حاجة. لو لغات أكتر، عمود JSON أو جدول [[CourseTranslation]]. والـ API بيرجّع اللغة المطلوبة حسب [[?locale=]] أو [[Accept-Language]]. والأسعار والتواريخ بـ Intl: [[new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" })]]. وخد بالك إن [[ar-EG]] بيطلع أرقام عربية (١٢٣)، فقرر عايز أنهي.

الجمع في العربي فيه صيغ كتير (صفر، وواحد، واتنين، وقليل، وكتير). عشان كده متلزقش نصوص ببعض، استخدم رسايل ICU: [[t("courses", { count })]]، وفي الملف [[{count, plural, one {كورس واحد} two {كورسين} few {# كورسات} other {# كورس}}]].

والنص اللي بيكتبه المستخدم ممكن يبقى أي لغة، فاستخدم [[dir="auto"]] عليه. والأرقام والإيميلات جوه نص عربي حطها في [[<bdi>]] أو [[dir="ltr"]]. والإيميلات وأكواد الأخطاء كمان بتتترجم حسب [[user.locale]].`,
            when: "من أول يوم لو المنتج هيبقى بلغتين. إضافة RTL لمشروع فيه ٢٠٠ component مكتوبين بـ ml و mr بتاخد أسابيع.",
            mistakes: R`في مشروع حقيقي، الاتجاه كان بيتحط بـ [[document.documentElement.dir]] من جوه الـ App بعد التحميل، فالصفحة بتترعش. وكان فيه حوالي ٤٣٠ كلاس physical ([[pl-]] و [[mr-]]) قصاد ١١ logical، ومعاهم CSS بـ [[[dir="rtl"]]] بيحاول يصلّح. وفي مشروع تاني حاجة كانت معمولة صح: اختبار في CI بيفشل لو فيه مفتاح في ar.json مش موجود في en.json، أو العكس. اعمله.`
          },
          lines: [
            "الـ provider بتاع next-intl، ودالة بتتأكد إن اللغة مدعومة.",
            "صفحة 404.",
            "اللغات المتاحة واللغة الافتراضية، من routing.ts.",
            "الـ layout اللي في [[app/[locale]/layout.tsx]].",
            "في Next 15 و 16 الـ params بقت Promise، فلازم await.",
            "لغة مش مدعومة؟ 404.",
            "رجّع...",
            "...اللغة والاتجاه على html من السيرفر، فالصفحة بتفتح بالاتجاه الصح من أول لحظة.",
            "الـ body.",
            "الـ provider بيوصّل الرسايل للـ client components.",
            "قفلة body.",
            "قفلة html.",
            "قفلة الـ return.",
            "قفلة."
          ],
          sol: R`بـ [[ml-4]] و [[text-left]] الكارت بالعربي بيبوظ: المسافة بتفضل على الشمال بتاع النص بدل ما تبقى بينه وبين الصورة، والنص لازق في الشمال مع إن الصفحة RTL، والسهم بيشاور للناحية الغلط. بـ [[ms-4]] (margin-inline-start) و [[text-start]] كل حاجة بتتقلب لوحدها مع [[dir]]، والسهم بيلف بـ [[rtl:rotate-180]]. والإنجليزي بيفضل زي ما هو في الحالتين.

الـ reload بيفتح RTL من أول frame لأن [[dir="rtl"]] جوه الـ HTML اللي جاي من السيرفر، مش بيتحط بـ JavaScript بعد التحميل. اتأكد بـ [[curl -s localhost:3000/ar | head -c 300]]: هتلاقي [[<html lang="ar" dir="rtl">]] في أول الرد.

لو شفت الصفحة بتتقلب من LTR لـ RTL بعد ثانية، يبقى انت بتحط الـ dir في [[useEffect]] أو في client component. ولو لغة مش مدعومة فتحت صفحة بدل 404، يبقى [[hasLocale]] مش متنادي في الـ layout.`,
          solCode: R`import { useTranslations } from "next-intl";

export function CourseCard({ course }) {
  const t = useTranslations("courses");
  return (
    <a href={"/courses/" + course.slug} className="flex items-center rounded-lg border p-3">
      <img src={course.coverUrl} alt="" className="h-16 w-16 rounded object-cover" />
      <div className="ms-4 flex-1 text-start">
        <h3 className="font-bold">{course.title}</h3>
        <p className="text-sm text-gray-500">{t("lessons", { count: course.lessonsCount })}</p>
      </div>
      <span aria-hidden className="rtl:rotate-180">→</span>
    </a>
  );
}`
        },
        {
          cmd: "لوحة الأدمن",
          title: "لوحة تحكم آمنة، وكل حاجة فيها متسجّلة",
          desc: R`لوحة الأدمن هي أقوى باب في النظام، فبتتحمى على مستوى الـ router كله مرة واحدة، مش route بـ route. وكل فعل مهم فيها (استرداد، أو تغيير دور، أو مسح) بيتسجّل في audit log: مين عمل إيه، وإمتى، وليه.

والمثال استرداد طلب: البوابة، وبعدين تحديث الطلب، وشيل الاشتراك، وتسجيل الفعل، والتلاتة الأخيرين في transaction واحدة.`,
          example: R`const admin = express.Router();
admin.use(requireAuth, requireFreshRole("ADMIN"));
admin.post("/orders/:id/refund", async (req, res) => {
  const { reason } = Refund.parse(req.body);
  const order = await db.order.findUniqueOrThrow({ where: { id: req.params.id } });
  if (order.status !== "PAID") throw new AppError(409, "NOT_PAID", "الطلب ده مش مدفوع");
  await paymob.refund(order.gatewayTxId, order.amountCents);
  await db.$transaction([
    db.order.update({ where: { id: order.id }, data: { status: "REFUNDED" } }),
    db.enrollment.delete({ where: { userId_courseId: { userId: order.userId, courseId: order.courseId } } }),
    db.auditLog.create({ data: { actorId: req.user.id, action: "order.refund", targetId: order.id, meta: { reason } } }),
  ]);
  res.status(204).end();
});
app.use("/admin", admin);`,
          try: R`اعمل صفحة في اللوحة بتعرض آخر ٥٠ سطر من الـ audit log: مين، وعمل إيه، وعلى إيه، وإمتى. اعمل استرداد تجربة وشوفه ظهر. بعدين شيل دور الأدمن من مستخدم وهو داخل، وجرّب طلب تاني منه، ولازم يترفض فورًا.`,
          flag: "script",
          deep: {
            why: "أي حد يوصل لحساب أدمن يقدر يعمل أي حاجة. ولما فلوس تتحرك أو داتا تتمسح، أول سؤال بيبقى «مين عمل كده؟». من غير audit log، مفيش إجابة.",
            how: R`[[admin.use]] على الـ router بيخلي كل route تحته محمي، فمفيش route هيتنسي. و [[requireFreshRole]] بتقرا الدور من القاعدة مع كل طلب بدل ما تثق في التوكن. طلب زيادة للقاعدة، بس أدمن اتشالت صلاحيته بيتقفل فورًا مش بعد ربع ساعة. وفي مشروع حقيقي كان فيه guard بيعمل كده بالظبط، وبيتأكد كمان إن الحساب لسه active.

[[findUniqueOrThrow]] بترمي P2025 لو مش موجود، والـ error handler بيحوّلها 404. والاسترداد عند البوابة بيحصل الأول، لأن لو فشل مفيش حاجة تتغير عندنا. ولهذا كنا بنخزن [[gatewayTxId]]: البوابة محتاجاه عشان تعمل الاسترداد.

الـ audit log جدول بتضيف فيه بس، محدش بيعدّل أو يمسح منه. فيه: الفاعل، والفعل، والهدف، وتفاصيل (JSON)، والـ IP، والوقت. ويتعرض في اللوحة نفسها.

ولوحة الأدمن محتاجة حماية زيادة عن باقي الموقع: 2FA (TOTP) لحسابات الأدمن، وسبب إجباري للأفعال الخطيرة، وتأكيد قبل المسح. ولو تقدر، subdomain لوحده زي [[admin.example.com]]، وممكن تقفله على IPs معينة. وأي ميزة «ادخل كأنك المستخدم ده» (impersonation) لازم تتسجّل.

الواجهة ممكن تتبني بجداول جاهزة (TanStack Table مع shadcn). وفي الـ MVP، صفحتين بسيطين للكورسات والطلبات كفاية.`,
            when: "من الـ MVP. الأدمن محتاج يشوف الطلبات ويحل مشاكل الدفع من أول يوم.",
            mistakes: R`في مشروع حقيقي، الدخول للوحة كان بباسورد أدمن واحد مشترك في متغير بيئة. ونفس الباسورد ده كان المفتاح اللي بيوقّع توكنات الأدمن. يعني مفيش logout حقيقي، ومفيش طريقة تعرف مين من الفريق عمل إيه، ولو الباسورد اتغير كل التوكنات بتبوظ مع بعض. الصح إن كل أدمن يبقى ليه حساب، والسر يبقى حاجة منفصلة. ومن الغلطات كمان: جداول الأدمن من غير pagination، وفي مشروع كان فيه [[take: 200]] من غير صفحات، فالمستخدم رقم ٢٠١ مكانش بيظهر خالص ومحدش واخد باله.`
          },
          lines: [
            "router للأدمن لوحده.",
            "حماية على الـ router كله: داخل، ودوره أدمن من القاعدة دلوقتي مش من التوكن.",
            "استرداد طلب.",
            "السبب إجباري.",
            "هات الطلب، ولو مش موجود 404.",
            "لازم يكون مدفوع أصلًا.",
            "الاسترداد عند البوابة الأول. لو فشل، ولا حاجة عندنا بتتغير.",
            "التلاتة مع بعض أو ولا واحد:",
            "الطلب بقى REFUNDED.",
            "الاشتراك اتشال.",
            "وسجل: مين، وعمل إيه، وعلى إيه، وليه.",
            "قفلة الـ transaction.",
            "رد 204.",
            "قفلة.",
            "ركّب الـ router على /admin."
          ],
          sol: R`الصفحة لازم تعرض آخر ٥٠ سطر الأحدث فوق، وبعد الاسترداد التجريبي يظهر في الأول سطر زي: «admin@myapp.com — order.refund — cmun8kedf… — من دقيقة»، والسبب ظاهر من [[meta.reason]]. ولو اتنين حاولوا يستردوا نفس الطلب، التاني هيرجع [[409 NOT_PAID]] لأن الـ status بقى REFUNDED.

لما تشيل دور الأدمن من مستخدم وهو داخل، أول طلب بعدها يرجع [[403]] على طول، حتى لو الـ access token بتاعه لسه فاضله ١٤ دقيقة وجواه [[role: "ADMIN"]]. ده شغل [[requireFreshRole]]: بتقرا الدور من القاعدة مع كل طلب. لو استخدمت [[requireRole]] العادي، هيفضل أدمن لحد ما التوكن يخلص، وده بالظبط اللي التجربة بتكشفه.

ومتنساش إن endpoint قراية الـ audit log نفسه تحت [[/admin]]، فهو محمي بنفس الـ guard. وخليه قراية بس: مفيش endpoint يعدّل أو يمسح سطر في الـ audit log.`,
          solCode: R`export function requireFreshRole(role) {
  return async (req, res, next) => {
    const u = await db.user.findUnique({ where: { id: req.user.id }, select: { role: true } });
    if (u?.role !== role) return next(new AppError(403, "FORBIDDEN", "مش مسموحلك"));
    next();
  };
}

admin.get("/audit-logs", async (req, res) => {
  const rows = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: { id: true, action: true, targetId: true, meta: true, createdAt: true, actor: { select: { email: true } } },
  });
  res.json({ data: rows });
});`
        },
        {
          cmd: "بحث وفلترة",
          title: "من خانة البحث في الـ URL لـ where في القاعدة",
          desc: R`الفلاتر بتيجي في الـ query string ([[?q=react&level=BEGINNER&sort=newest]]). Zod بيتأكد منها ويحوّلها لأنواع صح، وبعدين بتتبني منها [[where]] قطعة قطعة. والترتيب بيبقى من قايمة ثابتة، مش اسم عمود جاي من برّه.

وفي الواجهة، الفلاتر تفضل في الـ URL، عشان اللينك يتبعت لحد ويفتح بنفس النتيجة، وزرار back يشتغل.`,
          example: R`const CourseQuery = z.object({
  q: z.string().trim().max(100).optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  sort: z.enum(["newest", "price_asc", "popular"]).default("newest"),
});
const SORTS = { newest: { createdAt: "desc" }, price_asc: { priceCents: "asc" }, popular: { enrollCount: "desc" } };
router.get("/courses", async (req, res) => {
  const f = CourseQuery.parse(req.query);
  const where = {
    published: true,
    ...(f.q && { OR: [{ title: { contains: f.q, mode: "insensitive" } }, { summary: { contains: f.q, mode: "insensitive" } }] }),
    ...(f.level && { level: f.level }),
  };
  res.json({ data: await db.course.findMany({ where, orderBy: [SORTS[f.sort], { id: "desc" }], take: 20 }) });
});`,
          try: R`جرّب [[?sort=passwordHash]] و [[?level=HACKER]]. الاتنين لازم يرجعوا 400. بعدين اعمل ١٠٠ ألف كورس بـ seed، وقيس وقت [[?q=react]] قبل وبعد index الـ trigram (الـ deep بيشرحه).`,
          flag: "script",
          deep: {
            why: "البحث والفلترة أكتر حاجة بتاخد input حر من المستخدم وبتحطه في query. لو اتعمل غلط، يا إما ثغرة (injection أو ترتيب بعمود سري)، يا إما صفحة بطيئة أول ما الداتا تكبر.",
            how: R`[[z.enum]] للمستوى والترتيب معناها إن أي قيمة مش في القايمة بترجع 400. وفي الترتيب، الـ client بيختار اسم («newest»)، والسيرفر بيحوّله لـ orderBy من القايمة. عمره ما اسم العمود نفسه بييجي من برّه. و [[{ id: "desc" }]] في الآخر بيخلي الترتيب ثابت لما قيمتين يتساووا، ودي مهمة جدًا للـ pagination.

[[contains]] مع [[mode: "insensitive"]] بتتحوّل [[ILIKE '%react%']]، والـ index العادي (btree) مش بيقدر يساعد فيها لأن فيه % في الأول. أول ما الجدول يكبر، في PostgreSQL فيه extension اسمه pg_trgm: [[CREATE INDEX ... USING gin (title gin_trgm_ops)]]، ونفسه على [[summary]]، لأن الـ OR محتاج index على العمودين عشان القاعدة تستخدمهم مع بعض (BitmapOr). وبعدها ILIKE بيستخدم الـ indexes.

ولو محتاج بحث حقيقي، بترتيب حسب الأهمية ومرادفات، فيه full-text search في Postgres ([[tsvector]] و GIN). والعربي هنا محتاج تطبيع الهمزات والتاء المربوطة قبل الحفظ. وخطوة أكبر من كده: Meilisearch أو Typesense، بيستحملوا الأخطاء الإملائية وبيدعموا العربي كويس، وبيتحدّثوا من القاعدة عن طريق job.

و [[enrollCount]] عمود محسوب مسبقًا، بيزيد مع كل اشتراك، بدل ما تعد الاشتراكات مع كل بحث.

وفي الواجهة: debounce حوالي ٣٠٠ ملّي ثانية على خانة البحث، والفلاتر بتتقري من [[searchParams]]. وفي Next 16 الـ searchParams بقت Promise في props الصفحة. التفاصيل في «Next.js»، والـ indexes في «SQL و Prisma» و «PostgreSQL».`,
            when: "أي قايمة المستخدم بيفلترها. ابدأ بـ ILIKE، ولما الجدول يعدّي عشرات الآلاف ضيف trigram، ولما تحتاج بحث ذكي خش على full-text أو Meilisearch.",
            mistakes: R`في مشروع حقيقي، البحث كان بيبني فلتر PostgREST بنص فيه كلام المستخدم مباشرة: [[.or($__btfull_name.ilike.%$__{query}%,email.ilike.%$__{query}%$__bt)]]. المستخدم ممكن يكتب فاصلة وفلتر من عنده، ويغيّر معنى الـ query. ده injection بشكل تاني. الصح إنك تهرب القيمة، أو تستخدم دوال المكتبة المنفصلة لكل عمود، أو RPC. ومن الغلطات كمان: [[orderBy: { [req.query.sort]: "asc" }]]. أو [[take]] من غير حد أقصى. أو بحث case-sensitive فـ «React» ميلاقيش «react».`
          },
          lines: [
            "شكل الفلاتر المسموحة.",
            "كلمة البحث: من غير مسافات على الأطراف، و ١٠٠ حرف بالكتير.",
            "المستوى من قايمة ثابتة.",
            "الترتيب من ٣ اختيارات، والافتراضي الأحدث.",
            "قفلة.",
            "كل اختيار ترتيب وتحويله، والـ client عمره ما بيبعت اسم عمود.",
            "مسار القايمة العامة.",
            "اتأكد من الفلاتر. أي قيمة غريبة ترجع 400.",
            "ابني الشرط:",
            "المنشور بس.",
            "لو فيه بحث: في العنوان أو الملخص، من غير فرق بين الحروف الكبيرة والصغيرة.",
            "لو فيه مستوى: فلتر بيه.",
            "قفلة الشرط.",
            "رجّع ٢٠، بالترتيب المختار، و id في الآخر عشان الترتيب يبقى ثابت.",
            "قفلة."
          ],
          sol: R`[[?sort=passwordHash]] بيرجع [[400]] و [[{"error":{"code":"VALIDATION",...,"details":[{"code":"invalid_value","path":["sort"],...}]}}]]، ونفس الكلام لـ [[?level=HACKER]] بس الـ path [[level]]. الـ enum هو اللي منع إن أي حد يرتّب بعمود مش مسموح أو يبعت قيمة القاعدة متعرفهاش.

الـ trigram: جربنا على ١٠٠ ألف كورس. من غير index الـ plan كان [[Seq Scan on courses]] والوقت حوالي [[158 ms]]. بعد الـ indexes على [[title]] و [[summary]] بقى [[BitmapOr]] فوقه [[Bitmap Index Scan]] على كل index، والوقت أقل من [[1 ms]]. الأرقام بتختلف حسب جهازك، بس الفرق لازم يبقى عشرات أو مئات المرات.

لو الـ plan لسه Seq Scan بعد الـ index: اتأكد إنك عملت [[CREATE EXTENSION pg_trgm]]، وإن الـ index على العمودين مش واحد بس (الـ OR محتاج الاتنين)، وشغّل [[ANALYZE]]. وعلى جدول صغير أوي القاعدة ممكن تختار Seq Scan عن قصد لأنه أسرع فعلًا.`,
          solCode: R`-- seed: ١٠٠ ألف كورس
INSERT INTO "Course" (id, slug, title, summary, "priceCents", published, level, "instructorId", "createdAt")
SELECT 'c' || g, 'course-' || g, 'Course ' || g || ' ' || (ARRAY['Python','Go','React','SQL'])[1 + g % 4],
       'Learn ' || md5(g::text), 50000, true, 'BEGINNER', 'INSTRUCTOR_ID', now()
FROM generate_series(1, 100000) g;
ANALYZE "Course";

EXPLAIN ANALYZE SELECT * FROM "Course"
WHERE published AND (title ILIKE '%react%' OR summary ILIKE '%react%')
ORDER BY "createdAt" DESC, id DESC LIMIT 20;

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX course_title_trgm ON "Course" USING gin (title gin_trgm_ops);
CREATE INDEX course_summary_trgm ON "Course" USING gin (summary gin_trgm_ops);
ANALYZE "Course";
-- وشغّل نفس الـ EXPLAIN ANALYZE تاني`
        },
        {
          cmd: "pagination",
          title: "صفحة ورا صفحة من غير ما القاعدة تتعب",
          desc: R`فيه طريقتين. offset ([[?page=37]]) بيقول للقاعدة «فوّت ٧٢٠ صف وهات ٢٠». وcursor ([[?cursor=abc]]) بيقول «هات ٢٠ بعد الصف ده». الـ cursor سرعته ثابتة مهما عمقت، ومبيكررش ولا بيفوّت عناصر لو فيه حاجات جديدة اتضافت. وده المناسب للـ infinite scroll والـ APIs. أما الـ offset فمناسب لجداول الأدمن اللي فيها أرقام صفحات.`,
          example: R`router.get("/me/orders", requireAuth, async (req, res) => {
  const { cursor, limit } = Page.parse(req.query);
  const rows = await db.order.findMany({
    where: { userId: req.user.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });
  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;
  res.json({ data: items, nextCursor: hasMore ? items.at(-1).id : null });
});`,
          try: R`اعمل ١٠٠ طلب بـ seed، واجيب أول صفحة. اعمل طلب جديد، وبعدين اجيب الصفحة التانية بالـ cursor: مفيش ولا عنصر اتكرر. اعمل نفس التجربة بـ offset ([[skip: 20]]) ولاحظ إن آخر عنصر في الصفحة الأولى طلع تاني في أول الصفحة التانية.`,
          flag: "script",
          deep: {
            why: "القايمة اللي بترجع كل حاجة مرة واحدة شغالة كويس بـ ٥٠ صف، وبتقع بـ ٥٠ ألف. والـ offset بيبطأ كل ما تعمق، لأن القاعدة لازم تقرا كل الصفوف اللي قبل وترميها.",
            how: R`[[OFFSET 10000 LIMIT 20]] معناها إن القاعدة بتقرا ١٠٠٢٠ صف وترمي ١٠٠٠٠. والـ cursor (اسمه كمان keyset) بيتحوّل لشرط زي [[WHERE (createdAt, id) < (آخر وقت, آخر id)]]، والـ index على [[(userId, createdAt)]] بيوصل للمكان ده على طول. يعني الصفحة رقم ١٠٠٠ بنفس سرعة الأولى.

Prisma بتعمل ده بـ [[cursor]] و [[skip: 1]]. الـ skip هنا عشان تفوّت صف الـ cursor نفسه، لأنه كان آخر صف في الصفحة اللي قبل.

[[take: limit + 1]] حيلة صغيرة: بتطلب صف زيادة. لو جه، يبقى فيه صفحة بعد كده، وبترجّع [[nextCursor]]. من غير ما تعمل count، والـ count على جدول كبير غالي.

الـ Page schema: [[z.object({ cursor: z.string().optional(), limit: z.coerce.number().int().min(1).max(50).default(20) })]]. الحد الأقصى ٥٠ بيمنع حد يطلب مليون صف.

عيب الـ cursor إنك متقدرش تنط لصفحة ٣٧، ومفيش «من ١٢٠٠٠». في جداول الأدمن، offset مع count مقبول طول ما الداتا مش ضخمة. وفي الواجهة، [[useInfiniteQuery]] من TanStack Query بيتعامل مع [[nextCursor]] لوحده (تاب «React»).`,
            when: "أي قايمة ممكن تكبر: طلبات، وإشعارات، ورسايل، وكورسات. من أول يوم، لأن تغيير شكل الـ API بعدين بيكسر الواجهة.",
            mistakes: R`في المشاريع الحقيقية اللي راجعناها كان فيه offset بس، ومفيش cursor خالص. وفيه قوايم أدمن بـ [[take: 200]] من غير أي صفحات، فالنتايج بتتقص من غير ما حد يلاحظ. ومن الغلطات كمان: ترتيب بعمود مش unique لوحده (createdAt بس)، فصفين بنفس الوقت ممكن واحد فيهم يتكرر أو يتفوّت. أو [[limit]] من غير حد أقصى.`
          },
          lines: [
            "طلباتي، صفحة صفحة.",
            "الـ cursor (اختياري) والعدد (من ١ لـ ٥٠).",
            "هات...",
            "...طلبات المستخدم ده بس...",
            "...بالأحدث، و id عشان الترتيب يبقى ثابت...",
            "...وصف زيادة عشان نعرف فيه صفحة بعد كده ولا لأ...",
            "...ولو فيه cursor، ابدأ بعده وفوّته هو نفسه.",
            "قفلة.",
            "الصف الزيادة جه؟ يبقى فيه كمان.",
            "رجّع العدد المطلوب بس.",
            "الـ cursor الجاي هو آخر id، أو null لو خلصت.",
            "قفلة."
          ],
          sol: R`بالـ cursor: جربناها بـ ١٠٠ طلب، وأخدنا الصفحة الأولى (٢٠)، وضفنا طلب جديد، وبعدين الصفحة التانية. أول عنصر في التانية كان اللي بعد آخر عنصر في الأولى على طول، وعدد العناصر المكررة [[0]]. الطلب الجديد مظهرش، لأنه أحدث من الصفحة الأولى، وهيظهر لما المستخدم يعمل refresh من الأول.

بالـ offset ([[skip: 20]]): الطلب الجديد زق كل حاجة خطوة لتحت، فأول عنصر في الصفحة التانية طلع هو نفسه آخر عنصر في الأولى، والمكرر [[1]]. ولو كان اتمسح طلب بدل ما يتضاف، كان هيحصل العكس: عنصر يقع بين الصفحتين ومحدش يشوفه.

لو لقيت تكرار بالـ cursor كمان، غالبًا نسيت [[skip: 1]] (فالـ cursor نفسه بيرجع أول عنصر)، أو الترتيب [[createdAt]] بس من غير [[id]]، فطلبين بنفس الوقت بالظبط ترتيبهم بيتغير من استعلام للتاني.`,
          solCode: R`// src/page-test.ts: npx tsx src/page-test.ts
const u = await db.user.findFirstOrThrow();
const c = await db.course.findFirstOrThrow();
const t0 = Date.now() - 1e6;
await db.order.createMany({ data: Array.from({ length: 100 }, (_, i) => ({ userId: u.id, courseId: c.id, amountCents: 100 + i, createdAt: new Date(t0 + i * 1000) })) });

const orderBy = [{ createdAt: "desc" }, { id: "desc" }];
const page1 = (await db.order.findMany({ where: { userId: u.id }, orderBy, take: 21 })).slice(0, 20);
await db.order.create({ data: { userId: u.id, courseId: c.id, amountCents: 999 } });

const byCursor = (await db.order.findMany({ where: { userId: u.id }, orderBy, take: 21, cursor: { id: page1.at(-1).id }, skip: 1 })).slice(0, 20);
const byOffset = await db.order.findMany({ where: { userId: u.id }, orderBy, take: 20, skip: 20 });

const seen = new Set(page1.map((o) => o.id));
console.log("cursor dupes:", byCursor.filter((o) => seen.has(o.id)).length); // 0
console.log("offset dupes:", byOffset.filter((o) => seen.has(o.id)).length); // 1`
        },
        {
          cmd: "background jobs",
          title: "الشغل التقيل يتعمل بعد ما ترد على المستخدم",
          desc: R`أي حاجة بطيئة، أو ممكن تفشل وتتعاد، أو مش لازم تحصل قبل الرد، بتروح queue: إيميلات، ومعالجة صور، وتقارير. الـ API بيضيف job ويرد على طول، والـ worker (process لوحده) بياخدها ويشتغل. BullMQ بيخزن الـ queue في Redis، وبيعيدها لو فشلت، بس لو حددت [[attempts]] (على الـ job أو في [[defaultJobOptions]] بتاعة الـ Queue). من غيرها محاولة واحدة بس.

والشغل اللي بيتكرر كل فترة بيتعمل job scheduler في نفس الـ queue، مش setInterval ولا node-cron جوه السيرفر.`,
          example: R`import { Queue } from "bullmq";
import { connection } from "../lib/redis.js";

export const emailQueue = new Queue("emails", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } });
export const maintenance = new Queue("maintenance", { connection });
await emailQueue.add("receipt", { to: user.email, orderId: order.id }, {
  attempts: 5,
  backoff: { type: "exponential", delay: 10_000 },
  removeOnComplete: 1000,
});
await maintenance.upsertJobScheduler("reconcile-payments", { every: 15 * 60_000 }, { name: "reconcile" });`,
          try: R`شغّل Redis بـ Docker، وضيف job بتعمل throw أول مرتين وبعدين تنجح. شوف في اللوج إنها اتعادت بعد ١٠ ثواني، وبعدين ٢٠. بعدين شغّل نسختين من الـ worker، وتأكد إن الـ scheduler بيعمل job واحدة كل مرة، مش اتنين.`,
          flag: "script",
          deep: {
            why: "لو التسجيل بيستنى الإيميل، والإيميل بياخد ٣ ثواني، التسجيل كله بقى بطيء. ولو المزوّد وقع، التسجيل بيفشل. وأي شغل جوه الـ request بيضيع لو السيرفر عمل restart في النص. الـ queue بتفصل «حصل» عن «اتعالج».",
            how: R`الـ API بيكتب الـ job في Redis في ملّي ثواني ويرد. الـ worker في process منفصلة، أو على سيرفر لوحده، بياخد الـ jobs ويشغّلها. ولو الإيميلات اتراكمت، تشغّل worker زيادة من غير ما تلمس الـ API.

[[attempts]] و [[backoff]] الأسّي: لو فشلت، تستنى ١٠ ثواني، وبعدين ٢٠، وبعدين ٤٠. كده لو خدمة واقعة، مش هتضربها بطلبات. والـ jobs اللي فشلت خالص بتفضل محفوظة عشان تشوفها وتعيدها. Bull Board واجهة جاهزة للكلام ده.

الـ queue بتضمن «على الأقل مرة» (at-least-once)، مش «مرة بالظبط». الـ worker ممكن يقع بعد ما يبعت الإيميل وقبل ما يعلّم إنه خلص، فالـ job تتعاد. عشان كده كل job لازم تبقى idempotent: مفتاح idempotency للإيميل، أو تتأكد من الحالة قبل ما تعمل حاجة.

[[upsertJobScheduler]] بيتخزن في Redis. فمهما شغّلت نسخ من الـ worker، كل ميعاد بيطلع job واحدة. و [[every]] بالملّي ثانية، أو [[pattern]] بصيغة cron. والـ job اسمها reconcile بتسأل البوابة عن الطلبات المعلقة (درس الـ webhook).

وحاجات مهمة كمان: ابعت ids في الداتا مش objects كاملة، لأن الداتا ممكن تتغير قبل ما الـ job تشتغل. وخلي queue لكل نوع شغل، عشان ألف صورة متأخرش إيميل استعادة باسورد. ولما السيرفر يقفل، [[await worker.close()]] على SIGTERM عشان الـ job اللي شغالة تخلص.

وفيه بدايل: pg-boss بيشتغل على PostgreSQL من غير Redis، و Inngest و Trigger.dev خدمات جاهزة. والـ queues بتعمق في تاب «APIs متقدمة».`,
            when: "إيميلات، وصور، وفيديو، وتقارير، ومزامنة مع خدمات برّه، وأي حاجة بتتكرر كل فترة.",
            mistakes: R`في مشروعين حقيقيين، الـ cron كان [[node-cron]] جوه process السيرفر. طول ما فيه نسخة واحدة، كله تمام. أول ما تبقى نسختين، كل job بتشتغل مرتين: إيميلات مكررة، ومزامنة مكررة. وفي واحد منهم، مكتبات Redis كانت متسطبة في package.json ومحدش بيستخدمها. ومن الغلطات كمان: إنك تبعت الإيميل جوه الـ request. أو retry فوري من غير backoff. أو job مش idempotent فالإعادة تعمل الحاجة مرتين.`
          },
          lines: [
            "الـ Queue بتاعة BullMQ.",
            "اتصال Redis مشترك من lib/redis.ts.",
            "queue للإيميلات. أي job فيها (زي reset) بتتعاد لحد ٥ مرات افتراضيًا، حتى لو اتضافت من غير options.",
            "queue للشغل الدوري والصيانة.",
            "ضيف job إيصال، بالـ ids مش بالداتا كلها...",
            "...لو فشلت تتعاد لحد ٥ مرات...",
            "...وتستنى ١٠ ثواني، وبعدين ٢٠، وبعدين ٤٠...",
            "...واحتفظ بآخر ١٠٠٠ ناجحة بس.",
            "قفلة.",
            "كل ربع ساعة: راجع الطلبات المعلقة مع البوابة. بيتعمل مرة واحدة مهما كان عدد الـ workers."
          ],
          sol: R`الـ job اللي بتقع أول مرتين: هتشوف في اللوج المحاولة الأولى على طول، والتانية بعد حوالي ١٠ ثواني، والتالتة بعد حوالي ٢٠ ثانية من التانية وتنجح، وبعدها [[completed]]. المعادلة [[delay × 2^(attempt-1)]]. جربناها بـ delay نص ثانية عشان منستناش، والمحاولات جت على [[0s]] و [[0.6s]] و [[1.6s]].

مع نسختين من الـ worker، كل ما الـ scheduler ييجي ميعاده بتتعمل job واحدة بس، وبتشتغل على worker واحد (مرة ده ومرة ده). حتى لو الكود اللي بينادي [[upsertJobScheduler]] اتشغّل مرتين، لأن الـ id ثابت ([[reconcile-payments]])، فالتانية بتحدّث نفس الـ scheduler مش بتعمل واحد جديد.

لو شفت الـ job بتفشل مرة ومتتعادش، يبقى [[attempts]] مش واصل (حطيته في مكان غلط). ولو شفت الـ reconcile بيشتغل مرتين في نفس الميعاد، يبقى عندك [[setInterval]] أو node-cron في مكان تاني، مش الـ scheduler.`,
          solCode: R`import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL, { maxRetriesPerRequest: null });
const q = new Queue("test", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } });
const t0 = Date.now();

new Worker("test", async (job) => {
  console.log(((Date.now() - t0) / 1000).toFixed(1) + "s", job.name, "attempt", job.attemptsMade + 1, "pid", process.pid);
  if (job.name === "flaky" && job.attemptsMade < 2) throw new Error("boom");
}, { connection });

if (process.argv[2] === "seed") {
  await q.add("flaky", {});
  await q.upsertJobScheduler("reconcile-payments", { every: 15_000 }, { name: "reconcile" });
}
// ترمنال ١: node jobs.mjs seed
// ترمنال ٢: node jobs.mjs`
        }
      ]
    },
    {
      t: "multi-tenant SaaS",
      l: 2,
      n: "منتج واحد لشركات كتير: فين الـ tenant في الداتا، وإزاي كل query يتقفل عليه، والأعضاء والدعوات، والدومينات، واختبار التسريب",
      items: [
        {
          cmd: "tenant_id ولا schema",
          title: "tenant_id في كل جدول، ولا schema لكل عميل، ولا قاعدة لكل عميل؟",
          desc: R`الـ multi-tenant SaaS منتج واحد بيخدم شركات كتير (عيادات، أو مدارس، أو فرق شغل)، وكل شركة اسمها tenant أو workspace. وداتا كل واحدة لازم متظهرش للتانية أبدًا.

فيه ٣ طرق تفصل بيها الداتا. الأولى: جداول مشتركة وعمود [[tenantId]] في كل جدول. التانية: schema لكل tenant في نفس القاعدة. والتالتة: قاعدة لكل tenant. لأغلب المنتجات الجديدة ابدأ بالأولى، وهي اللي هنكمل بيها.`,
          example: R`model Workspace {
  id        String    @id @default(uuid())
  name      String
  slug      String    @unique
  domain    String?   @unique
  members   Member[]
  projects  Project[]
}
model Member {
  tenantId String
  userId   String
  role     Role      @default(MEMBER)
  tenant   Workspace @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  user     User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@id([tenantId, userId])
  @@index([userId])
}
model Project {
  id       String    @id @default(uuid())
  tenantId String
  name     String
  tenant   Workspace @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  @@index([tenantId, id])
}
enum Role { OWNER ADMIN MEMBER }`,
          try: "خد منصة الكورسات وحوّلها لـ SaaS: كل أكاديمية ليها workspace، ومدرّبينها، وطلابها، وكورساتها. اكتب قايمة بكل جدول وقرر: فيه tenantId ولا لأ؟ (users؟ الكورسات؟ الطلبات؟ جدول الخطط والأسعار؟). وبعدين قرر: طالب واحد ينفع يبقى في أكاديميتين؟",
          flag: "script",
          deep: {
            why: "القرار ده بيتاخد مرة واحدة وبيبقى صعب جدًا يتغير بعدين، لأنه بيلمس كل جدول وكل query. وغلطة واحدة فيه (query ناقصه الفلتر) معناها إن عميل بيشوف داتا عميل تاني، ودي أسوأ حاجة تحصل لـ B2B SaaS: بتخسر ثقة كل العملاء، مش العميل ده بس.",
            how: R`الطريقة الأولى (tenantId في كل جدول، shared schema): أرخص وأبسط. migration واحدة لكل العملاء، و connection pool واحد، وتقارير على كل العملاء بـ query واحدة. العيب إن العزل كله معتمد على إن كل query فيه [[WHERE tenantId = ...]]. والحل في الدرسين الجايين: Prisma extension بيحطه أوتوماتيك، و RLS في القاعدة كشبكة أمان.

الطريقة التانية (schema لكل tenant): جداول منفصلة فعلًا، والـ query بيختار الـ schema بـ [[search_path]]. العزل أقوى، بس كل migration لازم تتعمل على مئات أو آلاف الـ schemas، والـ connection pooling بيتعقد، و Prisma مش مصمم لده (محتاج client لكل schema أو [[SET search_path]] جوه transaction).

الطريقة التالتة (قاعدة لكل tenant): أقوى عزل، وكل عميل ممكن يبقى في region مختلف، وتقدر تعمل restore لعميل واحد. بس تكلفة وتشغيل كل قاعدة لوحدها. بتتعمل للعملاء الكبار (enterprise) اللي بيطلبوها في العقد، أو ليها أدوات زي Turso اللي مبنية على قاعدة لكل عميل.

والمنتجات الكبيرة بتخلط: كل الناس في shared، والعميل الكبير في قاعدة لوحده (نفس الكود، connection string مختلف).

تفاصيل في الـ schema: users مش فيها tenantId، لأن نفس الشخص ممكن يبقى في أكتر من workspace (زي Slack). والعلاقة في جدول Member بالدور. والـ index على [[(tenantId, id)]] أو [[(tenantId, createdAt)]] لأن كل query هيبدأ بـ tenantId. وجداول النظام زي الخطط والعملات مشتركة ومن غير tenantId.

والـ tenantId يتنسخ لكل جدول، حتى لو ممكن يتعرف من الأب (task جوه project جوه workspace). ليه؟ عشان الفلتر والـ RLS يبقوا بسطاء، من غير joins.`,
            when: "من أول يوم في أي منتج بيتباع لشركات. حتى لو أول عميل واحد، ضيف tenantId من البداية. إضافته بعدين لجداول فيها داتا أصعب بكتير.",
            mistakes: R`tenantId في الجداول الرئيسية بس، وجداول الأولاد (comments، و attachments) من غيره. أو user فيه tenantId واحد، وبعدين العملاء يطلبوا حد في أكتر من workspace. أو schema لكل عميل من أول يوم عشان «أأمن»، والـ migrations تبقى كابوس بعد ٢٠٠ عميل. وفي الانترفيو: «صمم SaaS متعدد العملاء» — قول الـ ٣ طرق، واختار واحدة بسبب، واذكر إزاي تضمن العزل.`
          },
          lines: [
            "الـ tenant نفسه: شركة أو أكاديمية.",
            "رقمه.",
            "اسمه.",
            "اسم قصير للـ subdomain ([[acme.myapp.com]]).",
            "دومين خاص اختياري ([[learn.acme.com]]).",
            "أعضاؤه.",
            "مشاريعه.",
            "قفلة.",
            "العضوية: مين في أنهي workspace وبأنهي دور.",
            "الـ workspace.",
            "المستخدم.",
            "دوره جوه الـ workspace ده بالذات.",
            "العلاقة، ولو الـ workspace اتمسح الأعضاء يتمسحوا.",
            "العلاقة بالمستخدم.",
            "الشخص مرة واحدة في كل workspace.",
            "index عشان «الـ workspaces بتاعتي».",
            "قفلة.",
            "مثال لجدول بيانات عادي.",
            "رقمه.",
            "tenantId في كل صف، حتى لو ممكن يتعرف من علاقة.",
            "الاسم.",
            "العلاقة.",
            "كل query بيبدأ بالـ tenant، فالـ index بيبدأ بيه.",
            "قفلة.",
            "الأدوار جوه الـ workspace."
          ],
          sol: R`الإجابة المتوقعة: users من غير tenantId (الشخص بيتنقل بين أكاديميات)، والعضوية في Member بدور (OWNER أو ADMIN للأكاديمية، و INSTRUCTOR، و STUDENT). الكورسات، والدروس، والطلبات، والـ enrollments، والكوبونات: كلهم فيهم tenantId، حتى الدروس رغم إنها تحت الكورس. جدول الخطط (plans) بتاع اشتراك الأكاديمية فيك مشترك ومن غير tenantId، أما اشتراك الأكاديمية نفسه (subscription) فيه tenantId.

طالب في أكاديميتين: أيوه، صفين في Member بنفس userId. وفي الواجهة بيختار الأكاديمية (أو يدخل من الـ subdomain بتاعها).

الغلطة الشائعة: تحط tenantId في users، فالطالب يعمل حسابين بنفس الإيميل، والقيد unique على الإيميل يمنعه.`
        },
        {
          cmd: "Prisma tenant extension",
          title: "Prisma extension: الـ tenant بيتحط في كل query لوحده",
          desc: R`بدل ما تكتب [[where: { tenantId }]] في كل query وتتمنى محدش ينساها، بتعمل client خاص بالـ tenant بـ Prisma client extension. أي query عليه بيتحط فيه الـ tenantId أوتوماتيك: في الـ where للقراية والتعديل والمسح، وفي الـ data للإنشاء.

الـ middleware بيطلّع الـ tenant من الطلب (من الـ subdomain أو header)، ويتأكد إن المستخدم عضو فيه، ويحط [[req.db = forTenant(tenantId)]]. والـ routes بتستخدم [[req.db]] بس.`,
          example: R`const SCOPED = new Set(["Project", "Member", "Invite"]);

export function forTenant(tenantId) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (!SCOPED.has(model)) return query(args);
          if (operation === "create") args.data = { ...args.data, tenantId };
          else if (operation.startsWith("createMany")) args.data = [args.data].flat().map((d) => ({ ...d, tenantId }));
          else if (operation === "upsert") { args.where = { ...args.where, tenantId }; args.create = { ...args.create, tenantId }; }
          else args.where = { ...args.where, tenantId };
          return query(args);
        },
      },
    },
  });
}

export async function tenantScope(req, res, next) {
  const member = await prisma.member.findUnique({ where: { tenantId_userId: { tenantId: req.tenant.id, userId: req.user.id } } });
  if (!member) throw new AppError(404, "NOT_FOUND", "مش موجود");
  req.member = member;
  req.db = forTenant(req.tenant.id);
  next();
}`,
          try: R`اعمل workspaces اتنين A و B، وأنشئ مشروع في A بـ [[forTenant(a.id)]]. بعدين من [[forTenant(b.id)]] جرّب: [[findMany]]، و [[findUnique]] بـ id مشروع A، و [[update]] عليه، و [[deleteMany({})]]. وآخر حاجة: [[create]] من B وفي الـ data [[tenantId: a.id]] صريحة. المشروع اتعمل في أنهي workspace؟`,
          flag: "script",
          deep: {
            why: "مع ١٠٠ endpoint، الفلتر اليدوي هيتنسي في واحد. مش احتمال، مؤكد. والـ extension بيحوّل العزل من «كل مطوّر لازم يفتكر» لـ «الافتراضي آمن، واللي عايز يعدّي لازم يكتب ده صراحة».",
            how: R`[[$extends]] بـ [[query.$allModels.$allOperations]] بيلف كل عملية على كل model. بياخد اسم الـ model والعملية والـ args، وبينادي [[query(args)]] بعد التعديل. والـ extension ده بديل الـ middleware القديم ([[$use]]) اللي اتشال من Prisma.

ترتيب الـ spread مهم: [[{ ...args.data, tenantId }]] يعني الـ tenantId بتاعنا بيكسب على أي حاجة جاية من الكود. فلو حد بعت [[tenantId]] في الـ body وعدّاه الـ validation، مش هيقدر يكتب في tenant تاني.

[[findUnique]] و [[update]] و [[delete]] بيقبلوا فلاتر زيادة جنب الـ unique field (من Prisma 5)، فـ [[where: { id, tenantId }]] شغالة. ولو المشروع في tenant تاني: findUnique بترجّع null، و update و delete بيرموا [[P2025]] (مش موجود)، والـ handler يحوّلها 404. والـ 404 أحسن من 403، لأن 403 بتأكد إن الـ id موجود عند حد.

[[SCOPED]] قايمة صريحة بالـ models اللي فيها tenantId. أي model جديد فيه tenantId لازم يتضاف هنا، والاختبار في درس «اختبار تسريب tenants» بيمسك لو اتنسى.

حدود الـ extension اللي لازم تعرفها: الـ nested writes ([[create]] جوه [[project.create({ data: { tasks: { create: [...] } } })]]) مش بتعدّي على الـ extension للـ model الابن، فلازم تحط tenantId بإيدك أو تتجنبها. و [[include]] للعلاقات مش بيتفلتر (بس لو الأب متفلتر والأولاد تبعه، مفيش مشكلة عادة). و [[$queryRaw]] مش بيتلمس خالص. عشان كده RLS في الدرس الجاي كشبكة أمان.

و [[forTenant]] بترجّع client جديد خفيف (مش connection جديد)، فعادي تعمله مع كل طلب.`,
            when: "من أول endpoint في منتج multi-tenant. وخلي الـ lint أو الـ code review يمنع استخدام [[prisma]] العادي في routes الـ tenant، واسمح بيه بس في مكان واضح (زي الأدمن العام والـ jobs).",
            mistakes: R`نسيان model جديد في SCOPED. أو [[{ tenantId, ...args.data }]] بالعكس، فالـ body يكسب. أو استخدام [[prisma]] العادي «مرة واحدة بس» في route. أو الاعتماد على الـ extension مع nested writes. أو إنك تاخد الـ tenantId من الـ body أو الـ query بدل من العضوية المتحقق منها. أو 403 بدل 404 للي مش عضو.`
          },
          lines: [
            "الـ models اللي فيها tenantId وبتتقفل على الـ tenant.",
            "دالة بتعمل client خاص بـ tenant واحد.",
            "extension على الـ client الأساسي...",
            "...بيلف الـ queries...",
            "...على كل الـ models...",
            "...وكل العمليات.",
            "model مش tenant؟ عدّيه زي ما هو.",
            "إنشاء: الـ tenantId بتاعنا فوق أي حاجة في الـ data.",
            "إنشاء كتير: نفس الكلام لكل صف.",
            "upsert: في الـ where وفي الـ create.",
            "أي حاجة تانية (find و update و delete و count...): في الـ where.",
            "نفّذ الـ query بعد التعديل.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "middleware بعد ما [[req.tenant]] اتحدد من الـ subdomain.",
            "المستخدم عضو في الـ workspace ده؟",
            "لأ؟ 404 كأنه مش موجود.",
            "احفظ العضوية (فيها الدور).",
            "والـ client المقفول على الـ tenant.",
            "كمّل.",
            "قفلة."
          ],
          sol: R`النتايج المتوقعة من B: [[findMany]] يرجّع مشاريع B بس، و [[findUnique]] بـ id مشروع A يرجّع null، و [[update]] يرمي [[P2025]]، و [[deleteMany({})]] يمسح مشاريع B بس ([[count]] بعددهم)، ومشروع A لسه موجود. و [[create]] بـ [[tenantId: a.id]] صريحة بيتعمل في B، لأن الـ spread بيحط tenantId بتاعنا في الآخر.

لو المشروع اتعمل في A، يبقى كاتب [[{ tenantId, ...args.data }]]. ولو [[findUnique]] رمى validation error، يبقى نسخة Prisma قديمة جدًا (قبل 5) مبتقبلش فلاتر زيادة في الـ unique where.`
        },
        {
          cmd: "RLS و app.tenant_id",
          title: "Row Level Security: القاعدة نفسها بترفض صفوف الـ tenant التاني",
          desc: R`الـ extension بيحمي الكود اللي بيعدّي عليه. أما RLS (Row Level Security) في PostgreSQL فبيحمي القاعدة نفسها: policy على كل جدول بتقول «الصف ده يظهر بس لو [[tenantId]] بتاعه زي [[app.tenant_id]] في الـ session». أي query، حتى [[$queryRaw]] أو query ناقص الفلتر، مش هيشوف غير صفوف الـ tenant ده.

في Prisma: extension بيعمل transaction فيها [[set_config('app.tenant_id', ..., true)]] وبعدها الـ query. والتطبيق لازم يتصل بـ role عادي، مش owner الجداول ومش superuser، لأن الاتنين بيعدّوا RLS.`,
          example: R`CREATE ROLE app_user LOGIN PASSWORD 'change-me';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON "Project"
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

export function withTenant(tenantId) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const [, result] = await prisma.$transaction([
            prisma.$executeRaw$__btSELECT set_config('app.tenant_id', $__{tenantId}, true)$__bt,
            query(args),
          ]);
          return result;
        },
      },
    },
  });
}`,
          try: R`نفّذ الـ SQL على قاعدة تجربة، واتصل بـ [[app_user]]. جرّب [[SELECT * FROM "Project"]] من غير أي setting، وبعدين [[SELECT set_config('app.tenant_id', '<id>', false)]] وكرر. وجرّب [[INSERT]] بـ tenantId مختلف عن الـ setting. وبعدين اتصل بالـ owner وكرر أول query.`,
          flag: "script",
          deep: {
            why: "الـ extension بيغطي ٩٥٪، والـ ٥٪ الباقيين هما اللي بيعملوا التسريب: تقرير بـ SQL خام، أو script في job، أو مطوّر جديد استخدم الـ client العادي. الـ RLS بيخلي الغلطة دي ترجّع صفر صفوف بدل داتا عميل تاني. يعني بتتحول من تسريب لـ bug.",
            how: R`[[USING]] بيفلتر اللي يتقري (SELECT) واللي يتعدّل ويتمسح (UPDATE و DELETE). و [[WITH CHECK]] بيمنع كتابة صف tenantId بتاعه غلط (INSERT و UPDATE). والاتنين بيقارنوا بـ [[current_setting('app.tenant_id', true)]]. الـ [[true]] التانية معناها «لو مش متحدد رجّع NULL بدل error»، و NULL مبيساويش أي حاجة، فمن غير setting مفيش صفوف خالص. الافتراضي آمن.

[[set_config(..., true)]]: الـ true الأخيرة معناها local، يعني الـ setting بيعيش لحد آخر الـ transaction بس. ده مهم جدًا مع الـ connection pool: الاتصال ده هيروح لطلب تاني بعد شوية، ولو الـ setting فضل عليه، الطلب الجاي هيشوف داتا الـ tenant اللي قبله. عشان كده الـ extension بيحط الـ set_config والـ query في نفس الـ [[$transaction]].

و [[$executeRaw]] بالـ tagged template بيعمل parameter مش string concatenation، فمفيش SQL injection من الـ tenantId.

الـ role: صاحب الجدول (اللي عمل الـ migration) بيعدّي RLS إلا لو [[FORCE ROW LEVEL SECURITY]]، والـ superuser بيعدّيها دايمًا. فالتطبيق بيتصل بـ [[app_user]]، والـ migrations بتشتغل بـ role تاني. وده معناه متغيرين بيئة: [[DATABASE_URL]] للتطبيق و [[MIGRATE_DATABASE_URL]] للـ migrations.

التمن: كل query بقى transaction فيها ٢ statements، يعني round trip زيادة. في أغلب المنتجات مش ملحوظ. ولو بقى مشكلة، تقدر تعمل الـ set_config مرة واحدة في [[$transaction(async (tx) => ...)]] جوه الطلب وتعمل كل الـ queries فيه. والـ index على tenantId لازم يبقى موجود، لأن الـ policy بتتحط كـ WHERE.

والأدمن العام والـ jobs اللي بتلف على كل العملاء: role تالت عليه [[BYPASSRLS]]، أو policy زيادة بـ setting زي [[app.bypass_rls]]، ويبقى استخدامه صريح ومتسجّل.

Supabase مبني على نفس الفكرة: الـ policies بتستخدم [[auth.uid()]] من الـ JWT. تفاصيل RLS في تاب «PostgreSQL».`,
            when: "بعد الـ extension، كطبقة تانية، لأي SaaS فيه داتا حساسة (طبية، أو مالية، أو داتا عملاء شركات). وأي عميل enterprise هيسألك عليها في استبيان الأمان.",
            mistakes: R`الاتصال بالـ superuser أو owner الجدول، فالـ policies متشتغلش والاختبارات تعدّي. أو [[set_config(..., false)]] فالـ setting يفضل على الاتصال ويتسرب لطلب تاني. أو set_config والـ query في statements منفصلين برّه transaction، فكل واحد ممكن يروح على اتصال مختلف. أو PgBouncer بوضع transaction مع [[SET]] العادي (session level). أو إنك تنسى [[WITH CHECK]] فالقراية مقفولة والكتابة لأي tenant مفتوحة.`
          },
          lines: [
            "role التطبيق: عادي، مش superuser ولا صاحب الجداول.",
            "صلاحيات القراية والكتابة بس.",
            "شغّل RLS على الجدول.",
            "الـ policy:",
            "الصفوف اللي تتقري أو تتعدل: الـ tenant بتاع الـ session بس...",
            "...والصفوف اللي تتكتب: نفس الشرط.",
            "الـ extension اللي بيحط الـ tenant في الـ session.",
            "extension على الـ client...",
            "...بيلف الـ queries...",
            "...على كل الـ models...",
            "...وكل العمليات.",
            "transaction فيها خطوتين على نفس الاتصال:",
            "حط [[app.tenant_id]] لحد آخر الـ transaction بس...",
            "...ونفّذ الـ query.",
            "قفلة.",
            "رجّع نتيجة الـ query.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بـ [[app_user]] ومن غير setting: [[SELECT]] يرجّع صفر صفوف (مش error). بعد [[set_config]] بـ id الـ tenant: صفوفه هو بس. الـ [[INSERT]] بـ tenantId مختلف يرمي [[new row violates row-level security policy for table "Project"]] (كود 42501). ومن الـ owner: كل الصفوف ترجع، وده السبب إن التطبيق لازم ميتصلش بيه.

من Prisma: [[withTenant(a.id).project.findMany()]] يرجع مشاريع A بس، و [[prisma.project.findMany()]] العادي بـ app_user يرجّع مصفوفة فاضية.

لو الـ SELECT من غير setting رجّع كل الصفوف، اتأكد إنك متصل بـ app_user فعلًا ([[SELECT current_user]]).`
        },
        {
          cmd: "أعضاء ودعوات",
          title: "أعضاء workspace وأدوارهم، والدعوة بالإيميل",
          desc: R`كل workspace ليه أعضاء بأدوار: OWNER (واحد أو أكتر، يقدر يمسح الـ workspace ويدير الفلوس)، و ADMIN (يدير الأعضاء)، و MEMBER (شغل عادي). الدور جوه جدول Member، فنفس الشخص ممكن يبقى OWNER في workspace و MEMBER في تاني.

الدعوة: الأدمن بيكتب إيميل ودور، والسيرفر بيعمل صف Invite فيه token hash ومدة (٧ أيام)، ويبعت لينك. اللي بيفتح اللينك بيسجّل دخول أو حساب جديد بنفس الإيميل، ويقبل، فيتعمل Member.`,
          example: R`export const requireTenantRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.member.role)) throw new AppError(403, "FORBIDDEN", "مش مسموح لدورك");
  next();
};
router.post("/invites", tenantScope, requireTenantRole("OWNER", "ADMIN"), async (req, res) => {
  const { email, role } = z.object({ email: z.email().transform((e) => e.toLowerCase()), role: z.enum(["ADMIN", "MEMBER"]) }).parse(req.body);
  if (role === "ADMIN" && req.member.role !== "OWNER") throw new AppError(403, "FORBIDDEN", "الـ owner بس يعيّن admin");
  const token = crypto.randomBytes(32).toString("base64url");
  await req.db.invite.upsert({ where: { tenantId_email: { tenantId: req.tenant.id, email } }, create: { email, role, tokenHash: sha256(token), invitedById: req.user.id, expiresAt: new Date(Date.now() + 7 * 864e5) }, update: { role, tokenHash: sha256(token), expiresAt: new Date(Date.now() + 7 * 864e5) } });
  await emailQueue.add("invite", { to: email, workspace: req.tenant.name, link: $__bt$__{config.WEB_ORIGIN}/invite?token=$__{token}$__bt });
  res.status(202).end();
});
router.post("/invites/accept", requireAuth, async (req, res) => {
  const invite = await prisma.invite.findUnique({ where: { tokenHash: sha256(String(req.body.token)) } });
  const user = await prisma.user.findUniqueOrThrow({ where: { id: req.user.id } });
  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) throw new AppError(400, "BAD_INVITE", "الدعوة انتهت، اطلب واحدة جديدة");
  if (invite.email !== user.email || !user.emailVerifiedAt) throw new AppError(403, "INVITE_EMAIL_MISMATCH", "الدعوة دي لإيميل تاني");
  await prisma.$transaction([
    prisma.member.upsert({ where: { tenantId_userId: { tenantId: invite.tenantId, userId: user.id } }, create: { tenantId: invite.tenantId, userId: user.id, role: invite.role }, update: {} }),
    prisma.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } }),
  ]);
  res.json({ data: { tenantId: invite.tenantId } });
});`,
          try: R`اكتب الـ model بتاع [[Invite]] (id، و tenantId، و email، و role، و tokenHash unique، و invitedById، و expiresAt، و acceptedAt، و [[@@unique([tenantId, email])]]) وضيفه لـ SCOPED. بعدين اكتب [[DELETE /members/:userId]] بقاعدتين: MEMBER ميقدرش يشيل حد، وآخر OWNER ميتشالش ولا يشيل نفسه.`,
          flag: "script",
          deep: {
            why: "الأدوار جوه الـ workspace هي الفرق بين «أداة شخصية» و «منتج الشركات تشتريه». وأغلب ثغرات الـ SaaS الحقيقية مش في الـ login، بتبقى في الدعوات: دعوة اتقبلت بإيميل تاني، أو MEMBER رقّى نفسه ADMIN، أو آخر OWNER شال نفسه والـ workspace بقى من غير صاحب.",
            how: R`[[requireTenantRole]] بيشتغل بعد [[tenantScope]]، لأنه بيقرا [[req.member.role]] اللي اتجاب من القاعدة، مش من الـ JWT. ليه مش JWT؟ الدور بيتغير (الأدمن شال حد)، والـ JWT بيعيش ربع ساعة، وكمان الشخص عنده دور مختلف في كل workspace.

الـ ADMIN مينفعش يعيّن ADMIN (الـ OWNER بس). من غير القاعدة دي، أي ADMIN يقدر يعمل حساب تاني ليه ويرقّيه، وتبقى صعب تشيله. وبنفس المنطق، محدش يقدر يدّي دور أعلى من دوره.

الـ [[upsert]] على [[(tenantId, email)]]: دعوة تانية لنفس الإيميل بتحدّث القديمة (توكن جديد ومدة جديدة) بدل ما تعمل اتنين. والـ extension بيحط tenantId في الـ create والـ where لوحده.

القبول بيتم بـ [[prisma]] العادي مش [[req.db]]، لأن المستخدم لسه مش عضو، والـ workspace بيتعرف من الدعوة نفسها. وده مكان مقصود وواضح.

التحقق من الإيميل: الدعوة لـ [[mona@acme.com]] لازم تتقبل من حساب إيميله [[mona@acme.com]] ومتأكد. من غير الشرط ده، أي حد وصله اللينك (اتعمل له forward، أو اتسرب في تذكرة دعم) يدخل الـ workspace. وبعض المنتجات بتسمح بقبول الدعوة بأي إيميل، وده قرار منتج، بس لازم يبقى مقصود.

المستخدم الجديد: صفحة [[/invite?token=]] بتقوله يسجّل. والإيميل بتاعه اتأكد فعليًا لأنه فتح اللينك من إيميله، فتقدر تأكده في نفس الخطوة. أو تبعته لتأكيد عادي.

الدومين: «أي حد إيميله [[@acme.com]] يدخل لوحده» ميزة شائعة (domain capture). بس لازم تتأكد إن acme فعلًا صاحبة الدومين (سجل TXT في الـ DNS)، وإلا أي حد يسجّل workspace ويقول الدومين ده بتاعي.`,
            when: "أول ما الـ workspace يبقى فيه أكتر من شخص. والدعوات بالإيميل قبل أي SSO أو SCIM. دول بييجوا لما العملاء الكبار يطلبوهم.",
            mistakes: R`الدور في الـ JWT. أو ADMIN يعيّن OWNER أو ADMIN. أو قبول الدعوة بأي حساب. أو الدعوة من غير انتهاء. أو شيل آخر OWNER. أو إن العضو المشال يفضل شايف الداتا لحد ما التوكن يخلص، لأن الصلاحية مش بتتقري من القاعدة. أو إرسال الدعوات من غير حد، فالـ workspace بقى أداة spam.`
          },
          lines: [
            "middleware للأدوار جوه الـ workspace.",
            "الدور من العضوية اللي اتجابت من القاعدة، مش من الـ JWT.",
            "مسموح؟ كمّل.",
            "قفلة.",
            "إنشاء دعوة: عضو، و OWNER أو ADMIN.",
            "الإيميل والدور. مينفعش تدعي حد OWNER.",
            "الـ ADMIN مبيعيّنش ADMIN.",
            "توكن عشوائي.",
            "دعوة واحدة لكل إيميل في الـ workspace: جديدة أو تحديث للقديمة. والـ tenantId من الـ extension.",
            "ابعت اللينك.",
            "تمام.",
            "قفلة.",
            "قبول الدعوة: لازم يكون داخل.",
            "دوّر على الدعوة بالـ hash، بالـ client العادي لأنه لسه مش عضو.",
            "والمستخدم.",
            "مش موجودة، أو اتقبلت، أو خلصت؟ ارفض.",
            "إيميل الحساب لازم يطابق الدعوة ويكون متأكد.",
            "في transaction:",
            "اعمله عضو بالدور اللي في الدعوة، ولو عضو بالفعل سيبه.",
            "وعلّم الدعوة إنها اتقبلت.",
            "قفلة الـ transaction.",
            "رجّع الـ workspace عشان الواجهة تفتحه.",
            "قفلة."
          ],
          sol: R`الـ model: [[model Invite { id String @id @default(uuid()) tenantId String email String role Role tokenHash String @unique invitedById String expiresAt DateTime acceptedAt DateTime? @@unique([tenantId, email]) }]]، و [[SCOPED]] فيها [[Invite]].

الحذف (الـ solCode): MEMBER يحاول يشيل حد → [[403]]. شيل OWNER لما هو الوحيد → [[409 LAST_OWNER]]. شيل عضو من workspace تاني → [[404]] لأن [[req.db]] مش هيلاقيه. والـ ADMIN ميقدرش يشيل OWNER.

الغلطة الشائعة: [[prisma.member.delete]] العادي بدل [[req.db]]، فأدمن workspace يقدر يشيل عضو من workspace تاني لو عرف الـ userId.`,
          solCode: R`router.delete("/members/:userId", tenantScope, requireTenantRole("OWNER", "ADMIN"), async (req, res) => {
  const target = await req.db.member.findFirst({ where: { userId: req.params.userId } });
  if (!target) throw new AppError(404, "NOT_FOUND", "مش موجود");
  if (target.role === "OWNER" && req.member.role !== "OWNER") throw new AppError(403, "FORBIDDEN", "مش مسموح لدورك");
  if (target.role === "OWNER") {
    const owners = await req.db.member.count({ where: { role: "OWNER" } });
    if (owners <= 1) throw new AppError(409, "LAST_OWNER", "لازم يفضل owner واحد على الأقل");
  }
  await req.db.member.deleteMany({ where: { userId: target.userId } });
  res.status(204).end();
});`
        },
        {
          cmd: "subdomain و custom domain",
          title: "acme.myapp.com و learn.acme.com: الـ tenant من الدومين",
          desc: R`كل عميل بياخد subdomain ([[acme.myapp.com]]) أوتوماتيك، والعملاء اللي عايزين يقدروا يربطوا دومين خاص بيهم ([[learn.acme.com]]). الـ API بيعرف الـ tenant من الـ [[Host]] header.

الـ subdomains سهلة: سجل DNS واحد wildcard ([[*.myapp.com]]) بيشاور على السيرفر، وشهادة TLS wildcard (محتاجة DNS challenge). أما الدومينات الخاصة فكل واحد محتاج شهادة لوحده، وده اللي on-demand TLS في Caddy بيعمله: أول ما طلب يوصل لدومين جديد، Caddy بيسأل التطبيق «الدومين ده مسموح؟»، ولو أيوه يطلّع شهادة من Let's Encrypt.`,
          example: R`{
	on_demand_tls {
		ask http://localhost:4000/internal/domain-check
	}
}
https:// {
	tls {
		on_demand
	}
	reverse_proxy localhost:3000
}

app.get("/internal/domain-check", async (req, res) => {
  const ok = await prisma.workspace.findFirst({ where: { domain: String(req.query.domain), domainVerifiedAt: { not: null } }, select: { id: true } });
  res.status(ok ? 200 : 404).end();
});
export async function resolveTenant(req, res, next) {
  const host = req.hostname.toLowerCase();
  const slug = host.endsWith("." + config.ROOT_DOMAIN) ? host.slice(0, -(config.ROOT_DOMAIN.length + 1)) : null;
  req.tenant = slug ? await tenantCache.bySlug(slug) : await tenantCache.byDomain(host);
  if (!req.tenant) throw new AppError(404, "UNKNOWN_TENANT", "الموقع ده مش موجود");
  next();
}`,
          try: R`من غير DNS حقيقي: ضيف في [[/etc/hosts]] سطرين [[127.0.0.1 acme.myapp.test]] و [[127.0.0.1 learn.acme.test]]، وخلي [[ROOT_DOMAIN=myapp.test]]، وافتح الاتنين. اتأكد إن كل واحد بيطلّع الـ workspace الصح. وبعدين صمّم خطوات «اربط دومينك» اللي هتظهر للعميل: هيحط أنهي سجلات DNS، وإزاي هتتأكد إنه صاحب الدومين؟`,
          flag: "script",
          deep: {
            why: "الدومين الخاص بيخلي المنتج بتاعك يبان كأنه بتاع العميل (white-label)، وده بيتباع بفلوس زيادة في الخطط الأعلى. والـ subdomain بيدّي كل عميل عنوان واضح، وبيخلي الـ cookies والـ tenant منفصلين من غير ما المستخدم يختار.",
            how: R`الـ subdomains: سجل [[A]] أو [[CNAME]] لـ [[*.myapp.com]]. والشهادة wildcard لازم تتطلع بـ DNS-01 challenge (Let's Encrypt بتطلب إثبات إنك تملك الـ DNS). في Caddy محتاج plugin لمزوّد الـ DNS بتاعك، أو خلي Cloudflare يعمل الـ TLS قدام السيرفر.

الدومين الخاص: العميل بيحط [[CNAME learn.acme.com → custom.myapp.com]]. قبل ما تفعّله، اتأكد إنه صاحب الدومين: اطلب منه سجل [[TXT _myapp.learn.acme.com]] فيه token عشوائي، والسيرفر يتأكد منه ([[dns.promises.resolveTxt]]) ويحط [[domainVerifiedAt]]. من غير التحقق ده، أي حد يربط دومين حد تاني بـ workspace بتاعه.

Caddy on-demand TLS: [[https://]] من غير اسم معناها «أي دومين يوصلني». وأول TLS handshake لدومين جديد، Caddy بيعمل GET على [[ask]] ومعاه [[?domain=learn.acme.com]]. لو التطبيق رجّع 2xx، Caddy بيطلّع شهادة ويخزنها ويجددها لوحده. والـ ask لازم يكون سريع (lookup بـ index)، وإلا أول زيارة هتستنى. ومن غير ask، أي حد يشاور دومينات عشوائية على السيرفر بتاعك، و Caddy يطلب شهادات لحد ما Let's Encrypt يعملك rate limit. عشان كده Caddy بيشترط ask أو permission module في الإنتاج.

[[/internal/domain-check]] لازم ميبقاش مكشوف للإنترنت: على port داخلي أو localhost بس.

[[resolveTenant]]: [[req.hostname]] بيحترم [[trust proxy]] (بياخد [[X-Forwarded-Host]] لو السيرفر ورا proxy موثوق). والـ tenant بيتكاش (Redis أو ذاكرة لدقيقة)، لأنه بيتسأل عليه مع كل طلب.

الـ cookies: cookie اتعملت على [[acme.myapp.com]] مش بتتبعت لـ [[globex.myapp.com]]، وده كويس. متحطش [[Domain=.myapp.com]] على cookie الـ session، وإلا كل الـ subdomains يشوفوها. والدخول على دومين خاص محتاج session لوحده على الدومين ده (الـ cookies مش بتعدّي بين دومينات مختلفة)، فالدخول بيحصل على الدومين نفسه، أو بلينك مرة واحدة من الدومين الرئيسي.

البدائل المُدارة: Vercel و Cloudflare for SaaS بيعملوا نفس الفكرة كخدمة (API تضيف بيه دومين العميل والشهادة بتطلع لوحدها).`,
            when: "الـ subdomain من أول نسخة لو الـ tenants عندهم زوار من برّه (صفحات أكاديمية، أو متجر). والدومين الخاص لما عميل يطلبه، وغالبًا في خطة مدفوعة أعلى.",
            mistakes: R`ask endpoint بيرد 200 لأي دومين. أو ربط الدومين من غير TXT verification. أو cookie الـ session على [[.myapp.com]]. أو الاعتماد على [[Host]] من غير trust proxy صح (أو العكس: trust proxy مفتوح فأي حد يبعت X-Forwarded-Host). أو تسيب [[/internal/domain-check]] مكشوف. أو subdomains محجوزة زي [[www]] و [[api]] و [[admin]] متاحة كـ slug لعميل.`
          },
          lines: [
            "الإعدادات العامة لـ Caddy:",
            "on-demand TLS...",
            "...يسأل التطبيق قبل ما يطلّع أي شهادة.",
            "قفلة.",
            "قفلة.",
            "أي دومين يوصل على HTTPS:",
            "إعدادات TLS:",
            "شهادة وقت الطلب.",
            "قفلة.",
            "ابعت للتطبيق.",
            "قفلة.",
            "الـ endpoint اللي Caddy بيسأله (داخلي بس).",
            "الدومين مربوط بـ workspace ومتأكد؟",
            "200 يطلّع شهادة، و 404 يرفض.",
            "قفلة.",
            "middleware بيحدد الـ tenant من الدومين.",
            "الدومين من الطلب، small.",
            "لو تحت الدومين الرئيسي، خد الجزء اللي قبله (الـ slug).",
            "بالـ slug أو بالدومين الخاص، من كاش.",
            "مش موجود؟ 404.",
            "كمّل.",
            "قفلة."
          ],
          sol: R`مع [[/etc/hosts]]: [[http://acme.myapp.test:4000]] بيطلّع [[slug = "acme"]] ويجيب الـ workspace بالـ slug، و [[http://learn.acme.test:4000]] مش تحت [[myapp.test]] فبيتدوّر عليه كدومين خاص. أي دومين تالت يرجع [[404 UNKNOWN_TENANT]].

خطوات «اربط دومينك» المتوقعة: (١) العميل يكتب [[learn.acme.com]]، وانت تحفظه من غير verified وتدّيه token. (٢) يحط سجلين: [[CNAME learn → custom.myapp.com]] و [[TXT _myapp.learn → myapp-verify=<token>]]. (٣) زرار «تحقق» (أو job كل ساعة) يعمل [[resolveTxt]] ويقارن، ولو صح يحط [[domainVerifiedAt]]. (٤) من دلوقتي الـ ask يرد 200، وأول زيارة بتطلّع الشهادة. (٥) لو الـ TXT اتشال بعدين، الـ job يلغي التفعيل.

الغلطة الشائعة: الاعتماد على الـ CNAME بس كإثبات ملكية.`
        },
        {
          cmd: "اختبار تسريب tenants",
          title: "اختبار يثبت إن tenant مش شايف التاني",
          desc: R`الاختبار ده بيعمل tenantين A و B، ويحط داتا في A، ويحاول من B بكل طريقة: list، و get بالـ id، و count، و update، و delete، و create بـ tenantId بتاع A. كل محاولة لازم تفشل أو ترجع فاضي، وداتا A لازم تفضل زي ما هي.

اكتبه مرة للـ data layer (الـ extension)، ومرة على مستوى الـ HTTP لكل route فيه [[:id]]. وخليه في الـ CI، عشان أي model أو route جديد يتختبر أوتوماتيك. أساسيات Vitest في تاب «فحص الكود».`,
          example: R`import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma, forTenant } from "../src/db.js";

let a, b, secret;
beforeAll(async () => {
  a = await prisma.workspace.create({ data: { name: "A", slug: "a-" + Date.now() } });
  b = await prisma.workspace.create({ data: { name: "B", slug: "b-" + Date.now() } });
  secret = await forTenant(a.id).project.create({ data: { name: "سر A" } });
});
afterAll(() => prisma.$disconnect());

describe("tenant B can't touch tenant A", () => {
  const asB = () => forTenant(b.id).project;
  it("list", async () => expect((await asB().findMany()).map((p) => p.id)).not.toContain(secret.id));
  it("get by id", async () => expect(await asB().findUnique({ where: { id: secret.id } })).toBeNull());
  it("count", async () => expect(await asB().count({ where: { id: secret.id } })).toBe(0));
  it("update", async () => expect(asB().update({ where: { id: secret.id }, data: { name: "x" } })).rejects.toThrow());
  it("updateMany", async () => expect((await asB().updateMany({ where: { id: secret.id }, data: { name: "x" } })).count).toBe(0));
  it("delete", async () => expect(asB().delete({ where: { id: secret.id } })).rejects.toThrow());
  it("create can't pick another tenant", async () => {
    const p = await asB().create({ data: { name: "y", tenantId: a.id } });
    expect(p.tenantId).toBe(b.id);
  });
  it("A's row is untouched", async () => expect((await prisma.project.findUnique({ where: { id: secret.id } }))?.name).toBe("سر A"));
});`,
          try: R`شغّل الاختبار، وبعدين اكسر الـ extension عمدًا: شيل [[Project]] من [[SCOPED]]، وشغّله تاني. لازم يفشل في أكتر من test. بعدين اكتب نسخة HTTP بـ supertest: يوزر في A ويوزر في B، وكل واحد يحاول [[GET]] و [[PATCH]] و [[DELETE]] على [[/projects/:id]] بتاع التاني، والمتوقع 404 في كل حالة.`,
          flag: "script",
          deep: {
            why: "التسريب بين الـ tenants مش بيبان في الاستخدام العادي: كل عميل بيشوف داتاه وبس، لحد ما حد يغيّر رقم في الـ URL. والاختبار ده بيعمل الحاجة دي قبل ما عميل يعملها. ولأنه في الـ CI، أي تعديل بيكسر العزل بيتوقف قبل الـ merge، مش بعد ما يوصل للإنتاج.",
            how: R`الاختبار بيضرب القاعدة الحقيقية (قاعدة اختبار منفصلة)، مش mock، لأن اللي بنختبره هو السلوك الحقيقي لـ Prisma والـ extension. والـ slugs فيها [[Date.now()]] عشان الاختبارات متتخبطش في بعض لو اتشغلت كذا مرة من غير تنضيف.

كل عملية ليها توقع مختلف. القراية: null أو قايمة من غيره. التعديل والمسح بالـ unique: error (P2025)، والـ route بيحوّله 404. والـ many: count بـ 0. والإنشاء: الـ tenantId بتاعنا بيكسب. وآخر test بيتأكد إن محدش عدّل حاجة في A فعلًا، لأن ممكن العملية ترمي error بعد ما تكتب.

عشان الاختبار يغطي كل model لوحده، ممكن تلف على [[SCOPED]] وتعمل نفس الـ tests لكل واحد بـ [[describe.each]]. وفيه test يقارن SCOPED بكل الـ models اللي فيها عمود [[tenantId]] (من [[Prisma.dmmf]] أو من information_schema)، فلو حد ضاف model ونسي يضيفه، الاختبار يفشل.

نسخة الـ HTTP بتمسك نوع تاني من الغلط: route بيستخدم [[prisma]] العادي بدل [[req.db]]، أو الـ tenant جاي من الـ body. المصفوفة: لكل route فيه [[:id]]، اعمل الطلب بيوزر من الـ tenant التاني، وتوقع 404. نفس فكرة اختبارات الـ ownership في درس «ownership» بس على مستوى الـ workspace.

ومع RLS: شغّل نفس الاختبار باتصال [[app_user]] وبـ [[prisma]] العادي، والمتوقع صفر صفوف في كل حاجة.`,
            when: "من أول ما تعمل الـ extension، وقبل أول عميل حقيقي. ومع كل model أو route جديد، الاختبار ده بيبقى جزء من definition of done.",
            mistakes: R`اختبار بـ tenant واحد بس (كل حاجة تعدّي). أو mock لـ Prisma فالاختبار بيختبر الـ mock. أو اختبار الـ list بس ونسيان get و update و delete. أو إن الاختبار يتحقق إن العملية فشلت ومش بيتحقق إن الداتا متغيرتش. أو الاختبار يشتغل بالـ superuser فالـ RLS متتختبرش. وفي الانترفيو: «إزاي تتأكد إن مفيش tenant بيشوف داتا التاني؟» — طبقتين (extension و RLS)، واختبار تسريب في الـ CI، و 404 مش 403.`
          },
          lines: [
            "أدوات Vitest.",
            "الـ client العادي، والـ client المقفول على tenant.",
            "workspaceين ومشروع سري.",
            "قبل كل الاختبارات:",
            "workspace A.",
            "workspace B.",
            "مشروع في A.",
            "قفلة.",
            "في الآخر اقفل الاتصال.",
            "مجموعة الاختبارات:",
            "client مقفول على B.",
            "قايمة B مفيهاش مشروع A.",
            "get بالـ id من B يرجع null.",
            "count يرجع صفر.",
            "update بالـ id يرمي (P2025).",
            "updateMany ميعدّلش حاجة.",
            "delete بالـ id يرمي.",
            "create من B...",
            "...وفي الـ data الـ tenantId بتاع A صريح...",
            "...يتعمل في B برضه.",
            "قفلة.",
            "ومشروع A زي ما هو، بالـ client العادي.",
            "قفلة."
          ],
          sol: R`النتيجة المتوقعة مع الـ extension سليم: [[8 passed]]. لما تشيل Project من SCOPED: [[list]] و [[get by id]] و [[count]] و [[update]] و [[updateMany]] و [[delete]] يفشلوا، وكمان [[A's row is untouched]] يفشل (لأن update عدّل الاسم أو delete مسحه، حسب الترتيب). ده بالظبط اللي عايزه: الاختبار بيمسك الغلطة.

نسخة الـ HTTP (الـ solCode): كل الطلبات ترجع 404. لو واحد رجع 200 أو 204، يبقى الـ route ده بيستخدم [[prisma]] العادي. ولو رجع 403، يبقى بيقول للمهاجم إن الـ id موجود.`,
          solCode: R`import request from "supertest";
import { app } from "../src/app.js";

describe.each(["get", "patch", "delete"])("%s /projects/:id across tenants", (method) => {
  it("returns 404 for a project in another workspace", async () => {
    const res = await request(app)[method]($__bt/projects/$__{secret.id}$__bt)
      .set("Host", $__bt$__{b.slug}.myapp.test$__bt)
      .set("Authorization", $__btBearer $__{tokenOfUserInB}$__bt)
      .send({ name: "x" });
    expect(res.status).toBe(404);
  });
});`
        }
      ]
    },
    {
      t: "الأمان والأداء",
      l: 3,
      n: "قبل الإطلاق: الحماية على مستوى التطبيق كله، والكاش، والاستعلامات البطيئة، وسرعة الصفحة عند الزائر",
      items: [
        {
          cmd: "security baseline",
          title: "طبقات حماية بتتحط مرة واحدة في app.ts",
          desc: R`فيه حماية بتتحط مرة واحدة على التطبيق كله، بالترتيب الصح. headers أمان، و CORS لدومين الواجهة بس، وحد لحجم الـ body، و rate limit على الـ auth، و trust proxy عشان الـ IP الحقيقي يوصل من ورا Nginx. وبعد كده كل ميزة ليها أسئلة أمان خاصة بيها، والـ deep فيه قايمة لميزات المنتج ده.

OWASP والتشيك ليست العامة في تاب «الأمان».`,
          example: R`import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use("/webhooks", webhooksRouter);
app.use(cors({ origin: [config.WEB_ORIGIN], credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use("/auth", rateLimit({ windowMs: 15 * 60e3, limit: 20, standardHeaders: "draft-8", legacyHeaders: false }));
app.use(routes);
app.use(errorHandler);`,
          try: R`ابعت ٢١ طلب login ورا بعض، والأخير لازم يرجع 429. بعدين ابعت طلب من origin تاني بـ [[curl -H "Origin: https://evil.example"]] وبص على الـ headers اللي رجعت. وابعت JSON حجمه ميجا، ولازم يرجع 413.`,
          flag: "script",
          deep: {
            why: "الحماية اللي بتتعمل في كل route لوحده لازم هتتنسي في route. أما اللي على مستوى التطبيق فبتتحط مرة واحدة، وبتحمي أي route جديد لوحدها. وكل ميزة في المنتج بتفتح باب مختلف، ولازم تسأل عليه وانت بتبنيها، مش بعد الإطلاق.",
            how: R`الترتيب مقصود. [[trust proxy]] بـ 1 معناها إن فيه proxy واحد قدامنا (Nginx)، فـ [[req.ip]] بيبقى IP الزائر الحقيقي من X-Forwarded-For. من غيرها، كل الناس هيبقى ليهم IP الـ Nginx، والـ rate limit هيقفل الموقع كله بسبب شخص واحد. والـ webhooks قبل CORS والـ json لأن البوابة سيرفر مش متصفح، ولأن كل بوابة ليها parser خاص (Stripe محتاجة [[express.raw]]).

[[helmet]] بيحط headers زي HSTS، و nosniff، و frame-ancestors. و CORS بقايمة origins محددة مع credentials، ومينفعش [[*]]. و [[limit: "100kb"]] بيمنع حد يبعت JSON بـ ١٠٠ ميجا يملّي الرام. والـ rate limit هنا في الذاكرة، ولما يبقى عندك أكتر من نسخة لازم store في Redis.

وأسئلة الأمان لكل ميزة في المنتج ده:
الـ auth: rate limit، ورسالة واحدة للغلط، والتوكنات فين، والـ reset مرة واحدة.
الدفع: السعر من السيرفر، والـ HMAC، والمبلغ، والحالة الذرية.
الرفع: قايمة أنواع، وحجم حقيقي، و bucket مش public، وممنوع SVG و HTML من المستخدمين.
الـ realtime: التحقق في الـ handshake، والتأكد من العضوية قبل join.
الأدمن: الدور من القاعدة، و 2FA، و audit log.
البحث: validation، وترتيب من قايمة، ومفيش نصوص بتتلزق في query.
المحتوى اللي بيكتبه المستخدم: React بيعمل escape لوحده، والخطر في [[dangerouslySetInnerHTML]] وفي أي داتا بتتحط جوه [[<script>]].`,
            when: "أول ما تعمل app.ts. وراجع قايمة الميزات دي مع كل ميزة جديدة، وقبل الإطلاق مع التشيك ليست في تاب «الأمان».",
            mistakes: R`في مشاريع حقيقية لقينا ٤ غلطات. rate limiter بيثق في أول قيمة في X-Forwarded-For، والقيمة دي أي حد يقدر يكتبها بنفسه ويعدّي الحد. و routes تطوير فضلت في الإنتاج، واحدة بترمي error عن قصد عشان تجرب Sentry (أي حد يقدر يستهلك الكوتة بيها)، وواحدة بتعرض المستخدمين. واسم المستخدم بيتكتب جوه [[<script>]] في الصفحة من غير escape، فأي حد يكتب اسمه كود JavaScript يشتغل عند كل اللي يشوفوه (stored XSS). وتوكن «افتكرني» متخزن في القاعدة زي ما هو، في cookie من غير secure.`
          },
          lines: [
            "headers الأمان.",
            "CORS.",
            "قراية الـ cookies (الـ refresh token).",
            "الـ rate limiter.",
            "التطبيق.",
            "فيه proxy واحد قدامنا (Nginx)، فخد IP الزائر الحقيقي منه.",
            "headers الأمان على كل الردود.",
            "الـ webhooks قبل CORS والـ json، لأن كل بوابة ليها parser خاص.",
            "CORS لدومين الواجهة بس، ومعاه cookies.",
            "JSON لحد ١٠٠ كيلو بس.",
            "اقرا الـ cookies.",
            "٢٠ طلب كل ربع ساعة لكل IP على مسارات الـ auth.",
            "كل الـ routes.",
            "الـ error handler في الآخر خالص."
          ],
          sol: R`الـ login: أول ٢٠ طلب بيرجعوا الرد العادي (401 لو الباسورد غلط)، والـ ٢١ بيرجع [[429]] ومعاه headers زي [[RateLimit: "20-in-15min"; r=0; t=900]] و [[Retry-After: 900]] (ده شكل draft-8). لو كل الطلبات عدّت، اتأكد إن الـ rateLimit متسجّل قبل الـ routes، وإن [[trust proxy]] مظبوط لو ورا Nginx، وإلا كل الناس ليهم نفس الـ IP.

الـ origin الغريب: الطلب بيرجع [[200]] عادي! بس مفيش [[Access-Control-Allow-Origin]] في الرد، فالمتصفح هو اللي بيمنع الصفحة الغريبة إنها تقرا الرد. يعني CORS مش حماية للسيرفر، ده قرار المتصفح. هتلاقي كمان headers الـ helmet زي [[Content-Security-Policy]] و [[Strict-Transport-Security]]، ومفيش [[X-Powered-By]]. ومن [[http://localhost:3000]] هتلاقي [[Access-Control-Allow-Origin: http://localhost:3000]] و [[Access-Control-Allow-Credentials: true]].

الـ JSON الـ ١ ميجا بيرجع [[413]] و [[TOO_LARGE]]. لو رجع 500، يبقى الـ errorHandler بتاعك مش بيتعامل مع [[err.type === "entity.too.large"]] (السطر ده موجود في درس «شكل الأخطاء»)، والـ body parser رمى خطأ الـ handler مش فاهمه.`,
          solCode: R`for i in $(seq 1 21); do
  curl -s -o /dev/null -w '%{http_code} ' -H "Content-Type: application/json" -d '{"email":"a@b.c","password":"x"}' localhost:4000/auth/login
done; echo
# 401 401 ... 401 429

curl -s -D - -o /dev/null -H "Origin: https://evil.example" localhost:4000/courses

node -e 'process.stdout.write(JSON.stringify({ x: "a".repeat(1e6) }))' > big.json
curl -s -w ' %{http_code}\n' -H "Content-Type: application/json" --data-binary @big.json localhost:4000/courses
# {"error":{"code":"TOO_LARGE",...}} 413`
        },
        {
          cmd: "طبقات الكاش",
          title: "كل طلب يتخدم من أقرب مكان ممكن",
          desc: R`الكاش ليه طبقات. المتصفح والـ CDN بيحفظوا الردود العامة بـ [[Cache-Control]]. والتطبيق بيحفظ نتايج الاستعلامات في Redis. والقاعدة عندها كاش خاص بيها في الرام. أشهر نمط في التطبيق اسمه cache-aside: دوّر في الكاش الأول، ولو مش موجود هات من القاعدة واحفظ بـ TTL. ولما الداتا تتغير، امسح الـ key.`,
          example: R`export async function getCourse(slug) {
  const key = $__btcourse:$__{slug}:v1$__bt;
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);
  const course = await db.course.findUnique({ where: { slug }, include: { lessons: { select: { id: true, title: true, isPreview: true } } } });
  if (course) await redis.set(key, JSON.stringify(course), "EX", 300);
  return course;
}
export async function updateCourse(id, data) {
  const course = await db.course.update({ where: { id }, data });
  await redis.del($__btcourse:$__{course.slug}:v1$__bt);
  return course;
}`,
          try: R`قيس زمن [[GET /courses/:slug]] ١٠٠ مرة من غير كاش ومع كاش. بعدين عدّل عنوان الكورس من الأدمن، وتأكد إن الصفحة جابت الجديد على طول. بعدين علّق سطر الـ del وكرر، ولاحظ إن القديم فضل ٥ دقايق.`,
          flag: "script",
          deep: {
            why: "صفحة الكورس بتتفتح آلاف المرات وبتتغير مرة في الأسبوع. لو كل فتحة بتسأل القاعدة بـ join، القاعدة هتتعب على داتا مبتتغيرش. الكاش بيشيل الحمل ده عنها.",
            how: R`ابدأ من أقرب طبقة للزائر:

١. المتصفح والـ CDN: الـ API العام يرد بـ [[Cache-Control: public, max-age=60, stale-while-revalidate=300]]، يعني الـ CDN يخدم النسخة دقيقة، وبعدها يخدم القديمة وهو بيجيب الجديدة في الخلفية. وأي حاجة خاصة بمستخدم ([[/me/...]]) بترد بـ [[private, no-store]]. والملفات اللي في اسمها hash ([[app.3f9a.js]]) بتتكاش سنة بـ [[immutable]].

٢. Next.js عنده الكاش بتاعه لنتايج الـ fetch والصفحات. التفاصيل في تاب «Next.js».

٣. Redis في التطبيق: المثال. الـ TTL شبكة أمان لو نسيت تمسح في مكان. و [[:v1]] في الـ key بيخليك تلغي كل الكاش القديم مرة واحدة لو شكل الداتا اتغير. و [[redis]] هنا عميل ioredis تاني في [[lib/redis.ts]] بالإعدادات العادية، مش اتصال BullMQ اللي فيه [[maxRetriesPerRequest: null]] (ده بيخلي أي أمر يستنى للأبد لو Redis وقع). وخلي [[enableOfflineQueue: false]] ولفّ الـ get والـ set في try/catch، عشان لو Redis وقع تكمّل من القاعدة.

٤. القاعدة: الـ indexes وكاش الصفحات بتاعها في الرام. ده الدرس الجاي.

مشاكل لازم تعرفها. الـ stampede: الـ key يخلص، وألف طلب يلاقوه فاضي مع بعض، فيروحوا كلهم للقاعدة في نفس اللحظة. الحل lock، أو stale-while-revalidate، أو TTL فيه عشوائية بسيطة. ولو Redis وقع، التطبيق لازم يكمّل من القاعدة، أبطأ بس شغال. وأي حاجة فيها فلوس، زي السعر وقت إنشاء الطلب، بتتقري من القاعدة دايمًا، مش من الكاش.`,
            when: "بعد ما تقيس وتلاقي حاجة بتتقري كتير وبتتغير قليل. متحطش كاش على كل حاجة من أول يوم.",
            mistakes: R`إنك تكاش داتا مستخدم تحت key مشترك، فمستخدم يشوف داتا غيره، ودي أخطر غلطة كاش. أو كاش من غير TTL ومن غير مسح. أو الـ CDN يكاش رد فيه [[Set-Cookie]]. وفي مشروع حقيقي، الـ service worker كان cache-first باسم نسخة ثابت في الكود، فالزوار فضلوا يشوفوا المحتوى القديم لحد ما حد يفتكر يغيّر الرقم يدوي. وفي مشاريع Next.js اللي راجعناها مكانش فيه أي كاش للداتا خالص، فكل زيارة بتسأل القاعدة.`
          },
          lines: [
            "هات كورس بالـ slug.",
            "الـ key، ومعاه رقم نسخة.",
            "دوّر في Redis.",
            "لقيته؟ رجّعه من غير ما تلمس القاعدة.",
            "ملقيتوش؟ هاته من القاعدة بالدروس (من غير روابط الفيديو).",
            "احفظه ٥ دقايق (EX بالثواني).",
            "رجّعه.",
            "قفلة.",
            "تعديل كورس.",
            "عدّل في القاعدة.",
            "امسح الكاش بتاعه، عشان الطلب الجاي يجيب الجديد.",
            "رجّعه.",
            "قفلة."
          ],
          sol: R`من غير كاش كل طلب بيعمل استعلامين (الكورس ودروسه)، ومع كاش بيبقى [[GET]] واحد من Redis. جربناها ١٠٠ مرة على نفس الجهاز: حوالي [[1.6 ms]] للطلب من القاعدة، و [[0.12 ms]] من Redis. على جهازك القاعدة وRedis قريبين، فالفرق هنا صغير بالأرقام. في الإنتاج، والقاعدة عليها ضغط والاستعلام أتقل، الفرق بيكبر، والأهم إن القاعدة مبتشوفش الطلبات دي أصلًا.

بعد التعديل مع [[redis.del]]: أول طلب بيجيب العنوان الجديد على طول. ولما تعلّق الـ del: الصفحة بتفضل تعرض القديم، و [[TTL course:SLUG:v1]] في redis-cli بيقولك فاضل كام ثانية (لحد 300). بعد ما يخلص، الجديد يظهر لوحده. ده بالظبط دور الـ TTL: شبكة أمان، مش طريقة التحديث.

لو الجديد ظهر على طول حتى من غير del، يبقى الطلب مش بيعدّي على [[getCourse]] أصلًا (مثلًا Next.js بيجيب من القاعدة مباشرة)، أو الـ key بيتكتب بشكل مختلف في المكانين.`,
          solCode: R`// قياس بسيط
const slug = "sql-basics";
await getCourse(slug); // سخّن الكاش
let t = performance.now();
for (let i = 0; i < 100; i++) await getCourse(slug);
console.log("مع كاش", ((performance.now() - t) / 100).toFixed(2), "ms");

await redis.del("course:" + slug + ":v1");
t = performance.now();
for (let i = 0; i < 100; i++) { await redis.del("course:" + slug + ":v1"); await getCourse(slug); }
console.log("من غير كاش", ((performance.now() - t) / 100).toFixed(2), "ms");

// redis-cli TTL course:sql-basics:v1`
        },
        {
          cmd: "indexes و N+1",
          title: "الاستعلام البطيء: لاقيه وصلّحه",
          desc: R`أشهر سببين للبطء: عمود بتفلتر بيه من غير index، فالقاعدة بتقرا الجدول كله (Seq Scan). و N+1، يعني query للقايمة وبعدين query لكل عنصر فيها جوه loop. [[EXPLAIN ANALYZE]] بيوريك القاعدة عملت إيه، و [[pg_stat_statements]] بيوريك أتقل الاستعلامات في الإنتاج.

مثال N+1: [[for (const c of courses) await db.lesson.count({ where: { courseId: c.id } })]]، ده ٢١ query لـ ٢٠ كورس. والحل: [[findMany({ include: { _count: { select: { lessons: true } } } })]]، وده query واحد.`,
          example: R`EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;
CREATE INDEX CONCURRENTLY order_user_created_idx ON "Order" ("userId", "createdAt" DESC);
EXPLAIN ANALYZE SELECT * FROM "Order" WHERE "userId" = 'u_1' ORDER BY "createdAt" DESC LIMIT 20;
SELECT query, calls, round(mean_exec_time) AS ms FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;`,
          try: R`اعمل مليون طلب بسكربت seed. شغّل أول سطر وشوف Seq Scan والوقت. اعمل الـ index وشغّله تاني، وشوف Index Scan والفرق. بعدين شغّل Prisma بـ [[log: ["query"]]] وافتح صفحة فيها loop، وعدّ الاستعلامات في الترمنال.`,
          flag: "script",
          deep: {
            why: "الصفحة اللي كانت بتفتح في ٥٠ ملّي ثانية وفيها ١٠٠ صف، بتاخد ٥ ثواني بمليون صف. والسبب تقريبًا دايمًا index ناقص أو N+1. ومفيش كاش ولا سيرفر أكبر هيحل ده بجد.",
            how: R`اقرا [[EXPLAIN ANALYZE]] من جوه لبرّه. [[Seq Scan]] معناها قرا الجدول كله. و [[Index Scan]] أو [[Index Only Scan]] معناها راح على طول بالـ index. وقارن [[rows]] المتوقعة بالفعلية، و [[actual time]] لكل خطوة. ولو فيه [[Sort]] بعد الـ scan، الـ index مش مغطي الترتيب.

الـ index المركّب ترتيب أعمدته مهم. أعمدة المساواة الأول ([[userId]])، وبعدين عمود الترتيب أو المدى ([[createdAt]]). و [[("userId", "createdAt" DESC)]] بيخدم الـ WHERE والـ ORDER BY والـ LIMIT مع بعض، فالقاعدة بتقرا ٢٠ صف بس.

وكل index ليه تمن: كل insert أو update بيحدّثه. متعملش index على كل عمود.

[[CONCURRENTLY]] بيعمل الـ index من غير ما يقفل الكتابة على الجدول، ودي مهمة في الإنتاج. بس مينفعش جوه transaction، فلو بتعمله بـ Prisma migration، عدّل الـ SQL بإيدك في ملف لوحده. وفي الـ schema نفسها بتكتب [[@@index([userId, createdAt(sort: Desc)])]].

[[pg_stat_statements]] extension محتاج يتفعّل على السيرفر، والقواعد المُدارة (managed) غالبًا بتفعّله. وبيجمع كل query بشكل عام من غير القيم، وعدد مرات تشغيله، ومتوسط وقته. رتّب بـ [[total_exec_time]]: query سريعة بتتنادى مليون مرة ممكن تبقى أتقل من واحدة بطيئة بتتنادى مرة.

التفاصيل في تاب «PostgreSQL» وتاب «SQL و Prisma».`,
            when: "لما صفحة تبطأ، أو Sentry يوريك endpoint بطيء. وراجع أتقل ١٠ استعلامات مرة في الشهر.",
            mistakes: R`إنك تحط كاش على استعلام بطيء بدل ما تصلّحه. أو index على كل عمود. أو [[CREATE INDEX]] من غير CONCURRENTLY على جدول كبير في الإنتاج، فتقف الكتابة دقايق. أو [[WHERE lower(email) = ...]] من غير expression index على [[lower(email)]]. وفي مشروع حقيقي، أعمدة عليها [[@unique]] كان عليها [[@@index]] كمان، والـ unique أصلًا بيعمل index، فبقوا اتنين بيتحدّثوا مع كل كتابة.`
          },
          lines: [
            "خطة التنفيذ الفعلية ووقتها. قبل الـ index هتلاقي Seq Scan وبعدين Sort.",
            "index مركّب على المستخدم والتاريخ، من غير ما يقفل الكتابة.",
            "نفس الاستعلام تاني. هتلاقي Index Scan ومفيش Sort، والوقت أقل بكتير.",
            "أتقل ١٠ استعلامات في القاعدة: عدد مرات التشغيل ومتوسط الوقت بالملّي ثانية."
          ],
          sol: R`على مليون طلب ومستخدم عنده ١٠٠ طلب: قبل الـ index الـ plan كان [[Parallel Seq Scan on "Order"]] ومعاه [[Workers Launched: 2]]، والوقت حوالي [[34 ms]]. بعد الـ index بقى [[Index Scan using order_user_created_idx]]، والوقت حوالي [[0.07 ms]]، ومفيش [[Sort]] خالص، لأن الـ index متخزن بالترتيب اللي الاستعلام عايزه. الأرقام بتختلف حسب جهازك، بس الفرق بالمئات.

آخر سطر (pg_stat_statements) هيرجع [[relation "pg_stat_statements" does not exist]] لو الـ extension مش شغال: محتاج [[shared_preload_libraries = 'pg_stat_statements']] في الإعدادات، و restart، و [[CREATE EXTENSION pg_stat_statements]]. في القواعد المُدارة غالبًا بيبقى شغال من الأول.

الـ N+1: صفحة بتلف على ٣ كورسات وتجيب دروس كل واحد لوحده بتطلّع [[4]] استعلامات في الترمنال (١ + ٣)، ومع ١٠٠ كورس بتبقى ١٠١. بعد [[include: { lessons: true }]] بقوا [[2]] مهما كان العدد. ولو [[CREATE INDEX CONCURRENTLY]] وقع بـ [[cannot run inside a transaction block]]، يبقى انت شغّله جوه migration أو BEGIN، شغّله لوحده.`,
          solCode: R`-- seed: مليون طلب على ١٠ آلاف مستخدم
INSERT INTO "Order" (id, "userId", "courseId", "amountCents", currency, status, "createdAt")
SELECT 'o' || g, 'u_' || (g % 10000), 'COURSE_ID', 50000, 'EGP', 'PAID', now() - (g || ' seconds')::interval
FROM generate_series(1, 1000000) g;
ANALYZE "Order";

// N+1 وعدّ الاستعلامات
const db = new PrismaClient({ adapter, log: [{ emit: "event", level: "query" }] });
let n = 0;
db.$on("query", () => n++);
const courses = await db.course.findMany();
for (const c of courses) await db.lesson.findMany({ where: { courseId: c.id } });
console.log("loop:", n);            // 1 + عدد الكورسات
n = 0;
await db.course.findMany({ include: { lessons: true } });
console.log("include:", n);         // 2`
        },
        {
          cmd: "CDN و Core Web Vitals",
          title: "الموقع يبان سريع عند الزائر، مش عند جهازك بس",
          desc: R`جوجل بتقيس السرعة بـ ٣ أرقام من زوار حقيقيين، عند الـ 75th percentile. LCP أكبر عنصر ظهر في قد إيه، والمطلوب ٢.٥ ثانية أو أقل. و INP الصفحة بترد على الضغطة في قد إيه، والمطلوب ٢٠٠ ملّي ثانية أو أقل. و CLS الحاجات بتتنطط وهي بتحمّل قد إيه، والمطلوب 0.1 أو أقل.

أكبر فرق بييجي من ٣ حاجات: الصور والملفات من CDN بحجم وصيغة صح، و JavaScript أقل في المتصفح، ومقاسات محجوزة للصور والإعلانات.`,
          example: R`import Image from "next/image";
<Image src={course.coverUrl} alt={course.title} width={1200} height={675} sizes="(max-width: 768px) 100vw, 800px" fetchPriority="high" />

import { onLCP, onINP, onCLS } from "web-vitals";
const send = (m) => navigator.sendBeacon("/api/vitals", JSON.stringify({ name: m.name, value: m.value, rating: m.rating, page: location.pathname }));
onLCP(send); onINP(send); onCLS(send);`,
          try: R`افتح صفحة كورس على موبايل حقيقي بـ 4G، وشغّل Lighthouse بـ throttling. شوف أنهي عنصر هو الـ LCP. ضيف [[fetchPriority="high"]] للغلاف وقيس تاني. بعدين ركّب web-vitals واجمع الأرقام من زوار حقيقيين أسبوع.`,
          flag: "script",
          deep: {
            why: "جهازك سريع ونتك سريع، والطالب على موبايل متوسط و 4G بتقطع. الصفحة اللي بتفتح عندك في ثانية ممكن تاخد ٦ عنده، ونص الناس بيقفلوا قبل ما تفتح. والأرقام دي بتأثر على ترتيبك في جوجل كمان.",
            how: R`LCP غالبًا صورة الغلاف أو العنوان الكبير. عشان يبقى سريع: السيرفر يرد بسرعة (كاش أو SSR)، والصورة من CDN بصيغة AVIF أو WebP بالمقاس المناسب، ومتبقاش lazy. و [[fetchPriority="high"]] بيقول للمتصفح «دي أولوية». وفي Next 16، الـ [[priority]] القديمة بقت deprecated، والبديل [[preload]]، أو [[fetchPriority]]، أو [[loading="eager"]]. والصور من دومين تاني محتاجة [[images.remotePatterns]] في next.config.

INP بيتأثر بالـ JavaScript. أي task طويلة على الـ main thread بتأخر رد الضغطة. قلل الـ JS: Server Components للحاجات اللي مش تفاعلية، وحمّل المكونات التقيلة ([[dynamic import]]) لما تتطلب، ومتستوردش مكتبة كاملة عشان دالة واحدة.

CLS: [[width]] و [[height]] على كل صورة، عشان المتصفح يحجز مكانها قبل ما تحمّل. ومكان محجوز للبانرات. والخطوط بـ next/font، اللي بيظبط مقاسات الخط البديل عشان النص ميتنططش لما الخط الحقيقي يحمّل.

والـ CDN (زي Cloudflare قدام الـ VPS) بيخدم الملفات من أقرب مدينة للزائر. الملفات اللي في اسمها hash بتتكاش سنة، والـ HTML لفترة قصيرة أو مبيتكاشش خالص. والفيديو مكانه خدمة فيديو بـ HLS، مش mp4 من السيرفر.

Lighthouse قياس معمل. الحقيقة من زوار حقيقيين: مكتبة web-vitals في كودك، أو تقرير CrUX بتاع جوجل. وقياس INP لازم يبقى من زوار حقيقيين، لأنه محتاج تفاعل.`,
            when: "قبل الإطلاق على الصفحات العامة (الرئيسية، والكورسات، وصفحة الكورس)، وبعد أي تغيير كبير في الواجهة.",
            mistakes: "إنك تحسّن رقم Lighthouse على اللابتوب بتاعك وبس. أو تعمل lazy لصورة الـ LCP نفسها. أو تنسى width و height فالصفحة تتنطط. أو تستورد مكتبة تواريخ أو أيقونات كاملة. أو تعرض الفيديو mp4 مباشرة من السيرفر."
          },
          lines: [
            "component الصور بتاع Next.js.",
            "صورة الغلاف: مقاسات محجوزة (CLS)، و sizes عشان يختار المقاس الصح، وأولوية عالية لأنها الـ LCP.",
            "مكتبة القياس من زوار حقيقيين.",
            "ابعت كل رقم للسيرفر بـ sendBeacon، وده بيوصل حتى لو الزائر قفل الصفحة.",
            "اسمع على التلات مقاييس."
          ],
          sol: R`في Lighthouse (وضع Mobile، وهو بيعمل throttling لوحده) هتلاقي في قسم Diagnostics بند [[Largest Contentful Paint element]] بيقولك مين الـ LCP. في صفحة كورس غالبًا هو صورة الغلاف. قبل [[fetchPriority="high"]] هتلاقي الصورة بتبدأ تحمل متأخر في الـ waterfall بعد الـ CSS والـ JS. بعده بتبدأ بدري مع أول الطلبات، والـ LCP بيقل. الرقم نفسه بيختلف كل تشغيلة، فشغّل ٣ مرات وخد المتوسط. المقاييس الرسمية: LCP كويس تحت 2.5 ثانية، و INP تحت 200ms، و CLS تحت 0.1.

الـ web-vitals من الزوار الحقيقيين هتلاقيها أوحش من Lighthouse على جهازك غالبًا، وده الطبيعي: أجهزة أضعف ونت أبطأ. بص على الـ p75 مش المتوسط، لأن ده اللي جوجل بيقيس بيه.

لو الـ LCP طلع نص مش صورة، يبقى [[fetchPriority]] على الصورة مش هيفرق، ركّز على الفونت والـ CSS. ولو CLS عالي، دوّر على صورة من غير [[width]] و [[height]] أو banner بيظهر فوق المحتوى بعد التحميل.`,
          solCode: R`// app/api/vitals/route.ts: استقبل الأرقام (وابعتها لـ PostHog أو خزّنها)
export async function POST(req: Request) {
  const m = await req.json(); // { name: "LCP", value: 2310.5, rating: "good", page: "/courses/sql" }
  console.log(JSON.stringify({ msg: "web-vital", ...m }));
  return new Response(null, { status: 204 });
}`
        }
      ]
    },
    {
      t: "المراقبة والباك أب",
      l: 3,
      n: "تعرف إن فيه مشكلة قبل العميل، وتعرف الناس بتستخدم المنتج إزاي، وترجع لو القاعدة ضاعت",
      items: [
        {
          cmd: "Sentry",
          title: "تعرف بالخطأ قبل ما العميل يكلمك",
          desc: R`أداة تتبع الأخطاء بتمسك أي error مش متوقع، في السيرفر أو في المتصفح، ومعاه الـ stack والطلب وإيه اللي حصل قبله. وبتجمّع الأخطاء المتشابهة في issue واحد، وتبعتلك تنبيه. في Node بتتعمل في ملف [[instrument.mjs]] بيتحمّل قبل التطبيق: [[node --import ./instrument.mjs dist/server.js]].

وفي Next.js: [[npx @sentry/wizard@latest -i nextjs]] بيظبط كل حاجة.`,
          example: R`import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
});

worker.on("failed", (job, err) => Sentry.captureException(err, { tags: { queue: job?.queueName, job: job?.name } }));`,
          try: R`اعمل route تجربة بيرمي error، شغّله مرة، وشوف الـ issue في Sentry ومعاه environment و release. بعدين امسح الـ route. وظبط alert يوصلك على Telegram أو الإيميل لما يظهر issue جديد في production.`,
          flag: "script",
          deep: {
            why: "من غير تتبع للأخطاء، أول مرة هتعرف فيها بالمشكلة لما عميل يكلمك، وده لو كلمك أصلًا. أغلب الناس بتقفل وتمشي. واللوجات لوحدها محتاجة حد يدوّر فيها، إنما تتبع الأخطاء بيجيلك لحد عندك.",
            how: R`الـ init لازم يحصل قبل أي import تاني، عشان الـ SDK يلحق يراقب http و express والقاعدة. عشان كده [[--import]]. وفي النسخ الحالية من SDK، أخطاء Express بتتمسك لوحدها بعد الـ init بالطريقة دي. النسخ الأقدم كانت محتاجة [[Sentry.setupExpressErrorHandler(app)]]، فراجع وثائق نسختك.

[[environment]] بيفصل أخطاء staging عن production. و [[release]] (رقم الـ commit) بيوريك الخطأ بدأ مع أنهي deploy، وبيربط الـ source maps. والـ source maps للواجهة بتترفع في CI، عشان الـ stack يبان بأسماء الملفات الحقيقية مش الكود المضغوط.

[[tracesSampleRate: 0.1]] معناها إنه بيقيس أداء ١٠٪ من الطلبات بس، عشان الكوتة والتكلفة. و [[sendDefaultPii: false]] معناها إنه مش بيبعت IPs و cookies. والـ [[Sentry.setUser({ id })]] في requireAuth بـ id بس، من غير إيميل.

والأخطاء اللي بتحصل برّه الـ requests، زي الـ jobs، لازم تبعتها بنفسك بـ [[captureException]]. المثال بيعمل ده لأي job فشلت.

التنبيهات: issue جديد، أو issue رجع بعد ما اتقفل (regression)، أو عدد الأخطاء زاد فجأة. وخليها قليلة، لأن التنبيهات الكتير محدش بيقراها. وفيه بديل self-hosted متوافق مع نفس الـ SDK اسمه GlitchTip.`,
            when: "قبل الإطلاق. ومع كل deploy اتأكد إن الـ release اتسجّل.",
            mistakes: R`في المشاريع الحقيقية اللي راجعناها، Sentry كان في مشروع واحد بس. وفي المشروع ده كان فيه route عام بيرمي error عن قصد للتجربة، وفضل في الإنتاج. ومن الغلطات كمان: إنك تبعت بيانات شخصية (إيميلات، أو bodies فيها باسوردات). أو متسجّلش release فمتعرفش أنهي deploy كسر الحاجة. أو تنبيه على كل خطأ فتبطل تبص عليهم.`
          },
          lines: [
            "SDK بتاع Node.",
            "الإعداد، ولازم يتحمّل قبل أي حاجة تانية:",
            "عنوان المشروع في Sentry، من البيئة.",
            "staging ولا production.",
            "رقم الـ commit، عشان تعرف الخطأ بدأ مع أنهي deploy.",
            "قيس أداء ١٠٪ من الطلبات بس.",
            "متبعتش IPs و cookies.",
            "قفلة.",
            "في ملف الـ worker: أي job فشلت، ابعتها لـ Sentry باسم الـ queue والـ job."
          ],
          sol: R`بعد ما تفتح الـ route مرة، في Sentry تحت Issues هيظهر issue جديد عنوانه نص الخطأ (مثلًا [[Error: sentry test]])، وجواه الـ stack trace بأسماء ملفاتك، وفي الـ tags [[environment: staging]] و [[release]] بقيمة الـ GIT_SHA. ولو فتحت الـ route ١٠ مرات، هيفضل issue واحد والـ Events بقوا ١٠، لأن Sentry بيجمع الأخطاء اللي ليها نفس الـ stack.

لو مفيش حاجة ظهرت: اتأكد إن [[SENTRY_DSN]] واصل (اطبع [[Boolean(process.env.SENTRY_DSN)]])، وإن [[Sentry.init]] بيتنادي قبل ما express يتعمل import (في ملف [[instrument.js]] بيتحمّل بـ [[node --import ./instrument.js]])، وإنك سجّلت [[Sentry.setupExpressErrorHandler(app)]] قبل الـ errorHandler بتاعك. من غيره، الـ errorHandler بيبلع الخطأ ويرد 500، و Sentry ميعرفش.

الـ alert: في Alerts اعمل rule من نوع Issue alert، شرطها «A new issue is created» والفلتر [[environment = production]]، والـ action إيميل أو integration. وجرّبه بخطأ في staging بعد ما تشيل الفلتر مؤقتًا. ولو الـ stack فيه أسماء ملفات غريبة زي [[dist/index.js:1:23456]]، محتاج ترفع الـ source maps.`,
          solCode: R`// instrument.js: node --import ./instrument.js dist/server.js
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_DSN, environment: process.env.APP_ENV, release: process.env.GIT_SHA, tracesSampleRate: 0.1, sendDefaultPii: false });

// app.ts
import * as Sentry from "@sentry/node";
app.get("/debug-sentry", () => { throw new Error("sentry test"); });
// ... الـ routes
Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);`
        },
        {
          cmd: "structured logs",
          title: "لوج تقدر تدوّر فيه",
          desc: R`اللوج يبقى JSON، سطر لكل حدث، وفيه حقول تقدر تفلتر بيها: المستوى، والـ request id، والـ orderId. pino بيكتب JSON بسرعة على stdout، و pino-http بيسجّل كل طلب بمدته والـ status بتاعه، وبيدّي كل طلب id ترجع بيه للمشكلة.

وأي باسورد أو توكن بيتشال من اللوج قبل ما يتكتب (redact).`,
          example: R`import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.token"],
});
app.use(pinoHttp({
  logger,
  genReqId: (req, res) => { const id = req.headers["x-request-id"] ?? crypto.randomUUID(); res.setHeader("x-request-id", id); return id; },
}));

req.log.info({ orderId: order.id, amountCents: order.amountCents }, "order created");`,
          try: R`اعمل طلب، وخد الـ [[x-request-id]] من الرد، ودوّر عليه في اللوج بـ [[grep]] و [[jq]]. بعدين ابعت login وتأكد إن الباسورد مش ظاهر. وفي التطوير، شغّل السيرفر ووجّه الناتج لـ [[pino-pretty]] عشان يتقري.`,
          flag: "script",
          deep: {
            why: "لما عميل يقول «الدفع وقع الساعة ٣»، محتاج تلاقي طلبه بالظبط في وسط مليون سطر. النص الحر زي «something went wrong» مبيتدوّرش فيه. الـ JSON بحقول ثابتة بيتفلتر بأمر واحد.",
            how: R`المستويات: [[fatal]] و [[error]] و [[warn]] و [[info]] و [[debug]]. في الإنتاج info، ولو بتدوّر على مشكلة debug لفترة. و pino بيكتبهم أرقام (error بـ 50، و info بـ 30).

الـ request id هو الخيط اللي بيربط كل حاجة. Nginx ممكن يعمله ([[$request_id]]) ويبعته في header، أو التطبيق بيعمله. بيرجع للـ client في header الرد، وبيتكتب مع كل سطر لوج للطلب ده. وحطه كمان في داتا أي job بتتعمل من الطلب، وفي رد الخطأ، عشان الدعم يطلبه من العميل.

pino بيكتب على stdout بسرعة ومن غير ما يوقف الـ event loop، و Docker أو المنصة بيجمعوا. في التطوير [[pino-pretty]] بيخليه مقروء. وفي الإنتاج بتبعت اللوجات لمكان تدوّر فيه: Grafana Loki، أو Better Stack، أو Axiom. وخلي بالك إن ليها تكلفة بالحجم ومدة الاحتفاظ. وحدود حجم لوجات Docker في تاب «Docker».

سجّل الأحداث بالـ ids (orderId، و userId)، مش الداتا كلها. وممنوع تسجّل bodies طلبات الـ auth، أو التوكنات، أو محتوى رسايل المستخدمين.`,
            when: "من أول يوم. واتفق على أسماء الحقول (orderId مش order_id في مكان و id في مكان تاني).",
            mistakes: R`في مشروع حقيقي، الـ logger كان بيعمل [[fs.appendFileSync]] مع كل طلب. ده بيوقف الـ event loop لحد ما الديسك يكتب. وكان بيسجّل الـ status code قبل ما الرد يتبعت، فكل الطلبات طالعة 200 في اللوج. وكان بيعمل rotation بإيده. pino-http بيستنى الـ response يخلص. وفي مشروع تاني كان محتوى رسايل الشات بيتكتب في اللوج. في المقابل، مشروع Python كان عامل حاجة صح: لوج JSON فيه request id، و regex بيشيل توكنات البوت قبل الكتابة.`
          },
          lines: [
            "pino: logger سريع بيكتب JSON.",
            "middleware بيسجّل كل طلب HTTP.",
            "الـ logger الأساسي...",
            "...المستوى من البيئة، والافتراضي info...",
            "...وأي حقل من دول بيتشال قبل الكتابة.",
            "قفلة.",
            "سجّل كل طلب...",
            "...بنفس الـ logger...",
            "...وكل طلب ليه id: من الـ header لو جاي من Nginx، أو جديد. وبيرجع للـ client في الرد.",
            "قفلة.",
            "جوه أي route: سطر بحقول تقدر تدوّر بيها، والـ request id بيتحط لوحده."
          ],
          sol: R`كل سطر في اللوج JSON واحد. الطلب اللي خدت الـ [[x-request-id]] بتاعه هتلاقيله سطرين على الأقل: [[{"msg":"order created","orderId":"o_1",...}]] و [[{"msg":"request completed","res":{"statusCode":201},...}]]، وفي الاتنين [[req.id]] هو نفس القيمة. ده اللي بيربط كل سطور الطلب الواحد ببعض.

الـ login: الـ header بتاع [[authorization]] هيظهر [[[Redacted]]]، ولو بتعمل log لـ [[{ body: req.body }]] هتلاقي [["password":"[Redacted]"]]. و [[grep -c]] على الباسورد الحقيقي في ملف اللوج لازم يرجع 0. خلي بالك إن [[*.password]] بتمسك مستوى واحد بس: [[{ body: { password } }]] بتتمسك، بس [[{ data: { user: { password } } }]] لأ. عشان كده متعملش log للـ body كله أصلًا.

pino-pretty بيحوّل كل سطر لشكل زي [[[22:21:11.085] INFO (20726): request completed]] وتحته الحقول. ده للتطوير بس، الإنتاج JSON خام عشان أدوات البحث تقراه.`,
          solCode: R`RID=$(curl -s -D - -o /dev/null -X POST localhost:4000/orders -H "Authorization: Bearer $TOKEN" | grep -i x-request-id | cut -d' ' -f2 | tr -d '\r')
grep "$RID" app.log | jq -c '{msg, id: .req.id, orderId, status: .res.statusCode}'

curl -s -o /dev/null -H "Content-Type: application/json" -d '{"email":"a@b.c","password":"hunter22"}' localhost:4000/auth/login
grep -c hunter22 app.log        # 0

node dist/server.js | npx pino-pretty`
        },
        {
          cmd: "health و uptime",
          title: "السيرفر عايش؟ والقاعدة عايشة؟",
          desc: R`endpoint اسمه [[/healthz]] بيقول «الـ process شغال» من غير ما يلمس أي حاجة تانية. و [[/readyz]] بيتأكد إن القاعدة و Redis بيردوا. الأول بيستخدمه الـ orchestrator (Kubernetes، أو Docker Swarm، أو Docker مع أداة زي autoheal) عشان يعمل restart لو السيرفر هنج. Docker لوحده بيعلّم الـ container إنه unhealthy بس. والتاني بيستخدمه الـ load balancer عشان ميبعتش طلبات لنسخة مش جاهزة.

وبرّه السيرفر خالص، خدمة uptime بتضرب رابطك كل دقيقة من كذا مكان، وتبعتلك لو وقع.`,
          example: R`app.get("/healthz", (req, res) => res.json({ ok: true, version: process.env.GIT_SHA }));
app.get("/readyz", async (req, res) => {
  try {
    await db.$queryRaw$__btSELECT 1$__bt;
    await redis.ping();
    res.json({ ok: true });
  } catch (e) {
    req.log.error(e, "readiness failed");
    res.status(503).json({ ok: false });
  }
});`,
          try: R`وقّف Redis بـ [[docker stop]] واطلب الاتنين. [[/healthz]] لازم يفضل 200، و [[/readyz]] يرجع 503 من غير أي تفاصيل. بعدين سجّل رابطك في خدمة uptime مجانية، واقفل السيرفر، وشوف التنبيه وصل بعد قد إيه.`,
          flag: "script",
          deep: {
            why: "السيرفر ممكن يكون «شغال» والقاعدة واقعة، فكل طلب بيرجع 500. وممكن السيرفر كله يقع الساعة ٢ بالليل، ومحدش يعرف لحد الصبح. الـ health checks بتخلي الأدوات تعالج لوحدها، والـ uptime monitor بيصحّيك.",
            how: R`فيه فرق بين liveness و readiness، وده مهم. الـ liveness ([[/healthz]]) لازم يبقى بسيط جدًا. لو خليته يسأل القاعدة، والقاعدة هنجت ثانيتين، الـ orchestrator (Kubernetes أو Swarm أو autoheal) هيعمل restart لكل نسخ التطبيق مع بعض، وتبقى المشكلة أكبر. والـ readiness ([[/readyz]]) هو اللي بيسأل التوابع، ولو فشل، النسخة بتخرج من الـ load balancer مؤقتًا بس، من غير restart.

في compose بتعمل [[healthcheck]] بيضرب [[/healthz]]، وتقدر تستخدم [[depends_on]] بشرط [[service_healthy]]. التفاصيل في تاب «Docker».

خدمة الـ uptime (زي UptimeRobot أو Better Stack، أو Uptime Kuma لو عايز تشغّلها بنفسك) لازم تبقى برّه السيرفر، عشان لو السيرفر وقع هي لسه شغالة. بتضرب الرابط العام كل دقيقة، وتبعت تنبيه بعد فشلين ورا بعض (Telegram، أو SMS، أو إيميل). وخليها تراقب كمان انتهاء شهادة SSL وتجديد الدومين.

وفيه نوع تاني اسمه heartbeat، للـ jobs. الـ job بتضرب رابط لما تخلص بنجاح، ولو الرابط محدش ضربه في الميعاد، يجيلك تنبيه. ده أهم حاجة لسكربت الباك أب، لأن السكربت اللي بيفشل في صمت أخطر حاجة.`,
            when: "قبل الإطلاق. والـ heartbeat مع أول cron job.",
            mistakes: R`في مشروعين حقيقيين، الـ health endpoint كان بيرجّع رسالة خطأ القاعدة زي ما هي للي بيطلبه. رد عام ([[{ ok: false }]]) وتفاصيل الخطأ في اللوج. ومن الغلطات كمان: إنك تحط الـ liveness بيسأل القاعدة فتعمل restart storm. أو تراقب من نفس السيرفر. أو تنبيهات بتروح إيميل محدش بيفتحه.`
          },
          lines: [
            "الـ process شغال. من غير أي توابع، ومعاه رقم النسخة.",
            "جاهز يستقبل طلبات؟",
            "جرّب...",
            "...القاعدة بترد...",
            "...و Redis بيرد...",
            "...يبقى جاهز.",
            "لو أي واحد فشل...",
            "...سجّل التفاصيل في اللوج...",
            "...ورد 503 عام، من غير أي تفاصيل داخلية.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`وRedis شغال: الاتنين [[200]]، و [[/healthz]] بيرجع [[{"ok":true,"version":"abc123"}]]. بعد [[docker stop]] للـ Redis: [[/healthz]] لسه [[200]] بنفس الرد، و [[/readyz]] بيرجع [[503]] و [[{"ok":false}]] بس. تفاصيل الخطأ (connection refused والـ host والـ port) موجودة في اللوج تحت [["readiness failed"]]، مش في الرد.

خلي بالك: مع إعدادات ioredis الافتراضية، [[redis.ping()]] وRedis واقع ممكن يفضل مستني لحد ما يعيد المحاولة كذا مرة، فالـ [[/readyz]] ياخد ثواني قبل ما يرد. الأفضل عميل للـ health بـ [[enableOfflineQueue: false]] و [[maxRetriesPerRequest: 1]]، أو [[Promise.race]] مع timeout ثانية.

خدمة الـ uptime (UptimeRobot أو Better Stack مثلًا) بتفحص كل دقيقة أو خمسة حسب الخطة، ومعظمها بيستنى فحصين أو تلاتة فاشلين قبل ما تبعت، فالتنبيه بيوصل بعد من دقيقة لـ ١٠ تقريبًا. الرقم ده هو أقل وقت هتعرف فيه إن السيرفر وقع. سجّل [[/healthz]] مش [[/readyz]]، إلا لو عايز تتنبّه لما القاعدة تقع كمان.`
        },
        {
          cmd: "PostHog",
          title: "الناس بتستخدم المنتج إزاي فعلًا",
          desc: R`اللوجات بتقول السيستم عمل إيه. أما الـ product analytics فبتقول المستخدمين عملوا إيه: كام واحد فتح صفحة كورس، وكام ضغط «اشتري»، وكام دفع فعلًا، وكام اتفرج على أول درس. أدوات زي PostHog بتجمّع الأحداث دي وتعملك منها funnels و retention.

الأحداث المهمة، زي الدفع، بتتبعت من السيرفر. والضغطات والصفحات بتتبعت من المتصفح.`,
          example: R`import { PostHog } from "posthog-node";

export const posthog = new PostHog(config.POSTHOG_KEY, { host: "https://eu.i.posthog.com" });

posthog.capture({
  distinctId: order.userId,
  event: "course purchased",
  properties: { courseId: order.courseId, amount: order.amountCents / 100, currency: "EGP" },
});

process.on("SIGTERM", async () => { await posthog.shutdown(); });`,
          try: R`عرّف ٤ أحداث للـ core loop: [[course viewed]]، و [[checkout started]]، و [[course purchased]]، و [[lesson completed]]. ابعتهم، واعمل funnel في PostHog، وشوف الناس بتقع في أنهي خطوة.`,
          flag: "script",
          deep: {
            why: "من غير أرقام، كل قرار في المنتج بيبقى تخمين. ممكن تقضي شهر تبني ميزة، والمشكلة الحقيقية إن ٧٠٪ من الناس بيقفلوا صفحة الدفع. الـ funnel بيوريك فين الناس بتقع بالظبط.",
            how: R`ابدأ بأحداث قليلة وواضحة حوالين الـ core loop، وسمّيها بنفس الطريقة: «اسم وفعل»، small، وبصيغة الماضي. الـ funnel بيوريك النسبة بين كل خطوة والتانية. والـ activation بيجاوب على سؤال: كام واحد اتفرج على أول درس في أول ٢٤ ساعة؟ ودي أحسن علامة إنه هيكمل. والـ retention بيوريك كام واحد رجع بعد أسبوع وبعد شهر.

أحداث الفلوس من السيرفر: مانع الإعلانات بيوقف سكربتات الـ analytics في المتصفح، والسيرفر هو اللي عارف الحقيقة. أما الصفحات والضغطات فمن posthog-js في المتصفح. وبعد الـ login، [[posthog.identify(userId)]] بيربط اللي عمله قبل ما يسجّل بحسابه.

[[shutdown]] مهم، لأن المكتبة بتجمّع الأحداث وتبعتها على دفعات. لو الـ process قفلت من غير shutdown، آخر أحداث بتضيع.

والخصوصية: ابعت ids مش إيميلات أو أرقام تليفونات. ولو عندك زوار من أوروبا، محتاج موافقة على الـ cookies، وسيرفرات أوروبية (الـ host في المثال) أو تشغّلها بنفسك. والـ session replay لازم يخفي الـ inputs.

ونفس الأداة بتعمل feature flags و A/B tests، يعني تفتح ميزة لـ ١٠٪ من الناس وتقارن.`,
            when: "من الإطلاق. الأحداث اللي متسجّلتش من الأول مش هتقدر تجيبها بعدين.",
            mistakes: "إنك تعتمد على autocapture بس من غير أحداث بأسماء واضحة، فيبقى عندك داتا كتير ومفيش إجابة. أو نفس الحدث بأسماء مختلفة ([[purchase]] و [[Course Bought]]). أو تبعت إيميلات وتليفونات. أو أحداث الفلوس من المتصفح بس."
          },
          lines: [
            "SDK بتاع السيرفر.",
            "العميل بمفتاح المشروع، على سيرفرات أوروبا.",
            "سجّل حدث:",
            "مين (id المستخدم، مش إيميله).",
            "اسم الحدث: اسم وفعل، بصيغة ثابتة.",
            "تفاصيل هتفلتر بيها بعدين.",
            "قفلة.",
            "لما السيرفر يقفل، ابعت الأحداث اللي لسه متبعتتش."
          ],
          sol: R`بعد ما تبعت الأحداث، هتلاقيها في Activity (أو Events) بعد ثواني. الـ funnel بالترتيب [[course viewed]] ← [[checkout started]] ← [[course purchased]] ← [[lesson completed]]، وكل خطوة جنبها نسبة اللي كملوا. المهم إن [[distinctId]] يبقى نفسه في الأربعة للمستخدم الواحد، وإلا الـ funnel هيطلع صفر من خطوة لخطوة.

القراية المتوقعة لمنتج جديد: أكبر وقعة غالبًا بين viewed و checkout started (السعر أو صفحة الكورس مش مقنعة)، والتانية بين checkout started و purchased (مشكلة في الدفع أو البوابة). لو الوقعة التانية كبيرة، روح لـ Sentry ولوجات الـ webhook قبل ما تغيّر التصميم.

أشهر غلطة: أحداث الواجهة بـ anonymous id، وأحداث السيرفر بـ userId، فالمستخدم بيبان شخصين. نادي [[posthog.identify(user.id)]] في الواجهة بعد الدخول. وغلطة تانية: [[course purchased]] من صفحة الـ redirect بدل الـ webhook، فالأرقام بتتضرب في المرات اللي الناس بتعمل فيها refresh.`,
          solCode: R`// الواجهة (posthog-js)
posthog.capture("course viewed", { courseId });
posthog.capture("checkout started", { courseId, amount: priceCents / 100 });

// السيرفر: من markPaid بعد ما count === 1 بس
posthog.capture({ distinctId: order.userId, event: "course purchased", properties: { courseId: order.courseId, amount: order.amountCents / 100, currency: "EGP" } });

// السيرفر: لما الطالب يخلّص درس
posthog.capture({ distinctId: req.user.id, event: "lesson completed", properties: { courseId, lessonId } });`
        },
        {
          cmd: "feature flags",
          title: "feature flags عمليًا: ميزة مقفولة في الإنتاج، وتفتحها لنسبة من الناس",
          desc: R`الـ feature flag شرط في الكود بيقرر الميزة تظهر ولا لأ، من غير deploy جديد. بيفصل «الكود نزل» عن «الناس شافت الميزة»: الكود بيتدمج في main ويتنشر مقفول، وبعدين تفتحه للفريق، وبعدين لـ ١٠٪ من المستخدمين، وبعدين للكل. ولو حصلت مشكلة تقفله في ثانية.

فيه ٣ مستويات. الأبسط متغير بيئة (مقفول أو مفتوح لكل الناس، ومحتاج restart). وبعده جدول flags في القاعدة (أو Redis) فيه نسبة وقايمة tenants. وبعده أداة زي PostHog (نفس اللي في درس «PostHog») أو Unleash أو GrowthBook، بتديك لوحة ونسب و A/B tests.`,
          example: R`export async function isEnabled(key, { userId, tenantId } = {}) {
  const flag = await flagCache.get(key);
  if (!flag || !flag.enabled) return false;
  if (tenantId && flag.tenantIds.includes(tenantId)) return true;
  if (!userId) return flag.percent >= 100;
  const h = crypto.createHash("sha256").update($__bt$__{key}:$__{userId}$__bt).digest();
  return h.readUInt32BE(0) % 100 < flag.percent;
}

router.get("/checkout/config", requireAuth, async (req, res) => {
  const newCheckout = await isEnabled("new-checkout", { userId: req.user.id, tenantId: req.tenant?.id });
  res.json({ data: { newCheckout } });
});

export const isEnabledPH = (key, userId) => posthog.isFeatureEnabled(key, userId);`,
          try: R`اعمل جدول [[FeatureFlag]] (key unique، و enabled، و percent، و tenantIds، و updatedAt، و owner، و removeBy). وابعت ١٠٠٠٠ userId مختلف لـ [[isEnabled]] بـ percent 10، وعد كام واحد اتفتح له. بعدين ارفع النسبة لـ 30: هل كل اللي كانوا جوه الـ 10 لسه جوه؟ وجرّب نفس الـ userId على flagين مختلفين بنفس النسبة.`,
          flag: "script",
          deep: {
            why: "من غير flags، الميزة الكبيرة بتفضل في branch أسابيع، وبتبعد عن main كل يوم، والـ merge في الآخر بيبقى وجع. والنشر بيبقى لحظة مخيفة: الكل بيشوف الميزة مرة واحدة، ولو فيها مشكلة الحل rollback للنسخة كلها. الـ flag بيخليك تنشر كل يوم وتفتح بالتدريج وتقفل من غير deploy.",
            how: R`النسبة لازم تبقى ثابتة لنفس الشخص: لو اتحسبت بـ [[Math.random()]]، المستخدم هيشوف الميزة في طلب وميشوفهاش في اللي بعده. عشان كده بنعمل hash لـ [[key:userId]] وناخد باقي القسمة على ١٠٠. نفس الشخص بياخد نفس الرقم دايمًا، وبما إن الـ key جزء من الـ hash، الـ ١٠٪ بتوع flag مش هما نفس الـ ١٠٪ بتوع flag تاني. ولما النسبة تزيد من ١٠ لـ ٣٠، اللي كانوا جوه بيفضلوا جوه (رقمهم أقل من ١٠ فأكيد أقل من ٣٠).

[[tenantIds]]: في SaaS بتفتح الميزة لعملاء معينين الأول (beta customers)، أو لـ workspace الفريق بتاعك. وده أهم من النسبة في B2B، لأن نص الشركة شايف الميزة ونصها لأ بيعمل لخبطة.

الكاش: الـ flags بتتسأل مع كل طلب، فبتتقري من ذاكرة بتتحدث كل ٣٠ ثانية (أو Redis pub/sub لما تتغير). وأدوات زي PostHog بتعمل local evaluation: بتنزّل تعريفات الـ flags وتحسب في السيرفر بتاعك من غير طلب شبكة لكل سؤال (محتاج personal API key أو feature flags secure key حسب نسخة الـ SDK، فارجع للتوثيق).

الواجهة بتسأل السيرفر (زي [[/checkout/config]])، أو تاخد الـ flags مع بيانات المستخدم أول ما الصفحة تفتح. ومتحطش القرار في الواجهة لوحدها لو الميزة فيها صلاحيات أو فلوس: السيرفر برضه لازم يتأكد.

تنضيف الـ flags: كل flag هو [[if]] زيادة وطريقين لازم يتختبروا. بعد ما الميزة توصل ١٠٠٪ وتستقر أسبوعين، امسح الـ flag والكود القديم. عشان كده الجدول فيه [[owner]] و [[removeBy]]، ومراجعة شهرية للـ flags اللي فات معادها.

أنواعها: release flag (مؤقت، لميزة جديدة)، و kill switch (دايم، يقفل حاجة تقيلة وقت الأزمات زي البحث أو التوصيات)، و experiment (A/B بقياس في PostHog)، و permission flag (ميزة لخطة معينة، ودي أحسن تبقى في جدول الخطط مش flags).`,
            when: "ميزة كبيرة هتاخد أكتر من كام يوم، أو ميزة خطيرة (الدفع، أو الـ auth)، أو تجربة محتاج تقيس أثرها. ومش لكل تغيير صغير.",
            mistakes: R`[[Math.random()]] بدل hash ثابت. أو flags ملهاش صاحب ولا ميعاد تتشال، فبعد سنة عندك ٢٠٠ flag محدش عارف أنهي فيهم شغال. أو flag بيتسأل من القاعدة مع كل طلب من غير كاش. أو القرار في الواجهة بس. أو flags متداخلة (flag جوه flag) فبقى فيه ٨ تركيبات محدش اختبرها. وفي الانترفيو: «الفرق بين feature flag و canary deploy؟» الـ canary بيوجّه نسبة من الترافيك لنسخة جديدة من الكود كله، والـ flag بيفتح ميزة واحدة جوه نفس النسخة لمستخدمين بعينهم.`
          },
          lines: [
            "الدالة الوحيدة اللي الكود بيسأل بيها.",
            "تعريف الـ flag من كاش في الذاكرة بيتحدث كل شوية.",
            "مش موجود أو مقفول؟ لأ.",
            "الـ workspace في قايمة المسموحين؟ أيوه.",
            "مفيش مستخدم (طلب مجهول)؟ مفتوح بس لو ١٠٠٪.",
            "hash لاسم الـ flag مع رقم المستخدم...",
            "...ورقم من 0 لـ 99 ثابت للشخص ده. أقل من النسبة؟ مفتوح.",
            "قفلة.",
            "الواجهة بتسأل السيرفر إيه الميزات المفتوحة.",
            "اسأل عن الـ flag للمستخدم والـ workspace.",
            "رجّع النتيجة، والواجهة تعرض الـ checkout الجديد أو القديم.",
            "قفلة.",
            "نفس الفكرة بـ PostHog (الـ client من درس «PostHog»): النسب والقوايم بتتظبط من اللوحة."
          ],
          sol: R`مع percent 10 على ١٠٠٠٠ مستخدم: حوالي ١٠٠٠ (في تجربة فعلية طلع ١٠٥٩، يعني ١٠.٦٪). الفرق الصغير طبيعي لأنه توزيع hash مش عد مظبوط.

لما ترفعها لـ 30: كل اللي كانوا جوه الـ 10 لسه جوه (صفر خرجوا)، لأن رقمهم أقل من 10 فأكيد أقل من 30. وده اللي بيخلي الـ rollout التدريجي مريح: محدش بيشوف الميزة وبعدين تختفي منه.

نفس الـ userId على flagين: ممكن يبقى جوه واحد وبرّه التاني، لأن الـ key جزء من الـ hash. لو شلت الـ key من الـ hash، نفس الـ ١٠٪ من الناس هيبقوا حقل تجارب لكل الميزات.

الغلطة الشائعة: [[h.readUInt32BE(0) % 100 <= percent]] (بـ =)، فـ percent 0 بيفتح لـ ١٪ من الناس.`
        },
        {
          cmd: "backups و DR",
          title: "لو القاعدة راحت النهارده، ترجع في قد إيه؟",
          desc: R`الباك أب اللي عمرك ما رجّعته مش باك أب، ده أمل. كل يوم نسخة من القاعدة بـ [[pg_dump]]، متشفّرة، على مكان برّه السيرفر. وكل شهر رجّع نسخة على قاعدة فاضية وتأكد إنها سليمة.

وفيه رقمين لازم تحددهم. RPO: ممكن تخسر داتا قد إيه (يوم؟ ساعة؟). و RTO: هترجع شغال في قد إيه.`,
          example: R`pg_dump "$DATABASE_URL" -Fc -f "backup-$(date +%F).dump"
rclone copy "backup-$(date +%F).dump" offsite:myapp-backups/db/
createdb myapp_restore_test
pg_restore -d myapp_restore_test --no-owner "backup-$(date +%F).dump"
psql -d myapp_restore_test -c 'SELECT count(*) FROM "Order";'`,
          try: R`اعمل الخطوات دي على قاعدة التجربة. احسب الوقت من أول أمر لآخر أمر، وده الـ RTO بتاعك الحقيقي. قارن عدد الطلبات في النسخة بالأصل. بعدين امسح النسخة المحلية ونزّلها من المكان البعيد ورجّعها تاني.`,
          deep: {
            why: "القاعدة بتضيع لأسباب كتير: ديسك باظ، أو migration غلط، أو [[DELETE]] من غير WHERE، أو اختراق، أو المزوّد قفل الحساب. في منصة كورسات، ده معناه طلبات مدفوعة واشتراكات ضاعت، وناس دفعت ومحدش عارف مين.",
            how: R`[[-Fc]] صيغة custom مضغوطة، و pg_restore بيقدر يرجّع منها جدول واحد، أو يشتغل بالتوازي بـ [[-j]]. ونسخة [[pg_dump]] لازم تكون نفس نسخة السيرفر أو أحدث.

الـ dump اليومي معناه RPO بـ ٢٤ ساعة، يعني ممكن تخسر يوم كامل. لو ده كتير، فيه PITR (point-in-time recovery). القاعدة بتحفظ الـ WAL باستمرار، فتقدر ترجع لأي دقيقة. القواعد المُدارة بتقدمه في خطط معينة، وده سبب قوي تدفع فيها.

قاعدة 3-2-1: ٣ نسخ، على نوعين مختلفين من التخزين، وواحدة منهم برّه المكان. والنسخة برّه تبقى متشفّرة (بـ openssl أو age، وتفاصيلها في تاب «الأمان»)، والباسورد يتقري من ملف أو متغير بيئة، مش من سطر الأوامر. والاحتفاظ مثلًا ٧ يومي، و ٤ أسبوعي، و ١٢ شهري.

وفيه حاجات غير القاعدة لازم يتعملها باك أب: الملفات المرفوعة (فعّل versioning على الـ bucket)، والأسرار (.env في password manager)، وإعدادات DNS.

واختبار الرجوع يتأتمت: job شهري بيرجّع آخر نسخة على قاعدة فاضية، ويعد صفوف الجداول المهمة، ويضرب heartbeat لو نجح. والـ DR runbook: خطوات مكتوبة إزاي تبني سيرفر من الصفر وترجّع القاعدة وتغيّر الـ DNS. جرّبها مرة، والوقت اللي هتاخده هو الـ RTO الحقيقي. سكربتات حقيقية للباك أب في تاب «من مشاريعي»، و psql في تاب «PostgreSQL».`,
            when: "قبل أول مستخدم حقيقي. واختبار الرجوع كل شهر، وبعد أي تغيير في طريقة الباك أب.",
            mistakes: R`إن الباك أب يبقى على نفس السيرفر أو نفس الديسك. أو متجرّبش الرجوع أبدًا. أو السكربت يفشل في صمت شهور، والحل heartbeat monitor. أو تنسى الملفات المرفوعة. وفي مشروع حقيقي، الباك أب كان ممتاز: pg_dump متشفّر ومرفوع برّه السيرفر. بس باسورد التشفير كان بيتبعت في سطر الأوامر، فأي حد على السيرفر يقدر يشوفه في [[ps]]. الحل [[-pass file:]] أو متغير بيئة.`
          },
          lines: [
            "نسخة من القاعدة بصيغة custom مضغوطة، واسمها فيه التاريخ.",
            "ارفعها لمكان برّه السيرفر (S3 أو R2 أو غيره) بـ rclone.",
            "اعمل قاعدة فاضية للتجربة.",
            "رجّع النسخة عليها، من غير ما يحاول يغيّر ownership.",
            "اتأكد إن الداتا رجعت فعلًا: عد الطلبات وقارنها بالأصل."
          ],
          sol: R`على قاعدة تجربة صغيرة الخطوات كلها بتاخد أقل من ثانية (جربناها: [[real 0m0.381s]] والملف ١٩ كيلو). ده مش الـ RTO الحقيقي بتاعك: القاعدة الحقيقية بـ ١٠ جيجا ممكن تاخد نص ساعة أو أكتر في الـ restore لوحده. عشان كده قيسه على نسخة بحجم الإنتاج، وضيف عليه وقت إنك تعرف إن فيه مشكلة وتقرر ترجع.

الـ count في النسخة لازم يساوي الأصل وقت الـ dump بالظبط. لو الأصل زاد بعدها، الفرق ده هو الداتا اللي هتضيع لو رجعت من النسخة دي، وده الـ RPO بتاعك (من آخر backup لحد الوقعة).

مشاكل شائعة: [[pg_dump: error: aborting because of server version mismatch]] يعني الـ pg_dump عندك أقدم من السيرفر، استخدم نفس النسخة أو أحدث. و [[pg_restore]] بيطلّع warnings عن الـ owner لو نسيت [[--no-owner]]. ولو الـ rclone مش متظبط، [[rclone config]] الأول. والنسخة اللي منزلتهاش ورجّعتها بإيدك، اعتبرها مش موجودة.`,
          solCode: R`time (
  pg_dump "$DATABASE_URL" -Fc -f backup.dump &&
  rclone copy backup.dump offsite:myapp-backups/db/ &&
  rm backup.dump &&
  rclone copy offsite:myapp-backups/db/backup.dump . &&
  createdb myapp_restore_test &&
  pg_restore -d myapp_restore_test --no-owner backup.dump &&
  psql -d myapp_restore_test -c 'SELECT count(*) FROM "Order";'
)
psql "$DATABASE_URL" -c 'SELECT count(*) FROM "Order";'
dropdb myapp_restore_test`
        }
      ]
    },
    {
      t: "scaling والتكلفة والتسليم",
      l: 3,
      n: "المستخدمين زادوا: تكبّر بأنهي ترتيب، والفاتورة الشهرية جاية منين، وإزاي تسلّم مشروع حد تاني يقدر يشغّله",
      items: [
        {
          cmd: "scaling path",
          title: "المستخدمين زادوا ١٠ أضعاف: تعمل إيه بالترتيب",
          desc: R`قيس الأول وشوف فين عنق الزجاجة. بعدين صلّح الكود (indexes، و N+1، وكاش). بعدين كبّر السيرفر (vertical). وبعدين شغّل كذا نسخة ورا load balancer (horizontal).

الـ horizontal شرطه إن التطبيق يكون stateless: مفيش أي حاجة مهمة جوه الـ process. الـ sessions في القاعدة أو Redis، والملفات في S3، والـ cron في الـ queue، والـ sockets بـ Redis adapter، والـ rate limit والكاش في Redis.`,
          example: R`services:
  api:
    image: ghcr.io/you/myapp-api:1.4.0
    deploy:
      replicas: 3
    environment:
      REDIS_URL: redis://redis:6379
  worker:
    image: ghcr.io/you/myapp-api:1.4.0
    command: ["node", "dist/worker.js"]
  redis:
    image: redis:8-alpine`,
          try: R`شغّل ٣ نسخ من الـ api ورا Nginx (upstream على [[api:3000]]). سجّل دخول، وارفع صورة، وافتح socket، وشغّل الـ jobs. أي حاجة بتبوظ لما الطلب يروح لنسخة تانية، تبقى state لسه جوه الـ process. طلّعها.`,
          flag: "script",
          deep: {
            why: "أول رد فعل لما الموقع يبطأ «نكبّر السيرفر» أو «Kubernetes». بس لو المشكلة index ناقص، ١٠ سيرفرات هيضربوا القاعدة ١٠ أضعاف، وهتبقى أوحش. والترتيب الصح بيوفر فلوس ووقت.",
            how: R`١. قيس: الـ traces في Sentry، واستعلامات pg_stat_statements، و CPU والرام للسيرفر والقاعدة، و load test بـ k6 بشكل الترافيك المتوقع.

٢. صلّح الكود. ده غالبًا أكبر مكسب: index واحد، أو include بدل loop، أو كاش لصفحة الكورس.

٣. vertical: سيرفر أكبر. من غير أي تغيير في الكود، وبسعر معقول، بس ليه سقف، ولو وقع كل حاجة بتقع.

٤. افصل القاعدة على سيرفر لوحدها أو managed، عشان التطبيق والقاعدة ميتخانقوش على نفس الرام.

٥. horizontal: نسخ كتير ورا Nginx أو load balancer. وهنا شرط الـ stateless. [[replicas: 3]] في compose بيشغّل ٣ نسخ من غير ports ثابتة، و Nginx بيوصلهم بالاسم. وفي الـ deploy، النسخ بتتبدل واحدة واحدة، فالإغلاق النضيف لازم (تاب «Node و npm»).

٦. الشغل التقيل في workers منفصلة، بتكبّرها لوحدها. والـ worker هنا نفس الـ image بس بيشغّل ملف تاني.

٧. CDN للملفات والصفحات العامة.

٨. القاعدة نفسها: pooling، و read replicas، وده الدرس الجاي.

والـ socket.io على كذا نسخة محتاج Redis adapter عشان النسخ تكلّم بعض، و sticky sessions في الـ load balancer (نفس المستخدم يروح لنفس النسخة) وإلا هيطلع 400. والـ autoscaling والـ managed containers في تاب «Cloud و DevOps».`,
            when: "لما القياس يقول. مش قبل أول مستخدم. بس خلي التطبيق stateless من أول يوم، لأنه مش بيكلّف حاجة في الأول وبيوفر وجع كبير بعدين.",
            mistakes: R`في مشاريع حقيقية، ٣ حاجات كانت هتبوظ أول ما تبقى نسختين. rate limiter في الذاكرة، فكل نسخة بتعد لوحدها والحد بيتضاعف. و pub/sub للشات في الذاكرة (ومكتوب في الكود «سيرفر واحد بس»). و node-cron جوه السيرفر، فكل job هتشتغل مرتين. وكمان الملفات المرفوعة في فولدر uploads على السيرفر نفسه، فمع نسختين نص الصور يرجع 404. ومن الغلطات كمان: Kubernetes لمشروع فيه ١٠٠ مستخدم. أو تكبّر سيرفرات التطبيق والمشكلة في القاعدة.`
          },
          lines: [
            "الخدمات:",
            "الـ API.",
            "image متعملها tag بنسخة، مش latest.",
            "إعدادات التشغيل:",
            "٣ نسخ. Nginx بيوزّع عليهم بالاسم api.",
            "المتغيرات:",
            "كل الـ state المشتركة في Redis، مش في الذاكرة.",
            "الـ worker.",
            "نفس الـ image...",
            "...بس بيشغّل ملف الـ worker، وبيكبر لوحده.",
            "Redis: للـ queues، والكاش، والـ rate limit، والـ socket adapter.",
            "image صغيرة."
          ],
          sol: R`الحاجات اللي هتبوظ لما الطلب يروح لنسخة تانية، بالترتيب اللي غالبًا هتقابله:

١. الـ rate limit: [[express-rate-limit]] بيخزن في الذاكرة افتراضيًا، فمع ٣ نسخ الحد الحقيقي بقى ٦٠ مش ٢٠. الحل store في Redis. ٢. الـ socket.io: الإشعار بيوصل بس لو المستخدم متصل بنفس النسخة اللي عملت [[notify]]، والـ polling ممكن يرجع [[Session ID unknown]] من غير sticky sessions. الحل Redis adapter، و [[ip_hash]] في Nginx أو websocket بس. ٣. الملفات: لو فيه أي حاجة بتتحفظ على الديسك المحلي، النسخة التانية مش شايفاها. الحل S3 أو R2. ٤. الـ cron جوه الـ API بيشتغل ٣ مرات. الحل job scheduler في الـ worker.

الـ login نفسه غالبًا مش هيبوظ: الـ JWT متوقّع بنفس السر في التلاتة، والـ refresh session في القاعدة. لو بيبوظ، يبقى السر مختلف بين النسخ، أو فيه كاش في متغير في الذاكرة. وأي state فضلت جوه الـ process بعد التجربة دي، هي اللي هتوقعك يوم الترافيك الحقيقي.`,
          solCode: R`# nginx.conf
upstream api {
  server api:3000;   # Docker DNS بيوزّع على الـ 3 replicas
}
server {
  listen 80;
  location /socket.io/ {
    proxy_pass http://api;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
  location / {
    proxy_pass http://api;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

# docker compose up -d --scale api=3
# docker compose logs -f api   # شوف الطلبات بتتوزع على api-1 و api-2 و api-3`
        },
        {
          cmd: "scaling القاعدة",
          title: "القاعدة بقت هي عنق الزجاجة",
          desc: R`لما التطبيق بقى نسخ كتير، القاعدة بتبقى المكان اللي كله بيضرب فيه. الترتيب: استعلامات و indexes الأول، وبعدين connection pooling، وبعدين قاعدة أكبر، وبعدين read replicas للقراية، وبعدين تقسيم الجداول الكبيرة. وفي Prisma فيه extension بيوزّع القراية على الـ replicas والكتابة على الـ primary لوحده.`,
          example: R`import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { readReplicas } from "@prisma/extension-read-replicas";

const primary = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_URL }) });
const replica = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_REPLICA_URL }) });
export const db = primary.$extends(readReplicas({ replicas: [replica] }));

const courses = await db.course.findMany({ where: { published: true } });
const fresh = await db.$primary().order.findUnique({ where: { id: orderId } });`,
          try: R`اعمل replica بـ Docker (فيه images جاهزة بـ streaming replication)، أو استخدم قاعدة مُدارة فيها replica. وقّف الـ replication شوية، واعمل طلب ودفعة، واقرا حالة الطلب مرة من الـ replica ومرة بـ [[$primary()]]. هتشوف الـ lag بعينك.`,
          flag: "script",
          deep: {
            why: "التطبيق بيتكبّر بسهولة: نسخة زيادة. أما القاعدة فصعبة، لأن فيه مصدر واحد للحقيقة. وكل اتصال جديد بيها ليه تمن في الرام، فكتر النسخ ممكن يوقّعها حتى لو الاستعلامات سريعة.",
            how: R`الـ connections: كل اتصال بـ PostgreSQL بيبقى process على السيرفر وبياكل رام. والافتراضي حوالي ١٠٠ اتصال. لو عندك ١٠ نسخ، وكل واحدة فيها pool بـ ١٠، يبقى خلصوا. والـ serverless أسوأ، لأن كل function ممكن تفتح اتصال. الحل pooler زي PgBouncer بوضع transaction، أو الـ pooler بتاع المزوّد (Supabase عندها واحد)، وحد للـ pool في كل نسخة.

الـ read replicas: نسخة من القاعدة بتستقبل التغييرات من الـ primary باستمرار، وبتخدم القراية بس. بس النسخ بيبقى متأخر شوية، ملّي ثواني أو ثواني (replication lag). فلو الطالب دفع وفتح «كورساتي» في نفس اللحظة، والقراية راحت للـ replica، ممكن ميلاقيش الكورس. عشان كده القراية اللي بعد كتابة على طول ([[read-your-writes]]) بتروح للـ primary بـ [[$primary()]].

في Prisma 7 كل client محتاج driver adapter ([[@prisma/adapter-pg]])، والـ client نفسه بيتولّد في المسار اللي بتحدده في الـ schema. والـ extension بيبعت أي قراية للـ replica، وأي كتابة أو transaction للـ primary لوحده.

وبعد كده: تقسيم الجداول الكبيرة بالتاريخ (partitioning)، زي اللوجات والأحداث بالشهر. وأرشفة الداتا القديمة. والـ sharding (كل مجموعة عملاء على قاعدة) آخر حل خالص، لأنه بيعقّد كل حاجة.`,
            when: "لما القاعدة تبقى هي اللي CPU بتاعها عالي، أو الاتصالات قربت تخلص. والـ pooling بدري لو شغال serverless.",
            mistakes: R`إنك تبعت كل القراية للـ replica، بما فيها اللي بعد كتابة على طول، فالمستخدم يشوف داتا قديمة ويفتكر إن الدفع فشل. أو serverless من غير pooler، فالاتصالات تخلص. أو تكبّر القاعدة كل شهر بدل ما تصلّح index ناقص.`
          },
          lines: [
            "الـ client المتولّد من الـ schema (Prisma 7).",
            "الـ driver adapter بتاع PostgreSQL.",
            "extension توزيع القراية.",
            "client للـ primary، اللي بيستقبل الكتابة.",
            "client للـ replica.",
            "client واحد بيوزّع لوحده: القراية للـ replica، والكتابة للـ primary.",
            "قراية عادية، بتروح للـ replica.",
            "قراية بعد دفع على طول، لازم من الـ primary عشان الـ lag."
          ],
          sol: R`الطريقة الأسهل عشان توقف الـ replication من غير ما تكسر حاجة: على الـ replica نفسها [[SELECT pg_wal_replay_pause();]]. الـ replica بتفضل تستقبل التغييرات بس مبتطبقهاش. تتأكد بـ [[SELECT pg_is_wal_replay_paused();]] (ترجع t)، وترجّعها بـ [[pg_wal_replay_resume()]].

وهي واقفة، اعمل طلب وادفعه. [[db.order.findUnique]] (بيروح للـ replica) هيرجّع [[null]] للطلب الجديد، أو [[PENDING]] لطلب قديم اتدفع. و [[db.$primary().order.findUnique]] هيرجّع [[PAID]]. وعلى الـ replica [[SELECT now() - pg_last_xact_replay_timestamp();]] بتقولك الـ lag بالثواني، وهيفضل يزيد طول ما هي واقفة. أول ما تعمل resume، الاتنين يتطابقوا في أقل من ثانية.

ده بالظبط سبب إن صفحة «بعد الدفع» و [[GET /orders/:id]] وأي قراية بعد كتابة لنفس المستخدم لازم تبقى [[$primary()]]. ولو الطلب اتعمل ورجع [[null]] من الـ replica في الوضع العادي من غير pause، يبقى الـ lag عندك كبير أصلًا، وده محتاج مراقبة.`,
          solCode: R`-- على الـ replica
SELECT pg_wal_replay_pause();
SELECT pg_is_wal_replay_paused();                    -- t
SELECT now() - pg_last_xact_replay_timestamp() AS lag;

-- بعد التجربة
SELECT pg_wal_replay_resume();`
        },
        {
          cmd: "التكلفة",
          title: "المشروع بيكلّف كام في الشهر، وليه",
          desc: R`كل قرار في المعمارية ليه سعر شهري. فيه تكاليف ثابتة (السيرفر، والقاعدة)، وتكاليف بتزيد مع الاستخدام (الباندويث، والتخزين، وعمولة الدفع، والإيميلات، ونداءات الـ AI). اعمل جدول قبل الإطلاق، وحط تنبيه ميزانية على كل حساب سحابي.

الأرقام في المثال تقريبية للتوضيح بس. الأسعار بتتغير، وراجع صفحة كل مزوّد.`,
          example: R`السيرفر (VPS للـ api والـ worker)        ثابت: من 10 لـ 50 دولار حسب المزوّد والحجم
PostgreSQL مُدارة بباك أب تلقائي           ثابت: من حوالي 15 دولار، وبيزيد مع الحجم
Redis                                    صغير، أو على نفس السيرفر في الأول
الفيديو والصور (تخزين + CDN)             متغير: بالـ GB المتخزن والـ GB اللي بيتفرج
الإيميل                                  مجاني لحد معين، وبعدين بعدد الإيميلات
Sentry و PostHog والـ uptime              الخطط المجانية كفاية في الأول
بوابة الدفع                              متغير: نسبة من كل عملية + مبلغ ثابت`,
          try: R`اعمل الجدول ده لمشروعك بأسعار حقيقية من صفحات المزوّدين. احسب التكلفة لـ ١٠٠ طالب، و ١٠٠٠، و ١٠٠٠٠، واقسمها على عدد الطلاب. بعدين قارنها بسعر الكورس بعد ما تشيل عمولة البوابة.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير بتنجح في الاستخدام وتخسر فلوس، لأن التكلفة بتكبر أسرع من الإيراد. وأكبر فواتير الصدمة بتيجي من حاجة محدش حسبها: باندويث فيديو، أو لوجات، أو staging منسي شغال.",
            how: R`في منصة كورسات، أكبر تكلفة متغيرة هي الفيديو. ساعة فيديو 720p ممكن توصل لحوالي جيجا. يعني ١٠٠٠ طالب بيتفرجوا ١٠ ساعات في الشهر معناها حوالي ١٠ تيرا باندويث. لو المزوّد بيحاسب على خروج الداتا (egress) بالجيجا، الرقم ده لوحده ممكن يبقى أكبر من كل الباقي. عشان كده خدمات الفيديو المتخصصة، أو التخزين اللي مبيحاسبش على الـ egress، بتفرق جدًا. وده قرار معمارية، مش قرار محاسبة.

فكّر في unit economics: التكلفة لكل طالب نشط في الشهر، قصاد الإيراد منه بعد عمولة البوابة. لو الرقم الأول بيقرب من التاني، الـ scaling هيخسّرك.

حاجات بتتنسي: الـ staging شغال ٢٤ ساعة بنفس حجم الإنتاج. واللوجات والـ traces بتتحاسب بالحجم. ونداءات الـ AI بالتوكن، ومع كل مستخدم (تاب «الذكاء الاصطناعي»). والخطط المجانية ليها حدود، وبعضها بيوقف المشروع لو مفيش نشاط فترة.

تنبيه الميزانية على كل حساب سحابي (مثلًا عند ٥٠٪ و ١٠٠٪) بياخد دقيقتين، وبيمنع فاتورة بالآلاف من bug في loop.`,
            when: "قبل ما تختار المزوّدين، وقبل الإطلاق، وكل شهر بص على الفاتورة وقارنها بعدد المستخدمين.",
            mistakes: "إنك تعرض الفيديو mp4 مباشرة من VPS أو من bucket من غير CDN. أو مفيش تنبيه ميزانية. أو تشترك في خدمات مُدارة غالية قبل ما تحتاجها. أو تنسى عمولة البوابة وانت بتسعّر. أو تسيب بيئات تجربة شغالة شهور."
          },
          lines: [
            "الحوسبة: ثابتة، وبتكبر لما تحتاج نسخ أكتر.",
            "القاعدة: الباك أب التلقائي و PITR هما اللي بتدفع فيهم.",
            "Redis: غالبًا رخيص في الأول.",
            "أخطر بند متغير في منصة فيديو: الباندويث.",
            "بيزيد مع عدد المستخدمين والإشعارات.",
            "أدوات المراقبة ليها خطط مجانية معقولة في البداية.",
            "العمولة بتتشال من كل عملية، فحطها في التسعير."
          ],
          sol: R`الشكل المتوقع: التكلفة الكلية بتزيد، بس التكلفة لكل طالب بتقل كتير. مثال بأرقام تقريبية (حط أسعار مزودينك الحقيقية): عند ١٠٠ طالب، السيرفر والقاعدة ثابتين حوالي ٣٠ لـ ٦٠ دولار في الشهر، يعني نص دولار تقريبًا لكل طالب. عند ١٠٠٠ نفس السيرفر غالبًا كفاية، فالطالب بسنتات. عند ١٠٠٠٠ البند اللي بيكبر هو الفيديو (التخزين والـ bandwidth)، وده اللي هيحدد التكلفة.

عمولة البوابة بند مختلف: نسبة من كل عملية (مع مبلغ ثابت ساعات)، فهي بتكبر مع المبيعات مش مع عدد الطلاب. اطرحها من سعر الكورس الأول. مثلًا كورس بـ ٥٠٠ جنيه وعمولة حوالي ٣٪ وجنيهات ثابتة، يفضلك حوالي ٤٨٠. قارن ده بتكلفة الطالب الشهرية مضروبة في عدد الشهور اللي بيتفرج فيها.

الغلطة الأشهر إن الفيديو يتحسب ثابت. طالب واحد بيتفرج على ١٠ ساعات بجودة عالية ممكن يسحب أكتر من ١٠ جيجا. والتانية إن الخطط المجانية (Sentry و PostHog والإيميل) تتحسب مجانية للأبد. حط الحد اللي بعده بتدفع، واحسب إمتى هتوصله.`
        },
        {
          cmd: "التوثيق والتسليم",
          title: "مشروع حد تاني يقدر يشغّله من غيرك",
          desc: R`المشروع اللي بيشتغل بس وانت موجود مش مشروع خلصان. التسليم معناه ٣ حاجات. أولًا حد جديد يشغّل المشروع على جهازه في ربع ساعة من الـ README. تانيًا يعرف يعمل deploy ويتصرف في المشاكل المشهورة من الـ runbook. تالتًا الحسابات والمفاتيح بقت باسم صاحب المشروع، مش باسمك.`,
          example: R`# myapp
## تشغيل على جهازك
pnpm i && cp apps/api/.env.example apps/api/.env && docker compose up -d db redis && pnpm dev
## المعمارية
web (Next.js) بيكلّم api (Express)، و api بيكلّم PostgreSQL، و worker بياخد jobs من Redis. الرسمة في docs/architecture.md
## النشر
merge على main، و CI بيعمل deploy على staging لوحده. الإنتاج: tag بيبدأ بـ v، وبعدين موافقة
## لما حاجة تقع
docs/runbook.md: الدفع مش بيتفعّل، الديسك مليان، الإيميلات مش بتوصل، ترجّع نسخة قديمة
## الحسابات والمفاتيح
مين صاحب الدومين و Paymob والسحابة والإيميل، والمفاتيح في password manager الشركة، مش هنا`,
          try: R`ادّي الـ repo لحد (أو لنفسك على جهاز تاني) من غير أي كلام. سجّل كل سؤال سأله، وكل خطوة وقف فيها. كل واحدة منهم سطر ناقص في الـ README.`,
          flag: "script",
          deep: {
            why: "المطوّر اللي بيمشي من المشروع بياخد معاه نص المعرفة. والعميل اللي استلم كود من غير توثيق هيدفع لمطوّر جديد أسبوعين عشان يفهم. والحسابات اللي على إيميلك الشخصي بتخلي العميل رهينة ليك، حتى لو مش قصدك.",
            how: R`حزمة التسليم فيها:
[[README.md]]: التشغيل على الجهاز، والسكربتات، والمعمارية في فقرة.
[[.env.example]]: كامل ومطابق للكود، ولازم يتفحص (config.ts هو الحقيقة).
[[docs/architecture.md]]: رسمة، والـ ERD، ومين بيكلّم مين.
[[docs/adr/]]: القرارات المهمة وسببها.
[[docs/runbook.md]]: لكل مشكلة مشهورة، إزاي تعرفها (الـ alert أو اللوج) وخطوات حلها.
توثيق الـ API: OpenAPI أو collection في Postman.
قايمة بالمشاكل المعروفة والديون التقنية، بصراحة.
فيديو قصير بيمشي على الكود.

والحسابات: الدومين، والـ DNS، والسيرفر، والقاعدة، وحساب التاجر في بوابة الدفع (باسم الشركة القانوني)، ومزوّد الإيميل، و OAuth app بتاع جوجل، ومتاجر التطبيقات. كل ده ينتقل لصاحب المشروع. وبعد التسليم، صلاحياتك تتشال أو تتقلل، والأسرار تتغير.

والتوثيق يعيش في الـ repo جنب الكود، ويتحدّث في نفس الـ PR اللي بيغيّر الحاجة (بند في الـ definition of done). التوثيق القديم الغلط أسوأ من مفيش توثيق، لأنه بيودّي في حتة غلط وانت واثق.`,
            when: "من أول يوم، مش آخر أسبوع. الـ README بيتكتب مع الـ skeleton، والـ runbook مع أول مشكلة في الإنتاج.",
            mistakes: R`في مشروع حقيقي، [[.env.example]] كان فيه اسم متغير غير اللي الكود بيقراه، ومفيش ولا متغير لبوابة الدفع الأساسية. أي حد جديد مش هيعرف يشغّل الدفع. وفي مشروع تاني، جذر المشروع كان فيه حوالي ٤٠ ملف FIX و REPORT محدش بيقراهم. مكانهم runbook واحد و ADRs قليلة. ومن الغلطات كمان: حسابات باسم المطوّر، أو أسرار في الـ README.`
          },
          lines: [
            "أمر واحد: سطّب، وانسخ الإعدادات، وشغّل القاعدة و Redis، وشغّل التطوير.",
            "المعمارية في سطرين، والتفاصيل في ملف.",
            "النشر: staging لوحده، والإنتاج بـ tag وموافقة.",
            "المشاكل المشهورة وحلها في الـ runbook.",
            "الحسابات ملك مين، والمفاتيح فين. عمرها ما تتكتب هنا."
          ],
          sol: R`النتيجة الطبيعية لأول مرة: ٥ لـ ١٠ أسئلة. أشهرها: «نسخة Node كام؟» (حط [[.nvmrc]] أو [[engines]])، و «pnpm مش موجود» (اكتب [[corepack enable]])، و «الـ migrations مش شغالة» (سطر [[pnpm db:migrate]] ناقص)، و «مفيش داتا» (سطر الـ seed ناقص)، و «متغير X مش موجود» يعني [[.env.example]] ناقص، و «أعمل login بإيه؟» (يوزر تجربة في الـ seed).

كل سؤال من دول سطر في الـ README، والهدف إن حد جديد يشغّل المشروع في أقل من ١٥ دقيقة من غير ما يكلمك. ولو وقف في حاجة محتاجة حساب خارجي (Paymob، أو S3)، اكتب إزاي يشتغل من غيرها على جهازه: مثلًا وضع fake للبوابة، أو MinIO بدل S3.

علامة إنك خلصت: تكرر التجربة مع حد تاني (أو في container فاضي بـ [[git clone]] جديد)، ويشغّل من غير ولا سؤال.`
        }
      ]
    },
    {
      t: "مفاهيم الأنظمة الموزعة",
      l: 3,
      n: "الكلمات اللي بتتقال في أي system design: consistency و read-your-writes، و CAP و PACELC، و sharding و consistent hashing، و load balancers",
      items: [
        {
          cmd: "consistency و read-your-writes",
          title: "strong ولا eventual consistency، و «المستخدم لازم يشوف اللي كتبه»",
          desc: R`strong consistency معناها إن أي قراية بعد كتابة بتشوف الكتابة دي، من أي مكان. و eventual consistency معناها إن النسخ هتتفق «في الآخر»، بس ممكن قراية تشوف قيمة قديمة لفترة قصيرة. قاعدة PostgreSQL واحدة strong. وأول ما تضيف replica، أو كاش، أو search index، أو CDN، بقى عندك نسخ، والنسخ دي eventual.

المشكلة اللي بتبان للمستخدم: كتب تعليق وعمل refresh ومش لاقيه، لأن القراية راحت لـ replica متأخرة. الحل اسمه read-your-writes: المستخدم ده بالذات يقرا من الـ primary لفترة قصيرة بعد ما يكتب، والباقي يقرا من الـ replicas عادي.`,
          example: R`const STICKY_MS = 5000;

export function readYourWrites(req, res, next) {
  const lastWrite = Number(req.cookies.lw) || 0;
  req.read = Date.now() - lastWrite < STICKY_MS ? db.$primary() : db;
  if (!["GET", "HEAD"].includes(req.method)) {
    res.cookie("lw", String(Date.now()), { httpOnly: true, secure: true, sameSite: "lax", maxAge: STICKY_MS });
  }
  next();
}

router.get("/courses/:id/comments", readYourWrites, async (req, res) => {
  res.json({ data: await req.read.comment.findMany({ where: { courseId: req.params.id }, orderBy: { id: "desc" }, take: 20 }) });
});`,
          try: R`ارجع لدرس «scaling القاعدة» (فيه [[readReplicas]] و [[$primary()]]). ضيف الـ middleware ده، وتخيل replica متأخرة ٣ ثواني: اكتب جدول بـ ٤ أعمدة (الطلب، ومن مين، ويروح فين، ويشوف الجديد؟) لـ: الشخص اللي كتب بعد ثانية، وشخص تاني بعد ثانية، ونفس الشخص من موبايله بعد ثانية، ونفس الشخص بعد ١٠ ثواني.`,
          flag: "script",
          deep: {
            why: "أغلب الأنظمة الكبيرة eventual في أجزاء منها، ده مش عيب، ده تمن الـ scale. بس المستخدم مش مهتم بالمصطلح، مهتم إن «الحاجة اللي عملتها اختفت». والانترفيوز بتسأل: «أنهي أجزاء في تصميمك محتاجة strong وأنهي ينفع eventual؟» وده السؤال اللي بيفرّق.",
            how: R`strong بتيجي بتمن: كل كتابة لازم تستنى إن كل النسخ (أو أغلبها) تأكد، أو كل قراية تروح لمكان واحد. ده latency أعلى وأضعف لو جزء من الشبكة وقع. eventual أسرع وأرخص، بس لازم الكود والمنتج يستحملوا قراية قديمة.

قرر لكل داتا لوحدها. الرصيد، والمخزون، وحالة الدفع، والصلاحيات: strong (من الـ primary، وغالبًا جوه transaction). عدد المشاهدات، واللايكات، والتوصيات، ونتايج البحث: eventual عادي، وتأخير ثانية أو دقيقة محدش هيلاحظه.

ضمانات بين الاتنين ليها أسامي: read-your-writes (انت تشوف اللي كتبته)، و monotonic reads (متشوفش حاجة وبعدين تختفي لما تعمل refresh، يعني متتنقلش لـ replica أقدم)، و causal consistency (الرد ميظهرش قبل التعليق اللي بيرد عليه).

الـ middleware: cookie [[lw]] بوقت آخر كتابة، وأي قراية في الـ ٥ ثواني اللي بعدها تروح للـ primary. الرقم أكبر من الـ lag المعتاد بتاع الـ replica (قيسه بـ [[pg_stat_replication]] أو مقياس المزوّد). العيب إن الـ cookie مربوطة بالمتصفح: نفس الشخص من موبايله مش هيشوفها. البديل تخزين وقت آخر كتابة لكل مستخدم في Redis. وفيه طريقة أدق: تخزن الـ LSN (موقع الكتابة في الـ WAL) وتتأكد إن الـ replica عدّته.

والكاش نفس الموضوع: بعد التعديل امسح الكاش (درس «طبقات الكاش»)، أو ارجع النتيجة الجديدة للمستخدم من الـ response نفسه، والواجهة تحدّث الـ state (optimistic update) بدل ما تعمل refetch.`,
            when: "أول ما يبقى عندك replica، أو كاش بـ TTL، أو search index منفصل، أو أكتر من region. وفي الانترفيو كل ما ترسم نسختين من أي داتا.",
            mistakes: R`تقرا الرصيد أو حالة الطلب من replica قبل ما تقرر حاجة. أو تفتكر إن eventual يعني «ممكن تضيع». لأ، معناها «هتوصل متأخر». أو تحط كل حاجة على الـ primary عشان تريّح دماغك، فالـ replicas مالهاش لازمة. وفي الانترفيو: متقولش «هستخدم strong consistency في كل حاجة» من غير ما تقول التمن.`
          },
          lines: [
            "المدة اللي المستخدم يقرا فيها من الـ primary بعد ما يكتب.",
            "middleware بيختار مصدر القراية لكل طلب.",
            "إمتى آخر مرة الشخص ده كتب (من cookie).",
            "كتب من قريب؟ اقرا من الـ primary. غير كده من الـ replicas.",
            "الطلب ده كتابة (POST و PATCH و DELETE)؟",
            "سجّل وقتها في cookie بتعيش نفس المدة.",
            "قفلة.",
            "كمّل.",
            "قفلة.",
            "route قراية بيستخدم المصدر اللي اتختار.",
            "التعليقات. اللي لسه كاتب هيشوف تعليقه.",
            "قفلة."
          ],
          sol: R`الجدول المتوقع: (١) نفس الشخص بعد ثانية، من نفس المتصفح → الـ cookie موجودة → primary → يشوف تعليقه. (٢) شخص تاني بعد ثانية → مفيش cookie → replica → ممكن ميشوفوش، وده مقبول. (٣) نفس الشخص من موبايله بعد ثانية → الـ cookie على المتصفح التاني → replica → ممكن ميشوفوش، ودي الحالة اللي الـ cookie مبتغطيهاش (الحل Redis بالـ userId). (٤) نفس الشخص بعد ١٠ ثواني → الـ cookie خلصت → replica → يشوفه، لأن الـ lag (٣ ثواني) عدّى.

لو الـ lag وصل ١٠ ثواني في الزحمة، الحالة (٤) هتفشل. عشان كده الـ STICKY_MS بيتظبط على الـ lag الحقيقي، مع مراقبة وتنبيه لو الـ lag عدّى رقم معين.`
        },
        {
          cmd: "CAP و PACELC",
          title: "CAP و PACELC بكلام بسيط",
          desc: R`CAP بتقول: لما الشبكة تتقطع بين نسختين من الداتا (Partition)، لازم تختار: يا ترفض الطلبات عشان متقولش حاجة غلط (Consistency)، يا ترد بالداتا اللي عندك حتى لو قديمة (Availability). مينفعش الاتنين في نفس اللحظة. والتقطيع ده هيحصل، فالسؤال الحقيقي: لما يحصل، هتختار إيه؟

PACELC بتكمّل: وحتى لو الشبكة سليمة (Else)، فيه اختيار تاني كل يوم: Latency ولا Consistency. تستنى النسخ كلها تأكد (أبطأ وأدق)، ولا ترد بسرعة وتزامن بعدين.`,
          example: R`الموقف: قاعدتين في القاهرة وفرانكفورت، والشبكة بينهم وقعت دقيقتين
CP (اختيار الـ consistency): فرانكفورت ترفض الكتابة لحد ما الاتصال يرجع. الحجز والدفع والرصيد لازم كده
AP (اختيار الـ availability): الاتنين يكتبوا، ولما الشبكة ترجع تحل التعارض. سلة المشتريات واللايكات ينفع كده
PACELC في الأيام العادية: PostgreSQL بـ synchronous replica يستنى النسخة (EC)، والـ async replica بترد على طول (EL)
أمثلة: PostgreSQL قاعدة واحدة = CP عمليًا. DynamoDB و Cassandra = AP/EL افتراضيًا، وفيها خيار قراية strong
حل التعارض في AP: آخر كتابة تكسب (last-write-wins)، أو دمج (CRDT)، أو تسأل المستخدم
في الانترفيو: متقولش «هختار CA». الـ partition مش اختيار، هي بتحصل`,
          try: "خد منصة الكورسات، واكتب لكل جزء اختيارك لو الشبكة اتقطعت بين region مصر و region أوروبا: الدفع وتفعيل الكورس، وتقدم الطالب في الدروس، والتعليقات، وعدد المشاهدات، وتغيير الباسورد. واكتب جنب كل واحد: المستخدم هيشوف إيه وقت التقطيع؟",
          flag: "script",
          deep: {
            why: "CAP أشهر كلمة في أسئلة system design، وأكتر كلمة بتتقال غلط. المحاور مش عايز التعريف، عايز يشوفك بتربطها بقرار: «في الجزء ده هختار أرفض، وفي الجزء ده هختار أرد بقديم، وده السبب».",
            how: R`الـ C في CAP معناها linearizability: كل الناس بيشوفوا نفس آخر قيمة، كأن فيه نسخة واحدة. مش الـ C بتاعة ACID (القيود والقواعد جوه القاعدة). دي فرقة بتتسأل.

والـ A معناها إن كل نسخة شغالة لازم ترد (بنجاح) على أي طلب. مش «uptime ٩٩.٩٩٪».

ليه «CA» مش اختيار؟ لأن أي نظام على أكتر من جهاز ممكن الشبكة بينهم تقع. نظام على جهاز واحد مفيهوش partition أصلًا، بس ده مش موزّع. فالاختيار الفعلي CP ولا AP، ووقت التقطيع بس.

PACELC أهم في الشغل اليومي، لأن التقطيع نادر، بس الـ latency كل طلب. مثال: replica في region تاني. لو كل كتابة بتستنى تأكيده (synchronous)، كل كتابة زادت ٥٠ ملّي ثانية أو أكتر. لو مش بتستنى (async)، سريعة، بس لو الـ primary وقع ممكن آخر كام كتابة تضيع. وده بالظبط اختيار EC ولا EL.

القاعدة العملية: الحاجات اللي غلطها بيتحوّل فلوس أو صلاحيات → CP و EC. والحاجات اللي غلطها بيتحوّل رقم قديم شوية → AP و EL. ونفس المنتج فيه الاتنين.

وحل التعارضات في AP: last-write-wins أبسط حاجة، بس بتضيّع كتابات (لو اتنين عدّلوا في نفس الوقت، واحد بيروح). الـ CRDTs (زي عداد بيتجمع، أو set بيتدمج) بتدمج من غير ما تضيّع، وده اللي بيخلي Google Docs و Figma شغالين أوفلاين وبعدين يتدمجوا.`,
            when: "أول ما تصمم حاجة على أكتر من region، أو تختار قاعدة NoSQL موزّعة، أو تتسأل في انترفيو «لو الشبكة وقعت بين الـ data centers، إيه اللي بيحصل؟».",
            mistakes: R`«اخترت CA». أو إنك تقول CAP وتعرّف C كـ ACID consistency. أو إنك تقول «النظام بتاعي AP» على النظام كله، مع إن الدفع جواه لازم CP. أو تفتكر إن eventual consistency معناها داتا بتضيع. أو تنسى الـ PACELC خالص، مع إن الـ latency هي اللي بتفرق كل يوم.`
          },
          lines: [
            "الموقف: نسختين، والشبكة بينهم وقعت.",
            "CP: ترفض بدل ما تقول حاجة غلط. للفلوس والحجز.",
            "AP: ترد وتكتب، وتصلّح بعدين. للحاجات اللي تستحمل.",
            "PACELC: حتى من غير تقطيع، تستنى النسخ (أدق) ولا ترد على طول (أسرع).",
            "أمثلة مشهورة لكل ناحية.",
            "لو اخترت AP، لازم تقول هتحل التعارض إزاي.",
            "الغلطة اللي بتتسأل: CA مش اختيار في نظام موزّع."
          ],
          sol: R`إجابة معقولة: الدفع وتفعيل الكورس → CP: region أوروبا يرفض أو يحوّل للـ region الأساسي، والمستخدم يشوف «الدفع مش متاح دلوقتي، جرّب بعد دقايق» بدل ما يدفع مرتين. تقدم الطالب → AP: يتسجّل محليًا ويتدمج بعدين بأكبر قيمة (التقدم مبيرجعش لورا، ده CRDT بسيط اسمه max). التعليقات → AP: تظهر لأهل الـ region ده الأول وبعدين للكل. عدد المشاهدات → AP: عدّادات في كل region وبتتجمع. تغيير الباسورد → CP: لازم يوصل للكل، وإلا الباسورد القديم يفضل شغال في region تاني.

المستخدم في CP بيشوف رسالة خطأ واضحة. وفي AP بيشوف داتا ناقصة شوية. لو كتبت «كله CP» أو «كله AP»، ارجع لكل سطر واسأل: الغلط هنا تمنه إيه؟`
        },
        {
          cmd: "sharding و consistent hashing",
          title: "sharding: تقسيم الداتا على قواعد، و consistent hashing",
          desc: R`الـ sharding معناه إن الداتا بتتقسم على كذا قاعدة، وكل قاعدة (shard) عليها جزء. بيتعمل لما قاعدة واحدة (حتى أكبر واحدة) مبقتش مستحملة الكتابة أو الحجم. ده آخر خطوة في درس «scaling القاعدة»، مش أولها.

التقسيم بيحتاج مفتاح (shard key). ٣ طرق مشهورة: hash للمفتاح، أو ranges (من كذا لكذا)، أو tenant (كل عميل أو مجموعة عملاء على shard). و consistent hashing طريقة بتوزّع المفاتيح على الـ shards، ولما تضيف shard جديد جزء صغير بس من الداتا يتنقل.`,
          example: R`class HashRing {
  constructor(nodes, vnodes = 100) { this.points = []; nodes.forEach((n) => this.add(n, vnodes)); }
  hash(s) { return crypto.createHash("md5").update(s).digest().readUInt32BE(0); }
  add(node, vnodes = 100) {
    for (let i = 0; i < vnodes; i++) this.points.push({ h: this.hash($__bt$__{node}#$__{i}$__bt), node });
    this.points.sort((a, b) => a.h - b.h);
  }
  get(key) {
    const h = this.hash(key);
    let lo = 0, hi = this.points.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (this.points[mid].h < h) lo = mid + 1; else hi = mid; }
    return this.points[lo % this.points.length].node;
  }
}
const ring = new HashRing(["db-a", "db-b", "db-c"]);
const shard = ring.get(tenantId);`,
          try: R`حط ١٠٠٠٠ مفتاح ([[tenant-0]] لـ [[tenant-9999]]) على [[HashRing]] بـ ٣ shards، واحفظ كل مفتاح راح فين. ضيف shard رابع وعد كام مفتاح اتنقل. وبعدين كرر نفس الكلام بـ [[hash(key) % 3]] وبعدين [[% 4]]. قارن النسبتين.`,
          flag: "script",
          deep: {
            why: "الـ sharding هو الطريقة الوحيدة للكتابة إنها تكبر أفقيًا بعد حدود جهاز واحد. بس بيعقّد كل حاجة: joins بين shards، و transactions بين shards، والتقارير، والـ migrations. عشان كده بيتسأل في الانترفيو: عايزين يعرفوا إنك عارف إزاي، وإمتى متعملوش.",
            how: R`hash sharding: [[shard = hash(key) % N]]. توزيع متساوي، بس لو N اتغيرت (زودت shard) أغلب المفاتيح بتتنقل (في التجربة حوالي ٧٥٪ من ٣ لـ ٤). ده معناه نقل تقريبًا كل الداتا.

consistent hashing بيحل ده: المفاتيح والـ shards كلهم نقط على دايرة (أرقام الـ hash)، وكل مفتاح بيروح لأول shard بعده على الدايرة. لما تضيف shard، بياخد المفاتيح اللي قبله بس، يعني حوالي 1/N (في التجربة ٢٥٪ من ٣ لـ ٤). والـ virtual nodes (كل shard ليه ١٠٠ نقطة مش واحدة) بتخلي التوزيع متساوي، وبتخلي الـ shard الجديد ياخد حتة صغيرة من كل واحد بدل ما ياخد كتير من جار واحد. Cassandra و DynamoDB والـ caches الموزعة بتستخدم الفكرة دي.

range sharding: [[users A-M]] على shard و [[N-Z]] على تاني، أو بالتاريخ. الـ range queries سهلة ([[WHERE createdAt BETWEEN]] بتروح shard واحد). بس فيه hot spots: كل الكتابة الجديدة بتروح لآخر range.

tenant sharding: كل tenant (أو مجموعة tenants صغيرة) على shard. ده الأنسب لـ SaaS: كل queries العميل على shard واحد، فالـ joins والـ transactions شغالة عادي، والعميل الكبير ممكن ياخد shard لوحده. محتاج جدول صغير (directory) بيقول كل tenant فين، بدل hash، عشان تقدر تنقل عميل معين.

اختيار المفتاح أهم قرار: لازم يكون موجود في أغلب الـ queries (وإلا كل query بيسأل كل الـ shards، scatter-gather)، وتوزيعه متساوي (مش كله عند عميل واحد). والـ ids لازم تبقى فريدة على كل الـ shards (UUID أو Snowflake، مش auto-increment).

قبل الـ sharding اعمل: indexes، و replicas للقراية، وكاش، وقاعدة أكبر، و partitioning جوه نفس القاعدة (PostgreSQL declarative partitioning)، وأرشفة. ولو لازم، أدوات زي Citus لـ PostgreSQL بتعمل sharding من غير ما تعيد كتابة التطبيق.`,
            when: "لما قاعدة واحدة (بعد كل التحسينات والـ replicas) مش مستحملة الكتابة أو الحجم، أو العملاء محتاجين عزل أو داتا في بلد معين. في منتج جديد: تقريبًا أبدًا في أول سنة.",
            mistakes: R`sharding بدري «عشان نبقى جاهزين». أو shard key مش موجود في أغلب الـ queries. أو [[hash % N]] من غير خطة لما N يتغير. أو auto-increment ids على كل shard فتتكرر. أو تنسى إن الـ unique constraint على مستوى shard واحد بس (الإيميل unique في shard، مش في النظام كله). وفي الانترفيو: «إزاي تعمل resharding من غير توقف؟» (كتابة مزدوجة، ونسخ الداتا القديمة، وبعدين تحويل القراية، زي expand/contract).`
          },
          lines: [
            "دايرة الـ hash.",
            "بتبدأ بالـ nodes، وكل واحد ليه ١٠٠ نقطة.",
            "hash رقمي من 0 لـ 4 مليار.",
            "إضافة node:",
            "١٠٠ نقطة بأسماء مختلفة لنفس الـ node على الدايرة.",
            "رتّب النقط.",
            "قفلة.",
            "المفتاح ده يروح فين؟",
            "الـ hash بتاعه.",
            "بحث ثنائي...",
            "...على أول نقطة بعده على الدايرة.",
            "ولو عدّى آخر نقطة، يلف لأول واحدة.",
            "قفلة.",
            "قفلة.",
            "دايرة بـ ٣ قواعد.",
            "الـ tenant ده على أنهي قاعدة."
          ],
          sol: R`النتيجة الفعلية على ١٠٠٠٠ مفتاح: consistent hashing من ٣ لـ ٤ shards نقل حوالي ٢٥٪ من المفاتيح (قريب من 1/4، وده المتوقع لأن الـ shard الجديد بياخد ربع الدايرة). و [[% 3]] ثم [[% 4]] نقل حوالي ٧٥٪.

يعني مع modulo، إضافة shard معناها نقل تلات أرباع الداتا، ومع الدايرة ربعها بس، ومن كل الـ shards بالتساوي (بسبب الـ virtual nodes).

لو قلّلت [[vnodes]] لـ 1، هتلاقي التوزيع مش متساوي خالص (shard ممكن ياخد ٥٠٪)، وده ليه الـ virtual nodes موجودة.`
        },
        {
          cmd: "load balancer",
          title: "الـ load balancer: round-robin و least-connections، و L4 ولا L7",
          desc: R`الـ load balancer بيوزّع الطلبات على كذا نسخة من التطبيق، وبيشيل النسخة اللي وقعت من التوزيع (health checks). ده اللي بيخلي الـ scaling الأفقي ممكن.

خوارزميات التوزيع: round-robin (بالدور، الافتراضي)، و least-connections (للنسخة اللي عندها أقل طلبات شغالة دلوقتي)، و hash (نفس العميل لنفس النسخة). ونوعين حسب هو فاهم إيه: L4 بيشوف TCP بس (IP و port)، و L7 بيفهم HTTP (الـ path، والـ headers، والـ cookies).`,
          example: R`upstream api {
    least_conn;
    server 10.0.0.11:3000 max_fails=3 fail_timeout=10s;
    server 10.0.0.12:3000 max_fails=3 fail_timeout=10s;
    server 10.0.0.13:3000 backup;
    keepalive 32;
}
server {
    listen 443 ssl;
    server_name api.myapp.com;
    location /socket.io/ {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    location / {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout http_502 http_503;
    }
}`,
          try: R`شغّل ٣ نسخ من API صغير على ports مختلفة، كل واحدة بترد باسمها بعد ٥٠ ملّي ثانية، ما عدا واحدة «عيانة» بترد بعد ٢ ثانية. حطهم ورا Nginx مرة بالافتراضي (round-robin) ومرة بـ [[least_conn]]. ابعت ٣٠ طلب، طلب كل ٣٠ ملّي ثانية من غير ما تستنى الرد، وعد كل نسخة خدت كام، واحسب متوسط وقت الرد. وبعدين وقّف نسخة وشوف إيه اللي بيحصل للطلبات.`,
          flag: "script",
          deep: {
            why: "من غير load balancer، التطبيق نسخة واحدة: لو وقعت أو اتعملها deploy، الموقع وقع. ومعاه، تقدر تزوّد نسخ، وتعمل deploy نسخة نسخة من غير توقف، وتشيل النسخة العيانة لوحدها. وفي الانترفيو، هو أول مربع بيترسم بعد الـ client.",
            how: R`round-robin ممتاز لو كل الطلبات شبه بعض في الوقت. بس لو فيه طلبات تقيلة (تقرير، أو رفع ملف)، نسخة ممكن يتجمع عليها تقيل وهي بتاخد نفس الدور. least-connections بيبص على الشغل الفعلي دلوقتي، فبيوزّع أحسن مع طلبات مختلفة المدة. والـ hash ([[ip_hash]] أو hash على cookie) بيخلي نفس العميل يروح لنفس النسخة (sticky sessions)، ودي محتاجها مع WebSocket أحيانًا، بس بتبوّظ التوزيع. الأحسن إن التطبيق يبقى stateless (الجلسات في القاعدة أو Redis، و socket.io بـ Redis adapter) ومتحتاجش sticky.

L4 (TCP): أسرع وأرخص، بيعدّي أي بروتوكول (قواعد بيانات، أو gRPC، أو TLS زي ما هو). مبيعرفش الـ path ولا الـ headers. أمثلة: AWS NLB، و HAProxy في mode tcp، و Nginx stream.

L7 (HTTP): بيفك الـ TLS، وبيقدر يوجّه [[/api]] لخدمة و [[/]] لخدمة، ويضيف headers ([[X-Forwarded-For]])، ويعيد الطلب على نسخة تانية لو الأولى رجعت 502، ويعمل rate limit وكاش. أمثلة: Nginx، و AWS ALB، و Cloudflare، و Caddy، و Traefik.

الـ health checks: Nginx المفتوح بيعمل passive (لو [[max_fails]] طلبات فشلت، يشيل النسخة [[fail_timeout]]). والـ active checks (يسأل [[/health]] كل شوية) في Nginx Plus أو HAProxy أو الـ load balancers المُدارة. ولازم [[/health]] يبقى خفيف (درس «health و uptime»).

[[proxy_next_upstream]]: لو النسخة وقعت أثناء الطلب، Nginx يجرب التانية. خلي بالك: ده آمن للـ GET. و Nginx افتراضيًا مش بيعيد POST إلا لو ضفت [[non_idempotent]]، وده مقصود، لأن الدفع ممكن يتعمل مرتين.

[[keepalive]] مع [[Connection ""]] بيخلي Nginx يعيد استخدام الاتصالات للـ upstream بدل ما يفتح TCP جديد مع كل طلب. و WebSocket محتاج [[Upgrade]] و [[Connection "upgrade"]] في location لوحده. وحتى الـ load balancer نفسه ممكن يقع، فالمُدار (ALB) بيبقى أكتر من جهاز ورا DNS واحد، أو اتنين Nginx بـ IP عائم.`,
            when: "أول ما يبقى عندك أكتر من نسخة من التطبيق، أو محتاج deploy من غير توقف. وعلى PaaS زي Render و Railway و Fly فيه load balancer جاهز، بس لازم تعرف هو بيعمل إيه.",
            mistakes: R`sticky sessions عشان الجلسة في ذاكرة النسخة. أو [[/health]] تقيل بيسأل كل حاجة فالنسخ تطلع وتدخل. أو إعادة POST على نسخة تانية بعد timeout. أو تنسى [[X-Forwarded-For]] و [[trust proxy]] فكل الطلبات جاية من IP الـ load balancer. أو WebSocket من غير Upgrade headers فيفضل يعمل polling. وفي الانترفيو: «L4 ولا L7 لـ API عادي؟» L7، لأنك محتاج routing بالـ path و retries و headers، وL4 لما البروتوكول مش HTTP أو محتاج أقل latency.`
          },
          lines: [
            "مجموعة نسخ التطبيق.",
            "وزّع على النسخة اللي عندها أقل طلبات شغالة.",
            "نسخة، ولو فشلت ٣ مرات تتشال ١٠ ثواني.",
            "نسخة تانية بنفس الإعداد.",
            "نسخة احتياطي، مبتاخدش طلبات غير لو الباقي وقع.",
            "خلي ٣٢ اتصال مفتوحين للنسخ بدل اتصال جديد كل طلب.",
            "قفلة.",
            "الـ server اللي بيستقبل من الإنترنت.",
            "HTTPS.",
            "الدومين.",
            "مسار الـ WebSocket:",
            "ابعت للمجموعة.",
            "HTTP 1.1 لازم للـ upgrade.",
            "مرّر طلب الـ upgrade...",
            "...وخلي الاتصال يتحول WebSocket.",
            "قفلة.",
            "باقي الطلبات:",
            "ابعت للمجموعة.",
            "HTTP 1.1 عشان الـ keepalive.",
            "امسح Connection عشان الاتصال يفضل مفتوح.",
            "IP العميل الحقيقي للتطبيق.",
            "لو النسخة وقعت أو رجعت 502 أو 503، جرّب التانية (مش للـ POST افتراضيًا).",
            "قفلة.",
            "قفلة."
          ],
          sol: R`النتيجة في تجربة فعلية: round-robin وزّع ١٠ و ١٠ و ١٠ بالظبط، ومتوسط الرد حوالي ٧٠٠ ملّي ثانية، لأن تلت الطلبات راحت للنسخة العيانة واستنت ٢ ثانية. و [[least_conn]] بعت للنسخة العيانة طلب واحد بس و ١٥ و ١٤ للباقيين، ومتوسط الرد نزل لحوالي ١٢٠. السبب: النسخة العيانة فضل عليها اتصالات مفتوحة، فـ least_conn شافها «مشغولة» وبعت لغيرها.

خلي بالك: لو بعت الـ ٣٠ طلب في نفس اللحظة بـ [[Promise.all]]، الاتنين هيوزّعوا ١٠ و ١٠ و ١٠، لأن لحظة التوزيع كل النسخ عندها صفر اتصالات. الفرق بيبان بس لما الطلبات بتوصل على فترات، وده الواقع.

لما توقف نسخة: الطلبات اللي كانت رايحة لها بتفشل بـ [[connect() failed (111: Connection refused)]] في لوج Nginx، و [[proxy_next_upstream]] بيعيدها على نسخة تانية، فالـ GET بيعدّي (في التجربة الـ ٣٠ اتوزعوا ١٥ و ١٥ من غير ولا error). والنسخة بتتشال فترة وبعدين Nginx يجرّبها تاني. والـ POST اللي كان رايح ليها بيرجع 502، وده مقصود.`
        }
      ]
    },
    {
      t: "تدريب system design",
      l: 3,
      n: "٧ أسئلة مشهورة بإجابة مترتبة: المتطلبات والأرقام، والـ API، والداتا، وبعدين scaling والمشاكل",
      items: [
        {
          cmd: "URL shortener",
          title: "صمّم خدمة تقصير لينكات",
          desc: R`أي سؤال system design بيمشي بنفس الخطوات. ابدأ بالمتطلبات وأرقام تقريبية، وبعدين الـ API، وبعدين الداتا، وبعدين الشكل العام، وفي الآخر scaling والمشاكل. خد ٥ دقايق في المتطلبات قبل ما ترسم أي مربع، واسأل الشخص اللي قدامك.

وخدمة تقصير اللينكات فيها قراية أكتر من الكتابة بكتير، فالتصميم كله بيتبني حوالين تحويل سريع ورخيص.`,
          example: R`المتطلبات: تقصير، وتحويل سريع، وإحصائيات بسيطة. 100 مليون لينك في الشهر (≈ 40 كتابة في الثانية)، والقراية 100 ضعف (≈ 4000 في الثانية)
الـ API: POST /links {url} بيرجّع {code}، و GET /:code بيحوّل بـ 301 أو 302
الداتا: links(code PK, url, userId, createdAt, expiresAt)، والضغطات في جدول لوحده أو stream
الكود: 7 حروف base62 = 62^7 ≈ 3.5 تريليون. من counter متحوّل base62 (مفيش تصادم)، أو عشوائي مع unique
القراية: Redis قدام القاعدة، و CDN أو edge للّينكات المشهورة
الإحصائيات: الضغطة تروح queue وتتجمع بعدين، مش UPDATE counter مع كل تحويل
المشاكل: لينكات ضارة (فحص وبلاغات)، و rate limit على الإنشاء، و 301 بيتكاش في المتصفح فالإحصائيات تضيع`,
          try: "جاوب السؤال بصوت عالي في ٣٥ دقيقة، بالترتيب ده، ومعاك ورقة. سجّل نفسك. بعدين شوف: سألت عن المتطلبات قبل ما ترسم؟ حسبت أرقام؟ قلت trade-off واحد على الأقل بكلمة «بس»؟",
          flag: "script",
          deep: {
            why: "السؤال ده بيتسأل كتير لأنه صغير كفاية يتحل في ٤٥ دقيقة، وفيه كل الأفكار الأساسية: قراية كتير، وكاش، وتوليد ids فريدة، وتحليلات مش لازم تبقى لحظية.",
            how: R`الأرقام التقريبية بتفرق في القرار. ١٠٠ مليون في الشهر على حوالي ٢.٦ مليون ثانية يطلعوا حوالي ٤٠ كتابة في الثانية، وده قليل جدًا. والقراية حوالي ٤٠٠٠ في الثانية، ودي اللي محتاجة كاش. والتخزين: ٥٠٠ بايت للينك، يعني حوالي ٥٠ جيجا في الشهر، وحوالي ٦ تيرا في ١٠ سنين، وده عادي.

توليد الكود فيه ٣ طرق. الأولى counter متحوّل base62: مفيش تصادم، بس الـ counter الواحد نقطة ضعف، والأكواد متسلسلة وسهل تتخمن. الحل إن كل سيرفر ياخد range من الأرقام، أو Snowflake IDs. التانية عشوائي، ولو حصل تصادم (نادر مع ٣.٥ تريليون) الـ unique بيرفض وتجرب تاني. والتالتة hash للـ URL: نفس اللينك بياخد نفس الكود، بس لازم تتعامل مع التصادمات.

الـ 301 (دايم) المتصفح بيحفظه، فالطلب التاني مبيوصلكش. أحمال أقل، بس الإحصائيات تضيع. والـ 302 (مؤقت) كل ضغطة بتعدّي عليك. اختار حسب هل الإحصائيات جزء من المنتج ولا لأ، وقول ده بصوت عالي. الـ trade-off المعلن ده هو اللي بيتقيّم.

وممكن تتسأل عن مسح اللينكات المنتهية: job بيمسحها، أو التحقق من [[expiresAt]] وقت القراية.`,
            when: R`أسئلة المتابعة المتوقعة: «لو عايز custom alias؟» (unique، ومحجوز من الكود العشوائي). «تمنع التخمين إزاي؟» (عشوائي وطول أكبر). «الإحصائيات لحظية؟» (stream و counters مجمعة في Redis). «multi-region؟» (القراية من الـ edge، والكتابة في region واحدة).`,
            mistakes: "إنك تبدأ ترسم microservices قبل ما تسأل على الأرقام. أو تحسب auto-increment ids من غير ما تفكر في التخمين. أو تنسى الكاش مع إن القراية ١٠٠ ضعف. أو متقولش أي trade-off، وكل اختيار بتقوله كأنه الصح الوحيد."
          },
          lines: [
            "المتطلبات والأرقام الأول. القرار كله مبني على إن القراية أكتر بكتير.",
            "API صغيرة: إنشاء وتحويل.",
            "جدول بسيط، والكود هو الـ primary key. والضغطات مفصولة عشان متبطّأش التحويل.",
            "حساب المساحة المتاحة، وطريقتين للتوليد بميزة كل واحدة.",
            "القراية بتتخدم من الذاكرة ومن أقرب مكان للزائر.",
            "الإحصائيات مش لازم تبقى لحظية، فبتروح queue.",
            "المشاكل والـ trade-off: الـ 301 أسرع بس بيضيّع الإحصائيات."
          ],
          sol: R`الإجابة النموذجية بالترتيب ده، وكل حتة ليها وقت: (١) ٥ دقايق أسئلة: قراية قد إيه نسبة للكتابة؟ اللينك بينتهي؟ custom alias؟ إحصائيات قد إيه دقيقة؟ (٢) أرقام: ٤٠ كتابة و ٤٠٠٠ قراية في الثانية، والتخزين حوالي ١٠٠ مليون × ٥٠٠ بايت ≈ ٥٠ جيجا في الشهر، يعني حوالي ٦٠٠ جيجا في السنة. (٣) الـ API والداتا. (٤) الرسمة: client ← CDN ← API ← Redis ← PostgreSQL، والضغطات ← queue ← worker ← جدول إحصائيات. (٥) التعمق في جزء واحد: توليد الكود. (٦) المشاكل والـ trade-offs.

الـ trade-offs اللي لازم تتقال بـ «بس»: الـ counter مفيهوش تصادم، بس الأكواد متتابعة وسهل حد يخمّن اللينكات، فممكن تخلطه أو تزود bits عشوائية. و 301 بيخلي المتصفح يكاش التحويل ويخفف الحمل، بس الضغطات اللي بعد كده مبتوصلكش، فلو الإحصائيات مهمة استخدم 302. و Redis بيخدم ٤٠٠٠ قراية بسهولة، بس محتاج تسخين ومساحة، فكاش الـ hot links بس.

علامات إن إجابتك ضعيفة: رسمت قبل ما تسأل، أو مقلتش ولا رقم، أو قلت «microservices» و «Kafka» من غير ما الأرقام تطلبهم. ٤٠ كتابة في الثانية قاعدة واحدة بتشيلها وهي نايمة.`
        },
        {
          cmd: "chat app",
          title: "صمّم تطبيق شات",
          desc: R`الشات فيه ٣ مشاكل مع بعض. اتصال دايم مع ملايين الأجهزة، ورسايل لازم متضيعش ولا تتكرر ولا يتلخبط ترتيبها، وتوزيع الرسالة على أعضاء محادثة ممكن يكونوا متصلين بسيرفرات مختلفة. الإجابة بتمشي على الترتيب نفسه: المتطلبات والأرقام، وبعدين الاتصال، وبعدين حفظ الرسالة وتوزيعها، وبعدين الأوفلاين والمشاكل.`,
          example: R`المتطلبات: شات 1:1 وجروبات لحد 500، أونلاين وأوفلاين، الرسايل متضيعش، والتاريخ كامل. 1 مليون مستخدم يومي × 50 رسالة ≈ 600 رسالة في الثانية، والذروة ×5
الاتصال: WebSocket لكل جهاز، وكل سيرفر عارف مين متصل عنده (في Redis بـ TTL)
الإرسال: الرسالة تتحفظ الأول (id ووقت)، وبعدين تتوزع على أعضاء المحادثة
بين السيرفرات: Redis pub/sub أو adapter، لأن المستقبل ممكن يكون على سيرفر تاني
الداتا: messages(conversationId, id, senderId, body, createdAt) و index على (conversationId, id)
الأوفلاين: push notification، ولما يرجع يسحب الرسايل من بعد آخر id عنده
المشاكل: الترتيب (id متزايد لكل محادثة)، والتكرار (clientMessageId)، والجروبات الكبيرة (fan-out)`,
          try: "ارسم الشكل ده على ورقة، وامشي على رسالة من «أحمد بيكتب» لحد «منى شافتها»، ومنى على سيرفر تاني. بعدين كرر ومنى أوفلاين. كل خطوة مش عارف فيها مين بيكلّم مين، تبقى فجوة في التصميم.",
          flag: "script",
          deep: {
            why: "الشات بيختبر إنك فاهم الاتصالات الدايمة، والتوزيع بين السيرفرات، والفرق بين «اتبعتت» و «اتحفظت» و «وصلت». وده نفس اللي في الإشعارات، والمزادات، واللوحات اللايف.",
            how: R`الحفظ قبل التوزيع هو أهم قرار. الرسالة بتتكتب في القاعدة، وبعدين تتبعت. لو السيرفر وقع بعد الحفظ، الرسالة موجودة، والمستقبل هيسحبها. ولو وقع قبل الحفظ، الـ client معندوش تأكيد، فبيعيد الإرسال. وعشان الإعادة متعملش رسالة مكررة، الـ client بيبعت [[clientMessageId]] عشوائي، والسيرفر عليه unique.

الترتيب: الوقت من أجهزة مختلفة مش مضمون. فالسيرفر بيدّي id متزايد لكل محادثة، والعرض بيرتّب بيه. والـ client بيسحب «كل اللي بعد آخر id عندي» لما يرجع.

الـ fan-out: في محادثة 1:1 أو جروب صغير، ابعت لكل عضو متصل (fan-out on write). أما في جروب فيه آلاف، ابعت event صغير «فيه جديد»، والـ clients بتسحب بنفسها (fan-out on read). وحالة القراية (sent و delivered و read) بتتخزن لكل عضو: آخر id وصله، وآخر id قراه.

الحضور (أونلاين): heartbeat كل ٣٠ ثانية، بيجدد key في Redis بـ TTL. لو الـ key خلص، يبقى أوفلاين.

الداتا: PostgreSQL مقسّم بالوقت بيستحمل كويس في البداية. وفي أحجام ضخمة جدًا، قواعد زي Cassandra أو ScyllaDB بمفتاح [[conversationId]]، لأنها مبنية للكتابة الكتير.`,
            when: R`أسئلة المتابعة: «end-to-end encryption؟» (المفاتيح على الأجهزة، والسيرفر مبيشوفش النص). «الصور والملفات؟» (signed upload، والرسالة فيها رابط بس). «البحث في الرسايل؟» (index منفصل). «الترتيب مع رسايل وصلت متأخر؟»`,
            mistakes: "إنك توزّع قبل ما تحفظ. أو تعتمد على وقت الجهاز في الترتيب. أو تنسى إن المستقبل ممكن يكون على سيرفر تاني. أو polling كل ثانية بدل اتصال دايم. أو تعامل جروب فيه ١٠ آلاف زي محادثة بين اتنين."
          },
          lines: [
            "المتطلبات والأرقام: حوالي ٦٠٠ رسالة في الثانية في المتوسط، والذروة خمس أضعاف.",
            "اتصال دايم لكل جهاز، ومكان كل مستخدم متسجّل في Redis.",
            "احفظ الأول، وبعدين وزّع. ده اللي بيضمن إن الرسايل متضيعش.",
            "السيرفرات بتكلّم بعض عن طريق Redis.",
            "جدول الرسايل، و index بيجيب المحادثة بالترتيب بسرعة.",
            "الأوفلاين بياخد push، ولما يرجع يسحب اللي فاته.",
            "المشاكل الصعبة، وحل كل واحدة في كلمتين."
          ],
          sol: R`الرحلة الصح لرسالة من أحمد لمنى، ومنى على سيرفر تاني: (١) أحمد يبعت على الـ WebSocket بتاعه لسيرفر A رسالة فيها [[clientMessageId]]. (٢) سيرفر A يتأكد إن أحمد عضو في المحادثة، ويحفظ الرسالة في القاعدة ويدّيها [[id]] متزايد جوه المحادثة. (٣) يرد على أحمد بـ ack فيه الـ id (علامة ✓). (٤) يبعت الرسالة على Redis pub/sub (أو الـ adapter) لـ channel المحادثة أو channel منى. (٥) سيرفر B، اللي منى متصلة عنده، بياخدها ويبعتها على الـ socket بتاع منى. (٦) جهاز منى يرد بـ delivered، ولما تفتح المحادثة بـ read ومعاه آخر id قرته، والحالة دي بترجع لأحمد بنفس الطريق (✓✓).

ومنى أوفلاين: الخطوات ١ لـ ٣ زي ما هي، وفي الخطوة ٤ السيستم بيشوف إنها مش متصلة (مفيش presence ليها في Redis)، فيبعت push notification بدل الـ socket. لما ترجع، التطبيق بيطلب [[GET /conversations/:id/messages?after=LAST_ID]] ويسحب كل اللي فاته.

الفجوات اللي بتظهر عادة: الحفظ بعد الإرسال بدل قبله (فلو السيرفر وقع الرسالة تضيع)، ومفيش [[clientMessageId]] فإعادة الإرسال بعد انقطاع النت تعمل رسالتين، والترتيب بالوقت بتاع الجهاز بدل id السيرفر.`
        },
        {
          cmd: "booking system",
          title: "صمّم نظام حجز من غير حجز مزدوج",
          desc: R`نظام الحجز (حصص في جيم، أو مواعيد دكتور، أو كراسي في كورس أونلاين) مشكلته الأساسية إن اتنين بيحجزوا آخر مكان في نفس اللحظة. الحل إن القاعدة هي اللي تحكم، مش الكود: update مشروط ذري، أو قيد unique، أو exclusion constraint للأوقات اللي بتتداخل. ولو فيه دفع، الحجز بيتعمل «hold» بمهلة لحد ما الدفع يخلص.`,
          example: R`المتطلبات: حجز حصة أو ميعاد، ومكانين لنفس الكرسي ممنوع، وإلغاء، ودفع اختياري، والزحمة وقت فتح الحجز
الـ API: GET /slots?date= و POST /bookings {slotId} (مع Idempotency-Key) و DELETE /bookings/:id
الداتا: slots(id, startsAt, capacity, booked) و bookings(slotId, userId, status) و unique(slotId, userId)
الحجز: UPDATE slots SET booked = booked + 1 WHERE id = $1 AND booked < capacity، ولو رجع 0 صفوف يبقى اتملى
المواعيد المتداخلة: exclusion constraint على (resource, tstzrange) أو SELECT ... FOR UPDATE جوه transaction
مع الدفع: status HELD و expiresAt بعد 10 دقايق، و job بيفك الـ holds اللي خلصت
المشاكل: المواعيد بتتخزن UTC وتتعرض بتوقيت المكان، والـ no-show، وقايمة انتظار، و queue وقت الزحمة`,
          try: R`اعمل جدول slots فيه حصة بـ capacity 1، واكتب سكربت بيبعت ٥٠ طلب حجز مع بعض بـ [[Promise.all]]. جرّب مرة بـ «اقرا booked وبعدين اعمل update»، ومرة بالـ UPDATE المشروط. عد الحجوزات في الحالتين.`,
          flag: "script",
          deep: {
            why: "الحجز المزدوج مش bug نادر. أول ما يبقى فيه حصة مشهورة وفتح الحجز الساعة ٩، مية واحد بيضغطوا في نفس الثانية. والكود اللي بيقرا وبعدين يكتب بيعدّي أكتر من واحد على آخر مكان.",
            how: R`الـ UPDATE المشروط بيعمل الفحص والزيادة في خطوة واحدة ذرية. القاعدة بتقفل الصف وهي بتعدّله، فالطلب التاني بيستنى، وبعدين يلاقي [[booked < capacity]] مبقتش صح، فيرجع 0 صفوف. ومع [[unique(slotId, userId)]] نفس الشخص ميحجزش مرتين. والاتنين يتعملوا في transaction واحدة، مع insert الحجز نفسه.

والمواعيد بمدد مختلفة (دكتور، أو ملعب ساعة ونص) مشكلتها التداخل، مش العدد. PostgreSQL عنده exclusion constraint: [[EXCLUDE USING gist (resource_id WITH =, during WITH &&)]]، وده محتاج extension اسمه btree_gist. القاعدة نفسها بترفض أي حجزين بيتداخلوا لنفس المكان. وبديله [[SELECT ... FOR UPDATE]] على صف المكان جوه transaction، وبعدين تتأكد من التداخل بنفسك.

الـ hold: الحجز بيبقى HELD لحد ما الدفع يخلص، ومعاه [[expiresAt]]. الـ webhook بيحوّله CONFIRMED، والـ job بيرجّع الأماكن اللي الـ hold بتاعها خلص. وده بالظبط نفس فلو الطلبات في منصة الكورسات.

الوقت: خزّن [[timestamptz]] بـ UTC، واعرض بتوقيت المكان (Africa/Cairo مثلًا)، مش بتوقيت جهاز المستخدم. وخلي بالك إن مصر رجّعت التوقيت الصيفي، فالفرق عن UTC بيتغير خلال السنة. عمره ما تحسبه رقم ثابت.

و [[Idempotency-Key]] من الـ client بيمنع إن الضغطة المزدوجة تعمل حجزين.`,
            when: R`أسئلة المتابعة: «optimistic ولا pessimistic locking؟». «لو القاعدة موزعة على أكتر من سيرفر؟». «overbooking مقصود زي الطيران؟». «فتح الحجز لـ ١٠٠ ألف في نفس الثانية؟» (virtual waiting room و queue).`,
            mistakes: R`إنك تعمل الفحص في الكود ([[if (slot.booked < slot.capacity)]]) وبعدين تكتب. أو lock في ذاكرة Node، وده شغال على نسخة واحدة بس. أو تحسب التوقيت بفرق ساعات ثابت. أو تنسى تفك الـ holds، فالحصة تبان مليانة وهي فاضية.`
          },
          lines: [
            "المتطلبات، ومنها الزحمة وقت الفتح. دي اللي بتحدد التصميم.",
            "الـ API، والحجز معاه مفتاح عشان الضغطة المزدوجة.",
            "الجداول، والـ unique بيمنع نفس الشخص يحجز مرتين.",
            "الفحص والزيادة في خطوة ذرية واحدة. ده قلب الإجابة.",
            "للمواعيد بمدد مختلفة: القاعدة بترفض التداخل بنفسها.",
            "الحجز المدفوع بيتمسك لفترة محددة، وبعدين يتفك لوحده.",
            "المشاكل الحقيقية: التوقيت، والناس اللي مبتجيش، والانتظار، والزحمة."
          ],
          sol: R`بـ «اقرا وبعدين اكتب» العدد مش ثابت، بس دايمًا أكبر من 1. جربناها مرتين: مرة [[31]] حجز ناجح، ومرة [[44]]، على كرسي واحد. والأغرب إن [[booked]] في جدول slots فضل [[1]]: كل الطلبات قرت 0 وكتبت 1 فوق بعض (lost update)، فالعداد نفسه بيكدب. يعني مش بس حجز مزدوج، ده كمان مفيش طريقة تعرف من الجدول إنه حصل.

بالـ UPDATE المشروط: دايمًا [[1]] حجز ناجح و [[49]] رجعوا 0 صفوف، و [[booked = 1]]. القاعدة بتقفل الصف وقت التحديث، فالطلب التاني بيستنى الأول يخلص، وبعدين الشرط [[booked < capacity]] بيتقيّم على القيمة الجديدة.

لو الطريقة الأولى طلعت 1 عندك، غالبًا الـ pool فيه connection واحدة أو الطلبات بتتبعت ورا بعض مش مع بعض. تأكد إنها [[Promise.all]] وإن الـ pool فيه ١٠ connections على الأقل. وخلي بالك إن [[unique(slotId, userId)]] بيمنع نفس اليوزر يحجز مرتين، بس مش بيمنع ٥٠ يوزر مختلفين على كرسي واحد. ده شغل الـ UPDATE المشروط.`,
          solCode: R`import pg from "pg";
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 20 });
await pool.query("DROP TABLE IF EXISTS bookings, slots");
await pool.query("CREATE TABLE slots (id int PRIMARY KEY, capacity int NOT NULL, booked int NOT NULL DEFAULT 0)");
await pool.query("CREATE TABLE bookings (slot_id int REFERENCES slots(id), user_id int, UNIQUE (slot_id, user_id))");

async function naive(userId) {
  const { rows: [s] } = await pool.query("SELECT booked, capacity FROM slots WHERE id = 1");
  if (s.booked >= s.capacity) return false;
  await pool.query("UPDATE slots SET booked = $1 WHERE id = 1", [s.booked + 1]);
  await pool.query("INSERT INTO bookings VALUES (1, $1)", [userId]);
  return true;
}
async function conditional(userId) {
  const c = await pool.connect();
  try {
    await c.query("BEGIN");
    const { rowCount } = await c.query("UPDATE slots SET booked = booked + 1 WHERE id = 1 AND booked < capacity");
    if (rowCount === 0) { await c.query("ROLLBACK"); return false; }
    await c.query("INSERT INTO bookings VALUES (1, $1)", [userId]);
    await c.query("COMMIT");
    return true;
  } catch (e) { await c.query("ROLLBACK"); throw e; } finally { c.release(); }
}
for (const [name, fn] of [["naive", naive], ["conditional", conditional]]) {
  await pool.query("TRUNCATE bookings; DELETE FROM slots; INSERT INTO slots VALUES (1, 1, 0)");
  const ok = (await Promise.all(Array.from({ length: 50 }, (_, i) => fn(i + 1)))).filter(Boolean).length;
  const { rows: [r] } = await pool.query("SELECT (SELECT count(*) FROM bookings) AS bookings, booked FROM slots");
  console.log(name, "ok:", ok, "rows:", r.bookings, "booked:", r.booked);
}
await pool.end();
// naive ok: 31 rows: 31 booked: 1
// conditional ok: 1 rows: 1 booked: 1`
        },
        {
          cmd: "news feed",
          title: "صمّم news feed (زي فيسبوك أو تويتر)",
          desc: R`الـ feed هو «آخر البوستات من الناس اللي بتتابعهم». المشكلة الأساسية: القراية أكتر من الكتابة بكتير، وكل بوست لازم يوصل لآلاف أو ملايين. فيه طريقتين: fan-out on write (أول ما حد ينشر، البوست يتحط في feed كل متابع جاهز)، و fan-out on read (لما حد يفتح، تجمع بوستات اللي بيتابعهم وقتها). والإجابة الصح غالبًا الاتنين مع بعض.`,
          example: R`المتطلبات: نشر بوست، و feed مترتب بالوقت (وبعدين بالأهمية)، و follow. 100 مليون مستخدم يومي، كل واحد يفتح الـ feed 10 مرات، وبينشر 0.5 بوست ≈ 12 ألف قراية و 600 كتابة في الثانية
الـ API: POST /posts و GET /feed?cursor= (cursor pagination) و POST /follows/:userId
الداتا: posts(id, authorId, body, createdAt) و follows(followerId, followeeId) و feed جاهز لكل مستخدم في Redis (sorted set بالوقت، آخر 800 id)
الكتابة (fan-out on write): البوست يتحفظ، وبعدين job يحط الـ id في feed كل متابع
المشاهير: حساب عنده 10 مليون متابع مبيتعملوش fan-out. بيتجاب وقت القراية ويتدمج (hybrid)
القراية: ids من Redis، وبعدين البوستات نفسها من كاش (بالـ id) مع اسم الكاتب وعدد اللايكات
المشاكل: الـ ranking، والبوست المتمسح (يتفلتر وقت القراية)، والمستخدم اللي مفتحش من شهور (متعملوش fan-out)`,
          try: "ارسم الشكل على ورقة، وامشي على «منى نشرت بوست» لحد ما يظهر في feed أحمد. كرر لما منى حسابها فيه ٥ مليون متابع. وبعدين جاوب: أحمد عمل unfollow لمنى، إمتى بوستاتها تختفي من الـ feed بتاعه؟",
          flag: "script",
          deep: {
            why: "الـ feed بيجمع أهم أفكار الـ scale في سؤال واحد: قراية أكتر بكتير من الكتابة، و precomputation ضد on-demand، و hot keys (المشاهير)، وكاش على كذا طبقة، و pagination مظبوطة. وبيتسأل كتير بصيغ تانية: timeline، أو activity feed، أو «آخر النشاطات» في أي SaaS.",
            how: R`fan-out on write: القراية سريعة جدًا (feed جاهز، مجرد قراية من Redis)، بس الكتابة تقيلة: بوست من حساب عنده ١٠٠٠ متابع = ١٠٠٠ كتابة. ولحساب عنده ١٠ مليون، ده مستحيل يخلص في وقت معقول، وأغلبهم مش هيفتحوا أصلًا.

fan-out on read: الكتابة رخيصة (سطر واحد)، بس القراية تقيلة: هات كل اللي بتتابعهم، وهات آخر بوستات كل واحد، ورتّب. مع ٥٠٠ متابَع ده بطيء.

الـ hybrid: الناس العاديين fan-out on write. والمشاهير (أكتر من عدد معين من المتابعين) بيتعلّموا، ومبيتعملهمش fan-out. لما أحمد يفتح الـ feed: خد الـ feed الجاهز، وضيف عليه آخر بوستات المشاهير اللي بيتابعهم (دول قليلين ومتكاشين)، ورتّب. ده اللي تويتر وصفه زمان.

الـ feed في Redis بيشيل ids بس، مش البوست. البوست نفسه في كاش لوحده بالـ id. كده التعديل أو المسح بيتعمل في مكان واحد، والـ feed بيتفلتر وقت القراية (لو البوست ممسوح، اتخطاه).

الـ pagination: cursor (آخر id أو وقت شفته)، مش offset، لأن الـ feed بيتغير وانت بتقلّب (درس «pagination»). والـ ranking: البداية بالوقت، وبعدين score (تفاعل، وقرب، ونوع المحتوى)، وده بيتحسب offline ويتخزن مع الـ id.

والمستخدمين اللي مش نشطين: متعملهمش fan-out. لما يرجعوا، ابنِ الـ feed بتاعهم بـ fan-out on read مرة واحدة.`,
            when: R`أسئلة المتابعة: «اللايكات والتعليقات بتتحدث إزاي؟» (عدادات في Redis وبتتكتب للقاعدة على دفعات). «feed مرتب بالأهمية مش بالوقت؟» (ranking service و features). «realtime؟» (event صغير «فيه جديد» بـ WebSocket والـ client يسحب). «إعلانات في الـ feed؟» (بتتدمج وقت القراية).`,
            mistakes: "fan-out on write للكل بما فيهم المشاهير. أو fan-out on read للكل. أو تخزين البوست كامل في كل feed. أو offset pagination. أو إنك متسألش على نسبة القراية للكتابة، مع إنها اللي بتحدد التصميم كله. أو تنسى إن الـ unfollow والـ block والبوست الممسوح لازم يتفلتروا."
          },
          lines: [
            "المتطلبات والأرقام: القراية ٢٠ ضعف الكتابة. ده اللي بيبرر الـ precomputation.",
            "API صغيرة، والـ feed بـ cursor.",
            "البوستات والمتابعات في القاعدة، والـ feed الجاهز ids بس في Redis.",
            "النشر: احفظ، وبعدين وزّع في الخلفية.",
            "الحسابات الكبيرة مبتتوزعش، بتتجاب وقت القراية.",
            "القراية: ids جاهزة، وبعدين تفاصيل كل بوست من الكاش.",
            "المشاكل: الترتيب، والممسوح، والمستخدمين النايمين."
          ],
          sol: R`«منى نشرت» (حساب عادي): الـ API يحفظ في posts ويرجّع 201 على طول. job في الـ queue يجيب متابعين منى على دفعات، ولكل واحد [[ZADD feed:<userId> <createdAt> <postId>]] و [[ZREMRANGEBYRANK]] عشان يفضل آخر ٨٠٠. أحمد يفتح: [[ZREVRANGE]] يجيب ids، والبوستات من الكاش، والصفحة تظهر.

منى عندها ٥ مليون: مفيش fan-out. أحمد يفتح: الـ feed الجاهز + آخر بوستات الحسابات الكبيرة اللي بيتابعهم (متكاشة، كل حساب قايمة واحدة للكل) ← merge بالوقت ← أول ٢٠.

الـ unfollow: الأبسط إن الـ feed يتفلتر وقت القراية بقايمة المتابعات الحالية (متكاشة)، فالبوستات تختفي فورًا. وفي الخلفية job ينضّف ids منى من feed أحمد. لو قلت «بعد ما الـ feed يتبني من جديد» من غير فلترة، المحاور هيسأل: «والمستخدم شايفها لحد إمتى؟».`
        },
        {
          cmd: "notification system",
          title: "صمّم نظام إشعارات (push و email و SMS و in-app)",
          desc: R`نظام الإشعارات بيستقبل «حصل حدث» من أي خدمة (طلب اتدفع، أو تعليق جديد، أو كورس بيبدأ بكرة)، ويقرر مين يوصله إيه وعلى أنهي قناة، ويبعت من غير ما يزعج ولا يكرر ولا يضيع. القلب هو queue بين «الحدث» و «الإرسال»، وتفضيلات المستخدم، و idempotency.`,
          example: R`المتطلبات: in-app و push و email و SMS، وتفضيلات لكل نوع وقناة، ومواعيد هدوء، ومحدش ياخد نفس الإشعار مرتين. 10 مليون إشعار في اليوم، والذروة 5 أضعاف (حملة أو حدث كبير)
الـ API الداخلي: notify({ userId, type, data, idempotencyKey }) من أي خدمة، و GET /notifications?cursor= و POST /notifications/read
الداتا: notifications(id, userId, type, data, readAt, createdAt) و preferences(userId, type, channel, enabled) و devices(userId, pushToken) و deliveries(notificationId, channel, status, attempts)
التدفق: الحدث ← queue ← worker يقرا التفضيلات والقوالب ← queue لكل قناة ← worker لكل مزوّد (FCM و SES و SMS)
الموثوقية: retry بـ backoff، و dead letter queue، و idempotencyKey unique، ومزوّد احتياطي للـ SMS
الإزعاج: تجميع (digest: «٥ تعليقات جديدة»)، و rate limit لكل مستخدم، و quiet hours بتوقيت المستخدم
المشاكل: push tokens بتنتهي (امسحها لما المزوّد يقول invalid)، والـ unsubscribe في كل إيميل، والإشعار العاجل (OTP) يعدّي الطابور`,
          try: "امشي على «طالب دفع تمن كورس» من الـ webhook لحد ما يوصله إيميل وإشعار in-app، والمدرّب يوصله push. بعدين افترض إن مزوّد الإيميل واقع ساعة: إيه اللي بيحصل للإيميلات؟ والطالب هيشوف إيه؟",
          flag: "script",
          deep: {
            why: "كل منتج فيه إشعارات، وأغلبها بيتبني عشوائي: كل feature بتبعت إيميل بنفسها. والنتيجة إيميلات مكررة، ومحدش عارف يقفل نوع معين، والمزوّد لما يقع الإيميلات تضيع. السؤال بيختبر queues، و retries، و idempotency، والتفكير في المستخدم.",
            how: R`الفصل: الخدمة اللي حصل فيها الحدث بتنادي [[notify]] وخلاص، ومتعرفش أي حاجة عن القنوات. ده بيحط job في queue ويرجع فورًا. كده الـ checkout ميبطأش عشان SES بطيء.

الـ router worker: بيقرا تفضيلات المستخدم (عايز الإيميل ده؟ على أنهي قناة؟)، وبيعمل صف في notifications (ده الـ in-app، بيظهر في الجرس)، وبيحط job لكل قناة مفعّلة في queue لوحدها. كل قناة queue منفصلة، فلو الـ SMS واقع، الإيميل والـ push شغالين.

الـ idempotency: [[idempotencyKey]] (مثلًا [[order-paid:<orderId>]]) عليه unique. الـ webhook ممكن يوصل مرتين، والـ job ممكن يتعاد، والإشعار لازم يتبعت مرة. نفس فكرة «webhook الدفع».

الـ retries: كل مزوّد بيفشل أحيانًا. retry بـ exponential backoff (١٠ ثواني، دقيقة، ٥ دقايق...)، وبعد عدد معين الـ job يروح DLQ ويتسجّل في deliveries بـ failed، وحد يشوفه. لو المزوّد واقع ساعة، الإيميلات بتستنى في الـ queue وتتبعت لما يرجع، و BullMQ بيعمل ده (درس «background jobs»).

الأولوية: OTP أو استعادة باسورد مينفعش يستنى ورا حملة تسويق فيها مليون إيميل. queue منفصلة (أو priority) للعاجل.

الإزعاج: لو حصل ٢٠ تعليق في دقيقة، ابعت «٢٠ تعليق جديد» مش ٢٠ إشعار. ده delay صغير وتجميع بالـ userId والنوع. و quiet hours: الـ push مش العاجل يستنى الصبح بتوقيت المستخدم.

الـ push: كل جهاز ليه token، والـ tokens بتموت (التطبيق اتمسح). لما FCM يرجّع [[UNREGISTERED]] امسح الـ token، وإلا هتفضل تبعت لأجهزة مش موجودة. تفاصيل الـ web push في درس «web push».`,
            when: R`أسئلة المتابعة: «إزاي تضمن الترتيب؟» (غالبًا مش مهم، ولو مهم partition بالـ userId). «تتبع الفتح والضغط؟» (pixel و redirect links، مع الخصوصية). «١٠٠ مليون إشعار في حملة؟» (batch APIs للمزوّد، وتوزيع على ساعات). «realtime في الجرس؟» (WebSocket أو SSE بيبعت event وقت ما صف in-app يتعمل).`,
            mistakes: "إرسال الإيميل جوه الـ request. أو queue واحدة لكل القنوات فقناة واقعة بتوقف الكل. أو من غير idempotency فالطالب ياخد «تم الدفع» ٣ مرات. أو OTP ورا حملة تسويق. أو إيميلات من غير unsubscribe (ضد قوانين كتير، والمزوّد ممكن يقفل حسابك). أو تفضل تبعت لـ push tokens ميتة."
          },
          lines: [
            "المتطلبات: القنوات، والتفضيلات، ومن غير تكرار. والأرقام بالذروة.",
            "دالة داخلية واحدة لأي خدمة، و API للجرس في الواجهة.",
            "الجداول: الإشعار نفسه، والتفضيلات، والأجهزة، وحالة كل إرسال.",
            "الحدث بيعدّي على queues، و worker لكل قناة.",
            "الموثوقية: إعادة، ومكان للفاشل، ومفتاح ضد التكرار، ومزوّد بديل.",
            "احترام المستخدم: تجميع، وحد، ومواعيد هدوء.",
            "المشاكل العملية: tokens ميتة، وإلغاء الاشتراك، والعاجل."
          ],
          sol: R`المسار: webhook الدفع بيحدّث الطلب في transaction، وبعدها [[notify({ userId: student, type: "order.paid", idempotencyKey: "order-paid:" + orderId })]] و [[notify({ userId: instructor, type: "course.sold", ... })]]. الـ router يلاقي تفضيلات الطالب: email + in-app، فيعمل صف notifications (يظهر في الجرس فورًا) و job في queue الإيميل. والمدرّب: push، فـ job في queue الـ push، والـ worker يجيب tokens أجهزته ويبعت لـ FCM.

المزوّد واقع ساعة: jobs الإيميل تفشل وتتعاد بـ backoff، وتفضل في الـ queue. الطالب شايف الإشعار في الجرس (in-app مش معتمد على المزوّد)، والكورس مفتوح (التفعيل مش مستني الإيميل). ولما المزوّد يرجع، الإيميلات تتبعت. ولو المحاولات خلصت قبل ما يرجع، الـ jobs في DLQ وتعيدها بإيدك أو تحوّل لمزوّد تاني.

لو قلت «الإيميل هيضيع» أو «الدفع هيفشل»، يبقى الإيميل لسه جوه الـ request.`
        },
        {
          cmd: "file storage",
          title: "صمّم خدمة تخزين ملفات (زي Google Drive أو Dropbox)",
          desc: R`خدمة تخزين الملفات فيها حاجتين منفصلين تمامًا: الـ metadata (اسم الملف، وفولدره، وصاحبه، والصلاحيات، والنسخ) في قاعدة عادية، والـ bytes نفسها في object storage (S3 أو R2). والملفات الكبيرة بتترفع أجزاء (chunks) مباشرة من المتصفح لـ S3 بـ signed URLs، والسيرفر مبيشيلش أي bytes.`,
          example: R`المتطلبات: رفع وتنزيل ملفات لحد 10 جيجا، وفولدرات، ومشاركة بصلاحيات، ونسخ قديمة، ومزامنة بين الأجهزة. 50 مليون مستخدم، و 10 جيجا في المتوسط ≈ 500 بيتابايت
الـ API: POST /files/uploads (يرجّع uploadId و URLs للأجزاء) و POST /files/uploads/:id/complete و GET /files/:id/download (يرجّع signed URL) و GET /changes?cursor=
الداتا: files(id, ownerId, parentId, name, currentVersionId) و versions(id, fileId, size, sha256, storageKey, createdAt) و shares(fileId, userId, role)
الرفع: S3 multipart upload، كل جزء 8 ميجا بـ presigned URL، والمتصفح بيرفع الأجزاء بالتوازي ويعيد الفاشل بس
الـ dedup: نفس الـ sha256 = نفس الـ object في S3، والـ version بتشاور عليه (ويتحذف بعد آخر مرجع)
التنزيل: signed URL قصير، أو CDN مع signed cookies للملفات المشهورة، و Range requests للاستكمال
المشاكل: الصلاحيات الموروثة من الفولدر، والمزامنة والتعارض (نسختين اتعدلوا أوفلاين)، وفحص الفيروسات، و multipart uploads متعلّقة تتمسح`,
          try: R`ارجع لدرس «signed upload URL» في التاب ده. كبّره لـ multipart: اكتب الـ endpoints التلاتة (create و sign part و complete) بـ [[@aws-sdk/client-s3]] ([[CreateMultipartUploadCommand]] و [[UploadPartCommand]] مع [[getSignedUrl]] و [[CompleteMultipartUploadCommand]]). بعدين جاوب: المتصفح رفع ٧ أجزاء من ١٠ والنت قطع، إزاي يكمّل من غير ما يبدأ من الأول؟`,
          flag: "script",
          deep: {
            why: "السؤال بيختبر إنك فاصل بين الـ metadata والـ blobs، وإنك مش بتعدّي ملفات ضخمة على سيرفرات التطبيق، وإنك فاهم الرفع المتقطع والمزامنة. ونفس الأفكار في أي منتج فيه رفع (فيديوهات الكورسات، ومستندات العملاء).",
            how: R`الـ metadata والـ bytes: القاعدة فيها جدول files بشجرة ([[parentId]])، وكل تعديل بيعمل version جديدة. الـ bytes في S3 بمفتاح ملوش معنى (hash أو uuid)، مش اسم الملف، عشان إعادة التسمية والنقل يبقوا تعديل صف في القاعدة بس، من غير ما تنقل bytes.

multipart upload: S3 بيسمح بلحد ١٠٠٠٠ جزء، وكل جزء (ما عدا الأخير) ٥ ميجا على الأقل. السيرفر بيبدأ الـ upload ويدّي المتصفح presigned URL لكل جزء. المتصفح بيرفع ٤ أجزاء مع بعض، وبيحفظ الـ ETag بتاع كل جزء. ولو النت قطع، [[ListParts]] بيقول إيه اللي وصل، فيكمّل الباقي بس. وفي الآخر complete بالـ ETags، و S3 بيجمّعهم ملف واحد. وlifecycle rule بتمسح الـ uploads اللي متكملتش بعد يوم أو أسبوع، وإلا هتدفع تمن أجزاء محدش شايفها.

الـ dedup: sha256 للملف (أو لكل chunk في الأنظمة الأكبر). لو الـ hash موجود، مفيش رفع أصلًا (Dropbox بيعمل كده على مستوى الـ blocks). بيوفّر تخزين كتير. بس خلي بالك من الخصوصية: dedup بين مستخدمين مختلفين ممكن يكشف إن «الملف ده موجود عند حد».

المزامنة: كل تغيير بيتسجّل في journal بـ رقم متزايد. الجهاز بيسأل [[GET /changes?cursor=]] («إيه اللي اتغير من آخر مرة؟») أو بياخد push إن فيه جديد. التعارض: لو نسختين اتعدلوا أوفلاين من نفس الـ version، متعملش overwrite: احفظ الاتنين («file (conflicted copy)»)، وده اللي Dropbox بيعمله.

الصلاحيات: موروثة من الفولدر. فحص الصلاحية بيطلع لفوق في الشجرة (مع كاش)، أو بتتخزن منسوخة على كل ملف وتتحدث لما الفولدر يتغير. والتنزيل دايمًا signed URL قصير بعد فحص الصلاحية، مش bucket public.

الأرقام: ٥٠٠ بيتابايت يعني التكلفة هي كل حاجة. نقل الملفات القديمة لـ storage class أرخص (S3 Glacier أو Infrequent Access)، وتكلفة الـ egress (التنزيل) كبيرة، ودي ليه R2 (من غير egress) بيتذكر.`,
            when: R`أسئلة المتابعة: «مشاركة بلينك عام؟» (token في الـ URL، وصلاحية قراية، وانتهاء). «معاينة PDF والصور؟» (job بيعمل thumbnails بعد الرفع). «حد أقصى للمساحة؟» (مجموع الـ sizes لكل مستخدم، بيتحدث في نفس transaction الـ version). «البحث جوه الملفات؟» (استخراج النص وindex منفصل).`,
            mistakes: "الملفات بتعدّي على سيرفر التطبيق. أو اسم الملف هو مفتاح S3، فإعادة التسمية بقت نسخ. أو رفع الملف الكبير كطلب واحد، فلو قطع عند ٩٥٪ يبدأ من الأول. أو bucket public. أو overwrite وقت التعارض. أو multipart uploads متعلّقة من غير lifecycle rule."
          },
          lines: [
            "المتطلبات والحجم. نص مليار جيجا يعني التكلفة والتخزين هما القرار.",
            "API: بداية رفع، وإنهاء، وتنزيل، وتغييرات للمزامنة.",
            "الشجرة والنسخ والمشاركة في القاعدة، والـ bytes مجرد مفتاح.",
            "الرفع أجزاء مباشرة لـ S3 بالتوازي، والفاشل بس بيتعاد.",
            "نفس المحتوى يتخزن مرة واحدة.",
            "التنزيل من S3 أو CDN مباشرة، ويقدر يكمّل من نص الملف.",
            "المشاكل: الصلاحيات، والتعارض، والأمان، والتنضيف."
          ],
          sol: R`الـ endpoints: (١) [[POST /files/uploads]] يعمل [[CreateMultipartUploadCommand]] ويخزن [[uploadId]] و key في جدول uploads بحالة pending، ويرجّع uploadId وعدد الأجزاء. (٢) [[GET /files/uploads/:id/parts/:n]] يعمل [[getSignedUrl(s3, new UploadPartCommand({ Bucket, Key, UploadId, PartNumber: n }), { expiresIn: 3600 })]] بعد ما يتأكد إن الـ upload بتاع المستخدم ده. (٣) [[POST /files/uploads/:id/complete]] بياخد قايمة فيها [[{ PartNumber, ETag }]] لكل جزء ويعمل [[CompleteMultipartUploadCommand]]، وبعدها يعمل version و file في transaction.

الـ ETag بيرجع في header الرد بتاع كل PUT، والمتصفح محتاج الـ bucket CORS يحط [[ETag]] في [[ExposeHeaders]]، وإلا مش هيقدر يقراه. دي أشهر مشكلة.

الاستكمال: المتصفح بيحفظ uploadId والـ ETags في IndexedDB. لما يرجع، يسأل السيرفر، والسيرفر يعمل [[ListPartsCommand]] ويرجّع أرقام الأجزاء اللي وصلت، فيرفع ٨ و ٩ و ١٠ بس.`
        },
        {
          cmd: "rate limiter service",
          title: "صمّم rate limiter كخدمة لكل الـ APIs",
          desc: R`الـ rate limiter بيحدد كل عميل (IP، أو user، أو API key) يقدر يعمل كام طلب في وقت معين، ويرد 429 لو عدّى. لما يبقى عندك سيرفرات كتير، العداد لازم يبقى في مكان مشترك (Redis)، والفحص لازم يبقى ذري وسريع جدًا لأنه قدام كل طلب.

الخوارزميات المشهورة: fixed window (عداد لكل دقيقة)، و sliding window، و token bucket (سطل بيتملى بمعدل ثابت وكل طلب بياخد token). الـ token bucket بيسمح بـ burst قصير ومتوسط ثابت، وده اللي أغلب الـ APIs الكبيرة بتستخدمه.`,
          example: R`المتطلبات: حدود لكل API key حسب الخطة (free 10/ث، pro 100/ث)، وحدود لكل IP على الـ login، وكل السيرفرات بتشوف نفس العداد، وإضافة أقل من 1ms للطلب
المكان: middleware في الـ gateway أو في كل نسخة، والعدادات في Redis (cluster لو الحجم كبير)
الخوارزمية: token bucket لكل key: tokens و lastRefill في hash، وسكربت Lua واحد يحسب ويخصم في خطوة ذرية
الرد: 429 مع Retry-After، و headers زي RateLimit-Limit و RateLimit-Remaining و RateLimit-Reset
القواعد: جدول rules(plan, route, capacity, refillPerSec) متكاش في الذاكرة، وبيتحدث من غير deploy
لو Redis وقع: fail open للـ API العادي (عدّي الطلبات، وسجّل)، و fail closed للـ login والـ OTP
المشاكل: hot keys (عميل واحد بيضرب جامد)، ودقة الساعات بين السيرفرات (استخدم وقت Redis)، والـ multi-region (حد لكل region أو sync متأخر)`,
          try: R`اكتب token bucket في Redis بسكربت Lua ([[redis.defineCommand]] في ioredis): capacity 10 و refill 5 في الثانية. ابعت ١٢ طلب ورا بعض واطبع النتيجة، واستنى ثانية وابعت طلب كمان. بعدين جاوب: ليه Lua ومش [[GET]] وبعدين [[SET]] من Node؟`,
          flag: "script",
          deep: {
            why: "الـ rate limiting بيحمي من الـ abuse، والتخمين، والـ scraping، وعميل واحد بكود فيه loop يوقّع الكل. وبيدّيك طريقة تبيع بيها خطط (الـ pro بياخد حدود أعلى). والسؤال بيختبر الخوارزميات، والذرية في نظام موزّع، والـ trade-off بين الدقة والسرعة والتوافر.",
            how: R`fixed window: [[INCR key:minute]] مع TTL. أبسط حاجة، بس عنده مشكلة الحافة: ١٠٠ طلب في آخر ثانية من دقيقة و ١٠٠ في أول ثانية من اللي بعدها = ٢٠٠ في ثانيتين والحد ١٠٠ في الدقيقة.

sliding window log: timestamp لكل طلب في sorted set، وتعد اللي في آخر ٦٠ ثانية. دقيق، بس بياكل ذاكرة (صف لكل طلب). و sliding window counter: عداد الدقيقة الحالية + عداد اللي قبلها مضروب في النسبة الباقية. تقريب ممتاز ورخيص (Cloudflare بتستخدمه).

token bucket: السطل فيه لحد capacity، وبيتملى بـ refill في الثانية. كل طلب بياخد واحد. مفيش؟ 429. بيسمح بـ burst لحد الـ capacity، وبعدين بمتوسط الـ refill. ومش محتاج timer: وقت الطلب بتحسب اتملى قد إيه من آخر مرة ([[(now - ts) * rate]]).

الذرية: لو كل سيرفر عمل GET وبعدين حسب وبعدين SET، طلبين في نفس اللحظة من سيرفرين هيقروا نفس القيمة والاتنين يعدّوا. سكربت Lua بيتنفذ في Redis كخطوة واحدة، محدش يتدخل في النص. وكمان بيوفّر round trips (واحدة بدل ٣).

الوقت: لو كل سيرفر بيبعت وقته، والساعات مختلفة شوية، الحسابات تتلخبط. الأدق [[redis.call("TIME")]] جوه السكربت.

لو Redis وقع: قرار منتج. الـ API العادي: fail open (عدّي من غير حد، وتنبيه)، لأن وقوع الـ API كله أسوأ من إن الحد يتعدّى دقايق. الـ login والـ OTP: fail closed، أو حد في الذاكرة لكل نسخة كاحتياطي.

الـ headers: [[Retry-After]] بالثواني بيقول للعميل يستنى قد إيه. و [[RateLimit-*]] (draft في IETF، ومكتبات زي express-rate-limit بتدعمه) بيخلي العملاء المحترمين يبطّأوا قبل ما يخبطوا الحد.

الحجم: ١٠٠ ألف طلب في الثانية = ١٠٠ ألف سكربت Lua في الثانية. Redis واحد بيستحمل ده غالبًا، وأكتر من كده Redis Cluster بالـ key (كل عميل على shard). وبديل للحجم الضخم: عداد محلي في كل نسخة بيتزامن مع Redis كل ثانية، وده أقل دقة وأسرع بكتير.`,
            when: R`أسئلة المتابعة: «حد لكل endpoint مختلف؟» (القواعد بـ route). «عميل عنده ١٠٠ سيرفر وكلهم بنفس الـ key؟» (نفس الـ bucket، ده المطلوب). «حد يومي مع حد في الثانية؟» (bucketين، والطلب لازم يعدّي الاتنين). «multi-region؟» (حد لكل region = الحد الكلي / عدد الـ regions، أو تزامن متأخر ومقبول).`,
            mistakes: "عداد في ذاكرة كل نسخة (الحد الحقيقي بقى الحد × عدد النسخ). أو GET ثم SET من غير ذرية. أو fixed window ونسيان مشكلة الحافة. أو 429 من غير Retry-After فالعملاء يعيدوا فورًا ويزودوا الضغط. أو الحد بالـ IP بس لـ API بمفاتيح (شركة كاملة ورا IP واحد). أو fail closed على الـ API كله فوقوع Redis وقّع كل حاجة."
          },
          lines: [
            "المتطلبات: حدود بالخطة، ومشتركة بين السيرفرات، وسريعة جدًا.",
            "الفحص قدام الطلب، والعدادات في مكان واحد مشترك.",
            "token bucket في Redis، والحساب والخصم خطوة واحدة.",
            "الرد اللي بيقول للعميل يستنى قد إيه.",
            "القواعد في جدول، فتتغير من غير deploy.",
            "قرار واضح لو Redis وقع، ومختلف حسب خطورة الـ endpoint.",
            "المشاكل في الأحجام الكبيرة."
          ],
          sol: R`النتيجة في تجربة فعلية: الـ ١٢ طلب ورا بعض طلّعوا [[111111111100]]، يعني أول ١٠ عدّوا (الـ capacity) وآخر ٢ اترفضوا. وبعد ثانية: الطلب عدّى، وفاضل ٤ tokens (السطل اتملى ٥ في الثانية، وخدنا واحد).

ليه Lua: الـ GET والـ SET من Node خطوتين، وبينهم طلب تاني من سيرفر تاني ممكن يقرا نفس القيمة، فالاتنين يعدّوا على نفس الـ token. السكربت بيتنفذ في Redis كوحدة واحدة، ومحدش يقدر يدخل في النص. وكمان رحلة واحدة للشبكة بدل اتنين.

الغلطة الشائعة: تنسى [[PEXPIRE]] فكل key اتعمل مرة بيعيش للأبد في Redis.`,
          solCode: R`redis.defineCommand("takeToken", { numberOfKeys: 1, lua: $__bt
local cap = tonumber(ARGV[1]); local rate = tonumber(ARGV[2]); local now = tonumber(ARGV[3])
local b = redis.call("HMGET", KEYS[1], "tokens", "ts")
local tokens = tonumber(b[1]) or cap; local ts = tonumber(b[2]) or now
tokens = math.min(cap, tokens + (now - ts) / 1000 * rate)
local ok = 0
if tokens >= 1 then tokens = tokens - 1; ok = 1 end
redis.call("HSET", KEYS[1], "tokens", tokens, "ts", now)
redis.call("PEXPIRE", KEYS[1], math.ceil(cap / rate * 1000))
return { ok, math.floor(tokens) }$__bt });

export async function allow(key, capacity, perSec) {
  const [ok, left] = await redis.takeToken($__btrl:$__{key}$__bt, capacity, perSec, Date.now());
  return { ok: ok === 1, left };
}`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتسأل عن بناء منتج كامل، بإجابة تتقال بصوت عالي، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "من الفكرة للإنتاج",
          title: "احكيلي هتبني منتج زي ده من الصفر إزاي (Walk me through building X from scratch)",
          desc: R`أبدأ بالمتطلبات: مين المستخدمين، وإيه الـ core loop، وإيه اللي يدخل الـ MVP، وأرقام تقريبية للحمل. بعدين أرسم الـ ERD، وأكتب قايمة الـ endpoints ومعاها الصلاحيات. أختار monolith مترتب بـ modules، مثلًا Next.js و API بـ Express و PostgreSQL، وأكتب القرار في ADR. أرفع walking skeleton على staging من أول أسبوع، وبعدين أبني vertical slices: الكتالوج، وبعدين الـ auth، وبعدين الدفع بـ webhook متحقق منه و idempotent. وقبل الإطلاق: مراقبة أخطاء، ولوجات، وباك أب متجرّب، و CI.`,
          try: "جاوب السؤال ده على منصة حجز حصص جيم في ٣ دقايق بالظبط، بالترتيب ده. بعدين جاوبه تاني وقول فيه قصة حقيقية واحدة من مشروع عملته.",
          deep: {
            why: "بيقيسوا إنك شايف الصورة كلها، مش أداة واحدة، وإنك بترتّب الشغل حسب المخاطر والقيمة، مش حسب الحاجة اللي بتحبها.",
            how: R`قسّم الإجابة لمراحل: الفهم، والتصميم، والبناء، والإطلاق، وحط لكل مرحلة جملة واحدة وقرار واحد وسببه. واذكر حاجة واحدة بتدل إنك عملت كده قبل كده: «في مشروع كان الـ webhook بيعدّي من غير تحقق، فبقيت أبدأ بيه». القصة الحقيقية بتفرق أكتر من أي مصطلح.

الإجابة دي هي التاب ده كله في دقيقتين. لو حد سألك تفاصيل أي جزء، ارجع للدرس بتاعه.`,
            when: R`«ليه مش microservices؟». «هتعمل الـ auth إزاي؟». «لو البوابة وقعت؟». «هتختبر إزاي؟». «هتعرف إن المنتج نجح إزاي؟».`,
            mistakes: "إنك تبدأ بأسماء أدوات («هستخدم Next و Prisma و Redis و Kafka») قبل ما تقول بتحل إيه. أو تعدّد ١٥ تقنية. أو تنسى الحاجات اللي مش ميزات: الأمان، والباك أب، والمراقبة. أو متقولش هتبدأ بإيه وهتأجّل إيه."
          },
          sol: R`إجابة نموذجية لمنصة حجز حصص جيم في ٣ دقايق، والنقط اللي لازم تتقال: (١) المتطلبات: عضو بيحجز حصة، ومدرب بيدير حصصه، وأدمن. الـ core loop: يشوف الجدول، ويحجز مكان، ويحضر. والأرقام: جيم واحد أو سلسلة؟ كام حصة وكام عضو؟ (٢) الداتا: members و classes (startsAt و capacity و booked) و bookings عليها unique (classId, memberId)، و subscriptions. (٣) أصعب حتة وبقولها بدري: الحجز وقت فتح الجدول، بـ UPDATE مشروط عشان مفيش over-booking. (٤) الـ stack: monolith بـ modules و PostgreSQL، وليه. (٥) الترتيب: skeleton على staging، وبعدين الجدول، وبعدين الحجز، وبعدين الاشتراك والدفع. (٦) الإنتاج: مراقبة، وباك أب متجرّب، و CI.

في المرة التانية، القصة الحقيقية بتدخل في النقطة الأصعب. مثلًا: «في مشروع قبل كده، عملت الحجز بـ اقرا وبعدين اكتب، وأول يوم فيه ضغط لقينا حصة فيها ١٢ واحد وهي ١٠. غيرتها لـ UPDATE مشروط، وضفت اختبار بيبعت ٥٠ طلب مع بعض». قصة واحدة بأرقام أحسن من ٣ عامة.

علامات إن الإجابة وحشة: بدأت بالتكنولوجيا ([[Next.js و Kafka]]) قبل المستخدمين، أو عدّت ميزات من غير ترتيب، أو خلصت الـ ٣ دقايق من غير ما تقول كلمة عن الإنتاج (مراقبة وباك أب).`
        },
        {
          cmd: "modular monolith أولًا",
          title: "Monolith ولا microservices؟ (Monolith vs microservices)",
          desc: R`ببدأ بـ monolith مترتب بـ modules حدودها واضحة. فريق صغير بياخد منه أسرع تطوير، وأسهل deploy، و transactions حقيقية بين الجداول، ولوج واحد. الـ microservices بتحل مشكلة فرق كتير محتاجة تنشر بشكل مستقل، أو جزء محتاج scaling أو تقنية مختلفة جدًا. وتمنها شبكة بتفشل، وداتا موزعة، ومراقبة أصعب. ولو ظهر سبب حقيقي، بطلّع module واحد حدوده واضحة أصلًا، زي معالجة الفيديو، مش بقسّم كله مرة واحدة.`,
          try: "اختار module من مشروعك (الإيميلات مثلًا)، واكتب هتحتاج إيه عشان تطلّعه service لوحده: API، وقاعدة، و deploy، ومراقبة، وإيه اللي هيحصل لو وقع. المقارنة دي هي إجابة السؤال.",
          deep: {
            why: "بيقيسوا إنك بتختار على أساس المشكلة مش الموضة، وإنك عارف تمن كل اختيار.",
            how: R`تمن الـ microservices بالتفصيل. أولًا، كل نداء بقى طلب شبكة ممكن يبطأ أو يفشل، فمحتاج timeouts و retries و circuit breakers. تانيًا، الـ transaction بين خدمتين مبقتش ممكنة، فمحتاج saga أو outbox pattern. تالتًا، الداتا بتتكرر بين الخدمات. رابعًا، تتبّع طلب واحد عبر ٥ خدمات محتاج distributed tracing. خامسًا، كل تغيير في العقد بين خدمتين محتاج versioning. وسادسًا، التطوير على جهازك بقى محتاج ١٠ حاجات شغالة.

والعلامات اللي بتقول إن الوقت جه: فرق مختلفة بتتعطل على بعض في الـ deploy (قانون Conway). أو جزء حمله مختلف تمامًا عن الباقي. أو جزء محتاج لغة تانية، زي Python للـ ML. والطريقة: strangler fig، يعني تطلّع جزء جزء وتحوّل الترافيك له تدريجيًا.`,
            when: R`«إزاي تعمل transaction بين خدمتين؟» (saga و outbox). «الخدمات بتكلّم بعض إزاي؟» (HTTP أو gRPC متزامن، أو events في queue). «إزاي تعرف إن الـ monolith لازم يتقسم؟».`,
            mistakes: "«الـ microservices أحسن عشان بتعمل scale». الـ monolith بيعمل scale أفقي عادي بنسخ كتير. أو إنك تقول «monolith يعني spaghetti»، والترتيب مالوش علاقة بعدد الـ deploys. أو تقسّم بالطبقات (خدمة للـ auth، وخدمة للقاعدة) بدل الميزات."
          },
          sol: R`مثال لـ module الإيميلات. عشان يبقى service لوحده محتاج: API أو queue بعقد واضح (مين بيبعت إيه وبأنهي شكل)، ومصادقة بين الخدمتين، وقاعدة أو على الأقل جدول خاص بيه للـ deliveries، و repo أو pipeline و deploy لوحدهم، ولوج بـ request id بيعدّي بين الخدمتين، ومراقبة و alerts ليه، ونسخ متوافقة من العقد وقت ما واحدة تتنشر قبل التانية.

ولو وقع: في الـ monolith، الإيميل بيفشل والـ job يتعاد. كخدمة لوحدها، لازم تقرر: الـ API يستنى؟ يرمي خطأ؟ يحط في queue؟ والتسجيل اللي كان transaction واحدة («اعمل user وحط job») بقى خطوتين ممكن واحدة تنجح والتانية لأ، فمحتاج outbox pattern.

الخلاصة اللي بتتقال في الانترفيو: كل ده تمن حقيقي. يستاهل لو الإيميلات بقت بالملايين ومحتاجة scaling لوحدها، أو فيه فريق تاني بيملكها وعايز ينشر لوحده. غير كده، module جوه الـ monolith بـ interface واضحة بيدّيك ٩٠٪ من الفايدة، ويخلي التقسيم بعدين سهل.`
        },
        {
          cmd: "السيرفر هو المصدر",
          title: "هتأمّن الدفع إزاي؟ (How would you secure payments?)",
          desc: R`أهم قاعدة إن المتصفح مبيقررش حاجة. السعر بيتحسب على السيرفر من القاعدة، والطلب بيتعمل PENDING. وبيانات الكارت مبتلمسش سيرفري، بتتكتب في صفحة البوابة. التفعيل بييجي من الـ webhook بس، بعد ما أتحقق من توقيع HMAC بمقارنة وقتها ثابت، وأتأكد إن المبلغ هو مبلغ الطلب، وأحدّث الحالة بـ update مشروط جوه transaction عشان التكرار ميفعّلش مرتين. وصفحة الرجوع بتعرض الحالة من السيرفر بس، وعندي job بيراجع الطلبات المعلقة مع البوابة، ولوج لكل webhook.`,
          example: R`const { count } = await t.order.updateMany({ where: { id: orderId, status: { not: "PAID" } }, data: { status: "PAID" } });
if (count === 1) await grantAccess(t, order);`,
          try: "اكتب ٥ هجمات على نظام دفع (غيّر السعر، و webhook مزيف، و webhook مكرر، وفتح صفحة النجاح بإيدك، وكوبون مستخدم مرتين)، وجنب كل واحدة السطر اللي بيمنعها في كودك.",
          flag: "script",
          deep: {
            why: "الدفع أكتر مكان الغلط فيه بيتحوّل لفلوس ضايعة. والإجابة بتوضح إذا كنت بتفكر كمهاجم ولا لأ.",
            how: R`رتّب الإجابة كطبقات. قبل الدفع: السعر من السيرفر، والكوبون بيتحسب هناك. وقت الدفع: صفحة البوابة، والمفتاح السري على السيرفر بس. بعد الدفع: توقيع، ومبلغ، وحالة ذرية، و transaction. ولو حاجة ضاعت: reconciliation ولوج.

وبعدها اذكر حاجة شفتها بنفسك، زي webhook كان بيعدّي لو التوقيع مش موجود. وقول إزاي كنت هتكتشفها: اختبار بيبعت webhook من غير توقيع ولازم يرجع 401. التفاصيل في دروس الدفع في المستوى التاني.`,
            when: R`«لو الـ webhook موصلش خالص؟» (reconciliation job). «لو وصل مرتين في نفس اللحظة؟». «ليه timingSafeEqual؟». «الاسترداد بيتعمل إزاي؟». «PCI DSS يعني إيه بالنسبالك؟».`,
            mistakes: "«بفعّل لما المستخدم يرجع على صفحة النجاح». أو «بتأكد إن success=true في الـ URL». أو «HTTPS كفاية». أو إنك تخزن أرقام الكروت. أو تقارن الـ HMAC بـ ===. أو تمنع التكرار بـ select وبعدين insert من غير قيد في القاعدة."
          },
          lines: [
            "حوّل الطلب لـ PAID بشرط إنه لسه مش PAID. قراية وكتابة في خطوة واحدة.",
            "لو احنا اللي حوّلناه دلوقتي بس، ادّي الصلاحية، في نفس الـ transaction."
          ],
          sol: R`الإجابة النموذجية، هجمة جنبها السطر اللي بيمنعها:

١. تغيير السعر: [[amountCents: course.priceCents]] في [[POST /orders]]. السعر من القاعدة، والـ body فيه [[courseId]] بس. ٢. webhook مزيف: [[if (!verifyPaymob(tx, req.query.hmac, secret)) return res.status(401).end()]] بمقارنة [[timingSafeEqual]]، وقبل التفعيل [[tx.amount_cents !== order.amountCents]]. ٣. webhook مكرر: [[updateMany({ where: { id, status: { not: "PAID" } } })]] و [[if (count === 1)]]، ومعاهم [[@@unique([userId, courseId])]] و [[gatewayTxId @unique]]. ٤. فتح صفحة النجاح بإيدك: الصفحة بتقرا [[GET /orders/:id]] من السيرفر ومبتبصش على [[?success=true]]، والفيديو محمي بـ enrollment مش بالصفحة. ٥. كوبون مرتين: [[UPDATE coupons SET used = used + 1 WHERE code = $1 AND used < max_uses]] وتشوف عدد الصفوف، أو جدول [[coupon_redemptions]] عليه [[unique(couponId, userId)]].

لو واحدة من الخمسة ملقتلهاش سطر، وقلت «الواجهة مش هتسمح»، يبقى دي الثغرة. أي حاجة في المتصفح المهاجم بيتحكم فيها.`
        },
        {
          cmd: "signed URLs + async",
          title: "هتتعامل مع رفع ملفات كتير وكبيرة إزاي؟ (Handle file uploads at scale)",
          desc: R`الملفات مبتعدّيش على سيرفر الـ API خالص. السيرفر بيتأكد من الصلاحية والنوع والحجم، ويدّي الـ client رابط موقّع عمره دقايق، والـ client بيرفع مباشرة على S3 أو R2. بعد الرفع، الـ client بيبلّغ السيرفر بالـ key، والسيرفر يتأكد إن الملف موجود ونوعه وحجمه مظبوط، ويحط job في queue للمعالجة: تصغير صور، أو تحويل فيديو لـ HLS. والملفات الكبيرة بترفع multipart أو resumable، والقراية من CDN، والملفات الخاصة بروابط موقّعة قصيرة.`,
          example: R`const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket, Key: key, ContentType: type }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) });`,
          try: "ارسم الفلو ده على ورقة بالأسهم: المتصفح، والـ API، و S3، والـ queue، والـ worker، والـ CDN. واكتب على كل سهم إيه اللي بيتبعت فيه. لو فيه سهم فيه الملف نفسه رايح للـ API، ارجع للدرس.",
          flag: "script",
          deep: {
            why: "بيقيسوا إنك عارف إن الملفات الكبيرة ممكن توقّع السيرفر، وإنك بتفصل الرفع عن المعالجة عن العرض.",
            how: R`النقط اللي بتميّز الإجابة. أولًا، الـ presigned PUT مبيقفلش الحجم، فالحل presigned POST بـ [[content-length-range]]، أو تتأكد بعد الرفع. تانيًا، الـ key بيتعمل على السيرفر ومعاه id المستخدم، عشان محدش يكتب على ملف حد. تالتًا، lifecycle rule بيمسح الملفات اللي اترفعت ومتربطتش بحاجة. رابعًا، فحص فيروسات في الـ job لو الملفات بتتشارك بين الناس. وخامسًا، الفيديو بـ HLS من خدمة متخصصة، بتوكنات قصيرة. التفاصيل في درسين الرفع والصور في المستوى التاني.`,
            when: R`«إزاي تمنع ملف ١٠ جيجا؟». «ملف اترفع ومحدش ربطه؟». «فيروسات؟». «الفيديو هيتعرض إزاي ويتحمي إزاي؟». «رفع من نت ضعيف بيقطع؟» (resumable و tus).`,
            mistakes: "«بستقبله بـ multer وبحفظه على الديسك». أو إنك تصدّق الامتداد أو الـ Content-Type اللي جاي من الـ client. أو bucket public للملفات الخاصة. أو اسم الملف الأصلي كـ key."
          },
          lines: [
            "رابط PUT موقّع للـ key ده والنوع ده بس (signableHeaders بيدخّل الـ Content-Type في التوقيع)، عمره ٥ دقايق."
          ],
          sol: R`الأسهم الصح، وعلى كل سهم اللي بيتبعت فيه:

١. المتصفح ← الـ API: [[{ type, size }]] بس (JSON صغير). ٢. الـ API ← المتصفح: [[{ url, key }]]. ٣. المتصفح ← S3: الملف نفسه بـ PUT على الرابط الموقّع. ده السهم الوحيد اللي فيه الملف. ٤. المتصفح ← الـ API: [[{ key }]] («خلصت»). ٥. الـ API ← S3: [[HeadObject]] يتأكد إن الملف موجود وحجمه ونوعه. ٦. الـ API ← الـ queue: job فيه [[key]]. ٧. الـ worker ← S3: يقرا الأصل، ويكتب النسخ المعالجة. ٨. الـ worker ← القاعدة: [[coverReady: true]]. ٩. المتصفح ← الـ CDN: يقرا النسخ المعالجة، والـ CDN بياخدها من S3 أول مرة ويكاشها.

لو رسمت سهم من المتصفح للـ API عليه «الملف» أو [[multipart/form-data]]، ده بالظبط اللي الدرس بيحاول يشيله: كل ميجا بتعدّي على سيرفرك بتاكل bandwidth و RAM وبتحجز connection. وسهم ناقص بيتنسى كتير: الخطوة ٥. من غيرها، الـ client يقدر يقول «خلصت» بـ key لملف مرفعش، أو رفع حاجة غير اللي قال عليها.`
        },
        {
          cmd: "قيس ثم stateless",
          title: "الترافيك هيزيد ١٠ أضعاف الشهر الجاي. هتعمل إيه؟ (Design for 10x traffic)",
          desc: R`أول حاجة أقيس. عنق الزجاجة فين فعلًا: CPU السيرفر، ولا القاعدة، ولا API خارجية؟ وأعمل load test بشكل الترافيك المتوقع. بعدين الحاجات الرخيصة: indexes، وحل N+1، وكاش للقراية العامة، و CDN للملفات. بعد كده أتأكد إن التطبيق stateless: الـ sessions والملفات والـ cron والـ sockets كلهم برّه الـ process، فأقدر أشغّل كذا نسخة ورا load balancer. الشغل التقيل يروح queues. والقاعدة: connection pooling، وبعدين read replicas. وأجهّز سعة زيادة قبل الحدث، ومعاها مراقبة وخطة rollback.`,
          example: R`import http from "k6/http";
export const options = { stages: [{ duration: "2m", target: 500 }, { duration: "5m", target: 500 }] };
export default () => http.get("https://staging.example.com/courses");`,
          try: R`شغّل الـ load test ده على staging بـ [[k6 run load.js]]، وزوّد الـ target لحد ما الـ p95 يعدّي ثانية. بص في نفس الوقت على CPU السيرفر والقاعدة: مين وصل ١٠٠٪ الأول؟ ده عنق الزجاجة.`,
          flag: "script",
          deep: {
            why: "بيقيسوا إنك بتقيس قبل ما تصرف، وإنك عارف إن التطبيق مبيكبرش أفقي من غير ما يبقى stateless.",
            how: R`الإجابة القوية فيها أرقام. «الـ p95 بتاع صفحة الكورس دلوقتي ٣٠٠ ملّي ثانية على ٥٠ طلب في الثانية، والمتوقع ٥٠٠، فهعمل load test عند ٧٥٠ عشان يبقى فيه هامش». وبعدين الترتيب اللي في درس الـ scaling path.

وقول إيه اللي هيحصل لو الحمل عدّى المتوقع برضه (graceful degradation). وقّف الحاجات اللي مش أساسية (التوصيات، والإحصائيات اللايف)، و rate limit، و queue للعمليات التقيلة، وصفحة «زحمة، جرّب كمان شوية» بدل ما كل حاجة تقع.`,
            when: R`«إزاي تعرف عنق الزجاجة فين؟». «القاعدة لوحدها مش مكفية، تعمل إيه؟». «spike مفاجئ من غير تحضير؟». «هتختبر ده قبل الحدث إزاي؟».`,
            mistakes: "«هعمل Kubernetes» أو «هقسّمه microservices» كأول إجابة. أو تكبّر سيرفرات التطبيق والمشكلة في القاعدة. أو تنسى الـ sockets والـ sticky sessions. أو متعملش load test قبل الحدث."
          },
          lines: [
            "k6: أداة load test بتتكتب JavaScript.",
            "زوّد لحد ٥٠٠ مستخدم في دقيقتين، واثبت عليهم ٥ دقايق.",
            "كل مستخدم وهمي بيطلب صفحة الكورسات على staging."
          ],
          sol: R`اللي هتشوفه في ملخص k6 في الآخر: [[http_req_duration]] ومعاه [[p(90)]] و [[p(95)]]، و [[http_req_failed]] ونسبته، و [[iterations]] في الثانية. مع زيادة الـ target، الـ p95 بيفضل ثابت تقريبًا لحد نقطة، وبعدها بيقفز فجأة، والـ failed بيبدأ يزيد. النقطة دي هي سعتك الحالية. وضيف [[thresholds: { http_req_duration: ["p(95)<1000"] }]] عشان k6 يقولك لوحده إمتى عدّيت الحد.

قراية الـ CPU: لو السيرفر وصل ١٠٠٪ والقاعدة مرتاحة، التطبيق هو العنق: scale أفقي (نسخ أكتر) أو كاش. لو القاعدة وصلت الأول، أو ظهرت [[too many connections]] أو [[Timed out fetching a new connection from the connection pool]] في اللوج، القاعدة أو الـ pool هم العنق: indexes، و N+1، وكاش، وبعدين pooling و replicas. ولو الاتنين مرتاحين والـ p95 عالي، دوّر على API خارجية بطيئة أو lock.

أهم قواعد التجربة: متعملهاش على الإنتاج، ومتشغّلش k6 من نفس السيرفر اللي بتختبره (هيتنافسوا على الـ CPU)، واختبر endpoint حقيقي بيكلم القاعدة، مش [[/health]].`,
          solCode: R`import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [{ duration: "2m", target: 500 }, { duration: "5m", target: 500 }, { duration: "1m", target: 0 }],
  thresholds: { http_req_duration: ["p(95)<1000"], http_req_failed: ["rate<0.01"] },
};
export default () => {
  const res = http.get("https://staging.example.com/courses");
  check(res, { "status 200": (r) => r.status === 200 });
};
// k6 run load.js
// وفي نفس الوقت: htop على سيرفر الـ API، و SELECT count(*) FROM pg_stat_activity; على القاعدة`
        },
        {
          cmd: "cache-aside + TTL",
          title: "استراتيجية الكاش بتاعتك إيه؟ (Caching strategy)",
          desc: R`بكاش الحاجات اللي بتتقري كتير وبتتغير قليل، وبعد ما أقيس. الطبقات: المتصفح والـ CDN بـ Cache-Control للصفحات والملفات العامة، وبعدين Redis في التطبيق بنمط cache-aside. أدوّر في الكاش، ولو مش موجود أقرا من القاعدة وأحفظ بـ TTL. ولما الداتا تتغير، بمسح الـ key في نفس مكان التعديل، والـ TTL شبكة أمان لو المسح اتنسى. والداتا الخاصة بمستخدم مبتتكاشش في CDN، وأي حاجة فيها فلوس (زي السعر وقت الدفع) بتتقري من القاعدة مش من الكاش.`,
          example: R`const hit = await redis.get(key);
if (hit) return JSON.parse(hit);
const fresh = await loadFromDb(); await redis.set(key, JSON.stringify(fresh), "EX", 300); return fresh;`,
          try: "اختار ٣ endpoints من مشروعك، واكتب لكل واحد: يتكاش؟ فين؟ الـ TTL كام؟ مين بيمسحه؟ ولو اتقرا قديم، إيه أسوأ حاجة ممكن تحصل؟ السؤال الأخير هو اللي بيحدد الإجابة.",
          flag: "script",
          deep: {
            why: "بيقيسوا إنك عارف إن الكاش ليه تمن: داتا قديمة، وتعقيد في المسح، ومشاكل لما يخلص.",
            how: R`قارن الأنماط. الـ cache-aside: التطبيق بيدير الكاش، وهو الأشهر. الـ write-through: كل كتابة بتروح الكاش والقاعدة مع بعض، فالكاش دايمًا محدّث، بس الكتابة أبطأ. والـ write-back: الكتابة في الكاش وبعدين للقاعدة، أسرع بس ممكن تضيع داتا.

واذكر المشاكل وحلها. الـ stampede: lock، أو stale-while-revalidate. والـ invalidation لما الداتا بتتغير في أكتر من مكان: events بتمسح الـ keys. ولو Redis وقع، ارجع للقاعدة. التفاصيل في درس طبقات الكاش.`,
            when: R`«cache stampede؟». «إزاي تمسح الكاش لما الداتا تتغير من أكتر من مكان؟». «write-through ولا write-back؟». «Redis وقع، التطبيق يعمل إيه؟».`,
            mistakes: "«بكاش كل حاجة». أو إنك مش عندك خطة للمسح. أو تكاش داتا مستخدم تحت key مشترك، فتتسرب داتا بين المستخدمين. أو تعامل الكاش كأنه المصدر الأساسي للداتا."
          },
          lines: [
            "دوّر في الكاش.",
            "لقيته؟ رجّعه.",
            "ملقيتوش؟ هاته من القاعدة، واحفظه ٥ دقايق، ورجّعه."
          ],
          sol: R`مثال لإجابة كاملة على ٣ endpoints في myapp:

[[GET /courses]] (القايمة العامة): أيوه، في الـ CDN بـ [[Cache-Control: public, s-maxage=60, stale-while-revalidate=300]]، وفي Redis كمان. الـ TTL دقيقة. بيتمسح لما كورس يتنشر أو يتعدل. أسوأ حاجة لو اتقرا قديم: كورس جديد يتأخر دقيقة. مقبول. [[GET /courses/:slug]]: أيوه، Redis بـ TTL ٥ دقايق، والـ [[updateCourse]] بيمسح الـ key. أسوأ حاجة: عنوان أو وصف قديم لدقايق، أو سعر قديم في الصفحة. مقبول بشرط إن الدفع بياخد السعر من القاعدة مش من الكاش. [[GET /me/enrollments]]: لأ في الـ CDN خالص (داتا مستخدم). وفي Redis، الأحسن لأ: أسوأ حاجة إن طالب دفع ومش لاقي الكورس، وده تذكرة دعم فني وثقة ضايعة، والاستعلام أصلًا رخيص بـ index.

القاعدة اللي بتطلع من السؤال الأخير: لو القديم معناه إزعاج بسيط، كاش بـ TTL. لو معناه فلوس أو صلاحيات أو المستخدم مش شايف حاجة لسه عاملها، متكاشش، أو امسح فورًا واقرا من الـ primary.`
        },
        {
          cmd: "core loop",
          title: "هتحدد أولويات الـ MVP إزاي؟ (How do you prioritize an MVP?)",
          desc: R`بحدد الـ core loop: الطريق اللي المستخدم بياخد فيه القيمة وبيدفع، وده بس اللي يدخل Must. كل حاجة تانية بقسّمها MoSCoW، وبدوّر لها على بديل يدوي في الأول. بقيّم كل ميزة بالقيمة قصاد المجهود والمخاطرة، وبقدّم الحاجات الخطرة أو اللي ليها اعتماد خارجي، زي حساب بوابة الدفع. بس الأمان والباك أب والمراقبة مش ميزات تتقسم، دول شروط. وبحط مقياس نجاح واضح قبل الإطلاق، عشان أعرف أعمل إيه بعده.`,
          try: "خد آخر مشروع عملته، وطلّع منه الـ core loop في سطر واحد. بعدين عدّ الميزات اللي اتعملت برّه الـ loop قبل الإطلاق. كل واحدة منهم كانت ممكن تستنى.",
          deep: {
            why: "بيقيسوا إنك بتفكر في المنتج مش في الكود بس، وإنك تقدر تقول «لأ» أو «بعدين» بسبب مقنع.",
            how: R`استخدم مثال بالأرقام: «منصة الكورسات كان فيها ٢٠ ميزة مطلوبة. الـ loop كان: يلاقي، ويدفع، ويتفرج. ده ٦ ميزات، و ٤ أسابيع. الكوبونات اتعملت يدوي من الأدمن أول شهرين، وطلع إن محدش بيستخدمها غير في العروض».

ومقياس النجاح مثلًا: ٥٠ عملية شراء في أول شهر، و ٤٠٪ يتفرجوا على أول درس في ٢٤ ساعة. من غيره مش هتعرف الـ MVP نجح ولا لأ.`,
            when: R`«العميل عايز كل حاجة في النسخة الأولى، هتعمل إيه؟». «هتعرف إن الـ MVP نجح إزاي؟». «مثال على ميزة شلتها وليه؟».`,
            mistakes: "«بعمل اللي العميل يقوله». أو «MVP يعني جودة أقل». أو من غير مقياس نجاح. أو إنك تأجّل الأمان عشان «ده MVP»."
          },
          sol: R`مثال لإجابة كاملة: مشروع متجر صغير، الـ core loop «الزبون يلاقي المنتج، ويدفع، ويستلم، ويعرف حالة طلبه». الميزات اللي اتعملت برّه الـ loop قبل الإطلاق، وكان ممكن تستنى: wishlist، وتقييمات، وكوبونات، ودخول بجوجل، ودارك مود، ولوحة إحصائيات للأدمن. ٦ ميزات، يعني أسابيع اتأخر فيها الإطلاق من غير ما حد يكون طلبها.

الإجابة القوية في الانترفيو بتربط الرقم بدرس: «الـ ٦ دول أخّروا الإطلاق شهر، ولما اطلقنا لقينا إن المشكلة الحقيقية كانت في الشحن مش في أي واحدة منهم». وبتفرّق بين ميزة ليها بديل يدوي (الكوبونات ممكن تتعمل بخصم يدوي من الأدمن) وميزة ملهاش (الدفع).

وخلي بالك: لو عديت الأمان أو الباك أب أو المراقبة ضمن «كان ممكن تستنى»، دي إجابة غلط. دول شروط لأي إطلاق، مش ميزات.`
        },
        {
          cmd: "mitigate ثم postmortem",
          title: "حصلت مشكلة في الإنتاج. بتتصرف إزاي؟ (How do you handle a production incident?)",
          desc: R`أول حاجة أوقف النزيف قبل ما أدوّر على السبب. أعرف التأثير من المراقبة (Sentry، واللوجات، والـ uptime)، وأبلّغ اللي محتاجين يعرفوا. لو المشكلة بدأت بعد deploy، برجّع النسخة اللي قبلها فورًا، أو بقفل الميزة بـ feature flag. بعد ما الوضع يستقر، بدوّر على السبب الحقيقي بالـ request id في اللوجات، وبصلّح، وبتأكد إن مفيش داتا باظت، زي طلبات اتدفعت ومتفعّلتش. وفي الآخر postmortem من غير لوم: حصل إيه، واتأخرنا نعرف ليه، وإيه اللي هيمنع تكراره، زي alert جديد أو اختبار.`,
          example: R`IMAGE_TAG=1.3.9 docker compose up -d api
docker compose logs --since 30m api | grep '"level":50' | head`,
          try: R`اكتب postmortem لمشكلة حصلتلك قبل كده في ٥ عناوين: الملخص، والتأثير (مين، وقد إيه، وكام دقيقة)، والتسلسل الزمني، والسبب الجذري، والإجراءات (كل واحد ليه صاحب وميعاد). ومن غير اسم أي حد في خانة السبب.`,
          deep: {
            why: "بيقيسوا إنك هادي تحت الضغط، وبترتّب صح: التأثير الأول، وبعدين السبب. وإنك بتتعلم من المشاكل مش بتدوّر على حد تلومه.",
            how: R`اتكلم بالترتيب ده: اكتشاف، وتقييم، وتخفيف، وتواصل، وحل، ومراجعة. والتخفيف قبل الحل دايمًا. رجوع لنسخة قديمة في دقيقتين أحسن من ساعة debugging والناس مش عارفة تدفع.

والـ rollback ممكن ميبقاش سهل لو الـ deploy فيه migration بتمسح عمود، وده سبب كويس للـ expand/contract (سؤال جاي).

وبعد الحل، مطابقة الداتا جزء من الحل. مثلًا لو الـ webhooks كانت بتفشل ساعة، الـ reconciliation job بيعدّي على الطلبات المعلقة. والـ postmortem بيطلع منه إجراءات ليها صاحب وميعاد، مش «هناخد بالنا».`,
            when: R`«هتعرف إن فيه مشكلة قبل العميل إزاي؟». «لو الـ rollback مش ممكن؟». «احكيلي عن مشكلة حقيقية حصلتلك» (جهّز قصة بطريقة STAR).`,
            mistakes: "إنك تقعد تعمل debugging في الإنتاج ساعة والناس واقفة، بدل ما ترجّع النسخة. أو تلوم شخص. أو متبلّغش حد. أو تقفل المشكلة من غير ما تتأكد إن الداتا سليمة."
          },
          lines: [
            "رجّع الـ API للنسخة اللي قبلها (الـ image متعملها tag بنسخة، مش latest).",
            "آخر نص ساعة من اللوج، الأخطاء بس (pino بيكتب error كـ 50)."
          ],
          sol: R`نموذج قصير بالعناوين الخمسة:

الملخص: يوم كذا، الطلاب اللي دفعوا من ٢:١٠ لـ ٣:٠٥ مالقوش الكورس في «كورساتي». التأثير: ٤٧ طالب، ٥٥ دقيقة، و ١٢ تذكرة دعم. التسلسل الزمني: ٢:٠٥ deploy نسخة 1.4.0، و ٢:١٠ أول webhook فاشل بـ 401، و ٢:٥٠ أول تذكرة، و ٢:٥٥ لقينا [[invalid hmac]] في اللوج، و ٣:٠٥ رجعنا 1.3.9 والتفعيل رجع، و ٣:٢٠ شغلنا الـ reconcile ففعّل الـ ٤٧ طلب. السبب الجذري: متغير [[PAYMOB_HMAC_SECRET]] اتغير اسمه في الكود ومتغيرش في إعدادات الإنتاج، والـ config validation كانت بتعدّيه لأنه optional. الإجراءات: خلي المتغير required في Zod (صاحبه فلان، الخميس)، و alert لو نسبة الـ webhooks الـ 401 عدّت ٥٪ في ٥ دقايق (صاحبه فلان، الأسبوع الجاي)، واختبار webhook على staging في الـ CI (صاحبه فلان، الشهر ده).

لاحظ إن خانة السبب فيها نظام مش شخص: «الـ validation كانت بتسمح» مش «فلان نسي». والسؤال الأهم في أي postmortem: ليه عرفنا من العملاء بعد ٤٠ دقيقة مش من المراقبة بعد دقيقتين؟ ده غالبًا أهم إجراء.`
        },
        {
          cmd: "access قصير + refresh httpOnly",
          title: "JWT ولا sessions؟ والتوكن يتخزن فين؟ (JWT vs sessions, token storage)",
          desc: R`الاتنين صح حسب الحالة. الـ session: id عشوائي في cookie httpOnly، والبيانات في القاعدة أو Redis، فتقدر تلغيها فورًا، ودي مناسبة لتطبيق ويب لوحده. الـ JWT: توكن موقّع، السيرفر بيتحقق منه من غير ما يسأل القاعدة، ومناسب لما عندك API بيخدم ويب وموبايل، بس مينفعش تلغيه قبل ما يخلص. عشان كده بعمل access token عمره ١٥ دقيقة في الذاكرة، و refresh token عشوائي في cookie httpOnly و Secure و SameSite، متخزن hash منه في القاعدة، وبيتغير مع كل استخدام. localStorage لأ، لأن أي XSS يقدر يقراه.`,
          example: R`res.cookie("rt", refresh, { httpOnly: true, secure: true, sameSite: "lax", path: "/auth", maxAge: 30 * 864e5 });`,
          try: "اشرح لحد بيعرف برمجة بس مش أمان، في دقيقتين، ليه التوكن مش في localStorage. لو اضطريت تقول «عشان كده أحسن» من غير سبب، ارجع لدرس الـ access و الـ refresh.",
          flag: "script",
          deep: {
            why: "سؤال مشهور جدًا، والإجابة بتوضح إذا كنت فاهم الـ trade-offs ولا حافظ «JWT أحسن».",
            how: R`النقط اللي بتميّز الإجابة. أولًا، الـ reuse detection مع الـ rotation. ثانيًا، CSRF: الـ cookies بتتبعت لوحدها، فـ SameSite والـ path المحدود بيحموا. ثالثًا، في الموبايل التخزين الآمن هو Keychain و Keystore، مش AsyncStorage. رابعًا، الـ payload بتاع JWT مقروء لأي حد، فمفيش أسرار فيه. وخامسًا، [[algorithms]] محددة في الـ verify. التفاصيل في دروس الـ auth في المستوى التاني.`,
            when: R`«إزاي تعمل logout من كل الأجهزة؟». «refresh token اتسرق؟». «CSRF مع cookies؟». «الموبايل هيخزن التوكن فين؟». «ليه مش توكن واحد عمره يوم؟».`,
            mistakes: "«JWT أأمن من sessions». أو JWT في localStorage عمره ٧ أيام. أو بيانات حساسة في الـ payload. أو [[jwt.decode]] بدل verify. أو «httpOnly بتمنع CSRF»، وهي بتمنع XSS من إنه يقرا الـ cookie، مش CSRF."
          },
          lines: [
            "الـ refresh token في cookie: مش مقروءة من JS، و HTTPS بس، ومش بتتبعت مع POST أو fetch جاي من موقع تاني (lax بيبعتها بس لو المستخدم فتح لينك GET)، ولمسارات الـ auth بس، و ٣٠ يوم."
          ],
          sol: R`شرح نموذجي في دقيقتين: «أي JavaScript شغال في صفحتك يقدر يقرا localStorage، بتاعك أو مش بتاعك: مكتبة من npm اتخترقت، أو سكربت إعلانات، أو تعليق فيه XSS نسيت تعمله escape. لو التوكن هناك، السكربت ده يبعته لسيرفر المهاجم في سطر واحد، والمهاجم يستخدمه من جهازه لحد ما يخلص، وانت مش هتعرف.

الـ cookie اللي عليها httpOnly الـ JavaScript مبيشوفهاش خالص. المتصفح بيبعتها لوحده للسيرفر بتاعنا بس. فحتى لو فيه XSS، المهاجم مبياخدش التوكن ويمشي. أقصى حاجة يعملها طلبات من جوه صفحتك وهي مفتوحة. وده وحش، بس أصغر بكتير، ولما المستخدم يقفل الصفحة الموضوع بيخلص.

والـ access token القصير في الذاكرة (متغير JavaScript)، فلو اتسرق بيخلص في ربع ساعة، والـ refresh اللي بيعمل توكنات جديدة في الـ cookie اللي مبتتقريش.»

لو الشرح طلع من غير كلمة XSS، أو من غير الفرق بين «يقرا التوكن ويمشي» و «يستخدمه وانت فاتح الصفحة»، ارجع للدرس. ده جوهر الإجابة، مش «عشان الأمان».`
        },
        {
          cmd: "القاعدة تحكم",
          title: "إزاي تمنع إن اتنين يحجزوا نفس المكان؟ (Race conditions / double booking)",
          desc: R`الفحص في الكود لوحده («اقرا وبعدين اكتب») مبيكفيش، لأن طلبين في نفس اللحظة الاتنين بيعدّوا القراية. لازم القاعدة هي اللي تحكم. يا update مشروط ذري وأشوف عدد الصفوف، يا unique constraint، يا exclusion constraint للأوقات اللي بتتداخل، يا [[SELECT FOR UPDATE]] جوه transaction لما المنطق معقد. ومن ناحية الـ client، idempotency key عشان الضغطة المزدوجة متعملش حجزين.`,
          example: R`UPDATE slots SET booked = booked + 1 WHERE id = $1 AND booked < capacity RETURNING booked;`,
          try: "اكتب سكربت بيبعت ٥٠ طلب حجز مع بعض على مكان واحد، مرة بالكود «اقرا وبعدين اكتب»، ومرة بالـ UPDATE ده. عد الحجوزات. الرقم في المرة الأولى هو إجابة «ليه».",
          flag: "script",
          deep: {
            why: "الـ race conditions من أشهر bugs الإنتاج وأصعبها في الاكتشاف، لأنها مبتظهرش وانت بتجرّب لوحدك. الإجابة بتوضح إذا كنت فاهم إن الكود بيشتغل بالتوازي.",
            how: R`اشرح المشكلة بمثال بالوقت. الطلب أ بيقرا booked = 9، والطلب ب بيقرا booked = 9، والاتنين شايفين إن فيه مكان، والاتنين بيكتبوا 10. النتيجة إن ١١ حجزوا في ١٠ أماكن.

وقارن الحلول. الـ pessimistic locking ([[FOR UPDATE]]): بيقفل الصف والباقي يستنى، ومناسب لما التعارض كتير. والـ optimistic: عمود version، والـ update بيشترط إن الـ version متغيرش، ولو اتغير تعيد. ومناسب لما التعارض قليل.

ومثال من الحقيقة: عداد استخدام كوبون بيتعمل «اقرا الرقم، وضيف واحد، واكتبه» قبل الدفع. ده نفس الـ bug بالظبط، وحله [[increment]] مشروط في خطوة واحدة.`,
            when: R`«optimistic ولا pessimistic؟». «isolation levels؟». «لو القاعدة موزعة؟» (distributed lock بـ Redis، بحذر). «الكوبون اللي ليه عدد استخدامات محدود؟».`,
            mistakes: "«بعمل check في الكود الأول». أو «بستخدم mutex في Node»، وده بيشتغل في process واحدة بس. أو عدادات بتتقري وتتكتب في خطوتين. أو تفتكر إن الـ transaction لوحدها بتحل المشكلة، وهي في الـ isolation الافتراضي مش بتمنع ده."
          },
          lines: [
            "زوّد العداد بشرط إن فيه مكان، في خطوة واحدة. لو مرجعش صف، يبقى المكان اتملى."
          ],
          sol: R`الرقم في المرة الأولى أكبر من 1، ومش ثابت من تشغيلة للتانية. جربناها على مكان واحد و ٥٠ طلب: مرة [[31]] حجز، ومرة [[44]]. وعداد [[booked]] نفسه فضل [[1]]، لأن كله قرا 0 وكتب 1. ده الـ lost update. بالـ UPDATE المشروط: [[1]] بالظبط كل مرة، و [[RETURNING booked]] بيرجع [[1]] للطلب الناجح، والـ ٤٩ التانيين بيرجعلهم صفر صفوف.

ودي إجابة «ليه» في الانترفيو: الطلبين قروا في نفس اللحظة قبل ما أي واحد يكتب، فالاتنين شافوا مكان فاضي. الـ UPDATE المشروط الشرط والكتابة فيه عملية واحدة، والقاعدة بتقفل الصف، فالتاني بيستنى ويتقيّم على القيمة الجديدة.

لو الأولى طلعت 1، الطلبات مش بتتبعت مع بعض فعلًا: اتأكد من [[Promise.all]] ومن إن الـ pool فيه connections كفاية. والكود كامل في درس «booking system» في قسم «تدريب system design».`,
          solCode: R`const book = (userId) => pool.query(
  "UPDATE slots SET booked = booked + 1 WHERE id = $1 AND booked < capacity RETURNING booked", [1]
).then((r) => r.rowCount === 1);

await pool.query("UPDATE slots SET booked = 0, capacity = 1 WHERE id = 1");
const ok = (await Promise.all(Array.from({ length: 50 }, (_, i) => book(i)))).filter(Boolean).length;
console.log(ok); // 1`
        },
        {
          cmd: "expand / contract",
          title: "إزاي تغيّر الـ schema من غير downtime؟ (Zero-downtime migrations)",
          desc: R`بقسّم التغيير الخطر لخطوات، كل خطوة فيها متوافقة مع الكود القديم والجديد في نفس الوقت. الأول expand: أضيف العمود الجديد nullable أو بقيمة افتراضية، وأنشر كود بيكتب في القديم والجديد. بعدين backfill للداتا القديمة على دفعات. بعدين أنشر كود بيقرا من الجديد بس. وفي الآخر contract: أمسح العمود القديم في release بعدها. والـ indexes على الجداول الكبيرة بـ [[CREATE INDEX CONCURRENTLY]]، وأي migration بتتجرّب على staging بداتا في حجم الحقيقية.`,
          example: R`1. ALTER TABLE "User" ADD COLUMN "fullName" text;
2. deploy: الكود بيكتب في name و fullName الاتنين
3. UPDATE "User" SET "fullName" = name WHERE "fullName" IS NULL;  (على دفعات في الجداول الكبيرة)
4. deploy: الكود بيقرا من fullName بس
5. ALTER TABLE "User" DROP COLUMN name;  (في release بعدها)`,
          try: "اعمل rename لعمود في مشروع تجربة بالخطوات الخمسة، وشغّل نسختين من التطبيق (قديمة وجديدة) مع بعض بين كل خطوة والتانية. ولا واحدة فيهم المفروض تقع.",
          flag: "script",
          deep: {
            why: "وقت الـ deploy، فيه لحظة فيها النسخة القديمة والجديدة شغالين مع بعض على نفس القاعدة (rolling deploy). أي migration بتكسر النسخة القديمة معناها أخطاء للمستخدمين في اللحظة دي. والـ rollback بعد مسح عمود مستحيل.",
            how: R`القاعدة: كل migration لازم الكود اللي قبلها يستحملها. الـ rename المباشر بيكسر الكود القديم فورًا، عشان كده بيتعمل على ٥ خطوات.

وتفاصيل PostgreSQL مهمة هنا. إضافة عمود nullable، أو بقيمة افتراضية ثابتة، سريعة من غير ما الجدول يتعاد كتابته (من PostgreSQL 11). أما [[NOT NULL]] على جدول كبير فيه داتا، فبتتعمل على خطوات: constraint بـ [[NOT VALID]]، وبعدين [[VALIDATE]]. والـ backfill على دفعات عشان متقفلش الجدول. و Prisma migrate مش بيقسّم لوحده، انت اللي بتقسّم على migrations و releases. وممنوع [[db push]] في الإنتاج.`,
            when: R`«rename عمود؟». «migration وقعت في النص؟». «Prisma بيعمل ده لوحده؟». «إيه اللي بيحصل وقت الـ rolling deploy؟».`,
            mistakes: "rename عمود في migration واحدة مع الـ deploy. أو NOT NULL من غير default على جدول كبير. أو migrations طويلة بتقفل الجدول جوه الـ deploy. أو [[prisma db push]] على الإنتاج."
          },
          lines: [
            "expand: العمود الجديد nullable، فالكود القديم مش حاسس بيه.",
            "الكود الجديد بيكتب في الاتنين، فأي داتا جديدة موجودة في المكانين.",
            "انقل الداتا القديمة، على دفعات عشان متقفلش الجدول.",
            "دلوقتي الكود يقدر يعتمد على الجديد بس.",
            "contract: امسح القديم بعد ما تتأكد إن مفيش كود بيقراه."
          ],
          sol: R`اللي هتلاحظه بين كل خطوة والتانية لو ماشي صح: بعد (١) الاتنين شغالين، لأن القديم مش شايف [[fullName]] أصلًا. بعد (٢) الجديد بيكتب في الاتنين، والقديم لسه بيكتب في [[name]] بس. بعد (٣) كل الصفوف فيها [[fullName]]، بس جربناها ولقينا صف [[fullName]] فيه NULL: النسخة القديمة كتبت بعد الـ backfill. عشان كده الـ backfill بيتعمل بعد ما (٢) يتنشر على كل النسخ، ومعاه [[WHERE "fullName" IS NULL]] يتعاد بأمان.

الفخ الأكبر في (٤) و (٥): لو [[name]] عليه [[NOT NULL]]، والكود في (٤) بطّل يكتب فيه، كل insert هيقع. ولو الكود لسه بيكتب فيه ومسحت العمود في (٥)، كل insert هيقع برضه (جربناها: حتى النسخة اللي بتكتب في الاتنين وقعت). يعني (٤) لازم يبطّل يقرا ويكتب في [[name]] الاتنين، وقبلها [[ALTER COLUMN name DROP NOT NULL]]، وتستنى لحد ما مفيش أي نسخة قديمة شغالة، وبعدين (٥).

لو نسخة وقعت في أي خطوة، ده معناه إن الخطوة دي مش متوافقة مع النسختين، وده بالظبط اللي بيحصل في deploy حقيقي بـ rolling update.`,
          solCode: R`-- 1 expand
ALTER TABLE "User" ADD COLUMN "fullName" text;
-- 2 deploy: الكود بيكتب في name و fullName
-- 3 backfill (بعد ما 2 يتنشر على كل النسخ)، على دفعات
UPDATE "User" SET "fullName" = name
WHERE id IN (SELECT id FROM "User" WHERE "fullName" IS NULL LIMIT 1000);
-- كرر لحد ما يرجع UPDATE 0
-- قبل 4
ALTER TABLE "User" ALTER COLUMN name DROP NOT NULL;
-- 4 deploy: الكود بيقرا ويكتب fullName بس
-- 5 contract (release بعدها، ومفيش نسخة قديمة شغالة)
ALTER TABLE "User" DROP COLUMN name;`
        },
        {
          cmd: "timeout + retry + reconcile",
          title: "بوابة الدفع أو API خارجية وقعت. تطبيقك يعمل إيه؟ (Third-party dependency is down)",
          desc: R`كل طلب خارجي ليه timeout صريح، عشان سيرفري ميفضلش مستني ويقع هو كمان. والـ retries للأخطاء المؤقتة بس، بـ exponential backoff و jitter، ومعاها idempotency key عشان الإعادة متعملش العملية مرتين. ولو الخدمة واقعة فترة، circuit breaker بيوقف المحاولات شوية، ويرجع رسالة واضحة للمستخدم بدل ما كل طلب يستنى. وأي حاجة ممكن تتأجل تروح queue وتتعاد بعدين. وفيه job للمطابقة (reconciliation) بيصلّح أي حاجة وقفت في النص، زي طلبات فضلت PENDING من ساعة.`,
          example: R`const r = await fetch(url, { method: "POST", body, headers: { "Idempotency-Key": order.id }, signal: AbortSignal.timeout(10_000) });`,
          try: R`في staging، خلي عنوان البوابة يشاور على سيرفر بيستنى ٦٠ ثانية قبل ما يرد. اضغط «اشتري» وشوف تطبيقك: بيعلق دقيقة، ولا بيرد في ١٠ ثواني برسالة مفهومة؟`,
          flag: "script",
          deep: {
            why: "أي منتج حقيقي بيعتمد على خدمات برّه: دفع، وإيميل، وخرايط، و AI. الخدمات دي بتقع. السؤال مش «هتقع؟»، السؤال «تطبيقك هيقع معاها؟».",
            how: R`فرّق بين الأخطاء. الـ timeout والـ 5xx والـ 429 غالبًا مؤقتة، فتتعاد. أما الـ 4xx التانية فغلط في الطلب نفسه، والإعادة مش هتفيد.

الـ jitter (عشوائية بسيطة في وقت الانتظار) بيمنع ألف client يعيدوا في نفس الثانية بالظبط، ويوقّعوا الخدمة تاني وهي لسه قايمة.

وأصعب حالة: الـ timeout حصل، بس الطلب يمكن وصل واتنفّذ. الدفعة اتعملت ولا لأ؟ الحل idempotency key (البوابة بتعرف إنه نفس الطلب)، أو إنك تسأل البوابة عن الحالة قبل ما تعيد، والـ reconciliation job بيكمّل الباقي.

ومن غير signal، fetch في Node ممكن يستنى دقايق.`,
            when: R`«تعرف إن الخطأ مؤقت إزاي؟». «الـ timeout حصل، الدفعة اتعملت ولا لأ؟». «graceful degradation يعني إيه في منتجك؟». «circuit breaker بيشتغل إزاي؟».`,
            mistakes: "fetch من غير timeout. أو retry فوري لا نهائي، فتعمل هجوم على خدمة واقعة. أو إنك تعيد عملية مش idempotent من غير مفتاح، فالعميل يدفع مرتين. أو تعرض للمستخدم error تقني بدل رسالة فيها «جرّب كمان شوية»."
          },
          lines: [
            "طلب خارجي بمفتاح idempotency (رقم الطلب)، ومهلة ١٠ ثواني بالظبط."
          ],
          sol: R`من غير timeout، الزرار بيفضل يلف دقيقة كاملة، والطلب ماسك connection في السيرفر طول الوقت ده، ولو ١٠٠ واحد ضغطوا، سيرفرك نفسه بيقف. مع [[AbortSignal.timeout(10_000)]] الـ fetch بيرمي بعد ١٠ ثواني بالظبط خطأ اسمه [[TimeoutError]] ورسالته [[The operation was aborted due to timeout]] (جربناها بثانية وطلعت بعد 1010ms).

بس خلي بالك: الخطأ ده بيترمي من [[fetch]] نفسه، فسطر [[if (!r.ok) throw new AppError(502, "GATEWAY_DOWN", ...)]] في درس «Paymob intention» مش بيتنفذ أصلًا. النتيجة إن المستخدم بياخد 500 [[INTERNAL]] «حصلت مشكلة» مش الرسالة المفهومة. الحل إنك تلف الـ fetch بـ try/catch وتحوّل [[TimeoutError]] لنفس الـ [[AppError(502/503)]].

والطلب نفسه بيفضل PENDING في القاعدة، وده مقبول: الـ reconcile job هيراجعه مع البوابة بعدين. ولو ضغط «اشتري» تاني، الـ [[Idempotency-Key: order.id]] بيمنع البوابة تعمل عملية تانية لو الأولى وصلت فعلًا.`,
          solCode: R`// سيرفر بطيء يمثّل البوابة: node slow.mjs
import http from "node:http";
http.createServer((req, res) => setTimeout(() => res.end("{}"), 60_000)).listen(4100);
// في staging: PAYMOB_BASE_URL=http://localhost:4100

// createCheckout بعد التعديل
let r;
try {
  r = await fetch(config.PAYMOB_BASE_URL + "/v1/intention/", { method: "POST", body, headers, signal: AbortSignal.timeout(10_000) });
} catch (e) {
  if (e.name === "TimeoutError") throw new AppError(503, "GATEWAY_TIMEOUT", "بوابة الدفع مش بترد، جرّب كمان شوية");
  throw new AppError(502, "GATEWAY_DOWN", "بوابة الدفع مش متاحة دلوقتي، جرّب كمان شوية");
}
if (!r.ok) throw new AppError(502, "GATEWAY_DOWN", "بوابة الدفع مش متاحة دلوقتي، جرّب كمان شوية");`
        }
      ]
    }
  ]
});

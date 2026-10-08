// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
    {
      t: "مع مديرك وعميلك",
      l: 2,
      n: "الـ 1:1 مع مديرك: تطلب feedback وتقول انت محتاج إيه، ومكالمة عميل: تسأل عن المتطلبات وتأكد عليها",
      items: [
        {
          cmd: "1:1 وفيدباك",
          title: "الـ 1:1 مع مديرك: تطلب feedback وتقول محتاج إيه وتستقبل نقد",
          desc: R`الـ 1:1 (one-on-one) = اجتماع أسبوعي أو كل أسبوعين بينك وبين مديرك لوحدكم. ده مش standup: ده وقتك انت. والـ junior المصري غالبًا بيدخله ساكت ومستني المدير يتكلم، فبيخلص في ٥ دقايق من غير فايدة.

جهّز ٣ حاجات: ١) حاجة ماشية كويس أو اتعلمتها. ٢) حاجة صعبة أو محتاج فيها مساعدة. ٣) سؤال عن التطور أو feedback: [[Is there anything I should be doing differently?]] أو [[What would you like to see from me in the next month?]].

واستقبال النقد: متدافعش على طول. [[Thanks, that's helpful]] وبعدين سؤال يوضح: [[Could you give me an example?]]، وبعدين خطة: [[I'll try to ... next time]]. حتى لو مش موافق، اشكر الأول، وناقش بعدين بهدوء.`,
          example: R`One thing that went well this week: I finally understood how our auth flow works.
One thing I'm struggling with is estimating tasks. I keep underestimating them.
Is there anything I should be doing differently?
What would you like to see from me in the next month?
I'd like to get more experience with the backend. Is there a task I could pick up?
Thanks, that's really helpful. Could you give me an example so I understand better?
That's fair. Next time, I'll ask for help after an hour instead of a whole day.
I see what you mean. Can I share some context on why I did it that way?`,
          try: R`حضّر 1:1 حقيقي أو متخيّل: اكتب الـ ٣ نقط (حاجة كويسة، وحاجة صعبة، وسؤال feedback)، وقولهم بصوت عالي. وبعدين تخيّل المدير قالك: [[Your PRs are too big and hard to review.]] سجّل ردك: شكر + سؤال + خطة.`,
          flag: "script",
          deep: {
            why: R`الـ 1:1 هو أهم اجتماع لكارير الـ junior: هنا بتطلب مهام أصعب، وبتعرف انت فين، وبتبني علاقة مع اللي بيقرر ترقيتك. والـ feedback اللي بتطلبه بنفسك بيتقال بصراحة أكتر من اللي بيجي في تقييم آخر السنة.`,
            how: R`عبارات الصعوبة (من غير ما تبان بتشتكي): [[One thing I'm struggling with is...]]، و [[I'd like some help with...]]، و [[I'm finding X a bit challenging]].

عبارات الطلب: [[I'd like to get more experience with...]]، و [[Could I pick up...?]]، و [[Would it be possible to pair with someone on...?]].

عبارات الـ feedback: [[Is there anything I should be doing differently?]]، و [[How am I doing so far?]]، و [[What's one thing I could improve?]] (سؤال محدد بيجيب إجابة محددة).

استقبال النقد: [[Thanks, that's helpful]]، و [[That's fair]] (معاك حق)، و [[I see what you mean]]، و [[Could you give me an example?]]. ولو عايز توضح: [[Can I share some context?]] (مش [[But I...]] على طول).

ولو الـ 1:1 بالإنجليزي وصعب عليك: ابعت النقط مكتوبة قبلها بساعة ([[Here are a few things I'd like to discuss]]). المديرين بيحبوا ده.`,
            when: "كل 1:1، وبعد أول شهر في أي شغل (اطلب feedback حتى لو محدش عرض)، وبعد أي مشروع كبير.",
            mistakes: R`تدخل من غير ولا نقطة. [[Everything is fine]] كل مرة. تدافع على طول ([[No, but that's because...]]). تعيط أو تتضايق قدامه من نقد عادي. وتطلب «ترقية» من غير ما تسأل «إيه المطلوب عشان أوصل للمستوى الجاي؟» (ده السؤال الصح: [[What would I need to show to get to the next level?]]).`
          },
          teach: R`## الفكرة: ادخل بـ ٣ نقط، واستقبل النقد بشكر وسؤال وخطة

المثال ٨ جمل: أول ٥ بتجهّزهم قبل الـ 1:1 (حاجة كويسة، وحاجة صعبة، وأسئلة، وطلب)، وآخر ٣ لما المدير ينتقدك.

---

## ١. اللي بتجهّزه (أول ٥ سطور)

| الجملة | النقطة | التركيبة |
|---|---|---|
| [[One thing that went well this week: I finally understood how our auth flow works.]] | حاجة كويسة | [[One thing that went well...]] |
| [[One thing I'm struggling with is estimating tasks. I keep underestimating them.]] | حاجة صعبة | [[I'm struggling with + ing]] |
| [[Is there anything I should be doing differently?]] | طلب feedback | سؤال مفتوح |
| [[What would you like to see from me in the next month?]] | طلب توقعات | سؤال بميعاد |
| [[I'd like to get more experience with the backend. Is there a task I could pick up?]] | طلب | [[pick up]] = آخد تاسك |

[[struggling with]] = بعاني مع، من غير ما تبان بتشتكي. و [[I keep underestimating]] = دايمًا بقدّر أقل ([[keep + ing]] = بيتكرر). و [[should be doing differently]] = المفروض أعمله بشكل مختلف.

## ٢. استقبال النقد (آخر ٣ سطور)

| الجملة | الخطوة |
|---|---|
| [[Thanks, that's really helpful. Could you give me an example so I understand better?]] | شكر + سؤال توضيح |
| [[That's fair. Next time, I'll ask for help after an hour instead of a whole day.]] | اعتراف + خطة محددة |
| [[I see what you mean. Can I share some context on why I did it that way?]] | لو عايز توضّح، بعد ما تفهم |

[[That's fair]] = معاك حق (من غير ما تقول «أنا غلطان» بدراما). و [[Can I share some context?]] بديل [[But I...]] اللي بتتسمع دفاع.

---

## الخلاصة

| قبل الـ 1:1 | لما تتنقد |
|---|---|
| [[One thing that went well...]] | [[Thanks, that's helpful.]] |
| [[One thing I'm struggling with...]] | [[Could you give me an example?]] |
| [[Is there anything I should be doing differently?]] | [[That's fair. Next time, I'll...]] |

والسؤال الأهم للترقية: [[What would I need to show to get to the next level?]]`,
          lines: [
            R`حاجة كويسة: «حاجة مشيت كويس الأسبوع ده: أخيرًا فهمت الـ auth flow».`,
            R`حاجة صعبة: «حاجة صعبة عليا هي تقدير التاسكات. دايمًا بقدّر أقل». struggling with = بعاني مع.`,
            R`«فيه حاجة المفروض أعملها بشكل مختلف؟»`,
            R`«تحب تشوف مني إيه الشهر الجاي؟»`,
            R`طلب: «عايز خبرة أكتر في الـ backend. فيه تاسك أقدر آخدها؟» pick up = آخد.`,
            R`استقبال نقد: «شكرًا، ده مفيد جدًا. ممكن مثال عشان أفهم أكتر؟»`,
            R`«معاك حق. المرة الجاية هطلب مساعدة بعد ساعة بدل يوم كامل». fair = منطقي/عادل.`,
            R`لو عايز توضّح: «فاهم قصدك. ممكن أشرح السياق ليه عملتها كده؟»`
          ],
          sol: R`نموذج الـ ٣ نقط:
[[One thing that went well: I shipped the search feature, and I learned a lot about indexes.]]
[[One thing I'm struggling with is reading other people's code quickly.]]
[[Is there anything I should be doing differently? And what would you like to see from me next month?]]

الرد على [[Your PRs are too big]]:
[[Thanks, that's helpful. Could you give me an example of a PR that was too big? ... That's fair. From now on, I'll try to keep PRs under 300 lines and split big features into smaller PRs.]]

الرد الضعيف: [[But the feature was big, so the PR was big.]] (دفاع فوري). حتى لو فيه جزء صح، ابدأ بالشكر والسؤال.`
        },
        {
          cmd: "مكالمة عميل",
          title: "مكالمة مع عميل: تسأل عن المتطلبات صح وتأكد عليها قبل ما تبدأ",
          desc: R`لو بتشتغل فريلانس أو في شركة outsourcing، هتكلم عملاء. والعميل غالبًا مش تقني، وبيقول [[I want an app like Uber but for...]]. شغلك في المكالمة: تفهم هو عايز إيه فعلًا، وتكتب، وتأكد عليه.

الأسئلة المفتوحة الأول: [[Could you tell me more about...?]]، و [[Who will be using it?]]، و [[What problem are you trying to solve?]]، و [[How do you do it today?]]. وبعدين أسئلة محددة: [[Do you need X or is Y enough?]]، و [[What's the deadline?]]، و [[What's most important for the first version?]].

وفي الآخر التأكيد (زي «So to recap»)، ومعاه الحاجات اللي مش في الـ scope: [[Just to be clear, the first version won't include...]]. وبعدها إيميل مكتوب (درس [[إيميل لعميل]] في «تاب إنجليزي للمبرمج: قراية وكتابة»). وتفاصيل الـ scope المكتوب في «تاب الشغل والكارير»: [[scope مكتوب]].`,
          example: R`Thanks for your time today. Could you tell me a bit about your business?
What problem are you trying to solve with this app?
Who will be using it: your staff, your customers, or both?
How do you handle bookings today? Excel? WhatsApp?
What's the most important thing for the first version?
Do you need online payments at launch, or can customers pay at the clinic for now?
Do you have a deadline in mind?
Let me make sure I got this right: customers book online, you confirm by SMS, and payment stays at the clinic.
Just to be clear, the first version won't include a mobile app. Is that OK?
I'll send you a summary and a quote by Thursday.`,
          try: R`اعمل «رول بلاي» مع صاحب أو AI: هو عميل عنده مطعم عايز «موقع للأوردرات». انت تسأل ٦ أسئلة على الأقل (٣ مفتوحة و ٣ محددة)، وفي الآخر تأكيد بـ [[Let me make sure I got this right]] وجملة [[Just to be clear, the first version won't include...]]. سجّل المكالمة.`,
          flag: "script",
          deep: {
            why: R`أغلب مشاكل الفريلانس (شغل زيادة ببلاش، وعميل زعلان) سببها سوء فهم في أول مكالمة. والأسئلة الصح بتوري للعميل إنك محترف وبتفكر في بيزنس مش كود بس، ودي اللي بتخليه يختارك.`,
            how: R`الأسئلة المفتوحة بتبدأ بـ [[What]] و [[How]] و [[Who]] و [[Could you tell me about]]. والمحددة بتبدأ بـ [[Do you need...]] و [[Is it OK if...]] و [[Which one...]].

سؤال [[How do you do it today?]] ذهبي: بيوريك الـ workflow الحقيقي، وبيطلع مشاكل العميل مقالهاش.

الأولويات: [[What's a must-have and what's a nice-to-have?]] = إيه الضروري وإيه اللي «لو حصل كويس». ده بيسهّل تقسيم الشغل لمراحل.

كلمات تقنية للعميل: بسّطها. مش [[We'll use a REST API with JWT]]، بل [[Your customers will log in with their email, and their data will be secure.]]

الفلوس والوقت: [[I'll send you a quote]] (عرض سعر)، و [[an estimate]]، و [[milestones]] (مراحل)، و [[a deposit]] (مقدم). وتفاصيل التسعير في «تاب الشغل والكارير»: [[التسعير]].`,
            when: "أول مكالمة مع أي عميل، وأي مكالمة فيها طلب جديد.",
            mistakes: R`تسمع وتقول [[OK, no problem]] على كل حاجة. متسألش عن الـ deadline والميزانية. تستخدم كلام تقني العميل مش فاهمه. متأكدش في الآخر. ومتبعتش ملخص مكتوب (فكل واحد فاكر حاجة مختلفة). و [[What is your budget?]] في أول دقيقة (اسألها بعد ما تفهم المشروع).`
          },
          teach: R`## الفكرة: أسئلة مفتوحة الأول، بعدين محددة، وبعدين تأكيد بالـ scope

المثال ١٠ جمل بترتيب مكالمة عميل حقيقية: افتتاح، وأسئلة مفتوحة، وأسئلة محددة، وتأكيد، وخطوة جاية.

---

## ١. الأسئلة المفتوحة (أول ٤ سطور)

| الجملة | بتطلّع إيه |
|---|---|
| [[Thanks for your time today. Could you tell me a bit about your business?]] | الصورة الكبيرة |
| [[What problem are you trying to solve with this app?]] | السبب الحقيقي |
| [[Who will be using it: your staff, your customers, or both?]] | اليوزرز |
| [[How do you handle bookings today? Excel? WhatsApp?]] | الـ workflow الحالي (السؤال الذهبي) |

الأسئلة المفتوحة بتبدأ بـ [[What]] و [[How]] و [[Who]] و [[Could you tell me]]، والعميل بيتكلم فيها كتير. [[How do you ... today?]] بيطلّع مشاكل العميل مقالهاش.

## ٢. الأسئلة المحددة (السطر ٥ و ٦ و ٧)

| الجملة | النوع |
|---|---|
| [[What's the most important thing for the first version?]] | أولوية |
| [[Do you need online payments at launch, or can customers pay at the clinic for now?]] | اختيار بين حاجتين |
| [[Do you have a deadline in mind?]] | وقت |

[[at launch]] = من أول يوم. و [[in mind]] = في دماغك. سؤال الاختيار ([[X, or Y for now?]]) بيسهّل على العميل يقرر، وبيقسّم الشغل لمراحل.

## ٣. التأكيد والـ scope (السطر ٨ و ٩)

[[Let me make sure I got this right: customers book online, you confirm by SMS, and payment stays at the clinic.]]: [[got this right]] = فهمت صح. وبعدها اللي فهمته في نقط بسيطة.

[[Just to be clear, the first version won't include a mobile app. Is that OK?]]: [[Just to be clear]] = عشان نبقى واضحين. الجملة دي بتحميك من «أنا كنت فاكر إن فيه تطبيق».

## ٤. الخطوة الجاية (آخر سطر)

[[I'll send you a summary and a quote by Thursday.]]: [[quote]] = عرض سعر، و [[summary]] = ملخص مكتوب.

---

## الخلاصة

| المرحلة | الجملة |
|---|---|
| مفتوح | [[What problem are you trying to solve?]] / [[How do you do it today?]] |
| محدد | [[Do you need X, or is Y enough for now?]] |
| تأكيد | [[Let me make sure I got this right: ...]] |
| scope | [[Just to be clear, the first version won't include...]] |
| بعدها | [[I'll send you a summary and a quote by...]] |

كلام بسيط للعميل: [[your customers will log in with their email]] مش [[we'll use JWT]].`,
          lines: [
            R`«شكرًا على وقتك. ممكن تحكيلي شوية عن البيزنس بتاعك؟»`,
            R`«إيه المشكلة اللي عايز تحلها بالتطبيق ده؟»`,
            R`«مين هيستخدمه: الموظفين، ولا العملاء، ولا الاتنين؟»`,
            R`«بتتعامل مع الحجوزات إزاي النهارده؟ Excel؟ WhatsApp؟» السؤال الذهبي.`,
            R`«إيه أهم حاجة في النسخة الأولى؟»`,
            R`«محتاج دفع أونلاين من أول يوم، ولا العملاء يدفعوا في العيادة دلوقتي؟»`,
            R`«عندك deadline في دماغك؟»`,
            R`التأكيد: «خليني أتأكد إني فهمت: العملاء بيحجزوا أونلاين، وانت بتأكد بـ SMS، والدفع في العيادة».`,
            R`برا الـ scope: «عشان نبقى واضحين، النسخة الأولى مش هيبقى فيها تطبيق موبايل. تمام؟»`,
            R`الخطوة الجاية: «هبعتلك ملخص وعرض سعر قبل الخميس». quote = عرض سعر.`
          ],
          sol: R`أسئلة كويسة للمطعم:
مفتوحة: [[How do you take orders today?]]، و [[Who will manage the orders on your side?]]، و [[What's the biggest problem with the current way?]]
محددة: [[Do you need delivery tracking, or just order and pickup?]]، و [[Do you want online payment or cash on delivery?]]، و [[Do you need Arabic and English?]]

التأكيد: [[Let me make sure I got this right: customers order from the website, you get a notification on a tablet, and they pay cash on delivery. Just to be clear, the first version won't include delivery tracking or a mobile app. Is that OK?]]

راجع: فيه [[How do you ... today?]]؟ فيه سؤال أولوية؟ فيه تأكيد وحاجة برا الـ scope؟ المكالمة الضعيفة: العميل اتكلم ٩٠٪ وانت قلت [[OK]] و [[no problem]] بس.`
        }
      ]
    },
    {
      t: "تعرّف نفسك وتحكي مشروعك بالإنجليزي",
      l: 3,
      n: "Tell me about yourself بـ ٣ نسخ جاهزة للـ junior (خريج جديد، وجاي من مجال تاني، و self-taught / freelancer)، وتحكي مشروعك في دقيقتين",
      items: [
        {
          cmd: "about yourself: ٣ نسخ",
          title: "Tell me about yourself للـ junior: ٣ نسخ جاهزة تفصّلها على نفسك",
          desc: R`الهيكل نفسه (present ← proof ← how I work ← future ← why you) مشروح في درس [[tell me about yourself]] في «تاب الانترفيو». هنا ٣ نسخ إنجليزي كاملة بجمل بسيطة، لـ ٣ أنواع من الـ juniors، تاخد اللي شبهك وتغيّر التفاصيل.

قواعد اللغة للإجابة دي: ١) جمل قصيرة، كل جملة فكرة. ٢) الحاضر للي انت عليه ([[I'm a...]] و [[I work with...]])، والماضي للي عملته ([[I built...]] و [[I graduated...]])، والمستقبل لللي عايزه ([[I'd like to...]] و [[I'm looking for...]]). ٣) رقم واحد على الأقل. ٤) آخر جملة عن الشركة دي.

والمدة ٦٠–٩٠ ثانية. ومتحفظهاش كلمة بكلمة: احفظ الجمل الـ ٦ كنقط، وقولها كل مرة بكلام قريب.`,
          example: R`[Fresh graduate] I'm a junior full-stack developer. I graduated in Computer Science from Cairo University this summer.
[Fresh graduate] For my graduation project, I built a clinic booking system with React, Node and PostgreSQL. It's used by two clinics now.
[Fresh graduate] I enjoy the backend side most, especially designing APIs and writing tests.
[Fresh graduate] I'm looking for a team where I can learn from senior engineers, and your focus on healthcare products really interests me.
[Career switcher] I'm a front-end developer, and before that I worked in accounting for three years.
[Career switcher] I taught myself JavaScript and React, and I built a budgeting app that about 200 people use.
[Career switcher] My accounting background helps me understand business requirements and talk to non-technical people.
[Career switcher] I'd like to join a fintech team like yours, where I can use both skills.
[Freelancer] I'm a web developer, and for the last two years I've worked as a freelancer.
[Freelancer] I've delivered around ten projects for small businesses, mostly Next.js sites with online payments.
[Freelancer] I handle everything from the first client call to deployment, so I'm used to owning a project end to end.
[Freelancer] Now I want to work on a bigger product with a team, and learn how things are done at scale.`,
          try: R`اختار النسخة الأقرب ليك، وغيّر كل التفاصيل لتفاصيلك الحقيقية (الجامعة، المشروع، الرقم، الشركة). اكتبها في ٥–٦ جمل. سجّلها ٣ مرات في ٣ أيام من النقط بس (مش من النص). قارن التسجيل الأول بالتالت: المدة، وعدد الـ [[ehh]]، والنطق (اسم الـ stack من درس «Linux و SQL و Nginx»).`,
          flag: "script",
          deep: {
            why: R`أول سؤال في كل انترفيو تقريبًا، ولو بدأت بثقة، الباقي بيبقى أسهل. وللي إنجليزيته ضعيفة ده أكتر سؤال يستاهل تحضير، لأنه ١٠٠٪ جاي، وإجابته عنك انت، فتقدر تجهّزها بالظبط.`,
            how: R`عبارات مفيدة:
البداية: [[I'm a ... developer]]، و [[I work mainly with ...]]، و [[I recently graduated in ...]].
الدليل: [[I built ...]]، و [[It's used by ...]]، و [[I was responsible for ...]].
التميّز: [[I enjoy ...]]، و [[I'm good at ...]]، و [[What I bring is ...]]، و [[My background in X helps me ...]].
المستقبل: [[I'm looking for ...]]، و [[I'd like to grow in ...]]، و [[Now I want to ...]].
الشركة: [[Your focus on X really interests me]]، و [[I read about your ... and ...]].

الـ career switcher: المجال القديم ميزة مش عيب. قوله في جملة وقول بيفيدك إزاي.

الـ freelancer: متقولش [[freelancer]] كأنك بتعتذر. قول عدد المشاريع ونوع العملاء، وإنك [[own projects end to end]]. وقول ليه عايز فريق دلوقتي (التعلم، والـ scale) مش «عشان الفريلانس مفيهوش فلوس».

وجهّز نسخة ٣٠ ثانية: أول جملتين وآخر جملة بس.`,
            when: "أول كل انترفيو، و recruiter call، وأي networking event، ولما تقابل فريق جديد أول يوم.",
            mistakes: R`[[My name is ... and I am from Egypt]] (هو عارف اسمك من الـ CV). و [[I am a hard worker and passionate]] من غير دليل. وتحكي من الثانوي. و [[I have 0 experience]] (قول اللي عملته، مش اللي معملتوش). و [[I finished my graduation]] (الصح [[I graduated]]). وتحفظ النص فتقوله بسرعة وبنبرة واحدة.`
          },
          teach: R`## الفكرة: ٤ جمل بنفس الوظايف، بتفاصيل مختلفة

المثال ١٢ سطر: ٣ نسخ ([[Fresh graduate]] و [[Career switcher]] و [[Freelancer]])، وكل نسخة ٤ جمل بنفس الترتيب: انت مين دلوقتي، والدليل، والميزة، والمستقبل والشركة. خد النسخة اللي شبهك.

---

## ١. وظيفة كل جملة والزمن بتاعها

| الجملة | الوظيفة | الزمن | مثال من النسخ |
|---|---|---|---|
| ١ | انت مين دلوقتي | حاضر: [[I'm a...]] | [[I'm a junior full-stack developer.]] |
| ٢ | الدليل | ماضي: [[I built...]] | [[I built a clinic booking system...]] |
| ٣ | الميزة | حاضر: [[I enjoy...]] / [[helps me]] | [[My accounting background helps me...]] |
| ٤ | المستقبل والشركة | [[I'm looking for]] / [[I'd like to]] / [[I want to]] | [[your focus on healthcare products really interests me]] |

الأزمنة بتتغير مع المعنى: اللي خلص ماضي ([[graduated]] و [[built]] و [[taught myself]])، واللي انت عليه حاضر، واللي عايزه [[I'd like to]].

## ٢. حاجات في النسخ تستاهل تتشرح

- [[I graduated in Computer Science from Cairo University this summer.]]: [[graduated]] (مش [[finished my graduation]])، و [[in]] للمجال، و [[from]] للجامعة.
- [[It's used by two clinics now.]]: passive حاضر = الدليل لسه شغال. رقم واحد بيقنع أكتر من [[passionate]].
- [[before that I worked in accounting for three years]]: [[worked in]] + مجال. و [[for three years]] = مدة.
- [[I taught myself JavaScript]]: [[taught myself]] = علّمت نفسي (taught «توت»).
- [[for the last two years I've worked as a freelancer]]: present perfect لأنه لسه مستمر.
- [[I've delivered around ten projects]]: [[delivered]] = سلّمت، و [[around]] = حوالي.
- [[I'm used to owning a project end to end]]: [[I'm used to + ing]] = متعود على. و [[end to end]] = من أوله لآخره.
- [[learn how things are done at scale]]: [[at scale]] = على حجم كبير.

## ٣. الجملة الأخيرة لازم تبقى عن **الشركة دي**

[[your focus on healthcare products]] و [[a fintech team like yours]]: بتغيّرها لكل شركة. لو قلت [[I'm looking for a good company]]، دي بتتقال لأي حد.

---

## الخلاصة

| النسخة | الجملة اللي بتميّزها |
|---|---|
| خريج | مشروع التخرج + رقم ([[used by two clinics]]) |
| من مجال تاني | المجال القديم ميزة ([[helps me understand business requirements]]) |
| فريلانسر | عدد المشاريع + [[end to end]] + ليه فريق دلوقتي |

٦٠–٩٠ ثانية، واحفظ الجمل الأربعة كنقط مش كنص.`,
          lines: [
            R`خريج جديد، الحاضر: «أنا junior full-stack، اتخرجت حاسبات من جامعة القاهرة الصيف ده».`,
            R`الدليل: «مشروع التخرج نظام حجز عيادات بـ React و Node و PostgreSQL، وعيادتين بيستخدموه».`,
            R`التميّز: «بحب الـ backend أكتر، خصوصًا تصميم الـ APIs وكتابة الاختبارات».`,
            R`المستقبل والشركة: «بدوّر على فريق أتعلم فيه من seniors، وتركيزكم على منتجات الصحة بيهمني».`,
            R`جاي من مجال تاني، الحاضر: «أنا front-end، وقبلها اشتغلت محاسب ٣ سنين».`,
            R`الدليل: «علّمت نفسي JS و React، وعملت تطبيق ميزانية بيستخدمه حوالي ٢٠٠ شخص».`,
            R`الميزة: «خلفيتي في المحاسبة بتساعدني أفهم متطلبات البيزنس وأتكلم مع ناس مش تقنيين».`,
            R`الشركة: «عايز أنضم لفريق fintech زيكم، أستخدم فيه المهارتين».`,
            R`فريلانسر، الحاضر: «أنا web developer، وآخر سنتين شغال فريلانس».`,
            R`الدليل: «سلّمت حوالي ١٠ مشاريع لبيزنس صغيرة، أغلبها Next.js بدفع أونلاين».`,
            R`الميزة: «بمسك كل حاجة من أول مكالمة مع العميل للـ deploy، فمتعود أمسك مشروع من أوله لآخره». end to end = من الأول للآخر.`,
            R`المستقبل: «عايز أشتغل على منتج أكبر مع فريق، وأتعلم الحاجات بتتعمل إزاي على scale كبير».`
          ],
          sol: R`نموذج لخريج جديد بعد التفصيل:
[[I'm a junior back-end developer. I graduated from Ain Shams University in 2025, in Computer Science. For my graduation project, I built an attendance system with Node, Express and PostgreSQL, and my faculty used it for one semester with about 400 students. I enjoy working with databases, and I wrote the tests and the CI for that project myself. Now I'm looking for a team where I can learn from experienced engineers, and I like that your team builds tools for schools.]]

المدة المتوقعة: ٥٠–٧٠ ثانية. راجع: فيه رقم (٤٠٠)؟ آخر جملة عن الشركة؟ الأزمنة صح ([[graduated]] و [[built]] ماضي، و [[enjoy]] و [[I'm looking]] حاضر)؟

بين التسجيل الأول والتالت: المدة غالبًا بتقل، والـ [[ehh]] بتقل للنص. ولو التالت نفس الأول كلمة بكلمة، انت حافظ نص: قوله مرة بترتيب مختلف شوية.`
        },
        {
          cmd: "walk me through a project",
          title: "«Walk me through a project you're proud of»: تحكي مشروعك بالإنجليزي في دقيقتين",
          desc: R`السؤال التاني الأشهر بعد «Tell me about yourself». الهيكل مشروح في درس [[problem → decisions → results]] في «تاب الانترفيو»: المشكلة، ودورك، والقرارات والـ trade-offs، والنتيجة، وهتغير إيه. هنا اللغة.

الجمل اللي هتحتاجها: المشكلة [[The problem was that...]]، والدور [[I was responsible for...]] أو [[I built it alone]]، والقرار [[I chose X over Y because...]]، والتمن [[The trade-off was...]]، والصعوبة [[The hardest part was...]]، والنتيجة [[As a result...]]، والدرس [[If I did it again, I would...]].

وأهم نقطة لغة: [[would]] في الجملة الأخيرة: [[If I did it again, I would add tests earlier]]. دي الصيغة الصح للـ «لو رجع بيا الزمن». ومتقولش [[If I will do it again]].`,
          example: R`The project I'm most proud of is a booking system for a small clinic.
The problem was that they managed appointments on paper, and patients often came at the same time.
I built it alone, from the database design to the deployment.
I chose PostgreSQL over MongoDB because the data is very relational: patients, doctors, appointments.
The hardest part was preventing double bookings when two people book the same slot at the same time.
I solved it with a unique constraint on doctor and time, and I handle the error with a clear message.
The trade-off was that I kept the UI very simple, because the deadline was three weeks.
As a result, the clinic stopped using paper, and double bookings went to zero.
If I did it again, I would add automated tests from day one; I added them late and it was painful.`,
          try: R`اكتب قصة مشروعك في ٩ جمل بنفس الترتيب، بتفاصيلك الحقيقية. وبعدين جهّز إجابات لـ ٣ follow-ups متوقعة بالإنجليزي: [[Why did you choose X?]]، و [[What would you do differently?]]، و [[How would it handle more users?]]. سجّل القصة والإجابات.`,
          flag: "script",
          deep: {
            why: R`ده السؤال اللي الإنترفيوير بيحكم منه على مستواك التقني الحقيقي: مش «بتعرف React؟» لكن «بتفكر إزاي؟». وللي إنجليزيته ضعيفة، ده سؤال تقدر تحضّره ١٠٠٪ لأنه عن مشروعك.`,
            how: R`اختار مشروع فيه قرار حقيقي (اخترت حاجة بدل حاجة لسبب) وصعوبة حقيقية (مش «كان صعب أتعلم React»). والأحسن لو فيه يوزرز حقيقيين أو رقم.

الأزمنة: القصة كلها ماضي بسيط ([[built]] و [[chose]] و [[solved]])، إلا لو المشروع لسه شغال ([[It's used by...]] و [[It handles...]]).

الـ follow-ups:
[[Why X?]] → [[Because ... . The alternative was Y, but ...]]
[[What would you do differently?]] → [[I would ...]] (بـ would)
[[How would it scale?]] → [[Right now it handles ... . If it grew, I'd first look at ... , because ...]]
[[What was your role?]] (لو فريق) → [[I owned the ... part. Specifically, I ...]]

وخلي بالك من كلمات الفخر: [[I'm proud of]] عادي تقولها، بس الدليل أهم من الكلمة.`,
            when: "كل انترفيو تقريبًا، ومع الـ recruiter بشكل أقصر، وفي أي portfolio review.",
            mistakes: R`قايمة technologies من غير قصة ([[I used React, Node, Mongo, Redis, Docker...]]). و [[we]] طول الوقت في مشروع فريق من غير ما تقول انت عملت إيه. و [[If I will do it again, I will...]] (الصح [[If I did it again, I would...]]). ومشروع tutorial منسوخ (الإنترفيوير هيعرف من أول سؤال follow-up).`
          },
          teach: R`## الفكرة: ٩ جمل، كل جملة حتة من القصة

المثال ٩ سطور بترتيب ثابت: المشروع، والمشكلة، ودورك، والقرار، والصعوبة، والحل، والتمن، والنتيجة، والدرس.

---

## ١. الجمل وتركيبة كل واحدة

| الحتة | الجملة | التركيبة |
|---|---|---|
| المشروع | [[The project I'm most proud of is a booking system for a small clinic.]] | [[The project I'm most proud of is...]] |
| المشكلة | [[The problem was that they managed appointments on paper...]] | [[The problem was that...]] |
| الدور | [[I built it alone, from the database design to the deployment.]] | [[from X to Y]] = كل حاجة |
| القرار | [[I chose PostgreSQL over MongoDB because the data is very relational...]] | [[I chose X over Y because...]] |
| الصعوبة | [[The hardest part was preventing double bookings...]] | [[The hardest part was + ing]] |
| الحل | [[I solved it with a unique constraint on doctor and time...]] | [[I solved it with...]] |
| التمن | [[The trade-off was that I kept the UI very simple, because the deadline was three weeks.]] | [[The trade-off was that...]] |
| النتيجة | [[As a result, the clinic stopped using paper, and double bookings went to zero.]] | [[As a result, ...]] |
| الدرس | [[If I did it again, I would add automated tests from day one...]] | [[If I did..., I would...]] |

## ٢. أهم نقطتين لغة

**الماضي**: القصة كلها ماضي بسيط ([[managed]] و [[built]] و [[chose]] و [[solved]] و [[kept]] و [[stopped]])، إلا الحاجة اللي لسه حقيقية: [[the data is very relational]] (لسه كده) و [[I handle the error]] (الكود لسه بيعمل كده).

**الـ would**: [[If I did it again, I would add tests]] = لو رجع بيا الوقت. [[did]] ماضي و [[would]] بعدها. الغلط المشهور: [[If I will do it again, I will...]].

## ٣. كلمات

[[relational]] «ري-**ليْ**-شَ-نَل»، و [[double bookings]] = حجز مزدوج، و [[slot]] = ميعاد متاح، و [[unique constraint]] «يو-**نيك** كَن-**ستريْنت**»، و [[painful]] = متعب. و [[from day one]] = من أول يوم.

---

## الخلاصة

| لازم يبقى فيها | الكلمة |
|---|---|
| سبب | [[because]] مرتين على الأقل |
| قرار | [[I chose X over Y]] |
| تمن | [[The trade-off was...]] |
| نتيجة | رقم أو حقيقة ([[went to zero]]) |
| درس | [[If I did it again, I would...]] |

قصة مش قايمة technologies، و [[I]] مش [[we]] في الحتت اللي انت عملتها.`,
          lines: [
            R`«المشروع اللي فخور بيه أكتر: نظام حجز لعيادة صغيرة».`,
            R`المشكلة: «كانوا بيسجلوا المواعيد على ورق، والمرضى كتير كانوا بييجوا في نفس الوقت».`,
            R`الدور: «عملته لوحدي، من تصميم الداتابيز للـ deployment».`,
            R`القرار: «اخترت PostgreSQL بدل MongoDB لأن الداتا relational جدًا». chose X over Y = اخترت X بدل Y.`,
            R`الصعوبة: «أصعب حاجة كانت منع الحجز المزدوج لما اتنين يحجزوا نفس الميعاد في نفس اللحظة».`,
            R`الحل: «حلّيتها بـ unique constraint على الدكتور والوقت، وبتعامل مع الخطأ برسالة واضحة».`,
            R`التمن: «خليت الواجهة بسيطة جدًا لأن الـ deadline كان ٣ أسابيع».`,
            R`النتيجة: «العيادة بطّلت ورق، والحجز المزدوج بقى صفر». As a result = والنتيجة.`,
            R`الدرس بـ would: «لو عملته تاني، كنت هضيف اختبارات من أول يوم؛ ضفتها متأخر وكان متعب». painful = متعب.`
          ],
          sol: R`إجابات نموذجية للـ follow-ups (لمشروع زي المثال):
[[Why PostgreSQL?]] → [[Because the data has clear relations, and I needed constraints and transactions to prevent double bookings. MongoDB could work, but I'd have to handle that logic myself.]]
[[What would you do differently?]] → [[I would write tests from the start, and I would add SMS reminders earlier, because no-shows were the next big problem.]]
[[How would it handle more users?]] → [[Right now it's one clinic, so the load is tiny. If it grew to many clinics, I'd first add indexes on the appointment queries, and then look at caching the doctors' schedules.]]

راجع التسجيل: القصة ٩٠–١٢٠ ثانية؟ فيها [[because]] مرتين على الأقل؟ فيها [[would]] في آخرها؟ الإجابة الضعيفة: [[I made a clinic app with React and Node. It was good.]]`
        }
      ]
    },
    {
      t: "قصص STAR بالإنجليزي: ٥ إجابات كاملة",
      l: 3,
      n: "لغة STAR (ماضي، و I مش we، وكلمات الربط)، و ٥ إجابات كاملة: اتعلمت بسرعة، و feedback صعب، و ضغط و deadline، وخلاف، وغلطة",
      items: [
        {
          cmd: "لغة STAR",
          title: "اللغة اللي بتحتاجها في أي قصة STAR: الماضي، و I، وكلمات الربط",
          desc: R`طريقة STAR (Situation, Task, Action, Result) مشروحة بالتفصيل في درس [[STAR]] في «تاب الانترفيو». هنا اللغة بس، لأن اللي إنجليزيته ضعيفة بيقع في ٣ حاجات:

١) الأزمنة: القصة كلها ماضي بسيط. [[I noticed]] و [[I decided]] و [[I talked to]]. والسياق اللي كان مستمر: [[I was working on...]] (ماضي مستمر). والدرس في الآخر: حاضر ([[Now I always...]]).

٢) [[I]] مش [[we]]: في الـ Action، الإنترفيوير عايز يعرف انت عملت إيه. [[We fixed it]] مش بتقول حاجة. [[I found the bug, and my teammate deployed the fix]] بتقول.

٣) كلمات الربط: هي اللي بتخلي القصة تمشي من غير ما تتوه. [[At the time]] (وقتها)، و [[So]]، و [[First]] و [[Then]] و [[After that]] و [[Finally]]، و [[Because of that]]، و [[In the end]]، و [[As a result]]، و [[Looking back]] (لما أبص ورا)، و [[Since then]] (من ساعتها).`,
          example: R`Situation:  At the time, I was working on a small e-commerce site for a local shop.
Situation:  A few days before launch, the client asked for a new feature.
Task:  I was the only developer, so it was my job to decide how to handle it.
Action:  First, I estimated the feature: about three days.
Action:  Then I called the client and explained the options.
Action:  After that, we agreed to launch on time and add the feature a week later.
Result:  As a result, we launched on time, and the feature went live the following week.
Lesson:  Looking back, I learned to talk about trade-offs early. Since then, I always do it in the first call.
Wrong vs right:  "We decided to delay it." → "I suggested delaying it, and the client agreed."`,
          try: R`اكتب قصة واحدة (أي موقف حقيقي من شغل أو مشروع أو الجامعة) في ٨ جمل بنفس الشكل. علّم كل فعل ماضي، وكل كلمة ربط. لو [[we]] ظهرت في الـ Action، غيّرها لـ [[I]] أو قول مين عمل إيه. وسجّلها.`,
          flag: "script",
          deep: {
            why: R`الأسئلة السلوكية ممكن تبقى ٣٠–٥٠٪ من الانترفيو، والقصة اللي لغتها متلخبطة (أزمنة غلط، و we في كل حتة، ومفيش ربط) بتخلي الإنترفيوير مش فاهم انت عملت إيه. وده بيتحسب ضدك حتى لو القصة نفسها كويسة.`,
            how: R`الأفعال الماضي اللي هتتكرر في كل القصص (اتعلمها بنطق [[-ed]] الصح): [[noticed]] و [[realized]] (أدركت) و [[decided]] و [[suggested]] و [[explained]] و [[asked]] و [[talked to]] و [[fixed]] و [[learned]] و [[improved]] و [[reduced]]. والشاذة: [[took]] و [[made]] و [[found]] و [[told]] و [[chose]] و [[wrote]] و [[built]] و [[led]] و [[spent]].

[[At the time]] + ماضي مستمر = بتفتح القصة بسهولة: [[At the time, I was working on...]].

[[Looking back]] + [[I learned]] / [[I realized]] = بتقفل بالدرس.

[[Since then]] + present perfect أو present: [[Since then, I've always...]] أو [[Since then, I always...]]. الاتنين مقبولين في الكلام.

ولو الإنترفيوير قاطعك بسؤال، جاوب واسأل [[Should I continue with the story?]].`,
            when: "أي سؤال بيبدأ بـ «Tell me about a time...» أو «Give me an example of...» أو «Have you ever...».",
            mistakes: R`[[Yesterday... I go to the client and I tell him]] (حاضر في قصة ماضي). و [[we]] طول الـ Action. و [[and then... and then... and then...]] من غير أي ربط تاني. و [[The result was good]] من غير تفاصيل. و [[I have learned from this a lot of things]] (الأبسط [[I learned a lot from this]]، والأحسن تقول حاجة واحدة محددة).`
          },
          teach: R`## الفكرة: ٣ قواعد لغة بتمشي على أي قصة

المثال قصة واحدة مقسومة على حروف STAR (كل سطر بيبدأ بالجزء بتاعه)، وفي الآخر سطر «غلط وصح». هنشوف في كل جزء: الزمن، و [[I]]، وكلمة الربط.

---

## ١. Situation: افتح القصة (أول سطرين)

~~~text Situation
At the time, I was working on a small e-commerce site for a local shop.
A few days before launch, the client asked for a new feature.
~~~

[[At the time]] = وقتها، و [[I was working]] = ماضي مستمر (خلفية القصة). وبعدين [[asked]] ماضي بسيط (الحدث اللي حصل). [[A few days before launch]] = كام يوم قبل الإطلاق.

## ٢. Task: مسؤوليتك (السطر التالت)

[[I was the only developer, so it was my job to decide how to handle it.]]: [[it was my job to]] = كان دوري إني. و [[handle]] = أتعامل مع.

## ٣. Action: خطواتك بالترتيب (السطر ٤ و ٥ و ٦)

| كلمة الربط | الفعل الماضي | الفاعل |
|---|---|---|
| [[First,]] | [[I estimated]] | I |
| [[Then]] | [[I called]] و [[explained]] | I |
| [[After that,]] | [[we agreed]] | we (اتفاق بين اتنين: مقبول هنا) |

كلمات الربط هي اللي بتخلي القصة متمشيش [[and then... and then...]]. و [[I]] في الخطوات اللي انت عملتها؛ [[we]] بس لما فعلًا اتنين عملوها مع بعض.

## ٤. Result و Lesson (السطر ٧ و ٨)

[[As a result, we launched on time, and the feature went live the following week.]]: [[As a result]] = والنتيجة. [[went live]] «وِنت لايڤ» = نزلت على الإنتاج. و [[the following week]] = الأسبوع اللي بعده.

[[Looking back, I learned to talk about trade-offs early. Since then, I always do it in the first call.]]: [[Looking back]] = لما أبص ورا. و [[Since then]] = من ساعتها + حاضر (عادة بقت عندك).

## ٥. غلط وصح (آخر سطر)

[[We decided to delay it.]] مش بتقول انت عملت إيه. [[I suggested delaying it, and the client agreed.]] بتقول: انت اقترحت، وهو وافق. و [[suggest + ing]]: [[suggested delaying]] مش [[suggested to delay]].

---

## الخلاصة

| الجزء | الزمن | كلمة ربط |
|---|---|---|
| Situation | was + ing، وماضي | At the time |
| Task | ماضي | so |
| Action | ماضي، و I | First / Then / After that |
| Result | ماضي | As a result / In the end |
| Lesson | ماضي + حاضر | Looking back / Since then |`,
          lines: [
            R`بداية: «وقتها، كنت شغال على موقع e-commerce صغير لمحل». At the time + was working.`,
            R`«كام يوم قبل الإطلاق، العميل طلب فيتشر جديدة».`,
            R`الـ Task: «كنت الـ developer الوحيد، فكان قراري أتعامل معاها إزاي».`,
            R`الـ Action بالترتيب: «الأول، قدّرت الفيتشر: حوالي ٣ أيام».`,
            R`«بعدين كلمت العميل وشرحتله الاختيارات».`,
            R`«بعد كده، اتفقنا نطلق في المعاد ونضيف الفيتشر بعدها بأسبوع».`,
            R`النتيجة: «والنتيجة، طلقنا في المعاد، والفيتشر نزلت الأسبوع اللي بعده».`,
            R`الدرس: «لما أبص ورا، اتعلمت أتكلم عن الـ trade-offs بدري. ومن ساعتها بعملها في أول مكالمة».`,
            R`غلط وصح: «We decided» مش بتقول انت عملت إيه. «I suggested..., and the client agreed» بتقول.`
          ],
          sol: R`مثال لقصة من الجامعة:
[[At the time, I was leading a team of four for our graduation project.]] [[Two months before the deadline, one member stopped responding.]] [[I was the team lead, so I had to solve it.]] [[First, I called him and found out he had family problems.]] [[Then I split his tasks between me and another member.]] [[After that, I set up a short weekly call to track progress.]] [[As a result, we delivered on time and got an A.]] [[Looking back, I learned to check in with people early. Since then, I always set up regular check-ins.]]

الأفعال الماضي: [[was leading]]، و [[stopped]]، و [[had to]]، و [[called]]، و [[found out]]، و [[split]]، و [[set up]]، و [[delivered]]، و [[got]]، و [[learned]]. الربط: [[At the time]]، و [[First]]، و [[Then]]، و [[After that]]، و [[As a result]]، و [[Looking back]]، و [[Since then]].

ولو القصة فيها [[we]] في الـ Action (زي [[we delivered]] في الـ Result)، ده مقبول في النتيجة، مش في الخطوات.`
        },
        {
          cmd: "STAR: اتعلمت بسرعة",
          title: "«Tell me about a time you had to learn something quickly»: إجابة كاملة",
          desc: R`سؤال مفضّل للـ juniors، لأن الشركة عارفة إنك مش هتعرف كل حاجة، وعايزة تعرف: بتتعلم إزاي؟ لما تقابل حاجة جديدة بتعمل إيه؟

الإجابة الكويسة بتوري «طريقة» مش «معجزة». مش [[I learned Docker in one day]] وخلاص. لكن: قسّمت الموضوع، وبدأت بالـ docs الرسمية، وعملت مثال صغير، وسألت حد، وطبّقت على الحاجة الحقيقية، والنتيجة. والقصة دي أحسن لو فيها حاجة جديدة فعلًا عليك (أداة، أو لغة، أو domain) وضغط وقت حقيقي.`,
          example: R`S: In my last freelance project, the client suddenly needed online payments with Stripe, and I had never used it.
T: I had one week to add it before their launch.
A: First, I read the official Stripe docs and followed their quick start in a separate test project.
A: Then I built the smallest version: one product, one checkout, test mode only.
A: The hardest part was webhooks, so I watched a talk about them and asked a question in their developer Discord.
A: After that, I added it to the real project and wrote a checklist of test cards to try every case.
R: We launched on time, and in the first month there were about 150 payments with no failed orders.
Lesson: Now, when I learn a new tool, I always build a tiny version first, outside the real project.`,
          try: R`فكّر في حاجة اتعلمتها بسرعة لسبب حقيقي (أداة، أو لغة، أو مادة في الجامعة، أو شغل). اكتبها في ٨ جمل بنفس الشكل، وركّز إن الـ Action فيه «خطوات تعلّم» (docs، و مثال صغير، و سؤال، و تطبيق). سجّلها في أقل من دقيقتين.`,
          flag: "script",
          deep: {
            why: R`الـ junior متقيّم على «هيتعلم بسرعة ولا لأ» أكتر من «يعرف إيه النهارده». والقصة دي بتوري طريقة التعلم بتاعتك، ودي بتتنقل لأي حاجة الشركة هتحتاجها.`,
            how: R`عبارات التعلم: [[I had never used X before]]، و [[I started with the official docs]]، و [[I followed the quick start]]، و [[I built a small prototype]]، و [[I asked on ...]]، و [[I compared a few options]]، و [[I took notes]]، و [[I applied it to the real project]].

الـ Result: رقم أو حقيقة (اتسلم في المعاد، وعدد اليوزرز، ومفيش أخطاء).

الـ Lesson: عادة بقت عندك: [[Now I always...]].

follow-ups متوقعة: [[What resources did you use?]] (قول أسماء حقيقية: docs رسمية، و talk، و course)، و [[How did you know you understood it well enough?]] ([[I tested every case in the checklist]])، و [[What would you do if you had even less time?]].`,
            when: "«Tell me about a time you learned something new»، و «How do you learn new technologies?»، و «What did you learn recently?».",
            mistakes: R`[[I learned it from YouTube]] وبس (مفيش طريقة). و [[I'm a fast learner]] من غير قصة. وتختار حاجة سهلة جدًا (HTML في أسبوع). و [[I have never used it before]] في قصة ماضي (الصح [[I had never used it]] لأنها قبل الماضي، ولو اتلخبطت [[I didn't know it at the time]] أسهل).`
          },
          teach: R`## الفكرة: ورّي «طريقة» التعلم، مش إنك عبقري

المثال قصة كاملة: S و T في سطرين، و A في ٤ خطوات تعلم، و R برقم، ودرس. أهم جزء هو الـ A: كل سطر فيه خطوة تعلم مختلفة.

---

## ١. S و T (أول سطرين)

[[In my last freelance project, the client suddenly needed online payments with Stripe, and I had never used it.]]: [[had never used]] = past perfect، يعني «عمري ما كنت استخدمته **قبل** الموقف ده». لو صعبة، [[I didn't know Stripe at the time]] نفس المعنى وأسهل.

[[I had one week to add it before their launch.]]: الضغط والوقت = اللي بيخلي القصة تستاهل.

## ٢. A: خطوات التعلم (السطر ٣ لـ ٦)

| الخطوة | الجملة | ليه بتفرق |
|---|---|---|
| مصدر رسمي | [[First, I read the official Stripe docs and followed their quick start in a separate test project.]] | [[read]] الماضي «رِد». [[quick start]] = دليل البداية |
| أصغر نسخة | [[Then I built the smallest version: one product, one checkout, test mode only.]] | [[the smallest version]] = بتتعلم من غير مخاطرة |
| الحتة الصعبة | [[The hardest part was webhooks, so I watched a talk about them and asked a question in their developer Discord.]] | [[asked a question]]: طلب مساعدة = نقطة قوة |
| التطبيق | [[After that, I added it to the real project and wrote a checklist of test cards to try every case.]] | [[checklist]] = إزاي اتأكدت |

## ٣. R والدرس (آخر سطرين)

[[We launched on time, and in the first month there were about 150 payments with no failed orders.]]: رقم ([[about 150]]) وحقيقة ([[no failed orders]]). و [[Now, when I learn a new tool, I always build a tiny version first, outside the real project.]]: [[Now ... I always]] = عادة بقت عندك.

---

## الخلاصة

| لازم يبقى في القصة | مثال |
|---|---|
| حاجة جديدة فعلًا | [[I had never used it]] |
| ضغط وقت | [[I had one week]] |
| ٣ خطوات تعلم أو أكتر | docs، نسخة صغيرة، سؤال، تطبيق |
| نتيجة بأرقام | [[about 150 payments]] |
| عادة جديدة | [[Now I always...]] |

[[I'm a fast learner]] من غير قصة مش إجابة.`,
          lines: [
            R`الـ S: «في آخر مشروع فريلانس، العميل فجأة احتاج دفع أونلاين بـ Stripe، وأنا عمري ما استخدمته». had never used = ماضي الماضي.`,
            R`الـ T: «كان عندي أسبوع أضيفه قبل الإطلاق».`,
            R`الـ A1: «الأول قريت الـ docs الرسمية ومشيت على الـ quick start في مشروع تجريبي منفصل».`,
            R`الـ A2: «بعدين عملت أصغر نسخة: منتج واحد، و checkout واحد، test mode بس».`,
            R`الـ A3: «أصعب حاجة كانت الـ webhooks، فاتفرجت على talk عنها وسألت في الـ Discord بتاعهم».`,
            R`الـ A4: «بعد كده ضفته للمشروع الحقيقي وكتبت checklist بكروت اختبار لكل حالة».`,
            R`الـ R: «طلقنا في المعاد، وأول شهر كان فيه حوالي ١٥٠ دفعة من غير ولا أوردر فاشل».`,
            R`الدرس: «دلوقتي لما أتعلم أداة جديدة، دايمًا بعمل نسخة صغيرة الأول برا المشروع الحقيقي».`
          ],
          sol: R`مثال من الجامعة:
[[S: In my third year, I joined a hackathon, and our team decided to build a mobile app with Flutter. I had never used Flutter or Dart.]] [[T: I was responsible for the UI, and we had 48 hours.]] [[A: First, I spent two hours on the official Flutter codelab. Then I built one screen with fake data, to learn the layout widgets. When I got stuck on state management, I asked a mentor at the event instead of searching for an hour. After that, I built the four real screens.]] [[R: We finished the demo on time and won second place.]] [[Lesson: Since then, I always start with the official tutorial and one small screen before the real work.]]

راجع: الـ Action فيه ٣ خطوات تعلم على الأقل؟ فيه [[had never]] أو [[didn't know]]؟ فيه نتيجة محددة؟ الإجابة الضعيفة: [[I watched tutorials and learned it fast.]]`
        },
        {
          cmd: "STAR: feedback صعب",
          title: "«Tell me about a time you received critical feedback»: إجابة كاملة",
          desc: R`الإنترفيوير عايز يعرف: لما حد بينتقدك، بتدافع ولا بتسمع؟ وبتتغير فعلًا ولا بتقول «حاضر» وخلاص؟ والـ junior بالذات هياخد feedback كتير، فده مهم جدًا للشركة.

القصة الكويسة فيها: feedback حقيقي (مش «قالولي إني بشتغل كتير زيادة»)، ورد فعلك الأول (عادي تقول إنه كان صعب)، وإيه اللي عملته بعدها بالظبط، ودليل إنك اتغيرت. وآخرها إحساس إيجابي ناحية اللي انتقدك.`,
          example: R`S: In my first month at my internship, a senior developer reviewed my PR and left about 30 comments.
S: He said my PR was too big to review, and my functions were doing too many things.
T: Honestly, it was hard to hear at first, but I knew he was right, and I wanted to improve.
A: First, I thanked him and asked him to show me one example of how he would split a function.
A: Then I split my PR into three smaller ones, and I started keeping my PRs under 300 lines.
A: I also started reviewing my own diff before asking for a review, with a short checklist.
R: Two months later, my PRs were usually approved after one round, and he asked me to review a new intern's code.
Lesson: I learned that feedback on my code isn't feedback on me. Now I ask for it early, not only at the end.`,
          try: R`فكّر في feedback حقيقي اتقالك (كود، أو presentation، أو شغل، أو حتى من دكتور في الجامعة). اكتب قصتك في ٨ جمل، ولازم تحتوي على: رد فعلك الأول بصدق، وخطوتين عملتهم بعدها، ودليل إنك اتغيرت. سجّلها.`,
          flag: "script",
          deep: {
            why: R`الشركات بتخاف من الـ junior اللي بياخد النقد على شخصه، لأنه بيبطّأ الفريق كله. والقصة دي بتطمنهم. وفيه ميزة: القصة الكويسة هنا ممكن تكون بسيطة جدًا (code review)، مش محتاجة موقف درامي.`,
            how: R`عبارات رد الفعل الأول: [[Honestly, it was hard to hear at first]]، و [[My first reaction was to defend my code, but...]]، و [[I was surprised, but...]]. الصدق هنا بيخلي القصة مصدقة.

عبارات الخطوات: [[I asked for an example]]، و [[I asked what "good" looks like]]، و [[I made a checklist]]، و [[I started ...ing]]، و [[I asked him to review it again]].

الدليل: [[Two months later, ...]]، و [[He later asked me to ...]]، و [[My next performance review mentioned ...]].

الدرس: [[Feedback on my code isn't feedback on me]]، و [[Now I ask for feedback early]].

follow-ups: [[Did you ever disagree with feedback?]] → [[Yes, once. I asked questions to understand, and in the end we found a middle ground / I explained my reason with data.]]`,
            when: "«Tell me about a time you received feedback»، و «How do you handle criticism?»، و «What's the most useful feedback you've received?».",
            mistakes: R`feedback مزيف ([[They said I'm a perfectionist]]). وتلوم اللي انتقدك ([[He was very harsh]]). ومفيش تغيير حقيقي ([[I said OK and continued]]). و [[He gave me a feedback]] (الصح [[He gave me feedback]] أو [[some feedback]] من غير a: درس [[informations و a feedback]] في «تاب إنجليزي للمبرمج: قراية وكتابة»).`
          },
          teach: R`## الفكرة: نقد حقيقي، ورد فعل صادق، وخطوات، ودليل إنك اتغيرت

المثال ٨ سطور. الجزء اللي بيفرّق القصة دي: سطر رد الفعل الأول بصدق، وسطر الدليل بعد شهرين.

---

## ١. S: النقد نفسه (أول سطرين)

[[In my first month at my internship, a senior developer reviewed my PR and left about 30 comments.]] و [[He said my PR was too big to review, and my functions were doing too many things.]]: نقد حقيقي ومحدد. [[left comments]] = ساب تعليقات. و [[He said...]] بعدها ماضي ([[was]] و [[were doing]]) لأنها كلام اتقال زمان.

## ٢. T: رد فعلك بصدق (السطر التالت)

[[Honestly, it was hard to hear at first, but I knew he was right, and I wanted to improve.]]: [[Honestly]] و [[hard to hear]] بيخلّوا القصة مصدقة. الإنترفيوير مش مصدّق إن حد بيفرح بـ ٣٠ تعليق.

## ٣. A: ٣ خطوات (السطر ٤ و ٥ و ٦)

| الجملة | الخطوة |
|---|---|
| [[First, I thanked him and asked him to show me one example of how he would split a function.]] | شكر + طلب مثال |
| [[Then I split my PR into three smaller ones, and I started keeping my PRs under 300 lines.]] | تغيير فوري + عادة |
| [[I also started reviewing my own diff before asking for a review, with a short checklist.]] | عادة تانية |

[[split]] ماضيها [[split]] (مش splitted). و [[started + ing]] = بدأت أعمل كذا بانتظام. و [[ask him to show me]] = طلبت منه يوريني.

## ٤. R والدرس (آخر سطرين)

[[Two months later, my PRs were usually approved after one round, and he asked me to review a new intern's code.]]: الدليل جاي من **الشخص اللي انتقدك** نفسه، ودي أقوى نهاية. [[after one round]] = من أول مرة مراجعة.

[[I learned that feedback on my code isn't feedback on me. Now I ask for it early, not only at the end.]]

---

## الخلاصة

- [[feedback]] من غير [[a]]: [[He gave me feedback]] أو [[some feedback]].
- رد الفعل الأول بصدق: [[It was hard to hear at first, but...]].
- الدليل بزمن: [[Two months later, ...]].
- متلومش اللي انتقدك ([[He was very harsh]]).`,
          lines: [
            R`الـ S: «أول شهر في التدريب، senior راجع الـ PR بتاعي وساب حوالي ٣٠ تعليق».`,
            R`«قال إن الـ PR كبير جدًا عشان يتراجع، والدوال بتعمل حاجات كتير».`,
            R`رد الفعل بصدق: «بصراحة كان صعب أسمعه في الأول، بس كنت عارف إنه صح، وكنت عايز أتحسن».`,
            R`الـ A1: «الأول شكرته وطلبت يوريني مثال واحد إزاي هو كان هيقسّم دالة».`,
            R`الـ A2: «بعدين قسّمت الـ PR لـ ٣ أصغر، وبدأت أخلّي الـ PRs تحت ٣٠٠ سطر».`,
            R`الـ A3: «وبدأت أراجع الـ diff بتاعي بنفسي قبل ما أطلب review، بـ checklist قصيرة».`,
            R`الـ R والدليل: «بعد شهرين، الـ PRs بقت بتتقبل من أول مرة غالبًا، وطلب مني أراجع كود intern جديد».`,
            R`الدرس: «اتعلمت إن النقد على الكود مش نقد ليا. ودلوقتي بطلبه بدري».`
          ],
          sol: R`مثال من presentation:
[[S: In my final year, I presented my graduation project to the committee, and one professor said my slides had too much text and nobody could follow.]] [[T: We had a second presentation two weeks later, so I needed to fix it.]] [[A: At first I felt embarrassed, but I asked him after the session what a good slide looks like. He told me one idea per slide. So I rewrote the deck: I cut it from 25 text-heavy slides to 12, with diagrams. I also practiced twice with friends and asked them to stop me when they got lost.]] [[R: In the second presentation, the committee asked more questions about the project itself, and we got the highest grade in our year.]] [[Lesson: Now I ask someone to review my slides before any presentation.]]

راجع: رد الفعل الأول صادق؟ فيه خطوتين محددتين؟ فيه دليل؟ الإجابة الضعيفة: [[I received feedback and I improved myself.]]`
        },
        {
          cmd: "STAR: ضغط ووقت",
          title: "«Tell me about a time you worked under pressure»: إجابة كاملة",
          desc: R`سؤال ضغط الوقت بييجي بصيغ كتير: [[under pressure]]، و [[tight deadline]]، و [[many tasks at once]]، و [[production issue]]. وقصة الـ deadline الفايت فيها درس كامل في «تاب الانترفيو»: [[deadline فات]]. هنا قصة مختلفة: ضغط وعدّى بنجاح، بإنجليزي كامل.

الإنترفيوير عايز يشوف: بتفكر وانت مضغوط ولا بتتوتر وتعمل أي حاجة؟ بترتّب أولويات؟ بتبلّغ الناس؟ والكلمة المفتاحية في الإجابة: [[prioritize]] (رتّبت الأولويات).`,
          example: R`S: On a Thursday evening, the client's online store went down, two days before a big sale.
T: I was the developer who built it, so I had to find the problem and fix it fast.
A: First, I told the client I was on it and would update them every hour.
A: Then I checked the logs and found that the database disk was full because of old log files.
A: I cleaned up the logs to get the site back quickly, and it was online within 40 minutes.
A: After that, I set up log rotation and a disk usage alert, so it wouldn't happen again.
R: The sale went ahead on Saturday with no problems, and the client said the hourly updates really helped.
Lesson: I learned to fix the immediate problem first, then the root cause, and to keep people updated the whole time.`,
          try: R`فكّر في موقف ضغط حقيقي (production issue، أو امتحان ومشروع مع بعض، أو تسليم مستعجل). اكتبه في ٨ جمل، ولازم فيه: إنك بلّغت حد، وإنك رتّبت الأولويات (إيه الأول وليه)، وحل سريع وبعدين حل دائم. سجّله.`,
          flag: "script",
          deep: {
            why: R`كل شغل فيه ضغط، والشركة عايزة حد يفضل يفكر بوضوح وقت الأزمة ويبلّغ الناس. والقصة اللي فيها «حل سريع وبعدين السبب الحقيقي» بتوري إنك فاهم إزاي الـ incidents بتتعامل في الشغل الحقيقي.`,
            how: R`عبارات الأولويات: [[I prioritized ... because ...]]، و [[The most urgent thing was ...]]، و [[I focused on ... first, and left ... for later]].

عبارات التبليغ: [[I told the client I was on it]] (شغال عليها)، و [[I kept them updated every hour]]، و [[I let my manager know right away]].

الحل المؤقت والدائم: [[a quick fix]] أو [[a workaround]] (حل مؤقت)، و [[the root cause]] (السبب الأساسي)، و [[a permanent fix]]، و [[so it wouldn't happen again]].

الهدوء: [[I stayed calm and ...]] (متقولهاش لوحدها، ورّيها بالخطوات).

follow-ups: [[How do you usually handle stress?]] → إجابة عملية: [[I write down the tasks and pick the most important one. And I take short breaks, even during busy weeks.]]`,
            when: "«Tell me about a time you worked under pressure / with a tight deadline / handled a production issue / juggled multiple tasks».",
            mistakes: R`[[I worked 20 hours a day]] (ده مش مهارة، ده خطر). ومفيش تبليغ لأي حد. وحل سريع من غير سبب جذري. و [[I don't get stressed]] (مش مصدقة). و [[The server was falled down]] (الصح [[went down]] أو [[crashed]]).`
          },
          teach: R`## الفكرة: بلّغ، ورتّب، وحل سريع، وبعدين السبب الجذري

المثال ٨ سطور لقصة موقع وقع قبل عرض. الـ A مقسوم ٤ خطوات بالترتيب اللي بيتعمل في أي incident حقيقي.

---

## ١. S و T (أول سطرين)

[[On a Thursday evening, the client's online store went down, two days before a big sale.]]: [[went down]] = وقع (مش [[was falled]]). والتفصيلة [[two days before a big sale]] هي اللي بتعمل الضغط.

[[I was the developer who built it, so I had to find the problem and fix it fast.]]: [[had to]] = كان لازم.

## ٢. A: الترتيب (السطر ٣ لـ ٦)

| الترتيب | الجملة | الكلمة المفتاحية |
|---|---|---|
| ١. تبليغ | [[First, I told the client I was on it and would update them every hour.]] | [[I'm on it]] = شغال عليها |
| ٢. السبب | [[Then I checked the logs and found that the database disk was full because of old log files.]] | [[checked the logs]] |
| ٣. حل سريع | [[I cleaned up the logs to get the site back quickly, and it was online within 40 minutes.]] | [[within]] = في خلال |
| ٤. حل دائم | [[After that, I set up log rotation and a disk usage alert, so it wouldn't happen again.]] | [[so it wouldn't happen again]] |

[[would update]] و [[wouldn't happen]]: [[would]] هنا مستقبل جوه قصة ماضي. و [[log rotation]] = تدوير ملفات الـ logs ومسح القديم أوتوماتيك.

## ٣. R والدرس (آخر سطرين)

[[The sale went ahead on Saturday with no problems, and the client said the hourly updates really helped.]]: [[went ahead]] = حصل زي ما كان متخطط. و [[hourly updates]] = التحديث كل ساعة.

[[I learned to fix the immediate problem first, then the root cause, and to keep people updated the whole time.]]: [[root cause]] = السبب الأساسي.

---

## الخلاصة

| الخطوة | العبارة |
|---|---|
| تبليغ | [[I told ... I was on it]] |
| أولوية | [[The most urgent thing was...]] |
| مؤقت | [[a quick fix]] / [[a workaround]] |
| دائم | [[the root cause]] + [[so it wouldn't happen again]] |

وابعد عن [[I worked 20 hours a day]] و [[I don't get stressed]].`,
          lines: [
            R`الـ S: «الخميس بالليل، المتجر الأونلاين بتاع العميل وقع، قبل عرض كبير بيومين». went down = وقع.`,
            R`الـ T: «أنا اللي بنيته، فكان لازم ألاقي المشكلة وأصلّحها بسرعة».`,
            R`الـ A1 (تبليغ): «الأول قلت للعميل إني شغال عليها وهحدّثه كل ساعة». on it = شغال عليها.`,
            R`الـ A2: «بعدين شفت الـ logs ولقيت ديسك الداتابيز مليان بسبب ملفات logs قديمة».`,
            R`الـ A3 (حل سريع): «نضّفت الـ logs عشان الموقع يرجع بسرعة، ورجع في أقل من ٤٠ دقيقة».`,
            R`الـ A4 (حل دائم): «بعدها عملت log rotation و alert على مساحة الديسك، عشان متتكررش».`,
            R`الـ R: «العرض مشي يوم السبت من غير مشاكل، والعميل قال إن التحديثات كل ساعة فرقت معاه».`,
            R`الدرس: «اتعلمت أصلّح المشكلة الفورية الأول، وبعدين السبب الجذري، وأفضل مبلّغ الناس طول الوقت».`
          ],
          sol: R`مثال من الجامعة (تاسكات كتير مع بعض):
[[S: In my last semester, I had final exams and my graduation project deadline in the same week, and I was also doing a part-time freelance task.]] [[T: I couldn't do everything perfectly, so I had to choose.]] [[A: First, I listed everything with its deadline. I told my freelance client I'd deliver three days later, and he agreed. Then I focused on the project features the committee cared about most, and I skipped the extra admin page. I studied for exams in the mornings and worked on the project in the evenings.]] [[R: I passed all exams, we delivered the project on time, and the client got his task on the new date.]] [[Lesson: I learned that telling people early is better than trying to do everything at once.]]

راجع: فيه [[I told]] (تبليغ)؟ فيه اختيار أولوية بسبب؟ الإجابة الضعيفة: [[I worked very hard and slept 3 hours a day and finished everything.]]`
        },
        {
          cmd: "STAR: خلاف",
          title: "«Tell me about a disagreement with a teammate»: إجابة كاملة بالإنجليزي",
          desc: R`فيه قصة كاملة لنفس السؤال في درس [[disagree and commit]] في «تاب الانترفيو» (عن Redis والـ caching). هنا قصة تانية بموقف مختلف (خلاف مع designer على الـ UX)، عشان تشوف إزاي نفس الهيكل بيشتغل على مواقف غير تقنية بحتة.

اللغة المهمة في القصة دي: إزاي توصف رأيك ورأي الطرف التاني باحترام: [[She wanted ... because ...]] و [[I thought ... because ...]]. وإزاي توصف الحل: [[We agreed to ...]] و [[We tested both]] و [[In the end, we went with ...]]. والأهم: ولا جملة فيها لوم أو سخرية من الطرف التاني.`,
          example: R`S: On my last project, our designer wanted a multi-step signup form: five screens, one question each.
S: I thought it would be slower to build and might lose users, because every extra step is a chance to leave.
T: I was building the form, so I needed us to agree before I started.
A: First, I asked her to explain her reasons. She said long forms scare users, which is a fair point.
A: Then I suggested we look at data instead of opinions. We had analytics from the old form.
A: The data showed most users left at the phone number field, not because of the length.
A: So we agreed on a middle ground: two steps, and the phone number became optional.
R: Signups went up by about 20% in the first month, and we used the same approach for the next form.
Lesson: I learned that when two people disagree, looking at data together works better than arguing.`,
          try: R`اكتب قصة خلاف حقيقي (مع زميل، أو في مشروع جامعة، أو مع عميل) في ٩ جمل. لازم فيها: رأيه وسببه بإنصاف، ورأيك وسببك، وإزاي وصلتوا لقرار، وإيه اللي حصل. واقراها كأنك الطرف التاني: هل فيه جملة هتزعله؟ لو فيه، غيّرها. وسجّل.`,
          flag: "script",
          deep: {
            why: R`الشركة عايزة تعرف: هتقدر تشتغل مع ناس مختلفين عنك؟ والقصة اللي بتوصف فيها الطرف التاني بإنصاف بتقول «آه» بوضوح. وأحسن قصة فيها إن كل طرف كان عنده جزء من الحق.`,
            how: R`وصف الرأيين: [[She wanted X because Y]]، و [[His concern was...]]، و [[which is a fair point]] (وده نقطة منطقية). ورأيك: [[I thought...]]، و [[My concern was...]]، و [[I was worried that...]].

وسيلة الحل: [[I suggested we look at data]]، و [[We tested both]]، و [[We asked the tech lead to decide]]، و [[We agreed on a middle ground]] (حل وسط)، و [[We went with her idea, and I committed to it]].

النتيجة: رقم، أو إن العلاقة اتحسنت، أو إن الطريقة اتكررت.

ولو القرار راح عكسك: [[In the end, we went with his approach. I still had some concerns, but I committed to it and made it work.]] ودي إجابة قوية جدًا.

follow-ups: [[What would you do if you still disagreed after that?]] → [[I'd accept the decision, and suggest we review it after some time with real data.]]`,
            when: "«Tell me about a conflict / disagreement / a time you had to convince someone / worked with a difficult person».",
            mistakes: R`قصة إنك كسبت والتاني كان غلط ٪١٠٠. وصف سلبي للشخص ([[He was stubborn]] و [[She didn't understand]]). وخلاف شخصي مش مهني. و [[I convinced him that I'm right]] (الأحسن [[We agreed]]). وقصة من غير نتيجة.`
          },
          teach: R`## الفكرة: الرأيين بإنصاف، والحل بالداتا، ومن غير ولا كلمة لوم

المثال ٩ سطور لخلاف مع designer. اللغة المهمة هنا: إزاي توصف رأيها، ورأيك، والحل.

---

## ١. الرأيين (أول سطرين)

| الرأي | الجملة | التركيبة |
|---|---|---|
| رأيها | [[our designer wanted a multi-step signup form: five screens, one question each.]] | [[She wanted X]] |
| رأيك | [[I thought it would be slower to build and might lose users, because every extra step is a chance to leave.]] | [[I thought ... because ...]] |

[[might lose users]] = ممكن نخسر يوزرز ([[might]] = احتمال، مش أكيد). وده بيخلي رأيك «قلق» مش «حقيقة».

## ٢. T (السطر التالت)

[[I was building the form, so I needed us to agree before I started.]]: [[needed us to agree]] = كان لازم نتفق.

## ٣. A: الطريق للحل (السطر ٤ لـ ٧)

| الجملة | الخطوة |
|---|---|
| [[First, I asked her to explain her reasons. She said long forms scare users, which is a fair point.]] | تسمع، وتعترف: [[which is a fair point]] |
| [[Then I suggested we look at data instead of opinions. We had analytics from the old form.]] | داتا بدل آراء |
| [[The data showed most users left at the phone number field, not because of the length.]] | النتيجة اللي غيرت النقاش |
| [[So we agreed on a middle ground: two steps, and the phone number became optional.]] | [[middle ground]] = حل وسط |

[[suggested we look]] (من غير to ومن غير s): التركيبة [[suggest that we + فعل]]. و [[left at]] = مشيوا عند.

## ٤. R والدرس (آخر سطرين)

[[Signups went up by about 20% in the first month...]]: [[went up by]] = زادت بنسبة. و [[I learned that when two people disagree, looking at data together works better than arguing.]]

---

## الخلاصة

- اوصف التاني بإنصاف: [[She wanted X because Y, which is a fair point.]]
- رأيك كقلق: [[I thought / I was worried that...]]
- الحل: [[I suggested we look at data]] / [[We agreed on a middle ground]].
- ممنوع: [[He was stubborn]] و [[She didn't understand]].`,
          lines: [
            R`الـ S: «في آخر مشروع، الـ designer كانت عايزة فورم تسجيل على خطوات: ٥ شاشات، سؤال في كل واحدة».`,
            R`رأيك وسببه: «كنت شايف إنه أبطأ في التنفيذ وممكن نخسر يوزرز، لأن كل خطوة زيادة فرصة إنهم يمشوا».`,
            R`الـ T: «أنا اللي هبني الفورم، فكان لازم نتفق قبل ما أبدأ».`,
            R`الـ A1: «الأول طلبت منها تشرح أسبابها. قالت إن الفورم الطويل بيخوّف اليوزرز، ودي نقطة منطقية». fair point = منطقية.`,
            R`الـ A2: «بعدين اقترحت نبص على الداتا بدل الآراء. كان عندنا analytics من الفورم القديم».`,
            R`الـ A3: «الداتا ورّت إن أغلب اليوزرز بيمشوا عند خانة رقم الموبايل، مش بسبب الطول».`,
            R`الـ A4: «فاتفقنا على حل وسط: خطوتين، ورقم الموبايل بقى اختياري». middle ground = حل وسط.`,
            R`الـ R: «التسجيلات زادت حوالي ٢٠٪ أول شهر، واستخدمنا نفس الطريقة في الفورم اللي بعده».`,
            R`الدرس: «اتعلمت إن لما اتنين يختلفوا، إنهم يبصوا على الداتا مع بعض أحسن من الجدال».`
          ],
          sol: R`مثال من مشروع جامعة:
[[S: In our graduation project, my teammate wanted to use MongoDB because he already knew it. I wanted PostgreSQL, because our data was about students, courses and grades, which is very relational.]] [[T: We were the two backend developers, so we had to decide in the first week.]] [[A: First, I listened to his reasons: he was worried about learning SQL under a deadline, which was fair. So I suggested we each write the three hardest queries in both databases in one evening. The next day, we compared them together. The SQL versions were shorter and easier to read, and he agreed. I also offered to pair with him on SQL for the first two weeks.]] [[R: We used PostgreSQL, he became comfortable with SQL, and we finished the backend a week early.]] [[Lesson: A small experiment ended the discussion faster than any argument.]]

اقرا قصتك كأنك هو: [[he was worried about ..., which was fair]] بتحترمه. الإجابة الضعيفة: [[He wanted MongoDB but it's bad, so I told him to use PostgreSQL.]]`
        },
        {
          cmd: "STAR: غلطة",
          title: "«Tell me about a mistake you made»: إجابة كاملة بالإنجليزي",
          desc: R`السؤال ده مشروح في درس [[غلطة عملتها]] في «تاب الانترفيو» (بقصة migration). هنا قصة تانية بإنجليزي كامل، وتركيز على اللغة اللي بتعترف بيها من غير ما «تحرق» نفسك.

الفرق في اللغة بين اعتراف قوي واعتراف ضعيف: القوي بيقول [[I made a mistake]] أو [[It was my fault]] بوضوح، ومرة واحدة، وبعدين ينتقل للي عمله. الضعيف بيلف ([[Something happened and the data was lost]]) أو بيعتذر ١٠ مرات أو بيلوم حاجة تانية ([[the tool was bad]]).

والجزء الأطول في الإجابة لازم يكون: صلّحت الأثر إزاي، وغيّرت إيه عشان متتكررش.`,
          example: R`S: A few months ago, I was working on a client's website, and I pushed a change directly to production on a Friday afternoon.
S: I had only tested it on my laptop, and it broke the contact form. For the whole weekend, the client got no messages.
T: It was my mistake, so it was my job to fix it and make sure it didn't happen again.
A: On Monday morning, the client told me. I apologized, rolled back the change within 10 minutes, and confirmed the form worked.
A: Then I checked the server logs and found the messages that failed, and I sent them to the client, so nothing was lost.
A: After that, I set up a staging server and a simple rule for myself: no deploys on Friday, and every change goes to staging first.
R: The client stayed with me, and since then I haven't had a broken deploy on that project.
Lesson: I learned that testing on my laptop isn't enough, and that a staging environment is worth the extra hour.`,
          try: R`اكتب قصة غلطة حقيقية (ليها أثر، وانت اللي عملتها) في ٨ جمل. لازم فيها: جملة اعتراف واضحة ([[It was my mistake]])، وإصلاح الأثر، وتغيير دائم. وبعدين قول الجملة دي بصوت عالي ٥ مرات بنبرة هادية واثقة: [[It was my mistake, so it was my job to fix it.]] وسجّل القصة.`,
          flag: "script",
          deep: {
            why: R`الإنترفيوير عارف إن الكل بيغلط. هو بيقيس الـ ownership: بتعترف؟ بتصلّح؟ بتتعلم؟ والقصة الصادقة المرتبة بتدّي ثقة أكتر من ولا غلطة. والجملة الإنجليزي الواضحة للاعتراف صعبة نفسيًا على ناس كتير، فاتمرن عليها بصوت عالي.`,
            how: R`جمل الاعتراف: [[It was my mistake]]، و [[I made a mistake]]، و [[That was on me]] (دي عليا)، و [[I should have tested it on staging]] (كان المفروض). و [[should have + past participle]] = كان المفروض أعمل كذا (ومعملتش).

جمل الإصلاح: [[I apologized]]، و [[I rolled back the change]]، و [[I restored ...]]، و [[I let ... know right away]].

جمل المنع: [[After that, I set up ...]]، و [[I added a check]]، و [[I made a rule for myself]]، و [[so it wouldn't happen again]].

اختيار الغلطة: حقيقية، وليها أثر، بس مش كارثة أخلاقية أو إهمال متكرر. وقصة من مشروع شخصي أو فريلانس مقبولة جدًا.

follow-ups: [[How did the client react?]] (قول الحقيقة، حتى لو كان زعلان)، و [[What would you do differently?]] → [[I should have ...]].`,
            when: "«Tell me about a mistake / failure / something you'd do differently / a time something went wrong».",
            mistakes: R`[[My biggest mistake is that I work too hard]] (مش إجابة). وقصة الغلطة فيها لزميل. و [[The data was deleted]] (passive بيخبّي مين عمل: قول [[I deleted]]). و [[Sorry, sorry, it was very bad...]] (اعتذار زيادة في الانترفيو). و [[I should tested]] (الصح [[I should have tested]]، وبتتقال بسرعة «shoulda»).`
          },
          teach: R`## الفكرة: اعتراف واضح مرة واحدة، وأطول جزء للإصلاح والمنع

المثال ٨ سطور لـ deploy يوم جمعة كسر فورم. لاحظ إن الاعتراف جملة واحدة، والإصلاح والمنع ٣ سطور.

---

## ١. S: الغلطة بوضوح (أول سطرين)

[[I pushed a change directly to production on a Friday afternoon.]] و [[I had only tested it on my laptop, and it broke the contact form.]]: الفاعل [[I]] في كل فعل. [[had only tested]] = past perfect: قبل الغلطة كنت جربته على اللابتوب بس. و [[broke]] ماضي [[break]].

## ٢. T: الاعتراف (السطر التالت)

~~~text T
It was my mistake, so it was my job to fix it and make sure it didn't happen again.
~~~

دي الجملة اللي الدرس بيطلب تقولها بصوت عالي ٥ مرات. [[It was my mistake]] مرة واحدة، بنبرة هادية، من غير [[sorry sorry]].

## ٣. A: إصلاح ومنع (السطر ٤ و ٥ و ٦)

| الجملة | النوع | الكلمة المفتاحية |
|---|---|---|
| [[On Monday morning, the client told me. I apologized, rolled back the change within 10 minutes, and confirmed the form worked.]] | إصلاح فوري | [[rolled back]] = رجّعت التغيير |
| [[Then I checked the server logs and found the messages that failed, and I sent them to the client, so nothing was lost.]] | إصلاح الأثر | [[nothing was lost]] |
| [[After that, I set up a staging server and a simple rule for myself: no deploys on Friday, and every change goes to staging first.]] | منع | [[set up]] + قاعدة |

## ٤. R والدرس (آخر سطرين)

[[since then I haven't had a broken deploy on that project]]: [[since then]] + present perfect = من ساعتها لحد دلوقتي. و [[a staging environment is worth the extra hour]]: [[worth]] = يستاهل.

---

## الخلاصة

| عايز تقول | الجملة |
|---|---|
| الاعتراف | [[It was my mistake.]] / [[That was on me.]] |
| كان المفروض | [[I should have tested it on staging.]] |
| الإصلاح | [[I rolled back...]] / [[I let ... know right away.]] |
| المنع | [[After that, I set up...]] |

[[I should have tested]] (مش [[should tested]])، وبتتقال سريعة «شُدَڤ». والـ passive ([[the form was broken]]) بيبان إنك بتخبّي مين عمل.`,
          lines: [
            R`الـ S: «من كام شهر، كنت شغال على موقع عميل، ودفعت تغيير على الإنتاج مباشرة يوم جمعة بعد الضهر».`,
            R`«كنت جربته على اللابتوب بس، وكسر فورم التواصل. الويك إند كله العميل موصلوش رسايل».`,
            R`الـ T والاعتراف: «كانت غلطتي، فكان شغلي أصلّحها وأتأكد إنها متتكررش».`,
            R`الـ A1: «الاتنين الصبح العميل قالي. اعتذرت، ورجّعت التغيير في ١٠ دقايق، واتأكدت إن الفورم شغال». rolled back = رجّعت.`,
            R`الـ A2: «بعدين دوّرت في logs السيرفر ولقيت الرسايل اللي فشلت، وبعتها للعميل، فمفيش حاجة ضاعت».`,
            R`الـ A3 (المنع): «بعدها عملت staging server وقاعدة لنفسي: مفيش deploy يوم جمعة، وكل تغيير يروح staging الأول».`,
            R`الـ R: «العميل كمّل معايا، ومن ساعتها معنديش deploy مكسور في المشروع ده».`,
            R`الدرس: «اتعلمت إن التجربة على اللابتوب مش كفاية، وإن الـ staging يستاهل الساعة الزيادة». worth = يستاهل.`
          ],
          sol: R`مثال من فريق:
[[S: During my internship, I was asked to update the prices in the database with a script. I ran it without a WHERE condition on one query, and it set the same price for every product in staging.]] [[T: It was my mistake. Staging was shared with the QA team, so I had to fix it before they started testing.]] [[A: I told my mentor right away. We restored the table from the morning backup in about 20 minutes. Then I rewrote the script to run inside a transaction and print the number of affected rows before committing. I also suggested adding that to our team's script template.]] [[R: QA lost only half an hour, and the template is still used by the team.]] [[Lesson: Now I always run update scripts in a transaction and check the row count first. I should have done that from the start.]]

راجع: فيه [[It was my mistake]] مرة واحدة واضحة؟ فيه [[I told ... right away]]؟ فيه تغيير دائم؟ الإجابة الضعيفة بـ passive: [[The prices were changed by mistake.]]`
        }
      ]
    }
]);

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

TAB("speak", {
  label: "إنجليزي للمبرمج: كلام وانترفيو",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/speak && cd ~/lab/speak
touch phrases.md sounds.md log.md
code .`,
  labText: "التاب ده عن الكلام، فأهم أداة فيه مش الكيبورد: الموبايل (مسجّل الصوت) والسماعة. اعمل فولدر speak فيه ٣ ملفات: phrases.md للجمل الجاهزة اللي هتحفظها (الجملة الإنجليزي، ومعناها، وإمتى تقولها)، و sounds.md للكلمات اللي اكتشفت إنك بتنطقها غلط (الكلمة، والنطق الصح، ولينك YouGlish)، و log.md تكتب فيه كل يوم سطر: اتدربت على إيه وكام دقيقة. وكل تسجيل صوت اعمله سيبه على الموبايل بتاريخه، عشان بعد شهر تسمع الفرق بودنك. والنطق المكتوب بالحروف العربية في التاب ده تقريبي دايمًا: هو بيقرّبك، والودن هي الحَكَم.",
  levels: {"1":["تتكلم في الشغل","تسمع وتنطق الأصوات اللي بتقع فيها، والكلمات التقنية اللي بتتقال غلط، والأرقام والإصدارات والرموز بصوت عالي، والـ standup وتطلب مساعدة وتقول مش فاهم"],"2":["الاجتماعات والشرح","مكالمات الفيديو والـ screen share، وتشرح كودك و PR بصوتك، وتعمل demo، وتدّي تقدير وتختلف بأدب، وتلخّص الاجتماع، وتتكلم مع مديرك وعميلك"],"3":["الانترفيو والتدريب","Tell me about yourself بـ ٣ نسخ، و ٥ قصص STAR كاملة، وتشرح event loop و REST و indexes ببساطة، والـ live coding والمرتب، وخطة ٣٠ يوم و shadowing و mock interview"]},
  categories: [
    {
      t: "تسمع وتنطق: الأصوات اللي بتقع فيها",
      l: 1,
      n: "إزاي تسمع نطق أي كلمة في ثواني، ومفتاح الحروف اللي هنكتب بيه النطق، والأصوات اللي العربي معندوش: p و v و th و ch، ونهايات ed و s، والـ stress",
      items: [
        {
          cmd: "تسمع النطق",
          title: "إزاي تعرف النطق الصح لأي كلمة في ٣٠ ثانية (Google و YouGlish و القاموس)",
          desc: R`أول قاعدة في التاب ده: متتعلمش النطق من الكتابة، اتعلمه من الودن. الإنجليزي مش بيتنطق زي ما بيتكتب ([[queue]] فيها ٥ حروف والنطق صوتين)، فأي كلمة مش متأكد منها اسمعها قبل ما تقولها في اجتماع.

عندك ٣ أدوات مجانية: ١) Google: اكتب [[how to pronounce cache]] وهيطلعلك مربع فيه زرار صوت، وفيه سرعة بطيئة، وأحيانًا بيوريك شكل البق. ٢) YouGlish (youglish.com): اكتب الكلمة واختار English، وهيجيبلك مقاطع YouTube حقيقية لناس بتقولها في جمل، ودي أحسن حاجة للكلمات التقنية لأنك بتسمعها من مبرمجين في talks. ٣) قاموس Cambridge أو Oxford Learner's: فيه النطق الأمريكي (US) والبريطاني (UK) بصوت، ومكتوب بالـ IPA (الرموز اللي بين /.../).

وفي التاب ده هنكتب النطق بـ ٣ طرق مع بعض: حروف عربية تقريبية، و IPA مبسط، والمقطع اللي عليه الضغط بحروف كبيرة. مثلًا [[develop]] = «ديڤيلَب» = /dɪˈveləp/ = de-VEL-op. والحروف العربية دايمًا تقريبية: مفيش حرف عربي بيطابق [[æ]] ولا الـ [[ə]] الضعيفة. استخدمها تقرّبك، وبعدين اسمع.`,
          example: R`Key (our Arabic letters):  پ = p   ڤ = v   گ = g (like Egyptian ج)   ج = dʒ (like Java)
More keys:  ژ = ʒ (like Azure)   ث = th in "think"   ذ = th in "this"   تش = ch in "chat"
Stress:  CAPITALS = the strong syllable:  de-VEL-op,  AL-go-ri-thm
Google:  how to pronounce kubernetes
YouGlish:  youglish.com → type "nginx" → English → listen to 5 clips
Dictionary:  dictionary.cambridge.org → "determine" → play US and UK
Say it:  Let me check how to pronounce that first.`,
          try: R`افتح [[youglish.com]] ودوّر على ٣ كلمات: [[cache]] و [[queue]] و [[determine]]. اسمع ٣ مقاطع لكل كلمة، وقول الكلمة بصوت عالي بعد كل مقطع. وبعدين اكتب في [[sounds.md]] لكل كلمة: كنت بتنطقها إزاي قبل كده، وإزاي بتتنطق فعلًا (بالحروف العربية التقريبية).`,
          flag: "script",
          deep: {
            why: "النطق الغلط لكلمة تقنية بيخلّي اللي قدامك يوقف ثانية يفكر انت قصدك إيه، ولو تكرر كتير الكلام كله بيتقل. والمصيبة إن أغلبنا اتعلم الكلمات دي من القراية أو من يوتيوبر عربي بينطقها غلط، فبنكرر الغلط سنين من غير ما نعرف. الأدوات دي بتحل ده في ثواني.",
            how: R`في Google: [[how to pronounce X]] أو [[X pronunciation]]، ودوس على أيقونة السلحفاة للصوت البطيء. وفي YouGlish: فيه أزرار US و UK و AUS، والمقاطع بتبدأ من الجملة اللي فيها الكلمة، وتقدر تدوس [[Next]] لمقطع تاني، ودا بيوريك إن فيه كلمات ليها أكتر من نطق مقبول (زي [[data]] و [[route]]).

الـ IPA مش لازم تحفظها كلها. اعرف بس دول: [[ˈ]] قبل المقطع المضغوط، و [[ə]] صوت ضعيف زي «ـَ» سريعة، و [[ɪ]] كسرة قصيرة، و [[iː]] ياء طويلة، و [[æ]] فتحة ممدودة بين «آ» و «إي» (زي cat)، و [[ʌ]] فتحة قصيرة (زي cut)، و [[θ]] ث، و [[ð]] ذ.

وخلي بالك من أسماء الأدوات (Nginx و Kubernetes و Vite): أحسن مصدر هو صاحب الأداة نفسه. ابحث في YouTube عن talk من فريق المشروع واسمعهم بيقولوها.`,
            when: "أول مرة تقابل كلمة، وقبل أي presentation أو انترفيو بيوم: اعمل قايمة بالكلمات التقنية اللي هتقولها واسمعها كلها.",
            mistakes: R`إنك تفترض إن الكلمة بتتنطق زي ما بتتكتب. وإنك تتعلم نطق من فيديو واحد (ممكن صاحبه بينطقها غلط برضو). وإنك تحفظ الحروف العربية التقريبية كأنها النطق النهائي: هي مجرد تقريب. وإنك تتكسف تقول في اجتماع [[How do you pronounce that?]]: السؤال ده عادي جدًا حتى بين الـ native speakers مع أسماء الأدوات.`
          },
          lines: [
            R`مفتاح الحروف: پ = p، و ڤ = v، و گ = g زي الجيم المصري، و ج = الجيم الفصحى (زي Java).`,
            R`باقي المفتاح: ژ زي الجيم الشامي (Azure)، و ث في think، و ذ في this، و تش في chat.`,
            R`الضغط (stress): المقطع المكتوب CAPITAL هو اللي بيتقال أعلى وأطول شوية.`,
            R`Google: اكتب «how to pronounce» والكلمة، وهيطلع مربع فيه صوت عادي وبطيء.`,
            R`YouGlish: مقاطع حقيقية من YouTube لناس بتقول الكلمة في جملة.`,
            R`القاموس: Cambridge فيه النطق الأمريكي والبريطاني بصوت، ومكتوب IPA.`,
            R`جملة تقولها في اجتماع: «خليني أتأكد من نطقها الأول». عادي ومحترم.`
          ],
          sol: R`النتيجة المتوقعة في [[sounds.md]]:

[[cache]]: كنت بقول «كاتش» أو «كاشيه» ← الصح «كاش» /kæʃ/ زي كلمة [[cash]] بالظبط.
[[queue]]: كنت بقول «كويو» ← الصح «كيو» /kjuː/ زي حرف [[Q]] بالظبط، والـ [[ueue]] كلها ساكتة.
[[determine]]: كنت بقول «ديترماين» ← الصح «ديتيرمِن» /dɪˈtɜːrmɪn/ والضغط على [[TER]]، والآخر [[min]] قصير مش [[mine]].

لو لقيت إنك كنت بتنطق التلاتة صح، ممتاز، جرّب ٣ كلمات من درس «Linux و SQL و Nginx». ولو في YouGlish سمعت نطقين مختلفين لنفس الكلمة (بيحصل في [[route]] و [[data]])، ده معناه إن الاتنين مقبولين: اختار واحد وثبت عليه.`
        },
        {
          cmd: "p و v",
          title: "p مش b و v مش f: Python و server و develop",
          desc: R`العربي معندوش [[p]] ولا [[v]]، فالمخ بيبدّلهم بأقرب صوت: [[p]] بتبقى [[b]]، و [[v]] بتبقى [[f]]. فـ [[Python]] بتتقال «بايثون» بالباء، و [[server]] بتبقى «سيرفر» بالفاء، و [[develop]] «ديفيلوب». والمشكلة إن ده ساعات بيغيّر الكلمة: [[pull]] (تسحب) و [[bull]]، و [[pack]] و [[back]]، و [[van]] و [[fan]]، و [[very]] و [[fairy]].

الـ [[p]]: نفس مكان الـ [[b]] (الشفايف مقفولة)، بس من غير صوت من الزور، وبنفخة هوا. حط ورقة قدام بقك وقول [[pen]]: الورقة لازم تتحرك. ولو قلت [[Ben]] الورقة مش هتتحرك.

الـ [[v]]: نفس مكان الـ [[f]] (سنانك الفوق على شفتك التحت)، بس بصوت من الزور. حط صباعك على زورك: في [[f]] مفيش رعشة، وفي [[v]] فيه رعشة (زي الفرق بين «س» و «ز»).`,
          example: R`p:  pull  push  deploy  API  pipeline  support  pass  up  pip
p vs b:  pull / bull    pack / back    pin / bin    cap / cab
v:  server  value  variable  Vue  environment  version  invalid  vs  dev
v vs f:  very / fairy    van / fan    save / safe    view / few
Sentence 1:  Please push the patch to the pipeline.
Sentence 2:  The server returned an invalid value in version seven.
Sentence 3:  Could you pull the latest version and deploy it to prod?
Sentence 4:  I'll pair with Pavel on the Python API.`,
          try: R`سجّل نفسك وانت بتقول الـ ٤ جمل ببطء، مرتين: مرة عادي، ومرة وانت حاطط ورقة قدام بقك (للـ p) وصباعك على زورك (للـ v). اسمع التسجيل وعدّ: كام p طلعت b، وكام v طلعت f؟ اكتب الكلمات اللي وقعت فيها في [[sounds.md]].`,
          flag: "script",
          deep: {
            why: "ده أشهر فرق بيخلي الإنجليزي بتاعنا «باين إنه عربي» وساعات بيلخبط المعنى. والخبر الحلو إنه من أسهل حاجات النطق في التصليح لأنه حركة ميكانيكية (نفخة هوا، رعشة زور) مش ودن موسيقية.",
            how: R`اتمرن على أزواج (minimal pairs): كلمتين الفرق بينهم صوت واحد بس، زي [[pull / bull]] و [[save / safe]]. قولهم ورا بعض ببطء ٥ مرات، وبعدين أسرع.

خلي بالك إن الـ [[p]] بتختفي أكتر في نص الكلمة وآخرها: [[deploy]] و [[API]] و [[up]] و [[pip]]. والـ [[v]] بتضيع أكتر في آخر الكلمة: [[save]] و [[have]] و [[five]] و [[live]] (وفي آخر الكلمة الـ v بتبقى أضعف بطبيعتها، بس بتفضل v).

ولو لقيت صعوبة: قول [[f]] وانت مطوّل، وبعدين شغّل صوتك من غير ما تحرك بقك: هتلاقيها بقت [[v]]. ونفس الحركة من [[b]] للـ [[p]]: اقفل شفايفك، وافتحها بنفخة من غير صوت.`,
            when: "أي كلمة فيها p أو v، وخصوصًا أسماء الأدوات والكلمات اللي بتتكرر كل يوم: push, pull, deploy, API, server, version, value, environment.",
            mistakes: R`[[bython]] بدل [[Python]]، و [[serfer]] بدل [[server]]، و [[defelop]] بدل [[develop]]، و [[inbut]] بدل [[input]]، و [[fersion]] بدل [[version]]. والعكس ساعات بيحصل من كتر الحرص: [[p]] مكان [[b]] الصح ([[pug]] بدل [[bug]]): الـ [[bug]] بالباء، متصلحش حاجة سليمة.`
          },
          lines: [
            R`كلمات فيها p: pull تسحب، و push تزق، و deploy تنزّل، و pipeline سلسلة خطوات، و support دعم، و pass تعدّي، و pip مدير باكدجات Python.`,
            R`أزواج p و b: الفرق في النفخة. pull تسحب / bull ثور، و pack / back، و pin / bin سلة، و cap / cab.`,
            R`كلمات فيها v: server، و value قيمة، و variable متغير، و Vue، و environment بيئة، و version إصدار، و invalid مش صالح، و vs (versus)، و dev.`,
            R`أزواج v و f: very جدًا / fairy جنية، و van / fan مروحة، و save تحفظ / safe آمن، و view / few.`,
            R`«من فضلك ادفع الـ patch للـ pipeline». فيها ٥ p.`,
            R`«السيرفر رجّع قيمة مش صالحة في الإصدار ٧». فيها ٥ v.`,
            R`«ممكن تسحب آخر إصدار وتنزّله على الإنتاج؟» prod = production.`,
            R`«هشتغل مع Pavel على الـ Python API». pair with = تشتغل جنب حد على نفس الكود.`
          ],
          sol: R`التسجيل الأول غالبًا هتلاقي فيه ٣–٦ غلطات، أشهرها: [[deploy]] بتطلع «ديبلوي»، و [[API]] بتطلع «إيه بي آي»، و [[version]] و [[invalid]] بتطلع بالفاء. ده طبيعي.

التسجيل التاني (بالورقة والصباع) المفروض يبقى فيه غلطة أو اتنين بس، بس هتلاحظ إنك أبطأ. ده كمان طبيعي: السرعة بتيجي بعد أسبوع تكرار.

علامة إنك نجحت: [[Pavel]] و [[pair]] و [[patch]] بنفخة، و [[seven]] و [[server]] برعشة. ولو التسجيلين طالعين نفس الشيء بالظبط، اسمع [[pull]] و [[bull]] في YouGlish ورا بعض لحد ما ودنك تسمع الفرق الأول، وبعدين حاول تنطقه.`
        },
        {
          cmd: "th و ch",
          title: "th ليها صوتين (think و this) و ch مش sh: method و thread و cache",
          desc: R`الـ [[th]] في الإنجليزي ليها صوتين، والاتنين موجودين في الفصحى ومش موجودين في العامية المصري: [[θ]] زي الثاء في [[think]] و [[thread]] و [[method]] و [[path]] و [[auth]]، و [[ð]] زي الذال في [[this]] و [[the]] و [[then]] و [[other]] و [[algorithm]]. والمصري بيحولهم لـ «س/ت» و «ز/د»: [[method]] تبقى «ميسود»، و [[this]] تبقى «زيس» أو «ديس».

الحل: طرف لسانك يطلع بين سنانك شوية (حرفيًا باين)، وتنفخ. من غير صوت زور = [[θ]] (ث). بصوت زور = [[ð]] (ذ). لو عارف تقول «ثلاثة» و «ذلك» بالفصحى، انت عارف الصوتين.

والـ [[ch]] = «تش» /tʃ/ في [[chat]] و [[check]] و [[change]] و [[branch]] و [[fetch]] و [[batch]]: صوت «ت» لازقة في «ش». المصري ساعات بيقول «شيك» بدل «تشيك». وخلي بالك إن [[ch]] ساعات بتتنطق [[k]] (ودي في درس «حروف ساكتة»).`,
          example: R`θ (ث):  think  thread  method  path  auth  both  three  thanks  length  width
ð (ذ):  this  the  then  other  with  algorithm  either  whether
tʃ (تش):  chat  check  change  branch  fetch  batch  cherry-pick  match
Sentence 1:  I think the thread is blocked by this method.
Sentence 2:  Both paths go through the auth middleware.
Sentence 3:  Let me check the other branch, then fetch the changes.
Sentence 4:  Thanks, that makes sense.`,
          try: R`قول الـ ٤ جمل قدام مراية (أو كاميرا الموبايل): لازم تشوف طرف لسانك في كل [[th]]. وبعدين سجّل صوتك وانت بتقرا الجملة دي: [[Three threads think the method is thread-safe, but the other thread doesn't.]] وقارن بنطق Google لكلمة [[thread]].`,
          flag: "script",
          deep: {
            why: R`[[the]] و [[this]] و [[that]] و [[with]] من أكتر الكلمات تكرار في الإنجليزي كله، و [[method]] و [[thread]] و [[path]] و [[auth]] من أكتر الكلمات التقنية. فلو صلّحت الصوتين دول، نسبة كبيرة من كلامك هتبقى أوضح في يوم واحد.`,
            how: R`اللسان: طرفه بين السنان الفوق والتحت، مش ورا السنان (لو ورا السنان هيطلع «ت» أو «د»). والنفخ مستمر، يعني الصوت ينفع يتطوّل «ثثثث»، على عكس «ت» اللي بتنفجر وخلاص.

في الكلام السريع، [[the]] و [[this]] بيتقالوا بسرعة جدًا، والـ native speakers نفسهم ساعات بيقربوها من «د». فمتقلقش على [[the]] قد ما تقلق على الكلمات التقنية: [[method]] و [[thread]] و [[path]] لو اتقالوا «ميسود» و «سريد» و «باس» ممكن فعلًا متتفهمش.

الـ [[tʃ]]: قول «ت» وبعدين «ش» لازقين. تمرّن بـ [[check / sheck]] و [[chip / ship]] و [[match / mash]]. وحاجة مهمة: [[width]] فيها «د» وبعدين «ث» على طول: «ويدث». و [[length]] «لينگث».`,
            when: "كل جملة تقريبًا. ركز الأول على الكلمات التقنية (method, thread, path, auth, both, three, algorithm)، وبعدين الكلمات الصغيرة (the, this, with).",
            mistakes: R`[[sank you]] بدل [[thank you]]، و [[tree]] بدل [[three]] (tree = شجرة!)، و [[mesod]] بدل [[method]]، و [[pass]] بدل [[path]] (دي بالذات بتغير المعنى في الكلام عن الملفات)، و [[algorizm]] بدل [[algorithm]]. و [[shange]] بدل [[change]]. والعكس: إنك تنطق [[th]] في [[Thomas]] و [[Thailand]] (دول بـ «ت» عادية).`
          },
          lines: [
            R`صوت ث: think أفكر، و thread خيط تنفيذ، و method دالة في كلاس، و path مسار، و auth، و both الاتنين، و length طول، و width عرض (د + ث).`,
            R`صوت ذ: this، و the، و then بعدين، و other التاني، و with مع، و algorithm (ذ في النص)، و either، و whether سواء.`,
            R`صوت تش: chat، و check، و change، و branch، و fetch، و batch دفعة، و cherry-pick، و match.`,
            R`«أعتقد إن الـ thread متعطّل بسبب الـ method دي». فيها θ و ð مع بعض.`,
            R`«المسارين الاتنين بيعدّوا على الـ auth middleware». both و paths و through و auth.`,
            R`«خليني أشوف الـ branch التاني، وبعدين أجيب التغييرات». check و other و branch و then و fetch و changes.`,
            R`«شكرًا، كده منطقي». thanks بـ ث، و that بـ ذ. makes sense = مفهوم/منطقي.`
          ],
          sol: R`في المراية: المفروض تشوف طرف لسانك ١٢ مرة على الأقل في الجمل الـ ٤ (think, thread, this, method, both, paths, through, auth, other, then, thanks, that). لو شفته في نصهم بس، انت لسه بتقول «س» و «ز» في الباقي.

جملة التحدي فيها ٩ مرات [[th]]. التسجيل الكويس فيه [[three threads]] مش [[tree sreads]]، و [[thread-safe]] واضحة. ولو اتلخبطت في النص (ده بيحصل للكل، هي tongue twister)، قسّمها: [[Three threads]] / [[think the method]] / [[is thread-safe]] وكرر كل جزء ٣ مرات.

الغلط الشائع: إنك تطلّع لسانك جامد ومتنفخش، فيطلع صوت «ت» غريب. النفخ هو اللي بيعمل الـ ث.`
        },
        {
          cmd: "estring",
          title: "ليه بنقول «إسترينج» و «إسكريبت»؟ الحروف الساكنة المتجمعة",
          desc: R`العربي مبيبدأش كلمة بحرفين ساكنين، فالمخ المصري بيحط «إ» قبلهم أو حركة بينهم: [[string]] تبقى «إسترينج»، و [[script]] «إسكريبت»، و [[split]] «إسبليت»، و [[stack]] «إستاك»، و [[spring]] «إسبرينج». وفي آخر الكلمة بنحط حركة زيادة: [[text]] تبقى «تيكِست»، و [[tests]] «تيستس» بيتقسم.

الـ native speaker هيفهمك غالبًا، بس ده بيطوّل الكلام، وبيخليه «مكسّر»، وساعات بيغيّر عدد المقاطع فالكلمة تتسمع كلمة تانية ([[sport]] و [[a sport]]).

الحل: ابدأ بالصوت الأول على طول من غير أي حركة قبله. قول «سسسس» مطوّلة، وبعدين كمّل «تاك» من غير ما تقطع: [[sss-tack]]. وبالتدريج قصّر الـ «سسس».`,
          example: R`Start clusters:  string  script  split  stack  spread  sprint  strict  struct  screen
Start clusters:  class  clone  build  proxy  prompt  Flutter  Prisma  query
End clusters:  text  tests  next  scripts  requests  structs  tasks  fixed  helped
Slow → fast:  sss-tring → string    sss-cript → script    sss-print → sprint
Sentence 1:  The script splits the string and strips the spaces.
Sentence 2:  In this sprint, the next tasks are the tests and the requests.
Sentence 3:  Use strict mode and spread the props.`,
          try: R`سجّل الجملة الأولى والتانية. اسمعهم وعلّم كل كلمة قلت قبلها «إ» أو حطيت فيها حركة زيادة. وبعدين اتمرن بطريقة «Slow → fast»: كل كلمة وقعت فيها قولها ٣ مرات بـ «سسس» طويلة، و ٣ مرات عادي. وسجّل تاني وقارن.`,
          flag: "script",
          deep: {
            why: R`ده من أكتر الحاجات اللي بتخلي الإنجليزي المصري «باين»، ومن أكتر الكلمات التقنية فيها المشكلة دي: string و script و stack و sprint و struct و spread و split. وكل «إ» زيادة بتضيف مقطع، فالجملة بتطول وتتقل.`,
            how: R`الكلمات اللي بتبدأ بـ [[s]] + حرف ([[st]] و [[sp]] و [[sc]] و [[str]] و [[spr]]): ابدأ بالـ [[s]] على طول كأنها صفارة. الحيلة: قول الكلمة اللي قبلها متوصّلة بيها: [[the_string]] و [[this_script]] و [[a_sprint]]: كده المخ مش هيحتاج يزود «إ».

الكلمات اللي فيها حرفين في الأول من غير s ([[class]] و [[clone]] و [[build]] و [[proxy]] و [[Flutter]]): متحطش حركة بين الحرفين. مش «كلاس» بكسرة، ومش «بُرُكسي». وفي الآخر ([[text]] و [[tests]] و [[next]]): اقفل الكلمة بالحروف من غير حركة. [[tests]] = «تِسْتْس» كتلة واحدة، مش «تيس-تس».

ونهايات [[-ed]] و [[-s]] ليها درس لوحدها لأنها بتفرق في المعنى (ماضي، وجمع).`,
            when: "أي كلمة بتبدأ بـ s + حرف ساكن، وأي جمع لكلمة آخرها حرف ساكن (tests, requests, tasks, scripts).",
            mistakes: R`«إسترينج» و «إسكريبت» و «إستيت» ([[state]]) و «إستور» ([[store]]) و «إسبرينت». و «بِلِد» بدل [[build]]. والعكس من كتر الحرص: إنك تبلع حرف من الكتلة: [[tests]] تبقى [[tess]]، و [[next]] تبقى [[nex]]: خليك واضح في الـ [[t]] الأخيرة في الكلام المهم.`
          },
          lines: [
            R`كلمات بتبدأ بـ s + حرف: string نص، و script، و split تقسم، و stack، و spread، و sprint فترة الشغل، و strict صارم، و struct، و screen شاشة.`,
            R`كلمات أولها حرفين من غير s: class و clone و build و proxy و prompt و Flutter و Prisma و query. ممنوع حركة بين الحرفين الأولانيين.`,
            R`كلمات آخرها حرفين أو أكتر: text و tests و next و scripts و requests و structs و tasks و fixed و helped. اقفلها من غير حركة زيادة.`,
            R`التمرين: طوّل الـ s في الأول وبعدين قصّرها لحد ما تبقى طبيعية.`,
            R`«السكربت بيقسم الـ string ويشيل المسافات». script و splits و string و strips و spaces.`,
            R`«في السبرنت ده، التاسكات الجاية هي الاختبارات والـ requests».`,
            R`«استخدم strict mode واعمل spread للـ props».`
          ],
          sol: R`التسجيل الأول غالبًا فيه ٤–٧ «إ» زيادة، أشهرها قبل [[script]] و [[string]] و [[strips]] و [[sprint]] و [[strict]] و [[spread]]. وكمان [[splits]] و [[tasks]] و [[tests]] ممكن تطلع مقسومة.

بعد التمرين، الكلمات دي المفروض تبدأ بصوت «س» صافي. والاختبار السهل: عدّ المقاطع. [[string]] مقطع واحد، و [[script]] مقطع واحد، و [[sprint]] مقطع واحد. لو عديتهم اتنين، لسه فيه «إ».

ولو لقيتها صعبة جدًا في الكلام السريع، ابدأ بإنك توصّلها بالكلمة اللي قبلها: [[the_script]] و [[this_sprint]]. دي بتسهّل كتير.`
        },
        {
          cmd: "-ed و -s",
          title: "fixed بتتقال «فِكست» مش «فِكسِد»: نهايات الماضي والجمع في الـ standup",
          desc: R`في الـ standup كل كلامك ماضي: [[fixed]] و [[deployed]] و [[updated]] و [[merged]]. والمصري بيقرا الـ [[-ed]] زي ما هي مكتوبة «إد» في كل مرة، فـ [[fixed]] تبقى «فيكسِد» و [[pushed]] «بوشِد». والصح إن الـ [[-ed]] ليها ٣ أصوات بس، وقاعدتها سهلة:

١) لو الفعل آخره صوت [[t]] أو [[d]] ← [[ɪd]] «ِد» مقطع زيادة: [[updated]] «أپ-ديْ-تِد»، و [[added]] «آ-دِد»، و [[tested]] و [[needed]] و [[deleted]].
٢) لو آخره صوت من غير رعشة زور ([[p]] و [[k]] و [[s]] و [[sh]] و [[ch]] و [[f]]) ← [[t]] «ت» من غير مقطع زيادة: [[fixed]] «فِكْسْت»، و [[pushed]] «پُشْت»، و [[checked]] «تشِكْت»، و [[helped]] «هِلْپْت»، و [[stopped]].
٣) أي حاجة تانية ← [[d]] «د» من غير مقطع زيادة: [[deployed]] «ديپلويْد»، و [[merged]] «مِرْجْد»، و [[called]] و [[saved]] و [[logged]].

والجمع والـ [[-s]] نفس الفكرة: [[tests]] «تِسْتْس»، و [[bugs]] «بَگْز» (صوت z)، و [[fixes]] و [[branches]] و [[pushes]] بـ «ِز» مقطع زيادة.`,
          example: R`/ɪd/ extra syllable:  updated  added  tested  needed  deleted  created  started  reverted
/t/ no extra syllable:  fixed  pushed  checked  helped  stopped  asked  looked  worked  missed
/d/ no extra syllable:  deployed  merged  called  saved  logged  cleaned  reviewed  opened  changed
Plural /s/ /z/ /ɪz/:  tests  commits | bugs  files  PRs | fixes  branches  pushes  caches
Standup:  Yesterday I fixed the login bug, pushed the fix, and opened a PR.
Standup:  I reviewed two PRs, merged them, and updated the docs.
Standup:  I worked on the cache and tested it; it helped a lot.`,
          try: R`اكتب ٣ جمل standup عن امبارح (حقيقي أو من مذاكرتك) فيهم ٦ أفعال ماضي على الأقل، واكتب جنب كل فعل هو من أنهي مجموعة: [[ɪd]] ولا [[t]] ولا [[d]]. وبعدين سجّلهم وعدّ: كام فعل زودت فيه مقطع «إد» وهو مش من المجموعة الأولى؟`,
          flag: "script",
          deep: {
            why: R`الـ standup وأي update بصوتك كله ماضي، فالغلطة دي بتتكرر ١٠ مرات في دقيقة. و «فيكسِد» بتخلي الكلام أبطأ وتقيل، والأسوأ إن ساعات اللي بيسمع يفتكرها [[fix it]]. والقاعدة ٣ سطور بس.`,
            how: R`اسأل نفسك سؤال واحد: الفعل آخره صوت [[t]] أو [[d]]؟ لو آه، زوّد مقطع «ِد». لو لأ، متزودش مقطع خالص: هتبقى «ت» أو «د» لازقة في آخر الكلمة، والفرق بين «ت» و «د» هنا صغير ومحدش هيوقف عنده، المهم متزودش مقطع.

الصوت مش الحرف: [[fixed]] آخرها حرف [[x]] بس الصوت [[ks]] (من غير رعشة) فتبقى [[t]]. و [[changed]] آخرها [[e]] مكتوبة بس الصوت [[dʒ]] فتبقى [[d]]. و [[created]] آخرها صوت [[t]] فتبقى [[ɪd]].

الجمع: بعد [[s]] و [[z]] و [[sh]] و [[ch]] و [[x]] و [[dʒ]] ← [[ɪz]] مقطع زيادة ([[fixes]] و [[caches]] و [[branches]] و [[pages]]). بعد صوت من غير رعشة ← [[s]] ([[tests]] و [[commits]] و [[docs]]). غير كده ← [[z]] ([[bugs]] و [[files]] و [[PRs]] = «پي آرز»).`,
            when: "كل standup، وكل ما تحكي حاجة حصلت (قصص STAR في الانترفيو كلها ماضي!).",
            mistakes: R`«فيكسِد» و «بوشِد» و «تشيكِد» و «وُرْكِد» و «آسكِد» (أشهرهم [[asked]] = «آسْكْت»). والعكس: إنك تنسى المقطع في [[updated]] و [[added]] فتبقى «أبديت» ومحدش يعرف ماضي ولا مضارع. وإنك تنسى الـ ed خالص في الكلام: [[Yesterday I fix the bug]] (ده غلط grammar مش نطق، وهيجي في درس «أزمنة الكلام»).`
          },
          lines: [
            R`مجموعة «ِد»: أفعال آخرها صوت t أو d، فبيتزود مقطع: up-da-ted، a-dded، tes-ted، nee-ded، de-le-ted، crea-ted، star-ted، re-ver-ted.`,
            R`مجموعة «ت»: آخرها صوت من غير رعشة (k, p, s, sh, ch, ks)، ومفيش مقطع زيادة: فِكسْت، پُشْت، تشِكْت، هِلْپْت، ستوپْت، آسْكْت، لُكْت، وِرْكْت، مِسْت.`,
            R`مجموعة «د»: كل الباقي، ومفيش مقطع زيادة: ديپلويْد، مِرْجْد، كولْد، سيڤْد، لوگْد، كلينْد، ريڤيوْد، أوپِنْد، تشينْجْد.`,
            R`الجمع: tests و commits بـ «س». bugs و files و PRs بـ «ز». fixes و branches و pushes و caches بمقطع «ِز» زيادة.`,
            R`«امبارح صلّحت bug الـ login، ودفعت التصليح، وفتحت PR». fixed و pushed = ت، و opened = د.`,
            R`«راجعت ٢ PR، وعملتلهم merge، وحدّثت الـ docs». reviewed و merged = د، و updated = ِد.`,
            R`«اشتغلت على الـ cache واختبرته، وفرق جامد». worked و helped = ت، و tested = ِد. helped a lot = ساعد جدًا.`
          ],
          sol: R`مثال لـ ٣ جمل صح مع التصنيف:
[[Yesterday I finished (t) the signup form and added (ɪd) validation.]]
[[I also fixed (t) two bugs and deployed (d) to staging.]]
[[Then I reviewed (d) Sara's PR and asked (t) a few questions.]]

لاحظ إن [[finished]] آخرها صوت [[sh]] فهي «فِنِشْت» مش «فينيشِد». و [[asked]] أصعب واحدة: «آسْكْت» بتتقال بسرعة جدًا، وفي الكلام السريع الـ native بيقولوها قريب من «آسْت».

لو التسجيل فيه «إد» زيادة في كلمة أو اتنين بس، ده كويس جدًا لأول مرة. ولو كل الأفعال طالعة بـ «إد»، اتمرن على السطر التاني من المثال (مجموعة t) بس لمدة يومين.`
        },
        {
          cmd: "stress",
          title: "الضغط على المقطع الصح: deVELop و COMponent ولا comPOnent؟",
          desc: R`كل كلمة إنجليزي فيها مقطع واحد «مضغوط»: بيتقال أعلى وأطول وأوضح، والباقي بيتقال أضعف وأسرع (وغالبًا حرفه المتحرك بيبقى [[ə]] ضعيفة). ولو ضغطت على المقطع الغلط، الكلمة ممكن متتفهمش حتى لو كل الحروف صح. ده أهم من إنك تنطق كل حرف مظبوط.

أشهر أخطاء المصريين في الكلمات التقنية: [[develop]] بنضغط أولها «DEvelop» والصح [[de-VEL-op]]. و [[component]] الصح [[com-PO-nent]]. و [[parameter]] الصح [[pa-RA-me-ter]] مش «para-MEE-ter». و [[environment]] الصح [[en-VI-ron-ment]]. و [[analysis]] [[a-NA-ly-sis]] لكن [[analyze]] [[A-na-lyze]]. و [[technology]] [[tech-NO-lo-gy]].

وفيه كلمات الاسم فيها بيختلف عن الفعل في الضغط: الاسم أوله، والفعل آخره: [[an UPdate]] (تحديث) لكن [[to upDATE]] (يحدّث)، و [[a REcord]] و [[to reCORD]]، و [[the PROgress]] و [[to proGRESS]]، و [[an IMport]] و [[to imPORT]].`,
          example: R`de-VEL-op   de-VEL-op-er   de-VEL-op-ment
com-PO-nent   pa-RA-me-ter   en-VI-ron-ment   VA-ri-a-ble
a-NA-ly-sis   A-na-lyze   tech-NO-lo-gy   DA-ta-base   AL-go-ri-thm
Noun first:  an UP-date   a RE-cord   the PRO-gress   an IM-port   an EX-port   a CON-flict
Verb second:  to up-DATE   to re-CORD   to pro-GRESS   to im-PORT   to ex-PORT   to con-FLICT
Sentence 1:  I'll up-DATE the com-PO-nent and push an UP-date to-DAY.
Sentence 2:  We need to im-PORT the RE-cords; the IM-port script is in the de-VEL-op-ment en-VI-ron-ment.`,
          try: R`اختار ٥ كلمات تقنية بتقولها كل يوم (مثلًا من اسم الـ stack بتاعك: [[component]] و [[variable]] و [[function]] و [[database]] و [[deployment]]). دوّر على كل واحدة في Cambridge Dictionary، وشوف علامة [[ˈ]] في الـ IPA بتيجي قبل أنهي مقطع. اكتبها في [[sounds.md]] بالحروف الكبيرة (زي [[com-PO-nent]])، وقولها في جملة بصوت عالي ٣ مرات.`,
          flag: "script",
          deep: {
            why: R`الـ native speakers بيتعرفوا على الكلمة من «شكل» الضغط بتاعها أكتر من الحروف. فلو قلت «DEvelopment» بالضغط الغلط، الودن بتدور على كلمة تانية. ولو قلت [[de-VEL-op-ment]] بحروف مش مظبوطة، غالبًا هتتفهم. عشان كده الضغط أهم استثمار في النطق.`,
            how: R`في القاموس: علامة [[ˈ]] (فوق) قبل المقطع المضغوط الأساسي، و [[ˌ]] (تحت) قبل ضغط أضعف. مثلًا [[/dɪˈveləp/]] = الضغط على [[vel]].

قواعد تقريبية تساعد (ليها استثناءات): الكلمات اللي آخرها [[-tion]] و [[-sion]] الضغط على المقطع اللي قبلها على طول ([[ap-pli-CA-tion]] و [[VER-sion]] و [[FUNC-tion]]). و [[-ity]] الضغط على المقطع اللي قبلها على طول برضو ([[se-CU-ri-ty]] و [[a-vai-la-BI-li-ty]]). و [[-ic]] نفس الشيء ([[dy-NA-mic]] و [[GRA-phic]] و [[au-to-MA-tic]]).

وخلي بالك: في الجملة كمان فيه ضغط: الكلمة المهمة (الجديدة أو المختلفة) بتتقال أعلى. [[I said the TEST failed, not the BUILD]].`,
            when: "كل كلمة طويلة (٣ مقاطع أو أكتر) أول مرة تستخدمها في كلام، وخصوصًا اسم الـ stack والأدوات اللي هتتكرر في الانترفيو.",
            mistakes: R`[[DEvelop]] و [[COMponent]] و [[paraMEEter]] و [[ENvironment]] و «TECHnology» كلهم غلط (الصح [[de-VEL-op]] و [[com-PO-nent]] و [[pa-RA-me-ter]] و [[en-VI-ron-ment]] و [[tech-NO-lo-gy]]). و [[aLGOrithm]] غلط، الصح [[AL-go-ri-thm]]. و [[VAriable]] هي الصح ([[VA-ri-a-ble]])، والمصري ساعات بيقول «ڤاريّا-بل» بضغط على [[RI]]. و [[an upDATE]] للاسم (الصح [[UP-date]]).`
          },
          lines: [
            R`develop وعيلتها: الضغط دايمًا على VEL. «ديڤيلَب»، «ديڤيلَپَر»، «ديڤيلَپمِنت».`,
            R`component = كُمپونِنت (PO)، و parameter = پَرامِتَر (RA)، و environment = إنڤايرِنمِنت (VI). و variable الضغط على أولها VA مش RI.`,
            R`analysis = أنالِسِس (NA)، لكن analyze = آنَلايز (A). technology = تِكنولوجي (NO). database على DA. algorithm على AL.`,
            R`الاسم ضغطه في أوله: update (تحديث)، و record (سجل)، و progress (تقدم)، و import و export، و conflict (تعارض).`,
            R`الفعل ضغطه في آخره: to update (يحدّث)، و to record (يسجّل)، و to import (يستورد)... نفس الكلمة، ضغط مختلف.`,
            R`«هحدّث الـ component وأدفع update النهارده». لاحظ up-DATE الفعل و UP-date الاسم في نفس الجملة.`,
            R`«محتاجين نستورد السجلات؛ سكربت الاستيراد في بيئة الـ development». im-PORT فعل و IM-port اسم.`
          ],
          sol: R`النتيجة المتوقعة (من Cambridge):
[[component]] /kəmˈpoʊnənt/ = [[com-PO-nent]]
[[variable]] /ˈveriəbl/ = [[VA-ri-a-ble]]
[[function]] /ˈfʌŋkʃən/ = [[FUNC-tion]]
[[database]] /ˈdeɪtəbeɪs/ = [[DA-ta-base]]
[[deployment]] /dɪˈplɔɪmənt/ = [[de-PLOY-ment]]

لاحظ إن أغلب المقاطع اللي مش مضغوطة بتبقى [[ə]] ضعيفة: [[com]] في [[component]] بتتقال «كَم» سريعة مش «كوم» واضحة. ده جزء من «شكل» الكلمة.

لو اخترت كلمات تانية، اتأكد إنك كتبت الضغط من علامة [[ˈ]] في القاموس مش من إحساسك، لأن الإحساس هو اللي عمل الغلطة من الأول.`
        }
      ]
    },
    {
      t: "كلمات تقنية بننطقها غلط",
      l: 1,
      n: "cache و queue و height، وأسماء الأدوات (Nginx و Kubernetes و Azure و Vite)، و algorithm و determine، والحروف الساكتة، والاختصارات: بتتقري حروف ولا كلمة",
      items: [
        {
          cmd: "cache و queue و suite",
          title: "cache و queue و suite و height و width و route و data: بتتقال إزاي؟",
          desc: R`دي كلمات بتتكرر كل يوم، وأغلبنا بيقولها غلط لأننا اتعلمناها من الكتابة. الأخبار الحلوة: قايمة قصيرة، ولو صلحتها هتبان فورًا.

[[cache]] = «كاش» /kæʃ/ زي [[cash]] بالظبط (مش «كاتش» ولا «كاشيه»). [[queue]] = «كيو» /kjuː/ زي حرف [[Q]] (مش «كويو»). [[suite]] (test suite) = «سويت» /swiːt/ زي [[sweet]] (مش «سوت»، دي [[suit]] البدلة). [[height]] = «هايت» /haɪt/ آخرها «ت» (مش «هايث»). [[width]] = «ويدث» /wɪdθ/ بكسرة قصيرة (مش «وايدث»). [[route]] فيها نطقين مقبولين: «روت» /ruːt/ و «راوت» /raʊt/ (الأمريكان بيقولوا [[router]] «راوتر» غالبًا). [[data]] برضو نطقين مقبولين: «ديْتا» /ˈdeɪtə/ و «داتا» /ˈdætə/ أو /ˈdɑːtə/: كلمة «داتا» المصري مقبولة.`,
          example: R`cache = كاش /kæʃ/ (= cash)          queue = كيو /kjuː/ (= Q)
suite = سويت /swiːt/ (= sweet)      suit = سوت /suːt/ (clothes, not tests)
height = هايت /haɪt/ (ends in t)    width = ويدث /wɪdθ/ (short i, then d + th)
route = روت /ruːt/ or راوت /raʊt/   router = راوتر /ˈraʊtər/ (US) or روتر (UK)
data = ديْتا /ˈdeɪtə/ or داتا /ˈdætə/ — both are fine
Sentence 1:  Clear the cache and restart the queue worker.
Sentence 2:  The test suite checks the height and width of the image.
Sentence 3:  This route returns the user data.`,
          try: R`اسمع الـ ٧ كلمات في Google ([[how to pronounce ...]]) وبعدين سجّل الجمل الـ ٣. وبعدين قول الجملة دي بسرعة ٣ مرات: [[The queue caches the route data, and the suite tests the width and height.]]`,
          flag: "script",
          deep: {
            why: R`[[cache]] و [[queue]] و [[route]] و [[data]] بتتقال في كل اجتماع تقني تقريبًا، والانترفيو فيه أسئلة كاملة عنهم («How would you cache this?»، «Why use a queue?»). لو قلت «كويو» ٥ مرات في إجابة، الإنترفيوير هيركز في النطق مش في الإجابة.`,
            how: R`[[cache]]: الحروف [[che]] في الآخر ساكتة الـ e، والـ [[ch]] هنا «ش» (جاية من الفرنساوي). ومنها [[cached]] = «كاشْت» و [[caching]] = «كاشِنگ». و [[cache-control]] = «كاش كنترول».

[[queue]]: «كيو»، والجمع [[queues]] = «كيوز»، و [[enqueue]] = «إن-كيو»، و [[dequeue]] = «دي-كيو». والطريقة السهلة تفتكرها: هي حرف [[Q]].

[[suite]] vs [[suit]]: [[test suite]] = «تست سويت». و [[suit]] البدلة (وفعل [[suits me]] = يناسبني) = «سوت». وكمان [[sweet]] = «سويت» نفس نطق [[suite]].

[[height]] vs [[weight]]: الاتنين آخرهم «ت». المصري بيقول «هايث» عشان الـ [[width]] و [[length]] آخرهم «ث». اتعلمهم كمجموعة: [[width]] ث، [[length]] ث، [[depth]] ث، [[height]] ت.`,
            when: "أي كلام عن الأداء (cache)، أو الـ background jobs (queue)، أو الاختبارات (suite)، أو CSS (height و width)، أو الـ backend (route و data).",
            mistakes: R`«كاتش» (دي [[catch]] زي try/catch، كلمة تانية خالص!). و «كاشيه» (دي كلمة فرنساوي [[cachet]] معناها حاجة تانية). و «كويو». و «سوت تيست». و «هايث» و «وايدث». وخلي بالك: [[catch]] «كاتش» و [[cache]] «كاش» الاتنين بيتقالوا في نفس الموضوع أحيانًا، فالغلط هنا بيلخبط بجد.`
          },
          lines: [
            R`cache = كاش، زي cash. و queue = كيو، زي حرف Q.`,
            R`suite = سويت زي sweet (مجموعة اختبارات). و suit = سوت (بدلة): كلمة تانية.`,
            R`height = هايت بالتاء. و width = ويدث بكسرة قصيرة وبعدها د وث.`,
            R`route نطقين مقبولين: روت أو راوت. و router بالأمريكاني راوتر.`,
            R`data: ديْتا أو داتا، الاتنين تمام.`,
            R`«امسح الـ cache وشغّل الـ queue worker تاني». worker = البرنامج اللي بيسحب من الطابور.`,
            R`«مجموعة الاختبارات بتتأكد من ارتفاع وعرض الصورة».`,
            R`«الـ route ده بيرجّع داتا اليوزر».`
          ],
          sol: R`التسجيل الصح: [[cache]] بتتسمع زي [[cash]]، و [[queue]] مقطع واحد «كيو»، و [[suite]] زي [[sweet]]، و [[height]] آخرها «ت» واضحة، و [[width]] بكسرة قصيرة.

في جملة السرعة: [[caches]] = «كاشِز» (مقطع زيادة عشان آخرها «ش»، زي درس [[-ed و -s]]). ولو لقيت نفسك بتقول «كاتشِز» يبقى لسه الكلمة متخزنة غلط: قول [[cash, cache, cash, cache]] ٥ مرات.

وفي [[route]] و [[data]]: أي نطق من الاتنين صح، بس خليك ثابت على واحد في نفس الكلام.`
        },
        {
          cmd: "Linux و SQL و Nginx",
          title: "أسماء الأدوات: Linux و SQL و GIF و Nginx و Kubernetes و Azure و Vue و Angular و Vite",
          desc: R`أسماء الأدوات ليها نطق «رسمي» من أصحابها، وأحيانًا نطقين الاتنين مقبولين. القاعدة: لو فيه خلاف مشهور (SQL و GIF)، الاتنين تمام. لو مفيش خلاف (Nginx و Azure و Vite)، فيه نطق صح واحد وغالبًا المصري بيقول غيره.

القايمة الأهم: [[Linux]] = «لينِكس» /ˈlɪnəks/ بكسرة قصيرة (مش «لاينكس»). [[SQL]] = «إس كيو إل» أو «سيكوِل» /ˈsiːkwəl/ (الاتنين صح). [[GIF]] = «گِف» أو «جِف» (صاحبها قال «جِف» والأغلبية بتقول «گِف»). [[Nginx]] = «إنجن إكس» [[engine-x]] (مش «إنجينكس»). [[Kubernetes]] = «كوبَر-نيتيز» /ˌkuːbərˈnetiːz/ والضغط على [[NE]]، واختصارها [[K8s]] = «كيْتس» أو «كيه إيتس». [[Azure]] = «آژَر» /ˈæʒər/ (مش «أزور»). [[Vue]] = «ڤيو» زي [[view]]. [[Angular]] = «آنگيولَر» /ˈæŋɡjələr/. [[Vite]] = «ڤيت» /viːt/ (كلمة فرنساوي معناها سريع، مش «ڤايت»).`,
          example: R`Linux = لينِكس /ˈlɪnəks/        Ubuntu = أوبونتو /ʊˈbʊntuː/      Debian = ديبيان
SQL = S-Q-L or "sequel"         MySQL = my-S-Q-L               PostgreSQL = Postgres (بوستگرِس) or Postgres-Q-L
GIF = گِف /ɡɪf/ or جِف /dʒɪf/    JSON = جيْسِن /ˈdʒeɪsən/          YAML = يامِل /ˈjæməl/
Nginx = engine-x (إنجن إكس)     Apache = أپاتشي /əˈpætʃi/        Redis = ريدِس /ˈredɪs/
Kubernetes = كوبَر-NE-تيز       K8s = "kates" or "K-eights"   Azure = آژَر /ˈæʒər/
Vue = ڤيو (= view)              Angular = آنگيولَر               Vite = ڤيت /viːt/ (= veet)
Git = گِت (hard g)               GitHub = گِت هَب                 Django = جانگو (silent D)
Sentence:  We deploy the Vue app with Vite, behind Nginx, on an Ubuntu server in Azure.`,
          try: R`اكتب اسم الـ stack بتاعك كله في جملة واحدة (زي آخر سطر في المثال): اللغة، والـ framework، والداتابيز، والسيرفر، والـ cloud. دوّر على نطق كل اسم في YouGlish (ويفضّل من talk لأصحاب الأداة)، وسجّل الجملة. دي الجملة اللي هتقولها في «Tell me about yourself» فلازم تبقى مظبوطة.`,
          flag: "script",
          deep: {
            why: R`اسم الـ stack هو أول حاجة بتقولها في أي انترفيو وأي تعريف بنفسك. ولو قلت «إنجينكس» و «أزور» في أول ٢٠ ثانية، الإنترفيوير هيعرف إنك اتعلمت من القراية بس. ولو قلتهم صح، ده بيدّي انطباع إنك «من جوه» المجتمع ده وبتسمع talks.`,
            how: R`[[Linux]]: Linus Torvalds نفسه قال «لينُكس» في تسجيل مشهور. النطق «لينِكس» أو «لينُكس» الاتنين تمام، الغلط هو «لاينكس».

[[SQL]]: الاستاندرد الرسمي بيقول «إس كيو إل»، وناس كتير بتقول «سيكوِل» (من اسم قديم للغة). و [[MySQL]] أصحابها بيقولوا «ماي إس كيو إل». و [[PostgreSQL]] أغلب الناس بتقول «Postgres» وخلاص.

[[Nginx]]: الموقع الرسمي بيكتب النطق [[engine-x]]. [[Vite]]: الـ docs بتقول النطق [[/vit/]] زي [[veet]]. [[Azure]]: Microsoft بتقولها «آژَر» والضغط على أولها. [[Django]]: الـ D ساكتة (زي فيلم Django Unchained). [[Git]] و [[GitHub]]: گ صلبة زي «جمل» بالمصري، مش ج.

ولو مش متأكد من اسم أداة في اجتماع: قول الاسم زي ما تعرف واكمل، أو اسأل [[How do you pronounce it?]]: محدش هيستغرب.`,
            when: "أي تعريف بنفسك أو بالمشروع، وأي كلام عن الـ infrastructure. جهّز جملة الـ stack بتاعك قبل أي انترفيو.",
            mistakes: R`«لاينكس»، و «إنجينكس»، و «أزور»، و «ڤو» أو «ڤوي» ([[Vue]])، و «أنجولار»، و «ڤايت»، و «دجانجو» بالـ D، و «جيت هاب» بالجيم الفصحى، و «جيسون» بفتحة طويلة (الصح «جيْسِن» والآخر ضعيف). و «كوبرنيتس» بالضغط على الأول (الصح [[ku-ber-NE-tes]]).`
          },
          lines: [
            R`Linux لينِكس (مش لاينكس)، و Ubuntu أوبونتو، و Debian ديبيان.`,
            R`SQL نطقين مقبولين. MySQL بالحروف. PostgreSQL الناس بتقول Postgres.`,
            R`GIF نطقين مقبولين. JSON جيْسِن. YAML يامِل.`,
            R`Nginx = engine-x. و Apache أپاتشي. و Redis ريدِس.`,
            R`Kubernetes الضغط على NE. واختصارها K8s. و Azure آژَر.`,
            R`Vue زي view. Angular آنگيولَر. Vite زي veet (فرنساوي = سريع).`,
            R`Git و GitHub بـ g صلبة. Django الـ D ساكتة.`,
            R`«بننزّل تطبيق Vue بـ Vite، ورا Nginx، على سيرفر Ubuntu في Azure». behind = ورا (reverse proxy).`
          ],
          sol: R`مثال لجملة stack صح:
[[I build full-stack apps with TypeScript, React and Next.js, with PostgreSQL and Prisma, and I deploy them with Docker and Nginx on a Linux VPS.]]

النطق المتوقع: [[TypeScript]] «تايپ-سكريپت» (p واضحة، ومن غير «إ» قبل script)، و [[Next.js]] «نِكست جيه إس»، و [[PostgreSQL]] «پوستگرِس»، و [[Prisma]] «پريزما»، و [[Docker]] «دوكَر»، و [[Nginx]] «إنجن إكس»، و [[Linux]] «لينِكس»، و [[VPS]] «ڤي پي إس».

لو اسم في الـ stack بتاعك مش موجود هنا، دوّر عليه في YouGlish. ولو ملقتش مقطع، ابحث في YouTube عن talk بعنوان الأداة واسمع أول دقيقة: المتكلم غالبًا بيقول الاسم في أول جملة.`
        },
        {
          cmd: "algorithm و determine",
          title: "algorithm و variable و asynchronous و determine و develop: الكلمات الطويلة",
          desc: R`الكلمات الطويلة اللي أصلها لاتيني أو يوناني بتقع فيها غلطتين: الضغط في مكان غلط، ونطق حرف بالطريقة «العربي» أو «الإنجليزي الكتابي».

[[algorithm]] = «آلگوريذَم» /ˈælɡərɪðəm/: الضغط على [[AL]]، والـ [[th]] = ذ (مش «ز» ولا «ث»)، والآخر [[-rithm]] مقطع ضعيف. [[variable]] = «ڤيريَبل» /ˈveriəbl/: الضغط على أولها، وأصلها [[vary]]. [[asynchronous]] = «إيْسِنكرِنَس» /eɪˈsɪŋkrənəs/: الضغط على [[SYN]]، وأولها «إيْ» مش «أ». [[async]] = «إيْسِنك». [[determine]] = «ديتِرمِن» /dɪˈtɜːrmɪn/: الآخر «مِن» قصيرة، مش «ماين» (الغلطة دي منتشرة جدًا). [[develop]] = «ديڤيلَب» /dɪˈveləp/: الضغط على [[VEL]].

ومعاهم: [[architecture]] «آركِتِكتشَر» (ch = k)، و [[authentication]] «أوثِنتِكيشَن» (ث + ضغط على [[CA]])، و [[synchronous]] «سِنكرِنَس»، و [[iterate]] «إتَريْت» (الضغط على [[IT]])، و [[integer]] «إنتِجَر» (ج مش گ)، و [[boolean]] «بوليَن»، و [[null]] «نَل».`,
          example: R`algorithm = آلگوريذَم  /ˈælɡərɪðəm/   AL-go-ri-thm (th = ذ)
variable = ڤيريَبل  /ˈveriəbl/   VA-ri-a-ble (from "vary")
asynchronous = إيْسِنكرِنَس  /eɪˈsɪŋkrənəs/   a-SYN-chro-nous;   async = إيْسِنك
determine = ديتِرمِن  /dɪˈtɜːrmɪn/   de-TER-mine (not "mine")
develop = ديڤيلَب  /dɪˈveləp/   de-VEL-op;   developer = ديڤيلَپَر
integer = إنتِجَر (soft g)   boolean = بوليَن   null = نَل   iterate = إتَريْت
authentication = أوثِنتِكيشَن   au-then-ti-CA-tion
Sentence:  The algorithm determines which variable the async function should update.`,
          try: R`اكتب إجابة من ٣ جمل للسؤال ده بالإنجليزي: [[What's the difference between synchronous and asynchronous code?]]، ولازم تستخدم فيها ٤ كلمات على الأقل من القايمة. سجّلها واسمعها وانت بتقرا الـ IPA: الضغط في المكان الصح؟ و [[determine]] طالعة «مِن» ولا «ماين»؟`,
          flag: "script",
          deep: {
            why: R`الكلمات دي هي لغة الانترفيو التقني نفسها. سؤال زي «Explain async/await» أو «What algorithm would you use?» هيخليك تقول الكلمة ١٠ مرات. والنطق الغلط المتكرر بيشتت اللي قدامك.`,
            how: R`[[determine]] الغلطة جاية من إن [[mine]] لوحدها «ماين». بس لما تيجي في آخر كلمة طويلة من غير ضغط بتبقى «مِن»: [[determine]] و [[examine]] «إگزامِن» و [[famine]]. استثناء مهم: [[undermine]] «أندَرماين»، و [[combine]] «كمباين». فاحفظ [[determine]] و [[examine]] كاستثناء.

[[algorithm]]: قولها ٣ حتت: [[AL]] + [[go]] + [[rithm]]، والتالتة فيها «ذ» صغيرة وبعدين «م». ومنها [[algorithmic]] «آلگوريذمِك» الضغط اتنقل لـ [[RITH]].

[[asynchronous]]: الـ [[a-]] هنا «إيْ» (زي الحرف A)، وكذلك في [[async]] و [[await]] = «أويْت» (هنا «أ» ضعيفة). وأشهر نطق للـ [[async]] بين المبرمجين «إيْ-سِنك». [[sync]] = «سِنك» زي [[sink]].

وخلي بالك إن [[integer]] الجيم فيها ج «dʒ» مش گ.`,
            when: "أي إجابة تقنية في الانترفيو، وأي شرح لكود.",
            mistakes: R`«ديترماين» (أشهرهم). و «ألجوريزم» (ز بدل ذ، وضغط غلط). و «ڤاريّابل». و «أسينكرونوس» بنطق كل حرف. و «ديفيلوب» بضغط على الأول. و «إنتيگر» بالـ g الصلبة. و «بولين» بالضغط على الآخر. و «نول» (الصح «نَل»).`
          },
          lines: [
            R`algorithm: الضغط على AL، والـ th ذ.`,
            R`variable: الضغط على أولها، وهي من vary (يتغير).`,
            R`asynchronous: الضغط على SYN، وأولها «إيْ». و async «إيْسِنك».`,
            R`determine: الآخر «مِن» قصيرة. من أشهر الغلطات: «ديترماين».`,
            R`develop وdeveloper: الضغط على VEL.`,
            R`integer بجيم ناعمة، و boolean بوليَن، و null نَل، و iterate الضغط على IT.`,
            R`authentication: ث في النص، والضغط على CA.`,
            R`«الـ algorithm بيحدد أنهي متغير الدالة الـ async المفروض تحدّثه».`
          ],
          sol: R`إجابة نموذجية (٣ جمل):
[[Synchronous code runs one line at a time, and each line waits for the previous one. Asynchronous code starts a task, like a network request, and continues without waiting; the result comes back later through a callback or a promise. So async code keeps the app responsive while the slow work happens in the background.]]

الكلمات من القايمة: [[synchronous]]، و [[asynchronous]]، و [[async]]... ولو ضفت [[determine]] أو [[algorithm]] أحسن.

في التسجيل: [[synchronous]] = «سِنكرِنَس» الضغط على [[SYN]]، و [[asynchronous]] نفس الضغط. ولو سمعت نفسك بتقول «سينكرونوس» بكل الحروف واضحة، ده الغلط: المقاطع الأخيرة ضعيفة [[ə]]. والإجابة الضعيفة: جملة واحدة «async is not sync» من غير مثال.`
        },
        {
          cmd: "حروف ساكتة",
          title: "schema و architecture و pseudo و debt و facade: حروف مكتوبة ومش بتتقال",
          desc: R`الإنجليزي مليان حروف مكتوبة ومش بتتنطق، أو حروف بتتنطق بصوت مش صوتها. وكتير من الكلمات التقنية جاية من اليوناني أو الفرنساوي فيها ده.

[[ch]] = [[k]] في الكلمات اليوناني: [[schema]] «سكيما»، و [[architecture]] «آركِتِكتشَر»، و [[archive]] «آركايڤ»، و [[mechanism]] «ميكَنِزم»، و [[technical]] «تِكنِكَل»، و [[character]] «كارِكتَر» (و [[char]] بيتقال «تشار» أو «كار» أو «كير»: الكل مقبول). و [[hierarchy]] «هايرَركي».

حروف ساكتة: [[pseudo]] (pseudo-code) = «سودو» الـ p ساكتة. [[debt]] (technical debt) = «دِت» الـ b ساكتة. [[subtle]] (bug صعب يتلاحظ) = «سَتِل» الـ b ساكتة. [[Wednesday]] = «وِنزدي». [[often]] «أوفِن» (الـ t غالبًا ساكتة). [[listen]] «لِسِن». [[design]] «ديزاين» الـ g ساكتة. [[sign]] و [[align]] «ألاين».

فرنساوي: [[facade]] (Facade pattern) = «فَساد» /fəˈsɑːd/. [[resume]] كفعل (يكمّل) = «ريزيوم»، واسم (CV) [[résumé]] = «ريزيوميْ». [[suite]] من الدرس اللي فات. و [[genre]] «ژونرا».`,
          example: R`ch = k:  schema (سكيما)  architecture (آركِتِكتشَر)  archive (آركايڤ)  mechanism  technical  character
Silent p/b/g/t:  pseudo (سودو)  debt (دِت)  subtle (سَتِل)  design (ديزاين)  align (ألاين)  often (أوفِن)
Fewer syllables:  Wednesday (وِنزدي)  comfortable (كَمفتَبل)  interesting (إنترِستِنگ)  different (دِفرَنت)
French:  facade (فَساد)  resume v. (ريزيوم) vs résumé n. (ريزيوميْ)
Two ways:  live demo = لايڤ /laɪv/ (adjective)   I live in Cairo = لِڤ /lɪv/ (verb)
Two ways:  I read docs daily = ريد   I read it yesterday = رِد
Sentence 1:  The database schema is part of the architecture docs, not the archive.
Sentence 2:  This subtle bug is technical debt from the pseudo-code we never cleaned up.`,
          try: R`اكتب ٥ كلمات تقنية من شغلك انت ممكن يكون فيها حرف ساكت (ابحث في Cambridge عن النطق). وبعدين سجّل الجملتين الأخيرتين من المثال وجملة من عندك فيها [[live]] بالمعنيين.`,
          flag: "script",
          deep: {
            why: R`[[schema]] و [[architecture]] و [[technical debt]] بتتقال في كل كلام عن الـ backend والتصميم. ولو قلت «شيما» أو «أرشيتكتشر» أو «ديبت»، ده بيبان جدًا لأنها كلمات «senior». وكلمة [[live]] بالذات: [[live demo]] و [[live coding]] و [[go live]] كلها «لايڤ»، والمصري بيقولها «لِڤ» ساعات.`,
            how: R`القاعدة التقريبية لـ [[ch]]: لو الكلمة يوناني الأصل (علمية أو تقنية، وفيها [[chr]] أو [[sch]] أو [[arch]] قبل حرف متحرك) غالبًا [[k]]: [[chrome]] «كروم»، و [[synchronous]] «سِنكرِنَس»، و [[chronological]]. لكن [[arch]] لوحدها (قوس) «آرتش»، و [[chart]] «تشارت»، و [[cache]] «كاش»: مفيش قاعدة بتشتغل ١٠٠٪، عشان كده اسمع.

[[resume]]: فعل = «ريزيوم» ([[resume the upload]] = كمّل الرفع). اسم = CV، بالأمريكاني [[résumé]] أو [[resume]] «ريزيوميْ». وفي الانترفيو: [[Can you walk me through your résumé?]].

[[live]]: صفة (مباشر، شغال على الإنتاج) = «لايڤ»: [[live site]] و [[go live]] و [[livestream]]. فعل (يعيش) = «لِڤ».

[[read]]: مضارع «ريد»، وماضي «رِد» (زي [[red]]). وفي الـ standup: [[I read the docs yesterday]] = «رِد».`,
            when: "كلام عن تصميم النظام (schema, architecture, hierarchy)، والـ code quality (technical debt, subtle bug)، والـ demos (live).",
            mistakes: R`«شيما» أو «سكِما». و «أرشيتكتشر» (بالشين). و «پسودو كود» بالـ p. و «دِبت». و «سَبتِل». و «ويدنسداي». و «فاكيد» ([[facade]]). و «لِڤ ديمو» بدل «لايڤ ديمو». و «ريد» في الماضي.`
          },
          lines: [
            R`ch بتتنطق k في الكلمات اليوناني: schema، و architecture، و archive، و mechanism، و technical، و character.`,
            R`حروف ساكتة: p في pseudo، و b في debt و subtle، و g في design و align، و t في often غالبًا.`,
            R`كلمات مقاطعها أقل من كتابتها: Wednesday وِنزدي، و comfortable ٣ مقاطع، و interesting ٣، و different ٢ أو ٣.`,
            R`فرنساوي: facade فَساد. و resume فعل «يكمّل» غير résumé اسم «CV».`,
            R`live صفة (مباشر) = لايڤ. live فعل (يعيش) = لِڤ.`,
            R`read مضارع = ريد. read ماضي = رِد (زي red).`,
            R`«الـ schema بتاع الداتابيز جزء من docs الـ architecture، مش الأرشيف».`,
            R`«الـ bug الخفي ده technical debt من الـ pseudo-code اللي عمرنا ما نضّفناه». clean up = ننضّف.`
          ],
          sol: R`أمثلة لكلمات ممكن تكون لقيتها: [[Kotlin]] (عادية)، [[Chromium]] «كروميَم» (ch = k)، [[psql]] «پي إس كيو إل» (الـ p هنا بتتنطق لأنها حرف لوحده!)، [[campaign]] «كامپيْن» (g ساكتة)، [[receipt]] «ريسيت» (p ساكتة)، [[island]] «آيلَند»، [[yacht]] مش تقنية بس مشهورة.

والجملة بـ [[live]]: [[I'll do a live demo on Thursday.]] (لايڤ) و [[I live in Alexandria.]] (لِڤ). ولو في جملة واحدة: [[The app went live while I was living in Cairo.]]

التسجيل الصح للجملتين: [[schema]] بـ «سك»، و [[architecture]] بـ «آرك»، و [[subtle]] من غير b، و [[debt]] «دِت»، و [[pseudo]] من غير p.`
        },
        {
          cmd: "API و JSON",
          title: "الاختصارات: API بالحروف، و JSON كلمة، و SaaS كلمة، و SQL الاتنين",
          desc: R`الاختصارات نوعين: اختصار بيتقري حروف (initialism) زي [[API]] = «إيْ پي آي»، واختصار بيتقري كلمة (acronym) زي [[JSON]] = «جيْسِن». ومفيش قاعدة من الكتابة تقولك أنهي نوع، فلازم تسمع. والغلطة الكلاسيكية إنك تقرا حروف لحاجة بتتقال كلمة ([[S-A-A-S]] بدل «ساس») أو العكس.

وأسماء الحروف نفسها في الإنجليزي بتختلف عن اللي اتعلمناه ساعات: [[A]] «إيْ»، و [[E]] «إي»، و [[I]] «آي»، و [[G]] «جي» (ج ناعمة)، و [[J]] «جيْ»، و [[H]] «إيْتش»، و [[R]] «آر»، و [[Q]] «كيو»، و [[W]] «دابِليو»، و [[Y]] «واي»، و [[Z]] «زي» بالأمريكاني و «زِد» بالبريطاني. وأشهر لخبطة عند المصريين: [[G]] و [[J]]، و [[E]] و [[I]] (زي في [[CI]] «سي آي» و [[CLI]] «سي إل آي»).`,
          example: R`Letters:  API (إيْ پي آي)  URL (يو آر إل)  CLI (سي إل آي)  CI/CD (سي آي سي دي)  npm (إن پي إم)
Letters:  HTML  CSS  HTTP  SSH  DNS  VPS  UI  UX  JWT (or "jot")  UUID (يو يو آي دي)  AWS  GCP
Words:  JSON (جيْسِن)  YAML (يامِل)  SaaS (ساس)  GUI (گوي)  ASCII (آسكي)  CRUD (كرَد)  OAuth (أو-أوث)
Words:  RAM (رام)  NAT (نات)  CORS (كورز)  REST (رِست)  WASM (وازِم)  SPA (إس پي إيْ, or سپا)
Both OK:  SQL (S-Q-L / sequel)   GIF (گِف / جِف)   char (تشار / كار)   IDE (letters)
Letter names:  G = جي   J = جيْ   E = إي   I = آي   H = إيْتش   W = دابِليو   Z = زي (US) / زِد (UK)
Sentence:  The CLI calls the REST API, gets JSON back, and the CI checks the YAML.`,
          try: R`اكتب ١٠ اختصارات بتستخدمها في شغلك أو مذاكرتك، وجنب كل واحد: حروف ولا كلمة، ونطقه. اتأكد من ٣ منهم على الأقل في YouGlish. وبعدين قول بصوت عالي أسماء الحروف دي بالترتيب: [[G J E I H W Y Q]].`,
          flag: "script",
          deep: {
            why: R`الكلام التقني نصه اختصارات. ولو قلت «سي إي آي» بدل «سي آي» أو «جي دبليو تي» بلخبطة الـ G والـ J، ده بيوقف الكلام. والإملا بالحروف كمان مهم: هتحتاج تتهجى اسم متغير أو URL أو كود في مكالمة.`,
            how: R`أسهل طريقة تعرف: لو الاختصار ممكن يتقري بسهولة كمقطع (فيه حرف متحرك في مكان مناسب) غالبًا كلمة ([[JSON]] و [[CRUD]] و [[CORS]] و [[REST]]). لو كله حروف ساكنة (HTTP و SSH و DNS) أو صعب يتقري، حروف. بس فيه استثناءات: [[SQL]] و [[URL]] (ناس قليلة بتقول «إيرل»)، و [[API]] دايمًا حروف.

التهجّي في مكالمة: الحروف اللي بتتلخبط في النت ([[B]] و [[D]] و [[P]] و [[T]] و [[M]] و [[N]]) قول معاها كلمة: [[B as in Bravo]]، [[M as in Mike]]، [[N as in November]]. أو [[B for Bob]]. وفي الـ URLs: [[dot]] للنقطة، و [[slash]] للـ /، و [[dash]] أو [[hyphen]] للـ -، و [[underscore]] للـ _، و [[all lowercase]] = كله صغير.

و [[npm]] رسميًا بالحروف الصغيرة وبتتقال حروف. و [[JWT]] المعيار نفسه (RFC 7519) بيقول النطق المقترح «jot»، بس «جيْ دابِليو تي» أشهر في الكلام.`,
            when: "أي كلام تقني، وأي مكالمة فيها تهجّي اسم أو URL أو كود أو إيميل.",
            mistakes: R`«سي إي آي» بدل [[CI]]. و «جي» للـ [[J]] (الصح «جيْ»). و «إس إيه إيه إس» بدل «ساس». و «جيسون» بفتحة. و «ديبي» بدل [[DB]] «دي بي». و «كروود» ([[CRUD]] = «كرَد»). و «يو آر إل» صح، بس «أورل» غلط. وتهجّي [[B]] و [[P]] من غير كلمة مساعدة في مكالمة وحشة.`
          },
          lines: [
            R`اختصارات بتتقري حروف: API، و URL، و CLI، و CI/CD، و npm (بالحروف الصغيرة).`,
            R`حروف كمان: HTML و CSS و HTTP و SSH و DNS و VPS و UI و UX و JWT و UUID و AWS و GCP.`,
            R`اختصارات بتتقري كلمة: JSON جيْسِن، و YAML يامِل، و SaaS ساس، و GUI گوي، و ASCII آسكي، و CRUD كرَد، و OAuth أو-أوث.`,
            R`كلمات كمان: RAM و NAT و CORS كورز و REST رِست و WASM وازِم. SPA الاتنين.`,
            R`فيها نطقين مقبولين: SQL و GIF و char. و IDE حروف.`,
            R`أسماء الحروف اللي بتتلخبط: G جي، و J جيْ، و E إي، و I آي، و H إيْتش، و W دابِليو، و Z زي أو زِد.`,
            R`«الـ CLI بينادي الـ REST API، وبيرجعله JSON، والـ CI بيفحص الـ YAML».`
          ],
          sol: R`مثال لقايمة صح: [[HTTP]] حروف، [[HTTPS]] حروف، [[SSL]] حروف، [[TLS]] حروف، [[PR]] حروف «پي آر»، [[CORS]] كلمة «كورز»، [[ORM]] حروف «أو آر إم»، [[SEO]] حروف «إس إي أو»، [[NoSQL]] «نو سيكوِل» أو «نو إس كيو إل»، [[PWA]] حروف.

أسماء الحروف بالترتيب: [[G]] «جي»، [[J]] «جيْ»، [[E]] «إي»، [[I]] «آي»، [[H]] «إيْتش»، [[W]] «دابِليو»، [[Y]] «واي»، [[Q]] «كيو».

لو لقيت نفسك بتقول [[H]] «هيتش»: ده نطق موجود في بعض لهجات إنجلترا وأيرلندا، بس «إيْتش» أشهر وأأمن. ولو قلت [[Z]] «زِد»، ده بريطاني صح؛ مع فريق أمريكي هيفهموك عادي.`
        }
      ]
    },
    {
      t: "أرقام وتواريخ وإصدارات ورموز بصوت عالي",
      l: 1,
      n: "تقرا v2.10.3 و localhost:5173 و 404، و 3:30 PM والتواريخ وفرق التوقيت، و 1.5k و 99.9% و fifteen مش fifty، ورموز الكود زي { } و => و ||",
      items: [
        {
          cmd: "v2.10.3",
          title: "تقرا v2.10.3 و Node 22 و port 5173 و 127.0.0.1 و 404 إزاي؟",
          desc: R`الأرقام التقنية ليها طريقة قراية خاصة، ومختلفة عن الأرقام العادية. أهم قاعدة: رقم الإصدار (version) بيتقري كل جزء لوحده كرقم كامل، والنقطة [[point]] أو [[dot]]: [[v2.10.3]] = [[version two point ten point three]] (مش «two point one zero»، ومش «two point thirteen»). لأن [[10]] هنا رقم عشرة، مش كسر عشري. والـ [[v]] بتتقري [[version]] أو [[v]] «ڤي».

والـ status codes بتتقري ٣ أرقام: [[404]] = [[four oh four]]، و [[500]] = [[five hundred]]، و [[201]] = [[two oh one]]، و [[429]] = [[four twenty-nine]]. والـ ports: [[3000]] = [[three thousand]]، و [[8080]] = [[eighty eighty]]، و [[5173]] = [[fifty-one seventy-three]]، و [[5432]] = [[fifty-four thirty-two]]. والـ IPs بتتقري أرقام ونقط: [[127.0.0.1]] = [[one two seven dot zero dot zero dot one]] (أو [[one twenty-seven...]]) وكتير بيقولوا [[localhost]] وخلاص.

والـ [[0]] في الكلام التقني بتتقال [[oh]] «أو» أو [[zero]]: الاتنين تمام، و [[oh]] أسرع في وسط الأرقام.`,
          example: R`v2.10.3  →  version two point ten point three
Node 22 / React 19 / Python 3.13  →  Node twenty-two / React nineteen / Python three point thirteen
ES2015 / HTTP/2 / IPv6  →  E S twenty fifteen / H T T P two / I P v six
404 / 500 / 201 / 429  →  four oh four / five hundred / two oh one / four twenty-nine
localhost:3000 / :8080 / :5173 / :5432  →  localhost three thousand / eighty eighty / fifty-one seventy-three / fifty-four thirty-two
127.0.0.1  →  one two seven dot zero dot zero dot one (or just "localhost")
PR 231 / issue 1045  →  PR two thirty-one / issue ten forty-five
commit a3f9c2  →  a three f nine c two
Sentence:  After we upgraded to v2.10.3, the API started returning 429 on port 8080.`,
          try: R`اقرا بصوت عالي وسجّل: [[Next.js 15.5.2]]، و [[Node 22.11.0]]، و [[TypeScript 5.9]]، و [[503]]، و [[302]]، و [[localhost:4200]]، و [[192.168.1.10]]، و [[PR 1204]]. وبعدين قول جملة عن مشروعك فيها version و port و status code.`,
          flag: "script",
          deep: {
            why: R`في الـ debugging مع زميل وفي الـ incident calls، الأرقام دي هي نص الكلام: «we're on version...»، «it returns 502»، «the app runs on port...». ولو قريتها غلط ([[two point one zero]]) ممكن حد ينزّل إصدار غلط أو يدوّر في مكان غلط.`,
            how: R`الإصدارات: كل جزء رقم كامل. [[1.0]] = [[one point oh]]، و [[3.12]] = [[three point twelve]]، و [[0.9.1]] = [[zero point nine point one]] (أو [[oh point nine point one]]). وفي الكلام العادي بتتقال مختصرة: [[We're on Node 22]]، و [[the 3.x branch]] = [[three point X]]، و [[a major version]] = إصدار كبير (أول رقم)، و [[a patch]] = آخر رقم.

الأرقام الطويلة (ports و PR numbers): بتتقري أزواج: [[1045]] = [[ten forty-five]]، و [[2026]] = [[twenty twenty-six]]. لو فيه [[0]] في النص: [[3005]] = [[thirty oh five]] أو [[three thousand five]].

الـ hashes والأكواد: حرف حرف ورقم رقم، وبتقول أول ٤–٧ بس ([[commit a3f9c2]]). والإيميلات: [[at]] للـ @، و [[dot]] للنقطة.

و [[HTTP/2]] = [[H T T P two]]، و [[HTTP 1.1]] = [[H T T P one point one]]، و [[IPv4]] = [[I P v four]].`,
            when: "أي كلام عن إصدارات (upgrade, bump)، أو incident، أو تشغيل مشروع لزميل («open localhost...»)، أو تقرا error بصوت عالي.",
            mistakes: R`[[two point one zero]] لـ [[2.10]]. و [[four hundred four]] لـ [[404]] (مفهومة بس غريبة). و [[localhost three zero zero zero]] (مفهومة بس بطيئة). و [[two thousand and fifteen]] لـ [[ES2015]] (الأشهر [[twenty fifteen]]). وتقرا hash بالكامل ٤٠ حرف: ٦–٧ كفاية.`
          },
          lines: [
            R`الإصدار: كل جزء رقم كامل. ten مش one zero.`,
            R`أسماء أدوات + إصدار: Node twenty-two، React nineteen، Python three point thirteen.`,
            R`معايير: ES twenty fifteen، و HTTP two، و IP v six.`,
            R`status codes: 404 «فور أو فور»، و 500 «فايڤ هاندرِد»، و 201 «تو أو وان»، و 429 «فور توِنتي ناين».`,
            R`الـ ports: ٣٠٠٠ «ثري ثاوزِند»، و ٨٠٨٠ «إيتي إيتي»، و ٥١٧٣ «فِفتي وان سِڤِنتي ثري»، و ٥٤٣٢ (Postgres).`,
            R`الـ IP: أرقام ونقط، أو قول localhost لو هو ده.`,
            R`أرقام الـ PRs والـ issues: أزواج: two thirty-one، و ten forty-five.`,
            R`الـ commit hash: حرف حرف، وأول ٦ كفاية.`,
            R`«بعد ما عملنا upgrade لـ v2.10.3، الـ API بدأ يرجّع 429 على port 8080». 429 = Too Many Requests.`
          ],
          sol: R`القراية الصح:
[[Next.js 15.5.2]] = [[Next J S fifteen point five point two]]
[[Node 22.11.0]] = [[Node twenty-two point eleven point oh]] (أو [[point zero]])
[[TypeScript 5.9]] = [[TypeScript five point nine]]
[[503]] = [[five oh three]]، و [[302]] = [[three oh two]]
[[localhost:4200]] = [[localhost forty-two hundred]] (ده الـ port بتاع Angular)
[[192.168.1.10]] = [[one ninety-two dot one sixty-eight dot one dot ten]]
[[PR 1204]] = [[PR twelve oh four]]

جملة من عندك، مثلًا: [[My app runs on Next.js fifteen on port three thousand, and the health check returns two hundred.]] لو قلت [[eleven]] في Node كـ [[one one]]، رجّع للقاعدة: كل جزء رقم كامل.`
        },
        {
          cmd: "3:30 PM",
          title: "3:30 PM و March 5th و «بتوقيتك ولا بتوقيتي»: المواعيد بالإنجليزي",
          desc: R`المواعيد بتتقال بطريقتين: الأرقام ([[three thirty]]) وده الأسهل والأشهر في الشغل، أو الطريقة التقليدية ([[half past three]]). استخدم الأرقام، وافهم التقليدية لما تسمعها.

[[3:30 PM]] = [[three thirty P M]]. و [[10:05]] = [[ten oh five]]. و [[9:00]] = [[nine]] أو [[nine o'clock]] أو [[nine A M]]. و [[12:00 PM]] = [[noon]] و [[12:00 AM]] = [[midnight]] (قولهم بالكلمة لأن AM و PM مع ١٢ بيلخبطوا الناس). و [[quarter past three]] = ٣:١٥، و [[quarter to four]] = ٣:٤٥، و [[half past three]] = ٣:٣٠.

حروف الجر: [[at 3 PM]] (ساعة)، و [[on Monday]] و [[on March 5th]] (يوم)، و [[in March]] و [[in 2026]] (شهر وسنة)، و [[by Thursday]] = قبل أو يوم الخميس (deadline)، و [[until Thursday]] = لحد الخميس (مدة). والتواريخ: [[March 5th]] بتتقري [[March fifth]]، أو [[the fifth of March]]. وفي الكتابة بالأرقام [[3/5]] في أمريكا = ٥ مارس، وفي أغلب العالم = ٣ مايو: عشان كده قول اسم الشهر.

وفرق التوقيت أهم حاجة في الشغل مع برا: قول دايمًا [[your time]] و [[my time]]، أو الـ time zone بالاسم.`,
          example: R`3:30 PM  →  three thirty P M  (or: half past three)
10:05  →  ten oh five          9:00  →  nine / nine o'clock / nine A M
12:00 PM  →  noon              12:00 AM  →  midnight
3:15  →  three fifteen / quarter past three     3:45  →  three forty-five / quarter to four
at 3 PM  |  on Monday  |  on March 5th  |  in March  |  in 2026  |  by Thursday  |  until Thursday
March 5th  →  March fifth / the fifth of March     2026  →  twenty twenty-six
Does 4 PM your time work? That's 5 PM for me in Cairo.
Can we push the call by 30 minutes?   I'll have it done by end of day, EOD.
The deadline is Q3, so by the end of September.`,
          try: R`اكتب وقول بصوت عالي ٣ رسايل: (١) تقترح ميعاد مكالمة مع زميل في برلين (قول الوقت بتوقيته وتوقيتك). (٢) تطلب تأجيل مكالمة نص ساعة. (٣) تقول إن التاسك هيخلص يوم الخميس ١٢ مارس قبل الساعة ٢ الضهر. قبلها ابحث في Google عن [[Cairo time to Berlin time]] عشان تعرف الفرق النهارده.`,
          flag: "script",
          deep: {
            why: R`في الشغل remote، الغلط في الميعاد معناه إنك تفوّت اجتماع أو تسلّم متأخر. و [[3/5]] و [[12 PM]] و «الساعة ٤» من غير time zone من أشهر أسباب اللخبطة، حتى بين الـ native speakers.`,
            how: R`اقترح ميعاد بالشكل ده: [[How about Tuesday at 4 PM your time, 5 PM Cairo time?]] أو [[Does 10 AM CET work for you?]]. وأدوات زي Google Calendar بتحوّل التوقيت لوحدها لما تبعت invite: ابعت invite مش بس رسالة.

وخلي بالك إن مصر رجّعت التوقيت الصيفي (DST) من ٢٠٢٣، وأوروبا وأمريكا بيغيّروا في تواريخ مختلفة عن بعض، فالفرق بيتغير كام أسبوع في السنة. عشان كده اتأكد من الفرق قبل الميعاد مش من الذاكرة (Google: [[Cairo time to London time]]).

عبارات تغيير المواعيد: [[push the call by 30 minutes]] = أجّل نص ساعة، و [[move the meeting to Thursday]] = انقل، و [[reschedule]] = حدد ميعاد تاني، و [[bring it forward]] = قدّمه، و [[I'm running 5 minutes late]] = هتأخر ٥ دقايق. واختصارات: [[EOD]] = آخر اليوم، و [[EOW]] = آخر الأسبوع، و [[ASAP]] = في أسرع وقت (بتتقري حروف أو «إيْساپ»)، و [[Q3]] = الربع التالت من السنة (يوليو–سبتمبر).`,
            when: "أي تحديد ميعاد أو deadline، وخصوصًا مع ناس في بلد تاني.",
            mistakes: R`[[in Monday]] (الصح [[on]]). و [[at the morning]] (الصح [[in the morning]]). و [[until Thursday]] بمعنى deadline (الصح [[by Thursday]]). و «the meeting is at 4» من غير time zone لحد في بلد تاني. و [[12 PM]] وانت قصدك نص الليل. و [[3/5]] مكتوبة لحد أمريكي وانت قصدك ٣ مايو. و [[postpone the meeting to 3]] (المفهوم أكتر [[move the meeting to 3]]).`
          },
          lines: [
            R`٣:٣٠ العصر: بالأرقام «ثري ثِرتي پي إم» أو التقليدي «هاف پاست ثري».`,
            R`١٠:٠٥ «تِن أو فايڤ». و ٩:٠٠ ليها ٣ طرق.`,
            R`١٢ الضهر = noon، و ١٢ بالليل = midnight: قولهم بالكلمة.`,
            R`quarter past = وربع، و quarter to = إلا ربع.`,
            R`حروف الجر: at للساعة، و on لليوم والتاريخ، و in للشهر والسنة، و by للـ deadline، و until لحد (مدة).`,
            R`التاريخ: March fifth أو the fifth of March. والسنة أزواج.`,
            R`«٤ العصر بتوقيتك ينفع؟ دي ٥ عندي في القاهرة».`,
            R`«ممكن نأجّل المكالمة نص ساعة؟» و «هخلّصها قبل آخر اليوم».`,
            R`«الـ deadline في الربع التالت، يعني قبل آخر سبتمبر».`
          ],
          sol: R`نماذج صح (الفرق بين القاهرة وبرلين ساعة غالبًا، بس اتأكد النهارده):
(١) [[Hi Lena, how about Wednesday at 2 PM your time, 3 PM Cairo time? I'll send an invite.]]
(٢) [[Sorry, something came up. Can we push our call by 30 minutes, to 3:30?]]
(٣) [[I'll have the task done by Thursday, March 12th, before 2 PM.]] وبتتقري: [[Thursday, March twelfth, before two P M]].

راجع: [[on Wednesday]] مش [[in]]، و [[by Thursday]] للـ deadline، و [[twelfth]] (مش [[twelveth]]: الـ v بتبقى f). والإجابة الضعيفة: [[The meeting is at 3]] من غير يوم ولا time zone.`
        },
        {
          cmd: "1.5k و 99.9%",
          title: "fifteen ولا fifty؟ و 1.5k و 99.9% و 250ms و 10x: الأرقام في الكلام",
          desc: R`أخطر لخبطة أرقام في الكلام: [[fifteen]] (١٥) و [[fifty]] (٥٠)، و [[thirteen]] و [[thirty]]، و [[fourteen]] و [[forty]]... الفرق في الضغط: [[fif-TEEN]] الضغط على الآخر والـ [[n]] واضحة، و [[FIF-ty]] الضغط على الأول. في مكالمة بنت وحشة ممكن ١٥ ثانية تتسمع ٥٠. ولو الرقم مهم، أكّده: [[fifteen, one five]].

الكسور العشرية بـ [[point]]: [[1.5]] = [[one point five]]، و [[0.5]] = [[zero point five]] أو [[point five]] أو [[half]]. والإنجليزي بيستخدم النقطة للعشري والفاصلة للآلاف: [[1,250]] = ألف ومتين وخمسين، مش واحد وربع.

الاختصارات: [[1.5k]] = [[one point five K]] أو [[fifteen hundred]]، و [[2M]] = [[two million]] (مش [[two millions]]: [[hundred]] و [[thousand]] و [[million]] مفرد بعد رقم)، و [[99.9%]] = [[ninety-nine point nine percent]] (والمبرمجين بيقولوا [[three nines]] للـ uptime)، و [[250ms]] = [[two hundred fifty milliseconds]]، و [[2.5 GB]] = [[two point five gigs]] أو [[gigabytes]]، و [[10x]] = [[ten X]] أو [[ten times]].`,
          example: R`15 vs 50:  fif-TEEN vs FIF-ty     13 vs 30:  thir-TEEN vs THIR-ty     Confirm:  fifteen, one-five
1.5 → one point five     0.5 → point five / half     1,250 → one thousand two hundred fifty / twelve fifty
1.5k users → one point five K users / fifteen hundred users     2M → two million (not millions)
99.9% → ninety-nine point nine percent / three nines     0.1% → zero point one percent
250ms → two hundred fifty milliseconds     2.5 GB → two point five gigs     10x → ten X / ten times
O(n²) → O of n squared     O(n log n) → O of n log n     2^10 → two to the tenth
25,000 EGP → twenty-five thousand Egyptian pounds (25K)     $1,200 → twelve hundred dollars
1/3 → a third     3/4 → three quarters     -5 → minus five / negative five
Sentence:  We cut the response time from 800 milliseconds to 250, and errors dropped to 0.1%.`,
          try: R`اكتب ٣ «إنجازات بأرقام» من مشروع ليك (حقيقية أو تقريبية تعرف قستها إزاي)، زي: عدد يوزرز، ووقت تحميل قبل وبعد، ونسبة. قولهم بصوت عالي وسجّل، وبعدين قول [[15, 50, 13, 30, 14, 40]] ورا بعض وانت مركز في الضغط.`,
          flag: "script",
          deep: {
            why: R`في الانترفيو، الأرقام هي اللي بتخلي قصتك مقنعة («reduced load time from 4 to 1.5 seconds»). ولو قلتها غلط أو مش واضحة، الإنترفيوير هيسأل تاني أو هيفهم رقم تاني. وفي الشغل، [[fifteen]] و [[fifty]] ممكن تبقى فرق بين timeout معقول وكارثة.`,
            how: R`[[-teen]] vs [[-ty]]: في [[-teen]] طوّل الـ [[ee]] واضغط عليها، وقول الـ [[n]] واضحة: «فِف-تيين». في [[-ty]] الضغط على الأول والآخر قصير: «فِف-تي» (والأمريكان بيقولوا الـ t قريبة من «د»: «فِفدي»).

[[percent]] مفرد دايمًا: [[fifty percent]] مش [[percents]]. و [[a hundred users]] أو [[one hundred users]]. و [[hundreds of users]] (مئات) من غير رقم قبلها بس.

المقارنة: [[from X to Y]] = من كذا لكذا، و [[by 40%]] = بنسبة ٤٠٪ ([[reduced by 40%]])، و [[twice as fast]] = أسرع مرتين، و [[half the time]] = نص الوقت، و [[about]] و [[roughly]] و [[around]] = تقريبًا (استخدمهم لو الرقم تقريبي، دي أمانة مش ضعف).

الـ Big O: [[O(n)]] = [[O of n]] أو [[linear]]، و [[O(1)]] = [[O of one]] أو [[constant time]]، و [[O(n²)]] = [[O of n squared]] أو [[quadratic]]، و [[O(log n)]] = [[O of log n]].`,
            when: "إنجازاتك في الـ CV والانترفيو، والكلام عن الأداء والـ monitoring، والأسعار والمرتبات.",
            mistakes: R`[[fifteen]] بضغط على الأول فتتسمع [[fifty]]. و [[two millions users]]. و [[fifty percents]]. و [[one comma five]] لـ ١٫٥ (العربي والأوروبي بيستخدموا الفاصلة للعشري، الإنجليزي لأ). و [[the performance increased 50%]] من غير [[by]] (مفهومة بس الأوضح [[improved by 50%]]).`
          },
          lines: [
            R`١٥ و ٥٠: الفرق في الضغط. teen الضغط على الآخر، و ty على الأول. ولو مهم أكّد برقم رقم.`,
            R`العشري بـ point. والفاصلة للآلاف: ١٬٢٥٠ = ألف ومتين وخمسين.`,
            R`1.5k = one point five K. و million مفرد بعد رقم.`,
            R`النسب: percent مفرد دايمًا. three nines = 99.9% uptime.`,
            R`الوقت والمساحة والمضاعفات: milliseconds، و gigs، و ten X.`,
            R`الـ Big O: O of n squared، و O of n log n. والأُس: to the tenth.`,
            R`الفلوس: twenty-five thousand Egyptian pounds، و twelve hundred dollars.`,
            R`الكسور والسالب: a third، و three quarters، و minus أو negative.`,
            R`«قلّلنا وقت الرد من ٨٠٠ مللي ثانية لـ ٢٥٠، والأخطاء نزلت لـ ٠٫١٪». cut = قلّل، dropped = نزل.`
          ],
          sol: R`نماذج لـ ٣ إنجازات:
[[The app has about fifteen hundred active users a month.]]
[[I reduced the page load time from four seconds to one point five.]]
[[After I added the index, the query went from two seconds to about thirty milliseconds, roughly sixty times faster.]]

راجع: [[about]] أو [[roughly]] لو الرقم تقريبي، و [[from ... to ...]] للمقارنة، و [[percent]] مفرد. وفي التسجيل: [[fifteen hundred]] الـ [[n]] في [[teen]] واضحة، و [[thirty]] الضغط على [[THIR]]، و [[sixty]] على [[SIX]].

الإجابة الضعيفة: [[I made it faster]] من غير أرقام، أو رقم مش عارف جبته منين: هيتسأل «How did you measure that?» والإجابة الصح عليه: [[I used Lighthouse / the Network tab / the logs]].`
        },
        {
          cmd: "رموز الكود",
          title: "تقرا سطر كود بصوت عالي: { } و ( ) و => و === و || و _ في pair programming",
          desc: R`في الـ pair programming والـ live coding وانت بتملي كود على حد أو بتشرح، محتاج تقول الرموز بأساميها. ومعظمنا عارف الرمز بس مش عارف اسمه بالإنجليزي، فبنقول «القوس اللي كده» ونشاور.

الأقواس: [[( )]] = [[parentheses]] أو [[parens]] (أو [[brackets]] بالبريطاني)، و [ ] = [[square brackets]]، و [[{ }]] = [[curly braces]] أو [[curly brackets]]، و [[< >]] = [[angle brackets]] (وفي المقارنة [[less than]] و [[greater than]]). وتقول [[open paren]] و [[close paren]] لما تملي.

علامات: [[;]] = [[semicolon]]، و [[:]] = [[colon]]، و [[.]] = [[dot]]، و [[,]] = [[comma]]، و [[!]] = [[bang]] أو [[exclamation mark]] أو [[not]]، و [[=]] = [[equals]]، و [[===]] = [[triple equals]]، و [[!==]] = [[not equal]] أو [[bang double equals]]، و [[=>]] = [[arrow]] أو [[fat arrow]]، و [[&&]] = [[and]]، و [[||]] = [[or]] أو [[double pipe]]، و [[?.]] = [[optional chaining]]، و [[??]] = [[nullish coalescing]] أو [[double question mark]]، و [[...]] = [[spread]] أو [[dot dot dot]].

ورموز الكيبورد: [[_]] = [[underscore]]، و [[-]] = [[dash]] أو [[hyphen]] أو [[minus]]، و [[/]] = [[slash]]، و [[\]] = [[backslash]]، و [[|]] = [[pipe]]، و [[*]] = [[star]] أو [[asterisk]]، و [[#]] = [[hash]] (والأمريكان [[pound]])، و [[@]] = [[at]]، و [[~]] = [[tilde]]، و [[^]] = [[caret]]، و [[&]] = [[ampersand]]، و [[%]] = [[percent]] أو [[mod]]، و [[$__bt]] = [[backtick]].`,
          example: R`( ) parens     [ ] square brackets     { } curly braces     < > angle brackets
;  semicolon    :  colon    ,  comma    .  dot    !  bang / not    ?  question mark
=  equals    ===  triple equals    !==  not equal    =>  arrow    &&  and    ||  or
?.  optional chaining    ??  nullish coalescing    ...  spread    $__bt  backtick
_  underscore    -  dash    /  slash    \  backslash    |  pipe    *  star    #  hash    @  at    ~  tilde
camelCase    PascalCase    snake_case    kebab-case    UPPER_CASE    all lowercase
Code:  const total = items.reduce((sum, i) => sum + i.price, 0);
Say it:  const total equals items dot reduce, open paren, sum comma i, arrow, sum plus i dot price, comma zero, close paren, semicolon.
Short:  "On line twelve, change the triple equals to not equal, and wrap it in curly braces."`,
          try: R`خد ٣ سطور من كود كتبته انت (فيهم أقواس وarrow function وشرط)، واقرا كل سطر بصوت عالي بالطريقة الطويلة (زي [[Say it]]). وبعدين اعمل «إملاء»: قول سطر لصاحب (أو سجّله وافتح ملف فاضي واكتب من التسجيل) وشوف هل الكود اللي اتكتب مطابق.`,
          flag: "script",
          deep: {
            why: R`في الـ live coding الإنترفيوير ساعات بيقول «you're missing a closing brace» أو «change the double equals to triple equals». ولو مش عارف الأسماء هتدوّر وتضيّع وقت. وفي الـ pair programming انت اللي هتقول «put a semicolon after the paren».`,
            how: R`في الكلام العادي محدش بيقرا كل رمز. بتقول المعنى: [[if user is not null]] بدل [[if open paren user bang equals null close paren]]. الرموز بالأسماء بتحتاجها لما تشاور على حاجة معينة: [[You're missing a closing curly brace on line 20]]، أو [[Add a question mark before the dot]].

أسماء الـ casing مهمة جدًا في الـ code review والكلام: [[camelCase]] (userName)، و [[PascalCase]] (UserName)، و [[snake_case]] (user_name)، و [[kebab-case]] (user-name)، و [[SCREAMING_SNAKE_CASE]] أو [[UPPER_CASE]] للـ constants.

لما تتهجى اسم متغير: [[user underscore id, all lowercase]] أو [[userId, camelCase, capital I]]. و [[capital]] أو [[uppercase]] = حرف كبير، و [[lowercase]] = صغير.

والـ [[#]]: البريطانيين [[hash]]، والأمريكان [[pound sign]] أو [[number sign]]، وفي السوشيال [[hashtag]]. في الكود [[hash]] مفهومة للكل.`,
            when: "pair programming، و live coding في انترفيو، و code review بالصوت، ولما حد بيملّيك أمر أو URL.",
            mistakes: R`«قوس» لكل الأنواع ([[bracket]] مش واضحة لوحدها: قول [[curly]] أو [[square]]). و [[comma]] و [[colon]] بيتلخبطوا. و [[slash]] و [[backslash]] بيتلخبطوا (في مسارات Windows ده بيفرق). و [[dash]] و [[underscore]]. و «إكسكلاميشن» بدل [[bang]] أو [[not]] في وسط الكود (مش غلط، بس طويلة).`
          },
          lines: [
            R`الأقواس الـ ٤: parens (عادية)، و square brackets (مربعة)، و curly braces (معقوفة)، و angle brackets (زاوية).`,
            R`علامات الترقيم: semicolon ; و colon : و comma , و dot . و bang ! و question mark ?.`,
            R`المقارنة والمنطق: equals، و triple equals، و not equal، و arrow، و and، و or.`,
            R`حديثة في JS: optional chaining و nullish coalescing و spread و backtick (template string).`,
            R`رموز الكيبورد: underscore و dash و slash و backslash و pipe و star و hash و at و tilde.`,
            R`أسماء طرق كتابة الأسماء: camelCase و PascalCase و snake_case و kebab-case و UPPER_CASE.`,
            R`سطر كود: جمع أسعار العناصر بـ reduce.`,
            R`نفس السطر مقروء رمز رمز: بتحتاج ده في الإملاء بس.`,
            R`الطريقة العملية: «في سطر ١٢ غيّر الـ triple equals لـ not equal، وحطها جوه curly braces». wrap = تلف.`
          ],
          sol: R`مثال: السطر [[if (!user?.email) return res.status(400).json({ error: "Email is required" });]]

الطريقة الطويلة: [[if, open paren, bang user, question mark dot email, close paren, return res dot status, open paren, four hundred, close paren, dot json, open paren, open curly brace, error colon, double quote, Email is required, double quote, close curly brace, close paren, semicolon.]]

الطريقة الطبيعية في pair programming: [[If the user or their email is missing, return a four hundred with an error message.]]

في تمرين الإملاء: الغلطات الشائعة إن [[?.]] تطلع [[.]] بس (عشان اتقالت سريعة)، أو [[curly]] تتكتب [[(]]. لو الكود اللي اتكتب طلع مطابق من أول مرة، ممتاز. ولو لأ، الغلط غالبًا في الأقواس: قول نوعها دايمًا.`
        }
      ]
    },
    {
      t: "الـ standup والكلام اليومي",
      l: 1,
      n: "الـ standup بصوتك (١٠ أمثلة)، وتطلب مساعدة وتفهم بـ «Could you walk me through» و «Just to confirm»، وتقول مش فاهم بأدب، والـ small talk في أول الاجتماع",
      items: [
        {
          cmd: "standup بالكلام",
          title: "الـ standup بصوتك: ١٠ updates جاهزة (yesterday / today / blockers)",
          desc: R`الـ standup المكتوب شرحناه في درس [[status update]] في «تاب إنجليزي للمبرمج: قراية وكتابة». هنا الكلام: انت في مكالمة، الدور جالك، وعندك ٣٠–٦٠ ثانية.

الفرق بين المكتوب والمتكلم: ١) جمل أقصر. ٢) contractions: [[I'm]] و [[I'll]] و [[I've]] و [[didn't]] بدل [[I am]] و [[I will]] (الكلام من غير contractions بيبان آلي). ٣) كلمات ربط بدل العناوين: [[So yesterday...]] و [[Today I'm going to...]] و [[And no blockers.]] ٤) ممكن تبدأ بـ [[Hi everyone]] أو على طول.

ونصيحة للي إنجليزيته ضعيفة: اكتب الـ ٣ سطور قبل الاجتماع بـ ٥ دقايق، واقراهم مرة بصوت واطي. مش هتقراهم في الاجتماع كلمة بكلمة، بس هيبقوا في دماغك.`,
          example: R`1. So yesterday I finished the signup form. Today I'm adding validation. No blockers.
2. Yesterday I was stuck on a CORS error most of the day. I fixed it this morning. Today I'll open the PR.
3. I reviewed Omar's PR and left a few comments. Today I'm back on the search page.
4. Yesterday I paired with Sara on the payment webhook. Today I'll write the tests for it.
5. I'm still working on the dashboard. It's taking longer than I expected, probably until Thursday.
6. Today I'm going to investigate the slow orders page. I think it's a missing index.
7. I'm blocked on the staging database: I don't have access yet. Omar, could you help me after the call?
8. Quick one from me: I merged the cart PR. Today I'm starting on checkout. That's it.
9. I don't have much to share. I spent yesterday reading the auth code, so I'm ready to start on the refresh token today.
10. Nothing blocking, but I'd like 10 minutes with someone who knows the email service. Can we sync after standup?`,
          try: R`حضّر standup حقيقي عن امبارح والنهارده (شغل أو مذاكرة)، واكتبه في ٣ سطور. وبعدين سجّله بصوتك من غير ما تبص على الورقة، وخلّيه أقل من ٤٥ ثانية. كرر كل يوم لمدة أسبوع، وفي كل يوم استخدم جملة جديدة من الـ ١٠.`,
          flag: "script",
          deep: {
            why: R`الـ standup هو أكتر موقف كلام بيتكرر في شغلك: كل يوم. ولو اتعلمت تقوله بثقة في ٣٠ ثانية، ده بيبني ثقتك في الكلام في باقي الاجتماعات. وهو كمان المكان اللي المدير بيعرف منه إنك شغال ومتعلّق ولا لأ.`,
            how: R`الشكل الثابت: [[Yesterday I...]] (ماضي) + [[Today I'm going to / I'll...]] (مستقبل) + [[No blockers]] أو [[I'm blocked on...]].

للتأخير من غير ما تبان مقصر: [[It's taking longer than I expected]]، و [[I underestimated it]]، و [[I should be done by...]]. وقول السبب في جملة لو فيه ([[the API docs were wrong]]).

للـ blockers: وجّهه لشخص واطلب حاجة محددة: [[Omar, could you give me access after the call?]]. و [[Can we sync after standup?]] أو [[Can we take this offline?]] = نتكلم فيها بعد الاجتماع (عشان متطوّلش على الكل).

ولو مش عندك حاجة كبيرة: [[Not much to report]] أو [[Quick one from me]] وبعدين جملة. ده عادي، متخترعش.

والصوت: اتكلم أبطأ من طبيعتك شوية. الناس اللي بتتوتر بتسرّع، والسرعة بتبوّظ النطق.`,
            when: "كل يوم في الـ daily، وفي أي «round the table» في اجتماع («let's go around and give a quick update»).",
            mistakes: R`تحكي تفاصيل تقنية ٣ دقايق (الـ standup مش مكان حل مشاكل: [[let's take this offline]]). و [[Yesterday I am working]] (الصح [[I worked]] أو [[I was working]]). و [[I will finish it today inshallah]] كل يوم وهي مبتخلصش (قول الحقيقة بدري). و «no blockers» وانت متعلّق فعلًا. وتقرا من ورقة بصوت رتيب.`
          },
          lines: [
            R`الشكل الأساسي: خلصت الفورم، النهارده validation، مفيش blockers.`,
            R`«كنت متعلق في CORS أغلب اليوم، صلحته الصبح، هفتح الـ PR النهارده». stuck on = متعلق في.`,
            R`«راجعت PR عمر وسبت كام تعليق، والنهارده راجع لصفحة البحث». back on = راجع لـ.`,
            R`«اشتغلت مع سارة على الـ webhook، والنهارده هكتب الاختبارات». paired with = اشتغلت جنب.`,
            R`تأخير بصراحة: «لسه شغال على الـ dashboard، واخد وقت أكتر من المتوقع، غالبًا لحد الخميس».`,
            R`«النهارده هبحث في بطء صفحة الأوردرات، أظن ناقص index». investigate = أبحث في.`,
            R`blocker بطلب محدد لشخص: «متعلّق في داتابيز الـ staging، معنديش access. عمر، ممكن تساعدني بعد المكالمة؟»`,
            R`update قصير: «حاجة سريعة: عملت merge للـ cart، وبادئ في الـ checkout. بس كده».`,
            R`يوم مفيهوش إنجاز كبير: «مفيش كتير، قريت كود الـ auth امبارح، فجاهز أبدأ الـ refresh token».`,
            R`«مفيش حاجة موقفاني، بس عايز ١٠ دقايق مع حد فاهم خدمة الإيميل. نتكلم بعد الـ standup؟» sync = نتكلم ونتفق.`
          ],
          sol: R`نموذج لـ standup متسجّل (حوالي ٢٥ ثانية):
[[Hi everyone. So yesterday I finished the product filters and opened a PR. Today I'm going to fix the review comments and start on pagination. And no blockers.]]

راجع التسجيل على ٤ حاجات: ١) أقل من ٤٥ ثانية. ٢) الماضي في yesterday ([[finished]] و [[opened]] بنطق [[-ed]] الصح من درس «-ed و -s»). ٣) contractions ([[I'm]] مش [[I am]]). ٤) مفيش سكوت طويل في النص.

علامة التحسن بعد أسبوع: بتقول الجمل من غير ما تفكر في الترتيب، وبتبدأ تغيّر فيها (مش نفس الجملة كل يوم). والتسجيل الضعيف: بتقرا من الورقة بنبرة واحدة، أو فيه [[ehh... ehh]] بين كل جملة.`
        },
        {
          cmd: "Could you walk me through",
          title: "تطلب شرح وتتأكد إنك فهمت: «Could you walk me through...» و «Just to confirm...»",
          desc: R`لما حد يشرحلك حاجة في مكالمة (تاسك جديدة، أو كود، أو bug)، عندك مهمتين: تطلب الشرح بطريقة محترمة، وتتأكد إنك فهمت صح قبل ما تقفل. والمهمة التانية أهم: أغلب المشاكل في الشغل مع فريق من برا مش إن حد مفهمش، إن حد فاكر إنه فهم.

لطلب الشرح: [[Could you walk me through...]] = ممكن تمشّيني في... خطوة خطوة (الجملة الذهبية). و [[Could you show me where...]] و [[How does X work?]] و [[What's the best way to...?]] و [[Could you give me an example?]].

للتأكد: [[Just to confirm, ...]] أو [[Just to make sure I understood: ...]] وبعدين تقول اللي فهمته بكلامك. أو [[So what you're saying is ...]] و [[So the next step is ... right?]]. والـ [[right?]] أو [[correct?]] في الآخر بتحول الجملة لسؤال بسهولة من غير ما تغيّر ترتيبها.

والتفاصيل المكتوبة (إزاي تكتب رسالة طلب مساعدة) في درس [[تطلب مساعدة]] في «تاب إنجليزي للمبرمج: قراية وكتابة»، وإمتى تسأل أصلًا في درس [[تسأل صح]] في «تاب الشغل والكارير».`,
          example: R`Could you walk me through how the deployment works?
Could you show me where the payment logic lives?
I'm not familiar with this part of the codebase. Where should I start?
Could you give me an example of a request that fails?
Just to confirm: I should branch off develop, not main, right?
Just to make sure I understood: the bug only happens for users with two accounts?
So what you're saying is the cache is fine, and the problem is the query?
So the next step is for me to write a test that reproduces it. Correct?
Sorry, one more question before we hang up: who should review the PR?`,
          try: R`اطلب من صاحب (أو من AI بالصوت) يشرحلك حاجة في ٢ دقيقة بالإنجليزي: مثلًا إزاي الـ git rebase بيشتغل. وخلال الشرح استخدم على الأقل: جملة [[Could you walk me through]]، وجملة [[Just to confirm]]، وفي الآخر لخّص اللي فهمته في جملتين بـ [[So ...]]. لو مفيش حد، سجّل نفسك وانت بتسأل ٣ أسئلة وبتلخّص فيديو قصير اتفرجت عليه.`,
          flag: "script",
          deep: {
            why: R`الـ junior اللي بيسأل كويس بيتعلم أسرع، واللي بيأكّد فهمه بيغلط أقل. والجملتين دول ([[walk me through]] و [[just to confirm]]) بيدّوا انطباع إنك منظم ومحترم لوقت اللي قدامك، حتى لو إنجليزيتك بسيطة.`,
            how: R`الأسئلة المهذبة في الإنجليزي بتبدأ بـ [[Could you ...]] أو [[Would you mind ...ing]] ([[Would you mind showing me...]]). و [[Can you]] مقبولة مع الزملاء. أما [[Explain me]] فغلط (الصح [[Explain it to me]] أو [[Walk me through it]]).

التأكيد بكلامك (paraphrase) أقوى من [[Yes, I understand]]: لأنه بيدّي فرصة للي قدامك يصحّحك. واختصره: [[So basically, X, right?]].

ولو الشرح سريع جدًا: [[Could you slow down a bit? I want to make sure I get this.]] (ودا مش ضعف، ده حرص).

ولو عايز تتعلم لوحدك الأول: [[Is there any documentation I can read first?]] أو [[I'll look into it and come back to you if I'm stuck.]]

وقبل ما تقفل: [[Is there anything else I should know?]] = سؤال بيطلّع معلومات محدش كان هيقولها.`,
            when: "أول يوم في تاسك جديدة، و onboarding، و pair programming، وأي مكالمة فيها تعليمات.",
            mistakes: R`[[Yes yes, I understand]] وانت مفهمتش (أغلى غلطة). و [[Explain me]]. و [[Can you repeat everything?]] (حدد الجزء: [[Could you repeat the part about the migration?]]). و [[What you mean?]] (الصح [[What do you mean?]]). وإنك متلخّصش في الآخر وتكتشف بعد يومين إنك فاهم غلط.`
          },
          lines: [
            R`«ممكن تمشّيني في طريقة الـ deployment؟» walk me through = اشرحلي خطوة خطوة.`,
            R`«ممكن توريني الـ payment logic فين؟» lives = موجود (تعبير شائع عن الكود).`,
            R`«مش متعود على الجزء ده من الكود. أبدأ منين؟» not familiar with = مش عارفه كويس.`,
            R`«ممكن مثال لـ request بيفشل؟»`,
            R`«بس أتأكد: أعمل branch من develop مش main، صح؟»`,
            R`«عشان أتأكد إني فهمت: الـ bug بيحصل بس لليوزرز اللي عندهم حسابين؟»`,
            R`«يعني قصدك إن الـ cache تمام، والمشكلة في الـ query؟»`,
            R`«يعني الخطوة الجاية إني أكتب test يطلّع المشكلة. صح؟» reproduce = يكرر حدوث المشكلة.`,
            R`«آسف، سؤال أخير قبل ما نقفل: مين هيراجع الـ PR؟» hang up = نقفل المكالمة.`
          ],
          sol: R`مثال لمحادثة كويسة عن [[git rebase]]:
[[Could you walk me through what rebase actually does?]] ... [[Just to confirm: it takes my commits and puts them on top of the latest main, right?]] ... [[And that's why the commit hashes change?]] ... [[So basically, rebase rewrites my branch history to make it linear, and I shouldn't do it on a branch other people are using. Is that correct?]]

علامات النجاح: التلخيص بكلامك مش تكرار جمل اللي شرح، وفيه [[right?]] أو [[correct?]] في الآخر، وسألت عن حاجة محددة مش [[repeat everything]].

الإجابة الضعيفة: ساكت طول الشرح وفي الآخر [[OK, thank you]]. ولو صاحبك سألك سؤال في الآخر ومعرفتش ترد، يبقى التأكيد مكانش كفاية.`
        },
        {
          cmd: "مش فاهم بأدب",
          title: "تقول «مفهمتش» بأدب من غير ما تتكسف: Sorry, I didn't catch that",
          desc: R`هتحصل كتير: حد بيتكلم بسرعة، أو بلكنة مش متعود عليها (هندي، أو اسكتلندي، أو أمريكي من الجنوب)، أو النت وحش، أو كلمة مش عارفها. والحل مش إنك تهز راسك: الحل ٣ جمل جاهزة حسب السبب.

١) مسمعتش (صوت أو سرعة): [[Sorry, I didn't catch that.]] أو [[Sorry, could you say that again?]] أو [[You cut out for a second.]] (النت).
٢) سمعت بس مش فاهم كلمة: [[Sorry, what does X mean?]] أو [[I'm not familiar with that term.]]
٣) فاهم الكلام بس مش فاهم الفكرة: [[I'm not sure I follow.]] أو [[Could you explain that in a different way?]] أو [[Could you give me an example?]]

والحيلة: كرر آخر جزء فهمته عشان هو يكمّل من عنده: [[Sorry, you said the job runs every night, and then...?]]`,
          example: R`Sorry, I didn't catch that. Could you say it again?
Sorry, you cut out for a second. Could you repeat the last part?
Could you say that a bit more slowly? I want to make sure I get it right.
Sorry, what does "idempotent" mean in this context?
I'm not familiar with that tool. Is it something we use internally?
I'm not sure I follow. Could you give me an example?
Sorry, you said the job runs every night, and then what happens?
Let me repeat it back to make sure: we retry three times, then we alert. Right?
Would you mind typing that in the chat? I want to get the name right.`,
          try: R`شغّل فيديو تقني سريع على YouTube (مثلًا من Fireship) من غير subtitles. كل ما تفوّتك جملة، وقّف الفيديو وقول بصوت عالي الجملة المناسبة من الـ ٣ أنواع، كأنك في مكالمة. وبعدين اكتب ٣ جمل من الـ ٩ في [[phrases.md]] واحفظهم.`,
          flag: "script",
          deep: {
            why: R`أكبر خطر مش إنك متفهمش، إنك تتظاهر إنك فهمت. هتقول [[yes]] وتروح تعمل حاجة غلط يومين. والـ native speakers نفسهم بيقولوا [[Sorry, I didn't catch that]] كل يوم. ولو طلبت يعيد، ده بيبان «حريص»، مش «ضعيف».`,
            how: R`اسم الحاجة اللي مسمعتهاش: [[Could you repeat the part about the database?]] أحسن من [[Repeat please]].

[[Would you mind typing that in the chat?]] جملة ذهبية لأسماء الأدوات والـ URLs والأرقام والأسماء الأجنبية: محدش بيتضايق منها، وبتديك نسخة مكتوبة ترجعلها.

اللكنات: الإنجليزي في الشغل بيتقال بلكنات كتير جدًا (هندي، وأوروبي، وأفريقي، وأمريكي، وبريطاني). ودنك هتتعود على لكنة الفريق بتاعك بعد أسبوعين تلاتة. والحل طويل المدى: اسمع talks بلكنات مختلفة (درس «listening بالمستوى»).

ولو الموضوع اتكرر مع نفس الشخص: متقولش [[your accent is hard]]، قول [[Sorry, my connection isn't great today; could you speak a bit more slowly?]] أو ببساطة [[I'm still getting used to the terms; could you slow down a little?]]`,
            when: "أي مكالمة، وخصوصًا أول أسابيع في فريق جديد، أو مع عميل أول مرة.",
            mistakes: R`[[Yes]] على سؤال مفهمتوش (وممكن يكون السؤال «is it OK if we cancel your task?»). و [[What?]] لوحدها (ناشفة، قول [[Sorry?]] أو [[Pardon?]]). و [[Repeat]] بصيغة الأمر. و [[I didn't understood]] (الصح [[I didn't understand]]). وإنك تعتذر عن إنجليزيتك في كل مرة: [[Sorry, my English is bad]] مرة واحدة ولا حاجة.`
          },
          lines: [
            R`«آسف، ملحقتش. ممكن تقولها تاني؟» catch = ألقط الكلام.`,
            R`«آسف، صوتك قطع ثانية. ممكن تعيد آخر جزء؟» cut out = الصوت قطع.`,
            R`«ممكن أبطأ شوية؟ عايز أتأكد إني فهمت صح».`,
            R`«آسف، idempotent معناها إيه في السياق ده؟»`,
            R`«مش عارف الأداة دي. هي حاجة داخلية عندنا؟» internally = جوه الشركة.`,
            R`«مش متأكد إني ماشي معاك. ممكن مثال؟» follow = أتابع الفكرة.`,
            R`كرر آخر جزء فهمته: «قلت الـ job بيشتغل كل ليلة، وبعدين إيه اللي بيحصل؟»`,
            R`«خليني أعيدها عشان أتأكد: بنعيد ٣ مرات، وبعدين نبعت alert. صح؟»`,
            R`«ممكن تكتبها في الشات؟ عايز الاسم يبقى صح».`
          ],
          sol: R`المتوقع: في فيديو Fireship (سريع جدًا) هيفوتك جمل كتير، ودا طبيعي. الجمل اللي المفروض استخدمتها أكتر: [[Sorry, I didn't catch that]] (للسرعة)، و [[What does X mean?]] (للكلمات الجديدة).

الـ ٣ جمل اللي تحفظهم لو هتحفظ ٣ بس:
[[Sorry, I didn't catch that. Could you say it again?]]
[[I'm not sure I follow. Could you give me an example?]]
[[Would you mind typing that in the chat?]]

لو لقيت إنك فهمت الفيديو كله تقريبًا، جرّب فيديو بلكنة مختلفة (مثلًا talk من مؤتمر في الهند أو اسكتلندا) أو podcast من غير فيديو، لأن الشفايف بتساعد في الفهم أكتر ما تتخيل.`
        },
        {
          cmd: "small talk",
          title: "أول ٢ دقيقة في الاجتماع: small talk بجمل بسيطة (How's it going?)",
          desc: R`أغلب الاجتماعات مع فرق من برا بتبدأ بدقيقة أو اتنين كلام خفيف لحد ما الكل يدخل: [[How's it going?]] و [[How was your weekend?]]. والمصري بيتوتر في الحتة دي أكتر من الكلام التقني، لأن مفيش سكريبت. الحل: سكريبت صغير.

الأسئلة اللي هتتسأل تقريبًا دايمًا: [[How are you?]] / [[How's it going?]] (بترد [[Good, thanks! How about you?]] مش شرح لحالتك الصحية)، و [[How was your weekend?]] (جملة عن حاجة عملتها + سؤال راجع)، و [[What's the weather like there?]] (الناس بتحب تسأل عن مصر)، و [[Any plans for the weekend?]].

القاعدة الذهبية: رد قصير + حاجة صغيرة عنك + سؤال راجع. [[Pretty good, thanks. It's been a busy week. How about you?]]. كده انت شاركت ورجعت الكرة.`,
          example: R`A: Hey, how's it going?
B: Good, thanks! A bit busy, but good. How about you?
A: How was your weekend?
B: Nice and quiet. I went to the beach in Alexandria with my family. How was yours?
A: What's the weather like in Cairo right now?
B: Still hot, around 33 degrees. I'm jealous of your autumn!
A: Any plans for the holiday?
B: Not really, just resting. Maybe I'll finally finish a side project.
B: Oh, I think everyone's here. Should we get started?`,
          try: R`اكتب ردك الحقيقي على الـ ٤ أسئلة (How's it going، و How was your weekend، و weather، و plans)، كل رد جملتين بالكتير وفي آخره سؤال راجع. سجّلهم. وحضّر كمان جملة واحدة عن حاجة في مصر ممكن تحكيها لو حد سأل (أكلة، أو مكان، أو مناسبة جاية).`,
          flag: "script",
          deep: {
            why: R`الـ small talk بيبني علاقة مع الفريق، وده مهم جدًا في الشغل remote لأنه البديل عن الكلام في المطبخ. واللي بيرد بـ [[fine]] وبس ويسكت بيبان بارد، حتى لو هو بس متوتر. وجملتين جاهزين بيحلّوا المشكلة.`,
            how: R`الردود على [[How are you?]]: [[Good, thanks]]، و [[Pretty good]]، و [[Not bad]]، و [[Can't complain]]، و [[A bit tired, but good]]. وبعدها دايمًا [[How about you?]] أو [[And you?]].

المواضيع الآمنة: الويك إند، والجو، والأجازات، والأكل، والرياضة (لو بتتابع)، والسفر، ومشاريع جانبية، وحاجات تقنية جديدة ([[Did you see the new release of X?]]). المواضيع اللي تبعد عنها في الشغل: السياسة، والدين، والفلوس، والشكوى من الشركة أو زميل.

الويك إند في مصر جمعة وسبت، وأغلب الفرق برا سبت وحد. فلو اتسألت يوم الاتنين [[How was your weekend?]]، رد عادي. ولو حد سأل ليه بتشتغل يوم الأحد، ده موضوع small talk لطيف: [[Our weekend in Egypt is Friday and Saturday.]]

وإنهاء الـ small talk: [[I think everyone's here. Should we get started?]] أو [[Shall we dive in?]]. لو انت اللي منظم الاجتماع، دي مسؤوليتك.`,
            when: "أول دقيقتين في أي اجتماع، و 1:1 مع مديرك، ومكالمة مع عميل.",
            mistakes: R`[[I'm fine, thank you, and you?]] بنبرة كتاب المدرسة (مش غلط، بس [[Good, thanks! You?]] أطبع). وإنك تحكي مشاكل حقيقية ([[Actually I'm sick and my internet is bad and...]]). و [[What did you do in the weekend?]] (الصح [[on the weekend]] أمريكي، أو [[at the weekend]] بريطاني، أو [[over the weekend]]). وتسكت بعد ردك من غير سؤال راجع.`
          },
          lines: [
            R`«إزيك، أخبارك إيه؟» How's it going = إزيك (مش سؤال حرفي).`,
            R`«تمام، شكرًا! مشغول شوية بس تمام. وانت؟» رد قصير + سؤال راجع.`,
            R`«الويك إند كان عامل إيه؟»`,
            R`«هادي ولطيف. رحت البحر في إسكندرية مع العيلة. وانت؟» How was yours = والويك إند بتاعك؟`,
            R`«الجو عامل إيه في القاهرة دلوقتي؟»`,
            R`«لسه حر، حوالي ٣٣ درجة. غيران من الخريف عندكم!» jealous = غيران (بهزار).`,
            R`«عندك خطط للأجازة؟»`,
            R`«مش أوي، هرتاح. يمكن أخلّص أخيرًا side project».`,
            R`نهاية الـ small talk: «أظن الكل وصل. نبدأ؟»`
          ],
          sol: R`نماذج ردود كويسة:
[[Pretty good, thanks! It's been a productive week. How about you?]]
[[It was nice. I watched the match with friends on Friday. How was yours?]]
[[It's still warm, around 30 degrees, but the evenings are getting nicer. What about there?]]
[[Nothing big, maybe a short trip to Ain Sokhna. Do you have any plans?]]

وجملة عن مصر: [[It's Ramadan next month, so everyone's schedule changes a bit. People eat at sunset and stay up late.]] أو [[You should try koshari if you ever visit. It's our national street food.]]

راجع: كل رد فيه سؤال راجع؟ أقل من ١٥ كلمة تقريبًا؟ لو ردك جملة واحدة [[Fine]] من غير أي حاجة، ده اللي بيخلّي الكلام يقف.`
        }
      ]
    },
    {
      t: "غلطات الكلام عند المصريين",
      l: 1,
      n: "ترجمة حرفية من العربي بتطلع في الكلام: I am agree و open the mic و make a meeting و since 2 days، وأزمنة الكلام وترتيب السؤال (What you mean? ← What do you mean?)",
      items: [
        {
          cmd: "غلطات الكلام",
          title: "«open the mic» و «make a meeting» و «I am agree»: ١٥ غلطة كلام والصح",
          desc: R`في درس [[غلطات المصريين]] في «تاب إنجليزي للمبرمج: قراية وكتابة» اتكلمنا عن غلطات الكتابة ([[discuss about]] و [[explain me]] و [[since 2 days]]). هنا الغلطات اللي بتطلع في الكلام أكتر، خصوصًا في المكالمات: مكالمة، ومايك، وكاميرا، ونت، ومواعيد.

السبب واحد: الترجمة الحرفية من العامية. «افتح المايك» ← [[open the mic]] والصح [[unmute]] أو [[turn on your mic]]. «اعمل ميتينج» ← [[make a meeting]] والصح [[set up a meeting]] أو [[schedule a call]]. «أنا موافق» ← [[I am agree]] والصح [[I agree]]. «النت بيقطع» ← [[the internet is cutting]] والصح [[my connection keeps dropping]].

الحل زي ما قلنا قبل كده: متحفظش قاعدة، احفظ الجملة الصح كاملة وقولها ٥ مرات بصوت عالي.`,
          example: R`Wrong: Open your mic / close your camera.     Right: Unmute yourself / turn off your camera.
Wrong: Let's make a meeting tomorrow.         Right: Let's set up a call tomorrow.
Wrong: I am agree with you.                   Right: I agree with you.
Wrong: The internet is cutting.               Right: My connection keeps dropping.
Wrong: I'm in the way.                        Right: I'm on my way. / I'll join in a minute.
Wrong: Tomorrow I will not come.              Right: I'll be off tomorrow. / I'm taking tomorrow off.
Wrong: What is the problem? (to a teammate)   Right: What's going on? / What seems to be the issue?
Wrong: He don't know.                         Right: He doesn't know.
Wrong: I have 3 years experience in React.    Right: I have three years of experience with React.
Wrong: I finished my graduation in 2024.      Right: I graduated in 2024.
Wrong: I'm working in Vodafone.               Right: I work at Vodafone.
Wrong: Can you hear me good?                  Right: Can you hear me OK? / Can you hear me well?
Wrong: I will send you the link now now.      Right: I'll send you the link right away.
Wrong: Yes, I didn't do it. (= answering "You didn't push it?")   Right: No, I didn't. / Right, I haven't pushed it yet.
Wrong: Welcome! (to end a thank you)          Right: You're welcome! / No problem! / Sure!`,
          try: R`اقرا كل صف بصوت عالي: الغلط مرة (بصوت واطي) والصح مرتين (بصوت عالي). وبعدين اختار ٥ غلطات بتعملها فعلًا، وحطهم في [[mistakes.md]] أو [[phrases.md]]. وأسبوع كامل، كل ما تتكلم إنجليزي، ركز على غلطة واحدة منهم بس.`,
          flag: "script",
          deep: {
            why: R`الغلطات دي مش بتمنع الفهم غالبًا، بس بتتكرر كل يوم فبتلفت النظر، وبعضها بيعمل لخبطة حقيقية: [[Yes, I didn't]] بتخلي اللي قدامك مش عارف انت عملت ولا لأ. و [[I'm in the way]] معناها «أنا معطّل الطريق»!`,
            how: R`المكالمات: [[mute]] / [[unmute]]، و [[turn on / turn off your camera]]، و [[share your screen]]، و [[drop off the call]]، و [[join the call]]، و [[my connection is unstable]].

الاجتماعات: [[set up]] أو [[schedule]] أو [[book]] a meeting، و [[join]] (مش [[enter]]) a meeting، و [[attend]] رسمية أكتر.

الإجابة بـ yes و no على سؤال منفي: الإنجليزي بيجاوب على الحقيقة مش على السؤال. [[You didn't push it?]] لو مدفعتش: [[No, I didn't]]. لو دفعت: [[Yes, I did]]. العربي بيقول «أيوه، مدفعتش» وده بيلخبط جدًا. والأضمن: متقولش yes أو no لوحدها، قول الجملة كاملة.

الخبرة والشغل: [[three years of experience with/in React]]، و [[I work at Google]] (الشركة) و [[I work in marketing]] (المجال)، و [[I work on the payments team]] (الفريق أو المشروع).

الشكر: [[You're welcome]] أو [[No problem]] أو [[Sure]] أو [[Anytime]] أو [[No worries]]. و [[Welcome]] لوحدها معناها «أهلًا بيك» (لضيف جديد).`,
            when: "كل مكالمة. ركز على أول ٣ صفوف (mic و meeting و agree) الأسبوع الأول لأنهم الأكتر تكرار.",
            mistakes: R`الغلطة الأكبر هنا إنك تعرف الصح وتفضل تقول الغلط من العادة. الحل: التركيز على غلطة واحدة في الأسبوع، مش كلهم مرة واحدة. وخلي حد في الفريق (أو AI بعد المكالمة من الـ transcript) يقولك لو قلتها.`
          },
          lines: [
            R`المايك والكاميرا: unmute و turn on/off. مش open و close.`,
            R`الاجتماع: set up أو schedule. مش make.`,
            R`agree فعل مش صفة: I agree. مش I am agree.`,
            R`النت: my connection keeps dropping. keeps = بيفضل.`,
            R`on my way = في السكة. in the way = معطّل الطريق!`,
            R`الأجازة: I'll be off أو I'm taking tomorrow off.`,
            R`«إيه المشكلة؟» ممكن تتسمع هجومية. What's going on أو What seems to be the issue ألطف.`,
            R`he / she / it + doesn't. مش don't.`,
            R`three years of experience with React. لازم of.`,
            R`graduated = اتخرجت. مش finished my graduation.`,
            R`work at + شركة. مش in.`,
            R`hear me OK أو well. مش good.`,
            R`right away = حالًا. «now now» ترجمة من «دلوقتي حالًا».`,
            R`سؤال منفي: جاوب على الحقيقة. «No, I didn't» لو معملتش.`,
            R`رد الشكر: You're welcome أو No problem. و Welcome لوحدها = أهلًا بيك.`
          ],
          sol: R`الـ ٥ الأكتر شيوعًا عند الناس اللي بتبدأ شغل remote: [[open the mic]]، و [[make a meeting]]، و [[I am agree]]، و [[I have 3 years experience]] (من غير of)، و [[Yes, I didn't]].

شكل [[phrases.md]] الصح:
[[Unmute yourself — (بدل open your mic) — كل مكالمة]]
[[Let's set up a call — (بدل make a meeting)]]
[[I agree — (بدل I am agree)]]

الأسبوع الأول: اختار [[I agree]] بس. هتلاقي نفسك بتقول [[I am agr...]] وتصلّح في النص: ده بالظبط اللي المفروض يحصل، ده معناه إن المخ بدأ يلاحظ. بعد أسبوعين هتطلع صح من الأول.`
        },
        {
          cmd: "أزمنة الكلام",
          title: "الأزمنة وترتيب السؤال في الكلام: What you mean? ← What do you mean?",
          desc: R`في الكلام السريع، غلطتين بيتكرروا أكتر من أي حاجة: الأزمنة، وترتيب الكلام في السؤال.

الأزمنة: انت محتاج ٥ بس في الشغل: ١) [[I work on X]] (عادة، كل يوم). ٢) [[I'm working on X]] (دلوقتي، الأيام دي). ٣) [[I worked on X]] أو [[I fixed X]] (خلص، وقت معروف: yesterday). ٤) [[I've fixed X]] (خلص، والنتيجة مهمة دلوقتي، من غير وقت محدد). ٥) [[I'll do X]] أو [[I'm going to do X]] (المستقبل). والأشهر في الغلط: [[Yesterday I fix]] (الصح [[fixed]])، و [[I am work on it]] (الصح [[I'm working]]).

السؤال: العربي بيسأل بنفس ترتيب الجملة + نبرة ([[What you mean?]])، والإنجليزي محتاج فعل مساعد قبل الفاعل: [[What do you mean?]]، و [[Why does it fail?]] (مش [[Why it fails?]])، و [[Where is the config?]] (مش [[Where the config is?]])، و [[Did you push it?]] (مش [[You pushed it?]] رغم إنها بتتقال في الكلام السريع بنبرة استغراب).`,
          example: R`Habit:  I usually work on the backend.
Now:  I'm working on the login page this week.
Finished + time:  I fixed the bug yesterday.
Finished + result now:  I've fixed the bug, so you can test it.
Future:  I'll push it after lunch. / I'm going to refactor it next sprint.
Wrong: What you mean?          Right: What do you mean?
Wrong: Why it fails?           Right: Why does it fail?
Wrong: Where the config is?    Right: Where is the config?
Wrong: How I can run it?       Right: How can I run it?
Wrong: You tested it?          Right: Did you test it?
Indirect (polite):  Do you know where the config is?   Could you tell me why it fails?`,
          try: R`اكتب ٦ أسئلة هتسألهم في أول أسبوع شغل (عن الكود، والـ deploy، والفريق)، وبعدين سجّلهم. اسمع وشوف: كل سؤال فيه فعل مساعد (do / does / did / is / can) قبل الفاعل؟ وبعدين اعمل ٢ منهم بصيغة غير مباشرة ([[Do you know where...]]).`,
          flag: "script",
          deep: {
            why: R`الأسئلة هي أكتر حاجة هتقولها كـ junior. و [[What you mean?]] و [[Why it fails?]] من أوضح العلامات إن الإنجليزي «مترجم». والأزمنة بتفرق في المعنى: [[I fixed it]] (خلاص) و [[I'm fixing it]] (لسه) معلومتين مختلفتين للمدير.`,
            how: R`القاعدة للسؤال: كلمة السؤال + فعل مساعد + الفاعل + الفعل. [[What]] + [[do]] + [[you]] + [[mean]]. ولو فيه [[is]] أو [[can]] أو [[should]]، هو نفسه الفعل المساعد ويتقدم: [[Where is the config?]] و [[How can I run it?]] و [[Should I use main?]].

الأسئلة غير المباشرة (المؤدبة) بترجّع الترتيب العادي: [[Do you know where the config is?]] (مش [[where is the config]]). ودي حيلة حلوة: لو مش متأكد من الترتيب، ابدأ بـ [[Do you know...]] أو [[Could you tell me...]] وكمّل بترتيب الجملة العادي.

[[I fixed]] vs [[I've fixed]]: لو فيه وقت (yesterday، last week، in 2024) لازم الماضي البسيط. لو مفيش وقت والمهم النتيجة ([[I've fixed it, you can test now]]) الـ present perfect. وفي الأمريكي الكلام بيستخدم الماضي البسيط في الحالتين كتير، فلو اتلخبطت، [[I fixed it]] أأمن.

[[will]] vs [[going to]]: [[I'll]] لقرار دلوقتي ([[I'll check it now]])، و [[going to]] لخطة ([[I'm going to refactor it next sprint]]). محدش هيوقف عند الفرق، الاتنين مفهومين.`,
            when: "كل سؤال في كل مكالمة، والـ standup (الأزمنة)، وقصص الانترفيو (ماضي بسيط).",
            mistakes: R`[[Yesterday I fix]]. و [[I am work]]. و [[I have fixed it yesterday]] (مع yesterday لازم [[fixed]]). و [[What you mean?]]. و [[Why it doesn't work?]] (الصح [[Why doesn't it work?]]). و [[Do you know where is the config?]] (في غير المباشر الترتيب عادي: [[where the config is]]).`
          },
          lines: [
            R`عادة: usually + present simple.`,
            R`دلوقتي / الفترة دي: am/is/are + ing.`,
            R`خلص + وقت محدد: ماضي بسيط.`,
            R`خلص + النتيجة مهمة دلوقتي: have + past participle.`,
            R`المستقبل: I'll لقرار دلوقتي، و going to لخطة.`,
            R`What do you mean: do قبل you.`,
            R`Why does it fail: does قبل it، والفعل من غير s.`,
            R`Where is the config: is قبل الفاعل.`,
            R`How can I run it: can قبل I.`,
            R`Did you test it: did في الأول، والفعل من غير ed.`,
            R`السؤال غير المباشر: ابدأ بـ Do you know أو Could you tell me، وكمّل بترتيب الجملة العادي.`
          ],
          sol: R`٦ أسئلة صح:
[[How do I run the project locally?]]
[[Where are the environment variables stored?]]
[[Which branch should I use for new features?]]
[[Who reviews the PRs on this team?]] (هنا [[who]] هو الفاعل فمفيش do)
[[How often do we deploy?]]
[[Is there a staging environment?]]

غير مباشر: [[Do you know where the environment variables are stored?]] و [[Could you tell me how often we deploy?]] (لاحظ [[we deploy]] مش [[do we deploy]]).

لو كتبت [[Who does review the PRs?]] فده غلط شائع: لما [[who]] أو [[what]] يكون هو الفاعل، مفيش فعل مساعد: [[Who reviews]] و [[What happened?]] (مش [[What did happen?]]).`
        }
      ]
    },
    {
      t: "مكالمات الفيديو والـ screen share",
      l: 2,
      n: "you're on mute و can you hear me، وتشارك شاشتك وتشاور على حاجة، ولما النت يقطع أو تدخل متأخر أو تمشي بدري",
      items: [
        {
          cmd: "you're on mute",
          title: "«You're on mute» و «Can you hear me?»: جمل المكالمة من أولها لآخرها",
          desc: R`كل مكالمة Zoom أو Google Meet أو Teams فيها نفس الـ ١٠ مواقف: حد بيتكلم وهو mute، وحد صوته واطي، وحد مش سامع، وصدى، وحد عايز يتكلم، ونهاية المكالمة. ولو الجمل دي جاهزة في دماغك، أول دقيقة في أي مكالمة هتعدّي من غير توتر.

أهم ٥: [[Can you hear me?]] (أول ما تدخل)، و [[You're on mute.]] (لحد بيتكلم ومحدش سامعه)، و [[Sorry, I was on mute.]] (لما تكون انت)، و [[You're breaking up.]] (صوته بيقطع)، و [[I'll drop off now, thanks everyone.]] (وانت خارج).

وفيه مواقف بتتقال بجمل ثابتة محدش بيغيّرها، فاحفظها زي ما هي: [[Go ahead]] (اتفضل اتكلم)، و [[Sorry, go ahead]] (لما اتنين يتكلموا مع بعض)، و [[You first]]، و [[Let's give it a minute for others to join]].`,
          example: R`Can you hear me OK?
Yes, I can hear you. / Sorry, I can't hear you. Could you check your mic?
You're on mute.
Sorry, I was on mute. As I was saying, the build is green now.
You're breaking up a little. Could you repeat that?
There's an echo. I think someone's mic is on; could everyone else mute?
Your voice is a bit low. Could you move closer to the mic?
Sorry, go ahead. / No, you go first.
Let's give it a minute for others to join.
I have a hard stop at 4, so I'll need to drop off then.
I'll drop off now. Thanks, everyone!`,
          try: R`افتح Google Meet لوحدك (ابدأ اجتماع وادخله من الموبايل واللابتوب مع بعض) وقول كل جملة بصوت عالي في مكانها: اعمل mute واتكلم وبعدين قول [[Sorry, I was on mute]]، وهكذا. وبعدين اكتب في [[phrases.md]] أهم ٥ جمل ليك، وحطهم في sticky note جنب الشاشة أول أسبوعين.`,
          flag: "script",
          deep: {
            why: R`المواقف دي بتحصل في أول دقيقة من كل مكالمة تقريبًا، ولو اتلخبطت فيها، التوتر بيكمّل معاك باقي الاجتماع. والجمل ثابتة جدًا، يعني ٣٠ دقيقة تدريب بتحل المشكلة للأبد.`,
            how: R`[[hard stop]] = لازم أمشي في الميعاد ده بالظبط (عندي حاجة بعدها). قولها في أول المكالمة مش في آخرها: [[Just so you know, I have a hard stop at 4.]]

[[breaking up]] = صوتك بيقطع (للنت). [[cut out]] = قطع ثانية. [[frozen]] = الصورة واقفة: [[You're frozen]]. [[lag]] = تأخير: [[There's a bit of a lag.]]

لما اتنين يتكلموا في نفس الوقت (بيحصل كتير مع الـ lag): [[Sorry, go ahead]] أو [[After you]]. ولو انت كنت عايز تقول حاجة مهمة: [[Sorry, just one quick thing...]].

في الآخر: [[Thanks, everyone. Talk soon.]] أو [[Have a good one!]] أو [[Have a great weekend!]] (يوم الخميس أو الجمعة حسب فريقك). و [[I'll drop off]] أو [[I'll hop off]] = هخرج من المكالمة.`,
            when: "أول وآخر دقيقة في كل مكالمة، وأي مشكلة صوت.",
            mistakes: R`[[Open your mic]] (الصح [[unmute]]). و [[I can't hear you good]]. و [[Your voice is cutting]] (الصح [[You're breaking up]] أو [[Your audio is cutting out]]). و [[I will go now bye]] فجأة من غير شكر. وتفضل تتكلم ٢ دقيقة وانت mute ومحدش يقولك: لما تبدأ تتكلم، بص على أيقونة المايك.`
          },
          lines: [
            R`«سامعني كويس؟» أول جملة لما تدخل.`,
            R`«آه سامعك» أو «مش سامعك، ممكن تشوف المايك؟»`,
            R`«انت على mute». بتقولها لحد بيتكلم ومحدش سامعه.`,
            R`«آسف، كنت mute. زي ما كنت بقول، الـ build بقى أخضر». As I was saying = نرجع للي كنت بقوله.`,
            R`«صوتك بيقطع شوية، ممكن تعيد؟» breaking up = بيقطع.`,
            R`«فيه صدى. أظن مايك حد مفتوح؛ ممكن الباقي يعمل mute؟»`,
            R`«صوتك واطي شوية، ممكن تقرّب من المايك؟»`,
            R`لما اتنين يتكلموا مع بعض: «آسف، اتفضل» أو «لا، انت الأول».`,
            R`«نستنى دقيقة لحد ما الباقي يدخل».`,
            R`«لازم أمشي الساعة ٤ بالظبط، فهخرج ساعتها». hard stop = ميعاد مقفول.`,
            R`«هخرج دلوقتي. شكرًا يا جماعة!» drop off = أخرج من المكالمة.`
          ],
          sol: R`لو عملت التمرين صح، المفروض تكون قلت كل جملة مرة على الأقل في موقفها الحقيقي (mute حقيقي، صدى حقيقي لو الجهازين جنب بعض). ده أهم من الحفظ: المخ بيربط الجملة بالموقف.

أهم ٥ للـ sticky note (لو هتختار):
[[Can you hear me OK?]]
[[Sorry, I was on mute.]]
[[You're breaking up. Could you repeat that?]]
[[Sorry, go ahead.]]
[[I'll drop off now. Thanks, everyone!]]

لو حاسس إنك مش محتاج الورقة بعد أسبوع، شيلها. ولو لسه بتبص عليها، سيبها: ده مش غش، ده نفس فكرة الـ cheat sheet اللي المبرمجين بيستخدموها لأي أداة جديدة.`
        },
        {
          cmd: "can you see my screen",
          title: "تشارك شاشتك وتشاور: «Can you see my screen?» و «Let me zoom in»",
          desc: R`الـ screen share هو نص الشغل التقني في المكالمات: تشرح كود، أو bug، أو تعمل demo، أو حد بيساعدك. والمشكلة إنك بتعمل حاجتين مع بعض: بتحرّك الماوس، وبتتكلم إنجليزي. فالجمل لازم تبقى أوتوماتيك.

البداية: [[Let me share my screen.]] وبعدين [[Can you see my screen?]] أو [[Can everyone see my screen?]]. ولو شاركت الشاشة الغلط: [[Oops, wrong window. One sec.]]

التشاور: [[As you can see here...]]، و [[If you look at line 42...]]، و [[This part here...]] (والماوس على الحتة)، و [[On the left / on the right / at the top / at the bottom]]، و [[Let me zoom in.]] (الخط صغير: دايمًا كبّر الخط في VS Code قبل ما تشارك).

النهاية: [[I'll stop sharing now.]] أو [[Let me stop sharing.]]`,
          example: R`Let me share my screen. Can you see it?
Can you see my VS Code, or is it still showing the browser?
Oops, wrong window. One second.
Is the font big enough? Let me zoom in.
As you can see here, the request fails with a 401.
If you look at line 42, we never await this promise.
This part on the left is the request, and on the right is the response.
Let me scroll down a bit. OK, here.
Could you share your screen? It'll be easier to see the error.
I'll stop sharing now.`,
          try: R`اعمل فيديو ٢ دقيقة بـ OBS أو Loom أو حتى Zoom recording لنفسك، بتشارك فيه شاشتك وتشرح ملف كود من مشروعك. استخدم ٥ جمل على الأقل من المثال. وبعدين اتفرج على الفيديو: كام مرة سكتّ وانت بتدوّر على حاجة؟ الماوس كان بيشاور على اللي بتقوله؟`,
          flag: "script",
          deep: {
            why: R`في الـ remote، الـ screen share هو الـ «تعالى اقعد جنبي» بتاع المكتب. ولو إنت سلس فيه، الناس هتحب تشتغل معاك pair، ودي أسرع طريقة تتعلم بيها. وفي الانترفيو، الـ live coding كله screen share.`,
            how: R`قبل ما تشارك: اقفل الإشعارات (Slack والواتساب)، واقفل التابات اللي فيها حاجة شخصية، وكبّر الخط في VS Code ([[Ctrl + =]]) والمتصفح. وشارك نافذة واحدة بدل الشاشة كلها لو ممكن.

وانت بتشارك: اتكلم قبل ما تحرك الماوس: [[I'm going to open the user service now]] وبعدين افتح. كده الناس بتلحقك. والسكوت وانت بتدوّر: [[Let me find it... one sec... here it is.]] أحسن من صمت ١٠ ثواني.

كلمات الأماكن: [[at the top]]، و [[at the bottom]]، و [[on the left / right]]، و [[in the sidebar]]، و [[in the terminal]]، و [[in the console]]، و [[in the Network tab]]، و [[line 42]]، و [[this function here]]. وأفعال: [[scroll up / down]]، و [[click on]]، و [[hover over]]، و [[open]]، و [[switch to]] (تنقل لنافذة تانية).

لو حد تاني بيشارك وعايز يشاور على حاجة: [[Could you scroll up a bit?]]، و [[Could you go back to the previous file?]]، و [[Could you zoom in? It's a bit small on my side.]]`,
            when: "شرح bug لزميل، و code walkthrough، و demo، و live coding، و pair programming.",
            mistakes: R`تشارك الشاشة كلها وعليها إشعار واتساب شخصي. وخط صغير جدًا ([[Can you zoom in?]] أول تعليق هتسمعه). و [[Do you see my screen?]] (مقبولة، بس [[Can you see]] أشهر). وتحرك الماوس بسرعة وتقول [[here... and here... and here]] من غير ما تقول إيه اللي هناك. وتنسى تعمل [[stop sharing]].`
          },
          lines: [
            R`«خليني أشارك شاشتي. شايفينها؟»`,
            R`«شايفين الـ VS Code ولا لسه ظاهر المتصفح؟»`,
            R`«أوبس، نافذة غلط. ثانية واحدة».`,
            R`«الخط كبير كفاية؟ خليني أكبّر». zoom in = تكبير.`,
            R`«زي ما انتوا شايفين هنا، الـ request بيفشل بـ 401».`,
            R`«لو بصيتوا على سطر ٤٢، إحنا مش بنعمل await للـ promise دي».`,
            R`«الجزء اللي على الشمال ده الـ request، واللي على اليمين الـ response».`,
            R`«خليني أنزل شوية. أيوه، هنا».`,
            R`«ممكن تشارك شاشتك؟ هيبقى أسهل نشوف الخطأ».`,
            R`«هوقف المشاركة دلوقتي».`
          ],
          sol: R`الفيديو الكويس:
١) بيبدأ بجملة بتقول هتشرح إيه: [[I'm going to walk you through the auth middleware in my project.]]
٢) الخط كبير ومقروء.
٣) قبل كل حركة جملة: [[Now I'll open the routes file.]]
٤) الماوس بيشاور على اللي بيتقال: [[This line here checks the token.]]
٥) بيخلص بـ [[That's it. I'll stop sharing now.]]

المتوقع في أول فيديو: ٢–٤ فترات سكوت وانت بتدوّر على ملف. الحل: [[Let me find it... one sec]]، وجهّز الملفات مفتوحة في tabs قبل ما تبدأ. والفيديو الضعيف: كله [[here]] و [[this]] من غير أسماء، فاللي بيتفرج مش عارف انت فين.`
        },
        {
          cmd: "النت قطع",
          title: "النت قطع، واتأخرت، ومحتاج تمشي بدري: جمل الطوارئ",
          desc: R`في مصر النت والكهربا مش مضمونين ١٠٠٪، وده بيحصل للكل. المهم إزاي تتعامل معاه باحترافية: تبلّغ بسرعة، ومن غير اعتذار طويل، وتقول الحل.

قبل المكالمة لو متوقع مشكلة: [[Heads-up: my internet is a bit unstable today, so I might keep my camera off.]] (heads-up = تنبيه مسبق).

لو وقعت ورجعت: [[Sorry, I got disconnected. What did I miss?]] أو [[Sorry about that, my connection dropped. Where were we?]]. ولو مش قادر ترجع: ابعت في الشات أو Slack على طول: [[My internet is down. I'll join from my phone in 2 minutes.]]

التأخير: ابعت قبل الميعاد مش بعده: [[Running 5 minutes late, sorry! Please start without me.]]. والمشي بدري: قوله في الأول: [[I need to leave 10 minutes early today.]]`,
          example: R`Heads-up: my internet is a bit unstable today, so I'll keep my camera off.
Sorry, I got disconnected. What did I miss?
Sorry about that, my connection dropped. Where were we?
I think I lost you for a second. Could you repeat the last part?
My internet is down. I'll join from my phone in two minutes.
There's a power cut in my area. I'll be back online in about 30 minutes.
Running five minutes late, sorry! Please start without me.
Sorry I'm late. Please don't let me interrupt; I'll catch up.
I need to leave ten minutes early today, so could we cover my part first?`,
          try: R`اكتب ٣ رسايل Slack جاهزة وحطها في Notes على الموبايل (عشان لو النت وقع تبعتها من الموبايل): (١) النت وقع وهتدخل من الموبايل. (٢) الكهربا قطعت ومش عارف هترجع إمتى. (٣) متأخر ١٠ دقايق. وبعدين قول بصوت عالي جملة [[Sorry, I got disconnected. What did I miss?]] بـ ٣ نبرات: مرتبك، وعادي، وواثق. خلّي الأخيرة هي نبرتك.`,
          flag: "script",
          deep: {
            why: R`اللي بيختفي من مكالمة من غير ما يقول، أو بيرجع ويعتذر دقيقتين، بيبان مش محترف. واللي بيبعت سطر في الشات ويرجع ويقول [[What did I miss?]] ويكمل عادي، محدش بيفتكر إنه وقع أصلًا. والشركات اللي بتوظف من مصر عارفة إن الموضوع ده بيحصل؛ اللي بيفرق إزاي بتتعامل معاه.`,
            how: R`[[What did I miss?]] = فاتني إيه؟ و [[Where were we?]] = كنا فين؟ و [[I'll catch up]] = هلحق/هفهم لوحدي بعدين (من الـ notes أو التسجيل).

تجهيزات: خلي الموبايل فيه تطبيق Zoom/Meet/Teams متسجّل دخول، وباقة نت احتياطي، وشاحن. ولو الكهربا بتقطع في منطقتك في مواعيد معروفة، ده سبب كويس تطلب مواعيد اجتماعات مناسبة: [[Could we move the standup 30 minutes earlier? There are scheduled power cuts in my area at that time.]]

الاعتذار: جملة واحدة ([[Sorry about that]]) وبعدين كمّل. متحكيش القصة كلها.

ولو فاتك جزء مهم وانت مكسوف تطلب إعادة: [[Is there a recording, or could someone share the notes?]]`,
            when: "أي مشكلة نت أو كهربا أو تأخير. جهّز الرسايل من قبلها.",
            mistakes: R`تختفي من غير رسالة. و [[Sorry sorry sorry, the internet in Egypt is very bad...]] وقصة طويلة. و [[The electricity is cut]] (الأوضح [[There's a power cut]] أو [[power outage]]). و [[I'm late 5 minutes]] (الصح [[I'm running 5 minutes late]] أو [[I'll be 5 minutes late]]). وتقول إنك هتمشي بدري في آخر الاجتماع بدل أوله.`
          },
          lines: [
            R`تنبيه مسبق: «النت مش مستقر النهارده، فهقفل الكاميرا». heads-up = تنبيه.`,
            R`«آسف، اتقطعت. فاتني إيه؟»`,
            R`«آسف، النت وقع. كنا فين؟»`,
            R`«أظن فقدتك ثانية. ممكن تعيد آخر جزء؟» (لو الطرف التاني اللي قطع).`,
            R`«النت واقع. هدخل من الموبايل في دقيقتين».`,
            R`«الكهربا قاطعة في منطقتي. هرجع أونلاين في حوالي نص ساعة». power cut = قطع كهربا.`,
            R`«هتأخر ٥ دقايق، آسف! ابدأوا من غيري». running late = متأخر.`,
            R`«آسف على التأخير. كملوا متوقفوش عشاني؛ هلحق». catch up = ألحق.`,
            R`«محتاج أمشي بدري ١٠ دقايق النهارده، ممكن نبدأ بالجزء بتاعي؟» cover = نغطي/نتكلم في.`
          ],
          sol: R`الرسايل الجاهزة:
(١) [[My internet just went down. Joining from my phone in 2 minutes.]]
(٢) [[Power cut in my area, not sure how long it'll take. I'll catch up from the notes and update you on Slack.]]
(٣) [[Running about 10 minutes late, sorry! Please start without me.]]

النبرة الواثقة: [[Sorry, I got disconnected. What did I miss?]] بسرعة عادية، ونبرة نازلة في [[disconnected]]، وطالعة في [[miss?]]، ومن غير ضحكة متوترة. التسجيل الضعيف: الجملة متقطعة بـ [[ehh]] أو بتبدأ بـ [[Sorry, sorry...]] مكررة.`
        }
      ]
    },
    {
      t: "تشرح كودك وتعمل demo",
      l: 2,
      n: "تشرح PR بصوتك (context ← what ← why ← trade-offs)، وتمشّي حد في الكود، وتعمل demo لفيتشر، وتحوّل ملاحظاتك المكتوبة لكلام طبيعي",
      items: [
        {
          cmd: "تشرح PR بصوتك",
          title: "تشرح PR أو فيتشر بصوتك في دقيقتين: context ← what ← why ← trade-offs",
          desc: R`الموقف: في اجتماع أو مكالمة review، حد قالك [[Can you walk us through your PR?]]. والغلطة المشهورة إنك تفتح الـ diff وتقرا الكود سطر سطر. الناس مش محتاجة الكود، محتاجة الصورة.

الترتيب اللي بيشتغل دايمًا (ونفس ترتيب وصف PR المكتوب في درس [[وصف PR]] في «تاب إنجليزي للمبرمج: قراية وكتابة»):
١) Context: المشكلة إيه، وليه بنعمل ده. [[So the problem was...]]
٢) What: عملت إيه على مستوى عالي. [[What I did is...]]
٣) Why: ليه الطريقة دي. [[I went with X because...]]
٤) Trade-offs: التمن أو الحاجة اللي مش مثالية. [[The downside is...]]
٥) What to look at: عايز الريفيو يركز فين. [[I'd love feedback on...]]

وكل جزء جملة أو اتنين. دقيقتين بالكتير، وبعدين [[Any questions?]].`,
          example: R`Context:  So the problem was that the orders page took about five seconds to load for big customers.
What:  What I did is add pagination on the API, twenty orders per page, and an index on customer_id.
Why:  I went with cursor pagination instead of offset, because offset gets slow on large tables.
Trade-off:  The downside is that you can't jump to page ten directly; you can only go next and previous.
Trade-off:  I think that's fine for this page, but let me know if the product team disagrees.
Result:  On staging, the page now loads in under half a second.
Review:  I'd love feedback on the cursor encoding in orders.service.ts. That's the tricky part.
Close:  That's pretty much it. Any questions?`,
          try: R`خد آخر PR أو commit كبير عملته (أو فيتشر في مشروعك)، واكتب ٥ سطور بالترتيب ده (سطر لكل جزء)، وبعدين سجّل نفسك بتشرحه من غير ما تبص على الورقة، في أقل من دقيقتين. اسمع وعدّ: قلت [[because]] كام مرة؟ (لو صفر، مفيش why.)`,
          flag: "script",
          deep: {
            why: R`الشرح ده بيتطلب منك في الـ code review، و sprint demo، و الانترفيو («walk me through a project»). والترتيب ده بيوري إنك فاهم ليه عملت اللي عملته، مش بس نفذت. والـ trade-offs بالذات هي علامة الـ mid/senior: الـ junior بيقول «عملت X»، والأحسن بيقول «عملت X بدل Y، والتمن كان Z».`,
            how: R`عبارات لكل جزء:
Context: [[So the problem was...]]، [[The goal here is...]]، [[Users were complaining that...]].
What: [[What I did is...]]، [[The main change is...]]، [[At a high level, ...]].
Why: [[I went with X because...]]، [[I chose X over Y since...]]، [[The reason is...]].
Trade-offs: [[The downside is...]]، [[The trade-off is...]]، [[One thing I'm not 100% happy with is...]]، [[A limitation is...]].
Review: [[I'd love feedback on...]]، [[The tricky part is...]]، [[Could you take a closer look at...]].
Close: [[That's pretty much it]]، [[Happy to go into more detail]]، [[Any questions?]].

وكلمات الربط اللي بتخلي الكلام يمشي: [[so]]، و [[and then]]، و [[because]]، و [[but]]، و [[which means]]. في الكلام دي أهم من الـ grammar المظبوط.

ولو حد سأل سؤال مش عارف إجابته: درس «مش عارف في اجتماع».`,
            when: "code review بالصوت، و sprint demo، و walkthrough لزميل جديد، و «tell me about a project» في الانترفيو.",
            mistakes: R`تقرا الـ diff سطر سطر. تبدأ بالتفاصيل ([[So in line 12 I changed...]]) قبل الصورة الكبيرة. مفيش [[why]] خالص. تخبّي الـ trade-off (هيتكشف في الـ review، والأحسن تقوله انت). وتطوّل ٧ دقايق: خلّي التفاصيل للأسئلة.`
          },
          lines: [
            R`السياق: «المشكلة كانت إن صفحة الأوردرات بتاخد ٥ ثواني للعملاء الكبار».`,
            R`عملت إيه: «ضفت pagination في الـ API، ٢٠ أوردر في الصفحة، و index على customer_id».`,
            R`ليه: «اخترت cursor pagination بدل offset، لأن offset بيبطأ مع الجداول الكبيرة». went with = اخترت.`,
            R`التمن: «العيب إنك متقدرش تروح لصفحة ١٠ على طول؛ بس next و previous».`,
            R`«أظن ده تمام للصفحة دي، بس قولولي لو فريق المنتج مش موافق».`,
            R`النتيجة: «على الـ staging، الصفحة بقت بتحمّل في أقل من نص ثانية».`,
            R`«عايز رأيكم في الـ cursor encoding في الملف ده. دي الحتة الصعبة». tricky = صعبة/خادعة.`,
            R`الختام: «هو ده تقريبًا. فيه أسئلة؟»`
          ],
          sol: R`مثال لـ ٥ سطور لـ PR بسيط:
[[So the problem was that users could submit the signup form twice and create duplicate accounts.]]
[[What I did is disable the button while the request is pending, and add a unique constraint on email in the database.]]
[[I added both because the button alone doesn't protect against a slow network or a script.]]
[[The downside is that the user now sees a database error if it still happens, so I mapped it to a friendly message.]]
[[I'd love feedback on the error mapping. That's pretty much it. Any questions?]]

في التسجيل: [[because]] مرة على الأقل، و [[downside]] أو [[trade-off]] مرة. والمدة ٤٠–٩٠ ثانية. التسجيل الضعيف: [[I changed the form and the database. That's it.]] من غير ولا سبب.`
        },
        {
          cmd: "تمشي حد في الكود",
          title: "تمشّي زميل في الكود: «This function takes... and returns...»",
          desc: R`موقف تاني غير شرح الـ PR: زميل جديد، أو حد هيكمّل شغلك، وعايزك [[walk him through the codebase]]. هنا بتشرح الكود نفسه وانت بتشارك الشاشة. والسر: من برا لجوه. الأول الفولدرات والصورة الكبيرة، وبعدين flow واحد من أوله لآخره (مثلًا request واحد من الـ route للداتابيز)، وبعدين التفاصيل.

والجمل اللي بتوصف كود بسيطة جدًا وبتتكرر: [[This function takes X and returns Y]]. و [[This is where we...]]. و [[This gets called when...]]. و [[It reads from... and writes to...]]. و [[If X, it..., otherwise it...]]. و [[This is just a helper for...]]. ومع الجمل دي تقدر تشرح أي كود بإنجليزي بسيط.`,
          example: R`Let's start with the big picture. The app has three main folders: routes, services and db.
Let's follow one request from start to finish: creating an order.
It starts here, in the orders route. This just validates the body and calls the service.
This function takes the cart and the user ID, and returns the new order.
First it checks the stock. If something is out of stock, it throws a 409.
Otherwise, it opens a transaction and writes the order and the items.
This gets called by the payment webhook later, when the payment succeeds.
This file is just a helper for formatting prices; you can ignore it for now.
The part I'd be careful with is this retry logic. It's a bit fragile.
Does that make sense so far? Any questions before we go deeper?`,
          try: R`اختار flow واحد من مشروعك (login، أو إضافة للـ cart، أو رفع صورة)، وسجّل فيديو ٣ دقايق بتمشّي فيه «زميل جديد» في الكود من أول الـ request لحد الداتابيز. لازم تستخدم [[This function takes... and returns...]] مرتين على الأقل، و [[If... otherwise...]] مرة، و [[Does that make sense?]] مرة.`,
          flag: "script",
          deep: {
            why: R`الـ knowledge transfer ده بيحصل كتير: onboarding، وقبل أجازة، ولما حد يمسك تاسك انت بدأتها. واللي بيشرح كويس بياخد ثقة الفريق بسرعة. وفي انترفيو الـ take-home، أحيانًا بيطلبوا منك تمشّيهم في الكود اللي سلمته.`,
            how: R`الأفعال اللي بتوصف كود: [[takes]] (بياخد parameters)، و [[returns]]، و [[calls]] (بينادي)، و [[gets called by]] (بيتنادى من)، و [[reads from]] و [[writes to]]، و [[checks]]، و [[throws]]، و [[handles]]، و [[loops over]] (بيلف على)، و [[maps X to Y]]، و [[wraps]] (بيغلّف).

وأدوات الربط: [[First]] و [[Then]] و [[After that]] و [[Finally]]، و [[If ... otherwise ...]]، و [[When ... , it ...]]، و [[Once ... , ...]] (أول ما).

التحذيرات: [[The part I'd be careful with is...]]، و [[This is a bit fragile]] (هش)، و [[This is legacy code]] (قديم)، و [[There's a known issue here]]، و [[Don't touch this unless...]] (بهزار نص جد).

كل ٣–٤ دقايق وقّف واسأل: [[Does that make sense so far?]] أو [[Any questions before we go deeper?]]. الزميل غالبًا مش هيقاطعك لو محتاج يسأل.`,
            when: "onboarding لحد جديد، و handover قبل أجازة، وشرح take-home في انترفيو، و pair programming.",
            mistakes: R`تبدأ بأول ملف في الفولدر بالترتيب الأبجدي بدل flow حقيقي. وتقرا كل سطر. و [[This function it takes]] (فاعلين: [[This function takes]]). و [[This function return]] من غير s. و [[Is it clear?]] (بتتسمع زي امتحان؛ [[Does that make sense?]] ألطف).`
          },
          lines: [
            R`«نبدأ بالصورة الكبيرة. التطبيق فيه ٣ فولدرات أساسية».`,
            R`«هنمشي ورا request واحد من أوله لآخره: إنشاء أوردر». follow = نمشي ورا.`,
            R`«بيبدأ هنا في الـ route. ده بيعمل validation للـ body وبينادي الـ service بس».`,
            R`«الدالة دي بتاخد الـ cart والـ user ID، وبترجّع الأوردر الجديد». الجملة الأساسية لوصف أي دالة.`,
            R`«الأول بتشيك على المخزون. لو حاجة خلصانة، بترمي 409». throw = ترمي خطأ.`,
            R`«غير كده، بتفتح transaction وبتكتب الأوردر والعناصر». otherwise = غير كده.`,
            R`«الدالة دي بيناديها الـ webhook بتاع الدفع بعدين، لما الدفع ينجح».`,
            R`«الملف ده مجرد helper لتنسيق الأسعار؛ ممكن تتجاهله دلوقتي».`,
            R`«الحتة اللي هاخد بالي منها هي الـ retry logic دي. هشة شوية». fragile = هش.`,
            R`«مفهوم لحد هنا؟ فيه أسئلة قبل ما ندخل أعمق؟»`
          ],
          sol: R`مثال لشرح flow الـ login (جزء منه):
[[Let's follow the login flow. It starts in the login form component. When the user submits, it calls the login function in auth.ts. This function takes the email and password and sends them to /api/login. On the server, the route checks the password with bcrypt. If it's correct, it creates a session and sets an HttpOnly cookie; otherwise it returns a 401. Does that make sense so far?]]

راجع الفيديو: فيه flow واحد من أوله لآخره؟ و [[takes... returns...]] مرتين؟ و [[If... otherwise...]]؟ ووقفت تسأل؟ المدة ٢–٤ دقايق.

الفيديو الضعيف: بيفتح كل ملف في الفولدر ويقول [[This is the utils file, this is the config file...]] من غير ما يقول إزاي بيشتغلوا مع بعض.`
        },
        {
          cmd: "demo",
          title: "تعمل demo لفيتشر قدام الفريق أو العميل: قبل وأثناء ولو حاجة وقعت",
          desc: R`الـ demo (في آخر الـ sprint أو لعميل) مش شرح كود: ده قصة من وجهة نظر اليوزر. الناس عايزة تشوف «اليوزر يقدر يعمل إيه دلوقتي مكانش يقدر يعمله قبل كده».

الترتيب: ١) جملة عن المشكلة أو الهدف. ٢) ورّي من ناحية اليوزر خطوة خطوة، وانت بتقول بتعمل إيه. ٣) حالة غلط واحدة (validation أو error) عشان يبان إنك فكرت فيها. ٤) إيه اللي لسه مش خلصان. ٥) أسئلة.

ولو حاجة وقعت (وهتقع مرة، ده قانون الـ demos): متتوترش ومتفضلش تصلّح قدامهم. [[Looks like the demo gods aren't with me today]] (جملة مشهورة بهزار)، وبعدين [[Let me show you the screenshots instead]] أو [[I'll send a recording after the call]].`,
          example: R`Today I'm going to show you the new password reset flow.
Before this, users had to email support to reset their password. Now they can do it themselves.
So I'm on the login page, and I click "Forgot password".
I enter my email and hit send. You can see the confirmation message here.
Now I'll open the email. The link expires after 30 minutes, for security.
Let me show you what happens if the link is expired. We show a clear message and a button to try again.
What's not done yet: the email template still needs the final design.
Hmm, looks like staging is a bit slow today. Let me refresh.
If it doesn't load, I'll send you a short recording after the call.
That's the demo. Any questions or feedback?`,
          try: R`اعمل demo مسجّل (Loom أو OBS) لفيتشر واحدة في مشروعك، أقل من ٣ دقايق، بالترتيب الخماسي. ولازم فيه: جملة [[Before this... Now...]]، وحالة error واحدة، وجملة [[What's not done yet]]. ولو حاجة وقعت أثناء التسجيل، متوقفش: اتعامل معاها بجملة من الجمل وكمّل.`,
          flag: "script",
          deep: {
            why: R`الـ demo هو اللحظة اللي شغلك بيتشاف فيها من المدير والعميل والـ product. demo واضح بيخلي شغل أسبوعين يبان، و demo ملخبط بيخلي نفس الشغل يبان ناقص. وفي الانترفيو (portfolio review) نفس المهارة.`,
            how: R`اتكلم بلغة اليوزر مش الكود: [[the user can now...]] مش [[I added an endpoint that...]] (إلا لو الجمهور مبرمجين وسألوا).

قبل الـ demo: جهّز الداتا (يوزر تجريبي، ومنتجات)، وافتح التابات، واقفل الإشعارات، وجرّب الـ flow مرة قبلها بـ ١٠ دقايق. وجهّز backup: screenshots أو فيديو.

وانت بتعمل demo: قول قبل ما تدوس ([[Now I'll click Save]]). واستنى ثانية بعد كل خطوة مهمة عشان الناس تشوف. ولو فيه loading: [[This takes a second...]].

الأسئلة اللي هتيجي: [[What happens if...?]]. لو عارف: جاوب أو ورّي. لو مش عارف: [[Good question, I haven't tested that case. I'll check and get back to you.]]، واكتبها.

والـ feedback: [[Thanks, that's a good point. I'll add it to the ticket.]] حتى لو مش موافق، متتناقشش في الـ demo؛ ناقش بعدين.`,
            when: "sprint review، و demo لعميل، و portfolio review في انترفيو، و فيديو لـ README.",
            mistakes: R`تشرح الكود بدل الفيتشر. وتصلّح bug قدام الناس ١٠ دقايق. و [[Sorry sorry, it was working yesterday!]] (كل الناس بتقولها، بس الأحسن جملة الـ backup). وداتا تجريبية فيها كلام غريب أو «test test asdf». وتنسى تقول إيه اللي لسه مخلصش، فالعميل يفتكر إنه خلص.`
          },
          lines: [
            R`«النهارده هوريكم flow الـ password reset الجديد».`,
            R`قبل وبعد: «قبل كده اليوزرز كانوا بيبعتوا للـ support. دلوقتي يقدروا يعملوها بنفسهم».`,
            R`«أنا في صفحة الـ login، وهدوس Forgot password». وصف الخطوة وانت بتعملها.`,
            R`«هكتب إيميلي وأدوس send. تقدروا تشوفوا رسالة التأكيد هنا». hit = تدوس.`,
            R`«هفتح الإيميل. اللينك بيخلص بعد نص ساعة، للأمان». expires = بينتهي.`,
            R`حالة error: «خليني أوريكم لو اللينك خلص: بنعرض رسالة واضحة وزرار نجرّب تاني».`,
            R`«اللي لسه مخلصش: قالب الإيميل محتاج التصميم النهائي».`,
            R`حاجة وقعت: «الـ staging بطيء شوية النهارده. خليني أعمل refresh».`,
            R`الـ backup: «لو محمّلش، هبعتلكم تسجيل قصير بعد المكالمة».`,
            R`«ده الـ demo. فيه أسئلة أو feedback؟»`
          ],
          sol: R`الـ demo الكويس (مثال لفيتشر بحث):
[[Today I'll show you the new search. Before this, users had to scroll through all products. Now they can search by name or category. I'll type "shoes"... and you can see the results update as I type. If there are no results, we show a message with suggestions. What's not done yet is search by price. Any questions?]]

راجع التسجيل: أقل من ٣ دقايق؟ فيه before/now؟ فيه حالة error؟ فيه «not done yet»؟ بتقول قبل ما تدوس؟

لو حاجة وقعت أثناء التسجيل وكمّلت بجملة backup، ده أحسن تدريب ممكن: سيبه في الفيديو. الـ demo الضعيف: كله [[and this... and this...]] من غير ما تقول اليوزر بيستفيد إيه.`
        },
        {
          cmd: "من مكتوب لمتكلم",
          title: "تحوّل ملاحظاتك المكتوبة لكلام طبيعي: جمل أقصر و contractions وكلمات ربط",
          desc: R`كتير من اللي إنجليزيتهم ضعيفة بيكتبوا اللي هيقولوه الأول، ودي فكرة ممتازة. المشكلة إنهم بيقروه زي ما هو، فيبان «آلي» وتقيل. الكتابة والكلام ليهم قواعد مختلفة، فمحتاج تحوّل.

١) قسّم الجمل الطويلة: جملة الكتابة اللي فيها [[which]] و [[however]] وفاصلتين تبقى ٣ جمل قصيرة.
٢) contractions: [[it is]] ← [[it's]]، و [[we will]] ← [[we'll]]، و [[do not]] ← [[don't]].
٣) كلمات رسمية ← كلمات كلام: [[however]] ← [[but]]، و [[therefore]] ← [[so]]، و [[in order to]] ← [[to]]، و [[utilize]] ← [[use]]، و [[approximately]] ← [[about]]، و [[regarding]] ← [[about]].
٤) ابدأ بكلمة ربط: [[So,]] و [[Basically,]] و [[Also,]] و [[The thing is,]].
٥) متحفظش جمل: احفظ النقط (bullets) بس، وقول الجمل كل مرة من جديد.`,
          example: R`Written:  The migration, which was scheduled for Friday, has been postponed due to issues identified in staging.
Spoken:  So, the migration was planned for Friday. But we found some issues on staging. So we're moving it.
Written:  It is recommended that we utilize a queue in order to process the emails asynchronously.
Spoken:  I think we should use a queue. That way the emails go out in the background.
Written:  However, this approach will not scale; therefore, an alternative is required.
Spoken:  The thing is, this won't scale. So we need another approach.
Written:  Regarding the deadline, approximately two additional days will be needed.
Spoken:  About the deadline: I'll need about two more days.
Notes, not sentences:  migration → moved (staging issues) → new date Tue → need QA sign-off`,
          try: R`خد رسالة أو وصف PR كتبته بالإنجليزي (أو فقرة من README)، وحوّلها لكلام بالـ ٥ خطوات. اكتب النسخة المتكلمة، وبعدين اكتب النقط بس (bullets زي آخر سطر). ارمي النسخة المكتوبة، وسجّل نفسك وانت بتقول الكلام من النقط بس.`,
          flag: "script",
          deep: {
            why: R`اللي بيقرا نص رسمي في اجتماع بيبان متوتر وبعيد، والناس بتفصل. واللي بيتكلم بجمل قصيرة بسيطة بيبان واثق، حتى لو فيه غلطات grammar. وحاجة مهمة: الجمل القصيرة أسهل كمان في النطق والتنفس، فالتوتر بيقل.`,
            how: R`اختبار سريع: لو الجملة أطول من نَفَس واحد، قسّمها. ولو فيها كلمة عمرك ما سمعتها في مكالمة ([[henceforth]] و [[aforementioned]] و [[kindly]])، غيّرها.

الأمريكان والبريطانيين في الشغل بيتكلموا بسيط جدًا: [[So basically we need to...]] و [[The thing is...]] و [[Here's the problem...]] و [[Long story short...]] (من الآخر). ودي جمل بتديك ثانية تفكر في الجملة الجاية.

الـ passive في الكتابة ([[has been postponed]]) بيتحول active في الكلام ([[we're moving it]]). والكلام بيقول مين: [[we]] و [[I]] و [[the client]].

الـ bullets: كلمة أو اتنين لكل فكرة، وأسهم للترتيب. الورقة دي مسموح تبص عليها في الاجتماع. النص الكامل ممنوع.`,
            when: "قبل أي اجتماع مهم، أو presentation، أو demo، أو انترفيو: اكتب، وحوّل، واحتفظ بالنقط بس.",
            mistakes: R`تقرا نص مكتوب بصوت رتيب وعينك على الورقة. تحفظ كلمة بكلمة وتتوه لو حد قاطعك. تستخدم [[however]] و [[therefore]] في كل جملة. و [[kindly note that]] في الكلام (رسمية جدًا وغريبة). والعكس: كلام «عامي» زيادة ([[gonna]] و [[wanna]] مقبولين في الكلام بس ركز على الوضوح الأول).`
          },
          lines: [
            R`مكتوب: جملة طويلة فيها which و passive و due to.`,
            R`متكلم: ٣ جمل قصيرة، و we بدل passive، و so و but.`,
            R`مكتوب: It is recommended و utilize و in order to.`,
            R`متكلم: I think we should use. و That way = كده.`,
            R`مكتوب: However و therefore.`,
            R`متكلم: The thing is و So. و won't بدل will not.`,
            R`مكتوب: Regarding و approximately و additional.`,
            R`متكلم: About و about و more. بسيطة ومباشرة.`,
            R`النقط اللي تحتفظ بيها: كلمات وأسهم، مش جمل.`
          ],
          sol: R`مثال: الرسالة المكتوبة [[We have identified the root cause of the login failures, which was related to an expired certificate. It has been renewed, and monitoring has been added to prevent recurrence.]]

المتكلمة: [[So, we found out why login was failing. Basically, a certificate expired. We renewed it, and it's working now. We also added monitoring, so we'll get an alert before it happens again.]]

النقط: [[login failing → cert expired → renewed → working → added alert]]

راجع التسجيل: قلت الكلام من النقط بس؟ الجمل قصيرة؟ فيها [[so]] و [[basically]]؟ لو التسجيل طالع نفس النسخة المكتوبة كلمة بكلمة، انت حفظت؛ جرّب تقوله مرة تانية بكلام مختلف شوية.`
        }
      ]
    },
    {
      t: "تقديرات وخلاف وتاخد دورك في الاجتماع",
      l: 2,
      n: "تدّي تقدير من غير ما تتزنق، و «That's doable, but...»، وتختلف بأدب، وتقول «مش عارف» صح، وتقاطع وتاخد دورك، وتلخّص الاجتماع بـ action items",
      items: [
        {
          cmd: "estimates",
          title: "«How long will it take?»: تدّي تقدير بافتراضات ومدى، مش رقم واحد",
          desc: R`أصعب سؤال في الاجتماع للـ junior: [[How long will this take?]]. والغلطتين المشهورتين: رقم متفائل جدًا عشان تبان سريع ([[One day!]])، أو [[I don't know]] وخلاص.

الإجابة الصح فيها ٣ حاجات: مدى مش رقم ([[two to three days]])، وافتراض ([[assuming the API is ready]])، ومخاطرة لو فيه ([[if we need to change the schema, add a day]]). ولو محتاج تفكر: [[Let me look into it and give you an estimate by end of day.]] دي إجابة محترمة جدًا.

كلمات التقدير: [[roughly]] و [[about]] و [[around]] (تقريبًا)، و [[a ballpark]] (رقم تقريبي جدًا: [[Can you give me a ballpark?]])، و [[at least]] و [[at most]]، و [[best case / worst case]]، و [[realistically]] (بواقعية).`,
          example: R`Q: How long do you think this will take?
A: Roughly two to three days, assuming the design is final.
A: If we also need to change the database schema, I'd add another day.
A: Best case, I can have it done by Wednesday. Realistically, Thursday.
A: I'm not sure yet. Let me look into it and give you an estimate by end of day.
Q: Can you give me a ballpark?
A: A ballpark would be one to two weeks, but I'd like to break it down first.
A: The unknown part is the payment provider. I haven't worked with their API before.
A: I'll update you tomorrow if it looks bigger than I thought.`,
          try: R`خد ٣ فيتشرز من مشروعك أو من «تاب المشاريع» (مثلًا: login بـ Google، أو export لـ CSV، أو notifications)، ولكل واحدة قول بصوت عالي تقدير فيه: مدى، وافتراض، ومخاطرة. وبعدين قول للأصعب فيهم جملة «مش متأكد، هرجعلك».`,
          flag: "script",
          deep: {
            why: R`التقديرات هي أكتر مصدر لفقدان الثقة في المبرمجين: وعد بيوم، وخلص في أسبوع. والتقدير اللي فيه افتراضات بيحميك: لو الافتراض اتكسر (التصميم اتغير)، الكل عارف إن التقدير اتغير. ودي مش فهلوة، دي الطريقة المهنية.`,
            how: R`قبل ما ترد: قسّم في دماغك (أو على ورقة) الحاجة لأجزاء، وقدّر كل جزء، وجمّعهم، وزوّد هامش للمجهول (المبرمجين عمومًا بيقللوا التقدير).

عبارات الافتراض: [[assuming...]]، و [[as long as...]]، و [[if ... , then ...]]، و [[that depends on...]].

عبارات المجهول: [[The unknown part is...]]، و [[I haven't worked with X before]]، و [[That's the risky part]].

الـ follow-up: [[I'll update you if it looks bigger]]. ولو فعلًا طلع أكبر، قول بدري (درس [[follow up و تأخير]] في «تاب إنجليزي للمبرمج: قراية وكتابة»).

ولو حد ضغط ([[Can't you do it in one day?]]): درس «That's doable, but» الجاي.

وخلي بالك من الفرق: [[effort]] (قد إيه شغل: ٣ أيام شغل) و [[duration]] (هيخلص إمتى: لو عندك تاسكات تانية، ٣ أيام شغل ممكن تبقى أسبوع).`,
            when: "sprint planning، ولما مديرك أو العميل يسأل «هتخلص إمتى؟»، وفي الانترفيو (take-home: «how long did it take you?»).",
            mistakes: R`[[Tomorrow inshallah]] لحاجة كبيرة. و [[I don't know]] من غير «هرجعلك». ورقم واحد من غير افتراض. و [[It's easy]] (أخطر جملة: كل حاجة easy لحد ما تبدأ). وتقدير effort على إنه duration. و [[2-3 days]] وبعدين تسكت ومتقولش لما يطلع ٥.`
          },
          lines: [
            R`السؤال: «تفتكر هتاخد قد إيه؟»`,
            R`مدى + افتراض: «تقريبًا ٢ لـ ٣ أيام، بافتراض إن التصميم نهائي».`,
            R`مخاطرة: «لو كمان محتاجين نغير الـ schema، هزوّد يوم».`,
            R`أحسن حالة وواقعي: «أحسن حالة الأربع، بواقعية الخميس».`,
            R`«مش متأكد لسه. هبص عليها وأديك تقدير آخر اليوم».`,
            R`«ممكن رقم تقريبي؟» ballpark = تقريبي جدًا.`,
            R`«رقم تقريبي أسبوع لاتنين، بس عايز أقسّمها الأول». break it down = أقسّمها.`,
            R`«الجزء المجهول هو مزوّد الدفع. مشتغلتش مع الـ API بتاعهم قبل كده».`,
            R`«هبلّغك بكرة لو طلعت أكبر من اللي فاكره».`
          ],
          sol: R`نماذج:
[[Login with Google: about one day, assuming we use the library we already have for auth. If we need to merge accounts with the same email, add half a day.]]
[[Export to CSV: a few hours for the basic version. If it has to handle 100,000 rows, I'd need to stream it, so maybe a day.]]
[[Notifications: I'm not sure yet. It depends on whether we need push notifications or just email. Let me look into it and get back to you tomorrow.]]

راجع: كل تقدير فيه مدى أو [[about]]؟ فيه [[assuming]] أو [[if]]؟ والأخير فيه وعد برد بميعاد؟ الإجابة الضعيفة: [[One day]] للتلاتة.`
        },
        {
          cmd: "That's doable, but",
          title: "«That's doable, but...»: تقول لأ أو تتفاوض على الوقت في الاجتماع",
          desc: R`الدرس المكتوب في [[تقول لأ بأدب]] في «تاب إنجليزي للمبرمج: قراية وكتابة». هنا نفس الفكرة بالكلام، في اجتماع، والكل بيبصلك. والفرق إنك مفيش وقت تفكر، فمحتاج جمل «تشتري» بيها ثانيتين وتفتح التفاوض.

الجملة الأشهر: [[That's doable, but...]] = ممكن، بس.... بتقول «آه» وبعدين الشرط أو التمن. وأخواتها: [[I can do that if...]]، و [[That would mean...]] (يعني كده...)، و [[Something would have to give]] (حاجة لازم تتشال)، و [[What's the priority?]].

والفكرة الأساسية زي المكتوب: متقولش «لأ» ناشفة، ومتقولش «آه» وانت عارف إنها مستحيلة. قول التمن واسيبهم يختاروا.`,
          example: R`That's doable, but it means the search feature moves to next sprint.
I can do that by Friday if we skip the admin export for now.
That would mean cutting the tests, and I'd rather not do that for payments.
Hmm, that's tight. Can I get back to you after I check the API docs?
I see why it's important. What if we ship a simple version on Friday and improve it next week?
If we add this, something else has to give. Which one is more important?
To be honest, I don't think Friday is realistic. Tuesday is more likely.
I'm happy to try, but I want to flag the risk now rather than on Thursday.`,
          try: R`تخيّل مديرك قالك في اجتماع: [[Can we also add dark mode before the release on Thursday?]] ودا محتاج يومين وانت عندك يوم ونص. قول بصوت عالي ٣ ردود مختلفة (سجّلهم): واحد بـ [[That's doable, but...]]، وواحد بـ [[What if we...]]، وواحد بـ [[To be honest...]].`,
          flag: "script",
          deep: {
            why: R`في مصر ثقافة «حاضر» قوية، وفي فرق برا دي بتتفهم «وعد». ولو الوعد ماتنفذش، الثقة بتقع. واللي بيقول التمن في الاجتماع، قدام الكل، بيبان senior وبيحمي نفسه والفريق.`,
            how: R`اشتري وقت: [[Hmm, let me think.]]، و [[That's tight.]] (ضيق)، و [[Good question.]]. وبعدين الجملة.

التمن: [[That means X moves to next sprint]]، و [[We'd have to skip X]]، و [[The risk is Y]]، و [[It would cost us Z]].

البديل: [[What if we...?]]، و [[How about a simpler version first?]]، و [[Could we do X now and Y later?]]، و [[An MVP by Friday, the full thing next week.]]

الأولوية: [[Which one is more important?]]، و [[What's the priority here?]]. دي بترجع القرار للي عنده السلطة.

التحذير: [[I want to flag a risk...]] = عايز أنبه لخطر. و [[rather than on Thursday]] = بدل ما أقولها الخميس. دي بتوري إنك بتفكر قدام.

والنبرة: هادية، ومش دفاعية. ابتسامة صغيرة مع [[That's tight]] بتفرق.`,
            when: "planning، ولما حد يزود scope في نص الـ sprint، ولما يتطلب deadline مش واقعي.",
            mistakes: R`[[Impossible!]] (درامية). و [[OK]] وانت عارف إنها مستحيلة. و [[I will try]] (بتتفهم «آه»). ودفاع طويل عن نفسك ([[Because I have too much work and nobody helps me and...]]). و [[No, I can't]] من غير بديل ولا سبب.`
          },
          lines: [
            R`«ممكن، بس يعني البحث هيتنقل للـ sprint الجاي». doable = ممكن يتعمل.`,
            R`«أقدر أخلصها الجمعة لو أجّلنا الـ admin export دلوقتي».`,
            R`«ده معناه نشيل الاختبارات، وأفضّل منعملش كده في الدفع». rather not = أفضّل لأ.`,
            R`«امم، ده ضيق. ممكن أرجعلك بعد ما أشوف الـ docs؟» tight = ضيق.`,
            R`«فاهم إنها مهمة. إيه رأيك ننزّل نسخة بسيطة الجمعة ونحسّنها الأسبوع الجاي؟»`,
            R`«لو ضفنا دي، حاجة تانية لازم تتشال. أنهي أهم؟» something has to give = لازم تضحية.`,
            R`«بصراحة، مش شايف الجمعة واقعية. التلات أقرب».`,
            R`«مستعد أحاول، بس عايز أنبّه للخطر دلوقتي بدل الخميس». flag = أنبّه.`
          ],
          sol: R`٣ ردود نموذجية:
[[That's doable, but it means the notifications fix moves to after the release. Is that OK?]]
[[What if we ship dark mode for the main pages on Thursday, and the settings pages next week?]]
[[To be honest, I don't think a full dark mode is realistic by Thursday. It needs about two days, and I have one and a half. I'd rather do it properly next week.]]

راجع التسجيل: كل رد فيه تمن أو بديل؟ النبرة هادية؟ مفيش [[I will try]]؟ الإجابة الضعيفة: [[OK, I will try my best]]، ودي في الحقيقة وعد مش هيتنفذ.`
        },
        {
          cmd: "disagree بأدب",
          title: "تختلف في رأي تقني في اجتماع: «I see your point, but...»",
          desc: R`الخلاف التقني عادي وصحي في أي فريق كويس، والشركات برا بتتوقع منك تقول رأيك حتى لو junior. بس الطريقة بتفرق جدًا: الإنجليزي في الشغل «ناعم» أكتر من العربي. الجملة اللي بتتقال بالعربي عادي («لأ، ده غلط») بتتسمع بالإنجليزي عدوانية.

التركيبة: ١) اعترف بالرأي التاني: [[I see your point]] أو [[That makes sense]] أو [[I agree that...]]. ٢) قدّم رأيك كرأي مش كحقيقة: [[I'm not sure that...]] أو [[My concern is...]] أو [[I wonder if...]]. ٣) السبب أو الداتا. ٤) اقتراح أو سؤال: [[What if we...?]] أو [[Could we test both?]].

ولو القرار اتاخد عكس رأيك: [[OK, I'm happy to go with that.]] ده الـ «disagree and commit» اللي فيه درس كامل في «تاب الانترفيو»: [[disagree and commit]].`,
          example: R`I see your point, but I'm worried about the extra complexity.
That makes sense for now. My concern is what happens when we have ten times more users.
I agree that Redis would be faster. I'm just not sure we need it yet.
I wonder if we could solve this with an index first, before adding a cache.
Could we measure it first? Then we'll know if the query is really the problem.
I might be missing something, but wouldn't this break the mobile app?
I see it a bit differently. For me, the bigger risk is the migration, not the performance.
OK, fair enough. I'm happy to go with that. Let's revisit it if we see problems.`,
          try: R`اختار خلاف تقني حقيقي (مثلًا: tabs ولا spaces، أو REST ولا GraphQL، أو ORM ولا SQL خام، أو monorepo). سجّل نفسك وانت بترد على زميل رأيه عكسك في ٣–٤ جمل بالتركيبة الرباعية. وبعدين سجّل الجملة اللي بتقولها لو القرار اتاخد عكسك.`,
          flag: "script",
          deep: {
            why: R`الـ junior اللي عمره ما بيختلف بيبان مش بيفكر، واللي بيختلف بشكل ناشف بيبان صعب في الشغل. والتوازن ده من أهم حاجات الـ culture fit، ومتقيّم في الانترفيو بسؤال مباشر («tell me about a disagreement»، وليه قصة كاملة في درس «STAR: خلاف»).`,
            how: R`الـ softeners (مليّنات): [[I think]]، و [[I feel like]]، و [[maybe]]، و [[I'm not sure]]، و [[I might be wrong, but]]، و [[a bit]]. بتحوّل الحقيقة لرأي، ودي بتفتح نقاش بدل ما تقفله.

الأسئلة بدل الجمل: [[Wouldn't this break...?]] أقوى وألطف من [[This will break...]]. وسؤال [[What would happen if...?]] بيخلي التاني يكتشف المشكلة بنفسه.

الداتا: [[Could we measure it first?]]، و [[Do we have numbers on that?]]، و [[Let's try both and compare]]. الخلاف بالداتا بيتحل، الخلاف بالرأي بيطول.

الإنهاء: [[Fair enough]] = ماشي، منطقي. و [[Let's revisit it if...]] = نرجعلها لو.... و [[I'm happy to go with that]] = موافق أمشي بيها.

ولو الخلاف سخن: [[Maybe we can take this offline and come back with a proposal?]] = نكمّل بعدين بره الاجتماع.`,
            when: "code review بالصوت، و design discussions، و planning. مش في الـ standup (الـ standup للـ updates).",
            mistakes: R`[[No, you're wrong.]] و [[This is wrong.]] (ناشفة جدًا بالإنجليزي). و [[With all due respect...]] (بتتسمع إن اللي جاي إهانة!). و [[I am disagree]] (الصح [[I disagree]]، والأحسن [[I see it differently]]). وتسكت في الاجتماع وتشتكي بعده. وتفضل تجادل بعد ما القرار اتاخد.`
          },
          lines: [
            R`«فاهم وجهة نظرك، بس قلقان من التعقيد الزيادة». I see your point = فاهمك.`,
            R`«منطقي دلوقتي. قلقي هو لما يبقى عندنا ١٠ أضعاف اليوزرز». concern = قلق.`,
            R`«موافق إن Redis أسرع. بس مش متأكد إننا محتاجينه دلوقتي».`,
            R`«بتساءل لو ممكن نحلها بـ index الأول، قبل ما نضيف cache». I wonder if = اقتراح لطيف.`,
            R`«ممكن نقيس الأول؟ ساعتها هنعرف لو الـ query هي المشكلة فعلًا».`,
            R`«يمكن فايتني حاجة، بس مش ده هيكسر تطبيق الموبايل؟» سؤال بدل اتهام.`,
            R`«أنا شايفها مختلف شوية. بالنسبالي الخطر الأكبر في الـ migration».`,
            R`«ماشي، منطقي. موافق نمشي بيها. نرجعلها لو شفنا مشاكل». revisit = نرجع نبص.`
          ],
          sol: R`مثال (ORM ولا SQL خام، وزميلك عايز SQL خام):
[[I see your point: raw SQL gives us more control, and it's faster for complex reports. My concern is that we're a small team, and Prisma gives us type safety and migrations for free. What if we use Prisma for most things and raw SQL just for the heavy reports?]]

ولو القرار اتاخد عكسك: [[OK, fair enough. I'm happy to go with raw SQL. Let's revisit it in a couple of months if the queries get hard to maintain.]]

راجع: فيه اعتراف بالرأي التاني؟ رأيك متقدم كـ «concern» مش حقيقة؟ فيه اقتراح؟ الإجابة الضعيفة: [[No, ORM is better because it's better.]]`
        },
        {
          cmd: "مش عارف في اجتماع",
          title: "حد سألك سؤال ومش عارف الإجابة: «I'm not sure, let me check»",
          desc: R`هيحصل كتير، خصوصًا في أول شغلك: حد في الاجتماع يسأل [[Why is this endpoint slow?]] أو [[What happens if the payment fails twice?]] وانت مش عارف. والغلطتين: إنك تخترع إجابة، أو تسكت وتتوتر.

الإجابة الصح: ١) قول إنك مش متأكد، بوضوح. ٢) قول اللي انت عارفه (لو فيه). ٣) قول هتعمل إيه وإمتى. [[I'm not sure, to be honest. I know the retry logic is in the webhook handler, but I haven't tested that case. Let me check and get back to you by tomorrow.]]

دي إجابة قوية جدًا، مش ضعيفة. الـ «I don't know» اللي معاها خطة هي أكتر حاجة بتبني ثقة. والإجابة المخترعة اللي بتطلع غلط هي أكتر حاجة بتهدها.`,
          example: R`Good question. I'm not sure, to be honest.
I don't know off the top of my head. Let me check and get back to you.
I know the retry logic is in the webhook handler, but I haven't tested that case.
My guess is it's the missing index, but I'd need to confirm that.
I'd rather not guess. I'll look into it after the call and update the ticket.
That's outside my area. Omar would know better. Omar, any idea?
I'll find out and post the answer in the channel by tomorrow morning.
I'm not sure what you mean by "sync". Do you mean the cron job or the webhook?`,
          try: R`اطلب من حد (أو AI) يسألك ٥ أسئلة تقنية صعبة عن مشروعك أو عن حاجة بتذاكرها، وجاوب على الأسئلة اللي مش متأكد منها بالتركيبة التلاتية (مش متأكد + اللي أعرفه + هعمل إيه). ممنوع تخترع. سجّل.`,
          flag: "script",
          deep: {
            why: R`في ثقافة الشغل برا، [[I don't know, but I'll find out]] جملة محترمة جدًا ومتوقعة. والتخمين اللي بيتقدم كحقيقة لما يطلع غلط بيخلّي الناس تشك في كل كلامك بعد كده. وفي الانترفيو، الإنترفيوير أحيانًا بيسأل سؤال عارف إنك مش هتعرفه عشان يشوف هتعمل إيه.`,
            how: R`عبارات «مش عارف»: [[I'm not sure]]، و [[I don't know off the top of my head]] (مش في دماغي دلوقتي)، و [[I'd need to check]]، و [[I haven't looked into that yet]].

عبارات «اللي أعرفه»: [[What I do know is...]]، و [[I know that..., but...]]، و [[My guess is..., but I'd need to confirm]] (تخمين معلن إنه تخمين = تمام).

عبارات الخطة: [[Let me check and get back to you]]، و [[I'll look into it after the call]]، و [[I'll find out and post it in the channel by...]]. والأهم: اعمل كده فعلًا.

توجيه لحد تاني: [[Omar would know better]]، و [[That's more of a question for the backend team]].

ولو السؤال نفسه مش واضح (مش الإجابة): اسأل عن السؤال ([[Do you mean X or Y?]]). ساعات بتكتشف إنك عارف الإجابة.`,
            when: "أي سؤال في اجتماع أو review أو انترفيو، مش متأكد من إجابته.",
            mistakes: R`تخترع إجابة بثقة. و [[I don't know]] وتسكت (من غير خطة). و [[It's not my fault]] أو [[Nobody told me]] (دفاعي). و [[I will search]] (الأوضح [[I'll look into it]]). وتقول [[let me check]] ومترجعش خالص: دي أسوأ من إنك متقولهاش.`
          },
          lines: [
            R`«سؤال حلو. مش متأكد بصراحة». بيشتري ثانية ويعترف.`,
            R`«مش في دماغي دلوقتي. هشوف وأرجعلك». off the top of my head = من الذاكرة حالًا.`,
            R`اللي تعرفه: «عارف إن الـ retry في الـ webhook handler، بس مجربتش الحالة دي».`,
            R`تخمين معلن: «تخميني إنه الـ index الناقص، بس محتاج أتأكد».`,
            R`«أفضّل مخمّنش. هبص عليها بعد المكالمة وأحدّث التيكت».`,
            R`«دي برا منطقتي. عمر هيعرف أحسن. عمر، عندك فكرة؟»`,
            R`«هعرف وأكتب الإجابة في القناة قبل بكرة الصبح».`,
            R`السؤال مش واضح: «مش فاهم قصدك بـ sync. قصدك الـ cron job ولا الـ webhook؟»`
          ],
          sol: R`مثال لسؤال صعب: [[How would your app handle 10,000 users at the same time?]]
إجابة كويسة: [[To be honest, I haven't load-tested it, so I'm not sure. What I do know is that the database has indexes on the main queries, and the API is stateless, so we could run more instances. My guess is the first bottleneck would be the database connections, but I'd need to test that with a tool like k6 to confirm.]]

راجع: ولا إجابة مخترعة؟ كل «مش عارف» معاها حاجة تعرفها أو خطة؟ التسجيل الضعيف: [[Yes, it can handle it]] من غير أي أساس، أو [[I don't know]] وسكوت.`
        },
        {
          cmd: "تقاطع وتاخد دورك",
          title: "تاخد دورك في الكلام وتقاطع بأدب: «Can I jump in?» و «Sorry, go ahead»",
          desc: R`في اجتماع فيه ٥–٦ أشخاص بيتكلموا إنجليزي بسرعة، الـ junior اللي إنجليزيته ضعيفة غالبًا بيفضل ساكت لأنه مستني «فرصة». والفرصة مش هتيجي لوحدها. محتاج جمل تدخل بيها الكلام بأدب.

الدخول: [[Can I jump in here?]] أو [[Sorry to interrupt, but...]] أو [[Can I add something?]] أو [[Just a quick question...]]. ولو في Zoom أو Meet: استخدم زرار «raise hand» أو اكتب في الشات [[Quick question when there's a moment]].

لما حد يقاطعك: [[Sorry, can I just finish this point?]] (بأدب، وبنبرة هادية). ولما تتكلموا مع بعض: [[Sorry, go ahead]].

والرجوع لنقطة فاتت: [[Going back to what Sara said...]] أو [[Just to go back to the caching point for a second...]].`,
          example: R`Can I jump in here for a second?
Sorry to interrupt, but I think that affects the mobile app too.
Can I add something? We had the same problem last month.
Just a quick question before we move on: who owns the migration?
Sorry, can I just finish this point? It's quick.
Oh sorry, go ahead. / No, please, you go first.
Going back to what Sara said about caching, I think she's right.
Building on Omar's idea, what if we also log the failed payments?
I haven't heard from Lina yet. Lina, what do you think?`,
          try: R`اتفرج على podcast أو panel تقني على YouTube فيه ٣ أشخاص أو أكتر بيتكلموا (مثلًا من Syntax أو أي مؤتمر). كل ما حد يقاطع حد أو ياخد دوره، وقّف واكتب الجملة اللي استخدمها. وبعدين قول ٥ جمل من المثال بصوت عالي بنبرة واثقة، وسجّل.`,
          flag: "script",
          deep: {
            why: R`اللي مبيتكلمش في الاجتماعات بيبان مش فاهم أو مش مهتم، حتى لو هو أشطر واحد في الفريق. وفي تقييمات الأداء، «communication» و «visibility» بيتحسبوا. والجمل دي بتخليك تدخل الكلام من غير ما تبان قليل الذوق.`,
            how: R`التوقيت: ادخل في آخر جملة حد، مش في نصها. استنى نفَس أو سكتة صغيرة. ولو الكلام ماشي بسرعة، [[Can I jump in?]] بصوت أعلى شوية، وبعدين استنى ثانية.

[[Building on...]] = بكمّل على فكرة فلان: ألطف طريقة تدخل بيها لأنك بتدعم حد مش بتعارضه.

[[Going back to...]] = مفيدة جدًا للي بيفكر ببطء بالإنجليزي: مش لازم ترد على طول، ممكن ترجع للنقطة بعد دقيقتين.

والعكس: لو انت اللي بتدير الاجتماع أو شايف حد ساكت: [[I haven't heard from X yet. What do you think?]] دي بتبين إنك team player.

في الشات: كتير من الاجتماعات الـ remote الناس بتكتب في الشات وهي بتسمع. ده مكان كويس لو الكلام صعب عليك: [[+1 to Sara's point]] أو [[Quick question: ...]].`,
            when: "أي اجتماع فيه أكتر من ٣ أشخاص: planning، و retro، و design review.",
            mistakes: R`تسكت الاجتماع كله. تقاطع في نص جملة حد من غير [[sorry]]. و [[Wait wait wait]] (بتتسمع حادة). و [[Let me talk]] (أمر). وتتكلم مع حد في نفس الوقت وتكمّل بدل ما تقول [[sorry, go ahead]]. وتبدأ نقطة جديدة خالص وسط نقاش تاني من غير [[before we move on]] أو [[on a different topic]].`
          },
          lines: [
            R`«ممكن أدخل هنا ثانية؟» jump in = أدخل الكلام.`,
            R`«آسف إني بقاطع، بس أظن ده بيأثر على تطبيق الموبايل كمان».`,
            R`«ممكن أضيف حاجة؟ حصلتلنا نفس المشكلة الشهر اللي فات».`,
            R`«سؤال سريع قبل ما نكمّل: مين مسؤول عن الـ migration؟» owns = مسؤول عن.`,
            R`لما حد يقاطعك: «آسف، ممكن أكمّل النقطة دي؟ سريعة».`,
            R`لما تتكلموا مع بعض: «آسف، اتفضل» أو «لا، اتفضل انت الأول».`,
            R`«نرجع لكلام سارة عن الـ caching، أظن معاها حق».`,
            R`«بناءً على فكرة عمر، إيه رأيكم نسجّل كمان الدفعات الفاشلة؟» building on = بكمّل على.`,
            R`تدّي حد تاني دور: «لسه مسمعناش من لينا. لينا، رأيك إيه؟»`
          ],
          sol: R`الجمل اللي هتلاقيها في الـ podcasts: [[Can I jump in?]]، و [[Yeah, and also...]]، و [[To add to that...]]، و [[Sorry, go ahead]]، و [[I was going to say...]]، و [[Right, right, and...]]. لاحظ إنهم بيستخدموا [[Yeah, and...]] كتير عشان يدخلوا: ده بيدعم الكلام قبل ما يضيف.

التسجيل الواثق: [[Can I jump in here?]] بنبرة طالعة وسرعة عادية، مش مهموسة. و [[Sorry to interrupt, but...]] بتتقال بسرعة، الأهمية للي بعد [[but]].

علامة التحسن الحقيقية: في الاجتماع الجاي، اتكلم مرة واحدة على الأقل بجملة من دول. مرة واحدة كفاية للأسبوع الأول.`
        },
        {
          cmd: "So to recap",
          title: "تلخّص آخر الاجتماع: «So to recap...» و action items ومين هيعمل إيه",
          desc: R`أكتر مهارة بتفرق بين حد «حاضر» وحد «بيقود» في أي اجتماع: التلخيص في الآخر. دقيقة واحدة بتقول فيها: قررنا إيه، ومين هيعمل إيه، وإمتى. ولو انت الـ junior اللي بيعمل ده، ده بيتلاحظ جدًا.

الجمل: [[So to recap...]] أو [[Just to summarize...]] أو [[Before we wrap up, let me make sure we're on the same page]]. وبعدين: [[We agreed that...]]، و [[Action items: ...]]، و [[I'll ... by ...]]، و [[Omar will ...]]، و [[The open question is ...]]. وآخرها: [[Did I miss anything?]] و [[I'll post the notes in the channel.]]

وخلي بالك: التلخيص بتاعك لازم يكون بـ «مين» و «إمتى»: [[someone should look at the logs]] مش action item. [[Omar will check the logs by Wednesday]] هو الـ action item.`,
          example: R`OK, before we wrap up, let me quickly recap.
We agreed to go with cursor pagination and skip the page numbers for now.
Action items: I'll update the API and open a PR by Wednesday.
Omar will check how the mobile app uses the endpoint.
Sara will ask the product team if page numbers are a must-have.
The open question is whether we need to support old app versions.
Did I miss anything?
Great. I'll post the notes in the channel after the call.
Thanks, everyone!`,
          try: R`اتفرج على أي اجتماع أو podcast تقني ١٠ دقايق (أو استخدم آخر اجتماع حضرته)، واكتب recap بالشكل ده: قرار واحد، و ٣ action items (مين + إيه + إمتى)، وسؤال مفتوح. قوله بصوت عالي في أقل من دقيقة، وبعدين اكتبه كرسالة Slack.`,
          flag: "script",
          deep: {
            why: R`اجتماعات كتير بتخلص والكل فاكر إن حد تاني هيعمل الحاجة. والتلخيص بيمنع ده. واللي بيلخّص بيتشاف إنه منظم وفاهم، وده بيسرّع الترقية. وكمان للي إنجليزيته ضعيفة: التلخيص بيخليك تتأكد إنك فهمت الاجتماع صح (لو غلط، هيصححوك).`,
            how: R`اكتب وانت بتسمع: ٣ عناوين على ورقة: Decisions و Actions و Questions. كل ما حد يقول [[OK, let's do that]] دي decision. كل ما حد يقول [[I'll...]] أو [[Can you...]] دي action. وقرب الآخر هيبقى التلخيص جاهز.

صيغة الـ action item: [[Who + will + verb + what + by when]]. [[I'll update the API by Wednesday.]]

ولو محدش حدد مين: [[Who's going to take the logs?]] أو [[Should I take that one?]] (لو عايز تاخدها).

والجمل اللي بتنهي الاجتماع: [[Let's wrap up]]، و [[I think we're done]]، و [[Let's call it here]]، و [[I'll let you go]] (مؤدبة، يعني مش هعطلكم أكتر).

ورسالة الـ Slack بعدها بنفس الشكل: [[Notes from today's call:]] وبعدين bullets.`,
            when: "آخر أي اجتماع فيه قرارات، وخصوصًا مع عميل (التلخيص المكتوب بعد المكالمة بيحميك من «مش ده اللي اتفقنا عليه»).",
            mistakes: R`[[We will do it]] (مين؟ إمتى؟). وتلخيص طويل بيعيد الاجتماع كله. وإنك متسألش [[Did I miss anything?]]. وتقول [[I'll post the notes]] ومتبعتهاش. و [[Recap]] بعد ما الناس بدأت تخرج (قولها قبل آخر ٣ دقايق).`
          },
          lines: [
            R`«تمام، قبل ما نقفل، خليني ألخّص بسرعة». wrap up = ننهي.`,
            R`القرار: «اتفقنا نمشي بالـ cursor pagination ونشيل أرقام الصفحات دلوقتي».`,
            R`action item ليك: «هحدّث الـ API وأفتح PR قبل الأربع».`,
            R`action item لعمر: «عمر هيشوف تطبيق الموبايل بيستخدم الـ endpoint إزاي».`,
            R`«سارة هتسأل فريق المنتج لو أرقام الصفحات لازمة». must-have = ضروري.`,
            R`السؤال المفتوح: «هل محتاجين ندعم إصدارات التطبيق القديمة».`,
            R`«نسيت حاجة؟»`,
            R`«تمام. هنزّل الملاحظات في القناة بعد المكالمة».`,
            R`«شكرًا يا جماعة!»`
          ],
          sol: R`مثال recap:
[[So to recap: we agreed to launch the beta on the 15th. Action items: I'll fix the signup bug by Tuesday. Mona will prepare the onboarding emails by Thursday. Ahmed will set up the analytics before launch. The open question is the pricing page; we'll decide next week. Did I miss anything?]]

رسالة Slack:
[[Notes from today's call:]]
[[- Decision: beta launch on the 15th]]
[[- Me: fix signup bug (Tue)]]
[[- Mona: onboarding emails (Thu)]]
[[- Ahmed: analytics (before launch)]]
[[- Open: pricing page, decide next week]]

راجع: كل action فيه اسم وميعاد؟ أقل من دقيقة بالصوت؟ التلخيص الضعيف: [[So we discussed many things and we will work on them.]]`
        }
      ]
    },
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
    },
    {
      t: "تشرح مفهوم تقني ببساطة",
      l: 3,
      n: "قالب شرح أي مفهوم (تعريف ← تشبيه ← مثال ← trade-off)، وإجابات نموذجية بالإنجليزي للـ event loop و REST و الـ indexes",
      items: [
        {
          cmd: "قالب الشرح",
          title: "تشرح أي مفهوم تقني بالإنجليزي في ٤ خطوات: definition ← analogy ← example ← trade-off",
          desc: R`أسئلة «Explain X» ([[Explain the event loop]] و [[What is REST?]] و [[What's an index?]]) بتقيس حاجتين: فاهم ولا حافظ، وتعرف توصّل ولا لأ. واللي إنجليزيته ضعيفة بيحاول يقول تعريف طويل محفوظ من article، ويتوه في نصه.

القالب ده بيحل المشكلة، وكل خطوة جملة أو اتنين قصيرين:
١) Definition: جملة واحدة بسيطة. [[X is a ... that ...]]
٢) Analogy: تشبيه من الحياة. [[You can think of it like ...]]
٣) Example: مثال من الكود أو من مشروعك. [[For example, in my project, ...]]
٤) Trade-off / when: إمتى تستخدمه وإمتى لأ، أو عيبه. [[The downside is ...]] أو [[You'd use it when ...]]

وفي الآخر: [[Does that answer your question?]] أو [[Should I go deeper into any part?]]. ده بيسيب الإنترفيوير يوجّهك بدل ما تقول كل حاجة.`,
          example: R`Definition:  A cache is a fast storage layer that keeps copies of data we use often.
Analogy:  You can think of it like keeping your most-used tools on your desk instead of in the store room.
Example:  For example, in my project, I cached the product list in Redis for 60 seconds, because it was read thousands of times and changed rarely.
Trade-off:  The downside is that the data can be stale, so you need to decide how long to keep it, or clear it when the data changes.
When:  I'd use it for data that's read a lot and changes rarely, not for things like account balances.
Close:  Should I go deeper into cache invalidation?`,
          try: R`اختار مفهوم تعرفه كويس (مثلًا [[Git branch]] أو [[environment variables]] أو [[JWT]] أو [[Docker container]])، واكتب شرحه بالقالب في ٥ جمل. سجّله في أقل من دقيقة. وبعدين اسمعه واسأل: لو حد مش مبرمج سمع التشبيه، هيفهم الفكرة؟`,
          flag: "script",
          deep: {
            why: R`الإنترفيوير سمع التعريف المحفوظ ١٠٠ مرة. التشبيه والمثال من مشروعك هما اللي بيوروا إنك فاهم فعلًا. والقالب بيخلي إجابتك منظمة حتى لو الإنجليزي بسيط، ودي أهم من الإنجليزي المعقد.`,
            how: R`عبارات لكل خطوة:
التعريف: [[X is a ... that ...]]، و [[Basically, X lets you ...]]، و [[In simple terms, ...]].
التشبيه: [[You can think of it like ...]]، و [[It's similar to ...]]، و [[Imagine ...]].
المثال: [[For example, ...]]، و [[In my project, I used it to ...]]، و [[A common case is ...]].
الـ trade-off: [[The downside is ...]]، و [[The trade-off is ...]]، و [[It's great for ..., but not for ...]].
الختام: [[Does that make sense?]]، و [[Should I go deeper into ...?]].

التشبيهات: اختار تشبيه بسيط ومش مبالغ فيه، وقول حدوده لو فيه ([[The analogy isn't perfect, because ...]]). ده بيبان ناضج.

الوقت: ٤٥–٩٠ ثانية للإجابة الأولى. التفاصيل الأعمق للـ follow-ups.`,
            when: "أي «Explain X» أو «What is X?» أو «What's the difference between X and Y?» في انترفيو، وكمان وانت بتشرح لزميل أو عميل.",
            mistakes: R`تعريف محفوظ طويل بكلمات صعبة ومفيش مثال. تشبيه أطول من الشرح. تبدأ بالتفاصيل ([[So first, the V8 engine...]]). ومتقولش إمتى متستخدمهوش (الـ trade-off هو اللي بيفرق junior عن mid). و [[It's like... how to say... ehh...]]: جهّز تشبيهاتك قبلها.`
          },
          lines: [
            R`التعريف: «الـ cache طبقة تخزين سريعة بتحتفظ بنسخ من الداتا اللي بنستخدمها كتير».`,
            R`التشبيه: «زي ما تحط أكتر أدواتك استخدامًا على المكتب بدل المخزن».`,
            R`المثال: «في مشروعي، عملت cache لقايمة المنتجات في Redis لمدة ٦٠ ثانية، لأنها بتتقري آلاف المرات ونادرًا بتتغير».`,
            R`العيب: «الداتا ممكن تبقى قديمة (stale)، فلازم تحدد تحتفظ بيها قد إيه، أو تمسحها لما تتغير».`,
            R`إمتى: «أستخدمه لداتا بتتقري كتير ونادرًا بتتغير، مش لحاجة زي رصيد الحساب».`,
            R`الختام: «أدخل أعمق في الـ cache invalidation؟»`
          ],
          sol: R`مثال لـ [[environment variables]]:
[[Environment variables are settings that live outside the code, like the database URL or API keys.]] [[You can think of them like the settings on your phone: same app, different settings on each phone.]] [[For example, in my project, the app reads DATABASE_URL, so it connects to a local database on my laptop and to the real one in production, with the same code.]] [[The main reason is security: secrets don't go into Git.]] [[The downside is that if one is missing, the app can fail at runtime, so I validate them when the app starts.]]

راجع التسجيل: أقل من دقيقة؟ التشبيه بسيط؟ فيه مثال من مشروعك؟ فيه downside؟ الإجابة الضعيفة: [[Environment variables are variables of the environment.]] (تعريف بالكلمة نفسها).`
        },
        {
          cmd: "event loop بالإنجليزي",
          title: "«Explain the event loop»: إجابة نموذجية بالإنجليزي",
          desc: R`الشرح التقني الكامل للـ event loop في «تاب JavaScript»: [[event loop]]. هنا الإجابة الإنجليزي اللي تقولها في انترفيو، بالقالب الرباعي، وبجمل قصيرة.

النقط اللي لازم تتقال: JavaScript بتشغل حاجة واحدة في نفس الوقت (single-threaded، call stack واحد). الحاجات البطيئة (timers، و network، و files) بيتعامل معاها المتصفح أو Node برا الـ stack. ولما تخلص، الـ callback بتاعها بيتحط في queue. والـ event loop بيستنى الـ stack يفضى، وبعدين ياخد من الـ queue. والـ promises ليها queue أولويتها أعلى (microtasks)، بتخلص كلها قبل أي timer.

والمثال الكلاسيكي: [[setTimeout(..., 0)]] بيطبع بعد [[Promise.resolve().then(...)]] رغم إن الـ timeout صفر.`,
          example: R`Definition:  The event loop is how JavaScript handles async work even though it runs one thing at a time.
How:  JavaScript has one call stack. Slow things, like timers or network requests, are handled outside it, by the browser or by Node.
How:  When they finish, their callbacks wait in a queue. The event loop takes the next callback only when the stack is empty.
Detail:  Promise callbacks go into a separate microtask queue, and that queue is always emptied first.
Analogy:  You can think of it like a chef who cooks one dish at a time, while the oven and the timers work in the background and ring when they're done.
Example:  That's why setTimeout with zero logs after a resolved promise: the promise is a microtask, the timeout is a normal task.
Trade-off:  The downside is that a long synchronous loop blocks everything, including clicks, so heavy work should go to a worker or be split up.
Close:  Should I walk through a code example?`,
          try: R`سجّل الإجابة دي بكلامك في أقل من ٩٠ ثانية، من النقط بس ([[one stack → outside → queue → loop waits → microtasks first → blocking]]). وبعدين جاوب بصوت عالي على follow-up: [[What would this log? console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);]]`,
          flag: "script",
          deep: {
            why: R`سؤال الـ event loop من أشهر أسئلة انترفيو JavaScript و Node للـ juniors. وأغلب الناس بتحفظ رسمة ومتعرفش تشرحها بالكلام. الإجابة المنظمة بجمل بسيطة بتفرق جدًا.`,
            how: R`نطق الكلمات: [[queue]] «كيو»، و [[asynchronous]] «إيْسِنكرِنَس»، و [[synchronous]] «سِنكرِنَس»، و [[microtask]] «مايكرو-تاسك»، و [[callback]] «كول-باك»، و [[thread]] بـ ث.

كلمات لازم تبقى جاهزة: [[call stack]]، و [[single-threaded]]، و [[task queue]] أو [[callback queue]] أو [[macrotask queue]]، و [[microtask queue]]، و [[blocking]]، و [[non-blocking]]، و [[Web APIs]] (في المتصفح) و [[libuv]] (في Node).

الـ follow-up الكلاسيكي: الناتج [[1, 4, 3, 2]]. وقوله بالشرح: [[1 and 4 are synchronous, so they run first. Then the stack is empty, so the microtask runs: 3. Then the timer callback: 2.]]

ولو اتسألت عن Node بالتحديد: [[In Node, the event loop has phases, like timers, I/O callbacks and check for setImmediate, and process.nextTick runs even before promise callbacks.]] قول ده بس لو اتسألت، ولو مش متأكد من التفاصيل قول [[I'd need to check the exact order of phases]].`,
            when: "انترفيو JavaScript أو Node أو frontend، وأي سؤال عن async/await أو «why is my UI frozen?».",
            mistakes: R`[[JavaScript is multi-threaded]] (لأ، الكود بتاعك بيشتغل على thread واحد، حتى لو المتصفح و Node عندهم threads تانية). و [[setTimeout 0 runs immediately]]. ورسمة محفوظة من غير مثال. و «كويو» بدل «كيو». و [[await blocks the thread]] (لأ، بيوقف الدالة دي بس ويرجّع التحكم للـ event loop).`
          },
          lines: [
            R`التعريف: «الـ event loop هو إزاي JS بتتعامل مع الشغل الـ async رغم إنها بتشغل حاجة واحدة في المرة».`,
            R`«JS عندها call stack واحد. الحاجات البطيئة بيتعامل معاها المتصفح أو Node برا الـ stack».`,
            R`«لما تخلص، الـ callbacks بتستنى في queue. والـ event loop بياخد الجاي بس لما الـ stack يفضى».`,
            R`«الـ promises ليها microtask queue منفصلة، ودي دايمًا بتفضى الأول».`,
            R`التشبيه: «زي شيف بيطبخ طبق واحد في المرة، والفرن والتايمرز شغالين في الخلفية وبيرنّوا لما يخلصوا».`,
            R`المثال: «عشان كده setTimeout بصفر بيطبع بعد promise متحلّة».`,
            R`العيب: «loop طويل sync بيوقف كل حاجة حتى الكليكات، فالشغل التقيل يروح لـ worker أو يتقسّم».`,
            R`الختام: «أمشي في مثال كود؟»`
          ],
          sol: R`الناتج: [[1]] ثم [[4]] ثم [[3]] ثم [[2]].

الإجابة بالكلام: [[It logs 1, 4, 3, 2. One and four are synchronous, so they run first, in order. When the stack is empty, the event loop runs all microtasks first, so the promise callback logs 3. Then it takes the timer callback from the task queue, and logs 2. Even with zero milliseconds, the timeout has to wait for the stack and the microtasks.]]

الغلط الشائع: [[1, 2, 3, 4]] (فاكر إن كله بالترتيب)، أو [[1, 4, 2, 3]] (فاكر إن الـ timeout بصفر قبل الـ promise). ولو جاوبت صح بس من غير شرح، الإنترفيوير هيسأل «why?»، فالشرح هو الإجابة الحقيقية.`
        },
        {
          cmd: "REST بالإنجليزي",
          title: "«What is REST?» و «PUT vs PATCH»: إجابة نموذجية بالإنجليزي",
          desc: R`الشرح التقني في «تاب الانترفيو»: [[resources + verbs + stateless]]. هنا الإجابة المتكلمة.

النقط: REST طريقة (style) لتصميم APIs فوق HTTP. كل حاجة [[resource]] ليها URL ([[/users/42]]). بتتعامل معاها بالـ HTTP methods: GET تقرا، و POST تعمل جديد، و PUT تستبدل، و PATCH تعدّل جزء، و DELETE تمسح. والـ status codes بتقول النتيجة. و [[stateless]]: كل request فيه كل المعلومات اللي محتاجها (زي الـ token)، والسيرفر مش فاكر الـ request اللي قبله.

وأشهر follow-ups: [[PUT vs PATCH]]، و [[What does idempotent mean?]]، و [[REST vs GraphQL]].`,
          example: R`Definition:  REST is a style for designing APIs over HTTP, where everything is a resource with its own URL.
How:  You use HTTP methods as verbs: GET to read, POST to create, PUT to replace, PATCH to update part of it, and DELETE to remove it.
How:  The status code tells you the result: 200 OK, 201 Created, 404 Not Found, and so on.
Stateless:  It's stateless: every request carries everything the server needs, like the auth token, so any server can handle it.
Analogy:  You can think of resources like files in folders, and the methods like the actions you can do on a file.
Example:  In my project, GET /orders/15 returns one order, and PATCH /orders/15 with a new status updates just that field.
PUT vs PATCH:  PUT replaces the whole resource, PATCH changes only the fields you send.
Idempotent:  PUT and DELETE are idempotent: sending the same request twice gives the same result. POST isn't: it can create two orders.
Trade-off:  REST is simple and cacheable, but the client sometimes needs several requests, or gets more data than it needs. That's where GraphQL can help.`,
          try: R`صمّم بصوت عالي API لـ «blog» (posts و comments) في دقيقة: قول ٤ endpoints بالـ method والـ URL وبيعملوا إيه. وبعدين جاوب بصوت عالي على [[What's the difference between PUT and PATCH?]] و [[Is POST idempotent? Why?]]. سجّل.`,
          flag: "script",
          deep: {
            why: R`REST هو لغة الـ backend اليومية، وسؤاله بييجي في أي انترفيو backend أو full-stack. وقراية الـ URLs والـ methods بصوت عالي مهارة لوحدها ([[GET slash users slash forty-two]]).`,
            how: R`نطق: [[REST]] «رِست»، و [[resource]] «ريزورس» أو «ري-سورس» (الضغط على الأول أو التاني حسب اللهجة)، و [[idempotent]] «آيدِم-پوتِنت» (/ˌaɪdɛmˈpoʊtənt/) الضغط على [[PO]]، و [[stateless]] «ستيْت-لِس» من غير «إ».

قراية الـ URLs: [[/users/42/orders]] = [[slash users slash forty-two slash orders]]، أو في الكلام [[the orders of user forty-two]]. و [[?page=2]] = [[with page equals two]] أو [[query param page two]].

كلمات مفيدة: [[endpoint]]، و [[payload]] أو [[request body]]، و [[query parameters]]، و [[headers]]، و [[versioning]] ([[/v1/]] = [[v one]])، و [[pagination]].

[[REST vs GraphQL]] باختصار: [[With REST, the server decides the shape of the response for each endpoint. With GraphQL, the client asks for exactly the fields it needs in one request. GraphQL is more flexible, but caching and security are harder.]]`,
            when: "أي انترفيو backend أو full-stack، وتصميم API مع زميل، والكلام مع فريق mobile أو frontend.",
            mistakes: R`[[REST is a protocol]] (لأ، style؛ الـ protocol هو HTTP). و [[PUT and PATCH are the same]]. و [[GET /getUsers]] (الـ verb في الـ method مش في الـ URL). و «آيدم-بوتنت» بالضغط على الأول. و [[POST is for sending data and GET is for getting data]] وخلاص (صح بس ناقص جدًا).`
          },
          lines: [
            R`التعريف: «REST أسلوب لتصميم APIs فوق HTTP، كل حاجة فيه resource ليها URL».`,
            R`الـ methods كأفعال: GET تقرا، و POST تعمل، و PUT تستبدل، و PATCH تعدّل جزء، و DELETE تمسح.`,
            R`«الـ status code بيقول النتيجة: 200 و 201 و 404...» and so on = وهكذا.`,
            R`stateless: «كل request فيه كل اللي السيرفر محتاجه زي الـ token، فأي سيرفر يقدر يتعامل معاه».`,
            R`التشبيه: «الـ resources زي ملفات في فولدرات، والـ methods زي العمليات على الملف».`,
            R`المثال: GET بيرجّع أوردر، و PATCH بـ status جديد بيعدّل الخانة دي بس.`,
            R`PUT vs PATCH: «PUT بيستبدل الـ resource كله، و PATCH بيغيّر الخانات اللي بعتها بس».`,
            R`idempotent: «نفس الـ request مرتين = نفس النتيجة. POST لأ: ممكن يعمل أوردرين».`,
            R`العيب: «REST بسيط وبيتعمله cache، بس الـ client ساعات محتاج requests كتير أو بياخد داتا زيادة. هنا GraphQL ممكن يساعد».`
          ],
          sol: R`الـ API بصوت عالي:
[[GET slash posts: returns a list of posts.]]
[[POST slash posts: creates a new post.]]
[[GET slash posts slash id: returns one post.]]
[[POST slash posts slash id slash comments: adds a comment to that post.]]
(ولو ضفت [[PATCH slash posts slash id]] للتعديل و [[DELETE]] للمسح، أحسن.)

[[PUT vs PATCH]]: [[PUT replaces the whole post, so if I send only the title, the body could be lost. PATCH updates only the title.]]
[[Is POST idempotent?]]: [[No. If I send the same POST twice, I can get two posts. That's why payment APIs use an idempotency key.]]

الغلط الشائع: [[GET slash getPosts]] أو [[POST slash deletePost]]: الفعل مكانه الـ method.`
        },
        {
          cmd: "indexes بالإنجليزي",
          title: "«What is a database index?» و «Why not index everything?»: إجابة نموذجية",
          desc: R`الشرح التقني في «تاب PostgreSQL»: [[الـ indexes]]، والتفاصيل الأعمق في «تاب SQL و Prisma»: [[B-tree index]] و [[index trade-offs]]. هنا الإجابة المتكلمة.

النقط: الـ index هيكل بيانات إضافي (غالبًا B-tree) بيخلي الداتابيز تلاقي الصفوف من غير ما تقرا الجدول كله. من غيره: [[full table scan]] (بتقرا كل صف). معاه: بتروح للصف على طول تقريبًا (logarithmic). والتمن: مساحة زيادة، وكل INSERT و UPDATE و DELETE أبطأ شوية لأن الـ index لازم يتحدث. فبتعمل index على الأعمدة اللي بتدوّر بيها أو بتعمل بيها join أو sort كتير، مش على كل حاجة.

والتشبيه الكلاسيكي: فهرس الكتاب في آخره.`,
          example: R`Definition:  An index is an extra data structure that helps the database find rows without reading the whole table.
Analogy:  It's like the index at the back of a book: instead of reading every page, you look up the word and go to the page.
How:  Most indexes are B-trees, so a lookup takes logarithmic time instead of scanning every row.
Example:  In my project, searching orders by customer took about two seconds. After I added an index on customer_id, it took about 30 milliseconds.
Check:  I confirmed it with EXPLAIN ANALYZE: it changed from a sequential scan to an index scan.
Trade-off:  The cost is extra storage, and every insert or update is a bit slower, because the index has to be updated too.
When:  So I index columns I filter, join or sort on often, not every column.
Composite:  For a composite index on (customer_id, created_at), the order matters: it helps queries that filter by customer_id first.`,
          try: R`جاوب بصوت عالي على ٣ أسئلة وسجّل: (١) [[What is an index?]] بالقالب. (٢) [[Why not add an index to every column?]]. (٣) [[A query is slow. How would you find out if it needs an index?]]. كل إجابة أقل من دقيقة.`,
          flag: "script",
          deep: {
            why: R`الـ indexes من أشهر أسئلة الـ backend والداتابيز، ومن أحسن الأسئلة اللي تقدر تحكي فيها قصة أداء بأرقام من مشروعك. والإجابة اللي فيها «قست قبل وبعد بـ EXPLAIN» بتفرّقك جدًا.`,
            how: R`نطق: [[index]] «إندِكس» والجمع [[indexes]] «إندِكسِز» (في الداتابيز أشهر من [[indices]] «إندِسيز»، والاتنين صح)، و [[query]] «كويري» (/ˈkwɪəri/)، و [[sequential]] «سِكوِنشَل» (الضغط على [[QUEN]])، و [[logarithmic]] «لوگَ-رِذ-مِك» (الضغط على [[RITH]])، و [[EXPLAIN ANALYZE]] «إكسپلين آنَلايز».

كلمات: [[full table scan]] أو [[sequential scan]]، و [[index scan]]، و [[B-tree]] «بي-تري»، و [[composite index]] أو [[multi-column index]]، و [[unique index]]، و [[covering index]]، و [[write overhead]] (تكلفة الكتابة).

الإجابة على (٣): [[First, I'd run EXPLAIN ANALYZE on the query to see the plan. If I see a sequential scan on a big table with a filter that returns few rows, an index on that column will probably help. Then I'd add it and compare the timing.]]

ولو اتسألت [[When would an index not help?]]: [[When the query returns most of the table, or the table is tiny, the database might still prefer a full scan. Also, a function on the column, like LOWER(email), can stop a normal index from being used.]]`,
            when: "انترفيو backend أو داتابيز، وأي سؤال «this query is slow»، وقصص الأداء في STAR.",
            mistakes: R`[[Index makes everything faster]] (الكتابة أبطأ). و [[I add index on all columns]]. و [[an index is a primary key]] (الـ primary key عليه index، بس مش هو ده التعريف). وتقول إن الـ index «بيرتب الجدول» (الـ index العادي هيكل منفصل، مش بيرتب الجدول نفسه). و «إندكسيس» بنطق غريب.`
          },
          lines: [
            R`التعريف: «الـ index هيكل بيانات إضافي بيساعد الداتابيز تلاقي الصفوف من غير ما تقرا الجدول كله».`,
            R`التشبيه: «زي الفهرس في آخر الكتاب: بدل ما تقرا كل صفحة، بتدور على الكلمة وتروح للصفحة».`,
            R`«أغلب الـ indexes B-trees، فالبحث بياخد وقت logarithmic بدل ما يمسح كل صف».`,
            R`المثال بأرقام: «البحث بالعميل كان بياخد ثانيتين. بعد index على customer_id بقى حوالي ٣٠ مللي ثانية».`,
            R`القياس: «اتأكدت بـ EXPLAIN ANALYZE: اتغير من sequential scan لـ index scan».`,
            R`التمن: «مساحة زيادة، وكل insert أو update أبطأ شوية لأن الـ index لازم يتحدث».`,
            R`إمتى: «بعمل index على الأعمدة اللي بفلتر أو بعمل join أو sort بيها كتير، مش كل عمود».`,
            R`composite: «في index على عمودين، الترتيب مهم: بيساعد الـ queries اللي بتفلتر بـ customer_id الأول».`
          ],
          sol: R`(١) زي المثال بالظبط: تعريف، وتشبيه الكتاب، ومثال بأرقام.
(٢) [[Because every index has a cost. It takes extra storage, and every insert, update or delete has to update all the indexes on that table, so writes get slower. Also, the database won't use most of them anyway. So I only index columns that my real queries filter, join or sort on.]]
(٣) [[First, I'd run EXPLAIN ANALYZE to see the query plan. If there's a sequential scan on a big table, and the WHERE condition returns few rows, an index would probably help. I'd add it, run EXPLAIN ANALYZE again, and compare the time. I'd also check the query itself, because sometimes the problem is fetching too much data.]]

راجع: (٢) فيها كلمة [[writes]] أو [[insert/update]]؟ (٣) فيها [[EXPLAIN]] وقياس قبل وبعد؟ الإجابة الضعيفة لـ (٣): [[I'd add an index.]] من غير ما تقيس.`
        }
      ]
    },
    {
      t: "الـ live coding وآخر الانترفيو والمرتب",
      l: 3,
      n: "بنك جمل للتفكير بصوت عالي في كل مرحلة من الـ live coding، وأسئلتك وقفلة الانترفيو، والمرتب بالإنجليزي (gross و net و range)، ولما تتوتر أو تتلخبط في نص الكلام",
      items: [
        {
          cmd: "live coding phrases",
          title: "بنك جمل الـ live coding: من فهم المسألة لحد «I think it's done»",
          desc: R`الطريقة (تتكلم قبل ما تكتب، وتقول لما تتزنق) مشروحة في درس [[think aloud]] في «تاب الانترفيو»، والخطوات في [[clarify → examples → brute → optimize → test]]. هنا بنك جمل مترتب بالمراحل، عشان متدوّرش على الكلام وانت بتدوّر على الحل.

المشكلة عند اللي إنجليزيته ضعيفة: الدماغ مشغول بحاجتين (الحل واللغة)، فبيسكت. الحل: الجمل دي تبقى محفوظة لدرجة إنها متاخدش أي تفكير، فالدماغ كله يروح للحل. ٥ مراحل، ٣–٤ جمل لكل مرحلة، وده كفاية لأي live coding.

وكمان النطق: [[O(n)]] = [[O of n]]، و [[O(n²)]] = [[O of n squared]]، و [[O(n log n)]] = [[O of n log n]]، و [[hash map]] و [[two pointers]] و [[edge case]] «إدج كيْس».`,
          example: R`Understand:  Let me repeat the problem to make sure I got it. We need to return the indices of two numbers that add up to the target.
Understand:  Can I assume there's exactly one answer? Can the array have negative numbers?
Examples:  Let me try a small example: [2, 7, 11], target 9. The answer is 0 and 1.
Plan:  The simple way is to check every pair. That's O of n squared. Let me start with that, then improve it.
Plan:  To make it faster, I could use a hash map to remember the numbers I've seen. That would be O of n.
Coding:  I'll loop over the array. For each number, I check if target minus the number is already in the map.
Coding:  I'm naming this "seen" because it stores the numbers we've already visited.
Stuck:  Hmm, I'm stuck on the duplicates case. Let me trace it by hand with [3, 3], target 6.
Testing:  Let me test it with the example... index 0, not in the map, add it... index 1, found it. Returns 0 and 1.
Testing:  Edge cases: an empty array, one element, and duplicates. I think those all work.
Done:  I think it's done. Time is O of n and space is O of n. Would you like me to improve anything?`,
          try: R`حل مسألة [[Two Sum]] (أو أي مسألة سهلة من «تاب DSA») وانت بتسجّل صوتك، واستخدم جملة واحدة على الأقل من كل مرحلة من الـ ٦. وبعدين اسمع التسجيل وعدّ: أطول فترة سكوت كام ثانية؟ وقلت الـ complexity بصوت عالي؟`,
          flag: "script",
          deep: {
            why: R`في الـ live coding الإنترفيوير بيقيّم طريقة تفكيرك أكتر من الكود. والسكوت الطويل بيتحسب «تايه». واللي إنجليزيته ضعيفة غالبًا بيسكت مش لأنه مش عارف الحل، لكن لأنه مش لاقي الكلام. البنك ده بيشيل المشكلة دي.`,
            how: R`احفظ جملة واحدة لكل مرحلة كحد أدنى:
Understand: [[Let me repeat the problem to make sure I got it.]]
Examples: [[Let me try a small example.]]
Plan: [[The simple way is ..., that's O of ... . Let me start with that.]]
Coding: [[Now I'm going to ...]]
Stuck: [[I'm stuck on ... . Let me trace it by hand.]]
Testing: [[Let me test it with ...]]
Done: [[I think it's done. Time is O of ..., space is O of ...]]

كلمات الكود بصوت عالي: [[loop over]] (لف على)، و [[iterate through]]، و [[check if]]، و [[return early]]، و [[keep track of]] (أحتفظ بـ)، و [[increment]] و [[decrement]]، و [[swap]]، و [[sort]]، و [[the left pointer / right pointer]]، و [[off-by-one error]]، و [[base case]] (في الـ recursion).

ولما الإنترفيوير يدّي hint: [[Oh, that's a good point. So if I use a set here, I don't need the second loop.]] خده وابني عليه.

ولو محتاج وقت تفكر من غير كلام: [[Give me a moment to think about this]] وبعدين ١٥–٢٠ ثانية سكوت عادي.`,
            when: "أي جولة live coding، أو pair programming round، أو take-home بتكمله قدامهم.",
            mistakes: R`تكتب ٥ دقايق في صمت. وتقول [[ehh... so... yeah...]] بدل جمل. وتقول [[done]] من غير اختبار. و [[O n two]] (الصح [[O of n squared]]). و [[I will make a for loop]] (مفهومة، بس [[I'll loop over the array]] أطبع). وتتجاهل الـ hint.`
          },
          lines: [
            R`فهم: «خليني أعيد المسألة عشان أتأكد. محتاجين نرجّع indices رقمين مجموعهم الـ target».`,
            R`افتراضات: «أقدر أفترض إن فيه إجابة واحدة بالظبط؟ الـ array ممكن يبقى فيه سالب؟»`,
            R`مثال صغير: «خليني أجرب مثال: ٢ و ٧ و ١١، والـ target ٩. الإجابة ٠ و ١».`,
            R`خطة بسيطة: «الطريقة البسيطة إني أشيك كل زوج. ده O of n squared. أبدأ بيها وبعدين أحسّن».`,
            R`تحسين: «عشان أسرع، ممكن hash map أفتكر فيه الأرقام اللي شفتها. ده O of n».`,
            R`كتابة: «هلف على الـ array. لكل رقم، أشيك لو target ناقص الرقم موجود في الـ map».`,
            R`تسمية: «سميته seen لأنه بيخزن الأرقام اللي زرناها».`,
            R`متزنق: «امم، متزنق في حالة التكرار. خليني أمشيها بإيدي بـ ٣ و ٣ والـ target ٦». trace = أتتبع.`,
            R`اختبار: «أجرب المثال... index 0 مش في الـ map، أضيفه... index 1 لقيته. بيرجّع ٠ و ١».`,
            R`edge cases: «array فاضي، وعنصر واحد، وتكرار. أظن كلهم شغالين».`,
            R`خلاص: «أظن خلص. الوقت O of n والمساحة O of n. تحب أحسّن حاجة؟»`
          ],
          sol: R`تسجيل كويس لـ Two Sum (مدته ٨–١٥ دقيقة) فيه:
- إعادة المسألة وسؤال افتراضات في أول دقيقة.
- مثال صغير قبل أي كود.
- [[O of n squared]] للـ brute force، وبعدين [[O of n]] للـ hash map، بصوت عالي.
- كلام كل ٢٠–٣٠ ثانية على الأقل وانت بتكتب ([[Now I'm adding the number to the map]]).
- اختبار بمثال و edge cases قبل [[I think it's done]].

الحل نفسه للمرجع تحت (JavaScript).

لو أطول سكوت عندك أكتر من دقيقة، غالبًا كان وقت كتابة الـ loop: الحل إنك تقول الخطوة قبل ما تكتبها. ولو نسيت تقول الـ complexity، ضيف [[Time is... space is...]] للجملة الأخيرة وخلاص.`,
          solCode: R`function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11], 9)); // [ 0, 1 ]
console.log(twoSum([3, 3], 6));     // [ 0, 1 ]
console.log(twoSum([], 5));         // []`
        },
        {
          cmd: "آخر الانترفيو",
          title: "آخر ٥ دقايق: أسئلتك للإنترفيوير والـ next steps والـ thank-you",
          desc: R`الأسئلة نفسها (تسأل إيه ومين) في درس [[أسئلتك للإنترفيوير]] في «تاب الانترفيو». هنا اللغة: إزاي تسأل بشكل طبيعي، وإزاي تتفاعل مع الإجابة (مش تسأل وتسكت)، وإزاي تقفل.

التفاعل مع الإجابة: بعد ما يجاوب، جملة قصيرة بتبين إنك سمعت: [[That makes sense]]، و [[That sounds great]]، و [[Interesting, so ...]]، أو follow-up صغير: [[How does that work for new people?]]. ده بيحول الأسئلة لحوار.

القفلة: [[What are the next steps?]] (المراحل الجاية إيه)، و [[When can I expect to hear back?]] (إمتى أعرف)، وشكر محدد: [[Thank you for your time. I really enjoyed the technical discussion, especially the part about ...]]. وبعدها بيوم إيميل شكر قصير.`,
          example: R`Q: Do you have any questions for us?
A: Yes, a few. What would success look like in the first three months for this role?
A: That makes sense. And how do new developers usually get feedback on their code?
A: That sounds great. One more: what's the biggest technical challenge the team is working on right now?
A: Interesting. So the migration to microservices is still in progress?
A: Thanks, that's really helpful. What are the next steps in the process?
A: And when can I expect to hear back?
A: Thank you for your time. I really enjoyed the discussion, especially the part about your deployment pipeline.
Email: Hi Sara, thank you again for today's interview. I enjoyed learning about the team, and I'm excited about the role. Best, Ahmed`,
          try: R`حضّر ٣ أسئلة لشركة حقيقية، ولكل سؤال جهّز «ردة فعل» جاهزة (That makes sense و That sounds great و Interesting, so...). اعمل رول بلاي مع صاحب أو AI يجاوب عليهم، وخلّص بجملتين القفلة. وبعدين اكتب إيميل الشكر في ٣ جمل.`,
          flag: "script",
          deep: {
            why: R`آخر ٥ دقايق بتفضل في دماغ الإنترفيوير. والسؤال الذكي مع تفاعل حقيقي بيبين إنك مهتم فعلًا ومش حافظ أسئلة من النت. وسؤال الـ next steps عملي: بيوفر عليك أسابيع قلق.`,
            how: R`أسئلة جاهزة بإنجليزي طبيعي:
[[What does a typical day look like for someone in this role?]]
[[How does a change get from a PR to production here?]]
[[How do new developers get feedback and mentoring?]]
[[What do you enjoy most about working here?]]
[[Is there anything in my background you'd like me to clarify?]] (شجاعة، وبتدّيك فرصة ترد على شك).

ردود الفعل: [[That makes sense]]، و [[That sounds great]]، و [[That's good to hear]]، و [[Interesting]]، و [[I like that]]. وحاجة من الإجابة تبني عليها.

الشكر: محدد ([[especially the part about...]]) أحسن من عام. و [[It was nice meeting you]] أو [[Nice to meet you]].

إيميل الشكر: ٣ جمل، نفس اليوم أو تاني يوم. مش ضروري، بس لطيف وبيفتكّرهم بيك. ومتطلبش فيه حاجة.

ولو معندكش أسئلة فعلًا (اتجاوبت كلها): [[I think you've answered most of my questions already. Maybe just one: ...]] ومتقولش [[No]].`,
            when: "آخر كل جولة انترفيو، مع الـ recruiter أو المهندس أو المدير.",
            mistakes: R`[[No, I don't have questions]]. وتسأل عن المرتب والأجازات مع المهندس في الجولة التقنية. وتسأل ٦ أسئلة والوقت خلص. وتسأل وتسكت بعد الإجابة. و [[What is the next step?]] مقبولة، بس الأشهر [[What are the next steps?]]. وإيميل شكر طويل فيه إعادة للانترفيو كله.`
          },
          lines: [
            R`«عندك أي أسئلة لينا؟»`,
            R`«أيوه، كام سؤال. النجاح في أول ٣ شهور في الدور ده شكله إيه؟»`,
            R`ردة فعل + سؤال: «منطقي. والـ developers الجداد بياخدوا feedback على الكود إزاي؟»`,
            R`«حلو جدًا. سؤال كمان: إيه أكبر تحدي تقني الفريق شغال عليه دلوقتي؟»`,
            R`follow-up من الإجابة: «مثير للاهتمام. يعني الـ migration للـ microservices لسه شغالة؟»`,
            R`«شكرًا، مفيد جدًا. إيه الخطوات الجاية؟»`,
            R`«وإمتى أتوقع أسمع منكم؟» hear back = أسمع رد.`,
            R`شكر محدد: «شكرًا على وقتكم. استمتعت بالنقاش، خصوصًا الجزء عن الـ deployment pipeline».`,
            R`إيميل الشكر: ٣ جمل: شكر، وحاجة عجبتك، وحماسك. من غير طلبات.`
          ],
          sol: R`مثال رول بلاي:
[[Me: What does a typical week look like for a junior on your team?]]
[[Them: We do a standup every morning, and juniors pair with a senior twice a week.]]
[[Me: That sounds great. How do you choose the tasks for juniors in the first month?]]
...
[[Me: Thanks, that's really helpful. What are the next steps? ... Great. Thank you for your time, I really enjoyed hearing about the pairing sessions.]]

إيميل الشكر:
[[Hi Omar, thank you for taking the time to talk with me today. I especially enjoyed hearing about how your team pairs juniors with seniors. I'm excited about the opportunity and look forward to hearing from you. Best regards, Mona]]

راجع: فيه ردة فعل بعد كل إجابة؟ فيه follow-up واحد مبني على كلامهم؟ الشكر محدد؟`
        },
        {
          cmd: "salary بالإنجليزي",
          title: "المرتب بالإنجليزي: «What are your salary expectations?» و gross و net و range",
          desc: R`استراتيجية التفاوض (الأرقام الـ ٣، والسوق، والعرض التاني) في درس [[التفاوض]] في «تاب الشغل والكارير»، وتقييم العرض في [[تقييم العرض]]. هنا اللغة والكلمات اللي لو مفهمتهاش ممكن تخسر فلوس.

أهم فرق: [[gross]] = قبل الضرايب والتأمينات، و [[net]] = اللي بيوصل إيدك. في مصر الكلام غالبًا [[net]] و [[per month]]. برا غالبًا [[gross]] و [[per year]] ([[annual]]). فاسأل دايمًا: [[Is that gross or net? Monthly or annual?]]

كلمات: [[base salary]] (الأساسي)، و [[bonus]]، و [[benefits]] (مزايا: تأمين صحي، ولابتوب، وكورسات)، و [[health insurance]]، و [[equity]] أو [[stock options]] (أسهم)، و [[probation period]] (فترة الاختبار)، و [[notice period]] (المدة اللي لازم تبلّغ فيها قبل ما تمشي)، و [[range]] (مدى)، و [[negotiable]]، و [[total compensation]] (كل حاجة مع بعض). وللشغل remote لبرا: [[contractor]] ولا [[employee]]، و [[in USD]]، و [[paid through...]] (بتتقبض إزاي). والتفاصيل في درس [[remote لبرا]] في «تاب الشغل والكارير».`,
          example: R`Q: What are your salary expectations?
A: Based on my research for junior roles in Cairo, I'm looking for something in the range of 25 to 30 thousand pounds net per month.
A: I'm flexible, depending on the full package: benefits, learning budget, and remote days.
A: Before I give a number, could you share the budget range for this role?
A: Just to make sure: is that gross or net, and is it monthly or annual?
A: Thank you for the offer. I'm really excited about the role. Is there any flexibility on the base salary?
A: If the base is fixed, could we agree on a salary review after the probation period?
A: What's the notice period, and when would you like me to start?
A: Could you send me the offer in writing, so I can review the details?`,
          try: R`حدد رينج حقيقي لنفسك (من درس [[التفاوض]] في «تاب الشغل والكارير»). وبعدين قول بصوت عالي وسجّل: (١) إجابتك على [[What are your salary expectations?]] بالرينج. (٢) السؤال عن gross ولا net. (٣) ردك على [[That's above our budget. The maximum is 22 thousand.]] بجملة فيها شكر وطلب مراجعة بعد الـ probation.`,
          flag: "script",
          deep: {
            why: R`في كلام المرتبات بالإنجليزي، سوء فهم كلمة واحدة ([[gross]] ولا [[net]]، شهري ولا سنوي) ممكن يفرق آلاف. واللي إنجليزيته ضعيفة غالبًا بيقول [[OK]] على أول رقم عشان مش عارف يتفاوض بالإنجليزي. الجمل الجاهزة دي بتحل ده.`,
            how: R`الأرقام بصوت عالي: [[25,000]] = [[twenty-five thousand]] أو [[twenty-five K]]، و [[$2,500]] = [[twenty-five hundred dollars]] أو [[two and a half K]]، و [[$40k a year]] = [[forty K a year]]. وخلي بالك من [[fifteen]] و [[fifty]] (درس «1.5k و 99.9%»).

الرينج: [[in the range of X to Y]] أو [[between X and Y]]. وأول الرينج لازم يبقى فوق أقل رقم تقبله.

لو مش عايز تقول رقم الأول: [[I'd like to learn more about the role first. Could you share the budget range?]] ولو أصروا، قول الرينج.

الشكر والحماس قبل أي تفاوض: [[Thank you for the offer. I'm really excited about the role.]] وبعدين [[Is there any flexibility on...?]] أو [[Would it be possible to...?]].

وكل حاجة اتفقتوا عليها بالكلام: [[Could you send me the offer in writing?]].

والتوقيت: متسألش عن المرتب في أول ٥ دقايق مع المهندس. مع الـ recruiter أو الـ HR عادي، وغالبًا هما اللي بيسألوا.`,
            when: "مكالمة الـ recruiter الأولى (غالبًا بيسأل عن التوقعات)، ومرحلة العرض، ومراجعة المرتب بعد الـ probation.",
            mistakes: R`[[I want as much as possible]] أو [[Whatever you think]] (بتخسر). ورقم من غير ما تعرف gross ولا net. و [[I need more money because my rent is high]] (سبب شخصي؛ السبب الأقوى السوق أو المهارة). و [[OK]] على أول عرض بسرعة من التوتر. و [[fifty thousand]] وانت قصدك [[fifteen]].`
          },
          lines: [
            R`السؤال: «توقعاتك للمرتب إيه؟»`,
            R`رينج مبني على السوق: «بناءً على بحثي لأدوار junior في القاهرة، بدوّر على حاجة في حدود ٢٥ لـ ٣٠ ألف صافي في الشهر».`,
            R`مرونة: «مرن، حسب الـ package كله: المزايا، وميزانية التعلم، وأيام الـ remote».`,
            R`تطلب رينجهم الأول: «قبل ما أقول رقم، ممكن تقولولي ميزانية الدور ده؟»`,
            R`توضيح: «عشان أتأكد: ده قبل الضرايب ولا صافي؟ شهري ولا سنوي؟»`,
            R`بعد العرض: «شكرًا على العرض، متحمس جدًا للدور. فيه مرونة في الأساسي؟»`,
            R`بديل: «لو الأساسي ثابت، ممكن نتفق على مراجعة المرتب بعد فترة الاختبار؟»`,
            R`«فترة الإخطار كام، وتحبوا أبدأ إمتى؟» notice period = مدة الإخطار قبل ما تسيب.`,
            R`«ممكن تبعتولي العرض مكتوب عشان أراجع التفاصيل؟» in writing = مكتوب.`
          ],
          sol: R`نموذج (غيّر الأرقام لأرقامك):
(١) [[Based on what I've seen for junior full-stack roles in Cairo, I'm looking for something between 25 and 30 thousand pounds net per month, depending on the full package.]]
(٢) [[Just to make sure I understand: is that number gross or net, and monthly or annual?]]
(٣) [[I understand, thank you for being transparent. I'm still very interested in the role. If 22 is the maximum for now, could we agree in writing on a salary review after the three-month probation?]]

راجع التسجيل: الأرقام واضحة ([[twenty-five]] مش مبلوعة)؟ فيه [[net]] أو [[gross]]؟ في (٣) فيه شكر قبل الطلب؟ الإجابة الضعيفة لـ (٣): [[OK, no problem.]] على طول، أو [[No, this is too low.]] ناشفة.`
        },
        {
          cmd: "التوتر وتطلب يعيد",
          title: "اتوترت واتلخبطت في نص الجملة: جمل ترجع بيها من غير ما تنهار",
          desc: R`جمل طلب الإعادة والتوضيح الأساسية في درس [[English وانجليزيتك مش قوية]] في «تاب الانترفيو» ودرس «مش فاهم بأدب» في التاب ده. هنا حاجة مختلفة: انت اللي بتتكلم، وفجأة: نسيت الكلمة، أو الجملة اتلخبطت، أو نسيت انت كنت بتقول إيه، أو قلت حاجة غلط. ودي أكتر لحظات التوتر في الانترفيو.

الحل: جمل «رجوع» محفوظة. [[Sorry, let me start that again.]] لما الجملة تتلخبط. [[Let me rephrase that.]] لما تقول حاجة بشكل مش واضح. [[What I mean is...]] وبعدين نفس الفكرة بكلام أبسط. [[Sorry, I've lost my train of thought. Could you remind me of the question?]] لما تنسى انت فين. [[Actually, let me correct that...]] لما تقول معلومة غلط.

والـ native speakers بيقولوا الجمل دي طول الوقت. هي مش علامة ضعف، هي علامة إنك بتراقب كلامك.`,
          example: R`Sorry, let me start that again.
Let me rephrase that. What I mean is, the cache was hiding the real problem.
I'm not sure of the exact word in English, but it's when two requests change the same data at the same time... a race condition.
Sorry, I've lost my train of thought. Could you remind me of the question?
Actually, let me correct that: it was PostgreSQL, not MySQL.
Sorry, I'm a bit nervous. Give me a second.
Could I take a moment to think about that?
To sum up what I said: I added the index, measured it, and the query got 50 times faster.`,
          try: R`اطلب من حد (أو AI) يسألك ٣ أسئلة انترفيو وانت بتسجّل، وخليه يقاطعك مرة أو يغيّر السؤال فجأة. وعن قصد: وقف في نص جملة مرة، وقول [[Sorry, let me start that again]]، وكمّل. وبعدين قول [[I'm not sure of the exact word...]] ووصّف كلمة. الهدف تجرب الرجوع وانت مش متوتر، عشان يبقى أوتوماتيك وانت متوتر.`,
          flag: "script",
          deep: {
            why: R`اللي بيوقع الناس في الانترفيو مش الغلطة، لكن اللي بيحصل بعدها: بيتكسفوا، ويسرّعوا، ويغلطوا أكتر، والدوامة تكمّل. جملة رجوع واحدة محفوظة بتوقف الدوامة دي في ثانيتين.`,
            how: R`للتوتر نفسه (قبل الانترفيو): ١) حضّر الإجابات الأكيدة (about yourself، و STAR، والمشروع) لحد ما تبقى مريحة. ٢) اتكلم إنجليزي ١٠ دقايق قبل الانترفيو (سجّل نفسك أو كلم AI) عشان «تسخّن». ٣) ميّة جنبك، وورقة فيها كلمات مفتاحية (مش إجابات كاملة). ٤) نفَس بطيء قبل ما تبدأ.

وأثناء الانترفيو: اتكلم أبطأ من طبيعتك عن قصد. السرعة هي أكبر سبب للتلخبط والنطق الوحش.

[[Sorry, I'm a bit nervous]] مرة واحدة مقبولة جدًا وأغلب الإنترفيويرز بيتعاطفوا ويهدّوا الإيقاع. أكتر من مرة بتبان مشكلة.

الكلمة المنسية: وصّفها ([[It's the thing that...]]) أو قول مرادف أبسط، أو قولها بالعربي ووصفها ([[In Arabic we call it... it's like...]]) في الحالات القصوى. المهم تكمّل.

والتلخيص في الآخر ([[To sum up...]]) بينقذ أي إجابة اتلخبطت في نصها: الإنترفيوير بيفتكر الآخر.`,
            when: "أي لحظة تلخبط في انترفيو أو اجتماع أو presentation.",
            mistakes: R`تفضل تكمّل جملة متلخبطة لحد ما تبقى مش مفهومة. وتعتذر عن إنجليزيتك ٥ مرات. وتسكت دقيقة بعد الغلطة. وتضحك ضحكة متوترة وتقول [[sorry sorry]]. وتكمّل بمعلومة غلط عشان مكسوف تصلّحها ([[Actually, let me correct that]] أحسن بكتير).`
          },
          lines: [
            R`الجملة اتلخبطت: «آسف، خليني أبدأ تاني».`,
            R`«خليني أقولها بشكل تاني. قصدي إن الـ cache كان مخبّي المشكلة الحقيقية». rephrase = أعيد الصياغة.`,
            R`نسيت الكلمة: «مش متأكد من الكلمة بالإنجليزي، بس لما اتنين requests يغيروا نفس الداتا في نفس الوقت... race condition».`,
            R`نسيت انت فين: «آسف، الفكرة هربت مني. ممكن تفكرني بالسؤال؟» train of thought = سلسلة الأفكار.`,
            R`معلومة غلط: «في الحقيقة، خليني أصحح: كان PostgreSQL مش MySQL».`,
            R`«آسف، متوتر شوية. ثانية واحدة». مرة واحدة بس.`,
            R`«ممكن آخد لحظة أفكر؟»`,
            R`التلخيص بينقذ الإجابة: «ألخّص اللي قلته: ضفت index، وقسته، والـ query بقت أسرع ٥٠ مرة».`
          ],
          sol: R`التسجيل الناجح مش اللي مفيهوش غلطات. الناجح اللي فيه لحظة تلخبط، وبعدها جملة رجوع في أقل من ٣ ثواني، وبعدها كلام طبيعي.

مثال: [[So I used Redis for... sorry, let me start that again. I used Redis to cache the product list, because it was read thousands of times per minute. ... What I mean is, the database was doing the same work again and again.]]

وللكلمة المنسية: [[I'm not sure of the exact word, but it's when the server sends the data in small pieces instead of all at once.]] (الكلمة [[streaming]] أو [[chunked]]). الإنترفيوير غالبًا هيقولها لك، وده عادي جدًا.

لو لقيت إن التسجيل فيه دوامة (غلطة → اعتذار → سرعة → غلطة تانية)، اتمرن على [[Sorry, let me start that again]] لوحدها ١٠ مرات بنبرة هادية، وبعدين أعد التمرين.`
        }
      ]
    },
    {
      t: "خطة التدريب: تسمع وتقلّد وتسجّل وتتمرن",
      l: 3,
      n: "تسمع إيه حسب مستواك، والـ subtitles بالتدريج، والـ shadowing، وتسجّل نفسك وتقيّم، وخطة ٣٠ يوم ١٥ دقيقة في اليوم، و mock interview مع AI بالصوت بأمان",
      items: [
        {
          cmd: "listening بالمستوى",
          title: "تسمع إيه؟ قنوات وبودكاستات وtalks مترتبة من الأبطأ للأسرع",
          desc: R`الكلام بيبدأ من الودن: مش هتقول جملة كويس لو عمرك ما سمعتها. والغلطة المشهورة إنك تبدأ بحاجة سريعة جدًا (Fireship أو ThePrimeagen) فتفهم ٢٠٪ وتحبط. الصح: ابدأ بحاجة تفهم منها ٧٠–٨٠٪، وزوّد السرعة كل شهر.

المستوى ١ (بطيء وواضح، ومعاه نص مكتوب): BBC Learning English (فيه برنامج [[6 Minute English]] بنص كامل)، و VOA Learning English (إنجليزي بطيء)، و Programming with Mosh، و freeCodeCamp (كورسات طويلة بشرح هادي).

المستوى ٢ (سرعة عادية، مواضيع تقنية): Web Dev Simplified، و Kevin Powell (CSS)، و The Net Ninja (لكنة بريطانية واضحة)، و Traversy Media، و ByteByteGo (system design بصوت هادي)، و Hussein Nasser (backend بتفكير بصوت عالي).

المستوى ٣ (سريع، ولكنات مختلفة، ونقاش مش شرح): Fireship، و Theo، و ThePrimeagen، وبودكاستات زي Syntax و Software Engineering Daily و The Changelog، و talks من مؤتمرات (JSConf، و React Conf، و NDC، و GOTO) بلكنات من كل العالم.

والأسماء دي كانت شغالة وقت كتابة الدرس؛ القنوات بتتغير وبتقف، فلو واحدة وقفت دوّر على بديل بنفس المستوى.`,
          example: R`Level 1 (slow, with transcript):  BBC Learning English "6 Minute English", VOA Learning English, Programming with Mosh
Level 1 tip:  Watch at 0.75x speed. Read the transcript after, not before.
Level 2 (normal speed, tech):  Web Dev Simplified, Kevin Powell, The Net Ninja, Traversy Media, ByteByteGo
Level 2 tip:  Pick videos about things you already know, so your brain focuses on the English.
Level 3 (fast, discussions):  Fireship, Theo, ThePrimeagen, Syntax, Software Engineering Daily, conference talks
Level 3 tip:  Listen to different accents: Indian, German, American, British, Australian.
Pronunciation:  Rachel's English (US), English with Lucy (UK), BBC "The Sounds of English", YouGlish
Daily:  10 minutes of listening, every day, beats 2 hours once a week.
Test:  If you understand less than 60%, go down a level. More than 90%, go up.`,
          try: R`النهارده: اسمع ٥ دقايق من قناة في كل مستوى من التلاتة، وقدّر نسبة فهمك لكل واحدة (من غير subtitles). المستوى اللي فهمت فيه ٦٠–٨٠٪ هو مستواك. اكتبه في [[log.md]] مع اسم ٣ قنوات من المستوى ده هتسمعهم الشهر ده.`,
          flag: "script",
          deep: {
            why: R`الكلام الكويس بييجي من سمع كتير. والسمع لازم يبقى في المستوى الصح: صعب جدًا يحبطك، وسهل جدًا ميعلمكش. وسمع مواضيع تقنية بالذات بيعلّمك الكلمات والجمل اللي هتقولها فعلًا في الشغل (والنطق الصح لأسماء الأدوات).`,
            how: R`طريقة السمع النشط (١٠ دقايق): ١) اسمع مرة من غير توقف، وحاول تفهم الفكرة العامة. ٢) اسمع تاني مع subtitles إنجليزي، ووقّف عند كل جملة مفهمتهاش. ٣) اكتب جملتين عجبوك في [[phrases.md]]. ٤) اختار جملة وقولها بصوت عالي (أو shadowing: الدرس الجاي).

السمع السلبي (في المواصلات، أو وانت بتغسل المواعين): بودكاست من مستواك. مفيد، بس أقل من النشط بكتير. اعمل الاتنين.

السرعة: YouTube فيه تحكم في السرعة (0.75x و 1.25x). ابدأ أبطأ، وكل أسبوعين زود. ولو بقيت فاهم 1.25x، الكلام العادي هيبقى سهل.

اللكنات: في شغل remote، الفريق ممكن يبقى هندي وألماني وبرازيلي وأمريكي. اسمع talks من مؤتمرات في بلاد مختلفة (NDC في أوروبا، و JSConf India، وغيرهم) عشان ودنك تتعود.`,
            when: "كل يوم ١٠ دقايق على الأقل. والسمع السلبي أي وقت فاضي.",
            mistakes: R`تبدأ بأسرع قناة. وتسمع بـ subtitles عربي بس (بتقرا مش بتسمع). وتسمع ساعتين يوم الجمعة وبعدين تبطّل أسبوع. وتسمع حاجات مش تقنية خالص (أفلام بس): مفيدة، بس كلمات الشغل مش فيها. وتفضل في نفس المستوى سنة.`
          },
          lines: [
            R`المستوى ١: بطيء ومعاه نص مكتوب. BBC و VOA بيتكلموا ببطء مقصود.`,
            R`نصيحة: سرعة 0.75، واقرا النص بعد ما تسمع، مش قبل.`,
            R`المستوى ٢: سرعة عادية ومواضيع تقنية بشرح واضح.`,
            R`نصيحة: اختار فيديوهات عن حاجات انت عارفها، فالمخ يركز على الإنجليزي.`,
            R`المستوى ٣: سريع، ونقاشات، ولكنات مختلفة.`,
            R`نصيحة: اسمع لكنات مختلفة: هندي وألماني وأمريكي وبريطاني وأسترالي.`,
            R`للنطق: قنوات متخصصة في نطق الأصوات، و YouGlish للكلمات.`,
            R`«١٠ دقايق كل يوم أحسن من ساعتين مرة في الأسبوع».`,
            R`الاختبار: أقل من ٦٠٪ انزل مستوى، وأكتر من ٩٠٪ اطلع مستوى.`
          ],
          sol: R`النتيجة المتوقعة لمبرمج مصري إنجليزيته ضعيفة: المستوى ١ حوالي ٧٠–٩٠٪، والمستوى ٢ حوالي ٤٠–٧٠٪ (بيعتمد على الموضوع: لو عن حاجة تعرفها بتفهم أكتر)، والمستوى ٣ حوالي ١٥–٤٠٪.

فلو ده انت، مستواك ٢ في المواضيع التقنية اللي تعرفها، و ١ في الكلام العام. مثال لـ [[log.md]]:
[[Listening level: 2 (tech I know), 1 (general)]]
[[This month: Web Dev Simplified, The Net Ninja, BBC 6 Minute English]]

ولو فهمت المستوى ٣ أكتر من ٦٠٪، ممتاز: ركّز على الكلام (shadowing وتسجيل) أكتر من السمع.`
        },
        {
          cmd: "subtitles تدريجي",
          title: "الـ subtitles بالتدريج: عربي ← إنجليزي ← من غير، ونفس الفيديو ٣ مرات",
          desc: R`الـ subtitles سلاح ذو حدين. العربي بيخليك تفهم المحتوى بس ودنك مش بتشتغل (بتقرا). والإنجليزي بيساعد ودنك تربط الصوت بالكلمة. ومن غير subtitles هو الهدف.

الطريقة التدريجية: ١) لو مستواك ١ ومش فاهم حاجة: عربي مرة، عشان تفهم الفكرة. ٢) بعدها على طول نفس الفيديو بـ subtitles إنجليزي. ٣) بعدها نفس الفيديو من غير subtitles. وكل ما تتحسن، شيل الخطوة الأولى.

نفس الفيديو ٣ مرات أحسن من ٣ فيديوهات مرة واحدة. لأن المرة التالتة بتسمع الكلمات اللي قريتها في التانية، فالمخ بيربط.

وأدوات: YouTube فيه auto-generated captions إنجليزي لأغلب الفيديوهات (مش دقيقة ١٠٠٪، خصوصًا في أسماء الأدوات). وإضافات للمتصفح زي Language Reactor بتعرض subtitles بلغتين مع بعض، وتقدر تدوس على كلمة تشوف معناها.`,
          example: R`Week 1-2 (level 1):  Arabic subtitles → English subtitles → no subtitles (same 5-minute video)
Week 3-4:  English subtitles → no subtitles → shadow one minute
Month 2:  No subtitles first → English subtitles only for the parts you missed
Month 3:  No subtitles. Pause and write down any sentence you didn't catch.
YouTube:  Settings → Subtitles → English (auto-generated) → Playback speed 0.75
Rule:  Same video 3 times > 3 different videos once.
Warning:  Auto-generated captions often get tool names wrong: "next JS" may show as "next yes".`,
          try: R`اختار فيديو تقني ٥ دقايق من مستواك (من الدرس اللي فات)، واتفرج عليه ٣ مرات بالترتيب ده النهارده: subtitles إنجليزي، وبعدين من غير، وبعدين من غير مع إنك توقف وتكتب أي جملة ملقطتهاش. وقارن: فهمت كام في المرة التالتة مقارنة بالأولى؟`,
          flag: "script",
          deep: {
            why: R`أغلب الناس بتفضل على subtitles عربي سنين وبتقول «أنا بفهم إنجليزي»، وهي في الحقيقة بتفهم عربي. والطريقة التدريجية بتدرّب الودن فعلًا، وبتوري تقدمك بوضوح (من فيديو لفيديو، ومن شهر لشهر).`,
            how: R`لما تشوف جملة مكتوبة ومسمعتهاش صح، اسأل: ليه؟ غالبًا لسبب من دول: ١) كلمة متوصلة بكلمة ([[want to]] بتتقال «وانا»، و [[going to]] «گونا»، و [[kind of]] «كايندا»، و [[let me]] «لِمي»). ٢) كلمة ضعيفة اتبلعت ([[and]] بتبقى «ن»، و [[to]] بتبقى «تَ»، و [[of]] بتبقى «ڤ»). ٣) كلمة جديدة. ٤) لكنة.

النوعين الأولين هما الأكتر، ودول مش «إنجليزي صعب»، دي قواعد الكلام السريع. ولما تعرفها، هتسمعها في كل حتة: [[Do you want to]] «ديو وانا»، و [[What do you mean]] «وادِيو مين».

والـ auto-captions: كويسة جدًا للمحتوى العام، وضعيفة في الأسماء التقنية. ودي فرصة: لو الـ caption كتب [[next yes]] وانت عارف إنها [[Next.js]]، انت بتفهم أكتر من الماكينة.`,
            when: "أي فيديو تقني أو غير تقني. الشهر الأول: ٣ مرات لنفس الفيديو. بعدها حسب مستواك.",
            mistakes: R`subtitles عربي دايمًا. وتقرا الـ subtitles بدل ما تسمع (غمّض عينك في المرة التالتة). وتغيّر الفيديو كل مرة. وتتفرج على فيديو ٤٠ دقيقة مرة واحدة ومش فاهم نصه: ٥ دقايق ٣ مرات أحسن.`
          },
          lines: [
            R`أول أسبوعين: عربي، وبعدين إنجليزي، وبعدين من غير. نفس الفيديو.`,
            R`تالت ورابع أسبوع: إنجليزي، وبعدين من غير، وبعدين shadowing دقيقة.`,
            R`الشهر التاني: من غير الأول، والإنجليزي بس للأجزاء اللي فاتتك.`,
            R`الشهر التالت: من غير خالص. وقّف واكتب أي جملة ملقطتهاش.`,
            R`YouTube: الإعدادات، والـ subtitles الإنجليزي التلقائية، والسرعة 0.75.`,
            R`القاعدة: نفس الفيديو ٣ مرات أحسن من ٣ فيديوهات مرة.`,
            R`تحذير: الـ captions التلقائية بتغلط في أسماء الأدوات.`
          ],
          sol: R`النتيجة المتوقعة: المرة الأولى (بـ subtitles) بتفهم كويس بس عينك على النص. المرة التانية (من غير) بتفهم أقل بشوية، وده طبيعي. المرة التالتة (من غير، بتوقف) بتفهم أكتر من التانية، لأنك عرفت الكلمات.

الجمل اللي هتكتبها في المرة التالتة غالبًا فيها: [[gonna]] و [[wanna]] و [[kind of]] و [[a lot of]] («ألوتا»)، أو اسم أداة جديدة. اكتبهم في [[phrases.md]] بالشكل المكتوب والشكل المسموع: [[going to → "gonna"]].

لو فهمت المرة الأولى من غير subtitles ٨٠٪ أو أكتر، الفيديو ده سهل عليك: اطلع مستوى.`
        },
        {
          cmd: "shadowing",
          title: "الـ shadowing: تقلّد المتكلم وهو بيتكلم، أسرع طريقة لتحسين النطق والإيقاع",
          desc: R`الـ shadowing = بتسمع جملة وتقولها في نفس الوقت تقريبًا (متأخر ثانية أو اتنين)، زي الضل. مش بتسمع وتوقف وتعيد، لأ: بتتكلم مع المتكلم. ده بيدرّب النطق والإيقاع والنبرة والسرعة مع بعض، وده اللي مفيش كتاب بيعلّمه.

الخطوات: ١) اختار مقطع دقيقة أو اتنين، من متكلم واضح، بمستواك، ومعاه نص مكتوب (transcript). ٢) اسمعه مرتين وانت بتقرا النص. ٣) اقرا النص بصوت عالي مع الصوت (تقرا وتسمع وتتكلم). ٤) من غير النص: اتكلم مع الصوت. ٥) سجّل نفسك وانت بتعمل shadowing، وقارن.

١٠ دقايق في اليوم على نفس المقطع لمدة ٣–٥ أيام أحسن من مقطع جديد كل يوم. لما تحس إنك «بتقول» المقطع بنفس إيقاعه، غيّره.

وأحسن مصادر: talks تقنية (بتعلّمك جمل الشغل)، و BBC 6 Minute English (معاه transcript)، وحتى مقاطع من انترفيوهات mock على YouTube.`,
          example: R`Step 1:  Pick a 1-2 minute clip with a transcript. Clear speaker. Your level.
Step 2:  Listen twice while reading the transcript.
Step 3:  Read the transcript aloud together with the audio.
Step 4:  No transcript: speak together with the audio, one or two seconds behind.
Step 5:  Record yourself shadowing. Compare with the original.
Focus:  Copy the rhythm and the stress, not only the words. Where do they pause? Which words are loud?
Sample:  "So, what we're going to do today | is build a REST API | with Node and Express."
Repeat:  Same clip for 3 to 5 days, 10 minutes a day, then change it.`,
          try: R`اختار مقطع دقيقة من talk تقني أو من BBC 6 Minute English (ومعاه النص). اعمل الـ ٥ خطوات النهارده، وسجّل الخطوة الخامسة. وكرر نفس المقطع ٣ أيام وسجّل كل يوم. في اليوم التالت، اسمع تسجيل اليوم الأول والتالت ورا بعض.`,
          flag: "script",
          deep: {
            why: R`النطق والإيقاع بيتعلموا بالتقليد مش بالقواعد. والـ shadowing بيخلي بقك يتعود على حركات الإنجليزي (الـ stress، والكلمات المتوصلة، والكلمات الضعيفة) من غير ما تفكر فيها. ولأنه بيخليك تتكلم بسرعة طبيعية، بيكسر عادة «أفكر في كل كلمة قبل ما أقولها».`,
            how: R`ركّز على ٣ حاجات بالترتيب: ١) الإيقاع: فين بيوقف، وأنهي كلمات أعلى (الكلمات المهمة: أسماء وأفعال بتتقال أعلى، و [[the]] و [[to]] و [[of]] بتتقال ضعيفة). ٢) الكلمات المتوصلة ([[going to]] = «گونا»، و [[what are]] = «واتَر»). ٣) الأصوات الفردية (th و p و v).

علّم النص: حط [[|]] مكان الوقفات، وخط تحت الكلمات المضغوطة. زي المثال: [[So, what we're going to do today | is build a REST API | with Node and Express.]]

متقلدش اللكنة بالظبط لو مش عايز: الهدف الوضوح، مش إنك تبقى أمريكي. بس الإيقاع والضغط مهمين في أي لكنة.

وفي الأول هتتلخبط وتتأخر: ده طبيعي. لو صعب جدًا، اشتغل على جملة جملة (وقّف بعد كل جملة) لحد ما تقدر تمشي مع الصوت.`,
            when: "كل يوم ٥–١٠ دقايق، ويفضّل الصبح أو قبل اجتماع مهم كـ «تسخين».",
            mistakes: R`تغيّر المقطع كل يوم. وتختار مقطع سريع جدًا أو من غير نص. وتركّز على الكلمات وتنسى الإيقاع (فتطلع صح بس «آلي»). ومتسجلش نفسك (فمش هتعرف اتحسنت ولا لأ). وتعمله بصوت واطي جدًا: قوله بصوت كلام عادي.`
          },
          lines: [
            R`الخطوة ١: مقطع دقيقة أو اتنين، معاه نص، ومتكلم واضح، ومن مستواك.`,
            R`الخطوة ٢: اسمع مرتين وانت بتقرا النص.`,
            R`الخطوة ٣: اقرا النص بصوت عالي مع الصوت.`,
            R`الخطوة ٤: من غير النص: اتكلم مع الصوت، متأخر ثانية أو اتنين.`,
            R`الخطوة ٥: سجّل نفسك وقارن بالأصلي.`,
            R`التركيز: قلّد الإيقاع والضغط، مش الكلمات بس. فين بيوقف؟ أنهي كلمات أعلى؟`,
            R`مثال لنص متعلّم: الـ | مكان الوقفة. going to بتتقال «گونا».`,
            R`نفس المقطع ٣–٥ أيام، ١٠ دقايق في اليوم، وبعدين غيّره.`
          ],
          sol: R`الفرق المتوقع بين تسجيل اليوم الأول والتالت: الأول متقطع ومتأخر عن الصوت وفيه كلمات مبلوعة. التالت أقرب لإيقاع الأصلي، والوقفات في مكانها، والكلمات الضعيفة ([[to]] و [[the]]) بقت ضعيفة فعلًا.

لو ملاحظتش فرق، غالبًا المقطع صعب عليك: اختار أبطأ، أو اشتغل على نص المقطع بس (٣٠ ثانية).

علامة نجاح مهمة: لو لقيت نفسك في اجتماع أو تسجيل تاني بتقول جملة من المقطع (زي [[So, what we're going to do today is...]]) بنفس الإيقاع، ده معناه إن الـ shadowing اشتغل: الجملة بقت بتاعتك.`
        },
        {
          cmd: "تسجّل نفسك",
          title: "تسجّل نفسك وتقيّم: checklist من ٦ نقط، و transcript بالـ AI يوريك اتفهمت ولا لأ",
          desc: R`أغلب الناس بتكره تسمع صوتها. بس ده أهم تمرين في التاب كله: انت مش بتسمع نفسك وانت بتتكلم (المخ مشغول)، فمش عارف غلطاتك. التسجيل بيوريك.

الأداة: مسجّل الصوت في الموبايل كفاية. وسمّي كل ملف بالتاريخ والموضوع ([[2026-10-01 standup]]).

الـ checklist (بعد كل تسجيل، اسمع مرة وعلّم): ١) السرعة: مريحة ولا بتجري؟ ٢) السكوت و [[ehh]]: كام مرة؟ ٣) صوت أو اتنين من اللي بتشتغل عليهم (p و v و th). ٤) الكلمات التقنية: النطق والضغط؟ ٥) الأزمنة: ماضي في الماضي؟ ٦) الوضوح: لو حد مش عارفك سمعه، هيفهم؟

والحيلة: حوّل التسجيل لنص بأداة speech-to-text (زي الـ transcription في Google Docs أو الموبايل أو أي تطبيق AI). لو الأداة كتبت كلمة غلط، غالبًا نطقك للكلمة دي مش واضح. ده اختبار «اتفهمت ولا لأ» مجاني.`,
          example: R`File name:  2026-10-01 standup.m4a
1. Speed:  comfortable / too fast / too slow
2. Fillers:  "ehh" x5, long pauses x2
3. Sounds:  p/b ok, v/f 2 mistakes ("serfer"), th ok
4. Tech words:  "determine" wrong stress, "cache" ok
5. Grammar:  "Yesterday I fix" → "fixed"
6. Clear to a stranger?  mostly yes
Transcript check:  the tool wrote "queue" as "cue you" → practice "queue"
Monthly:  listen to day 1 and day 30 back to back.`,
          try: R`سجّل نفسك دقيقة واحدة بتجاوب على [[What did you work on this week?]] (من غير تحضير). اسمعه وعبّي الـ checklist في [[log.md]]. وبعدين حوّله لنص بأي أداة speech-to-text، ولقّط كل كلمة الأداة كتبتها غلط. دي قايمة الأسبوع ده في [[sounds.md]].`,
          flag: "script",
          deep: {
            why: R`من غير تسجيل، انت بتتدرب على العمى: بتكرر نفس الغلطات ومش عارف. والتسجيل الشهري هو كمان أكبر مصدر حماس: لما تسمع يوم ١ ويوم ٣٠ ورا بعض، الفرق بيبان جدًا، وده بيخليك تكمّل.`,
            how: R`متقيّمش كل حاجة كل مرة: اختار ٢–٣ نقط من الـ checklist الأسبوع ده، حسب اللي بتشتغل عليه.

الـ transcript بالـ AI: أدوات speech-to-text الحديثة شاطرة جدًا، وأحيانًا بتفهم كلام مش واضح وتكتبه صح (بتخمّن من السياق). فلو كتبت الكلمة صح، ده مش ضمان إن نطقك ممتاز. بس لو كتبتها غلط، ده دليل قوي إن فيه مشكلة. استخدمها كإشارة، مش كحكم نهائي.

ولو عايز رأي في النطق: اطلب من صاحب إنجليزيته كويسة، أو مجتمعات تعلم اللغة، أو مدرس. الـ AI ممكن يساعد في الـ grammar من الـ transcript، بس تقييم النطق منه لسه مش مضمون ١٠٠٪.

خلي التسجيلات: فولدر على الموبايل أو Google Drive. التسجيل اللي بتكرهه النهارده هو اللي هيفرّحك بعد ٣ شهور.`,
            when: "٢–٣ مرات في الأسبوع على الأقل، وقبل أي انترفيو مهم (سجّل الإجابات الأساسية).",
            mistakes: R`تسجّل ومتسمعش. وتسمع وتقول «وحش» من غير ما تحدد إيه الوحش (الـ checklist بتحل ده). وتمسح التسجيلات القديمة (هتحتاجها للمقارنة). وتحاول تصلح كل حاجة مرة واحدة. وتعتمد على تقييم AI للنطق كأنه حقيقة.`
          },
          lines: [
            R`اسم الملف بالتاريخ والموضوع، عشان تقارن بعدين.`,
            R`السرعة: مريحة، ولا سريعة، ولا بطيئة.`,
            R`الحشو: عدد ehh والسكتات الطويلة.`,
            R`الأصوات: p و v و th. هنا غلطتين في v.`,
            R`الكلمات التقنية: determine الضغط غلط، و cache تمام.`,
            R`الـ grammar: fix ← fixed.`,
            R`الوضوح لحد غريب: غالبًا آه.`,
            R`الـ transcript: الأداة كتبت queue غلط ← اتمرن عليها.`,
            R`كل شهر: اسمع يوم ١ ويوم ٣٠ ورا بعض.`
          ],
          sol: R`مثال لـ [[log.md]] بعد أول تسجيل:
[[2026-10-01 — "this week" (1 min)]]
[[Speed: too fast at the start, better after 20s]]
[[Fillers: ehh x7, one 5-second pause]]
[[Sounds: "develop" said "defelop"]]
[[Grammar: "I am work on" → "I'm working on"]]
[[Transcript: "Nginx" → "engine necks", "suite" → "suit"]]
[[This week: v sound + "I'm working on"]]

المتوقع في أول تسجيل: ٥–١٠ [[ehh]]، و ٢–٤ غلطات أصوات، و ١–٣ غلطات أزمنة. ده طبيعي جدًا. المهم إنك تختار ٢ بس تشتغل عليهم الأسبوع ده، وتسجّل نفس السؤال بعد أسبوع وتقارن.`
        },
        {
          cmd: "٣٠ يوم ١٥ دقيقة",
          title: "خطة ٣٠ يوم للكلام: ١٥ دقيقة في اليوم، أسبوع لكل هدف",
          desc: R`خطة القراية والكتابة (٢٠ دقيقة في اليوم لـ ٩٠ يوم) في درس [[٢٠ دقيقة في اليوم]] في «تاب إنجليزي للمبرمج: قراية وكتابة». دي خطة الكلام: ٣٠ يوم، ١٥ دقيقة في اليوم، وممكن تمشي مع التانية أو بعدها.

كل يوم ٣ أجزاء ثابتة: ٥ دقايق سمع (من مستواك)، و ٥ دقايق shadowing أو تكرار جمل، و ٥ دقايق كلام متسجّل (الموضوع بيتغير كل أسبوع). وكل أسبوع ليه هدف:
الأسبوع ١: الأصوات والكلمات التقنية (دروس «تسمع وتنطق» و «كلمات تقنية بننطقها غلط»).
الأسبوع ٢: الشغل اليومي: standup، وطلب مساعدة، ومكالمات.
الأسبوع ٣: الشرح: PR، و demo، ومفهوم تقني بالقالب.
الأسبوع ٤: الانترفيو: about yourself، وقصتين STAR، و mock interview.

ويوم ٣٠: نفس التسجيل بتاع يوم ١ (نفس السؤال)، وقارن.`,
          example: R`Every day (15 min):  5 listen + 5 shadow/repeat + 5 speak and record
Day 1:  Record "Tell me about yourself" with no preparation. Keep it. Don't judge it yet.
Week 1 (sounds):  p/v, th, -ed endings, stress, 20 tech words (cache, queue, Nginx, determine...)
Week 2 (daily work):  a standup every day, 5 "help / clarify" phrases, video-call phrases
Week 3 (explaining):  explain one PR, one demo, and one concept (cache, REST, index) with the template
Week 4 (interview):  about yourself (3 times), 2 STAR stories, 1 technical concept, 1 mock interview with AI
Weekly:  one 1-minute recording on the same question, and one line in log.md
Day 30:  Record "Tell me about yourself" again. Listen to day 1 and day 30 back to back.
Missed a day?  Don't double up. Just continue tomorrow.`,
          try: R`النهارده يوم ١: سجّل «Tell me about yourself» من غير أي تحضير، وسيبه من غير ما تسمعه. واكتب الخطة في [[log.md]] بمواعيدك انت (إمتى الـ ١٥ دقيقة كل يوم؟)، وحط تذكير في الموبايل. وبعدين اعمل أول ١٥ دقيقة: ٥ سمع، و ٥ shadowing، و ٥ كلام عن أصوات p و v.`,
          flag: "script",
          deep: {
            why: R`الكلام بيتحسن بالتكرار اليومي الصغير، زي الرياضة. و ١٥ دقيقة صغيرة كفاية إنك متبطّلش. والهدف الأسبوعي بيخليك تركز بدل ما تتشتت. وتسجيل يوم ١ و ٣٠ هو الدليل اللي بيخليك تكمّل الشهر التاني.`,
            how: R`الميعاد الثابت أهم من الطول: مثلًا أول ١٥ دقيقة قبل ما تفتح الإيميل، أو في المواصلات (السمع والـ shadowing بالسماعة، والكلام لما توصل).

الكلام الـ ٥ دقايق: سجّل على الموبايل. مش لازم تسمعه كل يوم؛ اسمع مرتين في الأسبوع بالـ checklist (درس «تسجّل نفسك»).

لو عندك شغل حقيقي بالإنجليزي: استخدمه كتمرين. الـ standup الحقيقي هو تمرين الأسبوع ٢. والـ PR الحقيقي هو تمرين الأسبوع ٣.

بعد الـ ٣٠ يوم: كرر الخطة بمستوى أعلى (سمع أسرع، وقصص STAR أكتر، و mock interviews أكتر)، أو ركّز على أضعف أسبوع.

والـ AI مفيد في الأسبوع ٤ (الدرس الجاي)، وفي تصحيح الـ grammar من الـ transcripts. بس الكلام لازم يطلع منك انت.`,
            when: "ابدأ النهارده. ولو عندك انترفيو بعد شهر، ده بالظبط وقتها.",
            mistakes: R`تعمل ساعتين أول يوم وتبطّل تالت يوم. وتعوّض يوم فايت بـ ٣٠ دقيقة (بتحس بذنب وتبطّل). ومتسجلش يوم ١ (مش هتشوف الفرق). وتسمع بس من غير ما تتكلم (السمع لوحده مش بيحسّن الكلام كفاية). وتقيّم نفسك كل يوم بقسوة.`
          },
          lines: [
            R`كل يوم ١٥ دقيقة: ٥ سمع، و ٥ shadowing أو تكرار، و ٥ كلام متسجّل.`,
            R`يوم ١: سجّل «about yourself» من غير تحضير، واحتفظ بيه ومتحكمش عليه.`,
            R`الأسبوع ١: الأصوات والكلمات التقنية.`,
            R`الأسبوع ٢: الشغل اليومي: standup ومساعدة ومكالمات.`,
            R`الأسبوع ٣: الشرح: PR و demo ومفهوم تقني.`,
            R`الأسبوع ٤: الانترفيو: about yourself، و STAR، ومفهوم، و mock مع AI.`,
            R`كل أسبوع: تسجيل دقيقة على نفس السؤال، وسطر في log.md.`,
            R`يوم ٣٠: نفس تسجيل يوم ١، واسمعهم ورا بعض.`,
            R`فوّت يوم؟ متضاعفش. كمّل بكرة.`
          ],
          sol: R`شكل [[log.md]] بعد أسبوع:
[[Plan: 8:00-8:15 every day, before email]]
[[Day 1: recorded "about yourself" (1:40, not listened yet)]]
[[Day 2: BBC 6 min (5) + shadowing (5) + p/v sentences (5)]]
[[Day 3: ... + th sentences]]
[[Day 5: missed]]
[[Day 6: ... + -ed endings, standup recording]]
[[Week 1 check: "determine" and "cache" fixed; v still hard]]

المتوقع يوم ٣٠ مقارنة بيوم ١: المدة أقصر وأوضح (بتقول نقط مترتبة بدل ما تلف)، و [[ehh]] أقل للنص تقريبًا، وأسماء الـ stack بتتنطق صح، والأزمنة أنضف. النطق العام بيتحسن أبطأ من الباقي: ده طبيعي، كمّل شهر تاني.`
        },
        {
          cmd: "mock interview بالـ AI",
          title: "mock interview بالصوت مع AI: سكريبت جاهز، وإزاي تستخدمه بأمان",
          desc: R`تطبيقات الـ AI الحديثة (زي ChatGPT و Gemini و Claude، حسب اللي متاح عندك) فيها voice mode: بتكلمه بصوتك ويرد بصوت. وده بديل ممتاز لشريك تدريب، خصوصًا الساعة ١ بالليل قبل انترفيو. بس لازم تستخدمه صح.

الاستخدام الصح: هو الإنترفيوير، وانت اللي بتتكلم. تديله سيناريو واضح (الدور، والشركة، ونوع الأسئلة، وقد إيه صعب)، وتطلب منه يسأل سؤال واحد في المرة ويستنى إجابتك، ويعمل follow-ups، وفي الآخر يدّيك feedback مكتوب على الإجابات والإنجليزي.

الأمان: ١) متحطش أي حاجة سرية: كود الشركة، أو بيانات عملاء، أو تفاصيل عقد عليه NDA. ٢) شوف إعدادات الخصوصية في التطبيق (هل المحادثات بتتستخدم في التدريب، وهل التسجيلات بتتحفظ). ٣) الـ AI ممكن يغلط في المعلومات التقنية وفي تقييم النطق: خد الـ feedback كرأي مش كحقيقة. ٤) ممنوع تستخدمه أثناء الانترفيو الحقيقي إلا لو الشركة سمحت صراحة. ٥) متحفظش إجاباته هو: الإجابة لازم تبقى قصتك انت.`,
          example: R`Prompt:  You are a friendly but strict interviewer for a junior full-stack developer role at a small product company.
Prompt:  Ask me one question at a time and wait for my answer. Don't answer for me.
Prompt:  Start with "Tell me about yourself", then two behavioural questions, then two technical questions about JavaScript and databases.
Prompt:  Ask one follow-up question after each answer, like a real interviewer.
Prompt:  Speak at a normal speed. If I ask you to repeat, repeat more slowly.
Prompt:  At the end, give me written feedback: for each answer, one strength, one weakness, and my English mistakes with corrections.
Prompt:  Be honest. Don't just say "great answer".
Safety:  No company code, no client data, nothing under NDA. Check the app's privacy settings.
Safety:  AI feedback on pronunciation and technical facts can be wrong. Double-check.`,
          try: R`افتح voice mode في أي تطبيق AI متاح عندك، وابعت السكريبت ده (مكتوب أو بالصوت)، واعمل mock interview ١٥–٢٠ دقيقة. في الآخر اطلب الـ feedback والـ transcript. اكتب في [[log.md]]: أحسن إجابة، وأضعف إجابة، و ٣ غلطات إنجليزي اتكررت. وقارن الـ feedback بالـ checklist بتاعتك: متفق معاها؟`,
          flag: "script",
          deep: {
            why: R`أكبر مشكلة في التدريب على الانترفيو بالإنجليزي إنك مش لاقي حد يتمرن معاك كل يوم. والـ AI بالصوت بيحل ده: متاح طول الوقت، وصبور، وبيقدر يسأل follow-ups. بس لو استخدمته غلط (يكتبلك الإجابات، أو يمدحك على كل حاجة، أو تحطله أسرار الشغل) هيضرك أكتر ما يفيدك.`,
            how: R`اجعله صعب بالتدريج: أول مرة [[friendly]] وأسئلة معروفة، وبعدين [[strict]] وأسئلة مفاجئة، وبعدين اطلب منه يقاطعك أو يتكلم أسرع، أو يعمل لكنة معينة لو التطبيق بيدعم.

بعد الـ mock: اطلب الـ transcript، واقراه وانت بتدوّر على: جمل طويلة متلخبطة، و [[ehh]] كتير، وأزمنة غلط. الـ transcript نفسه أهم من الـ feedback أحيانًا.

الـ feedback: اطلب إنه يكون محدد ([[one strength, one weakness, and English mistakes with corrections]]). ولو قال حاجة عن النطق، اتأكد منها بـ YouGlish أو القاموس قبل ما تصدّق.

كرر نفس السؤال الضعيف في mock تاني بعد يومين، وقارن.

وتفاصيل استخدام الـ AI كمساعد مش بديل في درس [[AI يشرح مش يترجم]] في «تاب إنجليزي للمبرمج: قراية وكتابة».`,
            when: "الأسبوع ٤ من الخطة، وقبل أي انترفيو حقيقي بأسبوع (٣–٤ mocks)، وأي وقت عايز تتمرن ومفيش حد.",
            mistakes: R`تطلب منه يكتبلك إجابة وتحفظها. وتحط كود أو بيانات من شغلك. وتصدّق كل feedback (خصوصًا في النطق). وتستخدمه في انترفيو حقيقي من غير إذن (ممكن يتكشف ويتلغي الترشيح). وتعمل mock مكتوب بدل صوت (التاب ده عن الكلام!). وتقبل [[Great answer!]] على كل حاجة من غير ما تطلب نقد.`
          },
          lines: [
            R`الدور: «انت إنترفيوير ودود بس صارم لدور junior full-stack في شركة منتج صغيرة».`,
            R`«اسأل سؤال واحد في المرة واستنى إجابتي. متجاوبش بدالي».`,
            R`الترتيب: about yourself، وسؤالين سلوكيين، وسؤالين تقنيين في JS والداتابيز.`,
            R`«اسأل follow-up بعد كل إجابة، زي إنترفيوير حقيقي».`,
            R`«اتكلم بسرعة عادية. لو طلبت تعيد، عيد أبطأ».`,
            R`«في الآخر feedback مكتوب: لكل إجابة نقطة قوة ونقطة ضعف، وغلطات الإنجليزي بتصحيحها».`,
            R`«كن صريح. متقولش great answer وخلاص».`,
            R`الأمان: مفيش كود شركة، ولا بيانات عملاء، ولا حاجة تحت NDA. وشوف إعدادات الخصوصية.`,
            R`الأمان: تقييم الـ AI للنطق والمعلومات التقنية ممكن يغلط. اتأكد بنفسك.`
          ],
          sol: R`شكل [[log.md]] بعد أول mock:
[[Mock 1 (AI, voice, 18 min)]]
[[Best: STAR "learned fast" — clear, had numbers]]
[[Weakest: "What is a closure?" — no example, long pause]]
[[English: "I am agree", "Yesterday I fix", "discuss about" (x2)]]
[[Next: prepare closure with the 4-step template, redo in 2 days]]

المتوقع: الـ AI هيلقط غلطات الـ grammar كويس جدًا من الـ transcript، وهيدّي feedback معقول على هيكل الإجابات (فيه مثال؟ فيه أرقام؟). بس تعليقاته على النطق ممكن تبقى عامة أو غلط، لأنه غالبًا بيشتغل على النص اللي فهمه من صوتك.

علامة إنك استخدمته صح: الإجابات كلها منك، وفيه غلطات محددة هتشتغل عليها، وناوي تكرر. وعلامة الاستخدام الغلط: عندك ملف فيه «إجابات الـ AI المثالية» بتحفظه.`
        }
      ]
    }
  ]
});

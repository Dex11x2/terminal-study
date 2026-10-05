// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
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
    }
  ]
});

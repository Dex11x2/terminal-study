// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
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
          teach: R`## الفكرة: اسمع حاجة بتفهم منها ٦٠–٨٠٪، وزوّد كل شهر

المثال ٩ سطور: ٣ مستويات، وكل مستوى ليه نصيحة، وبعدين مصادر النطق، وقاعدة يومية، واختبار يحدد مستواك.

---

## ١. المستويات ونصيحة كل واحد

| المستوى | أمثلة من الدرس | النصيحة | ليه |
|---|---|---|---|
| ١ بطيء ومعاه نص | BBC 6 Minute English، و VOA Learning English، و Programming with Mosh | [[Watch at 0.75x speed. Read the transcript after, not before.]] | النص بعد السمع عشان ودنك تشتغل الأول |
| ٢ عادي وتقني | Web Dev Simplified، و Kevin Powell، و The Net Ninja، و Traversy Media، و ByteByteGo | [[Pick videos about things you already know]] | المخ يركز على الإنجليزي مش على المحتوى |
| ٣ سريع ونقاش | Fireship، و Theo، و ThePrimeagen، و Syntax، و talks | [[Listen to different accents]] | الفريق ممكن يبقى من أي بلد |

[[transcript]] = النص المكتوب للكلام. و [[0.75x]] بتتقري «point seven five X». و [[accents]] = لكنات.

## ٢. مصادر النطق (السطر السابع)

Rachel's English (أمريكي)، و English with Lucy (بريطاني)، و BBC «The Sounds of English»، و YouGlish للكلمات. دي متخصصة في الأصوات نفسها، مش محتوى تقني.

## ٣. القاعدة اليومية (السطر التامن)

[[10 minutes of listening, every day, beats 2 hours once a week.]]: [[beats]] = أحسن من (بيكسب). التكرار اليومي بيعوّد الودن.

## ٤. الاختبار (آخر سطر)

[[If you understand less than 60%, go down a level. More than 90%, go up.]]: [[go down a level]] = انزل مستوى. أقل من ٦٠٪ بيحبط، وأكتر من ٩٠٪ مش بيعلّم.

---

## الخلاصة

| نسبة الفهم | اعمل إيه |
|---|---|
| أقل من ٦٠٪ | انزل مستوى |
| ٦٠–٩٠٪ | ده مستواك، اسمع منه شهر |
| أكتر من ٩٠٪ | اطلع مستوى |

والقنوات بتتغير؛ لو واحدة وقفت، دوّر على بديل بنفس المستوى.`,
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
          teach: R`## الفكرة: نفس الفيديو ٣ مرات، والـ subtitles بتقل مرة ورا مرة

المثال ٧ سطور: خطة ٣ شهور (٤ سطور)، وإعدادات YouTube، والقاعدة، وتحذير.

---

## ١. الخطة (أول ٤ سطور)

| الفترة | الترتيب | الهدف |
|---|---|---|
| أسبوع ١–٢ | عربي ← إنجليزي ← من غير | تفهم المحتوى، وبعدين تربط الصوت بالكلمة |
| أسبوع ٣–٤ | إنجليزي ← من غير ← shadowing دقيقة | شيلت العربي، وبدأت تقلّد |
| الشهر التاني | من غير الأول ← إنجليزي للأجزاء اللي فاتتك بس | الودن الأول |
| الشهر التالت | من غير خالص، وتكتب الجمل اللي ملقطتهاش | اختبار |

السهم [[→]] = وبعدين. و [[Same 5-minute video]] = نفس الفيديو، مش فيديو جديد كل مرة.

## ٢. إعدادات YouTube (السطر الخامس)

[[Settings → Subtitles → English (auto-generated) → Playback speed 0.75]]: [[auto-generated]] = متعملة أوتوماتيك. و [[Playback speed]] = سرعة التشغيل.

## ٣. القاعدة والتحذير (آخر سطرين)

[[Same video 3 times > 3 different videos once.]]: علامة [[>]] هنا «أحسن من». المرة التالتة بتسمع الكلمات اللي قريتها في التانية.

[[Auto-generated captions often get tool names wrong: "next JS" may show as "next yes".]]: [[captions]] = subtitles. الأسماء التقنية أكتر حاجة بتتكتب غلط، ودي فرصة: انت فاهم أكتر من الماكينة.

---

## ٤. ليه مسمعتش جملة وانت شايفها مكتوبة؟

| السبب | مثال |
|---|---|
| كلمتين اتوصلوا | [[want to]] «وانا»، و [[going to]] «گونا»، و [[kind of]] «كايندا» |
| كلمة صغيرة اتبلعت | [[and]] بقت «ن»، و [[of]] بقت «ڤ» |
| كلمة جديدة | |
| لكنة | |

أول نوعين هما الأكتر، ودي قواعد الكلام السريع مش «إنجليزي صعب».

---

## الخلاصة

- عربي مرة بس لو مش فاهم خالص، وبعدها إنجليزي، وبعدها من غير.
- نفس الفيديو ٣ مرات.
- اكتب الجملة بشكلها المكتوب والمسموع: [[going to → "gonna"]].`,
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
          teach: R`## الفكرة: تتكلم **مع** المتكلم، متأخر ثانية، زي الضل

المثال ٨ سطور: ٥ خطوات، وعلى إيه تركّز، ونص متعلّم، وقاعدة التكرار.

---

## ١. الخطوات الخمسة (أول ٥ سطور)

| الخطوة | الجملة | بتدرّب إيه |
|---|---|---|
| ١ | [[Pick a 1-2 minute clip with a transcript. Clear speaker. Your level.]] | الاختيار |
| ٢ | [[Listen twice while reading the transcript.]] | تفهم وتعرف الكلمات |
| ٣ | [[Read the transcript aloud together with the audio.]] | تقرا وتسمع وتتكلم مع بعض |
| ٤ | [[No transcript: speak together with the audio, one or two seconds behind.]] | الـ shadowing الحقيقي |
| ٥ | [[Record yourself shadowing. Compare with the original.]] | تشوف الفرق |

[[aloud]] = بصوت عالي. و [[one or two seconds behind]] = متأخر ثانية أو اتنين. و [[clip]] = مقطع.

## ٢. التركيز (السطر السادس)

[[Copy the rhythm and the stress, not only the words. Where do they pause? Which words are loud?]]: [[rhythm]] «**رِ**-ذَم» = الإيقاع. الكلمات المهمة (أسماء وأفعال) أعلى، و [[the]] و [[to]] و [[of]] ضعيفة.

## ٣. النص المتعلّم (السطر السابع)

~~~text Sample
So, what we're going to do today | is build a REST API | with Node and Express.
~~~

الـ [[|]] مكان الوقفة. يعني الجملة ٣ حتت بتتقال كل حتة في نفَس. و [[going to]] بتتقال «گونا»، و [[what we're]] بتتوصل «وات وير».

## ٤. التكرار (آخر سطر)

[[Same clip for 3 to 5 days, 10 minutes a day, then change it.]]: نفس المقطع لحد ما تحس إنك بتقوله بإيقاعه.

---

## الخلاصة

| الترتيب | ركّز على |
|---|---|
| ١ | الإيقاع والوقفات |
| ٢ | الكلمات المتوصلة ([[gonna]]) |
| ٣ | الأصوات (th و p و v) |

الهدف الوضوح مش اللكنة الأمريكية. وسجّل يوم ١ ويوم ٣ وقارن.`,
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
          teach: R`## الفكرة: ٦ نقط تقيّم بيها أي تسجيل، و transcript يكشف الكلمات المش واضحة

المثال شكل تقييم تسجيل واحد: اسم الملف، و ٦ نقط، وفحص الـ transcript، وقاعدة شهرية.

---

## ١. اسم الملف (السطر الأول)

[[2026-10-01 standup.m4a]]: التاريخ بالشكل ده (سنة-شهر-يوم) بيخلي الملفات تترتب لوحدها. و [[m4a]] صيغة الصوت اللي الموبايل بيسجّل بيها غالبًا.

## ٢. الـ checklist (السطر ٢ لـ ٧)

| النقطة | المثال في الدرس | معناه |
|---|---|---|
| Speed | [[comfortable / too fast / too slow]] | اختار واحدة |
| Fillers | [[ehh x5, long pauses x2]] | [[x5]] = ٥ مرات. [[fillers]] = كلام حشو |
| Sounds | [[v/f 2 mistakes ("serfer")]] | الأصوات اللي بتشتغل عليها |
| Tech words | [[determine wrong stress, cache ok]] | النطق والضغط |
| Grammar | [[Yesterday I fix → fixed]] | الأزمنة |
| Clear to a stranger? | [[mostly yes]] | لو حد مش عارفك سمعه، هيفهم؟ |

## ٣. فحص الـ transcript (السطر التامن)

[[the tool wrote "queue" as "cue you" → practice "queue"]]: أداة speech-to-text كتبت كلمتين بدل [[queue]]، يعني النطق طلع «كيو يو» بدل «كيو». القاعدة: لو الأداة غلطت في كلمة، غالبًا نطقك ليها مش واضح. ولو كتبتها صح، ده مش ضمان (الأدوات بتخمّن من السياق).

## ٤. القاعدة الشهرية (آخر سطر)

[[listen to day 1 and day 30 back to back]]: [[back to back]] = ورا بعض على طول. الفرق بيبان وده اللي بيخليك تكمّل.

---

## الخلاصة

- سمّي الملف بالتاريخ والموضوع، ومتمسحش القديم.
- اختار ٢–٣ نقط بس من الـ checklist كل أسبوع.
- الـ transcript إشارة مش حكم: الغلط فيه دليل، والصح مش ضمان.`,
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
          teach: R`## الفكرة: ١٥ دقيقة ثابتة كل يوم، وهدف لكل أسبوع، ونفس التسجيل يوم ١ ويوم ٣٠

المثال ٩ سطور: التقسيم اليومي، ويوم ١، و ٤ أسابيع، والقاعدة الأسبوعية، ويوم ٣٠، ولو فوّت يوم.

---

## ١. اليوم الواحد (السطر الأول)

[[5 listen + 5 shadow/repeat + 5 speak and record]]: ٣ أجزاء ثابتة. السمع بيدخّل، والـ shadowing بيقلّد، والكلام بيطلّع.

## ٢. يوم ١ (السطر التاني)

[[Record "Tell me about yourself" with no preparation. Keep it. Don't judge it yet.]]: [[with no preparation]] = من غير تحضير، عشان يبقى نقطة البداية الحقيقية. و [[Don't judge it yet]] = متحكمش عليه دلوقتي.

## ٣. الأسابيع الأربعة (السطر ٣ لـ ٦)

| الأسبوع | الهدف | الدروس |
|---|---|---|
| ١ [[sounds]] | p/v و th و -ed والضغط و ٢٠ كلمة تقنية | «تسمع وتنطق» و «كلمات تقنية» |
| ٢ [[daily work]] | standup كل يوم، وجمل المساعدة، والمكالمات | «الـ standup» و «مكالمات الفيديو» |
| ٣ [[explaining]] | PR، و demo، ومفهوم بالقالب | «تشرح كودك» و «قالب الشرح» |
| ٤ [[interview]] | about yourself ٣ مرات، وقصتين STAR، ومفهوم، و mock مع AI | تالت مستوى في التاب |

الترتيب ده مقصود: الأصوات الأول لأنها في كل جملة، والانترفيو في الآخر لأنه بيستخدم كل اللي قبله.

## ٤. الأسبوعي ويوم ٣٠ (السطر ٧ و ٨)

[[one 1-minute recording on the same question, and one line in log.md]] كل أسبوع. ويوم ٣٠: نفس سؤال يوم ١، واسمعهم [[back to back]].

## ٥. فوّت يوم (آخر سطر)

[[Missed a day? Don't double up. Just continue tomorrow.]]: [[double up]] = تعمل الضعف. التعويض بيحسسك بذنب وبيخليك تبطّل؛ كمّل عادي.

---

## الخلاصة

| إمتى | إيه |
|---|---|
| كل يوم | ٥ سمع + ٥ shadowing + ٥ كلام متسجّل |
| كل أسبوع | هدف واحد + تسجيل دقيقة + سطر في log.md |
| يوم ١ ويوم ٣٠ | نفس السؤال، وقارن |

الميعاد الثابت أهم من الطول.`,
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
          teach: R`## الفكرة: الـ AI هو الإنترفيوير، وانت اللي بتتكلم، ومفيش أسرار

المثال سكريبت (prompt) من ٧ سطور، وسطرين أمان. كل سطر في السكريبت بيحل مشكلة معينة في الـ mock.

---

## ١. السكريبت سطر سطر

| السطر | بيحل إيه |
|---|---|
| [[You are a friendly but strict interviewer for a junior full-stack developer role at a small product company.]] | الدور والمستوى: [[friendly but strict]] = لطيف بس مش هيعدّيلك |
| [[Ask me one question at a time and wait for my answer. Don't answer for me.]] | من غيرها بيرمي ٥ أسئلة مرة واحدة، أو يجاوب هو |
| [[Start with "Tell me about yourself", then two behavioural questions, then two technical questions about JavaScript and databases.]] | ترتيب انترفيو حقيقي |
| [[Ask one follow-up question after each answer, like a real interviewer.]] | الـ follow-ups هي اللي بتكشف الحفظ |
| [[Speak at a normal speed. If I ask you to repeat, repeat more slowly.]] | تدريب على السرعة الحقيقية، و [[Could you repeat that?]] |
| [[At the end, give me written feedback: for each answer, one strength, one weakness, and my English mistakes with corrections.]] | feedback محدد مش عام |
| [[Be honest. Don't just say "great answer".]] | من غيرها بيمدح كل حاجة |

[[behavioural]] = سلوكي (STAR)، بالبريطاني بـ [[ou]] والأمريكي [[behavioral]]. و [[strength]] «سترِنگث» و [[weakness]] «**ويك**-نِس».

## ٢. الأمان (آخر سطرين)

| القاعدة | ليه |
|---|---|
| [[No company code, no client data, nothing under NDA.]] | [[NDA]] = اتفاقية عدم إفصاح. اللي بتكتبه ممكن يتحفظ |
| [[Check the app's privacy settings.]] | هل المحادثات بتستخدم في التدريب؟ |
| [[AI feedback on pronunciation and technical facts can be wrong. Double-check.]] | [[Double-check]] = اتأكد تاني (بـ YouGlish أو القاموس أو الـ docs) |

وممنوع تستخدمه أثناء انترفيو حقيقي إلا لو الشركة سمحت صراحة.

---

## الخلاصة

- السكريبت: دور + سؤال واحد في المرة + follow-ups + feedback محدد + صراحة.
- اطلب الـ transcript، ودوّر فيه على جمل متلخبطة وأزمنة غلط.
- الإجابات منك انت؛ لو عندك ملف «إجابات الـ AI المثالية» بتحفظه، انت بتستخدمه غلط.`,
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
]);

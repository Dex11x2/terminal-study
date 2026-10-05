// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
    {
      t: "تقرا README وصفحة docs",
      l: 1,
      n: "أقسام الـ README و Getting started، وصفحة API reference (parameters و returns و throws)، وكلمات زي optional و defaults to و must و should، وإزاي تقرا بسرعة",
      items: [
        {
          cmd: "README و Getting started",
          title: "README فيه إيه، وتقرا Getting started إزاي من غير ما تتوه؟",
          desc: R`أي مكتبة أو أداة ليها README على GitHub، وأغلبهم بنفس الترتيب تقريبًا. لو عارف الترتيب ده هتروح للقسم اللي محتاجه على طول بدل ما تقرا كل حاجة.

الأقسام الشائعة: وصف في سطر (المكتبة بتعمل إيه)، و [[Features]] المميزات، و [[Prerequisites]] أو [[Requirements]] اللي لازم يبقى عندك قبل ما تبدأ (Node 20+ مثلًا)، و [[Installation]] التسطيب، و [[Quick start]] أو [[Getting started]] أقصر طريق لأول نتيجة، و [[Usage]] الاستخدام بأمثلة، و [[Configuration]] أو [[Options]] الإعدادات، و [[API]] قايمة الدوال، و [[FAQ]] أسئلة متكررة، و [[Troubleshooting]] لو حاجة باظت، و [[Contributing]] لو عايز تساهم، و [[License]] الرخصة، و [[Changelog]] التغييرات.

الـ Getting started بيبقى خطوات بالأمر (imperative) ومرقّمة. اقراها زي وصفة أكل: كل خطوة بالترتيب، ومتعدّيش خطوة لأنها «شكلها مش مهمة».`,
          example: R`# acme-cli
A tiny CLI to resize images from the terminal.
## Prerequisites
- Node.js 20 or later
## Installation
npm install -g acme-cli
## Quick start
acme resize photo.jpg --width 800
This creates photo-800.jpg in the same folder.
## Configuration
Options can be set in acme.config.json. CLI flags take precedence over the config file.
## Troubleshooting
If you see "command not found", make sure your global npm bin folder is in your PATH.`,
          try: R`افتح README بتاع مكتبة بتستخدمها (مثلًا [[zod]] أو [[vite]] أو [[express]] على GitHub). اعمل قايمة بالأقسام اللي فيه، ولكل قسم جملة عربي بيقول فيه إيه. وبعدين نفّذ الـ Quick start بتاعه خطوة خطوة في فولدر تجربة، واكتب أي كلمة وقفتك في [[words.md]].`,
          flag: "script",
          deep: {
            why: "أول حاجة بتعملها مع أي أداة جديدة هي قراية README. لو بتوه فيه، بتروح لـ YouTube tutorial قديم بدل المصدر الرسمي، وده بيجيبلك كود قديم وأخطاء غريبة.",
            how: R`كلمات الـ README اللي لازم تعرفها: [[or later]] / [[or higher]] / [[+]] = الإصدار ده أو أحدث، و [[take precedence over]] = ليها الأولوية على (لما يتعارضوا، دي اللي بتكسب)، و [[make sure]] = اتأكد، و [[out of the box]] = شغال من غير إعداد، و [[zero-config]] = مش محتاج إعداد، و [[lightweight]] = خفيفة، و [[drop-in replacement]] = بديل تحطه مكان التاني من غير ما تغيّر كودك، و [[boilerplate]] = كود متكرر جاهز، و [[under the hood]] = من جوه، و [[opinionated]] = ليها طريقة واحدة بتفرضها عليك.

السطر اللي بعد الأمر غالبًا بيقولك النتيجة المتوقعة ([[This creates photo-800.jpg]]). لو النتيجة عندك غيرها، وقف هنا قبل الخطوة الجاية.

وخلي بالك: الـ README على GitHub بيبقى لآخر إصدار في الـ main branch، وساعات لإصدار لسه منزلش. لو انت على إصدار أقدم، شوف الـ docs بتاعة إصدارك أو الـ tag.`,
            when: "أول ما تفكر تستخدم أي مكتبة، وقبل ما تسأل سؤال عنها. ولما تكتب README لمشروعك (المستوى ٢) انقل نفس الترتيب.",
            mistakes: R`تقفز على [[Usage]] وتعدّي [[Prerequisites]]، وبعدين تلاقي خطأ غريب سببه إن Node عندك قديم. وتفهم [[take precedence over]] بالعكس. وتنسخ الأوامر من README الـ main وانت مسطّب إصدار قديم.`
          },
          lines: [
            R`الوصف في سطر: «CLI صغير بيغيّر مقاس الصور من الـ terminal». tiny = صغير جدًا.`,
            R`- Node.js 20 or later = «Node 20 أو أحدث». قبل أي حاجة اتأكد بـ [[node -v]].`,
            R`أمر التسطيب. [[-g]] = global، يعني يبقى متاح في أي فولدر.`,
            R`أول أمر تجربة: غيّر عرض الصورة لـ ٨٠٠.`,
            R`النتيجة المتوقعة: «ده بيعمل photo-800.jpg في نفس الفولدر». لو مطلعش، وقف.`,
            R`«الإعدادات ممكن تتحط في acme.config.json. الـ flags في الأمر ليها الأولوية على ملف الإعدادات». take precedence over = تكسب لما يتعارضوا.`,
            R`«لو شفت command not found، اتأكد إن فولدر npm العام موجود في الـ PATH».`
          ],
          sol: R`مثال لـ README بتاع zod (الأقسام بتتغير مع الوقت): فيه وصف ([[TypeScript-first schema validation with static type inference]] ← «validation بـ schema مبنية لـ TypeScript الأول، وبتستنتج الأنواع لوحدها»)، و Installation ([[npm install zod]])، و Requirements (نسخة TypeScript معينة و [[strict]] مفعّل)، وأمثلة Basic usage، ولينك للـ docs الكاملة.

الـ Quick start نفّذته صح لو: الأمر اشتغل، والنتيجة زي ما الـ README قال. لو فيه خطوة فشلت، اكتب الرسالة في [[errors.md]] وارجع لقسم Prerequisites: غالبًا إصدار Node أو TypeScript.

كلمات متوقع تقابلها وتضيفها: [[static]] = وقت الكتابة مش التشغيل، و [[inference]] = استنتاج، و [[schema]] = وصف لشكل الداتا، و [[ecosystem]] = المكتبات اللي حوالين الأداة.`
        },
        {
          cmd: "صفحة API reference",
          title: "صفحة API: Syntax و Parameters و Return value و Exceptions و Examples",
          desc: R`صفحة الـ API reference هي «كتالوج» الدالة. MDN و Node docs وأغلب المكتبات بيستخدموا نفس الأقسام تقريبًا، فلو اتعلمتهم مرة هتقرا أي docs.

[[Syntax]] أو [[Signature]] شكل النداء، و [[Parameters]] أو [[Arguments]] اللي بتبعته (ومعاها النوع، ومطلوب ولا اختياري، والـ default)، و [[Return value]] أو [[Returns]] اللي بيرجع، و [[Exceptions]] أو [[Throws]] أو [[Errors]] إمتى بيرمي خطأ، و [[Description]] شرح مفصّل، و [[Examples]] أمثلة، و [[Browser compatibility]] المتصفحات اللي بتدعمه، و [[See also]] صفحات مرتبطة.

علامات مهمة في الـ Syntax: الأقواس المربعة [[[ ]]] حوالين باراميتر يعني اختياري. فـ [[fs.readFile(path[, options], callback)]] يعني [[options]] ممكن تسيبه. و [[...args]] يعني أي عدد.`,
          example: R`fs.readFile(path[, options], callback)
  path <string> | <Buffer> | <URL> | <integer> filename or file descriptor
  options <Object> | <string>
    encoding <string> | <null> Default: null
    flag <string> Default: 'r'
  callback <Function>
    err <Error> | <AggregateError>
    data <string> | <Buffer>
Asynchronously reads the entire contents of a file.
The callback is passed two arguments (err, data), where data is the contents of the file.
If no encoding is specified, then the raw buffer is returned.
If options is a string, then it specifies the encoding.`,
          try: R`شغّل [[node -e 'console.log(require("fs").readFileSync("package.json"))']] في أي فولدر فيه package.json، وبعدين نفس الأمر بـ [[, "utf8"]] بعد اسم الملف. قارن الناتجين بالجملة [[If no encoding is specified, then the raw buffer is returned]]. هل الـ docs صادقة؟`,
          flag: "script",
          deep: {
            why: "الـ docs هي المصدر الوحيد اللي أكيد صح لإصدارك. الـ tutorials والـ AI ممكن يكونوا قدام أو ورا. ولو عرفت تقرا صفحة API في دقيقتين، هتبطّل تخمّن.",
            how: R`اقرا الصفحة بالترتيب ده: ١) الـ Syntax (شكل النداء). ٢) الـ Parameters: إيه الإجباري؟ وإيه الـ Default؟ ٣) الـ Return value: هيرجعلي إيه؟ Promise؟ ٤) Exceptions: إمتى يفشل؟ ٥) أول مثال. الـ Description سيبها للآخر أو لما تحتاج تفصيلة.

الكلمات: [[Asynchronously]] = مش بيستنى (callback أو Promise)، و [[Synchronously]] = بيوقف لحد ما يخلص، و [[entire]] = كله، و [[contents]] = المحتوى، و [[is passed]] = بيتبعتله، و [[where]] هنا = «بحيث إن» (بتشرح حاجة اتذكرت)، و [[specified]] = اتحدد، و [[raw]] = خام (bytes مش نص)، و [[file descriptor]] = رقم بيمثل ملف مفتوح.

علامات النوع [[<string> | <Buffer>]] يعني «string أو Buffer» ([[|]] = أو، زي union في TypeScript).`,
            when: "كل مرة تستخدم دالة لأول مرة، وكل مرة دالة بترجع حاجة غير اللي متوقعها.",
            mistakes: R`تفتكر إن [[[, options]]] جزء من الكود وتكتب الأقواس المربعة. وتعدّي [[Default:]] وتستغرب ليه النتيجة Buffer مش نص. وتقرا docs إصدار غير اللي عندك: Node docs فوق فيها اختيار الإصدار، وكل دالة فيها [[Added in: vX]] و [[History]].`
          },
          lines: [
            R`الـ Syntax. الأقواس المربعة حوالين [[, options]] = اختياري.`,
            R`path: ممكن string أو Buffer أو URL أو رقم. «اسم الملف أو file descriptor».`,
            R`options: object أو string.`,
            R`encoding: الافتراضي null. يعني لو مبعتهوش، مفيش تحويل لنص.`,
            R`flag: الافتراضي 'r' (read = قراية).`,
            R`callback: دالة.`,
            R`err: خطأ لو حصل.`,
            R`data: المحتوى، string أو Buffer.`,
            R`«بتقرا محتوى الملف كله بشكل async».`,
            R`«الـ callback بيتبعتله اتنين arguments (err, data)، بحيث إن data هي محتوى الملف».`,
            R`«لو محددتش encoding، بيرجع الـ buffer الخام». ودي الجملة اللي بتفسر الـ Buffer الغريب.`,
            R`«لو options كانت string، يبقى هي الـ encoding». عشان كده [[readFile(p, "utf8", cb)]] شغالة.`
          ],
          sol: R`الأمر الأول بيطبع حاجة زي [[<Buffer 7b 0a 20 20 22 6e 61 6d 65 ...>]]: bytes خام، لأنك مبعتش encoding والـ Default [[null]]. التاني بيطبع محتوى package.json كنص عادي، لأن [["utf8"]] كـ string اتفهمت encoding.

يعني الـ docs صادقة بالظبط: [[If no encoding is specified, then the raw buffer is returned]] و [[If options is a string, then it specifies the encoding]].

(ده النص من Node docs لـ [[fs.readFile]]، و [[readFileSync]] ليها نفس القاعدة. الصفحة الرسمية فيها كمان [[signal]] وحاجات تانية حسب إصدارك.)`
        },
        {
          cmd: "optional و defaults to",
          title: "optional و defaults to و must و should و may: الـ docs بتلزمك بإيه؟",
          desc: R`الـ docs بتستخدم كلمات بعينها عشان تقول «ده إجباري» أو «ده نصيحة» أو «ده مسموح». لو قريتهم بدقة هتفرق بين قاعدة لو كسرتها الكود هيقع، ونصيحة لو كسرتها هتدفع التمن بعدين.

[[must]] / [[required]] لازم (مش اختيار)، و [[must not]] ممنوع، و [[should]] المفروض (نصيحة قوية، ممكن تخالفها لو عارف ليه)، و [[should not]] المفروض لأ، و [[may]] / [[can]] مسموح أو ممكن، و [[optional]] اختياري، و [[defaults to]] قيمته الافتراضية، و [[if omitted]] لو سبته، و [[by default]] افتراضيًا، و [[recommended]] يُفضّل، و [[discouraged]] مش مُفضّل، و [[note]] خد بالك، و [[warning]] / [[caution]] تحذير، و [[caveat]] استثناء أو عيب لازم تعرفه، و [[deprecated]] هيتشال.

[[may]] ليها معنيين: «مسموح» ([[You may pass a second argument]]) و «ممكن يحصل» ([[This may take a few minutes]]). السياق بيحدد.`,
          example: R`must          The name must be unique.
must not      You must not commit the .env file.
should        You should run migrations in a transaction.
may           The callback may be called more than once.
optional      timeout (optional): number of milliseconds to wait.
defaults to   port defaults to 3000.
if omitted    If omitted, the current directory is used.
by default    By default, logs are written to stdout.
recommended   This option is recommended for production.
note          Note: this method does not modify the original array.
warning       Warning: this action cannot be undone.
caveat        One caveat: the cache is not shared between workers.`,
          try: R`افتح صفحة MDN لـ [[Array.prototype.splice()]] وصفحة [[Array.prototype.toSpliced()]]. دوّر في كل واحدة على [[modifies]] أو [[changes]] أو [[new array]] أو [[in place]]. اكتب جملة إنجليزي واحدة بتقول الفرق، واستخدم فيها [[must]] أو [[should]].`,
          flag: "script",
          deep: {
            why: R`فيه مواصفات رسمية (زي RFC 2119) معرّفة فيها [[MUST]] و [[SHOULD]] و [[MAY]] بمعاني دقيقة، والـ docs العادية بتمشي على نفس الروح. لو خلطت must بـ should هتعمل حاجات مش لازم، أو تسيب حاجات لازم.`,
            how: R`الترتيب من الأقوى للأضعف: [[must]] > [[should]] > [[may]]. وفي النفي: [[must not]] ممنوع، و [[should not]] مش مفضّل، و [[need not]] / [[don't have to]] مش لازم (مسموح تعمل أو لأ).

وخلي بالك من الفرق ده بالظبط: [[You must not use X]] = ممنوع تستخدمه. [[You don't have to use X]] = مش لازم تستخدمه (بس مسموح). الترجمة الحرفية لـ «مش لازم» بتخلي ناس كتير تقول [[mustn't]] وهي تقصد [[don't have to]].

و [[cannot be undone]] = مينفعش يترجع. و [[more than once]] = أكتر من مرة (ودي تحذير: الـ callback بتاعك لازم يستحمل ده). و [[does not modify the original]] = مبيغيّرش الأصل.

تفاصيل MUST/SHOULD/MAY في الـ specs في المستوى ٣.`,
            when: "كل صفحة docs، وكل ما تكتب تعليمات لحد (README، أو رسالة review).",
            mistakes: R`[[You mustn't install it globally]] وانت قصدك «مش لازم»: الصح [[You don't have to install it globally]]. و [[This parameter is optional, defaults 10]] ناقصة [[to]]: [[defaults to 10]]. و [[it's must]] غلط شائع جدًا عند المصريين، الصح [[it's required]] أو [[you must]] أو [[it's a must]] (عامية).`
          },
          lines: [
            R`must = لازم. «الاسم لازم يبقى فريد».`,
            R`must not = ممنوع. «ممنوع تعمل commit لملف .env».`,
            R`should = المفروض. «المفروض تشغّل الـ migrations جوه transaction».`,
            R`may = ممكن يحصل. «الـ callback ممكن يتنادى أكتر من مرة». تحذير.`,
            R`optional = اختياري. «timeout (اختياري): عدد المللي ثانية للانتظار».`,
            R`defaults to = قيمته الافتراضية. «البورت افتراضيًا 3000».`,
            R`If omitted = لو سبته. «لو مبعتهوش، بيستخدم الفولدر الحالي».`,
            R`By default = افتراضيًا. «الـ logs بتتكتب في stdout».`,
            R`recommended = يُفضّل. «الإعداد ده مفضّل في الإنتاج».`,
            R`Note = خد بالك. «الدالة دي مبتغيرش الـ array الأصلي».`,
            R`Warning + cannot be undone = تحذير: «مينفعش ترجع فيه».`,
            R`caveat = عيب/استثناء. «فيه حاجة: الـ cache مش مشترك بين الـ workers».`
          ],
          sol: R`في MDN: [[splice()]] [[changes the contents of an array]] (بتعدّل الأصل in place)، و [[toSpliced()]] بترجع [[a new array]] ومبتغيرش الأصل (دي نسخة الـ copying من splice).

جملة صح:
[[splice() modifies the original array, so you should use toSpliced() when you must keep the original unchanged (for example, in React state).]]

لو كتبت [[you must use toSpliced()]] بس من غير شرط، ده أقوى من اللازم: splice مش ممنوعة، هي بس مش مناسبة للـ state. عشان كده [[should]] هنا أدق. و [[unchanged]] = من غير تغيير.`
        },
        {
          cmd: "skimming",
          title: "تقرا صفحة docs طويلة في ٣ دقايق (skimming) من غير ما تترجم كل كلمة",
          desc: R`أكبر غلطة عند اللي إنجليزيته ضعيفة: يقرا كل كلمة ويترجمها، فالصفحة تاخد ساعة وهو زهق بعد ١٠ دقايق. المبرمجين المتعودين مبيقروش كده. بيعملوا [[skimming]] (يلقطوا الشكل العام بسرعة) و [[scanning]] (يدوّروا على حاجة معينة).

الطريقة: ١) اقرا العناوين بس ([[h2]] و [[h3]]) عشان تعرف الصفحة فيها إيه. ٢) بص على الكود قبل الكلام: الأمثلة بتفهمك ٧٠٪. ٣) اقرا أول جملة في كل فقرة بس (غالبًا هي الفكرة). ٤) دوّر على الكلمات المهمة: [[must]] و [[not]] و [[only]] و [[unless]] و [[Warning]] و [[Note]] و [[deprecated]] والأرقام. ٥) Ctrl+F بالكلمة اللي انت محتاجها. ٦) الكلمة اللي مش فاهمها: لو ممكن تفهم الجملة من غيرها، عدّيها. لو لأ، دوّر عليها واكتبها في [[words.md]].`,
          example: R`Skim plan for one docs page (3 minutes)
1. Headings only          -> what is on this page?
2. Code blocks            -> what does it look like in practice?
3. First sentence of each paragraph -> the main idea
4. Signal words           -> must, not, only, unless, Warning, Note, deprecated, numbers
5. Ctrl+F                 -> the exact word you need (e.g. "timeout")
6. Unknown word           -> skip it if the sentence still makes sense; otherwise look it up
7. Write one line         -> "This page explains ... The key rule is ..."`,
          try: R`خد صفحة docs طويلة ماقريتهاش قبل كده (مثلًا صفحة [[Caching]] في Next.js docs أو صفحة [[useEffect]] في react.dev). اضبط تايمر ٣ دقايق وطبّق الخطة. بعدها اقفل الصفحة واكتب سطرين: [[This page explains ... The key rule is ...]]. وبعدين ارجع اقرا الصفحة كويس وقارن: فاتك إيه؟`,
          flag: "script",
          deep: {
            why: "مش هتقدر تقرا كل حاجة بعمق، ومحدش بيعمل كده. الـ skimming بيخليك تعرف الصفحة دي فيها اللي محتاجه ولا لأ في دقيقتين، وتقرا بعمق الجزء المهم بس. ومع الوقت سرعتك في القراية كلها بتزيد.",
            how: R`اللي بيخلي الـ skimming ينفع مع الـ docs إن الـ docs مكتوبة بطريقة ثابتة: عنوان بيقول الموضوع، وجملة أولى بتقول الفكرة، وكود بيوضّح، وتحذيرات في صناديق ملونة (Note و Warning و Caution و Pitfall في react.dev).

لما تقابل كلمة مش عارفها، اسأل نفسك ٣ أسئلة: هل هي في العنوان؟ هل بتتكرر؟ هل الجملة من غيرها مفهومة؟ لو «لأ، لأ، آه» عدّيها. لو غير كده دوّر عليها.

ومع الوقت: الصفحة اللي خدت منك ١٥ دقيقة هتاخد ٥. ده بيحصل بعد حوالي شهرين من القراية اليومية (خطة الـ ٩٠ يوم في المستوى ٣).`,
            when: "أول مرة تفتح أي صفحة docs. والقراية العميقة لما تلاقي الجزء اللي انت محتاجه فعلًا.",
            mistakes: R`تترجم الصفحة كلها بـ Google Translate: بتفهم الفكرة بس مبتتعلمش حاجة، والترجمة ساعات بتغلط في المصطلحات ([[state]] تبقى «ولاية»!). وتعدّي صناديق Warning و Pitfall لأنها «مش جزء من الشرح»: دي أهم حاجة في الصفحة. وتقرا من غير هدف: قبل ما تفتح الصفحة اكتب سؤالك.`
          },
          lines: [
            "عنوان الخطة: صفحة docs واحدة في ٣ دقايق.",
            "العناوين بس: الصفحة دي فيها إيه؟",
            "الكود: شكله في الحقيقة إيه؟",
            "أول جملة في كل فقرة: الفكرة الأساسية.",
            "الكلمات اللي بتقلب المعنى والأرقام.",
            "Ctrl+F بالكلمة اللي انت محتاجها بالظبط.",
            "كلمة مش عارفها: عدّيها لو الجملة مفهومة، وإلا دوّر عليها.",
            "اكتب سطر: «الصفحة دي بتشرح ... والقاعدة الأهم ...»."
          ],
          sol: R`مثال على صفحة [[useEffect]] في react.dev، سطرين صح بعد ٣ دقايق:
[[This page explains how useEffect synchronizes a component with an external system. The key rule is that you might not need an Effect if you are only transforming data for rendering.]]

الكلمات اللي غالبًا وقفتك: [[synchronize]] = يزامن، و [[external system]] = حاجة برا React (network أو DOM أو timer)، و [[cleanup]] = تنضيف، و [[dependencies]] = اللي الـ effect معتمد عليه.

لو ملخّصك طلع «الصفحة بتشرح useEffect» بس، ده عام جدًا: رجع للخطوة ٣ و ٤ ودوّر على القاعدة. ولو فاتتك صناديق Pitfall، ارجعلها: فيها غالبًا أهم حاجة. (عناوين الصفحة بتتغير مع الوقت، فالمهم الطريقة.)`
        }
      ]
    },
    {
      t: "الـ grammar اللي المبرمج محتاجه بس",
      l: 2,
      n: "مش كتاب grammar: ٦ قواعد بتغطي أغلب اللي هتكتبه في شغلك، ومعاها أشهر غلطات المصريين والصح",
      items: [
        {
          cmd: "present simple",
          title: "ليه الـ docs بتقول returns مش return؟ (present simple والـ s)",
          desc: R`الـ docs والتعليقات ووصف الدوال بتتكتب بالـ present simple: الزمن اللي بيوصف حاجة بتحصل دايمًا. [[This function returns the user]] = «الدالة دي بترجّع اليوزر» (كل مرة، مش مرة واحدة).

القاعدة الوحيدة اللي لازم تحفظها: لو الفاعل مفرد وغايب (he/she/it، أو اسم مفرد زي [[the function]] أو [[the server]] أو [[this hook]])، الفعل بياخد [[s]] أو [[es]]. [[The server sends]]، [[It returns]]، [[This method throws]]. لو الفاعل جمع أو I/you/we/they، من غير s: [[The servers send]]، [[We return]].

النفي: [[doesn't]] + الفعل من غير s: [[It doesn't return anything]] (مش [[doesn't returns]]). والسؤال: [[Does it return a Promise?]].`,
          example: R`The function returns a Promise.
This hook fetches the data on mount.
The server sends a 201 status code.
Each request creates a new session.
The API does not support pagination yet.
Does this method modify the original array?
These functions return strings.
We cache the result for 60 seconds.
Wrong: This function return the user.  Right: This function returns the user.
Wrong: It doesn't returns anything.     Right: It doesn't return anything.`,
          try: R`اكتب تعليق JSDoc (سطر واحد) لـ ٥ دوال في مشروعك بالشكل ده: [[/** Returns ... */]] أو [[/** Fetches ... */]]. اتأكد من الـ s في كل واحد. وبعدين اكتب جملة نفي واحدة لكل دالة: [[It doesn't ...]].`,
          flag: "script",
          deep: {
            why: "الـ s المنسية هي أشهر غلطة في كتابة المصريين، وبتبان من أول سطر. وهي سهلة جدًا تتصلح: قاعدة واحدة. ولما تصلحها، كتابتك بتبان أحسن بكتير من غير ما تتعلم حاجة تانية.",
            how: R`إزاي تضيف الـ s: أغلب الأفعال [[s]] ([[returns]] و [[runs]])، والأفعال اللي آخرها [[s]] أو [[sh]] أو [[ch]] أو [[x]] أو [[o]] بتاخد [[es]] ([[fetches]] و [[pushes]] و [[fixes]] و [[does]] و [[goes]])، واللي آخرها حرف ساكن + [[y]] بتبقى [[ies]] ([[applies]] و [[copies]] و [[retries]])، و [[have]] بتبقى [[has]].

وفي التعليقات وعناوين الـ functions في الـ docs، بيحذفوا الفاعل: [[Returns the user.]] بدل [[This function returns the user.]]. ده عادي ومقبول، والـ s برضه موجودة (لأن الفاعل المحذوف مفرد).

في الـ commit messages بقى القاعدة عكس: من غير s ([[Fix bug]]). ده الدرس الجاي.`,
            when: "تعليقات JSDoc، ووصف الـ PR (This PR adds ...)، والـ README (The app shows ...)، و docs الـ API.",
            mistakes: R`[[The user click the button]] ← [[clicks]]. و [[It don't work]] ← [[It doesn't work]]. و [[He have access]] ← [[has]]. و [[This PR add]] ← [[This PR adds]]. و [[Does it returns]] ← [[Does it return]] (بعد does الفعل من غير s). و [[The data are]] و [[The data is]] الاتنين مقبولين في شغلنا، و [[is]] أشهر.`
          },
          lines: [
            R`the function (مفرد) + returns. «الدالة بترجّع Promise».`,
            R`fetch ← fetches (آخرها ch). «الـ hook بيجيب الداتا أول ما الـ component يظهر». on mount = أول ما يتركّب.`,
            R`the server + sends. «السيرفر بيبعت 201».`,
            R`each + مفرد: creates. «كل طلب بيعمل session جديدة».`,
            R`نفي: does not + support (من غير s). «الـ API مبيدعمش pagination لسه».`,
            R`سؤال: Does + modify (من غير s). «الـ method دي بتغيّر الـ array الأصلي؟».`,
            R`these functions (جمع) + return من غير s.`,
            R`we + cache من غير s. «بنخزّن النتيجة ٦٠ ثانية».`,
            "أشهر غلطة: الـ s ناقصة مع فاعل مفرد.",
            "الغلطة العكسية: s بعد doesn't. بعد does/doesn't الفعل دايمًا من غير s."
          ],
          sol: R`أمثلة صح:
[[/** Returns the total price including tax. */]] ← [[It doesn't round the result.]]
[[/** Fetches the user's orders from the API. */]] ← [[It doesn't cache the response.]]
[[/** Applies the coupon to the cart. */]] ← [[It doesn't validate the coupon code.]]
[[/** Checks whether the email is already registered. */]] ← [[It doesn't send any email.]]
[[/** Retries the request up to 3 times. */]] ← [[It doesn't retry on 4xx errors.]]

راجع: كل فعل في أول التعليق فيه s ([[Returns]] و [[Fetches]] و [[Applies]] و [[Checks]] و [[Retries]])، وكل فعل بعد [[doesn't]] من غير s. لو كتبت [[Retrys]] صلّحها: y بعد حرف ساكن تبقى [[ies]].`
        },
        {
          cmd: "imperative",
          title: "صيغة الأمر (imperative): Add و Fix و Run، من غير please ومن غير to",
          desc: R`الـ imperative = الفعل في أوله من غير فاعل ومن غير s ومن غير to: [[Run the tests]]، [[Add a login page]]، [[Don't commit secrets]]. بتستخدمه في ٣ أماكن: خطوات الـ README ([[Install the dependencies]])، وأسماء الأزرار والقوائم ([[Save]]، [[Delete account]])، والـ commit messages ([[Fix login redirect]]).

في العربي بنحس إن الأمر من غير «من فضلك» قلة ذوق، بس بالإنجليزي في التعليمات ده الطبيعي تمامًا. [[Please install the dependencies]] مش غلط بس غريبة في README. والـ please مكانها الرسايل للناس، مش التعليمات.

النفي: [[Don't]] أو [[Do not]] + الفعل: [[Do not edit this file manually]].`,
          example: R`Install the dependencies.
Copy .env.example to .env and fill in the values.
Run the migrations before you start the server.
Do not edit this file manually.
Click "Save" to apply the changes.
Fix login redirect loop
Add rate limiting to the /login endpoint
Wrong: Adding login page / Added login page / Adds login page
Right: Add login page
Wrong: To install, you should to run npm install.  Right: To install, run npm install.`,
          try: R`خد آخر ١٠ commits في أي repo عندك ([[git log --oneline -10]]). اكتب كل واحد تاني بالـ imperative (من غير ed ومن غير ing ومن غير s). وبعدين اكتب ٥ خطوات تشغيل مشروعك بالـ imperative كأنها README.`,
          flag: "script",
          deep: {
            why: R`git نفسه بيكتب بالـ imperative: لما تعمل [[git revert]] الرسالة بتبقى [[Revert "..."]]، ولما تعمل merge [[Merge branch 'x']]. و GitHub وأغلب المشاريع الكبيرة ماشيين على كده. فلما تكتب زيهم، الـ history بتاعك بيبان متسق ومحترف.`,
            how: R`القاعدة السهلة للـ commit: الرسالة لازم تكمّل الجملة دي صح: [[If applied, this commit will ___]]. «لو اتطبق، الـ commit ده هـ ___». [[If applied, this commit will fix login redirect]] ✓. [[... will fixed login redirect]] ✗.

في الـ README الترتيب بيتقال بـ [[first]] و [[then]] و [[finally]] أو بالترقيم. والشرط قبل الأمر: [[To run the tests, use npm test]] أو [[If you use Windows, run ...]].

و [[you should to]] غلط دايمًا: بعد [[should]] و [[must]] و [[can]] و [[will]] الفعل من غير to: [[you should run]].`,
            when: "كل commit، وكل خطوة في README أو runbook، وكل label على زرار في الـ UI.",
            mistakes: R`[[Added feature]] و [[Fixing bug]] في الـ commits: مش كارثة بس خالف العرف. و [[Please to run]] أو [[you have to must]] ترجمة حرفية. و [[Don't forget to don't commit]] نفي مكرر، الصح [[Remember not to commit]] أو [[Don't commit]].`
          },
          lines: [
            "خطوة README: فعل في الأول من غير فاعل.",
            R`خطوتين في جملة: Copy و fill in. fill in = املى.`,
            R`أمر + before + جملة. «شغّل الـ migrations قبل ما تشغّل السيرفر».`,
            R`نفي: Do not. «متعدّلش الملف ده بإيدك» (ملف بيتولّد أوتوماتيك).`,
            R`تعليمات UI. «دوس Save عشان التغييرات تتطبق».`,
            "commit message: فعل في الأول ومن غير نقطة.",
            "commit message أطول: الفعل + إيه + فين.",
            R`٣ صيغ غلط للـ commit: ing و ed و s.`,
            "الصح: الفعل زي ما هو.",
            R`should to غلط، و To + فعل في الأول معناها «عشان».`
          ],
          sol: R`مثال على تحويل:
[[added navbar]] ← [[Add navbar]]
[[fixing the cart bug]] ← [[Fix cart total when coupon is removed]] (ووضّحت الـ bug)
[[updates]] ← [[Update README with setup steps]]
[[final version]] ← دي مش رسالة؛ اكتب اللي اتغير فعلًا: [[Remove debug logs]]

خطوات README:
[[1. Clone the repository.]]
[[2. Copy .env.example to .env and set DATABASE_URL.]]
[[3. Install the dependencies with npm ci.]]
[[4. Run the migrations with npx prisma migrate dev.]]
[[5. Start the dev server with npm run dev.]]

لو فيه جملة زي [[You need to install ...]] مش غلط، بس الـ imperative أقصر وأوضح.`
        },
        {
          cmd: "passive voice",
          title: "الـ passive في الـ docs: is called و is thrown و was deprecated و must be provided",
          desc: R`الـ passive = الحاجة اللي «حصلها» الفعل هي الفاعل: [[The callback is called]] = «الـ callback بيتنادى» (مش مهم مين اللي ناداه). الـ docs بتحبه جدًا لأن المهم إيه اللي بيحصل للكود، مش مين عمله.

الشكل: [[is/are]] + التصريف التالت (past participle) للحاضر: [[is called]] و [[are ignored]]. و [[was/were]] + التصريف التالت للماضي: [[was deprecated]] و [[were removed]]. ومع must/can/will/should: [[must be provided]] و [[can be used]] و [[will be removed]]. و [[has been]] + التصريف التالت: [[has been deprecated]] = اتعمله deprecate (ولسه ساري).

التصريف التالت لأغلب الأفعال بـ [[ed]]، بس فيه أفعال شاذة لازم تحفظها: [[throw → thrown]] و [[write → written]] و [[send → sent]] و [[set → set]] و [[run → run]] و [[build → built]] و [[get → got/gotten]] و [[find → found]] و [[take → taken]] و [[give → given]] و [[choose → chosen]] و [[hide → hidden]].`,
          example: R`The callback is called once for each element.
An error is thrown if the file does not exist.
Unknown keys are ignored.
This method was deprecated in v4 and removed in v5.
The token must be provided in the Authorization header.
The config file can be written in JSON or YAML.
Your changes have been saved.
The email has already been sent.
Wrong: The error is throw.        Right: The error is thrown.
Wrong: The file was write to disk. Right: The file was written to disk.`,
          try: R`حوّل الجمل دي لـ passive: [[React calls the cleanup function before the next effect.]] و [[npm writes the log to a file.]] و [[We removed the old API in v3.]] و [[You must provide an API key.]]. وبعدين دوّر في أي صفحة docs على ٣ جمل passive وانقلهم.`,
          flag: "script",
          deep: {
            why: R`لو مش واخد بالك من الـ passive، هتقرا [[The callback is called]] وتفتكر إنك انت اللي لازم تناديه. والرسايل اللي بتكتبها لليوزر كمان passive: [[Your changes have been saved]] أطبع من [[We saved your changes]].`,
            how: R`إزاي تعرفه وانت بتقرا: [[be]] (is/are/was/were/been/be) + فعل بـ [[ed]] أو تصريف تالت. لو لقيت [[by]] بعده، ده الفاعل الحقيقي: [[The request is handled by the middleware]] = «الـ middleware هو اللي بيتعامل مع الطلب».

إمتى تستخدمه في كتابتك: رسايل الـ UI ([[Your password has been reset]])، والـ docs ([[The value is cached for 60 seconds]])، ووصف bug لما مش عارف السبب ([[The order is created twice]]). وإمتى لأ: في الـ commits (imperative) وفي الكلام العادي مع الفريق (active أوضح: [[I fixed the bug]]).`,
            when: "وانت بتقرا أي docs، ووانت بتكتب رسايل نجاح أو خطأ لليوزر، ووانت بتوصف bug.",
            mistakes: R`[[is throw]] و [[was send]] و [[has been write]]: التصريف التالت ناقص. و [[The bug was happened]] غلط: [[happen]] مبيجيش passive، الصح [[The bug happened]]. ونفس الكلام [[was occurred]] ← [[occurred]]، و [[is exist]] ← [[exists]]، و [[was failed]] ← [[failed]]. دي من أشهر غلطات المصريين لأن العربي بيقول «حصل» و «اتعمل» بنفس الطريقة.`
          },
          lines: [
            R`is called = بيتنادى. «الـ callback بيتنادى مرة لكل عنصر».`,
            R`is thrown (throw ← thrown شاذ). «بيترمي خطأ لو الملف مش موجود».`,
            R`are ignored = بيتم تجاهلهم. جمع فـ are.`,
            R`was deprecated و removed (ماضي). «اتعمله deprecate في v4 واتشال في v5».`,
            R`must be provided = لازم يتبعت. «الـ token لازم يتبعت في الـ Authorization header».`,
            R`can be written (write ← written). «ملف الإعدادات ممكن يتكتب JSON أو YAML».`,
            R`have been saved = اتحفظت. رسالة UI مشهورة.`,
            R`has already been sent = اتبعت خلاص.`,
            R`throw ← thrown. التصريف التالت الصح.`,
            R`write ← written.`
          ],
          sol: R`الحل:
[[The cleanup function is called by React before the next effect.]] (أو من غير [[by React]]).
[[The log is written to a file (by npm).]]
[[The old API was removed in v3.]]
[[An API key must be provided.]]

أمثلة من docs حقيقية هتلاقيها كتير: [[The callback is invoked with ...]]، [[This option is ignored if ...]]، [[... will be removed in a future version]].

لو كتبت [[The log is wrote]] صلّحها: [[write/wrote/written]]، والـ passive بياخد التالت [[written]].`
        },
        {
          cmd: "a / an / the",
          title: "a و an و the: إمتى تحط إيه (القواعد اللي بتفرق بجد)",
          desc: R`العربي فيه «ال» بس، والإنجليزي فيه [[a/an]] و [[the]] ومن غير خالص، فده من أصعب حاجات المصريين. بس مش محتاج كل القواعد، دي اللي بتغطي ٩٠٪:

١) [[a/an]] = واحد من كتير، أول مرة تذكره: [[I found a bug]] (bug، مش معروف لسه أنهي). [[an]] قبل صوت حرف علّة: [[an error]] و [[an API]] (إيه-بي-آي بتبدأ بصوت علّة) و [[an hour]]، بس [[a user]] و [[a URL]] (يو بتبدأ بصوت ي).
٢) [[the]] = حاجة معروفة للي بيقرا: اتذكرت قبل كده، أو واحدة بس، أو محددة بعدها: [[The bug is in the login page]] و [[the database]] (بتاعتنا) و [[the file you sent]].
٣) من غير حاجة: جمع أو uncountable بمعنى عام: [[Bugs happen]]، [[Data is stored in Postgres]]، [[I like TypeScript]]. وأسماء الأدوات والمنتجات: [[Postgres]] و [[GitHub]] و [[React]] (مش [[the React]]).

وقاعدة مهمة: اسم مفرد countable ميقفش لوحده أبدًا. [[I created branch]] غلط، لازم [[a branch]] أو [[the branch]] أو [[my branch]].`,
          example: R`I found a bug in the checkout page.
The bug happens when the cart is empty.
It returns an error, not an empty array.
Add a URL to the README.
We use Postgres and Redis.
Users can reset their password.
The server returns a 500 when the database is down.
Wrong: I created new branch.     Right: I created a new branch.
Wrong: The React is a library.   Right: React is a library.
Wrong: I need an information.    Right: I need some information.`,
          try: R`حط [[a]] أو [[an]] أو [[the]] أو ولا حاجة (اكتب [[-]]) في كل فراغ: [[I opened ___ issue on GitHub. ___ issue explains ___ problem with ___ login. ___ users can't log in when ___ password has ___ emoji. It's ___ hour-long fix.]]`,
          flag: "script",
          deep: {
            why: "الـ articles الغلط مش بتخلي الكلام مش مفهوم، بس بتخليه يبان مش طبيعي، ولو كترت في رسالة لعميل أو CV بتفرق. والخبر الحلو: ٣ قواعد بتصلح أغلبها.",
            how: R`سؤال واحد بيحل أغلب الحالات: «القارئ يعرف أنهي واحدة بالظبط؟». لو آه: [[the]]. لو لأ ومفرد: [[a/an]]. لو جمع أو حاجة عامة: ولا حاجة.

[[a/an]] على حسب الصوت مش الحرف: [[an SQL query]] لو بتنطقها «إس-كيو-إل»، و [[a SQL query]] لو بتنطقها «سيكوِل». الاتنين موجودين. و [[a unique ID]] (يو) و [[an undefined value]] (أن).

ومع الأرقام والإصدارات: [[Node 22]] من غير the، و [[the latest version]] بـ the، و [[version 5]] من غير.

وقبل أسماء الـ status codes والأخطاء: [[a 404]] و [[a TypeError]] (واحد من النوع ده)، و [[the 404 page]] (الصفحة بتاعتنا).`,
            when: "راجعها في أي حاجة رسمية: CV، وإيميل لعميل، و README، ووصف PR. في Slack مع الفريق محدش هيدقق.",
            mistakes: R`[[the]] قبل كل حاجة لأن العربي فيه «ال» كتير: [[The TypeScript is better]] ← [[TypeScript is better]]. واسم مفرد لوحده: [[I have question]] ← [[I have a question]]. و [[an user]] ← [[a user]]. و [[a information]] ← information مبتاخدش a (الدرس الجاي).`
          },
          lines: [
            R`a bug (أول مرة، مش معروف) و the checkout page (معروفة، واحدة بس في الموقع).`,
            R`The bug (اتذكر خلاص) و the cart (سلة اليوزر الحالي).`,
            R`an error (صوت علّة) و an empty array.`,
            R`a URL: بتتنطق «يو-آر-إل» فبتبدأ بصوت ي، فـ a. و the README (بتاع المشروع ده).`,
            R`أسماء أدوات من غير the.`,
            R`Users (جمع بمعنى عام) من غير the.`,
            R`a 500 (واحد من النوع ده) و the database (بتاعتنا).`,
            R`branch مفرد لازم قبله حاجة.`,
            R`اسم المكتبة من غير the.`,
            R`information uncountable: some مش an.`
          ],
          sol: R`الحل:
[[I opened an issue on GitHub. The issue explains a problem with the login. - Users can't log in when the password has an emoji. It's an hour-long fix.]]

الشرح: [[an issue]] (أول مرة + صوت علّة)، [[The issue]] (اتذكر)، [[a problem]] (أول مرة)، [[the login]] (صفحة الدخول بتاعتنا)، [[Users]] من غير (جمع عام)، [[the password]] (باسورد اليوزر ده)، [[an emoji]] (إيموجي: صوت علّة)، [[an hour-long]] (الـ h في hour مبتتنطقش).

لو كتبت [[a hour]] ده أشهر غلط هنا: القاعدة الصوت مش الحرف. و [[The users can't log in]] مقبولة لو تقصد يوزرز معينين اتكلمنا عنهم.`
        },
        {
          cmd: "informations و a feedback",
          title: "informations و a feedback و advices: الكلمات اللي مبتتجمعش (uncountable)",
          desc: R`فيه كلمات في الإنجليزي مبتتعدّش: مبتاخدش [[s]] ومبتاخدش [[a/an]]. وللأسف أغلبها كلمات بنستخدمها كل يوم في الشغل، وفي العربي بتتجمع عادي («معلومات» و «نصايح»)، فبنغلط فيها.

أشهرهم في شغلنا: [[information]] و [[feedback]] و [[advice]] و [[code]] (بمعنى source code) و [[software]] و [[hardware]] و [[data]] (غالبًا) و [[documentation]] و [[research]] و [[knowledge]] و [[progress]] و [[work]] (بمعنى شغل) و [[equipment]] و [[traffic]] و [[stuff]] و [[experience]] (بمعنى خبرة عامة) و [[homework]] و [[news]].

عشان تعدّهم: [[a piece of]] أو [[some]] أو كلمة تانية countable: [[some feedback]]، [[a piece of advice]]، [[a few tips]]، [[two pull requests]]، [[a code review]]، [[a line of code]]، [[a job]] بدل [[a work]].`,
          example: R`Thanks for the feedback!
Can you give me some advice on this PR?
I need more information about the bug.
The documentation is outdated.
We made good progress this week.
This code is hard to read.
I have 3 years of experience with React.
Wrong: Thanks for your feedbacks.     Right: Thanks for your feedback.
Wrong: I need an information.         Right: I need some information / a piece of information.
Wrong: I wrote a new code.            Right: I wrote some new code / a new function.`,
          try: R`صلّح الرسالة دي: [[Hi, thanks for the feedbacks. I did some researches and I have few informations. The softwares we use need new equipments. I will send the codes and the documentations tomorrow, any advices are welcome.]]`,
          flag: "script",
          deep: {
            why: R`[[feedbacks]] و [[informations]] و [[advices]] بتبان على طول لأي حد إنجليزيته كويسة، وبتتكرر في رسايل الشغل والـ CV والانترفيو. تصليح ٥ كلمات بس بيفرق جدًا.`,
            how: R`الفعل معاهم مفرد: [[The information is]] و [[The feedback was]] و [[The code is]]. و [[data]] في شغلنا بتتعامل غالبًا مفرد ([[the data is]])، و [[the data are]] موجودة في الكتابة العلمية.

[[experience]]: [[3 years of experience]] (خبرة، uncountable)، بس [[a great experience]] (تجربة، countable). و [[work]]: [[I have a lot of work]] (شغل)، بس [[works]] ممكن بمعنى «أعمال فنية». في CV اكتب [[work experience]].

[[few]] و [[a few]] مع countable، و [[little]] و [[a little]] مع uncountable: [[a few bugs]] و [[a little information]]. و [[few]] من غير a معناها «قليل جدًا» (سلبي)، و [[a few]] «شوية» (عادي).

وكلمات تبان uncountable بس هي countable: [[a bug]] و [[a feature]] و [[a task]] و [[a tip]] و [[a suggestion]] و [[a question]] و [[a job]].`,
            when: "أي رسالة شكر على review، أي طلب معلومات، أي CV (experience و work).",
            mistakes: R`[[feedbacks]] و [[informations]] و [[advices]] و [[softwares]] و [[equipments]] و [[researches]] و [[knowledges]] و [[codes]] بمعنى source code. و [[a work]] بمعنى وظيفة ← [[a job]]. و [[I have few informations]] ← [[I have a little information]] أو [[I have some details]].`
          },
          lines: [
            R`feedback من غير s. «شكرًا على رأيك».`,
            R`some advice مش advices.`,
            R`more information، مش informations.`,
            R`documentation + is (مفرد). outdated = قديم.`,
            R`progress من غير a.`,
            R`code + is. «الكود ده صعب يتقري».`,
            R`experience في الخبرة uncountable: 3 years of experience.`,
            R`الغلط الأشهر: feedbacks.`,
            R`an information غلط.`,
            R`a new code غلط. استخدم some code أو كلمة countable.`
          ],
          sol: R`النسخة الصح:
[[Hi, thanks for the feedback. I did some research and I have a little information. The software we use needs new equipment. I will send the code and the documentation tomorrow; any advice is welcome.]]

التصليحات: [[feedbacks → feedback]]، [[researches → research]]، [[few informations → a little information]] (أو [[some details]])، [[softwares → software]] و [[need → needs]] (بقى مفرد)، [[equipments → equipment]]، [[codes → code]]، [[documentations → documentation]]، [[advices are → advice is]].

لو فاتتك [[needs]]: لما [[software]] بقت مفرد، الفعل لازم ياخد s (درس present simple).`
        },
        {
          cmd: "غلطات المصريين",
          title: "أشهر ١٥ غلطة عند المصريين في رسايل الشغل (والصح)",
          desc: R`دي الغلطات اللي بتتكرر في رسايل Slack والإيميلات والـ PRs من ناس كتير في مصر والعالم العربي. معظمها ترجمة حرفية من العربي. اتعلمها كـ «أزواج»: الغلط ← الصح، وحطها في [[mistakes.md]].

السبب الأساسي: العربي بيقول «ناقش في» فبنقول [[discuss about]]، و «اشرحلي» فبنقول [[explain me]]، و «من يومين» فبنقول [[since 2 days]]. الحل مش إنك تحفظ grammar، الحل إنك تحفظ الجملة الصح كاملة وتستخدمها.`,
          example: R`Wrong: Let's discuss about the API.       Right: Let's discuss the API.
Wrong: Can you explain me this?           Right: Can you explain this to me?
Wrong: I'm working on it since 2 days.    Right: I've been working on it for 2 days.
Wrong: I didn't understood.               Right: I didn't understand.
Wrong: I am agree.                        Right: I agree.
Wrong: It depends of the config.          Right: It depends on the config.
Wrong: Please revert back to me.          Right: Please get back to me.
Wrong: I have a doubt about this.         Right: I have a question about this.
Wrong: Waiting your reply.                Right: Looking forward to your reply.
Wrong: Kindly do the needful.             Right: Could you please update the config?
Wrong: I will make a search.              Right: I will look into it.
Wrong: Me and Ahmed fixed it.             Right: Ahmed and I fixed it.
Wrong: The meeting is postponed to 3pm.   Right: The meeting has been moved to 3pm.
Wrong: Open the PR and check it.          Right: Please take a look at the PR.
Wrong: Sorry for late.                    Right: Sorry for the delay. / Sorry I'm late.`,
          try: R`دوّر في رسايلك القديمة (Slack أو WhatsApp أو LinkedIn بالإنجليزي) على أي غلطة من الـ ١٥. انسخ ٥ جمل كتبتها فيها غلطة، وصلّحها، وحطها في [[mistakes.md]] بالشكل ده: [[Wrong: ... → Right: ...]]. لو ملقتش، اكتب رسالة لـ tech lead بتطلب مساعدة في bug، واستخدم ٥ من الجمل الصح.`,
          flag: "script",
          deep: {
            why: "الغلطات دي بتبان من أول سطر، ومش بتخلي كلامك مش مفهوم، بس بتخليه يبان «غير محترف» في رسالة لعميل أو انترفيو. وهي محدودة: لو صلحت الـ ١٥ دول هتفرق جدًا.",
            how: R`ليه كل واحدة غلط:
[[discuss]] فعل متعدي، مياخدش [[about]] (بس [[a discussion about]] صح).
[[explain]] مياخدش الشخص على طول: [[explain X to me]].
[[since]] مع نقطة زمنية ([[since Monday]])، و [[for]] مع مدة ([[for 2 days]])، والزمن [[have been + ing]].
بعد [[didn't]] الفعل في الأول: [[understand]].
[[agree]] فعل، مش صفة: [[I agree]].
[[depend on]] دايمًا.
[[revert]] في شغلنا يعني «ترجّع كود»، فـ [[revert back to me]] بتلخبط. قول [[get back to me]] أو [[reply]].
[[doubt]] بالإنجليزي «شك» (مش مصدق)، مش «سؤال».
[[Waiting your reply]] ناقصة [[for]]، والأطبع [[Looking forward to hearing from you]].
[[do the needful]] مفهومة في جنوب آسيا بس غريبة لأغلب الناس: قول بالظبط عايز إيه.
[[make a search]] ترجمة حرفية؛ [[look into it]] = «هشوفها وأدوّر».
[[Me and Ahmed]] في أول الجملة ← [[Ahmed and I]].
[[postponed to 3pm]] ممكن تتفهم إن الميعاد اتأجل ليوم تاني؛ [[moved to]] أوضح.
[[Sorry for late]] ناقصة: [[Sorry for the delay]] أو [[Sorry I'm late]].`,
            when: "راجع الليستة دي قبل أي إيميل أو رسالة مهمة، لحد ما تبقى طبيعية.",
            mistakes: R`تحاول تتعلمهم كلهم مرة واحدة. خد ٣ في الأسبوع، واستخدمهم عمدًا في رسايلك لحد ما يتثبتوا. وبرضه متخافش لدرجة إنك متكتبش: رسالة فيها غلطة أحسن من رسالة مااتبعتتش.`
          },
          lines: [
            R`discuss من غير about.`,
            R`explain X to me.`,
            R`مدة = for، والزمن have been + ing.`,
            R`بعد didn't الفعل في الأول.`,
            R`agree فعل: I agree.`,
            R`depend on دايمًا.`,
            R`revert = ترجّع كود؛ استخدم get back to me.`,
            R`doubt = شك، مش سؤال.`,
            R`Looking forward to (وبعدها اسم أو ing).`,
            R`قول الطلب بالظبط بدل do the needful.`,
            R`look into it = هشوف الموضوع.`,
            R`Ahmed and I في مكان الفاعل.`,
            R`moved to أوضح من postponed to في الساعات.`,
            R`take a look at = بص على. أذوق من «افتح واتأكد».`,
            R`Sorry for the delay (تأخير في رد/شغل) أو Sorry I'm late (ميعاد).`
          ],
          sol: R`مثال لرسالة طلب مساعدة بـ ٥ جمل صح:
[[Hi Mona, could you take a look at a bug when you have a moment? I've been working on it for 2 days. The checkout total depends on the coupon, but it doesn't update after I remove it. Can you explain the cart state logic to me? I'll look into the tests in the meantime. Looking forward to your reply, and sorry for the delay on the ticket.]]

الجمل المستخدمة: [[take a look at]]، و [[I've been working on it for 2 days]]، و [[depends on]]، و [[explain ... to me]]، و [[I'll look into]]، و [[Looking forward to]]، و [[sorry for the delay]].

راجع رسالتك: مفيش [[discuss about]]، ومفيش [[since]] مع مدة، ومفيش [[revert back]]. و [[in the meantime]] = في الوقت ده.`
        }
      ]
    },
    {
      t: "commit messages",
      l: 2,
      n: "سطر عنوان قصير بالـ imperative، وجسم بيقول ليه، و Conventional Commits، و ٢٤ مثال قبل وبعد",
      items: [
        {
          cmd: "commit message كويس",
          title: "شكل الـ commit message الكويس: عنوان قصير وسطر فاضي وجسم بيقول ليه",
          desc: R`الـ commit message ليها شكل ثابت متفق عليه من أيام git الأولى: سطر عنوان قصير (حوالي ٥٠ حرف، وأقصى حد مقبول تقريبًا ٧٢)، وبعده سطر فاضي، وبعده جسم (اختياري) بيشرح [[why]] (ليه) مش [[what]] (إيه)، لأن «إيه» باين في الـ diff.

الـ git tutorial الرسمي بيقول بالنص: [[it's a good idea to begin the commit message with a single short (no more than 50 characters) line summarizing the change, followed by a blank line and then a more thorough description]]. والسطر الأول ده هو الـ title اللي بيظهر في [[git log --oneline]] وفي GitHub وفي أي أداة.

قواعد العنوان: فعل imperative في الأول ([[Fix]] و [[Add]] و [[Remove]] و [[Update]] و [[Rename]] و [[Refactor]])، من غير نقطة في الآخر، ومحدد (فين وإيه). والجسم: جمل عادية بالـ present أو past، سطور حوالي ٧٢ حرف.`,
          example: R`Fix cart total when a coupon is removed

The total was computed once when the coupon was applied and never
recalculated, so removing the coupon kept the discount. Recalculate
the total in the cart reducer instead of in the coupon handler.

Closes #42`,
          try: R`خد تغيير عملته قريب (أو اعمل تغيير صغير) واكتب commit بالشكل ده: [[git commit]] من غير [[-m]] عشان يفتحلك المحرر، واكتب عنوان أقل من ٥٠ حرف، وسطر فاضي، وجملتين «ليه». بعدها [[git log -1]] وشوف الشكل. ولو غلطت في الرسالة: [[git commit --amend]] (قبل الـ push بس).`,
          flag: "script",
          deep: {
            why: "بعد ٦ شهور، الـ commit message هي الحاجة الوحيدة اللي هتقولك (أو لزميلك) ليه الكود ده كده. [[git log]] و [[git blame]] بيوصلوك للـ commit، ولو الرسالة «fix» مش هتفيدك بحاجة. وفي الانترفيو وفي GitHub profile، الـ history بيبان.",
            how: R`الجسم بيجاوب ٣ أسئلة: المشكلة كانت إيه؟ ليه حصلت؟ الحل ده ليه؟ مثال: [[The total was computed once ... and never recalculated]] (السبب)، [[so removing the coupon kept the discount]] (الأثر)، [[Recalculate the total in ...]] (الحل بالـ imperative).

كلمات مفيدة للجسم: [[Previously, ...]] = قبل كده، و [[Now, ...]] = دلوقتي، و [[so that ...]] = عشان، و [[instead of]] = بدل، و [[This caused ...]] = ده سبب، و [[This avoids ...]] = ده بيتجنب، و [[Note that ...]] = خد بالك إن.

والـ footer في الآخر: [[Closes #42]] يربط الـ issue ويقفلها لما يتدمج (درس [[Closes #12]] في «تاب Git»)، و [[Co-authored-by:]] لو حد شاركك.

ومحتاج جسم إمتى؟ لما التغيير مش واضح من العنوان: bug fix، أو قرار تصميم، أو حاجة غريبة. تغيير تافه ([[Fix typo in README]]) عنوان كفاية.`,
            when: "كل commit. ولو الفريق بيعمل squash merge، عنوان الـ PR بيبقى هو الـ commit، فنفس القواعد على عنوان الـ PR.",
            mistakes: R`[[fix]] و [[update]] و [[wip]] و [[changes]] و [[asdf]] و [[final]] و [[final2]]: مفيش معلومة. وعنوان طويل جدًا فيه كل حاجة. وتشرح «إيه» في الجسم (غيّرت السطر ده) بدل «ليه». و [[Fixed a bug where the user was not able to see the cart when he was logged in]] طويل وبالماضي؛ الأحسن [[Show cart for logged-in users]].`
          },
          lines: [
            R`العنوان: imperative، أقل من ٥٠ حرف، من غير نقطة. «صلّح إجمالي السلة لما الكوبون يتشال».`,
            R`السبب: «الإجمالي كان بيتحسب مرة واحدة لما الكوبون يتطبّق ومكانش بيتحسب تاني،»`,
            R`الأثر: «فشيل الكوبون كان بيسيب الخصم». وبعدين الحل بالـ imperative: «احسب الإجمالي...»`,
            R`«... في الـ reducer بتاع السلة بدل الـ handler بتاع الكوبون».`,
            R`footer: يربط الـ issue رقم ٤٢ ويقفلها لما يتدمج في الـ default branch.`
          ],
          sol: R`شكل صح في [[git log -1]]:
[[Validate email format on the signup form]]
(سطر فاضي)
[[Invalid emails reached the API and returned a 500 from the database.]]
[[Check the format on the client so the user sees the error immediately.]]

راجع: العنوان [[Validate email format on the signup form]] = ٤٠ حرف، فعل imperative، من غير نقطة. والجسم بيقول ليه (كانت بتوصل للـ API وتعمل 500) مش إيه (ضفت regex).

لو [[git log -1]] ورّاك العنوان والجسم لازقين من غير سطر فاضي، git هيعتبرهم عنوان واحد طويل. صلّح بـ [[git commit --amend]] (لو لسه معملتش push).`
        },
        {
          cmd: "Conventional Commits",
          title: "Conventional Commits: feat و fix و chore و الـ scope و ! للـ breaking change",
          desc: R`Conventional Commits مواصفة (الإصدار 1.0.0) بتضيف «نوع» في أول الرسالة، عشان الأدوات تفهم الـ history: تعمل changelog لوحدها، وتحدد الإصدار الجاي (semver). الشكل من المواصفة:

[[<type>[optional scope]: <description>]] وبعدين سطر فاضي وجسم اختياري وسطر فاضي و footers اختيارية.

المواصفة بتعرّف نوعين بس: [[feat]] (ميزة جديدة، يقابلها MINOR) و [[fix]] (تصليح bug، يقابلها PATCH). وبتقول إن أنواع تانية مسموحة زي [[build]] و [[chore]] و [[ci]] و [[docs]] و [[style]] و [[refactor]] و [[perf]] و [[test]]. والـ breaking change (MAJOR) بيتعلّم بـ [[!]] قبل الـ [[:]] مباشرة، أو بـ footer اسمه [[BREAKING CHANGE:]] بحروف كبيرة.

والـ config المشهور [[@commitlint/config-conventional]] بيسمح بالأنواع دي بالظبط: [[build]] و [[chore]] و [[ci]] و [[docs]] و [[feat]] و [[fix]] و [[perf]] و [[refactor]] و [[revert]] و [[style]] و [[test]]، وبيطلب النوع بحروف صغيرة، والعنوان مش أكتر من ١٠٠ حرف، والوصف ميبدأش بحرف كبير ومينتهيش بنقطة.`,
          example: R`feat: add password reset by email
fix(auth): handle expired refresh token
docs: explain how to run migrations locally
refactor(cart): extract price calculation into a pure function
perf: cache product list for 60 seconds
test: add e2e test for checkout
ci: run tests on Node 22 and 24
chore: bump eslint to v9
feat!: drop support for Node 18
fix(api): return 409 when email is already registered
BREAKING CHANGE: the /users endpoint now requires authentication.`,
          try: R`في فولدر تجربة: [[npm i -D @commitlint/cli @commitlint/config-conventional]]، واعمل [[commitlint.config.mjs]] فيه [[export default { extends: ["@commitlint/config-conventional"] };]]. وبعدين جرّب: [[echo "Added login page" | npx commitlint]] و [[echo "feat: Added login page." | npx commitlint]] و [[echo "Feat: add x" | npx commitlint]] و [[echo "feat: add login page" | npx commitlint]]. اقرا كل رسالة خطأ وصلّح الـ commit لحد ما يعدّي.`,
          flag: "script",
          deep: {
            why: "مشاريع ومكتبات كتير بتطلبها (وبتفحصها في CI أو hook)، وأدوات زي release-please و semantic-release بتعتمد عليها. وحتى لو مش مطلوبة، النوع في الأول بيخلي الـ history سهل تقراه.",
            how: R`اختيار النوع: اليوزر هيحس بحاجة جديدة؟ [[feat]]. bug اتصلح؟ [[fix]]. الكود اتغير من غير ما السلوك يتغير؟ [[refactor]]. أسرع؟ [[perf]]. اختبارات بس؟ [[test]]. docs بس؟ [[docs]]. تنسيق (مسافات، فواصل)؟ [[style]] (مش CSS!). CI؟ [[ci]]. أدوات البناء أو الـ dependencies؟ [[build]] أو [[chore]]. غير كده؟ [[chore]].

الـ scope اختياري بين قوسين: اسم الجزء اللي اتغير ([[auth]] و [[cart]] و [[api]]). الفريق بيتفق على الأسماء.

الوصف بعد [[: ]] بحرف صغير (في config-conventional) وبالـ imperative ومن غير نقطة: [[feat: add ...]] مش [[feat: Added ...]].

إعداد الـ hook نفسه (husky و commitlint) في درس [[commitlint]] في «تاب فحص الكود».`,
            when: "لو المشروع بيستخدمها (بص على الـ history أو CONTRIBUTING.md)، أو في مشاريعك انت عشان الـ changelog.",
            mistakes: R`[[style]] بمعنى CSS: لأ، style = تنسيق الكود من غير تغيير معناه. تغيير CSS بيغيّر شكل الموقع = [[feat]] أو [[fix]]. و [[Feat:]] بحرف كبير. و [[feat: Added ...]] بالماضي. و [[fix: fix bug]]: مكرر ومفيهوش معلومة، [[fix(cart): keep discount after page reload]]. و [[BREAKING CHANGES:]] بالجمع أو بحروف صغيرة: المواصفة بتقول [[BREAKING CHANGE]] (و [[BREAKING-CHANGE]] مرادفها).`
          },
          lines: [
            R`feat = ميزة. «ضيف reset للباسورد بالإيميل».`,
            R`fix + scope (auth). «اتعامل مع refresh token خلصت مدته».`,
            R`docs. «اشرح إزاي تشغّل الـ migrations على جهازك».`,
            R`refactor. «طلّع حساب السعر في دالة pure». extract = تطلّع/تفصل.`,
            R`perf. «خزّن ليستة المنتجات ٦٠ ثانية».`,
            R`test. «ضيف اختبار e2e للـ checkout».`,
            R`ci. «شغّل الاختبارات على Node 22 و 24».`,
            R`chore. «رقّي eslint لـ v9». bump = ترفع رقم الإصدار.`,
            R`! = breaking change. «وقف دعم Node 18». drop = تبطّل.`,
            R`fix + scope api. «رجّع 409 لما الإيميل متسجل قبل كده».`,
            R`footer: BREAKING CHANGE بحروف كبيرة. «الـ /users دلوقتي محتاج تسجيل دخول».`
          ],
          sol: R`اللي هيطلعلك (commitlint 21، سبتمبر ٢٠٢٦):
[[Added login page]] ← [[✖ subject may not be empty [subject-empty]]] و [[✖ type may not be empty [type-empty]]]. «الوصف والنوع مينفعش يبقوا فاضيين». يعني مفيش [[type:]] في الأول.
[[feat: Added login page.]] ← [[✖ subject must not be sentence-case [subject-case]]] و [[✖ subject may not end with full stop [subject-full-stop]]]. «الوصف مينفعش يبدأ بحرف كبير» و «مينفعش ينتهي بنقطة».
[[Feat: add x]] ← [[✖ type must be lower-case [type-case]]] و [[✖ type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]]].
[[feat: add login page]] ← مفيش أي خطأ.

لاحظ إن رسايل commitlint نفسها بتستخدم [[must]] و [[may not]] و [[must not]]: درس «optional و defaults to». و [[full stop]] = نقطة (بريطاني)، و [[sentence-case]] = أول حرف كبير زي الجملة.`
        },
        {
          cmd: "٢٤ commit قبل وبعد",
          title: "٢٤ commit message حقيقي: الغلط والصح",
          desc: R`أحسن طريقة تتعلم بيها: تشوف commits وحشة وتشوف نسختها الكويسة، لحد ما عينك تتعود. دي أشهر أنماط الغلط عند المبتدئين (مش بس المصريين)، وجنب كل واحد النسخة الصح بشكل Conventional Commits.

الأنماط: رسالة فاضية من المعنى ([[fix]] و [[update]] و [[wip]])، وماضي بدل imperative ([[Added]] و [[Fixed]])، ورسالة طويلة جدًا في السطر الأول، ورسالة بتقول «إيه» مش «فين»، وعربي مكتوب بحروف إنجليزي، وكذا تغيير في commit واحد (قسّمه).`,
          example: R`Before: fix                              After: fix(cart): keep discount after page reload
Before: update                           After: docs: add setup steps to README
Before: wip                              After: feat(profile): add avatar upload (UI only)
Before: Added login page                 After: feat(auth): add login page
Before: Fixed the bug                    After: fix(api): return 404 for unknown product IDs
Before: changes                          After: refactor: rename getData to fetchOrders
Before: final version                    After: chore: remove debug logs
Before: final2                           After: fix: correct typo in checkout button
Before: fixed bug in login when user enters wrong password he gets 500 error instead of 401
After:  fix(auth): return 401 instead of 500 on wrong password
Before: sala7t el moshkla                After: fix(search): handle empty query
Before: Updated package.json             After: build: add zod dependency
Before: css                              After: fix(navbar): stop overlap on small screens
Before: tests                            After: test(cart): cover coupon removal
Before: fix eslint                       After: style: apply eslint autofix
Before: new feature                      After: feat(orders): export orders as CSV
Before: Merge fixes and new UI and API   After: split into three commits: fix(api) / feat(ui) / refactor(api)
Before: README                           After: docs: document environment variables
Before: speed                            After: perf(products): add index on category_id
Before: remove stuff                     After: chore: remove unused lodash dependency
Before: fix CI                           After: ci: use npm ci instead of npm install
Before: Update index.js                  After: fix(server): read PORT from environment
Before: added dark mode.                 After: feat(theme): add dark mode toggle
Before: hotfix!!!                        After: fix(payments): verify webhook signature
Before: security                         After: fix(auth): hash passwords with bcrypt instead of md5`,
          try: R`شغّل [[git log --oneline -30]] في أكبر مشروع عندك. اختار أوحش ١٠ رسايل واكتبلهم نسخة «After» بنفس الطريقة (افتح الـ commit بـ [[git show <hash>]] عشان تعرف اتغير إيه فعلًا). متعدّلش الـ history القديم على الـ main، ده تمرين كتابة بس.`,
          flag: "script",
          deep: {
            why: R`الـ history بتاعك على GitHub بيتقري: من الـ recruiters، ومن زمايلك، ومنك انت بعد سنة. و [[git log --oneline]] فيه رسايل واضحة = تقدر تلاقي أي تغيير في ثواني.`,
            how: R`الوصفة: [[type(scope): verb + what + (where/when)]].

أفعال بتنفع في الوصف: [[add]] و [[remove]] و [[fix]] مش كفاية لوحدها بس مع التفاصيل تنفع، و [[handle]] (تتعامل مع حالة)، و [[prevent]] (تمنع)، و [[allow]] (تسمح)، و [[show]] و [[hide]]، و [[rename]]، و [[move]]، و [[extract]]، و [[replace X with Y]]، و [[use X instead of Y]]، و [[return]]، و [[validate]]، و [[support]]، و [[cover]] (في الاختبارات)، و [[bump]] (إصدار)، و [[drop]] (وقف دعم)، و [[document]] (تكتب docs).

والـ bug fix الأحسن يوصف السلوك الصح الجديد مش الـ bug: [[return 401 instead of 500 on wrong password]] أحسن من [[fix 500 error]].

ولو محتاج «و» في العنوان ([[fix X and add Y]]) غالبًا دول commitين.`,
            when: "كل commit، وخصوصًا قبل ما تعمل push لـ branch هيتعمله review.",
            mistakes: R`تكتب commits كويسة في مشاريعك الشخصية بس وتكسل في الشغل (أو العكس). وتعدّل history الـ main بـ rebase عشان تجمّل الرسايل: متعملش كده على branch مشترك. وتكتب بالعربي بحروف إنجليزي ([[sala7t el moshkla]]): محدش هيعرف يدوّر بيها، وأي حد مش مصري مش هيفهمها.`
          },
          lines: [
            "fix لوحدها ← فين وإيه.",
            "update ← النوع docs وإيه اللي اتضاف.",
            "wip = شغل مش خلصان ← قول اللي خلص فعلًا.",
            R`Added (ماضي) ← add (imperative) + scope.`,
            "Fixed the bug ← أنهي bug؟ السلوك الصح.",
            "changes ← الـ refactor بالظبط.",
            "final version ← اللي اتعمل فعلًا.",
            "final2 ← وصف التغيير.",
            "عنوان طويل جدًا بالماضي ومن غير فواصل...",
            "... ← نسخة قصيرة بتوصف السلوك الصح (٥٥ حرف تقريبًا).",
            "عربي بحروف إنجليزي ← إنجليزي واضح.",
            R`اسم ملف ← build + إيه اتضاف.`,
            R`css ← fix + الـ component + المشكلة. (مش style!)`,
            "tests ← test + بيغطي إيه. cover = يغطي.",
            R`fix eslint ← style (تنسيق من غير تغيير معنى). autofix = تصليح أوتوماتيك.`,
            "new feature ← أنهي feature.",
            "٣ حاجات في commit ← قسّمهم ٣ commits.",
            "README ← docs + اتوثّق إيه.",
            "speed ← perf + التغيير.",
            "stuff ← اسم الحاجة. unused = مش مستخدمة.",
            "fix CI ← ci + التغيير.",
            "Update index.js (رسالة GitHub الافتراضية) ← وصف حقيقي.",
            "ماضي ونقطة ← imperative من غير نقطة.",
            R`hotfix!!! ← الـ ! في Conventional Commits يعني breaking، مش «مستعجل». قول المشكلة.`,
            R`security ← إيه بالظبط. instead of = بدل.`
          ],
          sol: R`أمثلة لتحويل رسايل حقيقية بتتكرر:
[[Update App.jsx]] ← تفتح [[git show]] وتلاقي إنه ضاف loading spinner ← [[feat(ui): show spinner while products load]].
[[fix bug]] ← كان بيصلّح إن الفورم بيتبعت مرتين ← [[fix(checkout): prevent double submit]].
[[.]] أو [[..]] ← كان بيغيّر الـ port ← [[fix(server): read PORT from environment]].
[[responsive]] ← [[fix(layout): stack cards on screens under 640px]].
[[first commit]] على مشروع جديد: دي مقبولة فعلًا ([[chore: initial commit]] أو [[Initial commit]]).

لو لقيت نفسك مش عارف تكتب After لأنك مش فاكر الـ commit عمل إيه: ده بالظبط سبب إن الرسالة الأصلية كانت وحشة. ودي أحسن حجة تقنع بيها نفسك.`
        }
      ]
    },
    {
      t: "PRs و code review",
      l: 2,
      n: "عنوان ووصف PR بـ template، وتعليقات review مؤدبة وواضحة (سؤال ولا اقتراح ولا blocker)، وإزاي ترد على review",
      items: [
        {
          cmd: "وصف PR",
          title: "عنوان PR ووصفه: template فيه What و Why و How to test",
          desc: R`الـ PR هو «طلب» إن كودك يتدمج، والوصف هو اللي بيقنع المراجع ويوفر وقته. المراجع محتاج يعرف في دقيقة: إيه اتغير؟ ليه؟ يجرّبه إزاي؟ فيه حاجة خطيرة؟

العنوان: نفس قواعد الـ commit (imperative، محدد، وممكن Conventional Commits). لو الفريق بيعمل squash merge، العنوان ده هو اللي هيفضل في الـ history.

الوصف بقالب بسيط: [[## What]] إيه اتغير (نقط)، و [[## Why]] ليه (والـ issue)، و [[## How to test]] خطوات المراجع يجرّب، و [[## Screenshots]] لو فيه UI، و [[## Notes]] أي حاجة المراجع لازم يعرفها (حاجة مش متأكد منها، أو حاجة سبتها عن قصد لـ PR تاني). وجملة [[This PR ...]] بالـ present simple (مع الـ s).`,
          example: R`feat(orders): export orders as CSV
## What
- Add an "Export CSV" button to the orders page
- Add GET /api/orders/export, which streams a CSV file
## Why
Admins copy orders into Excel by hand every week (#118).
## How to test
1. Log in as admin@example.com
2. Open /admin/orders and click "Export CSV"
3. Open the file: it should have one row per order
## Notes
- Large exports are streamed, so memory stays flat.
- Filters are not applied yet; I'll add them in a follow-up PR.`,
          try: R`خد آخر PR عملته (أو branch عندك) واكتبله وصف بالقالب ده. وبعدين اعمل ملف [[.github/pull_request_template.md]] في repo بتاعك فيه العناوين دي بس، عشان GitHub يحطها لوحده في أي PR جديد.`,
          flag: "script",
          deep: {
            why: "المراجع مشغول، و PR من غير وصف بيستنى أيام أو بياخد review سطحي. الوصف الكويس = review أسرع وأدق، وبيبيّن إنك فاهم تغييرك. وفي الـ open source، PR من غير وصف ممكن يتقفل من غير ما حد يبص عليه.",
            how: R`جمل جاهزة:
[[This PR adds / fixes / removes / refactors ...]]
[[Closes #118]] أو [[Part of #118]] (لو مش بيخلّصها كلها).
[[No UI changes.]] أو [[No behavior change; this is a pure refactor.]]
[[I'm not sure about ...; happy to change it.]] = مش متأكد من كذا، ومعنديش مشكلة أغيّره.
[[Out of scope: ...]] = مش جزء من الـ PR ده.
[[Follow-up: ...]] = هيتعمل في PR جاي.
[[Breaking change: ...]] = حاجة هتكسر حد.
[[Reviewers: please focus on ...]] = ركزوا على كذا.

و [[Draft PR]] لما لسه مش جاهز بس عايز رأي بدري (شوف [[draft PR و التقسيم]] في «تاب هندسة البرمجيات»). و [[gh pr create]] بيفتح المحرر بالـ template (درس [[gh pr]] في «تاب Git»).`,
            when: "كل PR، حتى في مشاريعك الشخصية (بيبان في GitHub profile وبيتعلمك العادة).",
            mistakes: R`وصف فاضي أو «as discussed». و [[Please review my code]] من غير أي معلومة. وقايمة بكل ملف اتغير (ده باين في الـ diff). و PR فيه ٣٠ ملف و ٣ مواضيع مختلفة: قسّمه. و [[This PR add]] من غير s.`
          },
          lines: [
            "العنوان: Conventional Commits، imperative، محدد.",
            R`«ضيف زرار Export CSV في صفحة الأوردرات».`,
            R`«ضيف endpoint بيعمل stream لملف CSV». which = اللي.`,
            R`السبب ورقم الـ issue: «الأدمنز بينسخوا الأوردرات لـ Excel بإيدهم كل أسبوع». by hand = يدوي.`,
            R`خطوة ١: «سجّل دخول بالأدمن».`,
            R`خطوة ٢: «افتح الصفحة ودوس Export CSV».`,
            R`خطوة ٣ ومعاها النتيجة المتوقعة: «المفروض يبقى فيه صف لكل أوردر». should = المتوقع.`,
            R`«الـ exports الكبيرة بتتعمل stream، فالذاكرة بتفضل ثابتة». flat = مش بتزيد.`,
            R`«الفلاتر لسه مش مطبّقة، هضيفها في PR بعده». follow-up = متابعة.`
          ],
          sol: R`مثال على PR صغير:
[[fix(auth): return 401 instead of 500 on wrong password]]
[[## What]]
[[- Catch InvalidPasswordError in the login route and return 401]]
[[- Add a test for the wrong-password case]]
[[## Why]]
[[Wrong passwords crashed the handler and returned a 500 (#57).]]
[[## How to test]]
[[1. npm test]]
[[2. POST /api/login with a wrong password: the response should be 401 {"error": "Invalid email or password"}]]
[[## Notes]]
[[- The message is the same for a wrong email, so we don't reveal which emails exist.]]

والـ template في [[.github/pull_request_template.md]] فيه العناوين بس ([[## What]] و [[## Why]] و [[## How to test]] و [[## Notes]])، و GitHub بيحطه في خانة الوصف أوتوماتيك لما تفتح PR.

راجع: كل جملة فيها s لو الفاعل مفرد، والـ How to test فيه نتيجة متوقعة ([[should be 401]]) مش خطوات بس.`
        },
        {
          cmd: "تعليقات review",
          title: "تكتب تعليق review مؤدب وواضح: nit و suggestion و blocker و سؤال",
          desc: R`تعليق الـ review الكويس بيقول ٣ حاجات: المشكلة، وليه مهمة، وقد إيه مهمة (لازم تتصلح قبل الدمج، ولا رأي). وبيتكتب بلغة بتتكلم عن الكود مش عن الشخص.

كتير من الفرق بتستخدم «labels» في أول التعليق عشان الدرجة تبان: [[nit:]] (nitpick) حاجة صغيرة جدًا ومش لازمة، و [[suggestion:]] اقتراح، و [[question:]] سؤال بجد مش هجوم، و [[issue:]] أو [[blocking:]] لازم تتصلح قبل الدمج، و [[praise:]] مدح لحاجة حلوة. (فيه مواصفة اسمها Conventional Comments بتقترح الشكل ده.)

الأسلوب: أسئلة واقتراحات بدل أوامر ([[What do you think about ...?]] بدل [[Change this]])، و [[we]] بدل [[you]] ([[We could ...]])، واقتراح الحل مع المشكلة. التفاصيل غير اللغوية في درس [[تعليق review]] في «تاب هندسة البرمجيات».`,
          example: R`nit: typo in the variable name, "recieve" -> "receive".
suggestion: What do you think about extracting this into a helper? It's used in three places.
question: Is there a reason we fetch the user twice here? I might be missing something.
blocking: This query builds SQL from user input, so it's open to SQL injection. Could we use a parameterized query instead?
issue: If the API returns 404, $__btuser$__bt is undefined and the page crashes. Should we handle that case?
praise: Nice test coverage on the edge cases!
Wrong: Why did you do this? This is wrong.
Right: I'm not sure this handles an empty list. What happens if items is []?
Wrong: Change it to map.
Right: Could we use map() here? It would avoid mutating the array.`,
          try: R`خد PR لزميل (أو PR قديم بتاعك، أو PR في مشروع open source) واكتب ٣ تعليقات: واحد [[nit:]] وواحد [[question:]] وواحد [[suggestion:]] أو [[blocking:]]. كل واحد فيه المشكلة وليه والحل المقترح، ومن غير ولا جملة فيها [[you are wrong]].`,
          flag: "script",
          deep: {
            why: "النص في الـ review بيتقري من غير نبرة صوت ولا تعبيرات وش، فجملة عادية بالعربي ممكن تتقري بالإنجليزي كأنها هجوم. والإنجليزي المهني بيعتمد على «التلطيف» (softening) بشكل كبير. لو اتعلمته، زمايلك هيحبوا الـ reviews بتاعتك.",
            how: R`عبارات التلطيف:
[[Could we ...?]] و [[What do you think about ...?]] و [[Have you considered ...?]] = اقتراح.
[[I might be missing something, but ...]] = يمكن أنا اللي فاتني حاجة.
[[I'm not sure ...]] و [[I wonder if ...]] = شك مؤدب.
[[It might be worth ...]] = ممكن يستاهل.
[[Not a blocker, but ...]] و [[Optional:]] = مش لازم.
[[Feel free to ignore]] = لو مش عاجبك سيبه.
[[Happy to discuss]] = نتكلم لو حابب.

وعبارات الحزم (لما الموضوع مهم بجد): [[This needs to be fixed before we merge because ...]] و [[This will break ... in production]]. الحزم مش قلة أدب لو فيه سبب واضح.

و [[LGTM]] = Looks Good To Me (موافقة). و [[PTAL]] = Please Take Another Look. و [[WDYT]] = What Do You Think. و [[IMO]] / [[IMHO]] = In My (Humble) Opinion. و [[FYI]] = For Your Information. و [[TL;DR]] = الخلاصة.

لاحظ في المثال: الـ [[issue:]] كاتب السيناريو ([[If the API returns 404]]) والنتيجة ([[the page crashes]]). ده بيخلي التعليق مقنع مش رأي.`,
            when: "أي review، وكمان في تعليقات الـ issues والـ design docs.",
            mistakes: R`[[Why you did this?]]: غلط grammar ([[Why did you do this?]]) وكمان بيتقري هجومي. و [[This is wrong]] من غير سبب. و [[Please fix]] على كل حاجة من غير ما تفرّق بين nit و blocker، فالمراجَع بيتوه. و [[Kindly]] كتير: بتبان رسمية زيادة. وتعليقات بالـ ALL CAPS: بتتقري زعيق.`
          },
          lines: [
            R`nit = حاجة صغيرة. «غلطة إملائية في اسم المتغير». -> = تبقى.`,
            R`suggestion بسؤال: «إيه رأيك نطلّع ده في helper؟ مستخدم في ٣ أماكن».`,
            R`question حقيقي: «فيه سبب إننا بنجيب اليوزر مرتين؟ يمكن فاتني حاجة».`,
            R`blocking + السبب + الحل: «ده بيبني SQL من إدخال اليوزر فمعرّض لـ SQL injection. ممكن نستخدم parameterized query؟»`,
            R`issue + سيناريو: «لو الـ API رجّع 404، user هيبقى undefined والصفحة هتقع. نتعامل مع الحالة دي؟»`,
            R`praise = مدح. «تغطية حلوة للحالات الطرفية». edge cases = الحالات النادرة.`,
            R`غلط: هجومي ومن غير سبب.`,
            R`صح: شك مؤدب + سيناريو محدد.`,
            R`غلط: أمر من غير سبب.`,
            R`صح: اقتراح + فايدته. mutate = تعدّل الأصل.`
          ],
          sol: R`أمثلة لـ ٣ تعليقات صح:
[[nit: "lenght" -> "length" in line 24.]]
[[question: Is the setTimeout here needed? I might be missing something, but the data is already loaded at this point.]]
[[suggestion: What do you think about moving the price formatting into a formatPrice() helper? The same logic is in Cart.tsx and Checkout.tsx.]]
أو لو فيه مشكلة حقيقية:
[[blocking: The API key is hardcoded in this file and will end up in the client bundle. Could we move it to the backend and call it through our API?]]

راجع كل تعليق: فيه المشكلة؟ فيه ليه مهمة؟ فيه اقتراح؟ باين قد إيه مهم (nit/blocking)؟ مفيش [[you]] كتير؟ لو كتبت [[You forgot to handle errors]]، خليها [[It looks like errors aren't handled here. Should we add a try/catch?]].`
        },
        {
          cmd: "ترد على review",
          title: "ترد على تعليقات الـ review: Done و Good catch و تختلف بأدب",
          desc: R`لما حد يراجع كودك، كل تعليق محتاج رد (حتى لو كلمة)، عشان المراجع يعرف إنك شفته وعملت إيه. الردود بتتقسم ٤ أنواع: وافقت وصلّحت، أو وافقت بس هتعمله بعدين، أو عندك سؤال، أو مختلف معاه وعندك سبب.

والاختلاف عادي ومطلوب، بس بسبب مش بإحساس: [[I'd prefer to keep it because ...]] مع سبب تقني، أو اقتراح حل وسط. ولو النقاش طول (أكتر من ردين تلاتة)، اقترح مكالمة: [[Happy to jump on a quick call]].`,
          example: R`Good catch, thanks! Fixed in a1b2c3d.
Done.
Makes sense. I extracted it into formatPrice() in the latest commit.
Good point. I'll handle that in a follow-up PR (#131) to keep this one small.
I'm not sure I understand. Do you mean moving the check to the middleware?
I'd prefer to keep it inline, because it's only used here and a helper would hide the query.
You're right, I missed that case. Added a test for it.
I tried that first, but it caused a re-render loop. Happy to discuss if you see another way.
Thanks for the review! I addressed all comments. PTAL.`,
          try: R`تخيّل إن جالك التعليقات الـ ٦ اللي في درس «تعليقات review» على PR بتاعك. اكتب رد لكل واحد: اتنين موافقة وتصليح، وواحد «هعمله في PR تاني»، وواحد سؤال توضيح، وواحد اختلاف بسبب تقني، وآخر رسالة للمراجع بعد ما خلصت.`,
          flag: "script",
          deep: {
            why: "الرد بيقفل الحلقة: المراجع ميضطرش يدوّر إذا كنت صلحت ولا لأ. والطريقة اللي بترد بيها على النقد بتبني سمعتك في الفريق أكتر من الكود نفسه.",
            how: R`عبارات:
موافقة: [[Good catch!]] و [[Good point.]] و [[Makes sense.]] و [[You're right.]] و [[Done.]] و [[Fixed in <commit>.]] و [[Updated.]].
تأجيل: [[I'll handle that in a follow-up.]] و [[Created #131 to track it.]] و [[Out of scope for this PR, but good idea.]]
سؤال: [[Could you clarify ...?]] و [[Do you mean ...?]] و [[Just to make sure I understand: ...]]
اختلاف: [[I see your point, but ...]] و [[I'd prefer to ... because ...]] و [[I considered that, but ...]] و [[I tried that, but ...]]
خلصت: [[I addressed all comments.]] و [[Ready for another look.]] و [[PTAL]].

و [[address]] هنا مش «عنوان»، دي «اتعاملت مع». و [[resolve]] الـ thread على GitHub: خليه للمراجع لو التعليق مهم (شوف عادة الفريق). وتفاصيل التعامل مع الـ review نفسه في درس [[تستقبل review]] في «تاب هندسة البرمجيات».`,
            when: "بعد أي review، قبل ما تطلب المراجعة تاني.",
            mistakes: R`تصلّح من غير ما ترد. أو ترد [[ok]] على كل حاجة حتى اللي مش موافق عليها. أو تاخدها شخصي وترد بدفاع طويل. و [[I will fix it later]] من غير issue: «later» بتبقى «never». و [[I have fixed]] من غير مفعول: [[I fixed it]] أو [[Fixed.]].`
          },
          lines: [
            R`«ملاحظة حلوة، شكرًا! اتصلحت في الـ commit ده». اكتب الـ hash عشان يلاقيه.`,
            R`كلمة واحدة كفاية للـ nits.`,
            R`«منطقي. طلّعته في formatPrice في آخر commit».`,
            R`«نقطة حلوة. هعملها في PR بعده (#131) عشان ده يفضل صغير».`,
            R`سؤال توضيح: «مش متأكد إني فاهم. تقصد ننقل الـ check للـ middleware؟»`,
            R`اختلاف بسبب: «أفضّل أسيبه هنا، لأنه مستخدم هنا بس والـ helper هيخبّي الـ query».`,
            R`«عندك حق، فاتتني الحالة دي. ضفت اختبار ليها».`,
            R`«جربت ده الأول بس عمل loop في الـ render. نتكلم لو شايف طريقة تانية».`,
            R`الرسالة الأخيرة: «اتعاملت مع كل التعليقات. بص تاني لو سمحت».`
          ],
          sol: R`ردود صح على التعليقات الـ ٦:
nit (recieve) ← [[Fixed, thanks!]]
suggestion (helper) ← [[Good idea. Extracted it into getUserName() in 4f5e6a7.]]
question (fetch twice) ← [[Good catch, the second fetch was left over from debugging. Removed.]]
blocking (SQL injection) ← [[You're right, thanks for catching this. Switched to a parameterized query and added a test with a malicious input.]]
issue (404) ← [[I'll handle the 404 case in a follow-up to keep this PR small: #140.]] (بس لو هي فعلًا مش هتوقع الإنتاج، وإلا صلّحها دلوقتي)
اختلاف (على أي واحد) ← [[I considered a helper, but it's only used here and I think inline is easier to read. Happy to change it if you feel strongly.]]
وفي الآخر: [[Thanks for the review! I addressed all comments except the 404 one (#140). Ready for another look.]]

لاحظ: [[if you feel strongly]] = «لو انت شايف إنها مهمة» (بتسيبله القرار بأدب). ولو كتبت رد فيه [[but you are wrong]]، شيل النص ده وخلي السبب التقني يتكلم.`
        }
      ]
    },
    {
      t: "issues و bug reports",
      l: 2,
      n: "bug report فيه steps to reproduce و expected و actual، و feature request وسؤال لمشروع open source من غير ما حد يقفله",
      items: [
        {
          cmd: "bug report",
          title: "bug report: Steps to reproduce و Expected و Actual و Environment",
          desc: R`الـ bug report الكويس بيخلي أي حد يشوف الـ bug بعينه في دقيقتين. والشكل ده ثابت في كل الفرق وكل مشاريع الـ open source تقريبًا (وأغلبها عندها issue template بيطلبه):

[[Title]] جملة بتوصف السلوك الغلط ومكانه، و [[Steps to reproduce]] خطوات مرقمة بالـ imperative، و [[Expected behavior]] كان المفروض يحصل إيه، و [[Actual behavior]] حصل إيه فعلًا (ومعاه رسالة الخطأ بالنص، و screenshot)، و [[Environment]] الإصدارات (OS و browser و Node و المكتبة)، و [[Additional context]] أي حاجة تانية (بيحصل دايمًا ولا ساعات؟ بدأ إمتى؟).

الكلمة المفتاحية: [[reproduce]] = تخلي الـ bug يحصل تاني عمدًا. و [[repro]] اختصارها. و [[minimal reproduction]] = أصغر كود ممكن بيطلّع الـ bug.`,
          example: R`Title: Cart total ignores coupon after page reload
Steps to reproduce
1. Add any product to the cart.
2. Apply the coupon SAVE10.
3. Reload the page.
Expected behavior
The total still includes the 10% discount.
Actual behavior
The discount disappears, but the coupon is still shown as applied.
No error in the console.
Environment
- Chrome 140 on Windows 11
- Production (shop.example.com), commit 3f2a1bc
Additional context
It happens every time. It started after the cart was moved to localStorage (#97).`,
          try: R`اختار bug حقيقي في مشروع عندك (أو في موقع بتستخدمه) واكتبله report بالشكل ده بالإنجليزي. وبعدين ادّيه لحد تاني من غير ما تشرحله: لو قدر يعمل reproduce من الخطوات بس، الـ report ناجح.`,
          flag: "script",
          deep: {
            why: "bug report غامض ([[the cart is broken]]) بيضيع ساعات في «بيحصل إزاي؟» و «عندك إيه؟». والـ report الكويس نصه الحل: لما تكتب الخطوات والفرق بين expected و actual، كتير بتلاقي السبب وانت بتكتب.",
            how: R`عنوان كويس = [[what + where + when]]: [[Cart total ignores coupon after page reload]]. مش [[Cart bug]] ولا [[URGENT!!! not working]].

الخطوات: imperative ومرقّمة وكل خطوة حاجة واحدة. ابدأ من حالة معروفة ([[Log in as a new user]]).

Expected و Actual: جملتين بالـ present simple. الفرق بينهم هو الـ bug. [[Actual]] فيه رسالة الخطأ منسوخة كنص (مش صورة بس)، عشان حد يقدر يدوّر بيها.

كلمات مفيدة: [[consistently]] / [[every time]] = دايمًا، و [[intermittently]] / [[sometimes]] = ساعات، و [[regression]] = حاجة كانت شغالة وباظت، و [[workaround]] = حل مؤقت، و [[It started after ...]] = بدأ بعد، و [[I can't reproduce it locally]] = مش بيحصل عندي.

تفاصيل الـ issue في GitHub (labels و [[gh issue create]]) في «تاب Git».`,
            when: "أي bug في شغلك (Jira أو GitHub Issues أو Linear)، وأي bug في مكتبة open source.",
            mistakes: R`[[It doesn't work]] من غير تفاصيل. وصورة للخطأ بدل النص. ونسيان الإصدارات. وخلط كذا bug في issue واحد. و [[Expected: it works]]: ده مش expected، قول بيعمل إيه بالظبط. و [[I think the problem is in the useEffect]] في مكان Actual: التخمين مكانه Additional context.`
          },
          lines: [
            R`العنوان: إيه + فين + إمتى. «إجمالي السلة بيتجاهل الكوبون بعد reload».`,
            "عنوان قسم: خطوات تكرار الـ bug.",
            "خطوة ١ بالـ imperative.",
            "خطوة ٢. apply = تطبّق.",
            "خطوة ٣. reload = تعمل تحديث للصفحة.",
            "عنوان قسم: المتوقع.",
            R`«الإجمالي لسه فيه خصم ١٠٪». still = لسه.`,
            "عنوان قسم: اللي حصل فعلًا.",
            R`«الخصم بيختفي، بس الكوبون لسه ظاهر إنه متطبق». disappears = يختفي.`,
            R`«مفيش خطأ في الـ console». معلومة مهمة حتى لو سلبية.`,
            "عنوان قسم: البيئة.",
            "المتصفح والنظام.",
            "البيئة والـ commit بالظبط.",
            "عنوان قسم: معلومات إضافية.",
            R`«بيحصل كل مرة. بدأ بعد ما السلة اتنقلت لـ localStorage». ده غالبًا مكان السبب (regression).`
          ],
          sol: R`مثال صح:
[[Title: Signup form accepts emails without a domain]]
[[Steps to reproduce]]
[[1. Open /signup.]]
[[2. Enter "sara@" as the email and fill in the other fields.]]
[[3. Click "Create account".]]
[[Expected behavior]]
[[The form shows "Enter a valid email address" and does not submit.]]
[[Actual behavior]]
[[The form submits and the API returns 500: "invalid input syntax" in the server logs.]]
[[Environment]]
[[- Firefox 143 on macOS; local dev, commit 8e1d2f0]]

الاختبار الحقيقي: حد غيرك عمل reproduce من غير أسئلة. لو سألك «أنهي صفحة؟» أو «بإيه سجلت؟»، الإجابة لازم تدخل في الخطوات. (أرقام إصدارات المتصفحات في الأمثلة للتوضيح، اكتب اللي عندك من [[about:]] أو [[chrome://version]].)`
        },
        {
          cmd: "issue لمشروع open source",
          title: "تسأل أو تطلب feature في مشروع open source من غير ما الـ issue يتقفل",
          desc: R`الـ maintainers متطوعين غالبًا وعندهم مئات الـ issues. الـ issue اللي بيتقفل بسرعة هو اللي مكرر، أو سؤال مكانه مش هنا، أو من غير repro. واللي بياخد رد هو اللي بيوفّر وقتهم.

قبل ما تكتب: ١) دوّر في الـ issues (المفتوحة والمقفولة) بكلمات الخطأ. ٢) اقرا [[CONTRIBUTING.md]] والـ issue templates. ٣) شوف لو فيه Discussions أو Discord للأسئلة (مش كل سؤال bug). ٤) جرّب آخر إصدار.

وفي الـ feature request: ابدأ بالمشكلة مش بالحل ([[I'm trying to ... but ...]])، وقول بتعمل إيه دلوقتي كـ workaround، واقترح API لو عندك فكرة، واعرض تساعد ([[I'd be happy to open a PR]]).`,
          example: R`Title: Support custom headers in the retry hook
Is your feature request related to a problem?
I need to refresh the auth token before retrying a 401, but the retry hook
doesn't let me change the request headers.
Describe the solution you'd like
Pass the request options to the hook so they can be modified, e.g.
retry: { onRetry: (req) => { req.headers.set("Authorization", newToken) } }
Describe alternatives you've considered
Wrapping every call in my own retry loop, which duplicates the library logic.
Additional context
I searched existing issues and found #412, which is related but only covers timeouts.
I'd be happy to open a PR if this sounds good.`,
          try: R`اختار مكتبة بتستخدمها وافتح تاب Issues بتاعها. دوّر على مشكلة قابلتك فعلًا (بكلمات رسالة الخطأ) واقرا ٣ issues: واحد اتحل، وواحد اتقفل من غير حل، وواحد لسه مفتوح. اكتب لكل واحد ليه أخد النتيجة دي. وبعدين اكتب (من غير ما تنشر) issue لحاجة عايزها بالقالب اللي فوق.`,
          flag: "script",
          deep: {
            why: "الـ open source أحسن مكان تتعلم فيه إنجليزي تقني حقيقي، وأول PR أو issue مقبول في مكتبة مشهورة حاجة بتتحط في الـ CV. بس issue مكتوب وحش بيتقفل وبيزعّل.",
            how: R`عبارات جاهزة:
[[I searched the existing issues and couldn't find this.]]
[[This might be related to #412.]]
[[Here's a minimal reproduction: <link to StackBlitz / CodeSandbox / repo>]]
[[I'm not sure if this is a bug or expected behavior.]]
[[Is this something you'd accept a PR for?]]
[[Thanks for maintaining this library!]] (في الآخر، مش مبالغ فيه)

كلمات هتشوفها من الـ maintainers: [[duplicate of #]] = مكرر، و [[wontfix]] = مش هنعمله، و [[needs repro]] = محتاج reproduction، و [[good first issue]] = مناسب لأول مساهمة، و [[stale]] = اتقفل لأن محدش رد، و [[upstream]] = المشكلة في مكتبة تانية، و [[by design]] = السلوك ده مقصود، و [[PRs welcome]] = اعمله انت.

وقوالب GitHub الافتراضية للـ feature request بتسأل بالظبط الأسئلة اللي في المثال ([[Is your feature request related to a problem?]] و [[Describe the solution you'd like]] و [[Describe alternatives you've considered]]).`,
            when: "أي مشكلة في مكتبة: دوّر الأول، واكتب issue لو متأكد إنه جديد.",
            mistakes: R`[[+1]] أو [[any update?]] على issue قديم: استخدم reaction (علامة الإبهام) بدل تعليق. وسؤال «إزاي أعمل كذا» كـ bug. و [[This library is garbage]] أو زعيق. و [[please fix ASAP]]: محدش مدينلك بحاجة. ولصق ٢٠٠ سطر من الكود بتاعك بدل minimal reproduction.`
          },
          lines: [
            R`العنوان: الـ feature بالظبط. «ادعم headers مخصصة في الـ retry hook».`,
            "سؤال القالب: الطلب ده مرتبط بمشكلة؟",
            R`المشكلة: «محتاج أجدد الـ token قبل ما أعيد طلب رجّع 401، بس...»`,
            R`«... الـ hook مش بيسمحلي أغيّر الـ headers».`,
            "سؤال القالب: الحل اللي عايزه.",
            R`«ابعت options الطلب للـ hook عشان تتعدّل، مثلًا:»`,
            "اقتراح API بالكود.",
            "سؤال القالب: البدائل اللي فكرت فيها.",
            R`«إني ألف كل نداء في retry loop بتاعي، وده بيكرر منطق المكتبة». duplicates = بيكرر.`,
            "سؤال القالب: معلومات إضافية.",
            R`«دوّرت في الـ issues ولقيت #412، مرتبط بس بيغطي الـ timeouts بس».`,
            R`«أكون مبسوط أعمل PR لو الفكرة كويسة». ده بيفرق جدًا مع الـ maintainers.`
          ],
          sol: R`الأنماط اللي المفروض تلاقيها:
الـ issue اللي اتحل: فيه repro واضح (لينك أو كود صغير)، والإصدارات، والـ maintainer قدر يشوف المشكلة بسرعة.
اللي اتقفل من غير حل: غالبًا [[duplicate]]، أو [[needs repro]] ومحدش رد فبقى [[stale]]، أو السلوك [[by design]]، أو المشكلة [[upstream]] في مكتبة تانية.
اللي لسه مفتوح: ممكن يكون صعب، أو مستني حد يعمل PR ([[help wanted]] أو [[PRs welcome]]).

والـ issue اللي كتبته صح لو: العنوان محدد، والمشكلة قبل الحل، وفيه workaround، وقلت إنك دوّرت، ومفيش [[ASAP]] ولا [[any update]]. ولو ملقتش قالب في الـ repo، استخدم نفس الأسئلة دي.`
        }
      ]
    }
]);

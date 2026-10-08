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
          teach: R`## الـ README ده ٥ أقسام، وكل قسم بيجاوب سؤال

| القسم | السؤال اللي بيجاوبه | تقراه إمتى |
|---|---|---|
| السطر اللي تحت الاسم | المكتبة بتعمل إيه؟ | دايمًا |
| [[## Prerequisites]] | محتاج إيه عندي قبل ما أبدأ؟ | **قبل** التسطيب |
| [[## Installation]] | أسطّبها إزاي؟ | |
| [[## Quick start]] | أقصر طريق لأول نتيجة؟ | |
| [[## Configuration]] | أغيّر الإعدادات إزاي؟ | لما تحتاج |
| [[## Troubleshooting]] | لو حاجة باظت؟ | لما حاجة تبوظ |

[[##]] في Markdown عنوان قسم.

---

## الجمل حتة حتة

~~~text
A tiny CLI to resize images from the terminal.
~~~

[[A tiny CLI]] = «CLI صغير جدًا»، و [[to resize]] = «عشان يغيّر مقاس». الـ [[to]] قبل الفعل هنا معناها «عشان».

~~~text
- Node.js 20 or later
~~~

[[or later]] = أو أحدث. نفس المعنى: [[or higher]] و [[20+]].

~~~text
acme resize photo.jpg --width 800
This creates photo-800.jpg in the same folder.
~~~

الأمر، وبعده **النتيجة المتوقعة** بالـ present simple: [[This creates ...]]. لو مطلعتش النتيجة دي، وقّف قبل الخطوة الجاية.

~~~text
Options can be set in acme.config.json. CLI flags take precedence over the config file.
~~~

- [[can be set]]: passive، «ممكن تتحط».
- [[take precedence over]] = «ليها الأولوية على»: لو حطيت [[--width]] في الأمر وقيمة تانية في الملف، اللي في الأمر بيكسب.

~~~text
If you see "command not found", make sure your global npm bin folder is in your PATH.
~~~

[[If you see X, make sure Y]]: شكل كل جمل الـ Troubleshooting. و [[make sure]] = اتأكد.

---

## الخلاصة

- اقرا Prerequisites قبل أي حاجة.
- الجملة اللي بعد الأمر = النتيجة المتوقعة، قارن بيها.
- [[take precedence over]] = تكسب لما يتعارضوا.
- الـ README على GitHub لآخر إصدار، مش بالضرورة إصدارك.`,
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
          teach: R`## نقرا صفحة [[fs.readFile]] حتة حتة

### الـ Syntax

~~~text
fs.readFile(path[, options], callback)
~~~

| الحتة | معناها |
|---|---|
| [[fs.readFile]] | الدالة [[readFile]] في موديول [[fs]] |
| [[path]] | أول argument، إجباري |
| [[[, options]]] | الأقواس المربعة = **اختياري**. مش بتتكتب في الكود |
| [[callback]] | آخر argument، دالة بتتنادى لما يخلص |

### الـ Parameters

~~~text
  path <string> | <Buffer> | <URL> | <integer> filename or file descriptor
    encoding <string> | <null> Default: null
~~~

- [[<string>]] النوع بين علامتين. و [[|]] = «أو» (زي union في TypeScript).
- [[filename or file descriptor]] = اسم الملف أو رقم ملف مفتوح.
- [[Default: null]] = لو مبعتش encoding، قيمته null.

### الـ Description

~~~text
Asynchronously reads the entire contents of a file.
The callback is passed two arguments (err, data), where data is the contents of the file.
If no encoding is specified, then the raw buffer is returned.
If options is a string, then it specifies the encoding.
~~~

| الجملة | المهم فيها |
|---|---|
| [[Asynchronously reads ...]] | مش بيستنى، والنتيجة في الـ callback. الفاعل محذوف ([[It]]) والـ s موجودة |
| [[is passed two arguments]] | passive: «بيتبعتله اتنين arguments» |
| [[where data is ...]] | [[where]] هنا = «بحيث إن» |
| [[If no encoding is specified]] | لو محددتش encoding |
| [[the raw buffer is returned]] | بيرجع bytes خام |
| [[If options is a string]] | لو options كانت string، يبقى هي الـ encoding |

---

## نتأكد إن الـ docs صادقة

جرّبت على ويندوز بـ Node 24 في فولدر فيه [[package.json]] صغير:

~~~bash
node -e 'console.log(require("fs").readFileSync("package.json"))'
~~~

~~~text الناتج
<Buffer 7b 0a 20 20 22 6e 61 6d 65 22 3a 20 22 64 65 6d 6f 22 0a 7d 0a>
~~~

bytes بالـ hex: [[7b]] هو [[{]] و [[0a]] سطر جديد و [[22]] علامة تنصيص. ده [[the raw buffer]] بالظبط.

~~~bash
node -e 'console.log(require("fs").readFileSync("package.json", "utf8"))'
~~~

~~~text الناتج
{
  "name": "demo"
}
~~~

[["utf8"]] string، فاتفهمت encoding زي ما الجملة الأخيرة قالت.

---

## الخلاصة

- ترتيب القراية: Syntax ثم Parameters ثم Return value ثم Exceptions ثم مثال.
- [[[ ]]] في الـ Syntax = اختياري، و [[Default:]] = القيمة لو سبته.
- اقرا docs إصدارك ([[Added in: vX]]).`,
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
          teach: R`## الكلمات دي سلّم: من «لازم» لـ «مسموح»

| الكلمة | قوتها | لو خالفتها |
|---|---|---|
| [[must]] / [[required]] | إجباري | الكود هيقع أو هيترفض |
| [[must not]] | ممنوع | مشكلة أكيدة |
| [[should]] / [[recommended]] | نصيحة قوية | هتدفع التمن بعدين |
| [[should not]] / [[discouraged]] | مش مفضّل | |
| [[may]] / [[can]] | مسموح أو ممكن يحصل | |
| [[optional]] | اختياري | مفيش مشكلة |

---

## الجمل كلمة كلمة

| الجملة | اقراها |
|---|---|
| [[The name must be unique.]] | الاسم لازم يبقى فريد |
| [[You must not commit the .env file.]] | ممنوع |
| [[You should run migrations in a transaction.]] | المفروض، ولو خالفت اعرف ليه |
| [[The callback may be called more than once.]] | ممكن **يحصل**: تحذير إن الـ callback بتاعك لازم يستحمل ده |
| [[timeout (optional): number of milliseconds to wait.]] | [[(optional)]] جنب الاسم = تقدر تسيبه |
| [[port defaults to 3000.]] | لو سبته، قيمته 3000. متنساش [[to]] |
| [[If omitted, the current directory is used.]] | [[omitted]] = اتساب. والـ passive [[is used]] |
| [[By default, logs are written to stdout.]] | افتراضيًا. [[written]] تصريف تالت لـ write |
| [[Note: this method does not modify the original array.]] | [[Note]] = خد بالك |
| [[Warning: this action cannot be undone.]] | [[undone]] = اتلغى أثره. مفيش رجوع |
| [[One caveat: the cache is not shared between workers.]] | [[caveat]] = عيب أو استثناء لازم تعرفه |

---

## الفخ الأشهر: «مش لازم»

| تقصد | الصح | الغلط |
|---|---|---|
| ممنوع | [[You must not install it globally.]] | |
| مش لازم (بس مسموح) | [[You don't have to install it globally.]] | [[You mustn't ...]] |

و [[may]] ليها معنيين: «مسموح» ([[You may pass a second argument]]) و «ممكن يحصل» ([[This may take a few minutes]]).

---

## الخلاصة

- [[must]] > [[should]] > [[may]].
- [[don't have to]] = مش لازم، [[must not]] = ممنوع.
- [[defaults to]] بالـ [[to]]، و [[it's must]] غلط: [[it's required]].`,
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
          teach: R`## الخطة ٧ خطوات، كل خطوة بتجاوب سؤال

| الخطوة | السطر | السؤال |
|---|---|---|
| ١ | [[Headings only]] | الصفحة فيها إيه؟ |
| ٢ | [[Code blocks]] | شكله في الحقيقة إيه؟ |
| ٣ | [[First sentence of each paragraph]] | الفكرة الأساسية |
| ٤ | [[Signal words]] | فين القواعد والتحذيرات؟ |
| ٥ | [[Ctrl+F]] | فين الكلمة اللي محتاجها بالظبط؟ |
| ٦ | [[Unknown word]] | أعدّيها ولا أدوّر عليها؟ |
| ٧ | [[Write one line]] | فهمت إيه فعلًا؟ |

---

## ليه الكود قبل الكلام؟

الـ docs غالبًا بتشرح الفكرة في فقرة، وبعدين تحطها في مثال. المثال بيفهمك أغلب الكلام في ثواني، والفقرة بتبقى تأكيد.

## ليه أول جملة بس؟

الكتابة التقنية الكويسة بتحط الفكرة في أول جملة في الفقرة (topic sentence)، والباقي تفاصيل وأمثلة.

## الـ signal words

~~~text
must, not, only, unless, Warning, Note, deprecated, numbers
~~~

دي الكلمات اللي بتقلب المعنى أو بتحط قاعدة (دروس «optional و defaults to» و «if / unless / instead of»). عينك تقف عندها حتى وانت بتجري.

## كلمة مش عارفها: ٣ أسئلة

| السؤال | لو الإجابة... |
|---|---|
| هي في العنوان؟ | آه: دوّر عليها |
| بتتكرر كتير؟ | آه: دوّر عليها |
| الجملة مفهومة من غيرها؟ | آه: عدّيها |

---

## السطر الأخير

~~~text
"This page explains ... The key rule is ..."
~~~

[[explains]] بالـ s (الفاعل [[This page]] مفرد). و [[The key rule]] = القاعدة الأهم. لو مش قادر تكمّل الجملتين، ارجع للخطوة ٣ و ٤.

---

## الخلاصة

- العناوين، ثم الكود، ثم أول جملة، ثم الكلمات المهمة.
- صناديق Note و Warning و Pitfall أهم حاجة في الصفحة، متعدّيهاش.
- متترجمش الصفحة كلها: [[state]] هتبقى «ولاية».`,
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
          teach: R`## قاعدة واحدة: فاعل مفرد = s

| الفاعل | الفعل | مثال |
|---|---|---|
| مفرد غايب: [[it]]، [[the function]]، [[the server]]، [[each request]] | بـ [[s]] | [[The function returns ...]] |
| جمع أو [[I]] أو [[you]] أو [[we]] أو [[they]] | من غير | [[These functions return ...]] |

---

## الجمل حتة حتة

| الجملة | الفاعل | الفعل |
|---|---|---|
| [[The function returns a Promise.]] | مفرد | [[returns]] |
| [[This hook fetches the data on mount.]] | مفرد | [[fetches]]: آخرها ch فبقت [[es]] |
| [[The server sends a 201 status code.]] | مفرد | [[sends]] |
| [[Each request creates a new session.]] | [[each]] دايمًا مفرد | [[creates]] |
| [[These functions return strings.]] | جمع | [[return]] |
| [[We cache the result for 60 seconds.]] | [[we]] | [[cache]] |

[[on mount]] = أول ما الـ component يتركّب على الصفحة.

---

## النفي والسؤال: الـ s بتروح لـ does

~~~text
The API does not support pagination yet.
Does this method modify the original array?
~~~

الـ s اتنقلت لـ [[does]]، فالفعل بعدها من غير s: [[does not support]] و [[Does ... modify]]. عشان كده [[It doesn't returns]] غلط.

---

## إزاي تضيف الـ s

| آخر الفعل | الإضافة | مثال |
|---|---|---|
| أغلب الأفعال | [[s]] | [[returns]] و [[runs]] |
| s و sh و ch و x و o | [[es]] | [[fetches]] و [[pushes]] و [[fixes]] و [[does]] |
| حرف ساكن + y | [[ies]] | [[applies]] و [[retries]] |
| [[have]] | [[has]] | |

---

## الخلاصة

- فاعل مفرد = s. بعد [[does]] و [[doesn't]] = من غير s.
- في تعليقات الدوال الفاعل محذوف بس الـ s فاضلة: [[Returns the user.]]
- في الـ commits العكس: من غير s ([[Fix bug]]).`,
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
          teach: R`## الأمر = الفعل زي ما هو، في أول الجملة

من غير فاعل، ومن غير s، ومن غير to، ومن غير ed أو ing.

---

## ٣ أماكن، نفس الشكل

| المكان | من المثال |
|---|---|
| README | [[Install the dependencies.]] و [[Copy .env.example to .env and fill in the values.]] |
| UI | [[Click "Save" to apply the changes.]] |
| commits | [[Fix login redirect loop]] و [[Add rate limiting to the /login endpoint]] |

- [[fill in]] = املى (الخانات).
- [[to apply]] في آخر جملة الـ UI = «عشان تتطبّق».
- الـ commit من غير نقطة في الآخر.

---

## النفي

~~~text
Do not edit this file manually.
~~~

[[Do not]] أو [[Don't]] + الفعل. و [[manually]] = بإيدك.

## الشرط قبل الأمر

~~~text
Run the migrations before you start the server.
To install, run npm install.
~~~

[[To install, ...]] = «عشان تسطّب، ...». الـ [[To]] في الأول معناها «عشان».

---

## اختبار الـ commit

الرسالة لازم تكمّل الجملة دي صح:

~~~text
If applied, this commit will ___
~~~

| الرسالة | الجملة | النتيجة |
|---|---|---|
| [[Add login page]] | will add login page | ✓ |
| [[Added login page]] | will added | ✗ |
| [[Adding login page]] | will adding | ✗ |
| [[Adds login page]] | will adds | ✗ |

و git نفسه بيكتب كده. جرّبت في repo تجريبي: [[git merge]] من غير رسالة كتب [[Merge branch 'x']]، و [[git revert]] كتب [[Revert "d"]].

---

## الخلاصة

- التعليمات بالإنجليزي من غير [[please]]، وده مش قلة أدب.
- بعد [[should]] و [[must]] و [[can]] من غير [[to]]: [[you should run]].
- الـ commit يكمّل «If applied, this commit will ...».`,
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
          teach: R`## الشكل: be + التصريف التالت

| الزمن | الشكل | من المثال |
|---|---|---|
| حاضر | [[is/are + V3]] | [[is called]] و [[is thrown]] و [[are ignored]] |
| ماضي | [[was/were + V3]] | [[was deprecated]] |
| مع must/can | [[must be + V3]] | [[must be provided]] و [[can be written]] |
| حصل ولسه أثره قايم | [[has/have been + V3]] | [[have been saved]] و [[has already been sent]] |

[[V3]] = التصريف التالت (past participle).

---

## الجمل حتة حتة

| الجملة | الحاجة اللي حصلها الفعل | اقراها |
|---|---|---|
| [[The callback is called once for each element.]] | الـ callback | بيتنادى (انت مش انت اللي بتناديه) |
| [[An error is thrown if the file does not exist.]] | خطأ | بيترمي |
| [[This method was deprecated in v4 and removed in v5.]] | الـ method | اتعملها deprecate واتشالت. [[removed]] من غير [[was]] تاني لأنها متشاركة |
| [[The token must be provided in the Authorization header.]] | الـ token | لازم يتبعت |
| [[Your changes have been saved.]] | التغييرات | اتحفظت |
| [[The email has already been sent.]] | الإيميل | اتبعت خلاص |

---

## الأفعال الشاذة

| الفعل | التالت | غلط شائع |
|---|---|---|
| throw | [[thrown]] | [[is throw]] |
| write | [[written]] | [[was write]] |
| send | [[sent]] | [[was send]] |
| build | [[built]] | |
| hide | [[hidden]] | |
| run و set | [[run]] و [[set]] زي ما هما | |

---

## أفعال مبتجيش passive

[[happen]] و [[occur]] و [[exist]] و [[fail]] (بمعنى فشل): [[The bug happened]] مش [[was happened]].

---

## الخلاصة

- [[be]] + تصريف تالت = passive. ولو بعده [[by]]، ده الفاعل الحقيقي.
- الـ docs ورسايل الـ UI بتحبه، والـ commits لأ.
- [[was happened]] و [[is exist]] غلط.`,
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
          teach: R`## سؤال واحد بيحل أغلب الحالات

> القارئ يعرف أنهي واحدة بالظبط؟

| الإجابة | الكلمة | مثال |
|---|---|---|
| آه | [[the]] | [[the checkout page]] (صفحة واحدة في الموقع) |
| لأ، ومفرد | [[a]] / [[an]] | [[a bug]] (أول مرة) |
| جمع أو حاجة عامة | ولا حاجة | [[Users can reset ...]] |
| اسم أداة | ولا حاجة | [[We use Postgres and Redis.]] |

---

## الجمل حتة حتة

| الجملة | ليه |
|---|---|
| [[I found a bug in the checkout page.]] | [[a bug]] أول مرة، و [[the checkout page]] معروفة |
| [[The bug happens when the cart is empty.]] | [[The bug]] اتذكر خلاص |
| [[It returns an error, not an empty array.]] | [[an]] قبل صوت علّة |
| [[Add a URL to the README.]] | [[a URL]]: «يو» صوت ي، و [[the README]] بتاع المشروع ده |
| [[The server returns a 500 when the database is down.]] | [[a 500]] واحد من النوع ده، و [[the database]] بتاعتنا |

---

## a ولا an: الصوت مش الحرف

| الكلمة | بتتنطق | الكلمة اللي قبلها |
|---|---|---|
| user | «يوزر» | [[a user]] |
| URL | «يو-آر-إل» | [[a URL]] |
| API | «إيه-بي-آي» | [[an API]] |
| hour | «آوَر» (الـ h ساكتة) | [[an hour]] |
| SQL | «إس-كيو-إل» أو «سيكوِل» | [[an SQL]] أو [[a SQL]] |

---

## القاعدة اللي مبتتكسرش

اسم مفرد countable ميقفش لوحده:

| غلط | صح |
|---|---|
| [[I created new branch.]] | [[I created a new branch.]] |
| [[I have question.]] | [[I have a question.]] |
| [[The React is a library.]] | [[React is a library.]] |

---

## الخلاصة

- [[the]] = القارئ عارف أنهي واحدة.
- [[a/an]] على حسب أول **صوت**.
- أسماء الأدوات من غير [[the]].`,
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
          teach: R`## الكلمات دي مبتتعدّش

مبتاخدش [[s]] ومبتاخدش [[a/an]]، والفعل معاها مفرد.

| الكلمة | غلط | صح |
|---|---|---|
| feedback | [[feedbacks]] و [[a feedback]] | [[some feedback]] |
| information | [[informations]] و [[an information]] | [[some information]] و [[a piece of information]] |
| advice | [[advices]] | [[some advice]] و [[a piece of advice]] |
| code | [[a new code]] و [[codes]] | [[some new code]] و [[a new function]] |
| documentation | [[documentations]] | [[the documentation is]] |
| progress | [[a good progress]] | [[good progress]] |
| experience (خبرة) | [[3 years of experiences]] | [[3 years of experience]] |

---

## الجمل حتة حتة

| الجملة | المهم |
|---|---|
| [[Thanks for the feedback!]] | من غير s |
| [[Can you give me some advice on this PR?]] | [[some]] بدل [[a]]، و [[advice on]] |
| [[I need more information about the bug.]] | [[more]] تنفع مع uncountable |
| [[The documentation is outdated.]] | الفعل مفرد [[is]]. و [[outdated]] = قديم |
| [[We made good progress this week.]] | من غير [[a]] |
| [[This code is hard to read.]] | [[code]] = الكود كله، مفرد |

---

## تعدّهم إزاي؟

| uncountable | countable بديل |
|---|---|
| advice | [[a tip]] و [[two suggestions]] |
| code | [[a line of code]] و [[a function]] |
| work | [[a job]] و [[a task]] |
| feedback | [[a comment]] و [[a review]] |

و [[a few]] مع countable ([[a few bugs]])، و [[a little]] مع uncountable ([[a little information]]).

---

## الخلاصة

- [[feedback]] و [[information]] و [[advice]] و [[code]] و [[software]] و [[equipment]] و [[research]]: من غير s أبدًا.
- الفعل معاهم مفرد: [[The software needs ...]].
- عايز تعدّ؟ [[a piece of]] أو كلمة countable.`,
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
          teach: R`## الـ ١٥ غلطة، مقسومة على سببها

كل غلطة جاية من ترجمة حرفية. لو عرفت السبب، هتمسك غلطات شبهها من غير ما تحفظها.

---

## ١. preposition زيادة أو ناقص

| غلط | صح | السبب |
|---|---|---|
| [[discuss about]] | [[discuss the API]] | [[discuss]] بياخد المفعول على طول |
| [[explain me this]] | [[explain this to me]] | الشخص بعد [[to]] |
| [[depends of]] | [[depends on]] | دايمًا [[on]] |
| [[Waiting your reply]] | [[Looking forward to your reply]] | [[wait for]]، والأطبع [[looking forward to]] |

## ٢. الزمن

| غلط | صح | السبب |
|---|---|---|
| [[I'm working on it since 2 days]] | [[I've been working on it for 2 days]] | مدة = [[for]]، ونقطة زمنية = [[since]] |
| [[I didn't understood]] | [[I didn't understand]] | بعد [[didn't]] الفعل في الأول |
| [[I am agree]] | [[I agree]] | [[agree]] فعل مش صفة |

## ٣. كلمة بمعنى تاني

| غلط | صح | المعنى الحقيقي للغلط |
|---|---|---|
| [[revert back to me]] | [[get back to me]] | [[revert]] = ترجّع كود |
| [[I have a doubt]] | [[I have a question]] | [[doubt]] = شك |
| [[postponed to 3pm]] | [[moved to 3pm]] | ممكن تتفهم يوم تاني |
| [[make a search]] | [[look into it]] | ترجمة «أعمل بحث» |

## ٤. أسلوب

| غلط | صح |
|---|---|
| [[Kindly do the needful]] | قول الطلب بالظبط: [[Could you please update the config?]] |
| [[Me and Ahmed fixed it]] | [[Ahmed and I fixed it]] |
| [[Open the PR and check it]] | [[Please take a look at the PR]] |
| [[Sorry for late]] | [[Sorry for the delay]] أو [[Sorry I'm late]] |

---

## الزمن الأصعب: [[have been + ing]]

~~~text
I've been working on it for 2 days.
~~~

[[I've]] = [[I have]]. و [[been working]] = «بشتغل ولسه». بيوصف حاجة بدأت في الماضي ولسه مستمرة، وده بالظبط «بقالي يومين شغال عليها».

---

## الخلاصة

- معظم الغلطات ترجمة حرفية: «ناقش في» و «اشرحلي» و «من يومين».
- خد ٣ في الأسبوع واستخدمهم عمدًا لحد ما يتثبتوا.
- رسالة فيها غلطة أحسن من رسالة مااتبعتتش.`,
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
    }
]);

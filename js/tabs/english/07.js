// تكملة تاب english: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/english/01.js (شرح حقول الدرس في أوله)
MORE("english", [
    {
      t: "تدوّر صح بالإنجليزي",
      l: 3,
      n: "تدوّر في Google بالكلمات الصح والـ operators، وفي GitHub issues، وتقرا إجابات Stack Overflow بعين ناقدة",
      items: [
        {
          cmd: "Google للمبرمجين",
          title: "تدوّر في Google صح: الجملة الأساسية من الخطأ و \"...\" و site: و -",
          desc: R`البحث بالإنجليزي مهارة لوحدها، وهي اللي بتفرق بين حد بيقعد ساعتين وحد بيلاقي الحل في ٥ دقايق. والخبر الحلو: البحث مش محتاج جمل صح، محتاج كلمات صح.

القواعد: ١) دوّر بالإنجليزي دايمًا، حتى لو الموضوع سهل: المحتوى الإنجليزي أكتر بمية مرة. ٢) انسخ الجملة الأساسية من الخطأ ومن غير الحاجات الخاصة بيك (أسماء ملفاتك، أرقام البورت، الـ IDs). ٣) ضيف اسم الأداة والإصدار ([[prisma 6]] أو [[next 15]]). ٤) اكتب كلمات مش أسئلة: [[react useEffect runs twice]] أحسن من [[why my useEffect is running two times in react]].

الـ operators: [["exact phrase"]] جملة بالظبط، و [[site:github.com]] في موقع معين، و [[-word]] من غير الكلمة دي، و [[OR]] يا ده يا ده، و [[after:2025-01-01]] بعد تاريخ (مفيد جدًا عشان تتجنب إجابات قديمة).`,
          example: R`"Cannot read properties of undefined (reading 'map')" react
"EADDRINUSE" node kill process port 3000
prisma "P2002" unique constraint upsert
next.js app router "cookies" server action -pages
site:github.com vite "Failed to resolve import"
tailwind v4 dark mode after:2025-01-01
eslint flat config typescript "parserOptions"
Wrong: why my code say cannot read properties of undefined when i use map in my component
Right: "Cannot read properties of undefined (reading 'map')" react useState initial value`,
          try: R`خد آخر ٣ أخطاء قابلتك (من [[errors.md]]). لكل واحد اكتب query بالقواعد: الجملة الأساسية بين علامات تنصيص، واسم الأداة، ومن غير حاجاتك الخاصة. دوّر، واكتب رقم النتيجة اللي لقيت فيها الحل (١؟ ٣؟ ١٠؟). وبعدين جرّب نفس الـ query من غير علامات التنصيص وقارن.`,
          flag: "script",
          deep: {
            why: "أغلب المشاكل اللي هتقابلها، حد قابلها قبلك وكتب عنها بالإنجليزي. مهارة البحث بتوصلك له. ومع الـ AI، البحث لسه مهم: الـ AI ممكن يألف، لكن issue على GitHub فيه نفس رسالتك بالظبط ورد من الـ maintainer مصدر أقوى.",
            how: R`إيه اللي تشيله من رسالة الخطأ: المسارات ([[/home/sara/app/src/...]])، وأسماء متغيراتك ([[reading 'products']] ← خليها بس لو مهمة)، والأرقام الخاصة (بورت، ID، timestamp). وإيه اللي تسيبه: كود الخطأ ([[P2002]] و [[TS2322]] و [[EADDRINUSE]])، والجملة الثابتة، واسم الأداة.

كلمات تضيفها للبحث حسب اللي عايزه: [[how to]] (طريقة)، و [[example]] (مثال)، و [[vs]] (مقارنة)، و [[best practice]]، و [[migration guide]] (نقل إصدار)، و [[breaking change]]، و [[workaround]]، و [[docs]] (توديك للمصدر الرسمي)، و [[github issue]].

وافتكر: إصدارات الأدوات بتتغير بسرعة. إجابة من ٢٠١٩ على React أو Next ممكن تكون غلط النهارده. بص على التاريخ دايمًا، واستخدم [[after:]] أو فلتر Tools في Google.`,
            when: "قبل ما تسأل حد، وبعد ما تقرا رسالة الخطأ وتفهمها.",
            mistakes: R`تدوّر بالعربي. وتلصق الـ stack trace كله. وتكتب سؤال طويل بـ grammar صح (مش لازم). وتاخد أول نتيجة من غير ما تبص على تاريخها وإصدارها. وتدوّر باسم متغير خاص بيك ([[reading 'myProducts']]) فمتلاقيش حاجة.`
          },
          teach: R`## الـ query كلمات مش سؤال

قاعدة واحدة: انسخ الجملة **الثابتة** من الخطأ، وشيل الحاجات الخاصة بيك، وضيف اسم الأداة.

---

## الـ operators

دي من وثائق Google للبحث، وبتشتغل في خانة البحث العادية:

| الـ operator | معناه | من المثال |
|---|---|---|
| [["..."]] | الجملة دي بالظبط | [["Cannot read properties of undefined (reading 'map')"]] |
| [[site:]] | في الموقع ده بس | [[site:github.com]] |
| [[-word]] | من غير الكلمة دي | [[-pages]] |
| [[after:]] | بعد التاريخ ده | [[after:2025-01-01]] |
| [[OR]] | يا ده يا ده (بحروف كبيرة) | |

---

## نفك ٣ queries

~~~text
"EADDRINUSE" node kill process port 3000
~~~

كود الخطأ بين علامات + اللي عايز تعمله ([[kill process]]). الـ [[3000]] هنا مقصود لأنه جزء من السؤال.

~~~text
next.js app router "cookies" server action -pages
~~~

[[-pages]] بيشيل نتايج الـ Pages Router القديم.

~~~text
tailwind v4 dark mode after:2025-01-01
~~~

الإصدار ([[v4]]) و [[after:]] عشان متجيلكش إجابات من قبل ما الإصدار ده ينزل.

---

## الغلط والصح

~~~text
Wrong: why my code say cannot read properties of undefined when i use map in my component
Right: "Cannot read properties of undefined (reading 'map')" react useState initial value
~~~

الغلط: سؤال طويل، وكلام خاص بيك ([[my component]])، ومن غير علامات تنصيص. الصح: الجملة الثابتة بالظبط، والأداة، وكلمات السياق ([[useState initial value]]).

---

## الخلاصة

| تسيب | تشيل |
|---|---|
| كود الخطأ ([[P2002]] و [[TS2322]]) | المسارات |
| الجملة الثابتة | أسماء متغيراتك |
| اسم الأداة والإصدار | البورتات والـ IDs |

- بالإنجليزي دايمًا.
- بص على تاريخ النتيجة قبل ما تصدّقها.`,
          lines: [
            R`الجملة الثابتة من خطأ Node بين علامات تنصيص + اسم المكتبة.`,
            R`كود الخطأ + اللي عايز تعمله (تقفل الـ process اللي ماسكة البورت).`,
            R`كود خطأ Prisma (unique constraint) + الـ method.`,
            R`[[-pages]] = من غير نتايج الـ Pages Router القديم.`,
            R`[[site:github.com]] = issues و discussions بس.`,
            R`[[after:]] = نتايج بعد التاريخ ده (الإصدار الجديد).`,
            R`أسماء الإعداد نفسها بين علامات تنصيص.`,
            "غلط: سؤال طويل فيه كلام خاص بيك.",
            "صح: الجملة الثابتة + الأداة + الكلمة اللي بتوصف السياق."
          ],
          sol: R`أمثلة لتحويل:
[[TypeError: Cannot read properties of undefined (reading 'price') at CartItem (/home/me/shop/src/CartItem.tsx:12:30)]]
← [["Cannot read properties of undefined (reading" react props]] أو بـ [['price']] لو عايز. غالبًا أول ٣ نتايج فيها السبب (الـ prop مش مبعوت أو الداتا لسه بتحمّل).

[[Error: P2002 Unique constraint failed on the fields: ($__btemail$__bt)]]
← [[prisma "P2002" unique constraint handle error]].

الفرق مع وبدون علامات التنصيص: من غيرها Google بيدوّر على الكلمات متفرقة، فبتطلعلك نتايج عامة. بيها بتطلعلك صفحات فيها نفس الرسالة بالظبط. لو لقيت الحل في النتيجة ١–٣، الـ query كويس. لو في ١٠ أو ملقتش، قلّل الكلمات أو غيّر اسم الأداة.`
        },
        {
          cmd: "GitHub issues search",
          title: "تدوّر في GitHub issues: is:issue و is:closed و label: و in:title",
          desc: R`لما المشكلة في مكتبة، أحسن مصدر هو الـ issues بتاعتها على GitHub: الـ maintainers بيردوا هناك، والحلول بتبقى للإصدار الحالي، وساعات بتلاقي «ده bug اتصلح في v5.2.1». ومش محتاج Google: خانة البحث في تاب Issues بتقبل qualifiers.

أشهرها: [[is:issue]] أو [[is:pr]]، و [[is:open]] أو [[is:closed]]، و [[label:bug]]، و [[in:title]] (الكلمات في العنوان بس)، و [[author:username]]، و [[sort:updated-desc]] أو [[sort:reactions-+1-desc]] (الأكتر تفاعل)، و [[repo:owner/name]] في البحث العام على github.com/search. وعلامات التنصيص للجملة بالظبط.

اقرا الـ issue صح: العنوان والوصف، وبعدين دوّر على تعليقات الـ maintainers (عليهم علامة Member أو Maintainer أو Collaborator)، وعلى أي PR مربوط ([[linked pull request]] أو [[fixed by #]])، وعلى آخر تعليقات (ممكن حد لاقى workaround).`,
          example: R`is:issue "Failed to resolve import" vite
is:issue is:closed "hydration mismatch" label:bug
is:issue is:open in:title "memory leak"
is:pr is:merged "fix" "useSearchParams"
repo:prisma/prisma is:issue "P2002" sort:reactions-+1-desc
Maintainer: "This is expected behavior. See the docs: ..."
Maintainer: "Fixed in #4521, released in 5.2.1."
User: "Same issue here on v5.2.0. Workaround: pin to 5.1.4 for now."
Bot: "This issue has been automatically marked as stale because it has not had recent activity."`,
          try: R`اختار مكتبة بتستخدمها وخطأ قابلته (أو خد [[Failed to resolve import]] مع vite). دوّر في الـ issues بتاعتها ٣ مرات: بـ [[is:issue is:closed]]، وبـ [[is:issue is:open]]، وبـ [[in:title]]. لكل بحث اكتب: فيه نتيجة مفيدة؟ اتقفل ليه (fixed؟ duplicate؟ stale؟ expected؟)؟`,
          flag: "script",
          deep: {
            why: "المكتبات بتتغير أسرع من Stack Overflow والـ tutorials. الـ issues هي المكان الوحيد اللي هتلاقي فيه «الـ bug ده اتصلح في الإصدار ده» أو «ده سلوك مقصود وده السبب». ومنها كمان بتتعلم إنجليزي الـ maintainers: مختصر ودقيق.",
            how: R`الكلمات اللي هتقابلها في الـ issues: [[repro]] / [[reproduction]]، و [[regression]] (كان شغال وباظ)، و [[expected behavior]] / [[by design]] (مقصود)، و [[duplicate of #]]، و [[stale]] (اتقفل لعدم النشاط)، و [[wontfix]]، و [[upstream]] (المشكلة في مكتبة تانية)، و [[pin to X]] (ثبّت الإصدار ده)، و [[bump]] (رفّع الإصدار)، و [[released in]]، و [[landed in]] (اتدمج في)، و [[canary]] / [[nightly]] / [[beta]] (إصدارات تجريبية)، و [[help wanted]]، و [[good first issue]].

و [[Same issue here]] أو [[+1]] تعليقات بتزعج الـ maintainers: استخدم reaction. ولو عندك معلومة جديدة (إصدار تاني، workaround، repro)، ده التعليق المفيد.

و [[in:title]] مفيد لما الكلمة عامة وبتظهر في تعليقات كتير. و [[sort:reactions-+1-desc]] بيطلعلك المشاكل اللي ناس كتير عندها.`,
            when: "أول ما تشك إن المشكلة من المكتبة مش من كودك، أو بعد ما ترقّي إصدار وحاجة تبوظ.",
            mistakes: R`تفتح issue جديد قبل ما تدوّر في المقفولة. وتقرا أول تعليق وتسيب الباقي (الحل ساعات في آخر تعليق). وتطبّق workaround من سنتين على إصدار جديد. وتفهم [[closed]] إنه «اتحل»: ممكن يكون اتقفل duplicate أو stale أو wontfix.`
          },
          teach: R`## الـ qualifiers: كلمة ونقطتين

| الـ qualifier | معناه |
|---|---|
| [[is:issue]] / [[is:pr]] | issues بس / PRs بس |
| [[is:open]] / [[is:closed]] | مفتوحة / مقفولة |
| [[is:merged]] | PRs اتدمجت |
| [[label:bug]] | عليها label اسمه bug |
| [[in:title]] | الكلمات في العنوان بس |
| [[repo:owner/name]] | في repo معيّن (في بحث github.com العام) |
| [[sort:reactions-+1-desc]] | الأكتر تفاعل بعلامة 👍 الأول |
| [["..."]] | الجملة بالظبط |

---

## جرّبت واحدة بـ gh

[[gh search issues]] بيبحث بنفس الـ qualifiers من الترمنال. دوّرت على الجملة في repo بتاع vite في الـ issues المقفولة (gh 2.97، أكتوبر ٢٠٢٦):

~~~bash
gh search issues '"Failed to resolve import"' --repo vitejs/vite --state closed --limit 3 --json number,title,state
~~~

~~~text الناتج (مختصر)
22929  closed  resolve.tsconfigPaths fails to resolve aliases when the nearest ancestor tsconfig.json excludes the source file
22950  closed  resolve.tsconfigPaths: alias imports from a tsconfig-excluded importer fail only for the first import, later ones resolve
19292  closed  Package exports eg @/pkg/foo not resolved locally
~~~

(في العنوان الأصلي [[@/pkg/foo]] كانت في code formatting.)

النتايج هتتغير مع الوقت، بس لاحظ العناوين: إنجليزي maintainers مختصر ومليان مصطلحات ([[alias]] و [[excludes]] و [[resolve]]).

---

## الردود اللي في المثال

| الرد | معناه | تعمل إيه |
|---|---|---|
| [[This is expected behavior. See the docs]] | مقصود، مش bug | اقرا الـ docs |
| [[Fixed in #4521, released in 5.2.1.]] | اتصلح ونزل | رقّي |
| [[Same issue here on v5.2.0. Workaround: pin to 5.1.4 for now.]] | حل مؤقت | ثبّت الإصدار مؤقتًا |
| [[automatically marked as stale because it has not had recent activity]] | بوت | ممكن يتقفل من غير حل |

[[pin to]] = تثبّت على إصدار. و [[for now]] = دلوقتي ومؤقتًا. و [[recent activity]] = نشاط قريب.

---

## الخلاصة

- دوّر في المقفولة الأول ([[is:closed]]).
- [[closed]] مش دايمًا «اتحل»: ممكن duplicate أو stale أو not planned.
- اقرا تعليقات الـ maintainers وآخر تعليق.`,
          lines: [
            R`issues بس + الجملة بالظبط + اسم الأداة.`,
            R`المقفولة + label bug: غالبًا فيها الحل أو الإصدار اللي صلحه.`,
            R`المفتوحة + الكلمات في العنوان بس.`,
            R`PRs اتدمجت فيها fix و useSearchParams: تعرف اتصلح إمتى.`,
            R`في repo معين + ترتيب بالأكتر تفاعل.`,
            R`رد maintainer: «ده سلوك متوقع، شوف الـ docs». يعني مش bug.`,
            R`رد maintainer: «اتصلح في PR رقم كذا، ونزل في 5.2.1». رقّي.`,
            R`يوزر: «نفس المشكلة على 5.2.0. حل مؤقت: ثبّت على 5.1.4 دلوقتي». pin = تثبّت.`,
            R`bot: «اتعلّم stale لأن مفيش نشاط قريب». يعني ممكن يتقفل من غير حل.`
          ],
          sol: R`النتايج بتختلف حسب المكتبة، بس المفروض تلاقي نمط زي كده:
[[is:issue is:closed]]: issues فيها [[Fixed in #...]] أو [[Closed as completed]] ← شوف الإصدار وقارن بإصدارك ([[npm ls vite]]).
[[is:issue is:open]]: مشاكل لسه مفتوحة، ساعات فيها workaround في التعليقات.
[[in:title]]: نتايج أقل وأدق.

وأسباب القفل اللي هتشوفها في GitHub: [[completed]] (اتحل)، و [[not planned]] (مش هيتعمل: غالبًا wontfix أو stale)، وساعات [[duplicate]]. والـ labels والتعليق الأخير بيوضحوا السبب.

لو ملقتش حاجة خالص، جرّب كلمات أقل، أو ابحث بكود الخطأ بس، أو ابحث في الـ Discussions. ولو متأكد إنه جديد: درس «issue لمشروع open source».`
        },
        {
          cmd: "Stack Overflow بعين ناقدة",
          title: "تقرا إجابة Stack Overflow بعين ناقدة: التاريخ والإصدار والتعليقات",
          desc: R`Stack Overflow لسه فيه إجابات ممتازة لمشاكل كتير، بس فيه كمان إجابات قديمة كانت صح في ٢٠١٥ وبقت غلط أو خطر النهارده. القراية الناقدة = تسأل ٥ أسئلة قبل ما تنسخ أي كود:

١) الإجابة تاريخها إيه، واتعدلت إمتى؟ ٢) الإصدار اللي بتتكلم عنه زي بتاعك؟ ٣) التعليقات تحتها بتقول إيه؟ (هنا بتلاقي «this is deprecated» أو «doesn't work anymore»). ٤) فيه إجابة تانية أحدث تحت؟ (الترتيب الافتراضي بالـ score، والإجابة الـ accepted مبقتش متثبتة فوق من ٢٠٢١، فالأحسن ممكن يبقى تاني أو تالت). ٥) أنا فاهم الكود ده بيعمل إيه؟ لو لأ، متنسخوش.`,
          example: R`Question: How do I make an HTTP request in Node.js?
Answer (2013, score 900): Use the request module: npm install request
Comment (2020): request has been deprecated. See https://github.com/request/request/issues/3142
Answer (2023, score 150): Node 18+ has fetch built in: const res = await fetch(url);
Comment: This works in Node 18+. For older versions, use node-fetch.
Red flags: "just use --force", "disable SSL verification", "chmod 777", "it works for me"
Good signs: explains why, links to docs, mentions the version, has a recent edit`,
          try: R`دوّر على Stack Overflow على سؤال عن [[how to deep clone an object in javascript]]. اقرا أعلى ٣ إجابات بالـ ٥ أسئلة. اكتب: أنهي إجابة هتستخدم النهارده، وليه (تلميح: دوّر على [[structuredClone]])، وأنهي إجابة كانت صح زمان ومبقتش الأحسن.`,
          flag: "script",
          deep: {
            why: "النسخ من غير فهم بيجيب bugs وثغرات أمان. وأخطر الإجابات هي اللي بتحل المشكلة بسرعة بطريقة غلط: تقفل SSL، أو تدّي صلاحيات 777، أو [[--force]]. القراية الناقدة بتحميك، وبتعلمك إنجليزي تقني حقيقي من التعليقات والنقاشات.",
            how: R`كلمات هتقابلها: [[deprecated]] و [[outdated]] (قديم)، و [[as of v18]] (من أول إصدار كذا)، و [[this no longer works]]، و [[edit:]] / [[update:]] (الكاتب زوّد حاجة بعدين)، و [[caveat]] (عيب لازم تعرفه)، و [[this is a hack]] (حل مش نضيف)، و [[this is an anti-pattern]] (أسلوب غلط)، و [[footgun]] (حاجة سهل تأذي بيها نفسك)، و [[TL;DR]]، و [[possible duplicate of]].

علامات الخطر: [[just use --force]]، و [[set rejectUnauthorized: false]] أو [[NODE_TLS_REJECT_UNAUTHORIZED=0]] (بيقفل التحقق من الشهادات)، و [[chmod 777]]، و [[sudo npm install]]، و [[eval]]، و [[it works for me]] من غير شرح.

والإجابة الكويسة بتشرح ليه، وبتلينك الـ docs، وبتقول الإصدار، وساعات بتقول «ده مش مناسب لو...».`,
            when: "كل مرة تفتح Stack Overflow أو أي blog أو إجابة AI.",
            mistakes: R`تنسخ الإجابة الـ accepted على طول. وتتجاهل التعليقات. وتطبّق حل jQuery من ٢٠١٢ في React. وتصدّق إن الـ score العالي = صح النهارده (الـ score اتجمع على سنين).`
          },
          teach: R`## المثال قصة إجابة اتقدمت

| السطر | اللي بيقوله | السؤال اللي بيجاوبه |
|---|---|---|
| [[Answer (2013, score 900): Use the request module]] | إجابة قديمة بـ score عالي | التاريخ؟ |
| [[Comment (2020): request has been deprecated.]] | التعليق بيقول إنها قدمت | التعليقات بتقول إيه؟ |
| [[Answer (2023, score 150): Node 18+ has fetch built in]] | إجابة أحدث تحت | فيه إجابة أحدث؟ |
| [[Comment: This works in Node 18+. For older versions, use node-fetch.]] | الإصدار | الإصدار زي بتاعي؟ |

[[built in]] = مدمج. و [[18+]] = ١٨ أو أحدث. والـ deprecation ده حقيقي: شفناه بنفسنا في درس «deprecated / invalid / required» ([[npm warn deprecated request@2.88.2: request has been deprecated]]).

---

## نجرّب سؤال الـ try

أشهر إجابة قديمة لـ deep clone هي [[JSON.parse(JSON.stringify(obj))]]. جرّبتها في Node 22 على object فيه Date و undefined و Map، وقارنتها بـ [[structuredClone]]:

طبعت لكل نسخة ٣ حاجات: نوع الـ Date بعد النسخ، وهل المفتاح اللي قيمته undefined لسه موجود، والـ Map:

~~~text الناتج
string false {}
true true Map(1) { 1 => 2 }
~~~

السطر الأول JSON والتاني [[structuredClone]].

يعني الطريقة القديمة حوّلت الـ Date لنص، وشالت الـ undefined، وفضّت الـ Map. ولما جربت [[structuredClone]] على object فيه دالة:

~~~text الناتج
DataCloneError: f(){} could not be cloned.
~~~

ده الـ caveat بتاعه: مبينسخش الدوال.

---

## علامات الخطر والعلامات الكويسة

| خطر | ليه |
|---|---|
| [[just use --force]] | بيخبّي المشكلة |
| [[disable SSL verification]] | بيقفل حماية الاتصال |
| [[chmod 777]] | أي حد يقرا ويكتب وينفّذ |
| [[it works for me]] | من غير شرح |

والكويسة: [[explains why]] و [[links to docs]] و [[mentions the version]] و [[has a recent edit]].

---

## الخلاصة

- ٥ أسئلة: التاريخ، والإصدار، والتعليقات، وفيه أحدث، وفاهم الكود؟
- الـ score اتجمع على سنين، والـ accepted مش متثبتة فوق من ٢٠٢١.
- [[deprecated]] و [[as of]] و [[no longer works]] في التعليقات = وقف.`,
          lines: [
            R`السؤال: «أعمل HTTP request في Node إزاي؟»`,
            R`إجابة قديمة بـ score عالي: استخدم مكتبة request.`,
            R`تعليق: «request اتعملها deprecate». ده اللي شفناه في npm بنفسنا في المستوى ١.`,
            R`إجابة أحدث بـ score أقل: Node 18 فيه fetch مدمج. دي الأصح النهارده.`,
            R`تعليق بيحدد الإصدار: «شغال في 18 وفوق، وللأقدم استخدم node-fetch».`,
            R`علامات خطر: «استخدم --force بس»، «اقفل التحقق من SSL»، «chmod 777»، «شغالة عندي».`,
            R`علامات كويسة: بتشرح ليه، ولينك docs، والإصدار، وتعديل قريب.`
          ],
          sol: R`اللي هتلاقيه تقريبًا: إجابات قديمة بـ score عالي بتقترح [[JSON.parse(JSON.stringify(obj))]] (بيضيّع [[Date]] و [[undefined]] و [[Map]] والدوال)، أو [[_.cloneDeep]] من lodash، أو recursive function مكتوبة بإيد. وإجابة أحدث (أو تعديل) بتقول إن [[structuredClone(obj)]] مدمج في المتصفحات الحديثة و Node 17+.

الاختيار النهارده: [[structuredClone]]، لأنه مدمج ومبيحتاجش مكتبة وبيحافظ على Date و Map و Set. والـ caveat: مبينسخش الدوال ولا DOM nodes. [[JSON.parse(JSON.stringify())]] كانت الحل المشهور زمان، ولسه بتنفع لـ JSON بسيط بس.

لو اخترت الإجابة الأعلى score من غير ما تقرا التعليقات، غالبًا فاتك الـ caveat ده.`
        }
      ]
    },
    {
      t: "AI يساعدك متعتمدش عليه",
      l: 3,
      n: "تستخدم الـ AI يشرحلك ويصحّحلك ويعلّمك، مش يكتب بدالك ويترجم وخلاص",
      items: [
        {
          cmd: "AI يشرح مش يترجم",
          title: "تخلي الـ AI يشرح الإنجليزي مش يترجمه: prompts للتعلم",
          desc: R`لو كل مرة تشوف فقرة صعبة تقول للـ AI «ترجم»، هتفهم الفقرة دي وبس، وبعد سنة إنجليزيتك زي ما هي. الطريقة التانية: تخليه «مدرّس» يشرح الكلمات الصعبة، ويبسّط الإنجليزي بالإنجليزي، ويسألك أسئلة.

القاعدة: اطلب شرح الكلمة في سياقها (مش ترجمة قاموس)، واطلب نسخة إنجليزي أبسط بدل ترجمة عربي، واطلب منه يسألك يتأكد إنك فهمت. وفي الآخر، اكتب الكلمات الجديدة في [[words.md]] بنفسك. ده الجزء اللي بيخليك تتعلم.

وخلي بالك إن الـ AI ممكن يغلط في حقائق تقنية (إصدار أو API)، فالمعلومة التقنية تتأكد منها من الـ docs. التفاصيل في درس [[تتحقق من الناتج]] في «تاب الذكاء الاصطناعي».`,
          example: R`Explain the words "idempotent" and "side effect" as they are used in this paragraph. Use simple English, then one Arabic word for each.
Rewrite this paragraph in simple English (A2 level). Keep all technical terms in English.
Don't translate. Ask me 3 questions to check that I understood this paragraph.
List the 5 most useful words in this text for a junior developer, with an example sentence for each.
What does "take precedence over" mean here? Give me two more examples from real docs.
I think this sentence means: "..."  Am I right? If not, explain what I missed.`,
          try: R`خد فقرة من docs صعبة عليك (مثلًا أول فقرتين من صفحة [[Idempotent]] على MDN). استخدم ٣ prompts من المثال بالترتيب: بسّطها، وبعدين يسألك ٣ أسئلة، وبعدين اكتب فهمك وخليه يصححه. اكتب في [[words.md]] الكلمات اللي اتعلمتها ومعاها الجملة الأصلية.`,
          flag: "script",
          deep: {
            why: R`الترجمة بتحل مشكلة النهارده. الشرح والأسئلة بيحلوا مشكلة السنة الجاية. والـ AI أحسن مدرّس لغة متاح: صبور، ومتاح ٢٤ ساعة، وبيعرف السياق التقني. بس لازم انت اللي تقود.`,
            how: R`prompts بتنفع:
[[Rewrite this in simple English]] ← إنجليزي أبسط بدل عربي: بتفضل تقرا إنجليزي.
[[Explain X as it is used here]] ← المعنى في السياق ده (resolve في Promise غير resolve في DNS).
[[Ask me questions to check I understood]] ← بيقلب الدور: انت اللي بتجاوب.
[[I think this means ... Am I right?]] ← أقوى واحد: بتفكر الأول وبعدين تتأكد.
[[Give me more examples from real docs]] ← الكلمة بتثبت لما تشوفها في كذا جملة.
[[Don't give me the answer, give me a hint]] ← للمسائل والأكواد.

وبعد كل جلسة: اكتب ٣–٥ كلمات في [[words.md]] بإيدك. لو الـ AI كتبهم هو، مش هيتحفظوا.

وفي الشغل: متلصقش كود الشركة أو بيانات عملاء أو secrets في أي AI من غير ما تعرف سياسة الشركة (درس [[context من غير أسرار]] في «تاب الذكاء الاصطناعي»).`,
            when: "لما فقرة أو صفحة بتوقفك أكتر من ٥ دقايق. مش لكل جملة: خلي الـ skimming (المستوى ١) هو الأساس.",
            mistakes: R`[[Translate to Arabic]] لكل حاجة. وتقبل الشرح من غير ما تتأكد إنك فهمت (اطلب أسئلة). وتتعلم كلمة وتنساها لأنك مكتبتهاش. وتصدّق حقيقة تقنية من الـ AI من غير docs (خصوصًا الإصدارات والـ APIs الجديدة).`
          },
          teach: R`## ٦ prompts، كل واحد بيعمل حاجة مختلفة

| الـ prompt | بيعمل إيه | ليه أحسن من «ترجم» |
|---|---|---|
| [[Explain the words ... as they are used in this paragraph.]] | معنى الكلمة في السياق ده | [[resolve]] في Promise غير في DNS |
| [[Rewrite this paragraph in simple English (A2 level).]] | إنجليزي أبسط | بتفضل تقرا إنجليزي |
| [[Don't translate. Ask me 3 questions ...]] | يسألك انت | انت اللي بتفكر |
| [[List the 5 most useful words ...]] | يختار الكلمات المهمة | قايمة تحطها في [[words.md]] |
| [[What does "take precedence over" mean here? Give me two more examples ...]] | أمثلة كمان | الكلمة بتثبت من كذا جملة |
| [[I think this sentence means: "..." Am I right?]] | تتأكد من فهمك | **الأقوى**: بتفكر الأول |

---

## كلمات في الـ prompts

- [[as they are used]] = «زي ما هي مستخدمة» (في الفقرة دي بالذات).
- [[A2 level]]: مستويات CEFR من A1 (مبتدئ) لـ C2. و A2 = بسيط جدًا.
- [[Keep all technical terms in English]] = سيب المصطلحات زي ما هي.
- [[to check that I understood]] = عشان تتأكد إني فهمت.
- [[If not, explain what I missed]] = لو لأ، اشرحلي فاتني إيه.

---

## مثال: idempotent

الكلمة دي في الـ try. ومعناها الحقيقي من MDN و RFC 9110: طلب تكراره كذا مرة ليه **نفس التأثير** على السيرفر زي مرة واحدة. يعني [[DELETE]] idempotent حتى لو الرد التاني 404، لأن التأثير (الحاجة ممسوحة) واحد. لو الـ AI قالك حاجة مختلفة، الـ docs هي اللي تحكم.

---

## الخلاصة

- اطلب شرح وأسئلة، مش ترجمة.
- اكتب الكلمات في [[words.md]] بإيدك.
- المعلومة التقنية تتأكد من الـ docs، ومتلصقش كود الشركة أو أسرار.`,
          lines: [
            R`«اشرح الكلمتين دول زي ما هما مستخدمين في الفقرة دي، بإنجليزي بسيط، وبعدين كلمة عربي لكل واحدة».`,
            R`«اكتب الفقرة دي بإنجليزي بسيط (مستوى A2). سيب المصطلحات التقنية زي ما هي».`,
            R`«متترجمش. اسألني ٣ أسئلة تتأكد إني فهمت».`,
            R`«طلّع أهم ٥ كلمات في النص لمطور junior، مع جملة لكل واحدة».`,
            R`«take precedence over معناها إيه هنا؟ اديني مثالين كمان من docs حقيقية».`,
            R`«أنا فاهم الجملة دي كده: ... صح؟ لو لأ، اشرحلي فاتني إيه». الأقوى.`
          ],
          sol: R`النتيجة المتوقعة: نسخة مبسّطة زي [[A method is idempotent if calling it many times has the same effect on the server as calling it once.]] وأسئلة زي [[Is POST idempotent? Why or why not?]] و [[Is DELETE idempotent even if the second call returns 404?]].

إجاباتك الصح: POST مش idempotent (كل طلب ممكن يعمل حاجة جديدة). و DELETE idempotent لأن التأثير على السيرفر واحد (الحاجة ممسوحة)، حتى لو الرد اتغير (200 بعدين 404). الفكرة إن idempotent عن التأثير (effect) مش عن الرد.

و [[words.md]] المفروض يبقى فيه حاجة زي: [[idempotent = same effect if you repeat it — "All safe methods are idempotent, as well as PUT and DELETE" (MDN)]]. لو الـ AI قالك حاجة عن HTTP مش متأكد منها، ارجع لـ MDN أو RFC 9110.`
        },
        {
          cmd: "تصحيح كتابتك",
          title: "تكتب انت الأول، وبعدين الـ AI يصحح ويشرح الغلط (مش يكتب بدالك)",
          desc: R`الغلطة الأشهر: تقول للـ AI «اكتبلي commit message» أو «اكتبلي إيميل للعميل»، وتنسخ. كده الرسالة حلوة، بس انت متعلمتش حاجة، وفي الانترفيو أو المكالمة مش هيبقى معاك.

الطريقة الصح (وهي نفس فكرة درس [[تكتب بإيدك الأول]] في «تاب الذكاء الاصطناعي»): اكتب انت المسودة بإنجليزيتك مهما كانت. وبعدين اطلب تصحيح مع شرح كل غلطة. وبعدين اكتب النسخة النهائية بإيدك (مش copy). وفي الآخر، حط الغلطات المتكررة في [[mistakes.md]].

بعد شهر هتلاحظ إن نفس الغلطات بتتكرر (الـ s، و a/an، و since/for). دي «قايمتك الشخصية»، وهي أهم من أي كتاب grammar.`,
          example: R`My draft: "Hi, I am working in the bug since yesterday, the problem is the API return 500 when user dont send the email."
Prompt: Correct my English. Show each mistake, the correction, and a one-line reason. Keep my style; don't make it longer.
AI: "working in" -> "working on" (we work ON a task)
AI: "since yesterday" -> OK, but use "I've been working on it since yesterday" (present perfect continuous)
AI: "the API return" -> "the API returns" (third person -s)
AI: "when user dont send" -> "when the user doesn't send" (article + doesn't)
Final (typed by me): "Hi, I've been working on the bug since yesterday. The API returns 500 when the user doesn't send the email."
mistakes.md: working in -> working on | API return -> API returns | dont -> doesn't`,
          try: R`اكتب ٣ حاجات بإنجليزيتك من غير أي مساعدة: commit message، ورسالة Slack بتطلب مساعدة، و standup. وبعدين استخدم الـ prompt اللي في المثال على كل واحدة. اكتب النسخة الصح بإيدك، وحط كل غلطة في [[mistakes.md]]. بعد أسبوع اعمل نفس الحاجة وشوف: فيه غلطات اتكررت؟`,
          flag: "script",
          deep: {
            why: "التعلم بيحصل لما تغلط وتشوف الصح جنب الغلط وتفهم ليه. لما الـ AI يكتب بدالك، مفيش غلط ومفيش تعلم. ولما يصحح مع السبب، كل رسالة بتبقى درس صغير عن غلطاتك انت بالظبط.",
            how: R`الـ prompt المهم: [[Correct my English. Show each mistake, the correction, and a one-line reason. Keep my style; don't make it longer.]]

ليه [[Keep my style; don't make it longer]]؟ لأن الـ AI بيحب يعيد الكتابة بأسلوبه الطويل الرسمي ([[I hope this message finds you well]])، فالرسالة متبقاش بتاعتك وبتبان «AI». عايز تصحيح، مش إعادة كتابة.

prompts تانية مفيدة:
[[Is this natural English for a Slack message to a teammate?]]
[[Make this more polite but keep it short.]]
[[What would a native speaker write instead of "..."?]]
[[Give me 3 ways to say "..." from casual to formal.]]

و [[mistakes.md]] بالشكل ده: [[غلط -> صح | سبب قصير]]. وكل أسبوع اقراه مرة، واختار غلطة واحدة تركز عليها الأسبوع ده.`,
            when: "كل رسالة مهمة في أول ٣ شهور. وبعدين للرسايل الرسمية بس (عميل، CV، انترفيو)، ومع الوقت هتلاقي نفسك مش محتاجه.",
            mistakes: R`تنسخ النسخة المصححة بـ Ctrl+C بدل ما تكتبها. وتطلب [[make it professional]] فيرجعلك إيميل ٣ أضعاف الطول. وتتجاهل الشرح وتاخد الناتج بس. وتصحح كل حاجة بما فيها Slack العادي مع زمايلك: الرسايل السريعة مش محتاجة كمال.`
          },
          teach: R`## المثال دورة كاملة: مسودة، تصحيح، نسخة نهائية

### المسودة

~~~text
Hi, I am working in the bug since yesterday, the problem is the API return 500 when user dont send the email.
~~~

### الـ prompt

~~~text
Correct my English. Show each mistake, the correction, and a one-line reason. Keep my style; don't make it longer.
~~~

| الحتة | ليه موجودة |
|---|---|
| [[Show each mistake]] | عايز تشوف الغلط، مش نسخة جديدة وخلاص |
| [[a one-line reason]] | السبب هو اللي بيعلّم |
| [[Keep my style; don't make it longer.]] | من غيرها الـ AI بيكتب إيميل رسمي ٣ أضعاف |

### التصحيحات

| الغلط | الصح | القاعدة |
|---|---|---|
| [[working in the bug]] | [[working on the bug]] | بنشتغل **on** حاجة |
| [[I am working ... since yesterday]] | [[I've been working ... since yesterday]] | حاجة بدأت ولسه مستمرة = [[have been + ing]] |
| [[the API return]] | [[the API returns]] | فاعل مفرد = s |
| [[when user dont send]] | [[when the user doesn't send]] | [[the]] قبل الاسم، و [[doesn't]] بالـ apostrophe |

ولاحظ إن الجملة الأصلية جملتين ملزوقين بفاصلة: النسخة النهائية فصلتهم بنقطة.

### النسخة النهائية (مكتوبة باليد)

~~~text
Hi, I've been working on the bug since yesterday. The API returns 500 when the user doesn't send the email.
~~~

### mistakes.md

~~~text
working in -> working on | API return -> API returns | dont -> doesn't
~~~

---

## الخلاصة

- انت تكتب الأول، والـ AI يصحح ويشرح.
- النسخة النهائية بإيدك مش Ctrl+C.
- الغلطة اللي بتتكرر في [[mistakes.md]] هي موضوع الأسبوع الجاي.`,
          lines: [
            R`المسودة بإنجليزيتك: فيها ٤ غلطات.`,
            R`الـ prompt: «صحح، ووريني كل غلطة والتصحيح وسبب في سطر، وخلّي أسلوبي ومتطوّلش».`,
            R`working in ← working on.`,
            R`since yesterday صح، بس مع present perfect continuous.`,
            R`the API return ← returns (الـ s).`,
            R`user dont ← the user doesn't.`,
            R`النسخة النهائية كتبتها بإيدك.`,
            R`اللي اتسجل في mistakes.md.`
          ],
          sol: R`مثال على ناتج أسبوع:
commit: [[fixed the login bug that make user cant enter]] ← [[fix(auth): allow login with uppercase emails]] | الغلطات: ماضي بدل imperative، و [[make]] ← [[makes]]، و [[cant enter]] ← [[can't log in]] (ومش محدد).
Slack: [[can you explain me how the deploy work]] ← [[Can you explain how the deploy works?]] | [[explain me]] و [[works]].
standup: [[yesterday I work on the cart]] ← [[Yesterday I worked on the cart]] | ماضي.

[[mistakes.md]] بعد أسبوع:
[[explain me -> explain to me | explain + something + to someone]]
[[the deploy work -> the deploy works | third person -s]]
[[yesterday I work -> worked | past tense]]

لو لاحظت إن الـ s اتكررت ٣ مرات: دي غلطة الأسبوع اللي جاي. ركّز عليها في كل رسالة.`
        }
      ]
    },
    {
      t: "نصوص أصعب: changelogs و specs وجمل طويلة",
      l: 3,
      n: "تقرا release notes و migration guide، وتفهم MUST و SHOULD في الـ RFCs والمواصفات، وتفك الجملة الطويلة لأجزاء",
      items: [
        {
          cmd: "changelog و release notes",
          title: "تقرا changelog و release notes: Breaking changes و Deprecated و Migration guide",
          desc: R`قبل ما ترقّي أي مكتبة لإصدار جديد، لازم تقرا الـ changelog أو الـ release notes. ده المكان اللي بيقولك إيه اتغير، وإيه اللي هيكسر كودك.

فيه شكل مشهور اسمه Keep a Changelog بيقسّم كل إصدار لأقسام ثابتة: [[Added]] حاجات جديدة، و [[Changed]] حاجات اتغيرت، و [[Deprecated]] هتتشال قريب، و [[Removed]] اتشالت، و [[Fixed]] bugs اتصلحت، و [[Security]] ثغرات اتقفلت. وأغلب المكتبات الكبيرة عندها صفحة [[Upgrade guide]] أو [[Migration guide]] للإصدارات الكبيرة (major).

والإصدار نفسه بيقولك حاجة (semver): [[MAJOR.MINOR.PATCH]]. الـ MAJOR (من 4 لـ 5) = فيه breaking changes. الـ MINOR (من 5.1 لـ 5.2) = features جديدة ومفيش كسر. الـ PATCH (من 5.2.0 لـ 5.2.1) = bug fixes بس.`,
          example: R`## [5.0.0] - 2026-08-12
### Breaking changes
- Dropped support for Node 18. Node 20 or later is now required.
- $__btcreateClient()$__bt no longer accepts a URL string; pass $__bt{ url }$__bt instead.
### Added
- Retry options for network errors.
### Deprecated
- $__btclient.query()$__bt is deprecated in favor of $__btclient.execute()$__bt and will be removed in 6.0.
### Fixed
- Connections are now closed correctly on shutdown (#812).
### Security
- Headers containing CRLF are rejected.`,
          try: R`افتح صفحة الـ Releases لمكتبة بتستخدمها على GitHub (أو ملف [[CHANGELOG.md]])، واختار آخر إصدار major. اقرا قسم الـ breaking changes، ولكل واحد اكتب: إيه اتغير، وهل يأثر على كودك، ولو آه هتغيّر إيه. استخدم [[npm ls <package>]] عشان تعرف إصدارك.`,
          flag: "script",
          deep: {
            why: R`أغلب مصايب «رقّيت المكتبة والمشروع باظ» سببها إن حد مقراش الـ breaking changes. وقراية changelog بتاخد ٥ دقايق وبتوفر يوم. وكمان لما تعرف [[semver]]، هتفهم ليه [[^5.2.0]] في package.json بيسمح بـ 5.9 بس مش 6.0.`,
            how: R`كلمات الـ changelogs: [[dropped support for]] = وقف دعم، و [[now required]] = بقى لازم، و [[no longer]] = مبقاش، و [[in favor of]] = لصالح (البديل)، و [[will be removed in]] = هيتشال في، و [[renamed X to Y]]، و [[moved to]]، و [[now defaults to]] = القيمة الافتراضية اتغيرت (خطيرة وساكتة!)، و [[opt-in]] = لازم تفعّلها بنفسك، و [[opt-out]] = شغالة وتقدر تقفلها، و [[behind a flag]] = محتاجة flag، و [[stable]] = بقت ثابتة بعد ما كانت تجريبية، و [[codemod]] = سكربت بيعدّل كودك أوتوماتيك للإصدار الجديد.

وفي release notes بتاعة Node مثلًا هتلاقي [[Notable changes]] (أهم التغييرات) و [[semver-major]] على التغييرات الكاسرة.

الترتيب الصح للترقية: اقرا الـ breaking changes → دوّر في كودك على الحاجات دي (Ctrl+Shift+F) → شوف فيه codemod → رقّي → شغّل الاختبارات.`,
            when: "قبل أي ترقية major، ولما Dependabot أو Renovate يفتحلك PR، ولما حاجة تبوظ بعد [[npm update]].",
            mistakes: R`ترقّي من 4 لـ 6 مرة واحدة من غير ما تقرا 5. وتعدّي [[now defaults to]] لأنها مش في Breaking. وتفهم [[Deprecated]] إنها اتشالت (لأ، لسه شغالة، بس ابدأ انقل). وتقرا الـ changelog بتاع main بدل بتاع الإصدار اللي هتنزله.`
          },
          teach: R`## الـ changelog ده إصدار major، وكل قسم ليه معنى

~~~text
## [5.0.0] - 2026-08-12
~~~

[[5.0.0]] = MAJOR.MINOR.PATCH. الرقم الأول اتغيّر (من 4 لـ 5)، يعني **فيه breaking changes**. والتاريخ بصيغة [[YYYY-MM-DD]].

| القسم | معناه | تعمل إيه |
|---|---|---|
| [[### Breaking changes]] | هيكسر كودك | اقراه كله قبل الترقية |
| [[### Added]] | جديد | اختياري |
| [[### Deprecated]] | لسه شغال وهيتشال | خطط تنقل |
| [[### Fixed]] | bug اتصلح | |
| [[### Security]] | ثغرة اتقفلت | رقّي بسرعة |

---

## الجمل حتة حتة

| الجملة | الكلمة المفتاح | معناها |
|---|---|---|
| [[Dropped support for Node 18. Node 20 or later is now required.]] | [[dropped support for]] و [[now required]] | وقفوا دعم 18، و 20 بقى لازم |
| [[createClient() no longer accepts a URL string; pass { url } instead.]] | [[no longer]] و [[instead]] | مبقاش بيقبل string، ابعت object |
| [[client.query() is deprecated in favor of client.execute() and will be removed in 6.0.]] | [[in favor of]] و [[will be removed in]] | البديل، وإمتى هيتشال |
| [[Connections are now closed correctly on shutdown (#812).]] | [[are now closed]] | passive، اتصلح |
| [[Headers containing CRLF are rejected.]] | [[containing]] | اللي فيها CRLF (سطر جديد) بتترفض |

---

## semver و [[^]]

[[^5.2.0]] في [[package.json]] معناها «أي 5.x أحدث من أو يساوي 5.2.0». اتأكدت بمكتبة [[semver]] في Node:

~~~text الناتج
5.9.0 true
6.0.0 false
5.1.0 false
~~~

يعني [[npm update]] عمره ما هيرقّيك لـ 6 لوحده. الترقية لـ major قرار انت بتاخده، وعشان كده بتقرا الـ changelog.

---

## الخلاصة

- الرقم الأول اتغير؟ اقرا Breaking changes.
- [[Deprecated]] = لسه شغال، و [[Removed]] = اتشال.
- [[now defaults to]] خطيرة وساكتة: سلوك اتغير من غير ما كودك يتغير.`,
          lines: [
            R`«وقفنا دعم Node 18. لازم Node 20 أو أحدث».`,
            R`«createClient مبقتش بتقبل URL كـ string؛ ابعت object فيه url بدلها». لازم تعدّل كودك.`,
            R`«إعدادات retry لأخطاء الشبكة». جديد.`,
            R`«query هتتشال لصالح execute، وهتتشال فعلًا في 6.0». ابدأ انقل.`,
            R`«الاتصالات بتتقفل صح وقت الإيقاف». bug اتصلح ورقم الـ issue.`,
            R`«الـ headers اللي فيها CRLF بتترفض». ثغرة اتقفلت.`
          ],
          sol: R`شكل الإجابة الصح لكل breaking change:
[[Dropped support for Node 18]] ← إيه اتغير: لازم Node 20+. يأثر؟ [[node -v]] عندي 22، والسيرفر؟ لو 18 لازم يترقّى الأول.
[[createClient() no longer accepts a URL string]] ← دوّرت بـ Ctrl+Shift+F على [[createClient(]] ولقيت ٢ مكان بيبعتوا string ← هغيّرهم لـ [[createClient({ url })]].
[[client.query() is deprecated]] ← مش هيكسر دلوقتي، بس هعمل issue عشان ننقل لـ [[execute()]] قبل 6.0.

لو المكتبة عندها Migration guide، لازم تلاقي فيه أمثلة before/after للكود. ولو فيه [[codemod]]، ده بيوفر وقت (بس راجع الـ diff بتاعه).`
        },
        {
          cmd: "RFC و spec",
          title: "تقرا RFC أو spec: MUST و SHOULD و MAY بحروف كبيرة، و «when, and only when»",
          desc: R`المواصفات الرسمية (RFCs بتاعة الإنترنت زي HTTP، ومواصفات زي Conventional Commits و semver و OpenAPI) بتتكتب بإنجليزي دقيق جدًا، وبتستخدم كلمات بحروف كبيرة ليها معنى قانوني تقريبًا.

الكلمات دي متعرّفة في RFC 2119 و RFC 8174 (مع بعض اسمهم BCP 14): [[MUST]] / [[REQUIRED]] / [[SHALL]] = إجباري تمامًا، و [[MUST NOT]] / [[SHALL NOT]] = ممنوع تمامًا، و [[SHOULD]] / [[RECOMMENDED]] = المفروض، إلا لو عندك سبب قوي وفاهم العواقب، و [[SHOULD NOT]] / [[NOT RECOMMENDED]] = المفروض لأ بنفس المنطق، و [[MAY]] / [[OPTIONAL]] = اختياري فعلًا.

و RFC 8174 وضّح إن المعنى الخاص ده للكلمات لما تكون بحروف كبيرة بس. عشان كده المواصفات الحديثة بتبدأ بجملة ثابتة فيها [[when, and only when, they appear in all capitals]].`,
          example: R`The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all capitals, as shown here.
Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.
A request method is considered "idempotent" if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.`,
          try: R`اقرا الجملة التانية (من مواصفة Conventional Commits) وقسّمها: إيه الإجباري؟ إيه الاختياري؟ وبعدين اكتب ٣ commit messages: واحد بيحقق كل حاجة، وواحد بيكسر MUST، وواحد بيستخدم كل الحاجات الـ OPTIONAL. وبعدين اقرا الجملة التالتة (من RFC 9110 عن HTTP) وقول بجملتك: ليه PUT idempotent و POST لأ؟`,
          flag: "script",
          deep: {
            why: R`المواصفات هي «الحقيقة الأصلية» اللي الأدوات والمكتبات مبنية عليها. لما تختلف مع حد في الانترفيو أو الـ review على «هل PUT المفروض يبقى idempotent؟»، الإجابة في الـ RFC. ومعرفة MUST/SHOULD بتخليك تعرف أنهي قاعدة مرنة وأنهي لأ.`,
            how: R`طريقة قراية الجملة الطويلة في المواصفات: ١) دوّر على الكلمة الكبيرة (MUST أو SHOULD). ٢) اللي قبلها = مين (الفاعل: [[A server]]، [[The client]]، [[Commits]]). ٣) اللي بعدها = يعمل إيه. ٤) أي [[if]] أو [[unless]] أو [[when]] = الشرط.

الجملة المشهورة [[when, and only when, they appear in all capitals]] = «لما، ولما بس، تكون بحروف كبيرة». يعني [[should]] الصغيرة في نفس المستند مجرد كلمة عادية.

كلمات المواصفات: [[is considered]] = يُعتبر، و [[intended effect]] = التأثير المقصود، و [[identical]] = متطابق، و [[such]] = زي ده، و [[consists of]] = بيتكون من، و [[terminal]] هنا = في الآخر (مش terminal الأوامر!)، و [[prefixed with]] = قبله، و [[interpreted as]] = يتفهم على إنه.

و [[terminal colon and space]] = «نقطتين ومسافة في الآخر» (بعد النوع). مثال حلو إن نفس الكلمة (terminal) ليها معنى تاني خالص في سياق تاني.`,
            when: "لما تحتاج إجابة نهائية على سؤال تقني عن بروتوكول أو مواصفة، أو تبني حاجة لازم تتوافق معاها (API، أو parser، أو أداة).",
            mistakes: R`تعامل SHOULD زي MUST (فتعقّد حاجات من غير داعي)، أو زي MAY (فتكسر توقعات ناس تانية). وتقرا RFC قديم اتلغى: RFC 7231 مثلًا اتحل محله RFC 9110 لـ HTTP. أول الصفحة بيقولك [[Obsoletes]] و [[Obsoleted by]]. وتحاول تقرا الـ RFC كله: دوّر على القسم اللي محتاجه بس.`
          },
          teach: R`## ٣ جمل، ونفس طريقة القراية

الطريقة: لاقي الكلمة الكبيرة (MUST أو SHOULD)، واللي قبلها الفاعل، واللي بعدها الفعل، وأي [[if]] أو [[when]] شرط.

---

## الجملة الأولى: من RFC 8174

~~~text
The key words "MUST", ... in this document are to be interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all capitals, as shown here.
~~~

| الحتة | معناها |
|---|---|
| [[The key words ... in this document]] | الفاعل: الكلمات دي في المستند ده |
| [[are to be interpreted as described in]] | لازم تتفهم زي ما متوصفة في |
| [[BCP 14]] | Best Current Practice 14 = RFC 2119 و RFC 8174 مع بعض |
| [[when, and only when,]] | لما، ولما **بس** |
| [[they appear in all capitals]] | تكون بحروف كبيرة |

يعني [[should]] الصغيرة في نفس المستند كلمة عادية.

## الجملة التانية: من Conventional Commits

~~~text
Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL scope, OPTIONAL !, and REQUIRED terminal colon and space.
~~~

| الحتة | معناها |
|---|---|
| [[Commits MUST be prefixed with a type]] | الـ commit **لازم** يبدأ بنوع |
| [[which consists of a noun, feat, fix, etc.]] | النوع اسم زي feat و fix |
| [[followed by the OPTIONAL scope, OPTIONAL !]] | وبعده scope اختياري و ! اختيارية |
| [[and REQUIRED terminal colon and space]] | ونقطتين ومسافة في الآخر، إجباري |

[[terminal]] هنا = «في الآخر»، مش ترمنال الأوامر.

## الجملة التالتة: من RFC 9110

~~~text
A request method is considered "idempotent" if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.
~~~

الهيكل: [[A request method is considered "idempotent" if X is the same as Y]].

- X = [[the intended effect on the server of multiple identical requests]]: التأثير المقصود على السيرفر لطلبات كتير متطابقة.
- Y = [[the effect for a single such request]]: تأثير طلب واحد زيهم. [[such]] = زي ده.

---

## الخلاصة

| الكلمة | المعنى |
|---|---|
| [[MUST]] / [[REQUIRED]] / [[SHALL]] | إجباري |
| [[SHOULD]] / [[RECOMMENDED]] | المفروض، إلا بسبب قوي |
| [[MAY]] / [[OPTIONAL]] | اختياري |

- المعنى الخاص للحروف الكبيرة بس.
- بص على [[Obsoleted by]] في أول الـ RFC: RFC 7231 اتحل محله 9110.`,
          lines: [
            R`الجملة الثابتة من RFC 8174: «الكلمات دي تتفهم زي ما BCP 14 بيقول، لما، ولما بس، تكون بحروف كبيرة زي هنا».`,
            R`من مواصفة Conventional Commits: «الـ commits لازم يبقى قبلها نوع (اسم زي feat و fix)، وبعده scope اختياري، و ! اختيارية، ونقطتين ومسافة إجباري».`,
            R`من RFC 9110: «الـ method بتتعتبر idempotent لو التأثير المقصود على السيرفر من طلبات كتير متطابقة زي تأثير طلب واحد».`
          ],
          sol: R`تقسيم جملة Conventional Commits: الإجباري ([[MUST]] و [[REQUIRED]]) = نوع (type) + [[: ]] (نقطتين ومسافة). الاختياري ([[OPTIONAL]]) = الـ scope و الـ [[!]].

٣ أمثلة:
بيحقق كل حاجة: [[fix: handle empty cart]]
بيكسر MUST: [[handle empty cart]] (مفيش نوع) أو [[fix:handle empty cart]] (مفيش مسافة بعد النقطتين).
كل الـ OPTIONAL: [[feat(api)!: remove v1 endpoints]]

و idempotent: [[PUT /users/5]] بنفس الـ body ١٠ مرات = المستخدم ٥ بنفس الداتا (نفس تأثير مرة واحدة)، فهو idempotent. و [[POST /orders]] ١٠ مرات = ١٠ أوردرات، فمش idempotent. والكلمة المهمة في الـ RFC [[intended effect]]: الكلام عن التأثير على السيرفر، مش إن الرد لازم يبقى نفسه.`
        },
        {
          cmd: "تفك جملة طويلة",
          title: "تفك جملة إنجليزي طويلة: الفعل الأساسي، و which و that، والأقواس",
          desc: R`الـ docs والـ specs فيها جمل ٤٠ كلمة، واللي إنجليزيته ضعيفة بيتوه في النص. الحل مش إنك تترجم كل كلمة، الحل إنك تلاقي «هيكل» الجملة الأول:

١) لاقي الفعل الأساسي والفاعل بتاعه (غالبًا في أول الجملة). ٢) شيل كل حاجة بين فواصل أو أقواس مؤقتًا (دي تفاصيل). ٣) شيل الـ [[which]] و [[that]] و [[who]] والكلام اللي بعدهم (دي وصف لكلمة قبلها). ٤) اقرا الهيكل: [[The server returns a 409]]. ٥) رجّع التفاصيل واحدة واحدة.

الكلمات اللي بتفصل أجزاء: [[which]] / [[that]] = اللي (وصف)، و [[where]] = بحيث/فين، و [[when]] = لما، و [[if]] / [[unless]] = شرط، و [[so that]] = عشان، و [[because]] / [[since]] = عشان/لأن، و [[although]] / [[while]] = مع إن، و [[however]] = بس/لكن، و [[such as]] = زي.`,
          example: R`Full: When a client sends a request with an If-Match header that does not match the current ETag of the resource, which usually means that another client has modified it in the meantime, the server returns 412 Precondition Failed instead of applying the update.
Step 1 (core): the server returns 412 Precondition Failed
Step 2 (condition): When a client sends a request with an If-Match header
Step 3 (describes the header): that does not match the current ETag of the resource
Step 4 (extra explanation): which usually means that another client has modified it in the meantime
Step 5 (alternative): instead of applying the update
Short version: If the ETag doesn't match, someone else changed it, so the server refuses the update with 412.`,
          try: R`فك الجملة دي بنفس الخطوات: [[By default, the build output, which is written to the dist directory unless you set outDir in the config file, is cleaned before each build so that stale files from previous builds are not deployed accidentally.]] واكتب النسخة القصيرة بإنجليزي بسيط وبالعربي.`,
          flag: "script",
          deep: {
            why: "الجمل الطويلة هي أكتر حاجة بتخلي الناس تقفل الصفحة وتفتح الترجمة. ولما تتعلم تفكها، بتكتشف إن أغلبها فكرة بسيطة جدًا متغطية بتفاصيل.",
            how: R`حيل للسرعة:
الفعل الأساسي غالبًا بعد أول اسم كبير ([[the server returns]]، [[the build output ... is cleaned]]). لو لقيت [[which]] أو فاصلة بعد الفاعل، الفعل الأساسي بعد الجزء ده.
الفواصل بتقسم، والأقواس = تفاصيل تقدر تعدّيها في أول قراية.
[[that]] بعد اسم = وصف ([[a header that does not match]])، بس [[that]] بعد فعل زي [[means]] أو [[ensure]] = «إن» ([[means that another client ...]]).
[[instead of]] و [[rather than]] = البديل اللي محصلش.
[[so that]] = الهدف. و [[unless]] = الاستثناء.

وبعد ما تفك الجملة، اكتب «short version» لنفسك. ده بيثبت الفهم، وبيعلمك إزاي تكتب انت بجمل قصيرة.`,
            when: "أي جملة قرأتها مرتين ومفهمتهاش. وخصوصًا في الـ specs، و docs الأمان، وشروط الخدمات (terms).",
            mistakes: R`تترجم من أول الجملة لآخرها بالترتيب: الإنجليزي ترتيبه غير العربي، فبتطلع ترجمة ملخبطة. وتتلخبط بين [[that]] الوصف و [[that]] بمعنى «إن». وتفوّت [[unless]] أو [[instead of]] في النص فالمعنى يتقلب.`
          },
          teach: R`## ٥ خطوات على جملة ٤٥ كلمة

~~~text
When a client sends a request with an If-Match header that does not match the current ETag of the resource, which usually means that another client has modified it in the meantime, the server returns 412 Precondition Failed instead of applying the update.
~~~

---

## الخطوات

| الخطوة | الحتة | إزاي عرفتها |
|---|---|---|
| ١. الهيكل | [[the server returns 412 Precondition Failed]] | الفاعل والفعل الأساسي، بعد آخر فاصلة كبيرة |
| ٢. الشرط | [[When a client sends a request with an If-Match header]] | بيبدأ بـ [[When]] |
| ٣. وصف | [[that does not match the current ETag of the resource]] | [[that]] بعد اسم ([[header]]) = وصف له |
| ٤. شرح إضافي | [[which usually means that another client has modified it in the meantime]] | [[which]] بعد فاصلة = تعليق على الجزء اللي قبله |
| ٥. البديل | [[instead of applying the update]] | [[instead of]] = اللي **محصلش** |

---

## that ولا that؟

| الشكل | معناها | مثال |
|---|---|---|
| اسم + [[that]] | اللي (وصف) | [[a header that does not match]] |
| فعل + [[that]] | إن | [[means that another client has modified it]] |

---

## الكلمات

- [[If-Match]] header و [[ETag]]: رقم بيمثّل نسخة المورد، والسيرفر بيقارنه عشان يعرف حد غيّره ولا لأ.
- [[Precondition Failed]] = شرط مسبق فشل. ده اسم الـ status 412.
- [[has modified]] = present perfect: عدّله (والنتيجة لسه قايمة).
- [[in the meantime]] = في الوقت ده.

---

## النسخة القصيرة

~~~text
If the ETag doesn't match, someone else changed it, so the server refuses the update with 412.
~~~

ثلاث أفكار، وكل فكرة جملة قصيرة: الشرط، والسبب، والنتيجة.

---

## الخلاصة

- الهيكل الأول (فاعل + فعل)، والتفاصيل بعدين.
- [[which]] و [[that]] بعد اسم = وصف تقدر تعدّيه في أول قراية.
- [[instead of]] و [[unless]] بيقلبوا المعنى: متفوّتهمش.`,
          lines: [
            R`الجملة كاملة (٤٥ كلمة تقريبًا).`,
            R`الهيكل: «السيرفر بيرجّع 412». ده الأساس.`,
            R`الشرط: «لما client يبعت طلب فيه If-Match header».`,
            R`[[that]] بتوصف الـ header: «مش مطابق للـ ETag الحالي».`,
            R`[[which]] شرح إضافي: «وده غالبًا معناه إن client تاني عدّله في الوقت ده».`,
            R`[[instead of]]: البديل اللي محصلش: «بدل ما يطبّق التعديل».`,
            R`النسخة القصيرة: لو الـ ETag مش مطابق، حد غيّره، فالسيرفر يرفض بـ 412.`
          ],
          sol: R`التفكيك:
الهيكل: [[the build output is cleaned before each build]] ← «ناتج الـ build بيتمسح قبل كل build».
[[By default]] ← افتراضيًا.
[[which is written to the dist directory]] ← وصف: «اللي بيتكتب في فولدر dist».
[[unless you set outDir in the config file]] ← استثناء: «إلا لو حطيت outDir في ملف الإعدادات».
[[so that stale files from previous builds are not deployed accidentally]] ← الهدف: «عشان ملفات قديمة من builds قبل كده متتنشرش بالغلط».

Short version: [[By default, the output folder (dist) is emptied before every build, so old files don't get deployed by mistake.]]
بالعربي: «افتراضيًا فولدر الناتج (dist، أو اللي في outDir) بيتفضّى قبل كل build، عشان ملفات قديمة متتنشرش بالغلط».

لو فهمت إن الـ [[unless]] بتاعة الـ cleaning (يعني «مش هيتمسح لو حطيت outDir»)، ارجع للخطوة ٣: [[unless]] جوه جملة الـ [[which]] بتاعة dist، فهي بتوصف مكان الناتج بس.`
        }
      ]
    }
]);

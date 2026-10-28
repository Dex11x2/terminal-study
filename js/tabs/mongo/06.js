// تكملة تاب mongo: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/mongo/01.js (شرح حقول الدرس في أوله)
MORE("mongo", [
    {
      t: "سرعة التقارير وأنماط تصميم متقدمة",
      l: 3,
      n: "تقرا explain بتاع الـ aggregate، و index يخلي التقرير covered، و attribute و computed patterns، وتغيّر شكل المستندات من غير ما توقف التطبيق",
      items: [
        {
          cmd: "explain للـ aggregate",
          title: "التقرير بطيء: اقرا explain وصلّحه بـ index",
          desc: R`[[db.collection.explain("executionStats").aggregate([...])]] بيشغّل الـ pipeline ويقولك عمل إيه: قرا كام مستند ([[totalDocsExamined]])، وكام مفتاح index ([[totalKeysExamined]])، ورتّب في الذاكرة ([[SORT]]) ولا من الـ index، وأخد كام ملّي ثانية.

القاعدة: [[$match]] و [[$sort]] في أول الـ pipeline بس هما اللي بيستخدموا indexes، وأحسن حالة إن الـ index يغطي كل الحقول المطلوبة فميقراش المستندات خالص ([[PROJECTION_COVERED]]).`,
          example: R`use perf
for (let b = 0; b < 20; b++) db.orders.insertMany(Array.from({ length: 10000 }, (_, j) => { const i = b * 10000 + j; return { userId: i % 5000, status: ["paid", "paid", "paid", "pending", "cancelled"][i % 5], createdAt: new Date(Date.UTC(2026, 0, 1) + i * 60000), total: (i * 37) % 5000 } }))
db.orders.explain("executionStats").aggregate([{ $match: { status: "paid", userId: 42 } }, { $sort: { createdAt: -1 } }, { $limit: 5 }])
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })
db.orders.explain("executionStats").aggregate([{ $match: { status: "paid", userId: 42 } }, { $sort: { createdAt: -1 } }, { $limit: 5 }])
db.orders.explain("executionStats").aggregate([{ $match: { status: "paid" } }, { $group: { _id: "$userId", s: { $sum: "$total" } } }, { $match: { s: { $gt: 100000 } } }])
db.orders.createIndex({ status: 1, userId: 1, total: 1 })
db.orders.explain("executionStats").aggregate([{ $match: { status: "paid" } }, { $group: { _id: "$userId", s: { $sum: "$total" } } }, { $match: { s: { $gt: 100000 } } }])`,
          try: R`في نفس قاعدة [[perf]]: شغّل explain على [[[{ $sort: { createdAt: -1 } }, { $match: { userId: 42 } }, { $limit: 5 }]]] (الـ sort قبل الـ match). Mongo عمل إيه في الترتيب؟ وبعدين على [[[{ $match: { userId: 42, status: "paid" } }, { $project: { _id: 0, userId: 1, status: 1, createdAt: 1 } }]]] وبص على [[totalDocsExamined]].`,
          flag: "script",
          deep: {
            why: "«الداشبورد بطيء» أشهر شكوى بعد ما البيانات تكبر. من غير explain بتخمّن: تزوّد RAM، أو تعمل index على كل حقل فالكتابة تبطأ. explain بيوريك بالظبط المرحلة اللي بتقرا ٢٠٠ ألف مستند عشان ترجّع ٥.",
            how: R`الناتج له شكلين. لو الـ pipeline كله اتحوّل لـ query واحدة (match و sort و limit و group بسيط)، بيبقى زي explain بتاع find: [[queryPlanner.winningPlan]] و [[executionStats]]. لو فيه مراحل مبتتحوّلش، بيبقى [[stages]]: أول عنصر [[$cursor]] (الجزء اللي راح للـ query engine وفيه الـ plan والأرقام) وبعده باقي المراحل.

الـ stages اللي تقراها في الـ plan: [[COLLSCAN]] قرا الـ collection كلها، و [[IXSCAN]] مشي على index، و [[FETCH]] جاب المستند من الديسك بعد الـ index، و [[SORT]] رتّب في الذاكرة (حده ١٠٠ ميجا، [[memLimit: 104857600]])، و [[PROJECTION_COVERED]] الناتج كله من الـ index من غير FETCH، و [[GROUP]] تجميع.

الأرقام: [[nReturned]] رجّع كام، و [[totalKeysExamined]] كام مفتاح index، و [[totalDocsExamined]] كام مستند، و [[executionTimeMillis]]. الهدف إن الاتنين قريبين من [[nReturned]].

الـ optimizer بيعيد الترتيب لوحده أحيانًا: بيقدّم [[$match]] قبل [[$sort]]، وبيقدّم [[$match]] على [[_id]] بتاع الـ group لو هو حقل أصلي. بس [[$match]] على حاجة محسوبة ([[s]] = مجموع) لازم يفضل بعد الـ group ومبيستخدمش index.

covered: لو الـ index فيه كل الحقول اللي الـ pipeline محتاجها ([[status]] للفلتر و [[userId]] و [[total]] للـ group)، Mongo بيقرا الـ index بس. جربت: [[totalDocsExamined]] نزل من 200000 لـ 0.`,
          when: "قبل ما تضيف أي index (اعرف المشكلة الأول)، وبعده (اتأكد إنه اتستخدم)، ولأي تقرير بياخد أكتر من ١٠٠ ملّي ثانية. و Atlas و mongod عندهم slow query log ([[db.setProfilingLevel(1, { slowms: 100 })]]) يقولك مين البطيء من الأساس.",
          mistakes: R`تقرا [[executionTimeMillis]] بس على collection صغيرة: ٢ ملّي ثانية مع ٨ مستندات مش معناها حاجة. اقرا [[totalDocsExamined]] مقابل [[nReturned]]. وتعمل index لكل حقل لوحده بدل compound بترتيب ESR. وتحط [[$project]] أو [[$addFields]] قبل [[$match]] على حقل محسوب فيه، فالـ match ميقدرش يستخدم index. وتنسى إن كل index بيبطّأ الكتابة وبياخد RAM: index الـ covered هنا اتعمل لتقرير مهم، مش لكل تقرير.`
          },
          teach: R`## الفكرة: explain بيقولك القاعدة عملت إيه فعلًا

درس «createIndex و explain» كان على [[find]]. هنا على [[aggregate]]، وببيانات كبيرة كفاية عشان الأرقام تفرق: ٢٠٠ ألف أوردر لـ ٥٠٠٠ يوزر. اتشغّل على [[mongo:8]] (8.3) في mongosh.

---

## ١. البيانات

~~~javascript
for (let b = 0; b < 20; b++) db.orders.insertMany(Array.from({ length: 10000 }, (_, j) => { ... }))
~~~

- [[for]] بيلف ٢٠ مرة، وكل مرة [[insertMany]] بـ ١٠ آلاف مستند (أسرع بكتير من [[insertOne]] في loop).
- [[Array.from({ length: 10000 }, fn)]]: بيعمل array فيها ١٠ آلاف عنصر، كل عنصر ناتج الدالة.
- [[i % 5000]]: باقي القسمة، فالـ userId بيلف من 0 لـ 4999، يعني كل يوزر عنده ٤٠ أوردر.
- الحالة بتتاخد من array فيها ٥ قيم بـ [[i % 5]]، ٣ منهم paid، فـ ١٢٠ ألف أوردر مدفوع. (وبالصدفة الحسابية كل أوردرات يوزر 42 الـ ٤٠ طلعوا paid، لأن 42 + 5000 × أي رقم باقي قسمته على 5 دايمًا 2.)

---

## ٢. أول explain: من غير index

~~~javascript
db.orders.explain("executionStats").aggregate([{ $match: { status: "paid", userId: 42 } }, { $sort: { createdAt: -1 } }, { $limit: 5 }])
~~~

[[explain("executionStats")]] قبل [[.aggregate]]: «شغّله وقولّي عملت إيه» بدل ما يرجّع النتايج. الـ pipeline ده كله اتحوّل لـ query واحدة، فالناتج زي explain بتاع find. أهم حتتين:

~~~text queryPlanner.winningPlan (مختصر)
{ stage: 'SORT', sortPattern: { createdAt: -1 }, memLimit: 104857600, limitAmount: 5,
  inputStage: { stage: 'COLLSCAN', filter: { '$and': [ { status: { '$eq': 'paid' } }, { userId: { '$eq': 42 } } ] } } }
~~~

~~~text executionStats (مختصر)
nReturned: 5, executionTimeMillis: 92, totalKeysExamined: 0, totalDocsExamined: 200000
~~~

بيتقري من جوه لبرة:

| الـ stage | معناه |
|---|---|
| [[COLLSCAN]] | قرا كل المستندات وفلتر كل واحد بالـ filter |
| [[SORT]] | رتّب اللي فضل **في الذاكرة** |
| [[memLimit: 104857600]] | حد الذاكرة للترتيب: 100 × 1024 × 1024 = ١٠٠ ميجا |
| [[limitAmount: 5]] | Mongo دمج الـ [[$limit]] في الـ sort: بيحتفظ بأحسن ٥ بس (top-k) |

والأرقام: قرا **٢٠٠٠٠٠** مستند عشان يرجّع **٥**، في 92 ملّي ثانية.

---

## ٣. الـ index

~~~javascript
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })
~~~

بترتيب ESR: [[userId]] و [[status]] مساواة (Equality)، وبعدين [[createdAt]] للترتيب (Sort). ونفس الـ explain تاني:

~~~text queryPlanner.winningPlan (مختصر)
{ stage: 'LIMIT', limitAmount: 5,
  inputStage: { stage: 'FETCH',
    inputStage: { stage: 'IXSCAN', indexName: 'userId_1_status_1_createdAt_-1',
      indexBounds: { userId: [ '[42, 42]' ], status: [ '["paid", "paid"]' ], createdAt: [ '[MaxKey, MinKey]' ] } } } }
~~~

~~~text executionStats
nReturned: 5, executionTimeMillis: 0, totalKeysExamined: 5, totalDocsExamined: 5
~~~

- [[IXSCAN]] بـ [[indexBounds]]: راح على طول لـ [[userId = 42]] و [[status = paid]]، والمفاتيح جوه مترتبة بـ [[createdAt]] تنازلي أصلًا.
- مفيش [[SORT]]: الترتيب جه من الـ index.
- [[FETCH]]: جاب ٥ مستندات بس من الديسك.
- ٥ مفاتيح و ٥ مستندات و ٥ نتايج. ده الشكل المثالي.

---

## ٤. تقرير فيه [[$group]]

~~~javascript
db.orders.explain("executionStats").aggregate([{ $match: { status: "paid" } }, { $group: { _id: "$userId", s: { $sum: "$total" } } }, { $match: { s: { $gt: 100000 } } }])
~~~

«اليوزرز اللي دفعوا أكتر من ١٠٠ ألف». هنا الناتج شكله مختلف: [[explainVersion: '2']] وفيه [[stages]]:

~~~text stages
$cursor  →  $match
~~~

- [[$cursor]]: الجزء اللي اتنفّذ في الـ query engine: [[$match]] الأولاني و [[$group]] (جواه [[GROUP]] فوق [[COLLSCAN]]). قرا [[200000]] مستند في 88 ملّي ثانية.
- [[$match]] التاني على [[s]] (مجموع محسوب) فضل مرحلة لوحده بعد الـ group، ورجّع [[1499]] يوزر. ده عمره ما يستخدم index، لأن [[s]] مش موجود في المستندات.

## ٥. index بيغطّي التقرير (covered)

~~~javascript
db.orders.createIndex({ status: 1, userId: 1, total: 1 })
~~~

الـ group محتاج ٣ حقول بس: [[status]] للفلتر، و [[userId]] للمفتاح، و [[total]] للجمع. لو الـ index فيهم الـ ٣، القيم موجودة جوه الـ index نفسه:

~~~text $cursor بعد الـ index (مختصر)
GROUP ← PROJECTION_COVERED ← IXSCAN status_1_userId_1_total_1
totalKeysExamined: 120000, totalDocsExamined: 0, executionTimeMillis: 56
~~~

| | قبل | بعد |
|---|---|---|
| القراية | [[COLLSCAN]] | [[IXSCAN]] + [[PROJECTION_COVERED]] |
| مفاتيح | 0 | 120000 (الـ paid بس) |
| مستندات | 200000 | **0** |
| الوقت | 88ms | 56ms |

[[PROJECTION_COVERED]] معناها مفيش [[FETCH]]: ولا مستند اتقري من الديسك. المكسب الحقيقي بيبان أكتر لما المستندات كبيرة (فيها items وعناوين) والـ index صغير.

---

## ٦. الـ optimizer بيصلّح ترتيبك أحيانًا

| اللي كتبته | اللي Mongo عمله |
|---|---|
| [[$sort]] ثم [[$match: { userId: 42 }]] | قدّم الـ match: [[IXSCAN]] (40 مفتاح) ثم [[SORT]] |
| [[$group]] بـ userId ثم [[$match: { _id: 42 }]] | قدّم الـ match قبل الـ group: [[IXSCAN]] 40 مفتاح |
| [[$group]] ثم [[$match]] على مجموع | مينفعش يتقدّم: بعد الـ group |

متعتمدش عليه: اكتب [[$match]] الأول دايمًا.

## الخلاصة

1. [[explain("executionStats")]] قبل [[.aggregate]].
2. لو فيه [[stages]]: الأرقام جوه [[stages[0].$cursor]].
3. دوّر على [[COLLSCAN]] و [[SORT]] في collection كبيرة.
4. قارن [[totalDocsExamined]] بـ [[nReturned]].
5. index بترتيب ESR، ولو التقرير مهم: index فيه كل حقوله (covered).`,
          lines: [
            "ادخل قاعدة perf (جديدة للتجربة).",
            "ضيف 200 ألف أوردر على 20 دفعة: 5000 يوزر، 3 من كل 5 مدفوعين، وتاريخ بيزيد دقيقة كل أوردر.",
            "explain لآخر 5 أوردرات مدفوعة ليوزر 42 من غير index: COLLSCAN و SORT في الذاكرة.",
            "index بترتيب ESR: مساواة userId و status ثم ترتيب createdAt.",
            "نفس الـ explain: IXSCAN، ومفيش SORT، و 5 مستندات بس.",
            "explain لتقرير group: الـ $cursor فيه GROUP فوق COLLSCAN، والـ $match على المجموع بعده.",
            "index فيه كل حقول التقرير: status و userId و total.",
            "نفس التقرير: PROJECTION_COVERED، وصفر مستندات اتقرت."
          ],
          sol: R`[[$sort]] قبل [[$match]]: الـ optimizer قدّم الـ match، فالـ plan بقى [[FETCH]] ← [[SORT]] ← [[IXSCAN]] على index الـ userId: قرا 40 مفتاح (كل أوردرات يوزر 42) ورتّبهم في الذاكرة وجاب 5 مستندات بس ([[totalDocsExamined: 5]]). مفيش COLLSCAN، بس فيه SORT لأن [[status]] مش في الشرط فالـ index مش مترتب بـ createdAt للحالة دي.

الـ [[$project]] على حقول الـ index بس: [[PROJECTION_COVERED]] ← [[IXSCAN]]، و [[totalKeysExamined: 40]] و [[totalDocsExamined: 0]]. لاحظ [[_id: 0]]: من غيره Mongo لازم يجيب [[_id]] من المستند، فمش هيبقى covered.`,
          solCode: R`db.orders.explain("executionStats").aggregate([{ $sort: { createdAt: -1 } }, { $match: { userId: 42 } }, { $limit: 5 }])
db.orders.explain("executionStats").aggregate([{ $match: { userId: 42, status: "paid" } }, { $project: { _id: 0, userId: 1, status: 1, createdAt: 1 } }])`
        },
        {
          cmd: "attribute و computed",
          title: "منتجات مواصفاتها مختلفة، وتقييم محسوب جاهز",
          desc: R`**attribute pattern**: لما كل منتج ليه مواصفات مختلفة (الموبايل RAM، والشاشة بوصة)، بدل حقل لكل مواصفة (وindex لكل واحد)، حطهم array من [[{ k, v }]]، و index واحد على [[specs.k]] و [[specs.v]] يخدم البحث بأي مواصفة.

**computed pattern**: الرقم اللي بيتقري كتير ويتحسب من بيانات كتير (متوسط التقييم، عدد التعليقات)، احسبه وقت الكتابة واحفظه في المستند بـ [[$inc]]، بدل ما تحسبه بـ aggregate مع كل فتحة صفحة.`,
          example: R`use catalog
db.items.insertMany([{ _id: 1, name: "Phone X", specs: [{ k: "ram", v: 8 }, { k: "color", v: "black" }], rating: { sum: 0, count: 0 } }, { _id: 2, name: "TV 55", specs: [{ k: "inch", v: 55 }, { k: "color", v: "black" }], rating: { sum: 0, count: 0 } }, { _id: 3, name: "Phone Y", specs: [{ k: "ram", v: 12 }, { k: "color", v: "blue" }], rating: { sum: 0, count: 0 } }])
db.items.createIndex({ "specs.k": 1, "specs.v": 1 })
db.items.find({ specs: { $elemMatch: { k: "color", v: "black" } } }, { name: 1 })
db.items.find({ specs: { $elemMatch: { k: "ram", v: { $gte: 10 } } } }, { name: 1 })
db.reviews.insertOne({ itemId: 1, userId: 7, stars: 4, text: "good" })
db.items.updateOne({ _id: 1 }, { $inc: { "rating.sum": 4, "rating.count": 1 } })
db.items.aggregate([{ $project: { _id: 0, name: 1, count: "$rating.count", avg: { $cond: [{ $eq: ["$rating.count", 0] }, null, { $round: [{ $divide: ["$rating.sum", "$rating.count"] }, 1] }] } } }])`,
          try: R`شغّل المثال، وبعدين ضيف تقييم ٥ نجوم تاني للمنتج 1 (السطرين: review و [[$inc]]). المتوسط بقى كام؟ وبعدين جرّب البحث الغلط [[db.items.find({ "specs.k": "ram", "specs.v": "black" })]] من غير [[$elemMatch]]: طلع إيه، وليه؟`,
          flag: "script",
          deep: {
            why: "متجر فيه موبايلات وشاشات وكتب: لو كل مواصفة حقل، هتلاقي عندك ٢٠٠ حقل، وكل فلتر جديد في صفحة البحث محتاج index جديد (وأقصى عدد ٦٤ index للـ collection). وصفحة المنتج اللي بتعرض «4.5 من 5 (230 تقييم)» لو بتحسبها من [[reviews]] مع كل زيارة، المنتج المشهور بيبقى أبطأ صفحة في الموقع.",
            how: R`attribute: كل مواصفة عنصر [[{ k: "ram", v: 8 }]] في [[specs]]. الـ index على [[{ "specs.k": 1, "specs.v": 1 }]] بيبقى multikey: entry لكل عنصر في الـ array. البحث لازم بـ [[$elemMatch]] عشان الشرطين يتطبقوا على **نفس** العنصر. وقيم [[v]] ممكن تبقى أرقام أو نصوص، والمقارنة [[$gte: 10]] بتشتغل على الأرقام. جرّبت explain للبحث بالـ color: [[IXSCAN]] على [[specs.k_1_specs.v_1]].

computed: مع كل review جديد، [[$inc]] بيزوّد [[rating.sum]] بعدد النجوم و [[rating.count]] بواحد، في نفس العملية (atomic على المستند). المتوسط = sum ÷ count وقت القراية، أو تخزّنه هو كمان. خزّن sum و count مش المتوسط بس، عشان تقدر تحدّث من غير ما تعيد الحساب، ولو اتمسح review تعمل [[$inc]] بالسالب.

القسمة على صفر: منتج ملوش تقييمات [[count]] = 0، و [[$divide]] بيوقّع الـ aggregate كله: [[can't $divide by zero]] (جربتها)، عشان كده [[$cond]].

الاتنين جزء من «أنماط تصميم» MongoDB الرسمية، ومعاهم اللي في دروس تانية: subset و bucket و outlier في «حد الـ 16MB و bucket»، و extended reference (نسخ الاسم والسعر) في «embed ولا reference».`,
          when: "attribute: كتالوج منتجات متنوع، وأي حاجة فيها «حقول بيحددها اليوزر» (custom fields). computed: عدادات وإجماليات بتتقري أكتر بكتير ما بتتكتب: لايكات، وتقييمات، ورصيد، وعدد أعضاء. ولو التحديث لحظي مش لازم، احسبها بـ job و [[$merge]] (درس «$merge و $out»).",
          mistakes: R`تبحث بـ [[{ "specs.k": "ram", "specs.v": "black" }]] من غير [[$elemMatch]]: الشرطين بيتطبقوا على أي عنصرين، فالموبايل الأسود اللي فيه ram طلع (جربتها: [[Phone X]] مع إن مفيش ram قيمتها black). وتكتب الـ review وتنسى [[$inc]] (أو العكس لو حصل error بينهم)، فالرقم يبعد عن الحقيقة: اعملهم في transaction، أو اعمل job بيعيد الحساب كل فترة يصلّح أي فرق. وتخزّن المتوسط بس من غير count، فمتقدرش تحدّثه صح.`
          },
          teach: R`## نمطين بيحلوا مشكلتين شائعين

اتشغّل على [[mongo:8]] في قاعدة [[catalog]] جديدة.

---

## الجزء الأول: attribute pattern

### المستند

~~~javascript
{ _id: 1, name: "Phone X", specs: [{ k: "ram", v: 8 }, { k: "color", v: "black" }], rating: { sum: 0, count: 0 } }
~~~

بدل [[ram: 8, color: "black"]] كحقول، المواصفات array:

- [[k]] (key): اسم المواصفة.
- [[v]] (value): قيمتها، رقم أو نص.

الشاشة عندها [[inch]] والموبايل [[ram]]، ومفيش حقول فاضية ولا schema بتتغير مع كل نوع منتج جديد.

### الـ index

~~~javascript
db.items.createIndex({ "specs.k": 1, "specs.v": 1 })
~~~

~~~text الناتج
specs.k_1_specs.v_1
~~~

[[specs.k]] بالنقطة معناها «الحقل k جوه عناصر specs». ولأن [[specs]] array، ده **multikey index**: كل منتج بيتسجّل فيه مرة لكل مواصفة. index واحد بيخدم البحث بأي مواصفة، حتى اللي هتضيفها بكرة.

### البحث بـ [[$elemMatch]]

~~~javascript
db.items.find({ specs: { $elemMatch: { k: "color", v: "black" } } }, { name: 1 })
~~~

~~~text الناتج
[ { _id: 1, name: 'Phone X' }, { _id: 2, name: 'TV 55' } ]
~~~

[[$elemMatch]] = «فيه عنصر **واحد** في الـ array بيحقق كل الشروط دي مع بعض». و explain قال [[IXSCAN]].

~~~javascript
db.items.find({ specs: { $elemMatch: { k: "ram", v: { $gte: 10 } } } }, { name: 1 })
~~~

~~~text الناتج
[ { _id: 3, name: 'Phone Y' } ]
~~~

مقارنة رقمية: ram 12 بس اللي فوق ١٠.

### من غير [[$elemMatch]]: غلط في صمت

~~~javascript
db.items.find({ "specs.k": "ram", "specs.v": "black" }, { name: 1 })
~~~

~~~text الناتج
[ { _id: 1, name: 'Phone X' } ]
~~~

مفيش ram قيمتها black! بس Mongo بيقرا الشرطين كده: «فيه عنصر k بتاعه ram» **و** «فيه عنصر v بتاعه black»، ومش لازم يبقى نفس العنصر. Phone X عنده الاتنين في عنصرين مختلفين.

---

## الجزء التاني: computed pattern

### الكتابة: review + [[$inc]]

~~~javascript
db.reviews.insertOne({ itemId: 1, userId: 7, stars: 4, text: "good" })
db.items.updateOne({ _id: 1 }, { $inc: { "rating.sum": 4, "rating.count": 1 } })
~~~

التقييم نفسه بيتحفظ في [[reviews]] (التفاصيل لصفحة «كل التقييمات»)، والمنتج بيشيل رقمين جاهزين:

| الحقل | بيزيد بـ | ليه |
|---|---|---|
| [[rating.sum]] | عدد النجوم (4) | المجموع |
| [[rating.count]] | 1 | العدد |

[[$inc]] على مستند واحد atomic: لو ١٠٠ واحد قيّموا في نفس اللحظة، محدش بيدوس على التاني.

### القراية: المتوسط

~~~javascript
{ $project: { _id: 0, name: 1, count: "$rating.count",
    avg: { $cond: [{ $eq: ["$rating.count", 0] }, null, { $round: [{ $divide: ["$rating.sum", "$rating.count"] }, 1] }] } } }
~~~

من جوه لبرة: [[$divide]] يقسم، و [[$round: [..., 1]]] يقرّب لرقم عشري واحد، و [[$cond]] يرجّع [[null]] لو مفيش تقييمات. بعد تقييمين (4 و 5):

~~~text الناتج
[
  { name: 'Phone X', count: 2, avg: 4.5 },
  { name: 'TV 55', count: 0, avg: null },
  { name: 'Phone Y', count: 0, avg: null }
]
~~~

ومن غير [[$cond]]:

~~~text الناتج
can't $divide by zero
~~~

الـ aggregate كله وقع بسبب منتج واحد ملوش تقييمات.

## الخلاصة

| النمط | المشكلة | الحل |
|---|---|---|
| attribute | مواصفات مختلفة لكل نوع | [[specs: [{ k, v }]]] + index واحد + [[$elemMatch]] |
| computed | رقم بيتقري كتير ومحسوب من كتير | [[$inc]] وقت الكتابة، وخزّن sum و count |

وباقي الأنماط في دروس تانية: subset و bucket و outlier («حد الـ 16MB و bucket»)، و extended reference («embed ولا reference»)، و schema versioning (الدرس الجاي).`,
          lines: [
            "قاعدة catalog جديدة.",
            "3 منتجات، كل واحد مواصفاته array من {k, v}، وتقييم sum و count بصفر.",
            "index واحد multikey على اسم المواصفة وقيمتها.",
            "المنتجات اللي ليها مواصفة color قيمتها black (في نفس العنصر).",
            "المنتجات اللي ram بتاعتها 10 أو أكتر.",
            "تقييم جديد في reviews.",
            "حدّث الرقمين المحسوبين في المنتج في نفس اللحظة.",
            "المتوسط وقت القراية: sum ÷ count مقرّب، و null لو مفيش تقييمات."
          ],
          sol: R`بعد التقييم التاني ([[stars: 5]] و [[$inc]] بـ 5 و 1): [[count: 2]] و [[avg: 4.5]] (9 ÷ 2).

البحث من غير [[$elemMatch]] رجّع [[Phone X]]، مع إن مفيش مواصفة ram قيمتها black. [[specs.k: "ram"]] اتحقق في عنصر، و [[specs.v: "black"]] في عنصر تاني. [[$elemMatch]] بيلزم الاتنين في نفس العنصر.`,
          solCode: R`db.reviews.insertOne({ itemId: 1, userId: 8, stars: 5, text: "great" })
db.items.updateOne({ _id: 1 }, { $inc: { "rating.sum": 5, "rating.count": 1 } })
db.items.findOne({ _id: 1 }, { rating: 1 })
db.items.find({ "specs.k": "ram", "specs.v": "black" }, { name: 1 })`
        },
        {
          cmd: "schemaVersion و migration",
          title: "تغيّر شكل المستندات وهي شغالة: schemaVersion و update بـ pipeline",
          desc: R`في SQL بتعمل [[ALTER TABLE]] وكل الصفوف تتغير مرة واحدة. في Mongo المستندات القديمة بتفضل بشكلها، فبتحط فيها [[schemaVersion]]: الكود يقرا الشكلين، والجديد يتكتب بالشكل الجديد، وفي الخلفية [[updateMany]] بـ **pipeline** يحوّل القديم.

الـ pipeline في الـ update (array بدل object) بيخليك تحسب القيمة الجديدة من حقول المستند نفسه: تقسم [[name]] لـ [[firstName]] و [[lastName]]، وتحط [[phone]] جوه array.`,
          example: R`use crm
db.members.insertMany([{ _id: 1, name: "Sara Ali", phone: "01001234567" }, { _id: 2, name: "Mona", phone: "01005556666" }, { _id: 3, firstName: "Omar", lastName: "Hassan", phones: ["01112223333"], schemaVersion: 2 }])
db.members.updateMany({ schemaVersion: { $exists: false } }, [
  { $set: {
      firstName: { $arrayElemAt: [{ $split: ["$name", " "] }, 0] },
      lastName: { $ifNull: [{ $arrayElemAt: [{ $split: ["$name", " "] }, 1] }, ""] },
      phones: ["$phone"],
      schemaVersion: 2
  } },
  { $unset: ["name", "phone"] }
])
db.members.find()
db.members.countDocuments({ schemaVersion: { $ne: 2 } })`,
          try: R`قبل الـ [[updateMany]]: اكتب دالة JavaScript في mongosh اسمها [[toV2(doc)]] بترجّع المستند بالشكل الجديد سواء كان قديم أو جديد (ده اللي التطبيق بيعمله وقت القراية). وبعدين جرّب الفرق: [[db.t.updateOne({}, { $set: { b: "$a" } })]] و [[db.t.updateOne({}, [{ $set: { c: "$a" } }])]] على مستند [[{ a: 1 }]].`,
          flag: "script",
          deep: {
            why: "المنتج بيتغير: الاسم بقى اسمين، والتليفون بقى أكتر من رقم. في Mongo مفيش migration تقفل الجدول، وده ميزة وخطر: لو غيّرت الكود بس، المستندات القديمة هتكسر الصفحات (undefined في كل حتة). schema versioning هو النمط الرسمي اللي بيخليك تغيّر من غير downtime.",
            how: R`الخطة ٣ خطوات: (١) الكود الجديد يقرا الشكلين (لو [[schemaVersion]] مش موجود، حوّل وقت القراية)، ويكتب دايمًا v2. (٢) انشر الكود. (٣) شغّل [[updateMany]] يحوّل الباقي، وبعدين امسح كود القراية القديم.

update بـ pipeline (من MongoDB 4.2): التاني في [[updateMany]] array من مراحل aggregate محدودة ([[$set]]/[[$addFields]] و [[$unset]]/[[$project]] و [[$replaceWith]]). جواها [["$name"]] معناها قيمة الحقل، زي aggregate. أما في الـ update العادي (object)، [["$name"]] نص عادي (جربتها: [[b: '$a']]).

[[$split: ["$name", " "]]] بيقسم النص بالمسافة لـ array، و [[$arrayElemAt: [arr, 0]]] أول عنصر. منى ملهاش اسم تاني، فـ [[$arrayElemAt]] بيرجّع missing، و [[$ifNull]] يخليه [[""]]. و [[phones: ["$phone"]]] array فيها القيمة. و [[$unset]] يشيل الحقول القديمة.

الفلتر [[schemaVersion: { $exists: false }]] بيخلي الأمر آمن لو اتشغّل مرتين: المستند اللي اتحوّل مش هيتلمس تاني. جربت: [[matchedCount: 2]] و [[modifiedCount: 2]] (عمر كان v2 أصلًا فمتلمسش). وعلى collection كبيرة اعمله على دفعات (بـ [[_id]] ranges) عشان متقفلش الـ replication.`,
          when: "أي تغيير في شكل المستند في تطبيق شغال: تقسيم حقل، أو تحويل حقل لـ array، أو تغيير نوع (نص لتاريخ)، أو نقل حقول لـ object جوه. ولو التغيير بسيط (إضافة حقل اختياري)، default في الكود كفاية من غير version.",
          mistakes: R`تكتب [[{ $set: { firstName: "$name" } }]] من غير الأقواس المربعة: كل المستندات بيبقى اسمها حرفيًا [[$name]]. وتشغّل التحويل قبل نشر الكود اللي بيكتب الشكل الجديد، فالمستندات اللي بتتكتب في النص بالشكل القديم تفضل قديمة. وتنسى [[$ifNull]] فالمستندات اللي فيها كلمة واحدة يبقى ملهاش [[lastName]] خالص. وتمسح كود قراية v1 قبل ما [[countDocuments({ schemaVersion: { $ne: 2 } })]] يبقى صفر. وتنسى الـ [[$jsonSchema]] (لو موجود) يقبل الشكل الجديد قبل التحويل.`
          },
          teach: R`## الموقف

الـ collection فيها مستندات قديمة [[{ name, phone }]]، والتطبيق الجديد عايز [[{ firstName, lastName, phones: [] }]]. اتشغّل على [[mongo:8]] في قاعدة [[crm]] جديدة: سارة ومنى بالشكل القديم، وعمر بالجديد ومعاه [[schemaVersion: 2]].

---

## ١. الكود بيقرا الشكلين (قبل أي migration)

ده مش في المثال، بس هو الخطوة الأولى في الحقيقة: دالة في التطبيق بتحوّل وقت القراية.

~~~javascript
function toV2(d) {
  if (d.schemaVersion === 2) return d;
  const [firstName, lastName = ""] = (d.name || "").split(" ");
  return { _id: d._id, firstName, lastName, phones: d.phone ? [d.phone] : [], schemaVersion: 2 };
}
~~~

والكتابة الجديدة دايمًا v2. كده الموقع شغال والمستندات خليط.

---

## ٢. [[updateMany]] بـ pipeline

~~~javascript
db.members.updateMany({ schemaVersion: { $exists: false } }, [ ...مراحل... ])
~~~

- الفلتر: اللي ملهوش [[schemaVersion]] بس، يعني القديم.
- التاني **array** مش object: ده اللي بيقول لـ Mongo «ده pipeline، و [[$]] جواه معناها قيمة حقل».

### المرحلة الأولى: [[$set]]

~~~javascript
firstName: { $arrayElemAt: [{ $split: ["$name", " "] }, 0] },
~~~

من جوه لبرة على سارة:

~~~text خطوة خطوة
"$name"                          →  "Sara Ali"
{ $split: ["$name", " "] }       →  [ "Sara", "Ali" ]
{ $arrayElemAt: [..., 0] }       →  "Sara"
~~~

~~~javascript
lastName: { $ifNull: [{ $arrayElemAt: [{ $split: ["$name", " "] }, 1] }, ""] },
~~~

العنصر رقم 1 ([[Ali]]). منى اسمها كلمة واحدة، فـ [[$split]] بيرجّع [[["Mona"]]] والعنصر 1 مش موجود، و [[$ifNull]] بيحط [[""]] بدله.

~~~javascript
phones: ["$phone"],
schemaVersion: 2
~~~

array فيها رقم التليفون القديم، والإصدار.

### المرحلة التانية: [[{ $unset: ["name", "phone"] }]]

شيل الحقلين القدام.

### الناتج

~~~text الناتج
{ acknowledged: true, insertedId: null, matchedCount: 2, modifiedCount: 2, upsertedCount: 0 }
~~~

٢ اتطابقوا واتعدلوا: سارة ومنى. عمر متلمسش.

---

## ٣. [[db.members.find()]]

~~~text الناتج
[
  { _id: 1, firstName: 'Sara', lastName: 'Ali', phones: [ '01001234567' ], schemaVersion: 2 },
  { _id: 2, firstName: 'Mona', lastName: '', phones: [ '01005556666' ], schemaVersion: 2 },
  { _id: 3, firstName: 'Omar', lastName: 'Hassan', phones: [ '01112223333' ], schemaVersion: 2 }
]
~~~

## ٤. اتأكد إن مفيش حد فاضل

~~~javascript
db.members.countDocuments({ schemaVersion: { $ne: 2 } })
~~~

~~~text الناتج
0
~~~

صفر = تقدر تمسح كود [[toV2]] من التطبيق. [[$ne]] = not equal (بيمسك كمان اللي ملهوش الحقل خالص).

---

## ٥. object ولا array: الفرق اللي بيبوّظ البيانات

على مستند [[{ a: 1 }]]:

| الأمر | الناتج |
|---|---|
| [[updateOne({}, { $set: { b: "$a" } })]] | [[b: '$a']]: نص حرفي |
| [[updateOne({}, [{ $set: { c: "$a" } }])]] | [[c: 1]]: قيمة الحقل |

نفس [[$set]]، بس جوه [[[ ]]] بقى pipeline.

## الخلاصة

1. ضيف [[schemaVersion]] وخلي الكود يقرا القديم والجديد ويكتب الجديد.
2. انشر.
3. [[updateMany]] بفلتر القديم و pipeline ([[$set]] + [[$unset]]).
4. [[countDocuments]] لحد ما يبقى صفر، وبعدين امسح كود القديم.`,
          lines: [
            "قاعدة crm جديدة.",
            "اتنين بالشكل القديم (name و phone)، وواحد بالجديد ومعاه schemaVersion: 2.",
            "حوّل اللي ملهوش schemaVersion، والتعديل pipeline (array):",
            "مرحلة $set:",
            "الاسم الأول: أول كلمة من name.",
            "الاسم التاني: تاني كلمة، أو نص فاضي لو مفيش.",
            "التليفون بقى array فيها الرقم القديم.",
            "علّم المستند إنه بقى v2.",
            "قفلة الـ $set.",
            "شيل الحقلين القدام.",
            "قفلة الـ pipeline والأمر.",
            "اعرض الكل: التلاتة بنفس الشكل.",
            "عدد اللي لسه مش v2: لازم صفر قبل ما تمسح كود القراية القديم."
          ],
          sol: R`[[toV2]] لسارة القديمة بترجّع [[{ _id: 1, firstName: 'Sara', lastName: 'Ali', phones: ['01001234567'], schemaVersion: 2 }]]، ولعمر بترجّعه زي ما هو.

الـ update العادي حط [[b: '$a']] (النص نفسه)، والـ pipeline حط [[c: 1]] (قيمة a). عشان كده أي update بيحسب من حقول المستند لازم يبقى array.`,
          solCode: R`function toV2(d) {
  if (d.schemaVersion === 2) return d;
  const [firstName, lastName = ""] = (d.name || "").split(" ");
  return { _id: d._id, firstName, lastName, phones: d.phone ? [d.phone] : [], schemaVersion: 2 };
}
db.members.find().toArray().map(toV2)
db.t.insertOne({ a: 1 })
db.t.updateOne({}, { $set: { b: "$a" } })
db.t.updateOne({}, [{ $set: { c: "$a" } }])
db.t.findOne()`
        },
      ]
    },
    {
      t: "replica set: نسخ وتغييرات لحظية",
      l: 3,
      n: "٣ nodes في Docker، و failover بتشوفه بعينك، و writeConcern majority، و change streams تسمع كل تغيير من غير polling",
      items: [
        {
          cmd: "replica set بـ 3 nodes",
          title: "٣ نسخ من القاعدة: لو واحدة وقعت التانية تكمّل",
          desc: R`replica set = كذا [[mongod]] شايلين نفس البيانات: واحد **PRIMARY** بيستقبل الكتابة، والباقيين **SECONDARY** بينسخوا منه أول بأول. لو الـ primary وقع، الباقيين بينتخبوا primary جديد في حوالي ١٠ ثواني، والتطبيق بيكمّل لوحده لو الـ connection string فيه كل الـ nodes.

الانتخاب محتاج أغلبية (٢ من ٣)، عشان كده الإنتاج ٣ nodes مش ٢.`,
          example: R`docker network create mongo-net
docker run -d --name m1 --network mongo-net mongo:8 --replSet rs0
docker run -d --name m2 --network mongo-net mongo:8 --replSet rs0
docker run -d --name m3 --network mongo-net mongo:8 --replSet rs0
docker exec m1 mongosh --quiet --eval 'rs.initiate({ _id: "rs0", members: [{ _id: 0, host: "m1:27017" }, { _id: 1, host: "m2:27017" }, { _id: 2, host: "m3:27017" }] })'
docker exec m1 mongosh --quiet --eval 'rs.status().members.map(m => m.name + " " + m.stateStr)'
docker exec m1 mongosh --quiet --eval 'db.getSiblingDB("shop").pings.insertOne({ at: new Date() }, { writeConcern: { w: "majority", wtimeout: 5000 } })'
docker kill m1
docker exec m2 mongosh --quiet --eval 'rs.status().members.map(m => m.name + " " + m.stateStr)'
docker start m1`,
          try: R`وانت الـ ٣ شغالين: اقفل اتنين منهم ([[docker kill]]) وجرّب [[insertOne]] على اللي فاضل. وبعدين رجّعهم بـ [[docker start]] وشوف مين بقى primary. وفي الآخر نضّف: [[docker rm -f -v m1 m2 m3]] و [[docker network rm mongo-net]].`,
          deep: {
            why: "Mongo واحد (standalone) لو السيرفر وقع أو اتعمله restart للتحديث، الموقع واقف. replica set بيدّيك: high availability (failover أوتوماتيك)، ونسخة لحظية من البيانات على سيرفر تاني، والـ transactions و change streams (مش شغالين على standalone خالص). Atlas وأي Mongo مُدار بيبقى replica set من أول يوم.",
            how: R`[[--replSet rs0]] بيقول لكل [[mongod]] إنه عضو في set اسمها rs0، بس لسه مش عارف الباقيين. [[rs.initiate(config)]] مرة واحدة على أي واحد: بيسجّل الأعضاء بأساميهم اللي يوصلوا بيها لبعض ([[m1:27017]] = اسم الـ container على شبكة Docker). بعدها بثواني بيحصل انتخاب ويطلع primary.

الـ primary بيكتب كل عملية في الـ [[oplog]] (collection خاصة في قاعدة [[local]])، والـ secondaries بيقروها وينفّذوها. [[rs.status()]] بيوريك حالة كل عضو ([[stateStr]]).

الانتخاب: كل عضو بيبعت heartbeat كل ثانيتين. لو الـ primary مردّش لمدة [[electionTimeoutMillis]] (افتراضيًا 10000)، secondary بيرشّح نفسه، ولو أخد أغلبية الأصوات (٢ من ٣) بقى primary. جربت [[docker kill]] على الـ primary وتطبيق Node بيكتب كل ثانية: كتابة واحدة أخدت [[10346ms]] ونجحت (الـ driver استنى وأعاد المحاولة لوحده بـ retryable writes)، والباقي رجع ٦-١٠ ملّي ثانية على الـ primary الجديد. ولما قفلت اتنين من ٣: اللي فاضل نزل SECONDARY ورفض الكتابة بـ [[NotWritablePrimary]]، لأن ١ من ٣ مش أغلبية.

[[writeConcern: { w: "majority" }]]: الكتابة ترجع نجاح بعد ما أغلبية الأعضاء يكتبوها، فلو الـ primary وقع بعدها مش هتضيع (rollback). ده الافتراضي من MongoDB 5.0. و [[wtimeout]] أقصى انتظار.

التطبيق بيتصل بـ [[mongodb://m1:27017,m2:27017,m3:27017/?replicaSet=rs0]]: الـ driver بيكتشف مين الـ primary ويحوّل لوحده. و [[readPreference=secondaryPreferred]] يخلي القراية من الـ secondaries (ممكن تبقى متأخرة شوية).`,
          when: "أي Mongo على الإنتاج (أقل حاجة ٣ أعضاء على ٣ سيرفرات أو zones مختلفة)، ولو هتستخدم transactions أو change streams حتى في التطوير (عضو واحد كفاية، زي درس «transactions و replica set»). ولو مش عايز تشيل الهم: Atlas.",
          mistakes: R`replica set من ٢ أعضاء: لو واحد وقع، التاني ميقدرش ياخد أغلبية فيقف (أسوأ من standalone). لو مضطر، العضو التالت يبقى arbiter (بيصوّت بس). وتحط الـ ٣ على نفس السيرفر في الإنتاج: السيرفر يقع ياخدهم كلهم. و [[rs.initiate()]] من غير config في Docker بيسجّل الـ hostname العشوائي للـ container. وتوصل التطبيق بـ node واحدة من غير [[replicaSet=]] فميعرفش يحوّل. ومع auth لازم [[--keyFile]] بين الأعضاء (المثال من غير auth للتجربة بس، وبورتاته مش مفتوحة برّه Docker).`
          },
          teach: R`## الفكرة: ٣ نسخ ورئيس واحد

اتشغّل على Docker Desktop (WSL2) بـ [[mongo:8]] (8.3). تحت كل أمر الناتج الحقيقي. (في التجربة سمّيت الـ containers بأسامي تانية ونفس الـ aliases [[m1]] و [[m2]] و [[m3]]، فالناتج زي ما هتشوفه.)

---

## ١. [[docker network create mongo-net]]

شبكة Docker خاصة. أي container عليها يقدر يوصل للتاني **باسمه**: [[m2]] يوصل لـ [[m1:27017]]. من غيرها كانوا هيحتاجوا IPs بتتغير.

## ٢. ٣ مرات [[docker run ... --replSet rs0]]

~~~bash
docker run -d --name m1 --network mongo-net mongo:8 --replSet rs0
~~~

| الحتة | معناها |
|---|---|
| [[-d]] | في الخلفية |
| [[--name m1]] | اسم الـ container (وده اسمه على الشبكة) |
| [[--network mongo-net]] | على الشبكة اللي عملناها |
| [[mongo:8]] | الـ image |
| [[--replSet rs0]] | أي حاجة بعد الـ image بتروح لـ [[mongod]]: «انت عضو في set اسمها rs0» |

مفيش [[-p]]: البورتات مش مفتوحة على جهازك، الـ ٣ بيكلموا بعض جوه الشبكة بس.

## ٣. [[rs.initiate(...)]]

~~~bash
docker exec m1 mongosh --quiet --eval 'rs.initiate({ _id: "rs0", members: [...] })'
~~~

- [[docker exec m1 mongosh]]: شغّل mongosh جوه m1.
- [[--quiet]]: من غير رسالة الترحيب.
- [[--eval '...']]: نفّذ الكود ده واخرج.
- [[_id: "rs0"]]: لازم نفس اسم [[--replSet]].
- [[members]]: كل عضو برقم و [[host]] بالاسم اللي الباقيين يوصلوله بيه.

~~~text الناتج (مختصر)
{ ok: 1, '$clusterTime': { ... }, operationTime: Timestamp({ t: 1793140611, i: 1 }) }
~~~

## ٤. [[rs.status()]]

استنى ١٠ ثواني تقريبًا (الانتخاب الأول)، وبعدين:

~~~bash
docker exec m1 mongosh --quiet --eval 'rs.status().members.map(m => m.name + " " + m.stateStr)'
~~~

[[rs.status().members]] array فيها تفاصيل كتير لكل عضو، و [[.map(m => ...)]] بتطلّع منها سطر لكل واحد: الاسم والحالة.

~~~text الناتج
[ 'm1:27017 PRIMARY', 'm2:27017 SECONDARY', 'm3:27017 SECONDARY' ]
~~~

## ٥. كتابة بـ [[w: "majority"]]

~~~javascript
db.getSiblingDB("shop").pings.insertOne({ at: new Date() }, { writeConcern: { w: "majority", wtimeout: 5000 } })
~~~

- [[getSiblingDB("shop")]]: زي [[use shop]] بس جوه كود.
- [[w: "majority"]]: متقولش «تمام» غير لما ٢ من ٣ يكونوا كتبوها.
- [[wtimeout: 5000]]: لو مخلصتش في ٥ ثواني، ارجع بـ error (الكتابة نفسها مش بتتلغي).

~~~text الناتج
{ acknowledged: true, insertedId: ObjectId('...') }
~~~

---

## ٦. [[docker kill m1]]: الـ primary وقع فجأة

[[kill]] بيقفله فورًا من غير shutdown نضيف (زي ما الكهربا تقطع). [[docker stop]] كان هيخليه يسلّم الرئاسة بهدوء الأول.

~~~bash
docker exec m2 mongosh --quiet --eval 'rs.status().members.map(m => m.name + " " + m.stateStr)'
~~~

~~~text الناتج بعد ~١٠ ثواني
[ 'm1:27017 (not reachable/healthy)', 'm2:27017 PRIMARY', 'm3:27017 SECONDARY' ]
~~~

(مين بيكسب الانتخاب، m2 ولا m3، مش ثابت.)

### والتطبيق شايف إيه؟

شغّلت سكربت Node (driver 7.7) على نفس الشبكة بيكتب كل ثانية بـ [[mongodb://m1:27017,m2:27017,m3:27017/?replicaSet=rs0]] ويطبع مين الـ primary، و [[docker kill]] للـ primary في النص:

~~~text الناتج
4 ok m2:27017 10ms
5 ok m1:27017 10346ms
6 ok m1:27017 7ms
~~~

الكتابة رقم ٥ استنت ١٠.٣ ثانية (مدة [[electionTimeoutMillis]] = 10000 + الانتخاب) **ونجحت**: الـ driver لقى الـ primary الجديد وأعاد الكتابة لوحده (retryable writes، شغالة افتراضيًا). ولا error وصل للكود.

## ٧. [[docker start m1]]

بيرجع كـ SECONDARY، ويكمّل النسخ من الـ oplog اللي فاته.

---

## ٨. لو وقع اتنين؟

قفلت اتنين، وجرّبت أكتب على الفاضل:

~~~text الناتج
m1:27017 SECONDARY | m2:27017 (not reachable/healthy) | m3:27017 (not reachable/healthy)
NotWritablePrimary | not primary
~~~

واحد من ٣ مش أغلبية، فنزل secondary بنفسه ورفض الكتابة. ده مقصود: لو الشبكة اتقسمت، ميبقاش فيه اتنين primary بيكتبوا بيانات مختلفة. والقراية من عليه لسه شغالة.

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[--replSet rs0]] | اسم الـ set لكل عضو |
| [[rs.initiate(config)]] | مرة واحدة، بأسامي يوصلوا بيها لبعض |
| [[rs.status()]] | حالة كل عضو |
| أغلبية | ٢ من ٣ عشان ينتخبوا ويكتبوا |
| [[w: "majority"]] | الكتابة مش هتضيع لو الـ primary وقع |
| connection string | كل الأعضاء + [[replicaSet=rs0]] |

وفي الإنتاج: كل عضو على سيرفر لوحده، و auth + [[keyFile]]، أو Atlas.`,
          lines: [
            "شبكة Docker عشان الـ containers يوصلوا لبعض بالاسم.",
            "أول عضو: mongod في set اسمها rs0.",
            "تاني عضو.",
            "تالت عضو.",
            "ابدأ الـ set مرة واحدة: اسمها والأعضاء بأساميهم على الشبكة.",
            "اسم وحالة كل عضو: واحد PRIMARY واتنين SECONDARY.",
            "كتابة بترجع بعد ما أغلبية الأعضاء يكتبوها، وأقصى انتظار 5 ثواني.",
            "اقفل الـ primary فجأة.",
            "اسأل عضو تاني: بعد حوالي 10 ثواني فيه primary جديد.",
            "رجّع العضو القديم: هيرجع SECONDARY ويلحق اللي فاته."
          ],
          sol: R`لما اتنين يقعوا، اللي فاضل بيبقى [[SECONDARY]] والكتابة بترجع [[NotWritablePrimary]] (not primary)، لأن ١ من ٣ مش أغلبية. بعد [[docker start]] للاتنين، في خلال ثواني بيحصل انتخاب ويطلع primary (مش لازم يبقى نفس القديم)، والكتابة ترجع تشتغل.

التنضيف: [[docker rm -f -v m1 m2 m3]] بيشيل الـ containers ومعاها الـ volumes المجهولة اللي فيها البيانات، و [[docker network rm mongo-net]] يشيل الشبكة.`,
          solCode: R`docker kill m2 m3
docker exec m1 mongosh --quiet --eval 'try { db.getSiblingDB("shop").pings.insertOne({ x: 1 }) } catch (e) { print(e.codeName, e.message) }'
docker start m2 m3
docker exec m1 mongosh --quiet --eval 'rs.status().members.map(m => m.name + " " + m.stateStr)'
docker rm -f -v m1 m2 m3
docker network rm mongo-net`
        },
        {
          cmd: "change streams",
          title: "اسمع كل تغيير في الـ collection لحظة ما يحصل",
          desc: R`[[db.collection.watch()]] بيفتح cursor بيوصلك منه كل insert و update و delete أول ما يحصل، من غير ما تسأل القاعدة كل ثانية (polling). تفلتر الأحداث بـ pipeline، وتطلب المستند كامل بعد التعديل بـ [[fullDocument: "updateLookup"]]، ولو التطبيق وقع ترجع تكمّل من آخر حدث بـ resume token.

شغال على replica set بس (حتى عضو واحد)، لأنه بيقرا من الـ oplog.`,
          example: R`use shop
const cs = db.orders.watch([{ $match: { operationType: { $in: ["insert", "update"] } } }], { fullDocument: "updateLookup" })
db.orders.insertOne({ _id: 202, userId: 2, status: "pending", total: 700 })
db.orders.updateOne({ _id: 202 }, { $set: { status: "paid" } })
const e1 = cs.tryNext()
cs.tryNext()
cs.tryNext()
cs.close()
db.orders.watch([], { resumeAfter: e1._id }).tryNext()`,
          try: R`على replica set (زي [[mongo-rs]] في درس «transactions و replica set»): شغّل المثال. وبعدين جرّب: افتح stream جديد بـ [[updateLookup]]، واعمل update وبعده على طول [[deleteOne]] لنفس الأوردر، وبعدين اقرا حدث الـ update. [[fullDocument]] طلع إيه؟ وجرّب [[watch()]] على Mongo standalone.`,
          flag: "script",
          deep: {
            why: "«ابعت إشعار لما الأوردر يتدفع»، «حدّث الداشبورد لايف»، «انسخ التغييرات لـ Elasticsearch أو cache». الحل الساذج: query كل ثانية على [[updatedAt]] (بطيء، وبيفوّت حاجات، وبيضغط على القاعدة). أو تحط الكود ده في كل مكان بيكتب (وتنسى مكان). change streams بيدّيك كل تغيير من القاعدة نفسها، بالترتيب، ومهما كان مين اللي كتب.",
            how: R`[[watch(pipeline, options)]] على collection أو قاعدة ([[db.watch()]]) أو الـ cluster كله. الـ pipeline بيفلتر الأحداث بـ [[$match]] و [[$project]]. كل حدث فيه: [[_id]] (الـ resume token)، و [[operationType]] (insert/update/replace/delete...)، و [[documentKey]]، و [[ns]] (القاعدة والـ collection)، و [[clusterTime]]، وفي الـ insert [[fullDocument]]، وفي الـ update [[updateDescription.updatedFields]] (اللي اتغير بس).

[[fullDocument: "updateLookup"]]: مع كل update، Mongo بيجيب المستند كامل **وقت ما انت بتقرا الحدث**، مش وقت التعديل. لو اتمسح في النص بيرجع [[null]] (جربتها). لو محتاج الشكل وقت التعديل بالظبط، فعّل [[changeStreamPreAndPostImages]] على الـ collection واستخدم [[fullDocument: "whenAvailable"]] أو [[fullDocumentBeforeChange]] (جربت الأخير: حدث الـ delete جه ومعاه المستند قبل ما يتمسح).

الـ resume token: احفظ [[_id]] آخر حدث عالجته (في collection أو Redis). لو التطبيق اتقفل، [[watch([], { resumeAfter: token })]] بيكمّل من بعده بالظبط، ومش بيفوّت حاجة، طول ما الحدث لسه في الـ oplog (الـ oplog حجمه محدود، فلو وقفت أيام ممكن تلاقي error إن التاريخ اتمسح).

في Node: [[for await (const change of collection.watch(...))]] بيستنى الأحداث، و [[stream.resumeToken]] آخر token، والـ driver بيعيد الاتصال لوحده بعد failover. جربته على replica set بـ ٣ أعضاء بـ mongodb driver 7.7.

على standalone: [[The $changeStream stage is only supported on replica sets or mongos]] (جربتها).`,
          when: "إشعارات و webhooks لما حاجة تتغير، و sync لـ cache أو search index أو data warehouse، و audit log، وداشبورد لايف (مع WebSocket للمتصفح). ولو محتاج يتنفّذ مرة واحدة بالظبط حتى لو عندك كذا نسخة من التطبيق، شغّل الـ watcher في process واحدة أو استخدم lock، وإلا كل نسخة هتبعت نفس الإيميل.",
          mistakes: R`تفتكر إن [[fullDocument]] في الـ update هو المستند لحظة التعديل: هو المستند **دلوقتي**، وممكن يبقى null. وتعالج الحدث وتحفظ الـ token قبل ما المعالجة تنجح، فلو وقعت في النص الحدث ضاع: احفظ الـ token بعد النجاح. وتفتح stream لكل request أو لكل يوزر: كل stream cursor على السيرفر، فافتح واحد وفرّق الأحداث في التطبيق. وتنسى إن الـ stream مبيشوفش اللي حصل قبل ما يتفتح إلا بـ resume token أو [[startAtOperationTime]].`
          },
          teach: R`## الفكرة: القاعدة بتقولك «حصل كذا»

اتشغّل على [[mongo:8]] (8.3) شغال كـ replica set بعضو واحد ([[--replSet rs0]] و [[rs.initiate()]])، في mongosh 2.14.

---

## ١. افتح الـ stream

~~~javascript
const cs = db.orders.watch([{ $match: { operationType: { $in: ["insert", "update"] } } }], { fullDocument: "updateLookup" })
~~~

| الحتة | معناها |
|---|---|
| [[db.orders.watch(...)]] | اسمع تغييرات [[orders]] من اللحظة دي |
| [[[{ $match: ... }]]] | pipeline على **الأحداث** مش المستندات |
| [[operationType: { $in: [...] }]] | الإضافة والتعديل بس، من غير المسح |
| [[fullDocument: "updateLookup"]] | مع كل update هات المستند كامل |
| [[const cs]] | الـ cursor اللي هنقرا منه |

## ٢. نعمل تغييرين

~~~javascript
db.orders.insertOne({ _id: 202, userId: 2, status: "pending", total: 700 })
db.orders.updateOne({ _id: 202 }, { $set: { status: "paid" } })
~~~

## ٣. [[cs.tryNext()]]: هات الحدث اللي جاي لو موجود

[[tryNext()]] بيرجّع الحدث، أو [[null]] لو مفيش حاجة جديدة (من غير ما يستنى). أول واحد:

~~~text الناتج (أول حدث)
{
  _id: { _data: '826AE12765000000012B042C0100296E5A1004...' },
  operationType: 'insert',
  clusterTime: Timestamp({ t: 1793140581, i: 1 }),
  wallTime: ISODate('2026-10-27T22:36:21.880Z'),
  fullDocument: { _id: 202, userId: 2, status: 'pending', total: 700 },
  ns: { db: 'shop', coll: 'orders' },
  documentKey: { _id: 202 }
}
~~~

| الحقل | معناه |
|---|---|
| [[_id._data]] | **الـ resume token**: مكان الحدث ده في الـ oplog |
| [[operationType]] | نوع العملية |
| [[clusterTime]] / [[wallTime]] | إمتى حصلت |
| [[fullDocument]] | المستند اللي اتضاف |
| [[ns]] | namespace: القاعدة والـ collection |
| [[documentKey]] | الـ [[_id]] بتاع المستند |

التاني:

~~~text الناتج (تاني حدث، مختصر)
{
  operationType: 'update',
  documentKey: { _id: 202 },
  updateDescription: { updatedFields: { status: 'paid' }, removedFields: [], truncatedArrays: [] },
  fullDocument: { _id: 202, userId: 2, status: 'paid', total: 700 }
}
~~~

[[updatedFields]] اللي اتغير بس، و [[fullDocument]] المستند كله بفضل [[updateLookup]]. والتالت [[null]]: مفيش أحداث تانية.

## ٤. [[cs.close()]]

اقفل الـ cursor على السيرفر.

---

## ٥. الـ resume token: كمّل من مكان ما وقفت

~~~javascript
db.orders.watch([], { resumeAfter: e1._id }).tryNext()
~~~

[[e1]] كان حدث الـ insert. [[resumeAfter: e1._id]] = ابدأ من **بعد** الحدث ده:

~~~text الناتج (مختصر)
{ operationType: 'update', updateDescription: { updatedFields: { status: 'paid' } } }
~~~

رجّع حدث الـ update اللي حصل وإحنا مش فاتحين stream. في التطبيق: بعد ما تعالج كل حدث احفظ الـ token، ولما يقوم تاني ابدأ بـ [[resumeAfter]].

---

## ٦. فخ [[updateLookup]]

update وبعده على طول delete لنفس المستند، وبعدين قريت حدث الـ update:

~~~text الناتج
operationType: 'update', updateDescription: { updatedFields: { status: 'paid' } }, fullDocument: null
~~~

[[null]] لأن [[updateLookup]] بيدوّر على المستند **وقت القراية**، وهو كان اتمسح. لو محتاج النسخة وقت الحدث:

~~~javascript
db.runCommand({ collMod: "orders", changeStreamPreAndPostImages: { enabled: true } })
db.orders.watch([], { fullDocumentBeforeChange: "whenAvailable" })
~~~

وجربتها على delete: الحدث جه ومعاه [[fullDocumentBeforeChange: { _id: 202, userId: 2, status: 'paid', total: 700 }]]. (بتاخد مساحة زيادة، ففعّلها على الـ collections اللي محتاجاها بس.)

---

## ٧. نفس الكلام من Node

~~~javascript
const stream = orders.watch([{ $match: { "fullDocument.status": "paid" } }], { fullDocument: "updateLookup" });
for await (const change of stream) {
  console.log(change.operationType, change.fullDocument._id, change.fullDocument.status);
  break;
}
~~~

[[for await]] بيستنى كل حدث جديد للأبد (مش [[tryNext]]). جربته (mongodb driver 7.7، replica set بـ ٣ أعضاء): insert لأوردر pending ثم update لـ paid. الفلتر على [[fullDocument.status]] عدّى الـ update بس:

~~~text الناتج
update 302 paid
~~~

و [[stream.resumeToken]] فيه آخر token تحفظه. ولاحظ: لما جربت [[stream.close()]] جوه الـ [[for await]] رمى [[ChangeStream is closed]]؛ اطلع بـ [[break]] (بيقفله لوحده).

---

## ٨. على standalone

~~~text الناتج
Location40573 | The $changeStream stage is only supported on replica sets or mongos
~~~

## الخلاصة

| الحاجة | الشكل |
|---|---|
| افتح | [[coll.watch(pipeline, options)]] |
| فلتر | [[$match]] على [[operationType]] أو [[fullDocument.x]] |
| المستند بعد التعديل | [[fullDocument: "updateLookup"]] (وقت القراية) |
| قبل التعديل | [[changeStreamPreAndPostImages]] + [[fullDocumentBeforeChange]] |
| كمّل بعد وقوع | احفظ [[_id]] الحدث و [[resumeAfter]] |
| الشرط | replica set |`,
          lines: [
            "ادخل قاعدة shop (على replica set).",
            "افتح stream على الأوردرات: الإضافة والتعديل بس، ومع كل update المستند كامل.",
            "اعمل أوردر جديد (حدث insert).",
            "عدّله لـ paid (حدث update).",
            "اقرا أول حدث (الـ insert) واحفظه في e1.",
            "اقرا التاني: update ومعاه updatedFields و fullDocument.",
            "التالت: null، مفيش أحداث تانية.",
            "اقفل الـ stream.",
            "stream جديد بيبدأ من بعد e1: بيرجّع حدث الـ update اللي فات."
          ],
          sol: R`update ثم delete ثم قراية حدث الـ update: [[fullDocument: null]]، لأن [[updateLookup]] دوّر على المستند وقت القراية ولقاه اتمسح. لكن [[updateDescription.updatedFields]] فيه التعديل صح.

على standalone: [[The $changeStream stage is only supported on replica sets or mongos]].`,
          solCode: R`const cs2 = db.orders.watch([], { fullDocument: "updateLookup" })
db.orders.insertOne({ _id: 203, status: "pending", total: 100 })
db.orders.updateOne({ _id: 203 }, { $set: { status: "paid" } })
db.orders.deleteOne({ _id: 203 })
cs2.tryNext()
cs2.tryNext()
cs2.close()`
        },
      ]
    }
]);

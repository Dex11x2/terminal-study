// تكملة تاب mongo: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/mongo/01.js (شرح حقول الدرس في أوله)
MORE("mongo", [
    {
      t: "aggregate متقدم: تقارير في طلب واحد",
      l: 2,
      n: "$lookup بشروط، و $facet لصفحة بحث كاملة، و $setWindowFields للمجموع التراكمي، و accumulators زي $topN، و $merge يحفظ التقرير",
      items: [
        {
          cmd: "$lookup بـ pipeline",
          title: "join بشروط: آخر أوردرين مدفوعين لكل يوزر",
          desc: R`الشكل البسيط لـ [[$lookup]] ([[localField]] و [[foreignField]]) بيجيب **كل** المستندات اللي بتساوي. لو محتاج شرط زيادة (المدفوع بس، فوق ٥٠٠)، أو ترتيب و [[$limit]]، أو حقول معينة، بتدّيله [[pipeline]]: aggregate صغير بيتنفّذ على الـ collection التانية لكل مستند داخل.

[[let]] بيعرّف متغيرات من المستند الحالي، وجوه الـ pipeline بتقراها بـ [[$$اسم]] جوه [[$expr]].`,
          example: R`use shop
db.users.aggregate([
  { $lookup: {
      from: "orders",
      let: { uid: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$userId", "$$uid"] }, status: "paid", total: { $gte: 500 } } },
        { $sort: { createdAt: -1 } },
        { $limit: 2 },
        { $project: { _id: 0, total: 1, createdAt: 1 } }
      ],
      as: "lastOrders"
  } },
  { $project: { _id: 0, name: 1, lastOrders: 1 } }
])
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })
db.users.aggregate([{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", pipeline: [{ $match: { status: "paid" } }, { $group: { _id: null, n: { $sum: 1 }, spent: { $sum: "$total" } } }], as: "stats" } }, { $project: { _id: 0, name: 1, stats: { $first: "$stats" } } }])`,
          try: R`حمّل بيانات الـ solCode (٣ يوزرز و ٦ منتجات و ٨ أوردرات). شغّل المثال، وبعدين غيّر [[$$uid]] لـ [[$uid]] (دولار واحد) وشوف [[lastOrders]] بقت إيه. وفي الآخر اكتب [[$lookup]] على [[products]] يجيب لكل منتج عدد الأوردرات المدفوعة اللي هو فيها (المنتج جوه [[items.productId]]).`,
          flag: "script",
          deep: {
            why: "التقارير الحقيقية نادرًا ما تبقى «هات كل اللي بيساوي». «آخر أوردرين لكل عميل»، «المنتجات اللي اتباعت الشهر ده بس»، «عدد الأوردرات المدفوعة لكل يوزر» كلها join بشرط. من غير pipeline هتجيب كل الأوردرات في array ضخمة وبعدين تفلترها بـ [[$filter]]، أو تعمل query لكل يوزر من Node (N+1).",
            how: R`[[let: { uid: "$_id" }]] بياخد [[_id]] بتاع اليوزر الحالي ويحطه في متغير. جوه الـ [[pipeline]] الحقول بـ [[$]] واحد بتشاور على مستند الأوردر، والمتغيرات بـ [[$$]]. والمقارنة بين حقل ومتغير لازم تبقى expression، فبتتكتب جوه [[$expr]]. باقي شروط [[$match]] العادية ([[status: "paid"]]) بتتكتب عادي جنبها.

الـ pipeline بتتنفذ لكل يوزر لوحده، فـ [[$sort]] و [[$limit: 2]] معناهم «آخر اتنين لليوزر ده»، مش لكل الأوردرات.

من MongoDB 5.0 فيه شكل مختصر: [[localField]] و [[foreignField]] للمساواة، ومعاهم [[pipeline]] للباقي (آخر سطر). أسهل في القراية ومش محتاج [[let]] ولا [[$expr]].

السرعة: [[$expr]] مع [[$eq]] جوه pipeline الـ lookup بيستخدم index من MongoDB 5.0. جرّبت explain على mongo:8.3: من غير index كل يوزر عمل collection scan ([[collectionScans: 3]] و [[totalDocsExamined: 24]] لـ ٣ يوزرز × ٨ أوردرات)، وبعد [[{ userId: 1, status: 1, createdAt: -1 }]] بقى [[collectionScans: 0]] و ٥ مستندات بس.`,
            when: "تقارير ولوحات إدارة: آخر N لكل حاجة، أو join بشرط مدى (تاريخ بين اتنين)، أو تجيب حقول قليلة من مستندات كبيرة. ولو نفس الـ join محتاجه في كل request عادي، فكّر تنسخ البيانات (درس «embed ولا reference»).",
            mistakes: R`تكتب [[$uid]] بدل [[$$uid]]: Mongo هيدوّر على حقل اسمه [[uid]] في الأوردر ومش هيلاقيه، فالـ array بترجع فاضية من غير error (جربتها: [[n: 0]]). وتكتب [[{ $match: { userId: "$$uid" } }]] من غير [[$expr]]: ده بيقارن بالنص الحرفي "$$uid"، وبرضه بيرجّع صفر. وتنسى الـ index على الـ collection التانية، فكل مستند داخل بيعمل scan كامل.`
          },
          teach: R`## الفكرة: aggregate صغير جوه aggregate

درس «$lookup و $unwind» (في قسم تصميم المستندات) كان join بالمساواة بس. هنا عايزين لكل يوزر: **آخر أوردرين مدفوعين قيمتهم ٥٠٠ أو أكتر**، بالمبلغ والتاريخ بس. ده محتاج فلتر وترتيب و limit جوه الـ join نفسه. كل اللي تحت اتشغّل في mongosh 2.14 على [[mongo:8]] (8.3) ببيانات الـ solCode.

---

## ١. [[from]] و [[let]]

~~~javascript
{ $lookup: {
    from: "orders",
    let: { uid: "$_id" },
~~~

- [[from]]: الـ collection اللي هنجيب منها.
- [[let]]: متغيرات بتتاخد من **المستند الداخل** (اليوزر). [[uid]] اسم اخترناه، وقيمته [["$_id"]] بتاع اليوزر. لليوزر سارة [[uid]] = 1.

ليه متغير؟ لأن جوه الـ pipeline إحنا «واقفين» على مستندات الأوردرات، و [[$_id]] هناك معناه id الأوردر. فلازم نشيل id اليوزر في متغير قبل ما ندخل.

---

## ٢. [[pipeline]]: بيتنفّذ لكل يوزر لوحده

### الفلتر

~~~javascript
{ $match: { $expr: { $eq: ["$userId", "$$uid"] }, status: "paid", total: { $gte: 500 } } }
~~~

| الحتة | معناها |
|---|---|
| [["$userId"]] | دولار واحد: حقل في الأوردر |
| [["$$uid"]] | دولارين: المتغير اللي عرّفناه في [[let]] |
| [[$eq: [a, b]]] | expression: a بتساوي b؟ |
| [[$expr]] | «الشرط ده expression مش شكل find العادي»، ولازم عشان نقارن حقل بمتغير |
| [[status: "paid"]] و [[total: { $gte: 500 }]] | شروط عادية بنفس شكل find |

### الترتيب والعدد والشكل

~~~javascript
{ $sort: { createdAt: -1 } },
{ $limit: 2 },
{ $project: { _id: 0, total: 1, createdAt: 1 } }
~~~

الأحدث الأول، واتنين بس، والحقلين دول بس. وده لكل يوزر، مش للأوردرات كلها.

### [[as]]

الناتج بيتحط في array جديدة اسمها [[lastOrders]] جوه مستند اليوزر.

---

## ٣. الناتج

~~~text الناتج
[
  { name: 'Sara', lastOrders: [
      { createdAt: ISODate('2026-09-02T12:00:00.000Z'), total: 6600 },
      { createdAt: ISODate('2026-09-01T10:00:00.000Z'), total: 1500 } ] },
  { name: 'Omar', lastOrders: [ { createdAt: ISODate('2026-09-04T20:00:00.000Z'), total: 32000 } ] },
  { name: 'Mona', lastOrders: [ { createdAt: ISODate('2026-09-03T09:00:00.000Z'), total: 890 } ] }
]
~~~

نقراه:

- سارة عندها ٣ أوردرات مدفوعة، بس أوردر الـ 270 أقل من ٥٠٠ فخرج، وفضل اتنين.
- عمر عنده 300 (أقل من ٥٠٠) و 6000 (cancelled) و 32000، فطلع واحد بس.
- منى عندها 890 مدفوع، و 1200 لسه pending فمش محسوب.

---

## ٤. الـ index: ليه مهم هنا بالذات

الـ pipeline بتتنفّذ **مرة لكل يوزر**. ١٠ آلاف يوزر = ١٠ آلاف بحث في الأوردرات. فشغّلت explain:

~~~javascript
db.users.explain("executionStats").aggregate([ { $lookup: { ... } } ])
~~~

وقريت مرحلة [[$lookup]] من الناتج:

| | من غير index | بعد [[createIndex({ userId: 1, status: 1, createdAt: -1 })]] |
|---|---|---|
| [[collectionScans]] | 3 (scan كامل لكل يوزر) | 0 |
| [[totalDocsExamined]] | 24 (٣ × ٨ أوردرات) | 5 |
| [[indexesUsed]] | [[[]]] | [[['userId_1_status_1_createdAt_-1']]] |

ترتيب الـ index بقاعدة ESR (درس «compound index و ESR»): [[userId]] و [[status]] مساواة، وبعدين [[createdAt]] للترتيب، فالـ [[$sort]] بيمشي على الـ index ومش بيرتّب في الذاكرة.

---

## ٥. الشكل المختصر (MongoDB 5.0+)

~~~javascript
{ $lookup: { from: "orders", localField: "_id", foreignField: "userId",
             pipeline: [{ $match: { status: "paid" } }, { $group: { _id: null, n: { $sum: 1 }, spent: { $sum: "$total" } } }],
             as: "stats" } }
~~~

المساواة بـ [[localField]] و [[foreignField]] زي الشكل البسيط، والـ [[pipeline]] بتشتغل على الأوردرات اللي ساوت بس. هنا بتجمّعهم لرقمين: عددهم ومجموعهم. و [[$first: "$stats"]] في [[$project]] بياخد أول عنصر من الـ array عشان يبقى object:

~~~text الناتج
[
  { name: 'Sara', stats: { _id: null, n: 3, spent: 8370 } },
  { name: 'Omar', stats: { _id: null, n: 2, spent: 32300 } },
  { name: 'Mona', stats: { _id: null, n: 1, spent: 890 } }
]
~~~

---

## ٦. الغلطتين اللي مش بيطلعوا error

جرّبت الاتنين على أول يوزر:

~~~text الناتج
$eq: ["$userId", "$uid"]          →  n: 0   (دوّر على حقل اسمه uid في الأوردر)
{ $match: { userId: "$$uid" } }    →  n: 0   (قارن بالنص "$$uid" حرفيًا)
~~~

الاتنين بيرجّعوا array فاضية في صمت، فالتقرير يطلع أصفار.

## الخلاصة

| عايز | اكتب |
|---|---|
| مساواة بس | [[localField]] + [[foreignField]] |
| مساواة + فلتر/ترتيب/limit/حقول | [[localField]] + [[foreignField]] + [[pipeline]] |
| شرط مش مساواة (مدى، أكبر من حقل) | [[let]] + [[pipeline]] + [[$expr]] |

[[$field]] = حقل في المستند اللي واقف عليه، [[$$var]] = متغير من [[let]]. وحط index على حقول الشرط في الـ collection التانية.`,
          lines: [
            "ادخل قاعدة shop.",
            "ابدأ pipeline على اليوزرز.",
            "مرحلة join:",
            "هات من collection الأوردرات.",
            "عرّف متغير uid فيه _id بتاع اليوزر الحالي.",
            "pipeline بتتنفذ على الأوردرات لكل يوزر:",
            "فلتر: أوردرات اليوزر ده ($$uid)، المدفوعة، اللي 500 أو أكتر.",
            "الأحدث الأول.",
            "اتنين بس.",
            "المبلغ والتاريخ بس.",
            "قفلة الـ pipeline.",
            "الناتج في array اسمها lastOrders.",
            "قفلة الـ $lookup.",
            "شكل الناتج: الاسم والأوردرات.",
            "قفلة الـ aggregate.",
            "index على الأوردرات بنفس ترتيب الشرط والترتيب، عشان كل بحث جوه الـ lookup يبقى IXSCAN.",
            "الشكل المختصر: مساواة بـ localField/foreignField، و pipeline تجمّع عدد ومجموع المدفوع، و $first يحوّل الـ array لـ object."
          ],
          sol: R`بالبيانات دي: سارة [[6600]] و [[1500]]، وعمر [[32000]] بس، ومنى [[890]].

بـ [[$uid]] (دولار واحد): كل [[lastOrders]] بترجع [[[]]]، لأن Mongo بيدوّر على حقل [[uid]] في الأوردر.

عدد الأوردرات المدفوعة لكل منتج: [[localField: "_id"]] و [[foreignField: "items.productId"]] (المساواة مع array بتطابق لو أي عنصر ساوى)، و [[pipeline]] فيها [[$match]] على [[paid]] و [[$count]]. الناتج: Keyboard 2، و Mouse 2، و Monitor 1، و USB cable 2، و Laptop 1، و Webcam 0 (أوردرها pending).`,
          solCode: R`use shop
db.users.insertMany([{ _id: 1, name: "Sara", city: "Cairo" }, { _id: 2, name: "Omar", city: "Alex" }, { _id: 3, name: "Mona", city: "Cairo" }])
db.products.insertMany([
  { _id: 10, name: "Keyboard", category: "accessories", price: 750 },
  { _id: 11, name: "Mouse", category: "accessories", price: 300 },
  { _id: 12, name: "Monitor", category: "screens", price: 6000 },
  { _id: 13, name: "Webcam", category: "accessories", price: 1200 },
  { _id: 14, name: "Laptop", category: "computers", price: 32000 },
  { _id: 15, name: "USB cable", category: "accessories", price: 90 }
])
db.orders.insertMany([
  { _id: 101, userId: 1, status: "paid", createdAt: ISODate("2026-09-01T10:00:00Z"), items: [{ productId: 10, price: 750, qty: 2 }], total: 1500 },
  { _id: 102, userId: 2, status: "paid", createdAt: ISODate("2026-09-01T15:00:00Z"), items: [{ productId: 11, price: 300, qty: 1 }], total: 300 },
  { _id: 103, userId: 1, status: "paid", createdAt: ISODate("2026-09-02T12:00:00Z"), items: [{ productId: 12, price: 6000, qty: 1 }, { productId: 11, price: 300, qty: 2 }], total: 6600 },
  { _id: 104, userId: 2, status: "cancelled", createdAt: ISODate("2026-09-02T13:00:00Z"), items: [{ productId: 12, price: 6000, qty: 1 }], total: 6000 },
  { _id: 105, userId: 3, status: "paid", createdAt: ISODate("2026-09-03T09:00:00Z"), items: [{ productId: 10, price: 800, qty: 1 }, { productId: 15, price: 90, qty: 1 }], total: 890 },
  { _id: 106, userId: 1, status: "paid", createdAt: ISODate("2026-09-03T18:00:00Z"), items: [{ productId: 15, price: 90, qty: 3 }], total: 270 },
  { _id: 107, userId: 3, status: "pending", createdAt: ISODate("2026-09-04T11:00:00Z"), items: [{ productId: 13, price: 1200, qty: 1 }], total: 1200 },
  { _id: 108, userId: 2, status: "paid", createdAt: ISODate("2026-09-04T20:00:00Z"), items: [{ productId: 14, price: 32000, qty: 1 }], total: 32000 }
])
db.products.aggregate([
  { $lookup: { from: "orders", localField: "_id", foreignField: "items.productId", pipeline: [{ $match: { status: "paid" } }, { $count: "n" }], as: "paid" } },
  { $project: { _id: 0, name: 1, paidOrders: { $ifNull: [{ $first: "$paid.n" }, 0] } } }
])`
        },
        {
          cmd: "$facet و $bucket",
          title: "صفحة بحث كاملة في طلب واحد: النتايج والعدد والفلاتر",
          desc: R`صفحة بحث المنتجات محتاجة ٤ حاجات من نفس الفلتر: الصفحة الحالية، والعدد الكلي (للـ pagination)، وعدد كل category، وعدد كل نطاق سعر. [[$facet]] بيشغّل كذا pipeline على نفس المستندات ويرجّع الناتج في مستند واحد.

و [[$bucket]] بيقسّم قيمة رقمية لنطاقات انت بتحددها (0 لـ 500، و 500 لـ 2000...)، و [[$bucketAuto]] بيقسّمها لعدد نطاقات متساوية تقريبًا لوحده.`,
          example: R`use shop
db.products.aggregate([
  { $match: { price: { $lte: 10000 } } },
  { $facet: {
      results: [{ $sort: { price: 1 } }, { $skip: 0 }, { $limit: 3 }, { $project: { _id: 0, name: 1, price: 1 } }],
      total: [{ $count: "n" }],
      byCategory: [{ $sortByCount: "$category" }],
      byPrice: [{ $bucket: { groupBy: "$price", boundaries: [0, 500, 2000, 10000], default: "other", output: { count: { $sum: 1 }, names: { $push: "$name" } } } }]
  } }
])
db.orders.aggregate([{ $match: { status: "paid" } }, { $bucketAuto: { groupBy: "$total", buckets: 3 } }])`,
          try: R`بنفس بيانات الدرس الأول في القسم ده: هات الصفحة التانية ([[$skip: 3]]). وبعدين شيل [[default: "other"]] وغيّر الـ [[$match]] لـ [[price: { $gte: 0 }]] (يعني اللابتوب بـ 32000 هيدخل)، وشوف إيه اللي حصل.`,
          flag: "script",
          deep: {
            why: "كل موقع فيه بحث (متجر، وظايف، عقارات) بيعرض جنب النتايج «Accessories (4)» و «من 500 لـ 2000 (2)». لو عملت ده بـ ٤ queries، الفلتر بيتنفّذ ٤ مرات، والأرقام ممكن متتطابقش لو حاجة اتغيرت بين query والتانية.",
            how: R`[[$facet]] بياخد object: كل مفتاح اسم، وقيمته pipeline. المستندات اللي خارجة من المرحلة اللي قبله (هنا [[$match]]) بتدخل كل pipeline منهم، والناتج مستند **واحد** فيه array لكل مفتاح.

[[$count: "n"]] بيعدّ ويحط الرقم في حقل [[n]]. و [[$sortByCount: "$category"]] اختصار لـ [[$group]] بالـ category و [[$sum: 1]] ثم [[$sort]] تنازلي.

[[$bucket]]: [[groupBy]] القيمة، و [[boundaries]] حدود النطاقات بالترتيب (الحد الأدنى داخل، والأعلى لأ: [[[0, 500)]] و [[[500, 2000)]] و [[[2000, 10000)]]). أي قيمة برّه الحدود بتروح لـ [[default]]، ومن غيره الـ aggregate كله بيفشل. و [[output]] بيحدد الحقول (زي accumulators الـ [[$group]])، ومن غيره بيطلع [[count]] بس.

[[$bucketAuto]] بتقوله عدد النطاقات بس، وهو بيختار الحدود عشان كل نطاق ياخد عدد قريب من المستندات. كويس لما متعرفش توزيع الأسعار.

حدود: الـ pipelines جوه [[$facet]] مش بتستخدم indexes (بتشتغل على اللي داخل لها)، فالفلتر الأساسي لازم يبقى [[$match]] قبل [[$facet]]. والناتج مستند واحد، فلازم يبقى تحت ١٦ ميجا: ماتعملش [[$push]] لكل المستندات جوه facet.`,
          when: "صفحات بحث فيها فلاتر وعدادات (faceted search)، وداشبورد فيه كذا رقم من نفس البيانات، وتوزيعات (histogram) لأسعار أو أعمار أو مدد. لو البحث نصي وكبير، Atlas Search أو Elasticsearch عندهم facets أسرع.",
          mistakes: R`تحط الفلتر الأساسي جوه كل pipeline في [[$facet]] بدل [[$match]] قبله: كده كل facet بيقرا الـ collection كلها من غير index. وتنسى [[default]] في [[$bucket]] فأول منتج سعره برّه الحدود يكسر الصفحة كلها (جربتها: [[$switch could not find a matching branch for an input, and no default was specified]]). وتفتكر إن الحد الأعلى داخل: منتج بـ 10000 بالظبط مش في آخر نطاق، ده في [[default]].`
          },
          teach: R`## الفكرة: نفس المستندات، كذا سؤال

اتشغّل على [[mongo:8]] ببيانات الدرس الأول في القسم (٦ منتجات). الـ [[$match]] بيسيب ٥ (اللابتوب بـ 32000 خرج). الـ ٥ دول بيدخلوا ٤ pipelines في نفس الوقت:

~~~text المسار
products (6) → $match (5) ─┬─ results     ترتيب + صفحة
                            ├─ total       عدد
                            ├─ byCategory  عدد لكل category
                            └─ byPrice     عدد لكل نطاق سعر
~~~

---

## ١. [[results]]: الصفحة نفسها

~~~javascript
results: [{ $sort: { price: 1 } }, { $skip: 0 }, { $limit: 3 }, { $project: { _id: 0, name: 1, price: 1 } }]
~~~

رتّب بالسعر، واتخطى صفر (الصفحة الأولى)، وخد ٣. الصفحة التانية [[$skip: 3]]، والقاعدة [[skip = (page - 1) × size]].

## ٢. [[total]]: العدد الكلي

~~~javascript
total: [{ $count: "n" }]
~~~

[[$count]] بيرجّع مستند واحد [[{ n: 5 }]]. منه الواجهة بتحسب عدد الصفحات: ٥ ÷ ٣ = صفحتين.

## ٣. [[byCategory]]: [[$sortByCount]]

~~~javascript
byCategory: [{ $sortByCount: "$category" }]
~~~

بيجمّع بالـ category ويعدّ ويرتّب الأكبر الأول. نفس:

~~~javascript
{ $group: { _id: "$category", count: { $sum: 1 } } }, { $sort: { count: -1 } }
~~~

## ٤. [[byPrice]]: [[$bucket]]

~~~javascript
{ $bucket: { groupBy: "$price", boundaries: [0, 500, 2000, 10000], default: "other",
             output: { count: { $sum: 1 }, names: { $push: "$name" } } } }
~~~

| الحتة | معناها |
|---|---|
| [[groupBy: "$price"]] | القيمة اللي بنقسّم بيها |
| [[boundaries]] | ٤ أرقام = ٣ نطاقات: [[0–499]] و [[500–1999]] و [[2000–9999]] |
| [[default: "other"]] | اسم الصندوق لأي قيمة برّه الحدود |
| [[output]] | الحقول لكل نطاق: العدد والأسامي |

الـ [[_id]] بتاع كل نطاق هو **حده الأدنى** (0 و 500 و 2000).

---

## ٥. الناتج: مستند واحد

~~~text الناتج
[
  {
    results: [ { name: 'USB cable', price: 90 }, { name: 'Mouse', price: 300 }, { name: 'Keyboard', price: 750 } ],
    total: [ { n: 5 } ],
    byCategory: [ { _id: 'accessories', count: 4 }, { _id: 'screens', count: 1 } ],
    byPrice: [
      { _id: 0, count: 2, names: [ 'Mouse', 'USB cable' ] },
      { _id: 500, count: 2, names: [ 'Keyboard', 'Webcam' ] },
      { _id: 2000, count: 1, names: [ 'Monitor' ] }
    ]
  }
]
~~~

لاحظ إن [[total]] array فيها مستند، فالواجهة تقراه [[res.total[0]?.n ?? 0]] (لو مفيش نتايج خالص الـ array بتبقى فاضية). و [[computers]] مش ظاهرة في [[byCategory]] لأن اللابتوب خرج في الـ [[$match]]: الـ facets بتعدّ بعد الفلتر، وده المطلوب في صفحة بحث.

---

## ٦. [[$bucketAuto]]: النطاقات لوحدها

~~~javascript
db.orders.aggregate([{ $match: { status: "paid" } }, { $bucketAuto: { groupBy: "$total", buckets: 3 } }])
~~~

~~~text الناتج
{ _id: { min: 270, max: 890 }, count: 2 }
{ _id: { min: 890, max: 6600 }, count: 2 }
{ _id: { min: 6600, max: 32000 }, count: 2 }
~~~

٦ أوردرات مدفوعة اتقسموا ٣ نطاقات، كل واحد فيه ٢. الـ [[max]] مش داخل في النطاق، إلا في آخر نطاق (32000 جوه آخر واحد).

---

## ٧. من غير [[default]]

شيلت [[default]] وخليت اللابتوب يدخل:

~~~text الناتج
Executor error during aggregate command on namespace: shop.products :: caused by :: $switch could not find a matching branch for an input, and no default was specified.
~~~

الـ aggregate كله وقع، مش المنتج ده بس. فـ [[default]] دايمًا، إلا لو متأكد إن الحدود مغطية كل القيم.

## الخلاصة

| المرحلة | بتعمل إيه |
|---|---|
| [[$facet]] | كذا pipeline على نفس المستندات، والناتج مستند واحد |
| [[$count]] | عدد في حقل |
| [[$sortByCount]] | group + count + sort تنازلي |
| [[$bucket]] | نطاقات بحدود انت بتكتبها (الأدنى داخل والأعلى لأ) + [[default]] |
| [[$bucketAuto]] | عدد نطاقات وهو يختار الحدود |

الفلتر الأساسي [[$match]] قبل [[$facet]] عشان الـ index، لأن اللي جوه [[$facet]] مش بيستخدم indexes.`,
          lines: [
            "ادخل قاعدة shop.",
            "ابدأ pipeline على المنتجات.",
            "الفلتر الأساسي (هو اللي بيستخدم index): السعر 10000 أو أقل.",
            "كذا pipeline على نفس المستندات:",
            "الصفحة: رتّب بالسعر، واتخطى صفر، وخد 3، والاسم والسعر بس.",
            "العدد الكلي في حقل n.",
            "عدد كل category مترتب من الأكبر.",
            "عدد وأسامي المنتجات في كل نطاق سعر، واللي برّه الحدود في other.",
            "قفلة الـ $facet.",
            "قفلة الـ aggregate.",
            "قسّم الأوردرات المدفوعة لـ 3 نطاقات بالمبلغ، والحدود يختارها Mongo."
          ],
          sol: R`الصفحة التانية بـ [[$skip: 3]]: [[Webcam]] (1200) و [[Monitor]] (6000). [[total]] لسه [[5]]، والـ facets التانية زي ما هي لأنها مش متأثرة بالـ skip.

من غير [[default]] ومع [[$gte: 0]]: الـ aggregate كله فشل بـ [[$switch could not find a matching branch for an input, and no default was specified]]، لأن 32000 برّه [[boundaries]]. رجّع [[default: "other"]] وهيطلع نطاق [[_id: 'other']] فيه [[Laptop]].`,
          solCode: R`db.products.aggregate([
  { $match: { price: { $lte: 10000 } } },
  { $facet: {
      results: [{ $sort: { price: 1 } }, { $skip: 3 }, { $limit: 3 }, { $project: { _id: 0, name: 1, price: 1 } }],
      total: [{ $count: "n" }]
  } }
])`
        },
        {
          cmd: "$setWindowFields",
          title: "مجموع تراكمي ومتوسط متحرك وترتيب جوه كل مجموعة",
          desc: R`[[$group]] بيقفل كل مجموعة في صف واحد. [[$setWindowFields]] بيسيب كل صف زي ما هو، ويضيف له حقل محسوب من الصفوف اللي «حواليه»: مجموع كل اللي قبله (running total)، أو متوسط آخر يومين، أو قيمة الصف اللي فات، أو ترتيبه جوه مجموعته.

ده نفس window functions في SQL ([[SUM() OVER (ORDER BY ...)]] و [[RANK()]]).`,
          example: R`use shop
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: { $dateTrunc: { date: "$createdAt", unit: "day" } }, revenue: { $sum: "$total" } } },
  { $setWindowFields: {
      sortBy: { _id: 1 },
      output: {
        runningTotal: { $sum: "$revenue", window: { documents: ["unbounded", "current"] } },
        avg2Days: { $avg: "$revenue", window: { documents: [-1, "current"] } },
        prevDay: { $shift: { output: "$revenue", by: -1, default: null } }
      }
  } },
  { $project: { _id: 0, day: { $dateToString: { date: "$_id", format: "%m-%d" } }, revenue: 1, runningTotal: 1, avg2Days: 1, prevDay: 1 } }
])
db.orders.aggregate([{ $match: { status: "paid" } }, { $setWindowFields: { partitionBy: "$userId", sortBy: { total: -1 }, output: { rank: { $rank: {} }, userTotal: { $sum: "$total" } } } }, { $project: { userId: 1, total: 1, rank: 1, userTotal: 1 } }])`,
          try: R`بنفس البيانات: امسح أوردر 103 (يوم 2 سبتمبر) من الـ [[$match]] بـ [[_id: { $ne: 103 }]]، وضيف حقل تاني [[days2]] بـ [[window: { range: [-1, "current"], unit: "day" }]] بدل [[documents]]. قارن [[avg2Days]] و [[days2]] يوم 3 سبتمبر. ليه اختلفوا؟`,
          flag: "script",
          deep: {
            why: "داشبورد المبيعات بيسأل «وصلنا لكام من أول الشهر؟» و «النهارده أحسن من امبارح بكام؟» و «متوسط آخر ٧ أيام» عشان يشيل التذبذب. وفي الانترفيو «هات أكبر ٣ أوردرات لكل عميل» و «رتّب الموظفين جوه كل قسم». من غير window functions بتعمل ده بـ loop في Node بعد ما تجيب كل البيانات.",
            how: R`[[sortBy]] بيرتّب الصفوف قبل الحساب، ولازم مع أي window بالـ documents أو range أو [[$shift]] أو [[$rank]]. [[partitionBy]] (اختياري) بيقسّم الصفوف لمجموعات، والحساب بيبدأ من الأول في كل مجموعة، زي [[PARTITION BY]].

[[output]]: كل حقل فيه دالة (زي [[$sum]] و [[$avg]] و [[$min]] و [[$max]] و [[$push]]) و [[window]]:
• [[documents: ["unbounded", "current"]]]: من أول صف لحد الحالي = تراكمي.
• [[documents: [-1, "current"]]]: الصف اللي قبله والحالي.
• [[range: [-6, "current"], unit: "day"]]: كل الصفوف اللي [[sortBy]] بتاعها في آخر ٧ أيام، حتى لو فيه أيام ناقصة. ده الفرق: documents بيعدّ صفوف، و range بيعدّ قيم.
• من غير [[window]] خالص: المجموعة كلها (زي [[userTotal]] في السطر الأخير).

دوال الترتيب ملهاش window: [[$rank]] (القيم المتساوية ليها نفس الرقم وبعدها فجوة: 1، 1، 3)، و [[$denseRank]] (من غير فجوة)، و [[$documentNumber]] (رقم مسلسل). و [[$shift]] بيجيب قيمة صف تاني بإزاحة ([[by: -1]] اللي فات، و [[by: 1]] اللي جاي)، و [[default]] لو مفيش.

الذاكرة: كل partition بيتحسب في الذاكرة بحد ١٠٠ ميجا، وبيكتب على الديسك لو كبر (allowDiskUse شغال افتراضيًا من 6.0). وقلّل البيانات بـ [[$match]] و [[$group]] قبله.`,
          when: "تقارير وداشبورد: تراكمي، ومتوسط متحرك، ونمو يوم عن يوم، و top-N لكل مجموعة، وترقيم صفوف. موجود من MongoDB 5.0.",
          mistakes: R`تستخدم [[documents]] لمتوسط «آخر ٧ أيام» والبيانات فيها أيام من غير مبيعات: هتاخد آخر ٧ صفوف ممكن يبقوا ١٠ أيام. استخدم [[range]] مع [[unit]]. وتنسى [[sortBy]] مع window بالـ documents (جربتها: [[Document-based bounds require a sortBy]]). وتجمّع بالـ يوم من غير timezone ([[$dateTrunc]] بيقص بـ UTC افتراضيًا)، زي ما شفنا في درس «aggregate و $group».`
          },
          teach: R`## الفكرة: كل صف يفضل، ويضاف له حساب من جيرانه

اتشغّل على [[mongo:8]] ببيانات الدرس الأول في القسم. هنعمل حاجتين: تقرير يومي فيه تراكمي ومتوسط وقيمة امبارح، وترتيب أوردرات كل يوزر.

---

## ١. نجهّز صف لكل يوم

~~~javascript
{ $match: { status: "paid" } },
{ $group: { _id: { $dateTrunc: { date: "$createdAt", unit: "day" } }, revenue: { $sum: "$total" } } }
~~~

[[$dateTrunc]] بـ [[unit: "day"]] بيقص التاريخ لأول اليوم (بتوقيت UTC هنا، للتبسيط). الناتج ٤ صفوف: يوم 1 (1800) و 2 (6600) و 3 (1160) و 4 (32000).

---

## ٢. [[$setWindowFields]]

### [[sortBy: { _id: 1 }]]

رتّب الأيام تصاعدي. «اللي قبل» و «التراكمي» ملهمش معنى من غير ترتيب.

### [[runningTotal]]: المجموع التراكمي

~~~javascript
runningTotal: { $sum: "$revenue", window: { documents: ["unbounded", "current"] } }
~~~

[[window]] بيحدد الصفوف اللي داخلة في الحساب، بالنسبة للصف الحالي:

| القيمة | معناها |
|---|---|
| [["unbounded"]] | من أول صف خالص |
| [["current"]] | الصف الحالي |
| [[-1]] | صف واحد قبله |
| [[1]] | صف واحد بعده |

فـ [[["unbounded", "current"]]] = كل اللي فات + الحالي.

### [[avg2Days]]: متوسط متحرك

~~~javascript
avg2Days: { $avg: "$revenue", window: { documents: [-1, "current"] } }
~~~

متوسط الصف اللي قبله والحالي. في أول صف مفيش «قبله» فبياخد الحالي بس.

### [[prevDay]]: [[$shift]]

~~~javascript
prevDay: { $shift: { output: "$revenue", by: -1, default: null } }
~~~

هات [[revenue]] بتاع الصف اللي على بعد [[-1]] (اللي قبله). [[default: null]] لأول صف.

---

## ٣. الناتج

~~~text الناتج
[
  { day: '09-01', revenue: 1800,  runningTotal: 1800,  avg2Days: 1800,  prevDay: null },
  { day: '09-02', revenue: 6600,  runningTotal: 8400,  avg2Days: 4200,  prevDay: 1800 },
  { day: '09-03', revenue: 1160,  runningTotal: 9560,  avg2Days: 3880,  prevDay: 6600 },
  { day: '09-04', revenue: 32000, runningTotal: 41560, avg2Days: 16580, prevDay: 1160 }
]
~~~

(رتّبت الحقول عشان تتقري. Mongo بيطبع [[day]] في الآخر.) نتأكد من يوم 3: التراكمي 1800 + 6600 + 1160 = 9560، والمتوسط (6600 + 1160) ÷ 2 = 3880.

---

## ٤. [[partitionBy]]: نفس الحساب جوه كل مجموعة

~~~javascript
{ $setWindowFields: { partitionBy: "$userId", sortBy: { total: -1 },
    output: { rank: { $rank: {} }, userTotal: { $sum: "$total" } } } }
~~~

- [[partitionBy: "$userId"]]: كل يوزر لوحده، والترتيب يبدأ من 1 لكل واحد.
- [[sortBy: { total: -1 }]]: الأكبر الأول.
- [[$rank: {}]]: ترتيب الصف. [[{}]] لأن الدالة مش محتاجة إعدادات.
- [[userTotal]] من غير [[window]]: مجموع الـ partition كله، ومتكرر على كل صف.

~~~text الناتج
{ _id: 103, userId: 1, total: 6600,  rank: 1, userTotal: 8370 }
{ _id: 101, userId: 1, total: 1500,  rank: 2, userTotal: 8370 }
{ _id: 106, userId: 1, total: 270,   rank: 3, userTotal: 8370 }
{ _id: 108, userId: 2, total: 32000, rank: 1, userTotal: 32300 }
{ _id: 102, userId: 2, total: 300,   rank: 2, userTotal: 32300 }
{ _id: 105, userId: 3, total: 890,   rank: 1, userTotal: 890 }
~~~

«أكبر أوردرين لكل يوزر» = ضيف بعدها [[{ $match: { rank: { $lte: 2 } } }]]. وكل صف معاه نسبته من مجموع اليوزر: [[total / userTotal]].

---

## ٥. [[documents]] ولا [[range]]؟

شلت يوم 2 (أوردر 103) وحسبت «آخر يومين» بالطريقتين:

~~~text الناتج
day 09-01  revenue 1800   documents[-1,current]: 1800   range[-1,current] day: 1800
day 09-03  revenue 1160   documents[-1,current]: 2960   range[-1,current] day: 1160
day 09-04  revenue 32000  documents[-1,current]: 33160  range[-1,current] day: 33160
~~~

يوم 3: [[documents]] أخد الصف اللي قبله، وهو يوم 1 (مش امبارح!). [[range]] مع [[unit: "day"]] أخد يوم 2 بس، ومفيهوش حاجة. للتقارير الزمنية [[range]] هو الصح.

## الخلاصة

| الحتة | معناها |
|---|---|
| [[sortBy]] | ترتيب الصفوف قبل الحساب (لازم) |
| [[partitionBy]] | ابدأ من الأول لكل مجموعة |
| [[window.documents]] | بعدد الصفوف |
| [[window.range]] + [[unit]] | بالقيمة (أيام، ساعات) |
| [[$shift]] | قيمة صف تاني |
| [[$rank]] / [[$denseRank]] / [[$documentNumber]] | ترتيب |

[[$group]] بيقفل الصفوف، و [[$setWindowFields]] بيسيبها ويضيف لها.`,
          lines: [
            "ادخل قاعدة shop.",
            "ابدأ pipeline على الأوردرات.",
            "المدفوع بس.",
            "صف لكل يوم فيه مجموع الإيراد.",
            "مرحلة window:",
            "رتّب الأيام تصاعدي.",
            "الحقول الجديدة:",
            "المجموع من أول يوم لحد النهارده.",
            "متوسط امبارح والنهارده.",
            "إيراد اليوم اللي قبله، و null لأول يوم.",
            "قفلة output.",
            "قفلة المرحلة.",
            "شكل الناتج: اليوم كنص شهر-يوم والأرقام.",
            "قفلة الـ aggregate.",
            "ترتيب أوردرات كل يوزر من الأكبر، ومجموع اليوزر على كل صف."
          ],
          sol: R`يوم 3 سبتمبر: [[avg2Days]] (بالـ documents) بقى متوسط يوم 1 ويوم 3، يعني [[(1800 + 1160) ÷ 2 = 1480]]، لأن الصف اللي قبله بقى يوم 1 بعد ما يوم 2 اختفى. و [[days2]] (بالـ range) = [[1160]] بس، لأن مفيش مبيعات يوم 2.

يعني [[documents]] بيعدّ صفوف، و [[range]] بيعدّ أيام. للتقارير بالتاريخ استخدم [[range]].`,
          solCode: R`db.orders.aggregate([
  { $match: { status: "paid", _id: { $ne: 103 } } },
  { $group: { _id: { $dateTrunc: { date: "$createdAt", unit: "day" } }, revenue: { $sum: "$total" } } },
  { $setWindowFields: { sortBy: { _id: 1 }, output: {
      avg2Days: { $avg: "$revenue", window: { documents: [-1, "current"] } },
      days2: { $sum: "$revenue", window: { range: [-1, "current"], unit: "day" } }
  } } }
])`
        },
        {
          cmd: "$topN و $addToSet",
          title: "ملف كل عميل في صف: آخر أوردر، وأكبر اتنين، والحالات من غير تكرار",
          desc: R`[[$group]] فيه accumulators أكتر من [[$sum]] و [[$avg]]. [[$addToSet]] بيجمع القيم من غير تكرار، و [[$top]] و [[$topN]] بيجيبوا أول صف أو أول N صفوف **بترتيب انت بتحدده** جوه المجموعة، و [[$maxN]] أكبر N قيم، و [[$sum]] مع [[$cond]] بيجمع بشرط.

بيهم تعمل «ملف العميل» في صف واحد من غير [[$sort]] قبل الـ group ومن غير ما تجيب كل الأوردرات.`,
          example: R`use shop
db.orders.aggregate([
  { $group: {
      _id: "$userId",
      orders: { $count: {} },
      paidSpent: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$total", 0] } },
      statuses: { $addToSet: "$status" },
      lastOrder: { $top: { sortBy: { createdAt: -1 }, output: { id: "$_id", at: "$createdAt" } } },
      biggest2: { $topN: { n: 2, sortBy: { total: -1 }, output: "$total" } },
      firstAt: { $min: "$createdAt" }
  } },
  { $sort: { paidSpent: -1 } }
])
db.orders.aggregate([{ $group: { _id: null, top3: { $maxN: { n: 3, input: "$total" } } } }])`,
          try: R`بنفس بيانات الدرس الأول في القسم: جرّب [[firstTotal: { $first: "$total" }]] في [[$group]] من غير أي [[$sort]] قبله. القيمة اللي طلعت لسارة هي أول أوردر ليها فعلًا؟ وبعدين ضيف [[$sort: { createdAt: 1 }]] قبل الـ group وقارن. وفي الآخر خلي [[biggest2]] يحسب المدفوع بس.`,
          flag: "script",
          deep: {
            why: "صفحة «العملاء» في أي لوحة إدارة فيها: عدد الأوردرات، والمدفوع، وآخر أوردر إمتى، وأكبر أوردرات. الطريقة الساذجة: [[$sort]] بالتاريخ ثم [[$group]] بـ [[$first]]، أو تجيب الأوردرات لكل عميل وتحسب في الكود. [[$top]] و [[$topN]] (من MongoDB 5.2) بيعملوا الترتيب جوه كل مجموعة لوحدها.",
            how: R`[[$count: {}]] زي [[$sum: 1]] (عدد). [[$cond: [شرط, لو صح, لو غلط]]] if/else جوه expression، فـ [[$sum]] بيجمع [[$total]] للمدفوع وصفر للباقي: مجموع بشرط في نفس الـ group.

[[$addToSet]] بيبني array من القيم من غير تكرار، وترتيبها مش مضمون. [[$push]] بيحتفظ بالتكرار.

[[$top]]: [[sortBy]] الترتيب جوه المجموعة، و [[output]] الحاجة اللي ترجع (حقل أو object). بيرجّع واحد. [[$topN]] نفس الفكرة بـ [[n]] وبيرجّع array. و [[$bottom]] و [[$bottomN]] من الآخر. [[$maxN]] و [[$minN]] أبسط: أكبر أو أصغر N قيم من [[input]] من غير ما ترجّع حقول تانية.

[[$first]] و [[$last]] بيرجّعوا أول وآخر مستند **دخل** المجموعة، والترتيب ده مش مضمون من غير [[$sort]] قبل الـ group. جربتها: [[$first: "$total"]] لسارة طلع 270 (أوردر يوم 3)، مش 1500 (أول أوردر ليها).`,
          when: "أي «لكل X هات أحدث/أكبر/أول Y»: آخر رسالة في كل محادثة، وأعلى ٣ درجات لكل طالب، وآخر سعر لكل منتج. ومجموع بشرط لما عايز كذا رقم (مدفوع ومرتجع ومعلق) في نفس الصف.",
          mistakes: R`تستخدم [[$first]] من غير [[$sort]] وتفتكره «الأقدم»: بيشتغل صح في التجربة الصغيرة وبيتلخبط لما الـ collection تكبر. وتنسى إن الـ group من غير [[$match]] بيحسب الـ cancelled كمان: [[biggest2]] لعمر طلع [[[32000, 6000]]] والـ 6000 دي أوردر ملغي. و [[$addToSet]] على قيم كتير جدًا (ids لكل الأوردرات) بيعمل array ضخمة في صف واحد، والصف ليه حد ١٠٠ ميجا رام للـ group.`
          },
          teach: R`## الفكرة: كل حقل في [[$group]] سؤال عن المجموعة

اتشغّل على [[mongo:8]] ببيانات الدرس الأول في القسم: ٨ أوردرات لـ ٣ يوزرز، منهم واحد cancelled وواحد pending. المفتاح [[_id: "$userId"]]، فكل يوزر صف، وكل حقل تاني بيحسب حاجة على أوردرات اليوزر ده.

---

## ١. [[orders: { $count: {} }]]

عدد المستندات في المجموعة. نفس [[$sum: 1]] بالظبط، بس أوضح. الـ [[{}]] لأنه مش محتاج إعدادات.

## ٢. مجموع بشرط: [[$sum]] + [[$cond]]

~~~javascript
paidSpent: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$total", 0] } }
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[{ $eq: ["$status", "paid"] }]] | الأوردر ده مدفوع؟ true أو false |
| [[$cond: [شرط, "$total", 0]]] | لو صح هات المبلغ، لو غلط صفر |
| [[$sum: ...]] | اجمع الناتج على كل أوردرات اليوزر |

يعني من غير [[$match]] قدرنا نعدّ **كل** الأوردرات ونجمع **المدفوع بس** في نفس الصف.

## ٣. [[statuses: { $addToSet: "$status" }]]

كل الحالات اللي ظهرت لليوزر، كل واحدة مرة. عمر عنده ٣ أوردرات (paid و cancelled و paid) فبتطلع [[['paid', 'cancelled']]]. والترتيب جوه الـ array مش مضمون.

## ٤. [[$top]]: آخر أوردر

~~~javascript
lastOrder: { $top: { sortBy: { createdAt: -1 }, output: { id: "$_id", at: "$createdAt" } } }
~~~

- [[sortBy: { createdAt: -1 }]]: رتّب أوردرات **اليوزر ده** من الأحدث.
- [[output]]: رجّع object فيه رقم الأوردر وتاريخه.
- [[$top]]: خد أول واحد بعد الترتيب.

## ٥. [[$topN]]: أكبر اتنين

~~~javascript
biggest2: { $topN: { n: 2, sortBy: { total: -1 }, output: "$total" } }
~~~

نفس الفكرة بـ [[n: 2]]، والناتج array.

## ٦. [[firstAt: { $min: "$createdAt" }]]

أقدم تاريخ. [[$min]] و [[$max]] بيشتغلوا على التواريخ والنصوص مش الأرقام بس.

---

## الناتج

~~~text الناتج (بعد { $sort: { paidSpent: -1 } })
{ _id: 2, orders: 3, paidSpent: 32300, statuses: [ 'paid', 'cancelled' ],
  lastOrder: { id: 108, at: ISODate('2026-09-04T20:00:00.000Z') }, biggest2: [ 32000, 6000 ],
  firstAt: ISODate('2026-09-01T15:00:00.000Z') }
{ _id: 1, orders: 3, paidSpent: 8370, statuses: [ 'paid' ],
  lastOrder: { id: 106, at: ISODate('2026-09-03T18:00:00.000Z') }, biggest2: [ 6600, 1500 ],
  firstAt: ISODate('2026-09-01T10:00:00.000Z') }
{ _id: 3, orders: 2, paidSpent: 890, statuses: [ 'pending', 'paid' ],
  lastOrder: { id: 107, at: ISODate('2026-09-04T11:00:00.000Z') }, biggest2: [ 1200, 890 ],
  firstAt: ISODate('2026-09-03T09:00:00.000Z') }
~~~

بص على عمر: [[paidSpent]] 32300 (300 + 32000) من غير الـ 6000 الملغي، بس [[biggest2]] فيه 6000 لأن [[$topN]] مفيهوش شرط. لو عايز المدفوع بس في كل الحقول، حط [[$match]] قبل الـ group.

---

## ٧. [[$maxN]]: أكبر N قيم من غير حقول تانية

~~~javascript
db.orders.aggregate([{ $group: { _id: null, top3: { $maxN: { n: 3, input: "$total" } } } }])
~~~

~~~text الناتج
[ { _id: null, top3: [ 32000, 6600, 6000 ] } ]
~~~

[[_id: null]] يعني كل الـ collection مجموعة واحدة.

---

## ٨. ليه مش [[$first]]؟

~~~javascript
db.orders.aggregate([{ $group: { _id: "$userId", firstTotal: { $first: "$total" } } }])
~~~

~~~text الناتج
{ _id: 1, firstTotal: 270 }   ← أوردر 106 (يوم 3)، مش 1500 (يوم 1)
{ _id: 2, firstTotal: 6000 }
{ _id: 3, firstTotal: 890 }
~~~

[[$first]] بياخد أول مستند **وصل** للـ group، وده بيعتمد على ترتيب القراية من الديسك أو الـ index. لازم [[$sort]] قبله، أو استخدم [[$top]] بـ [[sortBy]] وانت مطمّن.

## الخلاصة

| الـ accumulator | بيرجّع |
|---|---|
| [[$count: {}]] | عدد |
| [[$sum: { $cond: [...] }]] | مجموع بشرط |
| [[$addToSet]] | array من غير تكرار |
| [[$push]] | array بالتكرار |
| [[$top]] / [[$bottom]] | صف واحد بترتيب [[sortBy]] |
| [[$topN]] / [[$bottomN]] | N صفوف بترتيب [[sortBy]] |
| [[$maxN]] / [[$minN]] | أكبر/أصغر N قيم |
| [[$first]] / [[$last]] | أول/آخر داخل، ومحتاج [[$sort]] قبله |`,
          lines: [
            "ادخل قاعدة shop.",
            "ابدأ pipeline على كل الأوردرات (من غير فلتر).",
            "جمّع:",
            "صف لكل يوزر.",
            "عدد الأوردرات.",
            "مجموع المدفوع بس: المبلغ لو paid وإلا صفر.",
            "الحالات اللي ظهرت من غير تكرار.",
            "آخر أوردر: رتّب بالتاريخ تنازلي وخد الأول، ورجّع رقمه وتاريخه.",
            "أكبر مبلغين.",
            "أقدم تاريخ أوردر.",
            "قفلة الـ group.",
            "اللي دفع أكتر الأول.",
            "قفلة الـ aggregate.",
            "أكبر 3 مبالغ في الـ collection كلها."
          ],
          sol: R`من غير [[$sort]]: سارة طلع لها [[firstTotal: 270]] (أوردر 106 يوم 3 سبتمبر)، مع إن أول أوردر ليها 1500 يوم 1. بعد [[{ $sort: { createdAt: 1 } }]] قبل الـ group طلع 1500.

[[biggest2]] للمدفوع بس: أسهل حل [[{ $match: { status: "paid" } }]] قبل الـ group، فعمر يطلع [[[32000, 300]]]. بس كده [[orders]] و [[statuses]] كمان هيبقوا للمدفوع بس. لو عايز الباقي يفضل على كل الأوردرات، خلي [[output]] جوه [[$topN]] [[$cond]] يرجّع null لغير المدفوع، أو اعمل [[$facet]].`,
          solCode: R`db.orders.aggregate([
  { $sort: { createdAt: 1 } },
  { $group: { _id: "$userId", firstTotal: { $first: "$total" } } },
  { $sort: { _id: 1 } }
])`
        },
        {
          cmd: "$merge و $out",
          title: "احفظ ناتج التقرير في collection وحدّثه بدل ما تحسبه كل مرة",
          desc: R`[[$merge]] في آخر الـ pipeline بيكتب الناتج في collection: يضيف الجديد، ويحدّث أو يستبدل الموجود بنفس المفتاح. ده «materialized view»: تقرير تقيل بيتحسب كل ساعة، والداشبورد يقرا الناتج الجاهز في ملّي ثانية.

[[$out]] أبسط: بيستبدل الـ collection كلها بالناتج.`,
          example: R`use shop
db.orders.aggregate([
  { $match: { status: "paid", createdAt: { $gte: ISODate("2026-09-03T00:00:00Z") } } },
  { $group: { _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } }, revenue: { $sum: "$total" }, orders: { $sum: 1 } } },
  { $set: { updatedAt: "$NOW" } },
  { $merge: { into: "daily_sales", on: "_id", whenMatched: "replace", whenNotMatched: "insert" } }
])
db.daily_sales.find().sort({ _id: 1 })
db.orders.aggregate([{ $match: { status: "paid" } }, { $project: { total: 1 } }, { $out: "paid_snapshot" }])
db.paid_snapshot.countDocuments()`,
          try: R`بنفس بيانات الدرس الأول في القسم: شغّل الـ [[$merge]] مرتين ورا بعض، واتأكد إن [[daily_sales]] فيها نفس الأرقام (مش ضعفها). وبعدين غيّر [[whenMatched]] لـ pipeline بيجمع: [[[{ $set: { revenue: { $add: ["$revenue", "$new.revenue"] } } }]]] وشغّله مرتين. وفي الآخر شغّل [[$out]] على الأوردرات الـ [[cancelled]] لنفس [[paid_snapshot]] وعدّ.`,
          flag: "script",
          deep: {
            why: "تقرير الإيراد على مليون أوردر بياخد ثواني، ولو الداشبورد بيحسبه مع كل فتحة صفحة، القاعدة بتتعب والصفحة بطيئة. الحل اللي بيتعمل في كل شركة: الحساب بيتعمل كل فترة (cron أو job) ويتحفظ، والصفحة تقرا الجاهز. ودرس «aggregate و $group» قال كده في الـ when، وده إزاي.",
            how: R`[[$merge]] لازم يبقى **آخر** مرحلة. [[into]] اسم الـ collection (أو [[{ db, coll }]] لقاعدة تانية)، وبيتعمل لو مش موجود. [[on]] الحقل اللي بيتطابق بيه المستند الجديد مع القديم (الافتراضي [[_id]])، ولازم يبقى عليه unique index، وإلا: [[Cannot find index to verify that join fields will be unique]] (جربتها).

[[whenMatched]] لو فيه مستند بنفس المفتاح: [[replace]] (استبدله)، أو [[merge]] (ادمج الحقول، وده الافتراضي)، أو [[keepExisting]]، أو [[fail]]، أو pipeline بتحسب المستند الجديد، وجواها [[$new]] هو الصف الجاي من التقرير. [[whenNotMatched]]: [[insert]] (الافتراضي) أو [[discard]] أو [[fail]].

التحديث التزايدي: بدل ما تحسب السنة كلها كل ساعة، الـ [[$match]] بياخد آخر يوم أو اتنين بس، و [[replace]] بيكتب الأيام دي من جديد. ده **idempotent**: لو الـ job اشتغل مرتين، النتيجة نفسها. جربت مرتين: نفس الأرقام. أما pipeline بـ [[$add]] فلو اتشغّل مرتين الرقم بيتضاعف (جربتها: 32000 بقت 64000).

[[$NOW]] متغير فيه وقت تشغيل الـ aggregate، مفيد عشان تعرف التقرير اتحدّث إمتى.

[[$out]] برضه آخر مرحلة: بيكتب الناتج في collection مؤقتة وبعدين يبدّلها بالقديمة مرة واحدة، فمحدش بيشوف نص الناتج. الـ indexes اللي كانت على الـ collection القديمة بتفضل (جربت: [[total_1]] فضل). بس كل البيانات القديمة بتتمسح: شغّلت [[$out]] تاني على الـ cancelled فـ [[paid_snapshot]] بقت مستند واحد بدل ٦.`,
          when: "داشبورد وتقارير بتتقري أكتر ما البيانات بتتغير، وملخصات يومية/شهرية، ونسخة مجهزة لـ export أو لـ BI. [[$merge]] للتحديث التزايدي، و [[$out]] لنسخة كاملة بتتعمل من الأول (snapshot).",
          mistakes: R`whenMatched بيجمع ([[$inc]] أو [[$add]]) في job ممكن يتعاد بعد فشل: الأرقام بتتضاعف في صمت. خليه يحسب الفترة من جديد ويعمل replace. و [[on]] على حقل من غير unique index. و [[$out]] على اسم collection مهمة بالغلط: بتتمسح وتتبدل من غير سؤال. وتنسى إن الـ view المحفوظ متأخر عن البيانات بفترة الـ job، فاكتب [[updatedAt]] واعرضه في الصفحة.`
          },
          teach: R`## الفكرة: احسب مرة، واقرا كتير

اتشغّل على [[mongo:8]] ببيانات الدرس الأول في القسم. هنعمل collection اسمها [[daily_sales]]: صف لكل يوم فيه الإيراد وعدد الأوردرات، والـ job بيحدّث آخر الأيام بس.

---

## ١. الـ pipeline العادي

~~~javascript
{ $match: { status: "paid", createdAt: { $gte: ISODate("2026-09-03T00:00:00Z") } } },
{ $group: { _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } }, revenue: { $sum: "$total" }, orders: { $sum: 1 } } },
~~~

المدفوع من أول يوم 3 (في الحقيقة: «من امبارح»)، وصف لكل يوم. الـ [[_id]] نص زي [['2026-09-03']]، وده هيبقى مفتاح المستند في [[daily_sales]].

## ٢. [[{ $set: { updatedAt: "$NOW" } }]]

[[$set]] بيضيف حقل (زي [[$addFields]]). [[$NOW]] بدولارين: **متغير** جاهز فيه وقت التشغيل، مش حقل.

## ٣. [[$merge]]

~~~javascript
{ $merge: { into: "daily_sales", on: "_id", whenMatched: "replace", whenNotMatched: "insert" } }
~~~

| الحتة | معناها |
|---|---|
| [[into]] | اكتب هنا (بتتعمل لو مش موجودة) |
| [[on: "_id"]] | قارن بالـ [[_id]] (اليوم) |
| [[whenMatched: "replace"]] | اليوم موجود؟ استبدله بالرقم الجديد |
| [[whenNotMatched: "insert"]] | مش موجود؟ ضيفه |

الـ aggregate نفسه بيرجّع [[[]]]: الناتج راح للـ collection مش ليك.

## ٤. [[db.daily_sales.find().sort({ _id: 1 })]]

~~~text الناتج
[
  { _id: '2026-09-03', revenue: 1160, orders: 2, updatedAt: ISODate('2026-10-27T22:35:37.265Z') },
  { _id: '2026-09-04', revenue: 32000, orders: 1, updatedAt: ISODate('2026-10-27T22:35:37.265Z') }
]
~~~

يوم 3: 890 + 270 = 1160 من أوردرين. يوم 4: 32000 (والـ 1200 pending مش محسوب).

### اتشغّل مرتين؟

شغّلت نفس الـ [[$merge]] مرة تانية: نفس الأرقام بالظبط، لأن [[replace]] بيكتب الرقم المحسوب من جديد. ده اللي اسمه **idempotent**، وده المطلوب في job ممكن يتعاد.

ولما خليت [[whenMatched]] pipeline بيجمع القديم على الجديد ([[$new]] = الصف الجاي):

~~~javascript
whenMatched: [{ $set: { revenue: { $add: ["$revenue", "$new.revenue"] } } }]
~~~

يوم 4 بقى [[64000]] بعد مرة واحدة زيادة. الجمع في الـ merge خطر.

---

## ٥. [[$out]]: استبدل الـ collection كلها

~~~javascript
db.orders.aggregate([{ $match: { status: "paid" } }, { $project: { total: 1 } }, { $out: "paid_snapshot" }])
db.paid_snapshot.countDocuments()
~~~

~~~text الناتج
6
~~~

٦ أوردرات مدفوعة. جرّبت ٣ حاجات:

| التجربة | النتيجة |
|---|---|
| [[createIndex({ total: 1 })]] على [[paid_snapshot]] وبعدين [[$out]] تاني | الـ index فضل: [[_id_,total_1]] |
| [[$out]] تاني بالـ cancelled بس | [[countDocuments()]] بقى [[1]]: القديم اتمسح كله |
| [[$out]] مش آخر مرحلة | [[$out can only be the final stage in the pipeline]] |

---

## ٦. لو [[on]] على حقل مش unique

~~~text الناتج
Cannot find index to verify that join fields will be unique
~~~

[[$merge]] لازم يضمن إن كل صف جديد بيقابل مستند واحد بس، فمحتاج unique index على حقول [[on]] ([[_id]] عليه دايمًا).

## الخلاصة

| | [[$merge]] | [[$out]] |
|---|---|---|
| بيعمل إيه | يضيف/يحدّث صفوف | يستبدل الـ collection كلها |
| مكانه | آخر مرحلة | آخر مرحلة |
| مناسب لـ | تحديث آخر يوم كل ساعة | snapshot كامل |
| خطر | الجمع في whenMatched يتضاعف لو اتعاد | يمسح القديم من غير سؤال |

احسب الفترة من جديد واعمل [[replace]]، واكتب [[updatedAt]] بـ [[$NOW]].`,
          lines: [
            "ادخل قاعدة shop.",
            "ابدأ pipeline على الأوردرات.",
            "المدفوع من أول يوم 3 سبتمبر بس (الفترة اللي بتتحدّث).",
            "صف لكل يوم: الإيراد والعدد، والمفتاح التاريخ كنص.",
            "ضيف وقت التحديث.",
            "اكتب في daily_sales: اليوم الموجود يتستبدل، والجديد يتضاف.",
            "قفلة الـ aggregate.",
            "اقرا التقرير الجاهز.",
            "نسخة كاملة من الأوردرات المدفوعة بتستبدل paid_snapshot.",
            "عدد المستندات في النسخة."
          ],
          sol: R`مرتين بـ [[replace]]: [[daily_sales]] فيها [[2026-09-03]] بـ 1160 و [[2026-09-04]] بـ 32000 زي ما هي.

بالـ pipeline اللي بيجمع: كل تشغيل بيضيف الرقم على اللي موجود. أول تشغيل خلى يوم 4 [[64000]] ويوم 3 [[2320]]، والتاني يوصّل يوم 4 لـ 96000. ده الفرق بين job آمن يتعاد وواحد لأ.

[[$out]] بالـ cancelled: [[paid_snapshot]] بقت مستند واحد (أوردر 104)، والـ ٦ القدام اتمسحوا.`,
          solCode: R`db.orders.aggregate([
  { $match: { status: "paid", createdAt: { $gte: ISODate("2026-09-03T00:00:00Z") } } },
  { $group: { _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } }, revenue: { $sum: "$total" } } },
  { $merge: { into: "daily_sales", whenMatched: [{ $set: { revenue: { $add: ["$revenue", "$new.revenue"] } } }] } }
])
db.daily_sales.find({}, { revenue: 1 })
db.orders.aggregate([{ $match: { status: "cancelled" } }, { $project: { total: 1 } }, { $out: "paid_snapshot" }])
db.paid_snapshot.countDocuments()`
        },
      ]
    }
]);

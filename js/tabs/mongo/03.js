// تكملة تاب mongo: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/mongo/01.js (شرح حقول الدرس في أوله)
MORE("mongo", [
    {
      t: "تصميم المستندات والاستعلامات",
      l: 2,
      n: "المستند بيتصمم على حسب إنت بتقراه إزاي، والتقارير بـ aggregate، و populate من غير N+1، و transactions",
      items: [
        {
          cmd: "embed ولا reference",
          title: "أحط البيانات جوه المستند ولا في collection لوحدها؟",
          desc: R`في Mongo السؤال مش «الجداول إيه» زي SQL، السؤال «الشاشة دي بتقرا إيه مع بعض». اللي بيتقري مع بعض دايمًا ومحدود العدد: حطه جوه المستند (embed). اللي بيكبر من غير حد، أو بيتقري لوحده، أو بيتشارك بين مستندات كتير: collection لوحده وتحط الـ [[_id]] بتاعه (reference).

والنص بالنص شائع: الأوردر فيه [[productId]] (reference) ومعاه نسخة من الاسم والسعر وقت الشرا (embed)، لأن سعر المنتج هيتغير والفاتورة لأ.`,
          example: R`use shop
db.users.insertOne({ _id: 1, name: "Sara", addresses: [{ city: "Cairo", street: "Tahrir 5", isDefault: true }] })
db.products.insertOne({ _id: 10, name: "Keyboard", price: 750, stock: 40 })
db.orders.insertOne({ userId: 1, status: "paid", createdAt: new Date(), items: [{ productId: 10, name: "Keyboard", price: 750, qty: 2 }], total: 1500 })
db.orders.createIndex({ userId: 1, createdAt: -1 })
db.orders.find({ userId: 1 }).sort({ createdAt: -1 }).limit(10)
db.users.findOne({ _id: 1 }, { name: 1, addresses: 1 })
db.products.updateOne({ _id: 10 }, { $set: { price: 800 } })
db.orders.findOne({ userId: 1 }, { items: 1, _id: 0 })`,
          try: R`صمّم على ورقة الأول، وبعدين في mongosh: مدونة فيها posts و authors و tags و comments. اكتب جنب كل واحدة «embed» ولا «reference» وليه، على حسب ٣ شاشات: صفحة البوست، وصفحة الكاتب بكل بوستاته، وأحدث ١٠٠ تعليق في الموقع كله.`,
          flag: "script",
          deep: {
            why: "أغلب مشاكل Mongo في الإنتاج مش من Mongo نفسها، من تصميم مستندات منقول من SQL (كل حاجة collection لوحدها فكل صفحة ١٠ queries)، أو العكس (كل حاجة جوه مستند واحد لحد ما يتقل ويوصل للحد). والتصميم ده بيتسأل في أي انترفيو فيه Mongo.",
            how: R`القاعدة اللي MongoDB نفسها بتقولها: «البيانات اللي بتتقري مع بعض تتخزن مع بعض». فابدأ من الشاشات والـ endpoints: كل واحدة بتقرا إيه؟ وكل قد إيه؟ وبتكتب إيه؟

embed لما: العلاقة «جزء من» (عناوين اليوزر، بنود الأوردر)، والعدد صغير ومعروف حده، ومش محتاج تجيب الحاجة دي لوحدها من غير الأب. الميزة: قراية واحدة بتجيب كل حاجة، والكتابة على مستند واحد atomic من غير transaction.

reference لما: العدد مالوش سقف (تعليقات، لوجات، أوردرات اليوزر)، أو الحاجة بتتقري لوحدها (صفحة منتج)، أو بتتشارك بين كتير وبتتعدل (سعر المنتج الحالي، اسم اليوزر). المرجع هو [[_id]] بس، والـ join بيبقى query تانية أو [[$lookup]] أو [[populate]] (دروس جاية).

النسخة (denormalization): الأوردر شايل [[name]] و [[price]] من المنتج. ده مش تكرار غلط، ده تاريخ: السطر [[updateOne]] غيّر السعر لـ 800، والأوردر لسه بيقول 750، وده المطلوب في فاتورة. بس لو نسخت حاجة المفروض تفضل متزامنة (زي اسم اليوزر في كل تعليق)، إنت اللي مسؤول تحدّثها في كل مكان.

one-to-many بتتصمم على حسب «many» قد إيه: عشرات: array جوه الأب. مئات لآلاف: array من الـ ids في الأب أو [[userId]] في الابن. ملايين: الابن بس هو اللي بيشاور على الأب ([[userId]] في كل أوردر) ومعاه index، زي المثال.`,
            when: "أول ما تبدأ collection جديدة، وكل ما تلاقي صفحة بتعمل queries كتير أو مستند بيكبر مع الوقت.",
            mistakes: R`تنقل تصميم SQL زي ما هو: [[order_items]] collection لوحدها، فعرض أوردر واحد بقى ٣ queries. وتعمل العكس: اليوزر جواه array بكل أوردراته، فبعد سنة المستند بقى ميجات وكل login بيقراه كله (الدرس الجاي). وفي الانترفيو: «Mongo مفيهاش joins» غلط، فيه [[$lookup]]، بس التصميم الكويس بيقلل الحاجة ليه.`
          },
          teach: R`## نفس المحل بـ ٣ collections، وكل قرار وراه سؤال

المثال محل صغير: يوزر، ومنتج، وأوردر. كل collection فيها قرار: إيه اللي يتحط **جوه** المستند (embed)، وإيه اللي يبقى في مكان لوحده ونشاور عليه بالـ [[_id]] (reference). اتشغّل كله في mongosh على [[mongo:8]] على قاعدة shop فاضية.

السؤالين اللي بيحسموا:

1. الحاجة دي بتتقري **مع** الأب دايمًا؟ وعددها **محدود**؟ ← embed.
2. بتكبر من غير سقف؟ أو بتتقري لوحدها؟ أو بتتشارك بين مستندات كتير وبتتعدل؟ ← reference.

---

## ١. اليوزر وجواه العناوين (embed)

~~~javascript
db.users.insertOne({ _id: 1, name: "Sara", addresses: [{ city: "Cairo", street: "Tahrir 5", isDefault: true }] })
~~~

- [[_id: 1]]: احنا اللي اخترنا الـ id المرة دي (رقم بسيط عشان المثال)، فـ Mongo مش هيعمل ObjectId. الرد: [[{ acknowledged: true, insertedId: 1 }]]. ولو كتبته تاني بيرفض: [[E11000 duplicate key error ... index: _id_ dup key: { _id: 1 }]].
- [[addresses: [ {...} ]]]: array جواها objects. كل عنوان مستند صغير جوه اليوزر.

ليه embed؟ العناوين بتظهر في صفحة الحساب والـ checkout مع اليوزر، واليوزر عنده ٢ أو ٣ بالكتير، ومحدش بيفتح «عنوان» لوحده.

---

## ٢. المنتج لوحده (reference)

~~~javascript
db.products.insertOne({ _id: 10, name: "Keyboard", price: 750, stock: 40 })
~~~

ليه لوحده؟ ليه صفحة لوحده، وأوردرات كتير بتشاور عليه، وسعره ومخزونه بيتغيروا.

---

## ٣. الأوردر: reference ومعاه نسخة

~~~javascript
db.orders.insertOne({ userId: 1, status: "paid", createdAt: new Date(), items: [{ productId: 10, name: "Keyboard", price: 750, qty: 2 }], total: 1500 })
~~~

| الحقل | نوعه | ليه |
|---|---|---|
| [[userId: 1]] | reference لليوزر | اليوزر عنده أوردرات مالهاش سقف، فمش هنحطها جواه |
| [[createdAt: new Date()]] | تاريخ | [[new Date()]] = دلوقتي، وبيتخزن UTC |
| [[items: [...]]] | embed | بنود الأوردر جزء منه وبتتقري معاه دايمًا |
| [[productId: 10]] | reference للمنتج | لو حد عايز يفتح صفحة المنتج |
| [[name]] و [[price]] جوه البند | **نسخة** | السعر وقت الشرا، مش السعر الحالي |

النسخة دي اسمها **denormalization**: بنكرر حاجة عمدًا عشان القراية تبقى أسهل، أو عشان هي تاريخ.

---

## ٤. index لأهم شاشة

~~~javascript
db.orders.createIndex({ userId: 1, createdAt: -1 })
~~~

بيرجّع [[userId_1_createdAt_-1]]. الأوردرات في collection لوحدها، فلازم index يجيب أوردرات يوزر بسرعة ومترتبة (درس createIndex).

---

## ٥. صفحة «طلباتي»

~~~javascript
db.orders.find({ userId: 1 }).sort({ createdAt: -1 }).limit(10)
~~~

~~~text الناتج
[
  {
    _id: ObjectId('6ac4fceab9916775feb03969'),
    userId: 1,
    status: 'paid',
    createdAt: ISODate('2026-10-06T13:51:38.368Z'),
    items: [ { productId: 10, name: 'Keyboard', price: 750, qty: 2 } ],
    total: 1500
  }
]
~~~

query واحدة، والبنود باسم المنتج وسعره جوه، فمش محتاجين نروح لـ products. والـ [[Z]] في آخر التاريخ معناها UTC.

---

## ٦. صفحة الحساب

~~~javascript
db.users.findOne({ _id: 1 }, { name: 1, addresses: 1 })
~~~

~~~text الناتج
{
  _id: 1,
  name: 'Sara',
  addresses: [ { city: 'Cairo', street: 'Tahrir 5', isDefault: true } ]
}
~~~

برضه قراية واحدة، لأن العناوين جوه.

---

## ٧. و ٨. السعر اتغير

~~~javascript
db.products.updateOne({ _id: 10 }, { $set: { price: 800 } })
db.orders.findOne({ userId: 1 }, { items: 1, _id: 0 })
~~~

الأول [[matchedCount: 1, modifiedCount: 1]]. والتاني:

~~~text الناتج
{ items: [ { productId: 10, name: 'Keyboard', price: 750, qty: 2 } ] }
~~~

المنتج بقى 800، والأوردر لسه 750. ده **صح**: الفاتورة لازم تفضل بالسعر اللي اليوزر دفعه. لو كنا عاملين reference بس من غير نسخة، كل الفواتير القديمة كانت هتتغير.

---

## «many» قد إيه؟

| العدد | التصميم |
|---|---|
| قليل ومعروف (عناوين، بنود أوردر) | array جوه الأب |
| مئات لآلاف | array من الـ ids في الأب، أو id الأب في الابن |
| مالوش سقف (أوردرات، تعليقات، لوجات) | الابن بس شايل id الأب ([[userId]]) ومعاه index |

## الخلاصة

- ابدأ من الشاشات: كل شاشة بتقرا إيه مع بعض؟
- embed للصغير اللي بيتقري مع أبوه، و reference للي بيكبر أو بيتقري لوحده.
- النسخة (denormalization) مش غلط لما تكون تاريخ (سعر الشرا). لو لازم تفضل متزامنة، انت مسؤول تحدّثها.`,
          lines: [
            "ادخل قاعدة shop.",
            "العناوين جوه اليوزر: بتتقري معاه وعددها صغير.",
            "المنتج لوحده: بيتقري لوحده وبيتشارك بين أوردرات كتير.",
            "الأوردر بيشاور على اليوزر والمنتج، وشايل نسخة من الاسم والسعر وقت الشرا.",
            "index لأهم قراية: أوردرات يوزر بالأحدث.",
            "صفحة «طلباتي»: query واحدة من غير join.",
            "صفحة الحساب: اليوزر بعناوينه في قراية واحدة.",
            "السعر اتغير في المنتج...",
            "...والأوردر لسه شايل السعر القديم، وده الصح في فاتورة."
          ],
          sol: R`مفيش إجابة واحدة، بس التصميم المعقول:

[[authors]] collection لوحدها، والبوست فيه [[authorId]] ومعاه نسخة من [[authorName]] عشان صفحة البوست متعملش query زيادة (ولو الكاتب غيّر اسمه، [[updateMany]] على بوستاته).

[[tags]]: array من النصوص جوه البوست ([[tags: ["mongo", "node"]]]) ومعاه index، لأنها صغيرة ومش محتاجة صفحة لوحدها.

[[comments]]: collection لوحدها فيها [[postId]] و [[createdAt]]، لأن عددها مالوش سقف، وشاشة «أحدث ١٠٠ تعليق في الموقع» محتاجاها لوحدها. ومع البوست ممكن تحط [[commentCount]] وآخر ٣ تعليقات (الدرس الجاي).

الغلطة الشائعة: التعليقات كلها array جوه البوست. شغالة في الأول، وبعدين بوست مشهور يتقل، و «أحدث ١٠٠ تعليق» تبقى aggregate على كل البوستات.`,
          solCode: R`use blogdesign
db.authors.insertOne({ _id: 1, name: "Sara", bio: "..." })
db.posts.insertOne({ _id: 1, title: "Hello Mongo", authorId: 1, authorName: "Sara", tags: ["mongo", "node"], commentCount: 0, recentComments: [] })
db.posts.createIndex({ authorId: 1, createdAt: -1 })
db.posts.createIndex({ tags: 1 })
db.comments.insertOne({ postId: 1, author: "Omar", text: "nice", createdAt: new Date() })
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.comments.createIndex({ createdAt: -1 })
db.comments.find().sort({ createdAt: -1 }).limit(100)`
        },
        {
          cmd: "حد الـ 16MB و bucket",
          title: "array بتكبر من غير سقف: ليه خطر، وتعمل إيه بدلها",
          desc: R`أقصى حجم لمستند Mongo ١٦ ميجا، ولو [[$push]] عدّاه الكتابة بتفشل. بس المشكلة بتبان قبل كده بكتير: كل قراية للمستند بتسحب الـ array كلها، وكل تعديل بيكتبه تاني.

الحل: الحاجة اللي مالهاش سقف في collection لوحدها، والأب يشيل عدّاد وآخر كام واحدة بس ([[$slice]]). ولو البيانات كتير وصغيرة (قراءات حساس، أحداث)، اجمعها في «buckets» كل واحد فيه عدد محدود.`,
          example: R`use blog
db.posts.insertOne({ _id: 1, title: "Hello", commentCount: 0, recentComments: [] })
db.comments.insertOne({ postId: 1, author: "Omar", text: "nice", createdAt: new Date() })
db.posts.updateOne({ _id: 1 }, { $push: { recentComments: { $each: [{ author: "Omar", text: "nice" }], $slice: -3 } }, $inc: { commentCount: 1 } })
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.comments.find({ postId: 1 }).sort({ createdAt: -1 }).limit(20)
bsonsize(db.posts.findOne({ _id: 1 }))
db.posts.aggregate([{ $project: { bytes: { $bsonSize: "$$ROOT" } } }, { $sort: { bytes: -1 } }, { $limit: 5 }])
db.readings.updateOne({ sensorId: "s1", day: "2026-09-29", count: { $lt: 500 } }, { $push: { values: { t: new Date(), v: 21.5 } }, $inc: { count: 1 } }, { upsert: true })`,
          try: R`ضيف ٥ تعليقات بسطري التعليق (في loop)، واتأكد إن [[recentComments]] فيها آخر ٣ بس و [[commentCount]] بقى 5. وبعدين غيّر الـ 500 في سطر الـ readings لـ 3، وشغّله ٧ مرات، وشوف كام bucket اتعمل.`,
          flag: "script",
          deep: {
            why: "«اليوزر جواه array بكل الـ notifications» شغال أول شهر. بعد سنة المستند بقى ميجات، وكل صفحة بتقرا اليوزر (يعني كل request) بتسحبها كلها من الديسك والشبكة، ويوم ما يعدّي ١٦ ميجا الكتابة تقف خالص.",
            how: R`١٦ ميجا حد صارم على حجم المستند BSON (بالظبط 16777216 بايت). جرّبت أعمل [[$push]] على مستند ١٥ ميجا بحاجة ٢ ميجا، والسيرفر (mongo:8) رفض بـ [[Resulting document after update is larger than 16777216]]. والـ driver نفسه بيرفض يبعت insert أكبر من الحد قبل ما يوصل للسيرفر.

قبل الحد بكتير: المستند بيتقري ويتكتب كامل. [[$push]] على array فيها ١٠٠ ألف عنصر بيعيد كتابة المستند كله، والـ index على حقل جوه الـ array (multikey) فيه entry لكل عنصر.

subset pattern (السطر ٤): التعليقات كلها في [[comments]]، والبوست شايل [[commentCount]] وآخر ٣ بس. [[$each]] مع [[$slice: -3]] بيضيف ويقص في نفس الخطوة، فالـ array عمرها ما تعدّي ٣. صفحة البوست قراية واحدة، و «كل التعليقات» صفحة لوحدها بـ pagination على [[comments]].

قياس الحجم: [[bsonsize()]] في mongosh لمستند واحد، و [[$bsonSize: "$$ROOT"]] في aggregate عشان تلاقي أكبر المستندات في الـ collection كلها.

bucket pattern (آخر سطر): بدل مستند لكل قراية (ملايين مستندات صغيرة وindex ضخم)، أو مستند واحد للحساس (بيكبر للأبد)، مستند لكل حساس في اليوم وفيه لحد ٥٠٠ قراية. الشرط [[count: { $lt: 500 }]]: لو الـ bucket الحالي امتلى، الشرط مش هيطابق، و [[upsert]] يعمل bucket جديد. ولو شغلك قراءات بالوقت أصلًا، Mongo فيها time series collections ([[createCollection]] بـ [[timeseries]]) بتعمل ده لوحدها.

outlier pattern: لو ٩٩٪ من الكتب عندها كام مشتري وكتاب واحد عنده مليون، متغيرش التصميم كله عشانه: خلي الـ array تتقص عند حد، وحط [[hasExtras: true]] وكمّل الباقي في collection تانية للحالات الشاذة بس.`,
            when: "أي array ممكن تكبر مع الوقت أو مع الاستخدام: تعليقات، لايكات، notifications، لوج، تاريخ أسعار، أعضاء جروب كبير.",
            mistakes: R`تعمل unique index على [[{ sensorId: 1, day: 1 }]] في الـ buckets، فأول ما bucket يمتلي الـ upsert يفشل بـ duplicate key، لأن اليوم ممكن يبقى فيه أكتر من bucket. وتحط [[likes: [userIds]]] جوه البوست عشان «هل اليوزر ده عمل لايك؟»: الأحسن collection [[likes]] بـ unique index على [[{ postId: 1, userId: 1 }]]. وفي الانترفيو: الـ 16MB إجابة سؤال «إيه عيوب embed؟»، بس الإجابة الأقوى إن الأداء بيقع قبل الحد بكتير.`
          },
          teach: R`## مستند بيكبر للأبد = مشكلة مؤجلة

المثال فيه ٣ حتت: البوست شايل **آخر ٣ تعليقات بس** (subset pattern)، وأداتين تقيس بيهم حجم المستندات، وقراءات حساس متجمعة في **buckets**. اتشغّل كله في mongosh على [[mongo:8]] على قاعدة blog فاضية.

---

## الحد نفسه: ١٦ ميجا

جرّبته: مستند فيه نص ١٥ ميجا، وبعدين [[$push]] بنص ٢ ميجا:

~~~text الناتج
Uncaught MongoServerError: Plan executor error during update :: caused by :: Resulting document after update is larger than 16777216
~~~

[[16777216]] = 16 × 1024 × 1024 بايت بالظبط. والتعديل اترفض كله. بس المشكلة الحقيقية قبل كده: كل قراية للمستند بتجيبه كله، فمستند ٥ ميجا بيتسحب كامل في كل request.

---

## ١. و ٢. البوست والتعليق

~~~javascript
db.posts.insertOne({ _id: 1, title: "Hello", commentCount: 0, recentComments: [] })
db.comments.insertOne({ postId: 1, author: "Omar", text: "nice", createdAt: new Date() })
~~~

البوست فيه عدّاد [[commentCount]] و array فاضية [[recentComments]]. والتعليق نفسه في collection [[comments]] لوحده، وشايل [[postId]] (reference للبوست).

---

## ٣. السطر المهم: [[$push]] مع [[$each]] و [[$slice]]

~~~javascript
db.posts.updateOne({ _id: 1 }, { $push: { recentComments: { $each: [{ author: "Omar", text: "nice" }], $slice: -3 } }, $inc: { commentCount: 1 } })
~~~

نفكّه من جوه:

| الحتة | معناها |
|---|---|
| [[$push: { recentComments: ... }]] | ضيف للـ array دي |
| [[$each: [ {...} ]]] | العناصر اللي هتتضاف (لازم array، حتى لو واحد) |
| [[$slice: -3]] | بعد الإضافة، سيب آخر ٣ بس (السالب = من الآخر) |
| [[$inc: { commentCount: 1 }]] | وفي نفس الخطوة زوّد العدّاد |

[[$slice]] مش بيشتغل مع [[$push]] لوحده، لازم [[$each]] معاه، عشان كده الشكل ده. والتعديلين ([[$push]] و [[$inc]]) على نفس المستند في عملية واحدة، فـ atomic: يا الاتنين يحصلوا يا ولا واحد.

شغّلته ٤ مرات زيادة (nice 2 لـ nice 5)، والبوست بقى:

~~~text الناتج
{
  _id: 1,
  title: 'Hello',
  commentCount: 5,
  recentComments: [
    { author: 'Omar', text: 'nice 3' },
    { author: 'Omar', text: 'nice 4' },
    { author: 'Omar', text: 'nice 5' }
  ]
}
~~~

العدّاد ٥، والـ array عمرها ما تعدّي ٣. صفحة البوست تقرا مستند واحد صغير.

---

## ٤. و ٥. كل التعليقات من مكانها

~~~javascript
db.comments.createIndex({ postId: 1, createdAt: -1 })
db.comments.find({ postId: 1 }).sort({ createdAt: -1 }).limit(20)
~~~

لما اليوزر يدوس «كل التعليقات»: من collection التعليقات، بالأحدث، ٢٠ ٢٠ (pagination). والـ index على [[postId]] ثم [[createdAt]] عشان ده يبقى سريع مهما كبرت.

---

## ٦. حجم مستند

~~~javascript
bsonsize(db.posts.findOne({ _id: 1 }))
~~~

~~~text الناتج
110
~~~

[[bsonsize]] دالة في mongosh بترجّع حجم المستند بالبايت بصيغة BSON (الصيغة اللي Mongo بيخزن بيها).

## ٧. أكبر المستندات في الـ collection

~~~javascript
db.posts.aggregate([{ $project: { bytes: { $bsonSize: "$$ROOT" } } }, { $sort: { bytes: -1 } }, { $limit: 5 }])
~~~

- [[aggregate([...])]]: pipeline مراحل (درس aggregate بالتفصيل).
- [[$project: { bytes: ... }]]: لكل مستند اعمل حقل اسمه bytes.
- [[$bsonSize: "$$ROOT"]]: حجم... [[$$ROOT]] (بدولارين) متغير معناه «المستند كله».
- [[$sort: { bytes: -1 }]] و [[$limit: 5]]: الأكبر الأول، وأول ٥.

~~~text الناتج
[ { _id: 1, bytes: 110 } ]
~~~

على collection حقيقية، ده بيوريك مين بيقرّب من الحد قبل ما يفشل.

---

## ٨. bucket pattern

~~~javascript
db.readings.updateOne({ sensorId: "s1", day: "2026-09-29", count: { $lt: 500 } }, { $push: { values: { t: new Date(), v: 21.5 } }, $inc: { count: 1 } }, { upsert: true })
~~~

الفكرة: حساس بيبعت قراية كل ثانية. مستند لكل قراية = ملايين مستندات صغيرة. ومستند واحد للحساس = بيكبر للأبد. الحل الوسط: مستند (bucket) لكل حساس في اليوم، فيه لحد ٥٠٠ قراية.

| الحتة | معناها |
|---|---|
| [[{ sensorId: "s1", day: "2026-09-29", count: { $lt: 500 } }]] | الـ bucket بتاع الحساس ده في اليوم ده **اللي لسه فيه مكان** |
| [[$push: { values: {...} }]] | ضيف القراية |
| [[$inc: { count: 1 }]] | زوّد عدد القراءات |
| [[{ upsert: true }]] | لو مفيش bucket فيه مكان، اعمل جديد |

أول مرة مفيش حاجة، فاتعمل:

~~~text الناتج
{
  _id: ObjectId('6ac4fd1063a18ec3c7dd0c18'),
  day: '2026-09-29',
  sensorId: 's1',
  count: 1,
  values: [ { t: ISODate('2026-10-06T13:52:16.288Z'), v: 21.5 } ]
}
~~~

لاحظ إن [[sensorId]] و [[day]] اتنسخوا من الشرط (مساواة)، لكن [[count]] لأ (شرطه [[$lt]] مش مساواة)، فـ [[$inc]] عمله من 0 لـ 1. ولما الـ bucket يوصل 500، الشرط [[$lt: 500]] مش هيطابقه، فالـ upsert يعمل bucket جديد لنفس اليوم.

## الخلاصة

| المشكلة | الحل |
|---|---|
| array بتكبر من غير سقف | collection لوحدها + عدّاد + آخر كام واحد بـ [[$each]] و [[$slice]] |
| ملايين قراءات صغيرة | buckets بحد أقصى + [[upsert]] |
| عايز تعرف مين كبير | [[bsonsize()]] و [[$bsonSize: "$$ROOT"]] |

والحد ١٦ ميجا للمستند، بس الأداء بيقع قبله بكتير.`,
          lines: [
            "ادخل قاعدة blog.",
            "بوست فيه عدّاد و array صغيرة لآخر التعليقات بس.",
            "التعليق نفسه في collection لوحدها.",
            "في نفس الخطوة: ضيف لآخر التعليقات وقص لآخر ٣، وزوّد العداد.",
            "index لصفحة تعليقات البوست.",
            "كل التعليقات: من collection التعليقات بـ pagination.",
            "حجم مستند واحد بالبايت.",
            "أكبر ٥ مستندات في الـ collection بالحجم.",
            "bucket: ضيف القراية لبوكِت اليوم لو فيه مكان، وإلا اعمل bucket جديد."
          ],
          sol: R`بعد ٥ تعليقات: [[commentCount: 5]]، و [[recentComments]] فيها [[nice 2]] و [[nice 3]] و [[nice 4]] بس (الأقدم اتشالوا)، و [[comments]] فيها الخمسة كلهم.

الـ readings بحد ٣ و ٧ قراءات: ٣ مستندات لنفس الحساس ونفس اليوم، الـ count بتاعهم 3 و 3 و 1. الـ upsert بيعمل bucket جديد لما الشرط [[$lt]] ميطابقش.

لو طلعلك bucket واحد فيه ٧: غالبًا نسيت [[count]] في الشرط، أو كتبت [[$set]] بدل [[$inc]]. ولو طلع duplicate key error: عندك unique index على [[sensorId]] و [[day]]، امسحه.`,
          solCode: R`use blog
db.posts.deleteMany({}); db.comments.deleteMany({}); db.readings.deleteMany({})
db.posts.insertOne({ _id: 1, title: "Hello", commentCount: 0, recentComments: [] })
for (let i = 0; i < 5; i++) {
  db.comments.insertOne({ postId: 1, author: "Omar", text: "nice " + i, createdAt: new Date() })
  db.posts.updateOne({ _id: 1 }, { $push: { recentComments: { $each: [{ author: "Omar", text: "nice " + i }], $slice: -3 } }, $inc: { commentCount: 1 } })
}
db.posts.findOne({ _id: 1 })
for (let i = 0; i < 7; i++) db.readings.updateOne({ sensorId: "s1", day: "2026-09-29", count: { $lt: 3 } }, { $push: { values: { t: new Date(), v: 20 + i } }, $inc: { count: 1 } }, { upsert: true })
db.readings.find({}, { values: 0 })`
        },
        {
          cmd: "compound index و ESR",
          title: "ترتيب الحقول في الـ index: Equality ثم Sort ثم Range",
          desc: R`index على أكتر من حقل بيخدم الاستعلام لو الحقول مترتبة صح: حقول المساواة الأول، وبعدين حقل الـ sort، وبعدين حقول المدى ([[$gt]] و [[$in]] الكبيرة). ودي اسمها قاعدة ESR.

لو الترتيب غلط، Mongo بيستخدم الـ index بس بيرتّب في الرام (stage اسمها [[SORT]])، فبيقرا آلاف المفاتيح عشان يرجّعلك ٢٠. [[explain]] بيوريك ده، و [[hint]] بيجبره على index معيّن عشان تقارن.`,
          example: R`use shop
db.sales.insertMany(Array.from({ length: 100000 }, (_, i) => ({ userId: i % 5000, status: ["paid", "pending", "cancelled"][i % 3], total: Math.floor(Math.random() * 5000), createdAt: new Date(Date.UTC(2026, 0, 1) + i * 60000) })))
db.sales.createIndex({ status: 1, total: 1, createdAt: -1 }, { name: "ERS" })
db.sales.createIndex({ status: 1, createdAt: -1, total: 1 }, { name: "ESR" })
const q = { status: "paid", total: { $gte: 1000 } }
function plan(c) { const e = c.explain("executionStats"); return { stages: JSON.stringify(e.queryPlanner.winningPlan).match(/"stage":"[A-Z_]+"/g).map(s => s.slice(9, -1)).reverse().join(" -> "), keys: e.executionStats.totalKeysExamined, docs: e.executionStats.totalDocsExamined } }
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ERS"))
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ESR"))
plan(db.sales.find(q, { _id: 0, total: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(20).hint("ESR"))
plan(db.sales.find({ total: { $gte: 1000 } }).sort({ createdAt: -1 }).limit(20))`,
          try: R`شغّل المثال واكتب الأرقام الأربعة بتاعة [[keys]]. وبعدين زوّد index على [[{ createdAt: -1 }]] لوحده وشغّل آخر سطر تاني: الـ stages اتغيرت إزاي؟ ولسه فيه SORT؟`,
          flag: "script",
          deep: {
            why: "درس [[createIndex و explain]] بيقولك اعمل index. ده الخطوة اللي بعدها: عندك index والصفحة لسه بطيئة، لأن ترتيب حقوله مش ماشي مع الاستعلام. وده من أشهر أسئلة انترفيو Mongo والـ databases عمومًا.",
            how: R`الـ index المركّب مترتب بالحقل الأول، وجوه كل قيمة بالتاني، وهكذا. فتخيله دليل تليفونات مترتب بالمحافظة ثم الاسم.

E (Equality): [[status: "paid"]] بينقلك لجزء واحد متصل من الـ index. لازم تبقى الأول.

S (Sort): جوه الجزء ده، لو الحقل التاني هو [[createdAt]]، المفاتيح أصلًا مترتبة بالتاريخ، فـ Mongo بيمشي عليها بالترتيب ويقف بعد ٢٠ تطابق [[total >= 1000]]. النتيجة الحقيقية اللي جربتها على ١٠٠ ألف مستند: [[IXSCAN -> FETCH -> LIMIT]] و keys: 26.

R (Range): لو حطيت [[total]] قبل [[createdAt]] (الـ index اللي اسمه ERS)، المدى بيجيب مفاتيح مترتبة بالـ total مش بالتاريخ، فـ Mongo لازم يقراهم كلهم ويرتّب في الرام: [[IXSCAN -> SORT -> FETCH]] و keys: 26635 عشان ٢٠ نتيجة. وكمان الـ SORT في الرام ليه حد (١٠٠ ميجا)، ولو عدّاه بيكتب على الديسك أو بيفشل.

السطر قبل الأخير covered query: لو كل الحقول اللي بترجعها جوه الـ index وشلت [[_id]]، Mongo مش بيفتح المستندات خالص: [[PROJECTION_COVERED]] و docs: 0.

آخر سطر قاعدة الـ prefix: الاستعلام من غير [[status]] مش بيقدر يستخدم ولا واحد من الاتنين، لأن الاتنين بيبدأوا بـ status: [[COLLSCAN -> SORT]] و docs: 100000.

[[hint]] للمقارنة والتجربة بس. في الكود سيب الـ planner يختار، وهو هنا اختار ESR لوحده. والدالة [[plan]] بتلم أسماء الـ stages من الـ winningPlan وتقلبها عشان تتقري بترتيب تدفق البيانات.`,
            when: "أي استعلام فيه فلتر وترتيب مع بعض، وده تقريبًا كل صفحة فيها قايمة. قبل ما تعمل index اكتب الاستعلام الحقيقي وطبّق عليه ESR.",
            mistakes: R`تعمل index لكل حقل لوحده ([[status]] و [[total]] و [[createdAt]]) وتفتكر إن Mongo هيجمعهم: غالبًا هيستخدم واحد بس. وتعتبر [[$in]] مساواة دايمًا: [[$in]] بقيم قليلة بيتعامل زي Equality، بس لو بعدها sort ممكن Mongo يعمل merge أو SORT، فجرّب بـ explain. وتقرا [[executionTimeMillis]] بس على بيانات صغيرة: بص على keys و docs مقابل nReturned، دول اللي بيكبروا مع البيانات.`
          },
          teach: R`## تجربة: نفس الحقول التلاتة، بترتيبين، والفرق ألف ضعف

المثال بيعمل ١٠٠ ألف أوردر، وindexين على **نفس** الحقول بس بترتيب مختلف، وبعدين يسأل نفس السؤال بكل واحد ويقارن. السؤال: «أحدث ٢٠ أوردر مدفوع قيمتهم ١٠٠٠ أو أكتر». اتشغّل في mongosh على [[mongo:8]]، والأرقام تحت هي اللي طلعتلي (الـ total عشوائي فأرقامك هتختلف شوية).

---

## ١. البيانات

~~~javascript
db.sales.insertMany(Array.from({ length: 100000 }, (_, i) => ({ userId: i % 5000, status: ["paid", "pending", "cancelled"][i % 3], total: Math.floor(Math.random() * 5000), createdAt: new Date(Date.UTC(2026, 0, 1) + i * 60000) })))
~~~

من جوه لبرّه:

| الحتة | بتعمل إيه |
|---|---|
| [[Array.from({ length: 100000 }, (_, i) => ...)]] | array فيها ١٠٠ ألف عنصر، كل عنصر بيتعمل بالدالة دي، و [[i]] رقمه (0، 1، 2...). الـ [[_]] مكان argument مش محتاجينه |
| [[userId: i % 5000]] | [[%]] باقي القسمة: 5000 يوزر بيتكرروا |
| [[["paid", "pending", "cancelled"][i % 3]]] | array واختار منها عنصر حسب الباقي على 3: كل حالة تلت الأوردرات |
| [[Math.floor(Math.random() * 5000)]] | رقم عشوائي صحيح من 0 لـ 4999 |
| [[new Date(Date.UTC(2026, 0, 1) + i * 60000)]] | من أول يناير 2026 (الشهور في JS بتبدأ من 0)، وكل أوردر بعد اللي قبله بدقيقة (60000 مللي ثانية) |

و [[insertMany]] بتبعتهم كلهم في رحلة واحدة تقريبًا، فخلصت في ثواني.

---

## ٢. و ٣. الـ index الغلط والصح

~~~javascript
db.sales.createIndex({ status: 1, total: 1, createdAt: -1 }, { name: "ERS" })
db.sales.createIndex({ status: 1, createdAt: -1, total: 1 }, { name: "ESR" })
~~~

[[{ name: "ERS" }]] بيدّي الـ index اسم احنا اخترناه بدل [[status_1_total_1_createdAt_-1]]. الاسمين اختصار ترتيب الحقول:

| الحرف | الكلمة | الحقل هنا | نوع الشرط |
|---|---|---|---|
| E | Equality (مساواة) | [[status: "paid"]] | قيمة واحدة |
| S | Sort (ترتيب) | [[createdAt: -1]] | الـ sort |
| R | Range (مدى) | [[total: { $gte: 1000 }]] | أكبر من / أصغر من |

---

## ٤. الاستعلام في متغير

~~~javascript
const q = { status: "paid", total: { $gte: 1000 } }
~~~

[[const]] بيعمل متغير في mongosh عشان مانكررش الشرط في كل سطر.

---

## ٥. الدالة [[plan]]

~~~javascript
function plan(c) { const e = c.explain("executionStats"); return { stages: ..., keys: e.executionStats.totalKeysExamined, docs: e.executionStats.totalDocsExamined } }
~~~

بتاخد cursor ([[c]])، وتعمل عليه [[explain("executionStats")]]، وترجّع ٣ حاجات بس من الناتج الطويل:

- [[stages]]: أسماء المراحل. [[JSON.stringify(...)]] بيحوّل الخطة لنص، و [[.match(/"stage":"[A-Z_]+"/g)]] بيلقط كل [["stage":"IXSCAN"]] بـ regular expression، و [[.slice(9, -1)]] بيقص [["stage":"]] (٩ حروف) من الأول والعلامة من الآخر، و [[.reverse()]] بيقلب الترتيب عشان يتقري زي مسار البيانات (من أول مرحلة لآخرها)، و [[.join(" -> ")]] بيوصّلهم بسهم.
- [[keys]]: كام مفتاح اتقرا من الـ index.
- [[docs]]: كام مستند اتفتح.

---

## ٦. بـ ERS (المدى قبل الترتيب)

~~~javascript
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ERS"))
~~~

[[.hint("ERS")]] بيجبر Mongo يستخدم الـ index ده، عشان نقارن.

~~~text الناتج
{ stages: 'IXSCAN -> SORT -> FETCH', keys: 26683, docs: 20 }
~~~

الـ index مترتب: status، وجوه paid مترتب بالـ total. المدى [[total >= 1000]] بيجيب كل الأوردرات المدفوعة اللي فوق ١٠٠٠ (حوالي ٢٦ ألف)، **مترتبين بالـ total مش بالتاريخ**. فـ Mongo لازم يقراهم كلهم، ويرتّبهم بالتاريخ في الرام (**SORT**)، وبعدين ياخد ٢٠. ٢٦ ألف مفتاح عشان ٢٠ نتيجة.

---

## ٧. بـ ESR

~~~javascript
plan(db.sales.find(q).sort({ createdAt: -1 }).limit(20).hint("ESR"))
~~~

~~~text الناتج
{ stages: 'IXSCAN -> FETCH -> LIMIT', keys: 28, docs: 20 }
~~~

هنا جوه paid المفاتيح مترتبة **بالتاريخ** من الأحدث. Mongo بيمشي عليها بالترتيب، ويشيك على الـ total وهو ماشي (مفتاح فيه total أقل من ١٠٠٠ بيتفوّت)، ويقف أول ما يلاقي ٢٠. ٢٨ مفتاح بس، ومفيش SORT خالص.

ومن غير [[hint]] الـ planner اختار ESR لوحده: نفس [[IXSCAN -> FETCH -> LIMIT]] و keys 28.

---

## ٨. covered query

~~~javascript
plan(db.sales.find(q, { _id: 0, total: 1, createdAt: 1 }).sort({ createdAt: -1 }).limit(20).hint("ESR"))
~~~

~~~text الناتج
{ stages: 'IXSCAN -> PROJECTION_COVERED -> LIMIT', keys: 28, docs: 0 }
~~~

الـ projection طالب [[total]] و [[createdAt]] بس، والاتنين جوه الـ index، و [[_id: 0]] شالت الحقل الوحيد اللي مش فيه. فـ Mongo جاوب من الـ index لوحده: [[docs: 0]]، ومفيش FETCH. ده أسرع شكل ممكن.

---

## ٩. من غير أول حقل

~~~javascript
plan(db.sales.find({ total: { $gte: 1000 } }).sort({ createdAt: -1 }).limit(20))
~~~

~~~text الناتج
{ stages: 'COLLSCAN -> SORT', keys: 0, docs: 100000 }
~~~

الاتنين بيبدأوا بـ [[status]]، والاستعلام مفيهوش status، فولا واحد ينفع. زي دليل تليفونات مترتب بالمحافظة وانت بتدوّر بالاسم بس. القاعدة اسمها **prefix**: الـ index بيخدم الاستعلامات اللي بتستخدم أول حقل (أو أول حقلين...) منه.

وجرّبت الـ [[try]]: بعد [[createIndex({ createdAt: -1 })]] نفس السطر بقى [[{ stages: 'IXSCAN -> FETCH -> LIMIT', keys: 27, docs: 27 }]]. بيمشي بالتاريخ ويفلتر total وهو ماشي.

## الخلاصة

| الـ index | stages | keys | docs |
|---|---|---|---|
| ERS | [[IXSCAN -> SORT -> FETCH]] | 26683 | 20 |
| ESR | [[IXSCAN -> FETCH -> LIMIT]] | 28 | 20 |
| ESR + covered | [[IXSCAN -> PROJECTION_COVERED -> LIMIT]] | 28 | 0 |
| من غير status | [[COLLSCAN -> SORT]] | 0 | 100000 |

- رتّب حقول الـ index: مساواة، ثم ترتيب، ثم مدى.
- [[SORT]] في الخطة = الترتيب في الرام، وده علامة إن الـ index مش ماشي مع الـ sort.
- [[hint]] للتجربة بس، وبص على [[keys]] و [[docs]] مقابل عدد النتايج.`,
          lines: [
            "ادخل قاعدة shop.",
            "١٠٠ ألف أوردر بحالات وأرقام وتواريخ مختلفة.",
            "index بترتيب غلط: المدى قبل الـ sort.",
            "نفس الحقول بترتيب ESR: مساواة، ترتيب، مدى.",
            "الاستعلام: مساواة على status ومدى على total.",
            "دالة صغيرة بتطلّع الـ stages وعدد المفاتيح والمستندات اللي اتقرت.",
            "بالـ index الغلط: SORT في الرام وآلاف المفاتيح.",
            "بـ ESR: مفيش SORT، وقرا حوالي ٢٠ مفتاح بس.",
            "covered: كل الحقول في الـ index، فمفيش مستندات اتفتحت.",
            "من غير أول حقل: مفيش index ينفع، فـ COLLSCAN."
          ],
          sol: R`الأرقام اللي طلعتلي (الـ total عشوائي فأرقامك هتقرب منها): ERS تقريبًا 26600 مفتاح مع [[SORT]]، و ESR حوالي 26، و covered حوالي 26 ومعاه docs: 0، والأخير 0 مفاتيح و docs: 100000 مع [[COLLSCAN]].

بعد [[createIndex({ createdAt: -1 })]]: آخر سطر بيبقى [[IXSCAN -> FETCH -> LIMIT]] من غير SORT: بيمشي على التواريخ بالترتيب ويفلتر total وهو ماشي، ويقف بعد ٢٠. keys و docs حوالي ٢٥ بدل ١٠٠ ألف.

لو شايف ERS هو اللي اتختار من غير [[hint]]: ده مش هيحصل هنا لأن الـ planner بيجرّب الاتنين ويختار الأسرع. ولو [[keys]] بتاعة ESR طلعت بالآلاف، اتأكد إن الـ sort [[createdAt: -1]] نفس اتجاه الـ index أو عكسه بالظبط.`,
          solCode: R`// في نفس الـ mongosh بعد المثال، عشان الدالة plan والبيانات موجودين
db.sales.createIndex({ createdAt: -1 })
plan(db.sales.find({ total: { $gte: 1000 } }).sort({ createdAt: -1 }).limit(20))
db.sales.getIndexes().map(i => i.name)`
        },
        {
          cmd: "aggregate و $group",
          title: "تقرير الإيراد لكل شهر بـ aggregate",
          desc: R`[[aggregate]] بياخد pipeline: array من المراحل، كل مرحلة بتاخد ناتج اللي قبلها. [[$match]] بيفلتر (زي WHERE)، و [[$group]] بيجمّع ويحسب (زي GROUP BY مع SUM و COUNT)، و [[$sort]] بيرتّب، و [[$project]] بيشكّل الناتج.

التقرير هنا: إيراد الأوردرات المدفوعة لكل شهر، بتوقيت القاهرة مش UTC.`,
          example: R`use shop
db.orders.aggregate([
  { $match: { status: "paid", createdAt: { $gte: ISODate("2026-01-01T00:00:00+02:00"), $lt: ISODate("2027-01-01T00:00:00+02:00") } } },
  { $group: {
      _id: { $dateTrunc: { date: "$createdAt", unit: "month", timezone: "Africa/Cairo" } },
      revenue: { $sum: "$total" },
      orders: { $sum: 1 },
      avgOrder: { $avg: "$total" }
  } },
  { $sort: { _id: 1 } },
  { $project: { _id: 0, month: { $dateToString: { date: "$_id", format: "%Y-%m", timezone: "Africa/Cairo" } }, revenue: 1, orders: 1, avgOrder: { $round: ["$avgOrder", 2] } } }
])
db.orders.createIndex({ status: 1, createdAt: 1 })`,
          try: R`ضيف ٥ أوردرات في يناير وفبراير ومارس، منهم واحد [[paid]] تاريخه [[2026-01-31T23:30:00Z]] وواحد [[cancelled]]. شغّل التقرير، وبعدين شغّله تاني بـ [[$dateToString]] من غير timezone في الـ [[$group]]. يناير وفبراير اتغيروا ليه؟`,
          flag: "script",
          deep: {
            why: "أول ما يبقى عندك بيانات حقيقية، حد هيسأل «بعنا بكام الشهر ده؟» أو «أكتر منتج بيتباع؟». من غير aggregate هتجيب كل الأوردرات للـ Node وتجمعهم بـ loop: بطيء، وبياكل رام، وبينقل ميجات على الشبكة عشان ١٢ رقم.",
            how: R`المراحل بتتنفذ بالترتيب، والترتيب فارق في السرعة: [[$match]] في الأول بيقدر يستخدم index ([[{ status: 1, createdAt: 1 }]] هنا، مساواة ثم مدى)، وبيقلل المستندات اللي داخلة على باقي المراحل. [[$match]] بعد [[$group]] بيفلتر على الناتج (زي HAVING).

[[$group]]: الـ [[_id]] هو مفتاح التجميع (أي expression)، وكل حقل تاني accumulator: [[$sum: "$total"]] مجموع الحقل، و [[$sum: 1]] عدد، و [[$avg]] و [[$min]] و [[$max]] و [[$push]] (array بالقيم). [[$field]] بعلامة الدولار معناها «قيمة الحقل ده».

التوقيت: [[createdAt]] متخزن UTC دايمًا. أوردر [[2026-01-31T23:30:00Z]] في القاهرة هو ١ فبراير الساعة ١:٣٠ الصبح. [[$dateTrunc]] مع [[timezone: "Africa/Cairo"]] بيقص لأول الشهر بتوقيت القاهرة، وحدود [[$match]] مكتوبة بـ [[+02:00]] لنفس السبب. جربتها: بالتوقيت ده يناير ١٥٠٠ وفبراير ٦٩٠٠، ومن غيره يناير ١٨٠٠ وفبراير ٦٦٠٠.

[[$project]]: [[0]] يشيل حقل، و [[1]] يسيبه، وأي expression بيعمل حقل جديد. [[$dateToString]] يحوّل التاريخ لنص [[2026-02]]، و [[$round]] يقرّب.

كل مرحلة ليها حد ١٠٠ ميجا رام. [[$group]] و [[$sort]] على بيانات كبيرة بيكتبوا على الديسك لوحدهم (allowDiskUse شغال افتراضيًا من MongoDB 6)، بس ده بطيء، فالأحسن [[$match]] يقلل البيانات الأول.`,
            when: "أي تقرير أو dashboard أو إحصائية: إيراد، أكتر منتجات، يوزرز جداد بالأسبوع. ولو التقرير تقيل وبيتطلب كتير، احفظ ناتجه في collection بـ [[$merge]] وحدّثه كل ساعة.",
            mistakes: R`تجمع بالشهر من غير timezone فأرقام أول وآخر يوم في الشهر تروح للشهر الغلط، والمحاسب يلاقي فرق مع السيستم التاني. وتكتب [[total]] بدل [[$total]] في [[$sum]] فيحسب صفر أو يطلع error. وتحط [[$match]] بعد [[$project]] أو [[$group]] فيفقد الـ index. وتخزّن الفلوس كـ double: [[0.1 + 0.2]] مش 0.3؛ خزّنها قروش كـ int أو [[Decimal128]].`
          },
          teach: R`## pipeline = خط إنتاج

[[aggregate]] بياخد **array من المراحل**. المستندات بتدخل أول مرحلة، وناتجها يدخل اللي بعدها، وهكذا، زي خط إنتاج في مصنع. المثال فيه ٤ مراحل: فلتر، ثم جمّع بالشهر، ثم رتّب، ثم شكّل الناتج. اتشغّل في mongosh على [[mongo:8]] بالـ ٥ أوردرات اللي في الـ solCode (٤ مدفوعين وواحد cancelled، منهم أوردر يوم ٣١ يناير الساعة 23:30 UTC).

~~~text مسار البيانات
5 أوردرات  →  $match  →  4  →  $group  →  3 شهور  →  $sort  →  $project  →  الناتج
~~~

---

## المرحلة ١: [[$match]] (زي WHERE)

~~~javascript
{ $match: { status: "paid", createdAt: { $gte: ISODate("2026-01-01T00:00:00+02:00"), $lt: ISODate("2027-01-01T00:00:00+02:00") } } }
~~~

نفس شكل شرط [[find]] بالظبط: المدفوع بس، وفي سنة 2026.

- [[ISODate("...")]]: بيعمل تاريخ من نص بصيغة ISO (سنة-شهر-يوم ثم T ثم الوقت).
- [[+02:00]] في الآخر: الوقت ده بتوقيت القاهرة (UTC + ساعتين). Mongo بيحوّله لـ UTC وهو بيخزنه. جرّبت:

~~~text ISODate("2026-01-01T00:00:00+02:00")
ISODate('2025-12-31T22:00:00.000Z')
~~~

يعني أول السنة في القاهرة = الساعة ١٠ بالليل ٣١ ديسمبر UTC.

- [[$gte]] من أول السنة (شامل)، و [[$lt]] لحد أول السنة الجاية (مش شامل). ده أنضف شكل لمدى زمني.

الـ cancelled خرج هنا، ودخل ٤ بس.

---

## المرحلة ٢: [[$group]] (زي GROUP BY)

~~~javascript
{ $group: {
    _id: { $dateTrunc: { date: "$createdAt", unit: "month", timezone: "Africa/Cairo" } },
    revenue: { $sum: "$total" },
    orders: { $sum: 1 },
    avgOrder: { $avg: "$total" }
} }
~~~

### [[_id]] = مفتاح التجميع

كل المستندات اللي ليها نفس [[_id]] بتبقى صف واحد. هنا المفتاح أول الشهر:

- [["$createdAt"]]: الـ [[$]] قبل اسم حقل جوه aggregate معناها «**قيمة** الحقل ده في المستند الحالي». من غيرها تبقى نص عادي.
- [[$dateTrunc]]: بيقص التاريخ لأول الوحدة. [[unit: "month"]] = أول الشهر.
- [[timezone: "Africa/Cairo"]]: القص يتعمل بتوقيت القاهرة مش UTC. ([["Africa/Cairo"]] اسم المنطقة من قاعدة بيانات التوقيتات العالمية، وبيعرف التوقيت الصيفي لوحده.)

شغّلت الـ group لوحده عشان نشوف المفتاح:

~~~text الناتج
[
  { _id: ISODate('2025-12-31T22:00:00.000Z'), revenue: 1500 },
  { _id: ISODate('2026-01-31T22:00:00.000Z'), revenue: 6900 },
  { _id: ISODate('2026-02-28T22:00:00.000Z'), revenue: 850 }
]
~~~

الـ [[_id]] شكله غريب، بس هو أول يناير وأول فبراير وأول مارس **في القاهرة**، مكتوبين UTC.

### باقي الحقول = accumulators

كل حقل غير [[_id]] بيحسب حاجة على مستندات الصف:

| الحقل | الـ accumulator | معناه |
|---|---|---|
| [[revenue]] | [[{ $sum: "$total" }]] | اجمع قيمة total |
| [[orders]] | [[{ $sum: 1 }]] | اجمع 1 لكل مستند = العدد |
| [[avgOrder]] | [[{ $avg: "$total" }]] | المتوسط |

وفيه كمان [[$min]] و [[$max]] و [[$push]] (array بالقيم). ولو نسيت الـ [[$]] وكتبت [[$sum: "total"]]، جرّبتها: [[[ { _id: null, r: 0 } ]]]. صفر، لأنه بيجمع النص "total" مش الحقل.

---

## المرحلة ٣: [[$sort]]

~~~javascript
{ $sort: { _id: 1 } }
~~~

رتّب الصفوف بالمفتاح (الشهر) تصاعدي. [[$group]] مش بيضمن أي ترتيب.

---

## المرحلة ٤: [[$project]] (شكل الناتج)

~~~javascript
{ $project: { _id: 0, month: { $dateToString: { date: "$_id", format: "%Y-%m", timezone: "Africa/Cairo" } }, revenue: 1, orders: 1, avgOrder: { $round: ["$avgOrder", 2] } } }
~~~

| الحتة | معناها |
|---|---|
| [[_id: 0]] | شيل الـ _id |
| [[month: { $dateToString: ... }]] | حقل جديد: التاريخ كنص |
| [[format: "%Y-%m"]] | [[%Y]] السنة بـ ٤ أرقام، و [[%m]] الشهر برقمين |
| [[timezone: "Africa/Cairo"]] | لازم هنا كمان، وإلا [[2025-12-31T22:00Z]] يتكتب [[2025-12]] |
| [[revenue: 1]] و [[orders: 1]] | سيبهم زي ما هم |
| [[$round: ["$avgOrder", 2]]] | قرّب لرقمين بعد العلامة |

---

## الناتج

~~~text الناتج
[
  { revenue: 1500, orders: 1, month: '2026-01', avgOrder: 1500 },
  { revenue: 6900, orders: 2, month: '2026-02', avgOrder: 3450 },
  { revenue: 850, orders: 1, month: '2026-03', avgOrder: 850 }
]
~~~

فبراير فيه أوردرين: الـ 6600، والـ 300 بتاع [[2026-01-31T23:30:00Z]]، لأنه في القاهرة الساعة 1:30 الصبح يوم ١ فبراير. و 6900 ÷ 2 = 3450.

### ومن غير timezone؟

نفس التقرير بـ [[$dateToString]] من غير timezone في الـ group:

~~~text الناتج
[
  { _id: '2026-01', revenue: 1800 },
  { _id: '2026-02', revenue: 6600 },
  { _id: '2026-03', revenue: 850 }
]
~~~

الـ 300 راحت يناير. الرقمين «صح» حسابيًا، بس واحد بس صح للبيزنس اللي شغال بتوقيت القاهرة.

---

## آخر سطر: index للـ [[$match]]

~~~javascript
db.orders.createIndex({ status: 1, createdAt: 1 })
~~~

بيرجّع [[status_1_createdAt_1]]. [[$match]] في أول الـ pipeline بيستخدم indexes زي [[find]] بالظبط، ومساواة ([[status]]) ثم مدى ([[createdAt]]). بعد [[$group]] مفيش indexes، فالفلتر لازم يبقى الأول.

## الخلاصة

| المرحلة | زي SQL | بتعمل إيه |
|---|---|---|
| [[$match]] | WHERE | فلتر، وحطه الأول |
| [[$group]] | GROUP BY | [[_id]] المفتاح، والباقي [[$sum]]/[[$avg]]... |
| [[$sort]] | ORDER BY | ترتيب |
| [[$project]] | SELECT | شكل الناتج |

و [["$field"]] = قيمة الحقل، والتواريخ متخزنة UTC فالـ timezone لازم في الجمع والعرض.`,
          lines: [
            "ادخل قاعدة shop.",
            "ابدأ pipeline على الأوردرات:",
            "فلتر: المدفوع بس، في سنة 2026 بتوقيت القاهرة.",
            "جمّع:",
            "المفتاح: أول الشهر بتوقيت القاهرة.",
            "مجموع الإيراد.",
            "عدد الأوردرات.",
            "متوسط الأوردر.",
            "قفلة الـ group.",
            "رتّب بالشهر تصاعدي.",
            "شكّل الناتج: الشهر نص، والمتوسط مقرّب لرقمين.",
            "قفلة الـ pipeline.",
            "index يخدم الـ $match: مساواة على status ثم مدى على التاريخ."
          ],
          sol: R`بالبيانات اللي في الحل: ٣ صفوف، [[2026-01]] إيراد 1500 وأوردر واحد، و [[2026-02]] إيراد 6900 وأوردرين ومتوسط 3450، و [[2026-03]] إيراد 850. الـ cancelled مش محسوب.

من غير timezone: يناير 1800 وفبراير 6600. أوردر الـ 300 اللي الساعة [[23:30Z]] يوم ٣١ يناير هو في القاهرة ١ فبراير، فبتوقيت القاهرة بيروح لفبراير. أنهي واحد «صح»؟ اللي البيزنس بيشتغل بيه، وهنا القاهرة.

لو كل الشهور طلعت بصفر: غالبًا كتبت [[$sum: "total"]] من غير [[$]]. ولو طلع صف [[_id: null]]: فيه أوردرات مفيهاش [[createdAt]].`,
          solCode: R`use shop
db.orders.deleteMany({})
db.orders.insertMany([
  { userId: 1, status: "paid", createdAt: ISODate("2026-01-15T10:00:00Z"), items: [{ productId: 10, price: 750, qty: 2 }], total: 1500 },
  { userId: 2, status: "paid", createdAt: ISODate("2026-01-31T23:30:00Z"), items: [{ productId: 11, price: 300, qty: 1 }], total: 300 },
  { userId: 1, status: "paid", createdAt: ISODate("2026-02-10T12:00:00Z"), items: [{ productId: 12, price: 6000, qty: 1 }, { productId: 11, price: 300, qty: 2 }], total: 6600 },
  { userId: 2, status: "cancelled", createdAt: ISODate("2026-02-11T12:00:00Z"), items: [{ productId: 12, price: 6000, qty: 1 }], total: 6000 },
  { userId: 2, status: "paid", createdAt: ISODate("2026-03-05T09:00:00Z"), items: [{ productId: 10, price: 800, qty: 1 }, { productId: 99, price: 50, qty: 1 }], total: 850 }
])
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: { $dateToString: { date: "$createdAt", format: "%Y-%m" } }, revenue: { $sum: "$total" } } },
  { $sort: { _id: 1 } }
])`
        },
        {
          cmd: "$lookup و $unwind",
          title: "join في aggregate: أكتر المنتجات مبيعًا بأساميها",
          desc: R`[[$unwind]] بيفك array: أوردر فيه ٣ بنود بيبقى ٣ مستندات، كل واحد فيه بند. و [[$lookup]] بيجيب مستندات من collection تانية (زي LEFT JOIN) ويحطها في array.

الترتيب المهم: جمّع وقص الأول ([[$group]] ثم [[$limit]])، وبعدين [[$lookup]] على الـ ٥ اللي فضلوا بس، مش على كل بند في كل أوردر.`,
          example: R`use shop
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $unwind: "$items" },
  { $group: { _id: "$items.productId", qty: { $sum: "$items.qty" }, revenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } },
  { $sort: { revenue: -1 } },
  { $limit: 5 },
  { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } },
  { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
  { $project: { _id: 0, productId: "$_id", name: { $ifNull: ["$product.name", "(deleted)"] }, stock: "$product.stock", qty: 1, revenue: 1 } }
])`,
          try: R`بنفس بيانات الدرس اللي فات، وضيف [[products]] للـ ids ‏10 و 11 و 12 بس (سيب 99 من غير منتج). شغّل المثال، وبعدين شيل [[preserveNullAndEmptyArrays]] وشوف مين اختفى. وفي الآخر اكتب pipeline لأكتر ٣ يوزرز صرفوا، بأساميهم من [[users]].`,
          flag: "script",
          deep: {
            why: "تقارير كتير محتاجة بيانات من collection تانية: اسم المنتج، اسم العميل. [[$lookup]] بيعمل ده جوه السيرفر في طلب واحد، بدل ما تجيب النتايج للـ Node وتعمل query لكل صف.",
            how: R`[[$unwind: "$items"]]: كل عنصر في الـ array بيبقى مستند لوحده فيه باقي حقول الأوردر، و [[items]] بقت object مش array. بعدها [[$group]] بـ [[$items.productId]] بيجمع البنود من كل الأوردرات. ٥ أوردرات فيهم ٧ بنود بيبقوا ٧ مستندات.

[[$multiply]] بيحسب سعر البند × الكمية. لاحظ إن السعر جاي من البند (السعر وقت البيع)، مش من [[products]] (السعر الحالي)، وده اللي خلى التصميم في أول درس ينسخ السعر.

[[$lookup]] بـ [[localField]] و [[foreignField]]: لكل مستند داخل، هات من [[products]] اللي [[_id]] بتاعهم يساوي الـ [[_id]] هنا، وحطهم في array اسمها [[product]]. هي array دايمًا حتى لو واحد، عشان كده [[$unwind]] بعدها يحوّلها object.

[[preserveNullAndEmptyArrays: true]]: منتج اتمسح (99) الـ array بتاعته فاضية، و [[$unwind]] العادي بيشيل المستند خالص، فالإيراد بتاعه يختفي من التقرير. معاها بيفضل، و [[$ifNull]] بيكتب «(deleted)».

السرعة: [[$lookup]] بيعمل بحث في الـ collection التانية لكل مستند داخل، فلازم [[foreignField]] يبقى عليه index ([[_id]] دايمًا عليه). وعشان كده [[$limit]] قبله: ٥ عمليات بحث بدل آلاف. وفيه شكل تاني بـ [[let]] و [[pipeline]] لو محتاج شرط أكتر من مساواة أو تختار حقول معينة.`,
            when: "تقارير ولوحات إدارة تجمع من أكتر من collection. لو نفس الـ lookup بيتعمل في كل request عادي للتطبيق، ده غالبًا علامة إن البيانات دي المفروض تبقى embedded أو منسوخة (أول درس).",
            mistakes: R`[[$lookup]] في أول الـ pipeline على كل الأوردرات قبل [[$match]] و [[$limit]]: بيعمل بحث لكل مستند في الـ collection. وتنسى [[$unwind]] بعد [[$lookup]] فتكتب [[$product.name]] وترجعلك array بدل نص. و [[$unwind]] من غير preserve بيشيل صفوف في صمت، فالتقرير يطلع أقل من الحقيقة ومحدش يلاحظ.`
          },
          teach: R`## التقرير: أكتر ٥ منتجات جابت فلوس، بأساميها

نفس فكرة الـ pipeline من الدرس اللي فات، بس المرة دي فيه مرحلتين جداد: [[$unwind]] (تفك array) و [[$lookup]] (تجيب من collection تانية). اتشغّل في mongosh على [[mongo:8]] بنفس الـ ٥ أوردرات، ومعاهم [[products]] فيها 10 و 11 و 12 بس (المنتج 99 «اتمسح»).

~~~text مسار البيانات
4 أوردرات مدفوعة → $unwind → 6 بنود → $group → 4 منتجات → $sort/$limit → $lookup → $unwind → $project
~~~

---

## ١. [[$match]]

~~~javascript
{ $match: { status: "paid" } }
~~~

المدفوع بس، والـ cancelled برّه. ٤ أوردرات.

---

## ٢. [[$unwind: "$items"]]

كل أوردر فيه array [[items]]. [[$unwind]] بيعمل **نسخة من الأوردر لكل بند**، وفي كل نسخة [[items]] بقت object واحد مش array. الـ ٤ أوردرات فيهم ٦ بنود، فطلعوا ٦ مستندات (عدّيتهم بـ [[$count]]). أول اتنين:

~~~text الناتج
[
  {
    _id: ObjectId('6ac4fd80423a29a694c3362d'),
    userId: 1,
    status: 'paid',
    createdAt: ISODate('2026-01-15T10:00:00.000Z'),
    items: { productId: 10, price: 750, qty: 2 },
    total: 1500
  },
  {
    _id: ObjectId('6ac4fd80423a29a694c3362e'),
    ...
    items: { productId: 11, price: 300, qty: 1 },
    ...
  }
]
~~~

لاحظ [[items: { ... }]] من غير [[[ ]]]. كده نقدر نجمّع بحقل جوه البند.

---

## ٣. [[$group]] بالمنتج

~~~javascript
{ $group: { _id: "$items.productId", qty: { $sum: "$items.qty" }, revenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } }
~~~

- [["$items.productId"]]: النقطة بتدخل جوه object: «حقل productId اللي جوه items». ده المفتاح، فكل منتج صف.
- [[qty: { $sum: "$items.qty" }]]: إجمالي القطع.
- [[$multiply: ["$items.price", "$items.qty"]]]: اضرب سعر البند × كميته، و [[$sum]] بيجمع الناتج. السعر هنا **سعر البند وقت البيع**، مش السعر الحالي في products.

---

## ٤. و ٥. [[$sort]] و [[$limit]]

~~~javascript
{ $sort: { revenue: -1 } },
{ $limit: 5 },
~~~

الأعلى إيراد الأول، وأول ٥ بس. ده **قبل** الـ lookup عمدًا: الـ lookup بيعمل بحث لكل مستند داخل، فـ ٥ أحسن من آلاف.

---

## ٦. [[$lookup]] (زي LEFT JOIN)

~~~javascript
{ $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "product" } }
~~~

| الحقل | معناه |
|---|---|
| [[from: "products"]] | دوّر في collection products |
| [[localField: "_id"]] | خد الحقل ده من المستند الداخل (الـ _id هنا = productId بعد الـ group) |
| [[foreignField: "_id"]] | وطابقه مع الحقل ده في products |
| [[as: "product"]] | وحط اللي لقيته في حقل جديد بالاسم ده |

وقفت الـ pipeline بعده عشان نشوف شكله:

~~~text الناتج
[
  {
    _id: 12,
    qty: 1,
    revenue: 6000,
    product: [ { _id: 12, name: 'Monitor', price: 6000, stock: 5 } ]
  }
]
~~~

[[product]] **array** حتى لو لقى واحد بس، لأن [[$lookup]] ممكن يلاقي كذا مستند. ولو ملقاش حاجة (المنتج 99) بتبقى [[[]]] فاضية.

---

## ٧. [[$unwind]] تاني، بس بحذر

~~~javascript
{ $unwind: { path: "$product", preserveNullAndEmptyArrays: true } }
~~~

هنا بنستخدمه عشان نحوّل الـ array اللي فيها عنصر واحد لـ object. الشكل الطويل ده بياخد:

- [[path]]: الـ array اللي هتتفك.
- [[preserveNullAndEmptyArrays: true]]: لو الـ array فاضية (المنتج اتمسح)، **سيب المستند** بدل ما تشيله.

جرّبت من غيرها ([[$unwind: "$product"]]):

~~~text الناتج
[
  { revenue: 6000, productId: 12, name: 'Monitor' },
  { revenue: 2300, productId: 10, name: 'Keyboard' },
  { revenue: 900, productId: 11, name: 'Mouse' }
]
~~~

المنتج 99 اختفى من غير أي error، والتقرير بقى ناقص 50 جنيه.

---

## ٨. [[$project]]

~~~javascript
{ $project: { _id: 0, productId: "$_id", name: { $ifNull: ["$product.name", "(deleted)"] }, stock: "$product.stock", qty: 1, revenue: 1 } }
~~~

- [[productId: "$_id"]]: غيّر اسم الحقل: قيمة الـ _id في حقل اسمه productId.
- [[$ifNull: [قيمة, بديل]]]: لو القيمة مش موجودة أو null، حط البديل. فالمنتج اللي اتمسح اسمه [["(deleted)"]].
- [[stock: "$product.stock"]]: المخزون الحالي من products.

---

## الناتج

~~~text الناتج
[
  { qty: 1, revenue: 6000, productId: 12, name: 'Monitor', stock: 5 },
  { qty: 3, revenue: 2300, productId: 10, name: 'Keyboard', stock: 40 },
  { qty: 3, revenue: 900, productId: 11, name: 'Mouse', stock: 0 },
  { qty: 1, revenue: 50, productId: 99, name: '(deleted)' }
]
~~~

Keyboard: ‏750×2 من يناير + 800×1 من مارس = 2300، كل بند بسعره وقت البيع. والـ Monitor اللي في الأوردر الـ cancelled مش محسوب. وصف 99 مفيهوش [[stock]] خالص، لأن [[$product.stock]] مش موجود فالحقل مبيتعملش.

ونفس الفكرة لأكتر يوزرز صرفوا (الـ solCode): group بـ [[$userId]]، ثم lookup على users:

~~~text الناتج
[
  { spent: 8100, orders: 2, name: 'Sara' },
  { spent: 1150, orders: 2, name: 'Omar' }
]
~~~

## الخلاصة

| المرحلة | بتعمل إيه |
|---|---|
| [[$unwind: "$arr"]] | مستند لكل عنصر في الـ array |
| [[$lookup]] | هات من collection تانية في array |
| [[$unwind]] بعد lookup | array لـ object، ومعاه [[preserveNullAndEmptyArrays]] لو مش عايز تخسر صفوف |
| [[$ifNull]] | قيمة بديلة للناقص |

والترتيب: [[$match]] ← جمّع ← [[$limit]] ← وبعدين [[$lookup]].`,
          lines: [
            "ادخل قاعدة shop.",
            "pipeline على الأوردرات:",
            "المدفوع بس.",
            "فك البنود: كل بند مستند لوحده.",
            "جمّع بالمنتج: الكمية، والإيراد = السعر وقت البيع × الكمية.",
            "الأعلى إيراد الأول.",
            "أول ٥ بس، قبل الـ join.",
            "هات المنتج من products بالـ _id (بيرجع array).",
            "array لـ object، ومتشيلش منتج اتمسح.",
            "الناتج: الاسم أو (deleted)، والمخزون الحالي، والكمية والإيراد.",
            "قفلة."
          ],
          sol: R`بالبيانات دي الناتج ٤ صفوف: Monitor إيراد 6000 وكمية 1، و Keyboard إيراد 2300 (750×2 + 800×1) وكمية 3، و Mouse إيراد 900 وكمية 3، و [[productId: 99]] باسم [[(deleted)]] وإيراد 50. الـ Monitor التاني في أوردر cancelled فمش محسوب.

من غير [[preserveNullAndEmptyArrays]]: صف 99 بيختفي، والإيراد اللي في التقرير يبقى 9200 بدل 9250.

أكتر ٣ يوزرز: [[$group]] بـ [[$userId]] و [[$sum: "$total"]]، ثم sort و limit، ثم [[$lookup]] على users. الناتج: Sara 8100 و Omar 1150. لو ظهرلك Omar بـ 7150: نسيت [[$match]] على paid فالأوردر الـ cancelled اتحسب.`,
          solCode: R`use shop
db.products.deleteMany({})
db.products.insertMany([{ _id: 10, name: "Keyboard", price: 800, stock: 40 }, { _id: 11, name: "Mouse", price: 300, stock: 0 }, { _id: 12, name: "Monitor", price: 6000, stock: 5 }])
db.users.deleteMany({})
db.users.insertMany([{ _id: 1, name: "Sara" }, { _id: 2, name: "Omar" }])
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$userId", spent: { $sum: "$total" }, orders: { $sum: 1 } } },
  { $sort: { spent: -1 } },
  { $limit: 3 },
  { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $project: { _id: 0, name: "$user.name", spent: 1, orders: 1 } }
])`
        },
        {
          cmd: "populate و N+1",
          title: "populate في Mongoose من غير ما تعمل query لكل صف",
          desc: R`N+1: query تجيب ٢٠ بوست، وبعدين query لكل بوست تجيب الكاتب، يعني ٢١ رحلة للقاعدة. [[populate]] في Mongoose بيجمع كل الـ ids ويجيبهم في query واحدة بـ [[$in]]، فتبقى ٢ مهما كان العدد. و [[$lookup]] بيخليها واحدة.

و [[lean()]] بيرجّع objects عادية بدل Mongoose documents: أخف وأسرع، ومناسب لأي حاجة هتتبعت JSON من غير تعديل.`,
          example: R`import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
let queries = 0;
mongoose.set("debug", () => { queries++; });

const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));
const Post = mongoose.model("Post", new mongoose.Schema({ title: String, author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }));

const posts = await Post.find().limit(20).lean();
for (const p of posts) p.author = await User.findById(p.author, "name").lean();
console.log("N+1:", queries);

queries = 0;
const populated = await Post.find().limit(20).populate("author", "name").lean();
console.log("populate:", queries);

queries = 0;
const joined = await Post.aggregate([
  { $limit: 20 },
  { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author", pipeline: [{ $project: { name: 1 } }] } },
  { $unwind: "$author" },
]);
console.log("$lookup:", queries);

await mongoose.disconnect();`,
          try: R`في فولدر تجربة: [[npm i mongoose]]، وضيف للملف seed بـ ٥ يوزرز و ٢٠ بوست قبل الاستعلامات، وشغّله بـ [[MONGODB_URI=... node n1.mjs]]. سجّل عدد الـ queries والوقت لكل طريقة. وبعدين جرّب [[for (const p of docs) await p.populate("author")]] على documents من غير lean: كام query؟`,
          flag: "script",
          deep: {
            why: "N+1 من أشهر أسباب البطء في أي ORM، ومن أشهر أسئلة الانترفيو. محليًا مش هتحس بيه لأن القاعدة على نفس الجهاز، بس على الإنتاج كل query رحلة شبكة بمللي ثانية أو أكتر، فصفحة فيها ١٠٠ صف بتاخد ١٠٠ رحلة.",
            how: R`[[mongoose.set("debug", fn)]] بيندَه لكل عملية Mongoose بتبعتها للقاعدة، فهنا بيعدّها. جربته على mongod 8 بـ Mongoose 9: الـ loop عمل 21، و populate عمل 2، و [[$lookup]] عمل 1، والناتج في التلاتة نفس الشكل.

[[ref: "User"]] في الـ schema هو اللي بيعرّف populate يروح فين. [[populate("author", "name")]]: بعد ما البوستات ترجع، Mongoose بيلم كل قيم [[author]] المختلفة ويعمل [[User.find({ _id: { $in: [...] } }, "name")]] مرة واحدة، ويحط كل يوزر مكان الـ id. التاني argument بيختار الحقول، فمترجعش الباسورد والإيميل مع كل بوست.

populate مش join: هي ٢ queries من التطبيق. [[$lookup]] بيعمل الـ join على السيرفر في query واحدة، بس بترجع objects عادية (زي lean) ومن غير الـ virtuals والـ getters بتوع Mongoose. populate كفاية في أغلب الصفحات، و [[$lookup]] للتقارير أو لما تحتاج تفلتر أو ترتب بحقل من الـ collection التانية (populate مبيعرفش يعمل كده).

[[lean()]]: من غيرها كل نتيجة document فيه change tracking ودوال زي [[save]]، ودي تكلفة في الرام والـ CPU. معاها objects عادية. جربتها: [[typeof doc.save]] بيبقى function من غير lean، و undefined معاها. استخدم lean في أي GET، وسيب الـ documents لما هتعدّل وتعمل save.

N+1 مستخبي: [[await doc.populate()]] جوه loop، أو virtual populate بيتنده لكل عنصر، أو resolver في GraphQL بيجيب الكاتب لكل بوست لوحده (الحل هناك DataLoader).`,
            when: "أي endpoint بيرجّع قايمة فيها بيانات من collection تانية. شغّل debug في التطوير وبص على عدد الـ queries لكل request.",
            mistakes: R`تحسب إن populate حل كل حاجة، وتعمل populate متداخل ٣ مستويات على قايمة ١٠٠٠ عنصر من غير limit. وتنسى تختار الحقول في populate فالـ passwordHash يرجع في الـ API. وتنسى [[lean()]] وبعدين تستغرب إن [[JSON.stringify]] بيطلع حاجات زيادة أو إن الرام بيعلى. وفي الانترفيو: اشرح N+1 بالأرقام (١ + N رحلة)، والحلين: batching بـ [[$in]] (populate و DataLoader) أو join ([[$lookup]]).`
          },
          teach: R`## نفس الصفحة بـ ٣ طرق، ونعدّ الـ queries

المثال ملف Node (اسمه مثلًا [[n1.mjs]]) بيجيب ٢٠ بوست ومع كل واحد اسم كاتبه، بـ ٣ طرق، ويعدّ كل طريقة بعتت كام query للقاعدة. شغّلته بـ Node 24 و Mongoose 9.11 على الـ lab ([[mongo:8]] في Docker على نفس الجهاز)، بالـ solCode اللي بيضيف ٥ يوزرز و ٢٠ بوست الأول:

~~~bash
MONGODB_URI="mongodb://admin:secret@localhost:27017/blog?authSource=admin" node n1.mjs
~~~

[[VAR=value node ...]] في bash بيحط المتغير للأمر ده بس. في PowerShell بيتكتب على سطرين: [[$env:MONGODB_URI = "..."]] وبعدين [[node n1.mjs]].

~~~text الناتج
N+1        queries: 21 ms: 57.4
populate   queries: 2 ms: 15.7
$lookup    queries: 1 ms: 6.9
loop+doc   queries: 21 ms: 66.8
~~~

والـ ٣ طرق رجّعوا **نفس** الشكل بالظبط:

~~~text أول بوست في التلاتة
{"_id":"6ac4fe02b11c7443e9588661","title":"post 0","author":{"_id":"6ac4fe02b11c7443e958865b","name":"user0"},"__v":0}
~~~

([[__v]] حقل Mongoose بيحطه لوحده: رقم نسخة المستند.)

---

## ١. التجهيز

~~~javascript
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI);
~~~

- [[import ... from]]: صيغة ES modules، وعشان كده الملف [[.mjs]] (أو [[.js]] مع [["type": "module"]] في package.json).
- [[process.env.MONGODB_URI]]: المتغير اللي حطيناه في الأمر.
- [[await]] في أول الملف مسموحة في ES modules (اسمها top-level await).

## ٢. عدّاد الـ queries

~~~javascript
let queries = 0;
mongoose.set("debug", () => { queries++; });
~~~

[[mongoose.set("debug", دالة)]]: Mongoose بينده الدالة دي مع **كل** عملية بيبعتها للقاعدة، وبيبعتلها اسم الـ collection والعملية. احنا بنزوّد العداد بس. سجّلت كمان الأسماء عشان نشوف إيه اللي اتبعت.

## ٣. الـ models

~~~javascript
const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));
const Post = mongoose.model("Post", new mongoose.Schema({ title: String, author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }));
~~~

- [[mongoose.model("User", schema)]]: model اسمه User، و Mongoose بيخزنه في collection اسمها [[users]] (صغير وجمع).
- [[author: { type: ...ObjectId, ref: "User" }]]: الحقل ده id، و [[ref: "User"]] بتقول «الـ id ده بتاع model اسمه User». ده اللي populate بيستخدمه.

---

## الطريقة ١: N+1

~~~javascript
const posts = await Post.find().limit(20).lean();
for (const p of posts) p.author = await User.findById(p.author, "name").lean();
console.log("N+1:", queries);
~~~

- query واحدة للبوستات.
- [[for (const p of posts)]]: لف على كل بوست، و [[await User.findById(...)]] query للكاتب. التاني argument [["name"]] = هات حقل name بس.

١ + ٢٠ = **21**. اسمها N+1 لأنها query واحدة + N (عدد الصفوف). الأسماء اللي سجّلتها: [[posts.find]] ثم [[users.findOne]] (ده اللي [[findById]] بيتحوّل له) ٢٠ مرة. ولو الصفحة ١٠٠ صف، 101 رحلة للقاعدة.

## الطريقة ٢: [[populate]]

~~~javascript
queries = 0;
const populated = await Post.find().limit(20).populate("author", "name").lean();
console.log("populate:", queries);
~~~

[[populate("author", "name")]]: بعد ما البوستات ترجع، Mongoose بيلم كل قيم [[author]] المختلفة (٥ هنا)، ويعمل query واحدة: [[users.find({ _id: { $in: [5 ids] } })]]، ويحط كل يوزر مكان الـ id بتاعه. **2** queries مهما كان عدد البوستات.

## الطريقة ٣: [[$lookup]]

~~~javascript
const joined = await Post.aggregate([
  { $limit: 20 },
  { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author", pipeline: [{ $project: { name: 1 } }] } },
  { $unwind: "$author" },
]);
~~~

- [[Post.aggregate]]: pipeline على collection posts، بيروح للقاعدة زي ما هو.
- [[$lookup]] بنفس شكل الدرس اللي فات، وزيادة [[pipeline: [{ $project: { name: 1 } }]]]: مراحل بتتنفذ على المستندات اللي اتجابت من users، هنا «هات name بس».
- [[as: "author"]] بنفس اسم الحقل، فالـ id بيتبدل بالـ array، و [[$unwind]] بيحوّلها object.

**1** query، والـ join حصل على السيرفر. بس الناتج objects عادية، من غير مميزات Mongoose.

## الطريقة الرابعة (من الـ try): N+1 متخبّي

~~~javascript
const docs = await Post.find().limit(20);
for (const p of docs) await p.populate("author", "name");
~~~

بيتقري كأنه populate، بس جوه loop: **21** query تاني. الـ populate لازم يبقى على الـ query كلها مرة واحدة.

---

## [[lean()]]

قارنت مستند من غير lean ومعاها:

~~~text الناتج
doc: function model lean: undefined Object
~~~

من غير lean: [[typeof doc.save]] = [[function]]، يعني ده Mongoose document فيه دوال وتتبع للتعديلات. مع lean: object عادي ومفيش [[save]]. lean أخف وأسرع لأي حاجة هتتبعت JSON من غير تعديل.

## ليه الأرقام دي مهمة؟

الأوقات هنا صغيرة لأن القاعدة على نفس الجهاز. على الإنتاج كل query رحلة شبكة (مثلًا ١ مللي ثانية أو أكتر)، فـ 21 رحلة = ٢١ مللي على الأقل، و 101 رحلة = ١٠١. الفرق بيكبر مع عدد الصفوف والمسافة.

## الخلاصة

| الطريقة | queries | إمتى |
|---|---|---|
| loop + [[findById]] | 1 + N | أبدًا |
| [[populate]] على الـ query | 2 | أغلب الصفحات |
| [[$lookup]] | 1 | تقارير، أو فلترة/ترتيب بحقل من التانية |
| [[populate]] جوه loop | 1 + N | أبدًا (N+1 متخبّي) |

و [[mongoose.set("debug")]] في التطوير هو اللي بيكشف ده.`,
          lines: [
            "Mongoose.",
            "اتصل بالرابط اللي في المتغير.",
            "عداد للـ queries.",
            "debug بدالة: بتتنده مع كل عملية بتروح للقاعدة، فنعدّها.",
            "model اليوزر.",
            "model البوست، و author بيشاور على User بـ ref.",
            "N+1: query للبوستات...",
            "...وبعدين query لكل بوست عشان الكاتب.",
            "اطبع العدد: 21.",
            "صفّر العداد.",
            "populate: البوستات، وبعدين كل الكتّاب في query واحدة بـ $in.",
            "اطبع العدد: 2.",
            "صفّر العداد.",
            "$lookup: الـ join على السيرفر.",
            "أول ٢٠ بوست.",
            "هات الكاتب من users، بالاسم بس.",
            "array لـ object.",
            "قفلة الـ pipeline.",
            "اطبع العدد: 1.",
            "اقفل الاتصال عشان البرنامج يخرج."
          ],
          sol: R`اللي طلعلي على mongod محلي: N+1 عمل 21 query في حوالي 27ms، و populate عمل 2 في حوالي 11ms، و [[$lookup]] عمل 1 في حوالي 4ms. الأوقات هتختلف عندك، بس النسبة هي المهمة، وهتبقى أكبر بكتير لو القاعدة على سيرفر تاني.

[[await p.populate("author")]] جوه loop على documents: 20 query زيادة، يعني رجعت N+1 تاني. الـ populate لازم يتعمل على الـ query كلها مرة واحدة.

لو العداد طلع 0: الـ [[mongoose.set("debug")]] لازم قبل الاستعلامات. ولو ظهر [[author: null]]: الـ seed حط ids يوزرز مش موجودين، أو الـ ref اسمه غلط.`,
          solCode: R`import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017/blog");
let queries = 0;
mongoose.set("debug", () => { queries++; });

const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String }));
const Post = mongoose.model("Post", new mongoose.Schema({ title: String, author: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }));

await User.deleteMany({});
await Post.deleteMany({});
const users = await User.insertMany(Array.from({ length: 5 }, (_, i) => ({ name: "user" + i, email: $__btu$__{i}@example.com$__bt })));
await Post.insertMany(Array.from({ length: 20 }, (_, i) => ({ title: "post " + i, author: users[i % 5]._id })));

async function measure(label, fn) {
  queries = 0;
  const t = performance.now();
  await fn();
  console.log(label.padEnd(10), "queries:", queries, "ms:", (performance.now() - t).toFixed(1));
}

await measure("N+1", async () => {
  const posts = await Post.find().limit(20).lean();
  for (const p of posts) p.author = await User.findById(p.author, "name").lean();
});
await measure("populate", () => Post.find().limit(20).populate("author", "name").lean());
await measure("$lookup", () => Post.aggregate([
  { $limit: 20 },
  { $lookup: { from: "users", localField: "author", foreignField: "_id", as: "author", pipeline: [{ $project: { name: 1 } }] } },
  { $unwind: "$author" },
]));
await measure("loop+doc", async () => {
  const docs = await Post.find().limit(20);
  for (const p of docs) await p.populate("author", "name");
});

await mongoose.disconnect();`
        },
        {
          cmd: "transactions و replica set",
          title: "تعدّل أكتر من مستند يا كله يا ولا حاجة",
          desc: R`الكتابة على مستند واحد في Mongo atomic دايمًا. لو محتاج تعدّل أكتر من مستند مع بعض (تنقص المخزون وتعمل الأوردر)، بتحتاج transaction: يا الاتنين يتكتبوا، يا ولا واحد.

والـ transactions شغالة على replica set بس (أو sharded cluster)، حتى لو node واحدة. Mongo standalone زي الـ lab بيرفضها.`,
          example: R`use shop
db.products.updateOne({ _id: 12 }, { $set: { name: "Monitor", stock: 1 } }, { upsert: true })
const session = db.getMongo().startSession()
const s = session.getDatabase("shop")
function buy(productId, qty) {
  session.withTransaction(() => {
    const r = s.products.updateOne({ _id: productId, stock: { $gte: qty } }, { $inc: { stock: -qty } })
    if (r.modifiedCount !== 1) throw new Error("out of stock")
    s.orders.insertOne({ userId: 1, status: "paid", createdAt: new Date(), items: [{ productId, qty, price: 6000 }], total: 6000 * qty })
  })
}
buy(12, 1)
buy(12, 1)
db.products.findOne({ _id: 12 }).stock
session.endSession()`,
          try: R`الـ lab standalone، فشغّل Mongo تاني كـ replica set: [[docker run -d --name mongo-rs -p 127.0.0.1:27018:27017 mongo:8 --replSet rs0]]، وبعدين [[docker exec mongo-rs mongosh --quiet --eval "rs.initiate()"]]، وادخل بـ [[mongosh "mongodb://localhost:27018/shop?directConnection=true"]]. شغّل المثال، وعدّ الأوردرات قبل وبعد. وبعدين جرّب نفس المثال على الـ lab نفسه وشوف الـ error.`,
          flag: "script",
          deep: {
            why: "أي عملية فيها فلوس أو مخزون بتلمس أكتر من مستند. من غير transaction، لو السيرفر وقع بين الخطوتين، المخزون نقص ومفيش أوردر، أو الأوردر اتعمل والمخزون زي ما هو. وده بالظبط سؤال «ليه Postgres أأمن للفلوس؟» في الانترفيو، والإجابة إن Mongo عندها transactions من نسخة 4، بس بشروط.",
            how: R`[[startSession()]] بيفتح session، و [[session.getDatabase]] بيدّيك قاعدة كل عملية عليها جزء من الـ session. [[withTransaction(fn)]] بيبدأ transaction، ينفّذ الدالة، ويعمل commit. لو الدالة رمت error بيعمل abort ويرجّع كل حاجة، ولو الخطأ مؤقت (زي تعارض مع transaction تانية، [[TransientTransactionError]]) بيعيد الدالة كلها لوحده.

الشرط [[stock: { $gte: qty }]] جوه الـ update نفسه هو اللي بيمنع البيع بالسالب: لو المخزون مش كفاية [[modifiedCount]] بيبقى 0 فبنرمي error والأوردر مبيتعملش. جربته: أول [[buy]] نجح، والتاني رمى out of stock، والمخزون 0، وأوردر واحد بس اتعمل.

ليه replica set: الـ transaction مبنية على الـ oplog (سجل العمليات اللي الـ replicas بتنسخ منه) وعلى أرقام transaction لكل session. الـ standalone مفيهوش oplog بالشكل ده، فبيرفض. جربت على mongod standalone: السيرفر رجّع [[Transaction numbers are only allowed on a replica set member or mongos]]، والـ Node driver غلّفها برسالة مضللة: «does not support retryable writes. Please add retryWrites=false». لو عملت كده فعلًا الكتابة العادية هتشتغل بس الـ transaction لسه هتفشل بنفس الرسالة.

replica set بـ node واحدة كفاية للتطوير: [[--replSet rs0]] و [[rs.initiate()]] مرة واحدة. [[rs.initiate()]] من غير config بيسجّل الـ host باسم الـ container، فمن بره لازم [[directConnection=true]] وإلا الـ driver يحاول يوصل لاسم مش معروف عندك. على الإنتاج: ٣ nodes، ولو فيه auth لازم [[keyFile]] بين الـ nodes. Atlas replica set من الأول.

في Mongoose: [[await mongoose.connection.transaction(async (session) => { ... })]] بنفس الفكرة، بس لازم تبعت [[{ session }]] لكل عملية جوه ([[Model.create([doc], { session })]] بـ array). عملية نسيت فيها session بتتكتب برّه الـ transaction ومبترجعش لو حصل abort.`,
            when: "لما عملية واحدة بتلمس أكتر من مستند ولازم يبقوا متسقين: مخزون وأوردر، تحويل رصيد بين حسابين. ولو تقدر تحط الحاجتين في مستند واحد (أول درس)، مش محتاج transaction خالص، وده أسرع.",
            mistakes: R`تكتب الكود وتجربه على Mongo standalone في Docker فيفشل، فتشيل الـ transaction «مؤقتًا» وتنساها. وتنسى [[{ session }]] في عملية واحدة جوه الـ Mongoose transaction. وتعمل حاجة مش بترجع جوه الدالة (إيميل أو request لـ API تاني): [[withTransaction]] ممكن يعيد الدالة كذا مرة، فاليوزر ياخد ٣ إيميلات؛ اعمل الحاجات دي بعد الـ commit. وتفتح transaction طويلة: الافتراضي إنها بتتلغي بعد ٦٠ ثانية، وبتمسك locks على المستندات اللي لمستها.`
          },
          teach: R`## عمليتين مع بعض: يا الاتنين يتكتبوا، يا ولا واحد

الشرا فيه خطوتين على مستندين مختلفين: ننقص المخزون في [[products]]، ونعمل أوردر في [[orders]]. لو حاجة وقعت بين الخطوتين، البيانات تبقى متلخبطة. الـ **transaction** بتلم الخطوتين في وحدة واحدة: يا تتكتب كلها (اسمها **commit**)، يا تترجع كلها (اسمها **abort**). شغّلت المثال كله في [[mongosh]] جوه container من [[mongo:8]] متشغّل كـ replica set، والـ solCode بـ Mongoose 9.11 من Node على ويندوز.

---

## ١. الأول: replica set بـ node واحدة

الـ transactions مش شغالة على Mongo عادي (اسمه **standalone**)، لازم **replica set**: مجموعة سيرفرات Mongo بتنسخ من بعض، واحد منهم **primary** بيستقبل الكتابة. للتجربة node واحدة كفاية:

~~~bash
docker run -d --name mongo-rs -p 127.0.0.1:27018:27017 mongo:8 --replSet rs0
docker exec mongo-rs mongosh --quiet --eval "rs.initiate()"
~~~

- [[--replSet rs0]]: بعد اسم الصورة، فده بيتبعت لـ [[mongod]] نفسه: «انت عضو في replica set اسمها rs0».
- [[rs.initiate()]]: مرة واحدة بس، بتقول «ابدأ الـ set، وأنا أول عضو فيها». (rs = replica set)

~~~text الناتج (مختصر)
{
  info2: 'no configuration specified. Using a default configuration for the set',
  me: '1b245bf5088c:27017',
  ok: 1,
  ...
}
~~~

[[me]] هو الاسم اللي العضو اتسجّل بيه: اسم الـ container من جوه (الـ hostname بتاعه، وهنا الـ id بتاعه). ده سبب [[directConnection=true]] في الرابط من برّه: من غيرها الـ driver بيسأل السيرفر «مين الـ primary؟»، فيرد «[[1b245bf5088c:27017]]»، والاسم ده جهازك ميعرفوش. جرّبت الـ solCode من غيرها:

~~~text الناتج
MongooseServerSelectionError: getaddrinfo ENOTFOUND 1b245bf5088c
~~~

ولما تدخل بـ mongosh الـ prompt بيتغيّر: [[rs0 [direct: primary] shop>]]، يعني انت على الـ primary بتاع rs0.

---

## ٢. المنتج

~~~text
db.products.updateOne({ _id: 12 }, { $set: { name: "Monitor", stock: 1 } }, { upsert: true })
~~~

[[upsert: true]] (update + insert): لو المنتج 12 مش موجود اعمله، ولو موجود عدّله. فالسطر ده بيرجّع المخزون [[1]] كل مرة تشغّل المثال.

~~~text الناتج
{ acknowledged: true, insertedId: 12, matchedCount: 0, modifiedCount: 0, upsertedCount: 1 }
~~~

[[upsertedCount: 1]]: ملقاهوش فعمله.

---

## ٣. الـ session

~~~text
const session = db.getMongo().startSession()
const s = session.getDatabase("shop")
~~~

- [[db.getMongo()]]: الاتصال نفسه بالسيرفر، و [[startSession()]] بتفتح **session** عليه: رقم مميز بيربط عمليات ببعض.
- [[session.getDatabase("shop")]]: نسخة من قاعدة shop **مربوطة بالـ session**. أي عملية على [[s]] بتبقى جزء من الـ transaction. أما [[db.products]] العادية فبرّه خالص.

> دي أشهر غلطة: تكتب [[db.products.updateOne]] جوه الـ transaction بدل [[s.products...]]، فالعملية تتكتب برّه ومترجعش لو حصل abort.

---

## ٤. دالة الشرا سطر سطر

~~~text
function buy(productId, qty) {
  session.withTransaction(() => {
~~~

[[withTransaction]] بتاخد دالة ([[() => { ... }]] دالة من غير اسم): تبدأ transaction، تنفّذ الدالة، ولو خلصت من غير error تعمل commit. ولو الدالة رمت error تعمل abort وترمي الـ error تاني لبرّه.

~~~text
    const r = s.products.updateOne({ _id: productId, stock: { $gte: qty } }, { $inc: { stock: -qty } })
~~~

| الحتة | معناها |
|---|---|
| [[{ _id: productId, stock: { $gte: qty } }]] | المنتج ده **بشرط** إن المخزون أكبر من أو يساوي ([[$gte]] = greater than or equal) الكمية |
| [[{ $inc: { stock: -qty } }]] | زوّد ([[$inc]] = increment) المخزون بـ سالب الكمية، يعني انقصه |
| [[r]] | الرد، وفيه [[modifiedCount]]: اتعدّل كام مستند |

الشرط جوه الـ update نفسه مش في [[if]] قبله، عشان الفحص والتعديل يحصلوا في خطوة واحدة على السيرفر، ومفيش طلبين يشوفوا «فاضل ١» في نفس اللحظة.

~~~text
    if (r.modifiedCount !== 1) throw new Error("out of stock")
~~~

لو المخزون مش كفاية الشرط مش بيطابق، فـ [[modifiedCount]] بيبقى [[0]]. [[!==]] يعني «مش بيساوي» (من غير تحويل أنواع)، و [[throw new Error(...)]] بيرمي error فـ withTransaction تعمل abort.

~~~text
    s.orders.insertOne({ userId: 1, status: "paid", createdAt: new Date(), items: [{ productId, qty, price: 6000 }], total: 6000 * qty })
~~~

الأوردر، على [[s]] برضه. [[{ productId, qty }]] اختصار JavaScript لـ [[{ productId: productId, qty: qty }]].

---

## ٥. التشغيل

عدّيت الأوردرات قبل وبعد كل [[buy]]:

~~~text الناتج على الـ replica set
shop> db.orders.countDocuments()
0
shop> buy(12, 1)
shop> db.orders.countDocuments()
1
shop> buy(12, 1)
Uncaught Error: out of stock
shop> db.orders.countDocuments()
1
shop> db.products.findOne({ _id: 12 }).stock
0
~~~

- أول [[buy]]: مطبعش حاجة (الدالة مش بترجّع قيمة)، والأوردر اتعمل.
- التاني: المخزون بقى 0، فالشرط فشل، والـ error طلع، والأوردر **ما اتعملش**.
- المخزون [[0]] مش [[-1]].

وفي الآخر [[session.endSession()]] بتقفل الـ session.

---

## ٦. نفس الكود على standalone

شغّلته على Mongo عادي (من غير [[--replSet]]):

~~~text الناتج
Uncaught MongoServerError: This MongoDB deployment does not support retryable writes. Please add retryWrites=false to your connection string.
~~~

الرسالة بتقول ضيف [[retryWrites=false]]، بس جرّبت ده كمان (في mongosh وفي Node) وطلعت نفس الرسالة. السبب الحقيقي إن الـ standalone معندوش الـ oplog (سجل العمليات اللي أعضاء الـ replica set بينسخوا منه) اللي الـ transaction مبنية عليه. الحل replica set، مش شيل الـ transaction.

---

## ٧. نفس الفكرة في Mongoose (الـ solCode)

| mongosh | Mongoose |
|---|---|
| [[startSession()]] و [[withTransaction(fn)]] | [[mongoose.connection.transaction(async (session) => { ... })]] بيعمل الاتنين |
| العمليات على [[s]] | كل عملية لازم تاخد [[{ session }]] في آخرها |
| [[insertOne(doc)]] | [[Order.create([doc], { session })]]: الـ doc جوه array، عشان [[create]] يفهم إن التاني options |

و [[const [order] = await ...]] بتاخد أول عنصر من الـ array اللي [[create]] رجّعه. شغّلته على الـ replica set:

~~~text الناتج
ok new ObjectId('6ac521d5e405435f0259e95a')
second: out of stock
stock: 0
~~~

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[--replSet rs0]] و [[rs.initiate()]] | الـ transactions محتاجة replica set، حتى بـ node واحدة |
| [[directConnection=true]] | من برّه الـ container، عشان الاسم اللي العضو متسجّل بيه |
| [[startSession()]] و [[session.getDatabase]] | العمليات على النسخة دي بس هي اللي جوه الـ transaction |
| شرط [[$gte]] جوه الـ update | الفحص والتعديل خطوة واحدة |
| [[throw]] | بيعمل abort ويرجّع كل حاجة |

- مستند واحد atomic لوحده؛ الـ transaction لأكتر من مستند.
- متعملش جوه الدالة حاجة مبترجعش (إيميل مثلًا)، لأن withTransaction ممكن تعيدها.`,
          lines: [
            "ادخل قاعدة shop.",
            "منتج عليه قطعة واحدة في المخزون.",
            "افتح session.",
            "قاعدة shop جوه الـ session: أي عملية عليها بتبقى جزء من الـ transaction.",
            "دالة الشرا:",
            "ابدأ transaction، وكل اللي جوه يا يتكتب كله يا لأ.",
            "انقص المخزون بس لو كفاية.",
            "مكفّاش؟ ارمي error فكل حاجة ترجع.",
            "اعمل الأوردر في نفس الـ transaction.",
            "قفلة withTransaction (هنا بيحصل commit).",
            "قفلة الدالة.",
            "أول شرا: ينجح.",
            "التاني: out of stock، ومفيش أوردر اتعمل.",
            "المخزون: 0 مش -1.",
            "اقفل الـ session."
          ],
          sol: R`على الـ replica set: أول [[buy]] بيعدّي، والتاني بيطلع [[Error: out of stock]]، والمخزون [[0]]، وعدد الأوردرات زاد ١ بس. لو شلت سطر [[throw]]، التاني هيعمل أوردر من غير ما المخزون ينقص، ودي بالظبط المشكلة اللي الـ transaction والشرط بيمنعوها.

على الـ lab (standalone): [[MongoServerError]] بـ «Transaction numbers are only allowed on a replica set member or mongos» (أو من mongosh ممكن تشوف رسالة retryable writes). الحل مش إنك تشيل الـ transaction، الحل replica set.

لو [[mongosh]] مقدرش يتصل على 27018 من غير [[directConnection=true]]: ده لأن الـ replica set متسجل باسم الـ container. ونفس الكود بـ Mongoose تحت.`,
          solCode: R`import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_URI ?? "mongodb://localhost:27018/shop?directConnection=true");
const Product = mongoose.model("Product", new mongoose.Schema({ _id: Number, name: String, stock: Number }));
const Order = mongoose.model("Order", new mongoose.Schema({ userId: Number, items: Array, total: Number, status: String }, { timestamps: true }));

await Product.updateOne({ _id: 12 }, { name: "Monitor", stock: 1 }, { upsert: true });

function buy(productId, qty) {
  return mongoose.connection.transaction(async (session) => {
    const r = await Product.updateOne({ _id: productId, stock: { $gte: qty } }, { $inc: { stock: -qty } }, { session });
    if (r.modifiedCount !== 1) throw new Error("out of stock");
    const [order] = await Order.create([{ userId: 1, items: [{ productId, qty }], total: 6000 * qty, status: "paid" }], { session });
    return order;
  });
}

console.log("ok", (await buy(12, 1))._id);
try { await buy(12, 1); } catch (e) { console.log("second:", e.message); }
console.log("stock:", (await Product.findById(12).lean()).stock);
await mongoose.disconnect();`
        },
        {
          cmd: "$jsonSchema",
          title: "القاعدة نفسها ترفض المستند الغلط",
          desc: R`Mongo من غير schema افتراضيًا، و Mongoose بيتحقق جوه تطبيقك بس. [[$jsonSchema]] في [[validator]] بيخلي القاعدة نفسها ترفض أي insert أو update مش مطابق، مهما كان مين اللي بيكتب: التطبيق، أو سكربت، أو حد في mongosh.

[[collMod]] بيضيفه أو يغيّره على collection موجودة.`,
          example: R`use shop
db.createCollection("customers", { validator: { $jsonSchema: { bsonType: "object", required: ["email", "createdAt"], properties: { email: { bsonType: "string", pattern: "^[^@\\s]+@[^@\\s]+$" }, age: { bsonType: "number", minimum: 0 }, createdAt: { bsonType: "date" } } } } })
db.customers.insertOne({ email: "sara@example.com", age: 28, createdAt: new Date() })
db.customers.insertOne({ email: "bad", createdAt: new Date() })
db.runCommand({ collMod: "orders", validator: { $jsonSchema: { required: ["userId", "status"], properties: { status: { enum: ["pending", "paid", "cancelled"] } } } }, validationLevel: "moderate" })
db.getCollectionInfos({ name: "customers" })[0].options.validator
db.orders.find({ $nor: [db.getCollectionInfos({ name: "orders" })[0].options.validator] })`,
          try: R`شغّل المثال، واقرا الـ error بتاع [[email: "bad"]] كامل. وبعدين جرّب [[age: -1]] و [[age: "28"]] و [[createdAt: "2026-09-29"]] (نص مش Date). كام واحد اترفض؟`,
          flag: "script",
          deep: {
            why: "الـ validation في التطبيق بس بيسيب ثغرات: سكربت migration، أو تطبيق تاني بيكتب في نفس القاعدة، أو [[updateOne]] في Mongoose من غير runValidators، أو حد صلّح بيانات بإيده. بيانات غلط بتدخل في صمت وتكسر التقارير بعد شهور.",
            how: R`[[validator]] بيتخزن مع الـ collection وبيتفحص مع كل كتابة. [[bsonType]] نوع BSON ([[string]] و [[date]] و [[objectId]] و [[number]] اللي بتقبل int و long و double و decimal)، و [[required]] الحقول اللازمة، و [[enum]] و [[pattern]] و [[minimum]]. الحقول اللي مش مذكورة مسموحة إلا لو كتبت [[additionalProperties: false]] (وساعتها لازم تذكر [[_id]]).

المستند المرفوض بيرجع error كود 121 (DocumentValidationFailure)، وفيه [[errInfo.details]] بيقولك أنهي قاعدة فشلت وليه، زي [[propertyName: 'email']] و [[reason: 'regular expression did not match']].

[[validationLevel: "moderate"]] على collection فيها بيانات قديمة: المستندات القديمة اللي مش مطابقة تقدر تتعدل من غير ما تتفحص، والجديدة والمطابقة بتتفحص. [[strict]] (الافتراضي) بيفحص كل حاجة. و [[validationAction: "warn"]] بيكتب في اللوج بس من غير ما يرفض: مفيد وانت بتجرب القواعد على الإنتاج.

آخر سطر: [[$nor]] مع الـ validator نفسه بيجيب المستندات القديمة اللي مش مطابقة، عشان تصلّحها قبل ما تحوّل لـ strict.

[[$jsonSchema]] مش بديل عن Mongoose ولا Zod: رسايل الخطأ للقاعدة مش لليوزر. التطبيق يتحقق ويرجّع 400 برسالة واضحة، والقاعدة خط دفاع أخير.`,
            when: "أي collection مهمة (يوزرز، أوردرات، فلوس)، خصوصًا لو أكتر من تطبيق أو سكربت بيكتب فيها. وقواعد بسيطة: required و الأنواع و enum، مش كل منطق البيزنس.",
            mistakes: R`تكتب [[bsonType: "int"]] للعمر: من mongosh أو Node الرقم الصحيح بيتبعت int فيعدّي، بس [[28.5]] أو [[Double(28)]] أو قيمة جاية من لغة تانية كـ double بتترفض (جربتها). [[number]] أأمن إلا لو محتاج int بالذات. وتضيف validator بـ strict على collection فيها بيانات قديمة غلط، فأول update لمستند قديم يفشل على الإنتاج. وتنسى إن [[bypassDocumentValidation]] موجود وإن mongorestore بيستخدمه أحيانًا.`
          },
          teach: R`## قواعد بتتخزن مع الـ collection، والسيرفر هو اللي بيفحص

Mongo بيقبل أي شكل مستند افتراضيًا. الـ **validator** قواعد بتحطها على الـ collection نفسها، والسيرفر بيفحص بيها كل insert وكل update، أيًا كان مين اللي بيكتب. و [[$jsonSchema]] طريقة كتابة القواعد دي بشكل قريب من JSON Schema. شغّلت كل السطور في [[mongosh]] جوه container من [[mongo:8]]، على قاعدة shop فيها [[orders]] بـ ٣ مستندات قديمة (واحد [[paid]]، وواحد [[shipped]]، وواحد من غير [[userId]]).

---

## ١. السطر الطويل: collection بقواعد

~~~text
db.createCollection("customers", { validator: { $jsonSchema: { ... } } })
~~~

[[createCollection]] بتعمل collection فاضية بإعدادات (عادة الـ collection بتتعمل لوحدها مع أول insert، بس كده مفيش فرصة تحط قواعد). والإعداد هنا [[validator]]. نفك القواعد من برّه لجوه:

| الحتة | معناها |
|---|---|
| [[bsonType: "object"]] | المستند كله لازم يبقى object (ودايمًا بيبقى، بس ده الشكل الرسمي) |
| [[required: ["email", "createdAt"]]] | الحقلين دول لازم يبقوا موجودين |
| [[properties: { ... }]] | قواعد كل حقل لو موجود |
| [[email: { bsonType: "string", pattern: "..." }]] | نص، ولازم يطابق الـ regex |
| [[age: { bsonType: "number", minimum: 0 }]] | رقم من أي نوع، ومش أقل من 0 |
| [[createdAt: { bsonType: "date" }]] | تاريخ حقيقي (Date) مش نص شكله تاريخ |

**BSON** هو الشكل اللي Mongo بيخزن بيه (Binary JSON)، وفيه أنواع أكتر من JSON زي [[date]] و [[objectId]] و [[int]] و [[double]]. و [[number]] معناها «أي نوع رقم».

### الـ pattern

[["^[^@\\s]+@[^@\\s]+$"]] regex بسيط للإيميل:

| الحتة | معناها |
|---|---|
| [[^]] و [[$]] | أول النص وآخره (لازم النص كله يطابق) |
| [[[^@\\s]+]] | حرف أو أكتر ([[+]])، مش [[@]] ومش مسافة ([[\s]]) |
| [[@]] | علامة @ واحدة في النص |

و [[\\s]] مكتوبة بـ backslash مرتين لأنها جوه string في JavaScript: الـ JS بياكل واحدة، فالقاعدة بتتخزن [[\s]].

~~~text الناتج
{ ok: 1 }
~~~

---

## ٢. مستند سليم ومستند غلط

~~~text
db.customers.insertOne({ email: "sara@example.com", age: 28, createdAt: new Date() })
~~~

~~~text الناتج
{ acknowledged: true, insertedId: ObjectId('6ac52250b6bd6e10368177db') }
~~~

~~~text
db.customers.insertOne({ email: "bad", createdAt: new Date() })
~~~

~~~text الناتج
MongoServerError: Document failed validation
Additional information: {
  failingDocumentId: ObjectId('6ac52250b6bd6e10368177dc'),
  details: {
    operatorName: '$jsonSchema',
    schemaRulesNotSatisfied: [
      {
        operatorName: 'properties',
        propertiesNotSatisfied: [
          {
            propertyName: 'email',
            details: [
              {
                operatorName: 'pattern',
                specifiedAs: { pattern: '^[^@\\s]+@[^@\\s]+$' },
                reason: 'regular expression did not match',
                consideredValue: 'bad'
              }
            ]
          }
        ]
      }
    ]
  }
}
~~~

نقرا الـ error من برّه لجوه: فشل [[$jsonSchema]]، في جزء [[properties]]، في الحقل [[email]]، في قاعدة [[pattern]]، والسبب [[regular expression did not match]]، والقيمة اللي اترفضت [[bad]]. وكود الـ error [[121]] (اسمه DocumentValidationFailure)، وده اللي بتشيك عليه في الكود بـ [[e.code]].

ولو حقل [[required]] ناقص، الشكل بيختلف شوية (جرّبت مستند من غير createdAt):

~~~text الناتج
[ { operatorName: 'required', specifiedAs: { required: [ 'email', 'createdAt' ] }, missingProperties: [ 'createdAt' ] } ]
~~~

---

## ٣. قواعد على collection موجودة: [[collMod]]

~~~text
db.runCommand({ collMod: "orders", validator: { $jsonSchema: { ... } }, validationLevel: "moderate" })
~~~

- [[db.runCommand]]: ابعت أمر للسيرفر باسمه. و [[collMod]] (collection modify) بيعدّل إعدادات collection موجودة.
- القواعد: [[userId]] و [[status]] لازم، و [[status]] من القايمة دي بس ([[enum]]).
- [[validationLevel: "moderate"]]: المستندات القديمة اللي **أصلًا** مش مطابقة تقدر تتعدل من غير فحص، وأي حاجة جديدة بتتفحص. الافتراضي [[strict]] بيفحص كل حاجة.

~~~text الناتج
{ ok: 1 }
~~~

جرّبت الفرق: [[updateOne]] على المستند القديم [[shipped]] عدّى ([[modifiedCount: 1]])، لكن [[insertOne]] جديد بـ [[status: "shipped"]] اترفض بـ [[reason: 'value was not found in enum']].

---

## ٤. اعرض القواعد

~~~text
db.getCollectionInfos({ name: "customers" })[0].options.validator
~~~

[[getCollectionInfos]] بترجّع array فيه معلومات الـ collections اللي بالاسم ده، و [[[0]]] أول واحدة، و [[.options.validator]] القواعد المتخزنة:

~~~text الناتج
{
  '$jsonSchema': {
    bsonType: 'object',
    required: [ 'email', 'createdAt' ],
    properties: {
      email: { bsonType: 'string', pattern: '^[^@\\s]+@[^@\\s]+$' },
      age: { bsonType: 'number', minimum: 0 },
      createdAt: { bsonType: 'date' }
    }
  }
}
~~~

---

## ٥. مين القديم المخالف؟

~~~text
db.orders.find({ $nor: [db.getCollectionInfos({ name: "orders" })[0].options.validator] })
~~~

من جوه لبرّه: نجيب الـ validator بتاع orders (هو نفسه query صالحة)، ونحطه جوه [[$nor]] (not or: «مش مطابق لأي واحد من دول»). يعني «هات اللي مش مطابق للقواعد»:

~~~text الناتج
[
  { _id: ObjectId('6ac52228fa39026e53cf182a'), userId: 2, status: 'shipped' },
  { _id: ObjectId('6ac52228fa39026e53cf182b'), status: 'pending' }
]
~~~

الأول [[status]] بتاعه برّه القايمة، والتاني ناقصه [[userId]]. صلّحهم، وبعدها حوّل لـ [[strict]].

---

## ٦. الـ solCode: [[try]] و [[catch]]

[[for (const doc of [...])]] بيلف على ٣ مستندات. [[try { ... }]] جرّب الـ insert، ولو رمى error بيروح لـ [[catch (e)]] بدل ما السكربت يقف. و [[e.errInfo.details.schemaRulesNotSatisfied[0]]] أول قاعدة فشلت. الناتج الحقيقي:

~~~text الناتج
rejected 121 {"operatorName":"properties","propertiesNotSatisfied":[{"propertyName":"age","details":[{"operatorName":"minimum","specifiedAs":{"minimum":0},"reason":"comparison failed","consideredValue":-1}]}]}
rejected 121 {"operatorName":"properties","propertiesNotSatisfied":[{"propertyName":"age","details":[{"operatorName":"bsonType","specifiedAs":{"bsonType":"number"},"reason":"type did not match","consideredValue":"28","consideredType":"string"}]}]}
rejected 121 {"operatorName":"properties","propertiesNotSatisfied":[{"propertyName":"createdAt","details":[{"operatorName":"bsonType","specifiedAs":{"bsonType":"date"},"reason":"type did not match","consideredValue":"2026-09-29","consideredType":"string"}]}]}
~~~

وجرّبت [[bsonType: "int"]] بدل [[number]]: [[28]] عدّى، بس [[28.5]] و [[Double(28)]] اترفضوا، لأنهم double مش int.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[createCollection(..., { validator })]] | collection جديدة بقواعد |
| [[collMod]] | قواعد على collection موجودة |
| [[validationLevel: "moderate"]] | القديم المخالف يتعدل، والجديد يتفحص |
| [[getCollectionInfos(...)[0].options.validator]] | اعرض القواعد |
| [[$nor: [validator]]] | هات المخالف |

- الرفض بكود [[121]]، والسبب في [[errInfo.details]].
- [[number]] لأي رقم، و [[date]] يعني Date حقيقي مش نص.
- ده خط دفاع أخير؛ التطبيق برضه يتحقق ويرجّع رسالة واضحة لليوزر.`,
          lines: [
            "ادخل قاعدة shop.",
            "اعمل collection بقواعد: email و createdAt لازم، والأنواع محددة، والعمر مش سالب.",
            "مستند مطابق: بيعدّي.",
            "إيميل غلط: بيترفض بـ Document failed validation.",
            "ضيف قواعد على orders الموجودة، والقديم الغلط يفضل يتعدل (moderate).",
            "اعرض القواعد المتخزنة.",
            "هات المستندات القديمة اللي مش مطابقة عشان تصلّحها."
          ],
          sol: R`التلاتة اترفضوا: [[age: -1]] (أقل من minimum)، و [[age: "28"]] (نص مش number)، و [[createdAt: "2026-09-29"]] (نص مش date). كل واحد بيرجع [[MongoServerError: Document failed validation]] وكود 121، وفي [[errInfo.details.schemaRulesNotSatisfied]] اسم الحقل والسبب.

لو واحد منهم عدّى: اتأكد إنك على [[customers]] اللي اتعملت بالـ validator، مش collection اتعملت قبله بنفس الاسم ([[createCollection]] بيفشل لو موجودة، والـ validator مبيتحطش). شوف [[getCollectionInfos]].`,
          solCode: R`use shop
for (const doc of [{ email: "a@b.c", age: -1, createdAt: new Date() }, { email: "a@b.c", age: "28", createdAt: new Date() }, { email: "a@b.c", createdAt: "2026-09-29" }]) {
  try { db.customers.insertOne(doc); print("ok", JSON.stringify(doc)) }
  catch (e) { print("rejected", e.code, JSON.stringify(e.errInfo.details.schemaRulesNotSatisfied[0])) }
}`
        }
      ]
    }
]);

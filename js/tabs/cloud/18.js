// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "Firestore و Security Rules و Functions",
      l: 2,
      n: "تصمم الداتا على قد القرايات، تقفلها بـ Rules ليها اختبارات، وتشغّل كود على السيرفر لما حاجة تتغيّر",
      items: [
        {
          cmd: "Firestore data model",
          title: "documents و collections، والـ query والـ index، وليه كل قراية بفلوس",
          desc: R`Firestore فيه **documents** (object فيه fields، لحد 1 MiB) جوه **collections**، وأي document ممكن يبقى تحته subcollections. مفيش joins: الـ query بيرجّع documents من collection واحدة، وبتدفع على كل document رجع.

عشان كده التصميم بيبدأ من الشاشة مش من الداتا: «الصفحة دي محتاجة إيه في قراية واحدة؟». وبتنسخ حاجات صغيرة (اسم المنتج وسعره جوه الأوردر) بدل ما تعمل join في الكود.`,
          example: R`import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, doc, setDoc, addDoc, getDocs, query, where, orderBy, limit, getCountFromServer, serverTimestamp, writeBatch } from "firebase/firestore";
const db = getFirestore(initializeApp({ projectId: "demo-shop" }));
connectFirestoreEmulator(db, "127.0.0.1", 8080);
await setDoc(doc(db, "users", "u1"), { name: "Mona", city: "Cairo" });
await addDoc(collection(db, "users", "u1", "addresses"), { label: "home", street: "Tahrir St" });
const batch = writeBatch(db);
for (let i = 1; i <= 5; i++) {
  batch.set(doc(collection(db, "orders")), { uid: "u1", total: i * 100, status: i % 2 ? "paid" : "pending", items: [{ name: "Mug", price: 100, qty: i }], createdAt: serverTimestamp() });
}
await batch.commit();
const q = query(collection(db, "orders"), where("uid", "==", "u1"), where("status", "==", "paid"), orderBy("total", "desc"), limit(2));
const snap = await getDocs(q);
console.log("docs:", snap.size, snap.docs.map((d) => d.data().total));
const count = await getCountFromServer(query(collection(db, "orders"), where("uid", "==", "u1")));
console.log("count:", count.data().count);
process.exit(0);`,
          try: R`شغّل المثال بـ [[npx firebase emulators:exec --only firestore "node model.mjs"]] والـ rules مفتوحة (اللي في حل درس الـ emulator). افتح [[http://127.0.0.1:4000/firestore]] وانت شغّال بـ [[emulators:start]] وشوف الشجرة. بعدين صمم على ورقة: صفحة «آخر ١٠ أوردرات لليوزر، ولكل أوردر اسم أول منتج وصورته». تعمل كام قراية لو المنتجات في collection لوحدها وبتجيب كل منتج؟ وكام لو نسخت الاسم والصورة جوه الأوردر؟ واكتب الـ composite index اللي الـ query بتاع المثال محتاجه في [[firestore.indexes.json]].`,
          flag: "script",
          deep: {
            why: R`في SQL بتصمم الجداول «صح» وبعدين تكتب أي query بـ joins، والقاعدة بتتصرف. في Firestore مفيش joins، والفلوس على عدد الـ documents اللي بتقراها مش على حجم القاعدة، وكل query لازم يبقى ليه index. فتصميم غلط معناه شاشة بتعمل ٥٠ قراية بدل ٢، وفاتورة أكبر ٢٥ مرة، أو query مستحيل تكتبه أصلًا.`,
            how: R`المسار: [[users/u1]] document، و [[users/u1/addresses]] subcollection تحته، و [[users/u1/addresses/x9]] document فيها. لازم يتبادلوا: collection ثم document ثم collection... والـ document مش بيحتوي الـ subcollection: قراية [[users/u1]] مبتجيبش العناوين ومبتدفعش عليها.

الـ query: [[where]] و [[orderBy]] و [[limit]] على collection واحدة (أو [[collectionGroup("addresses")]] على كل الـ subcollections اللي بنفس الاسم). كل field بيتعمله index لوحده تلقائيًا، فـ [[where]] واحد أو [[orderBy]] واحد شغالين. لكن أكتر من field مع بعض (هنا [[uid]] و [[status]] و [[total]] تنازلي) محتاج **composite index**. في production الـ query بيفشل بـ [[FAILED_PRECONDITION: The query requires an index]] ومعاه لينك يعمله، والـ emulator **مش بيطلبه** خالص (من الـ docs). فبتكتب الـ indexes في [[firestore.indexes.json]] وتنشرها بـ [[firebase deploy --only firestore:indexes]].

الفلوس (من صفحة الـ pricing): بتدفع على كل document read و write و delete، والحصة المجانية في اليوم ٥٠ ألف قراية و ٢٠ ألف كتابة و ٢٠ ألف مسح. الـ query بيتحسب بعدد الـ documents اللي رجعت، وأقل حاجة قراية واحدة حتى لو مرجعش حاجة. [[count()]] بيتحسب قراية لكل ١٠٠٠ index entry. و [[offset]] بتدفع على كل document اتعدّى، فاستخدم [[startAfter]] للصفحات. والـ listener ([[onSnapshot]]) بيدفع قراية على كل document بيتغيّر أو بيدخل النتيجة، ولو اتقطع أكتر من ٣٠ دقيقة بيتحسب query جديد.

الحدود: document أقصاه 1 MiB، فـ array بيكبر من غير نهاية (كل الكومنتات جوه البوست) غلط، حطها subcollection. وكتابة document واحد بشكل مستمر ليها حد (الـ docs بتقول حوالي مرة في الثانية)، فعدّاد بيتزوّد من آلاف اليوزرز بيتقسم على كذا document (distributed counter).`,
            when: R`قبل ما تكتب أول [[setDoc]]: اكتب الشاشات، ولكل شاشة الـ query بتاعها، وبعدين اعمل الـ documents على مقاسها. انسخ (denormalize) الحاجات الصغيرة اللي بتتقري كتير ونادرًا بتتغيّر (اسم المنتج وصورته في الأوردر، اسم الكاتب في البوست). وخلّي subcollection للحاجات اللي بتكبر من غير حد أو بتتقري لوحدها (الرسايل، العناوين، الكومنتات).`,
            mistakes: R`تصمم زي SQL وتجيب كل منتج في query لوحده (N+1 قراية). وتحط list بتكبر جوه document لحد ما يعدّي 1 MiB. وتنسى الـ index لأن كله شغال على الـ emulator، وتكتشف في production. وتستخدم [[offset]] للصفحات فتدفع على كل اللي اتعدّوا. وتحط [[onSnapshot]] على collection كبيرة من غير [[limit]] فكل فتحة للشاشة تقرا الآلاف. وتعدّ بـ [[getDocs]] وتشوف [[size]] بدل [[getCountFromServer]]. وتخزن الوقت من جهاز اليوزر ([[new Date()]]) بدل [[serverTimestamp()]] فالترتيب يبوظ لو ساعته غلط.`
          },
          teach: R`## الفكرة: نكتب داتا بشكل Firestore ونقراها بالـ query اللي الشاشة محتاجاه

المثال بيعمل يوزر وتحته subcollection عناوين، و ٥ أوردرات في batch واحد، وبعدين بيجيب «أغلى ٢ أوردر مدفوعين لليوزر» وبيعدّ أوردراته.

اللي اتشغّل: [[npx firebase emulators:exec --only firestore "node model.mjs"]] بـ [[firebase]] 13.1.0 وملف rules مفتوح ([[allow read, write: if true]]، اللي في حل درس [[firebase emulators:start]]). بالـ rules المقفولة بتاعة الدرس الجاي نفس السكربت فشل بـ [[PERMISSION_DENIED]]، لأنه من غير login.

---

## ١. الـ imports

[[firebase/firestore]] فيه function لكل حاجة: [[collection]] و [[doc]] بيعملوا **reference** (عنوان، من غير ما يقرا حاجة)، و [[setDoc]] و [[addDoc]] و [[getDocs]] بيعملوا الطلب فعلًا. و [[query]] و [[where]] و [[orderBy]] و [[limit]] بيبنوا الـ query.

---

## ٢. document باسم انت اختاره: [[setDoc]]

~~~js
await setDoc(doc(db, "users", "u1"), { name: "Mona", city: "Cairo" });
~~~

[[doc(db, "users", "u1")]] = المسار [[users/u1]]. و [[setDoc]] بيكتب الـ document كله (لو موجود بيستبدله، ولو عايز تدمج [[{ merge: true }]]). في تطبيق حقيقي الـ id ده بيبقى [[uid]] اليوزر من Auth، فـ [[users/<uid>]] مكانه معروف من غير query.

---

## ٣. subcollection و id تلقائي: [[addDoc]]

~~~js
await addDoc(collection(db, "users", "u1", "addresses"), { label: "home", street: "Tahrir St" });
~~~

المسار [[users/u1/addresses]]: collection تحت الـ document. و [[addDoc]] بيعمل id عشوائي (٢٠ حرف). والـ document بتاع اليوزر **مبيتغيّرش**: لما قرينا [[users/u1]] بعدها رجّع [[{ name: 'Mona', city: 'Cairo' }]] بس، من غير العناوين.

~~~text الشجرة في واجهة الـ emulator
users
  u1                 { name, city }
    addresses
      (id عشوائي)    { label, street }
orders
  (id عشوائي) × 5    { uid, total, status, items[], createdAt }
~~~

---

## ٤. ٥ كتابات في طلب واحد: [[writeBatch]]

~~~js
const batch = writeBatch(db);
for (let i = 1; i <= 5; i++) {
  batch.set(doc(collection(db, "orders")), { uid: "u1", total: i * 100, status: i % 2 ? "paid" : "pending", items: [{ name: "Mug", price: 100, qty: i }], createdAt: serverTimestamp() });
}
await batch.commit();
~~~

| الحتة | معناها |
|---|---|
| [[writeBatch(db)]] | مجموعة كتابات بتتبعت مع بعض: يا كلها تنجح يا ولا واحدة (لحد ٥٠٠) |
| [[doc(collection(db, "orders"))]] | reference لـ document جديد بـ id عشوائي، من غير ما يكتب |
| [[i % 2 ? "paid" : "pending"]] | [[%]] باقي القسمة: الفردي [[paid]] (1 و 3 و 5) والزوجي [[pending]] |
| [[items]] | المنتج **منسوخ** جوه الأوردر بالاسم والسعر: الشاشة مش محتاجة تقرا [[products]] |
| [[serverTimestamp()]] | السيرفر بيحط الوقت، مش ساعة جهاز اليوزر |
| [[batch.commit()]] | ابعت الكل |

والفلوس: ٥ كتابات، سواء batch ولا لأ. الـ batch بيوفّر وقت وبيضمن إن الكل يتكتب مع بعض، مش فلوس.

---

## ٥. الـ query

~~~js
const q = query(collection(db, "orders"), where("uid", "==", "u1"), where("status", "==", "paid"), orderBy("total", "desc"), limit(2));
const snap = await getDocs(q);
~~~

بالترتيب: من [[orders]]، اللي [[uid]] بتاعها [[u1]]، والمدفوعة بس، رتّب بالـ [[total]] من الكبير ([[desc]])، وهات ٢.

~~~text الناتج
docs: 2 [ 500, 300 ]
~~~

المدفوعين ٣ (100 و 300 و 500)، والـ [[limit(2)]] جاب أكبر اتنين. **ودفعنا قرايتين** مش ٣ ولا ٥: بتدفع على اللي رجع بس. و [[snap.docs]] array من الـ documents، و [[d.data()]] بيطلّع الـ fields.

### الـ index اللي الـ query ده محتاجه

٣ fields مع بعض (اتنين [[==]] وترتيب) = composite index. الـ emulator شغّله من غير index، لكن production هيرفض لحد ما تضيف ده (الشكل من الـ docs):

~~~json firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "uid", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "total", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
~~~

الـ [[==]] الأول وبعدهم الترتيب. والنشر (من الـ docs، محتاج مشروع حقيقي و login): [[npx firebase deploy --only firestore:indexes]]. وأسهل طريقة تعرف المطلوب: شغّل الـ query على staging، والـ error بيجي معاه لينك بيعمل الـ index، وبعدين [[npx firebase firestore:indexes]] بيطبع الـ indexes الموجودة بنفس صيغة الملف.

---

## ٦. العد من غير ما تقرا: [[getCountFromServer]]

~~~js
const count = await getCountFromServer(query(collection(db, "orders"), where("uid", "==", "u1")));
~~~

~~~text الناتج
count: 5
~~~

السيرفر بيعدّ ويرجّع رقم. والحساب: قراية واحدة لكل ١٠٠٠ index entry، يعني هنا قراية واحدة. لو كنت عملت [[getDocs]] وبصيت على [[size]] كنت هتدفع ٥، ولو ١٠ آلاف أوردر تدفع ١٠ آلاف بدل ١٠.

و [[process.exit(0)]] في الآخر عشان الـ SDK فاتح اتصال مع السيرفر وبيخلّي Node شغال. في المتصفح مش محتاجه.

---

## ٧. نفس الشاشة بتصميمين

«آخر ١٠ أوردرات، ولكل أوردر اسم أول منتج»:

| التصميم | القرايات |
|---|---|
| الأوردر فيه [[productId]] بس، وتجيب كل منتج | 10 + 10 = **20** |
| الأوردر فيه [[items]] بالاسم والسعر والصورة | **10** |
| ومعاهم عدد الأوردرات بـ [[getCountFromServer]] | +1 |

التمن: لو اسم المنتج اتغيّر، الأوردرات القديمة فيها الاسم القديم. وده غالبًا **المطلوب** في أوردر (الفاتورة بتاعة وقت الشرا). ولو لازم يتحدّث، Cloud Function بتعدّل النسخ (درس [[Cloud Functions]]).

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| صمم من الشاشة: كل شاشة = query أو اتنين | مفيش joins |
| انسخ الصغير اللي بيتقري كتير | قرايات أقل |
| اللي بيكبر من غير حد = subcollection | الـ document أقصاه 1 MiB |
| أكتر من field في query = composite index | الـ emulator مش هيقولك |
| [[getCountFromServer]] للعد، و [[startAfter]] للصفحات | [[getDocs]] و [[offset]] بيدفعوا على كل document |
| [[serverTimestamp()]] للوقت | ساعة اليوزر ممكن تبقى غلط |`,
          lines: [
            R`[[initializeApp]] للـ client SDK.`,
            R`كل دوال Firestore اللي هنستخدمها: references وكتابة وقراية وquery وعد.`,
            R`القاعدة. [[projectId]] كفاية لـ Firestore مع الـ emulator.`,
            R`كلّم الـ emulator على 8080.`,
            R`document باسم انت اختاره: [[users/u1]].`,
            R`document بـ id عشوائي في subcollection [[users/u1/addresses]]. الـ user document نفسه مبيتغيّرش.`,
            R`batch: كتابات كتير بتتبعت مع بعض، يا كلها يا ولا حاجة.`,
            R`لف ٥ مرات.`,
            R`أوردر بـ id عشوائي، والمنتج منسوخ جواه، والوقت من السيرفر.`,
            R`آخر الـ [[for]].`,
            R`ابعت الـ ٥ كتابات (وبرضه بيتحسبوا ٥ كتابات).`,
            R`أوردرات [[u1]] المدفوعة، من الأغلى، أول ٢. محتاج composite index في production.`,
            R`نفّذ الـ query: بتدفع على عدد الـ documents اللي رجعت.`,
            R`اطبع العدد وقيمة [[total]] لكل واحد.`,
            R`عدّ على السيرفر: قراية لكل ١٠٠٠ index entry بدل قراية لكل document.`,
            R`اطبع العدد.`,
            R`اقفل Node: الـ SDK سايب اتصال مفتوح (مش محتاج في المتصفح).`
          ],
          sol: R`اتشغّل على الـ Firestore emulator بالـ rules المفتوحة:

[[docs: 2 [ 500, 300 ] ]]، و [[count: 5]].

الشاشة: لو المنتجات في collection لوحدها = 10 قرايات للأوردرات + 10 لكل منتج = 20 (ولو كل أوردر فيه أكتر من منتج بتزيد أكتر). لو الاسم والصورة منسوخين جوه [[items]] = 10 بس. يعني نص الفلوس ونص وقت التحميل.

الـ index: [[collectionGroup: "orders"]] و [[queryScope: "COLLECTION"]] والـ fields بالترتيب: [[uid]] ASCENDING ثم [[status]] ASCENDING ثم [[total]] DESCENDING (زي اللي في الشرح). والـ emulator مش هيقولك عليه، فاختبر الـ queries على مشروع staging قبل الـ release.`
        },
        {
          cmd: "Firestore Security Rules",
          title: "rule مفتوح بيسرّب الداتا، وتصليحه، واختباره بـ rules-unit-testing",
          desc: R`أي حد معاه الـ config بتاع تطبيقك (يعني أي زائر) يقدر يكلّم Firestore مباشرة من غير الواجهة بتاعتك. Security Rules هي الحماية الوحيدة: لكل مسار مين يقرا ومين يكتب وبأي شروط، بـ [[request.auth]] (مين بيطلب) و [[resource.data]] (الموجود) و [[request.resource.data]] (اللي جاي يتكتب).

المثال rules بتقفل الأوردرات على صاحبها، وبتتأكد من شكل الأوردر الجديد. والاختبار بـ [[@firebase/rules-unit-testing]] على الـ emulator: نفس الاختبارات وقعت ٤ من ٤ على الـ rule المفتوح، وعدّت ٤ من ٤ بعد التصليح.`,
          example: R`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid
        && request.resource.data.keys().hasOnly(["uid", "total", "status"])
        && request.resource.data.total is number
        && request.resource.data.total > 0
        && request.resource.data.status == "pending";
      allow update, delete: if false;
    }
  }
}`,
          try: R`في فولدر الـ emulator: [[npm i -D @firebase/rules-unit-testing firebase]]، واحفظ الاختبارات اللي في الحل [[rules.test.mjs]]، والـ rule المفتوح [[firestore.open.rules]]. شغّل [[RULES=firestore.open.rules npx firebase emulators:exec --only firestore "node --test --test-reporter=spec rules.test.mjs"]] وشوف كام اختبار وقع. بعدين شغّلها على [[firestore.rules]] بتاع المثال. وآخر حاجة: احذف سطر [[status == "pending"]] من الـ rules، أنهي اختبار وقع؟`,
          flag: "script",
          deep: {
            why: R`في Firebase مفيش API بينك وبين القاعدة. كود الواجهة اللي «بيخفي» أوردرات الناس التانية مش حماية: أي حد يفتح الـ console ويكتب [[getDocs(collection(db, "orders"))]] بنفس الـ config. أشهر تسريبات Firebase حصلت من rules «test mode» اتنست. والـ rules من غير اختبارات بتتكسر بهدوء أول ما حد يعدّلها.`,
            how: R`[[match /orders/{orderId}]] بيطابق أي document في [[orders]]، و [[{orderId}]] متغير فيه الـ id. و [[allow read]] = [[get]] (document واحد) + [[list]] (query)، و [[allow write]] = [[create]] + [[update]] + [[delete]]، وتقدر تكتب كل واحدة لوحدها. ولو مفيش [[allow]] بيطابق، الطلب مرفوض (deny by default).

[[request.auth]] بيبقى [[null]] لو مفيش login، وفيه [[uid]] و [[token]] (الـ claims، زي [[request.auth.token.role]] من درس [[Firebase Auth + verifyIdToken]]). و [[resource.data]] الـ document اللي موجود، و [[request.resource.data]] شكله بعد الكتابة لو اتقبلت.

أهم نقطة: **الـ rules مش filter**. Firestore مش بيقرا كل document ويشيل الممنوع؛ هو بيتأكد إن الـ query نفسه **مستحيل** يرجّع حاجة ممنوعة. فـ [[getDocs(collection(db, "orders"))]] من أليس بيترفض كله، حتى لو كل الأوردرات بتاعتها، و [[query(..., where("uid", "==", "alice"))]] بيعدّي. يعني الـ query في الكود لازم «يثبت» إنه ماشي على الـ rule.

[[@firebase/rules-unit-testing]]: [[initializeTestEnvironment]] بيحمّل الـ rules اللي تدّيهاله في الـ emulator (بغض النظر عن [[firebase.json]])، و [[authenticatedContext("bob")]] بيدّيك Firestore كأن [[bob]] عامل login، و [[unauthenticatedContext()]] زائر، و [[withSecurityRulesDisabled]] لتجهيز الداتا. و [[assertSucceeds]] و [[assertFails]] بيتأكدوا الطلب اتقبل ولا اترفض.

والـ rules بتتنشر (من الـ docs، مشروع حقيقي): [[npx firebase deploy --only firestore:rules]]، وبتاخد لحد دقيقة عشان تشتغل.`,
            when: R`كل collection بيتكلّم من الـ client محتاجة rules واختبارات في CI قبل ما تنزل. والحاجات اللي الـ client ميلمسهاش خالص (status الدفع، الرصيد، الأدوار) خليها [[if false]] للكتابة، وتتكتب من السيرفر أو Cloud Function بالـ Admin SDK (اللي بيعدّي الـ rules).`,
            mistakes: R`[[allow read, write: if true]] أو [[if request.time < timestamp.date(...)]] بتاعة test mode تفضل لحد الـ production. و [[if request.auth != null]] لوحدها: أي حد يعمل حساب ببلاش يقرا داتا الكل. وتتأكد من [[uid]] بس وتنسى شكل الداتا، فيوزر يكتب [[status: "paid"]] أو [[total: -1]] أو field زيادة [[isAdmin: true]] (عشان كده [[hasOnly]]). و [[allow write]] بدل [[create]] لوحدها، فـ update بنفس الشروط يعدّل أوردر قديم. وتتوقع الـ rules تفلتر الـ query فتلاقي الشاشة كلها [[permission-denied]]. وتختبر في الـ Rules Playground بإيدك مرة وخلاص بدل اختبارات بتتشغّل في CI.`
          },
          teach: R`## الفكرة: كل طلب بيعدّي على الـ rules، فنكتبها ونختبرها

هنعمل ٣ حاجات: نشوف الـ rule المفتوح بيسرّب إيه، نفك الـ rules المصلّحة سطر سطر، ونشغّل نفس الاختبارات على الاتنين.

اللي اتشغّل: [[@firebase/rules-unit-testing]] 6.0.0 مع [[firebase]] 13.1.0 و [[node --test]] (الـ test runner اللي في Node 22)، جوه [[npx firebase emulators:exec --only firestore]].

---

## ١. الـ rule اللي بيسرّب

~~~text firestore.open.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
~~~

[[{document=**}]] يعني «أي مسار تحت هنا مهما كان عمقه» ([[**]] = recursive wildcard)، و [[if true]] = مسموح دايمًا. يعني أي زائر من غير login يقرا ويكتب ويمسح أي حاجة.

---

## ٢. الـ rules المصلّحة

### الـ header

~~~text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
~~~

[[rules_version = '2']] لازم (من غيره [[**]] بيتصرف بالطريقة القديمة). و [[{database}]] أي قاعدة في المشروع، و [[/documents]] بداية مسارات الـ documents. السطرين دول ثابتين في كل ملف.

### اليوزر يلمس الـ document بتاعه بس

~~~text
match /users/{uid} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
~~~

[[{uid}]] متغير فيه الـ id من المسار. والشرط: عامل login، والـ uid بتاعه هو نفس اسم الـ document. وعشان كده في الدرس اللي فات سمّينا الـ document بالـ uid ([[users/<uid>]]).

### الأوردرات

~~~text
allow read: if request.auth != null && resource.data.uid == request.auth.uid;
~~~

[[resource.data]] = الأوردر الموجود. يعني تقرا الأوردر لو الـ [[uid]] اللي جواه هو انت.

~~~text
allow create: if request.auth != null
  && request.resource.data.uid == request.auth.uid
  && request.resource.data.keys().hasOnly(["uid", "total", "status"])
  && request.resource.data.total is number
  && request.resource.data.total > 0
  && request.resource.data.status == "pending";
~~~

[[request.resource.data]] = الأوردر **الجديد** اللي جاي يتكتب. والشروط كلها بـ [[&&]] (و):

| الشرط | بيمنع إيه |
|---|---|
| [[uid == request.auth.uid]] | تعمل أوردر باسم حد تاني |
| [[keys().hasOnly([...])]] | fields زيادة زي [[isAdmin: true]] أو [[discount: 100]] |
| [[total is number]] | [[total: "free"]] (و [[is]] بيتأكد من النوع) |
| [[total > 0]] | أوردر بسالب |
| [[status == "pending"]] | اليوزر يعمل أوردره [[paid]] بنفسه |

~~~text
allow update, delete: if false;
~~~

محدش يعدّل أو يمسح أوردر من الـ client. تغيير الـ status لـ [[paid]] بيحصل من السيرفر بعد ما الدفع يتأكد، بالـ Admin SDK اللي بيعدّي الـ rules.

---

## ٣. الاختبارات (الحل فيه الملف كامل)

~~~js
env = await initializeTestEnvironment({
  projectId: "demo-shop",
  firestore: { rules: readFileSync(process.env.RULES ?? "firestore.rules", "utf8") },
});
await env.withSecurityRulesDisabled(async (ctx) => {
  await setDoc(doc(ctx.firestore(), "orders/o1"), { uid: "alice", total: 500, status: "paid" });
});
~~~

- [[initializeTestEnvironment]] بيلاقي الـ emulator لوحده من [[FIRESTORE_EMULATOR_HOST]] اللي [[emulators:exec]] بيحطه، وبيحمّل الـ rules من الملف. و [[process.env.RULES ?? "firestore.rules"]] عشان نختار الملف من برّه.
- [[withSecurityRulesDisabled]] بيكتب داتا البداية كأن مفيش rules: أوردر لأليس.

وكل اختبار بيعمل context ليوزر ويجرّب:

~~~js
const bob = env.authenticatedContext("bob").firestore();
await assertFails(getDoc(doc(bob, "orders/o1")));
~~~

«بوب عامل login، لو قرا أوردر أليس لازم يترفض». [[assertFails]] بينجح لو الطلب **اترفض**، ويفشل لو الطلب عدّى.

---

## ٤. التشغيل على الـ rule المفتوح

~~~bash
RULES=firestore.open.rules npx firebase emulators:exec --only firestore "node --test --test-reporter=spec rules.test.mjs"
~~~

[[RULES=...]] قبل الأمر بيحط متغير بيئة للأمر ده بس (bash). و [[--test-reporter=spec]] بيطبع اسم كل اختبار بعلامة.

~~~text الناتج
✖ a visitor without login cannot read orders (1694.11991ms)
✖ bob cannot read alice order (66.869259ms)
✖ alice reads her orders only with where uid (81.308288ms)
✖ bob cannot fake the uid or the status (54.814038ms)
ℹ pass 0
ℹ fail 4
  Error: Expected request to fail, but it succeeded.
~~~

كل اختبار «المفروض يترفض» عدّى: الزائر قرا كل الأوردرات، وبوب قرا أوردر أليس، وبوب عمل أوردر باسم أليس وأوردر [[paid]]. ده التسريب.

---

## ٥. التشغيل على الـ rules المصلّحة

~~~text الناتج
✔ a visitor without login cannot read orders (2032.471178ms)
✔ bob cannot read alice order (129.55963ms)
✔ alice reads her orders only with where uid (143.057626ms)
  @firebase/firestore: Firestore (13.1.0): GrpcConnection RPC 'Write' stream 0x55aad2ac error. Code: 7 Message: 7 PERMISSION_DENIED:
  false for 'create' @ L9, false for 'update' @ L15
✔ bob cannot fake the uid or the status (112.629067ms)
ℹ pass 4
ℹ fail 0
~~~

- أول اختبار أبطأ (٢ ثانية) عشان أول اتصال بالـ emulator.
- سطور [[PERMISSION_DENIED]] لوج من الـ SDK للطلبات اللي اترفضت (وده المطلوب). و [[false for 'create' @ L9, false for 'update' @ L15]] بيقولك أنهي سطر في الـ rules رفض: [[setDoc]] ممكن يبقى create أو update، فالاتنين اتجربوا (سطر 9 بداية [[allow create]] وسطر 15 [[allow update, delete]]).
- الاختبار التالت فيه نقطة الـ «مش filter»: أليس بـ [[where("uid", "==", "alice")]] عدّت، وأليس بـ [[getDocs(collection(alice, "orders"))]] من غير where **اترفضت**، رغم إن الأوردر الوحيد بتاعها. الـ query لازم يثبت إنه مش هيرجّع حاجة مش بتاعتك.

---

## الخلاصة

| | الـ rule المفتوح | المصلّح |
|---|---|---|
| زائر يقرا الأوردرات | ✔ (تسريب) | ✖ |
| بوب يقرا أوردر أليس | ✔ (تسريب) | ✖ |
| أوردر باسم حد تاني أو [[paid]] | ✔ | ✖ |
| أليس بـ [[where uid]] | ✔ | ✔ |
| الاختبارات | 0 من 4 | 4 من 4 |

> الـ rules مش filter: اكتب الـ query بنفس شرط الـ rule ([[where("uid", "==", user.uid)]]). والحاجات الحساسة (الدفع، الأدوار) [[if false]] للـ client، وتتكتب من السيرفر.`,
          lines: [
            R`نسخة لغة الـ rules: لازم 2.`,
            R`الـ rules دي لـ Firestore.`,
            R`أي قاعدة في المشروع، وكل المسارات تحت [[/documents]].`,
            R`أي document في [[users]]، و [[uid]] متغير فيه اسمه.`,
            R`اقرا واكتب الـ document بتاعك بس: عامل login والـ uid بتاعك = اسم الـ document.`,
            R`آخر [[users]].`,
            R`أي أوردر، و [[orderId]] فيه الـ id.`,
            R`تقرا الأوردر لو الـ [[uid]] اللي جواه ([[resource.data]]) هو انت.`,
            R`الإنشاء مسموح لو عامل login، و...`,
            R`...الأوردر الجديد ([[request.resource.data]]) باسمك انت،`,
            R`...ومفيهوش غير الـ 3 fields دول،`,
            R`...و [[total]] رقم،`,
            R`...وأكبر من صفر،`,
            R`...والـ status [[pending]] (الدفع بيتأكد من السيرفر).`,
            R`محدش يعدّل أو يمسح أوردر من الـ client.`,
            R`آخر [[orders]].`,
            R`آخر [[/documents]].`,
            R`آخر الـ service.`
          ],
          sol: R`اتشغّل بـ [[@firebase/rules-unit-testing]] 6.0.0 على Firestore emulator:

الـ rule المفتوح: [[pass 0]] و [[fail 4]]، وكل واحد [[Expected request to fail, but it succeeded.]]. حتى اختبار أليس وقع، لأن الجزء [[assertFails(getDocs(collection(alice, "orders")))]] عدّى.

الـ rules بتاعة المثال: [[pass 4]] و [[fail 0]].

لو حذفت [[status == "pending"]] (وشلت الـ [[&&]] اللي قبله عشان الـ syntax يفضل سليم): يقع اختبار [[bob cannot fake the uid or the status]]، لأن [[{ uid: "bob", total: 10, status: "paid" }]] بقى بيعدّي. وده بالظبط فايدة الاختبار: أي حد يعدّل الـ rules ويكسر حاجة، الـ CI يقع.`,
          solCode: R`// rules.test.mjs
import { test, before, after } from "node:test";
import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, collection, getDocs, query, where } from "firebase/firestore";

let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-shop",
    firestore: { rules: readFileSync(process.env.RULES ?? "firestore.rules", "utf8") },
  });
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), "orders/o1"), { uid: "alice", total: 500, status: "paid" });
  });
});
after(() => env.cleanup());

test("a visitor without login cannot read orders", async () => {
  const anon = env.unauthenticatedContext().firestore();
  await assertFails(getDocs(collection(anon, "orders")));
});

test("bob cannot read alice order", async () => {
  const bob = env.authenticatedContext("bob").firestore();
  await assertFails(getDoc(doc(bob, "orders/o1")));
});

test("alice reads her orders only with where uid", async () => {
  const alice = env.authenticatedContext("alice").firestore();
  await assertSucceeds(getDocs(query(collection(alice, "orders"), where("uid", "==", "alice"))));
  await assertFails(getDocs(collection(alice, "orders")));
});

test("bob cannot fake the uid or the status", async () => {
  const bob = env.authenticatedContext("bob").firestore();
  await assertFails(setDoc(doc(bob, "orders/o2"), { uid: "alice", total: 10, status: "pending" }));
  await assertFails(setDoc(doc(bob, "orders/o3"), { uid: "bob", total: 10, status: "paid" }));
  await assertSucceeds(setDoc(doc(bob, "orders/o4"), { uid: "bob", total: 10, status: "pending" }));
});`
        },
        {
          cmd: "Storage rules",
          title: "رفع صور اليوزرز: كل واحد في فولدره، بحجم ونوع محددين",
          desc: R`Cloud Storage for Firebase بيخلّي الـ client يرفع الملف على Google Cloud Storage مباشرة، من غير ما يعدّي على سيرفرك. ونفس فكرة Firestore: Storage Rules هي اللي بتقرر مين يرفع إيه وفين.

المثال: كل يوزر يرفع في [[avatars/<uid>/]] بس، صورة png أو jpeg أو webp أصغر من 2 MB، وأي حد عامل login يقرا، وصاحب الفولدر بس يمسح. الـ rule الشائع [[allow read, write: if request.auth != null]] وقع في ٣ اختبارات من ٤.`,
          example: R`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{uid}/{fileName} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null
        && request.auth.uid == uid
        && request.resource.size < 2 * 1024 * 1024
        && request.resource.contentType.matches("image/(png|jpeg|webp)");
      allow delete: if request.auth != null && request.auth.uid == uid;
    }
  }
}`,
          try: R`احفظ المثال [[storage.rules]]، والاختبارات اللي في الحل [[storage.test.mjs]]، وشغّل [[npx firebase emulators:exec --only storage "node --test --test-reporter=spec storage.test.mjs"]]. بعدين جرّب الـ rule الشائع ([[match /{allPaths=**}]] و [[allow read, write: if request.auth != null]]) بـ [[RULES=storage.open.rules]]. وآخر حاجة: غيّر [[allow create, update]] و [[allow delete]] لسطر واحد [[allow write]] بنفس شروط الرفع، وشوف هل صاحب الصورة لسه يقدر يمسحها.`,
          flag: "script",
          deep: {
            why: R`رفع الملفات من الـ client مباشرة بيوفّر عليك سيرفر بيستقبل ميجات ويعيد رفعها. بس من غير rules كويسة، أي يوزر يكتب فوق صورة يوزر تاني، أو يرفع ملف 2 GB يملا الـ bucket ويكبّر الفاتورة، أو يرفع [[.html]] فيه JavaScript وتبقى الصفحة بتتفتح من الدومين بتاعك.`,
            how: R`[[match /b/{bucket}/o]] ثابت: [[b]] = bucket و [[o]] = objects. وتحته المسار بتاع الملف نفسه. و [[{uid}]] و [[{fileName}]] متغيرات لحتتين في المسار، و [[{allPaths=**}]] أي مسار مهما كان عمقه.

[[request.resource]] الملف اللي جاي يترفع: [[size]] بالبايت، و [[contentType]] (اللي الـ client بعته في الـ metadata)، و [[metadata]] لأي metadata تانية. و [[resource]] الملف الموجود. و [[matches]] بيقارن بـ regex على النص كله.

ليه [[create, update]] و [[delete]] لوحدهم؟ [[allow write]] بيغطي التلاتة، ولما تمسح [[request.resource]] بيبقى [[null]]، فشرط [[request.resource.size]] بيبقى error، والـ error في الـ rules = رفض. فالمسح كان هيبقى ممنوع على صاحب الملف نفسه.

مهم: [[contentType]] ده اللي الـ client قاله، مش محتوى الملف الحقيقي. حد ممكن يبعت HTML ويقول [[image/png]]. الـ rule بيقفل الغلط العادي وأغلب الإساءة، بس لو بتعرض الصور لناس تانية، فحص المحتوى (أو إعادة ضغط الصورة) يتعمل في Cloud Function بعد الرفع. والحجم بقى حقيقي (Storage بيعرف عدد البايتات).

ومن الـ client: [[uploadBytes(ref(storage, "avatars/" + uid + "/me.png"), file, { contentType: file.type })]]، و [[getDownloadURL]] بيدّيك لينك فيه token مش بيخلص: أي حد معاه اللينك يفتح الملف حتى من غير login، فالـ rule بتاع [[read]] بيحمي الـ SDK مش اللينك. والنشر (من الـ docs): [[npx firebase deploy --only storage]]، والمشروع لازم يبقى على Blaze عشان Storage يشتغل.`,
            when: R`صور البروفايل، ومرفقات الشات، وأي ملف بيرفعه يوزر. ولو الملف لازم يتعالج (thumbnail، فحص) حط Cloud Function على [[onObjectFinalized]] من [[firebase-functions/storage]]. ولو انت مش على Firebase أصلًا، نفس الفكرة على S3 بالـ presigned URL (درس [[presigned URL]] في التاب ده).`,
            mistakes: R`[[allow read, write: if request.auth != null]] على كل الـ bucket: أي يوزر يكتب فوق ملف أي يوزر تاني ويرفع بأي حجم. ومفيش حد للحجم. وتثق في [[contentType]] كأنه فحص للمحتوى. و [[allow write]] بشروط على [[request.resource]] فالمسح يقع. وتفتكر إن [[getDownloadURL]] محمي بالـ rules. وتسمّي الملف من اسم اليوزر بدل الـ [[uid]] (الأسامي بتتكرر وبتتغيّر).`
          },
          teach: R`## الفكرة: نفس طريقة Firestore، بس على مسارات ملفات

اللي اتشغّل: Storage emulator ([[firebase-tools]] 15.34.1، ومحرّك الـ rules [[cloud-storage-rules-runtime-v1.1.3]] اللي محتاج Java 21) و [[@firebase/rules-unit-testing]] 6.0.0 مع [[firebase/storage]] من [[firebase]] 13.1.0.

---

## ١. المسار

~~~text
match /b/{bucket}/o {
  match /avatars/{uid}/{fileName} {
~~~

| الحتة | معناها |
|---|---|
| [[/b/{bucket}/o]] | ثابت: أي bucket، وكل الـ objects (الملفات) جواه |
| [[/avatars/]] | فولدر ثابت |
| [[{uid}]] | أي اسم فولدر، وقيمته في متغير [[uid]] |
| [[{fileName}]] | اسم الملف. مستوى واحد بس: [[avatars/alice/a/b.png]] **مش** بيطابق |

يعني الملف [[avatars/alice/me.png]] بيطابق، و [[uid]] = [[alice]].

---

## ٢. القراية

~~~text
allow read: if request.auth != null;
~~~

أي حد عامل login يشوف صور البروفايل (بتظهر جنب الكومنتات مثلًا). ولو عايزها خاصة: [[request.auth.uid == uid]].

---

## ٣. الرفع

~~~text
allow create, update: if request.auth != null
  && request.auth.uid == uid
  && request.resource.size < 2 * 1024 * 1024
  && request.resource.contentType.matches("image/(png|jpeg|webp)");
~~~

| الشرط | معناه |
|---|---|
| [[request.auth.uid == uid]] | الفولدر فولدرك |
| [[request.resource.size < 2 * 1024 * 1024]] | أقل من 2 MiB (الحجم بالبايت، و [[1024 * 1024]] = ميجا) |
| [[contentType.matches(...)]] | النوع اللي الـ client بعته لازم يطابق الـ regex (تحت) |

والـ regex [[image/(png|jpeg|webp)]] معناه: [[image/]] وبعدها واحدة من التلاتة، والخط العمودي جوه القوسين معناه «أو». و [[matches]] بيطابق النص كله، فـ [[image/png; x]] مش هيعدّي.

---

## ٤. المسح لوحده

~~~text
allow delete: if request.auth != null && request.auth.uid == uid;
~~~

في المسح [[request.resource]] = [[null]]، فلو كان جوه [[allow write]] مع شرط الحجم، الـ rule كان هيرمي error ويترفض. فصلناه بشرط من غير [[request.resource]].

---

## ٥. الاختبارات (في الحل)

~~~js
const small = new Uint8Array(1024);
const big = new Uint8Array(3 * 1024 * 1024);
const as = (uid) => (uid ? env.authenticatedContext(uid) : env.unauthenticatedContext()).storage();
~~~

- [[Uint8Array(1024)]] ملف وهمي ١ KB كله أصفار، و [[big]] ٣ ميجا. مش محتاجين صورة حقيقية: الـ rules بتبص على الحجم والـ [[contentType]] بس.
- [[as("alice")]] بيرجّع Storage كأن أليس عاملة login، و [[as(null)]] زائر.

~~~js
await assertSucceeds(uploadBytes(ref(as("alice"), "avatars/alice/me.png"), small, { contentType: "image/png" }));
~~~

[[ref(storage, path)]] عنوان الملف، و [[uploadBytes(ref, data, metadata)]] بيرفع، والـ [[contentType]] بيروح في الـ metadata، وهو اللي الـ rule بيقراه.

---

## ٦. النتايج

~~~bash
npx firebase emulators:exec --only storage "node --test --test-reporter=spec storage.test.mjs"
~~~

~~~text بالـ rules بتاعة المثال
✔ alice uploads a small png to her own folder (249.896148ms)
✔ bob cannot write into alice folder (19.770376ms)
✔ no 3MB file and no html posing as an avatar (67.234998ms)
✔ visitors cannot read, bob can read, only alice deletes (41.620733ms)
ℹ pass 4
ℹ fail 0
~~~

~~~text بالـ rule الشائع: allow read, write: if request.auth != null
✔ alice uploads a small png to her own folder (192.590659ms)
✖ bob cannot write into alice folder (18.715817ms)
✖ no 3MB file and no html posing as an avatar (59.608481ms)
✖ visitors cannot read, bob can read, only alice deletes (31.766866ms)
ℹ pass 1
ℹ fail 3
~~~

بالـ rule الشائع: بوب كتب فوق صورة أليس، وعدّى ملف ٣ ميجا وملف [[text/html]]، وبوب مسح صورة أليس. والزائر اترفض (عشان [[request.auth != null]])، بس ده مش كفاية.

> الاختبار الرابع بيعتمد على الملف اللي اترفع في الأول. [[node --test]] بيشغّل الاختبارات اللي في نفس الملف بالترتيب، فده شغال، بس في مشروع كبير خلّي كل اختبار يجهّز داتاه لوحده.

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| فولدر لكل [[uid]] و [[request.auth.uid == uid]] | محدش يكتب فوق ملف غيره |
| [[request.resource.size < ...]] | الـ bucket والفاتورة |
| [[contentType.matches(...)]] | يقفل الغلط العادي، بس **مش** فحص محتوى |
| [[create, update]] منفصلة عن [[delete]] | في المسح [[request.resource]] = [[null]] |
| [[getDownloadURL]] | لينك عام: الـ rules مش بتحميه |`,
          lines: [
            R`نسخة لغة الـ rules: 2.`,
            R`الـ rules دي لـ Cloud Storage.`,
            R`أي bucket ([[b]])، وكل الملفات ([[o]]) جواه.`,
            R`أي ملف مباشرة تحت [[avatars/<uid>/]]: [[uid]] و [[fileName]] متغيرات.`,
            R`أي حد عامل login يقرا.`,
            R`الرفع والاستبدال لو عامل login، و...`,
            R`...الفولدر فولدره،`,
            R`...والملف أقل من 2 MiB،`,
            R`...والنوع اللي اتبعت png أو jpeg أو webp.`,
            R`المسح لصاحب الفولدر، من غير شروط على [[request.resource]] (بيبقى [[null]] في المسح).`,
            R`آخر [[avatars]].`,
            R`آخر الـ bucket.`,
            R`آخر الـ service.`
          ],
          sol: R`اتشغّل على Storage emulator بـ [[@firebase/rules-unit-testing]] 6.0.0:

بالـ rules بتاعة المثال: [[pass 4]] و [[fail 0]].
بالـ rule الشائع: [[pass 1]] و [[fail 3]] (بوب كتب ومسح في فولدر أليس، وعدّى ٣ ميجا و [[text/html]]).

لو دمجت الرفع والمسح في [[allow write]] بشروط الرفع: [[deleteObject]] من أليس هيترفض، لأن [[request.resource]] = [[null]] في المسح فـ [[request.resource.size]] بيبقى error، والـ error = رفض. فالاختبار الرابع يقع في سطر [[assertSucceeds(deleteObject(...))]].`,
          solCode: R`// storage.test.mjs
import { test, before, after } from "node:test";
import { readFileSync } from "node:fs";
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { ref, uploadBytes, getBytes, deleteObject } from "firebase/storage";

let env;
before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-shop",
    storage: { rules: readFileSync(process.env.RULES ?? "storage.rules", "utf8") },
  });
});
after(() => env.cleanup());

const small = new Uint8Array(1024);
const big = new Uint8Array(3 * 1024 * 1024);
const as = (uid) => (uid ? env.authenticatedContext(uid) : env.unauthenticatedContext()).storage();

test("alice uploads a small png to her own folder", async () => {
  await assertSucceeds(uploadBytes(ref(as("alice"), "avatars/alice/me.png"), small, { contentType: "image/png" }));
});

test("bob cannot write into alice folder", async () => {
  await assertFails(uploadBytes(ref(as("bob"), "avatars/alice/me.png"), small, { contentType: "image/png" }));
});

test("no 3MB file and no html posing as an avatar", async () => {
  await assertFails(uploadBytes(ref(as("alice"), "avatars/alice/big.png"), big, { contentType: "image/png" }));
  await assertFails(uploadBytes(ref(as("alice"), "avatars/alice/x.html"), small, { contentType: "text/html" }));
});

test("visitors cannot read, bob can read, only alice deletes", async () => {
  await assertFails(getBytes(ref(as(null), "avatars/alice/me.png")));
  await assertSucceeds(getBytes(ref(as("bob"), "avatars/alice/me.png")));
  await assertFails(deleteObject(ref(as("bob"), "avatars/alice/me.png")));
  await assertSucceeds(deleteObject(ref(as("alice"), "avatars/alice/me.png")));
});`
        },
        {
          cmd: "Cloud Functions",
          title: "دالة HTTP ودالة بتصحى لما أوردر يتعمل، في الـ emulator، و push بـ FCM",
          desc: R`Cloud Functions كود Node بتكتبه وGoogle بتشغّله لما حاجة تحصل: طلب HTTP ([[onRequest]])، أو document اتعمل في Firestore ([[onDocumentCreated]])، أو ملف اترفع، أو جدول زمني. وده المكان اللي فيه الشغل اللي الـ client مينفعش يعمله: يكتب بالـ Admin SDK (بيعدّي الـ rules)، ويكلّم Stripe بمفتاح سري، ويبعت push بـ FCM.

المثال دالتين: [[hello]] بترد JSON، و [[onOrderCreated]] بتزوّد عدّاد أوردرات اليوزر كل ما أوردر يتعمل. واتشغّلوا الاتنين على الـ emulator بمشروع [[demo-shop]] من غير نت.`,
          example: R`import { onRequest } from "firebase-functions/https";
import { onDocumentCreated } from "firebase-functions/firestore";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
initializeApp();
const db = getFirestore();
export const hello = onRequest({ region: "europe-west1" }, (req, res) => {
  res.json({ msg: "hello " + (req.query.name ?? "world") });
});
export const onOrderCreated = onDocumentCreated({ document: "orders/{orderId}", region: "europe-west1" }, async (event) => {
  const order = event.data.data();
  logger.info("new order", { id: event.params.orderId, total: order.total });
  await db.doc("users/" + order.uid).set({ orderCount: FieldValue.increment(1) }, { merge: true });
});`,
          try: R`اعمل فولدر [[functions]] جنب [[firebase.json]]: جواه [[npm init -y]] و [[npm pkg set type=module main=index.js engines.node=22]] و [[npm i firebase-functions firebase-admin]]، وحط المثال في [[functions/index.js]]، وضيف [[functions]] في [[firebase.json]] (زي درس الـ emulator). شغّل [[npx firebase emulators:start --only functions,firestore]]، وابعت [[curl "http://127.0.0.1:5001/demo-shop/europe-west1/hello?name=mona"]]، واكتب أوردر من سكربت admin ([[FIRESTORE_EMULATOR_HOST=127.0.0.1:8080]]) وبص على [[users/u1]] وعلى لوج الـ emulator. وعدّل الدالة وهي شغالة: هل محتاج تعيد التشغيل؟`,
          flag: "script",
          deep: {
            why: R`فيه حاجات مستحيل تبقى في الـ client: مفتاح Stripe، وتغيير status الأوردر لـ [[paid]] بعد ما الدفع يتأكد، وعدّادات اليوزر ميعدّلهاش بنفسه، و push لجهاز يوزر تاني. من غير Functions كنت هتحتاج سيرفر كامل للحاجات دي. والـ triggers بتخلّي الكود يشتغل لوحده لما الداتا تتغيّر، فالـ client يكتب الأوردر بس وكل اللي بعده (العدّاد، الإيميل، الإشعار) بيحصل على السيرفر.`,
            how: R`[[firebase-functions]] 7.4.0 (اللي شغّلناه): الـ API الأساسي هو «2nd gen» اللي بيشتغل على Cloud Run. المداخل [[firebase-functions/https]] و [[firebase-functions/firestore]] و [[firebase-functions/storage]] و [[firebase-functions/scheduler]]، والقديم (1st gen) بقى في [[firebase-functions/v1]]. وفي tutorials كتير هتلاقي [[firebase-functions/v2/https]]، ودي نفس الحاجة بالمسار القديم.

[[initializeApp()]] من غير config: جوه Functions (والـ emulator) المشروع والصلاحيات معروفين لوحدهم. والـ Admin SDK هنا بيعدّي الـ Security Rules، فهو اللي بيعدّل [[orderCount]] رغم إن الـ rules قافلة الكتابة على اليوزر.

[[event.data]] في [[onDocumentCreated]] هو الـ snapshot بتاع الـ document الجديد، و [[event.params.orderId]] الـ id من المسار. و [[FieldValue.increment(1)]] بيزوّد على السيرفر نفسه، فطلبين في نفس اللحظة مش بيمسحوا بعض (مش «اقرا وزوّد واكتب»). و [[{ merge: true }]] عشان ميمسحش باقي fields اليوزر.

الـ triggers **at-least-once**: نفس الـ event ممكن يوصل مرتين، فالدالة لازم تبقى idempotent لو ده يفرق (مثلًا تحفظ الـ [[event.id]] وتتجاهل المكرر). وأوعى تكتب في نفس المسار اللي بيشغّل الدالة من غير شرط، وإلا تعمل loop. وفيه cold start: أول طلب بعد فترة سكون أبطأ، و [[minInstances]] بيقلله بفلوس.

FCM (Firebase Cloud Messaging) بيبعت push لجهاز أو topic. الـ emulator **مفيهوش FCM**: [[getMessaging().send(...)]] على [[demo-shop]] من غير نت رمى [[app/invalid-credential]]. فكل جزء الـ push في الحل من الـ docs. وفي [[firebase-admin]] 14.5.0 الطريقة الجديدة إنك تبعت بـ [[fid]] (Firebase Installation ID)، و [[token]] (الـ registration token القديم) بقى deprecated بس لسه شغال وبيقبل FIDs في فترة الانتقال. وفي الويب الـ client بيعمل [[register(messaging, { vapidKey })]] وبياخد الـ FID في [[onRegistered]] بدل [[getToken]] القديم. الموبايل: [[firebase_messaging]] في Flutter، و [[@react-native-firebase/messaging]] أو [[expo-notifications]] (درس [[notifications]] في تاب «React Native و Expo»)، و Firebase Messaging في Android (تاب Kotlin).

النشر (من الـ docs، محتاج مشروع حقيقي على Blaze و login، ومعملناهوش): [[npx firebase deploy --only functions]]، ودالة واحدة: [[--only functions:hello]]. والأسرار: [[npx firebase functions:secrets:set STRIPE_KEY]] وفي الكود [[defineSecret("STRIPE_KEY")]] من [[firebase-functions/params]].`,
            when: R`Webhooks (Stripe و Paymob)، وأي كتابة لازم تبقى موثوقة (الدفع، الأرصدة، الأدوار بـ [[setCustomUserClaims]])، والـ side effects بعد كتابة (عدّاد، إيميل، push، تحديث النسخ المكررة من درس [[Firestore data model]])، والشغل المجدول ([[onSchedule]]). ولو الـ API كبير ومحتاج framework كامل، Cloud Run أو سيرفر بتاعك (مع [[verifyIdToken]]) ممكن يبقى أبسط.`,
            mistakes: R`تحط مفتاح سري في كود الـ client بدل Function. وتفتكر الـ trigger بيشتغل مرة واحدة بالظبط فالعدّاد يتزوّد مرتين. و «اقرا القيمة وزوّد عليها واكتب» بدل [[FieldValue.increment]]. وتكتب في نفس الـ document اللي بيشغّل [[onDocumentWritten]] من غير شرط فتعمل loop بيصرف فلوس. وتنسى الـ [[region]] فتطلع في [[us-central1]] بعيد عن القاعدة واليوزرز. وتنسى [[await]] قبل الكتابة فالدالة تخلص قبل ما الكتابة تتم. وتجرّب FCM على الـ emulator وتستغرب: مش موجود فيه.`
          },
          teach: R`## الفكرة: كود بيصحى على حدث، وبيكتب بصلاحيات السيرفر

اللي اتشغّل: [[firebase-functions]] 7.4.0 و [[firebase-admin]] 14.5.0 في [[functions/]] (ملف [[package.json]] فيه [[type: module]] و [[engines.node: 22]])، و [[npx firebase emulators:exec --only functions,firestore "bash fn.sh"]] والسكربت بيعمل [[curl]] وبيكتب أوردر. من غير نت ومن غير login.

---

## ١. الـ imports

~~~js
import { onRequest } from "firebase-functions/https";
import { onDocumentCreated } from "firebase-functions/firestore";
import * as logger from "firebase-functions/logger";
~~~

[[onRequest]] لدالة HTTP، و [[onDocumentCreated]] لدالة بتصحى لما document يتعمل (وفيه أخوات: [[onDocumentUpdated]] و [[onDocumentDeleted]] و [[onDocumentWritten]] للتلاتة). و [[* as logger]] بيجيب كل اللي في الموديول في object اسمه [[logger]]: اللوج بيروح لـ Cloud Logging بـ severity.

~~~js
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
initializeApp();
const db = getFirestore();
~~~

الـ Admin SDK زي درس الـ Auth، بس [[initializeApp()]] **من غير** حاجة: جوه Functions المشروع معروف. والـ [[db]] ده بيعدّي الـ Security Rules.

---

## ٢. دالة HTTP

~~~js
export const hello = onRequest({ region: "europe-west1" }, (req, res) => {
  res.json({ msg: "hello " + (req.query.name ?? "world") });
});
~~~

- [[export const hello]]: اسم الـ export هو اسم الدالة. اللي مش [[export]] مش بيتنشر.
- [[{ region: "europe-west1" }]]: تتشغّل فين (بلجيكا). من غيرها [[us-central1]].
- [[(req, res)]] نفس شكل Express: [[req.query.name]] من [[?name=]] في الـ URL، و [[res.json]] بيرد JSON.

~~~bash
curl "http://127.0.0.1:5001/demo-shop/europe-west1/hello?name=mona"
~~~

الـ URL في الـ emulator: [[<host>:5001/<project>/<region>/<function>]].

~~~text الناتج
{"msg":"hello mona"}
~~~

---

## ٣. دالة Firestore trigger

~~~js
export const onOrderCreated = onDocumentCreated({ document: "orders/{orderId}", region: "europe-west1" }, async (event) => {
~~~

[[document: "orders/{orderId}"]] = أي document جديد في [[orders]]، و [[{orderId}]] wildcard زي الـ rules. والدالة [[async]] لأننا هنستنى كتابة.

~~~js
const order = event.data.data();
logger.info("new order", { id: event.params.orderId, total: order.total });
~~~

[[event.data]] الـ snapshot، و [[.data()]] الـ fields. و [[event.params.orderId]] قيمة الـ wildcard. و [[logger.info]] بياخد رسالة و object بيتسجل structured (JSON).

~~~js
await db.doc("users/" + order.uid).set({ orderCount: FieldValue.increment(1) }, { merge: true });
~~~

| الحتة | معناها |
|---|---|
| [[db.doc("users/" + order.uid)]] | document اليوزر صاحب الأوردر (الـ Admin API بياخد المسار كنص واحد) |
| [[FieldValue.increment(1)]] | زوّد 1 على السيرفر، ولو مش موجود يبدأ من 0 |
| [[{ merge: true }]] | عدّل الـ field ده بس وسيب الباقي |
| [[await]] | لازم: الدالة متخلصش قبل الكتابة |

---

## ٤. التشغيل

~~~text الناتج
✔  functions: Using node@22 from host.
✔  functions: Loaded functions definitions from source: hello, onOrderCreated.
✔  functions[europe-west1-hello]: http function initialized (http://127.0.0.1:5001/demo-shop/europe-west1/hello).
✔  functions[europe-west1-onOrderCreated]: firestore function initialized.
i  functions: Beginning execution of "europe-west1-hello"
{"msg":"hello mona"}
i  functions: Finished "europe-west1-hello" in 11.768708ms
i  functions: Beginning execution of "europe-west1-onOrderCreated"
>  {"id":"5r48igSFE4up1PBJGUjN","total":250,"severity":"INFO","message":"new order"}
i  functions: Finished "europe-west1-onOrderCreated" in 151.273734ms
{ orderCount: 1 }
~~~

- [[Using node@22 from host]]: الـ emulator بيشغّل الدوال بالـ Node اللي على جهازك، فخليه نفس [[engines.node]].
- السكربت كتب [[{ uid: "u1", total: 250 }]] في [[orders]] بالـ Admin SDK، والـ trigger اشتغل لوحده، واللوج طلع JSON فيه [[severity: INFO]].
- السكربت استنى ٤ ثواني وقرا [[users/u1]]: [[{ orderCount: 1 }]]. الـ trigger async، يعني الكتابة الأصلية خلصت قبل ما الدالة تشتغل. والـ client مش بيستنى الدالة.
- وطلع [[MetadataLookupWarning ... ENETUNREACH]] من سكربت الـ admin: بيحاول يسأل metadata server بتاع Google Cloud ومفيش نت. ملوش أي تأثير.

والـ emulator بيراقب الفولدر ([[Watching "/work/functions"]])، فلو عدّلت الملف بيعيد تحميل الدوال من غير ما تقفله.

---

## ٥. push بـ FCM (من الـ docs، مش في الـ emulator)

جربنا [[getMessaging().send({ fid: "fake-fid", notification: {...} })]] على [[demo-shop]]:

~~~text الناتج
app/invalid-credential | Credential implementation provided to initializeApp() via the "credential" property failed to fetch a valid Google OAuth2 access token
~~~

يعني مفيش FCM emulator: الطلب بيحاول يروح Google فعلًا. الكود اللي في الحل مكتوب من الـ docs ومن الـ types بتاعة [[firebase-admin]] 14.5.0 و [[firebase]] 13.1.0. وجربنا منه اللي ينفع يتجرب: دالة [[notifyOrder]] اتحمّلت في الـ emulator، واشتغلت لما اتعمل أوردر ليوزر عنده [[fid]]، ووقعت عند [[send]] بالظبط:

~~~text لوج الـ emulator
i  functions: Beginning execution of "europe-west1-notifyOrder"
⚠  functions: Error: Credential implementation provided to initializeApp() via the "credential" property failed to fetch a valid Google OAuth2 access token ... connect ENETUNREACH 169.254.169.254:80
⚠  Your function was killed because it raised an unhandled error.
~~~

([[169.254.169.254]] هو الـ metadata server اللي بيدّي الصلاحيات جوه Google Cloud، ومش موجود عندنا.) وكود الويب اتعمله build بـ Vite بس مش اتجرّب في متصفح. والجديد فيه:

| القديم (deprecated) | الجديد |
|---|---|
| [[getToken(messaging, { vapidKey })]] في الويب | [[register(messaging, { vapidKey })]] و [[onRegistered]] بيدّيك FID |
| [[send({ token, ... })]] | [[send({ fid, ... })]] |
| [[sendEachForMulticast({ tokens })]] | [[sendEachForMulticast({ fids })]] (لحد 500) |

والويب محتاج ملف service worker اسمه [[firebase-messaging-sw.js]] في جذر الموقع عشان الإشعار يظهر والتاب مقفول، و VAPID key من Console. وتفاصيل الموبايل (الصلاحيات، و APNs على iOS) في تابات Flutter و React Native و Kotlin.

---

## ٦. النشر (من الـ docs، معملناهوش)

~~~bash
npx firebase deploy --only functions
npx firebase deploy --only functions:hello
npx firebase deploy --only firestore:rules,firestore:indexes,storage
~~~

محتاج [[firebase login]] ومشروع حقيقي على خطة Blaze (الـ docs: الـ emulator شغال على أي مشروع، النشر محتاج Blaze). وفي CI بدل login استخدم service account أو GitHub OIDC (درس [[GitHub OIDC]] في التاب ده).

---

## الخلاصة

| | HTTP | Firestore trigger |
|---|---|---|
| import | [[firebase-functions/https]] | [[firebase-functions/firestore]] |
| الدالة | [[onRequest(opts, (req, res) => ...)]] | [[onDocumentCreated({ document }, async (event) => ...)]] |
| الداتا | [[req.query]] و [[req.body]] | [[event.data.data()]] و [[event.params]] |
| في الـ emulator | [[:5001/<project>/<region>/<name>]] | بيصحى لوحده مع Firestore emulator |

> الـ triggers at-least-once: خلّي الدالة تتحمل التكرار، واستخدم [[FieldValue.increment]] مش «اقرا وزوّد». والـ Admin SDK جوه Functions بيعدّي الـ rules، فهو المكان الصح لأي كتابة حساسة.`,
          lines: [
            R`[[onRequest]]: دالة HTTP (2nd gen).`,
            R`[[onDocumentCreated]]: دالة بتصحى لما document يتعمل.`,
            R`[[logger]]: لوج structured بيروح لـ Cloud Logging.`,
            R`Admin SDK: صلاحيات كاملة وبيعدّي الـ rules.`,
            R`Firestore بتاع الـ Admin، و [[FieldValue]] للعمليات على السيرفر زي [[increment]].`,
            R`من غير config: جوه Functions والـ emulator المشروع معروف.`,
            R`القاعدة.`,
            R`دالة HTTP اسمها [[hello]] في بلجيكا، بنفس شكل Express [[(req, res)]].`,
            R`رد JSON، والاسم من [[?name=]] ولو مش موجود [[world]].`,
            R`آخر [[hello]].`,
            R`trigger على أي document جديد في [[orders]]، و [[{orderId}]] wildcard.`,
            R`fields الأوردر الجديد.`,
            R`لوج فيه الـ id من المسار والـ total.`,
            R`زوّد عدّاد أوردرات اليوزر على السيرفر، من غير ما تمسح باقي الـ fields.`,
            R`آخر الدالة.`
          ],
          sol: R`اتشغّل على Functions و Firestore emulators من غير نت:

[[curl]] رجّع [[{"msg":"hello mona"}]]، واللوج: [[Beginning execution of "europe-west1-hello"]] و [[Finished ... in 11.768708ms]].

الأوردر: [[onOrderCreated]] اشتغل لوحده، وطبع [[{"id":"...","total":250,"severity":"INFO","message":"new order"}]]، و [[users/u1]] بقى [[{ orderCount: 1 }]].

التعديل وهو شغال: الـ emulator بيراقب فولدر [[functions]] وبيعيد تحميل الدوال لوحده، فمش محتاج تعيد التشغيل (لو غيّرت [[firebase.json]] نفسه أو سطّبت packages جديدة، أعد التشغيل).

والحل فيه جزء FCM من الـ docs (مش بيشتغل على الـ emulator): دالة بتبعت push لليوزر لما الأوردر يتعمل، وكود الويب اللي بيسجّل الجهاز.`,
          solCode: R`// functions/index.js: push لما الأوردر يتعمل (من الـ docs، FCM مش في الـ emulator)
import { getMessaging } from "firebase-admin/messaging";
export const notifyOrder = onDocumentCreated({ document: "orders/{orderId}", region: "europe-west1" }, async (event) => {
  const order = event.data.data();
  const user = (await db.doc("users/" + order.uid).get()).data();
  if (!user?.fid) return;
  await getMessaging().send({
    fid: user.fid,
    notification: { title: "Order received", body: "Order " + event.params.orderId + " is being prepared" },
    data: { orderId: event.params.orderId },
  });
});

// web/src/push.js: تسجيل الجهاز (محتاج firebase-messaging-sw.js في جذر الموقع)
import { getMessaging, register, onRegistered, onMessage } from "firebase/messaging";
import { app, auth } from "./firebase.js";
const messaging = getMessaging(app);
onRegistered(messaging, async (fid) => {
  await fetch("/api/devices", { method: "POST", headers: { Authorization: "Bearer " + (await auth.currentUser.getIdToken()) }, body: JSON.stringify({ fid }) });
});
await register(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" });
onMessage(messaging, (payload) => console.log("push while open:", payload.notification?.title));`
        }
      ]
    }
]);

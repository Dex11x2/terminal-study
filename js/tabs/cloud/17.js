// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "Firebase: الفكرة والـ Emulator والـ Auth",
      l: 2,
      n: "backend جاهز من Google بتكلّمه من الـ frontend على طول، وبتجرّبه كله على جهازك من غير حساب ولا مشروع حقيقي",
      items: [
        {
          cmd: "Firebase ولا Supabase",
          title: "Firebase بيدّيك إيه، وتختاره إمتى بدل Supabase أو backend بتاعك",
          desc: R`Firebase منصة backend جاهزة من Google: Auth و Firestore (قاعدة documents مش جداول) و Storage للملفات و Cloud Functions و Hosting و FCM للـ push. الـ frontend بيكلّم القاعدة على طول من غير API انت كاتبه، واللي بيحميها هو Security Rules.

المثال ملف [[firebase.js]] في تطبيق Vite: بيعمل [[initializeApp]] بالـ config، ويطلّع [[auth]] و [[db]]، وفي الـ dev بس بيوصّلهم بالـ emulator اللي على جهازك. والـ config ده مش سر: هو بيتنشر جوه الـ JS لكل زوار الموقع.`,
          example: R`import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-shop.firebaseapp.com",
  projectId: "demo-shop",
  storageBucket: "demo-shop.firebasestorage.app",
  appId: "1:000000000000:web:demo",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}`,
          try: R`اعمل مشروع Vite فاضي ([[npm create vite@latest]] ثم [[npm i firebase]])، وحط الملف ده في [[src/firebase.js]]، و [[main.js]] اللي في الحل. شغّل [[npx vite build]] وبص على حجم الـ bundle. بعدين دوّر في [[dist/assets/*.js]] على [[demo-api-key]] وعلى [[127.0.0.1:9099]]: مين لقيته ومين لأ، وليه؟ وآخر حاجة غيّر [[firebase/firestore]] لـ [[firebase/firestore/lite]] في الملفين وابني تاني وقارن الحجم.`,
          flag: "script",
          deep: {
            why: R`Firebase بيوفّر عليك تكتب وتشغّل backend كامل لحاجات متكررة: login، وقاعدة بتتحدّث لايف على كل الأجهزة، ورفع ملفات، و push. ده بيخلّي فرد واحد يطلّع تطبيق موبايل أو ويب شغال في أيام. بس التمن إنك بتلعب بقواعد Google: داتا NoSQL، وفلوس على كل قراية، وصعوبة إنك تخرج منه بعدين. فلازم تعرف تختار قبل ما تبدأ مش بعد سنة.`,
            how: R`الفرق الأساسي بين التلات اختيارات:

• Firebase: الـ client SDK بيكلّم Firestore مباشرة (WebSocket/gRPC)، وكل طلب بيعدّي على Security Rules اللي بتقرر مسموح ولا لأ. الداتا documents جوه collections، ومفيش joins. والـ realtime والـ offline cache على الموبايل والويب جاهزين.
• Supabase: نفس فكرة «الـ frontend بيكلّم القاعدة»، بس القاعدة Postgres حقيقي بـ SQL و joins و foreign keys، والحماية بـ RLS (درس [[supabase-js]] في تاب «SQL و Prisma»، و [[Supabase / Neon]] في التاب ده). وتقدر تشغّله على سيرفرك (self-host).
• backend بتاعك (Express أو Django أو Spring + Postgres): انت اللي بتكتب كل endpoint وكل check، والـ frontend مبيشوفش القاعدة خالص. شغل أكتر، بس تحكم كامل ومفيش vendor lock-in.

الـ [[apiKey]] في الـ config بيعرّف المشروع بس، مش بيدّي صلاحيات (الـ key الحقيقي شكله [[AIzaSy...]]). اللي بيمنع الناس هو Security Rules و App Check، وتقدر كمان تحدد الـ key يشتغل من أنهي domains من Google Cloud Console.

الـ SDK الحالي «modular»: كل function بتعملها import لوحدها ([[getAuth]] و [[getDocs]]...)، فالـ bundler بيشيل اللي مش مستخدم (tree-shaking). الطريقة القديمة [[firebase.firestore()]] (اسمها compat، أو namespaced) لسه موجودة في tutorials كتير، متبدأش بيها.

الخطط: Spark ببلاش بحدود يومية، و Blaze بتدفع على قد استخدامك (pay as you go). ونشر Cloud Functions محتاج Blaze، وكمان Cloud Storage بقى محتاج Blaze للـ buckets من بعد تغييرات سبتمبر ٢٠٢٤ (من الـ docs). الـ emulator بقى شغال ببلاش ومن غير أي خطة.`,
            when: R`اختار Firebase لتطبيق موبايل أو ويب محتاج login و realtime و push بسرعة، والداتا شكلها documents (شات، feed، إشعارات، تطبيق فريق صغير)، وانت أصلًا على Flutter أو Android. اختار Supabase لو داتاك علاقات (أوردرات ومنتجات وفواتير) ومحتاج SQL و reports، أو عايز تقدر تخرج بالـ Postgres بتاعك. واكتب backend بتاعك لما يبقى عندك business logic كتير، أو شغل بين أنظمة، أو فريق باك إند أصلًا.`,
            mistakes: R`إنك تفتكر الـ [[apiKey]] سر وتخبّيه في [[.env]] وتفتكر كده خلاص اتأمنت: هو بيظهر في الـ bundle برضه، والأمان كله في الـ Rules. وإنك تسيب Rules بتاعة «test mode» ([[allow read, write: if true]] أو بتاريخ انتهاء) وتنزل production. وإنك تصمم Firestore كأنه SQL (جدول لكل حاجة و joins في الكود) فالقرايات والفلوس تتضاعف. وإنك تخلط بين الـ client SDK ([[firebase]]) والـ Admin SDK ([[firebase-admin]]): التاني بيعدّي الـ Rules خالص ومكانه السيرفر بس.`
          },
          teach: R`## الفكرة: ملف واحد بيجهّز Firebase لكل التطبيق

الملف ده بيتعمله import من أي مكان في التطبيق، وبيدّيك [[auth]] و [[db]] جاهزين. ومعاه سؤال أهم: تبني على Firebase أصلًا ولا لأ؟ هنفك الكود الأول، وبعدين المقارنة.

اللي اتشغّل: مشروع Vite 8.3.5 بـ [[firebase]] 13.1.0 (الـ JS SDK) في container [[node:22-slim]]، [[npx vite build]] وقسنا الحجم ودوّرنا في الناتج (أكتوبر ٢٠٢٦).

---

## ١. الـ imports: كل حاجة من مكانها

~~~js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
~~~

package واحد اسمه [[firebase]]، بس جواه مداخل منفصلة: [[firebase/app]] (الأساس)، و [[firebase/auth]]، و [[firebase/firestore]]، و [[firebase/storage]]، و [[firebase/messaging]]. وبتعمل import للـ functions اللي هتستخدمها بالاسم بس. ده اسمه **modular SDK**: الـ bundler (Vite هنا) بيشيل أي حاجة مش مستخدمة.

---

## ٢. الـ config

~~~js
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-shop.firebaseapp.com",
  projectId: "demo-shop",
  storageBucket: "demo-shop.firebasestorage.app",
  appId: "1:000000000000:web:demo",
};
~~~

في مشروع حقيقي بتنسخ القيم دي من Firebase Console (Project settings ثم Your apps). هنا قيم وهمية لمشروع [[demo-shop]] (الـ [[demo-]] في الأول ليها معنى، درس [[firebase emulators:start]]).

| الخانة | معناها |
|---|---|
| [[apiKey]] | بيعرّف المشروع للـ APIs بتاعة Google. **مش سر** ومش بيدّي صلاحية |
| [[authDomain]] | الدومين اللي صفحات الـ login بالـ popup أو redirect بتفتح عليه |
| [[projectId]] | اسم المشروع، وهو اللي Firestore بيستخدمه |
| [[storageBucket]] | الـ bucket بتاع الملفات. الجديد بينتهي بـ [[.firebasestorage.app]] والقديم بـ [[.appspot.com]] |
| [[appId]] | رقم التطبيق ده جوه المشروع (المشروع ممكن يبقى فيه ويب و Android و iOS) |

---

## ٣. التلات سطور اللي بيعملوا الشغل

~~~js
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
~~~

[[initializeApp]] بيعمل object واحد للتطبيق فيه الـ config. و [[getAuth(app)]] و [[getFirestore(app)]] بيرجّعوا الخدمة المربوطة بالتطبيق ده. و [[export]] عشان أي ملف تاني يكتب [[import { db } from "./firebase.js"]] ويستخدم نفس النسخة.

---

## ٤. الـ emulator في الـ dev بس

~~~js
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
~~~

[[import.meta.env.DEV]] متغير بيحطه Vite: [[true]] في [[npm run dev]]، و [[false]] في [[vite build]]. ولأنه ثابت وقت البناء، Vite بيشيل الـ [[if]] كلها من الـ production bundle.

[[connectAuthEmulator]] بياخد URL كامل بـ [[http://]]، و [[connectFirestoreEmulator]] بياخد host و port لوحدهم. والبورتات دي الافتراضية للـ emulator ([[9099]] للـ Auth و [[8080]] لـ Firestore). ولازم يتنادوا قبل أول طلب.

---

## ٥. اتأكدنا بالبناء

بنينا بالـ [[main.js]] اللي في الحل (بيسمع لحالة الـ login وبيجيب ١٠ منتجات):

~~~text npx vite build
dist/index.html                  0.07 kB │ gzip:   0.09 kB
dist/assets/index-B0ESmhUF.js  547.24 kB │ gzip: 164.87 kB
~~~

ودوّرنا في الناتج:

~~~bash
grep -c "demo-api-key" dist/assets/*.js
grep -c "127.0.0.1:9099" dist/assets/*.js
~~~

~~~text الناتج
1
0
~~~

- الـ [[apiKey]] **موجود** في الملف اللي بيتبعت للمتصفح. حتى لو حطيته في [[.env]] ([[VITE_FIREBASE_API_KEY]])، Vite بيحط قيمته هنا برضه. يعني أي حد بيفتح DevTools بيشوفه، وده عادي ومقصود.
- عنوان الـ emulator **مش موجود**: الـ [[if (import.meta.env.DEV)]] اتشال كله.

وبعد ما غيّرنا [[firebase/firestore]] لـ [[firebase/firestore/lite]]:

~~~text الناتج
dist/assets/index-CP2_N1zK.js  192.46 kB │ gzip: 60.17 kB
~~~

من ١٦٥ لـ ٦٠ KB بعد الضغط. الـ lite نسخة بتكلّم Firestore بـ REST عادي: مفيهاش [[onSnapshot]] (تحديث لايف) ولا offline cache. لو صفحتك بتقرا بس (blog أو صفحة منتج) ده توفير كبير، ولو محتاج realtime خليك على الكامل.

---

## ٦. Firebase ولا Supabase ولا backend بتاعك؟

| | Firebase | Supabase | backend بتاعك |
|---|---|---|---|
| القاعدة | Firestore: documents و collections (NoSQL) | Postgres: جداول و SQL و joins | اللي تختاره |
| مين بيكلّمها | الـ frontend مباشرة | الـ frontend مباشرة (عن طريق PostgREST) | السيرفر بس |
| الحماية | Security Rules | RLS في Postgres | الكود بتاعك |
| الفلوس | على كل قراية وكتابة | على حجم القاعدة والـ compute | السيرفر والقاعدة |
| realtime و offline | جاهز وقوي، خصوصًا على الموبايل | Realtime موجود، offline أضعف | تبنيه بإيدك |
| تخرج منه | صعب: صيغة وقواعد خاصة بـ Google | سهل: [[pg_dump]] وخلاص | انت أصلًا برّه |
| تشغّله على سيرفرك | لأ (الـ emulator للتجربة بس) | أيوه (self-host) | أيوه |

> قاعدة سريعة: داتا شكلها documents ومستخدمين موبايل ومحتاج push وrealtime = Firebase. داتا علاقات و reports = Supabase أو Postgres. منطق كتير أو أنظمة بتكلّم بعض = backend بتاعك. وتقدر تخلط: Firebase Auth و FCM مع backend بتاعك (درس [[Firebase Auth + verifyIdToken]]).

---

## الخلاصة

| الحاجة | الصح |
|---|---|
| الـ SDK | modular: [[import { getDocs } from "firebase/firestore"]] |
| الـ config | public، الأمان في الـ Rules |
| الـ emulator | [[connect*Emulator]] جوه [[if (import.meta.env.DEV)]] |
| قراية بس من غير realtime | [[firebase/firestore/lite]] (أصغر بحوالي ٣ مرات هنا) |
| [[firebase-admin]] | على السيرفر بس، بيعدّي الـ Rules |`,
          lines: [
            R`[[initializeApp]] من [[firebase/app]]: الأساس اللي كل الخدمات بتتربط بيه.`,
            R`[[getAuth]] للـ login، و [[connectAuthEmulator]] عشان نوصّله بالـ emulator.`,
            R`[[getFirestore]] للقاعدة، و [[connectFirestoreEmulator]] للـ emulator بتاعها.`,
            R`بداية الـ config اللي بتنسخه من Firebase Console.`,
            R`[[apiKey]]: بيعرّف المشروع، مش سر.`,
            R`[[authDomain]]: الدومين بتاع صفحات الـ login بالـ popup أو redirect.`,
            R`[[projectId]]: اسم المشروع. [[demo-]] في الأول = مشروع وهمي للـ emulator بس.`,
            R`[[storageBucket]]: الـ bucket بتاع الملفات (الجديد بينتهي بـ [[firebasestorage.app]]).`,
            R`[[appId]]: رقم تطبيق الويب ده جوه المشروع.`,
            R`آخر الـ config.`,
            R`اعمل التطبيق مرة واحدة وطلّعه للملفات التانية.`,
            R`خدمة الـ Auth مربوطة بالتطبيق.`,
            R`خدمة Firestore مربوطة بالتطبيق.`,
            R`[[import.meta.env.DEV]] من Vite: [[true]] في الـ dev بس، فالـ block كله بيتشال من الـ build.`,
            R`وصّل الـ Auth بالـ emulator على بورت 9099 (URL كامل).`,
            R`وصّل Firestore بالـ emulator على 8080 (host و port لوحدهم).`,
            R`آخر الـ [[if]].`
          ],
          sol: R`اتشغّل في container [[node:22-slim]] بـ Vite 8.3.5 و [[firebase]] 13.1.0:

[[npx vite build]] طلّع ملف JS واحد [[547.24 kB]] (و [[164.87 kB]] بعد gzip)، ومعاه تحذير إن الـ chunk أكبر من 500 kB. ده طبيعي مع Auth و Firestore الكامل.

[[grep -c "demo-api-key"]] طلّع [[1]]: الـ apiKey جوه الـ bundle، وأي زائر يقدر يقراه. عشان كده مش سر، والحماية في Security Rules.
[[grep -c "127.0.0.1:9099"]] طلّع [[0]]: Vite شال كود الـ emulator لأن [[import.meta.env.DEV]] بقى [[false]] في الـ build.

وبـ [[firebase/firestore/lite]]: [[192.46 kB]] (و [[60.17 kB]] بعد gzip)، يعني تقريبًا تلت الحجم. بس [[onSnapshot]] والـ offline cache مش موجودين فيه.`,
          solCode: R`// src/main.js
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { auth, db } from "./firebase.js";

onAuthStateChanged(auth, (user) => console.log("user:", user?.uid ?? null));
const snap = await getDocs(query(collection(db, "products"), limit(10)));
document.body.textContent = snap.size + " products";`
        },
        {
          cmd: "firebase emulators:start",
          title: "Local Emulator Suite: Firebase كله على جهازك بمشروع اسمه demo-",
          desc: R`الـ Emulator Suite بيشغّل نسخ محلية من Auth و Firestore و Storage و Functions على جهازك، ومعاهم واجهة على [[localhost:4000]]. ولو الـ project ID بيبدأ بـ [[demo-]]، مش محتاج [[firebase login]] ولا مشروع حقيقي ولا إنترنت (بعد أول تحميل)، وأي طلب لخدمة مش متشغّلة محليًا بيفشل بدل ما يلمس production.

[[emulators:start]] للشغل اليومي، و [[emulators:exec]] للاختبارات و CI: بيشغّل الـ emulators، ينفّذ الأمر، ويقفلهم.`,
          example: R`# مرة واحدة في فولدر المشروع (محتاج Node 20+ و Java 21+):
npm i -D firebase-tools
java -version
# شغّل الـ emulators بمشروع وهمي من غير login:
npx firebase emulators:start --project demo-shop --only auth,firestore,storage
# شغّل الاختبارات، والـ emulators بيقفلوا لوحدهم بعدها:
npx firebase emulators:exec --project demo-shop --only firestore "node --test"
# احفظ الداتا لما تقفل بـ Ctrl+C، ورجّعها المرة الجاية:
npx firebase emulators:start --project demo-shop --import ./seed --export-on-exit
# امسح كل documents الـ Firestore emulator وهو شغال:
curl -X DELETE "http://127.0.0.1:8080/emulator/v1/projects/demo-shop/databases/(default)/documents"`,
          try: R`في فولدر فاضي: [[npm init -y]] ثم [[npm i -D firebase-tools]]، واعمل [[firebase.json]] و [[.firebaserc]] و [[firestore.rules]] اللي في الحل (من غير [[firebase init]]، عشان ده بيطلب login). شغّل [[npx firebase emulators:start]] مرة والنت شغال (هينزّل ملفات الـ emulator)، واقفله، واقفل النت وشغّله تاني. هل اشتغل؟ افتح [[http://127.0.0.1:4000]]. وبعدين جرّب [[--project my-real-app]] بدل demo وبص على أول سطرين في الناتج: إيه اللي اتغيّر؟`,
          deep: {
            why: R`من غير emulator كنت هتجرّب على مشروع حقيقي: بتدفع على كل قراية في الاختبارات، وتوسّخ داتا حقيقية، وممكن تمسح حاجة في production بالغلط. والـ Security Rules مستحيل تختبرها كويس من غير ما تضرب طلبات كتير. الـ emulator بيخلّي كل ده محلي وببلاش، وبيشتغل في CI.`,
            how: R`[[firebase-tools]] هو الـ CLI بتاع Firebase، وبنسطّبه كـ devDependency في المشروع (مش [[-g]]) عشان كل الفريق و CI يستخدموا نفس النسخة، وبنشغّله بـ [[npx firebase]].

الـ emulators نوعين: Auth و Functions مكتوبين بـ Node، و Firestore و Storage (محرّك الـ rules بتاعه) و Realtime Database ملفات Java ([[.jar]]). عشان كده لازم Java. و [[firebase-tools]] 15.34.1 بيرفض يشغّلهم لو Java أقدم من 21 (مكتوب في الكود نفسه: [[MIN_SUPPORTED_JAVA_MAJOR_VERSION = 21]])، رغم إن صفحات قديمة في الـ docs لسه بتقول 11. أول مرة بينزّل الـ jars في [[~/.cache/firebase/emulators]]: عندنا كانوا 131MB لـ Firestore و 51MB لمحرّك الـ Storage rules و 14MB للواجهة.

[[demo-]]: الـ docs بتقول إن مشروع demo «ملوش config حقيقي ولا resources حقيقية»، والتطبيق بيكلّم الـ emulators بس، وأي خدمة مش متشغّلة محليًا الطلب ليها بيفشل. وده بيحميك: مستحيل تكتب في production بالغلط. ولو مكتبتش [[--project]] ومفيش [[.firebaserc]]، الـ CLI بيستخدم [[demo-no-project]].

[[firebase.json]] بيقول ملفات الـ rules فين، والبورتات، والـ functions فين. الافتراضي: Auth 9099، و Firestore 8080، و Storage 9199، و Functions 5001، والواجهة 4000، والـ hub 4400. والـ hub ده endpoint بيقول مين شغال فين، و [[@firebase/rules-unit-testing]] بيسأله.

الداتا بتتمسح لما تقفل. [[--export-on-exit]] بيكتبها في فولدر لما تقفل بـ Ctrl+C (أو SIGTERM)، و [[--import]] بيحمّلها أول ما يبدأ. ولو كتبت [[--export-on-exit]] من غير فولدر، بيكتب في نفس فولدر الـ import.`,
            when: R`من أول يوم في أي مشروع Firebase: كل التطوير على الـ emulator، والـ Rules بتتختبر عليه في CI، والمشروع الحقيقي للـ staging والـ production بس. و [[emulators:exec]] في GitHub Actions بيشغّل الاختبارات من غير أي secret.`,
            mistakes: R`إنك تستخدم الـ project ID الحقيقي مع الـ emulator: لو نسيت تشغّل emulator واحد (Storage مثلًا)، الكود بيكلّم الـ Storage الحقيقي. وإنك تشغّل [[firebase init]] وتفتكر إنه لازم: هو بيطلب login، وانت تقدر تكتب [[firebase.json]] بإيدك. وتسطّب [[firebase-tools]] بـ [[-g]] فكل جهاز عليه نسخة مختلفة. وتفتكر إن الـ emulator بيتصرف زي production في كل حاجة: Firestore emulator مش بيطلب composite indexes، ومش بيطبّق كل الـ limits ولا كل سلوك الـ transactions (من الـ docs). وتنسى إن الداتا بتتمسح لما تقفله من غير [[--export-on-exit]].`
          },
          teach: R`## الفكرة: Firebase كامل على جهازك، باسم مشروع وهمي

المثال فيه ٦ أوامر: سطّب الـ CLI، اتأكد من Java، شغّل الـ emulators، شغّل اختبارات، احفظ الداتا، وامسحها.

اللي اتشغّل: container من [[node:22-slim]] (Node 22.23.3) ومعاه Temurin Java 21.0.13، و [[firebase-tools]] 15.34.1. ونزّلنا ملفات الـ emulator مرة، وبعدين **فصلنا الكونتينر عن الشبكة** ([[docker network disconnect]]) وشغّلنا كل حاجة من غير نت ومن غير login (أكتوبر ٢٠٢٦).

---

## ١. التسطيب: [[npm i -D firebase-tools]]

[[-D]] يعني devDependency: أداة للتطوير مش جزء من التطبيق اللي بيتنشر. والنسخة بتتكتب في [[package.json]]، فكل الفريق و CI بيستخدموا نفسها. والتشغيل بـ [[npx firebase]]، و [[npx]] بيدوّر على الأمر في [[node_modules/.bin]] بتاع المشروع.

~~~bash
npx firebase --version
~~~

~~~text الناتج
15.34.1
~~~

---

## ٢. [[java -version]]

~~~text الناتج
openjdk version "21.0.13" 2026-10-20 LTS
OpenJDK Runtime Environment Temurin-21.0.13+9 (build 21.0.13+9-LTS)
~~~

لازم 21 أو أعلى. ولو أقل، الـ CLI بيوقف بالرسالة دي (منسوخة من الكود بتاعه):

~~~text
firebase-tools no longer supports Java version before 21. Please install a JDK at version 21 or above to get a compatible runtime.
~~~

على ويندوز بتسطّب JDK 21 (مثلًا Eclipse Temurin من adoptium.net) أو تشغّل كل ده جوه WSL أو Docker زي ما عملنا هنا.

---

## ٣. الملفات اللي الـ CLI بيقراها

مش محتاج [[firebase init]] (بيطلب login). اكتبهم بإيدك:

~~~json firebase.json
{
  "firestore": { "rules": "firestore.rules", "indexes": "firestore.indexes.json" },
  "storage": { "rules": "storage.rules" },
  "functions": [{ "source": "functions", "codebase": "default" }],
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "storage": { "port": 9199 },
    "functions": { "port": 5001 },
    "ui": { "enabled": true, "port": 4000 },
    "singleProjectMode": true
  }
}
~~~

| الخانة | معناها |
|---|---|
| [[firestore.rules]] | ملف الـ Security Rules اللي الـ emulator بيحمّله (درس [[Firestore Security Rules]]) |
| [[functions.source]] | فولدر الـ Cloud Functions (درس [[Cloud Functions]]) |
| [[emulators.*.port]] | البورتات. اللي مكتوبة هنا هي الافتراضية أصلًا، كتبناها عشان تبقى واضحة |
| [[singleProjectMode]] | يرفض أي طلب لـ project ID تاني، عشان متغلطش وتكلّم مشروعين |

و [[.firebaserc]] فيه المشروع الافتراضي، عشان متكتبش [[--project]] كل مرة:

~~~json .firebaserc
{ "projects": { "default": "demo-shop" } }
~~~

---

## ٤. [[emulators:start]]

~~~bash
npx firebase emulators:start --project demo-shop --only auth,firestore,storage
~~~

| الحتة | معناها |
|---|---|
| [[emulators:start]] | شغّل الـ emulators وفضل شغال لحد Ctrl+C |
| [[--project demo-shop]] | الـ project ID. [[demo-]] في الأول = مشروع وهمي |
| [[--only auth,firestore,storage]] | شغّل دول بس (من غيرها بيشغّل كل اللي في [[firebase.json]]) |

أول مرة بينزّل الـ jars:

~~~text الناتج (أول مرة، والنت شغال)
i  emulators: Starting emulators: auth, firestore, storage
i  emulators: Detected demo project ID "demo-shop", emulated services will use a demo configuration and attempts to access non-emulated services for this project will fail.
i  firestore: downloading cloud-firestore-emulator-v1.22.0.jar...
~~~

التحميل خد عندنا أكتر من دقيقتين. ولو عايز تنزّلهم من قبل (مثلًا في Dockerfile)، فيه [[npx firebase setup:emulators:firestore]] و [[setup:emulators:storage]] و [[setup:emulators:ui]].

وبعد ما فصلنا الشبكة ([[curl https://firebase.google.com]] طلّع [[Could not resolve host]]):

~~~text الناتج (من غير نت ومن غير login)
i  emulators: Detected demo project ID "demo-shop", emulated services will use a demo configuration and attempts to access non-emulated services for this project will fail.
✔  firestore: Firestore Emulator was started in standard edition.
┌─────────────────────────────────────────────────────────────┐
│ ✔  All emulators ready! It is now safe to connect your app. │
│ i  View Emulator UI at http://127.0.0.1:4000/               │
└─────────────────────────────────────────────────────────────┘
│ Authentication │ 127.0.0.1:9099 │ http://127.0.0.1:4000/auth      │
│ Firestore      │ 127.0.0.1:8080 │ http://127.0.0.1:4000/firestore │
│ Storage        │ 127.0.0.1:9199 │ http://127.0.0.1:4000/storage   │
  Emulator Hub host: 127.0.0.1 port: 4400
~~~

- سطر [[Detected demo project ID]] هو التأكيد: أي حاجة مش متشغّلة هنا هتفشل، مش هتروح Google.
- [[standard edition]]: Firestore بقى ليه نسختين (Standard و Enterprise)، والـ emulator بيشغّل Standard افتراضيًا.
- واتأكدنا إن مفيش login: ملف [[~/.config/configstore/firebase-tools.json]] كان [[{}]] (فاضي).

ولما شغّلنا Functions كمان طلع تحذير [[You are not currently authenticated so some features may not work correctly]]، وكل حاجة اشتغلت عادي. ده مجرد تنبيه.

### ولو الـ project ID مش demo؟

~~~bash
npx firebase emulators:exec --project my-real-app --only firestore "echo ok"
~~~

سطر [[Detected demo project ID]] **اختفى**. الـ emulator لسه شغال، بس الكود بقى عنده project ID ممكن يكون حقيقي، فلو خدمة مش متشغّلة محليًا والجهاز عليه credentials، الطلب يروح production. ومن غير [[--project]] ومن غير [[.firebaserc]]، الـ CLI كتب [[Detected demo project ID "demo-no-project"]].

---

## ٥. [[emulators:exec]]: للاختبارات و CI

~~~bash
npx firebase emulators:exec --project demo-shop --only firestore "node --test"
~~~

بيشغّل الـ emulators، يستنى لحد ما يجهزوا، ينفّذ الأمر اللي بين علامتين التنصيص، ويقفلهم. وبيحط متغيرات بيئة زي [[FIRESTORE_EMULATOR_HOST=127.0.0.1:8080]] للأمر، فالـ SDKs بتلاقي الـ emulator لوحدها. وكود الخروج بتاعه هو كود خروج الأمر، يعني لو اختبار فشل الـ CI بيقع:

~~~text الناتج (آخره لما الاختبارات فشلت)
⚠  Script exited unsuccessfully (code 1)
Error: Script "node --test --test-reporter=spec" exited with code 1
~~~

---

## ٦. احفظ الداتا: [[--import]] و [[--export-on-exit]]

~~~bash
npx firebase emulators:start --project demo-shop --import ./seed --export-on-exit
~~~

شغّلناه والفولدر [[seed]] مش موجود (اشتغل عادي)، وكتبنا ٥ أوردرات، وقفلناه بـ Ctrl+C (SIGINT):

~~~text الناتج
i  Automatically exporting data using --export-on-exit "./seed" please wait for the export to finish...
✔  emulators: Export complete.
~~~

الفولدر بقى فيه [[firebase-export-metadata.json]] و [[firestore_export]] (ولو Auth شغال، [[auth_export/accounts.json]] فيه اليوزرز). والمرة الجاية [[--import]] بيرجّعهم: سكربت بيعدّ الأوردرات طلّع [[orders after import: 5]]. ولو شغّلت سكربت الإضافة تاني فوقهم بقوا ١٠، يعني الـ seed بيتراكم، فلو عايز بداية نضيفة امسح الفولدر.

---

## ٧. امسح من غير ما تقفل

~~~bash
curl -X DELETE "http://127.0.0.1:8080/emulator/v1/projects/demo-shop/databases/(default)/documents"
curl -X DELETE "http://127.0.0.1:9099/emulator/v1/projects/demo-shop/accounts"
~~~

الأول بيمسح كل documents الـ Firestore، والتاني كل يوزرز الـ Auth. الاتنين رجّعوا [[200]]، وسكربت العد بعدها طلّع [[0]]. ودول endpoints بتاعة الـ emulator بس ([[/emulator/v1/...]])، مش موجودين في production. و [[(default)]] اسم القاعدة الافتراضية في المشروع.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| تشتغل يوميًا | [[npx firebase emulators:start]] |
| تشغّل اختبارات أو CI | [[npx firebase emulators:exec "node --test"]] |
| الداتا تفضل بين المرات | [[--import ./seed --export-on-exit]] |
| بداية نضيفة وهو شغال | [[curl -X DELETE .../documents]] و [[.../accounts]] |
| تحمي production | project ID بيبدأ بـ [[demo-]] |

> الـ emulator مش production: مش بيطلب composite indexes، ومش بيطبّق كل الـ limits. الـ Rules والـ queries بتتختبر هنا، والـ indexes بتتأكد منها على مشروع staging حقيقي.`,
          lines: [
            R`سطّب الـ CLI جوه المشروع كـ devDependency، وبتشغّله بـ [[npx firebase]].`,
            R`اتأكد إن Java 21 أو أعلى: Firestore و Storage emulators ملفات Java.`,
            R`شغّل Auth و Firestore و Storage محليًا بمشروع [[demo-shop]]: من غير login، والواجهة على 4000.`,
            R`شغّل الـ emulators، نفّذ [[node --test]]، واقفلهم. كود الخروج = كود خروج الاختبارات.`,
            R`حمّل الداتا من [[./seed]] لو موجودة، واكتبها فيه لما تقفل بـ Ctrl+C.`,
            R`endpoint بتاع الـ emulator بس: بيمسح كل documents القاعدة [[(default)]] وهو شغال.`
          ],
          sol: R`اتشغّل في [[node:22-slim]] + Java 21.0.13 و [[firebase-tools]] 15.34.1:

أول مرة نزّل [[cloud-firestore-emulator-v1.22.0.jar]] (131MB) و [[cloud-storage-rules-runtime-v1.1.3.jar]] (51MB) والواجهة [[ui-v1.15.0]] (14MB) في [[~/.cache/firebase/emulators]].

من غير نت: اشتغل عادي وطلّع [[All emulators ready!]] وجدول البورتات (Auth 9099، Firestore 8080، Storage 9199، الواجهة 4000، الـ hub 4400). مفيش login: [[~/.config/configstore/firebase-tools.json]] فيه [[{}]] بس.

بـ [[--project my-real-app]]: سطر [[Detected demo project ID]] مبيظهرش، وبيظهر بداله في الأول [[You are not currently authenticated so some features may not work correctly]]. الـ emulator شغال برضه، بس الحماية اللي بتمنع الطلبات توصل لـ production مش موجودة. خليك على [[demo-]].`,
          solCode: R`// firebase.json
{
  "firestore": { "rules": "firestore.rules", "indexes": "firestore.indexes.json" },
  "storage": { "rules": "storage.rules" },
  "emulators": {
    "auth": { "port": 9099 },
    "firestore": { "port": 8080 },
    "storage": { "port": 9199 },
    "ui": { "enabled": true, "port": 4000 },
    "singleProjectMode": true
  }
}
// .firebaserc
{ "projects": { "default": "demo-shop" } }
// firestore.rules (مفتوح للتجربة على الـ emulator بس، درس Security Rules بيقفله)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`
        },
        {
          cmd: "Firebase Auth + verifyIdToken",
          title: "تسجيل بإيميل وباسورد، والسيرفر بتاعك يتأكد من الـ ID token بـ firebase-admin",
          desc: R`Firebase Auth بيعمل التسجيل والدخول ويدّي اليوزر **ID token**: JWT عمره ساعة، والـ SDK بيجدده لوحده. الـ frontend بيبعته في [[Authorization: Bearer ...]]، والسيرفر بتاعك بيتأكد منه بـ [[getAuth().verifyIdToken(token)]] من [[firebase-admin]] ويعرف مين اليوزر ([[uid]]).

كده تقدر تستخدم Firebase Auth لوحده مع API انت كاتبه، من غير ما تكتب signup و reset password و login بـ Google بإيدك.`,
          example: R`// client.mjs: المتصفح أو Node بالـ firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(initializeApp({ apiKey: "demo-api-key", projectId: "demo-shop" }));
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
await createUserWithEmailAndPassword(auth, "mona@example.com", "secret123");
const { user } = await signInWithEmailAndPassword(auth, "mona@example.com", "secret123");
const token = await user.getIdToken();
const res = await fetch("http://127.0.0.1:3000/api/me", { headers: { Authorization: "Bearer " + token } });
console.log(res.status, await res.json());

// server.mjs: شغّله بـ FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 node server.mjs
import http from "node:http";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
initializeApp({ projectId: "demo-shop" });
http.createServer(async (req, res) => {
  const token = (req.headers.authorization ?? "").replace(/^Bearer /, "");
  try {
    const decoded = await getAuth().verifyIdToken(token);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ uid: decoded.uid, email: decoded.email, provider: decoded.firebase.sign_in_provider }));
  } catch (e) {
    res.writeHead(401, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: e.code }));
  }
}).listen(3000);`,
          try: R`شغّل [[npx firebase emulators:start --only auth]]، وفي ترمنال تاني السيرفر بالمتغير، وفي تالت الـ client. بعدين: (١) فك الـ token بإيدك ([[token.split(".")]] و [[Buffer.from(part, "base64url")]]) وشوف الـ header والـ claims. (٢) ادخل بباسورد غلط وشوف الـ error code. (٣) من سكربت admin اعمل [[setCustomUserClaims(uid, { role: "admin" })]]، واطبع [[role]] من الـ token القديم ومن [[getIdToken(true)]].`,
          flag: "script",
          deep: {
            why: R`تسجيل الدخول الصح شغل كتير: تخزين الباسورد بـ hash، و reset بالإيميل، و verify، و login بـ Google و Apple، وحماية من التخمين. Firebase Auth بيعمل ده كله، وبيدّيك token موقّع من Google تقدر تثق فيه في أي سيرفر. فحتى لو الـ backend بتاعك Express أو Spring، ممكن تسيب الـ login لـ Firebase.`,
            how: R`الـ ID token ده JWT: header و payload و signature مفصولين بنقط (شرح الـ JWT في درس [[jwt.sign و jwt.verify]] في تاب «API»). في production موقّع بـ RS256 بمفاتيح Google العامة، و [[verifyIdToken]] بينزّلهم (وبيعملهم cache) وبيتأكد من التوقيع، وإن [[aud]] هو الـ project ID بتاعك، و [[iss]] هو [[https://securetoken.google.com/<project>]]، وإنه مخلصش ([[exp]]). عمر الـ token ساعة، والـ SDK في الـ client بيجدده بالـ refresh token لوحده، فدايمًا اطلب [[await user.getIdToken()]] قبل كل طلب ومتخزّنهوش.

[[firebase-admin]] بيتشغّل على السيرفر بس. لما [[FIREBASE_AUTH_EMULATOR_HOST]] يبقى موجود، بيقبل tokens الـ emulator (اللي مش موقّعة: [[alg: none]]) ومبيكلّمش Google. وفي production بيحتاج credentials: على Cloud Run و Cloud Functions بيلاقيها لوحده، وبرّه Google بتدّيله service account (أو Workload Identity Federation) عن طريق [[GOOGLE_APPLICATION_CREDENTIALS]]. والتأكد من التوقيع نفسه مش محتاج صلاحيات، محتاج [[projectId]] صح بس.

الأدوار: [[setCustomUserClaims(uid, { role: "admin" })]] من الـ admin بيحط claim جوه الـ tokens الجاية (مش الحالي)، فالـ client محتاج [[getIdToken(true)]] عشان ياخد token جديد. والـ Rules بتقراها بـ [[request.auth.token.role]].

الإلغاء: [[revokeRefreshTokens(uid)]] بيمنع tokens جديدة، بس الـ ID token الحالي فاضله لحد ساعة. لو محتاج تقفل فورًا (يوزر اتسرق أو اتمسح)، [[verifyIdToken(token, true)]] بيسأل Auth كل مرة (طلب زيادة). وفي الـ emulator الـ admin SDK بيعمل الـ check ده دايمًا (من الكود بتاعه: [[if (checkRevoked || isEmulator)]])، فمتستغربش لو التصرف مختلف عن production.`,
            when: R`أي تطبيق Firebase (Firestore و Storage بيعرفوا اليوزر لوحدهم من الـ token). ولو عندك API بتاعك: middleware بيعمل [[verifyIdToken]] على كل طلب محمي. ولو تطبيق ويب server-rendered (Next.js مثلًا) ومحتاج cookie بدل header، فيه [[createSessionCookie]] و [[verifySessionCookie]] في نفس الـ admin SDK.`,
            mistakes: R`إنك تفك الـ token في السيرفر من غير ما تتأكد من التوقيع ([[jwt.decode]] بدل [[verifyIdToken]])، فأي حد يكتب token بإيده. وإنك تحفظ الـ token في [[localStorage]] وتستخدمه بعد ساعة فياخد 401 (اطلب [[getIdToken()]] كل مرة). وإنك تثق في [[uid]] جاي في الـ body بدل اللي في الـ token. وإنك تشغّل السيرفر في production والمتغير [[FIREBASE_AUTH_EMULATOR_HOST]] لسه موجود: ساعتها أي token مزيّف بـ [[alg: none]] بيعدّي! وإنك تفتكر إن رسالة [[auth/wrong-password]] اللي بتشوفها في الـ emulator هي اللي هتشوفها في production: المشاريع الجديدة فيها email enumeration protection افتراضيًا، فالغلط بيرجع [[auth/invalid-credential]] من غير ما يقول الإيميل موجود ولا لأ (من الـ docs).`
          },
          teach: R`## الفكرة: الـ client بياخد token، والسيرفر بيتأكد منه

المثال ملفين: [[client.mjs]] بيسجّل يوزر ويدخل وياخد ID token ويبعته، و [[server.mjs]] سيرفر HTTP صغير بيتأكد من الـ token بـ [[firebase-admin]] ويرد بمين اليوزر.

اللي اتشغّل: [[npx firebase emulators:exec --only auth "bash run-auth.sh"]] والسكربت بيشغّل السيرفر في الخلفية وبعده الـ client، بـ [[firebase]] 13.1.0 و [[firebase-admin]] 14.5.0 على Node 22.23.3، من غير نت. والـ client بيشتغل بنفس الكود في المتصفح (من غير [[console.log]] طبعًا).

---

## ١. الـ client: التجهيز

~~~js
const auth = getAuth(initializeApp({ apiKey: "demo-api-key", projectId: "demo-shop" }));
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
~~~

نفس اللي في درس [[Firebase ولا Supabase]] بس في سطر واحد. و [[apiKey]] لازم يبقى موجود حتى مع الـ emulator: من غيره [[getAuth]] رمى [[auth/invalid-api-key]] (جربناها). مع [[demo-]] أي نص بيعدّي. و [[disableWarnings: true]] بيقفل الشريط اللي الـ SDK بيحطه في الصفحة يقول «انت على الـ emulator».

---

## ٢. التسجيل والدخول

~~~js
await createUserWithEmailAndPassword(auth, "mona@example.com", "secret123");
const { user } = await signInWithEmailAndPassword(auth, "mona@example.com", "secret123");
~~~

- [[createUserWithEmailAndPassword]] بيعمل اليوزر **وبيدخّله** كمان. سطر الدخول اللي بعده موجود عشان تشوف الاتنين. الباسورد لازم ٦ حروف على الأقل وإلا [[auth/weak-password]].
- الاتنين بيرجّعوا [[UserCredential]]، و [[{ user }]] بتطلّع منه الخانة [[user]] (اسمها destructuring، تاب JavaScript).

---

## ٣. الـ token: [[user.getIdToken()]]

~~~js
const token = await user.getIdToken();
~~~

بيرجّع ID token صالح: لو الحالي قرّب يخلص بيجدده الأول. فكّيناه (٣ حتت مفصولة بـ [[.]]، وكل حتة base64url):

~~~text الـ header والـ payload من الـ emulator
{ alg: 'none', typ: 'JWT' }
{
  email: 'mona@example.com',
  email_verified: false,
  auth_time: 1793147526,
  user_id: 'ZxFbjigxI9n6uSzmFbnPACBRnOvk',
  firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
  iat: 1793147526,
  exp: 1793151126,
  aud: 'demo-shop',
  iss: 'https://securetoken.google.com/demo-shop',
  sub: 'ZxFbjigxI9n6uSzmFbnPACBRnOvk'
}
~~~

| الـ claim | معناه |
|---|---|
| [[alg: 'none']] | الـ emulator **مش بيوقّع**. في production بيبقى [[RS256]] ومعاه [[kid]] (رقم المفتاح) |
| [[sub]] و [[user_id]] | الـ uid، وهو اللي هتربط بيه داتا اليوزر |
| [[aud]] | المشروع اللي الـ token ليه. السيرفر بيرفض أي token لمشروع تاني |
| [[iss]] | مين أصدره |
| [[iat]] و [[exp]] | وقت الإصدار والانتهاء بالثواني من ١٩٧٠. الفرق [[3600]] = ساعة |
| [[auth_time]] | إمتى اليوزر دخل فعلًا (مش إمتى الـ token اتجدد) |
| [[sign_in_provider]] | دخل بإيه: [[password]] أو [[google.com]] أو غيره |

---

## ٤. الطلب للسيرفر

~~~js
const res = await fetch("http://127.0.0.1:3000/api/me", { headers: { Authorization: "Bearer " + token } });
~~~

الشكل المعتاد: header اسمه [[Authorization]] وقيمته [[Bearer]] ومسافة والـ token.

---

## ٥. السيرفر: [[firebase-admin]]

~~~js
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
initializeApp({ projectId: "demo-shop" });
~~~

نفس أسامي الـ client بس من package تاني تمامًا: [[firebase-admin]] بيشتغل بصلاحيات كاملة (بيعدّي الـ Rules)، فمكانه السيرفر بس. و [[projectId]] لازم عشان يعرف يتأكد من [[aud]].

~~~js
const token = (req.headers.authorization ?? "").replace(/^Bearer /, "");
~~~

[[req.headers.authorization]] (Node بيخلّي أسامي الـ headers small letters). و [[?? ""]] لو مفيش header خالص نشتغل على نص فاضي بدل [[undefined]]. و [[/^Bearer /]] regex معناه «كلمة Bearer ومسافة في أول النص»، و [[replace]] بيشيلها فيفضل الـ token.

~~~js
const decoded = await getAuth().verifyIdToken(token);
~~~

ده السطر المهم: لو الـ token سليم بيرجّع الـ claims اللي فوق ومعاها [[decoded.uid]]، ولو لأ بيرمي error فيروح للـ [[catch]] ونرد [[401]].

---

## ٦. الناتج

~~~text الـ client
200 {
  uid: '7lwI9SVDPO7A2YKOltwbKP72fpNj',
  email: 'mona@example.com',
  provider: 'password'
}
~~~

ومن [[curl]] بـ token غلط ومن غير token خالص:

~~~text الناتج
{"error":"auth/argument-error"}
{"error":"auth/argument-error"}
~~~

وبرّه الـ emulator (من غير [[FIREBASE_AUTH_EMULATOR_HOST]])، الـ admin رفض token الـ emulator نفسه:

~~~text الناتج
auth/argument-error Firebase ID token has no "kid" claim.
~~~

وده الصح: من غير المتغير، الـ admin بيطلب توقيع حقيقي من Google. **والعكس خطر**: لو المتغير فضل موجود في production، أي حد يكتب token بـ [[alg: none]] بإيده يدخل.

---

## ٧. الأدوار والإلغاء (من الحل)

~~~text الناتج
old token: undefined
after refresh: admin
checkRevoked: auth/id-token-revoked
~~~

- [[setCustomUserClaims]] مبيغيّرش الـ token اللي في إيد اليوزر. [[getIdToken(true)]] (الـ [[true]] = جدد غصب عنك) جاب token فيه [[role: 'admin']].
- بعد [[revokeRefreshTokens]] الـ token القديم اترفض. وفي الـ emulator اترفض كمان من غير [[checkRevoked]]، لأن الـ admin SDK بيعمل الـ check ده دايمًا مع الـ emulator. في production من غير [[true]] كان هيعدّي لحد ما يخلص (لحد ساعة).

---

## الخلاصة

| فين | إيه |
|---|---|
| الـ client | [[signInWithEmailAndPassword]] ثم [[await user.getIdToken()]] قبل كل طلب |
| الطلب | [[Authorization: Bearer <token>]] |
| السيرفر | [[getAuth().verifyIdToken(token)]] ← [[uid]] ولا 401 |
| أدوار | [[setCustomUserClaims]] + [[getIdToken(true)]] |
| قفل فوري | [[revokeRefreshTokens]] + [[verifyIdToken(token, true)]] |

> [[FIREBASE_AUTH_EMULATOR_HOST]] للتطوير بس. لو اتسرّب لـ production، السيرفر بيقبل tokens مش موقّعة.

ولو تطبيقك موبايل: نفس الـ token بيطلع من [[firebase_auth]] في Flutter أو [[@react-native-firebase/auth]] أو Firebase Android SDK، والسيرفر مبيفرقش معاه. تفاصيل كل SDK في تابات Flutter و React Native و Kotlin.`,
          lines: [
            R`[[initializeApp]] للـ client SDK.`,
            R`دوال الـ Auth اللي هنستخدمها: الـ emulator والتسجيل والدخول.`,
            R`التطبيق والـ Auth في سطر. [[apiKey]] لازم حتى مع الـ emulator.`,
            R`كلّم الـ Auth emulator على 9099، ومن غير الشريط اللي بيظهر في الصفحة.`,
            R`اعمل يوزر بإيميل وباسورد (٦ حروف على الأقل). بيدخّله كمان.`,
            R`ادخل، وطلّع [[user]] من النتيجة.`,
            R`ID token صالح (عمره ساعة، والـ SDK بيجدده لوحده).`,
            R`ابعته للـ API في [[Authorization: Bearer ...]].`,
            R`اطبع حالة الرد والـ JSON.`,
            R`سيرفر HTTP من Node نفسه، من غير Express.`,
            R`[[initializeApp]] بتاع الـ Admin SDK (صلاحيات كاملة، للسيرفر بس).`,
            R`[[getAuth]] بتاع الـ Admin: فيه [[verifyIdToken]] و [[setCustomUserClaims]].`,
            R`[[projectId]] عشان يتأكد إن الـ token لمشروعنا ([[aud]]).`,
            R`لكل طلب: دالة async بتاخد الطلب والرد.`,
            R`طلّع الـ token من الـ header وشيل [[Bearer ]] من أوله.`,
            R`[[try]]: لو التأكد فشل نروح للـ [[catch]].`,
            R`اتأكد من التوقيع والمشروع والانتهاء، ورجّع الـ claims.`,
            R`رد 200 بـ JSON.`,
            R`مين اليوزر: [[uid]] والإيميل ودخل بإيه.`,
            R`لو الـ token غلط أو مش موجود.`,
            R`رد 401.`,
            R`ورجّع كود الغلط (زي [[auth/argument-error]] أو [[auth/id-token-expired]]).`,
            R`آخر الـ [[catch]].`,
            R`اسمع على بورت 3000.`
          ],
          sol: R`اتشغّل على Auth emulator ([[firebase-tools]] 15.34.1، [[firebase]] 13.1.0، [[firebase-admin]] 14.5.0):

(١) الـ header [[{ alg: 'none', typ: 'JWT' }]]: الـ emulator مش بيوقّع. والـ payload فيه [[aud: 'demo-shop']] و [[iss: 'https://securetoken.google.com/demo-shop']] و [[exp - iat = 3600]] و [[sign_in_provider: 'password']].

(٢) الباسورد الغلط في الـ emulator رجّع [[auth/wrong-password]]. في مشروع حقيقي جديد بيرجع [[auth/invalid-credential]] بسبب email enumeration protection (من الـ docs)، فاكتب الواجهة على الاتنين.

(٣) الـ token القديم: [[role]] = [[undefined]]. بعد [[getIdToken(true)]]: [[admin]]. والـ claim بيوصل للـ Rules كـ [[request.auth.token.role]].

وزيادة: بعد [[revokeRefreshTokens]] و ثانية ونص، [[verifyIdToken(t, true)]] رمى [[auth/id-token-revoked]]. ولازم الانتظار ده: المقارنة بالثواني، فلو الإلغاء والدخول في نفس الثانية الـ token بيعدّي.`,
          solCode: R`import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp as adminApp } from "firebase-admin/app";
import { getAuth as adminAuth } from "firebase-admin/auth";
const auth = getAuth(initializeApp({ apiKey: "demo-api-key", projectId: "demo-shop" }));
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
adminApp({ projectId: "demo-shop" });
const { user } = await createUserWithEmailAndPassword(auth, "admin@example.com", "secret123");
await adminAuth().setCustomUserClaims(user.uid, { role: "admin" });
console.log("old token:", (await adminAuth().verifyIdToken(await user.getIdToken())).role);
console.log("after refresh:", (await adminAuth().verifyIdToken(await user.getIdToken(true))).role);
await new Promise((r) => setTimeout(r, 1500));
await adminAuth().revokeRefreshTokens(user.uid);
try { await adminAuth().verifyIdToken(await user.getIdToken(), true); } catch (e) { console.log("checkRevoked:", e.code); }
// شغّله: FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 node claims.mjs`
        }
      ]
    }
]);

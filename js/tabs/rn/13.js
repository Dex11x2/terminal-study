// تكملة تاب rn: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/rn/01.js (شرح حقول الدرس في أوله)
MORE("rn", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات React Native، بإجابة تقولها في دقيقة والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "RN بيشتغل إزاي من جوه",
          title: "React Native بيشتغل إزاي من جوه؟ (threads و JSI و Fabric)",
          desc: R`إجابة في دقيقة: «كودي JS/TS بيتعمله bundle بـ Metro ويشتغل على Hermes جوه التطبيق. React بيحسب شجرة الـ components على الـ JS thread. الـ New Architecture شالت الـ bridge القديم: JS بيكلم C++ مباشرة عن طريق JSI. Fabric هو الـ renderer: بيبني shadow tree في C++، و Yoga بيحسب الـ layout (flexbox)، وبعدين التغييرات بتتطبق على native views على الـ UI thread. و TurboModules هي الـ native modules (كاميرا، تخزين) بتتحمّل lazily وبـ types متولّدة. عشان كده الـ UI native حقيقي، والمنطق JS.»`,
          example: R`# JS thread:   React render + منطقك + events handlers
# UI thread:   رسم الـ native views + اللمس + Reanimated worklets
# JSI:         JS <-> C++ مباشرة، sync أو async، من غير JSON
# Fabric:      shadow tree في C++ + Yoga layout -> native views
# TurboModules: native modules lazy بـ Codegen types
# Hermes:      محرك JS بيشغّل bytecode متجهّز وقت الـ build`,
          try: R`قول الإجابة بصوتك في دقيقة من غير ما تبص. وبعدين جاوب على السؤال اللي بعده: «ليه الـ scroll بيفضل شغال والتطبيق مش بيرد على الضغطات؟»`,
          deep: {
            why: R`بيختبر إنك فاهم الأداة مش بس بتستخدمها، وإن معلوماتك مش قديمة (الـ bridge). والإجابة دي بتفتح الباب لأسئلة الأداء اللي بعدها.`,
            how: R`نقط لو اتسألت أكتر: Hermes بيعمل precompile للـ JS لـ bytecode وقت الـ build (الـ [[.hbc]] اللي طلع في [[expo export]] في الـ lab)، فالـ startup أسرع وذاكرة أقل من JIT. و Hermes V1 هو الجيل الجديد. الـ bridge القديم كان async و batched و JSON، فأي حاجة sync (قياس view) كانت مستحيلة. JSI بيسمح بـ host objects: JS ماسك reference لـ object في C++. و Fabric بيدعم concurrent React (transitions، و Suspense). و Codegen بيولّد الـ glue code من specs مكتوبة بـ TS.`,
            when: R`أسئلة بتيجي بعدها: «إيه الفرق بين الـ bridge و JSI؟»، و «ليه الـ New Architecture مهمة للمكتبات؟»، و «إيه اللي بيحصل لما تدوس زرار؟» (native touch على الـ UI thread، يتبعت لـ JS، الـ handler يعمل setState، React يحسب، Fabric يطبّق)، و «Expo Go بيشغّل كودك إزاي من غير build؟» (فيه الـ native جاهز، وبيحمّل الـ JS bundle من Metro).`,
            mistakes: R`«RN بيحوّل الكود لـ native» (لأ، الـ views native والكود JS). و «RN بيستخدم WebView» (ده Capacitor/Cordova). و «الـ bridge» كأنه الحاضر. و «RN single-threaded» (الـ JS thread واحد، بس فيه UI thread وغيره).`
          },
          teach: R`## الفكرة: ٦ كلمات، وكل واحدة بتجاوب على سؤال

المثال مش كود بيتشغّل، ده ٦ سطور ملخّصين الإجابة. كل سطر اسم حاجة وبعده [[:]] وبعدين هي بتعمل إيه. هنمشي عليهم بترتيب اللي بيحصل لما تفتح التطبيق وتدوس زرار.

---

## ١. [[Hermes]]: مين بيشغّل الـ JS؟

Hermes محرك JavaScript عملته Meta (نفس الشركة اللي ورا React Native) مخصوص للموبايل (زي V8 في Chrome). الفرق إنه مش بيقرا الـ JS نص ويترجمه وقت الفتح: الـ JS بيتحوّل لـ **bytecode** وقت الـ build، والتطبيق بيشغّله على طول. عشان كده الفتح أسرع والذاكرة أقل.

شفت ده بعيني: [[npx expo export --platform android]] على مشروع Expo SDK 57 (ويندوز) طلّع:

~~~text الناتج
_expo/static/js/android/entry-7997267fc0afef356e7c7406516b6617.hbc (3.7MB)
~~~

وقريت أول بايتات الملف بـ Node:

~~~text الناتج
c61fbc03c103191f version 98
~~~

[[c61fbc03c103191f]] الـ magic number بتاع ملفات Hermes bytecode، و [[98]] نسخة الـ bytecode. يعني ده مش JS نصي، ده bytecode جاهز.

---

## ٢. [[JS thread]]: فين React؟

كل كودك بيشتغل هنا على thread واحد: React بيعمل render ويحسب إيه اللي اتغير، والـ [[onPress]] والـ [[useEffect]] وأي [[fetch]]. **thread** يعني خط تنفيذ: بيعمل حاجة واحدة في المرة. لو حاجة تقيلة شغالة عليه، كل اللي بعدها بيستنى.

## ٣. [[UI thread]]: مين بيرسم؟

الـ thread الرئيسي بتاع التطبيق الـ native: بيرسم الـ views الحقيقية ([[android.view.View]] و [[UIView]]) وبيستقبل اللمس. الـ scroll الـ native بيحصل هنا من غير ما يسأل JS. و Reanimated بيشغّل الـ worklets (دوال JS صغيرة متعلّم عليها) هنا عشان الـ animation تفضل ناعمة حتى لو الـ JS thread مشغول.

---

## ٤. [[JSI]]: إزاي الاتنين بيتكلموا؟

JSI = JavaScript Interface: طبقة C++ بتخلي JS ماسك reference لـ object في C++ وينادي دواله مباشرة.

| | الـ bridge القديم | JSI |
|---|---|---|
| الرسايل | JSON نصي | نداء دالة مباشر |
| التوقيت | async بس ومتجمّعة (batched) | sync أو async |
| مثال اتحل | قياس view كان لازم callback | يرجّع القيمة على طول |

## ٥. [[Fabric]]: إزاي الـ components بتبقى views؟

Fabric هو الـ renderer الجديد:

1. React بيطلّع شجرة components.
2. Fabric بيبني منها **shadow tree** في C++: نسخة خفيفة فيها الستايل بس.
3. **Yoga** (مكتبة layout مكتوبة C++) بتحسب flexbox: كل view مكانها وحجمها فين.
4. التغييرات بتتطبق على الـ native views على الـ UI thread.

ولأنه C++ مشترك، Fabric بيدعم features الـ concurrent في React زي [[startTransition]] و Suspense.

## ٦. [[TurboModules]]: والكاميرا والتخزين؟

دي الـ native modules (كود Kotlin أو Swift بيعرض دوال لـ JS). كلمة **lazy** يعني الـ module مش بيتحمّل غير أول ما تستخدمه، بدل ما كله يتحمّل وقت الفتح. و **Codegen** أداة بتقرا spec مكتوب بـ TypeScript وتولّد كود الربط بين JS و native، فالأنواع متطابقة بدل ما تكتشف الغلط وقت التشغيل.

---

## الرحلة كلها: لما تدوس زرار

| الخطوة | فين |
|---|---|
| الإصبع يلمس الشاشة | UI thread (native) |
| الحدث يوصل لـ [[onPress]] | JS thread (عن طريق JSI) |
| [[setState]] و React يحسب الفرق | JS thread (Hermes) |
| shadow tree و Yoga | C++ (Fabric) |
| الـ view تتحدّث على الشاشة | UI thread |

---

## الخلاصة

- الـ UI native حقيقي، والمنطق JS على Hermes. مفيش WebView ومفيش «تحويل لـ native».
- الـ bridge القديم (JSON و async) اتشال، ومكانه JSI و Fabric و TurboModules.
- أي حاجة تقيلة على الـ JS thread بتأخر الضغطات، بس الـ scroll الـ native بيفضل شغال، وده سؤال المتابعة في «جرّب».`,
          sol: R`الإجابة على «الـ scroll شغال والضغطات لأ»: الـ scroll بيتعمل native على الـ UI thread، فمش محتاج JS. لكن [[onPress]] handler في JS، والـ JS thread مشغول (render تقيل، أو loop، أو JSON كبير بيتعمل له parse). فالضغطة بتستنى في الطابور. الحل: قلّل الشغل على الـ JS thread (memo، وتقسيم الشغل، و [[startTransition]] للتحديثات غير العاجلة)، وخلي الـ animations والـ gestures على الـ UI thread بـ Reanimated و gesture-handler.`
        },
        {
          cmd: "ليه القايمة بطيئة",
          title: "«القايمة بتقطّع وفيها بياض وانت بتعمل scroll»: تعمل إيه؟",
          desc: R`إجابة في دقيقة: «أول حاجة أقيس على release build على موبايل متوسط، مش dev. بعدين أدوّر بالترتيب: (١) الـ renderItem تقيل؟ صور كبيرة، أو components كتير، أو حسابات في الـ render. (٢) re-renders زيادة؟ الـ Profiler يوريني لو كل الصفوف بتعيد رسم لما حاجة تتغير، وأصلّح بـ memo و callbacks ثابتة أو الـ React Compiler. (٣) keyExtractor ثابت من الـ id. (٤) الصور بحجم العرض و cache (expo-image). (٥) لو لسه، FlashList بدل FlatList عشان الـ recycling، مع getItemType لو فيه أنواع. والـ FlatList جوه ScrollView من أول الحاجات اللي أشوفها.»`,
          example: R`# الترتيب:
# 1. release build + Perf Monitor (JS FPS و UI FPS)
# 2. React DevTools Profiler: مين بيعيد الرسم؟
# 3. renderItem: صور بحجمها، ومفيش حسابات تقيلة، و memo
# 4. keyExtractor ثابت، ومفيش FlatList جوه ScrollView
# 5. FlashList + getItemType
npx expo run:android --variant release`,
          try: R`خد شاشة قايمة من مشروعك (أو شاشة المهام في الـ lab) وامشي على الـ checklist: قيس في release، وشوف الـ Profiler، ودوّر على الأخطاء الخمسة. اكتب أول حاجة لقيتها.`,
          deep: {
            why: R`أشهر سؤال عملي في انترفيوهات RN، لأن كل تطبيق فيه قوايم وكل فريق قابل المشكلة دي. الإجابة الكويسة بتبين إنك بتقيس الأول ومش بتجرب حلول عشوائية.`,
            how: R`نقط لو اتسألت أكتر: JS FPS واطي و UI FPS عالي = المشكلة في JS (render). الاتنين واطيين = الـ native views تقيلة (ظلال كتير، أو صور ضخمة، أو nesting عميق). و [[windowSize]] و [[initialNumToRender]] و [[maxToRenderPerBatch]] في FlatList بتوازن بين البياض والذاكرة. و [[getItemLayout]] لو ارتفاع العنصر ثابت (FlatList بيقدر يقفز من غير ما يقيس). و [[removeClippedSubviews]] على Android. و FlashList v2 مش محتاجة estimatedItemSize.`,
            when: R`أسئلة بتيجي بعدها: «إيه الفرق بين FlatList و FlashList؟» (unmount/mount مقابل recycling)، و «إيه مشكلة الـ state جوه عنصر في FlashList؟» (بيفضل مع الـ cell)، و «إمتى تستخدم ScrollView؟»، و «إزاي تعمل infinite scroll؟» (onEndReached + useInfiniteQuery + شرط isFetchingNextPage).`,
            mistakes: R`«هحط FlashList» كأول وآخر إجابة من غير قياس. و «هقيس في dev». و «هعمل memo لكل حاجة». ونسيان الصور، وهي السبب في نص الحالات.`
          },
          teach: R`## الفكرة: قيس الأول، وبعدين دوّر بالترتيب

المثال checklist من ٥ خطوات (تعليقات [[#]])، وبعدها أمر واحد بيعمل release build. الإجابة الكويسة في الانترفيو هي الترتيب ده نفسه: مش «هحط FlashList»، لكن «هقيس، وأعرف المشكلة فين، وبعدين أصلّح».

---

## ١. [[release build + Perf Monitor (JS FPS و UI FPS)]]

### ليه release مش dev؟

الـ development build فيه حاجات بتبطّأ: React بيعمل فحوصات زيادة ويطبع تحذيرات، والـ JS مش متحوّل bytecode ومتوصّل بـ Metro. فقايمة بتقطّع في dev ممكن تبقى ناعمة في release. القياس الوحيد اللي ليه معنى على release، وعلى موبايل متوسط مش أحسن موبايل في الفريق.

### [[npx expo run:android --variant release]]

| الحتة | معناها |
|---|---|
| [[expo run:android]] | اعمل build محلي بـ Gradle وركّبه على موبايل أو emulator متوصّل |
| [[--variant release]] | build variant اسمه release بدل debug |

~~~text من npx expo run:android --help (Expo SDK 57)
--variant <name>       Build variant or product flavor and build variant. Default: debug
~~~

الأمر محتاج Android SDK وموبايل أو emulator، ومش موجودين هنا، فاتشغّل [[--help]] بس.

### Perf Monitor: الرقمين

بيتفتح من الـ dev menu في development build، وبيعرض رقمين FPS (frames per second، والطبيعي ٦٠ أو أكتر على الشاشات السريعة):

| JS FPS | UI FPS | المشكلة فين |
|---|---|---|
| واطي | عالي | الـ JS thread: render تقيل أو re-renders زيادة |
| واطي | واطي | الـ native views نفسها تقيلة: صور ضخمة، أو ظلال، أو nesting عميق |

---

## ٢. [[React DevTools Profiler: مين بيعيد الرسم؟]]

الـ Profiler (في React Native DevTools، بتفتحه بـ [[j]] في ترمنال [[expo start]]) بيسجّل كل render وبيقولك أنهي component اترسم وليه. العلامة الوحشة: تغيّر حاجة في عنصر واحد، فكل الصفوف تترسم.

### جربتها بكود (Node، React 19.2.3)

صف ملفوف في [[memo]]: [[memo]] بيقول لـ React «متعيدش رسم الـ component ده لو الـ props هي هي». و ٥٠ صف، والأب بيعمل [[setState]] مرة:

~~~ts
const Row = memo(function Row({ title, onPress }) { renders++; ... });
// نسخة 1: onPress={() => onPress(it.id)}   دالة جديدة في كل render
// نسخة 2: onPress={onPress}                  من useCallback، نفس الدالة
~~~

~~~text الناتج
inline () => ...   -> rows re-rendered: 50
stable useCallback -> rows re-rendered: 0
~~~

ليه ٥٠؟ [[() => ...]] بيعمل دالة **جديدة** كل render، و [[memo]] بيقارن الـ props بـ [[===]]، ودالتين جداد عمرهم ما يبقوا [[===]]. فالـ memo ملوش أي لازمة. الـ React Compiler (شغال افتراضيًا في الـ template الجديد) بيعمل الـ memoization دي لوحده في أغلب الحالات.

---

## ٣. [[renderItem: صور بحجمها، ومفيش حسابات تقيلة، و memo]]

- **صور بحجمها**: صورة 3000px في مربع 80px لسه بتتفك كلها في الذاكرة. اطلب من السيرفر حجم صغير، واستخدم [[expo-image]] عشان الـ cache.
- **مفيش حسابات تقيلة**: [[renderItem]] بيتنادى لكل صف ظاهر. sort أو filter أو تنسيق تاريخ جواه = نفس الشغل يتكرر. اعمله مرة برّه.
- **memo**: زي التجربة فوق.

## ٤. [[keyExtractor ثابت، ومفيش FlatList جوه ScrollView]]

- [[keyExtractor]]: بيرجّع مفتاح فريد لكل صف. لو المفتاح هو الـ index، أي إضافة في أول القايمة تخلي React يفتكر كل الصفوف اتغيرت. خده من [[item.id]].
- **FlatList جوه ScrollView** (في نفس الاتجاه): الـ ScrollView بيدّي القايمة مساحة لا نهائية، فالـ FlatList بيرسم كل العناصر مرة واحدة وبيبطل virtualization. RN بيطلّع تحذير عن ده.

## ٥. [[FlashList + getItemType]]

- **FlatList** بيعمل unmount للصفوف اللي خرجت من الشاشة ويعمل mount لصفوف جديدة.
- **FlashList** بيعمل **recycling**: نفس الـ views بتتملي ببيانات تانية، فشغل أقل.
- [[getItemType]]: لو القايمة فيها أنواع (عنوان و صف عادي و إعلان)، كل نوع بيتعمله recycle مع نوعه بس.

---

## الخلاصة

| الخطوة | السؤال |
|---|---|
| ١ | قست على release وموبايل متوسط؟ المشكلة JS ولا UI؟ |
| ٢ | مين بيعيد الرسم ومن غير سبب؟ |
| ٣ | الـ renderItem تقيل؟ الصور بحجمها؟ |
| ٤ | الـ key ثابت؟ فيه FlatList جوه ScrollView؟ |
| ٥ | لو لسه: FlashList |

- دالة inline في الـ props بتكسر [[memo]] (اتجرّب: ٥٠ صف من ٥٠)، إلا لو الـ React Compiler شغال.
- الصور سبب شائع جدًا، وأول حاجة تبص عليها مع الـ re-renders.`,
          lines: [
            "release build محلي عشان القياس يبقى حقيقي."
          ],
          sol: R`إجابة قوية بتذكر: القياس على release، والتفرقة بين JS و UI FPS، وسبب واحد على الأقل من الخمسة بمثال (مثلًا «كان فيه [[onPress={() => ...}]] inline بيكسر الـ memo في كل صف»، أو «الصور كانت 3000px في مربع 80»). ولو لقيت في الـ lab إن [[TaskRow]] ملفوف في [[memo]] بس [[onPress]] بيتعمل inline في [[renderItem]]، يبقى ده بالظبط نوع الحاجة اللي بتقولها: مع الـ React Compiler شغال غالبًا مش هتفرق، ومن غيره الـ memo مالوش تأثير.`
        },
        {
          cmd: "التوكن تحفظه فين",
          title: "«هتحفظ التوكن فين في تطبيق الموبايل؟ وليه مش AsyncStorage؟»",
          desc: R`إجابة في دقيقة: «access token و refresh token في expo-secure-store، يعني Keychain على iOS و Keystore على Android، لأنهم مشفّرين بمفاتيح النظام. AsyncStorage مش مشفّر، وأي حد عنده backup أو جهاز rooted يقراه. الـ access قصير العمر، والـ refresh أطول وبيتعمله rotation على السيرفر. في الـ client عندي API wrapper بيحط الـ Bearer، ولو رجع 401 بيعمل refresh مرة واحدة حتى لو فيه طلبات كتير مع بعض (single-flight)، ولو الـ refresh فشل بعمل sign out. وفي الخروج بمسح الاتنين وبقول للسيرفر يلغي الـ refresh.»`,
          example: R`# access: SecureStore، عمر قصير (دقايق)
# refresh: SecureStore، عمر أطول + rotation على السيرفر
# 401 -> refresh واحد مشترك -> أعد الطلب مرة
# refresh فشل -> signOut -> Stack.Protected يرجّع للـ login
# logout -> امسح الاتنين + POST /api/auth/logout`,
          try: R`قول الإجابة بصوتك، وبعدين جاوب: «طب لو حد عمل reverse engineering للـ APK، يقدر ياخد التوكن؟» و «ليه مش cookies زي الويب؟»`,
          deep: {
            why: R`سؤال بيجمع الأمان والشبكة والـ state في سؤال واحد، وبيبان منه لو انت نقلت عادات الويب (localStorage) للموبايل من غير تفكير.`,
            how: R`نقط أكتر: SecureStore بيحمي البيانات وهي مخزّنة (at rest). وهي في الذاكرة وقت التشغيل، أي كود بيشتغل جوه تطبيقك يقدر يقراها. الـ reverse engineering للـ APK بيطلّع الكود والـ [[EXPO_PUBLIC_*]]، مش التوكنات (دي على جهاز المستخدم بس). و certificate pinning حماية إضافية ضد MITM في التطبيقات الحساسة (بنوك)، وليها تكلفة (لما الشهادة تتغير لازم update). والـ biometrics: [[requireAuthentication]] في SecureStore أو [[expo-local-authentication]] قبل عمليات حساسة. وعلى السيرفر: كشف إعادة استخدام الـ refresh token يلغي كل الجلسات.`,
            when: R`أسئلة بتيجي بعدها: «إزاي تتعامل مع ٣ طلبات رجعوا 401 مع بعض؟» (درس [[refresh token]])، و «التطبيق يعرف إزاي إن المستخدم لسه داخل أول ما يفتح؟» (يقرا من SecureStore والـ splash ظاهرة، درس [[Stack.Protected]])، و «ليه مش cookies؟» (ممكن، بس RN networking مع cookies أقل وضوحًا، والـ Bearer header أبسط ومتحكم فيه، والـ backend بيدعم الاتنين).`,
            mistakes: R`«AsyncStorage لأنه أسهل». و «Redux persist» (بيكتب في AsyncStorage). و «الـ JWT مشفّر فمش مشكلة» (الـ JWT signed مش encrypted، أي حد يقرا الـ payload). و «هحط الـ API secret في التطبيق».`
          },
          teach: R`## الفكرة: ٥ سطور، كل واحد قرار

المثال ملخّص الإجابة في ٥ تعليقات. كل سطر فيه حالة، و [[->]] معناها «يحصل بعدها كذا». هنمشي عليهم واحد واحد، ونجرّب الحتتين اللي ينفع يتجربوا بكود: إن الـ JWT مقروء، والـ refresh الواحد المشترك.

---

## ١. [[access: SecureStore، عمر قصير (دقايق)]]

- **access token**: اللي بيتبعت مع كل طلب في header [[Authorization: Bearer <token>]]. عمره قصير (١٥ دقيقة مثلًا)، فلو اتسرق ميعيشش كتير.
- **SecureStore** ([[expo-secure-store]]): بيخزّن في المكان المشفّر بتاع النظام:

| | iOS | Android |
|---|---|---|
| SecureStore بيكتب في | Keychain | ملف مشفّر بمفتاح من Android Keystore |
| AsyncStorage بيكتب في | ملف عادي | قاعدة SQLite عادية |

AsyncStorage مش مشفّر: أي حد عنده backup للجهاز أو جهاز rooted يقراه كنص.

### «الـ JWT مشفّر فمش مشكلة»؟ لأ، اتجرّب

عملت JWT بـ Node ([[crypto.createHmac]] بمفتاح [[server-secret]])، وبعدين قريته **من غير المفتاح**:

~~~ts
const token = head + '.' + body + '.' + sig;
JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString());
~~~

~~~text الناتج
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQyLCJlbWFpbCI6InNhcmFAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImV4cCI6MTc5MTM3MDgwMH0.DY5oFlFFQz3oOQBMheTonjRBWLXnK02I4HgBx-SgC1I
{ sub: 42, email: 'sara@example.com', role: 'user', exp: 1791370800 }
~~~

- الـ JWT ٣ حتت بينهم نقط: header و payload و signature.
- [[split('.')[1]]]: الحتة التانية، الـ payload.
- [[base64url]]: ترميز مش تشفير. أي حد يفكه.
- الـ signature بتثبت إن السيرفر هو اللي عمله ومحدش عدّل فيه، بس مش بتخبّي المحتوى. فـ **signed مش encrypted**، ومتحطش فيه حاجة سرية.

---

## ٢. [[refresh: SecureStore، عمر أطول + rotation على السيرفر]]

- **refresh token**: بيستخدم لحاجة واحدة: تاخد access جديد. عمره أطول (أيام أو أسابيع).
- **rotation**: كل مرة تستخدمه، السيرفر يديك refresh جديد ويلغي القديم. لو حد استخدم refresh قديم تاني، السيرفر يعرف إنه اتسرق ويلغي كل الجلسات.

## ٣. [[401 -> refresh واحد مشترك -> أعد الطلب مرة]]

**401** = Unauthorized: السيرفر بيقول التوكن انتهى. المشكلة: الشاشة بتبعت ٣ طلبات مع بعض، والتلاتة يرجعوا 401. لو كل واحد عمل refresh لوحده، مع الـ rotation التاني والتالت هيستخدموا refresh اتلغى، والسيرفر يفتكره سرقة.

الحل **single-flight**: أول طلب يبدأ الـ refresh ويحفظ الـ Promise بتاعه، والباقي يستنوا نفس الـ Promise. جربته بمحاكاة في Node:

~~~ts
let refreshing = null;
function refreshOnce() {
  if (!refreshing) refreshing = doRefresh().finally(() => { refreshing = null; });
  return refreshing;
}
~~~

- لو مفيش refresh شغال ([[!refreshing]])، ابدأ واحد واحفظه.
- [[.finally]]: لما يخلص (نجح أو فشل) فضّي المتغير، عشان الـ 401 الجاي بعد ساعة يعمل refresh جديد.
- كله بيرجّع نفس الـ Promise.

وكل طلب بيعمل: لو 401، [[await refreshOnce()]]، وأعد الطلب **مرة واحدة** بس (عشان لو لسه 401 منلفّش للأبد). ٣ طلبات مع بعض:

~~~text الناتج
[ 'tasks 200', 'profile 200', 'stats 200' ] refreshCalls = 1
~~~

التلاتة نجحوا بـ refresh واحد. الكود الكامل في درس [[refresh token]].

## ٤. [[refresh فشل -> signOut -> Stack.Protected يرجّع للـ login]]

لو الـ refresh نفسه رجع 401 (انتهى أو اتلغى)، مفيش حل غير login تاني. [[signOut]] بيمسح التوكنات ويغيّر الـ state، و [[Stack.Protected]] في Expo Router (درسه في القسم بتاعه) بيشيل الشاشات المحمية ويرجّعك للـ login لوحده.

## ٥. [[logout -> امسح الاتنين + POST /api/auth/logout]]

- امسح الاتنين من SecureStore ([[deleteItemAsync]]).
- [[POST /api/auth/logout]]: قول للسيرفر يلغي الـ refresh، عشان لو نسخة منه اتسرقت متشتغلش.

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| فين؟ | SecureStore (Keychain و Keystore)، مش AsyncStorage |
| الـ JWT سري؟ | لأ: signed مش encrypted، أي حد يقرا الـ payload |
| ٣ طلبات رجعوا 401؟ | refresh واحد مشترك، وكل طلب يتعاد مرة |
| الـ refresh فشل؟ | signOut والـ router يرجّع للـ login |
| logout؟ | امسح محليًا وألغي على السيرفر |`,
          sol: R`«reverse engineering للـ APK»: بيطلّع الكود والـ assets وأي قيمة في الـ bundle (زي [[EXPO_PUBLIC_API_URL]])، بس التوكنات مش في الـ APK أصلًا، دي بتتعمل بعد الـ login وبتتخزن على جهاز المستخدم في Keychain أو Keystore. الخطر الحقيقي: سر ثابت حطيته في الكود (API key مدفوع)، وده لازم يبقى على السيرفر.

«ليه مش cookies؟»: ممكن، بس في RN مفيش sandbox المتصفح اللي بيدّي [[httpOnly]] قيمته (مفيش XSS بنفس المعنى، ومفيش [[document.cookie]])، والـ Bearer في header واضح وسهل تتحكم فيه وتختبره. المهم مكان التخزين وعمر التوكن والـ rotation، مش الشكل.`
        },
        {
          cmd: "OTA إمتى مينفعش",
          title: "«تقدر تصلّح أي bug بـ OTA update؟»",
          desc: R`إجابة في دقيقة: «لأ. الـ OTA بيبدّل الـ JS bundle والـ assets بس. أي تغيير native محتاج build جديد ويعدّي على المتجر: مكتبة native جديدة أو ترقية نسختها، أو ترقية الـ Expo SDK أو RN، أو تغيير في app.json بيأثر على native (صلاحيات، وأيقونة، و splash، و package name)، أو config plugin. عشان أمنع update يوصل لـ build مش متوافق بستخدم runtimeVersion، ويفضّل بسياسة fingerprint عشان تتغير لوحدها. وبنشر بـ rollout بنسبة وعندي rollback بـ republish. وقانونيًا: المتاجر بتسمح بتحديثات JS مبتغيرش الغرض الأساسي للتطبيق.»`,
          example: R`# OTA ينفع: bug في JS، نص، ستايل، منطق، صورة في assets
# OTA مينفعش: مكتبة native، ترقية SDK، صلاحية جديدة، أيقونة، splash، package name
# الحماية: runtimeVersion (fingerprint) + rollout % + republish للرجوع`,
          try: R`صنّف الحاجات دي (OTA ولا build): تغيير لون زرار، و إضافة [[expo-camera]]، و تصليح حساب الخصم، و ترقية [[@shopify/flash-list]] من 2.0 لـ 2.3، و تغيير اسم التطبيق، و ترجمة جديدة في ملف JSON.`,
          deep: {
            why: R`سؤال بيختبر إنك فاهم الحدود بين JS و native، وإنك اشتغلت على تطبيق في الإنتاج فعلًا، مش بس دروس. والإجابة الغلط هنا («أيوة أي حاجة») بتوقع تطبيقات حقيقية.`,
            how: R`نقط أكتر: التطبيق بيحمّل الـ update في الفتحة اللي بعد النشر افتراضيًا. الـ assets (صور) بتتحدث مع الـ update. لو التطبيق وقع أول ما حمّل update جديد، [[expo-updates]] عنده error recovery بيرجع للـ bundle اللي قبله في حالات معينة، بس متعتمدش عليه. وفيه code signing للـ updates لو عايز تضمن إن محدش يقدر يبعت bundle مزوّر. والـ channels بتخليك تجرّب على preview الأول.`,
            when: R`أسئلة بتيجي بعدها: «إزاي تعرف إن الـ update اللي نشرته مش بيوقع التطبيق؟» (rollout 10% و monitoring زي Sentry مع الـ update id، وبعدين زوّد)، و «المستخدم اللي مفتحش التطبيق شهر هياخد إيه؟» (آخر update لنفس الـ runtime)، و «إيه الـ runtimeVersion؟».`,
            mistakes: R`«أي حاجة». و «OTA بيحتاج review» (مش بيحتاج، ده الهدف). ونسيان إن ترقية نسخة مكتبة native (حتى minor) تغيير native. و «هغيّر الأيقونة بـ OTA».`
          },
          teach: R`## الفكرة: الـ update بيبدّل ملف واحد، وكل الباقي ثابت

المثال ٣ تعليقات: اللي ينفع، واللي مينفعش، والحماية. القاعدة اللي ورا الاتنين بسيطة: التطبيق المتركّب = native (اتبنى ومتوقّع) + JS bundle و assets. الـ OTA (Over The Air) بيبدّل التاني بس.

> التصنيف اتأكدت منه بـ [[npx @expo/fingerprint fingerprint:generate]] على مشروع Expo SDK 57 على ويندوز (التفاصيل في درس [[runtimeVersion]]): أي تغيير البصمة ثابتة معاه = OTA، والبصمة اتغيرت = build.

---

## ١. [[OTA ينفع: bug في JS، نص، ستايل، منطق، صورة في assets]]

كل دول بيتحطوا جوه الـ bundle أو الـ assets اللي [[expo export]] بيطلّعها:

~~~text npx expo export --platform android
_expo/static/js/android/entry-....hbc (3.7MB)
metadata.json (2.8KB)
+ 41 ملف في assets (صور وخطوط)
~~~

| التغيير | فين بيعيش | ليه OTA |
|---|---|---|
| bug في حساب أو منطق | الـ [[.hbc]] | ده كود JS |
| نص أو ترجمة في JSON | الـ [[.hbc]] (اللي بتعمله import بيدخل الـ bundle) | بيانات جوه الـ JS |
| ستايل ([[StyleSheet]]) | الـ [[.hbc]] | الستايل في RN كود JS |
| صورة بتعملها [[require]] | [[assets]] | بتترفع مع الـ update |

وجربت: تعديل نص في [[src/app/index.tsx]] سابت البصمة زي ما هي.

## ٢. [[OTA مينفعش: مكتبة native، ترقية SDK، صلاحية جديدة، أيقونة، splash، package name]]

كل دول بيتكتبوا في الملفات الـ native وقت الـ build (Gradle و AndroidManifest و Info.plist)، والتطبيق المتركّب عنده النسخة القديمة منهم:

| التغيير | بيتكتب فين في Android |
|---|---|
| مكتبة native (فيها فولدر [[android]] أو [[ios]]) | الكود الـ Kotlin بيتعمله compile جوه التطبيق |
| ترقية SDK أو RN | كل الـ native |
| صلاحية | [[AndroidManifest.xml]] |
| أيقونة و splash | [[res/]] |
| package name أو اسم التطبيق | [[build.gradle]] و [[strings.xml]] |

وجربت: [[npx expo install expo-camera]] غيّرت البصمة، و [[fingerprint:diff]] قال السبب: [[added dir node_modules/expo-camera/android]]. وتغيير [[orientation]] في app.json غيّرها برضه.

### والحالة المخادعة: ترقية مكتبة

السؤال مش «مكتبة ولا لأ»، السؤال «فيها native code ولا لأ»:

| المكتبة | فيها native؟ | ترقيتها |
|---|---|---|
| [[@shopify/flash-list]] v2 | لأ (JS بس) | OTA. جربت 2.0.3 و 2.3.3: نفس البصمة |
| [[expo-camera]] و Reanimated | أيوة | build، حتى لو ترقية صغيرة |

## ٣. [[الحماية: runtimeVersion (fingerprint) + rollout % + republish للرجوع]]

تلات طبقات:

1. **[[runtimeVersion]] بسياسة [[fingerprint]]**: لو غلطت وعملت update بعد تغيير native، البصمة اتغيرت، فالـ update مش هيوصل لأي تطبيق قديم. محدش يقع.
2. **[[--rollout-percentage]]**: الـ update يوصل لـ ١٠٪ الأول، وتتابع الـ crashes (Sentry مثلًا) قبل ما تزوّد.
3. **[[eas update:republish]]**: لو حاجة باظت، تنشر الـ update اللي قبله تاني كأنه الأحدث.

---

## الخلاصة

| | OTA | build جديد |
|---|---|---|
| JS، ستايل، نصوص، صور | ✓ | |
| مكتبة JS بس | ✓ | |
| مكتبة فيها native، أو ترقيتها | | ✓ |
| صلاحية، أيقونة، splash، اسم، package | | ✓ |
| ترقية Expo SDK أو RN | | ✓ |

- السؤال الصح: «التغيير ده بيلمس ملف native؟» ولو مش متأكد، [[fingerprint:generate]] قبل وبعد.
- OTA مش بيعدّي على review، بس قواعد المتاجر بتمنع إنك تغيّر الغرض الأساسي للتطبيق بيه.`,
          sol: R`تغيير لون زرار: OTA. إضافة [[expo-camera]]: build (مكتبة native وصلاحية جديدة). تصليح حساب الخصم: OTA. ترقية FlashList من 2.0 لـ 2.3: OTA، لأن FlashList v2 مكتوبة JS بالكامل ومفيهاش native code، والـ fingerprint مبيتغيرش (اتجرّب: نفس الـ hash قبل وبعد الترقية). بس لو المكتبة فيها native code (زي Reanimated أو expo-camera)، أي ترقية حتى minor = build. تغيير اسم التطبيق: build (الاسم native في Info.plist و strings.xml). ترجمة جديدة في JSON جوه المشروع: OTA (asset/JS).`
        },
        {
          cmd: "Expo ولا bare",
          title: "«Expo ولا React Native CLI (bare)؟ ومش Expo بيقيّدك؟»",
          desc: R`إجابة في دقيقة: «Expo هو الـ framework الموصى بيه رسميًا من فريق React Native. الفكرة القديمة إن Expo بيقيّدك كانت صحيحة أيام Expo Go بس. دلوقتي مع development builds و config plugins تقدر تستخدم أي مكتبة native، وتكتب native modules بنفسك بـ Expo Modules API (Swift و Kotlin)، ولو محتاج تعدّل حاجة native بتكتب config plugin. ومعاك Expo Router و EAS Build و Update. الـ bare لسه منطقي لو عندك تطبيق native موجود بتضيف فيه RN، أو فريق native عايز يمسك الفولدرات بإيده، وحتى هنا تقدر تستخدم مكتبات Expo.»`,
          example: R`# Expo (managed + CNG): app.json + plugins -> prebuild يولّد android/ios
# development build: أي مكتبة native
# Expo Modules API: تكتب native module بـ Swift/Kotlin
# bare: android/ios في Git وانت بتعدّل فيهم بإيدك (وتقدر تستخدم expo modules برضه)
npx create-expo-app@latest
npx @react-native-community/cli init MyApp`,
          try: R`قول الإجابة بصوتك، وبعدين جاوب: «عايز تضيف SDK دفع من بنك محلي ملوش مكتبة RN، هتعمل إيه في مشروع Expo؟»`,
          deep: {
            why: R`سؤال شائع جدًا خصوصًا من ناس خبرتهم RN قديمة. الإجابة بتبين إنك متابع التغييرات (CNG، و development builds، و New Architecture) مش حافظ آراء من ٢٠٢٠.`,
            how: R`نقط أكتر: CNG (Continuous Native Generation) معناه الفولدرات الـ native ناتج مش مصدر، فترقية الـ SDK بقت أسهل بكتير. و Expo Modules API بيدّيك DSL بـ Swift و Kotlin لكتابة modules متوافقة مع الـ New Architecture من غير C++. و config plugin بيعدّل Gradle أو Info.plist أو AppDelegate وقت الـ prebuild. و [[npx expo prebuild]] لو عايز تشوف الفولدرات أو «تطلع» منها. وEAS اختياري: تقدر تعمل build بـ Gradle و Xcode عادي على مشروع Expo.`,
            when: R`أسئلة بتيجي بعدها: «إيه الفرق بين Expo Go والـ development build؟»، و «إيه الـ config plugin؟»، و «إزاي بتعمل upgrade لـ SDK؟» ([[npx expo install expo@latest]] و [[--fix]] وقراية الـ changelog و [[expo-doctor]] وتجربة على build)، و «EAS مجاني؟».`,
            mistakes: R`«Expo مينفعش معاه native code» (معلومة قديمة). و «Expo يعني Expo Go». و «bare أحسن في الأداء» (نفس RN ونفس الأداء). و «لازم EAS مع Expo».`
          },
          teach: R`## الفكرة: الفرق مين ماسك فولدرات [[android]] و [[ios]]

المثال ٤ تعليقات بتلخّص الفرق، وأمرين بيعملوا مشروع بكل طريقة. شغّلت الأمرين على ويندوز وقارنت اللي طلع.

---

## ١. [[Expo (managed + CNG): app.json + plugins -> prebuild يولّد android/ios]]

- **CNG** = Continuous Native Generation: فولدرات [[android]] و [[ios]] **ناتج** بيتولّد من [[app.json]] والـ plugins، مش ملفات بتعدّل فيها. زي [[dist/]] في مشروع ويب.
- [[->]] في التعليق يعني «بيطلّع».

## ٢. [[development build: أي مكتبة native]]

Expo Go تطبيق جاهز فيه مكتبات native معيّنة بس. الـ development build تطبيقك انت، فيه أي مكتبة native ضفتها، وبيوصل بـ Metro زي Expo Go. ده اللي شال فكرة «Expo بيقيّدك».

## ٣. [[Expo Modules API: تكتب native module بـ Swift/Kotlin]]

لو محتاج حاجة native مالهاش مكتبة، بتكتبها بنفسك بـ Kotlin و Swift من غير C++. وبيتعمل بأمر واحد جوه المشروع:

~~~text من npx create-expo-module@latest --help
--local    Whether to create a local module in the current project, skipping installing
           node_modules and creating the example directory. (default: false)
~~~

[[--local]] يعني الـ module يتعمل جوه مشروعك نفسه (فولدر [[modules/]]) مش كباكدج منفصلة على npm.

## ٤. [[bare: android/ios في Git وانت بتعدّل فيهم بإيدك]]

**bare** = المشروع فيه الفولدرات الـ native كملفات مصدر في Git، وأي ترقية لـ RN معناها تدمج تغييرات في الملفات دي بإيدك. وتقدر برضه تستخدم مكتبات Expo فيه.

---

## ٥. الأمرين جنب بعض

### [[npx create-expo-app@latest]]

- [[npx]]: نزّل الباكدج وشغّلها من غير تسطيب.
- [[@latest]]: آخر نسخة.

~~~text الناتج (آخره)
✅ Your project is ready!
~~~

~~~text package.json (مختصر)
"main": "expo-router/entry",
"expo": "~57.0.27",
"react-native": "0.86.3",
"scripts": { "android": "expo start --android", ... }
~~~

مفيش فولدر [[android]] ولا [[ios]]. ولو عملت [[npx expo prebuild --platform android]] بيتولّد، و [[package.json]] بيتغيّر لـ [[expo run:android]].

### [[npx @react-native-community/cli init MyApp]]

- [[@react-native-community/cli]]: أداة RN الرسمية من غير framework.
- [[init MyApp]]: اعمل مشروع اسمه MyApp.

شغّلته بـ [[--skip-install --skip-git-init]] (من غير [[npm install]] ولا git) عشان أشوف الملفات بس:

~~~text الناتج
Welcome to React Native 0.87.1!
✔ Downloading template
✔ Copying template
✔ Processing template
✔ Dependencies installation skipped
~~~

~~~text الملفات
App.tsx  Gemfile  README.md  __tests__  android  app.json  babel.config.js
index.js  ios  jest.config.js  metro.config.js  package.json  tsconfig.json
~~~

فولدرات [[android]] و [[ios]] موجودة من الأول (٣٦ ملف)، منهم [[MainActivity.kt]] و [[build.gradle]] و [[gradlew]]. دول بقوا مسؤوليتك. و [[Gemfile]] عشان CocoaPods (أداة مكتبات iOS) على الماك.

| | Expo (CNG) | bare |
|---|---|---|
| [[android]] و [[ios]] | بيتولّدوا ومش في Git | ملفات مصدر في Git |
| تعديل native | config plugin | تعدّل الملف بإيدك |
| ترقية | [[npx expo install expo@latest --fix]] و prebuild | تدمج تغييرات الـ template بإيدك |
| Router و Updates و Modules API | جاهزين | تضيفهم لو عايز |
| الأداء | نفس RN | نفس RN |

لاحظ إن RN في Expo SDK 57 كان 0.86.3 والـ CLI طلّع 0.87.1: كل SDK بيثبّت نسخة RN متجرّبة معاه، والنسخة الأحدث بتيجي في الـ SDK الجاي.

---

## الخلاصة

- Expo مش Expo Go. مع development builds و config plugins و Expo Modules API تقدر تعمل أي حاجة native.
- الفرق الحقيقي: CNG (الـ native ناتج) قدام bare (الـ native ملفات انت ماسكها).
- bare منطقي لو بتضيف RN لتطبيق native موجود أو فريقك native.
- EAS اختياري: مشروع Expo يتبني بـ Gradle و Xcode عادي.`,
          lines: [
            "مشروع Expo (الموصى بيه).",
            "مشروع RN من غير framework (نادرًا ما تحتاجه)."
          ],
          sol: R`SDK دفع ملوش مكتبة RN في مشروع Expo: (١) أكتب Expo Module صغير بـ Kotlin و Swift بيلف الـ SDK بتاع البنك ([[npx create-expo-module --local]])، ويعرض لـ JS دالة زي [[startPayment(amount)]]. (٢) لو الـ SDK محتاج إعدادات في Gradle أو Info.plist، أكتب config plugin (أو الـ module نفسه يجي بواحد). (٣) development build عشان أجرّب. مفيش حاجة من دي محتاجة أسيب Expo أو أعدّل في فولدر android بإيدي.`
        }
      ]
    }
]);

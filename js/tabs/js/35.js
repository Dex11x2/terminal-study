// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "توصل للإجابة بنفسك في JavaScript",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تستخدم الـ console كأداة تحقيق، مش [[console.log]] وبس.`,
        R`تسأل أي كائن عن نفسه: نوعه، وصفاته، وجه منين.`,
        R`تقرا رسالة الخطأ وتعرف منها السطر والسبب.`,
        R`تربط الخطأ بسببه بـ [[cause]] بدل ما تضيّعه.`,
      ],
      use: {
        prog: R`الـ console فيه ١٥ دالة، وأغلب الناس بتستخدم واحدة. والباقي بيختصر وقت التشخيص لنص.`,
        work: R`رسالة الخطأ في JavaScript بتقولك **اسم المتغير** اللي كان [[undefined]]. وده نص الإجابة.`,
        cs: R`الـ prototype chain هو إزاي JavaScript بيلاقي الصفات. وفهمه بيخلي [[undefined is not a function]] تبقى سؤال ليه إجابة.`,
      },
      lab: R`mkdir -p ~/lab/jslab && cd ~/lab/jslab && npm init -y`,
      projects: [
        { lvl: 'صغير', t: R`جدول بدل عشرين سطر`, what: R`خد أي مصفوفة كائنات في مشروعك و [[console.table]] عليها. وبعدين [[console.table(rows, ['اسم','سعر'])]] بالأعمدة اللي تهمك. من درس «الـ console أكبر من log».`, done: R`الجدول بيطلع بعمود [[(index)]] وبالأعمدة اللي اخترتها بس، وكل كائن في صف، ومسحت كل [[console.log]] اللي كانت بتطبع نفس الداتا سطر سطر.` },
        { lvl: 'صغير', t: R`قيس بدل ما تخمّن`, what: R`[[console.time]] و [[console.timeEnd]] حوالين الحتة اللي بتشك إنها بطيئة. وبعدين [[console.timeLog]] في النص عشان تعرف الوقت راح فين بالظبط.`, done: R`عندك ٣ أرقام على الأقل لنفس العداد (اتنين [[timeLog]] و [[timeEnd]])، وعرفت أنهي خطوة واخدة أكبر وقت وكاتبها في تعليق برقمها.` },
        { lvl: 'متوسط', t: R`اربط أخطاءك`, what: R`في أي [[catch]] عندك بترمي خطأ جديد، ضيف [[{ cause: e }]]. وبعد أسبوع هتلاقي أخطاءك بتقول السبب الحقيقي بدل «حصل خطأ». من درس «اقرا رسالة الخطأ في JavaScript».`, done: R`مفيش [[throw new Error]] جوه [[catch]] في المشروع من غير [[cause]] (دوّرت بالبحث في المحرر)، ولما تكسر حاجة عن قصد، الخطأ اللي بيوصل فيه السبب الأصلي ومكانه.` },
        { lvl: 'متوسط', t: R`مترجم رسايل الأخطاء`, what: R`[[explain(e)]] بتاخد أي خطأ وترجّع نصيحة بالعربي حسب [[e.name]] وشكل الرسالة: [[reading 'x']] يبقى «اللي قبل [[.x]] كان undefined أو null»، و [[is not a function]] يبقى «اتأكد من الاسم والاستيراد»، و [[is not defined]] يبقى «الاسم مش متعرّف». من الدرسين.`, done: R`٦ أخطاء حقيقية (عملتها بإيدك بـ [[try]]) كل واحد بيطلع النصيحة الصح واسم المتغير أو الصفة من الرسالة نفسها، والخطأ اللي مش معروف بيرجّع رسالة عامة ومعاها النص الأصلي، ولو الخطأ فيه [[cause]] النصيحة بتتقال للسبب كمان.` },
        { lvl: 'كبير', t: R`صندوق تشخيص لأي سكربت`, what: R`[[debug.js]] بيعمل export لـ [[log]] و [[table]] و [[time]] اللي بيشتغلوا بس لو [[process.env.DEBUG]] بـ [[1]]، و [[run(main)]] بيلف الدالة الأساسية: لو رمت يطبع السلسلة كلها بـ [[printChain]] ويحط [[process.exitCode = 1]]. من الوحدة دي ومن وحدات الدوال والأخطاء.`, done: R`من غير [[DEBUG]] السكربت مبيطبعش غير الأخطاء، ومعاه بيطبع الجداول والأوقات. وخطأ فيه ٣ مستويات [[cause]] بيطبع ٣ سطور وكود الخروج ١. ومعاه [[check.mjs]] بـ [[node:assert]] بيتأكد إن [[printChain]] بتقف على الدايرة، والسكربت بيتشغّل مرتين ورا بعض من غير مشاكل.`, ext: R`زوّد مستويات (warn و error)، ووقت لكل سطر، وكتابة في ملف لوج، وحوّله لـ package تستخدمه في كل مشاريعك.` },
        { lvl: 'فكرة', t: R`دليل أعطال مشروعك`, what: R`كل مرة مشروعك يقع، سجّل الرسالة بنصها، والسبب الحقيقي، والتصليح، والسطر اللي كان المفروض يمسكه. انت اللي بتختار الشكل (صفحة، أو ملف JSON، أو أداة بتدوّر فيه).`, done: R`فيه ١٠ أعطال حقيقية على الأقل، وكل واحد فيه الرسالة الأصلية والسبب والتصليح، وتقدر تدوّر فيهم بكلمة من الرسالة.`, ext: R`اربطه بـ [[explain]] عشان لما خطأ يحصل تاني يقولك «حصل قبل كده، والتصليح كان كذا».` },
      ],
      n: R`JavaScript بيدّيك أدوات تسأله بيها، ورسايل أخطاء بتقول السبب. القسم ده عن استخدامهم بدل التخمين`,
      items: [
        {
          cmd: "الـ console أكبر من log",
          title: "table و group و time و count",
          learn: R`تستخدم دوال الـ console اللي بتختصر وقت التشخيص.`,
          out: R`جدول بدل عشرين سطر، وقياس بدل تخمين.`,
          use: {
            prog: R`[[console.table]] على مصفوفة كائنات بتوريك البيانات كجدول — وده بيكشف الصف الشاذ في لمحة.`,
            work: R`[[console.time]] بتجاوب على «إيه البطيء» في سطرين، من غير أي أداة.`,
          },
          desc: R`الـ console فيه حوالي ١٥ دالة، وأغلب الناس بتستخدم [[log]] بس. والباقي بيوفّر وقت حقيقي:

**[[console.table(rows)]]** بتعرض مصفوفة كائنات كـ**جدول**. وبتاخد عمود تاني: [[console.table(rows, ['اسم','سعر'])]] بتعرض الأعمدة دي بس.

**[[console.group]]** و [[console.groupEnd]]** بيعملوا تداخل في الناتج. مفيدين لما تكون بتسجّل حاجة ليها مستويات (طلب فيه عناصر، أو دالة بتنادي دوال).

**[[console.time]]** و [[console.timeEnd]]** بيقيسوا الوقت بين نقطتين. و [[console.timeLog]] بتطبع الوقت الحالي من غير ما توقف العداد.

**[[console.count]]** بتعد كام مرة السطر ده اتنفّذ. مفيدة أوي لما تشك إن دالة بتتنادى أكتر من اللازم.

**[[console.assert(cond, msg)]]** بتطبع بس لو الشرط غلط. أهدأ من [[if]].

**[[console.trace()]]** بتطبع سلسلة النداءات من غير ما ترمي خطأ. بتجاوب على «مين نادى الدالة دي؟».

**[[console.dir(obj, { depth: null })]]** في Node بتعرض الكائن كامل مهما كان متداخل. [[console.log]] بتقف عند مستوى معيّن وبتكتب [[[Object]]].`,
          example: R`const rows = [
  { اسم: 'لابتوب', سعر: 15000, عدد: 2 },
  { اسم: 'ماوس',   سعر: 250,   عدد: 10 },
  { اسم: 'شاشة',   سعر: 4200,  عدد: 3 },
];

console.table(rows);
console.table(rows, ['اسم', 'سعر']);

console.group('الطلب #12');
console.log('العميل: أحمد');
console.groupEnd();

for (const r of rows) console.count('صف');

console.time('المعالجة');
rows.map(r => r.سعر * r.عدد);
console.timeEnd('المعالجة');`,
          lines: [
            R`array فيها objects بنفس المفاتيح، وده الشكل اللي [[console.table]] بتعرضه أحسن حاجة: كل object صف، وكل مفتاح عمود.`,
            R`أول صف: object بتلات مفاتيح ([[اسم]] و [[سعر]] و [[عدد]]). المفاتيح بالعربي عادي، JS بتقبلها أسامي خصايص.`,
            R`صف تاني بنفس المفاتيح. المسافات الزيادة بعد الفصلات بس عشان الأعمدة تبان متظبطة في الكود، ومالهاش أي تأثير على الناتج.`,
            R`صف تالت بنفس الشكل. لو صف ناقصه مفتاح، الخانة بتاعته في الجدول بتطلع فاضية.`,
            R`نهاية الـ array.`,
            R`[[console.table]] بترسم جدول فيه عمود [[(index)]] برقم كل صف، وبعده عمود لكل مفتاح. أسهل بكتير من [[console.log]] اللي بتطبع objects ورا بعض وصعب تقارن بينها.`,
            R`التاني array بأسامي الأعمدة اللي عايزها بس، فالجدول بيطلع [[اسم]] و [[سعر]] من غير [[عدد]]. مفيد لما الـ objects فيها مفاتيح كتير وانت مهتم باتنين.`,
            R`[[console.group]] بيطبع العنوان ده، وكل اللي بيتطبع بعده بيتزاح لجوه لحد [[groupEnd]]. بيخلي logs العملية الواحدة متجمعة ومتتلخبطش مع غيرها.`,
            R`السطر ده بيطلع مزاح تحت عنوان «الطلب #12»، فتعرف وانت بتقرا إنه تبع الطلب ده.`,
            R`[[groupEnd]] بيقفل آخر group مفتوح، واللي بعده يرجع لأول السطر. لو نسيته كل الـ logs اللي بعده هتفضل مزاحة.`,
            R`[[console.count]] بتطبع الـ label ومعاه عدد المرات اللي السطر ده اتنفّذ: [[صف: 1]] و [[صف: 2]] و [[صف: 3]]. بتعرّفك دالة اتنادت كام مرة من غير ما تعمل عدّاد بإيدك، و [[countReset]] بترجّعه من الأول.`,
            R`[[console.time]] بتبدأ ساعة باسم [[المعالجة]]. ممكن تشغّل كذا ساعة مع بعض بأسامي مختلفة.`,
            R`الشغل اللي عايز تقيس وقته: هنا بنحسب إجمالي كل صف. أي كود بين [[time]] و [[timeEnd]] بيتحسب.`,
            R`[[console.timeEnd]] بتوقف الساعة وتطبع الوقت زي [[المعالجة: 0.05ms]]. **نفس الاسم** لازم يتكرر بالظبط؛ لو اختلف حرف هتطلع warning إن مفيش label بالاسم ده ومش هيتطبع وقت.`,
          ],
          try: R`خد مصفوفة كائنات من مشروعك وجرّب [[console.table]] عليها. وبعدين [[console.table(rows, ['عمود'])]]. وبعدين حط [[console.count]] جوه دالة بتشك إنها بتتنادى كتير.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب على ورقة إيه اللي هيتطبع بالظبط (والمسافات) من: [[console.group('A'); console.log('x'); console.group('B'); console.log('y'); console.groupEnd(); console.groupEnd(); console.log('z')]]، وبعدين [[f(); f(); f(); console.countReset('صف'); f()]] لو [[f]] جواها [[console.count('صف')]].`, done: R`شغّلته في Node وطابق ورقتك: [[x]] قبلها مسافتين، و [[y]] أربعة، و [[z]] من غير مسافات، والعداد طبع [[صف: 1]] و [[صف: 2]] و [[صف: 3]] وبعد الـ reset [[صف: 1]] تاني.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية الشكل:** اعمل مصفوفة ٨ طلبات زي رد API (فيها [[id]] و [[total]] و [[status]])، وحط فيهم غلطتين: [[total: -2]] وطلب من غير [[id]]. اكتب [[checkOrders(rows)]] بتعمل [[console.assert]] على كل صف، وفي الآخر [[console.table]] للصفوف البايظة بس بعمودين.`, done: R`بيطلع سطرين [[Assertion failed]] بالظبط (واحد لكل غلطة)، والجدول فيه الصفين دول بس وفيه عمود [[(index)]] والعمودين اللي اخترتهم، والصفوف السليمة مبتطبعش ولا حاجة.` },
            { lvl: 'تحدي', t: R`**ابني أداة:** [[traced(fn, label)]] بترجّع دالة جديدة بتعمل [[console.group(label)]] و [[console.count(label)]] قبل النداء، و [[console.groupEnd()]] في [[finally]] حتى لو الدالة رمت. جرّبها على [[fib]] التكرارية الملفوفة نفسها.`, done: R`[[fib(5)]] بترجّع [[5]] والعداد وصل [[15]] نداء، وكل نداء داخلي مزاح مسافتين أكتر من اللي ناداه. ولو خليت الدالة ترمي، السطر اللي بتطبعه بعد الـ [[catch]] بيبدأ من غير مسافات (يعني [[groupEnd]] اتنادت).` },
          ],
          flag: "console",
          deep: {
            why: R`عشرين [[console.log]] في لوب بيدّوا ناتج مش بيتقري. وجدول واحد بيكشف الصف الشاذ في لمحة.`,
            how: R`**[[console.table]]** بتشتغل على مصفوفة كائنات (كل كائن صف، والمفاتيح أعمدة) أو على كائن كائنات (المفاتيح تبقى الـ index). ولو العناصر قيم بسيطة، بتعمل عمود واحد اسمه [[Values]].

وعمود [[(index)]] بيتولّد لوحده: رقم الصف في المصفوفة، أو المفتاح في الكائن.

**[[console.time]]** بتستخدم ساعة عالية الدقة. و**الاسم لازم يتطابق** بين [[time]] و [[timeEnd]] — ولو مش متطابق، بيطلّع تحذير ومبيطبعش.

ولو محتاج دقة أعلى: [[performance.now()]] بترجّع رقم بالملي ثانية بكسور، وتقدر تحسب الفرق بنفسك.

**[[console.dir]]** في Node بتاخد [[{ depth: null }]] عشان تعرض كل المستويات. و [[console.log]] بتقف عند عمق ٢ افتراضيًا وبتكتب [[[Object]]]. وتقدر تغيّر الافتراضي: [[util.inspect.defaultOptions.depth = null]].

وفي المتصفح، [[console.dir]] بتعرض الكائن كشجرة قابلة للفتح، و [[console.log]] على عنصر DOM بتعرضه كـ HTML — فـ [[dir]] هي اللي تستخدمها لو عايز تشوف صفات العنصر.

**[[console.trace]]** بتطبع الـ stack من غير ما ترمي. والفرق عن [[new Error().stack]] إنها بتطبع على طول وبتتنسّق في DevTools.

**وفي الإنتاج**: الـ console في Node بيكتب على stdout/stderr، وده **متزامن** على الملفات في بعض الأنظمة. فلوب فيها [[console.log]] آلاف المرات بتبطّأ البرنامج فعلًا. استخدم مكتبة لوج (زي [[pino]]) في الإنتاج.`,
            when: R`[[table]] مع أي مصفوفة كائنات. و [[count]] أول ما تشك في عدد النداءات. و [[time]] قبل ما تفترض إن حاجة بطيئة.`,
            mistakes: R`تستخدم [[log]] في لوب بدل [[table]] بعد اللوب. أو تكتب اسم مختلف في [[timeEnd]]. أو تسيب [[console.log]] في لوب كبيرة في الإنتاج.`
          },
          teach: R`## خمستاشر دالة، وانت بتستخدم واحدة

---

## ١. [[console.table]]

~~~js Node 24
const rows = [
  { اسم: 'لابتوب', سعر: 15000, عدد: 2 },
  { اسم: 'ماوس',   سعر: 250,   عدد: 10 },
  { اسم: 'شاشة',   سعر: 4200,  عدد: 3 },
];
console.table(rows);
~~~

~~~text الناتج (اتشغّل فعلًا)
┌─────────┬──────────┬───────┬─────┐
│ (index) │ اسم      │ سعر   │ عدد │
├─────────┼──────────┼───────┼─────┤
│ 0       │ 'لابتوب' │ 15000 │ 2   │
│ 1       │ 'ماوس'   │ 250   │ 10  │
│ 2       │ 'شاشة'   │ 4200  │ 3   │
└─────────┴──────────┴───────┴─────┘
~~~

وبأعمدة محددة:

~~~js
console.table(rows, ['اسم', 'سعر']);
~~~

~~~text الناتج (اتشغّل فعلًا)
┌─────────┬──────────┬───────┐
│ (index) │ اسم      │ سعر   │
├─────────┼──────────┼───────┤
│ 0       │ 'لابتوب' │ 15000 │
│ 1       │ 'ماوس'   │ 250   │
│ 2       │ 'شاشة'   │ 4200  │
└─────────┴──────────┴───────┘
~~~

> عمود [[(index)]] بيتولّد لوحده. ولو مررت كائن بدل مصفوفة، بيبقى المفاتيح.

---

## ٢. [[console.group]]

~~~js
console.group('الطلب #12');
console.log('العميل: أحمد');
console.group('العناصر');
console.log('لابتوب × 2');
console.groupEnd();
console.groupEnd();
~~~

~~~text الناتج (اتشغّل فعلًا)
الطلب #12
  العميل: أحمد
  العناصر
    لابتوب × 2
~~~

وفي المتصفح، المجموعات بتبقى **قابلة للطي**.

---

## ٣. [[console.count]]: الدالة دي بتتنادى كام مرة؟

~~~js
for (const r of rows) console.count('صف');
~~~

~~~text الناتج (اتشغّل فعلًا)
صف: 1
صف: 2
صف: 3
~~~

حطها جوه دالة بتشك إنها بتتنادى أكتر من اللازم. الرقم بيجاوب على طول.

---

## ٤. [[console.time]]: قيس بدل ما تخمّن

~~~js
console.time('المعالجة');
// ... الشغل
console.timeLog('المعالجة', 'بعد التحميل');   // بتطبع من غير ما توقف
// ... شغل تاني
console.timeEnd('المعالجة');
~~~

> **الاسم لازم يتطابق** بين [[time]] و [[timeEnd]]. ولو مش متطابق، بيطلّع تحذير ومبيطبعش.

---

## ٥. [[console.dir]] لما [[log]] تقول [[[Object]]]

~~~js المشكلة
console.log(deepObject);
// { a: { b: { c: [Object] } } }
~~~

~~~js الحل في Node
console.dir(deepObject, { depth: null });
~~~

[[console.log]] بتقف عند عمق **٢** افتراضيًا. و [[{ depth: null }]] بتعرض الكل.

~~~js أو غيّر الافتراضي مرة واحدة
import util from 'node:util';
util.inspect.defaultOptions.depth = null;
~~~

وفي المتصفح، [[console.dir]] على عنصر DOM بتعرض **صفاته**، و [[console.log]] بتعرضه كـ HTML.

---

## ٦. والباقي

| الدالة | بتعمل إيه |
|---|---|
| [[console.assert(c, m)]] | تطبع **بس لو الشرط غلط** |
| [[console.trace()]] | تطبع سلسلة النداءات من غير ما ترمي |
| [[console.warn]] / [[error]] | بتروح على **stderr** في Node |
| [[console.groupCollapsed]] | مجموعة مطوية (في المتصفح) |

[[console.trace]] بتجاوب على «مين نادى الدالة دي؟» من غير debugger.

---

## ٧. وفي الإنتاج

[[console.log]] في Node بيكتب على stdout، وده **متزامن** على الملفات في بعض الأنظمة. فلوب فيها آلاف الطباعات بتبطّأ البرنامج فعلًا.

في الإنتاج استخدم مكتبة لوج (زي [[pino]]) — بتكتب غير متزامن وبتطلّع JSONL تقدر تقراه بأداة (زي [[jl]] في مشروع node).

---

## الخلاصة

- [[table]] لأي مصفوفة كائنات.
- [[count]] لعدد النداءات، و [[time]] للوقت.
- [[dir(x, { depth: null })]] لما تشوف [[[Object]]].
- [[trace]] لـ «مين ناداني؟».
- [[console.log]] مش للإنتاج.`,
          sol: R`[[console.table]] بناتجها الحقيقي، و [[group]] و [[count]].`,
          solCode: R`console.table(rows);
// ┌─────────┬──────────┬───────┬─────┐
// │ (index) │ اسم      │ سعر   │ عدد │
// ├─────────┼──────────┼───────┼─────┤
// │ 0       │ 'لابتوب' │ 15000 │ 2   │
// │ 1       │ 'ماوس'   │ 250   │ 10  │
// │ 2       │ 'شاشة'   │ 4200  │ 3   │
// └─────────┴──────────┴───────┴─────┘

console.group('الطلب #12');
console.log('العميل: أحمد');
//   الطلب #12
//     العميل: أحمد

for (const r of rows) console.count('صف');
// صف: 1
// صف: 2
// صف: 3

// (اتشغّلوا فعلًا على Node 24.22.1)`
        },

        {
          cmd: "اقرا رسالة الخطأ في JavaScript",
          title: "الرسالة بتقول اسم المتغير، و cause بتربط السبب",
          learn: R`تفك الأخطاء الشائعة من رسالتها، وتربط الخطأ بسببه.`,
          out: R`تحل أغلب أخطاء JavaScript من السطر الأول.`,
          use: {
            prog: R`[[Cannot read properties of undefined (reading 'name')]] بتقولك حاجتين: اللي قبل النقطة [[undefined]]، واللي بعدها [[name]]. ودول نص الإجابة.`,
            work: R`الخطأ اللي بيترمي من غير [[cause]] بيضيّع السبب الحقيقي. وبعد شهر بتلاقي «حصل خطأ» في اللوج ومعرفش ليه.`,
            cs: R`سلسلة الأسباب (exception chaining) موجودة في كل لغة. وفي JavaScript اسمها [[cause]]، وهي من ES2022.`,
          },
          desc: R`أخطاء JavaScript أوضح مما الناس فاكرة. المشكلة إن الناس بتقرا آخر سطر بس.

**الأخطاء اللي هتقابلها:**

[[TypeError: Cannot read properties of undefined (reading 'name')]] — حاولت تقرا [[.name]] من حاجة قيمتها [[undefined]]. والرسالة بتقولك **اسم الصفة** اللي حاولت تقراها، فده بيحدد السطر.

[[TypeError: o.a is not a function]] — [[o.a]] موجودة بس مش دالة. غالبًا خطأ في الاسم أو في الاستيراد.

[[ReferenceError: x is not defined]] — الاسم ده مش موجود خالص. غير [[undefined]]: دي قيمة، ودي اسم مش معرّف.

[[SyntaxError: Expected property name or '}' in JSON at position 1]] — JSON مكسور، **والموضع فيه**.

**والفرق بين [[TypeError]] و [[ReferenceError]] مهم:**

[[undefined.x]] → [[TypeError]]: المتغير موجود وقيمته [[undefined]].
[[notDeclared]] → [[ReferenceError]]: الاسم نفسه مش موجود.

**و [[cause]]** (من ES2022) بتربط الخطأ بسببه:

[[throw new Error('ملف الإعدادات مكسور', { cause: e })]]

وبعدها [[e.cause]] فيها الخطأ الأصلي كامل. من غيرها، لو مسكت [[SyntaxError]] ورميت [[Error]] جديد، السبب الحقيقي بيضيع.`,
          example: R`// الأخطاء الشائعة
const u = undefined;  u.name;          // TypeError
const n = null;       n.name;          // TypeError
const o = { a: 1 };   o.a();           // TypeError
notDefinedAnywhere;                     // ReferenceError
JSON.parse('{bad}');                    // SyntaxError

// و cause بتربط الخطأ بسببه
try {
  JSON.parse('{bad}');
} catch (e) {
  throw new Error('ملف الإعدادات مكسور', { cause: e });
}`,
          lines: [
            R`[[u]] قيمته [[undefined]] وبنقرا منه [[name]]، فالرسالة [[Cannot read properties of undefined (reading 'name')]]. اقراها كده: كنت بتقرا [[name]]، واللي قبل النقطة كان [[undefined]]. فدوّر ليه المتغير ده فاضي، مش على [[name]].`,
            R`نفس المشكلة بس القيمة [[null]]، فالرسالة بتقول [[of null]] بدل [[of undefined]]. الفرق ده بيدلّك: [[null]] غالبًا جاية من [[querySelector]] ملقاش العنصر أو API رجّع null، و [[undefined]] غالبًا متغير مالوش قيمة أو خاصية مش موجودة.`,
            R`[[o.a]] موجودة بس قيمتها [[1]] مش دالة، فلما تحط [[()]] بعدها الرسالة [[o.a is not a function]]. الرسالة بتقولك الاسم اللي ناديته بالظبط، فاطبع قيمته أو [[typeof]] بتاعه وشوف هو إيه فعلًا.`,
            R`اسم عمره ما اتعرّف بـ [[let]] أو [[const]] أو [[function]] في أي مكان، فده [[ReferenceError]] برسالة [[notDefinedAnywhere is not defined]]. غالبًا غلطة إملائية في الاسم، أو متغير متعرّف في scope تاني.`,
            R`JSON مكسور: المفاتيح في JSON لازم بين علامات تنصيص مزدوجة. الرسالة [[Expected property name or '}' in JSON at position 1]] بتقولك المكان بالظبط: الحرف رقم 1 (العد من صفر)، يعني [[b]].`,
            R`[[try]] حوالين الحاجة اللي ممكن ترمي، عشان نمسكها ونضيف عليها معلومة تفهّم اللي هيقرا.`,
            R`نفس الـ parse البايظ: هيرمي SyntaxError والتنفيذ ينط على [[catch]].`,
            R`[[catch]] بتمسك الـ SyntaxError في [[e]].`,
            R`بنرمي error جديد برسالة بتقول **إيه** اللي باظ من ناحية التطبيق (ملف الإعدادات)، و [[{ cause: e }]] بتربطه بالأصلي. من غيرها اللي يقرا الـ log هيشوف «ملف الإعدادات مكسور» بس وميعرفش السبب؛ معاها Node بيطبع الـ SyntaxError الأصلي تحت كلمة [[cause]].`,
            R`نهاية الـ catch.`,
          ],
          try: R`شغّل كل سطر لوحده في [[node -e]] واقرا الرسالة. وبعدين جرّب [[cause]]: ارمي خطأ من جوه [[catch]] مرة بيها ومرة من غيرها، وقارن اللي بيوصل للي بره.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب [[errorKind(fn)]] بتنادي الدالة جوه [[try]] وترجّع [[e.name]] أو [[ok]]. قبل ما تشغّل، اكتب توقعك لـ [[() => undefined.x]] و [[() => notDefined]] و [[() => JSON.parse('{bad}')]] و [[() => null()]] و [[() => 1]].`, done: R`الناتج: [[TypeError]] و [[ReferenceError]] و [[SyntaxError]] و [[TypeError]] و [[ok]]، ومكتوب جنب كل واحدة الفرق في سطر (القيمة [[undefined]] غير الاسم اللي مش موجود).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[function parseConfig(t) { try { return JSON.parse(t); } catch (e) { throw new Error('الإعدادات مكسورة'); } }]]. اللوج في الإنتاج بيقول «الإعدادات مكسورة» بس ومحدش عارف فين. صلّحها من غير ما تشيل الرسالة العربي.`, done: R`بعد التصليح: [[e.cause instanceof SyntaxError]] بترجّع [[true]]، و [[e.cause.message]] فيها [[at position 1]] لما تبعت [[{bad}]]. ولو سبت الخطأ يطلع من غير [[catch]]، Node بيطبع السبب تحت الرسالة في سطر فيه [[cause]] و [[SyntaxError]].` },
            { lvl: 'تحدي', t: R`**ابني ومسألة:** [[class ValidationError extends Error]] فيها [[field]]، وسلسلة ٣ مستويات بـ [[cause]] (ValidationError ← Error ← SyntaxError). واكتب [[printChain(e)]] بتمشي على [[cause]] وتطبع كل مستوى في سطر.`, done: R`بتطبع ٣ سطور بالترتيب من برا لجوه بالشكل [[Name: message]]، ولو [[cause]] نص بتطبعه زي ما هو وتقف، ولو فيه دايرة (خطأ [[cause]] بتاعه هو نفسه) بتقف بعد ١٠ مستويات بدل ما تعلّق.` },
          ],
          flag: "console",
          deep: {
            why: R`الوقت اللي بيضيع في نسخ الرسالة في جوجل أطول من قرايتها. والرسالة بتقولك اسم الصفة واسم المتغير.`,
            how: R`**[[Cannot read properties of undefined (reading 'x')]]** جزئين:

[[undefined]] — **نوع** الحاجة اللي على اليسار.
[[reading 'x']] — **اسم** الصفة اللي حاولت تقراها.

فلو السطر فيه [[a.b.c.d]]، الرسالة بتقولك أنهي واحدة هي الـ [[undefined]] عن طريق اللي بعدها.

**والحل المعتاد**: [[?.]] (optional chaining). [[a?.b?.c]] بترجّع [[undefined]] بدل ما ترمي. بس **خد بالك**: دي بتخفي المشكلة أحيانًا — لو [[a]] المفروض تكون موجودة، الـ [[?.]] بتخلي الخطأ يظهر بعدين وفي مكان تاني.

**[[TypeError]] مقابل [[ReferenceError]]**:

| الحالة | النوع |
|---|---|
| المتغير موجود وقيمته [[undefined]] | [[TypeError]] |
| الاسم مش معرّف خالص | [[ReferenceError]] |
| متغير [[let]] قبل سطر تعريفه | [[ReferenceError: Cannot access 'x' before initialization]] |

والأخيرة دي اسمها temporal dead zone، وبتحصل مع [[let]] و [[const]] مش [[var]].

**[[cause]]** من ES2022، ومدعومة في Node 16.9+ وكل المتصفحات الحديثة. وبتتعرض في الـ stack trace تلقائيًا في Node:

~~~text
Error: ملف الإعدادات مكسور
    at ...
  [cause]: SyntaxError: Expected property name or '}' in JSON at position 1
~~~

**وكلاسات الأخطاء بتاعتك**: ورّث من [[Error]] وحط [[this.name]]:

~~~text
class HttpError extends Error {
  constructor(status) { super($__btHTTP $__{status}$__bt); this.name = 'HttpError'; this.status = status; }
}
~~~

و [[instanceof]] بتشتغل عليها، فتقدر تفرّق بين أنواع الفشل في [[catch]]. (ودي اللي هنبنيها في المشروع.)

**و [[Error.captureStackTrace]]** في Node بتشيل الـ constructor من الـ stack، فالسطر الأول يبقى مكان الرمي الحقيقي.`,
            when: R`كل خطأ. و [[cause]] في أي [[catch]] بترمي منه خطأ جديد.`,
            mistakes: R`تحط [[?.]] في كل مكان فتخفي المشاكل بدل ما تحلها. أو ترمي خطأ جديد من غير [[cause]] فتضيّع السبب. أو تخلط بين [[TypeError]] و [[ReferenceError]] وتدوّر في المكان الغلط.`
          },
          teach: R`## الرسالة بتقول أكتر مما تفتكر

~~~text اتشغّلوا فعلًا · Node 24
undefined.x      -> TypeError: Cannot read properties of undefined (reading 'name')
null.x           -> TypeError: Cannot read properties of null (reading 'name')
مش دالة          -> TypeError: o.a is not a function
متغير مش معرّف   -> ReferenceError: notDefinedAnywhere is not defined
JSON غلط         -> SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

---

## ١. فك أول رسالة

~~~text
Cannot read properties of undefined (reading 'name')
                          ^^^^^^^^^           ^^^^
                          نوع اللي            الصفة اللي
                          على اليسار          حاولت تقراها
~~~

فلو السطر [[user.profile.name]]:

- [[reading 'name']] معناها إن [[user.profile]] هي الـ [[undefined]].
- **مش** [[user]] — لو [[user]] كانت undefined، الرسالة كانت هتقول [[reading 'profile']].

**الرسالة بتحدد الحلقة المكسورة في السلسلة.**

---

## ٢. [[TypeError]] مقابل [[ReferenceError]]

| الحالة | النوع | معناه |
|---|---|---|
| [[u.x]] و [[u === undefined]] | [[TypeError]] | المتغير موجود، قيمته فاضية |
| [[notDeclared]] | [[ReferenceError]] | **الاسم مش موجود خالص** |
| [[let]] قبل سطر تعريفه | [[ReferenceError]] | temporal dead zone |

الفرق بيحدد مكان البحث: الأولى في **البيانات**، والتانية في **الكود**.

~~~text والتالتة شكلها
ReferenceError: Cannot access 'x' before initialization
~~~

وبتحصل مع [[let]] و [[const]] بس، مش [[var]].

---

## ٣. [[?.]] بتحل، وأحيانًا بتخبّي

~~~js
const name = user?.profile?.name;   // undefined بدل ما ترمي
~~~

مفيدة لما الغياب **متوقّع**. وخطر لما يكون مش متوقّع:

~~~js
const id = response?.data?.user?.id;   // لو undefined، هتعرف فين؟
~~~

لو [[response.data]] المفروض تكون موجودة دايمًا، الـ [[?.]] بتخلي الخطأ يظهر **بعدين وفي مكان تاني**. وساعتها التشخيص أصعب.

> القاعدة: [[?.]] للغياب المتوقّع، و**سيب الخطأ يرمي** للغياب اللي معناه بق.

---

## ٤. [[cause]]: متضيّعش السبب

~~~js من غيرها — السبب ضاع
try { JSON.parse(raw); }
catch (e) { throw new Error('ملف الإعدادات مكسور'); }
~~~

~~~js بيها
try { JSON.parse(raw); }
catch (e) { throw new Error('ملف الإعدادات مكسور', { cause: e }); }
~~~

~~~text الناتج (اتشغّل فعلًا)
ملف الإعدادات مكسور
  السبب: SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

**الرسالة بتقول المشكلة، و [[cause]] بتقول السبب.** والاتنين محتاجين بعض: «ملف الإعدادات مكسور» من غير السبب مش بتساعد، و [[SyntaxError at position 1]] من غير السياق مش بتساعد.

و Node بيعرضها في الـ stack تلقائيًا:

~~~text
Error: ملف الإعدادات مكسور
    at loadConfig (...)
  [cause]: SyntaxError: Expected property name or '}' in JSON at position 1
~~~

---

## ٥. وكلاسات أخطاء بتاعتك

~~~js
class HttpError extends Error {
  constructor(status, url) {
    super($__btHTTP $__{status} على $__{url}$__bt);
    this.name = 'HttpError';
    this.status = status;
  }
}
~~~

وبعدها تقدر تفرّق في الـ [[catch]]:

~~~js
catch (e) {
  if (e instanceof HttpError && e.status === 404) { ... }
  else if (e instanceof NetworkError) { ... }
  else throw e;
}
~~~

**و [[else throw e]] مهمة**: اللي متعرفوش رميه تاني، متبلعوش.

ودي بالظبط اللي هنبنيها في المشروع الجاي.

---

## الخلاصة

- [[reading 'x']] بتحدد الحلقة المكسورة.
- [[TypeError]] = بيانات، [[ReferenceError]] = كود.
- [[?.]] للغياب المتوقّع بس.
- [[cause]] في أي [[catch]] بترمي منه.
- كلاسات أخطاء + [[instanceof]] + [[else throw e]].`,
          sol: R`الأخطاء الشائعة برسايلها الحقيقية، و [[cause]] وهي بتحفظ السبب.`,
          solCode: R`// (اتشغّلوا فعلًا على Node 24.22.1)
// undefined.x      -> TypeError: Cannot read properties of undefined (reading 'name')
// null.x           -> TypeError: Cannot read properties of null (reading 'name')
// o.a()            -> TypeError: o.a is not a function
// notDefined       -> ReferenceError: notDefinedAnywhere is not defined
// JSON.parse('{bad}') -> SyntaxError: Expected property name or '}' in JSON at position 1

try {
  try { JSON.parse('{bad}'); }
  catch (e) { throw new Error('ملف الإعدادات مكسور', { cause: e }); }
} catch (e) {
  console.log(e.message);
  console.log('  السبب:', e.cause.name + ':', e.cause.message);
}
// ملف الإعدادات مكسور
//   السبب: SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)`
        },
        {
          cmd: "breakpoints و node --inspect و source maps",
          title: "breakpoint بشرط، و logpoint، و Chrome DevTools على Node، و source maps",
          learn: R`توقّف الكود عند البند الغلط بس، وتطبع من غير ما تعدّل الكود، وتوصّل DevTools بـ Node، وتقرا stack الكود المضغوط بأسطر الملف الأصلي.`,
          out: R`تلاقي البند اللي بيبوّظ الحساب من أول توقّف، والـ stack trace بيشاور على [[src/cart.ts:6]] مش [[dist/cart.js:1:523]].`,
          use: {
            prog: R`درس «debugger» في أول التاب علّمك تحط breakpoint وتمشي سطر سطر. ده الخطوة اللي بعدها: لما اللوب فيها ألف بند وانت عايز تقف عند البند الغلط بس.`,
            work: R`الكود اللي بيتنشر مضغوط (minified) في سطر واحد. من غير source map، الـ stack بتاع الإنتاج بيقولك [[at c (cart.js:1:523)]] وده مش بيقول حاجة.`,
            cs: R`الـ debugger بيكلم البرنامج بـ protocol اسمه Chrome DevTools Protocol على WebSocket. عشان كده نفس DevTools بتاعة Chrome بتعرف تتحكم في Node.`,
          },
          desc: R`لما breakpoint عادي يوقف ألف مرة في لوب، استخدم **conditional breakpoint**: بيوقف بس لما شرط تكتبه يبقى [[true]]، زي [[Number.isNaN(it.price * it.qty)]]. و **logpoint** بيطبع رسالة من غير ما يوقف ومن غير ما تلمس الكود. و [[node --inspect-brk app.js]] بيفتح باب لـ Chrome DevTools ([[chrome://inspect]]) ويستنى قبل أول سطر. و [[node --enable-source-maps]] بيخلي الـ stack trace يشاور على الملف الأصلي (TypeScript مثلًا) بدل الكود المضغوط.

ده تكملة لدرس «debugger» في وحدة «أساسيات البرمجة»: هناك اتعلمت breakpoint عادي و [[debugger;]] و [[node inspect]]. هنا هنمسك نفس الأدوات في حالات الشغل الحقيقي.

كله اتجرّب على Node 24.22.1 و esbuild 0.28.2 على ويندوز. خطوات واجهة Chrome و VS Code من الـ docs بتاعتهم.`,
          example: R`// cart.js: الإجمالي بيطلع NaN، ومش عارفين أنهي بند السبب
function total(items) {
  let sum = 0;
  for (const it of items) {
    sum += it.price * it.qty;
  }
  return sum;
}
console.log(total([{ price: 10, qty: 2 }, { price: 5, qty: '3' }, { price: 7 }]));`,
          lines: [
            R`دالة بتجمع سعر كل بند في كميته. في المشروع الحقيقي الـ [[items]] جاية من API أو فورم، وممكن تبقى ألف بند، فمش هتلاقي الغلط بعينك.`,
            R`المجموع بيبدأ من صفر. لو أي بند طلّع [[NaN]]، المجموع كله هيبقى [[NaN]] من اللحظة دي وبعدها، لأن أي حساب فيه [[NaN]] بيطلّع [[NaN]].`,
            R`بنلف على البنود واحد واحد. ده المكان اللي breakpoint عادي فيه بيوقف مع كل بند، ومع ألف بند هتدوس «كمّل» ألف مرة.`,
            R`**السطر اللي هنحط عليه الـ breakpoint** (سطر 5 في الملف). [[it.qty]] لو مش موجودة بتبقى [[undefined]]، و [[7 * undefined]] بـ [[NaN]]. ولو [[qty]] نص زي [['3']]، الضرب بيحوّله رقم ويعدّي (5 × '3' = 15)، فده مش هو السبب.`,
            R`نهاية اللوب.`,
            R`بيرجّع المجموع، و [[NaN]] هنا معناه إن بند واحد على الأقل كان ناقص.`,
            R`نهاية [[total]].`,
            R`النداء بتلات بنود: الأول سليم، والتاني [[qty]] فيه نص، والتالت مفيهوش [[qty]] خالص. الناتج المطبوع [[NaN]]، والسؤال: أنهي بند؟`,
          ],
          try: R`احفظ المثال [[cart.js]] وشغّل [[node inspect cart.js]]. اكتب [[sb('cart.js', 5, 'Number.isNaN(it.price * it.qty)')]] وبعدين [[c]]: هيقف كام مرة؟ اكتب [[exec it]]. وبعدين جرّب [[node --inspect-brk cart.js]] وافتح [[chrome://inspect]] في Chrome ودوس inspect.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على المثال، قبل ما تشغّل، اكتب الـ breakpoint بالشرط [[typeof it.qty !== 'number']] هيوقف كام مرة وعند أنهي بنود، وقيمة [[sum]] عند كل توقّف. بعدين شغّلها بـ [[node inspect]].`, done: R`وقف مرتين: عند [[{ price: 5, qty: '3' }]] و [[sum]] بـ 20، وعند [[{ price: 7 }]] و [[sum]] بـ 35. وكاتب ليه البند التاني وقف رغم إنه مش السبب (الشرط عن النوع مش عن [[NaN]]).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اعمل [[orders.json]] فيه ٥٠٠ طلب ([[{ id, price, qty }]]) بسكربت صغير، وخلّي ٣ طلبات عشوائية ناقصها [[qty]]. لاقيهم بـ logpoint واحد بيطبع [[it.id]] بس لما الحساب [[NaN]]، من غير ما تعدّل سطر في الكود.`, done: R`الكود ما اتلمسش ([[git diff]] فاضي)، والترمنال طبع ٣ سطور بالظبط فيهم الـ [[id]] التلاتة اللي خليتهم ناقصين، والبرنامج ما وقفش ولا مرة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ابني [[src/cart.ts]] بـ [[npx esbuild src/cart.ts --bundle --minify --platform=node --outfile=dist/cart.js]] مرة من غير [[--sourcemap]] ومرة بيها، وخلّي الدالة ترمي error لبند ناقص. شغّل كل نسخة بـ [[node]] وبـ [[node --enable-source-maps]].`, done: R`عندك جدول ٤ خانات بأول سطر [[at]] في كل حالة: من غير map الاتنين بيقولوا [[dist/cart.js:1:...]]، ومع map و [[--enable-source-maps]] بيقول [[src/cart.ts]] بسطر الـ [[throw]] الحقيقي واسم الدالة الأصلي بدل الحرف المضغوط. وكاتب حجم [[cart.js.map]].` },
          ],
          flag: "script",
          deep: {
            why: R`[[console.log]] في لوب فيها ألف بند بيطبع ألف سطر، وبيخليك تعدّل الكود وتنسى تمسح. والـ breakpoint العادي بيوقف ألف مرة. الشرط بيخليك تسأل البرنامج سؤال محدد: «وقّف لما الحساب يبوظ». والـ source map بيخلي أخطاء الإنتاج تتقري أصلًا.`,
            how: R`**الشرط بيتنفّذ جوه البرنامج نفسه**، في نفس الـ scope بتاع السطر: يعني [[it]] و [[sum]] متاحين فيه. الـ debugger بيقيّمه كل مرة السطر ده هيتنفّذ، ولو طلع truthy بيوقف. ولو الشرط نفسه رمى error (زي [[it.x.y]] و [[it.x]] مش موجودة)، DevTools بتعتبره false ومبتوقفش، فاكتب شرط آمن.

**والـ logpoint** في الحقيقة conditional breakpoint شرطه [[console.log(...)]]: [[console.log]] بترجّع [[undefined]] (falsy)، فبيطبع ومبيوقفش. ده اللي عملناه في [[node inspect]] بالظبط، و Chrome و VS Code عاملين له زرار لوحده.

**[[--inspect]] و [[--inspect-brk]] و [[--inspect-wait]]:**

| الخيار | بيعمل إيه |
|---|---|
| [[--inspect]] | يفتح البورت ويكمّل على طول. سكربت قصير بيخلص قبل ما تلحق توصّل |
| [[--inspect-brk]] | يفتح البورت **ويوقف قبل أول سطر** لحد ما تدوس كمّل |
| [[--inspect-wait]] | يستنى لحد ما debugger يتوصّل، وبعدين يكمّل من غير توقّف |
| [[--inspect=9230]] | بورت تاني غير 9229، لو بتشغّل برنامجين |

والبورت بيفتح على [[127.0.0.1]] بس. **متفتحوش على [[0.0.0.0]]**: أي حد يوصل للبورت ده يقدر يشغّل أي كود على جهازك بصلاحيات البرنامج (تحذير صريح في docs بتاعة Node). ولو محتاج تـ debug سيرفر بعيد، استخدم SSH tunnel: [[ssh -L 9229:127.0.0.1:9229 server]].

**الـ source map** ملف JSON (النسخة 3)، فيه [[sources]] (الملفات الأصلية)، و [[names]] (الأسماء الأصلية قبل الضغط)، و [[mappings]] (نص مضغوط بـ Base64 VLQ بيقول كل حتة في الناتج جت من أنهي سطر وعمود في الأصل). وآخر سطر في [[cart.js]] بيقول مكانه: [[//# sourceMappingURL=cart.js.map]]. والمتصفح بيقراه لوحده لما DevTools مفتوحة، و Node محتاج [[--enable-source-maps]] (أو [[NODE_OPTIONS=--enable-source-maps]]).`,
            when: R`conditional breakpoint: لوب كبير والغلط في بند واحد. logpoint: عايز تتبع قيمة من غير ما تعدّل الكود أو في كود مش بتاعك. [[--inspect-brk]]: سكربت Node أو سيرفر محتاج DevTools كاملة (Watch و Call Stack و Memory). source maps: أي كود بيتعمله build (TypeScript، bundler، minify) في التطوير وفي لوج الإنتاج.`,
            mistakes: R`تشغّل [[node --inspect cart.js]] على سكربت قصير وتستغرب إن مفيش حاجة وقفت: خلص وطبع [[NaN]] قبل ما DevTools توصل، استخدم [[--inspect-brk]]. وتسيب [[debugger;]] في الكود وتفتكر إنه مش مضر: هو فعلًا مبيعملش حاجة من غير debugger متوصّل، بس أي حد فاتح DevTools هيقف عنده، فامسحه قبل الـ commit. وتفتح [[--inspect=0.0.0.0]] على سيرفر. وتنشر [[.map]] فيه [[sourcesContent]] على الموقع العام فالكود الأصلي كله يبقى متاح لأي حد. وتنسى [[--enable-source-maps]] فتفتكر الـ map مش شغال.`
          },
          teach: R`## الخطوة اللي بعد درس «debugger»

في درس «debugger» (وحدة «أساسيات البرمجة») حطيت breakpoint عادي، و [[debugger;]]، وشغّلت [[node inspect]] ومشيت سطر سطر. هنا نفس الأدوات في تلات مشاكل بتقابلك كل يوم:

1. اللوب فيها ألف بند، والغلط في واحد.
2. البرنامج سيرفر أو سكربت Node، وعايز DevTools كاملة مش ترمنال.
3. الكود اللي بيقع اتعمله build، والـ stack بيقول [[cart.js:1:523]].

كله اتشغّل على Node 24.22.1 على ويندوز.

---

## ١. conditional breakpoint: وقّف عند البند الغلط بس

breakpoint عادي على سطر 5 ([[sum += it.price * it.qty;]]) بيوقف مع كل بند. الشرط بيخليه يوقف بس لما الحساب يبوظ:

~~~text node inspect cart.js (اللي بعد debug> هو اللي اتكتب)
debug> sb('cart.js', 5, 'Number.isNaN(it.price * it.qty)')
debug> c
break in cart.js:5
  3   let sum = 0;
  4   for (const it of items) {
> 5     sum += it.price * it.qty;
  6   }
  7   return sum;
debug> exec it
{ price: 7 }
debug> exec sum
35
~~~

- [[sb('cart.js', 5, '...')]]: اختصار [[setBreakpoint]]: الملف، والسطر، والشرط كنص JavaScript.
- [[c]]: كمّل ([[cont]]). عدّى أول بندين من غير ما يوقف، ووقف عند التالت بس.
- [[exec it]]: البند اللي وقف عنده: [[{ price: 7 }]]، مفيهوش [[qty]]. **ده السبب.**
- [[exec sum]]: [[35]] = 10×2 + 5×3. يعني البند التاني ([[qty: '3']] نص) اتحسب صح، والضرب حوّله رقم.

### في Chrome و VS Code (من الـ docs)

| الأداة | إزاي |
|---|---|
| Chrome DevTools | Sources، كليك يمين على رقم السطر، و Add conditional breakpoint، واكتب الشرط |
| VS Code | كليك يمين على يسار رقم السطر، و Add Conditional Breakpoint، وتختار Expression |
| VS Code بعدد مرات | نفس القايمة، و Hit Count بيوقف بعد عدد مرات معيّن (زي البند رقم 500) |

> الشرط بيتنفّذ في نفس الـ scope بتاع السطر، فـ [[it]] و [[sum]] و [[items]] متاحين فيه. ولو الشرط نفسه رمى error، بيتحسب false ومش هيوقف خالص، فاكتبه آمن ([[it?.qty]] بدل [[it.qty.x]]).

---

## ٢. logpoint: اطبع من غير ما تعدّل الكود

الـ logpoint بيطبع رسالة كل ما السطر يتنفّذ، **ومبيوقفش**. مفيش [[console.log]] تنسى تمسحه قبل الـ commit.

وفي الحقيقة هو breakpoint شرطه [[console.log(...)]]. و [[console.log]] بترجّع [[undefined]]، يعني false، فبيطبع ويكمّل:

~~~text node inspect cart.js
debug> sb('cart.js', 5, 'console.log("[logpoint]", JSON.stringify(it), "sum =", sum)')
debug> c
< [logpoint] {"price":10,"qty":2} sum = 0
< [logpoint] {"price":5,"qty":"3"} sum = 20
< [logpoint] {"price":7} sum = 35
< NaN
~~~

- السطور اللي بتبدأ بـ [[<]] هي اللي البرنامج طبعها (مش الـ debugger).
- تلات سطور، واحد لكل لفة، وبعدهم [[NaN]] بتاع البرنامج نفسه. والملف ما اتلمسش.

| الأداة | الـ logpoint فيها |
|---|---|
| Chrome DevTools | كليك يمين على رقم السطر، و Add logpoint، واكتب تعبير زي [['it', it]] |
| VS Code | Add Logpoint، والمتغيرات بين أقواس معقوفة زي [[it = {it.price}]] (من docs بتاعة VS Code) |

---

## ٣. [[debugger;]] بيوقف بس لو فيه حد بيسمع

~~~text d.js
let x = 1;
debugger;
console.log("كمّل عادي، x =", x);
~~~

~~~text node d.js
كمّل عادي، x = 1
~~~

من غير debugger متوصّل، السطر ده مالوش أي أثر. بس أي حد فاتح DevTools على الصفحة هيقف عنده، فامسحه قبل الـ commit (أداة lint زي ESLint عندها قاعدة [[no-debugger]] بتمسكه).

---

## ٤. [[node --inspect]] و Chrome DevTools

[[node inspect]] (من غير الشرطتين) debugger نصي في الترمنال. و [[--inspect]] (بالشرطتين) بيفتح باب لأي debugger تاني، وأشهرهم Chrome DevTools.

### [[--inspect]] لوحده: السكربت خلص قبل ما توصل

~~~text node --inspect cart.js
Debugger listening on ws://127.0.0.1:9229/650a04e4-ad1d-4f58-b006-a9314e329449
For help, see: https://nodejs.org/learn/getting-started/debugging
NaN
~~~

طبع [[NaN]] وخرج على طول. [[--inspect]] بيفتح البورت ويكمّل، فمناسب لسيرفر شغال على طول، مش لسكربت بيخلص في ملي ثانية.

### [[--inspect-brk]]: استنى قبل أول سطر

~~~text node --inspect-brk cart.js
Debugger listening on ws://127.0.0.1:9229/97d1013c-ddb2-4bb1-ba37-031642798c98
For help, see: https://nodejs.org/learn/getting-started/debugging
~~~

ومفيش [[NaN]]: البرنامج واقف قبل سطر 9 لحد ما debugger يتوصّل ويقول كمّل.

| الحتة | معناها |
|---|---|
| [[ws://]] | WebSocket: الاتصال اللي الـ debugger بيتكلم عليه مع البرنامج |
| [[127.0.0.1]] | بيسمع على جهازك بس، محدش من الشبكة يوصله |
| [[9229]] | البورت الافتراضي، وتغيّره بـ [[--inspect-brk=9230]] |
| [[97d1013c-...]] | id عشوائي جديد كل تشغيلة، عشان صفحة ويب متخمّنش العنوان |

### توصّل Chrome (من docs بتاعة Node و Chrome)

1. افتح [[chrome://inspect]] في Chrome.
2. تحت Remote Target هتلاقي [[cart.js]]، دوس **inspect**.
3. هتفتح DevTools فيها Sources و Console و Memory، والبرنامج واقف على أول سطر. والترمنال بيطبع [[Debugger attached.]].
4. حط breakpoints (عادي أو بشرط) زي أي صفحة، ودوس F8 عشان يكمّل.

Chrome بيعرف البرنامج منين؟ بيسأل [[http://127.0.0.1:9229/json/list]]. جرّبتها بـ [[curl]] والبرنامج واقف على بورت 9240:

~~~text curl -s http://127.0.0.1:9240/json/list (جزء)
"description": "node.js instance",
"title": "cart.js",
"type": "node",
"webSocketDebuggerUrl": "ws://127.0.0.1:9240/56841089-8979-4353-bfe1-4aa4ec1ce3fd"
~~~

| الخيار | إمتى |
|---|---|
| [[--inspect]] | سيرفر شغال على طول وعايز توصّل وقت ما تحب |
| [[--inspect-brk]] | سكربت قصير، أو الغلط في أول ما البرنامج يقوم |
| [[--inspect-wait]] | يستنى لحد ما debugger يتوصّل، وبعدين يكمّل من غير ما يوقف على أول سطر |

> **متكتبش [[--inspect=0.0.0.0]] على سيرفر.** جرّبتها والرسالة بقت [[ws://0.0.0.0:9231/...]]: أي حد يوصل للبورت ده يقدر يشغّل أي كود جوه البرنامج. ولو محتاج تـ debug سيرفر بعيد: [[ssh -L 9229:127.0.0.1:9229 user@server]] وبعدين [[chrome://inspect]] على جهازك.

### Pause on exceptions

في Sources في DevTools فيه اختيار «Pause on uncaught exceptions» (و «caught» كمان). بيوقف البرنامج **في السطر اللي رمى** والمتغيرات لسه موجودة، بدل ما تقرا الـ stack بعد ما كل حاجة ماتت. (من docs بتاعة Chrome.)

---

## ٥. source maps: الـ stack يشاور على الملف الأصلي

الكود اللي بيتنشر بيتعمله build: TypeScript بيتحول JS، والـ bundler بيجمّع الملفات ويضغطها في سطر واحد. فالـ error بيقول مكان في الناتج مش في الكود اللي انت كتبته.

~~~text src/cart.ts
type Item = { price: number; qty?: number };

export function total(items: Item[]): number {
  let sum = 0;
  for (const it of items) {
    if (it.qty === undefined) throw new Error($__btqty ناقصة في بند سعره $__{it.price}$__bt);
    sum += it.price * it.qty;
  }
  return sum;
}

console.log(total([{ price: 10, qty: 2 }, { price: 7 }]));
~~~

~~~text npx esbuild src/cart.ts --bundle --minify --platform=node --sourcemap --outfile=dist/cart.js
  dist\cart.js      771b
  dist\cart.js.map  916b
~~~

| الحتة | معناها |
|---|---|
| [[--bundle]] | اجمع الملف وكل اللي بيستورده في ملف واحد |
| [[--minify]] | اضغط: شيل المسافات وغيّر الأسماء لحروف ([[total]] بقت [[c]]) |
| [[--platform=node]] | الناتج هيشتغل على Node مش في المتصفح |
| [[--sourcemap]] | اعمل [[cart.js.map]] جنبه، وحط في آخر [[cart.js]] سطر بيقول مكانه |

### من غير [[--enable-source-maps]]

~~~text node dist/cart.js
Error: qty ناقصة في بند سعره 7
    at c (C:\...\sm\dist\cart.js:1:523)
    at Object.<anonymous> (C:\...\sm\dist\cart.js:1:677)
~~~

[[c]] و [[1:523]]: الدالة اسمها حرف، والمكان السطر الوحيد عند الحرف رقم 523. مش هتعرف ده فين في الكود بتاعك.

### معاه

~~~text node --enable-source-maps dist/cart.js
C:\...\sm\src\cart.ts:6
    if (it.qty === undefined) throw new Error($__btqty ناقصة في بند سعره $__{it.price}$__bt);
                              ^

Error: qty ناقصة في بند سعره 7
    at total (C:\...\sm\src\cart.ts:6:37)
    at Object.<anonymous> (C:\...\sm\src\cart.ts:12:13)
~~~

- [[src/cart.ts:6:37]]: الملف الأصلي، السطر 6 اللي فيه [[throw]]، والعمود 37.
- [[at total]]: اسم الدالة الأصلي رجع، من [[names]] اللي في الـ map.
- وفوق، Node طبع السطر الأصلي نفسه وسهم تحت مكان الرمي.

و [[NODE_OPTIONS=--enable-source-maps node dist/cart.js]] بتدّي نفس النتيجة، ودي اللي بتتحط في السيرفر أو الـ Dockerfile.

### جوه الـ map

~~~text آخر سطر في dist/cart.js
//# sourceMappingURL=cart.js.map
~~~

~~~text مفاتيح cart.js.map
version          3
sources          [ '../src/cart.ts' ]
names            [ 'cart_exports', '__export', 'total', '__toCommonJS', 'items', 'sum' ]
sourcesContent   (نسخة من الكود الأصلي كله)
mappings         4ZAAA,IAAAA,EAAA,GAAAC,...
~~~

| المفتاح | فيه إيه |
|---|---|
| [[sources]] | الملفات الأصلية اللي الناتج جه منها |
| [[names]] | الأسماء قبل الضغط، ومنها [[total]] رجعت مكان [[c]] |
| [[mappings]] | نص مضغوط (Base64 VLQ) بيربط كل حتة في الناتج بسطر وعمود في الأصل |
| [[sourcesContent]] | الكود الأصلي نفسه، عشان DevTools تعرضه حتى لو الملفات مش عندك |

- لما شلت الـ [[.map]] من جنب الملف، [[--enable-source-maps]] رجع يطبع [[dist/cart.js:1:523]]: لازم الملف يبقى موجود في المكان اللي السطر الأخير بيقوله.
- في المتصفح، DevTools بتقرا الـ map لوحدها وبتعرض [[cart.ts]] في Sources، وتحط breakpoint فيه كأنه الكود اللي بيتنفّذ.
- **وفي الإنتاج:** الـ map فيه كودك كله ([[sourcesContent]]). لو مش عايز الكود يبقى متاح للناس، متنشرهوش على الموقع العام، وارفعه لأداة تتبّع الأخطاء بس (Sentry مثلًا) أو استخدم [[--sourcemap=external]] من غير ما تنشر الـ [[.map]].

---

## الخلاصة

| المشكلة | الأداة |
|---|---|
| لوب كبير والغلط في بند واحد | conditional breakpoint بشرط زي [[Number.isNaN(...)]] |
| عايز تتبّع قيمة من غير تعديل | logpoint |
| سكربت Node وعايز DevTools كاملة | [[node --inspect-brk app.js]] و [[chrome://inspect]] |
| سيرفر شغال | [[--inspect]] على [[127.0.0.1]]، ومن بعيد بـ SSH tunnel |
| stack الكود المضغوط مش بيتقري | [[--sourcemap]] في الـ build و [[--enable-source-maps]] في Node |

- [[debugger;]] مالوش أثر من غير debugger متوصّل، بس امسحه قبل الـ commit.
- الشرط اللي بيرمي error بيتحسب false: اكتبه آمن.
- الـ [[.map]] فيه كودك كله: فكّر قبل ما تنشره.`,
          sol: R`الـ breakpoint بالشرط [[Number.isNaN(it.price * it.qty)]] وقف **مرة واحدة** بس، عند [[{ price: 7 }]] و [[sum]] بـ [[35]]: البند ده مفيهوش [[qty]]. والبند [[qty: '3']] مش السبب لأن الضرب حوّله رقم.

و [[node --inspect-brk cart.js]] طبع [[Debugger listening on ws://127.0.0.1:9229/...]] ومطبعش [[NaN]] لأنه واقف قبل أول سطر لحد ما Chrome يتوصّل من [[chrome://inspect]].`,
          solCode: R`// node inspect cart.js   (Node 24.22.1، اتشغّل فعلًا)
// debug> sb('cart.js', 5, 'Number.isNaN(it.price * it.qty)')
// debug> c
// break in cart.js:5
// debug> exec it
// { price: 7 }
// debug> exec sum
// 35

// والتصليح: البند الناقص يترفض بدل ما يبوّظ المجموع بصمت
function total(items) {
  let sum = 0;
  for (const it of items) {
    const qty = Number(it.qty);
    if (!Number.isFinite(qty)) throw new Error($__btالكمية ناقصة في بند سعره $__{it.price}$__bt);
    sum += it.price * qty;
  }
  return sum;
}
// total([{ price: 10, qty: 2 }, { price: 5, qty: '3' }])  ->  35
// ولو فيه { price: 7 }  ->  Error: الكمية ناقصة في بند سعره 7`
        }
      ]
    }
]);

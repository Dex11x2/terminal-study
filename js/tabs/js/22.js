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
        { t: R`جدول بدل عشرين سطر`, what: R`خد أي مصفوفة كائنات في مشروعك و [[console.table]] عليها. وبعدين [[console.table(rows, ['اسم','سعر'])]] بالأعمدة اللي تهمك. من درس ١.` },
        { t: R`قيس بدل ما تخمّن`, what: R`[[console.time]] و [[console.timeEnd]] حوالين الحتة اللي بتشك إنها بطيئة. وبعدين [[console.timeLog]] في النص عشان تعرف الوقت راح فين بالظبط.` },
        { t: R`اربط أخطاءك`, what: R`في أي [[catch]] عندك بترمي خطأ جديد، ضيف [[{ cause: e }]]. وبعد أسبوع هتلاقي أخطاءك بتقول السبب الحقيقي بدل «حصل خطأ». من درس ٣.` },
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
            R`مصفوفة كائنات — ودي الشكل اللي [[table]] بتلمع فيه.`,
            R`صف.`,
            R`صف.`,
            R`صف.`,
            R`قفلة.`,
            R`جدول بكل الأعمدة.`,
            R`وبالأعمدة دي بس.`,
            R`بيفتح مستوى.`,
            R`اللي جواه بيتزاح.`,
            R`وبيقفله.`,
            R`بتعد كام مرة اتنفّذ السطر.`,
            R`بتبدأ عداد بالاسم ده.`,
            R`الشغل اللي بتقيسه.`,
            R`وبتطبع الوقت. **نفس الاسم** لازم يتكرر.`,
          ],
          try: R`خد مصفوفة كائنات من مشروعك وجرّب [[console.table]] عليها. وبعدين [[console.table(rows, ['عمود'])]]. وبعدين حط [[console.count]] جوه دالة بتشك إنها بتتنادى كتير.`,
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
            R`متغير قيمته [[undefined]]، وقراية صفة منه.`,
            R`و [[null]] نفس الحاجة برسالة مختلفة.`,
            R`الصفة موجودة بس مش دالة.`,
            R`اسم مش معرّف خالص — ده نوع تاني من الخطأ.`,
            R`JSON مكسور، والرسالة بتقول الموضع.`,
            R`بنحاول.`,
            R`الحاجة اللي هترمي.`,
            R`بنمسك.`,
            R`**[[{ cause: e }]]**: بتربط الخطأ الجديد بالأصلي. من غيرها السبب بيضيع.`,
            R`قفلة.`,
          ],
          try: R`شغّل كل سطر لوحده في [[node -e]] واقرا الرسالة. وبعدين جرّب [[cause]]: ارمي خطأ من جوه [[catch]] مرة بيها ومرة من غيرها، وقارن اللي بيوصل للي بره.`,
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
        }
      ]
    }
]);

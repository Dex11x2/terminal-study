// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "المصفوفات",
      l: 1,
      n: "map و filter و reduce بدل اللوبات، و find و some، ومين بيعدّل الـ array ومين بيرجّع واحدة جديدة",
      items: [
        {
          cmd: "map و filter و reduce",
          title: "تحوّل وتفلتر وتجمع array من غير for",
          desc: R`[[map]] بتحوّل كل عنصر وترجّع array جديدة بنفس الطول. [[filter]] بترجّع العناصر اللي الشرط بتاعها true بس. [[reduce]] بتجمع الـ array كلها في قيمة واحدة (مجموع، أو object، أو أي حاجة).

التلاتة مبيعدّلوش الـ array الأصلية، وتقدر توصّلهم ورا بعض. ودول أكتر ٣ دوال هتكتبهم في React: [[items.map((item) => <Row key={item.id} />)]].

و [[Object.groupBy]] (ES2024) بتقسّم array لمجموعات حسب مفتاح، بدل ما تكتب reduce بإيدك.`,
          example: R`const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
const paid = orders.filter((o) => o.status === "paid");
const totals = paid.map((o) => o.total);
const revenue = totals.reduce((sum, t) => sum + t, 0);
console.log(revenue); // 650
const revenue2 = orders
  .filter((o) => o.status === "paid")
  .reduce((sum, o) => sum + o.total, 0);
const byStatus = Object.groupBy(orders, (o) => o.status);`,
          try: R`من نفس الـ orders اطلع: عدد الطلبات الـ pending، وأكبر total، و object شكله [[{ 1: 250, 2: 900, 3: 400 }]] بـ reduce. وبعدين اطبع [[byStatus]] وشوف شكله.`,
          flag: "script",
          deep: {
            why: "أغلب الشغل على الداتا: فلتر المنتجات المتاحة، واعرض أسماء المستخدمين، واحسب إجمالي السلة. بالـ for هتكتب متغيرات مؤقتة و push و if، وبالدوال دي الكود بيقول «عايز إيه» مش «اعمله إزاي».",
            how: R`الـ callback بياخد ٣ حاجات: العنصر، والـ index، والـ array نفسها. و [[reduce]] بياخد callback بـ (المجمّع، العنصر) وقيمة أولية.

[[reduce]] من غير قيمة أولية بيستخدم أول عنصر كبداية، ولو الـ array فاضية بيرمي TypeError. عشان كده دايمًا ابعت القيمة الأولية.

الدوال دي بتعمل array جديدة كل مرة، فـ [[filter]] ثم [[map]] بيلفّوا مرتين. ده مش مشكلة في ٩٩٪ من الحالات (آلاف العناصر بتخلص في أقل من ملي ثانية). لو الـ array ضخمة جدًا، reduce واحدة أو for loop عادي.

[[forEach]] بتلف بس ومبترجّعش حاجة، ومينفعش توقفها بـ break. لو محتاج توقف، [[for...of]] أو [[some]] / [[find]].`,
            when: R`[[map]] لما عايز نفس العدد بشكل تاني. [[filter]] لما عايز جزء. [[reduce]] لما عايز قيمة واحدة (مجموع، object بالـ id، تجميع). ولو reduce بقت معقدة ومش مفهومة، for loop عادي أوضح.`,
            mistakes: R`تستخدم [[map]] عشان تلف بس ومتستخدمش الناتج: استخدم forEach أو for...of. وتنسى الـ return في callback بجسم [[{ }]]. وتنسى القيمة الأولية في reduce. وتعدّل العنصر جوه map ([[o.total *= 2]]): كده عدّلت الأصل لأن العناصر objects. وفي الانترفيو: «اكتب map بإيدك» (المستوى ٣).`
          },
          teach: R`## الفكرة

عندنا ليستة طلبات، وعايزين إجمالي الفلوس من الطلبات المدفوعة بس. المثال بيعملها على ٣ خطوات: [[filter]] (خد المدفوع)، و [[map]] (خد الـ total من كل واحد)، و [[reduce]] (اجمع). وبعدين نفس الحساب بسلسلة واحدة، وفي الآخر [[Object.groupBy]]. اتشغّل كملف [[orders.js]] في Node 24.

---

## ١. الداتا

~~~text orders.js
const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
~~~

array فيها ٣ objects، وكل object طلب ليه [[id]] و [[total]] (المبلغ) و [[status]] (الحالة: paid يعني مدفوع، pending يعني مستني). ده شكل الداتا اللي بتيجي من أي API. والفاصلة بعد آخر عنصر مسموحة (trailing comma).

---

## ٢. [[filter]]: خد المدفوع بس

~~~text orders.js
const paid = orders.filter((o) => o.status === "paid");
~~~

- [[filter]] بتلف على كل عنصر، وتنادي الدالة اللي اديتها عليه.
- [[(o) => o.status === "paid"]]: [[o]] الطلب الحالي، والدالة بترجّع true لو حالته paid.
- العناصر اللي رجعت true بس بتدخل array جديدة.

~~~text الناتج من console.log(paid)
[
  { id: 1, total: 250, status: 'paid' },
  { id: 3, total: 400, status: 'paid' }
]
~~~

---

## ٣. [[map]]: حوّل كل طلب لرقمه

~~~text orders.js
const totals = paid.map((o) => o.total);
~~~

[[map]] بتلف على كل عنصر، وتحط **اللي الدالة رجّعته** في array جديدة بنفس الطول. الدالة هنا بترجّع [[o.total]].

~~~text الناتج من console.log(totals)
[ 250, 400 ]
~~~

---

## ٤. [[reduce]]: اجمعهم في رقم واحد

~~~text orders.js
const revenue = totals.reduce((sum, t) => sum + t, 0);
console.log(revenue); // 650
~~~

[[reduce]] بتاخد حاجتين:

1. دالة [[(sum, t) => sum + t]]: [[sum]] اسمه الـ **accumulator** (المجمّع: الناتج لحد دلوقتي)، و [[t]] العنصر الحالي. اللي الدالة بترجّعه يبقى الـ sum الجديد.
2. [[0]]: القيمة اللي sum بيبدأ بيها.

حطينا طباعة جوه الدالة عشان نشوف كل لفة:

~~~text الناتج
sum = 0 t = 250 → 250
sum = 250 t = 400 → 650
~~~

| اللفة | sum قبل | t | sum بعد |
|---|---|---|---|
| ١ | 0 (القيمة الأولية) | 250 | 250 |
| ٢ | 250 | 400 | 650 |

والناتج النهائي [[650]]. لو نسيت القيمة الأولية والـ array فاضية:

~~~text الناتج من [].reduce((a, b) => a + b)
TypeError: Reduce of empty array with no initial value
~~~

---

## ٥. نفس الحساب بسلسلة واحدة

~~~text orders.js
const revenue2 = orders
  .filter((o) => o.status === "paid")
  .reduce((sum, o) => sum + o.total, 0);
~~~

- كل method بترجّع array، فتكمّل عليها بنقطة. كتبناها على كذا سطر عشان تتقري، والسطر اللي بيبدأ بـ [[.]] تكملة للي قبله.
- شلنا الـ map: الـ reduce بتاخد الطلب كله ([[o]]) وتجمع [[o.total]] على طول. الناتج برضه 650.

> لو لزقت السطور دي في Node REPL سطر سطر، هيطلعلك [[Invalid REPL keyword]]، لأن الـ REPL بيفهم السطر اللي بيبدأ بنقطة كأمر خاص بيه زي [[.help]]. شغّلها من ملف.

---

## ٦. [[Object.groupBy]]: قسّم حسب الحالة

~~~text orders.js
const byStatus = Object.groupBy(orders, (o) => o.status);
~~~

بتاخد الـ array ودالة بترجّع «اسم المجموعة» لكل عنصر، وترجّع object: كل مفتاح اسم مجموعة، وقيمته array عناصرها.

~~~text الناتج من console.log(byStatus) (Node 24)
[Object: null prototype] {
  paid: [
    { id: 1, total: 250, status: 'paid' },
    { id: 3, total: 400, status: 'paid' }
  ],
  pending: [ { id: 2, total: 900, status: 'pending' } ]
}
~~~

[[null prototype]] معناها إن الـ object ده معمول من غير الخصايص الموروثة (زي [[toString]])، عشان لو مجموعة اسمها [["constructor"]] متتضربش مع حاجة جاهزة.

---

## ٧. حل الـ try

~~~text try.js
const pendingCount = orders.filter((o) => o.status === "pending").length;
const maxTotal = Math.max(...orders.map((o) => o.total));
const totalsById = orders.reduce((acc, o) => {
  acc[o.id] = o.total;
  return acc;
}, {});
console.log(pendingCount, maxTotal, totalsById);
~~~

- [[pendingCount]]: فلتر الـ pending وخد طول الناتج.
- [[maxTotal]]: [[map]] بتطلّع [[[250, 900, 400]]]، و [[...]] بتفردهم لـ [[Math.max]].
- [[totalsById]]: الـ reduce هنا بتبدأ بـ object فاضي [[{}]]، وكل لفة بتحط خانة [[acc[o.id] = o.total]]، و [[return acc]] عشان اللفة الجاية تستلمه.

~~~text الناتج (Node 24)
1 900 { '1': 250, '2': 900, '3': 400 }
~~~

المفاتيح بين [[' ']] لأن مفاتيح الـ objects دايمًا strings.

---

## الخلاصة

| الدالة | بترجّع | الطول |
|---|---|---|
| [[filter(fn)]] | array بالعناصر اللي fn رجّعت لها true | نفسه أو أقل |
| [[map(fn)]] | array باللي fn رجّعته لكل عنصر | نفسه بالظبط |
| [[reduce(fn, start)]] | قيمة واحدة (رقم، object، أي حاجة) | - |
| [[Object.groupBy(arr, fn)]] | object مجموعات | - |

التلاتة مبيعدّلوش الـ array الأصلية، وابعت القيمة الأولية للـ reduce دايمًا.`,
          lines: [
            "array فيها objects: شكل الداتا اللي بتيجي من API.",
            "طلب مدفوع.",
            "طلب مستني.",
            "طلب مدفوع.",
            "قفلة. الفاصلة بعد آخر عنصر مسموحة.",
            "خد المدفوع بس: array فيها ٢.",
            "حوّل كل طلب لرقم الـ total بتاعه.",
            R`اجمعهم. [[sum]] بيبدأ من 0 وكل مرة بيزيد t.`,
            "650.",
            "نفس الحساب بسلسلة واحدة.",
            "فلتر.",
            "واجمع على طول من غير map.",
            R`object فيه [[paid]] و [[pending]]، وكل واحد array طلباته.`
          ],
          sol: R`عدد الـ pending [[1]]، وأكبر total [[900]]، والـ object [[{ 1: 250, 2: 900, 3: 400 }]] (Node بيطبع المفاتيح بين quotes لأنها strings). و [[byStatus]] بيطبع [[[Object: null prototype] { paid: [ ...اتنين... ], pending: [ ...واحد... ] }]]: [[Object.groupBy]] بيرجّع object من غير prototype عشان مفتاح زي [["constructor"]] ميضربش.

أشهر غلطة في الـ reduce إنك تنسى [[return acc]] جوه الـ callback، فتاني لفة الـ acc بيبقى undefined وتطلعلك [[TypeError: Cannot set properties of undefined]]. والتانية إنك تنسى القيمة الأولية [[{}]]، فأول acc يبقى أول order نفسه.`,
          solCode: R`const orders = [
  { id: 1, total: 250, status: "paid" },
  { id: 2, total: 900, status: "pending" },
  { id: 3, total: 400, status: "paid" },
];
const pendingCount = orders.filter((o) => o.status === "pending").length; // 1
const maxTotal = Math.max(...orders.map((o) => o.total));                 // 900
const totalsById = orders.reduce((acc, o) => {
  acc[o.id] = o.total;
  return acc;
}, {});                                                                    // { 1: 250, 2: 900, 3: 400 }
console.log(pendingCount, maxTotal, totalsById);
console.log(Object.groupBy(orders, (o) => o.status));`
        },
        {
          cmd: "find و some و includes",
          title: "تدوّر على عنصر، أو تسأل «فيه واحد؟»",
          desc: R`[[find]] بترجّع أول عنصر الشرط بتاعه true (أو undefined)، و [[findIndex]] مكانه (أو -1). و [[some]] بترجّع true لو عنصر واحد على الأقل حقق الشرط، و [[every]] لو كلهم. و [[includes]] بتسأل «القيمة دي موجودة؟».

والفرق عن [[filter]]: التلاتة دول بيقفوا أول ما يلاقوا الإجابة، فأسرع لما تكون محتاج عنصر واحد أو نعم/لا.`,
          example: R`const users = [
  { id: 1, name: "Sara", admin: true },
  { id: 2, name: "Omar", admin: false },
  { id: 3, name: "Ali", admin: false },
];
users.find((u) => u.id === 2);       // { id: 2, name: "Omar", ... }
users.find((u) => u.id === 9);       // undefined
users.findIndex((u) => u.id === 2);  // 1
users.findLast((u) => !u.admin);     // { id: 3, name: "Ali", ... }
users.some((u) => u.admin);          // true: واحد على الأقل
users.every((u) => u.admin);         // false: مش كلهم
["js", "ts"].includes("ts");         // true
[NaN].includes(NaN);                 // true
[NaN].indexOf(NaN);                  // -1`,
          try: R`اكتب [[const user = users.find(...)]] على id مش موجود، وبعدين [[user.name]] واقرا الـ error. صلّحه بـ [[user?.name]]. وبعدين جرّب [[users.includes({ id: 1, name: "Sara", admin: true })]] وفكّر ليه false.`,
          flag: "script",
          deep: {
            why: "«هات المنتج ده من السلة»، «فيه منتج خلص؟»، «اليوزر ده admin؟»: أسئلة بتتسأل في كل شاشة. واستخدام filter وأخد [0] بيلف على الـ array كلها من غير لزمة.",
            how: R`[[find]] و [[some]] و [[every]] و [[findIndex]] بيوقفوا أول ما الإجابة تبان (short-circuit). [[every]] على array فاضية بترجّع true، و [[some]] على فاضية false (منطقيًا: مفيش عنصر كسر الشرط).

[[includes]] بتقارن بـ SameValueZero، زي === بس بتلاقي NaN. و [[indexOf]] بتقارن بـ === فمبتلاقيش NaN. الاتنين بيقارنوا الـ objects بالـ reference، فـ object جديد بنفس المحتوى مش هيتلاقى.

[[findLast]] و [[findLastIndex]] (ES2023) بيدوّروا من الآخر.

لو هتدوّر بالـ id كتير على array كبيرة، حوّلها Map مرة واحدة: [[new Map(users.map((u) => [u.id, u]))]]، والبحث بقى O(1) بدل O(n) (تاب DSA).`,
            when: R`[[find]] لعنصر واحد. [[some]] / [[every]] لسؤال نعم/لا. [[includes]] لقيم بسيطة (strings و numbers). و Map أو Set لو البحث بيتكرر كتير.`,
            mistakes: R`[[filter(...)[0]]] بدل find. وتنسى إن find ممكن ترجّع undefined وتقرا منها على طول. و [[if (arr.indexOf(x))]]: لو العنصر في المكان 0 هتبقى false، ولو مش موجود -1 هتبقى true. استخدم includes.`
          },
          teach: R`## الفكرة

[[filter]] بترجّع **كل** اللي بيحقق الشرط. بس ساعات انت عايز عنصر واحد، أو إجابة نعم/لا. الدوال دي معمولة لكده، وبتقف أول ما تلاقي الإجابة. المثال بيسأل ليستة مستخدمين كذا سؤال. اتشغّل في Node 24 REPL.

---

## ١. الداتا

~~~text users.js
const users = [
  { id: 1, name: "Sara", admin: true },
  { id: 2, name: "Omar", admin: false },
  { id: 3, name: "Ali", admin: false },
];
~~~

٣ مستخدمين، واحد بس [[admin]] (مدير).

---

## ٢. [[find]] و [[findIndex]] و [[findLast]]

~~~text Node REPL
> users.find((u) => u.id === 2)
{ id: 2, name: 'Omar', admin: false }
> users.find((u) => u.id === 9)
undefined
> users.findIndex((u) => u.id === 2)
1
> users.findLast((u) => !u.admin)
{ id: 3, name: 'Ali', admin: false }
~~~

- [[find(fn)]]: بترجّع **أول عنصر** الدالة رجّعت له true. مش array، العنصر نفسه.
- لو مفيش: [[undefined]]. وده اللي بيوقّع الناس (تحت).
- [[findIndex(fn)]]: نفس الكلام بس بترجّع **مكانه**. Omar في المكان 1 (العدّ من 0). ولو مش موجود بترجّع [[-1]].
- [[findLast(fn)]]: بتدوّر من الآخر. [[!u.admin]] يعني «مش admin»، وآخر واحد كده Ali.

### بتقف بدري فعلًا؟

عدّينا كام مرة الدالة اتنادت وإحنا بندوّر على id 1:

~~~text الناتج
find calls 1
filter calls 3
~~~

[[find]] لقت Sara من أول مرة ووقفت، و [[filter]] لفت على الـ ٣.

---

## ٣. [[some]] و [[every]]: نعم أو لا

~~~text Node REPL
> users.some((u) => u.admin)
true
> users.every((u) => u.admin)
false
~~~

- [[some]]: «فيه واحد على الأقل admin؟» أيوة، Sara.
- [[every]]: «كلهم admins؟» لأ.

وعلى array فاضية: [[[].every(...)]] بـ true و [[[].some(...)]] بـ false (اتجرّبوا). المنطق: مفيش عنصر كسر الشرط، ومفيش عنصر حققه.

---

## ٤. [[includes]] و [[indexOf]]

~~~text Node REPL
> ["js", "ts"].includes("ts")
true
> [NaN].includes(NaN)
true
> [NaN].indexOf(NaN)
-1
~~~

- [[includes(value)]]: بتاخد **قيمة** مش دالة: «القيمة دي موجودة؟».
- [[indexOf(value)]]: مكان القيمة، أو [[-1]].
- الفرق مع NaN: [[indexOf]] بتقارن بـ [[===]]، و [[NaN === NaN]] false فمبتلاقيهاش. [[includes]] بتستخدم مقارنة اسمها SameValueZero بتعتبر NaN زي نفسها.

---

## ٥. اللي بيحصل في الـ try

لو [[find]] ملقتش وقريت منها على طول:

~~~text app.js
const user = users.find((u) => u.id === 9);
console.log(user.name);
~~~

~~~text الناتج (Node 24)
TypeError: Cannot read properties of undefined (reading 'name')
~~~

[[user]] بـ undefined، ومفيش خانات جوه undefined. [[user?.name]] بتحل ده: الـ [[?.]] (optional chaining) معناها «لو اللي قبلي null أو undefined، رجّع undefined وخلاص».

و [[includes]] مع object:

~~~text الناتج من users.includes(users[0]) و users.includes({ id: 1, name: "Sara", admin: true })
true false
~~~

الأول نفس الـ object اللي في الـ array فلقيته. التاني object **جديد** بنفس المحتوى، و [[includes]] بتقارن بالـ reference، فمش هو. للمحتوى استخدم [[some((u) => u.id === 1)]].

---

## الخلاصة

| السؤال | الدالة | بترجّع لو ملقتش |
|---|---|---|
| هات أول واحد | [[find(fn)]] | [[undefined]] |
| مكانه فين | [[findIndex(fn)]] | [[-1]] |
| من الآخر | [[findLast(fn)]] / [[findLastIndex(fn)]] | [[undefined]] / [[-1]] |
| فيه واحد على الأقل؟ | [[some(fn)]] | false |
| كلهم؟ | [[every(fn)]] | - |
| القيمة دي موجودة؟ | [[includes(value)]] | false |

[[find]] ممكن ترجّع undefined، فاستخدم [[?.]] قبل ما تقرا منها.`,
          lines: [
            "ليستة مستخدمين.",
            "admin.",
            "مش admin.",
            "مش admin.",
            "قفلة.",
            "أول واحد id بتاعه 2.",
            R`مش موجود: [[undefined]]، فخلي بالك قبل ما تقرا منه.`,
            "مكانه في الـ array.",
            "دوّر من الآخر: آخر واحد مش admin.",
            "فيه admin واحد على الأقل؟",
            "كلهم admins؟",
            "القيمة موجودة؟",
            R`[[includes]] بتلاقي NaN.`,
            R`[[indexOf]] مبتلاقيهاش لأنها بتستخدم ===.`
          ],
          sol: R`[[user.name]] على id مش موجود بتطلع [[TypeError: Cannot read properties of undefined (reading 'name')]]: find رجّعت undefined، ومفيش حاجة اسمها name جوه undefined. مع [[user?.name]] الناتج undefined من غير error. ولو عايز رسالة للمستخدم: [[user?.name ?? "مش موجود"]].

[[users.includes({ id: 1, ... })]] بترجّع false حتى لو الخصايص نفسها: includes بتقارن بالـ reference (زي ===)، والـ object اللي كتبته في القوسين object جديد مختلف عن اللي في الـ array. لو عايز تدوّر بالمحتوى استخدم [[users.some((u) => u.id === 1)]].`
        },
        {
          cmd: "sort و toSorted",
          title: "ليه [10, 1, 2].sort() بتطلع [1, 10, 2]؟",
          desc: R`[[sort()]] من غير دالة بتحوّل العناصر لـ strings وترتّبها كنصوص، فـ "10" قبل "2". للأرقام لازم تبعت دالة مقارنة: [[(a, b) => a - b]] تصاعدي.

والأهم: [[sort]] و [[reverse]] و [[splice]] و [[push]] و [[pop]] و [[shift]] بيعدّلوا الـ array الأصلية (mutating). و ES2023 ضاف نسخ مبتعدّلش: [[toSorted]] و [[toReversed]] و [[toSpliced]] و [[with]]، وبيرجّعوا array جديدة. ودي اللي تستخدمها مع state في React.`,
          example: R`[10, 1, 2].sort();                       // [1, 10, 2]: رتّب كنصوص
[10, 1, 2].sort((a, b) => a - b);        // [1, 2, 10]
const prices = [300, 100, 200];
const sorted = prices.toSorted((a, b) => a - b);
console.log(prices);                     // [300, 100, 200]: الأصل زي ما هو
console.log(sorted);                     // [100, 200, 300]
const names = ["Omar", "sara", "Ali"];
names.toSorted((a, b) => a.localeCompare(b));  // ["Ali", "Omar", "sara"]
const products = [{ name: "B", price: 50 }, { name: "A", price: 50 }];
products.toSorted((a, b) => a.price - b.price || a.name.localeCompare(b.name));
prices.with(0, 999);                     // [999, 100, 200]`,
          try: R`رتّب [[products]] بالسعر تنازلي. وبعدين اعمل [[const x = prices.sort()]] واطبع [[prices]] و [[x === prices]]: هتلاقي sort عدّلت الأصل ورجّعت نفس الـ array.`,
          flag: "script",
          deep: {
            why: "الترتيب في كل جدول وليستة. و sort اللي بتعدّل الأصل سبب bugs كتير في React: الـ state اتعدّلت في مكانها، فـ React مش شايف تغيير ومبيعملش render، أو الترتيب بيتغير في مكان تاني بيستخدم نفس الـ array.",
            how: R`دالة المقارنة بترجّع رقم: سالب يعني a قبل b، وموجب يعني b قبل a، وصفر يعني زي بعض. [[a - b]] بتطلع كده بالظبط للأرقام. وللنصوص [[localeCompare]]، اللي بتفهم الحروف العربي والـ accents.

من ES2019 الـ sort مضمون stable: العناصر المتساوية بتفضل بترتيبها الأصلي، فلو رتّبت بالاسم الأول وبعدين بالسعر، اللي بنفس السعر هيفضلوا مترتبين بالاسم. والأسهل تعمل الاتنين في دالة واحدة بـ [[||]]: لو السعر زي بعض (الفرق 0 falsy)، قارن بالاسم.

الـ mutating methods: [[push]] و [[pop]] و [[shift]] و [[unshift]] و [[splice]] و [[sort]] و [[reverse]] و [[fill]]. والباقي (map و filter و slice و concat و toSorted...) بيرجّعوا جديد. و [[with(i, v)]] نسخة فيها عنصر واحد متغير.

قبل ES2023 كان الحل [[[...arr].sort()]]: انسخ الأول وبعدين رتّب، وده لسه شغال.`,
            when: R`[[toSorted]] و [[toReversed]] و [[with]] مع أي state أو داتا مشتركة. و [[sort]] العادية لما الـ array بتاعتك انت ومحدش تاني بيستخدمها.`,
            mistakes: R`[[sort()]] على أرقام من غير دالة. ودالة مقارنة بترجّع boolean ([[a > b]]): مش هترتّب صح في كل الحالات. و [[state.items.sort(...)]] في React. وفي الانترفيو: «[[[10, 1, 2].sort()]] بتطلع إيه؟»، و «إيه الـ methods اللي بتعدّل الـ array؟».`
          },
          teach: R`## الفكرة

[[sort]] بترتّب الـ array، بس فيها مفاجأتين: من غير دالة بترتّب كـ **نصوص**، وبتعدّل الـ array الأصلية. المثال بيوري الاتنين، وبعدين [[toSorted]] اللي بترجّع نسخة، وترتيب نصوص، وترتيب بمفتاحين، و [[with]]. اتشغّل في Node 24.

---

## ١. [[sort()]] من غير دالة

~~~text Node REPL
> [10, 1, 2].sort()
[ 1, 10, 2 ]
~~~

من غير دالة مقارنة، [[sort]] بتحوّل كل عنصر لـ string وتقارن حرف حرف زي القاموس: [["10"]] بيبدأ بـ [["1"]] فييجي قبل [["2"]]. نفس اللي بيحصل لو رتّبت كلمات.

---

## ٢. دالة المقارنة [[(a, b) => a - b]]

~~~text Node REPL
> [10, 1, 2].sort((a, b) => a - b)
[ 1, 2, 10 ]
~~~

[[sort]] بتاخد عنصرين [[a]] و [[b]] وتسأل الدالة: مين الأول؟ والدالة ترد برقم:

| الرد | المعنى |
|---|---|
| سالب | [[a]] قبل [[b]] |
| موجب | [[b]] قبل [[a]] |
| صفر | زي بعض، سيبهم |

و [[a - b]] بتطلع كده بالظبط: لو a أصغر، الفرق سالب فـ a الأول. حطينا طباعة جوه الدالة نشوف المقارنات:

~~~text الناتج (Node 24)
compare(1, 10) = -9
compare(2, 1) = 1
compare(2, 10) = -8
compare(2, 1) = 1
~~~

عدد المقارنات وترتيبها بيعتمد على الخوارزمية جوه المحرك، متعتمدش عليه. المهم إن الدالة ترجّع الإشارة الصح. و [[b - a]] بتعكس الترتيب (تنازلي).

---

## ٣. [[toSorted]]: نسخة مترتبة والأصل زي ما هو

~~~text sort.js
const prices = [300, 100, 200];
const sorted = prices.toSorted((a, b) => a - b);
console.log(prices);                     // [300, 100, 200]: الأصل زي ما هو
console.log(sorted);                     // [100, 200, 300]
~~~

~~~text الناتج
[ 300, 100, 200 ]
[ 100, 200, 300 ]
~~~

[[toSorted]] (من ES2023، يعني إصدار ٢٠٢٣ من JavaScript) بتعمل نفس شغل sort بس على **نسخة**. قارنها بـ [[sort]]:

~~~text app.js
const prices = [300, 100, 200];
const x = prices.sort();
console.log(prices, x === prices);
~~~

~~~text الناتج
[ 100, 200, 300 ] true
~~~

[[sort]] رتّبت [[prices]] نفسها، ورجّعت نفس الـ array ([[x === prices]] true). ده اللي بيبوّظ الـ state في React.

---

## ٤. ترتيب نصوص: [[localeCompare]]

~~~text Node REPL
> const names = ["Omar", "sara", "Ali"];
undefined
> names.toSorted((a, b) => a.localeCompare(b))
[ 'Ali', 'Omar', 'sara' ]
~~~

[[a.localeCompare(b)]] بتقارن نصين بقواعد اللغة وترجّع سالب أو موجب أو صفر، فبتنفع كدالة مقارنة على طول. ليه مش [[sort()]] العادية؟ اتجرّب بأسماء تانية:

~~~text الناتج من ["sara", "Omar", "ali"].sort() ثم بـ localeCompare
[ 'Omar', 'ali', 'sara' ] [ 'ali', 'Omar', 'sara' ]
~~~

الترتيب العادي بيحط كل الحروف الكبيرة قبل الصغيرة (لأن [["O"]] رقمه في الجدول أصغر من [["a"]])، فـ Omar قبل ali. [[localeCompare]] بترتّب زي القاموس.

---

## ٥. الترتيب بمفتاحين

~~~text sort.js
const products = [{ name: "B", price: 50 }, { name: "A", price: 50 }];
products.toSorted((a, b) => a.price - b.price || a.name.localeCompare(b.name));
~~~

~~~text الناتج
[ { name: 'A', price: 50 }, { name: 'B', price: 50 } ]
~~~

1. [[a.price - b.price]]: [[50 - 50]] بـ 0.
2. [[||]]: الـ 0 falsy، فـ [[||]] بتكمّل للي بعدها (درس truthy).
3. [[a.name.localeCompare(b.name)]]: قارن بالاسم، [["B"]] و [["A"]] بتطلع موجب، فـ A الأول.

لو الأسعار مختلفة، الفرق مش صفر فـ [[||]] بترجّعه على طول ومبتبصش على الاسم.

---

## ٦. [[with]]: نسخة بعنصر واحد متغير

~~~text Node REPL
> prices.with(0, 999)
[ 999, 100, 200 ]
~~~

(ده على [[prices]] قبل ما نعمل [[sort]] اللي في القسم ٣.) [[with(index, value)]] بترجّع نسخة فيها العنصر رقم 0 بقى 999، والأصل زي ما هو. ولو الـ index برا الحدود: [[RangeError: Invalid index : 5]].

---

## الخلاصة

| بتعدّل الأصل | النسخة اللي مبتعدّلش |
|---|---|
| [[sort(fn)]] | [[toSorted(fn)]] |
| [[reverse()]] | [[toReversed()]] |
| [[splice(i, n)]] | [[toSpliced(i, n)]] |
| [[arr[i] = v]] | [[with(i, v)]] |

- أرقام: [[(a, b) => a - b]] تصاعدي و [[b - a]] تنازلي. نصوص: [[localeCompare]].
- مع state أو داتا مشتركة استخدم النسخ اللي على اليمين.`,
          lines: [
            "من غير دالة: الأرقام اتحوّلت نصوص، و «10» قبل «2» كنص.",
            "دالة مقارنة: الفرق بيحدد الترتيب.",
            "array أسعار.",
            R`[[toSorted]] رجّعت array جديدة.`,
            "الأصل متلمسش.",
            "النسخة مترتبة.",
            "أسماء بحروف كبيرة وصغيرة.",
            R`[[localeCompare]] للنصوص، وبتتعامل مع الحروف الكبيرة والصغيرة والعربي صح.`,
            "منتجين بنفس السعر.",
            R`بالسعر، ولو زي بعض (0) [[||]] بتكمّل بالاسم.`,
            "نسخة فيها أول عنصر متغير."
          ],
          sol: R`[[products.toSorted((a, b) => b.price - a.price)]]: الأغلى الأول (خد بالك إن [[b - a]] تنازلي و [[a - b]] تصاعدي). ولو في المثال السعرين متساويين (50 و 50) الترتيب هيفضل زي ما هو، لأن sort في JS مضمون stable من ES2019.

[[const x = prices.sort()]] وبعدها [[prices]] بتطبع [[[100, 200, 300]]] و [[x === prices]] بـ true: sort رتّبت الأصل مكانه ورجّعت نفس الـ array، مش نسخة. ولاحظ إن الأرقام هنا طلعت صح صدفة لأنهم نفس عدد الخانات، بس [[[300, 100, 1000].sort()]] هتطلع [[[100, 1000, 300]]] لأن من غير compare function الترتيب كنصوص.`
        },
        {
          cmd: "array destructuring و spread",
          title: "تفك array لمتغيرات، وتنسخ وتدمج arrays",
          desc: R`[[const [first, second] = arr]] بتاخد العناصر بالترتيب في متغيرات، ودي اللي بتشوفها في [[const [count, setCount] = useState(0)]]. وتقدر تسيب مكان فاضي عشان تتخطى عنصر، وتحط قيمة افتراضية، وتلم الباقي بـ [[...rest]].

و [[[...a, ...b]]] بيعمل array جديدة فيها عناصر الاتنين، و [[[...a]]] نسخة. و [[[...new Set(arr)]]] أشهر طريقة تشيل التكرار.`,
          example: R`const [first, second] = ["a", "b", "c"];
const [, , third] = ["a", "b", "c"];
const [head, ...rest] = [1, 2, 3, 4];      // head = 1, rest = [2, 3, 4]
const [x = 0] = [];                        // x = 0
let a = 1, b = 2;
[a, b] = [b, a];                           // تبديل: a = 2, b = 1
const merged = [...[1, 2], ...[3, 4], 5];  // [1, 2, 3, 4, 5]
const copy = [...merged];
const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]
const withNew = [...merged, 6];            // إضافة من غير push
const rows = [[1, 2], [3, 4]];
rows.flat();                               // [1, 2, 3, 4]`,
          try: R`اكتب دالة [[removeAt(arr, i)]] بترجّع array جديدة من غير العنصر رقم i، بـ spread و slice (من غير splice). وبعدين اعملها بـ [[toSpliced]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[removeAt]] (النسخة بتاعة spread و slice).`,
          flag: "script",
          deep: {
            why: R`destructuring بيخلّي الكود أقصر وأوضح من [[arr[0]]] و [[arr[1]]]، وهو أساس الـ hooks في React. والـ spread هو الطريقة المعتادة تضيف أو تشيل من array من غير ما تعدّل الأصل.`,
            how: R`الـ destructuring بيشتغل مع أي iterable مش arrays بس: strings و Map و Set. وبيقرا بالترتيب، فالأسماء اللي بتختارها ملهاش علاقة بمحتوى العنصر.

الـ default بيشتغل لو العنصر [[undefined]] بس. و [[...rest]] لازم يبقى آخر حاجة.

التبديل [[[a, b] = [b, a]]] بيعمل array مؤقتة ويفكها. خد بالك: لو السطر اللي قبله مش مقفول بـ [[;]]، السطر اللي بيبدأ بـ [[[]] ممكن يتلزق فيه ويتفهم كـ index. عشان كده الأسلم تحط [[;]] أو تخلي Prettier يظبطها.

الـ spread نسخة سطحية (shallow): العناصر اللي هي objects مش بتتنسخ، النسخة الجديدة بتشاور على نفس الـ objects (درس reference و copy). و [[flat(depth)]] بتفرد arrays جوه arrays لعمق معيّن، و [[flatMap]] بتعمل map وبعدين flat مستوى واحد.`,
            when: R`في الـ hooks، وفي تبديل قيم، وفي إضافة عنصر لـ state: [[setItems([...items, newItem])]]. وشيل التكرار بـ Set.`,
            mistakes: R`تفتكر إن [[[...arr]]] نسخة عميقة. وتنسى [[;]] قبل سطر بيبدأ بـ [[[]]. وتفك من undefined: [[const [a] = undefined]] بترمي TypeError. وفي الانترفيو: «شيل التكرار من array» و «بدّل متغيرين من غير متغير تالت».`
          },
          teach: R`## الفكرة

حاجتين بتمشوا مع بعض:

- **destructuring**: تفك array لمتغيرات في سطر واحد، بالترتيب.
- **spread** ([[...]]): تفرد عناصر array جوه array تانية، فتعمل نسخة أو تدمج أو تضيف من غير ما تعدّل الأصل.

كل سطر في المثال اتشغّل في Node 24، وطبعنا المتغيرات بعده.

---

## ١. فك بالترتيب

~~~text destructuring.js
const [first, second] = ["a", "b", "c"];
~~~

الأقواس المربعة **على الشمال** من [[=]] مش array، دي «قالب»: أول اسم ياخد العنصر 0، والتاني ياخد العنصر 1. والـ [["c"]] ملهاش اسم فاتسابت.

~~~text الناتج من console.log(first, second)
a b
~~~

ده نفس [[const first = arr[0]; const second = arr[1];]] بس في سطر. وده اللي في React: [[const [count, setCount] = useState(0)]]، [[useState]] بترجّع array فيها عنصرين.

---

## ٢. تتخطى عناصر

~~~text destructuring.js
const [, , third] = ["a", "b", "c"];
~~~

كل فاصلة من غير اسم قبلها = «اتخطى العنصر ده». فاتخطينا 0 و 1، و [[third]] خد [["c"]].

---

## ٣. الباقي بـ [[...rest]]

~~~text destructuring.js
const [head, ...rest] = [1, 2, 3, 4];      // head = 1, rest = [2, 3, 4]
~~~

~~~text الناتج
1 [ 2, 3, 4 ]
~~~

[[...]] هنا (على الشمال) معناها «لمّ الباقي في array». لازم تبقى آخر حاجة. ولو مفيش باقي بتبقى array فاضية: [[const [r1, ...r2] = [1]]] خلّت [[r2]] بـ [[[]]].

---

## ٤. قيمة افتراضية

~~~text destructuring.js
const [x = 0] = [];                        // x = 0
~~~

الـ array فاضية، فالعنصر 0 [[undefined]]، فـ [[x]] خد الـ default. والـ default زي الباراميترات: لـ undefined بس. اتجرّب [[const [y = 0] = [null]]] و [[y]] طلعت [[null]].

---

## ٥. تبديل متغيرين

~~~text destructuring.js
let a = 1, b = 2;
[a, b] = [b, a];                           // تبديل: a = 2, b = 1
~~~

1. [[let a = 1, b = 2;]]: متغيرين في سطر واحد بفاصلة.
2. اليمين [[[b, a]]] بيتحسب الأول: array مؤقتة [[[2, 1]]].
3. الشمال [[[a, b]]] بيفكها: a بقت 2 و b بقت 1.

~~~text الناتج
2 1
~~~

مهم: [[;]] في آخر السطر الأول. اتجرّب من غيرها في ملف:

~~~text الناتج من غير ; (Node 24)
[a, b] = [b, a]
    ^

ReferenceError: Cannot access 'b' before initialization
~~~

JS قرا السطرين كأنهم [[let a = 1, b = 2[a, b] = [b, a]]]: الـ [[[]] في أول السطر اتلزقت في الـ 2 اللي قبلها.

---

## ٦. spread: دمج ونسخ وإضافة

~~~text destructuring.js
const merged = [...[1, 2], ...[3, 4], 5];  // [1, 2, 3, 4, 5]
const copy = [...merged];
const withNew = [...merged, 6];            // إضافة من غير push
~~~

- [[...[1, 2]]] جوه array جديدة = حط [[1, 2]] هنا كعناصر منفصلة. فـ merged بقت [[[1, 2, 3, 4, 5]]].
- [[[...merged]]]: array جديدة بنفس العناصر. نسخة.
- [[[...merged, 6]]]: نسخة + عنصر في الآخر، و merged نفسها متلمستش.

~~~text الناتج من console.log(copy === merged, withNew, merged)
false [ 1, 2, 3, 4, 5, 6 ] [ 1, 2, 3, 4, 5 ]
~~~

[[copy === merged]] false: array تانية في الذاكرة. بس النسخة **سطحية** (shallow): لو العناصر objects، النسخة بتشاور على نفس الـ objects:

~~~text app.js
const objs = [{ n: 1 }];
const cp = [...objs];
cp[0].n = 99;
console.log(objs);
~~~

~~~text الناتج
[ { n: 99 } ]
~~~

---

## ٧. شيل التكرار بـ Set

~~~text destructuring.js
const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]
~~~

~~~text الناتج من console.log(new Set([1, 1, 2, 3, 3]), unique)
Set(3) { 1, 2, 3 } [ 1, 2, 3 ]
~~~

1. [[new Set([...])]]: [[Set]] مجموعة مبتقبلش تكرار، فبتشيل التكرار لوحدها. بس هي مش array.
2. [[[...set]]]: افردها جوه array.

---

## ٨. [[flat]]

~~~text destructuring.js
const rows = [[1, 2], [3, 4]];
rows.flat();                               // [1, 2, 3, 4]
~~~

[[rows]] array جواها arrays. [[flat()]] بتفردها مستوى واحد. ولو العمق أكتر:

~~~text الناتج من [1, [2, [3, [4]]]].flat() و flat(Infinity)
[ 1, 2, [ 3, [ 4 ] ] ] [ 1, 2, 3, 4 ]
~~~

---

## الخلاصة

| الكود | مكان [[...]] | المعنى |
|---|---|---|
| [[const [a, b] = arr]] | - | فك بالترتيب |
| [[const [, , c] = arr]] | - | اتخطى عناصر |
| [[const [h, ...rest] = arr]] | شمال [[=]] | لمّ الباقي |
| [[const [x = 0] = arr]] | - | default لو undefined |
| [[[...a, ...b]]] | يمين [[=]] | دمج / نسخة سطحية |
| [[[...new Set(arr)]]] | يمين [[=]] | شيل التكرار |

التمرين اللي تحت عايز array جديدة من غير عنصر معيّن والأصل يفضل زي ما هو: فكّر إزاي [[slice]] (درس string methods، وبتشتغل على الـ arrays بنفس الطريقة) و spread ممكن يساعدوك.`,
          lines: [
            "أول عنصرين بالترتيب.",
            "الفواصل الفاضية بتتخطى عناصر: خدنا التالت بس.",
            R`الأول في [[head]]، والباقي في array اسمها [[rest]].`,
            R`العنصر مش موجود (undefined)، فأخد القيمة الافتراضية.`,
            "متغيرين.",
            "بدّلهم في سطر واحد.",
            "دمج arrays.",
            "نسخة جديدة (سطحية).",
            R`[[Set]] بيشيل التكرار، والـ spread بيرجّعه array.`,
            R`array جديدة فيها عنصر زيادة، والأصل متلمسش (عكس [[push]]).`,
            "array جواها arrays.",
            R`[[flat]] بتفردها مستوى واحد.`
          ],
          sol: R`[[removeAt(["a", "b", "c", "d"], 1)]] بترجّع [[["a", "c", "d"]]] والأصل زي ما هو. و [[arr.toSpliced(1, 1)]] بترجّع نفس الناتج في سطر واحد: هي splice بس من غير ما تعدّل الأصل.

خلي بالك من index سالب: [[toSpliced(-1, 1)]] بتشيل آخر عنصر صح، لكن نسخة slice بتاعتك مع [[-1]] هتطلع array أطول من الأصل (لأن [[slice(0)]] بيرجّع كله). لو هتستخدم نسختك، افحص إن i بين 0 والطول.`,
          solCode: R`const removeAt = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
const letters = ["a", "b", "c", "d"];
console.log(removeAt(letters, 1));     // ["a", "c", "d"]
console.log(letters.toSpliced(1, 1));  // ["a", "c", "d"]
console.log(letters);                  // ["a", "b", "c", "d"]: الأصل زي ما هو`,
          check: {
            lang: "js",
            starter: R`const removeAt = (arr, i) => arr;`,
            tests: R`test("removeAt(['a', 'b', 'c', 'd'], 1) ← ['a', 'c', 'd']", () => expect(removeAt(["a", "b", "c", "d"], 1)).toEqual(["a", "c", "d"]));
test("الأصل زي ما هو", () => {
  const letters = ["a", "b", "c"];
  removeAt(letters, 0);
  expect(letters).toEqual(["a", "b", "c"]);
});
test("بترجّع array جديدة مش نفس الـ reference", () => { const a = [1, 2]; expect(removeAt(a, 5) === a).toBe(false); });
test("أول عنصر وآخر عنصر", () => expect([removeAt([1, 2, 3], 0), removeAt([1, 2, 3], 2)]).toEqual([[2, 3], [1, 2]]));
test("index برا الحدود ← نسخة زي ما هي", () => expect(removeAt([1, 2, 3], 7)).toEqual([1, 2, 3]));`,
            solution: R`const removeAt = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];`
          }
        }
      ]
    }
]);

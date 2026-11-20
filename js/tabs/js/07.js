// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "المصفوفات",
      l: 1,
      n: "map و filter و reduce بدل اللوبات، و find و some، ومين بيعدّل الـ array ومين بيرجّع واحدة جديدة",
      projects: [
        { lvl: 'صغير', t: R`لوحة طلبات اليوم`, what: R`array طلبات ([[{ id, total, status }]]): عدد كل status، وإجمالي المدفوع، ومتوسط الطلب، وأكبر طلب. كله بـ [[filter]] و [[map]] و [[reduce]] من غير for. من درس «map و filter و reduce».`, done: R`على طلبات الدرس (250 paid و 900 pending و 400 paid) إجمالي المدفوع 650 وأكبر طلب 900. ولو الـ array فاضية مفيش NaN ولا [[TypeError: Reduce of empty array with no initial value]].` },
        { lvl: 'صغير', t: R`ترتيب الطلاب`, what: R`array طلاب ([[{ name, score }]]): رتّبهم بالدرجة تنازلي، واللي درجاتهم زي بعض بالاسم أبجدي، من غير ما تبوّظ الأصل. من درس «sort و toSorted».`, done: R`المترتب صح، والـ array الأصلية لسه بنفس ترتيبها (اطبعها بعد الترتيب واتأكد).` },
        { lvl: 'متوسط', t: R`سلة مشتريات immutable`, what: R`[[addItem]] و [[removeItem]] و [[updateQty]] و [[cartTotal]]، كل دالة بترجّع سلة جديدة بـ spread و [[map]] و [[filter]] ومبتعدّلش القديمة. وإضافة منتج موجود بتزوّد الكمية. من وحدة «المصفوفات» و «default و rest و spread».`, done: R`لو عملت [[Object.freeze(cart)]] الأول كل الدوال لسه شغالة (لو دالة بتعمل push هتوقع بـ [[TypeError: Cannot add property ...]]). و [[updateQty(cart, id, 0)]] بتشيل المنتج، وإضافة نفس المنتج مرتين بتخلي الكمية 2 مش سطرين.` },
        { lvl: 'متوسط', t: R`بحث وفلترة منتجات`, what: R`[[search(products, { q, min, max, inStock, sortBy, page })]]: بحث بالاسم من غير ما يفرق في الحروف الكبيرة ([[includes]])، ومدى سعر، والمتاح بس، وترتيب، وصفحة ٥ منتجات بـ [[slice]]. كل الـ options ليها defaults. من وحدة «المصفوفات» و «default و rest و spread» و «string methods».`, done: R`[[search(products)]] من غير options بيرجّع أول ٥، والبحث بـ [["MUG"]] بيلاقي "Mug"، والصفحة بعد الآخر بترجّع [[[]]]، والـ products الأصلية مبتتغيّرش.` },
        { lvl: 'كبير', t: R`تقرير مبيعات من داتا API`, what: R`الصق JSON مبيعات (٢٠ عملية: id و product و qty و price و date زي [["2026-03-14"]]) في متغير، وفيهم ٣ بايظين (qty نص، price سالب، date ناقص). [[report(sales)]] بتفصل البايظ مع سببه، وتجمع الإجمالي لكل شهر (من [[date.slice(0, 7)]])، وأكتر ٣ منتجات بيعًا، وتعرض بـ [[console.table]]. واختبارات بـ [[check]]. من وحدة «المصفوفات» و «القيم والأنواع» و «الدوال».`, done: R`الـ ٣ البايظين ظاهرين في جدول لوحدهم بسبب كل واحد، والإجمالي الكلي = مجموع الشهور بالظبط (بالقروش)، والـ top 3 مترتبين تنازلي، و [[report([])]] بيطبع «مفيش مبيعات» من غير error، والـ sales الأصلية زي ما هي.`, ext: R`زوّد مقارنة كل شهر باللي قبله بالنسبة المئوية، وخلّيه يقبل فلتر بمدى تاريخ.` },
        { lvl: 'فكرة', t: R`داتا من حياتك`, what: R`اختار لستة حقيقية عندك: مصاريف الشهر، أفلام اتفرجت عليها، ماتشات فريقك، ساعات مذاكرة. اكتبها array objects وطلّع منها ٥ أسئلة ليها إجابة بـ map و filter و reduce و sort و find.`, done: R`كل سؤال إجابته دالة لوحدها ورقمها مطابق لحسبتك بإيدك على الأقل في سؤالين.`, ext: R`اعرضها في صفحة HTML بعد وحدة الـ DOM، وزوّد رسم بسيط بالـ CSS.` }
      ],
      items: [
        {
          cmd: "array literals و index و length",
          title: "array يعني إيه: لستة في متغير واحد، تقرا عنصر وتعدّله برقمه، وتزوّد وتشيل من أولها وآخرها",
          desc: R`الـ array لستة قيم مترتبة في متغير واحد: [[const cart = ["عيش", "لبن", "جبنة"];]]. بتكتبها بين [[[ ]]] (ده اسمه array literal)، وكل عنصر ليه رقم مكانه (الـ index) **بيبدأ من 0**: [[cart[0]]] أول عنصر، و [[cart[cart.length - 1]]] آخر عنصر.
• تقرا بـ [[arr[i]]] وتعدّل بـ [[arr[i] = y]]، و [[length]] عدد العناصر (وتقدر تكتب فيه كمان: [[arr.length = 0]] بتفضّيها).
• [[push]] و [[pop]] بيزوّدوا ويشيلوا من **الآخر**، و [[unshift]] و [[shift]] من **الأول**.
• [[indexOf(x)]] مكان العنصر أو [[-1]]، و [[join(", ")]] بتحوّل الـ array لنص، و [[split(", ")]] بترجّع النص array.
ولو قريت index مش موجود مفيش error: بيرجع [[undefined]]. وده أول فخ في الـ arrays.`,
          example: R`const cart = ["عيش", "لبن", "جبنة"];
console.log(cart[0], cart[2], cart.length);
cart[1] = "لبن قليل الدسم";
cart.push("بيض");
const last = cart.pop();
cart.unshift("مية");
const first = cart.shift();
console.log(cart.indexOf("جبنة"), cart.indexOf("شاي"));
const text = cart.join("، ");
console.log(text, text.split("، "));`,
          try: R`اعمل [[const scores = [70, 85, 90];]]. اطبع أول درجة وآخر درجة من غير ما تكتب الرقم 2 (استخدم [[length]]). زوّد درجة 60 في الآخر، وغيّر أول درجة لـ 75، واطبع مكان 90 بـ [[indexOf]]. وبعدين اطبع [[scores[10]]] وشوف بيحصل إيه، واكتب [[scores[10] = 100]] واطبع الـ array كلها و [[length]].`,
          sol: R`~~~js scores.js
const scores = [70, 85, 90];
console.log(scores[0], scores[scores.length - 1]);
scores.push(60);
scores[0] = 75;
console.log(scores, scores.indexOf(90));
console.log(scores[10]);
scores[10] = 100;
console.log(scores, scores.length);
~~~

~~~text الناتج
70 90
[ 75, 85, 90, 60 ] 2
undefined
[ 75, 85, 90, 60, <6 empty items>, 100 ] 11
~~~

- [[scores[scores.length - 1]]]: الطول 3، والـ index بيبدأ من 0، فآخر عنصر عند 2. كده الكود شغال مهما الطول اتغيّر.
- [[scores[10]]] مش error: بيرجّع [[undefined]] بهدوء لأن مفيش عنصر هناك.
- الكتابة في [[scores[10]]] **بتطوّل** الـ array لـ 11، والأماكن من 4 لـ 9 بقت فاضية (holes). Node بيكتبها [[<6 empty items>]]. ده نادرًا ما بيبقى قصدك: في القسم ٩ من الشرح هتعرف ليه تتجنبه.`,
          teach: R`## الفكرة: لستة في متغير واحد

عندك ٣ حاجات تشتريها. من غير array هتكتب:

~~~js
const item1 = "عيش";
const item2 = "لبن";
const item3 = "جبنة";
~~~

وبعدين؟ لو بقوا ٢٠؟ ولو عايز تلف عليهم بـ loop، أو تعدّهم، أو تضيف واحد وانت شغال؟ مفيش طريقة تقول «كل المتغيرات اللي اسمها item». الـ **array** (مصفوفة) بتحل ده: **قيمة واحدة جواها لستة قيم مترتبة**، في متغير واحد:

~~~js
const cart = ["عيش", "لبن", "جبنة"];
~~~

ودلوقتي تقدر: تعدّهم ([[cart.length]])، وتلف عليهم ([[for (const item of cart)]] من درس «for...of و for...in»)، وتزوّد وتشيل، وتبعتهم لدالة كحاجة واحدة. أي «لستة» في برنامج حقيقي (منتجات، رسايل، درجات، صفوف من داتابيز) هي array. كل الأرقام اللي تحت من تشغيل الكود على Node 24.22 (ويندوز 11).

---

## ١. array literals: [[[a, b, c]]]

الطريقة اللي هتكتب بيها array في ٩٩٪ من الوقت اسمها **array literal**: قوسين مربعين، والعناصر جواهم مفصولة بـ [[,]].

~~~js literals.js
const mixed = [1, "اتنين", true, null, { id: 3 }, [4, 5]];
console.log(mixed.length, typeof mixed, Array.isArray(mixed), Array.isArray("abc"));
const empty = [];
console.log(empty, empty.length);
const long = [
  "سطر أول",
  "سطر تاني",
];
console.log(long.length);
~~~

~~~text الناتج
6 object true false
[] 0
2
~~~

- **أي نوع ينفع يبقى عنصر**، حتى خليط: رقم ونص و boolean و [[null]] و object و array جوه array. في الشغل الحقيقي بتخلّي العناصر من نوع واحد (كلها أرقام، أو كلها objects بنفس الشكل) عشان الكود اللي بيلف عليها يبقى بسيط.
- [[typeof]] بيقول [["object"]] مش [["array"]]: الـ array نوع خاص من الـ objects (درس «typeof»). عشان تسأل «ده array؟» استخدم [[Array.isArray(x)]].
- [[[]]] array فاضية طولها 0، وهي البداية المعتادة قبل ما تملاها بـ [[push]].
- **الفاصلة الأخيرة** ([["سطر تاني",]]) مسموحة ومش بتزوّد عنصر: الطول 2. بنكتبها لما الـ array على كذا سطر، عشان لما تزوّد سطر الـ diff في Git يبقى سطر واحد.

---

## ٢. الـ index من 0: [[arr[i]]] للقراية

كل عنصر ليه رقم مكانه، اسمه **index**، و**بيبدأ من 0** مش 1:

~~~text الأماكن
 index:    0       1       2
 القيمة:  "عيش"   "لبن"   "جبنة"
~~~

~~~js read.js
const a = [10, 20, 30];
console.log(a[0], a[a.length - 1], a[3], a[-1], a["1"], a[1.5]);
~~~

~~~text الناتج
10 30 undefined undefined 20 undefined
~~~

| القراية | النتيجة | ليه |
|---|---|---|
| [[a[0]]] | 10 | أول عنصر دايمًا عند 0 |
| [[a[a.length - 1]]] | 30 | آخر عنصر: الطول 3، فآخر index هو 2 |
| [[a[3]]] | [[undefined]] | برّه المدى: مفيش error، بيرجع [[undefined]] بهدوء |
| [[a[-1]]] | [[undefined]] | السالب مش «من الآخر» مع الأقواس. [[a.at(-1)]] هي اللي بتعمل كده (وحدة «المصفوفات و Map و Set كاملين») |
| [[a["1"]]] | 20 | الـ index بيتحوّل لنص من جوه، فـ [["1"]] و [[1]] نفس المكان |
| [[a[1.5]]] | [[undefined]] | مفيش مكان نص: [["1.5"]] اسم خاصية مش موجودة |

**ليه من 0؟** الرقم معناه «بعد أول عنصر بكام خطوة»: الأول بعد 0 خطوات. وده نفس اللي شفته في النصوص: [["abc"[0]]] بـ [["a"]] (درس «string methods»).

**الفخ الأشهر:** [[undefined]] بيكمّل في الكود لحد ما يوقع بعيد عن مكان الغلط:

~~~text الناتج: names[names.length].length
TypeError: Cannot read properties of undefined (reading 'length')
~~~

[[names[names.length]]] برّه المدى دايمًا (آخر index هو [[length - 1]])، فرجع [[undefined]]، وبعدين [[.length]] عليه وقعت. لو شفت الرسالة دي جنب array، دوّر على index غلط.

---

## ٣. [[arr[i] = y]]: تعدّل عنصر

نفس الأقواس، بس على شمال [[=]]:

~~~js write.js
const b = ["x", "y"];
b[0] = "X";
b[4] = "Z";
console.log(b, b.length);
~~~

~~~text الناتج
[ 'X', 'y', <2 empty items>, 'Z' ] 5
~~~

- [[b[0] = "X"]]: بدّلت أول عنصر. الـ array نفسها هي هي، اللي اتغيّر جواها.
- [[b[4] = "Z"]]: الـ index ده برّه المدى، فالـ array **طوّلت** لـ 5، والمكانين 2 و 3 بقوا فاضيين (القسم ٩). لو قصدك تزوّد في الآخر استخدم [[push]].
- **[[const]] مش بيمنع التعديل:** [[const]] معناها إن المتغير مينفعش يشاور على array تانية، مش إن الـ array متجمّدة. فـ [[b[0] = "X"]] شغالة، أما [[b = ["new"]]] فبتوقع:

~~~text الناتج: const c = ["a"]; c = ["b"];
TypeError: Assignment to constant variable.
~~~

---

## ٤. Array.prototype.length: العدد، وتكتب فيه كمان

[[length]] خاصية (من غير قوسين) = **آخر index + 1**. ومش للقراية بس:

~~~js length.js
const d = [1, 2, 3, 4, 5];
d.length = 2; console.log(d);
d.length = 4; console.log(d);
d.length = 0; console.log(d);
~~~

~~~text الناتج
[ 1, 2 ]
[ 1, 2, <2 empty items> ]
[]
~~~

| الكتابة | بيحصل إيه |
|---|---|
| [[d.length = 2]] | بيقص: العناصر من index 2 ولبعد اتمسحت **ومش بترجع** لو كبّرت الطول تاني |
| [[d.length = 4]] | بيطوّل بأماكن فاضية مش [[undefined]] حقيقية |
| [[d.length = 0]] | بيفضّي الـ array نفسها: أي متغير تاني بيشاور عليها هيشوفها فاضية كمان |

والفرق بين [[d.length = 0]] و [[d = []]]: التانية بتعمل array **جديدة** (ومش هتنفع مع [[const]] أصلًا)، والقديمة لسه موجودة عند أي حد شايلها (درس «reference و copy»).

---

## ٥. Array.prototype.push و Array.prototype.pop: من الآخر

~~~js end.js
const cart = ["عيش", "لبن قليل الدسم", "جبنة"];
console.log(cart.push("بيض"), cart);
const last = cart.pop();
console.log(last, cart);
console.log([1, 2].push(3, 4, 5));
console.log([].pop());
~~~

~~~text الناتج
4 [ 'عيش', 'لبن قليل الدسم', 'جبنة', 'بيض' ]
بيض [ 'عيش', 'لبن قليل الدسم', 'جبنة' ]
5
undefined
~~~

- [[push(x)]] بيزوّد في الآخر و**بيرجّع الطول الجديد** (4)، مش الـ array. وتقدر تبعتله كذا عنصر مرة واحدة: [[push(3, 4, 5)]] رجّعت 5.
- [[pop()]] بيشيل آخر عنصر و**بيرجّعه** ("بيض")، فتقدر تشيله في متغير.
- [[pop()]] على array فاضية: [[undefined]] من غير error. فلو بتلف بـ [[while]] اسأل عن [[length]] مش عن الناتج (لأن عنصر قيمته [[undefined]] هيلخبطك).
- الاتنين **بيعدّلوا الـ array نفسها**. وده اسمه stack (كومة أطباق): آخر واحد دخل أول واحد يطلع. زي «تراجع» (Ctrl+Z).

---

## ٦. Array.prototype.shift و Array.prototype.unshift: من الأول

~~~js start.js
const cart = ["عيش", "لبن قليل الدسم", "جبنة"];
console.log(cart.unshift("مية"), cart);
const first = cart.shift();
console.log(first, cart);
const q = [3, 4];
console.log(q.unshift(1, 2), q);
~~~

~~~text الناتج
4 [ 'مية', 'عيش', 'لبن قليل الدسم', 'جبنة' ]
مية [ 'عيش', 'لبن قليل الدسم', 'جبنة' ]
4 [ 1, 2, 3, 4 ]
~~~

- [[unshift(x)]] بيزوّد في **الأول** وبيرجّع الطول الجديد. و [[unshift(1, 2)]] بيحطّهم بنفس ترتيبهم: [[[1, 2, 3, 4]]].
- [[shift()]] بيشيل **أول** عنصر وبيرجّعه، و[[undefined]] لو فاضية.
- **كل العناصر بتتحرك:** بعد [[shift]] اللي كان عند 1 بقى عند 0. عشان كده [[shift]] على array كبيرة أبطأ بكتير من [[pop]] (اتقاس في التمرين السادس: على 100 ألف عنصر [[shift]] حوالي ثانية و [[pop]] حوالي ملي ثانية).
- [[push]] + [[shift]] = طابور (queue): أول واحد دخل أول واحد يطلع، زي طابور البنك.

---

## ٧. Array.prototype.indexOf: العنصر ده فين؟

~~~js find.js
console.log(cart.indexOf("جبنة"), cart.indexOf("شاي"));
console.log([NaN].indexOf(NaN), [NaN].includes(NaN), [{ id: 1 }].indexOf({ id: 1 }), ["1", 1].indexOf(1), [1, 2, 1].indexOf(1, 1));
~~~

~~~text الناتج
2 -1
-1 true -1 1 2
~~~

| النداء | النتيجة | ليه |
|---|---|---|
| [[indexOf("جبنة")]] | 2 | مكان **أول** مرة لقاه |
| [[indexOf("شاي")]] | [[-1]] | مش موجود. اسأل [[=== -1]]، مش [[if (i)]]: لأن 0 مكان حقيقي و falsy |
| [[[NaN].indexOf(NaN)]] | [[-1]] | بيقارن بـ [[===]]، و [[NaN === NaN]] بـ [[false]]. [[includes]] بتلاقيه |
| [[[{ id: 1 }].indexOf({ id: 1 })]] | [[-1]] | object تاني بنفس الشكل مش هو نفسه (درس «reference و copy») |
| [[["1", 1].indexOf(1)]] | 1 | [[===]] مبيحوّلش أنواع: النص [["1"]] مش الرقم 1 |
| [[[1, 2, 1].indexOf(1, 1)]] | 2 | الباراميتر التاني: ابدأ الدوّير من index 1 |

لو عايز «موجود ولا لأ» بس، [[includes]] أوضح (درس «find و some و includes»). و [[indexOf]] لما محتاج المكان نفسه عشان تعدّل فيه: [[cart[cart.indexOf("لبن")] = "زبادي"]] (بس اتأكد الأول إنه مش [[-1]]، وإلا [[cart[-1] = ...]] هتعمل خاصية غريبة اسمها [["-1"]]).

---

## ٨. Array.prototype.join و [[split]]: من array لنص وبالعكس

~~~js text.js
const text = cart.join("، ");
console.log(text, text.split("، "));
console.log([1, 2, 3].join(), [1, 2, 3].join(""), [1, null, undefined, 3].join("-"), [].join(","));
console.log("abc".split(""), "".split(","), "a,,b".split(","), "a, b".split(","));
~~~

~~~text الناتج
عيش، لبن قليل الدسم، جبنة [ 'عيش', 'لبن قليل الدسم', 'جبنة' ]
1,2,3 123 1---3
[ 'a', 'b', 'c' ] [ '' ] [ 'a', '', 'b' ] [ 'a', ' b' ]
~~~

- [[join(sep)]] بتلزق العناصر بالفاصل اللي تختاره وترجّع **نص**. من غير فاصل: [[,]]. و [[""]] من غير فاصل خالص.
- [[null]] و [[undefined]] بيبقوا نص فاضي في [[join]] ([["1---3"]]: مكانهم فاضي بين الشرط). و [[[].join(",")]] نص فاضي.
- [[split(sep)]] (من درس «string methods») العكس: بتقطّع النص عند الفاصل وترجّع array. فـ [[text.split("، ")]] رجّعت نفس الـ array: ده الـ **round trip**.
- فخاخ [[split]]: [[""]] بيرجّع [[[""]]] (عنصر واحد فاضي، مش [[[]]])، والفاصلتين ورا بعض بيعملوا عنصر فاضي، و [["a, b".split(",")]] سابت المسافة في [[" b"]] (نضّفها بـ [[trim]]).
- **الـ round trip بيبوظ** لو عنصر جواه الفاصل نفسه: [["مصنع النور, فرع 2"]] بعد [[join(",")]] و [[split(",")]] بقت عنصرين (التمرين الرابع). ده سبب إن CSV الحقيقي بيحط القيم دي بين علامات تنصيص، وإن JSON (درس «JSON») أأمن لتخزين array.

---

## ٩. الفراغات (holes) والـ index برّه المدى

~~~js holes.js
const h = [1, , 3];
console.log(h, h.length, 1 in h, h[1]);
for (const x of h) console.log("for of", x);
h.forEach(x => console.log("forEach", x));
~~~

~~~text الناتج
[ 1, <1 empty item>, 3 ] 3 false undefined
for of 1
for of undefined
for of 3
forEach 1
forEach 3
~~~

- [[[1, , 3]]] (فاصلتين ورا بعض) أو [[arr[10] = x]] أو [[length]] أكبر: بيعملوا **hole**: مكان محسوب في [[length]] بس **مفيهوش عنصر أصلًا**. [[1 in h]] بـ [[false]] (السؤال «فيه عنصر عند 1؟»).
- القراية منه [[undefined]]، زي index برّه المدى. بس الدوال مش بتتعامل معاه زي بعض: [[for...of]] بيدّيك [[undefined]]، و [[forEach]] **بيتخطاه** خالص (سطرين بس). جدول كامل بمين بيتخطى ومين لأ في وحدة «المصفوفات و Map و Set كاملين».
- **القاعدة:** متعملش holes. زوّد بـ [[push]]، واعمل array بطول معين بـ [[Array.from({ length: n }, ...)]] (الوحدة الجاية) مش بـ [[arr[n] = x]].

---

## الخلاصة

| عايز | اكتب | بيعدّل الأصل؟ | بيرجّع |
|---|---|---|---|
| array جديدة | [[[a, b, c]]] أو [[[]]] | لأ | الـ array |
| أول / آخر عنصر | [[arr[0]]] / [[arr[arr.length - 1]]] | لأ | العنصر أو [[undefined]] |
| تغيّر عنصر | [[arr[i] = y]] | أيوه | [[y]] |
| العدد | [[arr.length]] | لأ | رقم |
| تفضّي أو تقص | [[arr.length = 0]] / [[arr.length = n]] | أيوه | |
| تزوّد / تشيل من الآخر | [[push(x)]] / [[pop()]] | أيوه | الطول الجديد / العنصر اللي اتشال |
| تزوّد / تشيل من الأول | [[unshift(x)]] / [[shift()]] | أيوه (وكل العناصر بتتحرك) | الطول الجديد / العنصر اللي اتشال |
| مكان عنصر | [[indexOf(x)]] | لأ | الـ index أو [[-1]] |
| array لنص ورجوع | [[join(sep)]] و [[split(sep)]] | لأ | نص / array |

> الدروس اللي بعد كده في الوحدة دي بتلف على الـ array كلها: [[map]] و [[filter]] و [[reduce]] و [[find]] و [[sort]]. وكل method تانية (عددهم أكتر من ٣٠) في وحدة «المصفوفات و Map و Set كاملين».`,
          lines: [
            R`array literal: قوسين مربعين وجواهم ٣ نصوص مفصولة بفواصل. المتغير [[cart]] شايل اللستة كلها كقيمة واحدة، وأماكنها 0 و 1 و 2.`,
            R`[[cart[0]]] أول عنصر «عيش» (الـ index بيبدأ من 0)، و [[cart[2]]] تالت عنصر «جبنة»، و [[cart.length]] بـ 3 عدد العناصر. الناتج: [[عيش جبنة 3]].`,
            R`[[cart[1] = ...]] بتبدّل العنصر اللي عند index 1 («لبن») بقيمة جديدة. ده تعديل جوه الـ array، فـ [[const]] مش بيمنعه.`,
            R`[[push]] بتزوّد «بيض» في الآخر، فالطول بقى 4، وبترجّع الطول الجديد (4) لو حبيت تستخدمه.`,
            R`[[pop]] بتشيل آخر عنصر («بيض») وترجّعه في [[last]]، فالـ array رجعت ٣ عناصر.`,
            R`[[unshift]] بتزوّد «مية» في **الأول**، فكل العناصر اتزحزحت خطوة: «عيش» بقى عند 1.`,
            R`[[shift]] بتشيل أول عنصر («مية») وترجّعه في [[first]]، والباقي رجع مكانه: «عيش» عند 0 تاني.`,
            R`[[indexOf]] بيدوّر على القيمة ويرجّع مكانها: «جبنة» عند 2، و «شاي» مش موجود فـ [[-1]]. الناتج: [[2 -1]].`,
            R`[[join("، ")]] بتلزق العناصر في نص واحد بينهم فاصلة عربي ومسافة: [["عيش، لبن قليل الدسم، جبنة"]].`,
            R`بيطبع النص، وبعده [[split]] بنفس الفاصل اللي رجّع نفس الـ array: ده الـ round trip من array لنص ورجوع.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const a = [10, 20, 30]; a[5] = 60;]]. اكتب قبل التشغيل: [[a.length]] و [[a[4]]] و [[a.indexOf(60)]] و [[a.indexOf(undefined)]]، وشكل [[console.log(a)]] (من القسم ٣ و ٩ في الشرح).`, done: R`كتبت 6 و [[undefined]] و 5 و [[-1]]، و [[[ 10, 20, 30, <2 empty items>, 60 ]]]، وعرفت ليه [[indexOf(undefined)]] مش 3.`, sol: R`~~~js predict.js
const a = [10, 20, 30];
a[5] = 60;
console.log(a.length, a[4], a.indexOf(60), a.indexOf(undefined));
console.log(a);
~~~

~~~text الناتج
6 undefined 5 -1
[ 10, 20, 30, <2 empty items>, 60 ]
~~~

- الكتابة عند index 5 خلّت الطول 6 (آخر index + 1)، والمكانين 3 و 4 **فاضيين** (holes).
- [[a[4]]] بـ [[undefined]] لأنه مفيش عنصر هناك، والقراية من مكان فاضي زي القراية من برّه المدى.
- [[a.indexOf(undefined)]] بـ [[-1]] مش 3: [[indexOf]] **بيتخطى الأماكن الفاضية** خالص (مفيش عنصر يتقارن). لو كانت [[[10, undefined]]] (قيمة [[undefined]] حقيقية) كانت هترجّع 1. وده سبب إن الـ holes بتلخبط.` },
            { lvl: 'سريع', t: R`**محاكاة:** (١) طابور عيادة: ٣ مرضى بيوصلوا بـ [[push]]، والدكتور بيدخّل أول واحد بـ [[shift]]، وبعدين حالة طوارئ بتيجي في **أول** الطابور بـ [[unshift]]، واطبع الطابور بـ [[join(" ← ")]]. (٢) زرار «تراجع»: ٣ عمليات بـ [[push]] وتراجع واحد بـ [[pop]] (من القسم ٥ و ٦ في الشرح).`, done: R`أول من دخل «سارة»، والطوارئ دخلت قبل «عمر»، والطابور في الآخر [[عمر ← منى]]، والتراجع شال آخر عملية بس.`, sol: R`~~~js clinic.js
const queue = [];
queue.push("سارة");
queue.push("عمر");
queue.push("منى");
console.log("دخل الدكتور:", queue.shift(), "| مستنيين:", queue.length);
queue.unshift("حالة طوارئ");
console.log("دخل الدكتور:", queue.shift(), "| الطابور:", queue.join(" ← "));
const undo = [];
undo.push("كتب: أهلا");
undo.push("مسح كلمة");
undo.push("كتب: بيكم");
console.log("تراجع عن:", undo.pop(), "| فاضل:", undo);
~~~

~~~text الناتج
دخل الدكتور: سارة | مستنيين: 2
دخل الدكتور: حالة طوارئ | الطابور: عمر ← منى
تراجع عن: كتب: بيكم | فاضل: [ 'كتب: أهلا', 'مسح كلمة' ]
~~~

- **الطابور (queue):** بتزوّد من آخر ([[push]]) وبتاخد من أول ([[shift]])، فاللي وصل الأول بيدخل الأول. و [[unshift]] بتكسر الدور عمدًا للطوارئ.
- **التراجع (stack):** بتزوّد وبتاخد من نفس الناحية (الآخر)، فآخر عملية هي أول واحدة تتلغي. ده بالظبط إزاي Ctrl+Z شغال في أي محرر.
- [[shift]] و [[pop]] بيرجّعوا العنصر اللي اتشال، فاستخدمناه في نفس سطر الطباعة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[for (let i = 0; i <= names.length; i++) console.log(i, names[i].length);]] على [[["سارة", "عمر", "منى"]]] بيطبع ٣ سطور وبعدين يوقع. شغّله، اقرا الـ error، ولاقي السطر اللي فيه المشكلة وصلّحه (من القسم ٢ في الشرح).`, done: R`شفت [[TypeError: Cannot read properties of undefined (reading 'length')]]، وعرفت إن [[i]] وصل 3 و [[names[3]]] برّه المدى، والتصليح بـ [[<]] بيطبع ٣ سطور ومفيش error.`, sol: R`~~~js loop-bug.js
const names = ["سارة", "عمر", "منى"];
for (let i = 0; i <= names.length; i++) console.log(i, names[i]);
try { console.log(names[names.length].length); } catch (e) { console.log(e.constructor.name + ": " + e.message); }
for (let i = 0; i < names.length; i++) console.log(i, names[i], names[i].length);
~~~

~~~text الناتج
0 سارة
1 عمر
2 منى
3 undefined
TypeError: Cannot read properties of undefined (reading 'length')
0 سارة 4
1 عمر 3
2 منى 3
~~~

- الطول 3، فالأماكن 0 و 1 و 2. الشرط [[i <= names.length]] بيخلي [[i]] يوصل 3، و [[names[3]]] بـ [[undefined]] (مش error)، وبعدين [[.length]] على [[undefined]] هي اللي وقعت.
- التصليح: [[i < names.length]]. ده اسمه off-by-one، أشهر باج في الـ loops.
- الأحسن خالص: [[for (const name of names)]] مفيهوش index تغلط فيه أصلًا. استخدم الـ index بس لما محتاج الرقم نفسه.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** سطر CSV من شيت عملاء: [["1023,منى علي,القاهرة,250"]] (الرقم، والاسم، والمدينة، والرصيد). قطّعه بـ [[split]]، وغيّر المدينة لـ «الجيزة»، وزوّد الرصيد 50، ورجّعه سطر بـ [[join]]. وبعدين جرّب عميل اسمه [["مصنع النور, فرع 2"]] وشوف الـ round trip بيعمل إيه (من القسم ٨ في الشرح).`, done: R`السطر بقى [[1023,منى علي,الجيزة,300]] (مش [[25050]])، وعرفت إن الاسم اللي فيه فاصلة بيطلع ٥ حتت بدل ٤.`, sol: R`~~~js csv-row.js
const row = "1023,منى علي,القاهرة,250";
const cells = row.split(",");
cells[3] = String(Number(cells[3]) + 50);
cells[2] = "الجيزة";
console.log(cells, cells.join(","));
const bad = ["1024", "مصنع النور, فرع 2", "طنطا", "90"].join(",");
console.log(bad, bad.split(",").length);
~~~

~~~text الناتج
[ '1023', 'منى علي', 'الجيزة', '300' ] 1023,منى علي,الجيزة,300
1024,مصنع النور, فرع 2,طنطا,90 5
~~~

- [[split(",")]] رجّعت ٤ نصوص، فالرصيد [["250"]] **نص**. لو كتبت [[cells[3] + 50]] كان طلع [["25050"]] (لزق نصوص). عشان كده [[Number(...)]] الأول، وبعدين [[String]] عشان يرجع نص زي باقي الخانات.
- [[cells[2] = ...]] تعديل بالـ index: عارفين إن المدينة الخانة التالتة من شكل الملف.
- السطر التاني: اسم فيه [[,]] اتقسم لاتنين، فالخانات بقت ٥ والرصيد اتزحزح لمكان المدينة. CSV الحقيقي بيحل ده بعلامات تنصيص حوالين القيمة، فمتقراش CSV حقيقي بـ [[split(",")]] (استخدم مكتبة، أو JSON لما انت اللي بتكتب الملف).` },
            { lvl: 'تحدي', t: R`**مسألة:** [[rotate(list, k)]] بترجّع array **جديدة** فيها العناصر متلفّة [[k]] خطوات لشمال ([[rotate(["سبت", "أحد", "اتنين", "تلات"], 1)]] = [[["أحد", "اتنين", "تلات", "سبت"]]])، من غير ما تغيّر الأصل. واتعامل مع: array فاضية، و [[k]] أكبر من الطول، و [[k = 0]]. استخدم [[push]] و [[shift]] بس. حلّها في المربع اللي تحت.`, done: R`كل الاختبارات عدّت: [[rotate(days, 6)]] زي [[rotate(days, 2)]]، و [[rotate([], 3)]] بترجّع [[[]]] من غير loop لا نهائي، و [[days]] بعد كل ده لسه زي ما هي.`, sol: R`~~~js rotate.js
function rotate(list, k) {
  const out = [];
  for (const x of list) out.push(x);
  if (out.length === 0) return out;
  const steps = k % out.length;
  for (let i = 0; i < steps; i++) out.push(out.shift());
  return out;
}
const days = ["سبت", "أحد", "اتنين", "تلات"];
console.log(rotate(days, 1), rotate(days, 6), rotate([], 3), rotate(days, 0), days);
~~~

~~~text الناتج
[ 'أحد', 'اتنين', 'تلات', 'سبت' ] [ 'اتنين', 'تلات', 'سبت', 'أحد' ] [] [ 'سبت', 'أحد', 'اتنين', 'تلات' ] [ 'سبت', 'أحد', 'اتنين', 'تلات' ]
~~~

- **النسخة الأول:** [[out]] array جديدة بنملاها من [[list]]. لو اشتغلنا على [[list]] نفسها بـ [[shift]] و [[push]] كنا هنبوّظ الـ array بتاعة اللي نادى الدالة.
- **لفة واحدة = [[out.push(out.shift())]]:** شيل الأول وحطه في الآخر. السطر بيتقري من جوه لبرة.
- **[[k % out.length]]:** ٦ لفات على ٤ عناصر زي لفتين بالظبط، فبنوفّر اللف الزيادة.
- **الفاضية قبل [[%]]:** [[k % 0]] بـ [[NaN]]، و [[i < NaN]] دايمًا [[false]] فكانت هتعدّي بالصدفة. بس الشرط الصريح أوضح لأي حد هيقرا الكود.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل array فيها 10000 رقم، وفضّيها مرة بـ [[pop]] في [[while (a.length)]] ومرة بـ [[shift]]، وقيس كل مرة بـ [[performance.now()]]. وبعدين نفس الكلام على 100000. اكتب الأرقام، واشرح في سطرين ليه الفرق بيكبر كده (من القسم ٦ في الشرح).`, done: R`عندك ٤ أرقام حقيقية من جهازك، والفرق على 100000 بقى مئات المرات مش الضعف، وكتبت إن [[shift]] بتحرّك كل العناصر الباقية.`, sol: R`~~~js shift-vs-pop.js
function build(n) { const a = []; for (let i = 0; i < n; i++) a.push(i); return a; }
for (const n of [10000, 100000]) {
  let a = build(n);
  let t = performance.now();
  while (a.length) a.pop();
  const pop = performance.now() - t;
  a = build(n);
  t = performance.now();
  while (a.length) a.shift();
  const shift = performance.now() - t;
  console.log(n, "pop:", pop.toFixed(2) + "ms", "shift:", shift.toFixed(2) + "ms");
}
~~~

~~~text الناتج (Node 24.22، تشغيلتين على نفس الجهاز)
10000 pop: 0.26ms shift: 0.64ms
100000 pop: 1.24ms shift: 780.19ms

10000 pop: 0.20ms shift: 0.58ms
100000 pop: 1.02ms shift: 1004.38ms
~~~

- [[pop]] بيشيل آخر عنصر ويقلّل [[length]]، ومفيش حاجة تانية تتحرك، فكل نداء تقريبًا نفس الوقت.
- [[shift]] لازم ينقل كل العناصر الباقية خطوة لشمال عشان الـ index يبدأ من 0 تاني. لو عندك n عنصر، أول [[shift]] بيحرّك n-1، واللي بعده n-2... المجموع حوالي n²/2 حركة. عشان كده ١٠ أضعاف العناصر خلّت الوقت أكتر من ألف ضعف.
- على 10000 الفرق صغير لأن V8 عنده حيلة للـ arrays الصغيرة (بيحرّك بداية الـ array في الذاكرة بدل ما ينقل العناصر)، وجرّبنا أرقام تانية: 20000 أخدت 49ms و 50000 أخدت 263ms. **الخلاصة:** طابور كبير ([[shift]] كتير) محتاج تصميم تاني (index بيتحرك بدل [[shift]]، وده في المستوى ٣)، وطابور فيه مية عنصر مفيهوش أي مشكلة.` },
          ],
          check: {
            lang: "js",
            starter: R`function rotate(list, k) {
  return list;
}`,
            tests: R`const days = ["سبت", "أحد", "اتنين", "تلات"];
test("لفة واحدة", () => expect(rotate(days, 1)).toEqual(["أحد", "اتنين", "تلات", "سبت"]));
test("k أكبر من الطول", () => expect(rotate(days, 6)).toEqual(["اتنين", "تلات", "سبت", "أحد"]));
test("k = 0 بترجّع نفس الترتيب", () => expect(rotate(days, 0)).toEqual(["سبت", "أحد", "اتنين", "تلات"]));
test("array فاضية", () => expect(rotate([], 3)).toEqual([]));
test("الأصل متغيّرش وراجعت array جديدة", () => { const r = rotate(days, 2); expect(days).toEqual(["سبت", "أحد", "اتنين", "تلات"]); expect(r === days).toBe(false); });`,
            solution: R`function rotate(list, k) {
  const out = [];
  for (const x of list) out.push(x);
  if (out.length === 0) return out;
  const steps = k % out.length;
  for (let i = 0; i < steps; i++) out.push(out.shift());
  return out;
}`
          },
          flag: "script",
          ref: [
            { t: "MDN: Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
            { t: "MDN: Array literal notation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array#array_literal_notation" },
            { t: "MDN: Array.prototype.length", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length" },
            { t: "MDN: Array.prototype.push()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" },
            { t: "MDN: Array.prototype.pop()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop" },
            { t: "MDN: Array.prototype.shift()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift" },
            { t: "MDN: Array.prototype.unshift()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift" },
            { t: "MDN: Array.prototype.indexOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf" },
            { t: "MDN: Array.prototype.join()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join" },
            { t: "MDN: String.prototype.split()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" },
            { t: "MDN Curriculum: JavaScript fundamentals، Arrays", url: "https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/" },
          ],
          pre: ["js/المتغيرات والأنواع والعمليات", "js/for و while", { to: "js/string methods", why: R`[[split]] اتشرحت هناك، وهنا هنستخدمها مع [[join]] رايح جاي` }],
          deep: {
            why: R`أي برنامج حقيقي بيتعامل مع **لستات**: منتجات في سلة، ورسايل في شات، وصفوف راجعة من API. الـ array هي الطريقة اللي اللغة بتشيل بيها لستة مترتبة في قيمة واحدة تتبعت لدالة وتتلف عليها وتتحوّل JSON. وكل الدروس اللي جاية ([[map]] و [[filter]] و [[sort]] وفي React [[items.map(...)]]) مبنية على إنك فاهم الـ index والـ length و push و pop كويس.`,
            how: R`الـ array من جوه object عادي بخاصية [[length]] ومفاتيح أرقام ([["0"]] و [["1"]]...)، عشان كده [[typeof]] بيقول [["object"]] و [[a["1"]]] زي [[a[1]]]. [[length]] دايمًا «أكبر index + 1»: لما تكتب عند index أكبر منه بيكبر لوحده، ولما تصغّره بنفسك العناصر اللي بعده بتتمسح. والمحرك (V8) بيخزّن الـ array اللي من غير holes وعناصرها نوع واحد بشكل مضغوط وسريع جدًا، والـ holes بتخليه يحوّلها لشكل أبطأ. و [[push]] و [[pop]] بيشتغلوا على الآخر فمش محتاجين يحرّكوا حاجة، أما [[shift]] و [[unshift]] فبيعيدوا ترقيم كل العناصر (اتقاس في التمرين السادس).`,
            when: R`array لما الترتيب مهم أو بتلف على الكل: لستة منتجات، خطوات، رسايل. [[push]] و [[pop]] لأي stack (تراجع، تاريخ الصفحات، أقواس مفتوحة). [[push]] و [[shift]] لطابور صغير. [[indexOf]] لما محتاج **المكان** (عشان تعدّل فيه)، و [[includes]] لما عايز «موجود؟» بس. و [[join]] لعرض اللستة كنص، و [[split]] لقراية نص بسيط (سطر إعدادات، تاجات مفصولة بفواصل). ولو بتدوّر بالـ id كتير، أو عايز من غير تكرار: [[Map]] و [[Set]] (درس «Map و Set»).`,
            mistakes: R`[[arr[arr.length]]] بدل [[arr[arr.length - 1]]] لآخر عنصر. و [[i <= arr.length]] في الـ loop. و [[if (arr.indexOf(x))]] (المكان 0 falsy، و [[-1]] truthy). و [[arr[-1]]] متوقع آخر عنصر (ده [[at(-1)]]). و [[const arr = []; arr = [...]]] (TypeError)، أو العكس: فاكر إن [[const]] بتمنع [[push]]. و [[push]] بترجّع الطول مش الـ array: [[const list = [].push(1)]] بيخلي [[list]] = 1. و [[shift]] جوه loop على array ضخمة. و [[arr[100] = x]] بيعمل 99 hole. و [[split(",")]] على CSV فيه فواصل جوه القيم.`
          }
        },
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[[1, 2, 3, 4].map(n => n * 10)]] و [[[1, 2, 3, 4].filter(n => n % 2 === 0)]].`, done: R`[[[10, 20, 30, 40]]] و [[[2, 4]]]، والأصل لسه [[[1, 2, 3, 4]]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const total = cart.reduce((s, item) => s + item.price);]] على [[[{ price: 10 }, { price: 20 }]]]. شغّلها، وجرّبها كمان على [[[]]].`, done: R`قبل التصليح بترجّع [["[object Object]20"]] (أول عنصر بقى الـ s وهو object)، وعلى [[[]]] بتوقع بـ [[TypeError: Reduce of empty array with no initial value]]. بعد ما تزوّد [[, 0]] كقيمة بداية: 30 و 0.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** منتجات جاية من API فيها [[{ name, price, inStock }]]: طلّع أسامي المتاح اللي أقل من 200، وإجمالي أسعار المتاح بس، في سلسلة filter و map و reduce.`, done: R`على Mug 120 متاح و Shirt 300 متاح و Cap 90 مش متاح: الأسامي [[["Mug"]]] والإجمالي 420.` },
            { lvl: 'تطبيق', t: R`**أشكال:** من [[[3, 5, 2]]] اطبع bar chart أفقي: كل رقم سطر [[#]] بعدده، بـ [[map]] و [[repeat]] و [[join("\n")]] من غير ولا for.`, done: R`بيطبع [[###]] ثم [[#####]] ثم [[##]]. ولو زوّدت قبل كل سطر الرقم نفسه ([[n + " " + "#".repeat(n)]]) الشكل بيبقى زي تقرير.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** جمّع الطلبات حسب الـ status بـ reduce في object من الـ ids: [[{ paid: [1, 3], pending: [2] }]]، وبعدين قارن بـ [[Object.groupBy]].`, done: R`الـ reduce بيرجّع [[{ paid: [1, 3], pending: [2] }]]، و [[Object.groupBy(orders, o => o.status)]] بيجمع الـ objects كاملة مش الـ ids، و Node بيطبعه [[[Object: null prototype]]].` },
            { lvl: 'تحدي', t: R`**refactor:** ده كود بـ for: [[const out = []; for (const p of products) { if (p.inStock) { out.push(p.name.toUpperCase()); } }]]. حوّله لسلسلة filter و map في سطر، وتأكد إن الناتج واحد على نفس البيانات.`, done: R`على Mug و Shirt متاحين و Cap مش متاح الاتنين بيرجّعوا [[["MUG", "SHIRT"]]]، و [[JSON.stringify]] بتاعهم واحد. ومفيش [[push]] ولا متغير بيتغيّر في النسخة الجديدة.` }
          ],
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
            R`بنعمل array اسمها [[orders]]، كل عنصر فيها object بيمثّل طلب. ده بالظبط شكل الداتا اللي بترجعلك من API غالبًا: ليستة objects ليهم نفس المفاتيح.`,
            R`أول طلب: [[id]] بيميّزه، و [[total]] المبلغ، و [[status]] حالته. حالته [[paid]] فهيدخل في الحساب.`,
            R`تاني طلب، حالته [[pending]] (لسه متدفعش)، فالـ [[filter]] هيشيله ومش هيتحسب في الإيراد رغم إنه أكبر مبلغ.`,
            R`تالت طلب، مدفوع برضه. يبقى عندنا طلبين مدفوعين مجموعهم [[250 + 400]].`,
            R`نهاية الـ array. الفاصلة بعد آخر عنصر (trailing comma) مسموحة في JS ومش بتعمل عنصر فاضي، وبتخلي إضافة سطر جديد بعدين أسهل.`,
            R`[[filter]] بتعدّي على كل طلب وتسأل الدالة: «أخليه؟». اللي بيرجّع [[true]] بيدخل array جديدة. النتيجة array فيها الطلبين المدفوعين بس، والأصل [[orders]] زي ما هو.`,
            R`[[map]] بتحوّل كل عنصر لحاجة تانية وبترجّع array بنفس الطول. هنا كل طلب بقى رقم الـ [[total]] بتاعه، فـ [[totals]] بقت array فيها 250 و 400 بس.`,
            R`[[reduce]] بتلم الـ array كلها في قيمة واحدة. [[sum]] هو الشايل اللي بيتراكم، بيبدأ من [[0]] (الـ argument التاني)، وكل لفة بيبقى [[sum + t]]. من غير الـ [[0]] هيبدأ بأول عنصر، ولو الـ array فاضية هيرمي TypeError.`,
            R`بيطبع [[650]]، يعني مجموع الطلبين المدفوعين ([[250 + 400]]).`,
            R`نفس الحساب بس في سلسلة (chaining): كل method بترجّع array فبنكمّل عليها بالـ method اللي بعدها من غير متغيرات وسيطة.`,
            R`أول حلقة في السلسلة: نفس الـ [[filter]] اللي فوق، بيسيب الطلبات المدفوعة بس.`,
            R`وبعدها [[reduce]] على طول بتجمع [[o.total]] من كل طلب، فاستغنينا عن الـ [[map]] لأن الدالة نفسها بتقرا الرقم من الـ object. النتيجة برضه [[650]].`,
            R`[[Object.groupBy]] بتقسّم الـ array لمجموعات حسب اللي الدالة بترجّعه: النتيجة object فيه مفتاح [[paid]] جواه array الطلبين، ومفتاح [[pending]] جواه طلب واحد. موجودة في Node 21 والمتصفحات الحديثة بس.`
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على [[[5, 12, 8]]]: [[find(n => n > 10)]] و [[findIndex(n => n > 10)]] و [[find(n => n > 100)]].`, done: R`12 و 1 و undefined.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const roles = ["admin", "editor"]; if (roles.indexOf("admin")) console.log("أهلًا يا أدمن");]]. ليه الرسالة مبتظهرش؟`, done: R`[[roles.indexOf("admin")]] بترجّع 0 وده falsy، فالـ if مبتدخلش. بعد [[roles.includes("admin")]] الرسالة بتظهر، ولو [["admin"]] مش موجودة مبتظهرش.` },
            { lvl: 'تطبيق', t: R`**ابني:** سلة: [[hasOutOfStock]] بـ some (فيه منتج stock بتاعه 0؟)، و [[allPaid]] بـ every على الطلبات.`, done: R`لو منتج واحد stock بتاعه 0 [[hasOutOfStock]] true، و [[[].every(...)]] على array فاضية بترجّع true (فكّر ليه ده ممكن يبقى bug).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[users = [{ email: "Sara@Mail.com", name: "Sara" }, { email: "omar@mail.com", name: "Omar" }]]] واليوزر كتب [["sara@mail.com"]] في فورم الدخول. لاقيه بـ find.`, done: R`المقارنة العادية [[===]] بترجّع undefined، وبعد ما تصغّر الطرفين بـ [[toLowerCase()]] بترجّع object فيه Sara. وبتقول للمستخدم «مش موجود» لو find رجّعت undefined بدل ما توقع على [[.name]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[hasAll(perms, required)]] بترجّع true لو اليوزر عنده كل الصلاحيات المطلوبة. وجرّب [[[NaN].includes(NaN)]] و [[[NaN].indexOf(NaN)]].`, done: R`[[hasAll(["read", "write"], ["read"])]] true، و [[hasAll(["read"], ["read", "delete"])]] false. و includes بترجّع true و indexOf بترجّع -1.` }
          ],
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
            R`بنعمل array اسمها [[users]] فيها ٣ مستخدمين، كل واحد object فيه [[id]] و [[name]] و [[admin]] (true أو false). هنستخدمها نجرّب عليها دوال البحث.`,
            R`سارة: [[id]] بتاعها 1 وهي admin. هي الوحيدة اللي [[admin: true]]، وده اللي هيفرق في [[some]] و [[every]] تحت.`,
            R`عمر: [[id]] بتاعه 2 ومش admin. هو اللي هنلاقيه بـ [[find]] و [[findIndex]].`,
            R`علي: آخر واحد في الليستة ومش admin، فهو اللي [[findLast]] هيرجّعه لما ندوّر من الآخر على حد مش admin.`,
            R`نهاية الـ array.`,
            R`[[find]] بتلف من الأول وترجّع أول عنصر الدالة ترجّعله [[true]] وتقف على طول. هنا بترجّع الـ object بتاع عمر نفسه (مش نسخة)، فلو عدّلت فيه هيتعدّل جوه [[users]].`,
            R`مفيش حد [[id]] بتاعه 9، فـ [[find]] بترجّع [[undefined]]. لو كتبت بعدها [[.name]] على طول هيرمي TypeError، فاعمل check الأول أو استخدم [[?.name]].`,
            R`[[findIndex]] زي [[find]] بس بترجّع المكان (index) مش العنصر: عمر في المكان [[1]] لأن العدّ بيبدأ من صفر. ولو مش لاقي بترجّع [[-1]] مش [[undefined]].`,
            R`[[findLast]] بتدوّر من آخر الـ array لأولها، فأول واحد مش admin تقابله من الآخر هو علي. مفيدة لما عايز «أحدث» عنصر في ليستة مترتبة بالوقت.`,
            R`[[some]] بتسأل: «فيه عنصر واحد على الأقل بيحقق الشرط؟». بترجّع [[true]] أول ما تلاقي سارة وتقف، من غير ما تكمّل على الباقي.`,
            R`[[every]] بتسأل: «كلهم بيحققوا الشرط؟». عمر مش admin فترجّع [[false]] وتقف عنده. خلي بالك: على array فاضية [[every]] بترجّع [[true]].`,
            R`[[includes]] بتسأل لو القيمة دي نفسها موجودة في الـ array، وبترجّع [[true]] أو [[false]]. بتنفع للقيم البسيطة (نصوص وأرقام)، مش للـ objects لأنها بتقارن الـ reference.`,
            R`[[NaN]] مش بيساوي نفسه بـ [[===]]، بس [[includes]] بتستخدم مقارنة اسمها SameValueZero بتعتبر [[NaN]] زي [[NaN]]، فبترجّع [[true]].`,
            R`[[indexOf]] بتقارن بـ [[===]]، و [[NaN === NaN]] بـ [[false]]، فعمرها ما بتلاقيه وبترجّع [[-1]]. عشان كده لما بتسأل «موجود ولا لأ» استخدم [[includes]].`
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[[10, 1, 2].sort()]] وبعدين [[[10, 1, 2].sort((a, b) => a - b)]].`, done: R`[[[1, 10, 2]]] و [[[1, 2, 10]]].` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[const scores = [40, 90, 70, 100, 60]; const top = scores.sort((a, b) => b - a).slice(0, 3);]] وبعدها اطبع [[scores]]. المطلوب scores تفضل زي ما دخلت.`, done: R`قبل التصليح scores بقت [[[100, 90, 70, 60, 40]]] (sort بتغيّر الأصل). بعد [[toSorted]]: top [[[100, 90, 70]]] و scores لسه [[[40, 90, 70, 100, 60]]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** رتّب منتجات بالسعر تصاعدي، واللي سعرهم زي بعض بالاسم ([[localeCompare]])، بـ toSorted.`, done: R`المنتجين اللي بنفس السعر مترتبين أبجدي، والـ array الأصلية بنفس ترتيبها القديم.` },
            { lvl: 'تطبيق', t: R`**ابني:** لوحة ترتيب لعبة: [[{ n, p, t }]] (الاسم، والنقط، والوقت بالثواني). رتّب بالنقط تنازلي، ولو النقط زي بعض الأسرع الأول، واطبع [[1. Omar 95]] وهكذا.`, done: R`على Sara 90 في 120، و Omar 95 في 200، و Ali 90 في 100: بيطبع [[1. Omar 95]] ثم [[2. Ali 90]] ثم [[3. Sara 90]]. والـ comparator سطر واحد: [[b.p - a.p || a.t - b.t]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** رتّب [[["file10", "file2", "file1"]]] بـ [[sort()]] عادي، وبعدين بـ [[localeCompare(b, undefined, { numeric: true })]]. وجرّب [[["Sara", "omar", "Ali"]]] بالطريقتين.`, done: R`العادي [[["file1", "file10", "file2"]]] والـ numeric [[["file1", "file2", "file10"]]]. والأسامي: [[sort()]] بيحط "omar" في الآخر (الحروف الكبيرة الأول)، و [[localeCompare]] بيرتّب Ali ثم omar ثم Sara.` }
          ],
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

| بتعدّل الأصل | النسخة اللي مبتعدّلش | بترجّع إيه |
|---|---|---|
| [[sort(fn)]] | [[toSorted(fn)]] | array جديدة مترتبة |
| [[reverse()]] | [[toReversed()]] | array جديدة معكوسة |
| [[splice(i, n)]] | [[toSpliced(i, n)]] | array جديدة من غير العناصر دي (و [[splice]] بترجّع **المشال**) |
| [[arr[i] = v]] | [[with(i, v)]] | array جديدة بعنصر واحد متغيّر |

- أرقام: [[(a, b) => a - b]] تصاعدي و [[b - a]] تنازلي. نصوص: [[localeCompare]].
- مع state أو داتا مشتركة استخدم النسخ اللي على اليمين.`,
          lines: [
            R`[[sort]] من غير دالة مقارنة بتحوّل كل عنصر لنص وترتّب بالحروف، و «10» بيبدأ بـ «1» فبييجي قبل «2». ده أشهر bug في ترتيب الأرقام.`,
            R`مع دالة مقارنة: لو [[a - b]] سالب يبقى a قبل b، لو موجب b قبل a، ولو صفر يفضلوا زي ما هم. [[a - b]] يرتّب تصاعدي، و [[b - a]] تنازلي.`,
            R`array أسعار مش مترتبة. هنرتّبها من غير ما نبوّظ ترتيبها الأصلي.`,
            R`[[toSorted]] بترجّع array **جديدة** مترتبة، عكس [[sort]] اللي بترتّب الـ array نفسها في مكانها. ده مهم لما الـ array دي state في React مثلًا ومينفعش تتعدّل.`,
            R`بيطبع الأصل 300 و 100 و 200 بنفس ترتيبه، وده الدليل إن [[toSorted]] ملمستهوش. لو كنا استخدمنا [[sort]] كان الأصل اترتّب هو كمان.`,
            R`بيطبع النسخة الجديدة مترتبة تصاعدي.`,
            R`أسماء فيها حروف كبيرة وصغيرة. [[sort]] العادية بتقارن أكواد الحروف، والحروف الكبيرة كلها قبل الصغيرة، فاسم زي «Zed» كان هييجي قبل «sara».`,
            R`[[localeCompare]] بتقارن نصين حسب قواعد اللغة وبترجّع رقم سالب أو موجب أو صفر، فبتتحط مكان [[a - b]] في دالة المقارنة. بترتّب «sara» في مكانها الأبجدي بغض النظر عن الحرف الكبير، وبتشتغل مع العربي.`,
            R`منتجين ليهم نفس السعر بالظبط، عشان نشوف هنرتّبهم إزاي لما الشرط الأولاني يتعادل.`,
            R`ترتيب بأكتر من شرط: الأول بالسعر، ولو السعر واحد يبقى الفرق [[0]] وده falsy، فـ [[||]] بتروح للشرط التاني وترتّب بالاسم. فـ A بييجي قبل B.`,
            R`[[with]] بترجّع نسخة من الـ array فيها العنصر في المكان ده متغيّر، والأصل زي ما هو. هي البديل الـ immutable للتعديل المباشر بالـ index (اللي بيغيّر الأصل)، ولو الـ index برّه الـ array بترمي RangeError.`
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
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[const [first, , third] = ["a", "b", "c"];]] واطبع الاتنين.`, done: R`"a" و "c".` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** فك تاريخ جاي كنص: [[const [y, m, d] = "2026-10-29".split("-").map(Number);]].`, done: R`y بـ 2026 و m بـ 10 و d بـ 29، و [[typeof m]] "number" مش "string".` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[const [x = 5, y = 7] = [undefined, null];]] و [[const [p, ...rest] = "abc";]]. اكتب x و y و p و rest قبل التشغيل.`, done: R`توقعت وطلع x بـ 5 و y بـ null و p بـ [["a"]] و rest [[["b", "c"]]]. وعرفت إن الـ default بيشتغل مع undefined بس، وإن الـ string بتتفك حروف لأنها iterable.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[const a = [ [1], [2] ]; const b = [...a]; b[0].push(9);]] واطبع [[a[0]]]. وبعدين صلّح بـ [[structuredClone]].`, done: R`قبل التصليح [[a[0]]] بقت [[[1, 9]]] (الـ spread نسخ الـ array من برا بس)، وبعد [[structuredClone(a)]] بتفضل [[[1]]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[rotate(arr, k)]] بتلف الـ array لليمين k خطوة بـ spread و slice، ومن غير ما تغيّر الأصل. خلي بالك من k أكبر من الطول ومن الـ array الفاضية.`, done: R`[[rotate([1, 2, 3, 4], 1)]] بترجّع [[[4, 1, 2, 3]]]، و [[rotate([1, 2, 3, 4], 5)]] نفس الناتج، و [[rotate([], 2)]] بترجّع [[[]]]، و [[rotate([1, 2], 0)]] بترجّع [[[1, 2]]] نسخة جديدة.` }
          ],
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
            R`array destructuring: بيفك الـ array لمتغيرات بالترتيب، فـ [[first]] بقى «a» و [[second]] بقى «b»، والعنصر التالت اتساب لأننا مطلبناهوش.`,
            R`الفاصلة الفاضية معناها «اتخطى العنصر ده». فاصلتين يعني اتخطينا الأول والتاني، فـ [[third]] أخد «c».`,
            R`[[...rest]] بيلم كل اللي فاضل في array جديدة. لازم ييجي في الآخر، ولو حطيته في النص هيدّي SyntaxError.`,
            R`الـ array فاضية فمفيش عنصر أول، والقيمة [[undefined]]، فـ [[x]] بياخد القيمة الافتراضية [[0]]. خلي بالك: الافتراضي بيشتغل مع [[undefined]] بس، لو العنصر [[null]] هيفضل [[null]].`,
            R`متغيرين بـ [[let]] (مش [[const]]) لأننا هنغيّر قيمتهم في السطر الجاي.`,
            R`تبديل القيم في سطر واحد: اليمين بيتعمل array جديدة فيها قيمة b وبعدها قيمة a الأول، وبعدين بتتفك تاني في [[a]] و [[b]]. من غير الطريقة دي كنت محتاج متغير مؤقت تالت.`,
            R`الـ spread [[...]] بيفرد عناصر كل array جوه array جديدة، فبندمج اتنين ونزوّد [[5]] في الآخر في خطوة واحدة.`,
            R`نسخة جديدة من [[merged]]: تعديل [[copy]] مش هيأثر على [[merged]]. بس النسخة سطحية (shallow): لو جواها objects، الاتنين بيشاوروا على نفس الـ objects.`,
            R`[[Set]] مبيقبلش قيمة مكررة، فبيشيل التكرار، وبعدين الـ spread بيرجّعه array عادية. ده أقصر طريقة تعمل array من غير تكرار للقيم البسيطة.`,
            R`array جديدة فيها كل عناصر [[merged]] وفي آخرها [[6]]، والأصل متلمسش. [[push]] كانت هتعدّل [[merged]] نفسها، وده اللي بنتجنّبه في state.`,
            R`[[rows]] array جواها arrays (مصفوفة ٢ في ٢)، زي صفوف جدول.`,
            R`[[flat]] بتفك مستوى واحد من التداخل، فبقت array واحدة فيها ٤ أرقام. لو التداخل أعمق ابعتلها العمق، زي [[flat(2)]] أو [[flat(Infinity)]].`
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

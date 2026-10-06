// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "المتغيرات والنصوص",
      l: 1,
      n: "const و let بدل var، والـ template literals، ودوال الـ strings اللي هتستخدمها كل يوم",
      items: [
        {
          cmd: "let و const و var",
          title: "تعرّف متغير بـ let ولا const ولا var؟",
          desc: R`[[const]] لمتغير مش هيتعيّن تاني، و [[let]] لمتغير هيتغير (عداد مثلًا). و [[var]] الطريقة القديمة، ومتستخدمهاش في كود جديد.

القاعدة العملية: ابدأ بـ [[const]] دايمًا، ولو احتجت تعيد التعيين غيّرها لـ [[let]].

خد بالك: [[const]] بيمنع إعادة التعيين، مش التعديل. [[const user = {}]] وبعدين [[user.name = "Sara"]] مسموح، لأن المتغير لسه شايل نفس الـ object.`,
          example: R`const PI = 3.14;
let count = 0;
count = count + 1;
const user = { name: "Sara" };
user.name = "Omar";          // مسموح: عدّلت جوه الـ object
if (true) {
  let inside = 1;
  var leaky = 2;
}
console.log(leaky);          // 2: var مبيعرفش الـ block
console.log(typeof inside);  // "undefined": let جوه الـ block بس
PI = 3;                      // TypeError: Assignment to constant variable.`,
          try: R`شغّل الكود في ملف [[vars.js]] بـ [[node vars.js]] واقرا الـ error في الآخر. وبعدين غيّر [[let inside]] لـ [[var inside]] وشوف الفرق في السطر اللي قبل الأخير.`,
          flag: "script",
          deep: {
            why: R`[[var]] ليه مشاكل اتسببت في bugs سنين: مبيحترمش الـ blocks (if و for)، وبيتعرّف قبل سطره بقيمة undefined (hoisting)، وبيتضاف على [[window]] لو في الـ global. [[let]] و [[const]] جم في ES2015 عشان يحلّوا ده. و [[const]] بيقول لأي حد بيقرا الكود «القيمة دي مش هتتبدل»، فبيسهّل الفهم.`,
            how: R`[[let]] و [[const]] block-scoped: عايشين بين أقرب [[{ }]] بس. [[var]] function-scoped: عايش في الدالة كلها، أو global لو برا أي دالة.

الاتنين بيتعملهم hoisting برضه، بس في حالة مختلفة: الـ var بيتعرّف بقيمة undefined من أول الدالة، والـ let و const بيبقوا في TDZ (temporal dead zone) لحد سطرهم، ولو قريتهم قبله يطلع ReferenceError (درس hoisting في المستوى ٢).

و [[const]] لازم تديله قيمة وقت التعريف، و [[const x;]] لوحدها SyntaxError.

ولو عايز object ميتعدّلش فعلًا فيه [[Object.freeze]] (سطحي: بيجمّد المستوى الأول بس).`,
            when: R`[[const]] لـ 90% من المتغيرات: الـ imports والدوال والـ objects والـ arrays اللي هتعدّل جواها. [[let]] للعدادات والقيم اللي بتتبني على مراحل. [[var]] لأ.`,
            mistakes: R`تفتكر إن [[const]] معناه الـ object متجمّد فتستغرب إن التعديل عدّى. وتستخدم [[let]] لكل حاجة «احتياطي». وتعرّف متغير من غير أي كلمة ([[total = 5]]): في sloppy mode بيعمل global من غير ما تحس، وفي strict mode ReferenceError. وفي الانترفيو: «الفرق بين var و let و const؟» قول scope و hoisting و إعادة التعيين.`
          },
          teach: R`## الفكرة

٣ كلمات بتعرّف متغير، والفرق بينهم في سؤالين: «ينفع أحط فيه قيمة تانية بعدين؟» و «هو عايش فين؟». المثال بيجاوب على الاتنين، وفي الآخر بيوقع بـ error مقصود. احفظه في ملف [[vars.js]] وشغّله بـ [[node vars.js]] (Node 24).

---

## ١. const و let

~~~text vars.js
const PI = 3.14;
let count = 0;
count = count + 1;
~~~

- [[const]] اختصار constant (ثابت): المتغير ده مش هيتعيّن تاني.
- [[let]]: متغير عادي، ينفع تحط فيه قيمة جديدة.
- [[count = count + 1]]: من غير [[let]] قبلها، ده **إعادة تعيين** مش تعريف جديد. احسب اليمين ([[0 + 1]]) وحطه في count، فبقى 1.

---

## ٢. const مع object: التعديل مسموح

~~~text vars.js
const user = { name: "Sara" };
user.name = "Omar";          // مسموح: عدّلت جوه الـ object
~~~

[[user]] شايل reference لـ object. السطر التاني مغيّرش [[user]] نفسه (لسه بيشاور على نفس الـ object)، هو غيّر خانة **جوه** الـ object. وده مسموح. لو طبعته:

~~~text الناتج
{ name: 'Omar' }
~~~

الممنوع هو [[user = {...}]]: إنك تخلي المتغير يشاور على حاجة تانية.

---

## ٣. الـ block: let جوه، و var بتهرب

~~~text vars.js
if (true) {
  let inside = 1;
  var leaky = 2;
}
console.log(leaky);          // 2: var مبيعرفش الـ block
console.log(typeof inside);  // "undefined": let جوه الـ block بس
~~~

- [[if (true)]]: شرط دايمًا متحقق، موجود هنا بس عشان يعمل block.
- الـ **block** هو أي حاجة بين [[{ }]]. الـ [[let]] و [[const]] عايشين جواه بس (block-scoped).
- الـ [[var]] مبيعترفش بالـ block، عايش في الدالة كلها، أو في الملف كله لو مفيش دالة (function-scoped).
- [[typeof inside]] بدل [[inside]] على طول، عشان [[typeof]] مبيرميش error لو الاسم مش موجود (درس typeof).

الناتج لحد هنا:

~~~text الناتج
2
undefined
~~~

السطر التاني [[undefined]] من غير علامات تنصيص: ده الـ string [["undefined"]] اللي typeof رجّعه، و console.log بيطبع النص من غير quotes.

---

## ٤. آخر سطر: إعادة تعيين const

~~~text vars.js
PI = 3;                      // TypeError: Assignment to constant variable.
~~~

~~~text الناتج (Node 24، المسار متغيّر)
C:\Users\ali\js-practice\vars.js:12
PI = 3;                      // TypeError: Assignment to constant variable.
   ^

TypeError: Assignment to constant variable.
    at Object.<anonymous> (C:\Users\ali\js-practice\vars.js:12:4)
    ...

Node.js v24.19.0
~~~

نقرا الـ error:

| الجزء | معناه |
|---|---|
| [[vars.js:12]] | الملف، والسطر رقم ١٢ |
| [[^]] | تحت المكان بالظبط اللي وقع فيه |
| [[TypeError]] | نوع الغلطة: عملية مش مسموحة على القيمة دي |
| [[Assignment to constant variable.]] | «بتعيّن قيمة لمتغير ثابت» |
| [[vars.js:12:4]] | سطر ١٢، عمود ٤ (مكان الـ [[=]]) |

الأسطر اللي قبل ١٢ اتنفّذت وطبعت عادي: ده **runtime error** (حصل وقت التشغيل)، مش syntax error (اللي بيوقف الملف قبل ما يبدأ).

---

## ٥. اللي اتجرّب كمان

لو غيّرت [[let inside]] لـ [[var inside]]، السطر قبل الأخير بيطبع:

~~~text الناتج
2
number
~~~

لأن [[inside]] بقت var فهربت من الـ block زي leaky.

ولو قريت let قبل سطرها:

~~~text app.js
console.log(late);
let late = 1;
~~~

~~~text الناتج
ReferenceError: Cannot access 'late' before initialization
~~~

ده الـ TDZ (temporal dead zone): الـ let موجودة بس ممنوع تلمسها قبل سطرها. أما var في نفس الموقف بتطبع [[undefined]] من غير error. و [[const x;]] من غير قيمة: [[SyntaxError: Missing initializer in const declaration]].

وفي المتصفح، [[var]] في الـ global بتتضاف على [[window]] و [[let]] لأ (اتجرّب في Chrome 154): [[var leaky2 = 2; window.leaky2]] بـ 2، و [[let notOnWindow = 1; window.notOnWindow]] بـ undefined.

---

## الخلاصة

| | [[const]] | [[let]] | [[var]] |
|---|---|---|---|
| إعادة تعيين | لأ (TypeError) | أيوة | أيوة |
| تعديل جوه object | أيوة | أيوة | أيوة |
| عايش في | الـ block | الـ block | الدالة كلها |
| قبل سطره | ReferenceError (TDZ) | ReferenceError (TDZ) | [[undefined]] |

ابدأ بـ [[const]]، وغيّرها [[let]] لو احتجت تعيد التعيين، وانسى [[var]].`,
          lines: [
            "ثابت: مش هيتعيّن تاني.",
            "متغير هيتغير.",
            R`إعادة تعيين، مسموحة مع [[let]].`,
            R`[[const]] شايل reference لـ object.`,
            "التعديل جوه الـ object مسموح، لأن المتغير لسه شايل نفس الـ object.",
            "block جديد.",
            R`[[let]] عايش جوه الـ block ده بس.`,
            R`[[var]] بيطلع برا الـ block للدالة (أو الـ global).`,
            "قفلة الـ block.",
            R`[[leaky]] موجود برا الـ block.`,
            R`[[inside]] مش موجود هنا، و [[typeof]] مبيرميش error.`,
            R`إعادة تعيين [[const]]: TypeError والبرنامج يقف.`
          ],
          sol: R`[[node vars.js]] بيطبع [[2]] وبعدين [[undefined]]، وبعدين بيقع عند آخر سطر بـ [[TypeError: Assignment to constant variable.]] ومعاه اسم الملف ورقم السطر والعمود ([[vars.js:12]]). لاحظ إن اللي قبل السطر ده اتنفّذ عادي: دا runtime error مش syntax error.

لما تغيّر [[let inside]] لـ [[var inside]]، السطر اللي قبل الأخير بيطبع [["number"]] بدل [["undefined"]]: الـ var بيطلع من الـ block لأن مجاله الدالة كلها (أو الملف)، مش الـ block. ده سبب إن var مبقتش تستخدم. ولو فاكر إن [[user.name = "Omar"]] المفروض يطلع error برضه: لأ، const بتمنع إعادة التعيين للمتغير، مش التعديل جوه الـ object.`
        },
        {
          cmd: "template literals",
          title: "تركّب نص فيه متغيرات أو على كذا سطر",
          desc: R`النص بين backticks بدل علامات التنصيص اسمه template literal. جواه بتحط أي expression بين [[$__{ }]]، وممكن يبقى على كذا سطر من غير [[\n]].

ده بدل [["Hi " + name + "!"]] اللي بيبقى صعب يتقري ويتنسى فيه مسافات.`,
          example: R`const name = "Sara";
const total = 1250.5;
const msg = $__btأهلًا $__{name}، طلبك بـ $__{total.toFixed(2)} جنيه$__bt;
const status = $__btالحالة: $__{total > 1000 ? "شحن مجاني" : "شحن 50 جنيه"}$__bt;
const html = $__bt
  <li class="item">
    $__{name.toUpperCase()}
  </li>$__bt;
console.log(msg);
console.log(status);`,
          try: R`اعمل array فيها ٣ منتجات (اسم وسعر)، وركّب منها string فيه [[<ul>]] وجواه [[<li>]] لكل منتج بـ [[map]] و [[join("")]].`,
          flag: "script",
          deep: {
            why: "بتركّب نصوص طول الوقت: رسايل، و URLs، و SQL في الأمثلة، و HTML صغير، و class names. الـ template literal بيخلي النص يتقري زي ما هيطلع بالظبط.",
            how: R`كل [[$__{ }]] بيتحسب ويتحوّل لـ string (بـ String())، فالـ object هيطلع [["[object Object]"]] والـ array هتطلع عناصرها بفواصل. المسافات والسطور الجديدة جوه الـ backticks بتفضل زي ما هي.

وفيه شكل متقدم اسمه tagged template: [[sql$__btSELECT ... $__{id}$__bt]]، الدالة [[sql]] بتاخد أجزاء النص والقيم لوحدهم، فتقدر تعمل escape للقيم. ده اللي بيستخدمه Prisma في [[$queryRaw]] و styled-components في CSS، و [[String.raw]] (اللي الموقع ده نفسه مكتوب بيه).`,
            when: R`أي نص فيه متغير. للنص الثابت اكتب [[""]] أو [['']] عادي، وخليك على نوع واحد في المشروع (Prettier بيظبطها).`,
            mistakes: R`تحط input من اليوزر في HTML بـ template literal وتعمله [[innerHTML]]: دي XSS (درس الـ DOM). وتركّب SQL بـ template literal عادي بقيم من اليوزر: SQL injection، استخدم parameters (تاب SQL و Prisma). وتحط object في [[$__{ }]] وتستغرب [object Object]: استخدم [[JSON.stringify]].`
          },
          teach: R`## الفكرة

بدل ما تلزق نصوص بـ [[+]]، بتكتب النص بين علامتين backtick (الحرف [[$__bt]]، على الكيبورد فوق Tab على الشمال)، وتحط أي قيمة جواه بين [[$__{ }]]. المثال بيركّب ٣ نصوص كده. اتشغّل كملف في Node 24.

---

## ١. أول سطرين: الداتا

~~~text template.js
const name = "Sara";
const total = 1250.5;
~~~

اسم ورقم، هنركّب منهم الرسايل.

---

## ٢. أول template

~~~text template.js
const msg = $__btأهلًا $__{name}، طلبك بـ $__{total.toFixed(2)} جنيه$__bt;
~~~

- الـ backticks في الأول والآخر بيقولوا «ده template literal».
- [[$__{name}]]: علامة [[$]] وبعدها [[{ }]] معناها «هنا احسب حاجة وحط ناتجها». جواها [[name]] فبتتحط [["Sara"]].
- [[$__{total.toFixed(2)}]]: جوه [[$__{ }]] ينفع **أي expression**، حتى نداء method. [[toFixed(2)]] بتحوّل 1250.5 لـ [["1250.50"]] (رقمين بعد العلامة).

نفس السطر بالطريقة القديمة كان هيبقى:

~~~text template.js
const msgOld = "أهلًا " + name + "، طلبك بـ " + total.toFixed(2) + " جنيه";
~~~

أطول، وسهل تنسى مسافة.

---

## ٣. ternary جوه الـ template

~~~text template.js
const status = $__btالحالة: $__{total > 1000 ? "شحن مجاني" : "شحن 50 جنيه"}$__bt;
~~~

[[شرط ? قيمة1 : قيمة2]] اسمها ternary: لو الشرط true خد اللي بعد [[?]]، وإلا خد اللي بعد [[:]]. هنا [[1250.5 > 1000]] true، فبتتحط [["شحن مجاني"]]. ينفع جوه [[$__{ }]] لأنها expression بترجّع قيمة (عكس [[if]] اللي مينفعش تتحط هنا).

---

## ٤. نص على كذا سطر

~~~text template.js
const html = $__bt
  <li class="item">
    $__{name.toUpperCase()}
  </li>$__bt;
~~~

الـ template literal بيعدّي سطور عادي، والسطور والمسافات **بتفضل جوه النص** زي ما هي. اتأكدنا بـ [[JSON.stringify(html)]] اللي بيوري الحروف المخفية:

~~~text الناتج
"\n  <li class=\"item\">\n    SARA\n  </li>"
~~~

[[\n]] هي السطر الجديد. لاحظ إن النص بيبدأ بسطر جديد لأن الـ backtick الأول في آخر سطر [[const html = $__bt]]. و [[name.toUpperCase()]] بقت [["SARA"]]. المثال مبيطبعش [[html]]، هو موجود عشان تشوف الشكل.

---

## ٥. الطباعة

~~~text template.js
console.log(msg);
console.log(status);
~~~

~~~text الناتج (Node 24)
أهلًا Sara، طلبك بـ 1250.50 جنيه
الحالة: شحن مجاني
~~~

---

## ٦. لو حطيت حاجة مش نص جوه [[$__{ }]]

كل قيمة بتتحوّل string الأول بـ [[String()]]:

~~~text app.js
console.log($__bt$__{{ a: 1 }}$__bt, $__bt$__{[1, 2, 3]}$__bt, $__bt$__{null} $__{undefined}$__bt, $__bt$__{JSON.stringify({ a: 1 })}$__bt);
~~~

~~~text الناتج
[object Object] 1,2,3 null undefined {"a":1}
~~~

- الـ object بيطلع [[[object Object]]]: مش مفيد. لو عايز تشوف محتواه استخدم [[JSON.stringify]].
- الـ array عناصرها بفواصل، وده سبب [[join("")]] في حل التمرين.

---

## ٧. حل الـ try: ليستة منتجات

~~~text products.js
const products = [
  { name: "Mug", price: 120 },
  { name: "Shirt", price: 300 },
  { name: "Cap", price: 90 },
];
const html = $__bt<ul>$__{products.map((p) => $__bt<li>$__{p.name}: $__{p.price} جنيه</li>$__bt).join("")}</ul>$__bt;
console.log(html);
~~~

من جوه لبرة:

1. [[(p) => $__bt<li>$__{p.name}: $__{p.price} جنيه</li>$__bt]]: دالة بتاخد منتج وترجّع [[<li>]] بتاعه. template جوه template عادي.
2. [[products.map(...)]]: طبّق الدالة على كل منتج، فيطلع array فيها ٣ strings.
3. [[.join("")]]: لزّق عناصر الـ array في string واحد من غير فاصل.
4. [[$__bt<ul>$__{...}</ul>$__bt]]: حط الناتج بين [[<ul>]] و [[</ul>]].

~~~text الناتج (Node 24)
<ul><li>Mug: 120 جنيه</li><li>Shirt: 300 جنيه</li><li>Cap: 90 جنيه</li></ul>
~~~

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[$__bt...$__bt]] | template literal |
| [[$__{expr}]] | احسب الـ expression وحط ناتجه string |
| سطور جوه الـ backticks | بتفضل جوه النص |
| object جوه [[$__{ }]] | بيطلع [[[object Object]]]، استخدم JSON.stringify |
| array جوه [[$__{ }]] | عناصرها بفواصل، استخدم [[join("")]] |

ومتحطش input من يوزر في HTML بـ template وبعدين [[innerHTML]]: ده XSS (درس textContent).`,
          lines: [
            "متغير نص.",
            "متغير رقم.",
            R`المتغيرات جوه [[$__{ }]]، وأي expression ينفع حتى نداء method.`,
            R`ternary جوه [[$__{ }]]: أي حاجة بترجّع قيمة.`,
            "بداية نص على كذا سطر.",
            "السطور والمسافات بتفضل زي ما هي.",
            R`expression في النص المتعدد برضه.`,
            "قفلة النص.",
            "اطبع الرسالة.",
            "اطبع الحالة."
          ],
          sol: R`الناتج لازم يبقى string واحد من غير فواصل: [[<ul><li>Mug: 120 جنيه</li><li>Shirt: 300 جنيه</li><li>Cap: 90 جنيه</li></ul>]].

الغلطة الأشهر إنك تنسى [[join("")]]: الـ array جوه [[$__{}]] بتتحوّل لـ string بـ [[toString()]] اللي بتحط فواصل، فيطلعلك [[<li>Mug</li>,<li>Shirt</li>,<li>Cap</li>]] والفواصل دي بتظهر على الصفحة. وخلي بالك إن ده ينفع مع داتا انت كاتبها، لكن لو الأسامي جاية من يوزر وهتحطها في [[innerHTML]] يبقى XSS (درس textContent تحت).`,
          solCode: R`const products = [
  { name: "Mug", price: 120 },
  { name: "Shirt", price: 300 },
  { name: "Cap", price: 90 },
];
const html = $__bt<ul>$__{products.map((p) => $__bt<li>$__{p.name}: $__{p.price} جنيه</li>$__bt).join("")}</ul>$__bt;
console.log(html);`
        },
        {
          cmd: "string methods",
          title: "أشهر دوال الـ strings اللي هتحتاجها",
          desc: R`الـ strings immutable، فكل method بترجّع string جديد. أهمهم: [[trim]] و [[toLowerCase]] للتنضيف، و [[includes]] و [[startsWith]] للبحث، و [[split]] للتقطيع، و [[slice]] لجزء، و [[replaceAll]] للاستبدال، و [[padStart]] للتنسيق، و [[at(-1)]] لآخر حرف.

وأي method بترجّع string ينفع تكمّل عليها: [[email.trim().toLowerCase()]].`,
          example: R`const email = "  Sara@Example.com ";
const clean = email.trim().toLowerCase();  // "sara@example.com"
clean.includes("@")                         // true
clean.startsWith("sara")                    // true
clean.split("@")                            // ["sara", "example.com"]
clean.slice(0, 4)                           // "sara"
clean.slice(-3)                             // "com"
clean.replaceAll(".", "_")                  // "sara@example_com"
"7".padStart(3, "0")                        // "007"
clean.at(-1)                                // "m"
"a,b,,c".split(",").filter(Boolean)         // ["a", "b", "c"]
[..."مرحبا"].reverse().join("")             // اقلب نص`,
          try: R`اكتب دالة [[slugify(title)]] تحوّل [["  Hello World JS  "]] لـ [["hello-world-js"]] بـ trim و toLowerCase و split و join. وبعدين جرّب [[slugify("كورس جافاسكريبت")]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: الاختبارات بتجرّب [[slugify]] كمان على نص فيه مسافتين ورا بعض.`,
          flag: "console",
          deep: {
            why: "تنضيف inputs (إيميل فيه مسافات أو حروف كبيرة)، وتقطيع URLs، وعمل slugs، وتنسيق أرقام الفواتير: كله string methods. ومعرفتها بتوفّر عليك regex في أغلب الحالات.",
            how: R`[[slice(start, end)]] بياخد من start لحد قبل end، والأرقام السالبة بتتعد من الآخر. فيه [[substring]] القديمة بس slice أوضح.

[[replace]] بيغيّر أول مرة بس لو بعتله string، و [[replaceAll]] بيغيّر الكل. ومع regex فيه flag [[g]]: [[s.replace(/\s+/g, "-")]].

[[split("")]] بيقطع على UTF-16 code units، فالإيموجي والحروف المركبة بتتكسر. [[[...str]]] أو [[Array.from(str)]] بيقطع على code points وده أسلم. ولمقارنة نصوص بلغات مختلفة استخدم [[localeCompare]].

و [[length]] بتعد code units برضه: [["😀".length]] بـ 2.`,
            when: "تنضيف أي input قبل ما تحفظه، والبحث البسيط، وتكوين URLs و slugs، وتنسيق العرض.",
            mistakes: R`تفتكر إن [[email.trim()]] غيّرت [[email]]: لأ، رجّعت واحد جديد، لازم تحطه في متغير. و [[replace]] وانت عايز الكل. وتقلب string بـ [[split("").reverse()]] فالإيموجي تبوظ. وفي الانترفيو: «اقلب string» و «اعرف لو palindrome» (تاب DSA).`
          },
          teach: R`## الفكرة

إيميل جاي من يوزر فيه مسافات وحروف كبيرة. المثال بينضّفه، وبعدين يسأل عليه ويقطّعه ويغيّر فيه بأشهر دوال الـ strings. كل method بترجّع string (أو array) **جديد**، والأصل مبيتغيرش. السطور اتشغّلت واحد واحد في Node 24 REPL.

---

## ١. التنضيف: سلسلة methods

~~~text Node REPL
> const email = "  Sara@Example.com ";
undefined
> const clean = email.trim().toLowerCase();
undefined
> clean
'sara@example.com'
~~~

بيتنفّذ من الشمال لليمين:

1. [[email.trim()]]: بيشيل المسافات (والـ tabs والسطور الجديدة) من الأول والآخر، فيرجّع [["Sara@Example.com"]].
2. [[.toLowerCase()]]: بتشتغل على **ناتج** trim، وبتصغّر كل الحروف.

(الـ [[undefined]] بعد سطور [[const]] ده الـ REPL بيقولك «السطر ده ملوش قيمة يرجّعها»، مش غلطة.)

ده اسمه chaining: أي method بترجّع string ينفع تحط بعدها نقطة وتكمّل. و [[email]] نفسه لسه زي ما هو:

~~~text الناتج من JSON.stringify(email) بعد email.trim()
"  Sara@Example.com "
~~~

---

## ٢. أسئلة: فيه؟ بيبدأ بـ؟

~~~text Node REPL
> clean.includes("@")
true
> clean.startsWith("sara")
true
~~~

- [[includes(x)]]: النص فيه x في أي حتة؟
- [[startsWith(x)]]: النص بيبدأ بـ x؟ وأختها [[endsWith]].

---

## ٣. التقطيع: [[split]] و [[slice]]

~~~text Node REPL
> clean.split("@")
[ 'sara', 'example.com' ]
> clean.slice(0, 4)
'sara'
> clean.slice(-3)
'com'
~~~

- [[split("@")]]: قطّع النص عند كل [["@"]] ورجّع الحتت في array. الـ [["@"]] نفسها بتختفي.
- [[slice(0, 4)]]: من index 0 لحد **قبل** index 4. الحروف [[s]](0) [[a]](1) [[r]](2) [[a]](3)، فـ [["sara"]].
- [[slice(-3)]]: الرقم السالب بيتعد من الآخر، ومن غير رقم تاني يعني «لحد الآخر». فآخر ٣ حروف.

---

## ٤. الاستبدال: [[replaceAll]] مش [[replace]]

~~~text Node REPL
> clean.replaceAll(".", "_")
'sara@example_com'
~~~

فيه نقطة واحدة هنا، فالفرق مش باين. على نص فيه أكتر من واحدة:

~~~text app.js
console.log("a.b.c".replace(".", "_"), "a.b.c".replaceAll(".", "_"));
~~~

~~~text الناتج
a_b.c a_b_c
~~~

[[replace]] بنص بتغيّر **أول** مرة بس، و [[replaceAll]] بتغيّر الكل.

---

## ٥. التنسيق: [[padStart]] و [[at]]

~~~text Node REPL
> "7".padStart(3, "0")
'007'
> clean.at(-1)
'm'
~~~

- [[padStart(3, "0")]]: كمّل النص من الشمال بـ [["0"]] لحد ما طوله يبقى 3. لو هو أطول أصلًا مبيعملش حاجة ([["12345".padStart(3, "0")]] فضلت [["12345"]]).
- [[at(-1)]]: الحرف في المكان ده، وبتقبل سالب. أما [["abc"[-1]]] بترجّع [[undefined]] لأن الأقواس المربعة مبتفهمش السالب.

---

## ٦. السطرين الأخيرين: arrays

~~~text Node REPL
> "a,b,,c".split(",").filter(Boolean)
[ 'a', 'b', 'c' ]
~~~

خطوة خطوة:

1. [["a,b,,c".split(",")]] بترجّع [[[ 'a', 'b', '', 'c' ]]]: بين الفاصلتين ورا بعض فيه string فاضي.
2. [[.filter(Boolean)]]: [[filter]] بتسيب العناصر اللي الدالة بترجّعلها truthy، و [[Boolean]] نفسها دالة. والـ [[""]] falsy فاتشال.

~~~text Node REPL
> [..."مرحبا"].reverse().join("")
'ابحرم'
~~~

1. [[[..."مرحبا"]]]: الـ [[...]] (spread) بتفرد النص حرف حرف جوه array: [[[ 'م', 'ر', 'ح', 'ب', 'ا' ]]].
2. [[.reverse()]]: اقلب ترتيب الـ array.
3. [[.join("")]]: لزّقها نص تاني من غير فاصل.

ليه [[...]] مش [[split("")]]؟ عشان الإيموجي:

~~~text app.js
console.log("😀".length, "😀".split(""), [..."😀"]);
~~~

~~~text الناتج
2 [ '\ud83d', '\ude00' ] [ '😀' ]
~~~

JS بيخزّن النص بـ UTF-16، والإيموجي بتاخد خانتين (code units). [[length]] و [[split("")]] بيعدّوا خانات فكسروها نصين، و [[...]] بيمشي على الحروف الحقيقية.

---

## ٧. لو حطيت المثال كله في ملف

المثال معمول عشان يتجرب سطر سطر. لو لزقته في ملف وشغّلته بـ node، هيقع:

~~~text الناتج (Node 24)
[..."مرحبا"].reverse().join("")             // اقلب نص
    ^^^^^^^

SyntaxError: Unexpected string
~~~

السبب إن السطر اللي قبله مفيش في آخره [[;]]، والسطر ده بيبدأ بـ [[[]]، فـ JS لزقهم كأنهم [[...filter(Boolean)[..."مرحبا"]]]. فاكرها: لو سطر بيبدأ بـ [[[]] أو [[(]]، حط [[;]] في آخر اللي قبله.

---

## الخلاصة

| الـ method | بتعمل إيه | بترجّع |
|---|---|---|
| [[trim()]] | تشيل المسافات من الطرفين | string |
| [[toLowerCase()]] | تصغّر الحروف | string |
| [[includes(x)]] / [[startsWith(x)]] | فيه؟ / بيبدأ بـ؟ | boolean |
| [[split(x)]] | تقطّع عند x | array |
| [[slice(a, b)]] | من a لحد قبل b، والسالب من الآخر | string |
| [[replaceAll(a, b)]] | كل a تبقى b | string |
| [[padStart(n, c)]] | كمّل من الشمال لطول n | string |
| [[at(i)]] | الحرف رقم i، وبتقبل سالب | string |

التمرين اللي تحت ([[slugify]]) معمول من الحتت دي: فكّر الأول أنهي method تشيل المسافات من الأطراف، وأنهي تقطّع، وأنهي تلزّق. وجرّب الحالة اللي فيها مسافتين ورا بعض.`,
          lines: [
            "إيميل فيه مسافات وحروف كبيرة، زي ما اليوزر كتبه.",
            "شيل المسافات من الطرفين وصغّر الحروف. الأصل متغيرش.",
            "فيه @؟",
            "بيبدأ بـ sara؟",
            "قطّعه عند @ لـ array.",
            "أول ٤ حروف: من index 0 لحد قبل index 4.",
            "آخر ٣ حروف: السالب بيتعد من الآخر.",
            R`استبدل كل النقط. [[replace]] كانت هتغيّر أول واحدة بس.`,
            "كمّل بأصفار من الشمال لحد ٣ حروف: مفيدة لأرقام الفواتير.",
            R`آخر حرف. [[at]] بتقبل سالب عكس [[clean[-1]]].`,
            R`قطّع وشيل الفاضي: [[filter(Boolean)]] بيشيل الـ falsy.`,
            R`[[...]] بيقطّع على الحروف الحقيقية، والـ reverse والـ join بيقلبوه.`
          ],
          sol: R`[[slugify("  Hello World JS  ")]] بترجّع [["hello-world-js"]]، و [[slugify("كورس جافاسكريبت")]] بترجّع [["كورس-جافاسكريبت"]]: toLowerCase مبتعملش حاجة للعربي، والمسافة بقت شرطة.

لو عملت [[split(" ")]] والنص فيه مسافتين ورا بعض ([["Hello  World"]]) هيطلعلك [["hello--world"]] بشرطتين، لأن split عملت عنصر فاضي بين المسافتين. الحل [[split(/\s+/)]] (أي عدد مسافات) أو [[split(" ").filter(Boolean)]]. ولو نسيت [[trim]] الأول هيطلع شرطة في الأول والآخر.`,
          solCode: R`const slugify = (title) => title.trim().toLowerCase().split(/\s+/).join("-");
console.log(slugify("  Hello World JS  ")); // "hello-world-js"
console.log(slugify("كورس جافاسكريبت"));    // "كورس-جافاسكريبت"
console.log(slugify("Hello  World"));       // "hello-world"`,
          check: {
            lang: "js",
            starter: R`function slugify(title) {
  return title.toLowerCase();
}`,
            tests: R`test("'  Hello World JS  ' ← 'hello-world-js'", () => expect(slugify("  Hello World JS  ")).toBe("hello-world-js"));
test("عربي: 'كورس جافاسكريبت' ← 'كورس-جافاسكريبت'", () => expect(slugify("كورس جافاسكريبت")).toBe("كورس-جافاسكريبت"));
test("مسافتين ورا بعض ← شرطة واحدة: 'Hello  World' ← 'hello-world'", () => expect(slugify("Hello  World")).toBe("hello-world"));
test("من غير trim هتطلع شرطة في الأول والآخر", () => expect(slugify(" JS ")).toBe("js"));`,
            solution: R`const slugify = (title) => title.trim().toLowerCase().split(/\s+/).join("-");`
          }
        }
      ]
    }
]);

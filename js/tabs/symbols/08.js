// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "الأقواس بأنواعها",
      l: 2,
      n: "( ) و [ ] و { } والـ backtick: كل نوع أقواس ليه أكتر من معنى حسب مكانه",
      items: [
        {
          cmd: "f()  و  (a + b)",
          title: "الأقواس العادية ( ): نداء دالة، وترتيب الحساب، وparameters الدالة، وشرط if",
          desc: R`الأقواس العادية (parentheses) ليها ٤ استخدامات: بعد اسم دالة بتناديها [[greet("Ali")]]. حوالين حساب بتحدد الترتيب [[(2 + 3) * 4]]. وقت تعريف الدالة بتحط فيها الـ parameters [[function add(a, b)]]. وفي [[if (...)]] و [[while (...)]] حوالين الشرط (إجبارية في JS و C و Java، ومش موجودة في Python و Go).

أهم فرق: [[greet]] من غير أقواس هي الدالة نفسها (زي الوصفة)، و [[greet()]] هي ناتج تشغيلها (الأكلة). فـ [[button.onclick = greet]] صح، و [[button.onclick = greet()]] بتشغّلها حالًا وتحط ناتجها.`,
          example: R`function add(a, b) { return a + b; }
console.log(add(2, 3));
console.log(2 + 3 * 4, (2 + 3) * 4);
setTimeout(sayHi, 1000);
const now = (new Date()).getFullYear();`,
          flag: "script",
          try: R`في الـ Console عرّف [[function hi() { return "hi"; }]] واكتب [[hi]] من غير أقواس ثم [[hi()]] وقارن الناتجين.`,
          deep: {
            why: R`نسيان الأقواس أو زيادتها بيطلع bugs محيرة: دالة متنفذتش، أو اتنفذت بدري، أو متغير فيه نص الدالة بدل نتيجتها.`,
            how: R`[[()]] بعد أي expression بيقيّمه كدالة ويناديها. الأقواس حوالين حساب مجرد تجميع (grouping) بتعلّي الأولوية. والـ parser بيفرّق بالمكان: بعد اسم يبقى نداء، لوحدها يبقى تجميع.`,
            when: R`أقواس التجميع حطها حتى لو مش لازمة لو بتوضّح، زي [[(a && b) || c]].`,
            mistakes: R`[[addEventListener("click", handle())]] بتشغّل handle مرة واحدة دلوقتي. الصح [[handle]] أو [[() => handle(id)]]. وفي Python [[print "hi"]] من غير أقواس دي صيغة Python 2 وبتطلع SyntaxError في 3.`
          },
          teach: R`## الفكرة: نفس القوسين، ٤ معاني حسب المكان

| المكان | المعنى | مثال |
|---|---|---|
| بعد اسم دالة وقت تعريفها | الـ parameters (اللي الدالة مستنياه) | [[function add(a, b)]] |
| بعد اسم دالة وقت استخدامها | نادي الدالة (شغّلها) بالقيم دي | [[add(2, 3)]] |
| حوالين حساب | احسب ده الأول (grouping) | [[(2 + 3) * 4]] |
| بعد [[if]] و [[while]] | الشرط | [[if (age > 18)]] |

المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. أقواس التعريف

~~~javascript
function add(a, b) { return a + b; }
~~~

- [[function]] كلمة بتقول «هعرّف دالة»، و [[add]] اسمها.
- [[(a, b)]]: أسماء الـ **parameters**، يعني خانات فاضية هتتملي لما حد ينادي الدالة. الفاصلة بتفصلهم.
- [[{ return a + b; }]] جسم الدالة: [[return]] بترجّع الناتج لمين ناداها.

السطر ده لوحده مش بيطبع حاجة: هو بس عرّف الدالة.

---

## ٢. أقواس النداء

~~~javascript
console.log(add(2, 3));
~~~

~~~text الناتج
5
~~~

من جوه لبرة:

1. [[add(2, 3)]]: شغّل add، و a بقت 2 و b بقت 3 (القيم دي اسمها **arguments**). رجّعت [[5]].
2. [[console.log(5)]]: ده كمان نداء دالة! [[log]] دالة جوه object اسمه [[console]]، والقوسين بيبعتولها القيمة تطبعها.

---

## ٣. أقواس الترتيب

~~~javascript
console.log(2 + 3 * 4, (2 + 3) * 4);
~~~

~~~text الناتج
14 20
~~~

- [[2 + 3 * 4]]: الضرب أولويته أعلى من الجمع زي الرياضيات، فـ [[3 * 4 = 12]] الأول وبعدين [[2 + 12 = 14]].
- [[(2 + 3) * 4]]: القوسين بيقولوا «ده الأول»، فـ [[5 * 4 = 20]].

القوسين هنا مش نداء لأن مفيش اسم قبلهم، هما مجرد تجميع.

---

## ٤. الدالة من غير أقواس

~~~javascript
function sayHi() { console.log("Hi"); }
setTimeout(sayHi, 1000);
~~~

~~~text الناتج (بعد ثانية)
Hi
~~~

- [[setTimeout(دالة, وقت)]] بتشغّل الدالة بعد الوقت ده بالـ millisecond (1000 = ثانية).
- [[sayHi]] **من غير** أقواس: احنا بنسلّم الدالة نفسها لـ setTimeout، وهي اللي هتناديها بعدين.

ولو حطيت أقواس بالغلط:

~~~javascript
setTimeout(sayHi(), 1000);
~~~

~~~text الناتج
Hi
TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. Received undefined
~~~

[[sayHi()]] اتشغّلت **حالًا** وطبعت Hi، ورجّعت [[undefined]] (لأن مفيهاش return)، فـ setTimeout استلمت [[undefined]] بدل دالة واشتكت. في المتصفح مش هيطلع error، بس برضه هتشتغل حالًا مش بعد ثانية.

### الفرق في سطر واحد

~~~javascript
function hi() { return "hi"; }
console.log(hi, hi());
~~~

~~~text الناتج
[Function: hi] hi
~~~

[[hi]] هي الدالة نفسها (Node بيكتبها [[[Function: hi]]]، و Console المتصفح بيكتبها [[ƒ hi()]])، و [[hi()]] ناتج تشغيلها [["hi"]].

> في المثال [[sayHi]] مش متعرّفة، فعرّفها الأول زي ما عملنا.

---

## ٥. أقواس تجميع ونداء مع بعض

~~~javascript
const now = (new Date()).getFullYear();
console.log(now);
~~~

~~~text الناتج (يوم ما شغّلناه)
2026
~~~

1. [[new Date()]]: [[new]] بتعمل object جديد من النوع [[Date]] (تاريخ ووقت دلوقتي)، والقوسين بعد Date نداء.
2. [[( ... )]] حوالين الكل: تجميع، يعني خلّص الـ Date الأول.
3. [[.getFullYear()]]: النقطة بتدخل جوه الـ Date، والقوسين بينادوا الـ method اللي بترجّع السنة.

وعلى فكرة [[new Date().getFullYear()]] من غير أقواس التجميع بيطلّع نفس [[2026]]، بس الأقواس بتوضّح الترتيب للي بيقرا.

---

## ٦. Python

في Python 3 الـ print دالة، فلازم أقواس:

~~~bash
python -c 'print "hi"'
~~~

~~~text الناتج (Python 3.14)
SyntaxError: Missing parentheses in call to 'print'. Did you mean print(...)?
~~~

---

## الخلاصة

- اسم وبعده [[()]] = شغّل دلوقتي. الاسم لوحده = الدالة نفسها (عشان تسلّمها لحد يشغّلها بعدين).
- [[()]] من غير اسم قبلها = احسب ده الأول.
- لو مش متأكد من أولوية العمليات، حط أقواس تجميع: مش بتضر.`,
          lines: [
            R`أقواس الـ parameters وقت التعريف.`,
            R`أقواس النداء: شغّل add بـ 2 و 3، فـ [[5]].`,
            R`من غير أقواس الضرب الأول [[14]]، ومع الأقواس [[20]].`,
            R`[[sayHi]] من غير أقواس: بنسلّم الدالة نفسها لـ setTimeout تشغّلها بعد ثانية.`,
            R`أقواس تجميع حوالين [[new Date()]] وبعدين نادي دالة على الناتج.`
          ],
          sol: R`[[hi]] ← بيطبع الدالة نفسها [[ƒ hi() { return "hi"; }]]. [[hi()]] ← [["hi"]].`
        },
        {
          cmd: "arr[0]  و  [a, b]",
          title: "الأقواس المربعة [ ] في الكود: تعمل array، وتجيب عنصر برقمه، وتفك array لمتغيرات",
          desc: R`[[[1, 2, 3]]] بتعمل array (قايمة). و [[arr[0]]] بتجيب أول عنصر (العد بيبدأ من 0)، و [[arr[arr.length - 1]]] آخر عنصر، أو [[arr.at(-1)]].

و [[obj["key"]]] بتجيب property من object بالاسم، ودي اللي بتستخدمها لما الاسم في متغير: [[obj[field]]].

ولما تيجي على شمال [[=]] بتبقى destructuring: [[const [first, second] = arr]] بتحط أول عنصرين في متغيرين. و [[[a, b] = [b, a]]] بتبدّل قيمتين. نفس الأقواس في Python lists و [[arr[0]]] برضه، و [[arr[-1]]] هناك آخر عنصر.`,
          example: R`const nums = [10, 20, 30];
console.log(nums[0], nums[nums.length - 1]);
const [first, , third] = nums;
const [head, ...tail] = nums;
let a = 1, b = 2;
[a, b] = [b, a];`,
          flag: "script",
          try: R`في الـ Console: [[const arr = ["a", "b", "c"]]] وبعدين [[arr[3]]] و [[arr[-1]]] و [[arr.at(-1)]]. لاحظ إن [[arr[-1]]] مش زي Python.`,
          deep: {
            why: R`الـ arrays في كل برنامج. والـ destructuring بقى في كل كود حديث: [[const [count, setCount] = useState(0)]] في React مثلًا.`,
            how: R`الـ array في JS object خاص مفاتيحه أرقام. [[arr[5]]] لعنصر مش موجود بترجّع undefined من غير error. و [[arr[-1]]] بتدوّر على مفتاح اسمه [["-1"]] فبترجّع undefined.`,
            when: R`[[arr[i]]] جوه loops. [[obj[key]]] لما الاسم متغير أو فيه مسافات أو شرطة. والـ destructuring لما دالة بترجّع أكتر من قيمة في array.`,
            mistakes: R`تبدأ العد من 1. وتستخدم [[arr[arr.length]]] وانت قصدك آخر عنصر (ده بعد الآخر). وتكتب [[arr[-1]]] زي Python. وتنسى [[;]] قبل سطر بيبدأ بـ [[[]] لو مش بتحط semicolons، فـ JS تلزّقه في السطر اللي فوقه.`
          },
          teach: R`## الفكرة: [[[ ]]] ليها ٣ شغلانات

| المكان | المعنى | مثال |
|---|---|---|
| مكان قيمة | اعمل array (قايمة) | [[[10, 20, 30]]] |
| بعد اسم | هات العنصر رقم كذا | [[nums[0]]] |
| شمال [[=]] | فك الـ array لمتغيرات (destructuring) | [[const [a, b] = nums]] |

المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. عمل array

~~~javascript
const nums = [10, 20, 30];
~~~

[[nums]] قايمة فيها ٣ أرقام بالترتيب، والفاصلة بتفصل العناصر. كل عنصر ليه رقم مكان اسمه **index**، والعد بيبدأ من **0**:

~~~text
index:   0    1    2
value:  10   20   30
~~~

---

## ٢. أول عنصر وآخر عنصر

~~~javascript
console.log(nums[0], nums[nums.length - 1]);
~~~

~~~text الناتج
10 30
~~~

- [[nums[0]]]: العنصر اللي الـ index بتاعه 0، يعني الأول: [[10]].
- [[nums.length]]: عدد العناصر، هنا [[3]].
- [[nums[nums.length - 1]]]: من جوه لبرة: [[3 - 1 = 2]]، و [[nums[2]]] بـ [[30]]. ليه ناقص 1؟ لأن العد بدأ من صفر، فآخر index دايمًا أقل من الطول بواحد.

### لو طلبت index مش موجود

~~~javascript
console.log(nums.length, nums[3], nums[-1], nums.at(-1));
~~~

~~~text الناتج
3 undefined undefined 30
~~~

- [[nums[3]]]: مفيش عنصر رابع، فـ [[undefined]] من غير error.
- [[nums[-1]]]: في JS مش «آخر عنصر» زي Python، بتدوّر على خانة اسمها [["-1"]] ومش لاقياها: [[undefined]].
- [[nums.at(-1)]]: الـ method [[at]] هي اللي بتفهم السالب: [[-1]] = آخر عنصر.

وفي Python [[arr[-1]]] بيشتغل على طول:

~~~bash
python -c 'arr=[10,20,30]; print(arr[0], arr[-1])'
~~~

~~~text الناتج (Python 3.14)
10 30
~~~

---

## ٣. destructuring مع تخطّي عنصر

~~~javascript
const [first, , third] = nums;
console.log(first, third);
~~~

~~~text الناتج
10 30
~~~

لما [[[ ]]] تيجي **شمال** [[=]] مش بتعمل array، بتفك واحدة. كل اسم بياخد العنصر اللي في نفس مكانه:

~~~text
[ first ,  (فاضي) ,  third ]
[  10   ,   20    ,   30   ]
~~~

الفاصلة الفاضية في النص معناها «تخطّى العنصر ده»، فالـ 20 ملهاش متغير.

---

## ٤. [[...tail]]: لم الباقي

~~~javascript
const [head, ...tail] = nums;
console.log(head, tail);
~~~

~~~text الناتج
10 [ 20, 30 ]
~~~

[[head]] خد الأول، و [[...tail]] (التلات نقط اسمها rest هنا) لمّت كل اللي فاضل في array جديدة. ليها درس كامل في «الأسهم والنقط والفواصل».

---

## ٥. تبديل قيمتين

~~~javascript
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);
~~~

~~~text الناتج
2 1
~~~

بالترتيب:

1. اليمين الأول: [[[b, a]]] بتعمل array جديدة [[[2, 1]]].
2. الشمال: [[[a, b] =]] بتفكها، فـ a بقت 2 و b بقت 1.

من غير متغير مؤقت. واستخدمنا [[let]] مش [[const]] لأننا بنغيّر القيم.

### فخ الـ semicolon

لو مش بتحط [[;]] في آخر السطور، السطر اللي بيبدأ بـ [[[]] بيتلزّق في اللي فوقه:

~~~javascript
let a = 1, b = 2
[a, b] = [b, a]
~~~

~~~text الناتج
ReferenceError: Cannot access 'b' before initialization
~~~

JS قرت السطرين كأنهم [[let a = 1, b = 2[a, b] = ...]]، يعني بتحاول تقرا [[2[a, b]]] و b لسه بتتعرّف. حط [[;]] في آخر السطر الأول.

---

## ٦. [[obj["key"]]] مع object

~~~javascript
const obj = { name: "Ali" };
const field = "name";
console.log(obj[field], obj["name"]);
~~~

~~~text الناتج
Ali Ali
~~~

نفس الأقواس بتجيب خانة من object بالاسم، ولما الاسم في متغير ([[field]]) هي الطريقة الوحيدة. ليها درس «obj.key و obj[key]».

---

## الخلاصة

- العد من [[0]]، وآخر عنصر [[arr[arr.length - 1]]] أو [[arr.at(-1)]].
- index مش موجود = [[undefined]]، مش error.
- [[[ ]]] شمال [[=]] = فك، والفاصلة الفاضية بتتخطّى، و [[...]] بتلم الباقي.`,
          lines: [
            R`array فيها ٣ أرقام.`,
            R`أول عنصر رقمه 0، وآخر عنصر رقمه الطول ناقص 1: [[10 30]].`,
            R`destructuring: الفصلة الفاضية بتتخطّى العنصر التاني، فـ first بـ 10 و third بـ 30.`,
            R`[[...tail]] بتلم الباقي: head بـ 10 و tail بـ [[[20, 30]]].`,
            R`متغيرين.`,
            R`تبديل القيمتين في سطر واحد من غير متغير مؤقت.`
          ],
          sol: R`[[arr[3]]] ← [[undefined]] (مفيش عنصر رابع). [[arr[-1]]] ← [[undefined]]. [[arr.at(-1)]] ← [["c"]].`,
          check: {
            lang: "js",
            starter: R`// رجّع array فيها أول عنصر وآخر عنصر: firstAndLast([1, 2, 3]) ← [1, 3]
function firstAndLast(arr) {
  return [arr[1], arr[arr.length]];
}`,
            tests: R`test("firstAndLast([1, 2, 3]) ← [1, 3]", () => expect(firstAndLast([1, 2, 3])).toEqual([1, 3]));
test("firstAndLast(['a', 'b']) ← ['a', 'b']", () => expect(firstAndLast(["a", "b"])).toEqual(["a", "b"]));
test("عنصر واحد: firstAndLast([7]) ← [7, 7]", () => expect(firstAndLast([7])).toEqual([7, 7]));`,
            solution: R`function firstAndLast(arr) {
  const [first] = arr;
  return [first, arr[arr.length - 1]];
}`
          }
        },
        {
          cmd: "{ }",
          title: "الأقواس المعووجة { } في الكود: بلوك كود، أو object، أو تفك object لمتغيرات",
          desc: R`الأقواس المعووجة (curly braces) ليها ٣ معاني كبار في JS، والمكان هو اللي بيحدد:

بعد [[if]] أو [[for]] أو [[function]]: بلوك (block) فيه سطور كود. [[if (ok) { ... }]]. ونفس الحكاية في C و Java و Go و PHP. Python مبتستخدمهاش للبلوك خالص، بتستخدم المسافات.

لما تيجي مكان قيمة: object فيه مفاتيح وقيم [[{ name: "Ali", age: 20 }]]. وفي Python ده dict، و [[{1, 2}]] من غير [[:]] هناك set.

وعلى شمال [[=]] أو في parameters الدالة: destructuring. [[const { name, age } = user]] بتطلّع خانتين في متغيرين بنفس الاسم. و [[{ name = "ضيف" }]] قيمة افتراضية، و [[{ name: userName }]] اسم جديد.`,
          example: R`const user = { name: "Ali", age: 20 };
const { name, age } = user;
const { city = "Cairo" } = user;
function show({ name, age }) { return name + " " + age; }
const short = { name, age };
if (age > 18) { console.log("ok"); }`,
          flag: "script",
          try: R`في الـ Console: [[const { a, b = 5, ...rest } = { a: 1, c: 3, d: 4 }]] وبعدين اطبع [[a]] و [[b]] و [[rest]]. وبعدين حل التمرين.`,
          deep: {
            why: R`الـ objects هي الطريقة اللي بتشيل بيها داتا في JS، و JSON نفس الشكل. والـ destructuring في كل كود React و Node: [[function Card({ title })]] و [[const { data } = await axios.get(...)]].`,
            how: R`الـ parser بيحدد المعنى من المكان: لو مستني statement يبقى بلوك، لو مستني قيمة يبقى object، لو على شمال [[=]] يبقى pattern. و [[{ name, age }]] لوحدها في object هي اختصار [[{ name: name, age: age }]].`,
            when: R`بلوكات في كل if و loop (حتى لو سطر واحد، عشان الأمان). objects لأي داتا ليها خانات. destructuring لما تحتاج خانتين تلاتة من object كبير.`,
            mistakes: R`ترجّع object من arrow function من غير أقواس عادية: [[() => { a: 1 }]] بتترجّع undefined لأن JS فهمتها بلوك، الصح [[() => ({ a: 1 })]]. وتعمل destructuring من undefined فتقع: [[const { a } = undefined]] بترمي TypeError.`
          },
          teach: R`## الفكرة: المكان هو اللي بيحدد المعنى

| فين | معناها | مثال |
|---|---|---|
| بعد [[if]] و [[for]] و [[function]] | بلوك: كذا سطر كود مع بعض | [[if (ok) { ... }]] |
| مكان قيمة (بعد [[=]] مثلًا) | object: مفاتيح وقيم | [[{ name: "Ali" }]] |
| شمال [[=]] أو في parameters | فك object لمتغيرات (destructuring) | [[const { name } = user]] |

المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. object

~~~javascript
const user = { name: "Ali", age: 20 };
~~~

- [[{ }]] هنا جاية بعد [[=]] يعني مكان قيمة، فهي **object**: مجموعة خانات.
- كل خانة [[مفتاح: قيمة]]: [[name]] قيمتها [["Ali"]]، و [[age]] قيمتها [[20]]. النقطتين بتفصل المفتاح عن القيمة، والفاصلة بتفصل الخانات.

---

## ٢. destructuring: طلّع خانتين في متغيرين

~~~javascript
const { name, age } = user;
console.log(name, age);
~~~

~~~text الناتج
Ali 20
~~~

نفس الأقواس بس **شمال** [[=]]، فمعناها «فك». JS بتدوّر في [[user]] على خانة اسمها [[name]] وتحطها في متغير بنفس الاسم، ونفس الكلام مع [[age]]. يعني السطر ده اختصار:

~~~javascript
const name = user.name;
const age = user.age;
~~~

وهنا الترتيب مش مهم (عكس الـ array): الربط بالاسم مش بالمكان.

---

## ٣. قيمة افتراضية

~~~javascript
const { city = "Cairo" } = user;
console.log(city, user.city);
~~~

~~~text الناتج
Cairo undefined
~~~

[[user]] مفيهوش [[city]] ([[user.city]] بـ [[undefined]])، فـ [[= "Cairo"]] جوه الأقواس اشتغلت. لو كانت موجودة كانت هتتاخد هي. والقيمة الافتراضية دي بتشتغل لما الخانة [[undefined]] بس.

### اسم جديد بـ [[:]]

~~~javascript
const { name: userName } = user;
console.log(userName);
~~~

~~~text الناتج
Ali
~~~

جوه الـ destructuring النقطتين معناها «خد name وسمّيها userName». خد بالك إنها شبه شكل الـ object بس بالعكس: الاسم القديم شمال والجديد يمين.

---

## ٤. destructuring في parameters الدالة

~~~javascript
function show({ name, age }) { return name + " " + age; }
console.log(show(user));
~~~

~~~text الناتج
Ali 20
~~~

الدالة مستنية object واحد، وبتفكه على طول وهو داخل. [[show(user)]] بعتت الـ object كله، والدالة طلّعت منه [[name]] و [[age]]. وهنا فيه نوعين أقواس معووجة في نفس السطر: الأولى جوه [[( )]] destructuring، والتانية بعدها بلوك جسم الدالة.

---

## ٥. الاختصار: [[{ name, age }]]

~~~javascript
const short = { name, age };
console.log(short);
~~~

~~~text الناتج
{ name: 'Ali', age: 20 }
~~~

لما المتغير اسمه زي المفتاح، مش لازم تكتبه مرتين: [[{ name, age }]] هي [[{ name: name, age: age }]]. اسمها shorthand properties. (Node بيطبع النصوص بعلامة [[']].)

---

## ٦. بلوك

~~~javascript
if (age > 18) { console.log("ok"); }
~~~

~~~text الناتج
ok
~~~

بعد [[if (...)]] الأقواس **بلوك**: كل اللي جواها بيتنفذ لو الشرط صح. [[20 > 18]] صح، فاتطبع ok.

---

## ٧. الفخ: object من arrow function

~~~javascript
const f = () => { a: 1 };
console.log(f());
const g = () => ({ a: 1 });
console.log(g());
~~~

~~~text الناتج
undefined
{ a: 1 }
~~~

بعد [[=>]] الـ [[{]] بتتفهم **بلوك** مش object، و [[a:]] جواه بقت label (اسم لسطر)، ومفيش return، فرجّعت [[undefined]]. الأقواس العادية حواليها بتقول لـ JS «دي قيمة»، فبقت object.

### الفخ التاني: فك [[undefined]]

~~~javascript
const { a } = undefined;
~~~

~~~text الناتج
TypeError: Cannot destructure property 'a' of 'undefined' as it is undefined.
~~~

---

## ٨. في Python

~~~bash
python -c 'print(type({1, 2}), type({"a": 1}), type({}))'
~~~

~~~text الناتج (Python 3.14)
<class 'set'> <class 'dict'> <class 'dict'>
~~~

[[{"a": 1}]] اسمه dict (زي الـ object)، و [[{1, 2}]] من غير [[:]] اسمه set (مجموعة من غير تكرار)، و [[{}]] الفاضية dict. والبلوك في Python بالمسافات مش بالأقواس.

---

## الخلاصة

- قبل [[{]] فيه [[if]] أو [[for]] أو [[)]] بتاعة دالة أو [[=>]]: بلوك.
- [[{]] مكان قيمة: object.
- [[{]] شمال [[=]] أو في parameters: فك، و [[=]] جواها قيمة افتراضية، و [[:]] جواها اسم جديد.`,
          lines: [
            R`object فيه خانتين.`,
            R`destructuring: name بـ [["Ali"]] و age بـ [[20]].`,
            R`قيمة افتراضية لأن city مش موجودة في user، فـ [["Cairo"]].`,
            R`destructuring جوه parameters الدالة نفسها.`,
            R`الاختصار: نفس [[{ name: name, age: age }]].`,
            R`بلوك كود بعد if.`
          ],
          sol: R`[[a]] ← [[1]]، [[b]] ← [[5]] (الافتراضية، لأن b مش موجودة)، [[rest]] ← [[{ c: 3, d: 4 }]].`,
          check: {
            lang: "js",
            starter: R`// استخدم destructuring في الـ parameters
// describe({ name: "Ali", age: 20 }) ← "Ali (20)"
// ولو مفيش age: describe({ name: "Sara" }) ← "Sara (?)"
function describe(user) {
}`,
            tests: R`test("describe({ name: 'Ali', age: 20 }) ← Ali (20)", () => expect(describe({ name: "Ali", age: 20 })).toBe("Ali (20)"));
test("من غير age ← Sara (?)", () => expect(describe({ name: "Sara" })).toBe("Sara (?)"));
test("age صفر ← Baby (0)", () => expect(describe({ name: "Baby", age: 0 })).toBe("Baby (0)"));`,
            solution: R`function describe({ name, age = "?" }) {
  return $__bt$__{name} ($__{age})$__bt;
}`
          }
        },
        {
          cmd: "$__bt$__{x}$__bt",
          title: "الـ backtick والـ ${ }: نص تحط جواه متغيرات وحسابات وكذا سطر (template literal)",
          desc: R`في JS فيه ٣ أنواع تنصيص: [["..."]] و [['...']] (نفس الحاجة)، والـ backtick (الزرار اللي تحت Esc). الأخير اسمه template literal، وجواه تقدر تكتب [[$__{...}]] وأي حاجة جوه الأقواس بتتحسب وتتحط مكانها.

فبدل [["أهلًا " + name + "، عندك " + n + " رسالة"]] تكتب $__btأهلًا $__{name}، عندك $__{n} رسالة$__bt. وكمان بيكمّل على كذا سطر عادي من غير [[\n]].

نفس الفكرة في لغات تانية بشكل مختلف: Python [[f"Hi {name}"]]، و Kotlin و Dart [["Hi $name"]] و [["$__{a + b}"]]، و C# [[$"Hi {name}"]]، و PHP [["Hi $name"]]. وفي bash الـ backtick معناه تاني خالص (تشغيل أمر).`,
          example: R`const name = "Sara", n = 3;
console.log($__btأهلًا $__{name}، عندك $__{n} رسايل$__bt);
console.log($__btالإجمالي: $__{n * 50} جنيه$__bt);
const html = $__bt<li class="$__{n > 0 ? "new" : ""}">$__{name}</li>$__bt;
console.log("Hi $__{name}");`,
          flag: "script",
          try: R`في الـ Console جرّب نفس الجملة مرة بـ [["..."]] ومرة بالـ backtick: [["Hi $__{1 + 1}"]] وبعدين نفس الكلام بين backticks. وبعدين حل التمرين.`,
          deep: {
            why: R`بناء النصوص من متغيرات أكتر حاجة بتعملها: رسايل وروابط API و HTML. والـ [[+]] بين النصوص بتطلع كود صعب يتقري وسهل تنسى فيه مسافة.`,
            how: R`JS بتقيّم كل [[$__{}]] وتحوّل الناتج لنص وتلزّقه. أي expression شغال جواها: نداء دالة وternary وحساب، لكن مش statement زي if.`,
            when: R`أي نص فيه متغيرات أو أكتر من سطر. والنصوص الثابتة عادي تفضل [["..."]].`,
            mistakes: R`تكتب [[$__{name}]] جوه [["..."]] عادية فتتطبع زي ما هي (السطر الأخير في المثال). وتستخدم [[']] (علامة التنصيص) بدل الـ backtick لأنهم قريبين في الشكل. وتبني SQL أو HTML من input اليوزر بالطريقة دي: ده باب لـ SQL injection و XSS.`
          },
          teach: R`## الفكرة: نص فيه فتحات بتتملي

الـ backtick هو الزرار اللي تحت Esc وعلى شمال رقم 1. لما تحط نص بين اتنين منه، النص ده اسمه **template literal**، وأي حاجة تكتبها جوه [[$__{ }]] بتتحسب والناتج بيتحط مكانها. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. متغيرين

~~~javascript
const name = "Sara", n = 3;
~~~

متغيرين ثابتين في سطر واحد: نص و رقم.

---

## ٢. متغيرات جوه النص

~~~javascript
console.log($__btأهلًا $__{name}، عندك $__{n} رسايل$__bt);
~~~

~~~text الناتج
أهلًا Sara، عندك 3 رسايل
~~~

- الـ backtick في الأول والآخر بيفتح ويقفل النص.
- [[$__{name}]]: الدولار والقوس المعووج معناهم «افتح فتحة»، وجواها اسم المتغير، فاتحط [["Sara"]].
- [[$__{n}]]: الرقم 3 اتحوّل لنص واتحط.

نفس الجملة بالطريقة القديمة بـ [[+]]:

~~~javascript
console.log("أهلًا " + name + "، عندك " + n + " رسايل");
~~~

نفس الناتج، بس لازم تفتكر المسافات جوه علامات التنصيص، وصعب تتقري.

---

## ٣. حساب جوه الفتحة

~~~javascript
console.log($__btالإجمالي: $__{n * 50} جنيه$__bt);
~~~

~~~text الناتج
الإجمالي: 150 جنيه
~~~

جوه [[$__{ }]] أي **expression** (حاجة بتطلّع قيمة): هنا [[3 * 50]] اتحسبت [[150]] الأول وبعدين اتحطت. ينفع كمان نداء دالة أو ternary، لكن مش statement زي [[if]] أو [[for]].

---

## ٤. HTML فيه ternary

~~~javascript
const html = $__bt<li class="$__{n > 0 ? "new" : ""}">$__{name}</li>$__bt;
console.log(html);
~~~

~~~text الناتج
<li class="new">Sara</li>
~~~

من جوه لبرة:

1. [[n > 0 ? "new" : ""]]: [[3 > 0]] صح، فالـ ternary طلّع [["new"]] (درس [[? :]] في «رموز المنطق»).
2. اتحط جوه [[class="..."]].
3. [[$__{name}]] اتحط بين [[<li>]] و [[</li>]].

ولاحظ إن علامات التنصيص [["]] جوه الـ backtick عادي، مش محتاجة هروب، لأن النص مقفول بالـ backtick مش بيها.

> بناء HTML من كلام اليوزر كده خطر (XSS): لو الاسم فيه [[<script>]] هيتحط زي ما هو. للعرض بس من داتا انت عارفها.

---

## ٥. الغلطة: [[$__{ }]] جوه تنصيص عادي

~~~javascript
console.log("Hi $__{name}");
~~~

~~~text الناتج
Hi $__{name}
~~~

بين [["..."]] أو [['...']] الـ [[$__{ }]] مالهاش أي معنى، فاتطبعت حرف بحرف. الفتحات بتشتغل بين backticks بس.

---

## ٦. كذا سطر

~~~javascript
console.log($__btسطر 1
سطر 2$__bt);
~~~

~~~text الناتج
سطر 1
سطر 2
~~~

الـ Enter جوه الـ backtick بيفضل سطر جديد في النص. مع [["..."]] ده SyntaxError، ولازم تكتب السطر الجديد بالهروب.

---

## ٧. الـ backtick في bash معناه تاني

~~~bash
echo "user: $__btwhoami$__bt"
echo "user: $(whoami)"
~~~

~~~text الناتج (Ubuntu 24.04 في Docker)
user: root
user: root
~~~

في bash الأمر اللي بين backticks **بيتشغّل** وناتجه بيتحط مكانه، زي [[$( )]]. يعني نفس الزرار بس شغلانة تانية خالص.

---

## الخلاصة

| الشكل | النتيجة |
|---|---|
| [["Hi $__{x}"]] | النص زي ما هو، من غير تعويض |
| backtick وجواه [[$__{x}]] | قيمة x اتحطت مكانها |
| backtick وجواه [[$__{a * b}]] | ناتج الحساب |
| backtick فيه Enter | نص كذا سطر |`,
          lines: [
            R`متغيرين.`,
            R`المتغيرات اتحطت جوه النص: [[أهلًا Sara، عندك 3 رسايل]].`,
            R`حساب جوه [[$__{}]]: [[الإجمالي: 150 جنيه]].`,
            R`HTML فيه ternary جوه [[$__{}]].`,
            R`غلط: [["..."]] عادية، فهتطبع [[$__{name}]] حرفيًا.`
          ],
          sol: R`[["Hi $__{1 + 1}"]] ← [[Hi $__{1 + 1}]] زي ما هي. وبالـ backtick ← [[Hi 2]].`,
          check: {
            lang: "js",
            starter: R`// receipt("Ali", 3, 50) ← "Ali: 3 × 50 = 150 جنيه"
// استخدم template literal
function receipt(name, qty, price) {
  return name + ": " + qty + " × " + price;
}`,
            tests: R`test("receipt('Ali', 3, 50)", () => expect(receipt("Ali", 3, 50)).toBe("Ali: 3 × 50 = 150 جنيه"));
test("receipt('Sara', 1, 99)", () => expect(receipt("Sara", 1, 99)).toBe("Sara: 1 × 99 = 99 جنيه"));`,
            solution: R`function receipt(name, qty, price) {
  return $__bt$__{name}: $__{qty} × $__{price} = $__{qty * price} جنيه$__bt;
}`
          }
        }
      ]
    }
]);

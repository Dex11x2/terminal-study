// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "الأسهم والنقط والفواصل",
      l: 2,
      n: "=> و ... و . و ; و // : رموز صغيرة بتغيّر معنى السطر كله",
      items: [
        {
          cmd: "=>",
          title: "السهم => : طريقة مختصرة تكتب بيها دالة (arrow function)",
          desc: R`[[(a, b) => a + b]] دالة بتاخد a و b وترجّع مجموعهم. الشمال الـ parameters، واليمين اللي بترجّعه. ده نفس [[function (a, b) { return a + b; }]] بس أقصر.

لو parameter واحد ممكن تشيل الأقواس: [[x => x * 2]]. لو مفيش: [[() => 42]]. لو الجسم أكتر من سطر حط [[{ }]] واكتب [[return]] بنفسك. ولو بترجّع object حطه بين أقواس: [[() => ({ ok: true })]].

الفرق المهم عن function: الـ arrow مالهاش [[this]] بتاعها، بتاخده من المكان اللي اتكتبت فيه. ونفس الرمز [[=>]] في C# و Dart و Scala، وفي PHP [[fn($x) => $x * 2]]، أما Java و Kotlin بيستخدموا [[->]].`,
          example: R`const double = x => x * 2;
const add = (a, b) => a + b;
const hello = () => "hello";
const toUser = name => ({ name, active: true });
[1, 2, 3].map(n => n * n);
const sum = (arr) => {
  let s = 0;
  for (const n of arr) s += n;
  return s;
};`,
          flag: "script",
          try: R`في الـ Console جرّب [[(() => { a: 1 })()]] و [[(() => ({ a: 1 }))()]] وقارن. وبعدين حل التمرين.`,
          deep: {
            why: R`الـ arrows في كل كود JS حديث: [[map]] و [[filter]] و [[then]] و React event handlers. لازم تقراها بسرعة.`,
            how: R`لو اليمين expression من غير [[{]] بيترجّع لوحده (implicit return). لو فيه [[{]] بيبقى بلوك عادي ومحتاج [[return]]. وبتمسك [[this]] و [[arguments]] من الدالة اللي حواليها، عشان كده مش بتنفع كـ method في object لو محتاج this.`,
            when: R`الـ callbacks وأي دالة صغيرة. للـ methods في objects اللي بتستخدم this، أو constructors، استخدم function أو class.`,
            mistakes: R`[[x => { x * 2 }]] بترجّع undefined لأنك فتحت بلوك ومكتبتش return. و [[() => { a: 1 }]] نفس المشكلة. وتكتب [[=>]] بدل [[>=]] في شرط. وتعمل method كـ arrow وتستخدم this جواها.`
          },
          teach: R`## الفكرة: دالة من غير كلمة function

~~~text الشكل
(الـ parameters)  =>  اللي بترجّعه
~~~

السهم [[=>]] (علامة يساوي وبعدها أكبر من، ورا بعض من غير مسافة) بيعمل **arrow function**. الشمال هو اللي الدالة بتاخده، واليمين هو اللي بترجّعه. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز، وضفنا سطر في الآخر بينادي كل دالة عشان نشوف الناتج:

~~~javascript
console.log(double(5), add(2, 3), hello(), toUser("Ali"), sum([1, 2, 3]));
~~~

~~~text الناتج
10 5 hello { name: 'Ali', active: true } 6
~~~

هنمشي على كل دالة لوحدها.

---

## ١. parameter واحد: [[x => x * 2]]

~~~javascript
const double = x => x * 2;
~~~

- [[const double =]]: الدالة نفسها قيمة، فبنحطها في متغير اسمه double.
- [[x]]: parameter واحد، فمش لازم أقواس حواليه.
- [[x * 2]]: اليمين expression من غير [[{ }]]، فبيترجّع لوحده (اسمها **implicit return**، يعني return ضمني).

[[double(5)]] طلّعت [[10]]. وده بالظبط زي:

~~~javascript
const double = function (x) { return x * 2; };
~~~

---

## ٢. أكتر من parameter: لازم أقواس

~~~javascript
const add = (a, b) => a + b;
~~~

[[(a, b)]] اتنين، فالأقواس إجبارية. [[add(2, 3)]] طلّعت [[5]].

---

## ٣. مفيش parameters: أقواس فاضية

~~~javascript
const hello = () => "hello";
~~~

[[()]] فاضية معناها الدالة مش بتاخد حاجة. [[hello()]] طلّعت [["hello"]].

---

## ٤. ترجّع object: لازم أقواس عادية

~~~javascript
const toUser = name => ({ name, active: true });
~~~

[[toUser("Ali")]] طلّعت [[{ name: 'Ali', active: true }]]. ليه القوسين حوالين [[{ }]]؟ لأن بعد [[=>]] الـ [[{]] بتتفهم بلوك كود. الأقواس العادية بتقول «دي قيمة». شوف الفرق:

~~~javascript
console.log((() => { a: 1 })(), (() => ({ a: 1 }))());
~~~

~~~text الناتج
undefined { a: 1 }
~~~

- الأولى: [[{ a: 1 }]] اتفهمت بلوك، و [[a:]] جواه label (اسم لسطر) مش مفتاح، ومفيش return، فـ [[undefined]].
- التانية: بالأقواس بقت object.

(والشكل [[(دالة)()]] معناه اعمل الدالة ونادي عليها على طول.)

و [[{ name, active: true }]] اختصار [[{ name: name, active: true }]] (درس [[{ }]]).

---

## ٥. arrow كـ callback

~~~javascript
console.log([1, 2, 3].map(n => n * n));
~~~

~~~text الناتج
[ 1, 4, 9 ]
~~~

[[map]] بتلف على كل عنصر في الـ array وتنادي الدالة اللي بعتناها عليه، وتعمل array جديدة من النتايج: 1×1 و 2×2 و 3×3. الدالة اللي بتتبعت لدالة تانية اسمها **callback**، وده أكتر مكان هتشوف فيه [[=>]]. (السطر في المثال من غير [[console.log]]، فلو كتبته في ملف مش هيطبع حاجة، في الـ Console بس هتشوف الناتج.)

---

## ٦. جسم كذا سطر: [[{ }]] و [[return]]

~~~javascript
const sum = (arr) => {
  let s = 0;
  for (const n of arr) s += n;
  return s;
};
~~~

- [[=> {]]: فتحنا بلوك، فالـ return الضمني راح، ولازم نكتب [[return]] بنفسنا.
- [[let s = 0;]]: متغير هنجمع فيه.
- [[for (const n of arr) s += n;]]: لف على كل عنصر n في arr، وزوّده على s ([[+=]] ليها درس في «رموز الحساب»).
- [[return s;]]: رجّع المجموع.
- [[};]]: [[}]] بتقفل البلوك، و [[;]] بتقفل جملة [[const sum = ...]].

[[sum([1, 2, 3])]] طلّعت [[6]].

### لو نسيت [[return]]

~~~javascript
const bad = x => { x * 2 };
console.log(bad(5));
~~~

~~~text الناتج
undefined
~~~

البلوك حسب [[10]] ورماها، لأن مفيش return.

---

## ٧. الفرق مع [[this]]

الـ arrow مالهاش [[this]] بتاعها، بتاخده من المكان اللي اتكتبت فيه. فلو عملتها method في object:

~~~javascript
const o = { n: 1, f: () => this.n, g() { return this.n; } };
console.log(o.f(), o.g());
~~~

~~~text الناتج
undefined 1
~~~

[[g]] (method عادية) شافت [[this]] = o فرجّعت 1. و [[f]] (arrow) أخدت [[this]] من برة الـ object، وهناك مفيش [[n]].

---

## الخلاصة

| الشكل | امتى |
|---|---|
| [[x => x * 2]] | parameter واحد |
| [[(a, b) => a + b]] | أكتر من واحد |
| [[() => 42]] | ولا واحد |
| [[x => ({ ... })]] | ترجّع object |
| [[x => { ...; return y; }]] | جسم كذا سطر |

ونفس [[=>]] في C# و Dart، و PHP [[fn($x) => $x * 2]]، و Java و Kotlin بيكتبوا [[->]].`,
          lines: [
            R`parameter واحد من غير أقواس، وبترجّع الضعف.`,
            R`parameterين لازم أقواس.`,
            R`من غير parameters: أقواس فاضية.`,
            R`بترجّع object، فلازم أقواس عادية حواليه.`,
            R`arrow كـ callback لـ map: [[[1, 4, 9]]].`,
            R`جسم كذا سطر: [[{ }]] و [[return]] صريحة.`,
            R`متغير للمجموع.`,
            R`loop بتجمع.`,
            R`return صريحة لأن فيه بلوك.`,
            R`قفلة البلوك و [[;]] بتاعة الـ const.`
          ],
          sol: R`الأولى ← [[undefined]] (اتفهمت بلوك فيه label اسمه a). التانية ← [[{ a: 1 }]].`,
          check: {
            lang: "js",
            starter: R`// اكتب الاتنين arrow functions
// toUser("Ali") ← { name: "Ali", active: true }
// squares([1, 2, 3]) ← [1, 4, 9]
const toUser = name => { name: name, active: true };
const squares = nums => {
  nums.map(n => n * n);
};`,
            tests: R`test("toUser('Ali') ← { name: 'Ali', active: true }", () => expect(toUser("Ali")).toEqual({ name: "Ali", active: true }));
test("squares([1, 2, 3]) ← [1, 4, 9]", () => expect(squares([1, 2, 3])).toEqual([1, 4, 9]));
test("squares([]) ← []", () => expect(squares([])).toEqual([]));`,
            solution: R`const toUser = name => ({ name, active: true });
const squares = nums => nums.map(n => n * n);`
          }
        },
        {
          cmd: "...",
          title: "التلات نقط ... : تفرد array أو object جوه واحد تاني (spread)، أو تلم الباقي (rest)",
          desc: R`[[...]] ليها معنيين عكس بعض. spread (فرد): [[[...a, 4]]] بتحط كل عناصر a في array جديدة، و [[{ ...user, age: 21 }]] نسخة من object مع تعديل، و [[Math.max(...nums)]] بتبعت العناصر كـ arguments منفصلة.

rest (لمّ): في parameters الدالة [[function sum(...nums)]] بتلم كل الـ arguments في array. وفي الـ destructuring [[const { id, ...rest } = obj]] بتلم الباقي.

القاعدة: لو [[...]] على اليمين أو في نداء، بتفرد. لو على الشمال أو في تعريف، بتلم. في Python المقابل [[*]] و [[**]]. وفي Go [[...]] برضه للـ variadic.`,
          example: R`const a = [1, 2, 3];
const b = [...a, 4];
const user = { name: "Ali", age: 20 };
const older = { ...user, age: 21 };
console.log(Math.max(...a));
function sum(...nums) { return nums.reduce((s, n) => s + n, 0); }
const { name, ...others } = user;`,
          flag: "script",
          try: R`اعمل [[const x = [1, 2]; const y = x; const z = [...x];]] وبعدين [[x.push(3)]] واطبع [[y]] و [[z]]. لاحظ مين اتأثر. وبعدين حل التمرين.`,
          deep: {
            why: R`في React و Redux ممنوع تعدّل الـ state مباشرة، فكل تحديث بيتكتب بـ spread: [[setUser({ ...user, name })]]. ده أكتر رمز هتشوفه في الكود الحديث.`,
            how: R`الـ spread بيعمل نسخة سطحية (shallow copy): العناصر نفسها لو objects بتفضل نفس المرجع. ولو فيه مفتاح متكرر، اللي بعده بيكسب، عشان كده [[{ ...user, age: 21 }]] بتغيّر age.`,
            when: R`نسخ arrays و objects من غير ما تعدّل الأصل، ودمجهم، ودوال بعدد arguments مش ثابت.`,
            mistakes: R`تفتكر الـ spread نسخة عميقة: [[{ ...user }.address.city = "x"]] بيغيّر الأصل. وتكتب [[{ age: 21, ...user }]] بالعكس فالقديم يكسب. والـ rest لازم يبقى آخر حاجة: [[(...a, b)]] SyntaxError.`
          },
          teach: R`## الفكرة: نفس التلات نقط، شغلانتين عكس بعض

| الاسم | بيعمل إيه | فين |
|---|---|---|
| **spread** (فرد) | بياخد array أو object ويفرد عناصره واحد واحد | يمين [[=]]، أو جوه نداء دالة |
| **rest** (لمّ) | بيلم كذا حاجة في array أو object واحد | شمال [[=]]، أو في تعريف الدالة |

المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. spread في array

~~~javascript
const a = [1, 2, 3];
const b = [...a, 4];
console.log(b, a);
~~~

~~~text الناتج
[ 1, 2, 3, 4 ] [ 1, 2, 3 ]
~~~

[[...a]] جوه [[[ ]]] جديدة معناها «حط عناصر a هنا واحد واحد»، فبقت [[[1, 2, 3, 4]]]. و [[a]] نفسها متغيرتش: [[b]] array جديدة.

---

## ٢. spread في object: نسخة مع تعديل

~~~javascript
const user = { name: "Ali", age: 20 };
const older = { ...user, age: 21 };
console.log(older, user);
~~~

~~~text الناتج
{ name: 'Ali', age: 21 } { name: 'Ali', age: 20 }
~~~

بالترتيب من الشمال:

1. [[...user]] فرد خانات user: [[name: "Ali"]] و [[age: 20]].
2. [[age: 21]] جت بعدها بنفس المفتاح، فـ **اللي بعده بيكسب**: age بقت 21.

والأصل [[user]] لسه 20. ولو عكست الترتيب، القديم يكسب:

~~~javascript
console.log({ age: 21, ...user });
~~~

~~~text الناتج
{ age: 20, name: 'Ali' }
~~~

---

## ٣. spread في نداء دالة

~~~javascript
console.log(Math.max(...a), Math.max(a));
~~~

~~~text الناتج
3 NaN
~~~

- [[Math.max]] بتاخد أرقام منفصلة: [[Math.max(1, 2, 3)]]. و [[...a]] حوّلت الـ array لـ ٣ arguments منفصلين بالظبط، فطلع [[3]].
- من غير النقط بعتنا الـ array كلها كـ argument واحد، و Math.max مش فاهماها رقم، فطلع [[NaN]] (Not a Number).

---

## ٤. rest في parameters الدالة

~~~javascript
function sum(...nums) { return nums.reduce((s, n) => s + n, 0); }
console.log(sum(1, 2, 3), sum());
~~~

~~~text الناتج
6 0
~~~

- [[...nums]] في **تعريف** الدالة: لمّ كل الـ arguments اللي هتيجي في array اسمها nums. [[sum(1, 2, 3)]] خلّت nums بـ [[[1, 2, 3]]].
- [[nums.reduce((s, n) => s + n, 0)]]: [[reduce]] بتلف على الـ array وتجمّع في قيمة واحدة. [[s]] المجموع لحد دلوقتي و [[n]] العنصر الحالي، والـ [[0]] في الآخر بداية المجموع. فـ 0+1+2+3 = [[6]].
- [[sum()]] من غير حاجة: nums فاضية، فرجع البداية [[0]].

والـ rest لازم يبقى **آخر** parameter:

~~~javascript
function f(...a, b) {}
~~~

~~~text الناتج
SyntaxError: Rest parameter must be last formal parameter
~~~

---

## ٥. rest في الـ destructuring

~~~javascript
const { name, ...others } = user;
console.log(name, others);
~~~

~~~text الناتج
Ali { age: 20 }
~~~

[[name]] خدت خانتها، و [[...others]] لمّت كل الخانات اللي فاضلة في object جديد.

---

## ٦. نسخة ولا نفس الحاجة؟

~~~javascript
const x = [1, 2];
const y = x;
const z = [...x];
x.push(3);
console.log(y, z);
~~~

~~~text الناتج
[ 1, 2, 3 ] [ 1, 2 ]
~~~

- [[y = x]] مش نسخة: y و x اسمين لنفس الـ array، فلما [[push]] زوّدت 3 على x، y شافتها.
- [[z = [...x]]] array جديدة، فمتأثرتش.

بس الـ spread نسخة **سطحية** (shallow): لو جواها objects، الـ objects نفسها مشتركة بين الأصل والنسخة.

---

## الخلاصة

| تكتب | المعنى |
|---|---|
| [[[...a, 4]]] | array جديدة فيها عناصر a وبعدها 4 |
| [[{ ...obj, key: v }]] | نسخة من obj والمفتاح ده متغيّر |
| [[f(...arr)]] | ابعت العناصر كـ arguments منفصلة |
| [[function f(...args)]] | لمّ الـ arguments في array |
| [[const { a, ...rest } = obj]] | الباقي في object |

وفي Python المقابل [[*]] للـ lists و [[**]] للـ dicts.`,
          lines: [
            R`array أصلية.`,
            R`spread: array جديدة [[[1, 2, 3, 4]]] و a زي ما هي.`,
            R`object.`,
            R`نسخة من user والـ age اتغيرت، و user الأصلي لسه 20.`,
            R`فرد العناصر كـ arguments: [[Math.max(1, 2, 3)]] يعني 3.`,
            R`rest في الـ parameters: كل الـ arguments في array اسمها nums.`,
            R`rest في الـ destructuring: others بـ [[{ age: 20 }]].`
          ],
          sol: R`[[y]] ← [[[1, 2, 3]]] لأنها نفس الـ array (مرجع واحد). [[z]] ← [[[1, 2]]] لأنها نسخة اتعملت قبل الـ push.`,
          check: {
            lang: "js",
            starter: R`// addItem: رجّع array جديدة فيها العنصر في الآخر، من غير ما تغيّر الأصلية
// updateAge: رجّع object جديد بنفس الخانات والـ age الجديد، من غير ما تغيّر الأصلي
function addItem(cart, item) {
  cart.push(item);
  return cart;
}
function updateAge(user, age) {
  user.age = age;
  return user;
}`,
            tests: R`test("addItem(['a'], 'b') ← ['a', 'b']", () => expect(addItem(["a"], "b")).toEqual(["a", "b"]));
test("addItem مبتغيّرش الأصلية", () => { const c = ["a"]; addItem(c, "b"); expect(c).toEqual(["a"]); });
test("updateAge بيغيّر الـ age", () => expect(updateAge({ name: "Ali", age: 20 }, 21)).toEqual({ name: "Ali", age: 21 }));
test("updateAge مبتغيّرش الأصلي", () => { const u = { name: "Ali", age: 20 }; updateAge(u, 21); expect(u.age).toBe(20); });`,
            solution: R`function addItem(cart, item) {
  return [...cart, item];
}
function updateAge(user, age) {
  return { ...user, age };
}`
          }
        },
        {
          cmd: "obj.key  و  obj[key]",
          title: "النقطة . بتدخل جوه object وتجيب خانة أو تنادي method، والأقواس المربعة لما الاسم في متغير",
          desc: R`النقطة (dot) بين اسمين معناها «اللي جوه»: [[user.name]] خانة name جوه user. و [["ali".toUpperCase()]] نادي method على النص. و [[console.log]] دالة log جوه object اسمه console. والسلسلة [[a.b.c]] بتدخل خطوة خطوة.

[[obj.key]] بتدوّر على خانة اسمها حرفيًا key. لو الاسم في متغير لازم [[obj[key]]]. ولو الاسم فيه مسافة أو شرطة: [[headers["content-type"]]].

النقطة في كل اللغات تقريبًا بنفس المعنى (Python و Java و C# و Go و Kotlin). الاستثناءات: C و C++ بيستخدموا [[->]] مع المؤشرات، و PHP بيستخدم [[->]] للـ objects والنقطة عنده لدمج النصوص.`,
          example: R`const user = { name: "Ali", "last-name": "Hassan" };
console.log(user.name);
const field = "name";
console.log(user[field], user.field);
console.log(user["last-name"]);
console.log("hello".toUpperCase().split(""));`,
          flag: "script",
          try: R`في الـ Console: [[const k = "x"; const o = { x: 1, k: 2 };]] وبعدين [[o.k]] و [[o[k]]]. توقّع قبل ما تدوس Enter.`,
          deep: {
            why: R`كل حاجة في JS objects، فالنقطة في كل سطر. والفرق بين [[obj.key]] و [[obj[key]]] سبب bug مشهور: الكود بيدوّر على خانة اسمها حرفيًا key.`,
            how: R`[[obj.name]] اختصار لـ [[obj["name"]]]. الأقواس بتقيّم اللي جواها الأول. ولو الخانة مش موجودة بترجّع undefined، بس لو obj نفسه undefined بترمي TypeError (وهنا [[?.]] بتساعد).`,
            when: R`النقطة للأسماء الثابتة اللي انت عارفها. الأقواس للأسماء الديناميكية (من متغير أو loop) أو اللي فيها رموز.`,
            mistakes: R`[[user.field]] وانت قصدك [[user[field]]]. وتكتب [[user."last-name"]] SyntaxError. وتنسى إن الأرقام: [[5.toString()]] SyntaxError عشان النقطة اتفهمت كسر عشري، اكتبها [[(5).toString()]].`
          },
          teach: R`## الفكرة: النقطة = «اللي جوه»

[[user.name]] بتتقري «الخانة اللي اسمها name جوه user». و [[user["name"]]] نفس الحاجة بالظبط بشكل تاني. الفرق: بعد النقطة لازم تكتب الاسم **حرفيًا**، لكن جوه [[[ ]]] بتكتب **أي expression** بيطلّع الاسم (نص أو متغير). المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. object فيه اسم بشرطة

~~~javascript
const user = { name: "Ali", "last-name": "Hassan" };
~~~

- [[name]] اسم عادي، فمش محتاج تنصيص.
- [["last-name"]] فيه شرطة، والشرطة في JS معناها طرح، فلازم الاسم يتكتب كنص بين علامات تنصيص.

---

## ٢. النقطة

~~~javascript
console.log(user.name);
~~~

~~~text الناتج
Ali
~~~

ادخل جوه user وهات خانة name. وعلى فكرة [[console.log]] نفسها نقطة: دالة [[log]] جوه object اسمه [[console]].

---

## ٣. الاسم في متغير: [[user[field]]] ضد [[user.field]]

~~~javascript
const field = "name";
console.log(user[field], user.field);
~~~

~~~text الناتج
Ali undefined
~~~

- [[user[field]]]: JS بتقيّم اللي جوه الأقواس الأول: [[field]] متغير قيمته [["name"]]، فبقت [[user["name"]]]، يعني [[Ali]].
- [[user.field]]: بعد النقطة الاسم حرفي، فـ JS دوّرت على خانة اسمها [[field]] بالظبط، ومفيش، فـ [[undefined]]. ده bug مشهور جدًا.

---

## ٤. اسم فيه شرطة

~~~javascript
console.log(user["last-name"]);
~~~

~~~text الناتج
Hassan
~~~

الاسم ده مينفعش بالنقطة. لو جرّبت [[user.last-name]]، JS هتقراها [[user.last - name]] (طرح!):

~~~text الناتج
ReferenceError: name is not defined
~~~

دوّرت على متغير اسمه [[name]] عشان تطرحه ومش لاقياه. ولو كتبت [[user."last-name"]] هيطلع [[SyntaxError: Unexpected string]]: النقطة لازم بعدها اسم مش نص.

---

## ٥. سلسلة نقط

~~~javascript
console.log("hello".toUpperCase().split(""));
~~~

~~~text الناتج
[ 'H', 'E', 'L', 'L', 'O' ]
~~~

بتتنفذ من الشمال لليمين، وكل نقطة بتشتغل على ناتج اللي قبلها:

1. [["hello"]]: نص. حتى النصوص ليها methods.
2. [[.toUpperCase()]]: method بتكبّر الحروف، طلّعت [["HELLO"]].
3. [[.split("")]]: method بتقسّم النص لـ array. اللي جوه القوسين هو الفاصل، والنص الفاضي [[""]] معناه «قسّم عند كل حرف».

---

## ٦. الفخ: النقطة بعد رقم

~~~javascript
console.log(5.toString());
~~~

~~~text الناتج
SyntaxError: Invalid or unexpected token
~~~

JS شافت [[5.]] وفهمت إنها كسر عشري (زي 5.5)، فـ [[toString]] بقت غلط. حط الرقم بين أقواس: [[(5).toString()]] بيطلّع [["5"]].

---

## الخلاصة

| تكتب | JS بتدوّر على |
|---|---|
| [[obj.key]] | خانة اسمها حرفيًا key |
| [[obj["key"]]] | نفس اللي فوق |
| [[obj[key]]] | خانة اسمها **قيمة** المتغير key |
| [[obj["a-b"]]] | اسم فيه رموز أو مسافات |

والنقطة بنفس المعنى في Python و Java و C# و Go. الاستثناءات: C و C++ بيستخدموا [[->]] مع المؤشرات، و PHP بيستخدم [[->]] للـ objects والنقطة عنده بتلزّق نصوص.`,
          lines: [
            R`object فيه خانة اسمها فيه شرطة.`,
            R`النقطة: خانة name، فـ [[Ali]].`,
            R`اسم الخانة في متغير.`,
            R`[[user[field]]] بـ [[Ali]]، لكن [[user.field]] بـ [[undefined]] (دوّرت على خانة اسمها field).`,
            R`اسم فيه شرطة لازم أقواس ونص.`,
            R`سلسلة نقط: كبّر الحروف وبعدين قسّم: [[["H","E","L","L","O"]]].`
          ],
          sol: R`[[o.k]] ← [[2]] (خانة اسمها k). [[o[k]]] ← [[1]] (k متغير قيمته "x").`
        },
        {
          cmd: "; في آخر السطر",
          title: "الفاصلة المنقوطة ; في الكود: بتقفل الجملة في JS و C و Java، وفي JS بتتحط لوحدها ساعات",
          desc: R`في C و C++ و Java و C# و PHP و Rust، [[;]] إجبارية في آخر كل جملة، ونسيانها error. في Python و Go و Kotlin و Swift مش بتكتبها (Go بيحطها لوحده). في JS هي «اختيارية»: لو نسيتها JS بتحاول تحطها لوحدها (ASI).

المشكلة في JS في حالتين: [[return]] وبعدها سطر جديد، JS بتحط [[;]] بعد return فالدالة ترجّع undefined. وسطر بيبدأ بـ [[(]] أو [[[]] أو backtick، JS بتلزّقه في السطر اللي فوقه.

الحل: يا إما تحط [[;]] دايمًا، يا إما تستخدم Prettier ومتفكرش. وفي [[for (let i = 0; i < 5; i++)]] الـ [[;]] بتفصل الأجزاء التلاتة وإجبارية.`,
          example: R`let total = 10;
for (let i = 0; i < 3; i++) total += i;
function bad() {
  return
    { ok: true };
}
console.log(bad());`,
          flag: "script",
          try: R`انسخ دالة [[bad]] في الـ Console وشغّلها. بعدين اكتب [[{ ok: true }]] في نفس سطر الـ return وشغّلها تاني.`,
          deep: {
            why: R`في لغات زي Java و C أول error هتشوفه [[expected ';']]. وفي JS الـ bug بتاع [[return]] صامت ومحيّر.`,
            how: R`ASI (Automatic Semicolon Insertion) قواعد في JS: لما السطر الجديد ميكمّلش اللي قبله بشكل صحيح، أو بعد return و break و continue على طول، بتتحط [[;]]. لكن لو السطر الجديد ممكن يكمّل اللي قبله (زي [[(]])، مبتتحطش.`,
            when: R`اتبع style المشروع. أغلب المشاريع بتحطها، ومشاريع تانية (Standard style) لأ. المهم Prettier أو ESLint يظبطوها.`,
            mistakes: R`[[return]] لوحدها في سطر. و [[;]] بعد [[if (x);]] أو [[for (...);]] فالبلوك اللي بعدها يتنفذ مرة واحدة بغض النظر عن الشرط. و [[;]] بعد [[}]] بتاعة function عادي ملهاش لازمة بس مش غلط.`
          },
          teach: R`## الفكرة: [[;]] = نقطة آخر الجملة

الفاصلة المنقوطة (semicolon) بتقول «الجملة دي خلصت». في C و Java و C# و PHP نسيانها error. في JS لو نسيتها، JS بتحاول تحطها مكانك بقواعد اسمها **ASI** (Automatic Semicolon Insertion، يعني إضافة الـ semicolon أوتوماتيك)، والقواعد دي ساعات بتحطها في مكان انت مش قاصده. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. جملة عادية

~~~javascript
let total = 10;
~~~

متغير [[total]] قيمته 10، و [[;]] قفلت الجملة.

---

## ٢. [[;]] جوه [[for]]: إجبارية

~~~javascript
for (let i = 0; i < 3; i++) total += i;
console.log(total);
~~~

~~~text الناتج
13
~~~

جوه أقواس [[for]] فيه ٣ أجزاء، والـ [[;]] بتفصلهم:

| الجزء | معناه |
|---|---|
| [[let i = 0]] | البداية: عدّاد i بيبدأ من 0 (بيتنفذ مرة واحدة) |
| [[i < 3]] | الشرط: كمّل طول ما i أقل من 3 |
| [[i++]] | بعد كل لفة زوّد i واحد |

و [[total += i]] بتزوّد i على total في كل لفة: 10 + 0 + 1 + 2 = [[13]]. هنا مفيش اختيار: لو شيلت أي [[;]] من جوه الأقواس هيطلع SyntaxError.

---

## ٣. الفخ: [[return]] لوحدها في سطر

~~~javascript
function bad() {
  return
    { ok: true };
}
console.log(bad());
~~~

~~~text الناتج
undefined
~~~

من قواعد ASI: لو [[return]] جه بعدها سطر جديد على طول، JS بتحط [[;]] بعدها فورًا. فالدالة اتقريت كده:

~~~javascript
function bad() {
  return;
  { ok: true };
}
~~~

[[return;]] من غير قيمة بترجّع [[undefined]]، والسطر اللي بعدها مش بيتنفذ خالص. الحل: القيمة تبدأ في نفس سطر الـ return:

~~~javascript
function good() { return { ok: true }; }
console.log(good());
~~~

~~~text الناتج
{ ok: true }
~~~

---

## ٤. الفخ العكسي: سطر بيبدأ بـ [[(]]

هنا JS **مش** بتحط [[;]] وانت كنت محتاجها:

~~~javascript
const a = 1
const b = a
(function () { console.log("hi") })()
~~~

~~~text الناتج
TypeError: a is not a function
~~~

السطر التالت بيبدأ بـ [[(]]، والـ [[(]] ممكن تكمّل اللي قبلها (نداء دالة)، فـ JS قرت [[a(function () {...})]] يعني «نادي a»، و a رقم مش دالة. نفس الحكاية مع سطر بيبدأ بـ [[[]] أو backtick. حط [[;]] في آخر السطر التاني وهتشتغل.

---

## ٥. [[;]] في مكان غلط

~~~javascript
let n = 0;
for (let i = 0; i < 3; i++); n++;
console.log(n);
~~~

~~~text الناتج
1
~~~

الـ [[;]] بعد [[)]] بتاعة for خلّت الـ loop جسمها فاضي: لفّت ٣ مرات ومعملتش حاجة. و [[n++]] بقت جملة لوحدها اتنفذت مرة واحدة. نفس الغلطة مع [[if (x);]].

---

## الخلاصة

| اللغة | [[;]] |
|---|---|
| C و C++ و Java و C# و PHP و Rust | إجبارية في آخر كل جملة |
| JavaScript و TypeScript | اختيارية، و ASI بيحطها، بس فيه فخين |
| Python و Go و Kotlin و Swift | مش بتتكتب |

- متكسرش السطر بعد [[return]].
- لو مش بتحط [[;]]، خلّي بالك من السطر اللي بيبدأ بـ [[(]] أو [[[]] أو backtick.
- أسهل حل: Prettier يظبطها لوحده في كل المشروع.`,
          lines: [
            R`جملة عادية مقفولة بـ [[;]].`,
            R`جوه for الـ [[;]] بتفصل البداية والشرط والزيادة، وإجبارية.`,
            R`دالة.`,
            R`[[return]] لوحدها: JS حطت [[;]] بعدها فوراً.`,
            R`السطر ده مش هيتنفذ خالص.`,
            R`قفلة الدالة.`,
            R`هيطبع [[undefined]] مش [[{ ok: true }]].`
          ],
          sol: R`النسخة الأولى ← [[undefined]]. بعد ما تخلي [[return { ok: true };]] في سطر واحد ← [[{ ok: true }]].`
        },
        {
          cmd: "//  و  /* */",
          title: "التعليقات في الكود: // لآخر السطر، و /* */ لكذا سطر، و # في Python و bash",
          desc: R`التعليق كلام للبشر والكمبيوتر بيتجاهله. في JS و TS و C و C++ و Java و C# و Go و Kotlin و Swift و PHP: [[//]] بتعلّق لآخر السطر، و [[/* ... */]] بتعلّق كل اللي بينهم ولو كذا سطر. و [[/** ... */]] (بنجمتين) اسمها JSDoc أو Javadoc، والمحرر بيعرضها لما تقف على الدالة.

في Python و bash و YAML و Ruby: [[#]]. في SQL: [[--]] و [[/* */]]. في HTML: [[<!-- -->]]. في CSS: [[/* */]] بس، [[//]] مش تعليق في CSS.

الاختصار في VS Code: [[Ctrl+/]] بيعلّق السطر أو يشيل التعليق بالرمز الصح للغة.`,
          example: R`// تعليق سطر واحد
const price = 100; // السعر بالجنيه
/* تعليق
   كذا سطر */
/** بترجّع السعر بعد الخصم */
function discount(p) { return p * 0.9; }`,
          flag: "script",
          try: R`افتح أي ملف JS في VS Code، وحدد ٣ سطور ودوس [[Ctrl+/]]، وبعدين دوسه تاني. وجرّب نفس الحاجة في ملف py و css وشوف الرمز اللي بيتحط.`,
          deep: {
            why: R`عشان تشرح «ليه» مش «إيه»، وعشان تعطّل كود مؤقتًا وانت بتدوّر على bug.`,
            how: R`الـ parser بيشيل التعليقات قبل ما يفهم الكود. [[/* */]] مش بتتداخل: أول [[*/]] بتقفل، فـ [[/* a /* b */ c */]] بتسيب [[c */]] برة وتطلع error.`,
            when: R`فوق أي كود مش واضح أو فيه قرار غريب. و JSDoc فوق الدوال اللي غيرك هيستخدمها.`,
            mistakes: R`[[//]] في CSS أو JSON: الاتنين مبيدعموش التعليقات دي (JSON مفيهوش تعليقات خالص). و [[#]] في JS: مش تعليق (دي private field). وتعليق بيشرح الواضح [[i++ // زوّد i]].`
          },
          teach: R`## الفكرة: كلام للبشر، والكمبيوتر بيتخطّاه

التعليق (comment) كلام بتكتبه جوه الكود عشان تشرح، والـ parser (الجزء اللي بيقرا الكود) بيشيله قبل ما ينفّذ. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز، وضفنا في الآخر [[console.log(discount(price));]] عشان نشوف إن الكود الحقيقي بس اللي اشتغل:

~~~text الناتج
90
~~~

---

## ١. [[//]] لآخر السطر

~~~javascript
// تعليق سطر واحد
const price = 100; // السعر بالجنيه
~~~

- السطر الأول كله تعليق: من [[//]] لحد آخر السطر.
- السطر التاني: [[const price = 100;]] كود حقيقي بيتنفذ، وبعده [[//]] فكل اللي بعدها لحد آخر السطر تعليق. ده مكان مشهور للتعليق: جنب السطر اللي بيشرحه.

---

## ٢. [[/* */]] لكذا سطر

~~~javascript
/* تعليق
   كذا سطر */
~~~

[[/*]] بتفتح التعليق، وكل اللي بعدها تعليق مهما كان عدد السطور، لحد أول [[*/]] تقفله.

### مش بتتداخل

~~~javascript
/* a /* b */ c */
~~~

~~~text الناتج
SyntaxError: Invalid regular expression: missing /
~~~

أول [[*/]] قفلت التعليق، فـ [[c */]] بقى برة. و JS حاولت تقرا الـ [[/]] اللي في الآخر كبداية regular expression (نمط بحث، ليه درس في «JSON و Regex») ومش لاقية قفلته. يعني [[/* */]] جوه [[/* */]] مش هتنفع.

---

## ٣. [[/** */]]: تعليق توثيق

~~~javascript
/** بترجّع السعر بعد الخصم */
function discount(p) { return p * 0.9; }
~~~

- [[/**]] بنجمتين: لسه تعليق عادي من ناحية JS، بس المحررات زي VS Code بتفهم إنه **وصف للدالة اللي تحته** (اسمه JSDoc). لما تقف بالماوس على [[discount]] في أي حتة هيظهرلك الكلام ده.
- [[function discount(p) { return p * 0.9; }]]: الدالة الحقيقية: بترجّع 90٪ من السعر. [[discount(100)]] بـ [[90]].

---

## ٤. الرمز حسب اللغة

| اللغة | سطر واحد | كذا سطر |
|---|---|---|
| JS و TS و C و C++ و Java و C# و Go و Kotlin و Swift و PHP | [[//]] | [[/* */]] |
| Python و bash و YAML و Ruby | [[#]] | (مفيش، كل سطر [[#]]) |
| SQL | [[--]] | [[/* */]] |
| HTML | | [[<!-- -->]] |
| CSS | | [[/* */]] بس |
| JSON | مفيش تعليقات خالص | |

في Python:

~~~python
# comment
print("ok")  # inline
~~~

~~~text الناتج (Python 3.14)
ok
~~~

و JSON ملوش تعليقات، فلو حطيت [[//]] جوه ملف JSON، [[JSON.parse]] بيرفضه:

~~~text الناتج
SyntaxError: Expected ',' or '}' after property value in JSON at position 8 (line 1 column 9)
~~~

> و [[#]] في JS **مش** تعليق: ده private field في الكلاسات (ليه درس في «رموز TypeScript والأسماء»).

---

## ٥. الاختصار

في VS Code حدد السطور ودوس [[Ctrl+/]]: بيحط رمز التعليق الصح للغة الملف، ودوسة تانية بتشيله.

---

## الخلاصة

- [[//]] من هنا لآخر السطر. [[/* */]] من الفتحة لأول قفلة، ومش بتتداخل.
- [[/** */]] فوق الدالة: وصف بيظهر في المحرر.
- اكتب في التعليق **ليه** عملت كده، مش **إيه** اللي الكود بيعمله (ده باين من الكود).`,
          lines: [
            R`جملة عادية وبعدها تعليق [[//]] في نفس السطر.`,
            R`بداية تعليق [[/*]]: كل اللي بعدها تعليق لحد ما تلاقي [[*/]].`,
            R`لسه جوه التعليق، و [[*/]] بتقفله.`,
            R`[[/**]] بنجمتين: تعليق JSDoc بيوصف الدالة اللي تحته، والمحرر بيعرضه لما تقف عليها.`,
            R`الدالة نفسها، وده الكود الوحيد اللي بيتنفذ هنا غير السطر الأول.`
          ],
          sol: R`أول [[Ctrl+/]] بيحط [[//]] قدام كل سطر في JS، وتاني مرة بيشيلها. في Python بيحط [[#]]، وفي CSS بيحط [[/* */]] حوالين كل سطر.`
        }
      ]
    }
]);

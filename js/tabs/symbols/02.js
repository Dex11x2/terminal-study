// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "رموز المنطق",
      l: 2,
      n: "! و && و || و ?? و ?. و ? : : إزاي تكتب شروط وقيم افتراضية من غير if طويلة",
      items: [
        {
          cmd: "!x  و  !!x",
          title: "علامة التعجب ! بتعكس (not)، و !! بتحوّل أي قيمة لـ true أو false",
          desc: R`[[!]] (not) بتقلب: [[!true]] بـ false. ولو حطيتها قبل أي قيمة مش boolean بتحوّلها الأول: القيم «الفاضية» (falsy) بتبقى true والباقي false.

القيم الـ falsy في JS ستة بس تقريبًا: [[false]] و [[0]] و [[""]] و [[null]] و [[undefined]] و [[NaN]]. أي حاجة تانية truthy، حتى [["0"]] و [[[]]] و [[{}]].

[[!!x]] يعني «اقلب مرتين»: النتيجة boolean حقيقي بيقول x فيها حاجة ولا لأ. في Python المقابل [[not x]] و [[bool(x)]]، وهناك [[[]]] و [[{}]] falsy عكس JS.`,
          example: R`const name = "";
console.log(!name);
console.log(!!"Ali", !!"0", !![], !!0);
if (!user) console.log("مفيش يوزر");
const isLoggedIn = !!token;`,
          flag: "script",
          try: R`في الـ Console جرّب [[!!" "]] (مسافة) و [[!!""]] و [[!!null]] و [[!!{}]]، وقبل ما تدوس Enter توقّع كل واحدة.`,
          deep: {
            why: R`[[if (!x)]] أقصر وأشهر طريقة تقول «لو مفيش». و [[!!]] بتحتاجها لما دالة لازم ترجّع true/false بالظبط مش القيمة نفسها.`,
            how: R`JS بتحوّل القيمة لـ boolean بقواعد ثابتة (ToBoolean) لما تقابل [[!]] أو if أو [[&&]] أو [[||]]. [[!]] بتحوّل وتقلب، والتانية بتقلب تاني فترجع للمعنى الأصلي بس كـ boolean.`,
            when: R`[[!]] في الشروط. و [[!!]] لما تخزّن أو ترجّع flag: [[isAdmin: !!user.role]].`,
            mistakes: R`تستخدم [[!count]] عشان تعرف «مفيش count» والقيمة ممكن تبقى 0 صحيحة: 0 falsy فهيتعامل كأنه مش موجود. استخدم [[count === undefined]] أو [[??]]. وتفتكر [[[]]] falsy زي Python.`
          },
          teach: R`## الفكرة: [[!]] بتسأل «القيمة دي فاضية؟»

[[!]] اسمها **not**. بتاخد أي قيمة، تحوّلها لـ [[true]] أو [[false]]، وبعدين تقلبها. والمثال JavaScript، وشغّلناه بـ Node 24 على ويندوز (ونفس النتايج في Console المتصفح).

---

## ١. [[!name]] مع نص فاضي

~~~javascript
const name = "";
console.log(!name);
~~~

~~~text الناتج
true
~~~

- [[const name = "";]] متغير ثابت فيه نص فاضي (علامتين تنصيص ورا بعض من غير حاجة بينهم).
- [[!name]] بتعمل خطوتين:
  1. تحوّل [[""]] لـ boolean: النص الفاضي **falsy** (بيتحسب false)، فبقى [[false]].
  2. تقلبه: [[false]] بقى [[true]].

يعني [[!name]] بتتقري «name فاضي؟» والجواب أيوه.

### القيم الـ falsy

دي القيم اللي JS بتعتبرها false لما تتحوّل، وأي حاجة غيرها **truthy**:

| القيمة | معناها |
|---|---|
| [[false]] | false نفسها |
| [[0]] | صفر (و [[-0]] كمان) |
| [[""]] | نص فاضي |
| [[null]] | «مفيش قيمة» بقصد |
| [[undefined]] | «لسه محدش حط قيمة» |
| [[NaN]] | Not a Number: ناتج حساب فاشل زي [[Number("abc")]] |

---

## ٢. [[!!]]: اقلب مرتين

~~~javascript
console.log(!!"Ali", !!"0", !![], !!0);
~~~

~~~text الناتج
true true true false
~~~

[[!!x]] يعني [[!(!x)]]: أول [[!]] بتحوّل وتقلب، والتانية بتقلب تاني فترجع للمعنى الأصلي، بس النتيجة بقت boolean حقيقي. نمشي عليهم واحد واحد:

| القيمة | [[!x]] | [[!!x]] | ليه |
|---|---|---|---|
| [["Ali"]] | [[false]] | [[true]] | نص فيه حروف |
| [["0"]] | [[false]] | [[true]] | ده **نص** فيه حرف «0»، مش الرقم صفر |
| [[[]]] | [[false]] | [[true]] | array فاضية، بس هي object، وكل object truthy |
| [[0]] | [[true]] | [[false]] | الرقم صفر falsy |

ولو عايز تتأكد إن الناتج boolean مش القيمة نفسها، [[typeof]] بيقولك نوع أي قيمة:

~~~javascript
const token = "abc";
console.log(typeof !!token, typeof token);
~~~

~~~text الناتج
boolean string
~~~

---

## ٣. [[if (!user)]]

~~~javascript
let user = null;
if (!user) console.log("مفيش يوزر");
~~~

~~~text الناتج
مفيش يوزر
~~~

[[user]] بـ [[null]] (falsy)، فـ [[!user]] بـ [[true]]، فالـ if نفّذت السطر. و [[if (...) أمر]] من غير [[{ }]] معناها نفّذ الأمر ده بس لو الشرط صح.

> في المثال الأصلي [[user]] مش متعرّف، فلو نسخته زي ما هو هيطلع [[ReferenceError: user is not defined]]. عرّفه الأول زي ما عملنا ([[let user = null;]]). [[!]] بتحمي من القيمة الفاضية، مش من متغير مش موجود خالص.

---

## ٤. [[const isLoggedIn = !!token;]]

~~~javascript
const token = "abc";
const isLoggedIn = !!token;
console.log(isLoggedIn);
~~~

~~~text الناتج
true
~~~

ليه مش [[const isLoggedIn = token]] وخلاص؟ لأن كده [[isLoggedIn]] هيبقى فيه النص [["abc"]] نفسه، والاسم بيقول إنه نعم أو لأ. [[!!]] بتحوّله لـ [[true]] (أو [[false]] لو token فاضي)، فالمتغير بيبقى boolean نضيف تقدر تخزّنه أو ترجّعه من دالة.

---

## ٥. الفخ: الصفر

~~~javascript
let count = 0;
if (!count) console.log("count falsy");
~~~

~~~text الناتج
count falsy
~~~

لو [[count]] عدد حاجات والصفر قيمة صحيحة، [[!count]] هتعامله كأنه مش موجود. هنا الأحسن تسأل سؤال محدد: [[count === undefined]].

---

## ٦. نفس الفكرة في Python

~~~python
print(not "", bool("Ali"), bool("0"), bool([]), bool({}), bool(0))
~~~

~~~text الناتج (Python 3.14)
True True True False False False
~~~

[[not]] هي [[!]]، و [[bool(x)]] هي [[!!x]]. الفرق المهم: في Python الـ list الفاضية [[[]]] والـ dict الفاضي [[{}]] **falsy**، وفي JS truthy.

---

## الخلاصة

| تكتب | بيرجّع | استخدمه لما |
|---|---|---|
| [[!x]] | boolean عكس x | شرط «لو مفيش» |
| [[!!x]] | boolean بنفس معنى x | تخزّن أو ترجّع true/false |

- الـ falsy ستة: [[false]] و [[0]] و [[""]] و [[null]] و [[undefined]] و [[NaN]]. أي حاجة تانية truthy، حتى [["0"]] و [[[]]] و [[{}]].
- الصفر falsy، فمتستخدمش [[!]] مع رقم ممكن يبقى صفر بقصد.`,
          lines: [
            R`نص فاضي.`,
            R`[[!""]]: النص الفاضي falsy، فالعكس [[true]].`,
            R`[[true true true false]]: حتى [["0"]] والـ array الفاضي truthy.`,
            R`لو user فاضي أو null أو undefined.`,
            R`boolean حقيقي: فيه token ولا لأ.`
          ],
          sol: R`[[!!" "]] ← [[true]] (المسافة حرف). [[!!""]] ← [[false]]. [[!!null]] ← [[false]]. [[!!{}]] ← [[true]].`,
          check: {
            lang: "js",
            starter: R`// رجّع true لو فيه كلام حقيقي (مش فاضي ومش مسافات بس)، وغير كده false
// لازم ترجّع boolean مش النص نفسه
function hasText(s) {
  return s;
}`,
            tests: R`test("hasText('Ali') ← true", () => expect(hasText("Ali")).toBe(true));
test("hasText('') ← false", () => expect(hasText("")).toBe(false));
test("hasText('   ') ← false (مسافات بس)", () => expect(hasText("   ")).toBe(false));
test("hasText(undefined) ← false", () => expect(hasText(undefined)).toBe(false));
test("hasText(null) ← false", () => expect(hasText(null)).toBe(false));`,
            solution: R`function hasText(s) {
  return !!s && s.trim() !== "";
}`
          }
        },
        {
          cmd: "a && b  و  a || b",
          title: "&& و || في الكود: «و» و «أو»، وكمان بيرجّعوا قيمة: || لقيمة احتياطي، و && لشرط قبل التنفيذ",
          desc: R`[[a && b]] true لو الاتنين true. [[a || b]] true لو واحد على الأقل. ده المعنى المنطقي اللي في كل اللغات. وفي Python بالكلام: [[and]] و [[or]] و [[not]].

بس في JS (و Python) الرمزين بيرجّعوا واحدة من القيمتين نفسها مش true/false. [[||]] بترجّع أول قيمة truthy، فـ [[name || "ضيف"]] بتدي ضيف لو name فاضي. و [[&&]] بترجّع أول قيمة falsy أو آخر قيمة، فـ [[user && user.name]] مش هتوقع لو user فاضي.

وبيعملوا short-circuit: لو الطرف الشمال حسم النتيجة، اليمين مش بيتنفذ خالص. عشان كده [[isAdmin && deleteAll()]] الدالة مش هتشتغل غير لو admin. وفي React بتشوف [[{loading && <Spinner />}]].`,
          example: R`console.log(true && false, true || false);
const name = "";
console.log(name || "ضيف");
console.log(0 || 10, "" && "x");
if (age >= 18 && hasId) console.log("ادخل");
user && console.log(user.name);`,
          flag: "script",
          try: R`في الـ Console جرّب [[null || "a" || "b"]] و [["x" && 0 && "y"]] و [[0 || ""]]. بعدين حل التمرين.`,
          deep: {
            why: R`أي شرط فيه أكتر من حاجة محتاجهم. والقيمة الاحتياطية بـ [[||]] منتشرة جدًا في كود قديم، فلازم تفهم ليه ساعات بتغلط مع 0.`,
            how: R`JS بتقيّم الشمال الأول. [[||]]: لو truthy رجّعه ووقف، غير كده رجّع اليمين. [[&&]]: لو falsy رجّعه ووقف، غير كده رجّع اليمين. والأولوية: [[&&]] قبل [[||]]، فـ [[a || b && c]] هي [[a || (b && c)]].`,
            when: R`[[&&]] و [[||]] في الشروط. [[||]] لقيمة احتياطي لما الـ 0 والنص الفاضي مش قيم مقبولة. لو مقبولة، استخدم [[??]].`,
            mistakes: R`[[port || 3000]] والـ port صفر أو [[count || 10]] والعدد صفر: هيتبدل غصب عنك. وتكتب [[&]] أو [[|]] واحدة: دي bitwise ومبتعملش short-circuit. وتخلط الأولوية من غير أقواس.`
          },
          teach: R`## الفكرة: «و» و «أو»، وبيرجّعوا قيمة

[[&&]] بتتقري **and** (و)، و [[||]] بتتقري **or** (أو). الزرار [[|]] اسمه pipe، وعلى أغلب الكيبوردات بيطلع بـ Shift مع [[\]]. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. المعنى المنطقي

~~~javascript
console.log(true && false, true || false);
~~~

~~~text الناتج
false true
~~~

| a | b | [[a && b]] | [[a || b]] |
|---|---|---|---|
| [[true]] | [[true]] | [[true]] | [[true]] |
| [[true]] | [[false]] | [[false]] | [[true]] |
| [[false]] | [[true]] | [[false]] | [[true]] |
| [[false]] | [[false]] | [[false]] | [[false]] |

[[&&]] محتاجة الاتنين صح، و [[||]] كفاية واحد.

---

## ٢. [[||]] بترجّع أول قيمة truthy

~~~javascript
const name = "";
console.log(name || "ضيف");
~~~

~~~text الناتج
ضيف
~~~

[[||]] مش بترجّع [[true]]، بترجّع **واحدة من القيمتين نفسها**:

1. بتبص على الشمال [[name]]: نص فاضي، falsy (بيتحسب false).
2. الشمال falsy، فبترجّع اليمين زي ما هو: [["ضيف"]].

ولو [[name]] كان [["Ali"]] كانت هترجّع [["Ali"]] ومتبصّش على اليمين خالص. عشان كده [[x || قيمة]] طريقة مشهورة لقيمة احتياطي.

---

## ٣. [[&&]] بترجّع أول قيمة falsy أو آخر قيمة

~~~javascript
console.log(0 || 10, "" && "x");
~~~

~~~text الناتج
10 
~~~

- [[0 || 10]]: الصفر falsy، فرجّعت اليمين [[10]].
- [["" && "x"]]: [[&&]] بتقف عند أول falsy وترجّعه. الشمال [[""]] falsy، فرجّعته هو. عشان كده بعد الـ 10 مفيش حاجة ظاهرة: اتطبع نص فاضي. لو عايز تشوفه: [[JSON.stringify("" && "x")]] بيطبع [[""]].

| الرمز | بيقف عند | لو موقفش |
|---|---|---|
| [[||]] | أول truthy | بيرجّع آخر قيمة |
| [[&&]] | أول falsy | بيرجّع آخر قيمة |

---

## ٤. شرطين في if

~~~javascript
let age = 20, hasId = true;
if (age >= 18 && hasId) console.log("ادخل");
~~~

~~~text الناتج
ادخل
~~~

- [[let age = 20, hasId = true;]] متغيرين في سطر واحد، والفاصلة بتفصلهم.
- [[age >= 18]] بـ [[true]]، و [[hasId]] بـ [[true]]، فالـ [[&&]] بـ [[true]] والسطر اتنفذ.

> المثال الأصلي مش معرّف فيه [[age]] و [[hasId]] ولا [[user]]، فعرّفهم الأول وإلا هيطلع [[ReferenceError]].

---

## ٥. short-circuit: [[user && console.log(user.name)]]

~~~javascript
let user = { name: "Ali" };
user && console.log(user.name);
user = null;
user && console.log(user.name);
~~~

~~~text الناتج
Ali
~~~

- أول مرة [[user]] object (truthy)، فـ [[&&]] كمّلت لليمين ونفّذته: اتطبع [[Ali]].
- تاني مرة [[user]] بـ [[null]] (falsy)، فـ [[&&]] وقفت عند الشمال، واليمين **متنفذش أصلًا**. عشان كده مفيش [[TypeError]] من [[user.name]] ومفيش سطر تاني في الناتج.

ده اسمه **short-circuit**: لو الشمال حسم النتيجة، اليمين مش بيتقري. ونفس الحكاية في [[||]]:

~~~javascript
function boom() { console.log("ran"); return 1; }
false && boom();
true || boom();
~~~

السطرين دول مطبعوش حاجة: [[boom]] متنادتش ولا مرة.

---

## ٦. الأولوية: [[&&]] قبل [[||]]

~~~javascript
console.log(true || false && false, (true || false) && false);
~~~

~~~text الناتج
true false
~~~

الأولى اتحسبت [[true || (false && false)]] يعني [[true]]. والتانية بالأقواس اتحسب [[||]] الأول فبقت [[true && false]] يعني [[false]]. لو بتخلطهم، حط أقواس.

---

## ٧. في Python بالكلام

~~~python
name = ""
print(name or "ضيف")
print(0 or 10, repr("" and "x"))
~~~

~~~text الناتج (Python 3.14)
ضيف
10 ''
~~~

[[or]] و [[and]] بنفس السلوك بالظبط: بيرجّعوا قيمة من الاتنين. و [[repr]] بتطبع النص بعلامات التنصيص عشان تشوف إنه فاضي.

---

## الخلاصة

- [[a && b]]: لو a falsy رجّعها ووقف، غير كده رجّع b.
- [[a || b]]: لو a truthy رجّعها ووقف، غير كده رجّع b.
- [[x || "احتياطي"]] بتبدّل الـ 0 والنص الفاضي كمان. لو دول قيم مقبولة، استخدم [[??]] (الدرس اللي بعده).
- [[&]] و [[|]] واحدة حاجة تانية خالص (bits)، ومبتعملش short-circuit.`,
          lines: [
            R`المعنى المنطقي: [[false true]].`,
            R`نص فاضي.`,
            R`[[||]] رجّعت أول قيمة truthy: [[ضيف]].`,
            R`[[0 || 10]] بـ 10، و [["" && "x"]] بـ [[""]] (وقفت عند أول falsy).`,
            R`شرطين لازم الاتنين يتحققوا.`,
            R`short-circuit: لو user فاضي، اليمين مش بيتنفذ ومفيش error.`
          ],
          sol: R`[[null || "a" || "b"]] ← [["a"]]. [["x" && 0 && "y"]] ← [[0]]. [[0 || ""]] ← [[""]] (مفيش truthy فرجّع آخر واحدة).`,
          check: {
            lang: "js",
            starter: R`// رجّع "أهلًا " والاسم، ولو الاسم فاضي أو مش موجود استخدم "ضيف"
function greet(name) {
  return "أهلًا " + name;
}`,
            tests: R`test("greet('Sara') ← أهلًا Sara", () => expect(greet("Sara")).toBe("أهلًا Sara"));
test("greet('') ← أهلًا ضيف", () => expect(greet("")).toBe("أهلًا ضيف"));
test("greet() ← أهلًا ضيف", () => expect(greet()).toBe("أهلًا ضيف"));
test("greet(null) ← أهلًا ضيف", () => expect(greet(null)).toBe("أهلًا ضيف"));`,
            solution: R`function greet(name) {
  return "أهلًا " + (name || "ضيف");
}`
          }
        },
        {
          cmd: "??  و  ??=",
          title: "علامتين استفهام ?? : قيمة احتياطي لو null أو undefined بس، والـ 0 والنص الفاضي بيفضلوا",
          desc: R`[[a ?? b]] (nullish coalescing) بترجّع [[a]] إلا لو كانت [[null]] أو [[undefined]]، ساعتها بترجّع [[b]]. الفرق عن [[||]]: الـ [[0]] و [[""]] و [[false]] قيم حقيقية بتفضل زي ما هي.

فـ [[volume || 50]] لو volume كانت 0 هتبقى 50 (غلط)، لكن [[volume ?? 50]] هتفضل 0 (صح).

و [[x ??= 5]] معناها «لو x فاضية (null أو undefined) حط فيها 5». وفي C# و PHP و Dart و Swift نفس الرمز [[??]] بنفس المعنى. وفي Kotlin المقابل [[?:]].`,
          example: R`const settings = { volume: 0, theme: null };
console.log(settings.volume || 50);
console.log(settings.volume ?? 50);
console.log(settings.theme ?? "light");
settings.lang ??= "ar";`,
          flag: "script",
          try: R`قارن في الـ Console [[0 || 5]] و [[0 ?? 5]] و [["" ?? "x"]] و [[undefined ?? "x"]]. وبعدين حل التمرين.`,
          deep: {
            why: R`الإعدادات والـ API responses مليانة قيم ممكن تبقى 0 أو false بشكل مقصود. [[??]] اتعملت مخصوص عشان تصلّح مشكلة [[||]] دي.`,
            how: R`بتبص على الشمال: لو [[null]] أو [[undefined]] تقيّم اليمين وترجّعه، غير كده ترجّع الشمال واليمين مش بيتنفذ. ومينفعش تخلطها مع [[||]] أو [[&&]] من غير أقواس، JS بترمي [[SyntaxError]].`,
            when: R`قيم افتراضية لأي إعداد أو رقم أو boolean ممكن يبقى 0 أو false. ومع [[?.]]: [[user?.name ?? "مجهول"]].`,
            mistakes: R`تكتب [[a || b ?? c]] من غير أقواس فيطلع SyntaxError. وتستخدم [[||]] مع أرقام ممكن تبقى 0. وتفتكر [[??]] بتمسك النص الفاضي: لأ، [[""]] مش nullish.`
          },
          teach: R`## الفكرة: احتياطي لـ «مفيش قيمة» بس

[[a ?? b]] بتتقري «a، ولو مفيش a خد b». واسمها **nullish coalescing**: nullish يعني [[null]] أو [[undefined]]، و coalescing يعني «خد أول واحدة موجودة». المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. الإعدادات

~~~javascript
const settings = { volume: 0, theme: null };
~~~

object فيه خانتين: [[volume]] صفر (اليوزر كتم الصوت بقصد)، و [[theme]] بـ [[null]] (لسه مختارش).

---

## ٢. [[||]] بتبوّظ الصفر

~~~javascript
console.log(settings.volume || 50);
~~~

~~~text الناتج
50
~~~

[[settings.volume]] بـ [[0]]، والصفر falsy، فـ [[||]] رجّعت اليمين. اليوزر كان كاتم الصوت ودلوقتي بقى 50. ده الـ bug اللي [[??]] اتعملت عشانه.

---

## ٣. [[??]] بتسيب الصفر

~~~javascript
console.log(settings.volume ?? 50);
~~~

~~~text الناتج
0
~~~

[[??]] بتسأل سؤال واحد: الشمال [[null]] أو [[undefined]]؟ الصفر مش الاتنين، فرجّعته زي ما هو.

---

## ٤. [[??]] مع [[null]]

~~~javascript
console.log(settings.theme ?? "light");
~~~

~~~text الناتج
light
~~~

[[theme]] بـ [[null]] فعلًا، فرجّعت اليمين [["light"]].

### الفرق في جدول

~~~javascript
console.log(0 || 5, 0 ?? 5, JSON.stringify("" ?? "x"), undefined ?? "x", false ?? true);
~~~

~~~text الناتج
5 0 "" x false
~~~

| الشمال | [[|| "احتياطي"]] | [[?? "احتياطي"]] |
|---|---|---|
| [[0]] | احتياطي | [[0]] |
| [[""]] | احتياطي | [[""]] |
| [[false]] | احتياطي | [[false]] |
| [[null]] | احتياطي | احتياطي |
| [[undefined]] | احتياطي | احتياطي |

و [[JSON.stringify]] هنا عشان النص الفاضي يبان بعلامات التنصيص بدل ما يطلع فراغ.

---

## ٥. [[??=]]: حط قيمة لو الخانة فاضية

~~~javascript
settings.lang ??= "ar";
console.log(settings);
settings.lang ??= "en";
console.log(settings.lang);
~~~

~~~text الناتج
{ volume: 0, theme: null, lang: 'ar' }
ar
~~~

- [[settings.lang]] مش موجودة أصلًا، يعني قيمتها [[undefined]]، فـ [[??=]] حطت [["ar"]].
- تاني مرة [[lang]] فيها [["ar"]]، فـ [[??=]] مكتبتش حاجة و [["en"]] اتجاهلت.

[[x ??= v]] هي اختصار [[x ?? (x = v)]]: الكتابة بتحصل بس لو x فاضية.

---

## ٦. مينفعش تخلطها مع [[||]] من غير أقواس

~~~javascript
const a = null || 1 ?? 2;
~~~

~~~text الناتج
SyntaxError: Unexpected token '??'
~~~

JS بترفض الخلط عشان مش واضح انت قصدك إيه. حط أقواس: [[(null || 1) ?? 2]] بيرجّع [[1]].

---

## الخلاصة

- [[??]] بتبدّل [[null]] و [[undefined]] بس. الـ [[0]] و [[""]] و [[false]] بيفضلوا.
- [[||]] بتبدّل أي falsy. استخدمها بس لو الصفر والنص الفاضي مش قيم مقبولة.
- [[??=]] بتكتب في المتغير بس لو كان فاضي.
- نفس [[??]] في C# و PHP و Dart و Swift، وفي Kotlin اسمها [[?:]].`,
          lines: [
            R`إعدادات فيها volume صفر (مقصود) و theme فاضي.`,
            R`[[||]] شالت الـ 0 وحطت 50: غلط.`,
            R`[[??]] سابت الـ 0 لأنه مش null: صح.`,
            R`theme بـ null، فطلع [[light]].`,
            R`lang مش موجودة، فـ [[??=]] حطت فيها [["ar"]].`
          ],
          sol: R`[[0 || 5]] ← [[5]]. [[0 ?? 5]] ← [[0]]. [["" ?? "x"]] ← [[""]]. [[undefined ?? "x"]] ← [["x"]].`,
          check: {
            lang: "js",
            starter: R`// رجّع الـ volume من الإعدادات، ولو مش موجود (null أو undefined) رجّع 50
// خد بالك: 0 قيمة صحيحة (صامت)
function getVolume(settings) {
  return settings.volume || 50;
}`,
            tests: R`test("volume 80 ← 80", () => expect(getVolume({ volume: 80 })).toBe(80));
test("volume 0 ← 0 مش 50", () => expect(getVolume({ volume: 0 })).toBe(0));
test("من غير volume ← 50", () => expect(getVolume({})).toBe(50));
test("volume null ← 50", () => expect(getVolume({ volume: null })).toBe(50));`,
            solution: R`function getVolume(settings) {
  return settings.volume ?? 50;
}`
          }
        },
        {
          cmd: "?.",
          title: "علامة استفهام ونقطة ?. : ادخل جوه الـ object لو موجود، ولو مش موجود رجّع undefined من غير error",
          desc: R`[[user.address.city]] لو [[address]] مش موجودة بترمي [[TypeError: Cannot read properties of undefined]] والبرنامج يقع. [[user?.address?.city]] (optional chaining) بتقول «لو اللي قبلي null أو undefined، وقف ورجّع undefined».

بتشتغل مع الـ properties ([[a?.b]]) والـ arrays ([[arr?.[0]]]) والدوال ([[obj.save?.()]]: نادي save بس لو موجودة).

غالبًا بتيجي مع [[??]]: [[user?.name ?? "مجهول"]]. وفي Kotlin و Swift و C# و Dart نفس الرمز [[?.]] بنفس الفكرة.`,
          example: R`const user = { name: "Ali", address: null };
console.log(user.address?.city);
console.log(user.address?.city ?? "غير معروف");
console.log(user.orders?.[0]);
user.onLogin?.();`,
          flag: "script",
          try: R`في الـ Console اعمل [[const u = {}]] وجرّب [[u.a.b]] واقرا الـ error، بعدين [[u.a?.b]] و [[u.a?.b.c.d]].`,
          deep: {
            why: R`الداتا اللي جاية من API أو من form ناقصة كتير. من غير [[?.]] كنت محتاج [[user && user.address && user.address.city]].`,
            how: R`لو الجزء اللي قبل [[?.]] null أو undefined، الـ expression كله من هنا للآخر بيقف ويرجّع undefined (short-circuit). فـ [[u.a?.b.c.d]] مش بتقع رغم إن بعد [[?.]] فيه نقط عادية.`,
            when: R`مع أي داتا جاية من برة ومش مضمونة. لكن متحطهاش في كل حتة: لو الحاجة لازم تبقى موجودة، خلّي الكود يقع بوضوح أحسن من إنه يكمّل بـ undefined.`,
            mistakes: R`تكتب [[arr?[0]]] من غير نقطة، الصح [[arr?.[0]]]. وتستخدمها على الشمال في assignment: [[user?.name = "x"]] SyntaxError. وتحطها في كل مكان فتخبّي bugs.`
          },
          teach: R`## الفكرة: «ادخل لو الباب مفتوح»

النقطة العادية [[a.b]] بتدخل جوه [[a]] وتجيب [[b]]، ولو [[a]] نفسها [[null]] أو [[undefined]] البرنامج بيقع. [[?.]] (اسمها **optional chaining**، يعني سلسلة اختيارية) بتسأل الأول: اللي قبلي موجود؟ لو لأ، بترجّع [[undefined]] وتقف. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. من غير [[?.]]: البرنامج بيقع

~~~javascript
const user = { name: "Ali", address: null };
console.log(user.address.city);
~~~

~~~text الناتج
TypeError: Cannot read properties of null (reading 'city')
~~~

- [[address: null]] يعني الخانة موجودة بس فاضية.
- [[user.address]] بـ [[null]]، و [[.city]] بتحاول تدخل جوه [[null]]، ومفيش «جوه». فـ JS رمت **TypeError** (غلطة في نوع القيمة). الرسالة بتقول: مقدرتش أقرا خانات من null (وأنا بقرا [['city']]). لو الخانة مش موجودة خالص الرسالة بتقول [[of undefined]] بدل [[of null]].

---

## ٢. [[user.address?.city]]

~~~javascript
console.log(user.address?.city);
~~~

~~~text الناتج
undefined
~~~

[[?.]] بصّت على [[user.address]] لقتها [[null]]، فوقفت ورجّعت [[undefined]] من غير ما تحاول توصل لـ [[city]].

---

## ٣. مع [[??]] لقيمة احتياطي

~~~javascript
console.log(user.address?.city ?? "غير معروف");
~~~

~~~text الناتج
غير معروف
~~~

اتنفذ من الشمال: [[user.address?.city]] طلّع [[undefined]]، وبعدين [[??]] (الدرس اللي فات) بدّلت الـ [[undefined]] بـ [["غير معروف"]]. الاتنين دول بييجوا مع بعض كتير.

---

## ٤. مع array: [[?.[0]]]

~~~javascript
console.log(user.orders?.[0]);
~~~

~~~text الناتج
undefined
~~~

[[user.orders]] مش موجودة ([[undefined]]). عشان تجيب عنصر بالرقم بتكتب [[?.]] وبعدها الأقواس المربعة على طول: [[?.[0]]]. النقطة لازم، و [[orders?[0]]] من غيرها SyntaxError لأنها تتلخبط مع الـ ternary [[? :]].

---

## ٥. مع دالة: [[?.()]]

~~~javascript
user.onLogin?.();
user.onLogin = () => console.log("logged in");
user.onLogin?.();
~~~

~~~text الناتج
logged in
~~~

- أول سطر: [[onLogin]] مش موجودة، فـ [[?.()]] مندهتش حاجة ومحصلش error. ده السطر الأخير في المثال.
- عشان نشوف الفرق ضفنا دالة ([[=>]] بتعمل دالة صغيرة)، والنداء التالت اشتغل فعلًا.

ومن غير [[?.]]، نداء دالة مش موجودة بيقع:

~~~javascript
user.onLogout();
~~~

~~~text الناتج
TypeError: user.onLogout is not a function
~~~

---

## ٦. الوقفة بتقطع السلسلة كلها

~~~javascript
const u = {};
console.log(u.a?.b, u.a?.b.c.d);
~~~

~~~text الناتج
undefined undefined
~~~

في [[u.a?.b.c.d]] بعد [[?.]] فيه نقط عادية، ومع كده مقعش: أول ما [[?.]] لقت [[u.a]] فاضية، السلسلة **كلها** لحد الآخر وقفت (short-circuit).

---

## ٧. مش بتنفع على شمال [[=]]

~~~javascript
const u = {};
u?.name = "x";
~~~

~~~text الناتج
SyntaxError: Invalid left-hand side in assignment
~~~

[[?.]] للقراية والنداء بس، مش للكتابة.

---

## الخلاصة

| الشكل | بيعمل إيه لو اللي قبله null أو undefined |
|---|---|
| [[a?.b]] | [[undefined]] بدل TypeError |
| [[a?.[0]]] | [[undefined]] بدل TypeError |
| [[a.f?.()]] | مبيناديش ومبيقعش |

استخدمها مع الداتا اللي ممكن تبقى ناقصة (جاية من API أو form)، مش في كل حتة: لو الحاجة لازم تبقى موجودة، الأحسن الكود يقع بوضوح.`,
          lines: [
            R`address بـ null.`,
            R`بدل ما يقع، طلع [[undefined]].`,
            R`مع [[??]] قيمة احتياطي: [[غير معروف]].`,
            R`[[?.[0]]] مع array مش موجودة: [[undefined]].`,
            R`نادي الدالة لو موجودة بس، وهنا مش موجودة فمفيش حاجة حصلت.`
          ],
          sol: R`[[u.a.b]] ← [[TypeError: Cannot read properties of undefined (reading 'b')]]. [[u.a?.b]] ← [[undefined]]. [[u.a?.b.c.d]] ← [[undefined]] برضه، لأن السلسلة وقفت عند أول [[?.]].`,
          check: {
            lang: "js",
            starter: R`// رجّع مدينة اليوزر، ولو أي حاجة في السكة مش موجودة رجّع "غير معروف"
function getCity(user) {
  return user.address.city;
}`,
            tests: R`test("يوزر كامل ← Cairo", () => expect(getCity({ address: { city: "Cairo" } })).toBe("Cairo"));
test("من غير address ← غير معروف", () => expect(getCity({})).toBe("غير معروف"));
test("address فاضي ← غير معروف", () => expect(getCity({ address: {} })).toBe("غير معروف"));
test("user بـ null ← غير معروف", () => expect(getCity(null)).toBe("غير معروف"));`,
            solution: R`function getCity(user) {
  return user?.address?.city ?? "غير معروف";
}`
          }
        },
        {
          cmd: "? :",
          title: "الـ ternary  شرط ? قيمة : قيمة : if/else في سطر بترجّع قيمة",
          desc: R`[[cond ? a : b]] معناها «لو الشرط true خد a، غير كده خد b». ده الـ ternary operator (الوحيد اللي بياخد ٣ حاجات). [[age >= 18 ? "بالغ" : "قاصر"]].

الفرق عن if: الـ ternary expression بيرجّع قيمة، فتقدر تحطه في متغير أو return أو جوه نص أو جوه JSX في React. الـ if جملة (statement) مبترجّعش حاجة.

نفس الرمز في C و Java و C# و PHP و Dart. في Python الشكل مختلف: [[a if cond else b]]. وفي Kotlin مفيش ternary، [[if]] نفسها بترجّع قيمة.`,
          example: R`const age = 20;
const label = age >= 18 ? "بالغ" : "قاصر";
console.log($__btعندك $__{n} $__{n === 1 ? "رسالة" : "رسايل"}$__bt);
const fee = age < 12 ? 50 : age >= 60 ? 70 : 100;
return isLoading ? "جاري التحميل" : data;`,
          flag: "script",
          try: R`اكتب في الـ Console [[const n = 7]] وبعدين [[n % 2 === 0 ? "زوجي" : "فردي"]]. وبعدين حل التمرين.`,
          deep: {
            why: R`بيختصر ٥ سطور if/else لسطر لما كل اللي عايزه قيمة من اتنين. وفي React مفيش if جوه JSX، فالـ ternary هو الطريقة.`,
            how: R`بيقيّم الشرط، وبعدين يقيّم فرع واحد بس ويرجّعه. الأولوية بتاعته واطية، فـ [[a + b ? x : y]] معناها [[(a + b) ? x : y]]. والمتداخل بيتقري من اليمين: [[a ? x : b ? y : z]].`,
            when: R`اختيار قيمة من اتنين. لو فيه أكتر من ٢ أو ٣ حالات أو فيه أوامر مش قيم، if/else أو switch أوضح.`,
            mistakes: R`تداخل ternary جوه ternary جوه ternary لحد ما محدش يفهم. وتستخدمه عشان تشغّل دوال: [[ok ? save() : log()]] شغالة بس if أوضح. وتنسى إن الـ [[:]] إجبارية.`
          },
          teach: R`## الفكرة: سؤال، وإجابتين

~~~text الشكل
شرط  ?  القيمة لو صح  :  القيمة لو غلط
~~~

[[?]] بتتقري «لو كده؟»، و [[:]] بتتقري «وإلا». اسمه **ternary operator** (ternary يعني تلاتي: بياخد ٣ حاجات، الشرط والقيمتين). المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. [[age >= 18 ? "بالغ" : "قاصر"]]

~~~javascript
const age = 20;
const label = age >= 18 ? "بالغ" : "قاصر";
console.log(label);
~~~

~~~text الناتج
بالغ
~~~

بالترتيب:

1. [[age >= 18]]: هل 20 أكبر من أو يساوي 18؟ أيوه، [[true]].
2. الشرط صح، فـ JS بتاخد القيمة اللي بعد [[?]]: [["بالغ"]]، واللي بعد [[:]] مبتتحسبش أصلًا.
3. القيمة دي بتتحط في [[label]].

نفس الكلام بـ if/else بياخد ٥ سطور:

~~~javascript
let label;
if (age >= 18) {
  label = "بالغ";
} else {
  label = "قاصر";
}
~~~

والفرق: الـ ternary **expression** (حاجة بتطلّع قيمة)، فينفع تحطه بعد [[=]] على طول. الـ if **statement** (جملة أوامر) ومبتطلّعش قيمة.

---

## ٢. جوه نص: المفرد والجمع

~~~javascript
let n = 1;
console.log($__btعندك $__{n} $__{n === 1 ? "رسالة" : "رسايل"}$__bt);
n = 3;
console.log($__btعندك $__{n} $__{n === 1 ? "رسالة" : "رسايل"}$__bt);
~~~

~~~text الناتج
عندك 1 رسالة
عندك 3 رسايل
~~~

- النص ده بين backticks (الزرار اللي تحت Esc)، واسمه template literal: أي حاجة جوه [[$__{ }]] بتتحسب وتتحط مكانها (ليه درس في «الأقواس بأنواعها»).
- [[$__{n}]] بيحط الرقم.
- [[$__{n === 1 ? "رسالة" : "رسايل"}]]: لو n بيساوي 1 بالظبط ([[===]]) اكتب رسالة، وإلا رسايل. ده بيشتغل جوه [[$__{ }]] لأنه expression، و if مكانتش هتنفع هنا.

> في المثال [[n]] مش متعرّفة، فعرّفها الأول زي ما عملنا وإلا هيطلع [[ReferenceError: n is not defined]].

---

## ٣. ternary جوه ternary

~~~javascript
const fee = age < 12 ? 50 : age >= 60 ? 70 : 100;
console.log(fee);
~~~

~~~text الناتج
100
~~~

اقراه كده: اللي بعد أول [[:]] هو ternary كامل تاني.

~~~text
age < 12   ?  50
           :  age >= 60  ?  70
                         :  100
~~~

مع [[age = 20]]: [[20 < 12]] غلط، فروحنا للـ [[:]]. [[20 >= 60]] غلط، فروحنا للـ [[:]] التانية: [[100]].

| age | الناتج |
|---|---|
| أقل من 12 | 50 |
| من 12 لـ 59 | 100 |
| 60 أو أكتر | 70 |

اتنين متداخلين لسه مقروءين، لكن أكتر من كده استخدم if/else.

---

## ٤. في [[return]]

~~~javascript
function load(isLoading, data) {
  return isLoading ? "جاري التحميل" : data;
}
console.log(load(true, "x"), load(false, [1, 2]));
~~~

~~~text الناتج
جاري التحميل [ 1, 2 ]
~~~

الدالة بترجّع رسالة التحميل لو [[isLoading]] بـ [[true]]، وإلا بترجّع الداتا نفسها. السطر في المثال جزء من دالة: لو كتبت [[return]] برة أي دالة في ملف هيطلع [[SyntaxError: Illegal return statement]].

---

## ٥. نفس الفكرة في لغات تانية

| اللغة | الشكل |
|---|---|
| JS و C و Java و C# و PHP و Dart | [[cond ? a : b]] |
| Python | [[a if cond else b]] |
| Kotlin | [[if (cond) a else b]] (الـ if نفسها بترجّع قيمة) |

---

## الخلاصة

- [[cond ? a : b]] بيحسب الشرط، وبعدين فرع واحد بس، ويرجّعه.
- الـ [[:]] إجبارية، ومينفعش ternary من غير «وإلا».
- استخدمه لما عايز **قيمة** من اتنين. لو عايز تنفّذ أوامر، if أوضح.`,
          lines: [
            R`عمر.`,
            R`لو 18 أو أكتر [[بالغ]]، غير كده [[قاصر]].`,
            R`ternary جوه template literal عشان المفرد والجمع.`,
            R`متداخل: أقل من 12 بـ 50، و 60 أو أكتر بـ 70، والباقي 100.`,
            R`في return: رجّع رسالة أو الداتا حسب الحالة.`
          ],
          sol: R`[[n % 2 === 0 ? "زوجي" : "فردي"]] مع 7 ← [["فردي"]].`,
          check: {
            lang: "js",
            starter: R`// سعر التذكرة: أقل من 12 سنة 50، و 60 أو أكتر 70، والباقي 100
// اكتبها بـ ternary في سطر return واحد
function ticketPrice(age) {
}`,
            tests: R`test("ticketPrice(8) ← 50", () => expect(ticketPrice(8)).toBe(50));
test("ticketPrice(30) ← 100", () => expect(ticketPrice(30)).toBe(100));
test("ticketPrice(65) ← 70", () => expect(ticketPrice(65)).toBe(70));
test("الحدود: ticketPrice(12) ← 100 و ticketPrice(60) ← 70", () => expect([ticketPrice(12), ticketPrice(60)]).toEqual([100, 70]));`,
            solution: R`function ticketPrice(age) {
  return age < 12 ? 50 : age >= 60 ? 70 : 100;
}`
          }
        }
      ]
    },
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
    },
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
    },
    {
      t: "رموز الحساب",
      l: 2,
      n: "+ و ++ و += و % و ** والـ bitwise: الحساب والفخاخ اللي فيه",
      items: [
        {
          cmd: "+  و  +=  و  ++",
          title: "علامة + بتجمع أرقام أو بتلزّق نصوص، و += تزوّد على نفس المتغير، و ++ تزوّد واحد",
          desc: R`[[+]] بين رقمين بتجمع. بين نصين بتلزّقهم (concatenation). وفي JS لو واحد منهم نص، التاني بيتحول لنص: [["1" + 1]] بـ [["11"]] مش 2. لكن [[-]] و [[*]] و [[/]] بيحوّلوا لرقم: [["3" - 1]] بـ 2.

[[x += 5]] اختصار [[x = x + 5]]، وفيه زيها [[-=]] و [[*=]] و [[/=]]. و [[x++]] بتزوّد واحد، و [[x--]] بتنقص واحد.

[[i++]] بترجّع القيمة القديمة وبعدين تزوّد، و [[++i]] بتزوّد وترجّع الجديدة. ده بيفرق بس لو استخدمت الناتج في نفس السطر. Python مفيهاش [[++]] خالص، اكتب [[i += 1]].`,
          example: R`console.log(1 + 2, "1" + 2, 1 + 2 + "3");
console.log("5" - 2, +"5" + 1, Number("5") + 1);
let n = 10;
n += 5;
let i = 1;
console.log(i++, i, ++i);`,
          flag: "script",
          try: R`في الـ Console: [["3" + 1 + 2]] و [[3 + 1 + "2"]] و [["3" * "2"]]. وبعدين حل التمرين.`,
          deep: {
            why: R`أي قيمة جاية من input أو URL أو [[localStorage]] بتبقى نص. لو جمعتها على طول هتلزّق بدل ما تجمع، والـ bug ده صامت: [[total = "100" + 50]] بـ [["10050"]].`,
            how: R`JS بتقيّم من الشمال لليمين. لو أي طرف في [[+]] نص، الاتنين يبقوا نص. [[+"5"]] (unary plus) بتحوّل لرقم. و [[i++]] بتحفظ القيمة، تزوّد المتغير، وترجّع المحفوظة.`,
            when: R`حوّل للأرقام بـ [[Number()]] أول ما الداتا تدخل برنامجك. واستخدم template literals للنصوص بدل [[+]].`,
            mistakes: R`تجمع قيم inputs من غير تحويل. وتكتب [[x =+ 5]] بدل [[x += 5]]: الأولى معناها [[x = +5]]. وتكتب [[i++]] في Python. وتستخدم [[0.1 + 0.2]] وتستنى 0.3 بالظبط (بتطلع 0.30000000000000004).`
          },
          teach: R`## الفكرة: [[+]] بتجمع أو بتلزّق، حسب النوع

في JS العلامة [[+]] ليها شغلانتين: بين رقمين **بتجمع**، ولو واحد من الطرفين نص **بتلزّق** (اسمها concatenation). والسطور الباقية في المثال اختصارات للزيادة. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. جمع ولا لزق؟

~~~javascript
console.log(1 + 2, "1" + 2, 1 + 2 + "3");
~~~

~~~text الناتج
3 12 33
~~~

| الحساب | الخطوات | الناتج |
|---|---|---|
| [[1 + 2]] | رقمين: جمع | [[3]] |
| [["1" + 2]] | فيه نص، فالـ 2 اتحوّلت [["2"]] واتلزقت | [["12"]] |
| [[1 + 2 + "3"]] | من الشمال: [[1 + 2 = 3]] رقمين، وبعدين [[3 + "3"]] فيه نص: لزق | [["33"]] |

و [["12"]] هنا **نص** مش رقم ([[typeof ("1" + 2)]] بيطلّع [[string]]). [[console.log]] بيطبع النص من غير علامات تنصيص، فشكله زي الرقم.

---

## ٢. [[-]] بتحوّل لرقم، و [[+]] قبل نص

~~~javascript
console.log("5" - 2, +"5" + 1, Number("5") + 1);
~~~

~~~text الناتج
3 6 6
~~~

- [["5" - 2]]: الطرح مالوش معنى مع النصوص، فـ JS حوّلت [["5"]] لرقم: [[3]]. ونفس الحكاية مع [[*]] و [[/]].
- [[+"5" + 1]]: [[+]] **قبل** قيمة لوحدها (اسمها unary plus) بتحوّلها لرقم. [[+"5"]] بقت [[5]]، و [[5 + 1 = 6]].
- [[Number("5") + 1]]: [[Number()]] دالة بتحوّل لرقم بشكل واضح، ودي الأوضح للي بيقرا الكود: [[6]].

الفخ اللي ده كله بسببه: أي قيمة جاية من input أو URL بتبقى نص، فـ [["100" + 50]] بيطلّع [["10050"]] مش 150. حوّلها لرقم الأول.

---

## ٣. [[+=]]

~~~javascript
let n = 10;
n += 5;
console.log(n);
~~~

~~~text الناتج
15
~~~

[[n += 5]] اختصار [[n = n + 5]]: خد القيمة القديمة، زوّد عليها 5، وحط الناتج في نفس المتغير. استخدمنا [[let]] مش [[const]] لأن القيمة بتتغيّر. وزيها [[-=]] و [[*=]] و [[/=]].

### الغلطة: [[=+]]

~~~javascript
let x = 10;
x =+ 5;
console.log(x);
~~~

~~~text الناتج
5
~~~

[[x =+ 5]] معناها [[x = +5]]: حط موجب 5 في x. مفيش جمع خالص. الترتيب الصح: العملية الأول وبعدين [[=]].

---

## ٤. [[i++]] ضد [[++i]]

~~~javascript
let i = 1;
console.log(i++, i, ++i);
~~~

~~~text الناتج
1 2 3
~~~

الـ arguments بتتحسب من الشمال:

1. [[i++]] (الـ ++ **بعد**): رجّع القيمة الحالية [[1]]، وبعدين زوّد i فبقت 2.
2. [[i]]: دلوقتي [[2]].
3. [[++i]] (الـ ++ **قبل**): زوّد الأول فبقت 3، وبعدين رجّع [[3]].

لو كتبت [[i++;]] لوحدها في سطر، الاتنين نفس الحاجة: الفرق بيبان بس لما تستخدم الناتج في نفس الجملة.

---

## ٥. في Python

~~~python
i = 1
i++
~~~

~~~text الناتج (Python 3.14)
SyntaxError: invalid syntax
~~~

Python مفيهاش [[++]]، اكتب [[i += 1]]. وكمان مبتحوّلش لوحدها:

~~~python
print("1" + 2)
~~~

~~~text الناتج
TypeError: can only concatenate str (not "int") to str
~~~

بترمي error بدل ما تلزّق في صمت زي JS.

---

## الخلاصة

| تكتب | النتيجة في JS |
|---|---|
| رقم [[+]] رقم | جمع |
| نص [[+]] أي حاجة | لزق، والناتج نص |
| [[-]] و [[*]] و [[/]] | بتحوّل لرقم |
| [[x += 5]] | [[x = x + 5]] |
| [[i++]] | رجّع القديم وبعدين زوّد |
| [[++i]] | زوّد وبعدين رجّع الجديد |

وكلمة على الكسور: [[0.1 + 0.2]] بيطلّع [[0.30000000000000004]]، لأن الكمبيوتر بيخزّن الكسور بالـ binary ومش كل كسر عشري ليه تمثيل مظبوط.`,
          lines: [
            R`[[3]]، و [["12"]]، و [["33"]] (جمع 1 + 2 الأول وبعدين لزق).`,
            R`[[-]] حوّلت لرقم: [[3]]، و [[+"5"]] رقم فـ [[6]]، و [[6]].`,
            R`متغير.`,
            R`بقى 15.`,
            R`عداد.`,
            R`[[i++]] رجّعت 1 وبعدين i بقت 2، و [[++i]] زوّدت لـ 3 ورجّعتها: [[1 2 3]].`
          ],
          sol: R`[["3" + 1 + 2]] ← [["312"]]. [[3 + 1 + "2"]] ← [["42"]]. [["3" * "2"]] ← [[6]].`,
          check: {
            lang: "js",
            starter: R`// الأسعار جاية من inputs على شكل نصوص
// addPrices("10", "5") ← 15 (رقم مش "105")
function addPrices(a, b) {
  return a + b;
}`,
            tests: R`test("addPrices('10', '5') ← 15", () => expect(addPrices("10", "5")).toBe(15));
test("addPrices('2.5', '0.5') ← 3", () => expect(addPrices("2.5", "0.5")).toBe(3));
test("addPrices(7, '3') ← 10", () => expect(addPrices(7, "3")).toBe(10));`,
            solution: R`function addPrices(a, b) {
  return Number(a) + Number(b);
}`
          }
        },
        {
          cmd: "%",
          title: "علامة النسبة % في الكود: باقي القسمة (modulo)، مش نسبة مئوية",
          desc: R`[[a % b]] بترجّع الباقي بعد ما تقسم a على b. [[7 % 3]] بـ 1 لأن 7 = 3 × 2 + 1. و [[10 % 2]] بـ 0.

أشهر استخدامات: الرقم زوجي لو [[n % 2 === 0]]. وكل خامس عنصر [[i % 5 === 0]]. وآخر رقم في عدد [[n % 10]]. والدوران (بعد آخر عنصر ارجع للأول) [[(i + 1) % length]]. وتحويل ثواني لدقايق وثواني.

خد بالك مع السالب: في JS و C و Java الناتج بياخد إشارة الشمال [[-7 % 3]] بـ [[-1]]، وفي Python بياخد إشارة اليمين [[-7 % 3]] بـ [[2]]. وفي SQL [[LIKE]] الـ [[%]] معناها تاني خالص (أي حروف)، وفي CMD [[%VAR%]] متغير.`,
          example: R`console.log(7 % 3, 10 % 2, -7 % 3);
const isEven = n => n % 2 === 0;
const secs = 125;
console.log(Math.floor(secs / 60), secs % 60);
const next = (i + 1) % slides.length;`,
          flag: "script",
          try: R`في الـ Console: [[17 % 5]] و [[5 % 17]] و [[0 % 3]]. وفي python3 جرّب [[-7 % 3]] وقارنها بـ JS. وبعدين حل التمرين.`,
          deep: {
            why: R`أي حاجة دورية أو متكررة: ألوان صفوف الجدول بالتبادل، والـ carousel اللي بيرجع للأول، وتنسيق الوقت، وFizzBuzz في أول انترفيو.`,
            how: R`[[a % b]] = [[a - b * trunc(a / b)]] في JS (القسمة بتتقص ناحية الصفر)، عشان كده الإشارة من a. Python بيستخدم floor فالإشارة من b. ومع الكسور شغالة: [[5.5 % 2]] بـ 1.5.`,
            when: R`زوجي وفردي، والدوران على array، وتقسيم وحدات (ثواني ودقايق وساعات، وقروش وجنيهات).`,
            mistakes: R`تفتكرها نسبة مئوية: [[50 % 200]] مش 25٪، دي 50. للنسبة اكتب [[50 / 200 * 100]]. وتستخدمها مع أرقام سالبة في JS وتستنى زي Python (مثلًا index سالب): استخدم [[((n % m) + m) % m]].`
          },
          teach: R`## الفكرة: [[%]] = الباقي

[[a % b]] بتتقري «a mod b» (من modulo)، وبترجّع **الباقي** لما تقسم a على b قسمة صحيحة. مش نسبة مئوية. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. الباقي

~~~javascript
console.log(7 % 3, 10 % 2, -7 % 3);
~~~

~~~text الناتج
1 0 -1
~~~

ارجع لقسمة ابتدائي: كام مرة الـ 3 بتدخل في الـ 7 كاملة، وفاضل كام؟

| الحساب | القسمة | الباقي |
|---|---|---|
| [[7 % 3]] | 7 = 3 × 2 + **1** | [[1]] |
| [[10 % 2]] | 10 = 2 × 5 + **0** | [[0]] |
| [[-7 % 3]] | -7 = 3 × (-2) + **(-1)** | [[-1]] |

في JS الباقي بياخد **إشارة الشمال**: الـ 7 سالبة فالباقي سالب. في Python بياخد إشارة اليمين:

~~~bash
python -c 'print(-7 % 3, 7 % 3)'
~~~

~~~text الناتج (Python 3.14)
2 1
~~~

لو عايز سلوك Python في JS: [[((n % m) + m) % m]]، و [[((-7 % 3) + 3) % 3]] بيطلّع [[2]].

---

## ٢. زوجي ولا فردي

~~~javascript
const isEven = n => n % 2 === 0;
console.log(isEven(4), isEven(7));
~~~

~~~text الناتج
true false
~~~

- [[n => ...]] دالة صغيرة (arrow function) بتاخد n.
- [[n % 2]]: الباقي على 2 يا صفر (زوجي) يا واحد (فردي).
- [[=== 0]]: هل الباقي صفر؟ النتيجة [[true]] أو [[false]].

4 % 2 = 0 فـ [[true]]، و 7 % 2 = 1 فـ [[false]]. (السطر التاني بتاعنا عشان نشوف الناتج.)

---

## ٣. ثواني لدقايق وثواني

~~~javascript
const secs = 125;
console.log(Math.floor(secs / 60), secs % 60);
~~~

~~~text الناتج
2 5
~~~

- [[secs / 60]] = [[2.0833...]]، و [[Math.floor]] بتشيل الكسر لتحت: [[2]] دقيقة كاملة.
- [[secs % 60]]: اللي فاضل بعد الدقيقتين: 125 - 120 = [[5]] ثواني.

القسمة بتجيب «كام مرة»، و [[%]] بتجيب «اللي فضل». نفس الفكرة مع ساعات ودقايق، وجنيهات وقروش.

---

## ٤. الدوران على array

~~~javascript
const slides = ["a", "b", "c"];
let i = 2;
const next = (i + 1) % slides.length;
console.log(next);
~~~

~~~text الناتج
0
~~~

- [[slides.length]] بـ 3، و i (آخر index) بـ 2.
- [[(i + 1)]] بـ 3، وده مش موجود في الـ array (الـ indexes 0 و 1 و 2).
- [[3 % 3]] بـ [[0]]: رجعنا للأول.

ولو i كانت 0 أو 1، [[%]] مش بتغيّر حاجة (1 % 3 = 1، و 2 % 3 = 2). يعني [[%]] بتخلّي الرقم دايمًا جوه المدى من 0 لـ length - 1. شوف الدوران ده:

~~~javascript
for (let k = 0; k < 5; k++) process.stdout.write(k % 3 + " ");
~~~

~~~text الناتج
0 1 2 0 1
~~~

([[process.stdout.write]] بتطبع من غير سطر جديد، في Node بس.) و [[slides]] و [[i]] مش متعرّفين في المثال الأصلي، فعرّفناهم.

---

## ٥. حالات تانية

~~~javascript
console.log(5.5 % 2, 50 % 200, 17 % 5, 5 % 17, 0 % 3);
~~~

~~~text الناتج
1.5 50 2 5 0
~~~

- [[5.5 % 2]]: شغالة مع الكسور: 5.5 = 2 × 2 + 1.5.
- [[50 % 200]]: [[50]] مش 25٪! 200 مبتدخلش في 50 ولا مرة، فالباقي هو 50 نفسها. للنسبة اكتب [[50 / 200 * 100]].
- أي رقم أصغر من اللي بتقسم عليه، الباقي هو نفسه.

---

## الخلاصة

| استخدام | الكود |
|---|---|
| زوجي؟ | [[n % 2 === 0]] |
| كل خامس عنصر | [[i % 5 === 0]] |
| آخر رقم في عدد | [[n % 10]] |
| ارجع للأول بعد الآخر | [[(i + 1) % length]] |

- في JS الإشارة من الشمال، وفي Python من اليمين.
- [[%]] في SQL [[LIKE]] و CMD [[%VAR%]] معناها حاجة تانية خالص.`,
          lines: [
            R`[[1 0 -1]]: الأخيرة سالبة لأن الإشارة من الشمال في JS.`,
            R`دالة: زوجي لو الباقي على 2 صفر.`,
            R`عدد ثواني.`,
            R`دقيقتين و 5 ثواني: [[2 5]].`,
            R`الـ index اللي بعده، ولو وصل للآخر يرجع 0.`
          ],
          sol: R`[[17 % 5]] ← [[2]]. [[5 % 17]] ← [[5]] (أصغر من المقسوم عليه فالباقي هو نفسه). [[0 % 3]] ← [[0]]. وفي Python [[-7 % 3]] ← [[2]]، وفي JS ← [[-1]].`,
          check: {
            lang: "js",
            starter: R`// formatTime(125) ← "2:05"  (دقايق:ثواني، والثواني دايمًا رقمين)
// استخدم Math.floor و %
function formatTime(seconds) {
  return seconds / 60;
}`,
            tests: R`test("formatTime(125) ← 2:05", () => expect(formatTime(125)).toBe("2:05"));
test("formatTime(59) ← 0:59", () => expect(formatTime(59)).toBe("0:59"));
test("formatTime(600) ← 10:00", () => expect(formatTime(600)).toBe("10:00"));
test("formatTime(61) ← 1:01", () => expect(formatTime(61)).toBe("1:01"));`,
            solution: R`function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return $__bt$__{m}:$__{String(s).padStart(2, "0")}$__bt;
}`
          }
        },
        {
          cmd: "**",
          title: "نجمتين ** : الأس (power)، و ^ في أغلب اللغات مش أس",
          desc: R`[[2 ** 10]] يعني 2 أس 10 = 1024. موجودة في JS و Python و bash ([[$((2 ** 10))]]). وقبلها في JS كانوا بيكتبوا [[Math.pow(2, 10)]]. و [[x **= 2]] بتربّع x.

الفخ الكبير: [[2 ^ 3]] في JS و Python و C و Java مش 8، دي XOR (عملية bits) وبتطلع [[1]]. الـ [[^]] للأس موجودة في Excel وفي الرياضيات وبعض اللغات زي R و Lua بس.

وفي C و Java و Go مفيش [[**]] خالص، بتستخدم [[pow()]] أو [[Math.pow()]]. وفي Python النجمتين ليهم معنى تاني في [[**kwargs]] و [[{**d}]] (فرد dict).`,
          example: R`console.log(2 ** 10, 2 ** 0.5, 10 ** -1);
console.log(2 ^ 3);
let side = 4;
side **= 2;
console.log((-2) ** 2);`,
          flag: "script",
          try: R`في الـ Console: [[3 ** 2]] و [[3 ^ 2]] و [[Math.sqrt(16) === 16 ** 0.5]]. وجرّب [[-2 ** 2]] من غير أقواس واقرا الـ error.`,
          deep: {
            why: R`الحسابات العلمية والمالية (فايدة مركّبة) والمسافات (فيثاغورس). والـ [[^]] بدل [[**]] غلطة بتطلع أرقام غلط من غير أي error.`,
            how: R`[[**]] أولويتها أعلى من [[*]] و [[/]]، وبتتقري من اليمين: [[2 ** 3 ** 2]] = [[2 ** 9]] = 512. وفي JS [[-2 ** 2]] ممنوعة (SyntaxError) عشان مش واضح السالب على مين، لازم أقواس. في Python [[-2 ** 2]] بـ [[-4]].`,
            when: R`أي أس أو جذر ([[x ** 0.5]]). وللأرقام الكبيرة جدًا في JS استخدم BigInt: [[2n ** 100n]].`,
            mistakes: R`[[^]] للأس. و [[-2 ** 2]] من غير أقواس في JS. وفي Python تنسى إن [[**]] جوه نداء دالة [[f(**d)]] معناها تاني خالص.`
          },
          teach: R`## الفكرة: [[**]] = الأس

[[a ** b]] بتتقري «a أس b»: اضرب a في نفسها b مرة. [[2 ** 3]] = 2 × 2 × 2 = 8. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. أس صحيح وكسر وسالب

~~~javascript
console.log(2 ** 10, 2 ** 0.5, 10 ** -1);
~~~

~~~text الناتج
1024 1.4142135623730951 0.1
~~~

| الحساب | معناه | الناتج |
|---|---|---|
| [[2 ** 10]] | 2 مضروبة في نفسها 10 مرات | [[1024]] |
| [[2 ** 0.5]] | الأس نص = **الجذر التربيعي** | [[1.4142135623730951]] |
| [[10 ** -1]] | الأس السالب = واحد على: 1 / 10 | [[0.1]] |

يعني [[x ** 0.5]] هي نفس [[Math.sqrt(x)]]. وقبل [[**]] كانوا بيكتبوا [[Math.pow(2, 10)]]، وبتطلّع نفس [[1024]].

---

## ٢. الفخ: [[^]] مش أس

~~~javascript
console.log(2 ^ 3);
~~~

~~~text الناتج
1
~~~

لو كنت مستني 8، [[^]] في JS و Python و C و Java اسمها **XOR**: عملية على الـ bits (درس «& | ^ ~ << >>»). الرقمين بالـ binary:

~~~text
2  =  10
3  =  11
XOR:  01   = 1
~~~

XOR بيحط 1 في الخانة اللي الرقمين **مختلفين** فيها بس. والنتيجة رقم عادي، فمفيش error ينبّهك إنك غلطت. الـ [[^]] للأس موجودة في Excel وفي R و Lua، مش في اللغات دي.

---

## ٣. [[**=]]

~~~javascript
let side = 4;
side **= 2;
console.log(side);
~~~

~~~text الناتج
16
~~~

[[side **= 2]] اختصار [[side = side ** 2]]: ربّع side وحطها فيها تاني. 4 × 4 = [[16]].

---

## ٤. السالب لازم أقواس

~~~javascript
console.log((-2) ** 2);
~~~

~~~text الناتج
4
~~~

السالب جوه الأقواس، فالمربّع لـ [[-2]] كلها: (-2) × (-2) = [[4]]. ولو شيلت الأقواس:

~~~javascript
console.log(-2 ** 2);
~~~

~~~text الناتج
SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
~~~

الرسالة بتقول: علامة لوحدها (unary، زي السالب) جت قبل الأس على طول، ولازم أقواس توضّح قصدك. هل هي [[(-2) ** 2]] = 4 ولا [[-(2 ** 2)]] = -4؟ JS رفضت تخمّن. Python بقى بيخمّن:

~~~bash
python -c 'print(-2 ** 2, 2 ** 10, 2 ^ 3)'
~~~

~~~text الناتج (Python 3.14)
-4 1024 1
~~~

في Python الأس الأول وبعدين السالب، فطلعت [[-4]]. و [[^]] هناك برضه XOR.

---

## ٥. الترتيب من اليمين

~~~javascript
console.log(2 ** 3 ** 2);
~~~

~~~text الناتج
512
~~~

[[**]] بتتحسب من **اليمين**: [[3 ** 2 = 9]] الأول، وبعدين [[2 ** 9 = 512]]. (لو كانت من الشمال كانت هتبقى 8 ** 2 = 64.)

---

## ٦. bash و الأرقام الكبيرة

~~~bash
echo $((2 ** 10))
~~~

~~~text الناتج (Ubuntu 24.04 في Docker)
1024
~~~

[[$(( ))]] في bash بيعمل حساب أرقام صحيحة، و [[**]] جواه أس.

وفي JS الأرقام العادية بتفقد الدقة فوق حوالي 9 مليون مليار، فللأرقام الكبيرة جدًا فيه **BigInt**: رقم وبعده [[n]].

~~~javascript
console.log(2n ** 100n);
~~~

~~~text الناتج
1267650600228229401496703205376n
~~~

---

## الخلاصة

| تكتب | المعنى |
|---|---|
| [[a ** b]] | a أس b |
| [[x ** 0.5]] | الجذر التربيعي |
| [[x **= 2]] | ربّع x |
| [[(-2) ** 2]] | السالب محتاج أقواس في JS |
| [[a ^ b]] | XOR، **مش** أس |

وفي C و Java و Go مفيش [[**]]: بيستخدموا [[pow()]] أو [[Math.pow()]].`,
          lines: [
            R`[[1024]]، والجذر التربيعي لـ 2، و [[0.1]].`,
            R`XOR مش أس: [[1]].`,
            R`ضلع مربع.`,
            R`[[**=]]: side بقت 16.`,
            R`السالب جوه أقواس: [[4]].`
          ],
          sol: R`[[3 ** 2]] ← [[9]]. [[3 ^ 2]] ← [[1]]. [[Math.sqrt(16) === 16 ** 0.5]] ← [[true]]. و [[-2 ** 2]] ← [[SyntaxError: Unary operator used immediately before exponentiation expression...]].`
        },
        {
          cmd: "&  |  ^  ~  <<  >>",
          title: "رموز الـ bits: & و | و ^ و ~ و << و >> بتشتغل على الأرقام bit بـ bit",
          desc: R`دي اسمها bitwise operators، وبتتعامل مع الرقم كـ 0 و 1. [[5 & 3]] (AND) بـ 1، و [[5 | 3]] (OR) بـ 7، و [[5 ^ 3]] (XOR) بـ 6، و [[~5]] (NOT) بـ [[-6]]، و [[1 << 3]] (shift شمال) بـ 8 يعني ضرب في 2 أس 3، و [[16 >> 2]] بـ 4.

مش هتحتاجهم كتير في شغل الويب العادي، بس هتشوفهم في: الصلاحيات والـ flags ([[READ | WRITE]])، والألوان ([[(rgb >> 16) & 255]])، والـ hashing، ومسائل الانترفيو.

المهم إنك متخلطش: [[&]] و [[|]] واحدة bitwise، و [[&&]] و [[||]] منطق. وفي TypeScript [[|]] و [[&]] في الأنواع معناهم union و intersection (درس تاني). وفي Python [[&]] و [[|]] على الـ sets معناهم تقاطع واتحاد.`,
          example: R`console.log(5 & 3, 5 | 3, 5 ^ 3);
console.log(~5, 1 << 3, 16 >> 2);
const READ = 1, WRITE = 2, EXEC = 4;
let perms = READ | WRITE;
console.log((perms & WRITE) !== 0);
console.log((5).toString(2), (3).toString(2));`,
          flag: "script",
          try: R`في الـ Console اكتب [[(6).toString(2)]] و [[(5).toString(2)]] وبعدين احسب [[6 & 5]] بإيدك قبل ما تشغّله. وفكّر ليه [[chmod 755]] في لينكس شبه الـ flags دي.`,
          deep: {
            why: R`عشان تقرا كود فيه flags أو صلاحيات، ومتتلخبطش لو كتبت [[&]] بدل [[&&]] غلط. وصلاحيات لينكس (r=4 و w=2 و x=1) نفس الفكرة بالظبط.`,
            how: R`JS بتحوّل الرقم لـ 32 bit صحيح، وتعمل العملية على كل bit لوحده، وترجّعه رقم. 5 = 101 و 3 = 011: AND بـ 001، OR بـ 111، XOR بـ 110.`,
            when: R`flags وصلاحيات، وتشفير وhashing، ومسائل زي «لاقي الرقم اللي مش متكرر» بـ XOR.`,
            mistakes: R`[[if (a & b)]] وانت قصدك [[&&]]: ممكن تشتغل صدفة مع booleans بس بترجّع رقم ومبتعملش short-circuit. والرقم أكبر من 32 bit بيتقص: [[2 ** 32 | 0]] بـ 0.`
          },
          teach: R`## الفكرة: الرقم من جوه = صفر وواحد

أي رقم صحيح متخزّن **binary**: خانات كل واحدة يا 0 يا 1، اسمها **bit**. الرموز دي (اسمها bitwise operators) بتشتغل على الخانات دي خانة خانة. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. الأول: شوف الرقم بالـ binary

~~~javascript
console.log((5).toString(2), (3).toString(2));
~~~

~~~text الناتج
101 11
~~~

[[toString(2)]] بتكتب الرقم بالأساس 2. والأقواس حوالين الـ 5 عشان النقطة متتفهمش كسر عشري. كل خانة من اليمين قيمتها ضعف اللي قبلها:

~~~text
خانة:   4   2   1
5   =   1   0   1     = 4 + 1
3   =   0   1   1     = 2 + 1
~~~

(الـ 3 طلعت [[11]] من غير صفر على الشمال، وضفناه في الرسم عشان الخانات تتقابل.)

---

## ٢. AND و OR و XOR

~~~javascript
console.log(5 & 3, 5 | 3, 5 ^ 3);
~~~

~~~text الناتج
1 7 6
~~~

كل عملية بتبص على الخانة نفسها في الرقمين:

~~~text
          5 = 101
          3 = 011
5 & 3  =  001  = 1     (1 لو الاتنين 1)
5 | 3  =  111  = 7     (1 لو واحد على الأقل 1)
5 ^ 3  =  110  = 6     (1 لو مختلفين)
~~~

| الرمز | اسمه | الخانة بتبقى 1 لو |
|---|---|---|
| [[&]] | AND | الاتنين 1 |
| [[|]] | OR | واحد على الأقل 1 |
| [[^]] | XOR (exclusive or) | واحد بس 1 |

---

## ٣. NOT و الـ shift

~~~javascript
console.log(~5, 1 << 3, 16 >> 2);
~~~

~~~text الناتج
-6 8 4
~~~

- [[~5]] (NOT): بتقلب **كل** الخانات. JS بتشيل الرقم في 32 bit، والخانة اللي على الشمال خالص هي الإشارة، فقلبها بيطلّع رقم سالب. القاعدة اللي بتطلع منها: [[~n]] دايمًا = [[-(n + 1)]]، فـ [[~5]] = [[-6]].
- [[1 << 3]] (shift شمال): زق الخانات 3 أماكن للشمال وحط أصفار مكانها: [[1]] بقت [[1000]] = 8. كل خطوة شمال = ضرب في 2.
- [[16 >> 2]] (shift يمين): [[10000]] بقت [[100]] = 4. كل خطوة يمين = قسمة على 2.

---

## ٤. الـ flags: كذا نعم/لأ في رقم واحد

~~~javascript
const READ = 1, WRITE = 2, EXEC = 4;
~~~

كل flag ليه خانة لوحده:

~~~text
          خانة 4  خانة 2  خانة 1
READ  =     0       0       1
WRITE =     0       1       0
EXEC  =     1       0       0
~~~

### [[|]] بتجمع flags

~~~javascript
let perms = READ | WRITE;
console.log(perms);
~~~

~~~text الناتج
3
~~~

[[001 | 010 = 011]] = 3: قراية وكتابة في رقم واحد.

### [[&]] بتختبر flag

~~~javascript
console.log((perms & WRITE) !== 0);
console.log((perms & EXEC) !== 0, perms & EXEC);
~~~

~~~text الناتج
true
false 0
~~~

- [[perms & WRITE]]: [[011 & 010 = 010]] = 2، مش صفر، فـ [[true]]: فيه كتابة.
- [[perms & EXEC]]: [[011 & 100 = 000]] = 0، فـ [[false]]: مفيش تشغيل.

ده نفس اللي بيحصل في صلاحيات لينكس: [[chmod 755]] الـ 7 = 4 + 2 + 1 (r و w و x) والـ 5 = 4 + 1.

---

## ٥. متخلطش [[&]] بـ [[&&]]

~~~javascript
console.log(true & true, typeof (true & true));
~~~

~~~text الناتج
1 number
~~~

[[&]] على booleans بترجّع **رقم** مش [[true]]، ومبتعملش short-circuit (الطرفين بيتنفذوا دايمًا). للشروط استخدم [[&&]] و [[||]].

وكمان الأرقام بتتقص لـ 32 bit:

~~~javascript
console.log(2 ** 32 | 0);
~~~

~~~text الناتج
0
~~~

[[2 ** 32]] محتاج 33 خانة، والخانات اللي فيها 1 اتقصت، فاللي فضل صفر.

---

## الخلاصة

| الرمز | المثال | الناتج |
|---|---|---|
| [[&]] | [[5 & 3]] | [[1]] |
| [[|]] | [[5 | 3]] | [[7]] |
| [[^]] | [[5 ^ 3]] | [[6]] |
| [[~]] | [[~5]] | [[-6]] |
| [[<<]] | [[1 << 3]] | [[8]] |
| [[>>]] | [[16 >> 2]] | [[4]] |

وفي TypeScript [[|]] و [[&]] بين **أنواع** معناهم union و intersection (درس «A | B و A & B»)، وفي Python على الـ sets معناهم اتحاد وتقاطع.`,
          lines: [
            R`[[1 7 6]].`,
            R`[[-6 8 4]].`,
            R`٣ flags، كل واحد bit مختلف.`,
            R`[[|]] بتجمع flags: perms بـ 3 (قراية وكتابة).`,
            R`[[&]] بتختبر flag: فيه كتابة؟ [[true]].`,
            R`اعرض الرقم بالـ binary: [["101" "11"]].`
          ],
          sol: R`[[6]] = [["110"]] و [[5]] = [["101"]]، و AND بيسيب الـ bit اللي واحد في الاتنين بس: [["100"]] يعني [[4]]. وفي chmod الـ 7 = 4 + 2 + 1 = قراية وكتابة وتشغيل، نفس فكرة [[READ | WRITE | EXEC]].`
        }
      ]
    },
    {
      t: "رموز TypeScript والأسماء",
      l: 2,
      n: ": و <T> و | و ?: و ! و @ و # و $ و _ : الرموز اللي بتظهر في الأنواع والأسماء",
      items: [
        {
          cmd: "x: number",
          title: "النقطتين : في TypeScript: بعدها نوع المتغير أو الـ parameter أو اللي الدالة بترجّعه",
          desc: R`في TypeScript [[let age: number = 20]] معناها age نوعها رقم. النقطتين بعد اسم أي حاجة معناها «نوعها هو». في الدوال: [[function add(a: number, b: number): number]]، والأخيرة بعد الأقواس هي نوع اللي بترجّعه.

نفس النقطتين بالمعنى ده في Python ([[def f(x: int) -> str]])، و Kotlin ([[val age: Int]])، و Swift ([[let age: Int]])، و Rust و Go من غير نقطتين ([[age int]]).

لكن النقطتين ليها معاني تانية في JS: جوه object بتفصل المفتاح عن القيمة [[{ age: 20 }]]، وفي الـ ternary [[a ? b : c]]، وبعد [[case]] في switch. وفي Python بعد if و def و for بتفتح بلوك.`,
          example: R`let age: number = 20;
const names: string[] = ["Ali", "Sara"];
function greet(name: string, times: number = 1): string {
  return name.repeat(times);
}
const user: { id: number; email?: string } = { id: 1 };`,
          flag: "script",
          try: R`افتح [[https://www.typescriptlang.org/play]] واكتب [[let n: number = "5"]] واقرا الـ error. بعدين [[function f(x: string): number { return x; }]].`,
          deep: {
            why: R`الأنواع بتمسك الأخطاء وانت بتكتب مش وانت شغّال: دالة مستنية رقم وجالها نص، أو خانة اسمها غلط. والمحرر بيكمّلك أسماء الخانات لأنه عارف النوع.`,
            how: R`الأنواع في TypeScript بتتشال خالص وقت التحويل لـ JS، يعني مفيش أي تأثير وقت التشغيل. الـ compiler ([[tsc]]) أو المحرر بس هو اللي بيفحص. وكتير مش لازم تكتب النوع لأن TS بيستنتجه (inference): [[let age = 20]] بتبقى number لوحدها.`,
            when: R`في parameters الدوال دايمًا، وفي اللي بترجّعه الدوال المهمة. والمتغيرات اللي ليها قيمة أولية سيب TS يستنتجها.`,
            mistakes: R`تفتكر الأنواع بتتفحص وقت التشغيل: داتا جاية من API ممكن تبقى غلط والنوع مش هيحميك، استخدم validation (زي zod). وتخلط بين [[: number]] (نوع) و [[= 5]] (قيمة). وتكتب [[Number]] و [[String]] بحرف كبير بدل [[number]] و [[string]].`
          },
          teach: R`## الفكرة: [[:]] بعد اسم = «نوعه»

في TypeScript لما تكتب [[اسم: نوع]] انت بتقول للـ compiler إيه اللي مسموح يتحط في الاسم ده. لو حطيت حاجة تانية، بيطلّعلك error **وانت بتكتب**، قبل ما الكود يشتغل. المثال TypeScript، وفحصناه بـ [[tsc]] (الـ compiler بتاع TypeScript، إصدار 7.0) مع [[--strict]] (الفحص الكامل)، وشغّلنا الناتج بـ Node 24 على ويندوز.

---

## ١. متغير برقم

~~~ts
let age: number = 20;
~~~

اقراه كده: [[let age]] متغير اسمه age، و [[: number]] نوعه رقم، و [[= 20]] قيمته الأولى 20. يعني النقطتين للنوع، والـ [[=]] للقيمة.

ولو حطيت نص:

~~~ts
let n: number = "5";
~~~

~~~text ناتج tsc
b.ts(1,5): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

اقرا الرسالة: [[b.ts(1,5)]] يعني الملف b.ts، السطر 1، الحرف 5. و [[TS2322]] رقم الغلطة. والكلام: نوع string مينفعش يتحط في number.

---

## ٢. array من النصوص

~~~ts
const names: string[] = ["Ali", "Sara"];
~~~

[[string[]]]: النوع [[string]] وبعده [[[]]] يعني «array كل عناصرها نصوص». ونفسها [[Array<string>]] (درس [[<T>]]).

---

## ٣. دالة بأنواعها

~~~ts
function greet(name: string, times: number = 1): string {
  return name.repeat(times);
}
~~~

فيها ٣ أماكن للنقطتين:

| الجزء | معناه |
|---|---|
| [[name: string]] | الـ parameter الأول لازم نص |
| [[times: number = 1]] | التاني رقم، ولو محدش بعته قيمته 1 |
| [[): string]] | النقطتين **بعد** قوس الـ parameters: نوع اللي الدالة بترجّعه |

و [[name.repeat(times)]] بتكرر النص times مرة. جرّبناها:

~~~ts
console.log(greet("Ali"), greet("Ha", 3));
~~~

~~~text الناتج
Ali HaHaHa
~~~

ولو بعت رقم مكان النص:

~~~ts
greet(5);
~~~

~~~text ناتج tsc
error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
~~~

ولو الدالة قالت إنها بترجّع رقم ورجّعت نص:

~~~ts
function f(x: string): number { return x; }
~~~

~~~text ناتج tsc
error TS2322: Type 'string' is not assignable to type 'number'.
~~~

---

## ٤. نوع object جوه السطر

~~~ts
const user: { id: number; email?: string } = { id: 1 };
~~~

- [[{ id: number; email?: string }]] بعد النقطتين ده **نوع** مش object: بيوصف شكل الـ object. الخانات بتتفصل بـ [[;]] (أو فاصلة).
- [[id: number]] إجبارية.
- [[email?: string]] علامة الاستفهام قبل النقطتين معناها اختيارية (درس [[?:]]).
- [[= { id: 1 }]] القيمة الحقيقية: فيها id ومفيهاش email، وده مسموح.

ولو نسيت الإجبارية:

~~~ts
const u2: { id: number; email?: string } = { email: "a" };
~~~

~~~text ناتج tsc
error TS2741: Property 'id' is missing in type '{ email: string; }' but required in type '{ id: number; email?: string | undefined; }'.
~~~

---

## ٥. الأنواع بتختفي وقت التشغيل

ده الـ JavaScript اللي [[tsc]] طلّعه من المثال:

~~~javascript
let age = 20;
const names = ["Ali", "Sara"];
function greet(name, times = 1) {
    return name.repeat(times);
}
const user = { id: 1 };
~~~

كل [[: نوع]] اتشالت. يعني الأنواع فحص وقت الكتابة بس، ومش بتحمي من داتا غلط جاية من API وقت التشغيل.

### مش لازم تكتب النوع دايمًا

~~~ts
let inferred = 20;
inferred = "x";
~~~

~~~text ناتج tsc
error TS2322: Type 'string' is not assignable to type 'number'.
~~~

TS استنتج إن [[inferred]] رقم من القيمة الأولى (اسمها **inference**)، من غير ما نكتب [[: number]].

---

## ٦. النقطتين ليها معاني تانية

| فين | المعنى |
|---|---|
| [[let x: number]] | نوع (TypeScript بس) |
| [[{ age: 20 }]] | جوه object: مفتاح وقيمة |
| [[a ? b : c]] | «وإلا» في الـ ternary |
| [[case 1:]] | بعد case في switch |

---

## الخلاصة

- [[اسم: نوع]] للمتغيرات والـ parameters، و [[): نوع]] بعد قوس الدالة للي بترجّعه.
- الأنواع الأساسية بحروف صغيرة: [[number]] و [[string]] و [[boolean]]، مش [[Number]] و [[String]].
- اكتب الأنواع في parameters الدوال دايمًا، وسيب TS يستنتج المتغيرات اللي ليها قيمة.`,
          lines: [
            R`متغير نوعه number.`,
            R`array من النصوص.`,
            R`parameterين بأنواعهم، والتاني ليه قيمة افتراضية، والدالة بترجّع string.`,
            R`[[repeat]] بتكرر النص.`,
            R`قفلة الدالة.`,
            R`نوع object جوه السطر: id رقم إجباري، و email نص اختياري ([[?:]]).`
          ],
          sol: R`[[let n: number = "5"]] ← [[Type 'string' is not assignable to type 'number'.]]. والدالة ← نفس الرسالة تقريبًا لأنها بترجّع string والمكتوب number.`
        },
        {
          cmd: "<T>",
          title: "الأقواس الزاوية <T> : generics، نوع بيتحدد وقت الاستخدام زي parameter للأنواع",
          desc: R`[[Array<string>]] معناها array من النصوص. والـ [[<>]] بتاخد نوع جواها زي ما الدالة بتاخد قيمة. ولما تكتب دالة بنفسك: [[function first<T>(arr: T[]): T]] معناها «أي نوع، سمّيه T، والدالة بترجّع نفس النوع اللي جه في الـ array».

بتشوفها في كل مكان: [[Promise<User>]] و [[useState<number>(0)]] و [[Map<string, number>]] و [[Record<string, boolean>]].

نفس الفكرة في Java و C# و Kotlin و Swift و Rust: [[List<String>]]. وفي C++ اسمها templates: [[vector<int>]]. وفي Go بأقواس مربعة: [[func Map[T any]()]]. وفي Python: [[list[str]]].`,
          example: R`const ids: Array<number> = [1, 2, 3];
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const n = first([10, 20]);
const [count, setCount] = useState<number>(0);
const cache = new Map<string, User>();`,
          flag: "script",
          try: R`في TypeScript Playground اكتب دالة [[first]] من المثال، وبعدين [[const s = first(["a", "b"])]] وقف بالماوس على s وشوف نوعها.`,
          deep: {
            why: R`من غيرها كنت هتكتب [[any]] فتخسر كل فايدة الأنواع، أو تكتب نفس الدالة مرة للأرقام ومرة للنصوص.`,
            how: R`[[T]] مجرد اسم (ممكن أي اسم، بس T و K و V عرف). وقت النداء TS بيستنتج T من الـ argument، أو انت تحدده صراحة [[first<string>(...)]]. وكله بيتشال في الـ JS النهائي.`,
            when: R`دوال وكلاسات بتشتغل على أي نوع (utilities و containers و API clients). وفي الاستخدام لما TS ميعرفش يستنتج لوحده، زي [[useState<User | null>(null)]].`,
            mistakes: R`في ملفات [[.tsx]] الـ arrow generic [[<T>(x: T) => x]] بتتلخبط مع JSX، اكتبها [[<T,>(x: T) => x]]. وتستخدم [[any]] بدل generic. وتفتكر [[<]] هنا مقارنة.`
          },
          teach: R`## الفكرة: parameter بس للأنواع

الدالة العادية بتاخد **قيمة** بين [[( )]]. الـ generic بياخد **نوع** بين [[< >]]. [[Array<number>]] يعني «Array، والنوع اللي جواها number». المثال TypeScript، وفحصناه بـ [[tsc]] 7.0 مع [[--strict]]، وشغّلنا الناتج بـ Node 24 على ويندوز. وعشان نشوف الأنواع اللي TS استنتجها طلبنا من [[tsc]] ملف [[.d.ts]] (ملف أنواع بس) بـ [[--declaration --emitDeclarationOnly]].

> المثال فيه [[useState]] (من React) و [[User]] (نوع انت معرّفه)، فعرّفناهم في أول الملف عشان الفحص يعدّي.

---

## ١. [[Array<number>]]

~~~ts
const ids: Array<number> = [1, 2, 3];
~~~

نفس [[number[]]] بالظبط، بس مكتوبة بشكل الـ generic. ولو حطيت نص:

~~~ts
const ids: Array<number> = [1, "2"];
~~~

~~~text ناتج tsc
error TS2322: Type 'string' is not assignable to type 'number'.
~~~

---

## ٢. دالة generic

~~~ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
~~~

نفكّها حتة حتة:

| الجزء | معناه |
|---|---|
| [[<T>]] بعد اسم الدالة | «فيه نوع هسمّيه T، هيتحدد لما حد ينادي الدالة» |
| [[arr: T[]]] | الـ parameter array من النوع ده |
| [[: T | undefined]] | بترجّع عنصر من نفس النوع، أو [[undefined]] لو الـ array فاضية |
| [[return arr[0];]] | رجّع أول عنصر |

[[T]] مجرد اسم، زي اسم parameter. العرف: T (Type)، و K و V (Key و Value).

---

## ٣. TS بيستنتج T لوحده

~~~ts
const n = first([10, 20]);
~~~

الـ array فيها أرقام، فـ TS قرر إن T = number. ده اللي ملف الأنواع طلّعه:

~~~text decl/c.d.ts
declare const n: number | undefined;
~~~

وقت التشغيل [[n]] بـ [[10]]. ولو استخدمتها في مكان مستني نص:

~~~ts
const t1: string = n;
~~~

~~~text ناتج tsc
error TS2322: Type 'number | undefined' is not assignable to type 'string'.
  Type 'undefined' is not assignable to type 'string'.
~~~

TS فاكر إن الناتج رقم (أو undefined)، وده بالظبط الفايدة: لو الدالة كانت بترجّع [[any]] ماكانش هيمسك الغلطة.

### أو تحدده انت

~~~ts
const forced = first<string>(["a"]);
const bad = first<string>([1]);
~~~

~~~text ناتج tsc
error TS2322: Type 'number' is not assignable to type 'string'.
~~~

[[first<string>]] قالت T = string صراحة، فالـ array اللي فيها رقم اترفضت.

---

## ٤. [[useState<number>(0)]]

~~~ts
const [count, setCount] = useState<number>(0);
~~~

~~~text decl/c.d.ts
declare const count: number, setCount: (v: number) => void;
~~~

- [[useState<number>]]: الـ state هيبقى رقم.
- [[(0)]]: القيمة الأولى.
- [[const [count, setCount] =]]: فك الـ array اللي راجعة (destructuring، درس [[[a, b]]]). [[count]] رقم، و [[setCount]] دالة بتاخد رقم.

هنا الـ [[<number>]] مش ضروري لأن TS هيستنتجه من الـ 0، بس بيبقى ضروري في حالة زي [[useState<User | null>(null)]]: من الـ null لوحدها TS ميعرفش إن بعدين هيبقى فيه User.

---

## ٥. [[Map<string, User>]]: نوعين

~~~ts
const cache = new Map<string, User>();
~~~

~~~text decl/c.d.ts
declare const cache: Map<string, User>;
~~~

الـ generic ممكن ياخد أكتر من نوع، بينهم فاصلة: المفاتيح نصوص، والقيم User. [[cache.set("u1", { id: 1, name: "Ali" })]] تمام، ولو حطيت مفتاح رقم هيطلع error.

---

## ٦. الأنواع بتختفي

ده الـ JavaScript اللي طلع:

~~~javascript
const ids = [1, 2, 3];
function first(arr) {
    return arr[0];
}
const n = first([10, 20]);
const [count, setCount] = useState(0);
const cache = new Map();
~~~

كل [[<...>]] اتشالت. ولما شغّلناه (مع [[useState]] بسيطة) طبع [[[ 1, 2, 3 ] 10 a a { id: 1, name: 'Ali' } 0]].

---

## الخلاصة

| تكتب | المعنى |
|---|---|
| [[Array<string>]] | array من النصوص |
| [[function f<T>(x: T): T]] | دالة بتشتغل مع أي نوع وبترجّع نفسه |
| [[f<string>(...)]] | حدد T بنفسك |
| [[Map<K, V>]] | نوعين: المفتاح والقيمة |
| [[Promise<User>]] | وعد هيرجّع User |

- [[<]] هنا مش «أصغر من»: هي بتفتح نوع.
- نفس الفكرة: Java و C# [[List<String>]]، و C++ [[vector<int>]]، و Go [[[T any]]]، و Python [[list[str]]].`,
          lines: [
            R`نفس [[number[]]] بصيغة الـ generic.`,
            R`T بيتحدد من الـ array اللي هتبعتها، والدالة بترجّع نفس النوع أو undefined.`,
            R`رجّع أول عنصر.`,
            R`قفلة الدالة.`,
            R`TS استنتج إن T هي number، فـ n نوعها [[number | undefined]].`,
            R`React: الـ state رقم.`,
            R`Map مفاتيحها نصوص وقيمها User.`
          ],
          sol: R`لما تقف على [[s]] هتلاقي [[const s: string | undefined]]. TS استنتج T = string من الـ array.`
        },
        {
          cmd: "A | B  و  A & B",
          title: "الـ | و & في أنواع TypeScript: | يعني «ده أو ده» (union)، و & يعني «الاتنين مع بعض»",
          desc: R`[[string | number]] (union) معناها القيمة ممكن تبقى نص أو رقم. وأشهر استخدام: قيم محددة [[type Status = "idle" | "loading" | "done"]]، فلو كتبت [["laoding"]] غلط TS هيقولك. و [[User | null]] يعني ممكن ميبقاش فيه يوزر.

[[A & B]] (intersection) معناها النوع فيه كل خانات A وكل خانات B مع بعض: [[type Admin = User & { permissions: string[] }]].

ده نفس شكل رموز الـ bits ومعنى قريب بالمنطق، بس هنا في الأنواع بس ومش بيتنفذ. ونفس [[|]] في Python 3.10: [[int | None]]، وفي Rust و Kotlin و Swift الفكرة موجودة بأشكال تانية.`,
          example: R`type Id = string | number;
type Status = "idle" | "loading" | "done";
let state: Status = "idle";
type Admin = User & { permissions: string[] };
function show(id: Id) {
  if (typeof id === "string") return id.toUpperCase();
  return id.toFixed(0);
}`,
          flag: "script",
          try: R`في TypeScript Playground: اكتب [[type Status]] من المثال وبعدين [[let s: Status = "loding"]] واقرا الـ error. بعدين جرّب تنادي [[id.toUpperCase()]] برة الـ if.`,
          deep: {
            why: R`الـ union بيوصف الواقع: API بيرجّع داتا أو error، قيمة ممكن تبقى null، وحالة من عدد محدود. وده بيمنع typos ويجبرك تتعامل مع كل الحالات.`,
            how: R`مع union مسموحلك تستخدم بس الحاجات المشتركة بين كل الأنواع. عشان تستخدم حاجة خاصة بنوع لازم تضيّق (narrowing) بـ [[typeof]] أو [[in]] أو مقارنة، و TS بيفهم ده جوه الـ if.`,
            when: R`[[|]] للقيم اللي ليها أكتر من شكل أو للحالات. [[&]] لدمج أنواع جاهزة بدل ما تكرر خانات.`,
            mistakes: R`تستخدم method خاصة بنوع واحد من غير narrowing فيطلع error. وتفتكر [[A & B]] بين [[string & number]] بتدي «الاتنين»: النتيجة [[never]] (مفيش قيمة نص ورقم في نفس الوقت).`
          },
          teach: R`## الفكرة: «ده أو ده» و «ده وده»

| الرمز في الأنواع | اسمه | معناه |
|---|---|---|
| [[A | B]] | union | القيمة واحدة من الاتنين |
| [[A & B]] | intersection | القيمة فيها كل خانات الاتنين مع بعض |

نفس شكل رموز الـ bits، بس هنا بين **أنواع** وبيتشالوا خالص وقت التشغيل. المثال TypeScript، وفحصناه بـ [[tsc]] 7.0 مع [[--strict]]، وشغّلنا الناتج بـ Node 24 على ويندوز. والمثال بيستخدم [[User]] من غير ما يعرّفه، فعرّفناه: [[interface User { id: number; name: string }]].

---

## ١. [[type Id = string | number;]]

~~~ts
type Id = string | number;
~~~

- [[type]] كلمة بتعمل **اسم لنوع** (type alias)، زي ما [[const]] بتعمل اسم لقيمة.
- [[string | number]]: Id ممكن تبقى نص **أو** رقم. [["u1"]] تنفع و [[7]] تنفع، و [[true]] لأ.

---

## ٢. union من قيم محددة

~~~ts
type Status = "idle" | "loading" | "done";
let state: Status = "idle";
~~~

هنا الأنواع مش [[string]] عام، دي **نصوص بعينها** (اسمها literal types). [[state]] مسموحلها ٣ قيم بس. ولو غلطت في الحروف:

~~~ts
let s: Status = "loding";
~~~

~~~text ناتج tsc
error TS2820: Type '"loding"' is not assignable to type 'Status'. Did you mean '"loading"'?
~~~

TS مسك الـ typo وكمان اقترح الصح.

---

## ٣. [[&]]: دمج نوعين

~~~ts
type Admin = User & { permissions: string[] };
~~~

[[Admin]] لازم يبقى فيه كل خانات User ([[id]] و [[name]]) **و** خانة [[permissions]] (array نصوص). جرّبنا:

~~~ts
const a: Admin = { id: 1, name: "Ali", permissions: ["delete"] };
~~~

عدّت. ولو نسيت permissions:

~~~text ناتج tsc
error TS2322: Type '{ id: number; name: string; }' is not assignable to type 'Admin'.
  Property 'permissions' is missing in type '{ id: number; name: string; }' but required in type '{ permissions: string[]; }'.
~~~

---

## ٤. narrowing: تضييق الـ union

~~~ts
function show(id: Id) {
  if (typeof id === "string") return id.toUpperCase();
  return id.toFixed(0);
}
~~~

مع union TS بيسمحلك تستخدم بس اللي موجود في **كل** الأنواع. [[toUpperCase]] للنصوص بس، و [[toFixed]] للأرقام بس. فلازم تسأل الأول:

1. [[typeof id === "string"]]: [[typeof]] بترجّع اسم نوع القيمة وقت التشغيل. جوه الـ if، TS فاهم إن id **نص**، فـ [[toUpperCase()]] مسموحة (بتكبّر الحروف).
2. بعد الـ if (اللي فيه return)، اللي فاضل من الـ union هو number بس، فـ [[toFixed(0)]] مسموحة (بتقرّب لعدد خانات عشرية، وهنا صفر).

ده اسمه **narrowing** (تضييق). شغّلناه:

~~~ts
console.log(show("ab"), show(3.7));
~~~

~~~text الناتج
AB 4
~~~

[[3.7]] اتقرّبت [["4"]] (toFixed بترجّع نص). ولو نسيت الـ if:

~~~ts
function show(id: Id) { return id.toUpperCase(); }
~~~

~~~text ناتج tsc
error TS2339: Property 'toUpperCase' does not exist on type 'Id'.
  Property 'toUpperCase' does not exist on type 'number'.
~~~

السطر التاني بيقولك السبب: لو id طلعت رقم، مفيش toUpperCase.

---

## ٥. [[&]] بين أنواع مالهاش علاقة ببعض

~~~ts
type Never = string & number;
const x: Never = "a";
~~~

~~~text ناتج tsc
error TS2322: Type '"a"' is not assignable to type 'never'.
~~~

مفيش قيمة نص ورقم في نفس الوقت، فالنوع بقى [[never]] (مستحيل). [[&]] مفيدة مع الـ objects، مش مع الأنواع البسيطة.

---

## الخلاصة

| تكتب | يعني |
|---|---|
| [[string | number]] | نص أو رقم |
| [["a" | "b"]] | واحدة من القيم دي بالظبط |
| [[User | null]] | ممكن ميبقاش فيه User |
| [[A & B]] | كل خانات A وكل خانات B |

- مع union اسأل بـ [[typeof]] (أو مقارنة) قبل ما تستخدم حاجة خاصة بنوع واحد.
- في Python 3.10+ نفس [[|]]: [[int | None]].`,
          lines: [
            R`Id ممكن تبقى نص أو رقم.`,
            R`union من ٣ قيم نصية بالظبط.`,
            R`متغير لازم يبقى واحدة من التلاتة.`,
            R`intersection: كل خانات User ومعاها permissions.`,
            R`دالة بتاخد Id.`,
            R`narrowing: جوه الـ if TS عارف إنها string.`,
            R`هنا TS عارف إنها number.`,
            R`قفلة الدالة.`
          ],
          sol: R`[[let s: Status = "loding"]] ← [[Type '"loding"' is not assignable to type 'Status'. Did you mean '"loading"'?]]. و [[id.toUpperCase()]] برة الـ if ← [[Property 'toUpperCase' does not exist on type 'Id'.]] وتحتها [[Property 'toUpperCase' does not exist on type 'number'.]] (لأن id ممكن تبقى رقم).`
        },
        {
          cmd: "name?:  و  x!",
          title: "الـ ?: خانة اختيارية في TypeScript، و ! بعد قيمة يعني «أنا متأكد إنها مش null»",
          desc: R`[[email?: string]] في نوع أو interface معناها الخانة دي ممكن متكونش موجودة. نوعها الحقيقي [[string | undefined]]. ونفس الحكاية في parameters الدالة: [[function f(name?: string)]].

[[x!]] (non-null assertion) بعد قيمة معناها «يا TypeScript، صدّقني القيمة دي مش null ولا undefined». [[document.getElementById("app")!]].

الـ [[!]] دي مبتعملش أي فحص وقت التشغيل، بتسكّت الـ compiler بس. لو طلعت null فعلًا البرنامج هيقع. والـ [[!]] قبل قيمة ([[!x]]) معناها not، وده غير دي خالص. وفي Kotlin [[!!]] و Swift [[!]] فكرة قريبة بس بيعملوا فحص ويوقعوا البرنامج بشكل واضح.`,
          example: R`interface User {
  id: number;
  email?: string;
}
const u: User = { id: 1 };
console.log(u.email?.length);
const app = document.getElementById("app")!;`,
          flag: "script",
          try: R`في Playground اكتب الـ interface وبعدين [[u.email.length]] من غير [[?.]] واقرا الـ error. بعدين جرّب [[u.email!.length]] وفكّر هيحصل إيه وقت التشغيل.`,
          deep: {
            why: R`أغلب الداتا فيها خانات مش دايمًا موجودة. و [[!]] منتشرة في الكود بس لازم تعرف إنها وعد منك مش ضمان.`,
            how: R`[[?:]] بتضيف [[undefined]] لنوع الخانة وبتسمح إنها تتشال. [[!]] بتشيل null و undefined من النوع وقت الفحص بس، والـ JS اللي بيطلع مفيهوش أي أثر ليها.`,
            when: R`[[?:]] لأي خانة اختيارية. [[!]] بس لما انت متأكد فعلًا (عنصر HTML موجود في الصفحة دايمًا مثلًا)، وغير كده افحص بـ if أو [[?.]].`,
            mistakes: R`تحط [[!]] في كل حتة عشان تسكت الأخطاء: كده لغيت فايدة TypeScript. وتخلط بين [[?:]] في النوع و [[?.]] في الاستخدام و [[? :]] في الـ ternary.`
          },
          teach: R`## الفكرة: «ممكن متكونش موجودة» و «صدّقني موجودة»

| الرمز | مكانه | معناه |
|---|---|---|
| [[?:]] | في تعريف نوع، بعد اسم الخانة | الخانة اختيارية |
| [[!]] | بعد قيمة | «أنا متأكد إنها مش null ولا undefined» (non-null assertion) |

المثال TypeScript، وفحصناه بـ [[tsc]] 7.0 مع [[--strict]] و [[--lib es2022,dom]] (عشان يعرف [[document]] بتاع المتصفح)، وشغّلنا الأجزاء اللي مش محتاجة متصفح بـ Node 24 على ويندوز.

---

## ١. [[interface]] فيه خانة اختيارية

~~~ts
interface User {
  id: number;
  email?: string;
}
~~~

- [[interface User { ... }]]: بيوصف **شكل** object اسمه User (أنواع بس، مفيش قيم).
- [[id: number;]]: خانة إجبارية رقم.
- [[email?: string;]]: علامة الاستفهام **قبل** النقطتين بتقول إن الخانة ممكن متبقاش موجودة. يعني نوعها الحقيقي [[string | undefined]].

---

## ٢. object من غير الخانة الاختيارية

~~~ts
const u: User = { id: 1 };
~~~

TS موافق لأن [[email]] اختيارية. لو شيلت [[id]] كان هيعترض.

---

## ٣. لازم تتعامل مع إنها ممكن تبقى فاضية

~~~ts
console.log(u.email?.length);
~~~

~~~text الناتج
undefined
~~~

[[?.]] (درس في «رموز المنطق») بتقف لو email مش موجودة. ولو كتبت النقطة العادية:

~~~ts
console.log(u.email.length);
~~~

~~~text ناتج tsc
error TS18048: 'u.email' is possibly 'undefined'.
~~~

TS بيقولك: email ممكن تبقى undefined، فمينفعش تدخل جواها كده.

---

## ٤. [[!]] بعد القيمة

~~~ts
const app = document.getElementById("app")!;
~~~

- [[document.getElementById("app")]] بتدوّر في الصفحة على عنصر الـ id بتاعه [[app]]، ولو ملقتهوش بترجّع [[null]]. فنوع الناتج [[HTMLElement | null]].
- [[!]] في الآخر بتقول لـ TS «شيل الـ null من النوع».

الفرق في الأنواع اللي [[tsc]] استنتجها (من ملف [[.d.ts]] اللي طلّعه بـ [[--declaration]]):

~~~text out/g.d.ts
declare const app: HTMLElement;
declare const app2: HTMLElement | null;
~~~

[[app]] (بالـ [[!]]) نوعها [[HTMLElement]] بس، و [[app2]] (من غيرها) [[HTMLElement | null]]. ولو استخدمت [[app2]] على طول:

~~~ts
const app2 = document.getElementById("app");
app2.textContent = "x";
~~~

~~~text ناتج tsc
error TS18047: 'app2' is possibly 'null'.
~~~

---

## ٥. [[!]] مبتعملش أي فحص وقت التشغيل

ده الـ JavaScript اللي طلع من المثال:

~~~javascript
const u = { id: 1 };
console.log(u.email?.length);
const app = document.getElementById("app");
~~~

الـ [[!]] **اختفت**. يعني هي وعد منك للـ compiler بس. وجرّبنا وعد كداب:

~~~ts
console.log(u.email!.length);
~~~

[[tsc]] سكت خالص، ولما شغّلنا الناتج:

~~~text الناتج
TypeError: Cannot read properties of undefined (reading 'length')
~~~

email مش موجودة فعلًا، فالبرنامج وقع. TS كان هيمسكها لولا الـ [[!]].

---

## ٦. [[?]] في parameters الدالة

~~~ts
function f(name?: string) { return name; }
f();
~~~

عدّت من غير error: [[name?]] معناها الـ argument ده ممكن ميتبعتش، وقيمته ساعتها [[undefined]].

---

## الخلاصة

| الشكل | فين | معناه |
|---|---|---|
| [[email?: string]] | تعريف نوع | خانة اختيارية |
| [[u.email?.length]] | استخدام | ادخل لو موجودة |
| [[x!]] | بعد قيمة | صدّقني مش null (من غير فحص) |
| [[!x]] | قبل قيمة | not (عكس)، حاجة تانية خالص |
| [[a ? b : c]] | قيمة | ternary |

استخدم [[!]] بس لما تبقى متأكد فعلًا (عنصر HTML موجود في الصفحة دايمًا مثلًا)، وغير كده افحص بـ if أو [[?.]].`,
          lines: [
            R`interface بيوصف شكل User.`,
            R`id إجباري.`,
            R`email اختياري: ممكن ميبقاش موجود.`,
            R`قفلة الـ interface.`,
            R`object من غير email، و TS موافق.`,
            R`لازم [[?.]] لأن email ممكن تبقى undefined: هنا [[undefined]].`,
            R`[[!]] في الآخر: النوع بقى HTMLElement من غير null.`
          ],
          sol: R`[[u.email.length]] ← [['u.email' is possibly 'undefined'.]]. و [[u.email!.length]] ← TS يسكت، لكن وقت التشغيل هيقع بـ [[TypeError: Cannot read properties of undefined (reading 'length')]] لأن email مش موجودة فعلًا.`
        },
        {
          cmd: "@decorator",
          title: "علامة @ قبل اسم فوق كلاس أو دالة: decorator، بيضيف سلوك أو معلومات من غير ما تعدّل الكود",
          desc: R`[[@]] (at) قبل اسم وفوق كلاس أو دالة أو خانة اسمها decorator. بيلف الحاجة اللي تحته ويضيف لها حاجة: تسجيل، أو صلاحيات، أو معلومات للـ framework.

في Python: [[@app.get("/users")]] في FastAPI بتسجّل الدالة كـ route، و [[@staticmethod]] و [[@property]] جاهزين في اللغة. في TypeScript و Angular: [[@Component({...})]] و [[@Injectable()]]. وفي NestJS: [[@Controller()]] و [[@Get()]].

وفي Java و Kotlin نفس الشكل اسمه annotation ([[@Override]])، ودرسه في المستوى ٣. و [[@]] في أماكن تانية: في الإيميل، وفي npm [[@scope/package]]، وفي CSS [[@media]]، وفي Python بين مصفوفتين [[a @ b]] ضرب مصفوفات.`,
          example: R`# Python: decorator بيقيس الوقت
import time
def timed(fn):
    def wrapper(*args):
        start = time.time()
        result = fn(*args)
        print(fn.__name__, time.time() - start)
        return result
    return wrapper
@timed
def slow():
    time.sleep(0.5)
slow()`,
          flag: "script",
          try: R`احفظ المثال في [[deco.py]] وشغّله بـ [[python3 deco.py]]. بعدين امسح سطر [[@timed]] وشغّله تاني وقارن.`,
          deep: {
            why: R`الـ frameworks الكبيرة (FastAPI و Flask و Angular و NestJS و Spring) مبنية عليها. لو مش فاهم إن [[@app.get]] بتسجّل الدالة، هتحس إن الكود بيشتغل بالسحر.`,
            how: R`في Python [[@timed]] فوق [[def slow]] هي بالظبط [[slow = timed(slow)]]: الدالة اتبعتت للـ decorator، واللي رجع (wrapper) أخد مكانها. في TypeScript الفكرة قريبة وبتتنفذ وقت تعريف الكلاس.`,
            when: R`إنك تستخدمها: كل يوم مع الـ frameworks. إنك تكتب واحدة بنفسك: لما نفس الكود (تسجيل أو cache أو فحص صلاحية) بيتكرر حوالين دوال كتير.`,
            mistakes: R`تحط سطر فاضي أو كود بين الـ decorator والدالة. وتنسى الأقواس لما الـ decorator محتاجها ([[@Injectable()]] مش [[@Injectable]] في Angular). وفي TypeScript القديم لازم [[experimentalDecorators]] في tsconfig لـ Angular وNest.`
          },
          teach: R`## الفكرة: [[@اسم]] فوق دالة = «لفّ الدالة دي بالاسم ده»

الـ decorator دالة بتاخد دالتك، وترجّع دالة جديدة بتعمل نفس الشغل **وزيادة** (تسجيل، قياس وقت، فحص صلاحية...). وعلامة [[@]] (بتتقري at) هي الاختصار اللي بيركّبها. المثال Python، وشغّلناه بـ Python 3.14 على ويندوز ([[python deco.py]]).

---

## ١. السطر الأول: تعليق

~~~python
# Python: decorator بيقيس الوقت
~~~

[[#]] في Python تعليق لحد آخر السطر.

---

## ٢. [[import time]]

~~~python
import time
~~~

بيجيب مكتبة [[time]] اللي جاية مع Python. منها هنستخدم [[time.time()]] (الوقت دلوقتي بالثواني كرقم عشري) و [[time.sleep()]] (استنى).

---

## ٣. الـ decorator نفسه

~~~python
def timed(fn):
    def wrapper(*args):
        start = time.time()
        result = fn(*args)
        print(fn.__name__, time.time() - start)
        return result
    return wrapper
~~~

دي دالة جوه دالة. نفكّها:

| السطر | معناه |
|---|---|
| [[def timed(fn):]] | دالة اسمها timed بتاخد **دالة** في parameter اسمه fn |
| [[def wrapper(*args):]] | جواها بنعرّف دالة جديدة. [[*args]] بتلم أي arguments تيجي في tuple (درس [[*args]] في رموز Python) |
| [[start = time.time()]] | سجّل وقت البداية |
| [[result = fn(*args)]] | شغّل الدالة الأصلية بنفس الـ arguments، و [[*]] هنا بتفردهم تاني |
| [[print(fn.__name__, time.time() - start)]] | اطبع اسم الدالة الأصلية ([[__name__]] خانة فيها اسم أي دالة)، والوقت اللي عدّى = دلوقتي ناقص البداية |
| [[return result]] | رجّع ناتج الأصلية زي ما هو، عشان اللي نادى ميحسّش بفرق |
| [[return wrapper]] | timed بترجّع الدالة الجديدة (من غير أقواس: الدالة نفسها مش تشغيلها) |

المسافات في أول السطور هي اللي بتحدد مين جوه مين: [[wrapper]] جوه [[timed]]، والسطور الأربعة جوه [[wrapper]].

---

## ٤. [[@timed]]

~~~python
@timed
def slow():
    time.sleep(0.5)
~~~

- [[def slow():]] دالة بتستنى نص ثانية ومبترجّعش حاجة.
- [[@timed]] اللي فوقها بالظبط معناها، بعد تعريف slow على طول:

~~~python
slow = timed(slow)
~~~

يعني الاسم [[slow]] بقى بيشاور على [[wrapper]]، والـ slow الأصلية بقت جوه wrapper في [[fn]]. ولازم الـ [[@]] يبقى **فوق الدالة على طول**، من غير سطر كود بينهم.

---

## ٥. النداء

~~~python
slow()
~~~

~~~text الناتج
slow 0.5002429485321045
~~~

اللي حصل بالترتيب:

1. [[slow()]] نادت wrapper فعليًا.
2. wrapper سجّلت الوقت، وشغّلت الأصلية (نامت نص ثانية).
3. طبعت [[slow]] (الاسم الأصلي من [[fn.__name__]]) والوقت.

ليه [[0.5002]] مش [[0.5]] بالظبط؟ لأن [[sleep]] بتستنى **على الأقل** المدة دي، وفيه جزء صغير من الثانية بيضيع في تشغيل الكود نفسه ورجوع النظام للبرنامج. الرقم هيختلف شوية كل مرة.

ولو مسحت سطر [[@timed]] وشغّلت تاني، مش هيتطبع حاجة: الدالة هتستنى نص ثانية وخلاص.

### نفس الشغل من غير [[@]]

~~~python
def add(a, b):
    return a + b
add = timed(add)
print(add(2, 3))
~~~

~~~text الناتج
add 9.5367431640625e-07
5
~~~

السطر [[add = timed(add)]] هو اللي [[@timed]] بيعمله. والوقت هنا [[9.5e-07]] يعني 0.00000095 ثانية (الـ [[e-07]] معناها اضرب في 10 أس سالب 7)، لأن الجمع سريع جدًا. و [[5]] ناتج الأصلية رجع سليم.

---

## ٦. ملاحظة: الاسم اتغيّر

~~~python
print(slow.__name__)
~~~

~~~text الناتج
wrapper
~~~

بعد اللف، [[slow]] هي wrapper فعلًا. في الكود الحقيقي بيحطوا [[@functools.wraps(fn)]] فوق [[def wrapper]] عشان تحتفظ باسم الأصلية ووصفها.

---

## ٧. [[@]] في أماكن تانية

| فين | مثال | المعنى |
|---|---|---|
| Python (FastAPI) | [[@app.get("/users")]] | سجّل الدالة كـ route |
| Python | [[@staticmethod]] و [[@property]] | decorators جاهزة في اللغة |
| TypeScript (Angular و NestJS) | [[@Component({...})]] و [[@Get()]] | معلومات للـ framework عن الكلاس أو الـ method |
| Java و Kotlin | [[@Override]] | annotation: معلومة للـ compiler |
| npm | [[@scope/package]] | اسم package تبع منظمة |
| CSS | [[@media]] | قاعدة خاصة |
| Python بين مصفوفتين | [[a @ b]] | ضرب مصفوفات |

لاحظ إن [[@timed]] من غير أقواس لأن timed بتاخد الدالة على طول. لما الـ decorator محتاج إعدادات بيتكتب بأقواس ([[@app.get("/users")]]): ده نداء بيرجّع decorator.

---

## الخلاصة

- [[@d]] فوق [[def f]] = [[f = d(f)]].
- الـ decorator دالة بتاخد دالة وترجّع دالة (غالبًا wrapper بتنادي الأصلية جواها).
- بتضيف سلوك حوالين الدالة من غير ما تلمس الكود بتاعها.`,
          lines: [
            R`استورد time.`,
            R`الـ decorator: دالة بتاخد دالة.`,
            R`دالة جديدة بتلف الأصلية.`,
            R`سجّل وقت البداية.`,
            R`شغّل الأصلية.`,
            R`اطبع اسمها والوقت اللي خدته.`,
            R`رجّع ناتج الأصلية.`,
            R`رجّع الدالة اللافة.`,
            R`[[@timed]] = [[slow = timed(slow)]].`,
            R`الدالة الأصلية.`,
            R`بتستنى نص ثانية.`,
            R`النداء دلوقتي بيعدّي على wrapper.`
          ],
          sol: R`مع [[@timed]] هيطبع [[slow 0.50...]] (الاسم والوقت). من غيرها مش هيطبع حاجة، الدالة هتستنى نص ثانية بس.`
        },
        {
          cmd: "#field",
          title: "الـ # قبل اسم خانة في كلاس JavaScript: خانة private حقيقية محدش يوصلها من برة",
          desc: R`في JS الحديث [[#count]] جوه class معناها خانة private: تقدر تستخدمها جوه الكلاس بس بـ [[this.#count]]، ولو حاولت من برة [[obj.#count]] بيطلع SyntaxError.

ده غير [[private]] في TypeScript: دي فحص وقت الكتابة بس، والخانة لسه موجودة عادي في الـ JS. الـ [[#]] حماية حقيقية وقت التشغيل.

قبل [[#]] الناس كانت بتكتب [[_count]] بشرطة تحتية كعُرف «متلمسش»، بس ده مجرد اتفاق ومش حماية. و [[#]] في JS مش تعليق (التعليق [[//]])، وفي CSS [[#id]] selector، وفي URL جزء بعد الـ hash.`,
          example: R`class Counter {
  #count = 0;
  increment() {
    this.#count++;
    return this.#count;
  }
}
const c = new Counter();
c.increment();
console.log(c.count);`,
          flag: "script",
          try: R`انسخ الكلاس في الـ Console، واعمل [[const c = new Counter()]] ونادي [[c.increment()]] مرتين. بعدين جرّب [[c.#count]] واقرا الـ error.`,
          deep: {
            why: R`عشان تحمي حالة الـ object الداخلية: محدش يكتب [[c.count = -5]] من برة ويبوّظ المنطق. الـ API بتاعك يبقى الـ methods بس.`,
            how: R`الـ engine بيحجز الخانة دي جوه الكلاس بشكل مخفي، والاسم مش string عادي فمفيش [[obj["#count"]]] ولا بتظهر في [[Object.keys]] ولا [[JSON.stringify]]. ولازم تتعرّف في جسم الكلاس قبل ما تستخدمها.`,
            when: R`في الكلاسات اللي ليها حالة داخلية مش عايز حد يعدّلها مباشرة. وفيه [[#method()]] كمان لدوال داخلية.`,
            mistakes: R`تفتكر [[#]] تعليق زي Python. وتستخدم [[this.#x]] من غير ما تعرّف [[#x]] في الكلاس (SyntaxError). وتفتكر [[_x]] محمية.`
          },
          teach: R`## الفكرة: [[#]] جزء من اسم الخانة، ومعناه «جوه الكلاس بس»

في كلاس JavaScript، الخانة اللي اسمها بيبدأ بـ [[#]] اسمها **private field**: الكود اللي جوه الكلاس بيشوفها، وأي كود برة مش بيقدر يوصلها خالص. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

---

## ١. الكلاس

~~~javascript
class Counter {
  #count = 0;
  increment() {
    this.#count++;
    return this.#count;
  }
}
~~~

| السطر | معناه |
|---|---|
| [[class Counter {]] | قالب اسمه Counter بنعمل منه objects |
| [[#count = 0;]] | خانة private قيمتها الأولى 0. لازم تتعرّف هنا قبل ما تستخدمها |
| [[increment() {]] | method عامة (أي حد يناديها) |
| [[this.#count++;]] | [[this]] = الـ object الحالي، و [[++]] تزوّد واحد. جوه الكلاس مسموح |
| [[return this.#count;]] | رجّع القيمة الجديدة |

---

## ٢. من برة

~~~javascript
const c = new Counter();
c.increment();
console.log(c.count);
~~~

~~~text الناتج
undefined
~~~

- [[new Counter()]] عملت object جديد، و [[#count]] فيه بـ 0.
- [[c.increment()]] زوّدتها لـ 1 (السطر ده رجّع 1 بس مطبعناهوش).
- [[c.count]] (من غير [[#]]) دي خانة **تانية** اسمها count، ومش موجودة، فـ [[undefined]]. الـ [[#]] جزء من الاسم، مش زينة.

ولو ناديت تاني وطبعت:

~~~javascript
console.log(c.increment());
~~~

~~~text الناتج
2
~~~

القيمة اتحفظت جوه: كانت 1 وبقت 2.

---

## ٣. لو حاولت توصلها من برة

~~~javascript
console.log(c.#count);
~~~

~~~text الناتج
SyntaxError: Private field '#count' must be declared in an enclosing class
~~~

الرسالة: الخانة دي لازم تبقى متعرّفة في كلاس **حوالين** السطر ده. السطر ده برة الكلاس، فمرفوض. ولاحظ إنه **SyntaxError**: الملف كله مش بيشتغل، مش السطر ده بس. ونفس الرسالة لو استخدمت [[this.#x]] جوه كلاس من غير ما تعرّف [[#x]] فيه.

وكمان مستخبية من كل الطرق التانية:

~~~javascript
console.log(Object.keys(c), JSON.stringify(c), c["#count"]);
~~~

~~~text الناتج
[] {} undefined
~~~

[[Object.keys]] (أسماء الخانات) فاضية، و [[JSON.stringify]] (تحويل لـ JSON) فاضي، و [[c["#count"]]] بيدوّر على خانة عادية اسمها النص ده ومش لاقيها.

---

## ٤. ليه ده مهم: محدش يبوّظ الحالة

~~~javascript
c.count = -5;
console.log(c.increment(), c);
~~~

~~~text الناتج
3 Counter { count: -5 }
~~~

[[c.count = -5]] عملت خانة عامة جديدة اسمها count، والعدّاد الحقيقي [[#count]] متأثرش وكمّل لـ 3.

قارن بالعرف القديم [[_count]]:

~~~javascript
class P { _count = 0; }
const p = new P();
p._count = -5;
console.log(p._count);
~~~

~~~text الناتج
-5
~~~

الشرطة التحتية مجرد اتفاق بين المبرمجين «متلمسش»، واللغة مش بتمنع حاجة.

---

## ٥. [[#]] ضد [[private]] في TypeScript

~~~ts
class T { private count = 0; }
const t = new T();
console.log(t.count);
~~~

~~~text ناتج tsc 7.0
error TS2341: Property 'count' is private and only accessible within class 'T'.
~~~

TS اعترض، بس بص على الـ JavaScript اللي طلع:

~~~javascript
class T {
    count = 0;
}
~~~

كلمة [[private]] اتشالت، ولما شغّلناه طبع [[0]] عادي. يعني [[private]] فحص وقت الكتابة بس، و [[#]] حماية حقيقية وقت التشغيل.

---

## الخلاصة

| الشكل | مين بيمنع | وقت إيه |
|---|---|---|
| [[#count]] | JavaScript نفسها | وقت التشغيل |
| [[private count]] | TypeScript compiler | وقت الكتابة بس |
| [[_count]] | محدش، عرف | |

- [[#]] في JS **مش** تعليق (التعليق [[//]]). وفي CSS [[#id]] selector، وفي URL الجزء بعد الـ hash.`,
          lines: [
            R`كلاس.`,
            R`خانة private قيمتها الأولى 0.`,
            R`method عامة.`,
            R`جوه الكلاس عادي تستخدمها بـ [[this.#]].`,
            R`رجّع القيمة.`,
            R`قفلة الـ method.`,
            R`قفلة الكلاس.`,
            R`object جديد.`,
            R`زوّد واحد.`,
            R`[[c.count]] (من غير #) خانة تانية مش موجودة: [[undefined]].`
          ],
          sol: R`[[c.increment()]] ← [[1]] ثم [[2]]. و [[c.#count]] ← [[SyntaxError: Private field '#count' must be declared in an enclosing class]].`
        },
        {
          cmd: "$  و  _",
          title: "علامة $ والشرطة التحتية _ في أسماء المتغيرات: مسموحين، وليهم أعراف معروفة",
          desc: R`في JS أسماء المتغيرات ممكن يبقى فيها [[$]] و [[_]] زي أي حرف. عشان كده [[$]] لوحدها اسم دالة في jQuery [[$("#btn")]]، و [[_]] اسم مكتبة lodash [[_.debounce]].

أعراف هتشوفها: [[_name]] يعني «خاص، متلمسوش من برة» (اتفاق مش حماية). [[_]] لوحدها في parameter يعني «مش هستخدمه»: [[arr.map((_, i) => i)]]. و [[user$]] في Angular و RxJS يعني ده Observable. و [[$el]] في Vue خانات خاصة بالـ framework.

في Python: [[_x]] خاص بالاتفاق، و [[__x]] بيتغيّر اسمه جوه الكلاس، و [[__init__]] (dunder) دوال خاصة باللغة. وفي PHP و Perl و bash الـ [[$]] قبل أي متغير إجبارية. وفي Go الـ [[_]] بتتجاهل قيمة.`,
          example: R`const $btn = document.querySelector("#save");
const _cache = new Map();
const indexes = ["a", "b"].map((_, i) => i);
const user$ = http.get("/api/user");
const MAX_SIZE = 100;`,
          flag: "script",
          try: R`في الـ Console اكتب [[const $ = 5; const _ = 10; $ + _]]. بعدين [[["x", "y", "z"].map((_, i) => i * 2)]].`,
          deep: {
            why: R`هتقرا كود فيه الرموز دي في الأسماء وتفتكر إنها operators. لما تعرف الأعراف، الاسم نفسه بيقولك معلومة عن المتغير.`,
            how: R`قواعد الأسماء في JS: تبدأ بحرف أو [[$]] أو [[_]]، وبعدها أرقام عادي. يعني [[$]] و [[_]] حروف من ناحية اللغة، والمعنى كله اتفاق بين المبرمجين.`,
            when: R`[[_]] للـ parameter اللي مش محتاجه. [[UPPER_SNAKE]] للثوابت. [[$]] بس لو المشروع ماشي على عرف (jQuery أو Observables).`,
            mistakes: R`تسمّي متغير [[$]] أو [[_]] في مشروع فيه jQuery أو lodash فتغطي عليهم. وتفتكر [[_private]] محمية. وفي Python تفتكر [[__x]] private حقيقية.`
          },
          teach: R`## الفكرة: [[$]] و [[_]] حروف عادية في الأسماء

في JavaScript اسم المتغير ممكن يبدأ بحرف أو [[$]] أو [[_]]، وبعدها حروف وأرقام. يعني [[$]] و [[_]] من ناحية اللغة **حروف** زي a و b، ومفيش أي معنى خاص. المعنى كله **عرف** بين المبرمجين: لما تشوفهم في اسم، الاسم بيقولك معلومة عن المتغير. المثال JavaScript، وشغّلناه بـ Node 24 على ويندوز.

> المثال بيستخدم [[document]] (من المتصفح) و [[http]] (من Angular)، ودول مش موجودين في Node، فعملنا نسخ بسيطة منهم عشان نشغّله.

---

## ١. [[$]] في أول الاسم: عنصر من الصفحة

~~~javascript
const $btn = document.querySelector("#save");
~~~

- [[document.querySelector("#save")]] بتدوّر في الصفحة على أول عنصر بيطابق الـ selector ده. و [[#save]] هنا CSS selector معناه «العنصر اللي الـ id بتاعه save» (مش تعليق ولا private field).
- [[$btn]]: الدولار في أول الاسم عرف قديم من أيام jQuery معناه «ده عنصر DOM» (عنصر من صفحة الـ HTML)، عشان تفرّقه عن [[btnText]] مثلًا.

---

## ٢. [[_]] في أول الاسم: داخلي

~~~javascript
const _cache = new Map();
~~~

[[new Map()]] بيعمل جدول مفاتيح وقيم فاضي. والشرطة التحتية في أول الاسم معناها «ده للاستخدام الداخلي، متلمسوش من برة». بس ده اتفاق: أي حد يقدر يقراه ويغيّره. للحماية الحقيقية في كلاس استخدم [[#]] (الدرس اللي فات).

---

## ٣. [[_]] لوحدها: «مش محتاجه»

~~~javascript
const indexes = ["a", "b"].map((_, i) => i);
console.log(indexes);
~~~

~~~text الناتج
[ 0, 1 ]
~~~

- [[map]] بتنادي الدالة على كل عنصر وبتبعتلها حاجتين: العنصر نفسه، وبعده رقمه (index).
- احنا عايزين الرقم بس، بس لازم نحط حاجة مكان الأول عشان نوصل للتاني. فسمّيناه [[_]]: اسم متغير عادي، والعرف إنه «مش هستخدمه».
- [[i]] الـ index، والدالة بترجّعه: [[0]] لـ "a" و [[1]] لـ "b".

---

## ٤. [[$]] في آخر الاسم: Observable

~~~javascript
const user$ = http.get("/api/user");
~~~

في Angular و RxJS، [[http.get]] مش بترجّع الداتا على طول، بترجّع **Observable**: حاجة هتطلّع قيمة (أو قيم) بعدين. والدولار في **آخر** الاسم عرف معناه «ده Observable مش القيمة نفسها»، فتعرف إنك محتاج تشترك فيه ([[subscribe]]) عشان توصل للداتا.

---

## ٥. حروف كبيرة و [[_]]: ثابت

~~~javascript
const MAX_SIZE = 100;
~~~

اسمه **UPPER_SNAKE_CASE**: حروف كبيرة والكلمات مفصولة بـ [[_]]. العرف ده معناه «قيمة ثابتة متحطة مرة واحدة في البرنامج» زي حدود وإعدادات.

### كل المثال مرة واحدة

~~~javascript
console.log($btn, _cache, indexes, user$, MAX_SIZE);
~~~

~~~text الناتج
{ selector: '#save' } Map(0) {} [ 0, 1 ] { observableOf: '/api/user' } 100
~~~

(أول وتالت قيمة من النسخ البسيطة اللي عملناها، و [[Map(0) {}]] يعني Map فيها صفر عناصر.)

---

## ٦. إثبات إنهم مجرد أسماء

~~~javascript
const $ = 5;
const _ = 10;
console.log($ + _);
~~~

~~~text الناتج
15
~~~

متغيرين أساميهم [[$]] و [[_]]، وجمعناهم. عشان كده jQuery اختارت [[$]] اسم لدالتها الرئيسية، و lodash اختارت [[_]]. ولو عرّفت متغير بنفس الاسم في مشروع فيه المكتبات دي، هتغطّي عليها.

وأسامي مش مسموحة:

~~~javascript
const 1abc = 1;
~~~

~~~text الناتج
SyntaxError: Invalid or unexpected token
~~~

الاسم مينفعش يبدأ برقم. و [[const my-var = 1]] بيطلّع [[SyntaxError: Missing initializer in const declaration]] لأن الشرطة [[-]] طرح، فـ JS قرت [[const my]] وبعدها [[- var]].

---

## ٧. في Python

~~~python
class A:
    def __init__(self):
        self._x = 1
        self.__y = 2
a = A()
print(a._x, a._A__y)
print(a.__y)
~~~

~~~text الناتج (Python 3.14)
1 2
AttributeError: 'A' object has no attribute '__y'
~~~

- [[_x]] عرف «داخلي» زي JS، ووصلناله عادي.
- [[__y]] (شرطتين) Python بيغيّر اسمها جوه الكلاس لـ [[_A__y]] (اسمها name mangling)، فـ [[a.__y]] مش لاقيها. بس لسه توصلها بالاسم الجديد، يعني مش private حقيقية.
- [[__init__]] (شرطتين قبل وبعد، اسمها dunder) دوال خاصة اللغة بتناديها لوحدها، [[__init__]] بتتنادي لما تعمل object جديد.

---

## الخلاصة

| الاسم | العرف |
|---|---|
| [[$btn]] | عنصر من الصفحة (DOM) |
| [[user$]] | Observable |
| [[_cache]] | داخلي، متلمسوش |
| [[(_, i) =>]] | parameter مش هستخدمه |
| [[MAX_SIZE]] | ثابت |
| [[$]] لوحدها و [[_]] لوحدها | غالبًا jQuery و lodash |

وفي PHP و Perl و bash الـ [[$]] قبل المتغير جزء من اللغة نفسها (مش عرف)، وفي Go الـ [[_]] بتتجاهل قيمة راجعة.`,
          lines: [
            R`[[$]] في أول الاسم: عرف إن ده عنصر من الـ DOM.`,
            R`[[_]] في أول الاسم: داخلي ومتلمسوش.`,
            R`[[_]] لوحدها: الـ parameter الأول مش محتاجينه، عايزين الـ index بس: [[[0, 1]]].`,
            R`[[$]] في الآخر: عرف Angular و RxJS إن ده Observable.`,
            R`حروف كبيرة و [[_]]: ثابت.`
          ],
          sol: R`[[$ + _]] ← [[15]] (مجرد متغيرين أساميهم غريبة). والـ map ← [[[0, 2, 4]]].`
        }
      ]
    }
]);

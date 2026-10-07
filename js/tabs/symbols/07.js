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
    }
]);

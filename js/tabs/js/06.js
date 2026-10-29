// تكملة تاب js: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/js/01.js (شرح حقول الدرس في أوله)
MORE("js", [
    {
      t: "الـ objects",
      l: 1,
      n: "تبني objects وتقرا منها وتنسخها وتلف عليها، و Map و Set و JSON، وليه التعديل في مكان بيظهر في مكان تاني",
      items: [
        {
          cmd: "object literal",
          title: "تعمل object وتقرا وتضيف وتمسح خصايص",
          desc: R`الـ object مجموعة مفاتيح وقيم بين [[{ }]]. بتقرا بالنقطة [[product.price]]، أو بالأقواس [[product["in-stock"]]] لو المفتاح فيه شرطة أو مسافة أو في متغير.

وفيه اختصارات هتشوفها في كل كود: [[{ name }]] بدل [[{ name: name }]] (shorthand)، و [[[key]: value]] لمفتاح اسمه في متغير (computed)، و [[describe() {}]] لـ method.

ولو هتقرا خاصية ممكن متكونش موجودة، [[?.]] (optional chaining) بترجّع undefined بدل ما ترمي error.`,
          example: R`const key = "color";
const name = "Mug";
const product = {
  name,
  price: 120,
  [key]: "red",
  "in-stock": true,
  describe() {
    return $__bt$__{this.name} بـ $__{this.price}$__bt;
  },
};
product.price;            // 120
product["in-stock"];      // true
product[key];             // "red"
product.size = "L";       // إضافة خاصية
delete product.size;      // مسح خاصية
"price" in product;       // true
product.discount?.value;  // undefined من غير error`,
          try: R`اطبع [[product.describe()]]. وبعدين جرّب [[product.discount.value]] من غير [[?.]] واقرا الـ error. وآخر حاجة: اعمل [[const f = product.describe; f()]] وشوف this راحت فين (هتفهمها في درس this).`,
          flag: "script",
          deep: {
            why: "كل حاجة تقريبًا objects: الـ user، والـ request، والـ props، والـ config، ورد الـ API. ومعظم الكود بيقرا ويبني objects.",
            how: R`المفاتيح دايمًا strings أو symbols. لو كتبت [[{ 1: "a" }]] المفتاح بقى [["1"]]. عشان كده لو محتاج مفاتيح من أي نوع (objects أو أرقام حقيقية) استخدم Map.

ترتيب المفاتيح: الأرقام الصحيحة الأول بالترتيب التصاعدي، وبعدين الـ strings بترتيب الإضافة.

[[?.]] بيوقف السلسلة أول ما يلاقي null أو undefined ويرجّع undefined. بيشتغل مع الـ methods كمان: [[user.getName?.()]]، ومع الأقواس: [[obj?.[key]]].

[[in]] بيسأل «المفتاح موجود؟» حتى لو قيمته undefined، وبيدوّر في الـ prototype كمان. [[Object.hasOwn(obj, key)]] بيسأل عن الـ object نفسه بس.

و [[delete]] بيشيل الخاصية فعلًا، مش زي [[obj.x = undefined]] اللي بيسيب المفتاح موجود وقيمته undefined.`,
            when: R`النقطة في العادي. الأقواس لما المفتاح في متغير أو فيه حروف غريبة. [[?.]] لداتا ممكن تكون ناقصة (رد API)، مش في كل سطر.`,
            mistakes: R`[[obj.key]] وانت قصدك [[obj[key]]] (المتغير): الأولى بتدوّر على مفتاح اسمه حرفيًا "key". وتحط [[?.]] في كل حتة فتخبّي bugs. و arrow function كـ method: this مش هتبقى الـ object. وتستخدم object كـ dictionary بمفاتيح من اليوزر: مفتاح زي [["__proto__"]] ممكن يعمل مشاكل (prototype pollution)، استخدم Map.`
          },
          teach: R`## الفكرة في سطرين

الـ object «شنطة» فيها حاجات ليها أسامي: كل حاجة **مفتاح** (key) و**قيمة** (value). المثال بيعمل object لمنتج اسمه product، وبعدين يقرا منه بكذا طريقة، ويضيف ويمسح، ويسأل «المفتاح ده موجود؟». كل الأرقام اللي تحت طالعة من تشغيل الكود في ملف [[app.js]] بـ Node 24 ([[node app.js]]) مع [[console.log]] حوالين كل سطر.

---

## ١. المتغيرين اللي فوق

~~~text app.js
const key = "color";
const name = "Mug";
~~~

[[const]] بيعمل متغير مينفعش يتربط بقيمة تانية. الاتنين strings عادية، بس هنستخدمهم جوه الـ object بطريقتين مختلفتين: [[key]] كـ **اسم مفتاح**، و [[name]] كـ **قيمة**.

---

## ٢. بناء الـ object سطر سطر

~~~text app.js
const product = {
  name,
  price: 120,
  [key]: "red",
  "in-stock": true,
  describe() {
    return $__bt$__{this.name} بـ $__{this.price}$__bt;
  },
};
~~~

### [[{ }]]: object literal

القوسين المعووجين بعد [[=]] معناهم «اعمل object جديد دلوقتي». و literal يعني إنك كاتب القيمة نفسها في الكود، زي ما [["Mug"]] string literal. وكل خاصية بتتفصل عن اللي بعدها بـ [[,]]. والفاصلة بعد آخر خاصية (trailing comma) مسموحة، وبتسهّل إضافة سطر جديد.

### [[name,]]: الـ shorthand

لما اسم المفتاح زي اسم المتغير بالظبط، مش لازم تكتبه مرتين. [[name,]] هي نفسها [[name: name,]]: مفتاح اسمه name، وقيمته قيمة المتغير name يعني [["Mug"]].

### [[price: 120]]: الشكل العادي

المفتاح على الشمال، و [[:]] ، والقيمة على اليمين. المفتاح من غير علامات تنصيص لأنه اسم عادي (حروف وأرقام و [[_]] و [[$]]).

### [[[key]: "red"]]: الـ computed key

الأقواس المربعة حوالين المفتاح معناها: «متاخدش الكلمة key حرفيًا، احسب قيمتها». قيمة [[key]] هي [["color"]]، فالخاصية اللي اتعملت اسمها color.

### [["in-stock": true]]: مفتاح بحروف غريبة

[[-]] في JS معناها طرح، فمينفعش تكتب [[in-stock: true]] من غير تنصيص. أي مفتاح فيه شرطة أو مسافة أو يبدأ برقم لازم يتكتب كـ string.

### [[describe() { ... }]]: method

دالة جوه object اسمها **method**. الشكل [[describe() {}]] اختصار لـ [[describe: function () {}]]. وجواها:

- [[this]]: الـ object اللي الـ method اتنادت عليه. لما تكتب [[product.describe()]]، اللي قبل النقطة هو product، فـ [[this.name]] تبقى [["Mug"]].
- [[$__bt...$__bt]] مع [[$__{...}]]: template literal (درس template literals)، بيحط القيم جوه النص.

لو طبعت الـ object كله:

~~~text الناتج: console.log(product)
{
  name: 'Mug',
  price: 120,
  color: 'red',
  'in-stock': true,
  describe: [Function: describe]
}
~~~

لاحظ إن [[[key]]] بقت [[color]] فعلًا، و Node بيكتب [['in-stock']] بين تنصيص عشان فيها شرطة.

---

## ٣. القراية بـ ٣ طرق

~~~text app.js
product.price;            // 120
product["in-stock"];      // true
product[key];             // "red"
~~~

| الشكل | معناه | الناتج |
|---|---|---|
| [[product.price]] | النقطة: المفتاح اسمه حرفيًا price | [[120]] |
| [[product["in-stock"]]] | الأقواس مع string: لازم هنا عشان الشرطة | [[true]] |
| [[product[key]]] | الأقواس مع متغير: اسم المفتاح هو قيمة key | [[red]] |

والفرق بين النقطة والأقواس مع المتغير هو أشهر لخبطة. جرّبتها:

~~~text الناتج
product.key        →  undefined
product[key]       →  red
~~~

[[product.key]] بتدوّر على مفتاح اسمه حرفيًا [["key"]]، ومفيش. ولو حاولت تقرا بالنقطة مفتاح فيه شرطة:

~~~text الناتج: product.in-stock
ReferenceError: stock is not defined
~~~

JS فهمها [[product.in - stock]]: يعني اقرا خاصية اسمها in واطرح منها متغير اسمه stock، والمتغير ده مش موجود.

---

## ٤. إضافة ومسح خاصية

~~~text app.js
product.size = "L";       // إضافة خاصية
delete product.size;      // مسح خاصية
~~~

- لو كتبت لخاصية مش موجودة، بتتعمل. فبعد السطر الأول [[product.size]] بقت [["L"]].
- بس استنى: product معمول بـ [[const]]! [[const]] بيمنع إنك تربط **المتغير** بـ object تاني ([[product = {}]] غلط)، لكن مش بيمنع إنك تعدّل **جوه** الـ object.
- [[delete]] بيشيل المفتاح نفسه. بعده [[product.size]] بترجع undefined و [["size" in product]] بترجع false.

---

## ٥. [[in]]: المفتاح موجود؟

~~~text app.js
"price" in product;       // true
~~~

[[in]] بترجّع true أو false. وفايدتها إنها بتفرّق بين «المفتاح مش موجود» و «موجود وقيمته undefined»:

~~~text الناتج
const p2 = { x: undefined };
"x" in p2   →  true
p2.x        →  undefined
~~~

---

## ٦. [[?.]]: optional chaining

~~~text app.js
product.discount?.value;  // undefined من غير error
~~~

اتقرا من الشمال: [[product.discount]] مش موجودة، فقيمتها undefined. من غير [[?.]]، قراية [[.value]] من undefined بترمي error:

~~~text الناتج: product.discount.value
TypeError: Cannot read properties of undefined (reading 'value')
~~~

الرسالة بتقولك بالظبط: حاولت تقرا [['value']] من حاجة undefined. أما [[?.]] فمعناها «لو اللي على الشمال null أو undefined، وقّف هنا ورجّع undefined». فالسطر بيطلع [[undefined]] بهدوء.

---

## ٧. الـ method و this

~~~text الناتج
product.describe()   →  Mug بـ 120
~~~

ولو فصلت الدالة عن الـ object ([[const f = product.describe; f()]]) الناتج في Node كان [[undefined بـ undefined]]: النداء مبقاش قبله [[product.]]، فـ this مبقتش product. ده موضوع درس this.

---

## الخلاصة

| الحاجة | الشكل | تفتكر إيه |
|---|---|---|
| shorthand | [[{ name }]] | = [[{ name: name }]] |
| computed key | [[{ [key]: v }]] | المفتاح = قيمة المتغير |
| مفتاح غريب | [[{ "in-stock": v }]] | تنصيص، وتقراه بالأقواس |
| method | [[describe() {}]] | this = اللي قبل النقطة |
| قراية بمتغير | [[obj[key]]] | مش [[obj.key]] |
| إضافة / مسح | [[obj.x = 1]] / [[delete obj.x]] | شغال مع const |
| موجود؟ | [["x" in obj]] | true حتى لو القيمة undefined |
| ممكن ناقص | [[obj.a?.b]] | undefined بدل TypeError |

> المفاتيح دايمًا strings (أو symbols): [[Object.keys({ 1: "a" })]] طلعت [[[ '1' ]]] والنوع string.`,
          lines: [
            R`اسم مفتاح محفوظ في متغير. هنستخدمه تحت كـ computed key، يعني اسم الخاصية نفسه هيتحدد وقت التشغيل من قيمة المتغير ده، مش وقت ما تكتب الكود.`,
            R`متغير عادي اسمه [[name]]. موجود هنا عشان نشوف الـ shorthand في السطر الرابع: لما اسم المتغير هو هو اسم الخاصية اللي عايز تعملها.`,
            R`بداية الـ object literal: الأقواس [[{ }]] بتعمل object جديد في الميموري، و [[product]] بيشاور عليه. الـ [[const]] بتمنع إن [[product]] يشاور على حاجة تانية، بس مش بتمنع تعديل اللي جواه.`,
            R`shorthand: لما المتغير والخاصية نفس الاسم بتكتب الاسم مرة واحدة، وده بالظبط زي [[name: name]]. فالخاصية [[name]] قيمتها [["Mug"]] اللي في المتغير.`,
            R`الشكل العادي: المفتاح وبعده [[:]] وبعده القيمة. المفتاح هنا string ([["price"]]) حتى لو مكتبتش علامات تنصيص، والفصلة بتفصل بين الخصايص.`,
            R`computed key: الأقواس المربعة معناها «احسب اسم المفتاح من اللي جوايا». [[key]] قيمته [["color"]]، فالخاصية اللي اتعملت اسمها [[color]] وقيمتها [["red"]]. من غير الأقواس هيبقى عندك خاصية اسمها حرفيًا [[key]].`,
            R`الاسم فيه شرطة فلازم يتكتب بين علامات تنصيص، لأن من غيرها JS هتفهم [[in-stock]] كـ «in ناقص stock» وتطلع SyntaxError. وهتقراه بعدين بالأقواس المربعة بس، مش بالنقطة.`,
            R`method بالشكل المختصر: ده نفس [[describe: function () {}]] بس أقصر. الـ method هي دالة متخزنة كخاصية في الـ object، وبتتنادى بـ [[product.describe()]].`,
            R`بترجّع نص مبني من خصايص الـ object. [[this]] هنا هو الـ object اللي قبل النقطة وقت النداء، فـ [[product.describe()]] بتطلع [["Mug بـ 120"]]. لو خدت الدالة في متغير وناديتها لوحدها [[this]] بيضيع (الـ sol فيه التفاصيل).`,
            R`نهاية [[describe]]. الفصلة اللي بعدها مسموحة حتى لو دي آخر خاصية (trailing comma)، وبتسهّل إنك تضيف خاصية بعدها من غير ما تنسى فصلة.`,
            R`نهاية الـ object. دلوقتي [[product]] فيه خمس خصايص: [[name]] و [[price]] و [[color]] و [["in-stock"]] و [[describe]].`,
            R`قراية بالنقطة: أوضح طريقة، وبتنفع لما اسم الخاصية معروف وانت بتكتب الكود ومفيهوش رموز زي الشرطة أو المسافة.`,
            R`قراية بالأقواس المربعة واسم الخاصية string، ولازم هنا عشان الشرطة: [[product.in-stock]] بالنقطة بتتقري طرح ([[product.in]] ناقص [[stock]]) وترمي ReferenceError لأن [[stock]] مش متعرّف.`,
            R`الأقواس المربعة بتقبل متغير كمان: [[key]] قيمته [["color"]] فده نفس [[product.color]] ويرجّع [["red"]]. خلي بالك: [[product.key]] بالنقطة بتدوّر على خاصية اسمها حرفيًا [[key]] وترجّع [[undefined]].`,
            R`إضافة خاصية بعد الإنشاء: أول ما تدّي قيمة لخاصية مش موجودة بتتعمل. ومسموح مع [[const]] لأنك بتعدّل جوه الـ object مش بتغيّر [[product]] نفسه. لو عايز تمنع ده فيه [[Object.freeze]].`,
            R`[[delete]] بتشيل الخاصية من الـ object خالص، فبعدها [[product.size]] بترجّع [[undefined]] و [[Object.keys]] مش هتشوفها. ده غير إنك تكتب [[product.size = undefined]]: ساعتها المفتاح بيفضل موجود وقيمته فاضية.`,
            R`[[in]] بتسأل «المفتاح ده موجود؟» وترجّع [[true]] أو [[false]]، وده أدق من [[if (product.price)]] اللي هتقول لأ لو السعر [[0]]. بس خلي بالك إنها بتعد الخصايص الموروثة كمان: [["toString" in product]] بترجّع [[true]].`,
            R`[[discount]] مش موجودة فقيمتها [[undefined]]، و [[?.]] (optional chaining) بتوقف وترجّع [[undefined]] بدل ما تحاول تقرا [[value]] من [[undefined]]. من غيرها [[product.discount.value]] بترمي TypeError وتوقف البرنامج.`,
          ],
          sol: R`[[product.describe()]] بتطبع [["Mug بـ 120"]]. و [[product.discount.value]] بتطلع [[TypeError: Cannot read properties of undefined (reading 'value')]] لأن discount مش موجودة، فانت بتقرا value من undefined.

[[const f = product.describe; f()]] في ملف Node بترجّع [["undefined بـ undefined"]]: الدالة اتنادت من غير نقطة قبلها، فـ this مبقاش product. في ملف عادي (مش strict) this بيبقى globalThis ومفيهوش name ولا price. في Console المتصفح ممكن تشوف [[" بـ undefined"]] لأن [[window.name]] موجود وقيمته فاضية. ولو الكود strict (module أو class) هيطلع TypeError. التفاصيل في درس this.`
        },
        {
          cmd: "object destructuring و spread",
          title: "تفك خصايص في متغيرات، وتعمل نسخة معدّلة",
          desc: R`[[const { name, email } = user]] بتطلّع الخصايص في متغيرات بنفس الاسم. وتقدر تغيّر الاسم [[{ name: fullName }]]، وتحط default [[{ role = "user" }]]، وتلم الباقي [[{ password, ...safeUser }]].

و [[{ ...user, name: "New" }]] بتعمل object جديد فيه كل خصايص user، والـ name متغيرة. اللي بيتكتب في الآخر بيكسب. ودي الطريقة اللي بتعدّل بيها state في React.`,
          example: R`const user = { id: 1, name: "Sara", email: "s@example.com", password: "x" };
const { name, email } = user;
const { name: fullName, role = "user" } = user;
const { password, ...safeUser } = user;
const updated = { ...user, name: "Sara Ali" };
const userSettings = { lang: "en" };
const settings = { theme: "light", lang: "ar", ...userSettings };
function show({ name, address: { city } = {} }) {
  return $__bt$__{name} من $__{city ?? "مكان مش معروف"}$__bt;
}
show(user);   // "Sara من مكان مش معروف"`,
          try: R`اطبع [[safeUser]] واتأكد إن password مش فيه. وبعدين حط [[...userSettings]] في أول الـ object بدل آخره وشوف [[lang]] بقت إيه.`,
          flag: "script",
          deep: {
            why: R`بتقلل التكرار ([[user.name]] و [[user.email]] في كل سطر)، وبتخلي باراميترات الدوال والـ props في React واضحة من أول سطر. و [[...rest]] أنضف طريقة تشيل خاصية حساسة قبل ما تبعت الداتا.`,
            how: R`الـ destructuring بيدوّر على المفاتيح بالاسم (عكس الـ arrays بالترتيب). ولو المفتاح مش موجود القيمة undefined، والـ default بيشتغل.

التفكيك المتداخل [[{ address: { city } }]] بيعمل متغير [[city]] بس، مش [[address]]. ولو address نفسها undefined هيرمي TypeError، عشان كده [[= {}]].

الـ spread بينسخ الخصايص الخاصة بالـ object (own enumerable) بترتيبها، واللي بعده بيكتب فوقه. وهو shallow: [[updated.address]] هي نفس الـ object اللي في [[user.address]]. ومبينسخش getters كـ getters (بياخد قيمتها) ولا الـ prototype، فـ spread لـ instance من class بيطلّع object عادي من غير methods.`,
            when: R`في باراميترات الدوال والـ props، ولما تاخد جزء من رد API، ولما تعدّل state: [[setUser({ ...user, name })]]. وللقيم الافتراضية: [[{ ...defaults, ...options }]].`,
            mistakes: R`ترتيب الـ spread غلط فالـ defaults تمسح اختيارات اليوزر. وتفتكر إن [[{ ...user }]] نسخة عميقة وتعدّل [[copy.address.city]] فالأصل يتغير. وتفك من undefined فيرمي «Cannot destructure property 'x' of 'undefined' as it is undefined.». وتعمل [[const { password, ...rest }]] وتنسى إن [[password]] بقت متغير unused (عادي، أو سمّيه [[password: _]]).`
          },
          teach: R`## الفكرة في سطرين

**destructuring** يعني «فك»: بدل ما تكتب [[const name = user.name]] و [[const email = user.email]] كل واحدة في سطر، بتكتب الشكل اللي عايزه على الشمال و JS يطلّع القيم. و **spread** ([[...]]) العكس تقريبًا: بيفرد خصايص object جوه object جديد. كل النواتج تحت من تشغيل المثال في [[app.js]] بـ Node 24.

---

## ١. الـ object اللي هنفك منه

~~~text app.js
const user = { id: 1, name: "Sara", email: "s@example.com", password: "x" };
~~~

object عادي فيه ٤ خصايص، منهم [[password]] اللي مش عايزينها تطلع برّه.

---

## ٢. فك بسيط

~~~text app.js
const { name, email } = user;
~~~

لما [[{ }]] تيجي **على شمال** [[=]] معناها مش «اعمل object»، معناها «فك». JS بيدوّر في user على مفتاح اسمه name ويحطه في متغير اسمه name، ونفس الكلام لـ email. التدوير **بالاسم** مش بالترتيب: لو كتبت [[{ email, name }]] هتاخد نفس القيم.

~~~text الناتج: console.log(name, email)
Sara s@example.com
~~~

---

## ٣. تغيير الاسم والـ default

~~~text app.js
const { name: fullName, role = "user" } = user;
~~~

- [[name: fullName]]: اقرا المفتاح name، بس حطه في متغير اسمه **fullName**. اتعوّد تقراها «name ← fullName». ومفيش متغير اسمه name بيتعمل من السطر ده (وده كويس، لأن name معمول في السطر اللي فوق، ولو اتعمل تاني بـ const هيبقى SyntaxError).
- [[role = "user"]]: user مفيهوش role، فالقيمة كانت هتبقى undefined، و [[=]] هنا معناها «لو undefined خد دي».

~~~text الناتج: console.log(fullName, role)
Sara user
~~~

---

## ٤. [[...rest]]: لم الباقي

~~~text app.js
const { password, ...safeUser } = user;
~~~

[[password]] بيتفك لوحده، و [[...safeUser]] (لازم تكون الأخيرة) بتلم **كل اللي فضل** في object جديد:

~~~text الناتج: console.log(password, safeUser)
x { id: 1, name: 'Sara', email: 's@example.com' }
~~~

ده الشكل المعتاد عشان تشيل حقل حساس قبل ما ترجّع يوزر من API.

---

## ٥. spread: نسخة معدّلة

~~~text app.js
const updated = { ...user, name: "Sara Ali" };
~~~

هنا [[{ }]] **على يمين** [[=]]، يعني object جديد. و [[...user]] جواه معناها «انسخ كل خصايص user هنا»، وبعدين [[name: "Sara Ali"]] بتكتب فوق الـ name اللي اتنسخت:

~~~text الناتج: console.log(updated, user.name)
{ id: 1, name: 'Sara Ali', email: 's@example.com', password: 'x' } Sara
~~~

الأصل لسه [["Sara"]]: احنا معدّلناش user، عملنا object تاني.

---

## ٦. ترتيب الـ spread: الأخير بيكسب

~~~text app.js
const userSettings = { lang: "en" };
const settings = { theme: "light", lang: "ar", ...userSettings };
~~~

الـ object بيتبني من الشمال لليمين: theme بـ light، و lang بـ ar، وبعدين [[...userSettings]] بتحط lang بـ en فوق ar:

~~~text الناتج: console.log(settings)
{ theme: 'light', lang: 'en' }
~~~

ولو عكست وحطيت [[...userSettings]] في الأول:

~~~text الناتج
{ lang: 'ar', theme: 'light' }
~~~

اختيار اليوزر اتمسح. ولاحظ كمان إن lang بقت أول مفتاح: المفتاح بياخد مكانه من أول مرة اتحط فيها، والقيمة من آخر مرة.

---

## ٧. فك جوه باراميتر دالة

~~~text app.js
function show({ name, address: { city } = {} }) {
  return $__bt$__{name} من $__{city ?? "مكان مش معروف"}$__bt;
}
show(user);   // "Sara من مكان مش معروف"
~~~

نفكها من جوه لبرّه:

1. [[{ name, ... }]] مكان الباراميتر: الدالة بتاخد object وتفكه على طول.
2. [[address: { city }]]: فك متداخل. ادخل جوه address وطلّع city. المتغير اللي بيتعمل هو **city بس**، مفيش متغير اسمه address.
3. [[= {}]]: لو address مش موجودة، اعتبرها object فاضي. من غيرها جرّبت:

~~~text الناتج: نفس الدالة من غير = {}
TypeError: Cannot read properties of undefined (reading 'city')
~~~

4. [[city ?? "مكان مش معروف"]]: [[??]] (nullish coalescing) بترجّع اللي على اليمين لو الشمال null أو undefined بس.

~~~text الناتج
show(user)                                         →  Sara من مكان مش معروف
show({ name: "Omar", address: { city: "Cairo" } }) →  Omar من Cairo
show()                                             →  TypeError: Cannot destructure property 'name' of 'undefined' as it is undefined.
~~~

الأخيرة لأن مفيش object خالص يتفك. لو عايزها تشتغل، حط [[= {}]] للباراميتر كله كمان.

---

## الخلاصة

| الشكل | مكانه | معناه |
|---|---|---|
| [[const { a } = obj]] | شمال [[=]] | فك بالاسم |
| [[{ a: b }]] | شمال | اقرا a وسمّيه b |
| [[{ a = 1 }]] | شمال | default لو undefined |
| [[{ a, ...rest }]] | شمال | الباقي في object جديد |
| [[{ ...obj, a: 2 }]] | يمين | نسخة والأخير بيكسب |
| [[{ a: { b } = {} }]] | باراميتر | فك متداخل بأمان |

> الـ spread نسخة **سطحية**: لو جوه user فيه object تاني، النسخة والأصل بيشاوروا على نفس الـ object (الدرس الجاي).`,
          lines: [
            R`object فيه بيانات يوزر ومعاها [[password]]، ودي الخاصية اللي مش عايزينها تطلع في response ولا في log. هنستخدمه في كل السطور اللي جاية.`,
            R`destructuring: بيعمل متغيرين [[name]] و [[email]] وياخد قيمهم من الخصايص اللي بنفس الاسم في [[user]]، بدل سطرين [[const name = user.name]]. لو الاسم مش موجود في الـ object المتغير بيبقى [[undefined]] من غير error.`,
            R`[[name: fullName]] معناها «خد [[name]] وحطه في متغير اسمه [[fullName]]» (مفيدة هنا لأن [[name]] متعرّف في السطر اللي فوق). و [[role = "user"]] قيمة default اشتغلت لأن [[user]] مفيهوش [[role]]. الـ default بيشتغل مع [[undefined]] بس، مش مع [[null]].`,
            R`rest: [[password]] اتحط في متغير لوحده، و [[...safeUser]] لمّ كل الخصايص الباقية في object جديد. فـ [[safeUser]] فيه [[id]] و [[name]] و [[email]] من غير الباسورد، وده اللي تبعته للـ frontend. الـ [[...]] لازم تبقى آخر حاجة جوه الأقواس.`,
            R`spread: [[...user]] بينسخ كل خصايص [[user]] في object جديد، وبعدها [[name]] بتكتب فوق النسخة. الترتيب مهم: اللي بييجي بعد بيكسب. والأصل [[user]] متغيرش، وده اللي React محتاجه عشان يعرف إن الـ state اتغير.`,
            R`إعدادات اختارها اليوزر، وفيها اللغة بس. هنحطها فوق الإعدادات الافتراضية في السطر الجاي.`,
            R`الـ defaults الأول وبعدها [[...userSettings]]: أي مفتاح موجود في الاتنين بياخد قيمة اللي بعده، فـ [[lang]] بقت [["en"]] و [[theme]] فضلت [["light"]]. لو عكست الترتيب اختيارات اليوزر هتتداس تحت الـ defaults.`,
            R`الدالة بتفك الـ object اللي جايلها في الباراميتر نفسه: [[name]] من أول مستوى، و [[address: { city }]] بتدخل جوه [[address]] وتطلّع [[city]] بس ([[address]] نفسها مش بتبقى متغير). و [[= {}]] بتحمي من إن [[address]] تكون ناقصة: من غيرها هيحاول يفك [[undefined]] ويرمي TypeError.`,
            R`[[city]] هنا [[undefined]] لأن مفيش address، فـ [[??]] بتحط النص البديل. [[??]] بتشتغل مع [[null]] و [[undefined]] بس، عكس [[||]] اللي بتعتبر [[""]] و [[0]] فاضيين وتستبدلهم برضه.`,
            R`نهاية [[show]].`,
            R`بنبعت [[user]] كله والدالة بتاخد منه اللي محتاجاه بس. مفيش [[address]] فالـ [[= {}]] اشتغلت و [[city]] طلعت [[undefined]]، والناتج [["Sara من مكان مش معروف"]] من غير أي error.`,
          ],
          sol: R`[[safeUser]] بيطبع [[{ id: 1, name: "Sara", email: "s@example.com" }]] من غير password: الـ rest بياخد كل اللي فضل بعد اللي فكّيته. ودي الطريقة المعتادة تشيل حقل حساس قبل ما ترجّع اليوزر في API.

لما [[...userSettings]] يبقى في الأول، [[lang]] بتبقى [["ar"]] بدل [["en"]]: في الـ object literal آخر قيمة لنفس المفتاح هي اللي بتكسب. فالقاعدة: الـ defaults الأول، وإعدادات اليوزر في الآخر عشان تغطّي عليها. لو عكست الترتيب اختيار اليوزر هيتجاهل وده bug صعب تلاحظه.`
        },
        {
          cmd: "reference و copy",
          title: "ليه لما عدّلت النسخة الأصل اتغير؟",
          desc: R`المتغير اللي فيه object مش شايل الـ object نفسه، شايل reference (عنوان) ليه. [[const b = a]] مبتنسخش، بتخلي الاتنين يشاوروا على نفس الـ object.

[[{ ...a }]] و [[Object.assign]] بيعملوا نسخة سطحية (shallow): المستوى الأول جديد، بس أي object أو array جوه لسه مشتركة. للنسخة العميقة (deep) استخدم [[structuredClone(a)]]، وهي موجودة في كل المتصفحات و Node.

ونفس الكلام لما تبعت object لدالة: الدالة بتاخد نفس الـ reference، فأي تعديل جواها بيظهر برّه.`,
          example: R`const a = { name: "Sara", tags: ["js"] };
const b = a;
b.name = "Omar";
console.log(a.name);            // "Omar": a و b نفس الـ object
const shallow = { ...a };
shallow.tags.push("ts");
console.log(a.tags);            // ["js", "ts"]: الـ array اللي جوه مشتركة
const deep = structuredClone(a);
deep.tags.push("react");
console.log(a.tags);            // ["js", "ts"]: الأصل متلمسش
console.log({ x: 1 } === { x: 1 }); // false
function rename(obj) { obj.name = "X"; }
rename(a);
console.log(a.name);            // "X": الدالة عدّلت الأصل`,
          try: R`جرّب [[structuredClone({ date: new Date(), fn() {} })]] واقرا الـ error: الدوال مبتتنسخش. وبعدين جرّبها من غير [[fn]] واتأكد إن الـ Date رجعت Date. قارن ده بـ [[JSON.parse(JSON.stringify(...))]].`,
          flag: "script",
          deep: {
            why: R`أشهر مصدر bugs غريبة: «أنا معدّلتش الليستة دي!» بس عدّلت نسخة شايلة نفس الـ reference. وفي React الـ state لازم تتعمل جديدة، لأن React بيقارن بالـ reference ([[Object.is]])، فلو عدّلت في مكانها مش هيعمل render.`,
            how: R`الـ primitives بتتنسخ بالقيمة، والـ objects (ومنها arrays والدوال) بتتنسخ بالـ reference. JS دايمًا pass by value، بس «القيمة» في حالة الـ object هي الـ reference نفسه. عشان كده الدالة تقدر تعدّل جوه الـ object، بس لو عملت [[obj = {}]] جوه الدالة المتغير اللي برّه مش هيتأثر.

[[structuredClone]] بتستخدم نفس الخوارزمية اللي بتنقل الداتا بين workers: بتنسخ Date و Map و Set و RegExp و arrays متداخلة، وبتتعامل مع المراجع الدائرية (circular). ومبتنسخش الدوال ولا عناصر الـ DOM ولا الـ prototype (instance من class بترجع object عادي).

[[JSON.parse(JSON.stringify(x))]] الحل القديم: بيضيّع undefined والدوال، والـ Date بتبقى string، و NaN بتبقى null، ويقع على circular.`,
            when: R`نسخة سطحية للتعديل على المستوى الأول (أغلب تعديلات الـ state). [[structuredClone]] لما محتاج نسخة مستقلة تمامًا من داتا متداخلة. وفي React مع state متداخلة كبيرة ناس بتستخدم Immer.`,
            mistakes: R`تعمل [[const copy = original]] وتفتكرها نسخة. وتعدّل object اتبعتلك كـ argument (دالة بتعدّل مدخلاتها اسمها impure، وده صعب تتبّعه). وتستخدم JSON للنسخ العميق مع Dates. وفي الانترفيو: «pass by value ولا reference؟» و «shallow vs deep copy».`
          },
          teach: R`## الفكرة في سطرين

المتغير اللي فيه object مش شايل الـ object نفسه، شايل **reference**: عنوان بيقول «الـ object موجود هناك في الذاكرة». فلو نسخت المتغير، نسخت العنوان، والاتنين بيشاوروا على نفس الحاجة. المثال بيوري ٤ حالات: نسخ العنوان، ونسخة سطحية، ونسخة عميقة، ودالة بتعدّل اللي اتبعتلها. النواتج من تشغيله في Node 24.

---

## ١. [[const b = a]]: مش نسخة

~~~text app.js
const a = { name: "Sara", tags: ["js"] };
const b = a;
b.name = "Omar";
console.log(a.name);            // "Omar"
~~~

السطر التاني مبيعملش object جديد. فيه object **واحد** في الذاكرة، وعليه اسمين: a و b.

~~~text الناتج
Omar
a === b  →  true
~~~

[[===]] على objects بتسأل «نفس العنوان؟» مش «نفس المحتوى؟»، وهنا الجواب true.

---

## ٢. [[{ ...a }]]: نسخة سطحية (shallow)

~~~text app.js
const shallow = { ...a };
shallow.tags.push("ts");
console.log(a.tags);            // ["js", "ts"]
~~~

[[{ ...a }]] عملت object **جديد** ونسخت فيه خصايص a واحدة واحدة. بس قيمة tags نفسها reference لـ array، فاللي اتنسخ هو العنوان:

~~~text الناتج
shallow === a            →  false
shallow.tags === a.tags  →  true
a.tags بعد push          →  [ 'js', 'ts' ]
~~~

يعني المستوى الأول جديد (لو عملت [[shallow.name = "Mona"]] الأصل مش هيتأثر، جرّبتها و a.name فضلت Omar)، بس أي حاجة جوه مشتركة. و [[Object.assign({}, a)]] بتعمل نفس الحاجة بالظبط (tags برضه طلعت مشتركة).

---

## ٣. [[structuredClone(a)]]: نسخة عميقة (deep)

~~~text app.js
const deep = structuredClone(a);
deep.tags.push("react");
console.log(a.tags);            // ["js", "ts"]
~~~

[[structuredClone]] دالة جاهزة في المتصفحات و Node، بتنسخ كل مستوى، فالـ array اللي جوه بقت array جديدة:

~~~text الناتج
deep.tags === a.tags  →  false
a.tags                →  [ 'js', 'ts' ]
deep.tags             →  [ 'js', 'ts', 'react' ]
~~~

---

## ٤. objects بنفس المحتوى مش متساويين

~~~text app.js
console.log({ x: 1 } === { x: 1 }); // false
~~~

كل [[{ }]] بتعمل object جديد بعنوان جديد. المحتوى نفسه، بس العنوانين مختلفين، فالناتج [[false]].

---

## ٥. دالة بتعدّل اللي اتبعتلها

~~~text app.js
function rename(obj) { obj.name = "X"; }
rename(a);
console.log(a.name);            // "X"
~~~

لما بتنادي [[rename(a)]]، الباراميتر obj بياخد **نسخة من العنوان**، فـ obj و a بيشاوروا على نفس الـ object، والتعديل باين برّه. الناتج [[X]].

بس لو جوه الدالة غيّرت الباراميتر نفسه لـ object تاني:

~~~text app.js
function replace(obj) { obj = { name: "new" }; }
replace(a);
~~~

a.name فضلت [[X]]: انت غيّرت النسخة المحلية من العنوان، مش الـ object. عشان كده بنقول JS دايمًا **pass by value**، والقيمة في حالة الـ object هي العنوان.

---

## ٦. حدود structuredClone و JSON

~~~text الناتج: Node 24
structuredClone({ date: new Date(), fn() {} })
DataCloneError: fn() {} could not be cloned.
~~~

الدوال مبتتنسخش، فبيرمي error صريح. من غير fn، الـ Date بترجع Date حقيقية ([[instanceof Date]] بـ true). والطريقة القديمة:

~~~text الناتج
JSON.parse(JSON.stringify({ date: new Date("2026-01-01"), fn() {}, u: undefined, n: NaN }))
{ date: '2026-01-01T00:00:00.000Z', n: null }    typeof date → string
~~~

fn و u اختفوا من غير ما حد يقولك، والـ Date بقت string، و NaN بقت null.

---

## الخلاصة

| الكود | object جديد؟ | اللي جوه مشترك؟ |
|---|---|---|
| [[const b = a]] | لأ | كله مشترك |
| [[{ ...a }]] / [[Object.assign({}, a)]] | أيوه | أيوه |
| [[structuredClone(a)]] | أيوه | لأ (ومبينسخش الدوال) |
| [[JSON.parse(JSON.stringify(a))]] | أيوه | لأ، بس بيبوّظ Date و undefined و NaN |

> [[===]] على objects بتقارن العناوين، مش المحتوى.`,
          lines: [
            R`object فيه string ([[name]]) وجواه array ([[tags]]). وجود الـ array جوه الـ object هو اللي هيبيّن الفرق بين النسخة السطحية والعميقة تحت.`,
            R`ده مش نسخ. المتغير في JS مش شايل الـ object نفسه، شايل reference (عنوانه)، فـ [[b]] بقى بيشاور على نفس الـ object اللي [[a]] بيشاور عليه: object واحد في الميموري وليه اسمين.`,
            R`بنعدّل [[name]] عن طريق [[b]]. ولأن مفيش غير object واحد، التعديل حصل في الحاجة اللي [[a]] شايفها برضه.`,
            R`بيطبع [["Omar"]] رغم إننا عمرنا ما لمسنا [[a]]. ده من أشهر الـ bugs: تفتكر إنك عملت نسخة وتعدّل فيها، فالأصل يتغيّر من وراك في حتة تانية في الكود.`,
            R`[[{ ...a }]] بتعمل object جديد فعلًا، بس بتنسخ أول مستوى بس: [[name]] string فاتنسخ، لكن [[tags]] reference فالنسخة بتشاور على نفس الـ array بتاع الأصل. ده اسمه shallow copy، و [[Object.assign]] بتعمل نفس الحاجة.`,
            R`بنضيف لـ [[tags]] عن طريق النسخة. [[push]] بتعدّل الـ array نفسه مش بتعمل array جديد، والـ array ده مشترك بين [[shallow]] و [[a]].`,
            R`[[a.tags]] بقت فيها [["ts"]]: التعديل وصل للأصل لأن الـ array اللي جوه مكانش اتنسخ. الحل لو عايز تعدّل حاجة متداخلة: اعمل array جديد للمستوى ده كمان، زي [[{ ...a, tags: [...a.tags, "ts"] }]].`,
            R`[[structuredClone]] بتعمل deep copy: بتنسخ كل المستويات، فالـ object والـ array اللي جواه كلهم جداد. مدمجة في المتصفح و Node، وبتعرف تنسخ Date و Map و Set، بس بترمي [[DataCloneError]] لو جوه الـ object دالة.`,
            R`بنضيف [["react"]] للـ [[tags]] بتاعة النسخة العميقة. المرة دي الـ array ده نسخة مستقلة، مش هو هو اللي في [[a]].`,
            R`الأصل لسه [["js", "ts"]] من غير [["react"]]: النسخة العميقة مالهاش أي علاقة بالأصل، فعدّل فيها براحتك.`,
            R`[[===]] مع الـ objects بتقارن الـ reference، يعني بتسأل «ده نفس الـ object؟» مش «نفس المحتوى؟». هنا فيه object-ين اتعملوا كل واحد لوحده، فالنتيجة [[false]]. عشان تقارن المحتوى لازم تقارن الخصايص بنفسك.`,
            R`دالة بتغيّر خاصية في الـ object اللي جالها. الباراميتر [[obj]] بياخد نسخة من الـ reference مش من الـ object، يعني بيشاور على نفس الـ object اللي اتبعت.`,
            R`بنبعت [[a]] للدالة. مفيش نسخ بيحصل وقت النداء: الدالة شغالة على نفس الـ object بالظبط.`,
            R`[[a.name]] بقى [["X"]]: الدالة عدّلت الأصل. عشان كده الدوال اللي بتاخد objects (زي الـ reducers في React) المفروض ترجّع object جديد بدل ما تعدّل اللي جالها.`,
          ],
          sol: R`[[structuredClone({ date: new Date(), fn() {} })]] بتطلع [[DataCloneError]] ورسالتها [[fn() {} could not be cloned.]] (في Chrome قبلها [[Failed to execute 'structuredClone' on 'Window']]). من غير fn بيشتغل، و [[copy.date instanceof Date]] بـ true.

مع [[JSON.parse(JSON.stringify(...))]] مفيش error، بس الـ fn بتختفي بهدوء، والـ Date بترجع string زي [["2026-01-01T00:00:00.000Z"]] (typeof بـ [["string"]])، وأي undefined بيضيع. يعني JSON «بينجح» وهو بيبوّظ الداتا، و structuredClone بيقولك صراحة. وده جواب سؤال «ليه structuredClone أحسن من JSON trick؟».`
        },
        {
          cmd: "Object.keys و entries",
          title: "تلف على object وتحوّله",
          desc: R`[[Object.keys(obj)]] بترجّع array المفاتيح، و [[Object.values]] القيم، و [[Object.entries]] أزواج [[[key, value]]]. ومعاهم تقدر تستخدم map و filter على object.

والعكس [[Object.fromEntries]]: بتاخد أزواج وترجّع object. فالحركة المشهورة: entries ثم map ثم fromEntries، عشان تعدّل كل القيم.`,
          example: R`const prices = { mug: 120, shirt: 300, cap: 90 };
Object.keys(prices);      // ["mug", "shirt", "cap"]
Object.values(prices);    // [120, 300, 90]
Object.entries(prices);   // [["mug", 120], ["shirt", 300], ["cap", 90]]
for (const [item, price] of Object.entries(prices)) {
  console.log(item, price);
}
const discounted = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 0.9])
);
const cheap = Object.fromEntries(Object.entries(prices).filter(([, v]) => v < 200));
Object.hasOwn(prices, "mug"); // true`,
          try: R`حوّل [[prices]] لـ array objects شكلها [[{ name: "mug", price: 120 }]]. وبعدين اعمل العكس. وجرّب [[for (const k in prices)]] وقارنها بـ Object.keys.`,
          flag: "script",
          deep: {
            why: "الـ objects مفيهاش map و filter. ولما تيجيلك داتا شكلها dictionary (إعدادات، أو ترجمات، أو عدد لكل حالة)، دي الطريقة اللي تحوّلها بيها وتعرضها.",
            how: R`التلاتة بيرجّعوا الخصايص الخاصة بالـ object بس (own) واللي enumerable، ومفاتيحها strings (مش symbols)، بنفس ترتيب المفاتيح.

[[for...in]] القديمة بتلف على المفاتيح بس كمان بتدخل في الـ prototype chain، عشان كده كان لازم [[hasOwnProperty]] جواها. [[for...of]] مع [[Object.entries]] أنضف.

[[Object.fromEntries]] بتقبل أي iterable أزواج، فـ [[Object.fromEntries(map)]] بيحوّل Map لـ object، و [[Object.fromEntries(new FormData(form))]] بيحوّل فورم لـ object (درس الـ DOM).

و [[Object.hasOwn]] (ES2022) أحسن من [[obj.hasOwnProperty]]، لأن التانية ممكن متبقاش موجودة (object اتعمل بـ [[Object.create(null)]]) أو تتكتب فوقها.`,
            when: R`عرض dictionary في ليستة، وتعديل كل القيم، وفلترة مفاتيح، وتحويل بين object و Map و FormData.`,
            mistakes: R`[[for...in]] على array: بتلف على الـ indexes كـ strings ومعاها أي حاجة متضافة للـ prototype. استخدم for...of. وتفتكر إن [[Object.keys(obj).length]] بتعد كل حاجة: symbols لأ. و [[Object.entries]] على object كبير جوه loop كبيرة: بتعمل arrays جديدة كل مرة.`
          },
          teach: R`## الفكرة في سطرين

الـ array عندها map و filter و for...of، والـ object معندوش. الحل: حوّل الـ object لـ array بـ [[Object.keys]] أو [[Object.values]] أو [[Object.entries]]، اشتغل عليها، ولو محتاج ترجع object استخدم [[Object.fromEntries]]. النواتج من تشغيل المثال في Node 24.

---

## ١. التلات دوال

~~~text app.js
const prices = { mug: 120, shirt: 300, cap: 90 };
Object.keys(prices);
Object.values(prices);
Object.entries(prices);
~~~

[[Object]] هنا مش object بتاعك، ده الـ constructor الجاهز في JS، وعليه دوال مساعدة بتاخد الـ object كـ argument.

~~~text الناتج
[ 'mug', 'shirt', 'cap' ]
[ 120, 300, 90 ]
[ [ 'mug', 120 ], [ 'shirt', 300 ], [ 'cap', 90 ] ]
~~~

- keys: المفاتيح (strings دايمًا).
- values: القيم.
- entries: array، كل عنصر فيها array صغيرة من اتنين [[[key, value]]]. ودي اسمها «أزواج» (pairs).

---

## ٢. اللف على الأزواج

~~~text app.js
for (const [item, price] of Object.entries(prices)) {
  console.log(item, price);
}
~~~

[[for...of]] بتلف على عناصر الـ array، وكل عنصر هو [[["mug", 120]]]. و [[[item, price]]] هنا **array destructuring**: أول عنصر في item، والتاني في price.

~~~text الناتج
mug 120
shirt 300
cap 90
~~~

---

## ٣. تعديل كل القيم: entries ← map ← fromEntries

~~~text app.js
const discounted = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 0.9])
);
~~~

اتقرا من جوه لبرّه:

### الخطوة ١: [[Object.entries(prices)]]

الأزواج اللي شفناها فوق.

### الخطوة ٢: [[.map(([k, v]) => [k, v * 0.9])]]

لكل زوج: فكّه لـ k و v، ورجّع زوج جديد بنفس المفتاح والسعر بعد خصم ١٠٪.

~~~text الناتج بعد map
[ [ 'mug', 108 ], [ 'shirt', 270 ], [ 'cap', 81 ] ]
~~~

### الخطوة ٣: [[Object.fromEntries(...)]]

العكس: بتاخد أزواج وترجّع object.

~~~text الناتج: discounted
{ mug: 108, shirt: 270, cap: 81 }
~~~

---

## ٤. فلترة بالقيمة

~~~text app.js
const cheap = Object.fromEntries(Object.entries(prices).filter(([, v]) => v < 200));
~~~

نفس الحركة بس بـ filter. والجديد [[[, v]]]: الفاصلة من غير اسم قبلها معناها «اتخطى أول عنصر»، لأننا محتاجين القيمة بس.

~~~text الناتج
{ mug: 120, cap: 90 }
~~~

shirt اتشالت لأن 300 مش أقل من 200.

---

## ٥. [[Object.hasOwn]]

~~~text app.js
Object.hasOwn(prices, "mug"); // true
~~~

بتسأل «المفتاح ده موجود **على الـ object نفسه**؟». الفرق عن [[in]] بيبان مع حاجة موروثة:

~~~text الناتج
Object.hasOwn(prices, "mug")       →  true
Object.hasOwn(prices, "toString")  →  false
"toString" in prices               →  true
~~~

toString مش في prices، جاية من [[Object.prototype]] اللي كل object بيورث منه (درس prototype chain)، و [[in]] بتدوّر هناك كمان.

---

## ٦. حل «جرّب» (الـ solCode)

~~~text app.js
const list = Object.entries(prices).map(([name, price]) => ({ name, price }));
const back = Object.fromEntries(list.map(({ name, price }) => [name, price]));
~~~

- [[({ name, price })]]: arrow بترجّع object، والقوسين حوالين [[{ }]] لازمين. من غيرهم JS هيفهم [[{]] كبداية جسم الدالة مش object.
- الرجوع: كل object يتفك لـ name و price ويرجع زوج.

~~~text الناتج
[
  { name: 'mug', price: 120 },
  { name: 'shirt', price: 300 },
  { name: 'cap', price: 90 }
]
{ mug: 120, shirt: 300, cap: 90 }
~~~

وبعدها الكود بيعمل [[Object.create({ inherited: 1 })]]: object جديد الـ prototype بتاعه فيه inherited، و [[Object.assign]] بتحط فيه الأسعار. والمقارنة:

~~~text الناتج
for...in: mug
for...in: shirt
for...in: cap
for...in: inherited
[ 'mug', 'shirt', 'cap' ]
~~~

[[for...in]] لفّت كمان على الموروث، و [[Object.keys]] لأ.

---

## الخلاصة

| الدالة | بترجّع |
|---|---|
| [[Object.keys(o)]] | array المفاتيح |
| [[Object.values(o)]] | array القيم |
| [[Object.entries(o)]] | array أزواج [[[k, v]]] |
| [[Object.fromEntries(pairs)]] | object من أزواج |
| [[Object.hasOwn(o, k)]] | true لو المفتاح على الـ object نفسه |

> ترتيب المفاتيح: الأرقام الصحيحة الأول تصاعدي، وبعدها الـ strings بترتيب الإضافة. [[Object.keys({ b: 1, 10: "x", a: 2, 2: "y" })]] طلعت [[[ '2', '10', 'b', 'a' ]]].`,
          lines: [
            R`object بيربط اسم كل منتج بسعره. الـ object العادي مش iterable، فـ [[for...of]] عليه مباشرة بترمي TypeError، وعشان كده بنحتاج الدوال اللي جاية تحوّله array.`,
            R`[[Object.keys]] بترجّع array فيها أسامي الخصايص (strings) بترتيب الإضافة. ولأنها array، تقدر تستخدم [[length]] و [[map]] و [[filter]] عليها. (المفاتيح اللي شكلها أرقام بتتحط الأول بالترتيب التصاعدي.)`,
            R`[[Object.values]] بترجّع القيم بس من غير الأسامي. مفيدة لما الحساب على القيم بس، زي مجموع الأسعار بـ [[reduce]].`,
            R`[[Object.entries]] بترجّع array، وكل عنصر فيها array صغيرة من اتنين: المفتاح والقيمة. ده الشكل اللي تلف عليه لما تكون محتاج الاتنين مع بعض.`,
            R`بنلف على الأزواج بـ [[for...of]]، والأقواس المربعة بعد [[const]] بتفك كل زوج على طول: المفتاح في [[item]] والقيمة في [[price]]، بدل ما تقرا كل واحد بالـ index.`,
            R`بيطبع اسم المنتج وسعره في كل لفة: [[mug 120]] وبعدها [[shirt 300]] وبعدها [[cap 90]]، بنفس ترتيب الإضافة.`,
            R`نهاية الـ loop.`,
            R`[[Object.fromEntries]] عكس [[entries]]: بتاخد array أزواج وترجّع object. الطريقة كلها: حوّل الـ object لـ array، استخدم أدوات الـ arrays، ورجّعه object تاني.`,
            R`[[map]] بتلف على الأزواج وترجّع لكل زوج زوج جديد: نفس المفتاح والقيمة مضروبة في [[0.9]] (خصم ١٠٪). لازم ترجّع array من اتنين؛ لو رجّعت الرقم لوحده [[fromEntries]] هترمي TypeError إن القيمة مش entry.`,
            R`نهاية نداء [[fromEntries]]. [[discounted]] object جديد بالأسعار بعد الخصم، والأصل [[prices]] زي ما هو.`,
            R`نفس الفكرة بـ [[filter]]: سيب الأزواج اللي قيمتها أقل من ٢٠٠ بس، فالنتيجة فيها [[mug]] و [[cap]]. الفصلة اللي في الأول في [[([, v])]] معناها «اتخطى العنصر الأول (المفتاح) وخد التاني في [[v]]»، لأننا مش محتاجين المفتاح في الشرط.`,
            R`[[Object.hasOwn]] بتسأل: المفتاح ده موجود في الـ object نفسه؟ أأمن من [[in]] لأنها مش بتعد الخصايص الموروثة زي [[toString]]، وأأمن من [[if (prices.mug)]] اللي هتقول لأ لو السعر [[0]].`,
          ],
          sol: R`[[Object.entries(prices).map(([name, price]) => ({ name, price }))]] بترجّع [[[{ name: "mug", price: 120 }, ...]]]، والعكس [[Object.fromEntries(list.map(({ name, price }) => [name, price]))]] بيرجّع [[{ mug: 120, shirt: 300, cap: 90 }]].

على object عادي [[for...in]] و [[Object.keys]] بيطلعوا نفس المفاتيح. الفرق بيظهر لما الـ object ليه prototype فيه خصايص: [[for...in]] بتلف كمان على الخصايص الموروثة (القابلة للعد)، و [[Object.keys]] بتجيب اللي على الـ object نفسه بس. عشان كده [[Object.keys]] أو [[Object.entries]] هي الاختيار الآمن.`,
          solCode: R`const prices = { mug: 120, shirt: 300, cap: 90 };
const list = Object.entries(prices).map(([name, price]) => ({ name, price }));
console.log(list);
const back = Object.fromEntries(list.map(({ name, price }) => [name, price]));
console.log(back); // { mug: 120, shirt: 300, cap: 90 }
const child = Object.create({ inherited: 1 });
Object.assign(child, prices);
for (const k in child) console.log("for...in:", k); // mug shirt cap inherited
console.log(Object.keys(child));                     // ["mug", "shirt", "cap"]`
        },
        {
          cmd: "Map و Set",
          title: "إمتى تستخدم Map و Set بدل object و array؟",
          desc: R`[[Set]] مجموعة قيم مفيهاش تكرار، والسؤال [[has]] فيها سريع جدًا (O(1)) عكس [[includes]] على array (O(n)). و [[Map]] زي object بس المفتاح أي نوع (object أو رقم حقيقي)، وبتحافظ على ترتيب الإضافة، وعندها [[size]].

ومن ES2025 الـ Set عندها عمليات المجموعات: [[union]] و [[intersection]] و [[difference]] و [[isSubsetOf]].`,
          example: R`const visits = new Map();
visits.set("/home", 1);
visits.set("/about", 3);
visits.get("/home");             // 1
visits.has("/cart");             // false
visits.size;                     // 2
const userObj = { id: 1 };
visits.set(userObj, "المفتاح object");
for (const [path, count] of visits) console.log(path, count);
const tags = new Set(["js", "ts", "js"]);
tags.size;                       // 2
tags.add("react").has("react");  // true
const a = new Set([1, 2, 3]), b = new Set([2, 3, 4]);
a.intersection(b);               // Set {2, 3}
a.union(b);                      // Set {1, 2, 3, 4}
a.difference(b);                 // Set {1}`,
          try: R`اكتب دالة [[countWords(text)]] بترجّع Map فيها كل كلمة وعدد مرات ظهورها. وبعدين حوّل الناتج لـ object بـ [[Object.fromEntries]] واطبعه. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر»: [[countWords]] بترجّع Map، وبتتجاهل الحروف الكبيرة والمسافات الزيادة.`,
          flag: "script",
          deep: {
            why: "مسائل كتير (في الشغل وفي الانترفيو) بتبقى «اتأكد إن ده مكررش» أو «عدّ كل حاجة ظهرت كام مرة» أو «هات العنصر بالـ id بسرعة». Set و Map بيحوّلوا حلول O(n²) لـ O(n) (تاب DSA).",
            how: R`الاتنين hash tables من جوه، فالإضافة والبحث والمسح O(1) في المتوسط. وبيقارنوا المفاتيح بـ SameValueZero: زي === بس NaN بتساوي NaN. يعني objects بنفس المحتوى مفاتيح مختلفة.

Map أحسن من object كـ dictionary لما: المفاتيح مش strings، أو بتضيف وتمسح كتير، أو المفاتيح جاية من اليوزر (object عنده مفاتيح موروثة زي [[toString]]، و [[__proto__]] خطر). و object أحسن لما الشكل ثابت ومعروف، أو هتعمله JSON (الـ Map بيطلع [[{}]] في JSON.stringify).

وفيه [[WeakMap]] و [[WeakSet]]: المفاتيح objects بس، ومبيمنعوش الـ garbage collector يمسحها. مفيدين لو عايز تربط داتا بـ object (عنصر DOM مثلًا) من غير ما تسبب memory leak (المستوى ٣).`,
            when: R`Set لإزالة التكرار، و «شفت ده قبل كده؟»، وعمليات المجموعات. Map للعد والـ caches والبحث بالـ id، وأي dictionary مفاتيحه ديناميكية.`,
            mistakes: R`[[JSON.stringify(map)]] وتستغرب [[{}]]: حوّله الأول بـ [[Object.fromEntries]]. و [[map[key] = v]] بدل [[map.set]]: كده حطيت خاصية عادية على الـ object مش entry في الـ Map. واستخدام array مع includes جوه loop على داتا كبيرة.`
          },
          teach: R`## الفكرة في سطرين

[[Map]] زي object بس معمولة مخصوص عشان تبقى «قاموس»: مفتاح من أي نوع وقيمته، بـ methods واضحة. و [[Set]] زي array بس مفيهاش تكرار، وسؤال «موجود؟» فيها سريع. النواتج من تشغيل المثال في Node 24، وهو فيه عمليات المجموعات الجديدة (ES2025) زي intersection.

---

## ١. Map: إنشاء وإضافة

~~~text app.js
const visits = new Map();
visits.set("/home", 1);
visits.set("/about", 3);
~~~

- [[new Map()]]: [[new]] بتعمل instance جديدة من الـ class الجاهز Map، فاضية.
- [[set(key, value)]]: بتحط القيمة تحت المفتاح. لو المفتاح موجود بتستبدل قيمته. وبترجّع الـ Map نفسها:

~~~text الناتج: console.log(visits.set("/home", 1))
Map(1) { '/home' => 1 }
~~~

[[Map(1)]] يعني فيها عنصر واحد، والسهم [[=>]] في الطباعة معناه «المفتاح ده قيمته كذا».

---

## ٢. القراية والسؤال والعدد

~~~text app.js
visits.get("/home");             // 1
visits.has("/cart");             // false
visits.size;                     // 2
~~~

| السطر | بيعمل إيه | الناتج |
|---|---|---|
| [[get(k)]] | هات القيمة | [[1]] |
| [[has(k)]] | المفتاح موجود؟ | [[false]] |
| [[size]] | عدد العناصر (خاصية من غير قوسين) | [[2]] |

ولو عملت [[get]] لمفتاح مش موجود، بترجع [[undefined]] (جرّبت [[visits.get("/cart")]]).

---

## ٣. مفتاح object

~~~text app.js
const userObj = { id: 1 };
visits.set(userObj, "المفتاح object");
~~~

ده اللي object عادي ميقدرش يعمله: المفتاح نفسه object.

~~~text الناتج: console.log(visits)
Map(3) { '/home' => 1, '/about' => 3, { id: 1 } => 'المفتاح object' }
~~~

لو جرّبت نفس الحركة على object عادي، المفتاح بيتحوّل string:

~~~text الناتج
const o = {}; o[userObj] = 1; Object.keys(o)   →  [ '[object Object]' ]
~~~

وخلي بالك: الـ Map بتقارن المفاتيح بالعنوان (reference)، مش بالمحتوى:

~~~text الناتج
visits.get({ id: 1 })   →  undefined
visits.get(userObj)     →  المفتاح object
~~~

[[{ id: 1 }]] الجديدة object تاني بعنوان تاني (درس reference و copy).

---

## ٤. اللف على Map

~~~text app.js
for (const [path, count] of visits) console.log(path, count);
~~~

كل عنصر في Map وانت بتلف عليها هو زوج [[[key, value]]]، فبنفكه بـ [[[path, count]]]. والترتيب هو ترتيب الإضافة:

~~~text الناتج
/home 1
/about 3
{ id: 1 } المفتاح object
~~~

---

## ٥. Set: من غير تكرار

~~~text app.js
const tags = new Set(["js", "ts", "js"]);
tags.size;                       // 2
tags.add("react").has("react");  // true
~~~

- [[new Set([...])]]: بتاخد array (أو أي حاجة بتتلف عليها) وتشيل التكرار.

~~~text الناتج: console.log(tags, tags.size)
Set(2) { 'js', 'ts' } 2
~~~

- [[add]] بتضيف وترجّع الـ Set نفسها، فتقدر تكمّل عليها بـ [[.has]] في نفس السطر. الناتج [[true]].

وأشهر استخدام: [[[...new Set([3, 1, 3, 2, 1])]]] طلعت [[[ 3, 1, 2 ]]]، يعني شيل التكرار من array وارجع array.

---

## ٦. عمليات المجموعات

~~~text app.js
const a = new Set([1, 2, 3]), b = new Set([2, 3, 4]);
a.intersection(b);
a.union(b);
a.difference(b);
~~~

~~~text الناتج
Set(2) { 2, 3 }          intersection: الموجود في الاتنين
Set(4) { 1, 2, 3, 4 }    union: الكل من غير تكرار
Set(1) { 1 }             difference: اللي في a ومش في b
~~~

وكل واحدة بترجّع Set **جديدة**: بعدهم a لسه [[Set(3) { 1, 2, 3 }]].

---

## ٧. فخين

~~~text الناتج
JSON.stringify(visits)       →  {}
const m = new Map(); m["x"] = 1;  m.size → 0   m.get("x") → undefined
~~~

- JSON مبيعرفش Map، فبتطلع [[{}]] فاضية. حوّلها الأول بـ [[Object.fromEntries]].
- [[m["x"] = 1]] حطت خاصية عادية على الـ object، مش entry في الـ Map. دايمًا [[set]] و [[get]].

---

## الخلاصة

| | Map | Set |
|---|---|---|
| بتشيل | أزواج مفتاح وقيمة | قيم من غير تكرار |
| إضافة | [[set(k, v)]] | [[add(v)]] |
| قراية | [[get(k)]] | (مفيش، بتسأل بس) |
| موجود؟ | [[has(k)]] | [[has(v)]] |
| مسح | [[delete(k)]] | [[delete(v)]] |
| العدد | [[size]] | [[size]] |
| اللف | [[[k, v]]] بالترتيب | القيم بالترتيب |

> في تمرين [[countWords]] اللي تحت هتحتاج [[get]] و [[set]] و [[has]] أو [[??]]: فكّر إيه اللي [[get]] بترجّعه أول مرة تشوف فيها كلمة.`,
          lines: [
            R`[[Map]] جديدة فاضية. الـ Map معمولة مخصوص لـ key ← value: المفتاح يقدر يبقى أي نوع (حتى object)، وبتحفظ ترتيب الإضافة، وعندها [[size]] جاهز.`,
            R`[[set]] بتضيف مفتاح وقيمته، ولو المفتاح موجود بتغيّر قيمته بس. هنا بنعدّ زيارات كل صفحة: [["/home"]] اتزارت مرة.`,
            R`مفتاح تاني بقيمة تانية. [[set]] بترجّع الـ Map نفسها، فتقدر تكتب السطرين دول في سطر واحد: [[visits.set(a, 1).set(b, 2)]].`,
            R`[[get]] بترجّع القيمة بتاعة المفتاح، أو [[undefined]] لو مش موجود. مع Map لازم [[get]]: القراية بالنقطة أو بالأقواس المربعة زي الـ object بترجّع [[undefined]]، لأن الداتا متخزنة جوه الـ Map مش كخصايص.`,
            R`[[has]] بتسأل المفتاح موجود ولا لأ وترجّع [[true]] أو [[false]]. أدق من إنك تشيك على نتيجة [[get]]، لأن ممكن تكون مخزّن [[0]] أو [[undefined]] كقيمة فعلًا.`,
            R`عدد العناصر جاهز في [[size]]، وهي خاصية مش method فمن غير أقواس ([[size()]] بترمي TypeError). في الـ object العادي محتاج [[Object.keys(obj).length]].`,
            R`object عادي هنستخدمه كمفتاح في السطر الجاي.`,
            R`في Map المفتاح ممكن يبقى object، والمقارنة بالـ reference: [[visits.get(userObj)]] ترجّع القيمة، لكن [[visits.get({ id: 1 })]] ترجّع [[undefined]] لأنه object تاني. في الـ object العادي المفتاح بيتحوّل string، فكل الـ objects بتبقى [["[object Object]"]] وتدوس على بعض.`,
            R`الـ Map iterable: [[for...of]] بيلف عليها بترتيب الإضافة، وكل عنصر array من اتنين بنفكه في [[path]] و [[count]]. فبيطبع [[/home 1]] وبعدها [[/about 3]] وبعدها الـ object ومعاه قيمته.`,
            R`[[Set]] مجموعة قيم مفيهاش تكرار: اديناها [["js"]] مرتين واتخزنت مرة واحدة. ودي أسهل طريقة تشيل التكرار من array: [[Array.from(new Set(arr))]].`,
            R`[[size]] بتطلع [[2]] مش [[3]]، لأن التكرار اتشال وقت الإنشاء نفسه.`,
            R`[[add]] بتضيف قيمة (ولو موجودة مبتعملش حاجة) وبترجّع الـ Set نفسها، فكمّلنا عليها بـ [[has]] اللي بتسأل القيمة موجودة. [[has]] في Set أسرع بكتير من [[includes]] في array كبيرة، لأنها مش بتلف على العناصر.`,
            R`مجموعتين بينهم [[2]] و [[3]] مشتركين. هنستخدمهم في عمليات المجموعات اللي جاية.`,
            R`[[intersection]]: القيم اللي موجودة في الاتنين. العمليات دي بترجّع Set جديدة ومش بتعدّل [[a]] ولا [[b]]. وهي جديدة (Node 22 والمتصفحات الحديثة)، فلو البيئة أقدم هتلاقيها مش موجودة وترمي [[is not a function]].`,
            R`[[union]]: كل القيم من الاتنين، والمكرر بيتحسب مرة واحدة.`,
            R`[[difference]]: اللي في [[a]] ومش في [[b]]. الترتيب فارق هنا: [[b.difference(a)]] هتطلع [[Set {4}]].`,
          ],
          sol: R`لـ [["js is fun and JS is fast"]] الـ Map بتطلع [[Map(5) { 'js' => 2, 'is' => 2, 'fun' => 1, 'and' => 1, 'fast' => 1 }]]، و [[Object.fromEntries]] بتحوّلها لـ [[{ js: 2, is: 2, fun: 1, and: 1, fast: 1 }]] (fromEntries بتقبل أي حاجة بتتلف عليها وبتطلع أزواج، والـ Map كده).

السطر المهم [[m.set(w, (m.get(w) ?? 0) + 1)]]: أول مرة [[get]] بترجّع undefined فبنبدأ من 0. لو كتبت [[m.get(w) + 1]] من غير [[??]] هتطلع NaN لكل كلمة. ولو مش عامل [[toLowerCase]] هتلاقي [["JS"]] و [["js"]] كلمتين مختلفتين.`,
          solCode: R`function countWords(text) {
  const counts = new Map();
  for (const word of text.toLowerCase().split(/\s+/).filter(Boolean)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}
const counts = countWords("js is fun and JS is fast");
console.log(counts);
console.log(Object.fromEntries(counts)); // { js: 2, is: 2, fun: 1, and: 1, fast: 1 }`,
          check: {
            lang: "js",
            starter: R`function countWords(text) {
  const counts = new Map();
  // ...
  return counts;
}`,
            tests: R`test("بترجّع Map", () => expect(countWords("a b") instanceof Map).toBe(true));
test("'js is fun and JS is fast' ← { js: 2, is: 2, fun: 1, and: 1, fast: 1 }", () => expect(Object.fromEntries(countWords("js is fun and JS is fast"))).toEqual({ js: 2, is: 2, fun: 1, and: 1, fast: 1 }));
test("مسافات زيادة مش كلمات: '  a   b a ' ← { a: 2, b: 1 }", () => expect(Object.fromEntries(countWords("  a   b a "))).toEqual({ a: 2, b: 1 }));
test("نص فاضي ← Map فاضية", () => expect(countWords("").size).toBe(0));
test("مفيش NaN: (m.get(w) ?? 0) + 1", () => expect([...countWords("x x x").values()]).toEqual([3]));`,
            solution: R`function countWords(text) {
  const counts = new Map();
  for (const word of text.toLowerCase().split(/\s+/).filter(Boolean)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}`
          }
        },
        {
          cmd: "JSON",
          title: "تحوّل object لنص عشان تبعته أو تخزّنه، وترجّعه",
          desc: R`JSON هو شكل النص اللي الـ APIs بتتكلم بيه. [[JSON.stringify(obj)]] بتحوّل لـ string، و [[JSON.parse(text)]] بترجّعه object.

JSON أضيق من JS: المفاتيح لازم بين [[""]]، ومفيش دوال ولا undefined ولا Date ولا Map. عشان كده الـ Date بتبقى string، ولما ترجّعها لازم تحوّلها بنفسك. و [[JSON.parse]] بترمي error لو النص بايظ، فحطها في try.`,
          example: R`const order = { id: 7, items: ["mug"], createdAt: new Date("2026-01-01"), note: undefined };
const text = JSON.stringify(order);
// '{"id":7,"items":["mug"],"createdAt":"2026-01-01T00:00:00.000Z"}'
JSON.stringify(order, null, 2);
const back = JSON.parse(text);
typeof back.createdAt;          // "string": الـ Date رجعت نص
new Date(back.createdAt);
try {
  JSON.parse("{bad json}");
} catch (err) {
  console.log("JSON بايظ:", err.message);
}`,
          try: R`خزّن object في [[localStorage.setItem("cart", ...)]] من Console المتصفح، وقفل الصفحة وافتحها، ورجّعه بـ [[JSON.parse(localStorage.getItem("cart"))]]. وبعدين جرّب [[JSON.stringify({ a: 1n })]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: "كل request و response بين الفرونت والباك JSON، و localStorage بيخزّن strings بس، والإعدادات والـ package.json JSON. والفرق بين JSON و JS objects سبب bugs كتير (الـ Dates بالذات).",
            how: R`[[stringify]] بيتجاهل الخصايص اللي قيمتها undefined أو دالة أو symbol، وجوه array بيحطها null. و NaN و Infinity بيبقوا null. والـ Date بتتحوّل لأن عندها method اسمها [[toJSON]] بترجّع [[toISOString()]]، وتقدر تعمل toJSON لـ objects بتاعتك.

الباراميتر التاني replacer (دالة أو array مفاتيح)، والتالت المسافات للتنسيق. و [[JSON.parse(text, reviver)]] بتاخد دالة بتعدّي على كل قيمة، ممكن تحوّل بيها الـ dates.

و [[res.json()]] في fetch هي JSON.parse على الـ body. ولو السيرفر رجّع HTML (صفحة error مثلًا) هتلاقي «Unexpected token '<'» (تاب المتصفح).

الـ BigInt بيرمي TypeError في stringify، والـ circular references بترمي «Converting circular structure to JSON».`,
            when: "أي تبادل داتا مع API، أو تخزين في localStorage أو ملف، أو log منظم. والتنسيق بـ 2 مسافات للقراية والـ debugging بس.",
            mistakes: R`تنسى [[JSON.stringify]] وانت بتبعت body في fetch، فيتبعت [["[object Object]"]]. و [[JSON.parse]] على داتا من برّه من غير try. وتقارن التاريخ اللي رجع من API كأنه Date وهو string. وتفتكر إن [[JSON.parse]] بتفحص الشكل: لأ، بترجّع أي حاجة، والفحص بتاعه Zod (تاب TypeScript).`
          },
          teach: R`## الفكرة في سطرين

الـ object عايش في ذاكرة البرنامج بس. عشان تبعته لسيرفر أو تخزّنه في ملف أو localStorage لازم يبقى **نص**. [[JSON.stringify]] بتحوّله نص، و [[JSON.parse]] بترجّع النص object. JSON = JavaScript Object Notation، يعني «طريقة كتابة objects زي JS» بس بقواعد أضيق. النواتج من Node 24، وحتة localStorage من Chrome headless.

---

## ١. object فيه حاجات مش JSON

~~~text app.js
const order = { id: 7, items: ["mug"], createdAt: new Date("2026-01-01"), note: undefined };
~~~

[[new Date("2026-01-01")]] بتعمل object تاريخ (أول يوم في ٢٠٢٦ الساعة 00:00 UTC). و note قيمتها undefined. الاتنين ملهمش مكان في JSON، وهنشوف بيحصلهم إيه.

---

## ٢. [[JSON.stringify]]: object ← نص

~~~text app.js
const text = JSON.stringify(order);
~~~

~~~text الناتج: console.log(text, typeof text)
{"id":7,"items":["mug"],"createdAt":"2026-01-01T00:00:00.000Z"} string
~~~

لاحظ ٣ حاجات:

1. المفاتيح بقت بين [[""]]: ده إجباري في JSON.
2. [[note]] اختفت خالص: stringify بيتجاهل أي خاصية قيمتها undefined أو دالة.
3. الـ Date بقت string بشكل ISO. الـ T بتفصل التاريخ عن الوقت، و [[.000]] ملّي ثانية، و Z يعني UTC.

ولو الحاجات دي جوه array بتبقى null بدل ما تختفي، عشان الترتيب ميبوظش: [[JSON.stringify([undefined, () => 1, NaN])]] طلعت [[[null,null,null]]].

---

## ٣. نسخة منسقة للقراية

~~~text app.js
JSON.stringify(order, null, 2);
~~~

الباراميتر التاني (replacer) [[null]] يعني «متغيرش حاجة»، والتالت [[2]] عدد المسافات في كل مستوى:

~~~text الناتج
{
  "id": 7,
  "items": [
    "mug"
  ],
  "createdAt": "2026-01-01T00:00:00.000Z"
}
~~~

---

## ٤. [[JSON.parse]]: نص ← object

~~~text app.js
const back = JSON.parse(text);
typeof back.createdAt;          // "string"
new Date(back.createdAt);
~~~

~~~text الناتج
{ id: 7, items: [ 'mug' ], createdAt: '2026-01-01T00:00:00.000Z' }
string
2026-01-01T00:00:00.000Z
~~~

parse مبتعرفش إن النص ده كان Date، فبترجّعه string. لازم انت تعمل [[new Date(...)]] عليه عشان ترجع Date (و [[getFullYear()]] عليها طلعت 2026).

---

## ٥. نص بايظ

~~~text app.js
try {
  JSON.parse("{bad json}");
} catch (err) {
  console.log("JSON بايظ:", err.message);
}
~~~

- [[try { }]]: جرّب الكود ده.
- [[catch (err) { }]]: لو رمى error، متوقعش البرنامج، تعالى هنا، و err هو الـ error.
- [[err.message]]: نص الرسالة.

~~~text الناتج
JSON بايظ: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

نوعه [[SyntaxError]]. والرسالة بتقولك: عند الحرف رقم 1 (العد بيبدأ من 0، يعني حرف b) كان متوقع اسم مفتاح بين تنصيص أو [[}]].

ورسالتين هتشوفهم كتير:

~~~text الناتج
JSON.parse("[object Object]")   →  SyntaxError: "[object Object]" is not valid JSON
JSON.parse("<!DOCTYPE html>")   →  SyntaxError: Unexpected token '<', "<!DOCTYPE html>" is not valid JSON
~~~

الأولى معناها إن حد خزّن object من غير stringify، والتانية إن السيرفر رجّع صفحة HTML بدل JSON.

---

## ٦. localStorage (حل «جرّب»)

~~~text app.js
localStorage.setItem("cart", JSON.stringify({ items: ["mug"], total: 120 }));
const cart = JSON.parse(localStorage.getItem("cart")) ?? { items: [], total: 0 };
~~~

شغّلته في Chrome headless على صفحة من سيرفر محلي، وعملت reload بين السطرين:

~~~text الناتج
getItem("cart")  →  '{"items":["mug"],"total":120}'   (typeof: string)
cart.items       →  ["mug"]
getItem("nope")  →  null
~~~

localStorage بيخزّن strings بس. ولو المفتاح مش موجود [[getItem]] بترجع null، و [[JSON.parse(null)]] بترجع null، فـ [[??]] بتحط القيمة الافتراضية. ولو نسيت stringify:

~~~text الناتج: setItem("bad", { items: ["mug"] }) وبعدين parse
[object Object] | SyntaxError: "[object Object]" is not valid JSON
~~~

---

## ٧. BigInt

~~~text الناتج: JSON.stringify({ a: 1n })
TypeError: Do not know how to serialize a BigInt
~~~

[[1n]] رقم BigInt (أرقام صحيحة كبيرة جدًا)، و JSON معندوش النوع ده، فبيرمي error بدل ما يخمّن.

---

## الخلاصة

| الحاجة في JS | بعد stringify |
|---|---|
| مفتاح | بين [[""]] |
| undefined أو دالة في object | بتختفي |
| undefined أو دالة أو NaN في array | [[null]] |
| NaN و Infinity | [[null]] |
| Date | string ISO (ومترجعش Date لوحدها) |
| BigInt | TypeError |

> [[JSON.parse]] على أي نص جاي من برّه جوه [[try]] دايمًا.`,
          lines: [
            R`object فيه حاجتين مالهمش مكان في JSON: [[Date]] (JSON مفيهوش نوع تاريخ) و [[undefined]] (JSON مفيهوش undefined أصلًا). هنشوف كل واحدة بيحصلها إيه.`,
            R`[[JSON.stringify]] بتحوّل الـ object لـ string تقدر تبعته في request أو تحفظه في ملف أو localStorage. [[note]] اختفت خالص لأن قيمتها [[undefined]]، و [[createdAt]] بقت نص زي [["2026-01-01T00:00:00.000Z"]]. والدوال بتختفي بنفس الطريقة.`,
            R`التاني [[null]] مكان الـ replacer (مش محتاجينه)، والتالت [[2]] عدد المسافات. الناتج نفس الداتا بس على سطور ومتزاحة، فينفع للطباعة وانت بتدوّر على مشكلة أو لملف config هيقراه بني آدم.`,
            R`[[JSON.parse]] بتعمل العكس: بتاخد النص وترجّع object جديد. ده اللي بيحصل لما تقرا رد API أو ملف JSON.`,
            R`[[typeof]] بيقول [["string"]]: [[JSON.parse]] متعرفش إن النص ده كان تاريخ، فبيرجع string عادي. لو ناديت عليه [[getFullYear()]] هيرمي TypeError إنها مش function.`,
            R`لازم تحوّله تاريخ بنفسك بـ [[new Date()]] بعد الـ parse. ونفس الكلام لأي نوع مش موجود في JSON، زي Map و Set: بتحوّلهم بإيدك في الرايح وفي الجاي.`,
            R`[[JSON.parse]] بترمي error لو النص مش JSON سليم، وأي نص جاي من برّه (API أو ملف أو localStorage) ممكن يكون بايظ، فبنحطها جوه [[try]].`,
            R`JSON بيشترط إن المفاتيح تبقى بين علامات تنصيص مزدوجة، و [[{bad json}]] مش كده، فـ [[parse]] بترمي SyntaxError والتنفيذ بيقفز على [[catch]] على طول.`,
            R`[[catch]] بتمسك الـ error في [[err]]، فالبرنامج مبيقعش ويكمّل اللي بعد الـ try/catch عادي.`,
            R`بيطبع رسالة مفهومة ومعاها [[err.message]]، اللي هنا [[Expected property name or '}' in JSON at position 1]] فيعرّفك مكان المشكلة. وفي الكود الحقيقي هنا المكان اللي ترجّع فيه قيمة default بدل الداتا البايظة.`,
            R`نهاية الـ try/catch.`,
          ],
          sol: R`بعد ما تقفل الصفحة وتفتحها، [[JSON.parse(localStorage.getItem("cart"))]] بيرجّعلك نفس الـ object. لو نسيت [[JSON.stringify]] في الـ setItem، localStorage هيخزن [["[object Object]"]] (لأنه بيخزن strings بس)، والـ parse بعدها هيطلع SyntaxError. ولو المفتاح مش موجود [[getItem]] بترجع null و [[JSON.parse(null)]] بترجع null، فاكتب [[?? []]] بعدها.

[[JSON.stringify({ a: 1n })]] بتطلع [[TypeError: Do not know how to serialize a BigInt]]: JSON معندوش نوع BigInt. الحل تحوّله لـ string بإيدك ([[String(v)]]) أو تستخدم replacer.`,
          solCode: R`// في Console المتصفح
localStorage.setItem("cart", JSON.stringify({ items: ["mug"], total: 120 }));
// بعد reload
const cart = JSON.parse(localStorage.getItem("cart")) ?? { items: [], total: 0 };
cart.items; // ["mug"]`
        }
      ]
    }
]);

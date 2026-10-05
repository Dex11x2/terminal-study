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
          lines: [
            "اسم مفتاح في متغير.",
            "متغير هنستخدمه shorthand.",
            "بداية الـ object.",
            R`shorthand: زي [[name: name]].`,
            "مفتاح وقيمة عادي.",
            R`computed key: اسم المفتاح قيمة المتغير، يعني [[color: "red"]].`,
            "مفتاح فيه شرطة لازم بين علامات تنصيص.",
            R`method بالشكل المختصر.`,
            R`[[this]] هنا الـ object اللي اتنادت عليه الـ method.`,
            "قفلة الـ method.",
            "قفلة الـ object.",
            "قراية بالنقطة.",
            "قراية بالأقواس عشان الشرطة.",
            "قراية بمتغير.",
            "إضافة خاصية بعد الإنشاء (مسموح مع const).",
            "مسح الخاصية.",
            R`المفتاح موجود؟`,
            R`[[discount]] مش موجودة، فـ [[?.]] وقفت ورجّعت undefined.`
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
            mistakes: R`ترتيب الـ spread غلط فالـ defaults تمسح اختيارات اليوزر. وتفتكر إن [[{ ...user }]] نسخة عميقة وتعدّل [[copy.address.city]] فالأصل يتغير. وتفك من undefined فيرمي «Cannot destructure property 'x' of undefined». وتعمل [[const { password, ...rest }]] وتنسى إن [[password]] بقت متغير unused (عادي، أو سمّيه [[password: _]]).`
          },
          lines: [
            "object فيه خاصية حساسة.",
            "متغيرين بنفس أسماء الخصايص.",
            R`غيّر الاسم لـ [[fullName]]، و [[role]] مش موجودة فخدت الـ default.`,
            R`شيل [[password]]، والباقي في [[safeUser]].`,
            "object جديد بنفس الخصايص والاسم متغير. الأصل زي ما هو.",
            "إعدادات اليوزر.",
            R`الـ defaults الأول وبعدين اختيارات اليوزر فوقها: [[lang]] بقت "en".`,
            R`تفكيك متداخل في الباراميتر، و [[= {}]] عشان لو address مش موجودة.`,
            R`[[city]] undefined فـ [[??]] حطت البديل.`,
            "قفلة.",
            R`user مفيهوش address فالـ default اشتغل.`
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
          lines: [
            "object جواه array.",
            "مش نسخة: b بيشاور على نفس الـ object.",
            "التعديل من b...",
            "...ظهر في a.",
            "نسخة سطحية: object جديد، بس tags نفس الـ array.",
            "التعديل على الـ array اللي جوه...",
            "...ظهر في الأصل.",
            "نسخة عميقة: كل حاجة جديدة.",
            "التعديل على النسخة...",
            "...الأصل متأثرش.",
            "objects مختلفين حتى لو نفس المحتوى.",
            "دالة بتعدّل الـ object اللي اتبعتلها.",
            "ابعت a.",
            "الأصل اتعدّل."
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
          lines: [
            "object أسعار.",
            "المفاتيح.",
            "القيم.",
            R`أزواج [[[key, value]]].`,
            "لف على الأزواج وفكّهم في متغيرين.",
            "اطبع.",
            "قفلة.",
            R`ارجع object من أزواج...`,
            "...بعد ما تعدّل كل قيمة بخصم ١٠٪.",
            "قفلة.",
            R`فلترة: [[[, v]]] بيتخطى المفتاح وياخد القيمة بس.`,
            R`المفتاح ده موجود في الـ object نفسه؟`
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
          lines: [
            "Map فاضية.",
            "ضيف مفتاح وقيمة.",
            "كمان واحد.",
            "اقرا بالمفتاح.",
            "المفتاح موجود؟",
            R`عدد العناصر (خاصية مش method).`,
            "object عادي...",
            "...ينفع يبقى مفتاح في Map، عكس الـ object.",
            "Map بتتلف عليها بالترتيب وكل عنصر [key, value].",
            "Set: التكرار اتشال لوحده.",
            "2.",
            R`[[add]] بترجّع الـ Set نفسها فتقدر تكمّل عليها.`,
            "مجموعتين.",
            "المشترك.",
            "الكل من غير تكرار.",
            "اللي في a ومش في b."
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
          lines: [
            R`object فيه Date و undefined، وهما مش JSON.`,
            R`حوّله string: الـ note اختفت والـ Date بقت نص ISO.`,
            "نسخة منسقة بمسافتين للقراية.",
            "رجّع النص object.",
            R`[[createdAt]] string دلوقتي مش Date.`,
            "حوّلها Date بنفسك.",
            "النص ممكن يبقى بايظ...",
            "...فـ parse هترمي SyntaxError.",
            "امسك الـ error.",
            "رسالة واضحة بدل ما البرنامج يقع.",
            "قفلة."
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
    },
    {
      t: "الـ DOM",
      l: 1,
      n: "تمسك عناصر الصفحة وتعدّلها، وتسمع للـ events، و event delegation",
      items: [
        {
          cmd: "querySelector",
          title: "تمسك عنصر من الصفحة بالـ CSS selector",
          desc: R`الـ DOM هو الصفحة بعد ما المتصفح قراها وحوّلها شجرة objects. [[document.querySelector(selector)]] بترجّع أول عنصر مطابق (أو null)، و [[querySelectorAll]] بترجّع كلهم في NodeList. والـ selector نفس اللي بتكتبه في CSS (تاب HTML و CSS).

وتقدر تدوّر جوه عنصر معيّن بدل الصفحة كلها: [[form.querySelector("input")]].`,
          example: R`document.querySelector("h1")
document.querySelector("#login-form")
document.querySelector(".card .price")
document.querySelector("[data-id='42']")
document.querySelectorAll("li").length
document.querySelectorAll("li").forEach((li) => console.log(li.textContent))
[...document.querySelectorAll("a")].map((a) => a.href)
document.getElementById("app")
const form = document.querySelector("form"); form?.querySelector("input[name=email]")
$0`,
          try: R`افتح أي موقع، واعمل Inspect على عنصر، وبعدين في Console اكتب [[$0]] (العنصر اللي اخترته). جرّب [[[...document.querySelectorAll("a")].map((a) => a.href)]] عشان تجيب كل لينكات الصفحة.`,
          flag: "console",
          deep: {
            why: "أي تفاعل في صفحة من غير framework بيبدأ إنك تمسك العنصر: الزرار اللي هتسمع له، والـ div اللي هتعرض فيه النتيجة. وحتى مع React هتحتاجه في الـ tests (Testing Library) وفي سكربتات Console والـ extensions.",
            how: R`المتصفح بيقرا الـ HTML ويبني شجرة (Document Object Model): كل tag بيبقى object ([[HTMLElement]]) ليه خصايص و methods، والـ JS بيقرا ويعدّل فيها، والمتصفح بيعيد الرسم.

[[querySelectorAll]] بترجّع NodeList ثابتة (static): لو ضفت عناصر بعدها مش هتظهر فيها. وعندها [[forEach]] بس مفيهاش [[map]] و [[filter]]، عشان كده بتحوّلها array بـ [[[...list]]] أو [[Array.from]].

[[getElementById]] أقدم وأسرع شوية، و [[getElementsByClassName]] بترجّع HTMLCollection «live» بتتحدث لوحدها، وده ساعات بيعمل مفاجآت في الـ loops.

لو الـ script في [[<head>]] من غير [[defer]]، العناصر لسه متعملتش وقت ما الكود يشتغل فهترجع null. الحل: [[<script src="app.js" defer>]] أو [[type="module"]] (الاتنين بيستنوا الـ HTML يخلص).`,
            when: R`في أي صفحة JS عادي، وفي سكربتات Console، وفي الـ tests. في React متستخدمهاش جوه الـ components: استخدم [[useRef]] (تاب React).`,
            mistakes: R`تنسى إن querySelector ممكن ترجّع null فتقع على [[.addEventListener]] («Cannot read properties of null»): السبب غالبًا selector غلط أو الـ script اشتغل قبل الـ HTML. وتنسى [[#]] أو [[.]] في الـ selector. وتنادي map على NodeList.`
          },
          lines: [
            "أول h1 في الصفحة.",
            "بالـ id.",
            R`عنصر [[.price]] جوه [[.card]]: أي selector بتاع CSS ينفع.`,
            "بالـ attribute.",
            "عدد العناصر.",
            R`NodeList عندها [[forEach]].`,
            R`بس مفيهاش [[map]]، فحوّلها array الأول.`,
            "الطريقة القديمة بالـ id.",
            R`دوّر جوه عنصر معيّن، و [[?.]] لو الفورم مش موجود.`,
            R`في DevTools: [[$0]] هو العنصر اللي مختاره في Elements.`
          ],
          sol: R`[[$0]] بيطبع نفس العنصر اللي اخترته في Elements (ولما تعدّي عليه بالماوس بيتلوّن في الصفحة). و [[$1]] العنصر اللي قبله، وهكذا. ده موجود في DevTools بس، مش في كودك.

السطر التاني بيرجّع array فيها كل الـ URLs كاملة (absolute)، حتى لو في الـ HTML مكتوبة [[/about]]: [[a.href]] الخاصية بتطلع الـ URL المحسوب، و [[a.getAttribute("href")]] بتطلع المكتوب زي ما هو. والـ [[[...]]] لازمة لأن querySelectorAll بترجّع NodeList، وفيها forEach بس معندهاش map، فلو كتبت [[document.querySelectorAll("a").map]] هيطلعلك [[is not a function]].`
        },
        {
          cmd: "textContent و classList",
          title: "تغيّر النص والكلاسات وتضيف عناصر",
          desc: R`[[el.textContent = "..."]] بتغيّر النص، وأمان لأن أي HTML فيه بيظهر كنص. و [[el.classList.add / remove / toggle]] للكلاسات، و [[el.dataset.x]] لـ attributes [[data-x]]. و [[document.createElement]] ثم [[append]] لإضافة عنصر.

[[innerHTML]] بيحط HTML حقيقي، وده خطر لو فيه أي حاجة من اليوزر: ممكن يحط سكربت (XSS). استخدمه مع نصوص انت كاتبها بس.`,
          example: R`const list = document.querySelector("#todos");
const title = document.querySelector("h1");
title.textContent = "مهامي";
title.classList.add("big");
title.classList.toggle("done");
title.dataset.count = "3";
title.style.color = "tomato";
const li = document.createElement("li");
li.textContent = "اكتب درس JS";
list.append(li);
const userInput = "<img src=x onerror=alert(1)>";
list.innerHTML += $__bt<li>$__{userInput}</li>$__bt;
list.querySelector("li").remove();`,
          try: R`اعمل ملف [[index.html]] فيه [[<h1>]] و [[<ul id="todos">]] و [[<script src="app.js" defer>]]، وحط الكود في [[app.js]]، وافتحه بسيرفر محلي (تاب المتصفح). شوف الـ alert بيطلع من السطر الخطر، وبعدين غيّره لـ createElement و textContent وشوفه بيظهر كنص.`,
          flag: "script",
          deep: {
            why: "ده كل اللي React بيعمله من تحت: بيغيّر نصوص وكلاسات ويضيف ويشيل عناصر. لما تفهمه هتفهم ليه React موجود أصلًا، وهتعرف تكتب صفحة صغيرة من غير framework.",
            how: R`[[textContent]] بيحط النص زي ما هو، فمفيش أي حاجة بتتنفذ. [[innerText]] شبهه بس بيراعي الـ CSS (العناصر المخفية) وأبطأ لأنه بيحتاج layout.

[[innerHTML]] بيخلي المتصفح يعمل parse للنص كـ HTML. [[<script>]] مش بتشتغل فيه، بس [[<img onerror=...>]] بتشتغل، وده أشهر شكل XSS. و [[innerHTML +=]] بيعيد بناء كل العناصر اللي جوه، فبيضيّع الـ listeners والـ state بتاعتهم.

[[classList]] أحسن من [[className]] لأنه بيعدّل كلاس واحد من غير ما يمسح الباقي. و [[dataset]] بيحوّل [[data-user-id]] لـ [[dataset.userId]].

[[append]] بيقبل أكتر من عنصر ونصوص، و [[prepend]] و [[before]] و [[after]] و [[replaceWith]] و [[remove]] كلهم حديثين وأبسط من [[appendChild]] و [[removeChild]] القديمة.

وكل تعديل ممكن يخلي المتصفح يعيد حساب الصفحة؛ لو هتضيف مية عنصر، اعملهم في [[DocumentFragment]] أو ابنيهم وضيفهم مرة واحدة (تاب HTML و CSS: layout thrashing).`,
            when: R`صفحات بسيطة، و widgets صغيرة، والـ extensions. و [[classList]] مع CSS بدل [[style]] في أغلب الحالات: الشكل في CSS والـ JS بيغيّر الكلاس بس.`,
            mistakes: R`[[innerHTML]] مع داتا من اليوزر أو من API. و [[style.x]] لكل حاجة بدل كلاس. و [[innerHTML +=]] جوه loop. وفي الانترفيو: «الفرق بين textContent و innerHTML و innerText؟» و «إزاي تمنع XSS؟».`
          },
          lines: [
            "العنصر اللي هنضيف فيه.",
            "العنوان.",
            "غيّر النص بأمان.",
            "ضيف كلاس من غير ما تمسح الموجود.",
            "لو الكلاس موجود شيله، ولو مش موجود ضيفه.",
            R`بيعمل [[data-count="3"]] على العنصر.`,
            "style مباشر، والأحسن كلاس في CSS.",
            "عنصر جديد، لسه مش في الصفحة.",
            "نصه.",
            "دخّله في آخر الليستة.",
            "input خبيث من اليوزر.",
            R`[[innerHTML]] نفّذ الـ onerror: ده XSS. متعملش كده.`,
            R`شيل أول عنصر من الصفحة. ([[li]] القديم مبقاش في الصفحة أصلًا: [[innerHTML +=]] اللي فوق عمل العناصر من جديد.)`
          ],
          sol: R`لما تفتح الصفحة: العنوان بيبقى «مهامي» باللون الأحمر، وفيه [[<li>]] من createElement، وبعدين الـ alert بيطلع (رقم 1) لأن الـ [[<img>]] اتحط كـ HTML حقيقي، والـ [[src=x]] فشل فاشتغل [[onerror]]. ده XSS: أي نص من يوزر في innerHTML ممكن يشغّل كود. وآخر سطر بيشيل أول li (بتاعة createElement) مش التانية.

لما تغيّر السطر الخطر لـ [[const li2 = document.createElement("li"); li2.textContent = userInput; list.append(li2);]] مفيش alert، وهتشوف النص [[<img src=x onerror=alert(1)>]] مكتوب في الصفحة زي ما هو: textContent بيعامل أي حاجة كنص. ولو الصفحة فاضية خالص افتح Console: غالبًا انت فاتحها كـ file:// أو نسيت [[defer]] فالسكريبت اشتغل قبل ما [[#todos]] يتعمل، و querySelector رجّع null.`,
          solCode: R`const list = document.querySelector("#todos");
const userInput = "<img src=x onerror=alert(1)>";
const safe = document.createElement("li");
safe.textContent = userInput; // بيظهر كنص، مفيش alert
list.append(safe);`
        },
        {
          cmd: "addEventListener",
          title: "تسمع لضغطة أو كتابة أو submit",
          desc: R`[[el.addEventListener("click", handler)]] بتنادي الدالة كل ما الحدث يحصل، وبتبعتلها object الـ event: فيه [[event.target]] (العنصر اللي الحدث حصل عليه) و [[event.preventDefault()]] (امنع السلوك الافتراضي، زي إن الفورم يعمل reload).

أشهر الأحداث: [[click]] و [[input]] (كل حرف) و [[change]] و [[submit]] و [[keydown]]. وعشان تشيل الـ listener لازم تبعت نفس الدالة لـ [[removeEventListener]].`,
          example: R`const btn = document.querySelector("#save");
const form = document.querySelector("form");
function onSave(event) {
  console.log("اتضغط", event.target);
}
btn.addEventListener("click", onSave);
btn.removeEventListener("click", onSave);
btn.addEventListener("click", () => console.log("مرة واحدة"), { once: true });
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});
form.querySelector("input").addEventListener("input", (e) => {
  console.log(e.target.value);
});`,
          try: R`اعمل فورم فيه input اسمه email وزرار submit. شيل [[e.preventDefault()]] وشوف الصفحة بتعمل reload والـ URL اتغير. وبعدين جرّب [[{ once: true }]] واضغط الزرار مرتين.`,
          flag: "script",
          deep: {
            why: "أي تفاعل مع اليوزر حدث: ضغطة، كتابة، scroll، إرسال فورم. ده الأساس اللي [[onClick]] في React مبني عليه، و React نفسه بيعمل listener واحد على الـ root (درس event delegation).",
            how: R`لما تضغط على عنصر، الحدث بيمشي ٣ مراحل: capture من الـ document لتحت لحد العنصر، وبعدين target، وبعدين bubble من العنصر لفوق لحد الـ document. الـ listeners العادية بتشتغل في الـ bubble، و [[{ capture: true }]] بيخليها في الـ capture.

[[event.target]] العنصر اللي اتضغط فعلًا (ممكن يكون span جوه الزرار)، و [[event.currentTarget]] العنصر اللي عليه الـ listener. و [[stopPropagation()]] بيوقف الـ bubble، و [[preventDefault()]] بيمنع سلوك المتصفح (submit، أو فتح لينك، أو checkbox).

الخيارات: [[once]] (يتشال لوحده بعد أول مرة)، و [[passive: true]] (وعد إنك مش هتعمل preventDefault، فالـ scroll يبقى ناعم على الموبايل)، و [[signal]] (تشيل listeners كتير مرة واحدة بـ AbortController).

[[new FormData(form)]] بتقرا كل الـ inputs اللي ليها [[name]]، و [[Object.fromEntries]] بتحوّلها object.`,
            when: R`أي تفاعل في صفحة من غير framework. و [[submit]] على الفورم مش [[click]] على الزرار، عشان Enter يشتغل كمان.`,
            mistakes: R`[[removeEventListener]] بـ arrow جديدة: دالة مختلفة فمش هتتشال. و [[addEventListener("click", save())]]: نادتها فورًا. وتضيف listener جوه دالة بتتنادي كتير فالحدث يشتغل ٥ مرات. وتنسى preventDefault في الـ submit. وفي الانترفيو: «اشرح event bubbling و capturing» و «الفرق بين target و currentTarget».`
          },
          lines: [
            "الزرار.",
            "الفورم.",
            "دالة باسم عشان نقدر نشيلها بعدين.",
            R`[[event.target]] العنصر اللي اتضغط.`,
            "قفلة.",
            "اسمع للضغطة.",
            "شيله: لازم نفس الدالة بالظبط.",
            R`[[once]]: يشتغل مرة ويتشال لوحده.`,
            R`اسمع لـ [[submit]] على الفورم: بيشتغل بالضغط وبـ Enter.`,
            "امنع الـ reload.",
            R`اقرا كل الـ inputs اللي ليها [[name]] في object.`,
            "اطبع الداتا.",
            "قفلة.",
            R`[[input]] بيشتغل مع كل حرف.`,
            "القيمة دايمًا string.",
            "قفلة."
          ],
          sol: R`من غير [[e.preventDefault()]]: لما تضغط submit الصفحة بتعمل reload، والـ console.log بيظهر ويختفي بسرعة، والـ URL بيبقى فيه [[?email=...]] لأن الفورم default method بتاعه GET وبيبعت الحقول في الـ URL. مع preventDefault الصفحة ثابتة والـ console بيطبع [[{ email: "..." }]].

مع [[{ once: true }]]: أول ضغطة تطبع «مرة واحدة»، والتانية ولا حاجة، لأن الـ listener اتشال لوحده بعد أول تنفيذ. لو شايف الرسالة مرتين فغالبًا الكود نفسه اتنفّذ مرتين (سكريبت متحمّل مرتين)، ولو [[querySelector("input")]] رجّعت null يبقى الفورم ملوش input وقت تشغيل السكريبت.`,
          solCode: R`<form>
  <input name="email" type="email" />
  <button>Send</button>
</form>
<script>
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(form))); // { email: "..." }
  });
</script>`
        },
        {
          cmd: "event delegation",
          title: "listener واحد على الأب بدل listener لكل عنصر",
          desc: R`بدل ما تحط listener على كل زرار في ليستة (ولما تضيف عنصر جديد تفتكر تحطله)، حط listener واحد على الأب، وجواه اعرف مين اتضغط بـ [[e.target.closest(...)]]. ده شغال لأن الحدث بيطلع لفوق (bubbling).

الميزة: listener واحد مهما كان عدد العناصر، والعناصر اللي هتتضاف بعدين شغالة لوحدها.`,
          example: R`const list = document.querySelector("#todos");
function deleteTodo(id) { list.querySelector($__bt[data-id="$__{id}"]$__bt)?.remove(); }
function toggleTodo(id) { console.log("done", id); }
list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn || !list.contains(btn)) return;
  const id = btn.closest("li").dataset.id;
  if (btn.dataset.action === "delete") deleteTodo(id);
  if (btn.dataset.action === "done") toggleTodo(id);
});
list.insertAdjacentHTML("beforeend", '<li data-id="9">جديد <button data-action="delete">x</button></li>');`,
          try: R`ضيف ٣ عناصر بـ insertAdjacentHTML، واضغط delete على الأخير: شغال من غير ما تضيف listener. وبعدين حط [[<span>]] جوه الزرار واضغط عليه، وجرّب تشيل [[closest]] وتستخدم [[e.target.dataset]] مباشرة وشوف ليه بيبوظ.`,
          flag: "script",
          deep: {
            why: "ليستات بتتغير (todos، سلة، تعليقات، جدول) بتتعب لو كل عنصر ليه listener: لازم تضيف وتشيل مع كل تغيير، والذاكرة بتكبر. ودي من أشهر أسئلة انترفيو الفرونت.",
            how: R`الضغطة على الزرار بتعمل bubble: الزرار ثم الـ li ثم الـ ul ثم ... لحد الـ document. فالـ listener على الـ ul بيشوف كل ضغطة جواه.

[[e.target]] ممكن يكون عنصر جوه الزرار (أيقونة أو span)، عشان كده [[closest(selector)]] بتطلع لفوق من الـ target لحد ما تلاقي أول أب مطابق (أو العنصر نفسه). و [[list.contains(btn)]] بتتأكد إنه جوه الليستة دي مش في مكان تاني فوقيها.

React بيعمل ده على مستوى التطبيق كله: listener واحد لكل نوع حدث على الـ root، وبيوزّع على الـ components.

بعض الأحداث مبتعملش bubble زي [[focus]] و [[blur]] و [[mouseenter]]؛ بدالهم [[focusin]] و [[focusout]] و [[mouseover]].`,
            when: "أي ليستة أو جدول عناصره بتتضاف وتتشال، أو فيه عدد كبير من العناصر بنفس السلوك.",
            mistakes: R`تعتمد على [[e.target]] مباشرة فتبوظ لما حد يضغط على أيقونة جوه الزرار. وتعمل [[stopPropagation]] في مكان تاني فالـ delegation تقف من غير ما تعرف. وفي الانترفيو: «إيه هو event delegation وليه مفيد؟» والإجابة: bubbling، و listener واحد، وعناصر جديدة شغالة لوحدها، وذاكرة أقل.`
          },
          lines: [
            "الليستة الأب.",
            R`مسح عنصر بالـ id. [[?.]] لو مش موجود.`,
            "تعليم إنه خلص (مثال).",
            "listener واحد على الأب.",
            R`[[closest]] بتطلع من العنصر اللي اتضغط لحد أول زرار ليه [[data-action]].`,
            "الضغطة مش على زرار (أو زرار برا الليستة): تجاهلها.",
            R`هات الـ id من الـ [[li]] اللي فيه الزرار.`,
            "نفّذ حسب نوع الزرار.",
            "نفس الكلام.",
            "قفلة.",
            "عنصر جديد اتضاف بعد الـ listener، وزراره شغال لوحده."
          ],
          sol: R`الضغط على delete في العنصر الأخير بيشيله فورًا، مع إن الـ listener اتحط على الـ [[<ul>]] قبل ما العنصر يتعمل: الـ click بيطلع (bubbling) من الزرار للـ ul، والـ listener هناك بيعرف مين اتضغط من [[e.target]].

لما تحط [[<span>x</span>]] جوه الزرار وتضغط على الـ x: [[e.target]] بيبقى الـ SPAN مش الـ BUTTON، و [[e.target.dataset.action]] بـ undefined، فمفيش حاجة بتحصل. [[closest("button[data-action]")]] بتطلع من الـ span لأقرب زرار فوقيه، فبتشتغل مهما ضغطت على أي حاجة جوه. ده بالظبط سبب إنها موجودة، وسؤال انترفيو مشهور: «ليه e.target مش دايمًا العنصر اللي حاطط عليه البيانات؟».`
        },
        {
          cmd: "اعرض داتا من fetch",
          title: "تعرض ليستة من API بحالات loading و empty و error",
          desc: R`ده الدرس اللي بيربط كل اللي فات: تجيب JSON من API بـ [[fetch]]، وترسمه في الصفحة، وتعرض ٣ حالات غير النجاح: بيحمّل (loading)، ومفيش داتا (empty)، وحصلت مشكلة (error). أي شاشة حقيقية فيها الحالات الأربعة دي، ولو نسيت واحدة اليوزر هيشوف صفحة فاضية ومش فاهم.

الـ HTML فيه [[<ul id="list">]] و [[<p id="status">]] و [[<template id="row">]]. الـ [[<template>]] حتة HTML مش بتتعرض، بتنسخها بـ [[content.cloneNode(true)]] لكل عنصر وتملاها بـ [[textContent]]، فالشكل يفضل في الـ HTML والداتا بتدخل بأمان من غير innerHTML.

[[fetch]] و [[await]] هتتشرح بالتفصيل في المستوى ٢ (قسم async). دلوقتي كفاية تعرف إن [[await]] معناها «استنى النتيجة»، وإنها بتشتغل جوه [[async function]].`,
          example: R`// HTML: <p id="status"></p> <ul id="list"></ul> <button id="reload">حدّث</button>
// <template id="row"><li><strong></strong> — <span></span></li></template>
const listEl = document.querySelector("#list");
const statusEl = document.querySelector("#status");
const tpl = document.querySelector("#row");
function setStatus(text, kind = "") {
  statusEl.textContent = text;
  statusEl.className = kind;
}
function render(users) {
  listEl.replaceChildren();
  if (users.length === 0) return setStatus("مفيش يوزرز لسه", "empty");
  setStatus("");
  for (const u of users) {
    const row = tpl.content.cloneNode(true);
    row.querySelector("strong").textContent = u.name;
    row.querySelector("span").textContent = u.email;
    listEl.append(row);
  }
}
async function load() {
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
  }
}
document.querySelector("#reload").addEventListener("click", load);
load();`,
          try: R`اعمل [[index.html]] بالـ HTML اللي في أول سطرين و [[<script src="app.js" defer>]]، وافتحه بسيرفر محلي ([[npx serve]] أو Live Server). جرّب الحالات الأربعة: عادي، وغيّر الـ URL لـ [[/users?id=999]] (empty)، وغيّره لـ [[/nope]] (error بـ 404)، وافصل النت من DevTools ← Network ← Offline واضغط «حدّث». وبعدين زوّد: الزرار يتعطّل وهو بيحمّل، وفي حالة الـ error يظهر زرار «جرّب تاني».`,
          flag: "script",
          deep: {
            why: "الـ DOM لوحده (querySelector و textContent) مبيعملش تطبيق. التطبيق الحقيقي بيجيب داتا من سيرفر ويعرضها، والجزء اللي المبتدئين بينسوه هو الحالات اللي مش «كله تمام». ده بالظبط اللي React و TanStack Query بيعملوه (isLoading و isError و data)، فلما تكتبه بإيدك مرة هتفهم هما بيحلوا إيه.",
            how: R`الترتيب: [[load()]] تحط «بيحمّل» فورًا (قبل ما الشبكة ترد)، وبعدين [[await fetch]]. [[fetch]] مش بترمي error لو السيرفر رد بـ 404 أو 500، بترمي بس لو الشبكة نفسها وقعت. عشان كده [[if (!res.ok) throw]] بنفسك، فالحالتين يروحوا للـ [[catch]]. و [[res.json()]] كمان ممكن ترمي لو الرد مش JSON.

[[render]] بتمسح القديم بـ [[replaceChildren()]] (من غير arguments بتفضّي العنصر)، وتفحص الـ empty قبل الرسم، وبعدين تنسخ الـ template لكل يوزر. [[cloneNode(true)]] بترجّع DocumentFragment، و [[append]] بتنقل محتواه للّيستة.

[[textContent]] مش [[innerHTML]]: الأسماء جاية من API، ولو فيها [[<img onerror>]] هتظهر كنص (درس textContent و classList). و [[className = kind]] بيخلي الـ CSS يلوّن كل حالة ([[.error { color: red }]]).

لو ضغطت «حدّث» مرتين بسرعة، الطلبين شغالين والأبطأ هو اللي بيكسب حتى لو هو القديم (race condition). الحل الكامل [[AbortController]] (درس «fetch و AbortController» في المستوى ٢)، والبسيط إنك تعطّل الزرار وهو بيحمّل.`,
            when: R`أي صفحة بتعرض داتا من API من غير framework: dashboard صغيرة، أو widget، أو extension. ولما تنقل لـ React، نفس الحالات الأربعة هتفضل موجودة (تاب React).`,
            mistakes: R`تنسى [[res.ok]] فالـ 404 تتعامل كنجاح و [[res.json()]] تقع برسالة غريبة. و «بيحمّل» تفضل ظاهرة للأبد لأنك مسحتها في حالة النجاح بس (حط المسح في الحالتين أو في [[finally]]). ومفيش empty state فاليوزر يشوف صفحة فاضية. وتبني الـ HTML بـ template literal و innerHTML بداتا من API (XSS). وفي الانترفيو: «إيه الحالات اللي لازم أي شاشة بتجيب داتا تتعامل معاها؟».`
          },
          lines: [
            "الليستة.",
            "سطر الحالة.",
            R`الـ [[<template>]] اللي هننسخه.`,
            "دالة صغيرة تغيّر نص الحالة وشكلها.",
            "النص.",
            R`كلاس زي [[loading]] أو [[error]] يلوّنه CSS.`,
            "قفلة.",
            "الرسم.",
            "امسح اللي كان مرسوم قبل كده.",
            R`empty state: مفيش داتا، قول كده واخرج.`,
            "فيه داتا: امسح سطر الحالة.",
            "لكل يوزر.",
            R`نسخة جديدة من الـ template (DocumentFragment).`,
            "املاها بـ textContent: آمن.",
            "والإيميل.",
            "ضيفها للّيستة.",
            "قفلة الـ loop.",
            "قفلة.",
            R`[[async]] عشان نقدر نستخدم [[await]] جواها.`,
            "loading state قبل أي حاجة.",
            "أي خطأ جوه الـ try هيروح للـ catch.",
            "اطلب واستنى الرد.",
            R`404 و 500 مش errors عند fetch: ارميها بنفسك.`,
            R`حوّل الرد لـ JSON وارسمه.`,
            R`error state: شبكة وقعت، أو HTTP غلط، أو JSON بايظ.`,
            "امسح أي داتا قديمة عشان متتلخبطش مع رسالة الخطأ.",
            "اعرض الرسالة.",
            "قفلة.",
            "قفلة.",
            "زرار «حدّث» بيعيد التحميل.",
            "حمّل أول ما الصفحة تفتح."
          ],
          sol: R`الحالات الأربعة: عادي هتشوف ١٠ يوزرز (jsonplaceholder بيرجّع ١٠)، و [[?id=999]] بيرجّع [[[]]] فتظهر «مفيش يوزرز لسه»، و [[/nope]] بيطلع «حصلت مشكلة: HTTP 404»، و Offline بيطلع «حصلت مشكلة: Failed to fetch» (الرسالة بتختلف شوية بين المتصفحات، في Firefox «NetworkError when attempting to fetch resource.»).

لو شيلت سطر [[if (!res.ok)]] وجرّبت [[/nope]]: السيرفر بيرد بـ [[{}]] مش array، فـ [[users.length]] بـ undefined، والـ loop [[for...of]] على object بيرمي «users is not iterable». يعني الخطأ بيطلع في مكان تاني وبرسالة مالهاش علاقة بالسبب الحقيقي.

للزرار: في أول [[load]] اعمل [[btn.disabled = true]]، وفي [[finally]] رجّعه false. و «جرّب تاني»: زرار جوه سطر الحالة بيظهر بس في الـ error ويستدعي [[load]]. الكود تحت بيحل محل [[load]] القديمة، وباقي الملف زي ما هو (و [[setStatus]] بتمسح الزرار في المحاولة الجاية لأن [[textContent]] بيمسح كل اللي جوه العنصر).`,
          solCode: R`const btn = document.querySelector("#reload");
async function load() {
  btn.disabled = true;
  setStatus("بيحمّل...", "loading");
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);
    render(await res.json());
  } catch (err) {
    listEl.replaceChildren();
    setStatus("حصلت مشكلة: " + err.message, "error");
    const retry = document.createElement("button");
    retry.textContent = "جرّب تاني";
    retry.addEventListener("click", load);
    statusEl.append(" ", retry);
  } finally {
    btn.disabled = false;
  }
}`
        },
        {
          cmd: "FormData و URLSearchParams",
          title: "تقرا فورم وتبعته أو تحطه في الـ URL إزاي؟",
          desc: R`الفورم في HTML لوحده بيعمل submit ويعمل reload للصفحة. عشان تتحكم فيه بـ JS: اسمع لـ [[submit]] على الفورم (مش click على الزرار)، واعمل [[e.preventDefault()]]، واقرا القيم بـ [[new FormData(form)]]: بتجيب كل input ليه [[name]].

[[fd.get("q")]] قيمة واحدة، و [[fd.getAll("tag")]] كل القيم لنفس الاسم (checkboxes). ولو عايز تحوّلها query string زي [[?q=قهوة&tag=hot]] استخدم [[new URLSearchParams(fd)]]: بتعمل الـ encoding صح للعربي والمسافات والـ [[&]].

وتبعتها للسيرفر بطريقتين: [[fetch(url, { method: "POST", body: fd })]] كـ multipart (لازم لو فيه ملفات)، أو [[JSON.stringify(Object.fromEntries(fd))]] مع [[Content-Type: application/json]].`,
          example: R`// HTML: <form id="search"><input name="q" required> <label><input type="checkbox" name="tag" value="hot"> سخن</label>
// <label><input type="checkbox" name="tag" value="new"> جديد</label> <button>دوّر</button></form>
const form = document.querySelector("#search");
const initial = new URLSearchParams(location.search);
form.elements.q.value = initial.get("q") ?? "";
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  console.log(fd.get("q"), fd.getAll("tag"));
  const params = new URLSearchParams(fd);
  params.set("page", "1");
  history.replaceState(null, "", "?" + params);
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const res = await fetch("/api/search?" + params);
    console.log(res.status, params.toString());
  } finally {
    btn.disabled = false;
  }
});`,
          try: R`اعمل الفورم ده، واكتب «قهوة سادة»، وعلّم الاتنين checkboxes، واضغط Enter. بص على الـ URL وعلى تاب Network: شكل الـ query string إيه؟ اعمل refresh: الـ input لسه فيه الكلمة؟ وبعدين في Node جرّب [[new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" }).toString()]] وشوف الـ encoding.`,
          flag: "script",
          deep: {
            why: "كل فورم في أي موقع (login، بحث، checkout) محتاج نفس الخطوات: امنع الـ reload، واقرا القيم، واتأكد منها، وابعتها، وامنع الضغط المزدوج. ولو البحث والفلاتر في الـ URL، اليوزر يقدر يعمل refresh أو يبعت اللينك لحد ويشوف نفس النتيجة.",
            how: R`[[submit]] بيحصل بالضغط على أي زرار جوه الفورم (الـ [[<button>]] الافتراضي نوعه submit) وبـ Enter في أي input. وقبله المتصفح بيعمل الـ validation بتاع HTML ([[required]] و [[type="email"]] و [[minlength]])، ولو فيه غلط مش هيطلق الحدث أصلًا. لو عايز تعمل submit من JS بنفس الـ validation استخدم [[form.requestSubmit()]] مش [[form.submit()]] (دي بتنط الـ validation والـ event).

[[FormData]] بتاخد كل عنصر ليه [[name]] ومش [[disabled]]: الـ checkbox بيتاخد بس لو متعلّم وقيمته [[value]] بتاعه (أو "on")، والـ [[<select multiple>]] بيدّي كذا قيمة. و [[form.elements.q]] بيوصلك للعنصر اللي [[name="q"]] (فيه كمان اختصار [[form.q]]، بس بيتضرب لو عندك input اسمه زي خاصية في الفورم نفسه زي [[submit]] أو [[action]]).

[[URLSearchParams]] بيعمل encoding بطريقة الفورمز: المسافة [[+]] والعربي [[%D9%82...]]. [[set]] بتستبدل، و [[append]] بتضيف قيمة كمان لنفس المفتاح. و [[history.replaceState]] بيغيّر الـ URL من غير reload ومن غير ما يضيف خطوة في الـ back (لو عايز back يرجع للبحث اللي قبله استخدم [[pushState]]، في المستوى ٣).

لما تبعت FormData كـ body متحطش Content-Type بنفسك: المتصفح بيحط [[multipart/form-data; boundary=...]] والـ boundary لازم يبقى فيه.`,
            when: R`أي فورم من غير framework. وحتى في React/Next، FormData هي اللي بتوصل لـ server actions ([[<form action={fn}>]])، و URLSearchParams هي اللي تحت [[useSearchParams]].`,
            mistakes: R`input من غير [[name]] فمش بيظهر في FormData. و [[Content-Type: multipart/form-data]] بإيدك فالسيرفر مش لاقي الـ boundary. و [[Object.fromEntries(fd)]] مع checkboxes بنفس الاسم: بياخد آخر قيمة بس. وتبني الـ query بـ [[$__bt?q=$__{q}$__bt]] من غير encoding فأي [[&]] في البحث يكسر الـ URL. وتنسى إن الـ validation في المتصفح للراحة بس، والسيرفر لازم يتحقق تاني (تاب Backend بـ Node).`
          },
          lines: [
            "الفورم.",
            "اقرا الـ query string الحالي من الـ URL.",
            R`رجّع البحث القديم في الـ input بعد refresh. [[form.elements.q]] هو الـ input اللي اسمه q.`,
            R`[[submit]] مش click: بيشتغل بـ Enter كمان، وبعد الـ validation.`,
            "امنع الـ reload.",
            R`كل الـ inputs اللي ليها [[name]].`,
            R`[[get]] قيمة واحدة، و [[getAll]] array للـ checkboxes.`,
            "حوّلها query string بـ encoding صح.",
            R`[[set]] بتستبدل أو تضيف مفتاح.`,
            "حط البحث في الـ URL من غير reload.",
            "الزرار.",
            "عطّله عشان الضغط المزدوج.",
            "try عشان نرجّع الزرار مهما حصل.",
            R`ابعت. [[+ params]] بتنادي [[toString()]] لوحدها.`,
            "اطبع الـ status والـ query.",
            R`[[finally]]: بيتنفذ في النجاح والفشل.`,
            "رجّع الزرار.",
            "قفلة.",
            "قفلة الـ listener."
          ],
          sol: R`بعد Enter الـ URL بيبقى [[?q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&tag=hot&tag=new&page=1]]: المسافة بقت [[+]]، والعربي بقى bytes بـ UTF-8، و [[tag]] اتكرر مرتين. المتصفح في شريط العنوان ممكن يعرضه عربي مقروء بس اللي بيتبعت هو الـ encoded. الـ console بتطبع [[قهوة سادة [ 'hot', 'new' ] ]] وبعدها رقم الـ status (غالبًا 404 لأن [[/api/search]] مش موجود عندك، وده طبيعي).

بعد refresh الـ input فيه «قهوة سادة» لأن السطر التالت بيقراها من الـ URL. (الـ checkboxes مش هترجع: ده تمرين زيادة بـ [[initial.getAll("tag")]].)

وفي Node: [[q=%D9%82%D9%87%D9%88%D8%A9+%D8%B3%D8%A7%D8%AF%D8%A9&sort=price%26desc]]. لاحظ [[&]] بقت [[%26]]، فمبقتش بتتلخبط مع الفاصل بين المفاتيح.`,
          solCode: R`const p = new URLSearchParams({ q: "قهوة سادة", sort: "price&desc" });
console.log(p.toString());
p.append("tag", "hot");
p.append("tag", "new");
console.log(p.getAll("tag"), p.get("q"));
const fd = new FormData();
fd.append("q", "قهوة");
fd.append("tag", "hot");
fd.append("tag", "new");
console.log(new URLSearchParams(fd).toString(), Object.fromEntries(fd));`
        },
        {
          cmd: "defer و async و module",
          title: "تحط الـ script فين، وإيه الفرق بين defer و async و type=module؟",
          desc: R`[[<script src="app.js">]] العادي في الـ [[<head>]] بيوقّف قراية الـ HTML لحد ما الملف يتحمّل ويشتغل. ودي مشكلتين: الصفحة بتتأخر، والكود مش لاقي العناصر (querySelector بترجّع null).

[[defer]]: حمّل في الخلفية، وشغّل بعد ما الـ HTML يخلص، بالترتيب اللي في الصفحة، وقبل [[DOMContentLoaded]]. ده الافتراضي الصح لكود الصفحة بتاعك.

[[async]]: حمّل في الخلفية، وشغّل أول ما يوصل، في أي ترتيب، حتى لو الـ HTML لسه بيتقري. مناسب لسكربتات مستقلة زي analytics.

[[type="module"]]: بيتصرف زي defer لوحده، وكمان بيسمح بـ [[import]] و [[export]]، و strict mode، والمتغيرات مش global.`,
          example: R`<script src="https://example.com/analytics.js" async></script>
<script src="app.js" defer></script>
<script type="module" src="main.js"></script>
<script>
  console.log("inline:", document.readyState);
  document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded"));
  window.addEventListener("load", () => console.log("load"));
</script>`,
          try: R`اعمل [[index.html]] فيه السطور دي في الـ [[<head>]] (شيل سطر analytics)، واعمل [[app.js]] فيه [[console.log("app.js", document.querySelector("h1"))]] و [[main.js]] فيه نفس السطر بـ "main.js"، وحط [[<h1>]] في الـ body. خمّن ترتيب الـ logs، وبعدين افتح Console. وبعدين شيل [[defer]] من app.js وشوف إيه اللي اتغير.`,
          flag: "script",
          deep: {
            why: "«الكود شغال لو حطيته في آخر الـ body ومش شغال في الـ head» من أشهر حيرات المبتدئين. ولما الصفحة بطيئة، أول حاجة بيبص عليها أي حد في الأداء هي السكربتات اللي بتوقف الـ parsing (render-blocking).",
            how: R`المتصفح بيقرا الـ HTML من فوق لتحت ويبني الـ DOM. [[<script>]] عادي بيوقّف ده: يحمّل، وينفّذ، ويكمّل. عشان كده زمان كانوا بيحطوه في آخر الـ [[<body>]].

[[defer]] و [[type="module"]] بيدخلوا نفس الطابور: بيتحمّلوا بالتوازي مع الـ parsing، وبيتنفذوا بترتيبهم في الصفحة بعد ما الـ parsing يخلص، وبعدهم [[DOMContentLoaded]]. فـ [[app.js]] قبل [[main.js]] لأنه قبله في الصفحة. [[async]] ملوش ترتيب: أي وقت يوصل يتنفذ، ممكن قبل الـ DOM ما يكمل.

الترتيب في المثال: inline (بيطبع [["loading"]] لأنه شغال والـ HTML لسه بيتقري) ← app.js ← main.js ← DOMContentLoaded ← load. و [[load]] بتستنى كل الصور والـ CSS والـ iframes، فهي متأخرة كتير. عشان كده الكود اللي محتاج العناصر يستخدم defer (أو DOMContentLoaded)، مش load.

[[defer]] و [[async]] بيشتغلوا بس مع [[src]]؛ على inline script بيتجاهلوا. الـ module script الـ inline كمان deferred. والـ modules بتتحمّل بـ CORS، فمش هتشتغل من [[file://]]: لازم سيرفر محلي.`,
            when: R`[[type="module"]] لأي كود جديد (Vite بيعمل كده لوحده). [[defer]] لسكربت قديم مش module. [[async]] لسكربتات طرف تالت مستقلة. وفي Next.js ده متحكم فيه بـ [[next/script]] و strategy.`,
            mistakes: R`script عادي في الـ head بيقرا عنصر فيلاقيه null. و [[async]] لكود بيعتمد على كود تاني (jQuery ثم plugin): الترتيب مش مضمون. و [[window.onload]] لكل حاجة فالصفحة تستنى الصور. وتفتح ملف فيه module بدبل كليك ([[file://]]) فيطلع CORS error. وفي الانترفيو: «الفرق بين defer و async؟» والإجابة: الاتنين بيحمّلوا في الخلفية، defer بيستنى الـ HTML وبيحافظ على الترتيب، و async لأ.`
          },
          lines: [
            R`[[async]]: يتنفذ أول ما يوصل، من غير ترتيب.`,
            R`[[defer]]: بعد الـ HTML، بالترتيب.`,
            R`module: deferred لوحده، وفيه import.`,
            "inline script عادي.",
            R`بيطبع [["loading"]]: الـ HTML لسه بيتقري.`,
            "بعد ما الـ HTML يخلص والـ defer يشتغلوا.",
            R`[[load]]: بعد الصور والـ CSS كمان، متأخر.`,
            "قفلة."
          ],
          sol: R`الترتيب: [[inline: loading]] ← [[app.js <h1>]] ← [[main.js <h1>]] ← [[DOMContentLoaded]] ← [[load]]. الاتنين لاقيين الـ h1 لأنهم استنوا الـ HTML.

لما تشيل [[defer]]: [[app.js]] بيطلع الأول وبيطبع [[app.js null]]، لأنه اشتغل وهو في الـ head قبل ما المتصفح يوصل للـ body. ده بالظبط الـ bug الشهير. و main.js لسه تمام لأن module = deferred.

لو فتحت الملف بدبل كليك هتلاقي main.js مشتغلش وفيه error عن CORS أو origin: الـ modules محتاجة [[http://]]، استخدم [[npx serve]] أو Live Server.`
        }
      ]
    },
    {
      t: "scope و closures",
      l: 2,
      n: "المتغير شايفه مين، والـ hoisting، وليه الدالة بتفتكر متغيرات اتعملت برّاها",
      items: [
        {
          cmd: "scope",
          title: "المتغير ده شايفه مين؟ (lexical scope)",
          desc: R`الـ scope هو المكان اللي المتغير عايش فيه. فيه ٣ مستويات: global (الملف أو الصفحة كلها)، و function (جوه الدالة)، و block (بين [[{ }]] مع let و const).

الـ scope في JS «lexical»: بيتحدد من مكان الكود وانت بتكتبه، مش من مكان النداء. الدالة الداخلية شايفة متغيرات الدوال اللي حواليها، والعكس لأ. ولما تقرا متغير، JS بيدوّر في الـ scope الحالي، ولو ملقاهوش يطلع للي فوقه، لحد الـ global (scope chain).`,
          example: R`const app = "shop";                 // global scope
function checkout() {
  const total = 100;                // function scope
  if (total > 50) {
    const discount = 10;            // block scope
    console.log(app, total, discount);
  }
  console.log(typeof discount);     // "undefined": برا الـ block
}
function outer() {
  const secret = "x";
  function inner() {
    return secret;                  // مش لاقيه هنا، فطلع لـ outer
  }
  return inner();
}
checkout();
outer(); // "x"`,
          try: R`عرّف [[const app = "admin"]] جوه [[checkout]] قبل الـ if، وشوف الـ console.log بيطبع أنهي app (الأقرب بيكسب، ودي اسمها shadowing). وبعدين نادي [[inner()]] من برا outer واقرا الـ error.`,
          flag: "script",
          deep: {
            why: "أي bug من نوع «المتغير ده undefined ليه؟» أو «مين اللي غيّر القيمة دي؟» بيرجع للـ scope. وهو الأساس اللي الـ closures مبنية عليه، ودي أشهر سؤال انترفيو JS.",
            how: R`كل دالة وكل block بيعملوا environment جديد فيه متغيراتهم، ومعاه reference للـ environment اللي اتكتبوا جواه. البحث عن متغير بيمشي في السلسلة دي لفوق. وعشان السلسلة بتتحدد وقت الكتابة (lexical)، الدالة لو اتنادت من مكان تاني خالص، لسه شايفة المتغيرات بتاعة مكان تعريفها. ده عكس dynamic scope اللي في bash مثلًا.

الـ modules (ESM) ليها scope خاص بيها: الـ const في أول ملف module مش global، ومش بيظهر في ملف تاني غير لو عملته export. أما الـ script العادي في المتصفح، فالـ var والدوال في أوله بيبقوا على [[window]].

و [[globalThis]] هو الـ global object في أي بيئة ([[window]] في المتصفح و [[global]] في Node).`,
            when: "خلّي كل متغير في أضيق scope ممكن. الـ global للحاجات اللي فعلًا مشتركة، ويستحسن تبقى في module وتتعمل import.",
            mistakes: R`نفس اسم المتغير جوه وبرا (shadowing) فتفتكر انك بتعدّل اللي برا. وتعتمد على متغيرات global بين ملفات. وتنسى let/const فتعمل global بالغلط. وفي الانترفيو: «يعني إيه lexical scope؟» و «scope chain».`
          },
          lines: [
            "متغير global: الكل شايفه.",
            "دالة: ليها scope بتاعها.",
            R`[[total]] جوه الدالة بس.`,
            "block.",
            R`[[discount]] جوه الـ block ده بس.`,
            "الـ block شايف كل اللي فوقه.",
            "قفلة الـ block.",
            R`برا الـ block: [[discount]] مش موجود.`,
            "قفلة.",
            "دالة جواها دالة.",
            "متغير في الدالة الخارجية.",
            "دالة داخلية.",
            R`بتقرا [[secret]] من الـ scope اللي فوقها.`,
            "قفلة.",
            "نادي الداخلية.",
            "قفلة.",
            "شغّل.",
            "شغّل."
          ],
          sol: R`بعد ما تضيف [[const app = "admin"]] جوه checkout، الـ console.log بيطبع [[admin 100 10]]: JS بيدوّر على الاسم من الـ scope الأقرب ويطلع لبرّه، فلقى app بتاعة checkout قبل ما يوصل للـ global. الـ global نفسها متغيرتش، ولو طبعت app برّه الدالة هتلاقيها [["shop"]].

[[inner()]] من برّه outer بتطلع [[ReferenceError: inner is not defined]]: inner متعرّفة جوه outer، فمش موجودة في الـ global scope. الـ scope بيتحدد بمكان كتابة الكود (lexical)، مش بمكان النداء. ولو حطيت [[const app]] بعد الـ if بدل قبلها، هيطلع ReferenceError (TDZ) مش «shop»، لأن الاسم محجوز في الـ scope من أوله (الدرس الجاي).`
        },
        {
          cmd: "hoisting و TDZ",
          title: "ليه تقدر تنادي دالة قبل ما تكتبها؟",
          desc: R`قبل ما الكود يشتغل، JS بيعدّي على الـ scope ويسجّل كل التعريفات. ده اسمه hoisting: كأن التعريفات اتشالت لأول الـ scope.

بس كل نوع بيتسجّل بشكل مختلف: الـ function declaration بتتسجّل كاملة (تقدر تناديها قبل سطرها). و [[var]] بيتسجّل بقيمة undefined. و [[let]] و [[const]] و [[class]] بيتسجّلوا من غير قيمة، ولو لمستهم قبل سطرهم يطلع ReferenceError. الفترة دي اسمها TDZ (temporal dead zone).`,
          example: R`sayHi();                        // شغال: الدالة متسجّلة كاملة
function sayHi() { console.log("hi"); }
console.log(a);                 // undefined: var من غير قيمة
var a = 1;
greet();                        // TypeError: greet is not a function
var greet = () => console.log("hey");
console.log(b);                 // ReferenceError: Cannot access 'b' before initialization
let b = 2;`,
          try: R`شغّل الكود في ملف بـ Node، هتلاقيه وقف عند [[greet()]]. علّق السطر ده وشغّل تاني عشان توصل للـ ReferenceError. وبعدين غيّر [[var greet]] لـ [[const greet]] وشوف الرسالة اتغيرت لإيه.`,
          flag: "script",
          deep: {
            why: "بيفسّر رسايل errors غريبة زي «Cannot access before initialization» و «is not a function» على حاجة انت شايفها متعرّفة. ومن أشهر أسئلة «اتوقع الناتج».",
            how: R`الـ engine بيشتغل على مرحلتين: الأولى بيعمل الـ environment ويسجّل فيه كل الأسماء، والتانية بينفّذ سطر سطر.

في المرحلة الأولى: [[function f() {}]] بتتسجّل ومعاها جسمها. [[var x]] بيتسجّل ويتحط فيه undefined. [[let]] و [[const]] و [[class]] بيتسجّلوا «uninitialized»، وأي قراية ليهم قبل ما التنفيذ يوصل لسطرهم بترمي ReferenceError.

عشان كده [[var greet = () => ...]] بتدي TypeError مش ReferenceError: المتغير موجود وقيمته undefined، وانت بتحاول تنادي undefined.

الـ TDZ حاجة كويسة: بتمسك الغلط بدل ما تديك undefined بهدوء. وهي زمنية مش مكانية: دالة مكتوبة فوق [[let x]] تقدر تقرا x عادي لو اتنادت بعد السطر ده.`,
            when: R`استفيد من hoisting الدوال لو عايز تكتب الـ main فوق والتفاصيل تحت. غير كده، عرّف قبل ما تستخدم.`,
            mistakes: R`تفتكر إن let و const مبيتعملهمش hoisting خالص: بيتعمل، بس في TDZ. وتنادي arrow function متعرّفة تحت. وفي الانترفيو: «إيه الناتج؟» على كود زي اللي فوق، و «إيه هو TDZ؟».`
          },
          lines: [
            "نداء قبل التعريف: شغال لأن الـ declaration اتسجّلت كاملة.",
            "التعريف.",
            R`[[var a]] اتسجّل بـ undefined.`,
            "هنا بس القيمة اتحطت.",
            R`[[greet]] موجود بس قيمته undefined، ومينفعش تنادي undefined.`,
            "الدالة اتحطت هنا بس.",
            R`[[b]] في TDZ: ReferenceError.`,
            "التعريف."
          ],
          sol: R`أول تشغيل بيطبع [[hi]] وبعدين [[undefined]]، وبيقف عند [[TypeError: greet is not a function]]: [[var greet]] اتعمله hoisting بقيمة undefined، والنداء على undefined كـ function بيطلع TypeError مش ReferenceError.

بعد ما تعلّق سطر [[greet()]]: بيطبع hi و undefined وبعدين [[ReferenceError: Cannot access 'b' before initialization]]. الـ let اتعمله hoisting برضه، بس في الـ TDZ لحد سطر التعريف.

ولو خليت [[const greet]] (ورجّعت سطر النداء): الرسالة بتبقى [[ReferenceError: Cannot access 'greet' before initialization]]. يعني نفس الغلطة بقت error أوضح بيقولك المشكلة فين بالظبط، وده سبب إن const أحسن من var حتى في الدوال.`
        },
        {
          cmd: "closure",
          title: "يعني إيه closure؟",
          desc: R`الـ closure دالة فاكرة المتغيرات اللي كانت حواليها وقت ما اتعملت، حتى بعد ما الدالة اللي حواليها خلصت ورجعت.

ده بيحصل تلقائي مع كل دالة في JS، وبيستخدم في: متغيرات private محدش يوصلها غير من دوال معينة، ودوال «متظبطة» (factory)، والـ callbacks والـ event handlers اللي بتقرا متغيرات، و hooks في React.`,
          example: R`function createCounter(start = 0) {
  let count = start;
  return {
    increment() { return ++count; },
    get() { return count; },
  };
}
const c1 = createCounter();
const c2 = createCounter(10);
c1.increment();          // 1
c1.increment();          // 2
c2.increment();          // 11: كل counter ليه count بتاعه
console.log(c1.count);   // undefined: مفيش طريقة توصله غير من الدوال
console.log(c1.get());   // 2`,
          try: R`اكتب [[once(fn)]] بترجّع دالة بتنادي fn أول مرة بس، وبعد كده بترجّع نفس الناتج الأول. هتحتاج متغيرين في الـ closure: [[called]] و [[result]]. اكتب الحل في المربع اللي تحت ودوس «شغّل واختبر».`,
          flag: "script",
          deep: {
            why: "ده السؤال رقم واحد في انترفيوهات JS. وهو اللي بيفسّر ليه الـ callbacks بتشتغل، وليه React hooks بتقرا قيم «قديمة» ساعات (stale closure)، وإزاي تعمل private state من غير classes.",
            how: R`لما دالة بتتعمل، بتاخد معاها reference للـ environment اللي اتعملت فيه (الـ scope chain من درس scope). لما [[createCounter]] بتخلص، الـ environment بتاعها كان المفروض يتمسح، بس الـ methods اللي رجعت لسه شايلة reference ليه، فالـ garbage collector مبيمسحوش.

كل نداء لـ createCounter بيعمل environment جديد، عشان كده c1 و c2 منفصلين.

الـ closure بيشيل reference للمتغير نفسه مش نسخة من قيمته. فلو المتغير اتغير بعد كده، الدالة هتشوف القيمة الجديدة. والعكس في React: كل render بيعمل دوال جديدة شايلة قيم الـ render ده، فـ [[setInterval]] اتعمل في أول render هيفضل شايف الـ state القديمة (stale closure)، والحل dependency array أو [[setCount((c) => c + 1)]] (تاب React).

وتكلفتها: أي متغير في closure عايش طول ما الدالة عايشة. لو الـ closure شايل object ضخم وأنت ناسيه في listener، ده memory leak (المستوى ٣).`,
            when: "private state، و factories، و memoize، و debounce، و once، وأي callback محتاج داتا من السياق اللي حواليه.",
            mistakes: R`تفتكر إن الـ closure بياخد نسخة من القيمة. وتنسى إن كل نداء بيعمل state جديدة، فتنادي [[createCounter()]] في كل مرة بدل ما تحفظ الناتج. وفي الانترفيو: متعرّفش closure بـ «دالة جوه دالة» بس؛ قول «دالة فاكرة الـ lexical environment بتاعها حتى بعد ما الدالة الخارجية خلصت» واديهم مثال counter.`
          },
          lines: [
            "دالة بتعمل counter.",
            R`[[count]] متغير محلي، المفروض يموت لما الدالة تخلص.`,
            "بترجّع object فيه دالتين.",
            R`الدالة دي شايلة [[count]] معاها (closure).`,
            "ودي نفس الـ count.",
            "قفلة الـ object.",
            "قفلة الدالة.",
            "counter أول.",
            "counter تاني منفصل تمامًا.",
            "1.",
            "2: الـ count اتفتكر بين النداءات.",
            "التاني ليه count بتاعه.",
            R`[[count]] مش خاصية على الـ object، فمحدش يقدر يعدّله من برّه.`,
            "القراية بس عن طريق الدالة."
          ],
          sol: R`[[once]] بتحتفظ بـ [[called]] و [[result]] في الـ closure. لو [[init = once((x) => x * 2)]]، يبقى [[init(5)]] بـ 10، و [[init(100)]] بـ 10 برضه، والدالة الأصلية اتنادت مرة واحدة بس.

الغلطة الشائعة إنك تحط [[let called = false]] جوه الدالة اللي بترجّعها بدل ما تحطه برّاها: ساعتها كل نداء بيعمل متغير جديد بـ false وكأن مفيش once. والغلطة التانية إنك تفحص [[if (!result)]] بدل called، فلو fn رجّعت 0 أو undefined هتتنادي تاني. ده pattern حقيقي بيستخدم في init لمرة واحدة، وبيتسأل في الانترفيو.`,
          solCode: R`function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
let runs = 0;
const init = once((x) => { runs++; return x * 2; });
console.log(init(5), init(100), runs); // 10 10 1`,
          check: {
            lang: "js",
            starter: R`function once(fn) {
  // called و result هنا، برّا الدالة اللي هترجّعها
  return fn;
}`,
            tests: R`test("init(5) ← 10 وبعدين init(100) ← 10 برضه", () => {
  const init = once((x) => x * 2);
  expect([init(5), init(100)]).toEqual([10, 10]);
});
test("الدالة الأصلية بتتنادي مرة واحدة بس", () => {
  let runs = 0;
  const f = once(() => runs++);
  f(); f(); f();
  expect(runs).toBe(1);
});
test("لو fn رجّعت 0 أو undefined متتناديش تاني (افحص called مش result)", () => {
  let runs = 0;
  const f = once(() => { runs++; return 0; });
  f(); f();
  expect([runs, f()]).toEqual([1, 0]);
});
test("كل once ليها closure لوحدها", () => {
  const a = once(() => "a"), b = once(() => "b");
  expect([a(), b()]).toEqual(["a", "b"]);
});
test("بتعدّي الـ arguments و this", () => {
  const obj = { n: 3, get: once(function (x) { return this.n + x; }) };
  expect(obj.get(4)).toBe(7);
});`,
            solution: R`function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}`
          }
        },
        {
          cmd: "closures في loop",
          title: "ليه اللوب ده بيطبع 3 3 3 مش 0 1 2؟",
          desc: R`أشهر سؤال «اتوقع الناتج» في JS: loop بـ [[var]] جواها [[setTimeout]]. الإجابة 3 3 3، لأن كل الـ callbacks شايلة نفس المتغير [[i]]، ولما اشتغلوا (بعد ما اللوب خلص) كان بقى 3.

الحل: [[let]] بدل [[var]]. الـ let في for بيعمل متغير جديد لكل لفة، فكل callback شايل الـ i بتاعته. والحل القديم قبل let كان IIFE.`,
          example: R`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}
for (var k = 0; k < 3; k++) {
  ((n) => setTimeout(() => console.log("iife", n), 0))(k);
}`,
          try: R`قبل ما تشغّل، اكتب الناتج اللي متوقعه على ورقة (٩ سطور). شغّل وقارن. وبعدين غيّر الـ [[0]] في أول setTimeout لـ [[1000]]: سطور var اتأخرت للآخر، بس قيمتها لسه 3 3 3؟ ليه؟`,
          flag: "script",
          deep: {
            why: "السؤال ده بيختبر ٣ حاجات مع بعض: الـ scope بتاع var و let، والـ closures، وإن setTimeout بيشتغل بعد الكود المتزامن (event loop، المستوى ٣). ونفس المشكلة بتحصل في الحقيقة مع event listeners جوه loops.",
            how: R`مع [[var]]: فيه متغير [[i]] واحد للدالة كلها. اللوب بيلف ٣ مرات ويسجّل ٣ callbacks، وكلهم شايلين نفس المتغير. اللوب بيخلص و i بقى 3 (الشرط وقف عنده). وبعدين الـ callbacks بتشتغل وكلها تقرا 3.

مع [[let]] في رأس الـ for: الـ spec بيقول اعمل binding جديد لكل لفة وانسخ فيه القيمة، فكل callback شايل متغير مختلف.

الـ IIFE (Immediately Invoked Function Expression) بتعمل scope جديد يدويًا: [[n]] باراميتر بياخد نسخة من k كل لفة.

والـ setTimeout بـ 0 مش معناه «دلوقتي»: معناه «بعد ما الكود الحالي يخلص وأقرب فرصة». عشان كده اللوب كله بيخلص الأول.`,
            when: R`دايمًا [[let]] أو [[const]] في الـ loops ([[for (const x of arr)]]). و forEach كمان حل، لأن كل نداء للـ callback ليه scope بتاعه.`,
            mistakes: R`تفتكر إن setTimeout بـ 0 بيشتغل فورًا. وتحل المشكلة بـ let من غير ما تعرف تشرح ليه. وفي الانترفيو: اشرح الـ 3 حاجات (var واحد مشترك، الـ callbacks بتشتغل بعد اللوب، let بيعمل binding لكل لفة) واذكر حل IIFE كحل قديم.`
          },
          lines: [
            R`[[var]]: متغير واحد للكل.`,
            R`٣ callbacks كلهم شايلين نفس [[i]]، وهيشتغلوا بعد اللوب ما يخلص: 3 3 3.`,
            "قفلة.",
            R`[[let]]: متغير جديد لكل لفة.`,
            "كل callback شايل الـ j بتاعته: 0 1 2.",
            "قفلة.",
            "var تاني.",
            R`IIFE بتاخد نسخة من k في [[n]] كل لفة: 0 1 2.`,
            "قفلة."
          ],
          sol: R`الناتج بـ 0 في كل حتة: [[var 3]] ٣ مرات، و [[let 0]] و [[let 1]] و [[let 2]]، و [[iife 0]] و [[iife 1]] و [[iife 2]]. var فيها متغير i واحد للـ loop كلها، ولما الـ callbacks اشتغلت كانت الـ loop خلصت و i بقى 3. let بتعمل j جديد لكل لفة، والـ IIFE بتعمل n جديد بنسخة من k.

بعد ما تخلي أول timeout بـ 1000: الناتج [[let 0 let 1 let 2 iife 0 iife 1 iife 2]] وبعد ثانية [[var 3 var 3 var 3]]. التأخير غيّر الترتيب بس مش القيمة، لأن القيمة مش بتتاخد وقت ما الـ setTimeout اتكتب، بتتقري وقت ما الـ callback يشتغل، و i ساعتها 3 سواء استنيت 0 ولا 1000. لو كنت متوقع 0 1 2 مع var فده بالظبط الغلط اللي السؤال بيختبره.`
        }
      ]
    }
]);

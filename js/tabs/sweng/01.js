// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("sweng", {
  label: "هندسة البرمجيات",
  prompt: "$ ",
  lab: R`mkdir -p ~/lab/sweng && cd ~/lab/sweng
npm init -y && npm i -D typescript tsx vitest
npx tsx main.ts`,
  labText: "الأمثلة هنا TypeScript. خد كود قديم من مشروع عندك وطبّق عليه كل درس: refactor صغير، واختبار قبله وبعده.",
  levels: {"1":["كود نضيف","naming، و functions صغيرة، و DRY و KISS و YAGNI، والتعامل مع الأخطاء"],"2":["التصميم","composition ولا inheritance، و dependency injection و SOLID في كود حقيقي، و refactoring بأمان، وإمتى الـ pattern يبقى زيادة"],"3":["الفريق والجودة","TDD وأنواع الاختبارات، و debugging و git bisect، وقراية codebase جديد، و PRs و code review، والتقدير، و Scrum و Kanban والـ tickets والـ tech debt والـ ADRs والـ docs"]},
  categories: [
    {
      t: "الأسماء والدوال",
      l: 1,
      n: "الكود بيتقري أكتر بكتير ما بيتكتب، فاكتبه للي هيقراه بعدك (وغالبًا ده انت بعد ٦ شهور)",
      items: [
        {
          cmd: "naming",
          title: "اسم يقول الحاجة دي إيه من غير ما تفتح الكود",
          desc: R`الاسم الكويس بيقول الحاجة دي إيه أو بتعمل إيه، من غير تعليق ومن غير ما تدخل تقرا الدالة. متغير [[d]] مش بيقول حاجة، و [[daysSinceLastLogin]] بيقول كل حاجة.

القواعد العملية: المتغير اسم ([[user]] و [[totalPrice]])، والدالة فعل ([[getUser]] و [[calculateTotal]])، والـ boolean سؤال جوابه آه أو لأ ([[isActive]] و [[hasAccess]] و [[canEdit]])، والـ array جمع ([[users]] مش [[data]]).`,
          example: R`// قبل: لازم تخمّن كل حرف
function check(u: { r: string; e: boolean }) {
  return u.r === "admin" || u.e;
}

// بعد: الأسماء بتحكي
type Member = { role: "admin" | "editor" | "viewer"; isOwner: boolean };
function canEditPost(member: Member): boolean {
  return member.role === "admin" || member.isOwner;
}
const members: Member[] = [
  { role: "viewer", isOwner: true },
  { role: "viewer", isOwner: false },
];
const editors = members.filter(canEditPost);
console.log(editors.length); // 1`,
          try: R`افتح ملف قديم عندك ودوّر على ٥ أسماء زي [[data]] و [[res]] و [[temp]] و [[flag]] و [[handle2]]. غيّر كل واحد بـ F2 في VS Code (Rename Symbol) لاسم بيقول الحقيقة، وشوف الكود بقى محتاج تعليقات أقل ولا لأ.`,
          flag: "script",
          deep: {
            why: "الكود بيتقري أكتر ما بيتكتب بكتير: وانت بتصلّح bug، ووانت بتراجع PR، ووانت راجع للمشروع بعد ٦ شهور. الاسم الغلط بيخليك تفتح الدالة وتقراها سطر سطر عشان تعرف بتعمل إيه، والاسم الصح بيوفّر ده كله.",
            how: R`فيه كام قاعدة بتغطي أغلب الحالات:

الدوال أفعال بتقول النتيجة: [[getUser]] بترجع user، و [[createOrder]] بتعمل order، و [[isExpired]] بترجع boolean. ولو الاسم فيه And ([[validateAndSave]]) فالاسم نفسه بيقولك قسّمها.

الـ booleans بـ [[is]] و [[has]] و [[can]] و [[should]]، وبالإيجاب: [[isEnabled]] مش [[isNotDisabled]]، عشان [[!isNotDisabled]] بتلف الدماغ.

الوحدة جوه الاسم لما الرقم ممكن يتفهم غلط: [[timeoutMs]] و [[priceCents]] و [[durationSeconds]]. bugs كتير في الوقت سببها حد افتكر الرقم ثواني وهو ميلي ثانية.

كلمة واحدة لكل فكرة في المشروع كله: لو بتقول [[fetch]] في مكان، متقولش [[get]] و [[load]] و [[retrieve]] لنفس الحاجة في أماكن تانية.

ومتحطش النوع في الاسم ([[userArray]] و [[strName]]): TypeScript عارف النوع، والاسم يقول المعنى. والاسم طوله على قد عمره: [[i]] جوه loop من ٣ سطور تمام، بس متغير عايش في ملف كامل محتاج اسم كامل.

وفي VS Code غيّر الاسم بـ F2 (Rename Symbol) مش find/replace، عشان يغيّره في كل الملفات صح ومن غير ما يلمس كلمة شبهه (تاب VS Code).`,
            when: "كل مرة تكتب اسم. وكل مرة تلاقي نفسك بتكتب تعليق يشرح متغير ده إيه، ده غالبًا معناه إن الاسم محتاج يتغير.",
            mistakes: R`أسماء عامة زي [[data]] و [[info]] و [[result]] و [[handleClick2]]. واختصارات مش مشهورة ([[usrCnt]]). واسم بقى كدب بعد تعديل: [[getActiveUsers]] اللي بقت ترجع كل الـ users بعد ما حد شال الفلتر، ودي أسوأ من اسم وحش لأنها بتضلّلك. وفي انترفيو live coding، الأسماء الواضحة من أول سطر بتفرق مع اللي بيقيّمك أكتر ما تتخيل.`
          },
          teach: R`## الفكرة

المثال فيه نفس المنطق مكتوب مرتين: مرة بأسماء لازم تخمّنها، ومرة بأسماء بتحكي. هنقرا الاتنين سطر سطر ونشوف الفرق بيبان فين. كل الأمثلة هنا اتشغّلت بـ [[npx tsx]] (tsx 4.23 على Node 24.19) واتفحصت بـ [[npx tsc --noEmit --strict]] (TypeScript 7.0) على ويندوز.

---

## ١. النسخة القديمة

~~~text main.ts
function check(u: { r: string; e: boolean }) {
  return u.r === "admin" || u.e;
}
~~~

- [[function check]]: دالة اسمها «افحص». تفحص إيه؟ مش مكتوب.
- [[u: { r: string; e: boolean }]]: الـ parameter اسمه [[u]]، ونوعه object فيه خانتين: [[r]] نص، و [[e]] قيمة [[true]] أو [[false]]. الـ [[:]] بعد الاسم في TypeScript معناها «نوعه كذا».
- [[===]]: مقارنة بالقيمة والنوع مع بعض. و [[||]] معناها «أو»: لو الجزء الأول [[true]] الدالة ترجّعه، غير كده ترجّع الجزء التاني.

الكود شغال، والمشكلة إن اللي بيقراه لازم يدوّر: [[r]] دي role؟ و [[e]] دي email ولا enabled ولا editor؟ ولأن [[r]] نوعها [[string]] مفتوح، أي غلطة كتابة بتعدّي:

~~~text الناتج: check({ r: "admin", e: false }), check({ r: "viewer", e: true }), check({ r: "Admin", e: false })
true true false
~~~

التالتة كتبت [["Admin"]] بحرف كبير، والدالة رجّعت [[false]] من غير أي اعتراض. ده bug صامت.

---

## ٢. النوع باسم واضح

~~~text main.ts
type Member = { role: "admin" | "editor" | "viewer"; isOwner: boolean };
~~~

- [[type Member = ...]]: بنسمّي شكل الداتا مرة واحدة، فبعد كده نكتب [[Member]] بدل ما نكرر الشكل كله.
- [[role: "admin" | "editor" | "viewer"]]: الـ [[|]] معناها «واحدة من دول». يعني [[role]] مش أي نص، دي واحدة من ٣ قيم بس (اسمها union of literal types).
- [[isOwner: boolean]]: الاسم سؤال جوابه آه أو لأ، فمش محتاج تعليق يقول إنه boolean.

ودلوقتي نفس غلطة [["Admin"]] بتتمسك قبل التشغيل:

~~~text الناتج: npx tsc --noEmit --strict
n2.ts(5,15): error TS2820: Type '"Admin"' is not assignable to type '"admin" | "editor" | "viewer"'. Did you mean '"admin"'?
~~~

[[(5,15)]] رقم السطر والعمود، و TypeScript كمان اقترح الصح.

---

## ٣. الدالة باسم السؤال

~~~text main.ts
function canEditPost(member: Member): boolean {
  return member.role === "admin" || member.isOwner;
}
~~~

- [[canEditPost]]: فعل بـ [[can]] في الأول، فاللي بيقرا عارف إنها بترجّع آه أو لأ، وعارف السؤال: «يقدر يعدّل البوست؟».
- [[member: Member]]: اسم الـ parameter هو الحاجة نفسها، مش حرف.
- [[): boolean]]: نوع الرجوع مكتوب، فلو حد غيّر الجسم ورجّع حاجة تانية بالغلط، [[tsc]] هيعترض.
- السطر التاني هو نفس منطق [[check]] بالظبط، بس بيتقري جملة: «الدور admin أو هو صاحب البوست».

---

## ٤. الـ array والـ filter

~~~text main.ts
const members: Member[] = [
  { role: "viewer", isOwner: true },
  { role: "viewer", isOwner: false },
];
const editors = members.filter(canEditPost);
console.log(editors.length); // 1
~~~

- [[Member[]]]: الـ [[[]]] بعد النوع معناها «array من النوع ده». والاسم [[members]] جمع، فباين إنه قايمة.
- [[members.filter(canEditPost)]]: [[filter]] بتعدّي على كل عنصر وتنادي الدالة عليه، واللي رجّعتله [[true]] بيفضل. لاحظ إننا بعتنا اسم الدالة نفسه من غير [[()]]، يعني «استخدم الدالة دي»، مش «نفّذها دلوقتي».
- [[editors]]: اسم الناتج بيقول هو إيه.

~~~text الناتج: console.log(editors) ثم console.log(editors.length)
[ { role: 'viewer', isOwner: true } ]
1
~~~

العضو الأول [[viewer]] بس هو صاحب البوست فعدّى، والتاني لأ. والسطر [[members.filter(canEditPost)]] بيتقري إنجليزي: «هات الأعضاء اللي يقدروا يعدّلوا البوست».

---

## ٥. حل التمرين (solCode)

النسخة القديمة اسمها [[handle2(data)]] وفيها [[res]] و [[temp]] و [[flag]]. الجديدة:

~~~text sol.ts
async function hasPlacedOrders(userId: string, loadUser: (id: string) => Promise<User>): Promise<boolean> {
  const user = await loadUser(userId);
  return user.orders.length > 0;
}
~~~

- [[hasPlacedOrders]]: اسم بـ [[has]] لأنها بترجّع boolean، والسؤال كامل في الاسم.
- [[userId: string]] بدل [[data: any]]: الاسم بيقول إنه id، والنوع بقى محدد بدل [[any]] اللي بيقفل الفحص.
- [[loadUser: (id: string) => Promise<User>]]: parameter نوعه **دالة** بتاخد id وبترجّع [[Promise]] فيه [[User]]. بنبعت طريقة التحميل من برّه بدل [[fetch]] جوه الدالة، فنقدر نجرّبها من غير سيرفر (ده dependency injection، ليه درس في المستوى ٢).
- [[async]] و [[await]]: الدالة بتستنى التحميل يخلص من غير ما توقف البرنامج، وبترجّع [[Promise<boolean>]].
- [[flag]] اختفى خالص: الشرط [[user.orders.length > 0]] نفسه هو الإجابة.

~~~text الناتج: npx tsx sol.ts
true
~~~

---

## الخلاصة

| الحاجة | الاسم بيبقى | مثال |
|---|---|---|
| متغير | اسم بيقول هو إيه | [[user]] و [[editors]] |
| دالة | فعل بيقول بتعمل إيه | [[canEditPost]] و [[loadUser]] |
| boolean | سؤال | [[isOwner]] و [[hasPlacedOrders]] |
| array | جمع | [[members]] |

- الاسم الكويس بيوفّر تعليق، والنوع المحدد ([["admin" | "editor" | "viewer"]] بدل [[string]]) بيمسك غلطات الكتابة.
- غيّر الأسماء بـ F2 في VS Code مش Find/Replace.`,
          lines: [
            "الاسم [[check]] مبيقولش بيشيك على إيه، و [[u]] و [[r]] و [[e]] حروف لازم تخمّنها.",
            "[[e]] ممكن تبقى email أو enabled أو editor. محدش يعرف من غير ما يدوّر.",
            "قفلة.",
            "النوع باسم واضح، و [[role]] قيم محددة بدل string مفتوح، و [[isOwner]] boolean اسمه سؤال.",
            "اسم الدالة هو السؤال بالظبط: العضو ده يقدر يعدّل البوست؟ ورجوعها boolean مكتوب.",
            "نفس المنطق، بس بيتقري زي جملة.",
            "قفلة.",
            "array اسمها جمع.",
            "عضو owner.",
            "عضو مش owner.",
            "قفلة الـ array.",
            "[[members.filter(canEditPost)]] بتتقري إنجليزي: هات اللي يقدروا يعدّلوا.",
            "بيطبع 1."
          ],
          sol: R`مفيش ناتج واحد صح هنا، بس فيه اختبار سريع: اقرا اسم كل متغير لوحده من غير ما تبص على السطر اللي حواليه. لو عرفت هو إيه (user؟ فلوس؟ بالقرش ولا بالجنيه؟) يبقى الاسم نجح. مثال من كود حقيقي في الحل: [[handle2(data)]] بقت [[hasPlacedOrders(userId)]]، و [[temp]] بقت [[user]]، و [[flag]] اتشال خالص لأن الـ boolean بقى هو الـ return نفسه ([[user.orders.length > 0]]). والناتج [[true]].

بعد الـ F2 هتلاقي تعليقات زي [[// check if user has orders]] بقت بتعيد الاسم بالحرف، فامسحها. ده المقياس اللي التمرين بيسأل عنه: كل اسم كويس بيوفّر تعليق.

الغلط الشائع إنك تستخدم Find/Replace بدل F2: هيغيّر [[data]] جوه strings وفي ملفات ملهاش علاقة، و [[res.data]] بتاعة axios هتبوظ. و F2 نفسه مش بيغيّر خانات جاية من برا (body أو عمود في الداتابيز أو response من API): لو الاسم جزء من شكل الداتا، ده تغيير interface مش rename، وبيتعمل لوحده بعد ما تعرف مين بيبعت ومين بيستقبل.`,
          solCode: R`// قبل:
// async function handle2(data: any) {
//   const res = await fetch($__bt/api/users/$__{data}$__bt);
//   const temp = await res.json();
//   let flag = false;
//   if (temp.orders.length > 0) flag = true;
//   return flag;
// }

type User = { id: string; orders: { id: string }[] };

async function hasPlacedOrders(userId: string, loadUser: (id: string) => Promise<User>): Promise<boolean> {
  const user = await loadUser(userId);
  return user.orders.length > 0;
}

const fakeLoadUser = async (id: string): Promise<User> => ({ id, orders: [{ id: "o1" }] });
hasPlacedOrders("42", fakeLoadUser).then((hasOrders) => console.log(hasOrders)); // true`
        },
        {
          cmd: "small functions",
          title: "كل دالة تعمل حاجة واحدة بس",
          desc: R`الدالة الكويسة بتعمل حاجة واحدة، واسمها بيقولها، وتقدر تشرحها في جملة من غير «و». لو محتاج «و» (بتتحقق من الداتا وبتحسب السعر وبتبعت إيميل)، يبقى دي تلات دوال.

المقياس مش عدد السطور، المقياس مستوى تفاصيل واحد: الدالة الكبيرة بتحكي الخطوات بأسماء، وكل خطوة في دالة لوحدها فيها التفاصيل.`,
          example: R`type Item = { price: number; qty: number };
type Order = { email: string; items: Item[] };

function validate(order: Order): void {
  if (!order.email.includes("@")) throw new Error("invalid email");
  if (order.items.length === 0) throw new Error("empty order");
}
function subtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
function placeOrder(order: Order): number {
  validate(order);
  const total = subtotal(order.items);
  // sendReceipt(order.email, total) هنا في المشروع الحقيقي
  return total;
}
console.log(placeOrder({ email: "you@example.com", items: [{ price: 50, qty: 2 }] })); // 100`,
          try: R`خد أطول دالة في مشروع عندك. اكتب فوق كل حتة فيها تعليق من كلمتين بيقول بتعمل إيه، وبعدين حوّل كل تعليق لدالة بنفس الاسم (في VS Code: حدد الكود و Ctrl+. واختار Extract to function). في الآخر الدالة الأصلية لازم تتقري زي قايمة خطوات.`,
          flag: "script",
          deep: {
            why: R`الدالة الطويلة صعب تفهمها، وصعب تختبرها (لازم تجهّز كل حاجة عشان توصل لسطر واحد جواها)، وصعب تعيد استخدام جزء منها. والـ bugs بتستخبى في النص، لأن المتغيرات بتعيش ٢٠٠ سطر وأي حد ممكن يغيّرها. وفي مشروع حقيقي كان فيه handler واحد للـ checkout أطول من ٧٠٠ سطر: validation وحساب وكلام مع بوابة الدفع وكتابة في الداتابيز في نفس المكان، فأي تعديل صغير كان محتاج تقرا الكل.`,
            how: R`الفكرة اسمها Extract Function، وهي أشهر refactoring: تاخد حتة كود ليها معنى، وتحطها في دالة باسم المعنى ده، وتنادي الدالة مكانها.

علامات إن الدالة محتاجة تتقسم: فيها تعليقات بتقسّمها لأجزاء ([[// validate]] و [[// calculate]])، أو فيها indent عميق، أو اسمها فيه And، أو بتاخد أكتر من ٣ أو ٤ parameters، أو عشان تختبرها محتاج mocks كتير.

والمهم مستوى التفاصيل: [[placeOrder]] بتقول «اتأكد، احسب، رجّع»، ومبتقولش الـ reduce شغال إزاي. اللي عايز التفاصيل ينزل للدالة الصغيرة، واللي عايز الصورة الكبيرة يقرا الكبيرة وبس.

والدوال الصغيرة اللي بتاخد input وترجع output زي [[subtotal]] أسهل حاجة تختبرها: من غير داتابيز ومن غير mocks.`,
            when: "وانت بتكتب: لما تحس إنك محتاج تعليق يفصل جزء عن جزء. ووانت بتصلّح bug: قبل ما تعدّل في دالة ضخمة، اطلّع الجزء اللي هتعدّله في دالة لوحده واختبره.",
            mistakes: R`تقسّم لدرجة إن كل دالة سطر واحد ملوش معنى لوحده، فتلف بين ٢٠ دالة عشان تفهم حاجة بسيطة: التقسيم على المعنى مش على عدد السطور. وتعمل دوال صغيرة بس بتكلم بعض عن طريق متغيرات global بدل parameters و return، فالتقسيم بقى شكلي. وفي انترفيو لو اتسألت «إيه اللي يخلي الدالة كويسة؟» متقولش «قصيرة» وبس، قول «بتعمل حاجة واحدة، على مستوى تفاصيل واحد، واسمها بيوصفها».`
          },
          teach: R`## الفكرة

المثال طلب شراء متقسّم ٣ دوال: واحدة تتأكد، وواحدة تحسب، وواحدة كبيرة بتحكي الخطوات بس. هنفك كل دالة، ونشغّل كل واحدة لوحدها عشان نشوف ليه التقسيم ده بيسهّل الاختبار. اتشغّل بـ [[npx tsx]] على Node 24.19 (ويندوز).

---

## ١. شكل الداتا

~~~text main.ts
type Item = { price: number; qty: number };
type Order = { email: string; items: Item[] };
~~~

- [[Item]]: صنف واحد في الطلب، ليه سعر ([[price]]) وكمية ([[qty]] اختصار quantity).
- [[Order]]: الطلب كله: إيميل، وقايمة أصناف ([[Item[]]] يعني array من [[Item]]).

---

## ٢. [[validate]]: شغلتها تتأكد وبس

~~~text main.ts
function validate(order: Order): void {
  if (!order.email.includes("@")) throw new Error("invalid email");
  if (order.items.length === 0) throw new Error("empty order");
}
~~~

- [[: void]]: الدالة مبترجّعش حاجة. يا إما تعدّي في هدوء، يا إما توقف كل حاجة بـ [[throw]].
- [[order.email.includes("@")]]: النص فيه [[@]]؟ والـ [[!]] قبلها بتعكس: «لو **مفيهوش** @».
- [[throw new Error("...")]]: بتعمل خطأ برسالة وبترميه، فالدالة بتقف هنا والكود اللي ناداها مبيكملش.
- [[order.items.length === 0]]: عدد الأصناف صفر، يعني طلب فاضي.

نجرّبها لوحدها على طلبين غلط:

~~~text الناتج
invalid email
empty order
~~~

الأول [["you.example.com"]] من غير @، والتاني إيميله سليم بس مفيهوش أصناف. كل حالة ليها رسالتها.

---

## ٣. [[subtotal]]: شغلتها تحسب وبس

~~~text main.ts
function subtotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
~~~

[[reduce]] بتعدّي على الأصناف واحد واحد وبتجمّعهم في رقم واحد:

- [[(sum, item) => ...]]: دالة صغيرة (arrow function، الـ [[=>]] معناها «بترجّع»). [[sum]] المجموع لحد دلوقتي، و [[item]] الصنف الحالي.
- [[sum + item.price * item.qty]]: الضرب بيحصل قبل الجمع، فبنزوّد سعر × كمية على المجموع.
- [[, 0]] في الآخر: المجموع يبدأ من صفر. من غيره [[reduce]] على array فاضية بترمي خطأ.

~~~text الناتج: subtotal([{ price: 50, qty: 2 }, { price: 10, qty: 3 }]) و subtotal([])
130
0
~~~

٥٠×٢ = ١٠٠، و ١٠×٣ = ٣٠، والمجموع ١٣٠. والـ array الفاضية رجّعت صفر بفضل البداية [[0]]. لاحظ إننا اختبرنا الحسبة من غير إيميل ومن غير أي validation، لأنها دالة لوحدها: input وبيطلع output.

---

## ٤. [[placeOrder]]: بتحكي الخطوات

~~~text main.ts
function placeOrder(order: Order): number {
  validate(order);
  const total = subtotal(order.items);
  // sendReceipt(order.email, total) هنا في المشروع الحقيقي
  return total;
}
console.log(placeOrder({ email: "you@example.com", items: [{ price: 50, qty: 2 }] })); // 100
~~~

اقراها بصوت عالي: «اتأكد من الطلب، احسب الإجمالي، رجّعه». مفيهاش [[reduce]] ولا [[includes]]، دي تفاصيل تحت. ده المقصود بـ **مستوى تفاصيل واحد**: كل سطر فيها خطوة باسمها.

والتعليق [[// sendReceipt...]] مكان الخطوة التالتة في مشروع حقيقي (بعت الإيصال على الإيميل)، وكانت هتبقى دالة رابعة لوحدها.

~~~text الناتج: npx tsx main.ts
100
~~~

---

## ٥. حل التمرين: [[registerUser]]

الحل بيعمل نفس الحكاية مع تسجيل يوزر: ٤ دوال صغيرة ودالة بتحكي.

| الدالة | شغلتها الوحيدة |
|---|---|
| [[validateSignup]] | إيميل فيه @، وباسورد ٨ حروف على الأقل، وإيميل مش متسجل قبل كده |
| [[hashPassword]] | تحوّل الباسورد لـ hash (هنا وهمي: [[hashed:8]]، وفي الحقيقي bcrypt أو argon2) |
| [[saveUser]] | تعمل user بـ id جديد وتحطه في الـ array |
| [[welcomeMessage]] | ترجّع جملة الترحيب |
| [[registerUser]] | تنادي الأربعة بالترتيب |

تلات حاجات جديدة في الحل:

- [[{ email, password }: Input]] في [[validateSignup]]: ده destructuring، بيطلّع الخانتين من الـ object في متغيرين على طول.
- [[users.some((u) => u.email === email)]]: [[some]] بترجّع [[true]] لو عنصر واحد على الأقل حقق الشرط.
- [[saveUser(input.email, hashPassword(input.password))]]: الجوه بيتنفذ الأول: الـ hash، وبعدين الحفظ.

~~~text الناتج: npx tsx sol.ts
Welcome you@example.com
email taken
~~~

التسجيل الأول نجح. التاني بنفس الإيميل وقع في [[validateSignup]] برسالة [[email taken]]، و [[try]] و [[catch]] في آخر سطر مسكت الخطأ وطبعت رسالته بدل ما البرنامج يقع. و [[(e as Error)]] بتقول لـ TypeScript «اعتبر [[e]] Error» لأن نوعه في الـ catch [[unknown]].

---

## الخلاصة

- الدالة بتعمل حاجة واحدة لو تقدر توصفها في جملة من غير «و».
- الدالة الكبيرة بتحكي الخطوات بأسماء، والتفاصيل في الصغيرة.
- الدوال الصغيرة اللي بتاخد input وترجّع output ([[subtotal]]) بتتختبر لوحدها في سطر واحد.
- التقسيم على المعنى، مش على عدد السطور.`,
          lines: [
            "شكل الصنف: سعر وكمية.",
            "شكل الطلب.",
            "دالة شغلتها واحدة: تتأكد إن الطلب سليم، ومبترجعش حاجة.",
            "إيميل من غير @: وقّف.",
            "طلب فاضي: وقّف.",
            "قفلة.",
            "دالة شغلتها واحدة: تجمع الأسعار.",
            "سعر × كمية لكل صنف، ومجموعهم.",
            "قفلة.",
            "الدالة الكبيرة بتحكي الخطوات بس، من غير تفاصيل.",
            "خطوة ١: اتأكد.",
            "خطوة ٢: احسب.",
            "رجّع الإجمالي.",
            "قفلة.",
            "بيطبع 100."
          ],
          sol: R`الدالة الأصلية في الآخر المفروض تبقى ٤ لـ ٦ سطور، كل سطر نداء باسم الخطوة، زي [[registerUser]] في الحل: validate، وبعدين hash، وبعدين save، وبعدين welcome. لو قريتها بصوت عالي تبقى جملة، والتعليقات اللي كتبتها في الأول اختفت لأنها بقت أسامي دوال.

شغّل قبل وبعد وقارن: الحل بيطبع [[Welcome you@example.com]] وبعدين [[email taken]] للتسجيل التاني. السلوك ماتغيرش، ودا أهم شرط في أي extract.

علامة إنك قطّعت في المكان الغلط: دالة مستخرجة بتاخد ٥ أو ٦ parameters، أو VS Code طلّعلك دالة بترجع object فيه ٣ متغيرات عشان الأصلية تكمّل بيهم. معناه إن الحتة دي مش خطوة مستقلة، أو إنها بتعدّل متغيرات برا منها (side effect). جرّب تقطع في حدود تانية، أو افصل التعديل ده الأول.`,
          solCode: R`// قبل: registerUser كانت ٤٠ سطر، وفيها تعليقات: "check input" و "hash password" و "save" و "welcome mail"
type Input = { email: string; password: string };
type User = { id: number; email: string; passwordHash: string };
const users: User[] = [];

function validateSignup({ email, password }: Input): void {
  if (!email.includes("@")) throw new Error("invalid email");
  if (password.length < 8) throw new Error("password too short");
  if (users.some((u) => u.email === email)) throw new Error("email taken");
}
function hashPassword(password: string): string {
  return $__bthashed:$__{password.length}$__bt; // في الحقيقي: bcrypt أو argon2
}
function saveUser(email: string, passwordHash: string): User {
  const user = { id: users.length + 1, email, passwordHash };
  users.push(user);
  return user;
}
function welcomeMessage(user: User): string {
  return $__btWelcome $__{user.email}$__bt;
}

function registerUser(input: Input): string {
  validateSignup(input);
  const user = saveUser(input.email, hashPassword(input.password));
  return welcomeMessage(user);
}

console.log(registerUser({ email: "you@example.com", password: "12345678" })); // Welcome you@example.com
try { registerUser({ email: "you@example.com", password: "12345678" }); } catch (e) { console.log((e as Error).message); } // email taken`
        },
        {
          cmd: "guard clauses",
          title: "اخرج من الدالة بدري بدل if جوه if",
          desc: R`بدل ما تحط الشغل الحقيقي جوه تلات أو أربع if متداخلين، اعكس الشروط: اتأكد من كل حالة غلط في الأول واخرج منها على طول ([[return]] أو [[throw]]). اللي فاضل تحت هو الحالة السليمة، على الشمال من غير indent.

ده اسمه early return أو guard clause، وبيحوّل «سهم» الـ if المتداخلة لقايمة شروط مسطّحة بتتقري من فوق لتحت.`,
          example: R`type Account = { isActive: boolean; balance: number };

// قبل: الشغل الحقيقي مدفون في ٣ مستويات، وكل الأخطاء بقت "failed"
// if (acc) {
//   if (acc.isActive) {
//     if (amount <= acc.balance) { acc.balance -= amount; return "ok"; }
//   }
// }
// return "failed";

function withdraw(acc: Account | null, amount: number): string {
  if (!acc) return "no account";
  if (!acc.isActive) return "account inactive";
  if (amount > acc.balance) return "insufficient balance";
  acc.balance -= amount;
  return "ok";
}
console.log(withdraw({ isActive: true, balance: 100 }, 150)); // insufficient balance`,
          try: R`دوّر في مشروعك على if جواها if جواها if (بتبان من الـ indent اللي بيزق الكود لليمين). اعكس أول شرط وخلّيه [[return]] بدري، وكرّر لحد ما الكود يبقى مسطّح. واتأكد إن كل حالة غلط بقى ليها رسالة خاصة بيها.`,
          flag: "script",
          deep: {
            why: "الـ if المتداخلة بتخليك تشيل في دماغك كل الشروط اللي فوق عشان تفهم السطر اللي انت فيه، والـ else بتاعة أول if بتبقى بعيدة عنها ٤٠ سطر فمتعرفش هي تبع مين. وغالبًا الحالات الغلط بتتجمع في رسالة واحدة زي failed، فمتعرفش إيه اللي حصل.",
            how: R`الفكرة: اعكس الشرط واخرج. [[if (user) { ...كل الشغل... }]] تبقى [[if (!user) return;]] والشغل تحت.

كل guard بيشيل حالة من دماغك. وبعد [[if (!acc) return]]، TypeScript نفسه بيعرف إن [[acc]] مش null في باقي الدالة (narrowing)، فمش محتاج [[?.]] ولا [[!]] بعد كده. يعني الـ guard clauses بتساعد الـ type checker كمان.

ونفس الفكرة في React: [[if (isLoading) return <Spinner />]] و [[if (error) return <ErrorBox />]] في أول الـ component، والـ JSX الأساسي تحت. وفي Express: [[if (!req.user) return res.status(401).json(...)]] في أول الـ handler.

والقاعدة إن الـ guards في أول الدالة. لو فيه [[return]] مستخبي في نص ١٠٠ سطر، ده مش guard، ده مخرج مفاجئ، وحله إنك تقسّم الدالة.`,
            when: "أي دالة بتتحقق من حاجات قبل ما تشتغل: validation، وصلاحيات، وحالات loading و error في الـ components، وحالات فاضية (array فاضية، أو قيمة null).",
            mistakes: R`تنسى [[return]] بعد [[res.status(401).json()]] في Express، فالكود يكمّل ويحاول يرد تاني، ويطلع [[Cannot set headers after they are sent]]. وتعكس الشرط غلط ([[!a && b]] بدل [[!(a && b)]])، فجرّب كل الحالات الغلط بعد التعديل. وفي React، الـ hooks لازم تبقى قبل أي early return، لأن عدد الـ hooks لازم يفضل ثابت في كل render (قاعدة الـ hooks في تاب React).`
          },
          teach: R`## الفكرة

بدل ما الشغل الحقيقي يبقى جوه ٣ if متداخلين، كل حالة غلط بتتفحص في سطر لوحدها وتخرج على طول. هنقارن النسختين، ونشغّل الدالة على كل حالة، ونشوف إزاي الـ guard بيساعد TypeScript كمان. اتشغّل بـ [[npx tsx]] على Node 24.19، والفحص بـ [[tsc --strict]] (TypeScript 7.0) على ويندوز.

---

## ١. النسخة القديمة (المتعلّقة في المثال)

~~~text قبل
if (acc) {
  if (acc.isActive) {
    if (amount <= acc.balance) { acc.balance -= amount; return "ok"; }
  }
}
return "failed";
~~~

عشان توصل لسطر [[acc.balance -= amount]] لازم تشيل في دماغك ٣ شروط. والأوحش إن ٣ أسباب فشل مختلفة (مفيش حساب، الحساب موقوف، الرصيد مش مكفّي) كلهم بيوصلوا لنفس [[return "failed"]]، فمحدش يعرف إيه اللي حصل.

---

## ٢. النوع والدالة

~~~text main.ts
type Account = { isActive: boolean; balance: number };

function withdraw(acc: Account | null, amount: number): string {
~~~

- [[Account | null]]: الـ [[|]] معناها «أو». يعني ممكن يجيلك حساب، أو [[null]] (مفيش حساب أصلًا، زي لما تدوّر في الداتابيز وملقيتش).
- [[: string]]: الدالة بترجّع نص بيقول حصل إيه.

---

## ٣. الـ guards: شرط معكوس وخروج

~~~text main.ts
  if (!acc) return "no account";
  if (!acc.isActive) return "account inactive";
  if (amount > acc.balance) return "insufficient balance";
~~~

كل سطر شرط من القديم **معكوس**:

| القديم (ادخل لو) | الجديد (اخرج لو) |
|---|---|
| [[if (acc)]] | [[if (!acc) return ...]] |
| [[if (acc.isActive)]] | [[if (!acc.isActive) return ...]] |
| [[if (amount <= acc.balance)]] | [[if (amount > acc.balance) return ...]] |

- [[!acc]]: الـ [[!]] معناها «مش». و [[null]] بيتحسب false، فـ [[!null]] بتبقى true والدالة تخرج.
- [[return "..."]]: بيوقف الدالة هنا ويرجّع الرسالة، فالسطور اللي تحت مبتتنفذش.
- عكس [[<=]] (أصغر من أو يساوي) هو [[>]] (أكبر من)، مش [[>=]].

---

## ٤. الشغل الحقيقي على الشمال

~~~text main.ts
  acc.balance -= amount;
  return "ok";
}
~~~

لو وصلنا هنا، يبقى كل الشروط اتحققت. [[-=]] معناها «اطرح وخزّن»: [[acc.balance = acc.balance - amount]].

نشغّل الدالة على كل الحالات:

~~~text الناتج
no account
account inactive
insufficient balance
ok 70
~~~

كل حالة فشل ليها رسالتها. وفي الأخيرة سحبنا ٣٠ من ١٠٠ فالرصيد بقى [[70]]. والمثال نفسه بيطبع السطر التالت بس: [[insufficient balance]].

---

## ٥. ليه الـ guard الأول مهم لـ TypeScript

بعد [[if (!acc) return]]، TypeScript عارف إن [[acc]] مش [[null]] في باقي الدالة، فبيسمحلك تكتب [[acc.isActive]]. ده اسمه **narrowing** (تضييق النوع). شيل السطر ده وشوف:

~~~text الناتج: npx tsc --noEmit --strict
g2.ts(3,8): error TS18047: 'acc' is possibly 'null'.
~~~

[[TS18047]] معناها: «انت بتقرا خانة من حاجة ممكن تكون null». يعني الـ guard مش بس بيرتّب الكود، ده بيمنع [[Cannot read properties of null]] وقت التشغيل.

---

## ٦. حل التمرين: [[addComment]]

نفس الفكرة بس ٦ حالات غلط، كل واحدة سطر برسالتها:

~~~text sol.ts
  if (!user) return "login required";
  if (user.isBanned) return "user banned";
  if (!user.emailVerified) return "verify your email first";
  if (!post) return "post not found";
  if (post.locked) return "comments are locked";
  if (text.trim() === "") return "empty comment";
  return "ok";
~~~

- النوع [[{ ... } | null]] متعرّف للـ [[User]] و [[Post]] نفسهم، فلازم الـ guard يمسك [[null]] قبل أي [[.]].
- [[text.trim()]]: بتشيل المسافات من الأول والآخر، فتعليق كله مسافات بيبقى [[""]] ويترفض.

~~~text الناتج: npx tsx sol.ts
login required
comments are locked
ok
~~~

---

## الخلاصة

- اعكس الشرط واخرج: [[if (!x) return]] بدل [[if (x) { ... }]].
- كل حالة غلط ليها سطر ورسالة، والشغل الحقيقي في الآخر من غير indent.
- عكس [[a && b]] هو [[!a || !b]] (قانون De Morgan)، وعكس [[<=]] هو [[>]].
- الـ guards مكانها أول الدالة، و TypeScript بيستفيد منها في الـ narrowing.`,
          lines: [
            "شكل الحساب.",
            "بداية الدالة.",
            "مفيش حساب؟ اخرج على طول بسبب واضح.",
            "الحساب موقوف؟ اخرج.",
            "الرصيد مش مكفّي؟ اخرج.",
            "هنا كل الشروط اتحققت، فالشغل الحقيقي على الشمال من غير أي indent.",
            "رجّع النجاح.",
            "قفلة.",
            "بيطبع [[insufficient balance]]، والنسخة القديمة كانت هتقول failed وبس."
          ],
          sol: R`الشكل النهائي: كل الحالات الغلط فوق، كل واحدة سطر [[if (...) return ...]] أو [[throw]]، والشغل الحقيقي في الآخر على أول مستوى indent. في الحل ٦ حالات غلط كل واحدة برسالتها، والناتج [[login required]] ثم [[comments are locked]] ثم [[ok]].

وانت بتعكس الشرط خلي بالك من De Morgan: عكس [[if (user && user.isActive)]] هو [[if (!user || !user.isActive)]]، مش [[!user && !user.isActive]]. ده أشهر غلط في التمرين، وبيخلّي حالة غلط تعدّي من غير ما حد ياخد باله. عشان كده جرّب كل حالة قبل وبعد (اختبار أو [[console.log]] زي آخر ٣ سطور في الحل).

والتمرين مخلّص لما الـ [[return "failed"]] العام اللي كان في آخر الكود القديم يختفي تمامًا: كل return بقى بيقول السبب، وسطر الشغل الحقيقي مابقاش جوه أي if.`,
          solCode: R`type User = { isBanned: boolean; emailVerified: boolean } | null;
type Post = { authorId: string; locked: boolean } | null;

// قبل: if (user) { if (!user.isBanned) { if (post) { if (!post.locked) { ...save; return "ok" } } } } return "error";

function addComment(user: User, post: Post, text: string): string {
  if (!user) return "login required";
  if (user.isBanned) return "user banned";
  if (!user.emailVerified) return "verify your email first";
  if (!post) return "post not found";
  if (post.locked) return "comments are locked";
  if (text.trim() === "") return "empty comment";
  return "ok";
}

const user = { isBanned: false, emailVerified: true };
console.log(addComment(null, null, "hi")); // login required
console.log(addComment(user, { authorId: "1", locked: true }, "hi")); // comments are locked
console.log(addComment(user, { authorId: "1", locked: false }, "hi")); // ok`
        },
        {
          cmd: "magic numbers",
          title: "رقم في نص الكود محدش عارف جه منين",
          desc: R`الـ magic number رقم (أو string) مكتوب في نص الكود من غير اسم: [[if (status === 3)]] أو [[price * 0.14]]. اللي بيقرا مش عارف 3 يعني إيه، ولو الرقم اتغير لازم تدوّر عليه في كل الملفات. الحل constant باسم بيقول المعنى، في مكان واحد.

ومش كل رقم magic: [[0]] و [[1]] في loop، و [[/ 2]] للنص، واضحين لوحدهم.`,
          example: R`// قبل: 0.14 إيه؟ و 3 إيه؟ و 259200000 جه منين؟
// const total = price + price * 0.14;
// if (order.status === 3) deliverAt = Date.now() + 259200000;

const VAT_RATE = 0.14;
const DELIVERY_DAYS = 3;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const OrderStatus = { Pending: "pending", Paid: "paid", Shipped: "shipped" } as const;
type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

function withVat(priceCents: number): number {
  return priceCents + Math.round(priceCents * VAT_RATE);
}
function deliveryDate(status: OrderStatus, now = Date.now()): Date | null {
  return status === OrderStatus.Shipped ? new Date(now + DELIVERY_DAYS * MS_PER_DAY) : null;
}
console.log(withVat(10000), deliveryDate(OrderStatus.Pending)); // 11400 null`,
          try: R`دوّر في مشروعك بـ Ctrl+Shift+F على [[* 0.]] و [[=== 1]] و [[=== 2]] و [[1000 *]]. كل رقم مش واضح لوحده اديله اسم، واتأكد إنه متعرّف في مكان واحد بس.`,
          flag: "script",
          deep: {
            why: R`الرقم من غير اسم بيخبّي المعنى، وبيتكرر. في مشروع حقيقي كانت حسبة الخصم [[(total * percent) / 100]] مكتوبة في أكتر من ٥ أماكن في نفس الملف، و [[3 * 24 * 60 * 60 * 1000]] لتاريخ التوصيل في نص الكود. يوم ما مدة التوصيل تتغير، لازم تفتكر كل الأماكن، وهتنسى واحد.`,
            how: R`الـ constant بيعمل ٣ حاجات: بيدّي الرقم معنى، وبيحطه في مكان واحد (single source of truth)، وبيخلي البحث عنه سهل (دوّر على [[VAT_RATE]] بدل ما تدوّر على [[0.14]] وتلاقي خصم ١٤٪ كمان).

الاسم بـ UPPER_SNAKE_CASE للقيم الثابتة على مستوى الملف، ودي عادة مش قاعدة من اللغة.

للحالات (status و role) استخدم object بـ [[as const]] ونوع طالع منه زي المثال، أو union type على طول ([[type Status = "pending" | "paid"]]). ده بديل [[enum]] بتاع TypeScript، وأحسن النهارده لأن الـ enum بيطلّع كود JavaScript حقيقي، و Node لما بيشغّل [[.ts]] لوحده (type stripping) بيشيل الأنواع بس ومبيفهمش enum. (التفاصيل في تاب TypeScript.)

والإعدادات اللي بتختلف بين بيئة وبيئة (مدة الـ token، والـ URLs، والمفاتيح) مش constants في الكود، دي environment variables.`,
            when: "أي رقم أو string ليه معنى في البيزنس: نسب، ومدد، وحدود (أقصى حجم ملف، وعدد المحاولات)، وحالات، وأدوار.",
            mistakes: R`constant اسمه زي قيمته: [[const FOURTEEN = 0.14]] ملوش أي فايدة، الاسم لازم يقول المعنى مش الرقم. والفلوس بـ float: [[0.1 + 0.2]] بتطلع [[0.30000000000000004]]، فخزّن الفلوس بالقروش كـ integer زي [[priceCents]] في المثال، أو Decimal في الداتابيز. وكل constants المشروع في ملف واحد عملاق: الأحسن كل constant جنب الـ feature اللي بتستخدمه، والمشترك بس في ملف عام.`
          },
          teach: R`## الفكرة

المثال بياخد ٣ أرقام مالهاش معنى ([[0.14]] و [[3]] و [[259200000]]) ويدّي كل واحد اسم في مكان واحد، وبعدين يستخدم الأسماء في دالتين. اتشغّل بـ [[npx tsx]] على Node 24.19، والأخطاء من [[tsc --strict]] (TypeScript 7.0) على ويندوز.

---

## ١. الأرقام القديمة: جت منين؟

~~~text قبل
const total = price + price * 0.14;
if (order.status === 3) deliverAt = Date.now() + 259200000;
~~~

اللي بيقرا مش عارف إن [[0.14]] ضريبة القيمة المضافة، ولا إن [[3]] يعني «اتشحن»، ولا إن [[259200000]] تلات أيام بالميلي ثانية. حسبناها:

~~~text الناتج
86400000 259200000 3
~~~

يعني يوم = ٨٦٬٤٠٠٬٠٠٠ ms، و [[259200000]] ÷ يوم = ٣ أيام بالظبط. محتاج آلة حاسبة عشان تفهم سطر.

---

## ٢. الـ constants

~~~text main.ts
const VAT_RATE = 0.14;
const DELIVERY_DAYS = 3;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
~~~

- [[const]]: متغير مينفعش يتعاد تعيينه.
- [[VAT_RATE]]: VAT اختصار Value Added Tax (ضريبة القيمة المضافة)، و RATE النسبة. الكتابة بـ UPPER_SNAKE_CASE (حروف كبيرة و [[_]]) عادة بتقول «دي قيمة ثابتة».
- [[MS_PER_DAY]]: الحسبة نفسها مكتوبة بدل ناتجها: ٢٤ ساعة × ٦٠ دقيقة × ٦٠ ثانية × ١٠٠٠ ميلي. و MS اختصار milliseconds. الوحدة في الاسم عشان محدش يفتكرها ثواني.

---

## ٣. الحالات بـ [[as const]]

~~~text main.ts
const OrderStatus = { Pending: "pending", Paid: "paid", Shipped: "shipped" } as const;
type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
~~~

السطر الأول object عادي فيه ٣ حالات. و [[as const]] بتقول لـ TypeScript حاجتين: الخانات read-only، وقيمة كل خانة نوعها هو النص بالظبط ([["shipped"]]) مش أي [[string]]. لو حاولت تغيّرها:

~~~text الناتج: npx tsc --noEmit --strict
m2.ts(3,4): error TS2540: Cannot assign to 'Pending' because it is a read-only property.
~~~

السطر التاني نفكّه من جوه لبرة:

| الحتة | معناها | الناتج |
|---|---|---|
| [[typeof OrderStatus]] | نوع الـ object اللي فوق | [[{ readonly Pending: "pending"; ... }]] |
| [[keyof ...]] | أسماء خاناته | [["Pending" | "Paid" | "Shipped"]] |
| [[(...)[keyof ...]]] | قيم الخانات دي | [["pending" | "paid" | "shipped"]] |

ولاحظ إن الاسم [[OrderStatus]] متعرّف مرتين: مرة قيمة ([[const]]) ومرة نوع ([[type]]). TypeScript بيفصل بينهم حسب المكان، فتكتب [[OrderStatus.Shipped]] كقيمة و [[status: OrderStatus]] كنوع.

---

## ٤. [[withVat]]

~~~text main.ts
function withVat(priceCents: number): number {
  return priceCents + Math.round(priceCents * VAT_RATE);
}
~~~

- [[priceCents]]: السعر بالقرش كرقم صحيح، والوحدة في الاسم.
- [[Math.round]]: ليه بنقرّب؟ لأن الـ float مش دقيق:

~~~text الناتج
1400 1400.0000000000002 0.30000000000000004
~~~

[[10000 * 0.14]] طلعت [[1400.0000000000002]] مش [[1400]]، و [[0.1 + 0.2]] مش [[0.3]]. الأرقام العشرية بتتخزن بالـ binary فبيبقى فيها كسر صغير، فبنقرّب لأقرب قرش.

---

## ٥. [[deliveryDate]]

~~~text main.ts
function deliveryDate(status: OrderStatus, now = Date.now()): Date | null {
  return status === OrderStatus.Shipped ? new Date(now + DELIVERY_DAYS * MS_PER_DAY) : null;
}
~~~

- [[now = Date.now()]]: parameter بقيمة افتراضية. لو مبعتوش، بياخد الوقت الحالي بالـ ms. ولو بعته، تقدر تختبر بوقت ثابت.
- [[شرط ? قيمة : قيمة تانية]]: ده الـ ternary operator، if صغيرة بترجّع قيمة: لو اتشحن رجّع تاريخ، غير كده [[null]].
- [[new Date(رقم)]]: بيحوّل عدد الـ ms من ١ يناير ١٩٧٠ لتاريخ.

جرّبناها بـ [[now = 0]]:

~~~text الناتج: deliveryDate(OrderStatus.Shipped, 0)
1970-01-04T00:00:00.000Z
~~~

صفر هو ١ يناير ١٩٧٠، وبعد ٣ أيام ٤ يناير. ولو بعت حالة مش موجودة:

~~~text الناتج: deliveryDate("done")
m1.ts(11,14): error TS2345: Argument of type '"done"' is not assignable to parameter of type 'OrderStatus'.
~~~

---

## ٦. السطر الأخير

~~~text الناتج: npx tsx main.ts
11400 null
~~~

[[10000]] قرش + ١٤٪ = [[11400]]. والطلب [[Pending]] مش متشحن، فالتاريخ [[null]].

---

## ٧. حل التمرين

ملف [[constants.ts]] فيه كل رقم ليه معنى، بـ [[export]] عشان باقي الملفات تعمل [[import]]: [[VAT_RATE]]، و [[SESSION_TTL_MS = 30 * 60 * 1000]] (TTL اختصار Time To Live، يعني مدة الصلاحية)، و [[MAX_LOGIN_ATTEMPTS = 5]]، و [[Role]] بنفس طريقة [[as const]].

~~~text الناتج: npx tsx sol.ts
false 1800000 28
~~~

- [[false]]: اليوزر عنده ٥ محاولات فاشلة، و [[5 < 5]] غلط، فمش مسموحله.
- [[1800000]]: [[sessionExpiry(0)]] = صفر + ٣٠ دقيقة بالـ ms.
- [[28]]: ١٤٪ من ٢٠٠.

---

## الخلاصة

- الرقم اللي ليه معنى في البيزنس ياخد اسم بيقول المعنى، مش القيمة ([[VAT_RATE]] مش [[FOURTEEN]]).
- الحسبة تتكتب ([[24 * 60 * 60 * 1000]]) والوحدة في الاسم ([[_MS]] و [[Cents]]).
- الحالات object بـ [[as const]] ونوع طالع منه، فالحالة الغلط تتمسك قبل التشغيل.
- الفلوس بالقروش كأرقام صحيحة، لأن الـ float فيه كسور صغيرة.`,
          lines: [
            "نسبة الضريبة باسم. لو اتغيرت، بتتغير هنا بس.",
            "أيام التوصيل باسم.",
            "الحسبة مكتوبة بدل رقم غريب: ساعات × دقايق × ثواني × ميلي.",
            "الحالات قيم ثابتة بأسماء. [[as const]] بيخلي كل قيمة نوعها نفسها مش string عام.",
            R`نوع طالع من القيم: [["pending" | "paid" | "shipped"]].`,
            "السعر بالقروش (cents)، عشان الفلوس متتحسبش بكسور.",
            "الضريبة مقرّبة لأقرب قرش.",
            "قفلة.",
            "[[now]] parameter بقيمة افتراضية، فتقدر تختبرها بوقت ثابت.",
            "لو اتشحن: بعد ٣ أيام. غير كده null.",
            "قفلة.",
            "بيطبع [[11400 null]]."
          ],
          sol: R`البحث هيطلّعلك حاجات زي [[* 0.14]] و [[role === 1]] و [[1000 * 60 * 30]] و [[attempts < 5]]. الحل: ملف [[constants.ts]] (أو جنب الـ feature نفسها) فيه [[VAT_RATE]] و [[SESSION_TTL_MS]] و [[MAX_LOGIN_ATTEMPTS]] و [[Role]]، وكل الأماكن تعمل import. ناتج الحل: [[false 1800000 28]].

اختبار «مكان واحد بس»: ابحث تاني بـ Ctrl+Shift+F عن الرقم نفسه ([[0.14]]). المفروض يطلع مرة واحدة، في سطر التعريف. لو لسه طالع في ٣ ملفات، يبقى لسه فيه نسخ هتتنسي أول ما الضريبة تتغير.

متسمّيش كل رقم: [[0]] في [[items.length === 0]] و [[1]] في [[i + 1]] واضحين لوحدهم، و [[const ONE = 1]] مش بيقول حاجة. والغلط التاني إن الاسم يوصف القيمة مش المعنى: [[FOURTEEN_PERCENT]] هتبقى كذبة أول ما النسبة تتغير، إنما [[VAT_RATE]] بيفضل صح. ولاحظ الوحدة في الاسم ([[_MS]])، عشان محدش يحط ثواني مكان ملي ثانية.`,
          solCode: R`// constants.ts: كل رقم ليه معنى متعرّف هنا مرة واحدة، والباقي بيعمل import
export const VAT_RATE = 0.14;
export const SESSION_TTL_MS = 30 * 60 * 1000; // 30 دقيقة
export const MAX_LOGIN_ATTEMPTS = 5;
export const Role = { Admin: "admin", Member: "member" } as const;

// قبل: if (user.role === 1 && attempts < 5) ... expiresAt = now + 1800000
type User = { role: (typeof Role)[keyof typeof Role]; failedAttempts: number };

function canTryLogin(user: User): boolean {
  return user.failedAttempts < MAX_LOGIN_ATTEMPTS;
}
function sessionExpiry(now = Date.now()): number {
  return now + SESSION_TTL_MS;
}

console.log(canTryLogin({ role: Role.Member, failedAttempts: 5 }), sessionExpiry(0), Math.round(200 * VAT_RATE)); // false 1800000 28`
        },
        {
          cmd: "why comments",
          title: "التعليق اللي يستاهل يتكتب",
          desc: R`الكود نفسه بيقول بيعمل إيه. التعليق الكويس بيقول ليه: ليه اخترت الطريقة دي، وليه الرقم ده، وإيه اللي مش باين من الكود (bug في مكتبة، أو شرط من البيزنس، أو حاجة جربتها وفشلت).

والتعليق اللي بيعيد اللي الكود بيقوله ([[i++ // زوّد i]]) زيادة، وبيكدب مع الوقت لأن حد هيغيّر الكود وينسى التعليق.`,
          example: R`// سيئ: بيعيد اللي الكود قايله بالحرف
// حوّل النص لرقم ورجّعه
// return Number(input);

function parseAmount(input: string): number {
  // ليه: العملاء بيكتبوا أرقام عربي زي ١٢٠، و Number("١٢٠") بترجع NaN
  const western = input.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660));
  return Number(western);
}

// تحذير: المزوّد بيحظرك بعد ٥ طلبات في الثانية، فمتصغّرش الرقم ده
const DELAY_BETWEEN_CALLS_MS = 250;

// TODO(#142): شيل الـ workaround ده لما المكتبة تصلّح الـ timezone bug
console.log(parseAmount("١٢٠"), parseAmount("45"), DELAY_BETWEEN_CALLS_MS); // 120 45 250`,
          try: R`اقرا كل التعليقات في ملف عندك. امسح أي تعليق بيعيد اللي الكود قايله، وكل تعليق بيشرح «إيه» حاول تستبدله باسم أوضح أو دالة. وبعدين دوّر على حتة كود غريبة عملتها لسبب (bug، أو طلب من العميل)، واكتب فوقها سطر «ليه».`,
          flag: "script",
          deep: {
            why: R`بعد ٦ شهور، انت نفسك مش هتفتكر ليه كتبت [[setTimeout(fn, 0)]] أو ليه الـ retry ٣ مرات بالظبط. من غير تعليق، اللي بعدك (أو انت) هيشيل الكود «الغريب» ده ويرجّع الـ bug اللي كان بيحله. الكود بيحكي إيه، والتعليق بيحكي ليه، ومحدش تاني هيحكيه.`,
            how: R`أنواع التعليقات اللي تستاهل:

الـ why: سبب اختيار مش واضح. «بنستخدم polling بدل websocket عشان الـ proxy عند العميل بيقفل الاتصالات الطويلة».

التحذير: «الترتيب ده مهم»، أو «الدالة دي بتتنادى من cron كل دقيقة، فخليها سريعة».

الـ TODO برقم ticket أو اسم: [[// TODO(#142): ...]]. من غير رقم بيفضل للأبد.

التوثيق للـ API العام (JSDoc فوق دالة في مكتبة): بيظهر في VS Code لما تحط الماوس على الدالة، ومفيد للكود اللي ناس تانية هتستخدمه.

أما «إيه» فالكود يقوله: لو محتاج تعليق يشرح سطر بيعمل إيه، جرّب الأول اسم أوضح، أو دالة صغيرة اسمها هو التعليق. والقرارات الكبيرة (ليه Postgres مش Mongo) مكانها ADR مش تعليق (المستوى ٣، درس «codebase مش بتاعك»).`,
            when: "كل ما تكتب كود هيستغرب منه حد: workaround، أو رقم ليه سبب، أو ترتيب مهم، أو شرط من العميل. والكود الطبيعي الواضح مش محتاج تعليق.",
            mistakes: R`تعليقات قديمة بتكدب: الكود اتغير والتعليق لأ، ودي أسوأ من مفيش تعليق. وكود متعلّق (commented-out) قاعد شهور «احتياطي»: امسحه، Git فاكره. وتعليق بيعيد الاسم ([[// get user]] فوق [[getUser()]]). وشرح «ليه عملت التغيير ده» مكانه رسالة الـ commit ووصف الـ PR، مش تعليق في الكود.`
          },
          teach: R`## الفكرة

المثال فيه ٤ تعليقات: واحد سيئ بيعيد الكود، و ٣ كويسين (ليه، وتحذير، و TODO). هنفك الدالة اللي تحت تعليق «ليه» ونشوف بعينينا المشكلة اللي التعليق بيشرحها. اتشغّل بـ [[npx tsx]] على Node 24.19 (ويندوز).

---

## ١. التعليق السيئ

~~~text قبل
// حوّل النص لرقم ورجّعه
// return Number(input);
~~~

الكود [[return Number(input)]] بيقول بالظبط «حوّل لرقم ورجّع». التعليق ممضافش أي معلومة، ويوم ما حد يغيّر السطر وينسى التعليق، التعليق هيبقى بيكدب.

---

## ٢. المشكلة اللي ورا تعليق «ليه»

[[Number]] مبيفهمش الأرقام العربية الهندية (١٢٠):

~~~text الناتج: Number("١٢٠")
NaN
~~~

[[NaN]] اختصار Not a Number، يعني «ده مش رقم». من غير التعليق، اللي بيقرا الدالة هيشوف سطر [[replace]] غريب ويقول «ليه التعقيد ده؟» ويشيله، فيرجع الـ bug.

---

## ٣. سطر التحويل حتة حتة

~~~text main.ts
const western = input.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660));
~~~

### [[/[٠-٩]/g]]

ده regular expression (نمط بحث). [[[٠-٩]]] معناها «أي حرف من ٠ لـ ٩»، و [[g]] اختصار global: «كل الأماكن» مش أول واحد بس.

### [[(d) => ...]]

[[replace]] بتنادي الدالة دي على كل حرف لقيته، و [[d]] هو الحرف (digit). اللي الدالة بترجّعه بيتحط مكانه.

### [[d.charCodeAt(0) - 0x660]]

كل حرف ليه رقم في جدول Unicode. [[charCodeAt(0)]] بتجيب رقم أول حرف في النص. و [[0x660]] رقم مكتوب بالـ hex (الـ [[0x]] في الأول معناها hexadecimal):

~~~text الناتج: "٠".charCodeAt(0), 0x660, "١".charCodeAt(0), "٩".charCodeAt(0) - 0x660
1632 1632 1633 9
~~~

الصفر العربي كوده ١٦٣٢، و [[0x660]] هو نفس الرقم. والأرقام ورا بعض في الجدول، فـ «كود الحرف ناقص كود الصفر» بيطلّع قيمته: ١ بيطلع 1، و ٩ بيطلع 9.

### [[String(...)]]

[[replace]] محتاجة نص ترجّعه، فبنحوّل الرقم لنص.

~~~text الناتج
120 string 120
سعر 45 جنيه
~~~

[[western]] بقى [["120"]] (لسه نص)، وبعدين [[Number(western)]] بيبقى الرقم [[120]]. والسطر التاني بيوري إن الحروف اللي مش أرقام بتفضل زي ما هي.

---

## ٤. التحذير والـ TODO

~~~text main.ts
// تحذير: المزوّد بيحظرك بعد ٥ طلبات في الثانية، فمتصغّرش الرقم ده
const DELAY_BETWEEN_CALLS_MS = 250;
~~~

٢٥٠ ms بين كل طلب = ٤ طلبات في الثانية، تحت الحد بتاع المزوّد (٥). الكود مستحيل يقول السبب ده، فالتعليق هو المكان الوحيد ليه.

~~~text main.ts
// TODO(#142): شيل الـ workaround ده لما المكتبة تصلّح الـ timezone bug
~~~

[[TODO]] معاه رقم ticket ([[#142]])، فأي حد يقدر يتابعه ويعرف إمتى يشيله.

---

## ٥. الناتج

~~~text الناتج: npx tsx main.ts
120 45 250
~~~

[["١٢٠"]] بقت [[120]]، و [["45"]] الإنجليزي عدّى زي ما هو لأن الـ regex ملقاش فيه أرقام عربي.

---

## الخلاصة

| نوع التعليق | يفضل؟ | مثال |
|---|---|---|
| بيعيد الكود | لأ، امسحه | [[// حوّل النص لرقم]] |
| بيشرح «إيه» لكود صعب | لأ، حوّله اسم أو دالة | [[// check if user can edit]] |
| «ليه» | آه | [[// العملاء بيكتبوا أرقام عربي]] |
| تحذير | آه | [[// متصغّرش الرقم ده]] |
| TODO برقم | آه | [[// TODO(#142): ...]] |

الكود بيقول إيه، والتعليق بيقول ليه.`,
          lines: [
            "دالة بتحوّل النص لرقم.",
            "بتبدّل كل رقم عربي (٠ لـ ٩) بالرقم الإنجليزي بتاعه: كود الحرف ناقص كود الصفر العربي.",
            "دلوقتي Number تفهمه.",
            "قفلة.",
            "الرقم ده عليه تحذير، لأن اللي جاي بعدك هيشوفه «بطيء» ويحاول يصغّره.",
            "بيطبع [[120 45 250]]."
          ],
          sol: R`هتلاقي التعليقات بتتقسم ٣ أنواع: (١) بتعيد الكود ([[// increment i]] و [[// get the user]]): تتمسح على طول. (٢) بتشرح «إيه» لكود صعب ([[// check if the user can edit]] فوق شرط طويل): تتحول لاسم، [[const canEdit = ...]] أو دالة [[canEditPost(user)]]، والتعليق يتمسح. (٣) بتشرح «ليه»: تفضل، ودا النوع الوحيد اللي الكود مايقدرش يقوله.

تعليق «ليه» الكويس بيجاوب على سؤال اللي جاي بعدك: «أشيل ده؟». بيقول سبب من برا الكود: bug في مكتبة (ومعاه رابط الـ issue)، أو طلب من العميل (ومعاه رقم الـ ticket)، أو قيد خارجي زي rate limit. مثال: [[// ليه: بوابة الدفع بترفض أكتر من رقمين عشريين، فبنقرّب هنا مش في الواجهة (#231)]].

الغلط الشائع إن التعليق يبقى «ليه» مزيف: [[// ليه: عشان نحسب الضريبة]] ده «إيه» متنكر. ولو مش لاقي سبب تكتبه للحتة الغريبة، اعمل [[git blame]] على السطر واقرا الـ commit اللي دخّلها (تاب git). ولو ملقيتش سبب هناك كمان، غالبًا الحتة دي ممكن تتشال: شيلها في commit لوحده والاختبارات تحكم.`
        }
      ]
    }
  ]
});

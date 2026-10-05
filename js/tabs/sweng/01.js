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
    },
    {
      t: "البساطة",
      l: 1,
      n: "متكررش نفسك، بس متجرّدش بدري، ومتبنيش حاجة محدش طلبها",
      items: [
        {
          cmd: "DRY",
          title: "نفس المنطق مكتوب في كذا مكان",
          desc: R`DRY (Don't Repeat Yourself) معناها إن كل قاعدة في البيزنس ليها مكان واحد بس في الكود. لو قاعدة الخصم مكتوبة في ٤ أماكن، يوم ما تتغير هتعدّل ٣ وتنسى الرابع. بس مش «أي سطرين شبه بعض ادمجهم»: القاعدة العملية rule of three، تالت مرة تشوف التكرار اطلّع دالة.

والسؤال الصح: الحتتين دول بيتغيروا مع بعض لنفس السبب؟ لو آه، دي معلومة واحدة ادمجها. لو شبه بعض بالصدفة، سيبهم.`,
          example: R`type Coupon = { type: "percent"; percent: number } | { type: "fixed"; amount: number };

// قبل: نفس الحسبة متنسخة في ٣ أماكن في service الطلبات
// if (coupon.type === "percent") discount = (total * coupon.percent) / 100;
// else discount = Math.min(coupon.amount, total);

function couponDiscount(coupon: Coupon, total: number): number {
  const raw = coupon.type === "percent" ? (total * coupon.percent) / 100 : coupon.amount;
  return Math.min(Math.max(raw, 0), total);
}

console.log(couponDiscount({ type: "percent", percent: 10 }, 500)); // 50
console.log(couponDiscount({ type: "fixed", amount: 800 }, 500)); // 500
console.log(couponDiscount({ type: "percent", percent: 150 }, 500)); // 500`,
          try: R`دوّر في مشروع عندك على حسبة متكررة (خصم، أو تنسيق تاريخ، أو تنسيق سعر بالعملة). اطلّعها في دالة واحدة، واكتب لها ٣ اختبارات vitest (حالة عادية، وحالة حدّية زي الصفر، وحالة غلط)، واستبدل كل النسخ بالنداء عليها.`,
          flag: "script",
          deep: {
            why: R`التكرار مش مشكلة شكل. المشكلة إن القاعدة الواحدة بقى ليها أكتر من نسخة، والنسخ بتختلف مع الوقت. في مشروع حقيقي كانت حسبة خصم الكوبون متنسخة في أكتر من مكان في service الطلبات، وكل نسخة فيها نفس الـ bugs: خصم النسبة مش متقفّل على الإجمالي، والشرط بيعتبر الكوبون نسبة لو خانة النسبة فيها أي قيمة حتى لو نوعه ثابت. تصليح الـ bug محتاج تلاقي كل النسخ الأول.`,
            how: R`DRY عن المعرفة مش عن النص. اتنين validation لـ email في الـ signup وفي الـ profile: دي نفس القاعدة، فتبقى schema واحدة (zod مثلًا) تستخدمها في الاتنين وفي الفرونت كمان. أما [[price * 0.14]] في الضريبة و [[score * 0.14]] في ترتيب المنتجات: نفس الرقم بالصدفة، ولو دمجتهم، يوم ما الضريبة تتغير ترتيب المنتجات هيبوظ.

الـ rule of three (مشهورة من كتاب Refactoring لـ Martin Fowler): أول مرة اكتب، تاني مرة استحمل التكرار وخد بالك، تالت مرة اطلّع دالة. لأن بعد ٣ أمثلة بتعرف إيه الثابت وإيه اللي بيتغير، فالدالة هتطلع صح. لو طلّعتها من أول نسختين، بتخمّن.

والـ abstraction الغلط أسوأ من التكرار. Sandi Metz قالتها: «duplication is far cheaper than the wrong abstraction». الدالة المشتركة اللي بدأت بسيطة، وكل مكان محتاج حاجة مختلفة فبيضيفلها parameter و if، لحد ما تبقى [[formatPrice(value, true, false, 'short', null)]] ومحدش فاهمها. الحل ساعتها إنك ترجّع التكرار (inline) وتعيد التقسيم صح.

وDRY مش في الدوال بس: الأنواع اطلّعها من الـ schema (Prisma بيولّد types، و zod بـ [[z.infer]]) بدل ما تكتبها مرتين، والإعدادات في مكان واحد مش hardcoded في ٣ ملفات.`,
            when: "لما قاعدة بيزنس (خصم، أو صلاحية، أو validation، أو حسبة) تتكتب مرتين. ولما تصلّح bug وتكتشف إنه موجود في نسخة تانية.",
            mistakes: R`تدمج حاجتين شبه بعض بالصدفة فتربطهم ببعض من غير داعي. وتعمل abstraction من أول نسختين، فتبقى دالة فيها flags لكل حالة. ونسخ نفس الـ service بين مشاريع كاملة وكل نسخة بتتعدّل لوحدها: لو ده بيتكرر، الكود المشترك يستاهل package أو monorepo (تاب «فحص الكود»). وفي انترفيو لو اتسألت عن DRY، اذكر الوش التاني (الـ wrong abstraction)، ده اللي بيفرّقك عن اللي حافظ التعريف.`
          },
          lines: [
            "الكوبون يا نسبة يا مبلغ ثابت. [[type]] بيحدد الشكل (discriminated union).",
            "الدالة الوحيدة في المشروع اللي تعرف تحسب خصم كوبون.",
            "النسبة تتحسب من الإجمالي، والثابت زي ما هو.",
            "الخصم عمره ما يبقى سالب ولا أكبر من الإجمالي. القاعدة دي بقت في مكان واحد.",
            "قفلة.",
            "١٠٪ من ٥٠٠: 50.",
            "كوبون ٨٠٠ على طلب ٥٠٠: الخصم 500 مش 800.",
            "كوبون غلط ١٥٠٪: برضه 500. النسخ القديمة كانت هتطلّع خصم أكبر من الطلب."
          ],
          sol: R`الـ ٣ اختبارات خضرا، والنسخ القديمة كلها بقت [[formatPrice(...)]]. وأهم خطوة بعد الاستبدال: ابحث تاني عن شكل النسخ القديمة (مثلًا [[toFixed(2)]] أو [[ج.م]]) واتأكد إن مفيش ولا واحدة فاضلة، وإلا هتصلّح bug في مكان وينفضل في التاني.

الفخ اللي هتقع فيه غالبًا في أول اختبار: [[expected 'EGP 1,250.50' to be 'EGP 1,250.50']]، والاتنين شكلهم واحد بالظبط! [[Intl.NumberFormat]] بيحط non-breaking space ([[ ]]) بعد العملة مش مسافة عادية. الحل إنك تكتبها في الـ expected زي الحل، أو تقارن بـ [[toMatch(/1,250\.50/)]].

وحالة الغلط (سالب أو [[NaN]]) مهمة: من غيرها الفاتورة هتطبع [[EGPNaN]] وانت مش واخد بالك. ولو لقيت إن النسختين «شبه بعض» بس بيختلفوا في قاعدة بيزنس (سعر للعميل بالضريبة وسعر للمورد من غير)، متجمّعهمش بـ boolean parameter: دول حاجتين مختلفتين بالصدفة شبه بعض، والتكرار هنا أرخص من abstraction غلط.`,
          solCode: R`// price.ts
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });

export function formatPrice(cents: number): string {
  if (!Number.isFinite(cents) || cents < 0) throw new RangeError($__btinvalid price: $__{cents}$__bt);
  return egp.format(cents / 100);
}

// price.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./price";

describe("formatPrice", () => {
  it("formats a normal price", () => {
    expect(formatPrice(125050)).toBe("EGP\u00a01,250.50");
  });
  it("handles zero", () => {
    expect(formatPrice(0)).toBe("EGP\u00a00.00");
  });
  it("rejects negative and NaN", () => {
    expect(() => formatPrice(-1)).toThrow(RangeError);
    expect(() => formatPrice(NaN)).toThrow("invalid price");
  });
});`
        },
        {
          cmd: "KISS و YAGNI",
          title: "أبسط حل يشتغل، ومتبنيش حاجة محدش طلبها",
          desc: R`KISS (Keep It Simple): اختار أبسط حل يحل المشكلة اللي قدامك، والكود «الذكي» اللي محتاج ١٠ دقايق تفهمه أسوأ من ٥ سطور عادية. و YAGNI (You Aren't Gonna Need It): متبنيش حاجة عشان «يمكن نحتاجها بعدين»، لأن أغلب «بعدين» ده مبيجيش، واللي بيجي بيجي بشكل مختلف عن اللي خمّنته.

الاتنين مع بعض: ابني المطلوب النهارده بأبسط شكل، واكتبه نضيف كفاية إنه يتغير بسهولة لما الطلب الجديد يوصل.`,
          example: R`// KISS، قبل: "ذكي" ومحدش يفهمه من غير ورقة وقلم
const isWeekendClever = (d: Date) => ((0b1100000 >> d.getDay()) & 1) === 1;

// KISS، بعد: الجمعة والسبت (getDay: الأحد 0 ... السبت 6)
const WEEKEND_DAYS = [5, 6];
const isWeekend = (d: Date) => WEEKEND_DAYS.includes(d.getDay());

// YAGNI: عملة واحدة في التطبيق؟ يبقى formatter واحد، مش نظام عملات "للمستقبل"
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
const formatPrice = (amount: number) => egp.format(amount);

const friday = new Date(2026, 8, 25);
console.log(isWeekendClever(friday), isWeekend(friday), formatPrice(1250.5)); // true true EGP 1,250.50`,
          try: R`دوّر في مشروعك على حاجة اتبنت «للمستقبل»: interface ليها implementation واحد، أو parameter كل اللي بينادوه بيبعتوله نفس القيمة، أو إعداد محدش غيّره. شيلها وبسّط، وشوف كام سطر راح من غير ما أي حاجة تبوظ.`,
          flag: "script",
          deep: {
            why: "كل سطر بتكتبه لازم حد يقراه ويختبره ويصونه ويفهمه قبل ما يعدّل جنبه. الحاجات اللي اتبنت «احتياطي» بتتكلف دلوقتي (وقت، وتعقيد، و bugs) عشان فايدة ممكن متجيش. والكود المعقد بيبطّأ كل تعديل بعد كده، مش التعديل الأول بس.",
            how: R`YAGNI (من Extreme Programming) مش ضد التصميم الكويس. الفرق بين «قرار بيسهّل التغيير» و «ميزة لسه محدش طلبها»: إنك تفصل حسبة الضريبة في دالة لوحدها ده تصميم كويس ومش مكلّف. إنك تبني نظام ضرايب بيدعم ٣٠ دولة وعميلك في دولة واحدة ده YAGNI.

علامات إنك بتبني للمستقبل: interface ليها implementation واحد ومفيش خطة لتاني، أو parameter كل اللي بينادوه بيبعتوا نفس القيمة، أو config لحاجة محدش بيغيّرها، أو «framework» داخلي لحاجة بتتعمل مرتين.

و KISS معناها كمان: استخدم اللي موجود في اللغة بدل ما تكتبه. [[Intl.NumberFormat]] بدل دالة تنسيق أرقام بتكتبها بإيدك، و [[structuredClone]] بدل deep copy يدوي. والكود الواضح اللي أطول بسطرين أحسن من السطر «الذكي»: الـ bitmask في المثال شغال، بس اللي هيقراه لازم يحوّل الرقم لـ binary في دماغه.

والفكرة مش إنك متفكرش في المستقبل. فكّر فيه، واكتب الكود بحيث يبقى سهل تغيّره (دوال صغيرة واختبارات)، بس متبنيهوش قبل ما ييجي.`,
            when: "مع كل قرار تصميم. اسأل: مين طلب ده؟ وإيه اللي هيحصل لو ما عملتوش النهارده؟ لو الإجابة «مفيش حاجة، هنعمله لما نحتاجه»، يبقى استنى.",
            mistakes: R`تفهم YAGNI إنها «متكتبش اختبارات» أو «متفصلش الكود»: دي حاجات بتسهّل التغيير، مش ميزات زيادة. وتعمل microservices لمشروع فيه مطوّر واحد و ١٠٠ مستخدم، و monolith مترتب أبسط بكتير (تاب «بناء مشروع كامل»). وفي الناحية التانية: تتجاهل قرارات صعب تغيّرها بعدين، زي إن الفلوس تتخزن بالقروش، أو إن الـ IDs تبقى UUID لو هتعمل sync بين أجهزة. دي قرارات أول يوم مش YAGNI.`
          },
          lines: [
            "بيشتغل، بس لازم تحوّل الرقم لـ binary في دماغك عشان تعرف إنه الجمعة والسبت.",
            "الأيام بأسماء واضحة في array.",
            "نفس النتيجة، ويتقري من أول نظرة.",
            "formatter جاهز في اللغة نفسها ([[Intl]])، بدل دالة تنسيق مكتوبة باليد.",
            "دالة صغيرة للتطبيق كله. لو يوم ما اتضافت عملة، تبقى parameter ساعتها.",
            "يوم جمعة للتجربة (الشهور في Date بتبدأ من 0، فـ 8 يعني سبتمبر).",
            "بيطبع [[true true]] والسعر متنسّق بالعملة."
          ],
          sol: R`اللي بيتلاقي كتير: [[interface PriceFormatter]] ليها class واحد بس، أو parameter [[currency]] كل الـ ٢٣ نداء بيبعتوا فيه [[EGP]]، أو [[options]] object محدش بيبعت فيه غير القيم الافتراضية. في الحل التلاتة بقوا دالة واحدة سطر واحد، و [[formatPrice(99.5)]] بترجع [[EGP 99.50]].

بعد الحذف شغّل [[tsc --noEmit]] والاختبارات: لو كله أخضر يبقى الحاجة دي ماكانتش بتعمل حاجة. و [[git diff --stat]] هيوريك كام سطر راح، وعادةً بيبقى أكتر من المتوقع.

متشيلش interface عليها اتنين implementations حقيقيين (in-memory للاختبارات و Prisma للإنتاج مثلًا): دي مستخدمة فعلًا ومش YAGNI. والسؤال اللي تسأله لنفسك (وتقوله في الانترفيو): «لو احتجتها بعدين، إضافتها هتبقى صعبة؟». لو الإجابة refactor ساعة، شيلها دلوقتي. الاستثناء: الحاجات الغالية تتغير بعدين، زي شكل الـ public API أو الـ database schema.`,
          solCode: R`// قبل: interface ليها implementation واحد، و parameter كل الناس بتبعتله "EGP"
// interface PriceFormatter { format(amount: number, currency: string): string }
// class DefaultPriceFormatter implements PriceFormatter { format(a, c) { ... } }
// const formatter: PriceFormatter = new DefaultPriceFormatter();
// formatter.format(total, "EGP");  // 23 نداء، كلهم "EGP"

// بعد: دالة واحدة، ولما عملة تانية تيجي فعلًا نضيف الـ parameter وقتها
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
export const formatPrice = (amount: number) => egp.format(amount);

console.log(formatPrice(99.5)); // EGP 99.50`
        }
      ]
    },
    {
      t: "الأخطاء",
      l: 1,
      n: "اقع بدري وبصوت عالي، وسمّي كل نوع خطأ، ومتبلعش خطأ أبدًا",
      items: [
        {
          cmd: "fail fast",
          title: "ارفض الداتا الغلط أول ما تدخل",
          desc: R`fail fast معناها: أول ما تكتشف إن فيه حاجة غلط، وقّف وقول بوضوح. متكمّلش بداتا غلط على أمل إنها تعدّي، لأنها هتقع بعدين في مكان بعيد وبرسالة ملهاش علاقة بالسبب.

وأهم مكان ليه هو الحدود (boundaries): الـ request اللي جاي من برا، والـ env variables وقت التشغيل، والرد من API خارجي. افحصهم عند الباب، وجوه الكود ثق في الأنواع.`,
          example: R`function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error($__btMissing env var $__{name}$__bt);
  return value;
}

type Transfer = { from: string; to: string; amount: number };
function parseTransfer(body: unknown): Transfer {
  const b = (body ?? {}) as Partial<Transfer>;
  if (typeof b.from !== "string" || typeof b.to !== "string") throw new TypeError("from/to required");
  if (typeof b.amount !== "number" || b.amount <= 0) throw new RangeError("amount must be > 0");
  return { from: b.from, to: b.to, amount: b.amount };
}

process.env.PAYMENT_KEY = "YOUR_KEY";
console.log(requireEnv("PAYMENT_KEY")); // YOUR_KEY
console.log(parseTransfer({ from: "a", to: "b", amount: -5 })); // RangeError: amount must be > 0`,
          try: R`في مشروع Express أو Next عندك، اعمل ملف [[env.ts]] بيقرا كل الـ env variables المطلوبة بـ [[requireEnv]] ويصدّرهم. امسح متغير من [[.env]] وشغّل: لازم التطبيق يقع وهو بيقوم برسالة فيها الاسم، مش بعد ساعة في أول request.`,
          flag: "script",
          deep: {
            why: R`الغلط اللي بيتكتشف متأخر غالي. [[undefined]] دخل من الـ request، وعدّى على ٣ دوال، واتخزن في الداتابيز، وبعد أسبوع صفحة التقارير وقعت بـ [[Cannot read properties of undefined]]. دلوقتي انت بتدوّر على السبب في كود ملوش ذنب. لو كان اترفض عند الباب، كنت هتعرف في نفس اللحظة ومن الرسالة نفسها.`,
            how: R`الفكرة: التحقق عند الحدود، والثقة جوه. الـ body في Express نوعه الحقيقي [[unknown]] مهما كتبت type، لأن TypeScript مبيشتغلش وقت التشغيل ومش هيمنع حد يبعت أي JSON. عشان كده الدالة اللي بتستقبله لازم تفحصه وتطلّع نوع مضمون.

عمليًا بتستخدم مكتبة schema زي zod بدل الـ if اليدوية: [[z.object({ amount: z.number().positive() })]] و [[schema.parse(body)]] بترمي خطأ فيه كل الخانات الغلط، وبتطلّعلك النوع من الـ schema نفسها بـ [[z.infer]] (التفاصيل في تاب «Backend بـ Node»). المثال هنا يدوي عشان تشوف اللي بيحصل جوه.

الـ env variables: اقراهم مرة وقت التشغيل وافحصهم كلهم، فالتطبيق يرفض يقوم لو ناقصه حاجة. أحسن ما يقوم «سليم» ويقع أول ما حد يدفع.

والـ assertions جوه الكود ([[if (!order) throw new Error('order must exist here')]]) للحالات اللي «مستحيل» تحصل: لو حصلت يبقى فيه bug، والأحسن تعرف فورًا بدل ما الكود يكمّل بحالة غلط.

وfail fast مش معناها إن السيرفر كله يقع مع أي خطأ: الـ request الغلط بيترفض بـ 400 والسيرفر يفضل شغال. اللي بيقع بدري هو العملية الغلط، مش السيستم.`,
            when: "أي داتا جاية من برا الكود بتاعك: request body و query، و env، ورد من API خارجي، وملفات بيرفعها المستخدم، وداتا من localStorage.",
            mistakes: R`تستخدم [[as Transfer]] على الـ body وتفتكره فحص: [[as]] بيقول لـ TypeScript «صدّقني» ومبيفحصش حاجة. وقيم افتراضية بتخبّي المشكلة: [[process.env.JWT_SECRET || 'dev-secret']] في الإنتاج معناها إن السيرفر شغال بسر معروف لأي حد قرا الكود، ودي ثغرة. و [[try/catch]] حوالين كل حاجة بيرجّع null، فالخطأ يتحوّل لـ null ماشي في الكود ويقع بعدين برضه.`
          },
          lines: [
            "دالة بتجيب env variable ولازم تلاقيه.",
            "اقرا القيمة.",
            "مش موجودة؟ اقع حالًا واكتب اسم المتغير الناقص.",
            "رجّعها string مضمون، مش [[string | undefined]].",
            "قفلة.",
            "شكل التحويل اللي جوه الكود هيثق فيه.",
            "الـ body جاي من برا فنوعه [[unknown]]: مفيش أي حاجة مضمونة.",
            "بنقراه كـ Partial عشان نفحص كل خانة، ولو null نبدأ بـ object فاضي.",
            "من أو لـ مش string؟ ارفض.",
            "المبلغ مش رقم، أو صفر، أو سالب؟ ارفض.",
            "من هنا ورايح الداتا مضمونة، ونوعها [[Transfer]].",
            "قفلة.",
            "للتجربة بس: حط قيمة في الـ env.",
            "بيطبع [[YOUR_KEY]].",
            "بيقع بـ [[RangeError]] قبل ما أي فلوس تتحرك."
          ],
          sol: R`لما كل المتغيرات موجودة هتشوف [[listening on 3000]]. ولما تمسح [[JWT_SECRET]] من [[.env]]، التطبيق يقع وهو بيقوم، قبل ما يسمع على أي port، بـ [[Error: Missing env var JWT_SECRET]] و exit code 1. ده المطلوب: الـ deploy يفشل فورًا والرسالة فيها اسم المتغير.

الشرط إن [[env.ts]] يتعمله import في أول الـ server، وإن باقي الكود يقرا [[env.JWT_SECRET]] مش [[process.env.JWT_SECRET]]. ابحث عن [[process.env]] في المشروع: أي مكان فاضل برا [[env.ts]] هو متغير مش متفحوص. ولو بتقرا [[.env]] بـ dotenv لازم [[import "dotenv/config"]] يبقى قبل [[env.ts]]، أو شغّل بـ [[node --env-file=.env]].

الغلط الشائع: تنادي [[requireEnv]] جوه دالة بتشتغل وقت الـ request (جوه [[signToken()]] مثلًا)، فالتطبيق يقوم عادي ويقع في أول login. وكمان [[process.env.PORT]] دايمًا string، فلو محتاج رقم حوّله وافحص إنه مش [[NaN]]. ولو المشروع فيه Zod، [[z.object({...}).parse(process.env)]] بيعمل نفس الفكرة لكل المتغيرات مرة واحدة وبيطلّع كل الناقص في رسالة واحدة.`,
          solCode: R`// env.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error($__btMissing env var $__{name}$__bt);
  return value;
}

export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  PORT: Number(process.env.PORT ?? 3000),
};

// server.ts
import { env } from "./env"; // أول import: لو ناقص حاجة، التطبيق يقع هنا قبل ما يسمع على أي port
console.log($__btlistening on $__{env.PORT}$__bt);`
        },
        {
          cmd: "custom errors",
          title: "كل نوع خطأ ليه اسم ومعاملة",
          desc: R`بدل [[throw new Error('not found')]] وبعدين تقارن نص الرسالة، اعمل class لكل نوع خطأ مهم ([[NotFoundError]] و [[ValidationError]] و [[PaymentDeclinedError]])، وفرّق بينهم بـ [[instanceof]]. وفي مكان واحد (error handler) بتحوّل كل نوع لـ status code، والـ services متعرفش حاجة عن HTTP.`,
          example: R`class AppError extends Error {
  status = 500;
}
class NotFoundError extends AppError {
  override status = 404;
  override name = "NotFoundError";
}

function toHttp(err: unknown): { status: number; body: string } {
  if (err instanceof AppError) return { status: err.status, body: err.message };
  console.error(err);
  return { status: 500, body: "Internal error" };
}
console.log(toHttp(new NotFoundError("Order 7 not found"))); // { status: 404, body: 'Order 7 not found' }
console.log(toHttp(new TypeError("x is undefined")).status); // 500`,
          try: R`في مشروع Express عندك، اعمل [[AppError]] و [[NotFoundError]] و [[ValidationError]]، واكتب error middleware واحد بـ ٤ parameters [[(err, req, res, next)]] بيعمل زي [[toHttp]] ويتحط آخر حاجة. امسح كل [[res.status(404)]] المتفرقة في الـ controllers وخلّي الـ service ترمي [[NotFoundError]].`,
          flag: "script",
          deep: {
            why: R`لو كل الأخطاء [[Error]] عادي، مفيش طريقة تفرّق بينهم غير إنك تقرا الرسالة: [[if (e.message.includes('not found'))]]، ويوم ما حد يغيّر الرسالة أو يترجمها، الكود ده يبوظ من غير ما حد ياخد باله. وكمان الـ service بتبقى مضطرة ترد HTTP بنفسها، فمينفعش تناديها من cron job أو script.`,
            how: R`في JavaScript تقدر ترمي أي حاجة ([[throw 'oops']])، بس ارمي دايمًا Error أو class وارث منه، عشان يبقى معاه [[stack]] يقولك الخطأ حصل فين.

[[instanceof]] بيمشي على سلسلة الـ prototype: [[NotFoundError]] هو [[AppError]] وهو [[Error]]. فالـ catch يقدر يمسك نوع معين، أو كل أخطاء التطبيق مرة واحدة زي [[toHttp]].

التقسيم المهم نوعين: أخطاء متوقعة (operational) زي مش موجود، أو داتا غلط، أو الدفع اترفض، أو API خارجي واقع. دي جزء من البيزنس، ليها status ورسالة للمستخدم. وأخطاء مش متوقعة (bugs) زي [[TypeError]] من [[undefined]]: دي 500 برسالة عامة، والتفاصيل في اللوج بس، لأن الـ stack فيه مسارات ملفات وممكن أسرار.

في Express، الـ error middleware بياخد ٤ parameters وبيتحط بعد كل الـ routes، وفي Express 5 أي promise بترفض في handler بتوصله لوحدها من غير [[next(err)]] يدوي (التفاصيل في تاب «Backend بـ Node»). وعلى الفرونت، Next فيه [[error.tsx]] و React فيه error boundaries لنفس الفكرة.

وفيه أسلوب تاني للأخطاء المتوقعة: متعملش throw خالص، ورجّعها كقيمة ([[Result]]): نوع يا نجاح يا فشل، والـ TypeScript يجبر اللي بينادي يفحص الاتنين (تاب TypeScript، درس «generic types و defaults»).`,
            when: "أول ما يبقى عندك أكتر من نوع خطأ ليه معاملة مختلفة: 404 و 400 و 409 و 402. وفي أي مكتبة أو SDK بتكتبه، عشان اللي بيستخدمه يمسك أخطاءك بالنوع.",
            mistakes: R`ترجّع [[err.message]] أو [[err.stack]] للمستخدم في كل الأخطاء، فتسرّب تفاصيل السيرفر. وتعمل [[catch (e) { throw new Error('failed') }]] فتضيّع النوع والـ stack الأصلي (الحل [[cause]]، في الدرس الجاي). و [[instanceof]] بيفشل لو فيه نسختين من نفس المكتبة في [[node_modules]]، لأن كل نسخة ليها class مختلف. ومع [[strict]] في tsconfig، الـ [[e]] في الـ catch نوعها [[unknown]]، فافحصها بـ [[instanceof]] قبل ما تقرا [[e.message]].`
          },
          lines: [
            "أساس كل أخطاء التطبيق اللي احنا عارفينها.",
            "كل خطأ معروف معاه status، والافتراضي 500.",
            "قفلة.",
            "خطأ «مش موجود» بيورث من الأساس.",
            "الـ status بتاعه 404. [[override]] بتقول إننا قاصدين نغيّر قيمة موجودة في الأب.",
            "الاسم بيظهر في اللوج والـ stack بدل Error عادي.",
            "قفلة.",
            "المكان الوحيد اللي بيحوّل الأخطاء لـ HTTP. النوع [[unknown]] لأن أي حاجة ممكن تترمي في JavaScript.",
            "خطأ من أخطاءنا؟ رجّع الـ status والرسالة بتاعته.",
            "أي حاجة تانية bug مش متوقع: التفاصيل تتسجل في اللوج...",
            "...والمستخدم ياخد 500 برسالة عامة.",
            "قفلة.",
            "بيطبع 404 والرسالة.",
            "خطأ مش بتاعنا: 500، وتفاصيله في اللوج بس."
          ],
          sol: R`بـ curl هتشوف: [[/orders/7]] بـ 200، و [[/orders/99]] بـ 404 و [[Order 99 not found]]، و [[/orders/abc]] بـ 422، و [[/boom]] بـ 500 ورسالة عامة [[Internal error]] (والتفاصيل الحقيقية في console السيرفر بس). والـ route نفسه سطر واحد ومفيهوش ولا [[res.status]].

لو الـ middleware مش بيتنادى و Express بيرد بصفحة HTML فيها stack trace، يبقى واحد من ٣: الـ middleware متسجّل قبل الـ routes مش بعدها، أو ليه ٣ parameters بس (Express بيعرف الـ error middleware من إن ليه ٤، حتى لو [[_next]] مش مستخدم)، أو الخطأ اترمى من callback برا الـ handler (زي [[setTimeout]]) فمحدش مسكه.

في Express 5 الـ async handler اللي بيرمي بيوصل للـ middleware لوحده. في Express 4 لازم [[next(err)]] أو try/catch، وإلا الطلب بيفضل معلّق. ومتنساش [[name]] في كل class: من غيره [[err.name]] بيبقى [[Error]] في الـ logs وفي الرد.`,
          solCode: R`import express, { type Request, type Response, type NextFunction } from "express";

class AppError extends Error {
  status = 500;
}
class NotFoundError extends AppError {
  override status = 404;
  override name = "NotFoundError";
}
class ValidationError extends AppError {
  override status = 422;
  override name = "ValidationError";
}

// الـ service بترمي، ومتعرفش حاجة عن HTTP
const orders = new Map([["7", { id: "7", total: 250 }]]);
function getOrder(id: string) {
  if (!/^\d+$/.test(id)) throw new ValidationError($__btInvalid order id: $__{id}$__bt);
  const order = orders.get(id);
  if (!order) throw new NotFoundError($__btOrder $__{id} not found$__bt);
  return order;
}

const app = express();
app.get("/orders/:id", (req, res) => {
  res.json(getOrder(req.params.id)); // مفيش res.status(404) هنا خالص
});
app.get("/boom", () => {
  throw new TypeError("x is undefined");
});

// آخر حاجة، و ٤ parameters عشان Express يعرف إنه error middleware
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) return res.status(err.status).json({ error: err.name, message: err.message });
  console.error(err);
  res.status(500).json({ error: "InternalError", message: "Internal error" });
});

app.listen(3000, () => console.log("http://localhost:3000"));`
        },
        {
          cmd: "catch {}",
          title: "خطأ اتبلع ومحدش عرف إنه حصل",
          desc: R`[[catch {}]] الفاضي بيقول «لو حصل أي خطأ، اعمل نفسك مشفتش». الكود يكمّل كأن كل حاجة تمام، والنتيجة داتا ناقصة أو عملية متعملتش ومحدش يعرف ليه. في الـ catch يا تعالج الخطأ فعلًا، يا تضيف معلومة وترميه تاني بـ [[cause]]، يا متعملش catch خالص وسيبه يطلع للي فوق.`,
          example: R`// قبل: لو الـ JSON بايظ، الإعدادات بتبقى undefined ومحدش يعرف ليه
// let config; try { config = JSON.parse(text); } catch {}

function parseConfig(text: string): { port: number } {
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("config.json is not valid JSON", { cause: err });
  }
}

try {
  parseConfig("{ port: 3000 }");
} catch (err) {
  const e = err as Error;
  console.log(e.message, "| cause:", (e.cause as Error).message);
}`,
          try: R`دوّر في مشروعك على [[catch {}]] و [[catch (e) {}]] و [[.catch(() => {})]]. لكل واحد قرّر: أعالجه، ولا أسجّله وأكمّل بقيمة بديلة، ولا أشيل الـ catch خالص. واكتب في كل catch فضل سطر «ليه».`,
          flag: "script",
          deep: {
            why: R`الخطأ اللي اتبلع أصعب bug ممكن تدوّر عليه، لأن مفيش أي أثر: لا لوج، ولا رسالة، ولا exit code. الـ feature ببساطة مش شغالة. وفي مشروع حقيقي (تطبيق desktop) كان إنشاء فولدر اللوجات وكتابة لوج الجلسة جوه [[catch {}]] فاضية، فلو الصلاحيات غلط، التطبيق بيشتغل عادي واللوجات مبتتكتبش خالص، ومحدش هيكتشف ده غير يوم ما يحتاجها.`,
            how: R`عندك ٤ اختيارات بس، واختار واحد بوعي:

١. متعملش catch. سيب الخطأ يطلع لحد مكان عارف يعمل حاجة (الـ error handler في Express، أو error boundary في React). ده الصح في أغلب الحالات.

٢. ضيف سياق وارمي تاني: [[throw new Error('failed to load user 42', { cause: err })]]. الـ [[cause]] (من ES2022) بيحفظ الخطأ الأصلي بالـ stack بتاعه، و Node بيطبع الاتنين لما الخطأ يوصل للآخر من غير ما حد يمسكه.

٣. عالج فعلًا: retry لطلب شبكة فشل، أو قيمة بديلة مقصودة («الـ theme في localStorage بايظة؟ استخدم الافتراضي»)، بس سجّلها بـ [[console.warn]].

٤. تجاهل مقصود ومكتوب: حالات قليلة التجاهل فيها صح (تقفل اتصال مقفول أصلًا، أو [[localStorage]] بيرمي في private browsing). اكتب تعليق بيقول ليه، عشان اللي بعدك يعرف إنه قرار مش كسل.

والـ promises نفس الكلام: [[.catch(() => {})]] بلع، و promise من غير [[await]] ولا catch ممكن ترفض وتقفل Node كله ([[unhandledRejection]]). وقاعدة [[no-floating-promises]] في typescript-eslint بتمسك ده (تاب «فحص الكود»).`,
            when: "كل مرة تكتب catch، اسأل: أنهي اختيار من الأربعة؟ ولو مش عارف، سيبه يطلع.",
            mistakes: R`[[catch (e) { console.log(e) }]] وتكمّل عادي: ده بلع بشياكة، السطر بيتوه في اللوج والكود بيكمّل بحالة غلط. و [[catch (e) { throw new Error('something went wrong') }]] من غير cause، فالـ stack الأصلي ضاع. و [[return null]] في الـ catch، فاللي نادى مش عارف null معناها «مش موجود» ولا «حصل خطأ». وفي انترفيو لو اتسألت «بتتعامل مع الأخطاء إزاي؟»، قول: الأخطاء المتوقعة ليها أنواع ومعاملة، والمش متوقعة بتطلع لـ handler واحد بيسجّلها ويرد رد عام، ومفيش catch فاضي.`
          },
          lines: [
            "دالة بتقرا الإعدادات من نص.",
            "جرّب.",
            "لو الـ JSON سليم، رجّعه.",
            "لو باظ، امسك الخطأ...",
            "...وارمي خطأ جديد بيقول إيه اللي فشل من وجهة نظرنا، والأصلي جواه في [[cause]]، فمفيش حاجة ضاعت.",
            "قفلة الـ catch.",
            "قفلة الدالة.",
            "هنا بنجرّب JSON غلط (المفتاح من غير علامات تنصيص).",
            "النداء.",
            "هنا المكان اللي فعلًا عارف يعمل إيه بالخطأ.",
            "[[err]] نوعها [[unknown]]، فبنقول إنها Error.",
            "الرسالة بتاعتنا، وبعدها السبب الأصلي من [[JSON.parse]].",
            "قفلة."
          ],
          sol: R`كل catch فاضي هيطلع واحد من ٣ قرارات، وده شكلهم في الحل: (١) قيمة بديلة: cache أو localStorage بايظ، تسجّل [[console.warn]] وترجّع default، والناتج [[bad theme cache, using default: ...]] ثم [[light]]. (٢) تعالجه: خطأ متوقع ليه معنى (كوبون مش موجود يعني [[null]])، بس بتفحص نوعه وترمي أي حاجة تانية، فالناتج [[discount: null]] للـ 404 و [[rethrown: ECONNRESET]] لقطع الشبكة. (٣) تشيله: الـ catch كان بيخبّي فشل لازم يوقف العملية، زي فشل الدفع.

المقياس: بعد التمرين مفيش catch في المشروع من غير قرار من التلاتة، وكل واحد فوقه سطر «ليه».

الغلط الشائع: تحوّل [[catch {}]] لـ [[catch (e) { console.log(e) }]] وتعتبره خلص. ده لسه بلع: الكود بيكمّل كأن كل حاجة تمام، بس بقى فيه سطر في log محدش بيقراه. والغلط التاني إن الـ catch في (٢) يلقط كل حاجة من غير ما يفحص، فانقطاع النت يظهر للمستخدم «الكوبون غلط».`,
          solCode: R`// ١) أسجّل وأكمّل بقيمة بديلة: الـ cache مش ضروري، لو باظ نجيب من المصدر
function readCachedTheme(raw: string | null): string {
  try {
    return JSON.parse(raw ?? "null")?.theme ?? "light";
  } catch (err) {
    // ليه: localStorage ممكن يبقى فيه نسخة قديمة بايظة، والـ default كفاية
    console.warn("bad theme cache, using default:", (err as Error).message);
    return "light";
  }
}

// ٢) أعالجه: خطأ متوقع ليه معنى في البيزنس
async function findCoupon(code: string, load: (c: string) => Promise<number>): Promise<number | null> {
  try {
    return await load(code);
  } catch (err) {
    // ليه: الـ API بترجع 404 للكوبون الغلط، ودي مش مشكلة، ده «مفيش خصم»
    if (err instanceof Error && err.message === "404") return null;
    throw err; // أي حاجة تانية (شبكة، 500) مش شغلتي هنا
  }
}

// ٣) أشيل الـ catch خالص: كان بيبلع خطأ لازم يوقف العملية
// قبل: try { await chargeCard(order) } catch {}  ← الطلب بيتشحن من غير فلوس
// بعد: await chargeCard(order);  والـ error middleware هو اللي يرد

console.log(readCachedTheme("{broken"));
findCoupon("NOPE", async () => { throw new Error("404"); }).then((d) => console.log("discount:", d));
findCoupon("X", async () => { throw new Error("ECONNRESET"); }).catch((e) => console.log("rethrown:", e.message));`
        }
      ]
    },
    {
      t: "الـ state والـ side effects",
      l: 1,
      n: "الداتا متتغيرش من تحت إيدك، والحسبة بعيدة عن الداتابيز والشبكة",
      items: [
        {
          cmd: "immutability",
          title: "متعدّلش الداتا، اعمل نسخة جديدة",
          desc: R`immutability معناها إنك متعدّلش object أو array موجود، وبدل كده تعمل نسخة جديدة فيها التغيير: [[{ ...user, name: 'Ali' }]] بدل [[user.name = 'Ali']]، و [[[...items, newItem]]] بدل [[items.push(newItem)]]. لأن الـ object ممكن يكون متشارك في أكتر من مكان، والتعديل في مكان بيغيّره في الكل من غير ما حد يعرف.

و React أصلًا مبيشوفش التغيير لو عدّلت نفس الـ object، لأنه بيقارن بالمرجع (reference).`,
          example: R`type Cart = { readonly items: readonly string[]; readonly coupon?: string };

const cart: Cart = { items: ["book"] };

// قبل: بيعدّل الأصل، وأي حد ماسك cart اتغير عنده من غير ما يعرف
// cart.items.push("pen");

const withPen: Cart = { ...cart, items: [...cart.items, "pen"] };
const withCoupon: Cart = { ...withPen, coupon: "SAVE10" };
const sorted = withPen.items.toSorted();

console.log(cart.items, withPen.items, withCoupon.coupon, sorted);
// [ 'book' ] [ 'book', 'pen' ] SAVE10 [ 'book', 'pen' ]

const settings = Object.freeze({ theme: "dark" });
// settings.theme = "light";  خطأ في TypeScript، ووقت التشغيل مبيتغيرش`,
          try: R`في component React عندك فيه [[useState]] لـ array أو object، دوّر على [[push]] أو [[splice]] أو تعديل خانة مباشر قبل الـ setter. جرّب التعديل المباشر وشوف الشاشة مش بتتحدث، وبعدين النسخة الجديدة بالـ spread وشوفها بتتحدث.`,
          flag: "script",
          deep: {
            why: R`لما الداتا بتتعدّل من أكتر من مكان، مبقاش فيه حد يقدر يقولك قيمتها إيه في لحظة معينة من غير ما يتتبع كل اللي لمسها. bugs زي «الكارت اتغير لوحده» سببها غالبًا array متشاركة: حد اتعمل له نسخة من المرجع مش من الداتا، وعدّل فيها. ومع immutability، عشان تعرف الداتا اتغيرت، بتقارن المرجع بس ([[prev !== next]])، وده اللي React و Zustand و Redux مبنيين عليه.`,
            how: R`الـ objects والـ arrays في JavaScript بتتنقل بالمرجع: [[const b = a]] مش نسخة، ده اسم تاني لنفس الحاجة في الذاكرة، وأي تعديل من [[b]] بيبان في [[a]].

الـ spread ([[...]]) بيعمل shallow copy: المستوى الأول بس جديد. لو جوه الـ object فيه object تاني، النسخة والأصل لسه متشاركين فيه. عشان كده لما تعدّل حاجة عميقة، تنسخ كل مستوى في الطريق: [[{ ...user, address: { ...user.address, city: 'Cairo' } }]]. ولو عايز نسخة عميقة كاملة: [[structuredClone(obj)]] (موجودة في Node والمتصفحات).

الدوال اللي بتعدّل الأصل ([[push]] و [[pop]] و [[splice]] و [[sort]] و [[reverse]]) ليها بدايل بترجع array جديدة: spread، و [[filter]]، و [[toSorted]] و [[toReversed]] و [[toSpliced]] و [[with(index, value)]] (من ES2023).

و [[const]] مش immutability: بيمنع إنك تربط الاسم بقيمة تانية، بس المحتوى يتعدّل عادي. اللي بيمنع التعديل: [[readonly]] و [[Readonly<T>]] و [[as const]] في TypeScript (وقت الكتابة بس)، و [[Object.freeze]] وقت التشغيل (وبرضه shallow). وفي ملفات ES modules (أو strict mode) الكتابة على object متجمّد بترمي [[TypeError]]، وفي غيرها بتتجاهل بسكوت.`,
            when: "الـ state في React أو أي store. الداتا اللي بتتشارك بين دوال أو modules. الإعدادات. وأي دالة بتاخد array أو object: متعدّلش الـ input بتاعها.",
            mistakes: R`[[items.sort()]] على array جاية من props أو state: بتعدّل الأصل، والـ UI يا مبيتحدثش يا بيتحدث غلط. و [[const]] وتفتكر الـ object بقى ثابت. و spread مستوى واحد وانت بتعدّل حاجة عميقة، فتعدّل في الأصل من غير ما تاخد بالك. ومش لازم كل حاجة immutable: متغير محلي جوه دالة بتبني فيه array بـ [[push]] وترجّعه في الآخر ده تمام، محدش تاني شايفه.`
          },
          lines: [
            "[[readonly]] بيخلي TypeScript يمنع أي تعديل على الخانات والـ array نفسها ([[push]] مش موجودة على array متعلّم readonly).",
            "الكارت الأصلي.",
            "نسخة جديدة: كل الخانات زي ما هي ([[...cart]])، والـ items array جديدة فيها القديم و pen.",
            "نسخة من النسخة بكوبون. الأصل والنسخة اللي قبلها زي ما هم.",
            "[[toSorted]] بترجع array جديدة مترتبة، عكس [[sort]] اللي بترتّب الأصل نفسه.",
            "الأصل لسه فيه book بس.",
            "[[Object.freeze]] بيقفل الـ object وقت التشغيل كمان، مش بس في TypeScript."
          ],
          sol: R`شغّلت الحل في jsdom، وده اللي حصل بالظبط: البداية [[1 todos]]، وبعد زرار [[add (wrong)]] فضلت [[1 todos]]. الـ push عدّل الـ array، بس [[setTodos(todos)]] بعت نفس المرجع، و React بيقارن بـ [[Object.is]] فشاف إن مفيش تغيير ومرسمش. وبعد زرار [[add]] الصح الشاشة بقت [[3 todos]] مش ٢! لأن العنصر اللي اتعمله push كان موجود فعلًا في الـ array، وظهر مع أول render جه بعده.

ده اللي بيخلي الـ bug ده مرعب في مشروع حقيقي: الداتا بتظهر «متأخرة» مع ضغطة زرار ملهاش علاقة، فتدوّر على المشكلة في المكان الغلط. والحل نسخة جديدة دايمًا: [[setTodos(prev => [...prev, item])]] للإضافة، و [[map]] مع [[{ ...t, done: !t.done }]] للتعديل، و [[filter]] للمسح، و [[toSorted]] بدل [[sort]].

وخد بالك إن الـ spread بينسخ أول مستوى بس: لو عدّلت [[t.address.city]] مباشرة لسه بتعدّل الأصل. ولو عملت [[prev.push]] جوه [[setTodos(prev => ...)]]، الـ StrictMode في التطوير بيشغّل الـ updater مرتين فالعنصر يتضاف مرتين: دي علامة إنك بتعدّل مش بتنسخ.`,
          solCode: R`import { useState } from "react";

type Todo = { id: number; text: string; done: boolean };

export function Todos() {
  const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "buy milk", done: false }]);

  // غلط: بيعدّل نفس الـ array، و React بيقارن بـ Object.is فبيلاقيه هو هو ومش بيرسم
  function addWrong(text: string) {
    todos.push({ id: Date.now(), text, done: false });
    setTodos(todos);
  }

  // صح: array جديدة، ولو بتعدّل عنصر: object جديد للعنصر ده بس
  function add(text: string) {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
  }
  function toggle(id: number) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function remove(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <p>{todos.length} todos</p>
      <button id="wrong" onClick={() => addWrong("pen")}>add (wrong)</button>
      <button id="right" onClick={() => add("pen")}>add</button>
      <button id="toggle" onClick={() => toggle(1)}>toggle</button>
      <button id="remove" onClick={() => remove(1)}>remove</button>
    </>
  );
}`
        },
        {
          cmd: "pure functions",
          title: "الحسبة لوحدها، والداتابيز والشبكة على الأطراف",
          desc: R`الـ pure function بترجع نفس النتيجة لنفس المدخلات، ومبتعملش أي side effect: مبتقراش داتابيز، ولا بتكتب ملف، ولا بتعدّل متغير برّاها، ولا بتعتمد على [[Date.now()]] أو [[Math.random()]].

الفكرة العملية اسمها functional core, imperative shell: قواعد البيزنس في دوال pure سهل تفهمها وتختبرها، والـ I/O في طبقة رفيعة برّا بتجيب الداتا، وتنادي الدوال الـ pure، وتحفظ أو تبعت النتيجة.`,
          example: R`type Sale = { amount: number; refunded: boolean };

// core: pure. مفيش I/O ولا وقت ولا random، ومبتعدّلش المدخلات
const netRevenue = (sales: readonly Sale[]): number =>
  sales.filter((s) => !s.refunded).map((s) => s.amount).reduce((sum, a) => sum + a, 0);

// shell: بيجيب ويبعت بس، ومفيهوش أي قرار
async function dailyReport(load: () => Promise<Sale[]>, send: (msg: string) => void) {
  const sales = await load();
  send($__btRevenue today: $__{netRevenue(sales)}$__bt);
}

const fakeLoad = async () => [
  { amount: 10, refunded: false },
  { amount: 5, refunded: true },
];
dailyReport(fakeLoad, console.log); // Revenue today: 10`,
          try: R`اختار دالة في مشروعك فيها حسبة و [[await prisma...]] أو [[fetch]] في نفس المكان. اطلّع الحسبة لدالة pure بتاخد الداتا كـ parameter، واكتب لها اختبار vitest من غير أي mock. قارن بصعوبة اختبار الدالة الأصلية.`,
          flag: "script",
          deep: {
            why: R`الدالة اللي بتحسب وبتكلم الداتابيز في نفس الوقت مينفعش تختبرها غير لو عندك داتابيز أو mocks كتير. ولو فيها [[new Date()]]، نتيجتها بتتغير كل يوم، فالاختبار ينجح النهارده ويقع بكرة. الـ pure function بتختبرها بسطر: مدخلات ونتيجة متوقعة. ولما يحصل bug، بتكرره بنفس المدخلات بالظبط.`,
            how: R`الـ side effect أي حاجة الدالة بتعملها غير إنها ترجع قيمة: تكتب في داتابيز أو ملف، أو تبعت request، أو تطبع، أو تعدّل parameter أو متغير global، أو تقرا حاجة بتتغير لوحدها (الوقت، و random، و env).

الـ pure function ليها صفتين: deterministic (نفس المدخلات نفس النتيجة دايمًا)، ومفيش side effects. والنتيجة إنك تقدر تناديها أي عدد مرات، أو تحفظ نتيجتها (memoization)، أو تشغّلها بالتوازي من غير قلق.

البرنامج من غير side effects ملوش لازمة، فالهدف مش إنك تلغيها، الهدف إنك تزقها للأطراف. الترتيب: هات الداتا (I/O)، احسب (pure)، احفظ أو ابعت (I/O). والقرارات كلها في الجزء الـ pure.

الوقت و random: خدهم كـ parameter ([[now = Date.now()]]) بدل ما تقراهم جوه الدالة. في الإنتاج بياخد القيمة الافتراضية، وفي الاختبار بتبعت وقت ثابت.

والـ pipeline ([[filter]] ثم [[map]] ثم [[reduce]]) أسلوب functional: كل خطوة دالة صغيرة بترجع نسخة جديدة، والسلسلة بتتقري زي وصف للي عايزه. بس لو الـ array ضخمة جدًا، كل خطوة بتعمل array مؤقتة، فساعتها loop واحد أسرع (قيس الأول، تاب DSA).`,
            when: "حسابات الأسعار والخصومات والضرايب، والتحقق من الصلاحيات، وتحويل الداتا (من شكل الداتابيز لشكل الـ API)، و reducers في React. أي منطق بيزنس.",
            mistakes: R`دالة شكلها pure بس بتعدّل الـ input ([[items.sort()]] جوه دالة حسبة)، فاللي نادى عليها اتغيرت الداتا عنده. و [[Date.now()]] مستخبية جوه حسبة، فالاختبارات بتقع في آخر الشهر بس. وفي React، الـ render نفسه لازم يبقى pure (مفيش fetch ولا تعديل state جواه)، والـ side effects مكانها event handlers و [[useEffect]]، و StrictMode بيعمل render مرتين في التطوير عشان يكشف ده.`
          },
          lines: [
            "شكل البيعة.",
            "دالة pure: بتاخد array وترجع رقم. [[readonly]] بيضمن إنها مش هتعدّل فيها.",
            "pipeline: شيل المرتجع، وخد المبالغ، واجمعهم. filter و map كل واحدة بترجع array جديدة، و reduce بترجع الرقم النهائي.",
            "الـ shell: الدالة اللي بتكلم العالم. الـ load والـ send جايين من برا، فتقدر تبدّلهم.",
            "I/O: هات الداتا.",
            "نادِ الحسبة الـ pure، وابعت النتيجة (I/O تاني).",
            "قفلة.",
            "بدل الداتابيز في التجربة: دالة بترجع داتا ثابتة.",
            "بيعة عادية.",
            "بيعة اترجعت.",
            "قفلة.",
            "شغّل التقرير، و [[console.log]] مكان الإيميل. بيطبع [[Revenue today: 10]]."
          ],
          sol: R`الـ ٣ اختبارات خضرا، ومن غير [[vi.mock]] ولا داتابيز ولا [[await]]: بتبعت array و object وتقارن رقم. قارن ده باختبار الدالة الأصلية: كنت محتاج mock لـ [[prisma.order.findUnique]] يرجّع شكل الـ include بالظبط، ولو حد غيّر الـ query (زوّد [[select]] مثلًا) الاختبار يقع مع إن الحسبة سليمة.

والـ shell اللي فضل ([[invoiceForOrder]]) سطرين: يجيب ويبعت للدالة. ده مش محتاج unit test، بيتغطى باختبار integration واحد على داتابيز حقيقية (درس «هرم الاختبارات»).

علامة إن الفصل ناقص: الدالة الـ pure لسه بتنادي [[new Date()]] أو [[Math.random()]] أو بتعدّل الـ array اللي داخلالها. الوقت يدخل parameter ([[now: Date]]) وكذلك الـ random. والغلط التاني إنك تبعت الـ order كله زي ما Prisma رجّعه: ابعت اللي الدالة محتاجاه بس ([[lines]] و [[customer]])، فالأنواع تبقى صغيرة والاختبار يبني الداتا في سطر.`,
          solCode: R`// invoice.ts
export type Line = { price: number; qty: number };
export type Customer = { isVip: boolean };

// قبل: async function invoiceTotal(orderId) { const order = await prisma.order.findUnique(...); ...حسبة...; }
// بعد: الحسبة pure، والـ I/O برا
export function invoiceTotal(lines: readonly Line[], customer: Customer): number {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const discount = customer.isVip && subtotal >= 1000 ? subtotal * 0.1 : 0;
  return subtotal - discount;
}

// الـ shell: سطرين، ومفيهوش قرار
// export async function invoiceForOrder(id: string) {
//   const order = await prisma.order.findUniqueOrThrow({ where: { id }, include: { lines: true, customer: true } });
//   return invoiceTotal(order.lines, order.customer);
// }

// invoice.test.ts
import { it, expect } from "vitest";
import { invoiceTotal } from "./invoice";

it("no discount for normal customers", () => {
  expect(invoiceTotal([{ price: 600, qty: 2 }], { isVip: false })).toBe(1200);
});
it("10% for VIP from 1000", () => {
  expect(invoiceTotal([{ price: 500, qty: 2 }], { isVip: true })).toBe(900);
});
it("no VIP discount under 1000", () => {
  expect(invoiceTotal([{ price: 999, qty: 1 }], { isVip: true })).toBe(999);
});`
        }
      ]
    },
    {
      t: "Code smells",
      l: 1,
      n: "علامات إن الكود محتاج refactoring، وأمثلة حقيقية من مشاريع اتبنت بسرعة",
      items: [
        {
          cmd: "code smells",
          title: "علامات إن الكود محتاج يتصلّح",
          desc: R`الـ code smell علامة مش bug: الكود شغال، بس شكله بيقول إن تعديله هيبقى صعب. أشهرهم: دالة طويلة، وكود متكرر، و parameters كتير، و boolean بيقلب سلوك الدالة، و god object، وأرقام من غير أسماء، وكود ميت محدش بيناديه.

المثال بيصلّح اتنين مع بعض: ٥ parameters ورا بعض (سهل تبدّل اتنين من نفس النوع ومحدش ياخد باله) بقوا object بأسماء، والـ boolean اللي كان بيقلب الدالة بقى دالة تانية باسمها.`,
          example: R`// قبل: 5 parameters ورا بعض، وآخرهم boolean محدش فاهمه من برا
// createUser("you@example.com", "Ali", "0100", 30, true);  الاسم والإيميل متبدّلين، و true دي إيه؟

type NewUser = { name: string; email: string; phone?: string };

function createUser({ name, email, phone = "" }: NewUser) {
  return { id: crypto.randomUUID(), name, email, phone, role: "member" as const };
}
function createAdmin(user: NewUser) {
  return { ...createUser(user), role: "admin" as const };
}

const admin = createAdmin({ email: "you@example.com", name: "Ali" });
console.log(admin.name, admin.role); // Ali admin`,
          try: R`دوّر في مشروعك على دالة بتاخد ٤ parameters أو أكتر، أو نداء فيه [[true]] أو [[false]] أو [[undefined, undefined]]. حوّلها لـ object parameter (أو لدالتين لو الـ boolean بيقسمها نصين)، وسيب TypeScript يدلّك على كل الأماكن اللي محتاجة تتغير.`,
          flag: "script",
          deep: {
            why: R`الـ smells بتدّيك لغة ومقياس. بدل «الكود ده وحش»، تقول «الدالة دي بتاخد ٦ parameters وفيها flag»، ودي حاجة محددة ليها علاج معروف. ومهمة في الـ code review، وفي الانترفيو لما يدّيك كود ويقولك «إيه رأيك فيه؟».`,
            how: R`أشهر الـ smells وعلاجها (من كتاب Refactoring):

دالة طويلة: Extract Function (درس «small functions»).
كود متكرر: دالة واحدة من تالت مرة (درس DRY).
parameters كتير: Parameter Object زي المثال. ولو نفس المجموعة بتتنقل مع بعض في كل مكان ([[lat, lng]] أو [[startDate, endDate]])، دي data clump، اعملها نوع لوحدها.
flag argument ([[render(true)]]): لو بيختار بين سلوكين مختلفين، دالتين بأسماء. ولو بيعدّل تفصيلة، options بأسماء ([[listUsers({ includeDeleted: true })]]). ولو الاختيار بيتحدد وقت التشغيل، union ([[format: 'csv' | 'json']]) وجدول من القيمة للدالة، وده strategy في أبسط شكل (المستوى ٢، درس «over-engineering»).
booleans متعارضة ([[isLoading]] و [[isError]] و [[isSuccess]] مع بعض): حالة واحدة [[status: 'loading' | 'error' | 'success']]، فالتركيبات المستحيلة تبقى مستحيلة في النوع نفسه.
god object: قسّمه على المسؤولية (الدرس الجاي).
primitive obsession: كل حاجة string و number، فـ [[userId]] و [[orderId]] ممكن يتبدّلوا. العلاج أنواع أدق (تاب TypeScript).
feature envy: دالة بتقرا من object تاني أكتر من نفسها: انقلها جنب الداتا.
shotgun surgery: تغيير صغير محتاج تعدّل ١٠ ملفات: المعلومة متفرقة، لمّها.
dead code: دوال و exports محدش بيناديها: امسحها (Git فاكرها)، وأداة زي knip بتلاقيها.

ولما تفك الـ object في الـ parameters ([[{ name, email }: NewUser]])، TypeScript بيتأكد إن الخانات المطلوبة موجودة، وإن مفيش خانة غلط لو بتبعت object literal مباشرة.`,
            when: "في الـ code review، وقبل ما تضيف ميزة في كود قديم (نضّف الحتة اللي هتشتغل فيها الأول)، ولما حاجة بسيطة تاخد وقت أطول من المتوقع لأن «الكود معقد».",
            mistakes: R`تعامل الـ smell كقانون: مش كل دالة ٣٠ سطر محتاجة تتقسم، ومش كل boolean parameter غلط ([[force = false]] بقيمة افتراضية في job مقبول لحد ما يتضاف تاني وتالت). الـ smell سؤال: «ده بيصعّب التغيير هنا؟». وتقسّم لدالتين وتنسخ الكود المشترك فيهم، والصح إن واحدة تبني على التانية زي [[createAdmin]]. وrefactoring ضخم لكل الـ smells في نفس PR فيه ميزة جديدة، فالمراجعة تبقى مستحيلة: الـ refactoring في PR لوحده ومعاه اختبارات.`
          },
          lines: [
            "الـ parameters بقت نوع واحد بأسماء، والتليفون اختياري ([[?]]) بدل ما تبعت [[undefined]] في النص.",
            "الدالة بتاخد object وتفكّه، والاختياري ليه قيمة افتراضية.",
            R`بترجّع user عادي. [[as const]] بيخلي النوع [["member"]] بالظبط مش أي string.`,
            "قفلة.",
            "الأدمن دالة لوحده بدل [[createUser(..., true)]]، والنداء نفسه بيقول بيعمل إيه.",
            "بتبني على العادية وبتغيّر الـ role بس، فمفيش كود متكرر.",
            "قفلة.",
            "النداء بالأسماء: الترتيب مبقاش يفرق، ومستحيل تبدّل الاسم بالإيميل.",
            "بيطبع [[Ali admin]]."
          ],
          sol: R`بعد ما تغيّر التوقيع لـ object، شغّل [[tsc --noEmit]]: TypeScript هيطلّع خطأ في كل نداء قديم لسه بيبعت parameters ورا بعض، ودي بالظبط قايمة الأماكن اللي محتاجة تتغير. خلّصها لحد ما تبقى صفر. ولو فيه boolean زي [[isHtml]] بيقسم الدالة نصين، الحل دالتين ([[sendHtml]] و [[sendText]]) زي الحل. الناتج [[text/html undefined]] ثم [[support@example.com]]: الخانات الاختيارية ([[cc]] و [[replyTo]]) بقت بالاسم، ومفيش [[undefined, undefined]].

الغلط الشائع إنك تعمل object parameter بـ type [[any]] أو [[Record<string, unknown>]]: كده خسرت الـ checklist، ونداء فيه [[{ emial: ... }]] بغلطة إملائية هيعدّي. استخدم type مسمّى زي [[Email]]، و TypeScript هيطلّع خطأ على الخانة الغلط.

وفي الانترفيو: «ليه object parameter؟» الإجابة: النداء بيتقري من غير ما تفتح الدالة، والترتيب مبقاش مهم فمينفعش تبدّل الاسم والإيميل، وتقدر تضيف خانة اختيارية من غير ما تكسر ولا نداء قديم.`,
          solCode: R`// قبل: sendEmail("you@example.com", "Welcome", "<h1>Hi</h1>", undefined, undefined, true);
// آخر true دي «html»؟ ولا «urgent»؟ والـ undefined دي إيه؟

type Email = { to: string; subject: string; body: string; cc?: string[]; replyTo?: string };

function sendText(email: Email) {
  return { ...email, contentType: "text/plain" };
}
function sendHtml(email: Email) {
  return { ...email, contentType: "text/html" };
}

const sent = sendHtml({ to: "you@example.com", subject: "Welcome", body: "<h1>Hi</h1>" });
console.log(sent.contentType, sent.cc); // text/html undefined
console.log(sendText({ to: "you@example.com", subject: "Hi", body: "x", replyTo: "support@example.com" }).replyTo);`
        },
        {
          cmd: "god object",
          title: "ملف واحد شايل كل حاجة",
          desc: R`الـ god object (أو god component في React) حاجة واحدة شايلة مسؤوليات كتير ملهاش علاقة ببعض. أي تعديل في أي feature بيعدّي عليها، وكل الناس بتتخانق عليها في الـ merge conflicts، ومحدش فاهمها كلها. العلاج: قسّم على المسؤولية مش على الحجم، فكل feature في hook أو component أو module لوحده، والأب بيجمّعهم.`,
          example: R`import { useState } from "react";

// قبل: الـ checkout فيه 44 useState، منهم 6 للكوبون لوحده
// const [couponCode, setCouponCode] = useState(""); const [couponLoading, ...] ...

type CouponState = { status: "idle" | "loading" | "valid" | "invalid"; discount: number };

export function useCoupon(validate: (code: string) => Promise<number | null>) {
  const [state, setState] = useState<CouponState>({ status: "idle", discount: 0 });
  async function apply(code: string) {
    setState({ status: "loading", discount: 0 });
    const discount = await validate(code);
    setState(discount === null ? { status: "invalid", discount: 0 } : { status: "valid", discount });
  }
  return { ...state, apply };
}

// الأب بقى بيجمّع بس: const coupon = useCoupon(api.validateCoupon); const shipping = useShipping();`,
          try: R`افتح أكبر component عندك واعدّ الـ [[useState]] والـ [[useEffect]]. جمّع اللي بيتغيروا مع بعض (كل حاجة ليها علاقة بالكوبون مثلًا)، واطلّعهم في custom hook لوحده، وشوف الـ component الأصلي خسر كام سطر.`,
          flag: "script",
          deep: {
            why: R`الملف الضخم بيتكوّن تدريجيًا: كل feature جديدة «هنحطها هنا بسرعة». في مشروع حقيقي كانت صفحة الـ checkout component واحد أكتر من ٦٠٠٠ سطر فيه ٤٤ [[useState]] و ٢٦ [[useEffect]]: كوبونات، ومدة اشتراك، وإضافات، وطرق دفع، ورفع إيصال. وفي الـ backend ملف admin service واحد فيه أكتر من ٨٠ دالة لكل جداول المشروع، والاتنين اتنسخوا زي ما هم لمشاريع تانية. أي تعديل بسيط محتاج تفهم آلاف السطور، وأي state ممكن يبوّظ feature تانية، واستحالة تكتب اختبار لحتة واحدة.`,
            how: R`الـ god object عكس Single Responsibility (أول مبدأ في SOLID): كل module يبقى ليه سبب واحد يتغير.

إزاي تقسّم component ضخم: جمّع الـ state اللي بيتغير مع بعض في custom hook زي [[useCoupon]]. واطلّع كل جزء UI بيعرض حاجة واحدة في component لوحده ([[CouponBox]] و [[PaymentMethods]] و [[OrderSummary]]). والحسابات (الإجمالي بعد الخصم) دوال pure برّا الـ component خالص. والأب بيبقى «مايسترو»: بينادي الـ hooks ويوزّع على الأطفال.

ولاحظ في المثال إن ٤ booleans للكوبون (loading و valid و error و ...) بقوا [[status]] واحد، فمستحيل الكوبون يبقى «بيحمّل» و «مرفوض» في نفس الوقت.

وإزاي تقسّم service ضخم: كل feature ليها module ([[users.service]] و [[orders.service]] و [[coupons.service]])، والـ admin routes تنادي الـ services دي بدل ما يبقى ليها service خاص فيه نسخة تانية من كل حاجة.

ومتقسّمش مرة واحدة. كل مرة تلمس الملف عشان feature، اطلّع الحتة اللي بتشتغل فيها بس، ودي اسمها boy scout rule: سيب الكود أنضف شوية من ما لقيته. وقبل ما تقسّم كود حساس زي الـ checkout، اكتب اختبار e2e بيغطي الحالة الأساسية (المستوى ٣، درس «هرم الاختبارات»).`,
            when: "لما الملف يعدّي كام مية سطر وفيه أكتر من feature، أو لما كل PR بيلمس نفس الملف، أو لما تعمل scroll كتير عشان تلاقي الـ state اللي بتدوّر عليها.",
            mistakes: R`تقسّم على الشكل مش المعنى: [[Checkout1.tsx]] و [[Checkout2.tsx]] كل واحد ٣٠٠٠ سطر. وتطلّع hooks بس تسيبها تعتمد على بعض بـ ١٠ parameters. و prop drilling لعمق ٥ مستويات بعد التقسيم، وساعتها context أو store صغير لحالة الـ checkout أحسن (تاب React). وفي الناحية التانية: متعملش ٥٠ ملف لـ feature بسيطة، التقسيم لما يبقى فيه سبب.`
          },
          lines: [
            "من React.",
            "حالة الكوبون كلها في نوع واحد، والـ status قيمة واحدة بدل كذا boolean.",
            "custom hook مسؤول عن الكوبون بس. الـ validate جاية من برا (API حقيقي، أو fake في الاختبار).",
            "state واحدة بدل ٦.",
            "الفعل الوحيد اللي الـ hook بيعرضه.",
            "ابدأ التحميل.",
            "اسأل السيرفر: الكوبون ده بيخصم كام؟",
            "null يعني مرفوض، غير كده مقبول بالخصم.",
            "قفلة apply.",
            "الـ component ياخد الحالة والفعل بس، ومش شايف التفاصيل.",
            "قفلة."
          ],
          sol: R`الـ component الكبير هتلاقي فيه عادةً ٣ أو ٤ مجموعات state بتتغير مع بعض: الكوبون (الكود، والتحميل، والخطأ، والخصم)، والشحن، والدفع. كل مجموعة تبقى custom hook زي [[useCoupon]] في الحل، والـ component يبقى [[const coupon = useCoupon(api.validateCoupon)]] ويعرض بس. جرّبت الـ hook لوحده: [[save50]] بمسافات بترجع [[valid 50]]، و [[nope]] بترجع [[invalid 0]].

التقسيم صح لو الـ hook مش محتاج state من الأب غير اللي بيتبعتله، والـ component مابقاش فيه ولا [[useState]] ليه علاقة بالكوبون. ولو الـ hook محتاج [[setShipping]] من الأب عشان يشتغل، يبقى المجموعتين مش مستقلين فعلًا: يا تدمجهم، يا الـ hook ياخد callback.

الغلط الشائع: hook واحد [[useCheckout]] فيه كل الـ state. ده نقل الـ god object لملف تاني من غير ما يقسمه. ولو الـ hook بيرجّع ١٥ حاجة، يبقى لسه شايل أكتر من مسؤولية.`,
          solCode: R`import { useState } from "react";

type CouponState = { status: "idle" | "loading" | "valid" | "invalid"; discount: number };

// hooks/useCoupon.ts: كل حاجة الكوبون في مكان واحد
export function useCoupon(validate: (code: string) => Promise<number | null>) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<CouponState>({ status: "idle", discount: 0 });
  async function apply() {
    setState({ status: "loading", discount: 0 });
    const discount = await validate(code.trim().toUpperCase());
    setState(discount === null ? { status: "invalid", discount: 0 } : { status: "valid", discount });
  }
  return { code, setCode, ...state, apply };
}

// Checkout.tsx: بيجمّع بس، ومبقاش فيه ولا useState للكوبون
export function Checkout({ subtotal, validateCoupon }: { subtotal: number; validateCoupon: (c: string) => Promise<number | null> }) {
  const coupon = useCoupon(validateCoupon);
  return (
    <form onSubmit={(e) => { e.preventDefault(); coupon.apply(); }}>
      <input value={coupon.code} onChange={(e) => coupon.setCode(e.target.value)} />
      <button disabled={coupon.status === "loading"}>Apply</button>
      {coupon.status === "invalid" && <p role="alert">Invalid coupon</p>}
      <output>Total: {subtotal - coupon.discount}</output>
    </form>
  );
}`
        }
      ]
    }
  ]
});

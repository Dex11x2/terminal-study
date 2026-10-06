// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "شكل الـ objects",
      l: 1,
      n: "توصف خصايص الـ object، وتقرر مين اختياري ومين ثابت، وتسمّي الشكل بـ type أو interface",
      items: [
        {
          cmd: "object types",
          title: "توصف شكل object: خصايصه وأنواعها",
          desc: R`نوع الـ object بيوصف خصايصه: [[{ id: number; name: string }]]. أي object فيه الخصايص دي بالأنواع دي يعدّي، حتى لو محدش قال إنه «من النوع ده». ده اسمه structural typing: TS بيبص على الشكل مش على الاسم.

والـ object literal اللي بتكتبه مباشرة في مكان النوع، لو فيه خاصية زيادة بيطلع خطأ (excess property check)، لأنها غالبًا غلطة في الاسم.`,
          example: R`type User = { id: number; name: string; email: string };
function sendWelcome(user: { name: string; email: string }) {
  return $__btWelcome $__{user.name} <$__{user.email}>$__bt;
}
const u: User = { id: 1, name: "Sara", email: "you@example.com" };
sendWelcome(u);
const admin = { name: "Omar", email: "admin@example.com", role: "admin" };
sendWelcome(admin);
sendWelcome({ name: "Ali", emial: "a@example.com" }); // خطأ: emial مش موجودة في النوع
const bad: User = { id: 2, name: "Mona" }; // خطأ: email ناقصة`,
          try: R`امسح [[email]] من [[admin]] وشوف الخطأ اتنقل لسطر [[sendWelcome(admin)]]. وبعدين جرّب [[sendWelcome({ ...admin, extra: 1 })]] وشوف الخاصية الزيادة اللي مكتوبة بإيدك بتتمسك ولا لأ.`,
          flag: "script",
          deep: {
            why: "في JS كل حاجة objects: الـ user، والـ request، والـ props، والـ config. لو شكلهم مش مكتوب، كل مرة تسأل «هو اسمها userId ولا user_id؟» وتفتح الكود أو تعمل console.log. النوع بيخلي المحرر يقولك.",
            how: R`TS بيقارن الأنواع بالشكل (structural typing): النوع A ينفع مكان B لو A فيه كل الخصايص اللي B محتاجها بأنواع متوافقة. الاسم مش مهم، ومفيش حاجة اسمها «implements» لازم تتكتب. وده عكس Java و C# (nominal typing)، اللي فيهم لازم تعلن إن الكلاس بيحقق الـ interface.

عشان كده object فيه خصايص زيادة يعدّي عادي: [[User]] ينفع يتبعت لدالة محتاجة [[{ name; email }]] بس. وده منطقي في JS، لأن الدالة مش هتقرا غير اللي محتاجاه.

الاستثناء: object literal جديد مكتوب مباشرة في مكان النوع (في تعيين أو argument). هنا TS بيفحص الخصايص الزيادة (excess property check)، لأن مفيش حد تاني هيستخدم الـ object ده، فالخاصية الزيادة غالبًا غلطة إملائية. أول ما تحطه في متغير الأول، الفحص ده مبيحصلش.

ونتيجة مهمة: [[Object.keys(user)]] نوعها [[string[]]] مش أسماء خصايص User، لأن الـ object ممكن يكون فيه خصايص زيادة TS مش شايفها.`,
            when: "أي object بيتنقل بين دوال: داتا من API، و props، وإعدادات. وسمّي النوع ([[type User]]) لما يتكرر في أكتر من مكان.",
            mistakes: R`تفتكر إن TS بيمنع الخصايص الزيادة دايمًا، فتبعت object فيه [[password]] لدالة بترجع الداتا للـ client وتفتكر إن النوع هيشيله. النوع مبيشيلش حاجة وقت التشغيل: لازم تختار الخصايص بإيدك (select في Prisma، أو destructuring). ودي ثغرة أمان حقيقية.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف شكل object، ودالة محتاجة جزء من الشكل ده بس، وبعدين بيبعتلها ٤ objects: اتنين بيعدّوا واتنين لأ. الهدف تفهم **إمتى** الخصايص الزيادة مقبولة وإمتى لأ. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، واتشغّل بـ [[tsx]].

---

## ١. نوع object

~~~text app.ts
type User = { id: number; name: string; email: string };
~~~

- [[{ ... }]] في مكان نوع معناها «object شكله كده».
- كل خاصية: اسمها، و [[:]]، ونوعها. والفاصل بينهم [[;]] أو [[,]]، الاتنين ينفعوا.
- [[type User =]] بيدّي الشكل ده اسم، عشان نستخدمه في أكتر من مكان.

---

## ٢. دالة محتاجة جزء من الشكل

~~~text app.ts
function sendWelcome(user: { name: string; email: string }) {
  return $__btWelcome $__{user.name} <$__{user.email}>$__bt;
}
~~~

الـ parameter نوعه مكتوب في نفس المكان من غير اسم: «أي object فيه [[name]] و [[email]] strings». الدالة مبتقولش إنها عايزة [[User]].

- [[$__bt...$__bt]] template string، و [[$__{user.name}]] بيتحط مكانه الاسم.
- [[< >]] هنا حروف عادية جوه النص، مش TS.

---

## ٣. اللي بيعدّي: structural typing

~~~text app.ts
const u: User = { id: 1, name: "Sara", email: "you@example.com" };
sendWelcome(u);
const admin = { name: "Omar", email: "admin@example.com", role: "admin" };
sendWelcome(admin);
~~~

~~~text الناتج: console.log على كل نداء
Welcome Sara <you@example.com>
Welcome Omar <admin@example.com>
~~~

- [[u]] نوعه [[User]]، وفيه [[id]] زيادة عن اللي الدالة طالباه. مقبول.
- [[admin]] محدش قال نوعه، و TS استنتجه [[{ name: string; email: string; role: string; }]]. فيه [[role]] زيادة. مقبول برضه.

ليه؟ لأن TS بيقارن **بالشكل مش بالاسم**: الدالة محتاجة [[name]] و [[email]]، والاتنين موجودين. ده اسمه **structural typing**. في Java مثلًا لازم الكلاس يعلن إنه بيحقق النوع؛ هنا لأ.

---

## ٤. اللي مبيعدّيش

~~~text app.ts
sendWelcome({ name: "Ali", emial: "a@example.com" });
const bad: User = { id: 2, name: "Mona" };
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(9,28): error TS2561: Object literal may only specify known properties, but 'emial' does not exist in type '{ name: string; email: string; }'. Did you mean to write 'email'?
app.ts(10,7): error TS2741: Property 'email' is missing in type '{ id: number; name: string; }' but required in type 'User'.
~~~

### الأول: excess property check

الـ object هنا **مكتوب مباشرة جوه النداء** (اسمه object literal). في الحالة دي بس، TS بيفحص الخصايص الزيادة، لأن محدش تاني هيستخدم الـ object ده، فالخاصية الزيادة غالبًا غلطة إملائية. والرسالة نفسها خمّنت: [[Did you mean to write 'email'?]]

قارن بـ [[admin]] فوق: نفس الفكرة (خاصية زيادة)، بس [[admin]] متغير جاهز، فالفحص ده مبيحصلش.

### التاني: خاصية ناقصة

[[email]] إجبارية في [[User]]، والـ object مفيهوش. [[TS2741]] بيقولك بالظبط مين الناقص.

---

## الخلاصة

| الحالة | زيادة | ناقص |
|---|---|---|
| متغير جاهز ([[u]] و [[admin]]) | مقبول | خطأ |
| object literal مكتوب في مكانه | خطأ ([[TS2561]] أو [[TS2353]]) | خطأ ([[TS2741]]) |

- TS بيبص على الشكل مش على الاسم.
- النوع مبيشيلش الخصايص الزيادة وقت التشغيل: لو [[admin]] فيه [[password]] وبعته للـ client، هيوصل.`,
          lines: [
            R`نوع اسمه User بتلات خصايص. الفاصل [[;]] أو [[,]] الاتنين ينفعوا.`,
            R`الدالة محتاجة أي حاجة فيها [[name]] و [[email]] strings، مش لازم User.`,
            "TS عارف إن الاتنين strings.",
            "قفلة.",
            "object مطابق للنوع.",
            R`User فيه [[id]] زيادة، ومقبول: الشكل المطلوب موجود جواه.`,
            R`object فيه [[role]] زيادة، ومحدش قال إنه User.`,
            "مقبول برضه: structural typing.",
            "object مكتوب مباشرة وفيه اسم غلط: excess property check مسكه.",
            "خاصية إجبارية ناقصة."
          ],
          sol: R`بعد ما تمسح [[email]] من [[admin]]: الخطأ بيطلع على [[sendWelcome(admin)]]: Property 'email' is missing in type '{ name: string; role: string; }' but required in type '{ name: string; email: string; }' (TS2741). الـ object نفسه مفيهوش غلط، الغلط لما تبعته لحاجة محتاجة [[email]].

و [[sendWelcome({ ...admin, extra: 1 })]] (بعد ما ترجّع email) بيطلّع: Object literal may only specify known properties, and 'extra' does not exist (TS2353). يعني الخاصية الزيادة اللي كاتبها بإيدك في الـ literal بتتمسك، أما [[role]] اللي جاية من الـ spread بتعدّي عادي. ده excess property check: بيشتغل بس على الخصايص المكتوبة صريح في object literal، مش على متغير جاهز.`
        },
        {
          cmd: "? و readonly",
          title: "خاصية ممكن متكونش موجودة، وخاصية ممنوع تتغير",
          desc: R`[[?]] بعد اسم الخاصية معناها اختيارية: [[phone?: string]] نوعها [[string | undefined]]. و [[readonly]] قبلها معناها تتقري بس، ومينفعش تتعيّن بعد ما الـ object يتعمل.

وانت بتقرا خاصية اختيارية، [[?.]] بيقف لو القيمة undefined، و [[??]] بيحط قيمة بديلة.`,
          example: R`type Profile = {
  readonly id: string;
  name: string;
  phone?: string;
  address?: { city: string; street?: string };
};
const p: Profile = { id: "u1", name: "Sara" };
p.name = "Sara Ali";
p.id = "u2"; // خطأ: id للقراية بس
p.phone.trim(); // خطأ: 'p.phone' is possibly 'undefined'
const phone = p.phone?.trim() ?? "مفيش رقم";
const city = p.address?.city;`,
          try: R`اعمل [[const copy = { ...p, id: "x" }]] وشوف هل ده مسموح (أيوة: ده object جديد). وبعدين غيّر [[phone?: string]] لـ [[phone: string | undefined]] وشوف [[const p]] بقى بيطلب إيه.`,
          flag: "script",
          deep: {
            why: "الداتا الحقيقية ناقصة كتير: مستخدم من غير رقم، أو طلب من غير عنوان. من غير [[?]] يا إما هتكذب وتقول إنها موجودة دايمًا (والتطبيق يقع على undefined)، يا إما تكتب [[any]]. و [[readonly]] بتحمي الحاجات اللي منطقيًا متتغيرش زي الـ id.",
            how: R`[[phone?: string]] و [[phone: string | undefined]] قريبين بس مش زي بعض: الأولى الخاصية نفسها ممكن متتكتبش، والتانية لازم تتكتب حتى لو قيمتها undefined. و [[tsc --init]] في TS 5.9 وأحدث بيشغّل [[exactOptionalPropertyTypes]]، اللي بيفرّق بينهم أكتر: معاه، [[phone?: string]] مينفعش تحط فيها [[undefined]] صريحة.

[[readonly]] فحص وقت الكتابة بس، وسطحي: [[readonly address]] بيمنع [[p.address = ...]] بس مش [[p.address.city = ...]]. ووقت التشغيل مفيش أي حماية، لأن الأنواع بتتمسح.

[[?.]] (optional chaining) و [[??]] (nullish coalescing) دول JS حقيقي، مش TS. [[a ?? b]] بياخد b لو a هي [[null]] أو [[undefined]] بس، عكس [[||]] اللي بياخد b لو a هي [[0]] أو [[""]] كمان. عشان كده [[count || 10]] غلط لو 0 قيمة صح.`,
            when: "[[?]] للخصايص اللي فعلًا ممكن متجيش (حقول form اختيارية، أعمدة nullable). و [[readonly]] للـ ids والإعدادات والـ props، وفي React الـ props كلها منطقيًا readonly.",
            mistakes: R`تحط [[?]] على كل حاجة عشان الأخطاء تختفي، فتلاقي نفسك بتكتب [[?.]] في كل سطر وبتخبّي bugs. وتستخدم [[||]] مكان [[??]] مع أرقام: [[page || 1]] بتحوّل الصفحة 0 لـ 1. وتفتكر إن [[readonly]] بيمنع التعديل على الـ objects اللي جوه.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف شكل profile فيه خاصية ممنوع تتغير ([[readonly]])، وخصايص ممكن متكونش موجودة ([[?]])، وبعدين بيوريك إزاي تقراهم من غير ما الكود يقع. اتفحص بـ TypeScript 6.0.3 (و 7.0.2 نفس الأخطاء) واتشغّل بـ [[tsx]].

---

## ١. النوع

~~~text app.ts
type Profile = {
  readonly id: string;
  name: string;
  phone?: string;
  address?: { city: string; street?: string };
};
~~~

| الخاصية | معناها |
|---|---|
| [[readonly id: string]] | لازم تتكتب وقت إنشاء الـ object، وبعد كده للقراية بس |
| [[name: string]] | إجبارية وتتعدّل عادي |
| [[phone?: string]] | الـ [[?]] بعد الاسم: ممكن متتكتبش خالص. ولو اتكتبت تبقى string |
| [[address?: { ... }]] | object جوه object، هو كمان اختياري، وجواه [[street]] اختيارية |

ولما توقف على [[Profile]] في المحرر، TS بيوريك المعنى الحقيقي للـ [[?]]:

~~~text النوع
type Profile = { readonly id: string; name: string; phone?: string | undefined; address?: { city: string; street?: string | undefined; } | undefined; }
~~~

يعني لما تقرا [[p.phone]] نوعها [[string | undefined]]: يا نص يا مفيش.

---

## ٢. إنشاء وتعديل

~~~text app.ts
const p: Profile = { id: "u1", name: "Sara" };
p.name = "Sara Ali";
p.id = "u2";
~~~

- السطر الأول مقبول: مفيش [[phone]] ولا [[address]]، وده مسموح لأنهم اختياريين.
- [[p.name = ...]] عادي.
- [[p.id = ...]] مرفوض:

~~~text الناتج: npx tsc --noEmit
app.ts(9,3): error TS2540: Cannot assign to 'id' because it is a read-only property.
~~~

> [[const p]] بيمنع إنك تحط object تاني في [[p]]. [[readonly id]] بيمنع تعديل الخاصية دي جوه الـ object. الاتنين مختلفين.

---

## ٣. قراية خاصية اختيارية: الغلط

~~~text app.ts
p.phone.trim();
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(10,1): error TS18048: 'p.phone' is possibly 'undefined'.
~~~

TS محق: [[p]] مفيهوش phone. ولو شغّلت الملف بـ [[tsx]] من غير ما تفحص، ده اللي بيحصل فعلًا:

~~~text الناتج: npx tsx app.ts (سطر الخطأ)
TypeError: Cannot read properties of undefined (reading 'trim')
~~~

---

## ٤. قراية خاصية اختيارية: الصح

~~~text app.ts
const phone = p.phone?.trim() ?? "مفيش رقم";
const city = p.address?.city;
~~~

### [[?.]]: optional chaining

[[p.phone?.trim()]] معناها: لو [[p.phone]] null أو undefined، **وقّف** ورجّع undefined من غير ما تنادي [[trim]]. غير كده كمّل عادي.

### [[??]]: nullish coalescing

[[A ?? B]] معناها: لو A هي null أو undefined خُد B، غير كده خُد A.

فالسطر الأول بيتقري من جوه لبرة: «لو فيه phone اعمله trim، ولو مفيش خُد "مفيش رقم"». ونوع [[phone]] بقى [[string]] بس، لأن الحالتين نص.

و [[city]] نوعها [[string | undefined]]، لأن مفيش [[??]] بعدها.

~~~text الناتج: console.log(p, phone, city)
{ id: 'u1', name: 'Sara Ali' } مفيش رقم undefined
~~~

ونفس السطرين على profile فيه الداتا ([[phone: " 0100 "]] و [[address: { city: "Cairo" }]]):

~~~text الناتج
0100 Cairo
~~~

---

## ٥. [[??]] مش زي [[||]]

| التعبير | الناتج | ليه |
|---|---|---|
| [[0 ?? 10]] | [[0]] | 0 مش null ولا undefined |
| [[0 || 10]] | [[10]] | [[||]] بيعتبر 0 «فاضي» |
| [["" ?? "x"]] | [[""]] (نص فاضي) | نفس الفكرة |
| [["" || "x"]] | [["x"]] | النص الفاضي «فاضي» عند [[||]] |

اتشغّلوا بـ [[tsx]]. فلو 0 أو نص فاضي قيمة صح عندك، استخدم [[??]].

---

## ٦. [[?]] و [[exactOptionalPropertyTypes]]

[[tsc --init]] في TS 6 و 7 بيشغّل الإعداد ده. معاه، [[phone?: string]] معناها «يا متتكتبش، يا string»، فـ [[phone: undefined]] صريحة بتبقى خطأ:

~~~text الناتج: { id: "u1", name: "Sara", phone: undefined } مع exactOptionalPropertyTypes
error TS2375: Type '{ id: string; name: string; phone: undefined; }' is not assignable to type 'Profile' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'phone' are incompatible.
    Type 'undefined' is not assignable to type 'string'.
~~~

ومن غيره (strict بس) نفس السطر عدّى.

---

## الخلاصة

- [[?]] قبل [[:]]: الخاصية ممكن متكونش موجودة، وقرايتها بترجّع [[T | undefined]].
- [[readonly]]: تتكتب وقت الإنشاء بس. وده فحص كتابة بس، مفيش حماية وقت التشغيل.
- اقرا الاختياري بـ [[?.]]، وحط بديل بـ [[??]]، و [[||]] بتبلع 0 والنص الفاضي.`,
          lines: [
            "بداية النوع.",
            R`[[readonly]]: يتحط وقت الإنشاء بس.`,
            "خاصية عادية إجبارية.",
            "اختيارية: ممكن متكونش موجودة خالص.",
            "object جواه، هو كمان اختياري، وجواه خاصية اختيارية.",
            "قفلة النوع.",
            "مفيش phone ولا address، ومقبول.",
            "الخصايص العادية تتعدّل عادي.",
            R`[[readonly]] منعت التعديل.`,
            "TS مش هيسيبك تنادي method على حاجة ممكن تكون undefined.",
            R`[[?.]] بيرجع undefined لو phone مش موجود، و [[??]] بيحط البديل.`,
            R`نوعها [[string | undefined]].`
          ],
          sol: R`[[const copy = { ...p, id: "x" }]] مفيهوش أي خطأ: [[readonly]] بتمنع تغيير الخاصية على نفس الـ object، إنما انت هنا بتعمل object جديد خالص.

وبعد ما تغيّر [[phone?: string]] لـ [[phone: string | undefined]]: [[const p]] بيطلّع Property 'phone' is missing in type '{ id: string; name: string; }' but required in type 'Profile'. الفرق: [[?]] معناها الخاصية ممكن متكونش موجودة أصلًا، و [[string | undefined]] معناها لازم تكتبها حتى لو قيمتها undefined، يعني [[{ id: "u1", name: "Sara", phone: undefined }]].`
        },
        {
          cmd: "type و interface",
          title: "طريقتين تسمّي بيهم شكل object، وتختار أنهي",
          desc: R`[[interface User { ... }]] و [[type User = { ... }]] الاتنين بيسمّوا شكل object، وفي أغلب الحالات زي بعض. الفرق: [[type]] ينفع لأي نوع (union و tuple ودالة و primitive)، و [[interface]] للـ objects بس، بس ممكن يتفتح ويتضاف عليه (declaration merging).

القاعدة العملية: اختار واحد للـ objects وامشي عليه في المشروع. ناس كتير بتستخدم [[type]] لكل حاجة، و [[interface]] لما محتاجين [[extends]] أو يضيفوا على نوع مكتبة.`,
          example: R`interface User {
  id: string;
  name: string;
}
interface Admin extends User {
  permissions: string[];
}
type Status = "active" | "banned";
type Customer = User & { status: Status };
interface User {
  avatarUrl?: string;
}
const a: Admin = { id: "1", name: "Sara", permissions: ["all"] };`,
          try: R`اعمل [[type User]] مرتين بنفس الاسم وشوف الخطأ (Duplicate identifier). وبعدين اعمل [[interface Bad extends User { name: number }]] وقارن رسالة الخطأ بـ [[type Bad2 = User & { name: number }]]، اللي مش هيطلّع خطأ غير لما تحاول تعمل قيمة منه.`,
          flag: "script",
          deep: {
            why: "هتلاقي الاتنين في كل مشروع وكل مكتبة، وهيتسألوا في أي انترفيو. الأهم تعرف إمتى الفرق بيبان فعلًا، مش تحفظ قايمة.",
            how: R`[[interface]] نوع object باسم، و [[extends]] بيورث منه. لو خاصية في الابن متعارضة مع الأب، TS بيطلّع خطأ واضح عند التعريف.

[[type]] اسم لأي نوع (type alias): union، و tuple، ودالة، و mapped و conditional types. و [[&]] (intersection) بتدمج الأشكال، بس لو فيه تعارض مبيطلعش خطأ عند التعريف: الخاصية بتبقى [[never]]، والخطأ بيطلع بعدين في مكان غريب.

declaration merging: لو عرّفت نفس الـ interface مرتين، TS بيدمجهم. ده سبب إن مكتبات كتير بتستخدم interface، لأنه بيخليك تضيف على أنواعهم من برّه، زي إضافة [[user]] على [[Request]] بتاع Express أو خاصية على [[Window]] (درس [[declare global]] في المستوى ٣). ونفس الميزة ممكن تبقى عيب: لو اسمك اتصادف مع interface موجود، الاتنين يتدمجوا من غير ما تاخد بالك.

الأداء: في المشاريع الكبيرة جدًا، [[extends]] على interfaces أسرع في الفحص من [[&]] كتير متداخل. في مشروع عادي مش هتحس بفرق.`,
            when: "[[type]] للـ unions والأنواع المشتقة ([[Pick]] و [[Omit]]) وأنواع الدوال. و [[interface]] لأشكال الـ objects و props الكومبوننتات لو الفريق متفق، ولازم لما تضيف على نوع مكتبة.",
            mistakes: R`تفتكر إن واحد فيهم «أحسن» دايمًا وتقعد تحوّل المشروع كله. وتستخدم [[&]] لتغيير نوع خاصية فتطلع [[never]] من غير أي خطأ. وفي الانترفيو: «interface للكلاسات بس» غلط، و «type مينفعش يتوسّع» غلط (بيتوسّع بـ [[&]]).`
          },
          teach: R`## المثال بيعمل إيه؟

بيبني ٤ أنواع: [[User]] و [[Admin]] بـ [[interface]]، و [[Status]] و [[Customer]] بـ [[type]]، وبعدين بيفتح [[User]] تاني ويزوّد عليه. المثال كله بيعدّي من غير أخطاء، فهنجرّب قيم غلط عشان نشوف كل نوع بيطلب إيه. اتفحص بـ TypeScript 6.0.3 و 7.0.2.

---

## ١. [[interface]]

~~~text app.ts
interface User {
  id: string;
  name: string;
}
~~~

[[interface]] كلمة بتعرّف شكل object باسم. الفرق في الكتابة عن [[type]]: مفيش [[=]]، والأقواس على طول بعد الاسم.

---

## ٢. [[extends]]: نوع مبني على نوع

~~~text app.ts
interface Admin extends User {
  permissions: string[];
}
~~~

[[extends User]] معناها «Admin فيه كل اللي في User، وزيادة عليه». فـ Admin = [[id]] و [[name]] و [[permissions]].

---

## ٣. [[type]] لحاجات الـ interface مبيعرفهاش

~~~text app.ts
type Status = "active" | "banned";
type Customer = User & { status: Status };
~~~

- [[Status]] union: يا [["active"]] يا [["banned"]]. ده مش object، فمينفعش يتكتب [[interface]]. ده أول فرق حقيقي: [[type]] ينفع لأي نوع.
- [[&]] اسمها intersection: «النوع ده **و** النوع ده مع بعض». فـ Customer = كل خصايص User + [[status]]. نفس فكرة [[extends]] بشكل [[type]].

جرّبنا قيمة غلط:

~~~text app.ts
const c: Customer = { id: "3", name: "Mona", status: "deleted" };
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(15,46): error TS2322: Type '"deleted"' is not assignable to type 'Status'.
~~~

---

## ٤. declaration merging: نفس الاسم تاني

~~~text app.ts
interface User {
  avatarUrl?: string;
}
~~~

ده مش خطأ «الاسم متكرر». TS بيدمج الاتنين في interface واحد، فـ User بقى [[id]] و [[name]] و [[avatarUrl]] الاختيارية، **في كل مكان**، حتى في [[Admin]] و [[Customer]] اللي اتعرّفوا قبل السطر ده.

الإثبات: لو حطيت [[avatarUrl]] رقم في Admin:

~~~text app.ts
const a2: Admin = { id: "2", name: "Omar", permissions: [], avatarUrl: 5 };
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(14,61): error TS2322: Type 'number' is not assignable to type 'string'.
~~~

يعني [[Admin]] عارف [[avatarUrl]] ونوعها string، مع إنها اتضافت على User بعد ما Admin اتعرّف.

ومع [[type]] الحكاية دي ممنوعة: [[type User]] مرتين بيطلّع [[Duplicate identifier 'User']] (TS2300).

---

## ٥. آخر سطر

~~~text app.ts
const a: Admin = { id: "1", name: "Sara", permissions: ["all"] };
~~~

مقبول: الإجباري كله موجود، و [[avatarUrl]] اختيارية.

---

## ٦. كل ده بيروح فين؟

ده الـ JS اللي [[tsc]] طلّعه من المثال كله:

~~~text app.js (من tsc)
"use strict";
const a = { id: "1", name: "Sara", permissions: ["all"] };
~~~

١٢ سطر أنواع اختفوا، وفضل سطر واحد. [[interface]] و [[type]] الاتنين مش موجودين وقت التشغيل.

---

## الخلاصة

| | [[interface]] | [[type]] |
|---|---|---|
| شكل object | أيوة | أيوة |
| union و tuple و دالة و literal | لأ | أيوة |
| تبني على نوع | [[extends]] | [[&]] |
| نفس الاسم مرتين | بيتدمجوا | TS2300 |

اختار واحد للـ objects في المشروع، و [[type]] لأي حاجة مش object.`,
          lines: [
            "interface بيوصف object.",
            "خاصية.",
            "خاصية.",
            "قفلة.",
            R`[[extends]]: Admin فيه كل حاجة في User وزيادة.`,
            "الزيادة.",
            "قفلة.",
            "union: ده مينفعش يتعمل بـ interface، type بس.",
            R`[[&]] (intersection): نفس فكرة extends بس بـ type.`,
            "نفس الاسم تاني: TS بيدمج الاتنين في interface واحد (declaration merging).",
            "بقت جزء من User في كل مكان.",
            "قفلة.",
            "Admin دلوقتي فيه id و name و permissions، و avatarUrl الاختيارية."
          ],
          sol: R`[[type User]] مرتين بيطلّع [[Duplicate identifier 'User']] (TS2300) على الاتنين، لأن type مش بيتدمج زي interface.

و [[interface Bad extends User { name: number }]] بيطلّع خطأ فورًا على [[Bad]]: Interface 'Bad' incorrectly extends interface 'User'. Types of property 'name' are incompatible (TS2430). أما [[type Bad2 = User & { name: number }]] بيعدّي، و [[name]] فيه بقى [[string & number]] يعني [[never]]. أول ما تكتب [[const x: Bad2 = { id: "1", name: 5 }]] تاخد Type 'number' is not assignable to type 'never'، ورسالة زي دي صعب تفهم منها السبب. عشان كده extends أوضح لما بتبني نوع على نوع.`
        }
      ]
    }
]);

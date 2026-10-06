// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "Zod: فحص وقت التشغيل",
      l: 3,
      n: "الأنواع بتتمسح، فالداتا اللي جاية من برّه محتاجة فحص حقيقي. Zod بيعمل الفحص ويطلّع النوع من نفس المكان",
      items: [
        {
          cmd: "z.object و z.infer",
          title: "schema واحدة تطلّع منها الفحص والنوع مع بعض",
          desc: R`Zod مكتبة بتوصف فيها شكل الداتا كـ schema، وتفحص بيها أي قيمة وقت التشغيل. و [[z.infer<typeof Schema>]] بيطلّع نوع TS من نفس الـ schema، فمش محتاج تكتب النوع مرتين.

ده الحل للمشكلة اللي في أول التاب: الأنواع بتتمسح، والداتا اللي جاية من برّه (API و forms و env) محتاجة فحص حقيقي. النسخة الحالية Zod 4: [[npm i zod]].`,
          example: R`import * as z from "zod";
const UserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user"]).default("user"),
  tags: z.array(z.string()).max(5),
});
type User = z.infer<typeof UserSchema>;
const user = UserSchema.parse({ name: "Sara", email: "you@example.com", tags: [] });
console.log(user.role); // "user"
UserSchema.parse({ name: "S", email: "bad", tags: [] }); // بيرمي ZodError`,
          try: R`شغّل المثال بـ tsx، وحط آخر سطر جوه try/catch واطبع [[e.issues]]. وبعدين ضيف [[phone: z.string().optional()]] للـ schema وحط الماوس على [[User]]: النوع اتحدّث لوحده.`,
          flag: "script",
          deep: {
            why: R`من غير Zod عندك حاجتين منفصلين: [[type User = {...}]] للـ compiler، وفحص بإيدك ([[if (typeof body.email !== "string")]]) لوقت التشغيل. الاتنين بيبعدوا عن بعض مع الوقت: تضيف حقل في النوع وتنسى الفحص. Zod بيخلي الـ schema مصدر الحقيقة الوحيد.`,
            how: R`الـ schema object عادي في JS، موجود وقت التشغيل، وجواه قواعد الفحص. و [[parse(value)]] بتمشي على القيمة وتفحص كل حاجة، وترجع نسخة جديدة (مش نفس الـ object) فيها الـ defaults والتحويلات، ومن غير المفاتيح اللي مش معرّفة في الـ schema (بتتشال افتراضيًا).

[[z.infer]] شغل TS بس: بيقرا نوع الـ schema ويحوّله لنوع الداتا. ولو فيه [[.transform()]] بيغيّر النوع، [[z.input]] نوع اللي داخل و [[z.output]] (زي infer) نوع اللي خارج.

في Zod 4: الـ string formats بقت top-level ([[z.email()]] و [[z.url()]] و [[z.uuid()]])، والقديمة [[z.string().email()]] لسه شغالة بس deprecated. ورسالة الخطأ المخصصة بقت [[{ error: "..." }]] بدل [[message]]. و [[z.strictObject]] بيرفض المفاتيح الزيادة بدل ما يشيلها، و [[z.looseObject]] بيسيبها.

و Zod بيشتغل في المتصفح والسيرفر، فنفس الـ schema ينفع للـ form في React وللـ API في Express. حط الـ schemas في مكان مشترك (زي [[packages/shared]] في monorepo أو [[lib/validations]]).`,
            when: "أي داتا جاية من برّه كودك: body و query بتوع request، ورد API خارجي، و env، و localStorage، و forms، ورسايل WebSocket، وناتج AI بـ JSON.",
            mistakes: R`تكتب النوع بإيدك وجنبه schema بتوصف نفس الحاجة: خليها schema و [[z.infer]]. وتستخدم أمثلة Zod 3 ([[z.string().email()]] و [[error.errors]] و [[.flatten()]]) في مشروع Zod 4: شغالة بتحذير، أو اتشالت. وفي مشروع حقيقي كان الكود بيقرا [[(error as any).issues ?? (error as any).errors]] عشان يدعم النسختين: في Zod 4 [[error.issues]] بس، وبنوعها الصح من غير any.`
          },
          teach: R`## الفكرة في سطرين

الـ schema **قيمة** JS حقيقية موجودة وقت التشغيل وجواها قواعد الفحص. ومن نفس القيمة دي TS بيطلّع نوع. يعني بتكتب الشكل مرة واحدة، وتاخد منه فحص وقت التشغيل ونوع وقت الكتابة.

اتجرّب على ويندوز 11 بـ Node 24 و Zod 4.6.5، التشغيل بـ [[npx tsx app.ts]] والأنواع من TypeScript 6.0.3 و 7.0.2.

---

## ١. الـ import

~~~text app.ts
import * as z from "zod";
~~~

- [[import * as z]]: هات كل حاجة بتصدّرها المكتبة جوه object واحد اسمه [[z]]. فكل حاجة بعد كده [[z.something]].
- [["zod"]]: اسم الباكدج ([[npm i zod]]).

---

## ٢. الـ schema

~~~text app.ts
const UserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user"]).default("user"),
  tags: z.array(z.string()).max(5),
});
~~~

[[z.object({...})]]: schema لـ object، وكل مفتاح جواها schema لحقل. كل سطر سلسلة: أول دالة النوع، والباقي قواعد فوقه (كل واحدة بترجع schema جديدة، فتقدر تكمّل بنقطة).

| الحقل | النوع | القواعد |
|---|---|---|
| [[name]] | [[z.string()]] | [[.min(2)]]: حرفين على الأقل |
| [[email]] | [[z.email()]] | string شكله إيميل. في Zod 4 بقت دالة لوحدها |
| [[age]] | [[z.number()]] | [[.int()]] صحيح، [[.positive()]] أكبر من صفر، [[.optional()]] ممكن ميتبعتش |
| [[role]] | [[z.enum([...])]] | واحدة من القيمتين، و [[.default("user")]] لو مش موجودة |
| [[tags]] | [[z.array(z.string())]] | ليستة strings، و [[.max(5)]] خمسة بالكتير |

---

## ٣. النوع من الـ schema

~~~text app.ts
type User = z.infer<typeof UserSchema>;
~~~

اقراها من جوه لبرّه:

1. [[typeof UserSchema]]: [[typeof]] هنا مش بتاعة JS، دي بتاعة TS في مكان نوع: «هات نوع المتغير ده». ونوعه نوع schema معقد.
2. [[z.infer<...>]]: نوع generic من Zod بياخد نوع الـ schema ويطلّع شكل الداتا اللي بتعدّي منها.

عشان نشوف النوع الناتج، حطيناه في متغير [[boolean]] بالعمد و TS كتبه في الخطأ:

~~~text الناتج (TS 6.0.3)
Type '{ name: string; email: string; role: "admin" | "user"; tags: string[]; age?: number | undefined; }' is not assignable to type 'boolean'.
~~~

- [[role]] بقت [["admin" | "user"]]، مش string.
- [[age?]]: علامة [[?]] جت من [[.optional()]].
- [[role]] **مش** اختيارية في النوع، لأن [[.default]] بيضمن إنها موجودة بعد الفحص.

(TS 7.0.2 كتب نفس النوع بالظبط بس [[age]] في مكانها الأصلي بعد [[email]]. الترتيب في الرسالة بس.)

---

## ٤. [[parse]] على داتا سليمة

~~~text app.ts
const user = UserSchema.parse({ name: "Sara", email: "you@example.com", tags: [] });
console.log(user.role);
~~~

[[parse(value)]] بتفحص القيمة بكل القواعد. لو سليمة بترجع **نسخة جديدة** منها، ونوعها [[User]].

~~~text الناتج: npx tsx app.ts
user
~~~

مبعتناش [[role]]، و [[.default("user")]] حطها. ولو طبعت [[user]] كله:

~~~text الناتج
{ name: 'Sara', email: 'you@example.com', role: 'user', tags: [] }
~~~

وجرّبنا نبعت مفتاح مش في الـ schema ([[admin: true]]): رجع من غير [[admin]] خالص. [[z.object]] بيشيل المفاتيح الزيادة افتراضيًا.

---

## ٥. [[parse]] على داتا غلط

~~~text app.ts
UserSchema.parse({ name: "S", email: "bad", tags: [] });
~~~

الاسم حرف واحد والإيميل غلط، فـ [[parse]] بترمي [[ZodError]]. لو محدش مسكه البرنامج بيقع:

~~~text الناتج (جزء منه)
ZodError: [
  {
    "origin": "string",
    "code": "too_small",
    "minimum": 2,
...
~~~

---

## ٦. الـ solCode: تمسك الخطأ وتقرا [[issues]]

~~~text sol.ts
try {
  UserSchema.parse({ name: "S", email: "bad", tags: [] });
} catch (e) {
  if (e instanceof z.ZodError) console.log(e.issues);
}
~~~

- [[catch (e)]]: مع [[strict]]، [[e]] نوعها [[unknown]] (أي حاجة ممكن تترمي). جرّبنا [[e.issues]] من غير فحص:

~~~text الناتج: npx tsc
error TS18046: 'e' is of type 'unknown'.
~~~

- [[e instanceof z.ZodError]]: فحص حقيقي وقت التشغيل: «الـ object ده اتعمل من كلاس ZodError؟». بعده TS عارف النوع، و [[e.issues]] متاحة.

~~~text الناتج: npx tsx sol.ts
[
  {
    origin: 'string',
    code: 'too_small',
    minimum: 2,
    inclusive: true,
    path: [ 'name' ],
    message: 'Too small: expected string to have >=2 characters'
  },
  {
    origin: 'string',
    code: 'invalid_format',
    format: 'email',
    path: [ 'email' ],
    message: 'Invalid email address'
  }
]
~~~

(Zod كمان بيطبع [[pattern]] بالـ regex بتاع الإيميل جوه التاني، شلناه هنا عشان طويل.)

كل issue فيها:

| الخاصية | معناها |
|---|---|
| [[code]] | نوع المشكلة: [[too_small]] أو [[invalid_format]] أو [[invalid_type]] |
| [[path]] | مكان الحقل. ليستة عشان الـ objects المتداخلة: [[['address', 'city']]] |
| [[message]] | رسالة مقروءة |
| [[minimum]] و [[format]] | تفاصيل حسب نوع المشكلة |

لاحظ إن Zod مبيوقفش عند أول غلطة: الاتنين اتجمعوا في نفس الخطأ.

و [[phone: z.string().optional()]] اللي في الـ solCode ظهرت في النوع لوحدها: [[phone?: string | undefined]]، من غير ما نلمس أي [[type]].

---

## الخلاصة

- الـ schema قيمة وقت التشغيل، و [[z.infer<typeof Schema>]] نوع وقت الكتابة، والاتنين من نفس المكان.
- [[parse]] بترجع نسخة نضيفة (بالـ defaults ومن غير مفاتيح زيادة) أو بترمي [[ZodError]] فيه كل المشاكل.
- في [[catch]] افحص بـ [[instanceof z.ZodError]] قبل ما تقرا [[issues]].`,
          lines: [
            "Zod 4. الـ docs بتنصح بالشكل ده للـ import.",
            "schema لـ object.",
            "string على الأقل حرفين.",
            R`إيميل. في Zod 4 الـ formats بقت دوال لوحدها ([[z.email()]] بدل [[z.string().email()]]).`,
            "رقم صحيح موجب، واختياري.",
            R`واحد من الاتنين، ولو مش موجود يبقى [["user"]].`,
            "ليستة strings، بحد أقصى ٥.",
            "قفلة.",
            "النوع طالع من الـ schema: عدّل الـ schema والنوع يتعدّل.",
            R`[[parse]]: لو الداتا سليمة بترجعها بالنوع الصح وبالـ defaults.`,
            R`[[role]] موجودة مع إننا مبعتناهاش.`,
            R`داتا غلط: [[parse]] بترمي ZodError فيه كل المشاكل (name قصير و email غلط).`
          ],
          sol: R`الناتج الأول [[user]]: الـ default اشتغل. وبعدين [[e.issues]] فيها عنصرين: واحد [[code: 'too_small']] و [[path: [ 'name' ]]] ورسالته Too small: expected string to have >=2 characters، والتاني [[code: 'invalid_format']] و [[format: 'email']] و [[path: [ 'email' ]]] ورسالته Invalid email address.

في الـ catch، [[e]] نوعها unknown، فـ [[e.issues]] مباشرة بتطلّع 'e' is of type 'unknown'. افحص بـ [[e instanceof z.ZodError]] الأول. وبعد ما تضيف [[phone]] هتلاقي [[phone?: string | undefined]] في [[User]] لوحدها.`,
          solCode: R`import * as z from "zod";
const UserSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  tags: z.array(z.string()).max(5),
  phone: z.string().optional(),
});
try {
  UserSchema.parse({ name: "S", email: "bad", tags: [] });
} catch (e) {
  if (e instanceof z.ZodError) console.log(e.issues);
}`
        },
        {
          cmd: "safeParse",
          title: "تتحقق من الداتا من غير ما يترمي exception، وتطلّع الأخطاء لكل حقل",
          desc: R`[[schema.safeParse(value)]] مبترميش. بترجع object: يا [[{ success: true, data }]] يا [[{ success: false, error }]]، وده discriminated union، فبعد [[if (!result.success)]] TS عارف إن [[data]] موجودة.

و [[z.flattenError(result.error)]] بيحوّل الأخطاء لـ [[fieldErrors]]: لكل حقل ليستة رسايل، جاهزة ترجعها للـ form أو في رد 400.`,
          example: R`import * as z from "zod";
const Signup = z.object({
  email: z.email({ error: "إيميل مش صحيح" }),
  password: z.string().min(8, { error: "٨ حروف على الأقل" }),
});
function validate(input: unknown) {
  const result = Signup.safeParse(input);
  if (!result.success) {
    return { ok: false as const, errors: z.flattenError(result.error).fieldErrors };
  }
  return { ok: true as const, data: result.data };
}
console.log(validate({ email: "x", password: "123" }));
// { ok: false, errors: { email: ["إيميل مش صحيح"], password: ["٨ حروف على الأقل"] } }`,
          try: R`بدّل [[z.flattenError(result.error).fieldErrors]] بـ [[z.treeifyError(result.error)]] وبعدين بـ [[z.prettifyError(result.error)]] (من غير [[.fieldErrors]]) واطبع الناتج في كل مرة. الأولى للـ forms البسيطة، والتانية للـ objects المتداخلة، والتالتة للّوجات.`,
          flag: "script",
          deep: {
            why: "[[parse]] بترمي، وده مناسب لما الداتا الغلط «مستحيلة» (زي env). بس في request من مستخدم، الداتا الغلط حاجة عادية ومتوقعة، والـ try/catch حوالين كل validation بيبقى تقيل. [[safeParse]] بيخلي الفشل قيمة عادية تتعامل معاها بـ if.",
            how: R`[[safeParse]] بترجع discriminated union على [[success]] (زي درس discriminated unions بالظبط): [[{ success: true; data: T }]] أو [[{ success: false; error: ZodError }]].

والـ ZodError فيه [[issues]]: ليستة، كل واحدة فيها [[path]] (زي [[["address", "city"]]]) و [[message]] و [[code]]. وفيه ٣ helpers جاهزين في Zod 4: [[z.flattenError]] (مستوى واحد: [[formErrors]] و [[fieldErrors]])، و [[z.treeifyError]] (شجرة بنفس شكل الـ schema للـ objects المتداخلة)، و [[z.prettifyError]] (نص مقروء للّوج). و [[.flatten()]] و [[.format()]] القديمة deprecated.

ولو فيه refine أو transform async (مثلًا تفحص إن الإيميل مش مستخدم في القاعدة)، استخدم [[safeParseAsync]].

ومهم: رسايل الأخطاء بترجع للمستخدم، فمترجعش [[issues]] كاملة لو فيها تفاصيل داخلية، ومترجعش القيمة اللي اتبعتت (ممكن تبقى باسورد).`,
            when: "request body و query و forms: [[safeParse]]. وإعدادات وقت التشغيل (env) أو داتا «لازم» تكون سليمة وإلا يبقى فيه bug: [[parse]].",
            mistakes: R`تكتب [[result.data]] قبل ما تفحص [[success]]: TS هيمنعك، ودي الميزة. وترجع [[error]] كله للـ client. وتعمل [[parse]] جوه route من غير try/catch، فأي request غلط يطلّع 500 بدل 400.`
          },
          teach: R`## الفكرة في سطرين

[[safeParse]] بيعمل نفس فحص [[parse]]، بس بدل ما يرمي exception بيرجّع النتيجة كقيمة عادية تفحصها بـ [[if]]. والمثال دالة [[validate]] بترجّع يا أخطاء لكل حقل يا الداتا المفحوصة.

اتجرّب على ويندوز 11 بـ Node 24 و Zod 4.6.5، التشغيل بـ [[npx tsx]] والأنواع من TypeScript 6.0.3 و 7.0.2.

---

## ١. الـ schema برسايل مخصصة

~~~text app.ts
const Signup = z.object({
  email: z.email({ error: "إيميل مش صحيح" }),
  password: z.string().min(8, { error: "٨ حروف على الأقل" }),
});
~~~

- [[z.email({ error: "..." })]]: آخر argument في أغلب دوال Zod object إعدادات، و [[error]] فيه الرسالة اللي هتظهر بدل الإنجليزي.
- [[.min(8, { error: "..." })]]: نفس الفكرة. الأول الرقم، وبعده الإعدادات.
- في Zod 3 كان اسمها [[message]]، وفي Zod 4 [[error]].

---

## ٢. الدالة بتاخد [[unknown]]

~~~text app.ts
function validate(input: unknown) {
  const result = Signup.safeParse(input);
~~~

- [[input: unknown]]: الداتا جاية من برّه، فمنعرفش شكلها. [[unknown]] معناها «افحص قبل ما تستخدم»، وده بالظبط اللي هيحصل.
- [[Signup.safeParse(input)]]: بترجّع object، ومبترميش أبدًا. طبعنا ناتجها على [[{}]]:

~~~text الناتج: console.log(Signup.safeParse({}))
{ success: false, error: [Getter/Setter] }
~~~

[[success]] هي اللي بتفرّق. و [[error]] بيظهر [[[Getter/Setter]]] لأن Zod بيحسبه لما تطلبه بس.

---

## ٣. فرع الفشل

~~~text app.ts
  if (!result.success) {
    return { ok: false as const, errors: z.flattenError(result.error).fieldErrors };
  }
~~~

من جوه لبرّه:

1. [[!result.success]]: [[!]] = «مش». يعني لو الفحص فشل. وهنا TS ضيّق النوع: [[result]] في الفرع ده فيها [[error]] أكيد.
2. [[result.error]]: الـ [[ZodError]] بكل الـ issues.
3. [[z.flattenError(...)]]: بيحوّل الـ issues لـ object مسطّح فيه [[formErrors]] (أخطاء مش على حقل معيّن) و [[fieldErrors]].
4. [[.fieldErrors]]: object، المفتاح اسم الحقل والقيمة ليستة رسايل.
5. [[false as const]]: من غير [[as const]]، TS بيستنتج [[ok]] نوعها [[boolean]]. معاها النوع [[false]] بالظبط، وده اللي بيخلي اللي بينادي الدالة يقدر يضيّق بـ [[if (v.ok)]].

جرّبنا نشيل [[as const]] من الاتنين ونكتب [[if (v.ok) v.data.email]]:

~~~text الناتج: npx tsc
error TS18048: 'v.data' is possibly 'undefined'.
~~~

[[ok]] بقت [[boolean]] في الحالتين، فـ TS مقدرش يعرف إن [[ok: true]] معناها إن [[data]] موجودة.

---

## ٤. فرع النجاح

~~~text app.ts
  return { ok: true as const, data: result.data };
}
~~~

هنا [[result.success]] أكيد [[true]]، فـ [[result.data]] نوعها [[{ email: string; password: string }]]. ونوع الدالة كلها (TS كتبه لما حطيناها في متغير [[boolean]]):

~~~text الناتج (TS 6.0.3)
(input: unknown) => { ok: false; errors: { email?: string[] | undefined; password?: string[] | undefined; }; data?: undefined; } | { ok: true; data: { email: string; password: string; }; errors?: undefined; }
~~~

union من شكلين، والفرق بينهم [[ok]]: ده discriminated union. (TS 7.0.2 كتب نفس النوع بس [[errors?: undefined]] في أول الشكل التاني.)

---

## ٥. التشغيل

~~~text app.ts
console.log(validate({ email: "x", password: "123" }));
~~~

~~~text الناتج: npx tsx app.ts
{
  ok: false,
  errors: { email: [ 'إيميل مش صحيح' ], password: [ '٨ حروف على الأقل' ] }
}
~~~

الحقلين غلط، والاتنين ظهروا مرة واحدة بالرسايل بتاعتنا. وبداتا سليمة:

~~~text الناتج: validate({ email: "a@b.co", password: "12345678" })
{ ok: true, data: { email: 'a@b.co', password: '12345678' } }
~~~

---

## ٦. لو نسيت تفحص [[success]]

~~~text app.ts
const res = Signup.safeParse({});
res.data.email;
~~~

~~~text الناتج: npx tsc (TS 6 و 7)
error TS18048: 'res.data' is possibly 'undefined'.
~~~

وده صح فعلًا: لو شغّلته من غير فحص:

~~~text الناتج: npx tsx
TypeError: Cannot read properties of undefined (reading 'email')
~~~

---

## ٧. التلات helpers

| الدالة | الناتج على نفس الداتا الغلط | لإيه |
|---|---|---|
| [[z.flattenError(e).fieldErrors]] | [[{ email: [...], password: [...] }]] | forms بسيطة ورد 400 |
| [[z.treeifyError(e)]] | [[{ errors: [], properties: { email: { errors: [...] }, ... } }]] | objects متداخلة |
| [[z.prettifyError(e)]] | نص مقروء | اللوجات |

وناتج [[prettifyError]] الحقيقي:

~~~text الناتج
✖ إيميل مش صحيح
  → at email
✖ ٨ حروف على الأقل
  → at password
~~~

---

## الخلاصة

- [[safeParse]] مبترميش: بترجّع [[{ success: true, data }]] أو [[{ success: false, error }]].
- افحص [[success]] الأول، و TS هيمنعك تقرا [[data]] قبلها.
- [[as const]] على [[ok]] بيخلي نتيجة دالتك discriminated union، فاللي بينادي يقدر يضيّق.
- [[parse]] للداتا اللي «لازم» تبقى سليمة، و [[safeParse]] لداتا المستخدم.`,
          lines: [
            "Zod 4.",
            "schema للتسجيل.",
            R`رسالة مخصصة بـ [[error]] (في Zod 3 كانت [[message]]).`,
            "نفس الفكرة مع الحد الأدنى.",
            "قفلة.",
            R`الداتا جاية [[unknown]]، وده الصح.`,
            "فحص من غير throw.",
            "فشل؟",
            R`رسايل لكل حقل. و [[as const]] بيخلي ok نوعها literal، عشان اللي بينادي يقدر يضيّق.`,
            "قفلة.",
            R`نجاح: [[result.data]] نوعها [[{ email: string; password: string }]].`,
            "قفلة.",
            "الناتج: رسالة لكل حقل غلط."
          ],
          sol: R`[[flattenError(...).fieldErrors]]: [[{ email: [ 'إيميل مش صحيح' ], password: [ '٨ حروف على الأقل' ] }]]، object مسطّح والمفتاح اسم الحقل.

[[treeifyError]]: [[{ errors: [], properties: { email: { errors: ['إيميل مش صحيح'] }, password: { errors: ['٨ حروف على الأقل'] } } }]]، شجرة بنفس شكل الداتا. [[console.log]] هيعرضها [[[Object]]] لو متداخلة، فاطبعها بـ [[JSON.stringify(x, null, 2)]].

[[prettifyError]]: string جاهز للّوج، كل خطأ في سطر بعلامة ✖ وتحته [[→ at email]] و [[→ at password]]. ولو لقيت الرسايل بالإنجليزي (Invalid email address)، يبقى [[{ error: "..." }]] مش متحطة أو مكتوبة [[message]] بالطريقة القديمة.`
        },
        {
          cmd: "env بـ Zod",
          title: "التطبيق يرفض يقوم لو متغير بيئة ناقص أو غلط",
          desc: R`بدل [[process.env.X!]] في كل ملف، اعمل ملف [[env.ts]] واحد: schema لكل المتغيرات، وفحص [[process.env]] مرة واحدة أول ما التطبيق يقوم، وصدّر الناتج. لو حاجة ناقصة، التطبيق يقع فورًا برسالة واضحة، مش بعد ساعة في أول request.

والناتج typed: [[env.PORT]] رقم مش string، و [[env.NODE_ENV]] واحدة من ٣ قيم.`,
          example: R`import * as z from "zod";
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  SENTRY_DSN: z.url().optional(),
});
const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("متغيرات البيئة غلط:\n" + z.prettifyError(parsed.error));
  process.exit(1);
}
export const env = parsed.data;`,
          try: R`امسح [[JWT_SECRET]] من .env وشغّل التطبيق: المفروض يقع فورًا برسالة فيها اسم المتغير. وبعدين حط [[PORT=abc]] وشوف الرسالة.`,
          flag: "script",
          deep: {
            why: "[[process.env.X]] نوعها [[string | undefined]] دايمًا، فالحل السريع [[!]] أو [[as string]]، والمتغير الناقص بيعدّي لحد ما حد يستخدمه. على السيرفر ده معناه ديبلوي «نجح» والتطبيق شغال، وأول دفع أو أول login يقع.",
            how: R`[[process.env]] object كل قيمه strings أو undefined. الـ schema بتحوّله لـ object مفحوص: [[z.coerce.number()]] بيعمل [[Number(value)]] وبعدين يفحص إنه رقم، و [[default]] بيملى الناقص، و [[optional]] بيسيبه undefined.

والفحص بيحصل أول ما الملف يتعمله import. عشان كده [[env.ts]] لازم يتعمله import بدري (في [[server.ts]] أو [[index.ts]])، مش جوه دالة بتتنادي بعدين.

وفي مشروع حقيقي كان فيه [[env.ts]] بـ Zod، بس لما الفحص يفشل كان بيعمل [[console.error]] وبس، ويكمّل. وفي نفس المشروع ملفات تانية بتستخدم [[process.env.KEY!]] مباشرة بدل الـ env المفحوص. النتيجة: الفحص موجود بس مش بيحمي. الحل: [[process.exit(1)]] أو throw، واستخدم الـ env المصدّر بس.

و Next.js فيه تفصيلة: متغيرات [[NEXT_PUBLIC_*]] بتتحط في كود المتصفح وقت الـ build، ولازم تتكتب بالاسم الكامل ([[process.env.NEXT_PUBLIC_URL]]) عشان Next يلاقيها، فاعمل schema للسيرفر و schema للـ client (التفاصيل في تاب «Next.js»).

وخلي بالك: [[z.coerce.boolean()]] بتحوّل أي string مش فاضي لـ true، يعني [["false"]] تبقى true. للـ booleans في env استخدم [[z.stringbool()]] في Zod 4.`,
            when: "كل مشروع Node أو Next أو Express من أول يوم. ونفس الفكرة في Python بـ pydantic-settings (تاب «Python و FastAPI»).",
            mistakes: R`validation بتطبع الخطأ وتكمّل. و [[z.coerce.boolean()]] لقيمة [["false"]]. و [[z.string()]] للـ PORT فيفضل string. وتحط قيم secrets حقيقية كـ [[default]] في الكود.`
          },
          teach: R`## الفكرة في سطرين

[[process.env]] object كل قيمه strings أو [[undefined]]. المثال ملف [[env.ts]] بيفحصه مرة واحدة أول ما التطبيق يقوم: لو حاجة ناقصة أو غلط يقفل فورًا، ولو سليم يصدّر object مفحوص بأنواع حقيقية (رقم مش string).

اتجرّب على ويندوز 11 بـ Node 24 و Zod 4.6.5: الملف [[env.ts]] زي المثال، وملف [[main.ts]] فيه [[import { env } from "./env.js"]] و [[console.log(env)]]، والتشغيل بـ [[npx tsx main.ts]] مع متغيرات بيئة مختلفة كل مرة. والأنواع من TypeScript 6.0.3 و 7.0.2.

---

## ١. المشكلة من غير Zod

~~~text b.ts
const port: number = process.env.PORT;
~~~

~~~text الناتج: npx tsc
error TS2322: Type 'string | undefined' is not assignable to type 'number'.
~~~

[[process.env.PORT]] نوعها [[string | undefined]] دايمًا: ممكن متكونش موجودة، ولو موجودة نص. فالناس بتكتب [[!]] أو [[as string]] وتمشي، والمتغير الناقص يعدّي.

---

## ٢. الـ schema سطر سطر

~~~text env.ts
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  SENTRY_DSN: z.url().optional(),
});
~~~

| المتغير | القاعدة | معناها |
|---|---|---|
| [[NODE_ENV]] | [[z.enum([...]).default("development")]] | واحدة من ٣ كلمات، ولو مش موجود development |
| [[PORT]] | [[z.coerce.number().int().default(3000)]] | حوّله رقم، ولازم صحيح، ولو مش موجود 3000 |
| [[DATABASE_URL]] | [[z.url()]] | لازم URL صحيح |
| [[JWT_SECRET]] | [[z.string().min(32)]] | ٣٢ حرف على الأقل، لأن secret قصير سهل يتخمّن |
| [[SENTRY_DSN]] | [[z.url().optional()]] | URL لو موجود، ومش لازم |

[[coerce]] معناها «إجبار»: [[z.coerce.number()]] بيعمل [[Number(value)]] الأول وبعدين يفحص. ده لازم هنا لأن كل حاجة في [[process.env]] نص: [["3000"]] مش [[3000]].

---

## ٣. الفحص

~~~text env.ts
const parsed = EnvSchema.safeParse(process.env);
~~~

بنفحص [[process.env]] كله. فيه متغيرات كتير تانية (PATH وغيره)، والـ schema بتشيلها وبتسيب الخمسة بتوعنا بس.

---

## ٤. لو فيه مشكلة: اطبع واقفل

~~~text env.ts
if (!parsed.success) {
  console.error("متغيرات البيئة غلط:\n" + z.prettifyError(parsed.error));
  process.exit(1);
}
~~~

- [[console.error]]: زي [[console.log]] بس بيكتب على stderr (مخرج الأخطاء)، فاللوجات بتعرف إنه خطأ.
- [["\n"]]: سطر جديد.
- [[z.prettifyError]]: كل المشاكل في نص مقروء.
- [[process.exit(1)]]: اقفل البرنامج بـ exit code 1. أي رقم غير 0 معناه «فشل»، فالـ Docker أو الـ hosting هيعرف إن التطبيق مقامش. **ده أهم سطر**: من غيره التطبيق بيكمّل بإعدادات بايظة.

---

## ٥. التصدير

~~~text env.ts
export const env = parsed.data;
~~~

بعد الـ [[if]] اللي فيها [[process.exit]]، TS عارف إن [[parsed.success]] أكيد [[true]] هنا، فـ [[parsed.data]] موجودة. ونوعها (TS كتبه لما حطيناها في متغير [[boolean]]):

~~~text الناتج (TS 6.0.3)
{ NODE_ENV: "development" | "test" | "production"; PORT: number; DATABASE_URL: string; JWT_SECRET: string; SENTRY_DSN?: string | undefined; }
~~~

[[PORT]] بقت [[number]]، و [[NODE_ENV]] ٣ قيم بس. (TS 7.0.2 كتب الـ union [["development" | "production" | "test"]]، ترتيب العرض بس.)

---

## ٦. التشغيل بالحالات المختلفة

**كل حاجة سليمة** ([[DATABASE_URL=postgres://localhost:5432/shop]] و [[JWT_SECRET]] من ٣٢ حرف):

~~~text الناتج: npx tsx main.ts
{
  NODE_ENV: 'development',
  PORT: 3000,
  DATABASE_URL: 'postgres://localhost:5432/shop',
  JWT_SECRET: '0123456789abcdef0123456789abcdef'
}
~~~

[[NODE_ENV]] و [[PORT]] جم من الـ defaults، و [[SENTRY_DSN]] مش موجودة خالص.

**من غير [[JWT_SECRET]]:**

~~~text الناتج (exit code 1)
متغيرات البيئة غلط:
✖ Invalid input: expected string, received undefined
  → at JWT_SECRET
~~~

**[[PORT=abc]]:**

~~~text الناتج (exit code 1)
متغيرات البيئة غلط:
✖ Invalid input: expected number, received NaN
  → at PORT
~~~

[[Number("abc")]] بيطلّع [[NaN]] (Not a Number)، و Zod رفضه.

**كذا غلطة مع بعض** ([[NODE_ENV=prod]] و [[DATABASE_URL=localhost]] و [[JWT_SECRET=short]]):

~~~text الناتج (exit code 1)
متغيرات البيئة غلط:
✖ Invalid option: expected one of "development"|"test"|"production"
  → at NODE_ENV
✖ Invalid URL
  → at DATABASE_URL
✖ Too small: expected string to have >=32 characters
  → at JWT_SECRET
~~~

الكل في رسالة واحدة، فبتصلّح مرة واحدة مش تلات مرات.

**الفخ: [[PORT=]] فاضية:**

~~~text الناتج
  PORT: 0,
~~~

[[Number("")]] بيطلّع [[0]]، فعدّت. لو يفرق معاك زوّد [[.positive()]].

---

## ٧. فخ الـ booleans

~~~text الناتج: z.coerce.boolean().parse("false"), z.stringbool().parse("false"), z.stringbool().parse("1")
true false true
~~~

[[z.coerce.boolean()]] بيعمل [[Boolean("false")]]، وأي نص مش فاضي [[true]]. أما [[z.stringbool()]] بيفهم [["false"]] و [["0"]] و [["no"]] صح.

---

## الخلاصة

- ملف [[env.ts]] واحد بيفحص [[process.env]] أول ما التطبيق يقوم، والباقي يستورد [[env]] منه.
- [[z.coerce.number()]] للأرقام، و [[z.stringbool()]] للـ booleans، و [[default]] للاختياري.
- لو الفحص فشل: [[process.exit(1)]]، مش [[console.error]] وبس.`,
          lines: [
            "Zod.",
            "schema لكل متغيرات البيئة في مكان واحد.",
            "قيم محددة، والافتراضي development.",
            R`[[process.env]] كله strings، و [[coerce]] بيحوّل [["3000"]] لرقم ويفحصه.`,
            "لازم URL صحيح.",
            "secret قصير يعني ضعيف، فارفضه.",
            "اختياري.",
            "قفلة.",
            "افحص مرة واحدة وقت التشغيل.",
            "لو فيه مشكلة...",
            "...اطبع كل المشاكل مرة واحدة برسالة مقروءة...",
            "...واقفل التطبيق. ده المهم: متكمّلش.",
            "قفلة.",
            "صدّر env مفحوص ونوعه معروف، واستخدمه بدل process.env في كل حتة."
          ],
          sol: R`من غير [[JWT_SECRET]] التطبيق بيقف فورًا (exit code 1) ويطبع: [[متغيرات البيئة غلط:]] وتحتها [[✖ Invalid input: expected string, received undefined]] و [[→ at JWT_SECRET]]. ومع [[PORT=abc]]: [[✖ Invalid input: expected number, received NaN]] و [[→ at PORT]].

خلي بالك إن .env لازم يتقري الأول ([[node --env-file=.env]] أو dotenv)، وإلا هتلاقي كل المتغيرات ناقصة. وفيه فخ: [[PORT=]] فاضية بتعدّي والتطبيق يقوم على بورت [[0]]، لأن [[z.coerce.number()]] بيحوّل الـ string الفاضي لـ 0. لو ده يفرق معاك زوّد [[.positive()]].`
        }
      ]
    }
]);

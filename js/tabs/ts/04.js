// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "Narrowing: تضيّق النوع",
      l: 2,
      n: "TS بيتابع الـ if والـ switch وبيعرف النوع في كل فرع، وانت تقدر تعلّمه فحوصات جديدة",
      items: [
        {
          cmd: "narrowing",
          title: "TS بيعرف النوع جوه الـ if إزاي",
          desc: R`narrowing معناه إن TS يضيّق union لنوع أصغر بعد فحص JS عادي. الفحوصات اللي بيفهمها: [[typeof]] للـ primitives، و truthiness ([[if (x)]])، و [[===]]، و [[in]] (الخاصية موجودة؟)، و [[instanceof]] (من الكلاس ده؟)، و [[Array.isArray]].

والمهم إن الفحص كود حقيقي بيشتغل وقت التشغيل، لأن الأنواع نفسها مش موجودة وقتها.`,
          example: R`type Cat = { meow: () => void };
type Dog = { bark: () => void };
function speak(pet: Cat | Dog) {
  if ("meow" in pet) pet.meow();
  else pet.bark();
}
function show(value: string | number | Date | null) {
  if (value === null) return "—";
  if (typeof value === "string") return value.trim();
  if (value instanceof Date) return value.toISOString();
  return value.toFixed(2);
}
function total(items: number | number[]) {
  return Array.isArray(items) ? items.reduce((a, b) => a + b, 0) : items;
}`,
          try: R`امسح سطر [[value === null]] وشوف TS بيقولك إيه عند [[toFixed]]. وبعدين جرّب [[typeof value === "object"]] بدل instanceof، وشوف النوع جوه الـ if بقى إيه (null كمان object).`,
          flag: "script",
          deep: {
            why: "الـ unions مش مفيدة غير لو تقدر تشتغل على كل احتمال لوحده. الـ narrowing هو اللي بيخليك تكتب JS عادي خالص (if و switch)، و TS يفهم لوحده النوع في كل فرع من غير ما تعمل cast.",
            how: R`TS بيعمل control flow analysis: بيمشي في الكود فرع فرع وبيحسب نوع كل متغير في كل نقطة. بعد [[if (typeof x === "string") return]]، باقي الدالة x مش string.

[[typeof]] بيفرّق بين الـ primitives بس: [["string"]] و [["number"]] و [["boolean"]] و [["undefined"]] و [["function"]] و [["object"]]. وخلي بالك [[typeof null === "object"]] (غلطة قديمة في JS)، والـ array كمان [["object"]].

[[in]] بيفحص وجود خاصية، ومفيد مع objects عادية (زي داتا JSON) اللي مفيهاش كلاس. و [[instanceof]] بيفحص سلسلة الـ prototype، فبيشتغل مع الكلاسات بس ([[Date]] و [[Error]] وكلاساتك)، مش مع [[type]] أو [[interface]] لأنهم مش موجودين وقت التشغيل.

الـ truthiness ([[if (x)]]) بيشيل null و undefined، بس كمان بيشيل [[0]] و [[""]] و [[false]]. فلو 0 قيمة صح، افحص [[x !== undefined]].

والـ narrowing ممكن يضيع جوه callbacks: لو فحصت [[obj.user]] وبعدين استخدمته جوه [[arr.map(() => obj.user.name)]]، TS هيعترض لأن الـ callback ممكن يتنادي بعدين والقيمة اتغيرت. الحل: خزّنها في [[const]] الأول.`,
            when: R`أي union. وفي الـ catch: [[if (e instanceof Error)]]. ولداتا JSON: [[in]] أو Zod.`,
            mistakes: R`[[if (typeof user === "User")]]: مفيش حاجة اسمها كده، typeof بيرجع أنواع JS بس. و [[x instanceof MyInterface]]: الـ interface مش موجود وقت التشغيل. و [[if (!count) return]] على رقم ممكن يبقى 0.`
          },
          teach: R`## المثال بيعمل إيه؟

٣ دوال، كل واحدة بتاخد union وبتفحصه بطريقة مختلفة: [[in]]، وسلسلة [[===]] و [[typeof]] و [[instanceof]]، و [[Array.isArray]]. المثال كله بيعدّي من غير أخطاء، فهنسأل الـ compiler عن نوع المتغير بعد كل فحص (اللي بيظهر لما توقف بالماوس). اتفحص بـ TypeScript 6.0.3 و 7.0.2، واتشغّل بـ [[tsx]].

---

## ١. [[in]]: الخاصية موجودة؟

~~~text app.ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };
function speak(pet: Cat | Dog) {
  if ("meow" in pet) pet.meow();
  else pet.bark();
}
~~~

- [[meow: () => void]]: خاصية نوعها دالة مبتاخدش حاجة.
- [["meow" in pet]]: [[in]] كود JS بيرجّع true لو الـ object فيه خاصية بالاسم ده.
- TS بيبص على الـ union: مين فيه [[meow]]؟ Cat بس. فـ:

~~~text الأنواع
جوه الـ if    pet: Cat
جوه الـ else  pet: Dog
~~~

~~~text الناتج: speak مع قطة وبعدين كلب
meow
woof
~~~

---

## ٢. سلسلة فحوصات: كل واحد بيشيل احتمال

~~~text app.ts
function show(value: string | number | Date | null) {
  if (value === null) return "—";
  if (typeof value === "string") return value.trim();
  if (value instanceof Date) return value.toISOString();
  return value.toFixed(2);
}
~~~

كل سطر فيه [[return]]، فاللي بيعدّي منه هو الاحتمالات اللي فاضلة بس. نوع [[value]] بعد كل سطر:

| بعد | نوع [[value]] | الفحص |
|---|---|---|
| البداية | [[string | number | Date | null]] | |
| [[value === null]] | [[string | number | Date]] | مقارنة مباشرة |
| [[typeof value === "string"]] | [[number | Date]] | [[typeof]] بيرجّع اسم النوع كنص |
| [[value instanceof Date]] | [[number]] | [[instanceof]]: اتعمل من كلاس Date؟ |

وفي الآخر مفيش غير number، فـ [[toFixed(2)]] (رقمين بعد العلامة) مسموحة.

- [[trim()]]: بيشيل المسافات من الأول والآخر.
- [[toISOString()]]: التاريخ كنص بصيغة عالمية.

~~~text الناتج: show(null), show("  hi  "), show(تاريخ 15 يناير 2026), show(3.14159)
— "hi" 2026-01-15T00:00:00.000Z 3.14
~~~

### ليه [[instanceof]] مش [[typeof]] مع Date؟

[[typeof]] بيعرف أنواع JS الأساسية بس. جرّبناه على حاجات كتير:

~~~text الناتج: typeof على null و [] و new Date() و "x" و undefined و دالة
object object object string undefined function
~~~

null والـ array والتاريخ كلهم [["object"]]. فلو كتبت [[typeof value === "object"]] بدل instanceof، النوع جوه الـ if بيبقى [[Date | null]]، لأن null كمان object. عشان كده بنشيل null الأول، أو نستخدم [[instanceof]].

ولو مسحت سطر الـ null، آخر سطر بيطلّع (جرّبناها على الدالة لوحدها في ملف، فـ toFixed في السطر 4):

~~~text الناتج: npx tsc --noEmit
app.ts(4,10): error TS18047: 'value' is possibly 'null'.
~~~

---

## ٣. [[Array.isArray]]

~~~text app.ts
function total(items: number | number[]) {
  return Array.isArray(items) ? items.reduce((a, b) => a + b, 0) : items;
}
~~~

- [[Array.isArray(items)]]: true لو array. [[typeof]] مينفعش هنا لأن الـ array [["object"]].
- [[? :]] (ternary): في الفرع الأول [[items]] نوعها [[number[]]] فـ [[reduce]] مسموحة، وفي التاني [[number]].

~~~text الناتج: total(5), total([1, 2, 3])
5 6
~~~

---

## الخلاصة

| الفحص | بيفرّق بين | مثال |
|---|---|---|
| [[typeof]] | string و number و boolean و undefined و function | [[typeof x === "string"]] |
| [[===]] | قيمة بعينها | [[x === null]] |
| [[in]] | objects بخصايص مختلفة | [["meow" in pet]] |
| [[instanceof]] | objects من كلاسات (Date و Error) | [[x instanceof Date]] |
| [[Array.isArray]] | array ولا لأ | [[Array.isArray(x)]] |

كلها كود JS بيشتغل فعلًا، و TS بيتابعه ويعرف النوع في كل فرع. و [[instanceof]] مبيشتغلش مع [[type]] و [[interface]]، لأنهم مش موجودين وقت التشغيل.`,
          lines: [
            R`نوع فيه [[meow]].`,
            R`نوع فيه [[bark]].`,
            "union من الاتنين.",
            R`[[in]]: لو الخاصية موجودة يبقى Cat.`,
            "غير كده فاضل Dog بس.",
            "قفلة.",
            "union من أربع احتمالات.",
            R`[[===]]: شيل null، والباقي تلاتة.`,
            R`[[typeof]]: هنا string.`,
            R`[[instanceof]]: object من كلاس Date.`,
            R`مفيش غير number، فـ [[toFixed]] مسموحة.`,
            "قفلة.",
            "رقم أو ليستة أرقام.",
            R`[[Array.isArray]] بيضيّق للـ array في فرع وللرقم في التاني.`,
            "قفلة."
          ],
          sol: R`بعد ما تمسح سطر [[value === null]]: [[value.toFixed(2)]] بيطلّع 'value' is possibly 'null' (TS18047). بعد typeof و instanceof اللي فاضل [[number | null]]، ومحدش شال null.

ولو غيّرت instanceof لـ [[typeof value === "object"]]، النوع جوه الـ if بيبقى [[Date | null]] مش Date بس، لأن [[typeof null]] بيرجّع "object" (غلطة قديمة في JS). فـ [[value.toISOString()]] جواه بيطلّع نفس الخطأ 'value' is possibly 'null'. عشان كده instanceof أو فحص null الأول.`
        },
        {
          cmd: "discriminated unions",
          title: "union من objects فيه خاصية بتقول هو أنهي واحد",
          desc: R`discriminated union: كل object في الـ union فيه خاصية بنفس الاسم وقيمة literal مختلفة (غالبًا [[type]] أو [[status]] أو [[kind]]). لما تفحص الخاصية دي، TS بيعرف باقي الشكل.

ده أنضف طريقة توصف بيها حالات حاجة: طلب بيحمّل أو نجح أو فشل. كل حالة ليها الداتا بتاعتها بس، فمستحيل يبقى عندك [[data]] و [[error]] في نفس الوقت.`,
          example: R`type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };
function render(s: FetchState) {
  switch (s.status) {
    case "loading":
      return "بيحمّل...";
    case "success":
      return s.data.join(", ");
    case "error":
      return "حصل خطأ: " + s.error;
  }
}`,
          try: R`جوه [[case "loading"]] اكتب [[s.data]] وشوف الخطأ. وبعدين ضيف حالة [[{ status: "idle" }]] للنوع وشوف هل TS لاحظ إنها مش متغطية (الدرس الجاي بيخليه يلاحظ دايمًا).`,
          flag: "script",
          deep: {
            why: R`الطريقة الشائعة: [[loading: boolean]] و [[data?: T]] و [[error?: string]] في state واحدة. كده فيه ٨ تركيبات ممكنة، ونصهم مستحيل منطقيًا (loading و error مع بعض؟)، والكود بيتملي [[if (data && !loading && !error)]]. الـ discriminated union بيخلي الحالات المستحيلة مستحيلة في النوع نفسه.`,
            how: R`الخاصية المشتركة لازم تكون literal type ([["loading"]] مش string). لما تكتب [[s.status === "success"]] أو [[case "success"]]، TS بيشيل من الـ union كل الأشكال اللي status بتاعها مش success، فمفيش غير شكل واحد باقي.

ده شغال مع [[if]] و [[switch]] و early return.

ونفس الفكرة في حاجات كتير: actions في [[useReducer]] ([[{ type: "add"; item } | { type: "remove"; id }]])، و events جاية من WebSocket، ونتيجة عملية ([[{ ok: true; value } | { ok: false; error }]])، و [[safeParse]] في Zod بترجع الشكل ده بالظبط على [[success]].`,
            when: "state فيها حالات مختلفة، و reducer actions، ورسايل بين client و server، وأي نتيجة ممكن تنجح أو تفشل.",
            mistakes: R`تعمل destructuring لخاصية مش موجودة في كل الأشكال قبل الفحص ([[const { data } = s]]): TS هيعترض، لأن data مش موجودة في loading. افحص الأول وبعدين خُد. وتخلي الخاصية المميّزة [[string]] بدل literal، فالتضييق مبيحصلش.`
          },
          teach: R`## المثال بيعمل إيه؟

بيوصف حالة طلب (بيحمّل، نجح، فشل) بـ ٣ أشكال objects، كل شكل فيه [[status]] بقيمة مختلفة. وبعدين [[switch]] على [[status]]، و TS بيعرف في كل [[case]] الداتا الموجودة. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس النتايج)، واتشغّل بـ [[tsx]].

---

## ١. النوع

~~~text app.ts
type FetchState =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };
~~~

- union من ٣ objects. الـ [[|]] اللي في أول كل سطر اختياري، بيتكتب عشان الأشكال تيجي تحت بعض.
- كل شكل فيه [[status]]، وقيمتها **literal** مختلفة: [["loading"]] و [["success"]] و [["error"]]. الخاصية المشتركة دي اسمها **discriminant** (المميِّز).
- كل حالة ليها الداتا بتاعتها بس: [[data]] في النجاح، و [[error]] في الفشل.

يعني حالة «بيحمّل وفيه داتا» مستحيلة في النوع نفسه:

~~~text الناتج: const bad: FetchState = { status: "loading", data: [] }
error TS2353: Object literal may only specify known properties, and 'data' does not exist in type '{ status: "loading"; }'.
~~~

---

## ٢. الـ switch

~~~text app.ts
function render(s: FetchState) {
  switch (s.status) {
    case "loading":
      return "بيحمّل...";
    case "success":
      return s.data.join(", ");
    case "error":
      return "حصل خطأ: " + s.error;
  }
}
~~~

- [[switch (s.status)]]: قارن [[s.status]] بكل [[case]]، وادخل في اللي بيساويها.
- قبل الـ switch، [[s.data]] مرفوضة، لأن مش كل الأشكال فيها data.
- جوه كل case، TS شال من الـ union كل شكل [[status]] بتاعه مختلف. سألنا الـ compiler عن [[s]] في كل واحد:

~~~text الأنواع
case "loading"   s: { status: "loading"; }
case "success"   s: { status: "success"; data: string[]; }
case "error"     s: { status: "error"; error: string; }
~~~

- [[s.data.join(", ")]]: [[join]] بتلزق عناصر الـ array في نص واحد، والفاصل بينهم [[", "]].

~~~text الناتج: render على الحالات التلاتة
بيحمّل...
a, b
حصل خطأ: 404
~~~

والدالة نوع رجوعها اتستنتج [[string]].

---

## ٣. لو قريت داتا مش موجودة

جوه [[case "loading"]] جرّبنا [[return s.data;]]:

~~~text الناتج: npx tsc --noEmit
app.ts(8,16): error TS2339: Property 'data' does not exist on type '{ status: "loading"; }'.
~~~

الرسالة بتقولك TS شايف إيه بالظبط في المكان ده: شكل loading لوحده.

وبرضه الـ destructuring قبل الفحص مرفوض: [[const { data } = s]] بيطلّع [[Property 'data' does not exist on type 'FetchState']].

---

## ٤. مقارنة بالطريقة الشائعة

~~~text app.ts
type Bad = { loading: boolean; data?: string[]; error?: string };
~~~

هنا كل حاجة اختيارية ومستقلة: ممكن [[loading: true]] و [[error]] و [[data]] كلهم مع بعض، و TS مش هيعترض. وكل مرة هتقرا [[data]] هتلاقيها [[string[] | undefined]]، فتكتب [[if (!s.loading && s.data && !s.error)]].

---

## الخلاصة

| | discriminated union | object واحد بخصايص اختيارية |
|---|---|---|
| حالات مستحيلة | مستحيلة في النوع | مسموحة |
| بعد [[case "success"]] | [[data]] موجودة أكيد | لسه ممكن undefined |
| الفحص | قيمة واحدة ([[status]]) | شروط كتير |

- الخاصية المميّزة لازم literal ([["loading"]])، مش [[string]].
- افحصها الأول، وبعدين اقرا الداتا.`,
          lines: [
            "النوع اسمه FetchState.",
            "حالة التحميل: مفيش داتا.",
            "حالة النجاح: فيها data.",
            "حالة الفشل: فيها error.",
            "الدالة بتاخد أي حالة.",
            "بتفحص الخاصية المميّزة (discriminant).",
            "لو loading...",
            "...مفيش حاجة تانية تتقري.",
            "لو success...",
            R`...TS عارف إن [[s.data]] موجودة.`,
            "لو error...",
            R`...و [[s.error]] موجودة.`,
            "قفلة الـ switch.",
            "قفلة الدالة."
          ],
          sol: R`[[s.data]] جوه [[case "loading"]] بيطلّع Property 'data' does not exist on type '{ status: "loading"; }' (TS2339): جوه الـ case ده TS عارف إنها حالة loading بالظبط.

ولما تضيف [[{ status: "idle" }]]، غالبًا مش هتلاقي أي خطأ: الدالة من غير نوع رجوع، فـ TS بيعتبر إنها ممكن ترجّع undefined لحالة idle ويسكت. لو كتبت نوع الرجوع [[: string]] هتاخد Function lacks ending return statement and return type does not include 'undefined' (TS2366)، وده تلميح بس، مش بيقولك أنهي حالة ناقصة. الدرس الجاي بيخلي الخطأ واضح ويسمّي الحالة.`
        },
        {
          cmd: "exhaustive check",
          title: "تتأكد إن الـ switch غطّى كل الحالات، ولو زودت حالة يطلع خطأ",
          desc: R`في آخر الـ switch، حط [[default]] بيحط القيمة في متغير نوعه [[never]]. لو كل الحالات متغطية، القيمة هناك نوعها never والكود يعدّي. لو حد ضاف حالة جديدة للـ union ونسي يتعامل معاها، TS يطلّع خطأ في السطر ده بالظبط.

ده بيحوّل «نسيت أعدّل مكان» من bug في الإنتاج لخطأ وقت الـ build.`,
          example: R`type Shape =
  | { kind: "circle"; r: number }
  | { kind: "square"; side: number }
  | { kind: "rect"; w: number; h: number };
function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.r ** 2;
    case "square": return s.side ** 2;
    default: {
      const unhandled: never = s; // خطأ: Type '{ kind: "rect"; ... }' is not assignable to type 'never'
      throw new Error("شكل مش معروف: " + JSON.stringify(unhandled));
    }
  }
}`,
          try: R`ضيف [[case "rect": return s.w * s.h;]] وشوف الخطأ اختفى. وبعدين ضيف شكل رابع [[triangle]] للـ union ولاحظ إن الخطأ رجع لوحده في نفس المكان.`,
          flag: "script",
          deep: {
            why: "الـ union بيكبر مع المشروع: حالة طلب جديدة، ونوع اشتراك جديد، ودور جديد. كل switch في الكود محتاج يتعدّل، ومحدش فاكر هما فين. الـ exhaustive check بيخلي TS يلاقيهم بدالك.",
            how: R`كل case بيشيل احتمال من الـ union. لما توصل للـ default، نوع [[s]] هو اللي فاضل. لو غطّيت الكل، اللي فاضل هو [[never]] (مجموعة فاضية)، و never ينفع يتحط في never. لو فاضل حاجة، [[{ kind: "rect" ... }]] مش assignable لـ never، فيطلع خطأ فيه اسم الحالة الناقصة.

ليه الـ throw كمان؟ لأن الأنواع بتتمسح. لو السيرفر بعت [[kind: "hexagon"]] وقت التشغيل، الـ switch هيوصل للـ default فعلًا، والأحسن يرمي خطأ واضح بدل ما الدالة ترجع undefined بهدوء.

ناس كتير بتعمل دالة صغيرة يستخدموها في كل مكان: [[function assertNever(x: never): never { throw new Error("unexpected") }]]، ويكتبوا [[default: return assertNever(s)]].

وكتابة نوع الرجوع ([[: number]]) لوحدها بتدّي حماية جزئية: لو حالة ناقصة ومفيش default، الدالة ممكن ترجع undefined، و TS يعترض. بس رسالة never أوضح وبتقولك الحالة بالاسم.`,
            when: "أي switch أو if/else على discriminated union أو union literals، خصوصًا في reducers والـ API handlers.",
            mistakes: R`تكتب [[default: return null]] فتقفل الحماية: أي حالة جديدة هتروح للـ default بهدوء. وتعمل exhaustive check على [[string]] عادي بدل union literals: مش هيشتغل لأن string ملهاش نهاية.`
          },
          teach: R`## المثال بيعمل إيه؟

دالة بتحسب مساحة ٣ أشكال، بس الـ switch فيه حالتين بس، كأن حد ضاف [[rect]] للنوع ونسي يعدّل الدالة. السطر اللي في [[default]] هو اللي بيمسك النسيان ده. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الخطأ)، واتشغّل بـ [[tsx]] بعد التصليح.

---

## ١. النوع

~~~text app.ts
type Shape =
  | { kind: "circle"; r: number }
  | { kind: "square"; side: number }
  | { kind: "rect"; w: number; h: number };
~~~

discriminated union (الدرس اللي فات): المميِّز [[kind]]، وكل شكل ليه أبعاده: [[r]] نص القطر، و [[side]] الضلع، و [[w]] و [[h]] العرض والطول.

---

## ٢. الحالات المتغطية

~~~text app.ts
function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.r ** 2;
    case "square": return s.side ** 2;
~~~

- [[: number]]: نوع الرجوع مكتوب.
- [[Math.PI]]: ط (3.14159...).
- [[**]]: الأس. [[2 ** 3]] = 8، و [[s.r ** 2]] = نص القطر تربيع. و [[**]] بيتحسب قبل [[*]]، فدي [[π × r²]].

---

## ٣. الـ default: اللي المفروض ميوصلّوش حاجة

~~~text app.ts
    default: {
      const unhandled: never = s;
      throw new Error("شكل مش معروف: " + JSON.stringify(unhandled));
    }
~~~

### الفكرة

كل [[case]] بيشيل شكل من الـ union. فلما نوصل لـ [[default]]، نوع [[s]] هو **اللي فاضل**:

| بعد | اللي فاضل في [[s]] |
|---|---|
| البداية | circle أو square أو rect |
| [[case "circle"]] | square أو rect |
| [[case "square"]] | rect |

لو كل الأشكال متغطية، اللي فاضل [[never]] (ولا حاجة). و [[const unhandled: never = s]] بتقول: «أنا متأكد إن مفيش حاجة فاضلة». و [[never]] مبيقبلش أي قيمة غير never، فلو فاضل شكل، يطلع خطأ:

~~~text الناتج: npx tsc --noEmit
app.ts(10,13): error TS2322: Type '{ kind: "rect"; w: number; h: number; }' is not assignable to type 'never'.
~~~

الرسالة فيها **اسم الحالة الناقصة**: rect.

### الـ [[throw]]: ليه، والأنواع بتتمسح؟

عشان وقت التشغيل ممكن تيجي داتا مش في النوع خالص (من API مثلًا). جرّبنا بعد التصليح نبعت [[{ kind: "hexagon" }]] (بـ [[as any]] عشان نعدّي الفحص):

~~~text الناتج
Error: شكل مش معروف: {"kind":"hexagon"}
~~~

[[JSON.stringify]] حوّلت الـ object لنص عشان يظهر في الرسالة. من غير الـ throw، الدالة كانت هترجّع undefined بهدوء.

و [[{ }]] حوالين جسم الـ default عشان [[const]] جوه [[case]] محتاج بلوك خاص بيه.

---

## ٤. التصليح

ضيف قبل الـ default:

~~~text app.ts
    case "rect": return s.w * s.h;
~~~

الخطأ اختفى، والدالة اشتغلت:

~~~text الناتج: area للدايرة (r=1) والمربع (side=3) والمستطيل (2×5)
3.141592653589793 9 10
~~~

ولما ضفنا شكل رابع [[{ kind: "triangle"; base: number; height: number }]] للنوع، الخطأ رجع لوحده في نفس السطر:

~~~text الناتج: npx tsc --noEmit
app.ts(12,13): error TS2322: Type '{ kind: "triangle"; base: number; height: number; }' is not assignable to type 'never'.
~~~

(السطر بقى 12 لأن النوع زاد سطر، والـ case الجديد زاد سطر.)

---

## ٥. من غير الـ default؟

نوع الرجوع [[: number]] لوحده بيدّي تلميح: لو حالة ناقصة، الدالة ممكن توصل لآخرها من غير return:

~~~text الناتج: نفس الفكرة بشكلين و case واحد ومن غير default
error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
~~~

بس مبيقولكش **أنهي** حالة ناقصة. والـ never بيقولها بالاسم.

---

## الخلاصة

- [[default]] فيه [[const x: never = s]]: لو كل الحالات متغطية بيعدّي، ولو فيه حالة ناقصة بيطلّع خطأ باسمها.
- خلي فيه [[throw]] عشان الداتا الغلط وقت التشغيل.
- [[default: return 0]] بيقفل الحماية دي: أي حالة جديدة هتروح هناك بهدوء.`,
          lines: [
            "union بتلات أشكال.",
            "دايرة.",
            "مربع.",
            "مستطيل: الحالة اللي «اتضافت جديد» ومحدش غطّاها.",
            "نوع الرجوع مكتوب number.",
            R`فحص على [[kind]].`,
            "الدايرة.",
            "المربع.",
            "أي حاجة تانية.",
            R`هنا المفروض ميكونش فاضل حاجة. بس [[rect]] لسه فاضل، فتعيينه لـ never خطأ، والرسالة بتقولك مين.`,
            "ولو داتا غلط جت وقت التشغيل (مثلًا من API)، ارمي خطأ واضح.",
            "قفلة الـ default.",
            "قفلة الـ switch.",
            "قفلة الدالة."
          ],
          sol: R`بعد [[case "rect"]] الخطأ بيختفي، لأن كل الحالات اتغطت واللي فاضل لـ default هو [[never]].

ولما تضيف [[{ kind: "triangle"; base: number; height: number }]] الخطأ بيرجع على نفس السطر [[const unhandled: never = s]]: Type '{ kind: "triangle"; base: number; height: number; }' is not assignable to type 'never'. الرسالة فيها اسم الحالة الناقصة بالظبط. ولو مطلعش خطأ، اتأكد إن الـ default فيه [[never]] فعلًا، مش [[default: return 0]].`
        },
        {
          cmd: "type predicates (is)",
          title: "دالة فحص بتاعتك، و TS يصدّقها ويضيّق النوع",
          desc: R`لو الفحص معقد أو بيتكرر، حطه في دالة نوع رجوعها [[value is User]] بدل [[boolean]]. لما الدالة ترجع true، TS بيعتبر القيمة User في الفرع ده. دي اسمها type guard (أو type predicate).

وفيه أخت ليها: [[asserts value is User]]، دالة بترمي خطأ لو الفحص فشل، وبعد ما تناديها النوع بيتضيّق في باقي الكود.`,
          example: R`type User = { id: string; name: string };
function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null &&
    "id" in x && typeof x.id === "string" &&
    "name" in x && typeof x.name === "string";
}
const data: unknown = JSON.parse('{"id":"1","name":"Sara"}');
if (isUser(data)) console.log(data.name);
const ROLES = ["admin", "user"] as const;
type Role = (typeof ROLES)[number];
const isRole = (s: string): s is Role => (ROLES as readonly string[]).includes(s);
const mixed = ["a", undefined, "b"];
const clean = mixed.filter((x) => x !== undefined);`,
          try: R`غيّر [[isUser]] عشان ترجع [[boolean]] بدل [[x is User]]، وشوف [[data.name]] بقت خطأ. وبعدين اكتب [[function assertUser(x: unknown): asserts x is User]] بترمي خطأ، ونادي عليها قبل [[data.name]] من غير if.`,
          flag: "script",
          deep: {
            why: R`فحص زي «ده User؟» بيتكرر في أماكن كتير: داتا من localStorage، ورسالة من WebSocket، وقيمة جاية من query string. لو كتبته جوه كل if هيتكرر ويختلف. في دالة، بيبقى مكان واحد، و TS بيفهم نتيجته.

وفي مشروع حقيقي كان فيه ليستة أدوار [[const ROLES = ["TEACHER", "STUDENT", ...]]] وبعدين [[role as Prisma.UserWhereInput["role"]]] بعد [[includes]]: الـ [[as]] ده بيقول «صدّقني». و guard زي [[isRole]] بيعمل نفس الفحص بس TS بيفهمه.`,
            how: R`[[x is T]] وعد منك: «لو رجّعت true، اعتبره T». TS مبيتأكدش إن الفحص جوه الدالة صح. لو كتبت [[return true]] بس، هيصدّقك، وده نفس خطر [[as]]. عشان كده الـ guard لازم يفحص كل حاجة مهمة فعلًا، أو تستخدم Zod اللي بيعمل الفحص والنوع مع بعض.

لما الـ guard يرجع false، TS بيشيل النوع من الـ union في الفرع التاني ([[else]])، فمع [[User | Admin]] الفرع التاني بقى Admin.

[[asserts x is T]] (assertion function) مبترجعش حاجة: يا بترمي خطأ، يا بتعدّي، وبعدها باقي الكود النوع متضيّق. مفيدة في أول الدالة: [[assertUser(body)]] وبعدين تشتغل عادي.

ومن TS 5.5، الـ compiler بيستنتج type predicate لوحده من arrow functions بسيطة زي [[(x) => x !== undefined]]، فـ [[filter]] بقى بيطلّع النوع الصح من غير ما تكتب [[(x): x is string]].`,
            when: "فحص بيتكرر، وفلترة ليستات فيها union، وقيم string عايز تتأكد إنها من قايمة ثابتة (أدوار، حالات). وللداتا الكبيرة من API استخدم Zod بدل ما تكتب guards بإيدك.",
            mistakes: R`guard بيكذب: بيفحص [[id]] بس ويقول إنه User كامل. و [[filter(Boolean)]] وتستنى النوع يتضيّق: مبيحصلش لأن [[Boolean]] مش guard، استخدم [[(x) => x !== undefined]]. و [[ROLES.includes(role)]] على tuple بـ [[as const]] وتستغرب إنه مرفوض: لأن role نوعها string أوسع من عناصر الليستة.`
          },
          teach: R`## المثال بيعمل إيه؟

٣ أمثلة على دوال فحص بيفهمها TS: [[isUser]] بتتأكد إن قيمة مجهولة شكلها User، و [[isRole]] بتتأكد إن نص من قايمة أدوار، و [[filter]] بيشيل الـ undefined من ليستة. كله اتفحص بـ TypeScript 6.0.3 و 7.0.2، واتشغّل بـ [[tsx]]. الأنواع اللي تحت سألنا عنها الـ compiler نفسه.

---

## ١. [[isUser]]: الـ type predicate

~~~text app.ts
type User = { id: string; name: string };
function isUser(x: unknown): x is User {
~~~

- [[x: unknown]]: الدالة بتقبل أي حاجة.
- [[x is User]] مكان نوع الرجوع: الدالة **بترجّع boolean**، بس بتقول لـ TS معاها: «لو رجّعت true، اعتبر [[x]] نوعه User». ده اسمه type predicate.

### الجسم

~~~text app.ts
  return typeof x === "object" && x !== null &&
    "id" in x && typeof x.id === "string" &&
    "name" in x && typeof x.name === "string";
}
~~~

٦ شروط بـ [[&&]] (و)، والـ return بيكمّل على ٣ سطور:

1. [[typeof x === "object"]]: object (أو null، عشان [[typeof null]] برضه object).
2. [[x !== null]]: شيل null.
3. [["id" in x]]: فيه خاصية اسمها id. بعدها نوع x بقى [[object & Record<"id", unknown>]]، فـ [[x.id]] مسموح تقراه.
4. [[typeof x.id === "string"]]: والـ id نص.
5. و 6. نفس الكلام لـ [[name]].

### الاستخدام

~~~text app.ts
const data: unknown = JSON.parse('{"id":"1","name":"Sara"}');
if (isUser(data)) console.log(data.name);
~~~

~~~text الأنواع
جوه الـ if    data: User
في الـ else   data: unknown
~~~

~~~text الناتج
Sara
~~~

### ليه مش [[boolean]] وخلاص؟

جرّبنا نفس الفحص في دالة نوعها [[: boolean]]:

~~~text الناتج: npx tsc --noEmit
app.ts(6,32): error TS18046: 'data' is of type 'unknown'.
~~~

TS ميعرفش إن الـ true دي ليها علاقة بـ [[data]]. الـ [[x is User]] هي اللي بتربطهم.

> TS **بيصدّق** الـ predicate من غير ما يراجعه: لو كتبت [[return true]] بس، هيعتبر أي حاجة User. فالفحص جوه الدالة مسؤوليتك.

---

## ٢. [[isRole]]: نص من قايمة ثابتة

~~~text app.ts
const ROLES = ["admin", "user"] as const;
type Role = (typeof ROLES)[number];
const isRole = (s: string): s is Role => (ROLES as readonly string[]).includes(s);
~~~

### [[as const]]

من غيره ROLES هتبقى [[string[]]]. معاه:

~~~text النوع
ROLES: readonly ["admin", "user"]
~~~

tuple للقراية بس، وكل عنصر literal.

### [[(typeof ROLES)[number]]]

- [[typeof ROLES]]: نوع المتغير (الـ tuple اللي فوق).
- [[[number]]] على نوع array: «نوع أي عنصر فيه». فالناتج [["admin" | "user"]].

كده الأدوار مكتوبة مرة واحدة، والنوع طالع منها.

### الـ guard نفسه

- [[(s: string): s is Role =>]]: arrow function بـ predicate.
- [[includes(s)]]: هل s موجودة في الليستة؟
- [[(ROLES as readonly string[])]]: ليه؟ [[includes]] على tuple نوعه [["admin" | "user"]] مبتقبلش أي string:

~~~text الناتج: ROLES.includes(r) و r نوعها string
error TS2345: Argument of type 'string' is not assignable to parameter of type '"user" | "admin"'.
~~~

فبنوسّع نوع الليستة لـ [[readonly string[]]] للحظة، عشان نقدر نسأل عن أي نص. (TS 7 بيكتب نفس الرسالة بالترتيب [["admin" | "user"]]: الترتيب جوه الـ union في الرسايل ممكن يختلف بين النسخ، والمعنى واحد.)

~~~text الناتج: isRole("admin"), isRole("owner")
true false
~~~

---

## ٣. [[filter]] من غير ما تكتب predicate

~~~text app.ts
const mixed = ["a", undefined, "b"];
const clean = mixed.filter((x) => x !== undefined);
~~~

~~~text الأنواع
mixed: (string | undefined)[]
clean: string[]
~~~

من TS 5.5، الـ compiler بيستنتج الـ predicate لوحده من arrow function بسيطة. اتأكدنا: [[(x: string | undefined) => x !== undefined]] نوعها طلع [[(x: string | undefined) => x is string]].

بس [[mixed.filter(Boolean)]] لسه بيطلّع [[(string | undefined)[]]]: [[Boolean]] دالة عادية مش predicate.

~~~text الناتج: console.log(clean)
[ 'a', 'b' ]
~~~

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[(x: unknown): x is User]] | لو رجّعت true، x نوعه User |
| [[(x: unknown): asserts x is User]] | لو مرميتش خطأ، x نوعه User في باقي الكود |
| [[(typeof ARR)[number]]] | union عناصر array ثابتة |
| [[filter((x) => x !== undefined)]] | من TS 5.5 بيضيّق لوحده |

الـ predicate وعد منك، و TS بيصدّقه. افحص كل حاجة مهمة جواه، أو استخدم Zod.`,
          lines: [
            "النوع اللي عايز تتأكد منه.",
            R`[[x is User]]: لو رجّعت true، يبقى x نوعه User.`,
            "object ومش null...",
            R`...وفيه [[id]] وهو string. [[in]] هو اللي بيسمح تقرا [[x.id]] بعدها...`,
            R`...وفيه [[name]] string.`,
            "قفلة.",
            "قيمة مش معروفة.",
            R`بعد الفحص، [[data.name]] مسموحة.`,
            "ليستة أدوار ثابتة.",
            R`النوع من الليستة: [["admin" | "user"]].`,
            R`guard للأدوار. [[includes]] على tuple ثابت مبتقبلش string، فبنوسّعه لـ [[readonly string[]]] الأول.`,
            "ليستة فيها undefined.",
            R`من TS 5.5، [[filter]] بفحص بسيط بيستنتج guard لوحده: الناتج [[string[]]].`
          ],
          sol: R`لما [[isUser]] ترجّع [[boolean]]: [[data.name]] جوه الـ if بيطلّع 'data' is of type 'unknown' (TS18046). الـ boolean ملوش علاقة بـ [[data]] في نظر TS، إنما [[x is User]] بتقوله «لو رجّعت true، اعتبر x ده User».

والـ assertion زي الكود تحت: بعد [[assertUser(data)]] السطر اللي بعده بيعرف إن [[data]] بقت User من غير if، والناتج [[Sara]]. ولو الداتا غلط، الدالة بترمي [[Error: مش User]] والكود اللي بعدها مش بيتنفذ. غلطة شائعة: تكتبها arrow function [[const assertUser = (x: unknown): asserts x is User => ...]] فتاخد TS2775 (Assertions require every name in the call target to be declared with an explicit type annotation). يا تكتبها function عادية، يا تدي الثابت نوع صريح.`,
          solCode: R`type User = { id: string; name: string };
function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null &&
    "id" in x && typeof x.id === "string" &&
    "name" in x && typeof x.name === "string";
}
function assertUser(x: unknown): asserts x is User {
  if (!isUser(x)) throw new Error("مش User");
}
const data: unknown = JSON.parse('{"id":"1","name":"Sara"}');
assertUser(data);
console.log(data.name); // Sara`
        }
      ]
    }
]);

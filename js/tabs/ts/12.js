// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات TypeScript، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "interface بيتدمج و type أوسع",
          title: "إيه الفرق بين type و interface؟ (type vs interface)",
          desc: R`الاتنين بيسمّوا شكل object، وفي أغلب الاستخدام زي بعض. [[type]] أوسع: ينفع لـ unions و tuples وأنواع دوال و mapped و conditional types. و [[interface]] للـ objects بس، بس بيدعم declaration merging: لو اتعرّف مرتين بيتدمج، وده اللي بيخليني أضيف على أنواع مكتبات زي [[Request]] في Express. و [[extends]] في interface بيطلّع أخطاء أوضح لو فيه تعارض من [[&]] في type. في الشغل بختار واحد للـ objects وأمشي عليه، وبستخدم type لأي حاجة مش object.`,
          example: R`type Status = "on" | "off";
interface Req { url: string }
interface Req { user?: string }
const r: Req = { url: "/", user: "u1" };`,
          try: R`اعمل نفس الـ merging بـ [[type]] وشوف خطأ Duplicate identifier.`,
          flag: "script",
          deep: {
            why: "السؤال ده بيختبر إنك فاهم الأدوات مش حافظ قاعدة. الإجابة الضعيفة «interface أحسن» أو «type أحسن» من غير سبب.",
            how: R`نقط تقولها لو اتسألت أكتر: الـ interface بيتعمله cache باسمه، فمع أنواع كبيرة جدًا [[extends]] أسرع في الفحص من intersections متداخلة. والكلاس ينفع يعمل [[implements]] لـ interface أو لـ type (لو object). والـ merging سلاح بحدّين: interface بنفس اسم global موجود هيتدمج معاه من غير ما تاخد بالك.`,
            when: "«إمتى تستخدم intersection؟»، و «إيه اللي يحصل لو خاصية اتعرفت بنوعين في extends؟» (خطأ)، و «وفي &؟» (الخاصية تبقى never)، و «إزاي تضيف user على Request في Express؟».",
            mistakes: "«interface للكلاسات بس». و «type مينفعش يتوسّع» (بيتوسّع بـ &). و «interface أسرع وقت التشغيل» (الاتنين مش موجودين وقت التشغيل أصلًا)."
          },
          teach: R`## الفكرة في سطر

المثال ٤ سطور بيورّوا الفرقين اللي بيتسألوا: [[type]] بيعمل unions، و [[interface]] بيتدمج لو اتعرّف مرتين. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء بالحرف، والفرق إن exit code بقى 1 في TS 7 بدل 2)، والتشغيل بـ [[npx tsx]] على ويندوز 11.

---

## ١. [[type]] لأي حاجة

~~~text app.ts
type Status = "on" | "off";
~~~

union من كلمتين. ده مينفعش بـ [[interface]] أصلًا: الـ interface بيوصف شكل object بس.

---

## ٢. [[interface]] مرتين بنفس الاسم

~~~text app.ts
interface Req { url: string }
interface Req { user?: string }
const r: Req = { url: "/", user: "u1" };
~~~

TS دمج الاتنين في [[Req]] واحد فيه [[url]] و [[user?]]. والدليل إن [[url]] لسه إجبارية بعد الدمج: جرّبنا [[const r: Req = { user: "u1" }]]:

~~~text الناتج
error TS2741: Property 'url' is missing in type '{ user: string; }' but required in type 'Req'.
~~~

وتشغيل المثال نفسه:

~~~text الناتج: npx tsx app.ts
{ url: '/', user: 'u1' }
~~~

---

## ٣. نفس الحاجة بـ [[type]]

~~~text app.ts
type T1 = { url: string };
type T1 = { user?: string };
~~~

~~~text الناتج
error TS2300: Duplicate identifier 'T1'.
error TS2300: Duplicate identifier 'T1'.
~~~

مرة على كل تعريف. الـ [[type]] اسم لنوع واحد ومبيتفتحش تاني.

---

## ٤. التعارض: [[extends]] ضد [[&]]

ده السؤال اللي بييجي بعده غالبًا. جرّبنا خاصية بنوعين مختلفين:

~~~text app.ts
interface A { x: string }
interface B extends A { x: number }
type C = { x: string } & { x: number };
const c: C = { x: "a" };
~~~

~~~text الناتج
error TS2430: Interface 'B' incorrectly extends interface 'A'.
  Types of property 'x' are incompatible.
    Type 'number' is not assignable to type 'string'.
error TS2322: Type 'string' is not assignable to type 'never'.
~~~

- [[extends]] بيطلّع الخطأ **عند التعريف** وبيقول السبب.
- [[&]] بيعدّي التعريف عادي، و [[x]] بتبقى [[string & number]] = [[never]]، والخطأ يطلع بعدين عند الاستخدام برسالة أغمق.

---

## الخلاصة

| | [[type]] | [[interface]] |
|---|---|---|
| unions و tuples و mapped | آه | لأ |
| شكل object | آه | آه |
| يتعرّف مرتين ويتدمج | لأ (TS2300) | آه |
| التوسيع | [[&]]، والتعارض يبقى [[never]] | [[extends]]، والتعارض خطأ واضح (TS2430) |`,
          lines: [
            "union: type بس.",
            "interface.",
            "نفس الاسم: اتدمج مع اللي فوقه.",
            "الشكل النهائي فيه الاتنين."
          ],
          sol: R`[[type Req = { url: string }]] وتحتها [[type Req = { user?: string }]] بيطلّعوا [[Duplicate identifier 'Req']] (TS2300) على الاتنين. عشان تدمجهم بـ type لازم اسم جديد: [[type Req = Base & { user?: string }]].

الإجابة النموذجية في الانترفيو: interface بتتدمج لو اتعرّفت مرتين (declaration merging)، وده اللي بيخليك تضيف على أنواع مكتبات زي [[Express.Request]]. و type بيقدر يعمل unions و tuples و mapped و conditional types، و interface لأ. وفي الشغل: interface لأشكال objects عامة أو هتتوسّع، و type لأي حاجة غير كده، والمهم تمشي على طريقة واحدة في المشروع.`
        },
        {
          cmd: "unknown بيجبرك تفحص",
          title: "الفرق بين any و unknown؟ (any vs unknown)",
          desc: R`الاتنين بيقبلوا أي قيمة، والفرق في اللي بعد كده. [[any]] بيقفل الفحص: تقدر تنادي أي method عليه وتحطه في أي نوع، والغلط يظهر وقت التشغيل. [[unknown]] مش بيسمح بأي عملية لحد ما تضيّقه بفحص حقيقي زي [[typeof]] أو [[instanceof]] أو schema. عشان كده أي داتا جاية من برّه (JSON و API و catch) بخليها unknown. و any بستخدمه بس مؤقتًا وأنا بنقل كود JS قديم.`,
          example: R`const a: any = "x";
a.push(1); // TS ساكت، ووقت التشغيل: TypeError
const u: unknown = "x";
if (typeof u === "string") u.toUpperCase();`,
          try: R`اكتب [[u.toUpperCase()]] من غير الـ if وشوف الخطأ.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتعرف تتعامل مع داتا مش مضمونة بأمان، ومش بتستخدم any كحل لكل خطأ.",
            how: R`any «معدي»: أي حاجة بتتقري منه any برضه، فبينتشر في الكود. و unknown هو الـ top type الآمن: أي حاجة تتحط فيه، بس هو مبيتحطش غير في unknown أو any. و [[catch (e)]] مع strict نوعها unknown ([[useUnknownInCatchVariables]]). و [[JSON.parse]] و [[res.json()]] بيرجعوا any، فالأحسن تحط [[: unknown]] على الناتج بنفسك.`,
            when: "«إزاي تضيّق unknown؟»، و «إيه هو never؟»، و «إزاي تكتب type guard؟»، و «إزاي تمنع any في المشروع؟» (noImplicitAny، وقاعدة eslint [[no-explicit-any]]).",
            mistakes: "«الاتنين زي بعض». و «unknown يعني undefined». و «any أسهل وخلاص»."
          },
          teach: R`## الفكرة في سطر

[[any]] و [[unknown]] الاتنين بيقبلوا أي قيمة، والفرق في اللي مسموحلك تعمله بعدها. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، والتشغيل بـ [[npx tsx]] على ويندوز 11.

---

## ١. [[any]]: الفحص مقفول

~~~text app.ts
const a: any = "x";
a.push(1);
~~~

- [[a]] فيها نص، و [[push]] method بتاعة الـ arrays.
- TS ساكت خالص: مع [[any]] أي method وأي خاصية مسموحة.

~~~text الناتج: npx tsx app.ts
TypeError: a.push is not a function
~~~

الغلط ظهر وقت التشغيل بس. وكمان [[any]] بيعدي: جرّبنا [[const fromAny = a.foo.bar]] وبعدين حطيناها في متغير [[boolean]]، ولا خطأ، لأن أي حاجة بتتقري من [[any]] بتبقى [[any]] هي كمان. ووقت التشغيل:

~~~text الناتج
TypeError: Cannot read properties of undefined (reading 'bar')
~~~

---

## ٢. [[unknown]]: افحص الأول

~~~text app.ts
const u: unknown = "x";
if (typeof u === "string") u.toUpperCase();
~~~

- [[typeof u === "string"]]: فحص حقيقي في JS. [[typeof]] بترجّع اسم النوع كنص.
- جوه الـ [[if]] TS ضيّق [[u]] لـ [[string]]، فـ [[toUpperCase]] مسموحة. طبعناها:

~~~text الناتج
X
~~~

ومن غير الفحص:

~~~text app.ts
u.toUpperCase();
const m: number = u;
~~~

~~~text الناتج: npx tsc
error TS18046: 'u' is of type 'unknown'.
error TS2322: Type 'unknown' is not assignable to type 'number'.
~~~

و [[const n: number = a]] (من [[any]]) عدّى من غير ولا كلمة.

---

## الخلاصة

| | [[any]] | [[unknown]] |
|---|---|---|
| يتحط فيه أي قيمة | آه | آه |
| تنادي عليه methods | آه، من غير فحص | لأ، لحد ما تضيّقه |
| يتحط في متغير نوعه number | آه | لأ (TS2322) |
| اللي بيتقري منه | [[any]] برضه، فبينتشر | لازم فحص |

داتا من برّه (JSON و API و [[catch]]): [[unknown]].`,
          lines: [
            "any.",
            "TS ساكت، و push مش موجودة على string.",
            "unknown.",
            "لازم فحص الأول."
          ],
          sol: R`[[u.toUpperCase()]] من غير if بيطلّع 'u' is of type 'unknown' (TS18046).

الإجابة النموذجية: any بيقفل الفحص خالص، فتقدر تعمل أي حاجة، والغلط بيطلع وقت التشغيل (زي [[a.push]] على string: [[TypeError: a.push is not a function]]). و unknown معناها «ممكن يبقى أي حاجة، فافحص الأول». بتقبل أي قيمة، بس مش بتسمحلك تستخدمها غير بعد narrowing. استخدم unknown لأي داتا جاية من برّه (JSON و catch و API)، و any تقريبًا لأ.`
        },
        {
          cmd: "النوع كباراميتر",
          title: "إمتى تستخدم generics؟ اديني مثال حقيقي (When would you use generics?)",
          desc: R`بستخدمها لما يبقى المنطق واحد والنوع بيتغير، وعايز النوع يعدّي من الأول للآخر من غير ما يضيع في any. مثلًا fetch helper بياخد schema ويرجّع داتا بنوعها، أو hook زي [[useLocalStorage<T>]]، أو نوع رد API موحّد [[ApiResponse<T>]]. ولو محتاج حاجة من النوع جوه الدالة، بحط constraint زي [[T extends { id: string }]]. والمكتبات اللي بستخدمها كل يوم مليانة generics: [[Promise<T>]] و [[useState<T>]] و [[Array<T>]].`,
          example: R`function byId<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((it) => [it.id, it]));
}
const users = byId([{ id: "u1", name: "Sara" }]);
users.get("u1")?.name;`,
          try: R`غيّر الباراميتر لـ [[items: { id: string }[]]] من غير generic، وشوف [[.name]] بقت خطأ.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفهم generics كأداة لتصميم APIs مش كـ syntax غريب، وإنك بتعرف الفرق بينها وبين any و union.",
            how: R`T بيتحدد مع كل نداء (غالبًا بالاستنتاج من الـ arguments)، والـ constraint بيحدد أقل حاجة لازم تكون فيه. وكل ده وقت الفحص بس، والـ JS الناتج دالة عادية. وعلامة إن الـ generic ملوش لازمة: T بيظهر مرة واحدة بس (يبقى unknown كفاية)، أو بيظهر في الرجوع بس (يبقى as متنكّر).`,
            when: "«الفرق بين generic و union؟»، و «يعني إيه extends في generics؟»، و «إزاي تعمل default لـ T؟»، و «keyof مع generics؟».",
            mistakes: "«generics عشان الدالة تقبل أي نوع» (ده any، والفرق إن النوع مبيضيعش). ومثال identity بس من غير استخدام حقيقي."
          },
          teach: R`## الفكرة في سطر

[[byId]] بتحوّل ليستة objects لـ [[Map]] بالـ id، والـ generic بيخلي نوع العنصر اللي دخل هو نفسه اللي يطلع. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، والتشغيل بـ [[npx tsx]] على ويندوز 11.

---

## ١. التوقيع

~~~text app.ts
function byId<T extends { id: string }>(items: T[]): Map<string, T> {
~~~

- [[<T ...>]]: باراميتر **نوع**. بيتحدد مع كل نداء.
- [[extends { id: string }]]: constraint: T لازم يبقى فيه على الأقل [[id]] نوعها string. من غيره مكناش هنقدر نكتب [[it.id]] جوه الدالة.
- [[items: T[]]]: ليستة من T.
- [[Map<string, T>]]: الناتج: المفتاح string والقيمة T نفسه، بكل خصايصه.

---

## ٢. الجسم

~~~text app.ts
  return new Map(items.map((it) => [it.id, it]));
}
~~~

من جوه لبرّه:

1. [[(it) => [it.id, it]]]: لكل عنصر رجّع زوج: [[[id, العنصر]]].
2. [[items.map(...)]]: ليستة أزواج.
3. [[new Map(...)]]: [[Map]] بيتبني من ليستة أزواج [[[مفتاح, قيمة]]].

---

## ٣. الاستخدام

~~~text app.ts
const users = byId([{ id: "u1", name: "Sara" }]);
users.get("u1")?.name;
~~~

- TS استنتج [[T]] من الـ argument. نوع [[users]]:

~~~text الناتج
Map<string, { id: string; name: string; }>
~~~

  [[name]] موجودة، مع إن [[byId]] نفسها ميعرفهاش.
- [[users.get("u1")]]: بترجّع العنصر أو [[undefined]] لو المفتاح مش موجود، فـ [[?.]] لازمة.

~~~text الناتج: console.log(users, users.get("u1")?.name, users.get("zz")?.name)
Map(1) { 'u1' => { id: 'u1', name: 'Sara' } } Sara undefined
~~~

---

## ٤. نفس الدالة من غير generic

~~~text app.ts
function byId2(items: { id: string }[]): Map<string, { id: string }> { ... }
const u2 = byId2([{ id: "u1", name: "Sara" }]);
u2.get("u1")?.name;
~~~

~~~text الناتج: npx tsc
error TS2353: Object literal may only specify known properties, and 'name' does not exist in type '{ id: string; }'.
error TS2339: Property 'name' does not exist on type '{ id: string; }'.
~~~

النوع ضاع: الدالة شايفة [[{ id: string }]] بس، فرفضت [[name]] وهي داخلة، ومش عارفاها وهي طالعة.

---

## الخلاصة

| | generic [[<T extends {...}>]] | نوع ثابت |
|---|---|---|
| النوع اللي بيطلع | نفس اللي دخل | الحد الأدنى بس |
| خصايص زيادة | محفوظة | ضاعت (TS2339) |
| جوه الدالة | تقدر تستخدم اللي في الـ constraint بس | نفس الكلام |`,
          lines: [
            "T أي object فيه id، والناتج Map بنفس T.",
            R`[[Map]] من أزواج id وعنصر.`,
            "قفلة.",
            "T اتستنتج بالشكل الكامل.",
            R`[[name]] متاحة: النوع مضاعش.`
          ],
          sol: R`من غير generic، [[users.get("u1")?.name]] بيطلّع Property 'name' does not exist on type '{ id: string; }'، ونداء [[byId([{ id: "u1", name: "Sara" }])]] نفسه بيطلّع Object literal may only specify known properties, and 'name' does not exist. الدالة بقت شايفة [[{ id: string }]] بس.

الإجابة النموذجية: generics لما دالة أو نوع بيشتغل مع أنواع كتير ولازم يفتكر النوع اللي دخل. مثال حقيقي: [[byId]] دي، أو [[ApiResponse<T>]]، أو [[Repository<T>]]، أو [[useState<T>]]. والـ constraint ([[T extends { id: string }]]) بيضمن الحد الأدنى اللي الدالة محتاجاه. وقول إن any مش بديل، لأنها بتضيّع النوع.`
        },
        {
          cmd: "نوع مفيهوش قيم",
          title: "يعني إيه never وبتستخدمه فين؟ (What is never?)",
          desc: R`never هو النوع الفاضي: مفيش أي قيمة تنفعله. بيظهر في دالة مبترجعش أبدًا (دايمًا بترمي أو فيها loop مبيخلصش)، وفي فرع كود مستحيل يوصله بعد ما كل الاحتمالات اتفحصت. أشهر استخدام عملي: exhaustive check في آخر switch على discriminated union، لو حد ضاف حالة جديدة ومحدش غطّاها، التعيين لـ never يطلّع خطأ. وكمان [[Exclude]] بيستخدمه عشان يشيل أعضاء من union، لأن never بيختفي من أي union.`,
          example: R`type Level = "info" | "error";
function color(l: Level) {
  if (l === "info") return "blue";
  if (l === "error") return "red";
  const x: never = l;
  return x;
}`,
          try: R`ضيف [["warn"]] لـ [[Level]] وشوف الخطأ فين.`,
          flag: "script",
          deep: {
            why: "بيختبر فهمك لنظام الأنواع كمجموعات (unknown في القمة، و never في القاع)، وإنك بتستخدمه عمليًا مش نظري.",
            how: R`فكّر في الأنواع كمجموعات قيم: unknown كل القيم، و never المجموعة الفاضية. و never assignable لأي نوع (الفاضي جزء من أي مجموعة)، ومفيش حاجة assignable ليه غير never. و [[string & number]] بيطلع never لأن مفيش قيمة الاتنين. والفرق عن void: void يعني «الدالة بترجع بس القيمة ملهاش لازمة»، و never يعني «الدالة مبترجعش أصلًا».`,
            when: "«الفرق بين never و void؟»، و «إيه اللي بيحصل لـ never جوه union؟» (بيختفي)، و «إزاي تعمل assertNever؟».",
            mistakes: "«never زي void». و «never يعني null». ومش عارف أي استخدام عملي ليه."
          },
          teach: R`## الفكرة في سطر

[[never]] نوع مفيهوش ولا قيمة، والمثال بيستخدمه كجرس إنذار: لو فيه حالة في الـ union محدش غطّاها، السطر ده يطلّع خطأ. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 على ويندوز 11، ونفس الأخطاء في الاتنين.

---

## ١. الدالة

~~~text app.ts
type Level = "info" | "error";
function color(l: Level) {
  if (l === "info") return "blue";
  if (l === "error") return "red";
~~~

بعد كل [[if]] فيها [[return]]، TS بيشيل الحالة دي من نوع [[l]]:

| المكان | نوع [[l]] |
|---|---|
| أول الدالة | [["info" | "error"]] |
| بعد أول if | [["error"]] |
| بعد التاني | [[never]]: مفضلش حاجة |

---

## ٢. سطر الـ never

~~~text app.ts
  const x: never = l;
  return x;
}
~~~

- [[const x: never = l]]: مسموح بس لو [[l]] نفسها [[never]]، يعني كل الحالات اتغطت.
- [[return x]]: السطر ده عمره ما هيتنفذ، بس بيخلي الدالة تقفل صح.

نوع الدالة كلها طلع:

~~~text الناتج
(l: Level) => "blue" | "red"
~~~

[[never]] مش ظاهر في نوع الرجوع، لأن [[never]] جوه أي union بيختفي.

---

## ٣. التجربة: حالة جديدة

غيّرنا لـ [[type Level = "info" | "error" | "warn"]] من غير ما نلمس الدالة:

~~~text الناتج: npx tsc
app.ts(5,9): error TS2322: Type '"warn"' is not assignable to type 'never'.
~~~

الخطأ فيه اسم الحالة الناقصة بالظبط، وفي المكان اللي لازم تصلّحه.

---

## ٤. أماكن تانية بيظهر فيها never

جرّبنا التلاتة:

~~~text app.ts
function fail(msg: string): never { throw new Error(msg); }
type S = string & number;
type E = Exclude<"a" | "b" | "c", "a">;
~~~

- [[fail]]: دالة مبترجعش أبدًا، فنوع رجوعها [[never]].
- [[string & number]]: مفيش قيمة string ورقم مع بعض، فـ [[const s: S = "a"]] طلّعت [[Type '"a"' is not assignable to type 'never'.]]
- [[Exclude]]: بيحوّل [["a"]] لـ [[never]] فيختفي، و [[E]] = [["b" | "c"]]، و [[const e: E = "a"]] طلّعت [[Type '"a"' is not assignable to type 'E'.]]

---

## الخلاصة

| | [[void]] | [[never]] |
|---|---|---|
| الدالة بترجع؟ | آه، والقيمة ملهاش لازمة | لأ، أبدًا |
| فيه قيم؟ | [[undefined]] | ولا قيمة |
| جوه union | بيفضل | بيختفي |`,
          lines: [
            "union حالتين.",
            "دالة.",
            "حالة.",
            "حالة.",
            R`هنا l نوعها never. لو ضفت [["warn"]] للـ union، السطر ده هيطلّع خطأ.`,
            "unreachable.",
            "قفلة."
          ],
          sol: R`بعد ما تضيف [["warn"]] الخطأ بيطلع على [[const x: never = l]]: Type '"warn"' is not assignable to type 'never' (TS2322)، والرسالة فيها اسم الحالة الناقصة.

الإجابة النموذجية: never نوع مفيهوش ولا قيمة. بيظهر في تلات أماكن: دالة مبترجعش أبدًا (بترمي خطأ أو loop لا نهائي)، واللي بيفضل من union بعد ما كل حالاته اتفحصت، وده اللي بنستخدمه في exhaustive check، والفلترة في conditional types ([[Exclude]] بيرجّع never للحاجة اللي بتتشال). وفرّقه عن void: void بترجع (undefined)، و never مبترجعش أصلًا.`
        },
        {
          cmd: "الشكل مش الاسم",
          title: "TypeScript structural ولا nominal؟ يعني إيه؟ (Structural typing)",
          desc: R`TypeScript structural: نوعين متوافقين لو الشكل متوافق، مش لو الاسم واحد أو فيه وراثة معلنة. أي object فيه الخصايص المطلوبة بالأنواع المطلوبة يعدّي، حتى لو فيه خصايص زيادة. وده عكس Java و C# اللي nominal. والاستثناء: object literal مكتوب مباشرة بيتعمله excess property check. ومن نتايج الموضوع ده إن [[Object.keys]] بترجع [[string[]]]، وإن لو محتاج أفرّق بين [[UserId]] و [[OrderId]] بستخدم branded types.`,
          example: R`class Cat { name = "cat"; }
class Robot { name = "r2"; }
const pet: Cat = new Robot();
type Point = { x: number; y: number };
const p3 = { x: 1, y: 2, z: 3 };
const p: Point = p3;`,
          try: R`اكتب [[const p: Point = { x: 1, y: 2, z: 3 }]] مباشرة وشوف الفرق.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم ليه TS بيقبل حاجات تستغربها، وإنك عارف حدود الأمان في الأنواع.",
            how: R`TS اتصمم عشان يوصف JS، و JS مبني على duck typing: الدالة بتستخدم الخصايص اللي محتاجاها بس، فالمقارنة بالشكل منطقية. والكلاس اللي فيه خاصية [[private]] أو [[#private]] بيبقى nominal تقريبًا، لأن الخاصية الخاصة مرتبطة بالكلاس نفسه. والأنواع بتتمسح، فمفيش حاجة اسمها «النوع ده» وقت التشغيل تتقارن بيها.`,
            when: "«ليه Object.keys مش بيرجع keyof T؟»، و «إزاي تعمل nominal typing؟» (brands)، و «يعني إيه excess property check؟».",
            mistakes: "«TS بيقارن بالاسم». و «لازم implements عشان الكلاس يتقبل كـ interface». و «الخصايص الزيادة دايمًا ممنوعة»."
          },
          teach: R`## الفكرة في سطر

TS بيقارن الأنواع بشكلها (الخصايص وأنواعها) مش باسمها. المثال فيه حالتين بتستغربهم أول مرة، والتجربة فيها الاستثناء. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، والتشغيل بـ [[npx tsx]] على ويندوز 11.

---

## ١. كلاسين ملهمش علاقة ببعض

~~~text app.ts
class Cat { name = "cat"; }
class Robot { name = "r2"; }
const pet: Cat = new Robot();
~~~

- [[name = "cat"]]: خاصية بقيمة أولية، فنوعها string.
- [[const pet: Cat = new Robot()]]: عدّى. [[Cat]] كنوع معناه «object فيه [[name: string]]»، و [[Robot]] فيه كده.

بس وقت التشغيل هو لسه Robot:

~~~text الناتج: console.log(pet, pet instanceof Cat)
Robot { name: 'r2' } false
~~~

[[instanceof]] بيسأل «اتعمل من كلاس Cat؟»، وده سؤال وقت تشغيل، مختلف عن سؤال TS «شكله ماشي؟».

---

## ٢. خاصية زيادة: متغير ولا literal؟

~~~text app.ts
type Point = { x: number; y: number };
const p3 = { x: 1, y: 2, z: 3 };
const p: Point = p3;
~~~

[[p3]] فيه [[z]] زيادة، و [[p: Point = p3]] عدّى: فيه [[x]] و [[y]] بالأنواع الصح، والزيادة مش مشكلة.

أما لو كتبت الـ object مباشرة:

~~~text app.ts
const pd: Point = { x: 1, y: 2, z: 3 };
~~~

~~~text الناتج
error TS2353: Object literal may only specify known properties, and 'z' does not exist in type 'Point'.
~~~

ده الـ excess property check: بيشتغل على object literal مكتوب في نفس المكان بس، لأن [[z]] هنا غالبًا غلطة إملائية أو حاجة نسيت تشيلها.

---

## ٣. الاستثناء: [[#private]]

~~~text app.ts
class Cat2 { #secret = 1; name = "c"; }
class Robot2 { #secret = 1; name = "r"; }
const pet2: Cat2 = new Robot2();
~~~

~~~text الناتج
error TS2322: Type 'Robot2' is not assignable to type 'Cat2'.
  Property '#secret' in type 'Robot2' refers to a different member that cannot be accessed from within type 'Cat2'.
~~~

نفس الشكل بالظبط، بس [[#secret]] مربوطة بالكلاس اللي اتعرّفت فيه، فـ [[#secret]] بتاعة Robot2 حاجة تانية غير بتاعة Cat2. كده الكلاس بقى nominal (بالاسم).

---

## الخلاصة

| الحالة | النتيجة |
|---|---|
| كلاسين بنفس الخصايص | متبادلين |
| متغير فيه خصايص زيادة | مقبول |
| object literal فيه خصايص زيادة | TS2353 |
| كلاس فيه [[#private]] | nominal، مش متبادل |`,
          lines: [
            "كلاس.",
            "كلاس ملوش علاقة بيه بس نفس الشكل.",
            "مقبول: الشكل واحد.",
            "نوع.",
            "فيه خاصية زيادة.",
            "مقبول: متغير مش literal، فمفيش excess check."
          ],
          sol: R`[[const p: Point = { x: 1, y: 2, z: 3 }]] بيطلّع Object literal may only specify known properties, and 'z' does not exist in type 'Point' (TS2353)، أما [[const p: Point = p3]] بيعدّي. الفرق excess property check: بيشتغل بس على object literal مكتوب مباشرة، لأن [[z]] هنا غالبًا غلطة. أما متغير جاهز فـ TS بيفحص الشكل بس، وفيه x و y فبيعدّي.

الإجابة النموذجية: TS structural، يعني بيقارن الشكل مش الاسم، فـ [[Robot]] ينفع مكان [[Cat]] لأن ليهم نفس الخصايص. ولو محتاج nominal (UserId مش OrderId) استخدم branded types أو [[#private]] في الكلاسات.`
        },
        {
          cmd: "الأنواع بتتمسح",
          title: "TypeScript بيعمل إيه وقت التشغيل؟ (What does TS do at runtime?)",
          desc: R`ولا حاجة. شغل TypeScript كله وقت الكتابة والـ build: بيفحص الأنواع، وبعدين بيمسحها ويطلّع JS عادي. المتصفح أو Node بيشغّل JS مفيهوش أي معلومة عن الأنواع. يعني [[as User]] مبيحوّلش حاجة، و [[: User]] على رد API مبيفحصش حاجة، وأي داتا من برّه محتاجة فحص حقيقي بكود أو مكتبة زي Zod. والاستثناءات القليلة اللي بتطلّع كود هي enum و namespaces و parameter properties في الكلاسات، وده سبب إن Node و [[erasableSyntaxOnly]] بيرفضوهم.`,
          example: R`interface User { name: string }
const u = JSON.parse('{"name": 5}') as User;
console.log(typeof u.name); // number`,
          try: R`شغّل المثال بـ tsx وشوف الناتج، وبعدين افتح الـ JS اللي [[tsc]] طلّعه ودوّر على كلمة User.`,
          flag: "script",
          deep: {
            why: "ده أهم سؤال في TS، ولو إجابته غلط باقي الإجابات مش هتفرق. بيكشف إذا كنت فاهم إن الأنواع وعد مش حماية.",
            how: R`فيه مرحلتين: type checking و emit، والأدوات الحديثة (esbuild و Vite و tsx و Node type stripping) بتعمل التانية بس. وعشان الأنواع مش موجودة، مينفعش [[instanceof]] مع interface، ولا تختار سلوك وقت التشغيل على أساس نوع، ولا تقرا نوع T جوه دالة generic (T مش قيمة). و TypeScript مبيضيفش أي overhead على الأداء.`,
            when: "«إزاي تتحقق من داتا API إذن؟»، و «ليه enum مختلف؟»، و «يعني إيه type erasure؟»، و «TS بيحسّن الأداء؟».",
            mistakes: "«TS بيمنع الأخطاء وقت التشغيل». و «as بيحوّل النوع». و «الكود بيبقى أبطأ عشان الأنواع»."
          },
          teach: R`## الفكرة في سطر

المثال بيقول لـ TS إن الداتا [[User]] ([[name]] نص)، والداتا الحقيقية فيها رقم، و TS مش هيعرف. اتجرّب على ويندوز 11 بـ Node 24: الفحص بـ TypeScript 6.0.3 و 7.0.2، والتشغيل بـ [[npx tsx]] وبـ [[node]] مباشرة.

---

## ١. السطور

~~~text app.ts
interface User { name: string }
const u = JSON.parse('{"name": 5}') as User;
console.log(typeof u.name);
~~~

- [[interface User]]: نوع: object فيه [[name]] نص.
- [[JSON.parse('{"name": 5}')]]: بيحوّل النص لـ object، وبيرجّع [[any]] لأن TS ميعرفش النص فيه إيه. هنا [[name]] رقم 5.
- [[as User]]: «صدّقني، ده User». مفيش أي فحص.
- [[typeof u.name]]: [[typeof]] بتاعة JS وقت التشغيل: بترجّع نوع القيمة الحقيقية كنص.

---

## ٢. الفحص والتشغيل

~~~text الناتج: npx tsc --noEmit (TS 6 و 7)
exit=0
~~~

ولا خطأ: TS صدّق. والتشغيل:

~~~text الناتج: npx tsx app.ts
number
~~~

وجرّبنا [[node app.ts]] على Node 24 مباشرة (بيمسح الأنواع ويشغّل من غير فحص): نفس الناتج [[number]].

---

## ٣. الـ JS اللي بيطلع

~~~text app.js (من tsc، و TS 7 طلّع نفس الملف بالحرف)
"use strict";
const u = JSON.parse('{"name": 5}');
console.log(typeof u.name); // number
~~~

الـ [[interface]] كله اختفى، و [[as User]] اختفت. دوّرنا على كلمة [[User]] في الملف: صفر مرة. مفيش حاجة من الأنواع وصلت للتشغيل.

---

## الخلاصة

| المرحلة | بيحصل إيه |
|---|---|
| الكتابة و [[tsc]] | فحص الأنواع، و [[as]] بتسكّته |
| الـ build | الأنواع بتتمسح |
| التشغيل | JS عادي، والداتا زي ما هي |

الداتا اللي من برّه محتاجة فحص بكود حقيقي ([[typeof]] أو Zod)، مش [[as]].`,
          lines: [
            "النوع بيتمسح.",
            "as مبيعملش أي فحص.",
            "بيطبع number، مش string."
          ],
          sol: R`tsx بيطبع [[number]]: [[as User]] مغيّرتش حاجة في الداتا، و [[name]] لسه 5.

والـ JS اللي [[tsc]] طلّعه: [[const u = JSON.parse('{"name": 5}');]] و [[console.log(typeof u.name);]] بس، وكلمة User مش موجودة خالص، لا الـ interface ولا الـ as. الإجابة النموذجية: TS مبيعملش أي حاجة وقت التشغيل. بيفحص وقت الكتابة والـ build، وبعدين الأنواع بتتمسح. فالداتا اللي جاية من برّه لازم تتفحص بكود حقيقي (Zod أو type guards).`
        },
        {
          cmd: "بيطلّع كود runtime",
          title: "ليه ناس كتير بتتجنب enum؟ وإيه البديل؟ (Enums pitfalls)",
          desc: R`enum من الحاجات القليلة في TS اللي مش بتتمسح: بيتحوّل لـ object حقيقي في الـ JS، فمبيشتغلش مع Node type stripping ولا مع [[erasableSyntaxOnly]]. والـ numeric enums فيها reverse mapping، فـ [[Object.keys]] بيرجع ضعف العدد، ولو القيم متخزنة كأرقام وضفت عضو في النص، الترتيب يبوظ. والـ string enums nominal، فالـ string الجاية من API لازم تتحول. والبديل: union من literals، ولو محتاج القيم وقت التشغيل object بـ [[as const]] ونوع طالع منه، وده نفس اللي Prisma 7 بيولّده.`,
          example: R`enum Dir { Up, Down }
console.log(Object.keys(Dir)); // ["0", "1", "Up", "Down"]
const Dir2 = { Up: "UP", Down: "DOWN" } as const;
type Dir2 = (typeof Dir2)[keyof typeof Dir2];`,
          try: R`شغّل المثال بـ [[node file.ts]] على Node 24 وشوف الخطأ، وبـ [[npx tsx file.ts]] وشوف الناتج.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك عارف إن TS مش «أنواع بس» في كل حتة، ومتابع اتجاه الأدوات الحديثة.",
            how: R`[[const enum]] بيتشال ويتحط مكانه القيمة، بس بيعتمد إن الـ compiler شايف كل الملفات، فمبيشتغلش مع [[isolatedModules]] (Vite و esbuild و Babel). وفيه حالات enum مقبول فيها: مشروع قايم عليه، أو لو عايز سلوك nominal. والأهم تكون القيم string صريحة.`,
            when: "«الفرق بين enum و const enum؟»، و «إزاي تطلّع union من object؟»، و «يعني إيه erasableSyntaxOnly؟».",
            mistakes: "«enum مجرد نوع وبيتمسح». و «enum أسرع». و «مفيش بديل»."
          },
          teach: R`## الفكرة في سطر

[[enum]] من الحاجات القليلة في TS اللي بتطلّع كود حقيقي، والمثال بيقارنه بالبديل: object بـ [[as const]] ونوع طالع منه. اتجرّب على ويندوز 11 بـ Node 24: الفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، والتشغيل بـ [[npx tsx]] و [[node]].

---

## ١. الـ enum والـ JS اللي بيطلع منه

~~~text app.ts
enum Dir { Up, Down }
~~~

من غير قيم، الأعضاء بياخدوا أرقام من 0: [[Up = 0]] و [[Down = 1]]. وده اللي [[tsc]] طلّعه:

~~~text app.js
var Dir;
(function (Dir) {
    Dir[Dir["Up"] = 0] = "Up";
    Dir[Dir["Down"] = 1] = "Down";
})(Dir || (Dir = {}));
~~~

اقرا [[Dir[Dir["Up"] = 0] = "Up"]] من جوه لبرّه: [[Dir["Up"] = 0]] بتحط 0 وبترجّعها، وبعدين [[Dir[0] = "Up"]]. يعني كل عضو بيتكتب مرتين: الاسم للرقم، والرقم للاسم (reverse mapping).

---

## ٢. [[Object.keys]]

~~~text app.ts
console.log(Object.keys(Dir));
~~~

~~~text الناتج: npx tsx app.ts
[ '0', '1', 'Up', 'Down' ]
~~~

وطبعنا [[Dir]] كله: [[{ '0': 'Up', '1': 'Down', Up: 0, Down: 1 }]]. عشان كده أي loop على الـ enum بيلف ٤ مرات مش ٢.

---

## ٣. [[node]] مباشرة

~~~text الناتج: node app.ts (Node 24)
SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode
~~~

Node بيمسح الأنواع بس (strip-only)، والـ enum مش نوع يتمسح: محتاج كود يتولّد. ونفس الكلام لو شغّلت [[--erasableSyntaxOnly]] في [[tsc]]:

~~~text الناتج (TS 6 و 7)
app.ts(1,6): error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
~~~

---

## ٤. البديل

~~~text app.ts
const Dir2 = { Up: "UP", Down: "DOWN" } as const;
type Dir2 = (typeof Dir2)[keyof typeof Dir2];
~~~

- [[as const]]: القيم تفضل [["UP"]] و [["DOWN"]] بالظبط (مش string)، والـ object readonly.
- [[typeof Dir2]]: نوع الـ object.
- [[keyof typeof Dir2]]: أسماء المفاتيح: [["Up" | "Down"]].
- [[(...)[...]]]: indexed access: «هات نوع القيم عند المفاتيح دي» = [["UP" | "DOWN"]].
- نفس الاسم [[Dir2]] للقيمة وللنوع، زي الـ enum بالظبط.

جرّبنا:

~~~text app.ts
const ok: Dir2 = Dir2.Up;
const d: Dir2 = "LEFT";
~~~

~~~text الناتج
error TS2322: Type '"LEFT"' is not assignable to type 'Dir2'.
~~~

الأول عدّى، والتاني اتمسك. و [[Object.keys(Dir2)]] بترجّع [[[ 'Up', 'Down' ]]] بس. وده كله JS عادي، فـ [[node]] بيشغّله.

---

## ٥. فخ الـ numeric enum

~~~text app.ts
function move(x: Dir) { return x; }
move(42);
const n: number = 42;
move(n);
~~~

- [[move(42)]]: [[error TS2345: Argument of type '42' is not assignable to parameter of type 'Dir'.]] لأن 42 رقم ثابت معروف ومش من القيم.
- [[move(n)]]: عدّى! [[n]] نوعها [[number]] عام، و TS بيقبل أي number مكان numeric enum.

---

## الخلاصة

| | [[enum Dir]] | [[as const]] + union |
|---|---|---|
| بيطلّع كود | آه، object بـ reverse mapping | الـ object اللي انت كتبته بس |
| [[Object.keys]] | الأرقام والأسماء | الأسماء |
| [[node file.ts]] و [[erasableSyntaxOnly]] | مرفوض | شغال |
| أي [[number]] يعدّي | آه | لأ |`,
          lines: [
            "numeric enum.",
            R`بيطبع ٤ مفاتيح مش ٢: reverse mapping.`,
            "البديل: object ثابت.",
            R`النوع: [["UP" | "DOWN"]].`
          ],
          sol: R`[[node file.ts]]: [[SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode]]. و [[npx tsx file.ts]] بيطبع [[[ '0', '1', 'Up', 'Down' ]]].

الإجابة النموذجية: enum مش نوع وبس، ده بيطلّع object حقيقي. الـ numeric enum فيه reverse mapping، فـ [[Object.keys]] بيطلّع الأرقام والأسماء. ومش شغال مع strip-only (Node و [[erasableSyntaxOnly]])، وكمان الـ numeric enum بيقبل أي متغير نوعه number، حتى لو قيمته مش من الـ enum. البديل: [[as const]] object مع union type مشتق منه، أو union من strings على طول.`
        },
        {
          cmd: "أنواع مشتقة من نوع واحد",
          title: "اذكر utility types بتستخدمها في الشغل وليه (Utility types)",
          desc: R`بستخدمهم عشان أعمل أنواع مشتقة من موديل واحد بدل ما أكرر: [[Omit<User, "password">]] للي بيرجع للـ client، و [[Partial]] للـ PATCH، و [[Pick]] للقوايم، و [[Record<Role, string[]>]] لقاموس لازم يغطي كل الأدوار. ومن الدوال: [[ReturnType]] و [[Parameters]] و [[Awaited]] لما النوع مش متصدّر. و [[NonNullable]] و [[Exclude]] لتعديل unions. والميزة إن لما الموديل يتغير، كل الأنواع المشتقة تتغير معاه.`,
          example: R`type User = { id: string; email: string; password: string };
type PublicUser = Omit<User, "password">;
type UserPatch = Partial<Omit<User, "id">>;`,
          try: R`اكتب [[Partial]] بنفسك كـ mapped type وقارنه بالأصلي بالماوس.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتكتب أنواع سهلة الصيانة، ومش بتنسخ نفس الشكل في عشر أماكن.",
            how: R`كلهم معمولين في lib.es5.d.ts بـ mapped types ([[Partial]] و [[Pick]] و [[Record]]) أو conditional types ([[Exclude]] و [[ReturnType]]). و [[Omit]] مش بيتأكد إن المفتاح موجود، فغلطة إملائية بتعدّي. و Partial سطحي. و Omit على union بيبوّظ الـ discriminated union.`,
            when: "«اكتبلي Partial بنفسك»، و «الفرق بين Omit و Exclude؟»، و «ReturnType بيشتغل إزاي؟» (infer).",
            mistakes: "«Omit بيشيل الخاصية من الداتا». وخلط Exclude (بيشيل من union) مع Omit (بيشيل خصايص). وتحفظ أسماء من غير مثال عملي."
          },
          teach: R`## الفكرة في سطر

موديل واحد [[User]]، ومنه نوعين مشتقين: واحد للي بيرجع للـ client، وواحد للتعديل. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 على ويندوز 11، ونفس الأخطاء بالحرف في الاتنين.

---

## ١. الموديل

~~~text app.ts
type User = { id: string; email: string; password: string };
~~~

---

## ٢. [[Omit]]: شيل خاصية

~~~text app.ts
type PublicUser = Omit<User, "password">;
~~~

[[Omit<T, K>]] = نفس T من غير المفاتيح K. فـ [[PublicUser]] = [[{ id: string; email: string }]]. جرّبنا الاتنين:

~~~text app.ts
const a: PublicUser = { id: "1", email: "a@b.co", password: "x" };
const d: PublicUser = { id: "1" };
~~~

~~~text الناتج
error TS2353: Object literal may only specify known properties, and 'password' does not exist in type 'PublicUser'.
error TS2741: Property 'email' is missing in type '{ id: string; }' but required in type 'PublicUser'.
~~~

---

## ٣. [[Partial<Omit<...>>]]: من جوه لبرّه

~~~text app.ts
type UserPatch = Partial<Omit<User, "id">>;
~~~

1. [[Omit<User, "id">]]: [[{ email; password }]]، لأن الـ id مبيتعدلش.
2. [[Partial<...>]]: كل خاصية بقت اختيارية: [[{ email?; password? }]]، لأن الـ PATCH بيبعت اللي اتغير بس.

[[const b: UserPatch = {}]] عدّى، و [[{ id: "2" }]]:

~~~text الناتج
error TS2353: Object literal may only specify known properties, and 'id' does not exist in type 'Partial<Omit<User, "id">>'.
~~~

---

## ٤. فخ: [[Omit]] مبيفحصش الاسم

~~~text app.ts
type Typo = Omit<User, "pasword">;
~~~

غلطة إملائية في [["pasword"]] ومفيش خطأ عند التعريف. النوع لسه فيه [[password]]، والخطأ بيطلع بعدين في مكان تاني:

~~~text الناتج: const e: Typo = { id: "1", email: "e" }
error TS2741: Property 'password' is missing in type '{ id: string; email: string; }' but required in type 'Typo'.
~~~

---

## ٥. التجربة: [[Partial]] بإيدك

~~~text app.ts
type MyPartial<T> = { [K in keyof T]?: T[K] };
~~~

- [[keyof T]]: كل أسماء المفاتيح.
- [[[K in ...]]]: mapped type: لف على كل مفتاح.
- [[?]]: خليه اختياري.
- [[T[K]]]: بنفس نوعه الأصلي.

[[const m1: MyPartial<User> = {} as Partial<User>]] والعكس عدّوا من غير خطأ: نفس النوع. والغلطة الشائعة إنك تكتب [[T[K] | undefined]] بدل [[?]]:

~~~text الناتج: const w: Wrong<User> = {}
error TS2739: Type '{}' is missing the following properties from type 'Wrong<User>': id, email, password
~~~

المفاتيح لسه إجبارية، بس قيمتها ممكن تبقى undefined.

---

## الخلاصة

| النوع | بيعمل إيه | مثال |
|---|---|---|
| [[Omit<T, K>]] | يشيل مفاتيح (من غير ما يتأكد إنها موجودة) | [[PublicUser]] |
| [[Partial<T>]] | كله اختياري | الـ PATCH |
| [[Pick<T, K>]] | ياخد مفاتيح بس | previews |
| [[Record<K, V>]] | قاموس مفاتيحه K | أدوار وصلاحيات |`,
          lines: [
            "الموديل.",
            "للـ client.",
            "للتحديث."
          ],
          sol: R`[[type MyPartial<T> = { [K in keyof T]?: T[K] }]]. لو حطيت الماوس على [[MyPartial<User>]] و [[Partial<User>]] هتلاقي نفس الشكل [[{ id?: string; email?: string; password?: string }]]، والاتنين بيتبدلوا من غير خطأ. ولو فتحت تعريف [[Partial]] (F12) هتلاقيه نفس السطر ده حرفيًا.

الغلطة الشائعة: تكتب [[T[K] | undefined]] من غير [[?]]. ساعتها المفاتيح لسه إجبارية و [[{}]] بيطلّع missing the following properties. وفي الانترفيو قول utility types اللي بتستخدمها وليه: [[Omit]] عشان تشيل password، و [[Partial]] للـ PATCH، و [[Pick]] للـ previews، و [[Record]] للقواميس، و [[ReturnType]] و [[Awaited]] عشان متكررش أنواع.`,
          solCode: R`type User = { id: string; email: string; password: string };
type MyPartial<T> = { [K in keyof T]?: T[K] };
const a: MyPartial<User> = {} as Partial<User>; // نفس النوع
const b: Partial<User> = {} as MyPartial<User>;`
        },
        {
          cmd: "control flow analysis",
          title: "يعني إيه narrowing؟ وإزاي بتعمله؟ (Type narrowing)",
          desc: R`narrowing إن TS يضيّق union لنوع أصغر بناءً على فحص في الكود. بيتابع الـ if والـ switch والـ return: بعد [[typeof x === "string"]] هو عارف إن x string جوه الفرع ده. الأدوات: [[typeof]] للـ primitives، و [[instanceof]] للكلاسات، و [[in]] لوجود خاصية، و equality، و discriminated unions بخاصية literal مشتركة، و type predicates ([[x is User]]) للفحوصات المعقدة. والأهم إن الفحص كود JS حقيقي، فبيحمي وقت التشغيل كمان.`,
          example: R`type Res = { ok: true; data: string } | { ok: false; error: string };
function show(r: Res) {
  return r.ok ? r.data : r.error;
}`,
          try: R`جرّب [[r.data]] من غير الفحص واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتشتغل مع unions صح من غير as، وده أساس أي كود TS نضيف.",
            how: R`TS بيعمل control flow analysis ويحسب نوع كل متغير في كل نقطة. والتضييق ممكن يضيع جوه callbacks لو القيمة ممكن تتغير (property على object أو let)، فخزّنها في const. والـ truthiness بيشيل 0 و "" مع null. ومن TS 5.5، [[filter]] بيستنتج type predicate لوحده للفحوصات البسيطة.`,
            when: "«إيه هو type guard؟»، و «الفرق بين is و asserts؟»، و «exhaustive check؟»، و «ليه instanceof مبيشتغلش مع interface؟».",
            mistakes: "«بعمل as». و «typeof x === \"User\"». ونسيان إن typeof null هو \"object\"."
          },
          teach: R`## الفكرة في سطر

[[Res]] union من شكلين، والخاصية [[ok]] هي اللي بتفرّق. بعد ما تفحصها، TS عارف أنهي شكل معاك. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، والتشغيل بـ [[npx tsx]] على ويندوز 11.

---

## ١. النوع

~~~text app.ts
type Res = { ok: true; data: string } | { ok: false; error: string };
~~~

- [[ok: true]] و [[ok: false]]: literal types، مش [[boolean]]. كل شكل ليه قيمة ثابتة.
- الشكل الأول فيه [[data]]، والتاني فيه [[error]].

---

## ٢. الدالة

~~~text app.ts
function show(r: Res) {
  return r.ok ? r.data : r.error;
}
~~~

- [[cond ? a : b]]: ternary: لو الشرط true رجّع a، وإلا b.
- بعد [[r.ok]] TS ضيّق النوع. حطينا [[r]] في متغير [[boolean]] جوه كل فرع عشان نشوف:

| الفرع | نوع [[r]] |
|---|---|
| [[r.ok]] true | [[{ ok: true; data: string; }]] |
| false | [[{ ok: false; error: string; }]] |

~~~text الناتج: console.log(show({ ok: true, data: "تمام" }), show({ ok: false, error: "وقع" }))
تمام وقع
~~~

---

## ٣. من غير فحص

~~~text app.ts
function show2(r: Res) {
  return r.data;
}
~~~

~~~text الناتج
error TS2339: Property 'data' does not exist on type 'Res'.
  Property 'data' does not exist on type '{ ok: false; error: string; }'.
~~~

السطر التاني بيقولك أنهي شكل بالظبط ممكن ميكونش فيه [[data]].

---

## الخلاصة

| أداة التضييق | لإيه |
|---|---|
| [[typeof x === "string"]] | الأنواع البسيطة |
| [[x instanceof Date]] | الكلاسات |
| [["data" in x]] | وجود خاصية |
| [[x.ok]] أو [[x.status === "..."]] | discriminated unions |
| [[x is User]] | فحص معقد في دالة |

وكلهم كود JS حقيقي، فبيحموا وقت التشغيل كمان، مش بس بيرضّوا TS.`,
          lines: [
            "discriminated union.",
            "دالة.",
            R`بعد [[r.ok]]، كل فرع عارف شكله.`,
            "قفلة."
          ],
          sol: R`[[return r.data]] من غير فحص بيطلّع Property 'data' does not exist on type 'Res'. Property 'data' does not exist on type '{ ok: false; error: string; }' (TS2339). يعني TS بيقولك بالظبط أنهي حالة ممكن متكونش فيها [[data]].

الإجابة النموذجية: narrowing هو إن TS بيتابع الكود (if و return و switch) ويضيّق النوع في كل فرع. الأدوات: [[typeof]] و [[instanceof]] و [[in]] والمقارنة بـ [[===]]، و discriminant زي [[ok]] أو [[status]]، و type predicates بـ [[is]]، و assertion functions. ومن غير narrowing، union زي [[Res]] ملوش فايدة.`
        },
        {
          cmd: "افحص عند الحدود",
          title: "إزاي تكتب نوع لرد API بأمان؟ (Typing API responses safely)",
          desc: R`رد API نوعه any، وأي نوع أحطه عليه بـ [[as]] أو annotation مجرد وعد. فالرد بعتبره [[unknown]]، وأفحصه بـ schema (Zod مثلًا) عند الحدود، والنوع يطلع من الـ schema بـ [[z.infer]]. وقبلها أفحص [[res.ok]]. لو الشكل اتغير، بيطلع ZodError واضح في مكان واحد بدل undefined في الـ UI. ولو الـ API بتاعي في نفس الـ monorepo، بشارك الـ schemas بين الـ front والـ back.`,
          example: R`import * as z from "zod";
const Todo = z.object({ id: z.number(), title: z.string() });
const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const todo = Todo.parse(await res.json());`,
          try: R`غيّر [[title: z.string()]] لـ [[z.number()]] وشوف الخطأ وقت التشغيل.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الأنواع بتتمسح، وإنك بتحمي التطبيق من الحاجات اللي برّه سيطرتك.",
            how: R`فكرة الحدود (trust boundaries): جوه الكود ثق في الأنواع، وعند أي مدخل من برّه افحص. و generic زي [[fetchJson<T>]] من غير فحص هو [[as]] متنكّر. والبدائل لـ Zod: مكتبات أصغر زي Valibot، أو type guards بإيدك، أو توليد الأنواع والـ client من OpenAPI، أو tRPC لو الناحيتين TS.`,
            when: "«ليه مش as؟»، و «إيه الفرق بين parse و safeParse؟»، و «Zod بيأثر على حجم الـ bundle؟»، و «إزاي تشارك الأنواع بين front و back؟».",
            mistakes: R`[[await res.json() as User]]. و «TS بيفحص الرد». و «بكتب interface للرد وخلاص».`
          },
          teach: R`## الفكرة في سطر

٤ سطور: schema، و fetch، و parse. الـ parse هو اللي بيحوّل الرد من «أي حاجة» لنوع مفحوص فعلًا. الأنواع اتفحصت بـ TypeScript 6.0.3 و 7.0.2، والتشغيل بـ [[npx tsx]] و Zod 4.6.5 على ويندوز 11.

> [[jsonplaceholder.typicode.com]] كان مقفول من الشبكة وقت التجربة ([[fetch failed]] و [[ECONNRESET]])، فشغّلنا نفس الكود على سيرفر محلي صغير بيرجّع نفس الرد اللي الموقع موثّقه لـ [[/todos/1]]: [[{"userId":1,"id":1,"title":"delectus aut autem","completed":false}]].

---

## ١. السطور

~~~text app.ts
import * as z from "zod";
const Todo = z.object({ id: z.number(), title: z.string() });
const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
const todo = Todo.parse(await res.json());
~~~

- [[Todo]]: schema لحقلين بس من ٤. اللي مش محتاجه مبتوصفهوش.
- [[await fetch(...)]]: الطلب. [[await]] برّه أي دالة مسموحة لأن الملف ESM.
- [[await res.json()]]: الـ body كـ object، ونوعه [[any]].
- [[Todo.parse(...)]]: الفحص. لو سليم بيرجّع الداتا بالنوع، ولو لأ بيرمي.

نوع [[todo]] (TS 6 و 7):

~~~text الناتج
{ id: number; title: string; }
~~~

والتشغيل:

~~~text الناتج: console.log(todo)
{ id: 1, title: 'delectus aut autem' }
~~~

[[userId]] و [[completed]] اتشالوا: الـ parse بيرجّع اللي في الـ schema بس.

---

## ٢. التجربة: الرد مش زي ما فاكر

غيّرنا [[title]] لـ [[z.number()]]:

~~~text الناتج
const todo = Todo.parse(await res.json());
                  ^

ZodError: [
  {
    "expected": "number",
    "code": "invalid_type",
    "path": [
      "title"
    ],
    "message": "Invalid input: expected number, received string"
  }
]
~~~

[[tsc]] نفسه مطلّعش أي خطأ: الكود متسق مع نفسه. الغلط اتكشف وقت التشغيل لما الداتا الحقيقية وصلت، وعند الحدود، باسم الحقل.

---

## الخلاصة

| الطريقة | فيه فحص وقت التشغيل؟ |
|---|---|
| [[await res.json() as Todo]] | لأ |
| [[const t: Todo = await res.json()]] | لأ ([[any]] بيعدّي) |
| [[Todo.parse(await res.json())]] | آه، والنوع طالع منه |

وقبل الـ parse افحص [[res.ok]] (درس typed fetch).`,
          lines: [
            "Zod.",
            "schema للحاجات اللي هتستخدمها.",
            "الطلب.",
            R`فحص حقيقي، و [[todo]] نوعها [[{ id: number; title: string }]].`
          ],
          sol: R`مع [[title: z.number()]] الـ parse بيرمي [[ZodError]] فيه [["expected": "number"]] و [["path": [ "title" ]]] و [["message": "Invalid input: expected number, received string"]]. TS نفسه مطلّعش أي خطأ، لأن الـ schema متسقة مع نفسها، والغلط اتكشف وقت التشغيل لما الداتا الحقيقية وصلت.

الإجابة النموذجية: رد الـ API نوعه unknown لحد ما يتفحص. [[as Todo]] كذب على TS، و Zod (أو type guard) بيفحص فعلًا وبيدّيك النوع في نفس الوقت. افحص عند الحدود (fetch و req.body و env و localStorage)، وجوه الكود ثق في الأنواع. وخليك فاكر [[res.ok]] قبل الـ parse، وقرر هتعمل إيه مع الـ ZodError: log وخطأ واضح، مش crash.`
        },
        {
          cmd: "فحص، تصديق، فحص بنوع دقيق",
          title: "الفرق بين : Type و as Type و satisfies Type؟ (annotation vs assertion vs satisfies)",
          desc: R`[[const x: T = v]] بيفحص إن v مطابقة لـ T، ونوع x يبقى T. و [[v as T]] مبيفحصش بجد: بيقول للـ compiler «صدّقني» طالما النوعين مش مستحيلين، فممكن يخبّي bugs. و [[v satisfies T]] بيفحص زي الـ annotation، بس بيسيب نوع x هو النوع الدقيق المستنتج، فمبخسرش التفاصيل. عمليًا: annotation للباراميترات والحدود، و satisfies للإعدادات والقواميس، و as آخر حل بعد فحص TS مش فاهمه.`,
          example: R`type Cfg = Record<string, string | number>;
const a: Cfg = { port: 3000 };
const b = { port: 3000 } satisfies Cfg;
const c = {} as Cfg;`,
          try: R`جرّب [[a.port.toFixed()]] و [[b.port.toFixed()]] وقارن.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك عارف الفرق بين إنك تثبت حاجة للـ compiler وإنك تسكّته.",
            how: R`[[satisfies]] موجود من TS 4.9. ومعاه [[as const]]: [[{ ... } as const satisfies Cfg]] بيثبّت القيم ويفحصها. و [[as]] بيرفض بس التحويلات المستحيلة (string لـ number)، و [[as unknown as]] بيعدّي أي حاجة.`,
            when: "«إمتى as مقبولة؟»، و «إيه as const؟»، و «ليه satisfies مفيدة مع Prisma select؟».",
            mistakes: "«satisfies زي as». و «as بيحوّل القيمة». واستخدام as عشان الأخطاء تختفي."
          },
          teach: R`## الفكرة في سطر

نفس الـ object [[{ port: 3000 }]] بـ ٣ طرق، وكل طريقة بتسيب نوع مختلف للمتغير. اتجرّب بـ [[npx tsc --noEmit]] على TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، والتشغيل بـ [[npx tsx]] على ويندوز 11.

---

## ١. النوع

~~~text app.ts
type Cfg = Record<string, string | number>;
~~~

قاموس: أي مفتاح string، وقيمته string أو number.

---

## ٢. التلات سطور ونوع كل متغير

~~~text app.ts
const a: Cfg = { port: 3000 };
const b = { port: 3000 } satisfies Cfg;
const c = {} as Cfg;
~~~

حطينا كل واحد في متغير [[boolean]] و TS كتب نوعه:

| المتغير | الطريقة | النوع اللي فضل |
|---|---|---|
| [[a]] | annotation [[: Cfg]] | [[Cfg]] |
| [[b]] | [[satisfies Cfg]] | [[{ port: number; }]] |
| [[c]] | [[as Cfg]] | [[Cfg]] |

---

## ٣. التجربة: [[.toFixed()]]

~~~text app.ts
a.port.toFixed();
b.port.toFixed();
~~~

~~~text الناتج
error TS2339: Property 'toFixed' does not exist on type 'string | number'.
  Property 'toFixed' does not exist on type 'string'.
~~~

على [[a]] بس. الـ annotation خلّت النوع Cfg، فـ [[port]] ممكن تبقى string. أما [[b]] فالنوع الدقيق فضل، و [[port]] رقم.

---

## ٤. الفحص: مين بيمسك الغلط؟

~~~text app.ts
const d = { port: true } satisfies Cfg;
const e = { port: true } as Cfg;
~~~

~~~text الناتج
error TS2322: Type 'boolean' is not assignable to type 'string | number'.
error TS2352: Conversion of type '{ port: boolean; }' to type 'Cfg' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
~~~

- [[satisfies]] فحص فعلًا.
- [[as]] رفض هنا بس لأن [[boolean]] مستحيل يبقى string أو number. والرسالة نفسها بتقولك تعدّيه بـ [[unknown]]: [[5 as unknown as Cfg]] عدّى من غير ولا كلمة.

---

## ٥. [[as]] على نوع فيه خصايص إجبارية

~~~text app.ts
type Need = { port: number; host: string };
const g = {} as Need;
const h: Need = {};
console.log(g.host);
~~~

~~~text الناتج: npx tsc
error TS2739: Type '{}' is missing the following properties from type 'Need': port, host
~~~

على [[h]] بس. [[g]] عدّت، ووقت التشغيل:

~~~text الناتج: npx tsx
undefined
~~~

النوع بيقول [[host]] string، والقيمة [[undefined]].

---

## الخلاصة

| | بيفحص؟ | نوع المتغير |
|---|---|---|
| [[: Type]] | آه | Type (العام) |
| [[satisfies Type]] | آه | الدقيق المستنتج |
| [[as Type]] | بس بيرفض المستحيل | Type |`,
          lines: [
            "نوع عام.",
            R`[[a.port]] نوعها [[string | number]].`,
            R`[[b.port]] نوعها number.`,
            R`[[as]] مبيفحصش الشكل. هنا [[{}]] بالصدفة Cfg سليم (Record ممكن يبقى فاضي)، بس لو Cfg فيه خصايص إجبارية، [[as]] كانت هتعدّي الـ object الناقص، والـ annotation كانت هترفضه.`
          ],
          sol: R`[[a.port.toFixed()]] بيطلّع Property 'toFixed' does not exist on type 'string | number' (TS2339)، لأن الـ annotation خلّت النوع [[Cfg]]، فـ port ممكن تبقى string. (ومع [[noUncheckedIndexedAccess]] كمان possibly undefined.) أما [[b.port.toFixed()]] بيعدّي، لأن satisfies فحصت، وسابت النوع الدقيق [[{ port: number }]].

الإجابة النموذجية: [[: Type]] بيفحص وبيغيّر نوع المتغير للنوع العام. و [[as Type]] مش بيفحص تقريبًا، ده تصديق منك ([[{} as Cfg]] بيعدّي). و [[satisfies Type]] بيفحص وبيسيب النوع المستنتج. استخدم satisfies للـ config والـ objects الثابتة، و annotation لباراميترات الدوال والـ API العامة، و as بس لما انت فعلًا عارف أكتر من TS.`
        },
        {
          cmd: "strict أولًا",
          title: "إيه أهم إعدادات tsconfig بتبدأ بيها أي مشروع؟ (Essential tsconfig options)",
          desc: R`أول حاجة [[strict: true]]، ودي بتشغّل strictNullChecks و noImplicitAny وباقي العيلة، وبقت الافتراضي في TS 6 و 7 بس بكتبها صريح. وبضيف [[noUncheckedIndexedAccess]] عشان [[arr[0]]] تبقى ممكن undefined. وبعدين [[module]] و [[moduleResolution]] حسب البيئة: [[bundler]] مع Vite أو Next، و [[nodenext]] لسيرفر Node بيتبني بـ tsc. و [[target]] حديث زي es2024، و [[types: ["node"]]] في Node، و [[skipLibCheck]] للسرعة، و [[verbatimModuleSyntax]] عشان [[import type]]. وأخيرًا [[tsc --noEmit]] في CI، لأن الـ bundlers مبتفحصش.`,
          example: R`{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true, "module": "nodenext", "target": "es2024", "types": ["node"], "skipLibCheck": true } }`,
          try: R`افتح tsconfig في آخر مشروع ليك وقارنه بالقايمة دي، وشغّل [[npx tsc --showConfig]] تشوف الإعدادات الفعلية بعد ما يدمج الـ extends (الـ defaults الضمنية زي strict في TS 6 و 7 مش بتظهر فيه).`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفهم الإعدادات مش بتنسخها، وإنك عارف ليه المشروع ممكن يتبني ويقع وقت التشغيل.",
            how: R`TS 6 و 7 غيّروا defaults كتير: strict بقى true، و module بقى esnext، و types بقى فاضي (لازم تكتب node)، و baseUrl و moduleResolution node10 و target es5 اتشالوا في 7. و [[paths]] مبتغيّرش الـ JS الناتج، فالـ runtime لازم يفهمها. و [[isolatedModules]] لازم مع أي أداة بتترجم ملف ملف.`,
            when: "«الفرق بين bundler و nodenext؟»، و «ليه الـ build نجح والتطبيق وقع؟»، و «يعني إيه skipLibCheck؟ آمن؟».",
            mistakes: "«بسيب الـ default». و strict: false «عشان الأخطاء كتير». ونسخ tsconfig من Next لسيرفر Express."
          },
          teach: R`## الفكرة في سطر

المثال tsconfig في سطر واحد، الحد الأدنى لسيرفر Node. هنفكه إعداد إعداد، ونشوف TS بيقراه إزاي بـ [[--showConfig]]. اتجرّب على ويندوز 11 بـ TypeScript 6.0.3 و 7.0.2، في فولدر فيه [[package.json]] ([["type": "module"]]) وملف [[index.ts]].

---

## ١. الإعدادات

~~~text tsconfig.json
{ "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true, "module": "nodenext", "target": "es2024", "types": ["node"], "skipLibCheck": true } }
~~~

| الإعداد | بيعمل إيه | الدرس |
|---|---|---|
| [["strict": true]] | عيلة الفحوصات الصارمة | strict و noUncheckedIndexedAccess |
| [["noUncheckedIndexedAccess": true]] | [[arr[i]]] ممكن undefined | نفس الدرس |
| [["module": "nodenext"]] | الناتج والـ resolution زي Node | module و moduleResolution |
| [["target": "es2024"]] | نسخة الـ JS الناتج | نفس الدرس |
| [["types": ["node"]]] | أنواع [[process]] و [[Buffer]] | نفس الدرس |
| [["skipLibCheck": true]] | متفحصش [[.d.ts]] بتاعة المكتبات | نفس الدرس |

جرّبنا [[const n: number = xs[0];]] و [[xs]] ليستة أرقام:

~~~text الناتج: npx tsc -p . --noEmit
index.ts(2,7): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
~~~

---

## ٢. [[tsc --showConfig]]

بيطبع الإعدادات زي ما TS فهمها، من غير ما يفحص حاجة:

~~~text الناتج (TS 6.0.3)
{
    "compilerOptions": {
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "module": "nodenext",
        "target": "es2024",
        "types": [
            "node"
        ],
        "skipLibCheck": true,
        "moduleResolution": "nodenext",
        "moduleDetection": "force"
    },
    "files": [
        "./index.ts"
    ]
}
~~~

- آخر سطرين في [[compilerOptions]] مكتبناهمش: TS حسبهم من [[module]]. [[moduleDetection: force]] معناها «اعتبر كل ملف module».
- [[files]]: الملفات اللي هيفحصها فعلًا. مفيش [[include]] في الـ config، فخد كل [[.ts]] في الفولدر.
- TS 7.0.2 طبع نفس الحاجة بالظبط، بس رتّب الإعدادات اللي انت كتبتها أبجديًا.

---

## ٣. الـ defaults مش بتظهر

غيّرنا الـ config لـ [[{ "compilerOptions": { "module": "nodenext" } }]] بس:

~~~text الناتج (TS 6 و 7)
{
    "compilerOptions": {
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "moduleDetection": "force"
    },
~~~

مفيش [[strict]]، مع إنه شغال افتراضيًا في TS 6 و 7. يعني [[--showConfig]] مش هيقولك إن الفحص صارم، وأي حد يقرا الملف مش هيعرف. عشان كده اكتبه صريح.

---

## الخلاصة

- الحد الأدنى لسيرفر Node: [[strict]] و [[noUncheckedIndexedAccess]] و [[module: nodenext]] و [[target]] حديث و [[types: ["node"]]] و [[skipLibCheck]].
- [[tsc --showConfig]] بيوريك الإعدادات بعد الدمج والحساب، بس مش بيوريك الـ defaults الضمنية.
- وفي الـ CI: [[tsc --noEmit]]، لأن الـ bundlers و tsx مبيفحصوش أنواع.`,
          lines: [
            "الحد الأدنى لسيرفر Node."
          ],
          sol: R`[[npx tsc --showConfig]] بيطبع الـ config بعد ما يدمج [[extends]] ويضيف الإعدادات اللي بتتحسب من غيرها (زي [[moduleResolution]] من [[module]]). بس مش بيطبع كل الـ defaults: في TS 6 و 7 [[strict]] شغال افتراضيًا ومش هيظهر لو مش مكتوب. عشان كده اكتبه صريح.

الإجابة النموذجية بالترتيب: [[strict: true]]، و [[noUncheckedIndexedAccess]]، و [[module]]/[[moduleResolution]] حسب البيئة ([[nodenext]] لسيرفر بـ tsc، و [[bundler]] مع Vite و Next)، و [[target]] حديث، و [[types: ["node"]]] للسيرفر، و [[skipLibCheck]]، و [[verbatimModuleSyntax]]، و [[tsc --noEmit]] في الـ CI. واذكر ليه كل واحد، مش أساميهم بس.`
        }
      ]
    }
]);

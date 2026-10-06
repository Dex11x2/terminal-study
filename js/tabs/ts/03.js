// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "Unions والأنواع الخاصة",
      l: 1,
      n: "قيمة ممكن تبقى كذا نوع، وقيم محددة بالاسم، و null، و any و unknown و never، وقوايم القيم الثابتة",
      items: [
        {
          cmd: "union types",
          title: "قيمة ممكن تبقى نوع من أكتر من نوع",
          desc: R`[[string | number]] معناها string أو number. TS مش هيسيبك تستخدم غير الحاجات المشتركة بين الاتنين، لحد ما تفحص انت أنهي فيهم (ده اسمه narrowing، وتفاصيله في المستوى ٢).

الـ unions في كل حتة: [[string | null]] لقيمة ممكن تبقى فاضية، و [[User | undefined]] لنتيجة [[find]]، و [["light" | "dark"]] لاختيارات محددة.`,
          example: R`function formatId(id: string | number) {
  id.toUpperCase(); // خطأ: toUpperCase مش موجودة على number
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(0);
}
function len(x: string | string[]) {
  return x.length;
}
formatId(42);
formatId(true); // خطأ: boolean مش من ضمن الاتنين`,
          try: R`امسح السطر التاني، وضيف [[boolean]] للـ union في [[formatId]] وشوف TS هيطلّع خطأ فين (عند [[toFixed]]، لأن اللي فاضل بقى number أو boolean).`,
          flag: "script",
          deep: {
            why: "الداتا الحقيقية مش دايمًا نوع واحد: id جاي من URL يبقى string ومن القاعدة number، والقيمة ممكن تبقى موجودة أو null. من غير union يا إما تكذب في النوع، يا إما any. الـ union بيقول الحقيقة، و TS بيجبرك تتعامل مع كل احتمال.",
            how: R`الـ union مجموعة قيم: [[string | number]] كل القيم اللي string أو number. على القيمة دي مسموحلك بس اللي موجود في كل الأنواع مع بعض. [[length]] موجودة في string وفي array، فمسموحة على [[string | string[]]].

عشان تستخدم حاجة خاصة بنوع، بتفحص بكود JS عادي ([[typeof]] أو [[Array.isArray]] أو [[===]])، و TS بيتابع الفحص ده ويضيّق النوع في كل فرع (control flow analysis). وبعد [[return]] جوه الـ if، TS عارف إن الباقي هو الاحتمال التاني.

ولما تضيف احتمال جديد للـ union، كل مكان مش متعامل معاه بيطلّع خطأ، ودي ميزة: مش هتنسى مكان.`,
            when: "أي قيمة ممكن تبقى أكتر من شكل: [[T | null]] و [[T | undefined]]، ونتايج بتنجح أو تفشل، واختيارات محددة زي حالة الطلب.",
            mistakes: R`union كبير زي [[string | number | boolean | object]] وكل شوية تفحص: غالبًا التصميم محتاج discriminated union (المستوى ٢). وتعمل [[id as string]] بدل ما تفحص، فتكذب على TS ويقع وقت التشغيل.`
          },
          teach: R`## المثال بيعمل إيه؟

دالتين بياخدوا قيمة ممكن تبقى من نوعين. الأولى بتوريك إن TS بيمنعك تستخدم حاجة خاصة بنوع واحد لحد ما تفحص، والتانية بتوريك إن الحاجة المشتركة مسموحة على طول. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، واتشغّل بـ [[tsx]].

---

## ١. [[|]]: «أو»

~~~text app.ts
function formatId(id: string | number) {
~~~

[[string | number]] اسمه union: [[id]] يا string يا number. الخط الرأسي [[|]] بين أنواع معناه «أو».

---

## ٢. ممنوع قبل الفحص

~~~text app.ts
  id.toUpperCase();
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(2,6): error TS2339: Property 'toUpperCase' does not exist on type 'string | number'.
  Property 'toUpperCase' does not exist on type 'number'.
~~~

السطر التاني في الرسالة هو المفيد: [[toUpperCase]] موجودة على string، بس **مش** على number. ولو [[id]] طلع رقم، الكود هيقع. وده اللي حصل فعلًا لما شغّلنا المثال بـ [[tsx]] من غير فحص، مع [[formatId(42)]]:

~~~text الناتج: npx tsx app.ts (سطر الخطأ)
TypeError: id.toUpperCase is not a function
~~~

---

## ٣. الفحص بيضيّق النوع

~~~text app.ts
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(0);
}
~~~

- [[typeof id]] كود JS عادي بيرجّع اسم نوع القيمة كنص: [["string"]] أو [["number"]] أو غيرهم.
- [[===]] مقارنة صارمة (من غير تحويل أنواع).
- TS بيقرا الـ if دي وبيفهم: **جوه** الأقواس [[id]] نوعه [[string]] بس. وده اسمه narrowing (التضييق).
- وبعد الـ if: لو كان string كنا رجعنا بـ [[return]]، فاللي وصل هنا لازم number. فـ [[toFixed(0)]] (حوّل الرقم لنص من غير كسور) مسموحة.

الأنواع اللي TS شايفها في كل مكان:

~~~text الأنواع
جوه الـ if   id: string
بعد الـ if   id: number
~~~

---

## ٤. الحاجة المشتركة مسموحة على طول

~~~text app.ts
function len(x: string | string[]) {
  return x.length;
}
~~~

[[length]] موجودة في النص (عدد الحروف) وفي الـ array (عدد العناصر)، فـ TS بيسمح بيها من غير فحص. ونوعها number في الحالتين.

---

## ٥. النداءات

~~~text app.ts
formatId(42);
formatId(true);
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(12,10): error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
~~~

[[true]] مش string ولا number. وبعد ما شلنا السطرين الغلط، الدوال طلّعت:

~~~text الناتج: console.log(formatId(42), formatId("ab12"), formatId(3.7), len("hello"), len(["a","b"]))
42 AB12 4 5 2
~~~

[[toFixed(0)]] بتقرّب، فـ 3.7 بقت [["4"]].

---

## الخلاصة

| الحالة | مسموح؟ |
|---|---|
| حاجة موجودة في كل أنواع الـ union ([[length]]) | أيوة، على طول |
| حاجة في نوع واحد بس ([[toUpperCase]]) | بعد فحص ([[typeof]] أو [[Array.isArray]] أو [[===]]) |
| قيمة مش من أي نوع في الـ union | لأ ([[TS2345]]) |

الفحص كود JS حقيقي بيشتغل وقت التشغيل، و TS بيتابعه ويعرف النوع في كل فرع.`,
          lines: [
            R`[[id]] ممكن يبقى string أو number.`,
            "مينفعش: TS مش ضامن إنه string.",
            "فحص JS عادي، و TS فاهمه.",
            R`هنا جوه الـ if، [[id]] بقى string بس.`,
            "قفلة الـ if.",
            R`بعد الـ if، فاضل number بس، فـ [[toFixed]] مسموحة.`,
            "قفلة.",
            "union تاني.",
            R`[[length]] موجودة في الاتنين، فمسموحة من غير فحص.`,
            "قفلة.",
            "رقم: مقبول.",
            "نوع مش في الـ union."
          ],
          sol: R`الخطأ بيطلع على [[return id.toFixed(0)]]: Property 'toFixed' does not exist on type 'number | boolean' (TS2339). بعد الـ if اللي شال string، اللي فاضل [[number | boolean]]، و [[toFixed]] مش موجودة على boolean.

والحل إنك تفحص boolean كمان، مثلًا [[if (typeof id === "boolean") return id ? "yes" : "no";]] قبل [[toFixed]]. والفكرة: كل ما تزوّد نوع في union، TS بيوريك كل مكان في الكود افترض إن الأنواع أقل.`
        },
        {
          cmd: "literal types",
          title: "نوع قيمه محددة بالاسم، مش أي string",
          desc: R`النوع ممكن يبقى قيمة بعينها: [["GET"]] نوع قيمته الوحيدة [["GET"]]. ومع union: [["GET" | "POST" | "DELETE"]] يعني واحدة من التلاتة دول بس، وأي string تاني خطأ.

ده بيحل مشكلة الـ strings السحرية: TS بيمسك [["DELTE"]] وهي مكتوبة غلط، والمحرر بيكمّلك القيم المسموحة.`,
          example: R`type Method = "GET" | "POST" | "PUT" | "DELETE";
type Size = "sm" | "md" | "lg";
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
function request(url: string, method: Method = "GET") {
  return fetch(url, { method });
}
request("/api/users", "POST");
request("/api/users", "DELTE"); // خطأ: مش من القيم المسموحة
let m = "GET";
request("/api/users", m); // خطأ: m نوعها string، أوسع من Method
const m2 = "GET";
request("/api/users", m2);`,
          try: R`في المحرر اكتب [[request("/x", "]] واستنى: هتلاقي الأربع قيم ظهرتلك. وبعدين غيّر [[let m = "GET"]] لـ [[let m: Method = "GET"]] وشوف الخطأ راح.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي، حالة الطلب [["pending"]] مكتوبة في ١٠ أماكن، وواحد كتب [["Pending"]]. JS مش هيقول حاجة، والفلتر هيرجع فاضي. الـ literal types بتخلي القيم المسموحة جزء من النوع، فالغلط يبان وقت الكتابة.`,
            how: R`كل قيمة primitive ليها نوع literal: [["GET"]] و [[42]] و [[true]]. و [[boolean]] نفسها في الحقيقة [[true | false]].

TS بيستنتج الـ literal لما القيمة مستحيل تتغير ([[const]])، وبيوسّعها (widening) لما ممكن تتغير ([[let]]، أو خاصية جوه object). عشان كده في [[const config = { method: "GET" }]] نوع method هو string مش [["GET"]]، والحل [[as const]] أو إنك تكتب النوع.

وفيه template literal types: [[$__btuser_$__{number}$__bt]] نوع لأي string شكله [[user_]] وبعده رقم. مفيد للـ ids والـ routes، بس متكترش منه.`,
            when: "أي string ليها قيم محددة: حالات (status)، وأدوار (roles)، وأحجام، و HTTP methods، وأسماء events. وغالبًا بدل enum (آخر درس في المستوى ده).",
            mistakes: R`تكتب [[status: string]] وبعدين [[if (status === "actve")]] ومحدش يمسكها. وتحط القيم في object عادي من غير [[as const]] وتستغرب إن النوع بقى string.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل نوع فيه ٤ قيم بس ([[Method]])، ودالة بتقبل واحدة منهم، وبعدين بيجرّب ٤ نداءات: قيمة صح، وغلطة إملائية، ومتغير [[let]]، ومتغير [[const]]. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء).

---

## ١. نوع قيمه بالاسم

~~~text app.ts
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Size = "sm" | "md" | "lg";
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
~~~

- [["GET"]] هنا **نوع** مش قيمة: نوع مفيهوش غير قيمة واحدة، النص [["GET"]]. اسمه literal type.
- [[|]] بين كذا literal: «واحدة من دول». فـ [[Method]] بيقبل ٤ نصوص بالظبط، وأي نص تاني مرفوض.
- [[Dice]] نفس الفكرة بأرقام: من 1 لـ 6 بس. [[7]] أو [[1.5]] مرفوضين.

---

## ٢. الدالة

~~~text app.ts
function request(url: string, method: Method = "GET") {
  return fetch(url, { method });
}
~~~

- [[method: Method = "GET"]]: النوع Method، والقيمة الافتراضية [["GET"]]. فالـ parameter بقى اختياري.
- [[fetch(url, { method })]]: [[fetch]] بتبعت طلب HTTP. و [[{ method }]] اختصار [[{ method: method }]] (لما اسم الخاصية زي اسم المتغير).

ونوع الدالة اللي TS استنتجه:

~~~text النوع
function request(url: string, method?: Method): Promise<Response>
~~~

[[Promise<Response>]] لأن [[fetch]] بترجّع وعد برد هييجي بعدين.

> المثال للمتصفح: [[fetch("/api/users")]] بمسار من غير دومين بيشتغل في صفحة. في Node لما شغّلناه بـ [[tsx]] وقع بـ [[TypeError: Failed to parse URL from /api/users]] لأن Node محتاج URL كامل. الدرس هنا عن الفحص، مش الطلب.

---

## ٣. النداءات الأربعة

~~~text app.ts
request("/api/users", "POST");
request("/api/users", "DELTE");
let m = "GET";
request("/api/users", m);
const m2 = "GET";
request("/api/users", m2);
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(8,23): error TS2345: Argument of type '"DELTE"' is not assignable to parameter of type 'Method | undefined'.
app.ts(10,23): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Method | undefined'.
~~~

ليه [['Method | undefined']] في الرسالة؟ لأن الـ parameter ليه قيمة افتراضية، فمسموح تبعته undefined (وساعتها ياخد "GET").

### [["DELTE"]]

غلطة إملائية. في JS كانت هتتبعت للسيرفر ويرجع خطأ غريب. هنا TS بيمسكها، والمحرر أصلًا بيعرضلك القيم الأربعة وانت بتكتب.

### [[let m = "GET"]]

القيمة [["GET"]] صح، بس الخطأ موجود! السبب في النوع اللي TS استنتجه:

~~~text الأنواع
m: string
m2: "GET"
~~~

- [[let]] ممكن يتغير بعدين لأي نص، فـ TS وسّع نوعه لـ [[string]] (widening). و string أوسع من Method، فمرفوض.
- [[const]] مستحيل يتغير، فنوعه فضل [["GET"]] بالظبط، وده واحد من قيم Method، فعدّى.

والحل للـ let: اكتب النوع بإيدك [[let m: Method = "GET"]].

---

## الخلاصة

| الكود | نوع القيمة | مقبول مكان [[Method]]؟ |
|---|---|---|
| [["POST"]] مكتوبة مباشرة | [["POST"]] | أيوة |
| [["DELTE"]] | [["DELTE"]] | لأ |
| [[let m = "GET"]] | [[string]] | لأ |
| [[const m2 = "GET"]] | [["GET"]] | أيوة |
| [[let m: Method = "GET"]] | [[Method]] | أيوة |

الـ literal types بتحوّل الـ strings السحرية لقايمة مقفولة، و TS بيمسك أي قيمة برّاها.`,
          lines: [
            "union من strings محددة.",
            "زي أحجام زرار في design system.",
            "literal أرقام كمان.",
            "الباراميتر بياخد قيمة من الأربعة بس، والافتراضي GET.",
            R`[[fetch]] بياخد الـ method عادي.`,
            "قفلة.",
            "قيمة مسموحة.",
            "غلطة إملائية مسكها TS.",
            R`[[let]]: النوع اتوسّع لـ string.`,
            "string أوسع من Method، فمرفوض.",
            R`[[const]]: النوع [["GET"]] بالظبط.`,
            "يعدّي."
          ],
          sol: R`بعد [[request("/x", "]] المحرر بيعرض [[DELETE]] و [[GET]] و [[POST]] و [[PUT]] بس، مش أي string. ولو ظهرتلك اقتراحات كتير عشوائية، غالبًا انت في ملف .js أو مفيش TypeScript شغال في المحرر.

وبعد [[let m: Method = "GET"]] الخطأ على [[request("/api/users", m)]] بيختفي، لأن نوع [[m]] بقى [[Method]] مش [[string]]. ولسه الأمان موجود: لو كتبت [[m = "PATCH"]] بعدها هتاخد خطأ عند الـ assignment نفسه.`
        },
        {
          cmd: "null و undefined",
          title: "ليه TS بيعترض لما القيمة ممكن تبقى فاضية",
          desc: R`مع [[strict]] (وجواه [[strictNullChecks]])، [[null]] و [[undefined]] مش جزء من أي نوع غير لو كتبتهم: [[string]] مينفعش تبقى null، و [[string | null]] ينفع. وده بيقفل أشهر خطأ في JS: [[Cannot read properties of undefined]].

دوال كتير بترجع undefined لما متلاقيش حاجة، زي [[find]] و [[Map.get]]، و [[querySelector]] بترجع null، و TS بيجبرك تتعامل مع الاحتمال ده قبل ما تستخدم الناتج.`,
          example: R`type User = { id: number; name: string };
const users: User[] = [{ id: 1, name: "Sara" }];
const found = users.find((u) => u.id === 2);
console.log(found.name); // خطأ: 'found' is possibly 'undefined'
if (found) {
  console.log(found.name);
}
console.log(found?.name ?? "مش موجود");
const input = document.querySelector("input");
input.value = ""; // خطأ: 'input' is possibly 'null'
function getUser(id: number): User | null {
  return users.find((u) => u.id === id) ?? null;
}`,
          try: R`في الـ Playground افتح قايمة TS Config واقفل [[strictNullChecks]]: هتلاقي أخطاء [[found.name]] و [[input.value]] اختفت، وده اللي بيحصل في مشروع مش strict. رجّعها.`,
          flag: "script",
          deep: {
            why: "Tony Hoare، اللي اخترع null، سمّاها «غلطة المليار دولار». أغلب الـ crashes في تطبيقات JS سببها قيمة كانت undefined والكود افترض إنها موجودة. و strictNullChecks بيحوّل الكلاس ده من الأخطاء لخطأ وقت الكتابة.",
            how: R`من غير [[strictNullChecks]]، null و undefined مسموحين في أي نوع، فـ [[const name: string = null]] يعدّي و TS مش بيحميك من حاجة. معاه، هما أنواع منفصلة ولازم تكتبهم في union.

TS بيضيّق النوع بعد أي فحص: [[if (found)]]، و [[if (found !== undefined)]]، و [[if (!found) return]] (early return)، و [[?.]]. بعد الفحص، النوع من غير null و undefined.

الفرق بين الاتنين في JS: [[undefined]] يعني «ملهاش قيمة لسه» (متغير متحطش فيه حاجة، أو خاصية مش موجودة)، و [[null]] يعني «مفيش قيمة، عن قصد». قواعد البيانات والـ APIs غالبًا بترجع null (Prisma و Supabase)، و JS نفسه بيرجع undefined. و [[x == null]] بيمسك الاتنين مع بعض، ودي الحالة الوحيدة اللي [[==]] مقبول فيها عند ناس كتير.

وفي TS 6 و 7 [[strict]] بقى true افتراضيًا، فأي مشروع جديد فيه الحماية دي.`,
            when: "دايمًا شغّال. ولما تكتب دالة ممكن متلاقيش حاجة، خلي نوع الرجوع يقول ده صراحة ([[User | null]]) بدل ما ترمي exception أو ترجّع object فاضي.",
            mistakes: R`تحل الخطأ بـ [[found!.name]]: كده قلت لـ TS «اسكت» والـ crash لسه موجود (درس [[!]] في المستوى ٢). ومشروع قديم [[strict: false]] وتفتكر إن TS بيحميك. وتفحص بـ [[if (count)]] على رقم، فالـ 0 بيتعامل كأنه مش موجود: استخدم [[count !== undefined]].`
          },
          teach: R`## المثال بيعمل إيه؟

بيدوّر على مستخدم مش موجود، وبيحاول يقرا اسمه بـ ٣ طرق: طريقة بتقع، وطريقتين آمنين. وبعدين نفس الحكاية مع عنصر في الصفحة، ودالة بتقول صراحة إنها ممكن ترجّع null. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، والجزء اللي مش محتاج متصفح اتشغّل بـ [[tsx]].

---

## ١. الداتا

~~~text app.ts
type User = { id: number; name: string };
const users: User[] = [{ id: 1, name: "Sara" }];
const found = users.find((u) => u.id === 2);
~~~

- [[User[]]]: ليستة Users.
- [[find]] بتلف على الليستة وبترجّع أول عنصر الشرط بتاعه true. ولو ملقتش، بترجّع [[undefined]].
- مفيش user رقمه 2، فـ [[found]] قيمتها undefined فعلًا.

TS عارف إن [[find]] ممكن متلاقيش، فنوع [[found]]:

~~~text النوع
found: User | undefined
~~~

---

## ٢. الطريقة اللي بتقع

~~~text app.ts
console.log(found.name);
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(4,13): error TS18048: 'found' is possibly 'undefined'.
~~~

[[possibly 'undefined']] يعني «ممكن تبقى undefined». ولو شغّلت من غير فحص، ده اللي حصل:

~~~text الناتج: npx tsx app.ts (سطر الخطأ)
TypeError: Cannot read properties of undefined (reading 'name')
~~~

ده أشهر خطأ في JS، و TS مسكه قبل ما يحصل. والحماية دي جاية من [[strictNullChecks]]، اللي جوه [[strict]].

---

## ٣. الطريقتين الآمنين

~~~text app.ts
if (found) {
  console.log(found.name);
}
console.log(found?.name ?? "مش موجود");
~~~

### [[if (found)]]

undefined بتتحسب false في الـ if، فجوه الأقواس TS عارف إن [[found]] موجودة، ونوعها بقى [[User]] بس.

### [[found?.name ?? "مش موجود"]]

- [[?.]]: لو [[found]] null أو undefined، وقّف ورجّع undefined بدل ما تقع.
- [[??]]: لو اللي قبلها null أو undefined، خُد البديل.

~~~text الناتج
مش موجود
~~~

(الـ if مطبعتش حاجة، لأن found مش موجودة.)

---

## ٤. نفس الحكاية مع الصفحة

~~~text app.ts
const input = document.querySelector("input");
input.value = "";
~~~

- [[document.querySelector("input")]]: هات أول [[<input>]] في الصفحة. ولو مفيش، بترجّع **[[null]]**.
- TS عارف كمان إن [["input"]] معناها عنصر input بالظبط:

~~~text النوع
input: HTMLInputElement | null
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(10,1): error TS18047: 'input' is possibly 'null'.
~~~

نفس الخطأ بس null بدل undefined: [[TS18047]] للـ null و [[TS18048]] للـ undefined. (الجزء ده للمتصفح، و Node معندوش [[document]]؛ الأنواع جاية من الـ compiler بـ [[lib: dom]].)

---

## ٥. دالة صريحة

~~~text app.ts
function getUser(id: number): User | null {
  return users.find((u) => u.id === id) ?? null;
}
~~~

- [[: User | null]]: نوع الرجوع بيقول لأي حد بينادي: «ممكن ملاقيش».
- [[find(...) ?? null]]: [[find]] بترجّع undefined، والدالة وعدت بـ null، فبنحوّل.

~~~text الناتج: console.log(getUser(1), getUser(5))
{ id: 1, name: 'Sara' } null
~~~

---

## الخلاصة

| الدالة | بترجّع إيه لو ملقتش |
|---|---|
| [[arr.find]] و [[map.get]] | [[undefined]] |
| [[document.querySelector]] | [[null]] |
| دالتك ([[getUser]]) | اللي انت كاتبه في النوع |

- مع [[strict]]، [[string]] مبتقبلش null ولا undefined. لو القيمة ممكن تبقى فاضية، النوع لازم يقول كده.
- اتعامل مع الفاضي بـ [[if]] أو [[?.]] و [[??]]، مش بـ [[!]].`,
          lines: [
            "نوع بسيط.",
            "ليستة فيها مستخدم واحد.",
            R`[[find]] بترجع [[User | undefined]]، لأنها ممكن متلاقيش.`,
            "ممنوع: ممكن تبقى undefined وتقع وقت التشغيل.",
            "فحص: جوه الـ if النوع بقى User بس.",
            "آمن.",
            "قفلة.",
            R`أو [[?.]] و [[??]] في سطر واحد.`,
            R`نوعها [[HTMLInputElement | null]]: العنصر ممكن ميكونش في الصفحة.`,
            "نفس الحماية مع DOM.",
            "دالة بتقول صراحة إنها ممكن ترجع null.",
            R`لو [[find]] رجّعت undefined، رجّع null بدالها.`,
            "قفلة."
          ],
          sol: R`بعد ما تقفل [[strictNullChecks]] الخطأين بيختفوا: [[found.name]] و [[input.value]] بيعدّوا عادي، و [[found]] نوعها بقى [[User]] مش [[User | undefined]]. بس الكود لسه غلط: [[users.find]] بترجع undefined لأن مفيش user برقم 2، ولو شغلته هتاخد [[TypeError: Cannot read properties of undefined (reading 'name')]].

يعني الإعداد ده مش بيصلّح حاجة، بيخبي الـ crash. رجّعه، وخلي كل مكان TS اشتكى فيه يتعامل مع الحالة الفاضية بـ if أو [[?.]] و [[??]].`
        },
        {
          cmd: "any و unknown و never",
          title: "أي قيمة من غير فحص، وأي قيمة بفحص، ومفيش قيمة خالص",
          desc: R`[[any]] بيقفل TS: أي حاجة مسموحة عليه ومفيش فحص. [[unknown]] بيقبل أي قيمة برضه، بس مش هيسيبك تعمل بيها حاجة لحد ما تفحصها. و [[never]] نوع مفيش قيمة تنفعله: دالة مبترجعش أبدًا (بترمي خطأ)، أو فرع مستحيل يحصل.

القاعدة: القيمة اللي مش عارف نوعها (JSON، و [[catch (e)]]، وداتا من برّه) خليها [[unknown]] وافحصها. و [[any]] آخر حل.`,
          example: R`const a: any = JSON.parse('{"x":1}');
a.foo.bar.baz(); // بيعدّي، ويقع وقت التشغيل
const u: unknown = JSON.parse('{"x":1}');
u.foo; // خطأ: 'u' is of type 'unknown'
if (typeof u === "object" && u !== null && "x" in u) {
  console.log(u.x);
}
try {
  JSON.parse("{bad");
} catch (e) {
  console.log(e instanceof Error ? e.message : String(e));
}
function fail(msg: string): never {
  throw new Error(msg);
}`,
          try: R`غيّر [[u]] لـ any وشوف كل الأخطاء اختفت، وشغّل الكود بـ tsx وشوف مين اللي وقع. وبعدين جرّب [[const n: never = 5]] واقرا الرسالة.`,
          flag: "script",
          deep: {
            why: "فيه قيم TS مستحيل يعرف نوعها وقت الكتابة: رد API، و [[JSON.parse]]، و [[localStorage]]، والخطأ في [[catch]]. و [[any]] بيحل المشكلة بإنه يطفي الفحص، فالغلط بيعدّي وينتشر. [[unknown]] بيقول الحقيقة: «مش عارف»، ويجبرك تثبت قبل ما تستخدم.",
            how: R`[[any]] بيعدّي الفحص في الاتجاهين: أي حاجة تتحط فيه، وهو يتحط في أي حاجة. والأخطر إنه معدي: [[const x = a.foo]] بقى any هو كمان، ودالة بترجع any بتنشر any في كل اللي بيستخدمها.

[[unknown]] نوع الأمان: أي قيمة تتحط فيه، بس هو مينفعش يتحط غير في [[unknown]] أو [[any]]، ومفيش عليه أي عملية لحد ما تضيّقه ([[typeof]] و [[instanceof]] و [[in]] و [[Array.isArray]]، أو Zod في المستوى ٣).

[[never]] المجموعة الفاضية: مفيش قيمة نوعها never. بيطلع في ٣ أماكن: دالة دايمًا بترمي أو فيها loop مبيخلصش، ونوع بعد ما كل الاحتمالات اتفحصت (ودي أساس الـ exhaustive check في المستوى ٢)، وتقاطع مستحيل زي [[string & number]].

و [[useUnknownInCatchVariables]] (جوه strict) هو اللي بيخلي [[e]] في catch نوعها unknown بدل any، لأن JS يسمح ترمي أي حاجة، مش Error بس.`,
            when: "[[unknown]] لأي داتا جاية من برّه لحد ما تتحقق منها. [[never]] للدوال اللي بترمي دايمًا وللتأكد إن switch غطّى كل الحالات. و [[any]] بس وانت بتنقل كود JS قديم خطوة خطوة، ومؤقتًا.",
            mistakes: R`في مشروع حقيقي كان فيه [[useState<any[]>([])]] و [[(req.body as any)[field]]] و [[catch (e: any)]]: كل واحدة منهم حتة TS مش شايفها. وتفتكر إن [[unknown]] و [[any]] زي بعض لأن الاتنين «أي حاجة». وتكتب [[: never]] كنوع رجوع لدالة مبترجعش قيمة: ده [[void]]، مش never.`
          },
          teach: R`## المثال بيعمل إيه؟

بيحط نفس القيمة (ناتج [[JSON.parse]]) مرة في [[any]] ومرة في [[unknown]]، عشان تشوف الفرق. وبعدين الـ [[catch]]، ودالة نوعها [[never]]. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، واتشغّل بـ [[tsx]].

---

## ١. [[any]]: الفحص مقفول

~~~text app.ts
const a: any = JSON.parse('{"x":1}');
a.foo.bar.baz();
~~~

- [[JSON.parse]] بتحوّل نص JSON لقيمة JS. TS مستحيل يعرف شكلها وقت الكتابة، فنوعها الرسمي [[any]].
- [[any]] معناها «أي حاجة، ومتفحصش». فـ TS سكت تمامًا على [[a.foo.bar.baz()]]، مع إن [[a]] مفيهاش [[foo]] أصلًا.

والنتيجة لما شغّلنا:

~~~text الناتج: npx tsx app.ts (سطر الخطأ)
TypeError: Cannot read properties of undefined (reading 'bar')
~~~

[[a.foo]] طلعت undefined، والكود وقع لما حاول يقرا [[bar]] منها. والأسوأ إن [[any]] بيعدي: [[const x = a.foo]] نوعها any هي كمان، فالفحص بيتقفل في كل حتة القيمة دي بتروحها.

---

## ٢. [[unknown]]: أي قيمة، بس افحص الأول

~~~text app.ts
const u: unknown = JSON.parse('{"x":1}');
u.foo;
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(4,1): error TS18046: 'u' is of type 'unknown'.
~~~

نفس القيمة، بس TS رافض تلمسها. [[unknown]] معناها «مش عارف دي إيه»، فمفيش عليها أي عملية لحد ما تثبت نوعها. ومينفعش كمان تحطها في متغير ليه نوع: [[const s: string = u]] بيطلّع [[Type 'unknown' is not assignable to type 'string']].

---

## ٣. الفحص خطوة خطوة

~~~text app.ts
if (typeof u === "object" && u !== null && "x" in u) {
  console.log(u.x);
}
~~~

[[&&]] معناها «و»، والشروط بتتفحص من الشمال. وكل شرط بيضيّق النوع أكتر. سألنا الـ compiler عن نوع [[u]] بعد كل خطوة:

| بعد | نوع [[u]] | ليه |
|---|---|---|
| البداية | [[unknown]] | |
| [[typeof u === "object"]] | [[object | null]] | [[typeof null]] برضه [["object"]] (غلطة قديمة في JS) |
| [[u !== null]] | [[object]] | شلنا null |
| [["x" in u]] | [[object & Record<"x", unknown>]] | [[in]] بيفحص إن الخاصية موجودة |

[[Record<"x", unknown>]] معناها «object فيه خاصية اسمها x، نوعها مش معروف». فـ [[u.x]] بقت مسموحة، ونوعها لسه [[unknown]]: TS عارف إنها موجودة، مش عارف هي إيه.

~~~text الناتج
1
~~~

---

## ٤. الـ catch

~~~text app.ts
try {
  JSON.parse("{bad");
} catch (e) {
  console.log(e instanceof Error ? e.message : String(e));
}
~~~

- [[try { } catch (e) { }]]: نفّذ اللي في [[try]]، ولو حصل خطأ روح لـ [[catch]] والخطأ في [[e]].
- [[e]] نوعها [[unknown]] (مع [[strict]]، بإعداد اسمه [[useUnknownInCatchVariables]])، لأن JS بيسمح ترمي أي حاجة: [[throw "نص"]] أو [[throw 42]].
- [[e instanceof Error]]: هل e اتعملت من كلاس Error؟ لو أيوة نوعها بقى [[Error]] وتقدر تقرا [[message]].
- [[String(e)]]: لو مش Error، حوّلها لنص وخلاص.

~~~text الناتج
Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

ده [[message]] بتاع الـ SyntaxError اللي [[JSON.parse]] رماه.

---

## ٥. [[never]]: مفيش قيمة

~~~text app.ts
function fail(msg: string): never {
  throw new Error(msg);
}
~~~

الدالة دي **مبترجعش أبدًا**: يا بترمي خطأ. فنوع رجوعها [[never]]، يعني «مفيش قيمة هتطلع من هنا». ده غير [[void]]: void دالة بترجع عادي بس من غير قيمة مهمة.

ومفيش قيمة تنفع تتحط في never:

~~~text الناتج: const n: never = 5
error TS2322: Type '5' is not assignable to type 'never'.
~~~

ودي الفكرة اللي بيقوم عليها الـ exhaustive check (درس جاي).

---

## الخلاصة

| النوع | يقبل أي قيمة؟ | تقدر تستخدمه من غير فحص؟ |
|---|---|---|
| [[any]] | أيوة | أيوة، وده الخطر |
| [[unknown]] | أيوة | لأ، افحص الأول |
| [[never]] | لأ، ولا قيمة | مفيش حاجة تستخدمها |

الداتا الجاية من برّه ([[JSON.parse]] و [[catch]] و API): [[unknown]] وافحص. و [[any]] آخر حل ومؤقت.`,
          lines: [
            R`[[JSON.parse]] بيرجع [[any]] أصلًا.`,
            "TS ساكت تمامًا، وده هيقع وقت التشغيل بـ TypeError.",
            R`نفس القيمة بس [[unknown]].`,
            "ممنوع تلمسها قبل ما تفحص.",
            "فحص حقيقي بـ JS: object، ومش null، وفيه x.",
            R`دلوقتي مسموح تقرا [[u.x]] (نوعها لسه unknown، بس TS عارف إنها موجودة).`,
            "قفلة.",
            "كود ممكن يرمي.",
            "JSON بايظ، فبيرمي SyntaxError.",
            R`في [[strict]]، [[e]] نوعها [[unknown]].`,
            R`افحص إنه Error قبل ما تقرا [[message]].`,
            "قفلة.",
            R`[[never]]: الدالة دي مبترجعش أبدًا.`,
            "دايمًا بترمي.",
            "قفلة."
          ],
          sol: R`بعد ما تخلي [[u]] نوعها any، كل الأخطاء بتختفي. ولما تشغّل بـ tsx، اللي بيقع هو السطر التاني [[a.foo.bar.baz()]]: [[TypeError: Cannot read properties of undefined (reading 'bar')]]، لأن [[a.foo]] قيمتها undefined، وأي سطر بعده مش هيتنفذ. أما [[u.foo]] لوحدها مش بتوقّع حاجة، بترجّع undefined بصمت.

و [[const n: never = 5]] بيطلّع Type '5' is not assignable to type 'never' (TS2322): مفيش أي قيمة ينفع تتحط في never، ودي نفس الفكرة اللي بيقوم عليها exhaustive check.`
        },
        {
          cmd: "enum ولا union",
          title: "قايمة قيم ثابتة زي الأدوار والحالات: تكتبها إزاي",
          desc: R`TypeScript فيه [[enum]]، بس أغلب المشاريع الحديثة بتفضّل union من literals ([["ADMIN" | "USER"]])، ولو محتاج القيم كمان وقت التشغيل (لـ dropdown أو loop) بتعمل object بـ [[as const]] وتطلّع منه النوع.

السبب إن enum من الحاجات القليلة في TS اللي بتطلّع كود JS حقيقي، مش بيتمسح زي باقي الأنواع، وده بيعمل مشاكل مع Node والأدوات الحديثة.`,
          example: R`enum RoleEnum { Admin = "ADMIN", User = "USER" }
type Role = "ADMIN" | "USER";
const Status = { Active: "ACTIVE", Banned: "BANNED" } as const;
type Status = (typeof Status)[keyof typeof Status];
function setRole(role: Role) { return role; }
setRole("ADMIN");
function setRoleEnum(role: RoleEnum) { return role; }
setRoleEnum("ADMIN"); // خطأ: لازم RoleEnum.Admin
function setStatus(s: Status) { return s; }
setStatus(Status.Active);
setStatus("BANNED");
Object.values(Status).forEach((s) => console.log(s));`,
          try: R`شغّل ملف فيه [[enum]] بـ [[node file.ts]] على Node 24 وشوف الخطأ، وبعدين شيل الـ enum وسيب الـ [[as const]] وشغّله تاني.`,
          flag: "script",
          deep: {
            why: "كل مشروع فيه قوايم ثابتة: أدوار، وحالات طلب، وأنواع اشتراك. محتاج حاجتين: TS يمسك القيمة الغلط، وساعات تحتاج القيم نفسها وقت التشغيل. enum بيعمل الاتنين بس بتمن، و union مع [[as const]] بيعملهم من غير التمن.",
            how: R`[[enum]] بيتحوّل لكود: [[enum RoleEnum { Admin = "ADMIN" }]] بيطلع object حقيقي في الـ JS. ولو الـ enum رقمي ([[enum Dir { Up, Down }]]) القيم بتبقى 0 و 1، و TS بيعمل كمان reverse mapping ([[Dir[0] === "Up"]])، فـ [[Object.keys(Dir)]] بيطلّع ٤ حاجات مش ٢.

وعشان enum مش «أنواع بس»، Node 24 لما بيشغّل .ts مباشرة (type stripping) بيرفضه إلا بفلاج [[--experimental-transform-types]]، وإعداد [[erasableSyntaxOnly]] في TS بيمنعه خالص. وفيه كمان [[const enum]] اللي بيتشال ويتحط مكانه القيمة، بس مبيشتغلش صح مع الأدوات اللي بتترجم ملف ملف ([[isolatedModules]]).

و string enums «nominal»: [["ADMIN"]] مش مقبولة مكان [[RoleEnum.Admin]] حتى لو نفس القيمة. ده ساعات مطلوب، بس غالبًا بيضايق: الداتا الجاية من API عبارة عن strings، فلازم تحوّل.

الـ object اللي بـ [[as const]] بيدّيك نفس المميزات: قيم وقت التشغيل ([[Object.values(Status)]])، ونوع ([[(typeof Status)[keyof typeof Status]]] بيطلّع union القيم)، ومبيطلّعش كود غير الـ object العادي. و Prisma 7 نفسه (generator [[prisma-client]]) بيطلّع enums الـ schema بالشكل ده بالظبط: object بـ [[as const]] ونوع بنفس الاسم.`,
            when: "union لأي قايمة قيم في النوع بس. و object بـ [[as const]] لما تحتاج القيم وقت التشغيل كمان. و enum لو المشروع أصلًا ماشي عليه والفريق متفق، مش حرام.",
            mistakes: R`enum رقمي والقيم بتتخزن في القاعدة كأرقام: تضيف عضو في النص فكل الأرقام اللي بعده تتزق والداتا القديمة تتلخبط. لو لازم enum، اديله قيم string صريحة. وتستخدم enum في كود هيتشغّل بـ [[node file.ts]] فيقع. وفي الانترفيو: «enum مجرد نوع» غلط، هو الاستثناء اللي بيطلّع كود.`
          },
          teach: R`## المثال بيعمل إيه؟

بيكتب نفس الفكرة (قايمة قيم ثابتة) بـ ٣ طرق: [[enum]]، و union، و object بـ [[as const]]. وبعدين بيوريك كل طريقة بتقبل إيه، وأنهي واحدة بتطلّع كود حقيقي. اتفحص بـ TypeScript 6.0.3 و 7.0.2 (نفس الأخطاء)، واتشغّل بـ [[tsx]] و [[node]] (Node 24).

---

## ١. [[enum]]

~~~text app.ts
enum RoleEnum { Admin = "ADMIN", User = "USER" }
~~~

[[enum]] كلمة TS بتعمل قايمة أسماء ليها قيم: [[RoleEnum.Admin]] قيمتها [["ADMIN"]]. ده الوحيد في المثال اللي **مش بيتمسح**. ده الـ JS اللي [[tsc]] طلّعه من السطر ده:

~~~text app.js (من tsc)
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Admin"] = "ADMIN";
    RoleEnum["User"] = "USER";
})(RoleEnum || (RoleEnum = {}));
~~~

سطر TS واحد بقى ٥ سطور JS: متغير، ودالة بتتنادي على طول وبتملاه. يعني [[enum]] كود بيشتغل، مش نوع وبس.

---

## ٢. union

~~~text app.ts
type Role = "ADMIN" | "USER";
~~~

نفس القيم كـ literal types. السطر ده **اختفى خالص** من الـ JS.

---

## ٣. object بـ [[as const]]: القيم والنوع مع بعض

~~~text app.ts
const Status = { Active: "ACTIVE", Banned: "BANNED" } as const;
type Status = (typeof Status)[keyof typeof Status];
~~~

### السطر الأول

object عادي، و [[as const]] بيقول لـ TS: «القيم دي مش هتتغير، خليها literals و readonly». من غيره نوع [[Active]] كان هيبقى string.

~~~text النوع
Status: { readonly Active: "ACTIVE"; readonly Banned: "BANNED"; }
~~~

### السطر التاني: من جوه لبرة

1. [[typeof Status]]: [[typeof]] جوه مكان نوع معناها «هات نوع المتغير ده»، يعني الشكل اللي فوق.
2. [[keyof typeof Status]]: [[keyof]] بيطلّع أسماء الخصايص كـ union: [["Active" | "Banned"]].
3. [[(typeof Status)[keyof typeof Status]]]: الأقواس المربعة على نوع معناها «نوع الخاصية دي». ولما تديها كل الأسماء، بتطلّع كل القيم:

~~~text النوع
type Status = "ACTIVE" | "BANNED"
~~~

ونفس الاسم [[Status]] بقى قيمة ونوع في نفس الوقت. TS بيفرّق بينهم من المكان: بعد [[:]] نوع، وفي الكود قيمة.

---

## ٤. النداءات

~~~text app.ts
function setRole(role: Role) { return role; }
setRole("ADMIN");
function setRoleEnum(role: RoleEnum) { return role; }
setRoleEnum("ADMIN");
function setStatus(s: Status) { return s; }
setStatus(Status.Active);
setStatus("BANNED");
~~~

~~~text الناتج: npx tsc --noEmit
app.ts(8,13): error TS2345: Argument of type '"ADMIN"' is not assignable to parameter of type 'RoleEnum'.
~~~

- الـ union قبل النص [["ADMIN"]] عادي.
- الـ enum **رفضه**، مع إن القيمة نفسها! string enum بيقبل [[RoleEnum.Admin]] بس. ودي مشكلة لما الداتا جاية من API كنصوص.
- الـ object بيقبل الاتنين: [[Status.Active]] والنص [["BANNED"]].

---

## ٥. القيم موجودة وقت التشغيل

~~~text app.ts
Object.values(Status).forEach((s) => console.log(s));
~~~

[[Object.values]] بترجّع قيم الـ object كـ array. والـ union لوحده مكنش هينفع هنا، لأنه اتمسح.

~~~text الناتج: npx tsx app.ts
ACTIVE
BANNED
~~~

---

## ٦. [[node file.ts]] والـ enum

Node 24 بيشغّل [[.ts]] بإنه **يشيل** الأنواع بس. والـ enum مش نوع يتشال:

~~~text الناتج: node app.ts
SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode
~~~

ولما شلنا كل سطور [[RoleEnum]]، نفس الأمر طبع [[ACTIVE]] و [[BANNED]]. ولو مشروعك هيشتغل كده، فعّل [[erasableSyntaxOnly]] في tsconfig عشان TS يمسكها وانت بتكتب:

~~~text الناتج: npx tsc --noEmit --erasableSyntaxOnly
app.ts(1,6): error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
~~~

---

## ٧. enum بالأرقام أغرب

~~~text app.ts
enum Dir { Up, Down }
console.log(Dir.Up, Dir[0], Object.keys(Dir));
~~~

~~~text الناتج: npx tsx app.ts
0 Up [ '0', '1', 'Up', 'Down' ]
~~~

من غير قيم صريحة، الأعضاء بياخدوا 0 و 1. و TS بيعمل كمان «reverse mapping» ([[Dir[0]]] بيرجّع [["Up"]])، فـ [[Object.keys]] بيطلّع ٤ مفاتيح مش ٢.

---

## الخلاصة

| | [[enum]] | union | object [[as const]] |
|---|---|---|---|
| بيطلّع كود JS | أيوة | لأ | الـ object بس |
| يقبل النص [["ADMIN"]] | لأ | أيوة | أيوة |
| القيم وقت التشغيل | أيوة | لأ | أيوة |
| [[node file.ts]] | بيقع | يشتغل | يشتغل |

الشائع دلوقتي: union لو محتاج النوع بس، و object بـ [[as const]] لو محتاج القيم كمان.`,
          lines: [
            "enum بقيم string. ده بيتحوّل لـ object حقيقي في JS.",
            "نفس الفكرة كـ union: بيتمسح خالص وقت التشغيل.",
            R`object عادي بـ [[as const]]: القيم بقت readonly و literals.`,
            R`النوع من قيم الـ object: [["ACTIVE" | "BANNED"]]. نفس الاسم ينفع للقيمة وللنوع.`,
            "دالة بتاخد الـ union.",
            "string عادية تعدّي، والمحرر بيكمّلها.",
            "دالة بتاخد الـ enum.",
            R`string enum مبيقبلش النص نفسه، لازم تكتب [[RoleEnum.Admin]].`,
            "دالة بتاخد النوع اللي طالع من الـ object.",
            "تنفع بالاسم من الـ object.",
            "وبالنص مباشرة.",
            "والقيم موجودة وقت التشغيل، فتقدر تلف عليها (dropdown مثلًا)."
          ],
          sol: R`[[node file.ts]] بيقع قبل ما ينفّذ أي سطر: [[SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript enum is not supported in strip-only mode]]. Node بيشيل الأنواع بس، و enum مش نوع، ده كود بيطلّع object وقت التشغيل، فـ Node مش عارف يعمل بيه إيه.

بعد ما تشيل الـ enum (وكل حاجة بتستخدم [[RoleEnum]]) الملف بيشتغل ويطبع [[ACTIVE]] وبعدين [[BANNED]]. الـ [[as const]] نوع بس فبيتشال، والـ object عادي. ولو لسه بيقع بنفس الخطأ، دوّر على [[enum]] تاني أو [[namespace]] أو parameter properties في الكلاسات، ودول برضه مش مسموحين في strip-only.`
        }
      ]
    }
]);

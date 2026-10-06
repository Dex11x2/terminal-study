// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "تقول لـ TS حاجة هو مش عارفها",
      l: 2,
      n: "as const و satisfies آمنين، و as و ! مسؤوليتك انت، و .d.ts لمكتبات من غير أنواع",
      items: [
        {
          cmd: "as const",
          title: "تثبّت القيم بدل ما TS يوسّعها لـ string و number",
          desc: R`[[as const]] بعد object أو array بيقول لـ TS: «دي قيم ثابتة». كل الخصايص تبقى [[readonly]]، والقيم تفضل literals ([["GET"]] مش string)، والـ arrays تبقى tuples للقراية بس.

ده مش كذب على الـ compiler زي [[as]] العادية: هو بس بيمنع الـ widening، وأي تعديل بعد كده يطلع خطأ.`,
          example: R`const routes = { home: "/", login: "/login", admin: "/admin" } as const;
type Path = (typeof routes)[keyof typeof routes]; // "/" | "/login" | "/admin"
const methods = ["GET", "POST"] as const;
type Method = (typeof methods)[number];           // "GET" | "POST"
routes.home = "/home"; // خطأ: readonly
function go(path: Path) { return path; }
go(routes.login);
go("/signup"); // خطأ: مش من الـ routes
const loose = { method: "GET" };
function send(m: Method) { return m; }
send(loose.method); // خطأ: string أوسع من Method`,
          try: R`ضيف [[as const]] على [[loose]] وشوف الخطأ الأخير اختفى. وبعدين حاول تعمل [[methods.push("PUT")]].`,
          flag: "script",
          deep: {
            why: "ثوابت المشروع (مسارات، وأدوار، وحالات، ومفاتيح إعدادات) محتاجها قيم وقت التشغيل وأنواع وقت الكتابة. [[as const]] بيخليك تكتبها مرة واحدة كقيمة، وتطلّع منها النوع.",
            how: R`TS عادةً بيوسّع (widening) الـ literals في الأماكن اللي ممكن تتغير: خصايص الـ objects وعناصر الـ arrays. [[{ method: "GET" }]] نوعها [[{ method: string }]] لأن ممكن تكتب [[obj.method = "PUT"]] بعدين.

[[as const]] (const assertion) بيقول: متوسّعش. النتيجة: كل الخصايص [[readonly]] وبعمق، والقيم literals، والـ arrays [[readonly]] tuples. وده مش [[Object.freeze]]: وقت التشغيل الـ object عادي وممكن يتعدّل لو حد تجاهل الأنواع.

ومع [[typeof]] و [[keyof]] و [[[number]]] بتطلّع unions من القيم: [[(typeof routes)[keyof typeof routes]]] و [[(typeof methods)[number]]].

ومن TS 5.0 فيه [[const]] type parameters ([[function f<const T>(x: T)]]) بتعمل نفس الأثر على الـ arguments من غير ما اللي بينادي يكتب [[as const]].`,
            when: "ثوابت بتتستخدم كقيم وأنواع مع بعض، وبدل enum. وقيم بترجع من hook كـ tuple ([[return [value, setValue] as const]]).",
            mistakes: R`تفتكر إن [[as const]] زي [[as SomeType]]: التانية بتكذب على TS، الأولى لأ. وتستخدمه على object هيتعدّل فعلًا (state مثلًا)، فكل تعديل يطلع خطأ readonly.`
          },
          teach: R`## الفكرة في سطر

TS عادةً بيوسّع القيم: [["GET"]] جوه object بتبقى [[string]]. [[as const]] بيقوله «متوسّعش»: القيم تفضل زي ما هي بالظبط، وكل حاجة تبقى [[readonly]].

الأنواع تحت من TypeScript 6.0.3 على ويندوز 11، والأخطاء من [[npx tsc --strict --noEmit]]، ونفسها على TS 7.0.2.

---

## ١. الفرق في سطرين

من غير [[as const]]:

~~~text app.ts
const plain = { home: "/", login: "/login" };
const arr = ["GET", "POST"];
~~~

~~~text الناتج
const plain: { home: string; login: string; }
const arr: string[]
~~~

ومعاه:

~~~text app.ts
const routes = { home: "/", login: "/login", admin: "/admin" } as const;
const methods = ["GET", "POST"] as const;
~~~

~~~text الناتج
const routes: { readonly home: "/"; readonly login: "/login"; readonly admin: "/admin"; }
const methods: readonly ["GET", "POST"]
~~~

٣ حاجات اتغيرت:

1. القيم بقت literal types: [["/login"]] مش [[string]].
2. كل خاصية بقت [[readonly]].
3. الـ array بقى **tuple** للقراية بس: طوله ٢ بالظبط، الأول [["GET"]] والتاني [["POST"]].

---

## ٢. [[Path]]: union من قيم الـ object

~~~text app.ts
type Path = (typeof routes)[keyof typeof routes];
~~~

من جوه لبرة:

| الخطوة | الحتة | الناتج |
|---|---|---|
| ١ | [[typeof routes]] | نوع الـ object اللي فوق |
| ٢ | [[keyof typeof routes]] | [["home" or "login" or "admin"]] |
| ٣ | [[(...)[...]]] | نوع القيمة لكل مفتاح من دول |

~~~text الناتج
type Path = "/" | "/login" | "/admin"
~~~

الأقواس حوالين [[(typeof routes)]] بتوضّح إن [[typeof]] بيتطبق على [[routes]] الأول، وبعدين [[[...]]] على الناتج.

---

## ٣. [[Method]]: union من الـ tuple

~~~text app.ts
type Method = (typeof methods)[number];
~~~

[[[number]]] = «نوع أي عنصر»:

~~~text الناتج
type Method = "GET" | "POST"
~~~

---

## ٤. التلات أخطاء

~~~text app.ts
routes.home = "/home";
go("/signup");
const loose = { method: "GET" };
send(loose.method);
~~~

~~~text خطأ tsc
error TS2540: Cannot assign to 'home' because it is a read-only property.
error TS2345: Argument of type '"/signup"' is not assignable to parameter of type 'Path'.
error TS2345: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
~~~

- الأول: [[readonly]].
- التاني: [[go]] بتاخد [[Path]]، و [["/signup"]] مش منهم. أما [[go(routes.login)]] مقبول لأن نوعه [["/login"]].
- التالت: [[loose]] من غير [[as const]] فنوع [[loose.method]] بقى [[string]]، و [[string]] أوسع من [[Method]]. ولما ضفنا [[as const]] على [[loose]] السطر عدّى وطبع [[GET]].

---

## ٥. وقت التشغيل: [[as const]] بيختفي

ده الـ JS اللي tsc طلّعه من ملف التجربة:

~~~text out/l07t.js
const methods = ["GET", "POST"];
const loose = { method: "GET" };
function send(m) { return m; }
console.log(send(loose.method));
methods.push("PUT");
~~~

- [[as const]] اتمسح خالص.
- [[methods.push("PUT")]] TS رفضه (TS2339: Property 'push' does not exist on type 'readonly ["GET", "POST"]')، بس لاحظ إن tsc **طلّع الملف برضه** رغم الخطأ (ده الافتراضي لو [[noEmitOnError]] مقفول). وفي JS عادي نفس الـ push بيشتغل: [[[ 'GET', 'POST', 'PUT' ]]].

يعني الحماية وقت الكتابة بس. لو محتاج حماية وقت التشغيل: [[Object.freeze]].

---

## الخلاصة

| | من غير as const | مع as const |
|---|---|---|
| [[{ method: "GET" }]] | [[{ method: string }]] | [[{ readonly method: "GET" }]] |
| [[["GET", "POST"]]] | [[string[]]] | [[readonly ["GET", "POST"]]] |
| وقت التشغيل | object عادي | object عادي برضه |

و [[as const]] مش زي [[as Type]]: مبيكدبش على TS، هو بس بيمنع التوسيع.`,
          lines: [
            "object مسارات ثابت.",
            "union كل القيم من الـ object.",
            "tuple ثابت.",
            "union عناصره.",
            R`[[as const]] خلّى الخصايص readonly.`,
            "دالة بتقبل مسار معروف بس.",
            "من الـ object: مقبول.",
            "مسار مكتوب بإيدك ومش موجود: مرفوض.",
            R`من غير [[as const]]: نوع [[method]] بقى string.`,
            "دالة مستنية Method.",
            R`string مش مقبولة مكان [["GET" | "POST"]].`
          ],
          sol: R`بعد [[const loose = { method: "GET" } as const]]، نوع [[loose.method]] بقى [["GET"]] مش string، فـ [[send(loose.method)]] بيعدّي.

و [[methods.push("PUT")]] بيطلّع Property 'push' does not exist on type 'readonly ["GET", "POST"]' (TS2339). [[as const]] بيخلي الـ array tuple للقراية بس. ولاحظ إن الحماية دي من TS بس: وقت التشغيل الـ array عادي و push موجودة، فلو عايز تمنعها فعلًا استخدم [[Object.freeze]].`
        },
        {
          cmd: "satisfies",
          title: "تتأكد إن القيمة ماشية مع نوع، من غير ما تخسر نوعها الدقيق",
          desc: R`[[value satisfies Type]] بيفحص إن القيمة مطابقة للنوع، بس سايب نوعها المستنتج زي ما هو. عكس [[const x: Type = value]] اللي بيخلي النوع هو Type ويضيّع التفاصيل.

مثالي للإعدادات والقواميس: عايز TS يمسك مفتاح ناقص أو قيمة غلط، وعايز كمان يعرف القيم بالظبط.`,
          example: R`type Theme = Record<"primary" | "danger", string | [number, number, number]>;
const annotated: Theme = { primary: "#0af", danger: [255, 0, 0] };
annotated.primary.toUpperCase(); // خطأ: ممكن تبقى tuple
const checked = {
  primary: "#0af",
  danger: [255, 0, 0],
} satisfies Theme;
checked.primary.toUpperCase();
checked.danger.map((c) => c / 255);
const bad = { primary: "#0af" } satisfies Theme; // خطأ: danger ناقصة`,
          try: R`ضيف مفتاح [[secondary]] لـ [[checked]] وشوف [[satisfies]] بيرفضه. وبعدين جرّب [[as Theme]] بدل [[satisfies Theme]] في آخر سطر ولاحظ إن الخطأ اختفى، وده بالظبط خطر [[as]].`,
          flag: "script",
          deep: {
            why: "في مشروع حقيقي فيه ملفات إعدادات وقواميس كتير: routes، وألوان، وترجمات، وصلاحيات. عايز تمسك الغلط فيها (مفتاح ناقص أو اسم غلط)، من غير ما النوع يبقى عام لدرجة إنك تعمل cast كل ما تستخدمها. قبل TS 4.9 كان لازم تختار واحدة من الاتنين.",
            how: R`فيه ٣ طرق تربط قيمة بنوع، وكل واحدة مختلفة:

[[const x: T = v]] (annotation): بيفحص إن v مطابقة لـ T، ونوع x بقى T. أي تفاصيل أدق بتضيع.

[[const x = v as T]] (assertion): مبيفحصش بجد، بيقول «اعتبرها T» طالما مش مستحيلة تمامًا. خطر.

[[const x = v satisfies T]]: بيفحص زي الـ annotation بالظبط (وكمان الخصايص الزيادة)، بس نوع x هو النوع المستنتج من v. فتكسب الاتنين.

ومع [[as const]]: [[{ ... } as const satisfies Config]] بيثبّت القيم ويفحصها في نفس الوقت.

وفي Prisma هتلاقي النمط ده في الـ docs: [[{ select: { id: true } } satisfies Prisma.UserDefaultArgs]]، فالـ args بتتفحص، ونوعها الدقيق بيروح لـ [[GetPayload]] (المستوى ٣).`,
            when: "إعدادات و routes و themes وقواميس ترجمة، و Prisma select و include، وأي object عايز تتأكد من شكله ومحتاج نوعه الدقيق بعدين.",
            mistakes: R`تستخدم [[as]] مكان [[satisfies]] عشان «بيعمل نفس الحاجة»: لأ، as بيسكّت الأخطاء. وتفتكر إن satisfies بيغيّر حاجة وقت التشغيل: بيتمسح زي أي نوع.`
          },
          teach: R`## الفكرة في سطر

[[satisfies]] بيسأل سؤال واحد: «القيمة دي ماشية مع النوع ده؟» ولو آه، بيسيب للقيمة نوعها الدقيق اللي TS استنتجه. أما [[const x: Type]] بيفحص وكمان **بيغيّر** نوع المتغير لـ Type.

الأنواع تحت من TypeScript 6.0.3 على ويندوز 11، والأخطاء من [[npx tsc --strict --noEmit]]، والتشغيل بـ [[npx tsx]]. وفيه فرق صغير في TS 7.0.2 هنقوله في مكانه.

---

## ١. النوع

~~~text app.ts
type Theme = Record<"primary" | "danger", string | [number, number, number]>;
~~~

- [[Record<K, V>]] (درس Pick و Omit و Record): object مفاتيحه [[primary]] و [[danger]] الاتنين إجباريين.
- القيمة: [[string]] (زي [["#0af"]]) **أو** tuple من ٣ أرقام (أحمر وأخضر وأزرق).

---

## ٢. بالـ annotation: التفاصيل ضاعت

~~~text app.ts
const annotated: Theme = { primary: "#0af", danger: [255, 0, 0] };
annotated.primary.toUpperCase();
~~~

[[: Theme]] بعد اسم المتغير اسمها type annotation. TS فحص إن القيمة ماشية، وبعدها نسي القيمة وافتكر النوع بس:

~~~text الناتج
const annotated: Theme
~~~

فلما تقرا [[annotated.primary]] نوعها [[string | [number, number, number]]]، والـ tuple ملوش [[toUpperCase]]:

~~~text خطأ tsc
error TS2339: Property 'toUpperCase' does not exist on type 'string | [number, number, number]'.
  Property 'toUpperCase' does not exist on type '[number, number, number]'.
~~~

---

## ٣. بـ [[satisfies]]: اتفحص وفضل دقيق

~~~text app.ts
const checked = {
  primary: "#0af",
  danger: [255, 0, 0],
} satisfies Theme;
checked.primary.toUpperCase();
checked.danger.map((c) => c / 255);
~~~

[[satisfies Theme]] بييجي **بعد** القيمة. النوع اللي فضل للمتغير:

~~~text الناتج
const checked: { primary: string; danger: [number, number, number]; }
~~~

TS عارف إن [[primary]] هنا string و [[danger]] tuple، فالسطرين عدّوا. وطبعناهم:

~~~text الناتج (npx tsx)
#0AF [ 1, 0, 0 ]
~~~

([[.map((c) => c / 255)]] قسم كل رقم على 255: [[255/255 = 1]].)

ولاحظ حاجة: لو كتبت نفس الـ object من غير أي حاجة، TS كان هيستنتج [[danger: number[]]] (array أي طول). [[satisfies]] خلّى TS يستنتج tuple لأنه شاف إن النوع المطلوب tuple.

---

## ٤. وبيمسك الغلط زي الـ annotation

~~~text app.ts
const bad = { primary: "#0af" } satisfies Theme;
~~~

~~~text خطأ tsc (TS 6.0.3)
error TS1360: Type '{ primary: string; }' does not satisfy the expected type 'Theme'.
  Property 'danger' is missing in type '{ primary: string; }' but required in type 'Theme'.
~~~

وفي **TS 7.0.2** نفس السطر طلّع الخطأ الداخلي على طول من غير سطر TS1360:

~~~text خطأ tsc (TS 7.0.2)
error TS2741: Property 'danger' is missing in type '{ primary: string; }' but required in type 'Theme'.
~~~

نفس المعنى، بس لو بتدوّر على كود الخطأ خد بالك إنه ممكن يختلف بين النسختين.

---

## ٥. التجربة: مفتاح زيادة، و [[as]] بدل [[satisfies]]

~~~text خطأ tsc
secondary: "#333",   (جوه checked)
error TS2353: Object literal may only specify known properties, and 'secondary' does not exist in type 'Theme'.
~~~

ولما كتبنا [[const bad = { primary: "#0af" } as Theme;]] و [[console.log(bad.danger)]]:

~~~text الناتج (npx tsx)
undefined
~~~

ولا خطأ من tsc، و [[undefined]] وقت التشغيل مع إن النوع بيقول string أو tuple. ده الفرق بين «افحص» ([[satisfies]]) و «صدّقني» ([[as]]).

---

## ٦. وقت التشغيل

tsc شال [[satisfies Theme]] من الـ JS خالص، والـ object فضل زي ما هو:

~~~text out/l08.js (جزء منه)
const checked = {
    primary: "#0af",
    danger: [255, 0, 0],
};
~~~

---

## الخلاصة

| الطريقة | بيفحص؟ | نوع المتغير بعدها |
|---|---|---|
| [[const x: T = v]] | آه | T (التفاصيل بتضيع) |
| [[const x = v satisfies T]] | آه، ومفاتيح زيادة كمان | النوع الدقيق من v |
| [[const x = v as T]] | تقريبًا لأ | T، حتى لو v ناقصة |`,
          lines: [
            "كل لون يا string يا tuple RGB.",
            "بـ annotation: النوع بقى Theme، والتفاصيل ضاعت.",
            "TS مش فاكر إن primary كانت string.",
            "نفس الـ object...",
            "...string...",
            "...و tuple...",
            R`...بـ [[satisfies]]: اتفحص على Theme، والنوع الدقيق فضل.`,
            "TS عارف إن primary هنا string.",
            "وإن danger هنا tuple أرقام.",
            "وبرضه بيمسك المفتاح الناقص زي الـ annotation."
          ],
          sol: R`[[secondary: "#333"]] في [[checked]] بيطلّع Object literal may only specify known properties, and 'secondary' does not exist in type 'Theme' (TS2353). [[satisfies]] بيفحص الشكل كامل: مفاتيح زيادة أو ناقصة.

ولما تكتب [[{ primary: "#0af" } as Theme]] الخطأ بتاع [[danger]] الناقصة بيختفي. [[as]] بيقبل أي حاجة «قريبة كفاية» من النوع، ولو طبعت [[bad.danger]] هتاخد [[undefined]] مع إن النوع بيقول string أو tuple، وده بالظبط الـ bug اللي [[satisfies]] كان هيمنعه.`
        },
        {
          cmd: "as",
          title: "تقول للـ compiler «ثق فيا، أنا عارف النوع»",
          desc: R`[[value as User]] (type assertion) بيغيّر نوع القيمة في عين TS من غير أي فحص وقت التشغيل. لو كنت غلطان، مفيش خطأ دلوقتي، والـ crash بعدين في مكان تاني.

الاستخدامات المقبولة قليلة: عنصر DOM انت متأكد من نوعه، أو بعد فحص TS مش قادر يفهمه. وأي داتا من برّه (API و JSON و req.body) مكانها التحقق الحقيقي (Zod) مش [[as]].`,
          example: R`type User = { id: string; name: string };
const input = document.getElementById("email") as HTMLInputElement;
input.value = "you@example.com";
const user = JSON.parse('{"id": 1}') as User;
console.log(user.name.toUpperCase()); // TypeError وقت التشغيل
const n = "5" as number; // خطأ: Conversion of type 'string' to type 'number' may be a mistake
const forced = "5" as unknown as number;
console.log(forced.toFixed(2)); // TypeError برضه`,
          try: R`غيّر السطر الرابع لـ [[const user: unknown = JSON.parse('{"id": 1}')]] وحاول تقرا [[user.name]]: TS هيجبرك تفحص. وبعدين دوّر في مشروعك بـ [[grep -rn "as unknown as" src]] وشوف كام واحدة.`,
          flag: "script",
          deep: {
            why: "TS مش دايمًا عارف كل حاجة: [[getElementById]] ممكن ترجع أي عنصر، و [[JSON.parse]] بترجع any. و [[as]] موجود عشان تقوله معلومة هو ناقصها. المشكلة إنه بيتستخدم كتير بمعنى «اسكت» بدل «أنا متأكد».",
            how: R`[[as T]] مبيطلّعش أي كود: بيتمسح، والقيمة زي ما هي. و TS بيسمح بيه طالما النوعين «ممكن يتقابلوا» (comparable: شبه assignable في أي اتجاه بس أرخى، مثلًا لو خاصية نوعها union يكفي إن عضو واحد منه يطابق، عشان كده [[{ primary: "#0af" } as Theme]] في درس satisfies عدّى من غير خطأ)، فـ [[HTMLElement as HTMLInputElement]] مسموح لأن input نوع من HTMLElement، و [[string as number]] ممنوع.

[[as unknown as T]] بيعدّي الحماية دي: أي حاجة تتحول لـ unknown، و unknown تتحول لأي حاجة. وفي مشروع حقيقي كان فيه [[(data ?? []) as unknown as DbRow[]]] على نتيجة query: لو شكل الجدول اتغير، TS مش هيقول، والصفحة تقع.

وفيه شكل قديم [[<User>value]] بيعمل نفس الحاجة، بس مبيشتغلش في ملفات .tsx لأنه بيتلخبط مع JSX.

البدائل الأأمن بالترتيب: narrowing بفحص حقيقي، أو type guard، أو Zod للداتا الخارجية، أو [[satisfies]] لو عايز تتأكد من شكل قيمة انت كاتبها.`,
            when: "عناصر DOM لما تكون متأكد (أو [[querySelector<HTMLInputElement>]] مع فحص null)، و mocks في الاختبارات، وبعد فحص TS مش بيفهمه. غير كده، دوّر على بديل.",
            mistakes: R`[[await res.json() as User]] و [[req.body as {...}]]: الاتنين موجودين في مشاريع حقيقية، والاتنين بيصدّقوا أي داتا جاية من برّه. و [[as any]] عشان error يختفي: كده خبّيت الـ bug مش صلّحته. وفي الانترفيو: «as بيحوّل القيمة» غلط، مبيحوّلش أي حاجة وقت التشغيل.`
          },
          teach: R`## الفكرة في سطر

[[x as T]] بتقول لـ TS «اعتبر x نوعها T». مفيش أي فحص ولا تحويل: الكلمة بتتمسح من الـ JS، والقيمة بتفضل زي ما هي. لو كنت غلطان، TS هيصدّقك والبرنامج هو اللي هيقع.

الأخطاء تحت من [[npx tsc --strict --noEmit --lib es2023,dom]] (TypeScript 6.0.3 على ويندوز 11، ونفسها على 7.0.2)، والتشغيل بـ [[npx tsx]] على Node 24.

---

## ١. عنصر DOM

~~~text app.ts
const input = document.getElementById("email") as HTMLInputElement;
input.value = "you@example.com";
~~~

من غير [[as]]، TS بيقول إن [[getElementById]] بترجع:

~~~text الناتج
const raw: HTMLElement | null
~~~

- [[HTMLElement]]: أي عنصر (div أو p أو input)، و [[value]] مش موجودة على أي عنصر.
- [[| null]]: لو مفيش عنصر بالـ id ده.

[[as HTMLInputElement]] بتقول الاتنين مرة واحدة: «ده input، وموجود». ولو الـ id اتغير في الـ HTML، [[input]] هيبقى [[null]] و [[input.value = ...]] هيقع وقت التشغيل.

> [[--lib es2023,dom]] معناها «اديني أنواع JS لحد ES2023، وأنواع المتصفح (document و HTMLInputElement)». من غير [[dom]]، [[document]] مش معروف.

---

## ٢. أخطر استخدام: داتا من برّه

~~~text app.ts
type User = { id: string; name: string };
const user = JSON.parse('{"id": 1}') as User;
console.log(user.name.toUpperCase());
~~~

[[JSON.parse]] نوع رجوعها [[any]] (يعني TS مبيعرفش حاجة عنها)، و [[as User]] خلّت TS يصدّق إنها User. الحقيقة:

- [[id]] رقم مش string.
- [[name]] مش موجودة أصلًا.

~~~text الناتج (npx tsx)
number
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
~~~

(السطر الأول هو [[typeof user.id]]: رقم، مع إن النوع بيقول string.) و tsc ماطلّعش ولا خطأ.

---

## ٣. [[as]] ليها حدود

~~~text app.ts
const n = "5" as number;
~~~

~~~text خطأ tsc
error TS2352: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
~~~

TS بيسمح بـ [[as]] بس لو النوعين «ممكن يتقابلوا»: واحد فيهم أوسع من التاني (زي [[HTMLElement]] و [[HTMLInputElement]]). [[string]] و [[number]] ملهمش أي حاجة مشتركة، فده غالبًا غلط.

---

## ٤. [[as unknown as]]: الباب الخلفي

~~~text app.ts
const forced = "5" as unknown as number;
console.log(forced.toFixed(2));
~~~

بيتقري من الشمال لليمين:

1. [["5" as unknown]]: أي حاجة ينفع تبقى [[unknown]] (النوع اللي «ممكن يبقى أي حاجة»).
2. [[... as number]]: و [[unknown]] ينفع يتحوّل لأي حاجة.

فعدّينا الفحص. والنتيجة:

~~~text الناتج (npx tsx)
TypeError: forced.toFixed is not a function
~~~

لأن القيمة لسه النص [["5"]]، و [[toFixed]] method بتاعة الأرقام.

---

## ٥. الـ JS اللي بيطلع

~~~text out/l09.js (أهم السطور)
const input = document.getElementById("email");
const user = JSON.parse('{"id": 1}');
const forced = "5";
~~~

كل [[as]] اتشالت. ده الدليل إن [[as]] مبيحوّلش أي حاجة: لو عايز تحوّل نص لرقم بجد، [[Number("5")]].

---

## ٦. البديل: [[unknown]] وفحص حقيقي (حل التجربة)

~~~text app.ts
const user: unknown = JSON.parse('{"id": 1}');
console.log(user.name);
~~~

~~~text خطأ tsc
error TS18046: 'user' is of type 'unknown'.
~~~

[[unknown]] بيجبرك تفحص قبل ما تستخدم. والـ solCode بيفحص خطوة خطوة:

| الفحص | بيضمن إيه |
|---|---|
| [[typeof user === "object"]] | إنها object (أو null، عيب قديم في JS) |
| [[user !== null]] | ومش null |
| [["name" in user]] | وفيها خاصية اسمها name |
| [[typeof user.name === "string"]] | ونوعها string |

بعد الأربعة TS ضيّق النوع، و [[user.name.toUpperCase()]] بقت مسموحة. والداتا هنا مفيهاش name، فالناتج:

~~~text الناتج (npx tsx)
الداتا مفيهاش name
~~~

---

## الخلاصة

| تكتب | بيفحص وقت التشغيل؟ | امتى |
|---|---|---|
| [[x as T]] | لأ | DOM انت متأكد منه، أو mocks |
| [[x as unknown as T]] | لأ، وبيعدّي حماية TS كمان | تقريبًا أبدًا |
| [[const x: unknown]] + فحص | آه، انت اللي بتفحص | أي داتا من برّه |
| Zod | آه | API و JSON و req.body (المستوى ٣) |`,
          lines: [
            "النوع.",
            R`[[getElementById]] بترجع [[HTMLElement | null]]، و as بيقول «ده input وموجود». لو الـ id غلط، هيقع.`,
            "TS دلوقتي فاكر إن فيه value.",
            "أخطر استخدام: داتا من برّه. مفيش أي فحص، و id هنا رقم أصلًا.",
            "TS ساكت، ووقت التشغيل: Cannot read properties of undefined.",
            "as مبيسمحش بتحويل بين نوعين ملهمش علاقة ببعض.",
            R`بس [[as unknown as]] بتعدّي أي حاجة لأي حاجة: علامة إن فيه حاجة غلط.`,
            "string على إنها number، والنتيجة crash."
          ],
          sol: R`مع [[const user: unknown]]، [[user.name]] بيطلّع 'user' is of type 'unknown' (TS18046). لازم تفحص قبلها، زي الكود تحت، والناتج [[الداتا مفيهاش name]] بدل الـ TypeError اللي كان بيحصل مع [[as User]].

و [[grep -rn "as unknown as" src]]: كل سطر بيطلع هو مكان كسرت فيه فحص TS مرتين. لو مطلعش حاجة ممتاز، ولو لقيت كتير غالبًا عند API responses أو mocks في الاختبارات. الأولى تتصلح بـ Zod (المستوى ٣)، والتانية مقبولة أكتر.`,
          solCode: R`const user: unknown = JSON.parse('{"id": 1}');
if (typeof user === "object" && user !== null && "name" in user && typeof user.name === "string") {
  console.log(user.name.toUpperCase());
} else {
  console.log("الداتا مفيهاش name");
}`
        },
        {
          cmd: "! (non-null)",
          title: "علامة التعجب بعد القيمة، وليه تبعد عنها",
          desc: R`[[value!]] (non-null assertion) بتقول لـ TS «القيمة دي مش null ولا undefined، ثق فيا». بتشيل الخطأ، بس مبتعملش أي فحص: لو القيمة فعلًا undefined، الكود هيقع وقت التشغيل.

البديل تقريبًا دايمًا أحسن: فحص صريح بـ if مع رسالة خطأ واضحة، أو [[?.]] و [[??]]، أو validation للـ env مرة واحدة أول ما التطبيق يقوم.`,
          example: R`const url = process.env.DATABASE_URL!; // string، ولو ناقص: undefined يعدّي
const key = process.env.API_KEY;
if (!key) throw new Error("API_KEY ناقص في .env");
const el = document.querySelector("#app")!;
const app = document.querySelector("#app");
if (!app) throw new Error("#app مش موجود في الصفحة");
app.textContent = "جاهز";
const byId = new Map<string, number>([["a", 1]]);
const v = byId.get("b")!;
console.log(v.toFixed(1)); // TypeError`,
          try: R`في مشروعك شغّل [[grep -rn "process.env.[A-Z_]*!" src]] وعدّ كام متغير بيئة عليه [[!]]. كل واحد فيهم ممكن يعدّي undefined بصمت لو .env ناقص. والحل في درس Zod للـ env في المستوى ٣.`,
          flag: "script",
          deep: {
            why: "[[!]] أسرع طريقة تخلي الخط الأحمر يختفي، عشان كده بتنتشر. بس هي بتحوّل خطأ واضح وقت الكتابة لخطأ غامض وقت التشغيل: «Cannot read properties of undefined» في سطر بعيد عن السبب.",
            how: R`[[x!]] بتشيل [[null]] و [[undefined]] من نوع x، وبتتمسح تمامًا من الـ JS. يعني [[process.env.URL!]] في الـ JS هي [[process.env.URL]] بالظبط، ومفيش أي فحص.

وفي مشروع حقيقي كان فيه [[process.env.SUPABASE_SERVICE_ROLE_KEY!]] في كذا ملف. لو المتغير ناقص على السيرفر، الـ client بيتعمل بـ undefined، والخطأ بيطلع من جوه المكتبة برسالة ملهاش علاقة بالسبب.

الفحص الصريح ([[if (!key) throw ...]]) نفس عدد السطور تقريبًا، بيدّي رسالة واضحة في المكان الصح، و TS بيضيّق النوع بعده.

فيه حالات [[!]] فيها مقبول: قيمة اتحققت منها سطر فوق بطريقة TS مش فاهمها، و refs في React بعد mount (وحتى دي، الفحص أحسن).`,
            when: "نادرًا جدًا، ولما تبقى متأكد ١٠٠٪ ومش قادر تثبت لـ TS. في الـ env والـ DOM و [[Map.get]]، لأ: افحص.",
            mistakes: R`[[!]] على كل [[process.env]]، والتطبيق يقوم «عادي» ويقع أول ما حد يستخدم الخدمة. و [[user!.name]] عشان خطأ strictNullChecks يختفي. وفي الانترفيو: «! بيتأكد إن القيمة موجودة» غلط، مبيتأكدش من حاجة.`
          },
          teach: R`## الفكرة في سطر

[[!]] بعد قيمة بتشيل [[null]] و [[undefined]] من نوعها، من غير أي فحص. الفحص الصريح ([[if (!x) throw ...]]) بيوصل لنفس النوع، بس بيقع في المكان الصح وبرسالة مفهومة.

الأنواع تحت من TypeScript 6.0.3 على ويندوز 11 (مع [[--types node]] عشان [[process]]، و [[--lib es2023,dom]] عشان [[document]])، والتشغيل بـ [[npx tsx]] على Node 24.

---

## ١. متغيرات البيئة: بـ [[!]] ومن غيرها

~~~text app.ts
const url = process.env.DATABASE_URL!;
const key = process.env.API_KEY;
~~~

- [[process.env]]: متغيرات البيئة (Environment Variables) في Node، وكل واحد فيهم ممكن يبقى مش موجود.
- [[!]] بعد القيمة اسمها non-null assertion.

~~~text الناتج
const url: string
const key: string | undefined
~~~

TS شال [[undefined]] من نوع [[url]] لأنك قلتله. بس وقت التشغيل مفيش حاجة اتغيرت:

~~~text out/l10.js
const url = process.env.DATABASE_URL; // string، ولو ناقص: undefined يعدّي
~~~

و [[!]] اتمسحت. شغّلناه من غير المتغير وطبعنا [[url]] ([[console.log("url =", url)]]):

~~~text الناتج (npx tsx)
url = undefined
~~~

ولا خطأ، و [[url]] اللي TS فاكرها string هتتبعت لمكتبة القاعدة كـ undefined، والخطأ هيطلع من جوه المكتبة برسالة ملهاش علاقة.

---

## ٢. الفحص الصريح

~~~text app.ts
if (!key) throw new Error("API_KEY ناقص في .env");
~~~

- [[!key]] هنا **قبل** القيمة: دي «not» بتاعة JS، مش non-null. معناها «لو key فاضية أو undefined».
- [[throw new Error(...)]] بيوقف البرنامج برسالة واضحة.

وبعد السطر ده TS ضيّق النوع (narrowing): أي استخدام لـ [[key]] تحته نوعه [[string]]. ولما شغّلناه من غير المتغير:

~~~text الناتج (npx tsx)
Error: API_KEY ناقص في .env
~~~

الرسالة بتقولك السبب بالظبط، أول ما التطبيق يقوم.

> نفس الرمز [[!]] ليه معنيين: **بعد** القيمة ([[x!]]) = non-null assertion بتاعة TS وبتتمسح، و **قبلها** ([[!x]]) = not بتاعة JS وبتشتغل وقت التشغيل.

---

## ٣. عناصر DOM

~~~text app.ts
const el = document.querySelector("#app")!;
const app = document.querySelector("#app");
if (!app) throw new Error("#app مش موجود في الصفحة");
app.textContent = "جاهز";
~~~

~~~text الناتج
const el: Element
const app: Element | null
~~~

[[querySelector]] بترجع [[null]] لو مفيش عنصر. [[el]] بـ [[!]] نوعها [[Element]] على طول، أما [[app]] اتفحص الأول، وبعد الفحص [[app.textContent]] مسموح.

---

## ٤. [[Map.get]] بـ [[!]]

~~~text app.ts
const byId = new Map<string, number>([["a", 1]]);
const v = byId.get("b")!;
console.log(v.toFixed(1));
~~~

- [[new Map<string, number>(...)]]: قاموس مفاتيحه string وقيمه number، فيه مفتاح واحد [["a"]].
- [[byId.get("b")]] نوعها [[number | undefined]] لأن المفتاح ممكن ميكونش موجود، و [[!]] شالت undefined فبقت [[number]].

~~~text الناتج (npx tsx)
TypeError: Cannot read properties of undefined (reading 'toFixed')
~~~

tsc مطلّعش ولا خطأ على الملف كله (صفر أخطاء)، وده بالظبط المشكلة.

---

## ٥. التجربة: [[grep]] على المشروع

~~~bash
grep -rn "process.env.[A-Z_]*!" src
~~~

| الحتة | معناها |
|---|---|
| [[grep]] | دوّر على نص جوه ملفات |
| [[-r]] | recursive: جوه كل الفولدرات اللي تحت src |
| [[-n]] | اكتب رقم السطر |
| [[[A-Z_]*]] | أي عدد من الحروف الكبيرة و _ (اسم المتغير) |
| [[!]] في الآخر | علامة التعجب بعده |

جرّبناه في Git Bash على فولدر تجربة فيه ٤ سطور:

~~~text الناتج
src/env.ts:1:const url = process.env.DATABASE_URL!;
src/env.ts:3:const s = process.env.SECRET_X!;
src/env.ts:4:if (process.env.MODE!== "a") {}
~~~

السطر التاني ([[process.env.API_KEY]] من غير [[!]]) مطلعش. والسطر الأخير مقارنة [[!==]] مش non-null، فبص على كل سطر بعينك. (و [[.]] في الـ pattern معناها «أي حرف» مش نقطة بس، وده مش فارق هنا.)

---

## الخلاصة

| تكتب | النوع بعدها | وقت التشغيل لو القيمة ناقصة |
|---|---|---|
| [[x!]] | من غير null و undefined | undefined بيعدّي، والخطأ بعيد |
| [[if (!x) throw ...]] | من غير null و undefined | خطأ واضح في نفس السطر |
| [[x?.y]] و [[x ?? def]] | بيتعامل مع الناقص | مفيش crash |`,
          lines: [
            R`[[!]] شالت undefined من النوع. لو المتغير ناقص، الغلط هيظهر بعدين في مكان بعيد.`,
            R`من غير [[!]]: النوع [[string | undefined]].`,
            "فحص صريح: رسالة واضحة، و TS بيضيّق النوع لـ string بعدها.",
            R`[[!]] على عنصر DOM: لو الـ id اتغير، هيقع في مكان تاني.`,
            R`نفس الحاجة من غير [[!]].`,
            "فحص صريح.",
            "آمن، و TS عارف إنه موجود.",
            "Map فيها مفتاح واحد.",
            R`[[!]] على [[get]] لمفتاح مش موجود.`,
            "crash: Cannot read properties of undefined."
          ],
          sol: R`المطلوب هنا عدّ مش ناتج ثابت. كل سطر زي [[src/env.ts:1:const url = process.env.DATABASE_URL!;]] بيتحسب واحد. أما [[const k = process.env.API_KEY;]] من غير [[!]] مش هيطلع، وده كويس لأن TS هيجبرك تفحصه.

لو العدد صفر ومشروعك فيه env كتير، اتأكد إنك بتدوّر في الفولدر الصح (ممكن [[app]] أو [[lib]] مش [[src]]). ولاحظ إن الـ grep ممكن يمسك [[process.env.X!== "a"]] لو مكتوبة من غير مسافة، ودي مقارنة مش non-null، فبص على كل سطر بعينك. وكل [[!]] حقيقي فيهم قراره: يا فحص صريح بيرمي خطأ واضح، يا تنقله لملف env واحد بـ Zod.`
        },
        {
          cmd: ".d.ts و @types",
          title: "مكتبة JS من غير أنواع: الأنواع بتيجي منين",
          desc: R`ملف [[.d.ts]] (declaration file) فيه أنواع بس من غير كود. المكتبات الحديثة بتيجي بأنواعها جواها. والمكتبات القديمة المكتوبة JS أنواعها في باكدج منفصلة اسمها [[@types/اسم-المكتبة]] من مشروع DefinitelyTyped: [[npm i -D @types/express]].

ولو مفيش أنواع خالص، بتكتب [[declare module "lib"]] في ملف .d.ts عندك وتوصف فيه اللي بتستخدمه بس.`,
          example: R`// src/types/modules.d.ts: مفيش import ولا export على المستوى الأعلى
declare module "legacy-sms" {
  export function sendSms(to: string, text: string): Promise<{ id: string }>;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "untyped-lib";`,
          try: R`في مشروع Express، امسح [[@types/express]] ([[npm rm -D @types/express]]) وشغّل [[npx tsc --noEmit]]: هتشوف [[Could not find a declaration file for module 'express']]. وبعدين رجّعه.`,
          flag: "script",
          deep: {
            why: "TS محتاج يعرف شكل كل حاجة بتستوردها. ومكتبات كتير اتكتبت JS قبل TS، ومش هتتعاد كتابتها. الـ declaration files بتوصفها من برّه، فتاخد autocomplete وفحص من غير ما حد يلمس كود المكتبة.",
            how: R`لما تكتب [[import x from "lib"]]، TS بيدوّر على الأنواع بالترتيب: خانة [[types]] أو [[exports]] في package.json بتاع المكتبة (المكتبات الحديثة زي zod و axios)، وبعدين [[node_modules/@types/lib]]. لو ملقاش، ومع [[strict]]: خطأ TS7016 «Could not find a declaration file for module».

الـ [[@types/*]] باكدجات منفصلة بيكتبها المجتمع (DefinitelyTyped)، ونسختها لازم تمشي مع نسخة المكتبة ([[@types/express@5]] مع express 5). وبتتسطّب [[-D]] لأنها للفحص بس.

فيه نوعين @types: اللي بتستوردها (express) بتشتغل لوحدها، واللي بتضيف globals ([[@types/node]] بيضيف [[process]] و [[Buffer]]، و [[@types/jest]] بيضيف [[describe]]). وفي TS 6 و 7، [[types]] في tsconfig افتراضيًا [[[]]]، فالنوع التاني لازم تكتبه: [["types": ["node"]]].

[[declare module "x" { ... }]] في ملف .d.ts بيعرّف أنواع لمكتبة. ومهم إن الملف يكون ambient (مفيهوش import ولا export على المستوى الأعلى)، لأن لو فيه، [[declare module]] بتبقى «تعديل على مكتبة موجودة» (module augmentation، المستوى ٣) مش تعريف جديد. وملفات .d.ts لازم تكون جوه [[include]] في tsconfig.`,
            when: "أي مكتبة بتطلّع TS7016. وملفات assets ([[*.svg]] و [[*.css]]) لو الـ bundler مش مغطيها. وتضيف globals زي [[window.dataLayer]].",
            mistakes: R`تسطّب [[@types/x]] لمكتبة أصلًا فيها أنواعها (زي axios): الباكدج دي بتبقى stub قديم ملوش لازمة. وتسطّب @types في dependencies مش devDependencies. وملف .d.ts فيه [[import]] في أوله فالـ [[declare module]] يبطل يعرّف مكتبة جديدة. و [[declare module "lib";]] من غير body وتنساه: كل حاجة من المكتبة any للأبد.`
          },
          teach: R`## الفكرة في سطر

TS محتاج يعرف شكل كل حاجة بتعملها [[import]]. لو المكتبة مكتوبة JS ومعهاش أنواع، يا تسطّب أنواعها من [[@types/...]]، يا تكتبها انت في ملف [[.d.ts]] بـ [[declare module]].

جرّبنا كل ده في مشروع صغير على ويندوز 11 فيه TypeScript 6.0.3 و express 5، والـ tsconfig فيه [[strict]] و [[types: ["node"]]] و [[include: ["src"]]]، وشغّلنا [[npx tsc]].

---

## ١. الملف كله: إيه هو [[.d.ts]]؟

[[.d.ts]] (d = declaration) ملف فيه **أنواع بس**: توقيعات دوال وأشكال objects، من غير ولا سطر كود بيتنفّذ. tsc بيقراه عشان يفحص، ومبيطلّعش منه JS.

~~~text src/types/modules.d.ts
declare module "legacy-sms" {
  export function sendSms(to: string, text: string): Promise<{ id: string }>;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "untyped-lib";
~~~

---

## ٢. [[declare module "legacy-sms" { ... }]]

- [[declare]] معناها «الحاجة دي موجودة في مكان تاني وقت التشغيل، أنا بوصف شكلها بس».
- [[module "legacy-sms"]] اسم الباكدج بالظبط زي ما بتكتبه في الـ import.
- جوه الأقواس: [[export]] لكل حاجة بتستوردها منها، من غير جسم للدالة (مفيش [[{ }]] بعد التوقيع).

بعدها في [[src/app.ts]]:

~~~text src/app.ts
import { sendSms } from "legacy-sms";
const r = sendSms("+2010", "hi");
sendSms(5, "hi");
~~~

~~~text الناتج (النوع) والخطأ
const r: Promise<{ id: string; }>
error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
~~~

TS بقى بيفحص المكتبة بالأنواع اللي انت كتبتها.

---

## ٣. [[declare module "*.svg"]]: wildcard

[[*]] معناها «أي اسم». فأي [[import logo from "./logo.svg"]] نوعه:

~~~text الناتج
const l: string
~~~

- [[const src: string;]] بيوصف قيمة من غير ما يديها قيمة.
- [[export default src;]] بيقول إنها الـ default export، فتتستورد من غير أقواس.

ده لأن الـ bundler (Vite مثلًا) بيحوّل ملف الصورة لـ URL نصي وقت الـ build.

---

## ٤. [[declare module "untyped-lib";]]: أقصر شكل

من غير body خالص. معناها «المكتبة موجودة، وكل حاجة منها [[any]]»:

~~~text الناتج
import anything from "untyped-lib";
const a = anything.foo.bar;      // a: any
~~~

ولا فحص، ولا autocomplete. حل مؤقت بس.

---

## ٥. ليه «مفيش import ولا export على المستوى الأعلى»؟

جرّبنا نضيف سطر [[import "node:fs";]] أول الملف. الـ [[.d.ts]] بقى module، و [[declare module "..."]] جواه بقت تعني «عدّل على مكتبة موجودة» (module augmentation) مش «عرّف مكتبة»:

~~~text خطأ tsc
src/app.ts(1,25): error TS2307: Cannot find module 'legacy-sms' or its corresponding type declarations.
src/app.ts(2,18): error TS2307: Cannot find module './logo.svg' or its corresponding type declarations.
src/app.ts(3,22): error TS2307: Cannot find module 'untyped-lib' or its corresponding type declarations.
~~~

التلاتة اختفوا مرة واحدة. شلنا السطر ورجعوا.

---

## ٦. التجربة: من غير [[@types/express]]

express 5 مكتوبة JS، وأنواعها في باكدج منفصلة. شلناها:

~~~bash
npm rm -D @types/express
npx tsc --noEmit
~~~

- [[npm rm -D]]: شيل الباكدج من devDependencies.
- [[--noEmit]]: افحص بس ومتكتبش ملفات JS.

~~~text خطأ tsc
src/app.ts(4,21): error TS7016: Could not find a declaration file for module 'express'. '.../node_modules/express/index.js' implicitly has an 'any' type.
  Try $__btnpm i --save-dev @types/express$__bt if it exists or add a new declaration (.d.ts) file containing $__btdeclare module 'express';$__bt
src/app.ts(6,15): error TS7006: Parameter 'req' implicitly has an 'any' type.
src/app.ts(6,20): error TS7006: Parameter 'res' implicitly has an 'any' type.
~~~

TS7016 نفسه بيقترح الحلين اللي في الدرس. وبعد [[npm i -D @types/express]] رجع صفر أخطاء، و [[express()]] نوعه [[Express]].

---

## ٧. [[types]] في TS 6 و 7

النوع التاني من @types هو اللي بيضيف globals زي [[process]] (من [[@types/node]]). جرّبنا ملف فيه [[console.log(process.env.HOME)]] و tsconfig مفيهوش [[types]]، في فولدر [[@types/node]] متسطّب فيه:

~~~text خطأ tsc (TS 6.0.3 و TS 7.0.2)
error TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try $__btnpm i --save-dev @types/node$__bt and then add 'node' to the types field in your tsconfig.
~~~

لأن [[types]] بقى افتراضيًا [[[]]] في النسختين، فلازم تكتب [["types": ["node"]]]. (فرق صغير: tsc 6 خرج بـ exit code 2، و tsc 7 بـ 1. لو عندك script بيفحص الرقم بالظبط، خد بالك.)

---

## الخلاصة

| الموقف | الحل |
|---|---|
| المكتبة فيها أنواعها (zod و axios) | ولا حاجة |
| مكتبة JS قديمة ليها DefinitelyTyped | [[npm i -D @types/اسمها]] |
| globals زي process | [[@types/node]] + [["types": ["node"]]] |
| مفيش أنواع خالص | [[declare module "x" { ... }]] في .d.ts |
| ملفات assets | [[declare module "*.svg"]] |`,
          lines: [
            "أنواع لمكتبة JS ملهاش أنواع.",
            "بتوصف الدوال اللي بتستخدمها بس، مش المكتبة كلها.",
            "قفلة.",
            R`wildcard: أي import لملف .svg...`,
            "...بيرجع string (الـ bundler بيحوّله لـ URL)...",
            "...كـ default export.",
            "قفلة.",
            R`أقصر شكل: المكتبة موجودة وكل حاجة منها [[any]]. حل مؤقت بس.`
          ],
          sol: R`بعد [[npm rm -D @types/express]] و [[npx tsc --noEmit]] هتشوف: [[error TS7016: Could not find a declaration file for module 'express'.]] وبعدها [['.../node_modules/express/index.js' implicitly has an 'any' type]] واقتراح [[npm i --save-dev @types/express]]. ومعاه أخطاء TS7006 على [[req]] و [[res]] في كل handler، لأنهم بقوا any.

لو مطلعش أي خطأ، يا [[strict]] (أو [[noImplicitAny]]) مقفول، يا فيه نسخة من [[@types/express]] في [[node_modules]] في فولدر أعلى (TS بيدوّر لفوق). وبعد [[npm i -D @types/express]] الأخطاء بتختفي.`
        }
      ]
    }
]);

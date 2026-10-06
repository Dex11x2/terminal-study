// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "tsconfig",
      l: 3,
      n: "الفحص قد إيه صارم، و TS بيلاقي الـ imports إزاي، وبيطلّع JS لأنهي بيئة",
      items: [
        {
          cmd: "strict و noUncheckedIndexedAccess",
          title: "إعدادات الفحص اللي بتخلي TS يمسك الغلط بجد",
          desc: R`[["strict": true]] بيشغّل مجموعة فحوصات مع بعض، أهمهم [[strictNullChecks]] و [[noImplicitAny]]. من غيره TS بيسيب نص الأخطاء تعدّي. وفي TS 6 و 7 بقى الافتراضي، بس اكتبه صريح عشان محدش يشيله.

وفوقه، [[noUncheckedIndexedAccess]] بيخلي [[arr[i]]] و [[obj[key]]] نوعهم [[T | undefined]]، لأن العنصر ممكن ميكونش موجود. ده بيمسك نوع كامل من الأخطاء اللي strict لوحده مش بيمسكها.`,
          example: R`// "noUncheckedIndexedAccess": true في tsconfig
const tags = ["ts", "react"];
const first = tags[0];
first.toUpperCase(); // خطأ: 'first' is possibly 'undefined'
if (first) first.toUpperCase();
for (const t of tags) t.toUpperCase();
const prices: Record<string, number> = { tea: 10 };
const coffee = prices["coffee"];
const total = (coffee ?? 0) * 2;
prices.tea.toFixed(2); // خطأ: 'prices.tea' is possibly 'undefined'`,
          try: R`شغّل [[noUncheckedIndexedAccess]] في مشروع قايم و [[npx tsc --noEmit]]، وعدّ الأخطاء اللي طلعت. أغلبها هتلاقيه [[arr[0]]] أو [[params[id]]]، وكل واحد منهم كان crash محتمل.`,
          flag: "script",
          deep: {
            why: "TS من غير strict بيسيب أهم الأخطاء: null في أي نوع، وباراميترات من غير نوع بتبقى any بهدوء. ومع strict لوحده، [[arr[0]]] لسه بيتعامل كأنه موجود دايمًا، وده من أشهر أسباب «Cannot read properties of undefined» في كود TS.",
            how: R`[[strict]] مش إعداد واحد، ده اختصار لعيلة: [[strictNullChecks]] (null و undefined مش في أي نوع)، و [[noImplicitAny]] (ممنوع any متستنتج)، و [[strictFunctionTypes]]، و [[strictBindCallApply]]، و [[strictPropertyInitialization]] (خصايص الكلاس لازم تتعمل في الـ constructor)، و [[useUnknownInCatchVariables]] (e في catch نوعها unknown)، وغيرهم. وأي فحص جديد من النوع ده بيتضاف للعيلة مع الوقت.

[[noUncheckedIndexedAccess]] مش جوه strict لأنه بيطلّع أخطاء كتير في كود قديم. بيضيف [[| undefined]] لأي قراية بـ index: [[arr[i]]]، و [[record[key]]]، وحتى [[record.key]] لو النوع index signature. الـ tuples ([[[string, number]]]) مش متأثرة لأن طولها معروف، و [[for...of]] و [[map]] مش متأثرين. و [[tsc --init]] الجديد بيشغّله.

[[exactOptionalPropertyTypes]] بيفرّق بين «الخاصية مش موجودة» و «موجودة وقيمتها undefined». أدق، بس بيضايق مع مكتبات كتير، فناس بتقفله.

و [[skipLibCheck]] بيقفل فحص ملفات .d.ts بتاعة المكتبات: أسرع بكتير، ومش بيأثر على فحص كودك.`,
            when: "[[strict]] من أول يوم في أي مشروع، من غير نقاش. و [[noUncheckedIndexedAccess]] في المشاريع الجديدة، أو تدريجيًا في القديمة. وفي مشروع حقيقي (monorepo) كان شغال في الـ base config مع [[noImplicitReturns]] و [[noFallthroughCasesInSwitch]]، ودي بداية كويسة.",
            mistakes: R`مشروع قديم [[strict: false]] ومحدش واخد باله، فنص TS مقفول. و [[// @ts-ignore]] فوق كل خطأ: لو لازم، استخدم [[// @ts-expect-error]]، لأنها بتطلّع خطأ لو المشكلة اتحلت فتفتكر تشيلها. وتحل أخطاء noUncheckedIndexedAccess كلها بـ [[!]].`
          },
          teach: R`## الفكرة في سطرين

المثال ملف TS صغير، والمهم فيه مش الكود نفسه، المهم إن **نفس الكود** بيطلّع أخطاء أو لأ حسب إعدادين في [[tsconfig.json]]. هنفحصه مرة بـ [[noUncheckedIndexedAccess]] ومرة من غيره ونشوف الفرق.

كل اللي تحت اتشغّل على ويندوز 11 بـ Node 24 و TypeScript 6.0.3، وبعدين نفس الملفات بـ TypeScript 7.0.2، بالأمر [[npx tsc -p .]] ([[-p]] = project: اقرا الـ tsconfig اللي في الفولدر ده).

---

## ١. الـ tsconfig اللي اتجرّب بيه

~~~text tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true
  },
  "include": ["app.ts"]
}
~~~

- [[compilerOptions]]: كل إعدادات الفحص لازم تبقى جوه الـ object ده. لو حطيتها برّاه TS بيتجاهلها.
- [["strict": true]]: يشغّل عيلة الفحوصات الصارمة كلها مرة واحدة.
- [["noUncheckedIndexedAccess": true]]: أي قراية بـ index ([[arr[i]]] أو [[obj[key]]]) نوعها يبقى [[... | undefined]].
- [["noEmit": true]]: افحص بس ومتكتبش ملفات JS. ده اللي بتعمله في الـ CI.
- [[include]]: الملفات اللي TS يفحصها.

(الـ config اللي اتجرّب كان فيه كمان [[target]] و [[module]]، ودول ملهمش دعوة بالأخطاء هنا: الدرس الجاي.)

---

## ٢. [[strict]] بيعمل إيه أصلًا

جرّبنا ملف فيه غلطتين كلاسيك:

~~~text a.ts
function f(x) { return x; }
let n: number = null;
~~~

~~~text الناتج: tsc من غير ما نكتب strict (TS 6 و TS 7)
a.ts(1,12): error TS7006: Parameter 'x' implicitly has an 'any' type.
a.ts(2,5): error TS2322: Type 'null' is not assignable to type 'number'.
~~~

- TS7006 جاي من [[noImplicitAny]]: باراميتر من غير نوع كان هيبقى [[any]] بهدوء.
- TS2322 هنا جاي من [[strictNullChecks]]: [[null]] مش جزء من [[number]].

الاتنين طلعوا **من غير** ما نكتب [[strict]]، لأنه بقى الافتراضي في TS 6 و 7. ولما كتبنا [["strict": false]] صراحة، الخطأين اختفوا وخرج بـ exit code 0. عشان كده اكتبه [[true]] صريح: لو حد نسخ config قديم فيه [[false]]، نص الفحص بيتقفل من غير ما حد ياخد باله.

---

## ٣. القراية بـ index

~~~text app.ts
const tags = ["ts", "react"];
const first = tags[0];
first.toUpperCase();
~~~

- [[tags]]: TS استنتج إن نوعها [[string[]]] (ليستة strings، طولها مش معروف).
- [[tags[0]]]: أول عنصر. TS ميعرفش الليستة فيها كام عنصر وقت التشغيل، فمع الإعداد ده نوع [[first]] بقى [[string | undefined]].

عشان نتأكد من النوع، حطيناه في متغير [[boolean]] بالعمد، و TS قال النوع في رسالة الخطأ:

~~~text الناتج
Type 'string | undefined' is not assignable to type 'boolean'.
~~~

و [[first.toUpperCase()]] بقى خطأ:

~~~text الناتج: npx tsc -p .
app.ts(3,1): error TS18048: 'first' is possibly 'undefined'.
~~~

[[TS18048]] معناها «المتغير ده ممكن يكون undefined وانت بتستخدمه». ولو كتبت [[tags[0].toUpperCase()]] على طول من غير متغير، الرسالة بتبقى [[TS2532: Object is possibly 'undefined'.]]، نفس المعنى بس من غير اسم.

ده مش فحص نظري: لو الليستة فاضية فعلًا، JS بيقع:

~~~text الناتج: node -e "const empty=[]; empty[0].toUpperCase()"
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
~~~

---

## ٤. إزاي تعدّي الفحص صح

~~~text app.ts
if (first) first.toUpperCase();
for (const t of tags) t.toUpperCase();
~~~

- [[if (first)]]: فحص حقيقي. جوه الـ if، TS عارف إن [[first]] مش undefined، فالنوع اتضيّق لـ [[string]] (ده narrowing، اتشرح في المستوى ١).
- [[for (const t of tags)]]: [[for...of]] بيلف على العناصر الموجودة بس، فكل [[t]] نوعها [[string]] من غير undefined. عشان كده الإعداد ده مش بيضايقك في اللفّ.

والـ tuple برضه مش متأثر: [[const pair: [string, number] = ["a", 1]]] و [[pair[0]]] نوعها [[string]] بس، لأن طول الـ tuple معروف.

---

## ٥. القواميس: [[Record<string, number>]]

~~~text app.ts
const prices: Record<string, number> = { tea: 10 };
const coffee = prices["coffee"];
const total = (coffee ?? 0) * 2;
prices.tea.toFixed(2);
~~~

- [[Record<string, number>]]: object أي مفتاح string فيه قيمته number. يعني TS مش عارف المفاتيح الموجودة فعلًا.
- [[prices["coffee"]]]: مفتاح مش موجود، فنوع [[coffee]] بقى [[number | undefined]] (اتأكدنا بنفس حيلة الـ boolean). وده الصح: وقت التشغيل قيمته [[undefined]] فعلًا.
- [[coffee ?? 0]]: [[??]] (nullish coalescing) معناها «لو الشمال null أو undefined خد اليمين». فـ [[total]] نوعها [[number]] عادي.
- [[prices.tea.toFixed(2)]]: حتى بالنقطة، النوع Record بيقول «أي مفتاح»، فـ TS مش ضامن إن [[tea]] موجودة:

~~~text الناتج: npx tsc -p .
app.ts(9,1): error TS18048: 'prices.tea' is possibly 'undefined'.
~~~

---

## ٦. نفس الملف من غير الإعداد

شلنا [[noUncheckedIndexedAccess]] وسبنا [[strict]] بس:

~~~text الناتج
exit=0
~~~

ولا خطأ. [[first]] بقت [[string]]، و TS ساكت عن [[first.toUpperCase()]] مع إنها ممكن تقع. ده بالظبط اللي الإعداد بيضيفه فوق [[strict]].

---

## ٧. TS 6 و TS 7: الفرق في الـ exit code

نفس الأخطاء بنفس الأكواد طلعت من الاتنين. الفرق في الرقم اللي [[tsc]] بيخرج بيه:

| الحالة | TS 6.0.3 | TS 7.0.2 |
|---|---|---|
| مفيش أخطاء | 0 | 0 |
| فيه أخطاء مع [[noEmit]] | 2 | 1 |

الـ CI بيعتبر أي رقم غير 0 فشل، فالاتنين بيوقفوا الـ build. بس لو عندك سكربت بيقارن بـ [[2]] بالظبط، هيتلخبط مع TS 7.

وكمان [[tsc --init]] في الاتنين بيكتب config فيه [["strict": true]] و [["noUncheckedIndexedAccess": true]] و [["exactOptionalPropertyTypes": true]] جاهزين.

---

## الخلاصة

- [[strict]] عيلة فحوصات، وبقت الافتراضي في TS 6 و 7، بس اكتبها صريح.
- [[noUncheckedIndexedAccess]] بيضيف [[| undefined]] لـ [[arr[i]]] و [[record[key]]]، ومش بيأثر على [[for...of]] ولا الـ tuples.
- الحل فحص ([[if]]) أو قيمة بديلة ([[??]])، مش [[!]] على كل سطر.`,
          lines: [
            "ليستة strings.",
            R`نوعها [[string | undefined]] مع الإعداد ده. من غيره: string وخلاص.`,
            "الليستة ممكن تبقى فاضية، فممنوع من غير فحص.",
            "بعد الفحص تمام.",
            R`[[for...of]] مش متأثر: كل عنصر فيه string أكيد.`,
            "قاموس مفاتيحه أي string.",
            R`مفتاح مش موجود: [[number | undefined]]، وده الحقيقي.`,
            "قيمة بديلة.",
            R`حتى بالنقطة: الـ Record مش ضامن إن [[tea]] موجودة.`
          ],
          sol: R`مفيش عدد صح. المهم تصنّف الأخطاء. هتلاقي أغلبها TS2532 (Object is possibly 'undefined') أو TS18048 ('x' is possibly 'undefined') على [[arr[0]]] و [[params[id]]] و [[map[key]]]. أما [[for...of]] و [[.map]] و [[.find]] (دي كانت undefined من الأول) مش هتتأثر.

الحل لكل واحد: فحص ([[if (!first) return]])، أو default بـ [[??]]، أو [[.at(0)]] مع فحص. متحطش [[!]] على الكل عشان الأخطاء تختفي، كده رجعت لنفس المشكلة. ولو مطلعش ولا خطأ، اتأكد إنك حطيت الإعداد جوه [[compilerOptions]] مش برّاها.`
        },
        {
          cmd: "module و moduleResolution",
          title: "TS بيدوّر على الـ imports إزاي، وبيطلّع JS لأنهي بيئة",
          desc: R`[[module]] بيقول شكل الـ imports في الـ JS الناتج، و [[moduleResolution]] بيقول TS يلاقي الملف اللي بتستورده إزاي. والقاعدة: لو فيه bundler (Vite و Next) [["module": "esnext"]] مع [["moduleResolution": "bundler"]]. ولو Node بيشغّل الناتج مباشرة [["module": "nodenext"]]، وهو بيظبط الـ resolution لوحده.

و [[target]] نسخة JS اللي هتطلع: Node 24 والمتصفحات الحديثة بيفهموا [[es2024]] أو أحدث، فمفيش سبب تنزل لـ ES5 (اللي اتشالت أصلًا في TS 7).`,
          example: R`// tsconfig.json لسيرفر Node (Express) بيتبني بـ tsc
{
  "compilerOptions": {
    "target": "es2024",
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "types": ["node"],
    "strict": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
// Vite أو Next: "module": "esnext" و "moduleResolution": "bundler" و "noEmit": true`,
          try: R`في مشروع Node بـ [["module": "nodenext"]] و [["type": "module"]]، اكتب [[import { db } from "./db"]] من غير امتداد وشوف الخطأ، وبعدين خليها [[./db.js]] (أيوة .js، مع إن الملف .ts).`,
          flag: "script",
          deep: {
            why: "أغرب أخطاء TS جاية من هنا: [[Cannot find module]] والملف موجود، أو [[ERR_MODULE_NOT_FOUND]] وقت التشغيل، أو import شغال في Vite ومش شغال في Node. كلها لأن TS فاكر إن الكود هيشتغل في بيئة، وهو بيشتغل في بيئة تانية.",
            how: R`فيه سؤالين منفصلين:

الأول: الـ JS الناتج شكله إيه؟ ده [[module]]. [[nodenext]] بيطلّع ESM أو CommonJS لكل ملف حسب package.json ([["type": "module"]]) أو الامتداد ([[.mts]] و [[.cts]]). و [[esnext]] بيطلّع ESM دايمًا وبيسيب الباقي للـ bundler.

التاني: [[import "./db"]] يعني أنهي ملف؟ ده [[moduleResolution]]. [[bundler]] بيقلّد Vite و webpack: الامتداد اختياري، و [[index.ts]] بيتلاقي لوحده. و [[nodenext]] بيقلّد Node بالظبط: في ESM الامتداد إجباري، ولأن TS مبيغيّرش الـ imports، بتكتب [[./db.js]] (الملف اللي هيبقى موجود بعد الـ build) مع إن الملف عندك [[db.ts]].

[[moduleResolution: node]] (أو [[node10]]) القديم اتشال في TS 7: في مشروع حقيقي كان الـ backend عليه مع [["module": "commonjs"]]، وأول ما يترقّى لـ TS 7 هيطلّع خطأ. وكمان [[baseUrl]] اتشال، و [[esModuleInterop]] بقى شغال دايمًا.

[[target]] بيحدد الـ syntax الناتج بس، و [[lib]] بيحدد الأنواع المتاحة ([[DOM]] للمتصفح). و [[verbatimModuleSyntax]] بيخلي TS يطلّع الـ imports زي ما هي بالظبط، وده بيجبرك تكتب [[import type { User }]] للأنواع: مهم لأدوات زي esbuild و Node اللي بتترجم ملف ملف ومتعرفش إن User نوع مش قيمة.`,
            when: "Next و Vite وأي bundler: [[bundler]] و [[esnext]] و [[noEmit]]. سيرفر Node بتعمله build بـ tsc: [[nodenext]]. ولو بتشغّل بـ tsx بس ومش بتعمل build: [[bundler]] بيريّحك من الامتدادات.",
            mistakes: R`[[moduleResolution: bundler]] في سيرفر Node بيتبني بـ tsc: TS يوافق على [[import "./db"]] من غير امتداد، والـ build ينجح، و Node يقع بـ [[ERR_MODULE_NOT_FOUND]]. ونسخ tsconfig من مشروع Next لمشروع Express. وخلط [["type": "module"]] في package.json مع [["module": "commonjs"]].`
          },
          teach: R`## الفكرة في سطرين

المثال [[tsconfig.json]] لسيرفر Node بيتبني بـ [[tsc]] ويتشغّل بـ [[node]]. هنمشي عليه سطر سطر، وبعدين نعمل مشروع صغير بيه ونجرّب الـ imports الصح والغلط.

اتجرّب على ويندوز 11 بـ Node 24 و TypeScript 6.0.3، ونفس الملفات بـ TypeScript 7.0.2. المشروع: [[package.json]] فيه [[{ "type": "module" }]]، و [[src/db.ts]] بيصدّر [[db]] ونوع [[User]]، و [[src/index.ts]] بيستوردهم.

---

## ١. [[target]]: الـ JS هيطلع بأنهي نسخة

~~~text tsconfig.json
"target": "es2024",
~~~

[[es2024]] = ECMAScript 2024، نسخة JavaScript. TS بيكتب الـ syntax زي ما هو لو النسخة دي بتفهمه، ولو لأ بيحوّله لحاجة أقدم. Node 24 بيفهم es2024 كله، فالناتج قريب جدًا من الكود الأصلي: [[first?.name]] فضلت [[?.]] زي ما هي.

---

## ٢. [[module]]: شكل الـ imports في الناتج

~~~text tsconfig.json
"module": "nodenext",
~~~

[[nodenext]] = «زي Node الحديث». بيبص على [[package.json]]: لو فيه [["type": "module"]] الملفات بتطلع ESM ([[import]] و [[export]])، ولو لأ بتطلع CommonJS ([[require]]). ولما [[module]] يبقى [[nodenext]]، [[moduleResolution]] بيبقى [[nodenext]] لوحده، فمش محتاج تكتبه.

---

## ٣. [[rootDir]] و [[outDir]]: منين ولفين

~~~text tsconfig.json
"rootDir": "src",
"outDir": "dist",
~~~

- [[rootDir]]: فولدر الكود المصدر. [[src/index.ts]] هيطلع [[dist/index.js]] (بنفس المسار جوه src).
- [[outDir]]: مكان الـ JS الناتج. بعد [[npx tsc -p .]] لقينا [[dist/db.js]] و [[dist/index.js]].

---

## ٤. [[types]]: أنواع Node

~~~text tsconfig.json
"types": ["node"],
~~~

بيقول لـ TS يحمّل أنواع [[@types/node]] (لازم تكون متسطبة: [[npm i -D @types/node]]). من غيرها [[process]] و [[Buffer]] مش معروفين. جرّبنا [["types": []]]:

~~~text الناتج: npx tsc -p . --noEmit
src/index.ts(4,26): error TS2591: Cannot find name 'process'. Do you need to install type definitions for node? Try $__btnpm i --save-dev @types/node$__bt and then add 'node' to the types field in your tsconfig.
~~~

في TS 6 و 7 الافتراضي بقى ليستة فاضية، فلازم تكتب [["node"]] بنفسك.

---

## ٥. [[strict]] و [[verbatimModuleSyntax]] و [[skipLibCheck]]

~~~text tsconfig.json
"strict": true,
"verbatimModuleSyntax": true,
"skipLibCheck": true
~~~

- [[strict]]: الدرس اللي فات.
- [[verbatimModuleSyntax]]: الـ imports تطلع في الـ JS زي ما كتبتها بالظبط (verbatim = حرفيًا). فلو بتستورد نوع، لازم تقول إنه نوع عشان يتمسح:

~~~text src/index.ts
import { User } from "./db.js";
~~~

~~~text الناتج
src/index.ts(2,10): error TS1484: 'User' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
~~~

الحل [[import type { User } from "./db.js";]]: السطر ده بيتشال كله من الـ JS.

- [[skipLibCheck]]: متفحصش ملفات [[.d.ts]] بتاعة المكتبات (زي [[@types/node]]). أسرع، وكودك لسه بيتفحص عادي.

---

## ٦. [[include]]

~~~text tsconfig.json
"include": ["src"]
~~~

افحص كل الملفات جوه [[src]]. الـ tsconfig نفسه والـ [[dist]] برّه الفحص.

---

## ٧. التجربة: الامتداد في الـ import

ده [[src/index.ts]]:

~~~text src/index.ts
import { db } from "./db";
import type { User } from "./db.js";
const first: User | undefined = db.users[0];
console.log(first?.name, process.version);
~~~

السطر الأول من غير امتداد:

~~~text الناتج: npx tsc -p .
src/index.ts(1,20): error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './db.js'?
~~~

TS بيقلّد Node: في ESM، Node مبيدوّرش على امتدادات، فلازم تكتبه. جرّبنا [["./db.ts"]]:

~~~text الناتج
src/index.ts(1,20): error TS5097: An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.
~~~

ولما كتبنا [["./db.js"]] (الملف اللي **هيبقى** موجود بعد الـ build) عدّى، والناتج:

~~~text dist/index.js
import { db } from "./db.js";
const first = db.users[0];
console.log(first?.name, process.version);
~~~

~~~text الناتج: node dist/index.js
Sara v24.19.0
~~~

لاحظ: سطر [[import type]] اختفى، و [[: User | undefined]] اختفى، والـ import الباقي زي ما هو حرفيًا.

---

## ٨. الغلطة المشهورة: [[bundler]] في سيرفر Node

غيّرنا لـ [["module": "esnext", "moduleResolution": "bundler"]] ورجّعنا الـ import لـ [["./db"]] من غير امتداد:

~~~text الناتج: npx tsc -p .
exit=0
~~~

TS وافق، لأن [[bundler]] بيفترض إن Vite أو webpack هيكمّل الامتداد. بس مفيش bundler هنا:

~~~text الناتج: node dist/index.js
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...\dist\db' imported from ...\dist\index.js
  code: 'ERR_MODULE_NOT_FOUND',
~~~

الـ build نجح والتطبيق وقع. عشان كده [[nodenext]] لأي حاجة [[node]] بيشغّلها مباشرة.

---

## ٩. TS 6 و TS 7

نفس الأخطاء بنفس الأكواد في الاتنين. والفرق المهم في الإعدادات القديمة. جرّبنا [["module": "commonjs", "moduleResolution": "node"]]:

~~~text الناتج (TS 6.0.3)
tsconfig.json(4,47): error TS5107: Option 'moduleResolution=node10' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
~~~

~~~text الناتج (TS 7.0.2)
tsconfig.json(4,47): error TS5108: Option 'moduleResolution=node10' has been removed. Please remove it from your configuration.
~~~

TS 6 بيحذّرك وبيسمحلك تسكّته بـ [[ignoreDeprecations]]، و TS 7 شاله خالص. وكمان الـ exit code:

| الحالة | TS 6.0.3 | TS 7.0.2 |
|---|---|---|
| أخطاء مع [[--noEmit]] | 2 | 1 |
| أخطاء والملفات اتكتبت برضه | 2 | 2 |

---

## ملخص الإعدادات

| الإعداد | بيعمل إيه | سيرفر Node بـ tsc | Vite أو Next |
|---|---|---|---|
| [[target]] | نسخة الـ syntax الناتج | [[es2024]] | [[es2024]] أو أحدث |
| [[module]] | شكل الـ imports الناتج | [[nodenext]] | [[esnext]] |
| [[moduleResolution]] | إزاي يلاقي الملف | (بييجي من nodenext) | [[bundler]] |
| [[outDir]] | فين الناتج | [[dist]] | مش محتاج: [[noEmit]] |
| [[types]] | أنواع عامة | [[["node"]]] | حسب المشروع |

---

## الخلاصة

- [[module]] = شكل الناتج، و [[moduleResolution]] = إزاي TS يلاقي الملف. لازم يطابقوا اللي هيشغّل الكود فعلًا.
- مع [[nodenext]] و ESM: الـ import بـ [[.js]] حتى لو الملف [[.ts]].
- [[bundler]] لما فيه bundler بس، وإلا الـ build ينجح و Node يقع.
- [[moduleResolution: node]] اتشال في TS 7.`,
          lines: [
            "بداية الملف.",
            "إعدادات الـ compiler.",
            "اطلّع JS بنسخة 2024: Node 24 بيفهمها كلها.",
            R`Node الحديث: ESM أو CommonJS حسب [["type"]] في package.json، والـ resolution زي Node بالظبط.`,
            "الكود المصدر.",
            R`الـ JS الناتج، وده اللي [[node dist/index.js]] بيشغّله.`,
            "أنواع Node (process و Buffer). في TS 6 و 7 لازم تتكتب.",
            "الفحص الصارم.",
            R`[[import type]] للأنواع إجباري، والـ imports بتطلع زي ما كتبتها بالظبط.`,
            "متفحصش ملفات .d.ts بتاعة المكتبات.",
            "قفلة compilerOptions.",
            "الملفات اللي TS يفحصها.",
            "قفلة."
          ],
          sol: R`[[import { db } from "./db"]] بيطلّع: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './db.js'? (TS2835).

بعد ما تخليها [[./db.js]] الخطأ بيختفي، و [[tsc]] بيطلّع [[dist/main.js]] فيه [[./db.js]] زي ما هو، و [[node dist/main.js]] بيشتغل. TS مبيغيّرش الـ imports، فانت بتكتب اسم الملف اللي هيبقى موجود بعد الـ build، و TS بيعرف إن [[db.js]] أصله [[db.ts]]. الغلطة: تكتب [[./db.ts]]، فتاخد TS5097 (An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled)، والإعداد ده مش بيشتغل غير مع [[noEmit]] (يعني حاجة تانية هي اللي بتشغّل الكود).`
        },
        {
          cmd: "paths",
          title: "imports قصيرة زي @/lib/db بدل ../../../lib/db",
          desc: R`[[paths]] في tsconfig بيعمل aliases: [["@/*": ["./src/*"]]] بيخلي [[import { db } from "@/lib/db"]] يشاور على [[src/lib/db.ts]]. ومن غير [[baseUrl]] (اتشال في TS 7): المسارات نسبةً لمكان الـ tsconfig.

بس خلي بالك: [[paths]] بيعلّم TS يلاقي الملف وقت الفحص، ومبيغيّرش الـ import في الـ JS. اللي بيشغّل الكود (Next أو Vite أو tsx) لازم يفهم الـ alias هو كمان.`,
          example: R`// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../packages/shared/src/*"]
    }
  }
}`,
          try: R`في مشروع Next افتح [[tsconfig.json]] ولاقي الـ [["@/*"]]. وبعدين اعمل مشروع Node صغير فيه paths، اعمله build بـ [[tsc]] وشغّل [[node dist/index.js]]: هيقع بـ [[ERR_MODULE_NOT_FOUND]]، لأن الـ JS لسه فيه [[@/lib]] زي ما هو.`,
          flag: "script",
          deep: {
            why: R`في مشروع كبير، [[import { db } from "../../../lib/db"]] بيتكسر أول ما تنقل الملف فولدر، ومحدش بيعرف يعدّ النقط. الـ alias بيخلي كل import ثابت بغض النظر مكان الملف فين.`,
            how: R`[[paths]] بيأثر على حاجة واحدة: TS وهو بيفحص ويلاقي الملفات. الـ JS الناتج فيه [[@/lib/db]] زي ما هو بالظبط، و TS مبيعيدش كتابة الـ imports أبدًا.

عشان كده لازم اللي بيشغّل أو بيبني يفهم نفس الـ alias: Next بيقرا [[paths]] من tsconfig لوحده، و tsx كمان. و Vite محتاج [[resolve.alias]] في vite.config أو plugin يقرا tsconfig. و Vitest و Jest محتاجين إعداد برضه.

وسيرفر Node بتعمله build بـ [[tsc]] وتشغّله بـ [[node dist/index.js]]: [[paths]] مش هتشتغل. يا تستخدم imports نسبية، يا bundler للسيرفر (esbuild أو tsup)، يا خانة [[imports]] في package.json (subpath imports بتبدأ بـ [[#]]) اللي Node نفسه بيفهمها.

زمان [[paths]] كان محتاج [[baseUrl]]. دلوقتي لأ، و TS 7 شال [[baseUrl]] خالص: لو شايفه في مشروع قديم، شيله وخلي مسارات paths تبدأ بـ [[./]].

وفي monorepo حقيقي كانت [[paths]] بتشاور على [[packages/shared/src/index.ts]] مباشرة، فالتطبيق بيستورد الكود المشترك من غير build، والـ bundler هو اللي بيترجمه.`,
            when: "أي مشروع فيه أكتر من مستويين فولدرات. Next بيعمله لوحده. وفي monorepo لو مش بتستخدم workspaces (تفاصيل workspaces في تاب «Node و npm»).",
            mistakes: R`تضيف [[paths]] في tsconfig وتفتكر خلاص، و Vite أو Node يقولك مش لاقي الـ module. و [["@/*": ["src/*"]]] من غير [[./]] ومن غير baseUrl: TS بيرفضها (non-relative paths are not allowed). و alias بيتصادم مع اسم باكدج npm حقيقية.`
          },
          teach: R`## الفكرة في سطرين

[[paths]] بيعلّم TS إن اسم قصير زي [[@/lib/db]] معناه ملف معيّن جوه المشروع. بس ده كلام بين TS وبينك وقت الفحص: الـ JS اللي بيطلع فيه نفس الاسم، واللي بيشغّل الكود لازم يفهمه هو كمان.

اتجرّب على ويندوز 11 بـ Node 24 و TypeScript 6.0.3 و 7.0.2، في مشروع صغير: [[src/lib/db.ts]] فيه [[export const db = "connected";]]، و [[src/index.ts]] بيستورده بالـ alias.

---

## ١. الإعداد سطر سطر

~~~text tsconfig.json
"paths": {
  "@/*": ["./src/*"],
  "@shared/*": ["../packages/shared/src/*"]
}
~~~

- [[paths]]: جوه [[compilerOptions]]. كل مفتاح نمط import، وقيمته ليستة أماكن يدوّر فيها.
- [["@/*"]]: أي import بيبدأ بـ [[@/]]. الـ [[*]] حتة متغيرة: في [[@/lib/db]] الـ [[*]] = [[lib/db]].
- [["./src/*"]]: نفس الحتة تتحط هنا، فـ [[@/lib/db]] تبقى [[./src/lib/db]]. و [[./]] معناها «جنب ملف الـ tsconfig».
- القيمة ليستة لأن ممكن تدّيله أكتر من مكان، ويجرّبهم بالترتيب.
- [["@shared/*"]]: نفس الفكرة لفولدر برّه المشروع ([[../]] = طلّع فولدر لفوق)، زي باكدج مشتركة في monorepo.

---

## ٢. لازم [[./]] في الأول

شلنا الـ [[./]] وكتبنا [["src/*"]]:

~~~text الناتج (TS 6.0.3)
tsconfig.json(9,15): error TS5090: Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?
~~~

~~~text الناتج (TS 7.0.2)
tsconfig.json(9,15): error TS5090: Non-relative paths are not allowed. Did you forget a leading './'?
~~~

نفس الكود، بس TS 7 شال ذكر [[baseUrl]] من الرسالة لأن [[baseUrl]] نفسه اتشال.

---

## ٣. TS لاقى الملف

~~~text src/index.ts
import { db } from "@/lib/db.js";
console.log(db);
~~~

([[.js]] في الآخر عشان المشروع [[module: nodenext]]، الدرس اللي فات.) [[npx tsc -p .]] عدّى من غير ولا خطأ في الاتنين. بس بص على الناتج:

~~~text out/index.js
import { db } from "@/lib/db.js";
console.log(db);
~~~

الـ import **زي ما هو**. TS مبيعيدش كتابة الـ imports أبدًا.

---

## ٤. Node مبيفهمش الـ alias

~~~text الناتج: node out/index.js
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@/lib' imported from ...\out\index.js
  code: 'ERR_MODULE_NOT_FOUND'
~~~

Node شاف اسم مش بيبدأ بـ [[./]] ولا [[/]]، فافتكره اسم باكدج في [[node_modules]] ودوّر على باكدج اسمها [[@/lib]].

أما [[tsx]] بيقرا [[paths]] من الـ tsconfig لوحده:

~~~text الناتج: npx tsx src/index.ts
connected
~~~

| اللي بيشغّل | بيفهم [[paths]]؟ |
|---|---|
| [[tsc]] (الفحص) | آه |
| [[node]] على الـ JS الناتج | لأ |
| [[tsx]] | آه، بيقرا الـ tsconfig |
| Next.js | آه، لوحده |
| Vite و Vitest | محتاجين [[resolve.alias]] أو plugin |

---

## ٥. الحل اللي Node بيفهمه: subpath imports

ده الـ solCode. بدل [[paths]]، خانة [[imports]] في [[package.json]]، ودي حاجة Node نفسه بيقراها:

~~~text package.json
{
  "type": "module",
  "imports": { "#lib/*": "./dist/lib/*" }
}
~~~

- [["#lib/*"]]: الـ aliases هنا لازم تبدأ بـ [[#]]، عشان متتلخبطش مع أسماء الباكدجات.
- [["./dist/lib/*"]]: بتشاور على الـ JS **الناتج**، لأن ده اللي Node هيشغّله.

~~~text src/index.ts
import { db } from "#lib/db.js";
console.log(db);
~~~

TS ذكي هنا: بيقرا نفس الخانة، وبيعرف إن [[dist]] أصلها [[src]] (من [[rootDir]] و [[outDir]]). شغّلنا [[tsc --traceResolution]] عشان نشوف هو بيدوّر إزاي:

~~~text الناتج (جزء منه)
Using 'imports' subpath '#lib/*' with target './dist/lib/db.js'.
======== Module name '#lib/db.js' was successfully resolved to '.../src/lib/db.ts'. ========
~~~

وبعد الـ build:

~~~text الناتج: node dist/index.js
connected
~~~

نفس الناتج في TS 6 و 7.

---

## الخلاصة

- [[paths]] للفحص بس، والـ JS بيطلع بنفس الـ alias.
- المسارات تبدأ بـ [[./]] ومن غير [[baseUrl]] (اتشال في TS 7).
- Next و tsx بيفهموها لوحدهم، و Vite محتاج إعداد، و [[node]] على الناتج لأ.
- لسيرفر Node من غير bundler: subpath imports بـ [[#]] في package.json.`,
          lines: [
            "بداية الـ tsconfig.",
            "الإعدادات.",
            "الـ aliases.",
            R`[[@/]] وبعدها أي مسار يروح لـ [[src/]]. نفس اللي [[create-next-app]] بيعمله.`,
            "في monorepo: باكدج مشتركة من فولدر تاني.",
            "قفلة paths.",
            "قفلة compilerOptions.",
            "قفلة."
          ],
          sol: R`في Next هتلاقي [["paths": { "@/*": ["./src/*"] }]] (أو [["./*"]] لو مفيش src). وفي مشروع Node، [[tsc]] بيعدّي من غير أخطاء، و [[dist/index.js]] فيه [[import { db } from "@/lib/db.js"]] زي ما هو، و [[node dist/index.js]] بيقع بـ: [[Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@/lib' imported from .../dist/index.js]]. Node فاكر [[@/lib]] اسم package.

الحل اللي Node بيفهمه لوحده: subpath imports في package.json زي الكود تحت، و import بـ [[#lib/db.js]]. TS بيفهمها كمان ويوصل لـ [[src]] من غير paths. ([[#/]] لوحدها بدون اسم مش مقبولة في Node 22، فابدأ باسم زي [[#lib]].)`,
          solCode: R`// package.json
{
  "type": "module",
  "imports": { "#lib/*": "./dist/lib/*" }
}
// src/index.ts
import { db } from "#lib/db.js";
console.log(db);`
        }
      ]
    }
]);

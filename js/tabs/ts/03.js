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
    },
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
    },
    {
      t: "الأنواع في React و Express و Prisma",
      l: 3,
      n: "props و events و state، و req.body اللي نوعه any، وأنواع القاعدة الجاهزة، ورد API من غير كذب",
      items: [
        {
          cmd: "props و ComponentProps",
          title: "تكتب أنواع props لكومبوننت React، وتلف عنصر HTML بكل خصايصه",
          desc: R`props الكومبوننت object عادي، فنوعها [[type Props = { ... }]] وبتعمله destructuring في الباراميتر. و [[children]] نوعها [[ReactNode]]: أي حاجة تتعرض (نص، أو JSX، أو null، أو ليستة).

ولو بتعمل كومبوننت بيلف عنصر HTML (زرار أو input)، [[ComponentProps<"button">]] بيدّيك كل خصايص الزرار الأصلية ([[onClick]] و [[disabled]] و [[type]] و aria)، وتضيف عليها بتاعتك.`,
          example: R`import type { ComponentProps, ReactNode } from "react";
type CardProps = { title: string; footer?: ReactNode; children: ReactNode };
export function Card({ title, footer, children }: CardProps) {
  return <section><h2>{title}</h2>{children}{footer}</section>;
}
type ButtonProps = ComponentProps<"button"> & { variant?: "primary" | "ghost" };
export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  return <button className={$__btbtn btn-$__{variant} $__{className}$__bt} {...rest} />;
}
export function Page() {
  return <Card title="الطلبات"><Button onClick={() => alert("تم")} disabled>احفظ</Button></Card>;
}`,
          try: R`امسح [[title]] من [[<Card>]] واقرا الخطأ. وبعدين جرّب [[<Button onClik={...}>]] بغلطة إملائية، و [[<Button variant="danger">]].`,
          flag: "script",
          deep: {
            why: "من غير أنواع للـ props، كل استخدام للكومبوننت محتاج تفتح الملف تشوف بياخد إيه. ومع الأنواع، المحرر بيكمّلك الـ props، و TS بيمسك prop ناقص أو متكتب غلط في كل الأماكن مرة واحدة لما تغيّر الكومبوننت.",
            how: R`الكومبوننت في React 19 دالة عادية بتاخد object واحد، فالنوع بيتكتب على الباراميتر: [[function Card(props: CardProps)]] أو بالـ destructuring. و [[React.FC]] كان منتشر زمان، بس مش محتاجه، والدالة العادية أوضح.

[[ReactNode]] أوسع نوع للمحتوى: string و number و JSX و null و undefined و boolean و arrays منهم. و [[ReactElement]] أضيق: JSX بس. للـ children غالبًا ReactNode.

[[ComponentProps<"button">]] بيطلّع نوع props العنصر من تعريفات React ([[@types/react]]). ومع React 19، [[ref]] بقى prop عادي، فالنوع ده فيه [[ref]] كمان، وتقدر تمرّره من غير [[forwardRef]]. ولكومبوننت تاني: [[ComponentProps<typeof Card>]] بيطلّع props بتاعته.

و [[&]] بتدمج النوعين. ولو عايز تغيّر نوع prop موجود (مثلًا [[type]])، استخدم [[Omit<ComponentProps<"button">, "type">]] الأول، لأن [[&]] مع تعارض بيطلّع never.`,
            when: "كل كومبوننت. و [[ComponentProps]] لأي كومبوننت بيلف عنصر HTML (Button و Input و Link) أو بيمد كومبوننت تاني. والتفاصيل في تاب «React».",
            mistakes: R`[[children: JSX.Element]] فالنص العادي أو null يترفض. و [[props: any]]. وتعرّف [[onClick]] و [[disabled]] و [[type]] بإيدك بدل ComponentProps، فتنسى [[aria-label]] وتلاقي نفسك بتضيف prop كل أسبوع. وتوزّع [[...rest]] قبل props بتاعتك فتتعمل override.`
          },
          lines: [
            R`[[import type]]: أنواع بس، وبتتمسح من الـ JS.`,
            "props الكارت: عنوان، و footer اختياري، و children.",
            "destructuring في الباراميتر مع النوع.",
            R`[[ReactNode]] يتعرض في أي مكان في JSX.`,
            "قفلة.",
            R`كل خصايص [[<button>]] الأصلية، وفوقها [[variant]].`,
            R`خد اللي يخصك، والباقي في [[rest]].`,
            "ووزّع الباقي على الزرار الحقيقي: onClick و disabled و type وغيرهم شغالين من غير ما تعرّفهم.",
            "قفلة.",
            "استخدام.",
            R`[[title]] إجباري، والزرار بياخد [[onClick]] و [[disabled]] زي [[<button>]] العادي.`,
            "قفلة."
          ],
          sol: R`من غير [[title]]: Property 'title' is missing in type '{ children: Element; }' but required in type 'CardProps' (TS2741).

و [[onClik]]: Property 'onClik' does not exist on type 'IntrinsicAttributes & ... ButtonHTMLAttributes<HTMLButtonElement> & ...'. Did you mean 'onClick'?، يعني [[ComponentProps<"button">]] جايب كل خصايص الزرار الحقيقية ومسك الغلطة. و [[variant="danger"]]: Type '"danger"' is not assignable to type '"ghost" | "primary" | undefined'.`
        },
        {
          cmd: "useState و events",
          title: "أنواع الـ state وأحداث الفورم والـ input في React",
          desc: R`[[useState(0)]] بيستنتج number لوحده. محتاج تكتب النوع بس لما القيمة الأولية مش بتوصف كل الاحتمالات: [[useState<User | null>(null)]] و [[useState<string[]>([])]].

والـ events ليها أنواع من React: [[React.ChangeEvent<HTMLInputElement>]] للـ input، و [[React.SubmitEvent<HTMLFormElement>]] للفورم، و [[React.MouseEvent<HTMLButtonElement>]] للزرار. ولو الـ handler مكتوب inline في JSX، النوع بيتستنتج لوحده.`,
          example: R`import { useState } from "react";
type User = { id: string; name: string };
type Status = "idle" | "saving" | "error";
export function ProfileForm() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    setUser({ id: "1", name });
  };
  return <form onSubmit={onSubmit}><input value={name} onChange={onChange} />{user?.name} {status}</form>;
}`,
          try: R`شيل [[<User | null>]] من السطر الخامس وشوف [[setUser({...})]] بيطلّع إيه (النوع بقى null بس). وبعدين اكتب الـ onChange inline في JSX من غير نوع ولاحظ إن [[e]] اتعرف لوحده.`,
          flag: "script",
          deep: {
            why: "أغلب أخطاء React اليومية: state بيبدأ null وحد يقرا [[user.name]] قبل ما يتحمّل، أو [[e.target.value]] في event مش معروف نوعه، أو status متكتب غلط. الأنواع هنا بتمسك الـ bugs دي قبل ما تفتح المتصفح.",
            how: R`[[useState<T>]] generic: من غير ما تحدد، T بيتستنتج من القيمة الأولية. [[useState(null)]] لوحدها T بقى [[null]] وبس، فمش هتقدر تحط User بعدين، وعشان كده [[<User | null>]]. و [[useState([])]] بيطلّع [[never[]]]، فلازم [[<Item[]>]]. و [[useState("idle")]] بيطلّع string، فأي كلمة تعدّي.

وللحالات المترابطة (loading و data و error)، discriminated union في state واحدة أنضف من ٣ states منفصلين: [[useState<FetchState>({ status: "idle" })]]، و react.dev نفسه بيقترح الشكل ده.

الـ events في React synthetic: [[currentTarget]] نوعه T بالظبط (العنصر اللي عليه الـ handler). و [[target]] في أغلب الـ events نوعه [[EventTarget]] بس، لأن الـ event ممكن يكون جاي من عنصر جوه. و [[ChangeEvent]] استثناء في @types/react: [[target]] فيه متعرّف [[EventTarget & T]] زي currentTarget بالظبط. عشان كده [[e.currentTarget.value]] هي العادة الأأمن في كل الـ events.

وفي @types/react 19.2.10 وأحدث، [[FormEvent]] بقى deprecated (الاسم كان مضلل)، والبديل [[SubmitEvent]] للـ submit، و [[ChangeEvent]] أو [[InputEvent]] للتغيير. الكود القديم لسه شغال، بس المحرر هيشطب عليه. ولو نسختك أقدم من 19.2.10، [[SubmitEvent]] مش هتلاقيه، فحدّث @types/react.

وأسهل طريقة تعرف نوع أي event: اكتب الـ handler inline ([[onChange={(e) => ...}]]) وحط الماوس على [[e]].`,
            when: "[[useState<T>]] لما القيمة الأولية null أو [] أو union. وأنواع الـ events لما الـ handler دالة منفصلة. والتفاصيل الكاملة للـ hooks في تاب «React».",
            mistakes: R`[[useState<any[]>([])]]: في مشروع حقيقي كانت متكررة، وبتقفل الفحص على الليستة كلها. و [[useState<number>(0)]]: زيادة. و [[(e: any) => ...]] للـ events. و [[e.target.value]] على select أو checkbox وتستغرب النوع.`
          },
          lines: [
            "الـ hook.",
            "نوع المستخدم.",
            "حالات محددة.",
            "الكومبوننت.",
            "بيبدأ null، فلازم تقول إنه ممكن يبقى User بعدين.",
            R`[[""]] كفاية: TS استنتج string.`,
            "من غير النوع، TS هيستنتج string وأي كلمة هتعدّي.",
            R`نوع الـ event للـ input: [[currentTarget.value]] نوعها string.`,
            R`submit الفورم. في @types/react 19.2.10+ اسمه [[SubmitEvent]]، و [[FormEvent]] القديم deprecated.`,
            "امنع الـ reload.",
            "لازم قيمة من Status.",
            "لازم شكل User كامل.",
            "قفلة الـ handler.",
            R`[[user?.name]] لأن user ممكن يبقى null.`,
            "قفلة."
          ],
          sol: R`من غير [[<User | null>]]، [[useState(null)]] نوعه [[null]] بس. فـ [[setUser({ id: "1", name })]] بتطلّع Object literal may only specify known properties, and 'id' does not exist in type '(prevState: null) => null'، و [[user?.name]] في الـ JSX بتطلّع Property 'name' does not exist on type 'never'.

ولما تكتب [[onChange={(e) => setName(e.currentTarget.value)}]] جوه الـ JSX، حط الماوس على [[e]] هتلاقيه [[ChangeEvent<HTMLInputElement, HTMLInputElement>]] لوحده. الـ handler المكتوب inline بياخد نوعه من الـ prop، والمفصول في متغير لازم تكتبله النوع.`
        },
        {
          cmd: "Express + Zod",
          title: "req.body نوعه any: تتحقق منه وتاخد نوع حقيقي",
          desc: R`في Express، [[req.body]] نوعه [[any]] وقيمته أي حاجة العميل بعتها. الحل: middleware بياخد schema من Zod، يعمل [[safeParse]] على الـ body، ولو فشل يرجّع 400، ولو نجح يحط الداتا المفحوصة مكان الـ body.

والـ handler نفسه بتكتب نوع الـ body فيه بـ [[Request<Params, ResBody, ReqBody>]]. وتفاصيل Express نفسه في تاب «Backend بـ Node».`,
          example: R`import express, { type Request, type Response, type NextFunction } from "express";
import * as z from "zod";
const CreateOrder = z.object({ productId: z.string().min(1), qty: z.number().int().min(1).max(10) });
type CreateOrder = z.infer<typeof CreateOrder>;
const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const r = schema.safeParse(req.body);
  if (!r.success) return res.status(400).json({ errors: z.flattenError(r.error).fieldErrors });
  req.body = r.data;
  next();
};
const app = express();
app.use(express.json());
app.post("/orders", validate(CreateOrder), (req: Request<{}, {}, CreateOrder>, res: Response) => {
  res.status(201).json({ productId: req.body.productId, qty: req.body.qty });
});`,
          try: R`ابعت [[curl -X POST localhost:3000/orders -H "Content-Type: application/json" -d '{"productId":"p1","qty":50}']] وشوف الـ 400. وبعدين شيل [[validate(CreateOrder)]] من الـ route ولاحظ إن TS مش هيعترض، وده بالظبط ليه النوع لوحده مش حماية.`,
          flag: "script",
          deep: {
            why: R`[[req.body]] أخطر مكان في أي API: أي حد يقدر يبعت أي حاجة. وفي مشروع حقيقي كان فيه [[const { month, year } = req.body as { month: number; year: number }]]: النوع بيقول number، والعميل بعت [["5"]] أو ماباعتش حاجة، والكود كمّل وحسب غلط أو كتب في القاعدة قيمة بايظة. و [[(req.body as any)[field]]] في مكان تاني أسوأ.`,
            how: R`[[@types/express]] بيعرّف [[Request<P, ResBody, ReqBody, ReqQuery>]]، و [[ReqBody]] افتراضيًا [[any]]. وتقدر تكتب [[Request<{}, {}, CreateOrder>]] عشان تاخد autocomplete جوه الـ handler، بس ده annotation مش فحص: TS مش هيعرف إن فيه middleware فحصت قبله. عشان كده ترتيب الـ route مهم، والـ validate لازم يبقى قبل الـ handler.

بديل أبسط ومن غير ثقة في الترتيب: جوه الـ handler نفسه [[const data = CreateOrder.parse(req.body)]]، ومعاه error middleware بيحوّل ZodError لـ 400. وفي Express 5، أي خطأ بيترمي جوه handler async بيروح للـ error middleware لوحده.

والـ query و params strings دايمًا ([[?page=2]] بتيجي [["2"]])، فاستخدم [[z.coerce.number()]] ليهم. و [[req.query]] في Express 5 getter، فمتقدرش تعمل [[req.query = ...]]: خزّن الناتج في متغير أو في [[res.locals]].

والأنواع المشتركة بين الـ front والـ back (زي [[CreateOrder]]) مكانها باكدج shared في monorepo، فالـ form في React والـ route في Express بيستخدموا نفس الـ schema.`,
            when: "كل route فيه body أو query أو params من المستخدم، من غير استثناء. وكمان webhooks جاية من خدمات خارجية.",
            mistakes: R`[[req.body as Type]]: فحص بالكلام. وتنسى [[express.json()]] فالـ body يبقى undefined وتفتكر الـ validation هي اللي غلط. وترجع [[r.error]] كله للعميل. و [[z.number()]] على query param فيفشل دايمًا لأنه string.`
          },
          lines: [
            R`Express وأنواعه. و [[type]] جوه الـ import للأنواع بس.`,
            "Zod.",
            "schema للطلب: منتج وكمية من ١ لـ ١٠.",
            "النوع من الـ schema بنفس الاسم (مسموح: واحد قيمة وواحد نوع).",
            "middleware عام: بياخد أي schema ويرجّع handler.",
            "فحص الـ body من غير throw.",
            "فشل: 400 بأخطاء كل حقل، ومتكمّلش.",
            "نجاح: حط الداتا المفحوصة (من غير مفاتيح زيادة) مكان الـ body.",
            "كمّل للـ handler.",
            "قفلة.",
            "التطبيق.",
            R`من غيرها [[req.body]] بيبقى undefined في Express 5.`,
            R`الـ route: الـ validation الأول، وبعدين handler نوع الـ body فيه [[CreateOrder]] (التالت في [[Request<Params, ResBody, ReqBody>]]).`,
            R`[[req.body.qty]] نوعها number ومفحوصة فعلًا.`,
            "قفلة."
          ],
          sol: R`الـ curl بيرجّع [[400]] والـ body: [[{"errors":{"qty":["Too big: expected number to be <=10"]}}]]. ومع [["qty":2]] بيرجّع [[201]] و [[{"productId":"p1","qty":2}]].

بعد ما تشيل [[validate(CreateOrder)]]، [[npx tsc --noEmit]] مش بيطلّع ولا خطأ، والـ handler لسه شايف [[req.body.qty]] على إنه number. بس الـ request نفسه بيرجع [[201]] وفيه [["qty":50]]، وحتى [[{"qty":"lots"}]] من غير productId بيعدّي. [[Request<{}, {}, CreateOrder>]] وعد بس، والـ schema هي اللي بتفحص فعلًا.`
        },
        {
          cmd: "declare global",
          title: "تضيف req.user على نوع Request بتاع Express في كل المشروع",
          desc: R`middleware الـ auth بيحط [[req.user]]، بس TS ميعرفش إن [[Request]] فيه user. بدل ما تعمل [[interface AuthRequest extends Request]] وتستخدمه في كل handler، تقدر تضيف الخاصية على نوع Express نفسه مرة واحدة: ده اسمه module augmentation.

وده شغال بسبب declaration merging في الـ interfaces (درس type و interface في المستوى ١).`,
          example: R`// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: "admin" | "user" };
    }
  }
}
export {};
// أي handler في المشروع:
app.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "سجّل دخول" });
  res.json({ id: req.user.id, role: req.user.role });
});`,
          try: R`امسح سطر [[export {}]] وشغّل [[npx tsc --noEmit]] واقرا الخطأ. وبعدين اتأكد إن الملف جوه [[include]] في tsconfig، لأن لو برّه TS مش هيشوف الإضافة.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه [[interface AuthRequest extends Request { user?: AuthenticatedUser }]] وكل handler مكتوب [[(req: AuthRequest, res: Response)]]. ده شغال، بس كل route لازم يفتكر يستخدم AuthRequest، ولما تمرر الـ handler لـ [[router.get]] ساعات الأنواع مبتركبش. الإضافة على النوع الأصلي بتحل ده مرة واحدة.`,
            how: R`module augmentation: بتفتح نوع معرّف في مكتبة وتضيف عليه. بيشتغل مع [[interface]] بس (مش [[type]])، لأن الـ interfaces اللي بنفس الاسم في نفس الـ scope بتتدمج.

و [[@types/express]] معرّف [[namespace Express { interface Request {} }]] في الـ global scope مخصوص عشان تعمل كده، والـ Request اللي بتستخدمه بيورث منه. فـ [[declare global { namespace Express { ... } }]] بيضيف على الأصل.

وللمكتبات اللي أنواعها جوه module مش global، بتستخدم [[declare module "lib-name" { interface X { ... } }]] في ملف فيه import أو export. وزيها إضافة خاصية على [[Window]]: [[declare global { interface Window { dataLayer?: unknown[] } }]].

الملف لازم يبقى module (فيه [[export {}]] أو أي import)، ولازم يبقى جوه [[include]]. و tsx مبيفحصش أنواع أصلًا، فالإضافة دي بتبان في المحرر و [[tsc --noEmit]] بس.

وخلي بالك: ده بيقول إن [[user]] موجود في كل request في المشروع كله، حتى اللي مفيهوش auth middleware. عشان كده خليه اختياري ([[?]]) وافحصه.`,
            when: "[[req.user]] و [[req.requestId]] في Express، وخصايص على [[window]] من scripts خارجية (analytics)، وإضافة session أو user على أنواع مكتبات auth.",
            mistakes: R`[[user: AuthUser]] من غير [[?]]، فـ TS يفتكره موجود في routes مفيهاش auth. وتنسى [[export {}]]. والملف برّه [[include]] فمفيش أثر. و [[(req as any).user]] في كل حتة بدل الإضافة دي.`
          },
          lines: [
            "ادخل على الـ scope العام (global).",
            R`[[@types/express]] بيعرّف namespace اسمه Express مخصوص عشان تضيف عليه.`,
            "نفس اسم الـ interface: TS هيدمجه مع الأصلي.",
            R`[[user]] اختياري، لأن مش كل route عليه auth.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`سطر مهم: بيخلي الملف module، و [[declare global]] مبتشتغلش غير جوه module.`,
            "handler عادي، من غير أي نوع مخصوص.",
            R`TS عارف إن [[req.user]] ممكن يبقى undefined، فبيجبرك تفحص.`,
            R`بعد الفحص، [[user]] موجود بنوعه.`,
            "قفلة."
          ],
          sol: R`من غير [[export {}]] الملف بيبقى script مش module. لو [[skipLibCheck]] مقفول هتشوف على الملف نفسه: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations (TS2669). ومع [[skipLibCheck: true]] (الأشهر) الخطأ ده مش بيظهر، واللي بيظهر بس: Property 'user' does not exist on type 'Request<...>' (TS2339) على كل [[req.user]]، وده بيلخبط لأن السبب مش باين.

ونفس خطأ TS2339 بيظهر لو الملف برّه [[include]]. بعد ما ترجّع [[export {}]] والملف جوه include، [[npx tsc --noEmit]] مش بيطلّع حاجة.`
        },
        {
          cmd: "Prisma types",
          title: "أنواع جداولك جاهزة بعد generate، ونوع لكل query",
          desc: R`[[prisma generate]] بيطلّع client فيه نوع لكل model ([[User]] و [[Order]]) ولكل input ([[Prisma.UserCreateInput]] و [[Prisma.UserWhereInput]]). ونتيجة كل query نوعها محسوب من الـ [[select]] و [[include]] اللي كتبتهم: لو اخترت [[id]] و [[name]] بس، النتيجة مفيهاش [[email]].

ولو محتاج النوع ده برّه الـ query (لـ props أو دالة)، [[Prisma.UserGetPayload<...>]] مع [[satisfies]].`,
          example: R`import type { Prisma, User } from "@/generated/prisma/client";
import { db } from "@/lib/db";
const userCard = {
  select: { id: true, name: true, _count: { select: { orders: true } } },
} satisfies Prisma.UserDefaultArgs;
type UserCard = Prisma.UserGetPayload<typeof userCard>;
export async function listUsers(role?: User["role"]): Promise<UserCard[]> {
  const where: Prisma.UserWhereInput = role ? { role } : {};
  return db.user.findMany({ where, ...userCard });
}
export function greet(u: UserCard) {
  return $__bt$__{u.name} عنده $__{u._count.orders} طلب$__bt;
}`,
          try: R`ضيف [[email: true]] للـ select واستخدم [[u.email]] في [[greet]] من غير ما تلمس أي نوع. وبعدين غيّر اسم عمود في [[schema.prisma]]، وشغّل [[npx prisma generate]] ثم [[npx tsc --noEmit]]: كل مكان بيستخدم الاسم القديم هيطلع.`,
          flag: "script",
          deep: {
            why: "القاعدة هي مصدر الحقيقة لشكل الداتا. لو كتبت أنواع الجداول بإيدك، أول migration هتخليها كدب. Prisma بيولّد الأنواع من الـ schema نفسها، فتغيير عمود بيوصل لكل الكود وقت الـ typecheck.",
            how: R`[[prisma generate]] بيقرا [[schema.prisma]] ويكتب كود TS: الـ client ونوع لكل model و enum و input. وفي Prisma 7 مع generator [[prisma-client]]، الكود بيتكتب في الفولدر اللي في [[output]] (زي [[src/generated/prisma]]) وبتستورد منه مباشرة، مش من [[@prisma/client]] زي زمان. والـ enums بتطلع object بـ [[as const]] ونوع بنفس الاسم.

كل method ([[findMany]] و [[findUnique]] و [[create]]) generic على الـ args: نوع الناتج بيتحسب من [[select]] و [[include]]. و [[findUnique]] بيرجع [[T | null]]، و [[findMany]] بيرجع [[T[]]].

و [[Prisma.UserGetPayload<Args>]] بيحسب نفس النوع ده برّه الـ query. و [[satisfies Prisma.UserDefaultArgs]] بيفحص الـ args من غير ما يوسّع نوعها. لو استخدمت annotation ([[const userCard: Prisma.UserDefaultArgs]]) بدل satisfies، النوع هيبقى عام والـ payload هيطلع غلط.

والـ inputs ([[Prisma.UserCreateInput]] و [[Prisma.UserWhereInput]]) مفيدين في دوال بتبني queries. بس مش بديل عن Zod: دي أنواع وقت الكتابة، والداتا من العميل لسه محتاجة فحص قبل ما توصل هنا.

وتفاصيل prisma generate و migrate في تاب «SQL و Prisma» و «Node و npm».`,
            when: "أي مشروع Prisma: props الكومبوننتات اللي بتعرض نتيجة query، و service functions، والـ DTOs. وشغّل [[prisma generate]] بعد أي تعديل في الـ schema، وفي CI قبل [[tsc]].",
            mistakes: R`تكتب [[type User = {...}]] بإيدك جنب Prisma. وتستخدم [[User]] (الموديل الكامل) كنوع لنتيجة query فيها select، فتفتكر [[email]] موجودة وهي مش موجودة. وفي مشروع حقيقي كان فيه [[role as Prisma.UserWhereInput["role"]]] على string جاية من الـ URL: ده بيعدّي أي string للقاعدة، والصح type guard أو [[z.enum]]. وتنسى [[prisma generate]] في CI أو Docker فالأنواع تبقى قديمة.`
          },
          lines: [
            R`أنواع Prisma 7 من الـ client اللي اتولّد (المسار حسب [[output]] في schema.prisma).`,
            "الـ client نفسه (instance واحد في المشروع).",
            "شكل الـ query كـ object لوحده...",
            "...id و name وعدد الطلبات بس...",
            R`...و [[satisfies]] بيتأكد إنه args صح للـ User من غير ما يضيّع النوع الدقيق.`,
            R`نوع النتيجة محسوب من الـ select: [[{ id; name; _count: { orders } }]].`,
            R`[[User["role"]]]: نوع الـ enum من الموديل.`,
            R`[[WhereInput]] نوع الفلتر: أي عمود غلط أو قيمة غلط يطلع خطأ.`,
            R`نفس الـ select، فالنتيجة مطابقة لـ [[UserCard]].`,
            "قفلة.",
            "دالة (أو props لكومبوننت) بتاخد النوع ده.",
            R`TS عارف إن فيه name و _count بس. لو كتبت [[u.email]] هيطلع خطأ، لأنها مش في الـ select.`,
            "قفلة."
          ],
          sol: R`بعد [[email: true]] في الـ select، [[u.email]] في [[greet]] بيشتغل ونوعه string من غير ما تلمس [[UserCard]]، لأن [[UserGetPayload]] بيتحسب من الـ select. ولو كتبت [[u.role]] من غير ما تختاره هتاخد Property 'role' does not exist on type '{ id: number; name: string; email: string; _count: { orders: number; }; }'.

ولو غيّرت [[name]] لـ [[fullName]] وعملت generate و tsc: أول خطأ بيطلع في الـ select نفسه: Object literal may only specify known properties, and 'name' does not exist in type 'UserSelect<DefaultArgs>'. ولما تصلّحه لـ [[fullName: true]]، الخطأ بيتنقل لـ [[u.name]] في [[greet]]. يعني TS بيوديك من مكان للتاني لحد ما كل حاجة تتصلح. ولو مطلعش حاجة، غالبًا نسيت [[prisma generate]] والأنواع لسه القديمة.`
        },
        {
          cmd: "typed fetch",
          title: "رد API خارجي: تديله نوع من غير ما تكذب على TS",
          desc: R`[[await res.json()]] نوعها [[any]]، و [[as User]] بعدها مجرد أمنية. الطريقة الآمنة: اعتبر الرد [[unknown]]، وافحصه بـ schema، والنوع يطلع من الفحص. كده لو الـ API غيّر شكله، الخطأ يطلع واضح عند الحدود، مش [[undefined]] في نص الـ UI.

واعمل helper واحد بياخد الـ schema ويرجّع داتا مفحوصة، وافحص [[res.ok]] قبل ما تقرا الـ body.`,
          example: R`import * as z from "zod";
async function getJson<S extends z.ZodType>(url: string, schema: S): Promise<z.infer<S>> {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error($__bt$__{url} رجّع $__{res.status}$__bt);
  const body: unknown = await res.json();
  return schema.parse(body);
}
const Repo = z.object({ full_name: z.string(), stargazers_count: z.number() });
const repo = await getJson("https://api.github.com/repos/microsoft/typescript", Repo);
console.log(repo.full_name, repo.stargazers_count);`,
          try: R`غيّر [[stargazers_count: z.number()]] لـ [[z.string()]] وشغّل: هتشوف ZodError بيقولك الحقل والنوع المتوقع. ده بالظبط اللي كان هيحصل لو الـ API غيّر شكله، بس برسالة واضحة.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه helper بالشكل ده: [[fetchTeam<T = any>(path): Promise<T | null>]] بيرجّع [[(await r.json()) as T]]. شكله typed، بس T بيختارها اللي بينادي، ومفيش أي فحص. لو السيرفر التاني رجّع شكل مختلف، TS هيفضل مقتنع إن كل حاجة تمام، والخطأ يطلع في الـ UI كـ undefined.`,
            how: R`TS مبيعرفش حاجة عن الشبكة: [[Response.json()]] متعرّفة إنها [[Promise<any>]] في أنواع المتصفح (lib dom، ودي بتتحمل افتراضي لو مكتبتش [[lib]]، حتى في مشروع Node)، وفي أنواع Node لوحدها (من غير dom) بترجع [[Promise<unknown>]]. وفي الحالتين أي نوع تحطه بـ [[as]] أو generic كلام بس ومفيش فحص وقت التشغيل، ومع [[unknown]] حتى الـ annotation مش هتعدّي من غير [[as]].

الحدود (boundaries) هي الأماكن اللي الداتا بتدخل فيها كودك من برّه: رد API، و request body، و localStorage، و env، ورسايل WebSocket، و JSON من AI. القاعدة: جوه كودك ثق في الأنواع، وعند الحدود افحص. و Zod بيعمل الفحص ويطلّع النوع في خطوة.

و [[schema.parse]] بترجع نسخة من غير المفاتيح اللي مش في الـ schema، فالـ schema اللي فيها اللي محتاجه بس بتحميك كمان من داتا زيادة. ولو الـ API بيرجّع أشكال مختلفة حسب الحالة، اعمل schema لكل حالة و [[z.discriminatedUnion]].

ولو مش عايز Zod في الـ bundle بتاع الـ front (حجمه مهم)، فيه بدائل أصغر، أو اكتب type guard بإيدك، أو على الأقل خليه [[unknown]] وافحص الحقول اللي بتستخدمها. المهم متبدأش بـ [[as]].

ولو الـ API بتاعك انت (نفس الـ monorepo)، الـ schemas المشتركة بين الـ front والـ back بتدّيك نفس النوع في الناحيتين من غير نسخ.`,
            when: "أي fetch لـ API خارجي أو بتاعك، وأي JSON.parse، وأي داتا مخزنة في المتصفح، وناتج AI المطلوب JSON.",
            mistakes: R`[[const data: User[] = await res.json()]]: annotation على any، يعني [[as]] متنكّر. و generic [[fetchJson<T>]] من غير schema. وتقرا الـ body من غير ما تفحص [[res.ok]]، فتحاول تعمل parse لصفحة خطأ HTML. و schema بكل حقول الرد (١٠٠ حقل) وانت محتاج ٣: أي تغيير تافه في الـ API يكسر التطبيق.`
          },
          lines: [
            "Zod.",
            "generic على الـ schema: نوع الرجوع هو نوع الـ schema نفسها.",
            "timeout عشان متستناش للأبد.",
            "4xx أو 5xx: متحاولش تقرا الـ body كأنه نجح.",
            R`الـ body [[unknown]] صراحة، مش any.`,
            "الفحص الحقيقي: لو الشكل غلط يترمي ZodError فيه المشكلة بالظبط.",
            "قفلة.",
            "schema للحاجات اللي هتستخدمها بس، مش الرد كله.",
            R`[[repo]] نوعها طالع من الـ schema، ومفحوص فعلًا.`,
            "آمن."
          ],
          sol: R`الناتج: [[ZodError]] وفيه [["expected": "string"]] و [["code": "invalid_type"]] و [["path": [ "stargazers_count" ]]] و [["message": "Invalid input: expected string, received number"]]، والـ stack بيشاور على [[schema.parse(body)]]. قبل التعديل كان بيطبع [[microsoft/TypeScript]] وجنبه عدد النجوم.

لو طلعلك [[Error: https://api.github.com/repos/microsoft/typescript رجّع 403]] بدل كده، ده GitHub مش Zod: الـ API من غير توكن ليه حد صغير في الساعة (أو الشبكة عندك حاجباه). استنى شوية، أو ابعت header [[Authorization]] بتوكن، أو جرّب على API تاني.`
        },
        {
          cmd: "branded types",
          title: "تفرّق بين UserId و OrderId مع إن الاتنين string",
          desc: R`بسبب structural typing، [[type UserId = string]] و [[type OrderId = string]] نفس النوع، فتقدر تبعت order id لدالة مستنية user id و TS ساكت. الـ branded type بيضيف علامة وهمية: [[string & { readonly __brand: "UserId" }]]، فالنوعين يبقوا مختلفين وقت الفحص، ووقت التشغيل الاتنين string عادي.

والطريقة الوحيدة تعمل قيمة branded تبقى دالة بتفحص (أو schema)، فالعلامة معناها «القيمة دي اتفحصت».`,
          example: R`type Brand<T, B extends string> = T & { readonly __brand: B };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
const toUserId = (s: string): UserId => {
  if (!s.startsWith("usr_")) throw new Error("user id غلط");
  return s as UserId;
};
function getUser(id: UserId) { return id; }
const uid = toUserId("usr_123");
const oid = "ord_9" as OrderId;
getUser(uid);
getUser(oid); // خطأ: OrderId مش UserId
getUser("usr_1"); // خطأ: string عادي مش متفحص`,
          try: R`جرّب [[uid.toUpperCase()]]: شغالة، لأنه لسه string. وبعدين في Zod: [[z.string().startsWith("usr_").brand<"UserId">()]] وخد منه [[z.infer]]، وقارن النوع.`,
          flag: "script",
          deep: {
            why: "في مشروع فيه users و orders و products، كل الـ ids strings أو أرقام. [[deleteOrder(userId)]] بدل [[deleteOrder(orderId)]] غلطة سهلة جدًا، والنتيجة ممكن تبقى مسح داتا غلط، و TS مش هيقول حاجة. الـ brands بتخلي النوع يفرّق بينهم. ونفس الفكرة لـ «string اتعمله sanitize» أو «مبلغ بالقرش مش بالجنيه».",
            how: R`TS structural: نوعين بنفس الشكل هما نفس النوع. الـ brand بيضيف خاصية وهمية ([[__brand]]) بقيمة literal مختلفة، فالشكل بقى مختلف. مفيش object فعلًا فيه الخاصية دي: ده كدب متحكم فيه، و [[as]] بيتعمل مرة واحدة جوه الدالة اللي بتفحص.

والقيمة branded لسه string: كل methods الـ string شغالة، وتتبعت لأي حاجة مستنية string. الحماية في اتجاه واحد: string عادي مش هيدخل مكان UserId.

و Zod فيه [[.brand<"UserId">()]]: الـ schema بتفحص، والنوع الطالع branded. كده الـ brand بيتعمل عند الحدود تلقائيًا.

ده مش ميزة رسمية في TS (TS مفيهوش nominal types)، هو نمط. استخدمه في الأماكن اللي الغلط فيها غالي بس، مش على كل string.`,
            when: "ids من أنواع مختلفة في نفس الـ service، وفلوس بعملات أو وحدات مختلفة، وقيم لازم تتفحص قبل ما تتستخدم (email متأكد منه، HTML متنضف).",
            mistakes: R`brands على كل حاجة فالكود يتملي [[as]] وتحويلات. و [[as UserId]] في كل مكان بدل دالة واحدة بتفحص، فالعلامة فقدت معناها. وتفتكر إن الـ brand موجود وقت التشغيل.`
          },
          lines: [
            R`helper: النوع الأصلي وعلامة باسم. و [[__brand]] مش موجودة وقت التشغيل.`,
            "string معلّم UserId.",
            "string معلّم OrderId.",
            "الباب الوحيد لـ UserId: دالة بتفحص.",
            "الفحص الحقيقي.",
            R`[[as]] هنا مقبولة: مكان واحد، وبعد فحص.`,
            "قفلة.",
            "دالة مستنية UserId بس.",
            "UserId متفحص.",
            "OrderId (هنا بـ as للتبسيط).",
            "مقبول.",
            "مرفوض: نفس الـ string بس العلامة مختلفة.",
            R`مرفوض: لازم يعدّي على [[toUserId]] الأول.`
          ],
          sol: R`[[uid.toUpperCase()]] بتشتغل وبترجع [[USR_123]]: [[UserId]] لسه string ونوع زيادة مش موجود وقت التشغيل.

ومن Zod النوع بيطلع [[string & $brand<"UserId">]]، مش نفس [[Brand<string, "UserId">]] بتاعنا. عشان كده مش بيتبدلوا: [[getUser(zid)]] بيطلّع Property '__brand' is missing، والعكس برضه خطأ. اختار طريقة واحدة في المشروع. و [[UserIdSchema.safeParse("ord_1").success]] بترجع [[false]]، يعني Zod بيفحص فعلًا قبل ما يدّي الـ brand.`,
          solCode: R`import * as z from "zod";
const UserIdSchema = z.string().startsWith("usr_").brand<"UserId">();
type UserId = z.infer<typeof UserIdSchema>; // string & $brand<"UserId">
function getUser(id: UserId) { return id; }
getUser(UserIdSchema.parse("usr_5"));
// getUser("usr_1"); // خطأ: string عادي مش UserId
console.log(UserIdSchema.safeParse("ord_1").success); // false`
        }
      ]
    },
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
          try: R`افتح tsconfig في آخر مشروع ليك وقارنه بالقايمة دي، وشغّل [[npx tsc --showConfig]] تشوف الإعدادات الفعلية بعد ما يدمج الـ extends (الـ defaults الضمنية زي strict في TS 7 مش بتظهر فيه).`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفهم الإعدادات مش بتنسخها، وإنك عارف ليه المشروع ممكن يتبني ويقع وقت التشغيل.",
            how: R`TS 6 و 7 غيّروا defaults كتير: strict بقى true، و module بقى esnext، و types بقى فاضي (لازم تكتب node)، و baseUrl و moduleResolution node10 و target es5 اتشالوا في 7. و [[paths]] مبتغيّرش الـ JS الناتج، فالـ runtime لازم يفهمها. و [[isolatedModules]] لازم مع أي أداة بتترجم ملف ملف.`,
            when: "«الفرق بين bundler و nodenext؟»، و «ليه الـ build نجح والتطبيق وقع؟»، و «يعني إيه skipLibCheck؟ آمن؟».",
            mistakes: "«بسيب الـ default». و strict: false «عشان الأخطاء كتير». ونسخ tsconfig من Next لسيرفر Express."
          },
          lines: [
            "الحد الأدنى لسيرفر Node."
          ],
          sol: R`[[npx tsc --showConfig]] بيطبع الـ config بعد ما يدمج [[extends]] ويضيف الإعدادات اللي بتتحسب من غيرها (زي [[moduleResolution]] من [[module]]). بس مش بيطبع كل الـ defaults: في TS 7 [[strict]] شغال افتراضيًا ومش هيظهر لو مش مكتوب. عشان كده اكتبه صريح.

الإجابة النموذجية بالترتيب: [[strict: true]]، و [[noUncheckedIndexedAccess]]، و [[module]]/[[moduleResolution]] حسب البيئة ([[nodenext]] لسيرفر بـ tsc، و [[bundler]] مع Vite و Next)، و [[target]] حديث، و [[types: ["node"]]] للسيرفر، و [[skipLibCheck]]، و [[verbatimModuleSyntax]]، و [[tsc --noEmit]] في الـ CI. واذكر ليه كل واحد، مش أساميهم بس.`
        }
      ]
    }
]);

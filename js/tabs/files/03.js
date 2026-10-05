// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات الويب",
      l: 2,
      n: "اللي بيتعمل منه أي موقع: .html و .css و .js وأخواته .mjs و .cjs، و .ts و .d.ts، و .jsx و .tsx و .vue و .svelte، و .min.js و .map اللي بتطلع من الـ build",
      items: [
        {
          cmd: ".html",
          title: "ملف .html جواه إيه، وبتفتحه في المتصفح إزاي صح؟",
          desc: R`[[.html]] ملف نصي فيه هيكل الصفحة بالتاجات: عنوان وفقرات وصور ولينكات وفورمز. المتصفح بيقراه ويرسمه. التفاصيل الكاملة للغة في تاب HTML و CSS، هنا هنعرف الملف نفسه.

جواه إيه:
• [[<!DOCTYPE html>]] أول سطر: بيقول للمتصفح «HTML حديث». من غيره المتصفح بيشتغل في وضع قديم (quirks mode) وحاجات في الـ CSS بتبوظ.
• [[<html lang="ar" dir="rtl">]]: الـ root، وفيه اللغة واتجاه الكتابة.
• [[<head>]]: معلومات عن الصفحة مش بتظهر فيها: [[<meta charset="utf-8">]] (لازم وفي الأول عشان العربي)، والعنوان، و viewport للموبايل، وربط ملفات CSS.
• [[<body>]]: اللي بيظهر.
• التاجات زي XML بس أسمح: [[<img>]] و [[<meta>]] و [[<br>]] و [[<input>]] مبيتقفلوش (void elements)، والمتصفح بيصلّح أغلب الأخطاء لوحده من غير ما يقولك.
• التعليق [[<!-- -->]]، والـ entities زي XML وزيادة ([[&nbsp;]] و [[&copy;]]).

الامتدادات: [[.html]] هو الأساسي، و [[.htm]] نفس الحاجة (من أيام الامتدادات اللي ٣ حروف). و [[index.html]] اسم خاص: السيرفر بيبعته لما حد يطلب الفولدر نفسه ([[/]]).

بتفتحه إزاي:
• دبل كليك: المتصفح بيفتحه من [[file:///]]. ده كويس لصفحة بسيطة، بس [[fetch]] و ES modules ([[type="module"]]) وحاجات تانية مش بتشتغل من [[file://]] لأسباب أمان.
• الأصح: سيرفر صغير محلي. [[python3 -m http.server 8000]] في الفولدر وبعدين [[http://localhost:8000]]، أو [[npx serve]]، أو إضافة Live Server في VS Code.

ولو عايز تعرف المتصفح فهم الصفحة إزاي: [[F12]] ثم تاب Elements، ده الشكل بعد ما المتصفح صلّح الأخطاء، مش الملف زي ما انت كاتبه ([[Ctrl+U]] بيعرض الملف الأصلي).`,
          example: R`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>بوابة الجيم</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>أهلًا بيك</h1>
  <p class="intro">احجز ميعادك <a href="/book">من هنا</a>.</p>
  <img src="logo.png" alt="لوجو الجيم">
  <script src="app.js" defer>$__lt/script>
</body>
</html>`,
          flag: "script",
          try: R`احفظ المثال في [[index.html]] في فولدر لوحده وافتحه بدبل كليك وبص على الرابط فوق ([[file:///...]]). بعدين في نفس الفولدر نفّذ [[python3 -m http.server 8000]] وافتح [[http://localhost:8000]]. افتح [[F12]] وشوف تاب Console: هيقولك إن [[style.css]] و [[app.js]] و [[logo.png]] مش موجودين (404). وجرّب تشيل سطر [[charset]] وتعمل refresh.`,
          deep: {
            why: R`HTML هو الملف الوحيد اللي المتصفح بيبدأ بيه: أي موقع، حتى React و Next.js، في الآخر بيبعت HTML، والـ HTML ده هو اللي بيقول هات الـ CSS والـ JS منين.`,
            how: R`المتصفح بيقرا الملف من فوق لتحت ويبني شجرة اسمها DOM. لما يلاقي [[<link rel="stylesheet">]] بيطلب ملف الـ CSS، ولما يلاقي [[<script>]] بيطلب الـ JS (و [[defer]] معناها نزّله دلوقتي ونفّذه بعد ما الصفحة تخلص). وكل ملف بيتطلب بطلب HTTP منفصل، فالسيرفر لازم يبعت كل واحد بالـ Content-Type الصح (المستوى ٣).`,
            when: R`أي صفحة ويب، وكمان قوالب الإيميلات، وملفات التقارير اللي بتتفتح في المتصفح، والـ [[index.html]] اللي Vite و React بيبدأوا منه.`,
            mistakes: R`تنسى [[<meta charset="utf-8">]] فالعربي يظهر ملخبط. تفتح الصفحة من [[file://]] وتستغرب إن [[fetch]] أو الـ modules مش شغالين ([[blocked by CORS policy]]): شغّل سيرفر محلي. تكتب مسار من جهازك [[C:\Users\...\logo.png]] فيشتغل عندك بس. وتحفظ الملف [[index.html.txt]] لأن الامتدادات مخفية (درس «إظهار الامتدادات»).`
          },
          lines: [
            R`HTML حديث (HTML5).`,
            R`الـ root: اللغة عربي والاتجاه من اليمين.`,
            R`بداية معلومات الصفحة.`,
            R`الترميز UTF-8، ولازم يبقى في أول الـ head.`,
            R`عشان الصفحة تتظبط على عرض الموبايل.`,
            R`العنوان اللي بيظهر في التاب.`,
            R`ربط ملف CSS خارجي.`,
            R`قفل الـ head.`,
            R`بداية اللي بيظهر.`,
            R`عنوان رئيسي.`,
            R`فقرة ليها class، وجواها لينك.`,
            R`صورة: [[<img>]] مبيتقفلش، و [[alt]] الوصف لو الصورة مظهرتش ولقارئ الشاشة.`,
            R`ملف JS خارجي، و [[defer]] يتنفذ بعد ما الصفحة تتبني.`,
            R`قفل الـ body.`,
            R`قفل الـ html.`
          ],
          sol: R`بالدبل كليك الرابط بيبقى [[file:///home/you/lab/site/index.html]] والصفحة بتظهر من اليمين للشمال بالعنوان والفقرة. ومع [[python3 -m http.server 8000]] الترمنال بيطبع:
[[Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...]]
وتحته سطر لكل طلب، منهم [["GET /style.css HTTP/1.1" 404 -]] لأن الملف مش موجود. وفي Console هتلاقي 404 لنفس الملفات.

لما تشيل سطر [[charset]] ساعات العربي بيفضل سليم لأن السيرفر أو المتصفح بيخمّن صح، وساعات (خصوصًا من [[file://]] أو سيرفرات قديمة) بيظهر [[Ø§Ù„]]. متعتمدش على التخمين.`
        },
        {
          cmd: ".css",
          title: "ملف .css جواه إيه، وإيه .scss و .module.css؟",
          desc: R`[[.css]] ملف نصي فيه قواعد التنسيق: الألوان والخطوط والمسافات والـ layout. التفاصيل في تاب HTML و CSS.

شكل القاعدة:
• selector بيختار العناصر: [[body]] (تاج)، و [[.intro]] (class، بنقطة)، و [[#header]] (id، بشباك)، و [[a:hover]] (حالة).
• [[{ }]] جواهم الخصائص.
• [[property: value;]]: خاصية و [[:]] وقيمة و [[;]] في الآخر.
• [[/* تعليق */]]: التعليق الوحيد في CSS. مفيش [[//]].
• [[--brand: #e11d48;]]: متغير (custom property)، وبيتقري بـ [[var(--brand)]].
• [[@media]] و [[@import]] و [[@font-face]] و [[@keyframes]]: قواعد خاصة بتبدأ بـ [[@]].

بيوصل للصفحة إزاي: [[<link rel="stylesheet" href="style.css">]] في الـ head (الأفضل)، أو [[<style>]] جوه الـ HTML، أو [[style="..."]] على العنصر.

أخواته:
• [[.scss]] و [[.sass]] (Sass) و [[.less]]: لغات بتتحول لـ CSS، فيها متغيرات و nesting و mixins. المتصفح مبيفهمهاش، لازم build (Vite بيعملها لوحده لو نزلت [[sass]]).
• [[.module.css]]: CSS Modules في React و Next.js: الـ classes جواه بتاخد أسامي فريدة عشان متتعارضش مع ملفات تانية.
• [[.css.map]]: source map للـ CSS (درس [[.min.js]]).
• [[tailwind.config.js]] و [[postcss.config.js]]: إعدادات أدوات بتولّد CSS.`,
          example: R`:root {
  --brand: #e11d48;
}
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
.intro a:hover {
  color: var(--brand);
}
@media (max-width: 600px) {
  h1 { font-size: 1.5rem; }
}`,
          flag: "script",
          try: R`احفظ المثال في [[style.css]] جنب [[index.html]] بتاع الدرس اللي فات وافتح الصفحة من السيرفر المحلي. مرّر الماوس على اللينك. صغّر عرض المتصفح لأقل من 600px وشوف العنوان. وبعدين شيل [[;]] من آخر سطر [[margin: 0]] وشوف إيه اللي بيحصل للخاصية اللي بعدها، وافتح [[F12]] ثم Elements واختار [[body]] وشوف الـ Styles.`,
          deep: {
            why: R`فصل الشكل عن المحتوى: نفس الـ HTML ممكن ياخد شكل تاني خالص بتغيير ملف CSS، وملف CSS واحد بيتطبق على كل صفحات الموقع والمتصفح بيحفظه (cache) مرة واحدة.`,
            how: R`المتصفح بيقرا القواعد ويطابق كل selector على عناصر الـ DOM، ولو أكتر من قاعدة على نفس الخاصية بيكسب الأقوى (specificity) أو الأخير. والـ CSS مبيوقفش عند الغلط زي JSON: القاعدة الغلط بس بتتجاهل والباقي يشتغل، وده بيخلي الغلط صعب يتلاحظ.`,
            when: R`أي تنسيق لصفحة ويب. و [[.scss]] أو Tailwind لما المشروع يكبر.`,
            mistakes: R`تنسى [[;]] فالخاصية اللي بعدها تتبلع وتتجاهل من غير أي رسالة. تكتب تعليق [[//]] فيبوّظ القاعدة اللي بعده. تربط [[.scss]] مباشرة في [[<link>]] والمتصفح مبيفهموش. وتغيّر في الـ CSS ومتشوفش التغيير بسبب الـ cache: [[Ctrl+Shift+R]].`
          },
          lines: [
            R`[[:root]] هو الـ html نفسه: مكان المتغيرات العامة.`,
            R`متغير CSS: بيبدأ بـ [[--]].`,
            R`قفل القاعدة.`,
            R`selector بالتاج: كل الصفحة.`,
            R`خاصية و [[:]] وقيمة و [[;]].`,
            R`أكتر من قيمة مفصولة بـ [[,]]: لو الخط الأول مش موجود ياخد التاني.`,
            R`قفل.`,
            R`[[.intro]] class، وجواه [[a]]، و [[:hover]] لما الماوس يبقى عليه.`,
            R`[[var()]] بتقرا المتغير.`,
            R`قفل.`,
            R`[[@media]]: القواعد اللي جواه تشتغل بس لو الشاشة 600px أو أقل.`,
            R`قاعدة كاملة في سطر واحد.`,
            R`قفل الـ media.`
          ],
          sol: R`اللينك بيبقى أحمر (لون [[--brand]]) لما الماوس يقف عليه، والعنوان بيصغر لما العرض يقل عن 600px.

لما تشيل [[;]] من [[margin: 0]]: المتصفح بيقرا [[margin: 0 font-family: system-ui, sans-serif;]] كقيمة واحدة غلط، فبيتجاهل الاتنين: الـ margin يرجع الافتراضي (8px) والخط يرجع الافتراضي. وفي Styles في الـ DevTools هتلاقي الخاصية مشطوبة وجنبها علامة تحذير صفرا، ومفيش أي غلط في الـ Console.`
        },
        {
          cmd: ".js و .mjs و .cjs",
          title: "إيه الفرق بين .js و .mjs و .cjs، وليه بيطلعلي require is not defined؟",
          desc: R`الـ ٣ ملفات JavaScript عادي. الفرق في نظام الـ modules (إزاي ملف بياخد حاجة من ملف تاني)، و Node عنده نظامين:

• CommonJS (القديم، بتاع Node من الأول): [[require("./x")]] و [[module.exports = ...]].
• ES Modules أو ESM (الرسمي في JavaScript، والمتصفح بيفهمه): [[import { x } from "./x.js"]] و [[export]].

والامتداد بيقول لـ Node يقرا الملف بأنهي نظام:
• [[.mjs]]: ESM دايمًا.
• [[.cjs]]: CommonJS دايمًا.
• [[.js]]: على حسب أقرب [[package.json]]: لو فيه [["type": "module"]] يبقى ESM، ولو مفيش يبقى CommonJS. (و Node 22 وأحدث لو ملقاش [[type]] بيجرب يكتشف لوحده من وجود [[import]]، ويطلعلك تحذير.)

في المتصفح: [[<script src="app.js">]] عادي، أو [[<script type="module" src="app.js">]] عشان تستخدم [[import]]. والمتصفح مبيهتمش بالامتداد خالص، بيهمه الـ Content-Type اللي السيرفر باعته.

ليه مهم؟ لأن الرسايل دي هتقابلك كتير:
• [[ReferenceError: require is not defined in ES module scope]]: بتستخدم [[require]] في ملف ESM.
• [[SyntaxError: Cannot use import statement outside a module]]: بتستخدم [[import]] في ملف CommonJS.
وكمان في ESM لازم تكتب الامتداد في الـ import ([["./math.js"]] مش [["./math"]])، ومفيش [[__dirname]] (استخدم [[import.meta.dirname]]).

النهاردة: المشاريع الجديدة ESM ([["type": "module"]])، وملفات الإعدادات اللي لازم تفضل CommonJS بتاخد [[.cjs]] (زي [[.eslintrc.cjs]]).`,
          example: R`cat math.mjs app.mjs
node app.mjs
node app.cjs
node bad.mjs
node bad.cjs
grep '"type"' package.json`,
          try: R`في فولدر جديد اعمل:
[[math.mjs]] فيه [[export const add = (a, b) => a + b;]]
[[app.mjs]] فيه [[import { add } from "./math.mjs";]] وتحته [[console.log("mjs:", add(2, 3));]]
[[util.cjs]] فيه [[module.exports = { twice: (x) => x * 2 };]]
[[app.cjs]] فيه [[const { twice } = require("./util.cjs");]] وتحته [[console.log("cjs:", twice(21));]]
وكمان [[bad.mjs]] فيه [[require]] و [[bad.cjs]] فيه [[import]]. شغّلهم كلهم. وبعدين اعمل [[plain.js]] فيه [[import]] واعمل [[package.json]] فيه [[{"name": "w"}]] بس وشغّله، وبعدين ضيف [["type": "module"]] وشغّله تاني.`,
          deep: {
            why: R`Node طلع سنة 2009 قبل ما JavaScript يبقى ليه modules رسمية، فعمل CommonJS. سنة 2015 اللغة نفسها جابت [[import]] و [[export]]، فبقى فيه نظامين بيشتغلوا بطريقة مختلفة. الامتدادات [[.mjs]] و [[.cjs]] اتعملت عشان تحسم من غير لبس.`,
            how: R`CommonJS بيحمّل وقت التشغيل: [[require]] دالة عادية بتقرا الملف وتنفذه وترجّع [[module.exports]]. ESM بيتحلل قبل التشغيل: Node بيقرا كل الـ [[import]] الأول ويبني شجرة الملفات، وبعدين ينفذ. عشان كده [[import]] لازم يبقى فوق ومينفعش جوه if (إلا [[import()]] الديناميكي). و Node 22+ بقى يقدر يعمل [[require]] لملف ESM كمان في أغلب الحالات.`,
            when: R`[[.js]] مع [["type": "module"]] للمشاريع الجديدة. [[.cjs]] لملف إعدادات أداة قديمة بتطلب CommonJS. و [[.mjs]] لسكربت لوحده عايزه ESM من غير package.json.`,
            mistakes: R`تنسخ كود من مقالة قديمة فيها [[require]] في مشروع ESM. تنسى الامتداد في [[import "./utils"]] فيطلعلك [[ERR_MODULE_NOT_FOUND]]. تستخدم [[__dirname]] في ESM فيطلعلك [[__dirname is not defined]]. وتغيّر [["type"]] في package.json فكل ملفات الإعدادات القديمة ([[*.config.js]]) تقع: سمّيها [[.cjs]].`
          },
          lines: [
            R`ملف ESM فيه [[export]]، وملف بيعمل [[import]] منه.`,
            R`بيشتغل لأن الامتداد [[.mjs]] يعني ESM.`,
            R`بيشتغل لأن الامتداد [[.cjs]] يعني CommonJS.`,
            R`[[require]] في ملف ESM: غلط.`,
            R`[[import]] في ملف CommonJS: غلط.`,
            R`بيشوف المشروع ESM ولا لأ.`
          ],
          sol: R`الناتج الحقيقي (Node 24):
[[mjs: 5]]
[[cjs: 42]]
[[ReferenceError: require is not defined in ES module scope, you can use import instead]]
[[SyntaxError: Cannot use import statement outside a module]]

و [[plain.js]] فيه [[import]] و [[package.json]] من غير [[type]]: بيشتغل ويطبع النتيجة، بس قبلها:
[[Warning: Module type of file:///.../plain.js is not specified and it doesn't parse as CommonJS.]]
[[Reparsing as ES module because module syntax was detected. This incurs a performance overhead.]]
[[To eliminate this warning, add "type": "module" to .../package.json.]]
وبعد ما تضيف [["type": "module"]] التحذير بيختفي. (في Node أقدم من 22 كان بيقع بـ [[Cannot use import statement outside a module]].)`
        },
        {
          cmd: ".ts و .d.ts",
          title: "ملف .ts بيتشغّل إزاي، وإيه ملف .d.ts؟",
          desc: R`[[.ts]] ملف TypeScript: JavaScript وزيادة عليه الأنواع ([[: string]] و [[type]] و [[interface]]). التفاصيل في تاب TypeScript، هنا هنعرف الملفات نفسها.

المتصفح مبيفهمش TypeScript. فالملف لازم يتحول لـ [[.js]] الأول، وده بيحصل بطرق:
• [[tsc]] (الـ compiler الرسمي): بيفحص الأنواع ويطلّع [[.js]]. بيقرا الإعدادات من [[tsconfig.json]] (المستوى ده، درس tsconfig).
• Vite و Next.js و esbuild: بيشيلوا الأنواع بسرعة من غير فحص، والفحص بيبقى في المحرر أو بـ [[tsc --noEmit]].
• Node 22.18 وأحدث بيشغّل [[.ts]] مباشرة ([[node app.ts]]) بإنه يشيل الأنواع وبس، من غير أي فحص. و [[tsx]] و [[ts-node]] أدوات بتعمل نفس الحكاية للنسخ الأقدم.
يعني الأنواع للمحرر وللفحص، ومش بتأثر على التشغيل. كود فيه غلط أنواع ممكن يشتغل عادي ويطلّع نتيجة غلط.

[[.d.ts]] (declaration file): ملف فيه الأنواع بس من غير أي كود. بيوصف شكل مكتبة مكتوبة JavaScript عشان TypeScript والمحرر يعرفوا الدوال بتاخد وترجّع إيه. هتلاقيه في [[node_modules/@types/...]] (زي [[@types/node]] و [[@types/express]])، وفي أي مكتبة جواها ملف [[index.d.ts]]، و [[tsc --declaration]] بيعمله لكودك. و [[vite-env.d.ts]] و [[next-env.d.ts]] اللي في مشاريعك ملفات أنواع للأداة.

وأخوات: [[.mts]] و [[.cts]] نفس فكرة [[.mjs]] و [[.cjs]]، و [[.tsx]] لما الملف فيه JSX (الدرس الجاي).`,
          example: R`cat price.ts
node price.ts
npx tsc price.ts --declaration --target es2022
cat price.d.ts
node wrong.ts
npx tsc --noEmit wrong.ts`,
          try: R`اعمل [[price.ts]] فيه:
[[type Item = { name: string; price: number; qty: number };]]
[[export function total(items: Item[]): number { return items.reduce((s, i) => s + i.price * i.qty, 0); }]]
[[console.log(total([{ name: "تيشيرت", price: 250, qty: 2 }]));]]
وشغّل المثال. واعمل [[wrong.ts]] فيه [[const n: number = "x"; console.log(n);]] وشغّله بـ node وبـ tsc. ([[npx]] هينزّل TypeScript مؤقتًا لو مش متسطّب.)`,
          deep: {
            why: R`JavaScript مبيقولكش إنك بعت string لدالة مستنية رقم غير وانت شغّال، وساعات بيكمّل بنتيجة غلط. TypeScript بيكتشف ده وانت بتكتب. بس عشان يفضل متوافق مع كل حاجة، قرروا إن الناتج النهائي JavaScript عادي، والأنواع تتمسح.`,
            how: R`[[tsc]] بيقرا [[.ts]] ويبني صورة لكل الأنواع ويقارن، ولو فيه تعارض بيطلّع error زي [[TS2322]]. بعد كده بيمسح كل حاجة خاصة بـ TypeScript ويكتب [[.js]] (ويحوّل [[import]] لـ [[require]] لو الإعدادات قالت كده). أما Node بيمسح الأنواع بس من غير فحص، عشان كده [[wrong.ts]] اشتغل.`,
            when: R`أي مشروع حجمه معقول: Angular و NestJS وأغلب مشاريع React و Next.js. والـ [[.d.ts]] لما تستخدم مكتبة JS ومحتاج أنواعها ([[npm i -D @types/express]]).`,
            mistakes: R`تفتكر إن [[node app.ts]] أو Vite بيفحصوا الأنواع فتنشر كود فيه أخطاء: حط [[tsc --noEmit]] في الـ CI. تعدّل في ملف [[.js]] اللي [[tsc]] طلّعه بدل الـ [[.ts]] فتعديلك يتمسح في الـ build الجاي. وتعمل commit لفولدر [[dist/]] اللي فيه الناتج.`
          },
          lines: [
            R`ملف TypeScript فيه [[type]] وأنواع للدالة.`,
            R`Node 22.18+ بيشيل الأنواع ويشغّل: بيطبع [[500]].`,
            R`[[tsc]] بيفحص ويطلّع [[price.js]]، و [[--declaration]] بيطلّع [[price.d.ts]] كمان.`,
            R`ملف الأنواع: الدالة من غير جسمها.`,
            R`فيه غلط أنواع، بس Node بيشغّله عادي ويطبع [[x]].`,
            R`[[tsc]] بيمسك الغلط، و [[--noEmit]] يعني افحص بس متطلّعش ملفات.`
          ],
          sol: R`الناتج الحقيقي:
[[node price.ts]] ← [[500]]
[[price.d.ts]] فيه:
[[type Item = { name: string; price: number; qty: number; };]] (على كذا سطر)
[[export declare function total(items: Item[]): number;]]
[[export {};]]
و [[price.js]] فيه نفس الكود من غير الأنواع.

[[node wrong.ts]] ← [[x]] (اشتغل عادي!)
[[npx tsc --noEmit wrong.ts]] ← [[wrong.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'.]]

ولو Node عندك أقدم من 22.18، [[node price.ts]] هيقول [[Unknown file extension ".ts"]]، واستخدم [[npx tsx price.ts]].`
        },
        {
          cmd: ".jsx و .tsx و .vue و .svelte",
          title: "ملفات .jsx و .tsx و .vue و .svelte إيه، وليه HTML جوه JavaScript؟",
          desc: R`دي ملفات الـ components في frameworks الواجهة. كلها مش بتشتغل في المتصفح زي ما هي، لازم أداة build تحوّلها لـ [[.js]] عادي.

• [[.jsx]]: JavaScript فيه JSX، يعني تاجات شبه HTML جوه الكود: [[return <h2>{title}</h2>]]. ده React (و Preact و Solid). الـ [[{ }]] جوه JSX معناها «حط قيمة JavaScript هنا». و [[className]] بدل [[class]] لأن [[class]] كلمة محجوزة في JS. وكل تاج لازم يتقفل حتى [[<img />]].
• [[.tsx]]: نفس الكلام بس TypeScript. لو ملف [[.ts]] فيه JSX هيقع، لازم [[.tsx]]. (والعكس عادي: [[.tsx]] من غير JSX مفيش مشكلة.)
• [[.vue]]: Vue Single File Component: ملف واحد فيه ٣ بلوكات: [[<template>]] (الـ HTML)، و [[<script setup>]] (الكود)، و [[<style scoped>]] (CSS خاص بالـ component ده بس).
• [[.svelte]]: نفس فكرة Vue: [[<script>]] و HTML و [[<style>]] في ملف واحد، و Svelte بيحوّله لـ JS صغير جدًا وقت الـ build.
• وأخوات: [[.astro]] (Astro) و [[.component.ts]] و [[.component.html]] (Angular، تاب Angular).

الأداة اللي بتحوّلهم: Vite و Next.js و esbuild و Babel و SWC. JSX بيتحول لنداءات دوال: [[<h2>{title}</h2>]] بتبقى [[jsx("h2", { children: title })]].

VS Code بيلوّن [[.jsx]] و [[.tsx]] لوحده. و [[.vue]] محتاج إضافة Vue - Official، و [[.svelte]] محتاج إضافة Svelte for VS Code.`,
          example: R`import { useState } from "react";
type Props = { title: string };
export default function Counter({ title }: Props) {
  const [count, setCount] = useState(0);
  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setCount(count + 1)}>دوس: {count}</button>
    </div>
  );
}`,
          flag: "script",
          try: R`احفظ المثال في [[Counter.tsx]] وشوف إيه اللي بيطلع لما يتحول: [[npx esbuild Counter.tsx --jsx=automatic]]. بعدين انسخه باسم [[Counter.ts]] ونفّذ [[npx esbuild Counter.ts]] وشوف الغلط. ولو عندك مشروع React من تاب React افتح أي component فيه.`,
          deep: {
            why: R`الواجهة بتتكون من حتت (components)، وكل حتة ليها شكل (HTML) وسلوك (JS) وأحيانًا تنسيق (CSS). بدل ما تفرّقهم على ٣ ملفات وتربطهم، الـ frameworks دي حطتهم في ملف واحد أو في نفس الكود، وسابت أداة الـ build تفصلهم.`,
            how: R`الـ compiler بيقرا الملف ويحوّل كل تاج JSX لنداء دالة بتعمل element، و [[{title}]] تبقى قيمة عادية. في [[.vue]] و [[.svelte]] الـ compiler بيفصل البلوكات: الـ template يتحول دالة render أو كود DOM مباشر، والـ CSS يتحط في ملف CSS وكل selector ياخد attribute مميز عشان [[scoped]].`,
            when: R`[[.tsx]] في أي مشروع React أو Next.js أو React Native بـ TypeScript. و [[.vue]] لو المشروع Vue، و [[.svelte]] لو Svelte.`,
            mistakes: R`تكتب JSX في ملف [[.ts]] أو [[.js]] (في Vite لازم [[.jsx]]) فيطلعلك [[Expected ">" but found "className"]]. تكتب [[class]] بدل [[className]]. تنسى إن الـ component اسمه لازم يبدأ بحرف كبير ([[<Counter />]]) وإلا React يفتكره تاج HTML. وتحاول تفتح [[.tsx]] في المتصفح مباشرة.`
          },
          lines: [
            R`[[import]] عادي: hook من React.`,
            R`نوع TypeScript للـ props.`,
            R`الـ component دالة بتاخد props واسمها بحرف كبير.`,
            R`state: [[count]] القيمة، و [[setCount]] اللي بتغيّرها.`,
            R`[[return]] بيرجّع JSX، والقوس عشان يبقى على كذا سطر.`,
            R`تاج JSX: [[className]] بدل [[class]].`,
            R`[[{title}]] قيمة JavaScript جوه التاج.`,
            R`[[onClick]] بياخد دالة، والنص جواه فيه [[{count}]].`,
            R`قفل الـ div.`,
            R`قفل الـ return.`,
            R`قفل الدالة.`
          ],
          sol: R`[[npx esbuild Counter.tsx --jsx=automatic]] بيطبع (مختصر):
[[import { jsx, jsxs } from "react/jsx-runtime";]]
[[export default function Counter({ title }) {]]
[[  const [count, setCount] = useState(0);]]
[[  return /* @__PURE__ */ jsxs("div", { className: "card", children: [...] });]]
يعني الأنواع اتمسحت، وكل تاج بقى [[jsx(...)]] أو [[jsxs(...)]]، والنص العربي اتكتب بـ [[\u062F\u0648\u0633]].

و [[Counter.ts]]:
[[✘ [ERROR] Expected ">" but found "className"]]
[[    Counter.ts:6:9:]]
لأن في [[.ts]] الـ [[<div]] بيتفهم كـ type assertion قديمة مش JSX.`
        },
        {
          cmd: ".min.js و .map",
          title: "إيه ملفات .min.js و .js.map، وإزاي تقرا الغلط في كود متصغّر؟",
          desc: R`لما تعمل build لموقع (Vite أو Next.js أو webpack أو esbuild)، الأداة بتعمل minify: بتشيل المسافات والتعليقات وتصغّر أسامي المتغيرات ([[calculateTotal(items)]] تبقى [[calculateTotal(c)]])، عشان الملف يبقى أصغر والموقع أسرع. الناتج غالبًا [[.min.js]] أو [[app-3f9a2c.js]] (الحروف دي hash بيتغير مع كل تعديل عشان الـ cache).

المشكلة: لو حصل غلط في الـ production، رسالة الغلط هتقولك «السطر 1 العمود 4587» في ملف كله سطر واحد. هنا بييجي الـ source map:
• [[.map]] (زي [[app.min.js.map]]): ملف JSON بيربط كل مكان في الملف المتصغّر بمكانه في الملف الأصلي.
• في آخر الملف المتصغّر سطر [[//# sourceMappingURL=app.min.js.map]] بيقول للمتصفح الخريطة فين.
• الـ DevTools ([[F12]]) بتقراه لوحدها وتعرضلك الكود الأصلي وأرقام سطوره، و Sentry وأمثاله بيستخدموه لرسايل الأخطاء.
• جوه الـ [[.map]]: [["version": 3]]، و [["sources"]] (أسامي الملفات الأصلية)، و [["sourcesContent"]] (الكود الأصلي كله أحيانًا!)، و [["mappings"]] (نص مشفّر بيربط الأماكن).

وفيه كمان [[.css.map]] لنفس الغرض في CSS، و [[.min.css]].

وخد بالك من الأمان: لو رفعت الـ [[.map]] على السيرفر العام، أي حد يقدر يشوف كودك الأصلي بالتعليقات. ده مش كارثة (الكود في المتصفح مكشوف أصلًا)، بس لو مش عايز ده، ارفع الـ maps لأداة الأخطاء بس ومتنشرهاش (في Vite: [[build.sourcemap: "hidden"]]).`,
          example: R`npx esbuild app.js --minify --sourcemap --outfile=app.min.js
ls -l app.js app.min.js app.min.js.map
cat app.min.js
jq '.sources, .version' app.min.js.map
node --enable-source-maps app.min.js`,
          try: R`اعمل [[app.js]] فيه دالة [[calculateTotal(items)]] بـ for loop وتعليقات، ونفّذ المثال. بص على شكل [[app.min.js]] وعلى آخر سطر فيه. بعدين حط [[throw new Error("boom")]] جوه الدالة واعمل build تاني، وشغّل [[node app.min.js]] مرة و [[node --enable-source-maps app.min.js]] مرة، وقارن السطر اللي الغلط بيشاور عليه.`,
          deep: {
            why: R`كل byte بيتبعت لكل زائر، فتصغير الملف من 200KB لـ 60KB بيفرق في سرعة الموقع خصوصًا على الموبايل. بس المبرمج محتاج يقرا الأخطاء بالكود اللي كتبه، فالـ source map بيدي الاتنين: ملف صغير للزوار، وخريطة للمبرمج.`,
            how: R`الـ minifier بيحلل الكود لشجرة (AST) ويكتبه تاني بأقل حروف ممكنة، ووهو بيكتب بيسجل «الحرف ده جه من السطر كذا العمود كذا في الملف كذا». التسجيل ده بيتكتب في [["mappings"]] بترميز مضغوط اسمه Base64 VLQ. والمتصفح لما الـ DevTools تبقى مفتوحة بيطلب الـ [[.map]] ويعكس الأماكن.`,
            when: R`كل build للـ production. وفعّل الـ source maps في أي أداة بتتابع الأخطاء (Sentry). ولو بتستخدم مكتبة من CDN، استخدم [[.min.js]] بتاعها.`,
            mistakes: R`تعدّل في ملف [[.min.js]] بإيدك (هيتمسح في الـ build الجاي، ومستحيل يتقري). تعمل commit لفولدر [[dist/]] أو [[build/]] اللي فيه الناتج (حطه في [[.gitignore]]). وتستغرب إن الـ DevTools بتعرض كود مش موجود على السيرفر: ده من [["sourcesContent"]] جوه الـ map.`
          },
          lines: [
            R`[[--minify]] صغّر، و [[--sourcemap]] اعمل الخريطة، و [[--outfile]] اسم الناتج.`,
            R`قارن الأحجام: الأصلي، والمتصغّر، والخريطة.`,
            R`الكود كله في سطر، والأسامي اتصغّرت، وآخره سطر [[sourceMappingURL]].`,
            R`الـ map ملف JSON: [[sources]] بيقول الملفات الأصلية.`,
            R`Node بيستخدم الـ map عشان رسايل الأخطاء تشاور على الملف الأصلي.`
          ],
          sol: R`الناتج الحقيقي على ملف صغير:
[[-rw-rw-r-- 1 you you 193 app.js]]
[[-rw-rw-r-- 1 you you 164 app.min.js]]
[[-rw-rw-r-- 1 you you 493 app.min.js.map]]
[[function calculateTotal(c){let t=0;for(const o of c)t+=o.price*o.qty;return t}console.log(calculateTotal([{price:250,qty:2}]));]]
[[//# sourceMappingURL=app.min.js.map]]
و [[jq]] بيطبع array فيها [["app.js"]] وبعدها [[3]].

في الملف الصغير ده الفرق بسيط، في مكتبة حقيقية الفرق بيبقى ٣ أو ٤ أضعاف. ومع [[throw]]: من غير الخيار الغلط بيشاور على [[at calculateTotal (.../app.min.js:1:76)]] (سطر 1 والعمود 76)، ومع [[--enable-source-maps]] بيشاور على [[at calculateTotal (.../app.js:7:9)]]، يعني الملف الأصلي والسطر اللي كتبت فيه الـ throw.`
        }
      ]
    },
    {
      t: "ملفات لغات البرمجة",
      l: 2,
      n: "كل لغة ليها امتداد، وبعضها بيطلّع ملفات تانية وهو بيشتغل (.pyc و .class و .o و .jar). هنا هتعرف كل ملف بيتشغّل بإيه، وإيه اللي بيتعمله commit وإيه لأ",
      items: [
        {
          cmd: ".py و .pyc",
          title: "ملف .py بيتشغّل إزاي، وإيه __pycache__ و .pyc و .ipynb؟",
          desc: R`[[.py]] ملف كود Python، نص عادي. بيتشغّل بالـ interpreter: [[python3 file.py]] على لينكس والماك، و [[python file.py]] أو [[py file.py]] على ويندوز. التفاصيل في تاب Python.

حاجات في الملف نفسه:
• الـ indentation جزء من اللغة: ٤ مسافات هو العُرف، وخلط Tab ومسافات بيطلّع [[TabError]].
• [[#]] تعليق.
• [[#!/usr/bin/env python3]] أول سطر (shebang): يخلي الملف يتشغّل لوحده بـ [[./file.py]] على لينكس والماك بعد [[chmod +x]] (درس [[.sh]]).
• [[if __name__ == "__main__":]]: الكود اللي تحتها بيتنفذ لما تشغّل الملف مباشرة بس، مش لما ملف تاني يعمله [[import]].
• كل ملف [[.py]] هو module: [[from prices import total]] بيدوّر على [[prices.py]] جنبه.

الملفات اللي Python بيعملها لوحده:
• [[__pycache__/]] وجواه [[.pyc]] (زي [[prices.cpython-312.pyc]]): لما تعمل [[import]] لملف، Python بيحوّله لـ bytecode (تعليمات وسيطة) ويحفظه عشان المرة الجاية يبقى أسرع. ده ملف binary، مبتعدّلوش، وبيتمسح ويتعمل تاني عادي، ومكانه [[.gitignore]].
• [[.venv/]] أو [[venv/]]: البيئة الافتراضية فيها المكتبات المتسطّبة. برضه [[.gitignore]].

أخوات:
• [[.ipynb]]: Jupyter Notebook. ده ملف JSON فيه الخلايا (كود وكلام) والنتايج والصور. بيتفتح في Jupyter أو VS Code أو Google Colab.
• [[.pyi]]: ملف أنواع زي [[.d.ts]] في TypeScript.
• [[.pyw]]: على ويندوز بيتشغّل من غير ما يفتح شباك ترمنال (للبرامج اللي ليها واجهة).
• [[.whl]]: مكتبة Python جاهزة للتسطيب (wheel)، وهو في الحقيقة zip.`,
          example: R`cat main.py
python3 main.py
ls __pycache__
file __pycache__/prices.cpython-312.pyc
chmod +x main.py
./main.py`,
          try: R`اعمل [[prices.py]] فيه دالة [[total(items)]] بترجّع [[sum(i["price"] * i["qty"] for i in items)]]، و [[main.py]] أول سطر فيه [[#!/usr/bin/env python3]] وبعدين [[from prices import total]] و [[if __name__ == "__main__":]] وتحتها [[print(total([{"price": 250, "qty": 2}]))]]. نفّذ المثال (رقم الـ [[cpython-312]] هيختلف على حسب نسخة Python عندك). وبعدين في ملف تاني اكتب دالة سطر فيها Tab وسطر فيه مسافات وشغّله.`,
          deep: {
            why: R`Python لغة interpreted: مفيش خطوة compile تطلّع برنامج منفصل، فالملف نفسه هو اللي بيتنقل ويتشغّل. بس تحليل الكود كل مرة بياخد وقت، فالـ [[.pyc]] حل وسط: Python بيحفظ نتيجة التحليل ويستخدمها طول ما الـ [[.py]] متغيرش.`,
            how: R`لما تعمل [[import prices]]، Python بيشوف [[__pycache__/prices.cpython-312.pyc]]: لو وقت تعديل [[prices.py]] وحجمه زي المسجل في الـ pyc، بيحمّل الـ bytecode علطول. لو لأ بيعمل compile تاني. أما الملف اللي بتشغّله مباشرة ([[main.py]]) فمبيتعملوش pyc. و [[file]] بيقرا رأس الـ pyc ويقولك النسخة ووقت الـ py وحجمه.`,
            when: R`سكربتات أتمتة، و APIs بـ FastAPI و Django، وتحليل داتا، والذكاء الاصطناعي. و [[.ipynb]] للتجارب وتحليل الداتا خطوة خطوة.`,
            mistakes: R`تعمل commit لـ [[__pycache__]] و [[.venv]]. تسمّي ملفك باسم مكتبة ([[json.py]] أو [[random.py]] أو [[requests.py]]) فـ [[import json]] يجيب ملفك انت ويطلعلك أخطاء غريبة. تخلط Tab ومسافات ([[TabError: inconsistent use of tabs and spaces in indentation]]). وتعمل commit لـ notebook فيه نتايج كبيرة وصور: امسح الـ outputs الأول.`
          },
          lines: [
            R`الملف فيه shebang و [[import]] و [[if __name__]].`,
            R`التشغيل العادي بالـ interpreter.`,
            R`الـ [[.pyc]] اتعمل لـ [[prices.py]] بس، لأنه اتعمله import.`,
            R`[[file]] بيقول إنه bytecode ولأنهي نسخة Python.`,
            R`صلاحية تشغيل، عشان الـ shebang يشتغل.`,
            R`بيتشغّل لوحده من غير ما تكتب [[python3]].`
          ],
          sol: R`الناتج الحقيقي (Python 3.12):
[[500]]
[[prices.cpython-312.pyc]]
[[__pycache__/prices.cpython-312.pyc: Byte-compiled Python module for CPython 3.12 or newer, timestamp-based, .py timestamp: ..., .py size: 71 bytes]]
[[500]]

وملف فيه Tab ومسافات بيطلّع:
[[TabError: inconsistent use of tabs and spaces in indentation]]

على ويندوز [[./main.py]] مش هيشتغل كده: استخدم [[py main.py]].`
        },
        {
          cmd: ".java و .class و .jar",
          title: "إيه الفرق بين .java و .class و .jar، وفين .kt و .kts؟",
          desc: R`Java بتمشي على خطوتين:
• [[.java]]: الكود اللي بتكتبه (نص).
• [[javac Hello.java]] بيعمل compile ويطلّع [[Hello.class]]: bytecode (binary) مش لمعالج معيّن، لـ JVM (Java Virtual Machine).
• [[java Hello]] بيشغّل الـ JVM اللي بتقرا الـ [[.class]] وتنفذه على أي نظام. ده معنى «اكتب مرة وشغّل في أي حتة».

قواعد الملف:
• الـ class الـ [[public]] لازم اسمها يبقى نفس اسم الملف بالظبط بالحروف الكبيرة: [[public class Hello]] في [[Hello.java]].
• الـ [[package com.gym.api;]] في أول الملف لازم يطابق مكان الملف في الفولدرات: [[src/main/java/com/gym/api/]].

[[.jar]] (Java ARchive): zip فيه ملفات [[.class]] كتير وملف [[META-INF/MANIFEST.MF]] بيقول أنهي class فيها [[main]]. ده اللي بتسلّمه أو بتشغّله على السيرفر: [[java -jar app.jar]]. و Spring Boot بيطلّع jar واحد فيه كل حاجة (fat jar). و [[.war]] نسخة للسيرفرات القديمة زي Tomcat.

Kotlin على نفس الـ JVM:
• [[.kt]]: كود Kotlin. [[kotlinc]] أو Gradle بيحوّلوه لـ [[.class]] برضه، فـ Java و Kotlin بيشتغلوا مع بعض في نفس المشروع. وده اللغة الأساسية في Android (تاب Kotlin).
• [[.kts]]: Kotlin Script، وأشهر استخدام ليه [[build.gradle.kts]] (ملف إعدادات Gradle مكتوب Kotlin، المستوى ده).

ومن Java 11 تقدر تشغّل ملف واحد من غير javac: [[java Hello.java]].

[[build/]] و [[target/]] و [[out/]] و [[*.class]] مكانهم [[.gitignore]].`,
          example: R`cat Hello.java
javac Hello.java
ls
java Hello
file Hello.class
jar cfe hello.jar Hello Hello.class
java -jar hello.jar
unzip -l hello.jar`,
          try: R`اعمل [[Hello.java]] فيه [[public class Hello { public static void main(String[] args) { System.out.println("Hello من Java"); } }]] ونفّذ المثال (محتاج JDK: [[sudo apt install openjdk-21-jdk]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w eclipse-temurin:21-jdk javac Hello.java]]). بعدين اعمل ملف [[Hello2.java]] فيه [[public class Wrong {}]] وجرّب [[javac Hello2.java]].`,
          deep: {
            why: R`زمان كان لازم تعمل compile لكل نظام لوحده (ويندوز ولينكس وماك). Java حلت ده بالـ JVM: البرنامج بيتحول مرة واحدة لـ bytecode، وكل نظام عليه JVM بيشغّله. ونفس الفكرة خلّت Kotlin و Scala يقدروا يستخدموا كل مكتبات Java.`,
            how: R`[[javac]] بيفحص الأنواع ويكتب ملف [[.class]] لكل class. الملف بيبدأ بالـ bytes [[CA FE BA BE]] (اسمها cafe babe، بصمة Java)، وبعدها رقم النسخة (65 يعني Java 21). الـ JVM بتقرا الـ bytecode وتحوّل الأجزاء اللي بتتكرر لكود المعالج الحقيقي وهي شغالة (JIT). والـ [[.jar]] مجرد zip، فـ [[unzip]] بيفتحه.`,
            when: R`Spring Boot و Android وأنظمة الشركات الكبيرة. وعمليًا مش هتكتب [[javac]] بإيدك كتير: Maven أو Gradle بيعملوا كل ده ([[mvn package]] أو [[./gradlew build]]).`,
            mistakes: R`اسم الملف مش زي اسم الـ class ([[class Wrong is public, should be declared in a file named Wrong.java]]). تشغّل [[java Hello.class]] بالامتداد بدل [[java Hello]]. تشغّل jar اتعمل بـ Java 21 على Java 17 فيطلعلك [[UnsupportedClassVersionError]]. وتعمل commit لـ [[.class]] أو [[target/]].`
          },
          lines: [
            R`الكود: class اسمها [[Hello]] في ملف [[Hello.java]].`,
            R`compile: بيطلّع [[Hello.class]].`,
            R`هتلاقي [[Hello.class]] جنب الـ [[.java]].`,
            R`بيشغّل الـ class (من غير [[.class]] في الآخر).`,
            R`[[file]] بيعرف إنه Java bytecode ونسخته.`,
            R`بيعمل jar: [[c]] create و [[f]] اسم الملف و [[e]] الـ class اللي فيها main.`,
            R`بيشغّل الـ jar كله.`,
            R`الـ jar zip: ده اللي جواه.`
          ],
          sol: R`الناتج الحقيقي (JDK 21):
[[Hello.class  Hello.java]]
[[Hello من Java]]
[[Hello.class: compiled Java class data, version 65.0]]
[[Hello من Java]]
و [[unzip -l]] بيعرض [[META-INF/]] و [[META-INF/MANIFEST.MF]] و [[Hello.class]].

و [[javac Hello2.java]]:
[[Hello2.java:1: error: class Wrong is public, should be declared in a file named Wrong.java]]

و [[xxd -l 8 Hello.class]] بيطبع [[cafe babe 0000 0041]]: البصمة، و [[0x41]] = 65 = Java 21.`
        },
        {
          cmd: ".c و .h و .cpp و .o",
          title: "إيه .c و .h و .cpp و .hpp و .o، وإزاي بيبقوا برنامج؟",
          desc: R`C و C++ بيتحولوا لبرنامج بيشتغل على المعالج مباشرة (native)، من غير interpreter ولا JVM. الملفات:

• [[.c]]: كود C. و [[.cpp]] (أو [[.cc]] أو [[.cxx]]): كود C++.
• [[.h]] (header): فيه «التعريفات» بس: أسامي الدوال وأنواعها من غير جسمها، عشان الملفات التانية تعرف إن الدالة موجودة. و [[.hpp]] نفس الفكرة لـ C++.
• [[#include "calc.h"]]: بيلزق محتوى الـ header مكانه حرفيًا. [[" "]] للملفات بتاعتك، و [[< >]] لملفات النظام زي [[<stdio.h>]].
• [[#ifndef CALC_H]] و [[#define]] و [[#endif]] (include guard): عشان الـ header ميتلزقش مرتين.

البناء (build) بيمشي على مرحلتين:
• compile: كل [[.c]] لوحده يتحول لـ [[.o]] (object file، على ويندوز [[.obj]]): كود معالج بس لسه ناقص، لأن [[main.o]] بينادي [[add]] اللي في ملف تاني.
• link: الـ linker بيجمّع كل الـ [[.o]] مع المكتبات ويطلّع البرنامج: ملف من غير امتداد على لينكس والماك، و [[.exe]] على ويندوز.

مكتبات: [[.a]] (static، بتتلزق جوه البرنامج) و [[.so]] (shared على لينكس)، و [[.lib]] و [[.dll]] على ويندوز، و [[.dylib]] على الماك (المستوى ٣).

وملفات البناء: [[Makefile]] (المستوى ده) و [[CMakeLists.txt]] (CMake، الأشهر في C++). والناتج ([[*.o]] و [[build/]] والبرنامج) مكانه [[.gitignore]].`,
          example: R`cat calc.h
gcc -c calc.c
gcc -c main.c
gcc main.o calc.o -o app
./app
file calc.o app
gcc main.c -o app2`,
          try: R`اعمل الـ ٣ ملفات: [[calc.h]] فيه include guard و [[int add(int a, int b);]]، و [[calc.c]] فيه [[#include "calc.h"]] وجسم الدالة، و [[main.c]] فيه [[#include <stdio.h>]] و [[#include "calc.h"]] و [[main]] بتطبع [[add(2, 3)]]. نفّذ المثال (محتاج [[sudo apt install build-essential]]، أو Docker: [[docker run --rm -v "$PWD":/w -w /w gcc:14 sh -c 'gcc -c calc.c && gcc -c main.c && gcc main.o calc.o -o app && ./app']]). آخر سطر في المثال هيفشل، اقرا الغلط.`,
          deep: {
            why: R`تقسيم البناء لمرحلتين بيوفّر وقت: في مشروع فيه ١٠٠٠ ملف، لو عدّلت ملف واحد، بتعمل compile ليه هو بس وتعيد الـ link، بدل ما تعيد كل حاجة. والـ header هو «العقد» اللي بيخلي الملفات تعرف بعض من غير ما تشوف الكود.`,
            how: R`أول حاجة الـ preprocessor بينفذ أي سطر بيبدأ بـ [[#]] (يلزق الـ includes ويشيل اللي جوه [[#ifndef]] لو اتعرّف). بعدين الـ compiler يحوّل الناتج لـ assembly ثم [[.o]]، والـ [[.o]] فيه «أنا محتاج دالة اسمها add». الـ linker بيدوّر على [[add]] في باقي الـ [[.o]] والمكتبات، ولو ملقاهاش بيقول [[undefined reference]].`,
            when: R`برامج الأداء العالي، والألعاب، والأنظمة المدمجة، و Qt، ومكتبات Python و Node السريعة (اللي بتتبني لما تعمل install). التفاصيل في تاب C و C++.`,
            mistakes: R`تنسى تضيف [[calc.c]] في أمر البناء ([[undefined reference to 'add']]). تحط جسم دالة في [[.h]] وتعمله include في ملفين ([[multiple definition]]). تنسى الـ include guard. وتعمل commit للـ [[.o]] والبرنامج.`
          },
          lines: [
            R`الـ header: تعريف الدالة بس من غير جسمها، وحواليه include guard.`,
            R`[[-c]] compile بس من غير link: بيطلّع [[calc.o]].`,
            R`نفس الكلام لـ [[main.c]]: [[main.o]].`,
            R`link: بيجمّع الاتنين في برنامج اسمه [[app]] ([[-o]] اسم الناتج).`,
            R`تشغيل البرنامج.`,
            R`[[.o]] اسمه relocatable (ناقص)، و [[app]] executable.`,
            R`من غير [[calc.c]]: الـ compile ينجح والـ link يفشل.`
          ],
          sol: R`الناتج الحقيقي (gcc 14):
[[5]]
[[calc.o: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped]]
[[app:    ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, ...]]
وآخر أمر:
[[main.c:(.text+0xf): undefined reference to $__btadd']]
[[collect2: error: ld returned 1 exit status]]
لاحظ إن الغلط من [[ld]] (الـ linker)، مش من الـ compiler: الكود سليم بس ناقصه ملف.`
        },
        {
          cmd: ".go و go.mod",
          title: "مشروع Go فيه إيه: .go و go.mod و go.sum؟",
          desc: R`Go بيتحول لبرنامج native زي C، بس الأداة [[go]] بتعمل كل حاجة: compile و link وتنزيل المكتبات والـ format والاختبارات. التفاصيل في تاب Go.

الملفات:
• [[.go]]: كود Go. أول سطر لازم [[package name]]، والبرنامج بيبدأ من [[package main]] و [[func main()]]. وكل ملفات الفولدر الواحد لازم تبقى نفس الـ package.
• [[_test.go]]: أي ملف اسمه بيخلص كده ملف اختبارات، [[go test]] بيشغّله والـ build العادي بيتجاهله.
• [[go.mod]]: بيعرّف المشروع (module): اسمه ونسخة Go والمكتبات المطلوبة ونسخها. بيتعمل بـ [[go mod init example.com/gym]]. الصيغة سطور بسيطة:
  [[module example.com/gym]]: اسم المشروع (غالبًا رابط الـ repo).
  [[go 1.25]]: أقل نسخة Go.
  [[require github.com/google/uuid v1.6.0]]: مكتبة ونسختها، و [[// indirect]] يعني مش انت اللي بتستخدمها مباشرة.
• [[go.sum]]: lock file: لكل مكتبة hash بيضمن إن الكود اللي هيتنزل هو هو بالظبط (درس lock files). بيتعمله commit، ومبتعدّلوش بإيدك.

الأوامر: [[go run .]] (يبني ويشغّل)، و [[go build -o app .]] (يطلّع برنامج واحد مفيهوش أي اعتماد على حاجة، تنقله على السيرفر وخلاص)، و [[go get pkg@version]] (يضيف مكتبة ويعدّل go.mod و go.sum)، و [[go mod tidy]] (يشيل اللي مش مستخدم ويضيف الناقص).`,
          example: R`go mod init example.com/gym
cat go.mod
go run .
go build -o gym .
file gym
go get github.com/google/uuid@v1.6.0
cat go.sum`,
          try: R`في فولدر فاضي نفّذ أول سطرين، وبعدين اعمل [[main.go]] فيه [[package main]] و [[import "fmt"]] و [[func main() { fmt.Println("Hello من Go") }]] وكمّل المثال. (محتاج Go، أو Docker: [[docker run --rm -v "$PWD":/w -w /w golang:1.25 go run .]].) بعد [[go get]] افتح [[go.mod]] تاني وشوف إيه اللي اتضاف.`,
          deep: {
            why: R`Go اتعمل في Google عشان مشاريع كبيرة تتبني بسرعة وتتنقل بسهولة. عشان كده البرنامج الناتج ملف واحد static ملوش أي اعتماد (حتى مش محتاج Go على السيرفر)، و [[go.mod]] بيحدد المكتبات بالظبط من غير أداة تانية زي npm.`,
            how: R`[[go build]] بيقرا [[go.mod]]، وينزّل المكتبات (لو مش موجودة) في cache على جهازك، ويتأكد من الـ hash في [[go.sum]]، ويعمل compile لكل الـ packages ويعملهم link في ملف واحد. والـ cache بيخلي المرة التانية سريعة جدًا.`,
            when: R`APIs وأدوات command line وأي حاجة في عالم الـ cloud (Docker و Kubernetes نفسهم مكتوبين Go).`,
            mistakes: R`تنسى [[go mod init]] فيطلعلك [[go: cannot find main module]]. تعدّل [[go.sum]] بإيدك أو متعملهوش commit. تحط ملفين في نفس الفولدر بـ package مختلفة ([[found packages main and utils]]). وتعمل commit للبرنامج الناتج.`
          },
          lines: [
            R`بيعمل [[go.mod]] باسم المشروع.`,
            R`فيه [[module]] و [[go]] ونسخة.`,
            R`يبني ويشغّل الـ package اللي في الفولدر الحالي.`,
            R`يبني برنامج اسمه [[gym]].`,
            R`برنامج لينكس static: ملوش أي اعتماد.`,
            R`يضيف مكتبة بنسخة محددة.`,
            R`الـ hashes اللي بتضمن الكود.`
          ],
          sol: R`الناتج الحقيقي (Go 1.25):
[[go: creating new go.mod: module example.com/gym]]
[[module example.com/gym]]
[[go 1.25.x]] (رقم نسختك)
[[Hello من Go]]
[[gym: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, ...]]
[[go: added github.com/google/uuid v1.6.0]]
و [[go.sum]] فيه سطرين:
[[github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=]]
[[github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=]]
و [[go.mod]] اتضاف فيه [[require github.com/google/uuid v1.6.0 // indirect]] (indirect لأن الكود لسه مش بيعمله import، و [[go mod tidy]] هيشيله).`
        },
        {
          cmd: ".php",
          title: "ملف .php فيه إيه، وإزاي PHP و HTML بيبقوا في نفس الملف؟",
          desc: R`[[.php]] ملف بيتنفذ على السيرفر قبل ما يتبعت للمتصفح. والميزة الغريبة فيه: الملف أساسًا HTML، وأي حاجة بين [[<?php]] و [[?>]] كود PHP بيتنفذ ويتحط ناتجه مكانه. المتصفح عمره ما بيشوف كود PHP، بيشوف الناتج بس. التفاصيل في تاب PHP و MySQL.

الرموز:
• [[<?php ... ?>]]: بلوك كود.
• [[<?= $x ?>]]: اختصار لـ [[<?php echo $x; ?>]]، يطبع قيمة جوه الـ HTML.
• [[$]] قبل أي متغير: [[$name]].
• [[;]] في آخر كل جملة، إجباري.
• [[//]] و [[#]] و [[/* */]] تعليقات.
• [[foreach (...):]] و [[endforeach;]]: شكل تاني للـ loops بيتقري أحسن جوه HTML.
• [[htmlspecialchars($x)]]: بيهرّب [[<]] و [[&]] وغيرهم قبل ما تطبع حاجة جاية من اليوزر (وإلا XSS، تاب الأمان).

قاعدة مهمة: الملف اللي كله PHP (من غير HTML)، زي الـ classes والـ config، متقفلوش بـ [[?>]] في الآخر. أي مسافة أو سطر بعد [[?>]] بيتبعت للمتصفح وبيعمل [[headers already sent]]. ونفس المشكلة لو الملف فيه BOM.

بيتشغّل إزاي: [[php file.php]] من الترمنال (يطبع الناتج)، أو [[php -S localhost:8000]] سيرفر للتطوير، أو على السيرفر الحقيقي Nginx أو Apache بيبعتوا الملف لـ PHP-FPM. ولو فتحت [[.php]] بدبل كليك أو السيرفر مش متظبط، هتشوف الكود نفسه أو المتصفح هينزّله كملف، وده تسريب للكود.

وأخوات: [[composer.json]] و [[composer.lock]] (زي package.json)، و [[.blade.php]] (قوالب Laravel)، و [[php.ini]] (درس INI).`,
          example: R`<?php
$name = $_GET["name"] ?? "زائر";
$items = ["تيشيرت" => 250, "مج" => 120];
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<body>
  <h1>أهلًا يا <?= htmlspecialchars($name) ?></h1>
  <ul>
    <?php foreach ($items as $item => $price): ?>
      <li><?= $item ?>: <?= $price ?> جنيه</li>
    <?php endforeach; ?>
  </ul>
</body>
</html>`,
          flag: "script",
          try: R`احفظ المثال في [[index.php]] ونفّذ [[php -l index.php]] (فحص) و [[php index.php]] (الناتج). وبعدين [[php -S localhost:8000]] وافتح [[http://localhost:8000/?name=سارة]] واعمل [[Ctrl+U]] تشوف اللي وصل المتصفح. (Docker: [[docker run --rm -v "$PWD":/w -w /w php:8.3-cli php index.php]].) وجرّب [[?name=<b>hi</b>]] مع وبدون [[htmlspecialchars]].`,
          deep: {
            why: R`PHP اتعمل أصلًا كطريقة تحط حتت ديناميكية جوه صفحات HTML. عشان كده الملف بيبدأ «HTML» وانت بتفتح فيه نوافذ كود. ده خلّى PHP أسهل لغة تعمل بيها موقع ديناميكي، وأغلب الويب (WordPress) لسه عليه.`,
            how: R`السيرفر لما يتطلب منه [[.php]] مش بيبعته، بيدّيه لـ PHP. PHP بيقرا الملف: أي حاجة بره [[<?php ?>]] بتتطبع زي ما هي، واللي جواه بيتنفذ. والناتج النهائي (HTML عادي) هو اللي بيتبعت. عشان كده [[Ctrl+U]] مبيوريكش أي [[<?php]].`,
            when: R`مواقع WordPress و Laravel وأي استضافة مشتركة (shared hosting) لأنها كلها بتدعم PHP جاهز.`,
            mistakes: R`تنسى [[;]] فيطلعلك [[Parse error: syntax error, unexpected end of file]]. تقفل ملف الـ class بـ [[?>]] وبعده سطر فاضي. تطبع داتا اليوزر من غير [[htmlspecialchars]]. وتحط [[.php]] على سيرفر مش متظبط فالكود (بالباسوردات اللي فيه) يتنزّل.`
          },
          lines: [
            R`بداية بلوك PHP.`,
            R`[[$_GET["name"]]] من الرابط، و [[??]] قيمة افتراضية لو مش موجود.`,
            R`array بمفاتيح: [[=>]] بين المفتاح والقيمة.`,
            R`قفل البلوك، واللي بعده HTML بيتبعت زي ما هو.`,
            R`HTML عادي.`,
            R`HTML عادي.`,
            R`HTML عادي.`,
            R`[[<?=]] يطبع القيمة، بعد ما [[htmlspecialchars]] يهرّبها.`,
            R`HTML.`,
            R`[[foreach]] بالشكل اللي بينتهي بـ [[:]]، وكل اللي لحد [[endforeach]] بيتكرر.`,
            R`عنصر بيتكرر لكل منتج، وفيه قيمتين.`,
            R`نهاية الـ loop.`,
            R`HTML.`,
            R`HTML.`,
            R`HTML.`
          ],
          sol: R`[[php -l index.php]] ← [[No syntax errors detected in index.php]]
[[php index.php]] بيطبع HTML عادي فيه [[<h1>أهلًا يا زائر</h1>]] و [[<li>تيشيرت: 250 جنيه</li>]] و [[<li>مج: 120 جنيه</li>]]، ومفيش ولا [[<?php]].

مع [[?name=سارة]] العنوان بيبقى «أهلًا يا سارة». ومع [[?name=<b>hi</b>]] و [[htmlspecialchars]] بيظهر النص [[<b>hi</b>]] زي ما هو، ومن غيرها بيظهر hi بخط عريض: يعني اليوزر قدر يحط HTML في صفحتك (وبنفس الطريقة يحط [[<script>]]).

وملف فيه [[echo "hi"]] من غير [[;]]: [[Parse error: syntax error, unexpected end of file, expecting "," or ";" in bad.php on line 3]].`
        },
        {
          cmd: ".swift و .dart و .rs و .rb",
          title: "إيه ملفات .swift و .dart و .rs و .rb و .cs، وبتتشغّل بإيه؟",
          desc: R`لغات تانية هتقابلها، كل واحدة بملفها وأداتها:

• [[.swift]]: Swift، لغة تطبيقات iOS والماك. [[swift file.swift]] بيشغّل ملف لوحده، والمشاريع الحقيقية في Xcode ([[.xcodeproj]] و [[.xcworkspace]]، وهي فولدرات مش ملفات) أو Swift Package Manager ([[Package.swift]]). تاب Swift و iOS.
• [[.dart]]: Dart، لغة Flutter. [[dart run file.dart]] أو [[flutter run]]، والمشروع معرّف في [[pubspec.yaml]] (YAML) و [[pubspec.lock]]. تاب Flutter و Dart.
• [[.rs]]: Rust. المشروع بيتعمل بـ [[cargo new app]] وبيتعرّف في [[Cargo.toml]] (TOML) و [[Cargo.lock]]، و [[cargo run]] بيبني ويشغّل، والناتج في [[target/]].
• [[.rb]]: Ruby (و Rails). [[ruby file.rb]]، والمكتبات في [[Gemfile]] و [[Gemfile.lock]]، و [[.erb]] قوالب HTML فيها Ruby زي PHP.
• [[.cs]]: C#، والمشروع في [[.csproj]] (درس [[.csproj]] تحت).
• [[.kt]]: Kotlin (درس [[.java]]).
• [[.lua]] (إعدادات Neovim والألعاب)، و [[.r]] (إحصاء)، و [[.scala]]، و [[.ex]] و [[.exs]] (Elixir).

الفكرة اللي بتتكرر في كل لغة، ولو فهمتها هتعرف أي لغة جديدة بسرعة:
• ملف الكود نفسه (نص).
• ملف بيعرّف المشروع والمكتبات: [[package.json]] و [[pyproject.toml]] و [[go.mod]] و [[Cargo.toml]] و [[pubspec.yaml]] و [[Gemfile]] و [[pom.xml]] و [[.csproj]].
• lock file بالنسخ المضبوطة: بيتعمله commit.
• فولدر ناتج أو مكتبات: [[node_modules/]] و [[target/]] و [[build/]] و [[.dart_tool/]] و [[bin/]] و [[obj/]]: في [[.gitignore]].`,
          example: R`swift hello.swift
dart run hello.dart
cargo new app && cd app && cargo run
ruby hello.rb`,
          try: R`اختار لغة منهم واعمل [[hello]] بيها وشغّله (لو مش متسطّبة، Docker: [[docker run --rm -v "$PWD":/w -w /w swift:6.0 swift hello.swift]] و [[docker run --rm -v "$PWD":/w -w /w dart:stable dart run hello.dart]]). ولو عندك مشروع Flutter أو Rust افتح الفولدر وطلّع فيه الأربع حاجات: ملف الكود، وملف المشروع، والـ lock، وفولدر الناتج.`,
          deep: {
            why: R`كل لغة ليها نظام بناء ومكتبات خاص بيها، بس كلهم وصلوا لنفس الحل: ملف بيوصف المشروع، و lock file، وأداة واحدة بتعمل كل حاجة (cargo و dart و swift و go و npm).`,
            how: R`[[swift file.swift]] و [[dart run]] بيعملوا compile في الذاكرة ويشغّلوا (زي [[go run]]). [[cargo]] بيقرا [[Cargo.toml]] وينزّل المكتبات من crates.io ويبني في [[target/debug/]]. و Ruby زي Python: interpreter بيقرا الملف ويشغّله.`,
            when: R`Swift لـ iOS، و Dart لـ Flutter، و Rust للأدوات السريعة والأنظمة (وأدوات JS كتير زي SWC و Turbopack مكتوبة Rust)، و Ruby لو بتشتغل في مشروع Rails.`,
            mistakes: R`تعمل commit لـ [[target/]] أو [[.dart_tool/]] أو [[build/]]. تنسى الـ lock file. وتفتح [[.xcodeproj]] كأنه ملف: هو فولدر جواه [[project.pbxproj]] (نص)، وده أكتر ملف بيعمل conflicts في Git في مشاريع iOS.`
          },
          lines: [
            R`Swift: يبني ويشغّل ملف واحد.`,
            R`Dart: نفس الكلام.`,
            R`Rust: [[cargo new]] بيعمل مشروع فيه [[Cargo.toml]] و [[src/main.rs]]، و [[cargo run]] يبني ويشغّل.`,
            R`Ruby: interpreter زي Python.`
          ],
          sol: R`[[swift hello.swift]] (الملف فيه [[print("Hello من Swift")]]) بيطبع [[Hello من Swift]]، و [[dart run hello.dart]] (فيه [[void main() { print("Hello من Dart"); }]]) بيطبع [[Hello من Dart]]. و [[cargo run]] في مشروع جديد بيطبع سطور [[Compiling app v0.1.0]] و [[Running $__bttarget/debug/app$__bt]] وبعدين [[Hello, world!]].

وفي مشروع Flutter: الكود [[lib/main.dart]]، والمشروع [[pubspec.yaml]]، والـ lock [[pubspec.lock]]، والناتج [[build/]] و [[.dart_tool/]].`
        },
        {
          cmd: ".sql",
          title: "ملف .sql جواه إيه، وبتشغّله على قاعدة البيانات إزاي؟",
          desc: R`[[.sql]] ملف نصي فيه أوامر SQL ورا بعض، كل أمر بيخلص بـ [[;]]. مش برنامج بيتشغّل لوحده: بتدّيه لقاعدة البيانات وهي تنفذه أمر أمر. التفاصيل في تاب SQL و Prisma و PostgreSQL.

هتقابله في ٣ أشكال:
• migration: ملف بيغيّر شكل القاعدة (يعمل جدول أو يضيف عمود)، وغالبًا اسمه فيه رقم أو تاريخ عشان الترتيب: [[001_create_members.sql]] أو [[migrations/20261001_add_phone/migration.sql]] (Prisma). كل الـ migrations بالترتيب بتبني القاعدة من الصفر.
• seed: داتا أولية للتجربة ([[seed.sql]]).
• dump أو backup: ملف بيطلّعه [[pg_dump]] أو [[mysqldump]]، فيه القاعدة كلها كأوامر ([[CREATE TABLE]] و [[INSERT]] أو [[COPY]]). ممكن يبقى حجمه جيجات، ومكانه مش Git.

الرموز:
• [[;]] نهاية كل أمر.
• [[--]] تعليق لحد آخر السطر، و [[/* */]] تعليق بلوك.
• [[' ']] حوالين النصوص، و [[']] جوه النص بتتكتب مرتين: [['O''Brien']].
• [[" "]] في PostgreSQL للأسامي (جداول وأعمدة) مش للنصوص.

بتشغّله إزاي:
• PostgreSQL: [[psql -U user -d db -f file.sql]]، أو [[psql ... < file.sql]].
• MySQL: [[mysql -u user -p db < file.sql]].
• SQLite: [[sqlite3 app.db < file.sql]].
• أو من برامج زي DBeaver و pgAdmin و TablePlus.

مهم: كل قاعدة ليها لهجة (dialect): [[SERIAL]] في PostgreSQL، و [[AUTO_INCREMENT]] في MySQL، و [[AUTOINCREMENT]] في SQLite. فملف [[.sql]] مكتوب لقاعدة غالبًا مش هيشتغل على التانية من غير تعديل.`,
          example: R`-- جدول الأعضاء
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  joined_at DATE DEFAULT CURRENT_DATE
);
INSERT INTO members (name, email) VALUES
  ('سارة', 'sara@example.com'),
  ('O''Brien', 'ob@example.com');
SELECT name, email FROM members ORDER BY id;`,
          flag: "script",
          try: R`احفظ المثال في [[001_create_members.sql]] وشغّله على PostgreSQL في Docker:
[[docker run -d --name pg -e POSTGRES_PASSWORD=pw -v "$PWD":/w postgres:17]]
استنى ثواني وبعدين [[docker exec pg psql -U postgres -v ON_ERROR_STOP=1 -f /w/001_create_members.sql]]. شغّله مرة تانية واقرا الغلط. وبعدين اعمل dump: [[docker exec pg pg_dump -U postgres --table=members --inserts > backup.sql]] وافتح [[backup.sql]]. ولما تخلص: [[docker rm -f pg]].`,
          deep: {
            why: R`تغييرات القاعدة لازم تبقى متسجلة ومتكررة: لو عملت جدول بإيدك في pgAdmin، مفيش حد في التيم ولا السيرفر هيعرف. ملف [[.sql]] في Git (أو migration من Prisma أو Django) بيخلي أي حد يبني نفس القاعدة بالظبط.`,
            how: R`[[psql -f]] بيقرا الملف ويبعت كل أمر لحد [[;]] للسيرفر وينفذه ويطبع النتيجة ([[CREATE TABLE]] و [[INSERT 0 2]]). و [[ON_ERROR_STOP=1]] بيخليه يوقف عند أول غلط بدل ما يكمّل الباقي على قاعدة نصها اتغيّر. والـ dump هو العكس: [[pg_dump]] بيقرا القاعدة ويكتب الأوامر اللي تبنيها تاني.`,
            when: R`migrations و seeds في أي مشروع فيه قاعدة بيانات، و backup قبل أي تغيير كبير على الـ production، ونقل داتا بين سيرفرين.`,
            mistakes: R`تشغّل migration مرتين فيطلعلك [[relation "members" already exists]] (أدوات الـ migrations بتسجل اللي اتنفذ عشان كده). تنسى [[;]] فأمرين يتلزقوا. تحط باسورد أو داتا حقيقية للعملاء في [[seed.sql]] في Git. وترفع dump حجمه جيجا على GitHub (فيه داتا العملاء كمان).`
          },
          lines: [
            R`تعليق [[--]] (بيتحسب سطر هنا لأنه SQL): بيتجاهل لحد آخر السطر.`,
            R`بداية أمر عمل جدول.`,
            R`[[SERIAL]] رقم بيزيد لوحده (لهجة PostgreSQL)، و [[PRIMARY KEY]] المفتاح.`,
            R`[[NOT NULL]]: إجباري.`,
            R`[[UNIQUE]]: ممنوع يتكرر.`,
            R`قيمة افتراضية: تاريخ النهارده.`,
            R`[[;]] نهاية الأمر الأول.`,
            R`أمر إضافة صفوف.`,
            R`النصوص بين [[' ']].`,
            R`[['']] جوه النص يعني [[']] واحدة، و [[;]] نهاية الأمر.`,
            R`استعلام يطبع اللي اتضاف.`
          ],
          sol: R`أول تشغيل:
[[CREATE TABLE]]
[[INSERT 0 2]]
وبعدين جدول فيه [[سارة | sara@example.com]] و [[O'Brien | ob@example.com]] و [[(2 rows)]].

تاني تشغيل (مع [[ON_ERROR_STOP=1]]):
[[psql:/w/001_create_members.sql:7: ERROR:  relation "members" already exists]]
ومبيكملش.

[[backup.sql]] فيه سطور [[SET ...]] في الأول، وبعدين [[CREATE TABLE public.members (...)]] و [[CREATE SEQUENCE]]، وبعدين [[INSERT INTO public.members VALUES (1, 'سارة', ...)]]. ولما تنقله لقاعدة فاضية وتشغّله بـ [[psql -f]] الجدول يرجع بالداتا.`
        }
      ]
    },
    {
      t: "ملفات السكربتات: .sh و .ps1 و .bat",
      l: 2,
      n: "ملفات فيها أوامر ترمنال ورا بعض: مين بيشغّلها، والـ shebang و chmod +x، و Execution Policy في ويندوز، وإيه اللي بيحصل لما تدوس عليها دبل كليك",
      items: [
        {
          cmd: ".sh و .bash و .zsh",
          title: "ملف .sh بيتشغّل إزاي، وإيه #! و chmod +x؟",
          desc: R`[[.sh]] ملف نصي فيه أوامر shell ورا بعض، بالظبط زي ما بتكتبها في الترمنال. بيستخدم لأتمتة أي حاجة بتكررها: deploy و backup وتجهيز سيرفر. التفاصيل في تاب bash.

الامتدادات: [[.sh]] الأشهر (معناها «سكربت shell» عمومًا)، و [[.bash]] أو [[.zsh]] لو السكربت بيستخدم حاجات خاصة بالشيل ده. بس الحقيقة إن الامتداد مش هو اللي بيحدد مين يشغّله، اللي بيحدد هو أول سطر.

أول سطر (shebang): [[#!/usr/bin/env bash]]
• [[#!]] لازم يبقوا أول حرفين في الملف خالص (ولا مسافة ولا BOM قبلهم).
• بعدهم مسار البرنامج اللي هيشغّل الملف. [[/usr/bin/env bash]] معناها «دوّر على bash في الـ PATH»، وده أأمن من [[#!/bin/bash]] لأن bash مش في نفس المكان على كل الأنظمة (الماك مثلًا).
• [[#!/bin/sh]] معناها shell بسيط (على أوبونتو ده dash مش bash)، فحاجات bash زي [[[[ ]]]] والـ arrays مش هتشتغل.
• نفس الفكرة لأي لغة: [[#!/usr/bin/env python3]] و [[#!/usr/bin/env node]].

صلاحية التشغيل: الملف الجديد مبيتشغّلش بـ [[./deploy.sh]] غير لما تديله [[x]]: [[chmod +x deploy.sh]]. ومن غير صلاحية تقدر تشغّله بـ [[bash deploy.sh]] (هنا انت اللي اخترت البرنامج، فالـ shebang بيتجاهل).

ليه [[./]]؟ لأن الفولدر الحالي مش في الـ PATH لأسباب أمان، فلازم تقول المسار صراحة.

على ويندوز: [[.sh]] مبيشتغلش في PowerShell ولا CMD. شغّله في Git Bash أو WSL. والدبل كليك عليه بيفتحه في المحرر أو Git Bash على حسب الإعدادات. وأخطر حاجة: لو اتكتب على ويندوز ممكن يتحفظ CRLF فيقع على لينكس (درس LF و CRLF)، و Git ممكن يضيّع صلاحية [[x]] (الحل: [[git update-index --chmod=+x deploy.sh]]).`,
          example: R`#!/usr/bin/env bash
# بيعمل نسخة احتياطية من فولدر
set -euo pipefail
SRC="$__{1:-.}"
DEST="backup-$(date +%F).tar.gz"
echo "بعمل backup لـ $SRC"
tar -czf "$DEST" "$SRC"
echo "تم: $DEST ($(du -h "$DEST" | cut -f1))"`,
          flag: "script",
          try: R`احفظ المثال في [[deploy.sh]] في [[lab/files]] واعمل فولدر [[data]] فيه أي ملف. جرّب بالترتيب: [[./deploy.sh data]] (هيرفض)، و [[bash deploy.sh data]]، و [[chmod +x deploy.sh]] وبعدين [[./deploy.sh data]]، و [[ls -l deploy.sh]]. وبعدين جرّب [[./deploy.sh مش-موجود]] وشوف [[set -e]] عمل إيه.`,
          deep: {
            why: R`أي حاجة بتكتبها في الترمنال أكتر من مرتين تستاهل تبقى سكربت: بتتنفذ كل مرة بنفس الطريقة، ومتنساش خطوة، وتقدر تديها لحد تاني أو للـ CI. والـ shebang بيخلي السكربت يتشغّل زي أي برنامج من غير ما اليوزر يعرف مكتوب بإيه.`,
            how: R`لما تكتب [[./deploy.sh]]، الـ kernel بيقرا أول bytes في الملف: لو [[#!]] بياخد باقي السطر كبرنامج ويشغّله ويديله اسم الملف، يعني بينفذ فعليًا [[/usr/bin/env bash ./deploy.sh data]]. وقبلها بيشيك على صلاحية [[x]]، ومن غيرها [[Permission denied]]. و [[set -euo pipefail]]: [[-e]] وقّف عند أول أمر يفشل، و [[-u]] متغير مش معرّف يبقى غلط، و [[pipefail]] لو أي أمر في pipe فشل الكل فشل.`,
            when: R`أتمتة على لينكس والماك والسيرفرات: deploy و backup و setup، والسكربتات في [[package.json]] لما تكبر، وخطوات الـ CI، و [[entrypoint.sh]] في Docker.`,
            mistakes: R`سكربت بـ CRLF ([[cannot execute: required file not found]] أو [[bad interpreter]]). تنسى [[chmod +x]] ([[Permission denied]]). تكتب [[#!/bin/sh]] وتستخدم حاجات bash. متحطش التنصيص حوالين المتغيرات ([[tar -czf $DEST $SRC]]) فأول اسم فيه مسافة يبوّظ كل حاجة. وتحط باسوردات جوه السكربت وتعمله commit.`
          },
          lines: [
            R`[[set -euo pipefail]]: وقّف عند أول غلط، ومتسامحش في متغير مش معرّف.`,
            R`[[$1]] أول argument، و [[:-.]] قيمة افتراضية [[.]] لو مفيش.`,
            R`[[$(...)]] بينفذ أمر ويحط ناتجه: [[date +%F]] بيطلّع [[2026-10-01]].`,
            R`[[echo]] يطبع، والمتغير جوه [["..."]] بيتبدّل.`,
            R`[[tar]] بيعمل أرشيف مضغوط (المستوى ٣).`,
            R`[[du -h]] حجم الملف، و [[cut -f1]] بياخد الرقم بس.`
          ],
          sol: R`الناتج الحقيقي:
[[./deploy.sh data]] ← [[bash: ./deploy.sh: Permission denied]]
[[bash deploy.sh data]] ← بيشتغل:
[[بعمل backup لـ data]]
[[تم: backup-2026-10-01.tar.gz (4.0K)]]
بعد [[chmod +x]]: [[./deploy.sh data]] بيشتغل بنفس الناتج، و [[ls -l]] بيعرض [[-rwxrwxr-x]] (الـ [[x]] ظهرت).

و [[./deploy.sh مش-موجود]]: [[tar]] بيقول [[Cannot stat: No such file or directory]] و [[set -e]] بيوقف السكربت فمبيطبعش «تم». من غير [[set -e]] كان هيكمّل ويقولك «تم» على أرشيف بايظ.

([[file deploy.sh]] بيقول [[Bourne-Again shell script, Unicode text, UTF-8 text executable]]: عرفه bash من الـ shebang.)`
        },
        {
          cmd: ".ps1 و .psm1",
          title: "ملف .ps1 بيتشغّل إزاي، وليه ويندوز بيقول running scripts is disabled؟",
          desc: R`[[.ps1]] سكربت PowerShell: الأوامر اللي بتكتبها في PowerShell في ملف. ده الـ [[.sh]] بتاع ويندوز (و PowerShell 7 شغال على لينكس والماك كمان). التفاصيل في تاب PowerShell.

الملفات:
• [[.ps1]]: سكربت عادي.
• [[.psm1]]: module، فيه دوال بتعملها [[Import-Module]] وتستخدمها من سكربتات تانية.
• [[.psd1]]: ملف بيوصف الـ module (اسمه ونسخته). شكله hashtable: [[@{ ... }]].
• [[$PROFILE]]: ملف [[.ps1]] بيتشغّل كل ما تفتح PowerShell (زي [[~/.bashrc]]).

الرموز في السكربت:
• [[#]] تعليق، و [[<# ... #>]] تعليق على كذا سطر.
• [[$]] قبل المتغيرات: [[$dest]].
• [[param(...)]] أول السكربت: الـ arguments بأسامي، وبتتبعت كده: [[.\backup.ps1 -Source data]].
• الأوامر شكلها [[Verb-Noun]]: [[Get-Item]] و [[Compress-Archive]] و [[Write-Host]].

بيتشغّل إزاي:
• من PowerShell: [[.\backup.ps1]] (لازم [[.\]] زي [[./]] في bash).
• من CMD أو اختصار: [[powershell -ExecutionPolicy Bypass -File backup.ps1]]، أو [[pwsh -File backup.ps1]] لـ PowerShell 7.
• الدبل كليك على [[.ps1]] مبيشغّلوش! بيفتحه في Notepad. ده مقصود من مايكروسوفت عشان محدش يشغّل سكربت بالغلط. (كليك يمين ثم [[Run with PowerShell]] بيشغّله.)

Execution Policy: ويندوز (على أجهزة الـ client) افتراضيًا بيمنع تشغيل أي [[.ps1]]، فأول مرة هيطلعلك:
[[running scripts is disabled on this system]]
الحل المعتاد ليوزر عادي: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]]. معناها: السكربتات اللي انت كاتبها تشتغل، واللي نازلة من النت لازم تبقى موقعة (أو تفكلها الحظر بـ [[Unblock-File]] بعد ما تقراها). والـ policy دي مش حماية حقيقية، هي «حزام أمان» عشان متشغّلش حاجة بالغلط.`,
          example: R`# بيعمل نسخة احتياطية من فولدر
param(
    [string]$Source = "."
)
$dest = "backup-$(Get-Date -Format yyyy-MM-dd).zip"
Write-Host "بعمل backup لـ $Source"
Compress-Archive -Path $Source -DestinationPath $dest -Force
Get-Item $dest | Select-Object Name, Length`,
          flag: "script",
          try: R`على ويندوز: احفظ المثال في [[backup.ps1]] واعمل فولدر [[data]] فيه ملف. في PowerShell شوف الـ policy: [[Get-ExecutionPolicy]]. جرّب [[.\backup.ps1 -Source data]]، ولو اترفض نفّذ [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] وجرّب تاني. وجرّب الدبل كليك على الملف. على لينكس أو الماك: نزّل PowerShell 7 وشغّله بـ [[pwsh -File backup.ps1 -Source data]].`,
          deep: {
            why: R`ويندوز محتاج لغة سكربتات قوية بدل CMD القديم، فعمل PowerShell سنة 2006: بدل ما الأوامر بتتبادل نص زي bash، بتتبادل objects ليها خصائص ([[Name]] و [[Length]])، فبتعمل [[Select-Object]] و [[Where-Object]] على الخصائص مباشرة من غير [[grep]] و [[cut]].`,
            how: R`لما تشغّل [[.ps1]]، PowerShell بيشيك على الـ Execution Policy الأول. الملف اللي نزل من النت بيبقى عليه علامة مخفية (Zone.Identifier، اسمها Mark of the Web)، و [[RemoteSigned]] بيرفض الملفات اللي عليها العلامة دي لو مش موقعة. و [[param()]] بيعرّف الـ arguments فـ PowerShell بيعمل [[-Source]] لوحده ويكمّلها بـ Tab.`,
            when: R`أتمتة على ويندوز: تجهيز جهاز تطوير، و backup، وإدارة Active Directory و Azure، وسكربتات CI على runners ويندوز.`,
            mistakes: R`تحل مشكلة الـ policy بـ [[Set-ExecutionPolicy Unrestricted]] على الجهاز كله: [[RemoteSigned]] لـ [[CurrentUser]] كفاية. تشغّل سكربت من النت من غير ما تقراه. تكتب [[backup.ps1]] من غير [[.\]] فيقولك [[is not recognized]]. وتحفظ السكربت بعربي من غير BOM في Windows PowerShell 5.1 فالعربي يظهر ملخبط (PowerShell 7 مفيهوش المشكلة دي).`
          },
          lines: [
            R`[[param(]] بيبدأ تعريف الـ arguments.`,
            R`argument اسمه [[Source]] نوعه string وقيمته الافتراضية [[.]].`,
            R`قفل [[param]].`,
            R`[[$(...)]] جوه النص بينفذ أمر: التاريخ بالشكل ده.`,
            R`[[Write-Host]] يطبع على الشاشة.`,
            R`بيعمل zip، و [[-Force]] يكتب فوق القديم لو موجود.`,
            R`[[|]] بيبعت الـ object، و [[Select-Object]] بياخد خاصيتين منه.`
          ],
          sol: R`على ويندوز أول مرة غالبًا:
[[.\backup.ps1 : File C:\lab\backup.ps1 cannot be loaded because running scripts is disabled on this system.]]
[[Get-ExecutionPolicy]] بيقول [[Restricted]]. وبعد [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] السكربت يشتغل:
[[بعمل backup لـ data]]
وجدول فيه [[Name]] = [[backup-2026-10-01.zip]] و [[Length]] = حجمه بالـ bytes.

الدبل كليك بيفتح الملف في Notepad مش بيشغّله. وعلى لينكس [[pwsh]] بيشغّله علطول لأن [[Get-ExecutionPolicy]] هناك [[Unrestricted]] (الـ policy بتاعة ويندوز بس).`
        },
        {
          cmd: ".bat و .cmd",
          title: "ملف .bat بيعمل إيه، وليه لسه موجود جنب PowerShell؟",
          desc: R`[[.bat]] (batch) و [[.cmd]]: سكربتات CMD، أقدم طريقة أتمتة على ويندوز (من أيام DOS). نفس الأوامر اللي بتكتبها في CMD (تاب CMD). الفرق بين الامتدادين بسيط جدًا ([[.cmd]] أحدث شوية في التعامل مع [[ERRORLEVEL]])، وعمليًا نفس الحاجة.

ليه لسه موجود؟ لأنه بيشتغل على أي ويندوز من غير Execution Policy ولا أي حاجة، والدبل كليك عليه بيشغّله فورًا. عشان كده هتقابله في: [[gradlew.bat]] و [[mvnw.cmd]] (نسخة ويندوز من سكربتات البناء)، و [[npm.cmd]] و [[npx.cmd]] (لما تكتب [[npm]] في CMD انت فعليًا بتشغّل ملف [[.cmd]])، و [[start.bat]] في برامج وألعاب كتير.

الرموز:
• [[@echo off]] أول سطر: متطبعش كل أمر قبل ما تنفذه (و [[@]] بتخفي السطر ده نفسه).
• [[REM]] أو [[::]] تعليق.
• [[set NAME=value]]: متغير (من غير مسافات حوالين [[=]]، وإلا المسافة تبقى جزء من الاسم أو القيمة).
• [[%NAME%]]: قراية متغير. و [[%1]] و [[%2]]: الـ arguments. و [[%~dp0]]: فولدر السكربت نفسه.
• [[setlocal]]: المتغيرات متطلعش بره السكربت.
• [[if not exist "x" mkdir "x"]] و [[goto label]] و [[:label]].
• [[pause]] في الآخر: «Press any key to continue» عشان الشباك ميتقفلش قبل ما تقرا (لما تشغّله بدبل كليك).
• [[%ERRORLEVEL%]]: نتيجة آخر أمر (0 يعني نجح).

خد بالك:
• الدبل كليك بيشغّل علطول، فمتدوسش على [[.bat]] أو [[.cmd]] جايلك من حد مش عارفه: ده برنامج كامل يقدر يمسح ويعمل أي حاجة.
• العربي في CMD بيظهر ملخبط إلا لو كتبت [[chcp 65001]] الأول (بيغيّر الـ code page لـ UTF-8).
• خلّي نهايات السطور CRLF في الملفات دي ([[*.bat text eol=crlf]] في [[.gitattributes]]).
• للحاجات الجديدة استخدم PowerShell: أقوى ومقروء أكتر.`,
          example: R`@echo off
REM copies the text files into a backup folder
setlocal
set NAME=backup
if not exist "%NAME%" mkdir "%NAME%"
copy /Y data\*.txt "%NAME%\" >nul
echo Done: %NAME%
echo Arg 1 is: %1
pause`,
          try: R`على ويندوز: احفظ المثال في [[backup.bat]] جنب فولدر [[data]] فيه ملف [[a.txt]]. شغّله بدبل كليك، وبعدين من CMD: [[backup.bat hello]]. شيل [[@echo off]] وشغّله تاني وشوف الفرق. وجرّب تضيف [[echo أهلًا]] وشغّله، وبعدين ضيف [[chcp 65001 >nul]] تحت [[@echo off]] (واحفظ الملف UTF-8) وشغّله تاني. وبص في فولدر npm عندك: [[where npm]] هيوريك [[npm.cmd]].`,
          deep: {
            why: R`ويندوز محافظ جدًا على التوافق مع القديم، فأي سكربت batch من التسعينات لسه شغال. والأدوات اللي لازم تشتغل على أي جهاز ويندوز من غير إعدادات (زي gradlew و npm) بتستخدمه عشان مضمون.`,
            how: R`CMD بيقرا الملف سطر سطر وينفذه، وبيبدّل [[%NAME%]] بقيمته قبل ما ينفذ السطر. الدبل كليك بيفتح شباك CMD يشغّل الملف ويقفل أول ما يخلص، عشان كده [[pause]] مهمة. و [[>nul]] بيرمي الناتج (زي [[/dev/null]] في لينكس).`,
            when: R`سكربت بسيط لازم يشتغل بدبل كليك على أي ويندوز، أو لما تعدّل سكربتات موجودة. لأي حاجة جديدة فيها منطق، PowerShell.`,
            mistakes: R`[[set NAME = backup]] بمسافات فالمتغير اسمه [[NAME ]] بمسافة. تنسى التنصيص حوالين مسار فيه مسافات ([[C:\Program Files]]). تكتب العربي من غير [[chcp 65001]] فيظهر [[?????]]. وتشغّل [[.bat]] أو [[.cmd]] جايلك في إيميل.`
          },
          lines: [
            R`متطبعش الأوامر نفسها، بس ناتجها.`,
            R`المتغيرات تفضل جوه السكربت.`,
            R`متغير. من غير مسافات حوالين [[=]].`,
            R`لو الفولدر مش موجود اعمله. [[%NAME%]] بتتبدّل بـ [[backup]].`,
            R`انسخ كل [[.txt]]، و [[/Y]] من غير ما تسأل، و [[>nul]] اخفي الرسالة.`,
            R`يطبع.`,
            R`[[%1]] أول argument.`,
            R`يستنى زرار قبل ما الشباك يتقفل.`
          ],
          sol: R`الناتج:
[[Done: backup]]
[[Arg 1 is: hello]]
[[Press any key to continue . . .]]
وفولدر [[backup]] فيه [[a.txt]]. بالدبل كليك [[Arg 1 is:]] فاضية لأن مفيش arguments.

من غير [[@echo off]] كل أمر بيتطبع قبل ناتجه، زي [[C:\lab>set NAME=backup]]. والعربي من غير [[chcp 65001]] بيظهر رموز غريبة، ومعاها بيظهر سليم (في Windows Terminal بالذات). و [[where npm]] بيطبع حاجة زي [[C:\Program Files\nodejs\npm]] و [[C:\Program Files\nodejs\npm.cmd]].`
        }
      ]
    }
]);

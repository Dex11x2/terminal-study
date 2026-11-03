// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Tailwind CSS v4",
      l: 2,
      n: "Tailwind بيقرا الكلاسات من ملفاتك ويطلّع CSS للي استخدمته بس، والتوكنز والإعداد كلهم في ملف CSS",
      projects: [
        { lvl: 'صغير', t: R`زراير و badges بالتوكنز`, what: R`[[@theme]] فيه لون البراند و ٤ ألوان حالات (نجاح وتحذير وخطر ومحايد) بنسخة [[-soft]] لكل واحد، وصفحة فيها زراير و badges بكل الحالات. من درس [[@theme]].`, done: R`مفيش ولا [[#hex]] ولا [[[...]]] في الـ HTML، وتغيير لون في [[@theme]] بيغيّر كل حاجة بتستخدمه، والكلام على كل badge مقري (درس [[contrast ratio]]).` },
        { lvl: 'صغير', t: R`كارت كورس بيتفاعل كله`, what: R`كارت لينك عليه [[group]]: العنوان يتلوّن، والسهم يتحرك (بـ [[rtl:]] عشان يتعكس)، والصورة تكبر جوه حدودها بـ [[overflow-hidden]]. من درس [[group و peer]].`, done: R`الحركة بتحصل بالماوس وبالـ Tab (زوّد [[group-focus-visible:]])، والسهم بيتحرك ناحية القراية في العربي والإنجليزي، ومع reduce الحركة بتقف بـ [[motion-safe:]].` },
        { lvl: 'متوسط', t: R`navbar و drawer بـ Tailwind بس`, what: R`الـ navbar بتاع وحدة position بس بـ Tailwind: [[sticky top-0]] و [[backdrop-blur]] و [[hidden md:flex]]، و drawer من ناحية النهاية بـ [[translate-x-full rtl:-translate-x-full]] و [[aria-expanded:]] و [[data-[state=open]:]]. بيجمع [[variants]] و [[arbitrary values]].`, done: R`على 360 و 768 و 1280 مفيش scroll أفقي، والـ drawer بيدخل من الناحية الصح في الاتجاهين، و JavaScript بيغيّر attributes بس (مفيش [[classList.add]]).` },
        { lvl: 'متوسط', t: R`ثيمات بـ 3 ألوان من نفس الكلاسات`, what: R`[[@theme inline]] بيربط [[--color-bg]] و [[--color-fg]] و [[--color-brand]] بمتغيرات خام، و [[:root]] و [[[data-theme="dark"]]] و [[[data-theme="paper"]]] بيغيّروهم، وزرار بيبدّل [[data-theme]] على الـ html. من درس [[@theme]].`, done: R`الـ HTML مفيهوش ولا [[dark:]]، والتلات ثيمات شغالين، وsection جوه الصفحة ممكن ياخد ثيم مختلف عن الباقي (ده بيثبت إن inline شغال)، والاختيار متحفوظ بعد refresh (localStorage جوه try/catch).` },
        { lvl: 'كبير', t: R`landing ثنائية اللغة بـ Tailwind v4`, what: R`أعد بناء landing وحدة position (أو صفحة الاستوديو بتاعة وحدة Grid) بـ Tailwind v4 بس: [[@utility container-app]]، وتوكنز في [[@theme]]، و bento بـ [[grid-cols-12]] و [[col-span-*]]، وأسعار بـ [[grid-rows-subgrid]] وtoggle بـ [[has-checked:]]، وأسئلة بـ [[aria-expanded:]]، وعربي وإنجليزي بـ utilities منطقية ([[ms-*]] و [[ps-*]] و [[start-*]]) و [[rtl:]] للي مش منطقي (الأسهم و translate). بيجمع الوحدة دي مع وحدات Grid و position والصور.`, done: R`[[matrix.js]] (درس [[مصفوفة مقاسات]]) بيطلّع [[all sizes OK]] بالعربي والإنجليزي، و grep على المشروع مفيهوش [[ml-]] ولا [[mr-]] ولا [[pl-]] ولا [[pr-]] ولا [[left-]] ولا [[right-]]، و [[out.css]] بـ [[--minify]] أقل من 30KB، وكل قيمة [[[...]]] اتكتبت مرة واحدة أو اتحوّلت لتوكن.`, ext: R`زوّد dark mode بـ [[@custom-variant]] وثيم تالت، وقسّم الأقسام لـ components في React، واعمل build في CI يفشل لو [[out.css]] عدّى 30KB.` },
        { lvl: 'فكرة', t: R`تحدّي الـ rebrand`, what: R`خد صفحة Tailwind جاهزة عملتها، وغيّر هويتها كلها (ألوان وخطوط وتدوير وظلال) من [[@theme]] بس، من غير ما تفتح ولا ملف HTML.`, done: R`[[git diff --stat]] بيوري ملف CSS واحد بس اتغيّر، والصفحة شكلها مختلف تمامًا في لقطتين قبل وبعد، ولو فيه حاجة متغيرتش اكتب ليه (غالبًا لون مكتوب [[[#...]]] أو اسم palette زي [[indigo-600]] بدل توكن بالمعنى).`, ext: R`اعمل ٣ هويات لنفس الصفحة وزرار بيبدّل بينهم، وحط اختبار بيفشل لو ظهر [[#hex]] في أي ملف HTML أو JSX.` },
      ],
      items: [
        {
          cmd: "Tailwind v4",
          title: "إزاي كلاس زي p-4 بيبقى CSS",
          desc: R`Tailwind مش مكتبة مكونات. هو أداة بتقرا ملفات مشروعك، وتلاقي أسماء كلاسات زي [[flex]] و [[p-4]] و [[text-lg]]، وتطلّع ملف CSS فيه القواعد دي بس. فانت بتنسّق من جوه الـ HTML أو الـ JSX مباشرة.

في v4 الإعداد كله في CSS: سطر [[@import "tailwindcss";]] في ملف الـ CSS الرئيسي، و plugin لأداة الـ build (Vite، أو PostCSS في Next). مفيش [[tailwind.config.js]] إلا لو عايزه.`,
          example: R`npm install tailwindcss @tailwindcss/vite
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });
// src/index.css
@import "tailwindcss";
// src/App.tsx
<button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">حفظ</button>
// في Next.js بدل plugin الـ Vite: npm i -D tailwindcss @tailwindcss/postcss
// postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };`,
          try: R`نفّذ الإعداد في مشروع الـ lab وحط الزرار في App.tsx. افتح DevTools › Sources وافتح ملف الـ CSS: هتلاقي [[.px-4]] موجودة و [[.px-5]] مش موجودة لأنك مكتبتهاش. اكتب [[px-5]] واحفظ وشوفها اتضافت.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في component: [[const c = "red"; el.className = $__btbg-$__{c}-500$__bt]]. الخلفية هتبقى حمرا؟ ابني وشوف [[out.css]].`, done: R`مفيش [[.bg-red-500]] في الـ CSS (grep مبيلاقيهاش)، فمفيش خلفية: Tailwind بيدوّر على **نص الكلاس كامل** في الملفات ومبيشغّلش الكود. والحل map فيه الأسماء كاملة: [[{ red: "bg-red-500", green: "bg-green-500" }]].` },
            { lvl: 'تطبيق', t: R`**ابني:** من غير Vite: فولدر فيه [[index.html]] و [[in.css]] (سطر [[@import "tailwindcss";]] بس)، وشغّل [[npx @tailwindcss/cli -i in.css -o out.css --watch]]، واعمل كارت سعر كامل بالكلاسات بس.`, done: R`كل ما تحفظ الـ HTML الـ CLI بيطبع [[Done in ...ms]] و [[out.css]] بيتحدث، والكارت شكله كامل، و grep على [[out.css]] بيلاقي الكلاسات اللي استخدمتها بس (مثلًا [[.p-6]] موجودة و [[.p-7]] لأ لو مكتبتهاش).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس المشروع بـ build عادي وبـ [[--minify]]. قيس الحجم في الحالتين، وبعدين زوّد ٢٠ كلاس جديد وقيس تاني.`, done: R`عندك ٤ أرقام بالـ byte (في معمل صغير طلع 17,900 من غير minify و 14,729 بيه)، والحجم بيزيد على قد الكلاسات الجديدة بس مش بالآلاف، وكتبت ليه (Tailwind بيطلّع اللي استخدمته بس).` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة 404 لموقع متخيل بـ Tailwind بس: رقم كبير ورسالة وزرارين في نص الشاشة ([[grid place-items-center min-h-dvh]])، وألوان للوضع الغامق بـ [[dark:]].`, done: R`الصفحة متوسّطة على 360 و 1280، ومن DevTools › Rendering مع [[prefers-color-scheme: dark]] الألوان بتتقلب، ومفيش ولا سطر CSS بتاعك غير الـ [[@import]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Tailwind (صفحة «Detecting classes in source files»): إزاي تخلي Tailwind يقرا فولدر برا المشروع، وإزاي تمنعه من فولدر جواه؟ جرّب الاتنين.`, done: R`لقيت [[@source "../shared";]] و [[@source not "../legacy";]] (المسار من مكان ملف الـ CSS)، وأثبت بـ grep: كلاس موجود في shared بس ظهر في [[out.css]]، وكلاس موجود في legacy بس مظهرش.` },
          ],
          deep: {
            why: R`في CSS العادي بتقعد تخترع أسماء ([[.card-header-title-wrapper]])، وتتنقّل بين ملفين، والملف بيكبر للأبد لأن محدش بيجرؤ يمسح قاعدة مش عارف مين بيستخدمها. Tailwind بيحط التنسيق جنب العنصر، والـ CSS النهائي فيه اللي مستخدم بس، فبيفضل صغير مهما المشروع كبر.`,
            how: R`محرّك v4 (Oxide) أسرع بكتير: الأجزاء التقيلة زي اللف على الملفات مكتوبة بـ Rust، والباقي TypeScript. وقت الـ dev والـ build بيعمل كده:

1) بيلف على ملفات المشروع لوحده (automatic source detection)، وبيتجاهل اللي في [[.gitignore]] (زي node_modules) والملفات الـ binary. ولو فيه فولدر برا المشروع (باكدج UI في monorepo) بتضيفه بـ [[@source "../packages/ui";]].

2) بيقسّم كل ملف لكلمات ويشوف مين فيهم اسم utility صالح ([[p-4]] و [[md:flex]]). هو مش بيفهم JavaScript، بيدوّر على نصوص، عشان كده الكلاس لازم يبقى مكتوب كامل في الكود.

3) بيطلّع CSS للكلمات دي بس، مترتّب في cascade layers: [[theme]] (المتغيرات)، و [[base]] (الـ Preflight: reset بيشيل الـ margins الافتراضية ويحط [[box-sizing: border-box]] على كل حاجة)، و [[components]]، و [[utilities]].

والقيم بقت متغيرات: [[p-4]] بقت [[padding: calc(var(--spacing) * 4)]]، فأي رقم بيشتغل ([[p-13]] و [[h-17]]) من غير إعداد.

في Vite الـ plugin بيشتغل جوه الـ bundler. وفي Next الـ plugin بتاع PostCSS، و [[@import "tailwindcss"]] في [[app/globals.css]] المستورد في الـ root layout.`,
            when: R`أي مشروع React أو Next جديد. ولو المشروع v3 فيه [[tailwind.config.js]] و [[@tailwind base]]، فيه أداة ترقية رسمية: [[npx @tailwindcss/upgrade]].`,
            mistakes: R`تبني اسم الكلاس بـ string: [[bg-$__{color}-500]]، و Tailwind مش هيشوفه ومش هيطلّعه. اكتب الأسماء كاملة في object: [[{ red: "bg-red-500", green: "bg-green-500" }]]. وتستخدم أسماء v3 في v4: [[shadow-sm]] بتاعة v3 اسمها دلوقتي [[shadow-xs]]، و [[shadow-sm]] في v4 بقت أكبر (هي [[shadow]] القديمة)، و [[outline-none]] بقت [[outline-hidden]]، و [[ring]] بقى 1px، ولون الـ border الافتراضي بقى [[currentColor]] مش رمادي. وتكتب [[@tailwind base;]] بتاعة v3 في مشروع v4.`
          },
          teach: R`## من كلمة في className لقاعدة CSS

نفّذنا المثال حرفيًا: مشروع Vite + React فيه الإعداد ده بالظبط (Tailwind 4.3.3 و Vite 8)، وعملنا [[npx vite build]]، وقرينا ملف الـ CSS اللي طلع، وفتحنا الصفحة في Chrome وقسنا الزرار.

---

## ١. التسطيب

~~~bash
npm install tailwindcss @tailwindcss/vite
~~~

باكدجين: [[tailwindcss]] نفسه (المحرك)، و [[@tailwindcss/vite]] الـ plugin اللي بيشغّله جوه Vite. الـ [[@]] في أول الاسم معناه إن الباكدج جوه «scope» اسمه tailwindcss على npm.

## ٢. [[vite.config.ts]]

~~~text vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });
~~~

- [[import ... from "..."]]: هات حاجة من باكدج.
- [[defineConfig({...})]]: دالة من Vite بتاخد الإعداد (وبتخلي المحرر يكمّلك الخصائص).
- [[plugins: [react(), tailwindcss()]]]: قايمة plugins. كل واحد دالة بتتنده بـ [[()]] وبترجع plugin. [[react()]] بيفهّم Vite الـ JSX، و [[tailwindcss()]] بيولّد الـ CSS.
- [[export default]]: ده اللي الملف بيطلّعه، و Vite بيقراه.

## ٣. [[src/index.css]]

~~~text src/index.css
@import "tailwindcss";
~~~

السطر ده بيجيب ٣ حاجات: الـ theme (المتغيرات زي الألوان والمسافات)، و Preflight (reset)، والـ utilities. والملف ده لازم يتعمله import في [[main.tsx]] ([[import "./index.css";]]).

## ٤. الزرار

~~~text src/App.tsx
<button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">حفظ</button>
~~~

[[className]] هو [[class]] في JSX. وكل كلمة جواه utility:

| الكلاس | القاعدة اللي طلعت في الـ CSS | القيمة المتقاسة على الزرار |
|---|---|---|
| [[rounded-lg]] | [[border-radius: var(--radius-lg)]] و [[--radius-lg: .5rem]] | 8px |
| [[bg-indigo-600]] | [[background-color: var(--color-indigo-600)]] | oklch(0.511 0.262 276.966) |
| [[px-4]] | [[padding-inline: calc(var(--spacing) * 4)]] و [[--spacing: .25rem]] | 16px يمين وشمال |
| [[py-2]] | نفس الفكرة × 2 | 8px فوق وتحت |
| [[text-white]] | لون الكلام أبيض | rgb(255, 255, 255) |
| [[hover:bg-indigo-500]] | جوه [[@media (hover:hover)]] | oklch(0.585 0.233 277.117) وقت الـ hover |

- [[px]] = padding على المحور x (يمين وشمال)، و [[py]] على y (فوق وتحت).
- [[padding-inline]] = الجنبين حسب اتجاه الكلام. و [[calc(var(--spacing) * 4)]] = 0.25rem × 4 = 1rem = 16px.
- قاعدة الـ hover نفسها في الملف كانت كده:

~~~text من الـ CSS الناتج
@media (hover:hover){.hover\:bg-indigo-500:hover{background-color:var(--color-indigo-500)}}
~~~

الـ [[\:]] لأن [[:]] جوه اسم كلاس لازم يتعمله escape، و [[@media (hover:hover)]] = على الأجهزة اللي فيها ماوس بس.

الزرار طلع 62.73 × 40، والـ CSS كله 4668 byte (1.6 KB بعد gzip).

### Preflight اشتغل كمان

على نفس الصفحة: [[margin]] بتاع الـ body بقى 0px، و [[box-sizing]] على الزرار [[border-box]]، والـ border بقى [[0px solid]]. ده الـ reset اللي بيجي مع [[@import "tailwindcss"]].

## ٥. التجربة: [[px-5]] بدل [[px-4]]

| | في الـ CSS | padding الجنبين | عرض الزرار |
|---|---|---|---|
| [[px-4]] | [[.px-4]] بس | 16px | 62.73 |
| [[px-5]] | [[.px-5]] بس، و [[.px-4]] اختفت | 20px | 70.73 |

وحاجة اتعلمناها بالغلط: أول مرة المشروع مكانش فيه [[.gitignore]]، فـ Tailwind قرا فولدر [[dist]] القديم ولقى فيه [[px-4]]، فطلّع الاتنين. لما ضفنا [[.gitignore]] فيه [[dist]] و [[node_modules]] طلع اللي مستخدم بس. ده لأن Tailwind بيلف على ملفات المشروع كلها وبيتجاهل اللي في [[.gitignore]].

## ٦. Next.js (من الـ docs الرسمية، متجرّبش هنا)

~~~bash
npm i -D tailwindcss @tailwindcss/postcss
~~~

~~~text postcss.config.mjs
export default { plugins: { "@tailwindcss/postcss": {} } };
~~~

[[-D]] = devDependency (أداة build مش كود بيتبعت للمتصفح). Next بيستخدم PostCSS، فالـ plugin بتاعه هنا بدل plugin الـ Vite، و [[@import "tailwindcss";]] في [[app/globals.css]].

## الخلاصة

- الإعداد: باكدج + plugin + سطر [[@import "tailwindcss";]].
- Tailwind بيقرا ملفاتك كنص ويطلّع قاعدة لكل كلاس لقاه بس، فالكلاس لازم يتكتب كامل.
- القيم متغيرات: [[px-4]] = [[--spacing]] × 4، والألوان [[--color-*]].
- [[hover:]] ملفوف في [[@media (hover:hover)]].`,
          lines: [
            "سطّب Tailwind والـ plugin بتاع Vite (في مشروع الـ lab).",
            R`[[defineConfig]] من Vite: دالة بتلف الإعداد عشان المحرر يكمّلك أسماء الخيارات.`,
            R`plugin الـ React: بيخلي Vite يفهم ملفات JSX ويعمل تحديث سريع وانت بتعدّل.`,
            R`plugin الـ Tailwind الرسمي لـ Vite: بيقرا ملفاتك ويطلّع الـ CSS وقت الـ dev والـ build.`,
            "ضيفه جنب React، وده كل الإعداد في Vite.",
            "السطر الوحيد في ملف الـ CSS: بيجيب الـ theme والـ reset (Preflight) والـ utilities.",
            "زرار كامل من غير ولا سطر CSS: تدوير، وخلفية، ومسافات، ولون كلام، ولون عند الـ hover.",
            R`في Next.js: PostCSS بالـ plugin بتاعه، و [[@import]] نفسه في globals.css.`
          ],
          sol: R`الزرار بيظهر بنفسجي غامق (indigo-600) والكلام أبيض ومدوّر، ولما تقف عليه بالماوس بيفتح شوية (indigo-500). في Sources (أو في Elements › Styles على الزرار) هتلاقي CSS متولد فيه قواعد زي دي بالظبط (من Tailwind v4.3):

[[.px-4 { padding-inline: calc(var(--spacing) * 4); }]] و [[--spacing: 0.25rem]] متعرّف على [[:root]]، يعني 1rem. ومش هتلاقي [[.px-5]] خالص. اكتب [[px-5]] بدل [[px-4]] واحفظ: الـ Vite بيحدّث الصفحة من غير refresh، والقاعدة [[.px-5]] ظهرت في الملف، و [[.px-4]] اختفت لو مبقتش مستخدمة في أي حتة. وقاعدة الـ hover هتلاقيها ملفوفة جوه [[@media (hover: hover)]]، فعلى الموبايل بالـ touch مش بتعلق.

لو مفيش أي ستايل اتطبق: اتأكد إن [[tailwindcss()]] في plugins بتاعة vite.config، وإن [[@import "tailwindcss";]] في أول ملف CSS، وإن الملف ده متعمله import في [[main.tsx]]. ولو الملف فيه كلاسات كتير مش كاتبها، ده الـ preflight (reset) والـ theme، وده طبيعي.`
        },
        {
          cmd: "@theme",
          title: "ألوانك وخطوطك تبقى كلاسات",
          desc: R`[[@theme]] في ملف الـ CSS بيعرّف الـ design tokens، وكل متغير بيطلّع كلاسات: [[--color-brand]] بيطلّع [[bg-brand]] و [[text-brand]] و [[border-brand]]، و [[--font-display]] بيطلّع [[font-display]]، و [[--breakpoint-3xl]] بيطلّع [[3xl:]].

و [[@theme inline]] لما التوكن نفسه بيشاور على متغير تاني (زي خط من next/font، أو لون بيتغير مع الثيم).`,
          example: R`@import "tailwindcss";
@theme {
  --color-brand: oklch(0.55 0.2 265);
  --color-brand-soft: oklch(0.95 0.03 265);
  --font-display: "Cairo", system-ui, sans-serif;
  --radius-card: 1.25rem;
  --breakpoint-3xl: 120rem;
}
@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
}
:root { --bg: white; --fg: oklch(0.21 0.03 265); }`,
          try: R`ضيف [[--color-brand]] واستخدم [[bg-brand text-white]] على زرار. وبعدين افتح الـ CSS الناتج ودوّر على [[--color-brand]]: هتلاقيه على [[:root]] كمتغير عادي، يعني تقدر تستخدمه في CSS عادي بـ [[var(--color-brand)]] كمان.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[@theme { --fonts-display: "Cairo", sans-serif; }]] و [[<h1 class="font-display">]]، والخط مش بيتغيّر. لاقي الغلطة.`, done: R`الاسم [[--fonts-]] مش namespace بيعرفه Tailwind، فمفيش [[.font-display]] ولا المتغير نفسه في [[out.css]] (grep فاضي). بعد [[--font-display]] الكلاس اتولّد والخط اتغيّر.` },
            { lvl: 'تطبيق', t: R`**ابني:** توكنز لمحل شاي متخيل في [[@theme]]: [[--color-brand]] و [[--color-brand-soft]] و [[--radius-card]] و [[--font-display]] و [[--shadow-card]]، وصفحة منتجات بتستخدمهم ([[bg-brand/20]] و [[rounded-card]] و [[shadow-card]]).`, done: R`grep على [[out.css]] بيلاقي [[--color-brand]] في [[:root]] و [[.bg-brand\/20]] جواها [[color-mix]]، ولما تغيّر لون واحد في الـ [[@theme]] كل الصفحة بتتغيّر، ومفيش ولا [[#hex]] في الـ HTML.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[@theme { --color-bg: var(--bg); }]] ضد [[@theme inline { --color-bg: var(--bg); }]]، وجوه الصفحة section عليه [[data-theme="dark"]] بيغيّر [[--bg]] لأسود. خلفية [[bg-bg]] جوه الـ section هتبقى إيه في الحالتين؟`, done: R`من غير inline: [[.bg-bg]] بتقرا [[var(--color-bg)]]، والمتغير ده اتحسب مرة واحدة على [[:root]] (أبيض) واتورث كده، فالخلفية فضلت [[rgb(255, 255, 255)]] جوه الـ section. مع inline: الكلاس فيه [[var(--bg)]] نفسه، فبقت سودا.` },
            { lvl: 'تطبيق', t: R`**ابني:** animation في [[@theme]]: [[--animate-float]] ومعاه [[@keyframes float]] جوه نفس البلوك، واستخدمه بـ [[motion-safe:animate-float]] على أيقونة.`, done: R`[[out.css]] فيه [[@keyframes float]] و [[.motion-safe\:animate-float]] جوه [[@media (prefers-reduced-motion: no-preference)]]، ولو عرّفت keyframes تانية ومستخدمتهاش مش بتطلع في الملف. ومع reduce في Rendering الأيقونة واقفة.` },
            { lvl: 'تحدي', t: R`**refactor:** صفحة فيها [[bg-[#6d28d9]]] و [[text-[#6d28d9]]] و [[border-[#6d28d9]]] متكررين ١٢ مرة. حوّلها لتوكن واحد من غير ما الشكل يتغيّر.`, done: R`grep على الـ HTML بـ [[\[#]] مبيلاقيش حاجة، والتوكن [[--color-brand]] متعرّف مرة في [[@theme]]، ولقطتين قبل وبعد (screenshot) شبه بعض، وتغيير اللون بقى سطر واحد.` },
          ],
          deep: {
            why: R`بدل ما تكتب [[bg-[#4f46e5]]] في مية مكان، بتدّي اللون اسم في مكان واحد. والتصميم كله بيبقى من مجموعة قيم محددة (ألوان، وخطوط، ومسافات، وتدوير)، ولو اللون اتغير بيتغير في سطر.`,
            how: R`كل متغير في [[@theme]] ليه namespace بيحدد الكلاسات: [[--color-*]] للألوان، و [[--font-*]] للخطوط، و [[--text-*]] لأحجام الخط، و [[--radius-*]] للتدوير، و [[--shadow-*]] للظلال، و [[--breakpoint-*]] للـ breakpoints، و [[--spacing]] للمسافات. وبيطلعوا كمان كمتغيرات CSS عادية على [[:root]] (اللي مستخدم بس، إلا لو كتبت [[@theme static]]).

الفرق بين [[@theme]] و [[:root]]: الاتنين متغيرات، بس اللي في [[@theme]] بس هو اللي بيعمل كلاسات. متغير من غير كلاسات حطه في [[:root]].

ليه [[inline]]؟ من غيرها، [[bg-bg]] بتطلع [[background-color: var(--color-bg)]]، و [[--color-bg]] متعرّف على [[:root]] بقيمة [[var(--bg)]]. المتغير اللي قيمته [[var()]] بيتحسب في المكان اللي اتعرّف فيه، فـ [[--color-bg]] بيتحسب مرة واحدة على [[:root]]. لو غيّرت [[--bg]] على عنصر جوه الصفحة ([[<section class="dark">]])، الكلاس مش هيحس. مع [[inline]] الكلاس بيطلع [[background-color: var(--bg)]] مباشرة، فبيقرا القيمة في مكان العنصر نفسه.

ولو عايز تشيل ألوان Tailwind الافتراضية كلها وتفضل ألوانك بس: [[--color-*: initial;]] في أول الـ [[@theme]].`,
            when: R`أول ما تبدأ مشروع: ألوان البراند، والخط، والتدوير. وكل لون بيتغير مع الثيم يبقى متغير عادي في [[:root]] وتوكن في [[@theme inline]].`,
            mistakes: R`توكن بيشاور على [[var()]] من غير [[inline]]، فالثيم يشتغل على الصفحة كلها بس مش على جزء منها. في مشروع حقيقي كل الألوان كانت في [[@theme]] عادي بـ [[var(--bg)]]، وده شغال طول ما الثيم بيتغير على [[<html>]] بس، لكن أول ما حد يعمل section غامقة لوحدها هيتفاجئ. واسم التوكن غلط ([[--colors-brand]] بـ s) فمفيش كلاسات بتتعمل ومفيش error.`
          },
          teach: R`## متغير في [[@theme]] = كلاسات جديدة

[[@theme]] بلوك في ملف الـ CSS بتكتب فيه متغيرات، و Tailwind بيقرا **اسم** كل متغير ويعرف منه هيعمل أنهي كلاسات. حطينا المثال في [[src/index.css]] بتاع مشروع Vite (Tailwind 4.3.3)، واستخدمنا الكلاسات في [[App.tsx]]، وعملنا build، وقرينا الـ CSS الناتج، وقسنا العناصر في Chrome.

---

## ١. البلوك الأول

~~~text src/index.css
@import "tailwindcss";
@theme {
  --color-brand: oklch(0.55 0.2 265);
  --color-brand-soft: oklch(0.95 0.03 265);
  --font-display: "Cairo", system-ui, sans-serif;
  --radius-card: 1.25rem;
  --breakpoint-3xl: 120rem;
}
~~~

[[@theme]] لازم ييجي بعد [[@import "tailwindcss";]]. والجزء الأول من الاسم (اسمه namespace) بيحدد نوع الكلاسات، والباقي اسم الكلاس:

| المتغير | الـ namespace | الكلاس اللي استخدمناه | القاعدة في الـ CSS الناتج | المتقاس |
|---|---|---|---|---|
| [[--color-brand]] | [[--color-]] | [[bg-brand]] | [[background-color: var(--color-brand)]] | oklch(0.55 0.2 265) |
| [[--font-display]] | [[--font-]] | [[font-display]] | [[font-family: var(--font-display)]] | Cairo, system-ui, sans-serif |
| [[--radius-card]] | [[--radius-]] | [[rounded-card]] | [[border-radius: var(--radius-card)]] | 20px |
| [[--breakpoint-3xl]] | [[--breakpoint-]] | [[3xl:grid-cols-6]] | جوه [[@media (width>=120rem)]] | 6 أعمدة على 1920، و none على 1200 |

- [[--color-brand]] بيعمل كمان [[text-brand]] و [[border-brand]] و [[ring-brand]] وغيرهم: أي utility بتاخد لون.
- [[--font-display]] قيمته قايمة خطوط: [[Cairo]]، ولو مش موجود [[system-ui]] (خط النظام)، وبعدين [[sans-serif]].
- [[1.25rem]] = 20px، و [[120rem]] = 1920px.

### المتغير نفسه موجود في الصفحة

قرينا [[getComputedStyle(document.documentElement).getPropertyValue("--color-brand")]] (قيمة المتغير على [[<html>]]):

~~~text الناتج
--color-brand:       oklch(55% .2 265)
--color-brand-soft:  (فاضي)
~~~

[[55%]] هي نفسها [[0.55]] مكتوبة بشكل تاني. و [[--color-brand-soft]] مش موجود خالص، لأن مفيش ولا كلاس استخدمه، و Tailwind بيطلّع المتغيرات المستخدمة بس. لما غيّرنا [[@theme]] لـ [[@theme static]] الاتنين ظهروا في الـ CSS.

## ٢. [[@theme inline]] و [[:root]]

~~~text src/index.css
@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
}
:root { --bg: white; --fg: oklch(0.21 0.03 265); }
~~~

هنا التوكن قيمته متغير تاني ([[var(--bg)]])، و [[--bg]] متعرّف في [[:root]] عادي (ده مش بيعمل كلاسات). عشان نشوف فايدة [[inline]] عملنا توكن تالت بنفس القيمة في [[@theme]] عادي، وحطينا قاعدة [[.dark { --bg: oklch(0.17 0.03 265); }]]:

~~~text الكلاسات اللي طلعت
.bg-bg  {background-color:var(--bg)}          (من @theme inline)
.bg-bg2 {background-color:var(--color-bg2)}   (من @theme عادي)
~~~

| العنصر | الخلفية المتقاسة |
|---|---|
| [[<section class="bg-bg">]] | rgb(255, 255, 255) |
| [[<section class="dark bg-bg">]] | oklch(0.17 0.03 265) (غمقت) |
| [[<section class="dark bg-bg2">]] | rgb(255, 255, 255) (فضلت بيضا) |

ليه؟ [[inline]] بيحط [[var(--bg)]] جوه الكلاس نفسه، فبيقرا [[--bg]] من العنصر اللي عليه الكلاس (اللي [[.dark]] غيّرته). من غير inline الكلاس بيقرا [[--color-bg2]]، وده اتحسب مرة واحدة على [[:root]] لما [[--bg]] كانت لسه white.

## الخلاصة

| | بيعمل كلاسات؟ | يستخدم إمتى |
|---|---|---|
| [[@theme]] | آه | قيم ثابتة: ألوان البراند والخطوط والتدوير |
| [[@theme inline]] | آه | التوكن بيشاور على متغير بيتغير (ثيم) |
| [[:root]] | لأ | متغيرات عادية |

- اسم المتغير لازم يبدأ بالـ namespace الصح ([[--color-]] مش [[--colors-]])، وإلا مفيش كلاسات.
- [[@theme static]] لو عايز كل المتغيرات تطلع حتى اللي مش مستخدمة.`,
          lines: [
            R`[[@import]] بيجيب Tailwind كله (theme و Preflight و utilities) قبل ما نضيف توكنز بتاعتنا.`,
            R`بداية [[@theme]]: كل متغير جواه بيطلّع كلاسات حسب أول اسمه ([[--color-]] و [[--font-]]...).`,
            R`[[bg-brand]] و [[text-brand]] و [[ring-brand]]... وكمان [[bg-brand/50]] بشفافية.`,
            R`نسخة فاتحة من نفس اللون للخلفيات: [[bg-brand-soft]] وأي utility لون تاني.`,
            R`خط للعناوين: بيطلّع كلاس [[font-display]]، والخطوط اللي بعد Cairo احتياطي لو متحمّلش.`,
            R`تدوير خاص بالكروت: بيطلّع [[rounded-card]] بـ 20px بدل ما تكتب الرقم في كل حتة.`,
            R`breakpoint جديد من 1920px (120 × 16): [[3xl:grid-cols-6]] بقى شغال زي [[md:]] بالظبط.`,
            R`قفلة [[@theme]] الأول، والتاني اللي عليه [[inline]] جاي بعده.`,
            "توكنز بتشاور على متغيرات تانية.",
            R`[[bg-bg]] بتاخد [[var(--bg)]] نفسه، فلما [[--bg]] يتغير في الـ dark mode الكلاس يتغير.`,
            R`لون الكلام بنفس الطريقة: [[text-fg]] بيقرا [[var(--fg)]] مباشرة جوه الكلاس.`,
            R`قفلة [[@theme inline]]، والقيم الحقيقية جاية في السطر اللي بعده.`,
            "القيم الحقيقية، ودي اللي الثيم بيغيّرها."
          ],
          sol: R`الزرار بقى بلون الـ brand (أزرق بنفسجي) والكلام أبيض. في الـ CSS الناتج هتلاقي جوه [[@layer theme]] قاعدة [[:root, :host { ... --color-brand: oklch(0.55 0.2 265); }]]، والكلاس [[.bg-brand { background-color: var(--color-brand); }]]. يعني الكلاس نفسه بيقرا المتغير، فلو كتبت في CSS عادي [[border-color: var(--color-brand)]] هيشتغل، ولو غيّرت المتغير على [[:root]] من DevTools كل حاجة بتتغير معاه.

حاجة هتلاحظها: [[--color-brand-soft]] مش موجود في الناتج، لأنك مستخدمتش [[bg-brand-soft]] ولا أي كلاس بيقراه. Tailwind v4 بيطلّع متغيرات الـ theme المستخدمة بس. لو عايزها كلها تطلع دايمًا عشان تستخدمها في CSS عادي أو JavaScript، اكتب [[@theme static]] بدل [[@theme]] (جرّبتها ولقيت الاتنين بقوا موجودين).

ولو الكلاس [[bg-brand]] ملوش أي تأثير، غالبًا كتبت الاسم [[--brand]] من غير [[--color-]] في الأول، فـ Tailwind مش عارف إنه لون.`
        },
        {
          cmd: "variants",
          title: "hover و focus و md و dark قدام أي كلاس",
          desc: R`أي كلاس في Tailwind تقدر تحط قدامه شرط: [[hover:bg-brand]] (عند الـ hover)، و [[focus-visible:outline-2]] (focus من الكيبورد)، و [[md:flex]] (من 768 وطالع)، و [[dark:bg-gray-900]] (في الوضع الغامق)، و [[disabled:opacity-50]]، و [[rtl:-scale-x-100]].

وتقدر تجمعهم: [[md:hover:bg-brand]] = على شاشة md وطالع وعند الـ hover بس.`,
          example: R`<nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
  <a className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-brand dark:text-gray-200 dark:hover:bg-gray-800" href="/pricing">
    الأسعار
  </a>
  <button className="hidden md:inline-flex disabled:cursor-not-allowed disabled:opacity-50" disabled>
    ابدأ
  </button>
  <ul className="*:border-b *:py-2 *:last:border-0">...</ul>
</nav>`,
          try: R`اعمل اللينك ده واتنقل له بـ Tab: الـ outline هيظهر. دوس عليه بالماوس: مش هيظهر. وبعدين صغّر الشاشة وشوف الـ nav بقى عمود والزرار اختفى.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ عناصر: [[sm:hidden]] و [[hidden sm:block]] و [[max-sm:hidden]]. مين ظاهر على 360 ومين على 768؟`, done: R`على 360: الأول ظاهر، والتاني مستخبي، والتالت مستخبي. على 768: الأول مستخبي، والتاني ظاهر، والتالت ظاهر. وعرفت إن الكلاس من غير prefix هو الموبايل، و [[sm:]] = من 640 وطالع.` },
            { lvl: 'تطبيق', t: R`**ابني:** navbar بـ Tailwind بس: الروابط [[hidden md:flex]]، وزرار ☰ [[md:hidden]] عليه [[aria-expanded]] والأيقونة [[aria-expanded:rotate-90]]، والقايمة على الموبايل [[max-md:]] بتظهر لما الزرار يتضغط (سطرين JavaScript بيقلبوا [[aria-expanded]] و [[hidden]]).`, done: R`على 360 و 768 و 1280 الشكل صح ومفيش scroll أفقي، والأيقونة بتلف لما القايمة تفتح من غير ولا class في JavaScript غير [[aria-expanded]]، و Tab بيوصل للزرار.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زراير عليها [[focus:outline-none]] عشان «الـ outline وحش لما بدوس بالماوس». مستخدم الكيبورد مش عارف هو فين. صلّحها من غير ما الماوس يشوف outline.`, done: R`بعد [[focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand]]: الضغط بالماوس مبيطلّعش outline، و Tab بيطلّعه واضح على كل زرار.` },
            { lvl: 'تطبيق', t: R`**ابني:** toggle شهري/سنوي لصفحة أسعار من غير JavaScript: radio اتنين جوه wrapper عليه [[group]]، والأسعار [[group-has-[#yearly:checked]:hidden]] و [[hidden group-has-[#yearly:checked]:block]].`, done: R`اختيار «سنوي» بيبدّل كل الأسعار في نفس اللحظة، والأسهم بين الـ radios بتبدّل من الكيبورد، و grep على الـ JS مفيهوش أي حاجة للأسعار.` },
            { lvl: 'تطبيق', t: R`**ابني:** أسئلة شائعة بزراير [[aria-expanded]]، والسهم [[aria-expanded:rotate-180]]، والإجابة [[data-[state=open]:block hidden]]، وفاصل بين الأسئلة بـ [[not-last:border-b]] على الأب بـ [[*:]].`, done: R`فتح سؤال بيلف سهمه بس، وآخر سؤال مفيش تحته خط، و grep على [[out.css]] بيلاقي [[[aria-expanded="true"]]] و [[:not(:last-child)]].` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[check-variants.mjs]]: بيعمل build لملف HTML فيه [[md:flex]] و [[hover:bg-brand]] و [[dark:bg-black]]، ويتأكد من [[out.css]] إن [[md:flex]] جوه [[@media (width >= 48rem)]]، و [[hover:]] جوه [[@media (hover: hover)]]. ويخرج بـ 1 لو حاجة ناقصة.`, done: R`السكربت بيخرج 0 على الإعداد العادي، ولما تزوّد [[@custom-variant dark (&:where(.dark, .dark *));]] الاختبار بتاع dark بيفشل لو لسه بيدوّر على [[prefers-color-scheme]] (يعني بيمسك التغيير).` },
          ],
          deep: {
            why: "في CSS العادي، الـ hover والـ media query والـ dark mode كل واحد قاعدة لوحدها في مكان تاني. الـ variants بتخلي كل حالات العنصر مكتوبة عليه، فتشوف سلوكه كله في سطر.",
            how: R`كل variant بيلف الـ utility في selector أو at-rule: [[hover:bg-x]] بتطلع قاعدة فيها [[:hover]] جوه [[@media (hover: hover)]]. و [[md:flex]] جوه [[@media (width >= 48rem)]]. و [[dark:]] افتراضيًا جوه [[@media (prefers-color-scheme: dark)]] (وتقدر تخليه كلاس، درس الـ dark mode).

في v4 الـ variants المتراكبة بتتقري من الشمال لليمين: [[*:last:border-0]] = على الأولاد، لما يكون الابن آخر واحد (في v3 كانت بالعكس).

فيه variants كتير جاهزة: [[focus-visible:]] و [[active:]] و [[disabled:]] و [[first:]] و [[last:]] و [[odd:]] و [[placeholder:]] و [[aria-expanded:]] و [[data-[state=open]:]] (مهمة مع Radix) و [[motion-reduce:]] و [[print:]] و [[max-md:]] (أقل من md) و [[rtl:]] و [[ltr:]].

وترتيب الكلاسات في الـ className نفسه مش هو اللي بيحسم التعارض: الترتيب في ملف الـ CSS الناتج هو اللي بيحكم، والـ variants بتيجي بعد الكلاس العادي، فـ [[hover:bg-x]] بتكسب [[bg-y]] وقت الـ hover.`,
            when: R`كل حالة ليها شكل مختلف. [[focus-visible:]] على كل عنصر بيتضغط (accessibility). وابدأ بالموبايل: الكلاس العادي للموبايل و [[md:]] للأكبر.`,
            mistakes: R`[[sm:text-sm]] وانت فاكر إنه للموبايل: هو من 640 وطالع. [[focus:]] بدل [[focus-visible:]] فالـ outline يظهر مع كل ضغطة ماوس، فتزهق وتشيله خالص وتبوّظ الكيبورد. و [[hover:]] بس على حاجة مهمة، فاللي على الموبايل ميشوفهاش (v4 مبيطبّقش hover على اللمس أصلًا).`
          },
          teach: R`## الشرط قبل الـ [[:]]، والكلاس بعدها

[[md:flex-row]] تتقري: «لو الشرط [[md]] متحقق، طبّق [[flex-row]]». حطينا المثال في [[App.tsx]] بتاع مشروع Vite (Tailwind 4.3.3، ومعاه [[--color-brand]] من درس [[@theme]])، وعملنا build، وقرينا القواعد في الـ CSS الناتج، وجربنا في Chrome بالكيبورد والماوس وعلى عرض 400 و 1000 وبثيم فاتح وغامق.

---

## ١. الـ nav

~~~text App.tsx
<nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
~~~

| الكلاس | في الـ CSS | على 400 | على 1000 |
|---|---|---|---|
| [[flex flex-col gap-2]] | من غير شرط | column، gap 8px | (اتغطّى) |
| [[md:flex-row md:items-center md:gap-6]] | جوه [[@media (width>=48rem)]] | مش شغال | row، gap 24px |

[[48rem]] = 768px. والكلاس العادي للموبايل، و [[md:]] بيضيف من 768 وطالع.

## ٢. اللينك

~~~text App.tsx
<a className="rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-brand dark:text-gray-200 dark:hover:bg-gray-800" href="/pricing">
~~~

القواعد زي ما طلعت في الملف:

~~~text من الـ CSS الناتج
@media (hover:hover){.hover\:bg-gray-100:hover{background-color:var(--color-gray-100)}}
.focus-visible\:outline-2:focus-visible{outline-style:var(--tw-outline-style);outline-width:2px}
.focus-visible\:outline-brand:focus-visible{outline-color:var(--color-brand)}
@media (prefers-color-scheme:dark){.dark\:text-gray-200{color:var(--color-gray-200)}@media (hover:hover){.dark\:hover\:bg-gray-800:hover{...}}}
~~~

- [[hover:]] = [[:hover]] جوه [[@media (hover:hover)]].
- [[focus-visible:]] = [[:focus-visible]]: العنصر عليه focus **والمتصفح شايف إن لازم يبان** (زي لما توصله بـ Tab).
- [[outline-2]] = خط حوالين العنصر 2px، و [[outline-brand]] لونه.
- [[dark:]] = جوه [[@media (prefers-color-scheme:dark)]]، يعني ثيم الجهاز. و [[dark:hover:]] الاتنين مع بعض.

### Tab ضد ضغطة الماوس (على 1000)

| الحالة | [[:focus]] | [[:focus-visible]] | الـ outline |
|---|---|---|---|
| الصفحة لسه فاتحة | false | false | none |
| بعد Tab | true | true | solid 2px oklch(0.55 0.2 265) |
| بعد ضغطة ماوس | true | false | none |

في الحالتين الـ focus على اللينك، بس الـ outline ظهر مع الكيبورد بس. ولما الماوس وقف عليه الخلفية بقت [[oklch(0.967 0.003 264.542)]] (gray-100).

### الثيم الغامق

فتحنا الصفحة بثيم جهاز dark: لون اللينك بقى [[oklch(0.928 0.006 264.531)]] (gray-200) بدل [[oklch(0.373 0.034 259.733)]] (gray-700)، وخلفية الـ hover [[oklch(0.278 0.033 256.848)]] (gray-800).

## ٣. الزرار

~~~text App.tsx
<button className="hidden md:inline-flex disabled:cursor-not-allowed disabled:opacity-50" disabled>
~~~

- [[hidden]] = [[display: none]]، و [[md:inline-flex]] بيرجّعه من 768.
- [[disabled]] attribute = الزرار مقفول. و [[disabled:]] variant = [[:disabled]].

| العرض | display | opacity | cursor |
|---|---|---|---|
| 400 | none | 0.5 | not-allowed |
| 1000 | flex | 0.5 | not-allowed |

ليه flex مش inline-flex؟ الزرار ابن جوه flex، والمتصفح بيحوّل أي ابن flex لـ block (inline-flex تبقى flex)، والشكل واحد.

## ٤. [[*:]] على القايمة

~~~text App.tsx
<ul className="*:border-b *:py-2 *:last:border-0">...</ul>
~~~

[[*:]] = «على كل ابن مباشر». وفي v4 الـ variants بتتقري من الشمال لليمين: [[*:last:border-0]] = على الأولاد، اللي منهم آخر واحد. القاعدة طلعت كده:

~~~text من الـ CSS الناتج
:is(.\*\:last\:border-0>*):last-child{border-style:var(--tw-border-style);border-width:0}
~~~

حطينا ٣ [[<li>]]: الـ border تحت كل واحد طلع 1px و 1px و **0px**.

## الخلاصة

| الـ variant | بيتحول لـ | يعني |
|---|---|---|
| [[hover:]] | [[:hover]] جوه [[@media (hover:hover)]] | الماوس فوقه، وعلى أجهزة فيها ماوس بس |
| [[focus-visible:]] | [[:focus-visible]] | focus جه من الكيبورد مش من ضغطة ماوس |
| [[md:]] | [[@media (width>=48rem)]] | الشاشة 768 أو أعرض |
| [[dark:]] | [[@media (prefers-color-scheme:dark)]] | نظام التشغيل على الوضع الغامق |
| [[disabled:]] | [[:disabled]] | العنصر عليه attribute اسمه disabled |
| [[*:]] | الأولاد المباشرين | القاعدة على كل ابن مباشر مش على العنصر نفسه |

- الكلاس من غير prefix للموبايل، و [[md:]] من 768 وطالع.
- [[focus-visible:]] مش [[focus:]] عشان الـ outline يظهر مع الكيبورد بس.`,
          lines: [
            "على الموبايل عمود، ومن md صف متوسّط بمسافات أكبر.",
            "لينك: لون عادي، وخلفية عند الـ hover، و outline لما ياخد focus من الكيبورد، وألوان تانية في الوضع الغامق.",
            R`كلمة «الأسعار» نفسها، وكل الـ variants اللي على اللينك بتتطبق عليها.`,
            R`قفلة اللينك، وبعده زرار عليه variants تانية خالص.`,
            "مستخبي على الموبايل وبيظهر من md. ولما يبقى disabled: شفاف والماوس ممنوع.",
            R`كلمة «ابدأ» على الزرار، وهي مستخبية على الموبايل مع الزرار كله.`,
            R`قفلة الزرار، وبعده لستة بتستخدم الـ variant [[*:]].`,
            R`[[*:]] = على كل الأولاد المباشرين: خط تحت كل واحد، إلا الأخير.`,
            R`قفلة الـ nav، وكده المثال خلص.`
          ],
          sol: R`لما تدوس Tab من أول الصفحة: الـ focus بيروح للينك «الأسعار» وحواليه outline بعرض 2px بلون الـ brand. لما تدوس عليه بالماوس: الـ focus عليه برضه بس مفيش outline، لأن المتصفح بيعتبر إن الضغط بالماوس مش محتاج مؤشر، فـ [[:focus-visible]] مش متحققة. ده بالظبط الفرق بين [[focus:]] (هيظهر في الحالتين) و [[focus-visible:]].

لما تصغّر الشاشة تحت 768px ([[md]] = 48rem): الـ nav بقى عمود ([[flex-direction: column]]) والزرار «ابدأ» اختفى ([[display: none]]). فوق 768 رجع صف والزرار ظاهر [[inline-flex]] ونصه باهت لأنه [[disabled]].

الغلط الشائع إنك تكتب [[md:hidden]] وتتوقعه يخفي على الموبايل: md معناها «من 768 وأكبر»، مش «على الموبايل». الإخفاء على الموبايل بس = [[max-md:hidden]] أو [[hidden md:block]] زي المثال.`
        },
        {
          cmd: "arbitrary values",
          title: "قيمة مش موجودة في الـ theme؟",
          desc: R`لو محتاج قيمة مرة واحدة: حطها بين أقواس مربعة [[w-[327px]]] و [[bg-[#1da1f2]]] و [[grid-cols-[240px_1fr]]] (الـ [[_]] = مسافة). ومتغير CSS بقوسين عاديين: [[bg-(--brand)]]. وخاصية مش موجودة خالص: [[[-webkit-tap-highlight-color:transparent]]].

ولو هتكررها، اعملها utility باسم بـ [[@utility]] في ملف الـ CSS.`,
          example: R`<div className="grid grid-cols-[240px_1fr] gap-6">
  <aside className="sticky top-[calc(4rem+1px)] h-[calc(100dvh-4rem)]">...</aside>
  <main className="max-w-[72ch] text-[clamp(1rem,0.9rem+0.5vw,1.125rem)]">...</main>
</div>
<span className="bg-(--brand) [-webkit-tap-highlight-color:transparent]">...</span>
// globals.css
@utility container-app {
  width: 100%;
  max-width: 75rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}`,
          try: R`جرّب [[bg-[#ff0]]] على عنصر وشوف القاعدة في الـ CSS الناتج. وبعدين اعمل [[container-app]] بـ [[@utility]] واستخدمها مع [[md:]] وشوفها شغالة زي أي كلاس.`,
          flag: "script",
          deep: {
            why: "الـ theme بيغطي أغلب اللي محتاجه، بس دايمًا فيه قيمة من الديزاين مش على الـ scale (ارتفاع هيدر 72، أو عرض عمود 240). بدل ما تسيب Tailwind وتكتب CSS منفصل، بتكتبها في نفس المكان.",
            how: R`Tailwind بيشوف [[w-[327px]]] في الكود ويطلّع قاعدة [[width: 327px]]. القيمة بتتحط زي ما هي، فلازم تبقى CSS صالح ومن غير مسافات (المسافة بتقسم الكلاس لاتنين)، عشان كده [[_]] بتتحول لمسافة.

لو القيمة ممكن تتفهم أكتر من طريقة ([[text-(--x)]] لون ولا حجم؟) تقدر تحدد النوع: [[text-(length:--x)]] أو [[text-(color:--x)]].

[[bg-(--brand)]] هو الشكل المختصر في v4 لـ [[bg-[var(--brand)]]]. ودي أحسن طريقة لقيم جاية من JavaScript: تبعت المتغير في [[style]] وتستخدمه في الكلاس، فالكلاس يفضل ثابت ومكتوب كامل و Tailwind يشوفه.

[[@utility]] بتعمل كلاس حقيقي جوه layer الـ utilities، فبيتعامل زي أي utility: بيقبل variants، وبيترتب صح. ودا بديل [[@layer components { .btn {...} }]] بتاعة v3 للحاجات الصغيرة.`,
            when: R`arbitrary لقيمة مرة واحدة. لو القيمة اتكررت 3 مرات، خليها توكن في [[@theme]] أو [[@utility]].`,
            mistakes: R`مشروع كله arbitrary values ([[text-[17px]]] و [[mt-[13px]]] في كل حتة): رجعت لـ CSS عادي بس أصعب في القراية، والتصميم بيفقد الاتساق. ومسافة جوه الأقواس فالكلاس يتقسم. و [[bg-[--brand]]] (شكل v3) في v4: اكتب [[bg-(--brand)]]. و [[@utility]] جوه [[@supports]] أو [[@media]] أو [[@layer]]: [[cannot be nested]] وكل الصفحات 500؛ الشرط يتحط **جوه** الـ [[@utility]].`
          },
          teach: R`## القيمة بين الأقواس بتتنسخ زي ما هي

[[w-[327px]]] معناها: utility العرض، بس القيمة مش من الـ theme، خدها من بين الأقواس المربعة. حطينا المثال في [[App.tsx]] بتاع مشروع Vite (Tailwind 4.3.3)، و [[@utility]] في [[src/index.css]]، وعملنا build وقرينا القواعد اللي طلعت، وقسنا في Chrome على شاشة 1200 × 800.

---

## ١. [[grid-cols-[240px_1fr]]]

~~~text من الـ CSS الناتج
.grid-cols-\[240px_1fr\]{grid-template-columns:240px 1fr}
~~~

الـ [[_]] اتحولت مسافة. ليه مكتبناش مسافة على طول؟ لأن الـ className بيتقسم كلاسات عند المسافات. و [[\[]] في اسم الكلاس escape عشان الأقواس ليها معنى في الـ CSS. على 1200: الأعمدة [[240px 936px]] (1200 - 240 - 24 gap).

## ٢. الـ aside

~~~text App.tsx
<aside className="sticky top-[calc(4rem+1px)] h-[calc(100dvh-4rem)]">...</aside>
~~~

~~~text من الـ CSS الناتج
.top-\[calc\(4rem\+1px\)\]{top:calc(4rem + 1px)}
.h-\[calc\(100dvh-4rem\)\]{height:calc(100dvh - 4rem)}
~~~

Tailwind حط المسافات حوالين [[+]] و [[-]] لوحده (calc لازم مسافات حوالين الجمع والطرح). والمتقاس: [[top: 65px]] (64 + 1، تحت هيدر 64 وخط 1)، و [[height: 736px]] (800 - 64).

## ٣. الـ main

~~~text App.tsx
<main className="max-w-[72ch] text-[clamp(1rem,0.9rem+0.5vw,1.125rem)]">...</main>
~~~

- [[ch]] وحدة = عرض حرف الصفر في الخط الحالي، فـ [[72ch]] حوالي 72 حرف في السطر.
- [[text-[clamp(...)]]]: Tailwind فهم إن القيمة طول، فعملها [[font-size]].

| العرض | font-size | max-width (72ch) |
|---|---|---|
| 600 | 17.4px (14.4 + 3) | 675.34px |
| 1200 | 18px (الـ MAX) | 698.63px |

لاحظ إن [[72ch]] بتكبر مع الخط: نفس الـ 72 حرف.

## ٤. [[bg-(--brand)]] و property كاملة

~~~text App.tsx
<span className="bg-(--brand) [-webkit-tap-highlight-color:transparent]">...</span>
~~~

~~~text من الـ CSS الناتج
.bg-\(--brand\){background-color:var(--brand)}
.\[-webkit-tap-highlight-color\:transparent\]{-webkit-tap-highlight-color:transparent}
~~~

- [[bg-(--brand)]]: القوسين العاديين = اسم متغير، فبقت [[var(--brand)]]. عرّفنا [[--brand]] في [[:root]]، والخلفية المتقاسة [[oklch(0.55 0.2 265)]].
- [[[خاصية:قيمة]]]: كلاس كله بين أقواس مربعة = سطر CSS كامل. [[-webkit-tap-highlight-color]] لون الومضة اللي بتظهر لما تلمس لينك على الموبايل، و [[transparent]] بتلغيها.

## ٥. [[@utility]]

~~~text globals.css
@utility container-app {
  width: 100%;
  max-width: 75rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}
~~~

بيعمل كلاس اسمه [[container-app]] بيتعامل زي أي utility. استخدمناه بـ [[md:container-app]] بس، فطلع كده:

~~~text من الـ CSS الناتج
@media (width>=48rem){.md\:container-app{width:100%;max-width:75rem;margin-inline:auto;padding-inline:1.25rem}}
~~~

| العرض | عرض العنصر | left | padding |
|---|---|---|---|
| 600 | 600 | 0 | 0px (الشرط مش متحقق) |
| 1200 | 1200 | 0 | 20px |
| 2000 | 1200 (= 75rem) | 400 | 20px |

---

## التجربة: [[bg-[#ff0]]] ومسافة غلط

~~~text من الـ CSS الناتج
.bg-\[\#ff0\]{background-color:#ff0}
~~~

الخلفية المتقاسة [[rgb(255, 255, 0)]] (أصفر). وجربنا [[w-[calc(4rem + 1px)]]] بمسافات: مطلعش ليها **ولا قاعدة** في الـ CSS، والعنصر فضل بعرض الصفحة كلها. المسافة قسمت الكلاس لـ ٣ كلمات مش مفهومين.

## فخ: [[@utility]] جوه [[@supports]] = كل الصفحات 500

### العَرَض

عايز كلاس [[glass]] (خلفية شفافة مع blur) يشتغل بس في المتصفحات اللي بتدعم [[backdrop-filter]]، فكتبت في [[globals.css]]:

~~~css globals.css (بايظ)
@supports (backdrop-filter: blur(4px)) {
  @utility glass {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

وحفظت. [[curl]] على أي صفحة:

~~~text curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://localhost:4311/ar
HTTP: 500
~~~

**كل** الصفحات، مش اللي فيها [[glass]] بس، لأن [[globals.css]] متستورد في [[layout.tsx]] اللي بيلف كل حاجة.

### التشخيص: اللوج مش المتصفح

~~~text sed 's/\x1b\[[0-9;]*m//g' dev.log | tail -50   (Next 16.4.4 و Tailwind 4.3.4 على ويندوز)
⨯ ./app/globals.css
Error: Error evaluating Node.js code
Error: $__bt@utility$__bt cannot be nested.
    [at C:\...\node_modules\tailwindcss\dist\lib.js:32:3317]
    ...
    [at async E (C:\...\node_modules\@tailwindcss\turbopack\dist\index.js:1:2599)]

 GET /ar 500 in 22ms (next.js: 12ms, application-code: 10ms)
~~~

- [[./app/globals.css]]: الملف اللي فيه المشكلة.
- [[$__bt@utility$__bt cannot be nested.]]: الرسالة نفسها، من Tailwind ([[tailwindcss\dist\lib.js]]).
- [[@tailwindcss\turbopack]]: الحتة اللي بتشغّل Tailwind جوه Next 16.4 (القالب الجديد بتاع [[create-next-app]] بيستخدم [[@tailwindcss/turbopack]] في [[next.config.ts]]).

ونفس الملف من غير Next خالص، بـ CLI بتاع Tailwind في [[docker run node:22-slim]]:

~~~text npx @tailwindcss/cli -i in.css -o out.css
≈ tailwindcss v4.3.4

Error:
│ Error: $__bt@utility$__bt cannot be nested.
~~~

ورقم الخروج [[1]]. يعني المشكلة في Tailwind مش في Next. وجربنا نفس الحكاية جوه [[@media (min-width: 40rem)]] وجوه [[@layer components]]: نفس الخطأ بالظبط. و [[@utility .glass]] (بنقطة) طلّع خطأ تاني: [[$__bt@utility .glass$__bt defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.]]

### السبب

[[@utility]] مش CSS. ده تعليمة لـ Tailwind: «سجّل كلاس اسمه [[glass]]، وطلّعه في layer الـ utilities، وطلّع منه نسخ للـ variants ([[md:glass]] و [[hover:glass]])». عشان يعمل ده لازم يبقى في **أعلى مستوى** في الملف. لو جوه [[@supports]]، Tailwind مش هيعرف يحط [[md:glass]] فين (جوه الـ [[@supports]]؟ ولا [[@media]] جوه [[@supports]]؟)، فبيرفض.

### الحل: اقلبها، [[@supports]] جوه [[@utility]]

~~~css globals.css (سليم)
@utility glass {
  background-color: rgb(255 255 255 / 0.9);
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

- برا الـ [[@supports]]: الشكل لأي متصفح (أبيض شبه مصمت عشان الكلام يتقري من غير blur).
- جوه: لو المتصفح بيدعم، blur وشفافية أكتر.

~~~text curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://localhost:4311/ar
HTTP: 200
~~~

والـ CSS اللي اتولّد (من ملف الـ CSS اللي الصفحة بتطلبه):

~~~text الناتج
  .glass {
    background-color: #ffffffe6;
  }

  @supports ((-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px))) {
    .glass {
      -webkit-backdrop-filter: blur(12px);
      backdrop-filter: blur(12px);
      background-color: #fff9;
    }
  }
~~~

Tailwind (بـ Lightning CSS) زوّد نسخة [[-webkit-]] للشرط وللخاصية (Safari القديم)، وحوّل [[rgb(255 255 255 / 0.9)]] لـ [[#ffffffe6]] (نفس اللون: [[e6]] = 230 من 255 = 0.9). واستخدمنا [[md:glass]] كمان: طلع [[.md\:glass]] جوه [[@media]] وجواه نفس الـ [[@supports]]. ده اللي مكنش هيحصل لو كتبتها [[.glass]] عادي جوه [[@supports]].

### البدايل

| البديل | امتى | العيب |
|---|---|---|
| [[@supports]] جوه [[@utility]] | كلاس هيتكرر وعايزه بـ variants | مفيش، ده الشكل الصح في v4 |
| [[supports-[backdrop-filter]:backdrop-blur-md]] في الـ HTML | مرة أو اتنين | الكلاسات بتطول. وجربناه: طلّع [[@supports (backdrop-filter: var(--tw))]] |
| [[.glass]] CSS عادي جوه [[@supports]] | مشروع من غير Tailwind | [[md:glass]] و [[hover:glass]] مش هيشتغلوا، وترتيبه مع الـ utilities مش مضمون |
| [[@layer components { ... }]] | شكل v3 | جوه [[@layer]] نفس الخطأ لو حطيت [[@utility]] |

### إزاي متتكررش

- بعد أي تعديل في [[globals.css]]: [[curl -w "%{http_code}"]] على صفحة واحدة (درس «التعديل وصل؟ curl و grep» في تاب web).
- [[grep -n "@utility" app/globals.css]]: كل سطر لازم يبدأ من أول العمود (مفيش مسافات قبله). مسافة قبل [[@utility]] = غالبًا جوه حاجة.
- القاعدة: [[@utility]] في أعلى الملف، وأي شرط ([[@supports]] و [[@media]]) **جواه**.

## الخلاصة

| الكتابة | المعنى |
|---|---|
| [[w-[327px]]] | قيمة مباشرة بتتنسخ زي ما هي |
| [[grid-cols-[240px_1fr]]] | [[_]] بتتحوّل مسافة في الـ CSS |
| [[bg-(--brand)]] | بيبقى [[var(--brand)]]: متغير CSS |
| [[[خاصية:قيمة]]] | خاصية مش موجودة في Tailwind |
| [[@utility اسم {...}]] | كلاس جديد بيقبل variants |

- مفيش مسافات جوه الأقواس أبدًا. والقيمة اللي بتتكرر خليها توكن أو [[@utility]].`,
          lines: [
            R`عمودين: 240 ثابت والباقي. [[_]] مكان المسافة لأن الكلاس مينفعش فيه مسافة.`,
            "sticky تحت هيدر 64px، وارتفاعه الشاشة ناقص الهيدر.",
            "عرض مريح للقراية (حوالي 72 حرف)، وخط fluid بـ clamp.",
            R`قفلة الـ grid اللي فيه العمودين ([[aside]] و [[main]]).`,
            "لون من متغير CSS بالقوسين العاديين، وخاصية كاملة مش موجودة في Tailwind بين أقواس مربعة.",
            R`utility جديدة باسم، بتتعامل زي أي كلاس: [[md:container-app]] شغالة.`,
            R`العرض كله المتاح ([[100%]]) على الشاشات الصغيرة...`,
            R`...بس مايزيدش عن [[75rem]] (1200px لو الخط 16) على الشاشات الكبيرة.`,
            R`[[margin-inline: auto]] يقسم المسافة الفاضية بين الجنبين، فالمحتوى يبقى في النص.`,
            "مسافة من الجنبين (بتتقلب مع RTL).",
            "قفلة."
          ],
          sol: R`[[bg-[#ff0]]] بيدّي خلفية صفرا، وفي الـ CSS الناتج هتلاقي القاعدة بالشكل ده: [[.bg-\[\#ff0\] { background-color: #ff0; }]]. الأقواس و الـ [[#]] اتعمل لهم escape بـ backslash عشان يبقوا selector صحيح.

الـ [[@utility container-app]] بيطلع كلاس عادي في layer الـ utilities، ولما تستخدم [[md:container-app]] Tailwind بيولّد نسخة تانية جوه [[@media (width >= 48rem)]] بنفس الخصائص، زي أي كلاس جاهز. على الشاشة: المحتوى بقى في النص وعرضه أقصى 75rem وحواليه padding.

لو القيمة الـ arbitrary ملهاش أي تأثير: غالبًا فيه مسافة جوه الأقواس ([[bg-[#ff 0]]] أو [[calc(4rem + 1px)]])، والمسافة بتقسم الكلاس لكلاسين. استخدم [[_]] مكان المسافة. ولو [[@utility]] رفض يشتغل، اتأكد إن الاسم مفيهوش [[.]] قبله وإنه مش جوه [[@layer]].

لو كل الصفحات بقت 500 بعد تعديل [[globals.css]]: [[tail -50 dev.log]] غالبًا فيه [[$__bt@utility$__bt cannot be nested.]]، يعني [[@utility]] جوه [[@supports]] أو [[@media]] أو [[@layer]]. اقلبها: [[@utility glass { ... @supports (...) { ... } }]]، والصفحة ترجع [[200]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيحصل لكل واحد؟ (١) [[@media (min-width: 40rem) { @utility card { padding: 2rem; } }]] (٢) [[@utility card { padding: 1rem; @media (min-width: 40rem) { padding: 2rem; } }]] (٣) [[@utility .card { padding: 1rem; }]]. اكتب التلاتة وبعدين جرّب بـ [[npx @tailwindcss/cli -i in.css -o out.css]].`, done: R`(١) [[cannot be nested]]، و (٢) نجح وفي [[out.css]] قاعدة [[.card]] وجواها [[@media]]، و (٣) [[defines an invalid utility name]]. وكل واحد طابق توقعك أو كاتب ليه لأ.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح الملف ده من غير ما تغيّر الشكل النهائي: [[@supports (backdrop-filter: blur(4px)) { @utility glass { backdrop-filter: blur(12px); } }]]، واستخدم [[glass]] و [[md:glass]] في صفحة. أثبت بـ [[curl]] إن الصفحة [[200]]، وبـ [[grep]] على ملف الـ CSS إن [[backdrop-filter]] موجود جوه [[@supports]] للاتنين.`, done: R`[[curl -w "%{http_code}"]] بيطبع [[200]]، و [[grep -c "backdrop-filter: blur(12px)"]] على الـ CSS أكبر من أو يساوي ٢ (للكلاسين)، وفيه [[.md\:glass]].` },
            { lvl: 'تطبيق', t: R`**ابني:** بطاقة «زجاج» فوق صورة خلفية بـ [[@utility glass]] (اللي في الدرس)، وافتحها في Chrome، وبعدين من DevTools › Rendering اقفل الـ [[backdrop-filter]] أو جرّب متصفح مش بيدعمه. الكلام لازم يفضل مقري في الحالتين.`, done: R`صورتين: واحدة فيها blur، وواحدة من غيره والخلفية شبه مصمتة ([[0.9]])، والكلام واضح في الاتنين.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[check-utility.mjs]]: بيقرا ملف CSS ويعدّ عمق الأقواس [[{ }]] سطر سطر، ولو لقى [[@utility]] والعمق مش صفر يطبع رقم السطر والـ at-rule اللي حواليه ويخرج بـ 1. جرّبه على الملف البايظ والسليم.`, done: R`على البايظ بيطبع حاجة زي [[line 2: @utility inside @supports]] ويخرج 1، وعلى السليم ميطبعش حاجة ويخرج 0 (زي فحص الـ ci في الدرس).` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[<div class="grid grid-cols-[240px 1fr]">]] والـ div طالع عمود واحد بعرض الصفحة كلها. ابني واعمل grep على [[out.css]] بـ [[grid-cols-]].`, done: R`مفيش أي قاعدة لـ [[grid-cols-[240px]]: المسافة قسمت الكلاس لاتنين ([[grid-cols-[240px]] و [[1fr]]])، والاتنين مش كلاسات صح. بعد [[grid-cols-[240px_1fr]]] القاعدة اتولّدت و [[gridTemplateColumns]] بقت [[240px 1040px]] على 1280.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import fs from "node:fs";
fs.writeFileSync("bad.css", '@import "tailwindcss";\n@supports (backdrop-filter: blur(4px)) {\n  @utility glass {\n    backdrop-filter: blur(12px);\n  }\n}\n');
fs.writeFileSync("good.css", '@import "tailwindcss";\n@utility glass {\n  background-color: rgb(255 255 255 / 0.9);\n  @supports (backdrop-filter: blur(4px)) {\n    backdrop-filter: blur(12px);\n  }\n}\n');
function check(file) {
  const stack = []; const found = [];
  fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    const at = (line.match(/@[\w-]+/) || [""])[0];
    if (at === "@utility" && stack.length) found.push("line " + (i + 1) + ": @utility inside " + stack[stack.length - 1]);
    for (const ch of line) { if (ch === "{") stack.push(at || "block"); if (ch === "}") stack.pop(); }
  });
  console.log(file + ": " + (found.length ? found.join("; ") : "ok"));
}
check("bad.css");
check("good.css");`, expect: [R`bad.css: line 3: @utility inside @supports`, R`good.css: ok`] },
          ],
        },
        {
          cmd: "group و peer",
          title: "غيّر شكل ابن لما الأب أو الأخ يتغير",
          desc: R`[[group]] على الأب، و [[group-hover:]] على أي ابن: الابن يتغير لما الماوس ييجي على الأب. مثالي للكارت: السهم يتحرك والعنوان يتلوّن لما تقف على الكارت كله.

و [[peer]] على عنصر، و [[peer-user-invalid:]] أو [[peer-checked:]] على أخ جاي بعده: رسالة خطأ تظهر لما الحقل اللي قبلها غلط، من غير ولا سطر JavaScript.`,
          example: R`<a href="/courses/1" className="group block rounded-xl border p-5 hover:border-brand">
  <h3 className="font-bold group-hover:text-brand">كورس React</h3>
  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
</a>
<label className="grid gap-1">
  <span>الإيميل</span>
  <input type="email" required className="peer rounded border px-3 py-2" />
  <span className="invisible text-sm text-red-600 peer-user-invalid:visible">إيميل مش صحيح</span>
</label>`,
          try: R`اعمل الكارت ده وقف عليه بالماوس. وبعدين اكتب إيميل غلط واخرج من الحقل: الرسالة هتظهر. جرّب [[peer-invalid:]] بدل [[peer-user-invalid:]] وشوف الفرق: الرسالة هتظهر من أول ما الصفحة تفتح.`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** شبكة ٦ كروت «مشاكل وحلول»، كل كارت جواه دايرة زينة [[group-hover:scale-150]]، ومفيش حاجة بتتحرك أبدًا. الـ CSS اتولّد (grep بيلاقي [[group-hover\:scale-150]]). لاقي الناقص.`, done: R`الكارت ناقصه كلاس [[group]]، والقاعدة اللي اتولّدت [[:where(.group):hover .group-hover\:scale-150]] مستنية جد اسمه group. بعد ما زوّدته على الـ article الدايرة بتكبر.` },
            { lvl: 'تطبيق', t: R`**ابني:** حقل بـ floating label: [[<input placeholder=" " class="peer">]] وبعده [[<label>]] بيتحرك فوق بـ [[peer-focus:]] و [[peer-not-placeholder-shown:]].`, done: R`الـ label جوه الحقل وهو فاضي، وبيطلع فوق لما تدوس أو تكتب، وبيفضل فوق لو فيه كلام وخرجت، و Tab بيعمل نفس الحركة، ومفيش JavaScript.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[<span class="peer-invalid:visible invisible">خطأ</span><input class="peer" required>]] (الرسالة **قبل** الحقل). هتظهر؟ ليه؟`, done: R`مش هتظهر أبدًا: [[peer-*]] بيتحول لـ [[~]] في CSS، والـ [[~]] بيختار الإخوات اللي **بعد** العنصر بس. بعد ما نقلت الرسالة بعد الـ input اشتغلت.` },
            { lvl: 'تطبيق', t: R`**ابني:** section عليه [[group/section]] وجواه كروت عليها [[group/card]]: لما تقف على الـ section الكروت كلها تفتح شوية، ولما تقف على كارت عنوانه هو بس يتلوّن، بـ [[group-hover/section:]] و [[group-hover/card:]].`, done: R`الحالتين شغالين مع بعض من غير تداخل، و grep على [[out.css]] بيلاقي [[.group\/card]] و [[.group\/section]] في الـ selectors.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اختيار باقة بـ radio cards: مرة بـ [[peer-checked:]] (الـ input قبل الكارت) ومرة بـ [[has-checked:]] على الـ label نفسه (الـ input جواه). أنهي واحدة بتشتغل لو الـ input في آخر الكارت؟`, done: R`[[has-checked:]] شغالة في أي مكان جوه الـ label لأنها [[:has(:checked)]]، و [[peer-checked:]] شغالة بس على اللي بعد الـ input. وكتبت إن [[:has()]] مدعومة في المتصفحات الحديثة كلها (Baseline 2023، من MDN).` },
          ],
          deep: {
            why: R`حالات زي «لما تقف على الكارت السهم يتحرك» كانت محتاجة CSS منفصل بـ selector زي [[.card:hover .arrow]]، أو state في React. group و peer بيعملوها بكلاسات على العناصر نفسها.`,
            how: R`[[group]] مش بيعمل أي CSS لوحده، هو علامة. و [[group-hover:text-brand]] بيطلع selector معناه «لو فيه جد عليه group وعليه hover».

لو فيه groups جوه بعض (كارت جوه قايمة كلها hover)، سمّيهم: [[group/card]] على الأب و [[group-hover/card:]] على الابن.

[[peer]] بيستخدم الـ sibling combinator [[~]] في CSS، ودا بيشتغل على الإخوات اللي بعده بس. عشان كده لازم الـ peer ييجي الأول في الـ HTML، ومينفعش label قبل input يتغير حسب الـ input بـ peer (هنا [[:has()]] بيحل: [[has-[:user-invalid]:text-red-600]] على الأب، درس في المستوى التالت).

[[:invalid]] بتتطبق من أول ما الصفحة تفتح (الحقل الفاضي اللي عليه required يعتبر invalid). [[:user-invalid]] بتستنى لحد ما المستخدم يعدّل ويخرج أو يحاول يبعت، ودي اللي عايزها للرسايل (variant [[user-invalid:]] موجود من Tailwind v4.1).`,
            when: "كروت ولينكات كبيرة فيها أجزاء بتتفاعل. رسايل الـ validation وتنسيق الحقول، و checkbox و toggle مخصصين بالـ CSS بس.",
            mistakes: R`الـ peer بعد العنصر اللي عايزه يتغير فمش بيشتغل ومفيش error. groups جوه بعض من غير أسماء فالابن يتفاعل مع الجد الغلط. و [[peer-invalid:]] فالحقول كلها حمرا أول ما الصفحة تفتح.`
          },
          teach: R`## عنصر بيتغير بسبب حالة عنصر تاني

العادي إن [[hover:]] بيغيّر العنصر اللي الماوس فوقه بس. [[group]] و [[peer]] بيخلّوا عنصر يتغير بحالة **أبوه** أو **أخوه اللي قبله**. حطينا المثال في [[App.tsx]] بتاع مشروع Vite (Tailwind 4.3.3، والصفحة [[dir="rtl"]] وعرضها 800)، والسهم بدل [[ArrowLeft]] بتاع lucide حطينا component صغير بيرسم SVG سهم بنفس الـ className (lucide بيعمل نفس الحاجة). وجربنا بالماوس والكيبورد في Chrome.

---

## ١. الكارت: [[group]]

~~~text App.tsx
<a href="/courses/1" className="group block rounded-xl border p-5 hover:border-brand">
  <h3 className="font-bold group-hover:text-brand">كورس React</h3>
  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
</a>
~~~

- [[group]] على اللينك: مش بيطلّع أي CSS لوحده. هو علامة بتقول «أنا الأب اللي الأولاد هيسألوا عنه».
- [[block]] = [[display: block]]، عشان اللينك ياخد عرض السطر ويبقى كارت. [[border]] و [[p-5]] (20px padding) و [[rounded-xl]].
- [[hover:border-brand]]: الـ border نفسه يتلوّن لما الماوس على اللينك.
- [[group-hover:text-brand]]: العنوان يتلوّن لما الماوس على **الأب** اللي عليه group.
- [[size-4]] = عرض وارتفاع 16px. [[transition-transform]] = التحريك يحصل بنعومة. [[-translate-x-1]] = حرّك 4px ناحية الشمال (السالب على محور x).

القاعدة اللي طلعت:

~~~text من الـ CSS الناتج
@media (hover:hover){.group-hover\:text-brand:is(:where(.group):hover *){color:var(--color-brand)}}
~~~

[[:where(.group):hover *]] = «أي عنصر جوه حد عليه [[.group]] والماوس فوقه». والمسافة قبل [[*]] معناها «جوه، في أي عمق».

وقفنا بالماوس على الركن التحتاني للكارت، بعيد عن العنوان والسهم:

| | قبل | وقت الـ hover |
|---|---|---|
| لون العنوان | rgb(0, 0, 0) | oklch(0.55 0.2 265) |
| لون الـ border | rgb(0, 0, 0) | oklch(0.55 0.2 265) |
| [[translate]] السهم | none | -4px |
| مكان السهم (left) | 763 | 759 |

في الصفحة العربي السهم على الشمال، و 4px لناحية الشمال = لقدام.

## ٢. الإيميل: [[peer]]

~~~text App.tsx
<label className="grid gap-1">
  <span>الإيميل</span>
  <input type="email" required className="peer rounded border px-3 py-2" />
  <span className="invisible text-sm text-red-600 peer-user-invalid:visible">إيميل مش صحيح</span>
</label>
~~~

- [[<label>]] حوالين الحقل = الكلام اللي جواه اسم الحقل. و [[grid gap-1]] = فوق بعض بمسافة 4px.
- [[type="email"]] و [[required]]: المتصفح نفسه بيفحص إن فيه إيميل صالح.
- [[peer]] على الـ input: علامة زي group، بس للإخوات.
- [[invisible]] = [[visibility: hidden]]: مستخبية بس مكانها محجوز، فالصفحة متتنطش لما تظهر.
- [[peer-user-invalid:visible]] = تظهر لما الأخ اللي عليه peer يبقى [[:user-invalid]].

~~~text من الـ CSS الناتج
.peer-user-invalid\:visible:is(:where(.peer):user-invalid~*){visibility:visible}
~~~

[[~]] في CSS = «أخ جاي بعده». عشان كده الـ peer لازم ييجي قبل الرسالة في الـ HTML.

## ٣. التجربة: [[peer-invalid:]] ضد [[peer-user-invalid:]]

حطينا رسالتين تحت نفس الحقل، واحدة بكل variant، وقرينا [[visibility]] لكل واحدة:

| الخطوة | [[:invalid]] | [[:user-invalid]] | الرسالة بـ [[peer-user-invalid:]] | الرسالة بـ [[peer-invalid:]] |
|---|---|---|---|---|
| الصفحة لسه فاتحة | true | false | hidden | **visible** |
| بتكتب [[ahmed]] | true | false | hidden | visible |
| خرجت بـ Tab | true | true | **visible** | visible |
| كتبت [[ahmed@example.com]] وخرجت | false | false | hidden | hidden |

- [[:invalid]] شغالة من أول ما الصفحة تفتح: الحقل فاضي وعليه required، فالرسالة ظاهرة قبل ما المستخدم يعمل أي حاجة.
- [[:user-invalid]] بتستنى لحد ما المستخدم يعدّل ويخرج من الحقل.

## الخلاصة

| على المصدر | على اللي بيتغير | بيشتغل لما |
|---|---|---|
| [[group]] | [[group-hover:]] | الماوس على الأب (أو أي جد عليه group) |
| [[peer]] | [[peer-user-invalid:]] | الأخ اللي قبله غلط بعد ما المستخدم اتعامل معاه |

- الـ peer لازم ييجي **قبل** العنصر اللي بيتغير، ويكونوا إخوات.
- للرسايل استخدم [[user-invalid]] مش [[invalid]].`,
          lines: [
            R`الكارت كله لينك، و [[group]] بيعلّمه كأب.`,
            "العنوان يتلوّن لما الماوس ييجي على أي حتة في الكارت.",
            R`السهم (من lucide) يتحرك لقدام شوية. في صفحة عربي «لقدام» = شمال.`,
            R`قفلة الكارت اللي عليه [[group]]: أي ابن جواه يقدر يسأل عن حالته.`,
            "label حوالين الحقل والرسالة.",
            R`اسم الحقل «الإيميل»، وهو جوه الـ label فمش محتاج [[for]] ولا [[id]].`,
            R`[[peer]]: الإخوات اللي بعد الحقل ده يقدروا يسألوا عن حالته.`,
            "مخفية، وتظهر لما الحقل يبقى غلط بعد ما المستخدم يتعامل معاه.",
            R`قفلة الـ label: الحقل والرسالة إخوات جواه، والرسالة **بعد** الحقل، ودا شرط [[peer]].`
          ],
          sol: R`لما تقف على الكارت في أي حتة (مش على العنوان بس): العنوان بيتلوّن بلون الـ brand والسهم بيتحرك 4px (شمال في المثال). ده لأن الـ hover على الأب اللي عليه [[group]]، والأبناء بيسمعوا له.

الإيميل: الصفحة بتفتح والرسالة مستخبية. اكتب [[ahmed]]: وانت بتكتب الرسالة لسه مستخبية. اخرج من الحقل بـ Tab: «إيميل مش صحيح» ظهرت، لأن [[:user-invalid]] بيتحقق بس بعد ما المستخدم يتعامل مع الحقل ويخرج منه. مع [[peer-invalid:]]: الرسالة ظاهرة من أول ما الصفحة تفتح والحقل فاضي، لأن الحقل [[required]] وفاضي فهو [[:invalid]] من الأول.

لو الرسالة مش بتظهر خالص: اتأكد إن الـ span جاي بعد الـ input في الـ HTML وإنهم إخوات (نفس الأب)، لأن [[peer]] بيشتغل بـ [[~]] اللي بيشوف الإخوات اللي بعده بس.`
        }
      ]
    }
]);

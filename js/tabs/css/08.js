// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Tailwind CSS v4",
      l: 2,
      n: "Tailwind بيقرا الكلاسات من ملفاتك ويطلّع CSS للي استخدمته بس، والتوكنز والإعداد كلهم في ملف CSS",
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
            "إعداد Vite.",
            "plugin الـ React.",
            "plugin الـ Tailwind.",
            "ضيفه جنب React، وده كل الإعداد في Vite.",
            "السطر الوحيد في ملف الـ CSS: بيجيب الـ theme والـ reset (Preflight) والـ utilities.",
            "زرار كامل من غير ولا سطر CSS: تدوير، وخلفية، ومسافات، ولون كلام، ولون عند الـ hover.",
            "في Next.js: PostCSS بالـ plugin بتاعه، و [[@import]] نفسه في globals.css."
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
            "Tailwind الأول.",
            "التوكنز.",
            R`[[bg-brand]] و [[text-brand]] و [[ring-brand]]... وكمان [[bg-brand/50]] بشفافية.`,
            R`[[bg-brand-soft]].`,
            R`[[font-display]].`,
            R`[[rounded-card]].`,
            R`breakpoint جديد: [[3xl:grid-cols-6]].`,
            "قفلة.",
            "توكنز بتشاور على متغيرات تانية.",
            R`[[bg-bg]] بتاخد [[var(--bg)]] نفسه، فلما [[--bg]] يتغير في الـ dark mode الكلاس يتغير.`,
            R`[[text-fg]].`,
            "قفلة.",
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

| الـ variant | بيتحول لـ |
|---|---|
| [[hover:]] | [[:hover]] جوه [[@media (hover:hover)]] |
| [[focus-visible:]] | [[:focus-visible]] |
| [[md:]] | [[@media (width>=48rem)]] |
| [[dark:]] | [[@media (prefers-color-scheme:dark)]] |
| [[disabled:]] | [[:disabled]] |
| [[*:]] | الأولاد المباشرين |

- الكلاس من غير prefix للموبايل، و [[md:]] من 768 وطالع.
- [[focus-visible:]] مش [[focus:]] عشان الـ outline يظهر مع الكيبورد بس.`,
          lines: [
            "على الموبايل عمود، ومن md صف متوسّط بمسافات أكبر.",
            "لينك: لون عادي، وخلفية عند الـ hover، و outline لما ياخد focus من الكيبورد، وألوان تانية في الوضع الغامق.",
            "النص.",
            "قفلة.",
            "مستخبي على الموبايل وبيظهر من md. ولما يبقى disabled: شفاف والماوس ممنوع.",
            "النص.",
            "قفلة.",
            R`[[*:]] = على كل الأولاد المباشرين: خط تحت كل واحد، إلا الأخير.`,
            "قفلة."
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
            mistakes: R`مشروع كله arbitrary values ([[text-[17px]]] و [[mt-[13px]]] في كل حتة): رجعت لـ CSS عادي بس أصعب في القراية، والتصميم بيفقد الاتساق. ومسافة جوه الأقواس فالكلاس يتقسم. و [[bg-[--brand]]] (شكل v3) في v4: اكتب [[bg-(--brand)]].`
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

## الخلاصة

| الكتابة | المعنى |
|---|---|
| [[w-[327px]]] | قيمة مباشرة |
| [[grid-cols-[240px_1fr]]] | [[_]] = مسافة |
| [[bg-(--brand)]] | [[var(--brand)]] |
| [[[خاصية:قيمة]]] | خاصية مش موجودة في Tailwind |
| [[@utility اسم {...}]] | كلاس جديد بيقبل variants |

- مفيش مسافات جوه الأقواس أبدًا. والقيمة اللي بتتكرر خليها توكن أو [[@utility]].`,
          lines: [
            R`عمودين: 240 ثابت والباقي. [[_]] مكان المسافة لأن الكلاس مينفعش فيه مسافة.`,
            "sticky تحت هيدر 64px، وارتفاعه الشاشة ناقص الهيدر.",
            "عرض مريح للقراية (حوالي 72 حرف)، وخط fluid بـ clamp.",
            "قفلة.",
            "لون من متغير CSS بالقوسين العاديين، وخاصية كاملة مش موجودة في Tailwind بين أقواس مربعة.",
            R`utility جديدة باسم، بتتعامل زي أي كلاس: [[md:container-app]] شغالة.`,
            "عرض كامل...",
            "...لحد 1200px.",
            "في النص.",
            "مسافة من الجنبين (بتتقلب مع RTL).",
            "قفلة."
          ],
          sol: R`[[bg-[#ff0]]] بيدّي خلفية صفرا، وفي الـ CSS الناتج هتلاقي القاعدة بالشكل ده: [[.bg-\[\#ff0\] { background-color: #ff0; }]]. الأقواس و الـ [[#]] اتعمل لهم escape بـ backslash عشان يبقوا selector صحيح.

الـ [[@utility container-app]] بيطلع كلاس عادي في layer الـ utilities، ولما تستخدم [[md:container-app]] Tailwind بيولّد نسخة تانية جوه [[@media (width >= 48rem)]] بنفس الخصائص، زي أي كلاس جاهز. على الشاشة: المحتوى بقى في النص وعرضه أقصى 75rem وحواليه padding.

لو القيمة الـ arbitrary ملهاش أي تأثير: غالبًا فيه مسافة جوه الأقواس ([[bg-[#ff 0]]] أو [[calc(4rem + 1px)]])، والمسافة بتقسم الكلاس لكلاسين. استخدم [[_]] مكان المسافة. ولو [[@utility]] رفض يشتغل، اتأكد إن الاسم مفيهوش [[.]] قبله وإنه مش جوه [[@layer]].`
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
            "السهم (من lucide) يتحرك لقدام شوية. في صفحة عربي «لقدام» = شمال.",
            "قفلة.",
            "label حوالين الحقل والرسالة.",
            "اسم الحقل.",
            R`[[peer]]: الإخوات اللي بعد الحقل ده يقدروا يسألوا عن حالته.`,
            "مخفية، وتظهر لما الحقل يبقى غلط بعد ما المستخدم يتعامل معاه.",
            "قفلة."
          ],
          sol: R`لما تقف على الكارت في أي حتة (مش على العنوان بس): العنوان بيتلوّن بلون الـ brand والسهم بيتحرك 4px (شمال في المثال). ده لأن الـ hover على الأب اللي عليه [[group]]، والأبناء بيسمعوا له.

الإيميل: الصفحة بتفتح والرسالة مستخبية. اكتب [[ahmed]]: وانت بتكتب الرسالة لسه مستخبية. اخرج من الحقل بـ Tab: «إيميل مش صحيح» ظهرت، لأن [[:user-invalid]] بيتحقق بس بعد ما المستخدم يتعامل مع الحقل ويخرج منه. مع [[peer-invalid:]]: الرسالة ظاهرة من أول ما الصفحة تفتح والحقل فاضي، لأن الحقل [[required]] وفاضي فهو [[:invalid]] من الأول.

لو الرسالة مش بتظهر خالص: اتأكد إن الـ span جاي بعد الـ input في الـ HTML وإنهم إخوات (نفس الأب)، لأن [[peer]] بيشتغل بـ [[~]] اللي بيشوف الإخوات اللي بعده بس.`
        }
      ]
    },
    {
      t: "مكونات بتتعاد: cn و cva و shadcn",
      l: 2,
      n: "cn بيدمج الكلاسات، و cva بيعمل variants، و shadcn بينسخ مكونات accessible جاهزة في مشروعك",
      items: [
        {
          cmd: "cn()",
          title: "دمج الكلاسات من غير ما يتخانقوا",
          desc: R`[[cn()]] دالة صغيرة في كل مشروع shadcn: [[clsx]] بيجمّع الكلاسات ويشيل الشرطية اللي false، و [[twMerge]] بيحل التعارض: لو فيه [[px-4]] و [[px-6]] بيسيب الأخير بس.

ودي بتخلي المكون ياخد [[className]] من برا ويغلب الافتراضي بتاعه بأمان.`,
          example: R`// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// الاستخدام
cn("px-4 py-2", isActive && "bg-brand text-white", { "opacity-50": disabled });
cn("px-4 bg-gray-100", "px-6"); // "bg-gray-100 px-6"
cn("text-sm text-gray-600", className);`,
          try: R`في مشروع الـ lab سطّب [[clsx tailwind-merge]] واعمل [[cn]]. اطبع [[cn("p-2", "px-4")]] و [[cn("px-4", "p-2")]] وقارن: الأولى بتسيب الاتنين (px-4 بيغلب الجزء الأفقي بس)، والتانية بتسيب [[p-2]] بس.`,
          flag: "script",
          deep: {
            why: R`لو مكون Button فيه [[px-4]] وانت عايز زرار معين [[px-6]]، والـ className بيتضاف جنبه، هيبقى عندك [[px-4 px-6]]. مين يكسب؟ مش اللي مكتوب آخر في الـ className، اللي مكتوب آخر في ملف الـ CSS الناتج، ودا مش في إيدك. twMerge بيشيل [[px-4]] خالص فمفيش خناقة.`,
            how: R`[[clsx]] مجرد تجميع: [[clsx("a", false && "b", { c: true, d: false }, ["e"])]] = [[a c e]]. مبيعرفش حاجة عن Tailwind.

[[twMerge]] عنده خريطة بكل مجموعات Tailwind: كل كلاس بيتصنف (padding-x، و background-color، و font-size...) ومعاه الـ variants بتاعته ([[hover:]] و [[md:]]). لما يلاقي اتنين في نفس المجموعة بنفس الـ variants، بيسيب الأخير. وبيفهم العلاقات: [[p-2]] بعد [[px-4]] يشيل px-4، بس [[px-4]] بعد [[p-2]] يسيبهم الاتنين.

الترتيب مهم: [[cn(defaults, className)]] عشان اللي جاي من برا يكسب. لو عكست، الافتراضي هيغلب اللي المستخدم طالبه.

tailwind-merge v3 لـ Tailwind v4 (و v2.6 لـ v3). الألوان الجديدة من [[@theme]] بيفهمها لوحده، بس أحجام خط أو مسافات بأسماء جديدة ([[--text-hero]]) لازم تعرّفه بيها بـ [[extendTailwindMerge]]، وإلا ممكن يفتكر [[text-hero]] لون ويشيل [[text-white]] اللي معاه.`,
            when: "أي مكون بياخد className من برا، وأي كلاسات شرطية. ولكلاسات ثابتة في مكان واحد، string عادي كفاية.",
            mistakes: R`template literal بدل cn: [[className={$__bt$__{base} $__{className}$__bt}]] فالتعارض مش بيتحل. وترتيب معكوس ([[cn(className, defaults)]]). وتوكن حجم خط مخصص من غير extendTailwindMerge، فيضيع اللون أو الحجم من غير سبب واضح.`
          },
          teach: R`## دالة من سطر واحد بتحل مشكلة حقيقية

[[cn]] بتاخد كلاسات بأي شكل (strings، وشروط، و objects) وترجّع string واحد نضيف مفيهوش كلاسين بيتخانقوا على نفس الخاصية. جربنا كل سطر في المثال بـ Node (clsx 2.1.1 و tailwind-merge 3.7.0)، والكلاسات نفسها في صفحة Vite بـ Tailwind 4.3.3 في Chrome.

---

## ١. المشكلة الأول: مين يكسب في [[px-6 px-4]]؟

حطينا الاتنين على نفس الـ div بترتيبين مختلفين وقرينا الـ padding:

~~~text getComputedStyle في Chrome
class="px-6 px-4"   paddingLeft = 24px
class="px-4 px-6"   paddingLeft = 24px
~~~

في الحالتين [[px-6]] كسب (24px)، حتى لما كان الأول في الـ class. ليه؟ لأن ترتيب الكلاسات جوه [[class]] ملوش أي لازمة في CSS. لما قاعدتين ليهم نفس الـ specificity (كلاس واحد)، اللي **مكتوبة آخر في ملف الـ CSS** هي اللي بتكسب. وده ملف الـ CSS اللي Tailwind طلّعه:

~~~text من الـ CSS الناتج
.px-4{padding-inline:calc(var(--spacing) * 4)}
.px-6{padding-inline:calc(var(--spacing) * 6)}
~~~

[[.px-6]] مكتوبة بعد [[.px-4]]، فهي اللي بتكسب دايمًا. يعني لو مكون فيه [[px-6]] افتراضي، وانت بعتله [[px-4]] من برا، طلبك هيتجاهل من غير أي error. ده بالظبط اللي [[cn]] جاية تحله.

---

## ٢. ملف [[lib/utils.ts]] سطر سطر

### [[import { clsx, type ClassValue } from "clsx";]]

- [[clsx]]: دالة من package اسمه clsx، شغلتها تجميع بس.
- [[type ClassValue]]: كلمة [[type]] قبل الاسم معناها «ده type بتاع TypeScript مش كود»، فبيتشال خالص من الـ JavaScript الناتج. و [[ClassValue]] هو النوع اللي بيوصف «أي حاجة clsx تقبلها»: string أو رقم أو [[null]] أو [[false]] أو object أو array منهم.

### [[import { twMerge } from "tailwind-merge";]]

[[twMerge]] من package اسمه tailwind-merge. دي اللي فاهمة Tailwind: بتعرف إن [[px-4]] و [[px-6]] الاتنين padding أفقي، فتشيل الأولاني.

### [[export function cn(...inputs: ClassValue[])]]

- [[export]]: عشان أي ملف تاني يقدر يعمل [[import { cn } from "@/lib/utils"]]. و [[@]] ده اختصار لفولدر [[src]] متعرّف في إعدادات المشروع.
- [[...inputs]]: الـ [[...]] هنا اسمها rest parameter، يعني «لمّ كل الـ arguments اللي هتيجي في array واحدة اسمها inputs». فتقدر تنادي [[cn("a")]] أو [[cn("a", "b", x)]] بأي عدد.
- [[: ClassValue[]]]: نوع الـ array دي: كل عنصر فيها [[ClassValue]]. و [[[]]] بعد النوع معناها «array من».

### [[return twMerge(clsx(inputs));]]

بيتقرا من جوه لبرة:

1. [[clsx(inputs)]]: يجمّع كل حاجة في string واحد ويشيل اللي قيمته false.
2. [[twMerge(...)]]: ياخد الـ string ده ويشيل الكلاسات اللي اتغلبت.

---

## ٣. [[clsx]] لوحده: تجميع

~~~text Node
clsx("a", false && "b", { c: true, d: false }, ["e"])   →   "a c e"
~~~

- [[false && "b"]]: الـ [[&&]] بيرجّع اللي على الشمال لو كان false، وإلا بيرجّع اللي على اليمين. فهنا رجّع [[false]]، و clsx بيتجاهله.
- [[{ c: true, d: false }]]: object كل key فيه كلاس، والقيمة شرطه. [[c]] قيمته true فدخل، و [[d]] لأ.
- [[["e"]]]: array بيتفرد.

## ٤. سطور الاستخدام

### السطر الأول: كلاسات شرطية

~~~text App.tsx
cn("px-4 py-2", isActive && "bg-brand text-white", { "opacity-50": disabled });
~~~

| [[isActive]] و [[disabled]] | الناتج |
|---|---|
| الاتنين [[true]] | [[px-4 py-2 bg-brand text-white opacity-50]] |
| الاتنين [[false]] | [[px-4 py-2]] |

### السطر التاني: تعارض

~~~text Node
clsx("px-4 bg-gray-100", "px-6")   →   "px-4 bg-gray-100 px-6"
cn("px-4 bg-gray-100", "px-6")     →   "bg-gray-100 px-6"
~~~

clsx لوحده ساب الاتنين (والمتصفح هيختار حسب ترتيب ملف الـ CSS زي ما شفنا). [[cn]] شال [[px-4]] لأن [[px-6]] جه بعده في نفس المجموعة (padding أفقي). و [[bg-gray-100]] فضل لأنه مجموعة تانية (لون خلفية).

وفي الصفحة: [[cn("px-6", "px-4")]] طلّع [[class="px-4"]] و paddingLeft = **16px**. اللي جه آخر في الـ arguments كسب فعلًا، عكس الـ div اللي فوق.

### السطر التالت: النمط بتاع أي مكون

~~~text App.tsx
cn("text-sm text-gray-600", className);
~~~

[[className]] هو اللي جاي من برا (prop). بيتحط **آخر حاجة** عشان يكسب:

| [[className]] | الناتج |
|---|---|
| [["text-red-600"]] | [[text-sm text-red-600]] (اللون اتغير والحجم فضل) |
| [["text-base"]] | [[text-gray-600 text-base]] (الحجم اتغير واللون فضل) |
| [[undefined]] | [[text-sm text-gray-600]] |

لاحظ إن twMerge عارف إن [[text-sm]] حجم و [[text-gray-600]] لون، رغم إن الاتنين بيبدأوا بـ [[text-]].

---

## ٥. حالات بيفهمها twMerge

| النداء | الناتج | ليه |
|---|---|---|
| [[cn("p-2", "px-4")]] | [[p-2 px-4]] | [[px-4]] بيغطي الجنبين بس، و [[p-2]] لسه محتاجينه لفوق وتحت |
| [[cn("px-4", "p-2")]] | [[p-2]] | [[p-2]] بيغطي كل الاتجاهات، فـ [[px-4]] ملوش لازمة |
| [[cn("hover:bg-red-500", "bg-blue-500", "hover:bg-blue-500")]] | [[bg-blue-500 hover:bg-blue-500]] | التعارض بيتحسب لكل variant لوحده |
| [[cn("text-hero", "text-white")]] | [[text-white]] | twMerge مش عارف [[text-hero]]، فافتكره لون وشاله |

السطر الأخير هو الغلطة اللي في «أخطاء شائعة»: لو [[--text-hero]] حجم خط عملته في [[@theme]]، لازم تعرّفه لـ twMerge بـ [[extendTailwindMerge]].

> في مشروع shadcn جديد (CLI 4.21.3) هتلاقي [[lib/utils.ts]] سطر واحد: [[export { cn } from "cn"]]. ده package اسمه [[cn]] من shadcn بيعمل شغل clsx و twMerge مع بعض. جربنا عليه نفس النداءات اللي في الجدول وطلّع نفس النتايج بالظبط، فكل اللي فوق ينطبق عليه.

## الخلاصة

- ترتيب الكلاسات في [[class]] ملوش لازمة، اللي بيكسب ترتيب القواعد في ملف الـ CSS.
- [[clsx]] بيجمّع ويشيل الـ false، و [[twMerge]] بيشيل الكلاس اللي اتغلب في نفس المجموعة.
- دايمًا [[cn(defaults, className)]]: اللي من برا آخر حاجة.`,
          lines: [
            R`[[clsx]]: بيجمّع strings و objects و arrays ويشيل false و null و undefined.`,
            R`[[twMerge]]: بيفهم كلاسات Tailwind ويشيل المتعارض.`,
            "الدالة بتاخد أي عدد من الكلاسات بأي شكل.",
            "clsx الأول يجمّع، و twMerge بعده ينضّف.",
            "قفلة.",
            R`كلاس شرطي بـ [[&&]] و object: لو isActive بـ false الجزء ده بيختفي.`,
            R`تعارض: [[px-4]] و [[px-6]]، الأخير يكسب.`,
            R`النمط الأساسي: الافتراضي الأول، والـ [[className]] اللي جاي من برا آخر حاجة عشان يكسب.`
          ],
          sol: R`[[cn("p-2", "px-4")]] بيرجع [[p-2 px-4]]: الاتنين فضلوا، لأن [[px-4]] بيغطي الجزء الأفقي بس، والـ [[p-2]] لسه محتاجينه للرأسي، و tailwind-merge عارف إن اللي جاي بعد هو الأقوى. [[cn("px-4", "p-2")]] بيرجع [[p-2]] بس: الـ [[p-2]] جه بعد وبيغطي كل الاتجاهات، فالـ [[px-4]] ملوش لازمة.

جرّبت كمان: [[cn("px-4 bg-gray-100", "px-6")]] ← [[bg-gray-100 px-6]]، و [[cn("text-brand", "text-lg")]] ← [[text-brand text-lg]] (مش بيتخانقوا لأن واحد لون والتاني حجم). ولو [[cn]] رجّع الاتنين في [[cn("px-4", "px-6")]]، يبقى انت عامل [[clsx]] لوحده من غير [[twMerge]].

الغلط الشائع: تفتكر إن ترتيب الكلاسات في الـ HTML هو اللي بيحدد مين يكسب. في CSS اللي بيكسب هو ترتيب القواعد في ملف الـ CSS، مش في الـ class، وعشان كده محتاج twMerge يشيل الخسران من الأول.`,
          solCode: R`// cn.mjs  (npm i clsx tailwind-merge ثم node cn.mjs)
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const cn = (...inputs) => twMerge(clsx(inputs));
console.log(cn("p-2", "px-4"));              // p-2 px-4
console.log(cn("px-4", "p-2"));              // p-2
console.log(cn("px-4 bg-gray-100", "px-6")); // bg-gray-100 px-6
console.log(cn("text-brand", "text-lg"));    // text-brand text-lg`
        },
        {
          cmd: "cva",
          title: "زرار بأشكال وأحجام من غير if كتير",
          desc: R`[[cva]] (من class-variance-authority) بتعرّف مكون بكلاسات أساسية، و variants بأسماء (نوع وحجم)، وقيم افتراضية. بترجع دالة تدّيها [[{ variant: "outline", size: "sm" }]] وترجعلك الكلاسات.

ومعاها [[VariantProps]] بتطلّع الأنواع لـ TypeScript، فلو كتبت [[variant="outlinee"]] غلط الـ editor يعلّم عليها.`,
          example: R`import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50", {
  variants: {
    variant: { primary: "bg-brand text-white hover:bg-brand/90", outline: "border hover:bg-gray-50", ghost: "hover:bg-gray-100" },
    size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
  },
  compoundVariants: [{ variant: "outline", size: "lg", class: "border-2" }],
  defaultVariants: { variant: "primary", size: "md" },
});
type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}`,
          try: R`اعمل الزرار ده واستخدمه [[<Button variant="outline" size="lg">]]. وبعدين اكتب [[variant="danger"]] وشوف TypeScript بيعترض. ضيف danger للـ variants وشوفه قبله.`,
          flag: "script",
          deep: {
            why: "من غير cva، زرار بـ 3 أشكال و 3 أحجام بيبقى ternaries جوه ternaries في الـ className، وكل واحد يضيف شكل يكسر حاجة. cva بتخلي كل الاختيارات جدول واضح، والـ TypeScript بيقفل الأسماء.",
            how: R`cva مش بتعمل سحر: بتبني string. [[buttonVariants({ variant: "outline", size: "lg" })]] بترجع الـ base + كلاسات outline + كلاسات lg + أي compoundVariant اتطابقت. ومش بتحل التعارض بين الكلاسات، عشان كده بتتلف في [[cn]].

[[VariantProps<typeof buttonVariants>]] بيطلّع نوع فيه [[variant]] و [[size]] بالقيم المسموحة بس، فالمكون مش هيقبل غيرها.

ودا بالظبط شكل [[components/ui/button.tsx]] في shadcn: الـ cva اسمها [[buttonVariants]] ومتصدّرة، فتقدر تستخدمها على لينك ([[<Link className={buttonVariants({ variant: "outline" })}>]]) من غير ما تعمل زرار.

في React 19 الـ [[ref]] بقى prop عادي، فمش محتاج [[forwardRef]] زي النسخ القديمة من shadcn: [[...props]] بيعدّيه لوحده.`,
            when: "أي مكون UI ليه أشكال: Button و Badge و Alert و Input. لو المكون شكل واحد بس، cn كفاية.",
            mistakes: R`تبني كلاسات الـ variants بـ template فـ Tailwind ميشوفهاش. تنسى [[defaultVariants]] فالزرار من غير props يطلع من غير حجم. وفي مشروع حقيقي الـ Button كان لسه بـ [[forwardRef]] و [[displayName]] على React 19: شغال، بس كود زيادة ملوش لازمة.`
          },
          teach: R`## جدول اختيارات بيتحوّل لكلاسات

[[cva]] بتاخد منك الكلاسات اللي في كل الزراير، وجدول فيه كل شكل وكل حجم وكلاساته، وترجّعلك دالة: تدّيها [[{ variant, size }]] ترجّع الـ string. حطينا الكود ده بالظبط في مشروع Vite (Tailwind 4.3.3، و class-variance-authority 0.7.1، و TypeScript 6.0.3، و [[--color-brand]] متعرّف في [[@theme]])، وقسنا الزراير في Chrome.

---

## ١. الـ imports

~~~text Button.tsx
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
~~~

- [[import type]]: السطر كله types بس، بيتشال من الـ JavaScript الناتج.
- [[ComponentProps]]: type من React بيدّيك كل الـ props بتاعة عنصر HTML. [[ComponentProps<"button">]] = [[onClick]] و [[disabled]] و [[type]] و [[aria-label]] وكل اللي الـ [[<button>]] بياخده.
- [[cva]]: الدالة نفسها. والاسم اختصار class-variance-authority.
- [[VariantProps]]: type بيطلّع أسماء الـ variants وقيمها من الـ cva.
- [[cn]]: من الدرس اللي فات.

## ٢. [[cva(base, config)]]

~~~text Button.tsx
const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50", {
~~~

الـ argument الأول هو الـ **base**: كلاسات بتتحط على كل زرار مهما كان شكله:

| الكلاس | يعني |
|---|---|
| [[inline-flex items-center justify-center]] | الأيقونة والكلام جنب بعض وفي النص |
| [[gap-2]] | 8px بين الأيقونة والكلام |
| [[rounded-lg]] | تدوير 8px |
| [[font-medium]] | وزن 500 |
| [[disabled:opacity-50]] | لو عليه [[disabled]] يبقى نص شفاف |

والتاني object فيه ٣ حاجات:

### [[variants]]

~~~text Button.tsx
variants: {
  variant: { primary: "bg-brand text-white hover:bg-brand/90", outline: "border hover:bg-gray-50", ghost: "hover:bg-gray-100" },
  size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
},
~~~

- [[variant]] و [[size]] أسامي انت اللي اخترتها، ودي هتبقى أسامي الـ props.
- جوه كل واحد: اسم الاختيار وكلاساته. [[primary]] و [[outline]] و [[ghost]] (شفاف من غير border).
- [[hover:bg-brand/90]]: الـ [[/90]] بعد اللون = نفس اللون بشفافية 90٪.
- [[h-9]] و [[h-10]] و [[h-12]] = ارتفاع 36 و 40 و 48px (كل وحدة 4px).

### [[compoundVariants]]

~~~text Button.tsx
compoundVariants: [{ variant: "outline", size: "lg", class: "border-2" }],
~~~

array من «تركيبات»: الكلاس [[border-2]] بيتضاف بس لو [[variant]] هو outline **و** [[size]] هو lg مع بعض.

### [[defaultVariants]]

~~~text Button.tsx
defaultVariants: { variant: "primary", size: "md" },
~~~

لو اللي بيستخدم الزرار محددش، دي القيم.

### بتطلّع إيه؟

ناديناها وطبعنا الناتج:

~~~text الناتج
buttonVariants()
→ inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50 bg-brand text-white hover:bg-brand/90 h-10 px-4

buttonVariants({ variant: "outline", size: "lg" })
→ inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50 border hover:bg-gray-50 h-12 px-6 text-lg border-2
~~~

الترتيب دايمًا: base، وبعدين كلاسات الـ variant، وبعدين الـ size، وفي الآخر الـ compound. ولاحظ إن التانية فيها [[border]] و [[border-2]] الاتنين: cva بتلزق بس، مش بتحل تعارض.

---

## ٣. الـ type

~~~text Button.tsx
type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
~~~

من جوه لبرة:

1. [[typeof buttonVariants]]: [[typeof]] هنا (في مكان type) معناها «هات الـ type بتاع المتغير ده».
2. [[VariantProps<...>]]: يطلّع منه [[{ variant?: "primary" | "outline" | "ghost" | null; size?: "sm" | "md" | "lg" | null }]]. الـ [[?]] = اختياري، والـ [[|]] = «واحد من دول».
3. [[&]]: بيدمج الاتنين: كل props الزرار العادية **و** variant و size.

جربنا [[<Button variant="danger">]] و [[<Button size="xl">]] وشغّلنا [[tsc]]:

~~~text الناتج
error TS2322: Type '"danger"' is not assignable to type '"primary" | "outline" | "ghost" | null | undefined'.
error TS2322: Type '"xl"' is not assignable to type '"sm" | "md" | "lg" | null | undefined'.
~~~

## ٤. المكون

~~~text Button.tsx
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
~~~

- [[{ className, variant, size, ...props }]]: destructuring. بيطلّع التلاتة دول بأساميهم، و [[...props]] = «كل الباقي» ([[onClick]] و [[disabled]] و [[id]]...).
- [[buttonVariants({ variant, size })]]: الكلاسات من الجدول. و [[{ variant, size }]] اختصار [[{ variant: variant, size: size }]].
- [[cn(..., className)]]: الـ className اللي من برا آخر حاجة عشان يكسب، و cn بتشيل المتعارض.
- [[{...props}]]: يفرد الباقي على الـ [[<button>]] الحقيقي.

## ٥. القياس في Chrome

| الاستخدام | الارتفاع | padding جنب | border | حجم الخط |
|---|---|---|---|---|
| [[<Button>]] | 40 | 16px | 0 | 16px |
| [[<Button variant="outline" size="lg">]] | 48 | 24px | **2px** | 18px |
| [[<Button variant="ghost" size="sm" className="px-8">]] | 36 | **32px** | 0 | 14px |
| [[<Button disabled>]] | 40 | 16px | 0 | 16px و opacity 0.5 |

- التاني: الـ class النهائي فيه [[border-2]] بس، لأن cn شالت [[border]].
- التالت: [[px-8]] اللي من برا شال [[px-3]] بتاع sm، فالـ padding بقى 32px.
- الـ primary لونه [[oklch(0.55 0.2 265)]]، ووقت الـ hover بقى نفس اللون بـ [[/ 0.9]] (الشفافية).

## الخلاصة

| الجزء | بيعمل إيه |
|---|---|
| base | كلاسات كل الأشكال |
| [[variants]] | جدول الاختيارات |
| [[compoundVariants]] | كلاسات لتركيبة معينة |
| [[defaultVariants]] | القيم لو محدش حدد |
| [[VariantProps]] | الأسماء المسموحة لـ TypeScript |
| [[cn(..., className)]] | يحل التعارض ويخلي اللي من برا يكسب |`,
          lines: [
            "نوع الـ props بتاعة أي عنصر HTML.",
            "استيراد cva والنوع.",
            "cn من الدرس اللي فات.",
            "الكلاسات اللي في كل الأشكال.",
            "الـ variants.",
            "الشكل: 3 اختيارات، كل واحد وكلاساته.",
            "الحجم: 3 اختيارات.",
            "قفلة variants.",
            "تركيبة معينة: outline و lg مع بعض بس ياخدوا border أتقل.",
            "لو محدش حدد: primary و md.",
            "قفلة.",
            R`props الزرار العادية + [[variant]] و [[size]] بأنواعهم من cva.`,
            "المكون.",
            "cva تطلّع الكلاسات، و cn تدمج معاها الـ className اللي من برا.",
            "قفلة."
          ],
          sol: R`[[<Button variant="outline" size="lg">]] بيطلع زرار شفاف ليه border وارتفاعه 48px. الكلاسات اللي بيولّدها [[buttonVariants]] بالترتيب: الأساسية، وبعدين [[border hover:bg-gray-50]]، وبعدين [[h-12 px-6 text-lg]]، وفي الآخر [[border-2]] من الـ compoundVariants. و [[cn]] بيشيل [[border]] لأن [[border-2]] بيغطيه، فالـ border بيبقى 2px.

[[variant="danger"]] قبل ما تضيفه: TypeScript بيعترض بالرسالة دي بالظبط:
[[Type '"danger"' is not assignable to type '"primary" | "outline" | "ghost" | null | undefined'.]] (ترتيب الأسماء في الرسالة ممكن يختلف حسب نسخة TypeScript)
بعد ما تضيف [[danger]] للـ variants الخطأ بيختفي من غير ما تلمس الـ type، لأن [[VariantProps]] بيقرا الأنواع من الـ cva نفسه. والزرار بيطلع أحمر بنفس ارتفاع md لأن الـ size الافتراضي md.

لو TypeScript مااعترضش على danger، غالبًا الـ props متعرّفة [[any]] أو انت شايل [[VariantProps]] من الـ type. ولو الزرار طلع من غير ستايل، يبقى الكلاسات زي [[bg-brand]] مش متعرّفة في الـ theme.`,
          solCode: R`variants: {
  variant: {
    primary: "bg-brand text-white hover:bg-brand/90",
    outline: "border hover:bg-gray-50",
    ghost: "hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  },
  size: { sm: "h-9 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
},
// <Button variant="danger">امسح</Button>
// → ... bg-red-600 text-white hover:bg-red-700 h-10 px-4`
        },
        {
          cmd: "shadcn/ui",
          title: "مكتبة مكونات بتنسخ الكود عندك بدل ما تسطّبه",
          desc: R`shadcn/ui مش package بتسطّبه وتستورد منه. هو CLI بينسخ كود المكون نفسه في مشروعك ([[components/ui/button.tsx]])، فالكود بقى بتاعك: تعدّله وتغيّر شكله براحتك.

كل مكون مبني على primitive جاهز للـ accessibility (Radix UI أو Base UI) + Tailwind + cva. ومن يوليو 2026 الـ init الجديد بيختار Base UI افتراضيًا، و [[-b radix]] لو عايز Radix. المشاريع القديمة على Radix مش محتاجة تتغير.`,
          example: R`npx shadcn@latest init
npx shadcn@latest init -b radix --rtl
npx shadcn@latest add button dialog dropdown-menu
npx shadcn@latest add button --overwrite
cat components.json
git diff components/ui/button.tsx`,
          try: R`في مشروع Next أو Vite نفّذ init و [[add button]]، وافتح [[components/ui/button.tsx]]: هتلاقي cva و cn اللي اتعلمتهم. غيّر التدوير الافتراضي وشوفه اتغير في كل الزراير.`,
          deep: {
            why: R`مكتبات المكونات التقليدية بتديك مكون جاهز، ولما تيجي تغيّر حاجة مش متوقعة بتحارب المكتبة: props مش موجودة، و CSS بيتغلب بالعافية، وترقية تكسر شكلك. shadcn بيقلب الفكرة: «ده مش component library، ده الطريقة اللي تبني بيها الـ library بتاعتك». بيديك نقطة بداية كويسة والكود كله قدامك.`,
            how: R`الـ CLI بيقرا [[components.json]] عشان يعرف يحط الملفات فين، والـ aliases ([[@/components]] و [[@/lib/utils]])، وأنهي style ومكتبة. بعدين بيجيب كود المكون من الـ registry (JSON فيه الكود والـ dependencies)، ويكتبه في مشروعك، ويسطّب اللي محتاجه (زي [[radix-ui]] أو Base UI).

المكون نفسه طبقتين: primitive بيعمل السلوك والـ accessibility (focus trap، و Escape، و aria، والكيبورد) من غير أي شكل، و Tailwind + cva فوقه للشكل. انت بتعدّل الطبقة التانية براحتك، والأولى غالبًا متلمسهاش.

الألوان في shadcn متغيرات CSS ([[--primary]] و [[--background]] و [[--border]]) متوصّلة بـ [[@theme inline]]، فالكلاسات [[bg-primary]] و [[text-muted-foreground]]، وتغيير الثيم كله بيبقى تغيير المتغيرات.

و [[--rtl]] في الـ init (أو [[shadcn migrate rtl]] لمشروع قايم) بيحوّل الكلاسات الـ physical في المكونات لـ logical ([[ml-4]] لـ [[ms-4]])، ودا مهم لأي موقع عربي.

المقابل: مفيش [[npm update]] للمكونات. لو shadcn صلّح bug، انت اللي بتجيبه ([[add]] تاني وتدمج بإيدك).`,
            when: "مشروع React أو Next عايز مكونات جاهزة ومحترمة للـ accessibility وشكلها بتاعك. لو عايز كل حاجة جاهزة ومش هتعدّل، مكتبة تقليدية ممكن تبقى أسرع.",
            mistakes: R`تعامل [[components/ui]] كأنه node_modules متلمسوش، وتعمل wrapper فوق wrapper عشان تغيّر حاجة بسيطة: عدّل الملف نفسه، ده الهدف. أو العكس: [[add --overwrite]] بعد ما عدّلت فتضيع تعديلاتك. وتنسخ مكونات من مشروع قديم (Radix و Tailwind v3) لمشروع جديد (Base UI و v4) فالكلاسات والـ imports تتلخبط.`
          },
          teach: R`## CLI بيكتب كود في مشروعك

كل أمر في المثال بيعدّل ملفات في مشروعك: [[init]] بيجهّز، و [[add]] بينسخ مكونات. شغّلنا الأوامر دي على مشروع Vite + React + Tailwind 4.3.3 فاضي (shadcn 4.21.3، أكتوبر 2026)، ومتابعين كل تغيير بـ git. في Vite الكود بيتحط تحت [[src/]]، فـ [[components/ui]] بتبقى [[src/components/ui]].

---

## ١. [[npx shadcn@latest init]]

- [[npx]]: بيشغّل أمر من package على npm من غير ما تسطّبه global. بينزّله في cache ويشغّله.
- [[shadcn@latest]]: اسم الـ package، و [[@latest]] = آخر نسخة، عشان تاخد آخر registry.
- [[init]]: الأمر الفرعي اللي بيجهّز المشروع.

أول سؤال بيسأله اختيار الـ preset (الشكل العام):

~~~text الناتج
? Which preset would you like to use?
>   Nova - Lucide / Geist
    Vega
    Maia
    ...
~~~

ولو عايز من غير أسئلة: [[-p nova]]. شغّلنا [[init -p nova -y]] ([[-y]] = متسألنيش أكد) وبصينا على [[components.json]]:

~~~text components.json
"style": "base-nova",
"rtl": false,
~~~

[[base-nova]] يعني المكونات مبنية على **Base UI**، واتسطّب [[@base-ui/react]]. ده الافتراضي الجديد.

## ٢. [[npx shadcn@latest init -b radix --rtl]]

- [[-b radix]]: [[-b]] اختصار [[--base]]، يعني المكتبة اللي تحت المكونات. القيم: [[base]] و [[radix]] و [[aria]].
- [[--rtl]]: المكونات تتكتب بكلاسات logical عشان العربي.

شغّلناه بـ [[-p nova -y]] وده اللي طلع:

~~~text الناتج
✔ Verifying framework. Found Vite.
✔ Validating Tailwind CSS. Found v4.
✔ Validating import alias.
✔ Writing components.json.
✔ Installing dependencies.
✔ Created 1 file:
  - src\lib\utils.ts
✔ Updating src\index.css
~~~

| الملف | اتغير إزاي |
|---|---|
| [[components.json]] | جديد: [["style": "radix-nova"]] و [["rtl": true]] والـ aliases |
| [[package.json]] | اتضاف [[radix-ui]] و [[class-variance-authority]] و [[lucide-react]] و [[cn]] و [[tw-animate-css]] وغيرهم |
| [[src/lib/utils.ts]] | جديد |
| [[src/index.css]] | اتضاف [[@theme inline]] و متغيرات الألوان في [[:root]] و [[.dark]] |

وحاجة جديدة: [[src/lib/utils.ts]] طلع سطر واحد:

~~~text src/lib/utils.ts
export { cn } from "cn"
~~~

يعني الـ CLI الجديد مش بيكتب [[clsx]] و [[twMerge]] زي درس [[cn()]]، بيستخدم package اسمه [[cn]] من shadcn بيعمل نفس الشغل. جربنا عليه نفس أمثلة الدرس ده وطلّع نفس النتايج بالظبط ([[cn("px-4", "p-2")]] ← [[p-2]]). المشاريع القديمة فيها الشكل الأول، والاتنين نفس الفكرة.

## ٣. [[npx shadcn@latest add button dialog dropdown-menu]]

[[add]] وبعده أسامي المكونات، أي عدد:

~~~text الناتج
✔ Created 3 files:
  - src\components\ui\button.tsx
  - src\components\ui\dropdown-menu.tsx
  - src\components\ui\dialog.tsx
~~~

افتح [[button.tsx]] هتلاقي اللي اتعلمته:

~~~text src/components/ui/button.tsx (مختصر)
const buttonVariants = cva("group/button inline-flex ... rounded-lg ...", {
  variants: {
    variant: { default: ..., outline: ..., secondary: ..., ghost: ..., destructive: ..., link: ... },
    size: { default: "h-8 ...", xs: ..., sm: ..., lg: ..., icon: "size-8", ... },
  },
  defaultVariants: { variant: "default", size: "default" },
})
...
className={cn(buttonVariants({ variant, size, className }))}
~~~

نفس [[cva]] بتاع الدرس اللي فات، والألوان أسامي متغيرات ([[bg-primary]] و [[text-primary-foreground]]) مش ألوان ثابتة.

وأثر [[--rtl]]: عملنا [[add dropdown-menu]] في مشروع من غير [[--rtl]] وقارنّا:

| من غير [[--rtl]] | بـ [[--rtl]] |
|---|---|
| [[ml-auto]] | [[ms-auto]] |
| [[pl-7]] | [[ps-7]] |
| [[pr-8]] | [[pe-8]] |

## ٤. [[npx shadcn@latest add button --overwrite]]

[[--overwrite]] (أو [[-o]]) = اكتب فوق الملف الموجود. جربنا: غيّرنا [[rounded-lg]] لـ [[rounded-full]] في button.tsx، و [[git diff --stat]] طلّع:

~~~text الناتج قبل
 src/components/ui/button.tsx | 2 +-
~~~

بعد [[add button --overwrite]]: الـ CLI قال [[Updated 1 file]]، و [[git diff --stat]] طلع **فاضي**. تعديلك راح.

## ٥. [[cat components.json]]

[[cat]] بيطبع الملف. ده ملف إعدادات shadcn، والـ CLI بيقراه في كل [[add]]:

| المفتاح | يعني |
|---|---|
| [[style]] | المكتبة والـ preset ([[radix-nova]]) |
| [[tailwind.css]] | ملف الـ CSS اللي هيحط فيه المتغيرات |
| [[iconLibrary]] | [[lucide]] |
| [[rtl]] | يكتب logical ولا لأ |
| [[aliases]] | [[@/components/ui]] و [[@/lib/utils]]: فين يحط الملفات وإزاي يعمل import |

(على ويندوز PowerShell: [[cat]] شغال كاسم تاني لـ [[Get-Content]].)

## ٦. [[git diff components/ui/button.tsx]]

بيوريك الفرق بين الملف دلوقتي وآخر commit: السطور اللي اتشالت بـ [[-]] واللي اتضافت بـ [[+]]. عشان كده اعمل commit **قبل** أي [[--overwrite]]، فتقدر تشوف اللي اتمسح وترجّعه.

---

## ٧. التدوير من مكان واحد

في [[index.css]] فيه [[--radius: 0.625rem]] (10px)، و [[rounded-lg]] طالع في الـ CSS كده:

~~~text من الـ CSS الناتج
.rounded-lg{border-radius:var(--radius)}
~~~

قسنا الزراير في Chrome، وبعدين غيّرنا [[--radius]] لـ [[1rem]]:

| الزرار | قبل | بعد [[--radius: 1rem]] |
|---|---|---|
| [[size="default"]] | 10px | 16px |
| [[size="lg"]] | 10px | 16px |
| [[size="sm"]] | 8px | 12px |

الـ sm مكتوب فيه [[rounded-[min(var(--radius-md),12px)]]]: يعني أصغر قيمة من الاتنين، فمش بيعدّي 12px.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[init]] | [[components.json]] و [[lib/utils.ts]] والمتغيرات والـ packages |
| [[init -b radix --rtl]] | نفسه بس Radix بدل Base UI، ومكونات logical |
| [[add <names>]] | ينسخ كود المكونات في [[components/ui]] |
| [[add <name> --overwrite]] | يكتب الأصلي فوق نسختك |

- الكود بقى بتاعك: عدّله في الملف نفسه.
- commit قبل أي [[--overwrite]].`,
          lines: [
            R`يجهّز المشروع: [[components.json]]، و [[cn]] في lib/utils، ومتغيرات الألوان في الـ CSS.`,
            "نفسه بس بـ Radix بدل Base UI (الافتراضي الجديد)، ومكونات logical جاهزة للعربي.",
            "ينسخ كود المكونات دي في components/ui، ويسطّب الـ packages اللي محتاجاها.",
            "يرجّع النسخة الأصلية فوق نسختك. خد بالك: تعديلاتك هتروح.",
            "إعدادات shadcn: الـ style، والمكتبة، ومسارات الـ aliases، وملف الـ CSS.",
            "قبل ما تعمل commit، شوف الفرق بين نسختك والأصلية بعد الـ overwrite."
          ],
          sol: R`بعد [[init]] هتلاقي [[components.json]] و [[lib/utils.ts]] فيه [[cn]] (في المشاريع القديمة بـ clsx و twMerge زي درس [[cn()]]، والـ CLI الجديد بيكتب [[export { cn } from "cn"]] من package بنفس الشغل)، والـ globals.css اتضاف فيه متغيرات زي [[--radius]] و [[--primary]] و [[--background]]. بعد [[add button]] هتلاقي [[components/ui/button.tsx]] جواه [[const buttonVariants = cva(...)]] وفيه variants زي [[default]] و [[destructive]] و [[outline]] و [[secondary]] و [[ghost]] و [[link]]، وأحجام زي [[default]] و [[sm]] و [[lg]] و [[icon]]، والـ component بيعمل [[cn(buttonVariants({ variant, size, className }))]]. (الأسماء بالظبط ممكن تختلف حسب الـ style اللي اخترته في init.)

عشان تغيّر التدوير: فيه طريقتين. الأولى في button.tsx: غيّر [[rounded-lg]] في الـ string الأساسي لـ [[rounded-full]] مثلًا، وخلي بالك إن بعض الأحجام ممكن تكون كاتبة تدوير تاني جواها (في style nova الـ [[sm]] و [[xs]] فيهم [[rounded-[min(var(--radius-md),12px)]]])، فلازم تغيّرها هي كمان وإلا هتلاقي الزراير الصغيرة لسه زي ما هي. التانية في globals.css: غيّر [[--radius]] على [[:root]]، ودي بتغيّر كل المكونات مش الزراير بس، لأن [[rounded-md]] و [[rounded-lg]] محسوبين منه (قستها: [[--radius: 1rem]] خلّى الزرار العادي 16px بدل 10px).

بعد التعديل، [[git diff components/ui/button.tsx]] بيوريك التغيير بتاعك. ولو عملت [[add button --overwrite]] بعدين هيمسحه، ودي النقطة اللي تفرّق shadcn عن مكتبة متسطبة: الكود بتاعك وانت المسؤول عنه.`
        },
        {
          cmd: "Dialog",
          title: "مودال بيحترم الكيبورد وقارئ الشاشة من غير ما تكتبه",
          desc: R`الـ primitives (Radix أو Base UI) بتديك مكونات من غير شكل بس سلوكها كامل: الـ Dialog بيحبس الـ focus جواه، و Escape بيقفله، والـ focus بيرجع للزرار اللي فتحه، والصفحة اللي ورا مبتعملش scroll.

انت بتركّب الأجزاء ([[Root]] و [[Trigger]] و [[Portal]] و [[Overlay]] و [[Content]] و [[Title]]) وتحط عليهم كلاسات Tailwind.`,
          example: R`import { Dialog } from "radix-ui";
<Dialog.Root>
  <Dialog.Trigger className="rounded-lg bg-red-600 px-4 py-2 text-white">امسح</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 w-[min(90vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6">
      <Dialog.Title className="text-lg font-bold">متأكد؟</Dialog.Title>
      <Dialog.Description>الحذف مش هيترجع.</Dialog.Description>
      <Dialog.Close onClick={onConfirm}>أيوه امسح</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
          try: R`افتح المودال واضغط Tab كذا مرة: الـ focus مش هيخرج برا. دوس Escape: هيقفل والـ focus يرجع لزرار «امسح». وقارن ده بمودال معمول بـ [[useState]] و div.`,
          flag: "script",
          deep: {
            why: R`مودال «بسيط» بـ div و useState بيبان شغال بالماوس، بس: الـ Tab بيخرج للصفحة اللي ورا، و Escape مش شغال، والـ focus بيضيع بعد ما يقفل، وقارئ الشاشة مش عارف إن فيه dialog، والصفحة ورا بتعمل scroll. تظبيط ده كله صح عشرات السطور وحالات كتير، والـ primitives مكتوبة ومتجرّبة.`,
            how: R`الـ Dialog بيطبّق نمط الـ dialog بتاع WAI-ARIA: لما يفتح بيحط الـ focus جواه، وبيحبس الـ Tab و Shift+Tab جواه (focus trap)، وبيخفي باقي الصفحة عن قارئ الشاشة، وبيقفل الـ scroll بتاع الـ body. ولما يقفل بيرجّع الـ focus للـ Trigger. والـ Content عليه [[role="dialog"]] ومربوط بالعنوان والوصف لوحده.

الأجزاء بتتكلم مع بعض بـ React context جوه الـ Root، فتقدر تحط الـ Trigger في أي مكان جواه. و [[asChild]] على أي جزء بيخليه يلبس سلوكه على العنصر اللي جواه بدل ما يعمل عنصر جديد: [[<Dialog.Trigger asChild><Button>...</Button></Dialog.Trigger>]].

الحالة بتظهر كـ attribute: [[data-state="open"]] أو [[closed]]، فتعمل animations بـ Tailwind: [[data-[state=open]:opacity-100]].

ونفس الفكرة في DropdownMenu (أسهم الكيبورد، والبحث بأول حرف، والقفل لما تضغط برا)، و Popover، و Tooltip، و Tabs، و Select. وفي موقع عربي، [[Direction.Provider]] بـ [[dir="rtl"]] بيخلي أسهم الكيبورد في القوايم تمشي في الاتجاه الصح.`,
            when: "أي مودال أو dropdown أو popover أو tabs أو tooltip. متكتبش السلوك ده بنفسك إلا لو بتتعلم. وفي مشروع shadcn هتلاقيهم متغلّفين جاهزين في components/ui.",
            mistakes: R`تشيل [[Dialog.Title]] لأن التصميم مفيهوش عنوان، فالـ dialog يبقى من غير اسم وقارئ الشاشة يقول «dialog» وخلاص. نسخ Radix القديمة كانت بتطلّع تحذير في الكونسول، بس radix-ui 1.7 مبقتش بتطلّعه (جربناها)، فمحدش هينبهك: خليه وخبّيه بصريًا ([[sr-only]]). و [[asChild]] على مكون مش بيعدّي الـ props والـ ref للعنصر، فالزرار مش بيفتح حاجة. وفي مشروع حقيقي dropdown كان معمول بإيدك بـ [[mousedown]] على الـ document عشان يقفل لما تضغط برا: مفيش Escape ولا أسهم ولا إدارة focus، ودا بالظبط اللي DropdownMenu بيحله.`
          },
          teach: R`## أجزاء بتتكلم مع بعض

كل [[Dialog.Something]] في المثال قطعة ليها شغلانة، والـ [[Root]] بيربطهم. انت بتحط الشكل بكلاسات Tailwind، و Radix بيحط السلوك والـ attributes. حطينا المثال في مشروع Vite ([[radix-ui]] 1.7.0، و React 19.3، و Tailwind 4.3.3) جوه صفحة [[dir="rtl"]] عرضها 800 وطولها 600، و [[onConfirm]] دالة بتعدّ مرات الضغط، وجربنا بالكيبورد والماوس في Chrome.

---

## ١. [[import { Dialog } from "radix-ui";]]

[[radix-ui]] package واحد فيه كل الـ primitives. [[Dialog]] object جواه القطع كلها: [[Dialog.Root]] و [[Dialog.Trigger]] وهكذا. والنقطة معناها «القطعة اللي اسمها كذا جوه Dialog».

## ٢. [[<Dialog.Root>]]

مش بيرسم أي عنصر في الصفحة. شايل حالة «مفتوح ولا مقفول»، وبيدّيها لكل القطع اللي جواه (React context). عشان كده كل القطع لازم تبقى جواه.

## ٣. [[<Dialog.Trigger>]]

بيرسم [[<button>]] حقيقي. ده الـ HTML اللي طلع قبل وبعد الفتح:

~~~text attributes الزرار
مقفول:  type=button aria-haspopup=dialog aria-expanded=false data-state=closed
مفتوح:  type=button aria-haspopup=dialog aria-expanded=true  data-state=open  aria-controls=radix-_r_0_
~~~

| الـ attribute | يعني |
|---|---|
| [[type=button]] | لو جوه form ميبعتوش |
| [[aria-haspopup=dialog]] | قارئ الشاشة يقول إن الزرار بيفتح dialog |
| [[aria-expanded]] | مفتوح ولا لأ |
| [[data-state]] | نفس المعلومة للـ CSS: [[data-[state=open]:...]] في Tailwind |
| [[aria-controls]] | الـ id بتاع المودال اللي بيتحكم فيه |

## ٤. [[<Dialog.Portal>]]

كل اللي جواه بيترسم كآخر حاجة في [[<body>]] مش مكانه في الكود. قسنا: الأب بتاع المودال طلع [[BODY]]. ليه؟ لو أي أب فوقه عليه [[overflow: hidden]] أو [[transform]]، الـ [[fixed]] ممكن يتقص أو يتحسب من الأب ده بدل الشاشة. برا كل ده مفيش مشكلة.

## ٥. [[<Dialog.Overlay className="fixed inset-0 bg-black/50" />]]

- [[fixed]]: ثابت على الشاشة مش بيتحرك مع الـ scroll.
- [[inset-0]]: [[top]] و [[right]] و [[bottom]] و [[left]] كلهم 0، فبيغطي الشاشة كلها.
- [[bg-black/50]]: أسود بشفافية 50٪. في Chrome: [[oklab(0 0 0 / 0.5)]].

ضغطنا بالماوس على الخلفية برا الصندوق: المودال اتقفل.

## ٦. [[<Dialog.Content className="...">]]

الصندوق نفسه. الكلاسات:

| الكلاس | يعني |
|---|---|
| [[fixed top-1/2 left-1/2]] | الركن الفوقاني الشمال في نص الشاشة |
| [[-translate-x-1/2 -translate-y-1/2]] | ارجع نص عرضك ونص طولك، فالـ **نص** بتاعك يبقى في نص الشاشة |
| [[w-[min(90vw,28rem)]]] | العرض الأصغر من: 90٪ من عرض الشاشة، أو 28rem (448px) |
| [[rounded-xl bg-white p-6]] | تدوير، وأبيض، و padding 24px |

القياس: الصندوق [[x=176 y=238]] وعرضه 448 وطوله 124. الشاشة 800، و 90vw = 720 أكبر من 448، فالعرض 448. و (800 − 448) ÷ 2 = 176، يعني في النص بالظبط.

والـ attributes اللي Radix حطها عليه:

~~~text attributes الصندوق
role=dialog  id=radix-_r_0_  data-state=open  tabindex=-1
aria-labelledby=radix-_r_1_  aria-describedby=radix-_r_2_
~~~

- [[role=dialog]]: قارئ الشاشة يعرف إنه dialog.
- [[aria-labelledby]]: بيشاور على id الـ Title، فاسم الـ dialog = «متأكد؟».
- [[aria-describedby]]: بيشاور على الـ Description.
- [[tabindex=-1]]: يقدر ياخد focus بالكود من غير ما يدخل في ترتيب الـ Tab.

## ٧. [[Dialog.Title]] و [[Dialog.Description]]

الـ Title بيترسم [[<h2>]]، والـ Description [[<p>]]. ده الـ Accessibility tree اللي Chrome شايفه وهو مفتوح:

~~~text الناتج
- dialog "متأكد؟":
  - heading "متأكد؟" [level=2]
  - paragraph: الحذف مش هيترجع.
  - button "أيوه امسح"
~~~

وجربنا نشيل الـ Title: بقى [[- dialog:]] من غير اسم، ومفيش أي تحذير في الـ Console (radix-ui 1.7).

## ٨. [[<Dialog.Close onClick={onConfirm}>]]

زرار بيقفل المودال. و [[onClick]] بتاعك بيشتغل الأول: ضغطناه، المودال اتقفل، والعداد بقى 1، والـ focus رجع لزرار «امسح».

---

## ٩. السلوك اللي جه ببلاش

فتحنا بالكيبورد (Enter على «امسح») وقسنا:

| التجربة | النتيجة |
|---|---|
| الـ focus بعد الفتح | زرار «أيوه امسح» (أول حاجة ينفع تاخد focus جوه) |
| Tab خمس مرات | فضل على «أيوه امسح» كل مرة (الوحيد جوه) |
| Shift+Tab | نفس الزرار |
| [[#root]] (باقي الصفحة) | [[aria-hidden="true"]] و [[pointer-events: none]] |
| الـ body | [[overflow: hidden]] و [[data-scroll-locked]] |
| scroll بالماوس 500px | [[scrollY]] فضل 0 |
| Escape | المودال اتشال من الصفحة، والـ focus رجع لـ «امسح»، و [[aria-expanded=false]] |
| scroll بعد القفل | [[scrollY]] بقى 500 |

- **focus trap**: الـ Tab محبوس جوه المودال.
- [[aria-hidden]] على باقي الصفحة: قارئ الشاشة مش هيقرا اللي ورا.
- قفل الـ scroll: الصفحة اللي ورا متتحركش.
- رجوع الـ focus: الكيبورد يكمّل من نفس المكان.

## الخلاصة

| القطعة | بترسم | شغلتها |
|---|---|---|
| [[Root]] | ولا حاجة | الحالة |
| [[Trigger]] | [[<button>]] | يفتح، وعليه [[aria-expanded]] |
| [[Portal]] | ولا حاجة | يطلّع المودال لآخر الـ body |
| [[Overlay]] | [[<div>]] | الخلفية، والضغط عليها يقفل |
| [[Content]] | [[<div role="dialog">]] | الصندوق والـ focus trap |
| [[Title]] / [[Description]] | [[<h2>]] / [[<p>]] | اسم ووصف الـ dialog |
| [[Close]] | [[<button>]] | يقفل |

- متشيلش الـ Title: من غيره الـ dialog ملوش اسم، ومفيش تحذير ينبهك.
- انت بتكتب الشكل بس، والسلوك كله من Radix.`,
          lines: [
            R`الـ package الموحّد بتاع Radix (أو [[@radix-ui/react-dialog]] في المشاريع القديمة).`,
            R`الـ Root: شايل حالة مفتوح ومقفول. تقدر تتحكم فيها بـ [[open]] و [[onOpenChange]].`,
            R`زرار الفتح: [[<button>]] حقيقي عليه [[aria-expanded]].`,
            "بيطلّع المودال في آخر الـ body، برا أي transform أو overflow أو z-index ممكن يحبسه.",
            "الخلفية الغامقة، والضغط عليها بيقفل.",
            "صندوق المودال في نص الشاشة.",
            "العنوان: قارئ الشاشة بيقوله أول ما المودال يفتح.",
            "الوصف: بيتقري بعد العنوان.",
            "زرار بيقفل، وهنا كمان بينفّذ الحذف.",
            "قفلة Content.",
            "قفلة Portal.",
            "قفلة Root."
          ],
          sol: R`أول ما تدوس «امسح»: المودال بيفتح والـ focus بيروح على أول عنصر ممكن يتوصله جواه (زرار «أيوه امسح»). اضغط Tab كذا مرة: الـ focus بيلف جوه المودال وعمره ما يخرج (في تجربتي 5 Tabs ورا بعض فضلوا على نفس الزرار لأنه الوحيد جواه). الـ Content عليه [[role="dialog"]] واسمه «متأكد؟» جاي من [[Dialog.Title]]، وباقي الصفحة عليها [[aria-hidden]] ومبتقبلش الماوس.

Escape: المودال بيقفل والـ focus بيرجع على زرار «امسح» نفسه، فقارئ الشاشة والكيبورد بيكمّلوا من نفس المكان.

المودال المعمول بـ [[useState]] و div: Tab بيطلع من المودال على طول ويوصل لعناصر الصفحة اللي ورا (في تجربتي راح للـ body وبعدين لزرار الـ trigger ولينك تحت)، و Escape مش بيعمل أي حاجة، ولما يقفل الـ focus بيضيع على الـ body. كل ده انت كنت هتكتبه بإيدك. ولو شلت الـ Title، الـ dialog بيظهر في الـ Accessibility tree من غير اسم (نسخ Radix القديمة كانت بتطلّع تحذير في الـ Console إن [[DialogContent]] محتاج [[DialogTitle]]، و radix-ui 1.7 مبقتش بتطلّعه)؛ حطه ولو مخفي بـ [[VisuallyHidden]] أو [[sr-only]].`
        }
      ]
    },
    {
      t: "الثيم والعربي والخطوط والأيقونات",
      l: 2,
      n: "dark mode من غير وميض، ومكونات بتتقلب لوحدها في العربي، وخط بيتحمّل صح، وأيقونات ليها اسم",
      items: [
        {
          cmd: "dark mode",
          title: "وضع غامق بزرار ومن غير وميض",
          desc: R`في Tailwind v4 الـ [[dark:]] افتراضيًا بيتبع نظام التشغيل. عشان تخليه بزرار، غيّر الـ variant يبقى على كلاس: [[@custom-variant dark (&:where(.dark, .dark *));]]، وبعدين [[<html class="dark">]] يقلب كل حاجة.

و [[next-themes]] في Next.js بيعمل الباقي: بيحط الكلاس، ويحفظ الاختيار في localStorage، ويتبع النظام لو المستخدم مختارش، ويشغّل script صغير قبل الرسم فمفيش وميض أبيض.`,
          example: R`// globals.css
@custom-variant dark (&:where(.dark, .dark *));
// app/layout.tsx
import { ThemeProvider } from "next-themes";
<html lang="ar" dir="rtl" suppressHydrationWarning>
  <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  </body>
</html>
// theme-toggle.tsx ("use client")
const { resolvedTheme, setTheme } = useTheme();
<button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>غيّر الثيم</button>`,
          try: R`طبّق ده في مشروع Next، واختار dark واعمل refresh: مفيش وميض أبيض. وفي DevTools › Application › Local Storage شوف مفتاح [[theme]]. وبعدين امسح [[suppressHydrationWarning]] وشوف التحذير في الكونسول.`,
          flag: "script",
          deep: {
            why: "المستخدمين متوقعين dark mode، وأي موقع بيفتح أبيض ثانية وبعدين يغمق بيبان مكسور. المشكلة إن السيرفر مش عارف اختيار المستخدم (محفوظ في المتصفح)، فلازم حاجة تحط الكلاس قبل ما الصفحة تترسم.",
            how: R`[[@custom-variant dark (&:where(.dark, .dark *))]] بيغيّر معنى [[dark:bg-x]] لـ «لو العنصر نفسه أو جد ليه عليه [[.dark]]». و [[:where]] عشان الـ variant ميزودش specificity، فـ [[dark:bg-x]] يفضل بنفس وزن أي utility (كلاس واحد). ولو بتستخدم attribute: [[&:where([data-theme=dark], [data-theme=dark] *)]].

next-themes بيحقن [[<script>]] صغير في أول الصفحة بيتنفذ قبل الرسم: بيقرا localStorage (أو [[prefers-color-scheme]] لو system) ويحط الكلاس على html، وكمان [[color-scheme]] عشان الـ scrollbars وحقول الفورم تغمق هي كمان. بس السيرفر رسم html من غير الكلاس، فـ React هيلاقي فرق وقت الـ hydration، و [[suppressHydrationWarning]] بيسكّت التحذير ده على العنصر ده بس.

أي حاجة شكلها بيعتمد على الثيم في JavaScript (أيقونة شمس أو قمر) مش معروفة على السيرفر. فالمكون لازم يستنى لحد ما يتعمل mount: [[useEffect(() => setMounted(true), [])]]، وقبلها يعرض placeholder بنفس المقاس.

الطريقة الأنضف من [[dark:]] على كل عنصر: متغيرات. [[:root { --bg: white }]] و [[.dark { --bg: black }]] وتوكن [[--color-bg]] في [[@theme inline]]، فتكتب [[bg-bg]] بس وهو يتغير لوحده، ودا اللي shadcn بيعمله.

وفيه حل من غير script خالص: cookie فيها الثيم، والسيرفر يحط الكلاس في الـ HTML نفسه. في مشروع حقيقي كان كده: الـ layout بيقرا الـ cookie ويحط [[data-theme]] على html، فمفيش وميض ولا فرق hydration.`,
            when: R`أي موقع أو داشبورد. ولو الموقع landing بسيط، [[dark:]] الافتراضي اللي بيتبع النظام ممكن يكفي من غير زرار.`,
            mistakes: R`تنسى [[suppressHydrationWarning]]. تعرض أيقونة الثيم من غير mounted فتظهر غلط وبعدين تتقلب. تكتب [[darkMode: "class"]] في tailwind.config.js في مشروع v4 ومفيش حاجة بتحصل: v4 مش بيقرا الملف ده غير بـ [[@config]]. و [[dark:]] على كل عنصر في المشروع بدل متغيرات، فأي لون جديد يتنسي في وضع من الاتنين.`
          },
          teach: R`## كلاس على [[<html>]] بيقلب الصفحة كلها

الفكرة كلها: [[dark:]] يشتغل لما يبقى فيه كلاس [[dark]] فوق، و next-themes هو اللي بيحط الكلاس ده ويشيله ويفتكره. حطينا المثال في مشروع Next.js 16.4 (Tailwind 4.3.3، و next-themes 0.4.6)، وعملنا build وفتحناه في Chrome مرة والجهاز light ومرة dark (Playwright بيحاكي إعداد النظام).

---

## ١. [[globals.css]]: [[@custom-variant dark (&:where(.dark, .dark *));]]

- [[@custom-variant]]: أمر Tailwind v4 بيعرّف variant جديد (أو يغيّر واحد موجود). اسمه هنا [[dark]].
- [[&]]: العنصر اللي عليه الكلاس نفسه.
- [[:where(.dark, .dark *)]]: «العنصر لو عليه [[.dark]]، أو لو جوه حد عليه [[.dark]]». والمسافة قبل [[*]] = «جوه، في أي عمق».
- [[:where()]] specificity بتاعها صفر، فالكلاس يفضل بوزن كلاس واحد زي أي utility.

القاعدة اللي طلعت في الـ CSS:

~~~text من الـ CSS الناتج
.dark\:bg-gray-950:where(.dark,.dark *){background-color:var(--color-gray-950)}
~~~

ومن غير السطر ده، [[dark:]] في v4 بيتبع [[prefers-color-scheme]] بتاع الجهاز، والزرار مش هيأثر.

## ٢. [[app/layout.tsx]]

### [[import { ThemeProvider } from "next-themes";]]

package بيدير الثيم: يحط الكلاس، ويحفظ الاختيار، ويقرا إعداد الجهاز.

### [[<html lang="ar" dir="rtl" suppressHydrationWarning>]]

[[lang]] و [[dir]] للعربي. و [[suppressHydrationWarning]] هنتكلم عنه في الخطوة ٥.

### [[<body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">]]

لونين لكل حاجة: [[bg-white]] و [[text-gray-900]] في العادي، و [[dark:bg-gray-950]] و [[dark:text-gray-100]] لما [[.dark]] تبقى على html.

### [[<ThemeProvider ...>]]

| الـ prop | يعني |
|---|---|
| [[attribute="class"]] | حط الثيم ككلاس على html ([[class="dark"]]). البديل [[data-theme]] |
| [[defaultTheme="system"]] | لو المستخدم لسه مختارش، امشي على الجهاز |
| [[enableSystem]] | اسمح بـ [[system]] كاختيار |
| [[disableTransitionOnChange]] | وقف كل الـ transitions لحظة التبديل، عشان كل لون ميتحركش لوحده |

و [[{children}]] = الصفحة نفسها.

## ٣. [[theme-toggle.tsx]]

الملف لازم يبدأ بـ [["use client"]] لأن الزرار فيه [[onClick]] و hook، ودول بيشتغلوا في المتصفح بس.

- [[const { resolvedTheme, setTheme } = useTheme();]]: [[useTheme]] hook بيرجّع object، والـ [[{ }]] بتطلّع منه اتنين بأساميهم.
- [[resolvedTheme]]: الثيم الفعلي، [[light]] أو [[dark]]. حتى لو الاختيار [[system]]، ده بيقولك النتيجة.
- [[setTheme("dark")]]: يغيّر الثيم ويحفظه.
- [[resolvedTheme === "dark" ? "light" : "dark"]]: الـ [[? :]] اسمه ternary: «لو dark خليه light، وإلا خليه dark».

---

## ٤. اللي حصل في المتصفح

### الجهاز light، أول مرة

~~~text الناتج
html class   = "...variable light"
html style   = "color-scheme: light;"
localStorage theme = null
body background    = rgb(255, 255, 255)
~~~

([[...variable]] ده كلاس الخط من درس next/font، ملوش علاقة.) ومفيش [[theme]] في localStorage لأن المستخدم لسه مختارش، فالثيم جاي من الجهاز.

### ضغطنا الزرار

~~~text الناتج
html class   = "...variable dark"
html style   = "color-scheme: dark;"
localStorage theme = "dark"
body background    = lab(1.90334 0.278696 -5.48866)    ← gray-950
~~~

[[color-scheme: dark]] بيقول للمتصفح يغمّق حاجاته هو كمان: الـ scrollbar وحقول الفورم.

### refresh

الكلاس كان [[dark]] و [[color-scheme: dark]] **قبل** ما الصفحة تخلص تحميل (قسناه لحظة [[readyState = "interactive"]]، قبل ما React يشتغل). يعني مفيش لحظة بيضا.

### الجهاز dark، أول مرة

فتح [[dark]] لوحده من غير ما نضغط حاجة. ضغطنا الزرار: بقى [[light]] واتحفظ، ومع إن الجهاز لسه dark الخلفية بيضا. ده بالظبط شغل [[@custom-variant]]: [[dark:]] بقى بيسمع للكلاس مش للجهاز.

### إزاي مفيش وميض؟

الـ HTML اللي جاي من السيرفر:

~~~text الناتج
<html lang="ar" dir="rtl" class="pW5XIG_variable">
<body class="..."><div hidden=""></div><script>(...)("class","theme","system",null,["light","dark"],null,true,true)</script>
~~~

السيرفر مش عارف اختيارك، فبعت html **من غير** dark. بس أول حاجة في الـ body [[<script>]] صغير بيتنفّذ قبل ما أي حاجة تترسم: بيقرا [[localStorage.getItem("theme")]]، ولو مفيش أو [[system]] بيسأل [[matchMedia("(prefers-color-scheme: dark)")]]، ويحط الكلاس والـ [[color-scheme]] على html.

## ٥. [[suppressHydrationWarning]]

React لما بيشتغل في المتصفح (hydration) بيقارن الـ HTML اللي جه من السيرفر باللي هو كان هيرسمه. والـ script غيّر html قبله. شلنا الـ prop وشغّلنا [[next dev]] والجهاز dark:

~~~text الـ Console
A tree hydrated but some attributes of the server rendered HTML didn't match the client properties.
  <html
    lang="ar"
    dir="rtl"
+   className="cairo_..._variable"
-   className="cairo_..._variable dark"
-   style={{color-scheme:"dark"}}
  >
~~~

[[+]] = اللي React متوقعه، و [[-]] = اللي لقاه فعلًا. الفرق في [[className]] و [[style]] بتوع html بس، ودول متوقعين. رجّعنا الـ prop: الخطأ اختفى. وهو بيسكّت html نفسه بس، مش اللي جواه.

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[@custom-variant dark (...)]] | [[dark:]] يسمع للكلاس مش للجهاز |
| [[attribute="class"]] | next-themes يحط [[class="dark"]] على html |
| [[defaultTheme="system"]] + [[enableSystem]] | من غير اختيار: زي الجهاز |
| الـ script في أول الـ body | يحط الكلاس قبل الرسم، فمفيش وميض |
| [[localStorage.theme]] | الاختيار المحفوظ |
| [[suppressHydrationWarning]] | يسكّت فرق html المتوقع |
| [[resolvedTheme]] | الثيم الفعلي للزرار |`,
          lines: [
            R`[[dark:]] يشتغل لما [[.dark]] تبقى على العنصر أو أي جد ليه، بدل ما يتبع النظام.`,
            "المكتبة.",
            R`[[suppressHydrationWarning]] لأن next-themes هيحط كلاس على html قبل React، فالسيرفر والمتصفح هيختلفوا في الحتة دي بس.`,
            "ألوان الوضعين.",
            R`[[attribute="class"]] يحط [[.dark]]، والافتراضي النظام، و [[disableTransitionOnChange]] يمنع كل الـ transitions تشتغل مع بعض وقت التبديل.`,
            "الصفحة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`[[resolvedTheme]] = الثيم الفعلي (لو system بيقولك light ولا dark).`,
            "زرار بيقلب."
          ],
          sol: R`بعد ما تختار dark وتعمل refresh: الصفحة بتفتح غامقة من أول frame، من غير ولا لمحة بيضا. لو فتحت Elements هتلاقي على [[<html>]] ‏[[class="dark"]] ومعاها [[style="color-scheme: dark;"]]، ودول اتحطوا بـ script صغير next-themes بيحطه قبل ما الصفحة تترسم. وفي Application › Local Storage هتلاقي مفتاح [[theme]] وقيمته [[dark]] (أو [[light]]، ولو لسه مختارتش هتلاقيه مش موجود أو [[system]]).

لما تمسح [[suppressHydrationWarning]] وتعمل refresh وانت على dark: في الـ Console خطأ hydration من React بيقول إن attributes الـ HTML اللي جاي من السيرفر مش زي اللي على العميل، وهتلاقي فيه [[class]] و [[style]] بتوع الـ html. ده لأن السيرفر بعت html من غير class، والـ script غيّرها قبل React. الـ prop ده بيسكّت التحذير للعنصر ده بس، مش لأولاده.

لو لسه فيه وميض أبيض: اتأكد إن [[@custom-variant dark]] مكتوب (من غيره [[dark:]] بيشتغل على ثيم الجهاز مش على الكلاس)، وإن [[attribute="class"]] على الـ provider. ولو الزرار مش بيعمل حاجة أول مرة، غالبًا بتقرا [[theme]] (اللي ممكن يبقى [[system]]) بدل [[resolvedTheme]].`
        },
        {
          cmd: "logical properties",
          title: "مكون واحد يشتغل عربي وإنجليزي من غير rtl: في كل حتة",
          desc: R`بدل [[left]] و [[right]] استخدم start و end: [[ms-4]] (margin-inline-start) بدل [[ml-4]]، و [[pe-2]] بدل [[pr-2]]، و [[text-start]] بدل [[text-left]]، و [[inset-s-0]] بدل [[left-0]]، و [[rounded-s-lg]] و [[border-e]]. دول بيتقلبوا لوحدهم مع [[dir]].

والحاجات اللي ليها اتجاه (سهم «التالي»، أيقونة رجوع) اقلبها بـ [[rtl:-scale-x-100]]. أما أيقونة زي البحث أو الساعة فسيبها.`,
          example: R`<div className="flex items-center gap-3 ps-4 pe-2">
  <img className="size-10 rounded-full" src="/u.jpg" alt="" />
  <p className="text-start">محمد</p>
  <span className="ms-auto">من 5 دقايق</span>
</div>
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
<aside className="border-e ps-6">...</aside>
<span className="absolute top-2 inset-e-2">جديد</span>
<span dir="ltr">+20 100 000 0000</span>`,
          try: R`اعمل المكون ده وقلّب [[dir]] على html بين rtl و ltr: كل حاجة هتتقلب صح. بعدين غيّر [[ms-auto]] لـ [[ml-auto]] وشوف الوقت لزق في الناحية الغلط في العربي.`,
          flag: "script",
          deep: {
            why: R`موقع عربي وإنجليزي بـ left و right معناه نسختين من كل مكون، أو [[rtl:]] على كل عنصر. الـ logical properties بتخلي الكود يوصف «البداية والنهاية» مش «الشمال واليمين»، والمتصفح يحوّلهم حسب اتجاه الصفحة.`,
            how: R`في CSS: [[margin-inline-start]] و [[padding-inline-end]] و [[inset-inline-start]] و [[border-inline-end]] و [[text-align: start]]. الـ inline = اتجاه الكتابة (أفقي في العربي والإنجليزي)، والـ block = الاتجاه العمودي عليه (فوق وتحت). فـ [[margin-block]] = فوق وتحت، و [[padding-inline]] = الجنبين.

في Tailwind: [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] و [[inset-s-*]] و [[inset-e-*]] و [[rounded-s-*]] و [[rounded-e-*]] و [[border-s]] و [[border-e]] و [[text-start]] و [[text-end]]. و [[mx-*]] و [[px-*]] أصلًا متماثلين فمش فارقين. ([[start-*]] و [[end-*]] للـ position بقوا deprecated من v4.2 لصالح [[inset-s-*]] و [[inset-e-*]].)

اللي مش بيتقلب لوحده: [[translate-x]] (الرقم الموجب دايمًا يمين)، و [[rotate]]، والـ gradients ([[bg-linear-to-r]])، والظل اللي ليه إزاحة أفقية، و [[background-position]]. دول محتاجين [[rtl:]]: [[rtl:-translate-x-1]] أو [[rtl:bg-linear-to-l]].

الأيقونات: اللي معناها اتجاه (أسهم التالي والسابق، ورجوع، وإرسال، والـ chevrons في الـ breadcrumb) بتتقلب. واللي بتمثل حاجة حقيقية (ساعة، وبحث، و play في مشغل فيديو، وعلامة صح) متتقلبش. في مشروع حقيقي أيقونات الأسهم كلها كانت [[rtl:-scale-x-100]]، والحركة عند الـ hover [[rtl:group-hover:-translate-x-1]]، والأرقام والأوقات عليها [[dir="ltr"]]. و shadcn فيه [[--rtl]] بيحوّل مكوناته لـ logical لوحده.`,
            when: "أي مشروع ممكن يبقى فيه عربي، حتى لو دلوقتي إنجليزي بس. عوّد إيدك على ms و pe من الأول، مفيش أي تكلفة.",
            mistakes: R`[[ml-2]] للمسافة بين أيقونة وكلام، وفي العربي الأيقونة تلزق في الكلام والمسافة تروح الناحية التانية (أحسن [[gap-2]] على الأب). تقلب كل الأيقونات فالساعة تلف بالعكس. و [[translate-x]] في animation أو toggle من غير [[rtl:]]. وساعات الحل المقبول [[dir="ltr"]] على العنصر ده بس، لو شكله مش مرتبط باللغة.`
          },
          teach: R`## «البداية» و «النهاية» بدل «شمال» و «يمين»

كل كلاس في المثال بيقول «من ناحية البداية» أو «من ناحية النهاية»، والمتصفح بيعرف البداية فين من [[dir]]: في [[rtl]] البداية يمين، وفي [[ltr]] شمال. حطينا المثال في صفحة Vite (Tailwind 4.3.3) جوه صندوق عرضه 600 و [[relative]]، و [[ArrowRight]] من lucide-react، وقسنا كل حاجة في Chrome مرة بـ [[dir="rtl"]] على html ومرة [[ltr]]. الأرقام تحت مكان العنصر من الطرف الشمال للصندوق (من - لـ).

---

## ١. الكلاسات بتطلّع إيه في CSS

~~~text من الـ CSS الناتج
.ps-4{padding-inline-start:calc(var(--spacing) * 4)}
.pe-2{padding-inline-end:calc(var(--spacing) * 2)}
.ms-auto{margin-inline-start:auto}
.ml-auto{margin-left:auto}
.text-start{text-align:start}
.border-e{border-inline-end-style:var(--tw-border-style);border-inline-end-width:1px}
.inset-e-2{inset-inline-end:calc(var(--spacing) * 2)}
~~~

- **inline** = اتجاه السطر (الجنبين). و **block** = فوق وتحت.
- [[s]] = start (البداية)، و [[e]] = end (النهاية).
- [[ml-auto]] الوحيد اللي فيه [[left]] صريحة، فمش بيتقلب.

## ٢. الصف: [[<div className="flex items-center gap-3 ps-4 pe-2">]]

- [[flex items-center]]: العناصر جنب بعض ومتوسّطين رأسيًا. والـ flex نفسه بيمشي مع [[dir]]: أول عنصر عند البداية.
- [[gap-3]]: 12px بين كل عنصرين، من غير ما تحدد ناحية.
- [[ps-4]] و [[pe-2]]: 16px من البداية و 8px من النهاية.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[padding-right]] | 16px | 8px |
| [[padding-left]] | 8px | 16px |

## ٣. الصورة والاسم والوقت

~~~text App.tsx
<img className="size-10 rounded-full" src="/u.jpg" alt="" />
<p className="text-start">محمد</p>
<span className="ms-auto">من 5 دقايق</span>
~~~

- [[size-10]]: 40×40px. و [[rounded-full]]: دايرة. و [[alt=""]]: صورة للزينة، قارئ الشاشة يتجاهلها.
- [[text-start]]: الكلام على ناحية البداية. القيمة المحسوبة فضلت [[start]] في الحالتين، والمتصفح بيترجمها.
- [[ms-auto]]: margin من ناحية البداية بـ [[auto]]. في الـ flex الـ [[auto]] بياكل كل المساحة الفاضية، فبيزق العنصر لآخر الصف.

| العنصر | [[rtl]] | [[ltr]] |
|---|---|---|
| الصورة | 543 - 583 (يمين) | 17 - 57 (شمال) |
| «محمد» | 495 - 531 | 69 - 105 |
| الوقت بـ [[ms-auto]] | **9 - 84** (أقصى الشمال) | 516 - 591 (أقصى اليمين) |
| الوقت بـ [[ml-auto]] | **460 - 535** (لازق في الاسم) | 516 - 591 |

السطر الأخير هو الغلطة: [[ml-auto]] في [[ltr]] بيدّي نفس النتيجة بالظبط، فاللي بيجرّب بالإنجليزي بس مش هيشوف المشكلة. في [[rtl]] الـ margin الشمال زق الوقت يمين ناحية الاسم.

## ٤. زرار التالي: [[rtl:-scale-x-100]]

~~~text App.tsx
<button className="inline-flex items-center gap-2">
  التالي <ArrowRight className="size-4 rtl:-scale-x-100" />
</button>
~~~

- [[ArrowRight]]: سهم بيشاور يمين، يعني «لقدام» في الإنجليزي.
- [[-scale-x-100]]: [[scale-x]] = تكبير على المحور الأفقي، و [[100]] = 100٪، والسالب = اعكسه مراية.
- [[rtl:]]: بس لما الصفحة RTL.

| | [[rtl]] | [[ltr]] |
|---|---|---|
| [[scale]] المحسوب | [[-1 1]] (معكوس، بيشاور شمال) | [[none]] |

والـ selector اللي طلع في Tailwind 4.3.3:

~~~text من الـ CSS الناتج
.rtl\:-scale-x-100:where(:is(:lang(ar),:lang(he),:lang(fa),...),[dir=rtl],[dir=rtl] *){...}
~~~

يعني [[rtl:]] بيشتغل لو العنصر جوه [[dir="rtl"]] **أو** جوه [[lang]] لغة بتتكتب من اليمين (عربي، عبري، فارسي...). عشان كده خلي [[lang]] و [[dir]] على html متفقين.

## ٥. [[<aside className="border-e ps-6">]]

خط فاصل على ناحية النهاية، و 24px padding من البداية:

| | [[rtl]] | [[ltr]] |
|---|---|---|
| border شمال / يمين | 1px / 0 | 0 / 1px |
| padding شمال / يمين | 0 / 24px | 24px / 0 |

## ٦. الشارة: [[absolute top-2 inset-e-2]]

- [[absolute]]: مكانها محسوب من أقرب أب [[relative]] (الصندوق).
- [[top-2]]: 8px من فوق.
- [[inset-e-2]]: 8px من ناحية النهاية ([[inset-inline-end]]).

| | [[rtl]] | [[ltr]] |
|---|---|---|
| مكانها | 9 - 40 (الركن الشمال) | 560 - 591 (الركن اليمين) |
| [[left]] المحسوب | 8px | 559.266px |
| [[right]] المحسوب | 559.266px | 8px |

## ٧. [[<span dir="ltr">+20 100 000 0000</span>]]

جربنا نفس الرقم جوه سطر عربي مرتين، وقرينا ترتيب الحروف على الشاشة من الشمال لليمين:

~~~text الناتج
من غير dir:    0000 000 100 20+
dir="ltr":     +20 100 000 0000
~~~

من غير [[dir]]، المتصفح اعتبر كل مجموعة أرقام حتة لوحدها في سطر RTL، فرتّبهم من اليمين للشمال والـ [[+]] راحت للآخر. [[dir="ltr"]] على العنصر ده بس بيخليه يتكتب شمال ليمين صح.

## الخلاصة

| بدل | استخدم | CSS |
|---|---|---|
| [[ml-*]] / [[mr-*]] | [[ms-*]] / [[me-*]] | [[margin-inline-start/end]] |
| [[pl-*]] / [[pr-*]] | [[ps-*]] / [[pe-*]] | [[padding-inline-start/end]] |
| [[left-*]] / [[right-*]] | [[inset-s-*]] / [[inset-e-*]] | [[inset-inline-start/end]] |
| [[border-l]] / [[border-r]] | [[border-s]] / [[border-e]] | [[border-inline-start/end]] |
| [[text-left]] / [[text-right]] | [[text-start]] / [[text-end]] | [[text-align: start/end]] |

- الأيقونات اللي معناها اتجاه: [[rtl:-scale-x-100]].
- جرّب دايمًا في الاتجاهين، لأن الغلط مش بيبان في [[ltr]].`,
          lines: [
            "padding من البداية 16 ومن النهاية 8. في العربي البداية يمين.",
            "الصورة.",
            "الكلام محاذي للبداية مهما كانت اللغة.",
            R`[[ms-auto]] يزق الوقت لآخر الصف: شمال في العربي، يمين في الإنجليزي.`,
            "قفلة.",
            "زرار التالي.",
            R`السهم لليمين في الإنجليزي، و [[rtl:-scale-x-100]] يقلبه مراية في العربي.`,
            "قفلة.",
            "خط فاصل على ناحية النهاية، و padding من البداية.",
            R`شارة في ركن النهاية فوق. [[inset-e-2]] من v4.2 بدل [[end-2]].`,
            "رقم التليفون LTR جوه صفحة عربي."
          ],
          sol: R`مع [[dir="rtl"]]: الصورة على اليمين وجنبها «محمد»، و «من 5 دقايق» لازقة في أقصى الشمال، والـ padding الأكبر (16px) ناحية اليمين، وسهم «التالي» معكوس بيشاور شمال، والـ border بتاع الـ aside على الشمال، والشارة «جديد» في الركن الشمال فوق. قلّب لـ [[ltr]]: كل ده اتعكس (الصورة شمال، والوقت أقصى اليمين، والسهم يمين)، من غير ولا [[rtl:]] ولا سطر زيادة. رقم التليفون بيفضل [[+20 100 000 0000]] في الحالتين.

بعد ما تغيّر [[ms-auto]] لـ [[ml-auto]] في العربي: «من 5 دقايق» بقت لازقة في «محمد» والفراغ كله راح على الطرف الشمال. قست ده في صفحة عرضها 600: مع [[ms-auto]] الوقت كان من 8 لـ 82px (أقصى الشمال)، ومع [[ml-auto]] بقى من 409 لـ 483 جنب الاسم. لأن [[ml-auto]] = [[margin-left]] دايمًا، والوقت في rtl آخر عنصر وعلى الشمال أصلًا، فالـ margin زقّه لليمين ناحية الاسم. في الـ ltr التغيير مش هيبان لأن start = left، وده بالظبط ليه الغلط ده بيعدّي على اللي بيجرّب بالإنجليزي بس.`
        },
        {
          cmd: "next/font",
          title: "خط عربي بيتحمّل بسرعة ومن غير ما الصفحة تتنط",
          desc: R`[[next/font/google]] بينزّل الخط وقت الـ build ويخدمه من موقعك (مفيش request لجوجل)، وبيعمل خط احتياطي مقاساته مظبوطة فالكلام ميتنطش لما الخط الحقيقي يوصل. و [[variable]] بيطلّعه كمتغير CSS تربطه بـ Tailwind.

برا Next بتكتب [[@font-face]] بنفسك: ملف [[woff2]] من موقعك، و [[font-display: swap]] عشان الكلام يظهر بخط النظام لحد ما خطك يتحمّل.`,
          example: R`// app/layout.tsx
import { Cairo } from "next/font/google";
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
<html lang="ar" dir="rtl" className={cairo.variable}>
// globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
// من غير Next
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}`,
          try: R`حط Cairo بـ next/font، وافتح Network وفلتر على Font: هتلاقي ملف woff2 جاي من [[/_next/static/media]] مش من جوجل. وبعدين بطّأ النت (Slow 4G) واعمل refresh وشوف الكلام بيظهر بخط النظام وبعدين يتبدّل.`,
          flag: "script",
          deep: {
            why: "الخط تقل خفي: ملف أو اتنين، وكل واحد عشرات الـ KB، ولو جاي من سيرفر تاني بعد ما الـ CSS يتحمّل بيتأخر أكتر. والصفحة يا إما تفضل من غير كلام، يا إما الكلام يظهر بخط وبعدين يتبدّل ويتنط لأن المقاسات مختلفة (CLS).",
            how: R`[[font-display]] بيحدد المتصفح يعمل إيه لحد ما الخط يوصل: [[block]] يخفي الكلام شوية، و [[swap]] يعرضه بالخط الاحتياطي على طول ويبدّل أول ما يوصل، و [[optional]] يستنى لحظة، ولو الخط موصلش يكمّل بالاحتياطي في الصفحة دي (مفيش تبديل خالص). next/font الافتراضي swap.

مشكلة swap: الخط الاحتياطي (Arial مثلًا) عرض حروفه وارتفاع سطوره مختلف، فلما يتبدّل الفقرات بتطول أو تقصر والصفحة تتنط. next/font بيحل ده بـ [[adjustFontFallback]] (شغال افتراضيًا): بيعمل [[@font-face]] للخط الاحتياطي بـ [[size-adjust]] وقيم محسوبة، بحيث يبقى قد خطك تقريبًا.

[[subsets]] بيحدد أنهي subsets يتعملها preload. الباقي بيتخدم من موقعك برضه، والمتصفح بيحمّله بس لو الصفحة فيها حروف منه (unicode-range). والـ variable fonts ملف واحد لكل الأوزان بدل ملف لكل وزن. و [[--font-sans]] في Tailwind هو الخط الافتراضي للصفحة كلها (الـ Preflight بيحطه على html)، فتغييره بيغيّر الموقع كله.

و [[@import url(...)]] لخط من سيرفر خارجي جوه ملف الـ CSS أسوأ حالة: المتصفح لازم يحمّل الـ CSS بتاعك، ويلاقي الـ import، ويحمّل CSS الخط، ويلاقي ملف الخط، ويحمّله. سلسلة requests واحد ورا التاني.`,
            when: R`في Next دايمًا next/font. في Vite أو PHP: [[@font-face]] بملفات woff2 عندك، و [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للخط الأساسي بس.`,
            mistakes: R`في مشروع حقيقي كان globals.css بيبدأ بـ [[@import url("https://fonts.example.com/...")]] لخط لاتيني جنب خطوط next/font: request خارجي بيوقف الرسم، وكان ممكن يتنقل لـ [[next/font/local]]. وتحمّل 6 أوزان وانت بتستخدم 2. وتنسى subset الـ [[arabic]] فملف العربي ميتعملوش preload: الكلام يظهر بخط النظام الأول ويتبدّل متأخر (الملف بيتحمّل من موقعك برضه، بس بعد ما المتصفح يكتشف إنه محتاجه).`
          },
          teach: R`## الخط بقى ملف من موقعك

[[next/font]] بينزّل الخط من Google **وقت الـ build**، ويحطه جوه مشروعك، ويكتب الـ [[@font-face]] لوحده. والمستخدم بياخد الخط من سيرفرك انت. حطينا الجزء الأول في مشروع Next.js 16.4 (Tailwind 4.3.3) وعملنا build وفتحناه في Chrome، والجزء التاني ([[@font-face]] بإيدك) في صفحة Vite.

---

## ١. [[import { Cairo } from "next/font/google";]]

كل خط في Google Fonts ليه function بنفس اسمه. ولو الاسم فيه مسافة بتبقى [[_]]: [[Noto_Kufi_Arabic]].

## ٢. [[const cairo = Cairo({ ... });]]

| الخيار | يعني |
|---|---|
| [[subsets: ["arabic", "latin"]]] | أنهي أجزاء من الخط يتعملها preload (تحت) |
| [[variable: "--font-cairo"]] | اعمل متغير CSS بالاسم ده فيه اسم الخط |
| [[display: "swap"]] | [[font-display: swap]]: اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل |

Cairo خط **variable**: ملف واحد فيه كل الأوزان، فمش محتاج [[weight]]. وده باين في الـ CSS اللي اتولّد: [[font-weight:200 1000]].

## ٣. [[<html lang="ar" dir="rtl" className={cairo.variable}>]]

[[cairo.variable]] اسم كلاس اتولّد وقت الـ build. في الـ HTML طلع [[class="pW5XIG_variable"]]، والـ CSS بتاعه:

~~~text من الـ CSS الناتج
.pW5XIG_variable{--font-cairo:"Cairo", "Cairo Fallback"}
~~~

يعني الكلاس ده بس بيعرّف المتغير على html، ومش بيغيّر أي خط لوحده.

## ٤. [[globals.css]]: [[@theme inline]]

~~~text globals.css
@theme inline {
  --font-sans: var(--font-cairo), system-ui, sans-serif;
}
~~~

- [[--font-sans]] هو الخط الافتراضي في Tailwind، والـ Preflight بيحطه على [[html]]، فالموقع كله بياخده.
- [[var(--font-cairo)]]: هات قيمة المتغير اللي next/font عمله.
- [[system-ui, sans-serif]]: لو مفيش، خط النظام.
- [[inline]]: Tailwind يحط القيمة نفسها مكان ما بتتستخدم بدل [[var(--font-sans)]]. في الـ CSS الناتج لقينا [[--default-font-family:var(--font-cairo), system-ui, sans-serif]]، ومفيش [[--font-sans]] خالص. ده المطلوب لما قيمة في الـ theme بتشاور على متغير تاني: المتغير يتقري في مكان الاستخدام.

والنتيجة المحسوبة على الفقرة:

~~~text getComputedStyle
font-family: Cairo, "Cairo Fallback", system-ui, sans-serif
~~~

## ٥. اللي حصل وقت الـ build

next/font كتب 4 [[@font-face]]. ٣ لـ Cairo، كل واحد لجزء من الحروف، وواحد للخط الاحتياطي:

| الملف | الحروف ([[unicode-range]]) | preload |
|---|---|---|
| [[9ff27b8a0a8f3dc0-s.p....woff2]] | العربي ([[U+6??]]...) | أيوه |
| [[d41831e24743a3c1-s.p....woff2]] | اللاتيني الأساسي ([[U+??]]...) | أيوه |
| [[a5b03b231ce290a0-s....woff2]] | latin-ext (حروف أوروبية زيادة) | لأ |

- [[unicode-range]]: المتصفح بيحمّل الملف بس لو الصفحة فيها حروف من المدى ده.
- الـ [[.p.]] في الاسم = عليه [[<link rel="preload">]] في الـ head. اللي في [[subsets]] بس هما اللي اتعملهم preload.

والخط الاحتياطي:

~~~text من الـ CSS الناتج
@font-face{font-family:Cairo Fallback;src:local(Arial);ascent-override:137.65%;descent-override:60.32%;line-gap-override:0.0%;size-adjust:94.66%}
~~~

ده Arial اللي على الجهاز ([[local(Arial)]])، بس متعدّل: [[size-adjust:94.66%]] بيصغّر حروفه، و [[ascent-override]] و [[descent-override]] بيظبطوا ارتفاع السطر، عشان مقاساته تبقى قريبة من Cairo. فلما Cairo يوصل ويتبدّل، الكلام ميتنطش.

## ٦. في Chrome

~~~text الـ Network (نوع font)
/_next/static/media/9ff27b8a0a8f3dc0-s.p.40_3w74kn95bo.woff2
/_next/static/media/d41831e24743a3c1-s.p.08tn9snzkmifr.woff2
~~~

- ملفين بس اتحمّلوا: العربي واللاتيني، لأن الصفحة فيها عربي وكلمة Hello. الـ latin-ext متحمّلش.
- الاتنين من [[localhost]]، ومفيش ولا request لـ [[fonts.googleapis.com]] أو [[fonts.gstatic.com]].
- في الـ head لقينا [[<link rel="preload" as="font" type="font/woff2" crossorigin>]] للملفين دول.
- Chrome قال إن الكلام اترسم فعلًا بخط [[Cairo]] (custom).

---

## ٧. من غير Next: [[@font-face]] بإيدك

~~~text globals.css
@font-face {
  font-family: "Cairo";
  src: url("/fonts/cairo-var.woff2") format("woff2");
  font-weight: 200 1000;
  font-display: swap;
}
~~~

- [[font-family: "Cairo"]]: الاسم اللي هتكتبه بعدين في [[font-family]]. انت اللي بتختاره.
- [[src: url(...) format("woff2")]]: الملف من موقعك، و [[woff2]] أصغر صيغة خطوط.
- [[font-weight: 200 1000]]: الملف ده بيغطي كل الأوزان من 200 لـ 1000 (variable).
- [[font-display: swap]]: نفس الكلام اللي فوق.

جربناه في صفحة Vite، وأخّرنا ملف الخط ثانيتين عمدًا:

| الوقت | الخط اللي اترسم بيه الكلام | حالة الخط |
|---|---|---|
| 208ms | Segoe UI (خط ويندوز) | [[loading]] |
| 2340ms | Cairo | [[loaded]] |

يعني الكلام ظهر على طول بخط النظام، واتبدّل لما Cairo وصل. ده [[swap]]. بس هنا مفيش [[Cairo Fallback]] متظبط، فلو المقاسات مختلفة الكلام ممكن يتنط وقت التبديل، وده اللي next/font بيحله لوحده.

## الخلاصة

| | next/font | [[@font-face]] بإيدك |
|---|---|---|
| الملف | بينزل وقت الـ build ويتخدم من موقعك | انت بتحطه في [[public/fonts]] |
| preload | لوحده للـ [[subsets]] | [[<link rel="preload">]] بإيدك |
| خط احتياطي متظبط | لوحده ([[size-adjust]]) | مش موجود إلا لو كتبته |
| الربط بـ Tailwind | [[variable]] + [[--font-sans]] | [[--font-sans: "Cairo", ...]] |

- متنساش [[arabic]] في [[subsets]]، وإلا ملف العربي ميتعملوش preload.
- مفيش [[<link>]] لـ Google Fonts ولا [[@import url(...)]].`,
          lines: [
            R`أي خط من Google Fonts كـ function (المسافة في الاسم بتبقى [[_]]).`,
            R`الـ subsets اللي هيتعملها preload (العربي واللاتيني)، والباقي بيتخدم من موقعك برضه بس مش بيتحمّل غير لو اتستخدم. ومتغير CSS اسمه [[--font-cairo]]. Cairo خط variable فمش محتاج weights.`,
            "الكلاس بيعرّف المتغير على html.",
            R`Tailwind: [[font-sans]] يبقى Cairo.`,
            "Cairo الأول، ولو محمّلش خط النظام.",
            R`قفلة. [[inline]] لأنه بيشاور على متغير.`,
            "برا Next: تعريف الخط بإيدك.",
            R`الاسم اللي هتستخدمه في [[font-family]].`,
            "ملف woff2 من موقعك (أصغر صيغة).",
            "ملف variable واحد فيه كل الأوزان من 200 لـ 1000.",
            "اعرض الكلام فورًا بخط احتياطي وبدّل لما الخط يوصل.",
            "قفلة."
          ],
          sol: R`في Network بفلتر Font: هتلاقي ملف أو اتنين [[.woff2]] بأسماء فيها hash زي [[/_next/static/media/xxxxxxxx-s.p.woff2]]، والدومين هو دومين موقعك (localhost:3000)، ومفيش ولا request لـ [[fonts.googleapis.com]] ولا [[fonts.gstatic.com]]. Next نزّل الخط وقت الـ build وبيقدّمه من عندك. والـ [[.p.]] في الاسم معناها إن عليه preload في الـ head.

مع Slow 4G وrefresh: الكلام بيظهر الأول بخط النظام وبعد ثانية أو اتنين بيتبدّل لـ Cairo (ده الـ [[swap]]). والنطّة وقت التبديل صغيرة جدًا، لأن next/font بيعمل خط fallback اسمه زي [[Cairo Fallback]] معدّل بـ [[size-adjust]] عشان مقاساته تبقى قريبة من Cairo. هتلاقيه في Computed › font-family.

لو لقيت request لجوجل، يبقى فيه [[<link>]] لـ Google Fonts لسه في الـ layout أو [[@import url(...)]] في الـ CSS، امسحهم. ولو الخط متطبقش خالص، غالبًا [[--font-sans]] مش بيقرا [[var(--font-cairo)]] أو الـ [[className={cairo.variable}]] مش على [[<html>]].`
        },
        {
          cmd: "lucide-react",
          title: "أيقونات SVG كمكونات React",
          desc: R`في [[lucide-react]] كل أيقونة مكون: [[<Search />]] و [[<Menu />]] و [[<ChevronLeft />]]. بتستورد اللي محتاجه بس، والباقي مش بيدخل الـ bundle. الحجم بـ [[size-4]]، واللون بياخد [[currentColor]] فبيمشي مع [[text-*]].

ومن v1 الأيقونات عليها [[aria-hidden]] افتراضيًا، فلو الزرار أيقونة بس، لازم تدّي الزرار نفسه اسم بـ [[aria-label]].`,
          example: R`import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />
<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />`,
          try: R`اعمل زرار أيقونة بس من غير [[aria-label]] وافتح DevTools › Elements › Accessibility: اسمه فاضي. ضيف الـ label وشوف الاسم ظهر. وبعدين غيّر [[text-brand]] لـ [[text-red-600]] وشوف الأيقونة اتغيرت معاه.`,
          flag: "script",
          deep: {
            why: "الأيقونات كصور PNG بتتشوّه لما تكبر ومش بتاخد لون الكلام. وكـ font icons بتحمّل الخط كله عشان 10 أيقونات، وقارئ الشاشة ساعات يقرا حروف غريبة. SVG inline كمكون بيحل الاتنين: حاد في أي حجم، ولونه [[currentColor]]، وبتحمّل اللي بتستخدمه بس.",
            how: R`كل مكون بيرسم [[<svg>]] بـ [[viewBox="0 0 24 24"]] و [[stroke="currentColor"]] و [[fill="none"]]. [[currentColor]] معناها «لون الكلام بتاع العنصر»، فـ [[text-*]] على الأيقونة أو أي أب ليها بيلوّنها. والحجم الافتراضي 24، و [[size-4]] بيغلبه من الـ CSS.

[[strokeWidth]] بيغيّر سُمك الخط، وبيكبر مع الأيقونة. و [[absoluteStrokeWidth]] بيخليه ثابت بالبكسل مهما الأيقونة كبرت.

Tree-shaking: [[import { Search } from "lucide-react"]] مع bundler حديث بيدخّل Search بس. بس لو عملت [[import * as Icons]] واخترت بالاسم وقت التشغيل، الـ bundler مش هيعرف ويدخّل الكل (آلاف الأيقونات).

lucide v1 (2026): شال أيقونات البراندات (GitHub وفيسبوك وغيرهم)، وشال أسماء قديمة كانت متسابة كـ aliases (فلو import مش لاقي أيقونة دوّر على اسمها الجديد)، وبقى بيحط [[aria-hidden="true"]] على الأيقونات لوحده. ولو محتاج شعارات: Simple Icons أو SVG من البراند نفسه.`,
            when: "أي أيقونة UI في React. و shadcn بيستخدمه افتراضيًا.",
            mistakes: R`زرار أيقونة من غير اسم: قارئ الشاشة يقول «button» وخلاص. [[<Menu />]] من غير حجم جنب كلام صغير فيبان ضخم. وفي مشروع حقيقي زرار المنيو على الموبايل كان عليه [[aria-label="Toggle menu"]] كويس، بس ناقصه [[aria-expanded]] فقارئ الشاشة مش عارف القايمة مفتوحة ولا مقفولة (درس aria).`
          },
          teach: R`## كل أيقونة component بيرسم [[<svg>]]

[[<Search />]] مش صورة بتتحمّل: ده component بيرسم [[<svg>]] جوه الصفحة نفسها. حطينا المثال في صفحة Vite ([[lucide-react]] 1.52، و Tailwind 4.3.3، و [[--color-brand]] متعرّف) وقسنا في Chrome، وزودنا زرار تالت فيه [[<Menu />]] من غير [[aria-label]] للمقارنة.

---

## ١. [[import { Search, Menu, ChevronLeft, LoaderCircle } from "lucide-react";]]

بتستورد كل أيقونة باسمها. والأسامي PascalCase (كل كلمة أولها كابيتال) لأنها components.

وده بيفرق في الحجم. عملنا build لـ ٣ صفحات صغيرة بـ Vite وقارنّا ملف الـ JavaScript:

| الصفحة | حجم الـ JS |
|---|---|
| React بس، من غير أيقونات | 219.53 kB |
| [[import { Search, Menu }]] | 222.99 kB |
| [[import * as Icons]] واختيار الأيقونة بالاسم وقت التشغيل | **984.15 kB** |

الاستيراد بالاسم زوّد 3.5 kB بس. لكن [[import * as Icons]] مع [[Icons[name]]] دخّل كل الأيقونات، لأن الـ bundler مش عارف وقت الـ build انت هتختار أنهي واحدة. ده اسمه tree-shaking: الـ bundler بيشيل الكود اللي محدش استخدمه، بس لازم يقدر يشوف ده من الكود.

## ٢. الـ SVG اللي بيطلع

ده اللي [[<Search className="size-4" />]] رسمه:

~~~text الناتج
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
     class="lucide lucide-search size-4" aria-hidden="true">
  <path d="m21 21-4.34-4.34"></path>
  <circle cx="11" cy="11" r="8"></circle>
</svg>
~~~

| الـ attribute | يعني |
|---|---|
| [[width="24" height="24"]] | الحجم الافتراضي 24px |
| [[viewBox="0 0 24 24"]] | الرسمة مرسومة على شبكة 24×24، وبتكبر وتصغر من غير ما تبوظ |
| [[fill="none"]] | مفيش تلوين جوه الأشكال، خطوط بس |
| [[stroke="currentColor"]] | لون الخط = لون الكلام ([[color]]) بتاع العنصر |
| [[stroke-width="2"]] | تخانة الخط 2 من 24 |
| [[aria-hidden="true"]] | قارئ الشاشة يتجاهلها. lucide v1 بيحطه لوحده |

و [[className]] بتاعك اتضاف جنب [[lucide lucide-search]].

## ٣. الزرار الأول: أيقونة وكلام

~~~text App.tsx
<button className="inline-flex items-center gap-2 text-brand">
  <Search className="size-4" /> بحث
</button>
~~~

- [[inline-flex items-center gap-2]]: الأيقونة والكلمة جنب بعض، في النص رأسيًا، و 8px بينهم.
- [[text-brand]] على الزرار: لون الكلام. والأيقونة جوه الزرار، فـ [[currentColor]] بتاعها بياخد نفس اللون.
- [[size-4]]: 16×16. الـ CSS بيغلب [[width="24"]] اللي على الـ svg.

القياس: الأيقونة 16px و [[stroke]] بتاعها [[oklch(0.55 0.2 265)]]، نفس لون الـ brand. غيّرنا [[text-brand]] لـ [[text-red-600]]: الكلام والأيقونة الاتنين بقوا [[oklch(0.577 0.245 27.325)]].

## ٤. الزرار التاني: أيقونة بس

~~~text App.tsx
<button aria-label="افتح القايمة" className="md:hidden">
  <Menu className="size-6" strokeWidth={1.5} />
</button>
~~~

- [[aria-label]]: اسم الزرار لقارئ الشاشة، لأن مفيش كلام جواه والأيقونة [[aria-hidden]].
- [[md:hidden]]: مستخبي من 768px وطالع. على عرض 800 الزرار كان [[display: none]]، وعلى 375 ظهر 24×24.
- [[size-6]] = 24px. و [[strokeWidth={1.5}]] = خط أرفع من الافتراضي، وطلع على الـ svg [[stroke-width="1.5"]].

الـ Accessibility tree على عرض 375:

~~~text الناتج
- button "بحث"
- button "افتح القايمة"
- button
~~~

التالت هو اللي زودناه من غير [[aria-label]]: [[button]] من غير اسم. قارئ الشاشة هيقول «button» وخلاص.

## ٥. [[<ChevronLeft className="size-4 shrink-0 ltr:rotate-180" />]]

- [[ChevronLeft]]: سهم صغير بيشاور شمال، يعني «التالي» في صفحة عربي.
- [[shrink-0]]: في flex ميتصغرش لو الكلام اللي جنبه طويل.
- [[ltr:rotate-180]]: في صفحة إنجليزي لفّه نص لفة فيشاور يمين.

| [[lang]] و [[dir]] على html | [[rotate]] المحسوب |
|---|---|
| [[ar]] و [[rtl]] | [[none]] (شمال) |
| [[en]] و [[ltr]] | [[180deg]] (يمين) |

## ٦. [[<LoaderCircle className="size-4 animate-spin motion-reduce:hidden" />]]

- [[animate-spin]]: animation اسمها [[spin]] مدتها 1s، بتلف على طول.
- [[motion-reduce:hidden]]: لو المستخدم مفعّل «حركة أقل» في نظامه ([[prefers-reduced-motion: reduce]])، اخفيها.

حاكينا الإعداد ده في Chrome: الأيقونة بقت [[display: none]] ومقاسها 0×0.

## الخلاصة

| عايز | اكتب |
|---|---|
| الحجم | [[size-4]] أو [[size-6]] |
| اللون | [[text-*]] على الأيقونة أو أي أب |
| تخانة الخط | [[strokeWidth={1.5}]] |
| زرار أيقونة بس | [[aria-label]] على الزرار |
| حجم bundle صغير | [[import { Name }]] مش [[import *]] |

- الأيقونة [[aria-hidden]] لوحدها، فالاسم لازم ييجي من الزرار.
- متلوّنهاش بـ [[fill-*]]: دي خطوط، لونها [[stroke]].`,
          lines: [
            "استورد الأيقونات بالاسم. اللي مش مستورد مش بيدخل الـ bundle.",
            R`زرار فيه أيقونة وكلام: اللون من [[text-brand]] بيوصل للأيقونة.`,
            "16px، والكلام اللي جنبها هو اسم الزرار.",
            "قفلة.",
            R`زرار أيقونة بس: [[aria-label]] هو اسمه لقارئ الشاشة.`,
            "الأيقونة نفسها مخفية عن قارئ الشاشة، وخطها أرفع من الافتراضي (2).",
            "قفلة.",
            R`سهم «التالي» في صفحة عربي بيشاور شمال، وفي الإنجليزي بيلف لليمين. و [[shrink-0]] عشان ميتزنقش جنب كلام طويل.`,
            "loader بيلف، ويختفي عند اللي طالبين حركة أقل."
          ],
          sol: R`زرار الأيقونة من غير [[aria-label]]: في Accessibility pane هتلاقي Role [[button]] و Name فاضي، وقارئ الشاشة بيقول «button» بس، و Lighthouse بيطلّعه في «Buttons do not have an accessible name». بعد [[aria-label="افتح القايمة"]] الـ Name بقى «افتح القايمة» وجنبه إنه جاي من [[aria-label]].

لما تغيّر [[text-brand]] لـ [[text-red-600]] على الزرار: الأيقونة والكلمة الاتنين بقوا أحمر مع بعض، لأن الـ SVG بتاع lucide مرسوم بـ [[stroke="currentColor"]]، يعني بياخد لون الـ [[color]] من الأب. لو فتحت الـ SVG في Elements هتلاقي [[stroke="currentColor"]] و [[fill="none"]].

الغلط الشائع: تحاول تلوّن الأيقونة بـ [[fill-red-600]] فتطلع مليانة ومشوّهة، لأن lucide أيقونات خطوط. اللون بالـ [[text-*]] والتخانة بـ [[strokeWidth]].`
        }
      ]
    }
]);

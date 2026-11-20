// تكملة تاب css: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/css/01.js (شرح حقول الدرس في أوله)
MORE("css", [
    {
      t: "Tailwind CSS v4",
      l: 2,
      n: "Tailwind بيقرا الكلاسات من ملفاتك ويطلّع CSS للي استخدمته بس، والتوكنز والإعداد كلهم في ملف CSS",
      projects: [
        { lvl: 'صغير', dir: "tw-badges", t: R`زراير و badges بالتوكنز`, what: R`[[@theme]] فيه لون البراند و ٤ ألوان حالات (نجاح وتحذير وخطر ومحايد) بنسخة [[-soft]] لكل واحد، وصفحة فيها زراير و badges بكل الحالات. من درس [[@theme]].`, done: R`مفيش ولا [[#hex]] ولا [[[...]]] في الـ HTML، وتغيير لون في [[@theme]] بيغيّر كل حاجة بتستخدمه، والكلام على كل badge مقري (درس [[contrast ratio]]).`, sol: R`~~~bash الترمنال
npm i -D tailwindcss@4.3.4 @tailwindcss/cli@4.3.4
npx @tailwindcss/cli -i in.css -o out.css
~~~

~~~css in.css
@import "tailwindcss";

/* every colour the page uses, by meaning. bg-brand, text-ok-ink, border-danger… come from these names */
@theme {
  --color-brand: #0f766e;
  --color-brand-soft: #ccfbf1;
  --color-brand-ink: #134e4a;

  --color-ok: #15803d;
  --color-ok-soft: #dcfce7;
  --color-ok-ink: #14532d;

  --color-warn: #b45309;
  --color-warn-soft: #fef3c7;
  --color-warn-ink: #78350f;

  --color-danger: #b91c1c;
  --color-danger-soft: #fee2e2;
  --color-danger-ink: #7f1d1d;

  --color-neutral: #475569;
  --color-neutral-soft: #f1f5f9;
  --color-neutral-ink: #1e293b;

  --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>زراير وشارات بالتوكنز</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="bg-neutral-soft font-sans text-neutral-ink">
<main class="mx-auto max-w-3xl space-y-8 p-4">
  <h1 class="text-2xl font-bold">زراير وشارات «مكتب الشحن»</h1>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold">الزراير</h2>
    <div class="flex flex-wrap gap-3">
      <button type="button" class="rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">اشحن طرد</button>
      <button type="button" class="rounded-lg bg-ok px-4 py-2 font-semibold text-white hover:bg-ok-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">أكّد الاستلام</button>
      <button type="button" class="rounded-lg bg-danger px-4 py-2 font-semibold text-white hover:bg-danger-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">ألغي الشحنة</button>
      <button type="button" class="rounded-lg border border-neutral bg-white px-4 py-2 font-semibold text-neutral-ink hover:bg-neutral-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">رجوع</button>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold">حالة الشحنة</h2>
    <ul class="flex flex-wrap gap-2">
      <li class="rounded-full bg-ok-soft px-3 py-1 text-sm font-semibold text-ok-ink">اتسلّمت</li>
      <li class="rounded-full bg-warn-soft px-3 py-1 text-sm font-semibold text-warn-ink">في الطريق</li>
      <li class="rounded-full bg-danger-soft px-3 py-1 text-sm font-semibold text-danger-ink">متأخرة</li>
      <li class="rounded-full bg-neutral-soft px-3 py-1 text-sm font-semibold text-neutral-ink ring-1 ring-neutral">مستنية</li>
      <li class="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-ink">جديدة</li>
    </ul>
    <ul class="flex flex-wrap gap-2">
      <li class="rounded-full bg-ok px-3 py-1 text-sm font-semibold text-white">اتسلّمت</li>
      <li class="rounded-full bg-warn px-3 py-1 text-sm font-semibold text-white">في الطريق</li>
      <li class="rounded-full bg-danger px-3 py-1 text-sm font-semibold text-white">متأخرة</li>
      <li class="rounded-full bg-neutral px-3 py-1 text-sm font-semibold text-white">مستنية</li>
      <li class="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">جديدة</li>
    </ul>
  </section>
</main>
</body>
</html>
~~~

[[out.css]] الملف اللي Tailwind بيطلّعه (11.7KB)، مبيتكتبش بالإيد ومبيتعدّلش.

~~~view 330 460 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>زراير وشارات بالتوكنز</title>
<style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-3xl: 48rem;
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --radius-lg: 0.5rem;
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --color-brand: #0f766e;
    --color-brand-soft: #ccfbf1;
    --color-brand-ink: #134e4a;
    --color-ok: #15803d;
    --color-ok-soft: #dcfce7;
    --color-ok-ink: #14532d;
    --color-warn: #b45309;
    --color-warn-soft: #fef3c7;
    --color-warn-ink: #78350f;
    --color-danger: #b91c1c;
    --color-danger-soft: #fee2e2;
    --color-danger-ink: #7f1d1d;
    --color-neutral: #475569;
    --color-neutral-soft: #f1f5f9;
    --color-neutral-ink: #1e293b;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .mx-auto {
    margin-inline: auto;
  }
  .flex {
    display: flex;
  }
  .max-w-3xl {
    max-width: var(--container-3xl);
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  :where(.space-y-3 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-8 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 8) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 8) * calc(1 - var(--tw-space-y-reverse)));
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-neutral {
    border-color: var(--color-neutral);
  }
  .bg-brand {
    background-color: var(--color-brand);
  }
  .bg-brand-soft {
    background-color: var(--color-brand-soft);
  }
  .bg-danger {
    background-color: var(--color-danger);
  }
  .bg-danger-soft {
    background-color: var(--color-danger-soft);
  }
  .bg-neutral {
    background-color: var(--color-neutral);
  }
  .bg-neutral-soft {
    background-color: var(--color-neutral-soft);
  }
  .bg-ok {
    background-color: var(--color-ok);
  }
  .bg-ok-soft {
    background-color: var(--color-ok-soft);
  }
  .bg-warn {
    background-color: var(--color-warn);
  }
  .bg-warn-soft {
    background-color: var(--color-warn-soft);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .font-sans {
    font-family: var(--font-sans);
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .text-brand-ink {
    color: var(--color-brand-ink);
  }
  .text-danger-ink {
    color: var(--color-danger-ink);
  }
  .text-neutral-ink {
    color: var(--color-neutral-ink);
  }
  .text-ok-ink {
    color: var(--color-ok-ink);
  }
  .text-warn-ink {
    color: var(--color-warn-ink);
  }
  .text-white {
    color: var(--color-white);
  }
  .ring-1 {
    --tw-ring-shadow: var(--tw-ring-inset, ) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-neutral {
    --tw-ring-color: var(--color-neutral);
  }
  @media (hover: hover) {
    .hover\:bg-brand-ink:hover {
      background-color: var(--color-brand-ink);
    }
    .hover\:bg-danger-ink:hover {
      background-color: var(--color-danger-ink);
    }
    .hover\:bg-neutral-soft:hover {
      background-color: var(--color-neutral-soft);
    }
    .hover\:bg-ok-ink:hover {
      background-color: var(--color-ok-ink);
    }
  }
  .focus-visible\:outline-3:focus-visible {
    outline-style: var(--tw-outline-style);
    outline-width: 3px;
  }
  .focus-visible\:outline-offset-2:focus-visible {
    outline-offset: 2px;
  }
  .focus-visible\:outline-warn:focus-visible {
    outline-color: var(--color-warn);
  }
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-space-y-reverse: 0;
      --tw-border-style: solid;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
    }
  }
}
</style>
</head>
<body class="bg-neutral-soft font-sans text-neutral-ink">
<main class="mx-auto max-w-3xl space-y-8 p-4">
  <h1 class="text-2xl font-bold">زراير وشارات «مكتب الشحن»</h1>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold">الزراير</h2>
    <div class="flex flex-wrap gap-3">
      <button type="button" class="rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">اشحن طرد</button>
      <button type="button" class="rounded-lg bg-ok px-4 py-2 font-semibold text-white hover:bg-ok-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">أكّد الاستلام</button>
      <button type="button" class="rounded-lg bg-danger px-4 py-2 font-semibold text-white hover:bg-danger-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">ألغي الشحنة</button>
      <button type="button" class="rounded-lg border border-neutral bg-white px-4 py-2 font-semibold text-neutral-ink hover:bg-neutral-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">رجوع</button>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold">حالة الشحنة</h2>
    <ul class="flex flex-wrap gap-2">
      <li class="rounded-full bg-ok-soft px-3 py-1 text-sm font-semibold text-ok-ink">اتسلّمت</li>
      <li class="rounded-full bg-warn-soft px-3 py-1 text-sm font-semibold text-warn-ink">في الطريق</li>
      <li class="rounded-full bg-danger-soft px-3 py-1 text-sm font-semibold text-danger-ink">متأخرة</li>
      <li class="rounded-full bg-neutral-soft px-3 py-1 text-sm font-semibold text-neutral-ink ring-1 ring-neutral">مستنية</li>
      <li class="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-ink">جديدة</li>
    </ul>
    <ul class="flex flex-wrap gap-2">
      <li class="rounded-full bg-ok px-3 py-1 text-sm font-semibold text-white">اتسلّمت</li>
      <li class="rounded-full bg-warn px-3 py-1 text-sm font-semibold text-white">في الطريق</li>
      <li class="rounded-full bg-danger px-3 py-1 text-sm font-semibold text-white">متأخرة</li>
      <li class="rounded-full bg-neutral px-3 py-1 text-sm font-semibold text-white">مستنية</li>
      <li class="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">جديدة</li>
    </ul>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** ٤ زراير (اشحن طرد أخضر مزرق، وأكّد الاستلام أخضر، وألغي الشحنة أحمر، ورجوع أبيض بحد)، وتحتهم سطرين شارات بالـ ٥ حالات: سطر فاتح كلامه غامق، وسطر مليان كلامه أبيض.

**[[@theme]] بيعمل utilities:** كل متغير اسمه [[--color-...]] بيبقى لون Tailwind بيعرفه. [[--color-ok-soft]] بيعمل [[bg-ok-soft]] و [[text-ok-soft]] و [[border-ok-soft]] وكل حاجة بتاخد لون. واتقاس في [[out.css]]: [[.bg-ok-soft { background-color: var(--color-ok-soft) }]]. يعني الـ utility بتشاور على المتغير، مش نسخة من اللون.

**الأسماء بالمعنى:** [[ok]] و [[warn]] و [[danger]] و [[neutral]] و [[brand]]، ولكل واحد ٣: اللون نفسه، و [[-soft]] (خلفية فاتحة)، و [[-ink]] (كلام غامق يتقري على الـ soft). مش [[green-700]]: لو البراند غيّر «النجاح» لأزرق، الاسم [[ok]] لسه صح، و [[green]] بقى كدب.

**مفيش ولا [[#hex]] ولا [[[...]]] في الـ HTML:** اتعدّت بـ grep: 0. كل لون من التوكنز. فتغيير سطر في [[@theme]] بيغيّر كل حاجة بتستخدمه: اتقاس بتغيير [[--color-ok]] لأزرق في الصفحة، والشارة والزرار الاتنين اتغيّروا.

**الكلام مقري:** كل [[-ink]] على [[-soft]] بتاعه، والأبيض على اللون المليان. axe: 0 مشاكل تباين.

**الـ focus:** [[focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn]]: حلقة بلون التحذير لما الكيبورد يوصل للزرار بس، مش مع الماوس.

~~~text الناتج (Chrome 157)
npx @tailwindcss/cli -i in.css -o out.css
≈ tailwindcss v4.3.4
Done in 42ms

out.css: 11,711 بايت، فيه 40 متغير --color-*
grep على index.html لـ #hex أو [ : 0
bg-ok قبل: rgb(21, 128, 61)   بعد --color-ok: #0369a1 ← rgb(3, 105, 161) (الشارة والزرار)
axe: 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'صغير', dir: "tw-course-card", t: R`كارت كورس بيتفاعل كله`, what: R`كارت لينك عليه [[group]]: العنوان يتلوّن، والسهم يتحرك (بـ [[rtl:]] عشان يتعكس)، والصورة تكبر جوه حدودها بـ [[overflow-hidden]]. من درس [[group و peer]].`, done: R`الحركة بتحصل بالماوس وبالـ Tab (زوّد [[group-focus-visible:]])، والسهم بيتحرك ناحية القراية في العربي والإنجليزي، ومع reduce الحركة بتقف بـ [[motion-safe:]].`, sol: R`~~~bash الترمنال
npm i -D tailwindcss@4.3.4 @tailwindcss/cli@4.3.4
npx @tailwindcss/cli -i in.css -o out.css
~~~

~~~css in.css
@import "tailwindcss";

@theme {
  --color-brand: #6d28d9;
  --color-brand-ink: #4c1d95;
  --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كورسات أكاديمية سطر</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="bg-slate-100 font-sans text-slate-900">
<main class="mx-auto grid max-w-4xl gap-4 p-4 sm:grid-cols-2">
  <h1 class="text-2xl font-bold sm:col-span-2">كورسات الشهر ده</h1>

  <!-- the whole card is ONE link with "group": everything inside reacts when the card is hovered or focused -->
  <a href="#css" class="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand">
    <div class="overflow-hidden">
      <img src="img/course.webp" alt="" width="800" height="450" class="aspect-video w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105">
    </div>
    <div class="space-y-2 p-4">
      <h2 class="text-lg font-bold transition-colors group-hover:text-brand group-focus-visible:text-brand">CSS من الصفر للمشاريع</h2>
      <p class="text-slate-600">٢٤ درس و ٦ مشاريع بحلولها.</p>
      <p class="flex items-center gap-2 font-semibold text-brand-ink">
        ابدأ الكورس
        <span aria-hidden="true" class="inline-block motion-safe:transition-transform rtl:rotate-180 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1 motion-safe:rtl:group-hover:-translate-x-1 motion-safe:rtl:group-focus-visible:-translate-x-1">→</span>
      </p>
    </div>
  </a>
</main>
</body>
</html>
~~~

~~~view 420 400 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>كورسات أكاديمية سطر</title>
<style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-slate-100: oklch(96.8% 0.007 247.896);
    --color-slate-200: oklch(92.9% 0.013 255.508);
    --color-slate-600: oklch(44.6% 0.043 257.281);
    --color-slate-900: oklch(20.8% 0.042 265.755);
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-4xl: 56rem;
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --radius-2xl: 1rem;
    --aspect-video: 16 / 9;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --color-brand: #6d28d9;
    --color-brand-ink: #4c1d95;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .mx-auto {
    margin-inline: auto;
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .inline-block {
    display: inline-block;
  }
  .aspect-video {
    aspect-ratio: var(--aspect-video);
  }
  .w-full {
    width: 100%;
  }
  .max-w-4xl {
    max-width: var(--container-4xl);
  }
  .items-center {
    align-items: center;
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  :where(.space-y-2 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .rounded-2xl {
    border-radius: var(--radius-2xl);
  }
  .bg-slate-100 {
    background-color: var(--color-slate-100);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .object-cover {
    object-fit: cover;
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .font-sans {
    font-family: var(--font-sans);
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .text-brand-ink {
    color: var(--color-brand-ink);
  }
  .text-slate-600 {
    color: var(--color-slate-600);
  }
  .text-slate-900 {
    color: var(--color-slate-900);
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-1 {
    --tw-ring-shadow: var(--tw-ring-inset, ) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-slate-200 {
    --tw-ring-color: var(--color-slate-200);
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  @media (hover: hover) {
    :is(:where(.group):hover .group-hover\:text-brand) {
      color: var(--color-brand);
    }
  }
  :is(:where(.group):focus-visible .group-focus-visible\:text-brand) {
    color: var(--color-brand);
  }
  .focus-visible\:outline-3:focus-visible {
    outline-style: var(--tw-outline-style);
    outline-width: 3px;
  }
  .focus-visible\:outline-offset-4:focus-visible {
    outline-offset: 4px;
  }
  .focus-visible\:outline-brand:focus-visible {
    outline-color: var(--color-brand);
  }
  @media (prefers-reduced-motion: no-preference) {
    .motion-safe\:transition-transform {
      transition-property: transform, translate, scale, rotate;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
    }
    .motion-safe\:duration-300 {
      --tw-duration: 300ms;
      transition-duration: 300ms;
    }
    @media (hover: hover) {
      :is(:where(.group):hover .motion-safe\:group-hover\:translate-x-1) {
        --tw-translate-x: var(--spacing);
        translate: var(--tw-translate-x) var(--tw-translate-y);
      }
      :is(:where(.group):hover .motion-safe\:group-hover\:scale-105) {
        --tw-scale-x: 105%;
        --tw-scale-y: 105%;
        --tw-scale-z: 105%;
        scale: var(--tw-scale-x) var(--tw-scale-y);
      }
    }
    :is(:where(.group):focus-visible .motion-safe\:group-focus-visible\:translate-x-1) {
      --tw-translate-x: var(--spacing);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
    :is(:where(.group):focus-visible .motion-safe\:group-focus-visible\:scale-105) {
      --tw-scale-x: 105%;
      --tw-scale-y: 105%;
      --tw-scale-z: 105%;
      scale: var(--tw-scale-x) var(--tw-scale-y);
    }
  }
  @media (width >= 40rem) {
    .sm\:col-span-2 {
      grid-column: span 2 / span 2;
    }
    .sm\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .rtl\:rotate-180:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
    rotate: 180deg;
  }
  @media (prefers-reduced-motion: no-preference) {
    @media (hover: hover) {
      :is(:where(.group):hover .motion-safe\:rtl\:group-hover\:-translate-x-1:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)) {
        --tw-translate-x: calc(var(--spacing) * -1);
        translate: var(--tw-translate-x) var(--tw-translate-y);
      }
    }
    :is(:where(.group):focus-visible .motion-safe\:rtl\:group-focus-visible\:-translate-x-1:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)) {
      --tw-translate-x: calc(var(--spacing) * -1);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-space-y-reverse: 0;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-duration: initial;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
    }
  }
}
</style>
</head>
<body class="bg-slate-100 font-sans text-slate-900">
<main class="mx-auto grid max-w-4xl gap-4 p-4 sm:grid-cols-2">
  <h1 class="text-2xl font-bold sm:col-span-2">كورسات الشهر ده</h1>

  <!-- the whole card is ONE link with "group": everything inside reacts when the card is hovered or focused -->
  <a href="#css" class="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand">
    <div class="overflow-hidden">
      <img src="data:image/webp;base64,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" alt="" width="800" height="450" class="aspect-video w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105">
    </div>
    <div class="space-y-2 p-4">
      <h2 class="text-lg font-bold transition-colors group-hover:text-brand group-focus-visible:text-brand">CSS من الصفر للمشاريع</h2>
      <p class="text-slate-600">٢٤ درس و ٦ مشاريع بحلولها.</p>
      <p class="flex items-center gap-2 font-semibold text-brand-ink">
        ابدأ الكورس
        <span aria-hidden="true" class="inline-block motion-safe:transition-transform rtl:rotate-180 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1 motion-safe:rtl:group-hover:-translate-x-1 motion-safe:rtl:group-focus-visible:-translate-x-1">→</span>
      </p>
    </div>
  </a>
</main>
</body>
</html>
~~~

**هتشوف إيه:** كارت كورس أبيض فيه صورة وعنوان «CSS من الصفر للمشاريع» وتحته «ابدأ الكورس ←». الماوس على أي حتة في الكارت: الصورة بتكبر شوية جوه حدودها، والعنوان بيبقى بنفسجي، والسهم بيتحرك خطوة لقدام. ونفس الكلام لما توصل للكارت بـ Tab.

**[[group]] على اللينك:** أي عنصر جواه يقدر يقول «لما الأب ده يبقى hover»: [[group-hover:text-brand]] على العنوان. و [[group-focus-visible:]] نفس الكلام مع الكيبورد. من غيرهم الكارت بيتفاعل للماوس بس.

**الصورة بتكبر جوه حدودها:** [[motion-safe:group-hover:scale-105]] على الصورة، و [[overflow-hidden]] على الصندوق اللي حواليها: الجزء اللي بيكبر برّه الصندوق بيتقص، فالكارت مبيكبرش.

**السهم في الاتجاهين:** السهم «→» مرسوم ناحية اليمين. في العربي القراية ناحية الشمال، فـ [[rtl:rotate-180]] بيقلبه. والحركة: [[group-hover:translate-x-1]] (يمين) للإنجليزي، و [[rtl:group-hover:-translate-x-1]] (شمال) للعربي. اتقاس: في rtl الـ translate = -4px والسهم اتحرك من 959 لـ 955، وفي ltr = 4px من 307 لـ 311.

**[[motion-safe:]]:** الحركة (التكبير والسهم) بتحصل بس لو المستخدم مش مختار «حركة أقل». تغيير لون العنوان مش حركة، فهو من غير [[motion-safe:]]. اتقاس بـ Playwright و [[reducedMotion: "reduce"]]: الصورة scale none والسهم translate none، والعنوان اتلوّن.

**فخ في القياس:** لما بدّلت الصفحة من rtl لـ ltr وقست على طول، السهم كان لسه [[rotate: 180deg]]. الـ [[transition]] بيحرّك الـ rotate كمان، والقياس كان في نص الحركة. بعد 400ms: [[none]].

~~~text الناتج (Playwright بـ Chrome 157)
rtl  rest:  translate none, rotate 180deg, x 959   hover: translate -4px, x 955   العنوان rgb(109, 40, 217)، الصورة scale 1.05
ltr  hover: translate 4px, rotate none, x 311 (كان 307)
Tab (الكيبورد): نفس ألوان وحركة الـ hover
reduce + hover: الصورة none، السهم none، العنوان rgb(109, 40, 217)
ltr right after switching: 180deg   بعد 400ms: none
axe: 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'متوسط', dir: "tw-drawer", t: R`navbar و drawer بـ Tailwind بس`, what: R`الـ navbar بتاع وحدة position بس بـ Tailwind: [[sticky top-0]] و [[backdrop-blur]] و [[hidden md:flex]]، و drawer من ناحية النهاية بـ [[translate-x-full rtl:-translate-x-full]] و [[aria-expanded:]] و [[data-[state=open]:]]. بيجمع [[variants]] و [[arbitrary values]].`, done: R`على 360 و 768 و 1280 مفيش scroll أفقي، والـ drawer بيدخل من الناحية الصح في الاتجاهين، و JavaScript بيغيّر attributes بس (مفيش [[classList.add]]).`, sol: R`~~~bash الترمنال
npm i -D tailwindcss@4.3.4 @tailwindcss/cli@4.3.4
npx @tailwindcss/cli -i in.css -o out.css
~~~

~~~css in.css
@import "tailwindcss";

@theme {
  --color-brand: #be123c;
  --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
  /* layers by name instead of random numbers: z-header, z-scrim, z-drawer */
  --z-index-header: 10;
  --z-index-scrim: 20;
  --z-index-drawer: 30;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مطعم الجنينة</title>
<link rel="stylesheet" href="out.css">
<script src="nav.js" defer></script>
</head>
<body class="bg-rose-50 font-sans text-slate-900">
<header class="sticky top-0 z-header flex items-center gap-4 bg-white/75 px-4 py-3 backdrop-blur border-b border-rose-100">
  <a href="#top" class="font-extrabold text-brand">مطعم الجنينة</a>
  <nav aria-label="الرئيسية" class="ms-auto hidden md:flex">
    <ul class="flex gap-5 font-semibold">
      <li><a href="#menu" class="hover:text-brand">المنيو</a></li>
      <li><a href="#branches" class="hover:text-brand">الفروع</a></li>
      <li><a href="#book" class="hover:text-brand">احجز</a></li>
    </ul>
  </nav>
  <button id="toggle" type="button" aria-expanded="false" aria-controls="drawer"
    class="ms-auto rounded-lg border border-rose-200 px-3 py-1 text-xl md:hidden aria-expanded:bg-rose-100">☰<span class="sr-only">القايمة</span></button>
</header>

<!-- the scrim and the drawer are OUTSIDE the header: backdrop-blur makes the header the box that fixed children measure from -->
<div id="scrim" data-state="closed" class="fixed inset-0 z-scrim bg-slate-900/50 data-[state=closed]:hidden md:hidden"></div>
<nav id="drawer" data-state="closed" aria-label="القايمة"
  class="fixed inset-y-0 end-0 z-drawer w-72 max-w-[80vw] bg-white p-6 pt-16 shadow-2xl transition-transform md:hidden
         data-[state=closed]:invisible data-[state=closed]:translate-x-full rtl:data-[state=closed]:-translate-x-full motion-reduce:transition-none">
  <ul class="space-y-1 text-lg font-semibold">
    <li><a href="#menu" class="block rounded-lg px-3 py-2 hover:bg-rose-50">المنيو</a></li>
    <li><a href="#branches" class="block rounded-lg px-3 py-2 hover:bg-rose-50">الفروع</a></li>
    <li><a href="#book" class="block rounded-lg px-3 py-2 hover:bg-rose-50">احجز</a></li>
  </ul>
</nav>

<main id="top" class="mx-auto max-w-3xl space-y-6 p-4">
  <h1 class="pt-8 text-3xl font-bold">أكل بيتي في جنينة</h1>
  <h2 id="menu" class="text-xl font-bold">المنيو</h2><p>مشويات، وطواجن، وسلطات من الجنينة.</p>
  <h2 id="branches" class="text-xl font-bold">الفروع</h2><p>فرعين: المعادي ومدينة نصر.</p>
  <h2 id="book" class="text-xl font-bold">احجز</h2><p>كلّمنا أو ابعت رسالة.</p>
  <div class="h-[120vh]" aria-hidden="true"></div>
</main>
</body>
</html>
~~~

~~~js nav.js
// the script only changes attributes; Tailwind's aria-expanded: and data-[state=…]: variants do the styling
const toggle = document.getElementById("toggle");
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");

function setOpen(open) {
  const state = open ? "open" : "closed";
  drawer.dataset.state = state;
  scrim.dataset.state = state;
  toggle.setAttribute("aria-expanded", String(open));
  if (open) drawer.querySelector("a").focus();
}
toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
scrim.addEventListener("click", () => setOpen(false));
drawer.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
addEventListener("keydown", e => {
  if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
});
~~~

~~~view 560 600 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مطعم الجنينة</title>
<style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-rose-50: oklch(96.9% 0.015 12.422);
    --color-rose-100: oklch(94.1% 0.03 12.58);
    --color-rose-200: oklch(89.2% 0.058 10.001);
    --color-slate-900: oklch(20.8% 0.042 265.755);
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-3xl: 48rem;
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --radius-lg: 0.5rem;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --color-brand: #be123c;
    --z-index-header: 10;
    --z-index-scrim: 20;
    --z-index-drawer: 30;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
  .fixed {
    position: fixed;
  }
  .sticky {
    position: sticky;
  }
  .inset-0 {
    inset: 0px;
  }
  .inset-y-0 {
    inset-block: 0px;
  }
  .end-0 {
    inset-inline-end: calc(var(--spacing) * 0);
  }
  .top-0 {
    top: 0px;
  }
  .z-drawer {
    z-index: var(--z-index-drawer);
  }
  .z-header {
    z-index: var(--z-index-header);
  }
  .z-scrim {
    z-index: var(--z-index-scrim);
  }
  .mx-auto {
    margin-inline: auto;
  }
  .ms-auto {
    margin-inline-start: auto;
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .hidden {
    display: none;
  }
  .h-\[120vh\] {
    height: 120vh;
  }
  .w-72 {
    width: calc(var(--spacing) * 72);
  }
  .max-w-3xl {
    max-width: var(--container-3xl);
  }
  .max-w-\[80vw\] {
    max-width: 80vw;
  }
  .items-center {
    align-items: center;
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .gap-5 {
    gap: calc(var(--spacing) * 5);
  }
  :where(.space-y-1 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(var(--spacing) * var(--tw-space-y-reverse));
    margin-block-end: calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-6 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-rose-100 {
    border-color: var(--color-rose-100);
  }
  .border-rose-200 {
    border-color: var(--color-rose-200);
  }
  .bg-rose-50 {
    background-color: var(--color-rose-50);
  }
  .bg-slate-900\/50 {
    background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-slate-900) 50%, transparent);
    }
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-white\/75 {
    background-color: color-mix(in srgb, #fff 75%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 75%, transparent);
    }
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .pt-8 {
    padding-top: calc(var(--spacing) * 8);
  }
  .pt-16 {
    padding-top: calc(var(--spacing) * 16);
  }
  .font-sans {
    font-family: var(--font-sans);
  }
  .text-3xl {
    font-size: var(--text-3xl);
    line-height: var(--tw-leading, var(--text-3xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-xl {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-extrabold {
    --tw-font-weight: var(--font-weight-extrabold);
    font-weight: var(--font-weight-extrabold);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .text-brand {
    color: var(--color-brand);
  }
  .text-slate-900 {
    color: var(--color-slate-900);
  }
  .shadow-2xl {
    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .backdrop-blur {
    --tw-backdrop-blur: blur(8px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, );
    backdrop-filter: var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, );
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  @media (hover: hover) {
    .hover\:bg-rose-50:hover {
      background-color: var(--color-rose-50);
    }
    .hover\:text-brand:hover {
      color: var(--color-brand);
    }
  }
  .aria-expanded\:bg-rose-100[aria-expanded="true"] {
    background-color: var(--color-rose-100);
  }
  .data-\[state\=closed\]\:invisible[data-state="closed"] {
    visibility: hidden;
  }
  .data-\[state\=closed\]\:hidden[data-state="closed"] {
    display: none;
  }
  .data-\[state\=closed\]\:translate-x-full[data-state="closed"] {
    --tw-translate-x: 100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  @media (prefers-reduced-motion: reduce) {
    .motion-reduce\:transition-none {
      transition-property: none;
    }
  }
  @media (width >= 48rem) {
    .md\:flex {
      display: flex;
    }
    .md\:hidden {
      display: none;
    }
  }
  .rtl\:data-\[state\=closed\]\:-translate-x-full:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)[data-state="closed"] {
    --tw-translate-x: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-backdrop-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-space-y-reverse: 0;
      --tw-border-style: solid;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-backdrop-blur: initial;
      --tw-backdrop-brightness: initial;
      --tw-backdrop-contrast: initial;
      --tw-backdrop-grayscale: initial;
      --tw-backdrop-hue-rotate: initial;
      --tw-backdrop-invert: initial;
      --tw-backdrop-opacity: initial;
      --tw-backdrop-saturate: initial;
      --tw-backdrop-sepia: initial;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
    }
  }
}
</style>
</head>
<body class="bg-rose-50 font-sans text-slate-900">
<header class="sticky top-0 z-header flex items-center gap-4 bg-white/75 px-4 py-3 backdrop-blur border-b border-rose-100">
  <a href="#top" class="font-extrabold text-brand">مطعم الجنينة</a>
  <nav aria-label="الرئيسية" class="ms-auto hidden md:flex">
    <ul class="flex gap-5 font-semibold">
      <li><a href="#menu" class="hover:text-brand">المنيو</a></li>
      <li><a href="#branches" class="hover:text-brand">الفروع</a></li>
      <li><a href="#book" class="hover:text-brand">احجز</a></li>
    </ul>
  </nav>
  <button id="toggle" type="button" aria-expanded="false" aria-controls="drawer"
    class="ms-auto rounded-lg border border-rose-200 px-3 py-1 text-xl md:hidden aria-expanded:bg-rose-100">☰<span class="sr-only">القايمة</span></button>
</header>

<!-- the scrim and the drawer are OUTSIDE the header: backdrop-blur makes the header the box that fixed children measure from -->
<div id="scrim" data-state="closed" class="fixed inset-0 z-scrim bg-slate-900/50 data-[state=closed]:hidden md:hidden"></div>
<nav id="drawer" data-state="closed" aria-label="القايمة"
  class="fixed inset-y-0 end-0 z-drawer w-72 max-w-[80vw] bg-white p-6 pt-16 shadow-2xl transition-transform md:hidden
         data-[state=closed]:invisible data-[state=closed]:translate-x-full rtl:data-[state=closed]:-translate-x-full motion-reduce:transition-none">
  <ul class="space-y-1 text-lg font-semibold">
    <li><a href="#menu" class="block rounded-lg px-3 py-2 hover:bg-rose-50">المنيو</a></li>
    <li><a href="#branches" class="block rounded-lg px-3 py-2 hover:bg-rose-50">الفروع</a></li>
    <li><a href="#book" class="block rounded-lg px-3 py-2 hover:bg-rose-50">احجز</a></li>
  </ul>
</nav>

<main id="top" class="mx-auto max-w-3xl space-y-6 p-4">
  <h1 class="pt-8 text-3xl font-bold">أكل بيتي في جنينة</h1>
  <h2 id="menu" class="text-xl font-bold">المنيو</h2><p>مشويات، وطواجن، وسلطات من الجنينة.</p>
  <h2 id="branches" class="text-xl font-bold">الفروع</h2><p>فرعين: المعادي ومدينة نصر.</p>
  <h2 id="book" class="text-xl font-bold">احجز</h2><p>كلّمنا أو ابعت رسالة.</p>
  <div class="h-[120vh]" aria-hidden="true"></div>
</main>
<script>
// the script only changes attributes; Tailwind's aria-expanded: and data-[state=…]: variants do the styling
const toggle = document.getElementById("toggle");
const drawer = document.getElementById("drawer");
const scrim = document.getElementById("scrim");

function setOpen(open) {
  const state = open ? "open" : "closed";
  drawer.dataset.state = state;
  scrim.dataset.state = state;
  toggle.setAttribute("aria-expanded", String(open));
  if (open) drawer.querySelector("a").focus();
}
toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
scrim.addEventListener("click", () => setOpen(false));
drawer.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
addEventListener("keydown", e => {
  if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setOpen(false); toggle.focus(); }
});
</script>
</body>
</html>
~~~

**هتشوف إيه:** هيدر أبيض شبه شفاف فيه «مطعم الجنينة»، وعلى الكمبيوتر ٣ روابط. على الموبايل مكانهم ☰، ولما تدوس عليه بيدخل درج أبيض من الشمال (النهاية في العربي) والصفحة وراه بتغمق.

**الهيدر:** [[sticky top-0]]، و [[bg-white/75]] (أبيض 75%)، و [[backdrop-blur]] (بيموّه اللي وراه). و [[hidden md:flex]] على الروابط: مستخبية، ومن 48rem بتبان. و [[md:hidden]] على ☰ العكس.

**الدرج برّه الهيدر، وده مقصود:** [[backdrop-blur]] بيخلي الهيدر «مرجع» لأي عنصر [[fixed]] جواه (اتقاس في مشروع عيادة الأسنان في وحدة position: عنصر [[fixed bottom-0]] جوه هيدر فيه blur وقف عند آخر الهيدر مش آخر الشاشة). فالدرج والـ scrim في الـ body جنب الهيدر، والـ z-index بتاعهم من توكنز: [[--z-index-header]] و [[--z-index-scrim]] و [[--z-index-drawer]] بيعملوا [[z-header]] و [[z-scrim]] و [[z-drawer]].

**الدرج بيتحرك بالـ attributes:** [[data-[state=closed]:translate-x-full]] بيبعده يمين، و [[rtl:data-[state=closed]:-translate-x-full]] يبعده شمال في العربي. و [[data-[state=closed]:invisible]] بيخفيه عن الكيبورد وقارئ الشاشة. و [[end-0]] بيحطه على النهاية في الاتجاهين.

**الـ JavaScript بيغيّر attributes بس:** [[data-state]] و [[aria-expanded]]. مفيش ولا [[classList]] (grep: 0). الشكل كله في الـ HTML من الـ variants: [[aria-expanded:bg-rose-100]] على ☰. كده الحالة اللي قارئ الشاشة بيقراها هي نفسها اللي الشكل بيتبني عليها.

**القفل:** الضغط على الـ scrim، أو Escape (والـ focus بيرجع لـ ☰)، أو اختيار لينك.

~~~text الناتج (Playwright بـ Chrome 157)
360 rtl:  scrollWidth 360، الدرج مقفول -288 لحد 0 (hidden)، مفتوح 0 لحد 288، aria-expanded true، data-state open
          elementFromPoint في نص الدرج: الدرج، والـ focus على «المنيو»
          Escape: aria-expanded false، والـ focus على ☰
360 ltr:  مقفول 360 لحد 648، مفتوح 72 لحد 360
768 و 1280: ☰ مستخبي، الروابط ظاهرة، scrollWidth = العرض
nav.js: classList = 0
axe: 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'متوسط', dir: "tw-themes", t: R`ثيمات بـ 3 ألوان من نفس الكلاسات`, what: R`[[@theme inline]] بيربط [[--color-bg]] و [[--color-fg]] و [[--color-brand]] بمتغيرات خام، و [[:root]] و [[[data-theme="dark"]]] و [[[data-theme="paper"]]] بيغيّروهم، وزرار بيبدّل [[data-theme]] على الـ html. من درس [[@theme]].`, done: R`الـ HTML مفيهوش ولا [[dark:]]، والتلات ثيمات شغالين، وsection جوه الصفحة ممكن ياخد ثيم مختلف عن الباقي (ده بيثبت إن inline شغال)، والاختيار متحفوظ بعد refresh (localStorage جوه try/catch).`, sol: R`~~~bash الترمنال
npm i -D tailwindcss@4.3.4 @tailwindcss/cli@4.3.4
npx @tailwindcss/cli -i in.css -o out.css
~~~

~~~css in.css
@import "tailwindcss";

/* inline: the utility gets var(--bg) itself, not a copy of today's value.
   so a theme that changes --bg anywhere (even on one section) changes bg-bg there */
@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-card: var(--card);
  --color-brand: var(--brand);
  --color-on-brand: var(--on-brand);
  --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
}

/* the raw values of each theme */
:root, [data-theme="light"] {
  --bg: #f8fafc; --fg: #0f172a; --muted: #475569; --card: #ffffff; --brand: #0369a1; --on-brand: #ffffff;
}
[data-theme="dark"] {
  --bg: #0b1120; --fg: #e2e8f0; --muted: #94a3b8; --card: #1e293b; --brand: #38bdf8; --on-brand: #0b1120;
}
[data-theme="paper"] {
  --bg: #f5f0e6; --fg: #3b2f20; --muted: #6b5a43; --card: #fffaf0; --brand: #9a3412; --on-brand: #fffaf0;
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مدونة حروف: ٣ ثيمات</title>
<link rel="stylesheet" href="out.css">
<script src="theme.js"></script>
</head>
<body class="bg-bg font-sans text-fg">
<main class="mx-auto max-w-3xl space-y-6 p-4">
  <header class="flex flex-wrap items-center justify-between gap-3">
    <h1 class="text-2xl font-bold">مدونة حروف</h1>
    <div class="flex gap-2" role="group" aria-label="الثيم">
      <button type="button" data-set="light" class="rounded-full border border-muted px-3 py-1 aria-pressed:bg-brand aria-pressed:text-on-brand">فاتح</button>
      <button type="button" data-set="dark" class="rounded-full border border-muted px-3 py-1 aria-pressed:bg-brand aria-pressed:text-on-brand">غامق</button>
      <button type="button" data-set="paper" class="rounded-full border border-muted px-3 py-1 aria-pressed:bg-brand aria-pressed:text-on-brand">ورقي</button>
    </div>
  </header>

  <article class="space-y-2 rounded-2xl bg-card p-5 shadow-sm">
    <h2 class="text-xl font-bold">ليه بنكتب بخط إيدنا لسه؟</h2>
    <p class="text-muted">مقال عن الكراسة والقلم في زمن الموبايل.</p>
    <a href="#read" class="inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-on-brand">اقرا المقال</a>
  </article>

  <!-- the same classes, but this section always uses the dark theme: inline makes that work -->
  <section data-theme="dark" class="space-y-2 rounded-2xl bg-bg p-5 text-fg">
    <h2 class="text-xl font-bold">ركن الليل</h2>
    <p class="text-muted">القسم ده غامق دايمًا، مهما كان ثيم الصفحة.</p>
    <a href="#night" class="inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-on-brand">مقالات بالليل</a>
  </section>
</main>
</body>
</html>
~~~

~~~js theme.js
// runs in <head>: put the saved theme on <html> before the page is painted (no flash of the wrong theme)
(function () {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* private window or storage blocked */ }
  if (saved) document.documentElement.dataset.theme = saved;

  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[data-set]");
    const mark = () => buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.set === document.documentElement.dataset.theme)));
    buttons.forEach(b => b.addEventListener("click", () => {
      document.documentElement.dataset.theme = b.dataset.set;
      try { localStorage.setItem("theme", b.dataset.set); } catch (e) {}
      mark();
    }));
    mark();
  });
})();
~~~

~~~view 430 430 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مدونة حروف: ٣ ثيمات</title>
<style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --spacing: 0.25rem;
    --container-3xl: 48rem;
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --radius-lg: 0.5rem;
    --radius-2xl: 1rem;
    --default-font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
    --default-mono-font-family: var(--font-mono);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .mx-auto {
    margin-inline: auto;
  }
  .flex {
    display: flex;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .max-w-3xl {
    max-width: var(--container-3xl);
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .items-center {
    align-items: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  :where(.space-y-2 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-6 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));
  }
  .rounded-2xl {
    border-radius: var(--radius-2xl);
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-muted {
    border-color: var(--muted);
  }
  .bg-bg {
    background-color: var(--bg);
  }
  .bg-brand {
    background-color: var(--brand);
  }
  .bg-card {
    background-color: var(--card);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-5 {
    padding: calc(var(--spacing) * 5);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .font-sans {
    font-family: system-ui, "Segoe UI", Tahoma, sans-serif;
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-xl {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .text-fg {
    color: var(--fg);
  }
  .text-muted {
    color: var(--muted);
  }
  .text-on-brand {
    color: var(--on-brand);
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .aria-pressed\:bg-brand[aria-pressed="true"] {
    background-color: var(--brand);
  }
  .aria-pressed\:text-on-brand[aria-pressed="true"] {
    color: var(--on-brand);
  }
}
:root, [data-theme="light"] {
  --bg: #f8fafc;
  --fg: #0f172a;
  --muted: #475569;
  --card: #ffffff;
  --brand: #0369a1;
  --on-brand: #ffffff;
}
[data-theme="dark"] {
  --bg: #0b1120;
  --fg: #e2e8f0;
  --muted: #94a3b8;
  --card: #1e293b;
  --brand: #38bdf8;
  --on-brand: #0b1120;
}
[data-theme="paper"] {
  --bg: #f5f0e6;
  --fg: #3b2f20;
  --muted: #6b5a43;
  --card: #fffaf0;
  --brand: #9a3412;
  --on-brand: #fffaf0;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-space-y-reverse: 0;
      --tw-border-style: solid;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
    }
  }
}
</style>
</head>
<body class="bg-bg font-sans text-fg">
<main class="mx-auto max-w-3xl space-y-6 p-4">
  <header class="flex flex-wrap items-center justify-between gap-3">
    <h1 class="text-2xl font-bold">مدونة حروف</h1>
    <div class="flex gap-2" role="group" aria-label="الثيم">
      <button type="button" data-set="light" class="rounded-full border border-muted px-3 py-1 aria-pressed:bg-brand aria-pressed:text-on-brand">فاتح</button>
      <button type="button" data-set="dark" class="rounded-full border border-muted px-3 py-1 aria-pressed:bg-brand aria-pressed:text-on-brand">غامق</button>
      <button type="button" data-set="paper" class="rounded-full border border-muted px-3 py-1 aria-pressed:bg-brand aria-pressed:text-on-brand">ورقي</button>
    </div>
  </header>

  <article class="space-y-2 rounded-2xl bg-card p-5 shadow-sm">
    <h2 class="text-xl font-bold">ليه بنكتب بخط إيدنا لسه؟</h2>
    <p class="text-muted">مقال عن الكراسة والقلم في زمن الموبايل.</p>
    <a href="#read" class="inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-on-brand">اقرا المقال</a>
  </article>

  <!-- the same classes, but this section always uses the dark theme: inline makes that work -->
  <section data-theme="dark" class="space-y-2 rounded-2xl bg-bg p-5 text-fg">
    <h2 class="text-xl font-bold">ركن الليل</h2>
    <p class="text-muted">القسم ده غامق دايمًا، مهما كان ثيم الصفحة.</p>
    <a href="#night" class="inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-on-brand">مقالات بالليل</a>
  </section>
</main>
<script>
// runs in <head>: put the saved theme on <html> before the page is painted (no flash of the wrong theme)
(function () {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* private window or storage blocked */ }
  if (saved) document.documentElement.dataset.theme = saved;

  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[data-set]");
    const mark = () => buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.set === document.documentElement.dataset.theme)));
    buttons.forEach(b => b.addEventListener("click", () => {
      document.documentElement.dataset.theme = b.dataset.set;
      try { localStorage.setItem("theme", b.dataset.set); } catch (e) {}
      mark();
    }));
    mark();
  });
})();
</script>
</body>
</html>
~~~

**هتشوف إيه:** مدونة فيها ٣ أزرار: فاتح، وغامق، وورقي. الضغط على أي واحد بيغيّر ألوان الصفحة كلها. وتحت قسم «ركن الليل» غامق دايمًا، حتى لو الصفحة فاتحة أو ورقي. ولو عملت refresh الاختيار بيفضل.

**الفكرة:** الكلاسات في الـ HTML نفسها في الـ ٣ ثيمات: [[bg-bg]] و [[text-fg]] و [[bg-brand]]. اللي بيتغيّر هو قيم المتغيرات الخام ([[--bg]] و [[--fg]]…) تحت [[[data-theme="dark"]]] وأخواته. مفيش ولا [[dark:]] في الـ HTML.

**ليه [[@theme inline]]:** من غير [[inline]]، Tailwind بيطلّع [[.bg-bg { background-color: var(--color-bg) }]]، و [[--color-bg: var(--bg)]] بيتحسب مرة واحدة على [[:root]] بقيمة [[--bg]] اللي هناك. فالقسم اللي عليه [[data-theme="dark"]] بيغيّر [[--bg]] عنده، بس [[--color-bg]] جاي جاهز من فوق ومش بيتغيّر. مع [[inline]] الـ utility نفسها [[var(--bg)]]، فبتقرا [[--bg]] من مكان العنصر.

اتقاس: نسخة من نفس الصفحة من غير [[inline]] والصفحة على «ورقي»: «ركن الليل» طلع [[rgb(245, 240, 230)]] (ورقي زي الصفحة). بـ [[inline]]: [[rgb(11, 17, 32)]] (غامق) في الـ ٣ ثيمات.

**الحفظ:** [[localStorage]] جوه [[try/catch]]: في شباك خاص أو لو الموقع ممنوع من التخزين، [[localStorage]] بيرمي error، والصفحة تكمّل عادي من غير حفظ. اتجرّب: [[localStorage]] بيرمي error، والضغط على «غامق» اشتغل، و 0 errors في الصفحة. و [[theme.js]] في الـ [[head]] من غير [[defer]] عشان الثيم يتحط قبل ما الصفحة تترسم، فمفيش ومضة بالثيم الغلط.

**الأزرار:** [[aria-pressed]] على اللي شغال، والشكل من [[aria-pressed:bg-brand]].

~~~text الناتج (Playwright بـ Chrome 157)
البداية:  html light، الصفحة rgb(248, 250, 252)، ركن الليل rgb(11, 17, 32)
dark:     الصفحة rgb(11, 17, 32)
paper:    الصفحة rgb(245, 240, 230)، ركن الليل rgb(11, 17, 32)
بعد refresh (كان paper): paper، والزرار المضغوط paper
من غير inline: ركن الليل rgb(245, 240, 230) = لون الصفحة
localStorage ممنوع: الثيم اتغيّر لـ dark، page errors 0
axe (فاتح وغامق وورقي): 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'متوسط', dir: "tw-admin", t: R`لوحة طلبات RTL بشارات حالة`, what: R`لوحة أدمن لمتجر ورد متخيل بـ Tailwind: ٤ كروت أرقام بـ auto-fit، وجدول آخر الطلبات فيه شارة لكل حالة (اتدفع، مستني الدفع، في الطريق، اتلغى). الشارة كلاس واحد [[badge]] من [[@utility]]، والحالة في الـ HTML [[data-status="paid"]] مش لون، والجدول بيعمل scroll جوه صندوقه على الموبايل. من دروس [[@theme]] و [[arbitrary values]] (والجداول من وحدة HTML).`, done: R`الـ HTML بيقول الحالة ([[data-status]]) والـ CSS بيقرر اللون، والجدول فيه [[th scope="col"]]، وعلى 360 الصفحة [[scrollWidth]] = العرض والجدول بس اللي بيتسحب، و axe صفر مشاكل (ولا [[landmark-unique]]).`, sol: R`~~~bash الترمنال
npm i -D tailwindcss@4.3.4 @tailwindcss/cli@4.3.4
npx @tailwindcss/cli -i in.css -o out.css
~~~

~~~css in.css
@import "tailwindcss";

@theme {
  --color-brand: #4338ca;
  --color-ok: #15803d;     --color-ok-soft: #dcfce7;     --color-ok-ink: #14532d;
  --color-warn: #b45309;   --color-warn-soft: #fef3c7;   --color-warn-ink: #78350f;
  --color-danger: #b91c1c; --color-danger-soft: #fee2e2; --color-danger-ink: #7f1d1d;
  --color-info-soft: #e0e7ff; --color-info-ink: #312e81;
  --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
}

/* one status badge, four looks: the HTML says what the status IS (data-status), the CSS decides how it looks */
@utility badge {
  display: inline-block;
  border-radius: 9999px;
  padding: 0.125rem 0.625rem;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
}
@layer components {
  .badge[data-status="paid"]      { background: var(--color-ok-soft);     color: var(--color-ok-ink); }
  .badge[data-status="pending"]   { background: var(--color-warn-soft);   color: var(--color-warn-ink); }
  .badge[data-status="cancelled"] { background: var(--color-danger-soft); color: var(--color-danger-ink); }
  .badge[data-status="shipped"]   { background: var(--color-info-soft);   color: var(--color-info-ink); }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحة متجر ورد: الطلبات</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="bg-slate-100 font-sans text-slate-900">
<main class="mx-auto max-w-6xl space-y-6 p-4">
  <h1 class="text-2xl font-bold">الطلبات النهارده</h1>

  <ul class="grid grid-cols-[repeat(auto-fit,minmax(min(12rem,100%),1fr))] gap-4">
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">طلبات جديدة</p><p class="text-3xl font-extrabold">٣٢</p></li>
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">اتدفعت</p><p class="text-3xl font-extrabold text-ok">٢٤</p></li>
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">مستنية الدفع</p><p class="text-3xl font-extrabold text-warn">٦</p></li>
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">اتلغت</p><p class="text-3xl font-extrabold text-danger">٢</p></li>
  </ul>

  <section aria-labelledby="orders-t" class="rounded-xl bg-white shadow-sm">
    <h2 id="orders-t" class="p-4 text-lg font-bold">آخر الطلبات</h2>
    <!-- the table scrolls inside its own box on a phone; the page does not -->
    <div class="overflow-x-auto focus-visible:outline-3 focus-visible:outline-brand" tabindex="0" role="region" aria-label="جدول الطلبات، بيتسحب بالعرض">
      <table class="w-full min-w-[36rem] text-start">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" class="px-4 py-2 text-start font-semibold">الطلب</th>
            <th scope="col" class="px-4 py-2 text-start font-semibold">العميل</th>
            <th scope="col" class="px-4 py-2 text-start font-semibold">المبلغ</th>
            <th scope="col" class="px-4 py-2 text-start font-semibold">الحالة</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤١</td><td class="px-4 py-3">هالة سمير</td><td class="px-4 py-3 tabular-nums">٤٥٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="paid">اتدفع</span></td></tr>
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤٢</td><td class="px-4 py-3">مروان فتحي</td><td class="px-4 py-3 tabular-nums">١٢٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="pending">مستني الدفع</span></td></tr>
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤٣</td><td class="px-4 py-3">نادية عادل</td><td class="px-4 py-3 tabular-nums">٨٠٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="shipped">في الطريق</span></td></tr>
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤٤</td><td class="px-4 py-3">طارق منير</td><td class="px-4 py-3 tabular-nums">٢٥٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="cancelled">اتلغى</span></td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>
</body>
</html>
~~~

~~~view 620 840 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>لوحة متجر ورد: الطلبات</title>
<style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-slate-50: oklch(98.4% 0.003 247.858);
    --color-slate-100: oklch(96.8% 0.007 247.896);
    --color-slate-600: oklch(44.6% 0.043 257.281);
    --color-slate-900: oklch(20.8% 0.042 265.755);
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-6xl: 72rem;
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --radius-xl: 0.75rem;
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --color-brand: #4338ca;
    --color-ok: #15803d;
    --color-ok-soft: #dcfce7;
    --color-ok-ink: #14532d;
    --color-warn: #b45309;
    --color-warn-soft: #fef3c7;
    --color-warn-ink: #78350f;
    --color-danger: #b91c1c;
    --color-danger-soft: #fee2e2;
    --color-danger-ink: #7f1d1d;
    --color-info-soft: #e0e7ff;
    --color-info-ink: #312e81;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .mx-auto {
    margin-inline: auto;
  }
  .badge {
    display: inline-block;
    border-radius: 9999px;
    padding: 0.125rem 0.625rem;
    font-size: 0.85rem;
    font-weight: 700;
    white-space: nowrap;
  }
  .grid {
    display: grid;
  }
  .table {
    display: table;
  }
  .w-full {
    width: 100%;
  }
  .max-w-6xl {
    max-width: var(--container-6xl);
  }
  .min-w-\[36rem\] {
    min-width: 36rem;
  }
  .grid-cols-\[repeat\(auto-fit\,minmax\(min\(12rem\,100\%\)\,1fr\)\)\] {
    grid-template-columns: repeat(auto-fit,minmax(min(12rem, 100%),1fr));
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  :where(.space-y-6 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.divide-y > :not(:last-child)) {
    --tw-divide-y-reverse: 0;
    border-bottom-style: var(--tw-border-style);
    border-top-style: var(--tw-border-style);
    border-top-width: calc(1px * var(--tw-divide-y-reverse));
    border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  }
  :where(.divide-slate-100 > :not(:last-child)) {
    border-color: var(--color-slate-100);
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .bg-slate-50 {
    background-color: var(--color-slate-50);
  }
  .bg-slate-100 {
    background-color: var(--color-slate-100);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .text-start {
    text-align: start;
  }
  .font-sans {
    font-family: var(--font-sans);
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-3xl {
    font-size: var(--text-3xl);
    line-height: var(--tw-leading, var(--text-3xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-extrabold {
    --tw-font-weight: var(--font-weight-extrabold);
    font-weight: var(--font-weight-extrabold);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .text-danger {
    color: var(--color-danger);
  }
  .text-ok {
    color: var(--color-ok);
  }
  .text-slate-600 {
    color: var(--color-slate-600);
  }
  .text-slate-900 {
    color: var(--color-slate-900);
  }
  .text-warn {
    color: var(--color-warn);
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal, ) var(--tw-slashed-zero, ) var(--tw-numeric-figure, ) var(--tw-numeric-spacing, ) var(--tw-numeric-fraction, );
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\:outline-3:focus-visible {
    outline-style: var(--tw-outline-style);
    outline-width: 3px;
  }
  .focus-visible\:outline-brand:focus-visible {
    outline-color: var(--color-brand);
  }
}
@layer components {
  .badge[data-status="paid"] {
    background: var(--color-ok-soft);
    color: var(--color-ok-ink);
  }
  .badge[data-status="pending"] {
    background: var(--color-warn-soft);
    color: var(--color-warn-ink);
  }
  .badge[data-status="cancelled"] {
    background: var(--color-danger-soft);
    color: var(--color-danger-ink);
  }
  .badge[data-status="shipped"] {
    background: var(--color-info-soft);
    color: var(--color-info-ink);
  }
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-divide-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-space-y-reverse: 0;
      --tw-divide-y-reverse: 0;
      --tw-border-style: solid;
      --tw-font-weight: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
    }
  }
}
</style>
</head>
<body class="bg-slate-100 font-sans text-slate-900">
<main class="mx-auto max-w-6xl space-y-6 p-4">
  <h1 class="text-2xl font-bold">الطلبات النهارده</h1>

  <ul class="grid grid-cols-[repeat(auto-fit,minmax(min(12rem,100%),1fr))] gap-4">
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">طلبات جديدة</p><p class="text-3xl font-extrabold">٣٢</p></li>
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">اتدفعت</p><p class="text-3xl font-extrabold text-ok">٢٤</p></li>
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">مستنية الدفع</p><p class="text-3xl font-extrabold text-warn">٦</p></li>
    <li class="rounded-xl bg-white p-4 shadow-sm"><p class="text-slate-600">اتلغت</p><p class="text-3xl font-extrabold text-danger">٢</p></li>
  </ul>

  <section aria-labelledby="orders-t" class="rounded-xl bg-white shadow-sm">
    <h2 id="orders-t" class="p-4 text-lg font-bold">آخر الطلبات</h2>
    <!-- the table scrolls inside its own box on a phone; the page does not -->
    <div class="overflow-x-auto focus-visible:outline-3 focus-visible:outline-brand" tabindex="0" role="region" aria-label="جدول الطلبات، بيتسحب بالعرض">
      <table class="w-full min-w-[36rem] text-start">
        <thead class="bg-slate-50 text-slate-600">
          <tr>
            <th scope="col" class="px-4 py-2 text-start font-semibold">الطلب</th>
            <th scope="col" class="px-4 py-2 text-start font-semibold">العميل</th>
            <th scope="col" class="px-4 py-2 text-start font-semibold">المبلغ</th>
            <th scope="col" class="px-4 py-2 text-start font-semibold">الحالة</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤١</td><td class="px-4 py-3">هالة سمير</td><td class="px-4 py-3 tabular-nums">٤٥٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="paid">اتدفع</span></td></tr>
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤٢</td><td class="px-4 py-3">مروان فتحي</td><td class="px-4 py-3 tabular-nums">١٢٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="pending">مستني الدفع</span></td></tr>
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤٣</td><td class="px-4 py-3">نادية عادل</td><td class="px-4 py-3 tabular-nums">٨٠٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="shipped">في الطريق</span></td></tr>
          <tr><td class="px-4 py-3 tabular-nums">#١٠٤٤</td><td class="px-4 py-3">طارق منير</td><td class="px-4 py-3 tabular-nums">٢٥٠ ج</td><td class="px-4 py-3"><span class="badge" data-status="cancelled">اتلغى</span></td></tr>
        </tbody>
      </table>
    </div>
  </section>
</main>
</body>
</html>
~~~

**هتشوف إيه:** «الطلبات النهارده»، و ٤ كروت (٣٢ جديد، و ٢٤ اتدفعت بالأخضر، و ٦ مستنية بالبرتقاني، و ٢ اتلغت بالأحمر)، وتحتهم جدول ٤ طلبات، وفي آخر كل سطر شارة ملونة بالحالة.

**الشارة: [[@utility]] و [[data-status]]:** [[@utility badge]] بيعمل كلاس [[badge]] (الشكل: كبسولة، وخط صغير تقيل). واللون من [[data-status]]: [[.badge[data-status="paid"]]] أخضر فاتح، وهكذا. ليه مش [[bg-ok-soft text-ok-ink]] على كل شارة؟ لأن الحالة جاية من البيانات: السيرفر أو الـ JS بيكتب [[data-status="paid"]] وبس، ومحدش محتاج يفتكر أنهي لون لأنهي حالة. والقواعد دي في [[@layer components]] عشان أي utility في الـ HTML تقدر تغلبها.

**الكروت:** [[grid-cols-[repeat(auto-fit,minmax(min(12rem,100%),1fr))]]]: قيمة [[[...]]] واحدة لأن Tailwind معندوش utility جاهزة لـ auto-fit. والأرقام [[tabular-nums]] (كل الأرقام نفس العرض، فالعمود بيتصف).

**الجدول على الموبايل:** [[overflow-x-auto]] على صندوق حواليه، و [[min-w-[36rem]]] على الجدول، فبيتسحب جوه الصندوق والصفحة لأ. والصندوق [[tabindex="0"]] و [[role="region"]] عشان الكيبورد يقدر يسحبه.

**الغلطة اللي axe مسكها:** أول نسخة الصندوق كان [[aria-labelledby="orders-t"]]، والـ [[<section>]] اللي فوقه [[aria-labelledby="orders-t"]] برضه. الاتنين بقوا region بنفس الاسم «آخر الطلبات»، و axe قال [[landmark-unique]]: قارئ الشاشة بيعرض اتنين بنفس الاسم ومش هتعرف الفرق. التصليح: الصندوق [[aria-label="جدول الطلبات، بيتسحب بالعرض"]].

~~~text الناتج (Playwright بـ Chrome 157)
360:  الصفحة scrollWidth 360 / 360 | صندوق الجدول 576 / 328 (بيتسحب جواه)
1280: الصفحة 1280 / 1280 | الصندوق 1120 / 1120
.badge[data-status="paid"] { background: var(--color-ok-soft); color: var(--color-ok-ink); }
axe: 0 violations (كانت landmark-unique:1 قبل aria-label)   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'كبير', dir: "tw-landing", t: R`landing ثنائية اللغة بـ Tailwind v4`, what: R`أعد بناء landing وحدة position (أو صفحة الاستوديو بتاعة وحدة Grid) بـ Tailwind v4 بس: [[@utility container-app]]، وتوكنز في [[@theme]]، و bento بـ [[grid-cols-12]] و [[col-span-*]]، وأسعار بـ [[grid-rows-subgrid]] وtoggle بـ [[has-checked:]]، وأسئلة بـ [[aria-expanded:]]، وعربي وإنجليزي بـ utilities منطقية ([[ms-*]] و [[ps-*]] و [[start-*]]) و [[rtl:]] للي مش منطقي (الأسهم و translate). بيجمع الوحدة دي مع وحدات Grid و position والصور.`, done: R`[[matrix.js]] (درس [[مصفوفة مقاسات]]) بيطلّع [[all sizes OK]] بالعربي والإنجليزي، و grep على المشروع مفيهوش [[ml-]] ولا [[mr-]] ولا [[pl-]] ولا [[pr-]] ولا [[left-]] ولا [[right-]]، و [[out.css]] بـ [[--minify]] أقل من 30KB، وكل قيمة [[[...]]] اتكتبت مرة واحدة أو اتحوّلت لتوكن.`, ext: R`زوّد dark mode بـ [[@custom-variant]] وثيم تالت، وقسّم الأقسام لـ components في React، واعمل build في CI يفشل لو [[out.css]] عدّى 30KB.`, sol: R`أعدت بناء صفحة عيادة الأسنان (مشروع وحدة position) بـ Tailwind v4 بس. [[lang.js]] و [[img/logo.svg]] زي ما هم من هناك.

~~~text tw-landing/
in.css  index.html  page.js  lang.js  img/logo.svg  matrix.js
out.css   (بيتعمل بالأمر، مبيتكتبش)
~~~

~~~bash الترمنال
npm i -D tailwindcss@4.3.4 @tailwindcss/cli@4.3.4 playwright-core@1.64.1
npx @tailwindcss/cli -i in.css -o out.css --minify
python -m http.server 8932      # في ترمنال تاني
node matrix.js
~~~

~~~css in.css
@import "tailwindcss";

/* the identity: colours, font, radius by meaning */
@theme {
  --color-brand: #0e7490;
  --color-brand-ink: #155e75;
  --color-brand-soft: #cffafe;
  --color-accent: #b45309;
  --color-page: #f0f9ff;
  --font-sans: system-ui, "Segoe UI", Tahoma, sans-serif;
  --radius-card: 1rem;
  --z-index-header: 10;
  --z-index-book: 20;
}

/* one class for the page width, used by every section */
@utility container-app {
  margin-inline: auto;
  max-width: 64rem;
  padding-inline: 1rem;
}

/* jumps to a section stop under the sticky header (its height is written by page.js) */
@layer base {
  :root { --header-h: 4rem; }
  h1, h2 { scroll-margin-top: calc(var(--header-h) + 1rem); }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة للأسنان</title>
<link rel="stylesheet" href="out.css">
<script src="lang.js"></script>
<script src="page.js" defer></script>
</head>
<body class="bg-page font-sans text-slate-900">
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-book focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white" data-en="Skip to content">اتخطى للمحتوى</a>

<header id="header" class="sticky top-0 z-header border-b border-brand/20 bg-white/80 backdrop-blur">
  <div class="container-app flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
    <a href="#main" class="flex items-center gap-2 font-extrabold"><img class="logo size-9" src="img/logo.svg" alt="" width="36" height="36"><span data-en="Ebtesama Dental">عيادة ابتسامة</span></a>
    <a href="?lang=en" lang="en" data-en="عربي" data-en-href="?lang=ar" data-en-lang="ar" class="rounded-lg border border-brand-ink px-3 py-1 font-bold text-brand-ink md:order-1">EN</a>
    <nav class="nav basis-full md:ms-auto md:basis-auto" aria-label="أقسام الصفحة" data-en-label="Page sections">
      <ul class="flex flex-wrap gap-x-1">
        <li><a href="#services" class="inline-block rounded-lg px-2 py-1.5 font-semibold text-brand-ink hover:bg-brand/10" data-en="Services">الخدمات</a></li>
        <li><a href="#prices" class="inline-block rounded-lg px-2 py-1.5 font-semibold text-brand-ink hover:bg-brand/10" data-en="Prices">الأسعار</a></li>
        <li><a href="#faq" class="inline-block rounded-lg px-2 py-1.5 font-semibold text-brand-ink hover:bg-brand/10" data-en="FAQ">أسئلة</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main" tabindex="-1" class="focus:outline-none">
  <section class="container-app py-12 text-center md:py-20">
    <h1 class="mx-auto max-w-[18ch] text-4xl font-extrabold leading-tight md:text-6xl" data-en="A smile you are not shy of">ابتسامة مش هتتكسف منها</h1>
    <p class="mx-auto mt-4 max-w-prose text-lg text-slate-600" data-en="Cleaning, whitening, fillings and braces. Same-week appointments.">تنضيف وتبييض وحشو وتقويم، ومواعيد في نفس الأسبوع.</p>
    <a href="#prices" class="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 font-bold text-white">
      <span data-en="See prices">شوف الأسعار</span><span aria-hidden="true" class="rtl:rotate-180">→</span>
    </a>
  </section>

  <!-- bento: 12 columns, cards of different widths -->
  <section class="container-app py-10" aria-labelledby="services">
    <h2 id="services" class="mb-6 text-3xl font-bold" data-en="Services">الخدمات</h2>
    <ul class="grid grid-cols-12 gap-4">
      <li class="col-span-12 rounded-card bg-brand-ink p-6 text-white md:col-span-7 md:row-span-2">
        <h3 class="text-2xl font-bold" data-en="Braces">تقويم</h3>
        <p class="mt-2 text-brand-soft" data-en="Clear aligners or metal braces, with a follow-up every month and a plan you can see from the first visit.">شفاف أو معدن، ومتابعة كل شهر، وخطة تشوفها من أول زيارة.</p>
      </li>
      <li class="col-span-12 rounded-card bg-white p-6 shadow-sm sm:col-span-6 md:col-span-5">
        <h3 class="text-xl font-bold" data-en="Cleaning">تنضيف</h3>
        <p class="mt-1 text-slate-600" data-en="Scaling and polishing in one 40-minute visit.">إزالة الجير وتلميع في زيارة ٤٠ دقيقة.</p>
      </li>
      <li class="col-span-12 rounded-card bg-white p-6 shadow-sm sm:col-span-6 md:col-span-5">
        <h3 class="text-xl font-bold" data-en="Whitening">تبييض</h3>
        <p class="mt-1 text-slate-600" data-en="Two to four shades lighter.">من درجتين لأربعة أفتح.</p>
      </li>
      <li class="col-span-12 rounded-card bg-brand-soft p-6 md:col-span-12">
        <h3 class="text-xl font-bold" data-en="Fillings">حشو</h3>
        <p class="mt-1 text-slate-700" data-en="Tooth-coloured fillings that don't show.">حشو بلون السنة مبيبانش.</p>
      </li>
    </ul>
  </section>

  <!-- prices: the checkbox switches monthly / yearly with has-checked:, no JavaScript -->
  <section class="group container-app py-10" aria-labelledby="prices">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h2 id="prices" class="text-3xl font-bold" data-en="Care plans">باقات المتابعة</h2>
      <label class="flex cursor-pointer items-center gap-3 font-semibold">
        <span data-en="Monthly">شهري</span>
        <input type="checkbox" class="peer sr-only" id="yearly">
        <span aria-hidden="true" class="relative h-7 w-12 rounded-full bg-slate-300 transition-colors peer-checked:bg-brand-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent
                     after:absolute after:start-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-5"></span>
        <span data-en="Yearly (save 20%)">سنوي (وفّر ٢٠٪)</span>
      </label>
    </div>
    <ul class="grid gap-4 md:grid-cols-3">
      <li class="row-span-4 grid grid-rows-subgrid gap-2 rounded-card bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold" data-en="Basic">أساسي</h3>
        <p class="text-3xl font-extrabold text-brand-ink"><span class="group-has-checked:hidden" data-en="EGP 150 / month">١٥٠ ج / شهر</span><span class="hidden group-has-checked:inline" data-en="EGP 1,440 / year">١٬٤٤٠ ج / سنة</span></p>
        <p class="text-slate-600" data-en="Two cleanings a year.">تنضيفين في السنة.</p>
        <a href="#book" class="self-end rounded-lg bg-brand-ink px-4 py-2 text-center font-bold text-white" data-en="Choose Basic" aria-label="اختار أساسي" data-en-label="Choose Basic">اختار</a>
      </li>
      <li class="row-span-4 grid grid-rows-subgrid gap-2 rounded-card bg-white p-6 shadow-sm ring-2 ring-brand-ink">
        <h3 class="text-xl font-bold" data-en="Family">عيلة</h3>
        <p class="text-3xl font-extrabold text-brand-ink"><span class="group-has-checked:hidden" data-en="EGP 400 / month">٤٠٠ ج / شهر</span><span class="hidden group-has-checked:inline" data-en="EGP 3,840 / year">٣٬٨٤٠ ج / سنة</span></p>
        <p class="text-slate-600" data-en="Four people, cleanings and check-ups, 15% off any treatment.">٤ أفراد، تنضيف وكشف، وخصم ١٥٪ على أي علاج.</p>
        <a href="#book" class="self-end rounded-lg bg-brand-ink px-4 py-2 text-center font-bold text-white" data-en="Choose Family" aria-label="اختار عيلة" data-en-label="Choose Family">اختار</a>
      </li>
      <li class="row-span-4 grid grid-rows-subgrid gap-2 rounded-card bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold" data-en="Braces">تقويم</h3>
        <p class="text-3xl font-extrabold text-brand-ink"><span class="group-has-checked:hidden" data-en="EGP 900 / month">٩٠٠ ج / شهر</span><span class="hidden group-has-checked:inline" data-en="EGP 8,640 / year">٨٬٦٤٠ ج / سنة</span></p>
        <p class="text-slate-600" data-en="Monthly follow-up.">متابعة كل شهر.</p>
        <a href="#book" class="self-end rounded-lg bg-brand-ink px-4 py-2 text-center font-bold text-white" data-en="Choose Braces" aria-label="اختار تقويم" data-en-label="Choose Braces">اختار</a>
      </li>
    </ul>
  </section>

  <!-- FAQ: buttons with aria-expanded; the icon turns with aria-expanded: -->
  <section class="container-app py-10" aria-labelledby="faq">
    <h2 id="faq" class="mb-6 text-3xl font-bold" data-en="FAQ">أسئلة</h2>
    <div class="space-y-2">
      <div class="rounded-xl bg-white">
        <h3><button type="button" aria-expanded="false" aria-controls="a1" class="flex w-full items-center justify-between gap-4 px-4 py-3 text-start font-bold">
          <span data-en="Does whitening hurt?">التبييض بيوجع؟</span><span aria-hidden="true" class="transition-transform in-aria-expanded:rotate-180">▾</span></button></h3>
        <p id="a1" hidden class="px-4 pb-4 text-slate-600" data-en="Some people feel sensitivity for a day or two.">ممكن حساسية يوم أو اتنين.</p>
      </div>
      <div class="rounded-xl bg-white">
        <h3><button type="button" aria-expanded="false" aria-controls="a2" class="flex w-full items-center justify-between gap-4 px-4 py-3 text-start font-bold">
          <span data-en="Do you work on Fridays?">بتشتغلوا الجمعة؟</span><span aria-hidden="true" class="transition-transform in-aria-expanded:rotate-180">▾</span></button></h3>
        <p id="a2" hidden class="px-4 pb-4 text-slate-600" data-en="Yes, from 2 pm to 10 pm.">أيوه، من ٢ الضهر لـ ١٠ بالليل.</p>
      </div>
    </div>
  </section>
</main>

<footer class="bg-slate-900 py-10 pb-24 text-center text-slate-200"><p data-en="12 Garden St. · 0100 000 0000">١٢ شارع الجنينة، ٠١٠٠٠٠٠٠٠٠٠</p></footer>

<a id="book" href="#prices" class="fixed bottom-4 end-4 z-book rounded-full bg-accent px-6 py-3 font-extrabold text-white shadow-xl" data-en="Book now">احجز دلوقتي</a>
</body>
</html>
~~~

~~~js page.js
// 1. the sticky header's real height, for scroll-margin-top (measured now and whenever it changes)
const header = document.getElementById("header");
const setHeaderH = () => document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
document.addEventListener("DOMContentLoaded", setHeaderH);
new ResizeObserver(setHeaderH).observe(header);

// 2. FAQ: a button opens and closes its answer; only attributes change, Tailwind styles from them
for (const btn of document.querySelectorAll("button[aria-controls]")) {
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
  });
}
~~~

~~~js matrix.js
// node matrix.js : 15 widths × 2 languages, then the keyboard. Exit code 0 only if everything is OK
const { chromium } = require("playwright-core");
const fs = require("fs");
const BASE = "http://127.0.0.1:8932/";
const widths = [320, 360, 375, 414, 600, 761, 768, 820, 900, 1000, 1024, 1100, 1280, 1440, 1920];
fs.mkdirSync("shots", { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  const bad = [];
  for (const lang of ["ar", "en"]) {
    for (const w of widths) {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(BASE + "?lang=" + lang);
      const r = await page.evaluate(async () => {
        const iw = innerWidth, sw = document.documentElement.scrollWidth;
        // sr-only elements (hidden from the eye, read by screen readers) are 1px and sit at -1px on purpose: skip them
        const hidden = e => getComputedStyle(e).clipPath === "inset(50%)";
        // anything sticking out of the screen sideways, by name
        const out = [...document.querySelectorAll("body *")]
          .filter(e => { const b = e.getBoundingClientRect(); return !hidden(e) && b.width && (b.right > iw + 0.5 || b.left < -0.5); })
          .map(e => e.className || e.tagName.toLowerCase());
        // touch targets smaller than 24×24 (WCAG 2.5.8)
        const small = [...document.querySelectorAll("a, button, summary, input")]
          .filter(e => { const b = e.getBoundingClientRect(); return !hidden(e) && b.width && (b.width < 24 || b.height < 24); })
          .map(e => (e.className || e.tagName) + " " + Math.round(e.getBoundingClientRect().height) + "px");
        const logo = Math.round(document.querySelector(".logo").getBoundingClientRect().height);
        // every nav link: after the jump, the heading starts below the sticky header
        const covered = [];
        for (const a of document.querySelectorAll(".nav a[href^='#']")) {
          document.querySelector(a.getAttribute("href")).scrollIntoView();
          await new Promise(res => requestAnimationFrame(() => requestAnimationFrame(res)));
          const top = document.querySelector(a.getAttribute("href")).getBoundingClientRect().top;
          const headerBottom = document.getElementById("header").getBoundingClientRect().bottom;
          if (top < headerBottom) covered.push(a.getAttribute("href") + " " + Math.round(top) + "<" + Math.round(headerBottom));
        }
        scrollTo(0, 0);
        return { iw, sw, out: [...new Set(out)], small, logo, covered };
      });
      await page.screenshot({ path: "shots/" + lang + "-" + w + ".png" });
      const ok = r.sw <= r.iw && !r.out.length && !r.small.length && r.logo <= 40 && !r.covered.length;
      if (!ok) bad.push(lang + "-" + w);
      console.log(lang, String(w).padStart(4), "scrollWidth=" + r.sw, ok ? "OK" : "BROKEN",
        r.out.length ? "out: " + r.out.join(",") : "", r.small.length ? "small: " + r.small.join(",") : "", r.covered.length ? "under the header: " + r.covered.join(",") : "");
    }
  }
  // the yearly switch and an FAQ answer work from the keyboard (Space / Enter)
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE);
  await page.focus("#yearly");
  await page.keyboard.press("Space");
  const yearly = await page.$eval("[class~=\"group-has-checked:inline\"]", e => getComputedStyle(e).display);
  await page.focus("button[aria-controls=a1]");
  await page.keyboard.press("Enter");
  const faq = await page.$eval("#a1", e => !e.hidden);
  const keyOk = yearly === "inline" && faq;
  console.log("yearly prices after Space:", yearly, "| FAQ open after Enter:", faq, keyOk ? "OK" : "BROKEN");
  if (!keyOk) bad.push("keyboard");

  console.log(bad.length ? "broken: " + bad.join(" ") : "all sizes OK");
  await browser.close();
  process.exitCode = bad.length ? 1 : 0;
})();
~~~

~~~view 760 900 الشكل النهائي
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>عيادة ابتسامة للأسنان</title>
<style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:block))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-space-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-outline-style:solid;--tw-content:"";--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0}}}@layer theme{:root,:host{--font-sans:system-ui, "Segoe UI", Tahoma, sans-serif;--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-600:oklch(44.6% .043 257.281);--color-slate-700:oklch(37.2% .044 257.287);--color-slate-900:oklch(20.8% .042 265.755);--color-white:#fff;--spacing:.25rem;--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-xl:1.25rem;--text-xl--line-height:calc(1.75 / 1.25);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);--text-3xl:1.875rem;--text-3xl--line-height:calc(2.25 / 1.875);--text-4xl:2.25rem;--text-4xl--line-height:calc(2.5 / 2.25);--text-6xl:3.75rem;--text-6xl--line-height:1;--font-weight-semibold:600;--font-weight-bold:700;--font-weight-extrabold:800;--leading-tight:1.25;--radius-lg:.5rem;--radius-xl:.75rem;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-brand:#0e7490;--color-brand-ink:#155e75;--color-brand-soft:#cffafe;--color-accent:#b45309;--color-page:#f0f9ff;--radius-card:1rem;--z-index-header:10;--z-index-book:20}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}:root{--header-h:4rem}h1,h2{scroll-margin-top:calc(var(--header-h) + 1rem)}}@layer components;@layer utilities{.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.fixed{position:fixed}.relative{position:relative}.sticky{position:sticky}.end-4{inset-inline-end:calc(var(--spacing) * 4)}.top-0{top:0}.bottom-4{bottom:calc(var(--spacing) * 4)}.z-book{z-index:var(--z-index-book)}.z-header{z-index:var(--z-index-header)}.col-span-12{grid-column:span 12/span 12}.row-span-4{grid-row:span 4/span 4}.container-app{max-width:64rem;margin-inline:auto;padding-inline:1rem}.mx-auto{margin-inline:auto}.mt-1{margin-top:var(--spacing)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-6{margin-top:calc(var(--spacing) * 6)}.mb-6{margin-bottom:calc(var(--spacing) * 6)}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.size-9{width:calc(var(--spacing) * 9);height:calc(var(--spacing) * 9)}.h-7{height:calc(var(--spacing) * 7)}.w-12{width:calc(var(--spacing) * 12)}.w-full{width:100%}.max-w-\[18ch\]{max-width:18ch}.max-w-prose{max-width:65ch}.basis-full{flex-basis:100%}.cursor-pointer{cursor:pointer}.grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.grid-rows-subgrid{grid-template-rows:subgrid}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-between{justify-content:space-between}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}.gap-4{gap:calc(var(--spacing) * 4)}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)))}.gap-x-1{column-gap:var(--spacing)}.gap-x-4{column-gap:calc(var(--spacing) * 4)}.gap-y-1{row-gap:var(--spacing)}.self-end{align-self:flex-end}.rounded-card{border-radius:var(--radius-card)}.rounded-full{border-radius:2147483647px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-brand-ink{border-color:var(--color-brand-ink)}.border-brand\/20{border-color:#0e749033}@supports (color:color-mix(in lab, red, red)){.border-brand\/20{border-color:color-mix(in oklab, var(--color-brand) 20%, transparent)}}.bg-accent{background-color:var(--color-accent)}.bg-brand-ink{background-color:var(--color-brand-ink)}.bg-brand-soft{background-color:var(--color-brand-soft)}.bg-page{background-color:var(--color-page)}.bg-slate-300{background-color:var(--color-slate-300)}.bg-slate-900{background-color:var(--color-slate-900)}.bg-white{background-color:var(--color-white)}.bg-white\/80{background-color:#fffc}@supports (color:color-mix(in lab, red, red)){.bg-white\/80{background-color:color-mix(in oklab, var(--color-white) 80%, transparent)}}.p-6{padding:calc(var(--spacing) * 6)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-1{padding-block:var(--spacing)}.py-1\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-10{padding-block:calc(var(--spacing) * 10)}.py-12{padding-block:calc(var(--spacing) * 12)}.pb-4{padding-bottom:calc(var(--spacing) * 4)}.pb-24{padding-bottom:calc(var(--spacing) * 24)}.text-center{text-align:center}.text-start{text-align:start}.font-sans{font-family:var(--font-sans)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-4xl{font-size:var(--text-4xl);line-height:var(--tw-leading,var(--text-4xl--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.leading-tight{--tw-leading:var(--leading-tight);line-height:var(--leading-tight)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-extrabold{--tw-font-weight:var(--font-weight-extrabold);font-weight:var(--font-weight-extrabold)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-brand-ink{color:var(--color-brand-ink)}.text-brand-soft{color:var(--color-brand-soft)}.text-slate-200{color:var(--color-slate-200)}.text-slate-600{color:var(--color-slate-600)}.text-slate-700{color:var(--color-slate-700)}.text-slate-900{color:var(--color-slate-900)}.text-white{color:var(--color-white)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-2{--tw-ring-shadow:var(--tw-ring-inset, ) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-brand-ink{--tw-ring-color:var(--color-brand-ink)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, );backdrop-filter:var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, )}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-transform{transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}:is(:where(.group):has(:checked) .group-has-checked\:hidden){display:none}:is(:where(.group):has(:checked) .group-has-checked\:inline){display:inline}:is(:where(.peer):checked~.peer-checked\:bg-brand-ink){background-color:var(--color-brand-ink)}:is(:where(.peer):focus-visible~.peer-focus-visible\:outline-3){outline-style:var(--tw-outline-style);outline-width:3px}:is(:where(.peer):focus-visible~.peer-focus-visible\:outline-offset-2){outline-offset:2px}:is(:where(.peer):focus-visible~.peer-focus-visible\:outline-accent){outline-color:var(--color-accent)}.after\:absolute:after{content:var(--tw-content);position:absolute}.after\:start-1:after{content:var(--tw-content);inset-inline-start:calc(var(--spacing) * 1)}.after\:top-1:after{content:var(--tw-content);top:var(--spacing)}.after\:size-5:after{content:var(--tw-content);width:calc(var(--spacing) * 5);height:calc(var(--spacing) * 5)}.after\:rounded-full:after{content:var(--tw-content);border-radius:2147483647px}.after\:bg-white:after{content:var(--tw-content);background-color:var(--color-white)}.after\:transition-transform:after{content:var(--tw-content);transition-property:transform,translate,scale,rotate;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}:is(:where(.peer):checked~.peer-checked\:after\:translate-x-5):after{content:var(--tw-content);--tw-translate-x:calc(var(--spacing) * 5);translate:var(--tw-translate-x) var(--tw-translate-y)}@media (hover:hover){.hover\:bg-brand\/10:hover{background-color:#0e74901a}@supports (color:color-mix(in lab, red, red)){.hover\:bg-brand\/10:hover{background-color:color-mix(in oklab, var(--color-brand) 10%, transparent)}}}.focus\:not-sr-only:focus{clip-path:none;white-space:normal;width:auto;height:auto;margin:0;padding:0;position:static;overflow:visible}.focus\:absolute:focus{position:absolute}.focus\:start-4:focus{inset-inline-start:calc(var(--spacing) * 4)}.focus\:top-4:focus{top:calc(var(--spacing) * 4)}.focus\:z-book:focus{z-index:var(--z-index-book)}.focus\:bg-slate-900:focus{background-color:var(--color-slate-900)}.focus\:px-4:focus{padding-inline:calc(var(--spacing) * 4)}.focus\:py-2:focus{padding-block:calc(var(--spacing) * 2)}.focus\:text-white:focus{color:var(--color-white)}.focus\:outline-none:focus{--tw-outline-style:none;outline-style:none}:where([aria-expanded=true]) .in-aria-expanded\:rotate-180{rotate:180deg}@media (min-width:40rem){.sm\:col-span-6{grid-column:span 6/span 6}}@media (min-width:48rem){.md\:order-1{order:1}.md\:col-span-5{grid-column:span 5/span 5}.md\:col-span-7{grid-column:span 7/span 7}.md\:col-span-12{grid-column:span 12/span 12}.md\:row-span-2{grid-row:span 2/span 2}.md\:ms-auto{margin-inline-start:auto}.md\:basis-auto{flex-basis:auto}.md\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\:py-20{padding-block:calc(var(--spacing) * 20)}.md\:text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}}.rtl\:rotate-180:where(:dir(rtl),[dir=rtl],[dir=rtl] *){rotate:180deg}:is(:where(.peer):checked~.rtl\:peer-checked\:after\:-translate-x-5:where(:dir(rtl),[dir=rtl],[dir=rtl] *)):after{content:var(--tw-content);--tw-translate-x:calc(var(--spacing) * -5);translate:var(--tw-translate-x) var(--tw-translate-y)}}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}
</style>
</head>
<body class="bg-page font-sans text-slate-900">
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-book focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white" data-en="Skip to content">اتخطى للمحتوى</a>

<header id="header" class="sticky top-0 z-header border-b border-brand/20 bg-white/80 backdrop-blur">
  <div class="container-app flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
    <a href="#main" class="flex items-center gap-2 font-extrabold"><img class="logo size-9" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiIgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2Ij48Y2lyY2xlIGN4PSIxOCIgY3k9IjE4IiByPSIxOCIgZmlsbD0iIzBlNzQ5MCIvPjxwYXRoIGQ9Ik0xMSAxMGMzLTIgNSAwIDcgMHM0LTIgNyAwYzIgMiAxIDctMSAxMGwtMSA3YzAgMi0yIDItMiAwbC0xLTVjMC0yLTMtMi0zIDBsLTEgNWMwIDItMiAyLTIgMGwtMS03Yy0yLTMtMy04LTEtMTBaIiBmaWxsPSIjZmZmIi8+PC9zdmc+Cg==" alt="" width="36" height="36"><span data-en="Ebtesama Dental">عيادة ابتسامة</span></a>
    <a href="?lang=en" lang="en" data-en="عربي" data-en-href="?lang=ar" data-en-lang="ar" class="rounded-lg border border-brand-ink px-3 py-1 font-bold text-brand-ink md:order-1">EN</a>
    <nav class="nav basis-full md:ms-auto md:basis-auto" aria-label="أقسام الصفحة" data-en-label="Page sections">
      <ul class="flex flex-wrap gap-x-1">
        <li><a href="#services" class="inline-block rounded-lg px-2 py-1.5 font-semibold text-brand-ink hover:bg-brand/10" data-en="Services">الخدمات</a></li>
        <li><a href="#prices" class="inline-block rounded-lg px-2 py-1.5 font-semibold text-brand-ink hover:bg-brand/10" data-en="Prices">الأسعار</a></li>
        <li><a href="#faq" class="inline-block rounded-lg px-2 py-1.5 font-semibold text-brand-ink hover:bg-brand/10" data-en="FAQ">أسئلة</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main" tabindex="-1" class="focus:outline-none">
  <section class="container-app py-12 text-center md:py-20">
    <h1 class="mx-auto max-w-[18ch] text-4xl font-extrabold leading-tight md:text-6xl" data-en="A smile you are not shy of">ابتسامة مش هتتكسف منها</h1>
    <p class="mx-auto mt-4 max-w-prose text-lg text-slate-600" data-en="Cleaning, whitening, fillings and braces. Same-week appointments.">تنضيف وتبييض وحشو وتقويم، ومواعيد في نفس الأسبوع.</p>
    <a href="#prices" class="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-ink px-6 py-3 font-bold text-white">
      <span data-en="See prices">شوف الأسعار</span><span aria-hidden="true" class="rtl:rotate-180">→</span>
    </a>
  </section>

  <!-- bento: 12 columns, cards of different widths -->
  <section class="container-app py-10" aria-labelledby="services">
    <h2 id="services" class="mb-6 text-3xl font-bold" data-en="Services">الخدمات</h2>
    <ul class="grid grid-cols-12 gap-4">
      <li class="col-span-12 rounded-card bg-brand-ink p-6 text-white md:col-span-7 md:row-span-2">
        <h3 class="text-2xl font-bold" data-en="Braces">تقويم</h3>
        <p class="mt-2 text-brand-soft" data-en="Clear aligners or metal braces, with a follow-up every month and a plan you can see from the first visit.">شفاف أو معدن، ومتابعة كل شهر، وخطة تشوفها من أول زيارة.</p>
      </li>
      <li class="col-span-12 rounded-card bg-white p-6 shadow-sm sm:col-span-6 md:col-span-5">
        <h3 class="text-xl font-bold" data-en="Cleaning">تنضيف</h3>
        <p class="mt-1 text-slate-600" data-en="Scaling and polishing in one 40-minute visit.">إزالة الجير وتلميع في زيارة ٤٠ دقيقة.</p>
      </li>
      <li class="col-span-12 rounded-card bg-white p-6 shadow-sm sm:col-span-6 md:col-span-5">
        <h3 class="text-xl font-bold" data-en="Whitening">تبييض</h3>
        <p class="mt-1 text-slate-600" data-en="Two to four shades lighter.">من درجتين لأربعة أفتح.</p>
      </li>
      <li class="col-span-12 rounded-card bg-brand-soft p-6 md:col-span-12">
        <h3 class="text-xl font-bold" data-en="Fillings">حشو</h3>
        <p class="mt-1 text-slate-700" data-en="Tooth-coloured fillings that don't show.">حشو بلون السنة مبيبانش.</p>
      </li>
    </ul>
  </section>

  <!-- prices: the checkbox switches monthly / yearly with has-checked:, no JavaScript -->
  <section class="group container-app py-10" aria-labelledby="prices">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h2 id="prices" class="text-3xl font-bold" data-en="Care plans">باقات المتابعة</h2>
      <label class="flex cursor-pointer items-center gap-3 font-semibold">
        <span data-en="Monthly">شهري</span>
        <input type="checkbox" class="peer sr-only" id="yearly">
        <span aria-hidden="true" class="relative h-7 w-12 rounded-full bg-slate-300 transition-colors peer-checked:bg-brand-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent
                     after:absolute after:start-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-5"></span>
        <span data-en="Yearly (save 20%)">سنوي (وفّر ٢٠٪)</span>
      </label>
    </div>
    <ul class="grid gap-4 md:grid-cols-3">
      <li class="row-span-4 grid grid-rows-subgrid gap-2 rounded-card bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold" data-en="Basic">أساسي</h3>
        <p class="text-3xl font-extrabold text-brand-ink"><span class="group-has-checked:hidden" data-en="EGP 150 / month">١٥٠ ج / شهر</span><span class="hidden group-has-checked:inline" data-en="EGP 1,440 / year">١٬٤٤٠ ج / سنة</span></p>
        <p class="text-slate-600" data-en="Two cleanings a year.">تنضيفين في السنة.</p>
        <a href="#book" class="self-end rounded-lg bg-brand-ink px-4 py-2 text-center font-bold text-white" data-en="Choose Basic" aria-label="اختار أساسي" data-en-label="Choose Basic">اختار</a>
      </li>
      <li class="row-span-4 grid grid-rows-subgrid gap-2 rounded-card bg-white p-6 shadow-sm ring-2 ring-brand-ink">
        <h3 class="text-xl font-bold" data-en="Family">عيلة</h3>
        <p class="text-3xl font-extrabold text-brand-ink"><span class="group-has-checked:hidden" data-en="EGP 400 / month">٤٠٠ ج / شهر</span><span class="hidden group-has-checked:inline" data-en="EGP 3,840 / year">٣٬٨٤٠ ج / سنة</span></p>
        <p class="text-slate-600" data-en="Four people, cleanings and check-ups, 15% off any treatment.">٤ أفراد، تنضيف وكشف، وخصم ١٥٪ على أي علاج.</p>
        <a href="#book" class="self-end rounded-lg bg-brand-ink px-4 py-2 text-center font-bold text-white" data-en="Choose Family" aria-label="اختار عيلة" data-en-label="Choose Family">اختار</a>
      </li>
      <li class="row-span-4 grid grid-rows-subgrid gap-2 rounded-card bg-white p-6 shadow-sm">
        <h3 class="text-xl font-bold" data-en="Braces">تقويم</h3>
        <p class="text-3xl font-extrabold text-brand-ink"><span class="group-has-checked:hidden" data-en="EGP 900 / month">٩٠٠ ج / شهر</span><span class="hidden group-has-checked:inline" data-en="EGP 8,640 / year">٨٬٦٤٠ ج / سنة</span></p>
        <p class="text-slate-600" data-en="Monthly follow-up.">متابعة كل شهر.</p>
        <a href="#book" class="self-end rounded-lg bg-brand-ink px-4 py-2 text-center font-bold text-white" data-en="Choose Braces" aria-label="اختار تقويم" data-en-label="Choose Braces">اختار</a>
      </li>
    </ul>
  </section>

  <!-- FAQ: buttons with aria-expanded; the icon turns with aria-expanded: -->
  <section class="container-app py-10" aria-labelledby="faq">
    <h2 id="faq" class="mb-6 text-3xl font-bold" data-en="FAQ">أسئلة</h2>
    <div class="space-y-2">
      <div class="rounded-xl bg-white">
        <h3><button type="button" aria-expanded="false" aria-controls="a1" class="flex w-full items-center justify-between gap-4 px-4 py-3 text-start font-bold">
          <span data-en="Does whitening hurt?">التبييض بيوجع؟</span><span aria-hidden="true" class="transition-transform in-aria-expanded:rotate-180">▾</span></button></h3>
        <p id="a1" hidden class="px-4 pb-4 text-slate-600" data-en="Some people feel sensitivity for a day or two.">ممكن حساسية يوم أو اتنين.</p>
      </div>
      <div class="rounded-xl bg-white">
        <h3><button type="button" aria-expanded="false" aria-controls="a2" class="flex w-full items-center justify-between gap-4 px-4 py-3 text-start font-bold">
          <span data-en="Do you work on Fridays?">بتشتغلوا الجمعة؟</span><span aria-hidden="true" class="transition-transform in-aria-expanded:rotate-180">▾</span></button></h3>
        <p id="a2" hidden class="px-4 pb-4 text-slate-600" data-en="Yes, from 2 pm to 10 pm.">أيوه، من ٢ الضهر لـ ١٠ بالليل.</p>
      </div>
    </div>
  </section>
</main>

<footer class="bg-slate-900 py-10 pb-24 text-center text-slate-200"><p data-en="12 Garden St. · 0100 000 0000">١٢ شارع الجنينة، ٠١٠٠٠٠٠٠٠٠٠</p></footer>

<a id="book" href="#prices" class="fixed bottom-4 end-4 z-book rounded-full bg-accent px-6 py-3 font-extrabold text-white shadow-xl" data-en="Book now">احجز دلوقتي</a>
<script>
// ?lang=en switches the page to English before it is drawn (this file runs in <head>, so there is no Arabic flash)
// every element with data-en has its English text in that attribute; data-en-alt, data-en-label and data-en-href likewise
if (new URLSearchParams(location.search).get("lang") === "en") {
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
  document.title = "Ebtesama Dental Clinic";
  document.addEventListener("DOMContentLoaded", () => {
    for (const el of document.querySelectorAll("[data-en]")) el.textContent = el.dataset.en;
    for (const el of document.querySelectorAll("[data-en-alt]")) el.alt = el.dataset.enAlt;
    for (const el of document.querySelectorAll("[data-en-label]")) el.setAttribute("aria-label", el.dataset.enLabel);
    for (const el of document.querySelectorAll("[data-en-href]")) el.setAttribute("href", el.dataset.enHref);
    for (const el of document.querySelectorAll("[data-en-lang]")) el.lang = el.dataset.enLang;
  });
}
</script>
<script>
// 1. the sticky header's real height, for scroll-margin-top (measured now and whenever it changes)
const header = document.getElementById("header");
const setHeaderH = () => document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
document.addEventListener("DOMContentLoaded", setHeaderH);
new ResizeObserver(setHeaderH).observe(header);

// 2. FAQ: a button opens and closes its answer; only attributes change, Tailwind styles from them
for (const btn of document.querySelectorAll("button[aria-controls]")) {
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
  });
}
</script>
</body>
</html>
~~~

**هتشوف إيه:** نفس صفحة العيادة: هيدر زجاجي، وعنوان كبير، وخدمات bento (التقويم كارت كبير غامق)، وباقات بـ ٣ أسعار وفوقها مفتاح «شهري / سنوي»، وأسئلة بتتفتح، وزرار «احجز» عايم. وبـ [[?lang=en]] كلها إنجليزي من الشمال لليمين.

**[[@utility container-app]]:** كلاس بتاعك بيدخل Tailwind زي أي utility (بيتطلّع بس لو اتستخدم، وبيشتغل مع [[md:]] وغيره). عرض الصفحة في مكان واحد.

**Bento:** [[grid grid-cols-12]]، والكروت [[col-span-12 md:col-span-7 md:row-span-2]] وأخواتها: على الموبايل كله 12 (تحت بعض)، ومن md التقسيمة.

**الأسعار بـ subgrid:** كل باقة [[row-span-4 grid grid-rows-subgrid]]، فالاسم والسعر والوصف والزرار على نفس الخطوط في الـ ٣ باقات (زي مشروع الاستوديو في وحدة Grid).

**«شهري / سنوي» من غير JavaScript:** checkbox [[peer sr-only]] (مستخبي بس الكيبورد بيوصله)، والمفتاح المرسوم جنبه بـ [[peer-checked:bg-brand-ink]] و [[peer-checked:after:translate-x-5]]. والقسم كله [[group]]، والأسعار: [[group-has-checked:hidden]] على الشهري و [[hidden group-has-checked:inline]] على السنوي. [[has-checked]] = «جوايا checkbox متعلّم».

**الأسئلة:** زرار بـ [[aria-expanded]] والإجابة [[hidden]]، والـ JS بيغيّر الاتنين بس. السهم [[in-aria-expanded:rotate-180]]: [[in-*]] = «لو أي جد ليا عليه الحالة دي».

**لغتين من غير ولا [[ml-]] ولا [[left-]]:** [[ms-auto]] (margin-inline-start)، و [[start-4]]، و [[end-4]]، و [[text-start]]: بتتقلب لوحدها مع [[dir]]. و [[rtl:]] بس للحاجات اللي مش منطقية: السهم ([[rtl:rotate-180]]) والـ translate في المفتاح ([[rtl:peer-checked:after:-translate-x-5]]). اتعدّى بـ grep: [[ml-]] و [[mr-]] و [[pl-]] و [[pr-]] و [[left-]] و [[right-]] = 0.

**قيم [[[...]]]:** واحدة بس: [[max-w-[18ch]]] للعنوان. أي قيمة بتتكرر تبقى توكن.

**غلطة في الاختبار مش في الصفحة:** أول تشغيل لـ [[matrix.js]] قال BROKEN في الـ 30 مقاس: «out» و «small» على [[sr-only]]. الـ [[sr-only]] بتاع Tailwind عرضه 1px و [[margin: -1px]] عن قصد (مستخبي من العين ومقروء لقارئ الشاشة). اللينك ده بيبان لما الكيبورد يوصله، والـ checkbox بيتداس من الـ label بتاعه. فالسكربت بقى بيتخطى أي عنصر عليه [[clip-path: inset(50%)]]. ولما الأداة تقول «غلط»، اتأكد هي بتقيس صح قبل ما تصلّح الصفحة.

~~~text node matrix.js (مرتين ورا بعض، نفس الناتج)
ar  320 scrollWidth=320 OK
ar  360 scrollWidth=360 OK
... (كل العروض باللغتين)
en 1920 scrollWidth=1920 OK
yearly prices after Space: inline | FAQ open after Enter: true OK
all sizes OK
(exit code 0)

قبل تخطّي sr-only:
ar  320 scrollWidth=320 BROKEN out: sr-only focus:not-sr-only ... small: ... 1px,peer sr-only 1px
~~~

~~~text مقاسات تانية
npx @tailwindcss/cli -i in.css -o out.css --minify  →  out.css = 18,416 بايت (الحد 30KB)
grep على index.html لـ ml- mr- pl- pr- left- right-: 0
قيم [...]: max-w-[18ch] مرة واحدة
axe بالعربي والإنجليزي: 0 violations   الـ validator: مفيش رسايل
~~~` },
        { lvl: 'فكرة', dir: "tw-rebrand", t: R`تحدّي الـ rebrand`, what: R`خد صفحة Tailwind جاهزة عملتها، وغيّر هويتها كلها (ألوان وخطوط وتدوير وظلال) من [[@theme]] بس، من غير ما تفتح ولا ملف HTML.`, done: R`[[git diff --stat]] بيوري ملف CSS واحد بس اتغيّر، والصفحة شكلها مختلف تمامًا في لقطتين قبل وبعد، ولو فيه حاجة متغيرتش اكتب ليه (غالبًا لون مكتوب [[[#...]]] أو اسم palette زي [[indigo-600]] بدل توكن بالمعنى).`, ext: R`اعمل ٣ هويات لنفس الصفحة وزرار بيبدّل بينهم، وحط اختبار بيفشل لو ظهر [[#hex]] في أي ملف HTML أو JSX.`, sol: R`المثال اللي عملته: صفحة الزراير والشارات (أول مشروع في الوحدة). الـ HTML زي ما هو بالظبط، والهوية الجديدة كلها في [[in.css]].

~~~bash الترمنال
git init
git add -A
git commit -m "badges page, first identity"
# ... غيّرت @theme في in.css بس ...
npx @tailwindcss/cli -i in.css -o out.css
git status --short
git diff --stat
~~~

~~~text .gitignore
out.css
node_modules/
~~~

~~~css in.css (بعد)
@import "tailwindcss";

/* the new identity: night blue and gold, sharper corners, a different font. Not one HTML file opened */
@theme {
  --color-brand: #1e3a8a;
  --color-brand-soft: #dbeafe;
  --color-brand-ink: #172554;

  --color-ok: #047857;
  --color-ok-soft: #d1fae5;
  --color-ok-ink: #064e3b;

  --color-warn: #a16207;
  --color-warn-soft: #fef9c3;
  --color-warn-ink: #713f12;

  --color-danger: #9f1239;
  --color-danger-soft: #ffe4e6;
  --color-danger-ink: #881337;

  --color-neutral: #57534e;
  --color-neutral-soft: #fafaf9;
  --color-neutral-ink: #1c1917;

  /* Tailwind's own scales can be changed too: every rounded-lg and every font-sans follows */
  --radius-lg: 0.125rem;
  --font-sans: Georgia, "Times New Roman", serif;
}
~~~

~~~view 330 380 بعد الـ rebrand (قبله: الشكل النهائي بتاع مشروع «زراير و badges بالتوكنز»)
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>زراير وشارات بالتوكنز</title>
<style>
/*! tailwindcss v4.3.4 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: Georgia, "Times New Roman", serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-3xl: 48rem;
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --radius-lg: 0.125rem;
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --color-brand: #1e3a8a;
    --color-brand-soft: #dbeafe;
    --color-brand-ink: #172554;
    --color-ok: #047857;
    --color-ok-soft: #d1fae5;
    --color-ok-ink: #064e3b;
    --color-warn: #a16207;
    --color-warn-soft: #fef9c3;
    --color-warn-ink: #713f12;
    --color-danger: #9f1239;
    --color-danger-soft: #ffe4e6;
    --color-danger-ink: #881337;
    --color-neutral: #57534e;
    --color-neutral-soft: #fafaf9;
    --color-neutral-ink: #1c1917;
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .mx-auto {
    margin-inline: auto;
  }
  .flex {
    display: flex;
  }
  .max-w-3xl {
    max-width: var(--container-3xl);
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  :where(.space-y-3 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-8 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 8) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 8) * calc(1 - var(--tw-space-y-reverse)));
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-neutral {
    border-color: var(--color-neutral);
  }
  .bg-brand {
    background-color: var(--color-brand);
  }
  .bg-brand-soft {
    background-color: var(--color-brand-soft);
  }
  .bg-danger {
    background-color: var(--color-danger);
  }
  .bg-danger-soft {
    background-color: var(--color-danger-soft);
  }
  .bg-neutral {
    background-color: var(--color-neutral);
  }
  .bg-neutral-soft {
    background-color: var(--color-neutral-soft);
  }
  .bg-ok {
    background-color: var(--color-ok);
  }
  .bg-ok-soft {
    background-color: var(--color-ok-soft);
  }
  .bg-warn {
    background-color: var(--color-warn);
  }
  .bg-warn-soft {
    background-color: var(--color-warn-soft);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .font-sans {
    font-family: var(--font-sans);
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .text-brand-ink {
    color: var(--color-brand-ink);
  }
  .text-danger-ink {
    color: var(--color-danger-ink);
  }
  .text-neutral-ink {
    color: var(--color-neutral-ink);
  }
  .text-ok-ink {
    color: var(--color-ok-ink);
  }
  .text-warn-ink {
    color: var(--color-warn-ink);
  }
  .text-white {
    color: var(--color-white);
  }
  .ring-1 {
    --tw-ring-shadow: var(--tw-ring-inset, ) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-neutral {
    --tw-ring-color: var(--color-neutral);
  }
  @media (hover: hover) {
    .hover\:bg-brand-ink:hover {
      background-color: var(--color-brand-ink);
    }
    .hover\:bg-danger-ink:hover {
      background-color: var(--color-danger-ink);
    }
    .hover\:bg-neutral-soft:hover {
      background-color: var(--color-neutral-soft);
    }
    .hover\:bg-ok-ink:hover {
      background-color: var(--color-ok-ink);
    }
  }
  .focus-visible\:outline-3:focus-visible {
    outline-style: var(--tw-outline-style);
    outline-width: 3px;
  }
  .focus-visible\:outline-offset-2:focus-visible {
    outline-offset: 2px;
  }
  .focus-visible\:outline-warn:focus-visible {
    outline-color: var(--color-warn);
  }
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: block))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-space-y-reverse: 0;
      --tw-border-style: solid;
      --tw-font-weight: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
    }
  }
}
</style>
</head>
<body class="bg-neutral-soft font-sans text-neutral-ink">
<main class="mx-auto max-w-3xl space-y-8 p-4">
  <h1 class="text-2xl font-bold">زراير وشارات «مكتب الشحن»</h1>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold">الزراير</h2>
    <div class="flex flex-wrap gap-3">
      <button type="button" class="rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">اشحن طرد</button>
      <button type="button" class="rounded-lg bg-ok px-4 py-2 font-semibold text-white hover:bg-ok-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">أكّد الاستلام</button>
      <button type="button" class="rounded-lg bg-danger px-4 py-2 font-semibold text-white hover:bg-danger-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">ألغي الشحنة</button>
      <button type="button" class="rounded-lg border border-neutral bg-white px-4 py-2 font-semibold text-neutral-ink hover:bg-neutral-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-warn">رجوع</button>
    </div>
  </section>

  <section class="space-y-3">
    <h2 class="text-lg font-semibold">حالة الشحنة</h2>
    <ul class="flex flex-wrap gap-2">
      <li class="rounded-full bg-ok-soft px-3 py-1 text-sm font-semibold text-ok-ink">اتسلّمت</li>
      <li class="rounded-full bg-warn-soft px-3 py-1 text-sm font-semibold text-warn-ink">في الطريق</li>
      <li class="rounded-full bg-danger-soft px-3 py-1 text-sm font-semibold text-danger-ink">متأخرة</li>
      <li class="rounded-full bg-neutral-soft px-3 py-1 text-sm font-semibold text-neutral-ink ring-1 ring-neutral">مستنية</li>
      <li class="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-ink">جديدة</li>
    </ul>
    <ul class="flex flex-wrap gap-2">
      <li class="rounded-full bg-ok px-3 py-1 text-sm font-semibold text-white">اتسلّمت</li>
      <li class="rounded-full bg-warn px-3 py-1 text-sm font-semibold text-white">في الطريق</li>
      <li class="rounded-full bg-danger px-3 py-1 text-sm font-semibold text-white">متأخرة</li>
      <li class="rounded-full bg-neutral px-3 py-1 text-sm font-semibold text-white">مستنية</li>
      <li class="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">جديدة</li>
    </ul>
  </section>
</main>
</body>
</html>
~~~

**قبل وبعد:** قبل: أخضر مزرق، وزوايا مدورة، وخط النظام. بعد: كحلي ودهبي، وزوايا شبه حادة، وخط Georgia. والـ HTML ما اتفتحش.

**ليه الزوايا والخط اتغيّروا كمان:** [[@theme]] مش لألوانك بس. Tailwind نفسه بيقرا [[--radius-lg]] لـ [[rounded-lg]] و [[--font-sans]] لـ [[font-sans]]. فـ [[--radius-lg: 0.125rem]] غيّرت كل زرار [[rounded-lg]] (اتقاس: 2px)، و [[--font-sans]] غيّرت الخط كله.

**[[git diff --stat]] بيثبت:** ملف واحد اتغيّر ([[in.css]]). و [[out.css]] في [[.gitignore]] لأنه بيتعمل من [[in.css]]: لو اتحفظ في git، كل تغيير هيظهر في ملفين.

**اللي متغيّرش:** الكلام الأبيض على الزراير ([[text-white]] ×8) والزرار الأبيض ([[bg-white]] ×1). دول أسامي من palette Tailwind مش توكنز بالمعنى، فالـ rebrand مبيوصلهمش. لو عايزهم يتغيّروا: توكن [[--color-on-brand]] و [[--color-surface]] واستخدمهم بدل [[white]].

~~~text الناتج
git status --short
 M in.css

git diff --stat
 in.css | 36 +++++++++++++++++++-----------------
 1 file changed, 19 insertions(+), 17 deletions(-)

grep على index.html لأسامي palette: text-white 8، bg-white 1
بعد: font Georgia, "Times New Roman", serif، و border-radius الزرار 2px
axe: 0 violations   الـ validator: مفيش رسايل
~~~

**الصورتين:** اتصوّروا بـ Playwright ([[page.screenshot]]) على 900×520: [[rebrand-before.png]] من صفحة المشروع الأول، و [[rebrand-after.png]] من هنا.` },
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في component: [[const c = "red"; el.className = $__btbg-$__{c}-500$__bt]]. الخلفية هتبقى حمرا؟ ابني وشوف [[out.css]].`, done: R`مفيش [[.bg-red-500]] في الـ CSS (grep مبيلاقيهاش)، فمفيش خلفية: Tailwind بيدوّر على **نص الكلاس كامل** في الملفات ومبيشغّلش الكود. والحل map فيه الأسماء كاملة: [[{ red: "bg-red-500", green: "bg-green-500" }]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كلاس ديناميكي</title><link rel="stylesheet" href="out.css"></head>
<body>
<div id="el" class="p-4">كارت</div>
<script>
  const c = "red";
  document.getElementById("el").className = $__btbg-$__{c}-500$__bt;
$__lt/script>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css
grep -c "bg-red-500" out.css
~~~

الخلفية مش هتبقى حمرا. والتصليح map فيه أسماء الكلاسات كاملة:

~~~html fixed.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>كلاس كامل</title><link rel="stylesheet" href="out.css"></head>
<body>
<div id="el" class="p-4">كارت</div>
<script>
  const colors = { red: "bg-red-500", green: "bg-green-500" };
  const c = "red";
  document.getElementById("el").className = colors[c];
$__lt/script>
</body>
</html>
~~~

**ليه:** Tailwind مبيشغّلش الكود بتاعك. هو بيقرا ملفاتك كنص عادي، ويدوّر على أي كلمة شكلها كلاس، ويولّد CSS للي لقاه بس. النص [[bg-$__{c}-500]] مفيهوش الكلمة [[bg-red-500]]، فمحدش ولّدها. في المتصفح الـ class بيتحط صح، بس مفيش قاعدة CSS بالاسم ده.

والـ map بينجح لأن الكلمتين [["bg-red-500"]] و [["bg-green-500"]] مكتوبين بالحرف في الملف.

**الغلطة الشائعة:** تفحص Elements وتشوف [[class="bg-red-500"]] فتفتكر إن المشكلة في الـ CSS order. افحص [[out.css]] الأول: لو الكلاس مش فيه، يبقى Tailwind ماشافوش.

~~~text الناتج
قبل:  grep على out.css مبيلاقيش .bg-red-500
      backgroundColor = rgba(0, 0, 0, 0) (شفاف)
بعد:  .bg-red-500 و .bg-green-500 الاتنين موجودين
      backgroundColor = oklch(0.637 0.237 25.331) (أحمر)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** من غير Vite: فولدر فيه [[index.html]] و [[in.css]] (سطر [[@import "tailwindcss";]] بس)، وشغّل [[npx @tailwindcss/cli -i in.css -o out.css --watch]]، واعمل كارت سعر كامل بالكلاسات بس.`, done: R`كل ما تحفظ الـ HTML الـ CLI بيطبع [[Done in ...ms]] و [[out.css]] بيتحدث، والكارت شكله كامل، و grep على [[out.css]] بيلاقي الكلاسات اللي استخدمتها بس (مثلًا [[.p-6]] موجودة و [[.p-7]] لأ لو مكتبتهاش).`, sol: R`~~~css in.css
@import "tailwindcss";
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>باقة شهرية</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="grid min-h-dvh place-items-center bg-gray-100 p-4 text-gray-900">
<main class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
  <h1 class="text-lg font-bold">الباقة الاحترافية</h1>
  <p class="mt-2 text-sm text-gray-600">لفريق صغير بيبني منتج حقيقي.</p>
  <p class="mt-4 text-4xl font-extrabold">499 <span class="text-base font-medium text-gray-600">جنيه في الشهر</span></p>
  <ul class="mt-4 space-y-2 text-sm">
    <li>١٠ مشاريع</li>
    <li>٥٠ جيجا مساحة</li>
    <li>دعم في نفس اليوم</li>
  </ul>
  <a href="#signup" class="mt-6 block rounded-lg bg-teal-700 px-4 py-3 text-center font-semibold text-white hover:bg-teal-800">ابدأ دلوقتي</a>
</main>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css --watch
~~~

**بيحصل إيه:** [[-i]] الملف اللي بتكتبه، و [[-o]] الملف اللي المتصفح بيقراه، و [[--watch]] يفضل صاحي ويعيد الـ build مع كل حفظ. الصفحة بتربط [[out.css]] مش [[in.css]]، لأن [[in.css]] لسه فيه [[@import "tailwindcss"]] اللي المتصفح مبيفهموش.

الكارت كله كلاسات: [[grid min-h-dvh place-items-center]] بتوسّطه، و [[max-w-sm]] بيحد عرضه، و [[w-full]] بيخليه ياخد المتاح على الموبايل، و [[space-y-2]] مسافة بين عناصر اللستة.

**الغلطة الشائعة:** تعدّل الـ HTML والـ CLI مش شغال، فالكلاس الجديد ميطلعش وتفتكر إنه غلط. لازم [[--watch]] شغال في ترمنال، أو تعيد الـ build.

~~~text الناتج
≈ tailwindcss v4.3.4

Done in 75ms
Done in 6ms      (بعد ما حفظت الـ HTML)

grep على out.css: .p-6 موجودة ، .p-7 مش موجودة
ولما زوّدت عنصر class="p-7" وحفظت: .p-7 ظهرت من غير ما أعمل حاجة
حجم out.css: 10,300 byte

على 360: الكارت 328 × 325 ، scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس المشروع بـ build عادي وبـ [[--minify]]. قيس الحجم في الحالتين، وبعدين زوّد ٢٠ كلاس جديد وقيس تاني.`, done: R`عندك ٤ أرقام بالـ byte (في معمل صغير طلع 17,900 من غير minify و 14,729 بيه)، والحجم بيزيد على قد الكلاسات الجديدة بس مش بالآلاف، وكتبت ليه (Tailwind بيطلّع اللي استخدمته بس).`, sol: R`~~~bash
npx @tailwindcss/cli -i in.css -o out.css
wc -c out.css
npx @tailwindcss/cli -i in.css -o out.css --minify
wc -c out.css
# زوّد 20 كلاس جديد في الـ HTML (p-1 و m-2 و underline و flex و border-2 ...) وكرر
~~~

**ليه الزيادة صغيرة:** كل كلاس جديد بيضيف قاعدته بس، حوالي 50 إلى 70 byte، مش مكتبة جديدة. والحجم الأساسي (الـ reset والمتغيرات والـ theme المستخدم) ثابت.

**[[--minify]]** بيشيل المسافات والأسطر الجديدة. الفرق هنا حوالي 15٪ قبل الضغط. ولما السيرفر يعمل gzip أو brotli الفرق بيقل، بس لسه مفيد.

**الغلطة الشائعة:** تفتكر إن الزيادة بالآلاف زي Bootstrap لما تضيف component. هنا الكلاس المكرر ١٠٠ مرة في الـ HTML قاعدته في الـ CSS مرة واحدة.

~~~text الناتج
                  من غير minify    بـ --minify
كارت السعر        10,300           8,742
بعد 20 كلاس       11,659           9,771
الزيادة           1,359            1,029

يعني حوالي 68 byte للكلاس من غير minify، و 51 byte بيه.
~~~

(الأرقام بتتغيّر مع نسخة Tailwind وعدد كلاساتك.)` },
            { lvl: 'تطبيق', t: R`**ابني:** صفحة 404 لموقع متخيل بـ Tailwind بس: رقم كبير ورسالة وزرارين في نص الشاشة ([[grid place-items-center min-h-dvh]])، وألوان للوضع الغامق بـ [[dark:]].`, done: R`الصفحة متوسّطة على 360 و 1280، ومن DevTools › Rendering مع [[prefers-color-scheme: dark]] الألوان بتتقلب، ومفيش ولا سطر CSS بتاعك غير الـ [[@import]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الصفحة مش موجودة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
<main class="grid min-h-dvh place-items-center p-6 text-center">
  <div>
    <p class="text-8xl font-black text-teal-700 dark:text-teal-300">404</p>
    <h1 class="mt-4 text-2xl font-bold">الصفحة دي مش موجودة</h1>
    <p class="mt-2 text-gray-600 dark:text-gray-400">يمكن الرابط اتغيّر أو اتكتب غلط.</p>
    <div class="mt-6 flex flex-wrap justify-center gap-3">
      <a href="/" class="rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 dark:bg-teal-300 dark:text-gray-950 dark:hover:bg-teal-200">الرئيسية</a>
      <a href="/contact" class="rounded-lg border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">كلّمنا</a>
    </div>
  </div>
</main>
</body>
</html>
~~~

و [[in.css]] سطر واحد: [[@import "tailwindcss";]].

**ليه شغال:**

- [[grid min-h-dvh place-items-center]]: grid بخلية واحدة، ارتفاعها الشاشة كلها، والمحتوى في نصها. [[dvh]] بدل [[vh]] عشان شريط المتصفح على الموبايل.
- [[dark:]] افتراضيًا بيتحول لـ [[@media (prefers-color-scheme: dark)]]، فالصفحة بتسمع لإعداد الجهاز من غير JavaScript.
- لون الرقم والزرار اتغيّر في الغامق كمان ([[teal-700]] لـ [[teal-300]])، لأن اللون الغامق على خلفية غامقة بيضيع.
- [[flex-wrap]] على الزرارين عشان ينزلوا تحت بعض لو الشاشة صغيرة بدل ما يطلعوا برا.

**الغلطة الشائعة:** تقلب الخلفية بس وتنسى لون النص الباهت والزرار، فالصفحة تبقى غامقة بس مقروءة بالعافية. جرّب الوضعين ومعاهم axe.

~~~text الناتج
                   360 light         360 dark          1280
مركز المحتوى      (180, 400)        (180, 400)        (640, 400)
خلفية body         rgb(255,255,255)  oklch(0.13 ...)   نفس الاتنين
لون الرقم 404      oklch(0.511 ...)  oklch(0.855 ...)
scrollWidth        360               360               1280
axe                صفر               صفر               صفر

في CSS مكتوب سطر واحد بتاعك: @import.
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Tailwind (صفحة «Detecting classes in source files»): إزاي تخلي Tailwind يقرا فولدر برا المشروع، وإزاي تمنعه من فولدر جواه؟ جرّب الاتنين.`, done: R`لقيت [[@source "../shared";]] و [[@source not "../legacy";]] (المسار من مكان ملف الـ CSS)، وأثبت بـ grep: كلاس موجود في shared بس ظهر في [[out.css]]، وكلاس موجود في legacy بس مظهرش.`, sol: R`~~~text شكل الفولدرات
v4-4/
  shared/card.html       فيه p-72
  app/
    src/in.css
    src/index.html       فيه p-1
    legacy/old.html      فيه p-71
~~~

~~~css app/src/in.css
@import "tailwindcss";
@source "../../shared";
@source not "../legacy";
~~~

~~~bash
cd app/src
npx @tailwindcss/cli -i in.css -o out.css
grep -c "p-72" out.css
grep -c "p-71" out.css
~~~

**الإجابة من صفحة «Detecting classes in source files»:** [[@source]] بيضيف مسار يتفحص، و [[@source not]] بيستبعد مسار. والمسار دايمًا محسوب من مكان ملف الـ CSS، مش من مكان تشغيل الأمر. عشان كده [[../../shared]] من [[app/src]] بيوصل لـ [[shared]].

**إمتى تحتاجهم:** الأول لو عندك monorepo والمكونات في package برا المشروع. والتاني لو فيه كود قديم أو ملفات كبيرة فيها كلمات شبه الكلاسات بتكبّر الـ CSS على الفاضي.

**الغلطة الشائعة:** تكتب المسار من جذر المشروع زي [[@source "shared"]]، فمحدش بيقولك إن المسار غلط، والكلاسات بس مبتطلعش. تأكد بـ grep دايمًا.

~~~text الناتج
Done in 42ms
.p-72 (في shared فقط)   موجودة في out.css
.p-71 (في legacy فقط)   مش موجودة
.p-1  (في src)          موجودة
~~~` },
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
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[@theme { --fonts-display: "Cairo", sans-serif; }]] و [[<h1 class="font-display">]]، والخط مش بيتغيّر. لاقي الغلطة.`, done: R`الاسم [[--fonts-]] مش namespace بيعرفه Tailwind، فمفيش [[.font-display]] ولا المتغير نفسه في [[out.css]] (grep فاضي). بعد [[--font-display]] الكلاس اتولّد والخط اتغيّر.`, sol: R`~~~css in.css
@import "tailwindcss";
@theme { --font-display: "Cairo", sans-serif; }
~~~

الغلطة حرف [[s]] زيادة: [[--fonts-display]] لازم تبقى [[--font-display]].

**ليه:** [[@theme]] مش متغيرات CSS عادية، ده تعريف لـ design tokens. أول جزء من الاسم (الـ namespace) هو اللي بيقول لـ Tailwind يعمل كلاس إيه: [[--font-*]] بيعمل [[font-*]]، و [[--color-*]] بيعمل [[bg-*]] و [[text-*]]، و [[--radius-*]] بيعمل [[rounded-*]]. [[--fonts-]] مش namespace معروف، فمفيش كلاس. والمتغير نفسه بيتمسح من الناتج كمان لأن محدش بيستخدمه.

**الغلطة الشائعة:** تدوّر في الخطوط ومسارها و [[@font-face]]، والمشكلة في اسم التوكن. أول خطوة: grep على [[out.css]]. وتخيل برضه إن مفيش أي error من الـ CLI، الـ build بيطبع Done عادي.

~~~text الناتج
بـ --fonts-display:  .font-display مش موجودة ، --fonts-display مش موجود
بـ --font-display:   .font-display موجودة ، --font-display موجود
font-family بتاع h1: Cairo, sans-serif
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** توكنز لمحل شاي متخيل في [[@theme]]: [[--color-brand]] و [[--color-brand-soft]] و [[--radius-card]] و [[--font-display]] و [[--shadow-card]]، وصفحة منتجات بتستخدمهم ([[bg-brand/20]] و [[rounded-card]] و [[shadow-card]]).`, done: R`grep على [[out.css]] بيلاقي [[--color-brand]] في [[:root]] و [[.bg-brand\/20]] جواها [[color-mix]]، ولما تغيّر لون واحد في الـ [[@theme]] كل الصفحة بتتغيّر، ومفيش ولا [[#hex]] في الـ HTML.`, sol: R`~~~css in.css
@import "tailwindcss";

@theme {
  --color-brand: #0f766e;
  --color-brand-soft: #ccfbf1;
  --radius-card: 1.25rem;
  --font-display: "Cairo", system-ui, sans-serif;
  --shadow-card: 0 8px 24px rgb(0 0 0 / 0.08);
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>محل شاي النيل</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="bg-brand-soft p-6 text-gray-900">
<main class="mx-auto max-w-3xl">
  <h1 class="font-display text-3xl font-bold text-brand">محل شاي النيل</h1>
  <ul class="mt-6 grid gap-4 sm:grid-cols-2">
    <li class="rounded-card bg-white p-6 shadow-card">
      <h2 class="font-display text-xl font-bold">شاي أسواني</h2>
      <p class="mt-2 inline-block rounded-full bg-brand/20 px-3 py-1 text-sm">80 جنيه</p>
    </li>
    <li class="rounded-card bg-white p-6 shadow-card">
      <h2 class="font-display text-xl font-bold">نعناع مجفف</h2>
      <p class="mt-2 inline-block rounded-full bg-brand/20 px-3 py-1 text-sm">45 جنيه</p>
    </li>
  </ul>
  <a href="#order" class="mt-6 inline-block rounded-card bg-brand px-6 py-3 font-bold text-white">اطلب دلوقتي</a>
</main>
</body>
</html>
~~~

**ليه شغال:** كل سطر في [[@theme]] بيعمل حاجتين: متغير CSS في [[:root]]، وكلاسات. [[--color-brand]] بيدّيك [[bg-brand]] و [[text-brand]]، و [[--radius-card]] بيدّيك [[rounded-card]]، و [[--shadow-card]] بيدّيك [[shadow-card]].

و [[bg-brand/20]] معناها اللون ده بشفافية 20٪. Tailwind بيعملها بـ [[color-mix()]] عشان تشتغل مع أي لون، حتى لو متغير.

الألوان كلها جاية من مكان واحد، فتغيير البراند بقى سطر واحد.

**الغلطة الشائعة:** تكتب [[--brand: #0f766e]] من غير [[--color-]]. ده متغير عادي، ومفيش [[bg-brand]] هيتولّد.

~~~text الناتج
out.css:
:root فيه --color-brand: #0f766e

.bg-brand\/20 {
  background-color: color-mix(in srgb, #0f766e 20%, transparent);
  @supports (color: color-mix(in lab, red, red)) {
    background-color: color-mix(in oklab, var(--color-brand) ...

مفيش ولا hex في index.html
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[@theme { --color-bg: var(--bg); }]] ضد [[@theme inline { --color-bg: var(--bg); }]]، وجوه الصفحة section عليه [[data-theme="dark"]] بيغيّر [[--bg]] لأسود. خلفية [[bg-bg]] جوه الـ section هتبقى إيه في الحالتين؟`, done: R`من غير inline: [[.bg-bg]] بتقرا [[var(--color-bg)]]، والمتغير ده اتحسب مرة واحدة على [[:root]] (أبيض) واتورث كده، فالخلفية فضلت [[rgb(255, 255, 255)]] جوه الـ section. مع inline: الكلاس فيه [[var(--bg)]] نفسه، فبقت سودا.`, sol: R`~~~css in.css (النسخة من غير inline)
@import "tailwindcss";
:root { --bg: #fff; }
[data-theme="dark"] { --bg: #000; }
@theme { --color-bg: var(--bg); }
~~~

~~~css in.css (النسخة بـ inline)
@import "tailwindcss";
:root { --bg: #fff; }
[data-theme="dark"] { --bg: #000; }
@theme inline { --color-bg: var(--bg); }
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>inline</title><link rel="stylesheet" href="out.css"></head>
<body>
<section data-theme="dark"><div id="box" class="bg-bg p-8">كلام</div></section>
</body>
</html>
~~~

**الفرق في سطر واحد من [[out.css]]:**

- من غير [[inline]]: [[.bg-bg { background-color: var(--color-bg); }]]، و [[--color-bg]] متعرّف على [[:root]] بقيمة [[var(--bg)]].
- مع [[inline]]: [[.bg-bg { background-color: var(--bg); }]]، يعني الكلاس بيقرا المتغير الأصلي مباشرة.

**ليه ده بيغيّر النتيجة:** متغيرات CSS بتتحسب عند العنصر اللي اتعرّفت عليه، وبعدين القيمة المحسوبة هي اللي بتتورث. [[--color-bg]] اتحسب على [[:root]] بأبيض، والـ section ورث الأبيض ده. تغيير [[--bg]] تحت مش بيرجع يعيد حساب حاجة فوق. أما مع inline الكلاس نفسه بيقرا [[--bg]] عند العنصر، فبيلاقي الأسود.

**القاعدة:** لو توكن Tailwind بيشاور على متغير بيتغيّر حسب الثيم، استخدم [[@theme inline]].

**الغلطة الشائعة:** تجرّب الثيم على [[<html>]] فيشتغل، وتفتكر إنه سليم. المشكلة بتظهر بس لما الثيم يتغيّر على عنصر جوه الصفحة.

~~~text الناتج
من غير inline:  backgroundColor = rgb(255, 255, 255)
مع inline:      backgroundColor = rgb(0, 0, 0)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** animation في [[@theme]]: [[--animate-float]] ومعاه [[@keyframes float]] جوه نفس البلوك، واستخدمه بـ [[motion-safe:animate-float]] على أيقونة.`, done: R`[[out.css]] فيه [[@keyframes float]] و [[.motion-safe\:animate-float]] جوه [[@media (prefers-reduced-motion: no-preference)]]، ولو عرّفت keyframes تانية ومستخدمتهاش مش بتطلع في الملف. ومع reduce في Rendering الأيقونة واقفة.`, sol: R`~~~css in.css
@import "tailwindcss";

@theme {
  --animate-float: float 3s ease-in-out infinite;
  @keyframes float {
    0%, 100% { translate: 0 0; }
    50%      { translate: 0 -8px; }
  }

  --animate-wobble: wobble 1s linear infinite;
  @keyframes wobble {
    50% { rotate: 6deg; }
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>float</title><link rel="stylesheet" href="out.css"></head>
<body class="p-8">
<main><h1 class="text-xl font-bold">شحن مجاني</h1>
<svg id="icon" class="mt-4 size-12 text-teal-700 motion-safe:animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 21h14"/></svg></main>
</body>
</html>
~~~

**ليه شغال:** [[--animate-float]] بيعمل كلاس [[animate-float]]. و [[@keyframes]] جوه [[@theme]] بيتربط بالتوكن: لو الكلاس اتستخدم الـ keyframes تطلع، ولو لأ متطلعش. عشان كده [[wobble]] اختفت من الملف خالص.

[[motion-safe:]] بيلف القاعدة في [[@media (prefers-reduced-motion: no-preference)]]، فمن طلب حركة أقل مبيشوفش الحركة خالص.

**الغلطة الشائعة:** تكتب [[@keyframes]] برا [[@theme]] في آخر الملف. هيشتغل، بس هتفضل في [[out.css]] حتى لو محدش بيستخدمها، وكمان تكتب [[animate-float]] من غير [[motion-safe:]] فتنسى اللي عنده دوخة من الحركة.

~~~text الناتج
out.css:
@keyframes float موجودة ، wobble مش موجودة (مش مستخدمة)

@media (prefers-reduced-motion: no-preference) {
  .motion-safe\:animate-float {
    animation: var(--animate-float);
  }
}

document.getAnimations().length: عادي 1 ، مع reduce 0
animationName = float
~~~` },
            { lvl: 'تحدي', t: R`**refactor:** صفحة فيها [[bg-[#6d28d9]]] و [[text-[#6d28d9]]] و [[border-[#6d28d9]]] متكررين ١٢ مرة. حوّلها لتوكن واحد من غير ما الشكل يتغيّر.`, done: R`grep على الـ HTML بـ [[\[#]] مبيلاقيش حاجة، والتوكن [[--color-brand]] متعرّف مرة في [[@theme]]، ولقطتين قبل وبعد (screenshot) شبه بعض، وتغيير اللون بقى سطر واحد.`, sol: R`قبل:

~~~html before.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>قبل</title><link rel="stylesheet" href="out.css"></head>
<body class="p-6">
<main>
  <h1 class="text-[#6d28d9] text-2xl font-bold">العرض</h1>
  <a href="#a" class="mt-4 inline-block bg-[#6d28d9] px-4 py-2 text-white">اشتري</a>
  <p class="mt-4 border-2 border-[#6d28d9] p-4">تفاصيل</p>
</main>
</body>
</html>
~~~

التوكن:

~~~css in.css
@import "tailwindcss";
@theme { --color-brand: #6d28d9; }
~~~

والتحويل كله أمر واحد على الفولدر، وبعدين اتأكد:

~~~bash
sed -E -i 's/(text|bg|border)-\[#6d28d9\]/\1-brand/g' index.html
grep -c '\[#' index.html     # المفروض 0
~~~

**ليه التوكن أحسن:** اللون اتكتب ١٢ مرة، فتغييره يعني ١٢ تعديل ومكان تنساه. دلوقتي [[--color-brand]] سطر واحد، و [[bg-brand]] و [[text-brand]] و [[border-brand]] كلهم بيقروا منه. والاسم كمان بيقول المعنى: ده لون البراند، مش مجرد بنفسجي.

**ازاي تتأكد إن الشكل متغيرش:** متعتمدش على عينك. خد screenshot قبل وبعد وقارن الملفين.

**الغلطة الشائعة:** تحط التوكن وتنسى تعمل build تاني قبل المقارنة، أو تسمي التوكن [[--color-purple]]. لو البراند بقى أخضر بكره الاسم هيكدب.

~~~text الناتج
color بتاع h1 قبل وبعد: rgb(109, 40, 217)
screenshot قبل وبعد: متطابقين byte بـ byte
grep '\[#' بعد التحويل: مفيش حاجة

تغيير سطر واحد لـ --color-brand: #be123c
خلفية الزرار بقت: rgb(190, 18, 60)
~~~` },
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ عناصر: [[sm:hidden]] و [[hidden sm:block]] و [[max-sm:hidden]]. مين ظاهر على 360 ومين على 768؟`, done: R`على 360: الأول ظاهر، والتاني مستخبي، والتالت مستخبي. على 768: الأول مستخبي، والتاني ظاهر، والتالت ظاهر. وعرفت إن الكلاس من غير prefix هو الموبايل، و [[sm:]] = من 640 وطالع.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>variants</title><link rel="stylesheet" href="out.css"></head>
<body>
<div id="a" class="sm:hidden">الأول</div>
<div id="b" class="hidden sm:block">التاني</div>
<div id="c" class="max-sm:hidden">التالت</div>
</body>
</html>
~~~

**القاعدة:** Tailwind mobile-first. الكلاس من غير prefix بيشتغل على كل المقاسات. [[sm:]] معناها «من 640px وطالع». و [[max-sm:]] معناها «أقل من 640px».

- [[sm:hidden]]: مفيش حاجة تحت 640، فظاهر. ومن 640 وطالع مخفي.
- [[hidden sm:block]]: مخفي عادي، ومن 640 وطالع block.
- [[max-sm:hidden]]: مخفي تحت 640، وفوقها ظاهر.

**الغلطة الشائعة:** تقرا [[sm:]] على إنها «الشاشات الصغيرة». هي عكس كده: الحد الأدنى، مش الأقصى. عشان تستهدف الموبايل بس، اكتب الكلاس من غير prefix وارجعه بـ [[sm:]]، أو استخدم [[max-sm:]].

~~~text الناتج
          sm:hidden    hidden sm:block    max-sm:hidden
360       ظاهر         مخفي               مخفي
768       مخفي         ظاهر               ظاهر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** navbar بـ Tailwind بس: الروابط [[hidden md:flex]]، وزرار ☰ [[md:hidden]] عليه [[aria-expanded]] والأيقونة [[aria-expanded:rotate-90]]، والقايمة على الموبايل [[max-md:]] بتظهر لما الزرار يتضغط (سطرين JavaScript بيقلبوا [[aria-expanded]] و [[hidden]]).`, done: R`على 360 و 768 و 1280 الشكل صح ومفيش scroll أفقي، والأيقونة بتلف لما القايمة تفتح من غير ولا class في JavaScript غير [[aria-expanded]]، و Tab بيوصل للزرار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>navbar</title>
<link rel="stylesheet" href="out.css">
</head>
<body>
<header class="border-b border-gray-200">
  <nav aria-label="الرئيسية" class="mx-auto flex max-w-5xl items-center justify-between p-4">
    <a href="/" class="font-bold">متجر النور</a>
    <button id="menu-btn" type="button" aria-label="القايمة" aria-expanded="false" aria-controls="menu"
            class="grid size-11 place-items-center text-2xl transition-transform aria-expanded:rotate-90 md:hidden">☰</button>
    <ul id="menu" class="hidden gap-6 md:flex max-md:absolute max-md:inset-x-0 max-md:top-[4.8rem] max-md:bg-white max-md:p-4 max-md:shadow-lg">
      <li><a href="/products" class="block py-2">المنتجات</a></li>
      <li><a href="/offers" class="block py-2">العروض</a></li>
      <li><a href="/contact" class="block py-2">كلّمنا</a></li>
    </ul>
  </nav>
</header>
<main class="p-4"><h1 class="text-2xl font-bold">أهلًا بيك</h1></main>
<script>
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("hidden", open);
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- [[hidden md:flex]] على القايمة: مخفية على الموبايل، و flex من 768.
- [[md:hidden]] على الزرار: موجود تحت 768 بس.
- [[max-md:absolute]] وأخواتها: شكل القايمة لما تفتح على الموبايل، ومبيأثروش على الديسكتوب.
- [[aria-expanded:rotate-90]] بيتحول لـ [[&[aria-expanded="true"]]]. يعني الشكل نفسه راكب على حالة الـ accessibility، فلو نسيت تحدّث الـ attribute الشكل هيفضحك.

الـ JavaScript بيقلب حاجتين بس: [[aria-expanded]] و [[hidden]].

**الغلطة الشائعة:** تعمل كلاس [[rotated]] في JavaScript. كده عندك مصدرين للحالة، ولما يختلفوا قارئ الشاشة يقول مقفول والسهم مفتوح. خلي الـ attribute هو المصدر الوحيد.

~~~text الناتج
360 مقفول:   الزرار grid ، القايمة none ، rotate none ، aria-expanded false
Tab Tab:     focus على menu-btn
Enter:       القايمة block ، rotate 90deg ، aria-expanded true
768:         الزرار none ، القايمة flex
1280:        الزرار none ، القايمة flex

scrollWidth = clientWidth في التلاتة ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زراير عليها [[focus:outline-none]] عشان «الـ outline وحش لما بدوس بالماوس». مستخدم الكيبورد مش عارف هو فين. صلّحها من غير ما الماوس يشوف outline.`, done: R`بعد [[focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand]]: الضغط بالماوس مبيطلّعش outline، و Tab بيطلّعه واضح على كل زرار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>focus</title><link rel="stylesheet" href="out.css"></head>
<body class="p-8">
<main class="flex gap-3">
  <button id="one" class="rounded-lg bg-gray-100 px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">حفظ</button>
  <button id="two" class="rounded-lg bg-gray-100 px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">إلغاء</button>
</main>
</body>
</html>
~~~

**الفرق:** [[focus]] بيطابق أي focus، بالماوس أو الكيبورد. [[focus-visible]] بيطابق بس لما المتصفح يشوف إن المستخدم محتاج يعرف هو فين، يعني جاي بالكيبورد.

ومفيش داعي نكتب [[focus:outline-none]] أصلًا: Chrome مبيرسمش outline للزرار بعد ضغطة ماوس. فاللي كان بيضايق الديزاينر مش موجود، والسطر ده كان بيشيل الإطار من الكيبورد بس.

- [[focus-visible:outline-2]] سُمك 2px.
- [[focus-visible:outline-offset-2]] مسافة عن الزرار عشان يبان على أي خلفية.
- [[focus-visible:outline-brand]] من توكن البراند.

**الغلطة الشائعة:** تستبدل [[focus:outline-none]] بـ [[focus:ring-2]]. ده بيظهر مع الماوس كمان، وهي دي الشكوى الأصلية.

~~~text الناتج
ضغطة ماوس على «حفظ»:
outline-style = none

Tab لـ «إلغاء»:
outline-style = solid ، width 2px ، offset 2px ، color rgb(15, 118, 110)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** toggle شهري/سنوي لصفحة أسعار من غير JavaScript: radio اتنين جوه wrapper عليه [[group]]، والأسعار [[group-has-[#yearly:checked]:hidden]] و [[hidden group-has-[#yearly:checked]:block]].`, done: R`اختيار «سنوي» بيبدّل كل الأسعار في نفس اللحظة، والأسهم بين الـ radios بتبدّل من الكيبورد، و grep على الـ JS مفيهوش أي حاجة للأسعار.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>الأسعار</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main class="group mx-auto max-w-2xl">
  <h1 class="text-2xl font-bold">الأسعار</h1>
  <fieldset class="mt-4 flex gap-4">
    <legend class="sr-only">مدة الاشتراك</legend>
    <label class="flex items-center gap-2"><input type="radio" name="period" id="monthly" checked> شهري</label>
    <label class="flex items-center gap-2"><input type="radio" name="period" id="yearly"> سنوي (وفّر شهرين)</label>
  </fieldset>
  <ul class="mt-6 grid gap-4 sm:grid-cols-2">
    <li class="rounded-xl border border-gray-300 p-6">
      <h2 class="font-bold">الأساسية</h2>
      <p class="mt-2 text-3xl group-has-[#yearly:checked]:hidden">99 جنيه / شهر</p>
      <p class="mt-2 hidden text-3xl group-has-[#yearly:checked]:block">990 جنيه / سنة</p>
    </li>
    <li class="rounded-xl border border-gray-300 p-6">
      <h2 class="font-bold">الاحترافية</h2>
      <p class="mt-2 text-3xl group-has-[#yearly:checked]:hidden">299 جنيه / شهر</p>
      <p class="mt-2 hidden text-3xl group-has-[#yearly:checked]:block">2990 جنيه / سنة</p>
    </li>
  </ul>
</main>
</body>
</html>
~~~

**ليه شغال:** [[group]] على [[<main>]]، و [[group-has-[#yearly:checked]:hidden]] بتتحول لقاعدة معناها «لو الجد اللي اسمه group جواه [[#yearly]] متعلّم، اخفي العنصر ده». يعني [[:has()]] بيقرا حالة الـ radio، والـ CSS كله بيتغيّر من غير ولا سطر JavaScript.

كل سعر مكتوب مرتين، عنصر شهري وعنصر سنوي، وواحد بس ظاهر.

**الكيبورد ببلاش:** دول radio حقيقيين بنفس الـ [[name]]، فالأسهم بتتنقل بينهم وقارئ الشاشة بيقول «١ من ٢». و [[fieldset]] و [[legend]] بيدّوا المجموعة اسم.

**الغلطة الشائعة:** تعمل الزرارين [[<button>]] بشكل tabs. كده هتحتاج JavaScript و ARIA عشان توصل لنفس السلوك اللي الـ radio بيديهولك.

~~~text الناتج
شهري:         «99 جنيه / شهر» و «299 جنيه / شهر»
سنوي:         «990 جنيه / سنة» و «2990 جنيه / سنة»  (في نفس اللحظة)
السهم يمين:   رجع شهري ، input:checked = monthly

scripts في الصفحة: 0
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** أسئلة شائعة بزراير [[aria-expanded]]، والسهم جوه الزرار [[group-aria-expanded:rotate-180]] (والزرار عليه [[group]])، والإجابة [[data-[state=open]:block hidden]]، وفاصل بين الأسئلة بـ [[not-last:border-b]] على الأب بـ [[*:]].`, done: R`فتح سؤال بيلف سهمه بس، وآخر سؤال مفيش تحته خط، و grep على [[out.css]] بيلاقي [[[aria-expanded="true"]]] و [[:not(:last-child)]].`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>أسئلة شائعة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main class="mx-auto max-w-xl">
  <h1 class="text-2xl font-bold">أسئلة شائعة</h1>
  <div id="faq" class="mt-4 *:not-last:border-b *:not-last:border-gray-300">
    <div>
      <h2><button type="button" aria-expanded="false" aria-controls="a1" class="group flex w-full items-center justify-between py-3 font-semibold">
        التوصيل بياخد قد إيه؟ <span aria-hidden="true" class="transition-transform group-aria-expanded:rotate-180">▼</span>
      </button></h2>
      <p id="a1" data-state="closed" class="hidden pb-3 data-[state=open]:block">يومين شغل جوه القاهرة.</p>
    </div>
    <div>
      <h2><button type="button" aria-expanded="false" aria-controls="a2" class="group flex w-full items-center justify-between py-3 font-semibold">
        أرجّع المنتج إزاي؟ <span aria-hidden="true" class="transition-transform group-aria-expanded:rotate-180">▼</span>
      </button></h2>
      <p id="a2" data-state="closed" class="hidden pb-3 data-[state=open]:block">خلال ١٤ يوم من الاستلام.</p>
    </div>
    <div>
      <h2><button type="button" aria-expanded="false" aria-controls="a3" class="group flex w-full items-center justify-between py-3 font-semibold">
        بتقبلوا الدفع عند الاستلام؟ <span aria-hidden="true" class="transition-transform group-aria-expanded:rotate-180">▼</span>
      </button></h2>
      <p id="a3" data-state="closed" class="hidden pb-3 data-[state=open]:block">أيوه، في كل المحافظات.</p>
    </div>
  </div>
</main>
<script>
  document.querySelectorAll("#faq button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      document.getElementById(btn.getAttribute("aria-controls")).dataset.state = open ? "closed" : "open";
    });
  });
$__lt/script>
</body>
</html>
~~~

**ليه شغال:**

- [[group-aria-expanded:rotate-180]] على السهم: الـ [[aria-expanded]] موجود على الزرار، والسهم جواه. [[aria-expanded:]] لوحدها بتبص على العنصر نفسه، فمش هتشتغل على السهم. فبنحط [[group]] على الزرار، والسهم يبص على الأب.
- [[data-[state=open]:block]] مع [[hidden]]: قاعدة الـ variant بتيجي بعد في الـ CSS فبتكسب، فالإجابة بتظهر لما [[data-state]] يبقى [[open]].
- [[*:not-last:border-b]] على الأب: [[*:]] بتطبّق على الأولاد المباشرين، و [[not-last:]] بتستثني آخر واحد. كده الفاصل كله في مكان واحد.

**الغلطة الشائعة:** تحط [[aria-expanded:rotate-180]] على السهم. الـ build بيعدّي والكلاس موجود، بس عمره ما بيتفعّل لأن السهم نفسه مفيهوش الـ attribute.

~~~text الناتج
قبل أي ضغطة:
border-bottom: 1px ، 1px ، 0px   (آخر سؤال مفيش تحته خط)

بعد فتح السؤال الأول:
rotate: 180deg ، none ، none
الإجابة ظاهرة للأول بس

grep على out.css: [aria-expanded="true"] موجود ، :not(:last-child) موجود
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[check-variants.mjs]]: بيعمل build لملف HTML فيه [[md:flex]] و [[hover:bg-brand]] و [[dark:bg-black]]، ويتأكد من [[out.css]] إن [[md:flex]] جوه [[@media (width >= 48rem)]]، و [[hover:]] جوه [[@media (hover: hover)]]. ويخرج بـ 1 لو حاجة ناقصة.`, done: R`السكربت بيخرج 0 على الإعداد العادي، ولما تزوّد [[@custom-variant dark (&:where(.dark, .dark *));]] الاختبار بتاع dark بيفشل لو لسه بيدوّر على [[prefers-color-scheme]] (يعني بيمسك التغيير).`, sol: R`~~~js check-variants.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

writeFileSync("page.html", '<div class="md:flex hover:bg-brand dark:bg-black"></div>');
execSync("npx @tailwindcss/cli -i in.css -o out.css", { stdio: "pipe" });
const css = readFileSync("out.css", "utf8");

// Tailwind بيحط الـ at-rule قبل الكلاس، فبندوّر لورا ونتأكد إن البلوك لسه مفتوح
function inside(atRule, cls) {
  const end = css.indexOf(cls);
  const start = css.lastIndexOf(atRule, end);
  if (end === -1 || start === -1) return false;
  const between = css.slice(start, end);
  const opened = (between.match(/{/g) ?? []).length;
  const closed = (between.match(/}/g) ?? []).length;
  return opened > closed;
}

const checks = [
  ["md:flex جوه @media (width >= 48rem)", inside("@media (width >= 48rem)", ".md\\:flex")],
  ["hover: جوه @media (hover: hover)", inside("@media (hover: hover)", ".hover\\:bg-brand")],
  ["dark: جوه prefers-color-scheme", inside("prefers-color-scheme: dark", ".dark\\:bg-black")],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log((ok ? "ok   " : "FAIL ") + name);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
~~~

~~~css in.css
@import "tailwindcss";
@theme { --color-brand: #0f766e; }
~~~

~~~bash
node check-variants.mjs
echo "exit: $?"
~~~

**ليه الدالة بتدوّر لورا:** Tailwind بيكتب [[@media (width >= 48rem) { .md\:flex { ... } }]]، يعني الـ at-rule قبل الكلاس. فبناخد مكان الكلاس، ونرجع لآخر مرة ظهر فيها الـ at-rule، ونعدّ الأقواس بينهم. لو الأقواس المفتوحة أكتر من المقفولة، البلوك لسه مفتوح والكلاس جواه فعلًا.

مجرد [[css.includes(...)]] مش كفاية: الـ at-rule ممكن يكون موجود في مكان تاني والكلاس برا منه.

**ليه الاختبار مفيد:** لما حد يزوّد [[@custom-variant dark]]، معنى [[dark:]] بيتغيّر من إعداد الجهاز لكلاس على html. الاختبار بيقع ويقولك إن فيه قرار اتغيّر، وتحدّثه عن قصد.

**الغلطة الشائعة:** تدوّر على الكلاس بعد الـ at-rule بمسافة ثابتة. عند أي تغيير في شكل الناتج الاختبار هيكدب.

~~~text الناتج
الإعداد العادي:
ok   md:flex جوه @media (width >= 48rem)
ok   hover: جوه @media (hover: hover)
ok   dark: جوه prefers-color-scheme
exit: 0

بعد @custom-variant dark (&:where(.dark, .dark *));
ok   md:flex جوه @media (width >= 48rem)
ok   hover: جوه @media (hover: hover)
FAIL dark: جوه prefers-color-scheme
exit: 1
~~~` },
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
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه اللي هيحصل لكل واحد؟ (١) [[@media (min-width: 40rem) { @utility card { padding: 2rem; } }]] (٢) [[@utility card { padding: 1rem; @media (min-width: 40rem) { padding: 2rem; } }]] (٣) [[@utility .card { padding: 1rem; }]]. اكتب التلاتة وبعدين جرّب بـ [[npx @tailwindcss/cli -i in.css -o out.css]].`, done: R`(١) [[cannot be nested]]، و (٢) نجح وفي [[out.css]] قاعدة [[.card]] وجواها [[@media]]، و (٣) [[defines an invalid utility name]]. وكل واحد طابق توقعك أو كاتب ليه لأ.`, sol: R`~~~css one.css
@import "tailwindcss";
@media (min-width: 40rem) { @utility card { padding: 2rem; } }
~~~

~~~css two.css
@import "tailwindcss";
@utility card { padding: 1rem; @media (min-width: 40rem) { padding: 2rem; } }
~~~

~~~css three.css
@import "tailwindcss";
@utility .card { padding: 1rem; }
~~~

~~~bash
npx @tailwindcss/cli -i one.css -o out.css
npx @tailwindcss/cli -i two.css -o out.css
npx @tailwindcss/cli -i three.css -o out.css
~~~

**(١) بيفشل:** [[@utility]] لازم يبقى في أعلى مستوى في الملف. Tailwind محتاج يقراه كتعريف كلاس، عشان يقدر يركّب عليه [[md:]] و [[hover:]]، فميقدرش يبقى جوه شرط.

**(٢) بينجح:** نفس الفكرة بالعكس: الـ [[@media]] جوه الـ utility. الكلاس واحد، والشرط جزء من محتواه.

**(٣) بيفشل:** الاسم بيتكتب من غير نقطة، زي ما بتكتبه في الـ HTML. [[@utility card]] مش [[@utility .card]].

**الغلطة الشائعة:** تنقل عادتك من CSS العادي، فتحط القاعدة جوه [[@media]] أو تكتب النقطة. الرسالتين واضحين، فاقراهم بدل ما تجرّب حاجات.

~~~text الناتج
(١) Error: $__bt@utility$__bt cannot be nested.
(٢) Done in 51ms
    .card {
      padding: 1rem;
      @media (min-width: 40rem) {
        padding: 2rem;
      }
    }
(٣) Error: $__bt@utility .card$__bt defines an invalid utility name.
    Utilities should be alphanumeric and start with a lowercase letter.
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** صلّح الملف ده من غير ما تغيّر الشكل النهائي: [[@supports (backdrop-filter: blur(4px)) { @utility glass { backdrop-filter: blur(12px); } }]]، واستخدم [[glass]] و [[md:glass]] في صفحة. أثبت بـ [[curl]] إن الصفحة [[200]]، وبـ [[grep]] على ملف الـ CSS إن [[backdrop-filter]] موجود جوه [[@supports]] للاتنين.`, done: R`[[curl -w "%{http_code}"]] بيطبع [[200]]، و [[grep -c "backdrop-filter: blur(12px)"]] على الـ CSS أكبر من أو يساوي ٢ (للكلاسين)، وفيه [[.md\:glass]].`, sol: R`البايظ:

~~~css bad.css
@import "tailwindcss";
@supports (backdrop-filter: blur(4px)) { @utility glass { backdrop-filter: blur(12px); } }
~~~

المصلّح:

~~~css in.css
@import "tailwindcss";

@utility glass {
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(12px);
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>glass</title><link rel="stylesheet" href="out.css"></head>
<body>
<main>
  <h1 class="glass p-4">زجاج دايمًا</h1>
  <p class="md:glass p-4">زجاج من 768 وطالع</p>
</main>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css
npx serve . -l 4000
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4000/
grep -c "backdrop-filter: blur(12px)" out.css
grep -F ".md\:glass" out.css
~~~

**التصليح:** قلب الترتيب. [[@utility]] برا، و [[@supports]] جواه. الشكل النهائي واحد، بس Tailwind دلوقتي يقدر يولّد الكلاس ويركّب عليه [[md:]].

**ليه الـ CSS فيها الاتنين جوه [[@supports]]:** كل كلاس بتاخد نسخة خاصة بيها، و [[.md\:glass]] جوه [[@media]] وجواها [[@supports]].

**الغلطة الشائعة:** في مشروع Next ده بيطلّع صفحة 500 على كل الموقع، مش على الصفحة اللي فيها الكلاس، لأن ملف الـ CSS كله فشل. لو كل الصفحات وقعت مرة واحدة، أول مكان تبص فيه هو لوج السيرفر.

~~~text الناتج
الملف البايظ:  Error: $__bt@utility$__bt cannot be nested.

بعد التصليح:
Done in 48ms
curl:  200
grep -c "backdrop-filter: blur(12px)":  2
@supports (backdrop-filter: blur(4px)) ظهرت مرتين
.md\:glass موجودة جوه @media (width >= 48rem)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** بطاقة «زجاج» فوق صورة خلفية بـ [[@utility glass]] (اللي في الدرس)، وافتحها في Chrome، وبعدين جرّب حالة متصفح مش بيدعمه: في نسخة من الـ CSS غيّر الشرط لقيمة غلط زي [[@supports (backdrop-filter: nope(1px))]] وابني تاني. الكلام لازم يفضل مقري في الحالتين.`, done: R`صورتين: واحدة فيها blur، وواحدة من غيره والخلفية شبه مصمتة ([[0.9]])، والكلام واضح في الاتنين.`, sol: R`~~~css in.css
@import "tailwindcss";

@utility glass {
  background-color: rgb(255 255 255 / 0.9);
  @supports (backdrop-filter: blur(4px)) {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>بطاقة زجاج</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="grid min-h-dvh place-items-center bg-[linear-gradient(135deg,#0f172a,#0f766e_50%,#f59e0b)] p-6">
<main id="card" class="glass max-w-sm rounded-2xl p-6 text-gray-950">
  <h1 class="text-2xl font-bold">عرض الصيف</h1>
  <p class="mt-2">خصم 30% على كل السماعات لحد آخر الشهر.</p>
</main>
</body>
</html>
~~~

ولحالة «متصفح مش بيدعمه»، غيّر شرط [[@supports]] لقيمة غلط وابني تاني:

~~~css nosupport.css
@import "tailwindcss";

@utility glass {
  background-color: rgb(255 255 255 / 0.9);
  @supports (backdrop-filter: nope(1px)) {
    backdrop-filter: blur(12px);
    background-color: rgb(255 255 255 / 0.6);
  }
}
~~~

**ليه شغال:** القيمة برا [[@supports]] هي الأساس: أبيض 0.9 تقريبًا مصمت، بيتقري على أي خلفية. لو المتصفح بيدعم الـ blur، بننزّل الشفافية لـ 0.6 لأن الـ blur هو اللي بيحمي الكلام.

الترتيب ده هو الـ progressive enhancement: الأساس سليم للكل، والتحسين لمين يقدر.

حسبت التباين على أغمق وأفتح لون في الخلفية، لأن الزجاج فوق تدرّج مش لون واحد.

**الغلطة الشائعة:** تكتب [[rgb(255 255 255 / 0.2)]] برا [[@supports]] عشان الشكل حلو عندك. أي متصفح من غير blur هيطلع كلام فوق صورة مكشوفة.

~~~text الناتج
                    Chrome الحالي       الشرط غلط
background-color    rgba(255,255,255,0.6)   rgba(255,255,255,0.9)
backdrop-filter     blur(12px)          none

تباين الكلام (#030712) بعد خلط الأبيض مع لون الخلفية:
                    0.6       0.9
على الأغمق          7.88      16.42
على التيل           11.07     17.50
على الكهرماني       14.78     18.63

على 360: scrollWidth = clientWidth
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[check-utility.mjs]]: بيقرا ملف CSS ويعدّ عمق الأقواس [[{ }]] سطر سطر، ولو لقى [[@utility]] والعمق مش صفر يطبع رقم السطر والـ at-rule اللي حواليه ويخرج بـ 1. جرّبه على الملف البايظ والسليم.`, done: R`على البايظ بيطبع حاجة زي [[line 2: @utility inside @supports]] ويخرج 1، وعلى السليم ميطبعش حاجة ويخرج 0 (زي فحص الـ ci في الدرس).`, sol: R`~~~js check-utility.mjs
import { readFileSync } from "node:fs";

const file = process.argv[2];
const lines = readFileSync(file, "utf8").split("\n");
const stack = [];   // الـ at-rules اللي احنا جواها دلوقتي
let bad = 0;

lines.forEach((line, i) => {
  const text = line.replace(/\/\*.*?\*\//g, "");
  const util = text.match(/@utility\b/);
  if (util && stack.length) {
    const around = stack.findLast((s) => s.startsWith("@")) ?? stack.at(-1);
    console.log($__btline $__{i + 1}: @utility inside $__{around}$__bt);
    bad++;
  }
  for (const m of text.matchAll(/[^{}]*[{}]/g)) {
    if (m[0].endsWith("{")) stack.push(m[0].slice(0, -1).trim().split(/[\s(]/)[0] || "{");
    else stack.pop();
  }
});

process.exit(bad ? 1 : 0);
~~~

~~~css bad.css
@import "tailwindcss";
@supports (backdrop-filter: blur(4px)) {
  @utility glass { backdrop-filter: blur(12px); }
}
~~~

~~~css good.css
@import "tailwindcss";
@utility glass {
  @supports (backdrop-filter: blur(4px)) { backdrop-filter: blur(12px); }
}
~~~

~~~bash
node check-utility.mjs bad.css;  echo "exit: $?"
node check-utility.mjs good.css; echo "exit: $?"
~~~

**ليه stack مش عدّاد:** العمق لوحده بيقولك إنك جوه حاجة، و stack بيقولك جوه إيه، فالرسالة تبقى [[@utility inside @supports]].

لكل سطر: بنشوف الأول فيه [[@utility]] والـ stack مش فاضي ولا لأ، وبعدين نمشي على الأقواس. [[text.matchAll]] بياخد كل حتة بتنتهي بـ [[{]] أو [[}]]، فسطر فيه قوسين بيتحسب صح زي [[a { b { c } }]].

[[.replace]] اللي في الأول بيشيل التعليقات، عشان قوس جوه تعليق ميلخبطش العد.

**الغلطة الشائعة:** تعدّ الأقواس بعد فحص [[@utility]]. في [[@utility glass {]] نفس السطر فيه القوس، فلو عدّيته الأول هتشوف العمق 1 وتطلّع خطأ على ملف سليم.

~~~text الناتج
$ node check-utility.mjs bad.css
line 3: @utility inside @supports
exit: 1

$ node check-utility.mjs good.css
exit: 0
~~~` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** [[<div class="grid grid-cols-[240px 1fr]">]] والـ div طالع عمود واحد بعرض الصفحة كلها. ابني واعمل grep على [[out.css]] بـ [[grid-cols-]].`, done: R`مفيش أي قاعدة لـ [[grid-cols-[240px]]: المسافة قسمت الكلاس لاتنين ([[grid-cols-[240px]] و [[1fr]]])، والاتنين مش كلاسات صح. بعد [[grid-cols-[240px_1fr]]] القاعدة اتولّدت و [[gridTemplateColumns]] بقت [[240px 1040px]] على 1280.`, sol: R`الكود المصلّح:

~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>اعمدة</title><link rel="stylesheet" href="out.css"></head>
<body class="m-0">
<div id="g" class="grid grid-cols-[240px_1fr]"><aside>جنب</aside><main>النص</main></div>
</body>
</html>
~~~

~~~bash
npx @tailwindcss/cli -i in.css -o out.css
grep -o "grid-cols-[^ {]*" out.css
~~~

**ليه:** الـ HTML بيقسم [[class]] عند المسافات، و Tailwind كمان. فـ [[grid-cols-[240px 1fr]]] مش كلاس واحد، ده كلمتين: [[grid-cols-[240px]] و [[1fr]]]، والاتنين مش كلاسات معروفة. وعشان كده في قيم arbitrary بتكتب [[_]] مكان المسافة، و Tailwind بيرجّعها مسافة في الـ CSS.

**الغلطة الشائعة:** تستنى error من الـ build. مفيش، الكلمات اللي مش فاهمها بيتجاهلها في سكوت. grep على الناتج هو اللي بيكشف.

~~~text الناتج
قبل:  grep مبيطلّعش أي grid-cols
      gridTemplateColumns = 1280px (عمود واحد)
بعد:  grid-cols-\[240px_1fr\]
      gridTemplateColumns = 240px 1040px على 1280
~~~` },
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
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** شبكة ٦ كروت «مشاكل وحلول»، كل كارت جواه دايرة زينة [[group-hover:scale-150]]، ومفيش حاجة بتتحرك أبدًا. الـ CSS اتولّد (grep بيلاقي [[group-hover\:scale-150]]). لاقي الناقص.`, done: R`الكارت ناقصه كلاس [[group]]، والقاعدة اللي اتولّدت [[:where(.group):hover .group-hover\:scale-150]] مستنية جد اسمه group. بعد ما زوّدته على الـ article الدايرة بتكبر.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>group</title><link rel="stylesheet" href="out.css"></head>
<body class="p-6">
<main class="grid gap-4 sm:grid-cols-3">
  <article id="card" class="group relative overflow-hidden rounded-xl border border-gray-300 p-6">
    <span id="dot" aria-hidden="true" class="absolute -end-4 -top-4 size-16 rounded-full bg-teal-200 transition-transform group-hover:scale-150"></span>
    <h2 class="relative font-bold">المشكلة</h2>
    <p class="relative mt-2 text-gray-600">العملا مش لاقيين المنتج.</p>
  </article>
</main>
</body>
</html>
~~~

الناقص كلمة واحدة: [[group]] على الـ [[<article>]].

**ليه:** [[group-hover:scale-150]] مش معناها «لما تقف على العنصر ده»، معناها «لما تقف على أب اسمه group». القاعدة اللي اتولّدت بتقول [[:where(.group):hover .group-hover\:scale-150]]، يعني الـ selector محتاج جد عليه كلاس [[group]].

عشان كده grep لاقى الكلاس، والـ CSS سليم، ومفيش error، والحركة مبتحصلش.

**الغلطة الشائعة:** تدوّر في ملف الـ CSS أو تعيد الـ build. الـ CSS مولود سليم، الناقص في الـ HTML.

~~~text الناتج
عرض الدايرة وقوف عادي:            64px
hover على الكارت (فيه group):      96px
hover من غير كلاس group:           64px (متغيرتش)
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** حقل بـ floating label: [[<input placeholder=" " class="peer">]] وبعده [[<label>]] بيتحرك فوق بـ [[peer-focus:]] و [[peer-not-placeholder-shown:]].`, done: R`الـ label جوه الحقل وهو فاضي، وبيطلع فوق لما تدوس أو تكتب، وبيفضل فوق لو فيه كلام وخرجت، و Tab بيعمل نفس الحركة، ومفيش JavaScript.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>floating label</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-8">
<main class="max-w-sm">
  <h1 class="mb-6 text-2xl font-bold">تسجيل</h1>
  <div class="relative">
    <input id="email" type="email" placeholder=" "
           class="peer w-full rounded-lg border border-gray-400 px-3 pt-6 pb-2 focus:border-teal-700 focus:outline-2 focus:outline-teal-700">
    <label for="email"
           class="pointer-events-none absolute start-3 top-4 text-gray-600 transition-all peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-teal-700 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs">الإيميل</label>
  </div>
  <a href="#next" class="mt-4 inline-block py-2">الخطوة الجاية</a>
</main>
</body>
</html>
~~~

**ليه شغال:**

- [[placeholder=" "]] مسافة واحدة، مش فاضي. ده بيدّينا [[:placeholder-shown]] كحالة «الحقل فاضي». من غيره الـ selector مش هيشتغل خالص.
- [[peer]] على الـ input، والـ label بعده في الـ HTML، فالـ label يقدر يقرا حالته.
- [[peer-focus:]] لما الحقل عليه focus، و [[peer-not-placeholder-shown:]] لما فيه كلام. الاتنين بيرفعوا الـ label، فبيفضل فوق لو كتبت وخرجت.
- [[pointer-events-none]]: الضغط على الـ label يعدّي للحقل.

الـ [[<label for="email">]] حقيقي، فالاسم وصل لقارئ الشاشة، مش placeholder.

**الغلطة الشائعة:** تحط الـ label قبل الـ input عشان ده ترتيب القراية. [[peer-*]] مبتشوفش غير اللي بعدها.

~~~text الناتج
                       top     font-size
فاضي من غير focus      16px    16px
Tab (focus)            6px     12px
كتبت وعملت Tab برا     6px     12px
مسحت الكلام وخرجت      16px    16px

عدد الـ scripts: 0
على 360: scrollWidth = clientWidth ، axe صفر
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[<span class="peer-invalid:visible invisible">خطأ</span><input class="peer" required>]] (الرسالة **قبل** الحقل). هتظهر؟ ليه؟`, done: R`مش هتظهر أبدًا: [[peer-*]] بيتحول لـ [[~]] في CSS، والـ [[~]] بيختار الإخوات اللي **بعد** العنصر بس. بعد ما نقلت الرسالة بعد الـ input اشتغلت.`, sol: R`~~~html test.html
<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>peer</title><link rel="stylesheet" href="out.css"></head>
<body class="p-8">
<main>
<div>
  <span id="before" class="peer-invalid:visible invisible">خطأ</span>
  <input class="peer border" required aria-label="قبل">
</div>
<div>
  <input class="peer border" required aria-label="بعد">
  <span id="after" class="peer-invalid:visible invisible">خطأ</span>
</div>
</main>
</body>
</html>
~~~

**الإجابة:** مش هتظهر أبدًا لو الرسالة قبل الحقل.

**ليه:** [[peer-invalid:visible]] بيتحول لـ selector فيه [[~]]، يعني «عنصر [[.peer]] غير صالح وبعده الأخ ده». و [[~]] في CSS بيمشي لقدام بس، مفيش طريقة يرجع بيها لأخ قبله.

الصفحة فيها الحالتين، والحقلين فاضيين و [[required]]، يعني الاتنين [[:invalid]] من الأول.

**وملحوظة:** الرسالة هنا بتبان من أول ما الصفحة تفتح لأن الحقل الفاضي invalid. في الشغل الحقيقي استخدم [[user-invalid:]] عشان تظهر بعد ما المستخدم يتعامل مع الحقل.

**الغلطة الشائعة:** تزوّد [[peer]] تاني أو تغيّر اسمه. المشكلة في الترتيب مش في الاسم. ولو لازم الرسالة تبان فوق الحقل، خليها بعده في الـ HTML وارفعها بـ [[order]] أو grid، أو استخدم [[:has()]] على الأب.

~~~text الناتج
الرسالة قبل الحقل:  visibility = hidden
الرسالة بعد الحقل:  visibility = visible
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** section عليه [[group/section]] وجواه كروت عليها [[group/card]]: لما تقف على الـ section الكروت كلها تفتح شوية، ولما تقف على كارت عنوانه هو بس يتلوّن، بـ [[group-hover/section:]] و [[group-hover/card:]].`, done: R`الحالتين شغالين مع بعض من غير تداخل، و grep على [[out.css]] بيلاقي [[.group\/card]] و [[.group\/section]] في الـ selectors.`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مجموعات متداخلة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main>
  <h1 class="text-2xl font-bold">خدماتنا</h1>
  <section id="sec" class="group/section mt-4 grid gap-4 rounded-2xl bg-gray-100 p-4 sm:grid-cols-2">
    <article id="c1" class="group/card rounded-xl bg-white p-4 transition-transform group-hover/section:-translate-y-1">
      <h2 class="font-bold transition-colors group-hover/card:text-teal-700">التصميم</h2>
      <p>من الفكرة للشكل.</p>
    </article>
    <article id="c2" class="group/card rounded-xl bg-white p-4 transition-transform group-hover/section:-translate-y-1">
      <h2 class="font-bold transition-colors group-hover/card:text-teal-700">البرمجة</h2>
      <p>من الشكل للتشغيل.</p>
    </article>
  </section>
</main>
</body>
</html>
~~~

**ليه الأسماء:** لو الاتنين [[group]] من غير اسم، [[group-hover:]] هيتفعّل لما تقف على أي جد عليه group. فالكارت كله هيتلوّن مع الـ section. [[group/card]] و [[group/section]] بيدّوا كل مستوى اسم، و [[group-hover/card:]] بيبص على المستوى ده بس.

- [[group-hover/section:-translate-y-1]] على الكارت: لما الماوس يدخل الـ section، الكروت كلها تطلع 4px.
- [[group-hover/card:text-teal-700]] على العنوان: عنوان الكارت اللي تحت الماوس بس يتلوّن.

**الغلطة الشائعة:** تستخدم [[group]] واحد وتتوقع إن الأقرب هو اللي يتحسب. CSS مبيعرفش «الأقرب»، أي جد مطابق كفاية.

~~~text الناتج
الماوس برا:          translate none ، none       عناوين rgb(0, 0, 0)
على الـ section:     translate 0px -4px للاتنين   عناوين rgb(0, 0, 0)
على الكارت الأول:    translate 0px -4px للاتنين
                     عنوان الأول oklch(0.511 ...) ، التاني rgb(0, 0, 0)

grep: .group\/card و .group\/section موجودين
axe صفر ، مفيش scroll أفقي
~~~` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اختيار باقة بـ radio cards: مرة بـ [[peer-checked:]] (الـ input قبل الكارت) ومرة بـ [[has-checked:]] على الـ label نفسه (الـ input جواه). أنهي واحدة بتشتغل لو الـ input في آخر الكارت؟`, done: R`[[has-checked:]] شغالة في أي مكان جوه الـ label لأنها [[:has(:checked)]]، و [[peer-checked:]] شغالة بس على اللي بعد الـ input. وكتبت إن [[:has()]] مدعومة في المتصفحات الحديثة كلها (Baseline 2023، من MDN).`, sol: R`~~~html index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>اختيار باقة</title>
<link rel="stylesheet" href="out.css">
</head>
<body class="p-6">
<main class="mx-auto grid max-w-md gap-6">
  <h1 class="text-2xl font-bold">اختار باقتك</h1>

  <!-- ١) peer-checked: الـ input قبل الكارت، والكارت أخوه -->
  <div>
    <input id="p1" class="peer sr-only" type="radio" name="a">
    <label for="p1" class="block rounded-xl border-2 border-gray-300 p-4 peer-checked:border-teal-700">peer: الـ input الأول</label>
  </div>

  <!-- ٢) peer-checked: الـ input في آخر الكارت، والكلام قبله -->
  <label class="block rounded-xl border-2 border-gray-300 p-4">
    <span id="p2t" class="peer-checked:text-teal-700">peer: الـ input الأخير</span>
    <input id="p2" class="peer" type="radio" name="a">
  </label>

  <!-- ٣) has-checked: الـ input في أي مكان جوه الـ label -->
  <label id="h1l" class="block rounded-xl border-2 border-gray-300 p-4 has-checked:border-teal-700">
    has: الـ input الأخير
    <input id="h1" type="radio" name="a">
  </label>
</main>
</body>
</html>
~~~

**الإجابة:** [[has-checked:]] بتشتغل والـ input في أي مكان، و [[peer-checked:]] لأ.

- [[peer-checked:]] بتتحول لـ [[~]]، فمحتاجة الـ input **قبل** العنصر، وكإخوات.
- [[has-checked:]] بتتحول لـ [[:has(:checked)]] على الـ label نفسه، فبتسأل «جوايا input متعلّم؟» من غير ما يهم مكانه.

وعشان كده [[has-checked:]] بتبسّط الـ HTML: مفيش [[sr-only]] ولا [[id]] ولا [[for]]، الـ input جوه الـ label خلاص.

و [[:has()]] من MDN: Baseline 2023، يعني في كل المتصفحات الحديثة. (دي معلومة من الوثائق، والتجربة هنا في Chrome بس.)

**الغلطة الشائعة:** تحط [[peer]] و [[peer-checked:]] والـ input في آخر الكارت، فالكود يبان سليم والشكل مبيتغيرش.

~~~text الناتج
                         لون الحد أو الكلام بعد الاختيار
peer والـ input الأول    اتغيّر للتيل oklch(0.511 ...)
peer والـ input الأخير   فضل rgb(0, 0, 0)  (مبيشتغلش)
has والـ input الأخير    اتغيّر للتيل oklch(0.511 ...)
axe صفر
~~~` },
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

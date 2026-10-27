// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "Nuxt",
      l: 3,
      n: "Vue على السيرفر: صفحات من الملفات، و API في نفس المشروع، و SSR أو static أو SPA لكل صفحة",
      items: [
        {
          cmd: "Nuxt",
          title: "Nuxt يعني إيه، وتعمل مشروع وتشغّله وتعمله build",
          desc: R`Nuxt (النسخة 4.6 في أكتوبر ٢٠٢٦) framework فوق Vue زي Next.js فوق React: الصفحات بتترسم على السيرفر (SSR) فالـ HTML بيوصل جاهز للمتصفح ولجوجل، والـ routing من أسامي الملفات، وفيه سيرفر API في نفس المشروع (Nitro)، و auto-imports (مش محتاج تكتب [[import { ref } from 'vue']]).

بتعمل المشروع بـ [[npm create nuxt@latest]]، وبتشغّله بـ [[npm run dev]]، والـ build بيطلع فولدر [[.output]] فيه سيرفر Node كامل بتشغّله بـ [[node .output/server/index.mjs]].`,
          example: R`npm create nuxt@latest shop -- --template minimal --packageManager npm --no-gitInit --modules=
cd shop
npm install
npm run dev
npm run build
node .output/server/index.mjs`,
          try: R`اعمل المشروع وافتح [[localhost:3000]]. بعدين اعمل [[app/pages/index.vue]] فيه [[<h1>]] بس، وغيّر [[app/app.vue]] لـ [[<NuxtPage />]]. اعمل [[npm run build]] وشغّل الـ output، وبعدين [[curl localhost:3000]]: الـ [[<h1>]] موجود في الـ HTML اللي رجع من السيرفر؟`,
          deep: {
            why: R`SPA عادية (Vite + Vue) بتبعت [[<div id="app"></div>]] فاضي، والـ JS هو اللي بيرسم. فجوجل وواتساب وتويتر (لما بيعملوا preview للينك) بيشوفوا صفحة فاضية، والمستخدم على موبايل بطيء بيستنى الـ JS ينزل ويشتغل. Nuxt بيرسم الصفحة على السيرفر ويبعتها HTML جاهز، وبعدين Vue «بيصحى» عليها في المتصفح (hydration). ومعاه routing و API و SEO جاهزين بدل ما تجمّعهم.`,
            how: R`Nuxt 4 بيحط كود الـ app في [[app/]]: [[app.vue]] (الأساس)، و [[pages/]] (كل ملف route)، و [[layouts/]]، و [[components/]] و [[composables/]] (بيتعملهم import لوحدهم). وكود السيرفر في [[server/]]: [[server/api/]] (endpoints) و [[server/utils/]] (بيتعملها import لوحدها في السيرفر).

[[npm run dev]] بيشغّل Vite للمتصفح و Nitro للسيرفر مع بعض. و [[npm run build]] بيعمل bundle للمتصفح في [[.output/public]]، و bundle للسيرفر في [[.output/server]] جواه الـ [[node_modules]] اللي محتاجها بس، فالفولدر ده لوحده يتنقل لأي سيرفر من غير [[npm install]]. والـ preset ([[node-server]] افتراضي) بيحدد شكل الـ output: فيه presets لـ Vercel و Netlify و Cloudflare وغيرهم.`,
            when: R`موقع محتاج SEO (متجر، مدونة، موقع شركة)، أو أول تحميل سريع، أو عايز الباك إند الصغير في نفس المشروع. للوحة تحكم ورا login بس، SPA عادية (create-vue) أبسط. وفي مصر Nuxt أقل من Next.js في الإعلانات، بس شركات كتير بتستخدم Vue بتستخدمه للـ public site.`,
            mistakes: R`تستخدم [[window]] أو [[localStorage]] في [[<script setup>]] مباشرة: الكود ده بيشتغل على السيرفر الأول ومفيش [[window]] هناك (حطه في [[onMounted]]). وتخلط بين [[.nuxt]] (ملفات مولّدة للتطوير، متتعدلش) و [[.output]] (الـ build). وترفع [[.output]] من غير ما تشغّل بـ Node 20 أو أحدث. وتتبع tutorial بتاع Nuxt 2 ([[asyncData]] و [[this.$axios]])، ده كود مختلف خالص.`
          },
          teach: R`## الفكرة: نفس Vue، بس فيه سيرفر بيرسم الصفحة الأول

كل الناتج حقيقي من ويندوز 11 على Node 24.22، و create-nuxt 4.0.1، و Nuxt 4.6.3.

---

## ١. [[npm create nuxt@latest shop -- ...]]

| الحتة | معناها |
|---|---|
| [[npm create nuxt@latest]] | بيشغّل [[create-nuxt]] |
| [[--template minimal]] | أصغر template (من غير أمثلة) |
| [[--packageManager npm]] | متسألنيش أنهي package manager |
| [[--no-gitInit]] | متعملش git repo |
| [[--modules=]] | من غير modules إضافية (فاضي)، فمش هيسأل |

~~~text الناتج
┌  Welcome to Nuxt!
◇ Creating project in shop
● Downloading minimal template...
◆ Downloaded minimal template
● Installing dependencies with npm...
● $__btnpm i$__bt has produced no output for 30s and may be stuck...
■ $__btnpm i$__bt failed with exit code 143.
▲ Created your project from the minimal template, but its dependencies are not installed.
~~~

عندنا الـ install اتقطع: create-nuxt بيوقف [[npm i]] لو فضل ٣٠ ثانية من غير ما يطبع حاجة (143 = اتقفل بـ SIGTERM). المشروع نفسه اتعمل، فعملنا [[npm install]] بإيدنا (السطر التالت في المثال). لو النت عندك سريع ممكن ميحصلش، والسطر ده مش هيضر.

### الملفات

~~~text الشجرة
app/app.vue          <NuxtRouteAnnouncer /> و <NuxtWelcome />
nuxt.config.ts       defineNuxtConfig({ compatibilityDate, devtools })
public/favicon.ico
public/robots.txt
package.json         nuxt و vue و vue-router بس
tsconfig.json
~~~

و [[package.json]] فيه [[nuxt ^4.6.2]] و [[vue ^3.5.44]] و [[vue-router ^5.4.0]]، و scripts: [[dev]] و [[build]] و [[generate]] و [[preview]] و [[postinstall: nuxt prepare]] (بيولّد الأنواع في [[.nuxt/]]).

---

## ٢. [[npm run dev]]

~~~text الناتج
• Nuxt 4.6.3 (with Nitro 2.13.5, Vite 8.3.5 and Vue 3.5.44)
  ➜ Local:    http://localhost:3000/
• Setting up modules
  ➜ DevTools: press Shift + Alt + D in the browser (v3.4.4)
√ Vite client built in 72ms
√ Vite server built in 62ms
[nitro] √ Nuxt Nitro server built in 2611ms
* Ready in 5.63s
~~~

- **Vite client** و **Vite server**: Nuxt بيعمل build مرتين، مرة للمتصفح ومرة للسيرفر (الـ SSR).
- **Nitro**: السيرفر اللي بيرسم الصفحات ويشغّل [[server/api]].
- أبطأ من Vite عادي (٥ ثواني بدل أقل من ثانية) لأنه بيجهّز السيرفر والأنواع.

---

## ٣. [[npm run build]]

~~~text الناتج (مختصر)
✔ Server built in 463ms
[nitro] ℹ Prerendering 1 routes
[nitro]   ├─ / (99ms)
[nitro] ℹ Building Nuxt Nitro server (preset: node-server, compatibility date: 2025-07-15)
  ├─ .output/server/chunks/routes/api/products/_id_.get.mjs (743 B)
  ├─ .output/server/chunks/routes/renderer.mjs (28 kB)
  ├─ .output/server/index.mjs (1.8 kB)
  └─ .output/server/package.json (797 B)
Σ Total size: 2.16 MB (550 kB gzip)
[nitro] ✔ You can preview this build using node .output/server/index.mjs
◆ ✨ Build complete in 12.6s!
~~~

(ده الـ build بعد ما زوّدنا صفحات و API و routeRules في الدروس الجاية.)

- **preset: node-server**: الـ output سيرفر Node.
- **Prerendering**: الصفحات اللي قلنا عليها [[prerender]] اتعملت HTML جاهز (درس [[SSR و SPA و static]]).
- **2.16 MB**: [[.output]] كله، وفيه [[node_modules]] صغيرة جوه [[server/]] بالحاجات اللي السيرفر محتاجها بس.

---

## ٤. [[node .output/server/index.mjs]]

~~~text الناتج
Listening on http://[::]:3000
~~~

([[[::]]] = كل الـ interfaces، IPv4 و IPv6.) البورت من متغير البيئة [[PORT]]: شغّلناه في PowerShell بـ [[$env:PORT = "5964"]] قبل الأمر، وفي bash بتكتب [[PORT=5964 node .output/server/index.mjs]] (وده اللي الـ Dockerfile في درس [[deploy]] بيعمله بـ [[ENV]] على لينكس). ولما طلبنا صفحة بـ curl، الـ HTML رجع وفيه المحتوى:

~~~text الناتج (مختصر)
<!DOCTYPE html><html lang="ar" dir="rtl"><head>...<title>ماوس</title>...
<div id="__nuxt">...<main><article><h1>ماوس</h1><p>350 EGP</p></article></main>...
~~~

ده الفرق عن SPA عادية: [[<h1>ماوس</h1>]] موجود في الرد نفسه، قبل أي JS.

---

## الخلاصة

| الأمر | النتيجة |
|---|---|
| [[npm create nuxt@latest]] | مشروع، و [[app/]] فيه الكود |
| [[npm run dev]] | Vite للمتصفح والسيرفر + Nitro |
| [[npm run build]] | [[.output/]] (public + server) |
| [[node .output/server/index.mjs]] | السيرفر في الإنتاج، و [[PORT]] للبورت |
| [[npm run generate]] | موقع static (درس [[SSR و SPA و static]]) |`,
          lines: [
            "اعمل مشروع Nuxt بأصغر template ومن غير أسئلة.",
            "ادخل الفولدر.",
            R`نزّل الباكدجات (لو [[create-nuxt]] منزّلهاش).`,
            R`سيرفر التطوير على [[localhost:3000]].`,
            R`build للإنتاج في [[.output/]].`,
            "شغّل سيرفر الإنتاج."
          ],
          sol: R`[[curl localhost:3000]] بيرجّع HTML فيه [[<h1>...</h1>]] بتاعك جوه [[<div id="__nuxt">]]. قارنه بـ [[dist/index.html]] في مشروع create-vue: هناك [[<div id="app"></div>]] فاضي. ده الـ SSR: الصفحة اترسمت على السيرفر.`
        },
        {
          cmd: "pages و layouts",
          title: "الصفحات من أسامي الملفات، و layout مشترك، و NuxtLink",
          desc: R`في Nuxt مفيش ملف routes: كل ملف في [[app/pages/]] صفحة، والمسار من اسمه. [[pages/index.vue]] = [[/]]، و [[pages/products/index.vue]] = [[/products]]، و [[pages/products/[id].vue]] = [[/products/:id]] (القوسين [[[ ]]] = param).

[[app/layouts/default.vue]] بيلف كل الصفحات (header و footer)، والصفحة بتتحط مكان [[<slot />]]. و [[<NuxtLink>]] بدل [[<RouterLink>]]، وبيعمل prefetch للصفحة لما الرابط يظهر.`,
          example: R`// app/app.vue
<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

// app/layouts/default.vue
<template>
  <div>
    <header>
      <NuxtLink to="/">الرئيسية</NuxtLink> |
      <NuxtLink to="/products">المنتجات</NuxtLink>
    </header>
    <main><slot /></main>
  </div>
</template>

// app/pages/index.vue
<template>
  <h1>أهلا في المحل</h1>
</template>

// app/pages/admin/index.vue
<script setup lang="ts">
const width = ref(0)
onMounted(() => (width.value = window.innerWidth))
</script>

<template>
  <h1>لوحة التحكم</h1>
  <p>عرض الشاشة {{ width }}</p>
</template>`,
          try: R`اعمل الملفات دي، وزوّد [[pages/about.vue]]. افتح [[/about]] من غير ما تكتب أي route. بعدين اعمل [[layouts/plain.vue]] من غير header، واستخدمه في about بـ [[definePageMeta({ layout: 'plain' })]].`,
          flag: "script",
          deep: {
            why: R`في مشروع فيه ٤٠ صفحة، ملف routes بيكبر وبيتلخبط ولازم تفتكر تحدّثه. هنا شكل الفولدرات هو الـ routes: تشوف [[pages/]] تعرف كل الصفحات. ونفس فكرة Next.js App Router و SvelteKit.`,
            how: R`Nuxt بيقرا [[pages/]] ويعمل routes لـ Vue Router: [[index.vue]] = المسار نفسه، و [[[id].vue]] = [[:id]]، والاسم بين قوسين مربعين مزدوجين (اتنين من كل ناحية) param اختياري، و [[[...slug].vue]] = catch-all. و [[<NuxtPage />]] هو [[<RouterView />]] بتاع Nuxt. والـ layout الافتراضي [[default]]، وأي صفحة تختار غيره بـ [[definePageMeta({ layout: 'admin' })]]، وفيه كمان [[middleware]] في [[definePageMeta]] (زي guards).

الـ auto-imports: [[ref]] و [[onMounted]] و [[useRoute]] و [[useFetch]] وأي حاجة في [[composables/]] و [[components/]] و [[utils/]] بتتعملها import لوحدها (Nuxt بيكتب أنواعها في [[.nuxt/]] فالـ editor بيعرفها). عشان كده [[admin/index.vue]] مفيهوش ولا [[import]].

[[<NuxtLink>]] بيعمل prefetch للـ JS والبيانات بتاعة الصفحة لما الرابط يظهر في الشاشة، فلما تضغط الصفحة تفتح فورًا. و [[<NuxtRouteAnnouncer>]] بيقول للـ screen reader إن الصفحة اتغيرت (a11y).`,
            when: R`دايمًا في Nuxt. ولو صفحة محتاجة layout مختلف (login من غير header، أو admin بـ sidebar)، اعمل layout تاني. وللمكونات اللي في كل الصفحات (header)، حطها في الـ layout مش في كل صفحة.`,
            mistakes: R`تسمّي الملف [[product-:id.vue]] أو [[_id.vue]] (Nuxt 2): الصح [[[id].vue]]. وتنسى [[<NuxtPage />]] في [[app.vue]] فمفيش صفحة بتظهر. وتستخدم [[window]] في [[<script setup>]] برا [[onMounted]] (الصفحة بتترسم على السيرفر الأول). وتحط layout فيه أكتر من root element مع transitions.`
          },
          teach: R`## الفكرة: الفولدرات هي الـ routes

شغّلنا المشروع ده بـ [[npm run dev]] (Nuxt 4.6.3) وطلبنا الصفحات بـ curl وبـ Chrome headless.

---

## ١. [[app.vue]]

| العنصر | شغلته |
|---|---|
| [[<NuxtRouteAnnouncer />]] | بيعلن للـ screen reader عن الصفحة الجديدة |
| [[<NuxtLayout>]] | الـ layout (default لو الصفحة مقالتش غيره) |
| [[<NuxtPage />]] | الصفحة الحالية |

---

## ٢. الصفحات والمسارات

~~~text app/pages
pages/index.vue            →  /
pages/products/index.vue   →  /products
pages/products/[id].vue    →  /products/:id
pages/admin/index.vue      →  /admin
~~~

([[products/index.vue]] و [[[id].vue]] هنشوفهم في الدرس الجاي.)

---

## ٣. الـ layout

[[<slot />]] جوه [[<main>]]: الصفحة بتتحط هنا، و الـ header ثابت في كل الصفحات. ولما فتحنا [[/products]] في الـ dev:

~~~text الناتج (curl، مختصر)
<header>
  <a href="/" class="">الرئيسية</a> |
  <a aria-current="page" href="/products" class="router-link-active router-link-exact-active">المنتجات</a>
</header>
~~~

[[NuxtLink]] بقى [[<a href>]] عادي في الـ HTML (فجوجل بيتبعه)، وعلى الصفحة الحالية [[aria-current="page"]] والكلاسات بتاعة Vue Router.

---

## ٤. [[admin/index.vue]] من غير imports

[[ref]] و [[onMounted]] متعملهمش import: Nuxt بيعملهم auto-import. و [[window.innerWidth]] جوه [[onMounted]] لأن [[onMounted]] مش بيشتغل على السيرفر. في Chrome:

~~~text الناتج
admin: الرئيسية | المنتجاتلوحة التحكمعرض الشاشة 1280
~~~

(الصفحة دي عليها [[ssr: false]] في [[nuxt.config]]، فبتترسم في المتصفح بس. التفاصيل في درس [[SSR و SPA و static]].)

---

## ٥. الـ prefetch

لما فتحنا [[/products]] في Chrome، من غير ما نضغط أي حاجة، المتصفح طلب:

~~~text الناتج (الطلبات)
GET /_payload.json
GET /products/1/_payload.json
GET /products/2/_payload.json
GET /products/3/_payload.json
~~~

[[NuxtLink]] شاف الروابط ظاهرة، فجاب بيانات الصفحات دي مقدّمًا. لما تضغط، الصفحة بتفتح من غير استنى.

---

## الخلاصة

| الملف | المسار |
|---|---|
| [[pages/index.vue]] | [[/]] |
| [[pages/a/index.vue]] | [[/a]] |
| [[pages/a/[id].vue]] | [[/a/:id]] |
| [[pages/[...slug].vue]] | أي حاجة (404 مثلًا) |
| [[layouts/default.vue]] + [[<slot />]] | يلف كل الصفحات |
| [[definePageMeta({ layout: 'x' })]] | layout تاني لصفحة |
| [[<NuxtLink to>]] | رابط + prefetch |`,
          lines: [
            "الأساس.",
            "بيعلن عن تغيير الصفحة للـ screen reader.",
            "الـ layout...",
            "وجواه الصفحة الحالية.",
            R`قفلة [[NuxtLayout]].`,
            "قفلة الـ template.",
            "الـ layout الافتراضي.",
            "عنصر واحد بيلف كله.",
            "الهيدر.",
            "رابط للرئيسية.",
            "رابط للمنتجات.",
            "قفلة الهيدر.",
            "الصفحة بتتحط هنا.",
            "قفلة الـ div.",
            "قفلة الـ template.",
            R`صفحة [[/]].`,
            "عنوان.",
            "قفلة الـ template.",
            R`صفحة [[/admin]]: script من غير imports.`,
            R`[[ref]] متاح لوحده.`,
            R`[[window]] جوه [[onMounted]] بس.`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "عنوان.",
            "العرض.",
            "قفلة الـ template."
          ],
          sol: R`[[/about]] بيفتح لوحده بمجرد ما الملف اتعمل، ومعاه الـ header من [[default]]. ومع [[definePageMeta({ layout: 'plain' })]] الـ header بيختفي في about بس. جربناها: الـ HTML بتاع [[/about]] طلع [[<main><h1>عن المحل</h1></main>]] من غير [[<header>]]، و [[/]] لسه فيها الـ header:`,
          solCode: R`// app/layouts/plain.vue
<template>
  <main><slot /></main>
</template>

// app/pages/about.vue
<script setup lang="ts">
definePageMeta({ layout: 'plain' })
</script>

<template>
  <h1>عن المحل</h1>
</template>`
        },
        {
          cmd: "useFetch",
          title: "API في نفس المشروع (server/api) وتجيب منها بـ useFetch",
          desc: R`أي ملف في [[server/api/]] بيبقى endpoint: [[server/api/products/index.get.ts]] = [[GET /api/products]]، وبيرجّع [[defineEventHandler]]. والصفحة بتجيب منه بـ [[await useFetch('/api/products')]].

[[useFetch]] بيجيب البيانات **على السيرفر** وقت الـ SSR، ويحطها في الـ HTML، فالمتصفح مش بيعمل الطلب تاني وقت الـ hydration. وبيرجّع [[data]] و [[status]] و [[error]] و [[refresh]]، ولو اديته ref في [[query]] بيعيد الطلب لما يتغير.`,
          example: R`// server/utils/db.ts
export const products = [
  { id: 1, name: 'كيبورد', price: 900 },
  { id: 2, name: 'ماوس', price: 350 },
  { id: 3, name: 'شاشة', price: 4200 },
]

// server/api/products/index.get.ts
export default defineEventHandler((event) => {
  const { q = '' } = getQuery(event)
  return products.filter((p) => p.name.includes(String(q)))
})

// server/api/products/[id].get.ts
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  const product = products.find((p) => p.id === id)
  if (!product) throw createError({ statusCode: 404, message: 'Product not found' })
  return product
})

// app/pages/products/index.vue
<script setup lang="ts">
const q = ref('')
const { data: products, status, error } = await useFetch('/api/products', {
  query: { q },
})
</script>

<template>
  <input v-model="q" placeholder="دوّر" />
  <p v-if="status === 'pending'">بيحمّل...</p>
  <p v-else-if="error">{{ error.message }}</p>
  <ul v-else>
    <li v-for="p in products" :key="p.id">
      <NuxtLink :to="$__bt/products/$__{p.id}$__bt">{{ p.name }}</NuxtLink>
    </li>
  </ul>
</template>`,
          try: R`[[curl localhost:3000/api/products?q=ما]] وبعدين [[curl -i localhost:3000/api/products/9]]. افتح [[/products]] و DevTools ← Network: فيه طلب لـ [[/api/products]] وقت الفتح؟ اكتب في البحث: فيه دلوقتي؟ وبص على [[view-source:]] للصفحة ودوّر على [[__NUXT_DATA__]].`,
          flag: "script",
          deep: {
            why: R`لو جبت البيانات بـ [[fetch]] في [[onMounted]]، الصفحة هتترسم على السيرفر فاضية (onMounted مش بيشتغل هناك)، وجوجل يشوف «بيحمّل». ولو جبتها بـ [[fetch]] في [[setup]]، هتتجاب مرتين: مرة على السيرفر ومرة في المتصفح. [[useFetch]] بيجيبها مرة على السيرفر ويبعتها مع الصفحة. و [[server/api]] بيوفّر عليك باك إند منفصل للحاجات البسيطة (أو proxy للـ API الحقيقية عشان تخبّي الـ keys).`,
            how: R`[[useFetch(url, opts)]] = [[useAsyncData]] + [[$fetch]]. [[$fetch]] (من مكتبة ofetch) على السيرفر بينادي الـ handler مباشرة من غير HTTP لو الـ URL داخلي، وفي المتصفح بيعمل request عادي. النتيجة بتتخزن تحت key، وبتتسلسل في [[<script id="__NUXT_DATA__">]] (payload) في آخر الـ HTML، ولما Vue يعمل hydration بياخدها من هناك.

[[query: { q }]] بـ ref: [[useFetch]] بيراقبه ويعيد الطلب. وأنواع الرد بتطلع من الـ handler لوحدها: [[products]] نوعه [[{ id: number; name: string; price: number }[]]] من غير ما تكتبه. والـ handler: [[getQuery(event)]] للـ query، و [[getRouterParam]] للـ param من اسم الملف ([[[id]]])، و [[readBody]] للـ POST، و [[createError]] بيرجّع status و JSON. واسم الملف [[.get.ts]] أو [[.post.ts]] بيحدد الـ method.

و [[server/utils/]] بيتعمله auto-import في كود السيرفر بس، عشان كده [[products]] متاح في الـ handlers من غير import.`,
            when: R`[[useFetch]] لأي بيانات الصفحة محتاجاها وقت الرسم. [[useAsyncData]] لما الجلب مش URL واحد (SDK، أو كذا طلب مع بعض). و [[$fetch]] لوحده للحاجات اللي بتحصل بعد ضغطة (POST فورم، زرار). و [[server/api]] لـ API صغيرة، أو BFF (Backend For Frontend) قدام API تانية.`,
            mistakes: R`تستخدم [[$fetch]] لوحده في [[setup]] فيتعمل مرتين (سيرفر ومتصفح). وتنسى [[await]] قبل [[useFetch]] فالصفحة تترسم على السيرفر من غير بيانات. وتحط secrets في كود [[app/]] (بيوصل للمتصفح)، الصح [[runtimeConfig]] و [[server/]]. وتستخدم [[q.value]] في [[query]] بدل [[q]] فالبحث ميعيدش الطلب. وتعمل [[fetch('http://localhost:3000/api/...')]] على السيرفر بدل المسار الداخلي.`
          },
          teach: R`## الفكرة: الـ API والصفحة في مشروع واحد، والبيانات بتيجي مع الـ HTML

شغّلنا المشروع (Nuxt 4.6.3، Nitro 2.13.5): الـ API طلبناها بـ curl من build الإنتاج على بورت 5964، والصفحة من [[npm run dev]] بـ curl وفي Chrome headless وسجّلنا الطلبات.

---

## ١. [[server/api]]

| الملف | الـ endpoint |
|---|---|
| [[server/api/products/index.get.ts]] | [[GET /api/products]] |
| [[server/api/products/[id].get.ts]] | [[GET /api/products/:id]] |
| [[server/utils/db.ts]] | مش endpoint: كود مشترك، وبيتعمله auto-import في السيرفر |

- [[defineEventHandler((event) => ...)]]: اللي ترجّعه بيتحوّل JSON.
- [[getQuery(event)]]: الـ query كـ object، و [[{ q = '' }]] destructuring بقيمة افتراضية.
- [[getRouterParam(event, 'id')]]: من [[[id]]] في اسم الملف، string، فـ [[Number()]].
- [[throw createError({ statusCode: 404, message })]]: رد 404.

~~~text الناتج (curl)
GET /api/products?q=%D9%85
HTTP/1.1 200 OK
content-type: application/json
[{"id":2,"name":"ماوس","price":350}]

GET /api/products/9
HTTP/1.1 404 Product not found
{
  "error": true,
  "url": "http://localhost:5964/api/products/9",
  "statusCode": 404,
  "statusMessage": "Product not found",
  "message": "Product not found"
}
~~~

---

## ٢. [[await useFetch('/api/products', { query: { q } })]]

| الحتة | معناها |
|---|---|
| [[await]] | الصفحة متترسمش على السيرفر غير لما البيانات تيجي |
| [[data: products]] | destructuring بإعادة تسمية: [[data]] اسمه هنا [[products]] |
| [[status]] | [['idle']] أو [['pending']] أو [['success']] أو [['error']] |
| [[query: { q }]] | [[?q=...]]، و [[q]] ref فبيتراقب |

---

## ٣. الـ HTML اللي جه من السيرفر

~~~text الناتج (curl /products، مختصر)
<ul><li><a href="/products/1">كيبورد</a></li><li><a href="/products/2">ماوس</a></li><li><a href="/products/3">شاشة</a></li></ul>
...
<script type="application/json" id="__NUXT_DATA__">[["ShallowReactive",1],{"data":2,...},["ShallowReactive",3],{"$f10j4ollyh7j09":4},[5,9,13],{"id":6,"name":7,"price":8},1,"كيبورد",900,{"id":10,...},2,"ماوس",350,...]</script>
~~~

- الـ list موجودة في الـ HTML.
- [[__NUXT_DATA__]] فيه نفس البيانات (بشكل مضغوط: كل قيمة بتتكتب مرة وبيتشاور عليها برقمها). ده الـ payload.

---

## ٤. في المتصفح

~~~text الناتج (Chrome)
hydrated list: كيبورد, ماوس, شاشة | api requests on load: [ 'GET /_payload.json?...' ]
typed: شاشة | requests: [ 'GET /api/products?q=شا' ]
~~~

- وقت الفتح **مفيش** طلب لـ [[/api/products]]: Vue خد البيانات من الـ payload. (الـ [[/_payload.json]] ده prefetch لصفحة [[/]] من الـ NuxtLink.)
- لما كتبنا «شا»، [[q]] اتغير، فـ [[useFetch]] عمل طلب من المتصفح.

---

## ٥. صفحة منتج مش موجود

صفحة [[products/[id].vue]] بتعمل [[throw createError({ statusCode: 404, ..., fatal: true })]] لو [[error]]:

~~~text الناتج
products/9 status: 404
404 page: 404 ... المنتج مش موجود  Go back home
~~~

الـ status الحقيقي 404 (مهم لجوجل)، و Nuxt عرض صفحة الخطأ الافتراضية برسالتنا.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[server/api/x.get.ts]] | [[GET /api/x]] |
| [[server/api/x/[id].get.ts]] | [[GET /api/x/:id]] |
| [[getQuery]] و [[getRouterParam]] و [[readBody]] | المدخلات |
| [[createError({ statusCode })]] | رد خطأ |
| [[await useFetch(url, { query })]] | بيانات وقت الـ SSR، وبتيجي مع الصفحة |
| [[$fetch]] | لطلبات بعد ضغطة |`,
          lines: [
            "البيانات (مكان قاعدة البيانات).",
            "كيبورد.",
            "ماوس.",
            "شاشة.",
            "قفلة الـ array.",
            R`[[GET /api/products]].`,
            "الـ q من الـ query أو فاضي.",
            "المنتجات اللي اسمها فيه q.",
            "قفلة الـ handler.",
            R`[[GET /api/products/:id]].`,
            "الـ id من اسم الملف، رقم.",
            "دوّر عليه.",
            "مش موجود: 404.",
            "رجّعه.",
            "قفلة الـ handler.",
            "script صفحة المنتجات (من غير imports).",
            "نص البحث.",
            R`هات المنتجات (على السيرفر وقت الـ SSR)...`,
            R`ومعاها [[?q=]]، وبيتعاد لما q يتغير.`,
            R`قفلة [[useFetch]].`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "البحث.",
            "بيحمّل.",
            "خطأ.",
            "البيانات...",
            "سطر لكل منتج.",
            "رابط لصفحته.",
            "قفلة السطر.",
            "قفلة الـ list.",
            "قفلة الـ template."
          ],
          sol: R`[[?q=ما]] بيرجّع الماوس بس، و [[/api/products/9]] بيرجّع [[HTTP/1.1 404 Product not found]] و JSON فيه [[statusCode: 404]].

وقت فتح [[/products]] مفيش طلب لـ [[/api/products]] في Network، لأن البيانات جاية في [[__NUXT_DATA__]] جوه الـ HTML. ولما تكتب في البحث بيظهر [[GET /api/products?q=...]]، لأن [[useFetch]] بيراقب [[q]].`
        },
        {
          cmd: "SSR و SPA و static",
          title: "كل صفحة تتعرض إزاي: SSR و prerender و swr و ssr:false و nuxt generate",
          desc: R`Nuxt بيسمحلك تختار طريقة الرسم لكل route في [[routeRules]]: SSR (الافتراضي، الصفحة بتترسم على السيرفر مع كل طلب)، و [[prerender: true]] (HTML جاهز وقت الـ build)، و [[swr: 60]] (بتترسم وتتخزن ٦٠ ثانية)، و [[ssr: false]] (SPA: السيرفر بيبعت صفحة فاضية والمتصفح بيرسم).

و [[nuxt generate]] بيعمل الموقع كله static (HTML لكل صفحة) ترفعه على أي استضافة من غير Node، بس مفيش [[server/api]] وقتها.`,
          example: R`// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: { htmlAttrs: { lang: 'ar', dir: 'rtl' } },
  },
  routeRules: {
    '/': { prerender: true },
    '/products/**': { swr: 60 },
    '/admin/**': { ssr: false },
  },
})

// الأوامر
npm run build
node .output/server/index.mjs
npm run generate`,
          try: R`اعمل build وشغّل. [[curl -i localhost:3000/products/2]]: فيه [[cache-control]]؟ [[curl localhost:3000/admin]]: الـ [[<div id="__nuxt">]] فيه إيه؟ بعدين [[npm run generate]] وارفع [[.output/public]] بـ [[npx serve]] وجرّب البحث في [[/products]].`,
          flag: "script",
          deep: {
            why: R`مش كل الصفحات زي بعض: الرئيسية ثابتة (الأسرع إنها تبقى HTML جاهز)، وصفحة المنتج بتتغير كل شوية بس مش كل ثانية (اعملها cache)، ولوحة التحكم ورا login ومش محتاجة SEO (SPA أبسط وأرخص على السيرفر). الفريموركات القديمة كانت بتخليك تختار طريقة واحدة للموقع كله. Nuxt بيسمي ده hybrid rendering.`,
            how: R`[[routeRules]] بيتطبّق على Nitro: [[prerender]] بيخلي الـ build يزور الصفحة ويحفظ HTML و [[_payload.json]] في [[.output/public]]. و [[swr]] بيرسم الصفحة مرة ويخزّنها، ويرد بـ [[cache-control: s-maxage=60, stale-while-revalidate]]، وبعد الوقت ده بيرد بالنسخة القديمة ويحدّث في الخلفية. و [[ssr: false]] بيرد بالـ [[<div id="__nuxt">]] فاضي والـ JS يرسم. والصفحات المتخزنة بتطلّع البيانات في ملف [[_payload.json]] لوحده بدل ما تبقى جوه الـ HTML.

[[nuxt generate]] = build بـ [[prerender]] لكل الصفحات، والـ crawler بيمشي على الروابط ([[<a href>]]) عشان يلاقي الصفحات الديناميكية ([[/products/1]] و 2 و 3). بس [[server/api]] مش بيبقى موجود بعدها، فأي [[useFetch]] بيتغير في المتصفح (زي البحث) هيرجع 404. وكمان بيعمل [[200.html]] و [[404.html]] للـ fallback.

والـ hydration: الصفحة بتوصل HTML، و Vue بيحمّل ويربط الـ events على نفس العناصر من غير ما يرسمها تاني. لو الـ HTML اللي اترسم على السيرفر مختلف عن اللي المتصفح كان هيرسمه ([[Date.now()]] أو [[Math.random()]] أو [[window]])، بيطلع hydration mismatch warning. (نفس الفكرة في درس «hydration mismatch» في «تاب Next.js».)`,
            when: R`[[prerender]]: الرئيسية، و about، والمدونة. [[swr]] أو [[isr]]: صفحات المنتجات والأخبار. SSR عادي: صفحات بتتغير لكل يوزر (البحث، السلة). [[ssr: false]]: لوحات التحكم. و [[generate]]: موقع بالكامل محتواه معروف وقت الـ build (portfolio، docs) ومش محتاج API.`,
            mistakes: R`تعمل [[generate]] لموقع فيه [[server/api]] وتستغرب إن البحث بيرجع 404. وتعمل [[swr]] لصفحة فيها بيانات اليوزر فيوزر يشوف بيانات يوزر تاني من الكاش. وتحط [[ssr: false]] على صفحات عايزها في جوجل. وتنسى إن [[prerender]] بيتعمل وقت الـ build: أي تغيير في البيانات محتاج build جديد. وأخطرهم: [[ref]] متعرّف برا أي دالة (في أول ملف composable) على السيرفر بيتشارك بين **كل** الطلبات وكل اليوزرز، فاستخدم [[useState]] أو Pinia (الشرح خطوة بخطوة فيه التجربة).`
          },
          teach: R`## الفكرة: كل route ليها طريقة رسم

عملنا [[npm run build]] بالـ config ده (Nuxt 4.6.3)، وشغّلنا [[node .output/server/index.mjs]] على بورت 5964، وطلبنا بـ curl. وبعدين [[npm run generate]].

---

## ١. [[routeRules]]

| القاعدة | معناها |
|---|---|
| [['/': { prerender: true }]] | الرئيسية HTML جاهز وقت الـ build |
| [['/products/**': { swr: 60 }]] | المنتجات تترسم وتتخزن ٦٠ ثانية. [[**]] = أي حاجة تحت |
| [['/admin/**': { ssr: false }]] | الأدمن SPA |

و [[app.head.htmlAttrs]]: [[lang="ar"]] و [[dir="rtl"]] على [[<html>]] في كل الصفحات.

---

## ٢. [[npm run build]]: الـ prerender

~~~text الناتج (مختصر)
[nitro] ℹ Initializing prerenderer
[nitro] ℹ Prerendering 1 routes
[nitro]   ├─ / (99ms)
[nitro]   ├─ /_payload.json (3ms)
[nitro] ℹ Prerendered 2 routes in 2.877 seconds
~~~

[[/]] اتعملت HTML في [[.output/public/index.html]]. وطلعلنا كمان warning عن [[cache-driver.mjs]] بيتعامل كـ external، والسيرفر اشتغل عادي بعده.

---

## ٣. [[/]]: ملف جاهز

~~~text الناتج (curl -i /)
HTTP/1.1 200 OK
Content-Type: text/html;charset=utf-8
ETag: "7d6-EOP4MYCii4r/GDsyiQGjvU/bKYE"
Last-Modified: Tue, 27 Oct 2026 16:28:46 GMT
~~~

مفيش [[x-powered-by: Nuxt]]: ده ملف static Nitro بيخدمه، مش صفحة اترسمت.

---

## ٤. [[/products/2]]: swr

~~~text الناتج (curl -i /products/2)
HTTP/1.1 200 OK
cache-control: s-maxage=60, stale-while-revalidate
x-powered-by: Nuxt
<link rel="preload" as="fetch" href="/products/2/_payload.json?_b=...">
~~~

~~~text الناتج (curl /products/2/_payload.json)
[{"data":1,"prerenderedAt":-1},["ShallowReactive",2],{"$fcx1yj9v6hjc6":3},{"id":4,"name":5,"price":6},2,"ماوس",350]
~~~

- [[s-maxage=60]]: أي CDN قدام السيرفر يخزّنها ٦٠ ثانية، و [[stale-while-revalidate]]: بعدها يرد بالقديم ويحدّث في الخلفية.
- البيانات في ملف [[_payload.json]] لوحده (مش جوه الـ HTML زي الدرس اللي فات): الصفحات المتخزنة بتعمل كده.

---

## ٥. [[/admin]]: SPA

~~~text الناتج (curl /admin)
<div id="__nuxt"></div>
~~~

فاضي: الـ JS في المتصفح هو اللي رسم «لوحة التحكم» (شوفناها في Chrome في درس [[pages و layouts]]).

---

## ٦. [[npm run generate]]

~~~text الناتج (مختصر)
[nitro] ℹ Prerendering 3 initial routes with crawler
[nitro]   ├─ /404.html (65ms)
[nitro]   ├─ /200.html (64ms)
[nitro]   ├─ / (71ms)
[nitro]   ├─ /admin (19ms)
[nitro]   ├─ /products (26ms)
[nitro]   ├─ /products/2 (4ms)
[nitro]   ├─ /products/1 (5ms)
[nitro]   ├─ /products/3 (5ms)
[nitro] ℹ Prerendered 13 routes in 2.075 seconds
◆ ✨ You can now deploy .output/public to any static hosting! (6.12s)
~~~

~~~text الناتج (.output/public من غير _nuxt)
200.html  404.html  _payload.json  admin/index.html  favicon.ico  index.html
products/1/index.html  products/2/index.html  products/3/index.html
products/index.html  products/_payload.json  products/1/_payload.json ...  robots.txt
~~~

الـ crawler بدأ من [[/]] ومشي على الروابط، فلقى [[/products]] ومنها [[/products/1]] و 2 و 3.

ولما رفعنا [[.output/public]] بـ [[serve]] (سيرفر static) وكتبنا «شا» في البحث:

~~~text الناتج
static list: كيبورد, ماوس, شاشة
typed: [GET] "/api/products?q=%D8%B4%D8%A7": 404 Not Found
~~~

الـ list الأولى اشتغلت (من الـ payload)، بس البحث بيطلب [[/api/products]] ومفيش سيرفر. ده التمن بتاع static.

---

## ٧. مطب الـ SSR: state مشترك بين الطلبات

على السيرفر، الكود اللي في أول الملف (برا أي دالة) بيتنفّذ **مرة واحدة** للسيرفر كله، مش لكل طلب. عملنا composable فيه الاتنين:

~~~text app/composables/useVisits.ts
const shared = ref(0)

export function useVisitsLeak() {
  shared.value++
  return shared
}

export function useVisitsSafe() {
  const visits = useState('visits', () => 0)
  visits.value++
  return visits
}
~~~

وطلبنا صفحة بتستخدمهم ٣ مرات بـ curl من build الإنتاج:

~~~text الناتج
<p id="r">leak=1 safe=1</p>
<p id="r">leak=2 safe=1</p>
<p id="r">leak=3 safe=1</p>
~~~

[[shared]] بيكبر مع كل طلب: لو ده كان «اليوزر الحالي» أو «السلة»، كل الزوار هيشوفوا بيانات بعض. [[useState('key', init)]] بتاع Nuxt بيعمل state لكل طلب لوحده، وبيتنقل للمتصفح مع الـ payload. و Pinia في Nuxt ([[@pinia/nuxt]]) آمنة بنفس الطريقة.

---

## الخلاصة

| الطريقة | القاعدة | الـ HTML | محتاج Node؟ | مناسب لـ |
|---|---|---|---|---|
| SSR | (افتراضي) | مع كل طلب | أيوه | صفحات لكل يوزر |
| prerender | [[prerender: true]] | وقت الـ build | لأ للصفحة دي | صفحات ثابتة |
| swr | [[swr: 60]] | مرة وتتخزن | أيوه | منتجات وأخبار |
| SPA | [[ssr: false]] | فاضي | لأ للصفحة دي | لوحات تحكم |
| static | [[nuxt generate]] | كل الصفحات | لأ، بس مفيش API | موقع محتواه ثابت |`,
          lines: [
            "إعدادات Nuxt.",
            "نسخة سلوك Nuxt/Nitro اللي المشروع متثبّت عليها.",
            "DevTools في التطوير.",
            "إعدادات الـ app...",
            R`[[lang]] و [[dir]] على [[<html>]].`,
            "قفلة.",
            "طريقة الرسم لكل route...",
            "الرئيسية: HTML وقت الـ build.",
            "المنتجات: تتخزن ٦٠ ثانية.",
            "الأدمن: SPA.",
            R`قفلة [[routeRules]].`,
            "قفلة الإعدادات.",
            "build للإنتاج.",
            "شغّل السيرفر.",
            "أو: موقع static كامل."
          ],
          sol: R`[[/products/2]] فيه [[cache-control: s-maxage=60, stale-while-revalidate]]، و [[/admin]] بيرجّع [[<div id="__nuxt"></div>]] فاضي.

وبعد [[generate]] و [[serve]]: [[/products]] بتفتح بالـ list، بس البحث بيطلع [[404]] على [[/api/products?q=...]]، لأن الموقع static ومفيش سيرفر يرد على الـ API.`
        },
        {
          cmd: "useSeoMeta",
          title: "title و description و Open Graph لكل صفحة: useSeoMeta",
          desc: R`[[useSeoMeta({ title, description, ogTitle, ogImage })]] بيحط الـ [[<title>]] والـ [[<meta>]] في [[<head>]] بتاع الصفحة، وبيترسموا على السيرفر، فجوجل وواتساب وفيسبوك بيشوفوهم في الـ HTML على طول. والقيم ممكن تبقى دوال ([[() => product.value?.name]]) فتتحدّث مع البيانات.

و [[useHead]] للحاجات التانية ([[<link>]] و [[<script>]] و [[htmlAttrs]])، و [[app.head]] في [[nuxt.config]] للحاجات الثابتة في كل الصفحات.`,
          example: R`// app/pages/products/[id].vue
<script setup lang="ts">
const route = useRoute()
const { data: product, error } = await useFetch($__bt/api/products/$__{route.params.id}$__bt)

if (error.value) {
  throw createError({ statusCode: 404, message: 'المنتج مش موجود', fatal: true })
}

useSeoMeta({
  title: () => product.value?.name ?? 'منتج',
  description: () => $__bt$__{product.value?.name} بسعر $__{product.value?.price} جنيه$__bt,
  ogTitle: () => product.value?.name,
  ogImage: 'https://example.com/og.png',
})
</script>

<template>
  <article v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.price }} EGP</p>
  </article>
</template>`,
          try: R`[[curl localhost:3000/products/2]] ودوّر على [[<title>]] و [[og:]]. بعدين زوّد [[twitterCard: 'summary_large_image']] و [[ogDescription]]، و [[useHead({ link: [{ rel: 'canonical', href: ... }] })]]. وجرّب [[/products/9]]: الـ status إيه؟`,
          flag: "script",
          deep: {
            why: R`جوجل بيعرض الـ title والـ description في نتايج البحث، والسوشيال ميديا بتعرض [[og:title]] و [[og:image]] لما حد يبعت اللينك. لو الـ meta دي بتتحط بـ JavaScript في المتصفح (SPA)، أغلب الـ crawlers (واتساب وفيسبوك ولينكدإن) مش بيشغّلوا JS، فهيشوفوا عنوان واحد لكل الصفحات. في Nuxt بتتحط في الـ HTML اللي جاي من السيرفر.`,
            how: R`[[useSeoMeta]] و [[useHead]] من مكتبة Unhead: كل component بيسجّل الـ tags بتاعته، وعلى السيرفر بيتجمعوا ويتكتبوا في [[<head>]]، وفي المتصفح بيتحدّثوا لما الصفحة أو البيانات تتغير. [[useSeoMeta]] بتكتب الأسماء camelCase وبتعرف هي [[name]] ولا [[property]] ([[ogTitle]] → [[property="og:title"]] و [[description]] → [[name="description"]])، ومكتوبة types لكل الخيارات (أكتر من ١٠٠).

ولو القيمة بتعتمد على بيانات بتتغير، ادّيها دالة ([[() => ...]]) أو computed. و [[titleTemplate]] (في [[useHead]] أو [[app.head]]) بيزوّد نفس اللاحقة لكل الصفحات ([['%s | المحل']]). وفيه module اسمه [[@nuxtjs/seo]] بيضيف sitemap و robots و schema.org.`,
            when: R`كل صفحة public. على الأقل [[title]] و [[description]] و [[ogTitle]] و [[ogDescription]] و [[ogImage]]. والصفحات ورا login: [[robots: 'noindex']].`,
            mistakes: R`تستخدم [[document.title = ...]] في [[onMounted]]: مبيترسمش على السيرفر. وتدّي قيمة مش دالة لبيانات لسه جاية ([[title: product.value?.name]]) فتتاخد [[undefined]] أول مرة ومتتحدّثش. و [[og:image]] بمسار نسبي ([[/og.png]]): لازم URL كامل. ونفس الـ title لكل الصفحات. وصفحة «مش موجود» بترجع 200، فجوجل يفهرسها: استخدم [[createError({ statusCode: 404 })]].`
          },
          teach: R`## الفكرة: الـ head بيترسم على السيرفر مع الصفحة

بنينا الصفحة دي (Nuxt 4.6.3)، وشغّلنا [[node .output/server/index.mjs]]، وطلبنا [[/products/2]] و [[/products/9]] بـ curl.

---

## ١. البيانات

- [[useRoute()]]: auto-import، و [[route.params.id]] من اسم الملف [[[id].vue]].
- [[await useFetch(...)]]: المنتج على السيرفر (الدرس اللي فات).
- [[if (error.value) throw createError({ statusCode: 404, ..., fatal: true })]]: لو الـ API رجّعت 404، الصفحة كمان 404. [[fatal: true]] بيعرض صفحة الخطأ الكاملة حتى في المتصفح.

---

## ٢. [[useSeoMeta]]

| الخيار | التاج اللي بيطلع |
|---|---|
| [[title]] | [[<title>]] |
| [[description]] | [[<meta name="description">]] |
| [[ogTitle]] | [[<meta property="og:title">]] |
| [[ogImage]] | [[<meta property="og:image">]] |

والقيم دوال [[() => ...]] عشان [[product]] ref ممكن يتغير. و [[?.]] و [[??]]: لو [[product.value]] لسه [[null]]، [[title]] يبقى «منتج».

---

## ٣. الناتج

~~~text الناتج (curl /products/2، الـ head مختصر)
<html  lang="ar" dir="rtl">
<title>ماوس</title>
<meta name="description" content="ماوس بسعر 350 جنيه">
<meta property="og:title" content="ماوس">
<meta property="og:image" content="https://example.com/og.png">
~~~

كل ده في الـ HTML اللي السيرفر رجّعه، قبل أي JS. أي crawler مش بيشغّل JS (واتساب مثلًا) هيشوف «ماوس» والصورة.

و [[lang="ar" dir="rtl"]] من [[app.head.htmlAttrs]] في [[nuxt.config]].

---

## ٤. منتج مش موجود

~~~text الناتج
curl -o /dev/null -w "%{http_code}" /products/99
404
~~~

وفي لوج السيرفر:

~~~text الناتج (لوج السيرفر، من الـ container في درس deploy)
[request error] [fatal] [GET] http://localhost:5966/products/99
 H3Error: المنتج مش موجود
  cause: { statusCode: 404, message: 'المنتج مش موجود', fatal: true },
  statusCode: 404,
  fatal: true,
~~~

جوجل بياخد الـ 404 ومبيفهرسش الصفحة.

(في أول تجربة كتبنا [[statusMessage]] بدل [[message]]، والسيرفر طلّع: [[[h3] Please prefer using $__btmessage$__bt for longer error messages instead of $__btstatusMessage$__bt]]. عشان كده المثال بـ [[message]].)

---

## الخلاصة

| تكتب | النتيجة |
|---|---|
| [[useSeoMeta({ title, description })]] | title و meta description |
| [[ogTitle]] و [[ogImage]] و [[ogDescription]] | Open Graph للسوشيال |
| [[twitterCard]] | كارت تويتر/X |
| قيمة كدالة | بتتحدّث مع البيانات |
| [[useHead({ link, htmlAttrs, titleTemplate })]] | أي حاجة تانية في الـ head |
| [[app.head]] في [[nuxt.config]] | ثابت لكل الصفحات |
| [[createError({ statusCode: 404 })]] | status حقيقي للصفحات الناقصة |`,
          lines: [
            "script صفحة المنتج.",
            "الـ route الحالي.",
            "هات المنتج على السيرفر.",
            "لو مش موجود...",
            "الصفحة 404.",
            R`قفلة [[if]].`,
            "الـ meta...",
            "العنوان من الاسم.",
            "الوصف من الاسم والسعر.",
            "عنوان السوشيال.",
            "صورة السوشيال (URL كامل).",
            R`قفلة [[useSeoMeta]].`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "المنتج لو موجود.",
            "الاسم.",
            "السعر.",
            "قفلة.",
            "قفلة الـ template."
          ],
          sol: R`في الـ HTML: [[<title>ماوس</title>]] و [[<meta name="description" content="ماوس بسعر 350 جنيه">]] و [[og:title]] و [[og:image]]. و [[/products/9]] بيرجع [[404]]. وده شكل الإضافات:`,
          solCode: R`useSeoMeta({
  title: () => product.value?.name ?? 'منتج',
  ogDescription: () => $__bt$__{product.value?.name} بسعر $__{product.value?.price} جنيه$__bt,
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: $__bthttps://example.com/products/$__{route.params.id}$__bt }],
})`
        },
        {
          cmd: "deploy",
          title: "ترفع Nuxt: Dockerfile بمرحلتين و node .output",
          desc: R`[[.output/]] اللي بيطلع من [[nuxt build]] سيرفر كامل لوحده (جواه الـ node_modules اللي محتاجها)، فالـ Docker image الأخيرة محتاجة Node و [[.output]] بس: مرحلة build فيها [[npm ci]] و [[npm run build]]، ومرحلة تانية بتنسخ [[.output]] وتشغّل [[node .output/server/index.mjs]].

ولو المنصة Vercel أو Netlify أو Cloudflare، Nuxt بيكتشفها لوحده أو بتحدد [[NITRO_PRESET]]، وبيطلع output بشكلها من غير Docker.`,
          example: R`FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
USER node
CMD ["node", ".output/server/index.mjs"]`,
          try: R`حط الـ Dockerfile و [[.dockerignore]] (فيه [[node_modules]] و [[.nuxt]] و [[.output]]) في المشروع. [[docker build -t shop .]] ثم [[docker run --rm -p 3000:3000 shop]] وافتح [[localhost:3000/products/1]]. حجم الـ image كام؟ وحجم [[.output]] جواها كام؟`,
          flag: "script",
          deep: {
            why: R`السيرفر محتاج Node وملفات الـ build بس، مش الـ source ولا [[node_modules]] بتاعة التطوير (Vite و TypeScript وغيرهم، مئات الميجات). الـ multi-stage build بيبني في image وبيرمي كل حاجة ماعدا الناتج، فالـ image الأخيرة أصغر وأأمن (مفيش أدوات build ولا source).`,
            how: R`المرحلة الأولى ([[AS build]]): [[COPY package.json package-lock.json]] الأول ثم [[npm ci]] عشان Docker يعمل cache للطبقة دي، فلو غيّرت كود بس من غير ما تغيّر الباكدجات، الـ install مش بيتعاد. [[npm ci]] بيسطّب من الـ lock file بالظبط. وبعدين [[COPY . .]] و [[npm run build]].

المرحلة التانية من [[node:22-slim]] نضيفة: [[COPY --from=build]] بتنسخ من المرحلة الأولى [[.output]] بس. [[PORT]] بيقراه Nitro، و [[USER node]] (يوزر موجود في image الـ node) عشان السيرفر ميشتغلش root. و [[.dockerignore]] بيمنع [[node_modules]] بتاعة ويندوز إنها تتنسخ للـ image (فيها binaries لويندوز مش لينكس).

ولو منصة serverless: [[NITRO_PRESET=vercel npm run build]] (أو [[netlify]] أو [[cloudflare-pages]]) بيطلع output بشكلها، والمنصة نفسها غالبًا بتكتشف Nuxt لوحدها. وقدام السيرفر في VPS حط Nginx أو Caddy للـ HTTPS (شوف «تاب Nginx» و «تاب Docker»).`,
            when: R`VPS أو Kubernetes أو أي مكان بيشغّل containers. ولو موقع [[generate]] (static)، مش محتاج Node خالص: ارفع [[.output/public]] على Nginx أو Cloudflare Pages أو GitHub Pages.`,
            mistakes: R`تنسى [[.dockerignore]] فـ [[node_modules]] بتاعة ويندوز تتنسخ وتبوّظ الـ build. وتنسخ المشروع كله في المرحلة الأخيرة بدل [[.output]]. وتشغّل [[npm run dev]] في الإنتاج. وتحط secrets في الـ Dockerfile بـ [[ENV]] (بتتسجل في الـ image)، الصح تبعتها وقت التشغيل ([[docker run -e]]) وتقراها بـ [[runtimeConfig]] (متغيرات [[NUXT_...]]).`
          },
          teach: R`## الفكرة: ابني في image، وشغّل في image تانية فيها الناتج بس

بنينا الـ image من مشروع الدروس اللي فاتت على Docker Desktop (Docker 29.6، base image [[node:22-slim]] اللي فيها Node 22.23.3)، وشغّلناها على بورت 5966 وطلبنا صفحة.

---

## ١. المرحلة الأولى: البناء

| السطر | معناه |
|---|---|
| [[FROM node:22-slim AS build]] | image فيها Node 22 (slim = من غير أدوات زيادة)، واسم المرحلة [[build]] |
| [[WORKDIR /app]] | اشتغل في [[/app]] |
| [[COPY package.json package-lock.json ./]] | ملفات الباكدجات بس الأول |
| [[RUN npm ci]] | سطّب من الـ lock بالظبط |
| [[COPY . .]] | باقي المشروع (ماعدا اللي في [[.dockerignore]]) |
| [[RUN npm run build]] | [[.output/]] |

و [[.dockerignore]]:

~~~text .dockerignore
node_modules
.nuxt
.output
.data
~~~

---

## ٢. المرحلة التانية: التشغيل

| السطر | معناه |
|---|---|
| [[FROM node:22-slim]] | image نضيفة |
| [[COPY --from=build /app/.output ./.output]] | الناتج بس من المرحلة الأولى |
| [[ENV NODE_ENV=production PORT=3000]] | متغيرات البيئة. Nitro بيقرا [[PORT]] |
| [[EXPOSE 3000]] | توثيق: الـ container بيسمع على 3000 |
| [[USER node]] | مش root |
| [[CMD ["node", ".output/server/index.mjs"]]] | الأمر اللي بيشتغل |

---

## ٣. [[docker build -t vue-lesson-nuxtshop .]]

~~~text الناتج (آخره)
#10 9.018   ├─ .output/server/index.mjs (440 B) (234 B gzip)
#10 9.018 Σ Total size: 2.16 MB (551 kB gzip)
#10 9.019 ◆ ✨ Build complete in 8.48s!
#11 [stage-1 3/3] COPY --from=build /app/.output ./.output
#12 naming to docker.io/library/vue-lesson-nuxtshop:latest done
~~~

الـ build اشتغل جوه لينكس، و [[stage-1]] هي المرحلة التانية.

---

## ٤. التشغيل

~~~text الناتج
docker run -d --name vue-lesson-nuxt -p 5966:3000 vue-lesson-nuxtshop
docker logs vue-lesson-nuxt
Listening on http://[::]:3000

curl http://localhost:5966/products/1
<title>كيبورد</title>
<h1>كيبورد</h1>

curl http://localhost:5966/api/products
[{"id":1,"name":"كيبورد","price":900},{"id":2,"name":"ماوس","price":350},{"id":3,"name":"شاشة","price":4200}]
~~~

[[-p 5966:3000]]: بورت 5966 على الجهاز ← 3000 جوه الـ container. الصفحة اترسمت بالـ SSR والـ API شغالة.

---

## ٥. الأحجام

~~~text الناتج
docker images
vue-lesson-nuxtshop:latest 330MB
node:22-slim               329MB

docker run --rm --entrypoint sh vue-lesson-nuxtshop -c "du -sh /app/.output"
3.1M	/app/.output
~~~

التطبيق كله زوّد حوالي 3 MB على الـ base image. مرحلة الـ build (بـ [[node_modules]] كاملة) اترمت ومش في الـ image.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| مرحلتين | الـ image الأخيرة فيها Node و [[.output]] بس |
| [[COPY package*.json]] قبل [[COPY . .]] | cache للـ [[npm ci]] |
| [[.dockerignore]] | متنسخش [[node_modules]] بتاعة جهازك |
| [[USER node]] | مش root |
| [[PORT]] | Nitro بيسمع عليه |
| [[NITRO_PRESET]] | Vercel و Netlify و Cloudflare من غير Docker |`,
          lines: [
            R`مرحلة البناء من Node 22 slim، اسمها [[build]].`,
            R`اشتغل في [[/app]].`,
            "انسخ ملفات الباكدجات الأول (cache).",
            "سطّب من الـ lock بالظبط.",
            "انسخ باقي المشروع.",
            R`ابني [[.output]].`,
            "مرحلة التشغيل: image نضيفة.",
            R`اشتغل في [[/app]].`,
            R`انسخ [[.output]] بس من مرحلة البناء.`,
            "وضع الإنتاج والبورت.",
            "توثيق البورت.",
            "شغّل كيوزر عادي مش root.",
            "شغّل السيرفر."
          ],
          sol: R`الصفحة بتفتح من الـ container، والـ image حوالي 330 MB (أغلبها Node نفسه: [[node:22-slim]] لوحدها 329 MB)، و [[.output]] جواها حوالي 3 MB. ولو عايز أصغر، فيه [[node:22-alpine]] (أصغر بكتير، بس musl بدل glibc فبعض الباكدجات الـ native ممكن تتعبك).`
        }
      ]
    }
]);

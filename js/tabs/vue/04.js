// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "Vue Router",
      l: 2,
      n: "صفحات بـ URL في SPA: routes و params و query، و guards للصلاحيات، و lazy loading",
      items: [
        {
          cmd: "Vue Router",
          title: "صفحات وروابط و params: createRouter و RouterLink و useRoute",
          desc: R`Vue Router (النسخة 5.4 في أكتوبر ٢٠٢٦) بيربط كل URL بـ component: [[{ path: '/products/:id', component: ProductView }]]. [[<RouterView />]] هو المكان اللي الصفحة بتترسم فيه، و [[<RouterLink to="...">]] رابط بيغيّر الصفحة من غير reload.

جوه أي component: [[useRoute()]] بيديك الـ URL الحالي ([[params]] و [[query]])، و [[useRouter()]] بيديك [[push]] و [[replace]] و [[back]] تتنقل بيهم من الكود.`,
          example: R`// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/products', name: 'products', component: () => import('@/views/ProductsView.vue') },
    { path: '/products/:id(\\d+)', name: 'product', component: () => import('@/views/ProductView.vue'), props: true },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFound.vue') },
  ],
})
export default router

// src/views/ProductsView.vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const products = [
  { id: 1, name: 'كيبورد' },
  { id: 2, name: 'ماوس' },
  { id: 3, name: 'شاشة' },
]
const q = computed(() => String(route.query.q ?? ''))
const shown = computed(() => products.filter((p) => p.name.includes(q.value)))

function search(e: Event) {
  router.push({ query: { q: (e.target as HTMLInputElement).value } })
}
</script>

<template>
  <input :value="q" @change="search" />
  <ul>
    <li v-for="p in shown" :key="p.id">
      <RouterLink :to="{ name: 'product', params: { id: p.id } }">{{ p.name }}</RouterLink>
    </li>
  </ul>
</template>

// src/views/ProductView.vue
<script setup lang="ts">
const props = defineProps<{ id: string }>()
</script>

<template>
  <h1>منتج رقم {{ props.id }}</h1>
  <RouterLink to="/products">رجوع</RouterLink>
</template>`,
          try: R`اعمل الـ ٣ ملفات (و [[NotFound.vue]] فيه [[{{ $route.params.pathMatch }}]])، وحط [[<RouterView />]] في [[App.vue]]. ابحث عن «ما» واضغط Enter: الـ URL بقى إيه؟ اعمل refresh: البحث فضل؟ بعدين ادخل [[/products/abc]] بإيدك: أنهي صفحة ظهرت؟`,
          flag: "script",
          deep: {
            why: R`في SPA فيه [[index.html]] واحد، بس المستخدم محتاج URL لكل صفحة: يعمل bookmark، ويبعت لينك، ويرجع بزرار Back، ويعمل refresh من غير ما يتوه. الـ router بيعمل ده من غير reload، فالتنقل بيبقى فوري والـ state (السلة مثلًا) مش بيضيع.`,
            how: R`[[createWebHistory]] بيستخدم History API بتاع المتصفح ([[pushState]]) فالـ URL شكله عادي ([[/products/2]]). السيرفر لازم يرجّع [[index.html]] لأي مسار مش ملف، وإلا الـ refresh على [[/products/2]] يدّي 404 (شوف درس SPA في «تاب Nginx»). و [[createWebHashHistory]] بيحط [[#/products/2]] ومش محتاج إعداد سيرفر، بس شكله أوحش ومش كويس للـ SEO.

[[:id]] جزء متغير بييجي في [[route.params.id]] كـ string دايمًا. و [[(\\d+)]] بعده regex: أرقام بس. و [[props: true]] بيبعت الـ params كـ props للـ component، فيبقى قابل للاختبار ومش مربوط بالـ router. و [[/:pathMatch(.*)*]] بيمسك أي مسار ملوش route (صفحة 404)، و [[*]] في الآخر بتخلي [[pathMatch]] array من أجزاء المسار.

[[route]] reactive: لما الـ URL يتغير ([[query]] أو [[params]]) الـ computed اللي بيقراه بيتحسب تاني. ولو انتقلت من [[/products/1]] لـ [[/products/2]]، نفس الـ component بيفضل (مش بيتعمل من الأول)، فراقب الـ param بـ [[watch(() => route.params.id, ...)]] أو اقرا الـ prop.

ومن Vue Router 5 فيه file-based routing جوه الباكدج نفسها ([[vue-router/vite]])، زي Nuxt: الصفحات من أسامي الملفات. هنا كتبناها بإيدنا عشان تفهم اللي بيحصل.`,
            when: R`أي SPA فيه أكتر من شاشة. خلي الحالة اللي المستخدم ممكن يشاركها في الـ URL: البحث والفلاتر ورقم الصفحة في [[query]]، والـ id في [[params]]. ولو المشروع محتاج SSR، Nuxt بيعمل الـ routing من الملفات (المستوى ٣).`,
            mistakes: R`تستخدم [[<a href>]] بدل [[<RouterLink>]] فالصفحة تعمل reload كامل. وتقرا [[route.params.id]] مرة في [[setup]] ([[const id = route.params.id]]) فلما تروح لمنتج تاني من نفس الصفحة الـ id يفضل القديم. وتنسى إن الـ params strings ([[route.params.id === 2]] دايمًا false). وترفع على سيرفر من غير fallback لـ [[index.html]] فأي refresh على صفحة داخلية يدّي 404.`
          },
          teach: R`## الفكرة: كل URL ليه component، والـ router بيبدّلهم من غير reload

شغّلنا الملفات في مشروع create-vue (Vue 3.5.44، Vue Router 5.4.0) في Chrome headless، واتنقلنا وطبعنا الـ URL والـ [[document.title]] ونص الصفحة بعد كل خطوة.

---

## ١. [[createRouter]]

| الحتة | معناها |
|---|---|
| [[createWebHistory(import.meta.env.BASE_URL)]] | URLs عادية. [[BASE_URL]] من Vite، وهو [[/]] إلا لو الموقع في فولدر فرعي |
| [[{ path: '/', name: 'home', component: HomeView }]] | الصفحة الرئيسية، متحمّلة على طول |
| [[component: () => import('...')]] | lazy: ملف JS لوحده بيتنزّل لما تروح للصفحة بس (الدرس الجاي) |
| [[name: 'product']] | اسم تستخدمه بدل ما تكتب المسار |
| [[:id(\\d+)]] | param اسمه [[id]]، أرقام بس |
| [[props: true]] | ابعت [[id]] كـ prop |
| [[/:pathMatch(.*)*]] | أي حاجة تانية: 404 |

و [[@/views]]: الـ [[@]] اختصار لـ [[src]] متعرّف في [[vite.config.ts]].

---

## ٢. [[ProductsView]]: الـ query

| السطر | معناه |
|---|---|
| [[route.query.q ?? '']] | الـ [[?q=...]] من الـ URL، ولو مش موجود نص فاضي. [[??]] = لو اللي قبلها null أو undefined |
| [[String(...)]] | الـ query ممكن تبقى array لو اتكررت، فنحوّلها نص |
| [[shown]] | computed بيفلتر المنتجات اللي اسمها فيه [[q]] |
| [[router.push({ query: { q } })]] | روح لنفس الصفحة بـ query جديد (بيتسجّل في الـ history، فـ Back بيرجع) |
| [[@change]] | الـ event بيحصل لما تضغط Enter أو تسيب الخانة |

و [[:to="{ name: 'product', params: { id: p.id } }"]]: رابط بالاسم، والـ router بيبني [[/products/2]] لوحده.

---

## ٣. [[ProductView]]: الـ param كـ prop

[[defineProps<{ id: string }>()]]: عشان [[props: true]]، الـ [[id]] جه prop. ونوعه string مش number.

---

## ٤. الناتج

~~~text الناتج (الخطوة | الـ URL | الـ title | نص الصفحة)
start    | /products                 | products  | كيبوردماوسشاشة
search   | /products?q=%D9%85%D8%A7  | products  | ماوس
click    | /products/2               | product   | منتج رقم 2رجوع
/abc     | /products/abc             | not-found | الصفحة دي مش موجودة: [ "products", "abc" ]
~~~

(الـ title من [[router.afterEach]] اللي بيحط اسم الـ route، هتشوفه في الدرس الجاي.)

### نقرا الناتج

| السطر | ليه |
|---|---|
| [[search]] | [[router.push]] حط [[?q=]] في الـ URL، و [[%D9%85%D8%A7]] هي «ما» بعد URL encoding. والـ computed فلتر |
| [[click]] | [[RouterLink]] بنى [[/products/2]] من الاسم والـ id، و [[ProductView]] استلم [[id]] = [['2']] |
| [[/abc]] | [[abc]] مش أرقام، فـ [[(\\d+)]] رفض، والـ catch-all مسكه، و [[pathMatch]] = [[["products", "abc"]]] |

ولما عملنا refresh على [[/products?q=ما]] البحث فضل، لأنه في الـ URL مش في متغير.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[<RouterView />]] | مكان الصفحة |
| [[<RouterLink :to="{ name, params }">]] | رابط من غير reload |
| [[route.params.id]] | جزء من المسار، string |
| [[route.query.q]] | بعد [[?]] |
| [[router.push(...)]] | انتقل (وBack بيرجع) |
| [[router.replace(...)]] | انتقل من غير ما تزوّد في الـ history |
| [[props: true]] | الـ params كـ props |
| [[/:pathMatch(.*)*]] | صفحة 404 |`,
          lines: [
            R`استورد [[createRouter]] و [[createWebHistory]].`,
            "الصفحة الرئيسية، متحمّلة على طول.",
            "اعمل الراوتر...",
            "بـ URLs عادية.",
            "الصفحات:",
            "الرئيسية.",
            "المنتجات، lazy.",
            R`منتج: [[id]] أرقام بس، ويتبعت كـ prop.`,
            "أي حاجة تانية: 404.",
            "قفلة الـ routes.",
            "قفلة الراوتر.",
            R`صدّره عشان [[main.ts]] يعمل [[app.use(router)]].`,
            "script صفحة المنتجات.",
            R`استورد [[computed]].`,
            R`استورد [[useRoute]] و [[useRouter]].`,
            "الـ URL الحالي.",
            "أداة التنقل.",
            "المنتجات.",
            "كيبورد.",
            "ماوس.",
            "شاشة.",
            "قفلة الـ array.",
            R`[[q]] من الـ query أو نص فاضي.`,
            "المنتجات اللي اسمها فيه q.",
            "دالة البحث...",
            "حط النص في الـ query.",
            "قفلة الدالة.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "input قيمته من الـ URL، وبيبحث لما يتغير.",
            "الـ list.",
            "عنصر لكل منتج.",
            "رابط بالاسم والـ id.",
            "قفلة العنصر.",
            "قفلة الـ list.",
            "قفلة الـ template.",
            "script صفحة المنتج.",
            R`[[id]] جاي prop من الـ router، string.`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "العنوان.",
            "رابط رجوع.",
            "قفلة الـ template."
          ],
          sol: R`بعد البحث الـ URL بقى [[/products?q=%D9%85%D8%A7]] («ما» بعد encoding) والـ list فيها ماوس بس. ولما تعمل refresh البحث بيفضل، لأنه في الـ URL. وزرار Back بيرجّعك للـ list كاملة.

و [[/products/abc]] بتفتح صفحة الـ 404 وفيها [[[ "products", "abc" ]]]: الـ [[(\\d+)]] رفض [[abc]]، فالـ route اللي بعده (الـ catch-all) هو اللي مسك.`
        },
        {
          cmd: "beforeEach",
          title: "تحمي صفحات بـ guard، وصفحات جوه صفحات، و lazy loading",
          desc: R`[[router.beforeEach((to) => ...)]] بيتنفّذ قبل أي انتقال: لو رجّع route تاني، الانتقال بيتحوّل ليه (redirect)، ولو رجّع [[false]] بيتلغي، ولو مرجّعش حاجة بيكمّل. بتستخدمه مع [[meta: { requiresAuth: true }]] على الـ route عشان تحمي صفحات الأدمن.

و [[children]] بيعمل صفحات جوه layout (الأب فيه [[<RouterView />]] تاني)، و [[() => import()]] بيخلي كل صفحة ملف JS لوحده بيتنزّل لما المستخدم يروحلها.`,
          example: R`// src/router/index.ts
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/admin',
      component: () => import('@/views/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'admin', component: () => import('@/views/AdminHome.vue') },
        { path: 'orders', name: 'orders', component: () => import('@/views/AdminOrders.vue') },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const loggedIn = localStorage.getItem('token') !== null
  if (to.meta.requiresAuth && !loggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
router.afterEach((to) => {
  document.title = String(to.name ?? 'shop')
})

// src/views/LoginView.vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function login() {
  localStorage.setItem('token', 'demo')
  router.replace(String(route.query.redirect ?? '/'))
}
</script>

<template>
  <button @click="login">دخول</button>
</template>

// src/views/AdminLayout.vue
<template>
  <nav>
    <RouterLink :to="{ name: 'admin' }">الرئيسية</RouterLink> |
    <RouterLink :to="{ name: 'orders' }">الطلبات</RouterLink>
  </nav>
  <RouterView />
</template>`,
          try: R`امسح [[token]] من localStorage (DevTools ← Application) وادخل [[/admin/orders]]: اتحوّلت لفين؟ اضغط «دخول»: رجعت لفين؟ بعدين اعمل [[npm run build]] وعد ملفات الـ JS في [[dist/assets]]: كل صفحة ليها ملف؟`,
          flag: "script",
          deep: {
            why: R`أي تطبيق فيه صفحات محتاجة login أو صلاحية. من غير guard، كل صفحة لازم تشيّك بنفسها، وأول ما تنسى واحدة تبقى مفتوحة. والـ lazy loading لأن تطبيق فيه ٥٠ صفحة لو اتحمّل كله في ملف واحد، أول فتحة هتبقى بطيئة، والمستخدم غالبًا هيفتح ٣ صفحات بس.`,
            how: R`الـ guards بالترتيب: [[beforeEach]] العام ← [[beforeEnter]] على الـ route ← [[onBeforeRouteUpdate]] و [[onBeforeRouteLeave]] جوه الـ component ← [[beforeResolve]] ← الانتقال ← [[afterEach]]. أي guard ممكن يبقى [[async]] (مثلًا يجيب اليوزر من السيرفر)، والـ router بيستنى.

الـ [[meta]] بتاع كل route في السلسلة بيتجمّع في [[to.meta]]، فلما [[/admin]] عليه [[requiresAuth]]، كل الأولاد ([[/admin/orders]]) بيورثوه. و [[declare module 'vue-router']] بيزوّد [[requiresAuth]] على نوع [[RouteMeta]] فـ TypeScript يعرفه.

[[to.fullPath]] المسار بالـ query، بنحطه في [[redirect]] عشان بعد الدخول نرجّع المستخدم مكانه. و [[router.replace]] بدل [[push]] عشان صفحة الدخول متفضلش في الـ history.

و [[import()]] الديناميكي بيقول لـ Vite «ده chunk منفصل». الـ router بينزّله أول مرة تروح للصفحة ويحتفظ بيه.`,
            when: R`[[beforeEach]] للـ auth والصلاحيات وأي حاجة عامة. [[beforeEnter]] لـ route واحد. و [[onBeforeRouteLeave]] لـ «عندك تعديلات مش محفوظة، متأكد؟». و lazy loading لكل صفحة ما عدا الرئيسية.`,
            mistakes: R`تفتكر إن الـ guard في الفرونت حماية: أي حد يقدر يفتح الكود أو يغيّر localStorage. الحماية الحقيقية على السيرفر (الـ API ترفض من غير token صح)، والـ guard للتجربة بس. وتعمل redirect لـ [[login]] من غير ما تستثني [[login]] نفسها لو عليها meta، فتعمل loop لا نهائي. وتستخدم [[next()]] (الشكل القديم) وتنساه في فرع فالتنقل يقف: في Vue Router 4 و 5 رجّع القيمة بدل [[next]].`
          },
          teach: R`## الفكرة: guard بيقرر قبل كل انتقال، والصفحات بتتحمّل لما تحتاجها

كمّلنا على نفس المشروع (Vue Router 5.4.0): مسحنا الـ token، ودخلنا [[/admin/orders]]، وضغطنا «دخول»، وبعدين «الرئيسية». وبعدين [[npm run build]].

---

## ١. [[declare module 'vue-router']]

~~~text router/index.ts
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}
~~~

TypeScript: «نوع [[RouteMeta]] اللي في vue-router فيه كمان [[requiresAuth]] اختياري». من غيره [[to.meta.requiresAuth]] نوعه [[unknown]].

---

## ٢. الـ nested routes

~~~text router/index.ts
{
  path: '/admin',
  component: () => import('@/views/AdminLayout.vue'),
  meta: { requiresAuth: true },
  children: [
    { path: '', name: 'admin', ... },
    { path: 'orders', name: 'orders', ... },
  ],
}
~~~

| URL | اللي بيترسم |
|---|---|
| [[/admin]] | [[AdminLayout]] وجواه [[AdminHome]] (الـ child اللي path بتاعه فاضي) |
| [[/admin/orders]] | [[AdminLayout]] وجواه [[AdminOrders]] |

[[AdminLayout]] فيه [[<RouterView />]] تاني: ده مكان الابن. والـ [[nav]] فوق بيفضل ثابت.

---

## ٣. الـ guard

~~~text router/index.ts
router.beforeEach((to) => {
  const loggedIn = localStorage.getItem('token') !== null
  if (to.meta.requiresAuth && !loggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
~~~

- [[to]]: الـ route اللي رايحله.
- [[localStorage.getItem('token') !== null]]: فيه token؟ (مثال بسيط، في الحقيقة من Pinia store).
- لو الصفحة محمية ومفيش login: رجّع route تاني، فالـ router يروح له بدل الأصلي.
- مرجّعناش حاجة في الحالة التانية: كمّل عادي.

و [[afterEach]] بعد ما الانتقال يخلص: بيحط اسم الـ route في عنوان التاب.

---

## ٤. [[LoginView]]

[[localStorage.setItem('token', 'demo')]] وبعدين [[router.replace(redirect ?? '/')]]: ارجع للصفحة اللي كان رايحلها، ومن غير ما صفحة الدخول تفضل في الـ history.

---

## ٥. الناتج

~~~text الناتج (الخطوة | الـ URL | الـ title | نص الصفحة)
guard    | /login?redirect=/admin/orders | login  | دخول
login    | /admin/orders                 | orders | الرئيسية | الطلباتالطلبات
nested   | /admin                        | admin  | الرئيسية | الطلباتلوحة التحكم

active class: [ 'الرئيسية:router-link-active router-link-exact-active', 'الطلبات:' ]
~~~

### نقرا الناتج

| السطر | ليه |
|---|---|
| [[guard]] | [[to.meta.requiresAuth]] جه من الأب [[/admin]] (الـ meta بيتورث)، ومفيش token، فاتحوّلنا ومعانا [[redirect]] |
| [[login]] | اتحفظ token و [[replace]] رجّعنا لـ [[/admin/orders]]: الـ nav من الـ layout و «الطلبات» من الابن |
| [[nested]] | [[/admin]]: نفس الـ layout، والابن [[AdminHome]] |
| [[active class]] | [[RouterLink]] بيحط [[router-link-active]] و [[router-link-exact-active]] على الرابط بتاع الصفحة الحالية، فتلوّنه بـ CSS |

---

## ٦. lazy loading في الـ build

~~~text الناتج (npm run build، مختصر)
dist/assets/AdminOrders-BGNMsMQA.js     0.16 kB │ gzip:  0.17 kB
dist/assets/AdminHome-CKDJfJpL.js       0.17 kB │ gzip:  0.17 kB
dist/assets/NotFound-CZGpJtRe.js        0.24 kB │ gzip:  0.23 kB
dist/assets/LoginView-B2NMDPY5.js       0.28 kB │ gzip:  0.25 kB
dist/assets/ProductView-B77lyapU.js     0.36 kB │ gzip:  0.30 kB
dist/assets/AdminLayout-HHdR8w3r.js     0.44 kB │ gzip:  0.31 kB
dist/assets/ProductsView-CgqwBCz0.js    0.71 kB │ gzip:  0.50 kB
dist/assets/index-BLIouYLa.js         110.87 kB │ gzip: 42.71 kB
~~~

كل [[() => import()]] بقى ملف لوحده. [[index]] فيه Vue والـ router والـ [[HomeView]] (اللي اتعمله import عادي). اللي بيفتح الرئيسية بس مش بينزّل كود الأدمن خالص.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[router.beforeEach((to) => ...)]] | قبل كل انتقال |
| [[return { name: 'login' }]] | حوّله |
| [[return false]] | الغي |
| مرجّعتش حاجة | كمّل |
| [[meta: { requiresAuth: true }]] | علامة على الـ route، وبتتورث للأولاد |
| [[children: [...]]] | صفحات جوه layout فيه [[<RouterView />]] |
| [[() => import('...')]] | ملف لوحده، بيتنزّل لما تحتاجه |
| [[router.replace]] | من غير ما يزوّد في الـ history |`,
          lines: [
            "زوّد على نوع الـ meta في vue-router...",
            R`[[RouteMeta]]...`,
            R`فيه [[requiresAuth]] اختياري.`,
            "قفلة الـ interface.",
            "قفلة الـ declare.",
            "اعمل الراوتر...",
            "بـ URLs عادية.",
            "الصفحات:",
            "صفحة الدخول، lazy.",
            "صفحة الأدمن:",
            R`المسار [[/admin]].`,
            "الـ layout، lazy.",
            "محمية.",
            "صفحات جواها:",
            R`[[/admin]] نفسها.`,
            R`[[/admin/orders]].`,
            "قفلة الأولاد.",
            "قفلة صفحة الأدمن.",
            "قفلة الـ routes.",
            "قفلة الراوتر.",
            "قبل كل انتقال...",
            "فيه token؟",
            "لو محمية ومفيش دخول...",
            "روح للدخول، ومعاك الصفحة اللي كنت رايحلها.",
            R`قفلة الـ [[if]].`,
            "قفلة الـ guard.",
            "بعد كل انتقال...",
            "عنوان التاب = اسم الـ route.",
            "قفلة.",
            "script صفحة الدخول.",
            "استورد الـ route والـ router.",
            "الـ URL الحالي.",
            "أداة التنقل.",
            "دالة الدخول...",
            "احفظ token.",
            "ارجع للصفحة اللي كان رايحلها من غير ما الدخول يفضل في الـ history.",
            "قفلة الدالة.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "زرار الدخول.",
            "قفلة الـ template.",
            "template الـ layout.",
            "منيو ثابت.",
            "رابط للرئيسية بتاعة الأدمن.",
            "رابط للطلبات.",
            "قفلة المنيو.",
            "مكان الصفحة الابن.",
            "قفلة الـ template."
          ],
          sol: R`من غير token، [[/admin/orders]] بيحوّلك لـ [[/login?redirect=/admin/orders]]. «دخول» بيرجّعك لـ [[/admin/orders]]، وزرار Back مش بيرجّعك لصفحة الدخول لأننا استخدمنا [[replace]].

وفي [[dist/assets]] هتلاقي ملف لكل صفحة lazy ([[LoginView-xxxx.js]] و [[AdminLayout-xxxx.js]] و [[AdminOrders-xxxx.js]]...)، وكلهم أقل من 1 KB، والكبير [[index-xxxx.js]] فيه Vue والـ router.`
        }
      ]
    }
]);

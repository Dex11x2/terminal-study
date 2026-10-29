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
| [[<RouterView />]] | المكان اللي component الـ URL الحالي بيترسم فيه (في [[App.vue]] عادةً) |
| [[<RouterLink :to="{ name, params }">]] | رابط من غير reload |
| [[route.params.id]] | جزء من المسار، string |
| [[route.query.q]] | قيمة [[q]] اللي بعد [[?]] في الـ URL، ممكن تبقى string أو array لو اتكررت |
| [[router.push(...)]] | انتقل (وBack بيرجع) |
| [[router.replace(...)]] | انتقل من غير ما تزوّد في الـ history |
| [[props: true]] | الـ params كـ props |
| [[/:pathMatch(.*)*]] | بيمسك أي مسار ملوش route تاني، فتعرض فيه صفحة 404 |`,
          lines: [
            R`بنستورد من [[vue-router]] حاجتين: [[createRouter]] اللي بيعمل الراوتر نفسه، و [[createWebHistory]] اللي بيحدد شكل الـ URLs (عادية من غير [[#]]).`,
            R`بنستورد صفحة الرئيسية import عادي (مش lazy)، فكودها بيبقى جوه الملف الأساسي وبيظهر على طول أول ما الموقع يفتح، لأنها أول صفحة المستخدم بيشوفها غالبًا.`,
            R`بنعمل الراوتر ونديله object الإعدادات. ده object واحد للتطبيق كله، وبنصدّره في آخر الملف عشان [[main.ts]] يركّبه.`,
            R`[[createWebHistory]] بيخلي الـ URL شكله عادي ([[/products/2]]) باستخدام History API بتاع المتصفح. و [[import.meta.env.BASE_URL]] جاي من Vite: [[/]] إلا لو الموقع مرفوع في فولدر فرعي، فالراوتر يحط الفولدر ده قبل كل مسار.`,
            R`[[routes]] هي القايمة اللي بتربط كل مسار بالـ component بتاعه. الراوتر بيقارن الـ URL بالقايمة دي ويختار أنسب route.`,
            R`الصفحة الرئيسية: [[path]] هو الـ URL، و [[name]] اسم تستخدمه في الروابط بدل ما تكتب المسار، و [[component]] الصفحة اللي هتترسم.`,
            R`صفحة المنتجات lazy: [[() => import(...)]] معناها «نزّل الملف ده أول مرة حد يروح للصفحة دي بس»، فـ Vite بيعمله ملف JS لوحده والتحميل الأول بيبقى أخف.`,
            R`صفحة منتج واحد: [[:id]] جزء متغير من الـ URL، و [[(\d+)]] regex بيقبل أرقام بس (الـ [[\]] متكررة لأننا جوه string في JS). و [[props: true]] بيبعت [[id]] للصفحة كـ prop بدل ما هي تقراه من الراوتر.`,
            R`الـ catch-all: [[(.*)*]] بيمسك أي مسار ملوش route تاني، فده صفحة الـ 404. و [[pathMatch]] بيبقى array من أجزاء المسار (لـ [[/products/abc]] بيبقى [[products]] و [[abc]]) بسبب الـ [[*]] اللي في الآخر.`,
            R`قفلة الـ array بتاعة [[routes]].`,
            R`قفلة object الإعدادات وقوس [[createRouter]].`,
            R`بنصدّر الراوتر عشان [[main.ts]] يعمل [[app.use(router)]]. من غير السطر ده [[<RouterView>]] و [[<RouterLink>]] و [[useRoute]] مش هيشتغلوا خالص.`,
            R`بداية الـ script بتاع صفحة المنتجات. [[setup]] معناها الكود ده بيتنفّذ مرة لكل نسخة من الـ component، وكل متغير فيه متاح في الـ template على طول.`,
            R`بنستورد [[computed]] عشان نعمل قيم بتتحسب من الـ URL وتتحدّث لوحدها لما يتغير.`,
            R`[[useRoute]] بيدّيك الـ route الحالي (الـ URL والـ params والـ query)، و [[useRouter]] بيدّيك أداة التنقل. اسمهم شبه بعض فخلي بالك: route = «أنا فين»، router = «روح فين».`,
            R`[[route]] object reactive للـ URL الحالي: أي حاجة بتقرا منه (زي الـ computed اللي تحت) بتتحسب تاني لوحدها لما الـ URL يتغير.`,
            R`[[router]] فيه [[push]] و [[replace]] و [[back]]، بنستخدمه عشان نغيّر الـ URL من الكود (مش من رابط).`,
            R`بيانات ثابتة للتجربة (array عادي مش ref)، لأنها مش هتتغير. في مشروع حقيقي بتيجي من API.`,
            R`منتج أول: [[id]] رقم هنستخدمه في الرابط وفي الـ [[:key]]، و [[name]] اللي بيظهر.`,
            R`منتج تاني بنفس الشكل. ده اللي هيفضل لوحده لما تبحث عن «ما».`,
            R`منتج تالت بنفس الشكل.`,
            R`قفلة الـ array بتاعة المنتجات.`,
            R`[[q]] نص البحث من الـ URL ([[?q=...]]). [[??]] بيدّي نص فاضي لو مفيش [[q]]، و [[String]] لأن الـ query ممكن تيجي array لو [[q]] اتكرر في الـ URL. ولأنه computed على [[route]]، أي تغيير في الـ URL بيحدّثه.`,
            R`المنتجات اللي هتتعرض: [[filter]] بيسيب اللي اسمه فيه نص البحث. [[q.value]] لأن [[q]] computed (ref) وإحنا في الـ script، و [[includes('')]] بيرجّع true فلما البحث فاضي كل المنتجات بتظهر.`,
            R`الدالة اللي بتتنادى لما الـ input يتغير، وبتاخد الـ event نفسه عشان تقرا القيمة منه.`,
            R`بنحط النص في الـ URL بدل متغير: [[push]] من غير [[path]] بيفضل في نفس الصفحة ويغيّر الـ query بس. و [[as HTMLInputElement]] بيقول لـ TypeScript إن الـ target ده input فيه [[value]]. والفايدة: الـ refresh وزرار Back واللينك المبعوت كلهم بيحتفظوا بالبحث.`,
            R`قفلة دالة [[search]] بتاعة البحث.`,
            R`قفلة الـ script بتاع صفحة المنتجات.`,
            R`بداية الـ template بتاع صفحة المنتجات: الـ HTML اللي Vue بيرسمه.`,
            R`[[:value="q"]] بيعرض نص البحث اللي في الـ URL (اتجاه واحد، مش [[v-model]])، و [[@change]] بينادي [[search]] لما تضغط Enter أو تسيب الخانة، مش مع كل حرف، فمفيش entry جديد في الـ history مع كل ضغطة.`,
            R`بداية الـ list بتاعة المنتجات.`,
            R`[[v-for]] بيعمل [[<li>]] لكل منتج في [[shown]]، و [[:key="p.id"]] بيدّي كل عنصر هوية ثابتة عشان Vue يعرف أنهي عنصر اتشال أو اتضاف لما الفلتر يتغير.`,
            R`رابط بالاسم: الراوتر بيبني [[/products/2]] من [[name]] و [[params]] لوحده، فلو غيّرت المسار في [[routes]] بعدين الروابط مش هتبوظ. وبيترسم [[<a>]] بس الضغط عليه مش بيعمل reload.`,
            R`قفلة الـ [[<li>]] بتاع المنتج.`,
            R`قفلة الـ [[<ul>]] بتاعة المنتجات.`,
            R`قفلة الـ template بتاع صفحة المنتجات.`,
            R`بداية الـ script بتاع صفحة منتج واحد (ملف تاني خالص).`,
            R`[[defineProps]] بيعرّف إن الصفحة دي بتستقبل prop اسمه [[id]] نوعه string. هو جاي من الراوتر بسبب [[props: true]]، و string حتى لو أرقام لأن أي حاجة في الـ URL نص. ومش محتاج import، الـ compiler بيعرفه.`,
            R`قفلة الـ script بتاع صفحة المنتج.`,
            R`بداية الـ template بتاع صفحة المنتج.`,
            R`عنوان فيه رقم المنتج من الـ prop. ولو الـ URL اتغير لمنتج تاني من نفس الصفحة، الـ prop بيتحدّث والعنوان معاه.`,
            R`رابط رجوع بمسار مكتوب كنص. [[to]] من غير [[:]] لأنه نص ثابت مش expression.`,
            R`قفلة الـ template بتاع صفحة المنتج.`
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
| [[/admin/orders]] | [[AdminLayout]] بالـ nav بتاعه، وفي الـ [[<RouterView />]] اللي جواه بيترسم [[AdminOrders]] |

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
| [[return { name: 'login' }]] | حوّل الانتقال للـ route ده بدل اللي كان رايحله (redirect) |
| [[return false]] | الغي الانتقال خالص، والمستخدم يفضل في الصفحة اللي هو فيها |
| مرجّعتش حاجة | كمّل |
| [[meta: { requiresAuth: true }]] | علامة على الـ route، وبتتورث للأولاد |
| [[children: [...]]] | صفحات جوه layout فيه [[<RouterView />]] |
| [[() => import('...')]] | ملف لوحده، بيتنزّل لما تحتاجه |
| [[router.replace]] | من غير ما يزوّد في الـ history |`,
          lines: [
            R`بنفتح الـ types بتاعة باكدج [[vue-router]] عشان نزوّد عليها (module augmentation). مش بيغيّر أي كود بيشتغل، ده كلام لـ TypeScript بس. والملف لازم يبقى فيه import أو export (وهو فيه) عشان TypeScript يفهمها إضافة مش تعريف بديل للباكدج.`,
            R`[[RouteMeta]] هو النوع بتاع [[meta]] على أي route. لما نكتب [[interface]] بنفس الاسم، TypeScript بيدمج كلامنا مع النوع الأصلي بدل ما يستبدله.`,
            R`بنقول إن [[meta]] ممكن يبقى فيه [[requiresAuth]] نوعه boolean، والـ [[?]] معناها اختياري (مش لازم كل route يكتبه). من غير ده [[to.meta.requiresAuth]] نوعه [[unknown]] والـ autocomplete مش هيعرفه.`,
            R`قفلة الـ [[interface RouteMeta]] اللي زوّدنا عليها.`,
            R`قفلة الـ [[declare module]] بتاع vue-router.`,
            R`بنعمل الراوتر زي الدرس اللي فات (نفس الـ imports في أول الملف).`,
            R`URLs عادية من غير [[#]] باستخدام History API، و [[BASE_URL]] من Vite لو الموقع في فولدر فرعي.`,
            R`قايمة الصفحات اللي الراوتر بيقارن بيها الـ URL.`,
            R`صفحة الدخول، lazy: ملفها بيتنزّل لما حد يروحلها بس. ملهاش [[meta]]، فالـ guard مش هيمنعها، وده مهم وإلا اللي مش داخل هيتحوّل للدخول وهو فيها فيعمل loop.`,
            R`بداية route الأدمن، وهو هنا object على كذا سطر لأن فيه حاجات كتير.`,
            R`المسار الأب [[/admin]]. أي مسار في [[children]] بيتحط بعده.`,
            R`الـ layout بتاع الأدمن (المنيو الثابت)، lazy برضه، فاللي مش أدمن عمره ما هينزّل كوده.`,
            R`علامة إن الصفحة دي محمية. [[meta]] مجرد بيانات بنحطها على الـ route، والراوتر مش بيعمل بيها حاجة لوحده: الـ guard اللي تحت هو اللي بيقراها. وبتتورث للأولاد، فـ [[/admin/orders]] محمية هي كمان.`,
            R`الصفحات اللي بتترسم جوه الـ layout، في الـ [[<RouterView />]] بتاعه.`,
            R`ابن [[path]] بتاعه فاضي، يعني ده اللي بيترسم على [[/admin]] نفسها. الـ [[name]] على الابن مش الأب، عشان الرابط بالاسم يفتح الـ layout ومعاه الصفحة دي.`,
            R`ابن مساره [[orders]] من غير [[/]] في الأول، فبيبقى [[/admin/orders]]. لو كتبت [[/orders]] هيبقى مسار من الأول خالص مش تحت [[/admin]].`,
            R`قفلة الـ array بتاعة [[children]].`,
            R`قفلة الـ object بتاع route الأدمن.`,
            R`قفلة الـ array بتاعة [[routes]].`,
            R`قفلة object الإعدادات و [[createRouter]].`,
            R`بنسجّل guard بيتنفّذ قبل أي انتقال لأي صفحة، حتى أول فتحة للموقع. [[to]] هو الـ route اللي المستخدم رايحله، ومنه بنقرا الـ meta والمسار.`,
            R`بنشيّك فيه token محفوظ ولا لأ. [[getItem]] بيرجّع [[null]] لو مفيش، فالمقارنة بتطلّع true أو false. ده مثال بسيط، وفي مشروع حقيقي بتقرا اليوزر من Pinia store.`,
            R`لو الصفحة (أو أي أب ليها) عليها [[requiresAuth]] والمستخدم مش داخل، نمنعه.`,
            R`بنرجّع route تاني، فالراوتر يلغي الانتقال الأصلي ويروح للدخول بداله. و [[to.fullPath]] المسار كامل بالـ query، بنحطه في [[redirect]] عشان بعد الدخول نرجّعه مكان ما كان رايح.`,
            R`قفلة الـ [[if]]. ولو الشرط مطلعش true الدالة مبترجّعش حاجة ([[undefined]])، ودي معناها «كمّل الانتقال عادي».`,
            R`قفلة الدالة اللي جوه [[beforeEach]] وقوسها.`,
            R`بنسجّل hook بيتنفّذ بعد ما الانتقال يخلص فعلًا. مبيقدرش يمنع أو يحوّل، مكانه للحاجات اللي بعد التنقل زي العنوان أو analytics.`,
            R`بنحط اسم الـ route في عنوان التاب. [[to.name]] ممكن يبقى [[undefined]] (route من غير اسم) فبنستخدم [[??]] لقيمة افتراضية، و [[String]] لأن الاسم ممكن يبقى Symbol كمان.`,
            R`قفلة الدالة اللي جوه [[afterEach]] وقوسها.`,
            R`بداية الـ script بتاع صفحة الدخول.`,
            R`بنستورد [[useRoute]] عشان نقرا [[redirect]] من الـ URL، و [[useRouter]] عشان نتنقل بعد الدخول.`,
            R`الـ route الحالي، ومنه [[route.query.redirect]] اللي الـ guard حطه.`,
            R`أداة التنقل، هنستخدم منها [[replace]].`,
            R`الدالة اللي بتتنادى لما يضغط «دخول».`,
            R`بنحفظ token تجريبي، فالـ guard يلاقيه في الانتقال الجاي. في الحقيقة الـ token بييجي من رد السيرفر بعد ما يتأكد من الإيميل والباسورد.`,
            R`بنرجّعه للصفحة اللي كان رايحلها، أو الرئيسية لو مفيش [[redirect]]. [[replace]] بدل [[push]] عشان صفحة الدخول تتشال من الـ history، فزرار Back ميرجّعهوش ليها وهو داخل.`,
            R`قفلة دالة [[login]] بتاعة صفحة الدخول.`,
            R`قفلة الـ script بتاع صفحة الدخول.`,
            R`بداية الـ template بتاع صفحة الدخول.`,
            R`زرار بينادي [[login]] لما يتضغط. [[@click]] اختصار [[v-on:click]].`,
            R`قفلة الـ template بتاع صفحة الدخول.`,
            R`بداية الـ template بتاع الـ layout (ملف [[AdminLayout.vue]]، ملوش script لأنه مش محتاج state).`,
            R`منيو الأدمن. بيفضل ثابت وإنت بتتنقل بين صفحات الأدمن، لأن اللي بيتغير هو الابن بس.`,
            R`رابط للرئيسية بتاعة الأدمن بالاسم. الـ [[|]] اللي بعده نص عادي بيفصل بين الرابطين. والرابط بتاع الصفحة الحالية بياخد كلاس [[router-link-active]] تلوّنه بيه.`,
            R`رابط لصفحة الطلبات بالاسم، والراوتر بيبني [[/admin/orders]].`,
            R`قفلة الـ [[<nav>]] بتاع منيو الأدمن.`,
            R`المكان اللي الصفحة الابن ([[AdminHome]] أو [[AdminOrders]]) بتترسم فيه. من غيره الـ layout يظهر والأولاد عمرهم ما هيظهروا.`,
            R`قفلة الـ template بتاع الـ layout.`
          ],
          sol: R`من غير token، [[/admin/orders]] بيحوّلك لـ [[/login?redirect=/admin/orders]]. «دخول» بيرجّعك لـ [[/admin/orders]]، وزرار Back مش بيرجّعك لصفحة الدخول لأننا استخدمنا [[replace]].

وفي [[dist/assets]] هتلاقي ملف لكل صفحة lazy ([[LoginView-xxxx.js]] و [[AdminLayout-xxxx.js]] و [[AdminOrders-xxxx.js]]...)، وكلهم أقل من 1 KB، والكبير [[index-xxxx.js]] فيه Vue والـ router.`
        }
      ]
    }
]);

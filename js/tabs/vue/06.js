// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "الفورمات وبيانات السيرفر",
      l: 2,
      n: "VeeValidate و zod للـ validation، و composable فيه loading و error، و TanStack Query للكاش",
      items: [
        {
          cmd: "VeeValidate + zod",
          title: "فورم فيه validation ورسايل أخطاء: VeeValidate و zod",
          desc: R`VeeValidate (4.15) بتدير حالة الفورم: القيم، والأخطاء، و touched، وإمتى تعمل validate، وحالة الـ submit. و zod بتوصف شكل البيانات الصح ([[z.string().email()]]) ورسالة كل غلطة. بتربطهم بـ [[toTypedSchema]] من [[@vee-validate/zod]]، فالأنواع في TypeScript بتطلع من الـ schema نفسها.

[[defineField('email')]] بيرجّع [[[value, attrs]]]: الـ value للـ [[v-model]]، والـ attrs ([[onBlur]] وغيره) بـ [[v-bind]]. و [[handleSubmit(fn)]] مش بينادي [[fn]] إلا لو كل حاجة صح.`,
          example: R`<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'الإيميل مطلوب').email('إيميل مش صحيح'),
    password: z.string().min(8, '٨ حروف على الأقل'),
    age: z.coerce.number({ invalid_type_error: 'اكتب رقم' }).int().min(16, 'لازم ١٦ سنة أو أكتر'),
  }),
)

const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { email: '', password: '' },
})
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [age, ageAttrs] = defineField('age')

const onSubmit = handleSubmit(async (values) => {
  await new Promise((r) => setTimeout(r, 300))
  console.log('sent', JSON.stringify(values))
})
</script>

<template>
  <form novalidate @submit="onSubmit">
    <label for="email">الإيميل</label>
    <input id="email" v-model="email" v-bind="emailAttrs" type="email" :aria-invalid="!!errors.email" />
    <p class="err">{{ errors.email }}</p>
    <label for="password">الباسورد</label>
    <input id="password" v-model="password" v-bind="passwordAttrs" type="password" />
    <p class="err">{{ errors.password }}</p>
    <label for="age">السن</label>
    <input id="age" v-model="age" v-bind="ageAttrs" type="number" />
    <p class="err">{{ errors.age }}</p>
    <button :disabled="isSubmitting">{{ isSubmitting ? 'بيبعت...' : 'سجّل' }}</button>
  </form>
</template>`,
          try: R`[[npm i vee-validate @vee-validate/zod zod]] وحط الفورم. اضغط «سجّل» وهو فاضي، وبعدين اكتب [[sara@]] واخرج من الخانة. بعدين شيل [[initialValues]] واضغط «سجّل» فاضي تاني: الرسايل بقت إيه؟ وزوّد خانة [[confirm]] لازم تساوي [[password]] (بـ [[.refine]]).`,
          flag: "script",
          deep: {
            why: R`فورم التسجيل الحقيقي فيه ١٠ خانات، وكل خانة ليها قواعد ورسالة، والرسالة متظهرش قبل ما المستخدم يلمس الخانة، والزرار يتعطل وقت الإرسال. لو كتبت ده بـ [[ref]] و [[watch]] لكل خانة هيبقى ٢٠٠ سطر. والـ schema (zod) ممكن تتشارك مع الباك إند لو Node، فنفس القواعد في المكانين.`,
            how: R`[[useForm]] بيعمل form context. كل [[defineField]] بيسجّل خانة: الـ value ref مربوط بقيم الفورم، و [[attrs]] فيها [[onBlur]] و [[onChange]] و [[onInput]]. الـ validation الافتراضي: بعد ما الخانة تتلمس (blur) وبعد أي تعديل لخانة اتلمست، وعلى كل الخانات وقت الـ submit.

[[errors]] object فيه أول رسالة لكل خانة غلط. [[handleSubmit(fn)]] بيرجّع دالة بتعمل [[preventDefault]] لوحدها، وتعمل validate للكل، ولو فيه غلط متنادي [[fn]]، ولو صح تنادي [[fn]] بالقيم بعد ما zod يحوّلها ([[age]] بقى رقم بـ [[z.coerce]]). و [[isSubmitting]] بيبقى true طول ما الـ Promise بتاعة [[fn]] شغالة.

ملحوظة نسخ: [[@vee-validate/zod]] 4.15.1 بيطلب [[zod ^3.24]]، فـ npm بيسطّب zod 3.25 (مش zod 4). الكود فوق بـ API zod 3 ([[invalid_type_error]]). وفيه بدايل بتدعم zod 4 و Standard Schema زي [[@tanstack/vue-form]] و FormKit.`,
            when: R`أي فورم فيه أكتر من ٣ خانات أو قواعد حقيقية. ولو خانة واحدة (بحث) أو اتنين، [[v-model]] و [[computed]] كفاية. ولفورمات بتتبني من JSON (أسئلة متغيرة) شوف FormKit.`,
            mistakes: R`تعتمد على validation الفرونت بس: السيرفر لازم يتأكد تاني لأن أي حد يقدر يبعت request من غير الفورم. وتنسى [[initialValues]] فالخانة الفاضية تبقى [[undefined]] و zod يقول [[Required]] بالإنجليزي بدل رسالتك. وتنسى [[novalidate]] فالمتصفح يطلّع رسايله هو قبل VeeValidate. وتكتب [[@submit.prevent="onSubmit"]] وتستغرب إن مفيش مشكلة: [[handleSubmit]] بيعمل [[preventDefault]] لوحده، فالـ [[.prevent]] مش محتاجها.`
          },
          teach: R`## الفكرة: الـ schema بتقول إيه الصح، و VeeValidate بتدير الفورم

شغّلنا الفورم في Chrome headless (Vue 3.5.44، vee-validate 4.15.1، @vee-validate/zod 4.15.1، zod 3.25.76): ضغطنا «سجّل» فاضي، وكتبنا [[sara@]] وخرجنا من الخانة، وبعدين بيانات صح.

---

## ١. الـ schema بـ zod

| السطر | القاعدة |
|---|---|
| [[z.string().min(1, 'الإيميل مطلوب')]] | نص، وطوله ١ على الأقل (يعني مش فاضي) |
| [[.email('إيميل مش صحيح')]] | وشكله إيميل |
| [[z.string().min(8, ...)]] | ٨ حروف على الأقل |
| [[z.coerce.number(...)]] | حوّل القيمة لرقم الأول ([[coerce]] = إجبار)، و [[invalid_type_error]] الرسالة لو مطلعتش رقم |
| [[.int().min(16, ...)]] | عدد صحيح و ١٦ أو أكتر |

و [[toTypedSchema(...)]] بيحوّل الـ schema للشكل اللي VeeValidate بتفهمه، ومعاه الأنواع.

---

## ٢. [[useForm]] و [[defineField]]

~~~text Form.vue
const { defineField, handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: { email: '', password: '' },
})
const [email, emailAttrs] = defineField('email')
~~~

| الحاجة | معناها |
|---|---|
| [[initialValues]] | الخانات تبدأ نص فاضي مش [[undefined]] |
| [[defineField('email')]] | [[[ref, attrs]]] للخانة دي |
| [[v-model="email"]] | القيمة |
| [[v-bind="emailAttrs"]] | events الخانة (blur وغيره) عشان VeeValidate تعرف إمتى تفحص |
| [[errors.email]] | رسالة الغلط أو [[undefined]] |
| [[isSubmitting]] | الـ submit شغال |

و [[:aria-invalid="!!errors.email"]]: الـ [[!!]] بتحوّل أي قيمة لـ true أو false، فالـ screen reader يعرف إن الخانة غلط.

---

## ٣. الناتج

~~~text الناتج (الرسايل الـ ٣)
empty submit   | ["الإيميل مطلوب","٨ حروف على الأقل","اكتب رقم"]
bad email blur | ["إيميل مش صحيح","٨ حروف على الأقل","اكتب رقم"]
button while sending: بيبعت... true
[console.log] sent {"email":"sara@example.com","password":"12345678","age":20}
valid          | ["","",""]
~~~

| السطر | ليه |
|---|---|
| [[empty submit]] | الـ submit بيفحص كل الخانات. [[age]] فاضي فـ [[coerce]] طلّع NaN |
| [[bad email blur]] | الخروج من الخانة فحصها، و [[min(1)]] عدّى و [[email()]] لأ |
| [[بيبعت... true]] | [[isSubmitting]] true طول الـ 300ms، والزرار متعطّل |
| [[sent ...]] | [[age]] وصل رقم [[20]] مش [["20"]] |

وجربنا باسورد [[123]] وسن [[10]]:

~~~text الناتج
errors: ["","٨ حروف على الأقل","لازم ١٦ سنة أو أكتر"]
~~~

---

## ٤. من غير [[initialValues]]

أول تجربة كانت من غيرها:

~~~text الناتج
empty submit | ["Required","Required","Expected number, received nan"]
~~~

الخانات كانت [[undefined]]، و zod بيرفض [[undefined]] كـ «نوع غلط» قبل ما يوصل لـ [[min(1)]]، فطلّع رسالته الإنجليزي. الحل: [[initialValues]] (أو [[required_error]] في [[z.string({...})]]). وده سبب [[invalid_type_error]] في السن.

---

## ٥. [[@submit="onSubmit"]] من غير [[.prevent]]

[[handleSubmit]] بيعمل [[preventDefault]] لوحده، والصفحة معملتش reload.

---

## الخلاصة

| الحاجة | شغلتها |
|---|---|
| zod | القواعد والرسايل والتحويل |
| [[toTypedSchema]] | يربط zod بـ VeeValidate بالأنواع |
| [[defineField]] | [[v-model]] + [[v-bind]] لكل خانة |
| [[errors]] | الرسايل |
| [[handleSubmit(fn)]] | preventDefault + validate + [[fn]] لو صح |
| [[isSubmitting]] | عطّل الزرار |
| [[initialValues]] | متسيبش الخانات [[undefined]] |`,
          lines: [
            "بداية الـ script.",
            R`[[useForm]] من VeeValidate.`,
            "اللي بيربط zod بـ VeeValidate.",
            "zod.",
            "الـ schema...",
            "object فيه:",
            "إيميل: مش فاضي وشكله صح.",
            "باسورد: ٨ على الأقل.",
            "سن: يتحوّل لرقم، صحيح، ١٦ أو أكتر.",
            "قفلة الـ object.",
            R`قفلة [[toTypedSchema]].`,
            "اعمل الفورم وخد منه الأدوات...",
            "بالـ schema...",
            "والقيم الأولى.",
            R`قفلة [[useForm]].`,
            "خانة الإيميل.",
            "خانة الباسورد.",
            "خانة السن.",
            "الـ submit: بيتنادى لو كل حاجة صح بس...",
            "استنى 300ms (مكان الـ API).",
            "اطبع القيم بعد التحويل.",
            "قفلة الدالة.",
            "قفلة الـ script.",
            "بداية الـ template.",
            R`فورم: [[novalidate]] يوقف رسايل المتصفح.`,
            "label مربوط بالإيميل.",
            R`input الإيميل: v-model و attrs و [[aria-invalid]].`,
            "رسالة غلط الإيميل.",
            "label الباسورد.",
            "input الباسورد.",
            "رسالته.",
            "label السن.",
            "input السن.",
            "رسالته.",
            "زرار بيتعطل وقت الإرسال.",
            "قفلة الفورم.",
            "قفلة الـ template."
          ],
          sol: R`فاضي: [[الإيميل مطلوب]] و [[٨ حروف على الأقل]] و [[اكتب رقم]]. [[sara@]] + blur: [[إيميل مش صحيح]].

من غير [[initialValues]]: [[Required]] و [[Required]]، لأن الخانات [[undefined]] و zod بيفشل في النوع قبل [[min(1)]].

و [[confirm]]:`,
          solCode: R`const schema = toTypedSchema(
  z
    .object({
      password: z.string().min(8, '٨ حروف على الأقل'),
      confirm: z.string(),
    })
    .refine((d) => d.password === d.confirm, {
      message: 'الباسورد مش زي بعض',
      path: ['confirm'],
    }),
)`
        },
        {
          cmd: "loading و error",
          title: "تجيب بيانات من API: composable فيه loading و error وإلغاء الطلب القديم",
          desc: R`أي شاشة بتجيب بيانات ليها ٤ حالات: بيحمّل، وفيه خطأ، وفاضي، وفيه بيانات. composable زي [[useFetch(url)]] بيرجّع [[data]] و [[error]] و [[loading]]، وبيعيد الطلب لوحده لما الـ URL يتغير، ويلغي الطلب القديم بـ [[AbortController]] عشان الرد البطيء ميغطّيش على الجديد.

وفي التطوير، [[server.proxy]] في [[vite.config.ts]] بيبعت [[/api]] للباك إند، فمفيش مشاكل CORS.`,
          example: R`// vite.config.ts (جوه defineConfig)
server: {
  proxy: {
    '/api': 'http://localhost:5962',
  },
},

// src/composables/useFetch.ts
import { ref, shallowRef, toValue, watchEffect, onWatcherCleanup, type MaybeRefOrGetter } from 'vue'

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = shallowRef<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  watchEffect(async () => {
    const ctrl = new AbortController()
    onWatcherCleanup(() => ctrl.abort())
    loading.value = true
    error.value = null
    try {
      const res = await fetch(toValue(url), { signal: ctrl.signal })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      data.value = await res.json()
    } catch (e) {
      if ((e as Error).name !== 'AbortError') error.value = (e as Error).message
    } finally {
      if (!ctrl.signal.aborted) loading.value = false
    }
  })

  return { data, error, loading }
}

// src/views/Products.vue
<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'

type Product = { id: number; name: string; price: number }
const q = ref('')
const fail = ref(false)
const { data, error, loading } = useFetch<Product[]>(
  () => '/api/products?q=' + encodeURIComponent(q.value) + (fail.value ? '&fail=1' : ''),
)
</script>

<template>
  <input v-model="q" placeholder="دوّر" />
  <label><input id="fail" v-model="fail" type="checkbox" /> خلّي السيرفر يقع</label>
  <p v-if="loading">بيحمّل...</p>
  <p v-else-if="error" role="alert">حصل خطأ: {{ error }}</p>
  <ul v-else-if="data?.length">
    <li v-for="p in data" :key="p.id">{{ p.name }} - {{ p.price }}</li>
  </ul>
  <p v-else>مفيش نتايج</p>
</template>`,
          try: R`اعمل سيرفر صغير على 5962 (Node أو Express) بيرجّع منتجات على [[/api/products]] ويستنى ٤٠٠ms، و [[?fail=1]] يرجّع 500. اكتب في البحث بسرعة وافتح Network: فيه طلبات [[(canceled)]]؟ وعلّم «خلّي السيرفر يقع». وبعدين اكتب حرف ملوش نتايج.`,
          flag: "script",
          deep: {
            why: R`[[fetch]] لوحده بيرجّع البيانات بس. الشاشة محتاجة كمان تعرض «بيحمّل» وتعرض الخطأ وتعيد الطلب لما البحث يتغير، ومن غير إلغاء هتقابل race condition: المستخدم كتب «ش» (طلب بطيء) ثم «شا» (طلب سريع)، والبطيء رجع الأخير وكتب نتايج غلط. ولو كل component كتب ده لوحده هيتكرر ٢٠ مرة.`,
            how: R`[[MaybeRefOrGetter<string>]] معناها اللي بيناديها يبعت string عادي أو ref أو دالة، و [[toValue()]] بيطلّع القيمة في الحالات التلاتة. ولأن [[toValue(url)]] اتقرت جوه [[watchEffect]]، أي ref جوه الـ getter ([[q]] و [[fail]]) بقى dependency.

كل تغيير: [[onWatcherCleanup]] بتاع المرة اللي فاتت بيشتغل الأول فيعمل [[abort()]]، والـ [[fetch]] القديم بيرمي [[AbortError]] وبنتجاهله. و [[res.ok]] بيبقى false لـ 4xx و 5xx ([[fetch]] مبيرميش error لوحده في الحالات دي، شوف درس «fetch و AbortController» في «تاب JavaScript»). و [[shallowRef]] للبيانات لأنها بتتبدّل كلها كل مرة، فمش محتاجين Vue يعمل Proxy لكل منتج جواها (درس [[v-memo و shallowRef]]).

والـ proxy: المتصفح بيطلب [[localhost:5173/api/products]] من نفس الـ origin، و Vite بيبعته لـ [[localhost:5962]] من السيرفر، فالمتصفح مش شايف إنه cross-origin. ده في [[npm run dev]] بس، وفي الإنتاج nginx أو نفس السيرفر بيعمل كده.`,
            when: R`صفحة أو اتنين بيجيبوا بيانات بسيطة، أو تعلّم إزاي الحاجة دي شغالة. ولما يبقى عندك كاش، وتحديث في الخلفية، و retry، ونفس البيانات في كذا صفحة، و mutations: TanStack Query (الدرس الجاي). وفي Nuxt استخدم [[useFetch]] بتاع Nuxt (المستوى ٣).`,
            mistakes: R`تحط [[loading = false]] في [[finally]] من غير ما تشيّك [[aborted]]: الطلب الملغي بيطفّي الـ loading والجديد لسه شغال. وتنسى [[res.ok]] فرد 500 يتعرض كأنه بيانات. وتعمل [[fetch]] في [[onMounted]] بس فلما البحث يتغير مفيش طلب جديد. وتعرض [[data.length]] من غير [[?.]] وهو لسه [[null]]. وتحط الـ URL كامل [[http://localhost:5962/api]] في الكود فتقابل CORS ويبوظ في الإنتاج.`
          },
          teach: R`## الفكرة: ٣ refs وطلب بيتلغي لو جه طلب أحدث

عملنا سيرفر Node صغير على 5962 بيرجّع ٣ منتجات بعد 400ms (وبعد 900ms لو البحث حرف واحد، عشان نشوف الإلغاء)، و [[?fail=1]] بيرجّع 500. وشغّلنا الصفحة في Chrome headless (Vue 3.5.44، Vite 8.3) وكتبنا «شا» حرف حرف (150ms بينهم).

---

## ١. الـ proxy

~~~text vite.config.ts
server: {
  proxy: {
    '/api': 'http://localhost:5962',
  },
},
~~~

أي طلب بيبدأ بـ [[/api]] على الـ dev server بيتبعت للسيرفر التاني. جربناه بـ curl على Vite نفسه:

~~~text الناتج
curl "http://localhost:5961/api/products?q=%D9%85"
[{"id":2,"name":"ماوس","price":350}]
~~~

---

## ٢. الـ composable

| السطر | معناه |
|---|---|
| [[data = shallowRef<T or null>(null)]] | البيانات، و null في الأول |
| [[error]] و [[loading]] | الحالتين |
| [[watchEffect(async () => ...)]] | شغّل دلوقتي، وأعد لما أي حاجة اتقرت تتغير |
| [[new AbortController()]] | أداة إلغاء لكل طلب |
| [[onWatcherCleanup(() => ctrl.abort())]] | قبل المرة الجاية: الغي ده |
| [[fetch(toValue(url), { signal })]] | الطلب، والـ [[signal]] بيربطه بالـ controller |
| [[if (!res.ok) throw]] | 4xx و 5xx خطأ |
| [[e.name !== 'AbortError']] | الإلغاء مش خطأ نعرضه |
| [[if (!ctrl.signal.aborted)]] | الطلب الملغي ميطفّيش الـ loading |

---

## ٣. الصفحة

- الـ URL getter: [[() => '/api/products?q=' + encodeURIComponent(q.value) + ...]]. [[encodeURIComponent]] بيحوّل العربي والمسافات لشكل ينفع في الـ URL.
- الـ template فيه الـ ٤ حالات بالترتيب: loading، error، بيانات، فاضي.
- [[role="alert"]] بيخلي الـ screen reader يقرا الخطأ أول ما يظهر.

---

## ٤. الناتج

~~~text الناتج (الوقت | الخطوة | اللي على الشاشة)
  108ms page opened    | بيحمّل...
  777ms after 600ms    | كيبورد - 900ماوس - 350شاشة - 4200
 1114ms typed شا       | بيحمّل...
 1720ms after 600ms    | شاشة - 4200
 2349ms fail=1         | حصل خطأ: HTTP 500
~~~

~~~text الناتج (Chrome: الطلبات اللي فشلت)
requestfailed: ?q=ش net::ERR_ABORTED
~~~

~~~text الناتج (لوج السيرفر)
GET /api/products?q= #11
GET /api/products?q=%D8%B4 #12
GET /api/products?q=%D8%B4%D8%A7 #13
~~~

### نقرا الناتج

- طلب «ش» وصل السيرفر (#12)، بس بعد 150ms المستخدم كتب «ا»، فالـ cleanup عمل [[abort()]] والمتصفح قفل الطلب ([[ERR_ABORTED]]). رد «ش» (اللي كان هياخد 900ms) عمره ما وصل الصفحة.
- النتيجة النهائية «شاشة» صح، من طلب «شا».
- مع [[fail]]: الـ 500 بقى [[HTTP 500]] في [[error]].

---

## ٥. في الاختبارات

في درس Vitest اختبرنا الـ component ده بـ [[fetch]] مزيّف: الحالتين (البيانات والخطأ) عدّوا. لو نسيت [[flushPromises()]] الاختبار بيقع، لأن الـ [[fetch]] async.

---

## الخلاصة

| الحالة | إمتى |
|---|---|
| [[loading]] | من بداية الطلب لحد ما يخلص (ومش الملغي) |
| [[error]] | شبكة أو [[!res.ok]]، مش الإلغاء |
| [[data]] | الرد بعد [[res.json()]] |
| فاضي | [[data]] موجود وطوله 0 |
| الإلغاء | [[AbortController]] + [[onWatcherCleanup]] |
| الـ proxy | [[server.proxy]] في التطوير، و nginx في الإنتاج |`,
          lines: [
            "إعدادات الـ dev server...",
            "proxy:",
            R`أي [[/api]] روح للباك إند على 5962.`,
            R`قفلة [[proxy]].`,
            R`قفلة [[server]].`,
            R`استورد [[ref]] و [[shallowRef]] و [[toValue]] و [[watchEffect]] والـ cleanup والنوع.`,
            "composable generic، الـ URL ممكن نص أو ref أو دالة.",
            "البيانات.",
            "الخطأ.",
            "بيحمّل؟",
            "شغّل دلوقتي ولما الـ URL يتغير...",
            "أداة إلغاء للطلب ده.",
            "قبل المرة الجاية: الغيه.",
            "ابدأ التحميل.",
            "امسح الخطأ القديم.",
            "جرّب...",
            "اطلب، والطلب مربوط بالـ controller.",
            "4xx و 5xx خطأ.",
            "حوّل الرد لـ JSON.",
            "لو حصل خطأ...",
            "سجّله، إلا لو كان إلغاء.",
            "في الآخر...",
            "طفّي التحميل لو الطلب ده مش ملغي.",
            "قفلة الـ try.",
            R`قفلة [[watchEffect]].`,
            "رجّع الحالات.",
            "قفلة الدالة.",
            "script الصفحة.",
            R`استورد [[ref]].`,
            R`استورد [[useFetch]].`,
            "نوع المنتج.",
            "نص البحث.",
            "اختبار الخطأ.",
            "هات المنتجات، والـ URL getter...",
            R`...بيقرا [[q]] و [[fail]]، فأي تغيير يعمل طلب جديد.`,
            R`قفلة [[useFetch]].`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "البحث.",
            "checkbox للخطأ.",
            "حالة التحميل.",
            "حالة الخطأ.",
            "فيه بيانات...",
            "منتج في كل سطر.",
            "قفلة الـ list.",
            "فاضي.",
            "قفلة الـ template."
          ],
          sol: R`في Network هتلاقي الطلبات القديمة مكتوب جنبها [[(canceled)]]، والنتيجة النهائية دايمًا من آخر حرف. مع «خلّي السيرفر يقع» بيظهر [[حصل خطأ: HTTP 500]]، والحرف اللي ملوش نتايج بيعرض «مفيش نتايج». ده السيرفر اللي استخدمناه:`,
          solCode: R`// api.mjs
import http from 'node:http'

const products = [
  { id: 1, name: 'كيبورد', price: 900 },
  { id: 2, name: 'ماوس', price: 350 },
  { id: 3, name: 'شاشة', price: 4200 },
]

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  const send = (code, body, ms = 400) =>
    setTimeout(() => {
      res.writeHead(code, { 'content-type': 'application/json' })
      res.end(JSON.stringify(body))
    }, ms)
  if (url.pathname !== '/api/products') return send(404, { message: 'not found' }, 0)
  if (url.searchParams.get('fail')) return send(500, { message: 'السيرفر وقع' })
  const q = url.searchParams.get('q') ?? ''
  send(200, products.filter((p) => p.name.includes(q)), q.length === 1 ? 900 : 400)
}).listen(5962)`
        },
        {
          cmd: "useQuery",
          title: "كاش وتحديث في الخلفية لبيانات السيرفر: TanStack Query لـ Vue",
          desc: R`[[@tanstack/vue-query]] (النسخة 5.105) نفس TanStack Query بتاع React بس لـ Vue: [[useQuery({ queryKey, queryFn })]] بيجيب البيانات ويخزّنها في كاش بالـ key، ويديك [[data]] و [[isPending]] و [[isError]] و [[isFetching]] كـ refs. ولو حطيت ref جوه الـ [[queryKey]] (زي [[['products', q]]])، أي تغيير فيه بيعمل طلب جديد لوحده.

و [[useMutation]] للـ POST و PUT و DELETE، وبعد النجاح [[invalidateQueries]] بيقول «البيانات دي قدمت، هاتها تاني».`,
          example: R`// src/main.ts
import { VueQueryPlugin } from '@tanstack/vue-query'
app.use(VueQueryPlugin, {
  queryClientConfig: { defaultOptions: { queries: { staleTime: 30_000 } } },
})

// src/views/Products.vue
<script setup lang="ts">
import { ref } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

type Product = { id: number; name: string; price: number }
const q = ref('')
const queryClient = useQueryClient()

const { data, isPending, isFetching, isError, error } = useQuery({
  queryKey: ['products', q],
  queryFn: async ({ signal }) => {
    const res = await fetch('/api/products?q=' + encodeURIComponent(q.value), { signal })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    return (await res.json()) as Product[]
  },
})

const addProduct = useMutation({
  mutationFn: (p: Omit<Product, 'id'>) =>
    fetch('/api/products', { method: 'POST', body: JSON.stringify(p) }).then((r) => r.json()),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
})
</script>

<template>
  <input v-model="q" />
  <p v-if="isPending">بيحمّل...</p>
  <p v-else-if="isError" role="alert">{{ error?.message }}</p>
  <ul v-else>
    <li v-for="p in data" :key="p.id">{{ p.name }}</li>
  </ul>
  <small>{{ isFetching ? 'بيحدّث في الخلفية' : 'جاهز' }}</small>
  <button :disabled="addProduct.isPending.value" @click="addProduct.mutate({ name: 'سماعة', price: 600 })">ضيف</button>
</template>`,
          try: R`[[npm i @tanstack/vue-query]] وسجّل الـ plugin. اكتب «ما» وبعدين امسحها: الـ list الكاملة رجعت فورًا ولا اتعمل طلب؟ (بص في Network). اضغط «ضيف»: كام طلب اتعمل؟ وبعدين خلّي [[staleTime]] صفر وكرر.`,
          flag: "script",
          deep: {
            why: R`بيانات السيرفر مختلفة عن state الواجهة: هي نسخة من حاجة عايشة على السيرفر، ممكن تقدم، وكذا component بيحتاجها، ولازم تتعمل retry لو النت فصل. الـ composable اللي فات بيعمل طلب كل مرة ومفيش كاش. TanStack Query بيدّيك كاش بالـ key، وطلب واحد لو ٣ components طلبوا نفس الحاجة، وتحديث لما ترجع للتاب، و retry ٣ مرات، و invalidation بعد أي تعديل.`,
            how: R`الكاش جوه [[QueryClient]] اللي الـ plugin بيعمله. كل query ليها key ([[['products', 'ما']]] بعد ما Vue يفك الـ ref)، والبيانات بتتخزن تحته. [[staleTime]] قد إيه البيانات تفضل «طازة»: طول ما هي طازة، أي component يطلبها ياخدها من الكاش من غير طلب. بعدها بتبقى stale: بتتعرض من الكاش **وفي نفس الوقت** بيتعمل طلب في الخلفية ([[isFetching]] true و [[isPending]] false). و [[gcTime]] (افتراضي ٥ دقايق) إمتى الكاش يتمسح لو محدش بيستخدمه.

في Vue الفرق عن React: الـ return values refs ([[data.value]] في الـ script)، والـ [[queryKey]] بيقبل refs ويراقبها لوحده. و [[queryFn]] بياخد [[signal]] جاهز للإلغاء. و [[invalidateQueries({ queryKey: ['products'] })]] بيعلّم كل query مفتاحها بيبدأ بـ [[products]] إنها stale، ويعيد طلب اللي ظاهرة على الشاشة دلوقتي بس.`,
            when: R`أي تطبيق بيكلم API كتير: dashboards، و lists فيها بحث و pagination، وأي حاجة بتتعدّل. وخلي Pinia للـ state بتاع الواجهة (اليوزر، والثيم، والسلة)، و Query لبيانات السيرفر. وفي Nuxt عادةً [[useFetch]] كفاية، و Query لو محتاج كاش متقدم.`,
            mistakes: R`تكتب [[queryKey: ['products', q.value]]]: كده القيمة اتاخدت مرة والـ query مش هتتغير مع البحث، الصح [[q]] نفسه. وتنسى [[invalidateQueries]] بعد mutation فالـ list متتحدّثش. وتحط البيانات في Pinia كمان «عشان تبقى عامة»: بقى عندك نسختين. وتسيب [[staleTime]] صفر (الافتراضي) وتستغرب من الطلبات الكتير مع كل focus.`
          },
          teach: R`## الفكرة: كاش بالـ key، والـ key فيه ref فبيتغير لوحده

شغّلنا الصفحة في Chrome headless (Vue 3.5.44، @tanstack/vue-query 5.105.0) على نفس سيرفر الدرس اللي فات (زوّدنا عليه [[POST]] بيضيف منتج). كتبنا «ما»، ومسحناها، وضغطنا «ضيف».

---

## ١. الـ plugin في [[main.ts]]

~~~text main.ts
app.use(VueQueryPlugin, {
  queryClientConfig: { defaultOptions: { queries: { staleTime: 30_000 } } },
})
~~~

بيعمل [[QueryClient]] واحد للتطبيق. [[staleTime: 30_000]] = البيانات طازة ٣٠ ثانية (الـ [[_]] في الرقم فاصل للقراية بس، [[30_000]] = 30000).

---

## ٢. [[useQuery]]

| الحتة | معناها |
|---|---|
| [[queryKey: ['products', q]]] | مفتاح الكاش. [[q]] ref، فأي تغيير = key جديد = طلب جديد |
| [[queryFn: async ({ signal }) => ...]] | الدالة اللي بتجيب. [[signal]] للإلغاء جاهز |
| [[throw new Error]] | أي throw = [[isError]] (وبيعمل retry ٣ مرات الأول) |
| [[isPending]] | مفيش بيانات خالص لسه |
| [[isFetching]] | فيه طلب شغال دلوقتي (حتى لو فيه بيانات قديمة معروضة) |

---

## ٣. [[useMutation]]

- [[mutationFn]]: الـ POST.
- [[onSuccess]]: بعد النجاح، [[invalidateQueries({ queryKey: ['products'] })]].
- [[addProduct.isPending.value]]: الـ mutation شغالة (هنا [[.value]] لأنه جوه object مش في أول مستوى).

---

## ٤. الناتج

~~~text الناتج (الوقت | الخطوة | الـ list | small)
   74ms opened           | بيحمّل...        | بيحدّث في الخلفية
  759ms loaded           | كيبوردماوسشاشة   | جاهز
  775ms typed ما         | بيحمّل...        | بيحدّث في الخلفية
 1386ms loaded ما        | ماوس             | جاهز
 1433ms cleared (cache)  | كيبوردماوسشاشة   | جاهز
 1813ms after POST       | كيبوردماوسشاشة   | بيحدّث في الخلفية
 2332ms refetched        | كيبوردماوسشاشةسماعة | جاهز
~~~

~~~text الناتج (لوج السيرفر)
GET /api/products?q= #7
GET /api/products?q=%D9%85%D8%A7 #8
POST /api/products #9
GET /api/products?q= #10
~~~

### نقرا الناتج

| الخطوة | اللي حصل |
|---|---|
| [[typed ما]] | key جديد [[['products', 'ما']]] ملوش كاش، فـ [[isPending]] |
| [[cleared (cache)]] | رجعنا لـ [[['products', '']]]: موجود وطازة، فظهر **فورًا** ومفيش طلب في اللوج |
| [[after POST]] | الـ invalidate علّم الـ queries إنها قديمة. القديمة معروضة و [[isFetching]] true |
| [[refetched]] | طلب #10 رجع ومعاه «سماعة». طلب «ما» متعادش لأنه مش ظاهر دلوقتي |

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[useQuery({ queryKey, queryFn })]] | هات وخزّن |
| ref جوه [[queryKey]] | طلب جديد لما يتغير |
| [[isPending]] | مفيش بيانات خالص |
| [[isFetching]] | طلب شغال (ممكن في الخلفية) |
| [[staleTime]] | قد إيه البيانات تفضل طازة |
| [[useMutation]] + [[invalidateQueries]] | عدّل وبعدين حدّث الـ lists |`,
          lines: [
            "استورد الـ plugin.",
            "سجّله...",
            "والبيانات تفضل طازة ٣٠ ثانية.",
            R`قفلة [[app.use]].`,
            "script الصفحة.",
            R`استورد [[ref]].`,
            "استورد useQuery و useMutation و useQueryClient.",
            "نوع المنتج.",
            "نص البحث.",
            "الكاش نفسه.",
            "هات المنتجات...",
            R`المفتاح فيه [[q]] نفسه (ref).`,
            R`الدالة، ومعاها [[signal]]...`,
            "الطلب.",
            "4xx و 5xx خطأ.",
            "رجّع البيانات.",
            R`قفلة [[queryFn]].`,
            R`قفلة [[useQuery]].`,
            "mutation للإضافة...",
            "الدالة: POST...",
            "بالبيانات.",
            R`بعد النجاح: كل queries [[products]] قدمت.`,
            R`قفلة [[useMutation]].`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "البحث.",
            "مفيش بيانات لسه.",
            "خطأ.",
            "البيانات...",
            "منتج في كل سطر.",
            "قفلة الـ list.",
            "طلب في الخلفية؟",
            "زرار بيضيف ويتعطل وقت الإضافة.",
            "قفلة الـ template."
          ],
          sol: R`لما تمسح «ما» الـ list الكاملة بترجع فورًا من غير أي طلب في Network، لأن [[['products', '']]] في الكاش ولسه طازة. و «ضيف» بيعمل طلبين: [[POST]]، وبعده [[GET ?q=]] بسبب [[invalidateQueries]].

ومع [[staleTime: 0]]: لما ترجع لـ «» البيانات بتظهر فورًا من الكاش برضه، بس بيتعمل طلب في الخلفية كمان ([[isFetching]] true)، لأن البيانات بقت stale على طول.`
        }
      ]
    }
]);

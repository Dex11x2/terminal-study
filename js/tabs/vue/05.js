// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "الـ state المشترك والكود المتكرر",
      l: 2,
      n: "Pinia للـ state اللي كذا صفحة محتاجاه، و provide/inject لشجرة components، و composables للمنطق المتكرر، و Teleport للـ modals",
      items: [
        {
          cmd: "Pinia",
          title: "state مشترك بين الصفحات: Pinia store",
          desc: R`Pinia هي مكتبة الـ state الرسمية لـ Vue (النسخة 4.1). الـ store بيتعمل بـ [[defineStore('cart', () => { ... })]]: جواه refs (الـ state) و computed (الـ getters) ودوال (الـ actions)، بالظبط زي [[<script setup>]]. وأي component بيقول [[useCartStore()]] بياخد **نفس** النسخة.

ولو عايز تعمل destructuring للـ state، استخدم [[storeToRefs(store)]]، وإلا هتاخد قيم ميتة.`,
          example: R`// src/stores/cart.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type CartItem = { id: number; name: string; price: number; qty: number }

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const count = computed(() => items.value.reduce((n, i) => n + i.qty, 0))
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

  function add(p: Omit<CartItem, 'qty'>) {
    const found = items.value.find((i) => i.id === p.id)
    if (found) found.qty++
    else items.value.push({ ...p, qty: 1 })
  }
  function clear() {
    items.value = []
  }

  return { items, count, total, add, clear }
})

// src/components/CartBadge.vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const { count, total } = storeToRefs(cart)
</script>

<template>
  <header>🛒 {{ count }} | {{ total }} EGP <button @click="cart.clear()">فضّي</button></header>
</template>`,
          try: R`في صفحة تانية استخدم [[useCartStore()]] وزرارين بيعملوا [[cart.add(...)]] لمنتجين. الـ badge (في component تاني خالص) بيتحدّث؟ افتح Vue DevTools ← تاب Pinia وشوف الـ state. بعدين في الـ badge اكتب [[const { count } = cart]] من غير [[storeToRefs]]: بيتحدّث؟`,
          flag: "script",
          deep: {
            why: R`السلة بتظهر في الهيدر وصفحة المنتج وصفحة الدفع. لو هتعدّيها props من [[App]] لحد كل واحد، هتعدّي في components مش محتاجاها (prop drilling). الـ store مكان واحد للبيانات دي، وأي component بياخدها مباشرة. و Pinia بتديك DevTools (تشوف كل تغيير وتتنقل بينهم) و SSR آمن في Nuxt.`,
            how: R`[[defineStore('cart', setup)]] بيرجّع دالة [[useCartStore]]. أول نداء بيشغّل الـ setup ويحفظ النتيجة في الـ pinia اللي اتركّبت بـ [[app.use(createPinia())]] في [[main.ts]]، وأي نداء بعده بيرجّع نفس الـ store. الـ store نفسه [[reactive]]: عشان كده [[cart.count]] من غير [[.value]]، وعشان كده الـ destructuring العادي بيكسر الـ reactivity (زي درس [[ref و reactive]]). و [[storeToRefs]] بيعمل refs للـ state والـ getters بس (الدوال بتاخدها عادي).

فيه شكلين: setup store (اللي فوق، زي [[<script setup>]]) و options store ([[defineStore('cart', { state: () => ({}), getters: {}, actions: {} })]]) زي Options API. الاتنين صح، والـ options فيه [[$reset()]] جاهز.

وكل store فيه [[$patch]] (تعدّل كذا حاجة مرة واحدة) و [[$subscribe]] (تسمع لأي تغيير، مثلًا تحفظه في localStorage).`,
            when: R`state بتحتاجه صفحات أو components بعيدة عن بعض: اليوزر الحالي، والسلة، والإعدادات، والثيم. أما state صفحة واحدة (فورم، dropdown مفتوح) فخليه local في الـ component. وبيانات السيرفر (قايمة المنتجات) الأحسن في TanStack Query مش store (درس [[useQuery]]).`,
            mistakes: R`[[const { count } = useCartStore()]] من غير [[storeToRefs]]: القيمة بتتاخد مرة ومش بتتحدّث. وتنادي [[useCartStore()]] برا component قبل [[app.use(pinia)]] (في ملف router مثلًا وقت التحميل): نادِيه جوه الـ guard نفسه. وتنسى ترجّع حاجة من الـ setup store: أي state مش راجع مش هيظهر في DevTools ولا SSR. وتحط كل state التطبيق في store واحد ضخم.`
          },
          teach: R`## الفكرة: نسخة واحدة من البيانات، وأي component بيوصلها

شغّلنا الـ store والـ badge في Chrome headless (Vue 3.5.44، Pinia 4.1.0): صفحة فيها الـ badge وزرارين «ضيف»، ضغطنا كيبورد مرة وماوس مرتين، وبعدين «فضّي». وجربنا الـ destructuring في Node.

---

## ١. [[defineStore('cart', () => {...})]]

| الحتة | معناها |
|---|---|
| [['cart']] | id فريد للـ store (بيظهر في DevTools) |
| [[items = ref<CartItem[]>([])]] | الـ state |
| [[count]] و [[total]] | computed = getters |
| [[add]] و [[clear]] | دوال = actions |
| [[return { ... }]] | لازم ترجّع كل حاجة عايزها تبان برا |

في [[add]]:
- [[Omit<CartItem, 'qty'>]]: النوع [[CartItem]] من غير [[qty]] (utility type من TypeScript)، لأن اللي بيضيف مش بيبعت الكمية.
- [[find]] بيدوّر لو المنتج موجود: يزوّد [[qty]]، وإلا [[push]] بكمية 1. و [[{ ...p, qty: 1 }]] نسخة من [[p]] وعليها [[qty]].

---

## ٢. [[CartBadge]]

~~~text CartBadge.vue
const cart = useCartStore()
const { count, total } = storeToRefs(cart)
~~~

- [[useCartStore()]]: هات الـ store (نفس النسخة عند الكل).
- [[storeToRefs(cart)]]: refs لـ [[count]] و [[total]]، مربوطين بالـ store.
- [[cart.clear()]]: الدوال من الـ store مباشرة.

---

## ٣. الناتج في المتصفح

~~~text الناتج
[console.debug] 🍍 "cart" store installed 🆕
start   | 🛒 0 | 0 EGP فضّي
3 adds  | 🛒 3 | 1600 EGP فضّي
clear   | 🛒 0 | 0 EGP فضّي
~~~

- الـ debug message من Pinia في التطوير: أول مرة حد نادى [[useCartStore()]].
- الزراير في الصفحة و الـ badge في component تاني، وبيشوفوا نفس [[items]]: 900 + 350 × 2 = 1600.

---

## ٤. الـ destructuring و [[storeToRefs]] في Node

~~~text pinia-destructure.mjs
const store = useCounter()
const { n } = store
const { n: nRef, double } = storeToRefs(store)
store.inc(); store.inc()
~~~

~~~text الناتج
store.n = 2 | destructured n = 0 | storeToRefs n = 2 | double = 4
same store: true
after $patch: 10
subscribe: direct {"n":11}
~~~

| السطر | ليه |
|---|---|
| [[destructured n = 0]] | [[const { n } = store]] نسخ الرقم 0 وقتها |
| [[storeToRefs n = 2]] | ref مربوط بالـ store |
| [[same store: true]] | [[useCounter()]] تاني رجّع نفس الـ object |
| [[after $patch: 10]] | [[store.$patch({ n: 10 })]] |
| [[subscribe: direct]] | [[$subscribe]] شاف تغيير مباشر ([[store.n = 11]]) |

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[defineStore('id', () => {...})]] | store بشكل setup |
| [[useXStore()]] | نفس النسخة في كل حتة |
| [[store.x]] | من غير [[.value]] (الـ store reactive) |
| [[storeToRefs(store)]] | destructuring للـ state والـ getters |
| [[store.action()]] | الدوال مباشرة |
| [[$patch]] و [[$subscribe]] | تعديل جماعي، وسمع للتغييرات |`,
          lines: [
            R`استورد [[ref]] و [[computed]].`,
            R`استورد [[defineStore]].`,
            "نوع عنصر السلة.",
            R`store اسمه [[cart]] بشكل setup.`,
            "الـ state: العناصر.",
            "getter: عدد القطع.",
            "getter: الإجمالي.",
            "action: ضيف منتج...",
            "دوّر عليه.",
            "لو موجود زوّد الكمية.",
            "وإلا ضيفه بكمية 1.",
            "قفلة الدالة.",
            "action: فضّي السلة.",
            "array جديد فاضي.",
            "قفلة الدالة.",
            "رجّع كل حاجة عايزها تبان برا.",
            "قفلة الـ store.",
            "script الـ badge.",
            R`استورد [[storeToRefs]].`,
            "استورد الـ store.",
            "هات الـ store.",
            R`refs لـ [[count]] و [[total]].`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "العدد والإجمالي وزرار التفضية.",
            "قفلة الـ template."
          ],
          sol: R`الـ badge بيتحدّث مع كل «ضيف» في صفحة تانية خالص، لأن الاتنين بيستخدموا نفس الـ store. وفي DevTools ← Pinia هتلاقي [[cart]] وجواه [[items]].

ومع [[const { count } = cart]] من غير [[storeToRefs]]: الـ badge بيفضل 0 مهما ضفت، لأنك نسخت القيمة مرة. ده نفس اللي حصل في Node: [[destructured n = 0]] و [[storeToRefs n = 2]].`
        },
        {
          cmd: "provide و inject",
          title: "تبعت بيانات لأي component تحت من غير props: provide و inject",
          desc: R`[[provide(key, value)]] في component بيخلي القيمة متاحة لأي component تحته في الشجرة مهما كان عميق، و [[inject(key)]] بياخدها. بيحل الـ prop drilling (تعدّي prop في ٤ components مش محتاجينه عشان يوصل للخامس).

استخدم [[InjectionKey]] من TypeScript كـ key عشان النوع يوصل، وابعت [[readonly(ref)]] ومعاها دوال التعديل، فالأولاد يقروا بس.`,
          example: R`// src/keys/user.ts
import type { InjectionKey, Ref } from 'vue'

export type User = { name: string; role: 'admin' | 'user' }
export const UserKey: InjectionKey<{ user: Readonly<Ref<User>>; logout: () => void }> = Symbol('user')

// src/App.vue
<script setup lang="ts">
import { provide, readonly, ref } from 'vue'
import { UserKey, type User } from '@/keys/user'
import Middle from './components/Middle.vue'

const user = ref<User>({ name: 'Sara', role: 'admin' })
provide(UserKey, {
  user: readonly(user),
  logout: () => (user.value = { name: 'زائر', role: 'user' }),
})
</script>

<template>
  <Middle />
</template>

// src/components/DeepChild.vue
<script setup lang="ts">
import { inject } from 'vue'
import { UserKey } from '@/keys/user'

const auth = inject(UserKey)
const lang = inject('lang', 'ar')
</script>

<template>
  <p v-if="auth">{{ auth.user.value.name }} ({{ auth.user.value.role }}) - {{ lang }}
    <button @click="auth.logout()">خروج</button>
  </p>
  <p v-else>مفيش provider</p>
</template>`,
          try: R`اعمل [[Middle.vue]] فيه [[<DeepChild />]] بس، وشغّل. اضغط «خروج». بعدين استخدم [[<DeepChild />]] في صفحة مفيهاش [[provide]]: إيه اللي ظهر والـ console قال إيه؟ وجرّب في DeepChild [[auth.user.value.name = 'x']].`,
          flag: "script",
          deep: {
            why: R`فيه بيانات تخص جزء من الشجرة: فورم كبير وكل الحقول محتاجة تعرف الـ form state، أو component جدول وأعمدته، أو tabs وال tab panels. Pinia عامة للتطبيق كله، والـ props متعبة في ٤ مستويات. provide/inject بيربط الجد بالحفيد مباشرة، والبيانات بتتمسح لما الجد يتشال.`,
            how: R`كل component عنده object للـ provides بيورثه من أبوه، و [[provide]] بيزوّد عليه. [[inject(key)]] بيدوّر في الأب، فالجد، لحد الـ app ([[app.provide]] على مستوى التطبيق كله). أول واحد يلاقيه يرجّعه، ولو ملقاش بيرجّع الـ default (التاني في [[inject]]) أو [[undefined]] مع warning.

الـ key ممكن string ([['lang']]) بس الأحسن [[Symbol]] عشان ميحصلش تصادم، و [[InjectionKey<T>]] نوع بيلزق T في الـ Symbol فـ [[inject]] يرجّع [[T | undefined]]. القيمة اللي بتتبعت مش بتبقى reactive لوحدها: لو بعت ref أو reactive بتفضل reactive، لو بعت رقم عادي لأ. و [[readonly(user)]] نسخة لو حد كتب فيها Vue يحذّر ومتتغيرش.`,
            when: R`components مترابطة بتتبني مع بعض (Form و FormField، و Tabs و Tab، و Table و Column)، و plugins ([[app.provide]] للـ i18n أو الإعدادات). وللـ state العام للتطبيق كله استخدم Pinia.`,
            mistakes: R`تبعت قيمة مش reactive وتستغرب إن الأولاد مش بيتحدّثوا. وتسيب الأولاد يعدّلوا البيانات مباشرة فمتعرفش مين غيّر إيه (ابعت [[readonly]] ودوال). وتنادي [[inject]] جوه دالة أو بعد [[await]]: لازم في [[setup]] على طول. وتستخدم string keys في مكتبة فتتصادم مع كود تاني.`
          },
          teach: R`## الفكرة: الجد بيحط القيمة، وأي حفيد بياخدها

شغّلنا في Chrome headless (Vue 3.5.44): [[App]] (provider) ← [[Middle]] (مش بيعمل حاجة) ← [[DeepChild]] (inject). ضغطنا «خروج»، وبعدين فتحنا [[DeepChild]] من غير provider.

---

## ١. الـ key: [[keys/user.ts]]

~~~text keys/user.ts
export const UserKey: InjectionKey<{ user: Readonly<Ref<User>>; logout: () => void }> = Symbol('user')
~~~

| الحتة | معناها |
|---|---|
| [[Symbol('user')]] | قيمة فريدة، مفيش اتنين زيها حتى لو بنفس الاسم |
| [[InjectionKey<...>]] | نوع بيقول «اللي هيتبعت بالـ key ده شكله كده» |
| [[Readonly<Ref<User>>]] | ref للقراية بس |
| [[logout: () => void]] | دالة التعديل |

الملف لوحده عشان الـ provider والـ consumer يستوردوا نفس الـ Symbol.

---

## ٢. الـ provider في [[App.vue]]

~~~text App.vue
provide(UserKey, {
  user: readonly(user),
  logout: () => (user.value = { name: 'زائر', role: 'user' }),
})
~~~

- [[readonly(user)]]: الأولاد يقروا، والتعديل من [[logout]] بس.
- الـ [[logout]] بتغيّر الـ ref الأصلي، فكل اللي عامل inject بيتحدّث.

---

## ٣. الـ consumer في [[DeepChild.vue]]

- [[inject(UserKey)]]: نوعه معروف من الـ key، ونوعه [[... | undefined]] لأن ممكن ميبقاش فيه provider. عشان كده [[v-if="auth"]].
- [[inject('lang', 'ar')]]: key نص، والقيمة الافتراضية [['ar']] لو محدش عمل provide.
- [[auth.user.value.name]]: [[auth.user]] ref، فـ [[.value]] حتى في الـ template لأنه جوه object (الـ template بيفك الـ refs اللي في أول مستوى بس).

---

## ٤. الناتج

~~~text الناتج
1: Sara (admin) - ar خروج
2: زائر (user) - ar خروج
~~~

[[Middle]] معداش أي prop، و [[DeepChild]] وصل للبيانات. وبعد «خروج» اتحدّث لأن [[user]] ref.

---

## ٥. من غير provider

~~~text الناتج
[Vue warn]: injection "Symbol(user)" not found.
  at <DeepChild >
<p>مفيش provider</p>
~~~

[[inject]] رجّع [[undefined]] وطلع warning، و [[v-else]] اشتغل.

---

## ٦. الكتابة في [[readonly]]

~~~text الناتج (Node)
[Vue warn] Set operation on key "name" failed: target is readonly. { name: 'Sara' }
Sara
~~~

التعديل اترفض والقيمة فضلت.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[provide(key, value)]] | متاح لكل اللي تحت |
| [[inject(key)]] | خده من أقرب أب |
| [[inject(key, default)]] | ومعاه قيمة لو مفيش |
| [[InjectionKey<T>]] + [[Symbol]] | key بنوع ومن غير تصادم |
| [[readonly(ref)]] + دوال | الأولاد يقروا بس |
| [[app.provide]] | للتطبيق كله |`,
          lines: [
            "استورد الأنواع بس.",
            "نوع اليوزر.",
            "key فريد بنوع.",
            "script الـ App.",
            R`استورد [[provide]] و [[readonly]] و [[ref]].`,
            "استورد الـ key والنوع.",
            "استورد component في النص.",
            "اليوزر.",
            "ابعت للي تحت...",
            "نسخة للقراية بس.",
            "ودالة التعديل.",
            R`قفلة [[provide]].`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "component في النص مبيعداش حاجة.",
            "قفلة الـ template.",
            "script الحفيد.",
            R`استورد [[inject]].`,
            "استورد نفس الـ key.",
            "خد اليوزر من أقرب أب.",
            "key نص بقيمة افتراضية.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "لو فيه provider: الاسم والدور واللغة...",
            "وزرار خروج.",
            "قفلة الـ p.",
            "وإلا.",
            "قفلة الـ template."
          ],
          sol: R`[[Sara (admin) - ar]]، وبعد «خروج» [[زائر (user) - ar]]: الحفيد اتحدّث من غير ما [[Middle]] يعرف حاجة.

ومن غير provider: [[مفيش provider]] في الصفحة، وفي الـ console [[[Vue warn]: injection "Symbol(user)" not found.]].

و [[auth.user.value.name = 'x']]: warning [[Set operation on key "name" failed: target is readonly.]] والاسم مبيتغيرش. ده فايدة [[readonly]]: التعديل من [[logout]] بس.`
        },
        {
          cmd: "composables",
          title: "تطلّع منطق متكرر في دالة: composables (use...)",
          desc: R`الـ composable دالة اسمها بيبدأ بـ [[use]] بتستخدم [[ref]] و [[watch]] و [[onMounted]] جواها وترجّع refs. أي component يناديها في [[setup]] بياخد نسخة لوحده من المنطق ده. زي الـ custom hook في React.

أمثلة: [[useLocalStorage]] (ref بيتحفظ لوحده)، و [[useOnline]] (النت شغال ولا لأ)، و [[useFetch]] (الدرس الجاي في المستوى ده). ومكتبة VueUse فيها أكتر من ٢٠٠ composable جاهز.`,
          example: R`// src/composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initial: T): Ref<T> {
  const saved = localStorage.getItem(key)
  const value = ref(saved !== null ? JSON.parse(saved) : initial) as Ref<T>
  watch(value, (v) => localStorage.setItem(key, JSON.stringify(v)), { deep: true })
  return value
}

// src/composables/useOnline.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useOnline() {
  const online = ref(navigator.onLine)
  const update = () => (online.value = navigator.onLine)
  onMounted(() => {
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
  })
  onUnmounted(() => {
    window.removeEventListener('online', update)
    window.removeEventListener('offline', update)
  })
  return online
}

// src/App.vue
<script setup lang="ts">
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useOnline } from '@/composables/useOnline'

const theme = useLocalStorage<'light' | 'dark'>('theme', 'light')
const online = useOnline()
</script>

<template>
  <p>theme: {{ theme }} | {{ online ? 'متصل' : 'مفيش نت' }}</p>
  <button @click="theme = theme === 'light' ? 'dark' : 'light'">بدّل</button>
</template>`,
          try: R`اضغط «بدّل» واعمل refresh: الثيم فضل؟ افتح DevTools ← Network واختار Offline: النص اتغير؟ بعدين اعمل [[useCounter(start)]] بيرجّع [[{ count, inc, dec }]] واستخدمه مرتين في نفس الـ component: كل واحد ليه عدّاد لوحده؟`,
          flag: "script",
          deep: {
            why: R`نفس المنطق بيتكرر في components كتير: «اقرا من localStorage واحفظ لما يتغير»، و «اسمع لـ event على window وشيله لما الـ component يمشي». من غير composable هتنسخه، وأول ما تنسى [[removeEventListener]] في واحد يبقى عندك leak. في Vue 2 كان الحل mixins، ومشكلتها إنك مش عارف كل خاصية جاية منين وأساميها بتتصادم.`,
            how: R`الـ composable دالة عادية، مفيش سحر: لما [[setup]] بتاع component يناديها، أي [[ref]] جواها جديد لهذا النداء، وأي [[onMounted]] أو [[watch]] جواها بيتسجّل على الـ component اللي بيناديها (عشان كده لازم تتنادى في [[setup]] على طول ومش بعد [[await]]). فلما الـ component يتشال، [[onUnmounted]] بتاع الـ composable بيشتغل والـ watchers بتقف لوحدها.

القاعدة: رجّع refs (مش reactive) عشان اللي بيستخدمها يعمل destructuring براحته. ولو بتاخد input ممكن يتغير، اقبل [[MaybeRefOrGetter<T>]] واقراه بـ [[toValue()]] جوه [[watch]] أو [[watchEffect]] (هتشوفها في [[useFetch]]).`,
            when: R`أي منطق فيه state أو lifecycle بيتكرر أو بيطوّل الـ component: الفورم، و pagination، و debounce، و window size، و WebSocket، و permissions. ولو المنطق مفيهوش state (دالة بتحسب حاجة)، دي دالة utils عادية مش composable. وقبل ما تكتب واحد، دوّر في VueUse ([[useStorage]] و [[useOnline]] و [[useDebounceFn]] جاهزين).`,
            mistakes: R`تنادي الـ composable جوه دالة click أو [[setTimeout]]: الـ hooks اللي جواه مش هتتربط بأي component. وتعمل state برا الدالة (في أول الملف) وتستغرب إن كل الـ components بيشاركوه: ده أحيانًا مقصود (state مشترك صغير) بس خليه قرار واعي. وتستخدم [[localStorage]] أو [[window]] في composable هيشتغل في Nuxt على السيرفر: حطها جوه [[onMounted]] أو اتأكد بـ [[import.meta.client]].`
          },
          teach: R`## الفكرة: دالة بتلم ref و watch و lifecycle، وأي component يستخدمها

شغّلنا في Chrome headless (Vue 3.5.44): الصفحة، وضغطنا «بدّل»، وعملنا reload، وبعدين قطعنا النت عن الصفحة ([[setOffline(true)]] في Playwright، زي Offline في DevTools).

---

## ١. [[useLocalStorage<T>(key, initial)]]

| السطر | معناه |
|---|---|
| [[function useLocalStorage<T>]] | generic: النوع بيتحدد من اللي بيناديها |
| [[localStorage.getItem(key)]] | فيه قيمة محفوظة؟ (string أو [[null]]) |
| [[JSON.parse(saved)]] | حوّل النص لقيمة ([['"dark"']] → [['dark']]) |
| [[as Ref<T>]] | قول لـ TypeScript إن ده [[Ref]] من النوع T |
| [[watch(value, v => setItem(...), { deep: true })]] | أي تغيير يتحفظ، حتى لو object اتغير جواه |
| [[return value]] | ref عادي، بيتقرا ويتكتب |

---

## ٢. [[useOnline()]]

- [[navigator.onLine]]: المتصفح شايف نت ولا لأ.
- [[onMounted]]: اسمع لـ [[online]] و [[offline]] على [[window]].
- [[onUnmounted]]: شيلهم. الـ hooks دي بتتربط بالـ component اللي نادى [[useOnline]].

---

## ٣. الاستخدام

~~~text App.vue
const theme = useLocalStorage<'light' | 'dark'>('theme', 'light')
const online = useOnline()
~~~

سطرين، والـ component مش عارف أي حاجة عن localStorage ولا الـ events.

---

## ٤. الناتج

~~~text الناتج (الخطوة | النص | localStorage)
start   | theme: light | متصل     | storage: null
click   | theme: dark  | متصل     | storage: "dark"
reload  | theme: dark  | متصل     | storage: "dark"
offline | theme: dark  | مفيش نت  | storage: "dark"
~~~

| السطر | ليه |
|---|---|
| [[start]] | مفيش حاجة محفوظة، فـ [[initial]] |
| [[click]] | الـ [[watch]] حفظ [["dark"]] (بعلامات التنصيص لأنه JSON) |
| [[reload]] | الصفحة اتعملت من الأول، و [[getItem]] لقى [["dark"]] |
| [[offline]] | الـ event اتنادى والـ ref اتغير |

---

## ٥. كل نداء نسخة لوحده

لو ناديت [[useLocalStorage('a', 1)]] و [[useLocalStorage('b', 2)]] في نفس الـ component، كل واحد ref لوحده و watcher لوحده. ده الفرق عن الـ store: الـ store نسخة واحدة للكل، والـ composable نسخة لكل نداء (إلا لو الـ ref اتعمل برا الدالة).

---

## الخلاصة

| | composable | Pinia store | دالة utils |
|---|---|---|---|
| state | نسخة لكل نداء | نسخة واحدة | مفيش |
| lifecycle | أيوه، مربوط بالـ component | لأ | لأ |
| الاسم | [[useX]] | [[useXStore]] | أي اسم |
| مثال | [[useOnline]] | السلة | [[formatPrice]] |`,
          lines: [
            R`استورد [[ref]] و [[watch]] ونوع [[Ref]].`,
            "composable generic بياخد key وقيمة أولى.",
            "اقرا المحفوظ.",
            "ref من المحفوظ أو القيمة الأولى.",
            "احفظ أي تغيير.",
            "رجّع الـ ref.",
            "قفلة الدالة.",
            "استورد ref والـ hooks.",
            "composable حالة النت.",
            "القيمة دلوقتي.",
            "دالة بتحدّث القيمة.",
            "لما الـ component يترسم...",
            "اسمع لرجوع النت.",
            "واسمع لقطعه.",
            R`قفلة [[onMounted]].`,
            "لما يتشال...",
            "شيل الأول.",
            "وشيل التاني.",
            R`قفلة [[onUnmounted]].`,
            "رجّع الـ ref.",
            "قفلة الدالة.",
            "script الـ App.",
            R`استورد [[useLocalStorage]].`,
            R`استورد [[useOnline]].`,
            "ثيم محفوظ.",
            "حالة النت.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "اعرض الاتنين.",
            "بدّل الثيم (وبيتحفظ لوحده).",
            "قفلة الـ template."
          ],
          sol: R`بعد «بدّل» و refresh الثيم بيفضل [[dark]]، وفي Application ← Local Storage هتلاقي [[theme]] = [["dark"]]. و Offline بيغيّر النص لـ «مفيش نت» على طول.

و [[useCounter]]: كل نداء ليه [[count]] لوحده، لأن الـ [[ref]] بيتعمل جوه الدالة.`,
          solCode: R`// src/composables/useCounter.ts
import { ref } from 'vue'

export function useCounter(start = 0) {
  const count = ref(start)
  const inc = () => count.value++
  const dec = () => count.value--
  return { count, inc, dec }
}

// في أي component
const a = useCounter()
const b = useCounter(10)`
        },
        {
          cmd: "custom directives",
          title: "تعمل directive بتاعك: v-focus و v-click-outside",
          desc: R`الـ custom directive object فيه hooks ([[mounted]] و [[updated]] و [[unmounted]]...) بتاخد العنصر الحقيقي ([[el]]) وتعمل عليه حاجة مباشرة. في [[<script setup>]] أي متغير اسمه بيبدأ بـ [[v]] وبعده حرف كبير ([[vFocus]]) بيبقى directive تستخدمه [[v-focus]].

استخدامها للحاجات اللي محتاجة DOM مباشرة وبتتكرر على عناصر كتير: focus أول ما يظهر، أو تقفل منيو لما تضغط براها، أو tooltip. ولو المنطق فيه state، ده composable مش directive.`,
          example: R`<script setup lang="ts">
import { ref, type Directive } from 'vue'

const vFocus: Directive<HTMLElement> = {
  mounted: (el) => el.focus(),
}

const handlers = new WeakMap<HTMLElement, (e: MouseEvent) => void>()
const vClickOutside: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) binding.value()
    }
    handlers.set(el, handler)
    document.addEventListener('click', handler)
  },
  unmounted(el) {
    document.removeEventListener('click', handlers.get(el)!)
    console.log('listener removed')
  },
}

const open = ref(true)
</script>

<template>
  <input v-focus placeholder="بحث" />
  <div v-if="open" v-click-outside="() => (open = false)" class="menu">
    <button id="inside">جوه المنيو</button>
  </div>
  <p id="outside">برا</p>
</template>`,
          try: R`افتح الصفحة: المؤشر في الـ input من غير ما تضغط؟ اضغط «جوه المنيو» ثم «برا». بعدين اعمل [[vFocus]] global في [[main.ts]] بـ [[app.directive('focus', ...)]] واستخدمه في component تاني.`,
          flag: "script",
          deep: {
            why: R`فيه حاجات صغيرة بتتكرر على عناصر كتير ومحتاجة الـ DOM نفسه: [[focus()]]، أو listener على [[document]]، أو IntersectionObserver لـ lazy image. لو كتبتها في كل component بـ [[useTemplateRef]] و [[onMounted]] و [[onUnmounted]] هتتكرر. الـ directive بيلزقها في العنصر بكلمة واحدة.`,
            how: R`الـ hooks: [[created]] و [[beforeMount]] و [[mounted]] و [[beforeUpdate]] و [[updated]] و [[beforeUnmount]] و [[unmounted]]، وكلهم بياخدوا [[(el, binding, vnode)]]. و [[binding.value]] القيمة اللي بعد [[=]] ([[v-click-outside="fn"]] ← [[fn]])، و [[binding.arg]] اللي بعد [[:]] ([[v-x:top]])، و [[binding.modifiers]] اللي بعد النقطة ([[v-x.once]]). ولو عايز نفس الكود في [[mounted]] و [[updated]] بس، اكتب الـ directive دالة بدل object.

[[Directive<HTMLElement, () => void>]]: النوع الأول نوع العنصر، والتاني نوع [[binding.value]]. و [[WeakMap]] بنحفظ فيها الـ handler بتاع كل عنصر عشان نشيله نفسه في [[unmounted]]، والـ WeakMap بتسيب العنصر يتمسح من الذاكرة. وفي [[<script setup>]] الـ directive المحلي بيتسجّل لوحده من الاسم، وللتطبيق كله [[app.directive('focus', vFocus)]].`,
            when: R`حاجة DOM بحتة بتتكرر: focus، و click outside، و lazy load للصور، و copy to clipboard، و permission بتخبي عنصر ([[v-can="'admin'"]]). وقبل ما تكتب واحد، VueUse فيه [[vOnClickOutside]] و [[vIntersectionObserver]] جاهزين.`,
            mistakes: R`تحط [[addEventListener]] في [[mounted]] من غير ما تشيله في [[unmounted]] (leak، زي درس [[onMounted]]). وتستخدم directive لحاجة فيها state أو منطق كبير (اعمل composable أو component). وتحط directive على component فيه أكتر من root element (Vue بيطلع warning لأنه مش عارف يحطها على أنهي عنصر). وتنسى إن [[mounted]] بتاع directive مش بيشتغل على السيرفر في Nuxt (فيه [[getSSRProps]] لو محتاج attributes).`
          },
          teach: R`## الفكرة: object فيه hooks بتاخد العنصر نفسه

شغّلنا الـ component في Chrome headless (Vue 3.5.44): شفنا مين عليه الـ focus، وضغطنا جوه المنيو وبعدين براها. والـ type-check بـ [[vue-tsc]] عدّى.

---

## ١. [[vFocus]]

~~~text Search.vue
const vFocus: Directive<HTMLElement> = {
  mounted: (el) => el.focus(),
}
~~~

- [[Directive<HTMLElement>]]: نوع directive، والعنصر [[HTMLElement]].
- [[mounted: (el) => el.focus()]]: لما العنصر يدخل الصفحة، حط عليه الـ focus.
- الاسم [[vFocus]] ← في الـ template [[v-focus]]: Vue بيشيل الـ [[v]] ويحوّل CamelCase لـ kebab-case.

---

## ٢. [[vClickOutside]]

| السطر | معناه |
|---|---|
| [[Directive<HTMLElement, () => void>]] | القيمة اللي بعد [[=]] دالة |
| [[new WeakMap<...>()]] | لكل عنصر الـ handler بتاعه |
| [[binding.value]] | الدالة اللي في الـ template: [[() => (open = false)]] |
| [[el.contains(e.target as Node)]] | الضغطة جوه العنصر ولا براه؟ |
| [[document.addEventListener('click', handler)]] | اسمع لأي ضغطة في الصفحة |
| [[unmounted]] | شيل نفس الـ handler |
| [[handlers.get(el)!]] | الـ [[!]] (non-null assertion) بتقول لـ TypeScript «متأكد إنه موجود» |

---

## ٣. الناتج

~~~text الناتج
focused: <input placeholder="بحث">
after inside click, menu: 1
[console.log] listener removed
after outside click, menu: 0
~~~

| السطر | ليه |
|---|---|
| [[focused: <input ...>]] | [[vFocus]] حط الـ focus أول ما الصفحة فتحت |
| [[menu: 1]] بعد الضغط جوه | [[el.contains]] = true، فمحدش نادى الدالة |
| [[listener removed]] | الضغط برا ← [[open = false]] ← [[v-if]] شال المنيو ← [[unmounted]] اتنادى |
| [[menu: 0]] | المنيو اتقفل |

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[const vX: Directive = { mounted(el, binding) {} }]] | directive محلي في [[<script setup>]] |
| [[v-x="value"]] | [[binding.value]] |
| [[v-x:arg.mod]] | [[binding.arg]] و [[binding.modifiers]] |
| [[unmounted]] | نضّف أي listener |
| [[app.directive('x', vX)]] | للتطبيق كله |`,
          lines: [
            "بداية الـ script.",
            R`استورد [[ref]] ونوع [[Directive]].`,
            R`directive اسمه [[v-focus]]...`,
            "لما العنصر يدخل الصفحة: focus.",
            "قفلة.",
            "الـ handler بتاع كل عنصر.",
            R`directive اسمه [[v-click-outside]]، وقيمته دالة.`,
            "لما العنصر يدخل الصفحة...",
            "handler لأي ضغطة...",
            "لو برا العنصر، نادي الدالة.",
            R`قفلة الـ handler.`,
            "احفظه.",
            "اسمع على الصفحة كلها.",
            R`قفلة [[mounted]].`,
            "لما العنصر يتشال...",
            "شيل نفس الـ handler.",
            "اطبع.",
            R`قفلة [[unmounted]].`,
            "قفلة الـ directive.",
            "المنيو مفتوح.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "input بياخد الـ focus لوحده.",
            "منيو بيتقفل لما تضغط براه.",
            "زرار جوه المنيو.",
            "قفلة المنيو.",
            "نص برا.",
            "قفلة الـ template."
          ],
          sol: R`أول ما الصفحة تفتح المؤشر بيبقى في الـ input. الضغط على «جوه المنيو» مش بيقفله، والضغط على «برا» بيقفله ويطبع [[listener removed]].

و global:`,
          solCode: R`// src/main.ts
import type { Directive } from 'vue'

const vFocus: Directive<HTMLElement> = { mounted: (el) => el.focus() }
app.directive('focus', vFocus)

// أي component: <input v-focus />`
        },
        {
          cmd: "Teleport و Transition",
          title: "modal يطلع برا الـ component بـ Teleport، وأنيميشن دخول وخروج بـ Transition",
          desc: R`[[<Teleport to="body">]] بيرسم اللي جواه في مكان تاني في الصفحة (آخر [[<body>]] مثلًا)، مع إنه لسه جزء من الـ component (نفس الـ state والـ events). ده الحل للـ modal والـ toast والـ dropdown اللي بيتقص لما الأب عليه [[overflow: hidden]].

و [[<Transition name="fade">]] بيحط كلاسات على العنصر وهو داخل وخارج ([[fade-enter-from]] و [[fade-leave-to]]...)، فتكتب الأنيميشن بـ CSS، و Vue بيستنى الأنيميشن يخلص قبل ما يشيل العنصر.`,
          example: R`<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="card" style="overflow: hidden; position: relative">
    <button id="open" @click="open = true">افتح</button>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="open" class="backdrop" role="dialog" aria-modal="true">
          <p>متأكد؟</p>
          <button id="close" @click="open = false">اقفل</button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>`,
          try: R`افتح الـ modal وبص في Elements: الـ [[.backdrop]] فين؟ جوه [[.card]] ولا آخر [[<body>]]؟ بعدين شيل [[<Teleport>]] وحط للـ backdrop [[position: fixed; inset: 0]]: بيتقص؟ وغيّر [[0.3s]] لـ [[2s]] وشوف الكلاسات وهي بتتغير.`,
          flag: "script",
          deep: {
            why: R`الـ modal منطقيًا جزء من الـ component اللي فتحه (الزرار والـ state هناك)، بس في الصفحة لازم يبقى فوق كل حاجة. لو اترسم جوه أب عليه [[overflow: hidden]] أو [[transform]] أو [[z-index]] صغير، هيتقص أو يستخبى. Teleport بيفصل «مكانه في الكود» عن «مكانه في الـ DOM». والأنيميشن بتخلي ظهور واختفاء الحاجات مفهوم بدل ما تنط فجأة.`,
            how: R`[[to]] بياخد CSS selector ([[body]] أو [[#modals]]) لعنصر لازم يكون موجود قبل ما الـ component يترسم. الـ component لسه الأب المنطقي: الـ props والـ provide/inject والـ events بتمشي عادي. و [[:disabled="true"]] بيلغي الـ teleport (مثلًا على الموبايل).

[[<Transition>]] بيلف عنصر واحد عليه [[v-if]] أو [[v-show]] أو component متغير. وقت الدخول: [[name-enter-from]] و [[name-enter-active]] أول frame، وبعدين [[enter-from]] يتشال و [[name-enter-to]] يتحط، ولما الـ transition يخلص الكلاسات تتشال. الخروج نفس الكلام بـ [[leave]]، و Vue بيسيب العنصر في الـ DOM لحد ما الأنيميشن يخلص. ولـ list بتستخدم [[<TransitionGroup>]] وكل عنصر بـ [[key]].`,
            when: R`Teleport: modals و dialogs و toasts و tooltips و dropdowns جوه جداول. Transition: أي حاجة بتظهر وتختفي (modal، رسالة، تبديل صفحات مع [[<RouterView v-slot>]]). ومتنساش [[prefers-reduced-motion]] للي عاملين تقليل الحركة.`,
            mistakes: R`[[to="#modals"]] والعنصر مش موجود في [[index.html]] فيطلع warning ومحدش يظهر. وتفتكر إن [[scoped]] CSS مش هيوصل للمحتوى اللي اتنقل: بيوصل عادي، لأن الـ attribute بيتحط على العناصر نفسها. وتحط أكتر من عنصر جوه [[<Transition>]]. وتنسى الـ a11y في الـ modal: focus جواه لما يفتح، و Esc يقفله، والـ focus يرجع للزرار لما يقفل (أو استخدم [[<dialog>]] بتاع HTML).`
          },
          teach: R`## الفكرة: الـ modal في الكود جنب زراره، وفي الـ DOM في آخر الصفحة

شغّلنا في Chrome headless (Vue 3.5.44): ضغطنا «افتح» وطبعنا [[<body>]] بعد 30ms وبعد 430ms، وبعدين «اقفل» وطبعنا كلاسات الـ backdrop.

---

## ١. [[<Teleport to="body">]]

الـ [[.card]] عليه [[overflow: hidden]]: أي حاجة بتطلع براه بتتقص. فبدل ما الـ modal يترسم جواه، Teleport بيرسمه في آخر [[<body>]].

---

## ٢. [[<Transition name="fade">]] و CSS

| الكلاس | إمتى | هنا |
|---|---|---|
| [[fade-enter-from]] | أول frame في الدخول | [[opacity: 0]] |
| [[fade-enter-active]] | طول الدخول | [[transition: opacity 0.3s]] |
| [[fade-enter-to]] | من تاني frame لحد الآخر | (الافتراضي: opacity 1) |
| [[fade-leave-active]] | طول الخروج | [[transition]] |
| [[fade-leave-to]] | من تاني frame في الخروج | [[opacity: 0]] |

الـ [[name="fade"]] هو اللي بيدّي البادئة [[fade-]].

---

## ٣. الناتج بعد 30ms من «افتح»

~~~text الناتج (body، مختصر)
<div id="app" data-v-app="">
  <div class="card" style="overflow: hidden; position: relative;">
    <button id="open">افتح</button>
  </div>
</div>
...
<div class="backdrop fade-enter-active fade-enter-to" role="dialog" aria-modal="true">
  <p>متأكد؟</p><button id="close">اقفل</button>
</div>
~~~

- الـ [[.card]] **مفيهوش** الـ modal.
- الـ backdrop في آخر [[<body>]] (بعد عناصر الـ DevTools اللي create-vue بيحطها، شلناها من الناتج).
- الكلاسات [[fade-enter-active fade-enter-to]]: الأنيميشن شغال.

---

## ٤. بعد 430ms

~~~text الناتج
<div class="backdrop" role="dialog" aria-modal="true">...
~~~

0.3 ثانية عدت، فـ Vue شال كلاسات الأنيميشن.

---

## ٥. الخروج

~~~text الناتج
closing: backdrop fade-leave-active fade-leave-to
closed: gone
~~~

بعد [[open = false]] العنصر **لسه موجود** وعليه كلاسات الخروج، و Vue استنى الـ transition يخلص وبعدين شاله.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[<Teleport to="body">]] | ارسم هنا في الـ DOM، والمنطق فاضل في الـ component |
| [[<Transition name="x">]] | كلاسات [[x-enter-*]] و [[x-leave-*]] |
| [[x-enter-from]] و [[x-leave-to]] | الشكل وهو مش ظاهر |
| [[x-enter-active]] و [[x-leave-active]] | فيهم [[transition]] |
| [[<TransitionGroup>]] | لـ list |`,
          lines: [
            "بداية الـ script.",
            R`استورد [[ref]].`,
            "الـ modal مقفول.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "كارت بيقص أي حاجة تطلع براه.",
            "زرار الفتح.",
            R`ارسم اللي جاي في آخر [[<body>]].`,
            "أنيميشن اسمه fade.",
            "الـ modal، بـ role للـ screen readers.",
            "السؤال.",
            "زرار القفل.",
            "قفلة الـ modal.",
            R`قفلة [[Transition]].`,
            R`قفلة [[Teleport]].`,
            "قفلة الكارت.",
            "قفلة الـ template.",
            "بداية الـ CSS.",
            "وقت الدخول...",
            "والخروج:",
            "انتقال للشفافية في 0.3 ثانية.",
            "قفلة القاعدة.",
            "أول الدخول...",
            "وآخر الخروج:",
            "شفاف.",
            "قفلة القاعدة.",
            "قفلة الـ style."
          ],
          sol: R`الـ [[.backdrop]] بيظهر في آخر [[<body>]] مش جوه [[.card]]. ومن غير Teleport، الـ backdrop جوه الكارت. جربناها: مع [[overflow: hidden]] بس، الـ [[position: fixed]] غطّى الشاشة كلها (1280×720)، لكن لما زوّدنا [[transform: translateZ(0)]] على الكارت بقى 100×50 بس (مقاس الكارت) واتقص، لأن أي [[transform]] أو [[filter]] على أب بيخلي الـ fixed يتحسب منه. Teleport بيبعدك عن المشاكل دي كلها.

ومع [[2s]] نفس الكلاسات بتفضل على العنصر ثانيتين بدل 0.3، وفي القفل العنصر بيفضل موجود ثانيتين.`
        }
      ]
    }
]);

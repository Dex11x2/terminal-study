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
| [[items = ref<CartItem[]>([])]] | الـ state: البيانات نفسها، array فاضي في الأول وبيتغير بالـ actions |
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
| [[after $patch: 10]] | [[store.$patch({ n: 10 })]] غيّر [[n]] لـ 10 في خطوة واحدة |
| [[subscribe: direct]] | [[$subscribe]] شاف تغيير مباشر ([[store.n = 11]]) |

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[defineStore('id', () => {...})]] | store بشكل setup |
| [[useXStore()]] | نفس النسخة في كل حتة |
| [[store.x]] | من غير [[.value]] (الـ store reactive) |
| [[storeToRefs(store)]] | destructuring للـ state والـ getters |
| [[store.action()]] | الـ actions بتناديها من الـ store مباشرة، ومش محتاجة [[storeToRefs]] |
| [[$patch]] و [[$subscribe]] | تعديل جماعي، وسمع للتغييرات |`,
          lines: [
            R`بنستورد [[ref]] (للـ state اللي بيتغير) و [[computed]] (للقيم المحسوبة منه) من Vue نفسها. الـ setup store بيتكتب بنفس أدوات [[<script setup>]] بالظبط، مفيش API جديد تتعلمه.`,
            R`بنستورد [[defineStore]] من Pinia: الدالة اللي بتحوّل الكود ده لـ store مشترك، نسخة واحدة بيشوفها كل الـ components.`,
            R`نوع عنصر السلة في TypeScript. [[export]] عشان أي component يقدر يستخدم النوع ده كمان، وده مجرد type بيتمسح وقت الـ build ومش بيبقى كود.`,
            R`بنعرّف الـ store: [[cart]] هو الـ id الفريد بتاعه (بيظهر في DevTools ولازم ميتكررش)، والدالة هي الـ setup. اللي بيرجع [[useCartStore]]، والعادة إن اسمها [[use...Store]].`,
            R`الـ state: array العناصر في ref، فاضي في الأول. لأنه ref، أي تغيير فيه (push أو تعديل [[qty]] جوه عنصر) بيحدّث كل component بيعرض السلة.`,
            R`getter: عدد القطع كلها. [[reduce]] بيلف على العناصر ويجمع [[qty]] بتاع كل واحد بادئًا من 0. ولأنه [[computed]] مش بيتحسب تاني إلا لما [[items]] تتغير.`,
            R`getter تاني: الإجمالي، سعر كل عنصر في كميته ومجموعهم. نفس فكرة [[count]]، ومحدش بيخزّن الإجمالي في متغير ويحدّثه بإيده فيغلط.`,
            R`action: دالة بتضيف منتج. [[Omit<CartItem, 'qty'>]] معناها نفس شكل [[CartItem]] من غير [[qty]]، لأن اللي بيضيف بيبعت المنتج بس والـ store هو اللي يحسب الكمية.`,
            R`بندوّر لو المنتج موجود في السلة بنفس الـ [[id]]. [[find]] بيرجّع العنصر نفسه (مش نسخة) أو [[undefined]] لو ملقاش.`,
            R`لو موجود بنزوّد الكمية واحد. ولأن [[found]] هو العنصر الأصلي جوه الـ ref (reactive)، التعديل ده لوحده كفاية عشان الـ getters والشاشة يتحدّثوا.`,
            R`لو مش موجود بنضيفه بكمية 1. [[{ ...p, qty: 1 }]] بيعمل object جديد فيه كل خصائص [[p]] وعليها [[qty]]، فمش بنعدّل الـ object اللي اتبعتلنا.`,
            R`قفلة دالة [[add]] (الـ action الأولى).`,
            R`action تانية: تفضّي السلة كلها.`,
            R`بنحط array جديد فاضي مكان القديم. [[.value]] لأن [[items]] ref وإحنا جوه الـ script، والتغيير بيوصل لكل اللي بيعرض السلة.`,
            R`قفلة دالة [[clear]] (الـ action التانية).`,
            R`بنرجّع كل حاجة عايزينها تبان برا الـ store: الـ state والـ getters والـ actions. أي state مش راجع هنا مش هيظهر في DevTools ولا هيتنقل صح في SSR، فلازم ترجّع كل الـ refs.`,
            R`قفلة دالة الـ setup وقوس [[defineStore]].`,
            R`بداية الـ script بتاع component الـ badge اللي في الهيدر (ملف تاني بعيد عن صفحة المنتجات).`,
            R`[[storeToRefs]] بيحوّل الـ state والـ getters بتوع الـ store لـ refs مربوطة بيه، عشان نقدر نعمل destructuring من غير ما نخسر التحديث.`,
            R`بنستورد دالة الـ store اللي عرّفناها. الـ [[@]] اختصار لفولدر [[src]].`,
            R`بنجيب الـ store. أول نداء في التطبيق كله بيعمله، وأي نداء بعده من أي component بيرجّع نفس النسخة، فالـ badge وصفحة المنتجات شايفين نفس [[items]]. والـ store نفسه reactive، فبتكتب [[cart.count]] من غير [[.value]].`,
            R`بناخد [[count]] و [[total]] كـ refs بتتحدّث مع الـ store. لو كتبت [[const { count } = cart]] من غير [[storeToRefs]] هتاخد الرقم بتاع اللحظة دي بس، والـ badge هيفضل 0 مهما ضفت.`,
            R`قفلة الـ script بتاع الـ badge.`,
            R`بداية الـ template بتاع الـ badge.`,
            R`العدد والإجمالي من الـ refs (الـ template بيفك [[.value]] لوحده)، وزرار بينادي الـ action [[cart.clear()]] مباشرة من الـ store. الدوال مش محتاجة [[storeToRefs]] لأنها مش state.`,
            R`قفلة الـ template بتاع الـ badge.`
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
| [[logout: () => void]] | دالة التعديل الوحيدة اللي الأولاد يقدروا يغيّروا بيها اليوزر |

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
| [[app.provide]] | provide على مستوى التطبيق، فأي component فيه يقدر يعمل inject |`,
          lines: [
            R`[[import type]] بيستورد أنواع TypeScript بس، فبيتمسح كله وقت الـ build ومبيضيفش كود. [[InjectionKey]] نوع الـ key اللي بيشيل نوع القيمة، و [[Ref]] نوع الـ ref.`,
            R`نوع اليوزر: [[name]] نص، و [[role]] لازم يبقى [['admin']] أو [['user']] بالظبط (union من نصوص ثابتة)، فلو حد كتب [['Admin']] TypeScript يعترض.`,
            R`الـ key اللي الجد والحفيد هيتقابلوا عليه. [[Symbol('user')]] قيمة فريدة مفيش زيها حتى لو حد عمل Symbol بنفس الاسم، فمفيش تصادم مع مكتبة تانية. والنوع بيقول إن اللي هيتبعت بيه object فيه [[user]] للقراية بس ودالة [[logout]]، فـ [[inject]] بيعرف النوع لوحده. والملف لوحده عشان الاتنين يستوردوا نفس الـ Symbol.`,
            R`بداية الـ script بتاع [[App.vue]]، وهو الجد اللي هيعمل provide.`,
            R`بنستورد [[provide]] (نحط القيمة للي تحت)، و [[readonly]] (نسخة للقراية بس)، و [[ref]] (للـ state نفسه).`,
            R`بنستورد الـ key ونوع [[User]] من نفس الملف. الـ [[type]] قبل [[User]] بتقول إن ده نوع بس، فبيتمسح من الكود النهائي.`,
            R`بنستورد [[Middle]]: component في النص بين الجد والحفيد، مبياخدش ولا بيعدّي أي prop، وده بالظبط اللي بنثبته.`,
            R`اليوزر الحالي في ref، فلما يتغير كل اللي عامل inject بيتحدّث. [[ref<User>]] بيحدد النوع عشان [[role]] يفضل [['admin' | 'user']] مش أي string.`,
            R`[[provide]] بيخلي القيمة دي متاحة لأي component تحت [[App]] مهما كان عميق، بالـ key ده. ولازم يتنادى في الـ setup على طول، مش جوه دالة أو بعد [[await]].`,
            R`بنبعت نسخة [[readonly]] من الـ ref: الأولاد يقروا ويتحدّثوا مع أي تغيير، بس لو حد حاول يكتب فيها Vue يرفض ويطلّع warning. كده التعديل كله من مكان واحد ومعروف.`,
            R`الدالة الوحيدة اللي بتعدّل: بتحط يوزر «زائر» مكان الحالي في الـ ref الأصلي (مش الـ readonly)، فكل اللي عامل inject بيشوف التغيير. الأقواس حوالين الـ assignment بتوضّح إن الـ arrow function بترجّع نتيجة تخصيص مقصود.`,
            R`قفلة الـ object وقوس [[provide]].`,
            R`قفلة الـ script بتاع [[App.vue]].`,
            R`بداية الـ template بتاع [[App.vue]].`,
            R`بنرسم [[Middle]] من غير أي props. جواه [[<DeepChild />]] بس، يعني البيانات هتعدّي مستوى كامل من غير ما حد يلمسها.`,
            R`قفلة الـ template بتاع [[App.vue]].`,
            R`بداية الـ script بتاع [[DeepChild.vue]]، الحفيد اللي محتاج البيانات.`,
            R`بنستورد [[inject]]: بتاخد قيمة عملها provide أي أب فوق.`,
            R`بنستورد نفس الـ key من نفس الملف. لو عملت Symbol جديد هنا بنفس الاسم مش هيلاقي حاجة، لأن كل Symbol فريد.`,
            R`[[inject]] بيدوّر في الأب، فالجد، لحد الـ app، وبيرجّع أول قيمة متسجّلة بالـ key ده. نوعها معروف من الـ key، بس ممكن تبقى [[undefined]] لو مفيش provider فوق (ومعاها warning في الـ console)، عشان كده الـ template بيشيّك عليها.`,
            R`key نص ([['lang']]) ومعاه قيمة افتراضية [['ar']]: لو محدش عمل provide بالاسم ده بيرجّع [['ar']] من غير warning. الـ string key سهل بس ممكن يتصادم مع كود تاني، عشان كده الأحسن Symbol.`,
            R`قفلة الـ script بتاع [[DeepChild.vue]].`,
            R`بداية الـ template بتاع [[DeepChild.vue]].`,
            R`لو فيه provider: بنعرض الاسم والدور واللغة. [[.value]] مكتوبة هنا مع إننا في الـ template، لأن الـ template بيفك الـ refs اللي في أول مستوى بس، و [[auth.user]] ref جوه object عادي.`,
            R`زرار بينادي [[logout]] اللي جاية من الجد. بيغيّر الـ ref الأصلي، فالنص اللي فوقه بيتحدّث لـ «زائر».`,
            R`قفلة الـ [[<p>]] اللي عليه [[v-if]].`,
            R`لو [[auth]] بـ [[undefined]] (مفيش provider فوق) الـ [[v-else]] ده اللي بيظهر بدل ما الصفحة تقع بـ error وهي بتقرا [[auth.user]].`,
            R`قفلة الـ template بتاع [[DeepChild.vue]].`
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
            R`بنستورد [[ref]] و [[watch]] من Vue، ونوع [[Ref]] (بـ [[type]] قدامه عشان يتمسح وقت الـ build). الـ composable بيستخدم نفس أدوات الـ component، مفيش حاجة خاصة.`,
            R`composable اسمه بيبدأ بـ [[use]] (العادة اللي بتقول إنه بيستخدم reactivity أو lifecycle). [[<T>]] generic: نوع القيمة بيتحدد من اللي بيناديه، فـ [[theme]] بيطلع [['light' | 'dark']] مش any. وبياخد اسم المفتاح في localStorage وقيمة أولى لو مفيش حاجة محفوظة.`,
            R`بنقرا القيمة المحفوظة قبل كده. [[getItem]] بيرجّع string أو [[null]] لو المفتاح مش موجود. ده بيتنفّذ مرة واحدة لما الـ component يناديه.`,
            R`لو فيه قيمة محفوظة نحوّلها من نص JSON لقيمتها ([['"dark"']] تبقى [['dark']])، وإلا نستخدم [[initial]]. الـ [[ref]] جديد مع كل نداء، فكل component بياخد نسخته. و [[as Ref<T>]] لأن [[JSON.parse]] بيرجّع any، فبنقول لـ TypeScript النوع الحقيقي.`,
            R`بنراقب الـ ref: أي تغيير يتحفظ في localStorage كنص بـ [[JSON.stringify]]. [[deep: true]] عشان لو القيمة object واتغيرت خاصية جواه يتحفظ برضه، من غيرها الـ watch بيشوف تبديل [[.value]] كله بس. والـ watcher ده بيتربط بالـ component اللي نادى، فبيقف لوحده لما يتشال.`,
            R`بنرجّع الـ ref نفسه، فاللي بيستخدمه يقرا ويكتب فيه زي أي ref، والحفظ بيحصل لوحده من غير ما يعرف.`,
            R`قفلة دالة [[useLocalStorage]]، وبعدها الملف التاني.`,
            R`ملف تاني: بنستورد [[ref]] والـ lifecycle hooks [[onMounted]] و [[onUnmounted]]. لما تتنادى جوه composable بتتسجّل على الـ component اللي ناداه.`,
            R`composable بيرجّع ref فيه حالة النت، بيتحدّث لوحده لما النت يقطع أو يرجع.`,
            R`القيمة الأولى من المتصفح: [[navigator.onLine]] true لو شايف شبكة. بنحطها في ref عشان الشاشة تتحدّث لما تتغير.`,
            R`دالة واحدة بتقرا الحالة تاني وتحطها في الـ ref. محفوظة في متغير عشان نستخدم **نفس** الدالة في الإضافة والشيل، لأن [[removeEventListener]] مبيشيلش غير نفس الـ reference بالظبط.`,
            R`لما الـ component اللي نادى يترسم في الصفحة، نبدأ نسمع للـ events. بنعملها في [[onMounted]] عشان [[window]] موجود ساعتها (وفي SSR مش موجود على السيرفر).`,
            R`المتصفح بيبعت event اسمه [[online]] على [[window]] لما النت يرجع، فبننادي [[update]].`,
            R`و [[offline]] لما النت يقطع، فبننادي نفس الدالة.`,
            R`قفلة الـ arrow function بتاعة [[onMounted]].`,
            R`لما الـ component يتشال من الصفحة، نشيل الـ listeners. من غير ده كل مرة الـ component يتفتح ويتقفل بيفضل listener زيادة على [[window]] (memory leak) وبيحدّث ref ملوش لازمة.`,
            R`بنشيل listener الـ [[online]] بنفس الدالة اللي سجّلناها.`,
            R`وبنشيل listener الـ [[offline]].`,
            R`قفلة الـ arrow function بتاعة [[onUnmounted]].`,
            R`بنرجّع الـ ref بس. اللي بيستخدمه مش محتاج يعرف أي حاجة عن الـ events ولا التنضيف.`,
            R`قفلة دالة [[useOnline]] وآخر الملف.`,
            R`بداية الـ script بتاع [[App.vue]] اللي هيستخدم الاتنين.`,
            R`بنستورد [[useLocalStorage]] من فولدر الـ composables.`,
            R`بنستورد [[useOnline]] من الملف التاني في فولدر الـ composables.`,
            R`ثيم محفوظ بالمفتاح [[theme]] وقيمته الأولى [['light']]. الـ [[<'light' | 'dark'>]] بيحدد النوع، فلو حد حاول يحط [['blue']] TypeScript يعترض. ولازم تنادي الـ composable هنا في الـ setup على طول، مش جوه click أو [[setTimeout]]، وإلا الـ watch والـ hooks اللي جواه مش هيتربطوا بالـ component.`,
            R`حالة النت. نداء واحد وخلاص: الـ listeners بتتسجّل وبتتشال مع الـ component لوحدها.`,
            R`قفلة الـ script بتاع [[App.vue]].`,
            R`بداية الـ template بتاع [[App.vue]].`,
            R`بنعرض الثيم وحالة النت. الاتنين refs في أول مستوى فالـ template بيفك [[.value]] لوحده، و [[? :]] بيختار النص حسب [[online]].`,
            R`الزرار بيبدّل الثيم. في الـ template بتكتب [[theme = ...]] من غير [[.value]] و Vue بيكتب في الـ ref نفسه، فالـ [[watch]] اللي جوه الـ composable بيحفظ القيمة الجديدة لوحده.`,
            R`قفلة الـ template بتاع [[App.vue]].`
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
| [[menu: 0]] | المنيو اتشال من الصفحة، فمبقاش فيه [[.menu]] خالص |

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[const vX: Directive = { mounted(el, binding) {} }]] | directive محلي في [[<script setup>]] |
| [[v-x="value"]] | القيمة اللي بعد [[=]] بتوصلك في [[binding.value]] |
| [[v-x:arg.mod]] | اللي بعد [[:]] في [[binding.arg]]، واللي بعد النقطة في [[binding.modifiers]] |
| [[unmounted]] | نضّف أي listener |
| [[app.directive('x', vX)]] | تسجّله global فيشتغل في أي component من غير import |`,
          lines: [
            R`بداية الـ script. الـ directives المحلية بنعرّفها هنا كمتغيرات عادية، ومش محتاجين نسجّلها في أي حتة.`,
            R`بنستورد [[ref]] للمنيو المفتوح، ونوع [[Directive]] من TypeScript عشان الـ hooks تعرف نوع [[el]] و [[binding]].`,
            R`directive اسمه [[vFocus]]. أي متغير في [[<script setup>]] اسمه [[v]] وبعده حرف كبير بيبقى directive، و Vue بيحوّل الاسم لـ [[v-focus]] في الـ template. و [[Directive<HTMLElement>]] بيقول إن العنصر اللي هيتحط عليه HTML element.`,
            R`hook الـ [[mounted]] بيتنادى مرة واحدة بعد ما العنصر الحقيقي يدخل الصفحة، وبياخد العنصر نفسه في [[el]]. فبنعمل [[focus()]] عليه، فالمؤشر يبقى في الخانة من غير ما المستخدم يضغط. لو عملناها قبل الـ mount العنصر مش في الصفحة والـ focus مش هيشتغل.`,
            R`قفلة object الـ [[vFocus]].`,
            R`[[WeakMap]] بيحفظ الـ handler بتاع كل عنصر، عشان في [[unmounted]] نشيل نفس الدالة بالظبط. Weak لأنه مش بيمسك العنصر في الذاكرة: لما العنصر يتشال ويتنسى، المدخل بتاعه بيتمسح لوحده.`,
            R`directive تاني اسمه [[vClickOutside]] (في الـ template [[v-click-outside]]). النوع التاني في [[Directive<HTMLElement, () => void>]] هو نوع القيمة اللي بتتكتب بعد [[=]]: هنا دالة من غير arguments.`,
            R`hook الـ [[mounted]]، وبياخد كمان [[binding]]: object فيه [[value]] (القيمة اللي بعد [[=]]) و [[arg]] و [[modifiers]].`,
            R`بنعمل الدالة اللي هتتنادى مع أي ضغطة في الصفحة، وبتاخد الـ event عشان نعرف اتضغط على إيه.`,
            R`[[e.target]] العنصر اللي اتضغط عليه، و [[el.contains]] بيقول هو جوه المنيو (أو المنيو نفسه) ولا لأ. لو برا، بننادي الدالة اللي في [[binding.value]]. و [[as Node]] لأن TypeScript شايف [[target]] نوعه عام و [[contains]] محتاجة Node.`,
            R`قفلة دالة [[handler]] اللي بتتنادى مع كل ضغطة.`,
            R`بنحفظ الـ handler للعنصر ده في الـ WeakMap، عشان نوصله تاني وقت الشيل.`,
            R`بنسمع للضغط على [[document]] كله مش على العنصر، لأن الضغطة اللي تهمّنا هي اللي **برا** العنصر.`,
            R`قفلة الـ [[mounted]] بتاع [[vClickOutside]].`,
            R`hook الـ [[unmounted]] بيتنادى لما العنصر يتشال من الصفحة (هنا لما [[v-if]] يبقى false).`,
            R`بنشيل نفس الـ handler من [[document]]. من غير ده كل مرة المنيو يتفتح ويتقفل بيفضل listener زيادة بيتنادى مع كل ضغطة (memory leak). والـ [[!]] بتقول لـ TypeScript «متأكد إنه موجود» لأن [[get]] ممكن يرجّع [[undefined]] في النوع.`,
            R`بنطبع في الـ console عشان نشوف بعينينا إن التنضيف اشتغل فعلًا لما المنيو اتقفل.`,
            R`قفلة الـ [[unmounted]] بتاع [[vClickOutside]].`,
            R`قفلة object الـ [[vClickOutside]].`,
            R`ref بيقول المنيو مفتوح ولا لأ، بيبدأ مفتوح عشان نجرّب الضغط برّه على طول.`,
            R`قفلة الـ script، وكل اللي فيه متاح في الـ template.`,
            R`بداية الـ template اللي بيستخدم الـ directives.`,
            R`[[v-focus]] بيشغّل الـ directive على الـ input ده، فياخد الـ focus أول ما الصفحة تفتح. مفيش [[=]] لأن الـ directive ده مش محتاج قيمة.`,
            R`المنيو بيظهر طول ما [[open]] true. [[v-click-outside]] قيمته arrow function بتقفل المنيو، فدي اللي بتوصل في [[binding.value]]، و [[open = false]] في الـ template بيكتب في الـ ref من غير [[.value]].`,
            R`زرار جوه المنيو: الضغط عليه [[el.contains]] بيرجّع true، فالمنيو مش بيتقفل.`,
            R`قفلة الـ [[<div>]] بتاع المنيو.`,
            R`نص برا المنيو: الضغط عليه بيقفل المنيو، فـ [[v-if]] بيشيله و [[unmounted]] بيتنادى.`,
            R`قفلة الـ template بتاع الـ component.`
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
.backdrop {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 0.5);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>`,
          try: R`افتح الـ modal وبص في Elements: الـ [[.backdrop]] فين؟ جوه [[.card]] ولا آخر [[<body>]]؟ بعدين شيل [[<Teleport>]]: الـ backdrop لسه بيغطّي الشاشة؟ وزوّد على الكارت [[transform: translateZ(0)]]: بيتقص؟ وغيّر [[0.3s]] لـ [[2s]] وشوف الكلاسات وهي بتتغير.`,
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

والـ [[.backdrop]] عليه [[position: fixed]] و [[inset: 0]] (يعني [[top]] و [[right]] و [[bottom]] و [[left]] كلهم 0) فبيغطّي الشاشة كلها، و [[background: rgb(0 0 0 / 0.5)]] أسود نص شفاف فالصفحة اللي ورا تبان باهتة.

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
| [[<Transition name="x">]] | بيحط كلاسات [[x-enter-*]] وقت الدخول و [[x-leave-*]] وقت الخروج |
| [[x-enter-from]] و [[x-leave-to]] | الشكل وهو مش ظاهر |
| [[x-enter-active]] و [[x-leave-active]] | موجودين طول مدة الأنيميشن، فبتحط فيهم [[transition]] (المدة ونوع الحركة) |
| [[<TransitionGroup>]] | زي [[Transition]] بس لـ list، وكل عنصر لازم يبقى ليه [[key]] |`,
          lines: [
            R`بداية الـ script بتاع الـ component اللي فيه الزرار والـ modal.`,
            R`بنستورد [[ref]] عشان نعمل state بيقول الـ modal مفتوح ولا لأ.`,
            R`الـ modal بيبدأ مقفول. الـ state ده عايش في الـ component ده حتى لو الـ modal نفسه هيترسم في مكان تاني في الـ DOM.`,
            R`قفلة الـ script بتاع الـ component.`,
            R`بداية الـ template بتاع الـ component.`,
            R`كارت عليه [[overflow: hidden]]، يعني أي حاجة بتطلع برا حدوده بتتقص. ده الموقف اللي بيبوّظ الـ modals لو اترسمت جوه أب زي ده.`,
            R`زرار الفتح: [[@click]] بيخلي [[open]] true. في الـ template بتكتب [[open = true]] من غير [[.value]].`,
            R`[[Teleport]] بيرسم اللي جواه في آخر [[<body>]] بدل ما يترسم هنا جوه الكارت، فالقص مبيأثرش عليه. بس منطقيًا لسه جزء من الـ component: بيقرا [[open]] ويغيّره عادي. والـ [[to]] بياخد CSS selector لعنصر لازم يكون موجود في الصفحة.`,
            R`[[Transition]] بيحط كلاسات أنيميشن على العنصر اللي جواه وهو داخل وخارج، و [[name="fade"]] بيخلي أسامي الكلاسات تبدأ بـ [[fade-]]. لازم يلف عنصر واحد بس.`,
            R`الـ modal نفسه بيظهر لما [[open]] true. [[v-if]] (أو [[v-show]]) هو اللي بيخلي [[Transition]] يعرف إن العنصر داخل أو خارج. و [[role="dialog"]] و [[aria-modal="true"]] بيقولوا للـ screen reader إن ده dialog وباقي الصفحة مش متاح دلوقتي.`,
            R`السؤال اللي جوه الـ modal.`,
            R`زرار القفل: بيخلي [[open]] false، فـ [[v-if]] يشيل العنصر بس [[Transition]] بيستنى أنيميشن الخروج يخلص الأول.`,
            R`قفلة الـ [[<div>]] بتاع الـ modal.`,
            R`قفلة الـ [[Transition]] اللي بيلف الـ modal.`,
            R`قفلة الـ [[Teleport]]، وبعده رجعنا جوه الكارت.`,
            R`قفلة الـ [[<div>]] بتاع الكارت.`,
            R`قفلة الـ template بتاع الـ component.`,
            R`بداية الـ CSS. [[scoped]] بيخلي القواعد دي تخص الـ component ده بس، وبتوصل للـ modal برضه رغم إنه اتنقل، لأن الـ attribute بيتحط على العنصر نفسه مش على مكانه.`,
            R`قاعدة للـ [[.backdrop]]: الطبقة اللي بتغطّي الصفحة ورا الـ modal.`,
            R`[[position: fixed]] بيحسب مكان العنصر من الشاشة نفسها مش من الأب، فبيفضل ثابت حتى لو الصفحة اتعملها scroll. ولو أب فيه [[transform]] أو [[filter]] الـ fixed بيتحسب منه هو، وده سبب تاني إننا بنعمل Teleport لـ [[<body>]].`,
            R`[[inset: 0]] اختصار لـ [[top]] و [[right]] و [[bottom]] و [[left]] كلهم 0، فالعنصر بيتمد على الشاشة كلها.`,
            R`خلفية سودا نص شفافة (الـ [[0.5]] هي الشفافية)، فالصفحة اللي ورا تبان باهتة والمستخدم يفهم إن الـ modal هو اللي شغال دلوقتي.`,
            R`قفلة قاعدة الـ [[.backdrop]].`,
            R`الكلاس ده موجود على العنصر طول مدة الدخول...`,
            R`...والكلاس ده طول مدة الخروج. بنحطهم مع بعض لأن الاتنين محتاجين نفس الـ transition.`,
            R`بنقول للمتصفح يحرّك الـ opacity على 0.3 ثانية بدل ما يتغير مرة واحدة. Vue بيقرا المدة دي من الـ CSS عشان يعرف إمتى يشيل الكلاسات (ويشيل العنصر في الخروج).`,
            R`قفلة القاعدة الأولى بتاعة الـ transition.`,
            R`الكلاس ده موجود في أول frame من الدخول بس، فالعنصر بيبدأ منه...`,
            R`...والكلاس ده من تاني frame في الخروج لحد ما يخلص، فالعنصر بيروح ليه. الاتنين الشكل وهو «مش ظاهر».`,
            R`شفاف خالص. فالدخول من 0 للـ 1 (الافتراضي)، والخروج من 1 للـ 0، والـ transition اللي فوق بيحرّكهم.`,
            R`قفلة القاعدة التانية بتاعة الشفافية.`,
            R`قفلة الـ style بتاع الـ component.`
          ],
          sol: R`الـ [[.backdrop]] بيظهر في آخر [[<body>]] مش جوه [[.card]]. ومن غير Teleport، الـ backdrop جوه الكارت. جربناها: مع [[overflow: hidden]] بس، الـ [[position: fixed]] غطّى الشاشة كلها (1280×720)، لكن لما زوّدنا [[transform: translateZ(0)]] على الكارت بقى 100×50 بس (مقاس الكارت) واتقص، لأن أي [[transform]] أو [[filter]] على أب بيخلي الـ fixed يتحسب منه. Teleport بيبعدك عن المشاكل دي كلها.

ومع [[2s]] نفس الكلاسات بتفضل على العنصر ثانيتين بدل 0.3، وفي القفل العنصر بيفضل موجود ثانيتين.`
        }
      ]
    }
]);

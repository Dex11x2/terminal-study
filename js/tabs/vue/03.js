// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "الـ components",
      l: 1,
      n: "props بتنزل من الأب، و emits بتطلع من الابن، و slots بتحط محتوى جوه component، و CSS خاص بكل واحد",
      items: [
        {
          cmd: "defineProps",
          title: "تبعت بيانات من الأب للابن: defineProps",
          desc: R`الـ props هي مدخلات الـ component: الأب بيكتبها كـ attributes ([[<ProductCard name="ماوس" :price="350" />]])، والابن بيعلن عنها بـ [[defineProps<{ ... }>()]] بنوع TypeScript.

الـ props للقراية بس، والابن ميعدّلش فيها. ومن Vue 3.5 تقدر تعمل destructuring للـ props وتدّي قيم افتراضية في نفس السطر، وتفضل reactive.`,
          example: R`// src/components/ProductCard.vue
<script setup lang="ts">
const { name, price, currency = 'EGP', tags = [] } = defineProps<{
  name: string
  price: number
  currency?: string
  tags?: string[]
}>()
</script>

<template>
  <article>
    <h3>{{ name }}</h3>
    <p>{{ price.toLocaleString('en') }} {{ currency }}</p>
    <small v-if="tags.length">{{ tags.join('، ') }}</small>
  </article>
</template>

// src/App.vue
<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './components/ProductCard.vue'

const price = ref(1500)
</script>

<template>
  <ProductCard name="كيبورد" :price="price" />
  <ProductCard name="ماوس" :price="350" currency="USD" :tags="['جديد', 'خصم']" />
  <button @click="price += 100">زوّد</button>
</template>`,
          try: R`اضغط «زوّد» وشوف سعر الكيبورد بيتغير. بعدين جرّب [[<ProductCard name="x" />]] من غير [[price]]، و [[<ProductCard name="y" price="100" />]] من غير [[:]]. شغّل [[npm run type-check]]: بيقول إيه؟ وبص على الـ console في المتصفح.`,
          flag: "script",
          deep: {
            why: R`نفس الكارت بيظهر في الصفحة الرئيسية والبحث والسلة ببيانات مختلفة. بتكتبه مرة واحدة والفرق ييجي من الـ props. والبيانات بتنزل في اتجاه واحد (من الأب للابن)، فلما قيمة تطلع غلط بتعرف تدوّر فين.`,
            how: R`[[defineProps]] مش دالة بتستوردها، دي macro: الـ compiler بيقراها وقت الـ build ويحوّل النوع لتعريف runtime ([[{ name: { type: String, required: true }, ... }]])، فـ Vue بيقدر يحذّرك في التطوير لو prop ناقص أو نوعه غلط. و [[?]] معناها اختياري.

الـ destructuring في Vue 3.5 «reactive props destructure»: الـ compiler بيحوّل كل [[price]] في الكود لـ [[__props.price]]، فلما الأب يغيّر القيمة الابن بيشوفها. ولو هتمرر prop لـ watch أو composable، لفّه في getter: [[watch(() => price, ...)]]. في الكود القديم هتلاقي [[const props = withDefaults(defineProps<...>(), { currency: 'EGP' })]] و [[props.price]]، ونفس المعنى.

القيم اللي مش نص بتتبعت بـ [[:]]: [[:price="350"]] رقم، و [[price="350"]] string. والاسم في الـ template بيتكتب kebab-case أو camelCase ([[:max-price]] أو [[:maxPrice]]) والاتنين بيوصلوا [[maxPrice]].`,
            when: R`أي بيانات الـ component بيعرضها ومش هو صاحبها. لو الابن محتاج يغيّر القيمة، يبعت event للأب (الدرس الجاي)، أو يبقى عنده state بتاعه.`,
            mistakes: R`تعدّل prop جوه الابن ([[price++]]): Vue بيطلع warning والقيمة متتحدّثش عند الأب. وتكتب [[price="100"]] من غير [[:]] فيوصل string. وتدّي object أو array كقيمة افتراضية في Options API من غير دالة ([[default: () => []]]): مع الـ destructuring في 3.5 [[tags = []]] صح. وتعمل [[const p = price]] في الـ setup وتستغرب إنه مش بيتحدّث: ده نسخ القيمة مرة واحدة.`
          },
          teach: R`## الفكرة: الأب بيكتب attributes، والابن بيعلن عنها بنوع

شغّلنا الملفين في مشروع create-vue (Vue 3.5.44) في Chrome headless، وفحصنا الأنواع بـ [[vue-tsc]] 3.3.13.

---

## ١. [[defineProps<{ ... }>()]]

~~~text ProductCard.vue
const { name, price, currency = 'EGP', tags = [] } = defineProps<{
  name: string
  price: number
  currency?: string
  tags?: string[]
}>()
~~~

| الحتة | معناها |
|---|---|
| [[defineProps<{ ... }>()]] | macro: الـ compiler بيقرا النوع ويعمل منه تعريف الـ props. مش محتاج import |
| [[name: string]] | إجباري |
| [[currency?: string]] | [[?]] = اختياري |
| [[tags?: string[]]] | array من النصوص، اختياري |
| [[const { name, price, ... } =]] | destructuring (Vue 3.5): كل prop متغير، ولسه reactive |
| [[currency = 'EGP']] | قيمة لو الأب مبعتهاش |

---

## ٢. الـ template

- [[price.toLocaleString('en')]]: الرقم بفواصل الآلاف ([[1,500]]).
- [[v-if="tags.length"]]: اعرض الـ tags لو فيه واحدة على الأقل (0 = false).
- [[tags.join('، ')]]: حوّل الـ array لنص بفاصلة عربي بينهم.

---

## ٣. الأب

| الكتابة | اللي بيوصل |
|---|---|
| [[name="كيبورد"]] | string |
| [[:price="price"]] | قيمة الـ ref (1500)، وبتتحدّث معاه |
| [[:price="350"]] | رقم 350، عشان [[:]] |
| [[currency="USD"]] | string |
| [[:tags="['جديد', 'خصم']"]] | array |

---

## ٤. الناتج

~~~text الناتج
<article><h3>كيبورد</h3><p>1,500 EGP</p><!--v-if--></article>
<article><h3>ماوس</h3><p>350 USD</p><small>جديد، خصم</small></article>
<button>زوّد</button>
~~~

- الكيبورد: [[currency]] أخد الافتراضي [[EGP]]، و [[tags]] فاضية فالـ [[<small>]] اتشال ومكانه [[<!--v-if-->]].
- الماوس: كل حاجة اتبعتت.

وبعد ضغطة «زوّد»:

~~~text الناتج
1,600 EGP
~~~

[[price]] في الابن متغير اتعمله destructuring، ومع كده اتحدّث. ده الـ reactive props destructure بتاع 3.5.

---

## ٥. لما تغلط: [[vue-tsc]]

جربنا [[<ProductCard name="x" />]] و [[<ProductCard name="y" price="100" />]]:

~~~text الناتج (vue-tsc --noEmit)
src/lab/Bad.vue(6,4): error TS2345: ...
  Property 'price' is missing in type '{ name: string; }' but required in type
  '{ readonly name: string; readonly price: number; readonly currency?: string | undefined; ... }'.
src/lab/Bad.vue(7,25): error TS2322: Type 'string' is not assignable to type 'number'.
~~~

- السطر 6: [[price]] ناقص وهو إجباري.
- السطر 7: [[price="100"]] من غير [[:]] بعت string.

[[npm run build]] بيشغّل [[vue-tsc]]، فالـ build بيقع بالأخطاء دي. أما [[npm run dev]] فمبيفحصش الأنواع، بس Vue بيحذّرك في الـ console:

~~~text الناتج (Console)
[Vue warn]: Missing required prop: "price"
  at <ProductCard name="x" >
~~~

وبعدها الصفحة وقعت لأن [[price.toLocaleString]] اتنادت على [[undefined]].

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[defineProps<{ x: T }>()]] | الـ props بنوع TypeScript |
| [[x?: T]] | اختياري |
| [[const { x = 1 } = defineProps...]] | destructuring بقيمة افتراضية، reactive (3.5+) |
| [[:x="..."]] | أي قيمة مش نص |
| [[watch(() => x, ...)]] | راقب prop |
| [[withDefaults(...)]] | الشكل القديم للقيم الافتراضية |`,
          lines: [
            "بداية الـ script بتاع الكارت.",
            "destructuring للـ props بقيم افتراضية.",
            "الاسم: نص إجباري.",
            "السعر: رقم إجباري.",
            "العملة: اختياري.",
            "الـ tags: اختياري.",
            "قفلة النوع والنداء.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "الكارت.",
            "الاسم.",
            "السعر بفواصل والعملة.",
            "الـ tags لو فيه.",
            "قفلة الكارت.",
            "قفلة الـ template.",
            "بداية الـ script بتاع الأب.",
            R`استورد [[ref]].`,
            "استورد الكارت.",
            "سعر متغير.",
            "قفلة الـ script.",
            "بداية الـ template.",
            R`كارت بسعر من ref، والعملة الافتراضية.`,
            R`كارت تاني: رقم بـ [[:]]، وعملة، و array.`,
            "زرار بيزوّد السعر.",
            "قفلة الـ template."
          ],
          sol: R`«زوّد» بيغيّر الكيبورد لـ [[1,600 EGP]] ثم [[1,700 EGP]]: الابن شايف التغيير.

[[npm run type-check]] بيطلع خطأين: [[Property 'price' is missing]] و [[Type 'string' is not assignable to type 'number']]. وفي الـ console: [[[Vue warn]: Missing required prop: "price"]]، وبعدها الصفحة بتقع لأن [[undefined.toLocaleString]] مش موجودة. الأنواع بتمسك الغلط قبل ما يوصل للمتصفح.`
        },
        {
          cmd: "defineEmits و defineModel",
          title: "الابن يكلّم الأب: defineEmits، و v-model على component بـ defineModel",
          desc: R`الابن مبيعدّلش في بيانات الأب. بيبعت event بـ [[emit('remove', id)]]، والأب بيسمعه بـ [[@remove="onRemove"]]. وبتعلن عن الـ events بـ [[defineEmits<{ remove: [id: number] }>()]] فـ TypeScript يعرف كل event بيبعت إيه.

ولما عايز [[v-model]] على component بتاعك (قيمة الأب والابن بيعدّلها)، [[defineModel()]] (Vue 3.4) بيعمل ref مربوط بالأب على طول.`,
          example: R`// src/components/CartRow.vue
<script setup lang="ts">
const props = defineProps<{ id: number; name: string }>()
const qty = defineModel<number>('qty', { required: true })
const emit = defineEmits<{
  remove: [id: number]
}>()
</script>

<template>
  <li>
    {{ props.name }}
    <button class="minus" @click="qty--" :disabled="qty <= 1">-</button>
    {{ qty }}
    <button class="plus" @click="qty++">+</button>
    <button class="rm" @click="emit('remove', props.id)">امسح</button>
  </li>
</template>

// src/App.vue
<script setup lang="ts">
import { ref } from 'vue'
import CartRow from './components/CartRow.vue'

const cart = ref([
  { id: 1, name: 'كيبورد', qty: 1 },
  { id: 2, name: 'ماوس', qty: 2 },
])
function onRemove(id: number) {
  cart.value = cart.value.filter((i) => i.id !== id)
}
</script>

<template>
  <ul>
    <CartRow v-for="item in cart" :key="item.id" :id="item.id" :name="item.name"
      v-model:qty="item.qty" @remove="onRemove" />
  </ul>
  <pre>{{ cart.map((i) => i.name + ' x' + i.qty).join(' | ') }}</pre>
</template>`,
          try: R`اضغط «+» على الكيبورد مرتين، وبعدين «امسح» على الماوس. السطر اللي تحت بيتغير إزاي؟ بعدين في الأب اكتب [[@remove="(id: string) => id"]] وشغّل [[npm run type-check]].`,
          flag: "script",
          deep: {
            why: R`لو كل component يعدّل في بيانات غيره، لما حاجة تبوظ مش هتعرف مين اللي غيّرها. القاعدة في Vue (وفي React و Angular): props بتنزل، و events بتطلع، وصاحب البيانات بس هو اللي بيغيّرها. فالـ [[CartRow]] بيقول «المستخدم عايز يمسحني»، والأب هو اللي يقرر.`,
            how: R`[[defineEmits]] برضه macro. [[remove: [id: number]]] معناها event اسمه [[remove]] بيبعت argument واحد رقم (الشكل ده اسمه tuple: array أطوالها وأنواعها ثابتة). [[emit('remove', 5)]] بينادي الـ handler اللي الأب حطه بـ [[@remove]]. والـ events في Vue مبتعملش bubbling زي أحداث الـ DOM: بتوصل للأب المباشر بس.

[[v-model:qty="item.qty"]] على component اختصار لـ [[:qty="item.qty" @update:qty="v => item.qty = v"]]. و [[defineModel('qty')]] جوه الابن بيعمل الجزء التاني: ref لما تقراه بيرجّع الـ prop، ولما تكتب فيه ([[qty++]]) بيبعت [[update:qty]] للأب. ومن غير اسم ([[defineModel()]]) بيبقى [[v-model]] العادي (prop اسمها [[modelValue]]).`,
            when: R`[[emit]] لأي حاجة حصلت والأب يقرر يعمل إيه: اتضغط، اتمسح، اتبعت. و [[defineModel]] لـ component هو في الأساس input: [[TextField]] و [[DatePicker]] و [[QtyInput]] و toggle. ولما البيانات لازم توصل لـ components بعيدة، ده provide/inject أو Pinia (المستوى ٢).`,
            mistakes: R`تكتب [[props.qty++]] في الابن: warning والقيمة مش بتتغير. وتنسى تعلن الـ event في [[defineEmits]] فيتعامل كـ attribute عادي ويتحط على الـ root element. وتسمّي events بـ camelCase في الـ template بتاع الأب وانت بتبعتها kebab أو العكس: Vue بيوفّق بينهم، بس خليك ثابت. وتستخدم [[defineModel]] مع object وتعدّل جواه ([[model.value.name = 'x']]): ده بيعدّل object الأب مباشرة من غير event، فابعت object جديد.`
          },
          teach: R`## الفكرة: props بتنزل، و events بتطلع

شغّلنا الملفين في Chrome headless (Vue 3.5.44): طبعنا السطر اللي تحت، وضغطنا «+» على الكيبورد مرتين، وبعدين «امسح» على الماوس.

---

## ١. الابن: ٣ macros

~~~text CartRow.vue
const props = defineProps<{ id: number; name: string }>()
const qty = defineModel<number>('qty', { required: true })
const emit = defineEmits<{
  remove: [id: number]
}>()
~~~

| السطر | معناه |
|---|---|
| [[defineProps]] | [[id]] و [[name]] للقراية. هنا من غير destructuring، فبنكتب [[props.name]] |
| [[defineModel<number>('qty', ...)]] | ref اسمه [[qty]] مربوط بـ [[v-model:qty]] عند الأب |
| [[{ required: true }]] | الأب لازم يبعته |
| [[defineEmits<{ remove: [id: number] }>()]] | event اسمه [[remove]] بيبعت رقم |
| [[emit]] | الدالة اللي بتبعت بيها |

---

## ٢. الـ template بتاع الابن

- [[@click="qty--"]] و [[@click="qty++"]]: بنكتب في الـ model كأنه ref عادي، و Vue بيبعت [[update:qty]] للأب.
- [[:disabled="qty <= 1"]]: الزرار متعطّل لو الكمية 1.
- [[@click="emit('remove', props.id)"]]: ابعت [[remove]] ومعاه الـ id.

---

## ٣. الأب

~~~text App.vue
<CartRow ... v-model:qty="item.qty" @remove="onRemove" />
~~~

- [[v-model:qty="item.qty"]]: اربط [[qty]] بتاع الابن بـ [[item.qty]] في الاتجاهين.
- [[@remove="onRemove"]]: لما الابن يبعت [[remove]]، نادي [[onRemove]] بالـ id.
- [[onRemove]] بيعمل array جديد من غير العنصر ده بـ [[filter]] ويحطه في [[cart.value]].
- [[cart.map(...).join(' | ')]]: سطر نشوف فيه الحالة.

---

## ٤. الناتج

~~~text الناتج
1: كيبورد x1 | ماوس x2
2: كيبورد x3 | ماوس x2
3: كيبورد x3
~~~

| الخطوة | اللي حصل |
|---|---|
| ١ → ٢ | الابن عمل [[qty++]] مرتين، فبعت [[update:qty]] بـ 2 ثم 3، والأب حدّث [[item.qty]] |
| ٢ → ٣ | الابن بعت [[remove]] بـ 2، والأب شال الماوس |

البيانات اتغيرت عند الأب بس، والابن مجرد بيطلب.

---

## ٥. الاختبار بيشوف الـ events

في درس الاختبارات (المستوى ٢) اتأكدنا بـ Vitest:

~~~text CartRow.spec.ts
await wrapper.get('.plus').trigger('click')
expect(wrapper.emitted('update:qty')).toEqual([[3]])
~~~

الزرار بعت event اسمه [[update:qty]] بقيمة 3 (لما الكمية كانت 2). ده اللي [[defineModel]] بيعمله تحت.

---

## ٦. لو الأب كتب handler بنوع غلط

~~~text الناتج (vue-tsc)
error TS2322: Type '(id: string) => string' is not assignable to type '(id: number) => any'.
  Types of parameters 'id' and 'id' are incompatible.
    Type 'number' is not assignable to type 'string'.
~~~

[[defineEmits]] بنوع بيخلي TypeScript يمسك ده.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[defineEmits<{ x: [a: T] }>()]] | event اسمه x بيبعت T |
| [[emit('x', value)]] | ابعته |
| [[@x="handler"]] | الأب بيسمعه |
| [[defineModel()]] | [[v-model]] على الـ component |
| [[defineModel('qty')]] | [[v-model:qty]] |
| الكتابة في الـ model | بتبعت [[update:qty]] |`,
          lines: [
            "بداية الـ script بتاع الصف.",
            "الـ props: id واسم.",
            R`ref مربوط بـ [[v-model:qty]] عند الأب.`,
            "تعريف الـ events...",
            R`[[remove]] بيبعت رقم.`,
            "قفلة الـ events.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "الصف.",
            "الاسم.",
            "ناقص: بيكتب في الـ model، ومتعطّل لو 1.",
            "الكمية.",
            "زايد.",
            R`امسح: ابعت [[remove]] بالـ id.`,
            "قفلة الصف.",
            "قفلة الـ template.",
            "بداية الـ script بتاع الأب.",
            R`استورد [[ref]].`,
            "استورد الصف.",
            "السلة.",
            "كيبورد.",
            "ماوس.",
            "قفلة السلة.",
            "دالة المسح...",
            "array جديد من غير العنصر ده.",
            "قفلة الدالة.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "الـ list.",
            R`صف لكل منتج: props و [[key]]...`,
            R`...و [[v-model:qty]] و [[@remove]].`,
            "قفلة الـ list.",
            "سطر بيبيّن الحالة.",
            "قفلة الـ template."
          ],
          sol: R`بعد «+» مرتين: [[كيبورد x3 | ماوس x2]]، وبعد «امسح» على الماوس: [[كيبورد x3]]. ولاحظ إن «-» على الكيبورد كان متعطّل في الأول لأن الكمية 1.

ومع [[@remove="(id: string) => id"]]، [[vue-tsc]] بيقول [[Type '(id: string) => string' is not assignable to type '(id: number) => any']]: الـ event بيبعت رقم، والـ handler مستني string.`
        },
        {
          cmd: "slots",
          title: "تحط محتوى جوه component: slots و named و scoped",
          desc: R`الـ slot مكان فاضي في الابن الأب بيملاه بـ HTML أو components: [[<slot />]] في الابن، وأي حاجة بين [[<BaseCard>]] و [[</BaseCard>]] عند الأب بتتحط مكانه. ولو فيه أكتر من مكان، كل واحد ليه اسم: [[<slot name="header" />]] والأب بيكتب [[<template #header>]].

والـ scoped slot: الابن بيبعت بيانات للمحتوى اللي الأب كاتبه ([[<slot :item="item" />]] و [[#item="{ item }"]])، وده اللي بيخليك تعمل جدول أو list عام والأب يحدد شكل كل صف.`,
          example: R`// src/components/BaseCard.vue
<template>
  <section class="card">
    <header v-if="$slots.header"><slot name="header" /></header>
    <slot>مفيش محتوى</slot>
    <footer><slot name="footer" :year="2026">© شركتنا</slot></footer>
  </section>
</template>

// src/components/DataList.vue
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{ items: T[] }>()
defineSlots<{ item(props: { item: T; index: number }): any }>()
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      <slot name="item" :item="item" :index="index" />
    </li>
  </ul>
</template>

// src/App.vue
<script setup lang="ts">
import BaseCard from './components/BaseCard.vue'
import DataList from './components/DataList.vue'

const users = [
  { id: 1, name: 'Sara', admin: true },
  { id: 2, name: 'Ali', admin: false },
]
</script>

<template>
  <BaseCard>
    <template #header>المستخدمين</template>
    <DataList :items="users">
      <template #item="{ item, index }">
        {{ index + 1 }}- {{ item.name }} <b v-if="item.admin">admin</b>
      </template>
    </DataList>
    <template #footer="{ year }">آخر تحديث {{ year }}</template>
  </BaseCard>
  <BaseCard />
</template>`,
          try: R`في [[App.vue]] جوه [[#item]] اكتب [[{{ item.email }}]] وشغّل [[npm run type-check]]: TypeScript عارف إن مفيش [[email]]؟ بعدين استخدم [[DataList]] تاني بـ array منتجات ([[{ id, title, price }]]) وصف شكله مختلف.`,
          flag: "script",
          deep: {
            why: R`الـ props بتبعت بيانات، بس ساعات الأب محتاج يبعت **شكل**: كارت محتواه مختلف كل مرة، أو modal جواه فورم، أو جدول كل عمود فيه شكل مختلف. من غير slots هتعمل prop لكل حالة أو تنسخ الـ component.`,
            how: R`المحتوى اللي الأب بيكتبه بيتعمله compile في **الأب**، فبيشوف بيانات الأب بس (مش بيانات الابن). عشان كده لما الابن عايز يدّي المحتوى بيانات، بيحطها كـ attributes على [[<slot>]]، والأب بياخدها بـ [[#name="props"]] (وغالبًا بيعمل destructuring). [[#]] اختصار [[v-slot:]].

أي محتوى من غير [[<template #...>]] بيروح للـ slot الافتراضي ([[default]]). والكلام بين [[<slot>]] و [[</slot>]] في الابن fallback لو الأب مبعتش حاجة. و [[$slots.header]] بيقولك الأب بعت المحتوى ده ولا لأ.

[[generic="T extends ..."]] (Vue 3.3) بيخلي الـ component generic زي دالة TypeScript، فنوع [[item]] في الـ slot بيتعرف من الـ array اللي اتبعت. و [[defineSlots]] بيكتب نوع كل slot.`,
            when: R`layout components (كارت، modal، صفحة فيها sidebar)، و components عامة بتعرض بيانات (list، جدول، select) والأب بيحدد شكل العنصر. ومكتبات الـ UI (PrimeVue و Vuetify و Naive UI) مليانة scoped slots.`,
            mistakes: R`تحاول تقرا متغير من الابن جوه محتوى الـ slot من غير ما الابن يبعته (المحتوى بيشوف بيانات الأب بس). وتكتب [[#item="item"]] وتنسى إن اللي جاي object فيه كل الـ props ([[item.item.name]])، فاعمل destructuring [[#item="{ item }"]]. وتحط [[v-slot]] على عنصر عادي مش [[<template>]] أو الـ component نفسه.`
          },
          teach: R`## الفكرة: الابن بيسيب أماكن، والأب بيملاها

شغّلنا الـ ٣ ملفات في Chrome headless (Vue 3.5.44) وطبعنا الـ HTML.

---

## ١. [[BaseCard]]: ٣ slots

~~~text BaseCard.vue
<header v-if="$slots.header"><slot name="header" /></header>
<slot>مفيش محتوى</slot>
<footer><slot name="footer" :year="2026">© شركتنا</slot></footer>
~~~

| السطر | معناه |
|---|---|
| [[$slots.header]] | الأب بعت محتوى للـ header؟ لو لأ متعملش [[<header>]] فاضي |
| [[<slot name="header" />]] | مكان اسمه header |
| [[<slot>مفيش محتوى</slot>]] | الـ slot الافتراضي، والنص اللي جواه fallback |
| [[<slot name="footer" :year="2026">]] | slot بيبعت بيانات ([[year]]) للمحتوى، وجواه fallback |

---

## ٢. [[DataList]]: generic و scoped slot

~~~text DataList.vue
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{ items: T[] }>()
defineSlots<{ item(props: { item: T; index: number }): any }>()
</script>
~~~

- [[generic="T extends { id: number }"]]: [[T]] أي نوع، بشرط يكون فيه [[id]] رقم (عشان الـ [[:key]]). شوف درس generics في «تاب TypeScript».
- [[items: T[]]]: array من النوع ده.
- [[defineSlots]]: slot اسمه [[item]] بياخد [[{ item: T; index: number }]].

و [[<slot name="item" :item="item" :index="index" />]] جوه الـ [[v-for]]: لكل عنصر، اعرض اللي الأب كتبه وابعتله العنصر ورقمه.

---

## ٣. الأب

~~~text App.vue
<template #item="{ item, index }">
  {{ index + 1 }}- {{ item.name }} <b v-if="item.admin">admin</b>
</template>
~~~

- [[#item]] = [[v-slot:item]]: المحتوى ده للـ slot اللي اسمه item.
- [[="{ item, index }"]]: destructuring للبيانات اللي الابن بعتها.
- [[item.admin]] متاح والنوع معروف، لأن [[T]] اتحدد من [[users]].

و [[#footer="{ year }"]] بياخد [[year]] من [[BaseCard]].

---

## ٤. الناتج

~~~text الناتج
<section class="card">
  <header>المستخدمين</header>
  <ul>
    <li>1- Sara <b>admin</b></li>
    <li>2- Ali <!--v-if--></li>
  </ul>
  <footer>آخر تحديث 2026</footer>
</section>
<section class="card">
  <!--v-if-->مفيش محتوى<footer>© شركتنا</footer>
</section>
~~~

### نقرا الناتج

| الحتة | ليه |
|---|---|
| [[<header>المستخدمين</header>]] | الأب بعت [[#header]] |
| [[<ul>]] وجواها الصفوف | [[DataList]] راح للـ slot الافتراضي، والـ [[#item]] اتعرض لكل عنصر |
| [[آخر تحديث 2026]] | [[year]] جه من الابن |
| الكارت التاني: [[<!--v-if-->]] | مفيش header، فالـ [[<header>]] متعملش خالص |
| [[مفيش محتوى]] و [[© شركتنا]] | الـ fallback، لأن الأب مبعتش حاجة |

---

## الخلاصة

| عند الابن | عند الأب |
|---|---|
| [[<slot />]] | أي محتوى بين التاجين |
| [[<slot name="x" />]] | [[<template #x>...</template>]] |
| [[<slot name="x" :a="1" />]] | [[<template #x="{ a }">]] |
| كلام جوه [[<slot>]] | fallback لو مبعتش |
| [[$slots.x]] | هل الأب بعت x؟ |
| [[generic="T"]] + [[defineSlots]] | أنواع للـ slot من البيانات |`,
          lines: [
            "بداية template الكارت.",
            "الكارت.",
            R`[[<header>]] بس لو الأب بعت header.`,
            "الـ slot الافتراضي، وفيه fallback.",
            "footer بيبعت السنة، وفيه fallback.",
            "قفلة الكارت.",
            "قفلة الـ template.",
            R`script بتاع الـ list: generic، و [[T]] لازم فيه [[id]].`,
            "prop: array من T.",
            R`نوع الـ slot [[item]].`,
            "قفلة الـ script.",
            "بداية الـ template.",
            "الـ list.",
            "صف لكل عنصر.",
            "اعرض محتوى الأب، وابعتله العنصر ورقمه.",
            "قفلة الصف.",
            "قفلة الـ list.",
            "قفلة الـ template.",
            "بداية script الأب.",
            "استورد الكارت.",
            "استورد الـ list.",
            "البيانات.",
            "Sara أدمن.",
            "Ali لأ.",
            "قفلة الـ array.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "الكارت.",
            "محتوى الـ header.",
            "الـ list جوه الـ slot الافتراضي.",
            "شكل كل صف، والبيانات من الابن.",
            "الرقم والاسم، و admin لو أدمن.",
            R`قفلة [[#item]].`,
            "قفلة الـ list.",
            R`الـ footer بياخد [[year]] من الكارت.`,
            "قفلة الكارت.",
            "كارت فاضي: هيعرض الـ fallback.",
            "قفلة الـ template."
          ],
          sol: R`مع [[{{ item.email }}]]، [[vue-tsc]] بيقول: [[error TS2339: Property 'email' does not exist on type '{ id: number; name: string; admin: boolean; }']]. الـ [[generic]] عرف نوع العنصر من [[users]].

والمنتجات:`,
          solCode: R`<DataList :items="[{ id: 1, title: 'شاشة', price: 4200 }]">
  <template #item="{ item }">
    <strong>{{ item.title }}</strong> - {{ item.price }} EGP
  </template>
</DataList>`
        },
        {
          cmd: "scoped CSS",
          title: "CSS لكل component: scoped و :deep و v-bind و CSS modules",
          desc: R`[[<style scoped>]] بيخلي الـ CSS يمسك عناصر الـ component ده بس، عن طريق attribute زي [[data-v-475666b2]] بيتحط على كل عنصر. ولو عايز تمسك عنصر جوه component ابن، [[:deep(.class)]].

و [[v-bind(brand)]] جوه الـ CSS بيربط قيمة CSS بمتغير reactive، و [[<style module>]] بيعمل أسماء كلاسات فريدة تستخدمها بـ [[$style.name]].`,
          example: R`// src/components/Badge.vue
<template>
  <span class="badge"><i class="dot"></i><slot /></span>
</template>

<style scoped>
.badge { padding: 2px 8px; }
</style>

// src/App.vue
<script setup lang="ts">
import { ref } from 'vue'
import Badge from './components/Badge.vue'

const brand = ref('#42b883')
</script>

<template>
  <div class="box">
    <p class="title">عنوان</p>
    <Badge>جديد</Badge>
    <p :class="$style.warn">تحذير</p>
  </div>
  <button @click="brand = 'crimson'">غيّر اللون</button>
</template>

<style scoped>
.title {
  color: v-bind(brand);
}
.box :deep(.dot) {
  display: inline-block;
  width: 8px;
}
</style>

<style module>
.warn {
  font-weight: bold;
}
</style>`,
          try: R`افتح DevTools وبص على الـ attributes اللي على كل عنصر: الـ [[<span class="badge">]] عليه كام [[data-v]]؟ والـ [[<i class="dot">]]؟ بعدين شيل [[:deep()]] واكتب [[.box .dot]] عادي: النقطة لسه واخدة الـ CSS؟`,
          flag: "script",
          deep: {
            why: R`في مشروع فيه ١٠٠ component، كلاس اسمه [[.title]] هيتكرر في كل حتة، و CSS عام بيبوّظ components تانية. [[scoped]] بيحل ده من غير ما تخترع أسماء طويلة أو تستخدم مكتبة.`,
            how: R`الـ compiler بيدّي كل ملف hash، ويحط [[data-v-hash]] على كل عنصر في الـ template، ويحوّل كل selector لـ [[.title[data-v-hash]]]. العناصر اللي جوه component ابن مش عليها الـ hash بتاعك، فالـ CSS بتاعك ميوصلّهاش. الاستثناء: الـ root element بتاع الابن بياخد الـ hash بتاعك وبتاعه، عشان الأب يقدر يحدد مكانه (margin مثلًا).

[[:deep(.dot)]] بيحوّل [[.box :deep(.dot)]] لـ [[.box[data-v-hash] .dot]]: الـ hash على الجزء اللي قبل بس. و [[v-bind(brand)]] بيتحوّل لـ [[var(--hash-brand)]]، و Vue بيحط المتغير ده كـ style على الـ root ويحدّثه لما [[brand]] يتغير. و [[<style module>]] بيحوّل [[.warn]] لاسم فريد ([[_warn_ov4qq_2]]) ويحطه في [[$style]]. وفيه كمان [[:slotted()]] للمحتوى اللي جاي من الأب في slot، و [[:global()]] لقاعدة عامة.`,
            when: R`[[scoped]] في كل component كافتراضي. [[:deep()]] لما تعدّل شكل component من مكتبة UI. و [[v-bind()]] لثيم أو لون جاي من البيانات. و CSS عام (reset و typography و CSS variables) في ملف [[main.css]] بيتعمله import في [[main.ts]]. ولو بتستخدم Tailwind، الكلاسات في الـ template ومحتاج scoped قليل.`,
            mistakes: R`تحط CSS عام في [[<style scoped>]] وتستغرب إنه مش واصل للـ [[body]]. وتحاول تعدّل الـ [[<input>]] اللي جوه component مكتبة من غير [[:deep()]]. وتكتب [[::v-deep]] أو [[>>>]] من tutorials قديمة (Vue 2): في Vue 3 [[:deep()]]. وتنسى إن [[v-bind()]] في CSS قيمته بتتحط inline على كل root element فلو بتتغير كتير جدًا الأحسن class.`
          },
          teach: R`## الفكرة: كل component ليه hash، والـ CSS بتاعه مربوط بيه

شغّلنا الملفين في Chrome headless (Vue 3.5.44)، وطبعنا الـ DOM بالـ attributes، والـ CSS اللي اتحط في الصفحة، ولون العنوان قبل وبعد الضغط.

---

## ١. الـ DOM

~~~text الناتج
<div data-v-475666b2="" class="box" style="--475666b2-brand: #42b883;">
  <p data-v-475666b2="" class="title">عنوان</p>
  <span data-v-a3d2c6c4="" data-v-475666b2="" class="badge">
    <i data-v-a3d2c6c4="" class="dot"></i>جديد
  </span>
  <p data-v-475666b2="" class="_warn_ov4qq_2">تحذير</p>
</div>
<button data-v-475666b2="" style="--475666b2-brand: #42b883;">غيّر اللون</button>
~~~

### نقرا الناتج

| العنصر | الـ attributes | ليه |
|---|---|---|
| [[.box]] و [[.title]] و الزرار | [[475666b2]] | عناصر App.vue |
| [[<span class="badge">]] | [[a3d2c6c4]] و [[475666b2]] | الـ root بتاع Badge بياخد الاتنين |
| [[<i class="dot">]] | [[a3d2c6c4]] بس | جوه Badge، فمش عليه hash الأب |
| [[style="--475666b2-brand: ..."]] | على كل root element | ده [[v-bind(brand)]] |
| [[_warn_ov4qq_2]] | | اسم الكلاس من [[<style module>]] |

---

## ٢. الـ CSS اللي اتحط في الصفحة

~~~text الناتج
.badge[data-v-a3d2c6c4] { padding: 2px 8px; }

.title[data-v-475666b2] {
  color: var(--475666b2-brand);
}
.box[data-v-475666b2] .dot {
  display: inline-block;
  width: 8px;
}

._warn_ov4qq_2 {
  font-weight: bold;
}
~~~

| كتبنا | بقى | معناه |
|---|---|---|
| [[.badge]] في Badge | [[.badge[data-v-a3d2c6c4]]] | بس اللي عليه hash الـ Badge |
| [[.title]] | [[.title[data-v-475666b2]]] | بس عناصر App |
| [[v-bind(brand)]] | [[var(--475666b2-brand)]] | CSS variable، و Vue بيحدّث قيمته |
| [[.box :deep(.dot)]] | [[.box[data-v-475666b2] .dot]] | الـ hash على [[.box]] بس، فـ [[.dot]] جوه أي ابن بيتمسك |
| [[.warn]] في module | [[._warn_ov4qq_2]] | اسم فريد، من غير attribute |

ومن غير [[:deep()]] كانت هتبقى [[.box .dot[data-v-475666b2]]]، و [[.dot]] عليه hash الـ Badge مش الأب، فمكانتش هتمسك.

---

## ٣. [[v-bind()]] بيتحدّث

~~~text الناتج
color: rgb(66, 184, 131)
color after: rgb(220, 20, 60) | var: --475666b2-brand: crimson;
~~~

[[#42b883]] = [[rgb(66, 184, 131)]] (أخضر Vue). لما الزرار عمل [[brand = 'crimson']]، Vue غيّر قيمة المتغير في الـ [[style]] بس، والمتصفح لوّن من جديد. مفيش CSS جديد اتعمل.

---

## الخلاصة

| تكتب | إمتى |
|---|---|
| [[<style scoped>]] | الافتراضي لكل component |
| [[:deep(.x)]] | تعدّل حاجة جوه component ابن (أو مكتبة) |
| [[:slotted(.x)]] | تعدّل محتوى جاي من الأب في slot |
| [[:global(.x)]] | قاعدة عامة من جوه scoped |
| [[v-bind(var)]] | قيمة CSS من متغير reactive |
| [[<style module>]] و [[$style.x]] | أسماء كلاسات فريدة |
| [[main.css]] | الـ CSS العام |`,
          lines: [
            "template الـ Badge.",
            "span فيه نقطة والمحتوى من الأب.",
            "قفلة الـ template.",
            "CSS للـ Badge بس.",
            "مسافة جوه الـ badge.",
            "قفلة الـ style.",
            "script الأب.",
            R`استورد [[ref]].`,
            "استورد الـ Badge.",
            "لون reactive.",
            "قفلة الـ script.",
            "template الأب.",
            "صندوق.",
            "عنوان لونه من المتغير.",
            "component ابن.",
            R`كلاس من [[<style module>]].`,
            "قفلة الصندوق.",
            "زرار بيغيّر اللون.",
            "قفلة الـ template.",
            "CSS للأب بس.",
            R`[[.title]] في الأب...`,
            R`...لونها من [[brand]].`,
            "قفلة القاعدة.",
            R`[[:deep]]: امسك [[.dot]] جوه أي ابن جوه [[.box]].`,
            "عرض inline-block...",
            "وعرض 8px.",
            "قفلة القاعدة.",
            "قفلة الـ style.",
            "CSS module: أسماء فريدة.",
            R`[[.warn]]...`,
            "بخط تقيل.",
            "قفلة القاعدة.",
            "قفلة الـ style."
          ],
          sol: R`الـ [[<span class="badge">]] عليه اتنين: [[data-v]] بتاع Badge و [[data-v]] بتاع الأب (لأنه الـ root بتاع الابن). والـ [[<i class="dot">]] عليه واحد بس: بتاع Badge.

ولما تكتب [[.box .dot]] من غير [[:deep]]، الـ CSS بيبقى [[.box .dot[data-v-hash-الأب]]]، و [[.dot]] مش عليه hash الأب، فالقاعدة مش بتمسكه. [[:deep()]] بيشيل الـ hash من الجزء اللي جواه.`
        },
        {
          cmd: "Options API",
          title: "تقرا الكود القديم: Options API و this",
          desc: R`قبل Vue 3 (وفي مشاريع كتير لحد دلوقتي) الـ component كان object فيه خانات: [[data()]] للـ state، و [[computed]]، و [[watch]]، و [[methods]]، و [[mounted()]]، وكل حاجة بتتوصل بـ [[this]]. ده اسمه Options API، ولسه مدعوم بالكامل في Vue 3.

الكود الجديد بـ [[<script setup>]] (Composition API)، بس هتقابل الشكل ده في الشغل، فلازم تعرف تقراه وتحوّله.`,
          example: R`<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: { start: { type: Number, default: 0 } },
  emits: ['change'],
  data() {
    return { count: this.start, history: [] as number[] }
  },
  computed: {
    double(): number {
      return this.count * 2
    },
  },
  watch: {
    count(now: number, before: number) {
      this.history.push(before)
      this.$emit('change', now)
    },
  },
  methods: {
    inc() {
      this.count++
    },
  },
  mounted() {
    console.log('mounted, count =', this.count)
  },
})
</script>

<template>
  <button @click="inc">{{ count }} × 2 = {{ double }}</button>
  <p>{{ history }}</p>
</template>`,
          try: R`اضغط الزرار ٣ مرات. بعدين حوّل الـ component ده لـ [[<script setup>]]: [[data]] بقت إيه؟ و [[computed]]؟ و [[watch]]؟ و [[this.$emit]]؟ قارن بالـ solCode.`,
          flag: "script",
          deep: {
            why: R`Vue 2 كان Options API بس، وكتير من المشاريع في مصر والخليج اتبنت عليه، ومكتبات قديمة لسه بتكتب بيه. هتتطلب تصلّح أو تزوّد feature في component زي ده، أو تعمل migration لـ Vue 3.`,
            how: R`Vue بيعمل كل اللي في [[data()]] reactive ويحطه على [[this]]، ونفس الكلام للـ props والـ computed والـ methods، فكلهم [[this.x]]. والـ template بيشوفهم من غير [[this]].

المشكلة في المشاريع الكبيرة: feature واحدة (مثلًا البحث) بتتقسم على [[data]] و [[computed]] و [[watch]] و [[methods]]، فبتلف في الملف كله. Composition API بيخليك تحط كل حاجة تخص feature جنب بعض، وتطلّعها في composable (المستوى ٢). وكمان TypeScript أسهل معاه.

المقابلات: [[data]] → [[ref]] أو [[reactive]]، [[computed]] → [[computed()]]، [[watch]] → [[watch()]]، [[methods]] → دوال عادية، [[mounted]] → [[onMounted]]، [[created]] → الكود في [[setup]] نفسه، [[beforeDestroy]] (Vue 2) → [[onBeforeUnmount]]، [[this.$emit]] → [[emit]] من [[defineEmits]]، [[this.$refs.x]] → [[useTemplateRef('x')]]، و mixins → composables.`,
            when: R`اقراه لما تقابله، ومتكتبش بيه كود جديد إلا لو المشروع كله كده والفريق متفق. الاتنين ينفع يعيشوا في نفس المشروع، فالـ migration ممكن تبقى component component.`,
            mistakes: R`تستخدم arrow function في [[methods]] أو [[computed]] ([[inc: () => this.count++]]): الـ arrow مالهاش [[this]] بتاعها فمش هيبقى الـ component. وتنسى إن [[data]] لازم دالة بترجّع object (لو object مباشرة كل النسخ هتشارك نفس البيانات). وتحط [[return]] النوع في الـ computed ناقص فـ TypeScript يزعل (لاحظ [[double(): number]]).`
          },
          teach: R`## الفكرة: نفس الـ component، بس كل نوع حاجة في خانة

شغّلنا الـ component في Chrome headless (Vue 3.5.44) وضغطنا ٣ مرات.

---

## ١. [[<script lang="ts">]] من غير [[setup]]

و [[export default defineComponent({...})]]: الـ component object بيتصدّر. [[defineComponent]] مش بيعمل حاجة وقت التشغيل، شغلته إن TypeScript يفهم [[this]] جوه الخانات.

---

## ٢. الخانات

| الخانة | فيها | المقابل في [[<script setup>]] |
|---|---|---|
| [[props: { start: { type: Number, default: 0 } }]] | prop رقم افتراضيه 0 | [[defineProps]] |
| [[emits: ['change']]] | الـ events | [[defineEmits]] |
| [[data() { return {...} }]] | الـ state، دالة بترجّع object | [[ref]] أو [[reactive]] |
| [[computed: { double() {...} }]] | قيم محسوبة | [[computed()]] |
| [[watch: { count(now, before) {...} }]] | watcher على [[count]] | [[watch()]] |
| [[methods: { inc() {...} }]] | الدوال | دوال عادية |
| [[mounted() {...}]] | بعد الرسم | [[onMounted]] |

- [[count: this.start]]: [[data]] بتقدر تقرا الـ props بـ [[this]].
- [[[] as number[]]]: TypeScript cast، عشان يعرف إن الـ array فيها أرقام.
- [[this.$emit('change', now)]]: ابعت event للأب.

---

## ٣. الناتج

~~~text الناتج (Console)
mounted, count = 0
~~~

~~~text الناتج (الـ DOM)
before: <button>0 × 2 = 0</button><p>[]</p>
after 3 clicks: <button>3 × 2 = 6</button><p>[
  0,
  1,
  2
]</p>
~~~

- كل ضغطة: [[inc]] زوّد [[count]]، فالـ [[double]] اتحسب تاني، والـ watcher حط القيمة **القديمة** في [[history]].
- [[history]] = 0 و 1 و 2: القيم قبل كل تغيير.

---

## ٤. نفس الـ component بـ [[<script setup>]]

~~~text Counter.vue
const { start = 0 } = defineProps<{ start?: number }>()
const emit = defineEmits<{ change: [n: number] }>()
const count = ref(start)
const history = ref<number[]>([])
const double = computed(() => count.value * 2)
watch(count, (now, before) => {
  history.value.push(before)
  emit('change', now)
})
function inc() {
  count.value++
}
onMounted(() => console.log('mounted, count =', count.value))
~~~

مفيش [[this]] خالص، وكل حاجة متغير عادي، والـ template نفسه متغيرش.

---

## الخلاصة

| Options API | Composition API |
|---|---|
| [[data()]] | [[ref]] و [[reactive]] |
| [[computed: {}]] | [[computed()]] |
| [[watch: {}]] | [[watch()]] |
| [[methods: {}]] | دوال |
| [[created()]] | كود في [[setup]] |
| [[mounted()]] | [[onMounted()]] |
| [[beforeUnmount()]] ([[beforeDestroy]] في Vue 2) | [[onBeforeUnmount()]] |
| [[this.$emit]] | [[emit]] |
| [[this.$refs.x]] | [[useTemplateRef('x')]] |
| mixins | composables |`,
          lines: [
            R`script عادي من غير [[setup]].`,
            R`[[defineComponent]] عشان TypeScript يفهم [[this]].`,
            "الـ component object.",
            "prop رقم افتراضيه 0.",
            "الـ events.",
            R`[[data]]: دالة بترجّع الـ state.`,
            R`[[count]] من الـ prop، و [[history]] array أرقام.`,
            R`قفلة [[data]].`,
            "القيم المحسوبة.",
            "الضعف...",
            R`[[this.count]].`,
            R`قفلة [[double]].`,
            R`قفلة [[computed]].`,
            "الـ watchers.",
            R`لما [[count]] يتغير...`,
            "سجّل القديم.",
            "وابعت event.",
            "قفلة الـ watcher.",
            R`قفلة [[watch]].`,
            "الدوال.",
            R`[[inc]]...`,
            R`زوّد [[count]].`,
            R`قفلة [[inc]].`,
            R`قفلة [[methods]].`,
            "بعد الرسم...",
            "اطبع.",
            R`قفلة [[mounted]].`,
            "قفلة الـ object.",
            "قفلة الـ script.",
            "بداية الـ template.",
            R`زرار بينادي [[inc]] ويعرض العدد وضعفه.`,
            "القيم القديمة.",
            "قفلة الـ template."
          ],
          sol: R`بعد ٣ ضغطات: [[3 × 2 = 6]] و [[history]] فيها [[0, 1, 2]]. وده نفس الـ component بـ [[<script setup>]]: [[data]] بقت [[ref]]، و [[computed]] و [[watch]] دوال، و [[methods]] دوال عادية، و [[this.$emit]] بقت [[emit]].`,
          solCode: R`<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const { start = 0 } = defineProps<{ start?: number }>()
const emit = defineEmits<{ change: [n: number] }>()

const count = ref(start)
const history = ref<number[]>([])
const double = computed(() => count.value * 2)

watch(count, (now, before) => {
  history.value.push(before)
  emit('change', now)
})
function inc() {
  count.value++
}
onMounted(() => console.log('mounted, count =', count.value))
</script>

<template>
  <button @click="inc">{{ count }} × 2 = {{ double }}</button>
  <p>{{ history }}</p>
</template>`
        }
      ]
    }
]);

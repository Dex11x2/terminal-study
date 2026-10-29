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
| [[name: string]] | prop إجباري نوعه نص: لو الأب مبعتهوش [[vue-tsc]] بيدّي error، و Vue بيطبع warning في الـ console |
| [[currency?: string]] | الـ [[?]] بتخليه اختياري: الأب ممكن ميبعتهوش، وساعتها قيمته [[undefined]] لو مفيش default |
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
| [[name="كيبورد"]] | النص [[كيبورد]] زي ما هو، لأن من غير [[:]] القيمة دايمًا string |
| [[:price="price"]] | قيمة الـ ref (1500)، وبتتحدّث معاه |
| [[:price="350"]] | رقم 350، عشان [[:]] |
| [[currency="USD"]] | النص [[USD]]، وبيغطّي على القيمة الافتراضية [[EGP]] |
| [[:tags="['جديد', 'خصم']"]] | array فيه نصين، لأن [[:]] بتخلي اللي بين علامات التنصيص كود JavaScript |

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
| [[x?: T]] | prop اختياري: الأب ممكن ميبعتهوش، وقيمته [[undefined]] لو مفيش default |
| [[const { x = 1 } = defineProps...]] | destructuring بقيمة افتراضية، reactive (3.5+) |
| [[:x="..."]] | أي قيمة مش نص |
| [[watch(() => x, ...)]] | راقب prop اتعمله destructuring: لازم getter، لأن [[watch(x)]] بيبعت القيمة نفسها مش حاجة متراقبة |
| [[withDefaults(...)]] | الشكل القديم للقيم الافتراضية |`,
          lines: [
            R`بداية الـ script بتاع [[ProductCard.vue]]، الـ component الابن اللي بيستقبل البيانات من الأب.`,
            R`[[defineProps]] بيعلن الـ props اللي الكارت بيقبلها، وهو macro: الـ compiler بيقراه وقت الـ build، فمش محتاج تعمله import. والـ destructuring هنا (من Vue 3.5) بيدّيك كل prop كمتغير وهو لسه reactive، لأن الـ compiler بيحوّل كل [[name]] لقراية من الـ props. و [[currency = 'EGP']] و [[tags = []]] قيم افتراضية لو الأب مبعتهمش.`,
            R`[[name]] prop نوعه [[string]] ومن غير [[?]]، يعني إجباري: لو الأب مبعتهوش [[vue-tsc]] بيدّي error، وفي المتصفح Vue بيطبع warning [[Missing required prop]].`,
            R`[[price]] prop إجباري نوعه [[number]]. لو الأب كتب [[price="100"]] من غير [[:]] هيبعت النص [[100]] مش الرقم، و TypeScript هيمسك الغلطة دي.`,
            R`[[currency]] اختياري بسبب الـ [[?]]: الأب ممكن ميبعتهوش، وساعتها بياخد [[EGP]] من القيمة الافتراضية في سطر الـ destructuring.`,
            R`[[tags]] array نصوص اختياري. القيمة الافتراضية (array فاضية) بتخلي [[tags.length]] تحت تشتغل من غير error حتى لو الأب مبعتش tags.`,
            R`قفلة نوع الـ props، والأقواس [[()]] هي نداء [[defineProps]] نفسه. النوع اتكتب بين [[<>]] كـ TypeScript generic بدل ما يتبعت كـ argument.`,
            R`قفلة الـ [[<script setup>]] بتاع الكارت، وبعده شكله.`,
            R`بداية template الكارت: هنا بنعرض الـ props اللي جت من الأب.`,
            R`[[<article>]] بيلف الكارت كله. ده الـ root element بتاع الـ component.`,
            R`بيعرض اسم المنتج من الـ prop [[name]]، ومن غير [[props.]] قدامه لأننا عملناه destructuring.`,
            R`[[toLocaleString('en')]] بيكتب الرقم بفواصل الآلاف ([[1,500]])، وبعده العملة. ولو الأب غيّر [[price]] الرقم هنا بيتحدّث لوحده، لأن الـ props reactive.`,
            R`[[<small>]] بيترسم بس لو فيه tag واحد على الأقل: [[tags.length]] بـ 0 تبقى false فـ [[v-if]] مبيرسمهوش. و [[join('، ')]] بيحوّل الـ array لنص بفاصلة عربي بين كل tag والتاني.`,
            R`قفلة الـ [[<article>]] اللي لاف الكارت كله.`,
            R`قفلة template الكارت، وده آخر ملف [[ProductCard.vue]].`,
            R`بداية الـ script بتاع [[App.vue]]، الأب اللي بيستخدم الكارت.`,
            R`بيستورد [[ref]] عشان نعمل سعر بيتغير ونشوف إن الابن بيتحدّث معاه.`,
            R`بيستورد الكارت. في [[<script setup>]] أي component بتعمله import بيبقى متاح في الـ template على طول باسمه ([[<ProductCard>]]) من غير تسجيل.`,
            R`[[price]] ref بـ 1500. هيتبعت للكارت الأول، والزرار هيزوّده.`,
            R`قفلة الـ [[<script setup>]] بتاع الأب.`,
            R`بداية template الأب: هنا بنستخدم الكارت مرتين ببيانات مختلفة.`,
            R`كارت أول: [[name]] من غير [[:]] فبيوصل نص ثابت، و [[:price="price"]] بيبعت قيمة الـ ref (1500) وبيتحدّث كل ما يتغير. ومبعتناش [[currency]] فهتبقى [[EGP]].`,
            R`كارت تاني: [[:price="350"]] بالـ [[:]] عشان يوصل رقم مش نص، و [[currency="USD"]] نص عادي بيغطّي على الافتراضي، و [[:tags]] بيبعت array (من غير [[:]] كان هيوصل النص ده كله كـ string).`,
            R`زرار بيزوّد [[price]] 100 كل ضغطة (من غير [[.value]] لأننا في الـ template)، فالكارت الأول يبقى [[1,600]] ثم [[1,700]]. ده بيثبت إن الأب بيغيّر والابن بيعرض، والابن نفسه ميكتبش في الـ prop.`,
            R`قفلة template الأب، وده آخر ملف [[App.vue]].`
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
| [[emit('x', value)]] | ابعت الـ event للأب ومعاه [[value]]، والابن مبيعرفش مين بيسمع ولا هيعمل إيه |
| [[@x="handler"]] | الأب بيسمع الـ event، و [[handler]] بيتنادى بالـ value اللي الابن بعتها |
| [[defineModel()]] | [[v-model]] على الـ component |
| [[defineModel('qty')]] | ref مربوط بـ [[v-model:qty]] عند الأب: تقرا منه القيمة، وتكتب فيه فيتبعت [[update:qty]] |
| الكتابة في الـ model | بتبعت [[update:qty]] |`,
          lines: [
            R`بداية الـ script بتاع [[CartRow.vue]]، الصف اللي بيعرض منتج في السلة.`,
            R`[[defineProps]] بيعلن prop رقم [[id]] و prop نص [[name]]. حفظناهم في [[props]] بدل destructuring، فبنقراهم تحت كـ [[props.name]] و [[props.id]]، والاتنين شغالين.`,
            R`[[defineModel]] بيعمل ref مربوط بـ [[v-model:qty]] عند الأب: لما تقراه بتاخد قيمة الأب، ولما تكتب فيه ([[qty++]]) Vue بيبعت للأب event اسمه [[update:qty]] والأب يحدّث بياناته. و [[required: true]] بيقول إن الأب لازم يبعته، فنوعه [[number]] مش [[number | undefined]].`,
            R`[[defineEmits]] بيعلن الـ events اللي الصف ده بيبعتها للأب، وبيرجّع دالة [[emit]] اللي بتبعت بيها. التعريف بالنوع بيخلي TypeScript يمسك أي event مكتوب اسمه غلط أو بيبعت نوع غلط.`,
            R`event اسمه [[remove]] بيبعت argument واحد رقم اسمه [[id]]. الشكل ده (أسماء وأنواع بين قوسين مربعين) اسمه tuple: كل خانة فيه argument بترتيبه، والاسم [[id]] للتوضيح بس.`,
            R`قفلة نوع الـ events ونداء [[defineEmits]].`,
            R`قفلة الـ [[<script setup>]] بتاع الصف، وبعده شكله.`,
            R`بداية template الصف: الاسم والكمية وزراير التحكم.`,
            R`[[<li>]] هو الصف نفسه، لأن الأب هيحط الصفوف دي جوه [[<ul>]].`,
            R`بيعرض اسم المنتج من [[props.name]]. في الـ template ينفع تكتب [[name]] بس كمان، بس [[props.]] بتوضّح إنه جاي من الأب.`,
            R`زرار الناقص: [[qty--]] بيكتب في الـ model فيتبعت [[update:qty]] للأب. و [[:disabled="qty <= 1"]] بيعطّل الزرار لما الكمية 1، عشان متنزلش لـ 0 أو سالب.`,
            R`بيعرض الكمية الحالية، وبتتحدّث لما الأب يحدّث [[item.qty]].`,
            R`زرار الزايد: [[qty++]] بيبعت [[update:qty]] بالقيمة الجديدة للأب.`,
            R`زرار المسح: الصف مبيمسحش نفسه، لأن السلة بتاعة الأب. فبيبعت [[remove]] ومعاه [[props.id]]، والأب هو اللي يقرر يمسح.`,
            R`قفلة الـ [[<li>]] اللي فيه الصف كله.`,
            R`قفلة template الصف، وده آخر ملف [[CartRow.vue]].`,
            R`بداية الـ script بتاع [[App.vue]]، الأب اللي ماسك السلة.`,
            R`بيستورد [[ref]] عشان السلة تبقى reactive، وأي تغيير فيها يحدّث الصفوف والسطر اللي تحت.`,
            R`بيستورد [[CartRow]]، ويبقى متاح في الـ template على طول.`,
            R`[[cart]] ref فيه array المنتجات. هو مصدر البيانات الوحيد: الصفوف بتعرض وتطلب تغيير، والأب هو اللي بيغيّر.`,
            R`أول منتج: كيبورد بالـ [[id: 1]] والكمية 1، فزرار «-» بتاعه هيبدأ متعطّل.`,
            R`تاني منتج: ماوس بالـ [[id: 2]] والكمية 2.`,
            R`قفلة الـ array والـ [[ref]].`,
            R`[[onRemove]] هتتنادى لما أي صف يبعت [[remove]]، والـ [[id]] اللي الصف بعته هو الـ argument.`,
            R`[[filter]] بيعمل array جديد فيه كل المنتجات ما عدا اللي [[id]] بتاعها بيساوي اللي اتبعت، وبنحطه مكان القديم في [[cart.value]]. الـ [[v-for]] بيتحدّث والصف ده يختفي.`,
            R`قفلة [[onRemove]].`,
            R`قفلة الـ [[<script setup>]] بتاع الأب.`,
            R`بداية template الأب: الصفوف وسطر بيبيّن حالة السلة.`,
            R`[[<ul>]]: الـ list اللي الصفوف هتتحط جواها، لأن كل [[CartRow]] بيرسم [[<li>]].`,
            R`[[v-for]] بيعمل [[CartRow]] لكل منتج، و [[:key="item.id"]] بيخلي كل صف مربوط بمنتجه لما واحد يتمسح. و [[:id]] و [[:name]] بيبعتوا الـ props بالـ [[:]] عشان يوصلوا قيم مش نصوص ثابتة. التاج مكمّل في السطر الجاي.`,
            R`[[v-model:qty="item.qty"]] بيربط الـ [[defineModel('qty')]] اللي في الصف بـ [[item.qty]] هنا: الأب بيبعت القيمة، ولما الصف يكتب فيها بيتبعت [[update:qty]] و Vue يحدّث [[item.qty]] لوحده. و [[@remove="onRemove"]] بيسمع الـ event وبينادي الدالة بالـ id. والـ [[/>]] قفلة التاج.`,
            R`قفلة الـ [[<ul>]] اللي فيه كل الصفوف.`,
            R`سطر بيبيّن حالة السلة عند الأب، زي [[كيبورد x1 | ماوس x2]]: [[map]] بيعمل نص لكل منتج و [[join]] بيلزقهم. لما تضغط «+» في صف هتشوف الرقم هنا بيتغير، وده دليل إن البيانات اتغيرت عند الأب مش في الصف بس.`,
            R`قفلة template الأب، وده آخر ملف [[App.vue]].`
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
| [[<header>المستخدمين</header>]] | الأب بعت [[#header]]، فـ [[$slots.header]] موجود والـ [[v-if]] رسم الـ [[<header>]] |
| [[<ul>]] وجواها الصفوف | [[DataList]] راح للـ slot الافتراضي، والـ [[#item]] اتعرض لكل عنصر |
| [[آخر تحديث 2026]] | [[year]] جه من الابن |
| الكارت التاني: [[<!--v-if-->]] | مفيش header، فالـ [[<header>]] متعملش خالص |
| [[مفيش محتوى]] و [[© شركتنا]] | الـ fallback، لأن الأب مبعتش حاجة |

---

## الخلاصة

| عند الابن | عند الأب |
|---|---|
| [[<slot />]] | أي محتوى بين التاجين |
| [[<slot name="x" />]] | الأب بيملاه بـ [[<template #x>...</template>]]، و [[#x]] اختصار [[v-slot:x]] |
| [[<slot name="x" :a="1" />]] | الأب بياخد البيانات بـ [[<template #x="{ a }">]] (scoped slot)، فيستخدم [[a]] جوه المحتوى بتاعه |
| كلام جوه [[<slot>]] | fallback لو مبعتش |
| [[$slots.x]] | هل الأب بعت x؟ |
| [[generic="T"]] + [[defineSlots]] | أنواع للـ slot من البيانات |`,
          lines: [
            R`بداية template [[BaseCard.vue]]. الـ component ده مالوش script، لأنه بيرسم برواز بس والمحتوى كله جاي من الأب عن طريق الـ slots.`,
            R`[[<section>]] بكلاس [[card]]: ده برواز الكارت اللي هيلف أي محتوى الأب يبعته.`,
            R`[[<slot name="header" />]] مكان اسمه [[header]] الأب يقدر يملاه. و [[$slots.header]] بتقول هل الأب بعت محتوى للـ slot ده ولا لأ، فالـ [[v-if]] مبيرسمش [[<header>]] فاضي لو مفيش عنوان.`,
            R`[[<slot>]] من غير [[name]] هو الـ slot الافتراضي: أي حاجة الأب يكتبها بين [[<BaseCard>]] و [[</BaseCard>]] برّه أي [[<template #...>]] بتتحط هنا. والكلام اللي جواه «مفيش محتوى» fallback بيظهر بس لو الأب مبعتش حاجة.`,
            R`slot اسمه [[footer]] جوه [[<footer>]]، و [[:year="2026"]] بتبعت بيانات من الكارت للأب (ده اسمه scoped slot)، فالأب يقدر يستخدم [[year]] في المحتوى اللي بيبعته. و «© شركتنا» الـ fallback.`,
            R`قفلة الـ [[<section>]] اللي هو برواز الكارت.`,
            R`قفلة template الكارت، وده آخر ملف [[BaseCard.vue]].`,
            R`بداية الـ script بتاع [[DataList.vue]]. [[generic="T extends { id: number }"]] بيخلي الـ component ده generic زي دالة TypeScript: [[T]] هو نوع العناصر اللي الأب هيبعتها، ولازم يكون فيه [[id]] رقم عشان نستخدمه كـ key. كده الـ list تشتغل مع يوزرز أو منتجات أو أي حاجة.`,
            R`prop واحد [[items]] نوعه array من [[T]]. لما الأب يبعت [[users]]، TypeScript بيستنتج إن [[T]] هو شكل اليوزر.`,
            R`[[defineSlots]] بيعرّف نوع الـ slots: slot اسمه [[item]] بيبعت للأب [[item]] من نوع [[T]] و [[index]] رقم. ده للـ type-check بس، ومن غيره الأب ميعرفش نوع [[item]] فيكتب [[item.email]] ومحدش يمسكه.`,
            R`قفلة الـ script بتاع الـ list.`,
            R`بداية template الـ list: هنا بنلف على العناصر ونسيب شكلها للأب.`,
            R`[[<ul>]]: الـ list اللي هتلف الصفوف.`,
            R`[[v-for]] بيعمل [[<li>]] لكل عنصر، و [[:key="item.id"]] من الـ [[id]] اللي الـ generic ضمن وجوده.`,
            R`الـ list مبتعرفش شكل الصف، فبتسيبه للأب: [[<slot name="item">]] بيعرض المحتوى اللي الأب بعته لـ [[#item]]، وبيبعتله العنصر ورقمه كـ props للـ slot. كده نفس الـ list تتعرض بأشكال مختلفة.`,
            R`قفلة الـ [[<li>]] اللي بيتكرر لكل عنصر.`,
            R`قفلة الـ [[<ul>]] اللي فيه كل الصفوف.`,
            R`قفلة template الـ list، وده آخر ملف [[DataList.vue]].`,
            R`بداية الـ script بتاع [[App.vue]]، الأب اللي بيستخدم الاتنين.`,
            R`بيستورد [[BaseCard]]، ويبقى متاح في الـ template على طول.`,
            R`بيستورد [[DataList]]، ويبقى متاح في الـ template على طول.`,
            R`[[users]] array عادي (مش ref لأنه مش هيتغير) فيه يوزرين. هيتبعت لـ [[DataList]] ومنه هيتعرف [[T]].`,
            R`يوزر أول: [[Sara]] و [[admin: true]]، فهيظهر جنبها كلمة admin.`,
            R`يوزر تاني: [[Ali]] مش أدمن، فالـ [[v-if]] مش هيرسم الكلمة.`,
            R`قفلة الـ array.`,
            R`قفلة الـ [[<script setup>]] بتاع الأب.`,
            R`بداية template الأب: هنا بنملا الـ slots بتاعة الكارت والـ list.`,
            R`أول كارت. كل اللي بين التاجين هيتوزّع على الـ slots بتاعته.`,
            R`[[<template #header>]] بيبعت «المستخدمين» للـ slot اللي اسمه [[header]]. الـ [[#header]] اختصار [[v-slot:header]]، والـ [[<template>]] نفسه مش بيترسم كعنصر.`,
            R`[[DataList]] مش جوه أي [[<template #...>]]، فبيروح للـ slot الافتراضي في الكارت. و [[:items="users"]] بيبعت الـ array.`,
            R`[[#item="{ item, index }"]] بيملا slot [[item]] بتاع [[DataList]]، والـ destructuring بياخد [[item]] و [[index]] اللي الـ list بعتهم. المحتوى ده بيتكرر مرة لكل صف.`,
            R`شكل الصف اللي الأب اختاره: [[index + 1]] عشان الترقيم يبدأ من 1، والاسم، و [[<b>admin</b>]] بس لو [[item.admin]] true. ولأن [[item]] نوعه معروف من الـ generic، كتابة خانة مش موجودة بتطلع error في [[vue-tsc]].`,
            R`قفلة [[<template #item>]]: ده آخر شكل الصف.`,
            R`قفلة [[DataList]]، وبكده خلص محتوى الـ slot الافتراضي.`,
            R`بيملا slot [[footer]] وبياخد [[year]] اللي الكارت بعته بـ [[:year]]، فيعرض «آخر تحديث 2026» بدل الـ fallback.`,
            R`قفلة الكارت الأول، بعد ما ملينا الـ slots الـ ٣.`,
            R`كارت تاني من غير أي محتوى: مفيش header فـ [[v-if]] مبيرسمش [[<header>]]، والـ slot الافتراضي والـ footer بيعرضوا الـ fallback «مفيش محتوى» و «© شركتنا». ده بيبيّن فايدة الـ fallback.`,
            R`قفلة template الأب، وده آخر ملف [[App.vue]].`
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
            R`بداية template [[Badge.vue]]، component صغير لعلامة زي «جديد».`,
            R`[[<span>]] بكلاس [[badge]] جواه [[<i class="dot">]] فاضي هيتلوّن كنقطة، و [[<slot />]] اللي بيتحط فيه الكلام اللي الأب كتبه بين [[<Badge>]] و [[</Badge>]].`,
            R`قفلة template الـ Badge، وبعده الـ CSS بتاعه.`,
            R`بلوك CSS بـ [[scoped]]: Vite بيحط attribute زي [[data-v-xxxx]] على كل عناصر الـ Badge، ويضيف الـ attribute ده لـ selector [[.badge]] عشان القاعدة متمسكش أي [[.badge]] تاني في الموقع.`,
            R`[[padding]] مسافة جوه الـ badge: 2px فوق وتحت و 8px يمين وشمال، عشان الكلام ميلزقش في الحافة.`,
            R`قفلة [[<style>]] بتاع الـ Badge، وده آخر ملف [[Badge.vue]].`,
            R`بداية الـ script بتاع [[App.vue]]، الأب اللي هيجرّب فيه ٣ حاجات: [[v-bind()]] في CSS، و [[:deep()]]، و CSS modules.`,
            R`بيستورد [[ref]] عشان اللون يبقى reactive، فلما يتغير الـ CSS اللي بيستخدمه يتغير معاه.`,
            R`بيستورد [[Badge]]، ويبقى متاح في الـ template على طول.`,
            R`[[brand]] ref فيه لون Vue الأخضر. هيتقري جوه الـ CSS بـ [[v-bind(brand)]] تحت.`,
            R`قفلة الـ [[<script setup>]] بتاع الأب.`,
            R`بداية template الأب: العناصر اللي هنجرّب عليها الـ CSS.`,
            R`[[<div class="box">]] بيلف العناصر. هنستخدم [[.box]] في الـ CSS عشان نوصل لعنصر جوه الـ Badge.`,
            R`[[<p class="title">]] لونه هييجي من [[brand]] عن طريق قاعدة [[.title]] في الـ CSS، فلما تغيّر [[brand]] لونه يتغير من غير ما تلمس الـ template.`,
            R`[[<Badge>]] component ابن، و «جديد» هيتحط في الـ [[<slot />]] بتاعه. عناصره الداخلية (زي [[.dot]]) عليها hash الـ Badge بس، مش hash الأب.`,
            R`[[$style]] object بيعمله [[<style module>]] اللي تحت، فيه اسم الكلاس الحقيقي بعد ما اتغير لاسم فريد زي [[_warn_1a2b]]. بنحطه بـ [[:class]] لأنه قيمة JavaScript، ومش هنقدر نكتب [[class="warn"]] لأن الكلاس ده مش موجود بالاسم ده.`,
            R`قفلة الـ [[<div class="box">]] اللي فيه العنوان والـ Badge والتحذير.`,
            R`زرار بيغيّر [[brand]] لـ [[crimson]] (أحمر). أول ما تضغط لون العنوان يتغير، لأن Vue بيحدّث CSS variable مربوط بـ [[brand]].`,
            R`قفلة template الأب، وبعده بلوكات الـ CSS.`,
            R`بلوك CSS scoped للأب: القواعد دي بتمسك عناصر [[App.vue]] بس.`,
            R`قاعدة للـ [[.title]] اللي في template الأب.`,
            R`[[v-bind(brand)]] بيقرا ref من الـ script جوه الـ CSS. Vue بيحوّله لـ CSS variable (زي [[var(--xxxx-brand)]]) ويحط قيمته inline على عناصر الـ component، فلما [[brand]] يتغير Vue يغيّر الـ variable والمتصفح يعيد التلوين.`,
            R`قفلة قاعدة [[.title]].`,
            R`[[:deep(.dot)]] بيخلي الـ selector يعدّي لجوه component ابن: بيتحوّل لـ [[.box[data-v-الأب] .dot]]، فالـ hash على [[.box]] بس و [[.dot]] جوه الـ Badge يتمسك. من غير [[:deep]] الـ hash بتاع الأب بيتحط على [[.dot]] نفسه، و [[.dot]] مش عليه الـ hash ده، فالقاعدة متمسكش حاجة.`,
            R`[[inline-block]] بيخلي الـ [[<i>]] الفاضي ياخد عرض وطول، لأن العناصر الـ inline بتتجاهل [[width]].`,
            R`[[width]] عرض النقطة 8px، وده بيشتغل بس عشان [[inline-block]] اللي فوق.`,
            R`قفلة قاعدة [[:deep]].`,
            R`قفلة بلوك الـ CSS الـ scoped.`,
            R`بلوك [[<style module>]]: طريقة تانية لعزل الـ CSS. بدل الـ attribute، كل كلاس بيتغير اسمه لاسم فريد، والأسماء الحقيقية بتوصل للـ template في [[$style]].`,
            R`كلاس [[warn]] اللي بنستخدمه بـ [[$style.warn]] في الـ template.`,
            R`[[font-weight: bold]] بيخلي الكلام تقيل، فالتحذير يبان.`,
            R`قفلة قاعدة [[.warn]].`,
            R`قفلة [[<style module>]]، وده آخر ملف [[App.vue]].`
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
| [[data()]] | [[ref]] و [[reactive]]: كل قيمة متغير لوحده بدل object واحد بترجّعه |
| [[computed: {}]] | [[computed()]]: دالة بترجّع ref للقراية، بدل خانة في object |
| [[watch: {}]] | [[watch()]]: بتديله الـ ref أو getter نفسه، بدل اسم الخانة كنص |
| [[methods: {}]] | دوال عادية في [[<script setup>]]، والـ template بيشوفها على طول من غير [[this]] |
| [[created()]] | كود مكتوب على طول في [[setup]]، لأنه بيتنفّذ في نفس الوقت تقريبًا |
| [[mounted()]] | [[onMounted()]]: نفس التوقيت بعد أول رسم، وتقدر تناديها أكتر من مرة |
| [[beforeUnmount()]] ([[beforeDestroy]] في Vue 2) | [[onBeforeUnmount()]]: قبل ما الـ component يتشال، والعناصر لسه موجودة |
| [[this.$emit]] | [[emit]] اللي راجع من [[defineEmits]]، وبأنواع TypeScript للـ events |
| [[this.$refs.x]] | [[useTemplateRef('x')]]: ref بيتملى بالعنصر بعد الرسم، بدل object فيه كل الـ refs |
| mixins | composables |`,
          lines: [
            R`[[<script>]] عادي من غير [[setup]]: ده شكل Options API، والـ component بيتعرّف كـ object واحد بيتعمله [[export default]]. متاح في Vue 3 عادي وكتير من المشاريع القديمة مكتوبة بيه.`,
            R`[[defineComponent]] تقريبًا مبتعملش حاجة وقت التشغيل، وظيفتها لـ TypeScript: بتلف الـ object عشان يستنتج نوع [[this]] جواه وأنواع [[count]] و [[double]] والـ props. ودي الطريقة اللي docs Vue بتقولها لـ Options API مع TypeScript.`,
            R`[[export default]] بيصدّر الـ component object، وجواه كل جزء في «option» باسمه: props و data و computed و watch و methods و hooks.`,
            R`[[props]] بتتعرّف هنا كـ object: prop اسمه [[start]] نوعه [[Number]] (constructor بتاع JavaScript مش نوع TypeScript)، وقيمته الافتراضية 0 لو الأب مبعتهوش.`,
            R`[[emits]] بيعلن إن الـ component بيبعت event اسمه [[change]]. من غيره Vue بيعتبر أي [[@change]] من الأب listener عادي على الـ root element، و TypeScript ميعرفش الـ event.`,
            R`[[data]] لازم تبقى دالة بترجّع object جديد، عشان كل نسخة من الـ component تاخد state بتاعها. لو كانت object واحد كل النسخ هتشارك نفس البيانات.`,
            R`الـ state: [[count]] بيبدأ من الـ prop [[this.start]] (الـ props متاحة جوه [[data]])، و [[history]] array فاضية. الـ [[as]] بتقول لـ TypeScript إنها array أرقام، وإلا هيستنتج إنها array من [[never]] ومش هيسمح تضيف فيها. كل الخانات دي reactive لوحدها ومتاحة بـ [[this.count]].`,
            R`قفلة [[data]].`,
            R`[[computed]] object فيه القيم المحسوبة، كل واحدة دالة اسمها هو اسم القيمة. Vue بيعمل لها cache زي [[computed()]] بالظبط.`,
            R`[[double]] قيمة محسوبة. الـ [[: number]] نوع الرجوع، و docs Vue بتنصح تكتبه للـ computed في Options API، لأن الـ computed بيقرا [[this]] و [[this]] نفسه نوعه معتمد على الـ computed، فـ TypeScript ساعات ميعرفش يستنتج.`,
            R`بترجّع [[count]] مضروب في 2، و [[this.count]] هي الطريقة الوحيدة للوصول للـ state هنا. Vue بيعيد الحساب بس لما [[count]] يتغير.`,
            R`قفلة [[double]].`,
            R`قفلة [[computed]].`,
            R`[[watch]] object: كل مفتاح اسم خانة بتتراقب، وقيمته الدالة اللي تشتغل لما تتغير.`,
            R`watcher على [[count]]: بياخد القيمة الجديدة والقديمة زي [[watch()]] في Composition API، ومبيشتغلش غير لما [[count]] يتغير فعلًا.`,
            R`بيضيف القيمة القديمة لـ [[history]]. [[push]] على array في [[data]] بيحدّث الشاشة عادي، لأنه reactive.`,
            R`[[this.$emit]] بيبعت [[change]] للأب ومعاه القيمة الجديدة، فالأب يقدر يكتب [[@change="..."]] ويعرف كل تغيير.`,
            R`قفلة الـ watcher بتاع [[count]].`,
            R`قفلة [[watch]].`,
            R`[[methods]] فيه الدوال اللي الـ template والـ hooks بيستخدموها، وكلها شايفة [[this]].`,
            R`دالة [[inc]] اللي الزرار بيناديها. أوعى تكتبها arrow function ([[inc: () => ...]]) لأن [[this]] جواها مش هيبقى الـ component.`,
            R`بيزوّد [[count]] بواحد، وده بيشغّل 3 حاجات: الشاشة تتحدّث، و [[double]] يتحسب، والـ watcher يشتغل.`,
            R`قفلة [[inc]].`,
            R`قفلة [[methods]].`,
            R`[[mounted]] hook بيتنادى بعد أول رسم للـ component، نفس [[onMounted()]] في Composition API.`,
            R`بيطبع [[mounted, count = 0]] (أو قيمة [[start]] لو الأب بعتها)، عشان تشوف إن [[this.count]] متاح في الـ hook.`,
            R`قفلة [[mounted]].`,
            R`قفلة الـ object وقفلة [[defineComponent(]].`,
            R`قفلة الـ [[<script>]]، وبعده الـ template اللي بيستخدم الـ options دي.`,
            R`بداية الـ template، وهو زي ما هو في Composition API.`,
            R`زرار بينادي [[inc]] من [[methods]]، وبيعرض [[count]] و [[double]] من غير [[this]]: الـ template بيشوف كل خانات [[data]] و [[computed]] و [[methods]] بأسمائها على طول.`,
            R`بيعرض [[history]]: القيم القديمة اللي الـ watcher سجّلها، فبعد ٣ ضغطات تبقى 0 و 1 و 2.`,
            R`قفلة الـ [[<template>]]، وده آخر الـ component.`
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

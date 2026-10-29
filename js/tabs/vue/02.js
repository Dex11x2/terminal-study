// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "الـ reactivity",
      l: 1,
      n: "ref و reactive بيخلّوا البيانات تتراقب، و computed بيحسب منها، و watch بيعمل حاجة لما تتغير",
      items: [
        {
          cmd: "ref و reactive",
          title: "تعمل بيانات Vue بيراقبها: ref و reactive",
          desc: R`[[ref(value)]] بيعمل صندوق reactive لأي قيمة (رقم أو نص أو object أو array)، وبتقراه وتكتبه بـ [[.value]]. [[reactive(obj)]] بيرجّع object نفسه بس متراقب، من غير [[.value]]، ومينفعش مع رقم أو نص.

«reactive» معناها إن Vue عارف مين بيقرا القيمة دي (template أو computed أو watch)، ولما تتغير بيعيّد تشغيلهم لوحده. الكود ده بيشتغل في Node من غير متصفح: الـ reactivity في Vue مكتبة لوحدها.`,
          example: R`import { ref, reactive, toRefs, isRef, isReactive, watchEffect, nextTick } from 'vue'

const count = ref(0)
console.log('count:', count.value, isRef(count))

const user = reactive({ name: 'Sara', tags: ['vue'] })
console.log('user:', user.name, isReactive(user), isReactive(user.tags))

watchEffect(() => console.log('effect ->', count.value, user.name))
count.value++
user.name = 'Ali'
await nextTick()

const { name } = user
const refs = toRefs(user)
user.name = 'Mona'
console.log('destructured:', name, '| toRefs:', refs.name.value)

const raw = { a: 1 }
const p = reactive(raw)
console.log('proxy !== raw:', p !== raw, '| same proxy:', reactive(raw) === p)
const items = ref([1, 2])
items.value.push(3)
console.log('items:', items.value.length)`,
          try: R`احفظ الكود في [[ref.mjs]] جوه مشروع فيه vue ([[npm i vue]])، وشغّله بـ [[node ref.mjs]]. ليه [[effect]] اتطبع مرتين بس مع إننا غيّرنا قيمتين؟ وليه [[name]] بعد الـ destructuring فضل [[Ali]]؟ وبعدين جرّب [[let state = reactive({ n: 1 })]] وبعدها [[state = reactive({ n: 2 })]]: الـ effect بيشتغل؟`,
          flag: "script",
          deep: {
            why: R`في JavaScript العادي لو غيّرت متغير محدش بيعرف. Vue محتاج يعرف عشان يحدّث الشاشة، فبيلف البيانات في حاجة بتسجّل مين قراها ومين غيّرها. [[ref]] و [[reactive]] هما الطريقتين تقول بيهم «البيانات دي Vue يراقبها».`,
            how: R`[[reactive]] بيرجّع **Proxy** (شوف درس «reactivity بتشتغل إزاي؟» في آخر التاب): object بيوقف أي قراية ([[get]]) ويسجّل مين قرا، وأي كتابة ([[set]]) ويعيّد تشغيل اللي قروا. وبيعمل كده للـ objects اللي جواه كمان (deep)، أول ما تقراها.

[[ref]] object فيه خانة واحدة [[value]] عليها getter و setter بيعملوا نفس الحاجة، ولو حطيت فيه object بيعمله [[reactive]] جواه. عشان كده [[ref]] بيشتغل مع أي نوع، و [[reactive]] مع objects بس (Proxy مبيلفّش رقم).

التحديثات بتتجمّع: لو غيّرت ١٠ قيم ورا بعض، الـ effect والـ template بيتنفّذوا **مرة واحدة** بعدها (في الـ microtask الجاي)، و [[await nextTick()]] بيستنى اللحظة دي.`,
            when: R`الدليل الرسمي بيقترح [[ref]] كافتراضي لكل حاجة: أوضح ([[.value]] بيقولك إن ده reactive)، وبيستحمل إنك تبدّل القيمة كلها ([[list.value = newList]])، وبيعدّي من دالة لدالة من غير ما يفقد الـ reactivity. و [[reactive]] لما عندك object فورم أو state ليه خانات كتير ومش هتبدّله كله.`,
            mistakes: R`تعمل destructuring لـ reactive ([[const { name } = user]]): [[name]] بقى string عادي ومش متراقب. استخدم [[toRefs(user)]] أو [[user.name]] مباشرة. وتعمل [[state = reactive({...})]] من جديد: الـ template لسه مربوط بالـ Proxy القديم. وتنسى [[.value]] في الـ script ([[if (count > 0)]] بيقارن object برقم). وتقارن [[reactive(raw) === raw]] فتطلع false لأن الـ Proxy object تاني.`
          },
          teach: R`## الفكرة: صندوق Vue بيراقبه، بشكلين

شغّلنا الكود في Node 24.22 مع [[vue]] 3.5.44 ([[node ref.mjs]]). لاحظ إنه ملف [[.mjs]] (ES module)، عشان كده [[import]] و [[await]] في أول مستوى شغالين.

---

## ١. [[import { ref, reactive, ... } from 'vue']]

| الاسم | شغلته |
|---|---|
| [[ref]] | صندوق reactive لأي قيمة |
| [[reactive]] | نسخة متراقبة من object |
| [[toRefs]] | بيحوّل كل خانة في reactive لـ ref |
| [[isRef]] و [[isReactive]] | بيسألوا القيمة دي إيه |
| [[watchEffect]] | بيشغّل دالة، ويعيدها لما أي حاجة قرتها تتغير (درس watch) |
| [[nextTick]] | Promise بتخلص بعد ما Vue يطبّق التحديثات المتجمّعة |

---

## ٢. [[ref(0)]]

~~~text ref.mjs
const count = ref(0)
console.log('count:', count.value, isRef(count))
~~~

~~~text الناتج
count: 0 true
~~~

[[count]] نفسه مش 0، ده object. القيمة جوه [[count.value]].

---

## ٣. [[reactive({ name: 'Sara', tags: ['vue'] })]]

~~~text الناتج
user: Sara true true
~~~

[[user.name]] من غير [[.value]]. و [[isReactive(user.tags)]] طلع true: الـ array اللي جوه بقى متراقب هو كمان (deep).

---

## ٤. [[watchEffect]] والتحديثات المتجمّعة

~~~text ref.mjs
watchEffect(() => console.log('effect ->', count.value, user.name))
count.value++
user.name = 'Ali'
await nextTick()
~~~

~~~text الناتج
effect -> 0 Sara
effect -> 1 Ali
~~~

- أول سطر: [[watchEffect]] بيشغّل الدالة فورًا مرة، وبيسجّل إنها قرت [[count.value]] و [[user.name]].
- غيّرنا قيمتين، والـ effect اشتغل **مرة واحدة** بس بالقيمتين الجداد. Vue بيجمّع التغييرات ويشغّل مرة في الـ microtask الجاي. وده نفس اللي بيحصل للـ template: ١٠ تغييرات = render واحد.
- [[await nextTick()]] استنى لحد ما ده يحصل.

---

## ٥. الـ destructuring بيكسر الـ reactivity

~~~text ref.mjs
const { name } = user
const refs = toRefs(user)
user.name = 'Mona'
console.log('destructured:', name, '| toRefs:', refs.name.value)
~~~

~~~text الناتج
destructured: Ali | toRefs: Mona
~~~

- [[const { name } = user]] نسخ النص [['Ali']] في متغير عادي، فالتغيير بعدها موصلوش.
- [[toRefs(user)]] عمل [[ref]] لكل خانة، مربوط بالأصل: [[refs.name.value]] بيقرا [[user.name]] كل مرة.

---

## ٦. الـ Proxy

~~~text الناتج
proxy !== raw: true | same proxy: true
~~~

[[reactive(raw)]] بيرجّع object **تاني** (Proxy) حوالين الأصلي، فمش [[===]]. بس Vue بيفتكر: لو ناديت [[reactive(raw)]] تاني بيرجّعلك نفس الـ Proxy.

---

## ٧. array جوه ref

~~~text الناتج
items: 3
~~~

[[push]] على [[items.value]] شغالة ومتراقبة، لأن الـ array اللي جوه الـ ref بقى reactive.

### وآخر سطر

~~~text الناتج
effect -> 1 Mona
~~~

ده اتطبع في **الآخر خالص** بعد [[items: 3]]: لما عملنا [[user.name = 'Mona']] الـ effect اتجدول، واشتغل لما الكود المتزامن خلص. وده بيأكد إن التحديث مش فوري.

---

## ٨. تبديل الـ reactive كله

جربنا:

~~~text reassign.mjs
let state = reactive({ n: 1 })
watchEffect(() => console.log('effect n =', state.n))
state = reactive({ n: 2 })
~~~

~~~text الناتج
effect n = 1
state.n is 2 (no effect ran)
~~~

الـ effect مربوط بالـ Proxy الأول، والمتغير بقى بيشاور على Proxy جديد محدش بيراقبه. مع [[ref]] الحل سهل: [[state.value = { n: 2 }]].

---

## الخلاصة

| | [[ref]] | [[reactive]] |
|---|---|---|
| أي نوع | أيوه | objects و arrays بس |
| القراية في الـ script | [[x.value]] | [[x.prop]] |
| القراية في الـ template | [[x]] (بيتفك لوحده) | [[x.prop]] |
| تبدّل القيمة كلها | [[x.value = ...]] | مينفعش |
| destructuring | عادي | بيكسرها، استخدم [[toRefs]] |`,
          lines: [
            R`بيستورد من [[vue]] الدوال اللي هنجرّبها: [[ref]] و [[reactive]] بيعملوا قيم متراقبة، و [[toRefs]] بيفك object من غير ما يقطع الربط، و [[isRef]] و [[isReactive]] بيقولولك نوع القيمة، و [[watchEffect]] بيعيد دالة لما حاجة تتغير، و [[nextTick]] بيستنى Vue يخلّص التحديثات. الكود ده بيشتغل في Node عادي من غير متصفح، لأن الـ reactivity مش محتاجة DOM.`,
            R`[[ref(0)]] بيرجّع object صغير فيه خانة واحدة اسمها [[.value]] قيمتها 0. Vue بيراقب القراية والكتابة في [[.value]]، فأي حد قرا [[count.value]] بيتعاد لما تتغير. [[ref]] بتاخد أي نوع: رقم أو نص أو object أو array.`,
            R`بيطبع [[count: 0 true]]: القيمة نفسها بتتقري من [[count.value]] (لو طبعت [[count]] بس هتشوف الـ object كله مش 0)، و [[isRef(count)]] بترجّع [[true]].`,
            R`[[reactive]] بياخد object ويرجّع Proxy حواليه، فبتقرا وتكتب الخانات على طول ([[user.name]]) من غير [[.value]]. والمراقبة عميقة: الـ array اللي جواه ([[tags]]) متراقب هو كمان. [[reactive]] مبيقبلش غير objects و arrays، مش رقم أو نص.`,
            R`بيطبع [[user: Sara true true]]: [[user.name]] من غير [[.value]]، و [[isReactive]] [[true]] للـ object وكمان للـ array اللي جواه، لأن Vue بيلف أي object داخلي في Proxy أول ما تقراه.`,
            R`[[watchEffect]] بيشغّل الدالة فورًا مرة (فيطبع [[effect -> 0 Sara]])، وهو بيشغّلها بيسجّل هي قرت إيه: [[count.value]] و [[user.name]]. بعد كده أي تغيير في واحدة منهم بيعيد الدالة. ده نفس اللي بيحصل للـ template: Vue بيعيد رسمه لما حاجة قراها تتغير.`,
            R`بيزوّد [[count]] لـ 1. الكتابة في [[.value]] هي اللي بتبلّغ Vue، والـ effect مبيتعادش في نفس اللحظة: Vue بيأجّله لآخر الكود المتزامن.`,
            R`بيغيّر [[name]] لـ [[Ali]] من غير [[.value]] لأن [[user]] reactive. ده تاني تغيير، وبرضه الـ effect لسه متعادش.`,
            R`[[await nextTick()]] بيستنى لحد ما Vue يشغّل الحاجات المتأجلة. الـ effect بيتعاد هنا **مرة واحدة** للتغييرين ويطبع [[effect -> 1 Ali]]، لأن Vue بيجمّع التغييرات بدل ما يعيد الشغل مع كل تغيير. الـ [[await]] في أول مستوى بتشتغل في ملف [[.mjs]].`,
            R`destructuring عادي: [[name]] بقى نص عادي [[Ali]] منسوخ وقتها، ومبقاش مربوط بـ [[user]]. ده غلط شائع: أي تغيير في [[user.name]] بعد كده مش هيوصل لـ [[name]].`,
            R`[[toRefs(user)]] بيرجّع object فيه ref لكل خانة ([[refs.name]] و [[refs.tags]])، وكل ref منهم مربوط بالخانة الأصلية: تقرا منه تقرا من [[user]]، وتكتب فيه تكتب في [[user]]. ده الحل لما تحب تفك reactive object من غير ما تقطع الربط.`,
            R`بيغيّر الاسم لـ [[Mona]] عشان نقارن بين النسخة اللي اتعملها destructuring واللي جاية من [[toRefs]].`,
            R`بيطبع [[destructured: Ali | toRefs: Mona]]: النسخة العادية فضلت على القيمة القديمة، و [[refs.name.value]] شاف التغيير لأنه بيقرا من [[user]] نفسه.`,
            R`object عادي مش متراقب، هنستخدمه عشان نشوف [[reactive]] بيعمل إيه فيه.`,
            R`[[reactive(raw)]] مبيغيّرش [[raw]] نفسه، بيرجّع Proxy جديد بيلف حواليه. التغييرات اللي بتعدّي من [[p]] بس هي اللي Vue بيشوفها، ولو كتبت في [[raw]] على طول مفيش حاجة هتتحدّث.`,
            R`بيطبع [[true]] و [[true]]: الـ Proxy object مختلف عن الأصل ([[p !== raw]])، بس لو ناديت [[reactive(raw)]] تاني Vue بيرجّع نفس الـ Proxy مش واحد جديد، لأنه حافظ كل object اتلف قبل كده.`,
            R`array جوه [[ref]]. لما تحط object أو array في [[ref]]، Vue بيلفه في [[reactive]] من جوه، فالـ [[.value]] نفسه بيبقى Proxy.`,
            R`[[push]] بتعدّل الـ array نفسه، و Vue بيشوفها لأن [[items.value]] Proxy. مش محتاج تعمل array جديد وتحطه مكان القديم زي ما بتعمل في React.`,
            R`بيطبع [[items: 3]]. وبعد السطر ده الكود بيخلص، فـ Vue يشغّل الـ effect المتأجل من تغيير [[Mona]] ويطبع [[effect -> 1 Mona]] في آخر الناتج.`
          ],
          sol: R`[[effect]] بيتطبع ٣ مرات في الآخر: [[0 Sara]] أول ما اتعمل، وبعدين [[1 Ali]] مرة واحدة للتغييرين لأن Vue بيجمّع التغييرات ويشغّل في الـ microtask الجاي، وبعدين [[1 Mona]] في آخر الناتج.

و [[name]] فضل [[Ali]] لأن [[const { name } = user]] نسخ النص وقتها، ومبقاش مربوط بالـ Proxy. [[toRefs]] هو الحل.

و [[state = reactive({ n: 2 })]]: الـ effect مش بيشتغل. الـ effect مربوط بالـ Proxy القديم، والمتغير بقى بيشاور على واحد جديد. استخدم [[ref]] وغيّر [[.value]].`
        },
        {
          cmd: "computed",
          title: "قيمة محسوبة من قيم تانية ومتخزّنة: computed",
          desc: R`[[computed(() => ...)]] بيعمل قيمة بتتحسب من قيم reactive تانية، زي الإجمالي من سلة المشتريات. بتقراها بـ [[.value]] في الـ script ومن غيرها في الـ template.

الفرق عن دالة عادية: النتيجة **متخزّنة (cached)**. الدالة جوه مش بتشتغل تاني إلا لما واحدة من القيم اللي بتقراها تتغير، فلو قريته ١٠٠ مرة في الـ render بيتحسب مرة.`,
          example: R`import { ref, computed } from 'vue'

const items = ref([
  { name: 'كيبورد', price: 900, qty: 1 },
  { name: 'ماوس', price: 350, qty: 2 },
])
let runs = 0
const total = computed(() => {
  runs++
  return items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
})
console.log(total.value, total.value, total.value, '| runs:', runs)
items.value[1].qty = 3
console.log(total.value, '| runs:', runs)
total.value = 5

const first = ref('Sara')
const last = ref('Ali')
const full = computed({
  get: () => first.value + ' ' + last.value,
  set: (v) => {
    ;[first.value, last.value] = v.split(' ')
  },
})
full.value = 'Mona Hassan'
console.log(first.value, '|', last.value, '|', full.value)`,
          try: R`شغّله في Node ([[node computed.mjs]]). [[runs]] بقى كام بعد ما قرينا [[total]] ٣ مرات؟ بعدين اعمل computed اسمه [[expensive]] بيرجّع المنتجات اللي سعرها فوق 500، واعرضه في component بـ [[v-for]].`,
          flag: "script",
          deep: {
            why: R`أي قيمة بتتشتق من state (إجمالي، فلترة، عدد، اسم كامل، «الفورم صح ولا لأ؟») مكانها computed مش state تاني. لو خزّنتها في ref لوحدها لازم تفتكر تحدّثها كل ما الأصل يتغير، وأول ما تنسى الشاشة تكدب.`,
            how: R`أول ما تقرا [[total.value]] Vue بيشغّل الدالة ويسجّل هي قرت إيه ([[items]] وكل [[price]] و [[qty]]). بعدها أي قراية بترجّع القيمة المتخزّنة. لما حاجة من دول تتغير الـ computed بيتعلّم إنه «قديم» (dirty) من غير ما يتحسب، وبيتحسب تاني أول ما حد يقراه (lazy).

ومن Vue 3.4 لو اتحسب تاني وطلع **نفس** القيمة، اللي بيعتمد عليه (template أو computed تاني) مش بيتعاد. والـ computed العادي للقراية بس: لو كتبت فيه بيطلع warning. ولو محتاج تكتب، ادّيله [[get]] و [[set]].`,
            when: R`أي قيمة محسوبة بتظهر في الشاشة أو بتستخدمها في شرط: [[filteredList]] و [[total]] و [[isValid]] و [[fullName]]. لو محتاج تعمل **حاجة** لما قيمة تتغير (request، أو localStorage، أو تركيز على input)، ده [[watch]] مش computed.`,
            mistakes: R`تعمل side effect جوه computed ([[fetch]] أو تغيّر state تاني): الدالة لازم تكون pure وترجّع قيمة بس. وتستخدم دالة في الـ template ([[{{ getTotal() }}]]) مكان computed، فتتحسب مع كل render. وتعدّل array جوه computed بـ [[sort()]] (بتغيّر الأصل): انسخ الأول [[[...list].sort()]] أو [[list.toSorted()]].`
          },
          teach: R`## الفكرة: دالة بتتحسب مرة وتتخزّن لحد ما اللي بتقراه يتغير

شغّلنا الكود في Node 24.22 مع vue 3.5.44.

---

## ١. السلة و [[total]]

~~~text computed.mjs
let runs = 0
const total = computed(() => {
  runs++
  return items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
})
~~~

- [[runs]] عدّاد عادي بنعد بيه الدالة اتنفّذت كام مرة.
- [[reduce]] بتلف على الـ array وبتجمّع: [[sum]] بيبدأ من 0 (الـ argument التاني)، وكل لفة بنزوّد عليه [[price * qty]] (شوف «تاب JavaScript» لـ reduce).
- الحساب: 900 × 1 + 350 × 2 = 1600.

---

## ٢. ٣ قرايات = حساب واحد

~~~text الناتج
1600 1600 1600 | runs: 1
~~~

أول قراية حسبت وخزّنت، والتانية والتالتة رجعوا القيمة المتخزّنة. لو كانت دالة عادية [[runs]] كان هيبقى 3.

---

## ٣. نغيّر الكمية

~~~text computed.mjs
items.value[1].qty = 3
console.log(total.value, '| runs:', runs)
~~~

~~~text الناتج
1950 | runs: 2
~~~

[[qty]] بتاع الماوس اتقري جوه الدالة، فالـ computed اتعلّم إنه قديم، واتحسب تاني لما قريناه: 900 + 350 × 3 = 1950. تعديل خانة جوه object جوه array اتمسك، لأن الـ reactivity deep.

---

## ٤. نكتب في computed عادي

~~~text الناتج
[Vue warn] Write operation failed: computed value is readonly
~~~

مفيش خطأ بيوقف البرنامج، warning بس، والقيمة فضلت 1950.

---

## ٥. computed بـ [[get]] و [[set]]

~~~text computed.mjs
const full = computed({
  get: () => first.value + ' ' + last.value,
  set: (v) => {
    ;[first.value, last.value] = v.split(' ')
  },
})
full.value = 'Mona Hassan'
~~~

- [[get]]: إزاي تتحسب.
- [[set]]: لما حد يكتب فيها، اعمل إيه. هنا [[split(' ')]] بتقسم النص عند المسافة لـ array، و [[[first.value, last.value] = ...]] array destructuring بيحط كل جزء في مكانه.
- الـ [[;]] في أول السطر: لما سطر يبدأ بـ [[[]] والكود من غير semicolons، JavaScript ممكن يلزقه في السطر اللي قبله. الـ [[;]] بتمنع ده.

~~~text الناتج
Mona | Hassan | Mona Hassan
~~~

الكتابة في [[full]] غيّرت [[first]] و [[last]]، و [[full]] اتحسب تاني منهم.

---

## ٦. في component

~~~text Cart.vue
<script setup lang="ts">
const total = computed(() => items.value.reduce(...))
</script>
<template>
  <p>الإجمالي: {{ total }}</p>
</template>
~~~

في الـ template من غير [[.value]]، والـ template نفسه بيتعاد لما [[total]] يتغير بس.

---

## الخلاصة

| | دالة عادية | [[computed]] |
|---|---|---|
| بتتحسب | كل نداء | لما اللي بتقراه يتغير، ولما حد يقراها |
| ١٠٠ قراية | ١٠٠ حساب | حساب واحد |
| side effects | مسموح | لأ، pure بس |
| الكتابة فيها | - | warning، إلا لو ليها [[set]] |`,
          lines: [
            R`بيستورد [[ref]] للبيانات الأصلية و [[computed]] للقيم اللي بتتحسب منها.`,
            R`[[items]] ref فيه array السلة. لأنه ref، Vue بيراقب كل خانة جوه كل منتج (حتى [[qty]])، فأي تغيير عميق هيخلي الـ computed يتحسب من جديد.`,
            R`أول منتج: كيبورد سعره 900 والكمية 1، يعني 900.`,
            R`تاني منتج: ماوس سعره 350 والكمية 2، يعني 700. فالمجموع الأول 1600.`,
            R`قفلة الـ array والـ [[ref]].`,
            R`[[runs]] متغير عادي بنعد بيه الحساب اتعمل كام مرة، عشان نثبت إن [[computed]] مش بيحسب كل ما تقراه.`,
            R`[[computed]] بياخد دالة ويرجّع ref للقراية بس ([[total.value]]). Vue بيشغّل الدالة أول ما حد يقرا القيمة، ويحفظ النتيجة (cache)، ومبيعيدش الحساب غير لما حاجة الدالة قرتها تتغير.`,
            R`بيزوّد العدّاد كل ما الدالة تشتغل فعلًا. في كود حقيقي الـ computed لازم يحسب ويرجّع بس، من غير side effects زي كده.`,
            R`[[reduce]] بيلف على المنتجات ويجمع [[price * qty]] لكل واحد، والـ [[0]] في الآخر هي قيمة البداية. وهي بتقرا [[items.value]] و [[price]] و [[qty]]، Vue بيسجّلهم كـ dependencies للـ computed.`,
            R`قفلة دالة الـ [[computed]].`,
            R`بيقرا [[total]] ٣ مرات ورا بعض ويطبع [[1600 1600 1600 | runs: 1]]: أول قراية حسبت، والاتنين اللي بعدها خدوا النتيجة المحفوظة. لو كانت دالة عادية كانت هتشتغل ٣ مرات.`,
            R`بيغيّر كمية الماوس لـ 3 جوه الـ array. ده تغيير عميق في خانة قرتها الدالة، فـ Vue بيعلّم [[total]] إنه «قديم»، بس مبيحسبوش غير لما حد يقراه.`,
            R`القراية دي بتحسب من جديد: [[1950]] (900 + 350×3) و [[runs: 2]]. يعني الحساب بيحصل مرة لكل تغيير مش مرة لكل قراية.`,
            R`محاولة كتابة في computed عادي (اللي معمول بدالة بس): القيمة مبتتغيرش و Vue بيطبع warning [[computed value is readonly]]. القيمة المحسوبة بتتغير لما تغيّر البيانات اللي بتتحسب منها، مش بإنك تكتب فيها.`,
            R`[[first]] ref فيه الاسم الأول، هنعمل منه ومن [[last]] اسم كامل.`,
            R`[[last]] ref فيه الاسم الأخير [[Ali]]، و [[full]] هيتحسب من الاتنين.`,
            R`[[computed]] بـ object فيه [[get]] و [[set]] بدل دالة واحدة، فبيبقى قابل للكتابة. ده مفيد مثلًا مع [[v-model]] على قيمة محسوبة.`,
            R`[[get]] بيحسب القيمة: الاسمين وبينهم مسافة. ده اللي بيرجع لما تقرا [[full.value]]، وبيتعمله cache زي أي computed.`,
            R`[[set]] بيتنادى لما حد يكتب [[full.value = ...]]، والقيمة الجديدة بتيجي في [[v]]. وظيفته يغيّر البيانات الأصلية، والـ [[get]] هيحسب الجديد منها.`,
            R`[[v.split(' ')]] بيقسم النص عند المسافة لـ array، والـ destructuring بيحط أول جزء في [[first.value]] والتاني في [[last.value]]. والـ [[;]] في أول السطر حماية في الكود اللي من غير semicolons: السطر اللي بيبدأ بقوس مربع ممكن JavaScript يلزقه في السطر اللي قبله ويقراهم كأنهم سطر واحد.`,
            R`قفلة دالة [[set]].`,
            R`قفلة الـ object والـ [[computed]].`,
            R`كتابة في [[full]]: الـ [[set]] بيتنفّذ فيبقى [[first]] = [[Mona]] و [[last]] = [[Hassan]].`,
            R`بيطبع [[Mona | Hassan | Mona Hassan]]: الـ [[set]] غيّر الاتنين، و [[full.value]] اتحسب من جديد بالـ [[get]] منهم.`
          ],
          sol: R`[[runs: 1]] بعد ٣ قرايات، و [[runs: 2]] بعد ما الكمية اتغيرت. ده الـ cache.

و [[expensive]]:`,
          solCode: R`<script setup lang="ts">
import { ref, computed } from 'vue'

const items = ref([
  { name: 'كيبورد', price: 900 },
  { name: 'ماوس', price: 350 },
])
const expensive = computed(() => items.value.filter((i) => i.price > 500))
</script>

<template>
  <ul>
    <li v-for="i in expensive" :key="i.name">{{ i.name }}</li>
  </ul>
</template>`
        },
        {
          cmd: "watch و watchEffect",
          title: "تعمل حاجة لما قيمة تتغير: watch و watchEffect",
          desc: R`[[watch(source, callback)]] بيستنى قيمة معيّنة تتغير ويديك الجديدة والقديمة، ومش بيشتغل أول مرة إلا لو قلتله [[{ immediate: true }]]. [[watchEffect(fn)]] بيشغّل الدالة فورًا ويعيدها لما أي قيمة reactive قرتها تتغير.

الاتنين للـ side effects: request للسيرفر، أو حفظ في localStorage، أو تغيير [[document.title]]. لو محتاج قيمة محسوبة بس، ده [[computed]].`,
          example: R`import { ref, reactive, watch, watchEffect, onWatcherCleanup, nextTick } from 'vue'

const q = ref('')
const filters = reactive({ city: 'cairo', price: { max: 100 } })

watch(q, (now, before) => console.log('q:', JSON.stringify(before), '->', JSON.stringify(now)))
watch(() => filters.city, (city) => console.log('city ->', city))
watch(filters, () => console.log('filters changed (deep)'))
watch(q, (v) => console.log('once:', v), { once: true })

watchEffect(() => {
  const term = q.value
  const ctrl = new AbortController()
  console.log('fetch', JSON.stringify(term))
  onWatcherCleanup(() => {
    ctrl.abort()
    console.log('abort', JSON.stringify(term))
  })
})

q.value = 'vu'
await nextTick()
q.value = 'vue'
await nextTick()
filters.price.max = 200
await nextTick()
filters.city = 'alex'
await nextTick()`,
          try: R`شغّله ([[node watch.mjs]]) واقرا الناتج سطر سطر. ليه [[city ->]] مظهرش لما [[price.max]] اتغير؟ بعدين اعمل watch على [[q]] بيحفظه في [[localStorage]] بـ [[{ immediate: true }]] جوه component، وشوف الـ Application tab في DevTools.`,
          flag: "script",
          deep: {
            why: R`فيه حاجات مش «قيمة» بتتحسب، دي «حاجة بتحصل»: البحث اتغير فهات نتايج من السيرفر، اللغة اتغيرت فغيّر [[dir]] الصفحة، الفورم اتغير فاحفظ مسودة. دي شغلانة الـ watchers.`,
            how: R`الـ source في [[watch]] واحد من ٤: ref، أو reactive (بيبقى deep لوحده)، أو getter ([[() => filters.city]]) لخانة واحدة، أو array منهم. ومش ينفع [[watch(filters.city, ...)]] لأن ده string عادي مش متراقب، لازم getter.

الـ callback بيشتغل بعد التغيير ومش أول مرة، و [[immediate: true]] بيشغّله أول مرة كمان، و [[once: true]] (من Vue 3.4) مرة واحدة وخلاص، و [[deep: true]] بيراقب جوه object من getter، و [[flush: 'post']] بيستنى الـ DOM يتحدّث.

[[watchEffect]] بيعرف لوحده هو بيعتمد على إيه من اللي قراه وهو شغال. و [[onWatcherCleanup]] (Vue 3.5) بيسجّل دالة بتشتغل قبل المرة الجاية أو لما الـ watcher يقف، ودي الطريقة تلغي بيها request قديم. وأي watcher جوه [[setup]] بيقف لوحده لما الـ component يتشال، وبرا component لازم توقفه بالدالة اللي بيرجّعها: [[const stop = watch(...); stop()]].`,
            when: R`[[watch]] لما عايز القيمة القديمة، أو تتحكم إمتى يشتغل (مش أول مرة، أو مرة واحدة)، أو المصدر واضح وواحد. [[watchEffect]] لما الـ effect بيقرا كذا حاجة ومش عايز تكتبهم كلهم. والاتنين للـ side effects بس.`,
            mistakes: R`تستخدم watch عشان تحدّث state من state ([[watch(a, v => b.value = v * 2)]]): ده computed. وتعمل [[watch(props.id, ...)]] فميشتغلش أبدًا، الصح [[watch(() => props.id, ...)]]. وتنسى إن الـ watcher جوه دالة async بعد [[await]] مش بيتربط بالـ component فمبيقفش لوحده. وتعمل [[deep: true]] على list فيها آلاف العناصر من غير داعي.`
          },
          teach: R`## الفكرة: «لما ده يتغير، اعمل كذا»

شغّلنا الكود في Node 24.22 مع vue 3.5.44. الناتج كله تحت، وهنفكه watcher watcher.

---

## ١. البيانات

- [[q]]: نص البحث، ref.
- [[filters]]: object فيه [[city]] و [[price.max]]، reactive.

---

## ٢. الـ ٤ watchers

| السطر | بيراقب | بيشتغل إمتى |
|---|---|---|
| [[watch(q, (now, before) => ...)]] | الـ ref كله | لما [[q.value]] يتغير، ومعاه القديم والجديد |
| [[watch(() => filters.city, ...)]] | getter لخانة واحدة | لما [[city]] بس تتغير |
| [[watch(filters, ...)]] | الـ reactive كله | أي تغيير جواه مهما كان عميق |
| [[watch(q, ..., { once: true })]] | [[q]] | أول تغيير بس |

و [[JSON.stringify]] عشان النص الفاضي يبان [[""]] في الناتج.

---

## ٣. الـ [[watchEffect]] اللي بيلغي الطلب القديم

~~~text watch.mjs
watchEffect(() => {
  const term = q.value
  const ctrl = new AbortController()
  console.log('fetch', JSON.stringify(term))
  onWatcherCleanup(() => {
    ctrl.abort()
    console.log('abort', JSON.stringify(term))
  })
})
~~~

- بيقرا [[q.value]]، فبيتعاد لما [[q]] يتغير.
- [[AbortController]] هو اللي بتلغي بيه [[fetch]] (شوف درس «fetch و AbortController» في «تاب JavaScript»). هنا بنطبع بدل ما نعمل fetch حقيقي.
- [[onWatcherCleanup]]: الدالة دي هتشتغل **قبل** المرة الجاية. يعني لو المستخدم كتب حرف جديد قبل ما الرد يرجع، الطلب القديم يتلغي.
- [[const term = q.value]] في الأول مهم: لو كتبنا [[q.value]] جوه الـ cleanup، هيقرا القيمة الجديدة مش القديمة (جربناها وطبعت [["vu"]] وهي بتلغي طلب [[""]]).

---

## ٤. الناتج

~~~text الناتج
fetch ""
q: "" -> "vu"
once: vu
abort ""
fetch "vu"
q: "vu" -> "vue"
abort "vu"
fetch "vue"
filters changed (deep)
city -> alex
filters changed (deep)
~~~

### نقرا الناتج

| السطر | ليه |
|---|---|
| [[fetch ""]] | [[watchEffect]] بيشتغل فورًا أول مرة. الـ [[watch]] لأ |
| [[q: "" -> "vu"]] | الـ [[watch]] على [[q]] اشتغل بعد التغيير وخد القيمتين: القديمة [[""]] والجديدة [["vu"]] |
| [[once: vu]] | أول تغيير، ومش هيظهر تاني |
| [[abort ""]] ثم [[fetch "vu"]] | الـ cleanup بتاع المرة اللي فاتت الأول، وبعدين المرة الجديدة |
| [[abort "vu"]] ثم [[fetch "vue"]] | نفس الكلام، و [[once]] مظهرش |
| [[filters changed (deep)]] لوحده | [[price.max]] اتغير: الـ watcher على [[filters]] كله شافه، والـ getter على [[city]] لأ |
| [[city ->]] و [[filters changed]] | [[city]] اتغيرت: الاتنين شافوها |

---

## ٥. [[immediate]] في component

~~~text Search.vue
watch(q, (v) => localStorage.setItem('q', v), { immediate: true })
~~~

من غير [[immediate]] أول قيمة مش هتتحفظ لحد أول تغيير.

---

## الخلاصة

| | [[watch]] | [[watchEffect]] |
|---|---|---|
| أول مرة | لأ (إلا [[immediate]]) | أيوه |
| بيراقب إيه | اللي انت قلته | اللي الدالة قرته |
| القيمة القديمة | أيوه | لأ |
| خانة في reactive | [[() => obj.x]] | اقراها جوه وخلاص |
| إلغاء القديم | [[onWatcherCleanup]] | [[onWatcherCleanup]] |`,
          lines: [
            R`بيستورد [[ref]] و [[reactive]] للبيانات، و [[watch]] و [[watchEffect]] للمراقبة، و [[onWatcherCleanup]] لتنضيف الشغل القديم قبل ما الـ watcher يتعاد (موجودة من Vue 3.5)، و [[nextTick]] عشان نستنى الـ watchers تشتغل.`,
            R`[[q]] ref فيه نص البحث، فاضي في الأول. هيتراقب بأكتر من watcher عشان نقارن بينهم.`,
            R`[[filters]] object reactive فيه خانة عادية ([[city]]) وخانة متداخلة ([[price.max]]). هنستخدمه عشان نشوف الفرق بين مراقبة خانة واحدة ومراقبة الـ object كله.`,
            R`[[watch]] على ref: أول argument هو اللي بيتراقب، والتاني callback بياخد القيمة الجديدة والقديمة. مبيشتغلش أول مرة (لازم تغيير)، وبيشتغل بعد ما [[q]] يتغير ويطبع [[q: "" -> "vu"]]. [[JSON.stringify]] عشان النص الفاضي يبان [[""]].`,
            R`[[watch]] على getter ([[() => filters.city]]): بيراقب القيمة اللي الدالة بترجّعها بس. لازم تكتبها كدالة، لأن [[watch(filters.city, ...)]] بيبعت النص [[cairo]] نفسه مش حاجة متراقبة، و Vue بيدّي warning. فتغيير [[price.max]] مش هيشغّله.`,
            R`[[watch]] على reactive object كله بيبقى deep لوحده: أي تغيير في أي خانة جواه، حتى [[price.max]] المتداخلة، بيشغّله. لو كان ref فيه object كنت هتحتاج [[{ deep: true }]].`,
            R`[[{ once: true }]] بيخلي الـ watcher يشتغل أول تغيير بس وبعدين يوقف لوحده، فيطبع [[once: vu]] مرة واحدة ومبيطبعش مع [[vue]].`,
            R`[[watchEffect]] مبتقولّوش يراقب إيه: بيشغّل الدالة فورًا مرة، وأي ref أو reactive اتقري جواها بيتسجّل، وبيتعاد لما يتغير. هنا بيراقب [[q]] لأنه قراه في السطر الجاي.`,
            R`بيقرا [[q.value]] ويحفظه في [[term]]. القراية دي هي اللي خلت الـ watchEffect يراقب [[q]]، و [[term]] بتفضل محفوظة للـ cleanup بتاع المرة دي بالذات.`,
            R`[[AbortController]] أداة من المتصفح و Node بتلغي طلب [[fetch]]: بتبعت [[ctrl.signal]] مع الطلب، ولما تنادي [[ctrl.abort()]] الطلب يقف. هنا بنعمله عشان نلغي البحث القديم لو اليوزر كتب حرف جديد قبل ما يخلص.`,
            R`بيطبع [[fetch ""]] أول مرة، وبعدين [[fetch "vu"]] و [[fetch "vue"]]. ده مكان الـ [[fetch]] الحقيقي في تطبيق بجد.`,
            R`[[onWatcherCleanup]] بتسجّل دالة تتنادى قبل ما الـ watcher يتعاد المرة الجاية (أو لما يتوقف). من غيرها الطلبات القديمة تفضل شغالة، وممكن رد [[vu]] يوصل بعد رد [[vue]] ويبوّظ النتايج (race condition). لازم تتنادى وانت لسه جوه الدالة قبل أي [[await]].`,
            R`بيلغي الطلب بتاع المرة اللي فاتت قبل ما يبدأ الجديد.`,
            R`بيطبع [[abort ""]] وبعدين [[abort "vu"]]: كل مرة القيمة القديمة بتتلغي قبل [[fetch]] الجديدة على طول.`,
            R`قفلة دالة الـ cleanup.`,
            R`قفلة الـ [[watchEffect]].`,
            R`أول تغيير لـ [[q]]. الـ watchers مبيشتغلوش في نفس اللحظة: Vue بيأجّلهم ويجمعهم.`,
            R`[[nextTick]] بيستنى لحد ما Vue يشغّل الـ watchers المتأجلين، فيطبع بالترتيب ده: [[q: "" -> "vu"]] ثم [[once: vu]] ثم [[abort ""]] ثم [[fetch "vu"]].`,
            R`تاني تغيير لـ [[q]]: من [[vu]] لـ [[vue]]، زي يوزر كتب حرف كمان.`,
            R`يطبع [[q: "vu" -> "vue"]] ثم [[abort "vu"]] ثم [[fetch "vue"]]، ومن غير [[once]] لأنه وقف بعد أول مرة.`,
            R`تغيير خانة متداخلة: [[price.max]] من 100 لـ 200. الـ getter بتاع [[city]] مش هيشوفه لأن [[city]] متغيرتش.`,
            R`يطبع [[filters changed (deep)]] بس، من الـ watcher اللي على [[filters]] كله.`,
            R`تغيير [[city]] لـ [[alex]]: ده بيشغّل الاتنين، الـ getter والـ watcher على الـ object كله.`,
            R`يطبع [[city -> alex]] و [[filters changed (deep)]]: الاتنين شافوا التغيير ده.`
          ],
          sol: R`[[city ->]] مظهرش مع [[price.max]] لأن الـ getter [[() => filters.city]] بيرجّع [[city]] بس، والقيمة دي متغيرتش ([['cairo']] قبل وبعد). الـ watcher على [[filters]] كله هو اللي شاف التغيير العميق.

وفي الـ component:`,
          solCode: R`<script setup lang="ts">
import { ref, watch } from 'vue'

const q = ref(localStorage.getItem('q') ?? '')
watch(q, (v) => localStorage.setItem('q', v), { immediate: true })
</script>

<template>
  <input v-model="q" />
</template>`
        },
        {
          cmd: "onMounted",
          title: "الـ lifecycle: كود لما الـ component يظهر أو يختفي، و template refs",
          desc: R`كل component بيعدي بمراحل: [[setup]] يتنفّذ، وبعدين يترسم في الصفحة ([[onMounted]])، ويتحدّث كل ما البيانات تتغير ([[onUpdated]])، وفي الآخر يتشال ([[onUnmounted]]). بتسجّل دالة لكل مرحلة جوه [[<script setup>]].

[[onMounted]] هو المكان اللي الـ DOM فيه جاهز: تقيس عنصر، أو تشغّل مكتبة رسم، أو timer. و [[onUnmounted]] بتنضّف فيه اللي عملته. و [[useTemplateRef('box')]] بيجيبلك العنصر اللي عليه [[ref="box"]].`,
          example: R`<script setup lang="ts">
import { ref, onMounted, onUpdated, onUnmounted, useTemplateRef, nextTick } from 'vue'

const now = ref(new Date().toLocaleTimeString('en-GB'))
const box = useTemplateRef<HTMLElement>('box')
let timer: number | undefined

console.log('setup: box =', box.value)
onMounted(() => {
  console.log('mounted: box =', box.value?.tagName)
  timer = window.setInterval(() => (now.value = new Date().toLocaleTimeString('en-GB')), 1000)
})
onUpdated(() => console.log('updated:', box.value?.textContent))
onUnmounted(() => {
  window.clearInterval(timer)
  console.log('unmounted: timer cleared')
})

async function bump() {
  now.value = 'تغيير'
  console.log('before nextTick:', box.value?.textContent)
  await nextTick()
  console.log('after nextTick:', box.value?.textContent)
}
</script>

<template>
  <p ref="box">{{ now }}</p>
  <button id="bump" @click="bump">غيّر</button>
</template>`,
          try: R`حط الـ component ده جوه أب عنده [[<Clock v-if="show" />]] وزرار بيعمل [[show = false]]. افتح الـ console واضغط «غيّر» وبعدين اقفله. بعدين امسح سطر [[clearInterval]] واقفله وافتحه كذا مرة: إيه اللي بيحصل في الـ console؟`,
          flag: "script",
          deep: {
            why: R`فيه حاجات مينفعش تتعمل في [[setup]] لأن الـ DOM لسه مش موجود: تقيس عرض عنصر، أو تشغّل مكتبة خرايط أو charts محتاجة عنصر حقيقي، أو تحط focus. وفيه حاجات لازم تتشال لما الـ component يمشي، وإلا تفضل شغالة في الخلفية (timers و listeners على [[window]] و WebSocket).`,
            how: R`الترتيب: [[setup]] ← [[onBeforeMount]] ← الرسم ← [[onMounted]] (الأولاد بيتعملهم mount قبل الأب) ← مع كل تغيير [[onBeforeUpdate]] ← تحديث الـ DOM ← [[onUpdated]] ← في الآخر [[onBeforeUnmount]] ← [[onUnmounted]]. وفيه كمان [[onErrorCaptured]] لأخطاء الأولاد، و [[onActivated]] و [[onDeactivated]] مع [[<KeepAlive>]].

[[useTemplateRef]] (Vue 3.5) بيرجّع ref فاضي ([[null]]) لحد ما العنصر يترسم. قبل 3.5 كنت بتعمل [[const box = ref(null)]] بنفس اسم الـ [[ref="box"]]، وهتشوفها كتير.

و [[nextTick]]: Vue بيحدّث الـ DOM مش فورًا بعد ما تغيّر state، بيجمّع التغييرات ويطبّقها في الـ microtask الجاي. فلو محتاج تقرا الـ DOM بعد تغيير، [[await nextTick()]].

ومفيش [[onCreated]] في Composition API: الكود في [[setup]] نفسه هو اللي بيتنفّذ وقت الإنشاء. وفي SSR (Nuxt) [[onMounted]] و [[onUpdated]] و [[onUnmounted]] مش بيشتغلوا على السيرفر خالص.`,
            when: R`[[onMounted]] لأي حاجة محتاجة DOM أو [[window]] (في Nuxt ده مهم جدًا). و [[onUnmounted]] لتنضيف أي حاجة اتعملت في [[onMounted]]. وجلب البيانات ممكن في [[setup]] على طول (مش لازم [[onMounted]])، بس في Nuxt استخدم [[useFetch]].`,
            mistakes: R`تقرا [[box.value]] في [[setup]] وتستغرب إنه [[null]]. وتعمل [[setInterval]] أو [[addEventListener]] من غير ما تشيله في [[onUnmounted]]: كل ما الـ component يتفتح يتعمل واحد زيادة ويفضلوا شغالين. وتغيّر state جوه [[onUpdated]] فتعمل loop. وتنادي [[onMounted]] بعد [[await]] في [[setup]]: لازم تتسجل قبل أي [[await]].`
          },
          teach: R`## الفكرة: دوال بتتنادى في مراحل حياة الـ component

حطينا الـ component ده ([[Clock.vue]]) جوه أب بـ [[v-if]]، وفتحناه في Chrome headless (Vue 3.5.44): استنينا ثانية، وضغطنا «غيّر»، وبعدين قفلناه. ده كل اللي طلع في الـ console.

---

## ١. التجهيز في [[setup]]

~~~text Clock.vue
const now = ref(new Date().toLocaleTimeString('en-GB'))
const box = useTemplateRef<HTMLElement>('box')
let timer: number | undefined
~~~

| السطر | معناه |
|---|---|
| [[toLocaleTimeString('en-GB')]] | الوقت كنص بصيغة 24 ساعة (18:56:10) |
| [[useTemplateRef<HTMLElement>('box')]] | هاتلي العنصر اللي عليه [[ref="box"]] في الـ template. [[<HTMLElement>]] نوعه |
| [[let timer]] | رقم الـ interval عشان نوقفه، ونوعه [[number]] أو [[undefined]]. متغير عادي مش ref لأنه مش بيظهر في الشاشة |

---

## ٢. الناتج كله

~~~text الناتج (الـ console)
setup: box = null
mounted: box = P
updated: 18:56:10
before nextTick: 18:56:10
updated: تغيير
after nextTick: تغيير
unmounted: timer cleared
~~~

---

## ٣. [[setup: box = null]]

الكود اللي في [[<script setup>]] بيتنفّذ **قبل** الرسم، فالـ [[<p>]] لسه مش موجود.

---

## ٤. [[onMounted]]

~~~text Clock.vue
onMounted(() => {
  console.log('mounted: box =', box.value?.tagName)
  timer = window.setInterval(() => (now.value = ...), 1000)
})
~~~

- [[box.value?.tagName]] طلع [[P]]: العنصر موجود. الـ [[?.]] (optional chaining) معناها «لو [[box.value]] null رجّع undefined من غير خطأ».
- [[setInterval(fn, 1000)]] بينادي الدالة كل ثانية (1000 ميلي ثانية)، وبيرجّع رقم بنحفظه.

---

## ٥. [[onUpdated]]

بعد ثانية الـ timer غيّر [[now]]، فالـ template اتعاد رسمه، و [[onUpdated]] اتنادى والـ DOM فيه الوقت الجديد: [[updated: 18:56:10]].

---

## ٦. [[nextTick]] في [[bump]]

~~~text Clock.vue
now.value = 'تغيير'
console.log('before nextTick:', box.value?.textContent)
await nextTick()
console.log('after nextTick:', box.value?.textContent)
~~~

~~~text الناتج
before nextTick: 18:56:10
updated: تغيير
after nextTick: تغيير
~~~

غيّرنا القيمة، بس الـ DOM لسه فيه الوقت القديم: Vue مش بيحدّث فورًا. [[await nextTick()]] استنى التحديث، فـ [[onUpdated]] اتنادى، وبعدها الـ DOM فيه «تغيير».

---

## ٧. [[onUnmounted]]

لما الأب عمل [[show = false]]، الـ [[v-if]] شال الـ component:

~~~text الناتج
unmounted: timer cleared
~~~

[[clearInterval(timer)]] وقف الـ timer. من غيره، الـ interval كان هيفضل شغال ويغيّر [[now]] في component مش موجود، ولو فتحته وقفلته ١٠ مرات يبقى ١٠ timers شغالين.

---

## الخلاصة

| المرحلة | الـ DOM | استخدامها |
|---|---|---|
| [[setup]] | مش موجود | الـ state والدوال وجلب البيانات |
| [[onMounted]] | موجود | تقيس، و focus، ومكتبات، و timers، و listeners |
| [[onUpdated]] | اتحدّث | نادرًا، ومتغيّرش state جواها |
| [[onUnmounted]] | اتشال | نضّف كل اللي عملته في [[onMounted]] |
| [[nextTick]] | - | استنى الـ DOM يتحدّث بعد تغيير |`,
          lines: [
            R`بداية الـ script بتاع الـ component. الكود اللي هنا بيشتغل مرة لكل نسخة، **قبل** ما الـ template يترسم، وده اللي هنثبته.`,
            R`بيستورد [[ref]] للوقت، و ٣ lifecycle hooks: [[onMounted]] (بعد أول رسم) و [[onUpdated]] (بعد كل تحديث للـ DOM) و [[onUnmounted]] (لما الـ component يتشال)، و [[useTemplateRef]] عشان نمسك عنصر من الـ template، و [[nextTick]] عشان نستنى الـ DOM يتحدّث.`,
            R`[[now]] ref فيه الوقت دلوقتي كنص زي [[14:05:09]]. [[toLocaleTimeString('en-GB')]] بيكتبه بنظام 24 ساعة. وهو ref عشان الـ timer لما يغيّره الشاشة تتحدّث.`,
            R`[[useTemplateRef('box')]] بيرجّع ref هيتملى بالعنصر اللي في الـ template عليه [[ref="box"]]. الاسم اللي بين الأقواس لازم يبقى نفس اللي في الـ template بالظبط. والنوع [[<HTMLElement>]] بيعرّف TypeScript إنه عنصر HTML.`,
            R`[[timer]] متغير عادي هنحفظ فيه رقم الـ interval اللي بيرجع من [[setInterval]]، عشان نقدر نوقفه بيه في [[onUnmounted]]. مش ref لأنه مش بيظهر على الشاشة.`,
            R`بيطبع [[setup: box = null]]: الـ template لسه مترسمش، فمفيش عنصر نمسكه. أي كود محتاج الـ DOM (قياس عنصر، [[focus]]، مكتبة رسم) مينفعش يتكتب هنا.`,
            R`[[onMounted]] بتسجّل دالة Vue يناديها بعد ما الـ component يترسم ويتحط في الصفحة. ده المكان الصح لأي حاجة محتاجة الـ DOM أو محتاجة تبدأ شغل في الخلفية.`,
            R`بيطبع [[mounted: box = P]]: دلوقتي [[box.value]] هو الـ [[<p>]] الحقيقي، و [[tagName]] بتاعه [[P]]. الـ [[?.]] حماية لو العنصر مش موجود (مثلًا عليه [[v-if]] false).`,
            R`بيشغّل timer يحدّث [[now]] كل 1000 ms (ثانية)، فالساعة على الشاشة تمشي. اتحط في [[onMounted]] مش في الـ setup عشان ميشتغلش في الـ SSR (السيرفر مبيعملش mount)، وبنحفظ رقمه في [[timer]]. و [[window.]] قدامه عشان TypeScript يعرف إن الرقم [[number]] مش [[Timeout]] بتاع Node.`,
            R`قفلة [[onMounted]].`,
            R`[[onUpdated]] بتشتغل بعد كل مرة Vue يحدّث فيها الـ DOM بتاع الـ component ده، فبتطبع النص الجديد كل ثانية مع الـ timer. نادرًا ما بتحتاجها، وأوعى تغيّر state جواها لأن ده هيعمل تحديث تاني ودوّامة.`,
            R`[[onUnmounted]] بتشتغل لما الـ component يتشال من الصفحة (مثلًا [[v-if]] بقى false، أو روحت صفحة تانية). ده مكان تنضيف أي حاجة بدأتها في [[onMounted]].`,
            R`بيوقف الـ timer برقمه. من غير السطر ده الـ interval يفضل يشتغل كل ثانية بعد ما الـ component يختفي، ولو اتفتح واتقفل كذا مرة الـ timers تتراكم (memory leak).`,
            R`بيطبع [[unmounted: timer cleared]] عشان تتأكد من الـ console إن التنضيف حصل.`,
            R`قفلة [[onUnmounted]].`,
            R`دالة [[bump]] للزرار. هي [[async]] عشان نقدر نستخدم [[await nextTick()]] جواها ونشوف الـ DOM قبل وبعد التحديث.`,
            R`بيغيّر [[now]]. Vue مبيحدّثش الـ DOM في نفس اللحظة، بيأجّل التحديث لحد ما الكود المتزامن يخلص، عشان لو غيّرت ١٠ حاجات يرسم مرة واحدة.`,
            R`بيطبع الوقت القديم: الـ ref اتغير بس الـ [[<p>]] لسه متحدّثش. لو كودك محتاج يقيس العنصر أو يقرا نصه بعد التغيير على طول، هيقرا القديم.`,
            R`[[await nextTick()]] بيستنى لحد ما Vue يطبّق التحديثات على الـ DOM.`,
            R`بيطبع [[after nextTick: تغيير]]: دلوقتي الـ DOM اتحدّث. ده الحل لما تحتاج تعمل [[scrollIntoView]] أو [[focus]] على عنصر لسه ظاهر بسبب تغيير عملته.`,
            R`قفلة [[bump]].`,
            R`قفلة الـ [[<script setup>]]، وبعده الـ template اللي فيه العنصر اللي بنمسكه.`,
            R`بداية الـ [[<template>]]: العنصر اللي هيتمسك والزرار اللي بيغيّره.`,
            R`[[ref="box"]] بيربط الـ [[<p>]] ده بـ [[useTemplateRef('box')]] اللي فوق، و [[{{ now }}]] بيعرض الوقت ويتحدّث مع كل تغيير.`,
            R`زرار بينادي [[bump]] لما يتضغط، و [[id]] عشان تلاقيه بسهولة في DevTools.`,
            R`قفلة الـ [[<template>]]، وده آخر الـ component.`
          ],
          sol: R`مع [[clearInterval]]: لما تقفله بيطبع [[unmounted: timer cleared]] وخلاص.

من غير [[clearInterval]]: الـ interval بيفضل شغال بعد ما الـ component يتشال (مفيش [[updated]] لأن الـ component مش موجود، بس الدالة بتتنادى كل ثانية في الخلفية). جربناها: فتحناه ٣ مرات وقفلناه، وفي الـ ٣ ثواني اللي بعد القفل الدالة اتنادت ٩ مرات (٣ timers × ٣ ثواني) والـ component مش موجود أصلًا. ده memory leak: كل [[setInterval]] أو [[addEventListener]] على [[window]] في [[onMounted]] لازم يقابله تنضيف في [[onUnmounted]].`,
          solCode: R`<script setup lang="ts">
import { ref } from 'vue'
import Clock from './Clock.vue'

const show = ref(true)
</script>

<template>
  <Clock v-if="show" />
  <button @click="show = !show">اقفل وافتح</button>
</template>`
        }
      ]
    }
]);

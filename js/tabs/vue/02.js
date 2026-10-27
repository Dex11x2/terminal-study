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
            R`استورد دوال الـ reactivity من [[vue]].`,
            R`[[count]] صندوق قيمته 0.`,
            R`بيطبع القيمة من [[.value]]، و [[isRef]] بيأكد إنه ref.`,
            R`[[user]] object متراقب، والـ array اللي جواه كمان.`,
            R`من غير [[.value]]، والاتنين reactive.`,
            "دالة بتتعاد لما count أو user.name يتغيروا.",
            "غيّر count.",
            "غيّر الاسم.",
            "استنى Vue يطبّق التحديثات (الـ effect بيشتغل مرة واحدة).",
            R`destructuring: [[name]] بقى نص عادي.`,
            R`[[toRefs]]: ref لكل خانة، مربوط بالأصل.`,
            "غيّر الاسم تاني.",
            R`[[name]] لسه القديم، و [[refs.name]] الجديد.`,
            "object عادي.",
            R`[[reactive]] بيرجّع Proxy حواليه.`,
            "الـ Proxy مش هو الأصل، بس Vue بيرجّع نفس الـ Proxy كل مرة.",
            "array جوه ref.",
            R`[[push]] متراقبة.`,
            "الطول بقى 3."
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
            R`استورد [[ref]] و [[computed]].`,
            "السلة: array من المنتجات.",
            "كيبورد بـ 900 وواحد.",
            "ماوس بـ 350 واتنين.",
            "قفلة الـ array.",
            "عدّاد بيعد الحساب حصل كام مرة.",
            R`[[total]] قيمة محسوبة.`,
            "زوّد العدّاد كل ما الدالة تشتغل.",
            R`اجمع [[price * qty]] لكل منتج.`,
            "قفلة الـ computed.",
            "٣ قرايات ورا بعض، والعدّاد.",
            "غيّر كمية الماوس.",
            "اقرا تاني: اتحسب من جديد.",
            "كتابة في computed عادي: warning.",
            "الاسم الأول.",
            "الاسم الأخير.",
            R`computed بـ [[get]] و [[set]].`,
            "بيتحسب من الاتنين.",
            "لما حد يكتب فيه...",
            "اقسم النص وحط كل جزء في مكانه.",
            R`قفلة [[set]].`,
            "قفلة الـ computed.",
            R`اكتب في [[full]]: الـ [[set]] بيتنفّذ.`,
            "اطبع الاتنين والاسم الكامل."
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
| [[q: "" -> "vu"]] | القديم والجديد |
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
            "استورد دوال الـ reactivity والـ watchers.",
            "نص البحث.",
            "فلاتر متداخلة.",
            "watch على ref: بياخد الجديد والقديم.",
            "getter: بيراقب city بس.",
            "reactive كله: deep لوحده.",
            R`[[once]]: أول تغيير بس.`,
            "watchEffect: بيشتغل فورًا ولما q يتغير.",
            "خد نسخة من القيمة دلوقتي.",
            "أداة إلغاء الطلب.",
            "اطبع إننا بنجيب نتايج.",
            "سجّل اللي يتعمل قبل المرة الجاية.",
            "الغي الطلب القديم.",
            "اطبع إنه اتلغى.",
            "قفلة الـ cleanup.",
            "قفلة الـ watchEffect.",
            R`غيّر [[q]].`,
            "استنى الـ watchers.",
            R`غيّر [[q]] تاني.`,
            "استنى.",
            "غيّر خانة عميقة.",
            "استنى.",
            "غيّر المدينة.",
            "استنى."
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
            "بداية الـ script.",
            "استورد الـ ref والـ hooks و useTemplateRef و nextTick.",
            "الوقت دلوقتي كنص.",
            R`هيبقى فيه عنصر [[<p ref="box">]] بعد الرسم.`,
            "رقم الـ interval عشان نوقفه.",
            "في setup: العنصر لسه null.",
            "لما الـ component يترسم...",
            "العنصر موجود دلوقتي.",
            "شغّل timer يحدّث الوقت كل ثانية.",
            R`قفلة [[onMounted]].`,
            "بعد كل تحديث للـ DOM.",
            "لما الـ component يتشال...",
            "وقّف الـ timer.",
            "اطبع إننا نضّفنا.",
            R`قفلة [[onUnmounted]].`,
            "دالة الزرار، async عشان await.",
            "غيّر القيمة.",
            "الـ DOM لسه القديم.",
            "استنى Vue يحدّث الـ DOM.",
            "دلوقتي الـ DOM الجديد.",
            "قفلة الدالة.",
            "قفلة الـ script.",
            "بداية الـ template.",
            R`العنصر اللي [[box]] بيشاور عليه.`,
            R`زرار بينادي [[bump]].`,
            "قفلة الـ template."
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

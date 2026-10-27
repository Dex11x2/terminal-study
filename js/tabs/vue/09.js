// تكملة تاب vue: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vue/01.js (شرح حقول الدرس في أوله)
MORE("vue", [
    {
      t: "الأداء",
      l: 3,
      n: "Vue سريع لوحده، فقيس الأول: v-memo و shallowRef للـ lists الكبيرة، و lazy components والـ bundle للتحميل",
      items: [
        {
          cmd: "v-memo و shallowRef",
          title: "list فيها آلاف العناصر: v-memo و v-once و shallowRef و markRaw",
          desc: R`[[v-memo="[a, b]"]] على عنصر بيقول لـ Vue «متعيدش رسم ده إلا لو [[a]] أو [[b]] اتغيروا»، فلما تختار صف واحد من ٥٠٠٠، Vue بيقارن صفين بس بدل ٥٠٠٠. و [[v-once]] يرسم مرة وخلاص.

و [[shallowRef]] بيراقب القيمة نفسها بس مش اللي جواها، فـ array فيها ١٠٠ ألف object مش هيتعمل لكل واحد Proxy. و [[markRaw]] لـ object مش عايزه reactive خالص (instance مكتبة charts أو maps).`,
          example: R`<script setup lang="ts">
import { ref, shallowRef, nextTick } from 'vue'

const rows = shallowRef(Array.from({ length: 5000 }, (_, i) => ({ id: i, name: 'منتج ' + i })))
const selected = ref(-1)

async function select(id: number) {
  const t = performance.now()
  selected.value = id
  await nextTick()
  console.log('v-memo: ' + (performance.now() - t).toFixed(1) + 'ms')
}
</script>

<template>
  <button @click="select(selected + 1)">اختار اللي بعده</button>
  <div v-for="row in rows" :key="row.id" v-memo="[row.id === selected]" :class="{ sel: row.id === selected }">
    {{ row.name }}
  </div>
</template>`,
          try: R`اضغط الزرار ٦ مرات واقرا الأوقات في الـ console، وبعدين شيل [[v-memo]] وكرر. جرّب في [[npm run dev]] وبعدين في [[npm run build]] و [[npm run preview]]: الفرق لسه كبير؟ وبعدين افتح Vue DevTools ← Performance.`,
          flag: "script",
          deep: {
            why: R`Vue بيعيد رسم الـ component كله لما state يتغير، ويقارن الـ virtual DOM الجديد بالقديم. مع ٥٠ عنصر ده ولا حاجة. مع ٥٠٠٠ صف في جدول وكل ضغطة بتغيّر صف واحد، المقارنة بتاخد وقت ملحوظ على موبايل ضعيف. وفي نفس الوقت، [[ref]] على array ضخمة بيعمل Proxy لكل object جواها أول ما تقراه، وده تكلفة على الذاكرة والوقت لبيانات انت بتبدّلها كلها مرة واحدة.`,
            how: R`[[v-memo]] بيحفظ الـ vnode بتاع العنصر ومعاه الـ array اللي اديته. في الـ render الجاي لو كل القيم في الـ array زي ما هي (بـ [[===]])، Vue بيستخدم القديم ومبيدخلش جواه خالص. فلازم الـ array تحتوي **كل** حاجة الـ template بتاع العنصر بيعتمد عليها، وإلا الشاشة هتفضل قديمة.

[[shallowRef]] بيعمل reactivity لـ [[.value]] بس: [[rows.value = newArray]] بيحدّث، لكن [[rows.value[0].name = 'x']] مش بيحدّث حاجة (ممكن تنادي [[triggerRef(rows)]]). و [[markRaw(obj)]] بيعلّم الـ object إنه ميتعملهوش Proxy أبدًا حتى لو اتحط جوه reactive. و [[v-once]] بيرسم العنصر مرة ويعامله كـ static بعد كده.

وفي Vue 3.6 (لسه RC في أكتوبر ٢٠٢٦) فيه Vapor Mode اختياري بيشيل الـ virtual DOM من الـ components اللي تختارها (شوف درس [[Svelte و SvelteKit]]).`,
            when: R`بعد ما تقيس وتلاقي مشكلة: list أو جدول فيه آلاف العناصر بيتحدّث كتير، أو بيانات كبيرة من API بتتبدّل كلها. قبل كده متستخدمهمش. ولـ list فيها ١٠ آلاف صف، الحل الأحسن virtual scrolling (ترسم اللي ظاهر بس): [[@tanstack/vue-virtual]] أو [[vue-virtual-scroller]].`,
            mistakes: R`تنسى قيمة في [[v-memo]] فالصف ميتحدّثش لما حاجة تانية تتغير (مثلًا الاسم اتعدّل). وتحط [[v-memo]] على كل حاجة «احتياطي». وتعدّل جوه [[shallowRef]] وتستغرب إن الشاشة مش بتتحدّث. وتقيس في [[npm run dev]] بس: الـ dev build فيه checks و warnings وأبطأ بكتير من الإنتاج.`
          },
          teach: R`## الفكرة: قول لـ Vue إيه اللي ممكن يتغير، ومتراقبش اللي مش محتاج

قسنا في Chrome headless (Vue 3.5.44) نسخة فيها [[v-memo]] ونسخة من غيره (نفس الـ component، الاتنين ورا [[v-if]] بيختار حسب الـ URL)، ٦ ضغطات لكل واحدة، مرة في [[npm run dev]] ومرة في build الإنتاج ([[vite preview]]). و [[shallowRef]] قسناه في Node.

---

## ١. البيانات

~~~text Memo.vue
const rows = shallowRef(Array.from({ length: 5000 }, (_, i) => ({ id: i, name: 'منتج ' + i })))
~~~

- [[Array.from({ length: 5000 }, fn)]]: array فيها ٥٠٠٠ عنصر، كل واحد من الدالة، و [[i]] رقمه.
- [[shallowRef]]: الـ ٥٠٠٠ object مش هيبقوا reactive، و [[rows.value = ...]] بس هو اللي بيتراقب.

---

## ٢. القياس

[[performance.now()]] قبل التغيير، و [[await nextTick()]] (Vue خلّص تحديث الـ DOM)، وبعدين الفرق. ده وقت Vue بس، مش رسم المتصفح.

---

## ٣. [[v-memo="[row.id === selected]"]]

لكل صف: «القيمة الوحيدة اللي بتفرق معاك هي: هل انت المختار؟». لما [[selected]] يتغير من 3 لـ 4، الصفين 3 و 4 بس قيمتهم اتغيرت، والـ ٤٩٩٨ التانيين Vue بيعدّيهم من غير ما يقارن.

---

## ٤. الناتج

~~~text الناتج (npm run dev)
no memo: 6.3ms   7.1ms   8.1ms   6.6ms   6.0ms   5.1ms
v-memo:  2.1ms   2.7ms   1.9ms   1.0ms   0.7ms   1.4ms
~~~

~~~text الناتج (build الإنتاج، vite preview)
no memo: 8.4ms   3.7ms   2.3ms   2.3ms   3.4ms   1.0ms
v-memo:  1.9ms   1.0ms   1.8ms   0.8ms   0.9ms   0.7ms
~~~

### نقرا الأرقام

- في التطوير الفرق كبير (حوالي ٤ أضعاف): الـ dev build فيه checks كتير لكل vnode.
- في الإنتاج Vue من غير [[v-memo]] بياخد ١ لـ ٤ ms لـ ٥٠٠٠ صف (أول ضغطة أبطأ لأن الـ JIT بتاع المتصفح لسه مسخّنش). [[v-memo]] بيقلّلها لأقل من ٢ ms.
- الخلاصة الأمينة: على لابتوب، ٣ ms مش هتحس بيها. على موبايل ضعيف (أبطأ ٤ لـ ٥ مرات) ومع حاجة بتتحدّث كتير، بتفرق. **قيس الأول.**

---

## ٥. [[shallowRef]] ضد [[ref]] (Node)

~~~text shallow.mjs
const deep = ref(big.map((x) => ({ ...x })))      // ١٠٠ ألف object
for (const r of deep.value) sum += r.price
const flat = shallowRef(big.map((x) => ({ ...x })))
for (const r of flat.value) sum += r.price
~~~

~~~text الناتج
ref loop: 126.5ms | item reactive: true
shallowRef loop: 6.1ms | item reactive: false
effect: first price = 0
(no effect after deep change)
effect: first price = 999
markRaw reactive? false
~~~

| السطر | ليه |
|---|---|
| [[ref loop: 126.5ms]] | أول مرة تقرا كل object، Vue بيعمله Proxy ويخزّنه: ١٠٠ ألف Proxy |
| [[shallowRef loop: 6.1ms]] | objects عادية، مفيش Proxy |
| [[no effect after deep change]] | [[flat.value[0].price = 999]] مش بيتراقب |
| [[first price = 999]] | [[flat.value = [...flat.value]]] (array جديدة) هو اللي حرّك الـ effect |
| [[markRaw reactive? false]] | object عليه [[markRaw]] حطيناه جوه [[ref]]، وفضل عادي |

---

## الخلاصة

| الأداة | استخدمها لما |
|---|---|
| [[v-memo="[...]"]] | list كبيرة وكل تحديث بيغيّر عناصر قليلة |
| [[v-once]] | محتوى بيترسم مرة ومش بيتغير |
| [[shallowRef]] | بيانات كبيرة بتتبدّل كلها (رد API) |
| [[markRaw]] | instance مكتبة (chart، map) جوه state |
| virtual scrolling | آلاف الصفوف كلها ظاهرة في scroll |
| القياس | في build الإنتاج، و Vue DevTools ← Performance |`,
          lines: [
            "بداية الـ script.",
            R`استورد [[ref]] و [[shallowRef]] و [[nextTick]].`,
            R`٥٠٠٠ صف في [[shallowRef]]: الـ objects مش reactive.`,
            "الصف المختار.",
            "دالة الاختيار، بتقيس الوقت...",
            "الوقت قبل.",
            "غيّر المختار.",
            "استنى Vue يحدّث الـ DOM.",
            "اطبع الوقت اللي خده.",
            "قفلة الدالة.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "زرار بيختار الصف اللي بعده.",
            R`صف لكل عنصر، و [[v-memo]]: متعيدش رسمه إلا لو بقى (أو بطّل) مختار.`,
            "الاسم.",
            "قفلة الصف.",
            "قفلة الـ template."
          ],
          sol: R`في [[npm run dev]] [[v-memo]] بيبقى أسرع بحوالي ٤ أضعاف (عندنا ٥ لـ ٨ ms من غيره و ١ لـ ٣ ms معاه). وفي build الإنتاج الاتنين أسرع بكتير، والفرق بيبقى ١ لـ ٢ ms. يعني [[v-memo]] شغال فعلًا، بس محتاجه لما القياس يقول إن عندك مشكلة، مش في كل list.`
        },
        {
          cmd: "defineAsyncComponent و الـ bundle",
          title: "تحمّل component تقيل لما يتطلب بس، وتعرف الـ bundle فيه إيه",
          desc: R`[[defineAsyncComponent(() => import('./HeavyChart.vue'))]] بيخلي الـ component ملف JS لوحده، بيتنزّل أول مرة يترسم بس (زي lazy routes في درس [[beforeEach]]). ومعاه [[loadingComponent]] و [[delay]] و [[timeout]].

وعشان تعرف التحميل الأول تقيل ليه، بص على ناتج [[vite build]]: أي حاجة بتعملها import في [[main.ts]] بتدخل الـ bundle الأساسي اللي كل زائر بينزّله.`,
          example: R`<script setup lang="ts">
import { ref, h, defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent({
  loader: () => import('@/components/HeavyChart.vue'),
  loadingComponent: () => h('p', 'بيحمّل الرسم...'),
  delay: 200,
  timeout: 10_000,
})
const show = ref(false)
</script>

<template>
  <button @click="show = true">اعرض الرسم</button>
  <HeavyChart v-if="show" />
</template>`,
          try: R`اعمل [[HeavyChart.vue]] فيه أي SVG، و [[npm run build]] ثم [[npm run preview]]. افتح Network واضغط الزرار: ملف جديد اتنزّل؟ بعدين في [[main.ts]] زوّد [[import]] لمكتبة كبيرة (vue-i18n مثلًا) واعمل build تاني: [[index-xxxx.js]] كبر قد إيه؟`,
          flag: "script",
          deep: {
            why: R`التحميل الأول هو أكتر حاجة المستخدم بيحس بيها. لو صفحة الرئيسية بتنزّل كود charts و editor و maps مع إن ٩٠٪ من الزوار مش هيفتحوهم، انت بتخليهم يستنوا على الفاضي. ومكتبات تقيلة بتتضاف في [[main.ts]] من غير ما حد ياخد باله.`,
            how: R`[[import()]] الديناميكي بيقول لـ Vite (Rolldown في Vite 8) «اعمل chunk منفصل». [[defineAsyncComponent]] بيلف الـ Promise: لحد ما تخلص بيعرض [[loadingComponent]] (لو عدّى [[delay]] ms، عشان ميعملش flicker لو التحميل سريع)، ولو عدّى [[timeout]] بيعرض [[errorComponent]]. والـ [[loadingComponent]] هنا render function بـ [[h()]]، لأن [[{ template: '...' }]] محتاج نسخة Vue فيها compiler، والـ build العادي من غيره.

في Nuxt مش محتاج تكتب ده: أي component اسمه بيبدأ بـ [[Lazy]] ([[<LazyHeavyChart v-if="show" />]]) بيبقى async لوحده. ولتشوف الـ bundle بالتفصيل، [[rollup-plugin-visualizer]] أو [[npx vite-bundle-visualizer]] بيرسموا كل مكتبة واخدة قد إيه (من الـ docs). و [[<KeepAlive>]] بيحفظ components اتقفلت عشان متتعملش من الأول.`,
            when: R`components تقيلة ومش ظاهرة في الأول: charts، و rich text editor، و maps، و modals كبيرة، و تابات مش مفتوحة. وأي plugin بيتسجّل في [[main.ts]] اسأل: «كل الصفحات محتاجاه؟».`,
            mistakes: R`تعمل كل component صغير async فتعمل ٥٠ طلب شبكة صغيرين. وتكتب [[loadingComponent: { template: '<p>...</p>' }]] فيطلع warning ومحدش يظهر في الإنتاج. وتعمل [[import HeavyChart from ...]] عادي في مكان تاني في نفس الصفحة فيدخل الـ bundle الأساسي ويبطل الـ lazy. وتحكم على الأداء من [[npm run dev]] (Vite مش بيعمل bundle في التطوير).`
          },
          teach: R`## الفكرة: الكود اللي مش محتاجه دلوقتي، متنزّلوش دلوقتي

عملنا [[vite build]] (Vite 8.3.5) وشغّلنا [[vite preview]]، وفتحنا الصفحة في Chrome headless وسجّلنا ملفات الـ JS اللي اتنزّلت قبل وبعد الضغط.

---

## ١. [[defineAsyncComponent({...})]]

| الخيار | معناه |
|---|---|
| [[loader: () => import('...')]] | الدالة اللي بتنزّل الملف (Promise) |
| [[loadingComponent: () => h('p', '...')]] | اعرض ده وهو بيحمّل. [[h(tag, children)]] بيعمل vnode من غير template |
| [[delay: 200]] | متعرضش الـ loading غير لو التحميل عدّى 200ms |
| [[timeout: 10_000]] | لو عدّى ١٠ ثواني اعتبره فشل |

و [[<HeavyChart v-if="show" />]]: مش بيترسم (فمش بيتنزّل) غير لما [[show]] تبقى true.

---

## ٢. ناتج الـ build

~~~text الناتج (مختصر)
dist/assets/HeavyChart-CxIu4bXN.js      0.45 kB │ gzip:  0.37 kB
dist/assets/Async-COTTgD6g.js           0.65 kB │ gzip:  0.46 kB
dist/assets/index-BfaJioPb.js         213.78 kB │ gzip: 76.02 kB
~~~

[[HeavyChart]] بقى ملف لوحده.

---

## ٣. في المتصفح

~~~text الناتج
loaded before click: [ 'index-BfaJioPb.js', 'Async-COTTgD6g.js' ]
after click: [ 'HeavyChart-CxIu4bXN.js' ] | rects: 12
~~~

قبل الضغط، ملف الـ chart **متنزّلش**. بعد الضغط اتنزّل، والـ SVG اترسم (١٢ عمود).

وأول تجربة كانت بـ [[loadingComponent: { template: '<p>...</p>' }]]: ده محتاج الـ template compiler جوه المتصفح، و build الـ Vue العادي (runtime-only) مفيهوش، فغيّرناه لـ [[h()]].

---

## ٤. الـ bundle الأساسي: مين واكله؟

نفس المشروع، مرة [[main.ts]] بيسجّل [[VueQueryPlugin]] و [[vue-i18n]] (من دروس المستوى ٢)، ومرة من غيرهم:

~~~text الناتج
مع vue-query و vue-i18n:   index-BfaJioPb.js   213.78 kB │ gzip: 76.02 kB
من غيرهم:                  index-BTXr9qPg.js   128.18 kB │ gzip: 49.29 kB
~~~

سطرين في [[main.ts]] = 85 KB زيادة (27 KB بعد الضغط) لكل زائر لكل صفحة. لو صفحة واحدة بس بتستخدم مكتبة، import-ها جوه الصفحة دي (الـ lazy route هيشيلها معاه).

---

## الخلاصة

| تكتب | النتيجة |
|---|---|
| [[defineAsyncComponent(() => import(...))]] | ملف لوحده، بيتنزّل لما يترسم |
| [[loadingComponent]] بـ [[h()]] | مش [[template]] |
| [[v-if]] على الـ async component | ميتنزّلش غير لما تحتاجه |
| [[<LazyX />]] في Nuxt | نفس الحاجة من غير كود |
| ناتج [[vite build]] | شوف حجم [[index-*.js]] بعد أي مكتبة جديدة |
| [[rollup-plugin-visualizer]] | خريطة الـ bundle |`,
          lines: [
            "بداية الـ script.",
            R`استورد [[ref]] و [[h]] و [[defineAsyncComponent]].`,
            "component بيتحمّل وقت الحاجة...",
            "منين ينزّله.",
            R`اللي يظهر وهو بيحمّل، بـ [[h()]].`,
            "استنى 200ms قبل ما تعرضه.",
            "أقصى وقت ١٠ ثواني.",
            R`قفلة [[defineAsyncComponent]].`,
            "مخفي في الأول.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "زرار بيظهره.",
            R`مش بيتنزّل غير لما [[show]] تبقى true.`,
            "قفلة الـ template."
          ],
          sol: R`في Network، قبل الضغط مفيش [[HeavyChart-xxxx.js]]، وبعده بيتنزّل ملف صغير. ولما تزوّد مكتبة في [[main.ts]]، [[index-xxxx.js]] بيكبر بحجمها: عندنا [[vue-query]] و [[vue-i18n]] مع بعض زوّدوا الـ bundle من 128 لـ 214 KB.`
        }
      ]
    },
    {
      t: "Svelte والانترفيو",
      l: 3,
      n: "مقارنة أمينة مع Svelte و React، وأسئلة الانترفيو اللي بتتسأل على Vue",
      items: [
        {
          cmd: "Svelte و SvelteKit",
          title: "Svelte إيه، وبيختلف عن Vue في إيه، والناس بتختاره إمتى",
          desc: R`Svelte (النسخة 5.57) framework بيشتغل بفكرة مختلفة: الـ compiler بيحوّل الـ component لكود JavaScript بيعدّل الـ DOM مباشرة، من غير virtual DOM. في Svelte 5 الـ state بالـ runes: [[let count = $state(0)]] و [[let double = $derived(count * 2)]]، وبتعدّل بـ [[count++]] عادي من غير [[.value]]. و SvelteKit (النسخة 3.1) هو مقابل Nuxt: routing من الملفات، و SSR، و [[load]] للبيانات.

الحقيقة: الاتنين ممتازين. Svelte بيطلع bundle أصغر وكود أقصر، و Vue عنده ecosystem أكبر بكتير ووظايف أكتر.`,
          example: R`// Vue: App.vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)
const todos = ref<string[]>([])
</script>

<template>
  <button @click="count++">ضغطت {{ count }} (× 2 = {{ double }})</button>
  <button @click="todos.push('مهمة ' + (todos.length + 1))">ضيف</button>
  <ul>
    <li v-for="t in todos" :key="t">{{ t }}</li>
  </ul>
</template>

// Svelte: App.svelte
<script lang="ts">
  let count = $state(0)
  let double = $derived(count * 2)
  let todos = $state<string[]>([])
</script>

<button onclick={() => count++}>ضغطت {count} (× 2 = {double})</button>
<button onclick={() => todos.push('مهمة ' + (todos.length + 1))}>ضيف</button>
<ul>
  {#each todos as t (t)}
    <li>{t}</li>
  {/each}
</ul>`,
          try: R`[[npm create vite@latest svmini -- --template svelte-ts]]، وحط الـ component بتاع Svelte، واعمل نفس الحاجة بـ [[--template vue-ts]]. [[npm run build]] في الاتنين وقارن حجم الـ JS. وبعدين [[npx sv create]] وبص على [[src/routes/]]: شبه [[app/pages]] في Nuxt إزاي؟`,
          flag: "script",
          deep: {
            why: R`هتتسأل «ليه Vue مش Svelte؟» أو هتقابل مشروع Svelte، ولازم تعرف الفرق بأمانة: مش «ده أسرع»، لكن إيه اللي بتكسبه وإيه اللي بتدفعه. وفكرة «compiler بدل runtime» أثّرت على Vue نفسه (Vapor Mode).`,
            how: R`Vue: الـ template بيتحوّل لـ render function بترجّع virtual DOM، والـ runtime بيقارن ويحدّث (مع patch flags من الـ compiler). Svelte: الـ compiler بيطلع كود بيعمل العناصر مرة وبيحدّث الـ text node أو الـ attribute اللي اتغير مباشرة. الاتنين fine-grained reactivity: Vue بـ Proxy و refs، و Svelte 5 بـ signals تحت الـ runes ([[$state]] بيتحوّل لـ signal والـ compiler بيحط القراية والكتابة).

الفروق اللي هتحسها: Svelte من غير [[.value]] ولا [[ref()]]، والـ template أقرب لـ HTML ([[{#each}]] و [[{#if}]] بدل directives)، والـ events attributes عادية ([[onclick]]). والـ bundle أصغر لأن الـ runtime أصغر. Vue: ecosystem أكبر بكتير (Nuxt، و Pinia، و PrimeVue و Vuetify و Quasar، ومكتبات UI كتير)، ومجتمع أكبر، و Options API للي جاي من OOP، ووظايف أكتر.

و Vue 3.6 (RC 13 في أكتوبر ٢٠٢٦) فيه Vapor Mode: [[<script setup vapor>]] بيخلي الـ component يتعمله compile بطريقة Svelte (من غير virtual DOM)، وبتشغّله بـ [[createVaporApp]].`,
            when: R`Svelte بيتختار في: مواقع محتوى وصفحات لازم تبقى خفيفة جدًا، و widgets بتتحط في مواقع تانية (حجم صغير مهم)، وفرق صغيرة بتحب الكود القصير، ومشاريع جديدة مش محتاجة مكتبات UI كبيرة. و Vue: تطبيقات أكبر، و dashboards بمكتبات UI جاهزة، وفرق محتاجة توظّف بسهولة. وعمليًا في أغلب مواقع التوظيف (ومصر منها) إعلانات Svelte أقل بكتير من Vue، و Vue أقل من React.`,
            mistakes: R`تقول «Svelte مفيهوش runtime»: فيه runtime صغير (الـ ٣٢ KB في الناتج تحت). وتقارن Svelte 3 أو 4 (اللي كان [[let count = 0]] reactive لوحده و [[$:]]) بـ Svelte 5 (runes). وتحكم بحجم counter بس: في تطبيق كبير الفرق في الـ runtime بيتقسم على كود كتير، وكود الـ components نفسه ممكن يبقى أكبر في Svelte لأنه compiled. وتنقل مشروع شغال عشان «الأسرع»: ده نادرًا ما يبقى سبب كفاية.`
          },
          teach: R`## الفكرة: نفس التطبيق بالاتنين، ونقيس

عملنا مشروعين بـ [[npm create vite@latest]] (Vite 8.3.5): [[vue-ts]] (Vue 3.5.44) و [[svelte-ts]] (Svelte 5.57.3، @sveltejs/vite-plugin-svelte 7.3.1)، وحطينا الـ component ده بالظبط في الاتنين، وعملنا build، وشغّلنا في Chrome headless وضغطنا كل زرار مرتين.

---

## ١. السطور جنب بعض

| الحاجة | Vue | Svelte 5 |
|---|---|---|
| state | [[const count = ref(0)]] | [[let count = $state(0)]] |
| derived | [[computed(() => count.value * 2)]] | [[$derived(count * 2)]] |
| قراية في الكود | [[count.value]] | [[count]] |
| اطبع | [[{{ count }}]] | [[{count}]] |
| event | [[@click="count++"]] | [[onclick={() => count++}]] |
| list | [[v-for="t in todos" :key="t"]] | [[{#each todos as t (t)}]] و [[{/each}]] |
| array | [[todos.push]] متراقب (Proxy) | [[todos.push]] متراقب ([[$state]] بيعمل Proxy للـ arrays) |

و [[(t)]] في الـ [[{#each}]] هو الـ key، زي [[:key]].

---

## ٢. الاتنين اشتغلوا نفس الشغل

~~~text الناتج (بعد ضغطتين على كل زرار)
vue:    ضغطت 2 (× 2 = 4) ضيف مهمة 1 مهمة 2
svelte: ضغطت 2 (× 2 = 4) ضيف مهمة 1 مهمة 2
~~~

---

## ٣. حجم الـ build

~~~text الناتج
vue:     dist/assets/index-B5iXfoa8.js  63.27 kB │ gzip: 24.97 kB
svelte:  dist/assets/index-CVFyTpT8.js  32.24 kB │ gzip: 12.80 kB
~~~

Svelte حوالي النص. أغلب الـ ٦٣ KB بتوع Vue هي الـ runtime (الـ virtual DOM والـ reactivity والـ scheduler)، وده رقم ثابت مش هيتضاعف لما التطبيق يكبر. يعني الفرق مهم في صفحة صغيرة أو widget، وبيقل في تطبيق كبير.

---

## ٤. Vue Vapor (3.6 RC)

نفس الـ component بـ [[vue@3.6.0-rc.13]] و [[<script setup vapor>]] و [[createVaporApp(App).mount('#app')]]:

~~~text الناتج
vapor:   dist/assets/index-DwmevirX.js  56.50 kB │ gzip: 20.99 kB
vapor: ضغطت 2 (× 2 = 4)ضيفمهمة 1مهمة 2
~~~

أصغر من Vue العادي واشتغل، بس لسه أكبر من Svelte، ولسه RC: متستخدمهوش في الإنتاج قبل ما ينزل stable.

---

## ٥. SvelteKit

[[npx sv create svkit --template minimal --types ts --no-add-ons --install npm]] (sv 1.1.1) عمل مشروع SvelteKit 3.1.0. زوّدنا صفحة:

~~~text src/routes/products/[id]/+page.server.ts
export const load: PageServerLoad = ({ params }) => {
  const product = products.find((p) => p.id === Number(params.id))
  if (!product) error(404, 'المنتج مش موجود')
  return { product }
}
~~~

~~~text src/routes/products/[id]/+page.svelte
<script lang="ts">
  let { data } = $props()
  let qty = $state(1)
  let total = $derived(qty * data.product.price)
</script>
<svelte:head><title>{data.product.name}</title></svelte:head>
<h1>{data.product.name}</h1>
<button onclick={() => qty++}>الكمية {qty}</button>
<p>الإجمالي {total} EGP</p>
~~~

| SvelteKit | Nuxt |
|---|---|
| [[src/routes/products/[id]/+page.svelte]] | [[app/pages/products/[id].vue]] |
| [[+page.server.ts]] و [[load]] | [[useFetch]] و [[server/api]] |
| [[$props()]] بياخد [[data]] | [[const { data } = await useFetch()]] |
| [[<svelte:head>]] | [[useSeoMeta]] |
| [[error(404, ...)]] | [[createError({ statusCode: 404 })]] |
| adapters (node و vercel و static) | presets |

~~~text الناتج (vite preview، curl /products/2)
<title>ماوس</title>
<h1>ماوس</h1>
<button>الكمية 1</button>
<p>الإجمالي 350 EGP</p>
~~~

و [[/products/9]] رجّع 404، وفي Chrome بعد ضغطتين: [[ماوس الكمية 3 الإجمالي 1050 EGP]]. نفس فكرة Nuxt بالظبط: SSR وبعدين hydration.

---

## الخلاصة

| | Vue | Svelte |
|---|---|---|
| الفكرة | runtime + virtual DOM (و Vapor اختياري) | compiler بيكتب كود DOM مباشر |
| الـ state | [[ref]] و [[.value]] | [[$state]] من غير [[.value]] |
| حجم counter | 63 KB (25 gzip) | 32 KB (13 gzip) |
| الـ meta framework | Nuxt | SvelteKit |
| الـ ecosystem والوظايف | أكبر بكتير | أصغر |
| تختاره لـ | تطبيقات ولوحات بمكتبات UI | صفحات خفيفة و widgets وفرق صغيرة |`,
          lines: [
            "script الـ Vue.",
            R`استورد [[ref]] و [[computed]].`,
            "العدّاد.",
            "ضعفه.",
            "المهام.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "زرار العدّاد.",
            "زرار بيضيف مهمة.",
            "الـ list.",
            "مهمة في كل سطر.",
            "قفلة الـ list.",
            "قفلة الـ template.",
            "script الـ Svelte.",
            R`[[$state]]: state من غير [[.value]].`,
            R`[[$derived]]: قيمة محسوبة.`,
            "المهام.",
            "قفلة الـ script.",
            R`زرار: [[onclick]] attribute عادي، و [[{count}]] بيطبع.`,
            "زرار بيضيف مهمة.",
            "الـ list.",
            R`[[{#each}]] = [[v-for]]، و [[(t)]] الـ key.`,
            "مهمة.",
            R`قفلة [[each]].`,
            "قفلة الـ list."
          ],
          sol: R`الاتنين بيشتغلوا نفس الشغل. عندنا الـ build طلع Vue [[63.27 kB]] (gzip 24.97) و Svelte [[32.24 kB]] (gzip 12.80).

وفي SvelteKit هتلاقي [[src/routes/+page.svelte]] (الرئيسية) و [[+layout.svelte]] (الـ layout): كل فولدر route، وجواه [[+page.svelte]] للشكل و [[+page.server.ts]] للبيانات على السيرفر، مقابل ملف [[.vue]] واحد في [[app/pages]] و [[server/api]] في Nuxt.`
        },
        {
          cmd: "reactivity بتشتغل إزاي؟",
          title: "الـ reactivity في Vue بتشتغل إزاي من جوه؟ (Proxy و track و trigger)",
          desc: R`الإجابة في دقيقة: «[[reactive]] بيرجّع Proxy حوالين الـ object. لما effect (render أو computed أو watch) شغال ويقرا خانة، الـ [[get]] بتاع الـ Proxy بيسجّل إن الـ effect ده معتمد على الخانة دي (track). ولما حد يكتب في الخانة، الـ [[set]] بيشغّل كل الـ effects اللي سجّلت عليها (trigger). و [[ref]] نفس الفكرة بـ getter و setter على [[.value]]. والتحديثات بتتجمّع وتتنفّذ مرة في الـ microtask الجاي.»

المثال reactivity صغيرة في ٤٠ سطر بنفس الفكرة، اتشغّلت في Node.`,
          example: R`let activeEffect = null
const deps = new WeakMap()

function track(target, key) {
  if (!activeEffect) return
  let map = deps.get(target)
  if (!map) deps.set(target, (map = new Map()))
  let set = map.get(key)
  if (!set) map.set(key, (set = new Set()))
  set.add(activeEffect)
}
function trigger(target, key) {
  deps.get(target)?.get(key)?.forEach((fn) => fn())
}
function reactive(obj) {
  return new Proxy(obj, {
    get(t, key) {
      track(t, key)
      return t[key]
    },
    set(t, key, value) {
      t[key] = value
      trigger(t, key)
      return true
    },
  })
}
function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

const state = reactive({ price: 100, qty: 2, note: '' })
effect(() => console.log('total =', state.price * state.qty))
state.qty = 3
state.note = 'hello'
state.price = 50`,
          try: R`شغّله ([[node mini.mjs]]). ليه [[state.note = 'hello']] مطبعش حاجة؟ بعدين زوّد [[computed(getter)]] بسيط بيرجّع object فيه [[get value()]] بيشغّل الـ getter. وفكّر: الـ mini ده بيشغّل الـ effect فورًا مع كل تغيير، و Vue بيعمل إيه مختلف؟`,
          flag: "script",
          deep: {
            why: R`سؤال مشهور في انترفيوهات Vue، لأنه بيفرّق بين حد بيستخدم Vue وحد فاهمه. ولما تفهمه بتفهم ليه الـ destructuring بيكسر الـ reactivity، وليه [[.value]] موجودة، وليه [[watch(props.x)]] مش بيشتغل.`,
            how: R`الـ ٣ قطع: (١) [[WeakMap]] من object لـ [[Map]] من key لـ [[Set]] من effects (الـ WeakMap بيسيب الـ object يتمسح من الذاكرة لو محدش بيستخدمه). (٢) [[track]] في الـ [[get]]: لو فيه effect شغال دلوقتي، سجّله. (٣) [[trigger]] في الـ [[set]]: شغّل اللي اتسجّل.

الفرق في Vue الحقيقي: الـ effects مش بتتنفّذ فورًا، بتتحط في queue وتتنفّذ مرة واحدة في الـ microtask الجاي (شوفنا ده في درس [[ref و reactive]]: تغييرين = effect واحد)، والـ dependencies بتتنضف وتتسجّل من جديد كل run (عشان لو [[v-if]] بطّل يقرا حاجة، ميفضلش معتمد عليها)، والـ nested objects بيتعملهم Proxy أول ما تقراهم (lazy)، والـ arrays والـ Map والـ Set ليهم handlers خاصة. و [[ref]] class فيها [[get value()]] و [[set value()]] بيعملوا track و trigger على نفسهم، عشان كده بيشتغل مع الأرقام والنصوص اللي Proxy مبيلفّهاش. ومن Vue 3.4 و 3.5 الـ dependencies بقت linked lists و versions بدل Sets (أسرع وأقل ذاكرة)، بس الفكرة نفسها.

وده سبب إن Vue 3 بيمسك [[arr[0] = x]] و [[obj.newKey = 1]] (Proxy بيشوف أي key)، و Vue 2 مكانش (كان بيستخدم [[Object.defineProperty]] على الـ keys الموجودة بس، وكنت محتاج [[Vue.set]]).`,
            when: R`«اشرح الـ reactivity في Vue 3»، و «الفرق بين Vue 2 و Vue 3 في الـ reactivity؟»، و «ليه الـ destructuring بيكسرها؟» (لأنك قريت القيمة مرة برا أي effect وخدت نسخة)، و «ليه [[ref]] محتاج [[.value]]؟» (لأن الـ JavaScript مفيهاش طريقة تعترض قراية متغير عادي، بس تقدر تعترض قراية خاصية).`,
            mistakes: R`تقول إن Vue بيقارن القيم القديمة والجديدة بشكل دوري (dirty checking زي AngularJS): لأ، هو بيعرف مين اتغير بالظبط وقت الكتابة. وتقول إن الـ virtual DOM هو اللي بيعمل الـ reactivity: الاتنين حاجتين منفصلين (الـ reactivity بتقول «الـ component ده محتاج يتحدّث»، والـ virtual DOM بيحسب «إيه اللي اتغير في الـ DOM»).`
          },
          teach: R`## الفكرة: سجّل مين قرا، ونبّه لما حد يكتب

شغّلنا الكود في Node 24.22 ([[node mini.mjs]]). مفيش ولا import من Vue: دي الفكرة لوحدها.

---

## ١. التخزين: [[deps]]

~~~text الشكل
deps (WeakMap)
  state  →  Map
              'price'  →  Set { effect1 }
              'qty'    →  Set { effect1 }
~~~

لكل object، لكل key، مين الـ effects اللي بتعتمد عليه.

---

## ٢. [[track(target, key)]]

- [[if (!activeEffect) return]]: لو القراية مش جوه effect (زي [[console.log(state.qty)]] عادي)، متسجّلش حاجة. وده بالظبط ليه الـ destructuring برا الـ effect بيكسر الـ reactivity.
- [[deps.set(target, (map = new Map()))]]: لو مفيش Map للـ object ده، اعمل واحد. والقوسين بيعملوا assignment ويرجّعوا القيمة في نفس السطر.
- [[set.add(activeEffect)]]: سجّل الـ effect. ولأنه [[Set]]، نفس الـ effect مش بيتسجّل مرتين.

---

## ٣. [[trigger(target, key)]]

[[deps.get(target)?.get(key)?.forEach((fn) => fn())]]: هات الـ effects بتوع الـ key ده وشغّلهم. الـ [[?.]] عشان لو مفيش حاجة متسجّلة ميرميش خطأ.

---

## ٤. [[reactive(obj)]] = Proxy

| الـ trap | بيتنادى لما | بيعمل |
|---|---|---|
| [[get(t, key)]] | حد يقرا [[state.x]] | [[track]] ثم يرجّع القيمة |
| [[set(t, key, value)]] | حد يكتب [[state.x = v]] | يكتب ثم [[trigger]]، و [[return true]] معناها «الكتابة نجحت» |

---

## ٥. [[effect(fn)]]

بيحط [[fn]] في [[activeEffect]]، ويشغّلها (فأي قراية جواها بتتسجّل عليها)، ويرجّع [[activeEffect]] null.

---

## ٦. الناتج

~~~text الناتج
total = 200
total = 300
total = 150
~~~

| السطر | ليه |
|---|---|
| [[total = 200]] | الـ effect اتشغّل أول مرة، وقرا [[price]] و [[qty]] فاتسجّل عليهم |
| [[total = 300]] | [[state.qty = 3]] ← [[trigger]] لـ [[qty]] ← الـ effect |
| (مفيش سطر) | [[state.note = 'hello']]: محدش قرا [[note]]، فالـ Set فاضي |
| [[total = 150]] | [[price]] = 50 |

---

## ٧. الفرق عن Vue الحقيقي

| الـ mini | Vue |
|---|---|
| الـ effect بيتنفّذ فورًا مع كل set | بيتجمّع ويتنفّذ مرة في الـ microtask الجاي |
| الـ deps بتفضل | بتتنضف وتتعاد كل run |
| object جوه object مش reactive | بيتعمله Proxy أول ما تقراه |
| مفيش arrays خاصة | [[push]] و [[length]] و Map و Set ليهم handlers |
| مفيش [[ref]] | [[ref]] = getter و setter على [[.value]] |

---

## الإجابة في الانترفيو

«Proxy على الـ object. الـ get بيعمل track للـ effect الحالي، والـ set بيعمل trigger للـ effects المسجّلة. [[ref]] نفس الكلام على [[.value]] عشان الـ primitives. والـ updates بتتجمّع في scheduler. وده أحسن من Vue 2 لأن Proxy بيشوف keys جديدة و array indexes.»`,
          lines: [
            "الـ effect اللي شغال دلوقتي.",
            "object ← key ← effects.",
            "سجّل الـ effect الحالي على الخانة دي...",
            "لو مفيش effect شغال، مفيش حاجة.",
            "هات Map الـ object...",
            "أو اعمله.",
            "هات Set الـ key...",
            "أو اعمله.",
            "زوّد الـ effect.",
            "قفلة.",
            "شغّل كل اللي معتمد على الخانة دي...",
            "لو موجودين.",
            "قفلة.",
            "اعمل نسخة متراقبة...",
            "Proxy حوالين الـ object:",
            "عند القراية...",
            "سجّل.",
            "ورجّع القيمة.",
            R`قفلة [[get]].`,
            "عند الكتابة...",
            "اكتب.",
            "نبّه.",
            "الكتابة نجحت.",
            R`قفلة [[set]].`,
            "قفلة الـ Proxy.",
            "قفلة.",
            "شغّل دالة وسجّل اللي بتقراه...",
            "هي الـ effect الحالي.",
            "شغّلها (القرايات بتتسجّل).",
            "خلاص.",
            "قفلة.",
            "state فيه ٣ خانات.",
            "effect بيقرا price و qty.",
            "بيطبع تاني.",
            "مبيطبعش: محدش قرا note.",
            "بيطبع تاني."
          ],
          sol: R`[[note]] مطبعش لأن الـ effect عمره ما قرا [[state.note]]، فمفيش effect متسجّل عليه. ده بالظبط سبب إن Vue مبيعيدش رسم component لما خانة هو مش بيعرضها تتغير.

والفرق الأهم: الـ mini بيشغّل الـ effect **فورًا** مع كل كتابة، فلو غيّرت 3 خانات ورا بعض هيطبع 3 مرات. Vue بيحط الـ effect في queue ويشغّله **مرة** في الـ microtask الجاي. و [[computed]] بنفس الأدوات (حطيناه مكان آخر ٥ سطور وجربناه على [[reactive({ price: 100, qty: 2 })]]: طبع [[200 200 runs 1]] وبعد [[qty = 5]] طبع [[500 runs 2]]، يعني اتحسب مرة واحدة واتعاد لما اتغير):`,
          solCode: R`function computed(getter) {
  let cached
  let dirty = true
  const runner = () => {
    dirty = true
  }
  return {
    get value() {
      if (dirty) {
        activeEffect = runner
        cached = getter()
        activeEffect = null
        dirty = false
      }
      return cached
    },
  }
}`
        },
        {
          cmd: "ref ولا reactive؟",
          title: "ref ولا reactive؟ وإمتى كل واحد بيكسر الـ reactivity",
          desc: R`الإجابة في دقيقة: «الدليل الرسمي بيقترح [[ref]] كافتراضي. [[ref]] بيشتغل مع أي نوع، وبتقدر تبدّل القيمة كلها ([[x.value = newObj]])، وبيتعدّى من دالة لدالة من غير ما يفقد الـ reactivity، و [[.value]] بتوضّح إن ده reactive. [[reactive]] للـ objects بس، ومن غير [[.value]]، بس مينفعش تبدّله كله، والـ destructuring بيكسره إلا بـ [[toRefs]]. فأنا بستخدم [[ref]] في كل حاجة، و [[reactive]] أحيانًا لـ object فورم.»`,
          example: R`import { ref, reactive, toRefs, watchEffect, nextTick } from 'vue'

const form = reactive({ name: 'Sara', age: 25 })
const { name } = form
const { age } = toRefs(form)

const user = ref({ name: 'Sara' })
watchEffect(() => console.log('user:', user.value.name))
user.value = { name: 'Ali' }
await nextTick()

form.name = 'Mona'
form.age = 30
console.log('destructured:', name, '| toRefs:', age.value)`,
          try: R`شغّله في Node. بعدين جرّب تعمل [[let state = reactive({ n: 1 })]] و [[watchEffect]] عليه، وبعدين [[state = reactive({ n: 2 })]]: الـ effect اتنادى؟ وقارن بـ [[ref]].`,
          flag: "script",
          deep: {
            why: R`سؤال بيتسأل كتير، وبيختبر إنك فاهم الـ Proxy مش حافظ. والغلطات اللي بتيجي منه (destructuring، وتبديل الـ reactive) أشهر bugs في Vue 3.`,
            how: R`[[reactive]] بيرجّع Proxy: المتغير نفسه هو الـ Proxy، فلو حطيت فيه object تاني بـ [[=]] انت غيّرت المتغير المحلي بس، واللي كان بيراقب الـ Proxy القديم محدش قاله. و destructuring بيقرا الخانة مرة ويحطها في متغير عادي. [[toRefs]] بيعمل ref لكل خانة، والـ ref ده بيقرا ويكتب في الـ Proxy الأصلي كل مرة.

[[ref]] object ثابت فيه [[.value]]: انت عمرك ما بتبدّل الـ ref نفسه، بتبدّل [[.value]]، فاللي بيراقب الـ ref بيعرف. ولو [[.value]] object، Vue بيعمله [[reactive]] جوه، فـ [[user.value.name = 'x']] كمان متراقب.

في الـ template، الـ refs اللي في أول مستوى بتتفك لوحدها ([[{{ count }}]] مش [[{{ count.value }}]])، وكمان الـ ref جوه [[reactive]] بيتفك ([[reactive({ c: ref(1) }).c]] = 1). بس ref جوه array أو Map مش بيتفك.`,
            when: R`«ref ولا reactive؟»، و «ليه الـ destructuring بيكسر الـ reactivity؟»، و «إزاي ترجّع state من composable؟» (refs، عشان اللي بيستخدمه يعمل destructuring).`,
            mistakes: R`تقول «reactive أسرع» أو «ref أسرع»: الفرق مش مهم عمليًا. وتقول إن [[ref]] للـ primitives بس: بيشتغل مع objects كويس جدًا. وتنسى إن [[reactive(ref)]] أو [[ref]] جوه [[reactive]] بيتفك أوتوماتيك فتكتب [[.value]] زيادة.`
          },
          teach: R`## الفكرة: الاتنين Proxy تحت، والفرق في «إيه اللي بتبدّله»

شغّلنا الكود في Node 24.22 مع vue 3.5.44.

---

## ١. [[reactive]] و destructuring

~~~text ref-vs-reactive.mjs
const form = reactive({ name: 'Sara', age: 25 })
const { name } = form
const { age } = toRefs(form)
~~~

- [[const { name } = form]]: قرا [[form.name]] مرة، وحط النص [['Sara']] في متغير. خلاص، مالوش علاقة بـ [[form]] تاني.
- [[toRefs(form)]]: object فيه ref لكل خانة، مربوط بالأصل. خدنا [[age]] منه.

---

## ٢. [[ref]] وتبديل القيمة كلها

~~~text ref-vs-reactive.mjs
const user = ref({ name: 'Sara' })
watchEffect(() => console.log('user:', user.value.name))
user.value = { name: 'Ali' }
await nextTick()
~~~

بدّلنا الـ object كله. الـ effect مراقب [[user.value]]، فاتنادى.

---

## ٣. الناتج

~~~text الناتج
user: Sara
user: Ali
destructured: Sara | toRefs: 30
~~~

| السطر | ليه |
|---|---|
| [[user: Sara]] | [[watchEffect]] أول مرة |
| [[user: Ali]] | [[user.value = {...}]] اتراقب |
| [[destructured: Sara]] | [[name]] نسخة اتاخدت قبل [[form.name = 'Mona']] |
| [[toRefs: 30]] | [[age]] ref بيقرا [[form.age]] كل مرة |

---

## ٤. تبديل [[reactive]] كله (من درس [[ref و reactive]])

~~~text الناتج
effect n = 1
state.n is 2 (no effect ran)
~~~

[[state = reactive({ n: 2 })]] غيّر المتغير، بس الـ effect لسه بيراقب الـ Proxy القديم.

---

## الإجابة في الانترفيو

| | [[ref]] | [[reactive]] |
|---|---|---|
| الأنواع | أي حاجة | objects و arrays و Map و Set |
| الوصول | [[.value]] (إلا في الـ template) | مباشر |
| تبديل كامل | [[x.value = new]] | مينفعش، لازم [[Object.assign]] |
| destructuring | آمن (الـ ref نفسه بيتنقل) | بيكسر، استخدم [[toRefs]] |
| من composable | ارجّع refs | ارجّع [[toRefs(state)]] |
| التوصية الرسمية | الافتراضي | لما تحب شكل object |`,
          lines: [
            "استورد اللي محتاجينه.",
            "object فورم reactive.",
            R`destructuring عادي: [[name]] نسخة.`,
            R`[[toRefs]]: [[age]] ref مربوط.`,
            "ref فيه object.",
            "effect بيقرا الاسم.",
            "بدّل الـ object كله.",
            "استنى الـ effect.",
            "غيّر الاسم في الفورم.",
            "وغيّر السن.",
            "النسخة لسه قديمة، والـ ref جديد."
          ],
          sol: R`مع [[state = reactive({ n: 2 })]] الـ effect مبيتناداش: طبع [[effect n = 1]] بس، وبعدها [[state.n]] بقى 2 من غير effect. ومع [[ref]] بتكتب [[state.value = { n: 2 }]] والـ effect بيتنادى بـ 2. ده أوضح سبب للتوصية بـ [[ref]].`
        },
        {
          cmd: "computed ولا watch؟",
          title: "computed ولا watch؟ ومين فيهم لإيه",
          desc: R`الإجابة في دقيقة: «[[computed]] لقيمة: بتتحسب من state تاني، متخزّنة (cached)، ومبتتحسبش غير لما حد يقراها وحاجة من اللي بتعتمد عليه اتغيرت، ولازم تكون pure من غير side effects. [[watch]] لفعل: لما حاجة تتغير اعمل حاجة برا (request، أو localStorage، أو تغيير في الـ DOM)، ومعاه القيمة القديمة والجديدة. لو لقيت نفسك بتكتب [[watch]] عشان تحدّث ref من ref تاني، دي computed.»`,
          example: R`import { ref, computed, watch, nextTick } from 'vue'

const price = ref(100)
const qty = ref(2)

const totalBad = ref(0)
watch([price, qty], ([p, q]) => (totalBad.value = p * q))

const total = computed(() => price.value * qty.value)

qty.value = 3
console.log('right after change -> watch:', totalBad.value, '| computed:', total.value)
await nextTick()
console.log('after nextTick     -> watch:', totalBad.value, '| computed:', total.value)

watch(qty, (now, before) => console.log('side effect: qty', before, '->', now))
qty.value = 4
await nextTick()`,
          try: R`شغّله في Node واقرا السطر الأول من الناتج: ليه الـ watch لسه 0؟ بعدين حط [[{ immediate: true }]] على أول watch وشغّل تاني.`,
          flag: "script",
          deep: {
            why: R`أكتر غلطة في كود Vue الجديد: [[watch]] بيكتب في state تاني. بيطلع كود أطول، وفيه لحظة القيمة فيها قديمة، وممكن loops. والسؤال ده بيكشف لو انت فاهم الفرق بين «قيمة مشتقة» و «side effect».`,
            how: R`[[computed]] lazy و synchronous: لما تقراه، لو dirty يتحسب فورًا، فدايمًا صح في نفس اللحظة. و [[watch]] بيتنفّذ في الـ scheduler: الافتراضي [[flush: 'pre']] (قبل تحديث الـ DOM في نفس الـ tick)، فبين التغيير وتنفيذ الـ watcher فيه لحظة القيمة المشتقة فيها قديمة. وكمان [[watch]] من غير [[immediate]] مش بيشتغل أول مرة، فالقيمة بتبدأ غلط.

[[watch]] ليه خيارات مش موجودة في [[computed]]: القيمة القديمة، و [[immediate]] و [[once]] و [[deep]] و [[flush]]، و [[onWatcherCleanup]] لإلغاء شغل قديم. و [[computed]] ليه caching و lazy و الـ template بيتربط بيه.`,
            when: R`«computed ولا watch؟»، و «إمتى تستخدم watchEffect؟»، و «إزاي تعمل search بيعمل request لما النص يتغير؟» ([[watch]] مع debounce، أو TanStack Query بـ ref في الـ key).`,
            mistakes: R`تحط [[fetch]] أو [[router.push]] جوه [[computed]]. وتعمل [[watch]] بيكتب في ref عشان تعمل قيمة مشتقة. وتنسى إن [[computed]] بترجع readonly (إلا لو ليها [[set]]). وتستخدم [[deep: true]] على حاجة كبيرة بدل getter على الخانة اللي محتاجها.`
          },
          teach: R`## الفكرة: computed = «إيه القيمة؟»، و watch = «اعمل إيه؟»

شغّلنا الكود في Node 24.22 مع vue 3.5.44.

---

## ١. الطريقة الغلط: [[watch]] بيكتب في ref

~~~text computed-vs-watch.mjs
const totalBad = ref(0)
watch([price, qty], ([p, q]) => (totalBad.value = p * q))
~~~

- [[watch([price, qty], ...)]]: بيراقب الاتنين، والـ callback بياخد array بالقيم الجديدة.
- [[([p, q]) =>]]: destructuring للـ array.
- مفيش [[immediate]]، فـ [[totalBad]] بيفضل 0 لحد أول تغيير، مع إن الإجمالي الحقيقي 200.

---

## ٢. الطريقة الصح

~~~text computed-vs-watch.mjs
const total = computed(() => price.value * qty.value)
~~~

سطر واحد، ودايمًا صح.

---

## ٣. الناتج

~~~text الناتج
right after change -> watch: 0 | computed: 300
after nextTick     -> watch: 300 | computed: 300
side effect: qty 3 -> 4
~~~

| السطر | ليه |
|---|---|
| [[watch: 0]] بعد التغيير على طول | الـ watcher لسه متنفّذش: مستني الـ scheduler. الكود اللي بعد التغيير شايف قيمة غلط |
| [[computed: 300]] | اتحسب لحظة ما قريناه |
| بعد [[nextTick]] الاتنين 300 | الـ watcher اتنفّذ أخيرًا |
| [[side effect: qty 3 -> 4]] | ده الاستخدام الصح لـ [[watch]]: حاجة بتحصل، ومعاها القديم والجديد |

---

## الإجابة في الانترفيو

| | [[computed]] | [[watch]] |
|---|---|---|
| بيرجّع | قيمة (ref readonly) | دالة توقفه |
| الشغلانة | قيمة مشتقة | side effect |
| إمتى بيتنفّذ | lazy، لما حد يقرا | بعد التغيير في الـ scheduler |
| cache | أيوه | لأ |
| القيمة القديمة | لأ | أيوه |
| async و requests | لأ | أيوه، ومعاه [[onWatcherCleanup]] |
| أول مرة | لما يتقري | لأ إلا [[immediate]] |`,
          lines: [
            "استورد اللي محتاجينه.",
            "السعر.",
            "الكمية.",
            "إجمالي بـ watch (الطريقة الغلط).",
            "watch بيكتب في ref.",
            "إجمالي بـ computed (الصح).",
            "غيّر الكمية.",
            "اطبع الاتنين على طول.",
            "استنى الـ scheduler.",
            "اطبع تاني.",
            "watch للـ side effect: ده مكانه.",
            "غيّر الكمية.",
            "استنى."
          ],
          sol: R`الـ watch لسه 0 لأنه مش بيتنفّذ لحظة التغيير: بيتحط في الـ queue ويتنفّذ في الـ tick الجاي، وكمان مكانش اتنفّذ أول مرة. ومع [[{ immediate: true }]] [[totalBad]] بيبدأ 200 صح، بس لسه بيبقى قديم في اللحظة اللي بعد التغيير على طول ([[watch: 200 | computed: 300]]). [[computed]] مفيهوش المشكلتين.`
        },
        {
          cmd: "Vue ولا React؟",
          title: "Vue ولا React؟ الفرق الحقيقي في الـ rendering والـ state",
          desc: R`الإجابة في دقيقة: «الاتنين component-based وبيستخدموا virtual DOM. الفرق الأساسي في الـ reactivity: Vue بيعرف بالظبط مين قرا إيه (Proxy)، فلما state يتغير بيعيد رسم الـ components اللي بتعتمد عليه بس، و [[setup]] بيتنفّذ مرة واحدة. React بيعيد تشغيل الـ function component كلها مع كل تغيير، فمحتاج [[useMemo]] و [[useCallback]] و [[React.memo]] (أو React Compiler) عشان يتجنب شغل زيادة. Vue فيه templates و directives، و React فيه JSX (JavaScript كامل). وفي الـ ecosystem: React أكبر بكتير ووظايفه أكتر، و Vue فيه حلول رسمية (Router و Pinia) فالمشاريع شكلها متشابه.»`,
          example: R`// Vue: setup بيتنفّذ مرة، والـ template بس اللي بيتحدّث
<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'

const price = 45
const qty = ref(1)
const total = computed(() => price * qty.value)
console.log('Vue: setup ran, qty =', qty.value)
onUpdated(() => console.log('Vue: DOM updated, qty =', qty.value))
</script>

<template>
  <button @click="qty++">qty={{ qty }} total={{ total }}</button>
</template>

// React: الدالة كلها بتتنفّذ مع كل تغيير
import { useState } from 'react'

const price = 45

export default function App() {
  const [qty, setQty] = useState(1)
  const total = price * qty
  console.log('React: App function ran, qty =', qty)
  return <button onClick={() => setQty(qty + 1)}>qty={qty} total={total}</button>
}`,
          try: R`اعمل مشروعين Vite ([[vue-ts]] و [[react-ts]])، وحط كل component في [[App]]، واعمل build و preview، واضغط ٣ مرات. عد كام سطر اتطبع في الـ console لكل واحد. وقارن حجم الـ JS في [[dist/assets]].`,
          flag: "script",
          deep: {
            why: R`أشهر سؤال لو الـ CV فيه Vue، أو الشركة بتفكر تختار. بيختبر إنك فاهم الـ trade-offs مش متعصب لواحد. وفي السوق: React أكتر في إعلانات الشغل في مصر والخليج وبرا، و Vue موجود كويس خصوصًا في شركات بتحب حلول رسمية وكود قريب من HTML، و Laravel (PHP) بيجي معاه Vue كتير.`,
            how: R`نقط المقارنة: (١) الـ rendering: Vue fine-grained على مستوى الـ component (بيعرف مين محتاج يتحدّث)، و React بيعيد الـ component وأولاده لحد ما تقوله لأ. (٢) الـ state: [[ref]] و [[reactive]] mutable ([[qty++]])، و React immutable ([[setQty(qty + 1)]] و spread للـ objects). (٣) الـ templates: Vue HTML + directives والـ compiler بيعمل optimizations (patch flags)، و JSX مرن أكتر بس كله runtime. (٤) الـ ecosystem: React (Next.js و TanStack و Zustand ومكتبات بالآلاف)، و Vue (Nuxt و Pinia و Vue Router رسميين، و PrimeVue و Vuetify و Quasar). (٥) الحجم: counter بـ Vue 63 KB و بـ React 220 KB (تحت). (٦) مشترك: TypeScript، و Vite (من نفس مؤلف Vue أصلًا)، و SSR (Nuxt مقابل Next.js)، و signals كفكرة بتنتشر.`,
            when: R`«Vue ولا React؟»، و «لو هتبدأ مشروع دلوقتي تختار إيه؟» (قول معايير: الفريق يعرف إيه، والتوظيف، والمكتبات المحتاجة، والـ SEO)، و «إيه اللي وحشك من React في Vue أو العكس؟».`,
            mistakes: R`تقول «Vue أسهل فهو للمبتدئين بس»، أو «React أسرع». وتقارن Vue 2 Options API بـ React hooks 2026. وتنسى إن React Compiler بيعمل memoization أوتوماتيك فبيقلل الفرق في الـ re-renders. وتهاجم واحد فيهم: المحاور غالبًا شغال بيه.`
          },
          teach: R`## الفكرة: نفس الـ counter بالاتنين، ونعد كام مرة الكود بيتنفّذ

عملنا مشروعين بـ [[npm create vite@latest]] (Vite 8.3.5): [[vue-ts]] (Vue 3.5.44) و [[react-ts]] (React 19.3.1)، وحطينا كل component في [[App]]، و build و [[vite preview]]، وضغطنا ٣ مرات في Chrome headless.

---

## ١. السطور جنب بعض

| الحاجة | Vue | React |
|---|---|---|
| state | [[const qty = ref(1)]] | [[const [qty, setQty] = useState(1)]] |
| تغيير | [[qty++]] (mutable) | [[setQty(qty + 1)]] (قيمة جديدة) |
| مشتق | [[computed(() => price * qty.value)]] | [[const total = price * qty]] |
| الشكل | template: [[{{ qty }}]] و [[@click]] | JSX: [[{qty}]] و [[onClick]] |
| بعد التحديث | [[onUpdated]] | [[useEffect]] |

---

## ٢. الناتج

~~~text الناتج (Vue)
Vue: setup ran, qty = 1
Vue: DOM updated, qty = 2
Vue: DOM updated, qty = 3
Vue: DOM updated, qty = 4
final: qty=4 total=180
~~~

~~~text الناتج (React)
React: App function ran, qty = 1
React: App function ran, qty = 2
React: App function ran, qty = 3
React: App function ran, qty = 4
final: qty=4 total=180
~~~

### نقرا الناتج

- Vue: [[setup]] اتنفّذ **مرة**. كل ضغطة غيّرت [[qty]]، والـ render function بس هي اللي اتعادت (و [[onUpdated]] اتنادى). الـ [[computed]] اتحسب لما الـ template قراه.
- React: الدالة [[App]] اتنفّذت **٤ مرات**: كل [[setQty]] بيخلي React تنادي الـ component كله تاني، وكل متغير جواه ([[total]] وأي دالة) بيتعمل من جديد. عشان كده في React بتحتاج [[useMemo]] و [[useCallback]] للحاجات التقيلة (أو React Compiler يعملهم).

النتيجة النهائية واحدة. الفرق في **قد إيه كود بيتعاد** لما المشروع يكبر.

---

## ٣. الحجم

~~~text الناتج
vue:    dist/assets/index-C2RjbrPl.js   62.60 kB │ gzip: 24.69 kB
react:  dist/assets/index-BZhAqzTw.js  219.64 kB │ gzip: 68.68 kB
~~~

React + React DOM أكبر بحوالي ٣.٥ مرة لـ counter. في تطبيق كبير الفرق ده ثابت (هو حجم المكتبة)، فبيبقى أقل أهمية.

---

## الإجابة في الانترفيو

| | Vue | React |
|---|---|---|
| reactivity | Proxy، بيعرف مين اتغير | الـ component بيتعاد كله |
| state | mutable ([[ref]]) | immutable ([[setState]]) |
| الـ UI | template + directives | JSX |
| optimizations | الـ compiler (patch flags) | [[memo]] و React Compiler |
| حلول رسمية | Router و Pinia و Nuxt | قليلة، و ecosystem ضخم |
| SSR | Nuxt | Next.js |
| الوظايف | أقل | أكتر بكتير |
| counter (gzip) | 25 KB | 69 KB |`,
          lines: [
            "script الـ Vue.",
            R`استورد [[ref]] و [[computed]] و [[onUpdated]].`,
            "السعر ثابت.",
            "الكمية.",
            "الإجمالي.",
            R`بيتطبع مرة بس: [[setup]] مش بيتعاد.`,
            "بعد كل تحديث للـ DOM.",
            "قفلة الـ script.",
            "بداية الـ template.",
            "الزرار.",
            "قفلة الـ template.",
            R`React: استورد [[useState]].`,
            "السعر ثابت.",
            R`الـ component دالة.`,
            "الكمية.",
            "الإجمالي: بيتحسب مع كل تنفيذ.",
            "بيتطبع مع كل تغيير.",
            "الزرار.",
            "قفلة الدالة."
          ],
          sol: R`Vue: سطر [[setup ran]] واحد و ٣ سطور [[DOM updated]]. React: ٤ سطور [[App function ran]] (أول render + ٣ ضغطات). وفي الحجم: Vue حوالي 63 KB (25 gzip) و React حوالي 220 KB (69 gzip).`
        }
      ]
    }
]);

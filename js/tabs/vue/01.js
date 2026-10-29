// كل درس هنا في مكان واحد:
//   cmd      اسم الدرس (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---)
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها، والباكتيك اكتبها $__bt.

TAB("vue", {
  label: "Vue",
  prompt: "> ",
  lab: R`npm create vue@latest vue-lab -- --ts --router --pinia --vitest
cd vue-lab && npm i
npm run dev`,
  labText: "Vue 3.5 (أكتوبر ٢٠٢٦) مع Vite 8 و Vue Router 5 و Pinia 4، ومحتاج Node 22.18 أو 24.12 أو أحدث. المشروع ده هو المكان اللي تجرّب فيه دروس المستوى ١ و ٢، و Vue DevTools جاهز جواه بـ Alt+Shift+D.",
  levels: {
    "1": ["الأساس", "Vue 3 من الصفر: الـ components والـ reactivity والـ template"],
    "2": ["تطبيق حقيقي", "Vue Router و Pinia والفورمات وبيانات السيرفر والاختبارات"],
    "3": ["الإنتاج و Nuxt", "Nuxt والـ SSR والأداء والنشر، ومقارنة مع Svelte"],
  },
  categories: [
    {
      t: "Vue بيعمل إيه والمشروع",
      l: 1,
      n: "Vue بيرسم الشاشة من البيانات، و create-vue بيعمل مشروع Vite جاهز، وكل component ملف .vue واحد",
      items: [
        {
          cmd: "npm create vue",
          title: "Vue يعني إيه، وتعمل أول مشروع إزاي",
          desc: R`Vue (بتتنطق «ڤيو») framework لبناء واجهات الويب: بتكتب الشاشة كـ template شبه HTML، وتربطها ببيانات reactive، ولما البيانات تتغير Vue بيحدّث الـ DOM لوحده. بتعمل المشروع بأمر واحد: [[npm create vue@latest]].

آخر نسخة stable في أكتوبر ٢٠٢٦ هي Vue 3.5.44 (و 3.6 لسه Release Candidate). Vue 2 خلص دعمه من آخر ٢٠٢٣، فلو قابلت [[new Vue({...})]] أو [[Vue.component]] يبقى كود قديم.

المتوقع إنك عارف JavaScript و TypeScript (من «تاب JavaScript» و «تاب TypeScript») وشوية HTML و CSS. ولو جاي من React: نفس فكرة الـ components، بس الـ reactivity مختلفة (هتشوف الفرق في درس «Vue ولا React؟» في الآخر).`,
          example: R`npm create vue@latest shop -- --ts --router --pinia --vitest
cd shop
npm install
npm run dev
npm run build
npm run test:unit -- --run`,
          try: R`اعمل المشروع وافتح [[http://localhost:5173]]. غيّر النص [[You did it!]] في [[src/App.vue]] والصفحة مفتوحة، وشوف بتتحدّث لوحدها. بعدين اعمل [[npm run build]] وبص على [[dist/]]: كام ملف JS؟ وليه [[AboutView]] ليه ملف لوحده؟`,
          deep: {
            why: R`من غير framework، كل تغيير في البيانات معناه إنك تدوّر على العنصر بـ [[querySelector]] وتعدّله بإيدك، ومع كل feature الكود بيتلخبط. Vue بيخليك توصف الشاشة مرة واحدة كـ template مربوط بالبيانات، وهو اللي يعرف إيه اتغيّر ويحدّثه. وهو «progressive»: تقدر تحطه في صفحة واحدة بـ [[<script>]]، أو تعمل بيه SPA كاملة، أو SSR بـ Nuxt.`,
            how: R`[[create-vue]] هو الأداة الرسمية (Vue CLI القديم بقى maintenance mode). بيعمل مشروع Vite: في التطوير Vite بيخدم الملفات كـ ES modules مباشرة ويحوّل كل [[.vue]] لـ JavaScript لما المتصفح يطلبه، فالسيرفر بيقوم في أقل من ثانية. وفي الـ build بيجمّع ويصغّر كل حاجة في [[dist/]].

الأسئلة اللي بيسألها لو مكتبتش flags: TypeScript؟ JSX؟ Router؟ Pinia؟ Vitest؟ E2E (Playwright أو Cypress)؟ ESLint؟ Prettier؟. ولو كتبت أي flag زي [[--ts]] مبيسألش، واللي متكتبش بيبقى «لأ».`,
            when: "أي مشروع Vue جديد: SPA أو لوحة تحكم أو تجربة. لو المشروع محتاج SSR و SEO من الأول، ابدأ بـ Nuxt (المستوى ٣)، وهو برضه Vue وكل اللي هتتعلمه هنا بيشتغل فيه.",
            mistakes: R`تستخدم [[vue create]] (Vue CLI) من tutorial قديم: بيعمل مشروع webpack بطيء. وتنسى الـ [[--]] قبل الـ flags في [[npm create]]: من غيرها npm بياخد الـ flags لنفسه. وتشغّل [[npm run test:unit]] في CI من غير [[--run]] فيفضل مستني تغييرات للأبد (watch mode). وتسطّب على Node قديم: الـ [[engines]] في package.json بيطلب [[^22.18.0 || >=24.12.0]].`
          },
          teach: R`## الفكرة: ٦ أوامر، أول ٣ مرة واحدة لكل مشروع

كل الناتج هنا حقيقي من ويندوز 11 على Node 24.22 و npm 11.19، و create-vue 3.24.0.

---

## ١. [[npm create vue@latest shop -- --ts --router --pinia --vitest]]

| الحتة | معناها |
|---|---|
| [[npm create vue]] | بيشغّل باكدج اسمها [[create-vue]] (npm بيزوّد [[create-]] لوحده) |
| [[@latest]] | آخر نسخة، فمش هتشغّل نسخة قديمة في الكاش |
| [[shop]] | اسم الفولدر والمشروع |
| [[--]] | اللي بعدها يروح لـ create-vue مش لـ npm |
| [[--ts]] | المشروع يتعمل بـ TypeScript: ملفات [[.ts]] و [[lang="ts"]] في كل [[.vue]]، و [[vue-tsc]] بيفحص الأنواع في الـ build |
| [[--router]] | Vue Router (المستوى ٢) |
| [[--pinia]] | Pinia للـ state المشترك (المستوى ٢) |
| [[--vitest]] | Vitest للاختبارات (المستوى ٢) |

~~~text الناتج
Scaffolding project in C:\Users\ali\vue\shop...
│
└  Done. Now run:

   cd shop
   npm install
   npm run dev
~~~

### الملفات المهمة

~~~text الشجرة (مختصرة)
index.html                  الصفحة الوحيدة، فيها <div id="app">
package.json
vite.config.ts              إعدادات Vite، وفيها @ = src
src/main.ts                 createApp(App) و use(router) و mount('#app')
src/App.vue                 أول component
src/router/index.ts         الصفحات
src/stores/counter.ts       مثال Pinia
src/views/HomeView.vue      صفحة
src/views/AboutView.vue     صفحة
src/components/HelloWorld.vue
src/components/__tests__/HelloWorld.spec.ts
~~~

و [[src/main.ts]] هو اللي بيشغّل كل حاجة:

~~~text src/main.ts
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
~~~

[[createApp]] بيعمل تطبيق من الـ component الأساسي، و [[use]] بتركّب plugin، و [[mount]] بيرسمه جوه العنصر اللي الـ id بتاعه [[app]] في [[index.html]].

---

## ٢. [[cd shop]] و ٣. [[npm install]]

ادخل الفولدر ونزّل الباكدجات في [[node_modules]]. النسخ اللي اتسطبت عندنا:

| الباكدج | النسخة |
|---|---|
| vue | 3.5.44 |
| vite | 8.3.5 |
| vue-router | 5.4.0 |
| pinia | 4.1.0 |
| typescript | 6.0.3 |
| vue-tsc | 3.3.13 |
| vitest | 4.1.11 |

---

## ٤. [[npm run dev]]

[[npm run]] بيشغّل script من [[package.json]]، و [[dev]] = [[vite]]:

~~~text الناتج
  VITE v8.3.5  ready in 663 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  Vue DevTools: Open http://localhost:5173/__devtools__/ as a separate window
  ➜  Vue DevTools: Press Alt(⌥)+Shift(⇧)+D in App to toggle the Vue DevTools
~~~

- **ready in 663 ms**: Vite مبيجمّعش المشروع قبل ما يقوم، بيحوّل كل ملف لما المتصفح يطلبه.
- **Vue DevTools**: create-vue بيحط [[vite-plugin-vue-devtools]]، فبتشوف الـ components والـ state جوه الصفحة نفسها بـ Alt+Shift+D.
- أي حفظ لملف [[.vue]] بيحدّث الـ component بس من غير reload (HMR = Hot Module Replacement).

---

## ٥. [[npm run build]]

الـ script ده بيشغّل حاجتين مع بعض ([[run-p]] = run parallel): [[vue-tsc --build]] يفحص الأنواع، و [[vite build]] يعمل الملفات:

~~~text الناتج
> run-p type-check "build-only {@}" --
> vue-tsc --build
> vite build

vite v8.3.5 building client environment for production...
✓ 44 modules transformed.
dist/index.html                       0.42 kB │ gzip:  0.28 kB
dist/assets/AboutView-CXtZgaLf.css    0.08 kB │ gzip:  0.10 kB
dist/assets/index-DEm2-gV0.css        4.05 kB │ gzip:  1.27 kB
dist/assets/AboutView-S8SFWru8.js     0.22 kB │ gzip:  0.20 kB
dist/assets/index-CRZe0Mbj.js       102.06 kB │ gzip: 39.45 kB
✓ built in 265ms
~~~

| العمود | معناه |
|---|---|
| [[CRZe0Mbj]] | hash من المحتوى: لو الكود اتغيّر الاسم يتغيّر، فالمتصفح ميستخدمش نسخة قديمة من الكاش |
| 102.06 kB | الحجم على الديسك (Vue و Router و Pinia وكودك) |
| gzip: 39.45 kB | اللي المستخدم بينزّله فعلًا لو السيرفر بيضغط |
| [[AboutView-...js]] | ملف لوحده لأن الـ route بتاعته مكتوبة [[() => import(...)]] (lazy loading، المستوى ٢) |

> [[vite build]] لوحده مبيفحصش الأنواع. عشان كده الـ script بيشغّل [[vue-tsc]] جنبه، ولو فيه خطأ TypeScript الـ build بيقع.

---

## ٦. [[npm run test:unit -- --run]]

[[test:unit]] = [[vitest]]. من غير [[--run]] بيفضل شغال ويعيد الاختبارات مع كل حفظ، و [[--run]] بيشغّلها مرة ويخرج (ده اللي الـ CI محتاجه):

~~~text الناتج
 Test Files  1 passed (1)
      Tests  1 passed (1)
   Duration  1.10s
~~~

الاختبار الوحيد في [[HelloWorld.spec.ts]] بيرسم [[HelloWorld]] ويتأكد إن النص ظهر. الاختبارات بالتفصيل في المستوى ٢.

---

## الخلاصة

| الأمر | إمتى |
|---|---|
| [[npm create vue@latest]] | مرة لكل مشروع، والـ flags بتلغي الأسئلة |
| [[npm install]] | بعد الإنشاء أو بعد أي [[git pull]] غيّر package.json |
| [[npm run dev]] | كل يوم وانت شغال |
| [[npm run build]] | قبل الرفع: type check + ملفات في [[dist/]] |
| [[npm run test:unit -- --run]] | الاختبارات مرة واحدة (CI) |`,
          lines: [
            R`[[npm create vue@latest]] بينزّل آخر نسخة من أداة [[create-vue]] ويشغّلها، فيعمل فولدر اسمه [[shop]] فيه مشروع Vite جاهز. الـ [[--]] بتقول لـ npm «اللي بعدي مش ليك، ابعته للأداة»، فالـ flags [[--ts --router --pinia --vitest]] بتشغّل TypeScript و Vue Router و Pinia و Vitest من غير ما يسألك. لو نسيت الـ [[--]] npm بياخد الـ flags لنفسه والأداة مبتشوفهاش.`,
            R`بيدخلك جوه فولدر المشروع اللي لسه اتعمل. لازم تكون جواه لأن كل أوامر [[npm]] الجاية بتدوّر على [[package.json]] في الفولدر اللي انت فيه، ولو فضلت برّه هتاخد error إنه مش لاقي [[package.json]].`,
            R`بيقرا الـ dependencies من [[package.json]] وينزّلها في [[node_modules]] (Vue و Vite والباقي). الأداة اللي فاتت كتبت الملف بس ومنزّلتش حاجة، فمن غير الأمر ده [[npm run dev]] هيقول إن [[vite]] مش موجود. وبتعيده بعد أي [[git pull]] غيّر [[package.json]].`,
            R`بيشغّل سيرفر التطوير بتاع Vite على [[http://localhost:5173]]. أول ما تحفظ أي ملف [[.vue]] الصفحة بتتحدّث لوحدها (Hot Module Replacement) من غير reload ومن غير ما الـ state يضيع. ده الأمر اللي بيفضل شغّال طول ما انت بتشتغل، وبتقفله بـ Ctrl+C.`,
            R`بيعمل نسخة الإنتاج: الأول [[vue-tsc]] بيفحص أنواع TypeScript في كل الملفات (ولو فيه غلطة نوع الـ build بيقف)، وبعدين Vite بيجمّع ويصغّر الكود في فولدر [[dist/]]. الفولدر ده هو اللي بترفعه على السيرفر، مش [[src/]].`,
            R`بيشغّل اختبارات Vitest مرة واحدة ويخرج. الـ [[--]] الأولى بتعدّي [[--run]] لـ Vitest نفسه، ومن غير [[--run]] Vitest بيفضل في watch mode مستني تغييرات، فلو حطيته في CI الـ pipeline هتفضل واقفة للأبد.`
          ],
          sol: R`الصفحة بتتحدّث أول ما تحفظ [[App.vue]] من غير reload، والـ console فيه [[[vite] hot updated: /src/App.vue]].

في [[dist/assets]] هتلاقي ملفين JS: [[index-xxxx.js]] (حوالي ١٠٠ KB: Vue و Router و Pinia وكودك) و [[AboutView-xxxx.js]] صغير جدًا. [[AboutView]] منفصل لأن الـ route بتاعته في [[src/router/index.ts]] مكتوبة [[component: () => import('../views/AboutView.vue')]]: الـ [[import()]] الديناميكي بيقول لـ Vite «اعمل الصفحة دي ملف لوحده ونزّله لما المستخدم يروحلها بس».`
        },
        {
          cmd: "SFC",
          title: "ملف .vue فيه إيه: script و template و style",
          desc: R`الـ component في Vue بيتكتب في ملف واحد امتداده [[.vue]] اسمه Single-File Component (SFC)، وفيه ٣ بلوكات: [[<script setup>]] للبيانات والدوال، و [[<template>]] للشكل، و [[<style scoped>]] للـ CSS بتاعه بس.

الملف ده المتصفح مبيفهموش. Vite (بـ [[@vitejs/plugin-vue]]) بيحوّله لـ JavaScript عادي: الـ template بيبقى دالة render، والـ CSS بيتحط في الصفحة بـ attribute مميز للـ component.`,
          example: R`<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">ضغطت {{ count }} مرة</button>
</template>

<style scoped>
button {
  padding: 8px 16px;
}
</style>`,
          try: R`احفظ الملف ده في [[src/components/Counter.vue]]، واستخدمه في [[App.vue]]: [[import Counter from './components/Counter.vue']] فوق، و [[<Counter />]] مرتين في الـ template. اضغط على واحد بس: التاني بيتأثر؟ وافتح DevTools (F12) وبص على الـ [[<button>]]: فيه attribute غريب اسمه إيه؟`,
          flag: "script",
          deep: {
            why: R`كل حاجة تخص الزرار (منطقه وشكله وتنسيقه) في ملف واحد، فلما تمسحه أو تنقله بيروح كله. وده أسهل من React اللي فيها الـ CSS في ملف تاني أو مكتبة، ومن Angular اللي ممكن الـ template والـ CSS يبقوا في ٣ ملفات.`,
            how: R`[[setup]] معناها إن الكود اللي في البلوك ده بيتنفّذ مرة واحدة لكل نسخة من الـ component، وأي متغير أو دالة أو import فيه متاح في الـ template على طول من غير [[return]]. و [[lang="ts"]] بيخليه TypeScript.

الـ compiler بيحوّل الـ template لدالة render بترجّع virtual DOM، ولما [[count]] يتغيّر Vue بينادي الدالة تاني ويقارن ويعدّل الجزء اللي اتغيّر بس. و [[scoped]] بيضيف [[data-v-xxxx]] لكل عنصر في الـ template ويحوّل [[button]] في الـ CSS لـ [[button[data-v-xxxx]]]، فالـ CSS ميهربش لـ components تانية.`,
            when: R`دايمًا في مشاريع Vite و Nuxt. الترتيب المعتاد: script ثم template ثم style، وده اللي الـ style guide الرسمي بيقترحه. [[<script setup>]] هو الافتراضي في أي كود جديد، و [[<script>]] من غير setup هتشوفه في الكود القديم (Options API، آخر درس في المستوى ده).`,
            mistakes: R`تنسى [[.value]] جوه الـ script: [[count++]] جوه دالة في الـ script غلط، الصح [[count.value++]]. في الـ template بس Vue بيفكّها لوحده. وتكتب أكتر من [[<script setup>]] في نفس الملف. وتفتكر إن [[scoped]] بيمنع CSS الأب من إنه يوصل للـ root element بتاع الابن: الـ root بياخد الـ attribute بتاع الاتنين (شوف درس scoped CSS).`
          },
          teach: R`## الفكرة: ٣ بلوكات، كل واحد ليه شغلانة

شغّلنا الملف ده في مشروع create-vue (Vue 3.5.44، Vite 8.3) في Chrome headless، وحوّلناه بـ [[vue/compiler-sfc]] في Node عشان نشوف هو بيبقى إيه.

---

## ١. [[<script setup lang="ts">]]

~~~text Counter.vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>
~~~

| الحتة | معناها |
|---|---|
| [[setup]] | الكود ده جسم الـ component: بيتنفّذ مرة لكل نسخة، واللي فيه متاح للـ template |
| [[lang="ts"]] | TypeScript. من غيرها JavaScript عادي |
| [[import { ref } from 'vue']] | دالة بتعمل قيمة reactive (درس [[ref و reactive]]) |
| [[ref(0)]] | صندوق قيمته الأولى 0، وبتقرا وتكتب جواه بـ [[.value]] |

---

## ٢. [[<template>]]

~~~text Counter.vue
<template>
  <button @click="count++">ضغطت {{ count }} مرة</button>
</template>
~~~

- [[{{ count }}]]: اطبع قيمة [[count]] هنا. القوسين المزدوجين اسمهم mustache (شنب) أو interpolation.
- [[@click]]: لما الزرار يتضغط نفّذ [[count++]]. الـ [[@]] اختصار [[v-on:]] (درس [[v-on]]).
- مكتبناش [[count.value]]: في الـ template، Vue بيفك الـ ref لوحده.

---

## ٣. [[<style scoped>]]

[[scoped]] بيخلي الـ CSS ده يمسك عناصر الـ component ده بس. اللي اترسم فعلًا في Chrome:

~~~text الناتج (الـ DOM)
<button data-v-d743e892="">ضغطت 0 مرة</button>
~~~

~~~text الناتج (الـ CSS اللي اتحط في الصفحة)
button[data-v-d743e892] {
  padding: 8px 16px;
}
~~~

[[d743e892]] hash من مسار الملف. أي [[<button>]] في component تاني مش هيبقى عليه الـ attribute ده، فالـ CSS مش هيمسكه.

وبعد ٣ ضغطات:

~~~text الناتج
<button>ضغطت 3 مرة</button>
~~~

---

## ٤. الملف بيبقى إيه؟

حوّلناه بنفس الـ compiler اللي Vite بيستخدمه ([[compileScript]] مع [[inlineTemplate: true]]، وده شكل الـ production):

~~~text الناتج (مختصر)
export default _defineComponent({
  __name: 'Counter',
  setup(__props) {
    const count = ref(0)
    return (_ctx, _cache) => {
      return (_openBlock(), _createElementBlock("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => (count.value++))
      }, "ضغطت " + _toDisplayString(count.value) + " مرة", 1 /* TEXT */))
    }
  }
})
~~~

اقرا الناتج:

| السطر | معناه |
|---|---|
| [[setup(__props)]] | الكود اللي كتبته في [[<script setup>]] بقى جسم الدالة دي |
| [[return (_ctx, _cache) => ...]] | الـ template بقى دالة render بترجّع virtual DOM |
| [[count.value++]] | الـ compiler هو اللي زوّد [[.value]] بدالك |
| [[_cache[0]]] | الدالة بتاعة الـ click بتتعمل مرة واحدة وتتخزن، مش مع كل render |
| [[1 /* TEXT */]] | patch flag: بيقول لـ Vue «النص بس هو اللي ممكن يتغيّر هنا»، فوقت التحديث ميقارنش الـ attributes خالص |

الـ patch flags دي سبب إن Vue سريع: الـ compiler عارف من الـ template إيه اللي ثابت وإيه اللي بيتغيّر.

---

## ٥. كل نسخة ليها state لوحدها

لما استخدمنا [[<Counter />]] مرتين وضغطنا الأول ٣ مرات، الأول بقى «ضغطت 3 مرة» والتاني فضل 0: [[setup]] بيتنفّذ لكل نسخة، فكل واحد ليه [[count]] بتاعه.

---

## الخلاصة

| البلوك | شغلته |
|---|---|
| [[<script setup lang="ts">]] | البيانات والدوال، واللي فيه متاح للـ template |
| [[<template>]] | الشكل، و [[{{ }}]] و [[@click]] |
| [[<style scoped>]] | CSS للـ component ده بس، عن طريق [[data-v-xxxx]] |
| [[.value]] | في الـ script لازم، وفي الـ template لأ |`,
          lines: [
            R`بداية بلوك الكود. كلمة [[setup]] معناها إن الكود ده بيتنفّذ مرة لكل نسخة من الـ component، وأي متغير أو دالة أو import هنا بيبقى متاح في الـ template على طول من غير [[return]]. و [[lang="ts"]] بتخلي البلوك TypeScript، ولو شلتها بيبقى JavaScript عادي.`,
            R`بيستورد [[ref]] من Vue. [[ref]] بتلف أي قيمة في «صندوق» Vue بيراقبه، فلما القيمة تتغير Vue يعرف إن الشاشة محتاجة تتحدّث. من غيرها لو كتبت [[let count = 0]] وزوّدته، الرقم هيتغير في الذاكرة بس والشاشة مش هتتحدّث.`,
            R`بيعمل [[count]] كـ ref قيمته الأولى 0. في الـ script بتقرا وتكتب القيمة بـ [[count.value]]، لكن في الـ template بتكتب [[count]] بس لأن Vue بيفك الصندوق لوحده.`,
            R`قفلة بلوك [[<script setup>]]، وبعده بيبدأ شكل الـ component.`,
            R`بداية الـ template: ده شكل الـ component اللي هيترسم، مكتوب شبه HTML بس فيه إضافات Vue زي [[{{ }}]] و [[@click]]. Vite بيحوّله لدالة render وقت الـ build.`,
            R`زرار: [[@click="count++"]] بتشغّل الكود ده كل ما حد يضغط (ومن غير [[.value]] لأننا في الـ template)، و [[{{ count }}]] بتطبع القيمة الحالية. لما [[count]] يتغير Vue بيحدّث النص ده بس من غير ما يعيد رسم الصفحة.`,
            R`قفلة الـ [[<template>]]، وبعدها بلوك الـ CSS.`,
            R`بداية بلوك الـ CSS. [[scoped]] بتخلي القواعد دي تأثر على عناصر الـ component ده بس: Vite بيحط attribute زي [[data-v-xxxx]] على عناصره ويضيفه للـ selector. من غيرها [[button]] هنا هيغيّر شكل كل زرار في الموقع كله.`,
            R`selector بيختار الزراير، وبسبب [[scoped]] بيبقى زراير الـ component ده بس، مش زراير الصفحة كلها.`,
            R`[[padding]] هي المسافة بين حرف الزرار وحافته: 8px فوق وتحت، و 16px يمين وشمال، عشان الزرار ميبقاش لازق في الكلام اللي جواه.`,
            R`قفلة قاعدة [[button]]: الأقواس دي بتحدد الخصائص اللي تخص الـ selector ده.`,
            R`قفلة بلوك [[<style>]]، وده آخر الملف.`
          ],
          sol: R`كل [[<Counter />]] ليه عدّاد لوحده: لما تضغط على الأول التاني بيفضل 0، لأن [[<script setup>]] بيتنفّذ لكل نسخة لوحدها.

وفي DevTools هتلاقي [[<button data-v-xxxxxxxx="">]] (عندنا كان [[data-v-d743e892]])، وفي الـ CSS [[button[data-v-d743e892]]]. ده اللي [[scoped]] بيعمله: الـ CSS مربوط بالـ attribute ده، فمش هيمسك زراير برا الـ component.`,
          solCode: R`<script setup lang="ts">
import Counter from './components/Counter.vue'
</script>

<template>
  <Counter />
  <Counter />
</template>`
        }
      ]
    },
    {
      t: "الـ template والـ directives",
      l: 1,
      n: "{{ }} للنص، و : للـ attributes، و @ للأحداث، و v-if و v-for و v-model",
      items: [
        {
          cmd: "{{ }} و v-bind",
          title: "تطبع قيمة في الصفحة وتربطها بـ attribute",
          desc: R`[[{{ expression }}]] بيطبع قيمة جوه النص، و [[v-bind:href="url"]] (واختصارها [[:href="url"]]) بتربط attribute بقيمة من الـ script. وأي حاجة بين علامات التنصيص بعد [[:]] هي JavaScript مش نص.

و [[:class]] و [[:style]] بياخدوا object أو array: [[:class="{ active: isActive }"]] معناها حط الكلاس [[active]] لو [[isActive]] بـ true.`,
          example: R`<script setup lang="ts">
import { ref } from 'vue'

const name = ref('Sara')
const url = ref('https://vuejs.org')
const isActive = ref(true)
const size = ref(18)
const html = '<b>bold</b>'
</script>

<template>
  <p>{{ name.toUpperCase() }} اسمها {{ name.length }} حروف</p>
  <a :href="url" :class="{ active: isActive, big: size > 20 }">Vue</a>
  <p :style="{ fontSize: size + 'px' }">مقاس {{ size }}</p>
  <input v-bind="{ id: 'q', placeholder: 'search' }" />
  <p>{{ html }}</p>
  <p v-html="html"></p>
</template>`,
          try: R`اعمل [[size]] = 24 وشوف الكلاس [[big]] بيظهر على الـ [[<a>]]. وبعدين جرّب تكتب [[href="url"]] من غير [[:]] وافتح DevTools: الـ href بقى إيه؟`,
          flag: "script",
          deep: {
            why: R`أغلب الشاشة كلام وروابط وكلاسات بتتغير حسب البيانات. بدل ما تكتب [[el.textContent = ...]] و [[el.classList.toggle(...)]] في كل حتة، بتربطهم مرة في الـ template وخلاص.`,
            how: R`جوه [[{{ }}]] وجوه أي [[:attr="..."]] بتكتب **expression** واحد: متغير، أو [[a + b]]، أو [[ok ? 'yes' : 'no']]، أو نداء دالة. مينفعش [[if]] ولا [[const]] ولا أكتر من سطر.

[[{{ }}]] دايمًا بيطبع نص: لو القيمة فيها HTML بيتعرض زي ما هو ([[&lt;b&gt;]])، وده بيحميك من XSS. و [[v-html]] بيحطها HTML فعلًا، فمتستخدمهاش أبدًا مع كلام جاي من المستخدم.

[[:class]] بيتجمع مع [[class]] العادي، و [[:style]] بياخد أسماء camelCase ([[fontSize]]) أو بالشرطة بين علامات تنصيص ([['font-size']]). و [[v-bind="obj"]] من غير اسم بيحط كل خانات الـ object كـ attributes. ومن Vue 3.4 فيه اختصار: [[:href]] لوحدها = [[:href="href"]] لو المتغير بنفس الاسم.`,
            when: R`[[{{ }}]] لأي نص متغير. و [[:attr]] لأي attribute قيمته جاية من البيانات: [[:src]] و [[:href]] و [[:disabled]] و [[:aria-label]]. و [[v-html]] بس لـ HTML انت متأكد منه (زي markdown اتحوّل على السيرفر واتنضف).`,
            mistakes: R`تكتب [[href="url"]] من غير [[:]] فيبقى الرابط حرفيًا كلمة [[url]]. أو [[:title="Sara"]] فـ Vue يدوّر على متغير اسمه Sara (الصح [[:title="'Sara'"]] أو [[title="Sara"]]). وتحط [[{{ }}]] جوه attribute ([[href="{{ url }}"]]): ده مش بيشتغل في Vue 3، استخدم [[:href]]. وتستخدم [[v-html]] مع تعليقات المستخدمين.`
          },
          teach: R`## الفكرة: [[{{ }}]] للنص، و [[:]] للـ attributes

شغّلنا الـ component في مشروع create-vue (Vue 3.5.44) في Chrome headless، وطبعنا الـ HTML اللي اترسم.

---

## ١. الـ script

٥ قيم: [[name]] و [[url]] و [[isActive]] و [[size]] كـ [[ref]] (يعني لو اتغيّروا الشاشة تتحدّث)، و [[html]] نص عادي ثابت.

---

## ٢. [[{{ name.toUpperCase() }} اسمها {{ name.length }} حروف]]

جوه [[{{ }}]] أي JavaScript expression. [[toUpperCase()]] دالة string بتكبّر الحروف، و [[length]] عدد الحروف.

~~~text الناتج
<p>SARA اسمها 4 حروف</p>
~~~

---

## ٣. [[<a :href="url" :class="{ active: isActive, big: size > 20 }">]]

| الحتة | معناها |
|---|---|
| [[:href="url"]] | قيمة الـ href = قيمة المتغير [[url]] |
| [[:class="{ ... }"]] | object: كل key اسم كلاس، والقيمة بتاعته شرط |
| [[active: isActive]] | حط [[active]] لو [[isActive]] بـ true |
| [[big: size > 20]] | حط [[big]] لو [[size]] أكبر من 20 |

~~~text الناتج
<a href="https://vuejs.org" class="active">Vue</a>
~~~

[[big]] مظهرش لأن [[size]] = 18. ولما خليناه 24 بقى [[class="active big"]].

---

## ٤. [[:style="{ fontSize: size + 'px' }"]]

object برضه: الـ key اسم الخاصية بـ camelCase، والقيمة نص. [[size + 'px']] = [['18px']]:

~~~text الناتج
<p style="font-size: 18px;">مقاس 18</p>
~~~

---

## ٥. [[v-bind="{ id: 'q', placeholder: 'search' }"]]

[[v-bind]] من غير اسم attribute وبعدها object: كل خانة بتبقى attribute.

~~~text الناتج
<input id="q" placeholder="search">
~~~

مفيد لما عندك attributes كتير جاية من مكان واحد (زي [[defineField]] في درس الفورمات).

---

## ٦. [[{{ html }}]] ضد [[v-html="html"]]

~~~text الناتج
<p>&lt;b&gt;bold&lt;/b&gt;</p>
<p><b>bold</b></p>
~~~

- الأول: [[{{ }}]] حوّل [[<]] لـ [[&lt;]]، فالمستخدم شايف النص [[<b>bold</b>]] حرفيًا. ده الأمان الافتراضي.
- التاني: [[v-html]] حطه HTML فعلًا، فطلع **bold**. لو [[html]] جاي من مستخدم وفيه [[<img src=x onerror=...>]]، الكود ده هيتنفّذ (XSS).

---

## ٧. من غير [[:]]

لما كتبنا [[href="url"]]:

~~~text الناتج
<a href="url">Vue</a>
~~~

الرابط بقى الكلمة [[url]] نفسها، لأن من غير [[:]] القيمة نص ثابت.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[{{ x }}]] | اطبع x كنص (آمن) |
| [[:href="x"]] | attribute قيمته x (= [[v-bind:href]]) |
| [[:class="{ a: cond }"]] | الكلاس [[a]] بيتحط لو [[cond]] true وبيتشال لو false، ومع أي [[class]] ثابت على نفس العنصر |
| [[:style="{ fontSize: '18px' }"]] | style من object |
| [[v-bind="obj"]] | كل خانات obj كـ attributes |
| [[v-html="x"]] | HTML حقيقي، لمحتوى موثوق بس |`,
          lines: [
            R`بداية الـ script. [[setup]] بتخلي كل متغير هنا متاح في الـ template، و [[lang="ts"]] بتخليه TypeScript.`,
            R`بيستورد [[ref]] عشان نعمل قيم reactive: لما واحدة منها تتغير، كل مكان في الـ template بيستخدمها بيتحدّث لوحده.`,
            R`[[name]] ref فيه النص [[Sara]]. هنستخدمه جوه [[{{ }}]] عشان نبيّن إن جوه الأقواس دي تقدر تنادي دوال الـ string زي [[toUpperCase()]].`,
            R`[[url]] ref فيه رابط. هنربطه بـ [[href]] عن طريق [[:href]]، فلو القيمة اتغيرت بعدين الرابط في الصفحة يتغير معاها.`,
            R`[[isActive]] ref فيه [[true]]. هيتحكم في كلاس [[active]]: طول ما هو [[true]] الكلاس موجود، ولو بقى [[false]] Vue يشيله.`,
            R`[[size]] ref فيه رقم 18. هنستخدمه في حاجتين: نحسب منه [[font-size]]، ونقرر بيه كلاس [[big]] (اللي بيظهر بس لو أكبر من 20).`,
            R`[[html]] نص عادي (مش ref لأنه مش هيتغير) فيه tag [[<b>]]. هنعرضه مرتين عشان نشوف الفرق بين [[{{ }}]] اللي بتعرضه كنص و [[v-html]] اللي بتعرضه كـ HTML.`,
            R`قفلة الـ [[<script setup>]]: كل اللي اتعرّف فوق متاح للـ template اللي جاي.`,
            R`بداية الـ [[<template>]]: هنا هنستخدم القيم اللي فوق بالطرق المختلفة.`,
            R`[[{{ }}]] (اسمها mustache) بتطبع نتيجة أي JavaScript expression: هنا [[SARA]] وبعدها [[4]]. ومن غير [[.value]] لأن الـ template بيفك الـ ref لوحده. ينفع expression واحدة بس، يعني [[if]] أو [[let]] جواها مش هيشتغلوا، واستخدم ternary أو computed بدالهم.`,
            R`[[:href]] اختصار [[v-bind:href]]: الـ [[:]] بتقول إن القيمة JavaScript، فالـ href بيبقى قيمة [[url]]. من غير [[:]] هيبقى النص [[url]] حرفيًا. و [[:class]] بـ object: كل مفتاح اسم كلاس، بيتحط لو قيمته true، فهنا [[active]] موجود و [[big]] لأ لأن 18 مش أكبر من 20.`,
            R`[[:style]] بـ object من خصائص CSS بأسماء camelCase ([[fontSize]] بدل [[font-size]])، والقيمة بتتحسب: [[18px]]. لما [[size]] يتغير الـ style يتحدّث لوحده. خلي بالك إن الوحدة لازم تتكتب، [[fontSize: size]] من غير [[px]] مش هتشتغل.`,
            R`[[v-bind]] من غير اسم attribute وبعده object: كل مفتاح بيبقى attribute، فالـ input بياخد [[id="q"]] و [[placeholder="search"]] مرة واحدة. مفيد لما يكون عندك attributes كتير جاية من object جاهز.`,
            R`[[{{ }}]] بتعرض الـ HTML كنص: هتشوف [[<b>bold</b>]] بالأقواس على الشاشة. ده الأمان الافتراضي: Vue بيعمل escape، فلو اليوزر كتب script في كومنت مش هيتنفّذ.`,
            R`[[v-html]] بتحط النص كـ HTML حقيقي، فتشوف كلمة bold بخط تقيل. استخدمها مع HTML انت متأكد منه بس: لو حطيت فيها حاجة جاية من يوزر، أي [[<img onerror>]] جواها هيتنفّذ (ثغرة XSS).`,
            R`قفلة الـ [[<template>]]، وده آخر الـ component.`
          ],
          sol: R`مع [[size]] = 24 الـ [[<a>]] بقى [[class="active big"]] والـ [[<p>]] [[font-size: 24px]].

ولما شلت [[:]] من [[href]]، الـ HTML بقى [[<a href="url">]]: الرابط بيروح لصفحة اسمها url. القاعدة: من غير [[:]] القيمة نص ثابت، ومعاها JavaScript.`
        },
        {
          cmd: "v-on",
          title: "تسمع للضغط والكتابة والـ submit بـ @",
          desc: R`[[v-on:click="..."]] (واختصارها [[@click]]) بتنفّذ كود لما event يحصل. بتكتب اسم دالة ([[@click="save"]]) أو كود صغير ([[@click="count++"]]) أو نداء بـ arguments ([[@click="add('x')"]]).

والـ modifiers بتختصر حاجات بتتكتب كتير: [[@submit.prevent]] بيمنع الفورم يعمل reload، و [[@click.stop]] بيمنع الـ event يطلع للأب، و [[@keyup.enter]] بيشتغل على Enter بس، و [[@click.once]] مرة واحدة.`,
          example: R`<script setup lang="ts">
import { ref } from 'vue'

const log = ref<string[]>([])
const q = ref('')

function add(msg: string) {
  log.value.push(msg)
}
function onSubmit() {
  add('submit: ' + q.value)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="q" @keyup.enter="add('enter')" @keyup.esc="q = ''" />
    <button>ابحث</button>
  </form>
  <div @click="add('div')">
    <button id="inner" @click.stop="add('inner')">جوه</button>
    <button id="plain" @click="add('plain ' + ($event.target as HTMLElement).id)">عادي</button>
  </div>
  <button id="once" @click.once="add('once')">مرة واحدة</button>
  <pre>{{ log }}</pre>
</template>`,
          try: R`اكتب [[vue]] واضغط Enter، وبعدين اضغط «جوه» و «عادي» و «مرة واحدة» مرتين، وبعدين Esc في الـ input. بص على اللوج: «div» ظهر كام مرة؟ وليه؟ وبعدين شيل [[.prevent]] واضغط Enter: إيه اللي حصل للصفحة؟`,
          flag: "script",
          deep: {
            why: R`أي تفاعل في الصفحة event. و [[@click]] أقصر وأوضح من [[addEventListener]]، وVue بيشيل الـ listener لوحده لما الـ component يختفي، فمفيش memory leaks.`,
            how: R`لو كتبت اسم دالة بس ([[@click="save"]]) Vue بيناديها ويبعتلها الـ event. ولو كتبت كود ([[@click="add('x')"]]) بيلفه في دالة، والـ event الأصلي متاح جوه باسم [[$event]].

الـ modifiers: [[.prevent]] = [[event.preventDefault()]]، و [[.stop]] = [[event.stopPropagation()]]، و [[.once]] بيشيل الـ listener بعد أول مرة، و [[.self]] لو الضغط على العنصر نفسه مش ولاده، و [[.capture]] و [[.passive]] زي خيارات [[addEventListener]]. والمفاتيح: [[.enter]] و [[.esc]] و [[.tab]] و [[.space]] و [[.up]] و [[.down]]، ومعاهم [[.ctrl]] و [[.shift]] و [[.alt]] و [[.meta]] ([[@keyup.ctrl.enter]]). وللماوس [[.left]] و [[.right]] و [[.middle]].`,
            when: R`أي زرار أو فورم أو input. [[.prevent]] مع كل [[@submit]] في SPA. و [[.stop]] بحذر: لو بتمنع الـ event يطلع، أي حاجة فوق مستنياه (زي dropdown بيقفل لما تضغط برا) مش هتعرف.`,
            mistakes: R`تكتب [[@click="save()"]] وانت عايز الـ event: كده الـ event مبيتبعتش لوحده، ابعته انت [[save($event)]] أو اكتب [[@click="save"]]. وتنسى [[.prevent]] في الفورم فالصفحة تعمل reload وكل الـ state يضيع. وتستخدم [[@keyup.enter]] على input جوه form عشان تعمل submit: الـ submit بيحصل لوحده مع Enter، فالكود بيشتغل مرتين.`
          },
          teach: R`## الفكرة: [[@event="كود"]] وبعده modifiers بنقطة

شغّلنا الـ component في Chrome headless (Vue 3.5.44)، وكتبنا [[vue]] و Enter، وضغطنا «جوه» ثم «عادي» ثم «مرة واحدة» مرتين، وبعدين Esc.

---

## ١. الـ script

- [[log]]: array من النصوص، [[ref<string[]>([])]] يعني ref نوعه array of strings قيمته الأولى فاضية.
- [[add(msg)]]: بتزوّد سطر في اللوج. لاحظ [[log.value.push]]: في الـ script لازم [[.value]].
- [[onSubmit]]: بتسجّل اللي في الـ input.

---

## ٢. [[<form @submit.prevent="onSubmit">]]

- [[@submit]] = [[v-on:submit]]: لما الفورم يتبعت.
- [[.prevent]]: نادي [[event.preventDefault()]] الأول، فالمتصفح ميعملش reload ولا يروح لـ URL تاني.
- [["onSubmit"]]: اسم دالة بس، فـ Vue بيناديها.

---

## ٣. [[@keyup.enter]] و [[@keyup.esc]]

- [[@keyup.enter="add('enter')"]]: لما زرار Enter يترفع.
- [[@keyup.esc="q = ''"]]: كود مباشر بيفضّي الـ input. جوه الـ template [[q]] من غير [[.value]].

---

## ٤. [[@click.stop]] جوه [[<div @click>]]

الـ click بيطلع من العنصر لأبوه لجده (اسمها bubbling). الـ [[<div>]] بيسمع لأي click جواه.

- «جوه» عليه [[.stop]]: الـ event وقف عنده، فالـ div مسمعش.
- «عادي» من غير [[.stop]]: اتسجّل هو، وبعدين طلع للـ div فاتسجّل «div».

و [[$event]] هو الـ event الأصلي، و [[($event.target as HTMLElement).id]] بتجيب الـ id بتاع اللي اتضغط. الـ [[as HTMLElement]] ده TypeScript بيقول «الـ target ده عنصر HTML».

---

## ٥. [[@click.once]]

بيشتغل أول مرة بس، وبعدين Vue بيشيل الـ listener.

---

## الناتج

~~~text الناتج (اللوج)
[
  "submit: vue",
  "enter",
  "inner",
  "plain plain",
  "div",
  "once"
]
~~~

وبعد Esc الـ input بقى فاضي، والـ URL فضل [[/l/Events]] من غير reload.

### نقرا الناتج

| السطر | ليه |
|---|---|
| [[submit: vue]] قبل [[enter]] | Enter في input جوه form بيعمل submit مع الـ keydown، و [[@keyup]] بيحصل بعدها لما الزرار يترفع |
| [[inner]] من غير [[div]] بعده | [[.stop]] منع الـ bubbling |
| [[plain plain]] وبعده [[div]] | الأول من الزرار و [[$event.target.id]] = plain، وبعدين الـ event طلع للـ div |
| [[once]] مرة واحدة | مع إننا ضغطنا مرتين |

---

## ٦. من غير [[.prevent]]

لما شلناها وضغطنا Enter، المتصفح عمل submit حقيقي: الصفحة عملت reload، واللوج رجع [[[]]] فاضي لأن الـ component اتعمل من الأول.

---

## الخلاصة

| تكتب | معناها |
|---|---|
| [[@click="fn"]] | نادي fn وابعتلها الـ event |
| [[@click="fn('x', $event)"]] | نداء بـ arguments، و [[$event]] هو الـ event |
| [[.prevent]] | بينادي [[preventDefault()]]: يمنع اللي المتصفح بيعمله لوحده، زي reload الفورم أو فتح اللينك |
| [[.stop]] | بينادي [[stopPropagation()]]: الـ event ميطلعش للعناصر اللي برّه (الأب مش هيسمعه) |
| [[.once]] | الـ handler يشتغل أول مرة بس، وبعدها Vue يشيل الـ listener لوحده |
| [[@keyup.enter]] و [[.esc]] | يشتغل بس لما المفتاح ده بالذات يتساب، من غير ما تكتب [[if (e.key === ...)]] بإيدك |`,
          lines: [
            R`بداية الـ script. كل اللي هيتعرّف هنا ([[log]] و [[q]] والدوال) متاح في الـ template.`,
            R`بيستورد [[ref]] عشان اللوج وقيمة الـ input يبقوا reactive وتتحدّث الشاشة لما يتغيروا.`,
            R`[[log]] ref فيه array نصوص فاضية ([[<string[]>]] بتقول لـ TypeScript إن عناصره نصوص). كل event هيحصل هيضيف سطر فيه، فتشوف بعينك أنهي handler اشتغل وبأنهي ترتيب.`,
            R`[[q]] ref فيه النص اللي اليوزر بيكتبه في الـ input، هيتربط بيه بـ [[v-model]] تحت.`,
            R`دالة [[add]] بتاخد رسالة وتضيفها للوج. كل الـ handlers في الـ template هينادوها، فالـ [[push]] مكتوب في مكان واحد بدل ما يتكرر في كل handler.`,
            R`بيضيف الرسالة في آخر الـ array. هنا محتاجين [[.value]] لأننا في الـ script (في الـ template مش محتاجينها). و [[push]] على array جوه ref بيحدّث الشاشة عادي، Vue بيراقب التعديل جوه الـ array.`,
            R`قفلة دالة [[add]].`,
            R`دالة [[onSubmit]] اللي هتشتغل لما الفورم يتبعت (بـ Enter أو بالزرار). حطيناها في دالة منفصلة بدل كود جوه الـ template عشان الـ template يفضل بسيط.`,
            R`بتسجّل في اللوج كلمة [[submit:]] ومعاها النص اللي في الـ input دلوقتي ([[q.value]]).`,
            R`قفلة دالة [[onSubmit]].`,
            R`قفلة الـ [[<script setup>]]، وبعده الـ template اللي بيربط الأحداث بالدوال دي.`,
            R`بداية الـ [[<template>]]: كل [[@]] هنا معناها «لما الحدث ده يحصل، شغّل ده».`,
            R`[[@submit]] اختصار [[v-on:submit]] وبتنادي [[onSubmit]] لما الفورم يتبعت. والـ modifier [[.prevent]] بيعمل [[event.preventDefault()]] لوحده: من غيره المتصفح بيعمل submit حقيقي ويعمل reload للصفحة، والـ state كله يضيع.`,
            R`[[v-model="q"]] بيربط الـ input بـ [[q]]. و [[@keyup.enter]] بيشتغل بس لما المفتاح اللي اتساب من الكيبورد هو Enter، فيسجّل [[enter]]. و [[@keyup.esc]] بيشتغل مع Esc وبيفضّي [[q]]، فالـ input يفضى (لأن v-model ربطهم). كده مش محتاج تكتب [[if (e.key === 'Enter')]] بإيدك.`,
            R`زرار جوه [[<form>]] من غير [[type]]: نوعه الافتراضي [[submit]]، فضغطه بيبعت الفورم و [[onSubmit]] تشتغل. لو عايز زرار جوه فورم ميبعتش، اكتب [[type="button"]].`,
            R`قفلة الـ [[<form>]]: الـ input والزرار اللي فوق جواه، فالـ Enter والزرار بيبعتوه.`,
            R`[[div]] عليه [[@click]] بيسجّل [[div]]. الـ click على أي زرار جواه بيطلع للـ div كمان (ده اسمه event bubbling)، فالسطر ده موجود عشان نشوف مين بيطلع ومين لأ.`,
            R`زرار عليه [[@click.stop]]: بيسجّل [[inner]] و [[.stop]] بتعمل [[event.stopPropagation()]]، فالـ click ميطلعش للـ div و [[div]] مش هتتسجّل. مفيد لزرار «امسح» جوه كارت لو الكارت نفسه بيفتح صفحة لما تضغطه.`,
            R`زرار من غير [[.stop]]، فالـ click بيطلع للـ div ويتسجّل [[plain plain]] وبعده [[div]]. و [[$event]] متغير خاص في الـ template فيه الـ event الأصلي بتاع المتصفح، و [[$event.target]] هو الزرار اللي اتضغط، فـ [[.id]] بتاعه [[plain]]. الـ [[as HTMLElement]] لـ TypeScript بس عشان يسمح بـ [[.id]].`,
            R`قفلة الـ [[<div>]] اللي بيسمع الـ clicks اللي طالعة من الزرارين اللي جواه.`,
            R`[[@click.once]] بيشغّل الـ handler أول ضغطة بس، وبعدها Vue بيشيل الـ listener، فلو ضغطت مرتين [[once]] بتتسجّل مرة واحدة. مفيد لحاجات زي «اقبل الشروط» اللي متتعملش مرتين.`,
            R`[[<pre>]] بيعرض الـ array كـ JSON زي ما هو، وبيتحدّث مع كل [[push]]، فتشوف ترتيب الأحداث على الشاشة.`,
            R`قفلة الـ [[<template>]]، وده آخر الـ component.`
          ],
          sol: R`اللوج: [[submit: vue]] ثم [[enter]] ثم [[inner]] ثم [[plain plain]] ثم [[div]] ثم [[once]]. «div» ظهر مرة واحدة بس، مع «عادي»، لأن «جوه» عليه [[.stop]]. و «مرة واحدة» اتسجّل مرة مع إنك ضغطته مرتين.

ولما تشيل [[.prevent]] وتضغط Enter، المتصفح بيعمل submit حقيقي: الصفحة بتعمل reload، واللوج بيتمسح لأن الـ state كله اتعمل من جديد.`
        },
        {
          cmd: "v-if و v-show",
          title: "تعرض حاجة بشرط: v-if و v-else و v-show",
          desc: R`[[v-if="cond"]] بيرسم العنصر لو الشرط true ويشيله من الـ DOM خالص لو false، ومعاه [[v-else-if]] و [[v-else]] على العناصر اللي بعده على طول. [[v-show="cond"]] بيرسم العنصر دايمًا ويخبيه بـ [[display: none]].

القاعدة: [[v-if]] لحاجة نادرًا بتتغير أو تقيلة، و [[v-show]] لحاجة بتفتح وتقفل كتير (زي dropdown أو tab).`,
          example: R`<script setup lang="ts">
import { ref } from 'vue'

const role = ref<'admin' | 'user' | 'guest'>('guest')
const open = ref(false)
</script>

<template>
  <p v-if="role === 'admin'">لوحة التحكم</p>
  <p v-else-if="role === 'user'">حسابي</p>
  <p v-else>سجّل دخول</p>
  <div v-show="open" class="menu">المنيو</div>
  <button id="role" @click="role = 'admin'">admin</button>
  <button id="toggle" @click="open = !open">افتح</button>
</template>`,
          try: R`افتح DevTools على تاب Elements واضغط الزرارين. لاحظ: الـ [[<p>]] بيتشال ويتحط عنصر جديد، والـ [[<div class="menu">]] بيفضل موجود ويتغيّر الـ style بتاعه بس. بعدين حط [[<input>]] جوه [[v-if]] واكتب فيه حاجة، واقفله وافتحه: الكلام فضل؟`,
          flag: "script",
          deep: {
            why: R`أي شاشة حقيقية فيها حالات: داخل ولا لأ، بيحمّل ولا خلص، فاضي ولا فيه بيانات. من غير [[v-if]] هتعمل [[style.display]] بإيدك في كل حتة.`,
            how: R`[[v-if]] حقيقي: لو false مفيش عنصر، ولو جواه component بيتعمل له unmount (ويتنادى [[onUnmounted]]) والـ state بتاعه يضيع، ولما يرجع true بيتعمل من الأول. Vue بيحط مكانه تعليق [[<!--v-if-->]] عشان يعرف هيرجّعه فين.

[[v-show]] بيحط [[style="display: none;"]] وبيشيله، والعنصر والـ component اللي جواه عايشين طول الوقت. فـ [[v-if]] رخيص لو false في الأول (مش بيرسم حاجة) وغالي لو بيتقلب كتير، و [[v-show]] العكس.

وعشان تعمل [[v-if]] على كذا عنصر من غير ما تلفهم في div، استخدم [[<template v-if="...">]]: الـ [[<template>]] نفسه مش بيترسم. و [[v-show]] مبيشتغلش على [[<template>]].`,
            when: R`[[v-if]]: صلاحيات، وحالات loading و error و empty، وأي حاجة لو مرسومة هتعمل request أو حسابات. [[v-show]]: منيو، و tabs عايز تحافظ على اللي جواها، و tooltip.`,
            mistakes: R`تحط [[v-else]] على عنصر مش جاي بعد [[v-if]] على طول (لو فيه عنصر في النص Vue بيطلع warning والـ else مش بيشتغل). وتستخدم [[v-if]] على tab فيه فورم، فالمستخدم يقفل الـ tab ويرجع يلاقي اللي كتبه راح. وتحط [[v-if]] و [[v-for]] على نفس العنصر: في Vue 3 الـ [[v-if]] بيتنفّذ الأول فمش هيشوف متغير الـ loop (شوف درس v-for).`
          },
          teach: R`## الفكرة: [[v-if]] بيشيل العنصر، و [[v-show]] بيخبيه

شغّلنا الـ component في Chrome headless (Vue 3.5.44) وطبعنا الـ HTML قبل وبعد ما ضغطنا الزرارين.

---

## ١. الـ script

- [[ref<'admin' | 'user' | 'guest'>('guest')]]: الـ [[<...>]] بعد [[ref]] بيحدد النوع (generic، شوف درس generics في «تاب TypeScript»). هنا union: القيمة لازم تبقى واحدة من التلاتة، والأولى [['guest']].
- [[open]]: boolean للمنيو.

---

## ٢. [[v-if]] و [[v-else-if]] و [[v-else]]

~~~text Roles.vue
<p v-if="role === 'admin'">لوحة التحكم</p>
<p v-else-if="role === 'user'">حسابي</p>
<p v-else>سجّل دخول</p>
~~~

زي [[if / else if / else]] في JS: Vue بيمشي بالترتيب وأول شرط true هو اللي بيترسم، والباقي مش موجود خالص. و [[===]] مقارنة بالقيمة والنوع (شوف «تاب JavaScript»). لازم الـ تلاتة يبقوا ورا بعض من غير عنصر في النص.

---

## ٣. [[v-show="open"]]

~~~text Roles.vue
<div v-show="open" class="menu">المنيو</div>
~~~

العنصر بيترسم دايمًا، و Vue بيتحكم في [[display]] بس.

---

## ٤. الناتج قبل الضغط

~~~text الناتج
<p>سجّل دخول</p>
<div class="menu" style="display: none;">المنيو</div>
<button id="role">admin</button>
<button id="toggle">افتح</button>
~~~

- من التلات [[<p>]] واحد بس موجود: [[v-else]].
- المنيو **موجود** في الـ DOM بس عليه [[display: none]].

---

## ٥. بعد ما ضغطنا admin و افتح

~~~text الناتج
<p>لوحة التحكم</p>
<div class="menu" style="">المنيو</div>
...
~~~

- «سجّل دخول» اتشال، و «لوحة التحكم» عنصر جديد اتعمل.
- المنيو نفس العنصر، والـ [[display: none]] اتشال بس.

---

## ٦. لما [[v-if]] يبقى false ومفيش [[v-else]]

Vue بيحط مكانه تعليق. ده من درس props لما الـ [[tags]] كانت فاضية:

~~~text الناتج
<p>1,500 EGP</p><!--v-if-->
~~~

التعليق ده علامة: لما الشرط يبقى true، Vue بيحط العنصر مكانه بالظبط.

---

## ٧. الـ state جوه [[v-if]] بيضيع

حطينا [[<input>]] جوه [[v-if]]، وكتبنا فيه، وقفلناه وفتحناه: رجع فاضي، لأنه عنصر جديد. ونفس الكلام لأي component: [[onUnmounted]] بيتنادى لما يتقفل، و [[setup]] من الأول لما يرجع (هتشوفها في درس [[onMounted]]). ومع [[v-show]] الكلام بيفضل.

---

## الخلاصة

| | [[v-if]] | [[v-show]] |
|---|---|---|
| لو false | مش موجود في الـ DOM | موجود و [[display: none]] |
| أول رسمة لو false | رخيصة (مفيش حاجة) | بيرسم كله |
| التقليب الكتير | غالي (بيعمل ويهد) | رخيص |
| الـ state اللي جواه | بيضيع | بيفضل |
| [[v-else]] | أيوه | لأ |
| على [[<template>]] | أيوه | لأ |`,
          lines: [
            R`بداية الـ [[<script setup>]] بـ TypeScript: كل اللي هيتعرّف هنا متاح للـ template.`,
            R`بيستورد [[ref]] عشان الدور وحالة المنيو يبقوا reactive: لما يتغيروا الـ template يتحدّث ويقرر يرسم إيه.`,
            R`[[role]] ref قيمته الأولى [[guest]]. النوع [[<'admin' | 'user' | 'guest'>]] بيقول لـ TypeScript إنه مينفعش ياخد غير القيم الـ ٣ دول، فلو كتبت [[role.value = 'admn']] بالغلط هتاخد error قبل ما تشغّل.`,
            R`[[open]] ref بـ [[false]]: المنيو مقفول في الأول. ده اللي هيتحكم في [[v-show]] تحت.`,
            R`قفلة الـ [[<script setup>]]، وبعده الـ template اللي بيقرر يرسم إيه.`,
            R`بداية الـ [[<template>]]: هنا الشروط اللي بتقرر إيه يظهر.`,
            R`[[v-if]] بيرسم العنصر بس لو الشرط true. لو false العنصر مش موجود في الـ DOM خالص (مش مستخبي). ولما الشرط يتقلب Vue بيعمل العنصر من الأول أو يشيله.`,
            R`[[v-else-if]] بيتجرّب بس لو [[v-if]] اللي قبله طلع false. لازم ييجي على طول بعد عنصر عليه [[v-if]] أو [[v-else-if]]، ولو فيه عنصر تاني في النص Vue بيدّي error.`,
            R`[[v-else]] من غير شرط: بيترسم لو كل اللي قبله طلع false. هنا ده اللي بيظهر في الأول لأن [[role]] = [[guest]].`,
            R`[[v-show]] بيرسم العنصر مرة واحدة ويفضل في الـ DOM دايمًا، ولما الشرط يبقى false Vue بيحط عليه [[style="display: none;"]] بس. استخدمه لحاجة بتتفتح وتتقفل كتير (منيو، tabs)، و [[v-if]] لحاجة نادرًا ما بتتغير أو مش عايزها تترسم أصلًا.`,
            R`زرار بيخلي [[role]] = [[admin]] (من غير [[.value]] لأننا في الـ template). أول ما يتضغط، «سجّل دخول» بتتشال من الـ DOM و «لوحة التحكم» بتترسم مكانها.`,
            R`زرار بيقلب [[open]] بـ [[!open]]: لو false يبقى true والعكس. كل ضغطة بتظهر أو تخبي المنيو بتغيير الـ [[display]] بس.`,
            R`قفلة الـ [[<template>]]، وده آخر الـ component.`
          ],
          sol: R`مع [[v-if]] هتلاقي في Elements إن الـ [[<p>]] اتشال واتحط واحد جديد (بيلمع لما يتغيّر)، ومع [[v-show]] نفس الـ [[<div>]] والـ [[style]] بس اللي اتغيّر.

والـ input جوه [[v-if]]: الكلام بيضيع لما تقفله وتفتحه، لأن Vue بيعمل input جديد. لو حطيته جوه [[v-show]] الكلام بيفضل. ده الفرق اللي هتختار بيه في الـ tabs والـ modals.`,
          solCode: R`<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <button @click="show = !show">اقلب</button>
  <input v-if="show" placeholder="v-if: الكلام بيضيع" />
  <input v-show="show" placeholder="v-show: الكلام بيفضل" />
</template>`
        },
        {
          cmd: "v-for و key",
          title: "تعرض list بـ v-for، وليه :key لازم",
          desc: R`[[v-for="item in items"]] بيكرر العنصر مرة لكل عنصر في الـ array، و [[(item, i) in items]] بتديك الـ index كمان. ولازم [[:key]] بقيمة فريدة وثابتة لكل عنصر (غالبًا [[id]])، عشان Vue يعرف أنهي عنصر في الشاشة هو أنهي عنصر في البيانات.

[[v-for]] بيلف كمان على object ([[(value, key) in obj]]) وعلى رقم ([[n in 3]] = 1 و 2 و 3).`,
          example: R`<script setup lang="ts">
import { ref } from 'vue'

type Todo = { id: number; text: string; done: boolean }
const todos = ref<Todo[]>([
  { id: 1, text: 'اشتري عيش', done: false },
  { id: 2, text: 'ذاكر Vue', done: true },
])
let nextId = 3

function addFirst() {
  todos.value.unshift({ id: nextId++, text: 'جديد', done: false })
}
</script>

<template>
  <ul>
    <li v-for="(todo, i) in todos" :key="todo.id" :class="{ done: todo.done }">
      {{ i + 1 }}. {{ todo.text }} <input type="checkbox" v-model="todo.done" />
    </li>
  </ul>
  <span v-for="n in 3" :key="n">{{ n }} </span>
  <button @click="addFirst">ضيف في الأول</button>
</template>`,
          try: R`علّم أول مهمة، وبعدين اضغط «ضيف في الأول». العلامة فضلت على «اشتري عيش»؟ دلوقتي غيّر [[:key="todo.id"]] لـ [[:key="i"]]، وحط [[<input>]] عادي (من غير v-model) جوه كل [[<li>]]، واكتب في أول واحد واضغط «ضيف في الأول»: الكلام راح فين؟`,
          flag: "script",
          deep: {
            why: R`أي list في الشاشة (منتجات، رسايل، صفوف جدول) بتيجي من array. [[v-for]] بيرسمها، ولما الـ array يتغيّر بيحدّث اللي اتغيّر بس.`,
            how: R`لما الـ array يتغيّر، Vue بيقارن الـ keys القديمة بالجديدة: العنصر اللي key بتاعه موجود بيتنقل مكانه (بالـ DOM والـ state اللي جواه)، والجديد بيتعمل، واللي اختفى بيتشال. من غير key (أو بـ index) Vue بيعمل «in-place patch»: بيسيب العناصر مكانها ويغيّر النص بس، فأي state مش في البيانات (input مكتوب فيه، أو component جواه state، أو animation) بيفضل في نفس المكان ويبقى على عنصر غلط.

Vue بيراقب دوال الـ array اللي بتغيّره ([[push]] و [[pop]] و [[shift]] و [[unshift]] و [[splice]] و [[sort]] و [[reverse]])، وبيراقب كمان [[todos.value[0] = x]] (Vue 3 بـ Proxy، مش زي Vue 2). والدوال اللي بترجّع array جديد ([[filter]] و [[map]] و [[slice]]) لازم تحط نتيجتها في الـ ref: [[todos.value = todos.value.filter(...)]].`,
            when: R`أي list. ولو هتفلتر أو ترتّب، اعمل [[computed]] بالنتيجة ولف عليه (درس computed)، متحطش [[v-if]] على نفس عنصر الـ [[v-for]].`,
            mistakes: R`[[:key="i"]] (الـ index) مع list بتتضاف في أولها أو بتترتّب أو بيتمسح من نصها: الـ state بيتنقل لعنصر غلط (المثال في الشرح). و [[:key="Math.random()"]]: كل render كل حاجة بتتعمل من الأول. و [[v-if]] مع [[v-for]] على نفس العنصر: في Vue 3 الـ [[v-if]] أولويته أعلى، فـ [[v-for="u in users" v-if="u.active"]] بيطلع خطأ إن [[u]] مش معروف. والحل [[<template v-for>]] وجواه [[v-if]]، أو computed.`
          },
          teach: R`## الفكرة: كرر العنصر لكل عنصر في الـ array، وادي كل واحد هوية

شغّلنا الـ component في Chrome headless (Vue 3.5.44): رسمناه، وعلّمنا أول مهمة، وضغطنا «ضيف في الأول».

---

## ١. الـ script

| السطر | معناه |
|---|---|
| [[type Todo = { id: number; text: string; done: boolean }]] | شكل المهمة بـ TypeScript |
| [[ref<Todo[]>([...])]] | array من المهام، كـ ref |
| [[let nextId = 3]] | عدّاد عادي (مش ref) للـ id الجاي، لأنه مش بيظهر في الشاشة |
| [[todos.value.unshift(...)]] | [[unshift]] بتحط عنصر في **أول** الـ array |

---

## ٢. [[v-for="(todo, i) in todos" :key="todo.id"]]

| الحتة | معناها |
|---|---|
| [[todo]] | العنصر اللي الدور عليه في اللفة دي (object المهمة كله)، والاسم انت اللي بتختاره |
| [[i]] | الـ index (من 0) |
| [[in todos]] | لف على الـ array ده (ممكن تكتب [[of]] بدل [[in]]، نفس الحاجة) |
| [[:key="todo.id"]] | هوية العنصر، فريدة وثابتة |

و [[{{ i + 1 }}]] عشان الترقيم يبدأ من 1. و [[v-model="todo.done"]] بيربط الـ checkbox بالمهمة نفسها (درس [[v-model]]).

---

## ٣. [[v-for="n in 3"]]

لف على رقم: [[n]] بياخد 1 ثم 2 ثم 3 (بيبدأ من 1 مش 0).

---

## ٤. الناتج

~~~text الناتج (أول ما فتح)
<ul>
  <li class="">1. اشتري عيش <input type="checkbox"></li>
  <li class="done">2. ذاكر Vue <input type="checkbox"></li>
</ul>
<span>1</span><span>2</span><span>3</span>
~~~

وبعد ما علّمنا الأولى وضغطنا «ضيف في الأول»:

~~~text الناتج
<li class="">1. جديد ...</li>
<li class="done">2. اشتري عيش ...</li>
<li class="done">3. ذاكر Vue ...</li>

checked: [ false, true, true ]
~~~

العلامة فضلت مع «اشتري عيش» لأنها في البيانات ([[todo.done]])، والترقيم اتحدّث.

---

## ٥. ليه الـ key مهم: التجربة

عملنا list فيها [[<input>]] عادي من غير [[v-model]] (يعني الكلام فيه state جوه الـ DOM بس، مش في البيانات)، مرة بـ [[:key="i"]] ومرة بـ [[:key="it.id"]]. كتبنا «ملاحظة أحمد» في أول input، وضفنا «جديد» في الأول:

~~~text الناتج
key = index:  [ 'جديد=[ملاحظة أحمد]', 'أحمد=[]', 'منى=[]' ]
key = id:     [ 'جديد=[]', 'أحمد=[ملاحظة أحمد]', 'منى=[]' ]
~~~

### ليه؟

- بـ [[:key="i"]]: قبل الإضافة أحمد كان key 0. بعد الإضافة «جديد» بقى key 0. Vue شاف key 0 لسه موجود، فسابه **نفس العنصر** وغيّر النص بس من «أحمد» لـ «جديد». الـ input اللي فيه الكلام فضل في أول [[<span>]]، فبقى تحت «جديد».
- بـ [[:key="it.id"]]: أحمد key 1 قبل وبعد، فـ Vue **نقل** العنصر بتاعه (بالـ input) مكانه الجديد، وعمل عنصر جديد لـ «جديد».

ونفس المشكلة بالظبط مع أي component جوه الـ list عنده state (عدّاد، فورم، animation).

---

## الخلاصة

| تكتب | النتيجة |
|---|---|
| [[v-for="x in arr" :key="x.id"]] | الشكل الصح: عنصر لكل خانة، و key ثابت من البيانات نفسها مش من الـ index |
| [[(x, i) in arr]] | معاك الـ index |
| [[(v, k) in obj]] | لف على object |
| [[n in 5]] | من 1 لـ 5 |
| [[:key="i"]] | بس لو الـ list عمرها ما بتتغيّر ترتيبها |
| [[v-if]] مع [[v-for]] | لأ على نفس العنصر: computed أو [[<template v-for>]] |`,
          lines: [
            R`بداية الـ [[<script setup>]] بـ TypeScript: كل اللي هيتعرّف هنا متاح للـ template.`,
            R`بيستورد [[ref]] عشان قايمة المهام تبقى reactive: أي إضافة أو تعديل فيها بيحدّث الـ list على الشاشة.`,
            R`[[type Todo]] بيوصف شكل المهمة لـ TypeScript: [[id]] رقم و [[text]] نص و [[done]] true أو false. كده لو نسيت خانة وانت بتضيف مهمة هتاخد error.`,
            R`[[todos]] ref فيه array من [[Todo]]. لأنه ref، [[unshift]] أو تغيير [[done]] جوه أي عنصر بيحدّث الشاشة.`,
            R`أول مهمة، والـ [[id: 1]] بتاعها ثابت ومش بيتكرر. الـ [[id]] ده اللي هنستخدمه كـ [[key]].`,
            R`تاني مهمة، و [[done: true]] يعني خلصانة، فهتاخد كلاس [[done]] والـ checkbox بتاعها متعلّم.`,
            R`قفلة الـ array والـ [[ref]].`,
            R`[[nextId]] متغير عادي (مش ref) لأنه مش بيظهر على الشاشة، بس بنستخدمه عشان كل مهمة جديدة تاخد [[id]] مختلف عن اللي قبلها.`,
            R`دالة [[addFirst]] بتضيف مهمة في أول القايمة. اخترنا الأول مش الآخر عشان دي الحالة اللي بتبيّن ليه الـ [[key]] مهم: كل العناصر بتتزق مكان.`,
            R`[[unshift]] بتحط العنصر في أول الـ array، و [[nextId++]] بيرجّع القيمة الحالية (3) وبعدين يزوّدها لـ 4، فالمهمة الجاية تاخد 4.`,
            R`قفلة دالة [[addFirst]].`,
            R`قفلة الـ [[<script setup>]]، وبعده الـ template اللي هيلف على [[todos]].`,
            R`بداية الـ [[<template>]]: هنا هنرسم عنصر لكل مهمة.`,
            R`[[<ul>]]: القايمة اللي هيتحط جواها [[<li>]] لكل مهمة.`,
            R`[[v-for]] بيكرر الـ [[<li>]] ده مرة لكل عنصر في [[todos]]، و [[(todo, i)]] بيدّيك العنصر ورقمه (من 0). و [[:key="todo.id"]] بيعرّف Vue كل [[<li>]] بتاع أنهي مهمة، فلما تضيف في الأول Vue بيحرّك العناصر الموجودة بدل ما يغيّر محتواها، والـ checkbox يفضل مع صاحبه. لو استخدمت [[i]] كـ key الحالة هتتلخبط. و [[:class]] بيحط [[done]] لو المهمة خلصانة.`,
            R`[[{{ i + 1 }}]] بيرقّم من 1 بدل 0، وبعده النص. والـ checkbox عليه [[v-model="todo.done"]]، فالعلامة بتغيّر [[done]] في الـ array نفسه، وده بيغيّر الكلاس على طول.`,
            R`قفلة الـ [[<li>]]: كل اللي بين فتحته وقفلته بيتكرر مرة لكل مهمة.`,
            R`قفلة الـ [[<ul>]] اللي فيه كل المهام.`,
            R`[[v-for]] على رقم: [[n in 3]] بيلف 3 مرات و [[n]] بيبدأ من 1 مش 0، فيطبع [[1 2 3]]. مفيد لنجوم التقييم أو placeholders وقت التحميل.`,
            R`زرار بينادي [[addFirst]]. اكتب [[addFirst]] من غير أقواس، و Vue هو اللي بينادي الدالة لما الزرار يتضغط.`,
            R`قفلة الـ [[<template>]]، وده آخر الـ component.`
          ],
          sol: R`مع [[:key="todo.id"]] العلامة بتفضل على «اشتري عيش» بعد الإضافة.

ومع [[:key="i"]] والـ [[<input>]] العادي: الكلام اللي كتبته في أول سطر بيفضل في **أول** سطر، يعني بقى تحت «جديد» مش تحت صاحبه. السبب إن الـ index بتاع كل عنصر اتغيّر، فـ Vue فاكر إن العنصر اللي key بتاعه 0 هو هو، وغيّر النص بس. ارجع لـ [[todo.id]].`,
          solCode: R`<li v-for="(todo, i) in todos" :key="i">
  {{ todo.text }} <input placeholder="اكتب هنا" />
</li>`
        },
        {
          cmd: "v-model",
          title: "تربط input بمتغير في الاتجاهين بـ v-model",
          desc: R`[[v-model="name"]] بيربط الـ input بالمتغير في الاتجاهين: المستخدم يكتب فالمتغير يتغيّر، والمتغير يتغيّر من الكود فالـ input يتحدّث. بيشتغل مع [[<input>]] و [[<textarea>]] و [[<select>]] والـ checkbox والـ radio، ومع components بتاعتك (درس [[defineEmits و defineModel]]).

و ٣ modifiers: [[.trim]] بيشيل المسافات من الأول والآخر، و [[.number]] بيحوّل لرقم، و [[.lazy]] بيحدّث بعد ما تسيب الـ input مش مع كل حرف.`,
          example: R`<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const age = ref<number>()
const agree = ref(false)
const city = ref('cairo')
const tags = ref<string[]>([])
</script>

<template>
  <input id="name" v-model.trim="name" />
  <input id="age" v-model.number="age" inputmode="numeric" />
  <input id="agree" v-model="agree" type="checkbox" />
  <select v-model="city">
    <option value="cairo">القاهرة</option>
    <option value="alex">إسكندرية</option>
  </select>
  <label><input v-model="tags" type="checkbox" value="vue" /> Vue</label>
  <label><input v-model="tags" type="checkbox" value="ts" /> TS</label>
  <pre>{{ { name, age, typeofAge: typeof age, agree, city, tags } }}</pre>
</template>`,
          try: R`اكتب «  Sara  » بمسافات، و 25 في السن، وعلّم agree و TS، واختار إسكندرية. بص على الـ [[<pre>]]: [[name]] فيه مسافات؟ و [[typeofAge]] إيه؟ بعدين شيل [[.number]] واكتب 25 تاني: النوع بقى إيه؟`,
          flag: "script",
          deep: {
            why: R`الفورمات أكتر حاجة بتتكتب في الفرونت إند. من غير [[v-model]] هتكتب لكل input [[:value]] و [[@input]] وتطلّع [[event.target.value]] بإيدك.`,
            how: R`[[v-model]] اختصار: على input نص هو [[:value="name" @input="name = $event.target.value"]]. على checkbox بيستخدم [[checked]] و [[change]]، وعلى select [[value]] و [[change]]. ولو checkbox كتير مربوطين بنفس array، كل واحد بيضيف أو يشيل الـ [[value]] بتاعه من الـ array.

الـ input بيدّي string دايمًا. Vue بيحوّله لرقم لوحده لو الـ input [[type="number"]]، وفي أي input تاني محتاج [[.number]] (بيستخدم [[parseFloat]]: [["25abc"]] بتبقى [[25]]، ولو النص مبيبدأش برقم بيفضل string). و [[.lazy]] بيسمع لـ [[change]] بدل [[input]]، فالقيمة تتحدّث لما تسيب الخانة. و Vue بيتجاهل [[value]] و [[checked]] و [[selected]] المكتوبين في الـ HTML، والقيمة الأولى دايمًا من المتغير.`,
            when: R`أي فورم. ولما الفورم يكبر وتحتاج validation ورسايل أخطاء، استخدم مكتبة (درس [[VeeValidate + zod]] في المستوى ٢). وللبحث اللي بيعمل request، اربط بـ [[v-model]] وراقب بـ [[watch]] مع debounce.`,
            mistakes: R`تعمل [[v-model]] على prop جاي من الأب ([[v-model="props.title"]]): الـ props للقراية بس، استخدم [[defineModel]]. وتنسى [[.number]] فتجمع [[age + 1]] ويطلع [['251']]. وتكتب [[value="x"]] و [[v-model]] على نفس الـ input نص وتستغرب إن الـ value اتجاهل. وتحط [[v-model]] على ref اتعمله destructuring من reactive فمش بيتحدّث.`
          },
          teach: R`## الفكرة: المتغير والـ input نفس القيمة دايمًا

شغّلنا الـ component في Chrome headless (Vue 3.5.44): طبعنا الـ [[<pre>]] أول ما فتح، وبعدين كتبنا «  Sara  » و 25، وعلّمنا agree و TS، واخترنا إسكندرية.

---

## ١. الـ script

| المتغير | القيمة الأولى | معاه |
|---|---|---|
| [[name]] | [['']] | input نص |
| [[age]] | [[undefined]] ([[ref<number>()]] من غير قيمة) | input رقم |
| [[agree]] | [[false]] | checkbox واحد → boolean |
| [[city]] | [['cairo']] | select |
| [[tags]] | [[[]]] | كذا checkbox → array |

---

## ٢. كل سطر في الـ template

| السطر | بيعمل إيه |
|---|---|
| [[v-model.trim="name"]] | [[.trim]] بيشيل المسافات من الأول والآخر قبل ما يحط القيمة |
| [[v-model.number="age" inputmode="numeric"]] | input نص عادي، و [[inputmode]] بيطلّع كيبورد أرقام على الموبايل، و [[.number]] بيحوّل النص لرقم |
| [[v-model="agree" type="checkbox"]] | checkbox لوحده: true أو false |
| [[<select v-model="city">]] | القيمة = [[value]] بتاع الـ option المختار |
| [[v-model="tags" ... value="vue"]] | مربوط بـ array: لو اتعلّم [['vue']] تتضاف، ولو اتشال تتشال |

و [[{{ { name, age, ... } }}]]: object جوه [[{{ }}]] بيتطبع JSON. و [[typeof age]] بيقول نوع القيمة.

---

## ٣. الناتج أول ما فتح

~~~text الناتج
{
  "name": "",
  "typeofAge": "undefined",
  "agree": false,
  "city": "cairo",
  "tags": []
}
~~~

[[age]] مش ظاهر لأن [[JSON]] بيشيل أي خانة قيمتها [[undefined]]. والـ select اختار «القاهرة» لوحده لأن [[city]] = [['cairo']].

---

## ٤. بعد الكتابة والاختيار

~~~text الناتج
{
  "name": "Sara",
  "age": 25,
  "typeofAge": "number",
  "agree": true,
  "city": "alex",
  "tags": [
    "ts"
  ]
}
~~~

### نقرا الناتج

- [[name]] بقى [["Sara"]] من غير المسافات: [[.trim]].
- [[age]] = [[25]] من غير علامات تنصيص، و [[typeofAge]] = [[number]]: [[.number]].
- [[tags]] فيها [["ts"]] بس، لأن Vue ما اتعلّمش.

ومن غير [[.number]] نفس الـ input طلّع [["25"]] و [[typeofAge]] = [["string"]]: المتصفح دايمًا بيرجّع نص. الاستثناء الوحيد [[type="number"]]: هناك Vue بيحوّل لوحده حتى من غير [[.number]] (جربناها وطلعت [[25]] رقم). ومع [[.number]] لو كتبت [[25abc]] بتطلع [[25]]، لأنه بيستخدم [[parseFloat]].

---

## ٥. [[v-model]] بيعمل إيه تحت

~~~text الاتنين نفس الحاجة
<input v-model="name" />
<input :value="name" @input="name = $event.target.value" />
~~~

[[:value]] من المتغير للـ input، و [[@input]] من الـ input للمتغير. ده معنى «اتجاهين».

---

## الخلاصة

| العنصر | القيمة اللي بتطلع |
|---|---|
| input نص | string |
| مع [[.number]] | number (أو النص لو مش رقم) |
| مع [[.trim]] | string من غير مسافات الأطراف |
| checkbox لوحده | boolean |
| checkbox كتير على array | array بالـ values المعلّمة |
| select | الـ value بتاع الـ option |
| [[.lazy]] | بيتحدّث لما تسيب الخانة بس |`,
          lines: [
            R`بداية الـ [[<script setup>]] بـ TypeScript: هنا ref لكل خانة في الفورم.`,
            R`بيستورد [[ref]]: كل خانة في الفورم هيبقى ليها ref و [[v-model]] هيربطها بيه في الاتجاهين.`,
            R`[[name]] ref بنص فاضي، مربوط بأول input. لازم تبدأه بـ [[ref('')]] مش [[ref()]] عشان الـ input يبدأ فاضي والنوع يفضل string.`,
            R`[[age]] ref نوعه رقم ومن غير قيمة أولى، فبيبدأ [[undefined]] والـ input فاضي. هيتملى بالـ input اللي عليه [[.number]].`,
            R`[[agree]] ref بـ [[false]]، مربوط بـ checkbox لوحده: لما تعلّمه يبقى [[true]] ولما تشيل العلامة يرجع [[false]].`,
            R`[[city]] ref بـ [[cairo]]، مربوط بالـ select. لأن قيمته [[cairo]] من الأول، الـ option اللي [[value]] بتاعه [[cairo]] هو اللي بيبقى مختار.`,
            R`[[tags]] ref بـ array فاضية. لما أكتر من checkbox يتربطوا بنفس الـ array، كل واحد بيتعلّم بيحط [[value]] بتاعه في الـ array، ولما تشيل العلامة القيمة تتشال منها.`,
            R`قفلة الـ [[<script setup>]]، وبعده الـ template اللي هيربط كل input بالـ ref بتاعه.`,
            R`بداية الـ [[<template>]]: هنا الـ inputs وكل واحد عليه [[v-model]].`,
            R`[[v-model]] بيربط الـ input بـ [[name]] في الاتجاهين: اللي بتكتبه يروح لـ [[name]]، ولو غيّرت [[name]] من الكود الـ input يتغير. و [[.trim]] بيشيل المسافات اللي في أول وآخر النص قبل ما يحطه في [[name]]، فـ «  Sara  » توصل [[Sara]].`,
            R`[[.number]] بيحوّل النص لرقم بـ [[parseFloat]] قبل ما يحطه في [[age]]، لأن أي input بيرجّع string حتى لو كتبت أرقام. لو الكلام مش رقم ([[abc]]) أو الـ input فاضي، القيمة بتفضل string. و [[inputmode="numeric"]] بيفتح كيبورد الأرقام على الموبايل بس، ومش بيمنع الحروف.`,
            R`[[v-model]] على checkbox لوحده بيحط [[true]] أو [[false]] في [[agree]] بدل النص. Vue بيبص على [[type]] ويختار هيقرا [[checked]] ولا [[value]].`,
            R`[[v-model]] على [[<select>]] بيحط [[value]] بتاع الـ option المختار في [[city]]. لو [[city]] اتغير من الكود، الـ select يختار الـ option اللي قيمته زيه.`,
            R`option قيمته [[cairo]] والنص اللي اليوزر بيشوفه «القاهرة». الـ [[value]] هو اللي بيوصل لـ [[city]] مش النص، فالكود يفضل بالإنجليزي حتى لو الواجهة عربي.`,
            R`option تاني قيمته [[alex]]: لو اخترته [[city]] تبقى [[alex]].`,
            R`قفلة الـ [[<select>]] بعد ما حطينا كل الـ options جواه.`,
            R`checkbox مربوط بـ [[tags]] (array) وقيمته [[vue]]: لما تعلّمه Vue يضيف [[vue]] للـ array، ولما تشيل العلامة يشيلها. والـ [[<label>]] اللي حواليه بيخلي الضغط على كلمة «Vue» يعلّم المربع كمان.`,
            R`checkbox تاني على نفس الـ array بقيمة [[ts]]. لو علّمت الاتنين [[tags]] تبقى فيها القيمتين بترتيب ما علّمتهم.`,
            R`[[<pre>]] بيطبع object فيه كل القيم، ومعاهم [[typeof age]] عشان تشوف بعينك إن [[.number]] حوّل السن لـ [[number]]. ده سطر للتجربة بس، بيتشال من الفورم الحقيقي.`,
            R`قفلة الـ [[<template>]]، وده آخر الـ component.`
          ],
          sol: R`[[name]] بيطلع [["Sara"]] من غير مسافات، و [[age]] = [[25]] و [[typeofAge]] = [["number"]]، و [[agree]] = [[true]]، و [[city]] = [["alex"]]، و [[tags]] = [[["ts"]]].

ولما تشيل [[.number]] وتكتب 25، [[typeofAge]] بيبقى [["string"]] والقيمة [["25"]]: الـ input النص دايمًا بيرجّع string، و [[.number]] هو اللي بيحوّل. (مع [[type="number"]] بس Vue بيحوّل لوحده.)`
        }
      ]
    }
  ],
});

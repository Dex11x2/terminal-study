// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("react", {
  label: "React",
  prompt: "$ ",
  lab: R`npm create vite@latest react-lab -- --template react-ts
cd react-lab && npm i
npm run dev`,
  labText: "مشروع Vite + React + TypeScript هو أسرع مكان تجرّب فيه. ركّب React DevTools في المتصفح عشان تشوف الـ components والـ state.",
  levels: {"1":["الأساس","components و props و state و events و lists والـ JSX"],"2":["التطبيقات الحقيقية","effects، و forms، و router، و React Query، و Zustand، و context، و i18n"],"3":["العمق والانترفيو","الأداء، و rendering، والاختبارات، و patterns، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "الفكرة و JSX و components",
      l: 1,
      n: "React بترسم الشاشة من البيانات، وانت بتكتب components بترجع JSX",
      items: [
        {
          cmd: "مقدمة React والـ Components",
          title: "React بتعمل إيه، والـ component والـ JSX شكلهم إيه من الصفر؟",
          desc: R`[[React]] مكتبة JavaScript من Meta لبناء واجهات المستخدم. من غيرها، لما داتا تتغير في الصفحة انت اللي بتدوّر على العنصر ([[document.querySelector]]) وتعدّله بإيدك ([[textContent]] و [[classList]])، ومع كل feature الكود ده بيكبر ويتلخبط. في React انت بتوصف الشاشة شكلها إيه لكل حالة من الداتا، ولما الداتا تتغير React هي اللي بتعدّل الـ DOM. الفكرة دي بالتفصيل في الدرس الجاي («UI = f(state)»).

الـ component هو حجر البناء: دالة JavaScript عادية اسمها بيبدأ بحرف كبير، وبترجّع شكل حتة من الشاشة. بتعمل component للزرار، وواحد للـ navbar، وواحد لكارت المنتج، وتستخدم كل واحد كذا مرة.

والشكل اللي الـ component بيرجّعه مكتوب بـ [[JSX]]: كلام شبه HTML جوه JavaScript. الرموز الجديدة فيه:
• [[<h1>...</h1>]] جوه [[return]]: ده مش string، ده JSX. أدوات زي Vite بتحوّله لـ JavaScript عادي قبل ما يوصل للمتصفح.
• [[{userName}]]: الأقواس المعقوفة جوه JSX معناها «حط هنا قيمة JavaScript». من غيرها هيطبع كلمة userName نفسها.
• [[<WelcomeBanner />]]: كده بتستخدم component جوه component، كأنه tag. و [[/>]] معناها إن الـ tag قافل نفسه (ملوش محتوى). في JSX أي tag لازم يتقفل.
• [[return (...)]]: لو الـ JSX أكتر من سطر بتحطه بين قوسين.
• [[export default]]: بتطلّع الـ component من الملف عشان ملف تاني يستخدمه. في Vite ملف [[main.tsx]] بيعمل import لـ App ويرسمه في الصفحة.

قواعد JSX كاملة ([[className]] بدل [[class]] وغيرها) في درس «JSX»، وإزاي تبعت داتا لـ component في درس «props».`,
          example: R`// component: دالة اسمها بحرف كبير بترجّع JSX
function WelcomeBanner() {
  const userName = "عبد الرحمن";
  return <h1>أهلًا يا {userName}!</h1>;
}

// App بيستخدم WelcomeBanner كأنه tag، ومرتين
export default function App() {
  return (
    <main>
      <WelcomeBanner />
      <WelcomeBanner />
    </main>
  );
}`,
          try: R`شغّل الـ lab اللي فوق، وافتح [[src/App.tsx]] وامسح كل اللي فيه وحط المثال، واحفظ. المتصفح هيتحدّث لوحده. بعدين غيّر الاسم في [[userName]] واحفظ، وبعدين امسح الأقواس من [[{userName}]] (خليها [[userName]] بس) واحفظ. وآخر حاجة غيّر اسم الدالة لـ [[welcomeBanner]] بحرف صغير في المكانين.`,
          flag: "script",
          deep: {
            why: R`لما الشاشة تبقى components صغيرة، كل واحد ليه ملف ووظيفة واحدة، تقدر تعدّل كارت المنتج من غير ما تخاف تبوّظ الـ navbar، وتستخدم نفس الزرار في ١٠ صفحات. ودي نفس الطريقة اللي Next.js و React Native شغالين بيها، فاللي هتتعلمه هنا هينفعك هناك.`,
            how: R`المتصفح مبيفهمش JSX. Vite (أو أي أداة build) بيحوّل [[<h1>أهلًا يا {userName}!</h1>]] لنداء دالة عادي بيرجّع object بيوصف العنصر. React بتنادي الـ component، وتاخد الـ objects دي، وتعمل منها عناصر DOM حقيقية في الصفحة. ولما الداتا تتغير بتنادي الـ component تاني وتقارن الناتج الجديد بالقديم، وتعدّل في الـ DOM الحتت اللي اتغيرت بس.

الحرف الكبير مش ذوق: JSX بيعتبر [[<main>]] (حرف صغير) عنصر HTML، و [[<WelcomeBanner />]] (حرف كبير) component بيدوّر عليه في الكود.

لما بتحفظ الملف، Vite بيبعت التعديل للصفحة من غير reload كامل (اسمها Fast Refresh)، عشان كده التغيير بيبان على طول.`,
            when: "أي واجهة فيها تفاعل وحالات كتير: لوحة تحكم، متجر، تطبيق فيه فورم وفلاتر. لصفحة ثابتة فيها كلام وصور بس، HTML و CSS كفاية.",
            mistakes: R`تسمّي الـ component بحرف صغير ([[welcomeBanner]])، فـ JSX يعتبره tag HTML مش موجود ومش بيظهر حاجة. تنسى الأقواس حوالين المتغير فيتطبع اسمه. تنسى تقفل الـ tag ([[<WelcomeBanner>]] من غير [[/>]]) فيطلعلك error. وتكتب [[return]] في سطر والـ JSX في السطر اللي بعده من غير قوسين: JavaScript بيعتبر الـ return خلصت ويرجّع [[undefined]].`
          },
          teach: R`## الفكرة في سطرين

المثال فيه دالتين: [[WelcomeBanner]] بترجّع عنوان فيه اسم، و [[App]] بتستخدمها مرتين. هنفك كل سطر، وبعدين نشوف الـ JSX بيتحوّل لإيه فعلًا، وإيه اللي بيظهر في الصفحة. كله اتشغّل في مشروع Vite 8.3 + React 19.2 + TypeScript، والصفحة اتفتحت في Chrome headless.

---

## ١. الـ component الأول: [[WelcomeBanner]]

~~~text src/App.tsx
function WelcomeBanner() {
  const userName = "عبد الرحمن";
  return <h1>أهلًا يا {userName}!</h1>;
}
~~~

### [[function WelcomeBanner()]]

دالة JavaScript عادية جدًا، مفيش فيها أي حاجة خاصة بـ React غير حاجتين:

- **اسمها بيبدأ بحرف كبير** ([[W]]). ده مش ذوق، ده اللي بيخلي React تعرف إنها component مش عنصر HTML (هنجرّب ده تحت).
- **بترجّع JSX**: وصف لحتة من الشاشة.

القوسين [[()]] فاضيين لأن الـ component ده مش بياخد مدخلات. لما يبقى ليه مدخلات اسمها props (درس «props»).

### [[const userName = "عبد الرحمن";]]

متغير عادي جوه الدالة. أي JavaScript ينفع يتكتب هنا قبل الـ [[return]]: حسابات، أو شروط، أو نداء دوال.

### [[return <h1>أهلًا يا {userName}!</h1>;]]

ده أهم سطر. اللي بعد [[return]] **مش string** (مفيش علامات تنصيص)، ده JSX: كلام شكله HTML جوه ملف JavaScript.

| الحتة | معناها |
|---|---|
| [[<h1>]] ... [[</h1>]] | عنصر HTML عادي: عنوان كبير |
| [[أهلًا يا ]] | نص ثابت بيتكتب زي ما هو |
| [[{userName}]] | الأقواس المعقوفة معناها «هنا قيمة JavaScript»، فبيتحط مكانها «عبد الرحمن» |
| [[!]] | نص ثابت تاني |

---

## ٢. الـ component التاني: [[App]]

~~~text src/App.tsx
export default function App() {
  return (
    <main>
      <WelcomeBanner />
      <WelcomeBanner />
    </main>
  );
}
~~~

- [[export default]]: [[export]] يعني «طلّع الدالة دي برا الملف عشان ملف تاني يقدر يستخدمها»، و [[default]] يعني «دي الحاجة الأساسية في الملف»، فاللي بيستوردها يكتب [[import App from './App']] من غير أقواس معقوفة. والملف اللي بيستورده هو [[src/main.tsx]].
- [[return (]]: الـ JSX هنا كذا سطر، فبيتحط بين قوسين. من غيرهم، لو كتبت [[return]] لوحدها في سطر، JavaScript بيحط [[;]] لوحده بعدها والدالة ترجّع [[undefined]].
- [[<main>]]: حرف صغير، يعني عنصر HTML حقيقي. شغلته يلم اللي جواه، لأن الـ component لازم يرجّع عنصر واحد من برا.
- [[<WelcomeBanner />]]: حرف كبير، يعني «نادي الـ component اللي اسمه كده وحط اللي بيرجّعه هنا». و [[/>]] معناها إن الـ tag قافل نفسه، لأن ملوش محتوى بين فتحة وقفلة. في JSX أي tag لازم يتقفل.
- السطر المكرر: كل [[<WelcomeBanner />]] نسخة مستقلة. React بتنادي الدالة مرة لكل واحدة.

---

## ٣. JSX بيتحوّل لإيه؟

المتصفح مبيفهمش JSX. Vite بيحوّله لـ JavaScript عادي قبل ما يبعته. ده نفس المثال بعد التحويل (طلّعناه بـ TypeScript بإعداد [[jsx: "react-jsx"]]، نفس إعداد قالب Vite). الناتج الحقيقي كاتب الحروف العربية كأكواد زي [[أه...]]، ورجّعناها عربي هنا عشان تتقري بس:

~~~text الناتج بعد التحويل
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
function WelcomeBanner() {
    const userName = "عبد الرحمن";
    return _jsxs("h1", { children: ["أهلًا يا ", userName, "!"] });
}
export default function App() {
    return (_jsxs("main", { children: [_jsx(WelcomeBanner, {}), _jsx(WelcomeBanner, {})] }));
}
~~~

لاحظ الفرق:

- [[<h1>]] بقت [[_jsxs("h1", ...)]]: **string** فيه اسم العنصر.
- [[<WelcomeBanner />]] بقت [[_jsx(WelcomeBanner, {})]]: **الدالة نفسها** من غير علامات تنصيص.

ده بالظبط سبب الحرف الكبير: الحرف الصغير بيتحوّل لاسم عنصر HTML، والكبير بيتحوّل لمتغير بيتدوّر عليه في الكود. والدوال [[jsx]] و [[jsxs]] بيرجّعوا objects بتوصف الشاشة، و React بتعمل منها عناصر DOM حقيقية.

---

## ٤. اللي ظهر في الصفحة

ده الـ HTML اللي React حطته جوه [[<div id="root">]]:

~~~text الناتج (Chrome)
<main><h1>أهلًا يا عبد الرحمن!</h1><h1>أهلًا يا عبد الرحمن!</h1></main>
~~~

[[WelcomeBanner]] نفسه مش موجود في الـ HTML. الـ component اختفى وفضل اللي رجّعه بس.

---

## ٥. التجارب اللي في «جرّب»

### من غير الأقواس: [[أهلًا يا userName!]]

~~~text الناتج
<main><h1>أهلًا يا userName!</h1><h1>أهلًا يا userName!</h1></main>
~~~

من غير [[{ }]] الكلمة بقت نص عادي، زي «أهلًا» بالظبط.

### بحرف صغير: [[welcomeBanner]]

~~~text الناتج
<main><welcomebanner></welcomebanner><welcomebanner></welcomebanner></main>
~~~

~~~text الـ Console
<welcomeBanner /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
The tag <welcomeBanner> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
~~~

React اعتبرته عنصر HTML اسمه [[welcomebanner]]، والمتصفح عمله عنصر فاضي مبيظهرش حاجة. و [[PascalCase]] يعني كل كلمة في الاسم أولها حرف كبير. و TypeScript ([[tsc]]) كمان رفضه:

~~~text tsc
error TS2339: Property 'welcomeBanner' does not exist on type 'JSX.IntrinsicElements'.
~~~

[[IntrinsicElements]] هي لستة عناصر HTML اللي TypeScript يعرفها، والاسم ده مش فيها.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| component | دالة اسمها بحرف كبير بترجّع JSX |
| [[<h1>...</h1>]] في [[return]] | JSX، مش string. بيتحوّل لنداء [[jsx("h1", ...)]] |
| [[{userName}]] | حط قيمة JavaScript هنا |
| [[<WelcomeBanner />]] | استخدم component، و [[/>]] قفلة الـ tag |
| حرف صغير | عنصر HTML، حرف كبير: component |
| [[export default]] | الـ component الأساسي في الملف، و [[main.tsx]] بيستورده |`,
          lines: [
            R`تعريف component: دالة عادية، اسمها بحرف كبير.`,
            R`متغير عادي جوه الدالة.`,
            R`بترجّع JSX: عنوان، و [[{userName}]] بتحط قيمة المتغير جوه الكلام.`,
            R`آخر الـ component.`,
            R`[[export default]]: الـ component الأساسي اللي ملف main.tsx بيرسمه.`,
            R`[[return (]]: الـ JSX أكتر من سطر، فبين قوسين.`,
            R`عنصر HTML عادي (حرف صغير) شايل الباقي جواه.`,
            R`استخدام الـ component: [[/>]] معناها قافل نفسه.`,
            R`نفس الـ component مرة تانية: نسخة تانية مستقلة.`,
            R`قفلة الـ main.`,
            R`قفلة القوس والـ return.`,
            R`آخر App.`
          ],
          sol: R`على الصفحة هتلاقي سطرين بخط عنوان كبير، الاتنين: «أهلًا يا عبد الرحمن!». ممكن تلاقي تنسيق غريب (توسيط أو ألوان) جاي من ملفات CSS بتاعة قالب Vite، ودا مش من الكود ده.

لما تغيّر الاسم وتحفظ: السطرين بيتغيروا على طول من غير ما الصفحة تعمل reload كامل.

لما تمسح الأقواس: السطرين بيبقوا «أهلًا يا userName!»، الكلمة نفسها مش قيمتها.

لما تغيّر الاسم لـ [[welcomeBanner]] بحرف صغير: السطرين بيختفوا. لو فتحت Elements هتلاقي [[<welcomebanner>]] فاضي، والـ Console فيه تحذير من React إن الـ tag ده مش معروف للمتصفح، ولو قصدك component يبدأ بحرف كبير. وفي VS Code خط أحمر تحت الـ tag لأن TypeScript مش لاقي عنصر HTML بالاسم ده. React اعتبره عنصر HTML مش component. رجّع الحرف الكبير.`
        },
        {
          cmd: "UI = f(state)",
          title: "React بتحل مشكلة إيه أصلًا",
          desc: R`React مكتبة بتخليك توصف الشاشة كدالة في البيانات: تقول «لو الـ state كده، الشاشة شكلها كده»، وهي اللي تعدّل الـ DOM لما البيانات تتغير.

من غيرها بتكتب كود بيدوّر على العناصر ويعدّلها بإيدك: [[querySelector]] و [[textContent]] و [[classList.add]]. ومع كل feature جديدة الحالات بتكتر، لحد ما الشاشة تبقى مش متطابقة مع البيانات. في React انت بتغيّر البيانات بس، والشاشة بتتحسب من جديد.`,
          example: R`// من غير React: انت اللي بتعدّل الـ DOM
button.addEventListener('click', () => {
  count++
  label.textContent = String(count)
})
// بـ React: بتوصف الشاشة، وهي بتعدّل الـ DOM
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`,
          try: R`في مشروع الـ lab امسح اللي في [[src/App.tsx]] وحط الـ Counter ده ([[import { useState } from 'react']] فوق، و [[export default]] قبل function). اضغط الزرار، وافتح React DevTools وشوف الـ state بتتغير مع كل ضغطة.`,
          flag: "script",
          deep: {
            why: "الشاشة في أي تطبيق حقيقي بتعتمد على بيانات كتير: المستخدم داخل ولا لأ، والسلة فيها كام حاجة، والطلب لسه بيحمّل ولا خلص. لو بتعدّل الـ DOM بإيدك، لازم تفتكر كل مكان بيتأثر بكل تغيير، وأي نسيان يبقى bug. React بتقلب المعادلة: انت بتقول الشاشة شكلها إيه في كل حالة، وهي اللي تتكفّل بالتعديل.",
            how: R`الـ component دالة JavaScript عادية بترجع وصف للشاشة (JSX). لما الـ state تتغير، React بتنادي الدالة تاني، ودي اسمها render، فترجع وصف جديد.

الوصف ده مش DOM. هو objects عادية شكلها [[{ type: 'button', props: {...} }]]، واللي الناس بتسميه virtual DOM. React بتقارن الوصف الجديد بالقديم، وتطبّق الفرق بس على الـ DOM الحقيقي. لو الرقم بس اللي اتغير، هي بتغيّر النص ده بس، مش الزرار كله.

عشان كده جملة «UI = f(state)» حقيقية: نفس الـ props ونفس الـ state لازم يطلعوا نفس الشاشة. والـ component لازم يبقى pure: وهو بيترسم ميعدّلش حاجة برا نفسه (ميبعتش request، ميغيّرش متغير global). الحاجات دي مكانها الـ events والـ effects، وده هتشوفه في المستوى التاني.

والملف اللي بيشغّل كل ده [[src/main.tsx]]: [[createRoot(document.getElementById('root')).render(<App />)]]، يعني «امسك الـ div اللي في index.html وارسم App جواه».`,
            when: "أي واجهة فيها تفاعل وبيانات بتتغير: dashboards، ومتاجر، وفورمات كتير، ولوحات أدمن. لصفحة ثابتة (landing فيها نص وصور) React ممكن تبقى زيادة، و HTML و CSS كفاية، أو Next.js بيطلّعها static.",
            mistakes: R`تفتكر إن React framework كامل: هي مكتبة للواجهة بس. الراوتنج، وجلب البيانات، والـ state العام مكتبات تانية (React Router و TanStack Query و Zustand) أو framework زي Next.js. وتعدّل الـ DOM بإيدك جوه component ([[document.getElementById('x').style.color = 'red']]): React مش هتعرف، وأول render ممكن يمسح تعديلك. ولو محتاج تلمس الـ DOM فعلًا، فيه [[useRef]] في المستوى التاني.`
          },
          teach: R`## الفكرة: نفس العداد بطريقتين

المثال بيعمل نفس الحاجة مرتين: زرار عليه رقم، وكل ضغطة تزوّده واحد. المرة الأولى JavaScript عادي بيلمس الـ DOM بإيده، والتانية React. الفرق بينهم هو الدرس كله. جزء JavaScript العادي اتشغّل في Node 24 بـ jsdom (مكتبة بتعمل DOM وهمي)، وجزء React في مشروع Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. من غير React

~~~text vanilla.js
button.addEventListener('click', () => {
  count++
  label.textContent = String(count)
})
~~~

المثال مفترض إن [[button]] و [[label]] عناصر جبتهم قبل كده بـ [[document.querySelector]]، و [[count]] متغير [[let]] بيبدأ بصفر.

- [[addEventListener('click', ...)]]: «لما حد يضغط على الزرار، نفّذ الدالة دي».
- [[() => { ... }]]: arrow function، دالة من غير اسم بتتبعت كـ قيمة.
- [[count++]]: زوّد المتغير واحد. ده بيغيّر **البيانات** بس، الشاشة لسه زي ما هي.
- [[label.textContent = String(count)]]: انت بنفسك بتروح للعنصر وتكتب فيه الرقم الجديد. [[textContent]] هو النص اللي جوه العنصر، و [[String()]] بيحوّل الرقم لنص.

بعد ضغطتين:

~~~text الناتج (jsdom)
<button id="b">+</button><span id="label">2</span>
~~~

شغال. بس لاحظ إن فيه **خطوتين**: تغيّر البيانات، وتفتكر تغيّر الشاشة. لو الرقم ده ظاهر في ٣ أماكن (العنوان، والسلة، والـ badge)، لازم تفتكر الـ ٣. ولو نسيت واحد، الشاشة بتعرض رقم غلط.

---

## ٢. بـ React

~~~text Counter.tsx
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
~~~

### [[const [count, setCount] = useState(0)]]

[[useState]] دالة من React (لازم [[import { useState } from 'react']] فوق) بترجّع array فيها حاجتين، و [[const [a, b] = ...]] ده array destructuring: بياخد أول عنصر في [[count]] والتاني في [[setCount]].

| الاسم | هو إيه |
|---|---|
| [[count]] | القيمة الحالية. أول مرة [[0]] لأننا بعتنا [[0]] |
| [[setCount]] | الدالة اللي بتغيّر القيمة وبتقول لـ React «ارسم تاني» |

(تفاصيل [[useState]] كلها في درسها في القسم الجاي.)

### [[return <button onClick={...}>{count}</button>]]

- [[onClick={() => setCount(count + 1)}]]: لما الزرار يتضغط، اطلب إن [[count]] تبقى القيمة + 1. مفيش ولا كلمة عن الـ DOM.
- [[{count}]]: اعرض القيمة جوه الزرار.

### الـ JSX ده بيبقى إيه؟

الـ component بيرجّع object بيوصف الشاشة، مش عنصر DOM. ده اللي طبعناه بـ [[console.log]] لنفس الزرار في Node:

~~~text الناتج (Node)
{
  '$$typeof': Symbol(react.transitional.element),
  type: 'button',
  key: null,
  ref: null,
  props: { onClick: [Function: onClick], children: 0 }
}
~~~

[[type]] اسم العنصر، و [[props]] فيها الـ [[onClick]] والمحتوى ([[children: 0]]). و [[$$typeof]] علامة React بتستخدمها عشان تتأكد إن الـ object ده عنصر React فعلًا. الـ objects دي هي اللي الناس بتسميها **virtual DOM**.

---

## ٣. اللي بيحصل مع كل ضغطة

1. الضغطة بتنادي [[setCount(1)]].
2. React بتحفظ القيمة الجديدة وتنادي [[Counter()]] **من الأول**. ده اسمه render.
3. المرة دي [[useState]] بترجّع [[1]]، فالـ JSX بقى [[<button>1</button>]].
4. React بتقارن الوصف الجديد بالقديم: نفس الزرار، النص بس اللي اتغير. فبتغيّر النص ده بس في الـ DOM.

والناتج الحقيقي في الصفحة بعد كل ضغطة:

~~~text الناتج (Chrome)
initial        <button>0</button>
after click 1  <button>1</button>
after click 2  <button>2</button>
after click 3  <button>3</button>
~~~

انت مكتبتش ولا سطر بيلمس الـ DOM. ولو الرقم ظاهر في ٣ أماكن، كلهم بيقروا من نفس [[count]]، فمستحيل يختلفوا. ده معنى [[UI = f(state)]]: الشاشة ([[UI]]) نتيجة دالة ([[f]]) في البيانات ([[state]]).

---

## الخلاصة

| | من غير React | بـ React |
|---|---|---|
| لما البيانات تتغير | بتغيّرها، وتعدّل الـ DOM بإيدك | بتغيّرها بـ [[setCount]] بس |
| مين بيعدّل الـ DOM | انت | React، بعد ما تقارن القديم بالجديد |
| لو الرقم في كذا مكان | لازم تفتكرهم كلهم | كلهم بيتحسبوا من نفس الـ state |
| الـ component | | دالة بتتنادى من الأول مع كل تغيير |`,
          lines: [
            "الطريقة القديمة: تسمع للضغطة بإيدك.",
            "تزوّد المتغير.",
            "وتفتكر تحدّث النص في الـ DOM بنفسك. لو نسيت في مكان، الشاشة بقت بتكدب.",
            "قفلة الـ listener.",
            "component: دالة اسمها بيبدأ بحرف كبير وبترجع شكل الشاشة.",
            "state اسمها count بتبدأ من 0، ومعاها setCount اللي بتغيّرها.",
            "الزرار بيعرض count، والضغطة بتغيّر الـ state بس. React هي اللي تحدّث الشاشة.",
            "قفلة الـ component."
          ],
          sol: R`الزرار يبدأ بـ [[0]] وكل ضغطة يزيد واحد. في React DevTools افتح تاب Components واختار [[Counter]]: تحت hooks هتلاقي [[State: 3]] مثلًا، والرقم بيتغير مع كل ضغطة في نفس اللحظة اللي الزرار بيتغير فيها. انت مكتبتش ولا سطر بيلمس الـ DOM: غيّرت الـ state بس، و React حسبت الشاشة من جديد.

لو الصفحة بيضا والـ console فيه [[useState is not defined]]، نسيت الـ import. ولو فيه «does not provide an export named 'default'»، نسيت [[export default]]، لأن [[main.tsx]] بيعمل [[import App from './App']].`,
          solCode: R`import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`
        },
        {
          cmd: "npm create vite",
          title: "ابدأ مشروع جديد وافهم ملفاته",
          desc: R`[[npm create vite@latest]] بيعملك مشروع React جاهز في ثواني: dev server سريع بيحدّث الصفحة وانت بتكتب، و build للإنتاج، و TypeScript لو اخترت [[react-ts]]. و Create React App اتوقف رسميًا من ٢٠٢٥، فمتبدأش بيه.

الملفات المهمة: [[index.html]] فيه [[<div id="root">]] فاضي، و [[src/main.tsx]] بيرسم App جواه، و [[src/App.tsx]] أول component. ولما المشروع يكبر قسّم [[src]] فولدرات حسب الدور.`,
          example: R`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
npm run build
npm run preview`,
          try: R`اعمل المشروع، وغيّر كلمة في [[App.tsx]] وانت الصفحة مفتوحة: هتتحدث من غير reload. بعدين [[npm run build]] وبص على فولدر [[dist]]: ملف HTML وملفات JS و CSS أساميها فيها hash.`,
          deep: {
            why: "React لوحدها مبتعرفش تقرا JSX ولا TypeScript، والمتصفح كمان. محتاج أداة تحوّل الكود وتشغّله وانت بتطوّر، وتجمّعه في ملفات صغيرة للإنتاج. Vite بيعمل الاتنين بأقل إعدادات.",
            how: R`في التطوير ([[npm run dev]]) Vite مبيجمّعش المشروع. بيقدّم كل ملف للمتصفح كـ ES module، ويحوّل TSX لـ JavaScript وقت ما المتصفح يطلبه، فبيقوم في أقل من ثانية حتى في مشروع كبير. ولما تحفظ ملف بيبعت التعديل ده بس (HMR)، و React Fast Refresh بيحافظ على الـ state، فالعداد مبيرجعش صفر.

في الـ build ([[npm run build]]) بيجمّع كل حاجة في [[dist]]: ملفات JS و CSS متصغّرة وفي اسمها hash، عشان المتصفح يكاشها للأبد ولما الكود يتغير الاسم يتغير. و [[npm run preview]] بيشغّل [[dist]] محليًا عشان تتأكد إن الـ build سليم، مش أكتر.

متغيرات البيئة: Vite بيعرض بس اللي اسمها بيبدأ بـ [[VITE_]] جوه [[import.meta.env]]، وبيحط قيمتها في ملفات JS نفسها. يعني أي حد يفتح الموقع يقدر يقراها.

وتقسيم شائع لـ [[src]]: [[components]] للقطع اللي بتتكرر، و [[pages]] للصفحات، و [[hooks]] للـ custom hooks، و [[lib]] للـ API client والدوال المساعدة، و [[stores]] لـ Zustand. ولما المشروع يكبر أكتر، قسّم حسب الـ feature: [[features/cart]] جواه components و hooks و api بتوعه. وأوامر npm نفسها بالتفصيل في تاب Node.`,
            when: "أي مشروع React بيشتغل في المتصفح بس (SPA): لوحة أدمن، أو dashboard، أو تطبيق جوه Electron أو Capacitor. لو محتاج SEO وصفحات بتترسم على السيرفر، Next.js أنسب (تاب Next.js).",
            mistakes: R`تحط secret في [[VITE_API_SECRET]] وتفتكر إنه مستخبي: هو جوه الـ JS اللي أي حد بينزّله. الأسرار مكانها السيرفر بس. وفي مشروع حقيقي كان الإنتاج شغال بـ [[vite preview --host 0.0.0.0]]، و Vite نفسه بيقول إن preview مش معمول لسيرفر إنتاج: اعمل build وقدّم [[dist]] بـ Nginx (تاب nginx) أو من Docker. وتنسى إن SPA محتاجة السيرفر يرجّع [[index.html]] لأي مسار، وإلا refresh على [[/products/5]] يطلع 404.`
          },
          teach: R`## الفكرة: ٦ أوامر، ٣ منهم مرة واحدة في عمر المشروع

أول ٣ أوامر بيعملوا المشروع وبينزّلوا اللي محتاجه، وآخر ٣ هتستخدمهم كل يوم. كله اتشغّل على ويندوز 11 بـ Node 24.19 و npm 11.17 في PowerShell، يوم ما اتكتب الدرس [[create-vite]] كان 9.2.1، و Vite 8.3.3، و React 19.2.8، و TypeScript 6.0.

---

## ١. [[npm create vite@latest my-app -- --template react-ts]]

### من جوه لبرة

| الحتة | معناها |
|---|---|
| [[npm create vite]] | [[npm create X]] اختصار لـ «نزّل باكدج اسمها [[create-X]] وشغّلها». يعني بيشغّل [[create-vite]] |
| [[@latest]] | آخر إصدار، مش نسخة قديمة متكيّشة عندك |
| [[my-app]] | اسم الفولدر اللي هيتعمل |
| [[--]] | «اللي بعدي مش لـ npm، عدّيه للأداة نفسها» |
| [[--template react-ts]] | قالب React + TypeScript. و [[react]] من غير [[-ts]] يبقى JavaScript |

~~~text الناتج
> npx
> create-vite my-app --template react-ts --no-interactive

◇  Scaffolding project in C:\Users\ali\...\my-app...
└  Done. Now run:

  cd my-app
  npm install
  npm run dev
~~~

[[Scaffolding]] يعني «ببني الهيكل»: نسخ ملفات القالب بس، من غير ما ينزّل حاجة. و [[npm create]] شغّل [[npx create-vite]] زي ما قلنا.

> في الترمنال العادي، [[create-vite]] ممكن يسألك أسئلة (القالب، وتنزّل وتشغّل دلوقتي ولا لأ). [[--template]] بيشيل سؤال القالب. والخيار [[--no-interactive]] بيمنع كل الأسئلة، وده اللي ضفناه هنا (عشان كده ظاهر في الناتج). و [[--help]] بيعرض كل القوالب: [[vanilla]] و [[vue]] و [[react]] و [[react-compiler]] و [[svelte]] وغيرهم.

### الملفات اللي اتعملت

~~~text my-app
README.md
index.html            الصفحة الوحيدة، فيها <div id="root"></div>
package.json          اسم المشروع والـ scripts والمكتبات
public/               ملفات بتتنسخ زي ما هي (favicon.svg)
src/main.tsx          نقطة البداية: بيرسم App جوه root
src/App.tsx           أول component
src/index.css         الـ CSS العام
tsconfig.json         إعدادات TypeScript (و tsconfig.app.json و tsconfig.node.json)
vite.config.ts        إعدادات Vite (درس vite.config)
~~~

وده [[src/main.tsx]] كله:

~~~text src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
~~~

- [[document.getElementById('root')]]: الـ div الفاضي اللي في [[index.html]]. و [[!]] في الآخر لـ TypeScript: «أنا متأكد إنه مش [[null]]».
- [[createRoot(...)]]: «React، الـ div ده بتاعك».
- [[.render(<App />)]]: ارسم App جواه.
- [[<StrictMode>]]: وضع بيعمل فحوصات زيادة وقت التطوير بس (هتشوف أثره في درس useEffect).

---

## ٢. [[cd my-app]] و [[npm install]]

[[cd]] بيدخلك الفولدر. و [[npm install]] (أو [[npm i]]) بيقرا [[package.json]] وينزّل كل اللي فيه في [[node_modules]]:

~~~text الناتج
added 27 packages, and audited 28 packages in 4s

9 packages are looking for funding
  run $__btnpm fund$__bt for details

found 0 vulnerabilities
~~~

٢٧ باكدج بس: React و React DOM و Vite و TypeScript واللي محتاجينه. و [[found 0 vulnerabilities]] يعني مفيش ثغرات معروفة. وبيعمل كمان [[package-lock.json]]: الإصدارات بالظبط اللي اتنزلت، عشان أي حد ينزّل نفس النسخ.

---

## ٣. [[npm run dev]]

[[npm run X]] بيشغّل الـ script اللي اسمه X في [[package.json]]. القالب فيه:

~~~text package.json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "oxlint",
  "preview": "vite preview"
}
~~~

يعني [[npm run dev]] = [[vite]]:

~~~text الناتج
  VITE v8.3.3  ready in 291 ms

  ➜  Local:   http://localhost:5791/
  ➜  Network: use --host to expose
~~~

إحنا شغّلناه بـ [[--port 5791]] عشان ميتخانقش مع برامج تانية على الجهاز، ومن غيره البورت الافتراضي [[5173]]. افتح اللينك. [[ready in 291 ms]] لأن Vite مش بيجمّع المشروع، بيحوّل كل ملف وقت ما المتصفح يطلبه. و [[use --host to expose]] يعني السيرفر شغال على جهازك بس، وموبايلك على نفس الشبكة مش هيشوفه إلا بـ [[--host]]. والترمنال بيفضل مشغول، و Ctrl+C بيقفله.

---

## ٤. [[npm run build]]

بيشغّل [[tsc -b && vite build]]: الأول [[tsc -b]] (TypeScript يفحص الأنواع، و [[-b]] اختصار build mode اللي بيقرا كل ملفات tsconfig)، و [[&&]] معناها «لو نجح كمّل»، وبعدين [[vite build]]:

~~~text الناتج
vite v8.3.3 building client environment for production...
✓ 20 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/react-CHdo91hT.svg    4.12 kB │ gzip:  2.06 kB
dist/assets/vite-BF8QNONU.svg     8.70 kB │ gzip:  1.60 kB
dist/assets/hero-CLDdwZDr.png    13.05 kB
dist/assets/index-D64VDMd1.css    4.10 kB │ gzip:  1.47 kB
dist/assets/index-BRDr3nmD.js   222.52 kB │ gzip: 69.27 kB
✓ built in 282ms
~~~

| الحاجة | معناها |
|---|---|
| [[20 modules transformed]] | ٢٠ ملف (كودك و React نفسها) اتحوّلوا |
| [[index-BRDr3nmD.js]] | كل الـ JavaScript في ملف واحد. [[BRDr3nmD]] ده الـ hash: بصمة من محتوى الملف |
| [[222.52 kB]] | حجمه بعد التصغير، ومعظمه React DOM نفسها |
| [[gzip: 69.27 kB]] | حجمه وهو بيتبعت مضغوط في الشبكة، وده اللي المستخدم بينزّله فعلًا |

لو [[tsc]] لقى غلطة أنواع، الـ build بيقف ومفيش [[dist]]. ده الفرق المهم عن [[npm run dev]] اللي مش بيفحص الأنواع.

---

## ٥. [[npm run preview]]

بيشغّل سيرفر صغير بيقدّم [[dist]] زي ما هي (افتراضيًا على 4173). جبنا الصفحة منه:

~~~text الناتج
<script type="module" crossorigin src="/assets/index-BRDr3nmD.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-D64VDMd1.css">
...
<div id="root"></div>
~~~

لاحظ إن Vite كتب أسامي الملفات بالـ hash بنفسه جوه [[index.html]]، وإن المسارات بتبدأ بـ [[/]]. عشان كده فتح [[dist/index.html]] بدبل كليك بيطلع صفحة بيضا: [[/assets/...]] من [[file://]] بتدوّر في أول الديسك مش جنب الملف.

---

## الخلاصة

| الأمر | إمتى | بيعمل إيه |
|---|---|---|
| [[npm create vite@latest my-app -- --template react-ts]] | مرة | ينسخ قالب المشروع |
| [[cd my-app]] | مرة | يدخل الفولدر |
| [[npm install]] | مرة (وبعد أي تغيير في المكتبات) | ينزّل [[node_modules]] |
| [[npm run dev]] | كل يوم | سيرفر تطوير بتحديث لحظي، من غير فحص أنواع |
| [[npm run build]] | قبل النشر | فحص أنواع ثم [[dist]] متصغّرة بأسامي فيها hash |
| [[npm run preview]] | بعد الـ build | يجرّب [[dist]] محليًا، مش سيرفر إنتاج |`,
          lines: [
            "اعمل مشروع اسمه my-app بقالب React + TypeScript. الـ [[--]] بتعدّي الخيارات لـ Vite نفسه.",
            "ادخل فولدر المشروع.",
            "نزّل الـ dependencies.",
            "شغّل dev server (عادةً على localhost:5173) بتحديث لحظي.",
            "اعمل build للإنتاج في فولدر dist.",
            "شغّل dist محليًا عشان تجرّبه قبل ما ترفعه."
          ],
          sol: R`أول ما تحفظ [[App.tsx]] الكلمة بتتغير في المتصفح من غير reload، ولو كان فيه عداد ضغطت عليه هتلاقي رقمه لسه زي ما هو: ده Fast Refresh، بيبدّل كود الـ component ويحافظ على الـ state.

بعد [[npm run build]] هتلاقي [[dist/index.html]]، وجوه [[dist/assets]] ملفات زي [[index-BRDr3nmD.js]] (حوالي 220kB، و 70kB بعد gzip في القالب الفاضي) و [[index-D64VDMd1.css]]، وجنبهم الصور اللي عملتلها import. الـ hash بيتغير بس لما محتوى الملف يتغير، فالمتصفح يقدر يكيّش الملف للأبد. والملفات اللي في [[public]] (زي [[favicon.svg]]) بتتنسخ زي ما هي من غير hash.

الغلطة المشهورة: تفتح [[dist/index.html]] بدبل كليك فتلاقي صفحة بيضا، لأن المسارات [[/assets/...]] مطلقة ومش هتشتغل من [[file://]]. اتفرج على الـ build بـ [[npm run preview]] (على 4173).`
        },
        {
          cmd: "vite.config",
          title: "ظبط Vite لمشروع حقيقي: proxy و aliases و env و base و حجم الـ bundle",
          desc: R`[[vite.config.ts]] هو المكان اللي بتظبط فيه كل حاجة Vite بيعملها. أول يوم في أي SPA بتكلم API منفصل هتحتاج خمس حاجات: [[server.proxy]] عشان [[/api]] يروح للـ backend من غير CORS وانت بتطوّر، و [[resolve.alias]] عشان تكتب [[@/lib/api]] بدل [[../../../lib/api]]، وملفات [[.env.development]] و [[.env.production]] (و [[--mode]] لأي بيئة تانية)، و [[base]] لو الموقع هيتقدّم من فولدر فرعي زي [[/admin/]]، و [[build.sourcemap]] مع تقسيم الـ chunks عشان تعرف مين تاقل الـ bundle.

الدالة [[defineConfig(({ mode }) => ...)]] بتاخد الـ mode، و [[loadEnv]] بيقرا ملفات الـ env جوه الـ config نفسه، لأن [[import.meta.env]] مش موجود هناك.`,
          example: R`import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE_PATH || '/',
    plugins: [
      react(),
      env.ANALYZE === '1' && (visualizer({ filename: 'stats.html', gzipSize: true }) as PluginOption),
      !!env.SENTRY_AUTH_TOKEN && sentryVitePlugin({ org: 'acme', project: 'shop-web', authToken: env.SENTRY_AUTH_TOKEN, sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] } }),
    ],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: { proxy: { '/api': { target: env.API_TARGET || 'http://localhost:4000', changeOrigin: true } } },
    build: {
      sourcemap: 'hidden',
      rolldownOptions: {
        output: { codeSplitting: { groups: [{ name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ }, { name: 'charts', test: /node_modules[\\/](recharts|d3-[a-z-]+)[\\/]/ }] } },
      },
    },
  }
})`,
          try: R`في مشروع الـ lab: شغّل أي API على بورت 4000 (أو [[node -e "require('http').createServer((q,r)=>r.end(q.url)).listen(4000)"]])، وحط الـ proxy، وافتح [[http://localhost:5173/api/products?page=2]]: المفروض الرد يبقى [[/api/products?page=2]] من الـ API. بعدين اعمل [[.env.production]] فيه [[VITE_API_URL=https://api.example.com]] و [[.env.staging]] فيه قيمة تانية، واعمل [[npm run build]] مرة و [[npx vite build --mode staging]] مرة، ودوّر على الـ URL جوه [[dist/assets/*.js]] بـ grep. وفي الآخر [[ANALYZE=1 npm run build]] وافتح [[stats.html]].`,
          flag: "script",
          deep: {
            why: R`الـ SPA بتشتغل على [[localhost:5173]] والـ API على [[localhost:4000]]. من غير proxy المتصفح بيعتبرهم origins مختلفة، فلازم تفتح CORS في الـ backend للتطوير بس، والـ cookies (httpOnly و SameSite) بتبقى وجع دماغ. ومع الوقت الـ imports بتبقى [[../../../]]، والـ build بيطلع ملف JS واحد ٢ ميجا ومحدش عارف ليه، والـ staging بيكلم API الإنتاج لأن حد نسي يغيّر URL. كل ده بيتحل في ملف واحد.`,
            how: R`الـ proxy: [[server.proxy]] شغال في [[npm run dev]] بس. أي طلب بيبدأ بـ [[/api]] سيرفر Vite بياخده ويبعته لـ [[target]] ويرجّع الرد، فالمتصفح شايف origin واحد. و [[changeOrigin: true]] بيغيّر header الـ [[Host]] لـ host الـ target (مهم لو الـ API ورا Nginx أو خدمة بتفرّق بالـ host). ولو الـ API مش بيبدأ مساراته بـ [[/api]]، [[rewrite: p => p.replace(/^\/api/, '')]]. وفي الإنتاج مفيش Vite خالص: Nginx هو اللي يعمل نفس الحركة ([[location /api/ { proxy_pass ... }]] في تاب nginx)، فالكود بيكلم [[/api]] في الحالتين.

الـ alias: [[resolve.alias]] بيعلّم Vite إن [[@]] معناها [[src]]، و TypeScript لازم يعرف نفس المعلومة في [[tsconfig.app.json]]: [[paths: { "@/*": ["./src/*"] }]] (من غير [[baseUrl]]: اتشال في TypeScript 7 وبيطلّع error TS5102)، وإلا المحرر هيقولك «Cannot find module». في Vite 8 فيه اختصار: [[resolve: { tsconfigPaths: true }]] بيقرا الـ paths من tsconfig نفسه، فمصدر الحقيقة يبقى واحد. و Vitest بيستخدم نفس الـ config فبيفهم الـ alias لوحده.

الـ env: الـ mode الافتراضي [[development]] مع [[vite]] و [[production]] مع [[vite build]]. Vite بيقرا بالترتيب [[.env]] ثم [[.env.local]] ثم [[.env.production]] (أو اسم الـ mode) ثم [[.env.production.local]]، والأخير بيكسب، والـ [[.local]] مكانها [[.gitignore]]. [[--mode staging]] بيقرا [[.env.staging]] بدل production، بس الـ build لسه build إنتاج (minify وكل حاجة). وجوه الكود [[import.meta.env.VITE_*]] بس، و [[import.meta.env.MODE]] و [[DEV]] و [[PROD]]. أما [[loadEnv(mode, cwd, '')]] بالـ prefix الفاضي فبيرجّع كل المتغيرات للـ config بس (زي [[API_TARGET]] و [[SENTRY_AUTH_TOKEN]])، ومبتدخلش الـ bundle.

الـ base: لو الموقع هيتقدّم على [[https://example.com/admin/]]، [[base: '/admin/']] بيخلي كل الـ assets في [[index.html]] تبدأ بـ [[/admin/assets/...]]. ومع React Router لازم [[basename: '/admin']] في [[createBrowserRouter]] كمان، و Nginx يرجّع [[/admin/index.html]] لأي مسار تحت [[/admin/]].

الـ bundle: Vite 8 بيبني بـ Rolldown. [[rolldownOptions.output.codeSplitting.groups]] بيحط مكتبات معينة في chunk لوحدها: React نادرًا ما بتتغير، فلو في chunk لوحدها المتصفح بيفضل مكاشها بعد كل deploy للكود بتاعك. و [[manualChunks]] بتاع Rollup لسه بيشتغل بس deprecated في Vite 8 (و [[build.rollupOptions]] بقت اسم قديم لـ [[rolldownOptions]]). و [[rollup-plugin-visualizer]] بيطلّع [[stats.html]] فيه treemap: كل مستطيل ملف، ومساحته حجمه، فتلاقي بسرعة إن [[moment]] بكل لغاته أو [[lodash]] كله داخل الـ bundle.

الـ source maps: [[sourcemap: true]] بيحط ملفات [[.map]] جنب الـ JS وتعليق في آخر كل ملف بيشاور عليها، فأي حد يفتح DevTools يشوف الكود الأصلي بالتعليقات. [[sourcemap: 'hidden']] بيطلّع الـ maps من غير التعليق. و Sentry plugin بيرفعها لـ Sentry وقت الـ build، و [[filesToDeleteAfterUpload]] بيمسحها من [[dist]] قبل النشر. النتيجة: الأخطاء في Sentry بتظهر بأسماء ملفاتك وسطورك، والمستخدم مبيوصلش للكود.`,
            when: R`من أول يوم في أي SPA ليها backend منفصل. والـ base لما الفرونت يتنشر تحت مسار (لوحة أدمن على [[/admin]]، أو GitHub Pages على [[/repo-name/]]). والـ visualizer لما الـ build يطلع warning إن chunk أكبر من 500kB، أو قبل ما تضيف مكتبة تقيلة. والـ source maps المخفية لما يكون عندك error tracking (Sentry أو غيره).`,
            mistakes: R`تفتكر إن الـ proxy شغال في الإنتاج: [[vite build]] بيطلّع ملفات static، والـ proxy كان في dev server بس، فالـ [[/api]] يرجع 404 أو [[index.html]]. وتحط الـ API الحقيقي في [[VITE_API_URL]] وتفتكره سر: أي [[VITE_]] بيتكتب جوه الـ JS. وتعمل alias في Vite وتنسى tsconfig (أو العكس)، فالمحرر أو الـ build بيشتكي. و [[--mode analyze]] عشان تحلل الـ bundle: كده [[.env.production]] مبيتقريش والـ build بيطلع بقيم فاضية، والأسلم متغير زي [[ANALYZE=1]] زي المثال. و [[sourcemap: true]] في الإنتاج «عشان نعرف نعمل debug»: الكود كله بقى مكشوف. ومن غير [[base]] الموقع على [[/admin/]] بيفتح صفحة بيضا، لأن [[/assets/index.js]] بيرجع 404. وسؤال انترفيو: «ليه CORS error في الإنتاج بس؟» لأن في التطوير الـ proxy كان مخبّي إن الـ origins مختلفة.`
          },
          teach: R`## الفكرة: ملف واحد بيرجّع object إعدادات

[[vite.config.ts]] ملف TypeScript عادي، بيعمل [[export default]] لـ object إعدادات Vite بيقراه وهو بيشتغل. المثال بيظبط ٦ حاجات: الـ base، والـ plugins، والـ alias، والـ proxy، والـ source maps، وتقسيم الـ bundle. هنمشي عليه من فوق لتحت. كله اتجرّب في مشروع [[react-ts]] جديد على ويندوز 11 (Node 24.19، و Vite 8.3.3، و TypeScript 6.0.3)، بعد [[npm i -D rollup-plugin-visualizer @sentry/vite-plugin]].

---

## ١. الـ imports

~~~text vite.config.ts
import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'
~~~

| الاسم | جاي منين | شغلته |
|---|---|---|
| [[defineConfig]] | [[vite]] | بيرجّع اللي تديهوله زي ما هو. فايدته الوحيدة إن المحرر يعرف أنواع الإعدادات ويكمّلك |
| [[loadEnv]] | [[vite]] | يقرا ملفات [[.env*]] |
| [[type PluginOption]] | [[vite]] | نوع (type) بس، و [[type]] قدامه معناها إنه بيتشال من الـ JavaScript النهائي |
| [[react]] | [[@vitejs/plugin-react]] | الـ plugin اللي بيحوّل JSX ويشغّل Fast Refresh |
| [[fileURLToPath]] و [[URL]] | [[node:url]] | أدوات Node. [[node:]] معناها «موديول جاي مع Node نفسه» |
| [[visualizer]] | [[rollup-plugin-visualizer]] | بيرسم حجم كل ملف في الـ bundle |
| [[sentryVitePlugin]] | [[@sentry/vite-plugin]] | بيرفع الـ source maps لـ Sentry |

---

## ٢. [[defineConfig(({ mode }) => { ... })]]

~~~text vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { ... }
})
~~~

بدل ما نبعت object على طول، بنبعت **دالة**. Vite بيناديها ويديها object فيه [[mode]]، و [[({ mode })]] بتاخد الخانة دي بالـ destructuring.

| الأمر | [[mode]] |
|---|---|
| [[npm run dev]] (يعني [[vite]]) | [[development]] |
| [[npm run build]] (يعني [[vite build]]) | [[production]] |
| [[vite build --mode staging]] | [[staging]] |

### [[loadEnv(mode, process.cwd(), '')]]

- [[mode]]: عشان يقرا [[.env]] و [[.env.<mode>]] (والـ [[.local]] بتوعهم).
- [[process.cwd()]]: الفولدر اللي فيه ملفات الـ env (cwd = current working directory، الفولدر اللي انت شغّال منه).
- [['']] (string فاضي): الـ prefix. لو كتبت [[VITE_]] هيرجّع اللي بيبدأ بيها بس. الفاضية معناها «كله»، فيرجّع كمان [[API_TARGET]] و [[SENTRY_AUTH_TOKEN]] و [[ANALYZE]]، ومعاهم متغيرات بيئة الجهاز نفسه.

ليه مش [[import.meta.env]]؟ لأن ده بيتعمل للكود اللي جوه [[src]] بس، والـ config بيشتغل في Node قبله.

---

## ٣. [[base]]

~~~text vite.config.ts
base: env.BASE_PATH || '/',
~~~

[[||]] معناها «لو اللي على الشمال فاضي، خد اللي على اليمين». فلو مفيش [[BASE_PATH]]، الموقع على [[/]]. ولو [[BASE_PATH=/admin/]]، كل المسارات في [[index.html]] بتبقى [[/admin/assets/...]].

---

## ٤. [[plugins]]

~~~text vite.config.ts
plugins: [
  react(),
  env.ANALYZE === '1' && (visualizer({ filename: 'stats.html', gzipSize: true }) as PluginOption),
  !!env.SENTRY_AUTH_TOKEN && sentryVitePlugin({ ... }),
],
~~~

- [[react()]]: دايمًا.
- [[cond && plugin]]: لو الشرط [[false]] العنصر بيبقى [[false]]، و Vite بيتجاهل أي [[false]] في الـ plugins. كده الـ plugin بيشتغل بس لما تطلبه.
- [[env.ANALYZE === '1']]: [[===]] مقارنة صارمة، و القيمة [['1']] string لأن متغيرات البيئة دايمًا نصوص.
- [[as PluginOption]]: «اعتبر ده من نوع PluginOption». بنحطها عشان نوع الـ visualizer مختلف شوية عن نوع Vite.
- [[!!env.SENTRY_AUTH_TOKEN]]: [[!]] بتقلب لـ boolean معكوس، والتانية بترجّعه. النتيجة [[true]] لو فيه توكن، و [[false]] لو [[undefined]] أو فاضي. التوكن بيبقى موجود في CI بس.
- [[filesToDeleteAfterUpload: ['./dist/**/*.map']]]: بعد الرفع امسح كل ملفات [[.map]] من [[dist]]. و [[**]] يعني «أي عدد فولدرات».

---

## ٥. [[resolve.alias]]

~~~text vite.config.ts
resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
~~~

من جوه لبرة:

1. [[import.meta.url]]: عنوان ملف الـ config نفسه، شكله [[file:///C:/.../my-app/vite.config.ts]].
2. [[new URL('./src', ...)]]: [[./src]] بالنسبة للعنوان ده، يعني [[file:///C:/.../my-app/src]].
3. [[fileURLToPath(...)]]: يحوّله لمسار عادي [[C:\...\my-app\src]].
4. [['@': ...]]: أي import بيبدأ بـ [[@]] يتبدّل بالمسار ده.

ولازم TypeScript يعرف نفس الكلام، فضفنا في [[tsconfig.app.json]] جوه [[compilerOptions]]:

~~~text tsconfig.app.json
"paths": { "@/*": ["./src/*"] },
~~~

وبعدها [[import { API_URL } from '@/lib/api']] اشتغل في [[tsc]] وفي Vite. وعن [[baseUrl]] اللي هتلاقيه في مقالات قديمة جنب [[paths]]، جرّبناه:

~~~text tsc 6.0.3 (اللي جاي مع القالب)
error TS5101: Option 'baseUrl' is deprecated and will stop functioning in TypeScript 7.0.
~~~

~~~text tsc 7.0.2
error TS5102: Option 'baseUrl' has been removed. Please remove it from your configuration.
~~~

يعني [[paths]] لوحدها. وفي Vite 8 بديل أقصر للـ alias كله: [[resolve: { tsconfigPaths: true }]]، جرّبناه مكان السطر ده والـ build عدّى، لأنه بيقرا [[paths]] من tsconfig.

---

## ٦. [[server.proxy]]

~~~text vite.config.ts
server: { proxy: { '/api': { target: env.API_TARGET || 'http://localhost:4000', changeOrigin: true } } },
~~~

- [[server]]: إعدادات [[npm run dev]] بس.
- [['/api']]: أي طلب مساره بيبدأ بـ [[/api]].
- [[target]]: ابعته للسيرفر ده ورجّع رده.
- [[changeOrigin: true]]: غيّر header الـ [[Host]] لـ host الـ target.

جرّبناه بسيرفر Node بيرجّع المسار والـ Host اللي وصلوله، على بورت 4791 بدل 4000 عشان ميتخانقش مع حاجة على الجهاز، وبعتنا [[API_TARGET=http://localhost:4791]]. وطلبنا من Vite (مش من الـ API):

~~~text الناتج
GET http://localhost:5793/api/products?page=2
/api/products?page=2 host=localhost:4791
~~~

الطلب راح لبورت Vite، ورجع رد الـ API نفسه، و [[host]] بقى بتاع الـ API بسبب [[changeOrigin]]. والمتصفح شايف origin واحد، فمفيش CORS.

---

## ٧. [[build]]

~~~text vite.config.ts
build: {
  sourcemap: 'hidden',
  rolldownOptions: {
    output: { codeSplitting: { groups: [
      { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
      { name: 'charts', test: /node_modules[\\/](recharts|d3-[a-z-]+)[\\/]/ },
    ] } },
  },
},
~~~

(في المثال كله سطر واحد، وقسمناه هنا عشان يتقري.)

### [[sourcemap: 'hidden']]

ملفات [[.map]] بتربط الكود المتصغّر بكودك الأصلي. [[hidden]] بيعملها من غير ما يكتب في آخر الـ JS سطر بيشاور عليها. قارنّا بـ [[sourcemap: true]]:

~~~text grep -c sourceMappingURL dist/assets/*.js
'hidden':  index-VyEluEqv.js:0   react-EV4rRv3L.js:0
true:      index-VyEluEqv.js:1   react-EV4rRv3L.js:1
~~~

ومع [[true]] آخر الملف بقى [[//# sourceMappingURL=index-VyEluEqv.js.map]]، وده اللي بيخلي DevTools عند أي زاير ينزّل الكود الأصلي.

### الـ regex في [[test]]

[[/node_modules[\\/](react|react-dom|scheduler)[\\/]/]]:

- [[/ ... /]]: regex في JavaScript.
- [[node_modules]]: النص ده حرفيًا.
- [[[\\/]]]: حرف واحد، يا [[\]] (ويندوز) يا [[/]] (لينكس والماك). الـ [[\\]] هي [[\]] واحدة متعملها escape.
- [[(react|react-dom|scheduler)]]: واحدة من التلاتة، والخط الرأسي معناه «أو».

و [[d3-[a-z-]+]] يعني [[d3-]] وبعدها حرف صغير أو [[-]] مرة أو أكتر ([[+]])، زي [[d3-scale]] و [[d3-shape]].

### الناتج

~~~text npm run build
dist/index.html                   0.53 kB │ gzip:  0.32 kB
dist/assets/index-D64VDMd1.css    4.10 kB │ gzip:  1.47 kB
dist/assets/index-VyEluEqv.js     3.81 kB │ gzip:  1.22 kB │ map:    11.01 kB
dist/assets/react-EV4rRv3L.js   218.84 kB │ gzip: 68.24 kB │ map: 1,044.05 kB
~~~

قبل الإعداد ده كان فيه ملف واحد [[index-BRDr3nmD.js]] بـ 222.52 kB. دلوقتي React لوحدها في [[react-*.js]] (218.84 kB)، وكودك في [[index-*.js]] (3.81 kB بس). لما تعدّل كودك وتنشر، الـ hash بتاع [[index]] بس اللي بيتغير، والمتصفح بيفضل مكيّش ملف React. والـ [[charts]] مطلعش لأن المشروع مفيهوش recharts.

---

## ٨. ملفات الـ env والـ modes

~~~text .env.production
VITE_API_URL=https://api.example.com
~~~

~~~text .env.staging
VITE_API_URL=https://staging-api.example.com
~~~

وفي [[src/lib/api.ts]]: [[export const API_URL = import.meta.env.VITE_API_URL]]. ودوّرنا في الـ JS بعد كل build:

~~~text الناتج
npm run build                    →  https://api.example.com
npx vite build --mode staging    →  https://staging-api.example.com
~~~

القيمة اتكتبت **جوه ملف الـ JS نفسه**، فأي حد بيفتح الموقع يقدر يقراها. و [[API_TARGET]] و [[SENTRY_AUTH_TOKEN]] مش هتلاقيهم، لأنهم من غير [[VITE_]] ومحدش استخدمهم في [[src]].

### [[ANALYZE=1 npm run build]]

[[ANALYZE=1]] قبل الأمر بيحط متغير بيئة للأمر ده بس (في bash و zsh. في PowerShell: [[$env:ANALYZE='1'; npm run build]]). طلع [[stats.html]] (حوالي 180 kB)، افتحه في المتصفح تلاقي treemap: مستطيل لكل ملف، ومساحته حجمه.

---

## الخلاصة

| الإعداد | بيشتغل في | بيحل إيه |
|---|---|---|
| [[base]] | build | موقع تحت مسار فرعي زي [[/admin/]] |
| [[plugins]] بـ [[&&]] | الاتنين | plugins بتشتغل بس لما تطلبها |
| [[resolve.alias]] + [[paths]] | الاتنين + tsconfig | [[@/lib/api]] بدل [[../../../lib/api]] |
| [[server.proxy]] | dev بس | [[/api]] يروح للـ backend من غير CORS |
| [[sourcemap: 'hidden']] | build | maps لـ Sentry من غير ما المتصفح يطلبها |
| [[codeSplitting.groups]] | build | React في ملف لوحدها يفضل مكيّش |
| [[loadEnv(mode, cwd, '')]] | الـ config | يقرا كل المتغيرات، ومبيدخلش الـ bundle إلا [[VITE_]] |`,
          lines: [
            "defineConfig للأنواع، و loadEnv يقرا ملفات الـ env جوه الـ config.",
            "plugin الـ React: JSX و Fast Refresh.",
            "أدوات Node عشان نحوّل مسار src لمسار كامل.",
            "plugin بيرسم حجم كل ملف في الـ bundle.",
            "plugin بيرفع الـ source maps لـ Sentry.",
            "الـ config دالة بتاخد الـ mode (development أو production أو اللي بعته بـ --mode).",
            "كل متغيرات البيئة للـ config بس. الـ prefix الفاضي معناه كله، مش VITE_ بس.",
            "بداية الإعدادات.",
            "المسار اللي الموقع هيتقدّم منه. / افتراضيًا، أو /admin/ مثلًا.",
            "الـ plugins:",
            "React.",
            "الـ visualizer بس لما تشغّل ANALYZE=1. القيمة false بتتجاهل.",
            "Sentry بس لو فيه توكن (في CI): يرفع الـ maps ويمسحها من dist بعدها.",
            "قفلة الـ plugins.",
            "@ معناها src. ولازم نفس الكلام في paths بتاعة tsconfig.",
            "في التطوير: أي طلب بيبدأ بـ /api يروح للـ backend، و Host يتغير للـ target.",
            "إعدادات الـ build:",
            "maps من غير تعليق في آخر الملف، فالمتصفح مبيطلبهاش.",
            "إعدادات Rolldown (اسمها rollupOptions في Vite القديم):",
            "React في chunk لوحدها، والـ charts في chunk لوحدها. regex بـ [[\\/]] عشان ويندوز.",
            "قفلة rolldownOptions.",
            "قفلة build.",
            "قفلة الإعدادات.",
            "قفلة defineConfig."
          ],
          sol: R`الـ proxy صح لو الرد جه من الـ API نفسه ([[/api/products?page=2]]) مش صفحة Vite. لو شفت [[index.html]]، يا إما الـ backend مش شغال على 4000، يا إما المسار في [[proxy]] مش بيطابق.

الـ grep المفروض يلاقي [[https://api.example.com]] في build الإنتاج، وقيمة [[.env.staging]] في build الـ staging، ومش هيلاقي [[SENTRY_AUTH_TOKEN]] ولا [[API_TARGET]] في أي ملف، لأنهم مش بادئين بـ [[VITE_]].

[[stats.html]] بيفتح treemap: المستطيل الكبير غالبًا [[react-dom]]. وملفات [[dist/assets]] هتلاقي فيها [[react-*.js]] لوحده. ولو [[sourcemap: 'hidden']]، هتلاقي ملفات [[.map]] بس آخر ملف الـ JS مفيهوش [[sourceMappingURL]].

لو الـ build وقع بـ «This package is ESM only»، الـ [[package.json]] ناقصه [[type: module]] (قالب Vite بيحطها لوحده).`,
          solCode: R`# .env.production
VITE_API_URL=https://api.example.com
# .env.staging
VITE_API_URL=https://staging-api.example.com

npm run build && grep -o 'https://[a-z.-]*example.com' dist/assets/*.js
npx vite build --mode staging && grep -o 'https://[a-z.-]*example.com' dist/assets/*.js
grep -c sourceMappingURL dist/assets/*.js
ANALYZE=1 npm run build && ls stats.html`
        },
        {
          cmd: "JSX",
          title: "قواعد كتابة الـ HTML جوه JavaScript",
          desc: R`JSX شكله HTML بس هو JavaScript: كل tag بيتحول لنداء دالة بيرجع object. عشان كده ليه قواعد: [[className]] بدل [[class]]، و [[htmlFor]] بدل [[for]]، والـ attributes بالـ camelCase زي [[onClick]]، وكل tag لازم يتقفل حتى [[<img />]].

أي JavaScript بتحطه بين [[{ }]]: متغير، أو حساب، أو نداء دالة. بس لازم يبقى expression، فـ [[if]] و [[for]] مينفعوش جوه، وبتستخدم ternary و [[map]] بدالهم. والـ component بيرجّع عنصر واحد من برا، ولو عايز أكتر لفّهم في Fragment [[<>...</>]].`,
          example: R`type User = { name: string; avatar: string; isAdmin: boolean }
function Profile({ user }: { user: User }) {
  const initials = user.name.slice(0, 2).toUpperCase()
  return (
    <>
      <img src={user.avatar} alt={user.name} className="avatar" />
      <label htmlFor="bio">Bio</label>
      <textarea id="bio" defaultValue="" />
      <p style={{ color: 'gray', fontSize: 14 }}>{initials}</p>
      {user.isAdmin ? <span>Admin</span> : null}
    </>
  )
}`,
          try: R`غيّر [[className]] لـ [[class]] وشوف الـ warning في الـ console. وبعدين اكتب [[{user}]] بدل [[{initials}]] جوه الـ [[<p>]] واقرا الـ error: «Objects are not valid as a React child».`,
          flag: "script",
          deep: {
            why: "بدل ما تكتب الـ HTML في ملف والمنطق في ملف تاني وتربطهم بـ ids، JSX بيخلي شكل الـ component ومنطقه في مكان واحد، و TypeScript بيفحص الاتنين مع بعض: prop غلط أو متغير مش موجود بيطلع error وانت بتكتب.",
            how: R`Vite بيحوّل كل tag لنداء دالة: [[<img src={a} />]] بتبقى [[jsx('img', { src: a })]] من [[react/jsx-runtime]]، عشان كده مش محتاج [[import React]] في كل ملف. النتيجة object عادي فيه [[type]] و [[props]].

ليه [[className]]؟ لأن [[class]] كلمة محجوزة في JavaScript، واسم الخاصية في الـ DOM نفسه [[className]]. ونفس الكلام لـ [[htmlFor]]. و [[style]] بياخد object مش string، والأسماء camelCase، والأرقام بتبقى px لوحدها.

الحرف الأول بيفرق: [[<button>]] عنصر HTML، و [[<Button>]] component بتاعك. عشان كده اسم الـ component لازم يبدأ بحرف كبير.

وجوه [[{ }]]: النصوص والأرقام بتظهر، و [[null]] و [[undefined]] و [[false]] و [[true]] مبيظهروش، والـ array بتتعرض عناصرها ورا بعض. وأي نص بيتعمله escape لوحده، فلو المستخدم كتب [[<script>]] هيظهر كنص ومش هيشتغل. الاستثناء الوحيد [[dangerouslySetInnerHTML]] (درس dangerouslySetInnerHTML في المستوى التالت).`,
            when: "في كل component. والتعليق جوه JSX بيتكتب [[{/* كده */}]] لأن [[//]] هيظهر كنص.",
            mistakes: R`ترجّع عنصرين جنب بعض من غير Fragment ("Adjacent JSX elements must be wrapped"). وتعرض object مباشرة [[{user}]] بدل خاصية منه. وتنسى تقفل [[<input>]] أو [[<br>]]. وتكتب [[if]] جوه [[{ }]]، والصح ternary أو تحسب القيمة قبل الـ return في متغير.`
          },
          teach: R`## الفكرة: كل سطر في المثال قاعدة من قواعد JSX

[[Profile]] component بياخد بيانات مستخدم ويعرض صورته وخانة Bio والحرفين الأولانيين من اسمه، وكلمة Admin لو هو أدمن. كل سطر فيه بيوريك قاعدة. عشان نشوف الناتج ضفنا [[App]] بيبعت [[{ name: 'sara', avatar: '/sara.png', isAdmin: true }]]، واتشغّل في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. نوع البيانات

~~~text Profile.tsx
type User = { name: string; avatar: string; isAdmin: boolean }
function Profile({ user }: { user: User }) {
~~~

- [[type User = {...}]]: TypeScript بس، بيوصف شكل الـ object: [[name]] نص، و [[avatar]] نص (لينك الصورة)، و [[isAdmin]] boolean ([[true]] أو [[false]]).
- [[({ user }: { user: User })]]: الـ component بياخد object واحد (الـ props)، و [[{ user }]] بتطلّع منه خانة [[user]]. والجزء بعد [[:]] نوع الـ props. التفاصيل في درس props.

## ٢. JavaScript عادي قبل الـ return

~~~text Profile.tsx
const initials = user.name.slice(0, 2).toUpperCase()
~~~

[[slice(0, 2)]] بتاخد الحروف من 0 لحد قبل 2، يعني أول حرفين: [[sa]]. و [[toUpperCase()]] بتكبّرهم: [[SA]]. أي حساب معقد مكانه هنا، مش جوه الـ JSX.

---

## ٣. الـ JSX سطر سطر

### [[<>]] و [[</>]]: الـ Fragment

الـ component لازم يرجّع **عنصر واحد** من برا، لأن الـ JSX بيتحوّل لنداء دالة واحد، والدالة مبترجّعش قيمتين. الـ Fragment بيلم العناصر من غير ما يضيف [[<div>]] زيادة للصفحة.

### [[<img src={user.avatar} alt={user.name} className="avatar" />]]

- [[src={user.avatar}]]: قيمة JavaScript بين [[{ }]]. من غير أقواس هيبقى النص [[user.avatar]] حرفيًا.
- [[className="avatar"]]: نص ثابت بين علامات تنصيص. و [[className]] بدل [[class]] لأن [[class]] كلمة محجوزة في JavaScript (بتعمل classes).
- [[/>]]: [[<img>]] في HTML مالهاش قفلة، لكن في JSX لازم أي tag يتقفل.

### [[<label htmlFor="bio">Bio</label>]]

نفس الحكاية: [[for]] محجوزة (الـ for loop)، فبقت [[htmlFor]]. بتربط الـ label بالعنصر اللي [[id]] بتاعه [[bio]]، فلو ضغطت على كلمة Bio المؤشر يروح للخانة.

### [[<textarea id="bio" defaultValue="" />]]

[[defaultValue]]: قيمة أولى والمتصفح يمسك الباقي. (الفرق بينه وبين [[value]] في درس controlled input.)

### [[<p style={{ color: 'gray', fontSize: 14 }}>{initials}</p>]]

الـ [[{{ }}]] مش رمز جديد، هما حاجتين:

- القوس الخارجي [[{ }]]: «هنا JavaScript».
- القوس الداخلي [[{ color: 'gray', fontSize: 14 }]]: object عادي.

والأسماء camelCase: [[fontSize]] بدل [[font-size]] (الشرطة مينفعش تبقى في اسم خاصية من غير علامات تنصيص). والرقم [[14]] React بتزوّد عليه [[px]] لوحدها.

### [[{user.isAdmin ? <span>Admin</span> : null}]]

مفيش [[if]] جوه [[{ }]]، لأن [[{ }]] بتاخد **expression** (حاجة ليها قيمة)، و [[if]] statement. فبنستخدم الـ ternary: [[شرط ? لو صح : لو غلط]]. و [[null]] معناها «متعرضش حاجة».

---

## ٤. الـ JSX ده بقى إيه؟

ده الـ [[return]] بعد التحويل (بـ TypeScript، نفس إعداد Vite):

~~~text الناتج بعد التحويل
_jsxs(_Fragment, { children: [
  _jsx("img", { src: user.avatar, alt: user.name, className: "avatar" }),
  _jsx("label", { htmlFor: "bio", children: "Bio" }),
  _jsx("textarea", { id: "bio", defaultValue: "" }),
  _jsx("p", { style: { color: 'gray', fontSize: 14 }, children: initials }),
  user.isAdmin ? _jsx("span", { children: "Admin" }) : null
] })
~~~

(الناتج الحقيقي سطر واحد، وقسمناه.) لاحظ:

- كل attribute بقى خانة في object. عشان كده اسمها لازم يبقى اسم خاصية JavaScript صالح.
- اللي بين الفتحة والقفلة بقى [[children]].
- الـ ternary فضل زي ما هو، لأنه أصلًا JavaScript. ولو حاولت تحط [[if]] مكانه هيبقى [[children: [if (...) ...]]] وده كود مش صالح.

---

## ٥. اللي ظهر في الصفحة

~~~text الناتج (Chrome)
<img alt="sara" class="avatar" src="/sara.png">
<label for="bio">Bio</label>
<textarea id="bio"></textarea>
<p style="color: gray; font-size: 14px;">SA</p>
<span>Admin</span>
~~~

(قسمناه سطور عشان يتقري.) React رجّعت [[className]] لـ [[class]]، و [[htmlFor]] لـ [[for]]، و [[fontSize: 14]] لـ [[font-size: 14px]]. ومفيش أي عنصر زيادة حوالين الكل: الـ Fragment مبيظهرش. ولما بعتنا [[isAdmin: false]] الـ [[<span>]] اختفى خالص، مفيش حتى عنصر فاضي.

---

## ٦. التجارب اللي في «جرّب»

### [[class]] بدل [[className]]

~~~text الـ Console
Invalid DOM property $__btclass$__bt. Did you mean $__btclassName$__bt?
~~~

الصفحة نفسها طلعت زي ما هي (React 19 حطت [[class="avatar"]] برضه)، بس [[tsc]] رفضه:

~~~text tsc
Property 'class' does not exist on type 'DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>'. Did you mean 'className'?
~~~

يعني [[npm run dev]] شغال و [[npm run build]] هيقع.

### [[{user}]] بدل [[{initials}]]

الصفحة بقت فاضية خالص، والـ Console:

~~~text الـ Console
Objects are not valid as a React child (found: object with keys {name, avatar, isAdmin}). If you meant to render a collection of children, use an array instead.
~~~

React بتعرف ترسم نص ورقم وعناصر و arrays منهم، لكن object عادي مش عارفة تحوّله لإيه. والـ error ده وقّع الشجرة كلها، مش الـ [[<p>]] بس. و [[tsc]] كان مسكه: [[Type 'User' is not assignable to type 'ReactNode']]، و [[ReactNode]] هو نوع «أي حاجة React تعرف ترسمها».

---

## الخلاصة

| HTML | JSX | ليه |
|---|---|---|
| [[class]] | [[className]] | [[class]] كلمة محجوزة |
| [[for]] | [[htmlFor]] | [[for]] كلمة محجوزة |
| [[style="font-size: 14px"]] | [[style={{ fontSize: 14 }}]] | object، camelCase، والرقم px |
| [[<img>]] | [[<img />]] | أي tag لازم يتقفل |
| أكتر من عنصر | [[<>...</>]] | الـ return قيمة واحدة |
| [[if]] | [[? :]] أو متغير قبل الـ return | [[{ }]] بتاخد expression بس |`,
          lines: [
            "شكل بيانات المستخدم بـ TypeScript.",
            "component بياخد user في الـ props.",
            "حساب عادي قبل الـ return. أي JavaScript ينفع هنا.",
            "الـ JSX بين قوسين عشان يبقى على كذا سطر.",
            "Fragment: يلم أكتر من عنصر من غير div زيادة.",
            "القيم بين { }، و [[className]] بدل class، و tag مقفول بـ /.",
            "[[htmlFor]] بدل for عشان يربط الـ label بالـ input.",
            "[[defaultValue]]: قيمة أولى والمتصفح يمسك الباقي (المستوى التاني).",
            "style بياخد object: القوس الأول لـ JavaScript والتاني للـ object، و 14 بتبقى 14px.",
            "مفيش if جوه JSX، فبتستخدم ternary. و null مبتظهرش حاجة.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`أول تجربة: المحرر هيعلّم على [[class]] بـ «Property 'class' does not exist... Did you mean 'className'?»، بس Vite مبيعملش type check فالصفحة بتشتغل، وفي الـ console هتلاقي warning من React: «Invalid DOM property $__btclass$__bt. Did you mean $__btclassName$__bt?». يعني شغالة بالصدفة، والـ build ([[tsc -b]]) هيقع.

تاني تجربة: الصفحة بتبقى بيضا وفي الـ console: «Objects are not valid as a React child (found: object with keys {name, avatar, isAdmin})». React بترسم نصوص وأرقام و elements و arrays منهم، لكن object عادي متعرفش ترسمه إزاي. الحل إنك تختار الحقل اللي عايزه: [[{user.name}]]. ولو شفت نفس الـ error مع [[Date]] أو Promise، نفس السبب: حوّلها لنص الأول.`
        },
        {
          cmd: "props",
          title: "ابعت بيانات من component لـ component",
          desc: R`الـ props هي مدخلات الـ component، زي arguments الدالة: الأب بيبعتها كـ attributes، والابن بيستلمها في object واحد وبيعمله destructuring.

الـ props للقراية بس، والابن ميعدّلش فيها أبدًا. لو محتاج قيمة تتغير، دي state (عند الابن أو عند الأب)، وده الفرق الأساسي بينهم. والقيم الافتراضية بتتكتب في الـ destructuring نفسه.`,
          example: R`type ButtonProps = {
  label: string
  variant?: 'primary' | 'ghost'
  onClick: () => void
}
function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return <button className={$__btbtn btn-$__{variant}$__bt} onClick={onClick}>{label}</button>
}
export default function App() {
  return <Button label="Save" onClick={() => alert('saved')} />
}`,
          try: R`استخدم Button تلات مرات بـ labels مختلفة وواحد منهم [[variant="ghost"]]. بعدين جرّب تكتب [[variant="red"]] وشوف TypeScript بيقولك إيه.`,
          flag: "script",
          deep: {
            why: "نفس الزرار بيظهر في عشرين مكان بكلام وتصرف مختلف. بدل ما تنسخه عشرين مرة، بتعمله مرة واحدة والفرق يجي من الـ props. والبيانات بتنزل في اتجاه واحد (من الأب للابن)، فلما قيمة تطلع غلط بتعرف تدوّر عليها فين.",
            how: R`[[<Button label="Save" onClick={fn} />]] بيتحوّل لـ object فيه [[props: { label: 'Save', onClick: fn }]]، و React بتنادي [[Button(props)]] وقت الرسم. النص بيتكتب بين علامات تنصيص، وأي حاجة تانية (رقم، أو دالة، أو object) بين [[{ }]]. و [[<Button disabled />]] من غير قيمة معناها [[disabled={true}]].

لما الأب يعمل render، كل أولاده بيعملوا render تاني ويستلموا props جديدة، حتى لو القيم نفسها. ده عادي ورخيص غالبًا، وفيه طرق تمنعه لو لزم (المستوى التالت: درس «إمتى بيعيد الرسم» ودرس React.memo).

في وضع التطوير React بتعمل freeze للـ props object، فلو حاولت [[props.label = 'x']] هيرمي error. ده مقصود: الـ component لازم يعامل الـ props كقيمة ثابتة.

و [[{...rest}]] بتعدّي كل الـ props الباقية لعنصر جوه، مفيد في component بيلف [[<input>]] وعايز يسيب الأب يبعت أي attribute.`,
            when: "أي بيانات الـ component محتاجها ومش هو صاحبها: النص، والبيانات اللي هيعرضها، والدوال اللي هينادي عليها لما حاجة تحصل (callbacks).",
            mistakes: R`تعدّل prop جوه الابن. وتنسخ prop في state ([[useState(props.value)]]) وتستغرب إن القيمة متحدثتش لما الأب غيّرها: [[useState]] بياخد القيمة الأولى بس، فاستخدم الـ prop مباشرة. وفي TypeScript تنسى [[?]] للـ prop الاختيارية، فكل اللي بيستخدم الـ component يضطر يبعتها.`
          },
          teach: R`## الفكرة: الأب بيكتب attributes، والابن بيستلمهم object

المثال فيه ٣ حتت: نوع الـ props ([[ButtonProps]])، والابن ([[Button]]) اللي بيستلمها، والأب ([[App]]) اللي بيبعتها. كله اتشغّل في Vite 8.3 + React 19.2 + TypeScript 6.0 في Chrome headless.

---

## ١. [[type ButtonProps]]: العقد بين الأب والابن

~~~text Button.tsx
type ButtonProps = {
  label: string
  variant?: 'primary' | 'ghost'
  onClick: () => void
}
~~~

| السطر | معناه |
|---|---|
| [[label: string]] | نص، و**إجباري**: لو الأب نسيه TypeScript يعترض |
| [[variant?:]] | [[?]] معناها اختياري: الأب يبعته أو لأ |
| [['primary']] والخط الرأسي و [['ghost']] | union: القيمة لازم تبقى واحدة من النصين دول بالظبط، مش أي string |
| [[onClick: () => void]] | دالة مبتاخدش حاجة ([[()]]) ومبترجّعش حاجة مهمة ([[void]]) |

ده TypeScript بس، بيتشال من الـ JavaScript النهائي. شغلته إن الغلط يتمسك وانت بتكتب.

---

## ٢. [[Button]]: الابن

~~~text Button.tsx
function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return <button className={$__btbtn btn-$__{variant}$__bt} onClick={onClick}>{label}</button>
}
~~~

### الـ parameter

React بتنادي [[Button(props)]] وبتبعتله object واحد فيه كل الـ attributes. والقوسين [[{ label, variant = 'primary', onClick }]] destructuring: بيطلّعوا كل خانة في متغير بنفس اسمها.

و [[variant = 'primary']] قيمة افتراضية: لو [[props.variant]] جت [[undefined]] (الأب مبعتهاش)، تبقى [[primary]].

### الـ [[className]]

[[$__btbtn btn-$__{variant}$__bt]] ده template literal: نص بين علامتين [[$__bt]]، و [[$__{variant}]] جواه بتتبدّل بقيمة المتغير. فلو [[variant]] = [[ghost]] النص يبقى [[btn btn-ghost]]. وهو بين [[{ }]] لأنه JavaScript مش نص ثابت.

### [[onClick={onClick}]]

الشمال: الـ event بتاع عنصر [[<button>]]. اليمين: الدالة اللي الأب بعتها. يعني «لما الزرار يتضغط، نادي دالة الأب». الابن مش عارف الدالة بتعمل إيه، ومش محتاج يعرف.

---

## ٣. [[App]]: الأب

~~~text App.tsx
export default function App() {
  return <Button label="Save" onClick={() => alert('saved')} />
}
~~~

- [[label="Save"]]: النص بيتبعت بين علامات تنصيص.
- [[onClick={() => alert('saved')}]]: أي حاجة مش نص (دالة، أو رقم، أو object) بتتبعت بين [[{ }]]. هنا arrow function لما تتنادى تعمل [[alert]].
- [[variant]] مش مبعوتة، فهتاخد الافتراضي.

### الـ props بتوصل شكلها إيه؟

ده الـ object اللي React بتبعته للابن، طبعناه في Node لـ [[<Button label="Save" onClick={fn} disabled />]]:

~~~text الناتج (Node)
{ label: 'Save', onClick: [Function: fn], disabled: true }
~~~

لاحظ [[disabled]] من غير قيمة وصلت [[true]].

---

## ٤. الناتج بالـ solCode (٣ زراير)

~~~text الناتج (Chrome)
<button class="btn btn-primary">Save</button>
<button class="btn btn-ghost">Cancel</button>
<button class="btn btn-primary">Delete</button>
~~~

Save و Delete أخدوا [[btn-primary]] من القيمة الافتراضية، و Cancel أخد [[btn-ghost]] لأن الأب بعتها. ولما ضغطنا Save ظهر [[alert]] فيه [[saved]]: الابن نادى دالة الأب.

---

## ٥. [[variant="red"]]

~~~text tsc
error TS2322: Type '"red"' is not assignable to type '"primary" | "ghost" | undefined'.
~~~

اقرا الرسالة: النوع المسموح [[primary]] أو [[ghost]] أو [[undefined]] (الأخيرة جت من [[?]]). وفي الصفحة نفسها الزرار طلع [[class="btn btn-red"]] عادي، لأن Vite في التطوير بيشيل الأنواع من غير ما يفحصها. [[npm run build]] هو اللي بيشغّل [[tsc]] ويقع.

---

## ٦. الابن ميعدّلش الـ props

جرّبنا [[props.label = 'x']] جوه component في وضع التطوير:

~~~text الـ Console
Cannot assign to read only property 'label' of object '#<Object>'
~~~

React عاملة freeze للـ object. ولو محتاج قيمة تتغير، دي state مش prop.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[<Button label="Save" />]] | الأب بيبعت، والنص بين علامات تنصيص |
| [[onClick={fn}]] | أي حاجة غير النص بين [[{ }]] |
| [[function Button({ label })]] | الابن بيستلم object ويعمل destructuring |
| [[variant = 'primary']] | قيمة لو الأب مبعتش |
| [[variant?:]] | prop اختيارية في TypeScript |
| الـ props | قراية بس. التغيير يبقى state |`,
          lines: [
            "شكل الـ props بـ TypeScript.",
            "نص إجباري.",
            "اختياري ([[?]]) ومحدد بقيمتين بس.",
            "دالة الأب هيبعتها عشان يعرف إن الزرار اتداس.",
            "قفلة الـ type.",
            "destructuring للـ props، و variant ليه قيمة افتراضية.",
            "الكلاس بيتبني من template literal، والضغطة بتنادي دالة الأب.",
            "قفلة الـ component.",
            "الأب اللي بيستخدم Button.",
            "بيبعت label كنص، و onClick كدالة بين { }.",
            "قفلة App."
          ],
          sol: R`التلات زراير بيظهروا بالـ labels بتاعتهم. اللي بعتله [[variant="ghost"]] الـ class بتاعه [[btn btn-ghost]]، والباقيين [[btn btn-primary]] لأن الـ default في الـ destructuring اشتغل.

مع [[variant="red"]] المحرر بيقول: «Type '"red"' is not assignable to type '"primary" | "ghost" | undefined'». لاحظ إن الصفحة في [[npm run dev]] ممكن تفضل شغالة والزرار ياخد [[btn-red]]، لأن Vite مبيعملش type check، لكن [[npm run build]] هيقع بنفس الـ error. ده بالظبط فايدة الـ union: الغلطة تتمسك قبل ما توصل للمستخدم.`,
          solCode: R`export default function App() {
  return (
    <>
      <Button label="Save" onClick={() => alert('saved')} />
      <Button label="Cancel" variant="ghost" onClick={() => alert('cancel')} />
      <Button label="Delete" onClick={() => alert('deleted')} />
    </>
  )
}`
        },
        {
          cmd: "children",
          title: "component يلف حوالين أي محتوى (composition)",
          desc: R`[[children]] prop خاصة: أي حاجة تكتبها بين فتحة الـ component وقفلته بتوصله فيها. كده تعمل Card أو Modal أو Layout يلف أي محتوى من غير ما يعرف هو إيه.

ودي أساس الـ composition: بدل component واحد ضخم بياخد عشرين prop، بتركّب components صغيرة جوه بعض. ولو محتاج أكتر من «فتحة»، ابعت JSX في props عادية زي [[actions]] أو [[sidebar]].`,
          example: R`import type { ReactNode } from 'react'

function Card({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="card">
      <header>{title} {actions}</header>
      <div className="card-body">{children}</div>
    </section>
  )
}
export default function Orders() {
  return <Card title="Orders" actions={<button>Export</button>}><p>No orders yet.</p></Card>
}`,
          try: R`استخدم نفس Card مرتين: مرة جواه جدول، ومرة جواه فورم. وجرّب تبعت [[actions]] فيها زرارين جوه Fragment.`,
          flag: "script",
          deep: {
            why: R`من غير composition بتلاقي نفسك بتعدّي بيانات على components مبتستخدمهاش عشان توصل لحفيد تحت (prop drilling)، أو بتعمل component واحد بياخد [[showHeader]] و [[headerColor]] و [[showFooter]] و... لحد ما يبقى مستحيل يتفهم.`,
            how: R`الـ JSX اللي بين الفتحة والقفلة بيتحط في [[props.children]]: ممكن يبقى نص، أو عنصر واحد، أو array عناصر. والنوع المناسب في TypeScript هو [[ReactNode]]، وبيقبل أي حاجة React تعرف ترسمها.

الـ composition بيحل الـ prop drilling قبل ما تفكر في context: بدل ما [[Layout]] ياخد [[user]] ويعدّيه لـ [[Sidebar]] اللي يعدّيه لـ [[Avatar]]، الصفحة نفسها تكتب [[<Layout sidebar={<Avatar user={user} />}>]]. كده Layout عمره ما لمس user.

وفيه فايدة أداء كمان: العناصر اللي في [[children]] الأب هو اللي عملها. فلو Card عنده state وعمل render، الـ children مبيعملوش render تاني طول ما الأب اللي فوق مغيّرهاش، لأنها نفس الـ objects.

وخد بالك من الفرق بين [[icon={Star}]] (بتبعت الـ component نفسه، والابن يرسمه [[<Icon />]]) و [[icon={<Star />}]] (بتبعت عنصر جاهز). الاتنين صح بس لازم تعرف بتعمل أنهي.`,
            when: "Layouts، و Cards، و Modals، و Providers (زي [[<QueryClientProvider>]] اللي بيلف التطبيق كله)، وأي component شغلته «يلف» أو «يرتّب» محتوى.",
            mistakes: R`تستخدم [[React.Children.map]] و [[cloneElement]] عشان تعدّل الـ children من جوه: هش وبيبوظ لو حد لف الابن في div. وتلجأ لـ context أو store عام بدري، والمشكلة كانت محلولة بإنك تبعت JSX جاهز.`
          },
          teach: R`## الفكرة: Card إطار، واللي جواه بييجي من برا

[[Card]] بيرسم إطار ثابت (عنوان، ومكان للأزرار، وجسم)، ومش عارف إيه اللي هيتحط جواه. الأب هو اللي بيقرر. كله اتشغّل في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. [[import type { ReactNode } from 'react']]

[[ReactNode]] نوع TypeScript معناه «أي حاجة React تعرف ترسمها»: نص، أو رقم، أو عنصر JSX، أو array منهم، أو [[null]]. و [[import type]] معناها إننا بنستورد نوع بس، فالسطر ده بيتشال كله من الـ JavaScript النهائي.

---

## ٢. [[Card]]

~~~text Card.tsx
function Card({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="card">
      <header>{title} {actions}</header>
      <div className="card-body">{children}</div>
    </section>
  )
}
~~~

### الـ props التلاتة

| الاسم | النوع | جاي منين |
|---|---|---|
| [[title]] | [[string]] | attribute عادي: [[title="Orders"]] |
| [[actions]] | [[ReactNode]] اختياري ([[?]]) | attribute قيمته JSX: [[actions={<button>Export</button>}]] |
| [[children]] | [[ReactNode]] | **مش attribute**: أي حاجة بين [[<Card>]] و [[</Card>]] |

[[children]] اسمها محجوز: React بتاخد اللي بين الفتحة والقفلة وتحطه في الخانة دي لوحدها. و [[actions]] اسم احنا اخترناه، prop عادية بس قيمتها JSX. يعني عندك «فتحتين»: واحدة اسمها [[children]] والتانية [[actions]].

### الـ JSX

- [[<header>{title} {actions}</header>]]: العنوان، ومسافة، وأي أزرار اتبعتت. ولو [[actions]] مبعتتش، بتبقى [[undefined]] ومبيترسمش حاجة.
- [[<div className="card-body">{children}</div>]]: هنا بيتحط المحتوى اللي الأب كتبه.

---

## ٣. [[Orders]]: الأب

~~~text Orders.tsx
<Card title="Orders" actions={<button>Export</button>}><p>No orders yet.</p></Card>
~~~

- [[actions={<button>Export</button>}]]: JSX كـ قيمة. العنصر ده بيتعمل هنا في [[Orders]] ويتبعت جاهز.
- [[<p>No orders yet.</p>]] بين [[<Card>]] و [[</Card>]]: ده [[children]].

~~~text الناتج (Chrome)
<section class="card">
  <header>Orders <button>Export</button></header>
  <div class="card-body"><p>No orders yet.</p></div>
</section>
~~~

(مقسوم سطور عشان يتقري.) [[Card]] نفسه اختفى، والـ [[<button>]] اتحط في الـ header، والـ [[<p>]] في الجسم.

---

## ٤. الـ solCode: نفس Card بمحتوى مختلف

~~~text الناتج (Chrome)
<section class="card"><header>Orders <button>Export</button><button>Print</button></header>
  <div class="card-body"><table><tbody><tr><td>#1001</td><td>250 EGP</td></tr></tbody></table></div></section>
<section class="card"><header>New customer </header>
  <div class="card-body"><form><input placeholder="Name" name="name"><button>Save</button></form></div></section>
~~~

- [[actions={<><button>Export</button><button>Print</button></>}]]: زرارين في prop واحدة، ملفوفين في Fragment ([[<>...</>]]) لأن القيمة لازم تبقى حاجة واحدة. والـ Fragment مبيظهرش في الـ HTML.
- الكارت التاني من غير [[actions]]، فالـ header فيه العنوان ومسافة بس.
- [[Card]] متغيرش ولا حرف.

---

## ٥. لو بعت array بدل Fragment

[[actions={[<button>A</button>, <button>B</button>]}]] اترسم صح، بس الـ Console قال:

~~~text الـ Console
Each child in a list should have a unique "key" prop.
~~~

أي array من العناصر React بتعتبرها list ومحتاجة [[key]] لكل عنصر (درس key). الـ Fragment مش list، فمفيش تحذير.

## ٦. لو نسيت [[children]]

[[<Card title="Empty" />]]:

~~~text tsc
error TS2741: Property 'children' is missing in type '{ title: string; }' but required in type '{ title: string; actions?: ReactNode; children: ReactNode; }'.
~~~

لأن [[children]] في النوع من غير [[?]]، يعني إجبارية. ولو عايزها اختيارية: [[children?: ReactNode]].

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[<Card>...</Card>]] | اللي في النص بيوصل في [[children]] |
| [[actions={<button />}]] | فتحة تانية: prop عادية قيمتها JSX |
| [[ReactNode]] | النوع اللي يقبل أي حاجة تترسم |
| أكتر من عنصر في prop | لفّهم في [[<>...</>]]، مش array |
| [[Card]] | ميعرفش المحتوى، فينفع في أي صفحة |`,
          lines: [
            "نوع يقبل أي حاجة تترسم. [[import type]] لأنه type بس.",
            "Card بياخد عنوان، وفتحة اختيارية للأزرار، و children.",
            "بداية الـ JSX.",
            "العنصر اللي بيلف.",
            "العنوان وجنبه أي JSX اتبعت في actions.",
            "هنا بيترسم أي محتوى اتحط بين فتحة Card وقفلته.",
            "قفلة الـ section.",
            "قفلة القوس.",
            "قفلة Card.",
            "صفحة بتستخدم Card.",
            "زرار في actions، وفقرة في children.",
            "قفلة الصفحة."
          ],
          sol: R`نفس الإطار (العنوان والزرار فوق) بيتكرر، والجسم هو اللي بيتغير: جدول في مرة وفورم في مرة. Card نفسه متغيرش ولا سطر، لأنه مش عارف ولا محتاج يعرف إيه اللي جواه.

الـ Fragment بيخليك تبعت أكتر من عنصر في prop واحدة من غير div زيادة. لو بعتهم كـ array ([[actions={[<button/>, <button/>]}]]) هيشتغل بس هتلاقي warning إن كل child في list محتاج key. ولو TypeScript اشتكى إن [[children]] ناقصة، يبقى استخدمت Card من غير ما تحط حاجة بين الـ tags.`,
          solCode: R`export function Pages() {
  return (
    <>
      <Card title="Orders" actions={<><button>Export</button><button>Print</button></>}>
        <table>
          <tbody><tr><td>#1001</td><td>250 EGP</td></tr></tbody>
        </table>
      </Card>
      <Card title="New customer">
        <form><input name="name" placeholder="Name" /><button>Save</button></form>
      </Card>
    </>
  )
}`
        }
      ]
    },
    {
      t: "الـ state والـ events",
      l: 1,
      n: "الـ state ذاكرة الـ component، وتغييرها هو اللي بيعيد الرسم",
      items: [
        {
          cmd: "useState",
          title: "خلي الـ component يفتكر قيمة ويعيد الرسم لما تتغير",
          desc: R`[[useState]] بيدّيك قيمة ودالة تغيّرها. لما تنادي الدالة، React بتحفظ القيمة الجديدة وتعيد رسم الـ component بيها.

متغير عادي ([[let count = 0]]) مش هينفع: بيرجع صفر مع كل render، وتغييره مش بيقول لـ React ترسم. والقيمة جوه الـ render الواحد ثابتة (snapshot)، فلو هتحسب من القيمة القديمة استخدم الـ updater: [[setCount(c => c + 1)]].`,
          example: R`import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  function addFour() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
  }
  console.log('render', count)
  return <button onClick={addFour}>{count}</button>
}
// أول ضغطة: 3 مش 4، والـ console بيطبع render مرة واحدة بس (في Strict Mode وقت التطوير هتشوفه مرتين بنفس الرقم: ده نفس الـ render بيتنادى مرتين، مش أربعة)`,
          try: R`خمّن الرقم قبل ما تضغط. بعدين حط [[alert(count)]] بعد الـ setCount وشوف إنه بيطبع القيمة القديمة.`,
          flag: "script",
          deep: {
            why: "الـ component دالة بتتنادي من الأول مع كل render، فأي متغير جواها بيتولد من جديد. محتاج مكان برا الدالة يفضل فيه الرقم بين الـ renders، وطريقة تقول بيها لـ React «حاجة اتغيرت، ارسم تاني». [[useState]] بيدّيك الاتنين.",
            how: R`الـ state مش محفوظة جوه الدالة. React بتحفظها في الـ component instance بتاعها (fiber)، في list بالترتيب. أول [[useState]] في الدالة ليه الخانة الأولى، والتاني التانية، وهكذا. عشان كده الـ hooks لازم تتنادى بنفس الترتيب كل مرة.

[[setCount(x)]] مش بتغيّر [[count]] حالًا. بتحط التحديث في طابور وتطلب render. وكل الـ setState اللي حصلت في نفس الـ event بتتجمع في render واحد (batching). عشان كده الـ console طبع render واحد بس (أو نفس السطر مرتين في Strict Mode وقت التطوير، مش أربعة).

في المثال: [[count]] جوه الدالة دي صفر طول الوقت. أول سطرين بيقولوا «خليها 0 + 1» مرتين، يعني 1. والـ updater [[c => c + 1]] بياخد آخر قيمة في الطابور، فبتبقى 2 وبعدين 3.

ولو القيمة الجديدة زي القديمة بالظبط ([[Object.is]])، React ممكن تتخطى الـ render. والقيمة الأولى لو حسابها تقيل ابعتها دالة: [[useState(() => loadInitial())]] عشان تتحسب مرة واحدة مش مع كل render.`,
            when: "أي قيمة بتتغير مع الوقت وبتأثر على اللي ظاهر، والـ component ده صاحبها: نص input، أو modal مفتوح ولا لأ، أو التاب المختار.",
            mistakes: R`تستنى [[count]] يتغير على السطر اللي بعد [[setCount]]. وتعدّل object أو array في مكانه ([[items.push]]) بدل ما تعمل نسخة جديدة (الدرس الجاي). وتكتب [[useState(expensive())]] فالحساب يحصل كل render ويترمي. وتخزّن في state حاجة تقدر تحسبها من state تانية (درس derived state).`
          },
          teach: R`## الفكرة: ٤ مرات «زوّد واحد»، والنتيجة ٣

المثال زرار، وكل ضغطة بتنادي [[setCount]] ٤ مرات. لو فاكر إن الرقم هيزيد ٤، الدرس ده هيوريك ليه لأ. اتشغّل في Vite 8.3 + React 19.2 في وضع التطوير (جوه [[<StrictMode>]] زي القالب) في Chrome headless.

---

## ١. [[import { useState } from 'react']]

[[useState]] دالة من React. والأقواس [[{ }]] في الـ import معناها «هات الحاجة اللي اسمها كده بالظبط» (named import)، عكس [[export default]] اللي بيتستورد من غير أقواس.

والدوال اللي بتبدأ بـ [[use]] اسمها **hooks**: دوال React بتديك قدرات جوه الـ component، وليها قاعدة: تتنادى في أول الـ component، مش جوه [[if]] ولا loop (ليه؟ تحت في رقم ٥).

---

## ٢. [[const [count, setCount] = useState(0)]]

| الحتة | معناها |
|---|---|
| [[useState(0)]] | «اعمل خانة ذاكرة، وأول قيمة فيها 0» |
| بيرجّع | array فيها عنصرين: القيمة الحالية، ودالة تغيّرها |
| [[[count, setCount]]] | array destructuring: الأول في [[count]] والتاني في [[setCount]]. الأسماء انت بتختارها، والعادة [[x]] و [[setX]] |
| [[const]] | المتغير مش هيتغير **في الـ render ده**. القيمة الجديدة بتيجي في render جديد |

---

## ٣. [[addFour]] سطر سطر

~~~text Counter.tsx
function addFour() {
  setCount(count + 1)
  setCount(count + 1)
  setCount(c => c + 1)
  setCount(c => c + 1)
}
~~~

أهم معلومة: [[setCount]] **مبتغيّرش** [[count]]. بتحط طلب في طابور، و React بتنفّذ الطابور بعد ما الـ handler يخلص. و [[count]] في الضغطة الأولى قيمته [[0]] طول ما الدالة شغالة.

فيه نوعين من الطلبات:

- **قيمة**: [[setCount(count + 1)]] هي [[setCount(1)]]، يعني «خليها 1»، مهما كان اللي قبلها.
- **دالة** (updater): [[setCount(c => c + 1)]] يعني «خد آخر قيمة في الطابور وزوّد عليها». و [[c => c + 1]] arrow function بتاخد [[c]] وترجّع [[c + 1]].

React بتمشي على الطابور بالترتيب:

| الطلب | قبله | بعده |
|---|---|---|
| [[setCount(0 + 1)]] | 0 | 1 |
| [[setCount(0 + 1)]] | 1 | 1 (تاني «خليها 1») |
| [[setCount(c => c + 1)]] | 1 | 2 |
| [[setCount(c => c + 1)]] | 2 | 3 |

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome، وضع التطوير)
initial         <button>0</button>
after click 1   <button>3</button>
after click 2   <button>6</button>
~~~

~~~text الـ Console
render 0
render 0
>> click 1
render 3
render 3
>> click 2
render 6
render 6
~~~

([[>> click]] علامة احنا حطيناها في الـ log عشان تعرف فين الضغطة.)

- **الرقم**: 3 مش 4، زي الجدول. والضغطة التانية بدأت من 3 فوصلت 6.
- **عدد الـ renders**: الـ ٤ طلبات عملوا render **واحد** بقيمة 3، مش ٤ renders. ده اسمه **batching**: React بتجمّع كل الـ setState اللي في نفس الـ event.
- **السطر المتكرر**: [[render 3]] ظهر مرتين لأن [[<StrictMode>]] في التطوير بينادي الـ component مرتين بنفس القيمة عشان يكشف الـ components اللي مش pure. ده render واحد اتنادى مرتين، مش اتنين. وفي الـ build العادي بيظهر مرة.

### تجربة [[alert(count)]]

حطينا [[alert(count)]] بعد آخر [[setCount]]:

~~~text الناتج
>> click 1   alert: 0
>> click 2   alert: 3
~~~

في الضغطة الأولى، بعد ٤ مرات set، [[count]] لسه 0. ده معنى «الـ state snapshot»: كل render ليه نسخته الثابتة من القيم.

---

## ٥. الـ state محفوظة فين؟

[[Counter]] دالة بتتنادى من الأول في كل render، فأي [[let]] جواها بيرجع لقيمته الأولى. [[useState]] مش بيحفظ جوه الدالة، React بتحفظ القيمة برا، في لستة خاصة بالـ component ده، بالترتيب: أول [[useState]] ليه الخانة الأولى، والتاني التانية. عشان كده لازم الـ hooks تتنادى بنفس الترتيب في كل render: لو واحد جوه [[if]] واتخطّى مرة، الخانات هتتلخبط.

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[useState(0)]] | خانة ذاكرة، أولها 0 |
| [[setCount(x)]] | طلب: «خليها x» في الـ render الجاي |
| [[setCount(c => c + 1)]] | طلب: «زوّد على آخر قيمة»، استخدمه لما الجديد معتمد على القديم |
| batching | كل الـ set في نفس الـ event = render واحد |
| [[count]] بعد [[setCount]] | لسه القديمة لحد الـ render الجاي |
| log مرتين في التطوير | [[StrictMode]]، مش bug |`,
          lines: [
            "hook بيدّي الـ component ذاكرة.",
            "component عادي.",
            "قيمة وأداة تغييرها، والقيمة الأولى 0.",
            "دالة الضغطة.",
            "count هنا 0، فده «خليها 1».",
            "برضه «خليها 1»، لأن count لسه 0 في الـ render ده.",
            "updater: خد آخر قيمة في الطابور (1) وزوّد، فتبقى 2.",
            "وتاني من 2 لـ 3.",
            "قفلة الدالة.",
            "بيطبع مرة في كل render، فتشوف إن الأربع setState عملوا render واحد.",
            "اعرض الرقم، والضغطة تنادي addFour.",
            "قفلة الـ component."
          ],
          sol: R`التخمين الصح [[3]]، وأول ضغطة الزرار بيبقى 3 والـ console بيطبع [[render 3]] مرة واحدة (أو مرتين بنفس الرقم في Strict Mode). أول سطرين الاتنين بيقولوا «خليها [[0 + 1]]» لأن [[count]] في الـ render ده صفر، فالنتيجة 1. وبعدين الـ updater functions بتاخد آخر قيمة في الطابور: 2 ثم 3. والضغطة التانية توصّل لـ 6.

الـ [[alert(count)]] بيطلع [[0]] في أول ضغطة (والقيمة القديمة في أي ضغطة بعدها)، لأن setCount مبتغيرش المتغير اللي في إيدك، هي بتطلب render جديد فيه count جديد. اللي بيخمّن 4 فاكر إن [[setCount(count + 1)]] بيقرا آخر قيمة، واللي متوقع 4 renders فاكر إن كل set بيرسم لوحده، والحقيقة إن React بتجمعهم (batching) في render واحد.`
        },
        {
          cmd: "events",
          title: "اتعامل مع الضغط والكتابة وإرسال الفورم",
          desc: R`الـ events في React بتتكتب camelCase وبتاخد دالة: [[onClick={handleClick}]]. ابعت الدالة نفسها ومتنادهاش: [[onClick={handleClick()}]] بتتنفذ وقت الرسم مش وقت الضغط.

الـ handler بياخد event object، منه [[e.target.value]] في الـ input، و [[e.preventDefault()]] في الفورم عشان الصفحة متعملش reload. ولو محتاج تبعت argument، لفّها في arrow: [[onClick={() => remove(id)}]].`,
          example: R`import { useState, type FormEvent } from 'react'

function SearchBox({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSearch(q.trim())
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button type="submit">Search</button>
      <button type="button" onClick={() => setQ('')}>Clear</button>
    </form>
  )
}`,
          try: R`امسح [[type="button"]] من زرار Clear واضغطه: هتلاقيه عمل submit للفورم. وبعدين امسح [[e.preventDefault()]] وشوف الصفحة بتعمل reload.`,
          flag: "script",
          deep: {
            why: "الواجهة لازم ترد على المستخدم: ضغطة، أو كتابة، أو إرسال. React بتدّيك طريقة واحدة تكتب بيها الـ events على كل العناصر، بنفس الشكل في كل المتصفحات.",
            how: R`React مش بتحط listener على كل زرار. بتحط listener واحد لكل نوع event على الـ root، ولما event يحصل بتدوّر مين الـ component اللي ليه handler وتناديه (event delegation). والـ [[e]] اللي بيوصلك SyntheticEvent: غلاف حوالين الـ event الأصلي بنفس الـ API ([[preventDefault]] و [[stopPropagation]] و [[target]])، والأصلي موجود في [[e.nativeEvent]].

[[onChange]] في React بيشتغل مع كل حرف، زي event الـ [[input]] في المتصفح، مش زي [[change]] الأصلي اللي بيستنى لما تسيب الخانة.

الزرار جوه form نوعه الافتراضي [[submit]]، فأي زرار مش للإرسال لازم [[type="button"]]. و [[onSubmit]] بيتنادي بالـ Enter كمان، مش بالزرار بس، عشان كده الأحسن تحط منطق الإرسال في onSubmit مش في onClick بتاع الزرار.

والـ handler بيقرا الـ props والـ state من الـ render اللي اتعمل فيه (closure)، فبيشوف القيم اللي كانت ظاهرة وقت ما المستخدم ضغط.`,
            when: "أي تفاعل. والعادة في التسمية: [[handleX]] للدالة جوه الـ component، و [[onX]] للـ prop اللي بيستلمها ([[onSearch]] و [[onClose]]).",
            mistakes: R`[[onClick={setOpen(true)}]] بتتنادى وقت الرسم، فتعمل setState، فـ render، فتتنادى تاني: «Too many re-renders». الصح [[onClick={() => setOpen(true)}]]. وزرار جوه فورم من غير [[type="button"]] بيبعت الفورم. و [[div]] بـ onClick بدل [[button]]: مبيشتغلش بالكيبورد ولا بيوصل لقارئ الشاشة (تفاصيل الـ accessibility في تاب «HTML و CSS»، درس aria).`
          },
          teach: R`## الفكرة: خانة بحث فيها ٣ events

[[SearchBox]] فورم فيه خانة وزرارين. فيه ٣ events: الكتابة ([[onChange]])، والإرسال ([[onSubmit]])، والتفضية ([[onClick]]). عشان نشوفه شغال، الأب بعتله [[onSearch={q => console.log('onSearch:', JSON.stringify(q))}]] ([[JSON.stringify]] عشان المسافات والنص الفاضي يبانوا). اتشغّل في Vite 8.3 + React 19.2 في Chrome headless، والكتابة والضغط اتعملوا بـ Playwright (أداة بتتحكم في المتصفح من كود).

---

## ١. الـ import

~~~text SearchBox.tsx
import { useState, type FormEvent } from 'react'
~~~

[[useState]] دالة، و [[FormEvent]] نوع TypeScript بس (لاحظ [[type]] قدامه)، بيوصف الـ event اللي بيوصل لـ handler الفورم.

## ٢. الـ props والـ state

~~~text SearchBox.tsx
function SearchBox({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
~~~

- [[onSearch]]: دالة الأب. نوعها [[(q: string) => void]]: بتاخد نص ومبترجّعش حاجة. اسمها بيبدأ بـ [[on]] لأنها بتتنادى لما حاجة **تحصل**.
- [[q]]: النص اللي في الخانة، وبيبدأ فاضي [['']].

---

## ٣. [[handleSubmit]]

~~~text SearchBox.tsx
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  onSearch(q.trim())
}
~~~

- [[e]]: الـ event object، React بتبعته لأي handler لوحدها. و [[FormEvent<HTMLFormElement>]] معناها «event جاي من عنصر form». و [[< >]] هنا generic: نوع جوه نوع.
- [[e.preventDefault()]]: «امنع اللي المتصفح بيعمله عادةً». واللي بيعمله مع أي فورم: يبعته لسيرفر ويعمل reload للصفحة.
- [[q.trim()]]: [[trim]] بتشيل المسافات من أول النص وآخره.
- [[onSearch(...)]]: بلّغ الأب.

اسم [[handleSubmit]] بيبدأ بـ [[handle]]: العادة إن الدالة اللي جوه الـ component اسمها [[handleX]]، والـ prop اللي جاية من الأب [[onX]].

---

## ٤. الـ JSX

~~~text SearchBox.tsx
<form onSubmit={handleSubmit}>
  <input value={q} onChange={e => setQ(e.target.value)} />
  <button type="submit">Search</button>
  <button type="button" onClick={() => setQ('')}>Clear</button>
</form>
~~~

| السطر | الـ event | بيحصل إمتى |
|---|---|---|
| [[onSubmit={handleSubmit}]] | إرسال الفورم | ضغطة Search، **أو** Enter جوه الخانة |
| [[onChange={e => setQ(e.target.value)}]] | تغيير الخانة | مع كل حرف. [[e.target]] العنصر نفسه، و [[.value]] النص اللي فيه |
| [[onClick={() => setQ('')}]] | ضغطة | فضّي الخانة |

لاحظ إن الـ events بتتكتب camelCase ([[onSubmit]] مش [[onsubmit]])، وبتاخد **دالة**. [[onSubmit={handleSubmit}]] بتبعت الدالة نفسها من غير أقواس. لو كتبت [[handleSubmit()]] هتتنادى وقت الرسم.

و [[onClick={() => setQ('')}]]: هنا محتاجين نبعت argument ([['']])، فلفّيناها في arrow function. الـ arrow نفسها هي اللي بتتبعت، و [[setQ('')]] جواها بتتنادى وقت الضغط بس.

---

## ٥. اللي حصل

كتبنا [[  react  ]] (بمسافات) ودوسنا Enter، وبعدين ضغطنا Search، وبعدين Clear:

~~~text الـ Console
>> typed
onSearch: "react"
>> click Search
onSearch: "react"
>> click Clear
~~~

- Enter و Search الاتنين نادوا [[onSubmit]]، والمسافات اتشالت.
- Clear فضّى الخانة ومنادهاش، لأنه [[type="button"]].
- الـ URL فضل [[?l=L09]] زي ما هو: مفيش reload.

---

## ٦. التجارب اللي في «جرّب»

### من غير [[type="button"]] على Clear

~~~text الـ Console
>> click Clear
onSearch: ""
~~~

أي [[<button>]] جوه [[<form>]] نوعه الافتراضي [[submit]]. فالضغطة فضّت الخانة **وكمان** بعتت الفورم، و [[onSearch]] اتنادت بنص فاضي. (فاضي مش [[react]]، لأن React خلّصت تفضية الخانة ورسمت قبل ما event الـ submit ييجي.)

### من غير [[e.preventDefault()]]

كتبنا [[react]] ودوسنا Enter:

~~~text الناتج
onSearch: "react"
navigated: http://localhost:5791/?
~~~

[[onSearch]] اتنادت، وبعدها على طول المتصفح بعت الفورم بـ GET لنفس الصفحة: الـ URL بقى ينتهي بـ [[?]] (الخانة ملهاش [[name]] فمفيش حاجة بعد العلامة)، والصفحة عملت reload، فكل الـ state راحت والـ Console اتمسح. (في التجربة دي حتى الـ [[?l=L09c]] بتاعنا ضاع.)

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[onClick={fn}]] | ابعت الدالة، متنادهاش |
| [[onClick={() => fn(x)}]] | لو محتاج argument |
| [[e.target.value]] | النص اللي في الخانة |
| [[e.preventDefault()]] | امنع الـ reload في الفورم |
| [[onSubmit]] | بيشتغل بالزرار وبالـ Enter |
| [[type="button"]] | أي زرار جوه فورم مش للإرسال |`,
          lines: [
            "useState، و FormEvent كـ type بس.",
            "component بياخد دالة من الأب تستلم كلمة البحث.",
            "النص اللي في الخانة.",
            "handler الإرسال، ونوع الـ event محدد.",
            "امنع المتصفح من إنه يبعت الفورم ويعمل reload.",
            "ابعت الكلمة للأب من غير مسافات في الأطراف.",
            "قفلة الدالة.",
            "بداية الـ JSX.",
            "onSubmit بيشتغل بالزرار وبالـ Enter.",
            "كل حرف يروح للـ state (controlled input).",
            "زرار الإرسال.",
            "[[type=\"button\"]] عشان ميبعتش الفورم، والضغطة تفضّي الخانة.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`من غير [[type="button"]]، أي زرار جوه form نوعه الافتراضي [[submit]]، فدوسة Clear بتمسح الخانة وكمان بتعمل submit وتنادي onSearch. عشان كده أي زرار جوه فورم مش المقصود بيه الإرسال لازم تكتبله [[type="button"]].

ومن غير [[e.preventDefault()]] المتصفح بيعمل اللي بيعمله مع أي فورم: يبعت GET لنفس الصفحة (هتلاقي [[?]] في آخر الـ URL) ويعمل reload، فكل الـ state بتضيع والـ console بيتمسح. لو لاحظت إن الـ log بتاعك «بيظهر ويختفي»، ده غالبًا السبب.`
        },
        {
          cmd: "immutable updates",
          title: "عدّل object أو array في الـ state من غير ما تبوّظها",
          desc: R`React بتعرف إن الـ state اتغيرت لما المرجع (reference) يتغير. لو عدّلت نفس الـ array بـ [[push]] أو نفس الـ object بـ [[user.name = 'x']]، المرجع هو هو، فالشاشة ممكن متتحدثش.

القاعدة: اعمل نسخة جديدة. spread [[...]] للـ objects، و [[map]] للتعديل، و [[filter]] للمسح، و array جديدة فيها القديم والجديد للإضافة. ولو الـ state متداخلة أوي، بسّط شكلها أو استخدم immer.`,
          example: R`// جوه component
type Todo = { id: number; text: string; done: boolean }
const [todos, setTodos] = useState<Todo[]>([])
const add = (text: string) =>
  setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
const remove = (id: number) =>
  setTodos(prev => prev.filter(t => t.id !== id))
const [user, setUser] = useState({ name: 'Sara', address: { city: 'Cairo' } })
const moveTo = (city: string) =>
  setUser(prev => ({ ...prev, address: { ...prev.address, city } }))`,
          try: R`اكتب [[toggle]] غلط: [[prev.find(t => t.id === id)!.done = true; return prev]]، وشوف الـ checkbox مش بيتحدث. رجّعها بـ map وقارن.`,
          flag: "script",
          deep: {
            why: "React مش بتفتش جوه الـ objects تشوف إيه اتغير، ده هيبقى بطيء جدًا. بتقارن المرجع بس: قديم ولا جديد. فلو غيّرت جوه نفس الـ object، بالنسبة لها مفيش حاجة حصلت.",
            how: R`[[setTodos(x)]] بتقارن x بالقيمة الحالية بـ [[Object.is]]. نفس المرجع يبقى ممكن تتخطى الـ render. ونفس المقارنة بتستخدمها dependencies الـ effects و [[useMemo]] و [[memo]]، فالتعديل في المكان بيبوّظهم كلهم.

الـ spread بينسخ مستوى واحد بس (shallow copy). في [[user]]، [[{ ...prev }]] بيعمل object جديد بس [[address]] جواه لسه نفس الـ object القديم. عشان كده لما تغيّر city لازم تنسخ address كمان. القاعدة: انسخ كل مستوى في الطريق للحاجة اللي بتغيّرها، وسيب الباقي مشترك.

خد بالك من الدوال اللي بتعدّل في المكان: [[push]] و [[splice]] و [[sort]] و [[reverse]]. بدائلها اللي بترجع نسخة: spread، و [[filter]]، و [[toSorted]] و [[toReversed]] (ES2023)، أو [[slice().sort()]].

ولما الـ state تبقى متداخلة جامد، immer بيخليك تكتب كأنك بتعدّل ([[draft.address.city = city]]) وهو بيطلّع نسخة جديدة صح، و Zustand بيدعمه كـ middleware.`,
            when: "أي state فيها object أو array. والـ updater [[prev => ...]] أأمن لأنه بيشتغل على آخر قيمة حتى لو فيه تحديثات تانية في الطابور.",
            mistakes: R`[[todos.push(x); setTodos(todos)]]: نفس المرجع، فمفيش render. و [[setTodos(todos.sort())]]: [[sort]] عدّلت الـ state الأصلية قبل ما React تشوفها. و [[structuredClone]] للـ state كلها مع كل تعديل: شغال بس بيعمل نسخ ملهوش لازمة ويبوّظ memo لأن كل حاجة بقت جديدة.`
          },
          teach: R`## الفكرة: ٤ عمليات، وكلها بترجّع نسخة جديدة

المثال حتة من component (مش ملف كامل) فيها list مهام ([[todos]]) وبيانات مستخدم ([[user]])، و ٤ دوال: إضافة، وتعديل، ومسح، وتغيير حاجة جوه object جوه object. ولا دالة فيهم بتعدّل القديم: كلهم بيعملوا نسخة. عشان نجرّب، حطيناهم في component فيه زراير و checkboxes، واتشغّل في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. النوع والـ state

~~~text Todos.tsx
type Todo = { id: number; text: string; done: boolean }
const [todos, setTodos] = useState<Todo[]>([])
~~~

[[useState<Todo[]>([])]]: [[< >]] بتقول لـ TypeScript نوع الـ state: [[Todo[]]] يعني array من [[Todo]]. لازمة هنا لأن [[[]]] الفاضية لوحدها مش بتقول هتشيل إيه.

---

## ٢. الإضافة: spread

~~~text Todos.tsx
const add = (text: string) =>
  setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
~~~

- [[prev => ...]]: الـ updater (من درس useState): [[prev]] هي آخر قيمة للـ state.
- [[[...prev, x]]]: array **جديدة**. [[...]] (spread) بيفرد عناصر [[prev]] جواها، وبعدهم العنصر الجديد.
- [[{ id: Date.now(), text, done: false }]]: [[Date.now()]] الوقت بالميلي ثانية، رقم مختلف كل مرة فينفع id في مثال. و [[text]] لوحدها اختصار لـ [[text: text]].

ليه مش [[prev.push(x)]]؟ [[push]] بتعدّل نفس الـ array وترجّع طولها، فالمرجع (reference) هو هو، و React مش هتشوف تغيير.

## ٣. التعديل: [[map]]

~~~text Todos.tsx
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
~~~

[[map]] بتعدّي على كل عنصر وترجّع **array جديدة** باللي الدالة رجّعته:

- لو ده العنصر المقصود ([[t.id === id]]): object جديد [[{ ...t, done: !t.done }]]، يعني انسخ كل خانات [[t]]، وبعدين اكتب [[done]] فوقها بالعكس ([[!]] بتقلب true و false).
- غير كده: رجّع [[t]] نفسه. العناصر اللي متغيرتش بتفضل نفس الـ objects.

## ٤. المسح: [[filter]]

~~~text Todos.tsx
const remove = (id: number) =>
  setTodos(prev => prev.filter(t => t.id !== id))
~~~

[[filter]] بترجّع array جديدة فيها العناصر اللي الشرط بتاعها [[true]] بس. و [[!==]] «مش بيساوي»، فكله بيفضل ما عدا اللي [[id]] بتاعه ده.

## ٥. object جوه object

~~~text Todos.tsx
const [user, setUser] = useState({ name: 'Sara', address: { city: 'Cairo' } })
const moveTo = (city: string) =>
  setUser(prev => ({ ...prev, address: { ...prev.address, city } }))
~~~

من جوه لبرة:

1. [[{ ...prev.address, city }]]: نسخة من [[address]] و [[city]] الجديدة فوقها.
2. [[{ ...prev, address: ... }]]: نسخة من [[user]]، و [[address]] الجديدة فوق القديمة.
3. [[({ ... })]]: القوسين حوالين الـ object لازمين في arrow function، وإلا JavaScript هيفتكر [[{]] بداية جسم دالة.

ليه نسخنا [[address]] كمان؟ لأن الـ spread بينسخ **مستوى واحد**. جرّبناها في Node:

~~~text الناتج (Node)
> const shallow = { ...prev }
> shallow === prev, shallow.address === prev.address
false true
> const next = { ...prev, address: { ...prev.address, city: 'Alex' } }
> next.address === prev.address, prev.address.city, next.address.city
false Cairo Alex
~~~

[[shallow]] object جديد، بس [[address]] جواه **نفس** الـ object القديم. لو عدّلت فيه هتعدّل في القديم. بالنسخ في المستويين، القديم فضل [[Cairo]] والجديد [[Alex]].

---

## ٦. اللي حصل في المتصفح

بعد كل خطوة طبعنا حالة الـ checkboxes ونص المستخدم:

~~~text الناتج (النسخة الصح)
after add x2         [false,false] Sara - Cairo
toggle first         [true,false]  Sara - Cairo
other state change   [true,false]  Sara - Cairo
moveTo Alex          [true,false]  Sara - Alex
remove last          [true]        Sara - Alex
~~~

([[other state change]] زرار بيغيّر state تانية خالص، ملهاش علاقة بالـ todos.)

### تجربة «جرّب»: [[toggleBad]]

~~~text Todos.tsx
setTodos(prev => { prev.find(t => t.id === id)!.done = true; return prev })
~~~

[[find]] بترجّع أول عنصر الشرط بتاعه صح، و [[!]] بعدها لـ TypeScript: «متأكد إنه مش [[undefined]]». وبعدين عدّلنا [[done]] في **نفس** الـ object ورجّعنا **نفس** الـ array:

~~~text الناتج (toggleBad)
after add x2         [false,false]
toggle first         [false,false]   ← الضغطة ملهاش أثر
other state change   [true,false]    ← اتعلّم فجأة!
~~~

React قارنت [[prev]] باللي رجع بـ [[Object.is]]: نفس المرجع، فمعملتش render. بس البيانات اتغيرت فعلًا، فأول ما state تانية عملت render، الـ checkbox اتعلّم في لحظة ملهاش علاقة بالضغطة.

---

## الدوال اللي بتعدّل في المكان وبدايلها

| بتعدّل القديم (متستخدمهاش على state) | بترجّع نسخة |
|---|---|
| [[push]] | [[[...prev, x]]] |
| [[splice]] | [[filter]] أو [[slice]] |
| [[sort]] | [[toSorted]] (ES2023) |
| [[reverse]] | [[toReversed]] |
| [[obj.x = 1]] | [[{ ...obj, x: 1 }]] |

جرّبنا [[[3, 1, 2].toSorted()]] في Node 24: رجّعت [[[1, 2, 3]]] والأصلية فضلت [[[3, 1, 2]]].

---

## الخلاصة

React مش بتفتش جوه الـ object، بتسأل سؤال واحد: «ده نفس المرجع ولا جديد؟». فأي تغيير لازم يطلّع object أو array جديدة، في كل مستوى في الطريق للحاجة اللي اتغيرت، والباقي يفضل زي ما هو.`,
          lines: [
            "شكل العنصر.",
            "array فاضية ونوعها محدد.",
            "إضافة:",
            "array جديدة فيها القديم وبعدهم العنصر الجديد.",
            "تعديل عنصر:",
            "map بترجع array جديدة، والعنصر المقصود بس بيتعمله نسخة بـ done مقلوبة.",
            "مسح:",
            "filter بترجع array جديدة من غير العنصر ده.",
            "state فيها object جواه object.",
            "تغيير المدينة:",
            "انسخ user، وانسخ address جواه، وغيّر city بس."
          ],
          sol: R`بالنسخة الغلط الـ checkbox مش بيتعلّم. انت عدّلت الـ object القديم ورجّعت نفس الـ array، فـ React قارنت بـ [[Object.is]] ولقت نفس المرجع، فمعملتش render خالص. والأسوأ إن البيانات نفسها اتغيرت فعلًا، فأول ما أي state تانية تعمل render الـ checkbox يتعلّم فجأة، وده bug صعب تتبعه.

بالـ map كل ضغطة بترجع array جديدة فيها object جديد للعنصر اللي اتغير بس، فالـ render بيحصل والباقي زي ما هو بنفس المرجع (وده اللي بيخلي [[memo]] يشتغل صح بعدين).`,
          solCode: R`// غلط: نفس المرجع، React مش هتعيد الرسم
const toggleBad = (id: number) =>
  setTodos(prev => { prev.find(t => t.id === id)!.done = true; return prev })
// صح: array جديدة و object جديد للعنصر اللي اتغير بس
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))`
        },
        {
          cmd: "conditional rendering",
          title: "اعرض حاجة أو خبّيها حسب الحالة",
          desc: R`مفيش [[if]] جوه JSX، فبتستخدم تلات أشكال: early return قبل الـ JSX لحالات زي loading و error، و ternary [[? :]] لما يبقى فيه اختيارين، و [[&&]] لما يبقى حاجة أو لا شيء.

واحذر من [[&&]] مع الأرقام: [[{count && <Badge />}]] لو count صفر هتطبع 0 على الشاشة. خليها [[{count > 0 && <Badge />}]].`,
          example: R`type Order = { id: string; total: number }
function Orders({ orders, isLoading, error }: { orders: Order[]; isLoading: boolean; error?: string }) {
  if (isLoading) return <p>Loading...</p>
  if (error) return <p role="alert">{error}</p>
  return (
    <section>
      {orders.length === 0 ? <p>No orders yet</p> : <OrderTable rows={orders} />}
      {orders.length > 0 && <p>{orders.length} orders</p>}
    </section>
  )
}`,
          try: R`غيّر السطر الأخير لـ [[{orders.length && <p>...</p>}]] وابعت array فاضية: هتلاقي 0 ظاهر على الشاشة.`,
          flag: "script",
          deep: {
            why: "نفس الـ component بيعرض حاجات مختلفة حسب الحالة: بيحمّل، أو فيه خطأ، أو فاضي، أو فيه بيانات. لو نسيت حالة منهم، المستخدم يشوف صفحة فاضية أو تقع.",
            how: R`جوه [[{ }]] بتحط expression. [[false]] و [[null]] و [[undefined]] و [[true]] مبيترسموش، بس الأرقام بتترسم حتى الصفر، والنص الفاضي مش بيبان.

[[a && b]] في JavaScript بترجع a لو كانت falsy. فـ [[0 && <Badge />]] بترجع 0، و React بترسمه. عشان كده خلي الشرط boolean صريح.

الـ early return ([[if (isLoading) return ...]]) بيخلي الـ JSX الرئيسي نضيف. بس لازم يكون بعد كل الـ hooks: لو فيه [[useState]] بعد الـ return، هيتنادى أحيانًا ومش هيتنادى أحيانًا، و React هتقع بـ «Rendered fewer hooks than expected».

والفرق بين تخبية وشيل: الشرط في JSX بيشيل الـ component من الشجرة، فالـ state اللي جواه بتروح. لو عايزه يفضل فاكر (زي تاب فيه فورم متكتب نصه)، خبّيه بـ CSS ([[hidden]])، أو استخدم [[<Activity mode="hidden">]] اللي نزل في React 19.2 وبيخبّي ويحافظ على الـ state.`,
            when: "Loading و error و empty states في كل صفحة بتجيب بيانات، وأجزاء بتظهر حسب صلاحيات المستخدم.",
            mistakes: R`الـ [[0 &&]]. و hooks بعد early return. و ternary جوه ternary جوه ternary: اطلع بيها لمتغير قبل الـ return أو component صغير. وتنسى الـ empty state، فالمستخدم يشوف جدول فاضي ومش عارف هل لسه بيحمّل ولا مفيش بيانات.`
          },
          teach: R`## الفكرة: ٤ حالات، و ٣ أدوات

[[Orders]] بيعرض طلبات، والطلبات ليها ٤ حالات: بتحمّل، أو فيه خطأ، أو مفيش طلبات، أو فيه. المثال بيستخدم early return لأول اتنين، و ternary و [[&&]] للباقي. [[OrderTable]] مش متعرّف في المثال، فعملنا واحد بسيط بيرسم جدول. وعرضنا [[Orders]] بالـ ٤ حالات جنب بعض في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. الـ props

~~~text Orders.tsx
function Orders({ orders, isLoading, error }: { orders: Order[]; isLoading: boolean; error?: string }) {
~~~

[[orders]] لستة الطلبات، و [[isLoading]] بتحمّل ولا لأ، و [[error?]] رسالة خطأ اختيارية (لو مفيش خطأ بتبقى [[undefined]]).

---

## ٢. الـ early return

~~~text Orders.tsx
if (isLoading) return <p>Loading...</p>
if (error) return <p role="alert">{error}</p>
~~~

[[if]] عادي، **قبل** الـ JSX الأساسي. لو الشرط صح، الـ component يرجّع حاجة صغيرة ويخلص، والباقي مبيتنفذش. ده بيخلي الـ JSX الأساسي نضيف ومش محتاج يفكر في الحالات دي.

- [[if (error)]]: نص فاضي و [[undefined]] الاتنين falsy، فالشرط صح بس لو فيه رسالة فعلًا.
- [[role="alert"]]: بيقول لقارئ الشاشة (برنامج المكفوفين) «اقرا ده على طول».

## ٣. الـ ternary

~~~text Orders.tsx
{orders.length === 0 ? <p>No orders yet</p> : <OrderTable rows={orders} />}
~~~

[[شرط ? أ : ب]]: لو الشرط صح [[أ]]، غير كده [[ب]]. مناسب لما يبقى فيه اختيارين، وده expression فينفع جوه [[{ }]].

## ٤. الـ [[&&]]

~~~text Orders.tsx
{orders.length > 0 && <p>{orders.length} orders</p>}
~~~

[[a && b]] في JavaScript: لو [[a]] falsy، النتيجة [[a]] نفسها. لو truthy، النتيجة [[b]]. يعني:

- [[orders.length > 0]] = [[false]]: النتيجة [[false]]، و React مبترسمش [[false]].
- = [[true]]: النتيجة الـ [[<p>]].

مناسب لـ «حاجة أو ولا حاجة».

---

## ٥. الناتج للـ ٤ حالات

~~~text الناتج (Chrome)
loading    <p>Loading...</p>
error      <p role="alert">Network error</p>
empty      <section><p>No orders yet</p></section>
data       <section><table><tbody><tr><td>A1</td><td>250</td></tr><tr><td>A2</td><td>90</td></tr></tbody></table><p>2 orders</p></section>
~~~

- [[loading]] و [[error]]: مفيش [[<section>]] أصلًا، الـ early return رجّع قبلها.
- [[empty]]: الـ ternary اختار [[No orders yet]]، والـ [[&&]] رجّع [[false]] فمفيش حاجة.
- [[data]]: الجدول، و [[2 orders]].

---

## ٦. تجربة «جرّب»: [[orders.length &&]]

شلنا [[> 0]] وبعتنا array فاضية:

~~~text الناتج
bad-empty  <section><p>No orders yet</p>0</section>
~~~

[[0]] ظهر على الشاشة! لأن [[orders.length]] = [[0]]، و [[0]] falsy، فـ [[0 && ...]] رجّعت [[0]] نفسه، و React بترسم الأرقام. اللي مبيترسمش: [[false]] و [[null]] و [[undefined]] و [[true]] بس. الحل شرط boolean صريح ([[> 0]]) زي المثال الأصلي.

---

## ٧. hooks بعد الـ early return

جرّبنا component فيه [[useState]] قبل الـ [[if]] و [[useState]] تاني بعده. أول render ([[isLoading]] = false) نادى الاتنين، ولما بقت true:

~~~text الـ Console
Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
~~~

والصفحة كلها اختفت. React بتعدّ الـ hooks بالترتيب (درس useState)، والـ render ده نادى واحد بدل اتنين. القاعدة: كل الـ hooks فوق، والـ early returns بعدهم.

---

## الخلاصة

| الأداة | إمتى | مثال |
|---|---|---|
| early return | حالة بتغيّر الشاشة كلها | [[if (isLoading) return <Spinner />]] |
| ternary [[? :]] | اختيارين | فاضي ولا جدول |
| [[&&]] | حاجة أو ولا حاجة | [[count > 0 && <Badge />]] |

> [[&&]] مع رقم = خطر. خلي الشرط boolean.`,
          lines: [
            "شكل الطلب.",
            "component بياخد الطلبات وحالة التحميل والخطأ.",
            "early return: لو بيحمّل، اعرض ده بس.",
            "ولو فيه خطأ اعرضه، و [[role=\"alert\"]] عشان قارئ الشاشة يقراه.",
            "الحالة العادية.",
            "بداية الـ section.",
            "ternary: فاضي ولا فيه بيانات.",
            "&& بشرط boolean صريح، عشان الصفر ميظهرش.",
            "قفلة الـ section.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`بـ array فاضية الـ section بيبقى فيه «No orders yet» وجنبها [[0]]. [[0 && <p/>]] نتيجتها [[0]] مش false، و React بترسم الأرقام (بتتجاهل false و null و undefined بس). في React Native ده مش مجرد صفر على الشاشة، ده crash لأن النص لازم يبقى جوه [[<Text>]].

الحل: خلي الشرط boolean صريح، [[orders.length > 0 && ...]] زي المثال الأصلي، أو ternary. ولو شفت [[NaN]] على الشاشة فهو نفس المشكلة مع رقم تاني.`
        },
        {
          cmd: "key",
          title: "ليه كل عنصر في list محتاج مفتاح ثابت",
          desc: R`لما ترسم list بـ [[map]]، كل عنصر لازم ياخد [[key]] فريد وثابت، غالبًا الـ id اللي جاي من البيانات. React بتستخدمه عشان تعرف مين هو مين بين render والتاني.

الـ index كـ key بيبوّظ الدنيا لما الـ list يتغير ترتيبها أو يتمسح منها عنصر: الـ state والكلام المكتوب في input جوه عنصر بيروح لعنصر تاني. جرّب المثال: اكتب في أول خانة وامسح أول عنصر.`,
          example: R`function Row({ name }: { name: string }) {
  const [note, setNote] = useState('')
  return <li>{name} <input value={note} onChange={e => setNote(e.target.value)} /></li>
}
export default function People() {
  const [people, setPeople] = useState([{ id: 1, name: 'Ali' }, { id: 2, name: 'Mona' }])
  return (
    <>
      <button onClick={() => setPeople(p => p.slice(1))}>Remove first</button>
      <ul>{people.map((p, i) => <Row key={i} name={p.name} />)}</ul>
    </>
  )
}`,
          try: R`اكتب «hello» جنب Ali واضغط Remove first: هتلاقي «hello» بقت جنب Mona. غيّر [[key={i}]] لـ [[key={p.id}]] وجرّب تاني.`,
          flag: "script",
          deep: {
            why: "بين render والتاني React لازم تقرر: العنصر ده هو نفسه اللي كان قبل كده (فتحافظ على الـ state والـ DOM بتاعه) ولا جديد؟ من غير key مفيش غير الترتيب، والترتيب بيتغير.",
            how: R`React بتطابق الأولاد القدام بالجداد عن طريق الـ key. في المثال بـ [[key={i}]]: قبل المسح كان key 0 هو Ali و key 1 هو Mona. بعد المسح Mona بقت في index 0، يعني key 0. React تقول «key 0 لسه موجود، يبقى هو نفس الـ Row»، فتحتفظ بالـ state بتاعه (note = hello) وتغيّر الـ prop بس لـ Mona. و key 1 اختفى، فتشيل الـ Row التاني اللي كان فاضي. النتيجة: hello جنب Mona.

بـ [[key={p.id}]]: key 1 (Ali) اختفى فيتشال بالـ state بتاعه، و key 2 (Mona) لسه موجود بـ state بتاعه. مظبوط.

الـ key لازم يكون فريد بين الإخوات بس، مش في التطبيق كله. ومبيوصلش كـ prop للـ component. ولو بترجع أكتر من عنصر لكل item، استخدم [[<Fragment key={id}>]] بدل [[<>]].

والـ key بيتعمل وقت ما البيانات تتعمل (id من الداتابيز، أو [[crypto.randomUUID()]] لما المستخدم يضيف عنصر)، مش وقت الرسم.

والـ index مقبول في حالة واحدة: list ثابتة عمرها ما هتتغير ترتيبها ولا هيتمسح منها، ومفيش state جوه عناصرها.`,
            when: "أي [[map]] بيطلّع JSX. و React بتطلّع warning في الـ console لو نسيته.",
            mistakes: R`[[key={Math.random()}]] أو [[crypto.randomUUID()]] جوه الـ map: key جديد كل render، فكل عنصر بيتشال ويتعمل من الأول، والـ input بيفقد الـ focus مع كل حرف. وفي مشروع حقيقي كان فيه عشرات [[key={index}]]، منها list صور فيها زرار مسح لكل صورة: طول ما مفيش state جوه العنصر الغلط مش باين، وأول ما تضيف loading للصورة أو animation هيظهر على الصورة الغلط.`
          },
          teach: R`## الفكرة: المثال فيه bug مقصود

[[People]] بيعرض شخصين، وكل صف فيه خانة ملاحظة ليها state خاصة بيها. والـ [[key]] متحط غلط ([[key={i}]]) عشان تشوف المشكلة بعينك. اتشغّل في Vite 8.3 + React 19.2 في Chrome headless، والكتابة والضغط بـ Playwright.

---

## ١. [[Row]]: صف ليه ذاكرة

~~~text People.tsx
function Row({ name }: { name: string }) {
  const [note, setNote] = useState('')
  return <li>{name} <input value={note} onChange={e => setNote(e.target.value)} /></li>
}
~~~

[[name]] جاي من الأب. [[note]] state خاصة بكل نسخة من [[Row]]: لو فيه صفين، فيه [[note]] اتنين منفصلين. والخانة controlled: قيمتها من [[note]] وكل حرف بيرجع لها (درس controlled input).

## ٢. [[People]]: الـ list

~~~text People.tsx
const [people, setPeople] = useState([{ id: 1, name: 'Ali' }, { id: 2, name: 'Mona' }])
~~~

array فيها شخصين، كل واحد ليه [[id]] ثابت.

~~~text People.tsx
<button onClick={() => setPeople(p => p.slice(1))}>Remove first</button>
~~~

[[p.slice(1)]] بترجّع array **جديدة** من العنصر رقم 1 لآخرها، يعني من غير الأول. (الترقيم بيبدأ من 0.)

~~~text People.tsx
<ul>{people.map((p, i) => <Row key={i} name={p.name} />)}</ul>
~~~

- [[people.map((p, i) => ...)]]: [[map]] بتدّي الدالة العنصر ([[p]]) ورقمه في الـ array ([[i]]، اختصار index)، وبترجّع array من JSX، و React بترسمها ورا بعض.
- [[key={i}]]: الغلط. المفتاح هو **المكان** مش **الشخص**.
- [[key]] مش prop عادية: React بتاخدها لنفسها ومبتوصلش لـ [[Row]].

---

## ٣. اللي حصل بـ [[key={i}]]

كتبنا [[hello]] جنب Ali وضغطنا Remove first:

~~~text الناتج (Chrome)
typed hello     ["Ali = \"hello\"","Mona = \"\""]
remove first    ["Mona = \"hello\""]
~~~

Ali اتمسح، بس [[hello]] بقت جنب Mona! React بتطابق القديم بالجديد بالـ key:

| key | قبل المسح | بعد المسح | React فهمت إيه |
|---|---|---|---|
| [[0]] | Ali، note = hello | Mona | «key 0 لسه موجود، يبقى نفس الصف». خلّت الـ state (hello) وغيّرت [[name]] بس |
| [[1]] | Mona، note فاضية | (مش موجود) | «key 1 اختفى». شالت الصف التاني بالـ state بتاعته |

يعني React مسحت الصف **الغلط**، لأن الـ key قالها إن اللي اختفى هو التاني.

## ٤. بـ [[key={p.id}]]

~~~text الناتج (Chrome)
typed hello     ["Ali = \"hello\"","Mona = \"\""]
remove first    ["Mona = \"\""]
~~~

| key | قبل | بعد | React فهمت إيه |
|---|---|---|---|
| [[1]] | Ali، hello | (مش موجود) | Ali اتشال، فشالت صفه بالـ hello |
| [[2]] | Mona، فاضية | Mona | نفس الصف، بنفس الـ state |

مظبوط، لأن الـ key ماشي مع **البيانات** مش مع المكان.

## ٥. من غير [[key]] خالص

~~~text الـ Console
Each child in a list should have a unique "key" prop.

Check the render method of $__btPeople$__bt.
~~~

ومن غير key React بتستخدم الترتيب، يعني نفس مشكلة [[key={i}]] بالظبط، بس على الأقل بتحذّرك. [[key={i}]] بيسكّت التحذير ويسيب الـ bug.

---

## الخلاصة

| الـ key | النتيجة |
|---|---|
| [[p.id]] (من البيانات) | صح دايمًا |
| [[i]] (الترتيب) | الـ state بتتنقل لعنصر تاني لو حصل مسح أو ترتيب أو إضافة في النص |
| [[Math.random()]] جوه الـ map | key جديد كل render: كل صف بيتشال ويتعمل من الأول ويفقد الـ state والـ focus |
| مفيش | تحذير، ونفس سلوك الترتيب |`,
          lines: [
            "صف فيه اسم وخانة ملاحظة.",
            "كل صف ليه state خاصة بيه.",
            "الاسم والخانة.",
            "قفلة الصف.",
            "الـ list.",
            "شخصين، كل واحد ليه id ثابت.",
            "بداية الـ JSX.",
            "Fragment عشان الزرار و ul جنب بعض.",
            "امسح أول شخص.",
            "الغلط هنا: key هو الترتيب مش الـ id.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`بـ [[key={i}]]: بعد Remove first هتلاقي «Mona» ومعاها «hello». React شافت إن اللي اتشال هو key [[1]] (آخر واحد)، و key [[0]] لسه موجود، فخلّت الـ state بتاع أول Row (اللي فيه hello) وغيّرت الـ name بس لـ Mona.

بـ [[key={p.id}]]: «Mona» والخانة فاضية، لأن React عرفت إن Row بتاع id 1 هو اللي اتمسح بالـ state بتاعته. القاعدة: الـ key لازم يتبع البيانات مش المكان. الـ index مقبول بس لو الـ list عمرها ما هتترتب أو يتشال منها أو يتضاف في نصها.`
        }
      ]
    },
    {
      t: "الفورمات ومين يملك الـ state",
      l: 1,
      n: "قيمة الـ input في state، والـ state عند أقرب أب محتاجها، والمحسوب ميتخزنش",
      items: [
        {
          cmd: "controlled input",
          title: "خلي قيمة الخانة في إيد React",
          desc: R`الـ controlled input قيمته جاية من state ([[value={email}]]) وكل تغيير بيرجع للـ state ([[onChange]]). كده React هي مصدر الحقيقة: تقدر تتحقق وانت بتكتب، وتعطّل الزرار، وتفضّي الفورم بسطر.

كل نوع input ليه الـ prop بتاعه: [[value]] للنص والـ select والـ textarea، و [[checked]] للـ checkbox والـ radio.`,
          example: R`function SignupForm() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  return (
    <form>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
      <button disabled={!email.includes('@') || !agreed}>Sign up</button>
      <button type="button" onClick={() => { setEmail(''); setAgreed(false) }}>Reset</button>
    </form>
  )
}`,
          try: R`غيّر الـ onChange لـ [[setEmail(e.target.value.trim())]] وخلّي الخانة مؤقتًا [[type="text"]] (الـ email input بيشيل المسافات اللي في الأطراف لوحده، فمش هيبان فيه)، وحاول تكتب «a b»: مش هتعرف تكتب المسافة. ده ليه الـ trim مكانه وقت الإرسال.`,
          flag: "script",
          deep: {
            why: "لما القيمة في state، أي حتة في الـ component تقدر تقراها وانت بتكتب: تعطّل زرار، أو تعرض عدد الحروف، أو تفلتر list، أو تفضّي الفورم بعد الإرسال. لو القيمة في الـ DOM بس، لازم تروح تقراها منه.",
            how: R`مع كل حرف: المتصفح بيغيّر الخانة، و onChange بيتنادى، و setEmail بتحدّث الـ state، و React تعمل render وتحط [[value]] الجديدة. ولو الـ onChange رفض التغيير (مثلًا منع الأرقام)، React هترجّع القيمة القديمة للخانة.

لو حطيت [[value]] من غير onChange، الخانة بتبقى read-only و React بتحذّرك. ولو [[value]] بدأت [[undefined]] (مثلًا [[user?.name]] قبل ما البيانات توصل) وبعدين بقت نص، React بتحذّرك إن الـ input اتحوّل من uncontrolled لـ controlled. الحل [[value={name ?? ''}]].

لفورم فيه خانات كتير، handler واحد بيكفي: كل input ليه [[name]]، و [[setForm(f => ({ ...f, [e.target.name]: e.target.value }))]]. و [[e.target.value]] دايمًا string حتى في [[type="number"]]، فحوّلها بـ [[Number()]].

وكل حرف معناه render للـ component. ده عادي لفورم صغير. في فورم كبير أو input جوه صفحة تقيلة، react-hook-form (المستوى التاني) بيقلل الـ renders.`,
            when: "لما تحتاج القيمة وانت بتكتب: validation لحظي، أو زرار يتفعّل ويتقفل، أو search بيفلتر. ولو محتاجها وقت الإرسال بس، uncontrolled أبسط (المستوى التاني).",
            mistakes: R`[[trim()]] أو تنسيق في الـ onChange بيمنع المستخدم يكتب طبيعي. و [[value]] بتبدأ undefined. و [[value]] على checkbox بدل [[checked]]. والـ validation في المتصفح بس: السيرفر لازم يتحقق تاني، لأن أي حد يقدر يبعت request من غير الفورم.`
          },
          teach: R`## الفكرة: خانتين في state، وزرار بيتفعّل منهم

[[SignupForm]] فيه خانة إيميل و checkbox موافقة. القيمتين في state، فالزرار يقدر يقرر يتفعّل ولا لأ وانت بتكتب، و Reset يفضّيهم بسطر. اتشغّل في Vite 8.3 + React 19.2 في Chrome headless، والكتابة بـ Playwright حرف حرف زي الكيبورد.

---

## ١. الـ state

~~~text SignupForm.tsx
const [email, setEmail] = useState('')
const [agreed, setAgreed] = useState(false)
~~~

قيمة لكل خانة: نص فاضي للإيميل، و [[false]] للـ checkbox.

---

## ٢. خانة الإيميل

~~~text SignupForm.tsx
<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
~~~

الدايرة اللي بتحصل مع كل حرف:

1. انت بتكتب حرف، والمتصفح بيغيّر الخانة.
2. [[onChange]] بيتنادى، و [[e.target.value]] فيها النص الجديد كله.
3. [[setEmail(...)]] بتحفظه في الـ state، و React بتعمل render.
4. [[value={email}]] بيحط القيمة دي في الخانة.

يعني الخانة بتعرض **اللي في الـ state بس**. ده معنى controlled: React هي اللي ماسكة القيمة، مش المتصفح.

## ٣. الـ checkbox

~~~text SignupForm.tsx
<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
~~~

نفس الدايرة، بس الـ checkbox قيمته [[checked]] (true أو false) مش [[value]]. ولاحظ [[e.target.checked]] مش [[e.target.value]].

---

## ٤. الزرار

~~~text SignupForm.tsx
<button disabled={!email.includes('@') || !agreed}>Sign up</button>
~~~

من جوه لبرة:

- [[email.includes('@')]]: النص فيه [[@]]؟ [[true]] أو [[false]].
- [[!]] قدامها: اقلبها. يعني «مفيهوش @».
- [[!agreed]]: «مش موافق».
- [[||]]: «أو». فالزرار [[disabled]] لو الإيميل مفيهوش @ **أو** مش موافق.

وده بيتحسب من جديد مع كل render، يعني مع كل حرف.

## ٥. Reset

~~~text SignupForm.tsx
<button type="button" onClick={() => { setEmail(''); setAgreed(false) }}>Reset</button>
~~~

- [[type="button"]]: عشان ميبعتش الفورم (درس events).
- [[() => { ...; ... }]]: arrow function فيها أكتر من سطر، فبين [[{ }]] و [[;]] بينهم. والاتنين set بيعملوا render واحد (batching).

---

## ٦. اللي حصل

~~~text الناتج (Chrome)
initial          email=""            checked=false  SignUp disabled=true
typed sara       email="sara"        checked=false  SignUp disabled=true
typed @x.com     email="sara@x.com"  checked=false  SignUp disabled=true
checked          email="sara@x.com"  checked=true   SignUp disabled=false
reset            email=""            checked=false  SignUp disabled=true
~~~

الزرار اتفعّل بس لما الشرطين اتحققوا، و Reset رجّع كله في ضغطة.

---

## ٧. تجربة «جرّب»: [[trim()]] في الـ onChange

غيّرنا الخانة لـ [[type="text"]] والـ onChange لـ [[setEmail(e.target.value.trim())]]، وكتبنا [[a b]]:

~~~text الناتج
value after typing "a b": "ab"
~~~

بعد [[a]] ومسافة، الـ onChange استلم [[a ]] (بمسافة)، و [[trim]] شالها، فالـ state بقت [[a]]، فالخانة رجعت [[a]]. المسافة اتكتبت واتمسحت في نفس اللحظة. التنضيف مكانه وقت الإرسال (الـ solCode).

---

## ٨. تحذيرين هتشوفهم

~~~text الـ Console
You provided a $__btvalue$__bt prop to a form field without an $__btonChange$__bt handler. This will render a read-only field. ...
~~~

ده لما تكتب [[value="..."]] من غير [[onChange]]: الخانة مش هتتكتب فيها خالص.

~~~text الـ Console
A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, ...
~~~

ده لما [[value={user?.name}]] تبدأ [[undefined]] (البيانات لسه موصلتش) وبعدين تبقى نص. [[value={undefined}]] بالنسبة لـ React يعني «مش controlled». الحل: [[value={user?.name ?? ''}]]، و [[??]] معناها «لو اللي قبلي [[null]] أو [[undefined]] خد اللي بعدي».

---

## الخلاصة

| النوع | الـ prop | من الـ event |
|---|---|---|
| text و email و textarea و select | [[value]] | [[e.target.value]] |
| checkbox و radio | [[checked]] | [[e.target.checked]] |

> [[value]] + [[onChange]] دايمًا مع بعض، والقيمة الأولى عمرها ما تبقى [[undefined]].`,
          lines: [
            "فورم تسجيل.",
            "الإيميل في state.",
            "والموافقة على الشروط في state.",
            "بداية الـ JSX.",
            "بداية الفورم.",
            "value من الـ state، وكل حرف يرجع لها.",
            "الـ checkbox بيستخدم checked، والقيمة من [[e.target.checked]].",
            "الزرار يتفعّل بس لما الإيميل شكله صح والشروط متعلّمة.",
            "Reset يفضّي الاتنين. ومن غير [[type=\"button\"]] كان هيبعت الفورم.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`هتكتب «a» وبعدين space فتختفي على طول، وبعدين «b»، فالقيمة [[ab]]. كل ضغطة بتعدّي على trim، والمسافة في آخر النص بتتشال قبل ما تترسم، والخانة بتعرض القيمة اللي في الـ state بس. (لو رجعت بالمؤشر لنص الكلام وكتبت space هتتكتب، لأنها مش في الطرف.)

ده بيوريك إن الـ controlled input معناه إن الـ state هي الحقيقة الوحيدة: أي تحويل في onChange بيتطبّق على كل حرف. خزّن اللي المستخدم كتبه زي ما هو، ونضّفه وقت الـ submit.`,
          solCode: R`<input type="email" value={email} onChange={e => setEmail(e.target.value)} />
// ووقت الإرسال:
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  signup({ email: email.trim(), agreed })
}`
        },
        {
          cmd: "lifting state up",
          title: "اتنين components محتاجين نفس القيمة",
          desc: R`لو component محتاج state، و component تاني جنبه محتاج نفس القيمة، ارفع الـ state لأقرب أب مشترك. الأب يملك القيمة ويبعتها للاتنين props، ويبعت دالة التغيير للي بيعدّل.

كده فيه مصدر حقيقة واحد، والاتنين دايمًا متفقين. البيانات بتنزل كـ props، والتغييرات بتطلع كـ callbacks.`,
          example: R`const FilterBar = ({ query, onQueryChange }: { query: string; onQueryChange: (q: string) => void }) =>
  <input value={query} onChange={e => onQueryChange(e.target.value)} placeholder="Search" />
function ProductList({ query }: { query: string }) {
  const visible = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  return <ul>{visible.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}
export default function Shop() {
  const [query, setQuery] = useState('')
  return (
    <main>
      <FilterBar query={query} onQueryChange={setQuery} />
      <ProductList query={query} />
    </main>
  )
}`,
          try: R`عرّف [[PRODUCTS]] كـ array فيها ٥ منتجات بـ id و name. بعدين جرّب تحط [[useState]] جوه FilterBar بدل Shop، وشوف إن ProductList مبقاش يعرف حاجة.`,
          flag: "script",
          deep: {
            why: "الإخوات مبيكلموش بعض في React. البيانات بتمشي في اتجاه واحد من فوق لتحت. فلو اتنين محتاجين نفس القيمة، لازم تبقى عند حد فوقهم الاتنين. ولو كل واحد عمل نسخة لنفسه، هيختلفوا أول ما واحد يتغير.",
            how: R`الخطوات: شيل الـ state من الابن، وحطها في الأب، وابعت القيمة للابن كـ prop، وابعت دالة يناديها لما عايز يغيّر. كده الابن بقى «controlled» من الأب، زي الـ input بالظبط.

تختار الأب إزاي؟ شوف كل الـ components اللي بتقرا القيمة، وأقرب أب مشترك ليهم هو المكان. متطلعش أعلى من كده من غير سبب.

والعكس مهم كمان (state colocation): لو قيمة component واحد بس اللي بيستخدمها، خليها عنده. كل state في أب عالي معناها إن تغييرها بيعمل render لكل اللي تحته. dropdown مفتوح ولا لأ مكانه جوه الـ dropdown، مش في App.

ولما الأب المشترك يبقى بعيد أوي والقيمة بتعدّي على مستويات كتير مبتستخدمهاش (prop drilling)، الحلول بالترتيب: composition (تبعت JSX جاهز)، وبعدين context، وبعدين store زي Zustand. كلهم في المستوى التاني.`,
            when: "فلتر وجدول، أو تابات ومحتوى، أو فورم من كذا خطوة، أو أي حتتين في الشاشة لازم يفضلوا متزامنين.",
            mistakes: R`نسختين من نفس القيمة في مكانين، و [[useEffect]] بيحاول يزامنهم: هيفضلوا يتلخبطوا. وترفع كل حاجة لـ store عام «احتياطي» فكل تغيير صغير يعيد رسم نص التطبيق. والتسمية: الـ prop اسمها [[onQueryChange]] (حدث حصل)، مش [[setQuery]]، عشان الابن ميعرفش الأب بيخزّن إزاي.`
          },
          teach: R`## الفكرة: الخانة والـ list إخوات، والقيمة عند الأب

[[FilterBar]] فيه خانة بحث، و [[ProductList]] بيعرض المنتجات اللي اسمها فيه الكلمة. الاتنين محتاجين نفس الكلمة، فهي عند أبوهم [[Shop]]. استخدمنا [[PRODUCTS]] اللي في الـ solCode (٥ منتجات)، واتشغّل في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. [[FilterBar]]: من غير state

~~~text Shop.tsx
const FilterBar = ({ query, onQueryChange }: { query: string; onQueryChange: (q: string) => void }) =>
  <input value={query} onChange={e => onQueryChange(e.target.value)} placeholder="Search" />
~~~

- الـ component هنا arrow function متخزنة في [[const]] بدل [[function]]. نفس الحاجة. والـ JSX بعد [[=>]] على طول من غير [[return]] ولا [[{ }]]، لأن الـ arrow اللي جسمها expression واحد بترجّعه لوحدها.
- [[query]]: القيمة جاية من الأب، مش من [[useState]] هنا.
- [[onQueryChange]]: دالة الأب. الخانة مش بتغيّر حاجة بنفسها، بتبلّغ بس: «المستخدم كتب كذا».
- [[placeholder]]: النص الرمادي اللي بيظهر والخانة فاضية.

يعني [[FilterBar]] controlled من الأب، زي ما الـ [[<input>]] controlled من الـ state.

## ٢. [[ProductList]]

~~~text Shop.tsx
function ProductList({ query }: { query: string }) {
  const visible = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  return <ul>{visible.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}
~~~

من جوه لبرة في سطر الـ [[filter]]:

1. [[p.name.toLowerCase()]]: اسم المنتج بحروف صغيرة ([[Phone]] تبقى [[phone]]).
2. [[query.toLowerCase()]]: كلمة البحث بحروف صغيرة.
3. [[.includes(...)]]: الاسم فيه الكلمة؟ فالبحث مش بيفرق بين كبير وصغير.
4. [[PRODUCTS.filter(...)]]: array جديدة باللي الشرط صح ليهم بس.

و [[visible]] بيتحسب وقت الرسم، مش state (درس derived state الجاي). وبعدين [[map]] لـ [[<li>]] بـ [[key={p.id}]].

## ٣. [[Shop]]: صاحب الـ state

~~~text Shop.tsx
export default function Shop() {
  const [query, setQuery] = useState('')
  return (
    <main>
      <FilterBar query={query} onQueryChange={setQuery} />
      <ProductList query={query} />
    </main>
  )
}
~~~

- [[query]] هنا بس، مرة واحدة.
- الخانة بتاخد القيمة و [[setQuery]] كـ [[onQueryChange]]. يعني لما الخانة تنادي [[onQueryChange('ph')]]، ده فعليًا [[setQuery('ph')]].
- الـ list بتاخد نفس القيمة.

### مع كل حرف

1. [[FilterBar]] بينادي [[onQueryChange('p')]].
2. [[Shop]] بيعمل render بـ [[query = 'p']].
3. الاتنين بيترسموا تاني بنفس القيمة الجديدة. مستحيل يختلفوا.

---

## ٤. اللي حصل

~~~text الناتج (Chrome)
initial      ["Laptop","Phone","Headphones","Keyboard","Mouse"]
typed "ph"   ["Phone","Headphones"]
typed "PH"   ["Phone","Headphones"]
cleared      ["Laptop","Phone","Headphones","Keyboard","Mouse"]
~~~

[[PH]] بحروف كبيرة طلّعت نفس النتيجة بسبب [[toLowerCase]] في الناحيتين.

## ٥. تجربة «جرّب»: الـ state جوه الخانة

بدّلنا [[FilterBar]] بـ [[FilterBarAlone]] (اللي في الـ solCode، فيه [[useState]] خاص بيه):

~~~text الناتج (Chrome)
initial      ["Laptop","Phone","Headphones","Keyboard","Mouse"]
typed "ph"   ["Laptop","Phone","Headphones","Keyboard","Mouse"]
~~~

الكتابة شغالة في الخانة، بس الـ list مش حاسة. [[query]] بتاعة الخانة محبوسة جواها، و [[ProductList]] لسه بياخد [[query]] بتاعة [[Shop]] اللي فضلت فاضية. ومفيش طريقة في React إن أخ يكلم أخوه مباشرة.

---

## الخلاصة

| الدور | مين | بياخد إيه |
|---|---|---|
| صاحب الـ state | أقرب أب مشترك ([[Shop]]) | [[useState]] |
| اللي بيعرض | [[ProductList]] | القيمة كـ prop |
| اللي بيغيّر | [[FilterBar]] | القيمة + دالة يبلّغ بيها ([[onQueryChange]]) |

البيانات بتنزل كـ props، والتغييرات بتطلع كـ callbacks.`,
          lines: [
            "FilterBar مبقاش عنده state: بياخد القيمة ودالة التغيير من الأب.",
            "الخانة بتعرض query وتبلّغ الأب بأي تغيير.",
            "ProductList بياخد نفس القيمة.",
            "بيفلتر بيها وقت الرسم.",
            "ويعرض النتيجة.",
            "قفلة ProductList.",
            "الأب المشترك.",
            "هو صاحب الـ state.",
            "بداية الـ JSX.",
            "عنصر يلم الاتنين.",
            "بيبعت القيمة والـ setter للخانة.",
            "وبيبعت نفس القيمة للـ list.",
            "قفلة main.",
            "قفلة القوس.",
            "قفلة Shop."
          ],
          sol: R`بالنسخة الصح لو كتبت [[ph]] هتفضل Phone و Headphones بس، وأول ما تمسح يرجع الخمسة. Shop هو اللي شايل [[query]] وبيوزعها: FilterBar ياخدها ويبلّغ بالتغيير، و ProductList ياخدها ويفلتر.

لما تنقل الـ state جوه FilterBar الكتابة بتشتغل عادي، بس ProductList بيعرض الخمسة دايمًا مهما كتبت، لأن القيمة بقت محبوسة جوه FilterBar ومفيش طريق توصل منه لأخوه. الـ data في React بتنزل من الأب للابن بس، فأي قيمة محتاجها اتنين لازم تطلع لأقرب أب مشترك.`,
          solCode: R`const PRODUCTS = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Phone' },
  { id: 3, name: 'Headphones' },
  { id: 4, name: 'Keyboard' },
  { id: 5, name: 'Mouse' },
]
// النسخة الغلط: الـ state جوه FilterBar
function FilterBarAlone() {
  const [query, setQuery] = useState('')
  return <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" />
}`
        },
        {
          cmd: "derived state",
          title: "متخزنش في الـ state حاجة تقدر تحسبها",
          desc: R`لو قيمة تقدر تحسبها من props أو state موجودة، احسبها وقت الرسم ومتحطهاش في state تانية: [[fullName]] من الاسم الأول والأخير، و [[total]] من عناصر السلة، والـ list المفلترة من الـ list والبحث.

كل state زيادة لازم تفضل متزامنة مع الأصل، ودي من أشهر مصادر الـ bugs: تعدّل الأصل وتنسى النسخة. والحساب وقت الرسم رخيص، ولو تقيل فعلًا فيه [[useMemo]].`,
          example: R`type Item = { price: number; qty: number }
function Cart({ items }: { items: Item[] }) {
  const [coupon, setCoupon] = useState('')
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discount = coupon === 'SAVE10' ? subtotal * 0.1 : 0
  const total = subtotal - discount
  return (
    <div>
      <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon" />
      <p>Total: {total.toFixed(2)}</p>
    </div>
  )
}`,
          try: R`اكتبها بالطريقة الغلط: [[const [total, setTotal] = useState(0)]] و [[useEffect(() => setTotal(...), [items, coupon])]]. حط [[console.log]] في الـ render وشوف إنه بقى بيترسم مرتين، والمرة الأولى بالقيمة القديمة.`,
          flag: "script",
          deep: {
            why: "state زيادة معناها مكانين للحقيقة. أول ما حد يغيّر items وينسى يحدّث total، الشاشة تكدب. لما total محسوب، مستحيل يبقى غلط، لأنه بيتحسب من جديد في كل render.",
            how: R`الـ component بيتنادى من الأول مع كل render، فأي [[const]] جواه بيتحسب من أحدث props و state. مفيش حاجة تتزامن.

الطريقة الغلط (state و useEffect بيحدّثها) بتعمل كده: render بـ total القديم، والشاشة تترسم بيه، وبعدين الـ effect يشتغل ويعمل setTotal، فـ render تاني بالقيمة الصح. يعني render زيادة، ولحظة المستخدم ممكن يشوف فيها رقم غلط، وكود أكتر.

نفس الفكرة في حاجة بتتكرر كتير: متخزنش العنصر المختار نفسه ([[selectedProduct]]) لو الـ list ممكن تتحدث. خزّن [[selectedId]] واحسب العنصر: [[products.find(p => p.id === selectedId)]]. لو خزّنت الـ object، والـ list اتحدثت من السيرفر، هتفضل ماسك نسخة قديمة.

ولو الحساب تقيل فعلًا (آلاف العناصر مع sort)، [[useMemo]] بيحفظ النتيجة لحد ما المدخلات تتغير. بس ده تحسين أداء، مش سبب تحطها في state.`,
            when: "أي قيمة معتمدة بالكامل على قيم تانية: مجاميع، وفلاتر، وعدادات، و [[isValid]] للفورم، و [[isEmpty]].",
            mistakes: R`[[useEffect]] كل شغلته setState لقيمة محسوبة. وتخزين الـ object المختار بدل الـ id. و state اسمها [[isEmpty]] جنب [[items]]. وتنسخ prop في state ([[useState(props.items)]]) فتفضل على القيمة الأولى للأبد.`
          },
          teach: R`## الفكرة: state واحدة، و ٣ أرقام محسوبة

[[Cart]] بيعرض إجمالي السلة بعد الخصم. فيه قيمة واحدة بس بتتغير من جوه الـ component: الكوبون اللي المستخدم بيكتبه. الباقي (المجموع، والخصم، والإجمالي) كله محسوب. وعشان نقارن، كتبنا كمان النسخة الغلط اللي في «جرّب» وشغّلنا الاتنين بنفس الخطوات في Vite 8.3 + React 19.2 (وضع التطوير) في Chrome headless.

---

## ١. الـ props والـ state

~~~text Cart.tsx
type Item = { price: number; qty: number }
function Cart({ items }: { items: Item[] }) {
  const [coupon, setCoupon] = useState('')
~~~

- [[items]]: جاية من الأب. كل عنصر سعره ([[price]]) وعدده ([[qty]]، اختصار quantity).
- [[coupon]]: الـ state الوحيدة، لأنها الحاجة الوحيدة اللي مش ممكن تتحسب من حاجة تانية.

## ٢. الحسابات

~~~text Cart.tsx
const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
const discount = coupon === 'SAVE10' ? subtotal * 0.1 : 0
const total = subtotal - discount
~~~

### [[reduce]]

[[items.reduce(fn, 0)]] بتلف على العناصر وتجمّعهم في قيمة واحدة. [[0]] قيمة البداية، والدالة بتاخد اللي اتجمع لحد دلوقتي ([[sum]]) والعنصر الحالي ([[i]])، وترجّع المجموع الجديد. لسلة فيها عنصر واحد [[{ price: 10, qty: 2 }]]:

| الخطوة | [[sum]] | [[i.price * i.qty]] | الراجع |
|---|---|---|---|
| البداية | 0 | | |
| العنصر الأول | 0 | 10 × 2 = 20 | 20 |

### الخصم والإجمالي

- [[coupon === 'SAVE10' ? subtotal * 0.1 : 0]]: لو الكوبون صح، الخصم ١٠٪ ([[0.1]])، غير كده صفر.
- [[subtotal - discount]]: الإجمالي.

التلاتة [[const]]: بيتحسبوا من الأول في **كل** render من أحدث [[items]] و [[coupon]]. مفيش حاجة محتاجة «تتحدّث».

## ٣. العرض

~~~text Cart.tsx
<input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon" />
<p>Total: {total.toFixed(2)}</p>
~~~

[[toFixed(2)]]: رقمين بعد العلامة العشرية كنص، فـ [[27]] تبقى [[27.00]].

---

## ٤. اللي حصل: الصح

بدأنا بعنصر واحد (20)، ضفنا عنصر بـ 10، وكتبنا [[SAVE10]]. وحطينا [[console.log('render good', total)]] في الـ component:

~~~text الـ Console (الصح)
render good 20
render good 20
>> add item
render good 30
render good 30
>> coupon SAVE10
render good 27
render good 27
~~~

كل تغيير = render واحد بالرقم الصح على طول. (كل سطر متكرر مرتين لأن [[<StrictMode>]] في التطوير بينادي الـ component مرتين، درس useState.) و 27 = 30 - 3.

## ٥. اللي حصل: الغلط

~~~text CartBad.tsx
const [total, setTotal] = useState(0)
useEffect(() => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  setTotal(subtotal - (coupon === 'SAVE10' ? subtotal * 0.1 : 0))
}, [items, coupon])
~~~

[[useEffect]] (درسه في القسم الجاي) بيشغّل الدالة **بعد** ما الشاشة تترسم، كل ما [[items]] أو [[coupon]] يتغيروا.

~~~text الـ Console (الغلط)
render bad 0
render bad 0
render bad 20
render bad 20
>> add item
render bad 20
render bad 20
render bad 30
render bad 30
>> coupon SAVE10
render bad 30
render bad 30
render bad 27
render bad 27
~~~

كل تغيير بقى render **اتنين**، والأول بالرقم القديم:

1. [[items]] اتغيرت، فـ render. [[total]] لسه 20، والشاشة اترسمت بـ 20.
2. بعد الرسم الـ effect اشتغل وعمل [[setTotal(30)]].
3. render تاني بـ 30.

يعني فيه لحظة الشاشة بتقول 20 والسلة فيها 30. والأول خالص بيقول [[0]]. والكود أطول.

---

## الخلاصة

| | محسوب ([[const]]) | state + effect |
|---|---|---|
| renders لكل تغيير | 1 | 2 |
| الرقم في أول render | صح | قديم |
| ممكن يبقى مش متزامن | لأ | لو حد نسي dependency |

> السؤال قبل أي [[useState]]: «أقدر أحسبها من props أو state موجودة؟» لو أيوه، [[const]].`,
          lines: [
            "شكل العنصر في السلة.",
            "component السلة.",
            "الـ state الوحيدة هنا: الكوبون اللي المستخدم بيكتبه.",
            "المجموع محسوب من items. مش state.",
            "الخصم محسوب من الكوبون والمجموع.",
            "والنهائي محسوب من الاتنين.",
            "بداية الـ JSX.",
            "بداية الـ div.",
            "خانة الكوبون.",
            "الرقم بيتحسب من جديد مع كل render، فمستحيل يبقى قديم.",
            "قفلة الـ div.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`بالطريقة الغلط هتشوف في الـ console حاجة زي [[render 0]] ثم [[render 20]] أول ما الصفحة تفتح، ولما الـ items تتغير [[render 20]] ثم [[render 30]]. يعني كل تغيير = render بالقيمة القديمة، وبعدين effect يعمل set، وبعدين render تاني بالصح. الـ render الأول ده ممكن يبان للمستخدم كـ flash لرقم غلط، وفي Strict Mode العدد بيتضاعف.

بالحساب وقت الرسم ([[const total = ...]]) كل تغيير = render واحد بالرقم الصح على طول، ومفيش state محتاجة تتزامن. لو الحساب تقيل فعلًا لفّه في [[useMemo]]، بس برضه مش state.`
        }
      ]
    },
    {
      t: "الـ effects والـ refs",
      l: 2,
      n: "effect بيزامن الـ component مع حاجة برا React، و ref بيفتكر من غير ما يعيد الرسم",
      items: [
        {
          cmd: "useEffect",
          title: "زامن الـ component مع حاجة برا React",
          desc: R`[[useEffect]] بيشغّل كود بعد ما الشاشة تترسم، عشان تتعامل مع حاجات برا React: اتصال WebSocket، أو event على الـ window، أو timer، أو مكتبة بتلمس الـ DOM بنفسها.

بياخد دالة و dependency array. الدالة ممكن ترجّع cleanup بيتنفذ قبل ما الـ effect يشتغل تاني وقبل ما الـ component يتشال. فكّر فيه كـ «ابدأ المزامنة» و «وقّفها»، مش كـ «اعمل ده أول ما الـ component يظهر».`,
          example: R`function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([])
  useEffect(() => {
    const socket = new WebSocket($__btwss://example.com/rooms/$__{roomId}$__bt)
    socket.onmessage = e => setMessages(prev => [...prev, { id: crypto.randomUUID(), text: String(e.data) }])
    console.log('connect', roomId)
    return () => {
      socket.close()
      console.log('disconnect', roomId)
    }
  }, [roomId])
  return <ul>{messages.map(m => <li key={m.id}>{m.text}</li>)}</ul>
}`,
          try: R`اعمل أب فيه زرارين بيغيّروا roomId بين «general» و «sales»، وافتح الـ console: كل تغيير هتشوف disconnect للقديم و connect للجديد. ولاحظ إن أول مرة بتظهر connect و disconnect و connect: ده Strict Mode.`,
          flag: "script",
          deep: {
            why: "الـ render لازم يبقى pure: يحسب الشاشة وبس. بس التطبيق محتاج يعمل حاجات جانبية: يفتح اتصال، أو يسمع لـ event، أو يشغّل timer. [[useEffect]] هو المكان اللي React بتقولك فيه «الشاشة اترسمت، اعمل اللي انت عايزه، وقولي أقفله إزاي».",
            how: R`الترتيب: render، وبعدين commit (تعديل الـ DOM)، والمتصفح يرسم، وبعدها الـ effects تشتغل. عشان كده الـ effect مبيأخرش ظهور الشاشة.

الـ dependency array بتحدد إمتى يشتغل تاني: من غيرها بعد كل render، و [[[]]] مرة واحدة بعد أول ظهور، و [[[roomId]]] كل ما roomId يتغير (بمقارنة [[Object.is]]). ولما يشتغل تاني، React بتنادي الـ cleanup بتاع المرة اللي فاتت الأول بالـ roomId القديم، وبعدين الـ effect الجديد بالـ roomId الجديد. كل render ليه effect خاص بيه شايف قيم الـ render ده (closure).

في التطوير، [[<StrictMode>]] بيعمل mount وبعدين unmount وبعدين mount تاني لكل component. ده مقصود: لو الـ cleanup ناقص، هتشوف المشكلة (اتصالين مفتوحين، أو listener متسجل مرتين) وانت بتطوّر مش في الإنتاج. في الـ build العادي بيشتغل مرة واحدة.

ولو اللي بتزامن معاه «store» بيتغير لوحده (زي [[navigator.onLine]] أو [[matchMedia]])، فيه hook مخصوص اسمه [[useSyncExternalStore]]، وهو اللي Zustand مبني عليه.`,
            when: "اتصالات (WebSocket و EventSource)، و listeners على window أو document، و timers، ومكتبات بتمسك DOM بنفسها (خرائط، أو charts مش React)، و analytics لما صفحة تظهر.",
            mistakes: R`تنسى الـ cleanup: listeners بتتكرر، واتصالات مفتوحة، و memory leak. و [[useEffect(async () => {...})]]: الدالة الـ async بترجع promise مش cleanup، فاعمل دالة async جوه وناديها. وتقفل تحذير الـ linter بـ [[eslint-disable-next-line react-hooks/exhaustive-deps]] (الدرس الجاي). وفي مشروع حقيقي كان فيه effect في الـ ProtectedRoute كل شغلته [[console.log]] لبيانات المستخدم مع كل تغيير صفحة: effect ملوش لازمة وبيطبع بيانات شخصية في الـ console.`
          },
          teach: R`## الفكرة: «افتح اتصال» و «اقفله»

[[ChatRoom]] بيفتح اتصال WebSocket بأوضة شات، ويضيف أي رسالة توصل للـ list. ولما الأوضة تتغير أو الـ component يتشال، لازم يقفل الاتصال القديم. ده كله في [[useEffect]] واحد. استخدمنا الأب اللي في الـ solCode (زرارين general و sales)، واتشغّل في Vite 8.3 + React 19.2 في Chrome headless مرتين: وضع التطوير ([[npm run dev]]) وبعد [[vite build]] ([[vite preview]]).

---

## ١. الـ state

~~~text ChatRoom.tsx
const [messages, setMessages] = useState<{ id: string; text: string }[]>([])
~~~

array رسايل، كل واحدة ليها [[id]] و [[text]]. النوع مكتوب جوه [[< >]] لأن [[[]]] الفاضية متقولش هتشيل إيه.

## ٢. [[useEffect(دالة, [roomId])]]

[[useEffect]] بياخد حاجتين:

1. **دالة**: بتشتغل **بعد** ما React ترسم الشاشة.
2. **dependency array** [[[roomId]]]: «شغّل الدالة تاني بس لو [[roomId]] اتغير».

### جوه الدالة

~~~text ChatRoom.tsx
const socket = new WebSocket($__btwss://example.com/rooms/$__{roomId}$__bt)
~~~

[[WebSocket]] اتصال مفتوح على طول بين المتصفح والسيرفر، الاتنين يقدروا يبعتوا فيه في أي وقت. و [[wss://]] زي [[https://]] بس لـ WebSocket (الـ s للتشفير). والـ URL template literal فيه [[roomId]]، فكل أوضة ليها عنوان.

~~~text ChatRoom.tsx
socket.onmessage = e => setMessages(prev => [...prev, { id: crypto.randomUUID(), text: String(e.data) }])
~~~

- [[onmessage]]: دالة بتتنادى مع كل رسالة توصل، و [[e.data]] محتواها.
- [[setMessages(prev => ...)]]: updater، لأن الدالة دي بتشتغل بعدين، و [[messages]] اللي شايفاها ممكن تبقى قديمة. [[prev]] دايمًا الأحدث.
- [[crypto.randomUUID()]]: id عشوائي فريد للـ key، بيتعمل **وقت ما الرسالة توصل** مش وقت الرسم (درس key).
- [[String(e.data)]]: حوّل المحتوى لنص.

~~~text ChatRoom.tsx
console.log('connect', roomId)
~~~

علامة عشان نشوف إمتى الـ effect اشتغل.

### الـ cleanup: الدالة اللي بترجع

~~~text ChatRoom.tsx
return () => {
  socket.close()
  console.log('disconnect', roomId)
}
~~~

الدالة اللي الـ effect بيرجّعها React بتحفظها وتناديها:

- **قبل** ما الـ effect يشتغل تاني (الأوضة اتغيرت).
- لما الـ component يتشال من الشاشة.

وهي شايفة [[socket]] و [[roomId]] بتوع المرة دي (closure)، فبتقفل الاتصال **القديم** بالظبط.

---

## ٣. اللي حصل في التطوير

ضغطنا sales، وبعدين sales تاني، وبعدين general (الـ WebSocket errors شلناها هنا، تحت):

~~~text الـ Console (npm run dev)
connect general
disconnect general
connect general
>> click sales
disconnect general
connect sales
>> click sales again
>> click general
disconnect sales
connect general
~~~

- **أول ٣ سطور**: [[<StrictMode>]] في التطوير بيركّب الـ component، ويشيله، ويركّبه تاني. ده اختبار مقصود: لو الـ cleanup ناقص هتشوف اتصالين مفتوحين على طول.
- **sales**: الـ cleanup القديم الأول ([[disconnect general]])، وبعدين الجديد ([[connect sales]]).
- **sales تاني**: ولا سطر. [[roomId]] متغيرش ([[Object.is('sales', 'sales')]] = true)، فالـ effect مشتغلش.

## ٤. بعد الـ build

~~~text الـ Console (vite build + vite preview)
connect general
>> click sales
disconnect general
connect sales
>> click sales again
>> click general
disconnect sales
connect general
~~~

نفس الكلام من غير الـ mount التاني بتاع Strict Mode: [[connect general]] مرة واحدة في الأول.

## ٥. الـ errors

~~~text الـ Console
WebSocket connection to 'wss://example.com/rooms/general' failed: WebSocket is closed before the connection is established.
WebSocket connection to 'wss://example.com/rooms/general' failed: Error during WebSocket handshake: Unexpected response code: 404
~~~

[[example.com]] مش سيرفر شات، فالاتصال بيفشل بـ [[404]]. والأولى جت من Strict Mode: الـ cleanup قفل الاتصال الأول قبل ما يكمّل. عادي في التجربة.

## ٦. من غير الـ cleanup

شلنا الـ [[return]] كله:

~~~text الـ Console (npm run dev)
connect general
connect general
>> click sales
connect sales
>> click general
connect general
~~~

ولا [[disconnect]]. يعني ٤ اتصالات مفتوحة، والرسايل كانت هتيجي من كل الأوض اللي فتحتها. ولاحظ إن Strict Mode بيّن المشكلة من أول ثانية: [[connect general]] مرتين ورا بعض.

---

## الخلاصة

| الـ dependencies | الـ effect بيشتغل إمتى |
|---|---|
| مفيش array | بعد كل render |
| [[[]]] | مرة بعد أول ظهور |
| [[[roomId]]] | أول ظهور، وكل ما [[roomId]] يتغير |

| الترتيب لما [[roomId]] يتغير |
|---|
| ١. render جديد والشاشة تترسم |
| ٢. cleanup القديم (بالـ [[roomId]] القديم) |
| ٣. الـ effect الجديد (بالـ [[roomId]] الجديد) |

> أي effect بيفتح حاجة (اتصال، listener، timer) لازم يرجّع دالة تقفلها.`,
          lines: [
            "component بيتصل بغرفة شات.",
            "الرسايل، وكل واحدة ليها id بيتعمل وقت ما توصل.",
            "effect بيتنفذ بعد الرسم.",
            "افتح الاتصال بالغرفة الحالية.",
            "كل رسالة توصل تتضاف بـ updater (مش بتعتمد على messages القديمة).",
            "علامة إن الاتصال اتفتح.",
            "الـ cleanup: React بتناديه قبل الـ effect الجاي وقبل ما الـ component يتشال.",
            "اقفل الاتصال القديم.",
            "علامة إنه اتقفل.",
            "قفلة الـ cleanup.",
            "قفلة الـ effect، والـ dependencies roomId بس: يتغير، يتقفل القديم ويتفتح جديد.",
            "اعرض الرسايل بالـ id كـ key.",
            "قفلة الـ component."
          ],
          sol: R`أول ما الصفحة تفتح في التطوير: [[connect general]]، [[disconnect general]]، [[connect general]]. ده Strict Mode بيركّب الـ component ويشيله ويركّبه تاني عشان يتأكد إن الـ cleanup سليم. ولما تدوس «sales»: [[disconnect general]] ثم [[connect sales]]، يعني الـ cleanup بتاع الـ effect القديم بيشتغل قبل الجديد. ولو دوست على نفس الأوضة اللي انت فيها مفيش حاجة بتطبع، لأن roomId متغيرش.

هتلاقي كمان errors إن الـ WebSocket فشل، لأن [[example.com]] مش سيرفر chat حقيقي، ودا مش مشكلة في التجربة. الغلطة اللي تبان هنا: لو شلت الـ return، هتلاقي connect بس من غير disconnect، يعني كل تغيير أوضة بيسيب اتصال مفتوح والرسايل بتيجي من أوضتين.`,
          solCode: R`export default function App() {
  const [roomId, setRoomId] = useState('general')
  return (
    <>
      <button onClick={() => setRoomId('general')}>general</button>
      <button onClick={() => setRoomId('sales')}>sales</button>
      <ChatRoom roomId={roomId} />
    </>
  )
}`
        },
        {
          cmd: "dependency array",
          title: "إمتى الـ effect يشتغل تاني، وليه بيلف في loop",
          desc: R`كل قيمة من الـ component بتستخدمها جوه الـ effect (props، و state، ودوال ومتغيرات متعرّفة جوه الـ component) لازم تبقى في الـ dependencies. القاعدة دي الـ linter بيفرضها بـ [[react-hooks/exhaustive-deps]] (في eslint، وفي oxlint اللي قالب Vite بيجي بيه دلوقتي)، وسيبها شغالة.

المشكلة إن React بتقارن بالمرجع: object أو array أو دالة بتتعمل جديدة في كل render، فالـ effect بيشتغل مع كل render. ولو الـ effect بيعمل setState، عندك loop مبيخلصش.`,
          example: R`// غلط: options = {} بتتعمل object جديد كل render، فالـ effect بيلف للأبد
function useFetchBad(url: string, options = {}) {
  const [data, setData] = useState(null)
  const load = useCallback(async () => {
    setData(await (await fetch(url, options)).json())
  }, [url, options])
  useEffect(() => { load() }, [load])
  return data
}
// صح: الـ dependencies قيم بسيطة، والطلب جوه الـ effect نفسه
function useFetchJson(url: string, method = 'GET') {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(url, { method }).then(r => r.json()).then(setData)
  }, [url, method])
  return data
}`,
          try: R`استخدم [[useFetchBad('/api/products')]] في component وافتح تاب Network: هتلاقي الطلبات مبتقفش. بدّلها بـ [[useFetchJson]] وشوف طلب واحد (أو اتنين في Strict Mode).`,
          flag: "script",
          deep: {
            why: "الـ effect بيقرا قيم من الـ render اللي اتعمل فيه. لو قيمة اتغيرت ومش في الـ dependencies، الـ effect هيفضل شايف القديمة (stale closure). ولو حطيت فيها حاجة بتتعمل جديدة كل مرة، هيشتغل كل مرة. الاتنين bugs، والحل تفهم المقارنة.",
            how: R`React بتحفظ الـ dependencies بتاعة آخر مرة، وبعد كل render تقارن كل واحدة بـ [[Object.is]]. الأرقام والنصوص والـ booleans بتتقارن بالقيمة. الـ objects والـ arrays والدوال بالمرجع: [[{} === {}]] بـ false.

اللي حصل في المثال الغلط: [[options = {}]] default parameter بيعمل object جديد في كل نداء للـ hook، يعني كل render. فـ [[useCallback]] شايف dependency اتغيرت ويرجّع دالة جديدة. فالـ effect شايف [[load]] اتغيرت ويشتغل. فـ fetch ثم setData ثم render ثم options جديدة... للأبد. وفي مشروع حقيقي كان فيه hook اسمه useFetch بالشكل ده بالظبط.

الحلول بالترتيب: اعمل الـ object أو الدالة جوه الـ effect نفسه. أو طلّع الثابت برا الـ component خالص. أو خلي الـ dependency قيمة بسيطة ([[options.method]] بدل [[options]]). أو ثبّت المرجع بـ [[useMemo]] و [[useCallback]] لو لازم.

ولو محتاج تقرا أحدث قيمة جوه الـ effect من غير ما تغييرها يعيد تشغيله (زي [[theme]] وانت فاتح اتصال بـ [[roomId]])، React 19.2 فيها [[useEffectEvent]]: دالة بتشوف أحدث props و state ومبتتحطش في الـ dependencies. استخدمها للجزء اللي زي «event» جوه الـ effect بس، مش عشان تسكّت الـ linter.

وفي الـ timers: [[setInterval(() => setCount(count + 1), 1000)]] مع [[[]]] هيفضل يحط 1، لأن count جوه الـ closure دايمًا 0. الحل الـ updater: [[setCount(c => c + 1)]]، ووقتها count مش dependency أصلًا.`,
            when: "مع كل effect و [[useMemo]] و [[useCallback]]. واعتبر تحذير الـ linter bug لحد ما تثبت العكس.",
            mistakes: R`[[eslint-disable-next-line react-hooks/exhaustive-deps]] عشان «الـ effect كان بيشتغل كتير»: بتخبّي المشكلة وبتعمل stale closure. وتحط [[props]] كلها أو object من context كـ dependency. ودالة متعرّفة في الـ component ومستخدمة في الـ effect ومش في الـ dependencies.`
          },
          teach: R`## الفكرة: نفس الـ hook مرتين، واحد بيبعت طلب وواحد بيبعت ١٤٧٢

المثال فيه custom hook (دالة بتبدأ بـ [[use]] وبتستخدم hooks تانية جواها) بيجيب JSON، مكتوب مرتين. الفرق الوحيد هو **إيه اللي في الـ dependencies**. شغّلنا الاتنين ٣ ثواني على [[/products.json]] (ملف في [[public]]) وعدّينا الطلبات، في Vite 8.3 + React 19.2 (وضع التطوير) في Chrome headless.

---

## ١. React بتقارن إزاي؟

بعد كل render، React بتقارن كل dependency بقيمتها في المرة اللي فاتت بـ [[Object.is]]:

| النوع | بيتقارن بـ | مثال |
|---|---|---|
| نص، رقم، boolean | القيمة | [['GET' === 'GET']] = true |
| object، array، دالة | المرجع (مكانه في الذاكرة) | [[{} === {}]] = false |

يعني أي [[{}]] أو [[[]]] أو [[() => {}]] بيتكتب **جوه** الـ component هو قيمة **جديدة** في كل render، حتى لو شكلها نفس الشكل.

---

## ٢. النسخة الغلط

~~~text useFetchBad.ts
function useFetchBad(url: string, options = {}) {
  const [data, setData] = useState(null)
  const load = useCallback(async () => {
    setData(await (await fetch(url, options)).json())
  }, [url, options])
  useEffect(() => { load() }, [load])
  return data
}
~~~

### سطر سطر

- [[options = {}]]: default parameter. لو اللي نادى الـ hook مبعتش [[options]]، تبقى [[{}]]. والمهم: الـ [[{}]] دي بتتعمل **جديدة** في كل نداء للـ hook، يعني كل render.
- [[useCallback(fn, deps)]]: «رجّعلي نفس الدالة طول ما الـ deps متغيرتش». شغلته يثبّت مرجع الدالة.
- [[await (await fetch(url, options)).json()]]: من جوه لبرة: [[fetch]] بيبعت الطلب، و [[await]] الأولى (الداخلية) بتستنى الرد، و [[.json()]] بتقرا الـ body كـ JSON، و [[await]] التانية بتستنى القراية. والنتيجة بتروح لـ [[setData]].
- [[useEffect(() => { load() }, [load])]]: شغّل [[load]] كل ما [[load]] تتغير.

### الدايرة

1. render: [[options]] = [[{}]] جديد.
2. [[useCallback]] شايف [[options]] اتغير، فبيرجّع [[load]] **جديدة**.
3. [[useEffect]] شايف [[load]] اتغيرت، فبيشتغل ويبعت طلب.
4. الرد بيوصل و [[setData]] بـ array جديدة (JSON بيتقرا كل مرة object جديد)، فـ render.
5. ارجع لـ ١.

~~~text الناتج (Chrome)
requests in 3s: 1472
~~~

١٤٧٢ طلب في ٣ ثواني، ومبيقفش. والشاشة شكلها طبيعي خالص (نفس البيانات)، فمش هتاخد بالك إلا لو فتحت تاب Network.

---

## ٣. النسخة الصح

~~~text useFetchJson.ts
function useFetchJson(url: string, method = 'GET') {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(url, { method }).then(r => r.json()).then(setData)
  }, [url, method])
  return data
}
~~~

- [[method = 'GET']]: بدل object كامل، القيمة البسيطة اللي محتاجينها. النص [['GET']] بيتقارن بالقيمة، فمش بيتغير.
- [[fetch(url, { method })]]: الـ object اتعمل **جوه** الـ effect، فمش dependency أصلًا. و [[{ method }]] اختصار [[{ method: method }]].
- [[.then(r => r.json()).then(setData)]]: نفس الخطوات بـ [[then]] بدل [[await]]: لما الرد يوصل اقرا JSON، ولما يتقري ابعته لـ [[setData]]. و [[then(setData)]] بتبعت الدالة نفسها، وهي هتتنادى بالنتيجة.
- [[[url, method]]]: الاتنين نصوص.

~~~text الناتج (Chrome)
requests in 3s: 2
~~~

طلبين: واحد عادي وواحد من الـ mount التاني بتاع Strict Mode في التطوير.

---

## ٤. الـ linter بيقولك قبل ما يحصل

قالب Vite بيجي بـ [[oxlint]] ([[npm run lint]])، وفيه نفس قاعدة [[react-hooks/exhaustive-deps]] اللي في eslint. على effect بيستخدم [[url]] ومش حاطه في الـ array:

~~~text npx oxlint
warning react-hooks(exhaustive-deps): React Hook useEffect has a missing dependency: 'url' help: Either include it or remove the dependency array.
~~~

## ٥. الـ timer اللي واقف على ١

~~~text Timer.tsx
useEffect(() => { const t = setInterval(() => setCount(count + 1), 500); return () => clearInterval(t) }, [])
~~~

[[setInterval(fn, 500)]] بينادي [[fn]] كل نص ثانية، و [[clearInterval]] بيوقفه في الـ cleanup. بعد حوالي ٣ ثواني، قارنّاه بنسخة فيها [[setCount(c => c + 1)]]:

~~~text الناتج (Chrome)
count + 1:       1
c => c + 1:      6
~~~

الـ effect اشتغل مرة واحدة ([[[]]])، فالدالة اللي جواه شايفة [[count]] بتاع أول render للأبد، يعني [[0]]. فكل مرة بتقول «خليها 0 + 1». ده اسمه **stale closure**: دالة ماسكة قيم قديمة. و oxlint كان قال [[missing dependency: 'count']]. الحل مش إنك تضيف [[count]] (كده الـ interval هيتقفل ويتفتح كل نص ثانية)، الحل الـ updater: كده [[count]] مش مستخدمة جوه الـ effect أصلًا.

---

## الخلاصة

| المشكلة | الحل |
|---|---|
| object أو array أو دالة بتتعمل في الـ render وداخلة الـ deps | اعملها جوه الـ effect |
| ثابت ملوش علاقة بالـ props | طلّعه برا الـ component |
| محتاج حتة من object | حط القيمة البسيطة ([[options.method]]) |
| لازم مرجع ثابت | [[useMemo]] و [[useCallback]] بـ deps صح |
| setState من القيمة القديمة | [[setX(prev => ...)]] |

> تحذير [[exhaustive-deps]] اعتبره bug لحد ما تثبت العكس، ومتسكّتوش بـ [[eslint-disable]].`,
          lines: [
            "hook بياخد options ولو متبعتتش بياخد object فاضي جديد.",
            "الـ state.",
            "دالة الجلب متثبتة بـ useCallback... على options اللي بتتغير كل مرة.",
            "هات البيانات وحطها في الـ state.",
            "الـ dependencies فيها options، فالدالة بتتعمل جديدة كل render.",
            "الـ effect معتمد على load، فبيشتغل كل render، و setData بتعمل render: loop.",
            "رجّع البيانات.",
            "قفلة.",
            "النسخة الصح: method كنص بسيط بدل object.",
            "الـ state.",
            "الطلب جوه الـ effect نفسه، فمفيش دالة برا محتاجة تتثبت.",
            "اطلب وحط النتيجة. (لسه ناقصها التعامل مع الردود المتلخبطة: درس race condition.)",
            "dependencies قيم بسيطة بتتقارن بالقيمة.",
            "رجّع البيانات.",
            "قفلة."
          ],
          sol: R`مع [[useFetchBad]] تاب Network بيتملي طلبات ورا بعض ومبيقفش. السلسلة: كل render بيعمل [[options = {}]] جديد، فـ [[load]] بتتعمل من جديد، فالـ effect بيشتغل ويبعت طلب، والرد بيعمل [[setData]] بـ object جديد، فـ render، وهكذا للأبد.

مع [[useFetchJson]] طلب واحد (اتنين في Strict Mode وقت التطوير)، لأن [[url]] و [[method]] strings بتتقارن بالقيمة. لو جربت useFetchBad ولقيت طلب واحد بس، غالبًا [[/api/products]] مش موجود فبيرجع HTML و [[res.json()]] بيرمي error قبل [[setData]]، فالـ loop مبيكملش. خلي الـ endpoint يرجّع JSON حقيقي (أو استخدم ملف JSON في [[public]]) عشان تشوفه.`
        },
        {
          cmd: "You Might Not Need an Effect",
          title: "أغلب الـ effects اللي بتكتبها ملهاش لازمة",
          desc: R`لو مفيش نظام برا React في الموضوع، غالبًا مش محتاج effect. تلات حالات بتتكرر: قيمة محسوبة من state (احسبها وقت الرسم)، وحاجة بتحصل بسبب ضغطة المستخدم (حطها في الـ handler)، و state لازم تتصفّر لما prop تتغير (استخدم [[key]]).

الـ effect بيشتغل بعد الرسم، فأي setState جواه معناها render زيادة، ولحظة الشاشة بتظهر فيها بقيمة قديمة. وكل effect زيادة مكان جديد للـ bugs.`,
          example: R`// غلط: state محسوبة و effect بيزامنها
const [visible, setVisible] = useState<Todo[]>([])
useEffect(() => setVisible(todos.filter(t => !t.done)), [todos])
// صح: احسبها وانت بترسم
const visibleTodos = todos.filter(t => !t.done)

// غلط: effect مستني state عشان يبعت الطلب
useEffect(() => { if (submitted) postOrder(cart) }, [submitted, cart])
// صح: ابعت في الـ handler نفسه، انت عارف السبب هناك
function handleBuy() { postOrder(cart) }

// غلط: effect يفضّي التعليق لما المستخدم يتغير
useEffect(() => setComment(''), [userId])
// صح: key جديد يعني component جديد بـ state فاضية
<Profile userId={userId} key={userId} />`,
          try: R`دوّر في أي مشروع عندك على [[useEffect]] جواه [[set]] بس ومفيش fetch ولا subscription. جرّب تشيله وتحسب القيمة وقت الرسم أو تنقله للـ handler.`,
          flag: "script",
          deep: {
            why: "الـ effect أداة للمزامنة مع حاجة برا React. لما تستخدمه كـ «لما X يتغير اعمل Y» جوه React نفسها، بتعمل سلسلة renders صعب تتتبعها، وبتلاقي الشاشة بتومض بقيم قديمة، والـ bug بيبقى «ساعات بيحصل».",
            how: R`الدورة في النسخة الغلط: render بـ visible القديمة، والشاشة تترسم بيها، وبعدين الـ effect يشتغل ويعمل setVisible، فـ render تاني بالصح. ولو فيه effect تاني معتمد على visible، سلسلة. النسخة الصح render واحد والقيمة صح من أوله.

الأحداث: لما الطلب يتبعت من effect مستني [[submitted]]، الكود بقى مش عارف ليه بيبعت. لو المستخدم رجع للصفحة والـ state لسه true، هيبعت تاني. في الـ handler انت عارف بالظبط إن المستخدم داس «اشتري»، فابعت هناك.

الـ reset بـ key: React بتعتبر [[<Profile key="1">]] و [[<Profile key="2">]] components مختلفين، فلما الـ key يتغير بتشيل القديم بكل الـ state اللي جواه وتعمل جديد. أنضف من effect بيصفّر كل state لوحدها.

وحالة كمان: لو الابن بيبلّغ الأب بتغيير، ناديه في نفس الـ handler اللي غيّر الـ state، مش في effect بيراقبها.

وفي مشروع حقيقي كان فيه hook للـ RTL فيه [[isRTL]] كـ state، و effect بيحدّثها من اللغة، وعداد [[forceUpdate]]، و [[setTimeout]] بـ 50ms «عشان نضمن كل الـ components تعيد الرسم». كل ده بدل سطر واحد محسوب: [[const isRTL = i18n.language === 'ar']]. الجزء الوحيد اللي محتاج effect فعلًا هو تغيير [[dir]] على عنصر [[<html>]]، لأنه برا React.`,
            when: "قبل ما تكتب أي effect اسأل: فيه نظام برا React؟ (شبكة، أو DOM برا الـ component، أو timer، أو مكتبة). لو لأ، غالبًا مكانه الـ render أو الـ handler.",
            mistakes: R`effects متسلسلة كل واحد بيعمل setState للي بعده. و «لما الصفحة تفتح» تعمل حاجة المفروض تحصل لما المستخدم يدوس. و [[setTimeout]] عشان «تجبر» render. و effect يزامن prop مع state.`
          },
          teach: R`## الفكرة: ٣ أزواج «غلط وصح»

المثال ٣ حالات، كل حالة فيها effect ملوش لازمة والبديل بتاعه. السطور حتت من components مش ملفات كاملة. عشان نشوف الفرق فعلًا، حطينا الحالة الأولى والتالتة في components حقيقية فيها [[console.log]] في الـ render، وشغّلناها في Vite 8.3 + React 19.2 (وضع التطوير، فكل سطر بيتكرر مرتين بسبب Strict Mode) في Chrome headless.

السؤال اللي بيفرز الحالات: **هل فيه حاجة برا React؟** (شبكة، أو DOM برا الـ component، أو timer، أو مكتبة.) لو لأ، غالبًا مش محتاج effect.

---

## ١. قيمة محسوبة

~~~text غلط
const [visible, setVisible] = useState<Todo[]>([])
useEffect(() => setVisible(todos.filter(t => !t.done)), [todos])
~~~

~~~text صح
const visibleTodos = todos.filter(t => !t.done)
~~~

- [[todos.filter(t => !t.done)]]: المهام اللي [[done]] بتاعها [[false]]. [[!]] بتقلب.
- في الغلط: state جديدة + effect كل شغلته ينسخ نتيجة الـ filter فيها كل ما [[todos]] يتغير.
- في الصح: [[const]] بيتحسب في كل render.

شغّلنا الاتنين جنب بعض على مهمتين (واحدة خلصانة)، وبعدين ضفنا مهمة:

~~~text الـ Console
effect version renders, visible = 0
derived version renders, visible = 1
effect version renders, visible = 1
>> add todo
effect version renders, visible = 1
derived version renders, visible = 2
effect version renders, visible = 2
~~~

(شلنا التكرار بتاع Strict Mode.) نسخة الـ effect اترسمت **مرتين** في كل مرة، والأولى بالرقم الغلط: [[0]] في الأول، و [[1]] بعد الإضافة والصح [[2]]. النسخة المحسوبة مرة واحدة بالرقم الصح.

---

## ٢. حاجة بسبب ضغطة

~~~text غلط
useEffect(() => { if (submitted) postOrder(cart) }, [submitted, cart])
~~~

~~~text صح
function handleBuy() { postOrder(cart) }
~~~

- في الغلط: الضغطة بتعمل [[setSubmitted(true)]]، والـ effect «مستني» يشوف [[submitted]] بقت true عشان يبعت. و [[postOrder]] هنا دالة افتراضية بتبعت الطلب للسيرفر.
- المشكلة: الـ effect مش عارف **ليه** [[submitted]] true. وهو كمان معتمد على [[cart]]: لو السلة اتغيرت و [[submitted]] لسه true، الطلب هيتبعت **تاني**.
- في الصح: [[handleBuy]] هو الـ [[onClick]] بتاع زرار «اشتري». بيتنادى مرة لكل ضغطة، وانت عارف السبب بالظبط.

القاعدة: لو الكود بيحصل **لأن المستخدم عمل حاجة**، مكانه الـ handler. لو بيحصل **لأن الـ component ظهر على الشاشة**، ده effect.

---

## ٣. تصفير state لما prop تتغير

~~~text غلط
useEffect(() => setComment(''), [userId])
~~~

~~~text صح
<Profile userId={userId} key={userId} />
~~~

[[Profile]] فيه خانة تعليق ([[comment]] state). لما تفتح بروفايل مستخدم تاني، المفروض الخانة تبقى فاضية.

- في الغلط: effect بيفضّيها كل ما [[userId]] يتغير.
- في الصح: [[key={userId}]] على الـ component نفسه. [[key]] مش بس للـ lists: React بتعتبر [[<Profile key={1}>]] و [[<Profile key={2}>]] **اتنين مختلفين**. فلما الـ key يتغير بتشيل القديم بكل الـ state اللي جواه وتعمل جديد من الصفر.

كتبنا [[hi]] في الخانة وبعدين بدّلنا لمستخدم 2:

~~~text الـ Console (effect)
>> switch to user 2
Profile(effect) user 2 comment = "hi"
Profile(effect) user 2 comment = ""
~~~

~~~text الـ Console (key)
>> switch to user 2
Profile(key) user 2 comment = ""
~~~

(من غير تكرار Strict Mode.) بالـ effect، بروفايل مستخدم 2 اترسم الأول **بتعليق مستخدم 1** ([[hi]])، وبعدين اتصلّح. بالـ key اترسم فاضي من أول مرة. وفي الحالتين الخانة في الآخر فاضية، الفرق في اللحظة اللي في النص وفي الـ render الزيادة.

---

## الخلاصة

| لو عايز... | متعملش | اعمل |
|---|---|---|
| قيمة من state أو props | state + effect بيعمل set | [[const x = ...]] وقت الرسم |
| حاجة لما المستخدم يدوس | effect مستني flag | في الـ handler |
| تصفّر state الـ component لما prop تتغير | effect بيعمل set لكل state | [[key={prop}]] |
| تتكلم مع حاجة برا React | | effect، ودي شغلته |`,
          lines: [
            "state زيادة للقيمة المفلترة.",
            "effect كل شغلته ينسخ قيمة محسوبة: render زيادة وقيمة قديمة للحظة.",
            "الصح: [[const]] بيتحسب في كل render، فمستحيل يبقى قديم.",
            "effect بيبعت الطلب لما flag يتغير، ومش عارف ليه اتغير.",
            "الصح: الـ handler هو اللي بيبعت، في لحظة الضغطة نفسها.",
            "effect بيصفّر state لما prop تتغير، بعد ما الشاشة اترسمت بالتعليق القديم.",
            "الصح: key بالـ userId، فتغييره بيعمل component جديد بـ state فاضية."
          ],
          sol: R`مفيش ناتج واحد هنا لأنه على الكود بتاعك، بس اللي المفروض تلاقيه: effects شكلها [[useEffect(() => setX(f(y)), [y])]]، وده حساب تحوّله لـ [[const x = f(y)]]. أو effect مستني flag زي submitted عشان يعمل حاجة، وده مكانه الـ handler. أو effect بيعمل reset لـ state لما prop تتغير، وده [[key]].

بعد الشيل: عدد الـ renders بيقل (افتح React DevTools > Profiler وقارن)، ومفيش لحظة بتبان فيها قيمة قديمة. اللي يفضل effect: fetch (أو أحسن React Query)، و subscriptions (WebSocket، و [[addEventListener]] على window)، و timers، ومزامنة حاجة برا React زي [[document.title]]. لو الـ effect فيه set بس وملوش cleanup ولا بيكلم حاجة برا، غالبًا ملوش لازمة.`,
          solCode: R`// قبل
const [fullName, setFullName] = useState('')
useEffect(() => setFullName(first + ' ' + last), [first, last])
// بعد
const fullName = first + ' ' + last`
        },
        {
          cmd: "race condition",
          title: "هات بيانات في effect من غير ما الردود تتلخبط",
          desc: R`لو المستخدم غيّر الـ id بسرعة (1 وبعدين 2)، الطلبين بيطلعوا ومفيش ضمان إن رد 2 يرجع الأخير. لو رد 1 اتأخر، هيكتب فوق رد 2 والشاشة تعرض بيانات غلط.

الحل: الـ cleanup يلغي الطلب القديم بـ [[AbortController]]، أو يعلّمه بـ flag ([[ignore = true]]) فرده يتجاهل. وخلي معاك loading و error، مش data بس.`,
          example: R`type User = { id: number; name: string }
function UserCard({ id }: { id: number }) {
  const [result, setResult] = useState<{ id: number; user?: User; error?: string } | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    fetch($__bt/api/users/$__{id}$__bt, { signal: controller.signal })
      .then(res => { if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt); return res.json() })
      .then((user: User) => setResult({ id, user }))
      .catch(err => { if (err.name !== 'AbortError') setResult({ id, error: err.message }) })
    return () => controller.abort()
  }, [id])
  if (result?.id !== id) return <p>Loading...</p>
  if (result.error) return <p role="alert">{result.error}</p>
  return <h2>{result.user?.name}</h2>
}`,
          try: R`افتح DevTools > Network واعمل throttling على Slow 3G، وغيّر الـ id بسرعة: هتلاقي الطلبات القديمة (canceled) والشاشة بتعرض آخر واحد بس. بعدين امسح سطر الـ cleanup وكرّر.`,
          flag: "script",
          deep: {
            why: "الشبكة مش بترجّع الردود بالترتيب. من غير ما تتعامل مع ده، هتلاقي bug نادر وصعب يتكرر: «ساعات بيفتح بروفايل واحد تاني». وده بيحصل أكتر على موبايل وشبكة بطيئة، يعني عند المستخدمين مش عندك.",
            how: R`اللي بيحصل: id=1 فالـ effect يطلب 1. المستخدم يغيّر لـ 2، فـ React تنادي cleanup الأول ([[controller.abort()]]) وبعدين الـ effect الجديد يطلب 2. الـ abort بيوقف طلب 1 في الشبكة فعلًا، و [[fetch]] بترفض بـ error اسمه [[AbortError]]، واحنا بنتجاهله. فمفيش رد قديم يقدر يكتب فوق الجديد.

بديل أبسط في react.dev: [[let ignore = false]] جوه الـ effect، والـ cleanup يخليها true، وقبل [[setState]] تتأكد إنها false. الفرق إن الطلب القديم بيكمل في الشبكة بس نتيجته بتترمي. الـ abort أحسن لأنه بيوفّر الشبكة.

والـ loading هنا محسوب مش state: النتيجة متخزنة ومعاها الـ id بتاعها. لو الـ id الحالي غير اللي في النتيجة، يبقى لسه بيحمّل. كده مش محتاج تعمل setState في أول الـ effect، ومش هتعرض بيانات المستخدم القديم وانت بتجيب الجديد.

و [[fetch]] مبترفضش على 404 ولا 500، بترفض بس لو الشبكة وقعت. عشان كده [[res.ok]] لازم تتفحص بإيدك.

وفي Strict Mode هتلاقي في Network طلب canceled عند أول ظهور: ده الـ mount التاني بتاع التطوير، والـ abort شغال صح.`,
            when: "مشروع صغير فيه طلب أو اتنين. لو أكتر من كده، الكود ده (و cache، ومنع التكرار، و retry، وتحديث لما ترجع للتاب) بيتكتب في كل مكان، ووقتها TanStack Query (بعد كام درس) أو loaders بتاعة React Router أو server components في Next.js.",
            mistakes: R`[[useEffect(async () => ...)]]. ومفيش [[res.ok]] فالـ error page بتتعامل كأنها بيانات. و setState للـ error لما الطلب يتلغي بـ abort. وفي مشروع حقيقي كان فيه CartContext عامل cache بإيده «٥ ثواني» بـ [[lastLoadTime]] و loading و error في state: ده نفس اللي React Query بيعمله أحسن بسطر.`
          },
          teach: R`## الفكرة: الطلب القديم ممكن يرجع بعد الجديد

[[UserCard]] بيجيب مستخدم برقمه من [[/api/users/<id>]] ويعرض اسمه. المشكلة اللي بيحلها: لو الـ [[id]] اتغير والطلب القديم لسه مرجعش، مين يكسب؟ عشان نجرّب بجد عملنا API صغير بـ Node فيه تأخير مقصود: [[/api/users/1]] (Ali) بيرد بعد 1.5 ثانية، و [[/api/users/2]] (Mona) بعد 0.2 ثانية، وأي رقم مش موجود بيرجّع 404. ووصّلناه بـ [[server.proxy]] في Vite (درس vite.config)، وضغطنا 1 وبعدها 2 بسرعة، في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. شكل النتيجة

~~~text UserCard.tsx
const [result, setResult] = useState<{ id: number; user?: User; error?: string } | null>(null)
~~~

state واحدة فيها: الـ [[id]] اللي النتيجة دي **بتاعته**، والمستخدم لو نجح، أو رسالة خطأ لو فشل. و [[| null]] معناها «أو null»، وهي القيمة في الأول.

ليه نخزّن الـ [[id]] مع النتيجة؟ عشان نعرف بعدين هل النتيجة اللي في إيدنا بتاعة الـ [[id]] الحالي ولا لأ.

---

## ٢. الـ effect

### [[new AbortController()]]

أداة بتلغي طلب. فيها حاجتين: [[controller.signal]] (إشارة بتتربط بالطلب)، و [[controller.abort()]] (اضغط زرار الإلغاء).

### [[fetch(..., { signal: controller.signal })]]

الطلب مربوط بالإشارة. لو حد نادى [[abort()]]، المتصفح بيقطع الطلب فعلًا، و [[fetch]] بترمي error اسمه [[AbortError]].

### السلسلة

~~~text UserCard.tsx
.then(res => { if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt); return res.json() })
.then((user: User) => setResult({ id, user }))
.catch(err => { if (err.name !== 'AbortError') setResult({ id, error: err.message }) })
~~~

1. [[res.ok]]: [[true]] لو الـ status بين 200 و 299. [[fetch]] **مبترميش** error على 404 ولا 500، بترمي بس لو الشبكة نفسها وقعت. فبنفحص بإيدنا، و [[throw]] بيرمي error بنفسنا ([[HTTP 404]] مثلًا) فيروح للـ [[catch]].
2. [[setResult({ id, user })]]: خزّن المستخدم **ومعاه الـ id اللي اتطلب عشانه**.
3. [[.catch(...)]]: أي error في السلسلة. لو هو الإلغاء بتاعنا، تجاهله. غير كده خزّنه.

### الـ cleanup

~~~text UserCard.tsx
return () => controller.abort()
}, [id])
~~~

لما [[id]] يتغير، React بتنادي الـ cleanup بتاع الـ effect **القديم** الأول، فالطلب القديم يتلغي، وبعدين الـ effect الجديد يبعت طلب جديد.

---

## ٣. العرض

~~~text UserCard.tsx
if (result?.id !== id) return <p>Loading...</p>
if (result.error) return <p role="alert">{result.error}</p>
return <h2>{result.user?.name}</h2>
~~~

- [[result?.id]]: [[?.]] (optional chaining) معناها «لو [[result]] مش null هات [[id]]، غير كده [[undefined]]». فالشرط صح لو مفيش نتيجة، **أو** النتيجة بتاعة id تاني. في الحالتين: لسه بيحمّل.
- الـ loading **محسوب** مش state، فمش محتاج تعمل [[setLoading(true)]] في أول الـ effect.

---

## ٤. اللي حصل

~~~text الناتج (Chrome)
start (id=3)                   id=3  <h2>Sara</h2>
0.4s after clicking 1 then 2   id=2  <h2>Mona</h2>
1.9s after                     id=2  <h2>Mona</h2>
id=9 (404)                     id=9  <p role="alert">HTTP 404</p>
~~~

~~~text الشبكة
request /api/users/1 failed: net::ERR_ABORTED
request /api/users/2 finished
~~~

طلب 1 اتلغى وهو في الطريق ([[ERR_ABORTED]]، وفي DevTools بيتكتب [[(canceled)]])، فرده عمره ما وصل. و 404 طلع رسالة بدل ما يتعامل كبيانات.

### من غير الـ cleanup (الشرط موجود)

~~~text الناتج
0.4s after clicking 1 then 2   id=2  <h2>Mona</h2>
1.9s after                     id=2  <p>Loading...</p>
~~~

الطلبين كمّلوا. رد 2 وصل الأول واتعرض، وبعدين رد 1 وصل وعمل [[setResult({ id: 1, ... })]] فوقه. الشرط شاف [[1 !== 2]] فعرض Loading... وهيفضل كده للأبد. الشرط منع البيانات الغلط، بس مش كفاية.

### من غير الاتنين

~~~text الناتج
0.4s after clicking 1 then 2   id=2  <h2>Mona</h2>
1.9s after                     id=2  <h2>Ali</h2>
~~~

ده الـ race condition بعينه: الـ id = 2 والشاشة بتقول Ali، لأن الرد اللي وصل **آخر** هو اللي كسب، مش الطلب اللي اتبعت آخر.

---

## الخلاصة

| الحماية | بتمنع إيه |
|---|---|
| [[AbortController]] في الـ cleanup | الرد القديم يوصل أصلًا (وبتوفّر الشبكة) |
| [[id]] متخزّن مع النتيجة | عرض نتيجة id تاني، و loading من غير state |
| [[res.ok]] | التعامل مع صفحة 404 أو 500 كأنها بيانات |
| [[err.name !== 'AbortError']] | الإلغاء بتاعك يتعرض كـ error |

> الكود ده بيتكتب في كل component بيجيب بيانات. لما يكتروا، TanStack Query بيعمل ده كله ومعاه cache.`,
          lines: [
            "شكل المستخدم.",
            "component بيعرض مستخدم برقمه.",
            "النتيجة ومعاها الـ id اللي جت عشانه، أو null في الأول.",
            "effect بيجيب البيانات.",
            "أداة تلغي الطلب.",
            "اطلب، واربط الطلب بالـ signal عشان ينفع يتلغي.",
            "fetch مبترفضش على 404 و 500، فافحص ok بنفسك.",
            "خزّن النتيجة ومعاها الـ id بتاعها.",
            "أي خطأ غير الإلغاء نفسه يتخزّن.",
            "الـ cleanup: لو الـ id اتغير أو الـ component اتشال، الغي الطلب القديم.",
            "يشتغل تاني مع كل id جديد.",
            "loading محسوب: مفيش نتيجة للـ id ده لسه.",
            "خطأ.",
            "البيانات.",
            "قفلة."
          ],
          sol: R`بالـ cleanup هتلاقي الطلبات القديمة في Network مكتوب جنبها [[(canceled)]] بالأحمر، والشاشة بتعرض «Loading...» لحد ما رد آخر id يوصل، وبعدين اسمه هو بس.

من غير الـ cleanup كل الطلبات بتكمّل. الشرط [[result?.id !== id]] بيحميك من إنك تعرض user غلط، بس لو رد قديم وصل بعد الرد الجديد، الـ result بتبقى بتاعة id قديم فالشاشة تفضل «Loading...» للأبد. ومن غير الشرط والـ cleanup الاتنين، هتشوف اسم user تاني غير اللي في الـ URL، وده الـ race condition بعينه.

ملحوظة: Slow 3G بيأخّر كل الطلبات بنفس القدر، فغالبًا الردود بتوصل بالترتيب ومش هتشوف اللخبطة. عشان تجبرها خلي الـ API يستنى وقت عشوائي (مثلًا [[setTimeout]] بين 0 و 3 ثواني قبل الرد).`
        },
        {
          cmd: "useRef",
          title: "امسك عنصر DOM أو افتكر قيمة من غير ما تعيد الرسم",
          desc: R`[[useRef]] بيدّيك object فيه [[current]] بيفضل هو هو طول عمر الـ component. استخدامين: تمسك عنصر DOM ([[ref={inputRef}]]) عشان تعمل focus أو scroll أو تقيس، أو تحفظ قيمة زي id بتاع timer من غير ما تغييرها يعيد الرسم.

الفرق عن state: تغيير [[ref.current]] مش بيعمل render. عشان كده متقراهوش ولا تكتبه وقت الرسم، استخدمه في الـ handlers والـ effects بس.`,
          example: R`function Stopwatch() {
  const [ms, setMs] = useState(0)
  const timerRef = useRef<number | null>(null)
  const noteRef = useRef<HTMLInputElement>(null)
  function start() {
    if (timerRef.current !== null) return
    timerRef.current = window.setInterval(() => setMs(m => m + 100), 100)
  }
  function stop() {
    if (timerRef.current !== null) clearInterval(timerRef.current)
    timerRef.current = null
    noteRef.current?.focus()
  }
  return <>{(ms / 1000).toFixed(1)}s <button onClick={start}>Start</button> <button onClick={stop}>Stop</button> <input ref={noteRef} placeholder="Lap note" /></>
}`,
          try: R`خلي timerRef state عادية بدل ref ([[useState<number | null>(null)]]) وشوف إن كل start بقى بيعمل render زيادة. وبعدين اضغط Start مرتين ورا بعض في النسخة الأصلية: الـ if بيمنع timer تاني.`,
          flag: "script",
          deep: {
            why: "فيه قيم الـ component محتاج يفتكرها بس مش ظاهرة على الشاشة: id بتاع timer، أو آخر قيمة لحاجة، أو عنصر DOM محتاج تعمله focus. لو حطيتها في state، كل تغيير هيعيد الرسم على الفاضي. ولو في متغير عادي، هتضيع مع كل render.",
            how: R`[[useRef(x)]] بيرجّع نفس الـ object بالظبط في كل render، و [[current]] جواه بيتغير عادي زي أي خاصية. React مش بتراقبه، فتغييره مش بيطلب render.

لما تحط [[ref={noteRef}]] على عنصر، React بتحط العنصر في [[noteRef.current]] بعد ما تعمل الـ DOM (في الـ commit)، وترجّعه [[null]] لما العنصر يتشال. عشان كده وقت أول render القيمة لسه null، واستخدام [[?.]] بيحميك.

ليه متقراهوش وقت الرسم؟ لأن الـ render المفروض يطلع نفس الشاشة لنفس الـ props والـ state. قيمة في ref ممكن تتغير من غير ما React تعرف، فالشاشة تبقى معتمدة على حاجة مش متتبعة. و React Compiler بيفترض إنك ماشي على القاعدة دي.

استخدامات تانية: تحفظ instance من مكتبة (map أو chart)، أو آخر قيمة لـ prop، أو العنصر اللي هيراقبه IntersectionObserver. ولو عايز الأب يوصل لـ input جوه component بتاعك، في React 19 الـ ref بيتبعت كـ prop عادي (درس «ref كـ prop» في المستوى التالت).

ومعلومة: [[useRef<HTMLInputElement>(null)]] نوعه [[RefObject<HTMLInputElement | null>]] في React 19، يعني TypeScript هيفكّرك إن القيمة ممكن تبقى null.`,
            when: "Focus و scroll ([[scrollIntoView]]) وقياس عنصر، و ids بتاعة timers و animation frames، وأي قيمة لازم تفضل بين الـ renders بس مش بتظهر.",
            mistakes: R`تستخدم ref لقيمة معروضة على الشاشة وتستغرب إنها مش بتتحدث. و [[useRef(new Something())]]: الـ constructor بيتنادى كل render والنتيجة بتترمي. والـ timer مبيتقفلش لما الـ component يتشال: ضيف effect cleanup يعمل [[clearInterval]]. وتقرا [[ref.current]] في أول render وتلاقيه null.`
          },
          teach: R`## الفكرة: state للي ظاهر، و ref للي مستخبي

[[Stopwatch]] ساعة إيقاف فيها ٣ حاجات محتاجة تتفكر بين الـ renders: الوقت ([[ms]]، ظاهر على الشاشة)، ورقم الـ interval ([[timerRef]]، مش ظاهر)، وعنصر خانة الملاحظة ([[noteRef]]، عنصر DOM). الأولى state، والاتنين التانيين refs. اتشغّل في Vite 8.3 + React 19.2 (وضع التطوير) في Chrome headless، والضغط بـ Playwright.

---

## ١. التلات hooks

~~~text Stopwatch.tsx
const [ms, setMs] = useState(0)
const timerRef = useRef<number | null>(null)
const noteRef = useRef<HTMLInputElement>(null)
~~~

| الاسم | النوع | ليه ده بالذات |
|---|---|---|
| [[ms]] | state | معروض على الشاشة، فتغييره لازم يعيد الرسم |
| [[timerRef]] | ref شايل [[number]] أو [[null]] | الـ id بتاع الـ interval. محدش بيشوفه، فتغييره ميستاهلش render |
| [[noteRef]] | ref شايل عنصر [[<input>]] | عشان نعمل [[focus()]] للخانة |

### [[useRef]] بيرجّع إيه؟

object شكله [[{ current: القيمة_الأولى }]]. نفس الـ object بالظبط في كل render، و [[current]] جواه بتقدر تغيّرها عادي ([[timerRef.current = 5]]). React مش بتراقبها، فتغييرها **مش** بيعمل render.

و [[<number | null>]] نوع TypeScript: «فيها رقم أو null». وفي React 19، [[useRef<HTMLInputElement>(null)]] نوعه [[RefObject<HTMLInputElement | null>]]. جرّبنا [[noteRef.current.focus()]] من غير [[?.]] و [[tsc]] قال:

~~~text tsc
error TS18047: 'noteRef.current' is possibly 'null'.
~~~

---

## ٢. [[start]]

~~~text Stopwatch.tsx
function start() {
  if (timerRef.current !== null) return
  timerRef.current = window.setInterval(() => setMs(m => m + 100), 100)
}
~~~

- [[if (timerRef.current !== null) return]]: لو فيه timer شغال خلاص، اخرج. ده بيمنع timer تاني.
- [[window.setInterval(fn, 100)]]: نادي [[fn]] كل 100 ميلي ثانية، وبيرجّع رقم (id) تقدر توقفه بيه بعدين. و [[window.]] قدامها عشان TypeScript يعرف إنها نسخة المتصفح اللي بترجّع [[number]] (نسخة Node بترجّع object).
- [[setMs(m => m + 100)]]: updater، لأن الدالة دي بتتنادى بعدين كتير، و [[ms]] اللي شايفاها هتبقى قديمة (stale closure، درس dependency array).
- [[timerRef.current = ...]]: احفظ الـ id. **مفيش render**.

## ٣. [[stop]]

~~~text Stopwatch.tsx
function stop() {
  if (timerRef.current !== null) clearInterval(timerRef.current)
  timerRef.current = null
  noteRef.current?.focus()
}
~~~

- [[clearInterval(id)]]: وقّف الـ interval ده.
- [[timerRef.current = null]]: علامة إنه واقف، عشان [[start]] تشتغل تاني.
- [[noteRef.current?.focus()]]: حط المؤشر في خانة الملاحظة. [[?.]] لو [[current]] بـ [[null]] (الخانة مش موجودة) متعملش حاجة بدل ما تقع.

## ٤. الـ JSX

~~~text Stopwatch.tsx
<>{(ms / 1000).toFixed(1)}s <button onClick={start}>Start</button> <button onClick={stop}>Stop</button> <input ref={noteRef} placeholder="Lap note" /></>
~~~

- [[(ms / 1000).toFixed(1)]]: ميلي ثانية لثواني، برقم عشري واحد.
- [[ref={noteRef}]]: بيقول لـ React «حط عنصر الـ input ده في [[noteRef.current]]». React بتحطه بعد ما تعمل الـ DOM، وترجّعه [[null]] لو العنصر اتشال. عشان كده في أول render (قبل الـ DOM) القيمة لسه [[null]].

---

## ٥. اللي حصل

ضغطنا Start مرتين ورا بعض، واستنينا حوالي ثانية، وبعدين Stop:

~~~text الناتج (Chrome)
initial                  0.0s  focused=BODY
~1s after Start, Start   1.2s  focused=BUTTON
after Stop               1.2s  focused=INPUT
1s after Stop            1.2s  focused=INPUT
~~~

- Start التانية رجعت من أول سطر، فالوقت بيعدّ بسرعته العادية.
- بعد Stop الوقت وقف، والمؤشر راح للخانة ([[INPUT]]).

### من غير الـ [[if]]

~~~text الناتج
~1s after Start, Start   2.2s
after Stop               2.3s
1s after Stop            3.3s
~~~

Start التانية عملت interval تاني وكتبت الـ id بتاعه فوق الأول في [[timerRef.current]]. فالوقت بيجري بالضعف، و Stop وقّف التاني بس. الأول id بتاعه ضاع، ومحدش هيقدر يوقفه.

### [[timerRef]] كـ state

بدّلنا الـ ref بـ [[const [timer, setTimer] = useState<number | null>(null)]] وعدّينا الـ renders:

~~~text الـ Console (state)
>> Start
render 3
render 4
>> Stop
render 9
render 10
~~~

~~~text الـ Console (ref)
>> Start
>> Stop
~~~

(كل render بيتطبع مرتين بسبب Strict Mode، وشلنا renders الـ ticks اللي هي نفسها في الاتنين.) بالـ state، Start و Stop كل واحد عمل render زيادة عشان رقم محدش شايفه. بالـ ref، ولا واحد.

---

## الخلاصة

| | [[useState]] | [[useRef]] |
|---|---|---|
| بيرجّع | قيمة + دالة تغيير | [[{ current }]] |
| التغيير بيعمل render؟ | أيوه | لأ |
| تقراه وقت الرسم؟ | أيوه | لأ، في الـ handlers والـ effects بس |
| بيتستخدم لـ | أي حاجة ظاهرة | timer ids، وعناصر DOM ([[ref={...}]])، وقيم داخلية |`,
          lines: [
            "ساعة إيقاف.",
            "الوقت المعروض: ده state لأنه ظاهر.",
            "id بتاع الـ interval: ref لأنه مش ظاهر، وتغييره ميستاهلش render.",
            "ref هيمسك عنصر الـ input.",
            "بداية التشغيل.",
            "لو شغال خلاص، متعملش timer تاني.",
            "شغّل interval واحفظ الـ id بتاعه في الـ ref.",
            "قفلة start.",
            "الإيقاف.",
            "اقفل الـ interval لو موجود.",
            "علّم إنه واقف.",
            "حط الـ focus على خانة الملاحظة. [[?.]] لأنها ممكن تبقى null.",
            "قفلة stop.",
            "الوقت والأزرار، و [[ref={noteRef}]] بيربط العنصر بالـ ref.",
            "قفلة الـ component."
          ],
          sol: R`بنسخة الـ state: كل Start بيعمل render زيادة (وكذلك Stop)، لأن تغيير الـ timer id بقى تغيير state، مع إن الشاشة مش بتعرضه. حط [[console.log('render')]] في الـ component أو استخدم Profiler وهتشوفه. الـ ref بيتغير من غير ما React تعرف، ودا المطلوب لقيمة داخلية زي id الـ interval.

في النسخة الأصلية لو ضغطت Start مرتين، التانية بترجع من أول سطر لأن [[timerRef.current]] مش null، فيفضل timer واحد والوقت بيعدّ بسرعته الطبيعية. لو شلت الـ if هتلاقي الوقت بيجري أسرع بالضعف، وبعد Stop يفضل شغال، لأن الـ ref اتكتب عليه id التاني والأول ضاع ومحدش هيوقفه.`
        }
      ]
    }
  ]
});

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
    }
  ]
});

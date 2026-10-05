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
          desc: R`كل قيمة من الـ component بتستخدمها جوه الـ effect (props، و state، ودوال ومتغيرات متعرّفة جوه الـ component) لازم تبقى في الـ dependencies. القاعدة دي eslint بيفرضها بـ [[react-hooks/exhaustive-deps]]، وسيبها شغالة.

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

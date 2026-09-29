// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
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
          ]
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
          ]
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
          try: R`غيّر [[className]] لـ [[class]] وشوف الـ warning في الـ console. وبعدين اكتب [[{user}]] بدل [[{user.name}]] واقرا الـ error: «Objects are not valid as a React child».`,
          flag: "script",
          deep: {
            why: "بدل ما تكتب الـ HTML في ملف والمنطق في ملف تاني وتربطهم بـ ids، JSX بيخلي شكل الـ component ومنطقه في مكان واحد، و TypeScript بيفحص الاتنين مع بعض: prop غلط أو متغير مش موجود بيطلع error وانت بتكتب.",
            how: R`Vite بيحوّل كل tag لنداء دالة: [[<img src={a} />]] بتبقى [[jsx('img', { src: a })]] من [[react/jsx-runtime]]، عشان كده مش محتاج [[import React]] في كل ملف. النتيجة object عادي فيه [[type]] و [[props]].

ليه [[className]]؟ لأن [[class]] كلمة محجوزة في JavaScript، واسم الخاصية في الـ DOM نفسه [[className]]. ونفس الكلام لـ [[htmlFor]]. و [[style]] بياخد object مش string، والأسماء camelCase، والأرقام بتبقى px لوحدها.

الحرف الأول بيفرق: [[<button>]] عنصر HTML، و [[<Button>]] component بتاعك. عشان كده اسم الـ component لازم يبدأ بحرف كبير.

وجوه [[{ }]]: النصوص والأرقام بتظهر، و [[null]] و [[undefined]] و [[false]] و [[true]] مبيظهروش، والـ array بتتعرض عناصرها ورا بعض. وأي نص بيتعمله escape لوحده، فلو المستخدم كتب [[<script>]] هيظهر كنص ومش هيشتغل. الاستثناء الوحيد [[dangerouslySetInnerHTML]] (المستوى التالت).`,
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
          ]
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

لما الأب يعمل render، كل أولاده بيعملوا render تاني ويستلموا props جديدة، حتى لو القيم نفسها. ده عادي ورخيص غالبًا، وفيه طرق تمنعه لو لزم (المستوى التالت: memo).

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
          ]
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
          ]
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
// أول ضغطة: 3 مش 4، والـ console بيطبع render مرة واحدة بس`,
          try: R`خمّن الرقم قبل ما تضغط. بعدين حط [[alert(count)]] بعد الـ setCount وشوف إنه بيطبع القيمة القديمة.`,
          flag: "script",
          deep: {
            why: "الـ component دالة بتتنادي من الأول مع كل render، فأي متغير جواها بيتولد من جديد. محتاج مكان برا الدالة يفضل فيه الرقم بين الـ renders، وطريقة تقول بيها لـ React «حاجة اتغيرت، ارسم تاني». [[useState]] بيدّيك الاتنين.",
            how: R`الـ state مش محفوظة جوه الدالة. React بتحفظها في الـ component instance بتاعها (fiber)، في list بالترتيب. أول [[useState]] في الدالة ليه الخانة الأولى، والتاني التانية، وهكذا. عشان كده الـ hooks لازم تتنادى بنفس الترتيب كل مرة.

[[setCount(x)]] مش بتغيّر [[count]] حالًا. بتحط التحديث في طابور وتطلب render. وكل الـ setState اللي حصلت في نفس الـ event بتتجمع في render واحد (batching). عشان كده الـ console طبع مرة واحدة.

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
          ]
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
            mistakes: R`[[onClick={setOpen(true)}]] بتتنادى وقت الرسم، فتعمل setState، فـ render، فتتنادى تاني: «Too many re-renders». الصح [[onClick={() => setOpen(true)}]]. وزرار جوه فورم من غير [[type="button"]] بيبعت الفورم. و [[div]] بـ onClick بدل [[button]]: مبيشتغلش بالكيبورد (درس الـ accessibility في المستوى التالت).`
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
          ]
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
          ]
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
          ]
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
          ]
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
          try: R`غيّر الـ onChange لـ [[setEmail(e.target.value.trim())]] وحاول تكتب «a b»: مش هتعرف تكتب المسافة. ده ليه الـ trim مكانه وقت الإرسال.`,
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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

استخدامات تانية: تحفظ instance من مكتبة (map أو chart)، أو آخر قيمة لـ prop، أو العنصر اللي هيراقبه IntersectionObserver. ولو عايز الأب يوصل لـ input جوه component بتاعك، في React 19 الـ ref بيتبعت كـ prop عادي (المستوى التالت).

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
          ]
        }
      ]
    },
    {
      t: "الـ memo و context و custom hooks",
      l: 2,
      n: "تثبّت قيمة بين الـ renders، وتوصّل قيمة لأي حد في الشجرة، وتعيد استخدام منطق",
      items: [
        {
          cmd: "useMemo و useCallback",
          title: "احفظ نتيجة حساب أو دالة بين الـ renders",
          desc: R`[[useMemo]] بيحفظ نتيجة حساب ومبيعيدوش غير لما الـ dependencies تتغير، و [[useCallback]] نفس الفكرة للدالة نفسها. الاتنين للأداء بس: الكود لازم يشتغل صح من غيرهم.

بيفرقوا في حالتين: حساب تقيل فعلًا (فلترة وترتيب آلاف العناصر)، أو قيمة بتتبعت لـ component ملفوف في [[memo]] أو بتتحط في dependencies بتاعة effect، فمحتاج مرجعها يفضل ثابت. غير كده بيزوّدوا تعقيد من غير فايدة، ومع React Compiler غالبًا مش هتكتبهم خالص.`,
          example: R`function ProductsPage({ products, query }: { products: Product[]; query: string }) {
  const [sort, setSort] = useState<'price' | 'name'>('name')
  const visible = useMemo(
    () => products
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (sort === 'price' ? a.price - b.price : a.name.localeCompare(b.name))),
    [products, query, sort]
  )
  const handleAdd = useCallback((id: string) => addToCart(id), [])
  return <ProductGrid items={visible} onAdd={handleAdd} onSort={setSort} />
}
const ProductGrid = memo(function ProductGrid({ items, onAdd, onSort }: GridProps) {
  return <Grid items={items} onAdd={onAdd} onSort={onSort} />
})`,
          try: R`حط [[console.time('filter')]] و [[console.timeEnd('filter')]] حوالين الفلترة من غير useMemo، بـ ٢٠ منتج وبعدين بـ ٢٠ ألف. شوف الرقم الأول يستاهل useMemo ولا لأ.`,
          flag: "script",
          deep: {
            why: "كل render بيعيد كل الحسابات ويعمل كل الدوال من جديد. غالبًا ده رخيص ومش فارق. بس لو الحساب تقيل، أو لو component تحت بيعتمد على إن الـ prop «هي هي» عشان يتخطى الـ render، محتاج تحفظ النتيجة.",
            how: R`React بتحفظ في الـ hook القيمة والـ dependencies. في الـ render الجاي تقارن كل dependency بـ [[Object.is]]: لو كلها زي ما هي ترجّع القيمة المحفوظة، ولو لأ تنادي الدالة تاني.

[[useCallback(fn, deps)]] هو بالظبط [[useMemo(() => fn, deps)]]: بيحفظ الدالة نفسها مش نتيجتها. فايدته الوحيدة إن المرجع يفضل ثابت، وده مهم في حالتين: الدالة بتروح لـ [[memo]] component (وإلا الـ memo مش هيشوف props زي ما هي أبدًا)، أو الدالة dependency في effect.

في المثال [[sort]] بعد [[filter]] آمنة لأن filter رجّعت array جديدة، فمش بنرتّب الـ products الأصلية.

و useMemo مش ضمان: React ممكن ترمي الكاش (مثلًا في التطوير أو مستقبلًا)، فمتعتمدش عليه لحاجة لازم تحصل مرة واحدة. ده للأداء بس.

وقيس الأول: لو [[console.time]] بيقول أقل من 1ms، useMemo مش هيفرق. ومع React Compiler (المستوى التالت) الـ memoization بيتعمل لوحده وقت الـ build، فالكود الجديد غالبًا مش محتاج الاتنين.`,
            when: "حساب بياخد وقت ملحوظ مع بيانات كبيرة، أو props لـ [[memo]] component، أو قيمة context (عشان الـ consumers ميعيدوش الرسم على الفاضي)، أو dependency في effect.",
            mistakes: R`تلف كل حاجة في useMemo «احتياطي»: كود أصعب، وذاكرة، ومقارنات، ومفيش فايدة. و useCallback لدالة رايحة لـ [[<button>]] عادي: الزرار مش memo فمش فارق. و dependencies ناقصة فترجع قيمة قديمة. و useMemo لحاجة فيها side effect.`
          },
          lines: [
            "صفحة بتاخد المنتجات وكلمة البحث.",
            "طريقة الترتيب.",
            "احفظ النتيجة:",
            "ابدأ من المنتجات،",
            "فلتر بالبحث (array جديدة)،",
            "ورتّب الـ array الجديدة دي (مش الأصلية).",
            "ومتعيدش الحساب غير لو واحدة من التلاتة اتغيرت.",
            "قفلة useMemo.",
            "دالة مرجعها ثابت، عشان ProductGrid الملفوف في memo يتخطى الـ render.",
            "setSort نفسها ثابتة من React، فمش محتاجة useCallback.",
            "قفلة الصفحة.",
            "component ملفوف في memo: بيتخطى الـ render لو الـ props زي ما هي.",
            "بيرسم الـ grid.",
            "قفلة memo."
          ]
        },
        {
          cmd: "useContext",
          title: "وصّل قيمة لأي component في الشجرة من غير props",
          desc: R`الـ context بيخليك تحط قيمة فوق في الشجرة، وأي component تحت يقراها مباشرة من غير ما تعدّي على كل مستوى props. مناسب لحاجات قليلة التغيير كتير ناس محتاجاها: المستخدم الحالي، والثيم، واللغة.

في React 19 بتكتب [[<AuthContext value={...}>]] مباشرة بدل [[.Provider]]. والعادة تلف القراية في custom hook بيرمي error لو اتنده برا الـ provider. ومش لكل حاجة: كل تغيير في القيمة بيعيد رسم كل اللي بيقروها.`,
          example: R`type Auth = { user: User | null; logout: () => void }
const AuthContext = createContext<Auth | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const value = useMemo(() => ({ user, logout: () => setUser(null) }), [user])
  return <AuthContext value={value}>{children}</AuthContext>
}
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}`,
          try: R`استخدم [[useAuth()]] في component برا الـ AuthProvider واقرا رسالة الـ error. وبعدين شيل الـ useMemo وحط [[console.log]] في consumer: هتلاقيه بيعيد الرسم مع كل render للـ provider حتى لو user زي ما هو.`,
          flag: "script",
          deep: {
            why: "المستخدم الحالي محتاجه الـ header، وصفحة البروفايل، وزرار «اطلب»، و ٢٠ component تانيين في أعماق مختلفة. تعدّيه props من App لكل دول (prop drilling) بيخلي components في النص تاخد props مبتستخدمهاش.",
            how: R`[[createContext(default)]] بيعمل «قناة». الـ provider بيحط قيمة في القناة للي تحته، و [[useContext]] بيطلع لفوق لأقرب provider ويقرا قيمته. لو مفيش provider، بياخد الـ default (هنا null، والـ hook بيحوّلها لـ error واضح).

لما قيمة الـ provider تتغير (بـ [[Object.is]])، React بتعيد رسم كل component بيقرا الـ context ده، حتى لو في النص component ملفوف في [[memo]]. وأي component بيقرا الـ context كله، مش جزء منه: لو القيمة فيها user و theme، اللي بيقرا user بس هيعيد الرسم لما theme تتغير.

عشان كده: ثبّت القيمة بـ [[useMemo]] (وإلا كل render للـ provider بيعمل object جديد، وكل الـ consumers يعيدوا الرسم). وقسّم الـ contexts حسب معدل التغيير: [[AuthContext]] لوحده و [[ThemeContext]] لوحده، أو القيمة لوحدها والدوال لوحدها. وأي حاجة بتتغير كتير (مكان الماوس، أو نص بيتكتب) مكانها مش context. ولـ state عام بيتغير كتير ومحتاج كل component يقرا جزء بس، Zustand بالـ selectors أنسب.

وفي React 19 فيه [[use(AuthContext)]] بيعمل نفس الشغل بس ينفع يتنادى جوه if.`,
            when: "Theme، والمستخدم الحالي، واللغة، و feature flags، والـ state الداخلية لـ compound components (المستوى التالت). ومش لبيانات السيرفر (TanStack Query) ولا لـ state بتتغير كل ثانية.",
            mistakes: R`قيمة provider بتتعمل object جديد كل render. و context واحد عملاق فيه كل حاجة. وفي مشروع حقيقي كان فيه ٤ providers متداخلين (Auth و Currency و Cart و Toast)، و CartContext شايل بيانات السلة من الـ API بـ loading و error و cache يدوي: ده server state مكانه React Query. وتنسى إن الـ default بيتستخدم لما مفيش provider، فالـ bug بيبقى صامت بدل error.`
          },
          lines: [
            "شكل القيمة اللي في الـ context.",
            "القناة، والـ default null عشان نعرف لو حد استخدمها برا الـ provider.",
            "الـ provider component.",
            "الـ state الحقيقية هنا.",
            "القيمة متثبتة، مبتتعملش object جديد غير لما user يتغير.",
            "React 19: الـ context نفسه provider، من غير .Provider.",
            "قفلة الـ provider.",
            "hook القراية.",
            "اقرا أقرب provider.",
            "برا الـ provider؟ error واضح بدل null صامت.",
            "رجّع القيمة.",
            "قفلة."
          ]
        },
        {
          cmd: "custom hook",
          title: "اعمل hook بتاعك تعيد بيه نفس المنطق",
          desc: R`الـ custom hook دالة اسمها بيبدأ بـ [[use]] وجواها hooks تانية. بتاخد منطق بيتكرر (state و effects) وتحطه في مكان واحد، وكل component بيستخدمه بياخد نسخة state خاصة بيه.

مثال مشهور [[useDebounce]]: بيأخر القيمة لحد ما المستخدم يبطّل كتابة، فمش هتبعت طلب بحث مع كل حرف.`,
          example: R`export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}
function SearchPage() {
  const [q, setQ] = useState('')
  const debouncedQ = useDebounce(q, 500)
  return <><input value={q} onChange={e => setQ(e.target.value)} /><Results query={debouncedQ} /></>
}`,
          try: R`خلي Results يطبع [[console.log('search', query)]]، واكتب كلمة طويلة بسرعة: هيطبع مرة واحدة بعد ما تقف. غيّر الـ delay لـ 0 وشوف الفرق.`,
          flag: "script",
          deep: {
            why: "نفس الـ state ونفس الـ effect بيتكتبوا في عشر components: debounce، و localStorage، و media query، و online status. نسخهم معناه عشر أماكن للـ bugs. الـ custom hook بيحطهم في مكان واحد باسم واضح.",
            how: R`الـ hook مش سحر: دالة عادية بتتنادى جوه الـ component في كل render، والـ hooks اللي جواها بتتسجل في الـ component اللي ناداها. عشان كده اتنين components بيستخدموا [[useDebounce]] كل واحد ليه state منفصلة. الـ hooks بتشارك المنطق، مش الـ state.

إزاي الـ debounce شغال: كل ما [[value]] يتغير (حرف جديد)، الـ cleanup بيلغي الـ timeout القديم والـ effect يعمل واحد جديد. لو فضلت تكتب، مفيش timeout بيلحق يخلص. أول ما تقف 500ms، آخر timeout يخلص و [[debounced]] تتحدث، و Results بيشوف القيمة الجديدة.

البادئة [[use]] مش شكليات: eslint بيطبّق قواعد الـ hooks على أي دالة اسمها كده (متتنادش جوه if، والـ dependencies)، و React Compiler بيعتمد عليها. ولو الدالة مفيهاش أي hook، متسميهاش use: دي دالة عادية.

والـ debounce بيقلل عدد الطلبات بس، مبيحلش race condition: الردود لسه ممكن ترجع بترتيب غلط. لو Results بيستخدم TanStack Query بـ key فيه الـ query، المشكلة دي محلولة لوحدها.`,
            when: "أي منطق فيه hooks اتكرر مرتين: [[useDebounce]]، و [[useLocalStorage]]، و [[useMediaQuery]]، و [[useAuth]]، و hooks بتلف TanStack Query لكل resource ([[useProducts]]).",
            mistakes: R`دالة من غير hooks اسمها [[useFormatDate]]. و hook بيرجّع object أو دالة جديدة كل مرة، وحد يحطها في dependencies فيعمل loop. و debounce بـ lodash جوه الـ component من غير [[useMemo]] أو [[useRef]]: بيتعمل debounce جديد كل render فمبيأخرش حاجة.`
          },
          lines: [
            "hook عام لأي نوع، و delay افتراضي 400ms.",
            "القيمة المتأخرة.",
            "مع كل تغيير في value:",
            "ابدأ timer يحدّث القيمة بعد المدة.",
            "ولو value اتغيرت قبلها، الغي الـ timer القديم.",
            "قفلة الـ effect.",
            "رجّع القيمة المتأخرة.",
            "قفلة الـ hook.",
            "صفحة البحث.",
            "اللي بيتكتب دلوقتي، بيتحدث مع كل حرف.",
            "نفس القيمة بس بعد ما الكتابة تقف نص ثانية.",
            "الخانة بالقيمة اللحظية، والنتايج بالمتأخرة.",
            "قفلة."
          ]
        },
        {
          cmd: "useLocalStorage",
          title: "state بتفضل بعد ما تقفل الصفحة",
          desc: R`hook بيشتغل زي [[useState]] بالظبط، بس بيقرا القيمة الأولى من localStorage ويكتب فيه مع كل تغيير. مناسب للثيم، وآخر تاب اتفتح، ومسودة فورم.

تلات حاجات لازم تتعمل صح: القراية الأولى lazy (دالة جوه [[useState]]) عشان متقراش التخزين مع كل render، و [[try/catch]] لأن الـ JSON ممكن يبقى بايظ أو التخزين مقفول، والكتابة في effect بعد ما الـ state تتغير، فالـ updater function تشتغل صح.`,
          example: R`export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* مليان أو مقفول */ }
  }, [key, value])
  return [value, setValue] as const
}
// const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')`,
          try: R`استخدمه لعداد، واضغط كذا مرة واعمل refresh: الرقم باقي. بعدين من DevTools > Application > Local Storage غيّر القيمة لـ [[{bad json]] واعمل refresh: المفروض يرجع للقيمة الأولى من غير ما الصفحة تقع.`,
          flag: "script",
          deep: {
            why: "الـ state بتروح مع الـ refresh. حاجات زي الثيم واللغة لازم تفضل، والمستخدم هيضايق لو كل مرة يرجع يختارها. localStorage أبسط تخزين في المتصفح، والـ hook بيخلي استخدامه زي state عادية.",
            how: R`[[useState(() => ...)]] بينادي الدالة مرة واحدة بس في أول render. localStorage متزامن وبيقرا من الديسك، فمتقراهوش في كل render.

ليه الكتابة في effect؟ عشان [[setValue]] هنا هي بتاعة React نفسها، فبتقبل updater ([[setCount(c => c + 1)]]) وبتتجمع صح في الطابور. والـ effect بيكتب القيمة النهائية بعد الـ render.

في مشروع حقيقي كان الـ hook بيلف [[setValue]] بدالة بتحسب [[value(storedValue)]] من الـ closure وتكتب في localStorage على طول. المشكلة: لو اتنادت مرتين في نفس الـ event بـ updater، التانية بتحسب من نفس القيمة القديمة، فزيادتين بيبقوا واحدة. نفس bug الـ [[setCount(count + 1)]] مرتين.

حاجات تانية: localStorage بيخزّن نصوص بس (من هنا JSON)، وحده حوالي 5MB، والتاب التاني بيعرف بالتغيير من event اسمه [[storage]] لو عايز تزامن التابات. وفي Next.js مفيش localStorage على السيرفر، فالقراية وقت الرسم هتعمل hydration mismatch: اقراه في effect أو استخدم [[useSyncExternalStore]].

ولو الـ state دي جوه store عام، [[persist]] بتاع Zustand بيعمل ده لوحده (درس جاي).`,
            when: "تفضيلات المستخدم، ومسودات، وآخر اختيار. مش للبيانات الحساسة.",
            mistakes: R`توكن الدخول في localStorage: أي XSS يقراه، والأأمن httpOnly cookie (تاب الأمان). و [[JSON.parse]] من غير try فالصفحة تقع لو القيمة بايظة. وتخزين بيانات كبيرة (localStorage بيوقف الـ main thread وهو بيكتب). والـ updater bug اللي فوق.`
          },
          lines: [
            "hook عام، بياخد المفتاح والقيمة الافتراضية.",
            "القيمة الأولى بدالة، فبتتقري مرة واحدة بس.",
            "حاول:",
            "اقرا النص من التخزين.",
            "لو موجود حوّله من JSON، لو لأ خد الافتراضي.",
            "لو الـ JSON بايظ أو التخزين مقفول:",
            "ارجع للافتراضي بدل ما الصفحة تقع.",
            "قفلة الـ catch.",
            "قفلة الدالة.",
            "بعد أي تغيير في القيمة:",
            "اكتبها في التخزين، وتجاهل الخطأ لو التخزين مليان أو مقفول.",
            "يشتغل لما المفتاح أو القيمة يتغيروا.",
            "رجّع نفس شكل useState. [[as const]] عشان TypeScript يفهمها tuple.",
            "قفلة."
          ]
        }
      ]
    },
    {
      t: "الفورمات والصفحات",
      l: 2,
      n: "فورم بـ validation حقيقي، وصفحات كل واحدة ليها URL، وصفحات محتاجة تسجيل دخول",
      items: [
        {
          cmd: "uncontrolled و FormData",
          title: "سيب المتصفح يمسك قيم الفورم واقراها وقت الإرسال",
          desc: R`الـ uncontrolled input قيمته في الـ DOM نفسه مش في state. بتدّيله [[defaultValue]] كقيمة أولى، ووقت الإرسال بتقرا الفورم كله مرة واحدة بـ [[new FormData(form)]]، ومهم يبقى لكل input [[name]].

أبسط وأخف من controlled لفورم عادي، لأن مفيش render مع كل حرف. واختار controlled لما تحتاج القيمة وانت بتكتب: validation لحظي، أو خانة بتأثر على حاجة تانية في الشاشة.`,
          example: R`function ContactForm({ onSend }: { onSend: (data: Record<string, string>) => Promise<void> }) {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    await onSend(Object.fromEntries(new FormData(form)) as Record<string, string>)
    form.reset()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required defaultValue="you@example.com" />
      <textarea name="message" required minLength={10} />
      <button>Send</button>
    </form>
  )
}`,
          try: R`امسح سطر [[const form]] واستخدم [[e.currentTarget.reset()]] بعد الـ await: هتلاقي error إن currentTarget بقى null. وبعدين امسح [[name]] من الـ textarea وشوف إن message اختفت من البيانات.`,
          flag: "script",
          deep: {
            why: "مش كل فورم محتاج state لكل خانة. فورم تواصل أو تسجيل دخول محتاج القيم مرة واحدة وقت الإرسال. المتصفح أصلًا بيمسك القيم وبيعمل validation ([[required]] و [[type=\"email\"]] و [[minLength]])، فليه تكرر ده في React؟",
            how: R`React بتحط [[defaultValue]] مرة واحدة لما العنصر يتعمل، وبعدها بتسيب الخانة للمتصفح. لو غيّرت defaultValue بعدين مش هيحصل حاجة. عشان تعمل reset لقيم جديدة، غيّر [[key]] الفورم أو استخدم [[form.reset()]].

[[new FormData(form)]] بيلم كل عنصر ليه [[name]]: النصوص كـ string، والملفات كـ File، والـ checkbox بيظهر بس لو متعلّم (وقيمته [[on]] لو ملوش value). ولو فيه أكتر من قيمة بنفس الاسم استخدم [[fd.getAll('tags')]]. و [[Object.fromEntries]] بيحوّله object، بس لو الاسم متكرر بياخد آخر واحد.

ليه [[const form = e.currentTarget]] قبل الـ await؟ لأن [[currentTarget]] بيرجع null بعد ما الـ event يخلص. أي كود بعد await بقى برا الـ event، فلازم تحفظ العنصر الأول.

والـ validation بتاع المتصفح بيمنع الإرسال ويعرض رسالته، و [[:invalid]] في CSS بيلوّن الخانة. ولو محتاج رسايل بشكلك، react-hook-form (الدرس الجاي) بيشتغل uncontrolled برضه بس بيدّيك تحكم كامل. وفي React 19 تقدر تدّي [[action]] للفورم مباشرة فتوصلك الـ FormData وبيعمل reset لوحده (المستوى التالت).`,
            when: "فورم بيتقري مرة واحدة: تسجيل دخول، وتواصل، وإعدادات بتتحفظ بزرار. ورفع ملفات ([[<input type=\"file\">]] دايمًا uncontrolled).",
            mistakes: R`[[value]] و [[defaultValue]] على نفس الخانة. وتنسى [[name]] فالقيمة متوصلش. واستخدام [[e.currentTarget]] بعد await. والاعتماد على validation المتصفح بس: السيرفر لازم يتحقق تاني.`
          },
          lines: [
            "فورم بياخد دالة إرسال async من الأب.",
            "handler الإرسال async.",
            "امنع الـ reload.",
            "احفظ الفورم قبل أي await، لأن currentTarget بيبقى null بعدها.",
            "لم كل الخانات اللي ليها name في object وابعته، واستنى.",
            "فضّي الفورم بعد النجاح.",
            "قفلة الـ handler.",
            "بداية الـ JSX.",
            "الفورم.",
            "uncontrolled: قيمة أولى والمتصفح يمسك الباقي، و required بيمنع الإرسال لو فاضية.",
            "نفس الفكرة بحد أدنى ١٠ حروف.",
            "زرار جوه فورم نوعه submit افتراضيًا.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ]
        },
        {
          cmd: "react-hook-form + zod",
          title: "فورم فيه validation ورسايل خطأ من غير state لكل خانة",
          desc: R`react-hook-form بيدير الفورم كله: القيم، والأخطاء، وحالة الإرسال، من غير render مع كل حرف. و zod بيوصف شكل البيانات مرة واحدة، و [[zodResolver]] بيربطهم، فمن نفس الـ schema بيطلع الـ validation والـ type بتاع TypeScript.

[[register('email')]] بيوصّل الخانة، و [[handleSubmit]] مبينادي دالتك غير لو البيانات سليمة، و [[formState.errors]] فيه رسالة كل خانة.`,
          example: R`import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({ email: z.email('Enter a valid email'), password: z.string().min(8, 'At least 8 characters') })

export function LoginForm({ onLogin }: { onLogin: (data: z.infer<typeof schema>) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })
  return (
    <form onSubmit={handleSubmit(onLogin)} noValidate>
      <input type="email" aria-label="Email" {...register('email')} />
      <input type="password" aria-label="Password" {...register('password')} />
      {(errors.email || errors.password) && <p role="alert">{errors.email?.message ?? errors.password?.message}</p>}
      <button disabled={isSubmitting}>Log in</button>
    </form>
  )
}`,
          try: R`[[npm i react-hook-form zod @hookform/resolvers]]، وابعت onLogin بتستنى ثانيتين ([[await new Promise(r => setTimeout(r, 2000))]]). جرّب باسورد ٣ حروف، وبعدين بيانات سليمة وشوف الزرار بيتقفل وهو بيبعت.`,
          flag: "script",
          deep: {
            why: R`فورم فيه ٨ خانات بـ controlled inputs معناه ٨ state، و onChange لكل واحدة، و validation مكتوب بإيدك، ورسايل، و isSubmitting، وكل حرف بيعيد رسم الفورم كله. والـ backend بيكتب نفس قواعد الـ validation تاني. RHF و zod بيحلّوا الاتنين.`,
            how: R`[[register('email')]] بيرجّع [[name]] و [[onChange]] و [[onBlur]] و [[ref]]، والـ spread بيحطهم على الخانة. RHF بيقرا القيم من الـ DOM عن طريق الـ ref، يعني uncontrolled، فمفيش render مع كل حرف. والـ component بيعيد الرسم بس لما حاجة انت بتقراها من [[formState]] تتغير (زي [[errors]] أو [[isSubmitting]])، لأن formState مراقَب: اللي مش بتقراه مش بيتتبع.

[[handleSubmit(onLogin)]] بيعمل preventDefault، ويمرر القيم على الـ resolver (يعني [[schema.parse]])، لو فيه أخطاء يحطها في errors ويعمل focus على أول خانة غلط، ولو سليمة ينادي onLogin بالبيانات بعد ما zod حوّلها. و isSubmitting بتفضل true طول ما الـ promise بتاعة onLogin شغالة.

الـ validation افتراضيًا بيحصل عند الإرسال، وبعد أول محاولة بيتعاد مع كل تغيير عشان الرسالة تختفي أول ما المستخدم يصلّح. و [[mode: 'onBlur']] بيغيّر ده.

في Zod 4 [[z.email()]] بقت top-level ([[z.string().email()]] لسه شغالة بس deprecated)، والرسالة ممكن تتبعت string مباشرة. و [[z.infer<typeof schema>]] بيطلّع الـ type، فمفيش interface منفصل يتلخبط مع الـ schema.

أخطاء السيرفر (إيميل مستخدم قبل كده): [[setError('email', { message: 'Already registered' })]] بعد الرد. والـ components اللي مش input عادي (date picker من مكتبة) بتستخدم [[<Controller>]]. وأحسن حاجة: الـ schema نفسها تتحط في package مشترك والـ backend يعمل بيها parse للـ body (تاب Backend بـ Node).`,
            when: "أي فورم فيه أكتر من ٣ خانات أو validation حقيقي: تسجيل، ودفع، وإعدادات، وفورم admin لمنتج.",
            mistakes: R`الـ validation في الفرونت بس، والـ API بيقبل أي حاجة. ونسيان [[noValidate]] فرسايل المتصفح تطلع قبل رسايلك. و [[type="number"]] من غير [[z.coerce.number()]] أو [[valueAsNumber]]، فالقيمة بتوصل string والـ schema ترفض. و onLogin مش بترجع promise (نسيت await) فـ isSubmitting بترجع false على طول والمستخدم يدوس مرتين.`
          },
          lines: [
            "hook الفورم.",
            "الجسر بين RHF و zod.",
            "zod لوصف البيانات.",
            "الـ schema: إيميل صحيح، وباسورد ٨ حروف على الأقل، ورسالة لكل قاعدة.",
            "نوع البيانات بيطلع من الـ schema نفسها بـ [[z.infer]].",
            "register للخانات، و handleSubmit للإرسال، والأخطاء وحالة الإرسال. الأنواع بتتعرف من الـ resolver.",
            "بداية الـ JSX.",
            "[[noValidate]] يقفل رسايل المتصفح عشان رسايل zod هي اللي تظهر.",
            "register بيرجّع name و onChange و onBlur و ref، والـ spread بيحطهم.",
            "نفس الكلام للباسورد.",
            "أول رسالة خطأ لو فيه.",
            "الزرار مقفول طول ما onLogin شغالة.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ]
        },
        {
          cmd: "React Router",
          title: "صفحات كتير في تطبيق واحد، وكل صفحة ليها URL",
          desc: R`React Router بيربط كل URL بـ component. بتعرّف الـ routes في array، والـ layout route بيرسم الأجزاء الثابتة (header و sidebar) و [[<Outlet />]] مكان الصفحة، و [[:id]] في الـ path بيتقري بـ [[useParams]].

النسخة الحالية (v8) كل حاجة فيها من [[react-router]]، و RouterProvider من [[react-router/dom]]. الباكدج القديمة [[react-router-dom]] كانت مجرد re-export في v7 واتشالت في v8، فلو لقيتها في مشروع قديم غيّر الـ imports بس.`,
          example: R`import { createBrowserRouter, Link, Outlet, useParams } from 'react-router'
import { RouterProvider } from 'react-router/dom'

const Layout = () => <><nav><Link to="/">Home</Link> <Link to="/products/42">Product 42</Link></nav><Outlet /></>
function Product() {
  const { id } = useParams()
  return <h1>Product {id}</h1>
}
const router = createBrowserRouter([
  { path: '/', Component: Layout, children: [
    { index: true, Component: Home },
    { path: 'products/:id', Component: Product },
    { path: '*', Component: NotFound },
  ] },
])
export default function App() { return <RouterProvider router={router} /> }`,
          try: R`[[npm i react-router]]، واعمل Home و NotFound بسطر واحد لكل واحد. افتح [[/products/7]] و [[/xyz]]. وبعدين غيّر Link لـ [[<a href>]] وشوف الصفحة كلها بتعمل reload.`,
          flag: "script",
          deep: {
            why: "SPA معناها صفحة HTML واحدة. من غير router، كل «الصفحات» على نفس الـ URL: الـ Back مش شغال، ومتقدرش تبعت لحد رابط منتج، والـ refresh يرجّعك للبداية. React Router بيخلي الـ URL هو اللي بيقرر إيه اللي يترسم.",
            how: R`[[<Link>]] بيرسم [[<a>]] عادي، بس لما تدوس عليه بيمنع الـ reload، ويغيّر الـ URL بـ [[history.pushState]]، والـ router يطابق الـ URL الجديد مع الـ routes ويرسم الشجرة المناسبة. الـ Back والـ Forward شغالين عادي.

الـ routes متداخلة: [[/products/42]] بيطابق Layout وبعدين Product جواه، و Layout بيرسم Product مكان [[<Outlet />]]. ولما تتنقل بين صفحتين تحت نفس الـ Layout، الـ Layout مبيتشالش، فالـ state بتاعته (sidebar مفتوح مثلًا) بتفضل. و [[index: true]] الصفحة اللي تظهر على مسار الأب بالظبط، و [[*]] أي حاجة ملهاش route.

React Router ليه تلات أوضاع: declarative ([[<BrowserRouter>]] و [[<Routes>]] و [[<Route>]] جوه JSX)، و data mode (اللي في المثال: [[createBrowserRouter]])، و framework mode (plugin لـ Vite فيه SSR و type-safety، زي Remix القديمة). الـ data mode بيضيف loaders: [[loader: ({ params }) => getProduct(params.id)]] على الـ route، بيشتغل قبل ما الصفحة تترسم، والـ component يقرا النتيجة بـ [[useLoaderData()]]. ولو الـ loader رجّع [[redirect('/login')]] بيحوّل قبل ما حاجة تظهر.

و [[useNavigate()]] للتنقل من الكود (بعد إرسال فورم)، و [[useSearchParams()]] لـ [[?page=2&q=mug]] (درس URL state في المستوى التالت).

والسيرفر لازم يرجّع [[index.html]] لأي مسار مش ملف: في Nginx [[try_files $uri /index.html]] (تاب nginx). من غيرها refresh على [[/products/42]] يدّي 404.`,
            when: "أي SPA فيها أكتر من شاشة. وفي Next.js الراوتنج بالفولدرات ومش محتاج React Router (تاب Next.js).",
            mistakes: R`[[<a href="/cart">]] جوه التطبيق: reload كامل والـ state كلها بتروح. ومفيش route لـ [[*]] فالمسار الغلط يطلع صفحة فاضية. وفي مشروع حقيقي كل route من ٢٥ كان مكتوب [[<MainLayout><Page /></MainLayout>]] بإيده بدل layout route واحد فيه Outlet. وخلط [[react-router-dom]] و [[react-router]] بنسخ مختلفة في نفس المشروع.`
          },
          lines: [
            "كل حاجة من react-router.",
            "إلا RouterProvider من react-router/dom.",
            "Layout: روابط ثابتة، و Outlet مكان الصفحة الحالية.",
            "صفحة المنتج.",
            "اقرا :id من الـ URL. قيمته نص، مش رقم.",
            "اعرضه.",
            "قفلة Product.",
            "الـ router من array routes.",
            "الأب: كل الصفحات جوه Layout.",
            "الصفحة على / بالظبط.",
            "مسار فيه parameter.",
            "أي مسار تاني: 404.",
            "قفلة الأولاد.",
            "قفلة الـ array.",
            "التطبيق كله: ارسم الـ router."
          ]
        },
        {
          cmd: "protected route",
          title: "امنع صفحة عن اللي مش مسجّل دخول",
          desc: R`الـ protected route component بيتأكد من حالة الدخول قبل ما يرسم الصفحة: لو لسه بيتحقق يعرض loading، ولو مش داخل يحوّله لـ [[/login]] بـ [[<Navigate replace />]] ومعاه الصفحة اللي كان رايحها، عشان يرجعله بعد الدخول.

خد بالك: ده UX بس، مش حماية. أي حد يقدر يفتح DevTools ويغيّر الـ state. الحماية الحقيقية إن الـ API يرفض أي طلب من غير جلسة صالحة وصلاحية صح.`,
          example: R`import { Navigate, Outlet, useLocation } from 'react-router'

export function RequireAuth({ role }: { role?: 'admin' }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  if (isLoading) return <FullPageSpinner />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (role && user.role !== role) return <Navigate to="/403" replace />
  return <Outlet />
}
// في الـ routes: { Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] }
// وفي صفحة الدخول بعد النجاح (navigate من useNavigate):
const from = (useLocation().state as { from?: string } | null)?.from ?? '/'
navigate(from, { replace: true })`,
          try: R`اعمل [[useAuth]] بيرجّع [[isLoading: true]] ثانيتين وبعدين user. امسح سطر الـ isLoading وشوف إن المستخدم الداخل بيتحوّل للـ login وبيرجع (flicker).`,
          flag: "script",
          deep: {
            why: "صفحات زي الـ dashboard والـ checkout مالهاش معنى من غير مستخدم، والأحسن تحوّله للدخول بدل ما يشوف صفحة فاضية أو errors. ولما يدخل يرجع للمكان اللي كان عايزه، مش للصفحة الرئيسية.",
            how: R`route من غير [[path]] بس فيه [[children]] اسمه layout route: بيلف مجموعة صفحات، ويرسم [[<Outlet />]] لو مسموح. كده بتحمي عشر صفحات بمكان واحد.

[[<Navigate>]] بيعمل تحويل وقت الرسم. و [[replace]] بيستبدل الصفحة المحمية في الـ history بدل ما يضيف، فلما المستخدم يدوس Back من صفحة الدخول ميرجعش للمحمية فيتحوّل تاني (loop). و [[state]] بيعدّي بيانات للصفحة الجاية من غير ما تظهر في الـ URL.

الـ isLoading مهمة: بعد refresh التطبيق لسه مايعرفش المستخدم (بيطلب [[/api/me]] بالـ cookie). لو حكمت إنه «مش داخل» في اللحظة دي، هتحوّل ناس داخلين فعلًا.

في الـ data mode تقدر تعمل الفحص في loader أو middleware (بقى default في v8)، وترجّع [[redirect('/login')]] قبل ما الصفحة تترسم خالص.

والصلاحيات في الفرونت شكل بس: إخفاء زرار «امسح» عن المستخدم العادي كويس للـ UX، بس الـ endpoint نفسه لازم يرفض. أي حد يقدر يبعت الـ request من curl.`,
            when: "Dashboard، و checkout، وإعدادات الحساب، ولوحة الأدمن (بـ role).",
            mistakes: R`مفيش حالة loading فبيحصل flicker. ومن غير [[replace]] فالـ Back بيعمل loop. وتحمي في الفرونت بس والـ API مفتوح. وتخزين الـ JWT في localStorage: أي XSS يسرقه، والأأمن httpOnly cookie (تاب الأمان). وفي مشروع حقيقي كان الـ role بيتقارن بـ [['ADMIN']] و [['admin']] الاتنين، لأن الـ backend والفرونت مش متفقين على الشكل: وحّده في مكان واحد.`
          },
          lines: [
            "أدوات التحويل والـ Outlet والمكان الحالي.",
            "component بيلف الصفحات المحمية، و role اختياري.",
            "حالة الدخول من الـ auth (context أو store أو query).",
            "المسار الحالي، عشان نرجعله بعد الدخول.",
            "لسه بيتحقق: متحكمش دلوقتي.",
            "مش داخل: حوّل للدخول، واستبدل في الـ history، وابعت المسار في state.",
            "داخل بس مش أدمن: صفحة ممنوع.",
            "مسموح: ارسم الصفحة المطلوبة.",
            "قفلة.",
            "في صفحة الدخول: اقرا المسار اللي كان رايحه، أو الرئيسية.",
            "روح له، واستبدل صفحة الدخول في الـ history."
          ]
        }
      ]
    },
    {
      t: "بيانات السيرفر و state عام",
      l: 2,
      n: "TanStack Query للي جاي من السيرفر، و Zustand للـ state المشتركة في الفرونت",
      items: [
        {
          cmd: "useQuery",
          title: "هات بيانات من السيرفر بكاش و loading و retry جاهزين",
          desc: R`[[useQuery]] بياخد [[queryKey]] (اسم فريد للبيانات دي) و [[queryFn]] (دالة بترجع promise)، ويرجّعلك [[data]] و [[isPending]] و [[error]]. وهو بيتكفّل بالكاش، ومنع الطلبات المكررة، والـ retry، والردود اللي بترجع بترتيب غلط.

الـ key هو هوية البيانات، وأي متغير الـ queryFn معتمد عليه (رقم الصفحة، أو الفلتر، أو الـ id) لازم يبقى جوه الـ key. لما الـ key يتغير Query بيجيب لوحده، ولو رجعت لـ key قديم بيعرض الكاش فورًا.`,
          example: R`import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

async function getProducts(page: number): Promise<Product[]> {
  const res = await fetch($__bt/api/products?page=$__{page}$__bt)
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt)
  return res.json()
}
function Products({ page }: { page: number }) {
  const { data, isPending, error } = useQuery({ queryKey: ['products', page], queryFn: () => getProducts(page) })
  if (isPending) return <p>Loading...</p>
  if (error) return <p role="alert">{error.message}</p>
  return <ul>{data.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}
export const App = () => <QueryClientProvider client={queryClient}><Products page={1} /></QueryClientProvider>`,
          try: R`[[npm i @tanstack/react-query @tanstack/react-query-devtools]]، وحط [[<ReactQueryDevtools />]] جوه الـ provider. ارسم Products مرتين في نفس الصفحة وشوف في Network إنه طلب واحد بس. وبعدين روح لصفحة 2 وارجع لـ 1: البيانات بتظهر على طول.`,
          flag: "script",
          deep: {
            why: R`بيانات السيرفر مش زي state عادية: نسختها الأصلية بعيد، وبتقدم، وناس تانية بتغيّرها. عشان تتعامل معاها صح بإيدك محتاج: loading و error، وإلغاء الطلبات القديمة، وكاش عشان متطلبش نفس الحاجة مرتين، وتحديث لما المستخدم يرجع للتاب، و retry لما الشبكة تهنّج. ده مئات السطور بتتكرر في كل صفحة، و TanStack Query بيعملها كلها.`,
            how: R`[[QueryClient]] جواه كاش: map مفتاحها الـ queryKey بعد ما يتحوّل لنص ثابت (ترتيب مفاتيح الـ object مش فارق). كل [[useQuery]] مشترك في entry في الكاش ده.

أول ما component يطلب key: لو مفيش بيانات، [[isPending]] بتبقى true و queryFn تشتغل. لو فيه بيانات، بترجع فورًا، ولو قديمة (stale) بيعيد الجلب في الخلفية ويحدّث لما يخلص. واتنين components بنفس الـ key في نفس الوقت: طلب واحد بس.

الفرق بين [[isPending]] (لسه مفيش data خالص) و [[isFetching]] (فيه طلب شغال، حتى لو في الخلفية وفيه data قديمة معروضة). في v5 [[isLoading]] بقت معناها [[isPending && isFetching]].

الـ queryFn لازم ترمي error عشان Query يعرف إن الطلب فشل، و fetch مبترميش على 404 و 500، فالـ [[res.ok]] ضروري. ولما يفشل بيعمل retry تلات مرات بتأخير بيزيد (حوالي ٧ ثواني قبل ما الـ error يظهر).

والـ QueryClient يتعمل مرة واحدة: برا الـ component، أو جوه [[useState(() => new QueryClient())]] (ده الشكل الصح في Next.js عشان كل request على السيرفر ياخد كاش لوحده).`,
            when: "أي بيانات جاية من API في component بيشتغل في المتصفح: lists، وصفحات تفاصيل، و dashboards. والأحسن تعمل hook لكل resource: [[useProducts(page)]] بيلف الـ useQuery، فالـ key والـ URL في مكان واحد.",
            mistakes: R`متغير مستخدم في queryFn ومش في الـ key: صفحة 2 بتعرض بيانات صفحة 1 من الكاش. و [[new QueryClient()]] جوه جسم الـ component: كاش جديد كل render. ونسخ data في [[useState]] فتبطل تتحدث. ومفيش [[res.ok]] فالـ 500 بيتعرض كأنه بيانات.`
          },
          lines: [
            "الـ client، والـ provider، والـ hook.",
            "كاش واحد للتطبيق كله، برا أي component.",
            "دالة الجلب: بترجع promise بالمنتجات.",
            "اطلب الصفحة.",
            "ارمي error على أي status مش ناجح، عشان Query يعرف.",
            "رجّع الـ JSON.",
            "قفلة الدالة.",
            "component بيعرض صفحة.",
            "الـ key فيه رقم الصفحة، فكل صفحة ليها كاش لوحدها.",
            "مفيش data لسه.",
            "فشل بعد الـ retries. error هنا نوعه Error.",
            "هنا TypeScript عارف إن data موجودة.",
            "قفلة.",
            "الـ provider بيلف التطبيق عشان أي useQuery يلاقي الكاش."
          ]
        },
        {
          cmd: "staleTime و gcTime",
          title: "البيانات تفضل «طازة» قد إيه، وتفضل في الكاش قد إيه",
          desc: R`[[staleTime]] المدة اللي البيانات بتعتبر فيها طازة: طول ما هي طازة Query مش هيعيد جلبها. الافتراضي صفر، يعني أي mount جديد أو رجوع للتاب بيعمل refetch في الخلفية. و [[gcTime]] المدة اللي البيانات بتفضل فيها في الكاش بعد ما محدش بقى بيستخدمها، والافتراضي ٥ دقايق.

الاتنين مختلفين: stale مش معناها اتمسحت. البيانات القديمة بتتعرض فورًا وفي نفس الوقت بيجيب الجديدة، ودي فكرة stale-while-revalidate.`,
          example: R`const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
})
useQuery({ queryKey: ['settings'], queryFn: getSettings, staleTime: Infinity })
useQuery({ queryKey: ['orders', 'live'], queryFn: getLiveOrders, refetchInterval: 10_000 })
useQuery({ queryKey: ['user', id], queryFn: () => getUser(id!), enabled: !!id })`,
          try: R`خلي staleTime صفر، وافتح Network، وروح لتاب تاني في المتصفح وارجع: هتلاقي طلب جديد. خليها 60 ثانية وكرّر.`,
          flag: "script",
          deep: {
            why: R`كل نوع بيانات بيتغير بسرعة مختلفة: إعدادات الموقع يمكن مرة في الشهر، وقايمة المنتجات كل يوم، والطلبات الحية كل ثواني. لو كله بيتعامل بنفس الطريقة، يا إما بتطلب كتير على الفاضي، يا إما المستخدم بيشوف بيانات قديمة.`,
            how: R`دورة حياة الـ query: fresh (جديدة) لحد ما staleTime يخلص، وبعدين stale. طول ما فيه component بيستخدمها اسمها active. لما آخر واحد يتشال بقت inactive، ولو فضلت كده مدة gcTime بتتمسح من الكاش.

الـ stale query بيتعاد جلبها في الخلفية لما: component جديد يستخدمها (refetchOnMount)، أو المستخدم يرجع للتاب (refetchOnWindowFocus)، أو النت يرجع (refetchOnReconnect)، أو تعمل invalidate. والـ fresh مبيحصلهاش حاجة من دول. يعني staleTime هو اللي بيتحكم في عدد الطلبات.

الاختيار: [[Infinity]] لحاجة مبتتغيرش غير بفعل منك (وانت بتعمل invalidate بعد التعديل). ودقيقة لخمسة لأغلب الـ lists. وصفر مع [[refetchInterval]] للحاجات الحية. و [[enabled: false]] بيوقف الـ query لحد ما شرط يتحقق، زي id لسه موجاش.

وفي الـ pagination، لما الـ key يتغير لصفحة جديدة مش في الكاش، الـ data بتبقى undefined وبيظهر loading. [[placeholderData: keepPreviousData]] بيخلي الصفحة القديمة معروضة لحد ما الجديدة توصل.

في مشروع حقيقي كان الإعداد العام [[staleTime: 60 * 1000]] و [[refetchOnWindowFocus: false]] و [[retry: 2]]. ده اختيار معقول للوحة أدمن، بس خد بالك إن قفل الـ focus refetch معناه إن الأدمن لو ساب التاب ساعة ورجع، هيشوف القديم لحد ما يتنقل.`,
            when: "حدد defaults معقولة في الـ QueryClient، وغيّر لكل query حسب طبيعة بياناتها.",
            mistakes: R`تفتكر إن staleTime هو مدة الكاش (ده gcTime). و staleTime كبير من غير invalidate بعد التعديل، فالمستخدم يعدّل ومش شايف التعديل. وتقفل كل الـ refetch وبعدين تعمل زرار «تحديث» بإيدك. و «ليه بيطلب لما أغيّر التاب؟»: ده الـ feature نفسها، ظبط staleTime بدل ما تقفلها.`
          },
          lines: [
            "الإعدادات الافتراضية لكل الـ queries.",
            "القسم العام.",
            "للـ queries.",
            "البيانات طازة دقيقة، فمفيش طلبات تانية جوه الدقيقة.",
            "لو محدش بيستخدمها، تفضل في الكاش ٥ دقايق وبعدين تتمسح.",
            "حاول مرتين بدل تلاتة.",
            "هات الجديد لما المستخدم يرجع للتاب (لو stale). ده الافتراضي أصلًا.",
            "قفلة queries.",
            "قفلة defaultOptions.",
            "قفلة.",
            "إعدادات بتتغير نادرًا: مبتبقاش stale أبدًا لحد ما تعمل invalidate.",
            "بيانات حية: اطلبها كل ١٠ ثواني.",
            "query معتمدة على id: متشتغلش غير لما id يبقى موجود."
          ]
        },
        {
          cmd: "useMutation",
          title: "ابعت تعديل للسيرفر وحدّث الكاش بعده",
          desc: R`[[useMutation]] للطلبات اللي بتغيّر بيانات (POST و PUT و DELETE). بيدّيك [[mutate]] تناديها من الـ handler، و [[isPending]] و [[error]] لحالة الطلب.

بعد النجاح، البيانات اللي في الكاش بقت قديمة. أسهل حل [[invalidateQueries]]: بتعلّم كل queries بتبدأ بالـ key ده إنها stale، واللي معروض منها على الشاشة بيتجاب تاني على طول.`,
          example: R`function DeleteButton({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const remove = useMutation({
    mutationFn: async () => {
      const res = await fetch($__bt/api/products/$__{id}$__bt, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    onError: err => toast(err.message),
  })
  return <button onClick={() => remove.mutate()} disabled={remove.isPending}>{remove.isPending ? 'Deleting...' : 'Delete'}</button>
}`,
          try: R`حط الزرار جنب كل منتج في الـ list بتاعة درس useQuery، وامسح منتج وشوف في Network: DELETE وبعده GET للـ list لوحده. غيّر الـ key في invalidate لـ [[['product']]] (من غير s) وشوف إن الـ list مبقتش بتتحدث.`,
          flag: "script",
          deep: {
            why: R`بعد أي تعديل، فيه ٣ حاجات لازم تحصل: الزرار يتقفل وهو بيبعت، والخطأ يظهر لو فشل، وكل مكان بيعرض البيانات دي يتحدث. من غير useMutation بتكتب loading و error بإيدك، وبتنسى تحدّث list في صفحة تانية.`,
            how: R`[[mutate(variables)]] بتشغّل [[mutationFn]]، والترتيب: [[onMutate]] قبل الطلب، وبعده [[onSuccess]] أو [[onError]]، وفي الآخر [[onSettled]] في الحالتين. وتقدر تحط callbacks في [[mutate(vars, { onSuccess })]] نفسها، بس دي مبتتناداش لو الـ component اتشال قبل ما الطلب يخلص.

و [[mutateAsync]] بترجع promise، مفيدة لو عايز await (بعد ما تحفظ روح لصفحة تانية)، بس لازم try/catch وإلا الـ error هيبقى unhandled.

[[invalidateQueries({ queryKey: ['products'] })]] بتطابق بالبادية: [[['products', 1]]] و [[['products', { q: 'mug' }]]] الاتنين. ولو عايز key بالظبط [[exact: true]]. والـ queries المعروضة بيتعاد جلبها على طول، والباقي لما حد يستخدمها.

ولو رجّعت الـ promise من onSuccess (زي المثال، الـ arrow بترجع نتيجة invalidate)، [[isPending]] بتفضل true لحد ما الـ list الجديدة توصل، فالزرار ميتفتحش والـ list لسه قديمة.

بديل الـ invalidate: لو السيرفر رجّع العنصر بعد التعديل، [[queryClient.setQueryData(['product', id], updated)]] تحطه في الكاش مباشرة من غير طلب تاني.

والـ mutations مبتعملش retry افتراضيًا (عكس الـ queries)، وده صح: مش عايز طلب دفع يتبعت مرتين.`,
            when: "أي POST أو PUT أو PATCH أو DELETE من component. وفي مشروع حقيقي كان فيه hooks عامة زي [[useCreateMutation(endpoint, queryKey)]] بتعمل invalidate بعد النجاح، وده pattern كويس يوفر تكرار.",
            mistakes: R`شكل الـ key في invalidate مختلف عن اللي في useQuery ([[['product']]] و [[['products']]])، فمفيش حاجة بتتحدث. واستخدام useQuery لطلب POST. و mutateAsync من غير try/catch. ومفيش onError فالمستخدم يدوس ومش عارف فشل ولا لأ.`
          },
          lines: [
            "زرار مسح لمنتج.",
            "الـ client، عشان نوصل للكاش.",
            "الـ mutation:",
            "الدالة اللي بتعمل التعديل.",
            "اطلب المسح.",
            "ارمي لو فشل، عشان onError يشتغل.",
            "قفلة الدالة.",
            "بعد النجاح: علّم كل queries المنتجات إنها قديمة، فالمعروض يتجاب تاني.",
            "بعد الفشل: قول للمستخدم.",
            "قفلة.",
            "الزرار مقفول ونصه بيتغير وهو بيبعت.",
            "قفلة."
          ]
        },
        {
          cmd: "optimistic update",
          title: "حدّث الشاشة قبل ما السيرفر يرد، وارجع لو فشل",
          desc: R`التحديث المتفائل: بتعدّل الكاش على طول كأن الطلب نجح، فالمستخدم يشوف النتيجة من غير ما يستنى. لو السيرفر رفض، بترجّع النسخة القديمة اللي حفظتها. مناسب لحاجات غالبًا بتنجح: like، و checkbox، وترتيب بالسحب.

في TanStack Query بتعمله في [[onMutate]]: تلغي أي جلب شغال، وتحفظ القديم، وتكتب الجديد. و [[onError]] يرجّع القديم، و [[onSettled]] يعمل invalidate عشان تتأكد إنك متطابق مع السيرفر.`,
          example: R`const queryClient = useQueryClient()
const toggleDone = useMutation({
  mutationFn: (todo: Todo) => api.patch($__bt/todos/$__{todo.id}$__bt, { done: !todo.done }),
  onMutate: async (todo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] })
    const previous = queryClient.getQueryData<Todo[]>(['todos'])
    queryClient.setQueryData<Todo[]>(['todos'], old =>
      old?.map(t => (t.id === todo.id ? { ...t, done: !t.done } : t)))
    return { previous }
  },
  onError: (_err, _todo, result) => queryClient.setQueryData(['todos'], result?.previous),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})`,
          try: R`خلي الـ API يرفض كل مرة تالتة، واعمل throttling على Slow 3G. دوس checkbox: هيتعلّم على طول، وفي المرة الفاشلة هيرجع لوحده بعد ثانية.`,
          flag: "script",
          deep: {
            why: "انتظار السيرفر عشان checkbox يتعلّم بيخلي التطبيق يحسس إنه بطيء، حتى لو الطلب ٣٠٠ms. أغلب التعديلات دي بتنجح، فمنطقي تعرض النتيجة على طول وتتعامل مع الفشل النادر.",
            how: R`[[cancelQueries]] الأول: لو فيه refetch شغال لـ todos، ممكن يرجع بعد ما كتبت النسخة المتفائلة ويكتب فوقها بالبيانات القديمة من السيرفر. الإلغاء بيمنع ده.

[[getQueryData]] بتاخد snapshot من اللي في الكاش، و [[setQueryData]] بتكتب النسخة الجديدة (بنفس قواعد الـ immutable updates)، وكل component بيستخدم ['todos'] بيتحدث على طول.

اللي بترجّعه من onMutate بيوصل لـ onError و onSettled كـ argument تالت (في الـ docs الجديدة اسمه onMutateResult). وفي v5 الجديدة كل callback بياخد كمان argument أخير فيه [[client]]، فتقدر تستخدمه بدل useQueryClient.

[[onSettled]] بيعمل invalidate في الحالتين: لو نجح، السيرفر ممكن حسب حاجات تانية (updatedAt مثلًا)، ولو فشل تتأكد إن الكاش رجع مظبوط.

فيه طريقة أبسط لما النتيجة بتظهر في مكان واحد بس: متلمسش الكاش، واعرض [[mutation.variables]] وانت [[isPending]] (عنصر جديد باهت مثلًا). ولو فشل، الـ variables لسه موجودة تعرض جنبها «حاول تاني».

وفي React 19 فيه [[useOptimistic]] بنفس الفكرة للـ Actions (المستوى التالت).

وفي مشروع حقيقي، ترتيب المنتجات بالسحب (dnd-kit) كان بيعمل الفكرة دي بإيده: [[arrayMove]] على الـ state، وبعدين يبعت الترتيب الجديد، ولو فشل يرجّع الـ list القديمة. الفكرة صح، والفرق إن مع Query الكاش واحد لكل الصفحات.`,
            when: "تعديلات صغيرة غالبًا بتنجح وتأثيرها واضح: like، و toggle، وإعادة ترتيب، ومسح عنصر من list. مش للدفع ولا أي حاجة لو فشلت المستخدم لازم يعرف بوضوح.",
            mistakes: R`مفيش rollback فالشاشة بتفضل تكدب بعد الفشل. ومفيش cancelQueries فالنسخة المتفائلة بتتمسح. وتحديث متفائل لحاجات السيرفر بيحسبها (السعر بعد الخصم) فالرقم يتغير مرتين. ومفيش onSettled فالكاش ممكن يفضل مختلف عن السيرفر.`
          },
          lines: [
            "الـ client.",
            "الـ mutation:",
            "الطلب الحقيقي.",
            "قبل الطلب:",
            "الغي أي جلب شغال للـ todos عشان ميكتبش فوق التعديل.",
            "احفظ النسخة الحالية.",
            "اكتب النسخة الجديدة في الكاش:",
            "نفس الـ list بس العنصر ده done مقلوبة.",
            "رجّع القديم عشان onError يلاقيه.",
            "قفلة onMutate.",
            "فشل: رجّع النسخة المحفوظة.",
            "في الحالتين: هات النسخة الحقيقية من السيرفر.",
            "قفلة."
          ]
        },
        {
          cmd: "Zustand",
          title: "store عام صغير من غير providers",
          desc: R`Zustand مكتبة state عام: بتعمل store بـ [[create]] فيه القيم والدوال اللي بتغيّرها، وأي component يقرا منه بـ hook. مفيش Provider تلف بيه التطبيق.

المهم: اقرا بـ selector، [[useCartStore(s => s.items)]]. كده الـ component بيعيد الرسم لما القيمة دي بس تتغير. لو ناديت [[useCartStore()]] من غير selector، هيعيد الرسم مع أي تغيير في الـ store كله.`,
          example: R`import { create } from 'zustand'

type CartState = {
  items: { id: string; qty: number }[]
  add: (id: string) => void
}
export const useCartStore = create<CartState>()(set => ({
  items: [],
  add: id => set(s => {
    const found = s.items.find(i => i.id === id)
    return { items: found ? s.items.map(i => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...s.items, { id, qty: 1 }] }
  }),
}))
// في أي component:
const count = useCartStore(s => s.items.reduce((n, i) => n + i.qty, 0))
const add = useCartStore(s => s.add)`,
          try: R`[[npm i zustand]]، واعمل component بيعرض count وزرار بيعمل add. بعدين اقرا الاتنين مع بعض [[useCartStore(s => ({ count: s.items.length, add: s.add }))]] وشوف الـ error «Maximum update depth exceeded».`,
          flag: "script",
          deep: {
            why: "فيه state كتير components بعيدة عن بعض محتاجاها: السلة (الـ header بيعرض العدد، وصفحة المنتج بتضيف، وصفحة الدفع بتقرا)، والـ sidebar مفتوح ولا لأ، والـ toasts. context ممكن، بس كل تغيير بيعيد رسم كل اللي بيقروه. Zustand بيخلي كل component يشترك في الجزء اللي يهمه بس.",
            how: R`الـ store عايش برا React: object عادي في module، و [[create]] بترجّع hook. الـ hook جواه مبني على [[useSyncExternalStore]]: الـ component بيشترك في الـ store، ومع كل [[set]] Zustand بيشغّل الـ selector بتاع كل component ويقارن النتيجة بالقديمة بـ [[Object.is]]. لو زي ما هي، مفيش render.

[[set]] بتعمل merge على المستوى الأول بس: [[set({ items })]] بتسيب باقي الـ keys زي ما هي، بس جوه items لازم تعمل نسخة بنفسك (immutable). ولو set أخدت دالة، بتاخد الـ state الحالية.

الـ selector اللي بيرجّع object جديد ([[s => ({ a: s.a, b: s.b })]]) بيرجع مرجع جديد كل مرة، فالمقارنة دايمًا «اتغير». في v5 ده بيعمل loop لحد «Maximum update depth exceeded». الحل: selector لكل قيمة، أو [[useShallow]] من [[zustand/shallow]] بيقارن محتوى الـ object مش مرجعه.

وتقدر توصل للـ store برا React خالص: [[useCartStore.getState().add('x')]]. في مشروع حقيقي كان فيه دالة [[toast()]] بتنادي [[useToastStore.getState().push(...)]] من جوه interceptor بتاع axios. ده استخدام نضيف.

وفي نفس المشروع كان فيه store واحد ١١٠٠ سطر شايل كل بيانات السيرفر (موظفين، وإيرادات، ومصروفات) ودوال [[loadX]] لكل واحدة، و ٢٢ component بيقروا بـ [[useDataStore()]] من غير selector. النتيجة: أي تحميل في أي حتة بيعيد رسم كل الصفحات دي. بيانات السيرفر مكانها React Query، و Zustand للـ state بتاعة الفرونت بس.`,
            when: "Client state مشتركة بين components بعيدة: السلة قبل الدفع، وتفضيلات الواجهة، والـ modals و toasts، و wizard من كذا خطوة.",
            mistakes: R`[[useStore()]] من غير selector. و selector بيرجّع object جديد من غير useShallow. وتخزين بيانات السيرفر في الـ store (loading و error و refetch بإيدك). وتعديل الـ state في مكانها جوه set ([[s.items.push(x)]]).`
          },
          lines: [
            "create بس.",
            "شكل الـ store.",
            "العناصر.",
            "والدالة اللي بتضيف.",
            "قفلة الـ type.",
            "اعمل الـ store. الأقواس الزيادة [[()]] عشان TypeScript يعرف النوع.",
            "القيمة الأولى.",
            "add بتنادي set بدالة بتاخد الـ state الحالية.",
            "العنصر موجود؟",
            "لو موجود زوّد الكمية في نسخة جديدة، لو لأ ضيفه. set بتعمل merge مع باقي الـ store.",
            "قفلة add.",
            "قفلة الـ store.",
            "selector بيرجّع رقم: الـ component بيعيد الرسم لما الرقم يتغير بس.",
            "والدالة نفسها ثابتة، فالقراية دي مبتعملش render أبدًا."
          ]
        },
        {
          cmd: "persist",
          title: "احفظ الـ store في localStorage لوحده",
          desc: R`الـ middleware [[persist]] بيحفظ الـ store في localStorage مع كل تغيير، ويرجّعه لما الصفحة تفتح. بتدّيله [[name]] (المفتاح في التخزين)، و [[partialize]] تختار بيه الحقول اللي تتحفظ بس.

مفيد للثيم، واللغة، والسلة قبل الدخول. ولو غيّرت شكل البيانات في نسخة جديدة، [[version]] و [[migrate]] بيحوّلوا القديم للجديد بدل ما التطبيق يقع.`,
          example: R`import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Settings = { theme: 'light' | 'dark'; lang: 'ar' | 'en'; sidebarOpen: boolean; toggleTheme: () => void }

export const useSettings = create<Settings>()(
  persist(
    set => ({
      theme: 'light', lang: 'ar', sidebarOpen: true,
      toggleTheme: () => set(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'myapp-settings', version: 1, partialize: s => ({ theme: s.theme, lang: s.lang }) }
  )
)`,
          try: R`غيّر الثيم واعمل refresh: باقي. افتح DevTools > Application > Local Storage وبص على [[myapp-settings]]: هتلاقي theme و lang و version، ومفيش sidebarOpen.`,
          flag: "script",
          deep: {
            why: "من غير persist بتكتب loadSettings و saveSettings بإيدك، وتفتكر تنادي save في كل setter، وتتعامل مع JSON بايظ. وفي مشروع حقيقي كان settings store بالشكل ده بالظبط: قراية من localStorage في الأول، و [[saveSettings({ ...get(), theme })]] في كل دالة. persist بيعمل ده في ٣ سطور.",
            how: R`persist بيلف دالة الـ store. لما الـ store يتعمل، بيقرا المفتاح من التخزين ويدمجه فوق القيم الافتراضية (مع localStorage ده بيحصل على طول لأنه متزامن). ومع كل set بيكتب [[partialize(state)]] كـ JSON ومعاه رقم الـ version.

الدوال مش بتتحفظ أصلًا (JSON مبيعرفش دوال)، وبتيجي من الـ store نفسه. و [[partialize]] مهمة عشان متحفظش حاجات مؤقتة: لو حفظت [[isLoading: true]] بالغلط، التطبيق هيفتح المرة الجاية وهو فاكر نفسه بيحمّل.

لو غيّرت شكل البيانات (theme بقت object مثلًا)، زوّد [[version]] واكتب [[migrate(persisted, oldVersion)]] يحوّل القديم. من غيرها المستخدمين القدام هيفتحوا بشكل قديم والتطبيق يقع.

[[storage: createJSONStorage(() => sessionStorage)]] لو عايز التخزين يروح مع قفل التاب. و [[useSettings.persist.clearStorage()]] يمسحه (مثلًا عند الخروج).

والـ side effects زي [[document.documentElement.classList.toggle('dark')]] متحطهاش جوه الـ setters: حطها في effect في component بيقرا theme، أو في [[useSettings.subscribe]]. وفي Next.js التخزين مش موجود على السيرفر، فممكن يحصل hydration mismatch: فيه [[skipHydration]] وتعمل rehydrate في effect.`,
            when: "تفضيلات بتفضل بين الزيارات، وسلة الزائر قبل الدخول، ومسودة wizard طويل.",
            mistakes: R`تحفظ الـ store كله بما فيه loading و errors. وتحفظ توكن أو بيانات حساسة. ومفيش version فتغيير الشكل يوقّع المستخدمين القدام. واتنين stores بنفس الـ name فواحد بيكتب فوق التاني.`
          },
          lines: [
            "create.",
            "الـ middleware.",
            "شكل الإعدادات.",
            "store، والأقواس الزيادة عشان TypeScript مع الـ middleware.",
            "persist بيلف دالة الـ store.",
            "دالة الـ store العادية.",
            "القيم الافتراضية (بتتستبدل باللي في التخزين لو موجود).",
            "دالة بتقلب الثيم، و persist بيحفظ بعدها لوحده.",
            "قفلة دالة الـ store.",
            "الإعدادات: المفتاح في localStorage، ورقم نسخة الشكل، وأنهي حقول تتحفظ.",
            "قفلة persist.",
            "قفلة create."
          ]
        }
      ]
    },
    {
      t: "اللغات والأخطاء والتحميل",
      l: 2,
      n: "عربي وإنجليزي و RTL، وخطأ في جزء ميوقعش الصفحة، وكود بيتحمّل وقت الحاجة، و modals",
      items: [
        {
          cmd: "react-i18next",
          title: "تطبيق بأكتر من لغة",
          desc: R`react-i18next بيحط كل النصوص في ملفات JSON لكل لغة، وفي الـ component بتنادي [[t('cart.title')]] بدل ما تكتب النص. [[useTranslation]] بيدّيك [[t]] و [[i18n]]، و [[i18n.changeLanguage('ar')]] بيغيّر اللغة وكل component بيستخدم t بيعيد الرسم.

المتغيرات بتتكتب [[{{name}}]] جوه النص، والجمع بيتظبط لوحده حسب [[count]] بلواحق زي [[_one]] و [[_other]]، والعربي ليه ٦ أشكال. وفي Next.js الأشهر next-intl، وتفاصيله في تاب Next.js.`,
          example: R`import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: { greeting: 'Hello {{name}}', items_one: '{{count}} item', items_other: '{{count}} items' } },
    ar: { translation: { greeting: 'أهلًا {{name}}', items_zero: 'مفيش حاجة', items_one: 'حاجة واحدة', items_two: 'حاجتين', items_few: '{{count}} حاجات', items_many: '{{count}} حاجة', items_other: '{{count}} حاجة' } },
  },
})
function Header({ name, count }: { name: string; count: number }) {
  const { t, i18n } = useTranslation()
  return <header>{t('greeting', { name })} · {t('items', { count })} <button onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}>EN/AR</button></header>
}`,
          try: R`[[npm i i18next react-i18next]]، وحط الـ init في [[src/i18n.ts]] واعمله import في [[main.tsx]]. جرّب count بـ 0 و 1 و 2 و 3 و 11 بالعربي وشوف الشكل بيتغير. (النتيجة: مفيش حاجة، وحاجة واحدة، وحاجتين، و 3 حاجات، و 11 حاجة.)`,
          flag: "script",
          deep: {
            why: "لو النصوص مكتوبة جوه الـ components، إضافة لغة معناها تعدّل كل ملف. ولو عملت [[lang === 'ar' ? ... : ...]] في كل حتة، الكود بيتملى شروط والجمع بيطلع غلط. ملفات ترجمة منفصلة معناها المترجم يشتغل من غير ما يلمس الكود.",
            how: R`i18next هو المحرك (مش مربوط بـ React)، و react-i18next بيربطه بـ React عن طريق [[initReactI18next]]. الـ init بيتعمل مرة واحدة في ملف لوحده ويتعمله import في [[main.tsx]] قبل App.

[[useTranslation]] بيشترك في event [[languageChanged]]، فلما تنادي changeLanguage كل component بيستخدمه بيعيد الرسم. و [[t('key')]] بيدوّر في اللغة الحالية، ولو المفتاح مش موجود يروح لـ fallbackLng، ولو مش موجود خالص يرجّع المفتاح نفسه كنص (عشان تلاحظه).

الجمع مبني على [[Intl.PluralRules]] بتاع المتصفح: للإنجليزي one و other، وللعربي zero و one و two و few (3 لـ 10) و many (11 لـ 99) و other. انت بتكتب [[t('items', { count })]] وهو بيختار اللاحقة.

[[escapeValue: false]] لأن React أصلًا بتعمل escape لأي نص، فمن غيرها هتشوف [[&amp;]] بدل [[&]].

في مشروع أكبر، الترجمات في [[public/locales/ar/common.json]] وبتتحمّل بـ i18next-http-backend وقت الحاجة، ومقسّمة namespaces (common و checkout و dashboard). والتحميل ده async، و react-i18next افتراضيًا بيستخدم Suspense، فلازم [[<Suspense>]] فوق. و i18next-browser-languagedetector بيختار اللغة من cookie أو localStorage أو المتصفح.

ولو الجملة فيها link أو bold في النص، [[<Trans>]] بيسمحلك تحط JSX جوه الترجمة. والأرقام والتواريخ بـ [[Intl.NumberFormat]] و [[Intl.DateTimeFormat]] حسب اللغة.`,
            when: "أي تطبيق هيبقى فيه أكتر من لغة، حتى لو «بعدين». نقل النصوص من الكود بعد ما يكبر أصعب بكتير.",
            mistakes: R`تبني الجملة من حتت [[t('hello') + ' ' + name]]: ترتيب الكلام في العربي مختلف، استخدم [[{{name}}]]. و [[count + ' items']] بإيدك بدل الجمع. و http backend من غير Suspense فالتطبيق يقع أو يفضل فاضي. وفي مشروع حقيقي كان [[preload]] للغتين وكل الـ ١١ namespace من أول تحميل: ٢٢ ملف JSON قبل ما الصفحة تظهر، وده عكس فكرة التحميل وقت الحاجة.`
          },
          lines: [
            "المحرك.",
            "الربط مع React، والـ hook.",
            "سجّل الربط وابدأ.",
            "اللغة الأولى.",
            "لو مفتاح ناقص في العربي، خده من الإنجليزي.",
            "React بتعمل escape لوحدها، فمنعملش مرتين.",
            "الترجمات (في مشروع حقيقي في ملفات JSON منفصلة).",
            "الإنجليزي: متغير بين {{ }}، وشكلين للجمع.",
            "العربي: ستة أشكال للجمع حسب الرقم.",
            "قفلة resources.",
            "قفلة init.",
            "component بيستخدم الترجمة.",
            "t للنصوص، و i18n لتغيير اللغة.",
            "نص بمتغير، وجمع حسب count، وزرار بيقلب اللغة فكل حاجة تعيد الرسم.",
            "قفلة."
          ]
        },
        {
          cmd: "RTL",
          title: "اقلب اتجاه الصفحة مع العربي",
          desc: R`لما اللغة تبقى عربي لازم [[<html dir="rtl" lang="ar">]]، والمتصفح بعدها بيقلب ترتيب النص والـ flex والـ grid لوحده. والاتجاه دايمًا محسوب من اللغة، مش state لوحده: [[i18n.dir()]] بيرجّع [[rtl]] أو [[ltr]].

والـ CSS اكتبه بالخصائص المنطقية: [[margin-inline-start]] بدل [[margin-left]]، وفي Tailwind [[ms-4]] و [[pe-2]] و [[text-start]] بدل [[ml-4]] و [[pr-2]] و [[text-left]]. كده نفس الكلاس يشتغل صح في الاتجاهين.`,
          example: R`import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useDocumentDirection() {
  const { i18n } = useTranslation()
  const dir = i18n.dir(i18n.language)
  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = dir
  }, [i18n.language, dir])
  return dir
}
function PriceRow({ label, price }: { label: string; price: string }) {
  return <div className="flex justify-between gap-2 ps-4 text-start"><span>{label}</span><bdi dir="ltr">{price}</bdi></div>
}`,
          try: R`نادي الـ hook في App، واقلب اللغة، وشوف الـ flex بيتقلب لوحده. بعدين حط رقم تليفون [[+20 100 000 0000]] جوه جملة عربي من غير [[<bdi>]] وشوف العلامة بتروح فين.`,
          flag: "script",
          deep: {
            why: "العربي مش ترجمة نصوص بس: الصفحة كلها بتتقلب. لو كاتب [[margin-left]] و [[left: 0]] و [[text-align: left]] في كل حتة، هتقضي أيام تكتب overrides لـ [[[dir=rtl]]]، وكل component جديد هيتنسي.",
            how: R`[[dir]] على [[<html>]] بيحدد الاتجاه الأساسي للصفحة. الـ flex بـ [[row]] بيمشي مع اتجاه السطر، فبيتقلب لوحده، ونفس الكلام للـ grid وترتيب الأعمدة في الجداول.

الخصائص المنطقية بتقول «البداية» و «النهاية» بدل «شمال» و «يمين»: [[margin-inline-start]] بتبقى شمال في الإنجليزي ويمين في العربي. و Tailwind v4 عنده [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] و [[start-*]] و [[end-*]] و [[text-start]]، و variant [[rtl:]] للحاجات اللي لازم تتقلب يدوي زي أيقونة سهم ([[rtl:rotate-180]]). تفاصيل CSS في تاب HTML و CSS.

الأرقام والإيميلات والأكواد جوه نص عربي ممكن تتلخبط بسبب خوارزمية الاتجاه (bidi): [[+20]] ممكن تطلع [[20+]]. [[<bdi>]] أو [[dir="ltr"]] على العنصر بيعزل اتجاهه.

الـ effect هنا مبرر، لأن [[<html>]] برا شجرة React. والاتجاه محسوب من اللغة في كل render، فمستحيل يختلفوا. و [[lang]] مهم لقارئ الشاشة والخطوط والـ hyphenation.

ومكتبات كتير محتاجة تعرف: carousels ليها prop اسمه [[rtl]]، و charts (recharts) ممكن تحتاج [[reversed]] على المحور. وفي Next.js حط [[dir]] و [[lang]] على [[<html>]] في الـ root layout من السيرفر، فمفيش وميض.`,
            when: "أي تطبيق فيه عربي. وحتى لو التطبيق عربي بس، اكتب logical properties من الأول.",
            mistakes: R`[[ml-4]] و [[left-0]] في كل حتة وبعدين patches. ونسيان [[lang]]. وأيقونات أسهم متتقلبش. وفي مشروع حقيقي كان فيه hook بيخزّن isRTL في state، و [[forceUpdate]]، و [[setTimeout]] بـ 50ms عشان «كل الـ components تعيد الرسم»، وكمان component تاني بيعمل نفس الشغل بـ [[requestAnimationFrame]]: كل ده بدل قيمة محسوبة من اللغة و effect واحد.`
          },
          lines: [
            "useEffect للـ DOM اللي برا React.",
            "عشان نقرا اللغة الحالية.",
            "hook يظبط اتجاه الصفحة.",
            "i18n، و useTranslation بيعيد الرسم لما اللغة تتغير.",
            "الاتجاه محسوب من اللغة: rtl للعربي، ltr للإنجليزي.",
            "effect لأن html برا شجرة React:",
            "lang للقارئ والخطوط.",
            "dir يقلب الصفحة كلها.",
            "يتعاد لما اللغة تتغير.",
            "رجّعه لو component محتاجه.",
            "قفلة الـ hook.",
            "صف فيه عنوان وسعر.",
            "ps و text-start بيتقلبوا لوحدهم، و bdi بيعزل اتجاه السعر.",
            "قفلة."
          ]
        },
        {
          cmd: "ErrorBoundary",
          title: "خطأ في جزء ميوقّعش الصفحة كلها",
          desc: R`لو component رمى error وهو بيترسم، React بتشيل الشجرة كلها وتسيب صفحة بيضا. الـ error boundary بيمسك الأخطاء دي في الجزء اللي تحته بس، ويعرض بديل (fallback) فيه زرار «حاول تاني».

React لسه بتطلب class component للـ boundary، فالعادي تستخدم [[react-error-boundary]]: [[<ErrorBoundary FallbackComponent={...}>]]، و [[onError]] يبعت الخطأ لخدمة logging، و [[resetKeys]] يصفّر الـ boundary لما قيمة تتغير (زي الـ route).`,
          example: R`import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return <div role="alert"><p>{message}</p><button onClick={resetErrorBoundary}>Try again</button></div>
}
export function Page() {
  const { pathname } = useLocation()
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={(err, info) => logError(err, info.componentStack)} resetKeys={[pathname]}>
      <Dashboard />
    </ErrorBoundary>
  )
}`,
          try: R`[[npm i react-error-boundary]]، واعمل component بيرمي error لو [[Math.random() > 0.5]]، ولفّه في الـ boundary. دوس Try again كذا مرة. بعدين ارمي الـ error من onClick بدل الرسم وشوف إن الـ boundary مش بيمسكه.`,
          flag: "script",
          deep: {
            why: "من غير boundaries، error واحد في chart صغير في جنب الصفحة بيشيل التطبيق كله والمستخدم يشوف شاشة بيضا. React عملت كده عن قصد: إنها تسيب واجهة مكسورة أخطر من إنها تشيلها. الـ boundary بيحدد انت عايز الكسر يقف فين.",
            how: R`الـ boundary class فيها [[static getDerivedStateFromError]] (بتحوّل الـ state لـ «فيه خطأ» فالـ render الجاي يعرض الـ fallback) و [[componentDidCatch]] (للـ logging). react-error-boundary بيلفهم في component بـ props سهلة.

بيمسك الأخطاء وقت الرسم، وفي الـ lifecycle، وفي الـ effects، في أي component تحته. ومبيمسكش: أخطاء الـ event handlers (دي try/catch عادي)، والكود الـ async (setTimeout أو promise برا React)، والـ SSR، وأخطاء الـ boundary نفسه.

عشان توصّل خطأ async أو من handler للـ boundary: [[const { showBoundary } = useErrorBoundary()]] وبعدين [[showBoundary(err)]]. ومع TanStack Query [[throwOnError: true]] بيرمي خطأ الـ query للـ boundary.

[[resetKeys]]: لو أي قيمة فيه اتغيرت، الـ boundary بيرجع يحاول يرسم الأولاد. بالـ pathname، لما المستخدم يروح صفحة تانية الخطأ بيختفي بدل ما يفضل عالق.

والتوزيع: واحد فوق خالص كآخر خط دفاع، وواحد حوالين كل route، وواحد حوالين الحاجات الخطرة (widgets، و charts، ومكتبات برا). وفي React 19 تقدر تحط [[onCaughtError]] و [[onUncaughtError]] في [[createRoot]] عشان تبعت كل الأخطاء لـ logging من مكان واحد.

في التطوير Vite بيعرض overlay بالخطأ حتى لو الـ boundary مسكه، ده طبيعي.`,
            when: "حوالي كل route، وأي جزء ممكن يقع لوحده: charts (recharts)، ومحررات، و iframes، وأي بيانات من API ممكن تيجي بشكل غير متوقع.",
            mistakes: R`تفتكر إنه بيمسك أخطاء onClick. و boundary واحد فوق بس، فأي خطأ بيشيل كل حاجة. ومفيش reset فالمستخدم عالق. وفي مشروع حقيقي كان فيه boundary متعمل بإيده فوق التطبيق كله، بيعرض رسالة الخطأ والـ component stack للمستخدمين في الإنتاج، وزراره الوحيد reload للصفحة: التفاصيل التقنية مكانها الـ logging، مش شاشة العميل.`
          },
          lines: [
            "الـ component والـ type بتاع props الـ fallback.",
            "الشاشة اللي تظهر مكان الجزء اللي وقع.",
            "الخطأ ممكن يبقى أي حاجة اترمت، فاتأكد إنه Error.",
            "رسالة، و resetErrorBoundary بيحاول يرسم الأولاد تاني.",
            "قفلة.",
            "صفحة فيها جزء ممكن يقع.",
            "المسار الحالي.",
            "بداية الـ JSX.",
            "الـ fallback، وابعت الخطأ للـ logging، وصفّر لما المسار يتغير.",
            "الجزء المحمي.",
            "قفلة الـ boundary.",
            "قفلة القوس.",
            "قفلة."
          ]
        },
        {
          cmd: "lazy و Suspense",
          title: "قسّم الـ bundle وحمّل الصفحة وقت ما تتفتح",
          desc: R`[[lazy(() => import('./pages/Reports'))]] بيحط كود الصفحة في ملف JS لوحده مبيتحمّلش غير أول مرة الـ component يترسم. و [[<Suspense fallback={...}>]] بيعرض حاجة مكانه لحد ما الملف يوصل.

كده أول تحميل للموقع أصغر وأسرع. وأنسب مكان للتقسيم الـ routes، والحاجات التقيلة اللي مش ظاهرة على طول: محرر، أو charts، أو modal كبير.`,
          example: R`import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router'

const Reports = lazy(() => import('./pages/Reports'))
const routes = [{ path: 'reports', Component: Reports }]

function AppLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </>
  )
}`,
          try: R`اعمل [[npm run build]] قبل وبعد ما تخلي صفحة تقيلة (فيها recharts مثلًا) lazy، وقارن أحجام الملفات في [[dist/assets]]. وافتح Network وروح للصفحة: هتشوف ملف JS جديد بيتطلب ساعتها.`,
          flag: "script",
          deep: {
            why: R`من غير تقسيم، المستخدم اللي فاتح صفحة الدخول بينزّل كود لوحة الأدمن والتقارير والمحرر، يعني ميجات JS لازم تتحمّل وتتقري قبل ما الصفحة تشتغل، وده بيبان على موبايل بشبكة ضعيفة.`,
            how: R`[[import()]] الـ dynamic بيقول للـ bundler (Vite) «اعمل الملف ده chunk لوحده». و [[lazy]] بيرجّع component أول ما يترسم بيطلب الـ chunk، وطول ما هو مش جاهز بيعمل «suspend»: React بتوقف رسم الجزء ده وتدوّر على أقرب [[<Suspense>]] فوقه وتعرض الـ fallback. لما الملف يوصل، React ترسم تاني. والمرة الجاية الملف متكاش، فمفيش انتظار.

مكان الـ Suspense بيفرق: جوه الـ layout حوالين الـ Outlet معناه الـ header والـ sidebar فاضلين والجزء اللي في النص بس اللي بيستنى. ولما التنقل بيحصل جوه transition (الـ router بيعمل كده)، React بتسيب الصفحة القديمة ظاهرة لحد ما الجديدة تجهز بدل ما تعرض الـ fallback.

[[lazy]] محتاج default export. لو الملف فيه named export: [[lazy(() => import('./X').then(m => ({ default: m.Reports })))]]. وفي data mode بتاع React Router فيه [[lazy]] على الـ route نفسه، بيحمّل الـ component والـ loader مع بعض.

Suspense مش للـ lazy بس: [[use(promise)]]، و [[useSuspenseQuery]] في TanStack Query، و i18next وهو بيحمّل الترجمات، كلهم بيعملوا suspend لأقرب boundary.

وبعد deploy جديد، الـ chunks القديمة ممكن تتمسح، والمستخدم اللي فاتح الموقع من ساعة يطلب ملف مش موجود. error boundary يعرض «فيه تحديث، اعمل reload»، أو سيب الملفات القديمة كام يوم على السيرفر.`,
            when: "كل route تقريبًا، ومكتبات تقيلة بتظهر في مكان واحد (محرر نصوص، وخرائط، و charts).",
            mistakes: R`[[lazy]] جوه جسم component: بيتعمل component جديد كل render فالـ state بتروح. و Suspense واحد فوق خالص، فأي تحميل بيخفي الصفحة كلها. وفي مشروع حقيقي كانت كل الصفحات lazy (كويس) بس الـ Suspense فوق الـ providers والـ router كلهم، وصفحات الدخول متحمّلة عادي «عشان hydration issues» في SPA مفيهاش hydration أصلًا. وتقسيم كل component صغير لوحده: طلبات كتير على الفاضي.`
          },
          lines: [
            "lazy و Suspense من React.",
            "Outlet مكان الصفحة.",
            "الصفحة في chunk لوحدها، مبيتحمّلش غير لما تترسم.",
            "بتتحط في الـ routes زي أي component.",
            "الـ layout.",
            "بداية الـ JSX.",
            "Fragment.",
            "الـ header برا الـ Suspense، فبيفضل ظاهر وقت التحميل.",
            "حدود الانتظار: skeleton مكان الصفحة لحد ما الـ chunk يوصل.",
            "الصفحة الحالية.",
            "قفلة الـ Suspense.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ]
        },
        {
          cmd: "createPortal",
          title: "ارسم modal أو tooltip برا مكانه في الـ DOM",
          desc: R`[[createPortal(jsx, document.body)]] بيرسم الـ JSX في عنصر DOM تاني، بس الـ component بيفضل في مكانه في شجرة React: بيقرا نفس الـ context، والـ events بتطلع لأبوه في React. ده الحل لـ tooltip أو dropdown أو toast بيتقص بسبب [[overflow: hidden]] أو [[z-index]] عند الأب.

وللـ modal نفسه، أسهل طريقة accessible هي [[<dialog>]] مع [[showModal()]]: بيحبس الـ focus جواه، و Escape بيقفله، والخلفية بتبقى inert لوحدها.`,
          example: R`import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (open && dialog && !dialog.open) dialog.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])
  return createPortal(
    <dialog ref={ref} onClose={onClose} aria-label={title}>
      {children}<button onClick={onClose}>Close</button>
    </dialog>,
    document.body
  )
}`,
          try: R`افتح الـ modal من جوه div عليه [[overflow: hidden]] و [[transform]]، وشوف في Elements إن الـ dialog في آخر body. دوس Tab كذا مرة: الـ focus مش بيخرج برا. ودوس Escape وتأكد إن الـ state بقت false.`,
          flag: "script",
          deep: {
            why: "الـ modal منطقيًا تبع الزرار اللي فتحه (بيقرا نفس البيانات والـ context)، بس بصريًا لازم يبقى فوق كل حاجة. لو اترسم جوه card عليها overflow hidden، هيتقص. والـ modal المعمول بـ div بيحتاج شغل كتير عشان يبقى شغال بالكيبورد.",
            how: R`[[createPortal(children, node)]] بيقول لـ React «الأولاد دول مكانهم في الشجرة هنا، بس حطهم في الـ DOM جوه node». فالـ context شغال عادي، وأي event جوه الـ portal بيطلع (bubble) لأبو الـ component في React حتى لو في الـ DOM مش جواه. يعني [[onClick]] على div بيلف الزرار اللي فتح الـ modal هيتنادى لما تدوس جوه الـ modal. ده بيفاجئ ناس كتير.

[[showModal()]] بيحط الـ dialog في الـ top layer بتاع المتصفح: فوق أي z-index ومش بيتقص بـ overflow، والباقي بيبقى inert (مفيش click ولا focus)، و Escape بيقفله (event اسمه cancel وبعده close)، ولما يتقفل المتصفح بيرجّع الـ focus للعنصر اللي كان عليه. و [[::backdrop]] في CSS للخلفية. بصراحة، مع showModal الـ portal مش ضروري للـ dialog نفسه، بس بيفضل مفيد لأي overlay تاني (tooltip و dropdown و toast) مالوش top layer.

الـ effect بيزامن prop [[open]] مع حالة الـ dialog الحقيقية (DOM برا React). و [[onClose]] بيخلي Escape يرجّع الـ state لـ false، فالاتنين ميختلفوش.

وفي SSR (Next.js) مفيش [[document]] على السيرفر، فالـ portal لازم يترسم بعد ما الصفحة تشتغل في المتصفح.`,
            when: "Modals و dialogs للتأكيد، و tooltips و dropdowns جوه containers بتقص، و toasts في ركن الشاشة.",
            mistakes: R`modal بـ div من غير focus trap: المستخدم بالكيبورد بيعمل Tab ويروح للصفحة ورا. و state بتقول مفتوح والـ dialog اتقفل بـ Escape (نسيت onClose). وحروب z-index: 9999 و 99999. ونسيان إن الـ events بتطلع للأب في React: stopPropagation لو ده بيعمل مشكلة.`
          },
          lines: [
            "hooks والـ type.",
            "createPortal من react-dom.",
            "modal بيتحكم فيه الأب بـ open و onClose.",
            "ref للـ dialog.",
            "زامن open مع حالة الـ dialog الحقيقية:",
            "العنصر.",
            "لازم يتفتح ومش مفتوح: showModal (top layer، و focus جواه، و Escape).",
            "لازم يتقفل وهو مفتوح: اقفله.",
            "يتعاد لما open يتغير.",
            "ارسمه في body بدل مكانه:",
            "onClose بيتنادى مع Escape كمان، فالأب يعرف. و aria-label عشان قارئ الشاشة يقول اسمه.",
            "المحتوى وزرار قفل.",
            "قفلة الـ dialog.",
            "المكان في الـ DOM.",
            "قفلة createPortal.",
            "قفلة."
          ]
        }
      ]
    }
    // @@MORE@@
  ]
});

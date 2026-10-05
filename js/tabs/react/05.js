// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
    {
      t: "الأداء و rendering",
      l: 3,
      n: "الكومبوننت بيعيد الرسم إمتى وليه، وإزاي تقيس قبل ما تصلّح: memo و React Compiler و Profiler و transitions و virtualization",
      items: [
        {
          cmd: "إمتى بيعيد الرسم",
          title: "الكومبوننت بيعمل render إمتى بالظبط؟",
          desc: R`تلات أسباب بس: الـ state بتاعته اتغيرت ([[setState]] بقيمة مختلفة)، أو الأب بتاعه عمل render (فكل الأولاد بيعملوا render، حتى لو الـ props زي ما هي)، أو context بيقراه قيمته اتغيرت. تغيير الـ props لوحده مش سبب: الـ props بتتغير لأن الأب عمل render.

و render مش معناه إن الـ DOM اتغير. React بتنادي الدالة وتقارن الناتج، ولو مفيش فرق مبتلمسش الـ DOM. عشان كده أغلب الـ renders الزيادة رخيصة ومش محتاجة تصليح، والمشكلة بتبقى لما component تقيل (list كبيرة أو chart) بيعيد الرسم مع كل حرف.`,
          example: R`function Box({ children }: { children: ReactNode }) {
  const [n, setN] = useState(0)
  return <div><button onClick={() => setN(n + 1)}>box {n}</button>{children}</div>
}
export function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>count {count}</button>
      <Plain label="same" />
      <Memoized label="same" />
      <Box><ExpensiveChild /></Box>
    </>
  )
}
// دوسة على count: Plain بيترسم تاني، و Memoized لأ، و ExpensiveChild بيترسم تاني
// دوسة على box: Box بس اللي بيترسم، و ExpensiveChild لأ`,
          try: R`اعمل [[Plain]] و [[Memoized]] (ملفوف في [[memo]]) و [[ExpensiveChild]]، وكل واحد فيه [[console.log('render X')]]. افتح React DevTools > ⚙ > «Highlight updates when components render»، ودوس الزرارين وشوف مين بينوّر. بعدين خلي Box ياخد [[<ExpensiveChild />]] وهو جوه نفسه (مش children) وقارن.`,
          flag: "script",
          deep: {
            why: R`أغلب نصايح الأداء اللي بتسمعها (حط useMemo، لف في memo) من غير فهم «ليه الكومبوننت بيعيد الرسم» بتعمل كود أعقد ومش أسرع. لما تعرف الأسباب التلاتة، تقدر تصلّح المشكلة من جذرها: تنقل الـ state لتحت، أو تستخدم children، أو تقسّم context، قبل ما تفكر في memo.`,
            how: R`لما [[setCount]] بيتنادى، React بتعلّم Parent إنه محتاج render، وبترسم Parent وكل حاجة تحته في الشجرة بالترتيب. [[<Plain label="same" />]] بيتعمل object جديد في كل render للأب، و React مبتقارنش الـ props افتراضيًا، فبترسمه. [[memo]] بيضيف مقارنة: لو كل prop زي القديمة بـ [[Object.is]] يتخطى.

الـ children trick: [[<ExpensiveChild />]] اللي جوه [[<Box>]] اتعمل في render بتاع Parent، مش Box. فلما Box يغيّر الـ state بتاعته ويعيد الرسم، الـ children prop هو هو نفس الـ object القديم، و React بتشوف إنه نفس العنصر بالظبط فمبترسموش. ده اللي بيخلي «ارفع المحتوى لفوق وابعته children» أسهل تحسين أداء من غير أي memo. ولما Parent نفسه يعيد الرسم، العنصر اتعمل جديد فبيترسم.

الـ batching: كل الـ setState في نفس الـ event (وفي React 18 وبعده حتى جوه setTimeout و promises) بيتجمعوا في render واحد. و setState بنفس القيمة ([[Object.is]]) React بتتخطى الـ render غالبًا.

و [[<StrictMode>]] في التطوير بيرسم كل component مرتين عن قصد (وبيعمل الـ effects mount ثم unmount ثم mount) عشان يكشف الكود اللي مش pure، فلو بتعد الـ renders بـ console.log هتلاقيها ضعف. في الإنتاج مرة واحدة.

وكمان: تغيير مكان الـ component في الشجرة أو نوعه أو الـ key بتاعه مش re-render، ده unmount و mount جديد، والـ state بتروح.`,
            when: R`قبل أي تحسين أداء: اعرف مين بيعيد الرسم وليه (Highlight updates و Profiler). ولما تصمم الـ components: الـ state بتنزل لأقرب مكان محتاجها (state colocation)، والحاجات التقيلة تتبعت children من برا الـ component اللي state بتاعته بتتغير كتير.`,
            mistakes: R`تفتكر إن الـ component بيعيد الرسم «لما الـ props تتغير» بس، فتستغرب إنه بيترسم والـ props زي ما هي. وتعد الـ renders في Strict Mode وتفتكر فيه مشكلة. وتحط state بتتغير كل حرف (نص بحث) في App فالتطبيق كله يعيد الرسم. وتلف كل حاجة في memo بدل ما تنزّل الـ state. وسؤال انترفيو مشهور: «لو الأب عمل render، الأولاد بيعملوا render؟» أيوة، إلا لو memo والـ props زي ما هي، أو العنصر نفسه جاي من برا (children).`
          },
          lines: [
            "Box عنده state خاصة بيه، وبيرسم children اللي اتبعتتله.",
            "state بتاعة Box.",
            "زرار بيغيّر state الـ Box بس، وبعده الـ children.",
            "قفلة Box.",
            "الأب.",
            "state الأب.",
            "بداية الـ JSX.",
            "Fragment.",
            "زرار بيغيّر state الأب، فالأب وكل اللي تحته بيعيدوا الرسم.",
            "عادي: بيترسم مع كل render للأب.",
            "ملفوف في memo: الـ prop زي ما هي، فبيتخطى.",
            "ExpensiveChild اتعمل هنا في الأب، واتبعت لـ Box كـ children.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`دوسة count: بيطبع [[render Plain]] و [[render ExpensiveChild]]، ومش بيطبع [[render Memoized]]. في Highlight updates هتشوف Parent و Plain و Box و ExpensiveChild بينوّروا. دوسة box: Box بس بينوّر، ومفيش [[render ExpensiveChild]]، لأن العنصر جاي من Parent اللي معملش render.

لما تحط [[<ExpensiveChild />]] جوه Box نفسه بدل children، كل دوسة box هتطبع [[render ExpensiveChild]]، لأن العنصر بقى بيتعمل من جديد في كل render للـ Box.

لو كل رسالة ظاهرة مرتين، ده Strict Mode، مش bug. (ده متجرّب في اختبار بيعد الـ renders: count بيرسم Plain و ExpensiveChild مرتين و Memoized مرة، و box مبيرسمش ExpensiveChild.)`,
          solCode: R`import { memo, useState, type ReactNode } from 'react'

function Plain({ label }: { label: string }) { console.log('render Plain'); return <p>{label}</p> }
const Memoized = memo(function Memoized({ label }: { label: string }) { console.log('render Memoized'); return <p>{label}</p> })
function ExpensiveChild() { console.log('render ExpensiveChild'); return <p>slot</p> }

// النسخة اللي بتعيد الرسم مع كل دوسة box:
function BoxInside() {
  const [n, setN] = useState(0)
  return <div><button onClick={() => setN(n + 1)}>box {n}</button><ExpensiveChild /></div>
}`
        },
        {
          cmd: "React.memo",
          title: "memo و referential equality: ليه الـ memo بتاعك مش شغال",
          desc: R`[[memo(Component)]] بيخلي الكومبوننت يتخطى الـ render لو كل الـ props زي القديمة بالظبط ([[Object.is]] لكل prop). الأرقام والنصوص بتتقارن بالقيمة، بس الـ objects والـ arrays والدوال بالمرجع: [[{ color: 'red' }]] مكتوبة في الـ JSX بتبقى object جديد كل render، فالـ memo بيشوفها «اتغيرت» ويرسم.

عشان memo يشتغل، كل prop مش primitive لازم مرجعها يفضل ثابت: متعرّفة برا الـ component، أو [[useMemo]] و [[useCallback]]، أو جاية من state. ومع React Compiler ده بيحصل لوحده (الدرس الجاي).`,
          example: R`const MemoWithObject = memo(function MemoWithObject({ style }: { style: { color: string } }) {
  return <p style={style}>obj</p>
})
const MemoWithFn = memo(function MemoWithFn({ onPick }: { onPick: () => void }) {
  return <button onClick={onPick}>pick</button>
})
const RED = { color: 'red' }
export function Parent() {
  const [count, setCount] = useState(0)
  const onPick = useCallback(() => console.log('pick'), [])
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>count {count}</button>
      <MemoWithObject style={{ color: 'red' }} />
      <MemoWithObject style={RED} />
      <MemoWithFn onPick={onPick} />
      <MemoWithFn onPick={() => console.log('pick')} />
    </>
  )
}`,
          try: R`حط [[console.log]] في الاتنين، ودوس count. عد مين من الأربعة بيترسم. وبعدين افتح React DevTools > Profiler، اعمل Record ودوس، ودوس على أي component بيترسم: «Why did this render?» بتقول بالظبط أنهي prop اتغيرت (لازم تفعّل «Record why each component rendered» من الإعدادات).`,
          flag: "script",
          deep: {
            why: R`memo أشهر أداة أداء في React وأكتر واحدة بتتستخدم غلط: ناس بتلف component في memo وتبعتله [[onClick={() => ...}]]، فالـ memo بيقارن كل render ويلاقيها اتغيرت ويرسم برضه. يعني دفعت تمن المقارنة ومأخدتش حاجة. لازم تفهم الـ referential equality عشان تعرف ليه.`,
            how: R`[[memo(C)]] بيرجّع component جديد بيحتفظ بآخر props. في كل render للأب بيقارن كل prop بالقديمة بـ [[Object.is]] (shallow: مش بيدخل جوه الـ objects). لو كلها زي ما هي بيرجّع آخر ناتج من غير ما ينادي C. تقدر تبعت دالة مقارنة تانية [[memo(C, (prev, next) => ...)]] بس نادرًا ما ده فكرة كويسة.

في المثال: [[style={{ color: 'red' }}]] object جديد كل render فبيترسم. [[style={RED}]] ثابت لأنه متعرّف برا الـ component مرة واحدة، فبيتخطى. [[onPick]] من useCallback بـ [[[]]] نفس الدالة كل مرة، فبيتخطى. والـ arrow function في الـ JSX جديدة كل مرة، فبيترسم.

و [[children]] كمان prop: [[<Memoized><p>hi</p></Memoized>]] الـ [[<p>]] بيتعمل جديد كل render، فالـ memo مش هيشتغل. وأي context الـ component بيقراه بيعدّي الـ memo: لو قيمة الـ context اتغيرت بيرسم حتى لو الـ props زي ما هي.

memo بيستاهل لما: الكومبوننت تقيل فعلًا (list كبيرة، chart، محرر)، وبيعيد الرسم كتير بنفس الـ props، والـ props بسيطة أو تقدر تثبّتها. غير كده، المقارنة نفسها تكلفة، والكود بيبقى أصعب.`,
            when: R`بعد ما القياس (Profiler) يقول إن component معين بياخد وقت وبيترسم على الفاضي. وفي مشروع شغال بـ React Compiler، غالبًا مش هتكتب memo خالص.`,
            mistakes: R`memo على component بيستلم دالة arrow أو object أو array جديدة كل مرة. و memo على component صغير رخيص «احتياطي». و useCallback لدالة رايحة لـ [[<button>]] عادي (مش memo). و deep compare بـ [[JSON.stringify]] في دالة المقارنة: أبطأ من الـ render نفسه غالبًا. وتنسى إن الـ context بيعدّي memo. وسؤال انترفيو: «ليه component ملفوف في memo بيعيد الرسم؟» (prop مرجعها بيتغير، أو children، أو context، أو state جواه).`
          },
          lines: [
            "component ملفوف في memo بياخد object.",
            "بيستخدمه.",
            "قفلة.",
            "component ملفوف في memo بياخد دالة.",
            "بيستخدمها.",
            "قفلة.",
            "object متعرّف مرة واحدة برا أي component، فمرجعه ثابت للأبد.",
            "الأب.",
            "state بتتغير.",
            "دالة مرجعها ثابت بين الـ renders.",
            "بداية الـ JSX.",
            "Fragment.",
            "الزرار اللي بيعمل render للأب.",
            "object جديد كل render: الـ memo بيرسم.",
            "نفس الـ object: الـ memo بيتخطى.",
            "نفس الدالة: بيتخطى.",
            "arrow جديدة كل render: بيرسم.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`مع كل دوسة count اتنين بس بيترسموا: [[MemoWithObject]] اللي واخد [[{{ color: 'red' }}]] مكتوب في الـ JSX، و [[MemoWithFn]] اللي واخد arrow function. التانيين (RED و onPick من useCallback) بيتخطوا.

في الـ Profiler، «Why did this render?» للأول بتقول «Props changed: (style)» وللتاني «Props changed: (onPick)»، ومع إن القيمة «هي هي» في عينك، المرجع جديد.

ولو شغّلت نفس الكود بـ React Compiler، التلاتة التانيين كمان هيتخطوا، لأن الـ compiler بيثبّت الـ object والـ arrow لوحده.`,
          solCode: R`const MemoWithObject = memo(function MemoWithObject({ style }: { style: { color: string } }) {
  console.log('render MemoWithObject', style === RED ? 'RED' : 'inline')
  return <p style={style}>obj</p>
})
const MemoWithFn = memo(function MemoWithFn({ onPick }: { onPick: () => void }) {
  console.log('render MemoWithFn')
  return <button onClick={onPick}>pick</button>
})
// بعد دوسة count:
// render MemoWithObject inline
// render MemoWithFn`
        },
        {
          cmd: "React Compiler",
          title: "React Compiler: الـ memoization لوحده وقت الـ build، وإمتى تشيل useMemo",
          desc: R`React Compiler بيقرا الـ components والـ hooks وقت الـ build ويضيف memoization لوحده: كل قيمة محسوبة، وكل object و arrow function، وكل عنصر JSX بيتحفظ ومبيتعملش تاني غير لما اللي بيعتمد عليه يتغير. النتيجة إن أغلب الـ renders الزيادة بتختفي من غير ما تكتب [[memo]] ولا [[useMemo]] ولا [[useCallback]].

نزل v1.0 stable في أكتوبر ٢٠٢٥، وبيشتغل مع React 17 و 18 و 19. في Vite بتضيفه كـ Babel preset، وفي Next.js [[reactCompiler: true]]، و eslint-plugin-react-hooks الجديد فيه قواعده.`,
          example: R`// npm i -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler
// vite.config.ts (مع @vitejs/plugin-react 6)
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
export default defineConfig({ plugins: [react(), babel({ presets: [reactCompilerPreset()] })] })
// next.config.ts: const nextConfig = { reactCompiler: true }
// الكود الجديد: من غير memo ولا useMemo ولا useCallback
function ProductsPage({ products, query }: { products: Product[]; query: string }) {
  const visible = products.filter(p => p.name.includes(query))
  const handleAdd = (id: string) => addToCart(id)
  return <ProductGrid items={visible} onAdd={handleAdd} />
}
// component مش آمن للـ compiler؟ استثنيه لحد ما تصلّحه:
function LegacyWidget() {
  'use no memo'
  return <div ref={legacyRef} />
}`,
          try: R`خد مثال درس «إمتى بيعيد الرسم» (Plain و ExpensiveChild بـ console.log)، وشغّله من غير الـ compiler وعد الـ renders مع دوسة count. بعدين ضيف الـ preset واعمل restart لـ [[npm run dev]]، ودوس تاني. وافتح React DevTools: الـ components اللي اتعملها compile عليها علامة «Memo ✨».`,
          flag: "script",
          deep: {
            why: R`الـ memoization اليدوي مرهق وبيتنسي: dependencies ناقصة، و useCallback في مكان مش محتاجه، و memo مكسور بسبب prop واحدة. والكود بيبقى مليان لف حوالين كل حاجة. الـ compiler بيعمل ده بدقة أعلى من البني آدم (بيحفظ على مستوى القيمة الواحدة، حتى عناصر JSX جوه الـ return)، والكود بيرجع بسيط.`,
            how: R`الـ compiler بيحلل كل component كدالة: إيه القيم اللي بتعتمد على إيه. وبيطلّع كود بيستخدم cache صغير جوه الـ component ([[react/compiler-runtime]]): لو [[products]] و [[query]] زي ما هم، [[visible]] بترجع من الكاش، و [[handleAdd]] نفس الدالة، وعنصر [[<ProductGrid ... />]] نفسه نفس الـ object، فـ React بتتخطى رسمه. ده متجرّب: مثال «إمتى بيعيد الرسم» بالـ compiler مبيرسمش Plain ولا ExpensiveChild ولا حتى MemoWithObject اللي واخد object مكتوب في الـ JSX.

بيعتمد إنك ماشي على قواعد React: الـ components pure، ومفيش تعديل للـ props أو الـ state في المكان، ومفيش قراية لـ [[ref.current]] وقت الرسم، والـ hooks بتتنادى بنفس الترتيب. لو لقى component بيكسر القواعد بيتخطاه (بيسيبه زي ما هو) بدل ما يبوّظه، و eslint-plugin-react-hooks (v6 وبعده) فيه قواعد زي [[react-hooks/purity]] و [[react-hooks/refs]] و [[react-hooks/immutability]] بتقولك فين المشاكل دي حتى لو مش مركّب الـ compiler.

إعداد Vite اتغير: مع [[@vitejs/plugin-react]] 6 (Vite 8) بقى [[reactCompilerPreset()]] مع [[@rolldown/plugin-babel]]، والشكل القديم [[react({ babel: { plugins: ['babel-plugin-react-compiler'] } })]] لـ plugin-react 5 وقبله. وفيه خيار [[react({ compiler: true })]] بنسخة Rust بس لسه experimental. و [[compilationMode: 'annotation']] بيخليه يشتغل بس على الـ components اللي فيها [['use memo']]، مفيد لو بتدخّله في مشروع كبير تدريجيًا.

وuseMemo و useCallback؟ للكود الجديد: متكتبهمش، إلا كـ escape hatch لما محتاج تحكم دقيق (قيمة dependency في effect لازم تفضل ثابتة). للكود الموجود: الـ docs بتقول سيبهم أو اختبر كويس قبل ما تشيلهم، لأن شيلهم ممكن يغيّر ناتج الـ compile.`,
            when: R`أي مشروع React جديد في ٢٠٢٦: فعّله من الأول. ومشروع قديم: ركّب قواعد eslint الأول وصلّح اللي بتطلّعه، وبعدين فعّل الـ compiler (أو annotation mode لأجزاء معينة) واختبر.`,
            mistakes: R`تفتكر إن الـ compiler بيصلّح كود مش pure: هو بيتخطاه، فمش هتاخد الفايدة. وتشيل كل useMemo من مشروع قديم مرة واحدة من غير اختبار. وتقرا [[ref.current]] أو تعدّل object جاي من props وقت الرسم، فالـ compiler يتخطى الـ component بصمت. ومكتبات بتعتمد على إن الـ component بيعيد الرسم كل مرة (زي بعض المكتبات اللي بترجّع object mutable من hook)، فالشاشة ممكن متتحدثش: دي بتستثنيها بـ [['use no memo']]. وتنسى الـ restart بعد تغيير الـ config. وسؤال انترفيو في ٢٠٢٦: «لسه محتاج useMemo؟» الإجابة: مع الـ compiler غالبًا لأ، وبرضه لازم تفهم الـ referential equality عشان تقرا الكود القديم وتفهم ليه component اتخطى.`
          },
          lines: [
            "defineConfig.",
            "الـ plugin بيصدّر preset جاهز للـ compiler.",
            "plugin الـ Babel لـ Rolldown (Vite 8).",
            "React عادي، و Babel بالـ preset على ملفات React بس.",
            "component عادي.",
            "حساب عادي: الـ compiler بيحفظه لحد ما products أو query يتغيروا.",
            "دالة عادية: الـ compiler بيثبّت مرجعها.",
            "والعنصر نفسه بيتحفظ، فـ ProductGrid مبيتعادش على الفاضي.",
            "قفلة.",
            "component فيه حاجة مش آمنة:",
            "توجيه بيقول للـ compiler متلمسنيش.",
            "بيرسم.",
            "قفلة."
          ],
          sol: R`من غير الـ compiler: كل دوسة count بتطبع [[render Plain]] و [[render ExpensiveChild]]. بعد الـ compiler والـ restart: الدوسة بتغيّر رقم الزرار بس، ومفيش ولا log من التانيين، وفي DevTools جنب اسم كل component علامة [[Memo ✨]].

لو مفيش علامة Memo، الـ preset مش شغال: اتأكد إن [[@rolldown/plugin-babel]] و [[@babel/core]] و [[babel-plugin-react-compiler]] متركّبين، وإنك عملت restart. ولو component معين مفيهوش العلامة والباقي فيه، الـ compiler اتخطاه لأنه شايف فيه كسر لقواعد React: شغّل eslint بقواعد react-hooks الجديدة وشوف بيقول إيه.`,
          solCode: R`npm i -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler eslint-plugin-react-hooks@latest

// eslint.config.js
import reactHooks from 'eslint-plugin-react-hooks'
export default [
  reactHooks.configs.flat.recommended,
]`
        },
        {
          cmd: "Profiler",
          title: "لاقي الـ render البطيء بـ React DevTools Profiler",
          desc: R`قبل ما تحسّن أي حاجة، قيس. تاب Profiler في React DevTools بيسجّل كل commit (كل مرة React طبّقت تغيير) وانت بتستخدم الصفحة، ويوريك لكل commit مين اترسم، وخد قد إيه، وليه.

الـ flamegraph: كل component شريط، وطوله وقته، ولونه (أصفر = بطيء، أزرق = سريع، رمادي = متراسمش). والـ ranked chart بيرتّبهم من الأبطأ. ولو عايز أرقام من الكود نفسه، [[<Profiler id onRender>]] بيديك نفس القياس برمجيًا.`,
          example: R`import { Profiler, type ProfilerOnRenderCallback } from 'react'

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration) => {
  if (actualDuration > 16) console.warn($__bt[$__{id}] $__{phase} took $__{actualDuration.toFixed(1)}ms (full tree $__{baseDuration.toFixed(1)}ms)$__bt)
}
export function ProductsPage() {
  return (
    <Profiler id="ProductsGrid" onRender={onRender}>
      <ProductsGrid />
    </Profiler>
  )
}
// DevTools: ⚙ > Profiler > Record why each component rendered
// Performance panel في Chrome: React Performance Tracks بتظهر الـ renders على نفس الـ timeline`,
          try: R`خد صفحة فيها list من ٢٠٠٠ عنصر وخانة بحث بتفلترها (من غير useMemo ولا Deferred). افتح Profiler، واعمل Record، واكتب ٥ حروف، ووقّف. لاقي أبطأ commit، ودوس على أصفر component واقرا «Why did this render?». بعدين اعمل CPU throttling 4x من Performance وكرّر.`,
          flag: "script",
          deep: {
            why: R`الحدس في الأداء غلط غالبًا: ناس بتلف كل حاجة في memo وتكون المشكلة الحقيقية component واحد بيفلتر ٥٠٠٠ عنصر مع كل حرف، أو context بيعيد رسم الصفحة كلها. الـ Profiler بيقولك بالرقم مين وليه، فتصلّح حاجة واحدة صح بدل عشرين حاجة مش فارقة.`,
            how: R`الـ Profiler بيسجّل على مستوى الـ commits: كل مرة React عملت render وطبّقته على الـ DOM. فوق يمين فيه شرايط لكل commit (طول الشريط = مدته)، تتنقل بينهم. وفي الـ flamegraph، الشريط الرمادي معناه الـ component ده متراسمش في الـ commit ده (memo نفع، أو مش تحت اللي اتغير).

«Record why each component rendered» (من الإعدادات) بيضيف السبب لكل component: «Props changed: (onAdd)»، أو «Hook 2 changed» (state أو context جوه hook رقم ٢)، أو «The parent component rendered». ده أهم معلومة، لأنها بتقولك تصلّح فين.

و «Highlight updates when components render» في تاب Components بينوّر أي component بيترسم على الصفحة نفسها وانت شغال، أسرع طريقة تلاحظ إن حرف واحد في input بينوّر الصفحة كلها.

[[<Profiler>]]: [[actualDuration]] وقت الـ render ده (بعد الـ memo)، و [[baseDuration]] الوقت المتوقع لو كل حاجة تحته اترسمت من غير memo، فالفرق بينهم بيقولك الـ memo بيوفّر قد إيه. و [[phase]] بيبقى [[mount]] أو [[update]] أو [[nested-update]]. شغال في التطوير، وفي الإنتاج محتاج build خاص بالـ profiling، فمتسيبهوش في كل حتة.

وفي Chrome Performance panel، React 19.2 وبعده بيضيف «React Performance Tracks» في وضع التطوير: الـ renders والـ effects والـ transitions على نفس الـ timeline مع الـ JS والـ layout. و INP (أبطأ تفاعل) بيتقاس من زوار حقيقيين (تاب المتصفح).

و [[16ms]] في المثال لأن الشاشة بـ 60fps عندها حوالي 16ms لكل frame، فأي render أطول بيبان كتقطيع.`,
            when: R`لما حاجة «بتحس إنها تقيلة»: الكتابة بتهنّج، أو فتح tab بياخد ثانية، أو scroll بيقطّع. وقبل وبعد أي تحسين، عشان تثبت إنه فرق. وقيس على build إنتاج ([[npm run build && npm run preview]]) وبـ CPU throttling، لأن التطوير أبطأ بكتير وجهازك أسرع من جهاز المستخدم.`,
            mistakes: R`تحسّن من غير ما تقيس. وتقيس في dev وتفتكر الأرقام هي هي في الإنتاج (dev بيعمل checks كتير و Strict Mode بيرسم مرتين). وتقيس على لابتوب قوي بس. وتسيب [[<Profiler>]] مع console.log في كل صفحة. وتلاقي component أصفر وتلفه في memo من غير ما تقرا «Why did this render»، والسبب context مثلًا فمش هيفرق.`
          },
          lines: [
            "Profiler component والنوع بتاع الـ callback.",
            "دالة بتتنادى بعد كل commit للجزء اللي جوه:",
            "لو أبطأ من frame واحد (16ms)، اطبع اسمه والنوع والوقت، والوقت لو مفيش memo خالص.",
            "قفلة.",
            "الصفحة.",
            "بداية الـ JSX.",
            "قيس الجزء ده بس.",
            "الـ grid.",
            "قفلة.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`في الـ recording هتلاقي commit لكل حرف تقريبًا. الأبطأ غالبًا فيه الـ list بالأصفر أو البرتقالي، و «Why did this render?» هيقول «Props changed: (query)» أو «The parent component rendered». ومع CPU throttling 4x الأرقام تتضرب في ٣ أو ٤، وده أقرب لموبايل متوسط.

ده بيقولك إن الحل مش memo (الـ prop فعلًا اتغيرت)، الحل إن الـ list تتأجل بـ [[useDeferredValue]] (الدرس الجاي) أو تبقى virtual. لو الأبطأ كان component مش المفروض يتأثر بالبحث أصلًا، يبقى الـ state عالية زيادة أو context بيعيد رسمه.`,
          solCode: R`const ITEMS = Array.from({ length: 2000 }, (_, i) => $__btProduct $__{i}$__bt)

export function SlowSearch() {
  const [query, setQuery] = useState('')
  const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
    </>
  )
}`
        },
        {
          cmd: "useTransition و useDeferredValue",
          title: "خانة البحث متهنّجش وهي بتفلتر list تقيلة",
          desc: R`React بتقسم التحديثات لنوعين: عاجلة (الحرف اللي بيتكتب لازم يظهر فورًا) ومش عاجلة (النتايج ممكن تتأخر شوية). [[useDeferredValue(query)]] بيدّيك نسخة من القيمة «متأخرة»: الخانة بتستخدم [[query]] وبتتحدث فورًا، والـ list التقيلة بتستخدم [[deferredQuery]] وبتترسم في الخلفية، ولو المستخدم كتب حرف تاني React بترمي الـ render القديم وتبدأ بالجديد.

و [[useTransition]] نفس الفكرة بس من ناحية الـ setState: [[startTransition(() => setTab('reports'))]] بتقول «التغيير ده مش عاجل»، و [[isPending]] بيقولك إنه لسه شغال عشان تعرض مؤشر.`,
          example: R`import { memo, useDeferredValue, useState, useTransition } from 'react'

const Results = memo(function Results({ query }: { query: string }) {
  const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  return <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
})
export function SearchPage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery
  return (
    <>
      <input aria-label="Search" value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.5 : 1 }}><Results query={deferredQuery} /></div>
    </>
  )
}
export function Tabs() {
  const [tab, setTab] = useState<'home' | 'reports'>('home')
  const [isPending, startTransition] = useTransition()
  return <button onClick={() => startTransition(() => setTab('reports'))}>Reports {isPending && '…'}</button>
}`,
          try: R`خد [[SlowSearch]] من درس Profiler، وخلي كل [[<li>]] بطيء بعمد ([[const start = performance.now(); while (performance.now() - start < 0.2) {}]]). اكتب بسرعة وحس بالتهنيج. بعدين طبّق [[useDeferredValue]] و [[memo]] زي المثال، وكرّر. وجرّب تشيل الـ memo بس وسيب الـ deferred.`,
          flag: "script",
          deep: {
            why: R`لما كل حرف بيعمل render لـ list فيها آلاف العناصر، المتصفح مش بيلحق يرسم الحرف نفسه غير لما الـ list تخلص، فالمستخدم يحس إن الكيبورد بيهنّج (INP وحش). الحل القديم كان debounce: بيستنى المستخدم يقف، فالنتايج بتتأخر حتى على جهاز سريع. الـ deferred value بيدّي الجهاز السريع نتايج فورية، والجهاز البطيء خانة سلسة ونتايج متأخرة شوية.`,
            how: R`لما [[query]] يتغير، React بتعمل render عاجل الأول بالـ [[deferredQuery]] القديمة: الخانة بتتحدث، و [[Results]] بياخد نفس الـ prop القديمة فالـ memo بيتخطاه، فالـ render ده سريع جدًا. بعدين React بتعمل render تاني في الخلفية بالقيمة الجديدة. الـ render ده ممكن يتقطع: لو حرف جديد جه، React بترميه وتبدأ من الأول.

عشان كده الـ [[memo]] على Results جزء أساسي: من غيره الـ render العاجل نفسه هيرسم الـ list (لأن الأب اترسم)، والتأجيل ملوش لازمة. (مع React Compiler ده بيحصل لوحده.)

[[isStale]] بمقارنة القيمتين بيعرّفك إن النتايج المعروضة قديمة، فتعمل opacity أو spinner صغير بدل ما تفضّي الشاشة.

[[useTransition]]: أي setState جوه [[startTransition]] بيتعلّم «transition»، فمبيوقفش التفاعل، ولو فيه Suspense (lazy page أو useSuspenseQuery) React بتسيب الشاشة القديمة ظاهرة بدل ما تعرض الـ fallback، و [[isPending]] بيبقى true لحد ما يخلص. في React 19 الـ callback ممكن يبقى async (دي الـ Actions). والـ router (React Router و Next) بيعمل التنقل جوه transition لوحده.

الفرق: useTransition لما انت اللي بتنادي setState، و useDeferredValue لما القيمة جاية لك (prop أو من hook تاني) ومش في إيدك تلف الـ setState.

والاتنين مش بيخلّوا الحساب أسرع: الـ list لسه بتاخد نفس الوقت، هم بس بيخلوها متوقفش الحاجات العاجلة. لو الـ list نفسها ضخمة، الحل virtualization (الدرس الجاي).`,
            when: R`فلترة أو بحث في list كبيرة على الفرونت، و charts بتتحسب من input، و tabs بتفتح محتوى تقيل، والتنقل لصفحات lazy. ومش للـ controlled input نفسه: قيمة الخانة لازم تفضل عاجلة.`,
            mistakes: R`تلف [[setQuery]] بتاع الخانة نفسها في startTransition: الكتابة نفسها بتتأخر وتتلخبط. و useDeferredValue من غير memo على الجزء التقيل، فمفيش فرق. وتستخدمها بدل debounce لطلبات الشبكة: الـ deferred بيقلل الـ renders مش الطلبات، ولو الـ query رايحة لـ API لسه محتاج debounce أو React Query بـ key. وتفتكر إنها بتسرّع الحساب نفسه.`
          },
          lines: [
            "الأدوات.",
            "الجزء التقيل ملفوف في memo، ده شرط عشان التأجيل يفرق.",
            "فلترة آلاف العناصر.",
            "والرسم.",
            "قفلة.",
            "الصفحة.",
            "القيمة العاجلة: الخانة بتستخدمها.",
            "نسخة متأخرة منها للـ list.",
            "لو مختلفين، النتايج المعروضة قديمة.",
            "بداية الـ JSX.",
            "Fragment.",
            "الخانة بتتحدث فورًا مع كل حرف.",
            "الـ list بالقيمة المتأخرة، وباهتة وهي قديمة.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة.",
            "tabs.",
            "state التاب.",
            "isPending و startTransition.",
            "تغيير التاب مش عاجل، والزرار بيعرض … وهو شغال.",
            "قفلة."
          ],
          sol: R`من غير أي حاجة: كل حرف بيظهر متأخر، وأحيانًا حرفين يظهروا مع بعض. مع useDeferredValue و memo: الحروف بتظهر فورًا، والـ list بتبقى باهتة لحظة وبعدين تتحدث، ولو كتبت بسرعة الـ list بتقفز للنتيجة الأخيرة من غير ما تعدّي على الوسطانية.

من غير الـ memo (والـ deferred موجود): التهنيج راجع تقريبًا زي الأول، لأن الـ render العاجل بيرسم الـ list برضه كابن للصفحة. ده أهم درس في التجربة.

في الـ Profiler هتشوف commits سريعة للخانة، و commits أطول للـ list بعدها، وبعضها متلغي.`,
          solCode: R`function SlowItem({ text }: { text: string }) {
  const start = performance.now()
  while (performance.now() - start < 0.2) { /* بطء مقصود للتجربة */ }
  return <li>{text}</li>
}
const Results = memo(function Results({ query }: { query: string }) {
  const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  return <ul>{visible.map(item => <SlowItem key={item} text={item} />)}</ul>
})`
        },
        {
          cmd: "TanStack Virtual",
          title: "list فيها ١٠ آلاف صف: ارسم اللي ظاهر بس",
          desc: R`الـ virtualization معناها إنك بترسم الصفوف اللي ظاهرة في الشاشة بس (ومعاهم كام صف زيادة فوق وتحت)، وباقي الـ list مساحة فاضية بنفس الارتفاع عشان الـ scrollbar يبان صح. ١٠ آلاف صف بقوا ٢٠ عنصر DOM.

[[useVirtualizer]] من [[@tanstack/react-virtual]] بياخد عدد العناصر، والعنصر اللي بيعمل scroll، وارتفاع تقديري لكل صف، ويرجّعلك [[getVirtualItems()]] (اللي المفروض يترسموا دلوقتي ومكان كل واحد) و [[getTotalSize()]] (الارتفاع الكلي).`,
          example: R`import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualList({ rows }: { rows: { id: string; name: string }[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  })
  return (
    <div ref={parentRef} style={{ height: 480, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(item => (
          <div key={rows[item.index].id} data-index={item.index} ref={virtualizer.measureElement}
            style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: '100%', transform: $__bttranslateY($__{item.start}px)$__bt }}>
            {rows[item.index].name}
          </div>
        ))}
      </div>
    </div>
  )
}`,
          try: R`[[npm i @tanstack/react-virtual]]، واعمل ١٠٠٠٠ صف ([[Array.from({ length: 10000 }, (_, i) => ({ id: String(i), name: $__btRow $__{i}$__bt }))]]). ارسمهم الأول بـ [[map]] عادي وافتح Elements وقيس الوقت في Performance. بعدين بالـ VirtualList، و scroll لتحت خالص، وعد عناصر [[div[data-index]]] في Elements.`,
          flag: "script",
          deep: {
            why: R`كل عنصر DOM ليه تمن: الـ layout والـ style والذاكرة. ١٠ آلاف صف في جدول بـ ٦ أعمدة يعني ٦٠ ألف عنصر، والصفحة بتاخد ثواني تفتح، والـ scroll بيقطّع، وأي تحديث بيعيد حساب الـ layout كله. المستخدم مش شايف غير ٢٠ صف، فمفيش داعي لرسم الباقي.`,
            how: R`الـ virtualizer بيسمع لـ scroll بتاع [[parentRef]]، ومن [[scrollTop]] وارتفاع كل صف بيحسب أول وآخر index ظاهر، ويزوّد [[overscan]] من كل ناحية عشان مفيش فراغ يبان وانت بتعمل scroll بسرعة. [[getVirtualItems()]] بيرجّع لكل واحد [[index]] و [[start]] (مكانه بالبكسل) و [[size]] و [[key]].

الـ div الداخلي ارتفاعه [[getTotalSize()]] فالـ scrollbar بيعبّر عن الـ list كلها، وكل صف [[position: absolute]] و [[translateY(start)]] في مكانه. [[insetInlineStart]] بدل [[left]] عشان يشتغل في RTL.

[[estimateSize]] تقدير أولي. لو الصفوف ارتفاعها مختلف (نص بيلف على سطرين)، [[ref={virtualizer.measureElement}]] مع [[data-index]] بيقيس كل صف بعد ما يترسم ويصحح المواقع. لو كل الصفوف نفس الارتفاع بالظبط، اشيل measureElement واكتب الرقم الصح.

فيه كمان [[useWindowVirtualizer]] لو الصفحة كلها هي اللي بتعمل scroll مش div، و [[horizontal: true]] للأعمدة، ويشتغل مع TanStack Table (الصفوف بتيجي من [[table.getRowModel().rows]]) ومع [[useInfiniteQuery]] (لما آخر virtual item يقرّب من الآخر، [[fetchNextPage]]).

وفي الاختبارات: jsdom مفيهوش layout (كل الأحجام صفر)، فالـ virtualizer مش هيرسم صفوف في Vitest العادي. اختبره في متصفح حقيقي (Playwright أو Vitest browser mode).`,
            when: R`lists وجداول فيها أكتر من كام مية صف بيترسموا مرة واحدة: logs، وسجل معاملات، وقوايم منتجات في لوحة أدمن، وشات طويل. للـ lists اللي تحت ١٠٠ صف، مش محتاج. وقبلها فكّر: هل pagination من السيرفر أنسب؟`,
            mistakes: R`الـ parent من غير ارتفاع ثابت أو [[overflow: auto]]، فمفيش scroll والكل بيترسم أو مفيش حاجة. و [[key={item.index}]] بدل id الصف لو الترتيب بيتغير. و estimateSize بعيد جدًا عن الحقيقة من غير measureElement، فالـ scrollbar بيقفز. و Ctrl+F في المتصفح مش هيلاقي صفوف مش مرسومة، فلو البحث مهم اعمل خانة بحث. ونسيان إن قارئ الشاشة مش شايف غير اللي مرسوم، فضيف [[aria-rowcount]] و [[aria-rowindex]] في الجداول.`
          },
          lines: [
            "ref للعنصر اللي بيعمل scroll.",
            "الـ hook.",
            "list بتاخد الصفوف كلها.",
            "العنصر اللي بيعمل scroll.",
            "الـ virtualizer:",
            "كام عنصر.",
            "مين اللي بيعمل scroll.",
            "ارتفاع تقديري لكل صف.",
            "ارسم ٥ زيادة من كل ناحية.",
            "قفلة.",
            "بداية الـ JSX.",
            "الصندوق: ارتفاع ثابت و scroll.",
            "div بارتفاع الـ list كلها، عشان الـ scrollbar.",
            "الصفوف الظاهرة بس:",
            "key من البيانات، و data-index و measureElement عشان يقيس الارتفاع الحقيقي.",
            "كل صف في مكانه بالبكسل، و insetInlineStart عشان RTL.",
            "المحتوى.",
            "قفلة الصف.",
            "قفلة الـ map.",
            "قفلة الـ div الداخلي.",
            "قفلة الصندوق.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`بـ map عادي: Elements فيها ١٠٠٠٠ صف، وأول render بياخد مئات الـ ms (في Performance هتلاقي task طويلة بالأحمر). بالـ VirtualList: حوالي ٢٠ صف بس (١٠ ظاهرين في 480px بـ 48px للصف، و ٥ overscan من كل ناحية)، والرقم ده ثابت حتى وانت في آخر الـ list، والـ scrollbar بيعبّر عن ٤٨٠ ألف بكسل.

لو مفيش صفوف خالص، الـ parent ملوش ارتفاع. ولو الصفوف فوق بعض، ناقص [[position: absolute]] أو الـ transform.

(معلومة: الكود ده متجرّب بـ TypeScript بس، مش في اختبار، لأن jsdom مبيحسبش أحجام فالـ virtualizer مبيرسمش حاجة فيه.)`,
          solCode: R`const rows = Array.from({ length: 10000 }, (_, i) => ({ id: String(i), name: $__btRow $__{i}$__bt }))

export default function App() {
  return <VirtualList rows={rows} />
}
// في الـ console:
// document.querySelectorAll('div[data-index]').length  // حوالي 20`
        }
      ]
    },
    {
      t: "patterns",
      l: 3,
      n: "أشكال بتتكرر في مكتبات الـ UI والكود الحقيقي: compound components، و API بـ value و defaultValue، و ref كـ prop، و URL state، و HTML آمن، و form actions، والـ patterns القديمة",
      items: [
        {
          cmd: "compound components",
          title: "Tabs و Accordion و Select: أجزاء بتشتغل مع بعض من غير props كتير",
          desc: R`الـ compound component مجموعة components صغيرة بتتشارك state من غير ما المستخدم يوصّلها: [[<Tabs>]] و [[<Tabs.List>]] و [[<Tabs.Tab value="a">]] و [[<Tabs.Panel value="a">]]. الأب بيمسك الـ state ويحطها في context، والأجزاء بتقراها. ده الشكل اللي shadcn و Radix و Headless UI مبنيين بيه.

البديل component واحد بياخد [[tabs={[{ label, content, disabled, icon }]}]]، وده بيتكسر أول ما حد يحتاج أيقونة في مكان مختلف أو badge جنب تاب معين. مع الـ compound، المستخدم بيرتّب الأجزاء ويحط اللي هو عايزه بينهم.`,
          example: R`import { createContext, useContext, useId, useState, type ReactNode } from 'react'

type TabsCtx = { active: string; setActive: (v: string) => void; baseId: string }
const Ctx = createContext<TabsCtx | null>(null)
function useTabs() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>')
  return ctx
}
export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue)
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>
}
Tabs.Tab = function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabs()
  return <button role="tab" id={$__bt$__{baseId}-tab-$__{value}$__bt} aria-selected={active === value} aria-controls={$__bt$__{baseId}-panel-$__{value}$__bt} onClick={() => setActive(value)}>{children}</button>
}
Tabs.Panel = function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { active, baseId } = useTabs()
  if (active !== value) return null
  return <div role="tabpanel" id={$__bt$__{baseId}-panel-$__{value}$__bt} aria-labelledby={$__bt$__{baseId}-tab-$__{value}$__bt}>{children}</div>
}
// <Tabs defaultValue="orders"><Tabs.List><Tabs.Tab value="orders">Orders</Tabs.Tab><Tabs.Tab value="returns">Returns <Badge>3</Badge></Tabs.Tab></Tabs.List><Tabs.Panel value="orders">...</Tabs.Panel></Tabs>`,
          try: R`استخدم Tabs بتلات تابات، وحط [[<Badge>]] جوه واحد منهم. اختبره بـ Testing Library: [[getByRole('tab', { name: 'Returns 3' })]] ودوس عليه واتأكد إن [[getByRole('tabpanel')]] اتغير. بعدين ضيف تنقل بالأسهم: في [[Tabs.List]] اسمع لـ [[onKeyDown]] و ArrowRight يحرّك للتاب اللي بعده.`,
          flag: "script",
          deep: {
            why: R`مكتبات الـ UI محتاجة مرونة من غير ما الـ API ينفجر. component بـ ٢٠ prop ([[renderTabLabel]] و [[tabClassName]] و [[showBadgeOn]]) صعب يتفهم وصعب يتوسع. الـ compound بيدّي المستخدم JSX عادي يرتّبه زي ما هو عايز، والمنطق (مين active، والـ ids، والـ aria) مخبّي جوه. ولما تستخدم shadcn هتلاقي كل حاجة كده ([[<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>...]])، فلازم تعرف بتشتغل إزاي.`,
            how: R`الأب ([[Tabs]]) صاحب الـ state، وبيحطها في context مع [[setActive]] و [[baseId]]. كل جزء بيقرا بـ [[useTabs()]]، اللي بيرمي error لو اتنده برا [[<Tabs>]]، فأي حد يستخدم [[<Tabs.Tab>]] لوحده يعرف فورًا.

[[Tabs.List = ...]] بيحط الأجزاء كخصائص على الدالة، فالـ import واحد والكتابة [[Tabs.Tab]] بتوضّح إنهم عيلة. shadcn بيصدّرهم أسماء منفصلة ([[TabsList]] و [[TabsTrigger]])، والاتنين نفس الفكرة. وخد بالك: في Next.js، الخصائص على الدالة ممكن تعمل مشكلة لو استخدمتها من Server Component، والأسماء المنفصلة أأمن.

[[useId()]] بيطلّع id فريد وثابت (ونفسه على السيرفر والمتصفح)، فتقدر تربط التاب بالـ panel بـ [[aria-controls]] و [[aria-labelledby]] من غير ما المستخدم يدّيك ids، ولو فيه اتنين Tabs في نفس الصفحة ميتلخبطوش.

الـ roles ([[tablist]] و [[tab]] و [[tabpanel]]) و [[aria-selected]] بيخلوا قارئ الشاشة يقول «tab 2 of 3, selected». و ARIA بيتوقع إن الأسهم تتنقل بين التابات، والـ Tab key يروح للـ panel. ده بالظبط الشغل اللي Radix بيعمله جاهز، وعشان كده في مشروع حقيقي غالبًا هتستخدم Radix أو shadcn بدل ما تكتبه بإيدك.

ولو عايز الأب يتحكم في التاب المختار (يحطه في الـ URL مثلًا)، الـ Tabs محتاج [[value]] و [[onValueChange]] كمان، ودي الدرس الجاي.`,
            when: R`أي widget مكوّن من أجزاء بتتكلم مع بعض: Tabs، و Accordion، و Select، و Menu، و Dialog (Trigger و Content)، و Stepper. ولو بتبني design system لفريق.`,
            mistakes: R`[[React.Children.map]] و [[cloneElement]] عشان تحقن [[isActive]] في كل ابن: بيبوظ أول ما حد يلف التاب في div أو component تاني. و context من غير الـ throw، فاستخدام غلط بيطلع null صامت. و ids ثابتة مكتوبة بإيد ([[id="tab-1"]])، فاتنين Tabs في الصفحة بيتخانقوا. و div بـ onClick بدل button مع role. وتعيد كتابة Tabs كاملة accessible بإيدك في مشروع شغل بدل Radix.`
          },
          lines: [
            "context و useId للـ ids، والـ state.",
            "اللي الأجزاء محتاجة تعرفه: مين active، وإزاي تغيّره، وبادئة الـ ids.",
            "القناة المشتركة.",
            "hook داخلي للأجزاء.",
            "اقرا.",
            "برا Tabs؟ error واضح.",
            "رجّع.",
            "قفلة.",
            "الأب: صاحب الـ state.",
            "التاب المختار، بيبدأ من defaultValue.",
            "حط كل حاجة في الـ context، و useId بيدّي بادئة فريدة.",
            "قفلة.",
            "الجزء اللي بيلم التابات، بـ role tablist.",
            "بيرسم أولاده.",
            "قفلة.",
            "التاب الواحد.",
            "بيقرا من الـ context.",
            "زرار بـ role tab، و id، ومختار ولا لأ، وبيشاور على الـ panel، والضغطة بتغيّر.",
            "قفلة.",
            "المحتوى.",
            "بيقرا.",
            "مش المختار؟ متترسمش.",
            "المحتوى، ومربوط بالتاب بتاعه.",
            "قفلة."
          ],
          sol: R`[[getByRole('tab', { name: 'Returns 3' })]] بيلاقي التاب لأن اسمه محسوب من كل النص جواه (الكلمة والـ badge). بعد الضغطة، [[getByRole('tabpanel')]] فيه محتوى returns، و [[aria-selected]] بقت true عليه و false على الأول.

الأسهم: [[onKeyDown]] على الـ tablist بيدوّر على كل [[button[role=tab]]] جواه، ويعرف مين عليه الـ focus، ويعمل [[focus()]] و [[click()]] على اللي بعده (ولو آخر واحد يرجع للأول). وفي RTL الـ ArrowRight المفروض يروح للي قبله، وده من الحاجات اللي Radix بيعملها لوحده بـ [[dir]].`,
          solCode: R`Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const tabs = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
    const step = e.key === 'ArrowRight' ? 1 : -1
    const next = tabs[(i + step + tabs.length) % tabs.length]
    next.focus()
    next.click()
  }
  return <div role="tablist" onKeyDown={onKeyDown}>{children}</div>
}

it('switches panels', async () => {
  const user = userEvent.setup()
  render(<Tabs defaultValue="orders"><Tabs.List><Tabs.Tab value="orders">Orders</Tabs.Tab><Tabs.Tab value="returns">Returns <span>3</span></Tabs.Tab></Tabs.List><Tabs.Panel value="orders">O</Tabs.Panel><Tabs.Panel value="returns">R</Tabs.Panel></Tabs>)
  await user.click(screen.getByRole('tab', { name: 'Returns 3' }))
  expect(screen.getByRole('tabpanel')).toHaveTextContent('R')
})`
        },
        {
          cmd: "controlled ولا uncontrolled API",
          title: "component بتاعك يشتغل بـ value و onChange، أو defaultValue لوحده",
          desc: R`[[<input>]] العادي بيشتغل بطريقتين: [[defaultValue]] (هو بيمسك القيمة) أو [[value]] مع [[onChange]] (الأب بيمسكها). الـ components الكويسة بتعمل نفس الحاجة: [[<Toggle defaultChecked />]] لو الأب مش فارق معاه، و [[<Toggle checked={on} onCheckedChange={setOn} />]] لو الأب محتاج القيمة أو عايز يتحكم فيها.

القاعدة: لو [[value]] جت (مش undefined)، الـ component controlled وبيعرضها وبس، وأي تغيير بيروح لـ onChange والأب يقرر. لو مجتش، بيستخدم state داخلية بتبدأ من defaultValue. وده بيتكتب مرة واحدة في hook اسمه عادة [[useControllableState]].`,
          example: R`import { useState } from 'react'

export function useControllableState<T>({ value, defaultValue, onChange }: { value?: T; defaultValue: T; onChange?: (v: T) => void }) {
  const [inner, setInner] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : inner
  function setValue(next: T) {
    if (!isControlled) setInner(next)
    onChange?.(next)
  }
  return [current, setValue] as const
}
type ToggleProps = { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void; label: string }
export function Toggle({ checked, defaultChecked = false, onCheckedChange, label }: ToggleProps) {
  const [on, setOn] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange })
  return <button role="switch" aria-checked={on} onClick={() => setOn(!on)}>{label}</button>
}
// <Toggle label="Wi-Fi" defaultChecked />                        uncontrolled
// <Toggle label="Wi-Fi" checked={wifi} onCheckedChange={setWifi} />  controlled
// <Toggle label="Locked" checked={false} />                       الأب رافض أي تغيير`,
          try: R`استخدم Toggle بالتلات أشكال في صفحة واحدة، ودوس على كل واحد. بعدين اعمل الـ [[Tabs]] من الدرس اللي فات يقبل [[value]] و [[onValueChange]] بنفس الـ hook، وخلي الأب يحط التاب في state ويعرضه. وأخيرًا اعمل Toggle بيبدأ [[checked={undefined}]] وبعدين يبقى true، وشوف إيه اللي بيحصل.`,
          flag: "script",
          deep: {
            why: R`component بيمسك الـ state بتاعته بس مش هيعرف الأب يتحكم فيه (يفتح الـ accordion من زرار برا، أو يحفظ التاب في الـ URL). و component controlled بس بيجبر كل مستخدم يكتب [[useState]] حتى لو مش محتاجها. الاتنين مع بعض هو الـ API اللي Radix و shadcn و MUI بيستخدموه، وبيسألوا عليه في انترفيوهات الـ frontend.`,
            how: R`[[isControlled]] بيتحسب كل render: [[value !== undefined]]. controlled: الـ component بيعرض [[value]] ومبيلمسش state داخلية، و [[setValue]] بينادي [[onChange]] بس. لو الأب محدّثش الـ state (زي «Locked»)، القيمة مبتتغيرش، زي [[<input value="x">]] من غير onChange بالظبط. uncontrolled: بيحدّث [[inner]] وبينادي onChange لو موجودة (عشان الأب يعرف من غير ما يتحكم).

التسمية المتعارف عليها: [[value]] و [[defaultValue]] و [[onValueChange]]، أو [[checked]] و [[defaultChecked]] و [[onCheckedChange]]، أو [[open]] و [[defaultOpen]] و [[onOpenChange]]. الـ [[onXChange]] بتاخد القيمة الجديدة نفسها مش event.

التحويل من uncontrolled لـ controlled وهو شغال (value كانت undefined وبقت قيمة) مشكلة: الـ state الداخلية كانت ماشية لوحدها وفجأة اتجاهلت. React بتحذّر في [[<input>]] من ده، والمكتبات بتطبع warning زيه. القرار بيتاخد مرة في أول render: الأب يبعت [[value]] دايمًا (حتى لو [[false]] أو [['']]) أو ميبعتهاش أبدًا.

و [[defaultValue]] بيتقري مرة واحدة: لو غيّرته بعدين مش هيحصل حاجة، زي [[useState(initial)]]. عشان تعمل reset لقيمة جديدة، غيّر الـ [[key]].`,
            when: R`أي component قابل لإعادة الاستخدام بيمسك قيمة: inputs مخصوصة، و toggles، و tabs، و accordions، و dialogs (open)، و selects، و date pickers. في component بتستخدمه مرة في صفحة واحدة، مش محتاج الاتنين.`,
            mistakes: R`[[value ?? inner]] بدل [[value !== undefined]]: [[null]] من الأب بتتعامل كـ «مش controlled». و component بينسخ [[value]] في state داخلية ([[useState(value)]]) ويحاول يزامنها بـ effect: القيمتين بيختلفوا. و [[onChange]] مبيتناداش في الـ uncontrolled mode، فالأب ميعرفش. و [[value={user?.name}]] بتبدأ undefined وبعدين نص، فالـ component بيتحوّل من uncontrolled لـ controlled. وسؤال انترفيو: «صمم API لـ Accordion» والإجابة الكويسة فيها compound components مع open و defaultOpen و onOpenChange.`
          },
          lines: [
            "useState للوضع الـ uncontrolled.",
            "hook عام: بياخد value و defaultValue و onChange.",
            "state داخلية بتبدأ من defaultValue.",
            "الأب بعت value؟ يبقى controlled.",
            "القيمة المعروضة: بتاعة الأب، أو الداخلية.",
            "دالة التغيير:",
            "uncontrolled بس: حدّث الداخلية.",
            "وفي الحالتين بلّغ الأب لو عايز يعرف.",
            "قفلة.",
            "نفس شكل useState.",
            "قفلة الـ hook.",
            "الـ props بالتسمية المتعارف عليها.",
            "الـ component.",
            "كل المنطق في سطر.",
            "switch accessible، والضغطة بتقلب.",
            "قفلة."
          ],
          sol: R`الـ uncontrolled بيتقلب لوحده. الـ controlled بيتقلب لأن الأب بيحدّث [[wifi]]، ولو حطيت [[console.log(wifi)]] في الأب هتشوفه بيتغير. الـ Locked مبيتقلبش أبدًا: الضغطة بتنادي onCheckedChange (مش موجودة) والقيمة جاية من الأب ثابتة false. (ده متجرّب في اختبار بـ user-event.)

Tabs controlled: [[const [value, setValue] = useControllableState({ value: props.value, defaultValue: props.defaultValue ?? '', onChange: props.onValueChange })]] وبعدين تحط [[value]] و [[setValue]] في الـ context بدل الـ useState.

التحويل من undefined لـ true: أول render كان uncontrolled، ولو المستخدم داس القيمة الداخلية اتغيرت، وبعدين الأب بعت true فالـ component بقى يعرض true ويتجاهل الداخلية. مفيش crash، بس السلوك مربك، وده سبب الـ warning في المكتبات.`,
          solCode: R`export function Tabs({ value, defaultValue = '', onValueChange, children }: {
  value?: string; defaultValue?: string; onValueChange?: (v: string) => void; children: ReactNode
}) {
  const [active, setActive] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
// الأب:
function OrdersPage() {
  const [tab, setTab] = useState('orders')
  return <Tabs value={tab} onValueChange={setTab}>...</Tabs>
}`
        },
        {
          cmd: "ref كـ prop",
          title: "الأب يوصل لـ input جوه component بتاعك، أو لدوال بتعرّفها انت",
          desc: R`في React 19 الـ [[ref]] بقى prop عادي في الـ function components: [[function TextField({ ref, ...props })]] وتحطه على الـ [[<input>]]، والأب يكتب [[<TextField ref={inputRef} />]]. [[forwardRef]] مبقاش محتاج (لسه شغال في الكود القديم، وهيتشال في نسخة جاية).

ولو عايز الأب ياخد دوال مش العنصر نفسه ([[play()]] و [[pause()]] بدل الـ [[<video>]] كله)، [[useImperativeHandle(ref, () => ({ play, pause }))]] بيحدد إيه اللي يوصل للأب.`,
          example: R`import { useImperativeHandle, useRef, type Ref, type ComponentProps } from 'react'

export function TextField({ label, ref, ...props }: { label: string; ref?: Ref<HTMLInputElement> } & ComponentProps<'input'>) {
  return <label>{label} <input ref={ref} {...props} /></label>
}
export function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  return <><TextField label="Search" ref={inputRef} /><button onClick={() => inputRef.current?.focus()}>Focus search</button></>
}
export type VideoHandle = { play: () => void; pause: () => void }
export function Video({ src, ref }: { src: string; ref?: Ref<VideoHandle> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useImperativeHandle(ref, () => ({
    play: () => { void videoRef.current?.play() },
    pause: () => videoRef.current?.pause(),
  }), [])
  return <video ref={videoRef} src={src} />
}
// القديم (React 18): const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => ...)`,
          try: R`اعمل TextField و SearchPage ودوس الزرار: الـ focus يروح للخانة. بعدين استخدمه مع react-hook-form: [[<TextField label="Email" {...register('email')} />]]، وابعت الفورم فاضي: RHF بيعمل focus على أول خانة غلط، وده شغال بس لأن الـ ref وصل للـ input. شيل [[ref={ref}]] من الـ input وجرّب تاني.`,
          flag: "script",
          deep: {
            why: R`الـ components المخصوصة (TextField و Select و Button في design system) لازم تتصرف زي العناصر العادية: RHF بيسجّل الخانة بالـ ref، والـ modal بيعمل focus على أول خانة، والـ tooltip محتاج يقيس الزرار. لو الـ component بلع الـ ref، كل ده بيبوظ. وأحيانًا مش عايز تدّي الأب العنصر كله (يقدر يغيّر أي حاجة فيه)، فبتدّيله API صغير.`,
            how: R`قبل React 19، [[ref]] و [[key]] كانوا props خاصة: React بتشيلهم قبل ما توصل للـ component، فكان لازم [[forwardRef((props, ref) => ...)]] عشان تستلمه كـ argument تاني. في React 19 الـ ref بيوصل مع الـ props عادي (الـ key لسه خاص). و TypeScript: [[Ref<HTMLInputElement>]]، و [[ComponentProps<'input'>]] بيجيب كل props الـ input (بما فيها ref) عشان الـ spread.

لما الأب يبعت [[useRef]] object، React بتحط العنصر في [[current]] بعد الـ commit وترجّعه null لما يتشال. ولو بعت دالة (callback ref)، React بتناديها بالعنصر، وفي React 19 الدالة دي ممكن ترجّع cleanup بيتنادى لما العنصر يتشال.

[[useImperativeHandle(ref, create, deps)]] بيحط اللي [[create()]] رجّعه في ref الأب بدل العنصر. الـ deps زي useMemo: [[[]]] هنا لأن الدوال بتقرا [[videoRef.current]] وقت النداء. و [[void]] قبل [[play()]] عشان play بترجّع promise (ممكن تترفض لو المتصفح منع التشغيل التلقائي) ومش عايزين linter يشتكي.

الـ imperative handle استثناء: أغلب الحاجات تتعمل بـ props ([[<Video playing={true}>]] مع effect جوه). استخدمه للحاجات اللي هي «أفعال» مش «حالة»: focus، و scrollIntoView، و play مرة، و reset لفورم.`,
            when: R`أي component بيلف عنصر HTML في design system (Input و Button و Textarea) لازم يمرر الـ ref. و useImperativeHandle لـ widgets فيها أفعال: player، ومحرر نصوص (insertText)، و canvas (clear)، و list (scrollToIndex).`,
            mistakes: R`component بيلف input وميمررش الـ ref، فـ RHF ميعرفش يعمل focus ولا يقرا القيمة. و [[forwardRef]] في كود React 19 جديد (شغال بس ملوش لازمة). و useImperativeHandle لكل حاجة بدل props، فالـ component بقى API أوامر صعب يتفهم. وتقرا [[ref.current]] وقت render الأب وتلاقيه null. وتبعت [[ref]] لـ function component في React 18 من غير forwardRef، فبيبقى null مع warning.`
          },
          lines: [
            "useImperativeHandle و useRef، والأنواع.",
            "ref جاي كـ prop عادي، وباقي props الـ input.",
            "حطه على العنصر الحقيقي.",
            "قفلة.",
            "الأب.",
            "ref هيمسك الـ input اللي جوه TextField.",
            "بيبعته زي أي prop، والزرار بيعمل focus.",
            "قفلة.",
            "الـ API اللي الأب هياخده بدل العنصر.",
            "component بيدّي أفعال مش العنصر.",
            "ref داخلي للـ video الحقيقي.",
            "اللي هيوصل للأب:",
            "play، و void لأنها بترجّع promise.",
            "pause.",
            "مرة واحدة.",
            "الـ video.",
            "قفلة."
          ],
          sol: R`الزرار بيحط الـ focus في الخانة ([[toHaveFocus]] في اختبار). مع RHF والفورم فاضي والخانة required في الـ schema، أول خانة غلط بياخدها الـ focus لوحدها. من غير [[ref={ref}]] على الـ input: الـ focus مش بيحصل، والأسوأ إن RHF مش بيقرا القيمة من الخانة خالص، فالـ validation بيقول إنها فاضية حتى لو كتبت فيها.

والـ Video: [[ref.current]] في الأب فيه [[play]] و [[pause]] بس، مش الـ [[<video>]]، فالأب مش هيقدر يغيّر [[src]] مثلًا من برا.`,
          solCode: R`function SignupForm() {
  const { register, handleSubmit } = useForm<{ email: string }>({ resolver: zodResolver(z.object({ email: z.email() })) })
  return (
    <form onSubmit={handleSubmit(console.log)} noValidate>
      <TextField label="Email" {...register('email')} />
      <button>Send</button>
    </form>
  )
}

function Player() {
  const ref = useRef<VideoHandle>(null)
  return <><Video src="/intro.mp4" ref={ref} /><button onClick={() => ref.current?.play()}>Play</button></>
}`
        },
        {
          cmd: "URL state",
          title: "الفلاتر والصفحة والترتيب في الـ URL مش في useState",
          desc: R`الـ state اللي المستخدم ممكن يحب يشاركها أو يرجعلها (البحث، والفلتر، والترتيب، ورقم الصفحة، والتاب المفتوح) مكانها الـ URL: [[/products?q=mug&sort=price-asc&page=2]]. كده الـ refresh مبيضيعهاش، والرابط بيتبعت لحد فيفتح نفس النتيجة، والـ Back بيرجع للفلتر اللي قبله.

في React Router [[useSearchParams()]] بيدّيك [[params]] (URLSearchParams) و [[setParams]]. الـ URL هو مصدر الحقيقة، وكل حاجة بتتحسب منه وقت الرسم.`,
          example: R`import { useSearchParams } from 'react-router'

const SORTS = ['newest', 'price-asc', 'price-desc'] as const
type Sort = (typeof SORTS)[number]
export function useProductFilters() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)
  const sortParam = params.get('sort')
  const sort: Sort = SORTS.includes(sortParam as Sort) ? (sortParam as Sort) : 'newest'
  function update(patch: Record<string, string | number | null>) {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === '') next.delete(k)
        else next.set(k, String(v))
      }
      if (!('page' in patch)) next.delete('page')
      return next
    }, { replace: 'q' in patch })
  }
  return { q, page, sort, update }
}
// const { q, page, sort, update } = useProductFilters()
// useQuery({ queryKey: ['products', { q, page, sort }], ... })
// <input value={q} onChange={e => update({ q: e.target.value })} />`,
          try: R`اعمل صفحة فيها خانة بحث و select للترتيب وزرار «الصفحة الجاية» بالـ hook ده، واعرض [[{ q, page, sort }]]. جرّب: اختار ترتيب، وروح صفحة ٣، واعمل refresh، وانسخ الـ URL في تاب جديد، ودوس Back. وافتح [[?page=-5&sort=hack]] بإيدك. وبعدين اكتب كلمة من ٥ حروف ودوس Back: رجعت فين؟`,
          flag: "script",
          deep: {
            why: R`فلتر في [[useState]] بيضيع مع أي refresh، والمستخدم بيبعت لزميله رابط «شوف الطلبات دي» فيفتح صفحة فاضية، والـ Back بيطلّعه من الصفحة كلها بدل ما يرجّع الفلتر. ولو الفلتر في state وفي الـ URL الاتنين، هيختلفوا. الـ URL كمصدر حقيقة واحد بيحل ده، وبيخلي الصفحة قابلة للـ bookmark والـ SEO.`,
            how: R`[[params.get('page')]] بترجّع string أو null، فكل قيمة لازم تتحول وتتحقق: [[Number()]] لرقم مع حد أدنى، و list مسموحة للـ sort. أي حد يقدر يكتب أي حاجة في الـ URL، فمتثقش فيه (ولو القيم كتير، zod schema للـ search params بتعمل ده في سطر).

[[setParams(prev => next)]] بياخد دالة زي setState، فبتبني على الـ params الحالية وتغيّر اللي عايزه بس بدل ما تمسح الباقي. و [[setParams]] بيعمل navigation: الـ URL بيتغير و React Router بيعيد رسم كل اللي بيقرا الـ params.

قرارين مهمين: أي فلتر جديد بيرجّع الصفحة لـ 1 (وإلا تبقى في صفحة ٥ من نتايج بقى فيها صفحتين). و [[replace: true]] للكتابة في خانة البحث، عشان كل حرف ميعملش entry في الـ history والـ Back يرجع حرف حرف، بينما تغيير الترتيب أو الصفحة push عادي فالـ Back يرجّعه.

القيم الافتراضية مش بتتكتب في الـ URL ([[next.delete]] لما القيمة فاضية)، فالـ URL يفضل نضيف. والـ key بتاع React Query فيه نفس القيم، فكل تركيبة فلاتر ليها كاش، والـ Back بيرجّع النتيجة فورًا.

في Next.js نفس الفكرة: [[searchParams]] prop في الصفحة (Server Component) أو [[useSearchParams]] من [[next/navigation]] في client component و [[router.replace]] (تاب Next.js، درس searchParams). ومكتبة [[nuqs]] بتعمل ده بأنواع وparsers جاهزة في الاتنين.`,
            when: R`أي حاجة بتغيّر «إيه اللي معروض» والمستخدم ممكن يشاركه: بحث، وفلاتر، وترتيب، و pagination، والتاب المفتوح، والـ item المختار في master/detail. ومش لحاجات مؤقتة (dropdown مفتوح، أو hover، أو نص فورم لسه بيتكتب).`,
            mistakes: R`نسخ الـ params في [[useState]] ومزامنتها بـ effect. و [[setParams({ sort })]] بـ object فبيمسح q و page. ومفيش validation فـ [[?page=abc]] بتبعت [[NaN]] للـ API. وكل حرف في البحث بيعمل push فالـ Back بقى مستحيل. ومبترجعش لصفحة 1 مع فلتر جديد. وتحط بيانات كبيرة أو حساسة في الـ URL (بتتسجل في logs السيرفر والـ history).`
          },
          lines: [
            "hook الـ query string.",
            "القيم المسموحة للترتيب.",
            "النوع منها.",
            "hook واحد لكل فلاتر الصفحة.",
            "الـ params الحالية وأداة التغيير.",
            "البحث، ولو مش موجود نص فاضي.",
            "الصفحة: رقم صحيح ١ أو أكتر، وأي حاجة غريبة تبقى ١.",
            "الترتيب كنص.",
            "لو مش من القيم المسموحة، الافتراضي.",
            "دالة تغيير أي مجموعة قيم:",
            "على الـ params الحالية:",
            "نسخة جديدة.",
            "لكل قيمة:",
            "فاضية؟ اشيلها من الـ URL.",
            "غير كده حطها.",
            "قفلة.",
            "أي فلتر غير الصفحة نفسها يرجّع لأول صفحة.",
            "رجّع الـ params الجديدة.",
            "البحث replace عشان الـ history، والباقي push.",
            "قفلة update.",
            "رجّع القيم والدالة.",
            "قفلة."
          ],
          sol: R`بعد اختيار الترتيب والصفحة ٣: الـ URL [[?sort=price-asc&page=3]]، والـ refresh والتاب الجديد بيفتحوا نفس الحالة. Back بيرجّعك لصفحة ٢ أو للترتيب اللي قبله. [[?page=-5&sort=hack]] بيعرض [[{"q":"","page":1,"sort":"newest"}]] من غير crash (متجرّب في اختبار بـ MemoryRouter).

كتابة كلمة من ٥ حروف بتعمل entry واحد تقريبًا في الـ history (كل حرف replace)، فالـ Back بيرجعك لقبل ما تبدأ تكتب مش حرف حرف. وأي حرف في البحث بيشيل [[page]] من الـ URL.

لو الـ Back بيرجع حرف حرف، الـ [[replace]] ناقص. ولو اختيار الترتيب مسح البحث، انت بتبعت object بدل ما تبني على [[prev]].`,
          solCode: R`export function Filters() {
  const { q, page, sort, update } = useProductFilters()
  return (
    <>
      <input aria-label="Search" value={q} onChange={e => update({ q: e.target.value })} />
      <select aria-label="Sort" value={sort} onChange={e => update({ sort: e.target.value })}>
        {SORTS.map(s => <option key={s}>{s}</option>)}
      </select>
      <button onClick={() => update({ page: page + 1 })}>Next page</button>
      <output>{JSON.stringify({ q, page, sort })}</output>
    </>
  )
}`
        },
        {
          cmd: "dangerouslySetInnerHTML",
          title: "اعرض HTML جاي من CMS أو محرر نصوص من غير ما تفتح ثغرة XSS",
          desc: R`React بتعمل escape لأي نص، فـ [[{article.body}]] لو فيه [[<h2>]] هيظهر كنص حرفيًا. لو المحتوى HTML فعلًا (من CMS، أو محرر زي TipTap، أو Markdown اتحوّل)، [[dangerouslySetInnerHTML={{ __html: html }}]] بيحطه في الـ DOM كما هو. والاسم مقصود: أي [[<script>]] أو [[onerror]] أو [[javascript:]] جوه الـ HTML ده هيشتغل على موقعك.

القاعدة: عمرك ما تحط HTML مش انت كاتبه من غير تنضيف. [[DOMPurify.sanitize(html)]] بيشيل أي حاجة ممكن تشغّل كود ويسيب التنسيق.`,
          example: R`import DOMPurify from 'dompurify'
import { useMemo } from 'react'

export function ArticleBody({ html }: { html: string }) {
  const clean = useMemo(() => DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form'] }), [html])
  return <div className="prose" dangerouslySetInnerHTML={{ __html: clean }} />
}
// الدخل:  <h2>Hi</h2><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a>
// الناتج: <h2>Hi</h2><img src="x"><a>x</a>`,
          try: R`[[npm i dompurify]]، وارسم ArticleBody بالدخل اللي في التعليق مرة من غير sanitize ومرة بيه، وشوف في Elements الفرق (ومن غيره هيطلع alert). بعدين خلي كل الروابط تفتح في تاب جديد بأمان: [[DOMPurify.addHook('afterSanitizeAttributes', ...)]] يحط [[target="_blank"]] و [[rel="noopener noreferrer"]] على أي [[<a>]].`,
          flag: "script",
          deep: {
            why: R`المحتوى الغني جاي من حتت كتير: مقالات من CMS، ووصف منتج كتبه تاجر في لوحة أدمن، وتعليقات فيها تنسيق، وإيميلات بتتعرض في التطبيق. لو أي حد من دول قدر يحط [[<img onerror>]]، الكود بتاعه هيشتغل في متصفح كل زائر: يسرق الـ session، أو يغيّر الصفحة، أو يبعت طلبات باسم المستخدم (Stored XSS، تاب الأمان).`,
            how: R`[[dangerouslySetInnerHTML]] بيعمل [[element.innerHTML = __html]]. المتصفح مش بيشغّل [[<script>]] اللي بيتحط بـ innerHTML، بس بيشغّل event handlers ([[onerror]] و [[onload]]) وروابط [[javascript:]] لما حد يدوس، و [[<iframe srcdoc>]] وحاجات تانية كتير. عشان كده فلترة [[<script>]] بـ regex مش حماية.

DOMPurify بيعمل parse للـ HTML بـ DOM المتصفح نفسه، ويمشي على كل عنصر وخاصية ويشيل أي حاجة مش في الـ allowlist: الـ event handlers كلها، و [[javascript:]] في الروابط، و [[<script>]] و [[<iframe>]] و [[<object>]]. و [[USE_PROFILES: { html: true }]] بيسمح بـ HTML بس (من غير SVG و MathML)، و [[FORBID_TAGS]] بيقفل حاجات زيادة ([[<style>]] ممكن يغيّر شكل الصفحة كلها، و [[<form>]] ممكن يعمل phishing). الـ [[style]] كـ attribute بيعدّي افتراضيًا، فلو مش عايزه [[FORBID_ATTR: ['style']]].

الـ [[useMemo]] عشان الـ sanitize مش رخيص على HTML كبير، ومفيش داعي يتعاد مع كل render للأب.

DOMPurify محتاج DOM، ففي Next.js (Server Component أو SSR) استخدم [[isomorphic-dompurify]] (بيستخدم jsdom على السيرفر)، أو نضّف مرة واحدة وقت الحفظ وخزّن النسخة النضيفة. الأأمن الاتنين: وقت الحفظ ووقت العرض، لأن المحتوى القديم في الداتابيز ممكن يكون اتحفظ قبل ما تضيف الحماية.

والبدايل الأحسن لو تقدر: Markdown بمكتبة بتطلّع React elements (react-markdown، ومبتستخدمش innerHTML أصلًا)، أو المحرر يخزّن JSON (TipTap و Lexical) وانت ترسمه components.`,
            when: R`HTML جاي من CMS أو محرر نصوص أو API خارجي أو إيميلات. ولو HTML ثابت انت كاتبه في الكود، مفيش داعي لـ dangerouslySetInnerHTML أصلًا: اكتبه JSX.`,
            mistakes: R`[[dangerouslySetInnerHTML={{ __html: post.body }}]] من غير sanitize «عشان الأدمن بس اللي بيكتب»: حساب أدمن واحد اتسرق ويبقى كل زائر في خطر. و regex بيشيل [[<script>]] وتفتكر ده كفاية. و sanitize وقت الحفظ بس. وتحط [[<script>]] بتاع widget خارجي بـ dangerouslySetInnerHTML ومستغرب إنه مش شغال: innerHTML مبيشغّلش scripts، استخدم [[<script>]] بـ effect أو [[next/script]]. و CSP (Content-Security-Policy) غايب: ده خط الدفاع التاني لو حاجة عدّت (تاب الأمان). وسؤال انترفيو: «React بتحمي من XSS؟» أيوة للنصوص في JSX، ولأ في dangerouslySetInnerHTML و [[href]] بقيمة من المستخدم ([[javascript:]]) و [[ref.current.innerHTML]].`
          },
          lines: [
            "DOMPurify.",
            "useMemo.",
            "component بيعرض HTML جاي من برا.",
            "نضّفه: HTML بس، ومن غير style ولا form، ومرة لكل HTML جديد.",
            "حطه في الـ DOM بعد التنضيف بس.",
            "قفلة."
          ],
          sol: R`من غير sanitize: الـ alert بيطلع (من [[onerror]] بتاع الصورة، مش من الـ script اللي innerHTML مبيشغّلوش)، ودوسة على اللينك بتطلّع alert تالت. بالـ sanitize الـ Elements فيها بالظبط [[<h2>Hi</h2><img src="x"><a>x</a>]]: الـ onerror والـ script والـ javascript: اتشالوا، والـ h2 فضل (متجرّب في jsdom).

الـ hook بيتسجّل مرة واحدة برا الـ component، وبعدها كل الروابط في أي HTML متنضف فيها [[target="_blank"]] و [[rel="noopener noreferrer"]].`,
          solCode: R`import DOMPurify from 'dompurify'

DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

const dirty = '<h2>Hi</h2><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a><a href="https://example.com">ok</a>'
console.log(DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } }))
// <h2>Hi</h2><img src="x"><a>x</a><a href="https://example.com" target="_blank" rel="noopener noreferrer">ok</a>`
        },
        {
          cmd: "form actions",
          title: "React 19: action على الفورم، و useActionState و useOptimistic من غير Next",
          desc: R`في React 19 تقدر تدّي [[<form action={fn}>]] دالة (حتى في Vite من غير سيرفر)، و React بتناديها بالـ [[FormData]] جوه transition، وبتعمل reset للفورم لما تخلص بنجاح. و [[useActionState(action, initial)]] بيدّيك الـ state اللي الـ action رجّعتها (أخطاء أو نتيجة) و [[isPending]]، و [[useFormStatus()]] في أي component جوه الفورم يعرف إنه بيتبعت.

و [[useOptimistic(value, reducer)]] بيعرض قيمة متفائلة وانت مستني الـ action، وبترجع للقيمة الحقيقية لوحدها لما الـ action تخلص، سواء نجحت أو فشلت. في Next.js نفس الـ hooks مع Server Actions (تاب Next.js، درس useActionState).`,
          example: R`import { useActionState, useOptimistic } from 'react'
import { useFormStatus } from 'react-dom'

type State = { error: string | null; saved: string | null; email: string }
function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
}
export function NewsletterForm({ subscribe }: { subscribe: (email: string) => Promise<void> }) {
  const [state, formAction, isPending] = useActionState(async (_prev: State, formData: FormData): Promise<State> => {
    const email = String(formData.get('email') ?? '').trim()
    if (!email.includes('@')) return { error: 'Enter a valid email', saved: null, email }
    try {
      await subscribe(email)
      return { error: null, saved: email, email: '' }
    } catch {
      return { error: 'Server error, try again', saved: null, email }
    }
  }, { error: null, saved: null, email: '' })
  return (
    <form action={formAction}>
      <input name="email" aria-label="Email" defaultValue={state.email} />
      <SubmitButton />
      {state.error && <p role="alert">{state.error}</p>}
      {state.saved && !isPending && <p role="status">Subscribed {state.saved}</p>}
    </form>
  )
}
export function LikeButton({ likes, onLike }: { likes: number; onLike: () => Promise<void> }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(likes, (current, delta: number) => current + delta)
  async function likeAction() {
    addOptimistic(1)
    await onLike()
  }
  return <form action={likeAction}><button>♥ {optimisticLikes}</button></form>
}`,
          try: R`ارسم NewsletterForm بـ subscribe بتستنى ثانيتين. اكتب «bad» وابعت: الرسالة تظهر والنص يفضل في الخانة. امسح [[defaultValue={state.email}]] وكرّر: النص بيتمسح مع الخطأ. بعدين ارسم LikeButton جوه أب عنده [[likes]] في state، و onLike بتفشل مرة وتنجح مرة (وفي النجاح الأب يزوّد likes)، ودوس.`,
          flag: "script",
          deep: {
            why: R`الفورم العادي في React فيه كود بيتكرر: [[e.preventDefault()]]، و isSubmitting، و try/catch، و state للخطأ، و reset بعد النجاح، وزرار مقفول. الـ Actions بتعمل الدورة دي جاهزة، ومع Next.js نفس الفورم بيشتغل حتى قبل ما الـ JS يتحمّل. و useOptimistic بيدّيك الـ optimistic update من غير كاش ومن غير rollback بإيدك.`,
            how: R`[[action={fn}]] على [[<form>]]: React بتمنع الإرسال العادي وتنادي fn بـ [[FormData]] (كل خانة ليها name). وده بيحصل جوه transition، فالواجهة مبتهنّجش، وأي [[useFormStatus]] تحته بيقول [[pending: true]]. و [[useFormStatus]] بيقرا حالة الفورم الأب، فلازم يتنادى في component جوه [[<form>]] مش في الـ component اللي بيرسم الفورم نفسه.

[[useActionState(fn, initial)]] بيلف الـ action: fn بتاخد الـ state اللي فاتت والـ FormData، واللي بترجّعه بيبقى [[state]] الجديدة. الأخطاء المتوقعة (validation، وإيميل مستخدم) بترجع كقيمة مش throw: أي throw بيروح لأقرب ErrorBoundary. و [[isPending]] true طول ما شغالة، وطلبات ورا بعض بتتنفذ بالترتيب.

الـ reset: بعد ما الـ action تخلص، React بتعمل [[form.reset()]] للـ uncontrolled inputs، يعني كل خانة ترجع لـ defaultValue بتاعها. ده كويس بعد النجاح، ومزعج بعد الخطأ (المستخدم يكتب تاني من الأول). الحل في المثال: الـ state بترجّع الإيميل اللي اتكتب، و [[defaultValue={state.email}]]، فالـ reset بيرجّع الخانة لنفس النص في الخطأ، ولفاضي في النجاح (متجرّب).

[[useOptimistic(likes, reducer)]]: طول ما مفيش action شغالة، [[optimisticLikes]] = [[likes]]. جوه action، [[addOptimistic(1)]] بيعرض [[likes + 1]] فورًا. لما الـ action تخلص، React بترمي القيمة المتفائلة وترجع لـ [[likes]] الحقيقية: لو الأب زوّدها (نجاح) تفضل 11، لو لأ (فشل) ترجع 10 لوحدها. و addOptimistic لازم تتنادى جوه action أو transition، وإلا React بتطبع warning.

والفرق عن React Query: useOptimistic للحالات البسيطة اللي الـ state فيها في component واحد، و [[onMutate]] بتاع Query لما نفس البيانات معروضة في كذا مكان من الكاش.`,
            when: R`فورمات بسيطة لحد متوسطة في React 19 (اشتراك، وتعليق، وإعدادات)، وأي فورم في Next.js مع Server Actions. و useOptimistic لـ like و toggle وإضافة تعليق. ولفورم كبير بـ validation لحظي ورسايل لكل خانة، react-hook-form لسه أقوى (وممكن يتجمع مع actions).`,
            mistakes: R`[[useFormStatus]] في نفس الـ component اللي بيرسم الـ form فيرجّع دايمًا false. و throw للأخطاء المتوقعة فالصفحة تروح للـ ErrorBoundary بدل رسالة تحت الخانة. ونسيان الـ reset: المستخدم يفقد اللي كتبه بعد خطأ. و [[value]] (controlled) على الخانات مع actions، فالـ reset ملوش أثر والـ state متلخبطة. و [[addOptimistic]] برا action. و [[onSubmit]] و [[action]] الاتنين على نفس الفورم.`
          },
          lines: [
            "useActionState و useOptimistic من react.",
            "useFormStatus من react-dom.",
            "اللي الـ action بترجّعه: خطأ، أو نجاح، والإيميل اللي يرجع للخانة.",
            "زرار بيعرف حالة الفورم اللي هو جواه.",
            "الفورم الأب بيتبعت؟",
            "مقفول ونصه بيتغير.",
            "قفلة.",
            "الفورم.",
            "الـ state والـ action الملفوفة و isPending. الـ action بتاخد الـ state اللي فاتت والـ FormData:",
            "اقرا الخانة بالـ name.",
            "خطأ متوقع: رجّعه كقيمة، والإيميل عشان الخانة متتمسحش.",
            "حاول:",
            "الطلب.",
            "نجح: الإيميل فاضي، فالـ reset يفضّي الخانة.",
            "فشل الطلب:",
            "رسالة، والإيميل يفضل.",
            "قفلة الـ catch.",
            "القيمة الأولى.",
            "بداية الـ JSX.",
            "الـ action على الفورم، من غير onSubmit ولا preventDefault.",
            "uncontrolled، والـ reset بيرجّعها لـ state.email.",
            "الزرار اللي بيقرا useFormStatus.",
            "الخطأ.",
            "النجاح بعد ما الـ action تخلص.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة.",
            "like متفائل.",
            "القيمة المعروضة: الحقيقية، أو الحقيقية + التعديلات المتفائلة وقت الـ action.",
            "الـ action:",
            "زوّد واحد على الشاشة فورًا.",
            "ابعت، ولما تخلص القيمة المتفائلة بتتشال لوحدها.",
            "قفلة.",
            "فورم فيه زرار بس، والـ action بتتنادى مع الضغطة.",
            "قفلة."
          ],
          sol: R`«bad»: رسالة «Enter a valid email» والنص «bad» فاضل في الخانة. إيميل سليم: الزرار «Saving...» ومقفول ثانيتين، وبعدين «Subscribed a@b.com» والخانة فاضية. من غير [[defaultValue={state.email}]]: الخطأ بيظهر والخانة بتتمسح، لأن React بتعمل reset بعد أي action خلصت.

LikeButton: الرقم بيبقى ♥ 11 فورًا. لو onLike فشلت (والأب مزوّدش)، بيرجع ♥ 10 لوحده لما الـ promise تخلص. لو نجحت والأب زوّد، بيفضل 11. (الاتنين متجرّبين في اختبار بـ user-event.)`,
          solCode: R`function LikeHost() {
  const [likes, setLikes] = useState(10)
  const attempt = useRef(0)
  async function onLike() {
    await new Promise(r => setTimeout(r, 1000))
    attempt.current++
    if (attempt.current % 2 === 1) return // فشل: مفيش تحديث
    setLikes(l => l + 1)
  }
  return <LikeButton likes={likes} onLike={onLike} />
}
<NewsletterForm subscribe={() => new Promise(r => setTimeout(r, 2000))} />`
        },
        {
          cmd: "render props و HOCs",
          title: "اقرا الـ patterns القديمة: render props و Higher-Order Components",
          desc: R`قبل الـ hooks (٢٠١٩)، كان فيه طريقتين لمشاركة منطق بين components: الـ render prop، component بياخد دالة وينادها بالبيانات ([[<MouseTracker render={pos => <Cursor {...pos} />} />]])، والـ HOC، دالة بتاخد component وترجّع component جديد ملفوف ([[export default withAuth(Dashboard)]]).

النهارده الاتنين بيتكتبوا custom hook: [[const pos = useMousePosition()]] و [[const { user } = useAuth()]]. بس هتلاقيهم كتير في الكود القديم وفي مكتبات لسه شغالة ([[connect()]] بتاع Redux القديم، و [[withRouter]] بتاع React Router 5، و [[<Formik>{({ values }) => ...}</Formik>]])، فلازم تعرف تقراهم وتحوّلهم.`,
          example: R`// render prop
function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => ReactNode }) {
  const pos = useMousePosition()
  return <>{render(pos)}</>
}
// <MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />

// HOC
function withAuth<P extends object>(Component: ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, isLoading } = useAuth()
    if (isLoading) return <Spinner />
    if (!user) return <Navigate to="/login" replace />
    return <Component {...props} />
  }
}
// export default withAuth(Dashboard)

// النهارده: hook
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return pos
}`,
          try: R`خد الـ HOC ده وحوّله: بدل [[withAuth(Dashboard)]] استخدم [[RequireAuth]] (layout route من درس protected route) أو hook جوه Dashboard. وافتح React DevTools على component ملفوف في ٣ HOCs ([[withAuth(withTheme(withI18n(Page)))]]) وشوف شكل الشجرة.`,
          flag: "script",
          deep: {
            why: R`كود React عمره ٥ سنين أو أكتر مليان HOCs و render props، ولما تشتغل في شركة هتصلّح فيه أو تنقله. ولو مش فاهم إن [[withRouter(connect(mapState)(Component))]] ده component ملفوف مرتين، مش هتعرف منين الـ props جاية. وكمان الـ render prop لسه مستخدم في مكتبات حديثة لما الأب محتاج يرسم حاجة بالبيانات بتاعة الابن ([[<Controller render={({ field }) => ...}>]] في react-hook-form و [[table.Subscribe]] في TanStack).`,
            how: R`الـ render prop: الـ component صاحب المنطق مبيعرفش هيرسم إيه، فبينادي الدالة اللي جاتله بالبيانات ويرسم اللي رجع. نفس الفكرة لو الدالة جت كـ children: [[<Mouse>{pos => ...}</Mouse>]] (function as children). ومشكلتها التداخل: ٣ render props جوه بعض بيعملوا «pyramid» صعب يتقري.

الـ HOC: [[withAuth(Dashboard)]] بيرجّع component جديد بيعمل حاجة (auth check، أو بيحقن props زي [[user]]) وبعدين يرسم الأصلي. المشاكل: الـ props بتتحقن من غير ما تشوفها في الـ JSX (منين [[user]] جت؟)، وتعارض الأسماء لو اتنين HOCs حقنوا نفس الـ prop، والـ DevTools مليانة طبقات ([[WithAuth > WithTheme > Page]])، والـ types في TypeScript صعبة. والـ HOC لازم يتعمل مرة واحدة برا الـ render: [[withAuth(Page)]] جوه component بيعمل component جديد كل render فالـ state بتروح.

الـ hooks حلّت ده: المنطق في دالة، والقيم بتظهر صريحة في الـ component ([[const { user } = useAuth()]])، ومفيش طبقات. لكن الـ render prop لسه أنسب لما الـ component الأب محتاج يتحكم في «الرسم» في نقطة معينة (Controller في RHF، أو Virtualizer في بعض المكتبات)، و HOCs لسه بتتشاف في حاجات زي [[memo()]] نفسه (هو HOC) و [[observer()]] في MobX.`,
            when: R`تقرا وتعدّل كود قديم. ولما تكتب جديد: hooks دايمًا، و render prop بس لو الأب محتاج يدّي «فتحة رسم» بالبيانات بتاعته.`,
            mistakes: R`تعمل HOC جوه render. و HOC بينسى يمرر [[{...props}]] فالـ props بتضيع. وتكتب HOC جديد في ٢٠٢٦ لحاجة hook بيعملها. وتحوّل كود قديم كله مرة واحدة من غير اختبارات. وسؤال انترفيو: «HOC ولا hook؟» الـ hooks بتشارك منطق من غير ما تغيّر الشجرة ومن غير props مخفية، والـ HOC لسه مفيد لما عايز «تلف» component كامل من برا (memo مثلًا).`
          },
          lines: [
            "component بياخد دالة بترسم.",
            "المنطق عنده.",
            "بينادي الدالة بالبيانات ويرسم اللي رجع.",
            "قفلة.",
            "HOC: دالة بتاخد component.",
            "وترجّع component جديد بنفس الـ props.",
            "المنطق المشترك.",
            "تحميل.",
            "مش داخل.",
            "داخل: ارسم الأصلي بكل الـ props.",
            "قفلة.",
            "قفلة.",
            "نفس المنطق كـ hook.",
            "الموقع.",
            "effect يسمع للماوس:",
            "مع كل حركة حدّث.",
            "سجّل.",
            "والـ cleanup.",
            "مرة واحدة.",
            "رجّع القيمة.",
            "قفلة."
          ],
          sol: R`بعد التحويل: [[Dashboard]] بقى component عادي، والحماية في layout route ([[{ Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] }]]) أو [[const { user } = useAuth()]] جواه لو محتاج الـ user نفسه. [[export default withAuth(Dashboard)]] اتشالت.

في DevTools مع ٣ HOCs هتشوف ٣ طبقات فوق Page، كل واحدة بالاسم اللي انت ادّيته للدالة الداخلية (عشان كده [[function WithAuth]] بالاسم أحسن من arrow مجهولة، اللي بتظهر «Anonymous»).`,
          solCode: R`// قبل
export default withAuth(Dashboard)

// بعد: الحماية في الـ routes
const router = createBrowserRouter([
  { Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] },
])
// ولو Dashboard محتاج المستخدم:
function Dashboard() {
  const { user } = useAuth()
  return <h1>Hi {user?.name}</h1>
}`
        }
      ]
    }
]);

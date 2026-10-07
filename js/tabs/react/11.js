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
          teach: R`## الفكرة: ٣ أسباب بس للـ render

الكود ده تجربة بتوريك مين بيعيد الرسم ومين لأ لما تدوس زرار. فيه أب ([[Parent]]) جواه ٤ أولاد: [[Plain]] عادي، و [[Memoized]] ملفوف في [[memo]]، و [[Box]] عنده state خاصة بيه، و [[ExpensiveChild]] متبعت لـ Box كـ [[children]]. كل component فيه [[console.log('render X')]] أول سطر، فكل سطر في الـ console = render.

اتشغّل في Vite 8.3 + React 19.3 (وضع التطوير، من غير Strict Mode الأول) في Chrome headless، والضغط بـ Playwright. الكود الكامل اللي اتشغّل: المثال + الـ solCode.

---

## ١. Box: component عنده state وبيرسم children

~~~text Box
function Box({ children }: { children: ReactNode }) {
  const [n, setN] = useState(0)
  return <div><button onClick={() => setN(n + 1)}>box {n}</button>{children}</div>
}
~~~

- [[{ children }]]: الـ component بياخد object الـ props، وإحنا بنفكّه (destructuring) وناخد [[children]] بس. و [[children]] هو أي حاجة اتكتبت بين [[<Box>]] و [[</Box>]].
- [[: { children: ReactNode }]]: نوع TypeScript للـ props. [[ReactNode]] يعني «أي حاجة React تعرف ترسمها»: عنصر JSX، أو نص، أو رقم، أو [[null]].
- [[useState(0)]]: state رقم بيبدأ من صفر. [[n]] القيمة، و [[setN]] اللي بيغيّرها ويطلب render.
- [[onClick={() => setN(n + 1)}]]: الدوسة بتزوّد [[n]] واحد. ده بيخلي **Box بس** يعيد الرسم، مش الأب.
- [[{children}]] في الآخر: ارسم اللي اتبعتلي هنا.

## ٢. Parent

~~~text Parent
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
~~~

- [[export]]: الدالة بتطلع من الملف عشان ملف تاني يستخدمها.
- [[<>]] و [[</>]]: Fragment، بيلم كذا عنصر من غير ما يضيف [[<div>]] زيادة في الـ DOM.
- [[setCount(c => c + 1)]]: شكل الـ updater: بتدّي React دالة بتاخد القيمة الحالية [[c]] وترجّع الجديدة.
- [[<Plain label="same" />]] و [[<Memoized label="same" />]]: نفس الـ prop بالظبط ([[label]] نصها [["same"]] دايمًا). الفرق الوحيد إن Memoized ملفوف في [[memo]].
- [[<Box><ExpensiveChild /></Box>]]: هنا الحيلة. عنصر [[<ExpensiveChild />]] **اتعمل جوه Parent**، واتبعت لـ Box كـ [[children]].

الـ components التلاتة التانيين من الـ solCode:

~~~text solCode
function Plain({ label }: { label: string }) { console.log('render Plain'); return <p>{label}</p> }
const Memoized = memo(function Memoized({ label }: { label: string }) { console.log('render Memoized'); return <p>{label}</p> })
function ExpensiveChild() { console.log('render ExpensiveChild'); return <p>slot</p> }
~~~

- [[memo(function Memoized ...)]]: [[memo]] بياخد component ويرجّع component جديد بيقارن الـ props الجديدة بالقديمة قبل ما يرسم. لو كلها زي ما هي يتخطى (الدرس الجاي بالتفصيل).
- الـ [[;]] بتفصل جملتين في نفس السطر: اطبع، وبعدين رجّع JSX.

---

## ٣. اللي حصل

~~~text الـ Console (فتح الصفحة)
render Parent
render Plain
render Memoized
render Box
render ExpensiveChild
~~~

أول مرة (mount) كله بيترسم، طبيعي.

### دوسة على count

~~~text الـ Console
render Parent
render Plain
render Box
render ExpensiveChild
~~~

- [[Parent]]: الـ state بتاعته اتغيرت (السبب الأول).
- [[Plain]] و [[Box]]: الأب عمل render، فهم كمان (السبب التاني)، مع إن الـ props بتاعتهم زي ما هي.
- [[ExpensiveChild]]: العنصر بتاعه بيتعمل في render بتاع Parent، فلما Parent اترسم، اتعمل object جديد واترسم.
- [[Memoized]] **مش موجود**: [[memo]] قارن [["same"]] بـ [["same"]] ولقاهم زي بعض، فاتخطى.

### دوسة على box

~~~text الـ Console
render Box
~~~

سطر واحد بس. Box غيّر الـ state بتاعته فاترسم، بس [[ExpensiveChild]] لأ: الـ [[children]] اللي معاه هو نفس الـ object اللي اتعمل في آخر render للأب، و React لما بتلاقي نفس العنصر بالظبط بتتخطاه من غير أي memo.

---

## ٤. نفس الـ child جوه Box (الـ solCode)

~~~text solCode
function BoxInside() {
  const [n, setN] = useState(0)
  return <div><button onClick={() => setN(n + 1)}>box {n}</button><ExpensiveChild /></div>
}
~~~

نفس Box بالظبط، بس [[<ExpensiveChild />]] مكتوب جواه بدل ما يجيله من برا. رسمناه (وسمّينا الزرار [[inside]] عشان نميّزه) ودوسنا:

~~~text الـ Console (دوسة على زرار BoxInside)
render BoxInside
render ExpensiveChild
~~~

دلوقتي كل دوسة بترسم ExpensiveChild، لأن العنصر بقى بيتعمل من جديد في كل render للـ Box. ده كل الفرق بين «children من برا» و «عنصر جوه الـ component».

---

## ٥. Strict Mode بيضاعف العدد

فتحنا نفس الصفحة ملفوفة في [[<StrictMode>]] ودوسنا count:

~~~text الـ Console (StrictMode)
render Parent
render Parent
render Plain
render Plain
render Box
render Box
render ExpensiveChild
render ExpensiveChild
~~~

كل component بيترسم مرتين في التطوير عن قصد عشان يكشف الكود اللي مش pure. نفس النتيجة (Memoized برضه مش موجود)، بس كل سطر متكرر. في الـ build بتاع الإنتاج مرة واحدة.

## ٦. ونفس الكود بـ React Compiler

شغّلنا نفس الملف بـ React Compiler (درس «React Compiler») ودوسنا count:

~~~text الـ Console (بالـ compiler)
render Parent
~~~

الـ compiler حفظ عناصر JSX اللي مبتعتمدش على [[count]]، فـ React لقت نفس العناصر واتخطتهم كلهم.

---

## الخلاصة

| الدوسة | مين اترسم | ليه |
|---|---|---|
| count | Parent و Plain و Box و ExpensiveChild | state الأب، والأولاد بيترسموا مع الأب |
| count | مش Memoized | [[memo]] والـ prop زي ما هي |
| box | Box بس | state بتاعة Box، و children جاي جاهز من الأب |
| inside (BoxInside) | BoxInside و ExpensiveChild | العنصر بيتعمل جوه الـ component نفسه |

- أسباب الـ render: state بتاعته، أو الأب اترسم، أو context بيقراه اتغير.
- render مش معناه تغيير في الـ DOM: React بتقارن الناتج وتلمس اللي اتغير بس.
- قبل [[memo]]: نزّل الـ state لتحت، أو ابعت الحاجة التقيلة [[children]].`,
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
          teach: R`## الفكرة: memo بيقارن بالمرجع، مش بالشكل

المثال فيه component واحد بياخد object ([[MemoWithObject]]) وواحد بياخد دالة ([[MemoWithFn]])، الاتنين ملفوفين في [[memo]]، وكل واحد مرسوم مرتين: مرة بـ prop مرجعها ثابت، ومرة بـ prop بتتعمل جديدة كل render. نشوف مين الـ memo بتاعه بيشتغل.

اتشغّل في Vite 8.3 + React 19.3 (وضع التطوير) في Chrome headless، بالـ [[console.log]] اللي في الـ solCode، وضفنا prop اسمها [[tag]] لـ MemoWithFn عشان نعرف أنهي نسخة اللي اترسمت.

---

## ١. يعني إيه «زي القديمة»؟ [[Object.is]]

[[memo]] بيقارن كل prop بالقديمة بـ [[Object.is(a, b)]]. جرّبناها في Node:

~~~text Node
Object.is('same', 'same')                 true
Object.is(3, 3)                           true
Object.is({color:'red'}, {color:'red'})   false
Object.is(RED, RED)                       true
Object.is(() => 1, () => 1)               false
~~~

- النصوص والأرقام (primitives) بتتقارن بالقيمة.
- الـ objects والدوال بتتقارن بالمرجع: «هل ده نفس الـ object في الذاكرة؟». اتنين شكلهم واحد بس كل واحد اتعمل لوحده = مختلفين.

ده اللي اسمه **referential equality**.

---

## ٢. الـ components الملفوفة

~~~text المثال
const MemoWithObject = memo(function MemoWithObject({ style }: { style: { color: string } }) {
  return <p style={style}>obj</p>
})
~~~

- [[memo(...)]]: بياخد component ويرجّع component جديد بيفتكر آخر props. قبل أي render بيقارنهم، ولو كله زي ما هو بيرجّع آخر ناتج من غير ما ينادي الدالة.
- [[function MemoWithObject]]: دالة ليها اسم (مش arrow مجهولة)، عشان الاسم يظهر في React DevTools.
- [[{ style }: { style: { color: string } }]]: prop واحدة اسمها [[style]]، نوعها object فيه [[color]] نص.
- [[style={style}]]: الـ [[style]] في JSX بياخد object (مش نص CSS).

~~~text المثال
const MemoWithFn = memo(function MemoWithFn({ onPick }: { onPick: () => void }) {
  return <button onClick={onPick}>pick</button>
})
~~~

- [[() => void]]: نوع «دالة مبتاخدش حاجة ومبترجعش حاجة».

## ٣. الحاجات الثابتة

~~~text المثال
const RED = { color: 'red' }
~~~

متعرّف **برا** أي component، فبيتعمل مرة واحدة لما الملف يتحمّل، ومرجعه ثابت للأبد.

~~~text المثال
const onPick = useCallback(() => console.log('pick'), [])
~~~

- [[useCallback(fn, deps)]]: بيرجّع نفس الدالة في كل render طول ما الـ deps زي ما هي.
- [[[]]]: مفيش deps، فالدالة بتتعمل مرة واحدة وبتفضل هي هي.

## ٤. الأربع نسخ

~~~text المثال
<MemoWithObject style={{ color: 'red' }} />
<MemoWithObject style={RED} />
<MemoWithFn onPick={onPick} />
<MemoWithFn onPick={() => console.log('pick')} />
~~~

| السطر | الـ prop في كل render | الـ memo |
|---|---|---|
| [[style={{ color: 'red' }}]] | object جديد (القوس الخارجي للـ JSX، والداخلي object) | بيرسم |
| [[style={RED}]] | نفس الـ object | بيتخطى |
| [[onPick={onPick}]] | نفس الدالة من useCallback | بيتخطى |
| [[onPick={() => ...}]] | arrow جديدة | بيرسم |

---

## ٥. اللي حصل

~~~text الـ Console
render MemoWithObject inline
render MemoWithObject RED
render MemoWithFn useCallback
render MemoWithFn arrow
>> click count 0
render MemoWithObject inline
render MemoWithFn arrow
>> click count 1
render MemoWithObject inline
render MemoWithFn arrow
~~~

- أول ٤ سطور: الـ mount، كله بيترسم.
- مع كل دوسة: اتنين بس، اللي واخد object مكتوب في الـ JSX ([[inline]]) واللي واخد arrow. التانيين اتخطوا.
- [[style === RED ? 'RED' : 'inline']] في الـ solCode: بتقارن المرجع بـ [[===]] (زي Object.is هنا) عشان نعرف أنهي نسخة اللي بتطبع.

### نفس الكود بـ React Compiler

~~~text الـ Console (بالـ compiler)
>> click count 0
>> click count 1
~~~

ولا render: الـ compiler ثبّت الـ object والـ arrow لوحده (درس «React Compiler»).

---

## الخلاصة

- [[memo]] = مقارنة shallow لكل prop بـ [[Object.is]]، مش بيدخل جوه الـ objects.
- أي [[{...}]] أو [[[...]]] أو [[() => ...]] مكتوبة في الـ JSX = prop جديدة كل render = الـ memo بيرسم برضه.
- ثبّت المرجع: برا الـ component، أو [[useMemo]] / [[useCallback]]، أو state. أو سيب React Compiler يعملها.
- [[children]] prop برضه، و context بيعدّي الـ memo.`,
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

ولو شغّلت نفس الكود بـ React Compiler، الاتنين دول كمان هيتخطوا، لأن الـ compiler بيثبّت الـ object والـ arrow لوحده.`,
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
          teach: R`## الفكرة: نفس الكود، والـ build بيضيف الـ memo

المثال ٣ حتت: إعداد Vite عشان الـ compiler يشتغل، و component مكتوب عادي من غير أي memo، و component مستثنى بـ [['use no memo']]. اتجرّب في مشروع Vite 8.3 + React 19.3 + [[@vitejs/plugin-react]] 6.1 + [[babel-plugin-react-compiler]] 1.0، في Chrome headless، مرة من غير الـ compiler ومرة بيه.

---

## ١. التسطيب

~~~bash
npm i -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler
~~~

- [[npm i]] اختصار [[npm install]]، و [[-D]] يعني devDependency: محتاجينه وقت الـ build بس، مش جوه الكود اللي بيوصل للمتصفح.
- [[babel-plugin-react-compiler]]: الـ compiler نفسه، مكتوب كـ plugin لـ Babel (أداة بتقرا JavaScript وتحوّله لـ JavaScript تاني).
- [[@babel/core]]: Babel نفسه.
- [[@rolldown/plugin-babel]]: Vite 8 بيستخدم Rolldown (bundler مكتوب بـ Rust) ومبيشغّلش Babel لوحده، فده plugin بيشغّل Babel جواه.

## ٢. [[vite.config.ts]]

~~~text vite.config.ts
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
export default defineConfig({ plugins: [react(), babel({ presets: [reactCompilerPreset()] })] })
~~~

- [[import react, { reactCompilerPreset }]]: من نفس الـ package حاجتين: الـ default export (الـ plugin العادي، سمّيناه [[react]]) واسم تاني بين [[{ }]] هو [[reactCompilerPreset]].
- [[react()]]: الـ plugin العادي بتاع React (JSX و Fast Refresh).
- [[reactCompilerPreset()]]: preset (مجموعة إعدادات Babel جاهزة) فيها الـ compiler، ومتظبطة إنها تشتغل على ملفات React بس.
- [[babel({ presets: [...] })]]: شغّل Babel بالـ preset ده.

بعد أي تغيير في الـ config لازم تقفل [[npm run dev]] وتشغّله تاني.

و [[// next.config.ts: const nextConfig = { reactCompiler: true }]]: في Next.js مفيش الكلام ده كله، سطر واحد في الإعدادات (لسه محتاج تسطّب [[babel-plugin-react-compiler]]، من الـ docs).

---

## ٣. component عادي

~~~text المثال
function ProductsPage({ products, query }: { products: Product[]; query: string }) {
  const visible = products.filter(p => p.name.includes(query))
  const handleAdd = (id: string) => addToCart(id)
  return <ProductGrid items={visible} onAdd={handleAdd} />
}
~~~

- [[Product[]]]: array من [[Product]] (نوع عرّفناه [[{ id: string; name: string }]]).
- [[products.filter(p => ...)]]: array جديد فيه المنتجات اللي اسمها فيه [[query]]. من غير compiler ده array جديد كل render.
- [[handleAdd]]: arrow جديدة كل render.
- [[<ProductGrid items={visible} onAdd={handleAdd} />]]: يعني من غير compiler، ProductGrid بياخد props جديدة كل مرة، وحتى لو لفّيته في [[memo]] هيترسم.

### الـ compiler طلّع إيه؟

ده الكود اللي Vite بعته للمتصفح فعلًا لـ ProductsPage (شلنا سطور الـ debug بتاعة التطوير):

~~~text ProductsPage بعد الـ compile
const $ = _c(8);
const { products, query } = t0;
let t1;
if ($[1] !== products || $[2] !== query) {
  ...
  t1 = products.filter(t2);
  $[1] = products;
  $[2] = query;
  $[3] = t1;
} else {
  t1 = $[3];
}
const visible = t1;
const handleAdd = _temp;
let t2;
if ($[6] !== visible) {
  t2 = _jsxDEV(ProductGrid, { items: visible, onAdd: handleAdd });
  $[6] = visible;
  $[7] = t2;
} else {
  t2 = $[7];
}
return t2;
~~~

- [[_c(8)]]: من [[react/compiler-runtime]]، بيدّي الـ component array صغير ([[$]]) فيه ٨ خانات بيفضل موجود بين الـ renders. ده الكاش.
- [[if ($[1] !== products || $[2] !== query)]]: لو [[products]] أو [[query]] اتغيروا عن آخر مرة ([[||]] = «أو»)، احسب الفلتر من جديد واحفظه. غير كده خد [[$[3]]] القديم. ده زي [[useMemo]] بالظبط، من غير ما تكتبه.
- [[const handleAdd = _temp]]: الدالة مبتعتمدش على أي حاجة من الـ component، فالـ compiler طلّعها برا خالص كدالة واحدة ثابتة.
- [[if ($[6] !== visible)]]: حتى عنصر JSX نفسه بيتحفظ. لو [[visible]] زي ما هي، بيرجّع نفس الـ object، و React لما بتلاقي نفس العنصر بتتخطى رسم ProductGrid.

### التجربة

ProductGrid فيه [[console.log('render ProductGrid', items.length)]]، والأب فيه زرار count (مالوش دعوة بالمنتجات) وزرار بيغيّر [[query]]:

| الدوسة | من غير compiler | بالـ compiler |
|---|---|---|
| count (مرتين) | [[render ProductGrid 2]] مع كل دوسة | ولا سطر |
| query | [[render ProductGrid 1]] | [[render ProductGrid 1]] |

لما [[query]] اتغيرت فعلًا، الاتنين رسموا (الفلتر لازم يتعاد). لما حاجة مش ليها علاقة اتغيرت، الـ compiler منع الـ render. ونفس الكلام في درس «إمتى بيعيد الرسم»: بالـ compiler دوسة count مرسمتش غير Parent.

---

## ٤. [['use no memo']]

~~~text المثال
function LegacyWidget() {
  'use no memo'
  return <div ref={legacyRef} />
}
~~~

- [['use no memo']]: نص لوحده أول سطر في الدالة (directive، زي [['use client']]). الـ compiler بيشوفه ويسيب الدالة زي ما هي.

وده فعلًا اللي طلع في الكود المبعوت: [[function LegacyWidget() { "use no memo"; return _jsxDEV("div", { ref: legacyRef }) }]] من غير [[_c]] خالص. استخدمه مؤقتًا لـ component بيبوظ مع الـ compiler لحد ما تصلّحه.

---

## ٥. الـ solCode: قواعد eslint

~~~bash
npm i -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler eslint-plugin-react-hooks@latest
~~~

[[@latest]] بعد اسم الـ package: هات آخر نسخة (اتسطّب 7.1.1).

~~~text eslint.config.js
import reactHooks from 'eslint-plugin-react-hooks'
export default [
  reactHooks.configs.flat.recommended,
]
~~~

- [[eslint.config.js]]: ملف إعدادات ESLint الجديد (flat config): array كل عنصر فيه مجموعة إعدادات.
- [[reactHooks.configs.flat.recommended]]: القواعد الموصى بيها. في 7.1.1 فيها [[rules-of-hooks]] و [[exhaustive-deps]] القديمين، وجنبهم قواعد الـ compiler: [[purity]] و [[refs]] و [[immutability]] و [[set-state-in-render]] و [[static-components]] وغيرهم.

جرّبناها على component فيه كسر لقواعد React:

~~~text Bad.jsx
const renders = useRef(0)
renders.current++
const id = Math.random()
return <p id={id}>{renders.current}</p>
~~~

~~~text الناتج (eslint)
4:3   error  Error: Cannot access refs during render        react-hooks/refs
6:14  error  Error: Cannot call impure function during render  react-hooks/purity
7:22  error  Error: Cannot access refs during render        react-hooks/refs
✖ 4 problems (4 errors, 0 warnings)
~~~

- [[4:3]] يعني سطر ٤، عمود ٣.
- [[refs]]: قرايتك أو كتابتك لـ [[ref.current]] وقت الرسم (سطر ٤ طلع مرتين: مرة للقراية ومرة للكتابة، فبقوا ٤ مشاكل).
- [[purity]]: [[Math.random()]] بيطلّع رقم مختلف كل render، والـ component المفروض يطلّع نفس الناتج لنفس الـ props.

الـ components اللي فيها حاجات زي دي هي اللي الـ compiler بيتخطاها، فصلّحها الأول.

---

## الخلاصة

| | من غير compiler | بالـ compiler |
|---|---|---|
| حساب في الـ render | كل مرة، إلا لو [[useMemo]] | محفوظ لحد ما الـ inputs تتغير |
| object و arrow في الـ JSX | جديد كل مرة | نفس المرجع |
| عنصر JSX لـ child | جديد كل مرة | نفسه، فالـ child بيتخطى |
| component بيكسر القواعد | شغال | بيتساب زي ما هو |

- Vite 8: [[babel({ presets: [reactCompilerPreset()] })]] جنب [[react()]]. Next.js: [[reactCompiler: true]].
- [['use no memo']] استثناء مؤقت.
- قواعد [[eslint-plugin-react-hooks]] بتقولك إيه اللي مانع الـ compiler.`,
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
          teach: R`## الفكرة: قيس بالرقم قبل ما تصلّح

المثال بيلف جزء من الصفحة في [[<Profiler>]]، و React بتنادي دالة [[onRender]] بعد كل commit للجزء ده ومعاها الوقت اللي أخده. لو أطول من 16ms بنطبع تحذير. والـ solCode صفحة بطيئة عن قصد (٢٠٠٠ عنصر بيتفلتروا مع كل حرف) عشان نقيسها.

اتشغّل في Vite 8.3 + React 19.3 (وضع التطوير) في Chrome headless: حطينا [[SlowSearch]] مكان [[ProductsGrid]]، وكتبنا [[uct 1]] حرف حرف بـ Playwright، مرة بسرعة الجهاز العادية ومرة بـ CPU throttling 4x.

---

## ١. الـ import

~~~text المثال
import { Profiler, type ProfilerOnRenderCallback } from 'react'
~~~

- [[Profiler]]: component جاهز من React.
- [[type ProfilerOnRenderCallback]]: كلمة [[type]] قبل الاسم معناها «ده نوع TypeScript بس»، فبيتشال من الكود اللي بيتبعت للمتصفح. النوع ده بيوصف شكل دالة [[onRender]].

## ٢. دالة [[onRender]]

~~~text المثال
const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration) => {
  if (actualDuration > 16) console.warn($__bt[$__{id}] $__{phase} took $__{actualDuration.toFixed(1)}ms (full tree $__{baseDuration.toFixed(1)}ms)$__bt)
}
~~~

- [[: ProfilerOnRenderCallback]]: بنقول لـ TypeScript إن الدالة دي من النوع ده، فهو يعرف أنواع الـ parameters لوحده من غير ما نكتبها.
- الـ parameters بالترتيب (React بتبعتهم كده):

| الاسم | معناه |
|---|---|
| [[id]] | الاسم اللي ادّيته للـ Profiler ([["ProductsGrid"]]) |
| [[phase]] | [["mount"]] أول مرة، [["update"]] أي render بعد كده، [["nested-update"]] لو update حصل جوه effect |
| [[actualDuration]] | الوقت الفعلي بالميلي ثانية للـ render ده (بعد ما memo اتخطى اللي اتخطاه) |
| [[baseDuration]] | تقدير: لو كل اللي تحت الـ Profiler اترسم من غير أي memo هياخد قد إيه |

- [[> 16]]: الشاشة بـ 60 frame في الثانية، يعني 1000 ÷ 60 ≈ 16.7ms لكل frame. أي render أطول من كده المتصفح مش هيلحق يرسم frame في ميعاده، فبيبان تقطيع.
- [[console.warn]]: زي [[console.log]] بس بيظهر أصفر كتحذير.
- النص بين backticks ده template literal: [[$__{...}]] جواه بيحط قيمة. [[toFixed(1)]] بيقرّب الرقم لرقم عشري واحد ويحوّله نص ([[35.912]] تبقى [["35.9"]]).

## ٣. الـ Profiler نفسه

~~~text المثال
<Profiler id="ProductsGrid" onRender={onRender}>
  <ProductsGrid />
</Profiler>
~~~

- [[id]]: اسم يفرّق بين أكتر من Profiler في الصفحة.
- [[onRender]]: الدالة اللي فوق. كل اللي جوه الـ Profiler بيتقاس، واللي برا لأ.
- مبيرسمش أي حاجة زيادة في الـ DOM.

---

## ٤. الصفحة البطيئة (الـ solCode)

~~~text solCode
const ITEMS = Array.from({ length: 2000 }, (_, i) => $__btProduct $__{i}$__bt)
~~~

- [[Array.from({ length: 2000 }, fn)]]: اعمل array من ٢٠٠٠ عنصر، وكل عنصر هو ناتج [[fn]].
- [[(_, i) => ...]]: الـ parameter الأول (القيمة، وهي فاضية هنا) مش محتاجينه فسمّيناه [[_]]، والتاني [[i]] رقم العنصر من 0 لـ 1999.
- الناتج: [["Product 0"]] و [["Product 1"]] ... [["Product 1999"]].

~~~text solCode
const [query, setQuery] = useState('')
const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
~~~

- [[toLowerCase()]] على الاتنين: عشان البحث ميفرقش بين capital و small.
- [[includes(query)]]: النص فيه [[query]] في أي مكان؟ ولما [[query]] فاضية، [[includes('')]] دايمًا [[true]]، فكل العناصر بتظهر.
- السطر ده بيتنفذ في **كل** render، مع كل حرف.

~~~text solCode
<input value={query} onChange={e => setQuery(e.target.value)} />
<ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
~~~

- controlled input: كل حرف بيعمل [[setQuery]]، فالـ component كله بيعيد الرسم، ومعاه كل الـ [[<li>]].
- [[key={item}]]: كل نص فريد، فينفع يبقى key.

---

## ٥. اللي حصل

~~~text الـ Console (سرعة عادية)
[ProductsGrid] mount took 31.9ms (full tree 22.2ms)
>> type u
[ProductsGrid] update took 30.1ms (full tree 28.8ms)
>> type c
[ProductsGrid] update took 27.1ms (full tree 26.3ms)
>> type t
[ProductsGrid] update took 23.9ms (full tree 21.4ms)
>> type (مسافة)
[ProductsGrid] update took 19.7ms (full tree 19.2ms)
>> type 1
li count: 1111
~~~

- أول ٤ حروف ([[u]] و [[uc]] و [[uct]] و [[uct ]]) كل الـ ٢٠٠٠ عنصر لسه مطابقين، فكل حرف بيرسم ٢٠٠٠ [[<li>]] من جديد: ٢٠-٣٠ms، أطول من frame.
- [[uct 1]] فلترت لـ ١١١١ عنصر ([[Product 1]] و [[Product 10]] ... وكل اللي بيبدأ بـ 1)، والـ render بقى أقل من 16ms فمفيش تحذير.
- [[actualDuration]] و [[baseDuration]] قريبين من بعض لأن مفيش ولا memo: كل حاجة بتترسم فعلًا.

~~~text الـ Console (CPU throttling 4x)
[ProductsGrid] mount took 260.2ms (full tree 172.4ms)
>> type u
[ProductsGrid] update took 207.8ms (full tree 202.6ms)
>> type c
[ProductsGrid] update took 159.3ms (full tree 156.0ms)
>> type t
[ProductsGrid] update took 123.9ms (full tree 122.0ms)
>> type (مسافة)
[ProductsGrid] update took 136.0ms (full tree 133.9ms)
>> type 1
[ProductsGrid] update took 60.6ms (full tree 60.0ms)
~~~

نفس الكود على جهاز «أبطأ ٤ مرات» (اللي Chrome بيعمله بـ throttling): الأرقام كبرت أضعاف، وكل حرف بقى بياخد أكتر من عُشر ثانية، وده المستخدم بيحسه تهنيج. ده سبب إنك تقيس بـ throttling: جهازك أسرع من جهاز المستخدم.

### وفي الـ build بتاع الإنتاج؟

عملنا [[vite build]] وفتحنا الناتج بـ [[vite preview]] وكتبنا نفس الحروف: ولا سطر. [[onRender]] مبيتناداش في الـ build العادي للإنتاج، محتاج build خاص بالـ profiling (من الـ docs: [[react-dom/profiling]]). فالـ Profiler ده أداة تطوير.

---

## ٦. التعليقين في الآخر

- [[⚙ > Profiler > Record why each component rendered]]: في React DevTools (إضافة المتصفح)، الإعداد ده بيخلي الـ Profiler يكتب جنب كل component سبب الـ render (prop اتغيرت، أو hook، أو الأب).
- React Performance Tracks: من React 19.2، في وضع التطوير، تاب Performance في Chrome بيعرض الـ renders والـ effects كسطور على نفس الـ timeline (من الـ docs).

---

## الخلاصة

| الأداة | بتقولك إيه |
|---|---|
| DevTools Profiler (flamegraph) | كل commit: مين اترسم، وقد إيه، وليه |
| Highlight updates | مين بيترسم وانت شغال، بلون على الشاشة |
| [[<Profiler onRender>]] | نفس الأرقام من الكود: [[phase]] و [[actualDuration]] و [[baseDuration]] |
| CPU throttling | الأرقام على جهاز أبطأ |

- 16ms = frame واحد على 60fps. أطول من كده = تقطيع.
- [[actualDuration]] قريب من [[baseDuration]] = مفيش memo بيوفّر حاجة.
- قيس قبل وبعد أي تحسين، وعلى جهاز أبطأ من جهازك.`,
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
          sol: R`في الـ recording هتلاقي commit لكل حرف تقريبًا. الأبطأ غالبًا فيه الـ list بالأصفر أو البرتقالي، و «Why did this render?» هيقول «Props changed: (query)» أو «The parent component rendered». ومع CPU throttling 4x الأرقام بتكبر أضعاف (في تجربتنا على ٢٠٠٠ عنصر: من ٢٠-٣٠ms للحرف لـ ١٢٠-٢٦٠ms)، وده أقرب لموبايل متوسط.

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
          teach: R`## الفكرة: الخانة عاجلة، والـ list تستنى

[[SearchPage]] خانة بحث بتفلتر list تقيلة. بدل ما الـ list تترسم مع كل حرف قبل ما الحرف نفسه يظهر، بنديها نسخة «متأخرة» من النص ([[deferredQuery]])، فالخانة بتتحدث فورًا والـ list بتلحق بعدين. و [[Tabs]] نفس الفكرة من ناحية الـ setState بـ [[useTransition]].

اتشغّل في Vite 8.3 + React 19.3 (وضع التطوير) في Chrome headless: [[ITEMS]] ٢٠٠٠ عنصر، وكل [[<li>]] هو [[SlowItem]] من الـ solCode (بياخد 0.2ms عن قصد، يعني الـ list كلها حوالي ٤٠٠ms). كتبنا [[duct]] بـ Playwright (حرف كل 30ms، وكل الـ ٢٠٠٠ عنصر فيهم [[duct]] فالـ list مبتصغرش) بتلات طرق: من غير تأجيل، وبالمثال زي ما هو، وبالتأجيل من غير [[memo]].

---

## ١. الـ import

~~~text المثال
import { memo, useDeferredValue, useState, useTransition } from 'react'
~~~

كل حاجة من [[react]] نفسها، مفيش مكتبة.

## ٢. الجزء التقيل ملفوف في memo

~~~text المثال
const Results = memo(function Results({ query }: { query: string }) {
  const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  return <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
})
~~~

- نفس الفلترة بتاعة درس Profiler، بس في component لوحده بياخد [[query]] كـ prop.
- [[memo]] هنا **شرط**: هتشوف تحت ليه.

## ٣. القيمتين

~~~text المثال
const [query, setQuery] = useState('')
const deferredQuery = useDeferredValue(query)
const isStale = query !== deferredQuery
~~~

- [[query]]: النص الحقيقي، بيتحدث مع كل حرف.
- [[useDeferredValue(query)]]: بيرجّع نسخة من [[query]] «متأخرة». لما [[query]] تتغير، React بترسم الأول والنسخة دي لسه بالقيمة القديمة (render سريع)، وبعدين ترسم render تاني في الخلفية بالقيمة الجديدة. ولو جه حرف جديد والـ render اللي في الخلفية لسه مخلصش، React بترميه وتبدأ بالجديد.
- [[isStale]]: [[!==]] يعني «مش متساويين». لو مختلفين، يبقى اللي معروض في الـ list قديم.

## ٤. الـ JSX

~~~text المثال
<input aria-label="Search" value={query} onChange={e => setQuery(e.target.value)} />
<div style={{ opacity: isStale ? 0.5 : 1 }}><Results query={deferredQuery} /></div>
~~~

- [[aria-label="Search"]]: اسم للخانة يقراه قارئ الشاشة (ومنه بنلاقيها في الاختبارات).
- الخانة بتاخد [[query]] (عاجلة)، و [[Results]] بياخد [[deferredQuery]] (متأخرة).
- [[isStale ? 0.5 : 1]]: ternary، «لو قديمة خليها باهتة نص شفافية، غير كده عادي». [[opacity]] من 0 (مختفي) لـ 1 (ظاهر خالص).

### ليه الـ memo شرط؟

مع كل حرف، [[SearchPage]] بيعيد الرسم (الـ state بتاعته اتغيرت). في الـ render العاجل ده [[deferredQuery]] لسه القديمة، فـ [[Results]] بياخد نفس الـ prop. [[memo]] بيشوف ده ويتخطاه، فالـ render العاجل بياخد ميلي ثواني. من غير memo، Results هيترسم في الـ render العاجل كابن للأب، والـ ٤٠٠ms راجعة.

---

## ٥. البطء المقصود (الـ solCode)

~~~text solCode
function SlowItem({ text }: { text: string }) {
  const start = performance.now()
  while (performance.now() - start < 0.2) { /* بطء مقصود للتجربة */ }
  return <li>{text}</li>
}
~~~

- [[performance.now()]]: الوقت بالميلي ثانية بدقة عالية.
- [[while (...) {}]]: لفة فاضية لحد ما يعدّي 0.2ms. ده بيحاكي component تقيل، والمتصفح مش بيقدر يعمل أي حاجة تانية وهي شغالة.
- [[/* ... */]]: تعليق جوه السطر.
- و [[Results]] في الـ solCode بيرسم [[<SlowItem key={item} text={item} />]] بدل [[<li>]].

---

## ٦. اللي حصل

قسنا لكل حرف الوقت من الـ [[input]] event لحد أول frame بعده (يعني الحرف بان امتى):

| الطريقة | وقت كل حرف لحد ما يبان | الكتابة كلها (٤ حروف) | renders لـ Results |
|---|---|---|---|
| من غير تأجيل ([[query]] للـ list) | 542 و 541 و 537 و 542 ms | 2294ms | 4 |
| المثال ([[deferredQuery]] + [[memo]]) | 37 و 27 و 30 و 38 ms | 222ms | 4 بدأوا، واحد بس اتعرض |
| [[deferredQuery]] من غير [[memo]] | 547 و 536 و 542 و 538 ms | 2310ms | 8 |

وتتبعنا الـ list اتعرضت إمتى (النص في الخانة، وعدد الـ [[li]]، والـ opacity):

~~~text الناتج (المثال)
["d",2000,"0.5"]
["duct",2000,"1"]
~~~

- من غير تأجيل: كل حرف استنى الـ list كلها (نص ثانية) قبل ما يظهر. الكيبورد «بيهنّج».
- بالمثال: الحروف ظهرت في حوالي 30ms. الـ list بقت باهتة بعد أول حرف، ومظهرتش النتايج الوسطانية ([[du]] و [[duc]])، ونطت على طول لـ [[duct]] لما المستخدم وقف. الـ renders اللي في الخلفية بتاعة [[du]] و [[duc]] بدأت واترمت.
- من غير memo: التأجيل شغال (الـ list نطت برضه)، بس كل حرف رسم Results مرتين (عاجل + خلفية = 8)، والعاجل لوحده ٥٠٠ms. يعني ولا فرق للمستخدم.

---

## ٧. [[useTransition]]

~~~text المثال
const [tab, setTab] = useState<'home' | 'reports'>('home')
const [isPending, startTransition] = useTransition()
return <button onClick={() => startTransition(() => setTab('reports'))}>Reports {isPending && '…'}</button>
~~~

- [[useState<'home' | 'reports'>]]: النوع union: القيمة يا [['home']] يا [['reports']] بس.
- [[useTransition()]] بيرجّع حاجتين: [[isPending]] (true وفيه transition شغال) و [[startTransition]].
- [[startTransition(() => setTab('reports'))]]: أي setState جوه الدالة دي بيتعلّم «مش عاجل».
- [[{isPending && '…'}]]: لو [[isPending]] بـ true اعرض [['…']]، لو false مبيترسمش حاجة.

رسمنا تحت الزرار محتوى التاب، وتاب Reports بياخد 300ms. سجّلنا الصفحة بعد الدوسة:

~~~text الناتج
3ms    Reports …  | home
307ms  Reports    | reports ready
~~~

بعد 3ms الزرار بقى «Reports …» والتاب القديم ([[home]]) لسه ظاهر، وبعد ما الـ render التقيل خلص التاب الجديد ظهر والنقط اختفت. المستخدم شاف رد فعل فوري بدل شاشة واقفة.

---

## الخلاصة

| | [[useDeferredValue(value)]] | [[useTransition()]] |
|---|---|---|
| بتستخدمه لما | القيمة جاية لك (prop أو state) | انت اللي بتنادي setState |
| بيرجّع | نسخة متأخرة من القيمة | [[isPending]] و [[startTransition]] |
| تعرف إنه شغال بـ | [[value !== deferred]] | [[isPending]] |

- الجزء التقيل لازم يتخطى الـ render العاجل: [[memo]] (أو React Compiler).
- مبيسرّعوش الحساب: بيخلوه ميوقفش الكتابة والدوس. والـ input نفسه دايمًا عاجل.`,
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
          teach: R`## الفكرة: ١٠٠٠٠ صف في البيانات، وعشرات بس في الـ DOM

[[VirtualList]] صندوق ارتفاعه 480px بيعمل scroll. جواه div فاضي طوله طول الـ list كلها (عشان الـ scrollbar)، وفوقه بنرسم بس الصفوف اللي في مكان الـ scroll دلوقتي، كل واحد في مكانه بالبكسل. [[useVirtualizer]] هو اللي بيحسب «مين ظاهر وفين».

اتشغّل في Vite 8.3 + React 19.3 + [[@tanstack/react-virtual]] 3.14 في Chrome headless، بـ ١٠٠٠٠ صف من الـ solCode، وقارناه بـ [[map]] عادي على نفس الصفوف.

---

## ١. الـ imports والـ ref

~~~text المثال
import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualList({ rows }: { rows: { id: string; name: string }[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
~~~

- [[@tanstack/react-virtual]]: المكتبة ([[npm i @tanstack/react-virtual]]).
- [[{ id: string; name: string }[]]]: array من objects، كل واحد فيه [[id]] و [[name]].
- [[parentRef]]: ref هيمسك الـ div اللي بيعمل scroll، عشان الـ virtualizer يقرا منه [[scrollTop]] (نزلنا قد إيه) و [[clientHeight]] (ارتفاعه الظاهر).

## ٢. الـ virtualizer

~~~text المثال
const virtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 48,
  overscan: 5,
})
~~~

| الخيار | معناه |
|---|---|
| [[count]] | كام عنصر في الـ list كلها (١٠٠٠٠). مش محتاج البيانات نفسها، العدد بس |
| [[getScrollElement]] | دالة بترجّع العنصر اللي بيعمل scroll. دالة مش قيمة، لأن [[parentRef.current]] بيبقى [[null]] في أول render |
| [[estimateSize]] | ارتفاع تقديري لكل صف بالبكسل (48)، لحد ما يتقاس الحقيقي |
| [[overscan]] | ارسم ٥ صفوف زيادة فوق وتحت الجزء الظاهر، عشان مفيش فراغ يبان وانت بتعمل scroll بسرعة |

## ٣. الصندوق والـ div الطويل

~~~text المثال
<div ref={parentRef} style={{ height: 480, overflow: 'auto' }}>
  <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
~~~

- [[height: 480]]: رقم من غير وحدة في [[style]] React بتعتبره px.
- [[overflow: 'auto']]: لو المحتوى أطول من 480، اعمل scrollbar. من غيره مفيش scroll أصلًا.
- [[getTotalSize()]]: مجموع ارتفاع كل الصفوف (المتقاس منها والمقدّر). ١٠٠٠٠ × 48 = 480000px في الأول. الـ div ده فاضي تقريبًا، بس طوله بيخلي الـ scrollbar صح.
- [[position: 'relative']]: عشان الصفوف اللي جواه [[absolute]] تتحسب مواقعها منه.

## ٤. الصفوف الظاهرة بس

~~~text المثال
{virtualizer.getVirtualItems().map(item => (
  <div key={rows[item.index].id} data-index={item.index} ref={virtualizer.measureElement}
    style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: '100%', transform: $__bttranslateY($__{item.start}px)$__bt }}>
    {rows[item.index].name}
  </div>
))}
~~~

- [[getVirtualItems()]]: array فيه الصفوف اللي المفروض تترسم دلوقتي بس. كل [[item]] فيه [[index]] (رقمه في الـ list الأصلية) و [[start]] (مكانه من فوق بالبكسل) و [[size]].
- [[rows[item.index]]]: نجيب بيانات الصف من الـ array الأصلي برقمه.
- [[key={rows[item.index].id}]]: الـ key من البيانات نفسها مش من الـ index.
- [[data-index={item.index}]]: attribute بيقول للـ virtualizer الـ div ده رقم كام، عشان لما يقيسه يعرف يحط الرقم فين. ([[data-]] أي attribute بتاعك على عنصر HTML.)
- [[ref={virtualizer.measureElement}]]: callback ref: React بتناديه بالعنصر بعد ما يترسم، والـ virtualizer بيقيس ارتفاعه الحقيقي ويصحح المواقع.
- [[position: 'absolute', top: 0]]: كل الصفوف فوق بعض في أول الـ div...
- [[transform: translateY(...px)]]: ...وبعدين كل واحد ينزل لمكانه. [[translateY]] = حرّك على المحور الرأسي.
- [[insetInlineStart: 0]]: زي [[left: 0]] في الإنجليزي و [[right: 0]] في العربي (RTL) لوحده.

---

## ٥. اللي حصل

[[map]] عادي على الـ ١٠٠٠٠ صف (كل صف div ارتفاعه 48) مقابل [[VirtualList]]:

~~~text الناتج (Chrome)
== map عادي    (load 502ms) rows 10000, divs in page 10002
== VirtualList (load 273ms) rows 32, first "Row 0", last "Row 31", divs in page 35
   scroll لآخر الـ list:     rows 32, first "Row 9968", last "Row 9999", transform "translateY(477504px)"
   scrollTop = 240000:      rows 37, first "Row 5015", last "Row 5051"
~~~

- الـ map العادي: ١٠٠٠٠ عنصر في الـ DOM، ونفس العدد في أي مكان في الـ list.
- الـ VirtualList: ٣٢ لـ ٣٧ عنصر بس، والرقم ثابت فوق وتحت ونص.

### ليه ٣٢ مش ٢٠؟

الصفوف هنا فيها نص بس، فارتفاعها الحقيقي 18px مش 48. [[measureElement]] قاسها (الصف التاني بقى [[translateY(18px)]] مش 48)، فـ 480px بقت تشيل حوالي ٢٧ صف + الـ overscan. ولما خلينا ارتفاع كل صف 48px فعلًا:

~~~text الناتج (صفوف 48px)
أول الـ list:           rows 15, "Row 0" .. "Row 14"
scrollTop = 240000:     rows 20, "Row 4995" .. "Row 5014"
~~~

- فوق خالص: ١٠ ظاهرين (480 ÷ 48) + ٥ overscan تحت بس (مفيش حاجة فوق).
- في النص: ١٠ + ٥ فوق + ٥ تحت = ٢٠.
- و [[scrollHeight]] = 480000 بالظبط، لأن التقدير طلع صح.

### وفي Vitest؟

رسمنا نفس الـ component بـ Testing Library في jsdom: [[div[data-index]]] عددهم **0**. jsdom مبيحسبش layout (كل الأحجام صفر)، فالـ virtualizer شايف صندوق ارتفاعه صفر ومبيرسمش حاجة. الـ virtual lists بتتختبر في متصفح حقيقي.

---

## ٦. الـ solCode

~~~text solCode
const rows = Array.from({ length: 10000 }, (_, i) => ({ id: String(i), name: $__btRow $__{i}$__bt }))
~~~

- [[Array.from({ length: 10000 }, fn)]]: array من ١٠٠٠٠ عنصر، كل واحد ناتج [[fn]].
- [[(_, i) => ({ ... })]]: القوسين حوالين الـ object ضروريين، من غيرهم الـ [[{]] بتتفهم بداية جسم دالة.
- [[String(i)]]: الرقم كنص ([["0"]] و [["1"]]...).
- الـ array متعرّفة **برا** الـ component، فبتتعمل مرة واحدة.

[[document.querySelectorAll('div[data-index]').length]] في الـ console: [[querySelectorAll]] بيرجّع كل العناصر اللي بتطابق الـ CSS selector، و [[div[data-index]]] يعني «أي div عليه attribute اسمه data-index».

---

## الخلاصة

| الحتة | ليه |
|---|---|
| صندوق [[height]] + [[overflow: auto]] | من غيره مفيش scroll، فمفيش virtualization |
| div بـ [[getTotalSize()]] | الـ scrollbar يعبّر عن الـ list كلها |
| [[getVirtualItems()]] | الصفوف الظاهرة + overscan بس |
| [[absolute]] + [[translateY(start)]] | كل صف في مكانه الحقيقي |
| [[measureElement]] + [[data-index]] | يقيس الارتفاع الحقيقي لو مختلف عن التقدير |

- عدد العناصر في الـ DOM ثابت تقريبًا مهما كانت الـ list طويلة.
- اختبرها في متصفح، مش jsdom.`,
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
          sol: R`بـ map عادي: Elements فيها ١٠٠٠٠ صف، وأول render بياخد مئات الـ ms (في Performance هتلاقي task طويلة بالأحمر). بالـ VirtualList: عشرات الصفوف بس، والرقم ده ثابت تقريبًا حتى وانت في آخر الـ list. لو الصف ارتفاعه 48px فعلًا: ١٥ صف فوق (١٠ ظاهرين في 480px و ٥ overscan تحت) و ٢٠ في النص (٥ زيادة من كل ناحية)، والـ scrollbar بيعبّر عن ٤٨٠ ألف بكسل. ولو الصف نص بس (حوالي 18px)، [[measureElement]] بيقيس الارتفاع الحقيقي فبيترسم حوالي ٣٢ لـ ٣٧ صف، والـ scrollbar بيصغر شوية مع كل قياس (متجرّب في Chrome).

لو مفيش صفوف خالص، الـ parent ملوش ارتفاع. ولو الصفوف فوق بعض، ناقص [[position: absolute]] أو الـ transform.

(الكود ده متجرّب في Chrome headless. في Vitest بـ jsdom نفس الـ component رسم ٠ صف، لأن jsdom مبيحسبش أحجام.)`,
          solCode: R`const rows = Array.from({ length: 10000 }, (_, i) => ({ id: String(i), name: $__btRow $__{i}$__bt }))

export default function App() {
  return <VirtualList rows={rows} />
}
// في الـ console:
// document.querySelectorAll('div[data-index]').length  // 15 لـ 20 لو الصف 48px، وأكتر لو الصفوف أقصر`
        }
      ]
    }
]);

// تكملة تاب projects: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/projects/01.js (شرح حقول الدرس في أوله)
MORE("projects", [
    {
      t: "مشروع ٢: تطبيق JavaScript بـ fetch و localStorage",
      l: 1,
      n: "كويز من غير frameworks: state واحد، وأربع حالات للداتا، وكيبورد، وتقدّم محفوظ، واختبارات",
      items: [
        {
          cmd: "مشروع ٢: الـ spec والـ state",
          title: "ترسم الـ state بتاع التطبيق قبل الشاشات إزاي؟",
          desc: R`المشروع: كويز «اختبر نفسك» بـ JavaScript عادي. الأسئلة جاية من [[questions.json]] بـ fetch، والإجابة بتظهر صح ولا غلط، وفي الآخر النتيجة. ولو قفلت الصفحة في النص ورجعت، بيكمّل من نفس السؤال. وأحسن نتيجة محفوظة. واختيار القسم من الـ URL: [[?cat=js]].

ليه مش todo app؟ الكويز فيه نفس الحاجات (fetch، و state، و events، و localStorage) بس فيه كمان حالات انتقال واضحة، وحاجة تتحفظ لها معنى.

المحطة دي: ارسم كل الحالات اللي التطبيق ممكن يبقى فيها، واكتب المنطق كدوال pure (مبتلمسش الـ DOM ولا الشبكة) في [[quiz.js]]. خلصت يعني: (١) الحالات مكتوبة: loading و error و empty و playing و done. (٢) [[start]] و [[answer]] و [[next]] و [[score]] بترجّع state جديد ومبتعدّلش القديم. (٣) اختبارات [[node --test]] للمنطق عدّت.

الدروس: [[UI = f(state)]] في تاب «React» (نفس الفكرة من غير React)، و [[immutability]] و [[object destructuring و spread]] في تاب «JavaScript»، و [[node --test]] في تاب «Node و npm».`,
          example: R`// الحالات: loading ← ثم error أو empty أو playing ← ثم done
let state = { status: 'loading' }
state = { status: 'error', error: 'HTTP 500' }
state = { status: 'empty', questions: [] }
state = { status: 'playing', questions, index: 0, answers: [] }
state = { status: 'done', questions, index: 2, answers: [1, 0, 1] }
function setState(next) { state = next; app.innerHTML = view(state) }`,
          try: R`اكتب [[quiz.js]] فيه: [[isQuestion(q)]] بترجّع true لو السؤال شكله سليم، و [[start(questions)]]، و [[answer(state, choice)]] (مبتغيّرش إجابة اتجاوبت)، و [[next(state)]] (مبتعدّيش سؤال من غير إجابة، وبعد آخر سؤال الحالة [[done]])، و [[score(state)]]. واكتب [[tests/quiz.test.js]] بـ [[node:test]] فيه ٥ اختبارات على الأقل، وشغّله بـ [[node --test]].`,
          flag: "script",
          deep: {
            why: R`أغلب كود JavaScript المبتدئ بيخزّن الحالة في الـ DOM نفسه: الزرار عليه class «selected»، والرقم مكتوب في span، ولما تحتاج تعرف السكور تقرا من الـ HTML. ده بيقع أول ما الشاشة تتعقد. لما الحالة في object واحد، والشاشة بتترسم منه، أي bug تقدر تشوفه بـ [[console.log(state)]]، وأي حاجة تقدر تختبرها من غير متصفح.`,
            how: R`[[status]] واحد بدل [[isLoading]] و [[hasError]] و [[isDone]] منفصلين. مع flags منفصلة ممكن توصل لحالة مستحيلة ([[isLoading: true]] و [[hasError: true]] مع بعض). مع [[status]] واحد، الحالات المستحيلة مش ممكن تتكتب أصلًا. ده نفس فكرة الـ discriminated unions في تاب «TypeScript».

الدوال pure: [[answer(state, 1)]] بترجّع object جديد بـ [[{ ...state, answers }]]، ومبتلمسش القديم. ليه؟ عشان [[setState]] تقدر تقارن القديم بالجديد (هتحتاجه لنقل الـ focus في المحطة التالتة)، وعشان الاختبارات تبقى سطرين.

[[setState]] هي المكان الوحيد اللي بيغيّر [[state]] وبيرسم. أي event handler بيحسب state جديد وينادي [[setState]]، ومبيلمسش الـ DOM بنفسه. ده الـ pattern اللي React بيعمله ليك في المشروع الرابع.

[[isQuestion]] موجودة لأن الداتا جاية من برّه (حتى لو ملف عندك). السؤال اللي [[answer]] بتاعه 5 وفيه ٣ اختيارات لازم يتشال قبل ما يوقّع التطبيق.`,
            when: R`قبل أي HTML أو DOM. ولو التطبيق صغير أوي (زرار واحد بيغيّر رقم)، مش محتاج كل ده، بس كويز أو فورم أو أي حاجة ليها أكتر من حالتين محتاجاه.`,
            mistakes: R`[[isLoading]] و [[error]] و [[questions]] كمتغيرات منفصلة، وتنسى تصفّر واحد فيهم. أو [[state.answers.push(i)]] (تعديل مباشر) فالمقارنة بين القديم والجديد تبوظ. أو المنطق جوه الـ click handler فمتقدرش تختبره من غير متصفح. أو تحسب السكور وتخزنه في الـ state بدل ما تحسبه من الإجابات (درس [[derived state]] في تاب «React»): النسختين بيختلفوا في أول bug.`
          },
          lines: [
            R`البداية: مفيش داتا لسه.`,
            R`الطلب فشل: بنخزن الرسالة عشان تتعرض.`,
            R`الطلب نجح بس مفيش أسئلة في القسم ده.`,
            R`بنلعب: الأسئلة، ورقم السؤال الحالي، والإجابات لحد دلوقتي.`,
            R`خلصنا: نفس الداتا، والسكور بيتحسب من [[answers]] مش بيتخزن.`,
            R`المكان الوحيد اللي بيغيّر الـ state وبيرسم الشاشة منه.`
          ],
          sol: R`الحل المرجعي تحت فيه [[quiz.js]] واختباراته. [[node --test tests/*.test.js]] بيطلّع [[# tests 6]] و [[# pass 6]] في أقل من ١٠٠ms، من غير متصفح.

لاحظ [[start(questions, saved)]]: بتاخد تقدّم محفوظ اختياري (هتستخدمه في محطة localStorage)، وبتكمّل منه بس لو الأسئلة هي هي ([[ids]] نفس الترتيب). لو ملف الأسئلة اتغير، التقدم القديم مالوش معنى.

أشهر غلط: [[answer]] بتسمح تغيّر الإجابة بعد ما اتعرضت صح ولا غلط، فالمستخدم يعرف الصح ويغيّر. الاختبار «answering twice does not change the first answer» بيمسكه. والغلط التاني: [[next]] من غير إجابة بتعدّي، فالسكور يتحسب على [[undefined]].`,
          solCode: R`// ── quiz.js ──
export function isQuestion(q) {
  return q && typeof q.id === 'string' && typeof q.q === 'string' && Array.isArray(q.choices)
    && q.choices.length >= 2 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length
}

export function start(questions, saved) {
  const status = questions.length ? 'playing' : 'empty'
  const sameSet = saved && saved.ids?.join() === questions.map(q => q.id).join()
  return sameSet
    ? { status, questions, index: saved.index, answers: saved.answers }
    : { status, questions, index: 0, answers: [] }
}

export function answer(state, choice) {
  if (state.status !== 'playing' || state.answers[state.index] !== undefined) return state
  const answers = [...state.answers]
  answers[state.index] = choice
  return { ...state, answers }
}

export function next(state) {
  if (state.answers[state.index] === undefined) return state
  const index = state.index + 1
  return index >= state.questions.length ? { ...state, status: 'done' } : { ...state, index }
}

export function score(state) {
  return state.answers.filter((a, i) => a === state.questions[i].answer).length
}

// ── tests/quiz.test.js ──
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { start, answer, next, score, isQuestion } from '../quiz.js'

const qs = [
  { id: 'a', q: '1+1', choices: ['1', '2'], answer: 1 },
  { id: 'b', q: '2+2', choices: ['4', '5'], answer: 0 },
]

test('empty list gives the empty state', () => {
  assert.equal(start([]).status, 'empty')
})

test('a full round counts the right answers', () => {
  let s = start(qs)
  s = next(answer(s, 1))
  s = next(answer(s, 1))
  assert.equal(s.status, 'done')
  assert.equal(score(s), 1)
})

test('answering twice does not change the first answer', () => {
  const s = answer(answer(start(qs), 0), 1)
  assert.equal(s.answers[0], 0)
})

test('next without an answer stays on the same question', () => {
  assert.equal(next(start(qs)).index, 0)
})

test('resume only when the saved ids match the questions', () => {
  assert.equal(start(qs, { ids: ['a', 'b'], index: 1, answers: [1] }).index, 1)
  assert.equal(start(qs, { ids: ['x'], index: 1, answers: [1] }).index, 0)
})

test('isQuestion rejects broken items', () => {
  assert.equal(isQuestion({ id: 'x', q: '?', choices: ['a'], answer: 0 }), false)
  assert.equal(isQuestion({ id: 'x', q: '?', choices: ['a', 'b'], answer: 5 }), false)
})`
        },
        {
          cmd: "مشروع ٢: fetch والحالات الأربع",
          title: "تجيب الداتا وتعرض بيحمّل وفاضي وخطأ إزاي؟",
          desc: R`اكتب [[api.js]] بدالة [[loadQuestions(cat)]]، و [[view(state)]] في [[app.js]] بترجّع HTML لكل حالة، و [[init()]] بتربطهم.

خلصت يعني: (١) أول ما الصفحة تفتح بيظهر «بيحمّل» فورًا. (٢) لو السيرفر رجّع 500 أو 404، أو الشبكة وقعت، أو الطلب خد أكتر من ٨ ثواني: رسالة واضحة فيها السبب وزرار «حاول تاني» شغال. (٣) [[?cat=sql]] (قسم مفيهوش أسئلة) بيطلّع «مفيش أسئلة» ولينك يرجّع لكل الأسئلة. (٤) أي نص جاي من الداتا بيتعرض كنص، مش HTML (escape). (٥) الصفحة بتشتغل من سيرفر محلي، مش [[file://]].

الدروس: [[fetch و AbortController]] و [[async و await]] و [[try و catch و finally]] و [[اعرض داتا من fetch]] في تاب «JavaScript»، و [[سيرفر محلي بدل file://]] و [[Network]] و [[Throttling و Blocking]] في تاب «Console»، و [[3. XSS]] في تاب «الأمان».`,
          example: R`import { isQuestion } from './quiz.js'

export async function loadQuestions(cat, { timeout = 8000 } = {}) {
  const res = await fetch('questions.json', { signal: AbortSignal.timeout(timeout) })
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('الداتا مش في الشكل المتوقع')
  return data.filter(isQuestion).filter(q => !cat || q.cat === cat)
}`,
          try: R`اكتب [[api.js]] و [[view()]] و [[init()]]. شغّل [[npx serve .]] وجرّب الأربع حالات بإيدك: (١) Network > Throttling > Slow 4G عشان تشوف «بيحمّل». (٢) Network > Block request URL على [[questions.json]] عشان الخطأ. (٣) [[?cat=sql]] للفاضي. (٤) حط في [[questions.json]] سؤال نصه [[<img src=x onerror=alert(1)>]] واتأكد إنه بيظهر كنص ومفيش alert.`,
          flag: "script",
          deep: {
            why: R`الـ tutorial بيعمل [[fetch().then(r => r.json()).then(render)]] وخلاص. في الحقيقة النت بيقطع، والسيرفر بيقع، والداتا بتيجي ناقصة. تطبيق بيعرض شاشة فاضية من غير رسالة لما الطلب يفشل، المستخدم بيفتكره بايظ وبيقفل. الأربع حالات هي الفرق الأوضح بين مشروع مبتدئ ومشروع حد اشتغل قبل كده.`,
            how: R`[[fetch]] مبيرميش error على 404 أو 500: بيرجّع response و [[res.ok]] بـ false. لازم تفحصه بنفسك وترمي. وبيرمي بس لو الشبكة نفسها وقعت ([[TypeError: Failed to fetch]]).

[[AbortSignal.timeout(8000)]] بيلغي الطلب لو خد أكتر من ٨ ثواني، والـ error اسمه [[TimeoutError]]. من غيره الطلب ممكن يفضل معلّق دقايق على شبكة وحشة، والشاشة «بيحمّل» للأبد.

[[init()]] بتعمل [[setState({ status: 'loading' })]] الأول، وبعدين [[try]]: لو نجح [[start(...)]] بتقرر playing ولا empty. لو فشل [[catch]] بيعمل error. وزرار «حاول تاني» بينادي [[init()]] تاني، فنفس الكود بيتجرّب.

الـ escape: [[view]] بتبني HTML بـ template literals و [[innerHTML]]. أي نص جاي من الداتا لازم يعدّي على [[esc()]] اللي بتحوّل [[<]] و [[&]] والعلامات لـ entities. من غيرها، سؤال فيه HTML هيتنفذ. ده XSS حتى لو الداتا من ملفك انت، لأن بكرة الملف ده ممكن ييجي من API أو من أدمن. البديل الأأمن إنك تبني بـ [[createElement]] و [[textContent]] (المشروع التالت بيعمل كده).

[[aria-busy="true"]] على رسالة التحميل، و [[role="alert"]] على الخطأ عشان قارئ الشاشة يقراه أول ما يظهر.`,
            when: R`أي شاشة بتجيب داتا، في أي مشروع. في React هتعملها بـ [[isPending]] و [[isError]] من React Query، بس الأربع حالات هي هي.`,
            mistakes: R`[[.catch(console.error)]] وخلاص، فالمستخدم مبيشوفش حاجة. أو تنسى [[res.ok]] فالـ 404 يوصل لـ [[res.json()]] ويرمي (درس [[Unexpected token '<']] في تاب «Console»). أو تفتح [[index.html]] بدبل كليك فـ fetch يقع. أو [[innerHTML]] بنص من الداتا من غير escape. أو «حاول تاني» بيعمل [[location.reload()]]، فبيضيّع أي حاجة المستخدم كان عاملها.`
          },
          lines: [
            R`[[isQuestion]] من ملف المنطق، عشان نشيل الأسئلة البايظة.`,
            R`الدالة بتاخد القسم، و timeout افتراضي ٨ ثواني.`,
            R`الطلب. [[AbortSignal.timeout]] بيلغيه لوحده لو طوّل.`,
            R`fetch مبيرميش على 404 و 500، فبنرمي احنا برسالة فيها الكود.`,
            R`حوّل الرد لـ JS. لو مش JSON سليم هيرمي هنا.`,
            R`لو الشكل نفسه غلط (مش array)، ارمي برسالة مفهومة.`,
            R`شيل الأسئلة البايظة، وبعدين فلتر بالقسم لو فيه.`,
            R`قفلة الدالة.`
          ],
          sol: R`اللي هتشوفه: مع Slow 4G، «بيحمّل الأسئلة...» في مربع رمادي لثانية أو اتنين. مع block: «مقدرناش نجيب الأسئلة (Failed to fetch).» وزرار «حاول تاني»، ولو شلت الـ block ودوست عليه الأسئلة تظهر. مع [[?cat=sql]]: «مفيش أسئلة في القسم ده لسه.» ولينك. والسؤال اللي فيه [[<img ...>]] بيظهر كنص حرفي.

الحل المرجعي فيه [[index.html]] و [[app.js]] كامل ([[view()]] و [[init()]] وكمان اللي هتعمله في المحطتين الجايين). لاحظ إن [[init]] مفيهاش ولا سطر DOM: كل حاجة بتعدّي من [[setState]].

لو الخطأ بيظهر كـ [[Unexpected token '<', "<!DOCTYPE "... is not valid JSON]]: السيرفر رجّع صفحة HTML (غالبًا 404 بتاعة السيرفر)، ومفيش [[res.ok]] قبل [[res.json()]]. ولو الصفحة فاضية خالص وفي Console خطأ CORS أو [[Failed to load module script]]: فتحتها بـ [[file://]].`,
          solCode: R`<!-- ── index.html ── -->
<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>اختبر نفسك</title>
  <link rel="stylesheet" href="styles.css">
  <script type="module" src="app.js"></script>
</head>
<body>
  <main>
    <h1>اختبر نفسك</h1>
    <div id="app"></div>
    <p id="live" class="sr-only" aria-live="polite"></p>
  </main>
</body>
</html>

// ── app.js ──
import { loadQuestions } from './api.js'
import { start, answer, next, score } from './quiz.js'
import { loadSaved, save, clearProgress } from './storage.js'

const app = document.querySelector('#app')
const live = document.querySelector('#live')
const cat = new URLSearchParams(location.search).get('cat')
let state = { status: 'loading' }
let best = loadSaved()?.best ?? 0

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function view(s) {
  switch (s.status) {
    case 'loading': return $__bt<p class="skeleton" aria-busy="true">بيحمّل الأسئلة...</p>$__bt
    case 'error': return $__bt<p role="alert">مقدرناش نجيب الأسئلة ($__{esc(s.error)}).</p><button data-action="retry">حاول تاني</button>$__bt
    case 'empty': return $__bt<p>مفيش أسئلة في القسم ده لسه.</p><a href="./">كل الأسئلة</a>$__bt
    case 'done': return $__bt<h2 tabindex="-1">النتيجة: $__{score(s)} من $__{s.questions.length}</h2><p>أحسن نتيجة: $__{best}</p><button data-action="restart">من الأول</button>$__bt
    case 'playing': {
      const q = s.questions[s.index], picked = s.answers[s.index], answered = picked !== undefined
      const cls = i => !answered ? '' : i === q.answer ? 'right' : i === picked ? 'wrong' : ''
      return $__bt<p>سؤال $__{s.index + 1} من $__{s.questions.length}</p>
        <h2 tabindex="-1">$__{esc(q.q)}</h2>
        <div class="choices">$__{q.choices.map((c, i) =>
          $__bt<button data-action="answer" data-i="$__{i}" class="$__{cls(i)}" $__{answered ? 'disabled' : ''}>$__{esc(c)}</button>$__bt).join('')}</div>
        $__{answered ? $__bt<button data-action="next">$__{s.index + 1 < s.questions.length ? 'اللي بعده' : 'النتيجة'}</button>$__bt : ''}$__bt
    }
  }
}

function setState(nextState) {
  const moved = nextState.status !== state.status || nextState.index !== state.index
  state = nextState
  app.innerHTML = view(state)
  if (moved) app.querySelector('h2')?.focus()
  else app.querySelector('[data-action="next"]')?.focus()
  if (state.status === 'playing' || state.status === 'done') save(state, best)
}

app.addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]')
  if (!btn) return
  const { action } = btn.dataset
  if (action === 'answer') {
    const i = Number(btn.dataset.i), q = state.questions[state.index]
    setState(answer(state, i))
    live.textContent = i === q.answer ? 'إجابة صح' : $__btغلط. الإجابة الصح: $__{q.choices[q.answer]}$__bt
  } else if (action === 'next') {
    const n = next(state)
    if (n.status === 'done') best = Math.max(best, score(n))
    setState(n)
  } else if (action === 'restart') {
    clearProgress(best)
    setState(start(state.questions))
  } else if (action === 'retry') {
    init()
  }
})

async function init() {
  setState({ status: 'loading' })
  try {
    setState(start(await loadQuestions(cat), loadSaved()))
  } catch (err) {
    setState({ status: 'error', error: err.name === 'TimeoutError' ? 'الشبكة بطيئة' : err.message })
  }
}
init()`
        },
        {
          cmd: "مشروع ٢: اللعب والكيبورد",
          title: "تمسك الضغطات وتنقل الـ focus وتعلن النتيجة لقارئ الشاشة إزاي؟",
          desc: R`خلّي الكويز يتلعب: الاختيارات زراير، والضغطة بتسجّل الإجابة وتلوّن الصح والغلط، و «اللي بعده» بيودّي للسؤال الجاي، وفي الآخر النتيجة و «من الأول».

خلصت يعني: (١) listener واحد على [[#app]] بيمسك كل الزراير (event delegation)، حتى الزراير اللي بتترسم بعدين. (٢) الكويز كله يتلعب بالكيبورد: Tab للاختيار و Enter. (٣) بعد الإجابة، الـ focus بيروح لزرار «اللي بعده». (٤) لما السؤال يتغير، الـ focus بيروح لعنوان السؤال الجديد، فقارئ الشاشة بيقراه. (٥) «إجابة صح» أو «غلط. الإجابة الصح: ...» بتتقري من غير ما الـ focus يتحرك ([[aria-live]]).

الدروس: [[addEventListener]] و [[event delegation]] و [[textContent و classList]] في تاب «JavaScript»، و [[aria]] و [[focus-visible]] و [[إعلان تغيير الصفحة]] في تاب «HTML و CSS».`,
          example: R`app.addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]')
  if (!btn) return
  const { action } = btn.dataset
  if (action === 'answer') {
    const i = Number(btn.dataset.i), q = state.questions[state.index]
    setState(answer(state, i))
    live.textContent = i === q.answer ? 'إجابة صح' : $__btغلط. الإجابة الصح: $__{q.choices[q.answer]}$__bt
  } else if (action === 'next') {
    const n = next(state)
    if (n.status === 'done') best = Math.max(best, score(n))
    setState(n)
  } else if (action === 'restart') {
    clearProgress(best)
    setState(start(state.questions))
  } else if (action === 'retry') {
    init()
  }
})`,
          try: R`اكتب الـ listener و [[setState]] الكاملة. وبعدين العب الكويز كله بالكيبورد بس، ومرة بقارئ الشاشة: لازم تسمع السؤال أول ما يظهر، وتسمع «إجابة صح» بعد الاختيار. جرّب كمان تدوس على نفس الاختيار مرتين بسرعة: الإجابة الأولى هي اللي تتحسب.`,
          flag: "script",
          deep: {
            why: R`كل مرة [[innerHTML]] بيتغير، الزراير القديمة بتتمسح، وأي listener كان عليها بيروح معاها. event delegation بيحل ده: listener واحد على الأب، بيفضل موجود. ولما الشاشة بتتبدّل كلها، الـ focus بيروح لـ [[body]]، فمستخدم الكيبورد لازم يدوس Tab من أول الصفحة، ومستخدم قارئ الشاشة مش عارف إن حاجة اتغيرت أصلًا. نقل الـ focus بإيدك هو اللي بيخلي التطبيق يتستخدم.`,
            how: R`[[e.target.closest('button[data-action]')]]: الضغطة ممكن تبقى على نص جوه الزرار، فـ [[closest]] بيطلع لحد الزرار. [[data-action]] بيقول الزرار ده بيعمل إيه، و [[data-i]] رقم الاختيار. كل الأكشنز في مكان واحد وسهل تتقري.

الـ focus: [[setState]] بتقارن القديم بالجديد. لو الحالة أو رقم السؤال اتغير، الـ focus يروح للـ [[h2]] (عليه [[tabindex="-1"]] عشان ينفع ياخد focus من الكود من غير ما يدخل في ترتيب الـ Tab). لو لأ (يعني جاوبت على نفس السؤال)، يروح لزرار «اللي بعده».

[[aria-live="polite"]] على [[#live]]: أي نص يتكتب فيه، قارئ الشاشة بيقراه لما يخلص اللي بيقوله، من غير ما الـ focus يتحرك. [[polite]] مش [[assertive]] عشان ميقطعش الكلام. والعنصر لازم يبقى موجود في الصفحة من الأول (في [[index.html]])، مش بيترسم مع الرسالة، وإلا مش هيتقري.

الزراير بعد الإجابة [[disabled]]: مبتتداسش ومش في ترتيب الـ Tab. والألوان مش لوحدها اللي بتقول صح ولا غلط، الرسالة المكتوبة كمان، عشان اللي عنده عمى ألوان.`,
            when: R`في أي تطبيق بيبدّل جزء كبير من الشاشة من غير ما يغيّر الصفحة: كويز، أو wizard، أو قايمة بتتفلتر.`,
            mistakes: R`[[querySelectorAll('button').forEach(...)]] بعد كل رسم عشان تحط listeners، فبتتكرر أو بتروح. أو [[<div onclick>]] بدل [[<button>]] فالكيبورد ميشتغلش. أو [[aria-live]] على عنصر بيترسم جديد كل مرة. أو [[focus()]] على عنصر مش focusable (h2 من غير tabindex) فمفيش حاجة تحصل. أو تعتمد على اللون بس. وفي الانترفيو: «إيه هو event delegation وليه؟» الإجابة: الـ events بتعمل bubble، فـ listener واحد على الأب بيمسك الضغطات على عناصر اتضافت بعده، وده أقل ذاكرة وأبسط.`
          },
          lines: [
            R`listener واحد على [[#app]] لكل الضغطات، حتى على زراير اترسمت بعده.`,
            R`اطلع من العنصر اللي اتداس لحد أقرب زرار عليه [[data-action]].`,
            R`لو الضغطة مش على زرار بيعمل حاجة، سيبها.`,
            R`اسم الأكشن من [[data-action]].`,
            R`اختيار إجابة:`,
            R`رقم الاختيار من [[data-i]]، والسؤال الحالي.`,
            R`احسب الـ state الجديد وارسم. [[answer]] بتتجاهل الإجابة التانية.`,
            R`اكتب النتيجة في الـ live region، فقارئ الشاشة يقولها.`,
            R`السؤال اللي بعده:`,
            R`احسب الـ state الجديد.`,
            R`لو خلصنا، حدّث أحسن نتيجة قبل الرسم.`,
            R`ارسم.`,
            R`من الأول:`,
            R`امسح التقدم المحفوظ (بس سيب أحسن نتيجة).`,
            R`ابدأ بنفس الأسئلة من غير ما تجيبها تاني.`,
            R`حاول تاني بعد خطأ:`,
            R`نفس [[init()]] بتاعة أول الصفحة.`,
            R`قفلة الـ if.`,
            R`قفلة الـ listener.`
          ],
          sol: R`بالكيبورد: Tab بيوصل لأول اختيار، Enter، الاختيارات بتتلوّن والـ focus بيبقى على «اللي بعده»، Enter تاني، والـ focus على عنوان السؤال الجديد. بقارئ الشاشة (NVDA مثلًا): «heading level 2، typeof null بيرجّع إيه؟» وبعد الاختيار «إجابة صح».

ده اتختبر في Playwright: [[toBeFocused()]] على الـ h2 أول ما الصفحة تحمّل، وعلى زرار «النتيجة» بعد الإجابة، و [[#live]] فيه «إجابة صح»، و axe نضيف قبل وبعد الإجابة.

الضغطة المزدوجة: التانية بتوصل لزرار [[disabled]] (مفيش click event)، وحتى لو وصلت، [[answer]] بترجّع نفس الـ state لأن السؤال متجاوب. حماية في طبقتين.

الحل المرجعي هو [[app.js]] اللي في المحطة اللي فاتت: [[setState]] فيها منطق الـ focus، والـ listener هو المثال.`
        },
        {
          cmd: "مشروع ٢: localStorage",
          title: "تحفظ التقدم في المتصفح من غير ما التطبيق يقع لو الداتا بايظة إزاي؟",
          desc: R`احفظ التقدم (الأسئلة، ورقم السؤال، والإجابات) وأحسن نتيجة في localStorage، ولما الصفحة تفتح تاني كمّل من نفس المكان.

خلصت يعني: (١) refresh في نص الكويز بيرجّعك لنفس السؤال. (٢) أحسن نتيجة بتفضل بعد «من الأول» وبعد refresh. (٣) لو ملف الأسئلة اتغير، التقدم القديم بيتجاهل ومش بيوقّع حاجة. (٤) لو اللي في localStorage بايظ ([[{not json]])، التطبيق بيبدأ عادي. (٥) لو localStorage مقفول أو المساحة خلصت، التطبيق بيشتغل من غير حفظ. (٦) الـ key فيه رقم نسخة.

الدروس: [[JSON]] في تاب «JavaScript»، و [[localStorage و JWT]] في تاب «Console» (إيه اللي ميتحطش فيه)، و [[useLocalStorage]] في تاب «React» (نفس الفكرة في React).`,
          example: R`const KEY = 'quiz:v1'

export function loadSaved() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    if (!data || !Array.isArray(data.ids) || !Array.isArray(data.answers)) return null
    return data
  } catch {
    return null
  }
}

export function save(state, best) {
  const data = { ids: state.questions.map(q => q.id), index: state.index, answers: state.answers, best }
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch { /* private mode أو المساحة خلصت: كمّل من غير حفظ */ }
}`,
          try: R`اكتب [[storage.js]] واستخدمه في [[setState]] (احفظ بعد كل رسم في playing و done) وفي [[init]] (مرر [[loadSaved()]] لـ [[start]]). جرّب: جاوب سؤالين، refresh، لازم تكمّل من التالت. وبعدين في Console: [[localStorage.setItem('quiz:v1', '{not json')]] و refresh. وبعدين غيّر [[id]] سؤال في [[questions.json]] و refresh: لازم يبدأ من الأول.`,
          flag: "script",
          deep: {
            why: R`localStorage بيبان بسيط: [[setItem]] و [[getItem]]. بس الداتا اللي فيه عايشة أطول من الكود اللي كتبها. بعد شهر هتغيّر شكل الـ state، والمستخدمين عندهم الشكل القديم. ومستخدم هيعدّل فيه من DevTools. ولو [[JSON.parse]] رمى وانت مش ماسكه، التطبيق مش هيفتح خالص عند المستخدم ده لحد ما يمسح الداتا بإيده، وهو مش هيعرف يعمل كده.`,
            how: R`القراية: [[JSON.parse(localStorage.getItem(KEY))]] جوه [[try]]. لو المفتاح مش موجود، [[getItem]] بيرجّع [[null]] و [[JSON.parse(null)]] بيرجّع [[null]]، مش error. لو النص بايظ بيرمي، و [[catch]] بيرجّع [[null]]. وبعد الـ parse بنفحص الشكل ([[Array.isArray(data.ids)]]): JSON سليم مش معناه إنه الشكل اللي انت مستنيه.

الكتابة: [[setItem]] نفسه ممكن يرمي ([[QuotaExceededError]] لما المساحة تخلص، أو في بعض أوضاع الـ private). جوه [[try]] وكمّل من غير حفظ.

الإصدار: [[quiz:v1]]. لو غيّرت شكل الداتا بطريقة مش متوافقة، خليها [[v2]] والقديم يتجاهل لوحده. أو اكتب migration بيقرا v1 ويحوّله.

والتحقق إن الأسئلة هي هي: بنحفظ [[ids]] الأسئلة بالترتيب، و [[start]] بتقارنهم. لو اختلفوا، رقم السؤال والإجابات القديمة ملهمش معنى.

وإيه اللي ميتحطش في localStorage: أي token أو داتا حساسة. أي JavaScript على الصفحة (مكتبة، أو XSS) يقدر يقراه.`,
            when: R`تفضيلات وتقدّم ومسودات: حاجات لو ضاعت مش كارثة. أي حاجة لازم تفضل (فلوس، أو تقدّم في كورس مدفوع) مكانها السيرفر.`,
            mistakes: R`[[JSON.parse]] من غير try، فمستخدم واحد عنده داتا بايظة التطبيق عنده ميّت. أو تحفظ الأسئلة نفسها مع التقدم، فلو صلّحت غلطة في سؤال المستخدم يفضل شايف القديم. أو key زي [[state]] (مشاريع تانية على نفس الـ localhost بتستخدم نفس الاسم). أو تحفظ حاجة كبيرة في كل keystroke (localStorage متزامن وبيوقّف الـ main thread). أو تحط JWT فيه.`
          },
          lines: [
            R`مفتاح واحد باسم التطبيق ورقم نسخة.`,
            R`قراية التقدم المحفوظ:`,
            R`[[try]] لأن [[JSON.parse]] بيرمي على أي نص بايظ.`,
            R`اقرا وحوّل. لو المفتاح مش موجود الناتج [[null]].`,
            R`JSON سليم مش كفاية: اتأكد من الشكل.`,
            R`رجّع الداتا لو كل حاجة تمام.`,
            R`أي error في القراية:`,
            R`اعتبر مفيش حاجة محفوظة.`,
            R`قفلة الـ catch.`,
            R`قفلة الدالة.`,
            R`الحفظ:`,
            R`احفظ الـ ids بس مش الأسئلة كاملة، ورقم السؤال، والإجابات، وأحسن نتيجة.`,
            R`[[setItem]] ممكن يرمي، فلو فشل كمّل من غير حفظ.`,
            R`قفلة الدالة.`
          ],
          sol: R`بعد سؤالين و refresh: «سؤال 3 من 4». واختبار Playwright «resume from the same question after reload» بيعمل نفس الفكرة على قسم js: سؤال واحد و refresh، فيرجع على «سؤال 2 من 3». الداتا البايظة: التطبيق بيفتح عادي على «سؤال 1 من 4» (اختبار «broken localStorage data does not break the app» بيحط [[{not json]] بـ [[addInitScript]] قبل ما الصفحة تحمّل). و [[id]] متغير: المقارنة في [[start]] بتطلع false فبيبدأ من الأول.

الحل المرجعي فيه [[storage.js]] كامل. لاحظ [[clearProgress(best)]]: «من الأول» بيمسح التقدم بس، و best بيفضل.

الغلط الشائع: تنادي [[save]] جوه [[answer]] في [[quiz.js]]، فالمنطق الـ pure بقى بيلمس المتصفح ومتقدرش تختبره بـ [[node --test]] (localStorage مش موجود في Node). الحفظ مكانه [[setState]]، اللي هي أصلًا المكان اللي بيلمس العالم الخارجي.`,
          solCode: R`// ── storage.js ──
const KEY = 'quiz:v1'

export function loadSaved() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    if (!data || !Array.isArray(data.ids) || !Array.isArray(data.answers)) return null
    return data
  } catch {
    return null
  }
}

export function save(state, best) {
  const data = { ids: state.questions.map(q => q.id), index: state.index, answers: state.answers, best }
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch { /* private mode أو المساحة خلصت: كمّل من غير حفظ */ }
}

export function clearProgress(best) {
  try { localStorage.setItem(KEY, JSON.stringify({ ids: [], index: 0, answers: [], best })) } catch {}
}`
        },
        {
          cmd: "مشروع ٢: الاختبارات والنشر",
          title: "تختبر الحالات الوحشة في متصفح حقيقي إزاي؟",
          desc: R`المنطق عنده اختبارات من أول محطة. دلوقتي اختبر التطبيق نفسه في متصفح: لعبة كاملة، و refresh في النص، وخطأ ثم «حاول تاني»، وقسم فاضي، و localStorage بايظ. وارفعه على GitHub Pages زي مشروع ١.

خلصت يعني: (١) [[npm test]] (المنطق بـ [[node --test]]) و [[npm run e2e]] (Playwright على موبايل) الاتنين أخضر. (٢) اختبار الخطأ مش محتاج تقفل السيرفر: بيتحكم في الرد بـ [[page.route]]. (٣) axe نضيف وانت بتلعب. (٤) لينك live و README و [[done-check]] أخضر.

الدروس: [[getByRole و expect(page)]] و [[trace viewer و flaky]] و [[@axe-core/playwright]] في تاب «فحص الكود»، و [[node --test]] في تاب «Node و npm».`,
          example: R`test('loading, then error with a working retry', async ({ page }) => {
  let fail = true
  await page.route('**/questions.json', async route => {
    if (fail) { await new Promise(r => setTimeout(r, 500)); return route.fulfill({ status: 500, body: 'oops' }) }
    return route.continue()
  })
  await page.goto('/')
  await expect(page.getByText('بيحمّل الأسئلة...')).toBeVisible()
  await expect(page.getByRole('alert')).toContainText('HTTP 500')
  fail = false
  await page.getByRole('button', { name: 'حاول تاني' }).click()
  await expect(page.getByText('سؤال 1 من 4')).toBeVisible()
})`,
          try: R`ركّب [[@playwright/test]] و [[@axe-core/playwright]] و [[serve]]، واعمل [[playwright.config.js]] بـ [[devices['Pixel 7']]] و [[webServer]]. اكتب ٥ اختبارات: لعبة كاملة بالكيبورد، و resume بعد refresh، وخطأ ثم retry بـ [[page.route]]، وقسم فاضي، و localStorage بايظ بـ [[addInitScript]]. شغّلهم ٣ مرات ورا بعض: لازم يعدّوا التلاتة (مفيش flaky).`,
          flag: "script",
          deep: {
            why: R`الحالات الوحشة هي أكتر حاجة بتتكسر من غير ما حد ياخد باله، لأن محدش بيجرّبها بإيده بعد أول مرة. اختبار بيعمل 500 ويتأكد إن «حاول تاني» شغال بيفضل يجرّبها في كل PR. و [[node --test]] للمنطق + Playwright للـ flow هو نفس التقسيم اللي هتعمله في كل مشروع بعد كده.`,
            how: R`[[page.route('**/questions.json', handler)]] بيمسك الطلب قبل ما يطلع من المتصفح. [[route.fulfill({ status: 500 })]] بيرد رد وهمي، و [[route.continue()]] بيسيبه يروح للسيرفر الحقيقي. المتغير [[fail]] بيخلي أول طلب يفشل والتاني ينجح، فالاختبار بيجرّب الـ retry فعلًا.

الـ [[setTimeout]] بـ 500ms قبل الـ 500: عشان حالة «بيحمّل» تفضل ظاهرة وقت كفاية يتأكد منها الاختبار. من غيرها، الخطأ بيوصل بسرعة، والاختبار يبقى flaky: ساعات يلحق يشوف «بيحمّل» وساعات لأ.

[[expect(...).toBeVisible()]] بيستنى لحد ٥ ثواني (auto-wait)، فمفيش [[waitForTimeout]] في أي حتة. ده أهم سبب إن اختبارات Playwright مش flaky لو اتكتبت صح.

[[page.addInitScript]] بيشغّل كود قبل أي script في الصفحة، فالـ localStorage بيبقى بايظ قبل ما التطبيق يقراه.

[[testMatch: '*.spec.js']] في الـ config، عشان Playwright ميحاولش يشغّل [[quiz.test.js]] بتاع [[node --test]].`,
            when: R`اختبار e2e لكل حالة وحشة ليها منطق (retry، و resume)، مش لكل تفصيلة شكل. والتفاصيل مكانها اختبارات المنطق السريعة.`,
            mistakes: R`[[await page.waitForTimeout(2000)]] بدل ما تستنى حاجة معينة. أو اختبار الخطأ بيقفل السيرفر فعلًا، فالاختبارات اللي بعده تقع. أو [[getByText('سؤال')]] بيلاقي عنصرين فيقع بـ strict mode violation (خليه أدق). أو الاختبارات بتعتمد على بعض (الأول بيحفظ في localStorage والتاني بيقرا)، مع إن كل اختبار بياخد متصفح نضيف. أو تحط [[quiz.test.js]] و [[app.spec.js]] في نفس الفولدر من غير [[testMatch]].`
          },
          lines: [
            R`اسم الاختبار بيقول الحالة اللي بيجرّبها.`,
            R`أول طلب يفشل، والتاني ينجح.`,
            R`امسك أي طلب لـ [[questions.json]].`,
            R`لو لسه في وضع الفشل: استنى نص ثانية ورد بـ 500.`,
            R`غير كده سيبه يروح للسيرفر الحقيقي.`,
            R`قفلة الـ route.`,
            R`افتح الصفحة.`,
            R`«بيحمّل» لازم تظهر الأول.`,
            R`وبعدين رسالة الخطأ فيها الكود. [[getByRole('alert')]] لأن العنصر [[role="alert"]].`,
            R`من دلوقتي الطلبات تنجح.`,
            R`دوس «حاول تاني».`,
            R`الأسئلة ظهرت: الـ retry اشتغل.`,
            R`قفلة الاختبار.`
          ],
          sol: R`بالحل المرجعي: [[npm test]] بيطلّع ٦ اختبارات [[pass]]، و [[npx playwright test]] بيطلّع ٦ اختبارات [[passed]] (٥ في [[app.spec.js]] وواحد axe). اتشغّلوا على Chromium بـ viewport الـ Pixel 7.

لو اختبار الخطأ بيعدّي أحيانًا ويقع أحيانًا عند «بيحمّل»: شيل الـ delay وهتشوفه بيقع أكتر. ده بالظبط سبب وجوده. ولو كل الاختبارات بتقع بـ [[net::ERR_CONNECTION_REFUSED]]: الـ [[webServer]] مش شغال أو على بورت تاني. ولو بتقع بحاجات مالهاش معنى، ممكن سيرفر تاني قديم شغال على نفس البورت و [[reuseExistingServer: true]] بيستخدمه: غيّر البورت أو اقفله.

النشر: نفس [[pages.yml]] بتاع مشروع ١، بس حط ملفات الموقع في فولدر لوحده وخلي [[path]] يشاور عليه، و job الاختبار فيه [[npm test]] قبل [[npx playwright test]].`,
          solCode: R`// ── package.json ──
{"type":"module","scripts":{"test":"node --test tests/*.test.js","e2e":"playwright test"}}

// ── playwright.config.js ──
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.js',
  use: { baseURL: 'http://localhost:4174', ...devices['Pixel 7'] },
  webServer: { command: 'npx serve -l 4174 .', url: 'http://localhost:4174', reuseExistingServer: true },
})

// ── tests/app.spec.js ──
import { test, expect } from '@playwright/test'

test('play a round, see the score, and keep the best score after reload', async ({ page }) => {
  await page.goto('/?cat=css')
  await expect(page.getByRole('heading', { level: 2 })).toBeFocused()
  await page.getByRole('button', { name: 'margin-inline-start' }).click()
  await expect(page.locator('#live')).toHaveText('إجابة صح')
  await expect(page.getByRole('button', { name: 'النتيجة' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'النتيجة: 1 من 1' })).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: 'النتيجة' }).click()
  await expect(page.getByText('أحسن نتيجة: 1')).toBeVisible()
})

test('resume from the same question after reload', async ({ page }) => {
  await page.goto('/?cat=js')
  await page.getByRole('button', { name: '"object"' }).click()
  await page.getByRole('button', { name: 'اللي بعده' }).click()
  await page.reload()
  await expect(page.getByText('سؤال 2 من 3')).toBeVisible()
})

test('loading, then error with a working retry', async ({ page }) => {
  let fail = true
  await page.route('**/questions.json', async route => {
    if (fail) { await new Promise(r => setTimeout(r, 500)); return route.fulfill({ status: 500, body: 'oops' }) }
    return route.continue()
  })
  await page.goto('/')
  await expect(page.getByText('بيحمّل الأسئلة...')).toBeVisible()
  await expect(page.getByRole('alert')).toContainText('HTTP 500')
  fail = false
  await page.getByRole('button', { name: 'حاول تاني' }).click()
  await expect(page.getByText('سؤال 1 من 4')).toBeVisible()
})

test('empty category shows the empty state', async ({ page }) => {
  await page.goto('/?cat=sql')
  await expect(page.getByText('مفيش أسئلة في القسم ده لسه.')).toBeVisible()
})

test('broken localStorage data does not break the app', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('quiz:v1', '{not json'))
  await page.goto('/')
  await expect(page.getByText('سؤال 1 من 4')).toBeVisible()
})

// ── tests/axe.spec.js ──
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('axe clean while playing and after answering', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('سؤال 1 من 4')).toBeVisible()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  await page.getByRole('button', { name: '"null"' }).click()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})`
        }
      ]
    }
]);

// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
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

وقيس الأول: لو [[console.time]] بيقول أقل من 1ms، useMemo مش هيفرق. ومع React Compiler (درس React Compiler في المستوى التالت) الـ memoization بيتعمل لوحده وقت الـ build، فالكود الجديد غالبًا مش محتاج الاتنين.`,
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
          ],
          sol: R`الأرقام بتختلف حسب الجهاز، بس هتلاقي حاجة زي: ٢٠ منتج أقل من [[0.1ms]]، و ٢٠ ألف منتج كذا ms (على جهازنا حوالي 5ms). القاعدة العملية من docs React: لو الحساب بياخد 1ms أو أكتر بشكل متكرر، useMemo تستاهل. تحت كده الـ memo نفسها (مقارنة الـ deps وحفظ النتيجة) تكاد تبقى بنفس التكلفة، والكود بقى أصعب في القراية.

جرّب كمان بـ CPU throttling 4x من تاب Performance، لأن جهاز المستخدم غالبًا أبطأ من جهازك. والغلطة الشائعة: تقيس في dev وتفتكرها نفس الإنتاج، أو تقيس أول مرة بس، لأن useMemo مبتسرّعش أول render، هي بتوفر الـ renders اللي بعده.`,
          solCode: R`console.time('filter')
const visible = products
  .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
  .sort((a, b) => (sort === 'price' ? a.price - b.price : a.name.localeCompare(b.name)))
console.timeEnd('filter')
// اعمل ٢٠ ألف منتج للتجربة:
const products = Array.from({ length: 20_000 }, (_, i) => ({ id: String(i), name: 'Product ' + i, price: i % 1000 }))`
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
            when: "Theme، والمستخدم الحالي، واللغة، و feature flags، والـ state الداخلية لـ compound components (درس compound components في المستوى التالت). ومش لبيانات السيرفر (TanStack Query) ولا لـ state بتتغير كل ثانية.",
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
          ],
          sol: R`برا الـ provider الصفحة بتقع وفي الـ console (و overlay بتاع Vite) هتلاقي [[Error: useAuth must be used inside <AuthProvider>]]. ده أحسن من إن [[ctx]] يطلع null وتقع بعدين بـ «Cannot read properties of null» في مكان بعيد.

الجزء التاني محتاج الـ provider يعيد الرسم لسبب تاني غير user، وإلا مش هتشوف فرق. زوّد في AuthProvider state زي [[tick]] بزرار. بالـ useMemo الـ consumer بيطبع مرة واحدة بس مهما دوست، ومن غيرها بيطبع مع كل ضغطة، لأن [[{ user, logout }]] بقى object جديد كل render، و React بتقارن قيمة الـ context بـ [[Object.is]]. (لو حطيت الـ state في App فوق الـ provider، الـ consumer هيعيد الرسم في الحالتين لأنه ابن App عادي، فمش هتشوف الفرق.)`,
          solCode: R`export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tick, setTick] = useState(0)
  const value = { user, logout: () => setUser(null) } // من غير useMemo للتجربة
  return (
    <AuthContext value={value}>
      <button onClick={() => setTick(t => t + 1)}>tick {tick}</button>
      {children}
    </AuthContext>
  )
}
function Consumer() {
  useAuth()
  console.log('consumer render')
  return null
}`
        },
        {
          cmd: "useReducer",
          title: "state ليها قواعد انتقال: حطها كلها في دالة واحدة",
          desc: R`[[useReducer(reducer, initial)]] بديل لـ [[useState]] لما الـ state فيها كذا حقل بيتغيروا مع بعض بقواعد. بدل ما كل handler يعمل [[setX]] و [[setY]] بإيده، الـ handler بيبعت «إيه اللي حصل» ([[dispatch({ type: 'next' })]])، والـ reducer هو اللي يقرر الـ state الجديدة.

الـ reducer دالة pure: بتاخد الـ state الحالية والـ action وترجّع state جديدة، من غير fetch ولا تعديل في المكان. عشان كده سهل تختبرها لوحدها من غير React خالص.`,
          example: R`type State = { step: 1 | 2 | 3; shipping: { city: string }; payment: 'cash' | 'card' | null }
type Action =
  | { type: 'setShipping'; city: string }
  | { type: 'setPayment'; method: 'cash' | 'card' }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'reset' }

export const initial: State = { step: 1, shipping: { city: '' }, payment: null }

export function checkoutReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setShipping': return { ...state, shipping: { city: action.city } }
    case 'setPayment': return { ...state, payment: action.method }
    case 'next':
      if (state.step === 1 && !state.shipping.city) return state
      return state.step < 3 ? { ...state, step: (state.step + 1) as State['step'] } : state
    case 'back': return state.step > 1 ? { ...state, step: (state.step - 1) as State['step'] } : state
    case 'reset': return initial
  }
}
// جوه component:
// const [state, dispatch] = useReducer(checkoutReducer, initial)
// <button onClick={() => dispatch({ type: 'next' })}>Next</button>`,
          try: R`اعمل component فيه خانة City وزرارين Back و Next بيستخدموا الـ reducer ده، واعرض [[Step {state.step}]]. دوس Next والخانة فاضية: مفيش حاجة تحصل. وبعدين اكتب اختبار صغير بـ Vitest للـ reducer نفسه من غير React: من state فاضية، [[next]] المفروض يرجّع نفس الـ object بالظبط ([[toBe]]).`,
          flag: "script",
          deep: {
            why: R`في wizard أو سلة أو فورم معقد، الـ handlers بتبقى مليانة [[setStep]] و [[setError]] و [[setData]] ورا بعض، والقاعدة «مينفعش تروح للخطوة ٢ من غير مدينة» بتتكرر في كل زرار. أول ما حد يضيف زرار جديد وينسى القاعدة، bug. الـ reducer بيحط كل قواعد التغيير في مكان واحد، والـ handlers بتبقى سطر واحد بيقول إيه اللي حصل.`,
            how: R`[[dispatch(action)]] بيحط الـ action في طابور ويطلب render. في الـ render، React بتنادي [[reducer(state, action)]] وتاخد اللي رجع كـ state جديدة. ولو رجّعت نفس الـ object بالظبط ([[return state]]) React بتقارنه بـ [[Object.is]] وممكن تتخطى الـ render، عشان كده «مفيش تغيير» بيتكتب [[return state]] مش نسخة جديدة.

[[dispatch]] نفسها مرجعها ثابت طول عمر الـ component، زي [[setState]]، فتقدر تبعتها لأي ابن أو تحطها في dependencies من غير ما حاجة تتعاد.

الـ discriminated union في TypeScript ([[type Action = { type: 'next' } | ...]]) بيخلي كل [[case]] يعرف شكل الـ action بتاعه: جوه [[case 'setShipping']] بس [[action.city]] موجودة. ولو نسيت case، ومع [[strict]]، الدالة هترجّع [[undefined]] في مسار و TypeScript هيشتكي إن النوع مش State.

[[useReducer(reducer, arg, init)]] بياخد دالة تالتة اختيارية بتحسب الـ state الأولى مرة واحدة (زي [[useState(() => ...)]])، مفيدة لو بتقرا مسودة من localStorage.

والـ reducer في Strict Mode بيتنادى مرتين وقت التطوير عشان يكشف لو فيه side effect جواه. لو فيه [[fetch]] أو [[toast]] جوه الـ reducer، هيحصل مرتين: الحاجات دي مكانها الـ handler أو effect.`,
            when: R`state فيها كذا حقل مرتبطين (خطوة وبيانات وأخطاء)، أو التغيير الجديد بيعتمد على القديم بقواعد (wizard، و undo/redo، وسلة فيها خصومات)، أو عايز تختبر المنطق من غير واجهة. ولو قيمة واحدة مستقلة (modal مفتوح ولا لأ)، [[useState]] أبسط.`,
            mistakes: R`تعدّل الـ state في المكان جوه الـ reducer ([[state.step++; return state]]): نفس المرجع، فالشاشة مش بتتحدث. و fetch أو [[Date.now()]] أو [[Math.random()]] جوه الـ reducer: مبقاش pure، وفي Strict Mode بيتنادى مرتين. وترجّع object جديد في حالة «مفيش تغيير» فتعمل render على الفاضي. و actions اسمها أوامر ([[setStepTo3]]) بدل أحداث ([[next]])، فالقواعد بتهرب تاني للـ handlers. وسؤال انترفيو: «useState ولا useReducer؟» الإجابة: useState مبني على reducer أصلًا، والفرق إن الـ reducer بيجمع قواعد الانتقال في مكان واحد ويتختبر لوحده.`
          },
          lines: [
            "شكل الـ state: الخطوة، وعنوان الشحن، وطريقة الدفع.",
            "كل الأحداث الممكنة، وكل واحد ليه شكله (discriminated union):",
            "المستخدم كتب المدينة.",
            "اختار طريقة دفع.",
            "داس التالي.",
            "داس رجوع.",
            "صفّر كل حاجة.",
            "القيمة الأولى.",
            "الـ reducer: الـ state الحالية + الحدث = الـ state الجديدة.",
            "حسب نوع الحدث:",
            "نسخة جديدة فيها المدينة الجديدة.",
            "نسخة جديدة فيها طريقة الدفع.",
            "التالي:",
            "القاعدة في مكان واحد: مفيش مدينة؟ ارجع نفس الـ state، فمفيش render.",
            "زوّد الخطوة لو لسه مش آخر واحدة.",
            "رجوع بنفس الفكرة.",
            "reset يرجّع القيمة الأولى.",
            "قفلة الـ switch.",
            "قفلة الـ reducer."
          ],
          sol: R`لما الخانة فاضية و Next، الرقم يفضل [[Step 1]]، والـ reducer رجّع نفس الـ object، فالاختبار بـ [[toBe(s0)]] يعدّي. بعد ما تكتب مدينة و Next يبقى [[Step 2]]، و Back يرجّع 1.

الاختبار ميحتاجش render ولا jsdom: الـ reducer دالة عادية. لو كتبت [[toEqual]] بدل [[toBe]] الاختبار هيعدّي حتى لو رجّعت نسخة جديدة، فمش هيكشف الـ render الزيادة. والنتيجة الغلط الشائعة: الخانة بتتكتب بس الخطوة مبتتغيرش، ودي غالبًا لأنك عدّلت [[state.step]] في المكان.`,
          solCode: R`import { useReducer } from 'react'
import { it, expect } from 'vitest'
import { checkoutReducer, initial } from './checkout'

export function Checkout() {
  const [state, dispatch] = useReducer(checkoutReducer, initial)
  return (
    <>
      <h2>Step {state.step}</h2>
      <label>City <input value={state.shipping.city} onChange={e => dispatch({ type: 'setShipping', city: e.target.value })} /></label>
      <button onClick={() => dispatch({ type: 'back' })}>Back</button>
      <button onClick={() => dispatch({ type: 'next' })}>Next</button>
    </>
  )
}

it('does not move without a city', () => {
  expect(checkoutReducer(initial, { type: 'next' })).toBe(initial)
  const s1 = checkoutReducer(initial, { type: 'setShipping', city: 'Cairo' })
  expect(checkoutReducer(s1, { type: 'next' }).step).toBe(2)
  expect(initial.shipping.city).toBe('')
})`
        },
        {
          cmd: "reducer + context",
          title: "wizard من كذا خطوة: reducer واحد وكل الخطوات تقراه",
          desc: R`لما الـ state بتاعة الـ reducer محتاجاها components كتير في أعماق مختلفة (كل خطوة في الـ wizard component لوحده، والـ header بيعرض رقم الخطوة، والملخص على الجنب)، حط الـ reducer في provider وابعت الـ state والـ dispatch في contextين منفصلين.

كده أي خطوة تقرا اللي محتاجاه بـ [[useCheckout()]] وتبعت أحداث بـ [[useCheckoutDispatch()]]، من غير ما تعدّي props على كل مستوى.`,
          example: R`import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'

const StateCtx = createContext<State | null>(null)
const DispatchCtx = createContext<Dispatch<Action> | null>(null)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initial)
  return <StateCtx value={state}><DispatchCtx value={dispatch}>{children}</DispatchCtx></StateCtx>
}
export function useCheckout() {
  const state = useContext(StateCtx)
  if (!state) throw new Error('useCheckout must be used inside <CheckoutProvider>')
  return state
}
export function useCheckoutDispatch() {
  const dispatch = useContext(DispatchCtx)
  if (!dispatch) throw new Error('useCheckoutDispatch must be used inside <CheckoutProvider>')
  return dispatch
}
function ShippingStep() {
  const { shipping } = useCheckout()
  const dispatch = useCheckoutDispatch()
  return <><input aria-label="City" value={shipping.city} onChange={e => dispatch({ type: 'setShipping', city: e.target.value })} /><button onClick={() => dispatch({ type: 'next' })}>Next</button></>
}
const StepTitle = () => <h2>Step {useCheckout().step}</h2>
export const Checkout = () => <CheckoutProvider><StepTitle /><ShippingStep /></CheckoutProvider>`,
          try: R`كمّل الـ wizard: [[PaymentStep]] فيه radio لـ cash و card، و [[ReviewStep]] بيعرض المدينة وطريقة الدفع وزرار «أكّد» بيعمل [[reset]]. اعرض الخطوة المناسبة حسب [[state.step]]. بعدين اعمل component [[BackButton]] بيستخدم [[useCheckoutDispatch()]] بس، وحط فيه [[console.log('BackButton render')]]: اكتب في خانة المدينة وشوف هل بيطبع مع كل حرف.`,
          flag: "script",
          deep: {
            why: R`الـ wizard بطبيعته متقسم: كل خطوة component، وفيه مؤشر الخطوات فوق، وملخص الطلب على الجنب، وكلهم محتاجين نفس البيانات. من غير context، الأب الكبير بيعدّي [[state]] و [[dispatch]] لكل واحد. ومن غير reducer، كل خطوة بتعمل setState بقواعدها هي، فالقواعد بتتفرق. الاتنين مع بعض هما «Redux صغير» جوه React من غير مكتبة.`,
            how: R`contextين مش واحد: [[dispatch]] مرجعها ثابت للأبد، فالـ [[DispatchCtx]] قيمته عمرها ما بتتغير، وأي component بيقرا الـ dispatch بس (زرار Back مثلًا) مش هيعيد الرسم لما المستخدم يكتب. لو حطيتهم في object واحد [[{ state, dispatch }]]، كل consumer هيعيد الرسم مع كل حرف. وكده كمان مش محتاج [[useMemo]] للقيمة، لأن [[state]] نفسها بتتغير بس لما الـ reducer يرجّع object جديد.

الـ hooks اللي بترمي error برا الـ provider بتحوّل bug صامت (قيمة null) لرسالة واضحة، و TypeScript بعدها عارف إن القيمة موجودة.

الـ state بتتصفّر لو الـ provider اتشال من الشجرة: لو الـ wizard في modal بيتقفل، البيانات بتروح. لو عايزها تفضل، ارفع الـ provider فوق، أو خزّن مسودة (الـ init function بتاعة useReducer تقرا من localStorage).

وأي component بيقرا [[useCheckout()]] بيعيد الرسم مع أي تغيير في الـ state كلها، حتى لو بيقرا [[step]] بس. لـ wizard عادي ده مش فارق. لو الـ state كبيرة وبتتغير كتير وفيه components كتير بتقرا أجزاء صغيرة، Zustand بالـ selectors أنسب.`,
            when: R`wizard أو checkout من كذا خطوة، أو محرر فيه toolbar و sidebar و canvas بيشتغلوا على نفس البيانات، أو أي feature state ليها قواعد ومحتاجاها components كتير جوه جزء واحد من التطبيق.`,
            mistakes: R`context واحد فيه [[{ state, dispatch }]] من غير تفكير، فالأزرار اللي بتبعت بس بتعيد الرسم مع كل حرف. وتحط الـ provider فوق التطبيق كله وهو محتاج جوه صفحة الـ checkout بس. وتخزّن بيانات السيرفر (المنتجات والأسعار) في الـ reducer بدل React Query. وتنادي [[useCheckout()]] في component برا الـ provider فتاخد error، والحل مكان الـ provider مش إنك تشيل الـ throw.`
          },
          lines: [
            "أدوات الـ context والـ reducer، والأنواع.",
            "context للـ state.",
            "و context منفصل للـ dispatch، عشان مرجعه ثابت.",
            "الـ provider.",
            "نفس الـ reducer والقيمة الأولى من الدرس اللي فات.",
            "الاتنين متداخلين. React 19: الـ context نفسه provider.",
            "قفلة الـ provider.",
            "hook القراية.",
            "اقرا الـ state.",
            "برا الـ provider؟ error واضح.",
            "رجّعها.",
            "قفلة.",
            "hook الإرسال.",
            "اقرا الـ dispatch.",
            "نفس الحماية.",
            "رجّعه.",
            "قفلة.",
            "خطوة الشحن.",
            "بتقرا المدينة من الـ state.",
            "وبتاخد dispatch.",
            "الخانة بتبعت حدث مع كل حرف، والزرار بيبعت next والـ reducer يقرر.",
            "قفلة الخطوة.",
            "العنوان بيقرا رقم الخطوة من نفس الـ state.",
            "الـ wizard: الـ provider بيلف كل الخطوات."
          ],
          sol: R`الـ BackButton مش المفروض يطبع مع كل حرف، لأنه بيقرا [[DispatchCtx]] بس، وقيمته ثابتة. لو بيطبع، يا إما حاطط الـ state والـ dispatch في context واحد، يا إما الـ BackButton ابن مباشر لـ component بيعيد الرسم (زي الخطوة نفسها) فبيترسم معاه كابن عادي، وده مش ذنب الـ context. حطه جنب الخطوات مش جواها، أو لفّه في [[memo]]، وشوف الفرق.

الـ wizard الصح: Next من غير مدينة مبيعملش حاجة، وفي الخطوة ٢ Next من غير طريقة دفع كمان لازم يتمنع (ضيف القاعدة دي في الـ reducer نفسه مش في الزرار)، و «أكّد» بيرجّعك لـ Step 1 وخانة فاضية.`,
          solCode: R`function PaymentStep() {
  const { payment } = useCheckout()
  const dispatch = useCheckoutDispatch()
  return (
    <fieldset>
      <label><input type="radio" name="pay" checked={payment === 'cash'} onChange={() => dispatch({ type: 'setPayment', method: 'cash' })} /> Cash</label>
      <label><input type="radio" name="pay" checked={payment === 'card'} onChange={() => dispatch({ type: 'setPayment', method: 'card' })} /> Card</label>
    </fieldset>
  )
}
function ReviewStep() {
  const { shipping, payment } = useCheckout()
  const dispatch = useCheckoutDispatch()
  return <p>{shipping.city} · {payment} <button onClick={() => dispatch({ type: 'reset' })}>Confirm</button></p>
}
function BackButton() {
  const dispatch = useCheckoutDispatch()
  console.log('BackButton render')
  return <button onClick={() => dispatch({ type: 'back' })}>Back</button>
}
function CurrentStep() {
  const { step } = useCheckout()
  return step === 1 ? <ShippingStep /> : step === 2 ? <PaymentStep /> : <ReviewStep />
}
export const Checkout = () => (
  <CheckoutProvider><StepTitle /><CurrentStep /><BackButton /></CheckoutProvider>
)
// وفي الـ reducer:
// if (state.step === 2 && !state.payment) return state`
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
          try: R`خلي Results يطبع [[console.log('search', query)]] جوه [[useEffect]] معتمد على [[[query]]]، واكتب كلمة طويلة بسرعة: هيطبع مرة واحدة بعد ما تقف. (لو حطيته في جسم الـ component هيطبع مع كل حرف بالقيمة القديمة، لأن Results بيعيد الرسم مع كل render للأب.) غيّر الـ delay لـ 0 وشوف الفرق.`,
          flag: "script",
          deep: {
            why: "نفس الـ state ونفس الـ effect بيتكتبوا في عشر components: debounce، و localStorage، و media query، و online status. نسخهم معناه عشر أماكن للـ bugs. الـ custom hook بيحطهم في مكان واحد باسم واضح.",
            how: R`الـ hook مش سحر: دالة عادية بتتنادى جوه الـ component في كل render، والـ hooks اللي جواها بتتسجل في الـ component اللي ناداها. عشان كده اتنين components بيستخدموا [[useDebounce]] كل واحد ليه state منفصلة. الـ hooks بتشارك المنطق، مش الـ state.

إزاي الـ debounce شغال: كل ما [[value]] يتغير (حرف جديد)، الـ cleanup بيلغي الـ timeout القديم والـ effect يعمل واحد جديد. لو فضلت تكتب، مفيش timeout بيلحق يخلص. أول ما تقف 500ms، آخر timeout يخلص و [[debounced]] تتحدث، و Results بيشوف القيمة الجديدة.

البادئة [[use]] مش شكليات: eslint بيطبّق قواعد الـ hooks على أي دالة اسمها كده (متتنادش جوه if، والـ dependencies)، و React Compiler بيعتمد عليها. ولو الدالة مفيهاش أي hook، متسميهاش use: دي دالة عادية.

والـ debounce بيقلل عدد الطلبات بس، مبيحلش race condition: الردود لسه ممكن ترجع بترتيب غلط. لو Results بيستخدم TanStack Query بـ key فيه الـ query، المشكلة دي محلولة لوحدها.`,
            when: "أي منطق فيه hooks اتكرر مرتين: [[useDebounce]]، و [[useLocalStorage]]، و [[useMediaQuery]]، و [[useAuth]]، و hooks بتلف TanStack Query لكل resource ([[useProducts]]).",
            mistakes: R`دالة من غير hooks اسمها [[useFormatDate]]. و hook بيرجّع object أو دالة جديدة كل مرة، وحد يحطها في dependencies فيعمل loop. و debounce بـ lodash جوه الـ component من غير [[useMemo]] أو [[useRef]]: بيتعمل debounce جديد كل render، فكل حرف بيتأخر لوحده ومفيش حاجة بتتلغي، يعني طلب لكل حرف برضه.`
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
          ],
          sol: R`لو كتبت «react» بسرعة هتلاقي [[search react]] مرة واحدة بعد نص ثانية من آخر حرف. كل حرف بيغيّر [[value]]، فالـ cleanup بيلغي الـ timeout اللي فات قبل ما يخلص، ومفيش غير آخر واحد اللي بيكمّل.

مع delay [[0]] هيطبع مع كل حرف ([[search r]]، [[search re]]...) لأن الـ timeout بيخلص قبل ما تلحق تكتب الحرف اللي بعده. ولو حطيت الـ log في جسم Results بدل الـ effect، هيطبع مع كل حرف بقيمة فاضية أو قديمة، ودا مش معناه إن الـ debounce بايظ: ده render عادي للابن مع أبوه، والـ query لسه متغيرتش.`,
          solCode: R`function Results({ query }: { query: string }) {
  useEffect(() => {
    console.log('search', query)
  }, [query])
  return <p>Results for: {query}</p>
}`
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
            mistakes: R`توكن الدخول في localStorage: أي XSS يقراه، والأأمن httpOnly cookie (تاب أمان الموقع). و [[JSON.parse]] من غير try فالصفحة تقع لو القيمة بايظة. وتخزين بيانات كبيرة (localStorage بيوقف الـ main thread وهو بيكتب). والـ updater bug اللي فوق.`
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
          ],
          sol: R`بعد refresh الرقم فاضل زي ما سبته، وفي Local Storage هتلاقي key [[count]] قيمته الرقم كنص JSON. بعد ما تغيرها لـ [[{bad json]] وتعمل refresh، [[JSON.parse]] بيرمي error، والـ catch بيرجّع القيمة الأولى ([[0]])، والـ effect بيكتب [[0]] فوق القيمة البايظة، فالتخزين اتصلّح لوحده.

لو الصفحة وقعت بـ «SyntaxError: Unexpected token»، الـ try/catch مش حوالين الـ parse. ولو الرقم رجع صفر مع كل refresh من غير ما تبوّظ حاجة، غالبًا بتقرا في effect بعد الرسم بدل الـ lazy initializer، أو الـ key اتغير.`,
          solCode: R`function ClickCounter() {
  const [count, setCount] = useLocalStorage('count', 0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}`
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

والـ validation بتاع المتصفح بيمنع الإرسال ويعرض رسالته، و [[:invalid]] في CSS بيلوّن الخانة. ولو محتاج رسايل بشكلك، react-hook-form (الدرس الجاي) بيشتغل uncontrolled برضه بس بيدّيك تحكم كامل. وفي React 19 تقدر تدّي [[action]] للفورم مباشرة فتوصلك الـ FormData وبيعمل reset لوحده (درس form actions في المستوى التالت).`,
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
          ],
          sol: R`بعد الـ await هتلاقي [[TypeError: Cannot read properties of null (reading 'reset')]]. [[currentTarget]] بيشاور على العنصر اللي الـ handler متسجّل عليه طول ما الـ event شغال بس، وبعد ما الجزء المتزامن يخلص بيبقى null. الـ await كده خرج من الـ event، عشان كده بتخزن [[e.currentTarget]] في متغير قبله.

من غير [[name]] على الـ textarea البيانات هتبقى [[{ email: 'you@example.com' }]] بس: FormData بتجمع الخانات اللي ليها name بس، مش id ولا label. ولو [[required]] لسه عليها المتصفح هيمنع الإرسال لو فاضية، لكن القيمة مش هتوصلك برضه.`
        },
        {
          cmd: "react-hook-form + zod",
          title: "فورم فيه validation ورسايل خطأ من غير state لكل خانة",
          desc: R`react-hook-form بيدير الفورم كله: القيم، والأخطاء، وحالة الإرسال، من غير render مع كل حرف. و zod بيوصف شكل البيانات مرة واحدة، و [[zodResolver]] بيربطهم، فمن نفس الـ schema بيطلع الـ validation والـ type بتاع TypeScript.

[[register('email')]] بيوصّل الخانة، و [[handleSubmit]] مبينادي دالتك غير لو البيانات سليمة، و [[formState.errors]] فيه رسالة كل خانة. والأخطاء اللي بتيجي من السيرفر (باسورد غلط، أو إيميل مستخدم) بتتحط في نفس المكان بـ [[setError]]، فتظهر زي أي خطأ validation.`,
          example: R`import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({ email: z.email('Enter a valid email'), password: z.string().min(8, 'At least 8 characters') })
type LoginInput = z.infer<typeof schema>

export function LoginForm({ onLogin }: { onLogin: (data: LoginInput) => Promise<Response> }) {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginInput>({ resolver: zodResolver(schema) })
  async function onSubmit(data: LoginInput) {
    const res = await onLogin(data)
    if (res.status === 401) setError('password', { message: 'Wrong email or password' })
    else if (!res.ok) setError('root.server', { message: 'Server error, try again' })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="email" aria-label="Email" {...register('email')} />
      <input type="password" aria-label="Password" {...register('password')} />
      {(errors.email || errors.password) && <p role="alert">{errors.email?.message ?? errors.password?.message}</p>}
      {errors.root?.server && <p role="alert">{errors.root.server.message}</p>}
      <button disabled={isSubmitting}>Log in</button>
    </form>
  )
}`,
          try: R`[[npm i react-hook-form zod @hookform/resolvers]]، وابعت onLogin بترد بعد ثانيتين: [[() => new Promise(r => setTimeout(() => r(new Response(null, { status: 401 })), 2000))]]. جرّب باسورد ٣ حروف (رسالة zod ومفيش طلب)، وبعدين بيانات سليمة: الزرار يتقفل ثانيتين وبعدين «Wrong email or password». اكتب حرف زيادة في الباسورد وشوف الرسالة بتروح فين. وبعدين غيّر الـ status لـ 500.`,
          flag: "script",
          deep: {
            why: R`فورم فيه ٨ خانات بـ controlled inputs معناه ٨ state، و onChange لكل واحدة، و validation مكتوب بإيدك، ورسايل، و isSubmitting، وكل حرف بيعيد رسم الفورم كله. والـ backend بيكتب نفس قواعد الـ validation تاني. وأخطاء السيرفر بتتعرض في toast منفصل بعيد عن الخانة الغلط. RHF و zod بيحلّوا التلاتة.`,
            how: R`[[register('email')]] بيرجّع [[name]] و [[onChange]] و [[onBlur]] و [[ref]]، والـ spread بيحطهم على الخانة. RHF بيقرا القيم من الـ DOM عن طريق الـ ref، يعني uncontrolled، فمفيش render مع كل حرف. والـ component بيعيد الرسم بس لما حاجة انت بتقراها من [[formState]] تتغير (زي [[errors]] أو [[isSubmitting]])، لأن formState مراقَب: اللي مش بتقراه مش بيتتبع.

[[handleSubmit(onSubmit)]] بيعمل preventDefault، ويمرر القيم على الـ resolver (يعني [[schema.parse]])، لو فيه أخطاء يحطها في errors ويعمل focus على أول خانة غلط، ولو سليمة ينادي onSubmit بالبيانات بعد ما zod حوّلها. و isSubmitting بتفضل true طول ما الـ promise بتاعة onSubmit شغالة، عشان كده الـ await مهم.

الـ validation افتراضيًا بيحصل عند الإرسال، وبعد أول محاولة بيتعاد مع كل تغيير عشان الرسالة تختفي أول ما المستخدم يصلّح. و [[mode: 'onBlur']] بيغيّر ده.

[[setError('password', ...)]] بيحط خطأ على خانة بعينها، وبيتمسح لوحده أول ما الخانة تتعاد validation (المستخدم كتب حرف)، وده اللي انت عايزه: «الباسورد غلط» ملوش معنى بعد ما غيّره. أما [[root.server]] فخطأ مش تبع خانة، بيتمسح مع أول submit جديد. ولو السيرفر رجّع أخطاء لكل خانة (زي [[{ fieldErrors: { email: [...] } }]])، لف عليها ونادي setError لكل واحدة (الدرس الجاي بعد الجاي).

في Zod 4 [[z.email()]] بقت top-level ([[z.string().email()]] لسه شغالة بس deprecated)، والرسالة ممكن تتبعت string مباشرة. و [[z.infer<typeof schema>]] بيطلّع الـ type، فمفيش interface منفصل يتلخبط مع الـ schema.

والـ components اللي مش input عادي (date picker من مكتبة، أو select من shadcn) بتستخدم [[<Controller>]]، والـ lists اللي بتكبر وتصغر [[useFieldArray]] (الدرس الجاي). وأحسن حاجة: الـ schema نفسها تتحط في ملف مشترك والـ backend يعمل بيها parse للـ body.`,
            when: "أي فورم فيه أكتر من ٣ خانات أو validation حقيقي: تسجيل، ودفع، وإعدادات، وفورم admin لمنتج.",
            mistakes: R`الـ validation في الفرونت بس، والـ API بيقبل أي حاجة. ونسيان [[noValidate]] فرسايل المتصفح تطلع قبل رسايلك. و [[type="number"]] من غير [[z.coerce.number()]] أو [[valueAsNumber]]، فالقيمة بتوصل string والـ schema ترفض. و onSubmit مش بترجع promise (نسيت await) فـ isSubmitting بترجع false على طول والمستخدم يدوس مرتين. و [[setError]] على اسم خانة مش موجود في الفورم، فالرسالة متظهرش في أي حتة. وتقول «إيميل مش موجود» أو «باسورد غلط» كل واحدة لوحدها في صفحة الدخول: كده بتقول للمهاجم أنهي إيميلات متسجلة، فرسالة واحدة للاتنين.`
          },
          lines: [
            "hook الفورم.",
            "الجسر بين RHF و zod.",
            "zod لوصف البيانات.",
            "الـ schema: إيميل صحيح، وباسورد ٨ حروف على الأقل، ورسالة لكل قاعدة.",
            "نوع البيانات بيطلع من الـ schema نفسها.",
            "onLogin بتبعت الطلب وترجّع الـ Response، والفورم يقرر يعرض إيه.",
            "register للخانات، و handleSubmit للإرسال، و setError لأخطاء السيرفر، والأخطاء وحالة الإرسال.",
            "دي بتتنادى بس لو zod قال البيانات سليمة.",
            "ابعت واستنى، و isSubmitting فاضلة true طول الوقت ده.",
            "401: خطأ على خانة الباسورد، بيظهر مكان رسايل zod بالظبط.",
            "أي فشل تاني: خطأ عام مش تبع خانة.",
            "قفلة onSubmit.",
            "بداية الـ JSX.",
            "[[noValidate]] يقفل رسايل المتصفح عشان رسايل zod هي اللي تظهر.",
            "register بيرجّع name و onChange و onBlur و ref، والـ spread بيحطهم.",
            "نفس الكلام للباسورد.",
            "أول رسالة خطأ لخانة، سواء من zod أو من السيرفر.",
            "الخطأ العام.",
            "الزرار مقفول طول ما الطلب شغال.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`الباسورد القصير: «At least 8 characters» تظهر ومفيش أي طلب (onLogin متنادتش). البيانات السليمة: الزرار بيبقى disabled ثانيتين، وبعدين «Wrong email or password» تحت الخانات. أول ما تكتب حرف في الباسورد الرسالة بتختفي، لأن RHF بيعيد الـ validation مع كل تغيير بعد أول submit، والخانة بقت سليمة فخطأ السيرفر بيتمسح.

مع 500 تظهر «Server error, try again» بدل رسالة الباسورد، وبتفضل لحد الـ submit الجاي.

لو الزرار مبيتقفلش، onSubmit مش بتستنى الـ promise (ناقص [[await]]). ولو الرسالة مش ظاهرة خالص، اتأكد إن اسم الخانة في setError هو نفسه اللي في register.`,
          solCode: R`<LoginForm
  onLogin={() => new Promise<Response>(r => setTimeout(() => r(new Response(null, { status: 401 })), 2000))}
/>
// وللتجربة التانية: { status: 500 }`
        },
        {
          cmd: "useFieldArray و Controller",
          title: "فورم فيه lines بتزيد وتقل، وخانات من مكتبات مش input عادي",
          desc: R`[[useFieldArray]] بيدير array جوه الفورم: فاتورة فيها أصناف، أو منتج ليه variants، أو أرقام تليفون. بيدّيك [[fields]] ترسمها، و [[append]] و [[remove]] و [[move]]، وكل خانة بتتسجّل باسم فيه الـ index: [[register($__btlines.$__{index}.item$__bt)]]، يعني [[lines.0.item]].

و [[<Controller>]] للخانات اللي مبتقبلش [[ref]] ولا [[onChange(event)]] عادي: date picker بيرجّع Date، أو Select من shadcn بيرجّع string في [[onValueChange]]، أو rich text editor. الـ Controller بيدّيك [[field.value]] و [[field.onChange]] و [[field.onBlur]] وانت توصّلهم للمكتبة.`,
          example: R`import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  customer: z.string().min(1, 'Required'),
  dueDate: z.date({ error: 'Pick a date' }),
  lines: z.array(z.object({ item: z.string().min(1, 'Required'), qty: z.number().int().positive() })).min(1, 'Add at least one line'),
})
type Invoice = z.infer<typeof schema>

export function InvoiceForm({ onSave }: { onSave: (data: Invoice) => void }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Invoice>({
    resolver: zodResolver(schema),
    defaultValues: { customer: '', lines: [{ item: '', qty: 1 }] },
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
  return (
    <form onSubmit={handleSubmit(onSave)} noValidate>
      <input aria-label="Customer" {...register('customer')} />
      <Controller control={control} name="dueDate" render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} onBlur={field.onBlur} />} />
      {errors.dueDate && <p role="alert">{errors.dueDate.message}</p>}
      {fields.map((field, index) => (
        <div key={field.id}>
          <input aria-label={$__btItem $__{index + 1}$__bt} {...register($__btlines.$__{index}.item$__bt)} />
          <input aria-label={$__btQty $__{index + 1}$__bt} type="number" {...register($__btlines.$__{index}.qty$__bt, { valueAsNumber: true })} />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      {errors.lines?.root && <p role="alert">{errors.lines.root.message}</p>}
      <button type="button" onClick={() => append({ item: '', qty: 1 })}>Add line</button>
      <button>Save</button>
    </form>
  )
}`,
          try: R`اعمل [[DatePicker]] بسيط: [[<input type="date">]] بياخد [[value?: Date]] ويرجّع [[new Date(e.target.value)]] في onChange. شغّل الفورم: امسح السطر الوحيد ودوس Save واقرا الرسايل. بعدين ضيف سطرين، واكتب في التاني [[Pen]] و [[3]]، واطبع البيانات في onSave. وأخيرًا امسح السطر الأول من سطرين مكتوبين، واتأكد إن اللي فضل ظاهر هو نفسه اللي بيتبعت.`,
          flag: "script",
          deep: {
            why: R`الفواتير، والطلبات، والـ variants، وأسئلة الاستبيان، كلها lists جوه فورم، والمستخدم بيضيف ويمسح ويرتّب. لو عملتها بـ [[useState]] لـ array بإيدك، هتكتب منطق الإضافة والمسح والـ ids والأخطاء لكل سطر، وهتتلخبط مع RHF. وخانات المكتبات (date pickers و selects و color pickers) مبتشتغلش مع [[register]] لأنها مش [[<input>]] حقيقي.`,
            how: R`[[useFieldArray({ control, name: 'lines' })]] بيقرا الـ array من الفورم ويرجّع [[fields]]: نفس العناصر ومعاها [[id]] ثابت بيعمله هو. الـ id ده هو الـ key الصح، مش الـ index، لأن لما تمسح سطر من النص الـ indexes بتتزحلق (نفس درس key في المستوى الأول). و [[append]] و [[remove]] بيعدّلوا قيم الفورم نفسها، والـ validation بيشوف الـ array كلها.

الأسماء المتداخلة: [[lines.1.qty]] بيقول لـ RHF «خانة qty في السطر التاني»، و TypeScript بيتحقق من الاسم ده من نوع الفورم، فلو كتبت [[lines.1.qtty]] هيطلع error. و [[valueAsNumber: true]] بيحوّل النص لرقم قبل zod، وإلا [[z.number()]] هيرفض.

أخطاء الـ array ليها مكانين: [[errors.lines?.[1]?.item]] لخطأ في سطر معين، و [[errors.lines?.root]] للقاعدة على الـ array كلها ([[min(1)]]).

الـ Controller: بدل ref، بيسجّل الخانة ويدّيك [[field]] فيه [[value]] و [[onChange]] (بياخد القيمة نفسها مش event) و [[onBlur]] و [[name]] و [[ref]] (لو المكتبة بتقبل ref، ابعته عشان الـ focus على أول خطأ يشتغل). و [[fieldState]] فيه [[error]] و [[isDirty]] للخانة دي. ولأن القيمة بقت في state الـ Controller، الخانة دي بقت controlled وبتعيد رسم نفسها بس مع كل تغيير، مش الفورم كله.

و [[z.date({ error: 'Pick a date' })]] في Zod 4: [[error]] هو الاسم الجديد لـ [[required_error]] و [[invalid_type_error]] القديمة.`,
            when: R`أي فورم فيه عدد متغير من العناصر (أصناف، ومرفقات، وروابط سوشيال، وأوقات عمل)، وأي خانة من مكتبة UI (shadcn Select و DatePicker و Combobox، و react-select، ومحررات النصوص).`,
            mistakes: R`[[key={index}]] بدل [[field.id]]: أي state جوه السطر (مفتوح، أو focus، أو state بتاعة picker) بتتزحلق للسطر الغلط لما تمسح من النص. و [[register]] على component من مكتبة ملوش ref ولا onChange عادي: القيمة بتفضل undefined. وتنسى [[defaultValues]] للـ array فأول render مفيش أسطر. و [[type="number"]] من غير [[valueAsNumber]]. وتستخدم [[watch()]] للفورم كله عشان تحسب الإجمالي، فكل حرف يعيد رسم كل حاجة: [[useWatch({ control, name: 'lines' })]] في component صغير للإجمالي بس أحسن.`
          },
          lines: [
            "useFieldArray للـ lists، و Controller للخانات الخاصة.",
            "الجسر مع zod.",
            "zod.",
            "الـ schema:",
            "اسم العميل إجباري.",
            "تاريخ حقيقي (Date مش string)، و error رسالته لو فاضي.",
            "array من أسطر، كل سطر صنف وكمية رقم صحيح موجب، وسطر واحد على الأقل.",
            "قفلة الـ schema.",
            "النوع من الـ schema.",
            "الفورم.",
            "control مهم هنا: useFieldArray و Controller بيتربطوا بيه.",
            "الـ resolver.",
            "القيم الأولى: سطر واحد فاضي.",
            "قفلة useForm.",
            "fields للرسم، و append و remove للتعديل.",
            "بداية الـ JSX.",
            "الفورم.",
            "خانة عادية بـ register.",
            "خانة التاريخ من component مش input عادي: Controller بيوصّل value و onChange و onBlur.",
            "رسالة خطأ التاريخ.",
            "ارسم كل سطر:",
            "الـ key هو field.id الثابت، مش الـ index.",
            "اسم الخانة فيه رقم السطر: lines.0.item.",
            "والكمية تتحول رقم قبل zod.",
            "مسح السطر ده.",
            "قفلة السطر.",
            "قفلة الـ map.",
            "خطأ على الـ array كلها (مفيش ولا سطر).",
            "إضافة سطر جديد بقيم أولى.",
            "الإرسال.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`لما تمسح السطر الوحيد وتدوس Save يظهر «Add at least one line» و «Pick a date» (والـ customer فاضي كمان). بعد ما تكمّل، onSave بتوصلها بيانات فيها سطرين [[{ item: 'Mug', qty: 1 }]] و [[{ item: 'Pen', qty: 3 }]]، والكمية رقم مش نص، و [[dueDate]] من نوع Date.

لما تمسح الأول من [[Mug]] و [[Pen]]، اللي يفضل ظاهر [[Pen]] واللي يتبعت سطر واحد [[{ item: 'Pen', qty: 1 }]]. ومعلومة: لو جرّبت [[key={index}]] في الفورم البسيط ده هتلاقي النتيجة نفسها، لأن RHF بيرجع يكتب القيم في الخانات بعد المسح. المشكلة بتظهر أول ما السطر يبقى component ليه state جوه (سطر مفتوح ولا مقفول، أو date picker ليه state داخلية، أو animation): الـ state دي بتتزحلق للسطر اللي بعده، زي درس key بالظبط. عشان كده الـ docs بتاعة RHF بتقول [[field.id]] دايمًا.

لو الكمية وصلت [[NaN]] أو zod قال «expected number»، ناقصك [[valueAsNumber]].`,
          solCode: R`function DatePicker({ value, onChange, onBlur }: { value?: Date; onChange: (d: Date) => void; onBlur: () => void }) {
  return (
    <input
      aria-label="Due date"
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ''}
      onChange={e => onChange(new Date(e.target.value))}
      onBlur={onBlur}
    />
  )
}
<InvoiceForm onSave={data => console.log(data)} />`
        },
        {
          cmd: "zod مشتركة مع الـ API",
          title: "schema واحدة للفورم وللـ API، وأخطاء السيرفر ترجع تحت الخانة الصح",
          desc: R`الـ validation في الفرونت للـ UX بس، والسيرفر لازم يتحقق تاني لأن أي حد يقدر يبعت request من غير الفورم. بدل ما تكتب القواعد مرتين، حط الـ schema في ملف مشترك ([[shared/schemas/signup.ts]]) والفرونت والـ API الاتنين يعملوا import منه.

والـ API لما يرفض يرجّع الأخطاء بنفس أسماء الخانات ([[z.flattenError(error).fieldErrors]])، والفورم يلف عليها بـ [[setError]]. كده «الإيميل ده متسجل» بتظهر تحت خانة الإيميل، مش في toast بعيد.`,
          example: R`// shared/schemas/signup.ts
import { z } from 'zod'
export const signupSchema = z.object({ email: z.email('Enter a valid email'), password: z.string().min(8, 'At least 8 characters') })
export type SignupInput = z.infer<typeof signupSchema>
// server: Express route (أو Route Handler في Next)
app.post('/api/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ fieldErrors: z.flattenError(parsed.error).fieldErrors })
  if (await users.exists(parsed.data.email)) return res.status(409).json({ fieldErrors: { email: ['Email already registered'] } })
  res.status(201).json(await users.create(parsed.data))
})
// client: نفس الـ schema في الفورم، وأخطاء السيرفر لكل خانة
async function onSubmit(data: SignupInput) {
  const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (res.ok) return onDone()
  const body: { fieldErrors?: Partial<Record<keyof SignupInput, string[]>> } = await res.json().catch(() => ({}))
  for (const [field, messages] of Object.entries(body.fieldErrors ?? {})) setError(field as keyof SignupInput, { message: messages?.[0] })
  if (!body.fieldErrors) setError('root.server', { message: 'Something went wrong, try again' })
}`,
          try: R`اعمل ملف [[signup.ts]] فيه الـ schema، واستخدمه في فورم بـ [[zodResolver(signupSchema)]]. شغّل API صغير (Express أو MSW) بيرجّع 409 للإيميل [[taken@example.com]]. سجّل بيه وشوف الرسالة تحت خانة الإيميل. بعدين ابعت للـ API مباشرة بـ curl إيميل غلط وباسورد قصير وحقل زيادة [[role: "admin"]]، واقرا الرد.`,
          flag: "script",
          deep: {
            why: R`لو القواعد مكتوبة مرتين، هيختلفوا: الفرونت يقول الباسورد ٨ حروف والـ API يقبل ٦، أو العكس فالمستخدم يعدّي الفورم ويترفض من غير ما يعرف ليه. و «الإيميل متسجل» مينفعش يتعرف غير في السيرفر، فلازم طريق يرجّع بيه الخطأ للخانة الصح.`,
            how: R`zod مالوش علاقة بالمتصفح ولا بـ Node، فنفس الملف بيشتغل في الاتنين. في monorepo بيبقى package ([[packages/shared]] وتستورده [[@acme/shared]])، وفي Next.js ملف في [[lib/schemas]] بيستخدمه الفورم الـ client والـ Server Action الاتنين. المهم الملف ده ميعملش import لحاجة server-only (Prisma مثلًا)، وإلا هتدخل الـ bundle بتاع المتصفح.

[[safeParse]] مبترميش: بترجّع [[{ success, data }]] أو [[{ success: false, error }]]. و [[data]] هنا بعد التنضيف: zod بيشيل أي key مش في الـ schema (زي [[role]])، فمحدش يقدر يبعت [[role: 'admin']] ويتحفظ في الداتابيز (mass assignment). و [[z.flattenError(error)]] في Zod 4 بترجّع [[{ formErrors, fieldErrors: { email: ['...'] } }]]، وده شكل مناسب يرجع للفرونت كما هو.

في الفرونت، الـ response ليه تلات حالات: نجح، أو أخطاء لكل خانة (400 من zod أو 409 من قاعدة بيزنس)، أو حاجة تانية (500 أو الشبكة وقعت أو رد مش JSON، ومن هنا الـ [[.catch(() => ({}))]]). الأخطاء لكل خانة بتروح لـ setError بنفس الاسم، والباقي [[root.server]].

والرسايل: خليها في الـ schema بالإنجليزي أو كمفاتيح ترجمة ([['errors.email']]) والفرونت يترجمها بـ [[t(message)]]، عشان السيرفر ميعرفش لغة المستخدم.`,
            when: R`أي فورم ليه endpoint بتاعك: تسجيل، وطلب، وإعدادات. وأهم ما يكون في Next.js، لأن الـ Server Action والفورم في نفس المشروع، فمفيش عذر للتكرار.`,
            mistakes: R`validation في الفرونت بس، و API بيعمل [[db.user.create({ data: req.body })]]: أي حد يبعت [[role]] أو [[isVerified]]. والملف المشترك بيعمل import لـ Prisma أو [[process.env]] فيكسر build المتصفح أو يسرّب أسرار. والـ API بيرجّع رسالة نصية واحدة ([[Email taken]]) والفرونت مش عارف يحطها فين. و [[setError]] لأسماء مش موجودة في الفورم (السيرفر قال [[user_email]] والفورم [[email]]). وتعتمد إن أخطاء السيرفر دايمًا JSON: الـ proxy أو Nginx ممكن يرجّع HTML في 502.`
          },
          lines: [
            "الـ schema والـ type في ملف واحد مشترك.",
            "نفس القواعد والرسايل للاتنين.",
            "والنوع للاتنين.",
            "الـ API.",
            "parse من غير throw، والـ data بعدها من غير أي key زيادة.",
            "فشل: 400 ومعاه الأخطاء لكل خانة بنفس الأسماء.",
            "قاعدة ميعرفهاش غير السيرفر: 409 بنفس الشكل.",
            "نجح: اعمل المستخدم بالبيانات المنضفة بس.",
            "قفلة الـ route.",
            "في الفورم، بعد ما zodResolver وافق بنفس الـ schema:",
            "ابعت للـ API.",
            "نجح؟ خلصنا.",
            "اقرا الرد، ولو مش JSON اعتبره فاضي.",
            "كل خطأ يروح تحت خانته.",
            "مفيش أخطاء خانات؟ رسالة عامة.",
            "قفلة."
          ],
          sol: R`الإيميل [[taken@example.com]] المفروض يطلع «Email already registered» تحت خانة الإيميل نفسها، والخانة تتعلّم ([[aria-invalid]] لو حاططه). ولو كتبت فيها حرف الرسالة بتختفي.

الـ curl هيرجّع 400 وشكله:
[[{"fieldErrors":{"email":["Enter a valid email"],"password":["At least 8 characters"]}}]]
مفيش حاجة عن [[role]]، لأن zod بيتجاهل الـ keys اللي مش في الـ schema. ولو بعت بيانات سليمة ومعاها role، الـ [[parsed.data]] هيطلع من غير role. لو عايز ترفض الطلب كله لو فيه keys زيادة استخدم [[z.strictObject]].

لو الرسالة ظهرت في «Something went wrong»، الـ API مش بيرجّع [[fieldErrors]] بنفس الشكل، أو الـ Content-Type مش JSON.`,
          solCode: R`curl -s -X POST http://localhost:4000/api/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"x","password":"1","role":"admin"}'
# {"fieldErrors":{"email":["Enter a valid email"],"password":["At least 8 characters"]}}

// MSW بدل API حقيقي:
http.post('/api/signup', async ({ request }) => {
  const body = (await request.json()) as { email: string }
  if (body.email === 'taken@example.com') {
    return HttpResponse.json({ fieldErrors: { email: ['Email already registered'] } }, { status: 409 })
  }
  return HttpResponse.json({ id: 'u1' }, { status: 201 })
})`
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
            mistakes: R`[[<a href="/cart">]] جوه التطبيق: reload كامل والـ state كلها بتروح. ومفيش route لـ [[*]] فالمسار الغلط يطلع صفحة فاضية (في الـ declarative mode) أو شاشة الخطأ الافتراضية «Unexpected Application Error! 404 Not Found» (في الـ data mode). وفي مشروع حقيقي كل route من ٢٥ كان مكتوب [[<MainLayout><Page /></MainLayout>]] بإيده بدل layout route واحد فيه Outlet. وخلط [[react-router-dom]] و [[react-router]] بنسخ مختلفة في نفس المشروع.`
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
          ],
          sol: R`[[/products/7]] بيعرض الـ nav وتحته «Product 7»، لأن الـ Layout بيترسم والـ [[Outlet]] مكانه الصفحة المطابقة، و [[useParams]] بيطلّع [[id: '7']] كنص. [[/xyz]] مفيش route مطابق غير [[*]] فبيظهر NotFound جوه الـ Layout.

مع [[Link]]: تاب Network مفيهوش طلب document جديد، والـ URL بيتغير والصفحة بتتبدل فورًا. مع [[<a href>]]: طلب document كامل، و JS بيتحمّل من الأول، وأي state (زي عداد) بترجع صفر. ولو عملت refresh على [[/products/7]] في [[npm run preview]] واشتغل، ده لأن Vite بيرجع [[index.html]] لأي مسار. على سيرفر حقيقي لازم تعمل نفس الـ fallback، وإلا هتاخد 404.`,
          solCode: R`const Home = () => <h1>Home</h1>
const NotFound = () => <h1>Page not found</h1>`
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
          try: R`اعمل [[useAuth]] بيرجّع [[isLoading: true]] ثانيتين وبعدين user. امسح سطر الـ isLoading وشوف إن المستخدم الداخل بيتحوّل للـ login في أول ثانيتين ويفضل هناك رغم إن الـ user وصل بعدها.`,
          flag: "script",
          deep: {
            why: "صفحات زي الـ dashboard والـ checkout مالهاش معنى من غير مستخدم، والأحسن تحوّله للدخول بدل ما يشوف صفحة فاضية أو errors. ولما يدخل يرجع للمكان اللي كان عايزه، مش للصفحة الرئيسية.",
            how: R`route من غير [[path]] بس فيه [[children]] اسمه layout route: بيلف مجموعة صفحات، ويرسم [[<Outlet />]] لو مسموح. كده بتحمي عشر صفحات بمكان واحد.

[[<Navigate>]] بيعمل تحويل وقت الرسم. و [[replace]] بيستبدل الصفحة المحمية في الـ history بدل ما يضيف، فلما المستخدم يدوس Back من صفحة الدخول ميرجعش للمحمية فيتحوّل تاني (loop). و [[state]] بيعدّي بيانات للصفحة الجاية من غير ما تظهر في الـ URL.

الـ isLoading مهمة: بعد refresh التطبيق لسه مايعرفش المستخدم (بيطلب [[/api/me]] بالـ cookie). لو حكمت إنه «مش داخل» في اللحظة دي، هتحوّل ناس داخلين فعلًا.

في الـ data mode تقدر تعمل الفحص في loader أو middleware (بقى default في v8)، وترجّع [[redirect('/login')]] قبل ما الصفحة تترسم خالص.

والصلاحيات في الفرونت شكل بس: إخفاء زرار «امسح» عن المستخدم العادي كويس للـ UX، بس الـ endpoint نفسه لازم يرفض. أي حد يقدر يبعت الـ request من curl.`,
            when: "Dashboard، و checkout، وإعدادات الحساب، ولوحة الأدمن (بـ role).",
            mistakes: R`مفيش حالة loading فبيحصل flicker. ومن غير [[replace]] فالـ Back بيعمل loop. وتحمي في الفرونت بس والـ API مفتوح. وتخزين الـ JWT في localStorage: أي XSS يسرقه، والأأمن httpOnly cookie (تاب أمان الموقع). وفي مشروع حقيقي كان الـ role بيتقارن بـ [['ADMIN']] و [['admin']] الاتنين، لأن الـ backend والفرونت مش متفقين على الشكل: وحّده في مكان واحد.`
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
          ],
          sol: R`بالسطر موجود: spinner ثانيتين وبعدين الـ dashboard. من غيره: أول render الـ user لسه null، فالـ Navigate يحوّلك لـ [[/login]] على طول، وبعد ثانيتين الـ user يوصل بس انت خلاص بقيت في صفحة الـ login، و RequireAuth مش مترسوم أصلًا عشان يرجّعك.

«لسه مش عارف» غير «مش مسجّل». أي auth بيتقري من سيرفر أو من storage بشكل async محتاج حالة loading منفصلة. ولو لقيت إن الـ login بيرجّعك للـ dashboard بعد ما تسجّل، ده الـ [[state.from]] شغال صح.`,
          solCode: R`function useAuth() {
  const [state, setState] = useState<{ user: User | null; isLoading: boolean }>({ user: null, isLoading: true })
  useEffect(() => {
    const id = setTimeout(() => setState({ user: { id: 1, name: 'Sara', role: 'admin' }, isLoading: false }), 2000)
    return () => clearTimeout(id)
  }, [])
  return state
}`
        }
      ]
    }
]);

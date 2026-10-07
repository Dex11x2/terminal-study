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
          teach: R`## الفكرة: متعيدش اللي ملوش لازمة

كل render بيشغّل جسم الـ component من أوله لآخره: كل حساب بيتعاد، وكل دالة بتتعمل من جديد. [[useMemo]] بيقول لـ React «افتكري نتيجة الحساب ده، ومتعيديهوش غير لو حاجة من دول اتغيرت»، و [[useCallback]] نفس الكلام بس للدالة نفسها. اتشغّل في Vite 8.3 + React 19.3 في Chrome headless، والضغط بـ Playwright. (شغّلناه من غير Strict Mode عشان كل سطر يتطبع مرة واحدة.)

---

## ١. الـ props والـ state

~~~text ProductsPage.tsx
function ProductsPage({ products, query }: { products: Product[]; query: string }) {
  const [sort, setSort] = useState<'price' | 'name'>('name')
~~~

- [[{ products, query }]]: الـ props متفكوكة (destructuring)، وبعد [[:]] نوعهم في TypeScript: [[Product[]]] يعني array من المنتجات، و [[query]] نص البحث.
- [[useState<'price' | 'name'>('name')]]: طريقة الترتيب. [[<'price' | 'name'>]] بيقول لـ TypeScript إن القيمة واحدة من الكلمتين دول بس، والبداية [[name]].

## ٢. [[useMemo]]: الحساب المحفوظ

~~~text ProductsPage.tsx
const visible = useMemo(
  () => products
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sort === 'price' ? a.price - b.price : a.name.localeCompare(b.name))),
  [products, query, sort]
)
~~~

[[useMemo]] بياخد حاجتين:

1. **دالة من غير parameters** ([[() => ...]]) بترجّع النتيجة. React هي اللي بتناديها، مش انت.
2. **array الـ dependencies**: كل القيم من برا اللي الدالة بتستخدمها، هنا [[products]] و [[query]] و [[sort]].

جوه الدالة، من جوه لبرة:

### [[.filter(...)]]

- [[p.name.toLowerCase()]]: اسم المنتج بحروف صغيرة، عشان [[Mug]] و [[mug]] يبقوا زي بعض.
- [[.includes(query.toLowerCase())]]: الاسم فيه كلمة البحث؟ لو [[query]] فاضي، [[includes('')]] دايمًا [[true]]، فكل المنتجات بتعدّي.
- [[filter]] بترجّع **array جديدة** فيها اللي عدّى بس.

### [[.sort(...)]]

- [[sort]] بتاخد دالة مقارنة [[(a, b) => رقم]]: لو الرقم سالب [[a]] قبل [[b]]، لو موجب العكس.
- [[sort === 'price' ? ... : ...]]: الـ [[? :]] (ternary) يعني «لو كذا خد الأولى، غير كده خد التانية».
- [[a.price - b.price]]: ترتيب بالسعر من الأرخص.
- [[a.name.localeCompare(b.name)]]: مقارنة نصوص بالترتيب الأبجدي حسب اللغة.
- [[sort]] بتعدّل الـ array اللي اتنادت عليها في مكانها. هنا ده آمن لأنها بتتنادى على الـ array الجديدة اللي [[filter]] عملتها، مش على [[products]] الأصلية.

### الـ dependencies

لما الـ component يترسم تاني، React بتقارن كل dependency بقيمتها اللي فاتت بـ [[Object.is]] (مقارنة مرجع للـ objects والـ arrays، وقيمة للأرقام والنصوص). لو الـ ٣ زي ما هما، بترجّع [[visible]] القديمة بالظبط (نفس الـ array)، من غير ما تنادي الدالة.

## ٣. [[useCallback]]: الدالة المحفوظة

~~~text ProductsPage.tsx
const handleAdd = useCallback((id: string) => addToCart(id), [])
~~~

- من غير [[useCallback]]، [[(id) => addToCart(id)]] بتتعمل دالة جديدة كل render. نفس الكود، بس **مرجع** جديد، و [[Object.is]] بيقول إنها مختلفة.
- [[useCallback(fn, deps)]] بيرجّع نفس الدالة طول ما الـ deps زي ما هي. هي بالظبط [[useMemo(() => fn, deps)]].
- الـ deps فاضية لأن الدالة مش بتستخدم أي حاجة من جوه الـ component.

## ٤. [[setSort]] من غير حاجة

~~~text ProductsPage.tsx
return <ProductGrid items={visible} onAdd={handleAdd} onSort={setSort} />
~~~

دالة الـ set اللي بيرجّعها [[useState]] مرجعها ثابت من React طول عمر الـ component، فبتتبعت على طول.

## ٥. [[memo]]: اللي بيستفيد من كل ده

~~~text ProductsPage.tsx
const ProductGrid = memo(function ProductGrid({ items, onAdd, onSort }: GridProps) {
  return <Grid items={items} onAdd={onAdd} onSort={onSort} />
})
~~~

[[memo(Component)]] بيرجّع نسخة من الـ component بتقارن الـ props الجديدة بالقديمة (كل prop بـ [[Object.is]])، ولو كلها زي ما هي **بتتخطى الـ render**. وده سبب وجود الـ useMemo والـ useCallback فوق: من غيرهم [[items]] و [[onAdd]] مرجع جديد كل مرة، فالـ memo مبيلاقيش props زي ما هي أبدًا.

---

## ٦. اللي حصل

حطينا الصفحة في App فيه خانة البحث وزرار [[tick]] بيغيّر state ملهاش علاقة بالمنتجات، و [[console.log]] جوه دالة الـ useMemo وجوه [[ProductGrid]]. ٤ منتجات: Mug و Pen و Lamp و Map.

~~~text الـ Console (Chrome)
[log] filter+sort run 1
[log] ProductGrid render Lamp|Map|Mug|Pen
>> tick
>> type m
[log] filter+sort run 2
[log] ProductGrid render Lamp|Map|Mug
>> By price
[log] filter+sort run 3
[log] ProductGrid render Map|Mug|Lamp
~~~

| الحدث | الحساب اتعاد؟ | ProductGrid اترسم؟ | ليه |
|---|---|---|---|
| أول render | أيوه | أيوه | مفيش حاجة محفوظة لسه |
| [[tick]] | لأ | لأ | الـ deps الـ ٣ زي ما هي، فـ [[visible]] نفس الـ array، و [[handleAdd]] نفس الدالة |
| كتبنا [[m]] | أيوه | أيوه | [[query]] اتغيرت. و Lamp فيها m |
| By price | أيوه | أيوه | [[sort]] اتغيرت: Map (20) ثم Mug (50) ثم Lamp (300) |

### من غير [[useCallback]]

شلنا الـ useCallback بس وسيبنا الـ useMemo، ودوسنا [[tick]] مرتين:

~~~text الـ Console
>> tick
[log] ProductGrid render Lamp|Map|Mug|Pen
>> tick
[log] ProductGrid render Lamp|Map|Mug|Pen
~~~

الحساب مش بيتعاد (useMemo لسه موجود)، بس [[ProductGrid]] بيترسم مع كل tick، لأن [[onAdd]] بقت دالة جديدة. prop واحدة اتغيرت تكفي إن الـ memo يعيد الرسم.

---

## ٧. يستاهل ولا لأ؟ قيس

قسنا الفلترة والترتيب من غير useMemo بـ [[performance.now()]] في Chrome headless، ٥ مرات لكل حجم (الأرقام بتختلف حسب الجهاز):

~~~text الناتج
20:    6.30ms  0.00ms  0.00ms  0.00ms  0.00ms
20000: 3.90ms  3.70ms  3.00ms  2.00ms  2.10ms
~~~

- أول مرة في الـ 20 كانت بطيئة لأن المتصفح بيجهّز [[localeCompare]] أول مرة. بعدها أقل من 0.1ms: useMemo مش هتفرق.
- الـ 20 ألف بياخدوا 2 لـ 4ms **في كل render**. docs React بتقول: لو الحساب بياخد 1ms أو أكتر، useMemo تستاهل.

> useMemo مبتسرّعش أول render، هي بتوفّر الـ renders اللي بعده. ومع React Compiler (درس في المستوى التالت) الـ memoization ده بيتعمل لوحده.

---

## الخلاصة

| | بيحفظ | بيتعاد لما | فايدته |
|---|---|---|---|
| [[useMemo(() => calc, deps)]] | نتيجة الحساب | dependency تتغير | حساب تقيل، أو مرجع ثابت لـ object أو array |
| [[useCallback(fn, deps)]] | الدالة نفسها | dependency تتغير | مرجع ثابت لدالة رايحة لـ [[memo]] أو لـ effect |
| [[memo(Component)]] | آخر render | prop تتغير بـ [[Object.is]] | يتخطى render الابن |

الاتنين للأداء بس: شيلهم والكود لازم يشتغل صح برضه.`,
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
          teach: R`## الفكرة: قناة من فوق لتحت

الـ context بيحط قيمة في «قناة» عند component فوق، وأي component تحته (مهما كان عمقه) يقراها على طول من غير ما الـ props تعدّي على كل مستوى. المثال بيعمل ٣ حاجات: القناة نفسها، و provider بيملاها، و hook بيقراها. اتشغّل في Vite 8.3 + React 19.3 في Chrome headless (من غير Strict Mode عشان كل سطر يتطبع مرة).

---

## ١. شكل القيمة والقناة

~~~text AuthContext.tsx
type Auth = { user: User | null; logout: () => void }
const AuthContext = createContext<Auth | null>(null)
~~~

- [[type Auth]]: نوع TypeScript للي جوه القناة: المستخدم (أو [[null]] لو مش داخل)، ودالة خروج. [[() => void]] يعني دالة مش بتاخد حاجة ومش بترجّع حاجة.
- [[createContext<Auth | null>(null)]]: بيعمل القناة. الـ [[null]] بين القوسين هو الـ **default**: القيمة اللي أي حد هياخدها لو قرا القناة ومفيش provider فوقه. اخترنا [[null]] عشان نكشف الحالة دي بعدين.

## ٢. الـ provider

~~~text AuthContext.tsx
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const value = useMemo(() => ({ user, logout: () => setUser(null) }), [user])
  return <AuthContext value={value}>{children}</AuthContext>
}
~~~

- [[children: ReactNode]]: أي حاجة هتتحط جوه [[<AuthProvider>...</AuthProvider>]]. [[ReactNode]] نوع «أي حاجة React تعرف ترسمها».
- [[useState]]: الـ state الحقيقية عايشة هنا، في الـ provider.
- [[useMemo(..., [user])]]: بيبني الـ object [[{ user, logout }]] **مرة واحدة**، ومش بيعمل واحد جديد غير لما [[user]] يتغير. ليه ده مهم؟ تحت في التجربة.
- [[<AuthContext value={value}>]]: في React 19 الـ context نفسه بيتكتب كـ component ويبقى provider. في React 18 كانت [[<AuthContext.Provider value={value}>]] (لسه شغالة).

## ٣. hook القراية

~~~text AuthContext.tsx
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
~~~

- [[useContext(AuthContext)]]: بيطلع لفوق في الشجرة لأقرب [[<AuthContext>]] ويرجّع قيمته. مفيش؟ يرجّع الـ default ([[null]]).
- [[if (!ctx) throw ...]]: [[!ctx]] صح لو [[ctx]] بـ [[null]]. بدل ما الـ null يعدّي ويوقع الكود بعدين في مكان بعيد، بنرمي error برسالة بتقول المشكلة بالظبط.
- بعد السطر ده TypeScript عارف إن [[ctx]] نوعه [[Auth]] مش [[Auth | null]]، فاللي بيستخدم [[useAuth()]] مش محتاج يتأكد من null.

---

## ٤. اللي حصل

ركّبنا [[Consumer]] بيقرا [[useAuth()]] ويطبع [[consumer render]] وفيه زرار Logout، وزرار [[tick]] جوه الـ provider بيغيّر state تانية خالص (زي ما الـ sol بيقول). وبدأنا بـ [[user]] قيمته Sara عشان يبقى فيه حد يعمل logout.

### مع الـ useMemo

~~~text الـ Console (Chrome)
[log] consumer render Sara
>> tick
>> tick
>> Logout
[log] consumer render null
~~~

الـ tick مرتين: الـ provider اترسم، بس [[value]] هو نفس الـ object (لأن [[user]] متغيرش)، فـ React مش بتعيد رسم الـ Consumer. الـ Logout غيّر [[user]]، فـ [[useMemo]] عمل object جديد، والـ Consumer اترسم وعرض «Logged out».

### من غير الـ useMemo

بدّلناها بـ [[const value = { user, logout: () => setUser(null) }]]:

~~~text الـ Console
[log] consumer render Sara
>> tick
[log] consumer render Sara
>> tick
[log] consumer render Sara
>> Logout
[log] consumer render null
~~~

كل tick عمل object جديد. React بتقارن القيمة القديمة بالجديدة بـ [[Object.is]]: نفس المحتوى بس مرجع مختلف، يعني «اتغيرت»، فكل اللي بيقرا الـ context بيترسم تاني. مع consumer واحد مش فارق، مع ٥٠ فارق.

> ليه الـ tick جوه الـ provider مش في App؟ لأن [[Consumer]] ابن App، فلو App اترسم، الـ Consumer هيترسم كابن عادي في الحالتين، ومش هتشوف أثر الـ context.

### برا الـ provider

حطينا component بينادي [[useAuth()]] من غير [[AuthProvider]] فوقه:

~~~text الـ Console
[pageerror] useAuth must be used inside <AuthProvider>
[warning] An error occurred in the <Outside> component.
~~~

الصفحة فضيت، والرسالة بتقول بالظبط إيه الغلط وفين. من غير الـ [[throw]]، كان هيرجع [[null]] والكود يقع بعدين بـ «Cannot read properties of null».

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[createContext(default)]] | القناة، والـ default لو مفيش provider |
| [[<Ctx value={v}>]] | بيحط [[v]] لكل اللي تحته (React 19) |
| [[useContext(Ctx)]] | يقرا أقرب provider فوقه |
| [[useMemo]] للقيمة | من غيرها كل render للـ provider بيعيد رسم كل الـ consumers |
| hook بيرمي error | null صامت يتحول لرسالة واضحة |

الـ context للحاجات قليلة التغيير اللي ناس كتير محتاجاها (المستخدم، والثيم، واللغة). أي تغيير في القيمة بيعيد رسم كل اللي بيقروها.`,
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
          teach: R`## الفكرة: الـ handler يقول «إيه اللي حصل»، والـ reducer يقرر

بدل ما كل زرار يعمل [[setStep]] و [[setCity]] بإيده ويكرر القواعد، كل زرار بيبعت **حدث** (action)، ودالة واحدة اسمها reducer بتاخد الـ state الحالية والحدث وترجّع الـ state الجديدة. المثال wizard دفع من ٣ خطوات. اتشغّل في Vite 8.3 + React 19.3 في Chrome headless، والاختبار بـ Vitest 5، والـ types بـ [[tsc]] (TypeScript 6).

---

## ١. شكل الـ state

~~~text checkout.ts
type State = { step: 1 | 2 | 3; shipping: { city: string }; payment: 'cash' | 'card' | null }
~~~

- [[step: 1 | 2 | 3]]: الـ [[|]] في TypeScript معناها «أو»، فالخطوة رقم من التلاتة دول بس. لو حد كتب [[step: 4]] الـ type checker هيعترض.
- [[shipping: { city: string }]]: object جوه object.
- [[payment: 'cash' | 'card' | null]]: لسه ماختارش ([[null]]) أو واحدة من الاتنين.

## ٢. الأحداث: discriminated union

~~~text checkout.ts
type Action =
  | { type: 'setShipping'; city: string }
  | { type: 'setPayment'; method: 'cash' | 'card' }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'reset' }
~~~

كل سطر شكل حدث. الحقل المشترك [[type]] هو «المميِّز» (discriminant): لما الكود يتأكد إن [[action.type === 'setShipping']]، TypeScript بيعرف إن الـ action ده فيه [[city]]، ومش فيه [[method]]. الـ [[|]] الأولى قبل أول سطر شكل بس، عشان الأسطر تبقى متساوية.

> الأحداث متسمية باللي **حصل** ([[next]]، يعني «داس التالي»)، مش بالأمر ([[setStepTo2]]). كده القاعدة «ينفع أروح ولا لأ» تفضل في الـ reducer.

## ٣. القيمة الأولى

~~~text checkout.ts
export const initial: State = { step: 1, shipping: { city: '' }, payment: null }
~~~

[[: State]] بيخلي TypeScript يتأكد إن الـ object ده شكله صح. و [[export]] عشان الـ component والاختبار الاتنين يستوردوه.

## ٤. الـ reducer

~~~text checkout.ts
export function checkoutReducer(state: State, action: Action): State {
  switch (action.type) {
~~~

- بياخد [[state]] و [[action]]، والـ [[: State]] اللي بعد القوسين معناها «لازم ترجّع State».
- [[switch (action.type)]]: يروح للـ [[case]] اللي بيساوي نوع الحدث.

### [[setShipping]] و [[setPayment]]

~~~text checkout.ts
case 'setShipping': return { ...state, shipping: { city: action.city } }
case 'setPayment': return { ...state, payment: action.method }
~~~

[[{ ...state, ... }]]: الـ [[...]] (spread) بينسخ كل خانات [[state]] في object جديد، وبعدها الخانة اللي مكتوبة تغطي على القديمة. يعني نسخة جديدة فيها تغيير واحد، والقديمة زي ما هي (درس immutable updates).

### [[next]]

~~~text checkout.ts
case 'next':
  if (state.step === 1 && !state.shipping.city) return state
  return state.step < 3 ? { ...state, step: (state.step + 1) as State['step'] } : state
~~~

- السطر الأول القاعدة: في الخطوة ١ والمدينة فاضية ([[!'']] بـ [[true]])؟ ارجع **نفس** الـ object.
- [[state.step < 3 ? ... : state]]: لو مش آخر خطوة زوّد، غير كده ارجع زي ما انت.
- [[(state.step + 1) as State['step']]]: [[state.step + 1]] نوعه [[number]] عادي، و TypeScript مش عارف إنه هيفضل ١ أو ٢ أو ٣. [[as]] بيقوله «ثق فيا، ده واحد منهم». و [[State['step']]] يعني «نوع خانة step جوه State»، اللي هو [[1 | 2 | 3]].

### [[back]] و [[reset]]

~~~text checkout.ts
case 'back': return state.step > 1 ? { ...state, step: (state.step - 1) as State['step'] } : state
case 'reset': return initial
~~~

نفس فكرة [[next]] بالعكس، و [[reset]] بيرجّع القيمة الأولى.

### لو نسيت case

شلنا سطر [[reset]] وشغّلنا [[tsc --strict]]:

~~~text tsc
checkoutB.ts(11,64): error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
~~~

يعني: فيه مسار (حدث [[reset]]) الدالة بتخلص فيه من غير [[return]]، والنوع المطلوب [[State]] مش بيقبل [[undefined]].

---

## ٥. جوه الـ component

~~~text Checkout.tsx
const [state, dispatch] = useReducer(checkoutReducer, initial)
<button onClick={() => dispatch({ type: 'next' })}>Next</button>
~~~

- [[useReducer(reducer, initial)]]: بيرجّع زوج زي [[useState]]: الـ state الحالية، و [[dispatch]].
- [[dispatch({ type: 'next' })]]: «ابعت الحدث ده». React بتنادي [[checkoutReducer(state, { type: 'next' })]] وتاخد اللي رجع كـ state جديدة.
- [[dispatch]] مرجعها ثابت طول عمر الـ component، زي [[setState]].

## ٦. اللي حصل

عملنا الـ component اللي في الـ solCode (عنوان [[Step N]] وخانة City و Back و Next) و [[console.log]] في كل render:

~~~text الناتج (Chrome)
Next empty             Step 1
Next with city         Step 2
Next again             Step 3
Next at 3              Step 3
Back                   Step 2
~~~

- Next والخانة فاضية: فضلنا في ١. القاعدة اشتغلت من غير ما الزرار يعرف عنها حاجة.
- Next في الخطوة ٣: فضلنا في ٣ ([[step < 3]] بـ [[false]]).

### [[return state]] بيوفّر إيه بالظبط؟

حطينا ابن [[<Child />]] بيطبع، ودوسنا Next مرتين والخانة فاضية، و Back في الخطوة ١:

~~~text الـ Console
[log] render step 1 ""
[log] child render
>> Next (empty)
[log] render step 1 ""
>> Next (empty)
[log] render step 1 ""
>> Back at 1
[log] render step 1 ""
~~~

React نادت الـ component نفسه عشان تشغّل الـ reducer وتشوف النتيجة، ولما لقتها هي هي بـ [[Object.is]] **وقفت**: الابن مترسمش، والشاشة متحدثتش. لو كنا رجّعنا [[{ ...state }]] بدل [[state]]، الابن كان هيترسم كل مرة على الفاضي.

## ٧. الاختبار من غير React

~~~text checkout.test.ts
it('does not move without a city', () => {
  expect(checkoutReducer(initial, { type: 'next' })).toBe(initial)
  const s1 = checkoutReducer(initial, { type: 'setShipping', city: 'Cairo' })
  expect(checkoutReducer(s1, { type: 'next' }).step).toBe(2)
  expect(initial.shipping.city).toBe('')
})
~~~

- [[it(name, fn)]]: اختبار واحد، و [[expect(x).toBe(y)]]: بيتأكد إن [[x]] هو [[y]] بـ [[Object.is]]، يعني **نفس الـ object** مش بس نفس المحتوى.
- السطر الأخير بيتأكد إن [[initial]] نفسه متعدلش (الـ reducer مبيغيرش في المكان).

~~~text npx vitest run
 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[type Action = ... | ...]] | كل الأحداث الممكنة، و [[type]] بيميز بينهم |
| [[reducer(state, action)]] | دالة pure: state قديمة + حدث = state جديدة |
| [[return state]] | «مفيش تغيير»: React متحدّثش الشاشة ولا ترسم الأولاد |
| [[{ ...state, x }]] | نسخة جديدة فيها تغيير |
| [[dispatch(action)]] | الـ handler بيقول إيه اللي حصل وبس |

الـ reducer دالة عادية: تختبرها لوحدها، ومفيهاش fetch ولا [[Math.random()]] ولا تعديل في المكان.`,
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
            "القاعدة في مكان واحد: مفيش مدينة؟ ارجع نفس الـ state، فـ React متحدّثش الشاشة ولا ترسم الأولاد.",
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
          teach: R`## الفكرة: الـ reducer في provider، والـ state والـ dispatch في قناتين

الدرس ده بيجمع الدرسين اللي فاتوا: [[useReducer]] (قواعد التغيير في مكان واحد) جوه provider، و [[useContext]] (أي component تحت يوصل له). نفس [[checkoutReducer]] و [[initial]] و [[State]] و [[Action]] من درس useReducer. اتشغّل في Vite 8.3 + React 19.3 في Chrome headless، والكتابة والضغط بـ Playwright (من غير Strict Mode عشان كل سطر يتطبع مرة).

---

## ١. الـ imports

~~~text CheckoutContext.tsx
import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'
~~~

[[type Dispatch]] و [[type ReactNode]] أنواع TypeScript بس. كلمة [[type]] قدامهم بتقول «ده import للـ types، امسحه وقت الـ build». [[Dispatch<Action>]] نوع دالة بتاخد [[Action]] ومبترجّعش حاجة، يعني نوع [[dispatch]].

## ٢. قناتين مش واحدة

~~~text CheckoutContext.tsx
const StateCtx = createContext<State | null>(null)
const DispatchCtx = createContext<Dispatch<Action> | null>(null)
~~~

- [[StateCtx]]: فيها الـ state، وبتتغير مع كل حرف وكل خطوة.
- [[DispatchCtx]]: فيها [[dispatch]]، و [[dispatch]] مرجعها ثابت طول عمر الـ component، فالقيمة دي **عمرها ما بتتغير**.

ليه ده فارق؟ تحت في التجربة.

## ٣. الـ provider

~~~text CheckoutContext.tsx
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initial)
  return <StateCtx value={state}><DispatchCtx value={dispatch}>{children}</DispatchCtx></StateCtx>
}
~~~

- [[useReducer]] عايش هنا، مرة واحدة للـ wizard كله.
- الـ providers متداخلين: [[StateCtx]] برة و [[DispatchCtx]] جوه، و [[children]] جوه الاتنين، فأي component تحت يقدر يقرا من أي واحدة.
- مش محتاجين [[useMemo]] هنا (زي درس useContext) لأن [[state]] نفسها object مبيتعملش جديد غير لما الـ reducer يرجّع واحد جديد، و [[dispatch]] ثابتة.

## ٤. hooks القراية

~~~text CheckoutContext.tsx
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
~~~

نفس فكرة [[useAuth]]: اقرا، ولو [[null]] (مفيش provider) ارمي error واضح، وبعدها TypeScript عارف إن القيمة موجودة.

## ٥. الخطوات

~~~text Checkout.tsx
function ShippingStep() {
  const { shipping } = useCheckout()
  const dispatch = useCheckoutDispatch()
  return <><input aria-label="City" value={shipping.city} onChange={e => dispatch({ type: 'setShipping', city: e.target.value })} /><button onClick={() => dispatch({ type: 'next' })}>Next</button></>
}
~~~

- [[const { shipping } = useCheckout()]]: خد [[shipping]] بس من الـ state.
- [[<>...</>]]: Fragment، بيلم عنصرين من غير ما يزوّد [[<div>]].
- [[aria-label="City"]]: اسم للخانة لقارئ الشاشة (وللاختبارات تلاقيها بيه).
- [[onChange]]: كل حرف بيبعت [[setShipping]] بالقيمة الجديدة ([[e.target.value]]). الخانة controlled: قيمتها جاية من الـ state.
- Next بيبعت [[next]] وبس. القاعدة «مينفعش من غير مدينة» في الـ reducer.

~~~text Checkout.tsx
const StepTitle = () => <h2>Step {useCheckout().step}</h2>
export const Checkout = () => <CheckoutProvider><StepTitle /><ShippingStep /></CheckoutProvider>
~~~

- [[StepTitle]] component بسطر واحد (arrow function بترجّع JSX)، بيقرا [[step]] من نفس الـ state. مفيش props اتعدّت.
- [[Checkout]] بيلف كل حاجة في الـ provider.

---

## ٦. اللي حصل

شغّلنا الـ wizard الكامل من الـ solCode ([[PaymentStep]] و [[ReviewStep]] و [[BackButton]] و [[CurrentStep]] بيختار الخطوة حسب [[step]])، و [[console.log]] في [[StepTitle]] و [[BackButton]]. كتبنا Cai، و Next، واخترنا Card، و Next، و Confirm:

~~~text الـ Console (Chrome)
[log] StepTitle render 1
[log] BackButton render
>> type Cai
[log] StepTitle render 1
[log] StepTitle render 1
[log] StepTitle render 1
>> Next
[log] StepTitle render 2
>> Card
[log] StepTitle render 2
>> Next
[log] StepTitle render 3
>> Confirm
[log] StepTitle render 1
~~~

~~~text الـ HTML في الخطوة ٣
<h2>Step 3</h2><p>Cai · card <button>Confirm</button></p><button>Back</button>
~~~

- [[StepTitle]] بيقرا [[useCheckout()]]، فبيترسم مع **كل** تغيير في الـ state: ٣ حروف = ٣ renders، حتى لو [[step]] متغيرش. ده الثمن العادي للـ context.
- [[BackButton]] اترسم **مرة واحدة** بس طول التجربة، لأنه بيقرا [[DispatchCtx]] بس، وقيمتها متغيرتش أبدًا.
- بعد Confirm رجعنا [[Step 1]] والخانة فاضية: [[reset]] رجّع [[initial]].

### لو حطيناهم في قناة واحدة

عملنا نسخة فيها context واحد قيمته [[{ state, dispatch }]]، و [[BackButton]] بياخد [[dispatch]] منه:

~~~text الـ Console
[log] BackButton render
>> type Cai
[log] BackButton render
[log] BackButton render
[log] BackButton render
~~~

كل حرف بيعمل object جديد [[{ state, dispatch }]]، فكل اللي بيقرا القناة (حتى اللي محتاج dispatch بس) بيترسم تاني. القناتين بيحلّوا ده من غير أي [[memo]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[useReducer]] في الـ provider | state واحدة وقواعد واحدة للـ wizard كله |
| [[StateCtx]] | الـ state، واللي بيقراها بيترسم مع أي تغيير فيها |
| [[DispatchCtx]] | [[dispatch]] الثابتة، واللي بيقراها بس مبيترسمش |
| [[useCheckout()]] و [[useCheckoutDispatch()]] | قراية آمنة بتقع برسالة واضحة برا الـ provider |

لو الـ provider اتشال من الشجرة (الـ modal اتقفل مثلًا) الـ state بتروح معاه.`,
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
      <button onClick={() => dispatch({ type: 'next' })}>Next</button>
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
          teach: R`## الفكرة: دالة اسمها [[use...]] جواها hooks

الـ custom hook مش حاجة جديدة في React: دالة عادية اسمها بيبدأ بـ [[use]] وبتنادي hooks تانية ([[useState]] و [[useEffect]]). المثال [[useDebounce]]: بياخد قيمة بتتغير بسرعة (اللي بيتكتب) ويرجّع نسخة منها مبتتحدثش غير لما التغيير يقف مدة معينة. اتشغّل في Vite 8.3 + React 19.3 في Chrome headless، والكتابة بـ Playwright حرف كل 80ms (من غير Strict Mode عشان كل سطر يتطبع مرة).

---

## ١. التعريف

~~~text useDebounce.ts
export function useDebounce<T>(value: T, delay = 400): T {
~~~

- [[<T>]]: generic في TypeScript. [[T]] «أي نوع»، ويتحدد وقت الاستخدام: لو بعت string يرجع string، لو بعت رقم يرجع رقم.
- [[value: T]]: القيمة اللي بتتغير بسرعة.
- [[delay = 400]]: parameter ليه قيمة افتراضية: لو ماحددتش، 400 ميلي ثانية.
- [[: T]] بعد القوسين: بيرجّع نفس النوع.

## ٢. القيمة المتأخرة

~~~text useDebounce.ts
const [debounced, setDebounced] = useState(value)
~~~

state جوه الـ hook، بتبدأ بنفس القيمة. الـ state دي بتتسجل في الـ component اللي نادى الـ hook، يعني لو component تاني استخدم [[useDebounce]] هياخد state منفصلة خالص.

## ٣. الـ effect: timer يتلغي ويتعمل من جديد

~~~text useDebounce.ts
useEffect(() => {
  const id = setTimeout(() => setDebounced(value), delay)
  return () => clearTimeout(id)
}, [value, delay])
~~~

- [[setTimeout(fn, delay)]]: نادي [[fn]] بعد [[delay]] ميلي ثانية، وبيرجّع رقم ([[id]]) تقدر تلغيه بيه.
- [[setDebounced(value)]]: لما الوقت يخلص، القيمة المتأخرة تبقى القيمة الحالية.
- [[return () => clearTimeout(id)]]: الـ cleanup. React بتناديها **قبل** ما تشغّل الـ effect تاني، وكمان لما الـ component يتشال.
- [[[value, delay]]]: شغّل الـ effect تاني مع أي تغيير فيهم.

السيناريو مع كل حرف:

1. حرف جديد، فـ [[value]] اتغيرت.
2. React تنادي الـ cleanup القديم: الـ timer اللي فات **اتلغى** قبل ما يخلص.
3. الـ effect يعمل timer جديد.
4. لو الحرف اللي بعده جه قبل [[delay]]، نفس الكلام تاني. ولو المستخدم وقف، آخر timer بيخلص و [[debounced]] تتحدث.

## ٤. الرجوع

~~~text useDebounce.ts
return debounced
~~~

الـ hook بيرجّع القيمة المتأخرة بس. اللي بينادي مش محتاج يعرف أي حاجة عن الـ timers.

## ٥. الاستخدام

~~~text SearchPage.tsx
function SearchPage() {
  const [q, setQ] = useState('')
  const debouncedQ = useDebounce(q, 500)
  return <><input value={q} onChange={e => setQ(e.target.value)} /><Results query={debouncedQ} /></>
}
~~~

- [[q]]: اللي في الخانة دلوقتي، بيتحدث مع كل حرف (controlled input).
- [[debouncedQ]]: نفس الكلام بس متأخر 500ms بعد آخر حرف.
- الخانة بتاخد [[q]] (عشان الكتابة متتأخرش)، و [[Results]] بياخد [[debouncedQ]] (عشان البحث ميحصلش مع كل حرف).

---

## ٦. اللي حصل

[[Results]] بيطبع جوه [[useEffect]] معتمد على [[query]] (زي الـ solCode)، ومعاه الوقت من أول ما الصفحة اتفتحت ([[performance.now()]]). كتبنا [[react]] حرف كل 80ms:

~~~text الـ Console (Chrome، delay 500)
[log] search "" 207ms
>> typing react (80ms per key)
>> done typing 1620ms
[log] search "react" 2040ms
~~~

- [[search ""]] أول مرة: الـ effect بيشتغل بعد أول render دايمًا.
- ٥ حروف ومفيش غير بحث واحد. آخر حرف اتكتب حوالي 1540ms (Playwright بيستنى 80ms بعده قبل ما يكمّل، فطبعنا 1620)، والبحث 2040ms: بعد آخر حرف بـ 500ms بالظبط تقريبًا.

~~~text الـ HTML
50ms بعد الكتابة:   <input value="react"><p>Results for: </p>
750ms بعد الكتابة:  <input value="react"><p>Results for: react</p>
~~~

الخانة فيها الكلمة على طول، والنتايج لسه فاضية لحد ما الـ debounce يخلص.

### بـ delay صفر

~~~text الـ Console (delay 0)
[log] search "" 213ms
>> typing react (80ms per key)
[log] search "r" 1248ms
[log] search "re" 1283ms
[log] search "rea" 1374ms
[log] search "reac" 1467ms
[log] search "react" 1562ms
~~~

كل timer بيخلص قبل الحرف اللي بعده (0ms أقل من 80ms)، فمفيش حاجة بتتلغي: بحث مع كل حرف.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| اسمه [[use...]] | eslint و React Compiler يطبّقوا قواعد الـ hooks عليه |
| [[useState]] جواه | كل component بينادي الـ hook بياخد نسخة state خاصة بيه |
| [[setTimeout]] في effect | التأخير |
| الـ cleanup بـ [[clearTimeout]] | يلغي الـ timer القديم مع كل حرف، فمفيش غير آخر واحد اللي يخلص |
| [[<T>]] | الـ hook يشتغل مع أي نوع |

الـ hooks بتشارك **المنطق** بين الـ components، مش الـ state.`,
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
          teach: R`## الفكرة: [[useState]] بيقرا ويكتب في localStorage

hook شكله من برا زي [[useState]] بالظبط ([[[value, setValue]]])، بس القيمة الأولى جاية من localStorage لو موجودة، وكل تغيير بيتكتب فيه. فالقيمة بتفضل بعد الـ refresh وبعد ما تقفل المتصفح. اتشغّل في Vite 8.3 + React 19.3 في Chrome headless، والضغط والـ refresh بـ Playwright.

---

## ١. التعريف

~~~text useLocalStorage.ts
export function useLocalStorage<T>(key: string, initial: T) {
~~~

- [[<T>]]: generic، نوع القيمة بيتحدد من الاستخدام: [[useLocalStorage('count', 0)]] يبقى [[T]] هو [[number]].
- [[key]]: اسم الخانة في localStorage. [[initial]]: القيمة لو مفيش حاجة متخزنة.

## ٢. القراية الأولى (lazy)

~~~text useLocalStorage.ts
const [value, setValue] = useState<T>(() => {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? (JSON.parse(raw) as T) : initial
  } catch {
    return initial
  }
})
~~~

- [[useState(() => ...)]]: لما تدّي [[useState]] **دالة** بدل قيمة، React بتناديها مرة واحدة بس في أول render (lazy initializer). لو كتبت [[useState(localStorage.getItem(key))]] كانت القراية هتحصل مع كل render وتترمي.
- [[localStorage.getItem(key)]]: بيرجّع النص المتخزن، أو [[null]] لو المفتاح مش موجود.
- [[raw !== null ? ... : initial]]: موجود؟ حوّله. مش موجود؟ القيمة الافتراضية.
- [[JSON.parse(raw)]]: localStorage بيخزّن **نصوص** بس، فالرقم [[3]] متخزن [["3"]]، والـ object متخزن JSON. [[JSON.parse]] بيرجّعه لأصله.
- [[as T]]: [[JSON.parse]] بيرجّع [[any]]، والـ [[as]] بيقول لـ TypeScript يعامله كـ [[T]]. (مفيش تحقق حقيقي: لو حد كتب نوع تاني في التخزين، هيعدّي.)
- [[try { ... } catch { ... }]]: لو [[JSON.parse]] رمى error (النص مش JSON سليم)، أو المتصفح قافل التخزين، نرجع للافتراضي بدل ما الصفحة تقع. [[catch]] من غير [[(e)]] مسموحة لو مش محتاج الـ error.

## ٣. الكتابة في effect

~~~text useLocalStorage.ts
useEffect(() => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* مليان أو مقفول */ }
}, [key, value])
~~~

- [[JSON.stringify(value)]]: القيمة لنص JSON.
- [[localStorage.setItem]]: ممكن يرمي لو التخزين مليان (حوالي 5MB لكل موقع)، فبرضه جوه try.
- [[[key, value]]]: اكتب كل ما القيمة أو المفتاح يتغيروا.

ليه في effect ومش جوه دالة set بتاعتنا؟ عشان [[setValue]] اللي بنرجّعها هي بتاعة React نفسها، فبتقبل updater ([[c => c + 1]]) وبتتجمع صح. والـ effect بيكتب القيمة **النهائية** بعد الـ render.

## ٤. الرجوع

~~~text useLocalStorage.ts
return [value, setValue] as const
~~~

[[as const]] بيخلي TypeScript يفهم الـ array دي tuple ثابت: أول عنصر [[T]] وتاني عنصر دالة set. من غيرها النوع هيبقى array كل عنصر فيها «[[T]] أو دالة»، و [[count + 1]] مش هيعدّي.

---

## ٥. اللي حصل

[[ClickCounter]] من الـ solCode، وزودنا زرار [[+2]] بينادي [[setCount(c => c + 1)]] مرتين في نفس الضغطة. وكل خطوة بنطبع الزرار وقيمة [[localStorage.count]]:

~~~text الناتج (Chrome)
fresh                      button=0  localStorage.count="0"
after 3 clicks             button=3  localStorage.count="3"
after refresh              button=3  localStorage.count="3"
after +2                   button=5  localStorage.count="5"
set to bad json            button=5  localStorage.count="{bad json"
after refresh              button=0  localStorage.count="0"
~~~

- **fresh**: التخزين فاضي، فالقيمة [[0]]، والـ effect كتب [["0"]] على طول.
- **after refresh**: الـ lazy initializer قرا [["3"]] و [[JSON.parse]] رجّعه [[3]].
- **after +2**: الزيادتين اتحسبوا (3 لـ 5)، لأن الـ updaters بتتجمع في طابور React، والـ effect كتب النتيجة النهائية مرة.
- **bad json**: كتبنا [[{bad json]] بإيدنا. بعد الـ refresh، [[JSON.parse]] رمى:

~~~text Chrome
SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
~~~

الـ [[catch]] مسكه ورجّع [[0]]، والـ effect كتب [["0"]] فوق القيمة البايظة، فالتخزين اتصلّح لوحده والصفحة موقعتش.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[useState(() => ...)]] | يقرا التخزين مرة واحدة بس |
| [[JSON.parse]] / [[JSON.stringify]] | localStorage نصوص بس |
| [[try/catch]] في الاتنين | JSON بايظ، أو تخزين مليان أو مقفول |
| الكتابة في [[useEffect]] | الـ updaters تشتغل صح، والقيمة النهائية هي اللي تتكتب |
| [[as const]] | النوع يبقى tuple زي [[useState]] |

مش للبيانات الحساسة (توكنات الدخول): أي XSS يقدر يقرا localStorage.`,
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

لو الصفحة وقعت بـ [[SyntaxError: Expected property name or '}' in JSON at position 1]] (رسالة Chrome، وفي متصفحات تانية «Unexpected token»)، الـ try/catch مش حوالين الـ parse. ولو الرقم رجع صفر مع كل refresh من غير ما تبوّظ حاجة، غالبًا بتقرا في effect بعد الرسم بدل الـ lazy initializer، أو الـ key اتغير.`,
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
          teach: R`## الفكرة: المتصفح يمسك القيم، وانت تقراها مرة واحدة

في الـ controlled input القيمة في state وكل حرف بيعمل render. هنا العكس: الخانات **uncontrolled**، يعني القيمة عايشة في الـ DOM والمتصفح هو اللي بيمسكها، وانت بتلم الفورم كله مرة واحدة وقت الإرسال بـ [[FormData]]. اتشغّل في Vite 8.3 + React 19.3 في Chrome headless، والكتابة والضغط بـ Playwright.

---

## ١. الـ component ونوع [[onSend]]

~~~text ContactForm.tsx
function ContactForm({ onSend }: { onSend: (data: Record<string, string>) => Promise<void> }) {
~~~

- [[onSend]]: دالة الأب هي اللي بتبعت فعلًا (fetch مثلًا)، والفورم مالوش دعوة.
- [[Record<string, string>]]: نوع TypeScript لـ object مفاتيحه نصوص وقيمه نصوص، زي [[{ email: '...', message: '...' }]].
- [[Promise<void>]]: الدالة async، بترجّع promise مفيهاش قيمة. ده اللي بيخلينا نعمل [[await]] ونستنى الإرسال يخلص.

## ٢. الـ handler

~~~text ContactForm.tsx
async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const form = e.currentTarget
  await onSend(Object.fromEntries(new FormData(form)) as Record<string, string>)
  form.reset()
}
~~~

### [[e: FormEvent<HTMLFormElement>]]

نوع حدث الإرسال في React، و [[<HTMLFormElement>]] بيقول إن العنصر اللي عليه الحدث فورم، فـ [[e.currentTarget]] نوعه [[HTMLFormElement]].

### [[e.preventDefault()]]

الفورم في المتصفح لما يتبعت بيعمل reload للصفحة (أو يروح لـ [[action]] بتاعه). السطر ده بيمنع ده، عشان احنا اللي هنبعت بـ JavaScript.

### [[const form = e.currentTarget]]

[[currentTarget]] هو العنصر اللي الـ handler متسجّل عليه (الفورم). بنحفظه في متغير **قبل** الـ [[await]]، لأن [[currentTarget]] بيرجع [[null]] أول ما الجزء المتزامن من الـ handler يخلص. أي كود بعد [[await]] بيشتغل بعدين، برا الحدث.

### [[Object.fromEntries(new FormData(form))]]، من جوه لبرة

1. [[new FormData(form)]]: بيلف على كل خانة في الفورم **ليها [[name]]** وياخد قيمتها الحالية من الـ DOM. النتيجة أزواج [[name, value]]: [[email]] و [[message]].
2. [[Object.fromEntries(...)]]: بيحوّل الأزواج دي لـ object عادي: [[{ email: '...', message: '...' }]].
3. [[as Record<string, string>]]: الـ FormData ممكن تحتوي ملفات ([[File]])، فـ TypeScript بيقول القيم [[string | File]]. احنا عارفين إن مفيش ملفات هنا، فبنقوله يعتبرها نصوص.

### [[await onSend(...)]] ثم [[form.reset()]]

استنى الإرسال، وبعدين [[reset()]]: دالة المتصفح بترجّع كل خانة لقيمتها الأولى ([[defaultValue]]).

## ٣. الـ JSX

~~~text ContactForm.tsx
<form onSubmit={handleSubmit}>
  <input name="email" type="email" required defaultValue="you@example.com" />
  <textarea name="message" required minLength={10} />
  <button>Send</button>
</form>
~~~

- [[onSubmit]] على الفورم مش [[onClick]] على الزرار: كده الإرسال بـ Enter كمان شغال.
- [[name]]: الاسم اللي هيظهر في البيانات. من غيره الخانة مش هتتبعت.
- [[type="email"]] و [[required]] و [[minLength={10}]]: validation المتصفح نفسه. لو مش متحقق، المتصفح بيمنع الإرسال ويعرض رسالة، و [[onSubmit]] مبيتناديش أصلًا.
- [[defaultValue]]: قيمة أولى بس. مفيش [[value]] ولا [[onChange]]، فـ React مبتتحكمش في الخانة بعد كده.
- [[<button>]] جوه فورم نوعه [[submit]] من غير ما تكتب.

---

## ٤. اللي حصل

[[onSend]] بتطبع البيانات وتستنى 100ms. طبعنا [[currentTarget]] قبل الـ await وبعده:

~~~text الـ Console (Chrome)
>> Send empty message
validity: Please fill out this field.
>> Send "short"
validity: Please lengthen this text to 10 characters or more (you are currently using 5 characters).
>> Send valid
[log] before await, currentTarget = FORM
[log] sent {"email":"you@example.com","message":"Hello there, I need help"}
[log] after await, currentTarget = null
[log] reset done
after: email=you@example.com message=""
~~~

- أول ضغطتين: المتصفح منع الإرسال ([[handleSubmit]] متنادتش، مفيش [[sent]])، و [[validity]] رسالة Chrome نفسها.
- الإرسال السليم: البيانات وصلت object فيه الخانتين.
- [[currentTarget]] كان [[FORM]] قبل الـ await، وبقى [[null]] بعده. عشان كده حفظناه.
- بعد [[reset()]]: الإيميل رجع [[you@example.com]] (الـ defaultValue) مش فاضي، والرسالة فضيت.

### [[e.currentTarget.reset()]] بعد الـ await

~~~text الـ Console
[pageerror] Cannot read properties of null (reading 'reset')
~~~

والفورم مفضيش. ده الـ [[TypeError]] اللي في التجربة.

### من غير [[name]] على الـ textarea

~~~text الـ Console
[log] sent {"email":"you@example.com"}
~~~

الرسالة اتكتبت و [[required]] لسه شغال، بس [[FormData]] مبتلمّش غير اللي ليه [[name]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[defaultValue]] | قيمة أولى، والمتصفح يمسك الباقي |
| [[name]] | المفتاح في البيانات، ومن غيره الخانة مش بتتبعت |
| [[e.preventDefault()]] | يمنع الـ reload |
| [[const form = e.currentTarget]] | قبل أي [[await]]، لأنه بيبقى [[null]] بعدها |
| [[Object.fromEntries(new FormData(form))]] | الفورم كله في object واحد |
| [[form.reset()]] | يرجّع الخانات للـ defaultValue |
| [[required]] و [[minLength]] و [[type="email"]] | validation المتصفح، والسيرفر لازم يتحقق تاني |`,
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
          teach: R`## الفكرة: zod يوصف البيانات، و RHF يدير الفورم

ده فورم دخول فيه ٣ أنواع رسايل: غلط في الشكل (zod بيقوله قبل أي طلب)، وغلط من السيرفر في خانة (باسورد غلط)، وغلط عام من السيرفر. والخانات uncontrolled، فمفيش render مع كل حرف. اتشغّل في Vite 8.3 + React 19.3 + react-hook-form 7.89 + zod 4.6 + @hookform/resolvers 5.9، في Chrome headless والكتابة بـ Playwright.

---

## ١. الـ imports

~~~text LoginForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
~~~

| الـ import | من فين | دوره |
|---|---|---|
| [[useForm]] | [[react-hook-form]] (RHF) | الـ hook اللي بيدير الفورم كله |
| [[zodResolver]] | [[@hookform/resolvers/zod]] | الجسر: بيخلي RHF يستخدم schema بتاعة zod في الـ validation |
| [[z]] | [[zod]] | كل أدوات وصف البيانات |

التلاتة بيتسطبوا بـ [[npm i react-hook-form zod @hookform/resolvers]].

## ٢. الـ schema والـ type

~~~text LoginForm.tsx
const schema = z.object({ email: z.email('Enter a valid email'), password: z.string().min(8, 'At least 8 characters') })
type LoginInput = z.infer<typeof schema>
~~~

- [[z.object({...})]]: «object فيه الخانات دي».
- [[z.email('...')]]: نص لازم يبقى إيميل صحيح، والنص بين القوسين رسالة الخطأ. (في Zod 4 بقت كده، والقديمة [[z.string().email()]] لسه شغالة بس deprecated.)
- [[z.string().min(8, '...')]]: نص، طوله ٨ على الأقل.
- [[typeof schema]]: نوع المتغير [[schema]] في TypeScript. و [[z.infer<...>]] بيطلّع منه نوع البيانات: [[{ email: string; password: string }]]. كده الـ type والقواعد مكتوبين مرة واحدة.

## ٣. [[useForm]]

~~~text LoginForm.tsx
const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginInput>({ resolver: zodResolver(schema) })
~~~

- [[useForm<LoginInput>]]: الفورم ده شكل بياناته [[LoginInput]]، فـ TypeScript هيتأكد من أسماء الخانات.
- [[resolver: zodResolver(schema)]]: الـ validation من الـ schema.
- اللي بناخده (destructuring):

| الاسم | بيعمل إيه |
|---|---|
| [[register]] | بيوصّل خانة بالفورم |
| [[handleSubmit]] | بيلف دالة الإرسال بتاعتنا |
| [[setError]] | يحط خطأ بإيدنا (من السيرفر) |
| [[formState: { errors, isSubmitting }]] | [[errors]] رسايل كل خانة، و [[isSubmitting]] الطلب شغال ولا لأ |

[[formState: { errors, isSubmitting }]] ده destructuring متداخل: خد [[formState]] ومنه خد الاتنين دول.

## ٤. [[onSubmit]] وأخطاء السيرفر

~~~text LoginForm.tsx
async function onSubmit(data: LoginInput) {
  const res = await onLogin(data)
  if (res.status === 401) setError('password', { message: 'Wrong email or password' })
  else if (!res.ok) setError('root.server', { message: 'Server error, try again' })
}
~~~

- الدالة دي مش بتتنادى غير لو zod قال البيانات سليمة.
- [[await onLogin(data)]]: الأب بيبعت ويرجّع [[Response]] (نفس اللي [[fetch]] بيرجّعه).
- [[res.status === 401]]: 401 = Unauthorized، يعني البيانات غلط. [[setError('password', ...)]] بيحط الرسالة على خانة الباسورد، كأنها جاية من zod.
- [[!res.ok]]: [[ok]] بـ [[true]] لو الـ status من 200 لـ 299. أي فشل تاني (500 مثلًا) يروح [[root.server]]: خطأ مش تبع خانة. [[root]] مكان RHF المخصص للأخطاء العامة، و [[server]] اسم احنا اخترناه.

## ٥. الـ JSX

~~~text LoginForm.tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate>
  <input type="email" aria-label="Email" {...register('email')} />
  <input type="password" aria-label="Password" {...register('password')} />
  {(errors.email || errors.password) && <p role="alert">{errors.email?.message ?? errors.password?.message}</p>}
  {errors.root?.server && <p role="alert">{errors.root.server.message}</p>}
  <button disabled={isSubmitting}>Log in</button>
</form>
~~~

- [[handleSubmit(onSubmit)]]: بيرجّع handler بيعمل [[preventDefault]]، ويشغّل zod، ولو فيه أخطاء يحطها في [[errors]] ويعمل focus على أول خانة غلط، ولو سليمة ينادي [[onSubmit]].
- [[noValidate]]: يقفل رسايل المتصفح الجاهزة (اللي شفناها في الدرس اللي فات) عشان رسايلنا هي اللي تظهر.
- [[{...register('email')}]]: [[register]] بيرجّع object فيه [[name]] و [[onChange]] و [[onBlur]] و [[ref]]، والـ [[...]] (spread) بيحطهم كلهم props على الخانة. RHF بيقرا القيمة من الـ DOM عن طريق الـ [[ref]].
- [[A && <p>]]: لو [[A]] بـ [[true]] ارسم الـ [[<p>]]، غير كده ولا حاجة.
- [[errors.email?.message ?? errors.password?.message]]: [[?.]] لو [[errors.email]] مش موجود رجّع [[undefined]] بدل ما تقع. و [[??]] لو اللي على الشمال [[undefined]] أو [[null]] خد اللي على اليمين. يعني رسالة الإيميل، ولو مفيش فرسالة الباسورد.
- [[role="alert"]]: قارئ الشاشة بيقرا الرسالة أول ما تظهر.
- [[disabled={isSubmitting}]]: الزرار مقفول طول ما [[onSubmit]] شغالة، فمحدش يدوس مرتين.

---

## ٦. اللي حصل

[[onLogin]] بتطبع إنها اتنادت وترد بعد ثانيتين بـ 401. وفي كل خطوة طبعنا الرسايل وحالة الزرار والخانة اللي عليها الـ focus:

~~~text الناتج (Chrome، 401)
bad email + 3-char pw          alerts=["Enter a valid email"] disabled=false focus=Email
fixed email                    alerts=["At least 8 characters"] disabled=false focus=Email
fixed password                 alerts=[] disabled=false focus=Password
0.3s after submit              alerts=[] disabled=true focus=null
2.3s after submit              alerts=["Wrong email or password"] disabled=false focus=null
typed one more char            alerts=[] disabled=false focus=Password
~~~

~~~text الـ Console
[log] onLogin called {"email":"sara@example.com","password":"secret123"}
~~~

| الخطوة | ليه |
|---|---|
| إيميل [[sara]] وباسورد ٣ حروف | zod لقى الاتنين غلط، والـ JSX بيعرض أول واحدة. الـ focus راح لأول خانة غلط. و [[onLogin]] متنادتش |
| صلّحنا الإيميل | بعد أول submit، RHF بيعيد الـ validation مع كل تغيير، فرسالة الإيميل راحت وظهرت رسالة الباسورد |
| صلّحنا الباسورد | مفيش أخطاء |
| بعد الإرسال بـ 0.3s | [[isSubmitting]] بـ [[true]]، الزرار مقفول |
| بعد 2.3s | الـ 401 وصل، و [[setError]] حط الرسالة مكان رسايل zod بالظبط |
| كتبنا حرف | الخانة اتعاد الـ validation بتاعها وطلعت سليمة، فخطأ السيرفر اتمسح لوحده |

(الـ console بتاع Chrome طبّع كمان نصيحة إن خانة الباسورد يبقى عليها [[autocomplete="current-password"]]، ودي تحسين مش خطأ.)

### بـ 500

~~~text الناتج (Chrome، 500)
2.3s after submit              alerts=["Server error, try again"] disabled=false focus=null
typed one more char            alerts=["Server error, try again"] disabled=false focus=Password
~~~

خطأ الـ [[root.server]] مش تبع خانة، فالكتابة مش بتمسحه. بيتمسح مع الـ submit الجاي.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[z.object]] + [[z.infer]] | القواعد والـ type من مكان واحد |
| [[zodResolver(schema)]] | RHF يستخدم zod |
| [[{...register('x')}]] | يوصّل الخانة (uncontrolled عن طريق ref) |
| [[handleSubmit(onSubmit)]] | validation الأول، و onSubmit بس لو سليم |
| [[setError('field')]] | خطأ سيرفر تحت الخانة، بيتمسح لما المستخدم يعدّلها |
| [[setError('root.server')]] | خطأ عام، بيتمسح مع الـ submit الجاي |
| [[isSubmitting]] | true طول ما الـ promise بتاعة onSubmit شغالة، فلازم [[await]] |`,
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
          try: R`اعمل [[DatePicker]] بسيط: [[<input type="date">]] بياخد [[value?: Date]] ويرجّع في onChange [[new Date(e.target.value)]] لو فيه قيمة و [[undefined]] لو الحقل فاضي (من غيرها مسح التاريخ بيوقّع الصفحة). شغّل الفورم: امسح السطر الوحيد ودوس Save واقرا الرسايل. بعدين ضيف سطرين، واكتب في التاني [[Pen]] و [[3]]، واطبع البيانات في onSave. وأخيرًا امسح السطر الأول من سطرين مكتوبين، واتأكد إن اللي فضل ظاهر هو نفسه اللي بيتبعت.`,
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
          teach: R`## الفكرة: list جوه الفورم، وخانة مش input عادي

فاتورة: اسم عميل، وتاريخ استحقاق من «date picker»، وعدد أسطر بيزيد ويقل. [[useFieldArray]] بيدير الأسطر، و [[Controller]] بيوصّل الـ date picker بالفورم. اتشغّل في Vite 8.3 + React 19.3 + react-hook-form 7.89 + zod 4.6 في Chrome headless، والكتابة بـ Playwright، و [[DatePicker]] هو اللي في الـ solCode.

---

## ١. الـ schema

~~~text InvoiceForm.tsx
const schema = z.object({
  customer: z.string().min(1, 'Required'),
  dueDate: z.date({ error: 'Pick a date' }),
  lines: z.array(z.object({ item: z.string().min(1, 'Required'), qty: z.number().int().positive() })).min(1, 'Add at least one line'),
})
type Invoice = z.infer<typeof schema>
~~~

- [[z.string().min(1, 'Required')]]: نص مش فاضي.
- [[z.date({ error: 'Pick a date' })]]: لازم **object من نوع Date** (مش نص زي [['2026-11-01']]). [[error]] في Zod 4 رسالة أي فشل هنا: فاضي ([[undefined]]) أو Date بايظ.
- [[z.array(z.object({...}))]]: array كل عنصر فيها object بالشكل ده. جوه: [[item]] نص مش فاضي، و [[qty]] رقم [[int()]] (صحيح) و [[positive()]] (أكبر من صفر).
- [[.min(1, '...')]] على الـ array نفسها: عنصر واحد على الأقل.

جرّبنا الـ schema لوحدها بـ [[safeParse]] على بيانات غلط، ودي الرسايل اللي طلعت (كل واحدة بالـ path بتاعها):

~~~text node
dueDate: Pick a date
lines.0.item: Required
lines.0.qty: Too small: expected number to be >0
lines.1.qty: Invalid input: expected number, received NaN
~~~

الـ path [[lines.0.item]] هو نفسه الاسم اللي هنسجّل بيه الخانة تحت.

## ٢. [[useForm]] و [[defaultValues]]

~~~text InvoiceForm.tsx
const { register, control, handleSubmit, formState: { errors } } = useForm<Invoice>({
  resolver: zodResolver(schema),
  defaultValues: { customer: '', lines: [{ item: '', qty: 1 }] },
})
~~~

- [[control]]: الجديد هنا. object داخلي بيربط الفورم بأي hook أو component تاني من RHF ([[useFieldArray]] و [[Controller]]).
- [[defaultValues]]: القيم الأولى. من غيرها [[lines]] هتبقى [[undefined]] ومفيش ولا سطر يترسم. و [[dueDate]] مش موجود فيها، فبيبدأ [[undefined]].

## ٣. [[useFieldArray]]

~~~text InvoiceForm.tsx
const { fields, append, remove } = useFieldArray({ control, name: 'lines' })
~~~

- [[name: 'lines']]: الـ array اللي هيديرها.
- [[fields]]: نفس عناصر [[lines]]، ومع كل واحد [[id]] بيعمله RHF ومبيتغيرش طول عمر السطر.
- [[append(obj)]]: يضيف سطر في الآخر. [[remove(i)]]: يمسح السطر رقم [[i]]. (وفيه كمان [[move]] و [[insert]] و [[swap]].)

## ٤. الخانات العادية

~~~text InvoiceForm.tsx
<input aria-label="Customer" {...register('customer')} />
~~~

نفس الدرس اللي فات.

## ٥. [[Controller]] للـ date picker

~~~text InvoiceForm.tsx
<Controller control={control} name="dueDate" render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} onBlur={field.onBlur} />} />
{errors.dueDate && <p role="alert">{errors.dueDate.message}</p>}
~~~

- [[register]] بيفترض [[<input>]] حقيقي: بيحط [[ref]] ويقرا القيمة من الـ DOM، و [[onChange]] بياخد event. الـ date picker بتاع أي مكتبة بيرجّع **Date** مش event، فده مش هينفع.
- [[Controller]] بيمسك القيمة هو، ويدّيك في [[render]] object اسمه [[field]]:

| الحاجة | معناها |
|---|---|
| [[field.value]] | القيمة الحالية ([[Date]] أو [[undefined]]) |
| [[field.onChange(v)]] | ادّيله القيمة الجديدة نفسها (مش event) |
| [[field.onBlur()]] | الخانة اتسابت (عشان [[mode: 'onBlur']] و [[touched]]) |

- [[render={({ field }) => ...}]]: دالة بترجّع JSX، و [[({ field })]] destructuring للـ object اللي Controller بيبعته.

### الـ [[DatePicker]] من الـ solCode

~~~text DatePicker.tsx
value={value ? value.toISOString().slice(0, 10) : ''}
onChange={e => onChange(e.target.value ? new Date(e.target.value) : undefined)}
~~~

- [[<input type="date">]] قيمته نص [[YYYY-MM-DD]]. [[toISOString()]] بيرجّع [['2026-11-01T00:00:00.000Z']]، و [[.slice(0, 10)]] أول ١٠ حروف.
- [[new Date('2026-11-01')]]: نص لـ Date. ولو الخانة اتمسحت ([[e.target.value]] فاضي) نبعت [[undefined]]. [[new Date('')]] كان هيعمل Invalid Date، و [[toISOString()]] عليه بيرمي، وده اللي حصل لما جرّبنا النسخة القديمة ومسحنا التاريخ:

~~~text الـ Console
[pageerror] Invalid time value
[warning] An error occurred in the <DatePicker> component.
~~~

بالنسخة الحالية: المسح يرجّع [[undefined]]، و Save يعرض [["Pick a date"]].

## ٦. الأسطر

~~~text InvoiceForm.tsx
{fields.map((field, index) => (
  <div key={field.id}>
    <input aria-label={$__btItem $__{index + 1}$__bt} {...register($__btlines.$__{index}.item$__bt)} />
    <input aria-label={$__btQty $__{index + 1}$__bt} type="number" {...register($__btlines.$__{index}.qty$__bt, { valueAsNumber: true })} />
    <button type="button" onClick={() => remove(index)}>Remove</button>
  </div>
))}
~~~

- [[key={field.id}]]: الـ id الثابت، مش [[index]]. لما تمسح السطر الأول، التاني يبقى index صفر، بس الـ id بتاعه هو هو، فـ React عارفة إن ده نفس السطر.
- النص بين علامتين backtick ده template literal: [[$__{index}]] جواه بيتبدل بقيمة [[index]]. فالسطر الأول اسمه [[lines.0.item]] والتاني [[lines.1.item]]: نقطة ورقم يعني «العنصر ده في الـ array».
- [[{ valueAsNumber: true }]]: الخانة [[type="number"]] قيمتها في الـ DOM **نص** ([['3']]). الـ option ده بيخلي RHF ياخدها رقم ([[3]]) قبل zod، وإلا [[z.number()]] هيرفض.
- [[type="button"]] على Remove: من غيره الزرار جوه فورم يبقى submit، وكل مسح يبعت الفورم.

## ٧. خطأ الـ array و Add و Save

~~~text InvoiceForm.tsx
{errors.lines?.root && <p role="alert">{errors.lines.root.message}</p>}
<button type="button" onClick={() => append({ item: '', qty: 1 })}>Add line</button>
<button>Save</button>
~~~

- [[errors.lines?.root]]: الخطأ اللي على الـ array **كلها** (القاعدة [[min(1)]]). وأخطاء سطر بعينه في [[errors.lines?.[0]?.item]]، والمثال مش بيعرضها.
- [[append(...)]] لازم ياخد سطر كامل بالقيم الأولى.

---

## ٨. اللي حصل

[[onSave]] بتطبع البيانات، وطبعنا أسماء وقيم كل الـ inputs والرسايل في كل خطوة:

~~~text الناتج (Chrome)
initial inputs           ["customer=","=","lines.0.item=","lines.0.qty=1"]
removed line, Save       ["Pick a date","Add at least one line"] focus=Customer
two lines                ["customer=Acme","=2026-11-01","lines.0.item=Mug","lines.0.qty=1","lines.1.item=Pen","lines.1.qty=3"]
removed first            ["customer=Acme","=2026-11-01","lines.0.item=Pen","lines.0.qty=3"]
item empty, qty 0        [] focus=Item 1
~~~

~~~text الـ Console
>> Save 2 lines
[log] saved {"customer":"Acme","dueDate":"2026-11-01T00:00:00.000Z","lines":[{"item":"Mug","qty":1},{"item":"Pen","qty":3}]} dueDate instanceof Date: true
>> Save after remove
[log] saved {"customer":"Acme","dueDate":"2026-11-01T00:00:00.000Z","lines":[{"item":"Pen","qty":3}]} dueDate instanceof Date: true
~~~

| الخطوة | اللي حصل وليه |
|---|---|
| initial | خانة التاريخ ملهاش [[name]] (مش متسجلة بـ register)، والسطر الأول [[lines.0]] من الـ defaultValues |
| مسحنا السطر و Save | رسالة التاريخ ورسالة الـ array. الـ customer فاضي برضه بس مفيش سطر بيعرض رسالته، والـ focus راح عليه لأنه أول خانة غلط |
| سطرين | الأسماء بالـ index: [[lines.0]] و [[lines.1]] |
| Save | [[qty]] رقم مش نص، و [[dueDate]] من نوع Date ([[instanceof Date]] بـ true). وفي الـ JSON بيظهر نص لأن [[JSON.stringify]] بيحوّل الـ Date |
| مسحنا Mug | Pen بقى [[lines.0]] وكميته [[3]] اتنقلت معاه، والـ Save بعت سطر واحد |
| item فاضي و qty صفر | ولا رسالة ظاهرة (المثال مش بيعرض أخطاء الأسطر)، بس الـ Save اتمنع والـ focus راح على [[Item 1]] |

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[control]] | بيربط useFieldArray و Controller بالفورم |
| [[useFieldArray({ control, name })]] | [[fields]] للرسم، و [[append]] و [[remove]] للتعديل |
| [[key={field.id}]] | id ثابت للسطر، مش الـ index |
| [[lines.$__{index}.item]] | اسم خانة جوه سطر |
| [[valueAsNumber: true]] | نص الـ number input يبقى رقم قبل zod |
| [[Controller]] + [[field]] | لأي خانة مبتقبلش ref أو بترجّع قيمة مش event |
| [[errors.lines.root]] | خطأ الـ array كلها، و [[errors.lines[i].x]] خطأ سطر |`,
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
          sol: R`لما تمسح السطر الوحيد وتدوس Save يظهر «Add at least one line» و «Pick a date» (والـ customer فاضي كمان، بس المثال مفيهوش سطر بيعرض رسالته، فهتلاقي الـ focus راح على خانته بس). بعد ما تكمّل، onSave بتوصلها بيانات فيها سطرين [[{ item: 'Mug', qty: 1 }]] و [[{ item: 'Pen', qty: 3 }]]، والكمية رقم مش نص، و [[dueDate]] من نوع Date.

لما تمسح الأول من [[Mug]] و [[Pen]]، اللي يفضل ظاهر [[Pen]] واللي يتبعت سطر واحد [[{ item: 'Pen', qty: 3 }]] (الكمية اتنقلت مع السطر). ومعلومة: لو جرّبت [[key={index}]] في الفورم البسيط ده هتلاقي النتيجة نفسها، لأن RHF بيرجع يكتب القيم في الخانات بعد المسح. المشكلة بتظهر أول ما السطر يبقى component ليه state جوه (سطر مفتوح ولا مقفول، أو date picker ليه state داخلية، أو animation): الـ state دي بتتزحلق للسطر اللي بعده، زي درس key بالظبط. عشان كده الـ docs بتاعة RHF بتقول [[field.id]] دايمًا.

لو الكمية وصلت [[NaN]] أو zod قال «expected number»، ناقصك [[valueAsNumber]].`,
          solCode: R`function DatePicker({ value, onChange, onBlur }: { value?: Date; onChange: (d?: Date) => void; onBlur: () => void }) {
  return (
    <input
      aria-label="Due date"
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ''}
      onChange={e => onChange(e.target.value ? new Date(e.target.value) : undefined)}
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
          teach: R`## الفكرة: نفس الـ schema في المتصفح وفي السيرفر

المثال ٣ ملفات في صندوق واحد: الـ schema المشتركة، و route في Express بيتحقق بيها، و [[onSubmit]] في الفورم بيرجّع أخطاء السيرفر تحت خاناتها. اتشغّل كله: Express 5.2 بـ [[tsx]] على port 4797، والفورم في Vite 8.3 + React 19.3 + react-hook-form 7.89 + zod 4.6 (Vite بيعمل proxy لـ [[/api]] على الـ API)، والطلبات بـ curl وبـ Chrome headless.

---

## ١. الملف المشترك

~~~text shared/schemas/signup.ts
import { z } from 'zod'
export const signupSchema = z.object({ email: z.email('Enter a valid email'), password: z.string().min(8, 'At least 8 characters') })
export type SignupInput = z.infer<typeof signupSchema>
~~~

- نفس القواعد والرسايل اللي في درس react-hook-form، بس في ملف لوحده وعليه [[export]].
- [[export type]]: النوع كمان بيتصدّر، فالفورم والـ API الاتنين يستخدموه.
- الملف ده بيعمل import لـ zod بس. لو عمل import لـ Prisma أو [[process.env]]، الحاجات دي هتدخل الـ bundle بتاع المتصفح.

## ٢. الـ route في السيرفر

~~~text server/index.ts
app.post('/api/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ fieldErrors: z.flattenError(parsed.error).fieldErrors })
  if (await users.exists(parsed.data.email)) return res.status(409).json({ fieldErrors: { email: ['Email already registered'] } })
  res.status(201).json(await users.create(parsed.data))
})
~~~

### [[app.post(path, handler)]]

Express: لما ييجي طلب [[POST]] على [[/api/signup]]، شغّل الدالة دي. [[req]] الطلب، و [[res]] الرد. و [[req.body]] بيبقى object لأن السيرفر فيه [[app.use(express.json())]] اللي بيحوّل الـ JSON.

### [[signupSchema.safeParse(req.body)]]

- [[parse]] بيرمي error لو البيانات غلط، و [[safeParse]] **مبيرميش**: بيرجّع [[{ success: true, data }]] أو [[{ success: false, error }]].
- [[parsed.data]] بعد التنضيف: zod بيشيل أي key مش في الـ schema.

### [[z.flattenError(parsed.error).fieldErrors]]

الـ error بتاع zod فيه list مفصّلة من المشاكل. [[z.flattenError]] (Zod 4) بيحوّلها لـ [[{ formErrors: [], fieldErrors: { email: ['...'] } }]]: كل خانة ومعاها array رسايلها. بناخد [[fieldErrors]] ونرجّعه.

### الـ status codes

| الكود | معناه | هنا |
|---|---|---|
| 400 | Bad Request: البيانات نفسها غلط | zod رفض |
| 409 | Conflict: البيانات سليمة بس بتتعارض مع حاجة موجودة | الإيميل متسجل، ودي قاعدة مينفعش تتعرف غير في السيرفر |
| 201 | Created: اتعمل حاجة جديدة | المستخدم اتعمل |

و [[return res.status(...).json(...)]]: الـ [[return]] بيوقف الدالة بعد الرد.

في تجربتنا [[users]] object صغير في الذاكرة فيه [[taken@example.com]] من الأول، و [[create]] بيطبع اللي وصله.

## ٣. الـ API بـ curl

~~~bash
curl -s -i -X POST http://localhost:4797/api/signup -H 'Content-Type: application/json' -d '{"email":"x","password":"1","role":"admin"}'
~~~

[[-X POST]] نوع الطلب، و [[-H]] header بيقول إن الـ body JSON، و [[-d]] الـ body، و [[-i]] بيطبع الـ status. اتشغّل في Git Bash على Windows:

~~~text الناتج
HTTP/1.1 400 Bad Request
{"fieldErrors":{"email":["Enter a valid email"],"password":["At least 8 characters"]}}
~~~

مفيش كلمة عن [[role]]: zod مبيعترضش على الـ keys الزيادة، بيتجاهلها. ونفس الطلب ببيانات سليمة ومعاها [[role: "admin"]]:

~~~text الناتج
HTTP/1.1 201 Created
{"id":"u2","email":"sara@example.com"}
~~~

~~~text log السيرفر
create() got {"email":"sara@example.com","password":"secret123"}
~~~

[[role]] موصلش لـ [[create]] خالص. ده اللي بيحمي من mass assignment (حد يبعت [[role: 'admin']] ويتحفظ). والإيميل المتسجل:

~~~text الناتج
HTTP/1.1 409 Conflict
{"fieldErrors":{"email":["Email already registered"]}}
~~~

نفس الشكل بالظبط اللي zod بيرجّعه، فالفرونت يتعامل معاهم بنفس الكود.

---

## ٤. [[onSubmit]] في الفورم

~~~text SignupForm.tsx
async function onSubmit(data: SignupInput) {
  const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (res.ok) return onDone()
~~~

- الدالة بتتنادى بعد ما [[zodResolver(signupSchema)]] وافق في المتصفح، يعني نفس الـ schema اتحققت مرتين.
- [[fetch]] بنفس شكل الـ curl. [[res.ok]] بـ true لأي status من 200 لـ 299.

~~~text SignupForm.tsx
  const body: { fieldErrors?: Partial<Record<keyof SignupInput, string[]>> } = await res.json().catch(() => ({}))
~~~

من جوه لبرة:

- [[keyof SignupInput]]: أسماء الخانات: [['email' | 'password']].
- [[Record<keyof SignupInput, string[]>]]: object لكل خانة array رسايل.
- [[Partial<...>]]: كل الخانات اختيارية (ممكن ييجي خطأ للإيميل بس).
- [[fieldErrors?]]: الـ [[?]] يعني الحقل نفسه ممكن ميبقاش موجود.
- [[res.json().catch(() => ({}))]]: لو الرد مش JSON (proxy رجّع HTML أو نص)، [[res.json()]] بيرمي، و [[.catch]] يرجّع object فاضي بدل ما الفورم يقع. الأقواس حوالين [[{}]] عشان الـ arrow function ترجّع object مش block فاضي.

~~~text SignupForm.tsx
  for (const [field, messages] of Object.entries(body.fieldErrors ?? {})) setError(field as keyof SignupInput, { message: messages?.[0] })
  if (!body.fieldErrors) setError('root.server', { message: 'Something went wrong, try again' })
}
~~~

- [[body.fieldErrors ?? {}]]: لو مفيش، object فاضي فالـ loop ميلفّش.
- [[Object.entries(obj)]]: أزواج [[[key, value]]]، و [[for (const [field, messages] of ...)]] بيفك كل زوج.
- [[field as keyof SignupInput]]: [[Object.entries]] بيدّي الـ key نوع [[string]]، فبنقول لـ TypeScript إنه اسم خانة.
- [[messages?.[0]]]: أول رسالة، و [[?.]] لو الـ array مش موجودة.
- مفيش [[fieldErrors]] خالص؟ رسالة عامة في [[root.server]].

---

## ٥. اللي حصل في المتصفح

زودنا على الفورم [[aria-invalid={!!errors.email}]] ورسالة تحت كل خانة. [[!!]] بيحوّل أي قيمة لـ true أو false.

~~~text الناتج (Chrome)
taken email              ["Email already registered"] aria-invalid=true
typed a char             [] aria-invalid=false
new email                [] aria-invalid=false
~~~

~~~text الـ Console
[net] POST /api/signup -> 409
[error] Failed to load resource: the server responded with a status of 409 (Conflict)
[net] POST /api/signup -> 201
[log] signed up!
~~~

- الـ 409 رجع، والرسالة ظهرت **تحت خانة الإيميل** والخانة اتعلّمت invalid. (سطر [[error]] ده Chrome بيطبعه لأي رد 4xx، مش error في الكود.)
- أول حرف اتكتب: الخانة اتعاد الـ validation بتاعها فالرسالة راحت.
- إيميل جديد: 201 و [[onDone]] اتنادت.

### السيرفر واقف

وقفنا الـ API وبعتنا تاني:

~~~text الـ Console
[net] 502 content-type=text/plain body=""
alerts ["Something went wrong, try again"]
~~~

الـ proxy رجّع 502 بـ body فاضي مش JSON. [[res.json()]] رمى، والـ [[.catch]] رجّع [[{}]]، فمفيش [[fieldErrors]] وظهرت الرسالة العامة.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| ملف schema مشترك | القواعد والرسايل والـ type مرة واحدة للاتنين |
| [[safeParse]] في السيرفر | مبيرميش، والـ [[data]] من غير keys زيادة |
| [[z.flattenError(e).fieldErrors]] | أخطاء لكل خانة بنفس أسماء الفورم |
| 409 بنفس الشكل | قواعد السيرفر بتمشي في نفس الطريق |
| [[res.json().catch(() => ({}))]] | رد مش JSON ميوقعش الفورم |
| [[setError(field)]] لكل خانة، و [[root.server]] للباقي | كل رسالة في مكانها |

الـ validation في الفرونت للـ UX، والسيرفر هو الحماية.`,
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
          teach: R`## الفكرة: الـ URL هو اللي يقرر إيه اللي يترسم

React Router بيبص على الـ URL ويطابقه مع list من الـ routes، ويرسم الـ components المطابقة جوه بعض. المثال: Layout ثابت فيه روابط، وتحته صفحة الرئيسية أو صفحة منتج أو 404. اتشغّل في Vite 8.3 + React 19.3 + react-router 8.4 في Chrome headless، والتنقل بـ Playwright، و Home و NotFound من الـ solCode.

---

## ١. الـ imports

~~~text App.tsx
import { createBrowserRouter, Link, Outlet, useParams } from 'react-router'
import { RouterProvider } from 'react-router/dom'
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[createBrowserRouter]] | بيعمل router من array routes، وبيستخدم الـ URL الحقيقي في المتصفح |
| [[Link]] | رابط بيغيّر الصفحة من غير reload |
| [[Outlet]] | المكان اللي الصفحة الابن هتترسم فيه |
| [[useParams]] | يقرا الأجزاء المتغيرة من الـ URL ([[:id]]) |
| [[RouterProvider]] | بيرسم الـ router. من [[react-router/dom]] لأنه خاص بـ react-dom |

اتسطب بـ [[npm i react-router]]. والباكدج القديمة [[react-router-dom]] آخر نسخة ليها على npm دلوقتي 7.18.4 (شغّلنا [[npm view react-router-dom dist-tags]])، يعني مفيش منها v8.

## ٢. الـ Layout

~~~text App.tsx
const Layout = () => <><nav><Link to="/">Home</Link> <Link to="/products/42">Product 42</Link></nav><Outlet /></>
~~~

- [[<Link to="/products/42">]]: بيترسم [[<a href="/products/42">]] عادي (عشان الـ right click و «فتح في تاب جديد» يشتغلوا)، بس لما تدوس عليه بيمنع الـ reload ويغيّر الـ URL بـ [[history.pushState]].
- [[<Outlet />]]: «هنا ارسم الابن المطابق». لو الـ URL [[/products/42]]، هنا هتترسم [[Product]].

## ٣. صفحة المنتج

~~~text App.tsx
function Product() {
  const { id } = useParams()
  return <h1>Product {id}</h1>
}
~~~

[[useParams()]] بيرجّع object فيه كل [[:اسم]] في الـ path. الـ route [[products/:id]] والـ URL [[/products/42]]، فالنتيجة [[{ id: '42' }]]: **نص** مش رقم. لو محتاجه رقم: [[Number(id)]].

## ٤. الـ routes

~~~text App.tsx
const router = createBrowserRouter([
  { path: '/', Component: Layout, children: [
    { index: true, Component: Home },
    { path: 'products/:id', Component: Product },
    { path: '*', Component: NotFound },
  ] },
])
~~~

- كل route object: [[path]] و [[Component]] (اسم الـ component نفسه، مش [[<Layout />]]).
- [[children]]: routes جوه routes. الـ path بتاعهم بيتكمّل على الأب: [['products/:id']] جوه [['/']] يبقى [[/products/:id]]. والأب بيرسم الابن مكان الـ [[Outlet]].
- [[index: true]]: الابن اللي يترسم لما الـ URL هو مسار الأب بالظبط ([[/]]).
- [[:id]]: جزء متغير، أي حاجة مكانه تطابق.
- [[*]]: أي حاجة ملهاش route تاني. React Router بيختار أدق route مطابق، فالترتيب في الـ array مش مهم.

| الـ URL | اللي بيترسم |
|---|---|
| [[/]] | Layout ← Home |
| [[/products/42]] | Layout ← Product ([[id = '42']]) |
| [[/xyz]] | Layout ← NotFound |

## ٥. التطبيق

~~~text App.tsx
export default function App() { return <RouterProvider router={router} /> }
~~~

[[router]] متعرّف **برا** الـ component، فبيتعمل مرة واحدة بس مش مع كل render.

---

## ٦. اللي حصل

زودنا على الـ Layout زرار عداد عشان نشوف الـ state بتفضل ولا لأ، و [[console.log]] في Product.

### [[/products/7]] و [[/xyz]]

~~~text الـ HTML
/products/7:  <nav><a href="/" data-discover="true">Home</a> <a href="/products/42" data-discover="true">Product 42</a> <button>count 0</button></nav><h1>Product 7</h1>
/xyz:         <nav>...</nav><h1>Page not found</h1>
~~~

الـ [[<Link>]] اترسم [[<a>]] حقيقي ([[data-discover]] علامة بيحطها React Router). و NotFound اترسم **جوه** الـ Layout، لأن [[*]] ابن [['/']].

### [[Link]]: من [[/]]، دوسنا العداد مرتين وبعدين Product 42

~~~text الناتج
<nav>...<button>count 2</button></nav><h1>Product 42</h1>
url=/products/42 documents loaded=0
[log] useParams id = "42" string
~~~

- صفر طلبات document: الصفحة متحمّلتش من السيرفر تاني.
- العداد فضل 2: الـ Layout متشالش، اتبدل اللي جوه الـ Outlet بس.
- [[id]] نوعه [[string]].
- و Back رجّعنا لـ Home والعداد لسه 2.

### [[<a href>]] بدل Link

~~~text الناتج
<nav>...<button>count 0</button></nav><h1>Product 42</h1>
url=/products/42 documents loaded=1
[net] document /products/42
~~~

reload كامل: طلب document جديد، وكل الـ JavaScript اتحمّل من الأول، والعداد رجع صفر.

### من غير route [[*]]

شلنا سطر [[*]] وفتحنا [[/xyz]]:

~~~text الـ HTML
<h2>Unexpected Application Error!</h2><h3 style="font-style: italic;">404 Not Found</h3><p>💿 Hey developer 👋</p>...
~~~

الـ data mode بيعرض شاشة الخطأ الافتراضية مكان التطبيق كله، حتى الـ Layout.

> refresh على [[/products/7]] في [[vite]] أو [[vite preview]] بيشتغل لأن Vite بيرجّع [[index.html]] لأي مسار. على سيرفر حقيقي لازم تعمل نفس الـ fallback (في Nginx [[try_files $uri /index.html]])، وإلا 404 من السيرفر نفسه.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[createBrowserRouter([...])]] | الـ routes كـ data، برا الـ component |
| [[children]] + [[<Outlet />]] | layout ثابت والصفحة بتتبدل جواه، والـ state بتاعته بتفضل |
| [[index: true]] | الصفحة على مسار الأب بالظبط |
| [[:id]] + [[useParams()]] | جزء متغير، وقيمته دايمًا نص |
| [[*]] | 404 بتاعتك بدل شاشة الخطأ الافتراضية |
| [[<Link to>]] | تنقل من غير reload، و [[<a href>]] reload كامل |`,
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
          teach: R`## الفكرة: route بيلف الصفحات ويقرر يرسمها ولا يحوّل

[[RequireAuth]] component بيتحط كـ layout route فوق الصفحات المحمية. قبل ما يرسم الصفحة بيسأل ٣ أسئلة بالترتيب: لسه بنتحقق؟ داخل؟ عنده الصلاحية؟ اتشغّل في Vite 8.3 + React 19.3 + react-router 8.4 في Chrome headless، و [[useAuth]] هو اللي في الـ solCode (بيرجّع [[isLoading: true]] ثانيتين وبعدين Sara).

---

## ١. الـ imports

~~~text RequireAuth.tsx
import { Navigate, Outlet, useLocation } from 'react-router'
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[Navigate]] | component أول ما يترسم بيحوّل لمسار تاني |
| [[Outlet]] | مكان الصفحة الابن (درس React Router) |
| [[useLocation]] | بيرجّع المكان الحالي: [[pathname]] و [[search]] و [[state]] |

## ٢. التعريف والقراية

~~~text RequireAuth.tsx
export function RequireAuth({ role }: { role?: 'admin' }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()
~~~

- [[role?: 'admin']]: prop اختيارية ([[?]])، لو اتبعتت لازم تبقى [['admin']].
- [[useAuth()]]: حالة الدخول من أي مكان (context أو store أو query). المهم ترجّع حاجتين: [[user]] و [[isLoading]].
- [[location.pathname]]: المسار اللي المستخدم كان رايحه، زي [[/dashboard]].

## ٣. الأسئلة التلاتة

~~~text RequireAuth.tsx
if (isLoading) return <FullPageSpinner />
if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
if (role && user.role !== role) return <Navigate to="/403" replace />
return <Outlet />
~~~

1. **[[isLoading]]**: بعد refresh التطبيق لسه ميعرفش المستخدم (بيسأل السيرفر). «لسه مش عارف» غير «مش داخل»، فبنعرض spinner ومنحكمش.
2. **[[!user]]**: مش داخل. [[<Navigate>]] بيحوّل لـ [[/login]]:
  - [[replace]]: بيستبدل الصفحة الحالية في الـ history بدل ما يضيف واحدة. فالـ Back من صفحة الدخول ميرجعش للمحمية (اللي هتحوّله تاني).
  - [[state={{ from: ... }}]]: بيانات بتتبعت للصفحة الجاية من غير ما تظهر في الـ URL. الأقواس المزدوجة: الخارجية JSX، والداخلية object.
3. **[[role && user.role !== role]]**: لو الـ route طالب role والمستخدم مش عنده، صفحة ممنوع.
4. كله تمام: [[<Outlet />]] يرسم الصفحة المطلوبة.

## ٤. في الـ routes

~~~text routes.ts
{ Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] }
~~~

route **من غير [[path]]**: مش بيزوّد حاجة على الـ URL، هو بس بيلف أولاده. كل صفحة تحطها في [[children]] بقت محمية.

## ٥. الرجوع بعد الدخول

~~~text Login.tsx
const from = (useLocation().state as { from?: string } | null)?.from ?? '/'
navigate(from, { replace: true })
~~~

من جوه لبرة:

- [[useLocation().state]]: الـ [[state]] اللي [[Navigate]] بعته. نوعه [[unknown]] لأن أي حد ممكن يبعت أي حاجة.
- [[as { from?: string } | null]]: بنقول لـ TypeScript شكله المتوقع، أو [[null]] لو المستخدم فتح [[/login]] مباشرة.
- [[?.from]]: لو [[null]] متقعش، رجّع [[undefined]].
- [[?? '/']]: مفيش؟ الرئيسية.
- [[navigate]] جاية من [[useNavigate()]]: تنقل من الكود. و [[replace: true]] بيشيل صفحة الدخول من الـ history، فالـ Back بعد الدخول ميرجعش لها.

---

## ٦. اللي حصل

فتحنا [[/dashboard]] مباشرة وصوّرنا الـ URL والـ HTML على مراحل:

~~~text الناتج (مع سطر isLoading)
t=0                url=/dashboard  html=<p>Loading...</p>
t=1s               url=/dashboard  html=<p>Loading...</p>
t=2.5s             url=/dashboard  html=<h1>Dashboard</h1>
~~~

### من غير سطر [[isLoading]]

~~~text الناتج
t=0                url=/login  html=<h1>Login</h1><p>from=/dashboard</p><button>Log in</button>
t=1s               url=/login  html=<h1>Login</h1><p>from=/dashboard</p><button>Log in</button>
t=2.5s             url=/login  html=<h1>Login</h1><p>from=/dashboard</p><button>Log in</button>
~~~

أول render [[user]] لسه [[null]]، فالـ Navigate حوّل على طول. بعد ثانيتين المستخدم كان هيوصل، بس [[RequireAuth]] اتشال من الشجرة أصلًا، فمحدش رجّعنا. و [[from=/dashboard]] بيبيّن إن الـ [[state]] وصل لصفحة الدخول.

### [[replace]] والـ Back

فتحنا [[/]]، وبعدين رحنا [[/dashboard]] (من غير isLoading فاتحوّلنا)، ودوسنا Back:

~~~text الناتج
opened /                   url=/  history.length=3
went to /dashboard         url=/login  history.length=4
Back                       url=/  history.length=4
~~~

الـ history زاد خانة واحدة بس ([[/login]] خد مكان [[/dashboard]])، والـ Back رجّعنا لـ [[/]] مباشرة. من غير [[replace]] كان هيرجع لـ [[/dashboard]] اللي تحوّل تاني لـ [[/login]]: loop.

### الصلاحية

route [[admin]] ملفوف في [[<RequireAuth role="admin" />]]، والمستخدم role بتاعه [['user']]:

~~~text الناتج
t=2.5s             url=/403  html=<h1>Forbidden</h1>
~~~

---

## الخلاصة

| السؤال | لو آه | ليه |
|---|---|---|
| [[isLoading]]؟ | spinner | متحكمش قبل ما تعرف |
| [[!user]]؟ | [[<Navigate to="/login" replace state>]] | التحويل، ومن غير loop، ومعاه الرجوع |
| role مش مطابق؟ | [[<Navigate to="/403" replace />]] | ممنوع |
| غير كده | [[<Outlet />]] | ارسم الصفحة |

ده UX بس: الـ API هو اللي لازم يرفض أي طلب من غير جلسة أو صلاحية، لأن أي حد يقدر يغيّر الـ state من DevTools أو يبعت الطلب بـ curl.`,
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

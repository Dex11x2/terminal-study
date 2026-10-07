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
    }
]);

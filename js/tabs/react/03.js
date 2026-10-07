// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
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
    }
]);

// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
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
          teach: R`## الفكرة: «افتح اتصال» و «اقفله»

[[ChatRoom]] بيفتح اتصال WebSocket بأوضة شات، ويضيف أي رسالة توصل للـ list. ولما الأوضة تتغير أو الـ component يتشال، لازم يقفل الاتصال القديم. ده كله في [[useEffect]] واحد. استخدمنا الأب اللي في الـ solCode (زرارين general و sales)، واتشغّل في Vite 8.3 + React 19.2 في Chrome headless مرتين: وضع التطوير ([[npm run dev]]) وبعد [[vite build]] ([[vite preview]]).

---

## ١. الـ state

~~~text ChatRoom.tsx
const [messages, setMessages] = useState<{ id: string; text: string }[]>([])
~~~

array رسايل، كل واحدة ليها [[id]] و [[text]]. النوع مكتوب جوه [[< >]] لأن [[[]]] الفاضية متقولش هتشيل إيه.

## ٢. [[useEffect(دالة, [roomId])]]

[[useEffect]] بياخد حاجتين:

1. **دالة**: بتشتغل **بعد** ما React ترسم الشاشة.
2. **dependency array** [[[roomId]]]: «شغّل الدالة تاني بس لو [[roomId]] اتغير».

### جوه الدالة

~~~text ChatRoom.tsx
const socket = new WebSocket($__btwss://example.com/rooms/$__{roomId}$__bt)
~~~

[[WebSocket]] اتصال مفتوح على طول بين المتصفح والسيرفر، الاتنين يقدروا يبعتوا فيه في أي وقت. و [[wss://]] زي [[https://]] بس لـ WebSocket (الـ s للتشفير). والـ URL template literal فيه [[roomId]]، فكل أوضة ليها عنوان.

~~~text ChatRoom.tsx
socket.onmessage = e => setMessages(prev => [...prev, { id: crypto.randomUUID(), text: String(e.data) }])
~~~

- [[onmessage]]: دالة بتتنادى مع كل رسالة توصل، و [[e.data]] محتواها.
- [[setMessages(prev => ...)]]: updater، لأن الدالة دي بتشتغل بعدين، و [[messages]] اللي شايفاها ممكن تبقى قديمة. [[prev]] دايمًا الأحدث.
- [[crypto.randomUUID()]]: id عشوائي فريد للـ key، بيتعمل **وقت ما الرسالة توصل** مش وقت الرسم (درس key).
- [[String(e.data)]]: حوّل المحتوى لنص.

~~~text ChatRoom.tsx
console.log('connect', roomId)
~~~

علامة عشان نشوف إمتى الـ effect اشتغل.

### الـ cleanup: الدالة اللي بترجع

~~~text ChatRoom.tsx
return () => {
  socket.close()
  console.log('disconnect', roomId)
}
~~~

الدالة اللي الـ effect بيرجّعها React بتحفظها وتناديها:

- **قبل** ما الـ effect يشتغل تاني (الأوضة اتغيرت).
- لما الـ component يتشال من الشاشة.

وهي شايفة [[socket]] و [[roomId]] بتوع المرة دي (closure)، فبتقفل الاتصال **القديم** بالظبط.

---

## ٣. اللي حصل في التطوير

ضغطنا sales، وبعدين sales تاني، وبعدين general (الـ WebSocket errors شلناها هنا، تحت):

~~~text الـ Console (npm run dev)
connect general
disconnect general
connect general
>> click sales
disconnect general
connect sales
>> click sales again
>> click general
disconnect sales
connect general
~~~

- **أول ٣ سطور**: [[<StrictMode>]] في التطوير بيركّب الـ component، ويشيله، ويركّبه تاني. ده اختبار مقصود: لو الـ cleanup ناقص هتشوف اتصالين مفتوحين على طول.
- **sales**: الـ cleanup القديم الأول ([[disconnect general]])، وبعدين الجديد ([[connect sales]]).
- **sales تاني**: ولا سطر. [[roomId]] متغيرش ([[Object.is('sales', 'sales')]] = true)، فالـ effect مشتغلش.

## ٤. بعد الـ build

~~~text الـ Console (vite build + vite preview)
connect general
>> click sales
disconnect general
connect sales
>> click sales again
>> click general
disconnect sales
connect general
~~~

نفس الكلام من غير الـ mount التاني بتاع Strict Mode: [[connect general]] مرة واحدة في الأول.

## ٥. الـ errors

~~~text الـ Console
WebSocket connection to 'wss://example.com/rooms/general' failed: WebSocket is closed before the connection is established.
WebSocket connection to 'wss://example.com/rooms/general' failed: Error during WebSocket handshake: Unexpected response code: 404
~~~

[[example.com]] مش سيرفر شات، فالاتصال بيفشل بـ [[404]]. والأولى جت من Strict Mode: الـ cleanup قفل الاتصال الأول قبل ما يكمّل. عادي في التجربة.

## ٦. من غير الـ cleanup

شلنا الـ [[return]] كله:

~~~text الـ Console (npm run dev)
connect general
connect general
>> click sales
connect sales
>> click general
connect general
~~~

ولا [[disconnect]]. يعني ٤ اتصالات مفتوحة، والرسايل كانت هتيجي من كل الأوض اللي فتحتها. ولاحظ إن Strict Mode بيّن المشكلة من أول ثانية: [[connect general]] مرتين ورا بعض.

---

## الخلاصة

| الـ dependencies | الـ effect بيشتغل إمتى |
|---|---|
| مفيش array | بعد كل render |
| [[[]]] | مرة بعد أول ظهور |
| [[[roomId]]] | أول ظهور، وكل ما [[roomId]] يتغير |

| الترتيب لما [[roomId]] يتغير |
|---|
| ١. render جديد والشاشة تترسم |
| ٢. cleanup القديم (بالـ [[roomId]] القديم) |
| ٣. الـ effect الجديد (بالـ [[roomId]] الجديد) |

> أي effect بيفتح حاجة (اتصال، listener، timer) لازم يرجّع دالة تقفلها.`,
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
          desc: R`كل قيمة من الـ component بتستخدمها جوه الـ effect (props، و state، ودوال ومتغيرات متعرّفة جوه الـ component) لازم تبقى في الـ dependencies. القاعدة دي الـ linter بيفرضها بـ [[react-hooks/exhaustive-deps]] (في eslint، وفي oxlint اللي قالب Vite بيجي بيه دلوقتي)، وسيبها شغالة.

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
          teach: R`## الفكرة: نفس الـ hook مرتين، واحد بيبعت طلب وواحد بيبعت ١٤٧٢

المثال فيه custom hook (دالة بتبدأ بـ [[use]] وبتستخدم hooks تانية جواها) بيجيب JSON، مكتوب مرتين. الفرق الوحيد هو **إيه اللي في الـ dependencies**. شغّلنا الاتنين ٣ ثواني على [[/products.json]] (ملف في [[public]]) وعدّينا الطلبات، في Vite 8.3 + React 19.2 (وضع التطوير) في Chrome headless.

---

## ١. React بتقارن إزاي؟

بعد كل render، React بتقارن كل dependency بقيمتها في المرة اللي فاتت بـ [[Object.is]]:

| النوع | بيتقارن بـ | مثال |
|---|---|---|
| نص، رقم، boolean | القيمة | [['GET' === 'GET']] = true |
| object، array، دالة | المرجع (مكانه في الذاكرة) | [[{} === {}]] = false |

يعني أي [[{}]] أو [[[]]] أو [[() => {}]] بيتكتب **جوه** الـ component هو قيمة **جديدة** في كل render، حتى لو شكلها نفس الشكل.

---

## ٢. النسخة الغلط

~~~text useFetchBad.ts
function useFetchBad(url: string, options = {}) {
  const [data, setData] = useState(null)
  const load = useCallback(async () => {
    setData(await (await fetch(url, options)).json())
  }, [url, options])
  useEffect(() => { load() }, [load])
  return data
}
~~~

### سطر سطر

- [[options = {}]]: default parameter. لو اللي نادى الـ hook مبعتش [[options]]، تبقى [[{}]]. والمهم: الـ [[{}]] دي بتتعمل **جديدة** في كل نداء للـ hook، يعني كل render.
- [[useCallback(fn, deps)]]: «رجّعلي نفس الدالة طول ما الـ deps متغيرتش». شغلته يثبّت مرجع الدالة.
- [[await (await fetch(url, options)).json()]]: من جوه لبرة: [[fetch]] بيبعت الطلب، و [[await]] الأولى (الداخلية) بتستنى الرد، و [[.json()]] بتقرا الـ body كـ JSON، و [[await]] التانية بتستنى القراية. والنتيجة بتروح لـ [[setData]].
- [[useEffect(() => { load() }, [load])]]: شغّل [[load]] كل ما [[load]] تتغير.

### الدايرة

1. render: [[options]] = [[{}]] جديد.
2. [[useCallback]] شايف [[options]] اتغير، فبيرجّع [[load]] **جديدة**.
3. [[useEffect]] شايف [[load]] اتغيرت، فبيشتغل ويبعت طلب.
4. الرد بيوصل و [[setData]] بـ array جديدة (JSON بيتقرا كل مرة object جديد)، فـ render.
5. ارجع لـ ١.

~~~text الناتج (Chrome)
requests in 3s: 1472
~~~

١٤٧٢ طلب في ٣ ثواني، ومبيقفش. والشاشة شكلها طبيعي خالص (نفس البيانات)، فمش هتاخد بالك إلا لو فتحت تاب Network.

---

## ٣. النسخة الصح

~~~text useFetchJson.ts
function useFetchJson(url: string, method = 'GET') {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch(url, { method }).then(r => r.json()).then(setData)
  }, [url, method])
  return data
}
~~~

- [[method = 'GET']]: بدل object كامل، القيمة البسيطة اللي محتاجينها. النص [['GET']] بيتقارن بالقيمة، فمش بيتغير.
- [[fetch(url, { method })]]: الـ object اتعمل **جوه** الـ effect، فمش dependency أصلًا. و [[{ method }]] اختصار [[{ method: method }]].
- [[.then(r => r.json()).then(setData)]]: نفس الخطوات بـ [[then]] بدل [[await]]: لما الرد يوصل اقرا JSON، ولما يتقري ابعته لـ [[setData]]. و [[then(setData)]] بتبعت الدالة نفسها، وهي هتتنادى بالنتيجة.
- [[[url, method]]]: الاتنين نصوص.

~~~text الناتج (Chrome)
requests in 3s: 2
~~~

طلبين: واحد عادي وواحد من الـ mount التاني بتاع Strict Mode في التطوير.

---

## ٤. الـ linter بيقولك قبل ما يحصل

قالب Vite بيجي بـ [[oxlint]] ([[npm run lint]])، وفيه نفس قاعدة [[react-hooks/exhaustive-deps]] اللي في eslint. على effect بيستخدم [[url]] ومش حاطه في الـ array:

~~~text npx oxlint
warning react-hooks(exhaustive-deps): React Hook useEffect has a missing dependency: 'url' help: Either include it or remove the dependency array.
~~~

## ٥. الـ timer اللي واقف على ١

~~~text Timer.tsx
useEffect(() => { const t = setInterval(() => setCount(count + 1), 500); return () => clearInterval(t) }, [])
~~~

[[setInterval(fn, 500)]] بينادي [[fn]] كل نص ثانية، و [[clearInterval]] بيوقفه في الـ cleanup. بعد حوالي ٣ ثواني، قارنّاه بنسخة فيها [[setCount(c => c + 1)]]:

~~~text الناتج (Chrome)
count + 1:       1
c => c + 1:      6
~~~

الـ effect اشتغل مرة واحدة ([[[]]])، فالدالة اللي جواه شايفة [[count]] بتاع أول render للأبد، يعني [[0]]. فكل مرة بتقول «خليها 0 + 1». ده اسمه **stale closure**: دالة ماسكة قيم قديمة. و oxlint كان قال [[missing dependency: 'count']]. الحل مش إنك تضيف [[count]] (كده الـ interval هيتقفل ويتفتح كل نص ثانية)، الحل الـ updater: كده [[count]] مش مستخدمة جوه الـ effect أصلًا.

---

## الخلاصة

| المشكلة | الحل |
|---|---|
| object أو array أو دالة بتتعمل في الـ render وداخلة الـ deps | اعملها جوه الـ effect |
| ثابت ملوش علاقة بالـ props | طلّعه برا الـ component |
| محتاج حتة من object | حط القيمة البسيطة ([[options.method]]) |
| لازم مرجع ثابت | [[useMemo]] و [[useCallback]] بـ deps صح |
| setState من القيمة القديمة | [[setX(prev => ...)]] |

> تحذير [[exhaustive-deps]] اعتبره bug لحد ما تثبت العكس، ومتسكّتوش بـ [[eslint-disable]].`,
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
          teach: R`## الفكرة: ٣ أزواج «غلط وصح»

المثال ٣ حالات، كل حالة فيها effect ملوش لازمة والبديل بتاعه. السطور حتت من components مش ملفات كاملة. عشان نشوف الفرق فعلًا، حطينا الحالة الأولى والتالتة في components حقيقية فيها [[console.log]] في الـ render، وشغّلناها في Vite 8.3 + React 19.2 (وضع التطوير، فكل سطر بيتكرر مرتين بسبب Strict Mode) في Chrome headless.

السؤال اللي بيفرز الحالات: **هل فيه حاجة برا React؟** (شبكة، أو DOM برا الـ component، أو timer، أو مكتبة.) لو لأ، غالبًا مش محتاج effect.

---

## ١. قيمة محسوبة

~~~text غلط
const [visible, setVisible] = useState<Todo[]>([])
useEffect(() => setVisible(todos.filter(t => !t.done)), [todos])
~~~

~~~text صح
const visibleTodos = todos.filter(t => !t.done)
~~~

- [[todos.filter(t => !t.done)]]: المهام اللي [[done]] بتاعها [[false]]. [[!]] بتقلب.
- في الغلط: state جديدة + effect كل شغلته ينسخ نتيجة الـ filter فيها كل ما [[todos]] يتغير.
- في الصح: [[const]] بيتحسب في كل render.

شغّلنا الاتنين جنب بعض على مهمتين (واحدة خلصانة)، وبعدين ضفنا مهمة:

~~~text الـ Console
effect version renders, visible = 0
derived version renders, visible = 1
effect version renders, visible = 1
>> add todo
effect version renders, visible = 1
derived version renders, visible = 2
effect version renders, visible = 2
~~~

(شلنا التكرار بتاع Strict Mode.) نسخة الـ effect اترسمت **مرتين** في كل مرة، والأولى بالرقم الغلط: [[0]] في الأول، و [[1]] بعد الإضافة والصح [[2]]. النسخة المحسوبة مرة واحدة بالرقم الصح.

---

## ٢. حاجة بسبب ضغطة

~~~text غلط
useEffect(() => { if (submitted) postOrder(cart) }, [submitted, cart])
~~~

~~~text صح
function handleBuy() { postOrder(cart) }
~~~

- في الغلط: الضغطة بتعمل [[setSubmitted(true)]]، والـ effect «مستني» يشوف [[submitted]] بقت true عشان يبعت. و [[postOrder]] هنا دالة افتراضية بتبعت الطلب للسيرفر.
- المشكلة: الـ effect مش عارف **ليه** [[submitted]] true. وهو كمان معتمد على [[cart]]: لو السلة اتغيرت و [[submitted]] لسه true، الطلب هيتبعت **تاني**.
- في الصح: [[handleBuy]] هو الـ [[onClick]] بتاع زرار «اشتري». بيتنادى مرة لكل ضغطة، وانت عارف السبب بالظبط.

القاعدة: لو الكود بيحصل **لأن المستخدم عمل حاجة**، مكانه الـ handler. لو بيحصل **لأن الـ component ظهر على الشاشة**، ده effect.

---

## ٣. تصفير state لما prop تتغير

~~~text غلط
useEffect(() => setComment(''), [userId])
~~~

~~~text صح
<Profile userId={userId} key={userId} />
~~~

[[Profile]] فيه خانة تعليق ([[comment]] state). لما تفتح بروفايل مستخدم تاني، المفروض الخانة تبقى فاضية.

- في الغلط: effect بيفضّيها كل ما [[userId]] يتغير.
- في الصح: [[key={userId}]] على الـ component نفسه. [[key]] مش بس للـ lists: React بتعتبر [[<Profile key={1}>]] و [[<Profile key={2}>]] **اتنين مختلفين**. فلما الـ key يتغير بتشيل القديم بكل الـ state اللي جواه وتعمل جديد من الصفر.

كتبنا [[hi]] في الخانة وبعدين بدّلنا لمستخدم 2:

~~~text الـ Console (effect)
>> switch to user 2
Profile(effect) user 2 comment = "hi"
Profile(effect) user 2 comment = ""
~~~

~~~text الـ Console (key)
>> switch to user 2
Profile(key) user 2 comment = ""
~~~

(من غير تكرار Strict Mode.) بالـ effect، بروفايل مستخدم 2 اترسم الأول **بتعليق مستخدم 1** ([[hi]])، وبعدين اتصلّح. بالـ key اترسم فاضي من أول مرة. وفي الحالتين الخانة في الآخر فاضية، الفرق في اللحظة اللي في النص وفي الـ render الزيادة.

---

## الخلاصة

| لو عايز... | متعملش | اعمل |
|---|---|---|
| قيمة من state أو props | state + effect بيعمل set | [[const x = ...]] وقت الرسم |
| حاجة لما المستخدم يدوس | effect مستني flag | في الـ handler |
| تصفّر state الـ component لما prop تتغير | effect بيعمل set لكل state | [[key={prop}]] |
| تتكلم مع حاجة برا React | | effect، ودي شغلته |`,
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
          teach: R`## الفكرة: الطلب القديم ممكن يرجع بعد الجديد

[[UserCard]] بيجيب مستخدم برقمه من [[/api/users/<id>]] ويعرض اسمه. المشكلة اللي بيحلها: لو الـ [[id]] اتغير والطلب القديم لسه مرجعش، مين يكسب؟ عشان نجرّب بجد عملنا API صغير بـ Node فيه تأخير مقصود: [[/api/users/1]] (Ali) بيرد بعد 1.5 ثانية، و [[/api/users/2]] (Mona) بعد 0.2 ثانية، وأي رقم مش موجود بيرجّع 404. ووصّلناه بـ [[server.proxy]] في Vite (درس vite.config)، وضغطنا 1 وبعدها 2 بسرعة، في Vite 8.3 + React 19.2 في Chrome headless.

---

## ١. شكل النتيجة

~~~text UserCard.tsx
const [result, setResult] = useState<{ id: number; user?: User; error?: string } | null>(null)
~~~

state واحدة فيها: الـ [[id]] اللي النتيجة دي **بتاعته**، والمستخدم لو نجح، أو رسالة خطأ لو فشل. و [[| null]] معناها «أو null»، وهي القيمة في الأول.

ليه نخزّن الـ [[id]] مع النتيجة؟ عشان نعرف بعدين هل النتيجة اللي في إيدنا بتاعة الـ [[id]] الحالي ولا لأ.

---

## ٢. الـ effect

### [[new AbortController()]]

أداة بتلغي طلب. فيها حاجتين: [[controller.signal]] (إشارة بتتربط بالطلب)، و [[controller.abort()]] (اضغط زرار الإلغاء).

### [[fetch(..., { signal: controller.signal })]]

الطلب مربوط بالإشارة. لو حد نادى [[abort()]]، المتصفح بيقطع الطلب فعلًا، و [[fetch]] بترمي error اسمه [[AbortError]].

### السلسلة

~~~text UserCard.tsx
.then(res => { if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt); return res.json() })
.then((user: User) => setResult({ id, user }))
.catch(err => { if (err.name !== 'AbortError') setResult({ id, error: err.message }) })
~~~

1. [[res.ok]]: [[true]] لو الـ status بين 200 و 299. [[fetch]] **مبترميش** error على 404 ولا 500، بترمي بس لو الشبكة نفسها وقعت. فبنفحص بإيدنا، و [[throw]] بيرمي error بنفسنا ([[HTTP 404]] مثلًا) فيروح للـ [[catch]].
2. [[setResult({ id, user })]]: خزّن المستخدم **ومعاه الـ id اللي اتطلب عشانه**.
3. [[.catch(...)]]: أي error في السلسلة. لو هو الإلغاء بتاعنا، تجاهله. غير كده خزّنه.

### الـ cleanup

~~~text UserCard.tsx
return () => controller.abort()
}, [id])
~~~

لما [[id]] يتغير، React بتنادي الـ cleanup بتاع الـ effect **القديم** الأول، فالطلب القديم يتلغي، وبعدين الـ effect الجديد يبعت طلب جديد.

---

## ٣. العرض

~~~text UserCard.tsx
if (result?.id !== id) return <p>Loading...</p>
if (result.error) return <p role="alert">{result.error}</p>
return <h2>{result.user?.name}</h2>
~~~

- [[result?.id]]: [[?.]] (optional chaining) معناها «لو [[result]] مش null هات [[id]]، غير كده [[undefined]]». فالشرط صح لو مفيش نتيجة، **أو** النتيجة بتاعة id تاني. في الحالتين: لسه بيحمّل.
- الـ loading **محسوب** مش state، فمش محتاج تعمل [[setLoading(true)]] في أول الـ effect.

---

## ٤. اللي حصل

~~~text الناتج (Chrome)
start (id=3)                   id=3  <h2>Sara</h2>
0.4s after clicking 1 then 2   id=2  <h2>Mona</h2>
1.9s after                     id=2  <h2>Mona</h2>
id=9 (404)                     id=9  <p role="alert">HTTP 404</p>
~~~

~~~text الشبكة
request /api/users/1 failed: net::ERR_ABORTED
request /api/users/2 finished
~~~

طلب 1 اتلغى وهو في الطريق ([[ERR_ABORTED]]، وفي DevTools بيتكتب [[(canceled)]])، فرده عمره ما وصل. و 404 طلع رسالة بدل ما يتعامل كبيانات.

### من غير الـ cleanup (الشرط موجود)

~~~text الناتج
0.4s after clicking 1 then 2   id=2  <h2>Mona</h2>
1.9s after                     id=2  <p>Loading...</p>
~~~

الطلبين كمّلوا. رد 2 وصل الأول واتعرض، وبعدين رد 1 وصل وعمل [[setResult({ id: 1, ... })]] فوقه. الشرط شاف [[1 !== 2]] فعرض Loading... وهيفضل كده للأبد. الشرط منع البيانات الغلط، بس مش كفاية.

### من غير الاتنين

~~~text الناتج
0.4s after clicking 1 then 2   id=2  <h2>Mona</h2>
1.9s after                     id=2  <h2>Ali</h2>
~~~

ده الـ race condition بعينه: الـ id = 2 والشاشة بتقول Ali، لأن الرد اللي وصل **آخر** هو اللي كسب، مش الطلب اللي اتبعت آخر.

---

## الخلاصة

| الحماية | بتمنع إيه |
|---|---|
| [[AbortController]] في الـ cleanup | الرد القديم يوصل أصلًا (وبتوفّر الشبكة) |
| [[id]] متخزّن مع النتيجة | عرض نتيجة id تاني، و loading من غير state |
| [[res.ok]] | التعامل مع صفحة 404 أو 500 كأنها بيانات |
| [[err.name !== 'AbortError']] | الإلغاء بتاعك يتعرض كـ error |

> الكود ده بيتكتب في كل component بيجيب بيانات. لما يكتروا، TanStack Query بيعمل ده كله ومعاه cache.`,
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
          teach: R`## الفكرة: state للي ظاهر، و ref للي مستخبي

[[Stopwatch]] ساعة إيقاف فيها ٣ حاجات محتاجة تتفكر بين الـ renders: الوقت ([[ms]]، ظاهر على الشاشة)، ورقم الـ interval ([[timerRef]]، مش ظاهر)، وعنصر خانة الملاحظة ([[noteRef]]، عنصر DOM). الأولى state، والاتنين التانيين refs. اتشغّل في Vite 8.3 + React 19.2 (وضع التطوير) في Chrome headless، والضغط بـ Playwright.

---

## ١. التلات hooks

~~~text Stopwatch.tsx
const [ms, setMs] = useState(0)
const timerRef = useRef<number | null>(null)
const noteRef = useRef<HTMLInputElement>(null)
~~~

| الاسم | النوع | ليه ده بالذات |
|---|---|---|
| [[ms]] | state | معروض على الشاشة، فتغييره لازم يعيد الرسم |
| [[timerRef]] | ref شايل [[number]] أو [[null]] | الـ id بتاع الـ interval. محدش بيشوفه، فتغييره ميستاهلش render |
| [[noteRef]] | ref شايل عنصر [[<input>]] | عشان نعمل [[focus()]] للخانة |

### [[useRef]] بيرجّع إيه؟

object شكله [[{ current: القيمة_الأولى }]]. نفس الـ object بالظبط في كل render، و [[current]] جواه بتقدر تغيّرها عادي ([[timerRef.current = 5]]). React مش بتراقبها، فتغييرها **مش** بيعمل render.

و [[<number | null>]] نوع TypeScript: «فيها رقم أو null». وفي React 19، [[useRef<HTMLInputElement>(null)]] نوعه [[RefObject<HTMLInputElement | null>]]. جرّبنا [[noteRef.current.focus()]] من غير [[?.]] و [[tsc]] قال:

~~~text tsc
error TS18047: 'noteRef.current' is possibly 'null'.
~~~

---

## ٢. [[start]]

~~~text Stopwatch.tsx
function start() {
  if (timerRef.current !== null) return
  timerRef.current = window.setInterval(() => setMs(m => m + 100), 100)
}
~~~

- [[if (timerRef.current !== null) return]]: لو فيه timer شغال خلاص، اخرج. ده بيمنع timer تاني.
- [[window.setInterval(fn, 100)]]: نادي [[fn]] كل 100 ميلي ثانية، وبيرجّع رقم (id) تقدر توقفه بيه بعدين. و [[window.]] قدامها عشان TypeScript يعرف إنها نسخة المتصفح اللي بترجّع [[number]] (نسخة Node بترجّع object).
- [[setMs(m => m + 100)]]: updater، لأن الدالة دي بتتنادى بعدين كتير، و [[ms]] اللي شايفاها هتبقى قديمة (stale closure، درس dependency array).
- [[timerRef.current = ...]]: احفظ الـ id. **مفيش render**.

## ٣. [[stop]]

~~~text Stopwatch.tsx
function stop() {
  if (timerRef.current !== null) clearInterval(timerRef.current)
  timerRef.current = null
  noteRef.current?.focus()
}
~~~

- [[clearInterval(id)]]: وقّف الـ interval ده.
- [[timerRef.current = null]]: علامة إنه واقف، عشان [[start]] تشتغل تاني.
- [[noteRef.current?.focus()]]: حط المؤشر في خانة الملاحظة. [[?.]] لو [[current]] بـ [[null]] (الخانة مش موجودة) متعملش حاجة بدل ما تقع.

## ٤. الـ JSX

~~~text Stopwatch.tsx
<>{(ms / 1000).toFixed(1)}s <button onClick={start}>Start</button> <button onClick={stop}>Stop</button> <input ref={noteRef} placeholder="Lap note" /></>
~~~

- [[(ms / 1000).toFixed(1)]]: ميلي ثانية لثواني، برقم عشري واحد.
- [[ref={noteRef}]]: بيقول لـ React «حط عنصر الـ input ده في [[noteRef.current]]». React بتحطه بعد ما تعمل الـ DOM، وترجّعه [[null]] لو العنصر اتشال. عشان كده في أول render (قبل الـ DOM) القيمة لسه [[null]].

---

## ٥. اللي حصل

ضغطنا Start مرتين ورا بعض، واستنينا حوالي ثانية، وبعدين Stop:

~~~text الناتج (Chrome)
initial                  0.0s  focused=BODY
~1s after Start, Start   1.2s  focused=BUTTON
after Stop               1.2s  focused=INPUT
1s after Stop            1.2s  focused=INPUT
~~~

- Start التانية رجعت من أول سطر، فالوقت بيعدّ بسرعته العادية.
- بعد Stop الوقت وقف، والمؤشر راح للخانة ([[INPUT]]).

### من غير الـ [[if]]

~~~text الناتج
~1s after Start, Start   2.2s
after Stop               2.3s
1s after Stop            3.3s
~~~

Start التانية عملت interval تاني وكتبت الـ id بتاعه فوق الأول في [[timerRef.current]]. فالوقت بيجري بالضعف، و Stop وقّف التاني بس. الأول id بتاعه ضاع، ومحدش هيقدر يوقفه.

### [[timerRef]] كـ state

بدّلنا الـ ref بـ [[const [timer, setTimer] = useState<number | null>(null)]] وعدّينا الـ renders:

~~~text الـ Console (state)
>> Start
render 3
render 4
>> Stop
render 9
render 10
~~~

~~~text الـ Console (ref)
>> Start
>> Stop
~~~

(كل render بيتطبع مرتين بسبب Strict Mode، وشلنا renders الـ ticks اللي هي نفسها في الاتنين.) بالـ state، Start و Stop كل واحد عمل render زيادة عشان رقم محدش شايفه. بالـ ref، ولا واحد.

---

## الخلاصة

| | [[useState]] | [[useRef]] |
|---|---|---|
| بيرجّع | قيمة + دالة تغيير | [[{ current }]] |
| التغيير بيعمل render؟ | أيوه | لأ |
| تقراه وقت الرسم؟ | أيوه | لأ، في الـ handlers والـ effects بس |
| بيتستخدم لـ | أي حاجة ظاهرة | timer ids، وعناصر DOM ([[ref={...}]])، وقيم داخلية |`,
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
]);

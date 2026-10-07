// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
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
          teach: R`## الفكرة: الـ component يقول «عايز صفحة ١» والمكتبة تتصرف

[[Products]] بيطلب منتجات صفحة معينة من [[/api/products]] ويعرضها في list. مفيش [[useState]] ولا [[useEffect]] ولا [[fetch]] جوه الـ component نفسه: كله جوه [[useQuery]]. المثال اتشغّل في Vite 8.3 + React 19.3 + TanStack Query 5.104 في Chrome headless، مع API تجريبي بيرجّع ٣ منتجات في الصفحة بعد ٣٠٠ms. والمثال محتاج نوع [[Product]] متعرّف فوقه، زي [[type Product = { id: number; name: string }]].

---

## ١. الـ import

~~~text Products.tsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
~~~

| الاسم | هو إيه |
|---|---|
| [[QueryClient]] | class، الـ object بتاعها هو **الكاش** نفسه وإعداداته |
| [[QueryClientProvider]] | component بيحط الـ client في context عشان أي hook تحته يلاقيه |
| [[useQuery]] | الـ hook اللي الـ component بيطلب بيه بيانات |

والمكتبة بتتسطب بـ [[npm i @tanstack/react-query]]. اسمها القديم React Query، وعشان كده هتسمع الاسمين.

## ٢. الكاش: [[const queryClient = new QueryClient()]]

[[new]] بتعمل object من الـ class. السطر ده **برا** أي component عشان يتنفذ مرة واحدة لما الملف يتحمّل. لو حطيته جوه الـ component، كل render هيعمل كاش جديد فاضي، والبيانات تضيع كل شوية.

## ٣. دالة الجلب [[getProducts]]

~~~text Products.tsx
async function getProducts(page: number): Promise<Product[]> {
  const res = await fetch($__bt/api/products?page=$__{page}$__bt)
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt)
  return res.json()
}
~~~

- [[async]]: الدالة بترجع **promise**، يعني «وعد» إن النتيجة هتيجي بعدين. و [[Promise<Product[]>]] نوع الرجوع: promise هتطلع array منتجات.
- [[await fetch(...)]]: ابعت الطلب واستنى الرد. الـ URL متكتب بـ template literal، و [[$__{page}]] بتتحط مكانها قيمة [[page]]، فـ [[page = 1]] يطلع [[/api/products?page=1]]. و [[?page=]] اسمه query string، بيبعت معلومة إضافية للسيرفر.
- [[res.ok]]: [[true]] لو الـ status بين 200 و 299. [[fetch]] **مبيرميش** error لما السيرفر يرد بـ 404 أو 500، هو بيرمي بس لو الشبكة نفسها وقعت. فلازم انت ترمي بإيدك عشان [[useQuery]] يعرف إن الطلب فشل.
- [[throw new Error(...)]]: ارمي خطأ رسالته زي [[HTTP 500]].
- [[res.json()]]: حوّل الرد من JSON لـ object. هو كمان promise، والـ [[async]] بتستناه لوحدها لما ترجّعه.

## ٤. الـ component و [[useQuery]]

~~~text Products.tsx
function Products({ page }: { page: number }) {
  const { data, isPending, error } = useQuery({ queryKey: ['products', page], queryFn: () => getProducts(page) })
~~~

[[{ page }: { page: number }]]: الـ props بتاعة الـ component متفكّكة (destructuring)، وبعد النقطتين نوعها.

[[useQuery]] بياخد object فيه حاجتين:

| الحقل | قيمته | ليه |
|---|---|---|
| [[queryKey]] | [[['products', page]]] | اسم البيانات دي في الكاش. فيه [[page]] عشان كل صفحة ليها مكان لوحدها |
| [[queryFn]] | [[() => getProducts(page)]] | الدالة اللي بتجيب البيانات لما مش موجودة أو قديمة |

ليه [[queryFn]] arrow function ومش [[getProducts]] على طول؟ لأن المكتبة بتنادي الـ queryFn وبتديها object معلومات (فيه الـ key و signal للإلغاء). لو كتبت [[queryFn: getProducts]]، الـ object ده هيدخل مكان [[page]].

وبيرجّع object كبير، احنا فكّينا منه ٣:

| الاسم | معناه |
|---|---|
| [[data]] | البيانات لما توصل، و [[undefined]] قبلها |
| [[isPending]] | [[true]] طول ما مفيش data خالص لسه |
| [[error]] | الـ Error اللي اترمى بعد ما كل المحاولات فشلت، أو [[null]] |

## ٥. التلات حالات

~~~text Products.tsx
  if (isPending) return <p>Loading...</p>
  if (error) return <p role="alert">{error.message}</p>
  return <ul>{data.map(p => <li key={p.id}>{p.name}</li>)}</ul>
~~~

- لسه بيحمّل؟ اعرض «Loading...» واخرج.
- فشل؟ اعرض الرسالة. و [[role="alert"]] بيخلي قارئ الشاشة يقراها على طول.
- غير كده، يبقى فيه data. و TypeScript فاهم ده: بعد السطرين اللي فوق نوع [[data]] بقى [[Product[]]] مش [[Product[] | undefined]]، فـ [[data.map]] من غير [[?.]] بتعدّي من [[tsc]] من غير errors (اتجرّب).
- [[data.map(...)]] بتحوّل كل منتج لـ [[<li>]]، و [[key={p.id}]] عشان React تعرف كل عنصر (درس key).

## ٦. الـ Provider

~~~text Products.tsx
export const App = () => <QueryClientProvider client={queryClient}><Products page={1} /></QueryClientProvider>
~~~

[[useQuery]] بيدوّر على أقرب [[QueryClientProvider]] فوقه ويستخدم الكاش اللي فيه. من غيره بيرمي error إن مفيش QueryClient.

---

## ٧. اللي حصل لما اتشغّل

~~~text Network و الشاشة (Chrome headless)
  437ms >> GET /api/products?page=1
  745ms << 200 GET /api/products?page=1
 1928ms الشاشة: <ul><li>Mug</li><li>Pen</li><li>Lamp</li></ul>
~~~

[[>>]] الطلب طالع و [[<<]] الرد راجع. طلب واحد، و ٣٠٠ms بعده الـ list ظهرت.

### نفس الـ component مرتين، وزرارين p1 و p2

رسمنا [[<Products page={page} />]] مرتين جنب بعض، والـ [[page]] في state بيتغير بزرارين:

~~~text Network و الشاشة
  195ms >> GET /api/products?page=1
  175ms الشاشة: Loading...  Loading...
  499ms << 200 GET /api/products?page=1
 1029ms الشاشة: Mug Pen Lamp  Mug Pen Lamp
>> click p2
 1117ms >> GET /api/products?page=2
 1120ms الشاشة: Loading...  Loading...
 1933ms الشاشة: Desk Chair Book  Desk Chair Book
>> click p1
 1959ms >> GET /api/products?page=1
 1962ms الشاشة: Mug Pen Lamp  Mug Pen Lamp
~~~

- **اتنين components وطلب واحد**: الاتنين ليهم نفس الـ key [[['products', 1]]]، فالمكتبة بتبعت طلب واحد وتدّي النتيجة للاتنين (اسمها dedupe).
- **p2**: key جديد مش في الكاش، فـ «Loading...» وطلب جديد.
- **الرجوع لـ p1**: القايمة ظهرت **فورًا** (بعد ٣ms) من الكاش، وفي نفس الوقت طلب GET في الخلفية. ده لأن [[staleTime]] الافتراضي صفر، فالبيانات بتتعرض وتتحدّث بعدها (الدرس الجاي).

### لما السيرفر يرجّع 500

خلّينا الـ API يرجّع 500 على طول، وقرينا الشاشة كل ثانية:

~~~text Network و الشاشة
  208ms >> GET /api/fail      << 500
 1228ms >> GET /api/fail      << 500
 3250ms >> GET /api/fail      << 500
 7270ms >> GET /api/fail      << 500
 1201ms → 6321ms  الشاشة: Loading...
 7331ms           الشاشة: HTTP 500
~~~

٤ طلبات: الأصلي و ٣ retries، والفرق بينهم ١ ثم ٢ ثم ٤ ثواني (بيتضاعف). وطول المدة دي [[isPending]] لسه [[true]]، والـ error ظهر بعد حوالي ٧ ثواني. والرسالة [[HTTP 500]] هي اللي احنا رميناها في [[getProducts]]. ولو شلت سطر [[res.ok]]، [[res.json()]] كان هيحاول يقرا رد الـ 500 كأنه منتجات.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[new QueryClient()]] برا الـ component | الكاش، مرة واحدة للتطبيق |
| [[QueryClientProvider]] | يوصّل الكاش لأي [[useQuery]] تحته |
| [[queryKey]] | اسم البيانات، وفيه كل متغير الـ queryFn بيستخدمه |
| [[queryFn]] | بترجع promise، وترمي error لو الرد مش ناجح |
| [[isPending]] ثم [[error]] ثم [[data]] | بالترتيب ده، فـ TypeScript يعرف إن data موجودة |

> نفس الـ key = نفس البيانات: طلب واحد، وكاش واحد، ولو رجعت ليه بيظهر فورًا.`,
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
          ],
          sol: R`Products مرتين = طلب [[GET /api/products?page=1]] واحد بس، لأن الاتنين عندهم نفس الـ queryKey، و React Query بيشارك الطلب الشغال والنتيجة. في الـ Devtools هتلاقي query واحدة [[["products",1]]] وجنبها رقم 2 (عدد اللي بيراقبوها).

لما ترجع من صفحة 2 لـ 1، القايمة بتظهر فورًا من الكاش من غير «Loading...». وممكن تلاقي GET جديد في الخلفية، لأن الـ staleTime الافتراضي صفر، فالبيانات بتتعرض وبتتحدّث بعدها (stale-while-revalidate). لو شفت طلبين في أول تحميل، غالبًا الـ key مختلف بين الاتنين (رقم في واحدة ونص في التانية) أو انت عامل [[new QueryClient()]] جوه component فبيتعمل من جديد كل render.`
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

الـ stale query بيتعاد جلبها في الخلفية لما: component جديد يستخدمها (refetchOnMount)، أو المستخدم يرجع للتاب (refetchOnWindowFocus)، أو النت يرجع (refetchOnReconnect). والـ fresh مبيحصلهاش حاجة من دول. أما invalidate فبيخلي الـ query stale ويجيبها تاني حتى لو لسه fresh، ودي الطريقة اللي بتجبر بيها refetch. يعني staleTime هو اللي بيتحكم في عدد الطلبات.

الاختيار: [[Infinity]] لحاجة مبتتغيرش غير بفعل منك (وانت بتعمل invalidate بعد التعديل). ودقيقة لخمسة لأغلب الـ lists. وصفر مع [[refetchInterval]] للحاجات الحية. و [[enabled: false]] بيوقف الـ query لحد ما شرط يتحقق، زي id لسه موجاش.

وفي الـ pagination، لما الـ key يتغير لصفحة جديدة مش في الكاش، الـ data بتبقى undefined وبيظهر loading. [[placeholderData: keepPreviousData]] بيخلي الصفحة القديمة معروضة لحد ما الجديدة توصل.

في مشروع حقيقي كان الإعداد العام [[staleTime: 60 * 1000]] و [[refetchOnWindowFocus: false]] و [[retry: 2]]. ده اختيار معقول للوحة أدمن، بس خد بالك إن قفل الـ focus refetch معناه إن الأدمن لو ساب التاب ساعة ورجع، هيشوف القديم لحد ما يتنقل.`,
            when: "حدد defaults معقولة في الـ QueryClient، وغيّر لكل query حسب طبيعة بياناتها.",
            mistakes: R`تفتكر إن staleTime هو مدة الكاش (ده gcTime). و staleTime كبير من غير invalidate بعد التعديل، فالمستخدم يعدّل ومش شايف التعديل. وتقفل كل الـ refetch وبعدين تعمل زرار «تحديث» بإيدك. و «ليه بيطلب لما أغيّر التاب؟»: ده الـ feature نفسها، ظبط staleTime بدل ما تقفلها.`
          },
          teach: R`## الفكرة: ساعتين لكل query

كل query في الكاش ليها ساعتين:

- [[staleTime]]: من ساعة ما البيانات وصلت، تفضل **fresh** (طازة) قد إيه. وهي fresh مفيش أي refetch أوتوماتيك.
- [[gcTime]]: من ساعة ما آخر component بيستخدمها اتشال، تفضل في الكاش قد إيه قبل ما تتمسح. [[gc]] اختصار garbage collection، يعني «لم الزبالة».

المثال فيه الإعدادات العامة، وبعدين ٣ queries كل واحدة بتغيّر حاجة لنفسها. اتشغّل في Vite + React 19.3 + TanStack Query 5.104 في Chrome headless، والـ API بيرد بعد ٥٠ms.

---

## ١. [[new QueryClient({ defaultOptions: { queries: {...} } })]]

الـ object ده الإعدادات الافتراضية لكل [[useQuery]] في التطبيق. [[defaultOptions]] فيه قسمين: [[queries]] و [[mutations]]، واحنا بنظبط الـ queries بس. وأي query تقدر تكتب نفس الاسم لنفسها وهو يغلب الافتراضي.

| الإعداد | القيمة | معناها | الافتراضي لو مكتبتهوش |
|---|---|---|---|
| [[staleTime]] | [[60_000]] | البيانات fresh دقيقة | [[0]] |
| [[gcTime]] | [[5 * 60_000]] | تفضل في الكاش ٥ دقايق بعد آخر استخدام | ٥ دقايق |
| [[retry]] | [[2]] | لو الطلب فشل، جرّب كمان مرتين | [[3]] |
| [[refetchOnWindowFocus]] | [[true]] | لو stale، هات الجديد لما المستخدم يرجع للتاب | [[true]] |

- [[60_000]]: الـ [[_]] جوه الرقم مجرد فاصل عشان يتقري (زي ٦٠,٠٠٠)، وقيمته ٦٠٠٠٠. والأوقات كلها بالـ **ms** (ملي ثانية، ١٠٠٠ منها = ثانية)، فـ ٦٠٠٠٠ = دقيقة.
- [[5 * 60_000]]: ٥ دقايق مكتوبة بشكل مفهوم بدل [[300000]].

## ٢. [[staleTime: Infinity]] للإعدادات

~~~text queries.ts
useQuery({ queryKey: ['settings'], queryFn: getSettings, staleTime: Infinity })
~~~

[[Infinity]] رقم في JavaScript معناه «ما لانهاية»، فالبيانات عمرها ما بتبقى stale لوحدها. هتتجاب تاني بس لو انت عملت [[invalidateQueries]] بعد ما تعدّلها.

## ٣. [[refetchInterval: 10_000]] للطلبات الحية

~~~text queries.ts
useQuery({ queryKey: ['orders', 'live'], queryFn: getLiveOrders, refetchInterval: 10_000 })
~~~

هات البيانات كل ١٠ ثواني طول ما فيه component بيعرضها، حتى لو fresh. ده polling.

## ٤. [[enabled: !!id]] لـ query مستنية حاجة

~~~text queries.ts
useQuery({ queryKey: ['user', id], queryFn: () => getUser(id!), enabled: !!id })
~~~

- [[!!id]]: [[!]] مرة بتقلب القيمة لـ boolean معكوس، والتانية بترجّعها. يعني [[!!undefined]] = [[false]] و [[!!'2']] = [[true]]. كده [[enabled]] بقت boolean صريح.
- [[enabled: false]]: الـ query موجودة بس مبتجيبش. حالتها [[pending]] و [[fetchStatus]] بتاعها [[idle]] (مستنية).
- [[id!]]: الـ [[!]] **بعد** الاسم حاجة تانية خالص: بتقول لـ TypeScript «أنا متأكد إن ده مش undefined». آمنة هنا لأن الـ queryFn مش هتتنادى غير لما [[enabled]] تبقى true.
- [[id]] جوه الـ key، فكل يوزر ليه كاش لوحده.

> [[!!id]] بتقع لو الـ id ممكن يبقى [[0]] (لأن [[!!0]] = false). وقتها اكتب [[id !== undefined]] (درس «enabled و useQueries»).

---

## ٥. اللي حصل لما اتشغّل

رسمنا ٤ components: settings و orders و user (والـ id لسه undefined) و products (query عادية بالإعدادات العامة).

### أول تحميل و enabled

~~~text Network و الشاشة
  265ms >> GET /api/categories/10     (settings)
  266ms >> GET /api/todos             (orders)
  266ms >> GET /api/products?page=1   (products)
  762ms الشاشة: user: pending/idle
>> زرار يحط id = '2'
 1682ms >> GET /api/products/2        (user)
 2001ms الشاشة: user: success/idle Pen
~~~

٣ طلبات بس في الأول: الـ user مطلعش طلب لأن [[enabled]] كانت false، وحالته [[pending/idle]]. أول ما الـ id بقى [['2']] الطلب طلع لوحده.

### الرجوع للتاب: [[staleTime: 0]] ولا [[60_000]]؟

Chrome الـ headless مبيغيّرش [[visibilityState]] لما تبدّل تابات، فعملنا اللي المتصفح بيعمله بالظبط: خلّينا [[document.visibilityState]] ترجع [[hidden]] وبعدين [[visible]] وبعتنا event [[visibilitychange]]. ده الـ event اللي TanStack Query بيسمعله.

~~~text staleTime: 0
 1069ms >> tab hidden
 1372ms >> tab visible
 1377ms >> GET /api/todos
 1378ms >> GET /api/products?page=1
~~~

~~~text staleTime: 60_000
  998ms >> tab hidden
 1305ms >> tab visible
                (ولا طلب)
~~~

- بصفر: كل حاجة stale على طول، فالرجوع جاب orders و products تاني. الـ settings **مطلبتش** لأن [[staleTime: Infinity]] بتاعها بيغلب الافتراضي.
- بدقيقة: رجعنا بعد ثانية، فكله لسه fresh ومفيش طلبات.

### [[gcTime]]: الكاش بيتمسح إمتى؟

شلنا component الـ products من الشاشة، وخلّينا [[gcTime: 2000]] (ثانيتين) عشان نشوفها بتتمسح، وقرينا الكاش قبل وبعد:

~~~text الكاش
 1965ms ["settings"]:active  ["orders","live"]:active  ["user",null]:inactive  ["products",1]:inactive  ["user","2"]:active
 4475ms ["settings"]:active  ["orders","live"]:active  ["user","2"]:active
~~~

- [[active]]: فيه component بيستخدمها. [[inactive]]: مفيش.
- [[["products",1]]] بقت inactive أول ما الـ component اتشال، وبعد ثانيتين اتمسحت.
- [[["user",null]]] هي الـ key القديم [[['user', undefined]]] ([[JSON.stringify]] بيكتب undefined جوه array كـ null). أول ما الـ id اتغير الـ key اتغير، فالقديمة بقت inactive واتمسحت هي كمان.

ولو رجع الـ component قبل ما الـ gcTime يخلص، البيانات بتظهر فورًا من الكاش.

### [[refetchInterval]]

~~~text Network
  203ms >> GET /api/todos
10268ms >> GET /api/todos
~~~

بعد ١٠ ثواني بالظبط من أول طلب، الـ orders اتجابت تاني من غير ما حد يعمل حاجة.

---

## الخلاصة

| | [[staleTime]] | [[gcTime]] |
|---|---|---|
| بيبدأ يعدّ إمتى | لما البيانات توصل | لما آخر component يتشال |
| لما يخلص | البيانات تبقى stale (لسه بتتعرض) | البيانات **تتمسح** من الكاش |
| الافتراضي | [[0]] | ٥ دقايق |
| بيتحكم في | عدد الطلبات | الذاكرة، وهل الرجوع هيبقى فوري |

> stale مش معناها «اتمسحت»: معناها «اعرضها، وهات الجديدة في أول فرصة» (component جديد، رجوع للتاب، رجوع النت).`,
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
          ],
          sol: R`بـ [[staleTime: 0]]: كل ما ترجع للتاب هتلاقي GET جديد لكل query ظاهرة. بـ [[60_000]]: لو رجعت قبل دقيقة من آخر fetch مفيش طلبات، ولو بعدها طلب جديد. [[refetchOnWindowFocus]] بيشتغل بس لو البيانات stale.

لاحظ إن React Query بيسمع لـ [[visibilitychange]]، فلازم تروح لتاب تاني فعلًا مش بس تدوس على DevTools. ولو مش شايف طلبات خالص حتى بصفر، اتأكد إن الـ query عليها component بيعرضها دلوقتي (الـ queries اللي ملهاش observer مبتتعملش refetch)، وإن [[refetchOnWindowFocus]] مش false.`
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
          teach: R`## الفكرة: «ابعت التعديل، وبعدها قول للكاش إنه قديم»

[[DeleteButton]] زرار بيمسح منتج من السيرفر. [[useMutation]] بيمسك حالة الطلب (شغال، فشل)، و [[invalidateQueries]] بيخلي الـ list تتجاب تاني بعد النجاح. حطينا الزرار جنب كل منتج في list درس useQuery، واتشغّل في Vite + React 19.3 + TanStack Query 5.104 في Chrome headless، والـ API بيرد بعد ٣٠٠ms. و [[toast]] في المثال دالة من مكتبة إشعارات (زي sonner)، في التجربة خلّيناها [[console.log]].

---

## ١. [[useQueryClient()]]

~~~text DeleteButton.tsx
const queryClient = useQueryClient()
~~~

بيرجّع نفس الـ [[QueryClient]] اللي في الـ Provider فوق. محتاجينه عشان نوصل للكاش ونعمل invalidate. ومتعملش [[new QueryClient()]] هنا: ده هيبقى كاش تاني خالص ومفيهوش الـ list.

## ٢. [[useMutation({...})]]

بياخد object فيه الدالة اللي بتعدّل، والـ callbacks اللي تشتغل بعدها، ويرجّع object سميناه [[remove]].

### [[mutationFn]]

~~~text DeleteButton.tsx
mutationFn: async () => {
  const res = await fetch($__bt/api/products/$__{id}$__bt, { method: 'DELETE' })
  if (!res.ok) throw new Error('Delete failed')
},
~~~

- [[fetch(url, { method: 'DELETE' })]]: التاني هو الـ options. [[method]] نوع الطلب، والافتراضي GET. و DELETE معناها «امسح الحاجة اللي في العنوان ده».
- [[if (!res.ok) throw]]: نفس قاعدة useQuery. [[fetch]] مبيرميش على 500، فلو مرميناش، الـ mutation هتفتكر إنها نجحت.
- الدالة مبترجّعش حاجة: المسح ملوش نتيجة نستخدمها.

### [[onSuccess]]

~~~text DeleteButton.tsx
onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
~~~

بتشتغل لو [[mutationFn]] خلصت من غير error. [[invalidateQueries]] بتعلّم كل query الـ key بتاعها **بيبدأ** بـ [[['products']]] إنها stale، واللي معروض منهم على الشاشة بيتجاب تاني على طول. فـ [[['products', 1]]] و [[['products', 2]]] الاتنين يتطابقوا.

والـ arrow هنا مكتوبة من غير [[{ }]]، فهي **بترجّع** الـ promise بتاع [[invalidateQueries]]. ده مهم تحت.

### [[onError]]

~~~text DeleteButton.tsx
onError: err => toast(err.message),
~~~

بتشتغل لو الدالة رمت. و [[err]] هو الـ Error اللي رميناه، فـ [[err.message]] = [[Delete failed]].

## ٣. الزرار

~~~text DeleteButton.tsx
<button onClick={() => remove.mutate()} disabled={remove.isPending}>{remove.isPending ? 'Deleting...' : 'Delete'}</button>
~~~

- [[remove.mutate()]]: شغّل الـ mutation. ومكتوبة جوه arrow عشان تتنادى وقت الضغط، مش وقت الرسم.
- [[remove.isPending]]: [[true]] طول ما الطلب شغال. [[disabled]] بيقفل الزرار فالمستخدم ميدوسش مرتين.
- [[شرط ? أ : ب]]: لو الشرط true خد [[أ]]، غير كده [[ب]]. فالنص بيتغير لـ «Deleting...».

---

## ٤. اللي حصل لما اتشغّل

### مسح Lamp

~~~text Network و الشاشة
 1067ms >> click Delete على Lamp
 1136ms >> DELETE /api/products/3
 1191ms الشاشة: Mug, Pen, Lamp [Deleting...] (disabled)
 1454ms << 204 DELETE /api/products/3
 1454ms >> GET /api/products?page=1
 1497ms الشاشة: Mug, Pen, Lamp [Deleting...] (disabled)
 1762ms << 200 GET /api/products?page=1
 1809ms الشاشة: Mug, Pen, Desk
~~~

- [[204]] يعني نجح ومفيش body. في نفس الملي ثانية [[onSuccess]] اشتغلت وطلع GET للـ list.
- لاحظ [[1497ms]]: المسح خلص بس الزرار لسه «Deleting...». ده لأن [[onSuccess]] رجّعت الـ promise، فالمكتبة استنته، و [[isPending]] فضلت true لحد ما الـ list الجديدة وصلت. لو كانت فضلت مفتوحة، المستخدم كان هيشوف Lamp بزرار Delete عادي لـ ٣٠٠ms ويدوس تاني.
- الـ list الجديدة فيها Desk مكان Lamp، لأن صفحة ١ = أول ٣ منتجات.

### نفس الكلام بـ [[['product']]] (من غير s)

~~~text Network و الشاشة
 1080ms >> DELETE /api/products/3
 1388ms << 204 DELETE /api/products/3
 1464ms الشاشة: Mug, Pen, Lamp [Delete]
 2294ms الشاشة: Mug, Pen, Lamp [Delete]
~~~

المسح حصل على السيرفر بس مفيش GET بعده، و Lamp لسه ظاهرة. المطابقة عنصر عنصر: [['product']] مش بداية [['products', 1]].

### لما السيرفر يرفض

~~~text Network و الـ Console
 1159ms >> DELETE /api/fail
 1475ms << 500 DELETE /api/fail
 1476ms [log] toast: Delete failed
 1532ms الشاشة: Mug, Pen, Lamp [Delete]
~~~

طلب **واحد** بس: الـ mutations مبتعملش retry افتراضيًا (عكس الـ queries اللي بتحاول ٣ مرات). و [[onError]] اشتغلت، والزرار رجع مفتوح.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[useQueryClient()]] | الكاش اللي في الـ Provider |
| [[mutationFn]] | الطلب نفسه، ويرمي لو فشل |
| [[onSuccess]] → [[invalidateQueries]] | علّم الـ queries القديمة، والمعروض يتجاب تاني |
| [[onError]] | قول للمستخدم |
| [[mutate()]] و [[isPending]] | شغّل، واقفل الزرار وهو شغال |

> الـ key في invalidate لازم يكون **بداية** الـ key اللي في useQuery بالظبط، حرف بحرف.`,
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
          ],
          sol: R`لما تمسح: [[DELETE /api/products/3]] وبعده على طول [[GET /api/products?page=1]] لوحده، والمنتج يختفي من القايمة. الـ invalidate بيعلّم كل query مفتاحها بيبدأ بـ [[['products']]] إنها stale، واللي معروض منهم بيتجاب من جديد.

بـ [[['product']]] هتلاقي الـ DELETE بس، والمنتج يفضل ظاهر لحد ما تعمل refresh. المطابقة بالـ prefix عنصر عنصر، و [[product]] مش نفس [[products]]. عشان كده الفرق بيعمل query key factory، فالمفاتيح تيجي من مكان واحد بدل ما تتكتب بإيدك.`
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

اللي بترجّعه من onMutate بيوصل لـ onSuccess و onError كـ argument تالت، ولـ onSettled كـ argument رابع (بعد data و error و variables)، وفي الـ docs الجديدة اسمه onMutateResult. وفي v5 الجديدة كل callback بياخد كمان argument أخير فيه [[client]]، فتقدر تستخدمه بدل useQueryClient.

[[onSettled]] بيعمل invalidate في الحالتين: لو نجح، السيرفر ممكن حسب حاجات تانية (updatedAt مثلًا)، ولو فشل تتأكد إن الكاش رجع مظبوط.

فيه طريقة أبسط لما النتيجة بتظهر في مكان واحد بس: متلمسش الكاش، واعرض [[mutation.variables]] وانت [[isPending]] (عنصر جديد باهت مثلًا). ولو فشل، الـ variables لسه موجودة تعرض جنبها «حاول تاني».

وفي React 19 فيه [[useOptimistic]] بنفس الفكرة للـ Actions (درس form actions في المستوى التالت).

وفي مشروع حقيقي، ترتيب المنتجات بالسحب (dnd-kit) كان بيعمل الفكرة دي بإيده: [[arrayMove]] على الـ state، وبعدين يبعت الترتيب الجديد، ولو فشل يرجّع الـ list القديمة. الفكرة صح، والفرق إن مع Query الكاش واحد لكل الصفحات.`,
            when: "تعديلات صغيرة غالبًا بتنجح وتأثيرها واضح: like، و toggle، وإعادة ترتيب، ومسح عنصر من list. مش للدفع ولا أي حاجة لو فشلت المستخدم لازم يعرف بوضوح.",
            mistakes: R`مفيش rollback فالشاشة بتفضل تكدب بعد الفشل. ومفيش cancelQueries فالنسخة المتفائلة بتتمسح. وتحديث متفائل لحاجات السيرفر بيحسبها (السعر بعد الخصم) فالرقم يتغير مرتين. ومفيش onSettled فالكاش ممكن يفضل مختلف عن السيرفر.`
          },
          teach: R`## الفكرة: اكتب في الكاش الأول، واسأل السيرفر بعدين

[[toggleDone]] mutation بتقلب [[done]] بتاعة todo. بدل ما تستنى السيرفر، [[onMutate]] بيكتب النتيجة في الكاش على طول، فالـ checkbox يتعلّم في نفس اللحظة. لو السيرفر رفض، [[onError]] يرجّع النسخة القديمة.

اتشغّل في Vite + React 19.3 + TanStack Query 5.104 في Chrome headless: list فيها checkbox لكل todo بتقرا [[useQuery({ queryKey: ['todos'] })]]، و [[api.patch]] بيبعت PATCH لسيرفر تجريبي بيرد بعد ثانية وبيرفض كل طلب تالت (زي الـ solCode بس بطلب حقيقي، عشان الـ GET يرجّع اللي اتحفظ فعلًا).

---

## ١. [[mutationFn]]: الطلب الحقيقي

~~~text Todos.tsx
mutationFn: (todo: Todo) => api.patch($__bt/todos/$__{todo.id}$__bt, { done: !todo.done }),
~~~

بتاخد الـ todo اللي اتداس عليه (هو اللي هيتبعت في [[mutate(t)]])، وتبعت [[PATCH]] بالقيمة المقلوبة. PATCH يعني «عدّل حقول معينة بس»، و [[!todo.done]] عكس القيمة الحالية.

## ٢. [[onMutate]]: قبل ما الطلب يطلع

~~~text Todos.tsx
onMutate: async (todo) => {
  await queryClient.cancelQueries({ queryKey: ['todos'] })
  const previous = queryClient.getQueryData<Todo[]>(['todos'])
  queryClient.setQueryData<Todo[]>(['todos'], old =>
    old?.map(t => (t.id === todo.id ? { ...t, done: !t.done } : t)))
  return { previous }
},
~~~

بتاخد نفس الـ variables بتاعة [[mutationFn]]. وهي [[async]] عشان فيها [[await]].

### خطوة ١: [[cancelQueries]]

لو فيه GET شغال دلوقتي لـ todos (refetch في الخلفية)، هيرجع بالبيانات **القديمة** بعد ما نكتب التعديل، ويكتب فوقه. [[cancelQueries]] بيقول للكاش «تجاهل نتيجة أي جلب شغال للـ key ده». وفيه [[await]] لأنها بترجع promise.

### خطوة ٢: [[getQueryData]]

بتقرا اللي في الكاش دلوقتي من غير طلب. [[<Todo[]>]] بيقول لـ TypeScript نوعه. ده الـ snapshot اللي هنرجع له لو فشلنا.

### خطوة ٣: [[setQueryData]]

بتكتب في الكاش. التاني دالة بتاخد القيمة القديمة [[old]] وترجّع الجديدة، وأي component بيقرا [[['todos']]] بيعيد الرسم على طول.

من جوه لبرة:

- [[{ ...t, done: !t.done }]]: object جديد فيه كل حقول [[t]] ([[...]] اسمها spread)، و [[done]] مقلوبة.
- [[t.id === todo.id ? جديد : t]]: لو ده العنصر اللي اتداس عليه خد النسخة الجديدة، غير كده سيبه زي ما هو.
- [[old?.map(...)]]: اعمل array جديدة بالشكل ده. و [[?.]] لو [[old]] لسه [[undefined]] (الكاش فاضي) يرجّع undefined من غير error.

ليه نسخة جديدة ومش [[t.done = true]]؟ نفس قاعدة الـ immutable updates: React بتعرف إن حاجة اتغيرت لما المرجع يتغير.

### خطوة ٤: [[return { previous }]]

[[{ previous }]] اختصار [[{ previous: previous }]]. اللي [[onMutate]] بترجّعه المكتبة بتشيله وتدّيه للـ callbacks اللي بعده.

## ٣. [[onError]]: رجّع القديم

~~~text Todos.tsx
onError: (_err, _todo, result) => queryClient.setQueryData(['todos'], result?.previous),
~~~

بتاخد: الـ error، والـ variables (الـ todo)، واللي [[onMutate]] رجّعه (سميناه [[result]]). الـ [[_]] في أول الاسم عُرف معناه «مش هستخدمه»، ومحتاجينه بس عشان نوصل للتالت بالترتيب. و [[result?.previous]] بـ [[?.]] لأن لو [[onMutate]] نفسها وقعت، مش هيبقى فيه result.

## ٤. [[onSettled]]: في الحالتين

~~~text Todos.tsx
onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
~~~

settled يعني «خلص»، نجح أو فشل. بتجيب النسخة الحقيقية من السيرفر عشان الكاش يتطابق معاه في الآخر.

---

## ٥. اللي حصل لما اتشغّل: ٣ ضغطات

~~~text Network و الشاشة
 1131ms >> ضغطة ١
 1167ms >> PATCH /api/todos/1
 1213ms [x] Learn Query          ← بعد ٣٠ms، قبل الرد
 2182ms << 200 PATCH
 2183ms >> GET /api/todos         ← onSettled
 2685ms [x] Learn Query
 2687ms >> ضغطة ٢
 2732ms [ ] Learn Query          ← فورًا
 3713ms << 200 PATCH
 4199ms >> ضغطة ٣
 4244ms [x] Learn Query          ← فورًا برضه
 5216ms << 500 PATCH              ← السيرفر رفض
 5216ms >> GET /api/todos         ← onSettled
 5307ms [ ] Learn Query          ← onError رجّعها
~~~

- كل ضغطة الشاشة اتغيرت بعد ٣٠ms، والرد جه بعد ثانية.
- التالتة: [[500]]، و [[onError]] رجّع [[previous]] فالـ checkbox اتشال تاني، و [[onSettled]] جاب القايمة من السيرفر واتأكد إنها [[done: false]].

## ٦. ليه [[cancelQueries]]؟ التجربة من غيرها

خلّينا الـ GET ياخد ٥٠٠ms، ودوسنا «refresh» (invalidate) وبعده بـ ١٠٠ms دوسنا الـ checkbox، يعني الـ GET القديم لسه في السكة:

~~~text مع cancelQueries
 1458ms >> GET /api/todos     (refresh)
 1574ms >> click checkbox
 1821ms [x] Learn Query
 1964ms << 200 GET             ← نتيجته اتجاهلت
 2040ms [x] Learn Query
 2616ms << 200 PATCH
 3130ms << 200 GET             (onSettled)
 3302ms [x] Learn Query
~~~

~~~text من غير cancelQueries
 1468ms >> GET /api/todos     (refresh)
 1572ms >> click checkbox
 1811ms [x] Learn Query
 1985ms << 200 GET             ← كتب القديم فوق التعديل
 2030ms [ ] Learn Query        ← اتشال لوحده!
 2608ms << 200 PATCH
 3120ms << 200 GET             (onSettled)
 3317ms [x] Learn Query        ← رجع اتعلّم
~~~

من غيرها الـ checkbox اتعلّم، واتشال، واتعلّم تاني في ثانية ونص، والمستخدم مش فاهم حاجة. لاحظ إن الـ GET وصل في الحالتين في Network: [[cancelQueries]] بتخلي الكاش يتجاهل النتيجة (ولو الـ queryFn بتستخدم [[signal]] بتلغي الطلب نفسه كمان).

---

## الخلاصة

| الـ callback | إمتى | بيعمل إيه |
|---|---|---|
| [[onMutate]] | قبل الطلب | الغي الجلب الشغال، احفظ القديم، اكتب الجديد، رجّع القديم |
| [[mutationFn]] | الطلب نفسه | PATCH للسيرفر |
| [[onError]] | لو فشل | رجّع اللي [[onMutate]] حفظته |
| [[onSettled]] | في الحالتين | invalidate عشان تتطابق مع السيرفر |

> الترتيب في [[onMutate]] مهم: cancel، ثم get، ثم set، ثم return.`,
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
          ],
          sol: R`أول ضغطتين: الـ checkbox بيتعلّم (أو يتشال) فورًا وبيفضل كده. التالتة: بيتغير فورًا برضه، ولما الطلب يفشل بعد ثانية [[onError]] بيرجّع [[previous]] فيرجع لحالته القديمة، وبعدين [[onSettled]] بيجيب القايمة من السيرفر عشان يتأكد.

لو الـ checkbox رجع للقديمة وبعدين اتعلّم تاني لوحده، غالبًا نسيت [[cancelQueries]] فـ refetch قديم رجع فوق التعديل المتفائل. ولو مرجعش خالص بعد الفشل، يبقى onMutate مش بيرجّع [[{ previous }]] أو onError بيقرا اسم غلط.`,
          solCode: R`let calls = 0
const api = {
  async patch(url: string, body: { done: boolean }) {
    await new Promise(r => setTimeout(r, 1000))
    if (++calls % 3 === 0) throw new Error('Server rejected ' + url)
    return body
  },
}`
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
          teach: R`## الفكرة: object عايش برا React، والـ components بتشترك فيه

[[useCartStore]] store فيه سلة ([[items]]) ودالة [[add]] بتضيف منتج. أي component في أي مكان يقرا منه بـ selector، من غير Provider. اتشغّل في Vite + React 19.3 + Zustand 5.0 في Chrome headless، بـ ٣ components: واحد بيعرض العدد، وواحد فيه زرارين add، وواحد بيقرا الـ store كله من غير selector عشان نقارن.

---

## ١. شكل الـ store: [[type CartState]]

~~~text cartStore.ts
type CartState = {
  items: { id: string; qty: number }[]
  add: (id: string) => void
}
~~~

- [[items]]: array، كل عنصر فيه [[id]] (اسم المنتج) و [[qty]] (الكمية). و [[[]]] بعد النوع معناها «array من ده».
- [[add: (id: string) => void]]: دالة بتاخد id ومبترجّعش حاجة ([[void]]).

الـ store فيه **القيم والدوال اللي بتغيّرها** في مكان واحد.

## ٢. [[create<CartState>()(set => ({...}))]]

~~~text cartStore.ts
export const useCartStore = create<CartState>()(set => ({
~~~

- [[create]] من [[zustand]] بتعمل الـ store وترجّع **hook**، عشان كده اسمه بيبدأ بـ [[use]].
- [[<CartState>]] النوع، وبعده [[()]] فاضية وبعدها [[(...)]] تانية. دي دالتين ورا بعض: الأولى بتاخد النوع بس، والتانية بتاخد الـ store. Zustand عاملها كده عشان TypeScript مبيعرفش ياخد نوع بإيدك ويستنتج الباقي في نفس النداء.
- [[set => ({ ... })]]: دالة Zustand بتناديها مرة واحدة وتدّيها [[set]] (الأداة اللي بتغيّر الـ state)، وهي بترجّع الـ state الأولى. والأقواس [[({ })]] عشان arrow ترجّع object (من غيرها الـ [[{]] تتقري بداية جسم الدالة).

## ٣. [[add]] و [[set(s => ...)]]

~~~text cartStore.ts
  items: [],
  add: id => set(s => {
    const found = s.items.find(i => i.id === id)
    return { items: found ? s.items.map(i => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...s.items, { id, qty: 1 }] }
  }),
~~~

- [[set]] بتاخد دالة بتاخد الـ state الحالية [[s]] وترجّع **الحقول اللي اتغيرت بس**. Zustand بتدمجها مع الباقي (merge)، فـ [[add]] نفسها مبتضيعش.
- [[s.items.find(...)]]: أول عنصر الـ id بتاعه زي المطلوب، أو [[undefined]].
- السطر الطويل من جوه لبرة:
  - [[{ ...i, qty: i.qty + 1 }]]: نسخة من العنصر والكمية زايدة واحد.
  - [[s.items.map(i => (i.id === id ? نسخة : i))]]: array جديدة، العنصر ده بس متغير.
  - [[[...s.items, { id, qty: 1 }]]]: array جديدة فيها القديم وعنصر جديد في الآخر. و [[{ id }]] اختصار [[{ id: id }]].
  - [[found ? الأولى : التانية]]: موجود؟ زوّد. مش موجود؟ ضيف.

كل ده نسخ جديدة، مش تعديل في المكان: Zustand بتقارن بالمرجع زي React.

## ٤. القراية بـ selector

~~~text أي component
const count = useCartStore(s => s.items.reduce((n, i) => n + i.qty, 0))
const add = useCartStore(s => s.add)
~~~

الـ selector دالة بتاخد الـ state كلها وترجّع الحتة اللي الـ component محتاجها.

- [[reduce((n, i) => n + i.qty, 0)]]: بتلف على العناصر وتجمع. [[0]] البداية، و [[n]] المجموع لحد دلوقتي، و [[i]] العنصر الحالي. فـ mug بـ ٢ و pen بـ ١ = [[3]].
- [[s => s.add]]: الدالة نفسها. مرجعها ثابت طول عمر الـ store.

بعد كل [[set]] Zustand بتشغّل selector كل component وتقارن الناتج بالقديم بـ [[Object.is]]. لو هو هو، مفيش render.

---

## ٥. اللي حصل لما اتشغّل

الـ components بتطبع سطر كل render. والسطور متكررة مرتين لأن [[<StrictMode>]] في التطوير بيرسم كل component مرتين، فبصّ عليهم كأنهم مرة.

~~~text الـ Console
render Count 0 / render AddBtn / render Whole 0
>> add mug
render Count 1
render Whole 1
>> add mug
render Count 2
render Whole 1
>> add pen
render Count 3
render Whole 2
~~~

| الـ component | بيقرا | اترسم تاني إمتى |
|---|---|---|
| [[Count]] | [[s => ...reduce]] (رقم) | كل مرة الرقم اتغير |
| [[AddBtn]] | [[s => s.add]] | ولا مرة بعد الأول |
| [[Whole]] | [[useCartStore()]] من غير selector | **كل** [[set]]، حتى لما عدد العناصر فضل ١ |

### من برا React خالص

~~~text الـ Console
useCartStore.getState().items
[{"id":"mug","qty":2},{"id":"pen","qty":1}]
~~~

[[getState()]] بيقرا الـ store من أي ملف عادي (interceptor، أو دالة toast) من غير hook.

### الـ selector اللي بيرجّع object

~~~text Bad.tsx
const { count, add } = useCartStore(s => ({ count: s.items.length, add: s.add }))
~~~

~~~text الـ Console
[error] The result of getSnapshot should be cached to avoid an infinite loop
[pageerror] Maximum update depth exceeded. ...
An error occurred in the <Bad> component.
~~~

الصفحة فضيت. [[({ ... })]] بيعمل object **جديد** كل مرة يتنادى، و [[Object.is]] بين اتنين objects مختلفين = [[false]] دايمًا، فـ React شايفة إن الـ store «اتغير» في كل مرة تسأل، وترسم، وتسأل، لحد ما توقف التطبيق.

### نفس الـ selector جوه [[useShallow]] (الـ solCode)

~~~text الشاشة
Cart (0)
>> click, click
Cart (1)
~~~

[[useShallow]] بيقارن الـ object حقل حقل ([[count]] زي ما هو؟ [[add]] زي ما هي؟) بدل المرجع، فاشتغل. الرقم ١ مش ٢ لأن [[count]] هنا [[items.length]] (عدد المنتجات المختلفة) والضغطتين على mug. وبيتعمل import من [[zustand/react/shallow]] أو [[zustand/shallow]]، الاتنين نفس الدالة.

---

## الخلاصة

| الشكل | بيعمل إيه |
|---|---|
| [[create<T>()(set => ({...}))]] | يعمل الـ store ويرجّع hook |
| [[set(s => ({ حقل }))]] | يغيّر، ويدمج مع الباقي |
| [[useStore(s => s.x)]] | الـ component يعيد الرسم لما [[x]] بس يتغير |
| [[useStore()]] | يعيد الرسم مع أي تغيير |
| [[useShallow]] | لو لازم ترجّع object أو array من الـ selector |
| [[useStore.getState()]] | برا React |

> selector لكل قيمة، وكل قيمة يا رقم يا نص يا دالة يا مرجع موجود في الـ store. أي حاجة بتتعمل جديدة جوه الـ selector محتاجة [[useShallow]].`,
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
          ],
          sol: R`بـ selectors منفصلة: الرقم بيزيد مع كل add. بالـ object هتلاقي الصفحة وقعت بـ «Maximum update depth exceeded»، وقبلها warning: «The result of getSnapshot should be cached to avoid an infinite loop». الـ selector بيرجّع object جديد كل مرة يتنادى، و Zustand بتقارن بـ [[Object.is]]، فكل مرة شايفة «حاجة جديدة» وتطلب render، والـ render يعمل object جديد، وهكذا.

الحل: selector لكل قيمة زي المثال، أو لف الـ selector بـ [[useShallow]] اللي بيقارن الـ object حقل حقل.`,
          solCode: R`import { useShallow } from 'zustand/react/shallow'

function CartButton() {
  const { count, add } = useCartStore(useShallow(s => ({ count: s.items.length, add: s.add })))
  return <button onClick={() => add('mug')}>Cart ({count})</button>
}`
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
          teach: R`## الفكرة: نفس الـ store، ملفوف في [[persist]]

[[useSettings]] store عادي فيه الثيم واللغة وحالة الـ sidebar ودالة بتقلب الثيم. الفرق الوحيد إنه ملفوف بـ [[persist]]، فكل تغيير بيتكتب في [[localStorage]]، ولما الصفحة تفتح تاني بيرجع. اتشغّل في Vite + React 19.3 + Zustand 5.0 في Chrome headless، مع زرار بيعرض الثيم وبينادي [[toggleTheme]].

---

## ١. الـ imports

~~~text settingsStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
~~~

[[persist]] **middleware**: دالة بتلف دالة الـ store وتزوّد عليها سلوك (هنا الحفظ)، والـ store نفسه مش عارف إنه اتلف. وجاية من [[zustand/middleware]] مش من [[zustand]].

## ٢. النوع

~~~text settingsStore.ts
type Settings = { theme: 'light' | 'dark'; lang: 'ar' | 'en'; sidebarOpen: boolean; toggleTheme: () => void }
~~~

[[|]] بين نصين معناها «يا ده يا ده». فـ [[theme]] مينفعش تبقى غير [['light']] أو [['dark']]، و TypeScript يرفض أي نص تاني.

## ٣. اللفّة: من برا لجوه

~~~text settingsStore.ts
export const useSettings = create<Settings>()(
  persist(
    set => ({ ...الـ store العادي... }),
    { name: 'myapp-settings', version: 1, partialize: s => ({ theme: s.theme, lang: s.lang }) }
  )
)
~~~

| الطبقة | بتاخد | بترجّع |
|---|---|---|
| [[set => ({...})]] | [[set]] | الـ state الأولى، زي درس Zustand |
| [[persist(دالة, options)]] | دالة الـ store والإعدادات | دالة store جديدة بتحفظ وترجّع |
| [[create<Settings>()(...)]] | الدالة اللي persist رجّعها | الـ hook |

و [[()]] الفاضية بعد [[create<Settings>]] لازمة هنا بالذات: من غيرها TypeScript مبيعرفش يوصّل النوع لجوه الـ middleware.

## ٤. جوه الـ store

~~~text settingsStore.ts
theme: 'light', lang: 'ar', sidebarOpen: true,
toggleTheme: () => set(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
~~~

- السطر الأول القيم الافتراضية: بتتستخدم أول زيارة، أو لو مفيش حاجة محفوظة.
- [[toggleTheme]]: [[set]] بدالة بتقرا الثيم الحالي وترجّع العكس. مفيش أي سطر حفظ هنا: [[persist]] بيحفظ بعد أي [[set]] لوحده.

## ٥. الـ options

| الخانة | القيمة | معناها |
|---|---|---|
| [[name]] | [['myapp-settings']] | اسم المفتاح في localStorage. لازم يبقى فريد لكل store |
| [[version]] | [[1]] | رقم «شكل» البيانات، بيتحفظ معاها |
| [[partialize]] | [[s => ({ theme: s.theme, lang: s.lang })]] | بتاخد الـ state كلها وترجّع اللي يتحفظ بس |

[[partialize]] هنا سابت [[sidebarOpen]] برا: حالة مؤقتة، كل زيارة تبدأ مفتوحة.

---

## ٦. اللي حصل لما اتشغّل

~~~text الشاشة و localStorage
 929ms الشاشة: theme: light
       localStorage: null
>> click
1235ms الشاشة: theme: dark
       localStorage: {"state":{"theme":"dark","lang":"ar"},"version":1}
>> reload
1842ms الشاشة: theme: dark
~~~

- أول فتحة: مفيش حاجة محفوظة ([[null]])، و persist مبيكتبش غير بعد أول [[set]].
- بعد الضغطة: المحفوظ JSON فيه [[state]] (theme و lang بس) و [[version]]. مفيش [[sidebarOpen]] (partialize شالتها)، ومفيش [[toggleTheme]] (JSON مبيعرفش يحفظ دوال، وهي بتيجي من الـ store نفسه كل مرة).
- بعد الـ reload: dark على طول. localStorage متزامن (synchronous)، فالقيمة المحفوظة بتتقري وقت ما الـ store يتعمل، قبل أول رسم.

### لما المحفوظ بايظ أو قديم

جربنا حالتين بإيدنا:

~~~text localStorage = 'not json{' ثم reload
الشاشة: theme: light
~~~

~~~text localStorage = {"state":{"theme":"dark","lang":"en"},"version":0} ثم reload
[error] State loaded from storage couldn't be migrated since no migrate function was provided
الشاشة: theme: light
~~~

- JSON بايظ: persist تجاهله ورجع للقيم الافتراضية من غير ما التطبيق يقع.
- version قديمة (0) والـ store بقى 1 ومفيش [[migrate]]: Zustand بيطبع error ويتجاهل المحفوظ، فالمستخدم بيخسر إعداداته. عشان كده لما تغيّر الشكل زوّد [[version]] **واكتب** [[migrate(persisted, oldVersion)]] تحوّل القديم. والأسوأ إنك تغيّر الشكل من غير ما تزوّد [[version]]: الشكل القديم يدخل كأنه الجديد.

---

## الخلاصة

| | من غير persist | بـ persist |
|---|---|---|
| بعد refresh | القيم الافتراضية | آخر قيم محفوظة |
| الحفظ | بإيدك في كل setter | بعد كل [[set]] لوحده |
| اللي بيتحفظ | ولا حاجة | اللي [[partialize]] رجّعته، كـ JSON |
| الدوال | موجودة في الـ store | مبتتحفظش، بتيجي من الكود |

> [[name]] فريد، و [[partialize]] للحاجات اللي المفروض تفضل بس، و [[version]] + [[migrate]] أول ما تغيّر الشكل.`,
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
          ],
          sol: R`بعد refresh الثيم فاضل. في Local Storage، key [[myapp-settings]] قيمته:

[[{"state":{"theme":"dark","lang":"ar"},"version":1}]]

مفيش [[sidebarOpen]] لأن [[partialize]] اختار theme و lang بس، ومفيش [[toggleTheme]] لأن الدوال مبتتحفظش في JSON أصلًا. و [[version]] موجودة عشان لو غيّرت شكل الـ state بعدين تكتب [[migrate]]. لو لقيت sidebarOpen محفوظة، الـ partialize مش واصلة (اتكتبت برا الـ options object).`
        }
      ]
    },
    {
      t: "TanStack Query بعمق و Redux",
      l: 2,
      n: "infinite scroll، و keys منظمة، و queries معتمدة على بعض، و Suspense، و Next.js، و Redux Toolkit عشان تقرا الكود الموجود",
      items: [
        {
          cmd: "query key factory",
          title: "رتّب الـ keys والـ queryFn في مكان واحد، و prefetch قبل ما المستخدم يدوس",
          desc: R`لما المشروع يكبر، نفس الـ key بيتكتب في عشر أماكن: [[useQuery]] في صفحة، و [[invalidateQueries]] بعد mutation، و [[setQueryData]] في optimistic update. أي اختلاف حرف واحد ([['product']] و [['products']]) والكاش مبيتحدثش.

الحل object واحد لكل resource فيه دوال بتبني الـ keys بشكل هرمي ([[all]] ثم [[lists]] ثم [[list(filters)]])، و [[queryOptions]] بيجمع الـ key والـ queryFn والإعدادات في object واحد تستخدمه في [[useQuery]] وفي [[queryClient.query]] للـ prefetch، و TypeScript بيعرف نوع الـ data من غير ما تكتبه.`,
          example: R`import { queryOptions, useQuery, useQueryClient, noop } from '@tanstack/react-query'

type Filters = { q?: string; sort?: 'price' | 'name' }
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Filters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}
export const productQueries = {
  list: (filters: Filters) => queryOptions({ queryKey: productKeys.list(filters), queryFn: () => api.getProducts(filters) }),
  detail: (id: number) => queryOptions({ queryKey: productKeys.detail(id), queryFn: () => api.getProduct(id), staleTime: 60_000 }),
}
function ProductLink({ id, children }: { id: number; children: string }) {
  const queryClient = useQueryClient()
  return <Link to={$__bt/products/$__{id}$__bt} onMouseEnter={() => queryClient.query(productQueries.detail(id)).catch(noop)}>{children}</Link>
}
function ProductPage({ id }: { id: number }) {
  const { data } = useQuery(productQueries.detail(id))
  return <h1>{data?.name}</h1>
}
// بعد تعديل منتج: queryClient.invalidateQueries({ queryKey: productKeys.lists() })`,
          try: R`اعمل الـ factory لـ products، واستخدمه في صفحة list وصفحة تفاصيل. افتح React Query Devtools، وعدّي الماوس على لينك منتج من غير ما تدوس: هتلاقي [[["products","detail",5]]] ظهر في الكاش. ادخل الصفحة: مفيش loading. بعدين اعمل invalidate بـ [[productKeys.lists()]] وشوف مين اتعلّم stale ومين لأ.`,
          flag: "script",
          deep: {
            why: R`الـ keys هي «عنوان» البيانات في الكاش، والـ invalidation بيطابق بالبداية. لو الـ keys عشوائية، مش هتعرف تقول «كل الـ lists بتاعة المنتجات» من غير ما تمسح التفاصيل كمان، أو هتنسى key في مكان. والـ prefetch بيشيل الـ loading من التنقل: لما المستخدم يحط الماوس على لينك، فيه ١٠٠ لـ ٣٠٠ms قبل ما يدوس، وده كفاية تجيب البيانات.`,
            how: R`الهرم: [[['products']]] ثم [[['products', 'list']]] ثم [[['products', 'list', { q: 'mug' }]]]، و [[['products', 'detail', 5]]]. فـ [[invalidateQueries({ queryKey: productKeys.lists() })]] بتطابق كل الـ lists بأي فلتر ومبتلمسش التفاصيل، و [[productKeys.all]] بتطابق كل حاجة تخص المنتجات. و [[as const]] بيخلي النوع tuple ثابت بدل [[string[]]].

[[queryOptions({...})]] مبتعملش حاجة وقت التشغيل غير إنها ترجّع نفس الـ object، بس بتربط نوع الـ data بالـ key (DataTag)، فـ [[queryClient.getQueryData(productQueries.detail(5).queryKey)]] بيعرف إن الناتج [[Product | undefined]].

[[queryClient.query(options)]] بيجيب البيانات ويحطها في الكاش ويرجّع promise بالـ data. لو فيه نسخة لسه fresh (جوه staleTime) بيرجّعها من غير طلب، عشان كده الـ detail فيه [[staleTime: 60_000]]: من غيره كل hover هيعمل طلب جديد. و [[.catch(noop)]] لأن الـ prefetch مش مهم يفشل بصوت، والصفحة نفسها هتعرض الخطأ لو حصل. في كود v5 القديم هتلاقي [[prefetchQuery]] (مبترميش أصلًا) و [[fetchQuery]] و [[ensureQueryData]]: لسه شغالين بس بقوا deprecated لصالح [[query]] في آخر نسخ v5.

أماكن الـ prefetch: [[onMouseEnter]] و [[onFocus]] على اللينك، أو في [[loader]] بتاع React Router قبل ما الصفحة تترسم، أو على السيرفر في Next.js (درس HydrationBoundary).`,
            when: R`أول ما يبقى عندك أكتر من ٣ queries لنفس الـ resource، أو أي invalidate بعد mutation. والـ prefetch للروابط اللي المستخدم غالبًا هيدوس عليها (صفحة التفاصيل من list، والصفحة الجاية في pagination).`,
            mistakes: R`keys مكتوبة بإيد في كل مكان وبأشكال مختلفة. و [[['products', filters]]] للـ list و [[['products', id]]] للتفاصيل: invalidate للـ lists هيمسح التفاصيل معاها وبالعكس. و prefetch من غير staleTime فكل hover طلب. و object فلاتر فيه [[undefined]] مرة ومش موجود مرة: Query بيعتبرهم نفس الـ key (بيتجاهل undefined في الـ hash)، فده مش bug، بس ترتيب الـ array مهم: [[['list', 1]]] غير [[[1, 'list']]].`
          },
          teach: R`## الفكرة: الـ keys تتكتب مرة واحدة، وكل الباقي يناديها

المثال ٣ حاجات: [[productKeys]] بيبني كل الـ keys بتاعة المنتجات، و [[productQueries]] بيجمع الـ key مع الـ queryFn، و [[ProductLink]] بيجيب تفاصيل المنتج أول ما الماوس يعدّي على اللينك. اتشغّل في Vite + React 19.3 + TanStack Query 5.104 + React Router 8.4 في Chrome headless، بصفحة فيها list ولينك لمنتج رقم ٥، والـ API بيرد بعد ٣٠٠ms. و [[api.getProducts]] و [[api.getProduct]] دوال fetch عادية زي درس useQuery.

---

## ١. [[productKeys]]: هرم الـ keys

~~~text productKeys.ts
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Filters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}
~~~

كل key مبني على اللي فوقه بـ [[...]] (spread، بيفرد عناصر الـ array جوه array جديدة):

| النداء | الناتج |
|---|---|
| [[productKeys.all]] | [[['products']]] |
| [[productKeys.lists()]] | [[['products', 'list']]] |
| [[productKeys.list({ q: 'mug' })]] | [[['products', 'list', { q: 'mug' }]]] |
| [[productKeys.details()]] | [[['products', 'detail']]] |
| [[productKeys.detail(5)]] | [[['products', 'detail', 5]]] |

- [[all]] قيمة ثابتة، والباقي **دوال** لأنهم بياخدوا حاجة (أو عشان يتقروا بنفس الشكل).
- [[as const]]: من غيره TypeScript بيشوف [[['products']]] كـ [[string[]]] (أي عدد نصوص). معاه بيشوفه tuple ثابت [[readonly ['products']]]، فيعرف كل خانة فيها إيه بالظبط.
- [[Filters]]: نوع الفلاتر، [[q]] كلمة بحث و [[sort]] الترتيب، والـ [[?]] معناها «اختياري».

ليه الهرم؟ لأن [[invalidateQueries]] بيطابق بالبداية. فـ [[lists()]] بيطابق كل الـ lists بأي فلتر ومبيلمسش التفاصيل.

## ٢. [[productQueries]] و [[queryOptions]]

~~~text productQueries.ts
export const productQueries = {
  list: (filters: Filters) => queryOptions({ queryKey: productKeys.list(filters), queryFn: () => api.getProducts(filters) }),
  detail: (id: number) => queryOptions({ queryKey: productKeys.detail(id), queryFn: () => api.getProduct(id), staleTime: 60_000 }),
}
~~~

[[queryOptions({...})]] بترجّع نفس الـ object اللي اديته لها، من غير أي تغيير وقت التشغيل. فايدتها في TypeScript بس: بتربط نوع الـ data بالـ key. اتجرّب بـ [[tsc]]:

~~~text tcheck.ts
const d = qc.getQueryData(productQueries.detail(5).queryKey)
const bad: string = d
~~~

~~~text الناتج (tsc)
error TS2322: Type 'Product | undefined' is not assignable to type 'string'.
~~~

يعني TypeScript عرف لوحده إن الـ key ده بيرجّع [[Product | undefined]] من غير ما تكتب [[<Product>]].

و [[staleTime: 60_000]] في التفاصيل بس: عشان الـ prefetch ميتكررش مع كل hover (تحت).

## ٣. [[ProductLink]]: prefetch مع الماوس

~~~text ProductLink.tsx
function ProductLink({ id, children }: { id: number; children: string }) {
  const queryClient = useQueryClient()
  return <Link to={$__bt/products/$__{id}$__bt} onMouseEnter={() => queryClient.query(productQueries.detail(id)).catch(noop)}>{children}</Link>
}
~~~

- [[children]]: النص اللي بين فتحة وقفلة الـ component، هنا اسم المنتج.
- [[<Link to>]]: لينك React Router بينقل من غير reload للصفحة.
- [[onMouseEnter]]: event بيشتغل أول ما الماوس يدخل على العنصر.
- [[queryClient.query(options)]]: هات البيانات وحطها في الكاش، ورجّع promise بالـ data. لو اللي في الكاش لسه fresh، بترجّعه من غير طلب.
- [[.catch(noop)]]: [[noop]] (no operation) دالة فاضية بتيجي مع المكتبة. لو الـ prefetch فشل، تجاهل بهدوء: الصفحة نفسها هتجرّب وتعرض الخطأ.

## ٤. [[ProductPage]]

~~~text ProductPage.tsx
const { data } = useQuery(productQueries.detail(id))
return <h1>{data?.name}</h1>
~~~

نفس الـ options بالظبط، فنفس الـ key. لو الـ prefetch خلّص، [[data]] موجودة من أول render. و [[data?.name]] بـ [[?.]] لأنها ممكن تبقى undefined لو دخل الصفحة من غير hover.

---

## ٥. اللي حصل لما اتشغّل

~~~text Network والكاش
 2004ms cache: ["products","list",{"q":"mug"}]:stale
 2013ms >> hover Chair
 2074ms >> GET /api/products/5
 2591ms cache: ["products","list",{"q":"mug"}]:stale  ["products","detail",5]:fresh
 2592ms >> hover again
                                (ولا طلب)
 2920ms >> click
 2958ms الشاشة: <h1>Chair</h1>
~~~

- الـ hover جاب منتج ٥ وحطه في الكاش fresh.
- hover تاني: مفيش طلب، لأنه لسه جوه الـ [[staleTime]] (دقيقة).
- الضغطة: العنوان ظهر بعد ٣٨ms من غير «Loading» ومن غير طلب.
- الـ list الـ key بتاعها فيه الـ object [[{"q":"mug"}]] زي ما هو، و stale على طول لأن الـ staleTime بتاعها الافتراضي (صفر).

### invalidate بـ [[lists()]] ثم بـ [[all]] (زي الـ solCode)

~~~text Network
>> invalidateQueries({ queryKey: productKeys.lists() })
 3293ms >> GET /api/products?page=1&q=mug
>> invalidateQueries({ queryKey: productKeys.all })
 4026ms >> GET /api/products?page=1&q=mug
 4027ms >> GET /api/products/5
~~~

- [[lists()]] = [[['products', 'list']]]: طابق الـ list بس، والتفاصيل متلمستش.
- [[all]] = [[['products']]]: طابق الاتنين واتجابوا تاني.
- و [[detail(5)]] كانت هتطابق منتج ٥ بس.

في الـ solCode فيه [[await]] قبل كل invalidate: [[invalidateQueries]] بترجّع promise بيخلص لما الـ refetch يخلص، فلو عايز تعمل حاجة بعد ما البيانات الجديدة توصل استناه.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[productKeys]] | كل الـ keys من مكان واحد، بشكل هرمي |
| [[as const]] | الـ key يبقى tuple ثابت النوع |
| [[queryOptions]] | key + queryFn + إعدادات في object واحد، والنوع مربوط بالـ key |
| [[queryClient.query(...)]] | prefetch: هات للكاش لو مش fresh |
| [[staleTime]] على التفاصيل | الـ hover المتكرر ميعملش طلبات |

> لو عايز تعمل invalidate لحاجة، اسأل نفسك «أنهي مستوى في الهرم؟» وانادي الدالة بتاعته، متكتبش الـ array بإيدك.`,
          lines: [
            "queryOptions، والـ hooks، و noop نتجاهل بيه أخطاء الـ prefetch.",
            "شكل الفلاتر.",
            "الـ factory: كل الـ keys بتاعة المنتجات من مكان واحد.",
            "الجذر.",
            "كل الـ lists.",
            "list بفلاتر معينة.",
            "كل التفاصيل.",
            "تفاصيل منتج واحد.",
            "قفلة الـ keys.",
            "الـ queries نفسها: key و queryFn وإعدادات في object واحد.",
            "الـ list بالفلاتر.",
            "التفاصيل، وطازة دقيقة عشان الـ prefetch ميتكررش.",
            "قفلة.",
            "لينك بيعمل prefetch.",
            "الـ client.",
            "الماوس فوق اللينك؟ هات التفاصيل للكاش، ولو فشلت تجاهل.",
            "قفلة اللينك.",
            "صفحة التفاصيل.",
            "نفس الـ options، فلو الـ prefetch خلص الـ data موجودة فورًا.",
            "اعرض.",
            "قفلة."
          ],
          sol: R`لما تعدّي الماوس، الـ Devtools يظهر فيها [[["products","detail",5]]] وحالتها fresh. لما تدوس، الصفحة بتعرض الاسم على طول من غير «Loading»، وفي Network مفيش طلب جديد لو دخلت جوه الدقيقة.

بعد [[invalidateQueries({ queryKey: productKeys.lists() })]]: كل الـ queries اللي بتبدأ بـ [[["products","list"]]] بقت stale واللي معروض منها اتجاب تاني، والـ detail فضلت fresh. ولو عملت invalidate بـ [[productKeys.all]] الاتنين يتعلّموا.

لو كل hover بيعمل طلب، الـ staleTime ناقص من options التفاصيل.`,
          solCode: R`const queryClient = useQueryClient()
// بعد تعديل منتج:
await queryClient.invalidateQueries({ queryKey: productKeys.lists() })   // الـ lists بس
await queryClient.invalidateQueries({ queryKey: productKeys.detail(5) }) // المنتج ده بس
await queryClient.invalidateQueries({ queryKey: productKeys.all })       // كل حاجة تخص المنتجات`
        },
        {
          cmd: "useInfiniteQuery",
          title: "infinite scroll و «حمّل أكتر» بـ cursor",
          desc: R`[[useInfiniteQuery]] بيحفظ كل الصفحات اللي اتحمّلت في entry واحد في الكاش ([[data.pages]])، وبيدّيك [[fetchNextPage]] و [[hasNextPage]]. انت بتقوله إزاي يعرف الصفحة الجاية من آخر رد: [[getNextPageParam: last => last.nextCursor]]، ولو رجّعت [[null]] أو [[undefined]] يبقى مفيش أكتر.

الـ cursor (آخر id شفته) أحسن من [[page=3]] للـ feeds: لو عناصر جديدة اتضافت فوق وانت بتقلّب، الصفحات بالرقم بتتزحلق وتشوف نفس العنصر مرتين. شرح الـ cursor في الـ API نفسه في تاب «بناء مشروع كامل».`,
          example: R`import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query'

type Page = { items: Product[]; nextCursor: number | null }
export const feedQuery = () => infiniteQueryOptions({
  queryKey: ['products', 'feed'],
  queryFn: ({ pageParam, signal }) => getJSON<Page>($__bt/api/feed?cursor=$__{pageParam}&limit=20$__bt, signal),
  initialPageParam: 0,
  getNextPageParam: last => last.nextCursor,
})
export function Feed() {
  const { data, error, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(feedQuery())
  if (isPending) return <p>Loading...</p>
  if (error) return <p role="alert">{error.message}</p>
  const items = data.pages.flatMap(p => p.items)
  return (
    <>
      <ul>{items.map(p => <li key={p.id}>{p.name}</li>)}</ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </>
  )
}`,
          try: R`اعمل API (أو handler في MSW) بيرجّع ٥ عناصر على صفحات من ٢، و [[nextCursor]] بيبقى [[null]] في الآخر. دوس «Load more» لحد ما الزرار يختفي، وشوف الطلبات في Network. بعدين خلي الزرار يتدايس لوحده لما يظهر على الشاشة بـ IntersectionObserver.`,
          flag: "script",
          deep: {
            why: R`الـ feeds والتعليقات وسجل الطلبات بتتعرض كـ list بتكبر مع الـ scroll. لو عملتها بـ [[useQuery]] و state فيها array بتضيف عليها، هتكتب منطق الدمج، والـ loading لكل صفحة، ومنع الطلب المكرر، وهتضيع كل ده لو المستخدم خرج ورجع. useInfiniteQuery بيعمل ده ويكاش الصفحات كلها.`,
            how: R`أول مرة بينادي [[queryFn({ pageParam: initialPageParam })]]. لما تنادي [[fetchNextPage()]]، بيحسب [[getNextPageParam(lastPage, allPages)]] ويجيب الصفحة دي ويضيفها لـ [[data.pages]]، ولو فيه طلب شغال بالفعل مبيبعتش تاني. و [[hasNextPage]] بتبقى false لما getNextPageParam ترجّع null أو undefined.

الـ refetch (رجعت للتاب والبيانات stale، أو invalidate) بيعيد جلب الصفحات كلها بالترتيب من الأول، عشان الـ cursors ممكن تكون اتغيرت. لو المستخدم حمّل ٣٠ صفحة، ده ٣٠ طلب، و [[maxPages: 5]] بيحدد كام صفحة تتحفظ.

[[signal]] جوه الـ queryFn بيلغي الطلب لو الـ query اتلغت (component اتشال، أو cancelQueries). و [[infiniteQueryOptions]] زي [[queryOptions]] بالظبط بس للنوع ده، عشان تستخدم نفس التعريف في hook وفي [[queryClient.infiniteQuery]] للـ prefetch.

الـ infinite scroll الأوتوماتيك: عنصر فاضي في آخر الـ list، و IntersectionObserver (أو hook زي [[useInView]] من react-intersection-observer) بينادي [[fetchNextPage()]] لما يظهر، بشرط [[hasNextPage && !isFetchingNextPage]]. ولو الـ list هتوصل آلاف العناصر، اجمعها مع TanStack Virtual (المستوى التالت).`,
            when: R`Feeds، وتعليقات، وإشعارات، و «حمّل أكتر» في أي list بتكبر. للجداول اللي فيها «صفحة ٣ من ١٠» وأرقام صفحات، [[useQuery]] بـ [[page]] في الـ key و [[placeholderData: keepPreviousData]] أنسب.`,
            mistakes: R`[[initialPageParam]] ناقص (إجباري في v5). و getNextPageParam بيرجّع [[0]] أو [['']] كـ cursor أخير وانت فاكره «مفيش»: الـ falsy مش كفاية، لازم null أو undefined بالظبط. و [[data.pages.map]] من غير flat فتلاقي array جوه array. و IntersectionObserver بينادي fetchNextPage في loop لأن العنصر لسه ظاهر بعد ما الصفحة وصلت وهي صغيرة. وتنسى إن الـ refetch بيجيب كل الصفحات، فالـ list الطويلة جدًا بتعمل طلبات كتير لما المستخدم يرجع للتاب.`
          },
          teach: R`## الفكرة: entry واحد في الكاش، جواه array صفحات

[[Feed]] بيعرض list منتجات وزرار «Load more». كل ضغطة بتجيب صفحة كمان وتضيفها تحت. الـ API بيرجّع مع كل صفحة [[nextCursor]]: المكان اللي الصفحة الجاية تبدأ منه، أو [[null]] لو خلصت.

اتشغّل في Vite + React 19.3 + TanStack Query 5.104 في Chrome headless، على API فيه ٥ عناصر (Item A لـ Item E)، وغيّرنا [[limit=20]] لـ [[limit=2]] زي الـ try عشان نشوف أكتر من صفحة. و [[getJSON]] في المثال دالة صغيرة لازم تعملها: [[fetch(url, { signal })]] وبعدها [[res.ok]] و [[res.json()]] زي درس useQuery.

---

## ١. شكل الصفحة

~~~text feed.ts
type Page = { items: Product[]; nextCursor: number | null }
~~~

كل رد من السيرفر: عناصر الصفحة، و cursor للي بعدها. [[number | null]] يعني «رقم أو null».

## ٢. [[infiniteQueryOptions({...})]]

~~~text feed.ts
export const feedQuery = () => infiniteQueryOptions({
  queryKey: ['products', 'feed'],
  queryFn: ({ pageParam, signal }) => getJSON<Page>($__bt/api/feed?cursor=$__{pageParam}&limit=20$__bt, signal),
  initialPageParam: 0,
  getNextPageParam: last => last.nextCursor,
})
~~~

زي [[queryOptions]] بس للـ infinite query: بتجمع التعريف في مكان واحد وتربط الأنواع.

| الخانة | معناها |
|---|---|
| [[queryKey]] | key **واحد** لكل الصفحات، مش key لكل صفحة |
| [[queryFn]] | بتجيب صفحة واحدة. بتاخد object، فكّينا منه [[pageParam]] و [[signal]] |
| [[initialPageParam: 0]] | الـ [[pageParam]] بتاع أول صفحة. إجباري في v5 |
| [[getNextPageParam]] | بتاخد آخر صفحة وصلت وترجّع [[pageParam]] الجاية. [[null]] أو [[undefined]] = مفيش أكتر |

- [[pageParam]]: الـ cursor بتاع الصفحة دي. أول مرة [[0]]، وبعدين اللي [[getNextPageParam]] رجّعه.
- [[signal]]: [[AbortSignal]]، إشارة بتقول للـ [[fetch]] «اتلغيت، اقفل الطلب». المكتبة بتشغّلها لو الـ component اتشال والطلب لسه شغال.
- [[getJSON<Page>]]: الـ [[<Page>]] نوع الرد.
- [[last => last.nextCursor]]: آخر صفحة فيها الـ cursor الجاي جاهز من السيرفر.

## ٣. الـ hook

~~~text Feed.tsx
const { data, error, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(feedQuery())
~~~

| الاسم | معناه |
|---|---|
| [[data.pages]] | array، كل عنصر فيها رد صفحة واحدة ([[Page]]) |
| [[fetchNextPage()]] | هات الصفحة الجاية |
| [[hasNextPage]] | [[getNextPageParam]] رجّعت قيمة مش null؟ |
| [[isFetchingNextPage]] | فيه صفحة جاية بتتحمّل دلوقتي |
| [[isPending]] و [[error]] | زي useQuery، للصفحة الأولى |

## ٤. العرض

~~~text Feed.tsx
const items = data.pages.flatMap(p => p.items)
~~~

[[data.pages]] شكلها [[[{ items: [A, B] }, { items: [C, D] }]]]. [[flatMap]] بتاخد [[items]] من كل صفحة وتفردهم في array واحدة [[[A, B, C, D]]]. لو استخدمت [[map]] بس، كانت هتطلع array جوه array.

~~~text Feed.tsx
{hasNextPage && (
  <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
    {isFetchingNextPage ? 'Loading more...' : 'Load more'}
  </button>
)}
~~~

- [[شرط && (JSX)]]: لو الشرط false، React مبترسمش حاجة. فالزرار يختفي لما الصفحات تخلص.
- [[<>...</>]] حوالين الـ list والزرار: Fragment، بيجمع أكتر من عنصر من غير ما يزوّد [[div]].

---

## ٥. اللي حصل لما اتشغّل

~~~text Network و الشاشة
  232ms >> GET /api/feed?cursor=0&limit=2
  233ms >> GET /api/feed?cursor=0&limit=2
  234ms xx FAILED /api/feed?cursor=0&limit=2 net::ERR_ABORTED
  535ms << 200 GET /api/feed?cursor=0&limit=2
  972ms الشاشة: A, B [Load more]
 1017ms >> click
 1079ms >> GET /api/feed?cursor=2&limit=2
 1142ms الشاشة: A, B [Loading more...] (disabled)
 1561ms الشاشة: A, B, C, D [Load more]
 1567ms >> click
 1577ms >> GET /api/feed?cursor=4&limit=2
 2045ms الشاشة: A, B, C, D, E        ← الزرار اختفى
~~~

~~~text data.pages.map(p => p.nextCursor)
[2,4,null]
~~~

- أول طلب طلع مرتين واتلغى واحد ([[ERR_ABORTED]]): ده [[<StrictMode>]] في التطوير بيركّب الـ component ويشيله ويركّبه، و [[signal]] لغى الطلب الأول. بعد الـ build هتلاقي طلب واحد.
- الـ cursors [[0]] ثم [[2]] ثم [[4]]، وآخر صفحة فيها عنصر واحد و [[nextCursor: null]]، فـ [[hasNextPage]] بقت false.
- القديم فضل معروض وهو بيحمّل: [[isPending]] متغيرتش، اللي اتغير [[isFetchingNextPage]] بس.

## ٦. الـ solCode: الـ scroll بيحمّل لوحده

### [[LoadMoreSentinel]]

~~~text LoadMoreSentinel.tsx
const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) onVisible() }, { rootMargin: '200px' })
observer.observe(el)
return () => observer.disconnect()
~~~

- [[IntersectionObserver]]: API في المتصفح بيقولك إمتى عنصر دخل الشاشة أو خرج منها. بياخد دالة بتتنادى بـ array تغييرات، و [[([entry])]] بتاخد أول واحد.
- [[entry.isIntersecting]]: العنصر ظاهر دلوقتي.
- [[rootMargin: '200px']]: اعتبره ظاهر قبل ما يوصل بـ ٢٠٠ بكسل، فالتحميل يبدأ بدري.
- [[observe(el)]] ابدأ راقب، و [[disconnect()]] في الـ cleanup وقّف.
- [[if (!el || !enabled) return]]: لو مفيش أكتر أو فيه صفحة بتحمّل، متراقبش. ده اللي بيمنع الـ loop.
- الـ [[div]] فاضي في آخر الـ list، و [[aria-hidden]] بيخبيه عن قارئ الشاشة.

حطيناه بدل الزرار بـ [[enabled={hasNextPage && !isFetchingNextPage}]]:

~~~text Network
  535ms << 200 GET cursor=0
  947ms >> GET /api/feed?cursor=2&limit=2
 1254ms >> GET /api/feed?cursor=4&limit=2
 1716ms الشاشة: A, B, C, D, E
~~~

مفيش ضغطات: الصفحة صغيرة فالـ div فضل ظاهر، وكل مرة صفحة توصل [[enabled]] ترجع true والـ observer يتعمل من جديد ويحمّل اللي بعدها، لحد [[null]]. ولاحظ إن كل طلب بدأ **بعد** ما اللي قبله خلص، بفضل [[!isFetchingNextPage]].

### الـ MSW handler

اتشغّل في Node بـ [[setupServer]] من [[msw/node]] بنفس الـ ٥ عناصر:

~~~text الناتج
cursor=0 {"items":[{"id":1,"name":"Item A"},{"id":2,"name":"Item B"}],"nextCursor":2}
cursor=2 {"items":[{"id":3,"name":"Item C"},{"id":4,"name":"Item D"}],"nextCursor":4}
cursor=4 {"items":[{"id":5,"name":"Item E"}],"nextCursor":null}
~~~

- [[url.searchParams.get('cursor')]]: قيمة [[?cursor=]] كنص، و [[Number(...)]] بيحوّلها رقم.
- [[all.slice(cursor, cursor + limit)]]: العناصر من [[cursor]] لحد قبل [[cursor + limit]].
- [[cursor + limit < all.length ? cursor + limit : null]]: لو فيه عناصر بعد كده رجّع مكانها، غير كده [[null]].

---

## الخلاصة

| useQuery | useInfiniteQuery |
|---|---|
| [[data]] = الرد | [[data.pages]] = array ردود |
| key لكل صفحة | key واحد لكل الصفحات |
| مفيش pageParam | [[initialPageParam]] و [[getNextPageParam]] إجباريين |
| [[refetch]] بس | [[fetchNextPage]] و [[hasNextPage]] و [[isFetchingNextPage]] |

> آخر صفحة لازم ترجّع [[null]] أو [[undefined]] بالظبط، و [[flatMap]] قبل العرض.`,
          lines: [
            "الـ hook، و helper للـ options.",
            "شكل الصفحة: عناصر، و cursor للي بعدها أو null لو خلصت.",
            "تعريف الـ query مرة واحدة:",
            "key واحد لكل الصفحات.",
            "كل صفحة بالـ cursor بتاعها، و signal للإلغاء.",
            "أول cursor.",
            "الـ cursor الجاي من آخر رد. null يعني مفيش أكتر.",
            "قفلة.",
            "الـ component.",
            "الصفحات، والتحميل، وأدوات الصفحة الجاية.",
            "أول صفحة لسه جاية.",
            "خطأ.",
            "كل الصفحات في list واحدة.",
            "بداية الـ JSX.",
            "Fragment.",
            "العناصر.",
            "الزرار يظهر بس لو فيه أكتر.",
            "حمّل الصفحة الجاية، والزرار مقفول وهو بيحمّل.",
            "النص حسب الحالة.",
            "قفلة الزرار.",
            "قفلة الشرط.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`مع ٥ عناصر وصفحات من ٢: أول تحميل عنصرين، وبعدين ٤، وبعدين ٥ والزرار يختفي. الطلبات في Network تلاتة بالترتيب: [[cursor=0]] ثم [[cursor=2]] ثم [[cursor=4]].

الـ IntersectionObserver الصح بيشترط [[hasNextPage && !isFetchingNextPage]] قبل ما ينادي، وبيتقفل في الـ cleanup. لو شفت طلبات كتير ورا بعض لنفس الـ cursor أو loop، الشرط ناقص. ولو الزرار مش بيختفي أبدًا، الـ API بيرجّع [[nextCursor: 0]] أو رقم بدل [[null]].`,
          solCode: R`import { useEffect, useRef } from 'react'

function LoadMoreSentinel({ onVisible, enabled }: { onVisible: () => void; enabled: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) onVisible() }, { rootMargin: '200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onVisible, enabled])
  return <div ref={ref} aria-hidden="true" />
}
// جوه Feed بدل الزرار:
// <LoadMoreSentinel enabled={hasNextPage && !isFetchingNextPage} onVisible={() => fetchNextPage()} />

// MSW handler للتجربة:
http.get('/api/feed', ({ request }) => {
  const url = new URL(request.url)
  const cursor = Number(url.searchParams.get('cursor')), limit = Number(url.searchParams.get('limit'))
  const items = all.slice(cursor, cursor + limit)
  return HttpResponse.json({ items, nextCursor: cursor + limit < all.length ? cursor + limit : null })
})`
        },
        {
          cmd: "enabled و useQueries",
          title: "query مستنية نتيجة query تانية، وعدد queries متغير",
          desc: R`الـ dependent query: لو الطلب التاني محتاج حاجة من رد الأول (المنتج وبعدين الفئة بتاعته)، خلي التاني [[enabled: categoryId !== undefined]]. كده مش هيشتغل لحد ما القيمة توصل، وبعدها يشتغل لوحده.

و [[useQueries]] لما عدد الـ queries نفسه متغير (قارن بين ٢ أو ٥ منتجات حسب اختيار المستخدم): مينفعش تنادي [[useQuery]] جوه loop لأن الـ hooks لازم تتنادى بنفس العدد كل render، فبتدّيله array من الـ options، و [[combine]] يجمع النتايج في شكل واحد.`,
          example: R`import { useQuery, useQueries } from '@tanstack/react-query'

export function ProductWithCategory({ id }: { id: number }) {
  const product = useQuery(productQueries.detail(id))
  const categoryId = product.data?.categoryId
  const category = useQuery({
    queryKey: ['categories', categoryId],
    queryFn: () => api.getCategory(categoryId!),
    enabled: categoryId !== undefined,
  })
  return <p>{product.data?.name ?? '...'} in {category.data?.name ?? '...'}</p>
}
export function Compare({ ids }: { ids: number[] }) {
  const { products, pending } = useQueries({
    queries: ids.map(id => productQueries.detail(id)),
    combine: results => ({
      products: results.flatMap(r => (r.data ? [r.data] : [])),
      pending: results.some(r => r.isPending),
    }),
  })
  if (pending) return <p>Loading...</p>
  return <p>{products.map(p => p.name).join(' vs ')}</p>
}`,
          try: R`ارسم [[ProductWithCategory]] وافتح Network: هتشوف طلب المنتج وبعده طلب الفئة، مش مع بعض. شيل [[enabled]] وشوف طلب [[/api/categories/undefined]]. بعدين ارسم [[Compare]] بـ [[[1, 2, 3]]] واتأكد إن التلات طلبات طالعين مع بعض (مش ورا بعض)، ولو الـ 1 كان في الكاش من صفحة تانية مبيتطلبش.`,
          flag: "script",
          deep: {
            why: R`بيانات كتير مترابطة: المستخدم وبعدين الطلبات بتاعته، والطلب وبعدين عنوان الشحن. والقوايم المتغيرة (مقارنة منتجات، و dashboard فيه widgets المستخدم بيختارها) محتاجة عدد queries يتغير. لو عملت ده بـ effect و fetch بإيدك، هتكتب loading لكل واحد وتنسى الكاش.`,
            how: R`[[enabled: false]] بيخلي الـ query في حالة [[isPending]] و [[fetchStatus: 'idle']]: مستنية ومش بتجيب. أول ما القيمة تبقى true بتشتغل. خد بالك إن [[isPending]] بيفضل true طول ما هي disabled، عشان كده [[isLoading]] (يعني pending و fetching مع بعض) أدق لو عايز spinner بس وقت التحميل الفعلي. وبديل أنضف في TypeScript: [[queryFn: categoryId === undefined ? skipToken : () => api.getCategory(categoryId)]]، و [[skipToken]] بيعمل نفس شغل enabled ومن غير الـ [[!]].

الـ dependent queries معناها waterfall: الطلب التاني مبيبدأش غير لما الأول يخلص. أحيانًا ده ضروري، بس لو تقدر تخلي الـ API يرجّع الفئة مع المنتج، أو الفرونت يعرف الـ categoryId من الـ URL، اعمل كده.

[[useQueries]] بيعمل observer لكل عنصر، وكل واحد ليه entry في الكاش بالـ key بتاعه، فنفس المنتج اللي في صفحة تانية مبيتطلبش تاني. والطلبات بتطلع بالتوازي. و [[combine]] بيتنادى مع كل تغيير ويرجّع الشكل اللي انت عايزه، ونتيجته بتتثبت (structural sharing) فمبتعملش object جديد لو مفيش حاجة اتغيرت.`,
            when: R`enabled: query معتمدة على رد query تانية، أو على اختيار المستخدم (بحث مبيبدأش غير بعد ٣ حروف)، أو على تسجيل الدخول. useQueries: أي عدد queries بيتحدد وقت التشغيل.`,
            mistakes: R`[[ids.map(id => useQuery(...))]]: عدد الـ hooks بيتغير مع الـ ids، و React هتقع أو تخلط الـ state. و [[enabled: !!categoryId]] والـ id ممكن يبقى [[0]] فعلًا، فمبتشتغلش أبدًا. و categoryId مش في الـ key فكل المنتجات بتشوف نفس الفئة من الكاش. و spinner على [[isPending]] لـ query disabled، فيفضل يلف للأبد لو الشرط عمره ما اتحقق.`
          },
          teach: R`## الفكرة: query تستنى، وعدد queries بيتغير

المثال component اتنين:

- [[ProductWithCategory]]: بيجيب المنتج، ومن رده ياخد [[categoryId]]، وبعدها بس يجيب الفئة.
- [[Compare]]: بياخد array ids ويجيب كل المنتجات دي مع بعض، مهما كان عددها.

اتشغّل في Vite + React 19.3 + TanStack Query 5.104 في Chrome headless، والـ API بيرد بعد ٣٠٠ms. و [[productQueries.detail]] هو نفسه بتاع درس query key factory (فيه [[staleTime: 60_000]])، و [[api.getCategory]] بيجيب [[/api/categories/:id]].

---

## ١. المنتج الأول

~~~text ProductWithCategory.tsx
const product = useQuery(productQueries.detail(id))
const categoryId = product.data?.categoryId
~~~

مفكّكناش النتيجة هنا، سبناها object اسمه [[product]] عشان فيه اتنين queries في نفس الـ component. و [[product.data?.categoryId]]: لو [[data]] لسه undefined، [[?.]] بيرجّع undefined بدل ما يرمي error. يعني [[categoryId]] نوعه [[number | undefined]].

## ٢. الفئة، مستنية

~~~text ProductWithCategory.tsx
const category = useQuery({
  queryKey: ['categories', categoryId],
  queryFn: () => api.getCategory(categoryId!),
  enabled: categoryId !== undefined,
})
~~~

- [[categoryId]] في الـ key: كل فئة ليها كاش لوحدها. ولما يتغير من undefined لـ 10، ده key جديد.
- [[categoryId!]]: الـ [[!]] بعد الاسم بتقول لـ TypeScript «مش undefined». آمنة لأن الـ queryFn مش هتشتغل غير لما [[enabled]] تبقى true.
- [[enabled: categoryId !== undefined]]: boolean. طول ما هو false الـ query موجودة بس مبتجيبش. ومكتوب [[!== undefined]] مش [[!!categoryId]] عشان لو الـ id = [[0]]، [[!!0]] = false والـ query عمرها ما هتشتغل.

## ٣. العرض

~~~text ProductWithCategory.tsx
return <p>{product.data?.name ?? '...'} in {category.data?.name ?? '...'}</p>
~~~

[[أ ?? ب]]: لو [[أ]] null أو undefined خد [[ب]]. فكل حتة بتعرض «...» لحد ما بياناتها توصل.

---

## ٤. اللي حصل: [[enabled]] موجودة

بنقرا [[status/fetchStatus]] بتاع query الفئة كل ٢٥٠ms:

~~~text Network و الشاشة
  263ms >> GET /api/products/3
  288ms ... in ...        category: pending/idle
  572ms << 200 GET /api/products/3
  575ms >> GET /api/categories/10
  816ms Lamp in ...       category: pending/fetching
 1082ms Lamp in Kitchen   category: success/idle
~~~

| status / fetchStatus | معناها |
|---|---|
| [[pending/idle]] | مفيش data، ومش بتجيب: مستنية [[enabled]] |
| [[pending/fetching]] | مفيش data، وبتجيب دلوقتي |
| [[success/idle]] | الـ data وصلت، ومفيش طلب شغال |

[[status]] بيقول «فيه data ولا لأ»، و [[fetchStatus]] بيقول «فيه طلب شغال ولا لأ». و [[isPending]] = [[status === 'pending']]، عشان كده هي true وهي [[idle]]: لو حطيت spinner عليها لـ query شرطها عمره ما اتحقق، هيلف للأبد. [[isLoading]] = pending **و** fetching مع بعض.

والطلبين ورا بعض: الفئة بدأت بعد ٣ms من رد المنتج. ده waterfall، وهو هنا لازم لأن الـ id جاي من الرد.

### من غير [[enabled]]

~~~text Network
  208ms >> GET /api/products/3
  209ms >> GET /api/categories/undefined
  512ms << 404 GET /api/categories/undefined
  515ms >> GET /api/categories/10
~~~

الطلبين طلعوا مع بعض، والتاني بـ [[undefined]] في الـ URL ورجع 404. وبعدين لما الـ id وصل الـ key اتغير فطلع الطلب الصح. شغّال في الآخر، بس فيه طلب زبالة و error في الـ console.

### بـ [[skipToken]] (الـ solCode)

~~~text ProductWithCategory.tsx
queryFn: categoryId === undefined ? skipToken : () => api.getCategory(categoryId),
~~~

[[skipToken]] قيمة خاصة من المكتبة: لما تحطها مكان الـ queryFn، الـ query بتتوقف زي [[enabled: false]]. والفرق إن TypeScript جوه الفرع التاني عارف إن [[categoryId]] رقم (اتأكدنا فوقه إنه مش undefined)، فمش محتاج [[!]]. النتيجة في Network زي [[enabled]] بالظبط: [[pending/idle]]، وبعدين طلب الفئة بعد المنتج.

---

## ٥. [[useQueries]] و [[combine]]

~~~text Compare.tsx
const { products, pending } = useQueries({
  queries: ids.map(id => productQueries.detail(id)),
  combine: results => ({
    products: results.flatMap(r => (r.data ? [r.data] : [])),
    pending: results.some(r => r.isPending),
  }),
})
~~~

- [[queries]]: array options. [[ids.map(...)]] بتعمل options لكل id. ده hook **واحد** مهما كان العدد، فقاعدة «نفس عدد الـ hooks كل render» متكسرتش.
- [[combine]]: بتاخد array النتايج (واحدة لكل query، زي اللي useQuery بيرجّعه) وترجّع الشكل اللي انت عايزه. واللي بترجّعه هو اللي [[useQueries]] بيرجّعه.
- [[r.data ? [r.data] : []]] جوه [[flatMap]]: اللي وصل يبقى array فيها عنصر، واللي لسه يبقى array فاضية، و [[flatMap]] تفردهم. النتيجة المنتجات اللي وصلت بس، من غير undefined.
- [[results.some(r => r.isPending)]]: [[true]] لو **أي** واحدة لسه.

~~~text Compare.tsx
if (pending) return <p>Loading...</p>
return <p>{products.map(p => p.name).join(' vs ')}</p>
~~~

[[join(' vs ')]] بيلزق الأسامي بالنص ده بينهم.

## ٦. اللي حصل: Compare

الصفحة الأول عرضت منتج ١ (فدخل الكاش)، وبعدين بدّلناها بـ [[<Compare ids={[1, 2, 3]} />]]، وبعدين زوّدنا ٤:

~~~text Network و الشاشة
  224ms >> GET /api/products/1          (الصفحة الأولى)
 1125ms Mug in Kitchen
 1168ms >> compare [1,2,3]
 1191ms >> GET /api/products/2
 1192ms >> GET /api/products/3
 1194ms Loading...
 1705ms Mug vs Pen vs Lamp
 1709ms >> ids [1,2,3,4]
 1721ms >> GET /api/products/4
 2230ms Mug vs Pen vs Lamp vs Desk
~~~

- مفيش طلب لمنتج ١: كان في الكاش وجوه الـ [[staleTime]]. كل عنصر في [[useQueries]] ليه entry بالـ key بتاعه، نفس اللي useQuery العادي بيستخدمه.
- ٢ و ٣ طلعوا في نفس الملي ثانية تقريبًا: بالتوازي مش ورا بعض.
- لما الـ array كبرت، طلب واحد للجديد بس.

---

## الخلاصة

| المشكلة | الحل |
|---|---|
| query محتاجة قيمة لسه موجتش | [[enabled: x !== undefined]] أو [[skipToken]] |
| spinner لـ query ممكن تبقى disabled | [[isLoading]] مش [[isPending]] |
| عدد queries بيتحدد وقت التشغيل | [[useQueries({ queries: [...] })]] |
| عايز النتايج في شكل واحد | [[combine]] |

> متناديش [[useQuery]] جوه [[map]] أو [[if]]: عدد الـ hooks لازم يفضل ثابت.`,
          lines: [
            "الاتنين من نفس المكتبة.",
            "منتج وفئته.",
            "المنتج الأول.",
            "الـ id بتاع الفئة من رد المنتج، ممكن يبقى undefined لسه.",
            "query الفئة:",
            "الـ id جوه الـ key.",
            "الطلب. الـ ! آمنة لأنها مش هتتنادى غير لما enabled تبقى true.",
            "متشتغلش غير لما الـ id يوصل. صريح عشان الـ 0 ميتعاملش كـ «مفيش».",
            "قفلة.",
            "اعرض اللي وصل.",
            "قفلة.",
            "مقارنة عدد متغير من المنتجات.",
            "hook واحد مهما كان العدد:",
            "query لكل id بنفس الـ options بتاعة صفحة التفاصيل، فالكاش مشترك.",
            "اجمع النتايج في شكل واحد:",
            "المنتجات اللي وصلت بس.",
            "لسه فيه حاجة بتحمّل؟",
            "قفلة combine.",
            "قفلة useQueries.",
            "loading.",
            "اعرض.",
            "قفلة."
          ],
          sol: R`في Network طلب [[/api/products/3]] الأول، ولما يرجع يطلع [[/api/categories/10]]، والنص بيبقى «P3 in ...» وبعدين «P3 in Kitchen». من غير [[enabled]] هتلاقي طلب [[/api/categories/undefined]] في الأول (غالبًا 404) وبعده الطلب الصح.

الـ Compare: التلات طلبات بيبدأوا في نفس اللحظة في الـ waterfall بتاع Network. ولو فتحت صفحة المنتج 1 قبلها، مش هتلاقي طلب ليه (لو لسه جوه الـ staleTime).`,
          solCode: R`<ProductWithCategory id={3} />
<Compare ids={[1, 2, 3]} />
// نفس الشرط بـ skipToken بدل enabled:
import { skipToken } from '@tanstack/react-query'
useQuery({
  queryKey: ['categories', categoryId],
  queryFn: categoryId === undefined ? skipToken : () => api.getCategory(categoryId),
})`
        },
        {
          cmd: "useSuspenseQuery",
          title: "خلي Suspense و ErrorBoundary يمسكوا الـ loading والـ error",
          desc: R`[[useSuspenseQuery]] زي [[useQuery]] بس [[data]] مضمونة: مفيش [[isPending]] ولا [[undefined]]. لو البيانات لسه مجتش، الـ component بيعمل suspend وأقرب [[<Suspense fallback>]] فوقه يعرض الـ skeleton، ولو الطلب فشل الخطأ بيترمي لأقرب ErrorBoundary.

كده الـ component بيكتب الحالة الناجحة بس، والـ loading والـ error بيتحددوا مرة واحدة في الـ layout. و [[useSuspenseQueries]] و [[useSuspenseInfiniteQuery]] بنفس الفكرة.`,
          example: R`import { Suspense } from 'react'
import { useSuspenseQuery, QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

function ProductTitle({ id }: { id: number }) {
  const { data } = useSuspenseQuery(productQueries.detail(id))
  return <h1>{data.name}</h1>
}
export function ProductPage({ id }: { id: number }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => <button onClick={resetErrorBoundary}>Try again</button>}>
          <Suspense fallback={<TitleSkeleton />}>
            <ProductTitle id={id} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}`,
          try: R`ارسم [[ProductPage]] وخلي الـ API ياخد ثانية: هتشوف الـ skeleton. خليه يرجّع 500: هتشوف زرار Try again (بعد الـ retries، فخلي [[retry: false]] وانت بتجرّب). بعدين حط اتنين [[ProductTitle]] بـ ids مختلفة جوه نفس الـ Suspense وشوف في Network الطلبين طالعين مع بعض ولا ورا بعض.`,
          flag: "script",
          deep: {
            why: R`كل component بـ useQuery بيبدأ بـ [[if (isPending)]] و [[if (error)]]، والـ TypeScript بيخليك تكتب [[data?.]] في كل حتة. ولما صفحة فيها ٥ أجزاء كل واحد بيجيب بياناته، بتشوف ٥ spinners بيظهروا ويختفوا في أوقات مختلفة. Suspense بيخليك تقرر «الجزء ده كله يستنى مع بعض ويعرض skeleton واحد».`,
            how: R`لما الـ data مش في الكاش، [[useSuspenseQuery]] بيرمي promise. React بتمسكها، وتدوّر على أقرب Suspense فوق وتعرض الـ fallback، ولما الـ promise تخلص ترسم تاني والـ data موجودة. ولو فشل، بيرمي الـ error وقت الرسم فالـ ErrorBoundary يمسكه (مش زي useQuery اللي بيرجّعه كقيمة).

[[QueryErrorResetBoundary]] بيدّيك [[reset]] بتصفّر حالة الخطأ في الـ queries اللي تحتها، فلما المستخدم يدوس Try again الـ query تتجاب من جديد بدل ما ترمي نفس الخطأ القديم من الكاش على طول.

خد بالك من الـ waterfall: لو فيه اتنين [[useSuspenseQuery]] في نفس الـ component، الأول بيعمل suspend فالتاني مبيتناداش أصلًا لحد ما الأول يخلص، يعني ورا بعض. الحل [[useSuspenseQueries]] للاتنين مع بعض، أو components منفصلة جنب بعض (React 19 بيبدأ الأخوات مع بعض)، أو prefetch قبلها. و [[enabled]] مش موجود هنا لأن data لازم تبقى موجودة، فالـ query المعتمدة على تانية بتتكتب في component ابن.

وفي Next.js App Router ده مع HydrationBoundary (الدرس الجاي) بيخلي الـ component ياخد البيانات من الـ prefetch بتاع السيرفر من غير suspend خالص.`,
            when: R`صفحات وأجزاء عايز الـ loading بتاعها يتحكم فيه من الـ layout، ولما تستخدم Suspense بالفعل (lazy routes أو Next.js streaming). لـ component صغير لوحده، useQuery العادي أبسط.`,
            mistakes: R`Suspense واحد فوق الصفحة كلها، فأي query بطيئة تخفي كل حاجة. واتنين useSuspenseQuery ورا بعض في نفس الـ component والمستخدم مستني الاتنين بالتتابع. و ErrorBoundary من غير QueryErrorResetBoundary فـ Try again مبيعملش حاجة. وتستخدم [[throwOnError]] مع useSuspenseQuery: هو أصلًا بيرمي. ونسيان إن الـ retries بتحصل قبل ما الـ boundary يشوف الخطأ، فالـ skeleton يفضل ٧ ثواني تقريبًا.`
          },
          teach: R`## الفكرة: الـ component يكتب النجاح بس، والأب يقرر الباقي

[[ProductTitle]] بيعرض اسم منتج بـ [[useSuspenseQuery]]، ومفيهوش ولا [[if]]: لو البيانات لسه، الـ component «بيستنى» (suspend) و [[<Suspense>]] فوقه يعرض الـ skeleton. ولو فشل، [[ErrorBoundary]] فوقه يعرض «Try again». و [[ProductPage]] هو اللي بيرتّب الطبقات دي.

اتشغّل في Vite + React 19.3 + TanStack Query 5.104 + react-error-boundary 6.1 في Chrome headless. الـ API بيرد بعد ثانية، والـ QueryClient فيه [[retry: false]] زي الـ try عشان الخطأ يظهر على طول. و [[TitleSkeleton]] component بسيط بيعرض «loading title...».

---

## ١. الـ imports

~~~text ProductPage.tsx
import { Suspense } from 'react'
import { useSuspenseQuery, QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
~~~

| الاسم | جاي منين | دوره |
|---|---|---|
| [[Suspense]] | React | يعرض [[fallback]] طول ما فيه حاجة تحته مستنية |
| [[useSuspenseQuery]] | TanStack Query | زي useQuery، بس بيستنى بدل ما يرجّع isPending |
| [[QueryErrorResetBoundary]] | TanStack Query | بيدّي دالة [[reset]] بتمسح أخطاء الـ queries اللي تحته |
| [[ErrorBoundary]] | مكتبة react-error-boundary ([[npm i react-error-boundary]]) | يمسك أي error اترمى وقت الرسم تحته |

## ٢. [[ProductTitle]]

~~~text ProductPage.tsx
function ProductTitle({ id }: { id: number }) {
  const { data } = useSuspenseQuery(productQueries.detail(id))
  return <h1>{data.name}</h1>
}
~~~

[[data.name]] من غير [[?.]]: نوع [[data]] هنا [[Product]] مش [[Product | undefined]]، لأن السطر اللي بعد الـ hook مش هيتنفذ غير والبيانات موجودة. وبياخد نفس [[productQueries.detail]] بتاع درس query key factory.

إزاي بيستنى؟ لو مفيش data في الكاش، الـ hook بيبدأ الطلب و**بيرمي** الـ promise بتاعه. React بتمسكها، وتعرض أقرب [[fallback]]، ولما الـ promise تخلص ترسم الـ component من الأول وساعتها الـ data موجودة. ولو الطلب فشل، بيرمي الـ error نفسه، فيوصل لأقرب ErrorBoundary.

## ٣. [[ProductPage]]: الطبقات من برا لجوه

~~~text ProductPage.tsx
<QueryErrorResetBoundary>
  {({ reset }) => (
    <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => <button onClick={resetErrorBoundary}>Try again</button>}>
      <Suspense fallback={<TitleSkeleton />}>
        <ProductTitle id={id} />
      </Suspense>
    </ErrorBoundary>
  )}
</QueryErrorResetBoundary>
~~~

1. [[QueryErrorResetBoundary]]: الـ children بتوعه **دالة** مش JSX (اسمها render prop). بيناديها ويدّيها [[{ reset }]].
2. [[ErrorBoundary]]:
  - [[fallbackRender]]: دالة بترسم بدل الأولاد لو حصل error. بتاخد [[resetErrorBoundary]]، اللي لما تتنادى الـ boundary يحاول يرسم الأولاد تاني.
  - [[onReset={reset}]]: قبل ما يرسم تاني، نادي [[reset]] بتاعة Query، فالـ query تتجاب من جديد بدل ما ترمي نفس الخطأ المحفوظ.
3. [[Suspense fallback]]: الـ skeleton طول ما [[ProductTitle]] مستني.

الترتيب مهم: الـ ErrorBoundary **برا** الـ Suspense، فيمسك أخطاء أي حاجة جواه.

---

## ٤. اللي حصل لما اتشغّل

### API بطيء (ثانية)

~~~text Network و الشاشة
  487ms >> GET /api/products/3
  468ms → 1467ms  loading title...
 1499ms << 200 GET /api/products/3
 1779ms <h1>Lamp</h1>
~~~

### API بيرجّع 500، وبعدين رجع يشتغل

~~~text Network و الشاشة
  234ms >> GET /api/fail
  442ms << 500
  536ms [error] Error: HTTP 500 ... The above error occurred in the <ProductTitle> component.
 1032ms [Try again]
 1090ms >> الـ API رجع، click Try again
 1144ms >> GET /api/products/3
 1146ms loading title...
 2459ms <h1>Lamp</h1>
~~~

React بتطبع الـ error في الـ console حتى لو boundary مسكه، ده عادي في التطوير. والضغطة عملت طلب جديد، و skeleton، وبعدين العنوان.

### نفس الكلام من غير [[onReset={reset}]]

~~~text Network و الشاشة
 1052ms [Try again]
 1098ms >> click Try again
 1124ms [error] Error: HTTP 500 ...
 1128ms [Try again]
 2449ms [Try again]
~~~

ولا طلب طلع. الـ ErrorBoundary رسم الأولاد تاني، بس الـ query لسه في حالة error في الكاش، فرمت نفس الخطأ القديم على طول. ده ليه [[QueryErrorResetBoundary]] موجود.

---

## ٥. الـ solCode: أخوات ولا ورا بعض؟

~~~text أخوات: <ProductTitle id={1} /> و <ProductTitle id={2} /> جوه نفس الـ Suspense
  277ms >> GET /api/products/1
  288ms >> GET /api/products/2
 1282ms << 200 /1     1297ms << 200 /2
 1563ms <h1>Mug</h1><h1>Pen</h1>
~~~

~~~text TwoTitles: اتنين useSuspenseQuery في نفس الـ component
  287ms >> GET /api/products/1
 1287ms << 200 /1
 1289ms >> GET /api/products/2      ← بدأ بعد ما الأول خلص
 1877ms loading title...            (لسه)
~~~

~~~text useSuspenseQueries({ queries: [detail(1), detail(2)] })
  275ms >> GET /api/products/1
  275ms >> GET /api/products/2
 1557ms <p>Mug / Pen</p>
~~~

- **الأخوات**: React بدأت الاتنين مع بعض، وظهروا مع بعض لأنهم تحت نفس الـ Suspense (ثانية واحدة).
- **[[TwoTitles]]**: أول hook رمى promise، فالسطر التاني متنفذش أصلًا لحد ما الأول خلص. طلبين ورا بعض = ثانيتين. ده الـ waterfall.
- **[[useSuspenseQueries]]**: hook واحد بيبدأ الاتنين، وبيرجّع array نتايج بنفس الترتيب ([[[a, b]]]). ثانية واحدة.

---

## الخلاصة

| useQuery | useSuspenseQuery |
|---|---|
| [[data]] ممكن undefined | [[data]] موجودة دايمًا |
| [[if (isPending)]] جوه الـ component | [[<Suspense fallback>]] فوقه |
| [[if (error)]] جوه الـ component | [[ErrorBoundary]] فوقه، ومعاه [[QueryErrorResetBoundary]] |
| [[enabled]] موجودة | مفيش [[enabled]] |

> اتنين [[useSuspenseQuery]] في نفس الـ component = طلبين ورا بعض. استخدم [[useSuspenseQueries]] أو components أخوات.`,
          lines: [
            "Suspense من React.",
            "الـ hook، و boundary بيصفّر أخطاء الـ queries.",
            "ErrorBoundary من المكتبة (درس ErrorBoundary).",
            "جزء بيعرض عنوان المنتج.",
            "data مضمونة: مفيش undefined ولا isPending.",
            "الحالة الناجحة بس.",
            "قفلة.",
            "الصفحة اللي بتحدد الـ loading والـ error.",
            "بداية الـ JSX.",
            "بيدّي reset للأولاد.",
            "دالة بتاخد reset.",
            "الخطأ هنا، و Try again بيصفّر الـ boundary والـ queries مع بعض.",
            "الـ loading هنا.",
            "الجزء نفسه.",
            "قفلة Suspense.",
            "قفلة ErrorBoundary.",
            "قفلة الدالة.",
            "قفلة QueryErrorResetBoundary.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`مع API بطيء: الـ skeleton ثانية وبعدين العنوان، ومفيش أي [[if]] للـ loading جوه ProductTitle. مع 500 و [[retry: false]]: زرار Try again على طول، ولو خليت الـ API يرجع يشتغل ودوست، العنوان يظهر. من غير [[onReset={reset}]] هتلاقي الزرار بيعرض نفس الخطأ تاني فورًا.

اتنين ProductTitle جنب بعض جوه نفس الـ Suspense: الطلبين بيطلعوا مع بعض لأنهم components أخوات. لو حطيت الاتنين [[useSuspenseQuery]] في component واحد، هتشوف الطلب التاني بيبدأ بعد ما الأول يخلص (waterfall).`,
          solCode: R`<Suspense fallback={<TitleSkeleton />}>
  <ProductTitle id={1} />
  <ProductTitle id={2} />
</Suspense>

// الـ waterfall اللي تتجنبه:
function TwoTitles() {
  const a = useSuspenseQuery(productQueries.detail(1)) // بيعمل suspend هنا
  const b = useSuspenseQuery(productQueries.detail(2)) // مبيبدأش غير بعد ما الأول يخلص
  return <p>{a.data.name} / {b.data.name}</p>
}
// الحل: useSuspenseQueries({ queries: [productQueries.detail(1), productQueries.detail(2)] })`
        },
        {
          cmd: "HydrationBoundary",
          title: "React Query مع Next.js App Router: هات البيانات على السيرفر وكمّل في المتصفح",
          desc: R`في Next.js تقدر تعمل prefetch في Server Component: تعمل [[QueryClient]] جديد للطلب ده، وتجيب البيانات بـ [[queryClient.query]]، وتبعت الكاش للمتصفح بـ [[<HydrationBoundary state={dehydrate(queryClient)}>]]. الـ Client Component اللي تحت بيستخدم [[useQuery]] عادي بنفس الـ key، ويلاقي البيانات جاهزة من أول render: الـ HTML فيه البيانات، ومفيش loading، ومفيش طلب تاني.

وبعد كده الـ query بتشتغل عادي في المتصفح: refetch، و invalidate بعد mutation، و polling. ده الفرق عن إنك تبعت البيانات كـ props.`,
          example: R`// app/get-query-client.ts
import { QueryClient, environmentManager } from '@tanstack/react-query'
const makeQueryClient = () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } })
let browserQueryClient: QueryClient | undefined
export function getQueryClient() {
  if (environmentManager.isServer()) return makeQueryClient()
  return (browserQueryClient ??= makeQueryClient())
}
// app/providers.tsx ('use client' في أول سطر): <QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
// app/products/[id]/page.tsx (Server Component)
import { dehydrate, HydrationBoundary, QueryClient, noop } from '@tanstack/react-query'
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const queryClient = new QueryClient()
  await queryClient.query({ queryKey: productKeys.detail(Number(id)), queryFn: () => getProductFromDb(Number(id)) }).catch(noop)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetails id={Number(id)} />
    </HydrationBoundary>
  )
}
// ProductDetails ('use client'): const { data } = useQuery(productQueries.detail(id))`,
          try: R`في مشروع Next (تاب Next.js)، اعمل الصفحة دي، و [[ProductDetails]] client component بيعرض الاسم وزرار «حدّث» بيعمل [[invalidateQueries]]. افتح View Source: الاسم موجود في الـ HTML. افتح Network وقت التحميل: مفيش طلب للـ API من المتصفح. دوس «حدّث»: طلب من المتصفح. بعدين شيل الـ HydrationBoundary وقارن.`,
          flag: "script",
          deep: {
            why: R`الـ Server Components بتجيب البيانات أسرع (جنب الداتابيز) وبتطلّعها في الـ HTML، بس مبتعرفش تعمل refetch ولا optimistic update ولا polling. و React Query في المتصفح بيعرف كل ده بس بيبدأ بـ loading. الاتنين مع بعض: السيرفر يملا الكاش في أول تحميل، والمتصفح يكمّل. ومفيد جدًا لو الكود ده جاي من SPA قديمة كلها React Query: تنقلها لـ Next من غير ما تعيد كتابة الـ components.`,
            how: R`[[dehydrate(queryClient)]] بيحوّل الكاش لـ object عادي (keys و data و وقت الجلب)، و Next بيبعته للمتصفح كـ prop للـ HydrationBoundary (اللي هو client component). في المتصفح، HydrationBoundary بيحط البيانات دي في الـ QueryClient بتاع المتصفح قبل ما الأولاد يترسموا، فـ useQuery يلاقيها.

ليه [[staleTime]] أكبر من صفر؟ لأن البيانات جاية بوقت جلبها من السيرفر، ولو staleTime صفر، أول ما الـ component يعمل mount في المتصفح هيعتبرها قديمة ويطلبها تاني على طول. دقيقة مثلًا بتمنع الطلب الزيادة ده.

ليه [[getQueryClient]] بالشكل ده؟ على السيرفر لازم client جديد لكل طلب، وإلا بيانات مستخدم ممكن تتسرب لطلب مستخدم تاني. في المتصفح client واحد طول عمر الصفحة. ولو عملته بـ [[useState(() => new QueryClient())]] من غير Suspense فوقه، React ممكن ترمي الـ state لو حاجة عملت suspend في أول render فتعمل client جديد وتضيّع الكاش، عشان كده الـ docs بتقترح المتغير على مستوى الـ module في المتصفح. و [[environmentManager.isServer()]] هو البديل الجديد لـ [[isServer]] (لسه موجود بس deprecated).

في Server Component متعملش [[fetch('/api/...')]] لنفسك: نادي الدالة اللي بتكلم الداتابيز مباشرة (تاب Next.js، درس DAL). و [[.catch(noop)]] لأن لو الـ prefetch فشل، الـ client component هيجرّب تاني ويعرض الخطأ بنفسه. وكل صفحة ليها HydrationBoundary بتاعها بالبيانات اللي هي جابتها بس.

ومتعرضش نتيجة الـ query في الـ Server Component نفسه وفي الـ client component مع بعض: لما المتصفح يعمل refetch، الـ client هيتحدث والـ server component لأ، فالشاشة تختلف مع نفسها.`,
            when: R`تطبيق Next.js فيه صفحات تفاعلية بتتحدث (dashboards، و lists بفلاتر، وأي حاجة فيها mutations كتير)، أو نقل SPA بـ React Query لـ Next. لو الصفحة بتعرض بيانات ومش بتتغير في المتصفح، Server Component لوحده أبسط ومفيش داعي لـ React Query.`,
            mistakes: R`QueryClient واحد global على السيرفر: بيانات المستخدمين بتتخلط. و staleTime صفر فالمتصفح بيطلب نفس البيانات تاني فورًا. والـ key في الـ prefetch مختلف عن اللي في useQuery (مثلًا [[id]] string هنا و number هناك: [[['products','detail','5']]] غير [[['products','detail',5]]])، فالـ prefetch راح على الفاضي. وتعمل fetch لـ API route من Server Component في نفس التطبيق. وتنسى إن الـ data لازم تبقى serializable: Date بتوصل string، و Map و class instances بيبوظوا.`
          },
          teach: R`## الفكرة: السيرفر يملا الكاش، والمتصفح يكمّل بيه

الصفحة Server Component بتجيب المنتج من الداتابيز، وتحطه في QueryClient، وتبعت الكاش ده للمتصفح جوه [[HydrationBoundary]]. و [[ProductDetails]] client component بيستخدم [[useQuery]] عادي، فيلاقي البيانات جاهزة.

اتشغّل كمشروع Next.js 16.4 حقيقي ([[next build]] ثم [[next start]]) مع TanStack Query 5.104 و React 19.3، وفتحناه في Chrome headless. [[getProductFromDb]] دالة بتطبع سطر في لوج السيرفر وترجّع المنتج ومعاه [[loadedAt]] (وقت الجلب) عشان نعرف البيانات جت منين، و [[productQueries.detail]] بيعمل fetch لـ route [[/api/products/:id]] في نفس المشروع، و [[ProductDetails]] هو الـ solCode.

---

## ١. [[app/get-query-client.ts]]

~~~text app/get-query-client.ts
import { QueryClient, environmentManager } from '@tanstack/react-query'
const makeQueryClient = () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } })
let browserQueryClient: QueryClient | undefined
export function getQueryClient() {
  if (environmentManager.isServer()) return makeQueryClient()
  return (browserQueryClient ??= makeQueryClient())
}
~~~

- [[makeQueryClient]]: دالة بتعمل client جديد بـ [[staleTime]] دقيقة. ليه مش صفر؟ البيانات جاية من السيرفر لسه، ولو صفر المتصفح هيعتبرها قديمة أول ما الـ component يركب ويطلبها تاني.
- [[let browserQueryClient: QueryClient | undefined]]: متغير على مستوى الملف، فاضي في الأول.
- [[environmentManager.isServer()]]: [[true]] لو الكود شغال على السيرفر (مفيش [[window]]). على السيرفر: client **جديد** لكل نداء، عشان كل request ليه كاش لوحده وبيانات مستخدم متوصلش لمستخدم تاني.
- [[a ??= b]]: لو [[a]] null أو undefined حط فيه [[b]]، وفي الحالتين رجّع [[a]]. فالمتصفح بيعمل client مرة واحدة ويرجّعه كل مرة.

## ٢. [[app/providers.tsx]]

~~~text app/providers.tsx
'use client'
<QueryClientProvider client={getQueryClient()}>{children}</QueryClientProvider>
~~~

[['use client']] في أول سطر بيقول لـ Next إن الملف ده client component (فيه context، فلازم). و [[children]] باقي التطبيق. والـ layout بيلف الصفحات بـ [[<Providers>]].

## ٣. الصفحة: [[app/products/[id]/page.tsx]]

~~~text page.tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
~~~

- Server Component، و [[async]] مسموحة هنا بس (مش في client components).
- [[[id]]] في اسم الفولدر معناه جزء متغير في الـ URL، فـ [[/products/5]] يدّي [[id = '5']]. وفي Next الجديد [[params]] Promise، فلازم [[await]].
- [[id]] **نص**، عشان كده [[Number(id)]] في كل مكان: الـ key لازم يبقى [[5]] رقم زي اللي في الـ client، مش [['5']].

~~~text page.tsx
const queryClient = new QueryClient()
await queryClient.query({ queryKey: productKeys.detail(Number(id)), queryFn: () => getProductFromDb(Number(id)) }).catch(noop)
~~~

- client جديد للطلب ده بس.
- [[queryClient.query]]: هات وحط في الكاش. الـ key هو هو بتاع [[productQueries.detail]]، بس الـ queryFn بتكلم الداتابيز مباشرة بدل fetch للـ API.
- [[.catch(noop)]]: لو فشل كمّل عادي، والـ client هيجرّب ويعرض الخطأ.

~~~text page.tsx
<HydrationBoundary state={dehydrate(queryClient)}>
  <ProductDetails id={Number(id)} />
</HydrationBoundary>
~~~

- [[dehydrate(queryClient)]]: بتحوّل الكاش لـ object عادي يتبعت (JSON).
- [[HydrationBoundary]]: client component بياخد الـ object ده ويحطه في الـ QueryClient بتاع المتصفح **قبل** ما الأولاد يترسموا.

## ٤. [[ProductDetails]] (الـ solCode)

~~~text ProductDetails.tsx
const { data, isPending } = useQuery(productQueries.detail(id))
const queryClient = useQueryClient()
if (isPending) return <p>Loading...</p>
...
<button onClick={() => queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })}>حدّث</button>
~~~

ولا سطر مختلف عن SPA عادية. «حدّث» بيعمل invalidate، فالـ query تتجاب تاني من المتصفح.

---

## ٥. اللي حصل لما اتشغّل

### الـ HTML اللي السيرفر بعته ([[curl]])

~~~text curl -s http://localhost:5801/products/5
<h1>Chair</h1>
... "status":"success","fetchStatus":"idle"},"queryKey":["products","detail",5],"queryHash":"[\"products\",\"detail\",5]"} ...
~~~

الاسم موجود في الـ HTML نفسه (ده اللي View Source بيوريه)، والكاش المتحوّل جوه الصفحة بالـ key والحالة.

### في المتصفح

~~~text Network و الشاشة (Chrome headless)
  230ms [error] Failed to load resource: 404      ← favicon.ico، مش موجود في المشروع
 1728ms الشاشة: Chair | 2026-10-07T06:42:11.424Z | حدّث
 1760ms >> click حدّث
 1778ms >> GET /api/products/5
 2587ms الشاشة: Chair | 2026-10-07T06:42:13.181Z | حدّث
~~~

~~~text لوج السيرفر
[server] getProductFromDb 5      ← الصفحة (curl)
[server] getProductFromDb 5      ← الصفحة (Chrome)
[server] getProductFromDb 5      ← route الـ API بعد «حدّث»
~~~

- وقت التحميل: **ولا** طلب [[/api/]] من المتصفح. الـ useQuery لقى البيانات من الـ boundary، و fresh (جوه الدقيقة).
- «حدّث»: طلب من المتصفح، و [[loadedAt]] اتغير من غير reload. يعني الـ query «حية» في المتصفح.

### من غير HydrationBoundary

خلّينا الصفحة ترجّع [[<ProductDetails />]] على طول من غير prefetch:

~~~text curl
<p>Loading...</p>
~~~

~~~text Network
  109ms >> GET /api/products/5      ← المتصفح بيجيب بنفسه بعد الـ hydration
~~~

الـ HTML فيه «Loading...» مكان الاسم، والبيانات بتيجي بطلب زيادة بعد ما الـ JavaScript يشتغل.

---

## الخلاصة

| الخطوة | فين | بتعمل إيه |
|---|---|---|
| [[new QueryClient()]] | السيرفر، لكل request | كاش فاضي للطلب ده |
| [[queryClient.query({ key, queryFn: من الداتابيز })]] | السيرفر | يملا الكاش |
| [[dehydrate]] + [[HydrationBoundary]] | السيرفر ← المتصفح | الكاش يتبعت مع الصفحة |
| [[useQuery]] بنفس الـ key | المتصفح | يلاقيها فورًا، وبعدها refetch و invalidate عادي |

> نفس الـ key بالظبط (رقم مش نص)، و [[staleTime]] أكبر من صفر، و client جديد لكل request على السيرفر.`,
          lines: [
            "الأدوات، و environmentManager يعرف احنا على السيرفر ولا المتصفح.",
            "client بـ staleTime دقيقة، عشان المتصفح ميطلبش اللي السيرفر لسه جايبه.",
            "client المتصفح، واحد بس.",
            "دالة الاختيار:",
            "السيرفر: client جديد لكل طلب، عشان البيانات متتخلطش بين المستخدمين.",
            "المتصفح: اعمله أول مرة بس وبعدين نفس الـ client.",
            "قفلة.",
            "الأدوات في الصفحة.",
            "Server Component، و params بقت Promise في Next الجديد.",
            "اقرا الـ id.",
            "client للطلب ده بس.",
            "هات البيانات من الداتابيز بنفس الـ key اللي الـ client component هيستخدمه، ولو فشل كمّل.",
            "بداية الـ JSX.",
            "ابعت الكاش للمتصفح.",
            "client component بيستخدم useQuery عادي.",
            "قفلة.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`View Source فيه اسم المنتج جوه الـ HTML، لأن الـ client component اترسم على السيرفر (SSR) والكاش كان مليان. في Network وقت أول تحميل مفيش طلب لـ API المنتجات من المتصفح. زرار «حدّث» بيعمل طلب من المتصفح والاسم يتحدث من غير reload.

من غير HydrationBoundary: الـ HTML فيه «Loading» مكان الاسم، والمتصفح بيعمل الطلب بعد الـ hydration. ولو لقيت الطلب بيتعمل في المتصفح رغم الـ boundary، يا إما staleTime صفر، يا إما الـ key مختلف (string و number).`,
          solCode: R`'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function ProductDetails({ id }: { id: number }) {
  const { data, isPending } = useQuery(productQueries.detail(id))
  const queryClient = useQueryClient()
  if (isPending) return <p>Loading...</p>
  return (
    <>
      <h1>{data?.name}</h1>
      <button onClick={() => queryClient.invalidateQueries({ queryKey: productKeys.detail(id) })}>حدّث</button>
    </>
  )
}`
        },
        {
          cmd: "Redux Toolkit",
          title: "اقرا كود Redux الموجود: createSlice و useSelector و dispatch",
          desc: R`كتير من الشركات عندها تطبيقات React كبيرة مكتوبة بـ Redux، ولازم تعرف تقراها وتعدّل فيها. الشكل الحديث هو Redux Toolkit (RTK): [[createSlice]] بيعمل الـ reducer والـ actions مع بعض، و [[configureStore]] بيعمل الـ store، و [[useSelector]] يقرا جزء، و [[useDispatch]] يبعت action.

الفكرة نفسها بتاعة [[useReducer]] (درس المستوى ده): store واحد للتطبيق كله، والتغيير بيحصل بـ action بيعدّي على reducer. ولو لقيت ملفات فيها [[switch (action.type)]] و [[ADD_TODO = 'ADD_TODO']] و [[connect(mapStateToProps)]]، ده Redux القديم، ونفس الفكرة بكلام أكتر.`,
          example: R`import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

type CartItem = { id: string; qty: number }
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as CartItem[] },
  reducers: {
    added(state, action: PayloadAction<string>) {
      const found = state.items.find(i => i.id === action.payload)
      if (found) found.qty++
      else state.items.push({ id: action.payload, qty: 1 })
    },
    cleared(state) { state.items = [] },
  },
})
export const { added, cleared } = cartSlice.actions
export const store = configureStore({ reducer: { cart: cartSlice.reducer } })
type RootState = ReturnType<typeof store.getState>
const useAppSelector = useSelector.withTypes<RootState>()
const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
function CartBadge() {
  const count = useAppSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0))
  const dispatch = useAppDispatch()
  return <button onClick={() => dispatch(cleared())}>Cart ({count})</button>
}
// main.tsx: <Provider store={store}><App /></Provider>  (Provider من react-redux)`,
          try: R`[[npm i @reduxjs/toolkit react-redux]]، ولف App بـ [[<Provider store={store}>]]، واعمل زرار «أضف» بيعمل [[dispatch(added('mug'))]] جنب الـ CartBadge. ركّب إضافة Redux DevTools في المتصفح وشوف كل action بالاسم والـ state قبل وبعد. واكتب [[console.log(added('x'))]] وشوف شكل الـ action.`,
          flag: "script",
          deep: {
            why: R`Redux كان الحل الأشهر للـ state العام من ٢٠١٥ لحد ما hooks و React Query و Zustand انتشروا، فتطبيقات كتير شغالة بيه لحد النهارده، وإعلانات شغل كتير لسه بتطلبه. مش لازم تبدأ بيه مشروع جديد، بس لازم تعرف تقرا slice وتضيف action من غير ما تبوّظ حاجة، وتفهم ليه الكود مكتوب كده.`,
            how: R`الدورة: component بينادي [[dispatch(added('mug'))]]، و [[added('mug')]] بترجّع object [[{ type: 'cart/added', payload: 'mug' }]]. الـ store بيعدّيه على الـ root reducer، اللي بيوديه لـ reducer الـ slice اللي اسمه cart، فيطلّع state جديدة. وكل [[useSelector]] بيتنادى تاني ويقارن نتيجته بالقديمة بـ [[===]]: لو اتغيرت الـ component يعيد الرسم.

جوه [[createSlice]] بتكتب [[found.qty++]] و [[state.items.push]] كأنك بتعدّل في المكان، وده صح هنا بس، لأن RTK بيستخدم Immer: انت بتعدّل «مسودة»، و Immer بيطلّع نسخة جديدة immutable. برا الـ slice (في component أو selector) التعديل ده ممنوع. وممكن ترجّع قيمة جديدة بدل التعديل، بس متعملش الاتنين في نفس الـ reducer.

[[configureStore]] بيضيف لوحده middleware بيكشف لو عدّلت الـ state برا الـ reducer أو حطيت حاجة مش serializable (زي Date أو Promise)، ويوصّل Redux DevTools. و [[useSelector.withTypes<RootState>()]] (react-redux 9) بيعمل hook متعرّف نوعه مرة واحدة بدل ما تكتب النوع في كل component.

الـ selector زي Zustand: [[useSelector(s => s.cart)]] بيعيد الرسم مع أي تغيير في cart، و selector بيرجّع object أو array جديدة كل مرة ([[s => s.items.filter(...)]]) بيعيد الرسم مع كل action في التطبيق كله، وفي التطوير react-redux بيطبع warning لما ده يحصل. الحل [[createSelector]] (memoized) أو ترجّع قيمة بسيطة زي الرقم في المثال.

والشغل الـ async في Redux القديم كان [[createAsyncThunk]] أو redux-saga، وفي RTK الحديث RTK Query (الدرس الجاي).`,
            when: R`مشروع موجود بـ Redux: تعدّل فيه بنفس أسلوبه. في مشروع جديد: بيانات السيرفر بـ React Query أو RTK Query، والـ client state الصغيرة بـ Zustand أو context، و Redux لو الفريق عارفه أو الـ state معقدة جدًا ومحتاج DevTools بـ time travel.`,
            mistakes: R`تعدّل الـ state برا الـ slice ([[const items = useSelector(...); items.push(x)]]). وترجّع قيمة جديدة وتعدّل الـ draft في نفس الـ reducer. و selector بيرجّع array جديدة كل مرة. وتحط بيانات السيرفر (loading و error و data) في slice بإيدك لكل endpoint. و [[useDispatch]] من غير type فالـ thunks تطلع errors في TypeScript. وسؤال انترفيو: «Redux ولا Context؟» context وسيلة توصيل مش state manager، و Redux store خارجي بـ selectors ومش كل consumer بيعيد الرسم مع كل تغيير.`
          },
          teach: R`## الفكرة: store واحد، والتغيير بيحصل بـ action

[[cartSlice]] جزء من الـ store اسمه [[cart]] فيه السلة، وفيه reducer اتنين: [[added]] و [[cleared]]. و [[CartBadge]] بيقرا العدد ويبعت [[cleared]] لما تدوس عليه. اتشغّل في Vite + React 19.3 + Redux Toolkit 2.13 + react-redux 9.3 في Chrome headless، مع زرار «أضف» من الـ solCode، و [[store.subscribe]] بيطبع الـ state بعد كل action.

---

## ١. الـ imports

~~~text cart.ts
import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
~~~

- [[@reduxjs/toolkit]] (RTK): أدوات بناء الـ store. و [[type PayloadAction]] نوع بس، والـ [[type]] قبله بتقول إنه يتشال وقت التشغيل.
- [[react-redux]]: الربط مع React (الـ hooks والـ Provider).
- بيتسطبوا بـ [[npm i @reduxjs/toolkit react-redux]].

## ٢. [[createSlice({...})]]

~~~text cart.ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] as CartItem[] },
  reducers: { ... },
})
~~~

| الخانة | معناها |
|---|---|
| [[name]] | اسم الـ slice، وبيبقى أول جزء في اسم كل action ([[cart/added]]) |
| [[initialState]] | القيمة الأولى. [[[] as CartItem[]]] عشان TypeScript يعرف الـ array الفاضية هتشيل إيه |
| [[reducers]] | كل دالة هنا = reducer + action بنفس الاسم |

**reducer** دالة بتاخد الـ state الحالية والـ action، وتطلّع الـ state الجديدة. نفس فكرة [[useReducer]].

## ٣. [[added]]

~~~text cart.ts
added(state, action: PayloadAction<string>) {
  const found = state.items.find(i => i.id === action.payload)
  if (found) found.qty++
  else state.items.push({ id: action.payload, qty: 1 })
},
~~~

- [[action: PayloadAction<string>]]: الـ action شايل [[payload]] نوعه نص (الـ id). **payload** يعني «الحمولة»، البيانات اللي مع الـ action.
- [[found.qty++]] و [[state.items.push(...)]]: تعديل في المكان! ده ممنوع في React عادي، بس مسموح **جوه createSlice بس**. RTK بيستخدم مكتبة Immer: الـ [[state]] اللي جالك «مسودة» (draft)، وأي تعديل فيها Immer بيسجّله ويطلّع منه object جديد. والنتيجة immutable زي ما Redux عايز.

[[cleared(state) { state.items = [] }]]: نفس الفكرة، فضّي الـ array.

وممكن reducer **يرجّع** state جديدة بدل ما يعدّل، بس مش الاتنين مع بعض. جربنا reducer بيعمل [[push]] وبعدين [[return { items: [] }]]:

~~~text الناتج (tsx)
[Immer] An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.
~~~

## ٤. الـ actions والـ store

~~~text cart.ts
export const { added, cleared } = cartSlice.actions
export const store = configureStore({ reducer: { cart: cartSlice.reducer } })
~~~

- [[cartSlice.actions]]: **action creators** اتعملوا لوحدهم. [[added('x')]] بترجّع object الـ action (تحت).
- [[configureStore]]: بيعمل الـ store. [[reducer: { cart: ... }]] معناه الـ state هيبقى [[{ cart: {...} }]]، وكل slice تحت اسمه. وبيضيف لوحده فحوصات وقت التطوير و Redux DevTools.

## ٥. الأنواع والـ hooks

~~~text cart.ts
type RootState = ReturnType<typeof store.getState>
const useAppSelector = useSelector.withTypes<RootState>()
const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
~~~

من جوه لبرة:

- [[store.getState]]: الدالة اللي بترجّع الـ state.
- [[typeof]]: نوعها.
- [[ReturnType<...>]]: نوع اللي بترجّعه. يعني [[RootState]] = شكل الـ state كلها، مستنتج من الـ store نفسه.
- [[.withTypes<RootState>()]]: نسخة من الـ hook متعرّف نوعها مرة واحدة، فـ [[s]] في أي selector معروف إنه [[RootState]].

## ٦. [[CartBadge]]

~~~text CartBadge.tsx
const count = useAppSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0))
const dispatch = useAppDispatch()
return <button onClick={() => dispatch(cleared())}>Cart ({count})</button>
~~~

- الـ selector بيرجّع **رقم** (مجموع الكميات). react-redux بيقارن بالقديم بـ [[===]]، فالـ component مبيعيدش الرسم غير لما الرقم يتغير.
- [[dispatch(cleared())]]: [[cleared()]] بتعمل الـ action، و [[dispatch]] بتبعته للـ store.

ولازم [[<Provider store={store}>]] (من react-redux) يلف التطبيق، زي ما في الـ solCode.

---

## ٧. اللي حصل لما اتشغّل

~~~text الـ Console والشاشة
[log] {type: cart/added, payload: x}          ← console.log(added('x'))
start: [أضف] [Cart (0)]
>> click أضف
state: {"cart":{"items":[{"id":"mug","qty":1}]}}
[أضف] [Cart (1)]
>> click أضف
state: {"cart":{"items":[{"id":"mug","qty":2}]}}
[أضف] [Cart (2)]
>> click Cart
state: {"cart":{"items":[]}}
[أضف] [Cart (0)]
~~~

- الـ action object عادي: [[type]] = اسم الـ slice + [[/]] + اسم الـ reducer، و [[payload]] = اللي اديته.
- تاني «أضف» لنفس المنتج زوّد [[qty]] لـ ٢ بدل ما يضيف عنصر.
- [[cleared]] رجّع [[items: []]].

### من غير Provider

~~~text الـ Console
[pageerror] could not find react-redux context value; please ensure the component is wrapped in a <Provider>
~~~

### selector بيرجّع array جديدة

~~~text BadSel.tsx
useAppSelector(s => s.cart.items.filter(i => i.qty > 0))
~~~

~~~text الـ Console
[warning] Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.
Selectors that return a new reference (such as an object or an array) should be memoized
~~~

[[filter]] بتعمل array جديدة كل مرة، فـ [[===]] دايمًا false والـ component هيعيد الرسم مع أي action في التطبيق. react-redux بيكشف ده في التطوير (بينادي الـ selector مرتين ويقارن). الحل [[createSelector]] أو selector بيرجّع قيمة بسيطة زي الرقم.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[createSlice]] | reducers + actions، والتعديل جواه مسموح (Immer) |
| [[added('mug')]] | [[{ type: 'cart/added', payload: 'mug' }]] |
| [[configureStore]] | الـ store، كل slice تحت اسمه |
| [[<Provider store>]] | يوصّل الـ store للـ components |
| [[useAppSelector(s => ...)]] | يقرا جزء، ويعيد الرسم لما يتغير |
| [[useAppDispatch()]] + [[dispatch(action)]] | يبعت تغيير |

> الدورة: [[dispatch(action)]] ← الـ reducer يطلّع state جديدة ← كل selector يتنادى ← اللي نتيجته اتغيرت يعيد الرسم.`,
          lines: [
            "أدوات RTK والـ type بتاع الـ action.",
            "hooks الربط مع React.",
            "شكل العنصر.",
            "slice: جزء من الـ store ليه reducer و actions.",
            "اسمه، وبيبقى أول جزء في type الـ action.",
            "القيمة الأولى.",
            "كل reducer هنا بيعمل action بنفس الاسم:",
            "added بياخد id.",
            "دوّر عليه.",
            "موجود؟ زوّد. ده تعديل مسموح هنا بس، Immer بيحوّله لنسخة جديدة.",
            "مش موجود؟ ضيفه.",
            "قفلة added.",
            "cleared: فضّي السلة.",
            "قفلة reducers.",
            "قفلة الـ slice.",
            "الـ action creators اتعملوا لوحدهم.",
            "الـ store: كل slice تحت اسمه.",
            "نوع الـ state كلها من الـ store نفسه.",
            "useSelector متعرّف نوعه مرة واحدة.",
            "و useDispatch كمان.",
            "component بيقرا ويبعت.",
            "selector بيرجّع رقم، فمبيعيدش الرسم غير لما الرقم يتغير.",
            "أداة الإرسال.",
            "الضغطة تبعت cleared.",
            "قفلة."
          ],
          sol: R`[[console.log(added('x'))]] بيطبع [[{ type: 'cart/added', payload: 'x' }]]: الـ type معمول من اسم الـ slice واسم الـ reducer. في Redux DevTools هتشوف كل ضغطة «أضف» كـ [[cart/added]] وتحتها الـ diff في الـ state (qty زادت أو عنصر اتضاف)، و [[cart/cleared]] بيرجّع [[items: []]].

الرقم على الـ badge بيزيد مع كل إضافة لنفس المنتج (qty بتزيد، مش عنصر جديد). لو الرقم مش بيتحدث، غالبًا الـ Provider مش لافف الـ component، ووقتها react-redux بيرمي error واضح إن مفيش store.`,
          solCode: R`import { Provider } from 'react-redux'

function AddButton() {
  const dispatch = useAppDispatch()
  return <button onClick={() => dispatch(added('mug'))}>أضف</button>
}
createRoot(document.getElementById('root')!).render(
  <Provider store={store}><AddButton /><CartBadge /></Provider>
)
console.log(added('x')) // { type: 'cart/added', payload: 'x' }`
        },
        {
          cmd: "RTK Query",
          title: "بيانات السيرفر في مشروع Redux: createApi و tags",
          desc: R`RTK Query هو React Query بتاع Redux: بتعرّف الـ API مرة واحدة بـ [[createApi]] (الـ endpoints، والـ queries، والـ mutations)، وهو بيطلّعلك hooks جاهزة زي [[useGetProductsQuery()]] و [[useAddProductMutation()]] فيها الكاش والـ loading ومنع التكرار.

والـ invalidation بالـ tags: الـ query بتقول [[providesTags: ['Product']]]، والـ mutation بتقول [[invalidatesTags: ['Product']]]، فأي إضافة بتخلي كل query عليها نفس الـ tag تتجاب تاني لوحدها.`,
          example: R`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Product = { id: number; name: string }
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
  tagTypes: ['Product'],
  endpoints: build => ({
    getProducts: build.query<Product[], void>({ query: () => 'products', providesTags: ['Product'] }),
    addProduct: build.mutation<Product, { name: string }>({ query: body => ({ url: 'products', method: 'POST', body }), invalidatesTags: ['Product'] }),
  }),
})
export const { useGetProductsQuery, useAddProductMutation } = api
// في الـ store: reducer: { [api.reducerPath]: api.reducer, cart: ... }
// و middleware: getDefault => getDefault().concat(api.middleware)
function Products() {
  const { data = [], isLoading, error } = useGetProductsQuery()
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation()
  if (isLoading) return <p>Loading...</p>
  if (error) return <p role="alert">Failed to load</p>
  return <><ul>{data.map(p => <li key={p.id}>{p.name}</li>)}</ul><button disabled={isAdding} onClick={() => addProduct({ name: 'Mug' })}>Add</button></>
}`,
          try: R`ضيف الـ api للـ store بتاع الدرس اللي فات (الـ reducer والـ middleware)، وارسم Products مرتين في نفس الصفحة: طلب واحد بس في Network. دوس Add: هتشوف POST وبعده GET للـ list لوحده. بعدين شيل [[invalidatesTags]] ودوس تاني.`,
          flag: "script",
          deep: {
            why: R`في Redux القديم كل endpoint كان محتاج slice فيها [[loading]] و [[error]] و [[data]]، و thunk بيعمل fetch ويبعت ٣ actions، وكاش بإيدك. ده مئات السطور لكل resource. RTK Query بيعمل ده كله، وبيحط الكاش جوه نفس الـ store، فلو المشروع أصلًا Redux، ده أنسب من إنك تضيف React Query جنبه وتبقى عندك مكتبتين للكاش.`,
            how: R`[[createApi]] بيطلّع reducer (فيه الكاش كله تحت [[state.api]]) و middleware (بيدير عمر الطلبات والـ refetch والـ invalidation)، والاتنين لازم يتضافوا للـ store وإلا الـ hooks مش هتشتغل. و [[baseQuery]] هو الـ fetch المشترك: الـ baseUrl، و [[credentials: 'include']] للـ cookies، و [[prepareHeaders]] لو محتاج توكن.

كل endpoint query ليه key من اسمه والـ arguments: [[useGetProductQuery(5)]] و [[useGetProductQuery(6)]] كاشين منفصلين. لما آخر component بيستخدم الـ key يتشال، الكاش بيفضل ٦٠ ثانية افتراضيًا ([[keepUnusedDataFor]]) وبعدين يتمسح، زي gcTime.

الـ tags: [[providesTags: ['Product']]] بتعلّم نتيجة الـ query. لما mutation فيها [[invalidatesTags: ['Product']]] تنجح، كل query معلّمة بالـ tag ده ومعروضة بتتجاب تاني. ولو عايز دقة أكتر: [[providesTags: (result) => [...result.map(p => ({ type: 'Product', id: p.id })), { type: 'Product', id: 'LIST' }]]] وتعمل invalidate لـ id معين بس.

المقارنة مع React Query: نفس الأفكار (كاش، و dedupe، و invalidation)، بس الـ keys هنا متولدة من الـ endpoint، والـ invalidation بالـ tags بدل مطابقة بداية الـ key. [[isLoading]] هنا معناها أول تحميل، و [[isFetching]] أي طلب.

وفي الاختبارات: [[fetchBaseQuery]] بيعمل [[new Request('/api/...')]]، و Node مبيقبلش URL نسبي هناك، فاختبارات Vitest بتقع بـ «Failed to parse URL» حتى مع MSW. الحل baseUrl كامل في الاختبار ([[new URL('/api', location.origin).href]]) أو من env.`,
            when: R`مشروع Redux موجود ومحتاج يجيب بيانات من API. في مشروع جديد من غير Redux، TanStack Query أشهر ومش محتاج store.`,
            mistakes: R`تنسى [[api.middleware]] في الـ store: في التطوير أول hook بيرمي error «Middleware for RTK-Query API at reducerPath "api" has not been added to the store» والصفحة بتقع، ومن غيره الكاش والـ refetch والـ invalidation مبيشتغلوش أصلًا. و tag في invalidates مش مكتوب في [[tagTypes]]. وتنسخ [[data]] في slice تانية «عشان تعدّل فيها». و [[fetchBaseQuery]] مبيرميش على 4xx و 5xx زي fetch، هو بيرجّعها في [[error]]، فمش محتاج [[res.ok]] هنا بس لازم تعرض الـ error.`
          },
          teach: R`## الفكرة: عرّف الـ API مرة، وخد hooks جاهزة

[[createApi]] بتوصف الـ endpoints (هات المنتجات، ضيف منتج)، وبتطلّع لكل واحد hook. الكاش بيتحفظ جوه الـ Redux store نفسه، و [[tags]] بتربط «الإضافة» بـ «القايمة» فالقايمة تتحدث لوحدها.

اتشغّل في Vite + React 19.3 + Redux Toolkit 2.13 في Chrome headless: الـ store بتاع درس Redux Toolkit ومعاه الـ api (الـ solCode)، و [[<Products />]] مرسوم مرتين، و API تجريبي بيرجّع ٤ منتجات بعد ٣٠٠ms. وضفنا middleware صغير بيطبع اسم كل action.

---

## ١. الـ import

~~~text api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
~~~

[[/query/react]] هي النسخة اللي بتطلّع React hooks. ([[/query]] من غير react بتعمل الـ API من غير hooks.) ومفيش حاجة تتسطب زيادة: جوه [[@reduxjs/toolkit]].

## ٢. [[createApi({...})]]

~~~text api.ts
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
  tagTypes: ['Product'],
  endpoints: build => ({ ... }),
})
~~~

| الخانة | معناها |
|---|---|
| [[reducerPath]] | اسم الجزء اللي الكاش هيتحفظ فيه في الـ store: [[state.api]] |
| [[baseQuery]] | الدالة اللي كل الطلبات بتعدّي عليها |
| [[fetchBaseQuery({ baseUrl })]] | [[fetch]] جاهز: بيلزق [[/api]] قبل أي مسار، ويحوّل الـ JSON، ويرجّع 4xx و 5xx في [[error]] |
| [[credentials: 'include']] | ابعت الـ cookies مع الطلب (للـ login) |
| [[tagTypes]] | أسماء الـ tags المسموحة، عشان TypeScript يمسك الغلط في الاسم |
| [[endpoints]] | دالة بتاخد [[build]] وترجّع object، كل خانة فيه endpoint |

## ٣. الـ endpoints

~~~text api.ts
getProducts: build.query<Product[], void>({ query: () => 'products', providesTags: ['Product'] }),
~~~

- [[build.query]]: endpoint بيقرا (GET).
- [[<Product[], void>]]: النوع الأول اللي بيرجع، والتاني الـ argument اللي الـ hook بياخده. [[void]] = مفيش.
- [[query: () => 'products']]: المسار، فالطلب [[/api/products]].
- [[providesTags: ['Product']]]: «نتيجتي معلّمة بـ Product».

~~~text api.ts
addProduct: build.mutation<Product, { name: string }>({ query: body => ({ url: 'products', method: 'POST', body }), invalidatesTags: ['Product'] }),
~~~

- [[build.mutation]]: endpoint بيغيّر.
- [[query: body => ({ url, method, body })]]: بياخد الـ argument ويرجّع وصف الطلب. [[body]] بيتحوّل JSON لوحده.
- [[invalidatesTags: ['Product']]]: «لما أنجح، أي query معلّمة بـ Product تبقى قديمة».

## ٤. الـ hooks

~~~text api.ts
export const { useGetProductsQuery, useAddProductMutation } = api
~~~

اتعملوا لوحدهم من الأسماء: [[getProducts]] بقت [[use]] + [[GetProducts]] + [[Query]]، و [[addProduct]] بقت [[useAddProductMutation]].

## ٥. الـ store (الـ solCode)

~~~text store.ts
export const store = configureStore({
  reducer: { cart: cartSlice.reducer, [api.reducerPath]: api.reducer },
  middleware: getDefault => getDefault().concat(api.middleware),
})
~~~

- [[[api.reducerPath]: api.reducer]]: الأقواس المربعة حوالين اسم الخانة معناها «اسمها قيمة المتغير ده»، يعني [[api: api.reducer]].
- [[middleware]]: دالة بتاخد [[getDefault]] (اللي بيرجّع الـ middlewares الافتراضية) وترجّع array. [[.concat(api.middleware)]] بتضيف بتاع RTK Query في الآخر. هو اللي بيدير الطلبات والـ refetch والـ invalidation.

## ٦. [[Products]]

~~~text Products.tsx
const { data = [], isLoading, error } = useGetProductsQuery()
const [addProduct, { isLoading: isAdding }] = useAddProductMutation()
~~~

- [[data = []]]: قيمة افتراضية وقت الـ destructuring، لو [[data]] undefined تبقى array فاضية، فـ [[data.map]] متقعش.
- [[isLoading]] هنا: أول تحميل بس.
- الـ mutation hook بيرجّع **array**: الأولى دالة الإرسال، والتانية object الحالة. و [[{ isLoading: isAdding }]] بيفك [[isLoading]] ويسميها [[isAdding]] عشان متتعارضش مع اللي فوق.

---

## ٧. اللي حصل لما اتشغّل

~~~text Network والـ actions
  249ms action: api/config/middlewareRegistered
  259ms action: api/executeQuery/pending
  265ms >> GET /api/products
  581ms action: api/executeQuery/fulfilled
 1147ms الشاشة: Mug Pen Lamp Desk [Add]   Mug Pen Lamp Desk [Add]
 1187ms >> click Add
 1216ms action: api/executeMutation/pending
 1220ms >> POST /api/products
 1522ms action: api/executeMutation/fulfilled
 1523ms action: api/executeQuery/pending
 1523ms >> GET /api/products
 1837ms action: api/executeQuery/fulfilled
 2235ms الشاشة: Mug Pen Lamp Desk Mug [Add]   (الاتنين)
~~~

~~~text Object.keys(store.getState().api.queries)
getProducts(undefined)
~~~

- **اتنين components وطلب واحد**: الاتنين نفس الـ endpoint ونفس الـ argument، فنفس الكاش. والـ key متولد من الاسم والـ argument: [[getProducts(undefined)]].
- **Add**: POST، وفي نفس الملي ثانية اللي نجح فيها GET جديد لوحده بسبب الـ tag، والقايمتين اتحدثوا.
- كل خطوة action عادي في Redux ([[pending]] ثم [[fulfilled]])، فـ Redux DevTools بيوريها.

### من غير [[invalidatesTags]]

~~~text Network
 1202ms >> POST /api/products
 1514ms << 201 POST
                       (ولا GET)
 2210ms الشاشة: Mug Pen Lamp Desk     ← المنتج الجديد مش ظاهر
~~~

### من غير [[api.middleware]]

~~~text الـ Console
[pageerror] Warning: Middleware for RTK-Query API at reducerPath "api" has not been added to the store.
    You must add the middleware for RTK-Query to function correctly!
~~~

في التطوير الـ hook بيرمي ده كـ error والصفحة بتفضى.

---

## الخلاصة

| TanStack Query | RTK Query |
|---|---|
| [[useQuery({ queryKey, queryFn })]] في أي مكان | endpoints متعرّفة مرة في [[createApi]] |
| الـ key بإيدك | الـ key من اسم الـ endpoint والـ argument |
| [[invalidateQueries]] بالبداية | [[providesTags]] و [[invalidatesTags]] |
| كاش في [[QueryClient]] | كاش جوه الـ Redux store ([[state.api]]) |
| [[isPending]] = مفيش data | [[isLoading]] = أول تحميل |

> اتنين لازم يتضافوا للـ store: [[api.reducer]] تحت [[reducerPath]]، و [[api.middleware]].`,
          lines: [
            "createApi والـ fetch المشترك (نسخة react فيها الـ hooks).",
            "شكل المنتج.",
            "تعريف الـ API:",
            "اسم الجزء بتاعه في الـ store.",
            "كل الطلبات بتبدأ بـ /api وبتبعت الـ cookies.",
            "الـ tags المسموحة.",
            "الـ endpoints:",
            "GET /api/products، والنتيجة معلّمة بـ Product.",
            "POST /api/products، ولما ينجح كل حاجة معلّمة بـ Product تتجاب تاني.",
            "قفلة الـ endpoints.",
            "قفلة createApi.",
            "hooks اتعملت لوحدها من أسماء الـ endpoints.",
            "component.",
            "القراية: data بـ default فاضي، والتحميل، والخطأ.",
            "الـ mutation: دالة الإرسال وحالتها.",
            "أول تحميل.",
            "خطأ.",
            "القايمة وزرار الإضافة.",
            "قفلة."
          ],
          sol: R`Products مرتين: طلب GET واحد. Add: [[POST /api/products]] وبعده [[GET /api/products]] لوحده، والـ list بتتحدث. من غير [[invalidatesTags]]: الـ POST بيحصل والـ list متتحدثش لحد ما تعمل refresh.

في Redux DevTools هتلاقي actions زي [[api/executeQuery/pending]] و [[api/executeQuery/fulfilled]] و [[api/executeMutation/fulfilled]]، والكاش ظاهر تحت [[api.queries]]. لو الـ hooks بترمي error أو مبتعملش refetch، راجع إن الـ reducer والـ middleware الاتنين في الـ store.`,
          solCode: R`import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'

export const store = configureStore({
  reducer: { cart: cartSlice.reducer, [api.reducerPath]: api.reducer },
  middleware: getDefault => getDefault().concat(api.middleware),
})
// <Provider store={store}><Products /><Products /></Provider>`
        }
      ]
    }
]);

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
    }
]);

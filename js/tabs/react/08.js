// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
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

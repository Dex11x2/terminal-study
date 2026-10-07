// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
    {
      t: "مكتبات الـ dashboard",
      l: 3,
      n: "جداول بترتيب وفلترة من السيرفر، و charts بتدعم RTL، وتحديثات لحظية في الكاش، و Storybook لمكتبة الـ components",
      items: [
        {
          cmd: "TanStack Table",
          title: "جدول بـ sort و filter و pagination من السيرفر (TanStack Table v9)",
          desc: R`TanStack Table مكتبة headless: مبترسمش أي HTML، بتدّيك الصفوف والأعمدة والـ state (الترتيب والفلتر والصفحة) وانت ترسم [[<table>]] بالشكل اللي عايزه، ومع shadcn بتحطهم في [[<Table>]] و [[<TableRow>]] بتوعه. ولما البيانات كبيرة، الترتيب والفلترة والتقسيم بيحصلوا على السيرفر: [[manualSorting]] و [[manualPagination]] و [[manualFiltering]] بيقولوا للجدول «متعملش حاجة بنفسك»، والـ state بتروح في الـ key بتاع React Query.

v9 (نزلت ٢٠٢٦) غيّرت الـ API: [[useTable]] بدل [[useReactTable]]، والـ features بتتسجّل صريحة بـ [[tableFeatures({...})]]، و [[<table.FlexRender>]] للرسم. أغلب الكود الموجود (ومنه أمثلة shadcn القديمة) v8، فخد بالك من الفرق في آخر الدرس.`,
          example: R`import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createColumnHelper, rowSortingFeature, rowPaginationFeature, columnFilteringFeature, tableFeatures, useTable, type SortingState, type PaginationState, type ColumnFiltersState } from '@tanstack/react-table'

type Order = { id: string; customer: string; total: number; status: 'paid' | 'pending' }
const features = tableFeatures({ rowSortingFeature, rowPaginationFeature, columnFilteringFeature })
const col = createColumnHelper<typeof features, Order>()
const columns = col.columns([
  col.accessor('customer', { header: 'Customer' }),
  col.accessor('total', { header: 'Total', cell: info => info.getValue().toLocaleString('ar-EG') }),
  col.accessor('status', { header: 'Status', enableSorting: false }),
])
const EMPTY: Order[] = []
export function OrdersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 20 })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const toFirstPage = () => setPagination(p => ({ ...p, pageIndex: 0 }))
  const query = useQuery({ queryKey: ['orders', { pagination, sorting, columnFilters }], queryFn: () => fetchOrders(pagination, sorting, columnFilters), placeholderData: keepPreviousData })
  const table = useTable({
    features, columns,
    data: query.data?.rows ?? EMPTY,
    rowCount: query.data?.rowCount,
    state: { sorting, pagination, columnFilters },
    onSortingChange: updater => { setSorting(updater); toFirstPage() },
    onPaginationChange: setPagination,
    onColumnFiltersChange: updater => { setColumnFilters(updater); toFirstPage() },
    manualSorting: true, manualPagination: true, manualFiltering: true,
  })
  return (
    <>
      <input aria-label="Filter customer" value={(table.getColumn('customer')?.getFilterValue() as string) ?? ''} onChange={e => table.getColumn('customer')?.setFilterValue(e.target.value)} />
      <table>
        <thead>{table.getHeaderGroups().map(g => <tr key={g.id}>{g.headers.map(h => <th key={h.id}><button onClick={h.column.getToggleSortingHandler()} disabled={!h.column.getCanSort()}><table.FlexRender header={h} /></button></th>)}</tr>)}</thead>
        <tbody>{table.getRowModel().rows.map(row => <tr key={row.id}>{row.getAllCells().map(cell => <td key={cell.id}><table.FlexRender cell={cell} /></td>)}</tr>)}</tbody>
      </table>
      <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>
      <span>Page {pagination.pageIndex + 1} of {table.getPageCount()}</span>
      <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
    </>
  )
}`,
          try: R`[[npm i @tanstack/react-table]]، واكتب [[fetchOrders]] يبني [[?page=1&size=20&sort=total:desc&customer=a]] ويرجّع [[{ rows, rowCount }]]، واعمل handler في MSW. دوس Next، وبعدين عنوان Total، وبعدين اكتب في الفلتر، وتابع الطلبات في Network ورقم الصفحة. وضيف [[aria-sort]] على الـ [[<th>]].`,
          flag: "script",
          deep: {
            why: R`لوحات الأدمن كلها جداول: طلبات، ومستخدمين، ومنتجات، بآلاف الصفوف. الترتيب والفلترة والـ pagination بإيدك معناهم state كتير و bugs (الصفحة مبترجعش لـ 1 مع فلتر جديد، والترتيب على الصفحة الحالية بس). المكتبة بتدير الـ state والمنطق، وانت بتتحكم في الشكل بالكامل.`,
            how: R`الـ features: v9 مبتضمّنش كل حاجة افتراضيًا (عشان الحجم)، فبتسجّل اللي محتاجه. من غير [[rowSortingFeature]]، [[getToggleSortingHandler]] مش موجودة أصلًا. ولو الترتيب على الفرونت (بيانات قليلة)، بتسجّل كمان [[sortedRowModel: createSortedRowModel()]]. هنا مش محتاجينه لأن [[manualSorting]].

الـ state: كل slice (sorting و pagination و columnFilters) في [[useState]]، وبتتبعت في [[state]] ومعاها [[on*Change]]. الـ callback بياخد updater (قيمة أو دالة)، و setState بتاعة React بتقبل الاتنين. والـ state نفسها في الـ queryKey، فأي تغيير بيعمل طلب جديد، و [[keepPreviousData]] بيسيب الصفحة القديمة ظاهرة لحد ما الجديدة توصل بدل ما الجدول يفضى.

الـ manual: [[manualPagination]] معناها «الـ data اللي جاية دي الصفحة الحالية بالفعل»، و [[rowCount]] بيقوله العدد الكلي عشان [[getPageCount()]] و [[getCanNextPage()]] يتحسبوا. ومع manual، الجدول مبيرجّعش الصفحة لـ 0 لوحده لما الترتيب أو الفلتر يتغير، عشان كده [[toFirstPage()]] في الـ callbacks (من غيرها: تبقى في صفحة ٢ وتفلتر فتشوف صفحة ٢ من النتايج الجديدة).

الترتيب: أول دوسة على عمود رقمي بتبقى desc (TanStack بيبدأ الأرقام من الأكبر)، والنصوص asc. و [[enableSorting: false]] للأعمدة اللي مبتترتبش.

v8 مقابل v9: في v8 كنت تكتب [[useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() })]] و [[flexRender(header.column.columnDef.header, header.getContext())]] و [[createColumnHelper<Order>()]]. في v9 [[useTable({ features, columns, data })]] و [[<table.FlexRender header={h} />]] و [[createColumnHelper<typeof features, Order>()]]، والـ core row model تلقائي. وفيه [[useLegacyTable]] في [[@tanstack/react-table/legacy]] كجسر مؤقت للنقل.

والـ data و columns و features لازم مراجعهم ثابتة (برا الـ component أو من الـ query)، و [[EMPTY]] ثابتة لنفس السبب: [[?? []]] جوه الـ render بيعمل array جديدة كل مرة والجدول يعيد حساب كل حاجة.`,
            when: R`أي جدول فيه أكتر من كام صف وفيه ترتيب أو فلترة أو اختيار صفوف. من السيرفر لما البيانات أكتر من اللي ينفع يتحمّل مرة واحدة (آلاف)، ومن الفرونت لما تبقى مئات. ولو محتاج Excel كامل (تعديل خلايا، و grouping ضخم)، AG Grid.`,
            mistakes: R`[[manualPagination]] من غير [[rowCount]] فعدد الصفحات غلط. والـ state مش في الـ queryKey فالجدول بيتغير والبيانات لأ. وتنسى ترجع لصفحة 1 مع فلتر جديد. وتنسخ [[query.data.rows]] في useState. و [[data: query.data?.rows ?? []]] جوه الـ render. والفلتر بيعمل طلب مع كل حرف: debounce قيمة الفلتر (زي درس custom hook) قبل ما تحطها في الـ state. ونسخ مثال v8 من النت في مشروع v9 (أو العكس) وتستغرب إن [[getCoreRowModel]] مش موجودة.`
          },
          teach: R`## الفكرة: الجدول بيرسم، والسيرفر بيرتّب ويقسّم ويفلتر

[[OrdersTable]] جدول طلبات فيه ٣ حاجات بيتحكم فيها المستخدم: الترتيب (دوسة على عنوان عمود)، والفلتر (خانة اسم العميل)، والصفحة (Previous و Next). التلت حاجات دول state عندنا، وبتتبعت للسيرفر في الـ URL، والسيرفر بيرجّع ٢٠ صف بس ومعاهم العدد الكلي. TanStack Table هنا شغلته يدير الـ state ويحسب «فيه صفحة جاية؟» و «العمود ده بيترتب؟»، ويسيبلك الـ HTML.

اتشغّل في Vite 8.3 + React 19.3 + TanStack Table 9.2.6 + React Query 5.104 في Chrome headless (بـ Playwright)، والسيرفر fetch مزيف فيه ٤٥ طلب وبيسجّل كل URL بيوصله.

---

## ١. الـ imports

~~~text OrdersTable.tsx
import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
~~~

- [[useState]] للـ state بتاعة الجدول.
- [[useQuery]] بيجيب البيانات ويكيّشها (درس useQuery). و [[keepPreviousData]] دالة جاهزة بنستخدمها تحت عشان الجدول ميفضاش وهو بيجيب الصفحة الجديدة.

~~~text OrdersTable.tsx
import { createColumnHelper, rowSortingFeature, rowPaginationFeature, columnFilteringFeature, tableFeatures, useTable, type SortingState, type PaginationState, type ColumnFiltersState } from '@tanstack/react-table'
~~~

| الاسم | هو إيه |
|---|---|
| [[useTable]] | الـ hook اللي بيعمل الجدول (اسمه في v8 كان [[useReactTable]]) |
| [[tableFeatures]] | بتجمع الـ features اللي هتسجّلها |
| [[rowSortingFeature]] و [[rowPaginationFeature]] و [[columnFilteringFeature]] | الترتيب والصفحات والفلترة. v9 مبيحطش أي feature لوحده عشان الـ bundle يفضل صغير |
| [[createColumnHelper]] | بيساعدك تعرّف الأعمدة بأنواع TypeScript صح |
| [[type SortingState]] وأخواتها | أنواع بس. كلمة [[type]] جوه الـ import معناها «ده نوع، امسحه من الـ JavaScript النهائي» |

---

## ٢. شكل الصف والأعمدة (برا الـ component)

~~~text OrdersTable.tsx
type Order = { id: string; customer: string; total: number; status: 'paid' | 'pending' }
~~~

كل طلب جاي من السيرفر شكله كده. [[status: 'paid' | 'pending']] معناها الحالة واحدة من الكلمتين دول بس (union type).

~~~text OrdersTable.tsx
const features = tableFeatures({ rowSortingFeature, rowPaginationFeature, columnFilteringFeature })
const col = createColumnHelper<typeof features, Order>()
~~~

- [[features]]: object فيه التلت features. [[{ rowSortingFeature, ... }]] اختصار لـ [[{ rowSortingFeature: rowSortingFeature, ... }]].
- [[typeof features]]: «نوع المتغير ده». الـ helper محتاج يعرف الـ features عشان TypeScript يعرف إن [[enableSorting]] مثلًا موجودة (لأن الترتيب متسجّل)، ومحتاج [[Order]] عشان يعرف أسماء الخانات.

~~~text OrdersTable.tsx
const columns = col.columns([
  col.accessor('customer', { header: 'Customer' }),
  col.accessor('total', { header: 'Total', cell: info => info.getValue().toLocaleString('ar-EG') }),
  col.accessor('status', { header: 'Status', enableSorting: false }),
])
~~~

- [[col.accessor('customer', ...)]]: عمود بيقرا الخانة [[customer]] من كل صف. ولو كتبت اسم مش موجود في [[Order]] (زي [['name']]) TypeScript بيرفض. واسم الخانة بيبقى الـ [[id]] بتاع العمود، وده اللي هيروح للسيرفر في الترتيب والفلتر.
- [[header]]: النص اللي في رأس العمود.
- [[cell]]: دالة بترسم الخلية. [[info.getValue()]] بترجّع قيمة الخانة ([[number]] هنا)، و [[toLocaleString('ar-EG')]] بتكتبها بأرقام عربي وفاصل آلاف. من التشغيل: [[1000]] طلعت «١٬٠٠٠» و [[8919]] طلعت «٨٬٩١٩».
- [[enableSorting: false]]: العمود ده مش بيترتب، فالزرار بتاعه هيبقى disabled.

~~~text OrdersTable.tsx
const EMPTY: Order[] = []
~~~

array فاضية **ثابتة** للوقت اللي مفيش فيه بيانات. ليه مش [[[]]] جوه الـ render؟ لأن [[[]]] بتعمل array جديدة كل render، والجدول بيقارن بالمرجع، فيفتكر إن الـ data اتغيرت ويعيد حساب كل حاجة. ونفس السبب الأعمدة والـ features برا الـ component.

---

## ٣. الـ state

~~~text OrdersTable.tsx
const [sorting, setSorting] = useState<SortingState>([])
const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 20 })
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
~~~

| الـ state | شكلها | مثال بعد ما المستخدم يعمل حاجة |
|---|---|---|
| [[sorting]] | array من [[{ id, desc }]] | [[[{ id: 'total', desc: true }]]] |
| [[pagination]] | [[{ pageIndex, pageSize }]] | [[{ pageIndex: 1, pageSize: 20 }]] يعني الصفحة التانية |
| [[columnFilters]] | array من [[{ id, value }]] | [[[{ id: 'customer', value: 'a' }]]] |

[[pageIndex]] بيبدأ من [[0]] (index = رقم الترتيب من صفر)، عشان كده تحت بنكتب [[pageIndex + 1]] للمستخدم وللسيرفر.

~~~text OrdersTable.tsx
const toFirstPage = () => setPagination(p => ({ ...p, pageIndex: 0 }))
~~~

دالة بترجّع لأول صفحة. [[p => ...]] updater بياخد الـ pagination الحالية، و [[{ ...p, pageIndex: 0 }]] object جديد فيه كل خانات [[p]] (الـ [[...]] اسمه spread) بس [[pageIndex]] بقت 0. يعني [[pageSize]] تفضل زي ما هي.

---

## ٤. الطلب

~~~text OrdersTable.tsx
const query = useQuery({ queryKey: ['orders', { pagination, sorting, columnFilters }], queryFn: () => fetchOrders(pagination, sorting, columnFilters), placeholderData: keepPreviousData })
~~~

- [[queryKey]]: اسم الكاش. حطينا فيه التلت states، فأي تغيير في الصفحة أو الترتيب أو الفلتر يبقى key جديد، يعني React Query يعمل طلب جديد لوحده. ولو رجعت لصفحة شفتها قبل كده، بتيجي من الكاش.
- [[queryFn]]: الدالة اللي بتجيب (تحت في الـ solCode).
- [[placeholderData: keepPreviousData]]: وقت ما الـ key الجديد لسه بيتحمّل، اعرض بيانات الـ key اللي فات. من غيرها الجدول يفضى لحظة مع كل دوسة Next.

---

## ٥. [[useTable]]: ربط كل ده بالجدول

~~~text OrdersTable.tsx
const table = useTable({
  features, columns,
  data: query.data?.rows ?? EMPTY,
  rowCount: query.data?.rowCount,
~~~

- [[features, columns]]: اختصار [[features: features, columns: columns]].
- [[query.data?.rows]]: [[?.]] (optional chaining) معناها «لو [[query.data]] لسه [[undefined]] (أول تحميل) متقعش، رجّع [[undefined]]». و [[?? EMPTY]] معناها «لو اللي على الشمال [[undefined]] أو [[null]] خد [[EMPTY]]».
- [[rowCount]]: العدد الكلي اللي على السيرفر (٤٥ هنا). الجدول مش شايف غير ٢٠ صف، فمن غير الرقم ده ميعرفش يحسب عدد الصفحات.

~~~text OrdersTable.tsx
  state: { sorting, pagination, columnFilters },
  onSortingChange: updater => { setSorting(updater); toFirstPage() },
  onPaginationChange: setPagination,
  onColumnFiltersChange: updater => { setColumnFilters(updater); toFirstPage() },
~~~

ده اسمه **controlled state**: الجدول مش بيمسك الـ state لنفسه، بيقراها من [[state]]، ولما المستخدم يدوس حاجة بينادي [[on...Change]] وانت اللي بتحدّث.

- [[updater]]: الجدول بيبعت يا إما القيمة الجديدة، يا إما دالة بتحسبها من القديمة. و [[setSorting]] بتاعة React بتقبل الشكلين، فبنباصيه زي ما هو.
- مع الترتيب والفلتر بننادي [[toFirstPage()]] كمان. ليه؟ لو انت في صفحة ٢ وغيرت الترتيب، المفروض تشوف أول النتايج الجديدة مش صفحة ٢ منها.
- [[onPaginationChange: setPagination]]: هنا مفيش حاجة زيادة، فبنباصي [[setPagination]] على طول.

~~~text OrdersTable.tsx
  manualSorting: true, manualPagination: true, manualFiltering: true,
})
~~~

[[manual]] معناها «متعملهاش انت». من غيرها الجدول هيرتّب ويقسّم ويفلتر الـ ٢٠ صف اللي معاه، وده غلط لأنهم صفحة واحدة من ٤٥. مع [[manual]] بيعتبر [[data]] هي النتيجة النهائية ويرسمها زي ما هي.

---

## ٦. الـ JSX

### خانة الفلتر

~~~text OrdersTable.tsx
<input aria-label="Filter customer" value={(table.getColumn('customer')?.getFilterValue() as string) ?? ''} onChange={e => table.getColumn('customer')?.setFilterValue(e.target.value)} />
~~~

من جوه لبرة:

1. [[table.getColumn('customer')]]: هات عمود العميل. ممكن يرجّع [[undefined]] لو الاسم غلط، عشان كده [[?.]].
2. [[.getFilterValue()]]: قيمة الفلتر الحالية من [[columnFilters]]. نوعها [[unknown]] (الجدول ميعرفش انت حاطط إيه)، فـ [[as string]] بتقول لـ TypeScript «أنا عارف إنها نص».
3. [[?? '']]: لو مفيش فلتر، الخانة فاضية مش [[undefined]] (عشان الخانة تفضل controlled).
4. [[setFilterValue(e.target.value)]]: مع كل حرف، الجدول بيحسب الـ [[columnFilters]] الجديدة وينادي [[onColumnFiltersChange]].
5. [[aria-label]]: اسم الخانة لقارئ الشاشة، لأن مفيش [[<label>]].

### الـ headers

~~~text OrdersTable.tsx
<thead>{table.getHeaderGroups().map(g => <tr key={g.id}>{g.headers.map(h => <th key={h.id}><button onClick={h.column.getToggleSortingHandler()} disabled={!h.column.getCanSort()}><table.FlexRender header={h} /></button></th>)}</tr>)}</thead>
~~~

- [[getHeaderGroups()]]: صفوف الـ headers. هنا صف واحد، بس لو فيه أعمدة متجمعة تحت عنوان واحد بيبقوا أكتر. كل صف [[<tr>]]، وكل [[h]] جواه [[<th>]].
- [[h.column.getToggleSortingHandler()]]: بيرجّع دالة جاهزة للـ [[onClick]] بتقلب الترتيب: مفيش، وبعدين اتجاه، وبعدين العكس، وبعدين مفيش تاني.
- [[!h.column.getCanSort()]]: [[!]] يعني «عكس». العمود اللي مبيترتبش ([[status]]) الزرار بتاعه disabled.
- [[<table.FlexRender header={h} />]]: بيرسم الـ [[header]] اللي كتبته في الأعمدة، سواء نص أو دالة بترجّع JSX.

### الصفوف

~~~text OrdersTable.tsx
<tbody>{table.getRowModel().rows.map(row => <tr key={row.id}>{row.getAllCells().map(cell => <td key={cell.id}><table.FlexRender cell={cell} /></td>)}</tr>)}</tbody>
~~~

[[getRowModel().rows]] الصفوف النهائية اللي هتترسم (مع [[manual]] هي نفس [[data]]). و [[row.getAllCells()]] خلية لكل عمود، و [[FlexRender cell]] بينادي الـ [[cell]] اللي في تعريف العمود (عشان كده Total طالع بالعربي).

### الصفحات

~~~text OrdersTable.tsx
<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</button>
<span>Page {pagination.pageIndex + 1} of {table.getPageCount()}</span>
<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
~~~

- [[previousPage()]] و [[nextPage()]] بيغيّروا [[pageIndex]] عن طريق [[onPaginationChange]].
- [[getPageCount()]]: [[Math.ceil(rowCount / pageSize)]]، يعني ٤٥ ÷ ٢٠ = ٢.٢٥ وبتتقرّب لفوق: ٣ صفحات. ([[Math.ceil]] = تقريب لفوق.)
- [[getCanNextPage()]]: «فيه صفحة بعد دي؟» محسوبة من نفس الرقم.

---

## ٧. الـ solCode: [[fetchOrders]]

~~~text OrdersTable.tsx
async function fetchOrders(p: PaginationState, s: SortingState, f: ColumnFiltersState): Promise<{ rows: Order[]; rowCount: number }> {
  const params = new URLSearchParams({ page: String(p.pageIndex + 1), size: String(p.pageSize) })
~~~

- [[async]] و [[Promise<...>]]: الدالة بترجّع promise هتبقى [[{ rows, rowCount }]].
- [[URLSearchParams]]: object بيبني الجزء اللي بعد [[?]] في الـ URL ويعمل encoding للحروف الخاصة. [[String(...)]] لأن القيم لازم تبقى نصوص. والـ [[+ 1]] عشان السيرفر بيعد الصفحات من 1.

~~~text OrdersTable.tsx
  if (s[0]) params.set('sort', $__bt$__{s[0].id}:$__{s[0].desc ? 'desc' : 'asc'}$__bt)
  for (const filter of f) params.set(filter.id, String(filter.value))
~~~

- [[s[0]]]: أول (ووحيد) ترتيب. لو الـ array فاضية بيبقى [[undefined]] والـ [[if]] متدخلش.
- الـ template string بتعمل [[total:desc]]. و [[? :]] هو الـ ternary: لو [[desc]] true اكتب [[desc]]، وإلا [[asc]].
- [[for (const filter of f)]]: لف على كل فلتر وحطه باسم العمود: [[customer=a]].

~~~text OrdersTable.tsx
  const res = await fetch($__bt/api/orders?$__{params}$__bt)
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt)
  return res.json()
}
~~~

[[$__{params}]] بتنادي [[params.toString()]] لوحدها. و [[res.ok]] بتبقى [[false]] لو الـ status مش 2xx، فبنرمي error عشان React Query يعرف إن الطلب فشل (fetch نفسه مبيرميش error على 404 أو 500).

---

## ٨. التشغيل: الطلبات اللي وصلت للسيرفر بالترتيب

| اللي عملناه | الـ URL اللي اتبعت | اللي ظهر |
|---|---|---|
| فتح الصفحة | [[/api/orders?page=1&size=20]] | «Page 1 of 3»، و Previous مقفول، و Status مقفول |
| Next | [[/api/orders?page=2&size=20]] | «Page 2 of 3» |
| دوسة على Total | [[/api/orders?page=1&size=20&sort=total%3Adesc]] | رجع لصفحة 1، وأول صف «٤٩٬٤٣٦» (الأكبر) |
| دوسة تانية على Total | [[...&sort=total%3Aasc]] | الأصغر الأول «١٬٠٠٠» |
| Next | [[/api/orders?page=2&size=20&sort=total%3Aasc]] | «Page 2 of 3» |
| كتبنا [[a]] في الفلتر | [[/api/orders?page=1&size=20&sort=total%3Aasc&customer=a]] | رجع لصفحة 1، و «Page 1 of 2» |
| كتبنا [[al]] | [[...&customer=al]] | «Page 1 of 1» و ٥ صفوف |

حاجات تلاحظها:

- [[%3A]] هي الـ [[:]] بعد الـ encoding بتاع [[URLSearchParams]]. السيرفر لما يقرا الـ param بيرجّعها [[total:desc]].
- أول دوسة على Total (رقم) طلعت [[desc]]، وأول دوسة على Customer (نص) طلعت [[asc]]: TanStack بيبدأ الأرقام من الأكبر والنصوص من الأول.
- الترتيب والفلتر رجّعوا الصفحة لـ 1 بسبب [[toFirstPage()]].
- كل حرف في الفلتر عمل طلب. في التطبيق الحقيقي اعمل debounce للقيمة.

وبعد ما ضفنا الـ [[aria-sort]] من الـ try على الـ [[<th>]]، الـ headers بعد الدوسة الأولى كانت:

~~~text الناتج (Chrome)
["Customer", "Total[descending]", "Status(disabled)"]
~~~

وفي الـ Console وقت الفلترة (dev بس) طلع تحذير:

~~~text الـ Console
filterFn 'includesString' (auto) for column 'customer' is not registered
~~~

ده لأن [[setFilterValue]] بيدوّر على دالة الفلترة الافتراضية للنصوص، واحنا مسجّلناش دوال فلترة على الفرونت لأن السيرفر هو اللي بيفلتر. مع [[manualFiltering]] ملوش أي تأثير على النتيجة، ومبيظهرش في الـ production build.

---

## v8 مقابل v9

| | v8 (أغلب الأمثلة على النت) | v9 (الدرس ده) |
|---|---|---|
| الـ hook | [[useReactTable]] | [[useTable]] |
| الـ features | كلها موجودة | بتسجّلها بـ [[tableFeatures]] |
| الـ row model الأساسي | [[getCoreRowModel: getCoreRowModel()]] لازم | تلقائي |
| الرسم | [[flexRender(h.column.columnDef.header, h.getContext())]] | [[<table.FlexRender header={h} />]] |
| الـ helper | [[createColumnHelper<Order>()]] | [[createColumnHelper<typeof features, Order>()]] |

وللنقل بالتدريج فيه [[useLegacyTable]] من [[@tanstack/react-table/legacy]].

---

## الخلاصة

| الحتة | دورها |
|---|---|
| ٣ [[useState]] | الترتيب والصفحة والفلتر عندك انت (controlled) |
| الـ state في الـ [[queryKey]] | أي تغيير = طلب جديد |
| [[keepPreviousData]] | الجدول ميفضاش بين الصفحات |
| [[manual...: true]] + [[rowCount]] | السيرفر بيعمل الشغل، والجدول بيحسب عدد الصفحات من العدد الكلي |
| [[toFirstPage()]] | ترتيب أو فلتر جديد يرجّعك لأول صفحة |
| [[EMPTY]] والأعمدة برا الـ component | مراجع ثابتة، فمفيش حساب على الفاضي |`,
          lines: [
            "state الجدول.",
            "React Query، و keepPreviousData.",
            "v9: الـ helper، والـ features اللي هنسجّلها، و useTable، وأنواع الـ state.",
            "شكل الصف.",
            "سجّل الترتيب والصفحات والفلترة بس.",
            "helper بيعرف الـ features ونوع الصف.",
            "الأعمدة، برا الـ component عشان مرجعها ثابت:",
            "العميل.",
            "الإجمالي، ومتنسّق بالأرقام العربي.",
            "الحالة، ومش بتترتب.",
            "قفلة.",
            "array فاضية ثابتة وقت ما مفيش بيانات.",
            "الجدول.",
            "الترتيب.",
            "الصفحة: رقمها (من 0) وحجمها.",
            "الفلاتر.",
            "رجوع لأول صفحة.",
            "الطلب: كل الـ state في الـ key، والصفحة القديمة تفضل لحد ما الجديدة توصل.",
            "الجدول:",
            "الـ features والأعمدة.",
            "الصفوف من السيرفر.",
            "العدد الكلي عشان حساب الصفحات.",
            "الـ state متحكم فيها من هنا.",
            "ترتيب جديد: حدّث وارجع لأول صفحة.",
            "تغيير الصفحة.",
            "فلتر جديد: حدّث وارجع لأول صفحة.",
            "السيرفر هو اللي بيرتّب ويقسّم ويفلتر.",
            "قفلة.",
            "بداية الـ JSX.",
            "Fragment.",
            "خانة الفلتر مربوطة بعمود العميل.",
            "الجدول.",
            "الـ headers: كل واحد زرار بيقلب الترتيب، ومقفول لو العمود مش بيترتب.",
            "الصفوف: كل خلية بترسم الـ cell بتاعة العمود.",
            "قفلة الجدول.",
            "السابق.",
            "رقم الصفحة من عدد الصفحات.",
            "التالي.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`الطلبات بالترتيب (متجرّبة في اختبار بـ MSW):
[[?page=1&size=20]] ثم Next [[?page=2&size=20]] ثم دوسة Total [[?page=1&size=20&sort=total%3Adesc]] (رجع لصفحة 1، وأول دوسة على رقم desc، و [[%3A]] هي الـ [[:]] بعد الـ encoding)، ثم حرف في الفلتر [[...&customer=a]]. ومع [[rowCount: 45]] بيكتب «Page 1 of 3».

الـ [[aria-sort]]: [[ascending]] أو [[descending]] من [[h.column.getIsSorted()]]، ومش موجودة لو مش متربّت. من غير [[toFirstPage]] هتلاقي الترتيب بيبعت [[page=2]].`,
          solCode: R`async function fetchOrders(p: PaginationState, s: SortingState, f: ColumnFiltersState): Promise<{ rows: Order[]; rowCount: number }> {
  const params = new URLSearchParams({ page: String(p.pageIndex + 1), size: String(p.pageSize) })
  if (s[0]) params.set('sort', $__bt$__{s[0].id}:$__{s[0].desc ? 'desc' : 'asc'}$__bt)
  for (const filter of f) params.set(filter.id, String(filter.value))
  const res = await fetch($__bt/api/orders?$__{params}$__bt)
  if (!res.ok) throw new Error($__btHTTP $__{res.status}$__bt)
  return res.json()
}
// <th aria-sort={h.column.getIsSorted() === 'asc' ? 'ascending' : h.column.getIsSorted() === 'desc' ? 'descending' : undefined}>`
        },
        {
          cmd: "Recharts",
          title: "charts responsive بتدعم العربي و RTL",
          desc: R`Recharts بيرسم charts بـ SVG من components: [[<BarChart data>]] و [[<XAxis dataKey>]] و [[<YAxis>]] و [[<Tooltip>]] و [[<Bar dataKey>]]. و [[<ResponsiveContainer>]] بيخلي الـ chart ياخد عرض الأب.

في العربي: SVG مبيقلبش مع [[dir="rtl"]]، فالمحور الأفقي لسه من الشمال لليمين. بتقلبه بنفسك: [[reversed]] على XAxis عشان أول شهر يبقى يمين، و [[orientation="right"]] على YAxis. والأرقام بـ [[Intl.NumberFormat('ar-EG')]].`,
          example: R`import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

type Point = { month: string; sales: number }
const fmt = new Intl.NumberFormat('ar-EG', { notation: 'compact' })
export function SalesChart({ data, dir }: { data: Point[]; dir: 'rtl' | 'ltr' }) {
  const rtl = dir === 'rtl'
  return (
    <div style={{ width: '100%', height: 300 }} dir="ltr">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" reversed={rtl} />
          <YAxis orientation={rtl ? 'right' : 'left'} tickFormatter={v => fmt.format(v)} width={56} />
          <Tooltip formatter={v => fmt.format(Number(v))} />
          <Bar dataKey="sales" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}`,
          try: R`[[npm i recharts]]، وارسم الـ chart بـ ٦ شهور بأسماء عربي ([[يناير]] و [[فبراير]]...) وأرقام بالآلاف، مرة [[dir="ltr"]] ومرة [[rtl]]. صغّر الشاشة لعرض موبايل. وجرّب تشيل [[dir="ltr"]] من الـ div وشوف الـ tooltip والنصوص.`,
          flag: "script",
          deep: {
            why: R`كل dashboard فيه charts، ولو التطبيق عربي، chart بيقرا من الشمال لليمين جوه صفحة كلها يمين لشمال بيلخبط القارئ (أحدث شهر على الشمال). ومكتبات الـ charts نادرًا ما بتدعم RTL لوحدها، فلازم تعرف تقلب المحاور بنفسك.`,
            how: R`[[ResponsiveContainer]] بيقيس الأب بـ ResizeObserver ويدّي الـ chart العرض والطول. عشان كده الأب لازم يبقى ليه ارتفاع (هنا 300)، وإلا الارتفاع صفر ومفيش حاجة تظهر.

[[reversed]] على XAxis بيعكس ترتيب القيم على المحور (أول عنصر في الـ data على اليمين). و [[orientation="right"]] بيحط محور القيم يمين. والـ margin ثابتة من الناحيتين عشان الأرقام متتقصش. و [[dir="ltr"]] على الـ wrapper بيمنع اتجاه الصفحة يأثر على حسابات الـ SVG والـ tooltip جواه، والنصوص العربي نفسها بتترسم صح جوه SVG.

[[notation: 'compact']] بيحوّل 125000 لـ «١٢٥ ألف» بالعربي، فالمحور ميتزحمش. و [[fill="var(--chart-1)"]] لون من CSS variable، فالـ dark mode بيغيّره من غير ما تلمس الـ chart (shadcn charts ماشية بنفس الفكرة).

Recharts تقيلة (بتجيب d3 modules)، فحطها في chunk لوحدها أو lazy (درس vite.config ودرس lazy و Suspense)، ولفّها في ErrorBoundary لأن data بشكل غلط ممكن توقّعها.

وفي الاختبارات: jsdom مفيهوش أحجام، فالـ chart مبيرسمش أي حاجة في Vitest العادي (جرّبناه وطلع SVG فاضي). اختبر الحسابات اللي بتطلّع الـ data لوحدها، والشكل بـ visual regression (الدرس الأخير).`,
            when: R`Dashboards وتقارير: مبيعات بالشهر، وتوزيع الطلبات، ومقارنات. ولأعداد نقط كبيرة جدًا (آلاف بتتحدث لحظيًا) مكتبة بـ Canvas (ECharts مثلًا) أسرع من SVG.`,
            mistakes: R`ResponsiveContainer جوه أب من غير ارتفاع، فالـ chart مش ظاهر ومفيش error. ونسيان الـ RTL فأحدث شهر على الشمال. وأرقام إنجليزي جنب نصوص عربي في نفس المحور. وتحميل Recharts في الـ bundle الرئيسي لصفحة الدخول. و data جاية من API فيها strings بدل أرقام ([["1500"]])، فالـ bars بتطلع غلط أو مبتظهرش: حوّلها في الـ queryFn أو [[select]].`
          },
          teach: R`## الفكرة: chart أعمدة بيتقلب لوحده في العربي

[[SalesChart]] بياخد مبيعات كل شهر ويرسمها أعمدة. ولو [[dir]] بـ [[rtl]]، بيقلب المحور الأفقي (أول شهر يمين) ويحط محور الأرقام يمين. اتشغّل في Vite 8.3 + React 19.3 + Recharts 3.10 في Chrome headless، بالـ data اللي في الـ solCode، والـ chart بعرض 600 بكسل جوه صفحة [[dir="rtl"]].

---

## ١. الـ import والنوع والتنسيق

~~~text SalesChart.tsx
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
~~~

كل حتة في الـ chart component لوحدها، وبتركّبهم جوه بعض زي HTML:

| الـ component | بيرسم إيه |
|---|---|
| [[ResponsiveContainer]] | مش بيرسم، بيقيس الأب ويدّي الـ chart مقاسه |
| [[BarChart]] | الـ chart نفسه (SVG)، وبياخد الـ data |
| [[CartesianGrid]] | خطوط الشبكة في الخلفية |
| [[XAxis]] و [[YAxis]] | المحور الأفقي والرأسي |
| [[Tooltip]] | المربع اللي بيظهر لما تقف على عمود |
| [[Bar]] | الأعمدة نفسها |

~~~text SalesChart.tsx
type Point = { month: string; sales: number }
const fmt = new Intl.NumberFormat('ar-EG', { notation: 'compact' })
~~~

- [[Point]]: كل نقطة شهر ورقم.
- [[Intl.NumberFormat]]: أداة جاهزة في JavaScript لتنسيق الأرقام حسب اللغة. [[ar-EG]] عربي مصر (أرقام ٠١٢٣)، و [[notation: 'compact']] بتختصر الأرقام الكبيرة. اتعملت مرة برا الـ component لأن إنشاءها مكلّف شوية.

~~~text الناتج (Node 24)
fmt.format(42000)    ٤٢ ألف
fmt.format(125000)   ١٢٥ ألف
fmt.format(1500000)  ١٫٥ مليون
fmt.format(999)      ٩٩٩
~~~

---

## ٢. الـ component والـ wrapper

~~~text SalesChart.tsx
export function SalesChart({ data, dir }: { data: Point[]; dir: 'rtl' | 'ltr' }) {
  const rtl = dir === 'rtl'
~~~

بياخد الـ data والاتجاه، و [[rtl]] boolean بنستخدمه تحت كذا مرة.

~~~text SalesChart.tsx
    <div style={{ width: '100%', height: 300 }} dir="ltr">
      <ResponsiveContainer>
~~~

- [[style={{ ... }}]]: القوسين الأولانيين معناهم «JavaScript جوه JSX»، والتانيين object الـ style. [[height: 300]] يعني 300px.
- [[ResponsiveContainer]] بياخد [[100%]] من العرض والطول بتوع الأب. لو الأب ملوش ارتفاع، الـ chart ارتفاعه صفر ومش بيترسم. جربناها: أب من غير height طلع فيه [[<div style="width: 0px; height: 0px">]] و صفر SVG، ومن غير أي error في الـ Console.
- [[dir="ltr"]] هنا مقصود رغم إن الصفحة عربي. هنشوف تحت إيه اللي بيحصل من غيره.

---

## ٣. الـ chart والمحاور

~~~text SalesChart.tsx
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
~~~

- [[data]]: الـ array. كل عنصر فيها عمود.
- [[margin]]: مسافة بالبكسل حوالين الرسم من الأربع نواحي، متساوية يمين وشمال عشان المحور يقعد في أي ناحية.
- [[strokeDasharray="3 3"]]: الخط متقطع، ٣ بكسل مرسوم و ٣ فاضي. و [[vertical={false}]] يعني الخطوط الأفقية بس.

~~~text SalesChart.tsx
          <XAxis dataKey="month" reversed={rtl} />
~~~

[[dataKey="month"]]: اسم الخانة اللي بتتكتب تحت كل عمود. و [[reversed]] بيعكس ترتيبها: أول عنصر في الـ data يروح آخر المحور (يمين).

~~~text SalesChart.tsx
          <YAxis orientation={rtl ? 'right' : 'left'} tickFormatter={v => fmt.format(v)} width={56} />
~~~

- [[orientation]]: المحور يمين ولا شمال.
- [[tickFormatter]]: دالة بتاخد كل رقم على المحور وترجّع النص اللي هيتكتب. هنا بنستخدم [[fmt]] فيبقى «٢٠ ألف» بدل [[20000]].
- [[width={56}]]: عرض المحور بالبكسل، كفاية لـ «٨٠ ألف».

~~~text SalesChart.tsx
          <Tooltip formatter={v => fmt.format(Number(v))} />
          <Bar dataKey="sales" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
~~~

- [[formatter]] نفس الفكرة للـ tooltip. [[Number(v)]] لأن نوع [[v]] في TypeScript ممكن يبقى رقم أو نص.
- [[dataKey="sales"]]: طول العمود من الخانة دي.
- [[fill="var(--chart-1)"]]: اللون من CSS variable، فلو الـ dark mode غيّر [[--chart-1]] الأعمدة بتتغير لوحدها.
- [[radius={[4, 4, 0, 0]}]]: تدوير الأركان بالترتيب: فوق شمال، فوق يمين، تحت يمين، تحت شمال. يعني الراس مدور والرجل لأ.

---

## ٤. الناتج: [[rtl]] و [[ltr]] جنب بعض

قرينا مكان كل نص في الـ SVG بالبكسل (x من شمال الـ chart):

~~~text الناتج (Chrome)
rtl: يناير@482  فبراير@392  مارس@307  أبريل@224  مايو@142  يونيو@54  ٠@544  ٢٠ ألف@544  ٤٠ ألف@544 ...
ltr: يناير@111  فبراير@192  مارس@278  أبريل@365  مايو@454  يونيو@537  ٠@64  ٢٠ ألف@32  ٤٠ ألف@32 ...
~~~

| | [[ltr]] | [[rtl]] |
|---|---|---|
| يناير | شمال (111) | يمين (482) |
| يونيو | يمين (537) | شمال (54) |
| أرقام المحور | شمال (32) | يمين (544) |

والـ tooltip لما وقفنا على عمود يناير:

~~~text الناتج (Chrome)
يناير

sales : ٤٢ ألف
~~~

[[sales]] هو اسم الـ [[dataKey]]. ولو عايز اسم عربي حط [[name="المبيعات"]] على [[<Bar>]].

وفي عرض موبايل (375px) الـ SVG بقى عرضه 359 بدل 600 لوحده، لأن [[ResponsiveContainer]] بيسمع لتغيير مقاس الأب.

---

## ٥. من غير [[dir="ltr"]] على الـ wrapper

شلناه والصفحة لسه [[rtl]]. أسماء الشهور فضلت في مكانها، بس أرقام المحور اتحركت **جوه** الرسم:

~~~text الناتج (Chrome)
بـ dir="ltr":  ٢٠ ألف@544  (برا الأعمدة، على المحور)
من غيره:      ٢٠ ألف@504  (فوق آخر عمود)
~~~

والـ tooltip اتقلب ترتيبه فبقى «sales : ٤٢ ألف» مكتوب من اليمين. السبب: اتجاه الصفحة بيأثر على [[text-anchor]] بتاع نصوص الـ SVG، و Recharts بيحسب أماكنها على أساس [[ltr]]. فالـ wrapper بـ [[ltr]] ثابت، والقلب بنعمله احنا بـ [[reversed]] و [[orientation]].

---

## الخلاصة

| الحتة | ليه |
|---|---|
| أب بـ [[height]] ثابت | [[ResponsiveContainer]] بياخد مقاسه منه، ومن غيره الـ chart صفر ومفيش error |
| [[dir="ltr"]] على الـ wrapper | حسابات الـ SVG تفضل صح |
| [[reversed]] على [[XAxis]] | أول شهر يمين في العربي |
| [[orientation="right"]] على [[YAxis]] | الأرقام يمين في العربي |
| [[Intl.NumberFormat('ar-EG', { notation: 'compact' })]] | «٤٢ ألف» بدل 42000 |
| [[var(--chart-1)]] | الألوان من الثيم |`,
          lines: [
            "الـ components اللي هنستخدمها.",
            "شكل النقطة.",
            "تنسيق عربي مختصر للأرقام.",
            "الـ chart بياخد الـ data والاتجاه.",
            "RTL؟",
            "بداية الـ JSX.",
            "أب بارتفاع ثابت، و ltr عشان حسابات الـ SVG.",
            "ياخد مقاس الأب.",
            "chart أعمدة، ومسافة من الناحيتين.",
            "خطوط أفقية بس.",
            "المحور الأفقي، ومقلوب في العربي.",
            "محور القيم يمين في العربي، وأرقام عربي.",
            "tooltip بنفس التنسيق.",
            "الأعمدة بلون من CSS variable وأطراف مدورة.",
            "قفلة الـ chart.",
            "قفلة الـ container.",
            "قفلة الـ div.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`في [[ltr]]: يناير على الشمال ومحور الأرقام شمال. في [[rtl]]: يناير على اليمين وآخر شهر على الشمال، ومحور الأرقام على اليمين، والأرقام «٥٠ ألف» بدل 50000. في عرض موبايل الـ chart بيصغر مع الشاشة.

لو الـ chart مش ظاهر خالص، الأب ملوش ارتفاع. ولو شلت [[dir="ltr"]] من الـ wrapper، أرقام المحور بتدخل جوه الرسم فوق آخر عمود، وسطر الـ tooltip بيتقلب. (متجرّب في Chrome بـ Recharts 3.10.)`,
          solCode: R`const data = [
  { month: 'يناير', sales: 42000 },
  { month: 'فبراير', sales: 51000 },
  { month: 'مارس', sales: 38000 },
  { month: 'أبريل', sales: 64000 },
  { month: 'مايو', sales: 72000 },
  { month: 'يونيو', sales: 69000 },
]
<SalesChart data={data} dir="rtl" />
<SalesChart data={data} dir="ltr" />`
        },
        {
          cmd: "live updates",
          title: "hook بيسمع لتحديثات السيرفر (EventSource أو socket.io) ويحدّث كاش React Query",
          desc: R`لما السيرفر يبعت event (طلب جديد، أو حالة طلب اتغيرت)، مش محتاج state منفصلة للبيانات اللحظية: حدّث كاش React Query مباشرة. [[setQueryData]] للعنصر اللي جه كامل في الـ event، و [[invalidateQueries]] للـ lists عشان تتجاب من جديد. كده كل صفحة بتعرض الطلبات بتتحدث لوحدها، من غير ما تعرف إن فيه realtime أصلًا.

[[EventSource]] (SSE) بيعمل reconnect لوحده، ومناسب لما السيرفر بس هو اللي بيبعت. [[socket.io-client]] للاتجاهين (شات) وبيعمل reconnect كمان. وتفاصيل السيرفر في تاب «APIs متقدمة».`,
          example: R`import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

type Order = { id: string; status: string }
type OrderEvent = { type: 'order.updated'; order: Order } | { type: 'order.created'; order: Order }
export function useLiveOrders(url = '/api/orders/stream') {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<'connecting' | 'open' | 'reconnecting'>('connecting')
  useEffect(() => {
    const source = new EventSource(url, { withCredentials: true })
    source.onopen = () => {
      setStatus('open')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
    source.onerror = () => setStatus('reconnecting')
    source.onmessage = e => {
      const event = JSON.parse(e.data) as OrderEvent
      if (event.type === 'order.updated') queryClient.setQueryData<Order>(['orders', 'detail', event.order.id], event.order)
      queryClient.invalidateQueries({ queryKey: ['orders', 'list'] })
    }
    return () => source.close()
  }, [url, queryClient])
  return status
}
// في الـ layout: const status = useLiveOrders(); {status === 'reconnecting' && <Banner>Reconnecting…</Banner>}`,
          try: R`اعمل endpoint SSE بسيط (تاب «APIs متقدمة» أو Express: [[res.setHeader('Content-Type', 'text/event-stream')]] و [[res.write('data: ...\n\n')]] كل ٣ ثواني). نادي الـ hook في الـ layout، وافتح صفحة الطلبات وصفحة تفاصيل طلب في تابين. اقفل السيرفر وشغّله تاني وشوف الـ status. وبعدين اكتب اختبار بـ [[renderHook]] و [[vi.stubGlobal('EventSource', FakeEventSource)]].`,
          flag: "script",
          deep: {
            why: R`Dashboards الطلبات، وحالة الشحن، والإشعارات، ولوحة المطبخ في مطعم، كلها محتاجة تتحدث من غير refresh. الـ polling ([[refetchInterval]]) بيبعت طلبات كتير على الفاضي وبيتأخر. الـ push من السيرفر أسرع وأخف، والدمج مع الكاش بيخلي كل الشاشات متسقة من غير ما تكتب state للـ realtime لوحده.`,
            how: R`الـ effect بيفتح الاتصال مرة (أو لما الـ url يتغير) ويقفله في الـ cleanup، ومهم يتنادى في مكان واحد فوق (الـ layout) مش في كل component، وإلا هتفتح اتصال لكل واحد. و [[queryClient]] مرجعه ثابت فمبيعيدش الـ effect.

[[EventSource]] بيعمل reconnect لوحده بعد انقطاع (بعد ثواني، والسيرفر يقدر يحدد المدة بـ [[retry:]])، و [[onerror]] بيتنادى وهو بيحاول فتعرف تعرض banner. ولما يرجع، [[onopen]] بيتنادى تاني، وساعتها بنعمل invalidate لكل الطلبات: أي event حصل وانت مقطوع ضاع، فالأسلم تجيب الحقيقة من جديد. والسيرفر يقدر يبعت الأحداث اللي فاتت لو استخدم [[id:]] والمتصفح بيبعت [[Last-Event-ID]] وهو بيعمل reconnect.

[[setQueryData(['orders','detail', id], order)]] بيحدّث صفحة التفاصيل فورًا من غير طلب، لأن الـ event فيه الطلب كامل. أما الـ lists فمعقدة (ترتيب، وفلاتر، و pagination)، فالـ invalidate أأمن من إنك تعدّل كل list بإيدك: القوايم المعروضة بس هي اللي بتتجاب.

[[withCredentials: true]] بيبعت الـ cookies لو الـ stream على origin تاني. و EventSource مبيقبلش headers، فالـ auth بالـ cookie مش Bearer token.

و socket.io بنفس الشكل: [[const socket = io({ withCredentials: true })]]، و [[socket.on('order.updated', ...)]]، و [[socket.io.on('reconnect', ...)]] للـ invalidate، و [[socket.disconnect()]] في الـ cleanup.`,
            when: R`بيانات بتتغير من برا المستخدم الحالي والمستخدم محتاج يشوفها فورًا: طلبات، وإشعارات، وحالة مهام في الخلفية. ولو التحديث كل دقيقة كفاية، [[refetchInterval]] أبسط ومفيش سيرفر streaming.`,
            mistakes: R`اتصال لكل component بدل واحد في الـ layout. ومفيش cleanup فالاتصالات بتتراكم (وفي Strict Mode بتشوف اتنين). وتحط البيانات اللحظية في useState منفصلة عن الكاش فالصفحات بتختلف. ومفيش invalidate بعد الـ reconnect فالأحداث اللي ضاعت مبتظهرش. وتفتكر إن الـ reconnect بيحصل دايمًا: هو بيحصل لما الاتصال يقع بس، لكن لو السيرفر أو الـ proxy رد بـ status مش 200 (502 مثلًا)، EventSource بيقفل نهائي ([[readyState]] بـ 2) ومبيحاولش تاني، فالـ banner يفضل «Reconnecting» للأبد (متجرّب في Chrome). لو ده وارد، افتح اتصال جديد بإيدك بعد شوية لما [[source.readyState === EventSource.CLOSED]]. و Nginx بيعمل buffer للـ SSE فالأحداث بتوصل متأخرة مع بعض (تاب «APIs متقدمة»). و [[JSON.parse]] من غير ما تتأكد من شكل الـ event.`
          },
          teach: R`## الفكرة: الـ events بتكتب في الكاش، والصفحات بتقرا من الكاش

[[useLiveOrders]] hook بيفتح اتصال واحد بالسيرفر ويفضل سامع. كل ما يوصل event عن طلب، بيحدّث كاش React Query، فأي صفحة بتعرض الطلب ده (بـ [[useQuery]] عادي) بتتحدث لوحدها. والـ hook نفسه بيرجّع حالة الاتصال بس عشان تعرض banner.

اتشغّل في Vite 8.3 + React 19.3 + React Query 5.104 في Chrome headless، مع سيرفر SSE صغير بـ Node على port تاني بيبعت [[order.updated]] للطلب 7 كل 0.7 ثانية، والصفحة فيها [[useQuery]] لتفاصيل الطلب 7 و [[useQuery]] للـ list. والاختبار في الـ solCode اتشغّل بـ Vitest 5 + jsdom.

---

## ١. الأنواع

~~~text useLiveOrders.ts
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

type Order = { id: string; status: string }
type OrderEvent = { type: 'order.updated'; order: Order } | { type: 'order.created'; order: Order }
~~~

- [[useQueryClient()]]: بيرجّع الـ [[QueryClient]] اللي في الـ Provider، يعني الكاش نفسه، عشان نكتب فيه.
- [[OrderEvent]]: الـ [[|]] معناها «يا ده يا ده» (union). وبما إن كل نوع ليه [[type]] مختلف، لما تكتب [[if (event.type === 'order.updated')]] TypeScript بيعرف انت في أنهي نوع (اسمها discriminated union).

---

## ٢. الـ hook والـ state

~~~text useLiveOrders.ts
export function useLiveOrders(url = '/api/orders/stream') {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<'connecting' | 'open' | 'reconnecting'>('connecting')
~~~

- [[url = '/api/orders/stream']]: قيمة افتراضية لو ناديته من غير argument.
- [[status]]: حالة الاتصال، تلات قيم بس، وبتبدأ [[connecting]].

---

## ٣. فتح الاتصال

~~~text useLiveOrders.ts
  useEffect(() => {
    const source = new EventSource(url, { withCredentials: true })
~~~

- [[EventSource]]: حاجة جاهزة في المتصفح لـ SSE (Server-Sent Events). بتعمل GET واحد والسيرفر بيسيبه مفتوح ويكتب فيه events بالشكل ده:

~~~text اللي السيرفر بيكتبه
retry: 1000

id: 4
data: {"type":"order.updated","order":{"id":"7","status":"delivered"}}

~~~

كل event سطر [[data:]] وبعده سطر فاضي. و [[id:]] رقم الـ event، و [[retry:]] بيقول للمتصفح يستنى كام millisecond قبل ما يعيد الاتصال.

- [[withCredentials: true]]: ابعت الـ cookies حتى لو السيرفر على origin تاني. في التجربة الصفحة على port 5815 والسيرفر على 5816، والسيرفر سجّل [[cookie=session=abc]] في الطلب. والسيرفر لازم يرد بـ [[Access-Control-Allow-Credentials: true]] و origin محدد (مش [[*]]).

---

## ٤. الأحداث التلاتة

~~~text useLiveOrders.ts
    source.onopen = () => {
      setStatus('open')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
~~~

[[onopen]] بيتنادى أول ما الاتصال يفتح، **وكمان** كل مرة يرجع بعد انقطاع. [[invalidateQueries({ queryKey: ['orders'] })]] بيعلّم كل query الـ key بتاعها بيبدأ بـ [[orders]] إنها قديمة، واللي معروض منها على الشاشة بيتجاب تاني. ليه؟ لو الاتصال كان مقطوع، أي event حصل في الوقت ده ضاع، فنجيب الحقيقة من الأول.

~~~text useLiveOrders.ts
    source.onerror = () => setStatus('reconnecting')
~~~

[[onerror]]: الاتصال وقع. EventSource هيحاول لوحده، واحنا بنعرض الحالة بس.

~~~text useLiveOrders.ts
    source.onmessage = e => {
      const event = JSON.parse(e.data) as OrderEvent
      if (event.type === 'order.updated') queryClient.setQueryData<Order>(['orders', 'detail', event.order.id], event.order)
      queryClient.invalidateQueries({ queryKey: ['orders', 'list'] })
    }
~~~

- [[e.data]]: النص اللي بعد [[data:]]. و [[JSON.parse]] بيحوله object. و [[as OrderEvent]] بتقول لـ TypeScript شكله (مش بتتحقق فعلًا، دي ثقة في السيرفر).
- [[setQueryData(key, value)]]: اكتب القيمة في الكاش مباشرة. الـ event فيه الطلب كامل، فصفحة التفاصيل اللي بتقرا [[['orders', 'detail', '7']]] بتتحدث من غير أي طلب للسيرفر.
- [[invalidateQueries({ queryKey: ['orders', 'list'] })]]: الـ lists نجيبها تاني بدل ما نعدّل كل واحدة بإيدنا (ممكن الطلب يتنقل لصفحة تانية أو يخرج من فلتر).

~~~text useLiveOrders.ts
    return () => source.close()
  }, [url, queryClient])
  return status
}
~~~

- الـ cleanup بيقفل الاتصال لما الـ component يتشال، أو قبل ما الـ effect يتعاد لو [[url]] اتغير.
- [[[url, queryClient]]]: [[queryClient]] مرجعه ثابت، فعمليًا الـ effect بيتعاد لو [[url]] بس اتغير.

---

## ٥. التشغيل: إيه اللي حصل ثانية بثانية

~~~text الناتج (Chrome + سيرفر Node)
1.2s  open | detail=pending   | GET /api/orders/7, /api/orders, /api/orders/7
1.9s  open | detail=shipped   | + GET /api/orders
2.6s  open | detail=delivered | + GET /api/orders
--- وقفنا السيرفر
4.3s  reconnecting | detail=delivered
5.2s  Failed to load resource: net::ERR_CONNECTION_REFUSED
6.2s  Failed to load resource: net::ERR_CONNECTION_REFUSED
--- شغّلنا السيرفر تاني
[server] GET /api/orders/stream  last-event-id=4
8.3s  open | detail=pending   | + GET /api/orders/7, /api/orders
9.0s  open | detail=shipped   | + GET /api/orders
~~~

نقرا ده:

| اللي ظهر | السبب |
|---|---|
| [[/api/orders/7]] اتطلب مرتين في الأول | مرة من [[useQuery]] نفسه، ومرة من الـ invalidate في [[onopen]] |
| [[detail]] بقت [[shipped]] ومفيش GET لـ [[/api/orders/7]] | [[setQueryData]] كتبها في الكاش مباشرة |
| GET لـ [[/api/orders]] مع كل event | الـ invalidate بتاع الـ list |
| [[reconnecting]] وبعدين محاولة كل ثانية | [[onerror]]، وEventSource بيعيد لوحده كل [[retry: 1000]] |
| [[last-event-id=4]] | المتصفح بعت آخر [[id:]] وصله في header اسمه [[Last-Event-ID]]، فالسيرفر يقدر يبعت اللي فات |
| بعد الرجوع [[detail=pending]] | [[onopen]] عمل invalidate، والسيرفر رجّع الحالة اللي عنده |

### حالة مش بيرجع فيها لوحده

جربنا endpoint بيرد بـ 502 (زي proxy السيرفر وراه واقع):

~~~text الناتج (Chrome)
onerror readyState=2
after 4s readyState=2
requests to /api/fail: 1
~~~

[[readyState]] بـ [[2]] يعني [[CLOSED]]: لو الرد مش 200 أو مش [[text/event-stream]]، EventSource بيقفل نهائي ومبيحاولش تاني، والـ hook هيفضل [[reconnecting]] للأبد. الـ reconnect التلقائي بيحصل بس لما الاتصال نفسه يقع.

---

## ٦. الـ solCode: اختبار من غير سيرفر

~~~text useLiveOrders.test.tsx
class FakeEventSource {
  static last: FakeEventSource
  onopen: (() => void) | null = null
  onerror: (() => void) | null = null
  onmessage: ((e: { data: string }) => void) | null = null
  close = vi.fn()
  url: string
  constructor(url: string) { this.url = url; FakeEventSource.last = this }
}
vi.stubGlobal('EventSource', FakeEventSource)
~~~

- class بنفس شكل EventSource اللي الـ hook بيستخدمه: تلات خانات للـ handlers، و [[close]].
- [[static last]]: خانة على الـ class نفسها مش على كل نسخة. الـ constructor بيحط فيها آخر نسخة اتعملت، عشان الاختبار يوصل للنسخة اللي الـ hook عملها جواه.
- [[vi.fn()]]: دالة فاضية بتسجّل اتنادت كام مرة (spy).
- [[vi.stubGlobal('EventSource', ...)]]: بدّل [[EventSource]] الحقيقي بتاعنا في الاختبار ده.
- [[url: string]] و [[this.url = url]] بدل [[constructor(public url: string)]]: الاختصار ده (parameter property) ممنوع مع [[erasableSyntaxOnly]] اللي مشروع Vite الجديد بيشغّله، فـ [[npm run build]] كان هيفشل.

~~~text useLiveOrders.test.tsx
it('updates the cache from events', () => {
  const qc = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  const { result, unmount } = renderHook(() => useLiveOrders(), { wrapper })
~~~

[[renderHook]] بيشغّل الـ hook جوه component وهمي، و [[wrapper]] بيلفه بالـ Provider عشان [[useQueryClient]] يلاقي كاش (درس renderHook). و [[result.current]] هو آخر حاجة الـ hook رجّعها.

~~~text useLiveOrders.test.tsx
  act(() => FakeEventSource.last.onopen!())
  expect(result.current).toBe('open')
  act(() => FakeEventSource.last.onmessage!({ data: JSON.stringify({ type: 'order.updated', order: { id: '7', status: 'shipped' } }) }))
  expect(qc.getQueryData(['orders', 'detail', '7'])).toEqual({ id: '7', status: 'shipped' })
  unmount()
  expect(FakeEventSource.last.close).toHaveBeenCalled()
})
~~~

- بنادي الـ handlers بإيدينا كأن السيرفر بعت. [[!]] بعد [[onopen]] بتقول لـ TypeScript «مش null» (الـ hook حطها خلاص).
- [[act(...)]]: بيخلي React يخلص كل الـ updates قبل ما نكمّل، فـ [[result.current]] يبقى [[open]].
- [[getQueryData]] بيقرا من الكاش: لو الـ event اتكتب صح هيبقى [[shipped]].
- [[unmount()]] بيشيل الـ component، فالـ cleanup لازم ينادي [[close]].

~~~text الناتج (Vitest 5)
 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

---

## الخلاصة

| الحتة | ليه |
|---|---|
| اتصال واحد في الـ layout | مش اتصال لكل component |
| [[setQueryData]] للتفاصيل | الـ event فيه البيانات كاملة، فمفيش طلب |
| [[invalidateQueries]] للـ lists | أأمن من تعديلها بإيدك |
| invalidate في [[onopen]] | يغطي اللي ضاع وقت الانقطاع |
| [[return () => source.close()]] | من غيره الاتصالات بتتراكم |
| رد مش 200 | EventSource بيقفل نهائي، مش بيعيد |`,
          lines: [
            "effect للاتصال، و state للحالة.",
            "الكاش.",
            "شكل الطلب.",
            "الأحداث اللي ممكن تيجي.",
            "hook بيتنادى مرة في الـ layout.",
            "الكاش.",
            "حالة الاتصال عشان نعرضها.",
            "افتح الاتصال:",
            "EventSource بالـ cookies.",
            "اتصل (أول مرة أو بعد انقطاع):",
            "علّم إنه شغال.",
            "هات كل الطلبات من جديد، عشان أي حدث ضاع وانت مقطوع.",
            "قفلة.",
            "انقطع: EventSource بيحاول لوحده، واحنا نعرض الحالة.",
            "event وصل:",
            "اقراه.",
            "الطلب جه كامل: حطه في كاش صفحة التفاصيل مباشرة.",
            "والـ lists تتجاب تاني.",
            "قفلة.",
            "اقفل الاتصال لما الـ component يتشال.",
            "مرة واحدة لكل url.",
            "رجّع الحالة.",
            "قفلة."
          ],
          sol: R`مع السيرفر شغال: الـ status [[open]]، وأي event [[order.updated]] بيغيّر صفحة التفاصيل فورًا من غير طلب في Network، وصفحة الـ list بتعمل GET لوحدها. لما تقفل السيرفر: الـ status [[reconnecting]] والـ banner يظهر، ولما يرجع [[open]] وطلب جديد للطلبات.

الاختبار (متجرّب): الـ FakeEventSource بيحفظ نفسه في متغير static، فالاختبار ينادي [[onopen]] و [[onmessage]] بإيده جوه [[act]]، ويتأكد إن [[getQueryData(['orders','detail','7'])]] اتحدثت، وإن [[close]] اتنادت بعد [[unmount]].`,
          solCode: R`class FakeEventSource {
  static last: FakeEventSource
  onopen: (() => void) | null = null
  onerror: (() => void) | null = null
  onmessage: ((e: { data: string }) => void) | null = null
  close = vi.fn()
  url: string
  constructor(url: string) { this.url = url; FakeEventSource.last = this }
}
vi.stubGlobal('EventSource', FakeEventSource)

it('updates the cache from events', () => {
  const qc = new QueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  const { result, unmount } = renderHook(() => useLiveOrders(), { wrapper })
  act(() => FakeEventSource.last.onopen!())
  expect(result.current).toBe('open')
  act(() => FakeEventSource.last.onmessage!({ data: JSON.stringify({ type: 'order.updated', order: { id: '7', status: 'shipped' } }) }))
  expect(qc.getQueryData(['orders', 'detail', '7'])).toEqual({ id: '7', status: 'shipped' })
  unmount()
  expect(FakeEventSource.last.close).toHaveBeenCalled()
})`
        },
        {
          cmd: "Storybook",
          title: "Storybook لمكتبة الـ components، و visual regression بـ toHaveScreenshot",
          desc: R`Storybook بيشغّل كل component لوحده في صفحة خاصة، بكل حالاته: الزرار primary و ghost و disabled و loading، والجدول فاضي وفيه خطأ وفيه ١٠٠٠ صف. كل حالة اسمها story، بتتكتب في [[Button.stories.tsx]] بـ [[args]] (الـ props). والفريق والديزاينر بيشوفوا كل حاجة من غير ما يدخلوا التطبيق ويوصلوا للحالة دي.

والـ visual regression: اختبار بيصوّر الـ story ويقارنها بصورة محفوظة، ولو بكسلات اتغيرت بيفشل. في Playwright ده [[await expect(page).toHaveScreenshot()]].`,
          example: R`// npm create storybook@latest
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn, expect } from 'storybook/test'
import { Button } from './Button'

const meta = {
  component: Button,
  args: { label: 'Save', onClick: fn() },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Clicks: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }))
    await expect(args.onClick).toHaveBeenCalled()
  },
}
// e2e/visual.spec.ts (Playwright، و Storybook شغال على 6006)
import { test, expect } from '@playwright/test'
test('button primary looks the same', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-button--primary')
  await expect(page.locator('#storybook-root')).toHaveScreenshot('button-primary.png', { maxDiffPixelRatio: 0.01 })
})`,
          try: R`في مشروع الـ lab اعمل [[npm create storybook@latest]] واكتب stories للـ Button (من درس props) بحالتين وstory فيها play. شغّل [[npm run storybook]] وشوف تاب Interactions. بعدين اعمل اختبار Playwright بيصوّر الـ story: أول تشغيل بـ [[--update-snapshots]] بيحفظ الصورة، وبعدين غيّر الـ padding في CSS بتاع الزرار وشغّل تاني.`,
          flag: "script",
          deep: {
            why: R`في فريق فيه design system، الـ components بتتستخدم في عشرات الصفحات. تغيير صغير في [[Button]] ممكن يبوّظ شكل صفحة الدفع ومحدش يلاحظ غير العميل. Storybook بيدّي مكان واحد تشوف فيه كل حالة وتوثّقها، والـ screenshots بتمسك التغييرات البصرية اللي الاختبارات العادية (اللي بتسأل «الزرار موجود؟») مش بتشوفها.`,
            how: R`[[npm create storybook@latest]] بيكتشف Vite و React ويعمل [[.storybook/main.ts]] و [[preview.ts]] وأمثلة. Storybook 10 (الحالي) ESM بس، والـ framework لمشروع Vite هو [[@storybook/react-vite]] ولـ Next [[@storybook/nextjs-vite]].

الملف: [[meta]] بيحدد الـ component والـ args المشتركة، و [[satisfies Meta<typeof Button>]] بيخلي TypeScript يتحقق من الـ args من غير ما يضيّع النوع. وكل [[export]] story. و [[fn()]] دالة spy بتظهر في تاب Actions. و [[play]] بيشغّل تفاعل بعد ما الـ story تترسم (بنفس API بتاع Testing Library: [[canvas.getByRole]] و [[userEvent]])، فالـ story بقت اختبار. و addon-vitest بيشغّل الـ stories دي كاختبارات Vitest في متصفح حقيقي. وفي [[preview.tsx]] تحط الـ decorators اللي بتلف كل story (QueryClientProvider، و ThemeProvider، و [[dir="rtl"]] للعربي)، و MSW بـ msw-storybook-addon لو الـ component بيجيب بيانات.

[[toHaveScreenshot()]] في Playwright: أول تشغيل مفيش صورة، فبيفشل ويحفظ واحدة (أو [[--update-snapshots]] يحفظ من غير فشل). بعد كده بيصوّر ويقارن بكسل ببكسل، ولو الفرق أكبر من [[maxDiffPixelRatio]] بيفشل ويحفظ صورة diff بالأحمر. الصور بتتحفظ جنب الاختبار وبتترفع مع الكود. و [[iframe.html?id=...]] بيفتح الـ story لوحدها من غير واجهة Storybook، والـ id من اسم الملف والـ story بـ kebab-case.

الخطوط، والـ anti-aliasing، ونظام التشغيل بيغيّروا البكسلات، فالصور اللي اتعملت على ماك هتفشل على Linux في CI. عشان كده بتتعمل وتتقارن في نفس البيئة (Docker image بتاع Playwright في CI). وخدمات زي Chromatic بتعمل ده كله كخدمة.`,
            when: R`design system أو مكتبة components بيستخدمها أكتر من فريق أو مشروع، أو تطبيق فيه components معقدة بحالات كتير (جداول، و charts، و فورمات). لمشروع صغير لوحدك، ممكن يبقى تكلفة أكتر من فايدته.`,
            mistakes: R`stories بتعتمد على API حقيقي فبتفشل لما السيرفر واقع. وصور مرجعية معمولة على جهازك وبتتقارن في CI. و screenshot لصفحة فيها تاريخ النهارده أو animation أو بيانات عشوائية، فبتفشل كل مرة (ثبّت الوقت، واستخدم [[mask]] للأجزاء المتغيرة، والـ CSS animations [[toHaveScreenshot]] بيوقفها لوحده لكن الـ animations اللي بـ JavaScript لأ). و [[--update-snapshots]] كل ما حاجة تفشل من غير ما تبص على الـ diff. ونسيان الـ decorators فالـ component بيقع «No QueryClient set».`
          },
          teach: R`## الفكرة: ملف stories لكل component، واختبار بيصوّر

المثال فيه ملفين. الأول [[Button.stories.tsx]]: بيقول لـ Storybook «اعرض الـ Button بالحالات دي»، وحالة منهم فيها اختبار تفاعل. التاني [[visual.spec.ts]]: اختبار Playwright بيفتح الـ story لوحدها ويصوّرها ويقارنها بصورة محفوظة.

اتشغّل على مشروع Vite + React جديد، و [[npm create storybook@latest]] نزّل Storybook 10.6.1، و Playwright 1.63 بـ Chrome المتسطب على ويندوز. Storybook اشتغل على port 5817 بدل 6006 (عشان ميتخانقش مع حاجة تانية على الجهاز)، فالـ URL في الاختبار اتغير بالشكل ده بس.

---

## ١. التسطيب: [[npm create storybook@latest]]

بيكتشف إن المشروع Vite + React، ويضيف [[storybook]] و [[@storybook/react-vite]] و [[@storybook/addon-docs]]، ويعمل فولدر [[.storybook]] فيه:

~~~text .storybook/main.ts (اللي اتعمل)
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite"
};
~~~

[[stories]] هو المكان اللي Storybook بيدوّر فيه: أي ملف اسمه بيخلص بـ [[.stories.tsx]] (أو ts أو js...) جوه [[src]]. و [[@(js|jsx|...)]] معناها «واحد من دول». وزوّد في [[package.json]] السطر [[storybook dev -p 6006]]، و [[-p]] هو الـ port.

---

## ٢. الـ imports

~~~text src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn, expect } from 'storybook/test'
import { Button } from './Button'
~~~

- [[Meta]] و [[StoryObj]]: أنواع TypeScript بس ([[import type]])، للإعداد العام وللـ story الواحدة.
- [[storybook/test]]: أدوات الاختبار جوه Storybook. [[fn()]] بتعمل spy، و [[expect]] زي بتاعة Vitest.
- [[Button]] اللي هنعرضه. في التجربة: [[label]] و [[variant]] ([['primary' | 'ghost']]) و [[onClick]].

---

## ٣. الـ [[meta]]: الإعداد المشترك

~~~text src/components/Button.stories.tsx
const meta = {
  component: Button,
  args: { label: 'Save', onClick: fn() },
} satisfies Meta<typeof Button>
export default meta
~~~

- [[component]]: الـ component اللي الملف ده بيعرضه. Storybook بيقرا الـ props بتاعته ويعمل منها Controls (خانات تغيّر فيها الـ props وانت شايف).
- [[args]]: الـ props اللي كل الـ stories هتاخدها. [[onClick: fn()]] دالة spy: كل دوسة بتتسجل وتظهر في تاب Actions.
- [[satisfies Meta<typeof Button>]]: TypeScript بيتأكد إن الـ object ده [[Meta]] صح (مثلًا [[label]] نص)، **من غير** ما يغيّر نوع [[meta]] نفسه لـ [[Meta]] العام. الفرق مهم في السطر الجاي. ([[typeof Button]] = نوع الـ component، ومنه بيعرف الـ props.)
- [[export default meta]]: Storybook بيقرا الإعداد من الـ default export.

ومفيش [[title]]، فـ Storybook عمل الاسم من مكان الملف: [[src/components/Button.stories.tsx]] بقى [[components/Button]].

---

## ٤. الـ stories

~~~text src/components/Button.stories.tsx
type Story = StoryObj<typeof meta>
export const Primary: Story = {}
export const Ghost: Story = { args: { variant: 'ghost' } }
~~~

- [[StoryObj<typeof meta>]]: نوع story بيعرف إن [[label]] و [[onClick]] جايين من الـ meta، فمش هيطلب منك تكتبهم تاني. ولو كنت كتبت [[const meta: Meta<typeof Button>]] بدل [[satisfies]]، المعلومة دي كانت هتضيع.
- كل [[export const]] story. [[Primary]] فاضية = الـ args بتاعة الـ meta زي ما هي. [[Ghost]] نفسها بس [[variant: 'ghost']].

اسم الـ export بيتحول للـ id بـ kebab-case (حروف صغيرة وبينهم [[-]])، واتأكدنا من [[index.json]] بتاع Storybook:

~~~text الناتج (curl localhost:5817/index.json)
components-button--primary  title=components/Button  name=Primary
components-button--ghost    title=components/Button  name=Ghost
components-button--clicks   title=components/Button  name=Clicks
~~~

---

## ٥. story فيها اختبار: [[play]]

~~~text src/components/Button.stories.tsx
export const Clicks: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }))
    await expect(args.onClick).toHaveBeenCalled()
  },
}
~~~

- [[play]]: دالة Storybook بيشغّلها بعد ما الـ story تترسم. بتاخد object، و [[{ canvas, userEvent, args }]] بتطلّع منه التلاتة (destructuring).
- [[canvas]]: المكان اللي الـ story مرسومة فيه، وفيه نفس queries بتاعة Testing Library. [[getByRole('button', { name: 'Save' })]] = «الزرار اللي اسمه Save» (درس getByRole).
- [[userEvent.click]]: دوسة زي المستخدم (درس user-event). و [[await]] لأنها async.
- [[expect(args.onClick).toHaveBeenCalled()]]: الـ spy اتنادى؟

في تاب Interactions بتاع Clicks ظهر:

~~~text الناتج (Storybook في Chrome)
PASS
Interaction steps
userEvent.click(within(<div#storybook-root>).getByRole("button", { name: "Save" }))
expect(onClick).toHaveBeenCalled()
~~~

وتاب Actions: [[onClick: (1)]]، يعني اتنادى مرة. والشريط الشمال: [[COMPONENTS]] وتحته [[Button]] وتحته [[Primary]] و [[Ghost]] و [[Clicks]].

---

## ٦. الاختبار البصري

~~~text e2e/visual.spec.ts
import { test, expect } from '@playwright/test'
test('button primary looks the same', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=components-button--primary')
  await expect(page.locator('#storybook-root')).toHaveScreenshot('button-primary.png', { maxDiffPixelRatio: 0.01 })
})
~~~

- [[@playwright/test]]: مكتبة اختبارات Playwright (غير Vitest). [[test]] بيعرّف اختبار، و [[{ page }]] تاب متصفح جاهز.
- [[iframe.html?id=...]]: الـ story لوحدها من غير الشريط والتابات بتاعة Storybook. الـ [[id]] هو اللي شفناه في [[index.json]].
- [[page.locator('#storybook-root')]]: العنصر اللي Storybook بيرسم فيه الـ story. بنصوّره هو بس، مش الصفحة كلها (السبب تحت).
- [[toHaveScreenshot('button-primary.png', ...)]]: صوّر وقارن بالصورة المحفوظة بالاسم ده.
- [[maxDiffPixelRatio: 0.01]]: مسموح لحد ١٪ من البكسلات تختلف (فروق رسم الخطوط الصغيرة).

### التشغيل خطوة بخطوة

| الخطوة | الأمر | اللي حصل |
|---|---|---|
| ١ | [[npx playwright test e2e/visual.spec.ts]] | فشل: «A snapshot doesn't exist at ...\visual.spec.ts-snapshots\button-primary-win32.png, writing actual.» |
| ٢ | نفس الأمر + [[--update-snapshots]] | نجح، واتحفظت [[e2e/visual.spec.ts-snapshots/button-primary-win32.png]] |
| ٣ | من غير [[--update-snapshots]] | [[1 passed]] |
| ٤ | غيّرنا padding الزرار من [[8px 16px]] لـ [[10px 20px]] | فشل (تحت) |

~~~text الناتج (Playwright 1.63)
Error: expect(locator).toHaveScreenshot(expected) failed
Locator: locator('#storybook-root')
  Expected an image 1248px by 37px, received 1248px by 41px. 696 pixels (ratio 0.02 of all image pixels) are different.
...
  - disabled all CSS animations
  - waiting for fonts to load...
~~~

وفي [[test-results]] اتعمل [[button-primary-expected.png]] و [[button-primary-actual.png]] و [[button-primary-diff.png]] (الفرق بالأحمر).

نقرا الناتج:

- [[37px]] بقت [[41px]]: الـ padding زاد 2px فوق و 2px تحت.
- [[ratio 0.02]]: ٢٪ اتغيرت، أكتر من الـ ١٪ المسموح.
- [[-win32]] في اسم الصورة: Playwright بيضيف اسم النظام. على لينكس في CI هيدوّر على [[button-primary-linux.png]] ومش هيلاقيها، عشان كده الصور بتتعمل في نفس البيئة اللي هتتقارن فيها (Docker image بتاع Playwright).
- [[disabled all CSS animations]]: [[toHaveScreenshot]] بيوقف الـ CSS animations لوحده قبل التصوير.

### ليه [[#storybook-root]] مش الصفحة كلها؟

جربنا نفس التغيير والاختبار بيصوّر [[page]] كلها (1280×720، يعني حوالي ٩٢٠ ألف بكسل): اتغير ٦٩٤ بكسل بس، أقل من ١٪، فالاختبار **نجح** والتغيير عدّى. كل ما الصورة أكبر من الـ component، الـ ١٪ بيبقى سماح أكبر. صوّر العنصر نفسه.

---

## ٧. الـ solCode

~~~text الأوامر
npm create storybook@latest
npm run storybook
npm i -D @playwright/test && npx playwright install chromium
npx playwright test e2e/visual.spec.ts --update-snapshots
npx playwright test e2e/visual.spec.ts
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[npm create storybook@latest]] | يسطّب Storybook ويعمل [[.storybook]] وأمثلة |
| [[npm run storybook]] | يشغّله على [[localhost:6006]] |
| [[npm i -D @playwright/test]] | مكتبة الاختبار ([[-D]] = devDependency، للتطوير بس) |
| [[npx playwright install chromium]] | ينزّل المتصفح اللي Playwright بيستخدمه. (في التجربة بدلها استخدمنا Chrome المتسطب بـ [[channel: 'chrome']] في [[playwright.config.ts]]) |
| [[--update-snapshots]] | احفظ الصور الحالية كمرجع |
| من غيره | قارن بالمرجع |

[[&&]] معناها «لو الأمر الأول نجح، شغّل التاني».

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[meta]] + [[satisfies]] | الـ component والـ args المشتركة، و TypeScript شايف الأنواع |
| [[export const Story]] | حالة واحدة، والـ id بـ kebab-case |
| [[fn()]] | spy بيظهر في Actions |
| [[play]] | اختبار تفاعل جوه الـ story |
| [[toHaveScreenshot]] على العنصر | يمسك أي تغيير بصري فوق الـ ١٪ |
| [[-win32]] و [[-linux]] | الصور المرجعية خاصة بالنظام، فاعملها في بيئة الـ CI |`,
          lines: [
            "أنواع Storybook لـ React مع Vite.",
            "fn للـ spies، و expect للـ play.",
            "الـ component.",
            "الإعداد المشترك:",
            "الـ component.",
            "props مشتركة لكل الـ stories، و onClick spy.",
            "satisfies عشان التحقق من غير ما النوع يضيع.",
            "Storybook بيقرا الـ default export.",
            "نوع الـ stories.",
            "story بالـ args الافتراضية.",
            "story تانية بتغيّر prop واحدة.",
            "story فيها اختبار تفاعل:",
            "play بيشتغل بعد ما الـ story تترسم، وبياخد canvas و userEvent والـ args.",
            "دوس الزرار.",
            "واتأكد إن الـ spy اتنادى.",
            "قفلة play.",
            "قفلة.",
            "Playwright.",
            "اختبار بصري.",
            "افتح الـ story لوحدها.",
            "صوّر الـ story بس (مش الصفحة كلها) وقارن بالصورة المحفوظة، ومسموح فرق ١٪.",
            "قفلة."
          ],
          sol: R`[[npm run storybook]] بيفتح على [[localhost:6006]]، وفي الشمال COMPONENTS وتحته Button وتحته Primary و Ghost و Clicks. تاب Interactions في Clicks بيكتب PASS وتحته الخطوتين: [[userEvent.click(...getByRole("button", { name: "Save" }))]] و [[expect(onClick).toHaveBeenCalled()]]، وتاب Actions فيه [[onClick: (1)]].

أول تشغيل Playwright من غير صورة بيفشل بـ «A snapshot doesn't exist at ...button-primary-win32.png, writing actual». بـ [[--update-snapshots]] بيحفظها وينجح. لاحظ إن اسم الملف فيه اسم النظام ([[-win32]] على ويندوز و [[-linux]] على لينكس)، فالصورة اللي اتعملت على جهازك مش هي اللي الـ CI بيدوّر عليها. بعد تغيير الـ padding من [[8px 16px]] لـ [[10px 20px]]، التشغيل التاني فشل بـ «Expected an image 1248px by 37px, received 1248px by 41px. 696 pixels (ratio 0.02 of all image pixels) are different.»، ومعاه [[button-primary-expected.png]] و [[-actual.png]] و [[-diff.png]] في [[test-results]]. لو التغيير مقصود، [[--update-snapshots]] تاني وارفع الصورة الجديدة مع الكود.

وخد بالك: لو صوّرت الصفحة كلها ([[expect(page)]]) بدل [[#storybook-root]]، نفس التغيير طلع ٦٩٤ بكسل بس من حوالي ٩٢٠ ألف (أقل من ١٪)، فالاختبار نجح ومسكش حاجة. (متجرّب على Storybook 10.6 و Playwright 1.63 بـ Chrome على ويندوز، والـ port كان 5817 بدل 6006.)`,
          solCode: R`npm create storybook@latest
npm run storybook
npm i -D @playwright/test && npx playwright install chromium
npx playwright test e2e/visual.spec.ts --update-snapshots
npx playwright test e2e/visual.spec.ts`
        }
      ]
    }
]);

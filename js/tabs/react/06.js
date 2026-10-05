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
[[?page=1&size=20]] ثم Next [[?page=2&size=20]] ثم دوسة Total [[?page=1&size=20&sort=total:desc]] (رجع لصفحة 1، وأول دوسة على رقم desc)، ثم حرف في الفلتر [[...&customer=a]]. ومع [[rowCount: 45]] بيكتب «Page 1 of 3».

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

لو الـ chart مش ظاهر خالص، الأب ملوش ارتفاع. ولو شلت [[dir="ltr"]] من الـ wrapper، ممكن تلاقي الـ tooltip أو الـ legend في مكان غريب حسب المتصفح. (الكود متجرّب بـ TypeScript بس، مش في متصفح.)`,
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
            mistakes: R`اتصال لكل component بدل واحد في الـ layout. ومفيش cleanup فالاتصالات بتتراكم (وفي Strict Mode بتشوف اتنين). وتحط البيانات اللحظية في useState منفصلة عن الكاش فالصفحات بتختلف. ومفيش invalidate بعد الـ reconnect فالأحداث اللي ضاعت مبتظهرش. و Nginx بيعمل buffer للـ SSE فالأحداث بتوصل متأخرة مع بعض (تاب «APIs متقدمة»). و [[JSON.parse]] من غير ما تتأكد من شكل الـ event.`
          },
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
  constructor(public url: string) { FakeEventSource.last = this }
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
  await expect(page).toHaveScreenshot('button-primary.png', { maxDiffPixelRatio: 0.01 })
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
            mistakes: R`stories بتعتمد على API حقيقي فبتفشل لما السيرفر واقع. وصور مرجعية معمولة على جهازك وبتتقارن في CI. و screenshot لصفحة فيها تاريخ النهارده أو animation أو بيانات عشوائية، فبتفشل كل مرة (ثبّت الوقت، واقفل الـ animations بـ [[animations: 'disabled']]، واستخدم [[mask]] للأجزاء المتغيرة). و [[--update-snapshots]] كل ما حاجة تفشل من غير ما تبص على الـ diff. ونسيان الـ decorators فالـ component بيقع «No QueryClient set».`
          },
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
            "صوّر وقارن بالصورة المحفوظة، ومسموح فرق ١٪.",
            "قفلة."
          ],
          sol: R`[[npm run storybook]] بيفتح على [[localhost:6006]]، وفي الشمال Components › Button وتحته Primary و Ghost و Clicks. تاب Interactions في Clicks بيوري الخطوات (click ثم expect) بعلامة صح.

أول تشغيل Playwright بـ [[--update-snapshots]] بيحفظ [[button-primary.png]] في فولدر [[visual.spec.ts-snapshots]]. بعد تغيير الـ padding، التشغيل التاني بيفشل بـ «Screenshot comparison failed» ومعاه صور expected و actual و diff في [[test-results]]. لو التغيير مقصود، [[--update-snapshots]] تاني وارفع الصورة الجديدة مع الكود.

(الكود ده متكتب على docs Storybook 10 و Playwright الحالية، بس متشغّلش هنا لأن مفيش متصفح في بيئة التجربة.)`,
          solCode: R`npm create storybook@latest
npm run storybook
npm i -D @playwright/test && npx playwright install chromium
npx playwright test e2e/visual.spec.ts --update-snapshots
npx playwright test e2e/visual.spec.ts`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات React، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "reconciliation",
          title: "يعني إيه reconciliation، وليه الـ key بالـ index مشكلة؟",
          desc: R`لما الـ state تتغير، React بتنادي الـ components وتطلع شجرة عناصر جديدة، وتقارنها بالقديمة (reconciliation) عشان تعرف أقل تغييرات تعملها في الـ DOM. المقارنة الكاملة بين شجرتين بطيئة جدًا، فـ React بتفترض فرضيتين: لو نوع العنصر اتغير ([[div]] بقى [[span]]، أو [[<Login>]] بقى [[<Dashboard>]]) ترمي الشجرة القديمة كلها وتعمل جديدة، ولو في list فالـ [[key]] بيقول مين هو مين. بالـ key بتطابق العناصر حتى لو اتحركت، فتحافظ على الـ DOM والـ state بتاعتهم. بالـ index، مسح أو ترتيب بيخلي key 0 يبقى عنصر تاني، فـ React تحط state العنصر القديم (نص input، أو focus، أو animation) على العنصر الجديد.`,
          example: R`{todos.map((t, i) => <TodoRow key={i} todo={t} />)}
{todos.map(t => <TodoRow key={t.id} todo={t} />)}
<Profile key={userId} userId={userId} />`,
          try: R`افتح درس key في المستوى الأول وجرّب المثال (اكتب في أول خانة وامسح أول عنصر)، وبعدين اشرح اللي حصل بصوتك في ٣٠ ثانية باستخدام كلمة «reconciliation».`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم React بتشتغل إزاي من جوه مش بس بتستخدمها، وإن الـ bugs اللي شكلها غريب (نص بيتنقل لصف تاني) ليها سبب منطقي.",
            how: R`نقط لو اتسألت أكتر: الـ virtual DOM مجرد objects بتوصف الشاشة، والـ reconciliation هي خوارزمية المقارنة (O(n) بالفرضيتين بدل O(n³))، والـ commit هو تطبيق الفرق على الـ DOM. Fiber هو الـ data structure اللي بيخلي الشغل ده يتقسم ويتوقف ويكمّل (عشان الـ transitions). والـ key مش بس للـ lists: تغيير الـ key على component بيجبر React تعمله من جديد (reset للـ state). والـ index مقبول لو الـ list ثابتة ومفيش state جوه عناصرها.`,
            when: R`«ليه React محتاجة key؟»، و «إيه اللي بيحصل لو key اتكرر؟» (warning، وعناصر ممكن تتدمج أو تختفي)، و «Math.random() كـ key؟» (كل render عنصر جديد: state بتروح و focus بيضيع وأبطأ)، و «إزاي تعمل reset لفورم لما المستخدم يتغير؟» (key).`,
            mistakes: R`«الـ virtual DOM أسرع من الـ DOM» من غير شرح (هو مش أسرع، هو بيقلل التعديلات على الـ DOM ويخليك تكتب declarative). و «الـ key عشان الأداء بس» (هو عشان الصحة أولًا). و «الـ key لازم يبقى فريد في الصفحة كلها» (بين الإخوات بس).`
          },
          lines: [
            "غلط لو الـ list بتتمسح أو تترتب: key 0 بيبقى عنصر تاني والـ state بتتنقل له.",
            "صح: الـ id بيمشي مع العنصر أينما راح.",
            "key على component عادي: userId جديد يعني component جديد بـ state فاضية."
          ],
          sol: R`إجابة كويسة في دقيقة: «React بتقارن شجرة العناصر الجديدة بالقديمة وتطبّق الفرق، ودي الـ reconciliation. في الـ lists بتطابق العناصر بالـ key. لو الـ key هو الـ index ومسحت أول عنصر، التاني بياخد key 0، فـ React بتفتكره نفس العنصر وتحتفظ بالـ state والـ DOM بتوعه، فالنص اللي كان في الصف الأول يظهر جنب العنصر التاني. الحل key ثابت من البيانات.» ولو ختمت بمثال حقيقي حصل معاك، أحسن.`
        },
        {
          cmd: "stale closure",
          title: "الـ effect أو الـ interval شايف قيمة قديمة: ليه وإزاي تصلّحه؟",
          desc: R`كل render ليه نسخة خاصة بيه من الـ props والـ state والدوال (closure). الـ effect أو الـ handler اللي اتعمل في render معين شايف قيم الـ render ده بس. لو الـ effect اشتغل مرة ([[[]]]) وجواه [[setInterval]] بيقرا [[count]]، هيفضل شايف [[count]] بتاعة أول render (0) للأبد. الحل حسب الحالة: حط القيمة في الـ dependencies (والـ effect يتعاد)، أو استخدم الـ updater [[setCount(c => c + 1)]] فمش محتاج تقرا القيمة أصلًا، أو [[useEffectEvent]] (React 19.2) للجزء اللي محتاج أحدث قيمة من غير ما يعيد تشغيل الـ effect، أو ref.`,
          example: R`useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000)
  return () => clearInterval(id)
}, [])
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000)
  return () => clearInterval(id)
}, [])`,
          try: R`اكتب الاتنين في component وشوف الأول واقف عند 1 للأبد. وبعدين اشرح ليه [[eslint-disable-next-line react-hooks/exhaustive-deps]] على الأول كان هيخبّي الـ bug.`,
          flag: "script",
          deep: {
            why: "أشهر bug في الـ hooks، وبيختبر إنك فاهم إن الـ component دالة بتتنادى من الأول كل مرة، مش object عايش.",
            how: R`نقط أكتر: الـ linter [[exhaustive-deps]] موجود عشان يمنع ده، وتسكيته غالبًا غلط. و [[useEffectEvent]]: [[const onTick = useEffectEvent(() => log(count))]] دالة بتشوف أحدث قيم ومبتتحطش في الـ deps، للأجزاء اللي «event» جوه effect (زي analytics بالـ theme الحالي وانت فاتح اتصال بـ roomId). والـ objects والدوال في الـ deps بتتقارن بالمرجع فبتعمل loop (درس dependency array).`,
            when: R`«ليه العداد واقف عند 1؟»، و «إمتى تستخدم الـ updater function؟»، و «إيه اللي بيحصل لو شلت dependency عشان الـ effect بيشتغل كتير؟»، و «useEffectEvent بيحل إيه؟».`,
            mistakes: R`«React bug». و «هحط count في الـ deps» من غير ما تلاحظ إن الـ interval هيتعمل ويتلغي كل ثانية (شغال بس مش أنضف حل). و «useRef لكل حاجة» كأول حل.`
          },
          lines: [
            "effect بيشتغل مرة واحدة.",
            "count هنا 0 للأبد (closure أول render)، فكل ثانية «خليها 1».",
            "cleanup.",
            "الـ deps فاضية، والـ linter كان هيحذّر.",
            "الصح:",
            "الـ updater بياخد آخر قيمة، فمش محتاج count خالص.",
            "cleanup.",
            "فاضية وصح هنا، لأن مفيش قيمة من الـ render جوه."
          ],
          sol: R`الأول بيعرض 1 ويقف: كل ثانية بيحط [[0 + 1]]. التاني بيعد 1، 2، 3. تسكيت الـ linter على الأول كان هيشيل التحذير بس والـ bug يفضل، لأن المشكلة إن الـ effect بيقرا قيمة من الـ render ومش معلن عنها. الإجابة في الانترفيو: «الـ closure بتاع أول render، والحل الـ updater لأنه مش محتاج يقرا القيمة».`
        },
        {
          cmd: "batching",
          title: "لو ناديت setState تلات مرات، كام render هيحصل؟ (state batching)",
          desc: R`Render واحد. React بتجمع كل الـ setState اللي بتحصل في نفس الـ event (أو نفس الـ tick) وتعمل render واحد في الآخر، ودي الـ batching. من React 18 ده بيحصل في كل مكان (automatic batching): جوه [[setTimeout]] و promises و native events كمان، مش في handlers بتوع React بس زي زمان. وعشان كده [[setState]] مبتغيّرش القيمة فورًا: [[console.log(count)]] بعدها على طول بيطبع القديمة. ولو محتاج تحسب من القيمة الجديدة استخدم الـ updater، ولو محتاج الـ DOM يتحدث فورًا (نادرًا) فيه [[flushSync]].`,
          example: R`function handleClick() {
  setCount(count + 1)
  setCount(count + 1)
  setCount(c => c + 1)
  console.log(count)
}
setTimeout(() => { setA(1); setB(2) }, 0)`,
          try: R`حط [[console.log('render')]] في component ودوس زرار بالـ handler ده: كام render؟ وكام القيمة النهائية لو count كانت 0؟ جاوب قبل ما تجرّب.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن setState بيطلب render مش بيعمله، والفرق بين القيمة والـ updater، وده أساس bugs كتير.",
            how: R`React بتحط التحديثات في طابور للـ component، وفي الآخر تحسبها بالترتيب: [[count + 1]] (قيمة ثابتة 1)، و [[count + 1]] (1 تاني)، و [[c => c + 1]] (بياخد 1 ويطلّع 2). فالنتيجة 2 مش 3، و render واحد. قبل React 18، التحديثات جوه [[setTimeout]] أو [[fetch().then]] كانت بتعمل render لكل setState. [[flushSync(() => setX(1))]] بيجبر render فوري (مثلًا عشان تعمل scroll لعنصر لسه متضاف).`,
            when: R`«ليه console.log بعد setState بيطبع القديم؟»، و «إيه اللي اتغير في React 18؟»، و «setState sync ولا async؟» (مش async بمعنى promise، هو بيتأجل لحد ما الـ event يخلص).`,
            mistakes: R`«setState async فلازم await»: مبترجعش promise. و «كل setState بتعمل render». ونسيان إن [[count]] ثابتة جوه الـ render ده.`
          },
          lines: [
            "handler واحد.",
            "«خليها count + 1»، و count هنا 0.",
            "نفس الكلام: لسه 0 + 1.",
            "updater: آخر قيمة في الطابور + 1.",
            "لسه القيمة القديمة: التحديث مستني آخر الـ handler.",
            "قفلة.",
            "من React 18: الاتنين في render واحد حتى جوه setTimeout."
          ],
          sol: R`Render واحد، والقيمة النهائية 2 (مش 3)، والـ console بيطبع 0. (ده نفس مثال درس useState في المستوى الأول.) في Strict Mode هتشوف «render» مرتين، بس ده نفس الـ render متنادي مرتين للكشف، مش تلاتة.`
        },
        {
          cmd: "controlled ولا uncontrolled؟",
          title: "الفرق بين controlled و uncontrolled components، وتختار إمتى؟",
          desc: R`Controlled: قيمة الخانة جاية من state ([[value]] مع [[onChange]])، فـ React مصدر الحقيقة، وتقدر تتحقق وانت بتكتب وتغيّر القيمة من الكود. Uncontrolled: الـ DOM بيمسك القيمة ([[defaultValue]])، وبتقراها وقت الإرسال بـ FormData أو ref، وده أخف (مفيش render مع كل حرف). react-hook-form uncontrolled من جوه عشان الأداء، و Actions في React 19 بتشتغل بـ FormData. أختار controlled لما محتاج القيمة لحظيًا (زرار بيتقفل، أو بحث بيفلتر، أو خانة بتأثر على خانة)، و uncontrolled أو RHF للفورمات العادية. ونفس الفكرة في الـ components بتاعتي: أدعم الاتنين بـ [[value]] و [[defaultValue]] (درس controlled ولا uncontrolled API).`,
          example: R`<input value={email} onChange={e => setEmail(e.target.value)} />
<input name="email" defaultValue="" />
<input type="file" name="avatar" />`,
          try: R`اكتب فورم بخانتين بالطريقتين، وحط [[console.log('render')]] واكتب ١٠ حروف في كل واحد. وبعدين اشرح ليه [[<input type="file">]] دايمًا uncontrolled.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتختار الأداة حسب الحاجة، وفاهم تمن كل اختيار (renders مقابل تحكم).",
            how: R`نقط أكتر: التحذير «A component is changing an uncontrolled input to be controlled» بيجي لما [[value]] تبدأ [[undefined]] وبعدين تبقى نص (الحل [[?? '']]). و [[value]] من غير onChange بيعمل الخانة read-only. والـ file input قيمته [[File]] والمتصفح مبيسمحش للكود يحطها لأسباب أمان. و reset للـ uncontrolled بـ [[form.reset()]] أو تغيير الـ key.`,
            when: R`«ليه react-hook-form أسرع من Formik؟» (uncontrolled وrenders أقل)، و «إزاي تعمل reset لفورم uncontrolled؟»، و «صمم API لـ component بتاعك يدعم الاتنين».`,
            mistakes: R`«uncontrolled غلط ودايمًا استخدم controlled». و «controlled أبطأ دايمًا» (لفورم صغير الفرق مش محسوس). ونسيان الـ file input.`
          },
          lines: [
            "controlled: القيمة من state وكل حرف بيرجع لها، يعني render مع كل حرف.",
            "uncontrolled: قيمة أولى والمتصفح يمسك الباقي، وتتقري بالـ name وقت الإرسال.",
            "الملفات دايمًا uncontrolled: الكود ميقدرش يحط ملف في الخانة."
          ],
          sol: R`الـ controlled بيطبع render مع كل حرف (١٠ مرات)، والـ uncontrolled مرة واحدة بس. الـ file input: المتصفح مش بيسمح لـ JavaScript يحط قيمة فيه (غير إنه يفضّيه)، عشان موقع ميقدرش يختار ملف من جهازك ويرفعه من غير ما تختاره انت، فمينفعش يبقى [[value]] من state.`
        },
        {
          cmd: "context ولا store",
          title: "Context ولا Zustand/Redux ولا React Query؟ الـ state بتاعتك مكانها فين؟",
          desc: R`أول سؤال: البيانات دي جاية من السيرفر ولا من الفرونت؟ بيانات السيرفر (منتجات، وطلبات، والمستخدم من API) مكانها React Query أو RTK Query: الكاش والـ refetch والـ loading مشكلتهم. الـ client state: لو component واحد محتاجها، [[useState]] جواه. لو شوية components قريبين، ارفعها للأب. لو كتير وبعيدين وبتتغير نادرًا (ثيم، ولغة، والمستخدم الحالي)، Context. لو كتير وبتتغير كتير وكل واحد محتاج جزء (سلة، ومحرر، و filters معقدة)، store زي Zustand أو Redux، لأن الـ selectors بتخلي كل component يعيد الرسم بس لما الجزء بتاعه يتغير. والـ URL للي المستخدم ممكن يشاركه. Context مش state manager: هو وسيلة توصيل، وأي تغيير في قيمته بيعيد رسم كل اللي بيقروه.`,
          example: R`const { data: products } = useQuery(productQueries.list(filters))
const { theme } = useTheme()
const count = useCartStore(s => s.items.length)
const [open, setOpen] = useState(false)
const [params] = useSearchParams()`,
          try: R`خد تطبيق عندك (أو المشروع اللي بتبنيه) واعمل جدول: كل قطعة state، وجاية منين، ومين بيقراها، وبتتغير قد إيه، وهي فين دلوقتي. لاقي حاجة واحدة في المكان الغلط.`,
          flag: "script",
          deep: {
            why: "سؤال تصميم بيبان منه خبرتك: الناس اللي بتحط كل حاجة في Redux أو كل حاجة في Context بتعمل تطبيقات بطيئة وصعبة. الإجابة الكويسة بتقسّم حسب مصدر البيانات ومعدل التغيير.",
            how: R`ليه Context بطيء للحاجات اللي بتتغير كتير: أي component بيعمل [[useContext]] بيعيد الرسم مع أي تغيير في القيمة، حتى لو بيقرا جزء، ومفيش selectors. تقدر تقسّمه لـ contexts أصغر، بس بعد حد معين ده بيبقى store بإيدك. الـ stores الخارجية مبنية على [[useSyncExternalStore]]: كل component بيشترك بـ selector. وبيانات السيرفر في Redux أو Context معناها إنك بتكتب كاش بإيدك وبتنسى الـ invalidation. ومثال مشاكل حقيقية: context فيه بيانات السلة من API بـ loading و error يدوي، أو store ضخم كل الـ components بتقراه من غير selector (دروس useContext و Zustand).`,
            when: R`«إمتى تستخدم Redux؟»، و «Context بيعمل re-render لإيه؟»، و «server state و client state الفرق؟»، و «لو هتبني checkout من ٣ خطوات، الـ state فين؟» (reducer + context في الصفحة، أو Zustand لو محتاجها تفضل بعد refresh مع persist).`,
            mistakes: R`«Redux عشان التطبيق كبير» من غير سبب. و «Context بدل Redux دايمًا». ونسيان React Query خالص وحط بيانات الـ API في useState و effect. ونسيان الـ URL كمكان للـ state.`
          },
          lines: [
            "بيانات سيرفر: React Query.",
            "حاجة قليلة التغيير وكل التطبيق محتاجها: context.",
            "client state مشتركة بتتغير كتير: store بـ selector.",
            "state محلية: جوه الـ component.",
            "حاجة المستخدم يشاركها: الـ URL."
          ],
          sol: R`جدول كويس بيطلع فيه غالبًا حاجة من دول: بيانات API محفوظة في useState أو store (لازم تروح React Query)، أو فلاتر في state بتضيع مع الـ refresh (لازم تروح الـ URL)، أو state في App محدش بيستخدمها غير component واحد تحت (لازم تنزل له)، أو context واحد كبير فيه حاجات بتتغير بسرعات مختلفة (يتقسم). لو ملقتش ولا حاجة، يا إما التطبيق صغير يا إما بص تاني.`
        },
        {
          cmd: "SSR و hydration",
          title: "SSR يعني إيه في React، والـ hydration بيعمل إيه؟",
          desc: R`SSR إن الـ components تترسم HTML على السيرفر ([[renderToString]] زمان، و [[renderToPipeableStream]] أو [[renderToReadableStream]] دلوقتي مع streaming)، فالمستخدم ومحركات البحث بيشوفوا المحتوى قبل ما الـ JS يتحمّل. بعدين في المتصفح، [[hydrateRoot]] بترسم نفس الـ components وتربط الـ events بالـ DOM الموجود بدل ما تعمله من جديد، ودي الـ hydration. لازم الناتج يبقى هو هو في الاتنين، وإلا hydration mismatch. SPA زي Vite مفيهاش SSR: الـ HTML فاضي ([[<div id="root">]]) والمتصفح بيرسم كل حاجة. وفي Next.js ده بيحصل لوحده، ومع Server Components فيه طبقة تانية (تاب Next.js، أسئلة الانترفيو).`,
          example: R`// server
const html = renderToString(<App url={req.url} />)
res.send($__bt<div id="root">$__{html}</div><script src="/client.js"></script>$__bt)
// client
hydrateRoot(document.getElementById('root')!, <App url={location.pathname} />)
// SPA: createRoot(document.getElementById('root')!).render(<App />)`,
          try: R`افتح موقع Next.js ومشروع Vite، واعمل View Source على الاتنين: فين المحتوى؟ وبعدين في Next، اقفل JavaScript من DevTools (Command menu > Disable JavaScript) واعمل refresh: إيه اللي شغال وإيه اللي لأ؟`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الفرق بين «فين الـ HTML بيتعمل» و «إمتى الصفحة تبقى تفاعلية»، وده أساس أي نقاش عن Next.js والأداء والـ SEO.",
            how: R`الترتيب: السيرفر بيبعت HTML كامل (المستخدم بيشوف المحتوى بسرعة، FCP و LCP أحسن)، وبعدين الـ JS يتحمّل، وبعدين hydration (لحد ما تخلص الزراير شكلها موجود بس مبتشتغلش). الـ streaming بيبعت الـ HTML على أجزاء مع Suspense، و selective hydration في React 18 بيعمل hydration للجزء اللي المستخدم داس عليه الأول. أسباب الـ mismatch: [[Date.now()]]، و [[Math.random()]]، و [[window]] في الـ render، و localStorage، و HTML مش صالح. والحل القيم الخاصة بالمتصفح في effect بعد الـ hydration.`,
            when: R`«SSR ولا CSR؟»، و «ليه الزرار مش شغال في أول ثانية؟» (لسه متعملّهاش hydration)، و «إيه اللي بيعمل hydration error؟»، و «SSR بيحسّن الـ SEO إزاي؟».`,
            mistakes: R`«SSR معناه مفيش JS». و «hydration يعني الـ render من الأول» (لأ، بيعيد استخدام الـ DOM). و «SPA مينفعش تتأرشف خالص» (جوجل بيشغّل JS بس أبطأ وأقل ضمانًا).`
          },
          lines: [
            "على السيرفر: ارسم التطبيق HTML.",
            "ابعته جوه الصفحة ومعاه الـ JS.",
            "في المتصفح: نفس الـ App، وربط الـ events بالـ HTML الموجود. (في SPA بدلها createRoot بيرسم من الصفر.)"
          ],
          sol: R`View Source في Next: المحتوى كله موجود كـ HTML. في Vite: [[<div id="root"></div>]] فاضي وملفات JS بس. من غير JavaScript: صفحة Next بتظهر بالمحتوى واللينكات العادية شغالة (تنقل كامل)، بس أي زرار بيعتمد على onClick مش شغال (إلا الفورمات اللي بـ Server Actions، بتتبعت كفورم عادي). وموقع Vite صفحة بيضا.`
        },
        {
          cmd: "useLayoutEffect",
          title: "useEffect ولا useLayoutEffect؟",
          desc: R`الاتنين بيشتغلوا بعد ما React تعدّل الـ DOM، والفرق إمتى: [[useLayoutEffect]] بيشتغل قبل ما المتصفح يرسم الشاشة (sync)، و [[useEffect]] بعد الرسم. فلو محتاج تقيس عنصر وتغيّر حاجة على أساسه (مكان tooltip، أو ارتفاع textarea) قبل ما المستخدم يشوف، useLayoutEffect بيمنع الوميض: المستخدم مش هيشوف الـ tooltip في المكان الغلط لحظة. بس لأنه بيوقف الرسم، أي شغل تقيل فيه بيبطّأ الصفحة، فالقاعدة: useEffect دايمًا، و useLayoutEffect بس لقياس الـ layout وتعديله. وعلى السيرفر مبيشتغلش خالص.`,
          example: R`function Tooltip({ anchor, children }: { anchor: DOMRect; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(anchor.bottom)
  useLayoutEffect(() => {
    const height = ref.current!.getBoundingClientRect().height
    if (anchor.bottom + height > window.innerHeight) setTop(anchor.top - height)
  }, [anchor])
  return <div ref={ref} style={{ position: 'fixed', top, left: anchor.left }}>{children}</div>
}`,
          try: R`حط الـ Tooltip ده قريب من آخر الشاشة، وغيّر [[useLayoutEffect]] لـ [[useEffect]]، واعمل CPU throttling 6x: هتلاقي الـ tooltip بيظهر تحت لحظة وبعدين ينط فوق.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم دورة render ثم commit ثم paint، وإن الأداة الأقوى مش دايمًا الأحسن.",
            how: R`الترتيب: render (حساب الـ JSX)، و commit (تعديل الـ DOM)، و useLayoutEffect (sync، والمتصفح لسه مرسمش)، و paint، و useEffect. أي setState جوه useLayoutEffect بيعمل render تاني sync قبل الـ paint، فالمستخدم بيشوف النتيجة النهائية بس. ومكتبات الـ positioning (Floating UI) بتستخدمه. وفي SSR بيطبع warning زمان (React 18) لأنه مبيشتغلش على السيرفر، و [[useInsertionEffect]] نوع تالت لمكتبات CSS-in-JS بس.`,
            when: R`«ليه الـ tooltip بيومض؟»، و «ترتيب الـ effects إيه؟»، و «useLayoutEffect في Next.js بيعمل إيه؟».`,
            mistakes: R`«useLayoutEffect أسرع فاستخدمه دايمًا» (هو بيوقف الرسم). وجلب بيانات جواه. ونسيان إنه مش بيشتغل على السيرفر.`
          },
          lines: [
            "tooltip بياخد مكان العنصر اللي بيشاور عليه.",
            "ref عشان نقيس الـ tooltip نفسه.",
            "مبدئيًا تحت العنصر.",
            "قبل ما المتصفح يرسم:",
            "قيس ارتفاع الـ tooltip.",
            "لو هيخرج برا الشاشة، حطه فوق. الـ render ده بيحصل قبل الرسم، فمفيش وميض.",
            "كل ما العنصر يتحرك.",
            "الـ tooltip في مكانه.",
            "قفلة."
          ],
          sol: R`بـ useEffect والـ throttling: فريم أو اتنين الـ tooltip تحت العنصر ومقصوص من الشاشة، وبعدين ينط فوق. بـ useLayoutEffect: بيظهر فوق على طول. الإجابة: «useLayoutEffect بيشتغل بعد تعديل الـ DOM وقبل الـ paint، فالتصحيح بيبان في نفس الفريم».`
        },
        {
          cmd: "قواعد الـ hooks",
          title: "ليه الـ hooks مينفعش تتنادى جوه if أو loop؟",
          desc: R`لأن React مبتعرفش الـ hook بالاسم، بتعرفه بترتيبه. أول [[useState]] في الـ component ليه الخانة الأولى في list محفوظة للـ component ده، والتاني التانية، وهكذا. لو hook اتنادى جوه [[if]] ومرة اتنادى ومرة لأ، الترتيب يتزحلق: التاني ياخد خانة الأول، والـ state تتلخبط، و React بترمي «Rendered fewer hooks than expected». القاعدتين: hooks في أعلى مستوى من الـ component أو custom hook بس (مش جوه if أو loop أو بعد early return أو في دالة عادية)، ومن components أو custom hooks بس. الاستثناء الوحيد [[use()]] في React 19، ينفع جوه if. والـ linter [[react-hooks/rules-of-hooks]] بيمسك ده.`,
          example: R`function Profile({ userId }: { userId?: string }) {
  if (!userId) return <p>Sign in</p>
  const [tab, setTab] = useState('info')
  return <Tabs value={tab} onChange={setTab} />
}
function ProfileFixed({ userId }: { userId?: string }) {
  const [tab, setTab] = useState('info')
  if (!userId) return <p>Sign in</p>
  return <Tabs value={tab} onChange={setTab} />
}`,
          try: R`ارسم [[Profile]] بـ userId، وبعدين غيّره لـ undefined، وبعدين رجّعه (بزرار في الأب). اقرا الـ error. بعدين اكتب نفس المثال بـ [[useQuery]] جوه [[ids.map]] واعرف ليه [[useQueries]] موجودة.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إزاي الـ hooks شغالة من جوه، مش حافظ القاعدة وخلاص.",
            how: R`React بتحفظ لكل component (fiber) linked list من الـ hooks. في كل render بتمشي عليها بالترتيب مع كل نداء. عشان كده الاسم مش مهم والترتيب هو كل حاجة. الـ custom hooks مجرد دوال بتنادي hooks، فالنداءات جواها بتتحسب في ترتيب الـ component اللي ناداها. و [[use(promise)]] و [[use(Context)]] مختلفين لأنهم مش بيحفظوا state في الخانات دي. و React Compiler بيعتمد على القواعد دي عشان يعرف يحلل الكود.`,
            when: R`«ليه hooks ليها قواعد؟»، و «إزاي React بتعرف أنهي state لأنهي useState؟»، و «ينفع hook جوه loop لو عدد اللفات ثابت؟» (تقنيًا بيشتغل، بس القاعدة ممنوع والـ linter هيرفض، واستخدم useQueries أو component لكل عنصر)، و «اكتب useDebounce» (درس custom hook).`,
            mistakes: R`«عشان React قالت كده». و hook بعد early return. و [[use]] في أول اسم دالة مفيهاش hooks، أو العكس دالة فيها hooks من غير use فالـ linter ميفحصهاش.`
          },
          lines: [
            "component فيه early return.",
            "لو مفيش user، ارجع بدري...",
            "...فالـ useState ده ساعات بيتنادى وساعات لأ: الترتيب بيتكسر.",
            "بيرسم.",
            "قفلة.",
            "الصح:",
            "كل الـ hooks فوق، قبل أي return.",
            "وبعدين الشرط.",
            "بيرسم.",
            "قفلة."
          ],
          sol: R`لما userId يبقى undefined بعد ما كان موجود: React بتلاقي hooks أقل من المرة اللي فاتت وبترمي «Rendered fewer hooks than expected. This may be caused by an accidental early return statement.» (والعكس «Rendered more hooks»). و [[ids.map(id => useQuery(...))]] بيكسر نفس القاعدة لما عدد الـ ids يتغير، و [[useQueries]] hook واحد بياخد array، فالعدد بتاع الـ hooks ثابت مهما كان عدد الـ queries.`
        }
      ]
    }
]);

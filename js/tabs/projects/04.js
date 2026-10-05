// تكملة تاب projects: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/projects/01.js (شرح حقول الدرس في أوله)
MORE("projects", [
    {
      t: "مشروع ٤: React SPA بجدول وفلترة",
      l: 2,
      n: "Vite و React Router و TanStack Query، وجدول بفلترة وصفحات في الـ URL، و API وهمي بـ MSW، واختبارات Testing Library",
      items: [
        {
          cmd: "مشروع ٤: الـ spec والـ setup",
          title: "تجهز مشروع React فيه router و React Query من أول يوم إزاي؟",
          desc: R`المشروع: لوحة منتجات لمتجر. صفحة فيها جدول المنتجات، وبحث بالاسم، وفلتر بالقسم، وصفحات (١٠ في الصفحة)، وكل منتج لينك لصفحة تفاصيله. الـ backend مش موجود لسه، فالـ API وهمي بـ MSW، ونفس الـ handlers بتشتغل في المتصفح وفي الاختبارات. ولما الـ API الحقيقي يجهز (مشروع ٥ أو أي API عام)، مش هتغيّر ولا سطر في الكومبوننتات.

ده أقرب حاجة لشغل frontend حقيقي في شركة: لوحة أدمن بتعرض داتا من API، وفلاتر لازم تتحفظ في الرابط، وحالات تحميل وخطأ، واختبارات.

المحطة دي: المشروع شغال بصفحتين فاضيين. خلصت يعني: (١) [[npm run dev]] بيفتح، و [[/]] و [[/products/1]] و [[/xyz]] كل واحد بيعرض حاجة. (٢) [[QueryClientProvider]] حوالين الـ router. (٣) الـ routes في array متصدّر، عشان الاختبارات تستخدم نفسه مع [[createMemoryRouter]]. (٤) [[npm run build]] بيعمل typecheck قبل الـ build.

الدروس: [[npm create vite]] و [[React Router]] و [[useQuery]] و [[staleTime و gcTime]] في تاب «React»، و [[tsc --noEmit]] في تاب «فحص الكود».`,
          example: R`export const routes: RouteObject[] = [
  {
    path: '/', Component: Layout, children: [
      { index: true, Component: ProductsPage },
      { path: 'products/:id', Component: ProductPage },
      { path: '*', Component: () => <main><h1>الصفحة مش موجودة</h1></main> },
    ],
  },
]

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } })
const router = createBrowserRouter(routes)

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}`,
          try: R`[[npm create vite@latest p4-products -- --template react-ts]]، وركّب [[react-router]] و [[@tanstack/react-query]]. اعمل [[App.tsx]] بـ layout و ٣ routes، و [[ProductsPage]] و [[ProductPage]] بيعرضوا عنوان بس. اعمل [[npm run dev]] وافتح الـ ٣ مسارات، وبعدين [[npm run build]] و [[npx vite preview]] وافتح [[/products/1]] مباشرة (refresh): شغال؟`,
          flag: "script",
          deep: {
            why: R`الـ router و React Query هما العمود الفقري لأي SPA حقيقي. لو بدأت من غيرهم وقلت «هضيفهم بعدين»، هتلاقي نفسك بتكتب [[useEffect]] و [[fetch]] و [[useState]] للتحميل في كل كومبوننت، وبعدين تعيد كتابة كل ده. وتصدير الـ routes من أول يوم بيخلي الاختبارات ترسم التطبيق كله على أي URL.`,
            how: R`[[QueryClient]] واحد للتطبيق كله، متعرّف برّه الكومبوننت عشان ميتعملش من جديد مع كل render. و [[staleTime: 30_000]]: الداتا بتعتبر جديدة ٣٠ ثانية، فالتنقل بين الصفحات والرجوع مبيعملش طلب جديد كل مرة. الافتراضي صفر، يعني أي mount بيعمل refetch.

الـ routes بـ [[Component]] (مش [[element]]): الـ data mode في React Router. الـ [[Layout]] بيرسم الـ header و [[<Outlet />]]، والصفحات بتترسم مكانه. و [[path: '*']] لأي مسار ملوش route.

[[createBrowserRouter(routes)]] للتطبيق، و [[createMemoryRouter(routes, { initialEntries })]] للاختبارات (مفيش شريط عنوان في jsdom). نفس الـ array.

والـ SPA محتاج السيرفر يرجّع [[index.html]] لأي مسار. [[vite preview]] بيعمل كده لوحده. في Nginx [[try_files $uri /index.html]] (درس [[SPA]] في تاب «nginx»)، و Netlify و Vercel ليهم إعداد.

و [["build": "tsc --noEmit && vite build"]]: Vite مبيعملش typecheck، بيمسح الأنواع ويبني بس. من غير [[tsc]]، خطأ نوع يعدّي للإنتاج.`,
            when: R`أي SPA فيها أكتر من شاشة وبتجيب داتا من API. لو المشروع محتاج SEO (صفحات عامة لازم تظهر في جوجل)، Next.js أنسب (مشروع ٦).`,
            mistakes: R`[[new QueryClient()]] جوه الكومبوننت فالكاش يتمسح مع كل render. أو [[react-router-dom]] و [[react-router]] بنسخ مختلفة. أو الـ routes جوه [[App]] فالاختبارات متقدرش توصلها. أو تنسى الـ fallback على السيرفر فالـ refresh على أي صفحة غير الرئيسية يدّي 404. أو [[staleTime]] صفر وتستغرب من الطلبات الكتير في Network.`
          },
          lines: [
            R`الـ routes في array متصدّر، التطبيق والاختبارات بيستخدموه.`,
            R`الـ route الأب.`,
            R`كل المسارات تحت [[Layout]].`,
            R`[[/]]: صفحة الجدول.`,
            R`[[/products/:id]]: التفاصيل، و [[:id]] بيتقري بـ [[useParams]].`,
            R`أي مسار تاني: صفحة «مش موجودة».`,
            R`قفلة الـ children.`,
            R`قفلة الـ route.`,
            R`قفلة الـ array.`,
            R`كاش واحد للتطبيق، والداتا جديدة لمدة ٣٠ ثانية.`,
            R`router المتصفح من نفس الـ routes.`,
            R`الكومبوننت الرئيسي:`,
            R`بيرجّع:`,
            R`React Query حوالين كل حاجة، عشان أي صفحة تقدر تستخدم [[useQuery]].`,
            R`والـ router جواه.`,
            R`قفلة.`,
            R`قفلة الـ return.`,
            R`قفلة الكومبوننت.`
          ],
          sol: R`بعد المحطة: [[/]] بيعرض «المنتجات»، و [[/products/1]] «منتج»، و [[/xyz]] «الصفحة مش موجودة»، والـ header ثابت في التلاتة. [[npm run build]] بيعمل [[tsc --noEmit]] وبعدين [[vite build]] وبيطلّع [[dist/]]. و [[vite preview]] بيخدم [[/products/1]] بعد refresh.

الحل المرجعي فيه [[package.json]] بالنسخ اللي اتجرّبت (React 19، و React Router 8، و TanStack Query 5، و Vite 8، و Vitest 5، و MSW 3، و TypeScript 7) و [[main.tsx]] و [[App.tsx]] و [[vite.config.ts]]. [[main.tsx]] فيه تشغيل MSW في الـ dev بس، ده للمحطة الجاية.

لو شفت كل طلب بيتعمل مرتين في الـ dev: ده [[StrictMode]]، بيعمل mount و unmount و mount عشان يطلّع مشاكل الـ effects. في الـ build مبيحصلش.`,
          solCode: R`// ── package.json ──
{
  "name": "p4-products",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.104.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "react-router": "^8.4.0"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.2",
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@testing-library/user-event": "^14.6.7",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.1",
    "jsdom": "^30.1.1",
    "msw": "^3.0.0",
    "typescript": "^7.0.2",
    "vite": "^8.3.1",
    "vitest": "^5.0.2"
  },
  "msw": {
    "workerDirectory": [
      "public"
    ]
  }
}

// ── vite.config.ts ──
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] },
})

// ── src/main.tsx ──
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

async function enableMocking() {
  if (!import.meta.env.DEV) return
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledFrame: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
})

// ── src/App.tsx ──
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, Link, Outlet, type RouteObject } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { ProductsPage } from './features/products/ProductsPage'
import { ProductPage } from './features/products/ProductPage'

function Layout() {
  return (
    <>
      <header><Link to="/">المتجر</Link></header>
      <Outlet />
    </>
  )
}

export const routes: RouteObject[] = [
  {
    path: '/', Component: Layout, children: [
      { index: true, Component: ProductsPage },
      { path: 'products/:id', Component: ProductPage },
      { path: '*', Component: () => <main><h1>الصفحة مش موجودة</h1></main> },
    ],
  },
]

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } })
const router = createBrowserRouter(routes)

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}`
        },
        {
          cmd: "مشروع ٤: API وهمي بـ MSW",
          title: "تبني الواجهة قبل ما الـ backend يجهز إزاي؟",
          desc: R`اكتب API وهمي بـ MSW بيتصرف زي API حقيقي: [[GET /api/products?q=&category=&page=&pageSize=]] بيرجّع [[{ items, total, page, pageSize }]]، و [[GET /api/products/:id]] بيرجّع المنتج أو 404، و [[GET /api/categories]]. واكتب [[api/products.ts]] فيه دوال الـ fetch والأنواع.

خلصت يعني: (١) ٣٤ منتج في ٣ أقسام، والفلترة والصفحات بتحصل في الـ handler. (٢) في الـ dev، Network في DevTools بيوري الطلبات، و Console بيقول [[[MSW] Mocking enabled]]. (٣) الـ handler فيه [[delay]] عشان حالة التحميل تبان. (٤) [[fetch]] بيرمي [[HttpError]] فيه الـ status لو الرد مش ok. (٥) الـ query keys من factory واحد. (٦) في الـ build، MSW مش موجود في البندل.

الدروس: [[MSW]] و [[query key factory]] في تاب «React»، و [[typed fetch]] في تاب «TypeScript»، و [[offset pagination]] و [[filter و sort]] في تاب «APIs متقدمة».`,
          example: R`  http.get('/api/products', async ({ request }) => {
    await delay(150)
    const url = new URL(request.url)
    const q = url.searchParams.get('q')?.trim() ?? ''
    const category = url.searchParams.get('category') ?? ''
    const pageSize = Math.min(50, Number(url.searchParams.get('pageSize')) || 10)
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
    const filtered = products.filter(p => (!q || p.name.includes(q)) && (!category || p.category === category))
    const items = filtered.slice((page - 1) * pageSize, page * pageSize)
    return HttpResponse.json({ items, total: filtered.length, page, pageSize })
  }),`,
          try: R`[[npm i -D msw]] و [[npx msw init public --save]]. اكتب الـ handlers، و [[mocks/browser.ts]] بـ [[setupWorker]]، و [[mocks/node.ts]] بـ [[setupServer]]، وشغّل الـ worker في [[main.tsx]] لو [[import.meta.env.DEV]]. افتح Console واكتب [[await (await fetch('/api/products?category=مطبخ&page=2')).json()]]: كام منتج في الصفحة وكام الـ total؟`,
          flag: "script",
          deep: {
            why: R`لو استنيت الـ backend، الـ frontend هيتأخر، وهتبني على داتا في [[useState]] ثابتة شكلها مختلف عن الحقيقي. MSW بيمسك الطلب على مستوى الشبكة (service worker في المتصفح، و interceptor في Node)، فالكود بتاعك بيعمل [[fetch]] حقيقي من غير ما يعرف. ولما الـ API الحقيقي يجهز، بتقفل MSW وخلاص. ونفس الـ handlers هي الـ API في الاختبارات.`,
            how: R`الـ handler بياخد [[request]]، و [[new URL(request.url).searchParams]] بيقرا الـ query. الفلترة بـ [[filter]] والصفحة بـ [[slice((page - 1) * pageSize, page * pageSize)]]. و [[Math.min(50, ...)]] على الـ pageSize، زي ما API حقيقي بيعمل عشان محدش يطلب مليون صف.

الرد فيه [[total]] مش بس [[items]]: الواجهة محتاجاه عشان تحسب عدد الصفحات، وتعرف إن النتيجة فاضية ([[total === 0]]) حتى لو الصفحة الحالية فاضية.

[[api/products.ts]]: [[getJson<T>]] بيعمل fetch و بيرمي [[HttpError]] بالـ status. ده مهم في صفحة التفاصيل: 404 معناه «مش موجود» ومفيش retry، و 500 معناه حاول تاني. و [[productKeys]] factory: [[productKeys.list(query)]] بيطلّع [[['products', 'list', { q, category, page }]]]. كده [[invalidateQueries({ queryKey: productKeys.all })]] بيمسح كل حاجة تبع المنتجات.

التشغيل في المتصفح: [[npx msw init public]] بيحط [[mockServiceWorker.js]] في [[public/]]. [[worker.start()]] بيسجّله، وبيرجّع promise لازم تستناه قبل ما ترسم التطبيق، وإلا أول الطلبات هتعدّي قبل ما الـ worker يشتغل. والـ dynamic [[import()]] جوه [[if (import.meta.env.DEV)]] بيخلي Vite يشيله من بندل الإنتاج.

MSW 3: الخيار اللي كان اسمه [[onUnhandledRequest]] في v2 بقى اسمه [[onUnhandledFrame]] (لأن MSW بقى بيمسك WebSockets كمان). لو كتبت الاسم القديم على v3، TypeScript بيقولك، بس في JavaScript هيتجاهله بهدوء وطلبات مش متغطية هتعدّي من غير ما تعرف.`,
            when: R`من أول يوم في أي frontend بيكلم API، حتى لو الـ API موجود: الاختبارات محتاجاه. ولو فيه OpenAPI للـ API الحقيقي، فيه أدوات بتولّد handlers منه.`,
            mistakes: R`الـ mock بيرجّع شكل مختلف عن الـ API الحقيقي (array بدل [[{ items, total }]])، فكل حاجة تقع يوم الربط. أو مفيش [[delay]] فحالة التحميل عمرها ما اتشافت. أو [[createRoot().render]] قبل ما [[worker.start()]] يخلص. أو MSW بيتشحن للإنتاج. أو mock بيعمل الفلترة في الواجهة (بيرجّع كل المنتجات والكومبوننت يفلتر)، فأول API حقيقي بـ ١٠٠ ألف منتج يوقّع المتصفح.`
          },
          lines: [
            R`handler لـ [[GET /api/products]]، و [[request]] هو الطلب الحقيقي.`,
            R`استنى ١٥٠ms زي شبكة حقيقية، عشان حالة التحميل تبان.`,
            R`اقرا الـ URL.`,
            R`البحث، من غير مسافات، أو فاضي.`,
            R`القسم أو فاضي.`,
            R`حجم الصفحة، افتراضي ١٠، وأقصى حاجة ٥٠.`,
            R`رقم الصفحة، أقل حاجة ١.`,
            R`فلتر بالاسم والقسم الأول.`,
            R`وبعدين خد الصفحة المطلوبة بس.`,
            R`رجّع الصفحة ومعاها [[total]] بتاع كل النتايج.`,
            R`قفلة الـ handler.`
          ],
          sol: R`[[?category=مطبخ&page=2]] بيرجّع ١ منتج في [[items]] و [[total: 11]] (١١ منتج في مطبخ، ١٠ في الصفحة الأولى وواحد في التانية). وفي Console أول ما الصفحة تفتح: [[[MSW] Mocking enabled.]] وكل طلب بيتطبع باسمه والـ status. جرّبناه في Chromium حقيقي: [[?category=كتب]] بيطلّع «12 منتج» و «صفحة 1 من 2».

الحل المرجعي فيه الـ handlers و [[browser.ts]] و [[node.ts]] و [[api/products.ts]]. الـ 404 في طلب [[/favicon.ico]] عادي: MSW بيسيب أي طلب ملوش handler يعدّي ([[onUnhandledFrame: 'bypass']] في الـ dev).

لو [[npx msw init]] نسيته: Console هيقول إن الـ worker script مش موجود (404 على [[/mockServiceWorker.js]]). ولو الطلبات بتروح للشبكة فعلًا وبتاخد 404 من Vite: الـ worker اتسجّل بعد أول طلب، أو مفيش [[await]] قبل الـ render.`,
          solCode: R`// ── src/mocks/handlers.ts ──
import { http, HttpResponse, delay } from 'msw'
import type { Product } from '../api/products'

const categories = ['كتب', 'إلكترونيات', 'مطبخ']
export const products: Product[] = Array.from({ length: 34 }, (_, i) => ({
  id: i + 1,
  name: $__bt$__{['شنطة', 'كوباية', 'سماعة', 'رواية', 'كشاف', 'مج'][i % 6]} $__{i + 1}$__bt,
  category: categories[i % 3],
  price: 50 + ((i * 37) % 450),
  stock: (i * 7) % 12,
}))

export const handlers = [
  http.get('/api/categories', () => HttpResponse.json(categories)),

  http.get('/api/products', async ({ request }) => {
    await delay(150)
    const url = new URL(request.url)
    const q = url.searchParams.get('q')?.trim() ?? ''
    const category = url.searchParams.get('category') ?? ''
    const pageSize = Math.min(50, Number(url.searchParams.get('pageSize')) || 10)
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
    const filtered = products.filter(p => (!q || p.name.includes(q)) && (!category || p.category === category))
    const items = filtered.slice((page - 1) * pageSize, page * pageSize)
    return HttpResponse.json({ items, total: filtered.length, page, pageSize })
  }),

  http.get('/api/products/:id', ({ params }) => {
    const product = products.find(p => p.id === Number(params.id))
    return product ? HttpResponse.json(product) : HttpResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
  }),
]

// ── src/mocks/browser.ts ──
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
export const worker = setupWorker(...handlers)

// ── src/mocks/node.ts ──
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
export const server = setupServer(...handlers)

// ── src/api/products.ts ──
export type Product = { id: number; name: string; category: string; price: number; stock: number }
export type ProductPage = { items: Product[]; total: number; page: number; pageSize: number }
export type ProductQuery = { q: string; category: string; page: number }

export class HttpError extends Error {
  constructor(public status: number) { super($__btHTTP $__{status}$__bt) }
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new HttpError(res.status)
  return res.json() as Promise<T>
}

export const productKeys = {
  all: ['products'] as const,
  list: (query: ProductQuery) => [...productKeys.all, 'list', query] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
}

export function fetchProducts({ q, category, page }: ProductQuery, signal?: AbortSignal) {
  const params = new URLSearchParams({ page: String(page), pageSize: '10' })
  if (q) params.set('q', q)
  if (category) params.set('category', category)
  return getJson<ProductPage>($__bt/api/products?$__{params}$__bt, signal)
}

export const fetchProduct = (id: string, signal?: AbortSignal) => getJson<Product>($__bt/api/products/$__{id}$__bt, signal)
export const fetchCategories = (signal?: AbortSignal) => getJson<string[]>('/api/categories', signal)`
        },
        {
          cmd: "مشروع ٤: الجدول والفلترة في الـ URL",
          title: "تعمل جدول بفلاتر وصفحات تتحفظ في الرابط إزاي؟",
          desc: R`صفحة [[/]]: خانة بحث، و select للقسم، وجدول، وزرارين للصفحات. الفلاتر ورقم الصفحة في الـ URL ([[?q=مج&category=مطبخ&page=2]])، والجدول بيتجاب بـ [[useQuery]] حسبهم.

خلصت يعني: (١) refresh أو فتح الرابط في تابة جديدة بيجيب نفس النتيجة. (٢) Back بيرجّع للفلتر اللي قبله، بس الكتابة في البحث مش بتعمل history لكل حرف. (٣) تغيير فلتر بيرجّع للصفحة ١. (٤) البحث بيستنى ٣٠٠ms بعد آخر حرف قبل الطلب. (٥) وانت بتقلب الصفحات، الجدول القديم بيفضل ظاهر لحد ما الجديد يوصل (مفيش وميض). (٦) الـ 4 حالات: بيحمّل، وخطأ بـ «حاول تاني»، وفاضي بـ «امسح الفلاتر»، وداتا. (٧) الجدول [[<table>]] بـ [[<caption>]] و [[scope]]، والأسعار بـ [[Intl.NumberFormat]].

الدروس: [[URL state]] و [[useQuery]] و [[TanStack Table]] (لو عايز sort و columns) في تاب «React»، و [[table]] و [[ترتيب وصفحات في الـ URL]] في تاب «HTML و CSS»، و [[debounce و throttle]] في تاب «JavaScript».`,
          example: R`export function ProductsPage() {
  const { q, category, page, update } = useProductFilters()
  const location = useLocation()
  const query = { q: useDebounced(q.trim()), category, page }
  const products = useQuery({
    queryKey: productKeys.list(query),
    queryFn: ({ signal }) => fetchProducts(query, signal),
    placeholderData: keepPreviousData,
  })
  const categories = useQuery({ queryKey: ['categories'], queryFn: ({ signal }) => fetchCategories(signal), staleTime: Infinity })
  const pages = products.data ? Math.max(1, Math.ceil(products.data.total / products.data.pageSize)) : 1`,
          try: R`اكتب [[useProductFilters]] (بيقرا ويكتب الـ search params) و [[useDebounced]] و [[ProductsPage]]. جرّب: فلتر «مطبخ» وروح الصفحة ٢، وانسخ الرابط وافتحه في تابة جديدة. اكتب «كوباية» في البحث وبص في Network: كام طلب؟ ودوس Back: رجعت فين؟ وفي Network > Throttling اختار Slow 4G وقلّب الصفحات.`,
          flag: "script",
          deep: {
            why: R`لوحة أدمن الفلاتر فيها بتضيع مع كل refresh أو كل رجوع من صفحة تفاصيل هي أكتر شكوى من المستخدمين. ورابط «المنتجات اللي خلصت في قسم المطبخ» اللي تبعته لزميلك لازم يفتح نفس الحاجة. الـ URL هو الـ state الوحيد اللي بيعيش مع refresh و Back والمشاركة من غير أي كود زيادة.`,
            how: R`[[useSearchParams]] بيدّيك [[params]] و [[setParams]]. كل حاجة بتتقري من الـ URL وقت الـ render: [[q]] و [[category]] و [[page]]. مفيش [[useState]] للفلاتر خالص. و [[update(patch)]] بتنسخ الـ params، وتحط أو تمسح، ولو التغيير مش في [[page]] بتمسح [[page]] (فلتر جديد يبدأ من الأول). و [[{ replace: 'q' in patch }]]: الكتابة في البحث بتستبدل الـ history entry بدل ما تضيف واحد لكل حرف.

الـ debounce: خانة البحث مربوطة بـ [[q]] من الـ URL مباشرة (بتتحدث مع كل حرف)، بس الـ query key بياخد [[useDebounced(q)]]، فالطلب بيتعمل بعد ٣٠٠ms من آخر حرف. والطلبات اللي اتلغت؟ React Query بيدّي [[signal]] للـ queryFn، ولما الـ key يتغير الطلب القديم بيتلغي لو محدش مستنيه.

[[placeholderData: keepPreviousData]]: لما الـ key يتغير (صفحة جديدة)، [[data]] بتفضل الداتا القديمة و [[isPlaceholderData]] بـ true لحد ما الجديدة توصل. فالجدول ميختفيش. و [[isFetching]] بيقول إن فيه طلب شغال، فبنكتب «بيحدّث...» وبنحط [[aria-busy]] على الجدول.

وخلي بالك: الـ caption ورقم الصفحة بيتعرضوا من [[products.data.page]] (الداتا الظاهرة) مش من [[page]] بتاع الـ URL. في أول نسخة من الحل كانوا من الـ URL، فلما تدوس «التالية» الـ caption بيقول «صفحة 4» والجدول لسه بيعرض صفحة 3. اختبار الصفحات هو اللي مسك ده.

و «التالية» [[disabled]] لو [[isPlaceholderData]]: عشان محدش يدوس ٥ مرات ويعدّي صفحات مش موجودة.`,
            when: R`أي قايمة فيها فلاتر أو صفحات أو ترتيب أو تابات. الـ state اللي مش محتاج يتشارك (dropdown مفتوح) يفضل [[useState]].`,
            mistakes: R`[[useState]] للفلاتر و [[useEffect]] يزامنها مع الـ URL: مصدرين للحقيقة، وbugs في الـ Back. أو [[navigate]] لكل حرف في البحث فالـ Back يرجع حرف حرف. أو تنسى ترجّع الصفحة لـ ١ مع فلتر جديد فتفتح صفحة ٤ من نتيجة فيها صفحة واحدة. أو [[<div>]] grid بدل [[<table>]] لداتا جدولية. أو [[isLoading]] بدل [[isPending]] في v5 (معناهم اتغير). وفي الانترفيو: «إزاي تمنع race condition لما المستخدم يكتب بسرعة؟» الـ query key بيربط كل رد بالطلب بتاعه، فرد قديم متأخر مبيكتبش فوق الجديد.`
          },
          lines: [
            R`كومبوننت صفحة المنتجات.`,
            R`الفلاتر من الـ URL، و [[update]] بتغيّرها.`,
            R`الـ location الحالي، هنبعته مع لينك التفاصيل عشان الرجوع.`,
            R`الـ query اللي هيتطلب: البحث بعد debounce، والقسم، والصفحة.`,
            R`الطلب:`,
            R`المفتاح من الـ factory. أي تغيير فيه = طلب جديد.`,
            R`الدالة، و [[signal]] عشان React Query يقدر يلغي الطلب.`,
            R`خلي الداتا القديمة ظاهرة لحد ما الجديدة توصل.`,
            R`قفلة useQuery.`,
            R`الأقسام للـ select. مبتتغيرش، فـ [[staleTime: Infinity]].`,
            R`عدد الصفحات من الـ total، وأقل حاجة ١.`
          ],
          sol: R`«مطبخ» صفحة ٢، والرابط في تابة جديدة: نفس الجدول و «صفحة 2 من 2». «كوباية»: في Network طلب واحد بعد ما تقف عن الكتابة (مش ٧ طلبات). Back بعد البحث: بيرجّع للفلتر اللي قبل البحث مش حرف حرف. ومع Slow 4G: الجدول القديم فاضل، و «34 منتج، بيحدّث...»، وبعدين يتبدل.

الاختبارات في المحطة الأخيرة بتتأكد من ده: فلتر القسم بيكتب [[?category=...]] ويمسح [[page=3]]، والبحث الفاضي بيعرض «مفيش منتجات بالفلاتر دي.» و «امسح الفلاتر» بيرجّع الـ ٣٤، والصفحة الأخيرة فيها ٤ صفوف و «التالية» disabled.

الحل المرجعي: [[useProductFilters]] و [[useDebounced]] و [[ProductsPage]] كاملين.`,
          solCode: R`// ── src/features/products/useProductFilters.ts ──
import { useSearchParams } from 'react-router'

export function useProductFilters() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)

  function update(patch: { q?: string; category?: string; page?: number }) {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      for (const [k, v] of Object.entries(patch)) {
        if (v === '' || v === 1 && k === 'page') next.delete(k)
        else next.set(k, String(v))
      }
      if (!('page' in patch)) next.delete('page')
      return next
    }, { replace: 'q' in patch })
  }

  return { q, category, page, update }
}

// ── src/features/products/useDebounced.ts ──
import { useEffect, useState } from 'react'

export function useDebounced<T>(value: T, ms = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id)
  }, [value, ms])
  return debounced
}

// ── src/features/products/ProductsPage.tsx ──
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router'
import { fetchCategories, fetchProducts, productKeys } from '../../api/products'
import { useProductFilters } from './useProductFilters'
import { useDebounced } from './useDebounced'

const egp = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 })

export function ProductsPage() {
  const { q, category, page, update } = useProductFilters()
  const location = useLocation()
  const query = { q: useDebounced(q.trim()), category, page }
  const products = useQuery({
    queryKey: productKeys.list(query),
    queryFn: ({ signal }) => fetchProducts(query, signal),
    placeholderData: keepPreviousData,
  })
  const categories = useQuery({ queryKey: ['categories'], queryFn: ({ signal }) => fetchCategories(signal), staleTime: Infinity })
  const pages = products.data ? Math.max(1, Math.ceil(products.data.total / products.data.pageSize)) : 1

  return (
    <main>
      <h1>المنتجات</h1>
      <form role="search" onSubmit={e => e.preventDefault()} className="filters">
        <label>
          بحث
          <input type="search" value={q} onChange={e => update({ q: e.target.value })} />
        </label>
        <label>
          القسم
          <select value={category} onChange={e => update({ category: e.target.value })}>
            <option value="">كل الأقسام</option>
            {categories.data?.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </form>

      {products.isPending ? (
        <p role="status">بيحمّل المنتجات...</p>
      ) : products.isError ? (
        <div role="alert">
          <p>مقدرناش نجيب المنتجات ({products.error.message}).</p>
          <button onClick={() => products.refetch()}>حاول تاني</button>
        </div>
      ) : products.data.total === 0 ? (
        <div>
          <p>مفيش منتجات بالفلاتر دي.</p>
          <button onClick={() => update({ q: '', category: '' })}>امسح الفلاتر</button>
        </div>
      ) : (
        <>
          <p role="status" aria-live="polite">
            {products.data.total} منتج{products.isFetching ? '، بيحدّث...' : ''}
          </p>
          <table aria-busy={products.isFetching}>
            <caption>المنتجات، صفحة {products.data.page} من {pages}</caption>
            <thead>
              <tr><th scope="col">الاسم</th><th scope="col">القسم</th><th scope="col">السعر</th><th scope="col">المخزون</th></tr>
            </thead>
            <tbody>
              {products.data.items.map(p => (
                <tr key={p.id}>
                  <th scope="row"><Link to={$__bt/products/$__{p.id}$__bt} state={{ from: location.pathname + location.search }}>{p.name}</Link></th>
                  <td>{p.category}</td>
                  <td>{egp.format(p.price)}</td>
                  <td>{p.stock === 0 ? 'خلصان' : p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="الصفحات" className="pager">
            <button disabled={page <= 1} onClick={() => update({ page: page - 1 })}>السابقة</button>
            <span>صفحة {products.data.page} من {pages}</span>
            <button disabled={page >= pages || products.isPlaceholderData} onClick={() => update({ page: page + 1 })}>التالية</button>
          </nav>
        </>
      )}
    </main>
  )
}`
        },
        {
          cmd: "مشروع ٤: صفحة التفاصيل والحالات",
          title: "تفرّق بين «مش موجود» و «حصل خطأ» في صفحة التفاصيل إزاي؟",
          desc: R`صفحة [[/products/:id]]: اسم المنتج وقسمه وسعره، ولينك «رجوع للمنتجات» بيرجّعك لنفس الفلاتر اللي كنت فيها.

خلصت يعني: (١) منتج مش موجود ([[/products/999]]): «المنتج ده مش موجود» فورًا من غير retries. (٢) خطأ سيرفر: رسالة و «حاول تاني»، و React Query بيعمل retry مرتين قبلها. (٣) «رجوع» بيودّي لـ [[/?category=كتب]] لو جيت من هناك، ولـ [[/]] لو فتحت الرابط مباشرة. (٤) الرجوع للجدول مش بيعمل طلب جديد لو الداتا لسه جديدة ([[staleTime]]).

الدروس: [[React Router]] ([[useParams]]) و [[useQuery]] و [[ErrorBoundary]] في تاب «React»، و [[4xx صح]] في تاب «APIs متقدمة».`,
          example: R`export function ProductPage() {
  const { id = '' } = useParams()
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/'
  const product = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => fetchProduct(id, signal),
    retry: (count, err) => !(err instanceof HttpError && err.status === 404) && count < 2,
  })`,
          try: R`اكتب [[ProductPage]] و خلّي لينكات الجدول تبعت [[state={{ from }}]]. جرّب: فلتر «كتب»، افتح منتج، دوس «رجوع». افتح [[/products/999]] وبص في Network: كام طلب؟ وبعدين في الـ handlers خلّي [[/api/products/:id]] يرجّع 500 مؤقتًا: كام طلب قبل ما الخطأ يظهر؟`,
          flag: "script",
          deep: {
            why: R`404 و 500 حاجتين مختلفين تمامًا للمستخدم: الأول «الحاجة دي مش موجودة، روح دوّر على غيرها»، والتاني «فيه مشكلة، جرّب كمان شوية». لو عاملتهم زي بعض، إما هتعمل retry على حاجة مش موجودة (٣ طلبات وثواني انتظار على الفاضي)، أو هتقول «مش موجود» على منتج موجود والسيرفر كان واقع ثانية.`,
            how: R`[[retry: (count, err) => ...]]: React Query بيسأل الدالة دي بعد كل فشل. لو [[HttpError]] بـ 404 رجّع false (متحاولش تاني)، غير كده حاول لحد مرتين. ده ليه لازم [[getJson]] ترمي error فيه الـ status مش رسالة بس.

«رجوع» بالـ state: اللينك في الجدول بيبعت [[state={{ from: location.pathname + location.search }}]]. صفحة التفاصيل بتقراه بـ [[useLocation().state]]. لو الصفحة اتفتحت مباشرة (رابط من برّه) مفيش state، فبنرجع لـ [[/]]. ليه مش [[navigate(-1)]]؟ لأنه لو الصفحة اتفتحت من رابط خارجي، هيطلّعك برّه الموقع خالص.

ليه مش بنستخدم loader من React Router هنا؟ ممكن، والـ data mode بيدعمه. بس React Query بيدّيك كاش مشترك بين الصفحتين: لو فتحت نفس المنتج مرتين في دقيقة، التانية من الكاش.

والـ ErrorBoundary للأخطاء اللي مش متوقعة (bug في الـ render نفسه)، مش للـ 404 و 500 اللي بتتعامل معاهم في الكومبوننت.`,
            when: R`أي صفحة تفاصيل بـ id في الـ URL. ولو المنتج ممكن يتعدل من صفحة التفاصيل، [[useMutation]] و [[invalidateQueries]] بعد الحفظ (درس [[useMutation]]).`,
            mistakes: R`retry على 404 (الافتراضي ٣ مرات). أو [[navigate(-1)]] للرجوع. أو فلاتر الجدول في [[useState]] فالرجوع يرجّعها فاضية. أو [[if (!data) return <p>مش موجود</p>]] وده بيظهر كمان وقت التحميل. أو تعرض رسالة الخطأ التقنية كاملة للمستخدم.`
          },
          lines: [
            R`صفحة التفاصيل.`,
            R`الـ id من الـ URL. القيمة الافتراضية الفاضية عشان TypeScript، لأن [[useParams]] بيرجّع [[string | undefined]].`,
            R`المكان اللي جيت منه، أو [[/]] لو فتحت الرابط مباشرة.`,
            R`الطلب:`,
            R`مفتاح المنتج ده من نفس الـ factory.`,
            R`الدالة، و [[signal]] للإلغاء.`,
            R`متعملش retry على 404، وغير كده لحد مرتين.`,
            R`قفلة useQuery.`
          ],
          sol: R`«كتب» ثم منتج ثم «رجوع»: الـ URL بيرجع [[/?category=%D9%83%D8%AA%D8%A8]] (ده «كتب» متشفّر). الاختبار «opens a product and goes back to the same filters» بيتأكد من ده بـ [[router.state.location.search]]. [[/products/999]]: طلب واحد و «المنتج ده مش موجود» (اختبار «unknown product shows not found without retrying»). والـ 500: ٣ طلبات (الأول واتنين retry) وبعدين الرسالة.

الحل المرجعي تحت. لاحظ إن الـ [[<Link to={from}>]] فوق خالص في الصفحة، حتى وقت التحميل والخطأ: المستخدم دايمًا يقدر يرجع.

في الاختبارات [[retry: false]] على الـ QueryClient كله عشان الخطأ يظهر فورًا، بس ده بيتجاوز الـ [[retry]] اللي في الكومبوننت؟ لأ: الـ option اللي على [[useQuery]] نفسه بيكسب على الـ default. عشان كده اختبار الـ 404 بيعدّي في الحالتين.`,
          solCode: R`// ── src/features/products/ProductPage.tsx ──
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation, useParams } from 'react-router'
import { fetchProduct, HttpError, productKeys } from '../../api/products'

export function ProductPage() {
  const { id = '' } = useParams()
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/'
  const product = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => fetchProduct(id, signal),
    retry: (count, err) => !(err instanceof HttpError && err.status === 404) && count < 2,
  })

  return (
    <main>
      <Link to={from}>رجوع للمنتجات</Link>
      {product.isPending ? <p role="status">بيحمّل...</p>
        : product.isError ? (
          product.error instanceof HttpError && product.error.status === 404
            ? <h1>المنتج ده مش موجود</h1>
            : <p role="alert">حصلت مشكلة. <button onClick={() => product.refetch()}>حاول تاني</button></p>
        ) : (
          <>
            <h1>{product.data.name}</h1>
            <dl>
              <dt>القسم</dt><dd>{product.data.category}</dd>
              <dt>السعر</dt><dd>{product.data.price} جنيه</dd>
            </dl>
          </>
        )}
    </main>
  )
}`
        },
        {
          cmd: "مشروع ٤: الاختبارات",
          title: "تختبر الجدول والفلاتر والأخطاء بـ Testing Library و MSW إزاي؟",
          desc: R`اكتب اختبارات بترسم التطبيق كله (بالـ router و React Query) على URL معين، وبتتعامل معاه زي المستخدم: تختار قسم، وتكتب في البحث، وتقلّب الصفحات، وتفتح منتج. والـ API هو نفس الـ MSW handlers.

خلصت يعني: (١) [[npm test]] أخضر، ٧ اختبارات على الأقل: التحميل ثم الصفحة الأولى، والفلتر والـ URL، والبحث الفاضي و «امسح الفلاتر»، والصفحات و «التالية» disabled في الآخر، والخطأ و «حاول تاني»، والتفاصيل والرجوع، والـ 404. (٢) مفيش [[getByTestId]]: كل حاجة بـ [[getByRole]] أو النص. (٣) أي طلب ملوش handler بيوقّع الاختبار. (٤) مفيش [[waitFor]] بـ timeout يدوي.

الدروس: [[Vitest + Testing Library]] و [[getByRole و findBy]] و [[user-event]] و [[wrapper بالـ providers]] و [[MSW]] في تاب «React»، و [[vitest]] و [[اختبار كويس]] في تاب «فحص الكود».`,
          example: R`  it('shows an error and recovers on retry', async () => {
    const user = userEvent.setup()
    server.use(http.get('/api/products', () => new HttpResponse(null, { status: 500 }), { once: true }))
    renderApp('/')
    expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500')
    await user.click(screen.getByRole('button', { name: 'حاول تاني' }))
    expect(await screen.findByRole('table')).toBeInTheDocument()
  })`,
          try: R`ركّب [[vitest]] و [[jsdom]] و [[@testing-library/react]] و [[@testing-library/jest-dom]] و [[@testing-library/user-event]]. اعمل [[test/setup.ts]] (MSW server)، و [[test/render.tsx]] فيه [[renderApp(url)]] بـ [[createMemoryRouter]] و [[QueryClient]] جديد لكل اختبار. اكتب الـ ٧ اختبارات. وبعدين اكسر حاجة عمدًا (خلي الـ caption من [[page]] بتاع الـ URL) وشوف أنهي اختبار بيقع.`,
          flag: "script",
          deep: {
            why: R`الجدول ده فيه تفاعلات كتير بين أجزاء مختلفة: URL، و debounce، و كاش، و placeholder. أي refactor ممكن يكسر واحدة من غير ما تاخد بالك. اختبار بيرسم التطبيق كله بيمسك التفاعلات دي، واختبار الـ unit لكل hook لوحده مش هيمسكها. وفي أي take-home لشركة، الاختبارات من أول الحاجات اللي بيتبص عليها.`,
            how: R`[[renderApp(url)]] بيعمل [[QueryClient]] جديد لكل اختبار (الكاش ميعدّيش من اختبار للتاني) بـ [[retry: false]] (الأخطاء تظهر على طول)، و [[createMemoryRouter(routes, { initialEntries: [url] })]] بنفس الـ routes بتاعة التطبيق. وبيرجّع الـ router عشان تقدر تسأل عن [[router.state.location.search]].

[[findByRole]] بيستنى لحد ما العنصر يظهر (لحد ثانية افتراضيًا)، فمفيش [[waitFor]] ولا [[setTimeout]]. و [[getByRole('table', { name: 'المنتجات، صفحة 1 من 4' })]]: اسم الجدول هو الـ [[caption]]، فالاختبار بيتأكد من الـ accessibility والمحتوى مع بعض.

[[server.use(handler, { once: true })]] بيغيّر رد [[/api/products]] مرة واحدة: أول طلب 500، والـ retry بياخد الـ handler الأصلي. و [[server.resetHandlers()]] في [[afterEach]] بيشيل أي تغيير.

[[onUnhandledFrame: 'error']] في الـ setup (في MSW 2 كان اسمه [[onUnhandledRequest]]): أي طلب ملوش handler بيوقّع الاختبار، فمفيش طلب بيعدّي للشبكة الحقيقية من غير ما تعرف. جرّبناه: [[fetch]] لمسار ملوش handler بيرمي.

[[userEvent.setup()]] وبعدين [[await user.type(...)]]: بيكتب حرف حرف زي المستخدم، والـ debounce بيشتغل بالوقت الحقيقي (٣٠٠ms)، و [[findBy]] بيستناه.`,
            when: R`للفلوز المهمة في كل شاشة. ومنطق معقد لوحده (حساب، أو تحويل داتا) ليه unit tests سريعة جنبه. و e2e بـ Playwright لرحلة أو اتنين على الـ build الحقيقي.`,
            mistakes: R`[[QueryClient]] واحد لكل الاختبارات فالكاش يخلّي اختبار يعدّي بداتا اختبار قبله. أو [[retry]] الافتراضي فاختبار الخطأ ياخد ثواني أو يعمل timeout. أو mock لـ [[useQuery]] نفسه بـ [[vi.mock]] بدل MSW، فبتختبر الـ mock مش الكود. أو [[getByTestId]] في كل حتة. أو [[fireEvent.change]] بدل [[user.type]] فالـ debounce مبيتجرّبش صح. أو تنسى [[cleanup]] (بيحصل لوحده لو [[globals: true]]، وغير كده في [[afterEach]]).`
          },
          lines: [
            R`اسم الاختبار بيقول السيناريو.`,
            R`[[user]] بيعمل ضغطات وكتابة زي البني آدم.`,
            R`الطلب الجاي لـ [[/api/products]] بس يرجّع 500.`,
            R`ارسم التطبيق على [[/]].`,
            R`استنى رسالة الخطأ ([[role="alert"]]) واتأكد إن فيها الكود.`,
            R`دوس «حاول تاني». الطلب ده هياخد الـ handler الأصلي.`,
            R`الجدول ظهر: الـ retry اشتغل.`,
            R`قفلة الاختبار.`
          ],
          sol: R`بالحل المرجعي: [[Test Files 1 passed]] و [[Tests 7 passed]] في حوالي ٤ ثواني (الـ debounce والـ delay حقيقيين). و [[tsc --noEmit]] نضيف، و [[vite build]] بيطلّع بندل ٣٥٠KB (١١٠KB gzip) من غير MSW.

لما خلّينا الـ caption من [[page]] بتاع الـ URL (الغلطة اللي اتكلمنا عنها في محطة الجدول): اختبار «pages forward and disables next on the last page» وقع بـ [[expected ... to have a length of 4 but got 10]]: الـ caption قال صفحة ٤ فالاختبار كمّل، بس الصفوف كانت لسه ١٠ بتوع صفحة ٣.

الحل المرجعي فيه [[setup.ts]] و [[render.tsx]] وملف الاختبارات كامل.`,
          solCode: R`// ── src/test/setup.ts ──
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '../mocks/node'

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => { cleanup(); server.resetHandlers() })
afterAll(() => server.close())

// ── src/test/render.tsx ──
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { routes } from '../App'

export function renderApp(url = '/') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  render(<QueryClientProvider client={client}><RouterProvider router={router} /></QueryClientProvider>)
  return { router }
}

// ── src/features/products/ProductsPage.test.tsx ──
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../../mocks/node'
import { renderApp } from '../../test/render'

const rows = () => within(screen.getByRole('table')).getAllByRole('row').slice(1)

describe('products table', () => {
  it('shows loading, then the first page', async () => {
    renderApp('/')
    expect(screen.getByText('بيحمّل المنتجات...')).toBeInTheDocument()
    expect(await screen.findByRole('table', { name: 'المنتجات، صفحة 1 من 4' })).toBeInTheDocument()
    expect(rows()).toHaveLength(10)
    expect(screen.getByText('34 منتج')).toBeInTheDocument()
  })

  it('filters by category and puts the filter in the URL', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/?page=3')
    await screen.findByRole('table')
    await user.selectOptions(await screen.findByRole('combobox', { name: 'القسم' }), 'مطبخ')
    expect(await screen.findByText('11 منتج')).toBeInTheDocument()
    expect(router.state.location.search).toBe('?category=%D9%85%D8%B7%D8%A8%D8%AE')
    rows().forEach(r => expect(r).toHaveTextContent('مطبخ'))
  })

  it('search with no results shows the empty state and clears it', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await screen.findByRole('table')
    await user.type(screen.getByRole('searchbox', { name: 'بحث' }), 'مش موجود')
    expect(await screen.findByText('مفيش منتجات بالفلاتر دي.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'امسح الفلاتر' }))
    expect(await screen.findByText('34 منتج')).toBeInTheDocument()
  })

  it('pages forward and disables next on the last page', async () => {
    const user = userEvent.setup()
    renderApp('/?page=3')
    await screen.findByRole('table', { name: /صفحة 3 من 4/ })
    await user.click(screen.getByRole('button', { name: 'التالية' }))
    expect(await screen.findByRole('table', { name: /صفحة 4 من 4/ })).toBeInTheDocument()
    expect(rows()).toHaveLength(4)
    expect(screen.getByRole('button', { name: 'التالية' })).toBeDisabled()
  })

  it('shows an error and recovers on retry', async () => {
    const user = userEvent.setup()
    server.use(http.get('/api/products', () => new HttpResponse(null, { status: 500 }), { once: true }))
    renderApp('/')
    expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500')
    await user.click(screen.getByRole('button', { name: 'حاول تاني' }))
    expect(await screen.findByRole('table')).toBeInTheDocument()
  })

  it('opens a product and goes back to the same filters', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/?category=%D9%83%D8%AA%D8%A8')
    await user.click(await screen.findByRole('link', { name: 'شنطة 1' }))
    expect(await screen.findByRole('heading', { name: 'شنطة 1' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'رجوع للمنتجات' }))
    expect(router.state.location.search).toBe('?category=%D9%83%D8%AA%D8%A8')
  })

  it('unknown product shows not found without retrying', async () => {
    renderApp('/products/999')
    expect(await screen.findByRole('heading', { name: 'المنتج ده مش موجود' })).toBeInTheDocument()
  })
})`
        }
      ]
    }
]);

// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("react", {
  label: "React",
  prompt: "$ ",
  lab: R`npm create vite@latest react-lab -- --template react-ts
cd react-lab && npm i
npm run dev`,
  labText: "مشروع Vite + React + TypeScript هو أسرع مكان تجرّب فيه. ركّب React DevTools في المتصفح عشان تشوف الـ components والـ state.",
  levels: {"1":["الأساس","components و props و state و events و lists والـ JSX"],"2":["التطبيقات الحقيقية","effects، و forms، و router، و React Query، و Zustand، و context، و i18n"],"3":["العمق والانترفيو","الأداء، و rendering، والاختبارات، و patterns، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "الفكرة و JSX و components",
      l: 1,
      n: "React بترسم الشاشة من البيانات، وانت بتكتب components بترجع JSX",
      items: [
        {
          cmd: "UI = f(state)",
          title: "React بتحل مشكلة إيه أصلًا",
          desc: R`React مكتبة بتخليك توصف الشاشة كدالة في البيانات: تقول «لو الـ state كده، الشاشة شكلها كده»، وهي اللي تعدّل الـ DOM لما البيانات تتغير.

من غيرها بتكتب كود بيدوّر على العناصر ويعدّلها بإيدك: [[querySelector]] و [[textContent]] و [[classList.add]]. ومع كل feature جديدة الحالات بتكتر، لحد ما الشاشة تبقى مش متطابقة مع البيانات. في React انت بتغيّر البيانات بس، والشاشة بتتحسب من جديد.`,
          example: R`// من غير React: انت اللي بتعدّل الـ DOM
button.addEventListener('click', () => {
  count++
  label.textContent = String(count)
})
// بـ React: بتوصف الشاشة، وهي بتعدّل الـ DOM
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`,
          try: R`في مشروع الـ lab امسح اللي في [[src/App.tsx]] وحط الـ Counter ده ([[import { useState } from 'react']] فوق، و [[export default]] قبل function). اضغط الزرار، وافتح React DevTools وشوف الـ state بتتغير مع كل ضغطة.`,
          flag: "script",
          deep: {
            why: "الشاشة في أي تطبيق حقيقي بتعتمد على بيانات كتير: المستخدم داخل ولا لأ، والسلة فيها كام حاجة، والطلب لسه بيحمّل ولا خلص. لو بتعدّل الـ DOM بإيدك، لازم تفتكر كل مكان بيتأثر بكل تغيير، وأي نسيان يبقى bug. React بتقلب المعادلة: انت بتقول الشاشة شكلها إيه في كل حالة، وهي اللي تتكفّل بالتعديل.",
            how: R`الـ component دالة JavaScript عادية بترجع وصف للشاشة (JSX). لما الـ state تتغير، React بتنادي الدالة تاني، ودي اسمها render، فترجع وصف جديد.

الوصف ده مش DOM. هو objects عادية شكلها [[{ type: 'button', props: {...} }]]، واللي الناس بتسميه virtual DOM. React بتقارن الوصف الجديد بالقديم، وتطبّق الفرق بس على الـ DOM الحقيقي. لو الرقم بس اللي اتغير، هي بتغيّر النص ده بس، مش الزرار كله.

عشان كده جملة «UI = f(state)» حقيقية: نفس الـ props ونفس الـ state لازم يطلعوا نفس الشاشة. والـ component لازم يبقى pure: وهو بيترسم ميعدّلش حاجة برا نفسه (ميبعتش request، ميغيّرش متغير global). الحاجات دي مكانها الـ events والـ effects، وده هتشوفه في المستوى التاني.

والملف اللي بيشغّل كل ده [[src/main.tsx]]: [[createRoot(document.getElementById('root')).render(<App />)]]، يعني «امسك الـ div اللي في index.html وارسم App جواه».`,
            when: "أي واجهة فيها تفاعل وبيانات بتتغير: dashboards، ومتاجر، وفورمات كتير، ولوحات أدمن. لصفحة ثابتة (landing فيها نص وصور) React ممكن تبقى زيادة، و HTML و CSS كفاية، أو Next.js بيطلّعها static.",
            mistakes: R`تفتكر إن React framework كامل: هي مكتبة للواجهة بس. الراوتنج، وجلب البيانات، والـ state العام مكتبات تانية (React Router و TanStack Query و Zustand) أو framework زي Next.js. وتعدّل الـ DOM بإيدك جوه component ([[document.getElementById('x').style.color = 'red']]): React مش هتعرف، وأول render ممكن يمسح تعديلك. ولو محتاج تلمس الـ DOM فعلًا، فيه [[useRef]] في المستوى التاني.`
          },
          lines: [
            "الطريقة القديمة: تسمع للضغطة بإيدك.",
            "تزوّد المتغير.",
            "وتفتكر تحدّث النص في الـ DOM بنفسك. لو نسيت في مكان، الشاشة بقت بتكدب.",
            "قفلة الـ listener.",
            "component: دالة اسمها بيبدأ بحرف كبير وبترجع شكل الشاشة.",
            "state اسمها count بتبدأ من 0، ومعاها setCount اللي بتغيّرها.",
            "الزرار بيعرض count، والضغطة بتغيّر الـ state بس. React هي اللي تحدّث الشاشة.",
            "قفلة الـ component."
          ],
          sol: R`الزرار يبدأ بـ [[0]] وكل ضغطة يزيد واحد. في React DevTools افتح تاب Components واختار [[Counter]]: تحت hooks هتلاقي [[State: 3]] مثلًا، والرقم بيتغير مع كل ضغطة في نفس اللحظة اللي الزرار بيتغير فيها. انت مكتبتش ولا سطر بيلمس الـ DOM: غيّرت الـ state بس، و React حسبت الشاشة من جديد.

لو الصفحة بيضا والـ console فيه [[useState is not defined]]، نسيت الـ import. ولو فيه «does not provide an export named 'default'»، نسيت [[export default]]، لأن [[main.tsx]] بيعمل [[import App from './App']].`,
          solCode: R`import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`
        },
        {
          cmd: "npm create vite",
          title: "ابدأ مشروع جديد وافهم ملفاته",
          desc: R`[[npm create vite@latest]] بيعملك مشروع React جاهز في ثواني: dev server سريع بيحدّث الصفحة وانت بتكتب، و build للإنتاج، و TypeScript لو اخترت [[react-ts]]. و Create React App اتوقف رسميًا من ٢٠٢٥، فمتبدأش بيه.

الملفات المهمة: [[index.html]] فيه [[<div id="root">]] فاضي، و [[src/main.tsx]] بيرسم App جواه، و [[src/App.tsx]] أول component. ولما المشروع يكبر قسّم [[src]] فولدرات حسب الدور.`,
          example: R`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
npm run build
npm run preview`,
          try: R`اعمل المشروع، وغيّر كلمة في [[App.tsx]] وانت الصفحة مفتوحة: هتتحدث من غير reload. بعدين [[npm run build]] وبص على فولدر [[dist]]: ملف HTML وملفات JS و CSS أساميها فيها hash.`,
          deep: {
            why: "React لوحدها مبتعرفش تقرا JSX ولا TypeScript، والمتصفح كمان. محتاج أداة تحوّل الكود وتشغّله وانت بتطوّر، وتجمّعه في ملفات صغيرة للإنتاج. Vite بيعمل الاتنين بأقل إعدادات.",
            how: R`في التطوير ([[npm run dev]]) Vite مبيجمّعش المشروع. بيقدّم كل ملف للمتصفح كـ ES module، ويحوّل TSX لـ JavaScript وقت ما المتصفح يطلبه، فبيقوم في أقل من ثانية حتى في مشروع كبير. ولما تحفظ ملف بيبعت التعديل ده بس (HMR)، و React Fast Refresh بيحافظ على الـ state، فالعداد مبيرجعش صفر.

في الـ build ([[npm run build]]) بيجمّع كل حاجة في [[dist]]: ملفات JS و CSS متصغّرة وفي اسمها hash، عشان المتصفح يكاشها للأبد ولما الكود يتغير الاسم يتغير. و [[npm run preview]] بيشغّل [[dist]] محليًا عشان تتأكد إن الـ build سليم، مش أكتر.

متغيرات البيئة: Vite بيعرض بس اللي اسمها بيبدأ بـ [[VITE_]] جوه [[import.meta.env]]، وبيحط قيمتها في ملفات JS نفسها. يعني أي حد يفتح الموقع يقدر يقراها.

وتقسيم شائع لـ [[src]]: [[components]] للقطع اللي بتتكرر، و [[pages]] للصفحات، و [[hooks]] للـ custom hooks، و [[lib]] للـ API client والدوال المساعدة، و [[stores]] لـ Zustand. ولما المشروع يكبر أكتر، قسّم حسب الـ feature: [[features/cart]] جواه components و hooks و api بتوعه. وأوامر npm نفسها بالتفصيل في تاب Node.`,
            when: "أي مشروع React بيشتغل في المتصفح بس (SPA): لوحة أدمن، أو dashboard، أو تطبيق جوه Electron أو Capacitor. لو محتاج SEO وصفحات بتترسم على السيرفر، Next.js أنسب (تاب Next.js).",
            mistakes: R`تحط secret في [[VITE_API_SECRET]] وتفتكر إنه مستخبي: هو جوه الـ JS اللي أي حد بينزّله. الأسرار مكانها السيرفر بس. وفي مشروع حقيقي كان الإنتاج شغال بـ [[vite preview --host 0.0.0.0]]، و Vite نفسه بيقول إن preview مش معمول لسيرفر إنتاج: اعمل build وقدّم [[dist]] بـ Nginx (تاب nginx) أو من Docker. وتنسى إن SPA محتاجة السيرفر يرجّع [[index.html]] لأي مسار، وإلا refresh على [[/products/5]] يطلع 404.`
          },
          lines: [
            "اعمل مشروع اسمه my-app بقالب React + TypeScript. الـ [[--]] بتعدّي الخيارات لـ Vite نفسه.",
            "ادخل فولدر المشروع.",
            "نزّل الـ dependencies.",
            "شغّل dev server (عادةً على localhost:5173) بتحديث لحظي.",
            "اعمل build للإنتاج في فولدر dist.",
            "شغّل dist محليًا عشان تجرّبه قبل ما ترفعه."
          ],
          sol: R`أول ما تحفظ [[App.tsx]] الكلمة بتتغير في المتصفح من غير reload، ولو كان فيه عداد ضغطت عليه هتلاقي رقمه لسه زي ما هو: ده Fast Refresh، بيبدّل كود الـ component ويحافظ على الـ state.

بعد [[npm run build]] هتلاقي [[dist/index.html]]، وجوه [[dist/assets]] ملفات زي [[index-BRDr3nmD.js]] (حوالي 220kB، و 70kB بعد gzip في القالب الفاضي) و [[index-D64VDMd1.css]]، وجنبهم الصور اللي عملتلها import. الـ hash بيتغير بس لما محتوى الملف يتغير، فالمتصفح يقدر يكيّش الملف للأبد. والملفات اللي في [[public]] (زي [[favicon.svg]]) بتتنسخ زي ما هي من غير hash.

الغلطة المشهورة: تفتح [[dist/index.html]] بدبل كليك فتلاقي صفحة بيضا، لأن المسارات [[/assets/...]] مطلقة ومش هتشتغل من [[file://]]. اتفرج على الـ build بـ [[npm run preview]] (على 4173).`
        },
        {
          cmd: "vite.config",
          title: "ظبط Vite لمشروع حقيقي: proxy و aliases و env و base و حجم الـ bundle",
          desc: R`[[vite.config.ts]] هو المكان اللي بتظبط فيه كل حاجة Vite بيعملها. أول يوم في أي SPA بتكلم API منفصل هتحتاج خمس حاجات: [[server.proxy]] عشان [[/api]] يروح للـ backend من غير CORS وانت بتطوّر، و [[resolve.alias]] عشان تكتب [[@/lib/api]] بدل [[../../../lib/api]]، وملفات [[.env.development]] و [[.env.production]] (و [[--mode]] لأي بيئة تانية)، و [[base]] لو الموقع هيتقدّم من فولدر فرعي زي [[/admin/]]، و [[build.sourcemap]] مع تقسيم الـ chunks عشان تعرف مين تاقل الـ bundle.

الدالة [[defineConfig(({ mode }) => ...)]] بتاخد الـ mode، و [[loadEnv]] بيقرا ملفات الـ env جوه الـ config نفسه، لأن [[import.meta.env]] مش موجود هناك.`,
          example: R`import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.BASE_PATH || '/',
    plugins: [
      react(),
      env.ANALYZE === '1' && (visualizer({ filename: 'stats.html', gzipSize: true }) as PluginOption),
      !!env.SENTRY_AUTH_TOKEN && sentryVitePlugin({ org: 'acme', project: 'shop-web', authToken: env.SENTRY_AUTH_TOKEN, sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] } }),
    ],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: { proxy: { '/api': { target: env.API_TARGET || 'http://localhost:4000', changeOrigin: true } } },
    build: {
      sourcemap: 'hidden',
      rolldownOptions: {
        output: { codeSplitting: { groups: [{ name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ }, { name: 'charts', test: /node_modules[\\/](recharts|d3-[a-z-]+)[\\/]/ }] } },
      },
    },
  }
})`,
          try: R`في مشروع الـ lab: شغّل أي API على بورت 4000 (أو [[node -e "require('http').createServer((q,r)=>r.end(q.url)).listen(4000)"]])، وحط الـ proxy، وافتح [[http://localhost:5173/api/products?page=2]]: المفروض الرد يبقى [[/api/products?page=2]] من الـ API. بعدين اعمل [[.env.production]] فيه [[VITE_API_URL=https://api.example.com]] و [[.env.staging]] فيه قيمة تانية، واعمل [[npm run build]] مرة و [[npx vite build --mode staging]] مرة، ودوّر على الـ URL جوه [[dist/assets/*.js]] بـ grep. وفي الآخر [[ANALYZE=1 npm run build]] وافتح [[stats.html]].`,
          flag: "script",
          deep: {
            why: R`الـ SPA بتشتغل على [[localhost:5173]] والـ API على [[localhost:4000]]. من غير proxy المتصفح بيعتبرهم origins مختلفة، فلازم تفتح CORS في الـ backend للتطوير بس، والـ cookies (httpOnly و SameSite) بتبقى وجع دماغ. ومع الوقت الـ imports بتبقى [[../../../]]، والـ build بيطلع ملف JS واحد ٢ ميجا ومحدش عارف ليه، والـ staging بيكلم API الإنتاج لأن حد نسي يغيّر URL. كل ده بيتحل في ملف واحد.`,
            how: R`الـ proxy: [[server.proxy]] شغال في [[npm run dev]] بس. أي طلب بيبدأ بـ [[/api]] سيرفر Vite بياخده ويبعته لـ [[target]] ويرجّع الرد، فالمتصفح شايف origin واحد. و [[changeOrigin: true]] بيغيّر header الـ [[Host]] لـ host الـ target (مهم لو الـ API ورا Nginx أو خدمة بتفرّق بالـ host). ولو الـ API مش بيبدأ مساراته بـ [[/api]]، [[rewrite: p => p.replace(/^\/api/, '')]]. وفي الإنتاج مفيش Vite خالص: Nginx هو اللي يعمل نفس الحركة ([[location /api/ { proxy_pass ... }]] في تاب nginx)، فالكود بيكلم [[/api]] في الحالتين.

الـ alias: [[resolve.alias]] بيعلّم Vite إن [[@]] معناها [[src]]، و TypeScript لازم يعرف نفس المعلومة في [[tsconfig.app.json]]: [[paths: { "@/*": ["./src/*"] }]] (من غير [[baseUrl]]: اتشال في TypeScript 7 وبيطلّع error TS5102)، وإلا المحرر هيقولك «Cannot find module». في Vite 8 فيه اختصار: [[resolve: { tsconfigPaths: true }]] بيقرا الـ paths من tsconfig نفسه، فمصدر الحقيقة يبقى واحد. و Vitest بيستخدم نفس الـ config فبيفهم الـ alias لوحده.

الـ env: الـ mode الافتراضي [[development]] مع [[vite]] و [[production]] مع [[vite build]]. Vite بيقرا بالترتيب [[.env]] ثم [[.env.local]] ثم [[.env.production]] (أو اسم الـ mode) ثم [[.env.production.local]]، والأخير بيكسب، والـ [[.local]] مكانها [[.gitignore]]. [[--mode staging]] بيقرا [[.env.staging]] بدل production، بس الـ build لسه build إنتاج (minify وكل حاجة). وجوه الكود [[import.meta.env.VITE_*]] بس، و [[import.meta.env.MODE]] و [[DEV]] و [[PROD]]. أما [[loadEnv(mode, cwd, '')]] بالـ prefix الفاضي فبيرجّع كل المتغيرات للـ config بس (زي [[API_TARGET]] و [[SENTRY_AUTH_TOKEN]])، ومبتدخلش الـ bundle.

الـ base: لو الموقع هيتقدّم على [[https://example.com/admin/]]، [[base: '/admin/']] بيخلي كل الـ assets في [[index.html]] تبدأ بـ [[/admin/assets/...]]. ومع React Router لازم [[basename: '/admin']] في [[createBrowserRouter]] كمان، و Nginx يرجّع [[/admin/index.html]] لأي مسار تحت [[/admin/]].

الـ bundle: Vite 8 بيبني بـ Rolldown. [[rolldownOptions.output.codeSplitting.groups]] بيحط مكتبات معينة في chunk لوحدها: React نادرًا ما بتتغير، فلو في chunk لوحدها المتصفح بيفضل مكاشها بعد كل deploy للكود بتاعك. و [[manualChunks]] بتاع Rollup لسه بيشتغل بس deprecated في Vite 8 (و [[build.rollupOptions]] بقت اسم قديم لـ [[rolldownOptions]]). و [[rollup-plugin-visualizer]] بيطلّع [[stats.html]] فيه treemap: كل مستطيل ملف، ومساحته حجمه، فتلاقي بسرعة إن [[moment]] بكل لغاته أو [[lodash]] كله داخل الـ bundle.

الـ source maps: [[sourcemap: true]] بيحط ملفات [[.map]] جنب الـ JS وتعليق في آخر كل ملف بيشاور عليها، فأي حد يفتح DevTools يشوف الكود الأصلي بالتعليقات. [[sourcemap: 'hidden']] بيطلّع الـ maps من غير التعليق. و Sentry plugin بيرفعها لـ Sentry وقت الـ build، و [[filesToDeleteAfterUpload]] بيمسحها من [[dist]] قبل النشر. النتيجة: الأخطاء في Sentry بتظهر بأسماء ملفاتك وسطورك، والمستخدم مبيوصلش للكود.`,
            when: R`من أول يوم في أي SPA ليها backend منفصل. والـ base لما الفرونت يتنشر تحت مسار (لوحة أدمن على [[/admin]]، أو GitHub Pages على [[/repo-name/]]). والـ visualizer لما الـ build يطلع warning إن chunk أكبر من 500kB، أو قبل ما تضيف مكتبة تقيلة. والـ source maps المخفية لما يكون عندك error tracking (Sentry أو غيره).`,
            mistakes: R`تفتكر إن الـ proxy شغال في الإنتاج: [[vite build]] بيطلّع ملفات static، والـ proxy كان في dev server بس، فالـ [[/api]] يرجع 404 أو [[index.html]]. وتحط الـ API الحقيقي في [[VITE_API_URL]] وتفتكره سر: أي [[VITE_]] بيتكتب جوه الـ JS. وتعمل alias في Vite وتنسى tsconfig (أو العكس)، فالمحرر أو الـ build بيشتكي. و [[--mode analyze]] عشان تحلل الـ bundle: كده [[.env.production]] مبيتقريش والـ build بيطلع بقيم فاضية، والأسلم متغير زي [[ANALYZE=1]] زي المثال. و [[sourcemap: true]] في الإنتاج «عشان نعرف نعمل debug»: الكود كله بقى مكشوف. ومن غير [[base]] الموقع على [[/admin/]] بيفتح صفحة بيضا، لأن [[/assets/index.js]] بيرجع 404. وسؤال انترفيو: «ليه CORS error في الإنتاج بس؟» لأن في التطوير الـ proxy كان مخبّي إن الـ origins مختلفة.`
          },
          lines: [
            "defineConfig للأنواع، و loadEnv يقرا ملفات الـ env جوه الـ config.",
            "plugin الـ React: JSX و Fast Refresh.",
            "أدوات Node عشان نحوّل مسار src لمسار كامل.",
            "plugin بيرسم حجم كل ملف في الـ bundle.",
            "plugin بيرفع الـ source maps لـ Sentry.",
            "الـ config دالة بتاخد الـ mode (development أو production أو اللي بعته بـ --mode).",
            "كل متغيرات البيئة للـ config بس. الـ prefix الفاضي معناه كله، مش VITE_ بس.",
            "بداية الإعدادات.",
            "المسار اللي الموقع هيتقدّم منه. / افتراضيًا، أو /admin/ مثلًا.",
            "الـ plugins:",
            "React.",
            "الـ visualizer بس لما تشغّل ANALYZE=1. القيمة false بتتجاهل.",
            "Sentry بس لو فيه توكن (في CI): يرفع الـ maps ويمسحها من dist بعدها.",
            "قفلة الـ plugins.",
            "@ معناها src. ولازم نفس الكلام في paths بتاعة tsconfig.",
            "في التطوير: أي طلب بيبدأ بـ /api يروح للـ backend، و Host يتغير للـ target.",
            "إعدادات الـ build:",
            "maps من غير تعليق في آخر الملف، فالمتصفح مبيطلبهاش.",
            "إعدادات Rolldown (اسمها rollupOptions في Vite القديم):",
            "React في chunk لوحدها، والـ charts في chunk لوحدها. regex بـ [[\\/]] عشان ويندوز.",
            "قفلة rolldownOptions.",
            "قفلة build.",
            "قفلة الإعدادات.",
            "قفلة defineConfig."
          ],
          sol: R`الـ proxy صح لو الرد جه من الـ API نفسه ([[/api/products?page=2]]) مش صفحة Vite. لو شفت [[index.html]]، يا إما الـ backend مش شغال على 4000، يا إما المسار في [[proxy]] مش بيطابق.

الـ grep المفروض يلاقي [[https://api.example.com]] في build الإنتاج، وقيمة [[.env.staging]] في build الـ staging، ومش هيلاقي [[SENTRY_AUTH_TOKEN]] ولا [[API_TARGET]] في أي ملف، لأنهم مش بادئين بـ [[VITE_]].

[[stats.html]] بيفتح treemap: المستطيل الكبير غالبًا [[react-dom]]. وملفات [[dist/assets]] هتلاقي فيها [[react-*.js]] لوحده. ولو [[sourcemap: 'hidden']]، هتلاقي ملفات [[.map]] بس آخر ملف الـ JS مفيهوش [[sourceMappingURL]].

لو الـ build وقع بـ «This package is ESM only»، الـ [[package.json]] ناقصه [[type: module]] (قالب Vite بيحطها لوحده).`,
          solCode: R`# .env.production
VITE_API_URL=https://api.example.com
# .env.staging
VITE_API_URL=https://staging-api.example.com

npm run build && grep -o 'https://[a-z.-]*example.com' dist/assets/*.js
npx vite build --mode staging && grep -o 'https://[a-z.-]*example.com' dist/assets/*.js
grep -c sourceMappingURL dist/assets/*.js
ANALYZE=1 npm run build && ls stats.html`
        },
        {
          cmd: "JSX",
          title: "قواعد كتابة الـ HTML جوه JavaScript",
          desc: R`JSX شكله HTML بس هو JavaScript: كل tag بيتحول لنداء دالة بيرجع object. عشان كده ليه قواعد: [[className]] بدل [[class]]، و [[htmlFor]] بدل [[for]]، والـ attributes بالـ camelCase زي [[onClick]]، وكل tag لازم يتقفل حتى [[<img />]].

أي JavaScript بتحطه بين [[{ }]]: متغير، أو حساب، أو نداء دالة. بس لازم يبقى expression، فـ [[if]] و [[for]] مينفعوش جوه، وبتستخدم ternary و [[map]] بدالهم. والـ component بيرجّع عنصر واحد من برا، ولو عايز أكتر لفّهم في Fragment [[<>...</>]].`,
          example: R`type User = { name: string; avatar: string; isAdmin: boolean }
function Profile({ user }: { user: User }) {
  const initials = user.name.slice(0, 2).toUpperCase()
  return (
    <>
      <img src={user.avatar} alt={user.name} className="avatar" />
      <label htmlFor="bio">Bio</label>
      <textarea id="bio" defaultValue="" />
      <p style={{ color: 'gray', fontSize: 14 }}>{initials}</p>
      {user.isAdmin ? <span>Admin</span> : null}
    </>
  )
}`,
          try: R`غيّر [[className]] لـ [[class]] وشوف الـ warning في الـ console. وبعدين اكتب [[{user}]] بدل [[{initials}]] جوه الـ [[<p>]] واقرا الـ error: «Objects are not valid as a React child».`,
          flag: "script",
          deep: {
            why: "بدل ما تكتب الـ HTML في ملف والمنطق في ملف تاني وتربطهم بـ ids، JSX بيخلي شكل الـ component ومنطقه في مكان واحد، و TypeScript بيفحص الاتنين مع بعض: prop غلط أو متغير مش موجود بيطلع error وانت بتكتب.",
            how: R`Vite بيحوّل كل tag لنداء دالة: [[<img src={a} />]] بتبقى [[jsx('img', { src: a })]] من [[react/jsx-runtime]]، عشان كده مش محتاج [[import React]] في كل ملف. النتيجة object عادي فيه [[type]] و [[props]].

ليه [[className]]؟ لأن [[class]] كلمة محجوزة في JavaScript، واسم الخاصية في الـ DOM نفسه [[className]]. ونفس الكلام لـ [[htmlFor]]. و [[style]] بياخد object مش string، والأسماء camelCase، والأرقام بتبقى px لوحدها.

الحرف الأول بيفرق: [[<button>]] عنصر HTML، و [[<Button>]] component بتاعك. عشان كده اسم الـ component لازم يبدأ بحرف كبير.

وجوه [[{ }]]: النصوص والأرقام بتظهر، و [[null]] و [[undefined]] و [[false]] و [[true]] مبيظهروش، والـ array بتتعرض عناصرها ورا بعض. وأي نص بيتعمله escape لوحده، فلو المستخدم كتب [[<script>]] هيظهر كنص ومش هيشتغل. الاستثناء الوحيد [[dangerouslySetInnerHTML]] (درس dangerouslySetInnerHTML في المستوى التالت).`,
            when: "في كل component. والتعليق جوه JSX بيتكتب [[{/* كده */}]] لأن [[//]] هيظهر كنص.",
            mistakes: R`ترجّع عنصرين جنب بعض من غير Fragment ("Adjacent JSX elements must be wrapped"). وتعرض object مباشرة [[{user}]] بدل خاصية منه. وتنسى تقفل [[<input>]] أو [[<br>]]. وتكتب [[if]] جوه [[{ }]]، والصح ternary أو تحسب القيمة قبل الـ return في متغير.`
          },
          lines: [
            "شكل بيانات المستخدم بـ TypeScript.",
            "component بياخد user في الـ props.",
            "حساب عادي قبل الـ return. أي JavaScript ينفع هنا.",
            "الـ JSX بين قوسين عشان يبقى على كذا سطر.",
            "Fragment: يلم أكتر من عنصر من غير div زيادة.",
            "القيم بين { }، و [[className]] بدل class، و tag مقفول بـ /.",
            "[[htmlFor]] بدل for عشان يربط الـ label بالـ input.",
            "[[defaultValue]]: قيمة أولى والمتصفح يمسك الباقي (المستوى التاني).",
            "style بياخد object: القوس الأول لـ JavaScript والتاني للـ object، و 14 بتبقى 14px.",
            "مفيش if جوه JSX، فبتستخدم ternary. و null مبتظهرش حاجة.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`أول تجربة: المحرر هيعلّم على [[class]] بـ «Property 'class' does not exist... Did you mean 'className'?»، بس Vite مبيعملش type check فالصفحة بتشتغل، وفي الـ console هتلاقي warning من React: «Invalid DOM property $__btclass$__bt. Did you mean $__btclassName$__bt?». يعني شغالة بالصدفة، والـ build ([[tsc -b]]) هيقع.

تاني تجربة: الصفحة بتبقى بيضا وفي الـ console: «Objects are not valid as a React child (found: object with keys {name, avatar, isAdmin})». React بترسم نصوص وأرقام و elements و arrays منهم، لكن object عادي متعرفش ترسمه إزاي. الحل إنك تختار الحقل اللي عايزه: [[{user.name}]]. ولو شفت نفس الـ error مع [[Date]] أو Promise، نفس السبب: حوّلها لنص الأول.`
        },
        {
          cmd: "props",
          title: "ابعت بيانات من component لـ component",
          desc: R`الـ props هي مدخلات الـ component، زي arguments الدالة: الأب بيبعتها كـ attributes، والابن بيستلمها في object واحد وبيعمله destructuring.

الـ props للقراية بس، والابن ميعدّلش فيها أبدًا. لو محتاج قيمة تتغير، دي state (عند الابن أو عند الأب)، وده الفرق الأساسي بينهم. والقيم الافتراضية بتتكتب في الـ destructuring نفسه.`,
          example: R`type ButtonProps = {
  label: string
  variant?: 'primary' | 'ghost'
  onClick: () => void
}
function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return <button className={$__btbtn btn-$__{variant}$__bt} onClick={onClick}>{label}</button>
}
export default function App() {
  return <Button label="Save" onClick={() => alert('saved')} />
}`,
          try: R`استخدم Button تلات مرات بـ labels مختلفة وواحد منهم [[variant="ghost"]]. بعدين جرّب تكتب [[variant="red"]] وشوف TypeScript بيقولك إيه.`,
          flag: "script",
          deep: {
            why: "نفس الزرار بيظهر في عشرين مكان بكلام وتصرف مختلف. بدل ما تنسخه عشرين مرة، بتعمله مرة واحدة والفرق يجي من الـ props. والبيانات بتنزل في اتجاه واحد (من الأب للابن)، فلما قيمة تطلع غلط بتعرف تدوّر عليها فين.",
            how: R`[[<Button label="Save" onClick={fn} />]] بيتحوّل لـ object فيه [[props: { label: 'Save', onClick: fn }]]، و React بتنادي [[Button(props)]] وقت الرسم. النص بيتكتب بين علامات تنصيص، وأي حاجة تانية (رقم، أو دالة، أو object) بين [[{ }]]. و [[<Button disabled />]] من غير قيمة معناها [[disabled={true}]].

لما الأب يعمل render، كل أولاده بيعملوا render تاني ويستلموا props جديدة، حتى لو القيم نفسها. ده عادي ورخيص غالبًا، وفيه طرق تمنعه لو لزم (المستوى التالت: درس «إمتى بيعيد الرسم» ودرس React.memo).

في وضع التطوير React بتعمل freeze للـ props object، فلو حاولت [[props.label = 'x']] هيرمي error. ده مقصود: الـ component لازم يعامل الـ props كقيمة ثابتة.

و [[{...rest}]] بتعدّي كل الـ props الباقية لعنصر جوه، مفيد في component بيلف [[<input>]] وعايز يسيب الأب يبعت أي attribute.`,
            when: "أي بيانات الـ component محتاجها ومش هو صاحبها: النص، والبيانات اللي هيعرضها، والدوال اللي هينادي عليها لما حاجة تحصل (callbacks).",
            mistakes: R`تعدّل prop جوه الابن. وتنسخ prop في state ([[useState(props.value)]]) وتستغرب إن القيمة متحدثتش لما الأب غيّرها: [[useState]] بياخد القيمة الأولى بس، فاستخدم الـ prop مباشرة. وفي TypeScript تنسى [[?]] للـ prop الاختيارية، فكل اللي بيستخدم الـ component يضطر يبعتها.`
          },
          lines: [
            "شكل الـ props بـ TypeScript.",
            "نص إجباري.",
            "اختياري ([[?]]) ومحدد بقيمتين بس.",
            "دالة الأب هيبعتها عشان يعرف إن الزرار اتداس.",
            "قفلة الـ type.",
            "destructuring للـ props، و variant ليه قيمة افتراضية.",
            "الكلاس بيتبني من template literal، والضغطة بتنادي دالة الأب.",
            "قفلة الـ component.",
            "الأب اللي بيستخدم Button.",
            "بيبعت label كنص، و onClick كدالة بين { }.",
            "قفلة App."
          ],
          sol: R`التلات زراير بيظهروا بالـ labels بتاعتهم. اللي بعتله [[variant="ghost"]] الـ class بتاعه [[btn btn-ghost]]، والباقيين [[btn btn-primary]] لأن الـ default في الـ destructuring اشتغل.

مع [[variant="red"]] المحرر بيقول: «Type '"red"' is not assignable to type '"primary" | "ghost" | undefined'». لاحظ إن الصفحة في [[npm run dev]] ممكن تفضل شغالة والزرار ياخد [[btn-red]]، لأن Vite مبيعملش type check، لكن [[npm run build]] هيقع بنفس الـ error. ده بالظبط فايدة الـ union: الغلطة تتمسك قبل ما توصل للمستخدم.`,
          solCode: R`export default function App() {
  return (
    <>
      <Button label="Save" onClick={() => alert('saved')} />
      <Button label="Cancel" variant="ghost" onClick={() => alert('cancel')} />
      <Button label="Delete" onClick={() => alert('deleted')} />
    </>
  )
}`
        },
        {
          cmd: "children",
          title: "component يلف حوالين أي محتوى (composition)",
          desc: R`[[children]] prop خاصة: أي حاجة تكتبها بين فتحة الـ component وقفلته بتوصله فيها. كده تعمل Card أو Modal أو Layout يلف أي محتوى من غير ما يعرف هو إيه.

ودي أساس الـ composition: بدل component واحد ضخم بياخد عشرين prop، بتركّب components صغيرة جوه بعض. ولو محتاج أكتر من «فتحة»، ابعت JSX في props عادية زي [[actions]] أو [[sidebar]].`,
          example: R`import type { ReactNode } from 'react'

function Card({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="card">
      <header>{title} {actions}</header>
      <div className="card-body">{children}</div>
    </section>
  )
}
export default function Orders() {
  return <Card title="Orders" actions={<button>Export</button>}><p>No orders yet.</p></Card>
}`,
          try: R`استخدم نفس Card مرتين: مرة جواه جدول، ومرة جواه فورم. وجرّب تبعت [[actions]] فيها زرارين جوه Fragment.`,
          flag: "script",
          deep: {
            why: R`من غير composition بتلاقي نفسك بتعدّي بيانات على components مبتستخدمهاش عشان توصل لحفيد تحت (prop drilling)، أو بتعمل component واحد بياخد [[showHeader]] و [[headerColor]] و [[showFooter]] و... لحد ما يبقى مستحيل يتفهم.`,
            how: R`الـ JSX اللي بين الفتحة والقفلة بيتحط في [[props.children]]: ممكن يبقى نص، أو عنصر واحد، أو array عناصر. والنوع المناسب في TypeScript هو [[ReactNode]]، وبيقبل أي حاجة React تعرف ترسمها.

الـ composition بيحل الـ prop drilling قبل ما تفكر في context: بدل ما [[Layout]] ياخد [[user]] ويعدّيه لـ [[Sidebar]] اللي يعدّيه لـ [[Avatar]]، الصفحة نفسها تكتب [[<Layout sidebar={<Avatar user={user} />}>]]. كده Layout عمره ما لمس user.

وفيه فايدة أداء كمان: العناصر اللي في [[children]] الأب هو اللي عملها. فلو Card عنده state وعمل render، الـ children مبيعملوش render تاني طول ما الأب اللي فوق مغيّرهاش، لأنها نفس الـ objects.

وخد بالك من الفرق بين [[icon={Star}]] (بتبعت الـ component نفسه، والابن يرسمه [[<Icon />]]) و [[icon={<Star />}]] (بتبعت عنصر جاهز). الاتنين صح بس لازم تعرف بتعمل أنهي.`,
            when: "Layouts، و Cards، و Modals، و Providers (زي [[<QueryClientProvider>]] اللي بيلف التطبيق كله)، وأي component شغلته «يلف» أو «يرتّب» محتوى.",
            mistakes: R`تستخدم [[React.Children.map]] و [[cloneElement]] عشان تعدّل الـ children من جوه: هش وبيبوظ لو حد لف الابن في div. وتلجأ لـ context أو store عام بدري، والمشكلة كانت محلولة بإنك تبعت JSX جاهز.`
          },
          lines: [
            "نوع يقبل أي حاجة تترسم. [[import type]] لأنه type بس.",
            "Card بياخد عنوان، وفتحة اختيارية للأزرار، و children.",
            "بداية الـ JSX.",
            "العنصر اللي بيلف.",
            "العنوان وجنبه أي JSX اتبعت في actions.",
            "هنا بيترسم أي محتوى اتحط بين فتحة Card وقفلته.",
            "قفلة الـ section.",
            "قفلة القوس.",
            "قفلة Card.",
            "صفحة بتستخدم Card.",
            "زرار في actions، وفقرة في children.",
            "قفلة الصفحة."
          ],
          sol: R`نفس الإطار (العنوان والزرار فوق) بيتكرر، والجسم هو اللي بيتغير: جدول في مرة وفورم في مرة. Card نفسه متغيرش ولا سطر، لأنه مش عارف ولا محتاج يعرف إيه اللي جواه.

الـ Fragment بيخليك تبعت أكتر من عنصر في prop واحدة من غير div زيادة. لو بعتهم كـ array ([[actions={[<button/>, <button/>]}]]) هيشتغل بس هتلاقي warning إن كل child في list محتاج key. ولو TypeScript اشتكى إن [[children]] ناقصة، يبقى استخدمت Card من غير ما تحط حاجة بين الـ tags.`,
          solCode: R`export function Pages() {
  return (
    <>
      <Card title="Orders" actions={<><button>Export</button><button>Print</button></>}>
        <table>
          <tbody><tr><td>#1001</td><td>250 EGP</td></tr></tbody>
        </table>
      </Card>
      <Card title="New customer">
        <form><input name="name" placeholder="Name" /><button>Save</button></form>
      </Card>
    </>
  )
}`
        }
      ]
    },
    {
      t: "الـ state والـ events",
      l: 1,
      n: "الـ state ذاكرة الـ component، وتغييرها هو اللي بيعيد الرسم",
      items: [
        {
          cmd: "useState",
          title: "خلي الـ component يفتكر قيمة ويعيد الرسم لما تتغير",
          desc: R`[[useState]] بيدّيك قيمة ودالة تغيّرها. لما تنادي الدالة، React بتحفظ القيمة الجديدة وتعيد رسم الـ component بيها.

متغير عادي ([[let count = 0]]) مش هينفع: بيرجع صفر مع كل render، وتغييره مش بيقول لـ React ترسم. والقيمة جوه الـ render الواحد ثابتة (snapshot)، فلو هتحسب من القيمة القديمة استخدم الـ updater: [[setCount(c => c + 1)]].`,
          example: R`import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  function addFour() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
  }
  console.log('render', count)
  return <button onClick={addFour}>{count}</button>
}
// أول ضغطة: 3 مش 4، والـ console بيطبع render مرة واحدة بس (في Strict Mode وقت التطوير هتشوفه مرتين بنفس الرقم: ده نفس الـ render بيتنادى مرتين، مش أربعة)`,
          try: R`خمّن الرقم قبل ما تضغط. بعدين حط [[alert(count)]] بعد الـ setCount وشوف إنه بيطبع القيمة القديمة.`,
          flag: "script",
          deep: {
            why: "الـ component دالة بتتنادي من الأول مع كل render، فأي متغير جواها بيتولد من جديد. محتاج مكان برا الدالة يفضل فيه الرقم بين الـ renders، وطريقة تقول بيها لـ React «حاجة اتغيرت، ارسم تاني». [[useState]] بيدّيك الاتنين.",
            how: R`الـ state مش محفوظة جوه الدالة. React بتحفظها في الـ component instance بتاعها (fiber)، في list بالترتيب. أول [[useState]] في الدالة ليه الخانة الأولى، والتاني التانية، وهكذا. عشان كده الـ hooks لازم تتنادى بنفس الترتيب كل مرة.

[[setCount(x)]] مش بتغيّر [[count]] حالًا. بتحط التحديث في طابور وتطلب render. وكل الـ setState اللي حصلت في نفس الـ event بتتجمع في render واحد (batching). عشان كده الـ console طبع render واحد بس (أو نفس السطر مرتين في Strict Mode وقت التطوير، مش أربعة).

في المثال: [[count]] جوه الدالة دي صفر طول الوقت. أول سطرين بيقولوا «خليها 0 + 1» مرتين، يعني 1. والـ updater [[c => c + 1]] بياخد آخر قيمة في الطابور، فبتبقى 2 وبعدين 3.

ولو القيمة الجديدة زي القديمة بالظبط ([[Object.is]])، React ممكن تتخطى الـ render. والقيمة الأولى لو حسابها تقيل ابعتها دالة: [[useState(() => loadInitial())]] عشان تتحسب مرة واحدة مش مع كل render.`,
            when: "أي قيمة بتتغير مع الوقت وبتأثر على اللي ظاهر، والـ component ده صاحبها: نص input، أو modal مفتوح ولا لأ، أو التاب المختار.",
            mistakes: R`تستنى [[count]] يتغير على السطر اللي بعد [[setCount]]. وتعدّل object أو array في مكانه ([[items.push]]) بدل ما تعمل نسخة جديدة (الدرس الجاي). وتكتب [[useState(expensive())]] فالحساب يحصل كل render ويترمي. وتخزّن في state حاجة تقدر تحسبها من state تانية (درس derived state).`
          },
          lines: [
            "hook بيدّي الـ component ذاكرة.",
            "component عادي.",
            "قيمة وأداة تغييرها، والقيمة الأولى 0.",
            "دالة الضغطة.",
            "count هنا 0، فده «خليها 1».",
            "برضه «خليها 1»، لأن count لسه 0 في الـ render ده.",
            "updater: خد آخر قيمة في الطابور (1) وزوّد، فتبقى 2.",
            "وتاني من 2 لـ 3.",
            "قفلة الدالة.",
            "بيطبع مرة في كل render، فتشوف إن الأربع setState عملوا render واحد.",
            "اعرض الرقم، والضغطة تنادي addFour.",
            "قفلة الـ component."
          ],
          sol: R`التخمين الصح [[3]]، وأول ضغطة الزرار بيبقى 3 والـ console بيطبع [[render 3]] مرة واحدة (أو مرتين بنفس الرقم في Strict Mode). أول سطرين الاتنين بيقولوا «خليها [[0 + 1]]» لأن [[count]] في الـ render ده صفر، فالنتيجة 1. وبعدين الـ updater functions بتاخد آخر قيمة في الطابور: 2 ثم 3. والضغطة التانية توصّل لـ 6.

الـ [[alert(count)]] بيطلع [[0]] في أول ضغطة (والقيمة القديمة في أي ضغطة بعدها)، لأن setCount مبتغيرش المتغير اللي في إيدك، هي بتطلب render جديد فيه count جديد. اللي بيخمّن 4 فاكر إن [[setCount(count + 1)]] بيقرا آخر قيمة، واللي متوقع 4 renders فاكر إن كل set بيرسم لوحده، والحقيقة إن React بتجمعهم (batching) في render واحد.`
        },
        {
          cmd: "events",
          title: "اتعامل مع الضغط والكتابة وإرسال الفورم",
          desc: R`الـ events في React بتتكتب camelCase وبتاخد دالة: [[onClick={handleClick}]]. ابعت الدالة نفسها ومتنادهاش: [[onClick={handleClick()}]] بتتنفذ وقت الرسم مش وقت الضغط.

الـ handler بياخد event object، منه [[e.target.value]] في الـ input، و [[e.preventDefault()]] في الفورم عشان الصفحة متعملش reload. ولو محتاج تبعت argument، لفّها في arrow: [[onClick={() => remove(id)}]].`,
          example: R`import { useState, type FormEvent } from 'react'

function SearchBox({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('')
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSearch(q.trim())
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button type="submit">Search</button>
      <button type="button" onClick={() => setQ('')}>Clear</button>
    </form>
  )
}`,
          try: R`امسح [[type="button"]] من زرار Clear واضغطه: هتلاقيه عمل submit للفورم. وبعدين امسح [[e.preventDefault()]] وشوف الصفحة بتعمل reload.`,
          flag: "script",
          deep: {
            why: "الواجهة لازم ترد على المستخدم: ضغطة، أو كتابة، أو إرسال. React بتدّيك طريقة واحدة تكتب بيها الـ events على كل العناصر، بنفس الشكل في كل المتصفحات.",
            how: R`React مش بتحط listener على كل زرار. بتحط listener واحد لكل نوع event على الـ root، ولما event يحصل بتدوّر مين الـ component اللي ليه handler وتناديه (event delegation). والـ [[e]] اللي بيوصلك SyntheticEvent: غلاف حوالين الـ event الأصلي بنفس الـ API ([[preventDefault]] و [[stopPropagation]] و [[target]])، والأصلي موجود في [[e.nativeEvent]].

[[onChange]] في React بيشتغل مع كل حرف، زي event الـ [[input]] في المتصفح، مش زي [[change]] الأصلي اللي بيستنى لما تسيب الخانة.

الزرار جوه form نوعه الافتراضي [[submit]]، فأي زرار مش للإرسال لازم [[type="button"]]. و [[onSubmit]] بيتنادي بالـ Enter كمان، مش بالزرار بس، عشان كده الأحسن تحط منطق الإرسال في onSubmit مش في onClick بتاع الزرار.

والـ handler بيقرا الـ props والـ state من الـ render اللي اتعمل فيه (closure)، فبيشوف القيم اللي كانت ظاهرة وقت ما المستخدم ضغط.`,
            when: "أي تفاعل. والعادة في التسمية: [[handleX]] للدالة جوه الـ component، و [[onX]] للـ prop اللي بيستلمها ([[onSearch]] و [[onClose]]).",
            mistakes: R`[[onClick={setOpen(true)}]] بتتنادى وقت الرسم، فتعمل setState، فـ render، فتتنادى تاني: «Too many re-renders». الصح [[onClick={() => setOpen(true)}]]. وزرار جوه فورم من غير [[type="button"]] بيبعت الفورم. و [[div]] بـ onClick بدل [[button]]: مبيشتغلش بالكيبورد ولا بيوصل لقارئ الشاشة (تفاصيل الـ accessibility في تاب «HTML و CSS»، درس aria).`
          },
          lines: [
            "useState، و FormEvent كـ type بس.",
            "component بياخد دالة من الأب تستلم كلمة البحث.",
            "النص اللي في الخانة.",
            "handler الإرسال، ونوع الـ event محدد.",
            "امنع المتصفح من إنه يبعت الفورم ويعمل reload.",
            "ابعت الكلمة للأب من غير مسافات في الأطراف.",
            "قفلة الدالة.",
            "بداية الـ JSX.",
            "onSubmit بيشتغل بالزرار وبالـ Enter.",
            "كل حرف يروح للـ state (controlled input).",
            "زرار الإرسال.",
            "[[type=\"button\"]] عشان ميبعتش الفورم، والضغطة تفضّي الخانة.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`من غير [[type="button"]]، أي زرار جوه form نوعه الافتراضي [[submit]]، فدوسة Clear بتمسح الخانة وكمان بتعمل submit وتنادي onSearch. عشان كده أي زرار جوه فورم مش المقصود بيه الإرسال لازم تكتبله [[type="button"]].

ومن غير [[e.preventDefault()]] المتصفح بيعمل اللي بيعمله مع أي فورم: يبعت GET لنفس الصفحة (هتلاقي [[?]] في آخر الـ URL) ويعمل reload، فكل الـ state بتضيع والـ console بيتمسح. لو لاحظت إن الـ log بتاعك «بيظهر ويختفي»، ده غالبًا السبب.`
        },
        {
          cmd: "immutable updates",
          title: "عدّل object أو array في الـ state من غير ما تبوّظها",
          desc: R`React بتعرف إن الـ state اتغيرت لما المرجع (reference) يتغير. لو عدّلت نفس الـ array بـ [[push]] أو نفس الـ object بـ [[user.name = 'x']]، المرجع هو هو، فالشاشة ممكن متتحدثش.

القاعدة: اعمل نسخة جديدة. spread [[...]] للـ objects، و [[map]] للتعديل، و [[filter]] للمسح، و array جديدة فيها القديم والجديد للإضافة. ولو الـ state متداخلة أوي، بسّط شكلها أو استخدم immer.`,
          example: R`// جوه component
type Todo = { id: number; text: string; done: boolean }
const [todos, setTodos] = useState<Todo[]>([])
const add = (text: string) =>
  setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
const remove = (id: number) =>
  setTodos(prev => prev.filter(t => t.id !== id))
const [user, setUser] = useState({ name: 'Sara', address: { city: 'Cairo' } })
const moveTo = (city: string) =>
  setUser(prev => ({ ...prev, address: { ...prev.address, city } }))`,
          try: R`اكتب [[toggle]] غلط: [[prev.find(t => t.id === id)!.done = true; return prev]]، وشوف الـ checkbox مش بيتحدث. رجّعها بـ map وقارن.`,
          flag: "script",
          deep: {
            why: "React مش بتفتش جوه الـ objects تشوف إيه اتغير، ده هيبقى بطيء جدًا. بتقارن المرجع بس: قديم ولا جديد. فلو غيّرت جوه نفس الـ object، بالنسبة لها مفيش حاجة حصلت.",
            how: R`[[setTodos(x)]] بتقارن x بالقيمة الحالية بـ [[Object.is]]. نفس المرجع يبقى ممكن تتخطى الـ render. ونفس المقارنة بتستخدمها dependencies الـ effects و [[useMemo]] و [[memo]]، فالتعديل في المكان بيبوّظهم كلهم.

الـ spread بينسخ مستوى واحد بس (shallow copy). في [[user]]، [[{ ...prev }]] بيعمل object جديد بس [[address]] جواه لسه نفس الـ object القديم. عشان كده لما تغيّر city لازم تنسخ address كمان. القاعدة: انسخ كل مستوى في الطريق للحاجة اللي بتغيّرها، وسيب الباقي مشترك.

خد بالك من الدوال اللي بتعدّل في المكان: [[push]] و [[splice]] و [[sort]] و [[reverse]]. بدائلها اللي بترجع نسخة: spread، و [[filter]]، و [[toSorted]] و [[toReversed]] (ES2023)، أو [[slice().sort()]].

ولما الـ state تبقى متداخلة جامد، immer بيخليك تكتب كأنك بتعدّل ([[draft.address.city = city]]) وهو بيطلّع نسخة جديدة صح، و Zustand بيدعمه كـ middleware.`,
            when: "أي state فيها object أو array. والـ updater [[prev => ...]] أأمن لأنه بيشتغل على آخر قيمة حتى لو فيه تحديثات تانية في الطابور.",
            mistakes: R`[[todos.push(x); setTodos(todos)]]: نفس المرجع، فمفيش render. و [[setTodos(todos.sort())]]: [[sort]] عدّلت الـ state الأصلية قبل ما React تشوفها. و [[structuredClone]] للـ state كلها مع كل تعديل: شغال بس بيعمل نسخ ملهوش لازمة ويبوّظ memo لأن كل حاجة بقت جديدة.`
          },
          lines: [
            "شكل العنصر.",
            "array فاضية ونوعها محدد.",
            "إضافة:",
            "array جديدة فيها القديم وبعدهم العنصر الجديد.",
            "تعديل عنصر:",
            "map بترجع array جديدة، والعنصر المقصود بس بيتعمله نسخة بـ done مقلوبة.",
            "مسح:",
            "filter بترجع array جديدة من غير العنصر ده.",
            "state فيها object جواه object.",
            "تغيير المدينة:",
            "انسخ user، وانسخ address جواه، وغيّر city بس."
          ],
          sol: R`بالنسخة الغلط الـ checkbox مش بيتعلّم. انت عدّلت الـ object القديم ورجّعت نفس الـ array، فـ React قارنت بـ [[Object.is]] ولقت نفس المرجع، فمعملتش render خالص. والأسوأ إن البيانات نفسها اتغيرت فعلًا، فأول ما أي state تانية تعمل render الـ checkbox يتعلّم فجأة، وده bug صعب تتبعه.

بالـ map كل ضغطة بترجع array جديدة فيها object جديد للعنصر اللي اتغير بس، فالـ render بيحصل والباقي زي ما هو بنفس المرجع (وده اللي بيخلي [[memo]] يشتغل صح بعدين).`,
          solCode: R`// غلط: نفس المرجع، React مش هتعيد الرسم
const toggleBad = (id: number) =>
  setTodos(prev => { prev.find(t => t.id === id)!.done = true; return prev })
// صح: array جديدة و object جديد للعنصر اللي اتغير بس
const toggle = (id: number) =>
  setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))`
        },
        {
          cmd: "conditional rendering",
          title: "اعرض حاجة أو خبّيها حسب الحالة",
          desc: R`مفيش [[if]] جوه JSX، فبتستخدم تلات أشكال: early return قبل الـ JSX لحالات زي loading و error، و ternary [[? :]] لما يبقى فيه اختيارين، و [[&&]] لما يبقى حاجة أو لا شيء.

واحذر من [[&&]] مع الأرقام: [[{count && <Badge />}]] لو count صفر هتطبع 0 على الشاشة. خليها [[{count > 0 && <Badge />}]].`,
          example: R`type Order = { id: string; total: number }
function Orders({ orders, isLoading, error }: { orders: Order[]; isLoading: boolean; error?: string }) {
  if (isLoading) return <p>Loading...</p>
  if (error) return <p role="alert">{error}</p>
  return (
    <section>
      {orders.length === 0 ? <p>No orders yet</p> : <OrderTable rows={orders} />}
      {orders.length > 0 && <p>{orders.length} orders</p>}
    </section>
  )
}`,
          try: R`غيّر السطر الأخير لـ [[{orders.length && <p>...</p>}]] وابعت array فاضية: هتلاقي 0 ظاهر على الشاشة.`,
          flag: "script",
          deep: {
            why: "نفس الـ component بيعرض حاجات مختلفة حسب الحالة: بيحمّل، أو فيه خطأ، أو فاضي، أو فيه بيانات. لو نسيت حالة منهم، المستخدم يشوف صفحة فاضية أو تقع.",
            how: R`جوه [[{ }]] بتحط expression. [[false]] و [[null]] و [[undefined]] و [[true]] مبيترسموش، بس الأرقام بتترسم حتى الصفر، والنص الفاضي مش بيبان.

[[a && b]] في JavaScript بترجع a لو كانت falsy. فـ [[0 && <Badge />]] بترجع 0، و React بترسمه. عشان كده خلي الشرط boolean صريح.

الـ early return ([[if (isLoading) return ...]]) بيخلي الـ JSX الرئيسي نضيف. بس لازم يكون بعد كل الـ hooks: لو فيه [[useState]] بعد الـ return، هيتنادى أحيانًا ومش هيتنادى أحيانًا، و React هتقع بـ «Rendered fewer hooks than expected».

والفرق بين تخبية وشيل: الشرط في JSX بيشيل الـ component من الشجرة، فالـ state اللي جواه بتروح. لو عايزه يفضل فاكر (زي تاب فيه فورم متكتب نصه)، خبّيه بـ CSS ([[hidden]])، أو استخدم [[<Activity mode="hidden">]] اللي نزل في React 19.2 وبيخبّي ويحافظ على الـ state.`,
            when: "Loading و error و empty states في كل صفحة بتجيب بيانات، وأجزاء بتظهر حسب صلاحيات المستخدم.",
            mistakes: R`الـ [[0 &&]]. و hooks بعد early return. و ternary جوه ternary جوه ternary: اطلع بيها لمتغير قبل الـ return أو component صغير. وتنسى الـ empty state، فالمستخدم يشوف جدول فاضي ومش عارف هل لسه بيحمّل ولا مفيش بيانات.`
          },
          lines: [
            "شكل الطلب.",
            "component بياخد الطلبات وحالة التحميل والخطأ.",
            "early return: لو بيحمّل، اعرض ده بس.",
            "ولو فيه خطأ اعرضه، و [[role=\"alert\"]] عشان قارئ الشاشة يقراه.",
            "الحالة العادية.",
            "بداية الـ section.",
            "ternary: فاضي ولا فيه بيانات.",
            "&& بشرط boolean صريح، عشان الصفر ميظهرش.",
            "قفلة الـ section.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`بـ array فاضية الـ section بيبقى فيه «No orders yet» وجنبها [[0]]. [[0 && <p/>]] نتيجتها [[0]] مش false، و React بترسم الأرقام (بتتجاهل false و null و undefined بس). في React Native ده مش مجرد صفر على الشاشة، ده crash لأن النص لازم يبقى جوه [[<Text>]].

الحل: خلي الشرط boolean صريح، [[orders.length > 0 && ...]] زي المثال الأصلي، أو ternary. ولو شفت [[NaN]] على الشاشة فهو نفس المشكلة مع رقم تاني.`
        },
        {
          cmd: "key",
          title: "ليه كل عنصر في list محتاج مفتاح ثابت",
          desc: R`لما ترسم list بـ [[map]]، كل عنصر لازم ياخد [[key]] فريد وثابت، غالبًا الـ id اللي جاي من البيانات. React بتستخدمه عشان تعرف مين هو مين بين render والتاني.

الـ index كـ key بيبوّظ الدنيا لما الـ list يتغير ترتيبها أو يتمسح منها عنصر: الـ state والكلام المكتوب في input جوه عنصر بيروح لعنصر تاني. جرّب المثال: اكتب في أول خانة وامسح أول عنصر.`,
          example: R`function Row({ name }: { name: string }) {
  const [note, setNote] = useState('')
  return <li>{name} <input value={note} onChange={e => setNote(e.target.value)} /></li>
}
export default function People() {
  const [people, setPeople] = useState([{ id: 1, name: 'Ali' }, { id: 2, name: 'Mona' }])
  return (
    <>
      <button onClick={() => setPeople(p => p.slice(1))}>Remove first</button>
      <ul>{people.map((p, i) => <Row key={i} name={p.name} />)}</ul>
    </>
  )
}`,
          try: R`اكتب «hello» جنب Ali واضغط Remove first: هتلاقي «hello» بقت جنب Mona. غيّر [[key={i}]] لـ [[key={p.id}]] وجرّب تاني.`,
          flag: "script",
          deep: {
            why: "بين render والتاني React لازم تقرر: العنصر ده هو نفسه اللي كان قبل كده (فتحافظ على الـ state والـ DOM بتاعه) ولا جديد؟ من غير key مفيش غير الترتيب، والترتيب بيتغير.",
            how: R`React بتطابق الأولاد القدام بالجداد عن طريق الـ key. في المثال بـ [[key={i}]]: قبل المسح كان key 0 هو Ali و key 1 هو Mona. بعد المسح Mona بقت في index 0، يعني key 0. React تقول «key 0 لسه موجود، يبقى هو نفس الـ Row»، فتحتفظ بالـ state بتاعه (note = hello) وتغيّر الـ prop بس لـ Mona. و key 1 اختفى، فتشيل الـ Row التاني اللي كان فاضي. النتيجة: hello جنب Mona.

بـ [[key={p.id}]]: key 1 (Ali) اختفى فيتشال بالـ state بتاعه، و key 2 (Mona) لسه موجود بـ state بتاعه. مظبوط.

الـ key لازم يكون فريد بين الإخوات بس، مش في التطبيق كله. ومبيوصلش كـ prop للـ component. ولو بترجع أكتر من عنصر لكل item، استخدم [[<Fragment key={id}>]] بدل [[<>]].

والـ key بيتعمل وقت ما البيانات تتعمل (id من الداتابيز، أو [[crypto.randomUUID()]] لما المستخدم يضيف عنصر)، مش وقت الرسم.

والـ index مقبول في حالة واحدة: list ثابتة عمرها ما هتتغير ترتيبها ولا هيتمسح منها، ومفيش state جوه عناصرها.`,
            when: "أي [[map]] بيطلّع JSX. و React بتطلّع warning في الـ console لو نسيته.",
            mistakes: R`[[key={Math.random()}]] أو [[crypto.randomUUID()]] جوه الـ map: key جديد كل render، فكل عنصر بيتشال ويتعمل من الأول، والـ input بيفقد الـ focus مع كل حرف. وفي مشروع حقيقي كان فيه عشرات [[key={index}]]، منها list صور فيها زرار مسح لكل صورة: طول ما مفيش state جوه العنصر الغلط مش باين، وأول ما تضيف loading للصورة أو animation هيظهر على الصورة الغلط.`
          },
          lines: [
            "صف فيه اسم وخانة ملاحظة.",
            "كل صف ليه state خاصة بيه.",
            "الاسم والخانة.",
            "قفلة الصف.",
            "الـ list.",
            "شخصين، كل واحد ليه id ثابت.",
            "بداية الـ JSX.",
            "Fragment عشان الزرار و ul جنب بعض.",
            "امسح أول شخص.",
            "الغلط هنا: key هو الترتيب مش الـ id.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة الـ component."
          ],
          sol: R`بـ [[key={i}]]: بعد Remove first هتلاقي «Mona» ومعاها «hello». React شافت إن اللي اتشال هو key [[1]] (آخر واحد)، و key [[0]] لسه موجود، فخلّت الـ state بتاع أول Row (اللي فيه hello) وغيّرت الـ name بس لـ Mona.

بـ [[key={p.id}]]: «Mona» والخانة فاضية، لأن React عرفت إن Row بتاع id 1 هو اللي اتمسح بالـ state بتاعته. القاعدة: الـ key لازم يتبع البيانات مش المكان. الـ index مقبول بس لو الـ list عمرها ما هتترتب أو يتشال منها أو يتضاف في نصها.`
        }
      ]
    },
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
    },
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
          desc: R`كل قيمة من الـ component بتستخدمها جوه الـ effect (props، و state، ودوال ومتغيرات متعرّفة جوه الـ component) لازم تبقى في الـ dependencies. القاعدة دي eslint بيفرضها بـ [[react-hooks/exhaustive-deps]]، وسيبها شغالة.

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
    },
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
            "القاعدة في مكان واحد: مفيش مدينة؟ ارجع نفس الـ state، فمفيش render.",
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

لو الصفحة وقعت بـ «SyntaxError: Unexpected token»، الـ try/catch مش حوالين الـ parse. ولو الرقم رجع صفر مع كل refresh من غير ما تبوّظ حاجة، غالبًا بتقرا في effect بعد الرسم بدل الـ lazy initializer، أو الـ key اتغير.`,
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
          try: R`اعمل [[DatePicker]] بسيط: [[<input type="date">]] بياخد [[value?: Date]] ويرجّع [[new Date(e.target.value)]] في onChange. شغّل الفورم: امسح السطر الوحيد ودوس Save واقرا الرسايل. بعدين ضيف سطرين، واكتب في التاني [[Pen]] و [[3]]، واطبع البيانات في onSave. وأخيرًا امسح السطر الأول من سطرين مكتوبين، واتأكد إن اللي فضل ظاهر هو نفسه اللي بيتبعت.`,
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
          sol: R`لما تمسح السطر الوحيد وتدوس Save يظهر «Add at least one line» و «Pick a date» (والـ customer فاضي كمان). بعد ما تكمّل، onSave بتوصلها بيانات فيها سطرين [[{ item: 'Mug', qty: 1 }]] و [[{ item: 'Pen', qty: 3 }]]، والكمية رقم مش نص، و [[dueDate]] من نوع Date.

لما تمسح الأول من [[Mug]] و [[Pen]]، اللي يفضل ظاهر [[Pen]] واللي يتبعت سطر واحد [[{ item: 'Pen', qty: 1 }]]. ومعلومة: لو جرّبت [[key={index}]] في الفورم البسيط ده هتلاقي النتيجة نفسها، لأن RHF بيرجع يكتب القيم في الخانات بعد المسح. المشكلة بتظهر أول ما السطر يبقى component ليه state جوه (سطر مفتوح ولا مقفول، أو date picker ليه state داخلية، أو animation): الـ state دي بتتزحلق للسطر اللي بعده، زي درس key بالظبط. عشان كده الـ docs بتاعة RHF بتقول [[field.id]] دايمًا.

لو الكمية وصلت [[NaN]] أو zod قال «expected number»، ناقصك [[valueAsNumber]].`,
          solCode: R`function DatePicker({ value, onChange, onBlur }: { value?: Date; onChange: (d: Date) => void; onBlur: () => void }) {
  return (
    <input
      aria-label="Due date"
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ''}
      onChange={e => onChange(new Date(e.target.value))}
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
    },
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
            mistakes: R`تنسى [[api.middleware]] في الـ store: الطلبات بتشتغل مرة والـ refetch والـ invalidation لأ، و RTK بيطبع warning. و tag في invalidates مش مكتوب في [[tagTypes]]. وتنسخ [[data]] في slice تانية «عشان تعدّل فيها». و [[fetchBaseQuery]] مبيرميش على 4xx و 5xx زي fetch، هو بيرجّعها في [[error]]، فمش محتاج [[res.ok]] هنا بس لازم تعرض الـ error.`
          },
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
    },
    {
      t: "اللغات والأخطاء والتحميل",
      l: 2,
      n: "عربي وإنجليزي و RTL، وخطأ في جزء ميوقعش الصفحة، وكود بيتحمّل وقت الحاجة، و modals",
      items: [
        {
          cmd: "react-i18next",
          title: "تطبيق بأكتر من لغة",
          desc: R`react-i18next بيحط كل النصوص في ملفات JSON لكل لغة، وفي الـ component بتنادي [[t('cart.title')]] بدل ما تكتب النص. [[useTranslation]] بيدّيك [[t]] و [[i18n]]، و [[i18n.changeLanguage('ar')]] بيغيّر اللغة وكل component بيستخدم t بيعيد الرسم.

المتغيرات بتتكتب [[{{name}}]] جوه النص، والجمع بيتظبط لوحده حسب [[count]] بلواحق زي [[_one]] و [[_other]]، والعربي ليه ٦ أشكال. وفي Next.js الأشهر next-intl، وتفاصيله في تاب Next.js.`,
          example: R`import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: { greeting: 'Hello {{name}}', items_one: '{{count}} item', items_other: '{{count}} items' } },
    ar: { translation: { greeting: 'أهلًا {{name}}', items_zero: 'مفيش حاجة', items_one: 'حاجة واحدة', items_two: 'حاجتين', items_few: '{{count}} حاجات', items_many: '{{count}} حاجة', items_other: '{{count}} حاجة' } },
  },
})
function Header({ name, count }: { name: string; count: number }) {
  const { t, i18n } = useTranslation()
  return <header>{t('greeting', { name })} · {t('items', { count })} <button onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}>EN/AR</button></header>
}`,
          try: R`[[npm i i18next react-i18next]]، وحط الـ init في [[src/i18n.ts]] واعمله import في [[main.tsx]]. جرّب count بـ 0 و 1 و 2 و 3 و 11 بالعربي وشوف الشكل بيتغير. (النتيجة: مفيش حاجة، وحاجة واحدة، وحاجتين، و 3 حاجات، و 11 حاجة.)`,
          flag: "script",
          deep: {
            why: "لو النصوص مكتوبة جوه الـ components، إضافة لغة معناها تعدّل كل ملف. ولو عملت [[lang === 'ar' ? ... : ...]] في كل حتة، الكود بيتملى شروط والجمع بيطلع غلط. ملفات ترجمة منفصلة معناها المترجم يشتغل من غير ما يلمس الكود.",
            how: R`i18next هو المحرك (مش مربوط بـ React)، و react-i18next بيربطه بـ React عن طريق [[initReactI18next]]. الـ init بيتعمل مرة واحدة في ملف لوحده ويتعمله import في [[main.tsx]] قبل App.

[[useTranslation]] بيشترك في event [[languageChanged]]، فلما تنادي changeLanguage كل component بيستخدمه بيعيد الرسم. و [[t('key')]] بيدوّر في اللغة الحالية، ولو المفتاح مش موجود يروح لـ fallbackLng، ولو مش موجود خالص يرجّع المفتاح نفسه كنص (عشان تلاحظه).

الجمع مبني على [[Intl.PluralRules]] بتاع المتصفح: للإنجليزي one و other، وللعربي zero و one و two و few (3 لـ 10) و many (11 لـ 99) و other. انت بتكتب [[t('items', { count })]] وهو بيختار اللاحقة.

[[escapeValue: false]] لأن React أصلًا بتعمل escape لأي نص، فمن غيرها هتشوف [[&amp;]] بدل [[&]].

في مشروع أكبر، الترجمات في [[public/locales/ar/common.json]] وبتتحمّل بـ i18next-http-backend وقت الحاجة، ومقسّمة namespaces (common و checkout و dashboard). والتحميل ده async، و react-i18next افتراضيًا بيستخدم Suspense، فلازم [[<Suspense>]] فوق. و i18next-browser-languagedetector بيختار اللغة من cookie أو localStorage أو المتصفح.

ولو الجملة فيها link أو bold في النص، [[<Trans>]] بيسمحلك تحط JSX جوه الترجمة. والأرقام والتواريخ بـ [[Intl.NumberFormat]] و [[Intl.DateTimeFormat]] حسب اللغة.`,
            when: "أي تطبيق هيبقى فيه أكتر من لغة، حتى لو «بعدين». نقل النصوص من الكود بعد ما يكبر أصعب بكتير.",
            mistakes: R`تبني الجملة من حتت [[t('hello') + ' ' + name]]: ترتيب الكلام في العربي مختلف، استخدم [[{{name}}]]. و [[count + ' items']] بإيدك بدل الجمع. و http backend من غير Suspense فالتطبيق يقع أو يفضل فاضي. وفي مشروع حقيقي كان [[preload]] للغتين وكل الـ ١١ namespace من أول تحميل: ٢٢ ملف JSON قبل ما الصفحة تظهر، وده عكس فكرة التحميل وقت الحاجة.`
          },
          lines: [
            "المحرك.",
            "الربط مع React، والـ hook.",
            "سجّل الربط وابدأ.",
            "اللغة الأولى.",
            "لو مفتاح ناقص في العربي، خده من الإنجليزي.",
            "React بتعمل escape لوحدها، فمنعملش مرتين.",
            "الترجمات (في مشروع حقيقي في ملفات JSON منفصلة).",
            "الإنجليزي: متغير بين {{ }}، وشكلين للجمع.",
            "العربي: ستة أشكال للجمع حسب الرقم.",
            "قفلة resources.",
            "قفلة init.",
            "component بيستخدم الترجمة.",
            "t للنصوص، و i18n لتغيير اللغة.",
            "نص بمتغير، وجمع حسب count، وزرار بيقلب اللغة فكل حاجة تعيد الرسم.",
            "قفلة."
          ],
          sol: R`بالعربي: [[0]] «مفيش حاجة»، [[1]] «حاجة واحدة»، [[2]] «حاجتين»، [[3]] «3 حاجات»، [[11]] «11 حاجة»، ولو جربت [[100]] «100 حاجة». i18next بيسأل [[Intl.PluralRules('ar')]] عن الفئة (zero و one و two و few من 3 لـ 10، و many من 11 لـ 99، و other للباقي) وبيضيف الـ suffix للـ key. ودوسة EN/AR بتقلب لـ «Hello Sara · 3 items».

لو شفت كلمة [[items]] نفسها على الشاشة، يبقى الـ init متعملوش import في [[main.tsx]]، أو مبعتش [[count]] أصلًا. ولو شفت «3 حاجة»، يبقى [[items_few]] ناقصة ووقع على other.`,
          solCode: R`// src/main.tsx
import './i18n'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(<App />)`
        },
        {
          cmd: "RTL",
          title: "اقلب اتجاه الصفحة مع العربي",
          desc: R`لما اللغة تبقى عربي لازم [[<html dir="rtl" lang="ar">]]، والمتصفح بعدها بيقلب ترتيب النص والـ flex والـ grid لوحده. والاتجاه دايمًا محسوب من اللغة، مش state لوحده: [[i18n.dir()]] بيرجّع [[rtl]] أو [[ltr]].

والـ CSS اكتبه بالخصائص المنطقية: [[margin-inline-start]] بدل [[margin-left]]، وفي Tailwind [[ms-4]] و [[pe-2]] و [[text-start]] بدل [[ml-4]] و [[pr-2]] و [[text-left]]. كده نفس الكلاس يشتغل صح في الاتجاهين.`,
          example: R`import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useDocumentDirection() {
  const { i18n } = useTranslation()
  const dir = i18n.dir(i18n.language)
  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = dir
  }, [i18n.language, dir])
  return dir
}
function PriceRow({ label, price }: { label: string; price: string }) {
  return <div className="flex justify-between gap-2 ps-4 text-start"><span>{label}</span><bdi dir="ltr">{price}</bdi></div>
}`,
          try: R`نادي الـ hook في App، واقلب اللغة، وشوف الـ flex بيتقلب لوحده. بعدين حط رقم تليفون [[+20 100 000 0000]] جوه جملة عربي من غير [[<bdi>]] وشوف العلامة بتروح فين.`,
          flag: "script",
          deep: {
            why: "العربي مش ترجمة نصوص بس: الصفحة كلها بتتقلب. لو كاتب [[margin-left]] و [[left: 0]] و [[text-align: left]] في كل حتة، هتقضي أيام تكتب overrides لـ [[[dir=rtl]]]، وكل component جديد هيتنسي.",
            how: R`[[dir]] على [[<html>]] بيحدد الاتجاه الأساسي للصفحة. الـ flex بـ [[row]] بيمشي مع اتجاه السطر، فبيتقلب لوحده، ونفس الكلام للـ grid وترتيب الأعمدة في الجداول.

الخصائص المنطقية بتقول «البداية» و «النهاية» بدل «شمال» و «يمين»: [[margin-inline-start]] بتبقى شمال في الإنجليزي ويمين في العربي. و Tailwind v4 عنده [[ms-*]] و [[me-*]] و [[ps-*]] و [[pe-*]] و [[start-*]] و [[end-*]] و [[text-start]]، و variant [[rtl:]] للحاجات اللي لازم تتقلب يدوي زي أيقونة سهم ([[rtl:rotate-180]]). تفاصيل CSS في تاب HTML و CSS.

الأرقام والإيميلات والأكواد جوه نص عربي ممكن تتلخبط بسبب خوارزمية الاتجاه (bidi): [[+20]] ممكن تطلع [[20+]]. [[<bdi>]] أو [[dir="ltr"]] على العنصر بيعزل اتجاهه.

الـ effect هنا مبرر، لأن [[<html>]] برا شجرة React. والاتجاه محسوب من اللغة في كل render، فمستحيل يختلفوا. و [[lang]] مهم لقارئ الشاشة والخطوط والـ hyphenation.

ومكتبات كتير محتاجة تعرف: carousels ليها prop اسمه [[rtl]]، و charts (recharts) ممكن تحتاج [[reversed]] على المحور. وفي Next.js حط [[dir]] و [[lang]] على [[<html>]] في الـ root layout من السيرفر، فمفيش وميض.`,
            when: "أي تطبيق فيه عربي. وحتى لو التطبيق عربي بس، اكتب logical properties من الأول.",
            mistakes: R`[[ml-4]] و [[left-0]] في كل حتة وبعدين patches. ونسيان [[lang]]. وأيقونات أسهم متتقلبش. وفي مشروع حقيقي كان فيه hook بيخزّن isRTL في state، و [[forceUpdate]]، و [[setTimeout]] بـ 50ms عشان «كل الـ components تعيد الرسم»، وكمان component تاني بيعمل نفس الشغل بـ [[requestAnimationFrame]]: كل ده بدل قيمة محسوبة من اللغة و effect واحد.`
          },
          lines: [
            "useEffect للـ DOM اللي برا React.",
            "عشان نقرا اللغة الحالية.",
            "hook يظبط اتجاه الصفحة.",
            "i18n، و useTranslation بيعيد الرسم لما اللغة تتغير.",
            "الاتجاه محسوب من اللغة: rtl للعربي، ltr للإنجليزي.",
            "effect لأن html برا شجرة React:",
            "lang للقارئ والخطوط.",
            "dir يقلب الصفحة كلها.",
            "يتعاد لما اللغة تتغير.",
            "رجّعه لو component محتاجه.",
            "قفلة الـ hook.",
            "صف فيه عنوان وسعر.",
            "ps و text-start بيتقلبوا لوحدهم، و bdi بيعزل اتجاه السعر.",
            "قفلة."
          ],
          sol: R`بعد ما تقلب لعربي، في Elements هتلاقي [[<html lang="ar" dir="rtl">]]، والـ flex اتقلب لوحده: الـ label بقى يمين والسعر شمال، و [[ps-4]] بقت padding من اليمين. ولما ترجع إنجليزي كل حاجة ترجع.

الرقم من غير [[<bdi>]] في جملة عربي هيتعرض كده: [[0000 000 100 20+]]. العلامة بتروح لآخر الرقم من ناحية اليمين وترتيب المجموعات بيتقلب، لأن الـ + والمسافات بياخدوا اتجاه الكلام العربي اللي حواليهم. [[<bdi dir="ltr">]] بيعزل الرقم فيتعرض [[+20 100 000 0000]] صح.`
        },
        {
          cmd: "ErrorBoundary",
          title: "خطأ في جزء ميوقّعش الصفحة كلها",
          desc: R`لو component رمى error وهو بيترسم، React بتشيل الشجرة كلها وتسيب صفحة بيضا. الـ error boundary بيمسك الأخطاء دي في الجزء اللي تحته بس، ويعرض بديل (fallback) فيه زرار «حاول تاني».

React لسه بتطلب class component للـ boundary، فالعادي تستخدم [[react-error-boundary]]: [[<ErrorBoundary FallbackComponent={...}>]]، و [[onError]] يبعت الخطأ لخدمة logging، و [[resetKeys]] يصفّر الـ boundary لما قيمة تتغير (زي الـ route).`,
          example: R`import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  return <div role="alert"><p>{message}</p><button onClick={resetErrorBoundary}>Try again</button></div>
}
export function Page() {
  const { pathname } = useLocation()
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={(err, info) => logError(err, info.componentStack)} resetKeys={[pathname]}>
      <Dashboard />
    </ErrorBoundary>
  )
}`,
          try: R`[[npm i react-error-boundary]]، واعمل component بيرمي error لو [[Math.random() > 0.5]]، ولفّه في الـ boundary. دوس Try again كذا مرة. بعدين ارمي الـ error من onClick بدل الرسم وشوف إن الـ boundary مش بيمسكه.`,
          flag: "script",
          deep: {
            why: "من غير boundaries، error واحد في chart صغير في جنب الصفحة بيشيل التطبيق كله والمستخدم يشوف شاشة بيضا. React عملت كده عن قصد: إنها تسيب واجهة مكسورة أخطر من إنها تشيلها. الـ boundary بيحدد انت عايز الكسر يقف فين.",
            how: R`الـ boundary class فيها [[static getDerivedStateFromError]] (بتحوّل الـ state لـ «فيه خطأ» فالـ render الجاي يعرض الـ fallback) و [[componentDidCatch]] (للـ logging). react-error-boundary بيلفهم في component بـ props سهلة.

بيمسك الأخطاء وقت الرسم، وفي الـ lifecycle، وفي الـ effects، في أي component تحته. ومبيمسكش: أخطاء الـ event handlers (دي try/catch عادي)، والكود الـ async (setTimeout أو promise برا React)، والـ SSR، وأخطاء الـ boundary نفسه.

عشان توصّل خطأ async أو من handler للـ boundary: [[const { showBoundary } = useErrorBoundary()]] وبعدين [[showBoundary(err)]]. ومع TanStack Query [[throwOnError: true]] بيرمي خطأ الـ query للـ boundary.

[[resetKeys]]: لو أي قيمة فيه اتغيرت، الـ boundary بيرجع يحاول يرسم الأولاد. بالـ pathname، لما المستخدم يروح صفحة تانية الخطأ بيختفي بدل ما يفضل عالق.

والتوزيع: واحد فوق خالص كآخر خط دفاع، وواحد حوالين كل route، وواحد حوالين الحاجات الخطرة (widgets، و charts، ومكتبات برا). وفي React 19 تقدر تحط [[onCaughtError]] و [[onUncaughtError]] في [[createRoot]] عشان تبعت كل الأخطاء لـ logging من مكان واحد.

في التطوير React بتطبع الخطأ في الـ console حتى لو الـ boundary مسكه، ده طبيعي. (والـ overlay بتاع Vite بيظهر لأخطاء الـ build بس، مش أخطاء الرسم.)`,
            when: "حوالي كل route، وأي جزء ممكن يقع لوحده: charts (recharts)، ومحررات، و iframes، وأي بيانات من API ممكن تيجي بشكل غير متوقع.",
            mistakes: R`تفتكر إنه بيمسك أخطاء onClick. و boundary واحد فوق بس، فأي خطأ بيشيل كل حاجة. ومفيش reset فالمستخدم عالق. وفي مشروع حقيقي كان فيه boundary متعمل بإيده فوق التطبيق كله، بيعرض رسالة الخطأ والـ component stack للمستخدمين في الإنتاج، وزراره الوحيد reload للصفحة: التفاصيل التقنية مكانها الـ logging، مش شاشة العميل.`
          },
          lines: [
            "الـ component والـ type بتاع props الـ fallback.",
            "الشاشة اللي تظهر مكان الجزء اللي وقع.",
            "الخطأ ممكن يبقى أي حاجة اترمت، فاتأكد إنه Error.",
            "رسالة، و resetErrorBoundary بيحاول يرسم الأولاد تاني.",
            "قفلة.",
            "صفحة فيها جزء ممكن يقع.",
            "المسار الحالي.",
            "بداية الـ JSX.",
            "الـ fallback، وابعت الخطأ للـ logging، وصفّر لما المسار يتغير.",
            "الجزء المحمي.",
            "قفلة الـ boundary.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`لما الـ component يرمي وقت الرسم هتلاقي الرسالة وزرار Try again مكانه بس، وباقي الصفحة شغالة. Try again بيرسم الـ children تاني، فبنسبة 50% يرجع يشتغل وبنسبة 50% يوقع تاني. في التطوير هتلاقي الـ error برضه في الـ console مع إنه اتمسك، ودا طبيعي.

الـ error اللي في onClick مش بيوصل للـ boundary: الـ fallback مش بيظهر، والـ error بيطلع في الـ console بس كـ uncaught. الـ boundaries بتمسك أخطاء الرسم والـ lifecycle بس، مش الـ event handlers ولا الكود الـ async. عشان توصله للـ boundary، امسكه بـ try/catch وابعته بـ [[showBoundary]].`,
          solCode: R`import { useErrorBoundary } from 'react-error-boundary'

function Flaky() {
  if (Math.random() > 0.5) throw new Error('Render failed')
  return <p>Loaded</p>
}
function SaveButton() {
  const { showBoundary } = useErrorBoundary()
  return <button onClick={() => { try { throw new Error('Click failed') } catch (e) { showBoundary(e) } }}>Save</button>
}`
        },
        {
          cmd: "lazy و Suspense",
          title: "قسّم الـ bundle وحمّل الصفحة وقت ما تتفتح",
          desc: R`[[lazy(() => import('./pages/Reports'))]] بيحط كود الصفحة في ملف JS لوحده مبيتحمّلش غير أول مرة الـ component يترسم. و [[<Suspense fallback={...}>]] بيعرض حاجة مكانه لحد ما الملف يوصل.

كده أول تحميل للموقع أصغر وأسرع. وأنسب مكان للتقسيم الـ routes، والحاجات التقيلة اللي مش ظاهرة على طول: محرر، أو charts، أو modal كبير.`,
          example: R`import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router'

const Reports = lazy(() => import('./pages/Reports'))
const routes = [{ path: 'reports', Component: Reports }]

function AppLayout() {
  return (
    <>
      <Header />
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </>
  )
}`,
          try: R`اعمل [[npm run build]] قبل وبعد ما تخلي صفحة تقيلة (فيها recharts مثلًا) lazy، وقارن أحجام الملفات في [[dist/assets]]. وافتح Network وروح للصفحة: هتشوف ملف JS جديد بيتطلب ساعتها.`,
          flag: "script",
          deep: {
            why: R`من غير تقسيم، المستخدم اللي فاتح صفحة الدخول بينزّل كود لوحة الأدمن والتقارير والمحرر، يعني ميجات JS لازم تتحمّل وتتقري قبل ما الصفحة تشتغل، وده بيبان على موبايل بشبكة ضعيفة.`,
            how: R`[[import()]] الـ dynamic بيقول للـ bundler (Vite) «اعمل الملف ده chunk لوحده». و [[lazy]] بيرجّع component أول ما يترسم بيطلب الـ chunk، وطول ما هو مش جاهز بيعمل «suspend»: React بتوقف رسم الجزء ده وتدوّر على أقرب [[<Suspense>]] فوقه وتعرض الـ fallback. لما الملف يوصل، React ترسم تاني. والمرة الجاية الملف متكاش، فمفيش انتظار.

مكان الـ Suspense بيفرق: جوه الـ layout حوالين الـ Outlet معناه الـ header والـ sidebar فاضلين والجزء اللي في النص بس اللي بيستنى. ولما التنقل بيحصل جوه transition (الـ router بيعمل كده)، React بتسيب الصفحة القديمة ظاهرة لحد ما الجديدة تجهز بدل ما تعرض الـ fallback.

[[lazy]] محتاج default export. لو الملف فيه named export: [[lazy(() => import('./X').then(m => ({ default: m.Reports })))]]. وفي data mode بتاع React Router فيه [[lazy]] على الـ route نفسه، بيحمّل الـ component والـ loader مع بعض.

Suspense مش للـ lazy بس: [[use(promise)]]، و [[useSuspenseQuery]] في TanStack Query، و i18next وهو بيحمّل الترجمات، كلهم بيعملوا suspend لأقرب boundary.

وبعد deploy جديد، الـ chunks القديمة ممكن تتمسح، والمستخدم اللي فاتح الموقع من ساعة يطلب ملف مش موجود. error boundary يعرض «فيه تحديث، اعمل reload»، أو سيب الملفات القديمة كام يوم على السيرفر.`,
            when: "كل route تقريبًا، ومكتبات تقيلة بتظهر في مكان واحد (محرر نصوص، وخرائط، و charts).",
            mistakes: R`[[lazy]] جوه جسم component: بيتعمل component جديد كل render فالـ state بتروح. و Suspense واحد فوق خالص، فأي تحميل بيخفي الصفحة كلها. وفي مشروع حقيقي كانت كل الصفحات lazy (كويس) بس الـ Suspense فوق الـ providers والـ router كلهم، وصفحات الدخول متحمّلة عادي «عشان hydration issues» في SPA مفيهاش hydration أصلًا. وتقسيم كل component صغير لوحده: طلبات كتير على الفاضي.`
          },
          lines: [
            "lazy و Suspense من React.",
            "Outlet مكان الصفحة.",
            "الصفحة في chunk لوحدها، مبيتحمّلش غير لما تترسم.",
            "بتتحط في الـ routes زي أي component.",
            "الـ layout.",
            "بداية الـ JSX.",
            "Fragment.",
            "الـ header برا الـ Suspense، فبيفضل ظاهر وقت التحميل.",
            "حدود الانتظار: skeleton مكان الصفحة لحد ما الـ chunk يوصل.",
            "الصفحة الحالية.",
            "قفلة الـ Suspense.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`قبل: ملف JS واحد كبير. لما جربنا صفحة فيها recharts بـ import عادي طلع [[index-*.js]] حوالي 520kB (158kB gzip) و Vite طلّع warning إن الـ chunk أكبر من 500kB. بعد [[lazy]]: [[index-*.js]] حوالي 222kB و [[Reports-*.js]] لوحده حوالي 300kB. الأرقام عندك هتختلف، بس الفكرة إن تحميل أول صفحة بقى أخف بحجم الصفحة التقيلة.

في Network لما تروح للصفحة هتلاقي [[Reports-*.js]] بيتطلب ساعتها بس، والـ skeleton بيظهر لحظة. لو ملقيتش ملف منفصل، غالبًا الصفحة لسه معمولها import عادي في ملف تاني (import واحد static كفاية يرجّعها للـ bundle الأساسي)، أو الملف مفيهوش [[export default]].`
        },
        {
          cmd: "createPortal",
          title: "ارسم modal أو tooltip برا مكانه في الـ DOM",
          desc: R`[[createPortal(jsx, document.body)]] بيرسم الـ JSX في عنصر DOM تاني، بس الـ component بيفضل في مكانه في شجرة React: بيقرا نفس الـ context، والـ events بتطلع لأبوه في React. ده الحل لـ tooltip أو dropdown أو toast بيتقص بسبب [[overflow: hidden]] أو [[z-index]] عند الأب.

وللـ modal نفسه، أسهل طريقة accessible هي [[<dialog>]] مع [[showModal()]]: بيحبس الـ focus جواه، و Escape بيقفله، والخلفية بتبقى inert لوحدها.`,
          example: R`import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (open && dialog && !dialog.open) dialog.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])
  return createPortal(
    <dialog ref={ref} onClose={onClose} aria-label={title}>
      {children}<button onClick={onClose}>Close</button>
    </dialog>,
    document.body
  )
}`,
          try: R`افتح الـ modal من جوه div عليه [[overflow: hidden]] و [[transform]]، وشوف في Elements إن الـ dialog في آخر body. دوس Tab كذا مرة: الـ focus مش بيخرج برا. ودوس Escape وتأكد إن الـ state بقت false.`,
          flag: "script",
          deep: {
            why: "الـ modal منطقيًا تبع الزرار اللي فتحه (بيقرا نفس البيانات والـ context)، بس بصريًا لازم يبقى فوق كل حاجة. لو اترسم جوه card عليها overflow hidden، هيتقص. والـ modal المعمول بـ div بيحتاج شغل كتير عشان يبقى شغال بالكيبورد.",
            how: R`[[createPortal(children, node)]] بيقول لـ React «الأولاد دول مكانهم في الشجرة هنا، بس حطهم في الـ DOM جوه node». فالـ context شغال عادي، وأي event جوه الـ portal بيطلع (bubble) لأبو الـ component في React حتى لو في الـ DOM مش جواه. يعني [[onClick]] على div بيلف الزرار اللي فتح الـ modal هيتنادى لما تدوس جوه الـ modal. ده بيفاجئ ناس كتير.

[[showModal()]] بيحط الـ dialog في الـ top layer بتاع المتصفح: فوق أي z-index ومش بيتقص بـ overflow، والباقي بيبقى inert (مفيش click ولا focus)، و Escape بيقفله (event اسمه cancel وبعده close)، ولما يتقفل المتصفح بيرجّع الـ focus للعنصر اللي كان عليه. و [[::backdrop]] في CSS للخلفية. بصراحة، مع showModal الـ portal مش ضروري للـ dialog نفسه، بس بيفضل مفيد لأي overlay تاني (tooltip و dropdown و toast) مالوش top layer.

الـ effect بيزامن prop [[open]] مع حالة الـ dialog الحقيقية (DOM برا React). و [[onClose]] بيخلي Escape يرجّع الـ state لـ false، فالاتنين ميختلفوش.

وفي SSR (Next.js) مفيش [[document]] على السيرفر، فالـ portal لازم يترسم بعد ما الصفحة تشتغل في المتصفح.`,
            when: "Modals و dialogs للتأكيد، و tooltips و dropdowns جوه containers بتقص، و toasts في ركن الشاشة.",
            mistakes: R`modal بـ div من غير focus trap: المستخدم بالكيبورد بيعمل Tab ويروح للصفحة ورا. و state بتقول مفتوح والـ dialog اتقفل بـ Escape (نسيت onClose). وحروب z-index: 9999 و 99999. ونسيان إن الـ events بتطلع للأب في React: stopPropagation لو ده بيعمل مشكلة.`
          },
          lines: [
            "hooks والـ type.",
            "createPortal من react-dom.",
            "modal بيتحكم فيه الأب بـ open و onClose.",
            "ref للـ dialog.",
            "زامن open مع حالة الـ dialog الحقيقية:",
            "العنصر.",
            "لازم يتفتح ومش مفتوح: showModal (top layer، و focus جواه، و Escape).",
            "لازم يتقفل وهو مفتوح: اقفله.",
            "يتعاد لما open يتغير.",
            "ارسمه في body بدل مكانه:",
            "onClose بيتنادى مع Escape كمان، فالأب يعرف. و aria-label عشان قارئ الشاشة يقول اسمه.",
            "المحتوى وزرار قفل.",
            "قفلة الـ dialog.",
            "المكان في الـ DOM.",
            "قفلة createPortal.",
            "قفلة."
          ],
          sol: R`في Elements هتلاقي [[<dialog>]] آخر حاجة في [[body]] مش جوه الـ div، فالـ [[overflow: hidden]] والـ [[transform]] مش بيقصّوه. وبما إن [[showModal()]] بيحطه في الـ top layer، باقي الصفحة بتبقى inert: Tab بيلف على الزراير اللي جوه الـ dialog (وممكن يروح لشريط المتصفح) بس عمره ما يوصل لعنصر في الصفحة ورا.

Escape بيقفل الـ dialog، والـ [[close]] event بينادي [[onClose]]، ففي React DevTools هتلاقي [[open]] عند الأب بقت [[false]]. لو قفل بـ Escape والـ state فضلت true، يبقى onClose مش متوصّل، والمرة الجاية [[open]] مش هتتغير فالـ effect مش هيشتغل والـ modal مش هيفتح. ولو Tab خرج للصفحة، يبقى استخدمت [[show()]] بدل [[showModal()]].`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "اختبر الكومبوننت زي ما المستخدم بيستخدمه: Vitest و Testing Library و user-event، و API وهمي بـ MSW",
      items: [
        {
          cmd: "Vitest + Testing Library",
          title: "أول اختبار لكومبوننت: ارسمه، ودوّر عليه، واتأكد",
          desc: R`اختبار الكومبوننت بيعمل تلات حاجات: يرسمه في DOM وهمي ([[jsdom]] أو [[happy-dom]] جوه Node)، ويدوّر على العناصر زي ما المستخدم بيشوفها ([[screen.getByRole('button', { name: 'Increment' })]])، ويتأكد من النتيجة ([[toBeInTheDocument]] و [[toHaveTextContent]]).

الأدوات: Vitest بيشغّل الاختبارات ويفهم إعدادات Vite نفسها، و [[@testing-library/react]] بيرسم ويدّيك [[screen]]، و [[@testing-library/jest-dom]] بيضيف matchers للـ DOM. أوامر [[vitest]] نفسها (watch و run و coverage) في تاب «فحص الكود».`,
          example: R`// npm i -D vitest jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], test: { environment: 'jsdom', setupFiles: ['./src/test/setup.ts'] } })
// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
afterEach(() => cleanup())
// src/components/Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Counter } from './Counter'
it('starts at the given number and increments on click', () => {
  render(<Counter start={5} />)
  expect(screen.getByText('Count: 5')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
  expect(screen.getByText('Count: 6')).toBeInTheDocument()
})`,
          try: R`في مشروع الـ lab اعمل [[Counter]] بياخد [[start]] ويعرض [[Count: {count}]] وزرار Increment. ركّب الأدوات، واعمل الملفات التلاتة، وضيف [[scripts.test: "vitest"]]، وشغّل [[npm test]]. بعدين غيّر النص في الكومبوننت لـ [[Total: ]] واقرا رسالة الفشل: Testing Library بيطبع الـ DOM كله عشان تشوف إيه اللي اترسم فعلًا.`,
          flag: "script",
          deep: {
            why: R`الـ components بتتغير كل يوم: refactor، أو مكتبة جديدة، أو حد بيصلّح bug في مكان ويكسر مكان. اختبار بيرسم الكومبوننت ويضغط عليه بيقولك في ثواني إن «الزرار لسه بيزوّد» من غير ما تفتح المتصفح. وفي الـ take-home assignments، الاختبارات من أول الحاجات اللي المراجع بيدوّر عليها.`,
            how: R`Vitest بيشغّل كل ملف [[*.test.tsx]] في Node. [[environment: 'jsdom']] بيعمل [[window]] و [[document]] وهميين (مفيش رسم حقيقي ولا layout: أحجام العناصر كلها صفر). و [[happy-dom]] بديل أسرع بس أقل اكتمالًا، والاتنين بيتركّبوا لوحدهم كـ package. وبيقرا [[vite.config]] أو [[vitest.config.ts]]، فالـ aliases والـ plugin بتاع React شغالين من غير إعداد تاني.

[[render(<Counter />)]] بيعمل root جديد في [[document.body]] ويرسم فيه، و [[screen]] بيدوّر في [[document.body]] كله. و [[fireEvent.click]] بيبعت event واحد بس (الدرس الجاي بعد الجاي فيه user-event الأدق). و React Testing Library بيلف الـ render والـ events في [[act()]] لوحده، فالتحديثات بتتطبق قبل السطر اللي بعده.

ملف الـ setup بيتنفذ قبل كل ملف اختبار: [[@testing-library/jest-dom/vitest]] بيضيف [[toBeInTheDocument]] و [[toHaveValue]] و [[toBeDisabled]] و [[toHaveAttribute]] لـ expect. و [[cleanup()]] بيشيل اللي اترسم بعد كل اختبار: Testing Library بيعمل ده لوحده لو [[globals: true]]، ومن غيرها لازم تكتبه، وإلا عناصر الاختبار الأول هتفضل موجودة في التاني وتلاقي «Found multiple elements».

ولو هتستخدم [[describe]] و [[it]] من غير import، ضيف [[globals: true]] في الـ config و [["types": ["vitest/globals", "@testing-library/jest-dom"]]] في tsconfig.`,
            when: R`أي component فيه منطق: شروط عرض، أو فورم، أو حالات loading و error، أو حسابات. الكومبوننت اللي بيعرض props وخلاص ممكن ميستاهلش. وابدأ بالأجزاء اللي لو باظت هتكلّف فلوس (الـ checkout، والتسجيل، والصلاحيات).`,
            mistakes: R`تختبر تفاصيل التنفيذ: قيمة state جوه الكومبوننت أو اسم دالة داخلية، فأي refactor يكسر الاختبار والسلوك لسه صح. وتنسى [[environment: 'jsdom']] فتاخد [[document is not defined]]. وتنسى ملف الـ setup فـ [[toBeInTheDocument]] مش موجودة. و [[container.querySelector('.btn-primary')]] بدل [[getByRole]]: الكلاس بيتغير مع كل تعديل ديزاين. وتفتكر إن jsdom بيرسم: أي حاجة معتمدة على الأحجام (virtual lists، و charts، و IntersectionObserver) مش هتشتغل فيه، ودي مكانها اختبار في متصفح حقيقي.`
          },
          lines: [
            "defineConfig من vitest/config عشان خانة test تتعرف.",
            "نفس plugin الـ React اللي في Vite.",
            "DOM وهمي، وملف يتنفذ قبل كل ملف اختبار.",
            "matchers زي toBeInTheDocument.",
            "cleanup بيشيل اللي اترسم.",
            "hooks بتاعة vitest.",
            "بعد كل اختبار ابدأ من DOM فاضي.",
            "render يرسم، و screen يدوّر، و fireEvent يبعت event.",
            "it و expect.",
            "الكومبوننت اللي بنختبره.",
            "اسم الاختبار جملة بتوصف السلوك.",
            "ارسمه ببداية 5.",
            "اتأكد إن النص ظاهر.",
            "لاقي الزرار بدوره واسمه، واضغطه.",
            "النص اتغير.",
            "قفلة."
          ],
          sol: R`[[npm test]] المفروض يطبع ملف واحد واختبار واحد passed، ويفضل شغال (watch). لما تغيّر النص لـ [[Total:]]، الاختبار بيفشل بـ «Unable to find an element with the text: Count: 5» وتحته الـ DOM اللي اترسم فعلًا ([[<p>Total: 5</p>]])، فتعرف على طول هل المشكلة في الكومبوننت ولا في الاختبار.

لو شفت «document is not defined» فالـ environment ناقصة. ولو «Invalid Chai property: toBeInTheDocument» فالـ setup file مش متسجّل أو مش بيعمل import لـ [[jest-dom/vitest]].`,
          solCode: R`// src/components/Counter.tsx
import { useState } from 'react'

export function Counter({ start = 0 }: { start?: number }) {
  const [count, setCount] = useState(start)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}
// package.json
// "scripts": { "test": "vitest", "test:run": "vitest run" }`
        },
        {
          cmd: "getByRole و findBy",
          title: "دوّر على العناصر زي المستخدم، واستنى البيانات اللي جاية من السيرفر",
          desc: R`Testing Library بيدّيك تلات عائلات: [[getBy*]] بيرجّع العنصر أو يرمي error فورًا، و [[queryBy*]] بيرجّع [[null]] لو مش موجود (عشان تتأكد إن حاجة مش ظاهرة)، و [[findBy*]] بيرجّع promise بتستنى لحد ما العنصر يظهر (افتراضيًا لحد ثانية). وكل واحدة ليها [[All]] للأكتر من عنصر.

والترتيب اللي تدوّر بيه: [[ByRole]] بالاسم ([[{ name: 'Save' }]]) أولًا، وبعدين [[ByLabelText]] للخانات، وبعدين [[ByText]]، و [[ByTestId]] آخر حل. و [[waitFor(() => expect(...))]] لما تستنى حاجة مش عنصر (دالة اتنادت مثلًا).`,
          example: R`import { screen, waitFor } from '@testing-library/react'
import { it, expect, vi } from 'vitest'

it('shows products from the API', async () => {
  renderWithProviders(<Products />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  expect(await screen.findByRole('link', { name: 'Mug' })).toHaveAttribute('href', '/products/1')
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
it('reports the view once', async () => {
  const track = vi.fn()
  renderWithProviders(<Products onLoaded={track} />)
  await waitFor(() => expect(track).toHaveBeenCalledWith(2))
})`,
          try: R`خد [[Products]] من درس useQuery (بيعرض Loading وبعدين [[<li><Link>]] لكل منتج). اكتب الاختبار الأول، وبعدين غيّر [[findByRole]] لـ [[getByRole]] واقرا الخطأ. وبعدين افتح [[screen.logTestingPlaygroundURL()]] أو [[screen.debug()]] جوه الاختبار وشوف الـ roles المتاحة. (الـ wrapper والـ API الوهمي في الدرسين الجايين، فممكن تأجّل التشغيل لحد ما تخلصهم.)`,
          flag: "script",
          deep: {
            why: R`المستخدم مبيعرفش class ولا id: بيشوف زرار اسمه «Save» وخانة جنبها «Email». لما الاختبار بيدوّر بنفس الطريقة، بيفضل شغال مع أي تغيير في الشكل، وبيفشل لو الزرار فعلًا اختفى أو اتغير اسمه. وكمان [[getByRole]] بيختبر الـ accessibility ببلاش: لو مش لاقي الزرار بالاسم، قارئ الشاشة كمان مش هيلاقيه.`,
            how: R`[[getByRole('button', { name: 'Save' })]] بيحسب الـ accessibility tree زي المتصفح: الـ role من العنصر نفسه ([[<button>]] يبقى button، و [[<a href>]] يبقى link، و [[<li>]] يبقى listitem، و [[<input type="checkbox">]] يبقى checkbox، و [[<h1>]] يبقى heading)، والاسم من النص أو الـ label أو [[aria-label]]. والـ name ممكن يبقى regex: [[{ name: /save/i }]].

[[findBy]] = [[waitFor]] + [[getBy]]: بيجرّب كل ٥٠ms لحد ما يلاقي أو يعدّي الـ timeout (ثانية افتراضيًا، وتقدر تغيّرها في التالت argument). ده اللي بتحتاجه مع أي حاجة async: fetch، أو lazy component، أو setTimeout. أما [[getBy]] بعد الـ fetch على طول فبيفشل لأن البيانات لسه موصلتش.

[[queryBy]] مع [[not.toBeInTheDocument()]] للتأكد إن حاجة مش موجودة، لأن getBy هيرمي قبل ما يوصل للـ expect. ولو عايز تستنى حاجة تختفي: [[waitForElementToBeRemoved(() => screen.queryByText('Loading...'))]].

[[waitFor]] بيعيد الدالة لحد ما متترميش، فجواه expect واحد بس ومفيش side effects (متدوسش زرار جوه waitFor، هيدوس كذا مرة).

و [[within(row).getByRole('cell')]] بيدوّر جوه عنصر معين، مفيد في الجداول والـ lists.`,
            when: R`في كل اختبار. ابدأ دايمًا بـ ByRole، ولو مش لاقي role مناسب اسأل نفسك الأول: هل العنصر ده accessible أصلًا؟ و ByTestId لحاجات مالهاش أي معنى للمستخدم (container لـ chart مثلًا).`,
            mistakes: R`[[getBy]] بعد عملية async فيفشل «Unable to find». و [[await waitFor(() => screen.getByText(...))]] بدل [[findByText]]: شغال بس أطول. و [[findBy]] من غير await: الاختبار بيعدّي وهو مجرّبش حاجة. و [[expect(screen.getByText('x')).toBeNull()]]: getBy رمى خلاص، الصح queryBy. و [[data-testid]] على كل حاجة. و [[act()]] بإيدك حوالين render أو fireEvent: Testing Library بيعملها لوحده، ولو شفت warning بتاع act فغالبًا فيه تحديث async انت مش مستنيه بـ findBy.`
          },
          lines: [
            "screen للبحث، و waitFor للانتظار.",
            "it و expect و vi للـ mock functions.",
            "اختبار بيجيب بيانات.",
            "ارسم بالـ providers (الدرس الجاي).",
            "أول لحظة: مفيش بيانات، فـ getBy على Loading شغال.",
            "استنى لحد ما لينك اسمه Mug يظهر، واتأكد من الـ href.",
            "بعد ما ظهر، الباقي موجود: getAllBy بيرجّع array.",
            "queryBy عشان نتأكد إن Loading اختفت من غير ما يرمي.",
            "قفلة.",
            "اختبار بيستنى دالة تتنادى.",
            "دالة وهمية بتسجّل كل نداء.",
            "ارسم وابعتها.",
            "waitFor بيعيد الـ expect لحد ما يعدّي أو الوقت يخلص.",
            "قفلة."
          ],
          sol: R`مع [[findByRole]] الاختبار بيعدّي. مع [[getByRole]] بيفشل فورًا بـ «Unable to find an accessible element with the role "link" and name "Mug"» وتحته قايمة الـ roles الموجودة: هتلاقي بس [[paragraph]] أو النص «Loading...»، لأن الـ fetch لسه مخلصش.

[[screen.debug()]] بيطبع الـ DOM الحالي، و [[logTestingPlaygroundURL()]] بيطبع لينك لموقع بيقترح أحسن query لكل عنصر. لو الـ link مش ظاهر كـ role «link»، اتأكد إنه [[<a href>]] مش [[<a>]] من غير href (ده مالوش role link).`,
          solCode: R`it('shows products from the API', async () => {
  renderWithProviders(<Products />)
  screen.debug()
  expect(await screen.findByRole('link', { name: 'Mug' })).toHaveAttribute('href', '/products/1')
  screen.logTestingPlaygroundURL()
})`
        },
        {
          cmd: "user-event",
          title: "اكتب واضغط وابعت فورم في الاختبار زي مستخدم حقيقي",
          desc: R`[[@testing-library/user-event]] بيحاكي التفاعل كامل: [[user.type(input, 'hello')]] بيعمل focus وبعدين keydown و keypress و input و keyup لكل حرف، و [[user.click]] بيعمل pointerdown و mousedown و focus و mouseup و click، زي المتصفح بالظبط. [[fireEvent]] بيبعت event واحد بس، فحاجات كتير (زي validation على blur، أو submit بالـ Enter) مش بتحصل معاه.

الشكل: [[const user = userEvent.setup()]] في أول الاختبار، وكل نداء عليه [[await]].`,
          example: R`import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, expect, vi } from 'vitest'
import { SignupForm } from './SignupForm'

it('shows validation errors and does not submit', async () => {
  const user = userEvent.setup()
  const onDone = vi.fn()
  render(<SignupForm onDone={onDone} />)
  await user.type(screen.getByLabelText('Email'), 'not-an-email')
  await user.type(screen.getByLabelText('Password'), '123')
  await user.click(screen.getByRole('button', { name: 'Sign up' }))
  expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
  expect(screen.getByText('At least 8 characters')).toBeInTheDocument()
  expect(onDone).not.toHaveBeenCalled()
})
it('shows the server error under the email field', async () => {
  const user = userEvent.setup()
  render(<SignupForm onDone={vi.fn()} />)
  await user.type(screen.getByLabelText('Email'), 'taken@example.com')
  await user.type(screen.getByLabelText('Password'), 'secret123{Enter}')
  expect(await screen.findByRole('alert')).toHaveTextContent('Email already registered')
  expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
})`,
          try: R`اعمل [[SignupForm]] بـ react-hook-form و zod (الإيميل والباسورد، و [[<label htmlFor>]] لكل خانة، وبيبعت لـ [[/api/signup]] ويعمل setError من [[fieldErrors]] زي درس «zod مشتركة مع الـ API»). اكتب الاختبارين دول، وضيف تالت بيسجّل إيميل جديد ويتأكد إن [[onDone]] اتنادت. (الـ API الوهمي اللي بيرجّع 409 في درس MSW.)`,
          flag: "script",
          deep: {
            why: R`الفورمات أكتر مكان بيتكسر في أي تطبيق وأكتر مكان بيتعمله take-home. والاختبار اللي بيكتب في الخانات ويدوس Submit بيغطي كل حاجة مع بعض: الـ labels مربوطة صح، والـ validation بيشتغل، والرسايل بتظهر، والطلب بيتبعت، وأخطاء السيرفر بتتعرض. لو refactor بوّظ أي حتة منهم، الاختبار هيقولك.`,
            how: R`[[userEvent.setup()]] بيعمل «جلسة» مستخدم واحدة: الكيبورد والماوس والـ clipboard متشاركين بين النداءات، فلو ضغطت Shift في نداء بيفضل مضغوط في اللي بعده. وكل الدوال async لأنها بتستنى بين الأحداث (زي المتصفح)، فمن غير [[await]] الحروف بتتكتب بعد ما الاختبار خلص.

[[user.type(el, 'text')]] بيدوس على العنصر الأول (focus) وبعدين يكتب. والأقواس المعووجة أوامر خاصة: [[{Enter}]] و [[{Tab}]] و [[{Backspace}]] و [[{Shift>}A{/Shift}]]، فلو محتاج تكتب [[{]] نفسها اكتبها [[{{]]. و [[user.clear(el)]] يفضّي الخانة، و [[user.selectOptions(select, 'value')]] للـ select، و [[user.upload(input, file)]] للملفات، و [[user.keyboard('{Escape}')]] من غير عنصر، و [[user.tab()]] للتنقل بالكيبورد (بيختبر ترتيب الـ focus).

[[getByLabelText('Email')]] بيلاقي الخانة عن طريق [[<label htmlFor="email">]] أو [[aria-label]] أو [[aria-labelledby]]. لو مش لاقيها، يبقى الـ label مش مربوط، وده bug accessibility حقيقي مش مشكلة في الاختبار.

و [[vi.fn()]] دالة وهمية بتسجّل كل نداء، فتقدر تسأل [[toHaveBeenCalledWith({...})]] أو [[not.toHaveBeenCalled()]]. ولأن handleSubmit بتاع RHF async، استخدم [[await vi.waitFor(() => expect(onDone).toHaveBeenCalledOnce())]] أو استنى عنصر يظهر.`,
            when: R`أي تفاعل: فورمات، و dropdowns، و modals (Escape وقفل)، و tabs بالكيبورد. واستخدم fireEvent بس لـ events مالهاش مقابل عند user-event (scroll مثلًا).`,
            mistakes: R`تنسى [[await]] قبل [[user.type]]: الاختبار يعدّي أو يفشل عشوائي. و [[userEvent.type]] مباشرة من غير setup: شغال بس النسخة القديمة من الـ API. و [[fireEvent.change(input, { target: { value: 'x' } })]] لفورم RHF فيه [[mode: 'onBlur']]: مفيش blur فمفيش validation. وخانة من غير label فتلجأ لـ [[getByPlaceholderText]]: صلّح الـ label. و fake timers مع user-event من غير [[userEvent.setup({ advanceTimers: vi.advanceTimersByTime })]]: الاختبار بيعلق.`
          },
          lines: [
            "الرسم والبحث.",
            "user-event.",
            "أدوات الاختبار.",
            "الفورم اللي بنختبره.",
            "اختبار الـ validation.",
            "جلسة مستخدم.",
            "دالة وهمية مكان اللي بيحصل بعد النجاح.",
            "ارسم.",
            "اكتب في الخانة اللي الـ label بتاعها Email، حرف حرف.",
            "باسورد قصير.",
            "دوس الزرار.",
            "الرسالة بتظهر بعد validation async، فـ findBy.",
            "والتانية ظهرت معاها.",
            "والطلب متبعتش.",
            "قفلة.",
            "اختبار خطأ السيرفر.",
            "جلسة جديدة.",
            "ارسم.",
            "إيميل الـ API الوهمي بيرفضه.",
            "باسورد سليم، و {Enter} بيبعت الفورم من الكيبورد.",
            "رسالة السيرفر ظهرت كـ alert.",
            "والخانة متعلّمة غلط لقارئ الشاشة.",
            "قفلة."
          ],
          sol: R`التلات اختبارات بيعدّوا. التالت بيكتب إيميل جديد وباسورد سليم ويدوس Sign up، والـ API الوهمي بيرجّع 201، فـ [[onDone]] بتتنادى مرة واحدة. ولأن الإرسال async، [[expect(onDone).toHaveBeenCalled()]] على طول بعد الـ click هيفشل، ولازم تستنى.

لو [[getByLabelText('Email')]] فشل بـ «Found a label with the text of: Email, however no form control was found associated to that label»، الـ [[htmlFor]] مش مطابق للـ [[id]]. ولو الاختبار التاني فشل بـ «Unable to find role alert»، اتأكد إن الـ API الوهمي شغال وإن رسالة الخطأ عليها [[role="alert"]].`,
          solCode: R`it('calls onDone after a successful signup', async () => {
  const user = userEvent.setup()
  const onDone = vi.fn()
  render(<SignupForm onDone={onDone} />)
  await user.type(screen.getByLabelText('Email'), 'new@example.com')
  await user.type(screen.getByLabelText('Password'), 'secret123')
  await user.click(screen.getByRole('button', { name: 'Sign up' }))
  await vi.waitFor(() => expect(onDone).toHaveBeenCalledOnce())
})

// الخانة في الفورم:
// <label htmlFor="email">Email</label>
// <input id="email" type="email" aria-invalid={!!errors.email} {...register('email')} />
// {errors.email && <p role="alert">{errors.email.message}</p>}`
        },
        {
          cmd: "wrapper بالـ providers",
          title: "اختبر component بيستخدم React Query و Router",
          desc: R`أغلب الـ components الحقيقية مش بتشتغل لوحدها: بتستخدم [[useQuery]] (محتاجة QueryClientProvider)، و [[Link]] أو [[useParams]] (محتاجة router)، و [[useTranslation]]، و Redux. لو رسمتها عادي هتاخد «No QueryClient set». الحل دالة [[renderWithProviders]] مرة واحدة في [[src/test/utils.tsx]] بتلف أي component بكل الـ providers، وبتعمل QueryClient جديد لكل اختبار.`,
          example: R`// src/test/utils.tsx
import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'

export function renderWithProviders(ui: ReactElement, { route = '/' } = {}) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </QueryClientProvider>
  )
  return { queryClient, ...render(ui, { wrapper: Wrapper }) }
}`,
          try: R`اعمل الملف ده، واختبر [[Products]] من درس useQuery (اللي بيعرض [[<Link to={$__bt/products/$__{p.id}$__bt}>]]). بعدين اختبر صفحة بتقرا [[useParams]]: ارسمها جوه [[<Routes><Route path="/products/:id" element={<ProductPage />} /></Routes>]] بـ [[route: '/products/7']] واتأكد إنها بتعرض 7. وأخيرًا شيل [[retry: false]] واعمل الـ API يرجّع 500: شوف الاختبار بياخد قد إيه.`,
          flag: "script",
          deep: {
            why: R`من غير wrapper مشترك، كل ملف اختبار بيكرر ١٠ سطور providers، وأول ما تضيف provider جديد للتطبيق (ثيم أو i18n) لازم تعدّل كل الاختبارات. ومن غير QueryClient جديد لكل اختبار، الكاش بيعدّي من اختبار للتاني: الاختبار التاني يلاقي البيانات جاهزة من الأول، فيعدّي لوحده ويفشل لما تشغّله مع غيره أو بترتيب تاني.`,
            how: R`[[render(ui, { wrapper })]] بيلف الـ ui بالـ Wrapper، وكمان [[rerender]] بتلف بنفسه. وبترجّع الـ queryClient مع نتيجة render عشان الاختبار يقدر يبص في الكاش ([[queryClient.getQueryData(...)]]) أو يحط بيانات جاهزة قبل الرسم ([[setQueryData]]).

[[retry: false]] ضروري: الافتراضي ٣ محاولات بتأخير بيزيد (حوالي ٧ ثواني)، فاختبار حالة الخطأ هيعدّي الـ timeout بتاع findBy (ثانية) ويفشل. وممكن كمان [[gcTime: Infinity]] عشان Vitest ميفضلش مستني timers بعد الاختبار.

[[MemoryRouter]] router بيحفظ الـ history في الذاكرة بدل الـ URL الحقيقي، و [[initialEntries]] بيحدد إنت فين. ولو الـ component بيقرا [[useParams]]، لازم يبقى جوه [[<Route path="/products/:id">]]، لأن الـ params بتيجي من مطابقة الـ route مش من الـ URL لوحده. ولو بتستخدم data mode (loaders)، [[createMemoryRouter(routes, { initialEntries })]] مع [[<RouterProvider>]] بيختبر الـ loaders كمان.

والـ providers التانية بنفس الطريقة: [[<Provider store={makeStore()}>]] لـ Redux (store جديد لكل اختبار، عشان كده [[makeStore]] دالة مش store واحد)، و [[<I18nextProvider>]] بـ instance للاختبار، والثيم.`,
            when: R`أول ما تختبر أي component بيستخدم hook من مكتبة محتاجة provider. واعمله من أول اختبار، مش لما يبقى عندك ٣٠ ملف.`,
            mistakes: R`QueryClient واحد متعرّف برا الدالة ومشترك بين كل الاختبارات. و retry شغال فاختبارات الـ error بتاخد ثواني أو تفشل. و [[BrowserRouter]] في الاختبار: بيقرا [[window.location]] الحقيقي بتاع jsdom وبيسيب أثر بين الاختبارات. و component بيقرا useParams مرسوم من غير Route فالـ id بيبقى undefined. و mock لـ [[useQuery]] نفسه بـ [[vi.mock]]: بيختبر إنك ناديت الـ hook بس، مش إن الـ component بيعرض البيانات صح. الأحسن provider حقيقي و API وهمي (الدرس الجاي).`
          },
          lines: [
            "الأنواع.",
            "render الأصلي.",
            "React Query.",
            "router في الذاكرة للاختبارات.",
            "الدالة: الـ ui، والمسار اللي نبدأ منه.",
            "client جديد لكل اختبار، ومن غير retry عشان الأخطاء تظهر فورًا.",
            "الـ wrapper اللي بيلف أي component:",
            "React Query بره.",
            "والـ router جوه، واقف على المسار المطلوب.",
            "قفلة الـ provider.",
            "قفلة الـ Wrapper.",
            "ارسم بالـ wrapper، ورجّع الـ client كمان.",
            "قفلة."
          ],
          sol: R`اختبار Products بيعدّي، و [[findByRole('link', { name: 'Mug' })]] ليه [[href="/products/1"]]. اختبار الصفحة بـ [[route: '/products/7']] جوه Route بيعرض 7، ومن غير الـ Route هيعرض فاضي أو undefined.

من غير [[retry: false]] واختبار الـ 500: [[findByRole('alert')]] بيفشل بعد ثانية لأن Query لسه بيحاول، وحتى لو زوّدت الـ timeout الاختبار هياخد حوالي ٧ ثواني. رجّعها false تاني.`,
          solCode: R`import { Routes, Route, useParams } from 'react-router'

function ProductPage() {
  const { id } = useParams()
  return <h1>Product {id}</h1>
}
it('reads the id from the route', () => {
  renderWithProviders(
    <Routes><Route path="/products/:id" element={<ProductPage />} /></Routes>,
    { route: '/products/7' },
  )
  expect(screen.getByRole('heading')).toHaveTextContent('Product 7')
})`
        },
        {
          cmd: "MSW",
          title: "API وهمي على مستوى الشبكة للاختبارات وللتطوير",
          desc: R`Mock Service Worker بيمسك الطلبات بعد ما تطلع من الكود بتاعك وقبل ما توصل للشبكة، ويرد بالرد اللي انت كاتبه. الكود بتاعك (fetch أو axios أو React Query) مبيعرفش حاجة، فانت بتختبر نفس الكود اللي هيشتغل في الإنتاج.

بتكتب الـ handlers مرة واحدة ([[http.get('/api/products', () => HttpResponse.json([...]))]])، وتستخدمها في الاختبارات بـ [[setupServer]] من [[msw/node]]، وفي المتصفح وقت التطوير بـ [[setupWorker]] من [[msw/browser]] لو الـ backend لسه مجهزش.`,
          example: R`// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw'
export const handlers = [
  http.get('/api/products', async () => {
    await delay(50)
    return HttpResponse.json([{ id: 1, name: 'Mug' }, { id: 2, name: 'T-shirt' }])
  }),
  http.post('/api/signup', async ({ request }) => {
    const body = (await request.json()) as { email: string }
    if (body.email === 'taken@example.com') return HttpResponse.json({ fieldErrors: { email: ['Email already registered'] } }, { status: 409 })
    return HttpResponse.json({ id: 'u1' }, { status: 201 })
  }),
]
// src/mocks/node.ts
import { setupServer } from 'msw/node'
export const server = setupServer(...handlers)
// src/test/setup.ts
beforeAll(() => server.listen({ onUnhandledFrame: 'error' }))
afterEach(() => { cleanup(); server.resetHandlers() })
afterAll(() => server.close())
// في اختبار: غيّر الرد للاختبار ده بس
it('shows the error when the API fails', async () => {
  server.use(http.get('/api/products', () => new HttpResponse(null, { status: 500 })))
  renderWithProviders(<Products />)
  expect(await screen.findByRole('alert')).toHaveTextContent('HTTP 500')
})`,
          try: R`[[npm i -D msw]]، واعمل الملفات، وشغّل اختبارات الدروس اللي فاتت (Products و SignupForm) من غير أي API حقيقي. بعدين اطلب [[/api/orders]] من component مفيش ليه handler واقرا الخطأ. وأخيرًا شغّل MSW في المتصفح: [[npx msw init public]] وابدأ الـ worker في [[main.tsx]] لو [[import.meta.env.DEV]]، وافتح Network.`,
          flag: "script",
          deep: {
            why: R`الاختبار اللي بيكلم API حقيقي بطيء، وبيفشل لما السيرفر واقع أو الداتا اتغيرت، ومش بيعرف يختبر حالة الـ 500 أو الـ timeout. و [[vi.mock('./api')]] بيشيل كود الـ API من الاختبار خالص، فلو الـ URL غلط أو الـ headers ناقصة أو [[res.ok]] مش متفحوص، الاختبار هيعدّي. MSW في النص: كل الكود بتاعك بيشتغل، والشبكة بس هي اللي وهمية.`,
            how: R`في Node، [[setupServer]] بيعمل patch للـ fetch والـ http modules ([[@mswjs/interceptors]])، فأي طلب بيعدّي على الـ handlers بالترتيب، وأول واحد يطابق الـ method والـ path بيرد. و [[:id]] في المسار بيتقري من [[params]]، والـ query string من [[new URL(request.url).searchParams]]، والـ body من [[await request.json()]].

الدورة في الـ setup: [[listen()]] مرة قبل كل الاختبارات، و [[resetHandlers()]] بعد كل اختبار بيشيل أي [[server.use()]] اتضاف في الاختبار ده، فالتغيير ميعديش للاختبار اللي بعده، و [[close()]] في الآخر. و [[onUnhandledFrame: 'error']] بيخلي أي طلب مالوش handler يفشّل الاختبار بدل ما يروح للشبكة بصمت.

[[server.use(...)]] بيضيف handlers في الأول فبتكسب على الأساسية: كده الملف الأساسي فيه الـ happy path، وكل اختبار بيغيّر اللي محتاجه (500، أو list فاضية، أو [[await delay('infinite')]] عشان يختبر الـ loading).

في المتصفح، [[npx msw init public]] بيحط [[mockServiceWorker.js]] في public، و [[setupWorker(...handlers).start()]] بيسجّل Service Worker بيمسك الطلبات، وهتشوفها في Network بعلامة إنها من الـ worker. استنى [[start()]] قبل [[createRoot().render]] عشان أول الطلبات متعدّيش.

الـ URLs النسبية ([[/api/products]]) شغالة في الاختبار لأن jsdom عنده [[location]] ([[http://localhost:3000]]). بس مكتبات بتعمل [[new Request('/api/...')]] بنفسها (زي [[fetchBaseQuery]] بتاع RTK Query) بتقع في Node بـ «Failed to parse URL»، والحل baseUrl كامل في الاختبار. والكود هنا متجرّب على msw 3 (نزلت آخر سبتمبر ٢٠٢٦)، والأساسيات دي نفسها في msw 2، ما عدا إن الخيار اسمه هناك [[onUnhandledRequest]]. في msw 3 الاسم ده بيتجاهل بصمت (فالطلب اللي مالوش handler بيطلع warning بس)، فلازم [[onUnhandledFrame]].`,
            when: R`أي اختبار لـ component بيجيب بيانات. وفي التطوير: الفرونت بيسبق الـ backend، أو عايز تشوف شكل الصفحة مع list فاضية أو خطأ، أو Storybook. ونفس الـ handlers تنفع في Playwright كمان.`,
            mistakes: R`تنسى [[resetHandlers]] فـ [[server.use]] بتاع اختبار الـ 500 يوقّع كل اللي بعده. ومفيش [[onUnhandledFrame: 'error']] فطلب لـ URL غلط بيعدّي بصمت ويفشل بعدين برسالة مش مفهومة. و handler بـ URL كامل ([[https://api.example.com/products]]) والكود بيطلب [[/api/products]]، فمفيش مطابقة. و [[vi.mock]] للـ fetch وفي نفس الوقت MSW. وتشغيل الـ worker في build الإنتاج لأن الشرط على [[DEV]] ناقص. وسؤال انترفيو: «بتعمل mock للـ API إزاي؟» الإجابة الكويسة: على مستوى الشبكة، عشان الاختبار يغطي طبقة الـ API client كمان.`
          },
          lines: [
            "http لتعريف الـ handlers، و HttpResponse للرد، و delay للتأخير.",
            "كل الـ handlers في array واحدة تتشارك بين الاختبارات والمتصفح.",
            "GET /api/products:",
            "استنى شوية زي شبكة حقيقية، عشان حالة الـ loading تتختبر.",
            "رد JSON.",
            "قفلة.",
            "POST /api/signup:",
            "اقرا الـ body اللي الكود بعته.",
            "إيميل معين بيرجّع 409 بنفس شكل أخطاء الـ API الحقيقي.",
            "غير كده 201.",
            "قفلة.",
            "قفلة الـ array.",
            "نسخة Node للاختبارات.",
            "server بالـ handlers.",
            "قبل كل الاختبارات: ابدأ، وأي طلب مالوش handler يبقى error.",
            "بعد كل اختبار: امسح الـ DOM، ورجّع الـ handlers الأساسية.",
            "في الآخر: اقفل.",
            "اختبار حالة الخطأ.",
            "handler للاختبار ده بس، بيكسب على الأساسي لحد resetHandlers.",
            "ارسم.",
            "رسالة الخطأ ظهرت.",
            "قفلة."
          ],
          sol: R`اختبارات Products و SignupForm بتعدّي من غير أي سيرفر شغال. الطلب لـ [[/api/orders]] بيفشّل الاختبار برسالة زي «[MSW] Error: intercepted a request without a matching request handler: GET /api/orders»، وده بالظبط اللي انت عايزه.

في المتصفح بعد [[worker.start()]]، الـ console بيكتب «[MSW] Mocking enabled.»، وفي Network الطلبات لـ [[/api/products]] بترد من الـ Service Worker. لو الـ worker مش بيمسك، اتأكد إن [[mockServiceWorker.js]] موجود في public وإن الموقع مش متقدّم من مسار فرعي (ساعتها محتاج [[serviceWorker.url]]).`,
          solCode: R`// src/mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
export const worker = setupWorker(...handlers)

// src/main.tsx
async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_MOCK !== '1') return
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledFrame: 'bypass' })
}
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(<App />)
})`
        },
        {
          cmd: "renderHook",
          title: "اختبر custom hook لوحده",
          desc: R`[[renderHook(() => useCounter(5))]] بيرسم component صغير وهمي بينادي الـ hook، ويدّيك [[result.current]] فيه آخر قيمة رجعت. أي حاجة بتغيّر state بتتلف في [[act()]] عشان React تطبّق التحديث قبل ما تقرا النتيجة، و [[rerender(newProps)]] بيغيّر الـ arguments.

ومع timers ([[useDebounce]]) بتستخدم fake timers: [[vi.useFakeTimers()]] و [[vi.advanceTimersByTime(500)]]، فالاختبار بياخد مللي ثانية بدل ما يستنى فعلًا.`,
          example: R`import { renderHook, act } from '@testing-library/react'
import { it, expect, vi, afterEach } from 'vitest'
import { useCounter, useDebounce } from './hooks'

afterEach(() => { vi.useRealTimers() })
it('increments and resets', () => {
  const { result } = renderHook(() => useCounter(5))
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.reset())
  expect(result.current.count).toBe(5)
})
it('returns the last value after the delay', () => {
  vi.useFakeTimers()
  const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), { initialProps: { value: 'a' } })
  rerender({ value: 'ab' })
  rerender({ value: 'abc' })
  act(() => vi.advanceTimersByTime(499))
  expect(result.current).toBe('a')
  act(() => vi.advanceTimersByTime(1))
  expect(result.current).toBe('abc')
})`,
          try: R`اكتب [[useCounter(initial)]] بيرجّع [[{ count, increment, reset }]]، واستخدم [[useDebounce]] من درس custom hook، وشغّل الاختبارين. بعدين اختبر hook بيستخدم React Query (زي [[useProducts()]]): ابعت [[{ wrapper }]] لـ renderHook، واستنى [[result.current.isSuccess]] بـ [[waitFor]].`,
          flag: "script",
          deep: {
            why: R`الـ hook اللي فيه منطق (debounce، أو pagination، أو صلاحيات، أو حسابات سلة) بيتستخدم في components كتير. اختباره لوحده أسرع وأوضح من إنك ترسم كل component بيستخدمه، ولما يفشل تعرف إن المشكلة في الـ hook نفسه.`,
            how: R`[[renderHook]] بيعمل component اسمه TestComponent بينادي الـ callback بتاعك جوه الـ render ويحفظ الناتج في [[result.current]]. «current» لأنها بتتغير مع كل render، فلازم تقراها بعد كل act مش تحفظها في متغير في الأول ([[const { count } = result.current]] بيفضل على القيمة القديمة).

[[act(() => ...)]] بيقول لـ React «نفّذ ده وطبّق كل التحديثات والـ effects الناتجة قبل ما ترجع». من غيرها React بتطبع warning والقيمة ممكن تبقى قديمة. ولو الـ callback async: [[await act(async () => ...)]].

[[initialProps]] و [[rerender(props)]] بيحاكوا الأب اللي بيبعت قيمة جديدة، وده بالظبط اللي بيحصل مع useDebounce لما المستخدم يكتب.

الـ fake timers: [[vi.useFakeTimers()]] بيستبدل [[setTimeout]] و [[Date]] بنسخة الاختبار بيتحكم فيها، و [[advanceTimersByTime(ms)]] بيشغّل أي timer وقته جه. لازم الـ advance يبقى جوه act لأنه بيعمل setState. و [[vi.useRealTimers()]] في afterEach عشان الاختبارات التانية (وخصوصًا user-event و findBy اللي بيستخدموا timers) متتأثرش.

و hook محتاج provider: [[renderHook(() => useProducts(), { wrapper })]] بنفس Wrapper بتاع [[renderWithProviders]].`,
            when: R`hooks فيها منطق حقيقي ومستخدمة في أكتر من مكان. أما hook بسيط بيلف useQuery وخلاص، فاختبار الـ component اللي بيستخدمه بيغطيه.`,
            mistakes: R`تقرا [[result.current]] مرة وتحفظها، وبعدين تستغرب إنها مبتتغيرش. وتنسى [[act]] حوالين النداء اللي بيغيّر state. و fake timers من غير ما ترجّع الـ real timers، فاختبار تاني بـ findBy يعلق للأبد. واختبار كل hook صغير لوحده حتى لو هو مجرد [[useState]] ملفوف: اختبار ملوش قيمة وبيتكسر مع أي refactor.`
          },
          lines: [
            "renderHook و act.",
            "أدوات vitest، و vi للـ fake timers.",
            "الـ hooks اللي بنختبرها.",
            "بعد كل اختبار رجّع الوقت الحقيقي.",
            "اختبار العداد.",
            "ارسم الـ hook بقيمة أولى 5.",
            "نادي increment جوه act عشان التحديث يتطبق.",
            "اقرا result.current من جديد بعد التحديث.",
            "reset.",
            "رجع 5.",
            "قفلة.",
            "اختبار الـ debounce.",
            "وقت وهمي.",
            "ارسم بقيمة أولى، و rerender هيغيّرها.",
            "المستخدم كتب حرف.",
            "وحرف تاني قبل ما الوقت يخلص.",
            "قدّم الوقت 499ms.",
            "لسه القيمة القديمة.",
            "آخر 1ms.",
            "دلوقتي آخر قيمة بس، والوسطانية اتلغت.",
            "قفلة."
          ],
          sol: R`الاختبارين بيعدّوا في أقل من ثانية حتى مع delay 500ms، لأن الوقت وهمي. لو شلت الـ act من حوالين [[advanceTimersByTime]] هتلاقي warning «An update to TestComponent inside a test was not wrapped in act(...)»، وممكن القيمة تفضل [['a']].

اختبار [[useProducts]] بيعدّي لما تبعت [[wrapper]] فيه QueryClientProvider (من غيره: «No QueryClient set»)، وتستنى [[await waitFor(() => expect(result.current.isSuccess).toBe(true))]]، وبعدها [[result.current.data]] فيها المنتجات من MSW.`,
          solCode: R`export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)
  return { count, increment: () => setCount(c => c + 1), reset: () => setCount(initial) }
}

it('loads products', async () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  const { result } = renderHook(() => useProducts(), { wrapper })
  await waitFor(() => expect(result.current.isSuccess).toBe(true))
  expect(result.current.data).toHaveLength(2)
})`
        },
        {
          cmd: "unit ولا e2e في Next",
          title: "Next.js: إيه اللي يتختبر بـ Vitest وإيه اللي محتاج متصفح حقيقي",
          desc: R`Vitest و Testing Library بيختبروا الـ Client Components كويس، والدوال العادية (utils و schemas و DAL بـ داتابيز اختبار). بس الـ async Server Components لسه مش مدعومة في Testing Library ([[render(<Page />)]] لـ component بيعمل [[await]] مش هيشتغل)، والـ Server Actions والـ proxy والـ caching محتاجين Next نفسه شغال.

التقسيمة العملية: منطق الـ Server Action في دالة عادية تتختبر unit (بـ mock للـ session والداتابيز أو داتابيز اختبار)، والـ client components بـ Testing Library، والرحلات المهمة كاملة (تسجيل، ودخول، ودفع) بـ Playwright على [[next build && next start]]. تفاصيل Playwright والـ CI في تاب «فحص الكود».`,
          example: R`// lib/orders.ts: المنطق في دالة عادية
export async function placeOrder(input: unknown, deps: { userId: string | null; db: OrdersDb }) {
  if (!deps.userId) return { ok: false as const, error: 'unauthorized' }
  const parsed = orderSchema.safeParse(input)
  if (!parsed.success) return { ok: false as const, error: 'invalid', fieldErrors: z.flattenError(parsed.error).fieldErrors }
  const order = await deps.db.create({ ...parsed.data, userId: deps.userId })
  return { ok: true as const, id: order.id }
}
// app/actions.ts: الـ action رفيع، بيجمع الـ deps وينادي
// 'use server'; export async function placeOrderAction(fd: FormData) { const s = await verifySession(); return placeOrder(Object.fromEntries(fd), { userId: s?.userId ?? null, db }) }
// lib/orders.test.ts
it('rejects guests and invalid input', async () => {
  const db = { create: vi.fn() }
  expect(await placeOrder({ productId: 'p1', qty: 1 }, { userId: null, db })).toEqual({ ok: false, error: 'unauthorized' })
  expect((await placeOrder({ qty: 0 }, { userId: 'u1', db })).ok).toBe(false)
  expect(db.create).not.toHaveBeenCalled()
})
// e2e/checkout.spec.ts (Playwright)
test('guest is redirected to login at checkout', async ({ page }) => {
  await page.goto('/checkout')
  await expect(page).toHaveURL(/\/login/)
})`,
          try: R`خد Server Action عندك في مشروع Next (أو اعمل واحد للطلبات)، وطلّع منطقه في دالة زي [[placeOrder]] بتاخد الـ userId والـ db كـ arguments. اكتب ٣ اختبارات Vitest: ضيف مرفوض، و input غلط، وطلب سليم بيرجّع id. بعدين اكتب اختبار Playwright واحد للرحلة كلها.`,
          flag: "script",
          deep: {
            why: R`في Next.js جزء كبير من الكود بقى على السيرفر، ومش كله بيتختبر بنفس الطريقة. لو حاولت تختبر كل حاجة بـ Testing Library هتصطدم بـ async Server Components، ولو كل حاجة بـ e2e الاختبارات هتبقى بطيئة وهشة. التقسيم الصح بيخلي أغلب الاختبارات سريعة، وقليل منها بطيء بس بيغطي اللي مينفعش يتغطى غير كده.`,
            how: R`الـ Server Action في الآخر دالة async على السيرفر. لو حطيت فيها [[cookies()]] و [[prisma]] و [[revalidatePath]] مباشرة، اختبارها محتاج [[vi.mock]] لـ [[next/headers]] و [[next/cache]] والداتابيز. الأسهل: الـ action يبقى «رفيع» (يقرا الـ session، ويحوّل الـ FormData، وينادي، ويعمل revalidate)، والمنطق كله في دالة بتاخد اللي محتاجاه كـ arguments. دي بتتختبر زي أي دالة. وده نفس فكرة الـ DAL في تاب Next.js.

الـ Client Components: زي أي React component، بـ [[renderWithProviders]]. ولو بتستخدم [[useRouter]] من [[next/navigation]]، اعمله [[vi.mock('next/navigation', ...)]] يرجّع [[push: vi.fn()]]، أو استخدم mock جاهز زي next-router-mock. و [[next/image]] و [[next/link]] بيترسموا عادي في jsdom غالبًا.

الـ async Server Components: الـ docs بتاعة Next نفسها بتقول استخدم e2e ليها. في حالات بسيطة ناس بتعمل [[render(await Page())]] (بتنادي الدالة وتستنى الـ JSX وترسمه)، وده بيشتغل لو مفيش جواها async components تانية ولا حاجات server-only، بس هش.

الـ e2e: Playwright بيشغّل متصفح حقيقي على [[next start]] (مش dev، عشان الكاش والـ static بيتصرفوا زي الإنتاج)، و [[webServer]] في [[playwright.config.ts]] بيشغّل السيرفر قبل الاختبارات. استخدمه للرحلات اللي لو وقعت الشركة هتخسر: الدخول، والتسجيل، والدفع، والصلاحيات. والـ API الخارجي (بوابة الدفع مثلًا) بيتعمله mock بـ [[page.route]] أو بيئة sandbox.`,
            when: R`في أي مشروع Next: Vitest لكل حاجة فيها منطق (دوال، و schemas، و hooks، و client components)، و Playwright لـ ٥ لـ ١٠ رحلات مهمة، وسيب الباقي.`,
            mistakes: R`[[render(<Page />)]] لـ async Server Component وتستغرب الـ error. و Server Action ضخم كل حاجة جواه فمحدش بيختبره. و e2e لكل زرار في الموقع: ساعة CI وبيفشل عشوائي. و e2e على [[next dev]] فالسلوك مختلف عن الإنتاج (الكاش والـ static). و mock لكل حاجة في اختبار الـ action لحد ما الاختبار مبقاش بيختبر غير الـ mocks. وسؤال انترفيو: «هرم الاختبارات في Next؟» unit كتير للمنطق، و component tests للواجهة، و e2e قليل للرحلات الحرجة.`
          },
          lines: [
            "الدالة بتاخد الـ input والحاجات اللي بتعتمد عليها (مين المستخدم، والداتابيز).",
            "مفيش مستخدم؟ ارفض من غير ما تلمس الداتابيز.",
            "نفس الـ schema المشتركة.",
            "بيانات غلط؟ ارجع الأخطاء لكل خانة.",
            "اعمل الطلب باسم المستخدم ده.",
            "نجح.",
            "قفلة.",
            "اختبار Vitest عادي، من غير Next خالص.",
            "داتابيز وهمية: دالة بتسجّل النداءات.",
            "ضيف: مرفوض.",
            "كمية صفر: مرفوض.",
            "وفي الحالتين محدش كتب في الداتابيز.",
            "قفلة.",
            "اختبار Playwright في متصفح حقيقي على التطبيق شغال.",
            "افتح صفحة الدفع من غير دخول.",
            "اتحوّل لصفحة الدخول.",
            "قفلة."
          ],
          sol: R`الاختبارات التلاتة بيعدّوا في مللي ثواني من غير Next ولا داتابيز. الضيف: [[{ ok: false, error: 'unauthorized' }]] و [[db.create]] متناداش. الـ input الغلط: [[ok: false]] ومعاه [[fieldErrors]]. السليم: [[db.create]] اتنادى بالبيانات ومعاها [[userId]]، والنتيجة [[{ ok: true, id }]].

اختبار Playwright بيعدّي لو الـ proxy أو الصفحة بتعمل redirect للدخول. لو فشل بـ timeout على [[toHaveURL]]، غالبًا الصفحة بتعرض رسالة «سجّل دخول» من غير redirect، فغيّر الاختبار يدوّر على النص بدل الـ URL، أو قرر إيه السلوك الصح.`,
          solCode: R`it('creates an order for a signed-in user', async () => {
  const db = { create: vi.fn().mockResolvedValue({ id: 'o1' }) }
  const result = await placeOrder({ productId: 'p1', qty: 2 }, { userId: 'u1', db })
  expect(result).toEqual({ ok: true, id: 'o1' })
  expect(db.create).toHaveBeenCalledWith({ productId: 'p1', qty: 2, userId: 'u1' })
})

// playwright.config.ts
// webServer: { command: 'npm run build && npm run start', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI }`
        }
      ]
    },
    {
      t: "الأداء و rendering",
      l: 3,
      n: "الكومبوننت بيعيد الرسم إمتى وليه، وإزاي تقيس قبل ما تصلّح: memo و React Compiler و Profiler و transitions و virtualization",
      items: [
        {
          cmd: "إمتى بيعيد الرسم",
          title: "الكومبوننت بيعمل render إمتى بالظبط؟",
          desc: R`تلات أسباب بس: الـ state بتاعته اتغيرت ([[setState]] بقيمة مختلفة)، أو الأب بتاعه عمل render (فكل الأولاد بيعملوا render، حتى لو الـ props زي ما هي)، أو context بيقراه قيمته اتغيرت. تغيير الـ props لوحده مش سبب: الـ props بتتغير لأن الأب عمل render.

و render مش معناه إن الـ DOM اتغير. React بتنادي الدالة وتقارن الناتج، ولو مفيش فرق مبتلمسش الـ DOM. عشان كده أغلب الـ renders الزيادة رخيصة ومش محتاجة تصليح، والمشكلة بتبقى لما component تقيل (list كبيرة أو chart) بيعيد الرسم مع كل حرف.`,
          example: R`function Box({ children }: { children: ReactNode }) {
  const [n, setN] = useState(0)
  return <div><button onClick={() => setN(n + 1)}>box {n}</button>{children}</div>
}
export function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>count {count}</button>
      <Plain label="same" />
      <Memoized label="same" />
      <Box><ExpensiveChild /></Box>
    </>
  )
}
// دوسة على count: Plain بيترسم تاني، و Memoized لأ، و ExpensiveChild بيترسم تاني
// دوسة على box: Box بس اللي بيترسم، و ExpensiveChild لأ`,
          try: R`اعمل [[Plain]] و [[Memoized]] (ملفوف في [[memo]]) و [[ExpensiveChild]]، وكل واحد فيه [[console.log('render X')]]. افتح React DevTools > ⚙ > «Highlight updates when components render»، ودوس الزرارين وشوف مين بينوّر. بعدين خلي Box ياخد [[<ExpensiveChild />]] وهو جوه نفسه (مش children) وقارن.`,
          flag: "script",
          deep: {
            why: R`أغلب نصايح الأداء اللي بتسمعها (حط useMemo، لف في memo) من غير فهم «ليه الكومبوننت بيعيد الرسم» بتعمل كود أعقد ومش أسرع. لما تعرف الأسباب التلاتة، تقدر تصلّح المشكلة من جذرها: تنقل الـ state لتحت، أو تستخدم children، أو تقسّم context، قبل ما تفكر في memo.`,
            how: R`لما [[setCount]] بيتنادى، React بتعلّم Parent إنه محتاج render، وبترسم Parent وكل حاجة تحته في الشجرة بالترتيب. [[<Plain label="same" />]] بيتعمل object جديد في كل render للأب، و React مبتقارنش الـ props افتراضيًا، فبترسمه. [[memo]] بيضيف مقارنة: لو كل prop زي القديمة بـ [[Object.is]] يتخطى.

الـ children trick: [[<ExpensiveChild />]] اللي جوه [[<Box>]] اتعمل في render بتاع Parent، مش Box. فلما Box يغيّر الـ state بتاعته ويعيد الرسم، الـ children prop هو هو نفس الـ object القديم، و React بتشوف إنه نفس العنصر بالظبط فمبترسموش. ده اللي بيخلي «ارفع المحتوى لفوق وابعته children» أسهل تحسين أداء من غير أي memo. ولما Parent نفسه يعيد الرسم، العنصر اتعمل جديد فبيترسم.

الـ batching: كل الـ setState في نفس الـ event (وفي React 18 وبعده حتى جوه setTimeout و promises) بيتجمعوا في render واحد. و setState بنفس القيمة ([[Object.is]]) React بتتخطى الـ render غالبًا.

و [[<StrictMode>]] في التطوير بيرسم كل component مرتين عن قصد (وبيعمل الـ effects mount ثم unmount ثم mount) عشان يكشف الكود اللي مش pure، فلو بتعد الـ renders بـ console.log هتلاقيها ضعف. في الإنتاج مرة واحدة.

وكمان: تغيير مكان الـ component في الشجرة أو نوعه أو الـ key بتاعه مش re-render، ده unmount و mount جديد، والـ state بتروح.`,
            when: R`قبل أي تحسين أداء: اعرف مين بيعيد الرسم وليه (Highlight updates و Profiler). ولما تصمم الـ components: الـ state بتنزل لأقرب مكان محتاجها (state colocation)، والحاجات التقيلة تتبعت children من برا الـ component اللي state بتاعته بتتغير كتير.`,
            mistakes: R`تفتكر إن الـ component بيعيد الرسم «لما الـ props تتغير» بس، فتستغرب إنه بيترسم والـ props زي ما هي. وتعد الـ renders في Strict Mode وتفتكر فيه مشكلة. وتحط state بتتغير كل حرف (نص بحث) في App فالتطبيق كله يعيد الرسم. وتلف كل حاجة في memo بدل ما تنزّل الـ state. وسؤال انترفيو مشهور: «لو الأب عمل render، الأولاد بيعملوا render؟» أيوة، إلا لو memo والـ props زي ما هي، أو العنصر نفسه جاي من برا (children).`
          },
          lines: [
            "Box عنده state خاصة بيه، وبيرسم children اللي اتبعتتله.",
            "state بتاعة Box.",
            "زرار بيغيّر state الـ Box بس، وبعده الـ children.",
            "قفلة Box.",
            "الأب.",
            "state الأب.",
            "بداية الـ JSX.",
            "Fragment.",
            "زرار بيغيّر state الأب، فالأب وكل اللي تحته بيعيدوا الرسم.",
            "عادي: بيترسم مع كل render للأب.",
            "ملفوف في memo: الـ prop زي ما هي، فبيتخطى.",
            "ExpensiveChild اتعمل هنا في الأب، واتبعت لـ Box كـ children.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`دوسة count: بيطبع [[render Plain]] و [[render ExpensiveChild]]، ومش بيطبع [[render Memoized]]. في Highlight updates هتشوف Parent و Plain و Box و ExpensiveChild بينوّروا. دوسة box: Box بس بينوّر، ومفيش [[render ExpensiveChild]]، لأن العنصر جاي من Parent اللي معملش render.

لما تحط [[<ExpensiveChild />]] جوه Box نفسه بدل children، كل دوسة box هتطبع [[render ExpensiveChild]]، لأن العنصر بقى بيتعمل من جديد في كل render للـ Box.

لو كل رسالة ظاهرة مرتين، ده Strict Mode، مش bug. (ده متجرّب في اختبار بيعد الـ renders: count بيرسم Plain و ExpensiveChild مرتين و Memoized مرة، و box مبيرسمش ExpensiveChild.)`,
          solCode: R`import { memo, useState, type ReactNode } from 'react'

function Plain({ label }: { label: string }) { console.log('render Plain'); return <p>{label}</p> }
const Memoized = memo(function Memoized({ label }: { label: string }) { console.log('render Memoized'); return <p>{label}</p> })
function ExpensiveChild() { console.log('render ExpensiveChild'); return <p>slot</p> }

// النسخة اللي بتعيد الرسم مع كل دوسة box:
function BoxInside() {
  const [n, setN] = useState(0)
  return <div><button onClick={() => setN(n + 1)}>box {n}</button><ExpensiveChild /></div>
}`
        },
        {
          cmd: "React.memo",
          title: "memo و referential equality: ليه الـ memo بتاعك مش شغال",
          desc: R`[[memo(Component)]] بيخلي الكومبوننت يتخطى الـ render لو كل الـ props زي القديمة بالظبط ([[Object.is]] لكل prop). الأرقام والنصوص بتتقارن بالقيمة، بس الـ objects والـ arrays والدوال بالمرجع: [[{ color: 'red' }]] مكتوبة في الـ JSX بتبقى object جديد كل render، فالـ memo بيشوفها «اتغيرت» ويرسم.

عشان memo يشتغل، كل prop مش primitive لازم مرجعها يفضل ثابت: متعرّفة برا الـ component، أو [[useMemo]] و [[useCallback]]، أو جاية من state. ومع React Compiler ده بيحصل لوحده (الدرس الجاي).`,
          example: R`const MemoWithObject = memo(function MemoWithObject({ style }: { style: { color: string } }) {
  return <p style={style}>obj</p>
})
const MemoWithFn = memo(function MemoWithFn({ onPick }: { onPick: () => void }) {
  return <button onClick={onPick}>pick</button>
})
const RED = { color: 'red' }
export function Parent() {
  const [count, setCount] = useState(0)
  const onPick = useCallback(() => console.log('pick'), [])
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>count {count}</button>
      <MemoWithObject style={{ color: 'red' }} />
      <MemoWithObject style={RED} />
      <MemoWithFn onPick={onPick} />
      <MemoWithFn onPick={() => console.log('pick')} />
    </>
  )
}`,
          try: R`حط [[console.log]] في الاتنين، ودوس count. عد مين من الأربعة بيترسم. وبعدين افتح React DevTools > Profiler، اعمل Record ودوس، ودوس على أي component بيترسم: «Why did this render?» بتقول بالظبط أنهي prop اتغيرت (لازم تفعّل «Record why each component rendered» من الإعدادات).`,
          flag: "script",
          deep: {
            why: R`memo أشهر أداة أداء في React وأكتر واحدة بتتستخدم غلط: ناس بتلف component في memo وتبعتله [[onClick={() => ...}]]، فالـ memo بيقارن كل render ويلاقيها اتغيرت ويرسم برضه. يعني دفعت تمن المقارنة ومأخدتش حاجة. لازم تفهم الـ referential equality عشان تعرف ليه.`,
            how: R`[[memo(C)]] بيرجّع component جديد بيحتفظ بآخر props. في كل render للأب بيقارن كل prop بالقديمة بـ [[Object.is]] (shallow: مش بيدخل جوه الـ objects). لو كلها زي ما هي بيرجّع آخر ناتج من غير ما ينادي C. تقدر تبعت دالة مقارنة تانية [[memo(C, (prev, next) => ...)]] بس نادرًا ما ده فكرة كويسة.

في المثال: [[style={{ color: 'red' }}]] object جديد كل render فبيترسم. [[style={RED}]] ثابت لأنه متعرّف برا الـ component مرة واحدة، فبيتخطى. [[onPick]] من useCallback بـ [[[]]] نفس الدالة كل مرة، فبيتخطى. والـ arrow function في الـ JSX جديدة كل مرة، فبيترسم.

و [[children]] كمان prop: [[<Memoized><p>hi</p></Memoized>]] الـ [[<p>]] بيتعمل جديد كل render، فالـ memo مش هيشتغل. وأي context الـ component بيقراه بيعدّي الـ memo: لو قيمة الـ context اتغيرت بيرسم حتى لو الـ props زي ما هي.

memo بيستاهل لما: الكومبوننت تقيل فعلًا (list كبيرة، chart، محرر)، وبيعيد الرسم كتير بنفس الـ props، والـ props بسيطة أو تقدر تثبّتها. غير كده، المقارنة نفسها تكلفة، والكود بيبقى أصعب.`,
            when: R`بعد ما القياس (Profiler) يقول إن component معين بياخد وقت وبيترسم على الفاضي. وفي مشروع شغال بـ React Compiler، غالبًا مش هتكتب memo خالص.`,
            mistakes: R`memo على component بيستلم دالة arrow أو object أو array جديدة كل مرة. و memo على component صغير رخيص «احتياطي». و useCallback لدالة رايحة لـ [[<button>]] عادي (مش memo). و deep compare بـ [[JSON.stringify]] في دالة المقارنة: أبطأ من الـ render نفسه غالبًا. وتنسى إن الـ context بيعدّي memo. وسؤال انترفيو: «ليه component ملفوف في memo بيعيد الرسم؟» (prop مرجعها بيتغير، أو children، أو context، أو state جواه).`
          },
          lines: [
            "component ملفوف في memo بياخد object.",
            "بيستخدمه.",
            "قفلة.",
            "component ملفوف في memo بياخد دالة.",
            "بيستخدمها.",
            "قفلة.",
            "object متعرّف مرة واحدة برا أي component، فمرجعه ثابت للأبد.",
            "الأب.",
            "state بتتغير.",
            "دالة مرجعها ثابت بين الـ renders.",
            "بداية الـ JSX.",
            "Fragment.",
            "الزرار اللي بيعمل render للأب.",
            "object جديد كل render: الـ memo بيرسم.",
            "نفس الـ object: الـ memo بيتخطى.",
            "نفس الدالة: بيتخطى.",
            "arrow جديدة كل render: بيرسم.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`مع كل دوسة count اتنين بس بيترسموا: [[MemoWithObject]] اللي واخد [[{{ color: 'red' }}]] مكتوب في الـ JSX، و [[MemoWithFn]] اللي واخد arrow function. التانيين (RED و onPick من useCallback) بيتخطوا.

في الـ Profiler، «Why did this render?» للأول بتقول «Props changed: (style)» وللتاني «Props changed: (onPick)»، ومع إن القيمة «هي هي» في عينك، المرجع جديد.

ولو شغّلت نفس الكود بـ React Compiler، التلاتة التانيين كمان هيتخطوا، لأن الـ compiler بيثبّت الـ object والـ arrow لوحده.`,
          solCode: R`const MemoWithObject = memo(function MemoWithObject({ style }: { style: { color: string } }) {
  console.log('render MemoWithObject', style === RED ? 'RED' : 'inline')
  return <p style={style}>obj</p>
})
const MemoWithFn = memo(function MemoWithFn({ onPick }: { onPick: () => void }) {
  console.log('render MemoWithFn')
  return <button onClick={onPick}>pick</button>
})
// بعد دوسة count:
// render MemoWithObject inline
// render MemoWithFn`
        },
        {
          cmd: "React Compiler",
          title: "React Compiler: الـ memoization لوحده وقت الـ build، وإمتى تشيل useMemo",
          desc: R`React Compiler بيقرا الـ components والـ hooks وقت الـ build ويضيف memoization لوحده: كل قيمة محسوبة، وكل object و arrow function، وكل عنصر JSX بيتحفظ ومبيتعملش تاني غير لما اللي بيعتمد عليه يتغير. النتيجة إن أغلب الـ renders الزيادة بتختفي من غير ما تكتب [[memo]] ولا [[useMemo]] ولا [[useCallback]].

نزل v1.0 stable في أكتوبر ٢٠٢٥، وبيشتغل مع React 17 و 18 و 19. في Vite بتضيفه كـ Babel preset، وفي Next.js [[reactCompiler: true]]، و eslint-plugin-react-hooks الجديد فيه قواعده.`,
          example: R`// npm i -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler
// vite.config.ts (مع @vitejs/plugin-react 6)
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
export default defineConfig({ plugins: [react(), babel({ presets: [reactCompilerPreset()] })] })
// next.config.ts: const nextConfig = { reactCompiler: true }
// الكود الجديد: من غير memo ولا useMemo ولا useCallback
function ProductsPage({ products, query }: { products: Product[]; query: string }) {
  const visible = products.filter(p => p.name.includes(query))
  const handleAdd = (id: string) => addToCart(id)
  return <ProductGrid items={visible} onAdd={handleAdd} />
}
// component مش آمن للـ compiler؟ استثنيه لحد ما تصلّحه:
function LegacyWidget() {
  'use no memo'
  return <div ref={legacyRef} />
}`,
          try: R`خد مثال درس «إمتى بيعيد الرسم» (Plain و ExpensiveChild بـ console.log)، وشغّله من غير الـ compiler وعد الـ renders مع دوسة count. بعدين ضيف الـ preset واعمل restart لـ [[npm run dev]]، ودوس تاني. وافتح React DevTools: الـ components اللي اتعملها compile عليها علامة «Memo ✨».`,
          flag: "script",
          deep: {
            why: R`الـ memoization اليدوي مرهق وبيتنسي: dependencies ناقصة، و useCallback في مكان مش محتاجه، و memo مكسور بسبب prop واحدة. والكود بيبقى مليان لف حوالين كل حاجة. الـ compiler بيعمل ده بدقة أعلى من البني آدم (بيحفظ على مستوى القيمة الواحدة، حتى عناصر JSX جوه الـ return)، والكود بيرجع بسيط.`,
            how: R`الـ compiler بيحلل كل component كدالة: إيه القيم اللي بتعتمد على إيه. وبيطلّع كود بيستخدم cache صغير جوه الـ component ([[react/compiler-runtime]]): لو [[products]] و [[query]] زي ما هم، [[visible]] بترجع من الكاش، و [[handleAdd]] نفس الدالة، وعنصر [[<ProductGrid ... />]] نفسه نفس الـ object، فـ React بتتخطى رسمه. ده متجرّب: مثال «إمتى بيعيد الرسم» بالـ compiler مبيرسمش Plain ولا ExpensiveChild ولا حتى MemoWithObject اللي واخد object مكتوب في الـ JSX.

بيعتمد إنك ماشي على قواعد React: الـ components pure، ومفيش تعديل للـ props أو الـ state في المكان، ومفيش قراية لـ [[ref.current]] وقت الرسم، والـ hooks بتتنادى بنفس الترتيب. لو لقى component بيكسر القواعد بيتخطاه (بيسيبه زي ما هو) بدل ما يبوّظه، و eslint-plugin-react-hooks (v6 وبعده) فيه قواعد زي [[react-hooks/purity]] و [[react-hooks/refs]] و [[react-hooks/immutability]] بتقولك فين المشاكل دي حتى لو مش مركّب الـ compiler.

إعداد Vite اتغير: مع [[@vitejs/plugin-react]] 6 (Vite 8) بقى [[reactCompilerPreset()]] مع [[@rolldown/plugin-babel]]، والشكل القديم [[react({ babel: { plugins: ['babel-plugin-react-compiler'] } })]] لـ plugin-react 5 وقبله. وفيه خيار [[react({ compiler: true })]] بنسخة Rust بس لسه experimental. و [[compilationMode: 'annotation']] بيخليه يشتغل بس على الـ components اللي فيها [['use memo']]، مفيد لو بتدخّله في مشروع كبير تدريجيًا.

وuseMemo و useCallback؟ للكود الجديد: متكتبهمش، إلا كـ escape hatch لما محتاج تحكم دقيق (قيمة dependency في effect لازم تفضل ثابتة). للكود الموجود: الـ docs بتقول سيبهم أو اختبر كويس قبل ما تشيلهم، لأن شيلهم ممكن يغيّر ناتج الـ compile.`,
            when: R`أي مشروع React جديد في ٢٠٢٦: فعّله من الأول. ومشروع قديم: ركّب قواعد eslint الأول وصلّح اللي بتطلّعه، وبعدين فعّل الـ compiler (أو annotation mode لأجزاء معينة) واختبر.`,
            mistakes: R`تفتكر إن الـ compiler بيصلّح كود مش pure: هو بيتخطاه، فمش هتاخد الفايدة. وتشيل كل useMemo من مشروع قديم مرة واحدة من غير اختبار. وتقرا [[ref.current]] أو تعدّل object جاي من props وقت الرسم، فالـ compiler يتخطى الـ component بصمت. ومكتبات بتعتمد على إن الـ component بيعيد الرسم كل مرة (زي بعض المكتبات اللي بترجّع object mutable من hook)، فالشاشة ممكن متتحدثش: دي بتستثنيها بـ [['use no memo']]. وتنسى الـ restart بعد تغيير الـ config. وسؤال انترفيو في ٢٠٢٦: «لسه محتاج useMemo؟» الإجابة: مع الـ compiler غالبًا لأ، وبرضه لازم تفهم الـ referential equality عشان تقرا الكود القديم وتفهم ليه component اتخطى.`
          },
          lines: [
            "defineConfig.",
            "الـ plugin بيصدّر preset جاهز للـ compiler.",
            "plugin الـ Babel لـ Rolldown (Vite 8).",
            "React عادي، و Babel بالـ preset على ملفات React بس.",
            "component عادي.",
            "حساب عادي: الـ compiler بيحفظه لحد ما products أو query يتغيروا.",
            "دالة عادية: الـ compiler بيثبّت مرجعها.",
            "والعنصر نفسه بيتحفظ، فـ ProductGrid مبيتعادش على الفاضي.",
            "قفلة.",
            "component فيه حاجة مش آمنة:",
            "توجيه بيقول للـ compiler متلمسنيش.",
            "بيرسم.",
            "قفلة."
          ],
          sol: R`من غير الـ compiler: كل دوسة count بتطبع [[render Plain]] و [[render ExpensiveChild]]. بعد الـ compiler والـ restart: الدوسة بتغيّر رقم الزرار بس، ومفيش ولا log من التانيين، وفي DevTools جنب اسم كل component علامة [[Memo ✨]].

لو مفيش علامة Memo، الـ preset مش شغال: اتأكد إن [[@rolldown/plugin-babel]] و [[@babel/core]] و [[babel-plugin-react-compiler]] متركّبين، وإنك عملت restart. ولو component معين مفيهوش العلامة والباقي فيه، الـ compiler اتخطاه لأنه شايف فيه كسر لقواعد React: شغّل eslint بقواعد react-hooks الجديدة وشوف بيقول إيه.`,
          solCode: R`npm i -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler eslint-plugin-react-hooks@latest

// eslint.config.js
import reactHooks from 'eslint-plugin-react-hooks'
export default [
  reactHooks.configs.flat.recommended,
]`
        },
        {
          cmd: "Profiler",
          title: "لاقي الـ render البطيء بـ React DevTools Profiler",
          desc: R`قبل ما تحسّن أي حاجة، قيس. تاب Profiler في React DevTools بيسجّل كل commit (كل مرة React طبّقت تغيير) وانت بتستخدم الصفحة، ويوريك لكل commit مين اترسم، وخد قد إيه، وليه.

الـ flamegraph: كل component شريط، وطوله وقته، ولونه (أصفر = بطيء، أزرق = سريع، رمادي = متراسمش). والـ ranked chart بيرتّبهم من الأبطأ. ولو عايز أرقام من الكود نفسه، [[<Profiler id onRender>]] بيديك نفس القياس برمجيًا.`,
          example: R`import { Profiler, type ProfilerOnRenderCallback } from 'react'

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration) => {
  if (actualDuration > 16) console.warn($__bt[$__{id}] $__{phase} took $__{actualDuration.toFixed(1)}ms (full tree $__{baseDuration.toFixed(1)}ms)$__bt)
}
export function ProductsPage() {
  return (
    <Profiler id="ProductsGrid" onRender={onRender}>
      <ProductsGrid />
    </Profiler>
  )
}
// DevTools: ⚙ > Profiler > Record why each component rendered
// Performance panel في Chrome: React Performance Tracks بتظهر الـ renders على نفس الـ timeline`,
          try: R`خد صفحة فيها list من ٢٠٠٠ عنصر وخانة بحث بتفلترها (من غير useMemo ولا Deferred). افتح Profiler، واعمل Record، واكتب ٥ حروف، ووقّف. لاقي أبطأ commit، ودوس على أصفر component واقرا «Why did this render?». بعدين اعمل CPU throttling 4x من Performance وكرّر.`,
          flag: "script",
          deep: {
            why: R`الحدس في الأداء غلط غالبًا: ناس بتلف كل حاجة في memo وتكون المشكلة الحقيقية component واحد بيفلتر ٥٠٠٠ عنصر مع كل حرف، أو context بيعيد رسم الصفحة كلها. الـ Profiler بيقولك بالرقم مين وليه، فتصلّح حاجة واحدة صح بدل عشرين حاجة مش فارقة.`,
            how: R`الـ Profiler بيسجّل على مستوى الـ commits: كل مرة React عملت render وطبّقته على الـ DOM. فوق يمين فيه شرايط لكل commit (طول الشريط = مدته)، تتنقل بينهم. وفي الـ flamegraph، الشريط الرمادي معناه الـ component ده متراسمش في الـ commit ده (memo نفع، أو مش تحت اللي اتغير).

«Record why each component rendered» (من الإعدادات) بيضيف السبب لكل component: «Props changed: (onAdd)»، أو «Hook 2 changed» (state أو context جوه hook رقم ٢)، أو «The parent component rendered». ده أهم معلومة، لأنها بتقولك تصلّح فين.

و «Highlight updates when components render» في تاب Components بينوّر أي component بيترسم على الصفحة نفسها وانت شغال، أسرع طريقة تلاحظ إن حرف واحد في input بينوّر الصفحة كلها.

[[<Profiler>]]: [[actualDuration]] وقت الـ render ده (بعد الـ memo)، و [[baseDuration]] الوقت المتوقع لو كل حاجة تحته اترسمت من غير memo، فالفرق بينهم بيقولك الـ memo بيوفّر قد إيه. و [[phase]] بيبقى [[mount]] أو [[update]] أو [[nested-update]]. شغال في التطوير، وفي الإنتاج محتاج build خاص بالـ profiling، فمتسيبهوش في كل حتة.

وفي Chrome Performance panel، React 19.2 وبعده بيضيف «React Performance Tracks» في وضع التطوير: الـ renders والـ effects والـ transitions على نفس الـ timeline مع الـ JS والـ layout. و INP (أبطأ تفاعل) بيتقاس من زوار حقيقيين (تاب المتصفح).

و [[16ms]] في المثال لأن الشاشة بـ 60fps عندها حوالي 16ms لكل frame، فأي render أطول بيبان كتقطيع.`,
            when: R`لما حاجة «بتحس إنها تقيلة»: الكتابة بتهنّج، أو فتح tab بياخد ثانية، أو scroll بيقطّع. وقبل وبعد أي تحسين، عشان تثبت إنه فرق. وقيس على build إنتاج ([[npm run build && npm run preview]]) وبـ CPU throttling، لأن التطوير أبطأ بكتير وجهازك أسرع من جهاز المستخدم.`,
            mistakes: R`تحسّن من غير ما تقيس. وتقيس في dev وتفتكر الأرقام هي هي في الإنتاج (dev بيعمل checks كتير و Strict Mode بيرسم مرتين). وتقيس على لابتوب قوي بس. وتسيب [[<Profiler>]] مع console.log في كل صفحة. وتلاقي component أصفر وتلفه في memo من غير ما تقرا «Why did this render»، والسبب context مثلًا فمش هيفرق.`
          },
          lines: [
            "Profiler component والنوع بتاع الـ callback.",
            "دالة بتتنادى بعد كل commit للجزء اللي جوه:",
            "لو أبطأ من frame واحد (16ms)، اطبع اسمه والنوع والوقت، والوقت لو مفيش memo خالص.",
            "قفلة.",
            "الصفحة.",
            "بداية الـ JSX.",
            "قيس الجزء ده بس.",
            "الـ grid.",
            "قفلة.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`في الـ recording هتلاقي commit لكل حرف تقريبًا. الأبطأ غالبًا فيه الـ list بالأصفر أو البرتقالي، و «Why did this render?» هيقول «Props changed: (query)» أو «The parent component rendered». ومع CPU throttling 4x الأرقام تتضرب في ٣ أو ٤، وده أقرب لموبايل متوسط.

ده بيقولك إن الحل مش memo (الـ prop فعلًا اتغيرت)، الحل إن الـ list تتأجل بـ [[useDeferredValue]] (الدرس الجاي) أو تبقى virtual. لو الأبطأ كان component مش المفروض يتأثر بالبحث أصلًا، يبقى الـ state عالية زيادة أو context بيعيد رسمه.`,
          solCode: R`const ITEMS = Array.from({ length: 2000 }, (_, i) => $__btProduct $__{i}$__bt)

export function SlowSearch() {
  const [query, setQuery] = useState('')
  const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
    </>
  )
}`
        },
        {
          cmd: "useTransition و useDeferredValue",
          title: "خانة البحث متهنّجش وهي بتفلتر list تقيلة",
          desc: R`React بتقسم التحديثات لنوعين: عاجلة (الحرف اللي بيتكتب لازم يظهر فورًا) ومش عاجلة (النتايج ممكن تتأخر شوية). [[useDeferredValue(query)]] بيدّيك نسخة من القيمة «متأخرة»: الخانة بتستخدم [[query]] وبتتحدث فورًا، والـ list التقيلة بتستخدم [[deferredQuery]] وبتترسم في الخلفية، ولو المستخدم كتب حرف تاني React بترمي الـ render القديم وتبدأ بالجديد.

و [[useTransition]] نفس الفكرة بس من ناحية الـ setState: [[startTransition(() => setTab('reports'))]] بتقول «التغيير ده مش عاجل»، و [[isPending]] بيقولك إنه لسه شغال عشان تعرض مؤشر.`,
          example: R`import { memo, useDeferredValue, useState, useTransition } from 'react'

const Results = memo(function Results({ query }: { query: string }) {
  const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  return <ul>{visible.map(item => <li key={item}>{item}</li>)}</ul>
})
export function SearchPage() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery
  return (
    <>
      <input aria-label="Search" value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.5 : 1 }}><Results query={deferredQuery} /></div>
    </>
  )
}
export function Tabs() {
  const [tab, setTab] = useState<'home' | 'reports'>('home')
  const [isPending, startTransition] = useTransition()
  return <button onClick={() => startTransition(() => setTab('reports'))}>Reports {isPending && '…'}</button>
}`,
          try: R`خد [[SlowSearch]] من درس Profiler، وخلي كل [[<li>]] بطيء بعمد ([[const start = performance.now(); while (performance.now() - start < 0.2) {}]]). اكتب بسرعة وحس بالتهنيج. بعدين طبّق [[useDeferredValue]] و [[memo]] زي المثال، وكرّر. وجرّب تشيل الـ memo بس وسيب الـ deferred.`,
          flag: "script",
          deep: {
            why: R`لما كل حرف بيعمل render لـ list فيها آلاف العناصر، المتصفح مش بيلحق يرسم الحرف نفسه غير لما الـ list تخلص، فالمستخدم يحس إن الكيبورد بيهنّج (INP وحش). الحل القديم كان debounce: بيستنى المستخدم يقف، فالنتايج بتتأخر حتى على جهاز سريع. الـ deferred value بيدّي الجهاز السريع نتايج فورية، والجهاز البطيء خانة سلسة ونتايج متأخرة شوية.`,
            how: R`لما [[query]] يتغير، React بتعمل render عاجل الأول بالـ [[deferredQuery]] القديمة: الخانة بتتحدث، و [[Results]] بياخد نفس الـ prop القديمة فالـ memo بيتخطاه، فالـ render ده سريع جدًا. بعدين React بتعمل render تاني في الخلفية بالقيمة الجديدة. الـ render ده ممكن يتقطع: لو حرف جديد جه، React بترميه وتبدأ من الأول.

عشان كده الـ [[memo]] على Results جزء أساسي: من غيره الـ render العاجل نفسه هيرسم الـ list (لأن الأب اترسم)، والتأجيل ملوش لازمة. (مع React Compiler ده بيحصل لوحده.)

[[isStale]] بمقارنة القيمتين بيعرّفك إن النتايج المعروضة قديمة، فتعمل opacity أو spinner صغير بدل ما تفضّي الشاشة.

[[useTransition]]: أي setState جوه [[startTransition]] بيتعلّم «transition»، فمبيوقفش التفاعل، ولو فيه Suspense (lazy page أو useSuspenseQuery) React بتسيب الشاشة القديمة ظاهرة بدل ما تعرض الـ fallback، و [[isPending]] بيبقى true لحد ما يخلص. في React 19 الـ callback ممكن يبقى async (دي الـ Actions). والـ router (React Router و Next) بيعمل التنقل جوه transition لوحده.

الفرق: useTransition لما انت اللي بتنادي setState، و useDeferredValue لما القيمة جاية لك (prop أو من hook تاني) ومش في إيدك تلف الـ setState.

والاتنين مش بيخلّوا الحساب أسرع: الـ list لسه بتاخد نفس الوقت، هم بس بيخلوها متوقفش الحاجات العاجلة. لو الـ list نفسها ضخمة، الحل virtualization (الدرس الجاي).`,
            when: R`فلترة أو بحث في list كبيرة على الفرونت، و charts بتتحسب من input، و tabs بتفتح محتوى تقيل، والتنقل لصفحات lazy. ومش للـ controlled input نفسه: قيمة الخانة لازم تفضل عاجلة.`,
            mistakes: R`تلف [[setQuery]] بتاع الخانة نفسها في startTransition: الكتابة نفسها بتتأخر وتتلخبط. و useDeferredValue من غير memo على الجزء التقيل، فمفيش فرق. وتستخدمها بدل debounce لطلبات الشبكة: الـ deferred بيقلل الـ renders مش الطلبات، ولو الـ query رايحة لـ API لسه محتاج debounce أو React Query بـ key. وتفتكر إنها بتسرّع الحساب نفسه.`
          },
          lines: [
            "الأدوات.",
            "الجزء التقيل ملفوف في memo، ده شرط عشان التأجيل يفرق.",
            "فلترة آلاف العناصر.",
            "والرسم.",
            "قفلة.",
            "الصفحة.",
            "القيمة العاجلة: الخانة بتستخدمها.",
            "نسخة متأخرة منها للـ list.",
            "لو مختلفين، النتايج المعروضة قديمة.",
            "بداية الـ JSX.",
            "Fragment.",
            "الخانة بتتحدث فورًا مع كل حرف.",
            "الـ list بالقيمة المتأخرة، وباهتة وهي قديمة.",
            "قفلة الـ Fragment.",
            "قفلة القوس.",
            "قفلة.",
            "tabs.",
            "state التاب.",
            "isPending و startTransition.",
            "تغيير التاب مش عاجل، والزرار بيعرض … وهو شغال.",
            "قفلة."
          ],
          sol: R`من غير أي حاجة: كل حرف بيظهر متأخر، وأحيانًا حرفين يظهروا مع بعض. مع useDeferredValue و memo: الحروف بتظهر فورًا، والـ list بتبقى باهتة لحظة وبعدين تتحدث، ولو كتبت بسرعة الـ list بتقفز للنتيجة الأخيرة من غير ما تعدّي على الوسطانية.

من غير الـ memo (والـ deferred موجود): التهنيج راجع تقريبًا زي الأول، لأن الـ render العاجل بيرسم الـ list برضه كابن للصفحة. ده أهم درس في التجربة.

في الـ Profiler هتشوف commits سريعة للخانة، و commits أطول للـ list بعدها، وبعضها متلغي.`,
          solCode: R`function SlowItem({ text }: { text: string }) {
  const start = performance.now()
  while (performance.now() - start < 0.2) { /* بطء مقصود للتجربة */ }
  return <li>{text}</li>
}
const Results = memo(function Results({ query }: { query: string }) {
  const visible = ITEMS.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  return <ul>{visible.map(item => <SlowItem key={item} text={item} />)}</ul>
})`
        },
        {
          cmd: "TanStack Virtual",
          title: "list فيها ١٠ آلاف صف: ارسم اللي ظاهر بس",
          desc: R`الـ virtualization معناها إنك بترسم الصفوف اللي ظاهرة في الشاشة بس (ومعاهم كام صف زيادة فوق وتحت)، وباقي الـ list مساحة فاضية بنفس الارتفاع عشان الـ scrollbar يبان صح. ١٠ آلاف صف بقوا ٢٠ عنصر DOM.

[[useVirtualizer]] من [[@tanstack/react-virtual]] بياخد عدد العناصر، والعنصر اللي بيعمل scroll، وارتفاع تقديري لكل صف، ويرجّعلك [[getVirtualItems()]] (اللي المفروض يترسموا دلوقتي ومكان كل واحد) و [[getTotalSize()]] (الارتفاع الكلي).`,
          example: R`import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualList({ rows }: { rows: { id: string; name: string }[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  })
  return (
    <div ref={parentRef} style={{ height: 480, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(item => (
          <div key={rows[item.index].id} data-index={item.index} ref={virtualizer.measureElement}
            style={{ position: 'absolute', top: 0, insetInlineStart: 0, width: '100%', transform: $__bttranslateY($__{item.start}px)$__bt }}>
            {rows[item.index].name}
          </div>
        ))}
      </div>
    </div>
  )
}`,
          try: R`[[npm i @tanstack/react-virtual]]، واعمل ١٠٠٠٠ صف ([[Array.from({ length: 10000 }, (_, i) => ({ id: String(i), name: $__btRow $__{i}$__bt }))]]). ارسمهم الأول بـ [[map]] عادي وافتح Elements وقيس الوقت في Performance. بعدين بالـ VirtualList، و scroll لتحت خالص، وعد عناصر [[div[data-index]]] في Elements.`,
          flag: "script",
          deep: {
            why: R`كل عنصر DOM ليه تمن: الـ layout والـ style والذاكرة. ١٠ آلاف صف في جدول بـ ٦ أعمدة يعني ٦٠ ألف عنصر، والصفحة بتاخد ثواني تفتح، والـ scroll بيقطّع، وأي تحديث بيعيد حساب الـ layout كله. المستخدم مش شايف غير ٢٠ صف، فمفيش داعي لرسم الباقي.`,
            how: R`الـ virtualizer بيسمع لـ scroll بتاع [[parentRef]]، ومن [[scrollTop]] وارتفاع كل صف بيحسب أول وآخر index ظاهر، ويزوّد [[overscan]] من كل ناحية عشان مفيش فراغ يبان وانت بتعمل scroll بسرعة. [[getVirtualItems()]] بيرجّع لكل واحد [[index]] و [[start]] (مكانه بالبكسل) و [[size]] و [[key]].

الـ div الداخلي ارتفاعه [[getTotalSize()]] فالـ scrollbar بيعبّر عن الـ list كلها، وكل صف [[position: absolute]] و [[translateY(start)]] في مكانه. [[insetInlineStart]] بدل [[left]] عشان يشتغل في RTL.

[[estimateSize]] تقدير أولي. لو الصفوف ارتفاعها مختلف (نص بيلف على سطرين)، [[ref={virtualizer.measureElement}]] مع [[data-index]] بيقيس كل صف بعد ما يترسم ويصحح المواقع. لو كل الصفوف نفس الارتفاع بالظبط، اشيل measureElement واكتب الرقم الصح.

فيه كمان [[useWindowVirtualizer]] لو الصفحة كلها هي اللي بتعمل scroll مش div، و [[horizontal: true]] للأعمدة، ويشتغل مع TanStack Table (الصفوف بتيجي من [[table.getRowModel().rows]]) ومع [[useInfiniteQuery]] (لما آخر virtual item يقرّب من الآخر، [[fetchNextPage]]).

وفي الاختبارات: jsdom مفيهوش layout (كل الأحجام صفر)، فالـ virtualizer مش هيرسم صفوف في Vitest العادي. اختبره في متصفح حقيقي (Playwright أو Vitest browser mode).`,
            when: R`lists وجداول فيها أكتر من كام مية صف بيترسموا مرة واحدة: logs، وسجل معاملات، وقوايم منتجات في لوحة أدمن، وشات طويل. للـ lists اللي تحت ١٠٠ صف، مش محتاج. وقبلها فكّر: هل pagination من السيرفر أنسب؟`,
            mistakes: R`الـ parent من غير ارتفاع ثابت أو [[overflow: auto]]، فمفيش scroll والكل بيترسم أو مفيش حاجة. و [[key={item.index}]] بدل id الصف لو الترتيب بيتغير. و estimateSize بعيد جدًا عن الحقيقة من غير measureElement، فالـ scrollbar بيقفز. و Ctrl+F في المتصفح مش هيلاقي صفوف مش مرسومة، فلو البحث مهم اعمل خانة بحث. ونسيان إن قارئ الشاشة مش شايف غير اللي مرسوم، فضيف [[aria-rowcount]] و [[aria-rowindex]] في الجداول.`
          },
          lines: [
            "ref للعنصر اللي بيعمل scroll.",
            "الـ hook.",
            "list بتاخد الصفوف كلها.",
            "العنصر اللي بيعمل scroll.",
            "الـ virtualizer:",
            "كام عنصر.",
            "مين اللي بيعمل scroll.",
            "ارتفاع تقديري لكل صف.",
            "ارسم ٥ زيادة من كل ناحية.",
            "قفلة.",
            "بداية الـ JSX.",
            "الصندوق: ارتفاع ثابت و scroll.",
            "div بارتفاع الـ list كلها، عشان الـ scrollbar.",
            "الصفوف الظاهرة بس:",
            "key من البيانات، و data-index و measureElement عشان يقيس الارتفاع الحقيقي.",
            "كل صف في مكانه بالبكسل، و insetInlineStart عشان RTL.",
            "المحتوى.",
            "قفلة الصف.",
            "قفلة الـ map.",
            "قفلة الـ div الداخلي.",
            "قفلة الصندوق.",
            "قفلة القوس.",
            "قفلة."
          ],
          sol: R`بـ map عادي: Elements فيها ١٠٠٠٠ صف، وأول render بياخد مئات الـ ms (في Performance هتلاقي task طويلة بالأحمر). بالـ VirtualList: حوالي ٢٠ صف بس (١٠ ظاهرين في 480px بـ 48px للصف، و ٥ overscan من كل ناحية)، والرقم ده ثابت حتى وانت في آخر الـ list، والـ scrollbar بيعبّر عن ٤٨٠ ألف بكسل.

لو مفيش صفوف خالص، الـ parent ملوش ارتفاع. ولو الصفوف فوق بعض، ناقص [[position: absolute]] أو الـ transform.

(معلومة: الكود ده متجرّب بـ TypeScript بس، مش في اختبار، لأن jsdom مبيحسبش أحجام فالـ virtualizer مبيرسمش حاجة فيه.)`,
          solCode: R`const rows = Array.from({ length: 10000 }, (_, i) => ({ id: String(i), name: $__btRow $__{i}$__bt }))

export default function App() {
  return <VirtualList rows={rows} />
}
// في الـ console:
// document.querySelectorAll('div[data-index]').length  // حوالي 20`
        }
      ]
    },
    {
      t: "patterns",
      l: 3,
      n: "أشكال بتتكرر في مكتبات الـ UI والكود الحقيقي: compound components، و API بـ value و defaultValue، و ref كـ prop، و URL state، و HTML آمن، و form actions، والـ patterns القديمة",
      items: [
        {
          cmd: "compound components",
          title: "Tabs و Accordion و Select: أجزاء بتشتغل مع بعض من غير props كتير",
          desc: R`الـ compound component مجموعة components صغيرة بتتشارك state من غير ما المستخدم يوصّلها: [[<Tabs>]] و [[<Tabs.List>]] و [[<Tabs.Tab value="a">]] و [[<Tabs.Panel value="a">]]. الأب بيمسك الـ state ويحطها في context، والأجزاء بتقراها. ده الشكل اللي shadcn و Radix و Headless UI مبنيين بيه.

البديل component واحد بياخد [[tabs={[{ label, content, disabled, icon }]}]]، وده بيتكسر أول ما حد يحتاج أيقونة في مكان مختلف أو badge جنب تاب معين. مع الـ compound، المستخدم بيرتّب الأجزاء ويحط اللي هو عايزه بينهم.`,
          example: R`import { createContext, useContext, useId, useState, type ReactNode } from 'react'

type TabsCtx = { active: string; setActive: (v: string) => void; baseId: string }
const Ctx = createContext<TabsCtx | null>(null)
function useTabs() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>')
  return ctx
}
export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultValue)
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>
}
Tabs.Tab = function Tab({ value, children }: { value: string; children: ReactNode }) {
  const { active, setActive, baseId } = useTabs()
  return <button role="tab" id={$__bt$__{baseId}-tab-$__{value}$__bt} aria-selected={active === value} aria-controls={$__bt$__{baseId}-panel-$__{value}$__bt} onClick={() => setActive(value)}>{children}</button>
}
Tabs.Panel = function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const { active, baseId } = useTabs()
  if (active !== value) return null
  return <div role="tabpanel" id={$__bt$__{baseId}-panel-$__{value}$__bt} aria-labelledby={$__bt$__{baseId}-tab-$__{value}$__bt}>{children}</div>
}
// <Tabs defaultValue="orders"><Tabs.List><Tabs.Tab value="orders">Orders</Tabs.Tab><Tabs.Tab value="returns">Returns <Badge>3</Badge></Tabs.Tab></Tabs.List><Tabs.Panel value="orders">...</Tabs.Panel></Tabs>`,
          try: R`استخدم Tabs بتلات تابات، وحط [[<Badge>]] جوه واحد منهم. اختبره بـ Testing Library: [[getByRole('tab', { name: 'Returns 3' })]] ودوس عليه واتأكد إن [[getByRole('tabpanel')]] اتغير. بعدين ضيف تنقل بالأسهم: في [[Tabs.List]] اسمع لـ [[onKeyDown]] و ArrowRight يحرّك للتاب اللي بعده.`,
          flag: "script",
          deep: {
            why: R`مكتبات الـ UI محتاجة مرونة من غير ما الـ API ينفجر. component بـ ٢٠ prop ([[renderTabLabel]] و [[tabClassName]] و [[showBadgeOn]]) صعب يتفهم وصعب يتوسع. الـ compound بيدّي المستخدم JSX عادي يرتّبه زي ما هو عايز، والمنطق (مين active، والـ ids، والـ aria) مخبّي جوه. ولما تستخدم shadcn هتلاقي كل حاجة كده ([[<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>...]])، فلازم تعرف بتشتغل إزاي.`,
            how: R`الأب ([[Tabs]]) صاحب الـ state، وبيحطها في context مع [[setActive]] و [[baseId]]. كل جزء بيقرا بـ [[useTabs()]]، اللي بيرمي error لو اتنده برا [[<Tabs>]]، فأي حد يستخدم [[<Tabs.Tab>]] لوحده يعرف فورًا.

[[Tabs.List = ...]] بيحط الأجزاء كخصائص على الدالة، فالـ import واحد والكتابة [[Tabs.Tab]] بتوضّح إنهم عيلة. shadcn بيصدّرهم أسماء منفصلة ([[TabsList]] و [[TabsTrigger]])، والاتنين نفس الفكرة. وخد بالك: في Next.js، الخصائص على الدالة ممكن تعمل مشكلة لو استخدمتها من Server Component، والأسماء المنفصلة أأمن.

[[useId()]] بيطلّع id فريد وثابت (ونفسه على السيرفر والمتصفح)، فتقدر تربط التاب بالـ panel بـ [[aria-controls]] و [[aria-labelledby]] من غير ما المستخدم يدّيك ids، ولو فيه اتنين Tabs في نفس الصفحة ميتلخبطوش.

الـ roles ([[tablist]] و [[tab]] و [[tabpanel]]) و [[aria-selected]] بيخلوا قارئ الشاشة يقول «tab 2 of 3, selected». و ARIA بيتوقع إن الأسهم تتنقل بين التابات، والـ Tab key يروح للـ panel. ده بالظبط الشغل اللي Radix بيعمله جاهز، وعشان كده في مشروع حقيقي غالبًا هتستخدم Radix أو shadcn بدل ما تكتبه بإيدك.

ولو عايز الأب يتحكم في التاب المختار (يحطه في الـ URL مثلًا)، الـ Tabs محتاج [[value]] و [[onValueChange]] كمان، ودي الدرس الجاي.`,
            when: R`أي widget مكوّن من أجزاء بتتكلم مع بعض: Tabs، و Accordion، و Select، و Menu، و Dialog (Trigger و Content)، و Stepper. ولو بتبني design system لفريق.`,
            mistakes: R`[[React.Children.map]] و [[cloneElement]] عشان تحقن [[isActive]] في كل ابن: بيبوظ أول ما حد يلف التاب في div أو component تاني. و context من غير الـ throw، فاستخدام غلط بيطلع null صامت. و ids ثابتة مكتوبة بإيد ([[id="tab-1"]])، فاتنين Tabs في الصفحة بيتخانقوا. و div بـ onClick بدل button مع role. وتعيد كتابة Tabs كاملة accessible بإيدك في مشروع شغل بدل Radix.`
          },
          lines: [
            "context و useId للـ ids، والـ state.",
            "اللي الأجزاء محتاجة تعرفه: مين active، وإزاي تغيّره، وبادئة الـ ids.",
            "القناة المشتركة.",
            "hook داخلي للأجزاء.",
            "اقرا.",
            "برا Tabs؟ error واضح.",
            "رجّع.",
            "قفلة.",
            "الأب: صاحب الـ state.",
            "التاب المختار، بيبدأ من defaultValue.",
            "حط كل حاجة في الـ context، و useId بيدّي بادئة فريدة.",
            "قفلة.",
            "الجزء اللي بيلم التابات، بـ role tablist.",
            "بيرسم أولاده.",
            "قفلة.",
            "التاب الواحد.",
            "بيقرا من الـ context.",
            "زرار بـ role tab، و id، ومختار ولا لأ، وبيشاور على الـ panel، والضغطة بتغيّر.",
            "قفلة.",
            "المحتوى.",
            "بيقرا.",
            "مش المختار؟ متترسمش.",
            "المحتوى، ومربوط بالتاب بتاعه.",
            "قفلة."
          ],
          sol: R`[[getByRole('tab', { name: 'Returns 3' })]] بيلاقي التاب لأن اسمه محسوب من كل النص جواه (الكلمة والـ badge). بعد الضغطة، [[getByRole('tabpanel')]] فيه محتوى returns، و [[aria-selected]] بقت true عليه و false على الأول.

الأسهم: [[onKeyDown]] على الـ tablist بيدوّر على كل [[button[role=tab]]] جواه، ويعرف مين عليه الـ focus، ويعمل [[focus()]] و [[click()]] على اللي بعده (ولو آخر واحد يرجع للأول). وفي RTL الـ ArrowRight المفروض يروح للي قبله، وده من الحاجات اللي Radix بيعملها لوحده بـ [[dir]].`,
          solCode: R`Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const tabs = [...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement)
    const step = e.key === 'ArrowRight' ? 1 : -1
    const next = tabs[(i + step + tabs.length) % tabs.length]
    next.focus()
    next.click()
  }
  return <div role="tablist" onKeyDown={onKeyDown}>{children}</div>
}

it('switches panels', async () => {
  const user = userEvent.setup()
  render(<Tabs defaultValue="orders"><Tabs.List><Tabs.Tab value="orders">Orders</Tabs.Tab><Tabs.Tab value="returns">Returns <span>3</span></Tabs.Tab></Tabs.List><Tabs.Panel value="orders">O</Tabs.Panel><Tabs.Panel value="returns">R</Tabs.Panel></Tabs>)
  await user.click(screen.getByRole('tab', { name: 'Returns 3' }))
  expect(screen.getByRole('tabpanel')).toHaveTextContent('R')
})`
        },
        {
          cmd: "controlled ولا uncontrolled API",
          title: "component بتاعك يشتغل بـ value و onChange، أو defaultValue لوحده",
          desc: R`[[<input>]] العادي بيشتغل بطريقتين: [[defaultValue]] (هو بيمسك القيمة) أو [[value]] مع [[onChange]] (الأب بيمسكها). الـ components الكويسة بتعمل نفس الحاجة: [[<Toggle defaultChecked />]] لو الأب مش فارق معاه، و [[<Toggle checked={on} onCheckedChange={setOn} />]] لو الأب محتاج القيمة أو عايز يتحكم فيها.

القاعدة: لو [[value]] جت (مش undefined)، الـ component controlled وبيعرضها وبس، وأي تغيير بيروح لـ onChange والأب يقرر. لو مجتش، بيستخدم state داخلية بتبدأ من defaultValue. وده بيتكتب مرة واحدة في hook اسمه عادة [[useControllableState]].`,
          example: R`import { useState } from 'react'

export function useControllableState<T>({ value, defaultValue, onChange }: { value?: T; defaultValue: T; onChange?: (v: T) => void }) {
  const [inner, setInner] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : inner
  function setValue(next: T) {
    if (!isControlled) setInner(next)
    onChange?.(next)
  }
  return [current, setValue] as const
}
type ToggleProps = { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void; label: string }
export function Toggle({ checked, defaultChecked = false, onCheckedChange, label }: ToggleProps) {
  const [on, setOn] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange })
  return <button role="switch" aria-checked={on} onClick={() => setOn(!on)}>{label}</button>
}
// <Toggle label="Wi-Fi" defaultChecked />                        uncontrolled
// <Toggle label="Wi-Fi" checked={wifi} onCheckedChange={setWifi} />  controlled
// <Toggle label="Locked" checked={false} />                       الأب رافض أي تغيير`,
          try: R`استخدم Toggle بالتلات أشكال في صفحة واحدة، ودوس على كل واحد. بعدين اعمل الـ [[Tabs]] من الدرس اللي فات يقبل [[value]] و [[onValueChange]] بنفس الـ hook، وخلي الأب يحط التاب في state ويعرضه. وأخيرًا اعمل Toggle بيبدأ [[checked={undefined}]] وبعدين يبقى true، وشوف إيه اللي بيحصل.`,
          flag: "script",
          deep: {
            why: R`component بيمسك الـ state بتاعته بس مش هيعرف الأب يتحكم فيه (يفتح الـ accordion من زرار برا، أو يحفظ التاب في الـ URL). و component controlled بس بيجبر كل مستخدم يكتب [[useState]] حتى لو مش محتاجها. الاتنين مع بعض هو الـ API اللي Radix و shadcn و MUI بيستخدموه، وبيسألوا عليه في انترفيوهات الـ frontend.`,
            how: R`[[isControlled]] بيتحسب كل render: [[value !== undefined]]. controlled: الـ component بيعرض [[value]] ومبيلمسش state داخلية، و [[setValue]] بينادي [[onChange]] بس. لو الأب محدّثش الـ state (زي «Locked»)، القيمة مبتتغيرش، زي [[<input value="x">]] من غير onChange بالظبط. uncontrolled: بيحدّث [[inner]] وبينادي onChange لو موجودة (عشان الأب يعرف من غير ما يتحكم).

التسمية المتعارف عليها: [[value]] و [[defaultValue]] و [[onValueChange]]، أو [[checked]] و [[defaultChecked]] و [[onCheckedChange]]، أو [[open]] و [[defaultOpen]] و [[onOpenChange]]. الـ [[onXChange]] بتاخد القيمة الجديدة نفسها مش event.

التحويل من uncontrolled لـ controlled وهو شغال (value كانت undefined وبقت قيمة) مشكلة: الـ state الداخلية كانت ماشية لوحدها وفجأة اتجاهلت. React بتحذّر في [[<input>]] من ده، والمكتبات بتطبع warning زيه. القرار بيتاخد مرة في أول render: الأب يبعت [[value]] دايمًا (حتى لو [[false]] أو [['']]) أو ميبعتهاش أبدًا.

و [[defaultValue]] بيتقري مرة واحدة: لو غيّرته بعدين مش هيحصل حاجة، زي [[useState(initial)]]. عشان تعمل reset لقيمة جديدة، غيّر الـ [[key]].`,
            when: R`أي component قابل لإعادة الاستخدام بيمسك قيمة: inputs مخصوصة، و toggles، و tabs، و accordions، و dialogs (open)، و selects، و date pickers. في component بتستخدمه مرة في صفحة واحدة، مش محتاج الاتنين.`,
            mistakes: R`[[value ?? inner]] بدل [[value !== undefined]]: [[null]] من الأب بتتعامل كـ «مش controlled». و component بينسخ [[value]] في state داخلية ([[useState(value)]]) ويحاول يزامنها بـ effect: القيمتين بيختلفوا. و [[onChange]] مبيتناداش في الـ uncontrolled mode، فالأب ميعرفش. و [[value={user?.name}]] بتبدأ undefined وبعدين نص، فالـ component بيتحوّل من uncontrolled لـ controlled. وسؤال انترفيو: «صمم API لـ Accordion» والإجابة الكويسة فيها compound components مع open و defaultOpen و onOpenChange.`
          },
          lines: [
            "useState للوضع الـ uncontrolled.",
            "hook عام: بياخد value و defaultValue و onChange.",
            "state داخلية بتبدأ من defaultValue.",
            "الأب بعت value؟ يبقى controlled.",
            "القيمة المعروضة: بتاعة الأب، أو الداخلية.",
            "دالة التغيير:",
            "uncontrolled بس: حدّث الداخلية.",
            "وفي الحالتين بلّغ الأب لو عايز يعرف.",
            "قفلة.",
            "نفس شكل useState.",
            "قفلة الـ hook.",
            "الـ props بالتسمية المتعارف عليها.",
            "الـ component.",
            "كل المنطق في سطر.",
            "switch accessible، والضغطة بتقلب.",
            "قفلة."
          ],
          sol: R`الـ uncontrolled بيتقلب لوحده. الـ controlled بيتقلب لأن الأب بيحدّث [[wifi]]، ولو حطيت [[console.log(wifi)]] في الأب هتشوفه بيتغير. الـ Locked مبيتقلبش أبدًا: الضغطة بتنادي onCheckedChange (مش موجودة) والقيمة جاية من الأب ثابتة false. (ده متجرّب في اختبار بـ user-event.)

Tabs controlled: [[const [value, setValue] = useControllableState({ value: props.value, defaultValue: props.defaultValue ?? '', onChange: props.onValueChange })]] وبعدين تحط [[value]] و [[setValue]] في الـ context بدل الـ useState.

التحويل من undefined لـ true: أول render كان uncontrolled، ولو المستخدم داس القيمة الداخلية اتغيرت، وبعدين الأب بعت true فالـ component بقى يعرض true ويتجاهل الداخلية. مفيش crash، بس السلوك مربك، وده سبب الـ warning في المكتبات.`,
          solCode: R`export function Tabs({ value, defaultValue = '', onValueChange, children }: {
  value?: string; defaultValue?: string; onValueChange?: (v: string) => void; children: ReactNode
}) {
  const [active, setActive] = useControllableState({ value, defaultValue, onChange: onValueChange })
  return <Ctx value={{ active, setActive, baseId: useId() }}><div>{children}</div></Ctx>
}
// الأب:
function OrdersPage() {
  const [tab, setTab] = useState('orders')
  return <Tabs value={tab} onValueChange={setTab}>...</Tabs>
}`
        },
        {
          cmd: "ref كـ prop",
          title: "الأب يوصل لـ input جوه component بتاعك، أو لدوال بتعرّفها انت",
          desc: R`في React 19 الـ [[ref]] بقى prop عادي في الـ function components: [[function TextField({ ref, ...props })]] وتحطه على الـ [[<input>]]، والأب يكتب [[<TextField ref={inputRef} />]]. [[forwardRef]] مبقاش محتاج (لسه شغال في الكود القديم، وهيتشال في نسخة جاية).

ولو عايز الأب ياخد دوال مش العنصر نفسه ([[play()]] و [[pause()]] بدل الـ [[<video>]] كله)، [[useImperativeHandle(ref, () => ({ play, pause }))]] بيحدد إيه اللي يوصل للأب.`,
          example: R`import { useImperativeHandle, useRef, type Ref, type ComponentProps } from 'react'

export function TextField({ label, ref, ...props }: { label: string; ref?: Ref<HTMLInputElement> } & ComponentProps<'input'>) {
  return <label>{label} <input ref={ref} {...props} /></label>
}
export function SearchPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  return <><TextField label="Search" ref={inputRef} /><button onClick={() => inputRef.current?.focus()}>Focus search</button></>
}
export type VideoHandle = { play: () => void; pause: () => void }
export function Video({ src, ref }: { src: string; ref?: Ref<VideoHandle> }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useImperativeHandle(ref, () => ({
    play: () => { void videoRef.current?.play() },
    pause: () => videoRef.current?.pause(),
  }), [])
  return <video ref={videoRef} src={src} />
}
// القديم (React 18): const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => ...)`,
          try: R`اعمل TextField و SearchPage ودوس الزرار: الـ focus يروح للخانة. بعدين استخدمه مع react-hook-form: [[<TextField label="Email" {...register('email')} />]]، وابعت الفورم فاضي: RHF بيعمل focus على أول خانة غلط، وده شغال بس لأن الـ ref وصل للـ input. شيل [[ref={ref}]] من الـ input وجرّب تاني.`,
          flag: "script",
          deep: {
            why: R`الـ components المخصوصة (TextField و Select و Button في design system) لازم تتصرف زي العناصر العادية: RHF بيسجّل الخانة بالـ ref، والـ modal بيعمل focus على أول خانة، والـ tooltip محتاج يقيس الزرار. لو الـ component بلع الـ ref، كل ده بيبوظ. وأحيانًا مش عايز تدّي الأب العنصر كله (يقدر يغيّر أي حاجة فيه)، فبتدّيله API صغير.`,
            how: R`قبل React 19، [[ref]] و [[key]] كانوا props خاصة: React بتشيلهم قبل ما توصل للـ component، فكان لازم [[forwardRef((props, ref) => ...)]] عشان تستلمه كـ argument تاني. في React 19 الـ ref بيوصل مع الـ props عادي (الـ key لسه خاص). و TypeScript: [[Ref<HTMLInputElement>]]، و [[ComponentProps<'input'>]] بيجيب كل props الـ input (بما فيها ref) عشان الـ spread.

لما الأب يبعت [[useRef]] object، React بتحط العنصر في [[current]] بعد الـ commit وترجّعه null لما يتشال. ولو بعت دالة (callback ref)، React بتناديها بالعنصر، وفي React 19 الدالة دي ممكن ترجّع cleanup بيتنادى لما العنصر يتشال.

[[useImperativeHandle(ref, create, deps)]] بيحط اللي [[create()]] رجّعه في ref الأب بدل العنصر. الـ deps زي useMemo: [[[]]] هنا لأن الدوال بتقرا [[videoRef.current]] وقت النداء. و [[void]] قبل [[play()]] عشان play بترجّع promise (ممكن تترفض لو المتصفح منع التشغيل التلقائي) ومش عايزين linter يشتكي.

الـ imperative handle استثناء: أغلب الحاجات تتعمل بـ props ([[<Video playing={true}>]] مع effect جوه). استخدمه للحاجات اللي هي «أفعال» مش «حالة»: focus، و scrollIntoView، و play مرة، و reset لفورم.`,
            when: R`أي component بيلف عنصر HTML في design system (Input و Button و Textarea) لازم يمرر الـ ref. و useImperativeHandle لـ widgets فيها أفعال: player، ومحرر نصوص (insertText)، و canvas (clear)، و list (scrollToIndex).`,
            mistakes: R`component بيلف input وميمررش الـ ref، فـ RHF ميعرفش يعمل focus ولا يقرا القيمة. و [[forwardRef]] في كود React 19 جديد (شغال بس ملوش لازمة). و useImperativeHandle لكل حاجة بدل props، فالـ component بقى API أوامر صعب يتفهم. وتقرا [[ref.current]] وقت render الأب وتلاقيه null. وتبعت [[ref]] لـ function component في React 18 من غير forwardRef، فبيبقى null مع warning.`
          },
          lines: [
            "useImperativeHandle و useRef، والأنواع.",
            "ref جاي كـ prop عادي، وباقي props الـ input.",
            "حطه على العنصر الحقيقي.",
            "قفلة.",
            "الأب.",
            "ref هيمسك الـ input اللي جوه TextField.",
            "بيبعته زي أي prop، والزرار بيعمل focus.",
            "قفلة.",
            "الـ API اللي الأب هياخده بدل العنصر.",
            "component بيدّي أفعال مش العنصر.",
            "ref داخلي للـ video الحقيقي.",
            "اللي هيوصل للأب:",
            "play، و void لأنها بترجّع promise.",
            "pause.",
            "مرة واحدة.",
            "الـ video.",
            "قفلة."
          ],
          sol: R`الزرار بيحط الـ focus في الخانة ([[toHaveFocus]] في اختبار). مع RHF والفورم فاضي والخانة required في الـ schema، أول خانة غلط بياخدها الـ focus لوحدها. من غير [[ref={ref}]] على الـ input: الـ focus مش بيحصل، والأسوأ إن RHF مش بيقرا القيمة من الخانة خالص، فالـ validation بيقول إنها فاضية حتى لو كتبت فيها.

والـ Video: [[ref.current]] في الأب فيه [[play]] و [[pause]] بس، مش الـ [[<video>]]، فالأب مش هيقدر يغيّر [[src]] مثلًا من برا.`,
          solCode: R`function SignupForm() {
  const { register, handleSubmit } = useForm<{ email: string }>({ resolver: zodResolver(z.object({ email: z.email() })) })
  return (
    <form onSubmit={handleSubmit(console.log)} noValidate>
      <TextField label="Email" {...register('email')} />
      <button>Send</button>
    </form>
  )
}

function Player() {
  const ref = useRef<VideoHandle>(null)
  return <><Video src="/intro.mp4" ref={ref} /><button onClick={() => ref.current?.play()}>Play</button></>
}`
        },
        {
          cmd: "URL state",
          title: "الفلاتر والصفحة والترتيب في الـ URL مش في useState",
          desc: R`الـ state اللي المستخدم ممكن يحب يشاركها أو يرجعلها (البحث، والفلتر، والترتيب، ورقم الصفحة، والتاب المفتوح) مكانها الـ URL: [[/products?q=mug&sort=price-asc&page=2]]. كده الـ refresh مبيضيعهاش، والرابط بيتبعت لحد فيفتح نفس النتيجة، والـ Back بيرجع للفلتر اللي قبله.

في React Router [[useSearchParams()]] بيدّيك [[params]] (URLSearchParams) و [[setParams]]. الـ URL هو مصدر الحقيقة، وكل حاجة بتتحسب منه وقت الرسم.`,
          example: R`import { useSearchParams } from 'react-router'

const SORTS = ['newest', 'price-asc', 'price-desc'] as const
type Sort = (typeof SORTS)[number]
export function useProductFilters() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('page')) || 1)
  const sortParam = params.get('sort')
  const sort: Sort = SORTS.includes(sortParam as Sort) ? (sortParam as Sort) : 'newest'
  function update(patch: Record<string, string | number | null>) {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      for (const [k, v] of Object.entries(patch)) {
        if (v === null || v === '') next.delete(k)
        else next.set(k, String(v))
      }
      if (!('page' in patch)) next.delete('page')
      return next
    }, { replace: 'q' in patch })
  }
  return { q, page, sort, update }
}
// const { q, page, sort, update } = useProductFilters()
// useQuery({ queryKey: ['products', { q, page, sort }], ... })
// <input value={q} onChange={e => update({ q: e.target.value })} />`,
          try: R`اعمل صفحة فيها خانة بحث و select للترتيب وزرار «الصفحة الجاية» بالـ hook ده، واعرض [[{ q, page, sort }]]. جرّب: اختار ترتيب، وروح صفحة ٣، واعمل refresh، وانسخ الـ URL في تاب جديد، ودوس Back. وافتح [[?page=-5&sort=hack]] بإيدك. وبعدين اكتب كلمة من ٥ حروف ودوس Back: رجعت فين؟`,
          flag: "script",
          deep: {
            why: R`فلتر في [[useState]] بيضيع مع أي refresh، والمستخدم بيبعت لزميله رابط «شوف الطلبات دي» فيفتح صفحة فاضية، والـ Back بيطلّعه من الصفحة كلها بدل ما يرجّع الفلتر. ولو الفلتر في state وفي الـ URL الاتنين، هيختلفوا. الـ URL كمصدر حقيقة واحد بيحل ده، وبيخلي الصفحة قابلة للـ bookmark والـ SEO.`,
            how: R`[[params.get('page')]] بترجّع string أو null، فكل قيمة لازم تتحول وتتحقق: [[Number()]] لرقم مع حد أدنى، و list مسموحة للـ sort. أي حد يقدر يكتب أي حاجة في الـ URL، فمتثقش فيه (ولو القيم كتير، zod schema للـ search params بتعمل ده في سطر).

[[setParams(prev => next)]] بياخد دالة زي setState، فبتبني على الـ params الحالية وتغيّر اللي عايزه بس بدل ما تمسح الباقي. و [[setParams]] بيعمل navigation: الـ URL بيتغير و React Router بيعيد رسم كل اللي بيقرا الـ params.

قرارين مهمين: أي فلتر جديد بيرجّع الصفحة لـ 1 (وإلا تبقى في صفحة ٥ من نتايج بقى فيها صفحتين). و [[replace: true]] للكتابة في خانة البحث، عشان كل حرف ميعملش entry في الـ history والـ Back يرجع حرف حرف، بينما تغيير الترتيب أو الصفحة push عادي فالـ Back يرجّعه.

القيم الافتراضية مش بتتكتب في الـ URL ([[next.delete]] لما القيمة فاضية)، فالـ URL يفضل نضيف. والـ key بتاع React Query فيه نفس القيم، فكل تركيبة فلاتر ليها كاش، والـ Back بيرجّع النتيجة فورًا.

في Next.js نفس الفكرة: [[searchParams]] prop في الصفحة (Server Component) أو [[useSearchParams]] من [[next/navigation]] في client component و [[router.replace]] (تاب Next.js، درس searchParams). ومكتبة [[nuqs]] بتعمل ده بأنواع وparsers جاهزة في الاتنين.`,
            when: R`أي حاجة بتغيّر «إيه اللي معروض» والمستخدم ممكن يشاركه: بحث، وفلاتر، وترتيب، و pagination، والتاب المفتوح، والـ item المختار في master/detail. ومش لحاجات مؤقتة (dropdown مفتوح، أو hover، أو نص فورم لسه بيتكتب).`,
            mistakes: R`نسخ الـ params في [[useState]] ومزامنتها بـ effect. و [[setParams({ sort })]] بـ object فبيمسح q و page. ومفيش validation فـ [[?page=abc]] بتبعت [[NaN]] للـ API. وكل حرف في البحث بيعمل push فالـ Back بقى مستحيل. ومبترجعش لصفحة 1 مع فلتر جديد. وتحط بيانات كبيرة أو حساسة في الـ URL (بتتسجل في logs السيرفر والـ history).`
          },
          lines: [
            "hook الـ query string.",
            "القيم المسموحة للترتيب.",
            "النوع منها.",
            "hook واحد لكل فلاتر الصفحة.",
            "الـ params الحالية وأداة التغيير.",
            "البحث، ولو مش موجود نص فاضي.",
            "الصفحة: رقم صحيح ١ أو أكتر، وأي حاجة غريبة تبقى ١.",
            "الترتيب كنص.",
            "لو مش من القيم المسموحة، الافتراضي.",
            "دالة تغيير أي مجموعة قيم:",
            "على الـ params الحالية:",
            "نسخة جديدة.",
            "لكل قيمة:",
            "فاضية؟ اشيلها من الـ URL.",
            "غير كده حطها.",
            "قفلة.",
            "أي فلتر غير الصفحة نفسها يرجّع لأول صفحة.",
            "رجّع الـ params الجديدة.",
            "البحث replace عشان الـ history، والباقي push.",
            "قفلة update.",
            "رجّع القيم والدالة.",
            "قفلة."
          ],
          sol: R`بعد اختيار الترتيب والصفحة ٣: الـ URL [[?sort=price-asc&page=3]]، والـ refresh والتاب الجديد بيفتحوا نفس الحالة. Back بيرجّعك لصفحة ٢ أو للترتيب اللي قبله. [[?page=-5&sort=hack]] بيعرض [[{"q":"","page":1,"sort":"newest"}]] من غير crash (متجرّب في اختبار بـ MemoryRouter).

كتابة كلمة من ٥ حروف بتعمل entry واحد تقريبًا في الـ history (كل حرف replace)، فالـ Back بيرجعك لقبل ما تبدأ تكتب مش حرف حرف. وأي حرف في البحث بيشيل [[page]] من الـ URL.

لو الـ Back بيرجع حرف حرف، الـ [[replace]] ناقص. ولو اختيار الترتيب مسح البحث، انت بتبعت object بدل ما تبني على [[prev]].`,
          solCode: R`export function Filters() {
  const { q, page, sort, update } = useProductFilters()
  return (
    <>
      <input aria-label="Search" value={q} onChange={e => update({ q: e.target.value })} />
      <select aria-label="Sort" value={sort} onChange={e => update({ sort: e.target.value })}>
        {SORTS.map(s => <option key={s}>{s}</option>)}
      </select>
      <button onClick={() => update({ page: page + 1 })}>Next page</button>
      <output>{JSON.stringify({ q, page, sort })}</output>
    </>
  )
}`
        },
        {
          cmd: "dangerouslySetInnerHTML",
          title: "اعرض HTML جاي من CMS أو محرر نصوص من غير ما تفتح ثغرة XSS",
          desc: R`React بتعمل escape لأي نص، فـ [[{article.body}]] لو فيه [[<h2>]] هيظهر كنص حرفيًا. لو المحتوى HTML فعلًا (من CMS، أو محرر زي TipTap، أو Markdown اتحوّل)، [[dangerouslySetInnerHTML={{ __html: html }}]] بيحطه في الـ DOM كما هو. والاسم مقصود: أي [[<script>]] أو [[onerror]] أو [[javascript:]] جوه الـ HTML ده هيشتغل على موقعك.

القاعدة: عمرك ما تحط HTML مش انت كاتبه من غير تنضيف. [[DOMPurify.sanitize(html)]] بيشيل أي حاجة ممكن تشغّل كود ويسيب التنسيق.`,
          example: R`import DOMPurify from 'dompurify'
import { useMemo } from 'react'

export function ArticleBody({ html }: { html: string }) {
  const clean = useMemo(() => DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form'] }), [html])
  return <div className="prose" dangerouslySetInnerHTML={{ __html: clean }} />
}
// الدخل:  <h2>Hi</h2><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a>
// الناتج: <h2>Hi</h2><img src="x"><a>x</a>`,
          try: R`[[npm i dompurify]]، وارسم ArticleBody بالدخل اللي في التعليق مرة من غير sanitize ومرة بيه، وشوف في Elements الفرق (ومن غيره هيطلع alert). بعدين خلي كل الروابط تفتح في تاب جديد بأمان: [[DOMPurify.addHook('afterSanitizeAttributes', ...)]] يحط [[target="_blank"]] و [[rel="noopener noreferrer"]] على أي [[<a>]].`,
          flag: "script",
          deep: {
            why: R`المحتوى الغني جاي من حتت كتير: مقالات من CMS، ووصف منتج كتبه تاجر في لوحة أدمن، وتعليقات فيها تنسيق، وإيميلات بتتعرض في التطبيق. لو أي حد من دول قدر يحط [[<img onerror>]]، الكود بتاعه هيشتغل في متصفح كل زائر: يسرق الـ session، أو يغيّر الصفحة، أو يبعت طلبات باسم المستخدم (Stored XSS، تاب الأمان).`,
            how: R`[[dangerouslySetInnerHTML]] بيعمل [[element.innerHTML = __html]]. المتصفح مش بيشغّل [[<script>]] اللي بيتحط بـ innerHTML، بس بيشغّل event handlers ([[onerror]] و [[onload]]) وروابط [[javascript:]] لما حد يدوس، و [[<iframe srcdoc>]] وحاجات تانية كتير. عشان كده فلترة [[<script>]] بـ regex مش حماية.

DOMPurify بيعمل parse للـ HTML بـ DOM المتصفح نفسه، ويمشي على كل عنصر وخاصية ويشيل أي حاجة مش في الـ allowlist: الـ event handlers كلها، و [[javascript:]] في الروابط، و [[<script>]] و [[<iframe>]] و [[<object>]]. و [[USE_PROFILES: { html: true }]] بيسمح بـ HTML بس (من غير SVG و MathML)، و [[FORBID_TAGS]] بيقفل حاجات زيادة ([[<style>]] ممكن يغيّر شكل الصفحة كلها، و [[<form>]] ممكن يعمل phishing). الـ [[style]] كـ attribute بيعدّي افتراضيًا، فلو مش عايزه [[FORBID_ATTR: ['style']]].

الـ [[useMemo]] عشان الـ sanitize مش رخيص على HTML كبير، ومفيش داعي يتعاد مع كل render للأب.

DOMPurify محتاج DOM، ففي Next.js (Server Component أو SSR) استخدم [[isomorphic-dompurify]] (بيستخدم jsdom على السيرفر)، أو نضّف مرة واحدة وقت الحفظ وخزّن النسخة النضيفة. الأأمن الاتنين: وقت الحفظ ووقت العرض، لأن المحتوى القديم في الداتابيز ممكن يكون اتحفظ قبل ما تضيف الحماية.

والبدايل الأحسن لو تقدر: Markdown بمكتبة بتطلّع React elements (react-markdown، ومبتستخدمش innerHTML أصلًا)، أو المحرر يخزّن JSON (TipTap و Lexical) وانت ترسمه components.`,
            when: R`HTML جاي من CMS أو محرر نصوص أو API خارجي أو إيميلات. ولو HTML ثابت انت كاتبه في الكود، مفيش داعي لـ dangerouslySetInnerHTML أصلًا: اكتبه JSX.`,
            mistakes: R`[[dangerouslySetInnerHTML={{ __html: post.body }}]] من غير sanitize «عشان الأدمن بس اللي بيكتب»: حساب أدمن واحد اتسرق ويبقى كل زائر في خطر. و regex بيشيل [[<script>]] وتفتكر ده كفاية. و sanitize وقت الحفظ بس. وتحط [[<script>]] بتاع widget خارجي بـ dangerouslySetInnerHTML ومستغرب إنه مش شغال: innerHTML مبيشغّلش scripts، استخدم [[<script>]] بـ effect أو [[next/script]]. و CSP (Content-Security-Policy) غايب: ده خط الدفاع التاني لو حاجة عدّت (تاب الأمان). وسؤال انترفيو: «React بتحمي من XSS؟» أيوة للنصوص في JSX، ولأ في dangerouslySetInnerHTML و [[href]] بقيمة من المستخدم ([[javascript:]]) و [[ref.current.innerHTML]].`
          },
          lines: [
            "DOMPurify.",
            "useMemo.",
            "component بيعرض HTML جاي من برا.",
            "نضّفه: HTML بس، ومن غير style ولا form، ومرة لكل HTML جديد.",
            "حطه في الـ DOM بعد التنضيف بس.",
            "قفلة."
          ],
          sol: R`من غير sanitize: الـ alert بيطلع (من [[onerror]] بتاع الصورة، مش من الـ script اللي innerHTML مبيشغّلوش)، ودوسة على اللينك بتطلّع alert تالت. بالـ sanitize الـ Elements فيها بالظبط [[<h2>Hi</h2><img src="x"><a>x</a>]]: الـ onerror والـ script والـ javascript: اتشالوا، والـ h2 فضل (متجرّب في jsdom).

الـ hook بيتسجّل مرة واحدة برا الـ component، وبعدها كل الروابط في أي HTML متنضف فيها [[target="_blank"]] و [[rel="noopener noreferrer"]].`,
          solCode: R`import DOMPurify from 'dompurify'

DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

const dirty = '<h2>Hi</h2><img src=x onerror="alert(1)"><script>alert(2)</script><a href="javascript:alert(3)">x</a><a href="https://example.com">ok</a>'
console.log(DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } }))
// <h2>Hi</h2><img src="x"><a>x</a><a href="https://example.com" target="_blank" rel="noopener noreferrer">ok</a>`
        },
        {
          cmd: "form actions",
          title: "React 19: action على الفورم، و useActionState و useOptimistic من غير Next",
          desc: R`في React 19 تقدر تدّي [[<form action={fn}>]] دالة (حتى في Vite من غير سيرفر)، و React بتناديها بالـ [[FormData]] جوه transition، وبتعمل reset للفورم لما تخلص بنجاح. و [[useActionState(action, initial)]] بيدّيك الـ state اللي الـ action رجّعتها (أخطاء أو نتيجة) و [[isPending]]، و [[useFormStatus()]] في أي component جوه الفورم يعرف إنه بيتبعت.

و [[useOptimistic(value, reducer)]] بيعرض قيمة متفائلة وانت مستني الـ action، وبترجع للقيمة الحقيقية لوحدها لما الـ action تخلص، سواء نجحت أو فشلت. في Next.js نفس الـ hooks مع Server Actions (تاب Next.js، درس useActionState).`,
          example: R`import { useActionState, useOptimistic } from 'react'
import { useFormStatus } from 'react-dom'

type State = { error: string | null; saved: string | null; email: string }
function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
}
export function NewsletterForm({ subscribe }: { subscribe: (email: string) => Promise<void> }) {
  const [state, formAction, isPending] = useActionState(async (_prev: State, formData: FormData): Promise<State> => {
    const email = String(formData.get('email') ?? '').trim()
    if (!email.includes('@')) return { error: 'Enter a valid email', saved: null, email }
    try {
      await subscribe(email)
      return { error: null, saved: email, email: '' }
    } catch {
      return { error: 'Server error, try again', saved: null, email }
    }
  }, { error: null, saved: null, email: '' })
  return (
    <form action={formAction}>
      <input name="email" aria-label="Email" defaultValue={state.email} />
      <SubmitButton />
      {state.error && <p role="alert">{state.error}</p>}
      {state.saved && !isPending && <p role="status">Subscribed {state.saved}</p>}
    </form>
  )
}
export function LikeButton({ likes, onLike }: { likes: number; onLike: () => Promise<void> }) {
  const [optimisticLikes, addOptimistic] = useOptimistic(likes, (current, delta: number) => current + delta)
  async function likeAction() {
    addOptimistic(1)
    await onLike()
  }
  return <form action={likeAction}><button>♥ {optimisticLikes}</button></form>
}`,
          try: R`ارسم NewsletterForm بـ subscribe بتستنى ثانيتين. اكتب «bad» وابعت: الرسالة تظهر والنص يفضل في الخانة. امسح [[defaultValue={state.email}]] وكرّر: النص بيتمسح مع الخطأ. بعدين ارسم LikeButton جوه أب عنده [[likes]] في state، و onLike بتفشل مرة وتنجح مرة (وفي النجاح الأب يزوّد likes)، ودوس.`,
          flag: "script",
          deep: {
            why: R`الفورم العادي في React فيه كود بيتكرر: [[e.preventDefault()]]، و isSubmitting، و try/catch، و state للخطأ، و reset بعد النجاح، وزرار مقفول. الـ Actions بتعمل الدورة دي جاهزة، ومع Next.js نفس الفورم بيشتغل حتى قبل ما الـ JS يتحمّل. و useOptimistic بيدّيك الـ optimistic update من غير كاش ومن غير rollback بإيدك.`,
            how: R`[[action={fn}]] على [[<form>]]: React بتمنع الإرسال العادي وتنادي fn بـ [[FormData]] (كل خانة ليها name). وده بيحصل جوه transition، فالواجهة مبتهنّجش، وأي [[useFormStatus]] تحته بيقول [[pending: true]]. و [[useFormStatus]] بيقرا حالة الفورم الأب، فلازم يتنادى في component جوه [[<form>]] مش في الـ component اللي بيرسم الفورم نفسه.

[[useActionState(fn, initial)]] بيلف الـ action: fn بتاخد الـ state اللي فاتت والـ FormData، واللي بترجّعه بيبقى [[state]] الجديدة. الأخطاء المتوقعة (validation، وإيميل مستخدم) بترجع كقيمة مش throw: أي throw بيروح لأقرب ErrorBoundary. و [[isPending]] true طول ما شغالة، وطلبات ورا بعض بتتنفذ بالترتيب.

الـ reset: بعد ما الـ action تخلص، React بتعمل [[form.reset()]] للـ uncontrolled inputs، يعني كل خانة ترجع لـ defaultValue بتاعها. ده كويس بعد النجاح، ومزعج بعد الخطأ (المستخدم يكتب تاني من الأول). الحل في المثال: الـ state بترجّع الإيميل اللي اتكتب، و [[defaultValue={state.email}]]، فالـ reset بيرجّع الخانة لنفس النص في الخطأ، ولفاضي في النجاح (متجرّب).

[[useOptimistic(likes, reducer)]]: طول ما مفيش action شغالة، [[optimisticLikes]] = [[likes]]. جوه action، [[addOptimistic(1)]] بيعرض [[likes + 1]] فورًا. لما الـ action تخلص، React بترمي القيمة المتفائلة وترجع لـ [[likes]] الحقيقية: لو الأب زوّدها (نجاح) تفضل 11، لو لأ (فشل) ترجع 10 لوحدها. و addOptimistic لازم تتنادى جوه action أو transition، وإلا React بتطبع warning.

والفرق عن React Query: useOptimistic للحالات البسيطة اللي الـ state فيها في component واحد، و [[onMutate]] بتاع Query لما نفس البيانات معروضة في كذا مكان من الكاش.`,
            when: R`فورمات بسيطة لحد متوسطة في React 19 (اشتراك، وتعليق، وإعدادات)، وأي فورم في Next.js مع Server Actions. و useOptimistic لـ like و toggle وإضافة تعليق. ولفورم كبير بـ validation لحظي ورسايل لكل خانة، react-hook-form لسه أقوى (وممكن يتجمع مع actions).`,
            mistakes: R`[[useFormStatus]] في نفس الـ component اللي بيرسم الـ form فيرجّع دايمًا false. و throw للأخطاء المتوقعة فالصفحة تروح للـ ErrorBoundary بدل رسالة تحت الخانة. ونسيان الـ reset: المستخدم يفقد اللي كتبه بعد خطأ. و [[value]] (controlled) على الخانات مع actions، فالـ reset ملوش أثر والـ state متلخبطة. و [[addOptimistic]] برا action. و [[onSubmit]] و [[action]] الاتنين على نفس الفورم.`
          },
          lines: [
            "useActionState و useOptimistic من react.",
            "useFormStatus من react-dom.",
            "اللي الـ action بترجّعه: خطأ، أو نجاح، والإيميل اللي يرجع للخانة.",
            "زرار بيعرف حالة الفورم اللي هو جواه.",
            "الفورم الأب بيتبعت؟",
            "مقفول ونصه بيتغير.",
            "قفلة.",
            "الفورم.",
            "الـ state والـ action الملفوفة و isPending. الـ action بتاخد الـ state اللي فاتت والـ FormData:",
            "اقرا الخانة بالـ name.",
            "خطأ متوقع: رجّعه كقيمة، والإيميل عشان الخانة متتمسحش.",
            "حاول:",
            "الطلب.",
            "نجح: الإيميل فاضي، فالـ reset يفضّي الخانة.",
            "فشل الطلب:",
            "رسالة، والإيميل يفضل.",
            "قفلة الـ catch.",
            "القيمة الأولى.",
            "بداية الـ JSX.",
            "الـ action على الفورم، من غير onSubmit ولا preventDefault.",
            "uncontrolled، والـ reset بيرجّعها لـ state.email.",
            "الزرار اللي بيقرا useFormStatus.",
            "الخطأ.",
            "النجاح بعد ما الـ action تخلص.",
            "قفلة الفورم.",
            "قفلة القوس.",
            "قفلة.",
            "like متفائل.",
            "القيمة المعروضة: الحقيقية، أو الحقيقية + التعديلات المتفائلة وقت الـ action.",
            "الـ action:",
            "زوّد واحد على الشاشة فورًا.",
            "ابعت، ولما تخلص القيمة المتفائلة بتتشال لوحدها.",
            "قفلة.",
            "فورم فيه زرار بس، والـ action بتتنادى مع الضغطة.",
            "قفلة."
          ],
          sol: R`«bad»: رسالة «Enter a valid email» والنص «bad» فاضل في الخانة. إيميل سليم: الزرار «Saving...» ومقفول ثانيتين، وبعدين «Subscribed a@b.com» والخانة فاضية. من غير [[defaultValue={state.email}]]: الخطأ بيظهر والخانة بتتمسح، لأن React بتعمل reset بعد أي action خلصت.

LikeButton: الرقم بيبقى ♥ 11 فورًا. لو onLike فشلت (والأب مزوّدش)، بيرجع ♥ 10 لوحده لما الـ promise تخلص. لو نجحت والأب زوّد، بيفضل 11. (الاتنين متجرّبين في اختبار بـ user-event.)`,
          solCode: R`function LikeHost() {
  const [likes, setLikes] = useState(10)
  const attempt = useRef(0)
  async function onLike() {
    await new Promise(r => setTimeout(r, 1000))
    attempt.current++
    if (attempt.current % 2 === 1) return // فشل: مفيش تحديث
    setLikes(l => l + 1)
  }
  return <LikeButton likes={likes} onLike={onLike} />
}
<NewsletterForm subscribe={() => new Promise(r => setTimeout(r, 2000))} />`
        },
        {
          cmd: "render props و HOCs",
          title: "اقرا الـ patterns القديمة: render props و Higher-Order Components",
          desc: R`قبل الـ hooks (٢٠١٩)، كان فيه طريقتين لمشاركة منطق بين components: الـ render prop، component بياخد دالة وينادها بالبيانات ([[<MouseTracker render={pos => <Cursor {...pos} />} />]])، والـ HOC، دالة بتاخد component وترجّع component جديد ملفوف ([[export default withAuth(Dashboard)]]).

النهارده الاتنين بيتكتبوا custom hook: [[const pos = useMousePosition()]] و [[const { user } = useAuth()]]. بس هتلاقيهم كتير في الكود القديم وفي مكتبات لسه شغالة ([[connect()]] بتاع Redux القديم، و [[withRouter]] بتاع React Router 5، و [[<Formik>{({ values }) => ...}</Formik>]])، فلازم تعرف تقراهم وتحوّلهم.`,
          example: R`// render prop
function MouseTracker({ render }: { render: (pos: { x: number; y: number }) => ReactNode }) {
  const pos = useMousePosition()
  return <>{render(pos)}</>
}
// <MouseTracker render={({ x, y }) => <p>{x}, {y}</p>} />

// HOC
function withAuth<P extends object>(Component: ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, isLoading } = useAuth()
    if (isLoading) return <Spinner />
    if (!user) return <Navigate to="/login" replace />
    return <Component {...props} />
  }
}
// export default withAuth(Dashboard)

// النهارده: hook
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return pos
}`,
          try: R`خد الـ HOC ده وحوّله: بدل [[withAuth(Dashboard)]] استخدم [[RequireAuth]] (layout route من درس protected route) أو hook جوه Dashboard. وافتح React DevTools على component ملفوف في ٣ HOCs ([[withAuth(withTheme(withI18n(Page)))]]) وشوف شكل الشجرة.`,
          flag: "script",
          deep: {
            why: R`كود React عمره ٥ سنين أو أكتر مليان HOCs و render props، ولما تشتغل في شركة هتصلّح فيه أو تنقله. ولو مش فاهم إن [[withRouter(connect(mapState)(Component))]] ده component ملفوف مرتين، مش هتعرف منين الـ props جاية. وكمان الـ render prop لسه مستخدم في مكتبات حديثة لما الأب محتاج يرسم حاجة بالبيانات بتاعة الابن ([[<Controller render={({ field }) => ...}>]] في react-hook-form و [[table.Subscribe]] في TanStack).`,
            how: R`الـ render prop: الـ component صاحب المنطق مبيعرفش هيرسم إيه، فبينادي الدالة اللي جاتله بالبيانات ويرسم اللي رجع. نفس الفكرة لو الدالة جت كـ children: [[<Mouse>{pos => ...}</Mouse>]] (function as children). ومشكلتها التداخل: ٣ render props جوه بعض بيعملوا «pyramid» صعب يتقري.

الـ HOC: [[withAuth(Dashboard)]] بيرجّع component جديد بيعمل حاجة (auth check، أو بيحقن props زي [[user]]) وبعدين يرسم الأصلي. المشاكل: الـ props بتتحقن من غير ما تشوفها في الـ JSX (منين [[user]] جت؟)، وتعارض الأسماء لو اتنين HOCs حقنوا نفس الـ prop، والـ DevTools مليانة طبقات ([[WithAuth > WithTheme > Page]])، والـ types في TypeScript صعبة. والـ HOC لازم يتعمل مرة واحدة برا الـ render: [[withAuth(Page)]] جوه component بيعمل component جديد كل render فالـ state بتروح.

الـ hooks حلّت ده: المنطق في دالة، والقيم بتظهر صريحة في الـ component ([[const { user } = useAuth()]])، ومفيش طبقات. لكن الـ render prop لسه أنسب لما الـ component الأب محتاج يتحكم في «الرسم» في نقطة معينة (Controller في RHF، أو Virtualizer في بعض المكتبات)، و HOCs لسه بتتشاف في حاجات زي [[memo()]] نفسه (هو HOC) و [[observer()]] في MobX.`,
            when: R`تقرا وتعدّل كود قديم. ولما تكتب جديد: hooks دايمًا، و render prop بس لو الأب محتاج يدّي «فتحة رسم» بالبيانات بتاعته.`,
            mistakes: R`تعمل HOC جوه render. و HOC بينسى يمرر [[{...props}]] فالـ props بتضيع. وتكتب HOC جديد في ٢٠٢٦ لحاجة hook بيعملها. وتحوّل كود قديم كله مرة واحدة من غير اختبارات. وسؤال انترفيو: «HOC ولا hook؟» الـ hooks بتشارك منطق من غير ما تغيّر الشجرة ومن غير props مخفية، والـ HOC لسه مفيد لما عايز «تلف» component كامل من برا (memo مثلًا).`
          },
          lines: [
            "component بياخد دالة بترسم.",
            "المنطق عنده.",
            "بينادي الدالة بالبيانات ويرسم اللي رجع.",
            "قفلة.",
            "HOC: دالة بتاخد component.",
            "وترجّع component جديد بنفس الـ props.",
            "المنطق المشترك.",
            "تحميل.",
            "مش داخل.",
            "داخل: ارسم الأصلي بكل الـ props.",
            "قفلة.",
            "قفلة.",
            "نفس المنطق كـ hook.",
            "الموقع.",
            "effect يسمع للماوس:",
            "مع كل حركة حدّث.",
            "سجّل.",
            "والـ cleanup.",
            "مرة واحدة.",
            "رجّع القيمة.",
            "قفلة."
          ],
          sol: R`بعد التحويل: [[Dashboard]] بقى component عادي، والحماية في layout route ([[{ Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] }]]) أو [[const { user } = useAuth()]] جواه لو محتاج الـ user نفسه. [[export default withAuth(Dashboard)]] اتشالت.

في DevTools مع ٣ HOCs هتشوف ٣ طبقات فوق Page، كل واحدة بالاسم اللي انت ادّيته للدالة الداخلية (عشان كده [[function WithAuth]] بالاسم أحسن من arrow مجهولة، اللي بتظهر «Anonymous»).`,
          solCode: R`// قبل
export default withAuth(Dashboard)

// بعد: الحماية في الـ routes
const router = createBrowserRouter([
  { Component: RequireAuth, children: [{ path: 'dashboard', Component: Dashboard }] },
])
// ولو Dashboard محتاج المستخدم:
function Dashboard() {
  const { user } = useAuth()
  return <h1>Hi {user?.name}</h1>
}`
        }
      ]
    },
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
    // @@MORE@@
  ]
});

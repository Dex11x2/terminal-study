// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
    {
      t: "CSP والسكربتات الخارجية",
      l: 3,
      n: "CSP بـ nonce من proxy.ts، و next/script لسكربتات الطرف التالت، و analytics بعد موافقة الكوكيز",
      items: [
        {
          cmd: "CSP nonce",
          title: "CSP بـ nonce في proxy.ts: Report-Only الأول وبعدين تقفل",
          desc: R`Content-Security-Policy header بيقول للمتصفح «مفيش script يتنفذ غير اللي أنا سامح بيه». أقوى صيغة: [[script-src 'nonce-XYZ' 'strict-dynamic']]، والـ nonce قيمة عشوائية جديدة مع كل طلب. أي [[<script>]] من غير نفس الـ nonce مبيتنفذش، فحتى لو حد عرف يحقن [[<script>]] في الصفحة (XSS)، هيتقفل.

في Next: [[proxy.ts]] بيولّد الـ nonce، ويحط الـ CSP في الـ request headers (Next بيقراه من هناك) وفي الـ response. و Next بيطلّع الـ nonce من الـ header ويحطه لوحده على كل scripts الـ framework والـ bundles. وابدأ دايمًا بـ [[Content-Security-Policy-Report-Only]]: المتصفح بيبلّغ عن اللي كان هيتقفل من غير ما يقفله، ولما التقارير تنضف تغيّر اسم الـ header.`,
          example: R`// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    $__btscript-src 'self' 'nonce-$__{nonce}' 'strict-dynamic' https:$__{isDev ? " 'unsafe-eval'" : ""}$__bt,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://cdn.example.com",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "report-uri /api/csp-report",
  ].join("; ");
  const header = process.env.CSP_ENFORCE === "1" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(header, csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set(header, csp);
  return response;
}
export const config = {
  matcher: [{
    source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    missing: [{ type: "header", key: "next-router-prefetch" }, { type: "header", key: "purpose", value: "prefetch" }],
  }],
};`,
          try: R`حط الـ proxy ده، واعمل [[npm run build && npm start]]، وشوف [[curl -sI localhost:3000]]: فيه [[content-security-policy-report-only]]؟ اعمل View Source ودوّر على [[nonce=]]: مين عليه nonce؟ وبعدين حط في صفحة [[<script dangerouslySetInnerHTML={{ __html: "console.log('inline')" }} />]] وافتح الـ Console. وآخر حاجة: شغّل بـ [[CSP_ENFORCE=1]] وجرّب نفس الصفحة، وجرّب صفحة static (مفيهاش حاجة dynamic خالص).`,
          flag: "script",
          deep: {
            why: R`الـ CSP هو خط الدفاع التاني ضد XSS: تاب «الأمان» بيقول إن الـ escaping هو الأول، بس أي [[dangerouslySetInnerHTML]] أو مكتبة markdown فيها ثغرة أو سكربت طرف تالت مخترق كفاية. سياسة allowlist قديمة ([[script-src 'self' https://cdn.x.com]]) طلعت ضعيفة: أي JSONP أو ملف قديم على الدومين المسموح بيعدّيها. الـ nonce بيقلب الفكرة: مش «الدومينات دي مسموحة»، لكن «السكربتات اللي أنا حاطتها بإيدي في الطلب ده بس».`,
            how: R`الـ nonce لازم يبقى غير متوقع وجديد مع كل طلب، عشان كده في الـ proxy مش في [[next.config]]. Next وقت الـ SSR بيقرا [[Content-Security-Policy]] (أو [[-Report-Only]]) من الـ request headers، ويطلّع القيمة من [[script-src]] (أو [[default-src]])، ويحطها على scripts الـ framework والـ chunks والـ inline scripts بتاعته، وعلى أي [[<Script nonce>]]. و [[x-nonce]] عشان انت تقراه بـ [[headers()]] وتبعته لـ [[next/script]] أو [[GoogleAnalytics]].

[[strict-dynamic]]: أي script عليه nonce يقدر يحمّل scripts تانية (ده اللي بيعمله Next مع الـ chunks، و Google Tag Manager، و Stripe.js)، والمتصفح بيتجاهل الـ allowlists و [[self]] و [[https:]]. الاتنين دول موجودين بس fallback للمتصفحات القديمة اللي مبتفهمش strict-dynamic.

إيه اللي بيتكسر:
١- أي [[<script>]] inline من غير nonce: سكربت الـ dark mode اللي بيتحط في الـ layout، أو snippet الـ analytics المنسوخ. الحل: [[<Script nonce>]] أو تقرا [[x-nonce]] وتحطه على الـ tag.
٢- [[onclick="..."]] كـ HTML attribute و [[javascript:]] links (الـ onClick بتاع React مش مشكلة).
٣- سكربتات بتستخدم [[eval]] أو [[new Function]]، أو tag managers فيها «Custom HTML» بتحقن scripts من غير nonce.
٤- الطرف التالت محتاج أكتر من script-src: Stripe محتاج [[frame-src https://js.stripe.com https://hooks.stripe.com]] و [[connect-src https://api.stripe.com]]، و GA محتاج [[connect-src]] لدومينات google-analytics. التقارير هي اللي هتقولك.
٥- الـ style: [[style-src]] بـ nonce بيقفل [[style="..."]] attributes اللي بتطلع في الـ HTML (زي اللي next/image بيطلّعها مع fill)، والـ nonce مبيتطبقش على attributes. عشان كده [[unsafe-inline]] للـ style هو الحل العملي، وخطره أقل بكتير من الـ scripts.

التكلفة الكبيرة: الـ nonce بيتحط وقت الـ render، فكل الصفحات لازم dynamic. الصفحة الـ static اتعملت وقت الـ build من غير nonce، فأول ما تقفل، الـ scripts بتاعتها تتقفل والصفحة تبقى من غير تفاعل. وده معناه مفيش static ولا ISR ولا CDN caching للـ HTML، والوثائق بتقول صراحة إن Partial Prerendering (الـ static shell بتاع Cache Components) مش متوافق مع nonce. البديل لو محتاج static: CSP من غير nonce في [[headers()]] بتاع next.config، أو SRI التجريبي ([[experimental.sri]]).

وفي dev لازم [[unsafe-eval]] لأن React بيستخدم eval لرسايل الأخطاء، ومش محتاجه في الإنتاج.`,
            when: R`تطبيقات فيها بيانات حساسة (دفع، وحسابات، ولوحات أدمن) أو فيها محتوى من المستخدمين بيتعرض كـ HTML، أو compliance بيطلب CSP صارم. لموقع تسويقي static كله، CSP من next.config من غير nonce أنسب. وابدأ Report-Only أسبوع أو اتنين على الإنتاج قبل ما تقفل.`,
            mistakes: R`تقفل على طول من غير Report-Only فالـ checkout يقع يوم الإطلاق. وتحط الـ CSP على الـ response بس فـ Next ميعرفش الـ nonce ومفيش script عليه nonce. و nonce ثابت أو [[Math.random()]]. وتسيب صفحات static وتستغرب إنها بقت ميتة بعد ما قفلت. و [[unsafe-inline]] في [[script-src]] مع nonce (المتصفحات الحديثة بتتجاهله لما فيه nonce، بس ده معناه إنك مش فاهم السياسة). وتنسى [[frame-ancestors]] أو [[object-src 'none']]. وفي الانترفيو: «ليه nonce أحسن من allowlist؟» و «ليه الـ CSP مش بديل عن الـ escaping؟».`
          },
          teach: R`## الفكرة: رقم سري جديد مع كل طلب، وأي script من غيره ميشتغلش

الـ proxy بيعمل ٤ حاجات مع كل طلب: يولّد nonce (رقم عشوائي بيتستخدم مرة واحدة)، ويبني نص السياسة، ويحطها في الطلب (عشان Next يعرف الـ nonce ويحطه على scripts بتاعته)، ويحطها في الرد (عشان المتصفح ينفّذها). اتشغّل في Next 16.4 بـ [[next build]] و [[next start]] ومعاه الـ solCode (الـ route بتاع التقارير والـ layout)، والمتصفح Chrome headless.

---

## ١. الـ imports والدالة

~~~text src/proxy.ts
import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
~~~

- [[NextResponse]]: الأداة اللي بتعمل بيها رد من الـ proxy.
- [[type NextRequest]]: كلمة [[type]] معناها «ده نوع TypeScript بس، مش كود»، فبيتشال من الـ JavaScript النهائي.
- [[export function proxy]]: Next بيدوّر في [[proxy.ts]] على دالة اسمها [[proxy]] (أو export default). ومع [[src]] الملف مكانه [[src/proxy.ts]].

---

## ٢. الـ nonce

~~~text src/proxy.ts
const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
~~~

من جوه لبرة:

1. [[crypto.randomUUID()]]: UUID عشوائي (٣٦ حرف) من مولّد عشوائي آمن مبني في Node.
2. [[Buffer.from(...)]]: حوّل النص لـ bytes.
3. [[.toString("base64")]]: اكتب الـ bytes بـ base64 (حروف وأرقام و [[+]] و [[/]])، لأن الـ CSP عايز الـ nonce بالشكل ده.

جربناه في Node:

~~~text الناتج
MzM5OGViZmQtNDczNi00ZDlhLTkwYzktZDA5YmU0MmEzYTU4
(ولو فكّيته: 3398ebfd-4736-4d9a-90c9-d09be42a3a58)
~~~

### [[const isDev = process.env.NODE_ENV === "development";]]

[[next dev]] بيخلي [[NODE_ENV]] = development. هنحتاجه في سطر الـ scripts.

---

## ٣. السياسة نفسها: array وبعدين [[join]]

كل عنصر في الـ array اسمه **directive**: اسم نوع من الملفات وبعده المسموح بيه. و [[.join("; ")]] في الآخر بيلزقهم بـ [[; ]] بينهم، وده الشكل اللي الـ header محتاجه. الـ array مجرد طريقة مقروءة تكتب بيها سطر طويل.

| الـ directive | معناه هنا |
|---|---|
| [[default-src 'self']] | أي نوع مش مذكور تحت: من نفس الموقع بس. [['self']] بين علامات تنصيص مفردة لأنها كلمة محجوزة مش دومين |
| [[script-src ...]] | السطر الأهم، تحت |
| [[style-src 'self' 'unsafe-inline']] | الـ CSS من الموقع، ومسموح [[style="..."]] جوه الـ HTML |
| [[img-src 'self' blob: data: https://cdn.example.com]] | الصور: الموقع، و [[blob:]] و [[data:]] (صور معمولة في الصفحة نفسها)، والـ CDN |
| [[connect-src 'self']] | [[fetch]] و WebSocket لنفس الموقع بس |
| [[object-src 'none']] | ممنوع [[<object>]] و [[<embed>]] خالص |
| [[base-uri 'self']] | محدش يحقن [[<base>]] يغيّر معنى كل الـ URLs النسبية |
| [[form-action 'self']] | الفورمات تتبعت للموقع بس |
| [[frame-ancestors 'none']] | ممنوع أي موقع يحط صفحتك جوه iframe (clickjacking) |
| [[report-uri /api/csp-report]] | المخالفات تتبعت POST هنا |

### سطر الـ scripts

~~~text src/proxy.ts
$__btscript-src 'self' 'nonce-$__{nonce}' 'strict-dynamic' https:$__{isDev ? " 'unsafe-eval'" : ""}$__bt
~~~

ده template literal (بين علامتين [[$__bt]])، وجواه حتتين بتتبدل:

- [[$__{nonce}]]: القيمة اللي عملناها، فيبقى [['nonce-MzM5OGVi...']]. أي [[<script>]] عليه نفس القيمة مسموح.
- [['strict-dynamic']]: script مسموح يقدر يحمّل scripts تانية، وده اللي بيخلي chunks Next بتاعة بعدين تشتغل. والمتصفح اللي بيفهمها بيتجاهل [['self']] و [[https:]] اللي في نفس السطر، ودول موجودين بس للمتصفحات القديمة.
- [[$__{isDev ? " 'unsafe-eval'" : ""}]]: ternary. في dev ضيف [['unsafe-eval']] (React بيستخدم [[eval]] في رسايل الأخطاء)، وفي الإنتاج نص فاضي.

---

## ٤. Report-Only ولا تقفل؟

~~~text src/proxy.ts
const header = process.env.CSP_ENFORCE === "1" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";
~~~

نفس السياسة، اسمين للـ header:

- [[Content-Security-Policy-Report-Only]]: المتصفح **بيبلّغ** عن اللي كان هيتقفل ومبيقفلوش.
- [[Content-Security-Policy]]: بيقفل فعلًا.

ومتغير البيئة [[CSP_ENFORCE]] هو اللي بيختار، فتبدّل من غير ما تغيّر كود.

---

## ٥. الـ headers: في الطلب وفي الرد

~~~text src/proxy.ts
const requestHeaders = new Headers(request.headers);
requestHeaders.set("x-nonce", nonce);
requestHeaders.set(header, csp);
const response = NextResponse.next({ request: { headers: requestHeaders } });
response.headers.set(header, csp);
return response;
~~~

| السطر | ليه |
|---|---|
| [[new Headers(request.headers)]] | نسخة من headers الطلب نقدر نعدّل فيها |
| [[set("x-nonce", nonce)]] | header من عندنا عشان الـ layout يقرا الـ nonce بـ [[headers()]]. الـ [[x-]] عرف للـ headers الخاصة |
| [[set(header, csp)]] على الطلب | Next وهو بيرسم الصفحة بيقرا الـ CSP من **الطلب**، يطلّع منه الـ nonce، ويحطه على كل scripts بتاعته |
| [[NextResponse.next({ request: { headers } })]] | «كمّل للصفحة عادي، بس بالـ headers الجديدة دي» |
| [[response.headers.set(header, csp)]] | الـ CSP على **الرد**: ده اللي المتصفح بينفّذه |

---

## ٦. الـ matcher

~~~text src/proxy.ts
matcher: [{
  source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
  missing: [{ type: "header", key: "next-router-prefetch" }, { type: "header", key: "purpose", value: "prefetch" }],
}],
~~~

- [[source]]: كل المسارات ما عدا اللي بتبدأ بـ [[api]] والملفات الثابتة. [[(?!...)]] معناها «مش بيبدأ بـ».
- [[missing]]: شغّل الـ proxy بس لو الـ headers دي **مش** موجودة. يعني طلبات الـ prefetch (Next بيجيب صفحات قبل ما تدوس عليها) مش هتعدّي عليه، لأنها مش HTML بيتنفذ.

ونتيجة إن [[api]] مستثناة: طلب التقرير لـ [[/api/csp-report]] مبياخدش CSP، والجدول بيقول إن الـ route ده [[ƒ]] عادي.

---

## ٧. شغّلناه

### الـ header

~~~text الناتج (curl -sI)
content-security-policy-report-only: default-src 'self'; script-src 'self'
'nonce-YzdkMjRhMDYtNTk0Mi00MDJlLWEzODEtN2I4ZWM1MGU1MWMz' 'strict-dynamic' https:; style-src 'self' 'unsafe-inline'; ...
~~~

وطلب تاني طلّع nonce تاني خالص. [[-I]] في curl يعني «هات الـ headers بس».

### View Source

~~~text الناتج (مختصر)
<script src="/_next/static/chunks/3c4xol65z2da2.js" async="" nonce="ZDM0M2FiNjYtYjE0Yy00NWFj...">
<script src="/_next/static/chunks/turbopack-3-ry682tkyiqk.js" async="" nonce="ZDM0M2FiNjYtYjE0Yy00NWFj...">
<script>
<script nonce="ZDM0M2FiNjYtYjE0Yy00NWFj..." id="_R_">
<body data-nonce-ready="yes">
~~~

كل scripts Next عليها نفس الـ nonce، والوحيد اللي من غيره هو [[<script>]] بتاعنا اللي عملناه بـ [[dangerouslySetInnerHTML]]. و [[data-nonce-ready="yes"]] جاية من الـ layout في الـ solCode: لقى [[x-nonce]].

وفي الـ DOM نفسه، [[getAttribute("nonce")]] رجّع نص فاضي، بس الخاصية [[script.nonce]] فيها القيمة. المتصفح بيخبي الـ attribute عمدًا عشان script محقون ميقراهوش.

### Report-Only

~~~text الناتج (Chrome console)
Executing inline script violates the following Content Security Policy directive 'script-src ...'. Either the
'unsafe-inline' keyword, a hash ('sha256-UaOGrfnTUkOcfSx5zbfJdpt0OIURo3vZfzq63FFzVPM='), or a nonce ('nonce-...')
is required to enable inline execution. The policy is report-only, so the violation has been logged but no further
action has been taken.
inline
~~~

السكربت اشتغل (طبع [[inline]])، والمتصفح قال إنه كان هيتقفل. ومعاه طلب للتقرير، والـ route رد 204، وفي log السيرفر:

~~~text الناتج (log السيرفر)
[csp] application/csp-report {"csp-report":{"document-uri":"http://localhost:5835/inline","violated-directive":"script-src-elem",
"disposition":"report","blocked-uri":"inline","line-number":1, ...}}
~~~

[[disposition: report]] يعني «اتبلّغ بس». و [[blocked-uri: inline]] يعني المشكلة في script مكتوب جوه الصفحة مش ملف.

### [[CSP_ENFORCE=1]]

~~~text الناتج (Chrome console)
Executing inline script violates the following Content Security Policy directive ... The action has been blocked.
~~~

ومفيش [[inline]]: السكربت اتقفل. وزرار عداد في الصفحة الرئيسية اشتغل عادي (دوسنا مرتين، بقى 2)، لأن React و Next عليهم الـ nonce.

### صفحة static والقفل شغال

شلنا قراية [[headers()]] من الـ layout، فالـ build علّم الصفحات [[○]] بدل [[ƒ]]:

~~~text الناتج (next build)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/csp-report
└ ○ /inline
~~~

والـ HTML اتعمل وقت الـ build، فمفيش nonce على أي script. والنتيجة في Chrome:

~~~text الناتج
Loading the script 'http://localhost:5835/_next/static/chunks/3c4xol65z2da2.js' violates the following Content Security Policy directive ...
== / button after 2 clicks: 0
~~~

كل ملفات Next اتقفلت، والزرار ميت. عشان كده الـ layout في الـ solCode بيقرا [[x-nonce]]: قراية [[headers()]] بتخلي كل الصفحات [[ƒ]] فكل طلب ياخد HTML جديد بالـ nonce بتاعه.

> وخد بالك: create-next-app 16.4 بيعمل المشروع و [[cacheComponents: true]] في الـ config. جربنا الـ layout ده معاه، والـ build وقع: [[Route "/": Next.js encountered uncached or runtime data during prerendering.]] ومعاه إن [[headers()]] برا [[<Suspense>]]. يعني الـ nonce وطريقة Cache Components مش ماشيين مع بعض (والوثائق بتقول نفس الكلام عن Partial Prerendering).

---

## ٨. الـ solCode

- [[route.ts]] بـ [[export async function POST]]: Next بيناديها لطلبات POST على [[/api/csp-report]]. [[request.text()]] بيقرا الـ body كنص، و [[.slice(0, 2000)]] أول ٢٠٠٠ حرف بس عشان الـ log ميتملاش. و [[status: 204]] = «تمام، ومفيش رد».
- الـ layout: [[(await headers()).get("x-nonce")]] بيجيب الـ nonce، و [[?? undefined]] معناها «لو مفيش ([[null]])، خليه [[undefined]]»، لأن [[nonce]] prop بيقبل string أو undefined.

---

## الخلاصة

| الخطوة | السطر |
|---|---|
| nonce جديد كل طلب | [[Buffer.from(crypto.randomUUID()).toString("base64")]] |
| السياسة | array من directives و [[join("; ")]] |
| Next يحط الـ nonce على scripts بتاعته | الـ CSP في headers **الطلب** |
| المتصفح ينفّذ | الـ CSP في headers **الرد** |
| تبدأ آمن | [[-Report-Only]] الأول، و [[CSP_ENFORCE=1]] لما التقارير تنضف |
| متقفلش صفحات static | كل الصفحات لازم [[ƒ]] (قراية [[headers()]] في الـ root layout) |`,
          lines: [
            R`[[NextResponse]] للرد و [[NextRequest]] نوع الطلب.`,
            R`الـ proxy (في Next 15 كان [[middleware]]).`,
            R`nonce جديد مع كل طلب: UUID عشوائي من [[crypto]] ومحوّل base64.`,
            R`dev؟ React محتاج [[unsafe-eval]] هناك بس.`,
            "السياسة كـ array عشان تبقى مقروءة...",
            "أي نوع مش متحدد: من نفس الدومين بس.",
            R`الـ scripts: اللي عليها الـ nonce، والسكربتات اللي هي بتحمّلها ([[strict-dynamic]]). و [[self]] و [[https:]] للمتصفحات القديمة بس.`,
            R`الـ style: [[unsafe-inline]] عشان [[style=""]] attributes (الـ nonce مبيغطيهاش).`,
            "الصور: الموقع و blob و data و الـ CDN.",
            R`fetch و WebSocket لنفس الدومين. هتزود عليه دومينات الـ analytics و Stripe.`,
            R`مفيش [[<object>]] ولا [[<embed>]] خالص.`,
            R`يمنع [[<base>]] المحقون من تغيير كل الـ URLs النسبية.`,
            "الفورمات تتبعت لنفس الموقع بس.",
            "محدش يحط الموقع في iframe (clickjacking).",
            R`فين تتبعت التقارير (route handler بيعمل log). الأحدث [[report-to]] مع [[Reporting-Endpoints]].`,
            "...ونجمعها بـ ; .",
            R`Report-Only افتراضيًا، والقفل بمتغير بيئة لما التقارير تنضف.`,
            "نسخة من headers الطلب.",
            R`[[x-nonce]] عشان server components تقراه بـ [[headers()]].`,
            R`الـ CSP في الطلب نفسه: من هنا Next بيعرف الـ nonce ويحطه على scripts بتاعته.`,
            "كمّل بالـ headers الجديدة.",
            "والـ CSP في الرد: ده اللي المتصفح بينفّذه.",
            "رجّع.",
            "قفلة.",
            "الـ matcher.",
            "مصفوفة.",
            "كل الصفحات ما عدا الـ API والملفات الثابتة.",
            R`ومش على طلبات الـ prefetch: مش محتاجة CSP ولا nonce.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[curl -sI]] بيطلّع [[content-security-policy-report-only: default-src 'self'; script-src 'self' 'nonce-...' 'strict-dynamic' https:; ...]]، والـ nonce بيتغير مع كل طلب.

في View Source: كل [[<script src="/_next/static/chunks/...">]] و الـ inline scripts بتاعة Next عليهم [[nonce="..."]] (القيمة نفسها اللي في الـ header). الـ script اللي كتبته بـ [[dangerouslySetInnerHTML]] هو الوحيد اللي مفيش عليه nonce. (وفي DevTools > Elements ممكن تلاقي الـ nonce فاضي: المتصفحات بتخبي قيمته من الـ DOM عمدًا لما يكون فيه CSP، عشان سكربت محقون ميقراهاش. استخدم View Source.)

في Report-Only: الـ console بيطبع [[inline]] عادي، وجنبه رسالة [[Report Only]] إنه كان هيتقفل، وطلب POST لـ [[/api/csp-report]] (404 لو لسه معملتش الـ route، ومش مشكلة).

بـ [[CSP_ENFORCE=1]]: الـ [[inline]] مبيطبعش، والرسالة في Chrome بقت «Executing inline script violates the following Content Security Policy directive ... The action has been blocked.» (والقديمة كانت «Refused to execute inline script»). وباقي الصفحة شغالة لأن scripts Next عليها nonce. والصفحة الـ static: لو [[npm run build]] علّمها ○ (Static)، الـ HTML بتاعها اتعمل من غير nonce، فكل الـ scripts اتقفلت والزراير مبتعملش حاجة. الحل: [[await connection()]] أو قراية [[headers()]] في الـ root layout عشان كل الصفحات تبقى ƒ.

الغلط الشائع: تحط الـ header على الـ response بس، فمتلاقيش [[nonce=]] في أي حتة والصفحة كلها تتقفل.`,
          solCode: R`// app/api/csp-report/route.ts
export async function POST(request: Request) {
  const body = await request.text();
  console.warn("[csp]", request.headers.get("content-type"), body.slice(0, 2000));
  return new Response(null, { status: 204 });
}
// app/layout.tsx: قراية x-nonce بتخلي كل الصفحات dynamic، والـ nonce متاح لأي Script
import { headers } from "next/headers";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body data-nonce-ready={nonce ? "yes" : "no"}>{children}</body>
    </html>
  );
}`
        },
        {
          cmd: "next/script",
          title: "سكربتات الطرف التالت بـ next/script: امتى تحمّل كل واحد",
          desc: R`[[<Script>]] من [[next/script]] بيحمّل سكربت خارجي مرة واحدة حتى لو الكومبوننت اترسم كذا مرة، ويحدد إمتى بـ [[strategy]]:
[[afterInteractive]] (الافتراضي): بعد ما جزء من الصفحة يعمل hydration. للـ analytics و tag managers.
[[lazyOnload]]: وقت فراغ المتصفح بعد ما كل حاجة تحمّل. للشات، وأزرار السوشيال، والـ widgets.
[[beforeInteractive]]: في الـ [[<head>]] قبل كود Next، ومكانه الـ root layout بس. لحاجات نادرة جدًا (bot detection أو consent manager).
[[worker]]: تجريبي و بـ Partytown، والوثائق بتقول إنه لسه مبيشتغلش مع App Router، فمتعتمدش عليه.

و [[onLoad]] و [[onReady]] و [[onError]] في client components بس. والـ inline script لازم [[id]].`,
          example: R`// app/layout.tsx
import Script from "next/script";
import { headers } from "next/headers";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Script src="https://plausible.io/js/script.js" data-domain="books.example.com" strategy="afterInteractive" nonce={nonce} />
        <Script src="https://widget.example-chat.com/loader.js" strategy="lazyOnload" nonce={nonce} />
      </body>
    </html>
  );
}
// app/stores/map.tsx
"use client";
import Script from "next/script";
export function StoresMap() {
  return (
    <>
      <div id="map" className="h-96" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" onReady={() => drawMap("map")} onError={() => console.error("الخريطة محمّلتش")} />
    </>
  );
}`,
          try: R`حط سكربت الشات بـ [[<script src>]] عادي في الـ layout وشغّل Lighthouse على موبايل وسجّل الـ Total Blocking Time. وبعدين غيّره لـ [[<Script strategy="lazyOnload">]] وقارن. وفي Network > JS اتفرج على ترتيب التحميل للاستراتيجيتين. وآخر حاجة: روح لصفحة الخريطة، ورجع للرئيسية، وارجع للخريطة: [[onReady]] اتنادى كام مرة؟ والسكربت اتحمّل كام مرة؟`,
          flag: "script",
          deep: {
            why: "سكربتات الطرف التالت (analytics و pixels و chat و A/B testing) من أكبر أسباب إن INP و LCP وحشين، وأغلب المواقع اللي «بطيئة من غير سبب» فيها ٨ سكربتات متحطة في الـ head. انت مش متحكم في الكود ده، بس متحكم إمتى يتحمّل وإنه ميتحمّلش مرتين.",
            how: R`[[afterInteractive]] و [[lazyOnload]] بيتحطوا من الـ client: Next بيضيف الـ [[<script>]] للـ DOM بعد الـ hydration أو في [[requestIdleCallback]] بعد الـ load، فمبيعطلوش رسم الصفحة. وبيتسجلوا بالـ src (أو الـ id)، فلو الكومبوننت اترسم تاني في تنقل، السكربت مبيتحمّلش تاني.

[[onLoad]] بيتنادى مرة واحدة لما السكربت يحمّل. [[onReady]] بيتنادى أول مرة وكل ما الكومبوننت يتركّب تاني (بعد تنقل)، وده المطلوب للخرايط والـ widgets اللي محتاجة تتعمل على div جديد. والاتنين محتاجين [[use client]] لأنهم دوال.

[[beforeInteractive]] بيتحط في الـ HTML من السيرفر في الـ head، ومبيتنفذش تاني في التنقل. واستخدامه تقريبًا دايمًا غلط: بيأخر كل حاجة.

CSP: مع nonce لازم تبعت [[nonce]] لكل [[<Script>]]، وبـ [[strict-dynamic]] أي سكربت يحمّله هو بيعدّي.

و [[@next/third-parties]] (لسه experimental) فيه [[GoogleAnalytics]] و [[GoogleTagManager]] و [[YouTubeEmbed]] و [[GoogleMapsEmbed]] جاهزين بالاستراتيجية الصح. و JSON-LD مش سكربت بيتنفذ، فمكانه [[<script type="application/ld+json">]] عادي (درس JSON-LD).`,
            when: R`[[afterInteractive]] للـ analytics اللي محتاج أول page view. [[lazyOnload]] لأي حاجة المستخدم مش محتاجها أول ثانيتين. وحط السكربت في الـ layout أو الصفحة اللي محتاجاه بس، مش في الـ root layout لكل الموقع: خريطة الفروع مالهاش لازمة في صفحة الـ checkout.`,
            mistakes: R`[[<script>]] عادي في الـ layout فيتحمّل ويتنفذ مع كل تنقل أو يعطل الـ render. و [[beforeInteractive]] للـ analytics. و [[onLoad]] في server component فيطلع خطأ. و [[onLoad]] لحاجة محتاجة تتعمل بعد كل تنقل (الصح [[onReady]]). و inline [[<Script>]] من غير [[id]]. و [[strategy="worker"]] في App Router. وتحط ١٠ tags في GTM وتقيس الأداء من غيرهم.`
          },
          teach: R`## الفكرة: انت بتقول «إمتى»، و Next بيحط الـ script في الوقت ده ومرة واحدة

المثال ملفين: الـ root layout فيه سكربتين لكل الموقع (analytics وشات) بتوقيتين مختلفين، وكومبوننت خريطة بيحمّل مكتبة ويرسم بيها لما تجهز. اتشغّل في Next 16.4 بـ [[next build]] و [[next start]] ومعاه الـ proxy بتاع درس CSP. والسكربتات الخارجية عملناها ملفات صغيرة على سيرفر محلي ([[localhost:5837]]) بدل plausible.io والشات و unpkg، كل واحد بيطبع سطر في الـ console ويعدّ مرات تنفيذه. والمتصفح Chrome headless.

---

## ١. الـ layout

### الـ imports والـ nonce

~~~text app/layout.tsx
import Script from "next/script";
import { headers } from "next/headers";
...
const nonce = (await headers()).get("x-nonce") ?? undefined;
~~~

- [[Script]] (S كبيرة) هو الكومبوننت بتاع Next، غير [[<script>]] العادي بتاع HTML.
- الـ nonce نفس فكرة درس CSP: الـ proxy حطه في [[x-nonce]]، والـ layout بيقراه. و [[?? undefined]]: لو مفيش proxy بيحط الـ header، القيمة [[null]]، فنخليها [[undefined]] و [[Script]] يتجاهلها. يعني الكود شغال بـ CSP ومن غيره.

### سكربت الـ analytics

~~~text app/layout.tsx
<Script src="https://plausible.io/js/script.js" data-domain="books.example.com" strategy="afterInteractive" nonce={nonce} />
~~~

- [[src]]: الملف.
- [[data-domain]]: مش prop بتاع Next. أي attribute مش معروف بيتنقل للـ tag زي ما هو، و Plausible بيقراه عشان يعرف الموقع.
- [[strategy="afterInteractive"]]: حمّله بعد ما الصفحة تبدأ تبقى تفاعلية (hydration). وده الافتراضي لو مكتبتش [[strategy]].

### سكربت الشات

~~~text app/layout.tsx
<Script src="https://widget.example-chat.com/loader.js" strategy="lazyOnload" nonce={nonce} />
~~~

[[lazyOnload]]: استنى لحد ما الصفحة كلها تحمّل (حدث [[load]])، وبعدين لما المتصفح يفضى.

### الاتنين اتحطوا فين؟

الـ HTML اللي جه من السيرفر فيه سطر واحد بس ليهم:

~~~text الناتج (curl)
<link rel="preload" href="http://localhost:5837/js/script.js" as="script" nonce="ZGE0YzI3ZjYtMDQ3ZS00..."/>
~~~

يعني الـ analytics بيبدأ يتنزّل بدري (preload)، بس الـ [[<script>]] نفسه Next بيضيفه من المتصفح. والشات مش موجود خالص في الـ HTML. وبعد ما الصفحة اشتغلت، ده اللي لقيناه في الـ DOM:

~~~text الناتج (Chrome)
<script src="http://localhost:5837/js/script.js" data-domain="books.example.com" nonce="" data-nscript="afterInteractive"></script>
<script src="http://localhost:5837/js/loader.js" nonce="" data-nscript="lazyOnload"></script>
~~~

[[data-nscript]] علامة Next على السكربتات بتاعته. و [[nonce=""]] فاضي في الـ DOM لأن المتصفح بيخبي القيمة (درس CSP)، بس هي موجودة واتنفذوا عادي.

### الترتيب الفعلي

قسنا وقت بداية كل طلب بالملّي ثانية من أول الصفحة ([[performance.getEntriesByType]]):

~~~text الناتج (Chrome)
DOMContentLoaded 45   load 154
   40 /_next/static/chunks/... (٧ ملفات Next)
   40 [5837]/js/script.js
  874 [5837]/js/loader.js
console: plausible loaded, data-domain=books.example.com | chat loaded
~~~

- الـ analytics اتطلب مع ملفات Next (بسبب الـ preload)، واتنفذ بعد الـ hydration.
- الشات اتطلب عند ٨٧٤، بعد حدث [[load]] (١٥٤) بكتير: Next استنى لحد ما المتصفح فضي.

القياس ده على جهاز سريع ومن غير Lighthouse. الفكرة اللي باينة: الشات مزاحمش الصفحة خالص.

---

## ٢. الخريطة (client component)

~~~text app/stores/map.tsx
"use client";
import Script from "next/script";
export function StoresMap() {
  return (
    <>
      <div id="map" className="h-96" />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" onReady={() => drawMap("map")} onError={() => console.error("الخريطة محمّلتش")} />
    </>
  );
}
~~~

- [["use client"]]: [[onReady]] و [[onError]] دوال، والدوال مينفعش تتبعت من server component للمتصفح. فأي [[Script]] عليه events لازم يبقى في client component.
- [[<>...</>]] اسمه Fragment: بيلم أكتر من عنصر من غير ما يضيف div زيادة.
- [[<div id="map" className="h-96" />]]: المكان اللي المكتبة هترسم فيه، ارتفاعه ٢٤ rem.
- [[strategy]] مش مكتوبة، فالافتراضي [[afterInteractive]].
- [[onReady]]: بيتنادى لما السكربت يجهز أول مرة، **وكل ما الكومبوننت يتركّب تاني** (رحت صفحة تانية ورجعت).
- [[onError]]: لو الملف محمّلش (adblock، أو الشبكة، أو 404).

[[drawMap]] في التجربة دالة بتكتب في الـ div «map drawn» ورقم بيزيد مع كل نداء.

### التنقل: روحنا الخريطة، ورجعنا الرئيسية، ورجعنا الخريطة

~~~text الناتج (Chrome، بـ onReady)
map text: map drawn 2 | leaflet executed: 1 | plausible executed: 1 | chat: 1
requests to 5837: /js/script.js, /js/loader.js, /js/leaflet.js
~~~

- المكتبة اتطلبت واتنفذت **مرة واحدة** طول الجلسة. Next فاكر إنها اتحمّلت (بالـ src).
- [[onReady]] اتنادى **مرتين**: أول زيارة، وبعد الرجوع، فاترسم على الـ div الجديد.
- والـ analytics والشات اللي في الـ layout برضه اتنفذوا مرة واحدة رغم التنقل.

### نفس التجربة بـ [[onLoad]]

بدّلنا [[onReady]] بـ [[onLoad]]:

~~~text الناتج (Chrome، بـ onLoad)
first visit map: "map drawn 1"
map text:  | leaflet executed: 1
~~~

أول مرة اترسمت. بعد الرجوع الـ div فاضي، لأن [[onLoad]] بيتنادى مرة واحدة لما الملف يحمّل، والملف مش هيحمّل تاني.

---

## ملخص الاستراتيجيات

| [[strategy]] | بيتحمّل إمتى | لإيه |
|---|---|---|
| [[beforeInteractive]] | في الـ head من السيرفر، قبل كود Next. في الـ root layout بس | حاجات نادرة جدًا |
| [[afterInteractive]] (الافتراضي) | بعد الـ hydration | analytics و tag managers |
| [[lazyOnload]] | بعد [[load]] لما المتصفح يفضى | شات، وأزرار سوشيال، و widgets |
| [[worker]] | تجريبي، ومبيشتغلش مع App Router | متستخدموش |

| الـ event | بيتنادى |
|---|---|
| [[onLoad]] | مرة واحدة لما الملف يحمّل |
| [[onReady]] | أول مرة، وكل ما الكومبوننت يتركّب تاني |
| [[onError]] | الملف محمّلش |

## الخلاصة

- [[<Script>]] بيحمّل الملف مرة واحدة مهما الكومبوننت اترسم.
- اختار [[strategy]] حسب أهمية السكربت، و [[lazyOnload]] لأي حاجة مش مستعجلة.
- events = client component، و [[onReady]] للحاجات اللي بترسم على عنصر في الصفحة.
- مع CSP ابعت [[nonce]] لكل [[Script]].`,
          lines: [
            "الكومبوننت.",
            "عشان الـ nonce.",
            "الـ root layout.",
            "الـ nonce من الـ proxy (لو مفيش CSP بيبقى undefined وده عادي).",
            "بداية الـ JSX.",
            "html.",
            "body.",
            "الصفحة.",
            R`analytics بعد الـ hydration، و [[data-domain]] بيتنقل للـ tag زي أي attribute.`,
            "الشات في وقت الفراغ بعد ما الصفحة كلها تحمّل.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`[[onReady]] دالة، فلازم client component.`,
            "الكومبوننت.",
            "الخريطة.",
            "بداية الـ JSX.",
            "Fragment.",
            "المكان اللي الخريطة هتترسم فيه.",
            R`[[onReady]]: أول مرة وكل ما الكومبوننت يتركّب تاني. [[onError]]: السكربت متحمّلش (adblock أو شبكة).`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بـ [[<script src>]] عادي في الـ head: الـ Total Blocking Time أعلى، والسكربت بيتحمّل بدري بيزاحم الـ JS بتاع الصفحة. بـ [[lazyOnload]]: في Network هتلاقيه آخر حاجة، بعد الـ chunks والصور وبعد حدث [[load]]، والـ TBT بيقل (الرقم نفسه بيختلف حسب السكربت والجهاز، المهم الاتجاه). و [[afterInteractive]] بيظهر بعد الـ chunks الأساسية وقبل الـ lazy.

الخريطة: السكربت اتحمّل مرة واحدة بس (هتلاقي طلب واحد لـ leaflet.js في Network طول الجلسة)، و [[onReady]] اتنادى مرتين: مرة أول ما حمّل، ومرة لما رجعت للصفحة، ودي اللحظة اللي محتاج ترسم فيها الخريطة على الـ div الجديد. لو كنت استخدمت [[onLoad]]، الخريطة كانت هتظهر أول مرة بس، وبعد الرجوع الـ div فاضي.

الغلط الشائع: تشوف leaflet.js مش بيتحمّل تاني وتفتكر إن فيه مشكلة كاش.`
        },
        {
          cmd: "analytics و consent",
          title: "analytics بعد موافقة الكوكيز: متحمّلش التتبع قبل ما المستخدم يوافق",
          desc: R`في أوروبا (GDPR و ePrivacy) وقوانين تانية كتير، كوكيز التتبع و pixels الإعلانات محتاجة موافقة قبل ما تتحط. «قبل» معناها السكربت نفسه ميتحمّلش، مش إنه يتحمّل وانت تخبي البانر.

الطريقة في Next: الموافقة في cookie ([[consent=granted]] أو [[denied]]). الـ root layout بيقراها بـ [[cookies()]]: لو موافق يرسم [[<GoogleAnalytics>]]، ولو لسه مردش يرسم البانر، ولو رفض ولا ده ولا ده. والبانر بينادي Server Action بتكتب الـ cookie، و Next بيعيد رسم الصفحة لوحده بعد أي تغيير في الـ cookies من action.`,
          example: R`// app/actions/consent.ts
"use server";
import { cookies } from "next/headers";
export async function setConsent(choice: "granted" | "denied") {
  (await cookies()).set("consent", choice, { maxAge: 60 * 60 * 24 * 180, sameSite: "lax", path: "/" });
}
// app/consent-banner.tsx
"use client";
import { setConsent } from "@/app/actions/consent";
export function ConsentBanner() {
  return (
    <div role="dialog" aria-label="الكوكيز" className="fixed inset-x-0 bottom-0 bg-white p-4 shadow">
      <p>بنستخدم Google Analytics عشان نعرف أنهي صفحات بتتقري. موافق؟</p>
      <button onClick={() => setConsent("granted")}>موافق</button>
      <button onClick={() => setConsent("denied")}>لأ، شكرًا</button>
    </div>
  );
}
// app/layout.tsx
import { cookies, headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ConsentBanner } from "./consent-banner";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const consent = (await cookies()).get("consent")?.value;
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        {consent === "granted" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} nonce={nonce} />}
        {consent === undefined && <ConsentBanner />}
      </body>
    </html>
  );
}`,
          try: R`[[npm i @next/third-parties]]، وحط الملفات، وافتح الموقع في نافذة Incognito ومعاك Network مفلتر على [[google]]: فيه أي طلب قبل ما تدوس؟ دوس «لأ، شكرًا» واعمل refresh. امسح الـ cookie من DevTools ودوس «موافق»: إيه اللي اتحمّل ومن غير refresh؟ وآخر حاجة: فين المستخدم يغيّر رأيه بعدين؟ ضيف لينك «إعدادات الكوكيز» في الـ footer.`,
          flag: "script",
          deep: {
            why: R`الـ analytics بيتطلب في كل مشروع تقريبًا، وأشهر غلطة إنه يتحمّل في الـ layout من أول ثانية والبانر مجرد ديكور. ده مخالف للقانون في أوروبا (وفيه غرامات حقيقية)، وكمان بيخسرك أداء على ناس رافضين أصلًا. ولما القرار على السيرفر، الـ HTML نفسه مفيهوش السكربت، فمفيش حتى طلب واحد يتبعت قبل الموافقة.`,
            how: R`الـ layout بيقرا [[cookies()]]، فكل الصفحات بقت dynamic (لو عندك CSP بـ nonce هي كده كده dynamic). والـ Server Action اللي بتعمل [[cookies().set]]: Next بيعيد رسم الـ route الحالي في نفس الرد، فالبانر بيختفي و [[<GoogleAnalytics>]] بيظهر ويحمّل السكربت من غير refresh.

[[GoogleAnalytics]] من [[@next/third-parties/google]] بيحمّل [[gtag.js]] بعد الـ hydration، وبياخد [[nonce]]، وفيه [[sendGAEvent]] للأحداث. والـ page views في التنقل بتتسجل لوحدها من history events (لازم «Enhanced measurement» شغال في لوحة GA).

Google Consent Mode v2: بديل إنك «متحمّلش خالص». بتحمّل gtag بـ [[gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" })]]، فمبيحطش كوكيز وبيبعت pings من غير هوية، وبعد الموافقة [[gtag("consent", "update", ...)]]. ده اللي جوجل بيطلبه للإعلانات في أوروبا، بس لسه بيبعت طلبات قبل الموافقة، فراجع مع اللي مسؤول عن الخصوصية. ولو المشروع كبير، CMP جاهز (Cookiebot أو OneTrust أو Klaro).

والبديل الأبسط: analytics من غير كوكيز (Plausible أو Umami أو Vercel Analytics)، وناس كتير بتعتبرها مش محتاجة بانر، بس ده قرار قانوني مش تقني.

الـ cookie نفسها: مش httpOnly مش مشكلة هنا، ومدتها ٦ شهور تقريبًا عشان تسأل تاني. ولازم طريقة يغيّر بيها رأيه (زرار في الـ footer بيمسح الـ cookie).`,
            when: R`أي موقع فيه analytics بكوكيز أو pixels إعلانات (Meta و TikTok و Google Ads) وزواره ممكن يكونوا من أوروبا أو أي مكان عنده قانون مشابه. لو الـ analytics من غير كوكيز ومن غير بيانات شخصية، البانر غالبًا مش ضروري، بس اتأكد.`,
            mistakes: R`السكربت في الـ layout والبانر بيخبي نفسه بس. و «رفض» بيخفي البانر ومبيحفظش الرفض فيطلع تاني كل صفحة. وزرار «موافق» كبير و «رفض» مستخبي في إعدادات (ده في حد ذاته مخالف في أوروبا). وتقرا الـ consent في client component بـ [[document.cookie]] جوه [[useEffect]] فالصفحة ترسم وبعدين تحمّل، ويطلع hydration mismatch. وتحط GA و GTM الاتنين فكل page view يتحسب مرتين. وتنسى الـ nonce لما يكون فيه CSP.`
          },
          teach: R`## الفكرة: cookie واحدة بتقرر، والسيرفر بيرسم السكربت أو البانر أو ولا ده ولا ده

المثال ٣ ملفات: Server Action بتكتب cookie اسمها [[consent]]، وبانر بزرارين بينادي الـ action، والـ root layout بيقرا الـ cookie ويقرر يرسم إيه. اتشغّل في Next 16.4 و [[@next/third-parties]] 16.4 بـ [[next build]] و [[next start]]، و [[NEXT_PUBLIC_GA_ID]] في [[.env.local]] بقيمة تجريبية [[G-TEST12345]]، ومعاه الـ solCode (زرار «إعدادات الكوكيز»). والتجربة في Chrome headless.

---

## ١. الـ Server Action: [[app/actions/consent.ts]]

~~~text app/actions/consent.ts
"use server";
import { cookies } from "next/headers";
export async function setConsent(choice: "granted" | "denied") {
  (await cookies()).set("consent", choice, { maxAge: 60 * 60 * 24 * 180, sameSite: "lax", path: "/" });
}
~~~

- [["use server"]] في أول الملف: كل دالة بيصدّرها تبقى Server Action، يعني دالة بتتنفذ على السيرفر بس، والمتصفح يقدر يناديها كأنها دالة عادية (Next بيحوّل النداء لطلب POST).
- [[choice: "granted" | "denied"]]: النوع قيمتين بس. ده بيساعدك وانت بتكتب، بس خد بالك إن TypeScript مبيشتغلش وقت التشغيل، فلو حد بعت قيمة تانية بإيده هتوصل. لو القيمة هتتخزن في حاجة مهمة افحصها بـ Zod.
- [[(await cookies())]]: [[cookies()]] بترجّع Promise من Next 15، فالأقواس عشان الـ [[await]] يخلص الأول وبعدين [[.set]].
- [[.set("consent", choice, {...})]]: اسم الـ cookie، وقيمتها، والإعدادات:

| الإعداد | معناه |
|---|---|
| [[maxAge: 60 * 60 * 24 * 180]] | العمر بالثواني: ٦٠ ثانية × ٦٠ دقيقة × ٢٤ ساعة × ١٨٠ يوم = ١٥,٥٥٢,٠٠٠ |
| [[sameSite: "lax"]] | المتصفح ميبعتهاش مع طلبات جاية من مواقع تانية (غير الضغط على لينك عادي) |
| [[path: "/"]] | تتبعت مع كل صفحات الموقع |

---

## ٢. البانر: [[app/consent-banner.tsx]]

- [["use client"]]: فيه [[onClick]]، فلازم يتبعت للمتصفح.
- [[import { setConsent } from "@/app/actions/consent"]]: client component بيستورد Server Action. اللي بيتبعت للمتصفح مش كود الدالة، ده «مرجع» ليها، والنداء بيبقى طلب للسيرفر.
- [[role="dialog"]] و [[aria-label="الكوكيز"]]: قارئ الشاشة يعرف إن دي نافذة اسمها «الكوكيز».
- الكلاسات: [[fixed inset-x-0 bottom-0]] ثابت تحت الشاشة بعرضها كله، و [[bg-white p-4 shadow]] خلفية بيضا ومسافة داخلية وظل.
- [[onClick={() => setConsent("granted")}]]: الزرارين نفس الدالة بقيمة مختلفة، وبنفس الحجم والمكان، عشان الرفض ميبقاش أصعب من الموافقة.

---

## ٣. الـ layout: هنا القرار

~~~text app/layout.tsx
const consent = (await cookies()).get("consent")?.value;
const nonce = (await headers()).get("x-nonce") ?? undefined;
...
{consent === "granted" && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} nonce={nonce} />}
{consent === undefined && <ConsentBanner />}
~~~

- [[.get("consent")?.value]]: [[get]] بترجّع object فيه [[name]] و [[value]]، أو [[undefined]] لو مفيش cookie. و [[?.]] (optional chaining) معناها «لو اللي قبلي undefined، رجّع undefined من غير error». فـ [[consent]] بيبقى [["granted"]] أو [["denied"]] أو [[undefined]].
- الـ nonce زي درس CSP. التجربة دي من غير proxy، فطلع [[undefined]] و GA اشتغل عادي.
- [[{شرط && <X />}]]: ارسم X بس لو الشرط صح.
- [[process.env.NEXT_PUBLIC_GA_ID!]]: المتغير من [[.env.local]]. والـ [[!]] في الآخر (non-null assertion) بتقول لـ TypeScript «أنا متأكد إنه مش undefined». مش بتعمل أي فحص وقت التشغيل.
- [[GoogleAnalytics]] من [[@next/third-parties/google]]: كومبوننت جاهز بيحمّل [[gtag.js]] بالطريقة الصح.

| [[consent]] | اللي بيترسم |
|---|---|
| [[undefined]] (لسه مردش) | البانر |
| [["granted"]] | GA |
| [["denied"]] | ولا حاجة |

وقراية [[cookies()]] في الـ layout خلّت كل الصفحات [[ƒ]] في الجدول: لازم تترسم مع كل طلب عشان كل زائر ليه cookie مختلفة.

---

## ٤. التجربة خطوة خطوة

حطينا في الصفحة متغير في [[window]] قبل أي ضغطة، عشان نعرف الصفحة اتعملها reload ولا لأ (لو اختفى يبقى اتعملها).

### زيارة جديدة

~~~text الناتج
HTML has googletagmanager: false
== fresh visit: banner=1 cookies=-
   google requests: none
~~~

ولا طلب واحد لجوجل، والسكربت مش موجود في الـ HTML أصلًا.

### «لأ، شكرًا»

~~~text الناتج
== after deny (no reload): banner=0 reloadMarker=same page cookies=consent=denied
   google requests: none
   POST / Next-Action=yes
     -> 200 text/x-component set-cookie: consent=denied; Path=/; Expires=Mon, 05 Apr 2027 07:52:18 GMT; Max-Age=15552000; SameSite=lax
~~~

- النداء بقى [[POST]] على نفس الصفحة ومعاه header اسمه [[Next-Action]] (ده اللي بيقول للسيرفر أنهي action).
- الرد [[text/x-component]]: ده الـ RSC payload، يعني شكل الصفحة الجديد. Next لما action تكتب cookie بيعيد رسم الصفحة ويبعتها في نفس الرد، فالبانر اختفى و [[reloadMarker]] لسه موجود: من غير reload.
- [[Max-Age=15552000]] هي الـ ١٨٠ يوم.

وبعد reload: [[banner=0]] ولسه مفيش طلبات لجوجل. الرفض اتحفظ.

### مسحنا الـ cookies ودوسنا «موافق»

~~~text الناتج
== after accept (no reload): banner=0 reloadMarker=same page cookies=consent=granted,_ga_TEST12345=GS2.1...,_ga=GA1.1...
   google requests:
     https://www.googletagmanager.com/gtag/js?id=G-TEST12345
     https://www.google-analytics.com/g/collect?v=2&tid=G-TEST12345...
~~~

نفس الرحلة، بس المرة دي الـ layout اترسم بـ [[consent === "granted"]]، فـ [[<GoogleAnalytics>]] ظهر، وحمّل [[gtag.js]]، وبعت أول page view ([[collect]])، وحط كوكيز بتاعته ([[_ga]] و [[_ga_TEST12345]]). وكله من غير reload.

### «إعدادات الكوكيز» (الـ solCode)

~~~text الناتج
== after cookie settings (reload): banner=1 reloadMarker=gone cookies=_ga=GA1.1...,_ga_TEST12345=GS2.1...
   POST / Next-Action=yes
     -> 200 text/x-component set-cookie: consent=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
~~~

- [[cookies().delete("consent")]] بيمسح الـ cookie بإنه يرجّعها فاضية وتاريخها ١٩٧٠ (تاريخ فات، فالمتصفح يشيلها).
- [[window.location.reload()]] عمل reload كامل (الـ marker اختفى)، والبانر رجع.
- لكن [[_ga]] و [[_ga_TEST12345]] لسه موجودين: دول كوكيز GA نفسه، ومسح [[consent]] مبيلمسهمش. لو المستخدم رجع في كلامه، امسحهم كمان (بنفس الـ domain اللي اتحطوا عليه).

---

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[setConsent]] ([["use server"]]) | تكتب cookie [[consent]] ٦ شهور |
| البانر ([["use client"]]) | زرارين بنفس الحجم بينادوا الـ action |
| الـ layout | يقرا الـ cookie: GA، أو البانر، أو ولا حاجة |
| كتابة cookie من action | Next بيعيد رسم الصفحة في نفس الرد، من غير reload |
| قبل الموافقة | السكربت مش في الـ HTML، فصفر طلبات لجوجل |`,
          lines: [
            "Server Action.",
            "الـ cookies.",
            R`بتاخد الاختيار بنوع محدد. ده بيمسك غلطك وانت بتكتب، بس TypeScript مبيفحصش وقت التشغيل، فلو القيمة مهمة افحصها (Zod).`,
            R`تكتب الـ cookie ٦ شهور. أي كتابة cookies من action بتعيد رسم الصفحة.`,
            "قفلة.",
            "البانر محتاج onClick.",
            "الـ action.",
            "الكومبوننت.",
            "بداية الـ JSX.",
            R`[[role="dialog"]] و [[aria-label]] عشان قارئ الشاشة يعرف ده إيه.`,
            "الرسالة: بتقول بالظبط إيه اللي بيتحمّل.",
            "موافق: الـ action يكتب الـ cookie والصفحة تتعاد.",
            "رفض بنفس الحجم والمكان.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "الـ cookies والـ headers.",
            R`الكومبوننت الجاهز من [[@next/third-parties]].`,
            "البانر.",
            "الـ root layout.",
            R`الموافقة: [[granted]] أو [[denied]] أو [[undefined]] (لسه مردش).`,
            "الـ nonce لو فيه CSP.",
            "بداية الـ JSX.",
            "html.",
            "body.",
            "الصفحة.",
            R`موافق بس؟ ارسم GA، فيتحمّل [[gtag.js]]. غير كده السكربت مش موجود في الـ HTML أصلًا.`,
            R`لسه مردش؟ البانر. ولو رفض، ولا ده ولا ده.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`في Incognito قبل ما تدوس: Network مفلتر على google فاضي خالص، و View Source مفيهوش [[googletagmanager]]. البانر ظاهر.

بعد «لأ، شكرًا»: البانر اختفى (الصفحة اتعاد رسمها من الـ action)، وفي Cookies هتلاقي [[consent=denied]]، وبعد refresh مفيش بانر ولا طلبات لجوجل.

بعد ما تمسح الـ cookie وتدوس «موافق»: من غير refresh هتلاقي طلب لـ [[googletagmanager.com/gtag/js?id=G-...]] وبعده طلبات [[collect]] لـ google-analytics، والبانر اختفى. ده لأن كتابة الـ cookie في الـ Server Action خلّت Next يرسم الـ layout تاني بـ [[consent === "granted"]].

إعدادات الكوكيز: زرار في الـ footer (client component) بينادي action بتعمل [[(await cookies()).delete("consent")]]، فالبانر يرجع. ولو المستخدم كان موافق وغيّر لرفض، [[gtag.js]] المحمّل مش هيختفي من الصفحة الحالية، فالأسلم [[window.location.reload()]] بعد الرفض. وكوكيز GA نفسها ([[_ga]]) بتتحط غالبًا على الدومين الأب ([[.example.com]])، فمسحها لازم يبقى بنفس الـ domain، وإلا بتفضل لحد ما تخلص.

الغلط الشائع: تختبر في نافذة عادية فيها consent قديمة وتفتكر إن GA بيتحمّل قبل الموافقة.`,
          solCode: R`// app/actions/consent.ts (زيادة)
export async function resetConsent() {
  (await cookies()).delete("consent");
}
// app/cookie-settings-link.tsx
"use client";
import { resetConsent } from "@/app/actions/consent";
export function CookieSettingsLink() {
  return <button onClick={async () => { await resetConsent(); window.location.reload(); }}>إعدادات الكوكيز</button>;
}`
        }
      ]
    }
]);

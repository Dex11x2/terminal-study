// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "Application: الكوكيز والتخزين",
      l: 2,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`فاك JWT صغير`, what: R`صفحة HTML واحدة (من غير سيرفر) بتلصق فيها JWT فتطلّع الـ header والـ payload وتاريخ الانتهاء بتوقيتك وفاضل قد إيه، وتحذير لو فيه حاجة شكلها سر. من درس «localStorage و JWT».`, done: R`توكن منتهي بيظهر أحمر «انتهى من X دقيقة»، و base64url بـ [[-]] و [[_]] بيتفك صح، ونص مش JWT بيطلّع رسالة مش exception.` },
        { lvl: 'صغير', t: R`مسودة فورم مبتضيعش`, what: R`فورم طويل بيحفظ المسودة في localStorage مع كل كتابة (debounce)، وبيرجّعها بعد ريفريش، وبيمسحها بعد الإرسال، ومبيحفظش الباسورد ولا الكارت. من درس «localStorage و JWT».`, done: R`ريفريش في النص بيرجّع كل الحقول ما عدا الحساسة، و Application مفيهوش المفتاح بعد الإرسال، و localStorage مليان (QuotaExceededError) مبيكسرش الفورم.` },
        { lvl: 'متوسط', t: R`login بكوكي صح`, what: R`سيرفر Node فيه [[/login]] و [[/logout]] و [[/me]] بكوكي session [[HttpOnly; Secure; SameSite=Lax]]، وحماية CSRF بـ [[Sec-Fetch-Site]] و [[Origin]]، و [[Clear-Site-Data]] في الـ logout. من دروس «Cookies» و «CSRF و SameSite» و «Clear site data».`, done: R`[[document.cookie]] مبيبيّنش الـ session، وفورم POST من [[evil.test]] بيرجع [[403]]، و [[/logout]] بيفضّي الكوكيز والـ storage في Application، واختبارات [[node --test]] بتغطي الـ ٣.` },
        { lvl: 'متوسط', t: R`مقارنة SameSite في جدول حي`, what: R`معمل درس «CSRF و SameSite» بصفحة نتايج: بتعمل login وتجرّب الـ ٥ طرق من [[evil.test]] و [[api.shop.test]] بزرار، والجدول بيتملي من لوج السيرفر لايف، ومعاه عدّاد الدقيقتين بتوع Lax+POST.`, done: R`الجدول بيطلع زي اللي في الدرس، والخانة «من غير SameSite + فورم» بتتقلب من «اتبعتت» لـ «لأ» بعد دقيقتين قدام عينك.` },
        { lvl: 'كبير', t: R`فاحص تخزين وكوكيز لأي موقع`, what: R`أداة Playwright بتعمل login (بخطوات من ملف)، وتطلّع تقرير: كل كوكي وخصايصها وتحذير لكل session من غير HttpOnly أو SameSite، وكل مفتاح localStorage شكله توكن (JWT)، و CSP موجود ولا لأ، وتجرّب CSRF بسيط (فورم من origin تاني) على endpoints انت بتحددها.`, done: R`على معمل فيه أخطاء متعمّدة بتطلّع كل واحد، وعلى المعمل المتصلّح بتطلّع صفر، وبتشتغل من غير ما تطبع أي قيمة كوكي أو توكن في التقرير (اتأكدت بـ grep).`, ext: R`زوّد فحص IndexedDB و service worker cache، وخليها تطلّع severity لكل نتيجة وروابط للدروس.` },
        { lvl: 'فكرة', t: R`«امسح بياناتي» لموقعك`, what: R`صفحة إعدادات في موقعك بتوري اليوزر كل اللي الموقع شايله عنه على جهازه (كوكيز، و localStorage، و cache) بلغة بسيطة، وزرار يمسح كل حاجة. انت بتختار التصميم والكلام.`, done: R`الزرار بيمسح فعلًا (Application فاضي بعده)، واليوزر بيرجع لصفحة login، والصفحة بتشرح كل مفتاح بجملة.`, ext: R`زوّد تصدير البيانات كـ JSON، واربطها بسياسة الخصوصية.` },
      ],
      items: [
        {
          cmd: "Cookies",
          title: "مين حافظ إيه",
          desc: "Application ثم Cookies بيوريك كل كوكي بخصايصه. [[HttpOnly]] معناها JavaScript مش قادر يقراها، وده اللي لازم يبقى في كوكي الـ session عشان لو حصل XSS التوكن ميتسرقش. [[Secure]] تتبعت على HTTPS بس. و [[SameSite]] بتحمي من CSRF. دبل كليك على أي قيمة تعدّلها، و Delete تمسحها، ودي أسرع طريقة تختبر «لو الـ session خلصت هيحصل إيه».",
          example: R`Application > Storage > Cookies > your domain
Columns to check: HttpOnly, Secure, SameSite, Expires`,
          try: "بص على كوكيز موقعك بعد login: هل كوكي الـ session عليها HttpOnly و Secure؟",
          flag: "keys",
          deep: {
            why: "Session منتهية ومش عارف ليه، أو كوكي مش بتتخزن، أو عايز تختبر السلوك من غير session.",
            how: R`Application tab ثم Cookies تحت Storage. كل كوكي بيعرض: الاسم والقيمة، والدومين، والـ Expires، والـ HttpOnly والـ Secure والـ SameSite.

[[HttpOnly]]: JavaScript مش قادر يقرا الكوكي دي. مهم لكوكيات الـ session لأنه يمنع XSS من سرقتها.

[[Secure]]: الكوكي بتتبعت على HTTPS بس.

[[SameSite]]: بيتحكم في إمتى الكوكي بتتبعت مع cross-site requests. Strict لنفس الـ site بس. Lax في navigations. None في كل الحالات (محتاج Secure).

تقدر تدبل كليك وتغيّر قيمة أو تمسح بـ Delete. مفيد تختبر «إيه اللي هيحصل لو الـ session خلصت».`,
            when: "Session بتنتهي قبل المفروض. تختبر صفحة المستخدم غير الـ logged in.",
            mistakes: "SameSite=None من غير Secure. وكوكيات session من غير HttpOnly."
          },
          teach: R`## الأول: الكوكي بيحطها السيرفر بـ Set-Cookie

السيرفر بيبعت header اسمه [[Set-Cookie]]، والمتصفح بيحفظ الكوكي ويبعتها تاني مع كل طلب لنفس الموقع في header اسمه [[Cookie]]. تاب Application ثم Cookies بيعرض المحفوظ بأعمدة لكل خاصية (الأعمدة من Chrome DevTools docs). جربت كوكيتين على سيرفر محلي.

---

## ١. السيرفر بعت إيه

~~~powershell
curl.exe -si http://127.0.0.1:8791/shop | Select-String -Pattern "set-cookie"
~~~

~~~text الناتج
Set-Cookie: session=s3cr3t; Path=/; HttpOnly; SameSite=Lax
Set-Cookie: theme=dark; Path=/; SameSite=Lax
~~~

| الحتة | معناها |
|---|---|
| [[session=s3cr3t]] | الاسم والقيمة |
| [[Path=/]] | تتبعت مع كل المسارات في الموقع |
| [[HttpOnly]] | JavaScript مش قادر يقراها |
| [[SameSite=Lax]] | متتبعتش مع طلبات جاية من مواقع تانية، غير لما المستخدم يدوس لينك ويفتح الموقع |
| [[Secure]] | (مش موجودة هنا لأنه http محلي) تتبعت على HTTPS بس |
| [[Expires]] أو [[Max-Age]] | (مش موجودين) فالكوكي «Session»: تتمسح لما المتصفح يقفل |

---

## ٢. اختبار HttpOnly في Console

~~~javascript Console
document.cookie
~~~

~~~text الناتج
"theme=dark"
~~~

[[document.cookie]] بيرجّع الكوكيز اللي JavaScript مسموحله يشوفها، كنص واحد [[اسم=قيمة; اسم=قيمة]]. كوكي الـ [[session]] مش ظاهرة لأنها [[HttpOnly]]، مع إنها موجودة في المتصفح وبتتبعت مع الطلبات (شفتها من بروتوكول DevTools: [[theme, session(HttpOnly)]]). ودي بالظبط الحماية: لو حد قدر يحقن JavaScript في صفحتك (XSS)، مش هيعرف يقرا الـ session.

---

## ٣. اللي في الأعمدة

| العمود | تبص على إيه في كوكي الـ session |
|---|---|
| HttpOnly | ✓ |
| Secure | ✓ في الإنتاج (HTTPS) |
| SameSite | Lax أو Strict |
| Expires / Max-Age | تاريخ معقول أو Session |

ودبل كليك على القيمة يعدّلها، و Delete يمسحها. امسح كوكي الـ session وريفريش، وشوف الموقع بيرجّعك لصفحة الـ login صح ولا بيكسر.

## الخلاصة

- [[Set-Cookie]] من السيرفر، و [[Cookie]] من المتصفح في كل طلب.
- [[document.cookie]] مش بيوريك الـ HttpOnly، وده المطلوب لكوكي الـ session.
- SameSite=None لازم معاها Secure.`,
          sol: R`اللي المفروض تشوفه في صف كوكي الـ session: علامة ✓ في عمود HttpOnly، و ✓ في Secure، و SameSite [[Lax]] أو [[Strict]]، و Expires إما تاريخ معقول أو [[Session]] (تتمسح لما تقفل المتصفح).

اختبار سريع: اكتب [[document.cookie]] في Console. لو كوكي الـ session ظاهرة في الناتج، يبقى مفيهاش HttpOnly وأي XSS يقدر يسرقها، ودي أول حاجة تصلّحها. لو مش ظاهرة يبقى تمام.

لو Secure مش متعلم عليها والموقع على HTTPS، الكوكي ممكن تتبعت على http لو حد فتح اللينك من غير s. وعلى localhost طبيعي تلاقيها من غير Secure في التطوير.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** افتح Application ثم Cookies على موقع عامل فيه login، واكتب لكل كوكي: الاسم، و HttpOnly، و Secure، و SameSite، و Expires (ولا Session).`, done: R`جدول بكل الكوكيز، وكوكي الـ session الحقيقية متعلّم عليها HttpOnly، ولو لقيت كوكي session من غير HttpOnly كتبت إن ده خطر XSS.`, sol: R`1. افتح الموقع وسجّل دخول.
2. [[F12]] ثم Application ثم Cookies ثم اسم الموقع.
3. انقل كل صف: Name و HttpOnly و Secure و SameSite و Expires.

القراءة: كوكي الـ session هي اللي بتفتح الحساب، فلو حد خدها بقى انت. عشان كده لازم [[HttpOnly]] (JavaScript مش بيقراها) و [[Secure]] (https بس) و [[SameSite]]. أما [[theme]] مثلًا فمش سر، وعادي الـ JavaScript يقراها.

و [[Expires]] لو مكتوب [[Session]] يعني بتتمسح لما المتصفح يتقفل. وعمود SameSite الفاضي معناه إن المتصفح بيعتبرها [[Lax]].

الغلطة: تحكم على الاسم. [[sid]] و [[connect.sid]] و [[_session_id]] كلها session. جرّب: امسحها وشوف الموقع طلّعك ولا لأ، زي التمرين رقم ٣. ولو لقيت session من غير HttpOnly، اكتبها كخطر XSS.

المعمل على [[http://127.0.0.1]]، فـ [[Secure]] مش متحققة هنا، وفي الإنتاج لازم تبقى آه:

~~~text الناتج (Network.getCookies)
Name      HttpOnly   Secure   SameSite   Expires
session   ✓          -        Lax        Session
theme     -          -        (فاضي)     Session
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** سيرفر Node بيعمل [[Set-Cookie]] لـ ٣ كوكيز: [[a=1]] عادية، و [[b=1; HttpOnly]]، و [[c=1; Max-Age=10]]. في Console اكتب [[document.cookie]] على طول وبعد ١٥ ثانية.`, done: R`أول مرة [[a=1; c=1]] (من غير [[b]])، وبعد ١٥ ثانية [[a=1]] بس. و [[b]] ظاهرة في Application وفي Request Headers بتاعة كل طلب.`, sol: R`~~~js server.mjs
import http from "node:http";
http.createServer((req, res) => {
  console.log(req.url, "cookie:", req.headers.cookie);
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Set-Cookie": ["a=1; Path=/", "b=1; HttpOnly; Path=/", "c=1; Max-Age=10; Path=/"],
  });
  res.end("<!doctype html><h1>cookies</h1>");
}).listen(8930, "127.0.0.1");
~~~
~~~js Console
document.cookie
// استنى ١٥ ثانية
document.cookie
~~~

[[Set-Cookie]] لازم يبقى array عشان ٣ كوكيز، لأن كل كوكي header لوحده، ومينفعش تتجمع بفاصلة.

[[b]] مش ظاهرة في [[document.cookie]] لأن [[HttpOnly]] بتخبيها عن JavaScript، بس المتصفح بيبعتها عادي، فهتلاقيها في Application وفي Request Headers. و [[c]] عليها [[Max-Age=10]]، فبعد ١٠ ثواني المتصفح نفسه بيمسحها. مفيش طلب ولا كود.

الغلطة: تكتب [[document.cookie]] وتقول «b مااتحفظتش». دي محفوظة، بص في Application. والكوكي اللي [[Max-Age]] بتاعها انتهت مبتتحذفش من الجدول لحد ما تعمل ريفريش للتاب نفسه.

~~~text الناتج
أول مرة:        "a=1; c=1"
بعد ١٥ ثانية:   "a=1"
Request Headers: cookie: a=1; b=1; c=1   (قبل ما c تنتهي)
Application:     a و b (عليها HttpOnly) و c
~~~` },
            { lvl: 'تطبيق', t: R`**اختبر الـ session:** على موقعك امسح كوكي الـ session من Application (Delete)، وبعدين دوس على أي زرار محتاج login.`, done: R`كاتب اللي حصل: الـ API رجّع [[401]] والصفحة ودّتك للـ login (سليم)، أو فضلت شغالة بيانات قديمة أو وقعت (باج تكتبه وتصلّحه).`, sol: R`1. سجّل دخول، وافتح Application ثم Cookies.
2. كليك يمين على كوكي الـ session ثم Delete.
3. **من غير ريفريش**، دوس أي زرار محتاج login.

الصفحة لسه مفتوحة ومعاها البيانات اللي جت قبل كده. لكن أول طلب من غير الكوكي السيرفر هيرد [[401]]. والسؤال: الكود بيعمل إيه ساعتها؟

~~~js التصرف السليم
const r = await fetch("/api/me");
if (r.status === 401) { location.href = "/signin"; return; }
~~~

الغلطة: [[fetch]] مبيرميش خطأ على [[401]]، فكود من غير الفحص هيعمل [[.json()]] على رد الخطأ، ويقرا [[undefined]] ويقع، أو يسيب بيانات اليوزر القديم على الشاشة. ودي الباجات اللي التمرين بيدوّر عليها.

في المعمل الكوكي اتمسحت بـ [[Network.deleteCookies]]، وده نفس زرار Delete:

~~~text الناتج
قبل المسح:   الزرار بيعرض sara
بعد المسح:   GET /api/me  cookie=theme=dark  → 401
             الصفحة راحت /signin (سليم)
~~~` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** ابعت [[Set-Cookie: s=1; SameSite=None]] من غير [[Secure]]. هل اتحفظت؟ دوّر في Network على الرد، في تاب Cookies بتاع الطلب، على السبب.`, done: R`الكوكي مااتحفظتش، وجنبها تحذير إن [[SameSite=None]] لازم معاها [[Secure]] (في البروتوكول السبب [[SameSiteNoneInsecure]]، اتجرّب في Chrome 156).`, sol: R`~~~js server.mjs
import http from "node:http";
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": "s=1; SameSite=None; Path=/" });
  res.end("<!doctype html>x");
}).listen(8930, "127.0.0.1");
~~~

1. افتح الصفحة، وبص في Application: مفيش كوكي.
2. في Network دوس على طلب الصفحة، وافتح تاب Cookies.
3. تحت Response Cookies الكوكي عليها علامة تحذير، ومرّر الماوس عليها.

[[SameSite=None]] معناها «ابعتها في الطلبات من مواقع تانية»، وده خطر، فالمتصفح بيشترط [[Secure]] معاها. من غيره بيرفضها خالص، و Application مش هيوريك حاجة.

عشان كده تاب Cookies في Network هو المكان الصح. Application بيعرض اللي اتحفظ بس، مش اللي اترفض.

الغلطة: تصلّحها بشيل [[SameSite]]، فتبقى [[Lax]] ومش هتتبعت cross-site، وده مش اللي انت عايزه. الصح [[SameSite=None; Secure]] على https.

اتجرّب بـ [[Network.responseReceivedExtraInfo]]، ده نفس مصدر التاب:

~~~text الناتج
s=1; SameSite=None; Path=/ -> SameSiteNoneInsecure
Network.getCookies: 0 كوكيز
~~~` },
            { lvl: 'تحدي', t: R`**قارن:** كوكي بـ [[Domain=shop.test]] وكوكي من غير [[Domain]]، من [[shop.test]]. افتح [[api.shop.test]] (اعمل الاسمين في [[hosts]] أو بـ [[--host-resolver-rules]]): أنهي واحدة وصلت؟`, done: R`اللي فيها [[Domain]] بتوصل للـ subdomains كمان، واللي من غيره (host-only) بتوصل لـ [[shop.test]] بس. وكاتب إمتى تحتاج الأولى (login مشترك) وإمتى التانية أأمن.`, sol: R`~~~js server.mjs (https بشهادة محلية، و Chrome بـ --host-resolver-rules="MAP *.test 127.0.0.1")
import https from "node:https";
import fs from "node:fs";
https.createServer({ key: fs.readFileSync("key.pem"), cert: fs.readFileSync("cert.pem") }, (req, res) => {
  console.log(req.headers.host, req.url, "cookie:", req.headers.cookie);
  const h = { "Content-Type": "text/html" };
  if (req.url === "/set") h["Set-Cookie"] = ["withdom=1; Domain=shop.test; Path=/", "hostonly=1; Path=/"];
  res.writeHead(200, h);
  res.end("<!doctype html>");
}).listen(8931, "127.0.0.1");
~~~

افتح بالترتيب [[https://shop.test:8931/set]]، و [[https://shop.test:8931/a]]، و [[https://api.shop.test:8931/b]].

الكوكي من غير [[Domain]] اسمها **host-only**: بترجع للاسم اللي عملها بالظبط. و [[Domain=shop.test]] معناها «الاسم ده وكل subdomains بتاعته».

**إمتى كل واحدة:** [[Domain]] لما تحتاج login مشترك بين [[app.shop.test]] و [[api.shop.test]]. وhost-only أأمن لأي حاجة تانية. لو واحد من الـ subdomains اتخترق (أو موقع مستخدمين) مش هيوصل لكوكي الموقع الأساسي.

الغلطة: تفتكر إن الأأمن هو تحديد [[Domain=shop.test]]. العكس: إنك تكتب Domain بتوسّع، مش بتضيّق.

~~~text الناتج
shop.test     /a  cookie: withdom=1; hostonly=1
api.shop.test /b  cookie: withdom=1
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** HttpOnly بيحمي من إيه بالظبط ومبيحميش من إيه؟ ٤ سطور فيها: سرقة الكوكي بـ XSS، والطلبات اللي الـ XSS بيبعتها بنفسه، و CSRF.`, done: R`كاتب إن HttpOnly بيمنع **قراية** الكوكي من JavaScript، بس سكربت XSS لسه يقدر يبعت [[fetch]] والكوكي هتتبعت معاه، و CSRF محتاج SameSite أو token مش HttpOnly.`, sol: R`~~~text إجابة نموذجية
HttpOnly بيمنع JavaScript يقرا الكوكي، فسكربت XSS مش هيقدر يبعتها لبره، فالمهاجم مش هياخد session يستخدمها من جهازه.
لكن XSS لسه شغال جوه صفحتك، فيقدر يبعت fetch، والمتصفح هيضيف الكوكي لوحده، يعني يعمل أي حاجة باسم اليوزر والصفحة مفتوحة.
و CSRF مالوش علاقة بقراية الكوكي أصلًا: المتصفح بيبعتها في طلب جاي من موقع تاني.
فحماية CSRF هي SameSite أو token أو Sec-Fetch-Site، و HttpOnly مش بيحمي منه.
~~~

جرّبنا: كوكي [[session]] عليها HttpOnly، و [[document.cookie]] طلّع [[theme]] بس، بس [[fetch]] من نفس الصفحة وصلها السيرفر، والـ API رد ببيانات اليوزر.

الغلطة: تقول «حطينا HttpOnly، يبقى مش محتاجين نقلق من XSS». ده بيقلل الضرر بس، والمفتاح الأصلي تمنع الـ XSS نفسه.

~~~text الناتج
document.cookie            "theme=dark"
await fetch("/api/me")     {name: "sara"}
لوج السيرفر: GET /api/me cookie=session=abc; theme=dark
~~~` },
          ],
        },
        {
          cmd: "CSRF و SameSite",
          title: "موقع تاني بيبعت طلب لموقعك بكوكي اليوزر: SameSite بتقرر الكوكي تروح ولا لأ، و Sec-Fetch-Site بيقولك جاي منين",
          desc: R`CSRF (Cross-Site Request Forgery): اليوزر عامل login في موقعك، وفتح موقع تاني فيه فورم مخفي بيبعت [[POST /transfer]] لموقعك. المتصفح بيبعت الطلب **بكوكي اليوزر**، فالسيرفر فاكره هو. خاصية [[SameSite]] على الكوكي هي اللي بتقرر الكوكي تتبعت مع طلب جاي من موقع تاني ولا لأ: [[Strict]] أبدًا، و [[Lax]] مع التنقّل العادي بـ GET بس (دوسة على لينك)، و [[None]] دايمًا (ولازم معاها [[Secure]]). والكوكي اللي من غير SameSite خالص Chrome بيعاملها [[Lax]]، **بس** لمدة دقيقتين بعد ما تتحط بيسيبها تروح مع POST من موقع تاني (اتقاس في المعمل: بعد الـ login على طول الكوكي راحت مع الفورم، وبعد ١٢٥ ثانية لأ).

وفخ «same-site»: الموقع هو الدومين الأساسي، فـ [[api.shop.test]] و [[shop.test]] نفس الـ site، وكوكي [[Strict]] بتروح من أي subdomain. يعني subdomain مخترق أو فيه صفحات يوزرز = CSRF. الحماية الكاملة: [[SameSite=Lax]] (أو Strict) **و** فحص على السيرفر لأي طلب بيغيّر حاجة: header [[Sec-Fetch-Site]] (المتصفح بيبعته: [[cross-site]] أو [[same-site]] أو [[same-origin]]) أو [[Origin]]، أو CSRF token، ومتغيّرش حاجة بـ GET أبدًا.`,
          example: R`res.setHeader("Set-Cookie", "session=abc; HttpOnly; Secure; SameSite=Lax; Path=/")
const site = req.headers["sec-fetch-site"]
if (req.method !== "GET" && site && site !== "same-origin") return res.writeHead(403).end("cross-site")
const origin = req.headers.origin
if (req.method !== "GET" && origin && origin !== "https://shop.test") return res.writeHead(403).end("bad origin")`,
          lines: [
            R`كوكي الـ session: [[HttpOnly]] (JavaScript مش بيقراها)، و [[Secure]] (https بس)، و [[SameSite=Lax]] (متتبعتش مع POST أو fetch أو صورة من موقع تاني، وتتبعت لو اليوزر داس على لينك ليك من موقع تاني فيفضل logged in). لو موقعك مش محتاج حد يوصله من لينك وهو logged in (لوحة أدمن مثلًا)، [[Strict]] أأمن.`,
            R`المتصفحات الحديثة بتبعت [[Sec-Fetch-Site]] مع كل طلب، وصفحات الويب **مش بتقدر** تغيّره (forbidden header). قيمه: [[same-origin]] (نفس الدومين والبورت والـ scheme)، و [[same-site]] (subdomain من نفس الموقع)، و [[cross-site]] (موقع تاني)، و [[none]] (اليوزر كتب الرابط أو bookmark).`,
            R`أي طلب بيغيّر حاجة ([[POST]] و [[PUT]] و [[DELETE]]) ومش من نفس الـ origin: ارفضه بـ [[403]]. الشرط [[site &&]] بيعدّي الطلبات اللي مفيهاش الـ header أصلًا (متصفح قديم أو curl أو سيرفر تاني)، ودول بيتعاملوا بالسطر اللي بعده أو بـ token.`,
            R`header [[Origin]] بيتبعت مع أي POST من المتصفح، وفيه الـ scheme والدومين والبورت بتاع الصفحة اللي بعتت (من غير path). أقدم من [[Sec-Fetch-Site]]، فبيغطي متصفحات أكتر.`,
            R`لو الـ Origin مش موقعك بالظبط: [[403]]. قارن بالنص كامل ([[!==]])، مش بـ [[includes("shop.test")]] (لأن [[https://shop.test.evil.example]] فيها [[shop.test]]).`,
          ],
          try: R`ابني معمل الدرس: سيرفر https واحد بيرد على [[shop.test]] و [[evil.test]] و [[api.shop.test]] (شهادة محلية للأسامي التلاتة و [[--host-resolver-rules]]). [[/login]] بيحط ٤ كوكيز بـ SameSite مختلفة، و [[/transfer]] بيطبع الكوكيز اللي وصلت و [[Sec-Fetch-Site]] و [[Origin]]. من صفحات [[evil.test]] جرّب: فورم POST، و [[fetch]]، وصورة، ولينك. وبعدين استنى دقيقتين وكرر.`,
          deep: {
            why: R`المتصفح بيبعت الكوكيز الخاصة بأي دومين مع أي طلب رايح له، مهما كان الطلب جاي منين. ده اللي بيخلّي فورم في موقع تاني يقدر يعمل «تحويل فلوس» أو «غيّر الإيميل» أو «امسح الحساب» باسم اليوزر، من غير ما يقرا ولا حرف من الرد. CORS مبيحميش من ده: CORS بيمنع **قراية** الرد، بس الفورم **اتبعت** والسيرفر عمل الحاجة.`,
            how: R`لكل طلب، المتصفح بيحسب «site» الصفحة اللي بعتت و «site» الطلب. الـ site = الـ scheme + الدومين المسجّل (eTLD+1)، فـ [[api.shop.test]] و [[shop.test]] نفس الـ site، و [[evil.test]] site تاني. لو مختلفين (cross-site): كوكي [[Strict]] متتبعتش أبدًا، و [[Lax]] تتبعت بس لو ده تنقّل top-level (الصفحة كلها بتتغيّر) بـ method آمنة (GET)، و [[None]] تتبعت (بس لازم [[Secure]]، وإلا الكوكي مبتتحفظش أصلًا: [[SameSiteNoneInsecure]] في المعمل). الكوكي من غير SameSite بيتعامل [[Lax]] من Chrome 80، ومعاه استثناء اسمه «Lax+POST»: لو الكوكي اتحطت من أقل من دقيقتين بتتبعت مع POST top-level (عشان مواقع الدفع اللي بترجعك بـ POST). وبجانب الكوكيز، المتصفح بيبعت [[Sec-Fetch-Site]] و [[Sec-Fetch-Mode]] و [[Sec-Fetch-Dest]] و [[Origin]]، والسيرفر يقدر يرفض على أساسهم (Fetch Metadata).`,
            when: R`أي موقع فيه login بكوكيز (sessions، أو JWT في كوكي). لو الـ API بتاعك بيستخدم [[Authorization: Bearer]] من JavaScript بس (مش كوكي)، CSRF مش مشكلة، لأن الموقع التاني ميعرفش التوكن. وكل فريمورك ليه حماية جاهزة: Django و Laravel و Rails بـ CSRF token، و Next.js Server Actions بيقارن [[Origin]] بالـ host، و Express محتاج تعملها بنفسك (زي المثال) أو مكتبة.`,
            mistakes: R`تفتكر CORS بيحمي من CSRF (لأ: الفورم بيتبعت عادي). تعمل action بيغيّر حاجة بـ GET ([[/logout]] أو [[/delete?id=5]]): Lax بيبعت الكوكي مع لينك أو redirect. تحط [[SameSite=None]] «عشان كله يشتغل». تختبر بعد الـ login على طول وتقول «الكوكي اتبعتت، يبقى Lax مش شغّال» (ده استثناء الدقيقتين). تفتكر Strict بيحمي من subdomain (same-site). تقارن [[Origin]] بـ [[includes]] أو [[startsWith]]. أو تحط الـ CSRF token في كوكي وتقرا الكوكي بس على السيرفر (لازم تقارن الكوكي بقيمة جاية في header أو body).`
          },
          teach: R`## الأول: الهجوم في ٣ خطوات

1. اليوزر عامل login في [[shop.test]]، فالمتصفح شايل كوكي [[session]].
2. فتح [[evil.test]] (لينك في رسالة، إعلان...). الصفحة فيها:

~~~html evil.test/form
<form method="POST" action="https://shop.test:8444/transfer?via=form">
  <input name="to" value="evil"><input name="amount" value="5000">
</form>
<script>document.forms[0].submit()</script>
~~~

3. المتصفح بيبعت الـ POST لـ [[shop.test]]، ولو الكوكي اتبعتت معاه، السيرفر هيفتكر اليوزر هو اللي طلب.

الموقع التاني مش محتاج يقرا الرد ولا يعرف الكوكي. كفاية الطلب يوصل بالكوكي. والسؤال كله: **الكوكي هتتبعت ولا لأ؟** وده اللي [[SameSite]] بيقرره.

---

## المعمل

سيرفر Node بـ [[node:https]] واحد على بورت [[8444]] بيرد على ٣ أسامي حسب header [[Host]]: [[shop.test]] (الموقع)، و [[evil.test]] (المهاجم)، و [[api.shop.test]] (subdomain). الشهادة self-signed للأسامي دي، و Chrome 156 (headless) بـ [[--host-resolver-rules="MAP *.test 127.0.0.1"]].

[[/login]] على [[shop.test]] بيحط ٥ كوكيز:

~~~text Set-Cookie
s_none=1; SameSite=None; Secure; Path=/
s_lax=1; SameSite=Lax; Path=/
s_strict=1; SameSite=Strict; Path=/
s_default=1; Path=/
s_none_nosecure=1; SameSite=None; Path=/
~~~

و [[/transfer]] بيكتب في اللوج: الكوكيز اللي وصلت، و [[sec-fetch-site]]، و [[origin]].

---

## ١. الكوكيز اتحفظت إزاي

~~~text الناتج
blocked Set-Cookie: s_none_nosecure=1; SameSite=None; Path=/ -> SameSiteNoneInsecure
stored: s_none(None) s_lax(Lax) s_strict(Strict) s_default(Lax)
~~~

- [[s_none_nosecure]] **مااتحفظتش خالص**: [[SameSite=None]] من غير [[Secure]] مرفوضة. في DevTools: Network ثم الطلب ثم تاب Cookies، وعلّم «show filtered out request cookies»، هتلاقيها بعلامة تحذير وسببها.
- [[s_default]] (من غير SameSite) اتحفظت كـ [[Lax]].

وفي Application ثم Cookies، عمود **SameSite** بيوريك ده لكل كوكي.

---

## ٢. من evil.test: إيه اللي وصل؟

صفحات [[evil.test]] بعتت ٤ طلبات بـ ٤ طرق، وصفحة من [[api.shop.test]] بعتت نفس الفورم:

~~~text لوج shop.test مباشرة بعد الـ login
POST shop.test/transfer?via=form     | cookies: s_default,s_none                   | sec-fetch-site: cross-site | origin: https://evil.test:8444
POST shop.test/transfer?via=fetch    | cookies: s_none                             | sec-fetch-site: cross-site | origin: https://evil.test:8444
GET  shop.test/pixel?via=img         | cookies: s_none                             | sec-fetch-site: cross-site | origin: -
GET  shop.test/transfer?via=link-get | cookies: s_default,s_lax,s_none             | sec-fetch-site: cross-site | origin: -
POST shop.test/transfer?via=form     | cookies: s_default,s_lax,s_none,s_strict    | sec-fetch-site: same-site  | origin: https://api.shop.test:8444
~~~

وبعد ما استنيت ١٢٥ ثانية وكررت:

~~~text لوج shop.test بعد ١٢٥ ثانية
POST shop.test/transfer?via=form     | cookies: s_none                             | sec-fetch-site: cross-site | origin: https://evil.test:8444
POST shop.test/transfer?via=fetch    | cookies: s_none                             | sec-fetch-site: cross-site
GET  shop.test/pixel?via=img         | cookies: s_none                             | sec-fetch-site: cross-site
GET  shop.test/transfer?via=link-get | cookies: s_default,s_lax,s_none             | sec-fetch-site: cross-site
POST shop.test/transfer?via=form     | cookies: s_default,s_lax,s_none,s_strict    | sec-fetch-site: same-site
~~~

اقراهم كده:

| الكوكي | فورم POST من موقع تاني | fetch أو صورة من موقع تاني | لينك GET من موقع تاني | من subdomain |
|---|---|---|---|---|
| [[None; Secure]] | بتتبعت | بتتبعت | بتتبعت | بتتبعت |
| [[Lax]] | لأ | لأ | **بتتبعت** | بتتبعت |
| [[Strict]] | لأ | لأ | لأ | **بتتبعت** |
| من غير SameSite | **بتتبعت أول دقيقتين** وبعدين لأ | لأ | بتتبعت | بتتبعت |

ثلاث حاجات مهمة طلعت من الجدول:

- **استثناء الدقيقتين (Lax+POST):** [[s_default]] راحت مع الفورم بعد الـ login على طول، ومراحتش بعد ١٢٥ ثانية. لو اختبرت بسرعة هتفتكر الحماية مش شغالة، ولو اختبرت بعد شوية هتفتكرها شغالة. حط [[SameSite=Lax]] صريحة ومتعتمدش على الافتراضي.
- **[[Lax]] بتروح مع لينك GET:** فأي حاجة بتغيّر بيانات بـ GET ([[/transfer?to=evil]]، [[/logout]]) مكشوفة. GET لازم ميغيّرش حاجة.
- **same-site مش same-origin:** من [[api.shop.test]] حتى [[Strict]] اتبعتت، و [[sec-fetch-site: same-site]]. لو أي subdomain فيه محتوى يوزرز أو اتخترق، SameSite مش هيحميك.

---

## ٣. الحماية على السيرفر

كل طلب فيه [[sec-fetch-site]] و [[origin]] (اللي الصفحة مش بتقدر تزوّرهم). سطور المثال بترفض أي طلب مش GET لو:

- [[Sec-Fetch-Site]] موجود ومش [[same-origin]]، أو
- [[Origin]] موجود ومش موقعك بالظبط.

على اللوج اللي فوق: الـ ٣ طلبات من [[evil.test]] (form و fetch) هترجع [[403]]، وكمان اللي من [[api.shop.test]] ([[same-site]] مش [[same-origin]]). ولو عايز تسمح لـ subdomain معيّن، حطه في لستة بالاسم.

والطلبات اللي مفيهاش الاتنين (curl، سيرفر تاني، متصفح قديم جدًا) مش جاية من صفحة في متصفح فيها كوكي اليوزر، فمش CSRF. بس لو عايز حماية زيادة: **CSRF token**. السيرفر بيحط قيمة عشوائية في الصفحة (hidden input أو meta)، والفورم بيبعتها، والسيرفر بيقارنها باللي في الـ session. الموقع التاني ميقدرش يعرف القيمة (CORS بيمنعه يقرا صفحتك). الطريقة دي في PHP في درس «token + SameSite» في تاب PHP.

---

## ٤. تتأكد إزاي من DevTools

- **Application ثم Cookies:** عمود SameSite لكل كوكي (فاضي = مااتحددش = Lax مع الاستثناء).
- **Network ثم الطلب ثم Cookies:** الكوكيز اللي اتبعتت فعلًا. علّم «show filtered out request cookies» تشوف اللي اتمنعت وجنبها السبب (SameSite أو Secure).
- **Network ثم الطلب ثم Headers:** [[Sec-Fetch-Site]] و [[Origin]] في Request Headers. ده نفس اللي السيرفر بيشوفه.

## الخلاصة

- CSRF = موقع تاني بيبعت طلب بكوكي اليوزر. CORS مش بيحمي منه.
- [[Lax]] (صريحة) للـ session، و [[Strict]] للوحات الحساسة، و [[None]] بس لو محتاج cross-site فعلًا (ومعاها [[Secure]]).
- من غير SameSite = Lax + استثناء POST لمدة دقيقتين.
- subdomain = same-site، فالكوكي بتروح منه حتى لو Strict.
- على السيرفر: ارفض أي تغيير لو [[Sec-Fetch-Site]] مش [[same-origin]] أو [[Origin]] غريب، ومتغيّرش حاجة بـ GET.`,
          sol: R`مباشرة بعد [[/login]]: الفورم من [[evil.test]] وصل بـ [[s_default]] و [[s_none]]، والـ fetch والصورة بـ [[s_none]] بس، واللينك GET بـ [[s_default]] و [[s_lax]] و [[s_none]]، والفورم من [[api.shop.test]] بالأربعة ومعاهم [[s_strict]]. و [[s_none_nosecure]] مااتحفظتش أصلًا ([[SameSiteNoneInsecure]]).

بعد دقيقتين: نفس الكلام بس الفورم من [[evil.test]] بقى بـ [[s_none]] بس، لأن استثناء Lax+POST خلص.

و [[sec-fetch-site]] كان [[cross-site]] في كل طلبات [[evil.test]] و [[same-site]] من [[api.shop.test]]، و [[origin]] موجود في الـ POST بس. بالفحص اللي في المثال، كل الـ POST دي بترجع [[403]]، واللينك GET بيعدّي (ولازم ميغيّرش حاجة).`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** املى الجدول من دماغك: [[Strict]] و [[Lax]] و [[None]] ومن غير SameSite، مع فورم POST ولينك GET وصورة من موقع تاني.`, done: R`١٢ خانة صح، ومعلّم على خانة «من غير SameSite + فورم POST» إنها بتتبعت أول دقيقتين بس.`, sol: R`| الكوكي | فورم POST من موقع تاني | لينك GET (تنقّل) | صورة من موقع تاني |
|---|---|---|---|
| [[Strict]] | لأ | لأ | لأ |
| [[Lax]] | لأ | **آه** | لأ |
| [[None; Secure]] | آه | آه | آه |
| من غير SameSite | **آه أول دقيقتين بس**، وبعدها لأ | آه | لأ |

القاعدة: [[Strict]] مش بتتبعت من موقع تاني أبدًا، حتى لو دوست لينك. [[Lax]] بتتبعت في **تنقّل top-level بـ GET** بس، عشان لما تدوس لينك للموقع تلاقي نفسك مسجّل. و [[None]] دايمًا.

ومن غير SameSite المتصفح بيعتبرها [[Lax]]، بس فيه استثناء: **Lax+POST**. أول ١٢٠ ثانية بعد ما الكوكي اتعملت، بتتبعت في POST top-level، عشان تدفقات login زي OAuth متقعش.

الغلطة: تحط [[Lax]] وتعمل تغيير حالة على GET. اللينك من موقع تاني هيبعت الكوكي. التمرين رقم ٢ بيثبت ده.

الجدول متطابق مع لوج المعمل في التمرين اللي بعده:

~~~text الناتج
12 خانة، وخانة «من غير SameSite + فورم POST» بتتبعت أول دقيقتين بس.
~~~` },
            { lvl: 'تطبيق', t: R`**ابني المعمل:** اعمل السيرفر بـ ٣ أسامي، واكتب جدول الدرس بإيدك من لوج السيرفر.`, done: R`الجدول بتاعك مطابق للي في الدرس، وفيه صف [[api.shop.test]] و [[Strict]] وصلت.`, sol: R`~~~js lab.mjs (https، والأسامي shop.test و evil.test و api.shop.test في Chrome بـ --host-resolver-rules)
import https from "node:https";
import fs from "node:fs";
const P = 8444, opts = { key: fs.readFileSync("key.pem"), cert: fs.readFileSync("cert.pem") };
https.createServer(opts, (q, s) => {
  const host = q.headers.host.split(":")[0], u = q.url, H = { "Content-Type": "text/html" };
  const names = (q.headers.cookie || "").split("; ").filter(Boolean).map(c => c.split("=")[0]).sort().join(",");
  if (host === "shop.test" && u !== "/login") console.log(q.method, host + u, "|", names || "-", "|", q.headers["sec-fetch-site"]);
  if (u === "/login") H["Set-Cookie"] = ["s_none=1; SameSite=None; Secure; Path=/", "s_lax=1; SameSite=Lax; Path=/", "s_strict=1; SameSite=Strict; Path=/", "s_default=1; Path=/", "s_none_nosecure=1; SameSite=None; Path=/"];
  s.writeHead(200, H);
  if (u === "/form") return s.end($__bt<form method=POST action="https://shop.test:$__{P}/transfer?via=form"></form><script>document.forms[0].submit()$__lt/script>$__bt);
  if (u === "/attack") return s.end($__bt<img src="https://shop.test:$__{P}/pixel?via=img"><a href="https://shop.test:$__{P}/transfer?via=link-get">x</a><script>fetch("https://shop.test:$__{P}/transfer?via=fetch",{method:"POST",mode:"no-cors",credentials:"include",body:"a=1"})$__lt/script>$__bt);
  s.end("<!doctype html>ok");
}).listen(P, "127.0.0.1");
~~~

1. افتح [[https://shop.test:8444/login]] (ده الـ login).
2. افتح [[https://evil.test:8444/form]] ثم [[/attack]]، ودوس اللينك.
3. افتح [[https://api.shop.test:8444/form]].
4. اقرا اللوج، واكتب الجدول.

كل سطر في اللوج صف في الجدول: الكوكيز اللي وصلت بتحدد مين عدّى. و [[s_none_nosecure]] مش موجودة أصلًا: اترفضت من أول مرة.

المفاجأة في الصف الأخير: [[api.shop.test]] و [[shop.test]] نفس الـ **site** (نفس [[eTLD+1]])، فـ [[Strict]] وصلت. يعني SameSite مش بيحميك من subdomain بتاعك. والدليل [[sec-fetch-site: same-site]] مش [[same-origin]].

الغلطة: تخلط بين site و origin. [[shop.test:8444]] و [[api.shop.test:8444]] origins مختلفين، بس site واحد. CORS بيتكلم عن origin، و SameSite عن site.

~~~text الناتج
SET blocked: s_none_nosecure=1; SameSite=None; Path=/ -> SameSiteNoneInsecure

الطلب                                     الكوكيز اللي وصلت                     sec-fetch-site
POST /transfer?via=form    (evil.test)    s_default, s_none                     cross-site
POST /transfer?via=fetch   (evil.test)    s_none                                cross-site
GET  /pixel?via=img        (evil.test)    s_none                                cross-site
GET  /transfer?via=link-get(evil.test)    s_default, s_lax, s_none              cross-site
POST /transfer?via=form    (api.shop.test) s_default, s_lax, s_none, s_strict   same-site
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح:** endpoint [[GET /account/delete?confirm=1]] في موقعك القديم. اكتب صفحة على موقع تاني بتمسح حساب اليوزر بلينك، وبعدين صلّح الـ endpoint.`, done: R`قبل التصليح الحساب اتمسح من لينك من موقع تاني (والكوكي Lax)، وبعد ما بقى [[POST]] ومعاه فحص [[Sec-Fetch-Site]]: نفس اللينك رجع [[404]] أو [[405]]، وفورم POST من موقع تاني رجع [[403]].`, sol: R`~~~html evil.test
<a href="https://shop.test/account/delete?confirm=1">اكسب جايزة</a>
~~~
~~~js التصليح في السيرفر
if (url.startsWith("/account/delete")) {
  if (req.method !== "POST") { res.writeHead(405); return res.end(); }
  const site = req.headers["sec-fetch-site"];
  if (site && site !== "same-origin") { res.writeHead(403); return res.end("cross-site"); }
  // امسح الحساب
}
~~~

[[Lax]] بتتبعت في أي تنقّل GET من موقع تاني، فلينك واحد كفاية. والمشكلة الأساسية إن **GET غيّر بيانات**. وأي حاجة ممكن تعمله: لينك، أو bot بيعمل preview، أو extension بيحمّل الصفحات مسبقًا.

التصليح في طبقتين: [[POST]] يخلّي اللينك ميوصلش ([[405]]). و [[Sec-Fetch-Site]] بيمنع فورم POST من موقع تاني ([[403]]). وليه [[site &&]]: عشان لو الـ header مش موجود (عميل قديم أو curl) الطلب يعدي، وده اختيار. ولو الـ endpoint خطير اطلبه إجباري.

الغلطة: تعتمد على [[confirm=1]] كحماية. ده باراميتر أي حد يكتبه. أو تعتمد على [[Referer]]، اللي ممكن يبقى فاضي.

~~~text الناتج
قبل التصليح:   GET /account/delete cookie=true site=cross-site -> 200   (الحساب اتمسح من لينك)
بعد التصليح:
لينك من evil.test:        GET  ... site=cross-site    -> 405
فورم POST من evil.test:   POST ... site=cross-site    -> 403
فورم من الموقع نفسه:      POST ... site=same-origin   -> 200
~~~` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** test (بـ [[node:test]] و [[fetch]]) بيبعت POST لسيرفرك بـ [[sec-fetch-site: cross-site]] ومرة [[same-origin]] ومرة من غير، ويتأكد إن الأولى [[403]] والباقي [[200]].`, done: R`الاختبار بيعدّي، ولما شيلت سطر الفحص من السيرفر الاختبار الأول وقع. (Node [[fetch]] بيسمح تحط [[sec-fetch-site]] بإيدك، المتصفح لأ: اتجرّب.)`, sol: R`~~~js server.mjs
import http from "node:http";
export function make(check = true) {
  return http.createServer((req, res) => {
    const site = req.headers["sec-fetch-site"];
    if (check && req.method !== "GET" && site && site !== "same-origin") {
      res.writeHead(403);
      return res.end("cross-site");
    }
    res.writeHead(200);
    res.end("ok");
  });
}
~~~
~~~js csrf.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { make } from "./server.mjs";

const CHECK = process.env.NO_CHECK ? false : true;
const server = make(CHECK).listen(0, "127.0.0.1");
await new Promise(r => server.once("listening", r));
const url = "http://127.0.0.1:" + server.address().port + "/transfer";
const post = headers => fetch(url, { method: "POST", headers });

test("cross-site is refused", async () => {
  assert.equal((await post({ "sec-fetch-site": "cross-site" })).status, 403);
});
test("same-origin passes", async () => {
  assert.equal((await post({ "sec-fetch-site": "same-origin" })).status, 200);
});
test("no header passes (curl, old clients)", async () => {
  assert.equal((await post({})).status, 200);
});
test.after(() => server.close());
~~~
~~~bash
node --test csrf.test.mjs
NO_CHECK=1 node --test csrf.test.mjs
~~~

- [[listen(0)]]: نظام التشغيل بيختار بورت فاضي، فالاختبار ميتعارضش مع حاجة تانية.
- [[server.address().port]]: بيجيب البورت اللي اتاخد.
- [[process.env.NO_CHECK]]: عشان تشوف الاختبار **بيقع** فعلًا لما الفحص يتشال. اختبار مبيقعش مش بيختبر حاجة.
- [[test.after]]: يقفل السيرفر، ومن غيرها العملية هتفضل معلّقة.

ليه [[fetch]] في Node ينفع يحط [[sec-fetch-site]]: في المتصفح ده forbidden header، أي محاولة بتتجاهل. Node مش متصفح. وعشان كده الـ header ده ينفع للدفاع ضد متصفح، مش ضد curl.

الغلطة: تختبر الحالة السليمة بس، فالـ [[403]] متتجربش.

~~~text الناتج
✔ cross-site is refused
✔ same-origin passes
✔ no header passes (curl, old clients)
ℹ pass 3   ℹ fail 0

بعد شيل الفحص (NO_CHECK=1):
✖ cross-site is refused   (actual: 200، expected: 403)
✔ same-origin passes
✔ no header passes (curl, old clients)
ℹ pass 2   ℹ fail 1
~~~` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** خلّي استثناء الدقيقتين يبان: اعمل login، وابعت الفورم من [[evil.test]] على طول، وبعد ٦٠ ثانية، وبعد ١٢٥ ثانية. الكوكي اللي من غير SameSite وصلت إمتى؟`, done: R`وصلت في أول مرتين ومراحتش في التالتة، وفي DevTools ثم Network ثم Cookies (مع «show filtered out») ظهرت متمنعة بسبب SameSite في المرة التالتة.`, sol: R`1. شغّل معمل التمرين رقم ١، وافتح [[https://shop.test:8444/login]] وابدأ عدّ.
2. افتح [[https://evil.test:8444/form]] على طول.
3. كرر بعد ٦٠ ثانية، وبعد ١٢٥ ثانية.
4. في المرة التالتة افتح Network، ودوس على الطلب، وتاب Cookies، وعلّم «show filtered out request cookies».

القاعدة دي اسمها **Lax+POST**: الكوكي من غير [[SameSite]] بتتعامل كـ [[Lax]]، بس أول ١٢٠ ثانية من وقت إنشاءها بتتبعت كمان في POST top-level، عشان مسارات login اللي بترجع بـ POST من موقع تاني (زي OAuth) متقعش.

عشان كده الوقت بيتحسب من **إنشاء الكوكي**، مش من الطلب. وعشان كده لو الموقع بيجدد الكوكي مع كل طلب، الاستثناء ممكن يتجدد، فمتبنيش حماية عليه.

الغلطة: تختبر CSRF بعد login على طول، فتلاقي الهجوم «نجح» أو تلاقيه فشل بعد شوية، وتحتار. الوقت جزء من التجربة. والحل: اكتب [[SameSite=Lax]] صراحة، فالاستثناء مبيتطبقش.

المعمل مشي بـ Playwright والوقت حقيقي، والسبب من [[associatedCookies]] في الـ Protocol، وده نفس مصدر تاب Cookies:

~~~text الناتج (POST من evil.test، و s_none بتوصل دايمًا)
t = 0 ثانية      cookies: s_default, s_none    ← وصلت
t = 60 ثانية     cookies: s_default, s_none    ← وصلت
t = 125 ثانية    cookies: s_none               ← اتمنعت (SameSite)
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميل بيقول «حطينا CORS بـ origin بتاعنا بس، يبقى مفيش CSRF». اكتبله ٤ سطور بالمعمل.`, done: R`السطور فيها: الفورم HTML مش محتاج CORS أصلًا، والـ [[fetch]] بـ [[mode: "no-cors"]] اتبعت ووصل السيرفر (لوج المعمل)، و CORS بيمنع قراية الرد بس، والحماية SameSite و [[Sec-Fetch-Site]]/[[Origin]] أو token.`, sol: R`~~~text إجابة نموذجية
CORS بيحدد مين يقرا الرد، مش مين يبعت الطلب. فورم HTML عادي مش بيمر على CORS أصلًا.
وفي المعمل، fetch بـ mode: "no-cors" و credentials: "include" من evil.test وصل السيرفر، والصفحة مقدرتش تقرا الرد، بس الطلب اتنفذ.
فالمهاجم مش محتاج يقرا: كفاية التحويل يحصل.
الحماية SameSite، و Sec-Fetch-Site أو Origin على السيرفر، أو CSRF token.
~~~

الفرق في جملة: CORS بيحمي **القراية**، و CSRF هجوم **كتابة**. الاتنين مشكلتين مختلفتين، وحل واحدة مبيحلش التانية.

الغلطة: تصدّق إن [[preflight]] هيمنع. [[preflight]] بيحصل بس للطلبات غير البسيطة. الفورم و [[no-cors]] طلبات بسيطة، فمفيش [[OPTIONS]].

~~~text الناتج (لوج المعمل، و CORS مش مفعّل أصلًا على shop.test)
POST shop.test/transfer?via=fetch | cookies: s_none | cross-site | origin: https://evil.test:8444
~~~` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import http from "node:http";
const srv = http.createServer((req, res) => {
  const site = req.headers["sec-fetch-site"];
  if (req.method !== "GET" && site && site !== "same-origin") return res.writeHead(403).end("cross-site");
  const origin = req.headers.origin;
  if (req.method !== "GET" && origin && origin !== "https://shop.test") return res.writeHead(403).end("bad origin");
  res.end("ok");
}).listen(0, "127.0.0.1", async () => {
  const url = "http://127.0.0.1:" + srv.address().port + "/transfer";
  const cases = [
    ["evil form", { "sec-fetch-site": "cross-site", origin: "https://evil.test" }],
    ["subdomain", { "sec-fetch-site": "same-site", origin: "https://api.shop.test" }],
    ["same page", { "sec-fetch-site": "same-origin", origin: "https://shop.test" }],
    ["old browser", { origin: "https://shop.test.evil.example" }],
    ["curl", {}],
  ];
  for (const [name, headers] of cases) {
    const r = await fetch(url, { method: "POST", headers, body: "to=x" });
    console.log(name + ": " + r.status + " " + await r.text());
  }
  srv.close();
});`, expect: [R`evil form: 403 cross-site`, R`subdomain: 403 cross-site`, R`same page: 200 ok`, R`old browser: 403 bad origin`, R`curl: 200 ok`] },
          ],
        },
        {
          cmd: "localStorage و JWT",
          title: "التخزين في المتصفح",
          desc: "localStorage بيفضل موجود بعد ما تقفل المتصفح، و sessionStorage بيروح مع قفل التاب. أي JavaScript في الصفحة يقدر يقراهم، فمتحطش فيهم توكن حساس لو تقدر تستخدم كوكي HttpOnly. والـ JWT تلات حتت بينهم نقط، والنص اللي في النص base64 تقدر تفكّه وتقراه. يعني الـ JWT مش مشفّر، فمتحطش فيه أي سر.",
          example: R`localStorage
localStorage.getItem("token")
JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))
localStorage.clear()`,
          try: "لو موقعك بيحفظ JWT، فكّه واعرف فيه إيه وبيخلص إمتى (exp).",
          deep: {
            why: "التطبيق بيحفظ التوكن في localStorage وعايز تشوفه أو تفكّه. أو تتأكد إنه مش بيحفظ حاجات حساسة.",
            how: R`Application tab ثم Storage ثم Local Storage. بتشوف كل key/value. بتقدر تعدّل أو تمسح.

الـ JWT مش مشفّر، هو encoded بـ base64url (بـ [[-]] و [[_]] بدل [[+]] و [[/]]، وعشان كده بنبدّلهم قبل atob). اللي بين أول نقطة وتانية نقطة هو الـ payload. [[atob()]] في Console بيفكّه. أو موقع jwt.io.

لأن أي JavaScript يقدر يقرا الـ localStorage، الـ JWT المخزّن هناك هدف لـ XSS. الأأمن إنه يتخزّن في HttpOnly cookie.`,
            when: "تتأكد من محتوى الـ JWT: صلاحيات اليوزر، وإمتى التوكن بينتهي (حقل exp). تختبر سلوك التطبيق لما التوكن منتهي.",
            mistakes: "تتوقع إن الـ JWT مشفّر. أي حد ممكن يفكّه. متحطش معلومات سرية جواه."
          },
          teach: R`## الأول: localStorage قاموس نصوص للموقع

[[localStorage]] مكان تخزين لكل origin، فيه مفاتيح وقيم **نصوص بس**، وبيفضل بعد قفل المتصفح. و [[sessionStorage]] نفس الشكل بس بيروح مع قفل التاب. والاتنين أي JavaScript في الصفحة يقراهم. المثال بيقرا توكن JWT محفوظ ويفكّه. كله اتشغّل في Console في Chrome، بعد ما حطيت token تجربة بـ [[localStorage.setItem("token", "...")]].

---

## ١. [[localStorage]]

~~~text الناتج
Storage {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Mi...', theme: 'dark', length: 2}
~~~

كل المفاتيح وقيمها، و [[length]] عددهم. نفس اللي في Application ثم Local Storage.

## ٢. [[localStorage.getItem("token")]]

بيرجّع قيمة مفتاح واحد كنص:

~~~text الناتج
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUiOiJBbGkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc5MTMwODU1NCwiZXhwIjoxNzkxMzA5NDU0fQ.c2lnbmF0dXJl"
~~~

الـ JWT تلات حتت بينهم نقط: **header** و **payload** و **signature** (التوقيع اللي السيرفر بيتأكد بيه إن محدش عدّل).

---

## ٣. السطر الطويل من جوه لبرة

~~~javascript Console
JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))
~~~

### الخطوة ١: [[.split(".")]]

بيقسم النص عند كل نقطة ويرجّع array من ٣ حتت:

~~~text الناتج
["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", "eyJzdWIiOiI0MiIsIm5hbWUi...ODU1NCwiZXhwIjoxNzkxMzA5NDU0fQ", "c2lnbmF0dXJl"]
~~~

### الخطوة ٢: الرقم 1 بين القوسين المربعين

الترقيم بيبدأ من صفر، فـ ١ هي الحتة التانية: الـ payload.

### الخطوة ٣: الـ replace مرتين

- [[/-/g]] regex معناه «كل [[-]]» ([[g]] = global، كل المرات مش أول مرة بس)، ويتبدل بـ [[+]].
- [[/_/g]] كل [[_]] يتبدل بـ [[/]].

ليه؟ الـ JWT مكتوب بـ **base64url**: نسخة من base64 بتستخدم [[-]] و [[_]] بدل [[+]] و [[/]] عشان تنفع في URL. و [[atob]] بيفهم base64 العادي بس، فبنرجّع الحرفين.

### الخطوة ٤: [[atob(...)]]

اسمها من «ASCII to binary»: بتفك base64 لنص. مثال صغير:

~~~text atob("eyJzdWIiOiI0MiJ9")
"{"sub":"42"}"
~~~

### الخطوة ٥: [[JSON.parse(...)]]

بيحوّل نص JSON لـ object:

~~~text الناتج
{sub: '42', name: 'Ali', role: 'user', iat: 1791308554, exp: 1791309454}
~~~

| المفتاح | معناه |
|---|---|
| [[sub]] | subject: اليوزر صاحب التوكن |
| [[iat]] | issued at: اتعمل إمتى، بالثواني من ١ يناير ١٩٧٠ |
| [[exp]] | expires: بيخلص إمتى، بنفس الوحدة |

[[exp - iat]] = ٩٠٠ ثانية، يعني عمره ربع ساعة. وكل ده اتقرا **من غير أي مفتاح سري**: الـ JWT مش مشفّر.

---

## ٤. الـ solCode: إمتى بيخلص

~~~javascript Console
const p = JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
console.log(p, new Date(p.exp * 1000).toISOString(), Math.round((p.exp * 1000 - Date.now()) / 60000) + " min left");
~~~

~~~text الناتج
{sub: '42', name: 'Ali', role: 'user', iat: 1791308554, exp: 1791309454} '2026-10-06T17:57:34.000Z' '15 min left'
~~~

- [[p.exp * 1000]]: JavaScript بيعدّ بالـ ms مش الثواني، فبنضرب في ١٠٠٠.
- [[new Date(...).toISOString()]]: التاريخ بصيغة عالمية بتوقيت UTC (الـ [[Z]] في الآخر).
- [[Date.now()]]: دلوقتي بالـ ms. الفرق ÷ ٦٠٠٠٠ = دقايق.

---

## ٥. الأخطاء اللي هتقابلك (جربتها)

~~~text الناتج
localStorage.getItem("tokn").split(".")
Uncaught TypeError: Cannot read properties of null (reading 'split')

atob("ab-c")
Uncaught InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
~~~

- [[getItem]] بيرجّع [[null]] لو المفتاح مش موجود (هنا الاسم غلط).
- [[atob]] بيرفض [[-]] و [[_]]، وعشان كده الـ replace.

## ٦. [[localStorage.clear()]]

بيمسح كل مفاتيح الموقع ده، وبعدها [[localStorage.length]] رجع [[0]]. زي logout يدوي لو التطبيق شايل التوكن هنا.

## الخلاصة

- localStorage نصوص بس، ويتقري من أي JavaScript في الصفحة.
- JWT = header.payload.signature، والـ payload base64url تفكّه بـ [[atob]] بعد تبديل [[-]] و [[_]].
- [[exp]] بالثواني، اضربه في ١٠٠٠ قبل [[new Date]].`,
          lines: [
            "كل اللي متخزن (اكتبها في Console).",
            "[[getItem(\"token\")]] بيرجّع قيمة المفتاح ده كنص، أو [[null]] لو المفتاح مش موجود (مش error).",
            "فك الـ JWT: خد الجزء اللي في النص (بعد أول نقطة)، فك الـ base64 بـ atob، وحوّله object. هتلاقي فيه اليوزر و exp.",
            "امسح كل حاجة (زي logout يدوي)."
          ],
          sol: R`السطر التالت بيرجع object. جربته على token فيه payload زي ده:

[[{"sub":"42","role":"user","iat":1790000000,"exp":1790000900}]]

[[exp]] بالثواني من ١٩٧٠، فعشان تقراه: [[new Date(1790000900 * 1000)]] = [[2026-09-21T14:28:20.000Z]]. و [[exp - iat]] = ٩٠٠ ثانية، يعني الـ token عمره ربع ساعة. الكود تحت بيطبعلك فاضل قد إيه.

لو طلع [[Cannot read properties of null (reading 'split')]] يبقى مفيش key اسمه [[token]]، اكتب [[localStorage]] وشوف الاسم الحقيقي. ولو طلع [[InvalidCharacterError]] يبقى القيمة مش JWT أو محفوظة بعلامات تنصيص (اعمل [[JSON.parse]] الأول). وافتكر: أي حد معاه الـ token يقدر يقراه كده، فمفيش أسرار في الـ payload.`,
          solCode: R`const p = JSON.parse(atob(localStorage.getItem("token").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
console.log(p, new Date(p.exp * 1000).toISOString(), Math.round((p.exp * 1000 - Date.now()) / 60000) + " min left");`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** في Console: [[localStorage.setItem("n", 5)]] وبعدين [[typeof localStorage.getItem("n")]]، و [[localStorage.setItem("cart", { id: 1 })]] وبعدين [[getItem("cart")]]، و [[getItem("nope")]].`, done: R`طلع [[string]]، و [[[object Object]]]، و [[null]] (اتجرّبوا في Chrome 156). وعارف إن الحل [[JSON.stringify]] و [[JSON.parse]].`, sol: R`~~~js Console
localStorage.setItem("n", 5);
typeof localStorage.getItem("n");
localStorage.setItem("cart", { id: 1 });
localStorage.getItem("cart");
localStorage.getItem("nope");
// الحل
localStorage.setItem("cart", JSON.stringify({ id: 1 }));
JSON.parse(localStorage.getItem("cart"));
~~~

localStorage بيخزّن **نصوص بس**. الرقم [[5]] بقى النص [["5"]]، فلو جمعت عليه هتلزق بدل ما تجمع: [[getItem("n") + 1]] بتطلع [["51"]].

و [[setItem("cart", { id: 1 })]] بيحوّل الـ object لنص بالطريقة الافتراضية، وده [[[object Object]]]، والبيانات ضاعت من وقت الحفظ. مش من وقت القراية. والمفتاح اللي مش موجود بيرجع [[null]]، مش [[undefined]].

الغلطة: تعمل [[JSON.parse(localStorage.getItem("cart"))]] على مفتاح فيه [[[object Object]]] فتاخد [[SyntaxError]]. أو تحفظ [[null]] وتنسى الـ [[?? ]] لما تقرا.

~~~text الناتج
"string"
"[object Object]"
null
{id: 1}
~~~` },
            { lvl: 'تطبيق', t: R`**ابني (draft):** فورم «اكتب تعليق» بيحفظ المسودة في localStorage مع كل كتابة، ويرجّعها لما الصفحة تفتح، ويمسحها بعد الإرسال. ومتحفظش حقل الباسورد أو رقم الكارت أبدًا.`, done: R`ريفريش في نص الكتابة بيرجّع النص، وبعد إرسال المسودة اختفت من Application، ولما مسحت المفتاح من Application يدوي الفورم فتح فاضي من غير error.`, sol: R`~~~html draft.html
<form id="f">
  <textarea id="t" name="comment"></textarea>
  <input id="pw" type="password" name="pw">
  <button>ابعت</button>
</form>
<script>
const KEY = "draft:comment";
t.value = localStorage.getItem(KEY) ?? "";
t.addEventListener("input", () => localStorage.setItem(KEY, t.value));
f.addEventListener("submit", e => {
  e.preventDefault();
  localStorage.removeItem(KEY);
  f.reset();
});
$__lt/script>
~~~

- [[?? ""]]: أول مرة [[getItem]] بيرجع [[null]]، ولو حطيتها في [[t.value]] مباشرة الحقل هيكتب نص فارغ، بس [[??]] بتوضّح القصد ومتكسرش.
- [[input]]: بيشتغل مع كل حرف، بخلاف [[change]] اللي بيشتغل لما تخرج من الحقل.
- [[removeItem]] بعد الإرسال: عشان المسودة متفضلش.
- الباسورد ماله حفظ أصلًا: الكود بيسمع على [[t]] بس. لا تعمل لفة على كل حقول الفورم.

الغلطة: تعمل [[new FormData(f)]] وتحفظ كل الفورم، فتحفظ الباسورد ورقم الكارت في تخزين أي سكربت يقدر يقراه. لو فيه XSS هيبقوا عند المهاجم.

وليه الاسم [[draft:comment]]: مفاتيح localStorage على مستوى الموقع كله، فالبادئة بتمنع التعارض. ولو أكتر من تعليق حط رقمه في المفتاح.

~~~text الناتج
بعد الكتابة وريفريش:     النص رجع «نص نص»
بعد الإرسال وريفريش:     فاضي، و localStorage.length = 0
مسح المفتاح يدوي:        فتح فاضي من غير error
بعد كتابة في الباسورد:   localStorage = {}
~~~` },
            { lvl: 'تطبيق', t: R`**فك JWT:** خد أي JWT (من jwt.io أو اعمله بـ [[node]]) وفكّه بسطر الدرس، واحسب هيخلص إمتى بـ [[new Date(payload.exp * 1000)]].`, done: R`عندك الـ payload كـ object، وتاريخ الانتهاء بتوقيتك، وكاتب إن أي حد معاه التوكن يقدر يقرا ده (مش مشفّر).`, sol: R`~~~bash
node -e "
const b = o => Buffer.from(JSON.stringify(o)).toString('base64url');
const h = b({ alg: 'HS256', typ: 'JWT' });
const p = b({ sub: '42', name: 'Sara', role: 'user', iat: 1793779200, exp: 1793780100 });
const s = require('crypto').createHmac('sha256', 'lab').update(h + '.' + p).digest('base64url');
console.log(h + '.' + p + '.' + s);
"
~~~
~~~js Console
const t = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUiOiJTYXJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3OTM3NzkyMDAsImV4cCI6MTc5Mzc4MDEwMH0.HpfMXBo3F3N224p-PZhOd6CT-v-7EVQ90k_1jq7B8ng";
const p = JSON.parse(atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
p;
new Date(p.exp * 1000).toISOString();
new Date(p.exp * 1000).toLocaleString();
~~~

الـ JWT ٣ أجزاء بينهم نقطة: header و payload و signature. [[split(".")[1]]] بياخد الـ payload. والـ [[replace]] مرتين عشان JWT بيستخدم [[base64url]] و [[atob]] بيفهم [[base64]] العادي. و [[exp]] بالثواني، و [[Date]] بالـ ms، فلازم [[* 1000]].

**مش مشفّر.** ده [[base64]]، يعني أي حد معاه التوكن يقرا اللي جواه من غير أي مفتاح. التوقيع بيمنع التعديل بس، مش القراية. فمتحطش جواه باسورد ولا بيانات حساسة.

الغلطة: تنسى [[* 1000]] فالتاريخ يطلع ١٩٧٠. أو تفتكر إن فك التوكن في المتصفح يعني إنه سليم. الفك مبيتحققش من التوقيع، ده شغل السيرفر.

~~~text الناتج
{sub: "42", name: "Sara", role: "user", iat: 1793779200, exp: 1793780100}
"2026-11-04T08:15:00.000Z"
(و toLocaleString بتوقيت جهازك)
~~~` },
            { lvl: 'تطبيق', t: R`**قيس الحد:** في Console احفظ [[localStorage.setItem("big", "a".repeat(6 * 1024 * 1024))]]. وبعدين امسح واحفظ قِطع كل واحدة [["a".repeat(524288)]] بمفاتيح مختلفة لحد ما يقع.`, done: R`طلع [[QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'big' exceeded the quota.]]، وفي المعمل ٩ قِطع عدّوا والعاشرة وقعت (يعني الحد حوالي ٥ مليون حرف للموقع كله، Chrome 156). وكتبت [[try/catch]] حوالين [[setItem]].`, sol: R`~~~js Console
try {
  localStorage.setItem("big", "a".repeat(6 * 1024 * 1024));
} catch (e) {
  console.log(e.name + ": " + e.message);
}

localStorage.clear();
let n = 0;
try {
  for (let i = 0; i < 20; i++) {
    localStorage.setItem("k" + i, "a".repeat(524288));
    n++;
  }
} catch (e) {
  console.log(n, e.name);
}
localStorage.clear();
~~~

[[524288]] = نص ميجا (2 أس 19) حرف، فالقطع بتتجمع لحد ما تعدي الحد. والحد في Chrome حوالي ٥ مليون حرف للموقع كله، شامل أسامي المفاتيح، مش لكل مفتاح. و ٩ قطع = 4,718,610 حرف عدّت، والعاشرة كانت هتوصل ٥٫٢ مليون.

و [[setItem]] **بيرمي** لما الحد يخلص، ومش بيرجع false. فأي كود بيحفظ بيانات متغيّرة (كاش، مسودة) لازم يبقى جوه [[try/catch]]، وإلا الصفحة كلها هتقع بسبب تخزين. وفي بعض وضعيات التصفح الخاص أو لو المستخدم قافل التخزين، الوصول نفسه ممكن يرمي.

الغلطة: تحفظ بيانات كبيرة في localStorage عشان سهل. لأي حاجة كبيرة استخدم IndexedDB. ولأنه متزامن، قراءة ٥ ميجا بتوقف الصفحة.

~~~text الناتج
QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'big' exceeded the quota.
9 QuotaExceededError
المجموع اللي اتحفظ: 4,718,610 حرف
~~~` },
            { lvl: 'تحدي', t: R`**قارن:** نفس الموقع في تابين: [[sessionStorage.setItem("x", 1)]] في الأول، واقراه في التاني. وبعدين [[localStorage]]. وبعدين افتح تاب تالت بـ «Duplicate tab».`, done: R`[[sessionStorage]] مش ظاهر في التاب التاني، و [[localStorage]] ظاهر، والتاب الـ Duplicate واخد **نسخة** من sessionStorage بتاع الأول. وكاتب ده بيفرق إزاي في سلة شرا.`, sol: R`~~~js تاب ١
sessionStorage.setItem("x", 1);
localStorage.setItem("y", 1);
~~~
~~~js تاب ٢ (نفس الموقع، فتحته بإيدك)
sessionStorage.getItem("x");
localStorage.getItem("y");
~~~
~~~js تاب ٣ (كليك يمين على التاب ثم Duplicate)
sessionStorage.getItem("x");
sessionStorage.setItem("x", 2);
// ارجع للتاب ١
sessionStorage.getItem("x");
~~~

[[localStorage]] واحد لكل الموقع على الجهاز، فكل التابات بتشوفه. [[sessionStorage]] لكل **تاب**. وبيتمسح لما التاب يتقفل، وبيعيش مع الريفريش.

و Duplicate بياخد **نسخة** من sessionStorage وقتها. فلو غيّرت في التاني، الأول مبيتغيّرش، وبعدها الاتنين منفصلين.

**سلة الشرا:** لو في [[localStorage]]، التاب التاني بيشوف نفس السلة، وده غالبًا المطلوب (ولو عايز تحديث لحظي استخدم حدث [[storage]]). لو في [[sessionStorage]]، كل تاب ليه سلة، وده هيخلّي المستخدم يفتكر إن المنتجات ضاعت.

الغلطة: تحط بيانات خطوات فورم في [[localStorage]]، فتاب تاني يكمل على بيانات الأول. ولفورم من خطوات، [[sessionStorage]] أحسن.

Duplicate زرار واجهة، فمش بيتشغّل من سكربت. في المعمل استخدمنا [[window.open]] من التاب، وبينسخ sessionStorage بنفس الطريقة:

~~~text الناتج
التاب ٢:      sessionStorage x = null      localStorage y = "1"
النسخة:       x = "1"
بعد ما النسخة كتبت 2، التاب الأصلي:  x = "1"
~~~` },
            { lvl: 'تحدي', t: R`**اشرحها (أمان):** ليه توكن في localStorage أخطر من كوكي HttpOnly لو حصل XSS؟ وإيه اللي HttpOnly مش هيحميك منه؟ ٤ سطور.`, done: R`كاتب إن أي سكربت بيقرا [[localStorage]] ويبعته بره (التوكن اتسرق ويتستخدم من أي جهاز)، والكوكي HttpOnly مش بتتقري بس الـ XSS يقدر يبعت طلبات من الصفحة وهي مفتوحة. والحل الحقيقي منع الـ XSS نفسه (CSP، درس «Content Security Policy»).`, sol: R`~~~text إجابة نموذجية
لو حصل XSS، سطر واحد بيقرا localStorage.getItem("token") ويبعته لسيرفر المهاجم، فيستخدمه من جهازه لحد ما ينتهي.
الكوكي HttpOnly مش بتتقري من JavaScript، فمفيش حاجة تتسرق وتتاخد لبره.
بس HttpOnly مش هتمنع الـ XSS يبعت fetch من الصفحة، والمتصفح يضيف الكوكي، طول ما الصفحة مفتوحة.
فالفرق حجم الضرر، والحل الحقيقي منع الـ XSS نفسه (escaping و CSP، درس «Content Security Policy»).
~~~

الفرق العملي: التوكن المسروق **بيطلع بره** وبيشتغل من أي مكان بعد ما اليوزر يقفل. أما مع HttpOnly، الهجوم بيعيش طول ما الصفحة مفتوحة بس. وده فرق كبير، بس مش حماية كاملة.

الغلطة: تحط التوكن في متغير JavaScript وتفتكر إنك حليتها. سكربت XSS يقدر يلاقيه برضه بطرق تانية، زي تغيير [[fetch]] نفسها.

اتجرّب جزء HttpOnly في التمرين رقم ٥ بتاع درس Cookies. والتجربة هنا قراية localStorage:

~~~text الناتج
localStorage.getItem("token")   ← بيرجع التوكن كامل لأي سكربت
document.cookie                 "theme=dark"   ← session مش ظاهرة
fetch("/api/me")                {name: "sara"} ← الطلب بيوصل بالكوكي برضه
~~~` },
          ],
        },
        {
          cmd: "Clear site data",
          title: "ابدأ على نضافة",
          desc: "Application ثم Storage ثم Clear site data بيمسح الكوكيز والتخزين والكاش للموقع ده بس، كأنك أول مرة تفتحه. ولو الموقع PWA وبيعرض نسخة قديمة مهما تعمل، ادخل Service workers واعمل Unregister.",
          example: R`Application > Storage > Clear site data
Application > Service workers > Unregister
Or: open the site in an Incognito window`,
          try: "امسح بيانات موقعك وافتحه كزائر جديد.",
          flag: "keys",
          deep: {
            why: "التطبيق بيعرض حاجة قديمة من الكاش، أو عايز تبدأ من أول كأنك زائر جديد.",
            how: R`Application ثم Storage ثم «Clear site data» بيمسح Cookies، وlocalStorage، وsessionStorage، والـ cache. بيخلي الموقع كأنك أول مرة تفتحه.

Service Workers مشكلة شائعة: ممكن يعرض نسخة قديمة حتى بعد Hard Reload. Application ثم Service workers ثم Unregister بيشيله.

أسرع طريقة: افتح الموقع في نافذة Incognito.`,
            when: "لما الـ caching بيسبب مشاكل في التطوير. لما تختبر first-time user experience.",
            mistakes: "تعمل Hard Reload وتفتكر إنه بيمسح localStorage والـ cookies. هو بس بيتخطى الـ HTTP cache للتحميل ده، ومش بيلمس الكوكيز ولا التخزين."
          },
          teach: R`## الأول: إيه اللي بيتمسح فعلًا

الزرار في Application ثم Storage بيمسح كل حاجة الموقع ده حافظها عندك: الكوكيز (حتى الـ HttpOnly)، و localStorage، و sessionStorage، و IndexedDB، والكاش، والـ service workers. أماكن الأزرار من Chrome DevTools docs. والتأثير جربته بأمر بروتوكول DevTools اللي بيعمل نفس الحاجة ([[Storage.clearDataForOrigin]]).

---

## ١. قبل وبعد

قبل المسح:

~~~javascript Console
localStorage.setItem("token", "abc"); sessionStorage.setItem("step", "2"); [document.cookie, localStorage.length, sessionStorage.length]
~~~

~~~text الناتج
["theme=dark", 1, 1]
كوكيز المتصفح كلها: theme, session(HttpOnly)
~~~

بعد Clear site data:

~~~javascript Console
[document.cookie, localStorage.length, sessionStorage.length]
~~~

~~~text الناتج
["", 0, 0]
كوكيز المتصفح كلها: none
~~~

السطر بيرجّع array فيه ٣ أسئلة مرة واحدة: الكوكيز اللي JavaScript شايفها، وعدد مفاتيح localStorage، وعدد مفاتيح sessionStorage. كله بقى فاضي، وكوكي الـ session الـ HttpOnly اتمسحت كمان، فلو كنت logged in هتلاقي نفسك خرجت.

---

## ٢. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[Application > Storage > Clear site data]] | يمسح كل حاجة للـ origin ده بس (مش باقي المواقع) |
| [[Application > Service workers > Unregister]] | يشيل الـ service worker اللي ممكن يكون بيرجّع نسخة قديمة من الكاش بتاعه |
| [[Or: open the site in an Incognito window]] | نافذة جديدة ببيانات فاضية، ومش بتلمس بيانات نافذتك العادية |

## ٣. الفرق عن Hard Reload

| | Hard Reload | Clear site data |
|---|---|---|
| HTTP cache | بيتخطاه للتحميل ده | بيمسحه |
| الكوكيز | سليمة | بتتمسح |
| localStorage | سليم | بيتمسح |
| service worker | فاضل | بيتشال |

## الخلاصة

- Clear site data = الموقع كأنك أول مرة تزوره، وبيخرّجك من الحساب.
- Hard Reload مش بيلمس الكوكيز ولا التخزين.
- Incognito أسرع لو عايز تجرّب كزائر جديد من غير ما تمسح حاجة.`,
          sol: R`بعد Clear site data وريفريش: هتلاقي نفسك عملت logout، وأي banner بتاع cookies أو onboarding هيظهر تاني، وفي Network كل الملفات جاية [[200]] بحجمها الكامل (مفيش memory cache ولا 304). Application ثم Cookies و Local storage هيبقوا فاضيين لحد ما الموقع يكتب فيهم تاني.

لو لسه شايف نفسك logged in، غالبًا الـ session محفوظة على دومين تاني (زي [[auth.yoursite.com]] أو [[.yoursite.com]]) مش الدومين اللي مسحته. ونافذة Incognito بتديك نفس النتيجة من غير ما تمسح بيانات نافذتك العادية.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** قبل ما تعمل Clear site data، اكتب في Console قيمة [[document.cookie]] و [[localStorage.length]] و [[(await caches.keys()).length]]. اعمل Clear، واكتبهم تاني.`, done: R`الـ ٣ قيم قبل وبعد مكتوبة، وبعد المسح [[""]] و [[0]] و [[0]]، والموقع رجع يطلب login.`, sol: R`~~~js Console (قبل)
[document.cookie, localStorage.length, (await caches.keys()).length];
~~~

1. شغّل السطر واكتب القيم.
2. Application ثم Storage ثم Clear site data.
3. شغّل نفس السطر.
4. ريفريش: الموقع هيطلب login.

Clear site data بيمسح كل حاجة بتاعة الموقع ده على جهازك: الكوكيز، و localStorage، و sessionStorage، و IndexedDB، و Cache Storage، و service workers. ودي نفس حالة «زائر جديد».

الغلطة: تعمل ريفريش بعدها والـ service worker القديم كان لسه ماسك صفحة مفتوحة في تاب تاني. اقفل التابات التانية. وكمان الأرقام بتتغيّر حسب اللي بيعمله الموقع، زي مكتبة تعيد إنشاء كاش بعد التحميل. [[(await caches.keys())]] شغالة على https أو localhost بس.

في المعمل استخدمنا [[Storage.clearDataForOrigin]] مع [[storageTypes: "all"]]، وده اللي الزرار بيعمله:

~~~text الناتج
قبل:  ["a=1; c=1", 1, 1]
بعد:  ["", 0, 0]
~~~` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الموقع في نافذة Incognito وفي نافذة عادية بعد Clear site data. فرق إيه؟ (الإضافات، والكوكيز بتاعة مواقع تانية، والـ service worker).`, done: R`كاتب ٣ فروق على الأقل، ومنهم إن Incognito معظم الإضافات مقفولة فيه، و Clear بيمسح الموقع ده بس.`, sol: R`| | Incognito | نافذة عادية بعد Clear site data |
|---|---|---|
| الإضافات | معظمها مقفول، إلا لو سمحت | كلها شغالة، وبتغيّر الصفحة |
| كوكيز مواقع تانية | مفيش خالص | موجودة، و login جوجل مثلًا لسه شغال |
| الـ service worker | جديد ومفيش | اتمسح للموقع ده بس |
| الكاش | فاضي تمامًا | كاش HTTP بتاع الموقع ممكن يتمسح، ومواقع تانية لأ |
| بعد القفل | كل حاجة بتتمسح | البيانات الجديدة بتفضل |

Clear بيمسح **الموقع ده بس**، والباقي زي ما هو. Incognito جلسة جديدة منفصلة.

عشان كده Incognito أحسن لاختبار «هل المشكلة من extension؟»، و Clear site data أحسن لاختبار «هل المشكلة من بيانات الموقع القديمة؟». لو المشكلة راحت في Incognito ورجعت بعد Clear في النافذة العادية، يبقى extension، أو حاجة مشتركة.

الغلطة: تعتبر Incognito «نضيف تمامًا». فيه كوكيز بتتعمل جوه، ولو فتحت أكتر من نافذة Incognito في نفس الوقت بيشاركوا نفس الجلسة.

ده تمرين مقارنة في الواجهة، فالإجابة نموذجية من وثائق Chrome ومش من سكربت:

~~~text الناتج
٣ فروق على الأقل: الإضافات، وكوكيز المواقع التانية، و Clear بيمسح الموقع ده بس.
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** endpoint [[/logout]] بيرجّع header [[Clear-Site-Data: "cookies", "storage"]]. اعمل login (كوكي و localStorage)، وروح [[/logout]].`, done: R`بعد [[/logout]] الكوكي والـ localStorage فاضيين في Application من غير ما الـ JavaScript يمسح حاجة، وكاتب إن الـ header ده بيشتغل على HTTPS أو localhost بس (من MDN).`, sol: R`~~~js server.mjs
import http from "node:http";
http.createServer((req, res) => {
  if (req.url === "/login") {
    res.writeHead(200, { "Set-Cookie": "session=abc; HttpOnly; Path=/", "Content-Type": "application/json" });
    return res.end("{}");
  }
  if (req.url === "/logout") {
    res.writeHead(200, { "Clear-Site-Data": '"cookies", "storage"', "Content-Type": "text/html" });
    return res.end("<!doctype html>bye");
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<!doctype html><h1>home</h1>");
}).listen(8930, "127.0.0.1");
~~~
~~~js Console على الصفحة الرئيسية
await fetch("/login");
localStorage.setItem("a", "1");
~~~

بعدها روح [[/logout]]، وبص في Application.

[[Clear-Site-Data]] السيرفر بيطلب من المتصفح يمسح بيانات الموقع، وده بيوصل حتى لـ HttpOnly اللي JavaScript مش بيقدر يمسحها. وكل قيمة بين دبل كوت لازم. [[cookies]] و [[storage]] (localStorage و IndexedDB و service workers)، وفيه [[cache]] كمان.

الـ header ده بيشتغل على secure context بس: https أو localhost، حسب MDN. و [[127.0.0.1]] secure context. جرّبناها، والقيمة لازم تتكتب بعلامات التنصيص.

الغلطة: تكتب [[Clear-Site-Data: cookies]] من غير الدبل كوت، فالمتصفح يتجاهله. أو تستخدم [[*]] أو [[cache]] على logout عادي، فتمسح كاش الملفات والموقع يحمّل كله تاني، وده بيبطّأ.

~~~text الناتج
قبل /logout:   كوكيز 2   localStorage.length = 1
بعد /logout:   كوكيز 0   localStorage.length = 0
~~~` },
          ],
        },
        {
          cmd: "سيرفر محلي بدل file://",
          title: "الصفحة بتفتح بالدبل كليك بس الـ service worker والـ fetch لأ",
          desc: R`لما تفتح index.html بدبل كليك، العنوان بيبدأ بـ [[file://]]، والمتصفح بيمنع حاجات كتير هناك: service worker، و [[fetch]] لملف JSON جنبها، و [[<script type="module">]]. شغّل سيرفر static صغير في الفولدر وافتح [[http://localhost]]: [[localhost]] المتصفح بيعامله كأنه آمن زي https.`,
          example: R`cd files
python -m http.server 8791 --bind 127.0.0.1
npx serve . -l tcp://127.0.0.1:8791`,
          try: "افتح مشروع PWA بدبل كليك وشوف الأخطاء في Console، وبعدين من [[http://localhost:8791]] وادخل Application ثم Service workers: هتلاقيه activated.",
          flag: "term",
          deep: {
            why: "الكود سليم بس «مش شغال»، والأخطاء في Console شكلها CORS أو «Failed to register a ServiceWorker». بتضيع وقت في الكود والمشكلة إن الصفحة مش جاية من سيرفر.",
            how: R`[[file://]] ملوش origin حقيقي (المتصفح بيعتبره [[null]])، فـ [[fetch('data.json')]] بيتمنع بـ CORS، والـ modules مبتتحمّلش. والـ service worker محتاج «secure context»: https، أو [[localhost]] و [[127.0.0.1]] بالاستثناء.

[[python -m http.server 8791]]: سيرفر static للفولدر الحالي على بورت 8791، جاي مع Python من غير تسطيب. [[--bind 127.0.0.1]] مهمة: من غيرها بيسمع على كل الشبكات، وأي حد على نفس الواي فاي يقدر يفتح ملفاتك. على ويندوز لو [[python]] مش شغال جرّب [[py]].

[[npx serve . -l tcp://127.0.0.1:8791]]: نفس الفكرة من Node. بيضيف ميزات زي إن [[/about]] يفتح [[about.html]]. ولو كتبت البورت بس ([[-l 8791]]) بيسمع على كل الشبكات زي python من غير [[--bind]]، فاكتب [[tcp://127.0.0.1:]] قبل البورت.

بعد ما تعدّل في [[sw.js]]، المتصفح ممكن يفضل على الـ worker القديم. في Application ثم Service workers فعّل Update on reload وانت بتطوّر. وخلي بالك: لو الـ worker بيستخدم cache-first لكل حاجة، أي تعديل مش هيوصل للزوار غير لما تغيّر اسم الكاش.`,
            when: "أي صفحة فيها service worker أو PWA أو fetch لملفات محلية أو ES modules.",
            mistakes: "في مشروع حقيقي sw.js كان cache-first لكل الملفات، فتعديلات index.html مبتوصلش للزوار غير بتغيير اسم الكاش، والأيقونات اللي في الـ manifest مكنتش موجودة فالـ Console مليان 404. وسيرفر التجربة من غير [[--bind 127.0.0.1]] على شبكة عامة."
          },
          teach: R`## الأول: [[file://]] مش origin حقيقي

لما تفتح [[index.html]] بدبل كليك، العنوان بيبقى [[file:///C:/...]]، والمتصفح بيعتبر الـ origin بتاع الصفحة [[null]]. وحاجات كتير ممنوعة على origin [[null]]. الحل: سيرفر صغير على جهازك يقدّم الملفات على [[http://127.0.0.1]].

---

## ١. التجربة: نفس الملفات بطريقتين

فولدر فيه [[index.html]] و [[app.js]] (بيعمل [[fetch("data.json")]] ويسجّل [[sw.js]]) و [[data.json]] و [[sw.js]].

### بالدبل كليك (file://) في Chrome

مع [[<script type="module">]]:

~~~text الناتج في Console
Access to script at 'file:///C:/Users/ali/site/files/app.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token-provider, chrome-extension, chrome-untrusted, data, http, https, isolated-app.
~~~

الملف نفسه مش اتحمّل. ولما خليته script عادي (من غير module):

~~~text الناتج في Console
sw failed: Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.
Access to fetch at 'file:///C:/Users/ali/site/files/data.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: ...
fetch failed: Failed to fetch
~~~

التلاتة اتمنعوا: الـ module، والـ fetch، والـ service worker.

---

## ٢. [[cd files]]

ادخل الفولدر اللي فيه [[index.html]]. السيرفر بيقدّم الفولدر **اللي انت فيه**.

## ٣. [[python -m http.server 8791 --bind 127.0.0.1]]

| الحتة | معناها |
|---|---|
| [[python]] | (على ويندوز ممكن [[py]]، وعلى لينكس والماك [[python3]]) |
| [[-m http.server]] | شغّل الموديول [[http.server]] اللي جاي مع Python كبرنامج |
| [[8791]] | البورت |
| [[--bind 127.0.0.1]] | اسمع على جهازك بس |

~~~text الناتج (Python 3.14 على ويندوز)
Serving HTTP on 127.0.0.1 port 8791 (http://127.0.0.1:8791/) ...
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /app.js HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /data.json HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] code 404, message File not found
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /sw.js HTTP/1.1" 200 -
127.0.0.1 - - [06/Oct/2026 20:50:45] "GET /favicon.ico HTTP/1.1" 404 -
~~~

كل سطر طلب: مين طلب، وإمتى، والـ method والمسار، والـ status. و [[/]] بيرجّع [[index.html]] لوحده. وسطر [[code 404, message File not found]] بتاع طلب الـ favicon (المتصفح بيطلب أيقونة لوحده ومفيش واحدة في الفولدر)، بس اتطبع قبل سطر الطلب بتاعه لأن الطلبات كانت شغالة في نفس الوقت، وده طبيعي. وفي Console نفس الصفحة اشتغلت:

~~~text الناتج في Console
data: {"items":3}
sw registered, scope: http://127.0.0.1:8791/
~~~

ليه ده مسموح؟ لأن [[http://127.0.0.1]] و [[http://localhost]] المتصفح بيعاملهم «secure context» زي https. جربت [[isSecureContext]] على الصفحة ورجع [[true]].

[[Ctrl+C]] في الترمنال يقفل السيرفر.

## ٤. [[npx serve . -l tcp://127.0.0.1:8791]]

- [[npx]]: شغّل باكدج npm من غير ما تسطّبها (بينزّلها مؤقتًا أول مرة).
- [[serve]]: سيرفر static من Vercel.
- [[.]]: الفولدر الحالي.
- [[-l]] (listen): يسمع فين. [[tcp://127.0.0.1:8791]] = على جهازك بس، بورت 8791.

~~~text الناتج
 INFO  Accepting connections at http://127.0.0.1:8791
~~~

> اتأكدت إن [[npx serve . -l 8791]] (بالبورت بس) بيسمع على كل الشبكات: [[Get-NetTCPConnection]] وراني [[LocalAddress ::]] (يعني كل العناوين)، وده نفس خطر python من غير [[--bind]]. عشان كده المثال بقى بـ [[tcp://127.0.0.1:8791]]، وده خلّاه [[127.0.0.1]] بس.

وميزة زيادة: [[serve]] بيشيل [[.html]] من الروابط. طلبت [[/classic.html]] رجّع [[301]] لـ [[/classic]]، و [[/classic]] رجّع الصفحة [[200]].

| | python http.server | npx serve |
|---|---|---|
| محتاج | Python | Node |
| يقفل على جهازك | [[--bind 127.0.0.1]] | [[-l tcp://127.0.0.1:PORT]] |
| [[/about]] يفتح [[about.html]] | لأ | أيوه |

## الخلاصة

- [[file://]] = origin [[null]]: مفيش modules ولا fetch لملفات جنبك ولا service worker.
- سيرفر static على [[127.0.0.1]] بيحل التلاتة، لأن localhost secure context.
- دايمًا قفل السيرفر على [[127.0.0.1]]، مش على كل الشبكة.`,
          lines: [
            "[[cd files]] ادخل الفولدر اللي فيه [[index.html]]: السيرفر بيخدم الفولدر اللي انت واقف فيه.",
            "سيرفر static على بورت 8791، لجهازك بس.",
            "أو نفس الحاجة بـ Node من غير Python، ومقفول على جهازك برضه."
          ],
          sol: R`بالدبل كليك (file://) جربتها في Chromium وطلع في Console:

[[Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.]]
و [[Access to fetch at 'file:///.../data.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: ...]] (ولو الـ script نفسه [[type="module"]] بيتمنع بنفس الرسالة قبل ما يشتغل أصلًا)

من [[http://localhost:8791]] نفس الصفحة اشتغلت: الـ fetch رجع الـ JSON، و [[navigator.serviceWorker.register]] نجح، وفي Application ثم Service workers الحالة [[activated and is running]].

السبب: الـ service worker لازم secure context (HTTPS أو localhost)، و file:// الـ origin بتاعه [[null]]. لو السيرفر ما اشتغلش وطلع [[Address already in use]] غيّر البورت. ولو قالك [[python: command not found]] اكتب [[python3]].`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب ٣ حاجات بتقع على [[file://]] وبتشتغل على [[http://localhost]]، وأمر سيرفر واحد بـ Python وواحد بـ Node.`, done: R`الحاجات: service worker، و [[fetch]] لملف جنبها، و [[<script type="module">]]، والأمرين مقفولين على [[127.0.0.1]].`, sol: R`**٣ حاجات بتقع على [[file://]] وبتشتغل على [[http://localhost]]:**

1. service worker: محتاج origin حقيقي.
2. [[fetch("data.json")]]: ملف جنبها، و origin الصفحة [['null']].
3. [[<script type="module">]]: الـ modules بتتحمّل بـ CORS، فبتقع زي [[fetch]].

~~~bash
python -m http.server 8791 --bind 127.0.0.1
npx serve . -l tcp://127.0.0.1:8791
~~~

ليه [[--bind 127.0.0.1]]: من غيره Python بيسمع على كل الشبكات، فأي حد على نفس الواي فاي يقدر يقرا الفولدر. و [[tcp://127.0.0.1:8791]] نفس الفكرة في [[serve]].

الغلطة: تفتكر إن السيرفر المحلي عشان السرعة. ده عشان **الـ origin**. والفولدر اللي بتشغّل منه السيرفر هو اللي بيتعرض، فمتشغّلوش من فولدر فيه أسرار.

~~~text الناتج (Python)
Serving HTTP on 127.0.0.1 port 8791 (http://127.0.0.1:8791/) ...
~~~` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس [[index.html]] اللي فيه [[fetch("data.json")]]: افتحه بالدبل كليك، وبعدين من السيرفر. اكتب رسالة Console في الأولى بالنص.`, done: R`الأولى فيها رسالة CORS على [[file://]] (أو [[origin 'null']])، والتانية البيانات ظهرت، وفي Network على السيرفر [[200]] لـ [[data.json]].`, sol: R`~~~html index.html
<!doctype html>
<script>
fetch("data.json")
  .then(r => r.json())
  .then(d => console.log("data", JSON.stringify(d)))
  .catch(e => console.log("failed", e.message));
$__lt/script>
~~~
~~~json data.json
{"items":3}
~~~

افتحه بالدبل كليك، وبعدين شغّل سيرفر من نفس الفولدر، وافتح [[http://127.0.0.1:8791/]].

على [[file://]] الـ origin بتاع الصفحة [['null']]، و Chrome بيمنع [[fetch]] لأي ملف، حتى اللي جنبها. لأن صفحة نزّلتها من النت لو قدرت تقرا ملفات جهازك هتبقى كارثة. وعلى السيرفر الاتنين نفس الـ origin.

الغلطة: تعمل flag زي [[--allow-file-access-from-files]] عشان تحلها. ده بيفتح الباب على ملفات جهازك في المتصفح. وقعنا فيها بالصدفة في المعمل: حطيناها بـ [[=false]] واشتغل الـ [[fetch]]، لأن Chrome بيقرا وجود الـ flag مش قيمته. السيرفر المحلي سطر واحد، فاستخدمه.

~~~text الناتج
بالدبل كليك:
Access to fetch at 'file:///C:/Users/ali/site/data.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: ...
Failed to load resource: net::ERR_FAILED
failed Failed to fetch

من السيرفر:
data {"items":3}
Network: data.json  200
~~~` },
            { lvl: 'تحدي', t: R`**ابني:** سيرفر static بـ [[node:http]] في ٢٥ سطر: بيخدم الفولدر، وبيحط [[Content-Type]] صح لـ html و css و js و json و svg، وبيرد [[404]] لملف مش موجود، وبيرفض [[../]] (path traversal).`, done: R`الموقع بيفتح، والـ module scripts شغالة (لو الـ Content-Type غلط بتقع برسالة MIME في Console)، و [[curl --path-as-is http://127.0.0.1:8791/../package.json]] بيرجّع [[403]] أو [[404]] مش الملف.`, sol: R`~~~js static.mjs
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("site");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml" };

http.createServer((req, res) => {
  const raw = decodeURIComponent(req.url.split("?")[0]);
  const file = path.resolve(root, "." + (raw.endsWith("/") ? raw + "index.html" : raw));
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403);
    return res.end("forbidden");
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("not found");
    }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(8791, "127.0.0.1", () => console.log("http://127.0.0.1:8791"));
~~~
~~~bash
curl -si --path-as-is http://127.0.0.1:8791/../secret.txt
curl -si --path-as-is http://127.0.0.1:8791/..%2fsecret.txt
~~~

- [[decodeURIComponent]]: عشان [[%2f]] يبقى [[/]] قبل الفحص، وده أهم سطر. من غيره [[..%2f]] ممكن يعدّي من فحصك.
- [[path.resolve]]: بيحسب المسار النهائي، فأي [[..]] بتتحل.
- [[startsWith(root + path.sep)]]: الفحص الحقيقي. و [[path.sep]] عشان [[C:\site-old]] مايعديش لأنه بيبدأ بـ [[C:\site]].
- [[types]]: الـ modules بترفض أي نوع مش JavaScript.

و [[--path-as-is]] بيخلّي curl يبعت [[../]] زي ما هي، لأنه من غيرها بيشيلها قبل ما يبعت، والاختبار هيبان ناجح وهو ماختبرش حاجة.

الغلطة: تكتب [[path.join(root, req.url)]] من غير فحص. الملف [[secret.txt]] بره [[site/]] هيتقرا. وكمان [[decodeURIComponent]] بيرمي على [[%]] غلط، فلو في الإنتاج لفّه في [[try]]. وده سيرفر معمل مش للإنتاج.

~~~text الناتج
الصفحة بتفتح، و document.title = "m7" (module بيعمل import لـ module)
curl --path-as-is /../secret.txt       HTTP/1.1 403 Forbidden
curl --path-as-is /..%2fsecret.txt     HTTP/1.1 403 Forbidden
/d.json     200 application/json
/nope.css   404 text/plain
/m.js       200 text/javascript
/i.svg      200 image/svg+xml

لو الـ Content-Type غلط:
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/plain". Strict MIME type checking is enforced for module scripts per HTML spec.
~~~` },
          ],
        }
      ]
    }
]);

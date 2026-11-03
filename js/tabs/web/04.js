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
            { lvl: 'سريع', t: R`**مراجعة:** افتح Application ثم Cookies على موقع عامل فيه login، واكتب لكل كوكي: الاسم، و HttpOnly، و Secure، و SameSite، و Expires (ولا Session).`, done: R`جدول بكل الكوكيز، وكوكي الـ session الحقيقية متعلّم عليها HttpOnly، ولو لقيت كوكي session من غير HttpOnly كتبت إن ده خطر XSS.` },
            { lvl: 'تطبيق', t: R`**ابني:** سيرفر Node بيعمل [[Set-Cookie]] لـ ٣ كوكيز: [[a=1]] عادية، و [[b=1; HttpOnly]]، و [[c=1; Max-Age=10]]. في Console اكتب [[document.cookie]] على طول وبعد ١٥ ثانية.`, done: R`أول مرة [[a=1; c=1]] (من غير [[b]])، وبعد ١٥ ثانية [[a=1]] بس. و [[b]] ظاهرة في Application وفي Request Headers بتاعة كل طلب.` },
            { lvl: 'تطبيق', t: R`**اختبر الـ session:** على موقعك امسح كوكي الـ session من Application (Delete)، وبعدين دوس على أي زرار محتاج login.`, done: R`كاتب اللي حصل: الـ API رجّع [[401]] والصفحة ودّتك للـ login (سليم)، أو فضلت شغالة بيانات قديمة أو وقعت (باج تكتبه وتصلّحه).` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** ابعت [[Set-Cookie: s=1; SameSite=None]] من غير [[Secure]]. هل اتحفظت؟ دوّر في Network على الرد، في تاب Cookies بتاع الطلب، على السبب.`, done: R`الكوكي مااتحفظتش، وجنبها تحذير إن [[SameSite=None]] لازم معاها [[Secure]] (في البروتوكول السبب [[SameSiteNoneInsecure]]، اتجرّب في Chrome 156).` },
            { lvl: 'تحدي', t: R`**قارن:** كوكي بـ [[Domain=shop.test]] وكوكي من غير [[Domain]]، من [[shop.test]]. افتح [[api.shop.test]] (اعمل الاسمين في [[hosts]] أو بـ [[--host-resolver-rules]]): أنهي واحدة وصلت؟`, done: R`اللي فيها [[Domain]] بتوصل للـ subdomains كمان، واللي من غيره (host-only) بتوصل لـ [[shop.test]] بس. وكاتب إمتى تحتاج الأولى (login مشترك) وإمتى التانية أأمن.` },
            { lvl: 'تحدي', t: R`**اشرحها:** HttpOnly بيحمي من إيه بالظبط ومبيحميش من إيه؟ ٤ سطور فيها: سرقة الكوكي بـ XSS، والطلبات اللي الـ XSS بيبعتها بنفسه، و CSRF.`, done: R`كاتب إن HttpOnly بيمنع **قراية** الكوكي من JavaScript، بس سكربت XSS لسه يقدر يبعت [[fetch]] والكوكي هتتبعت معاه، و CSRF محتاج SameSite أو token مش HttpOnly.` },
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
            { lvl: 'سريع', t: R`**مراجعة:** املى الجدول من دماغك: [[Strict]] و [[Lax]] و [[None]] ومن غير SameSite، مع فورم POST ولينك GET وصورة من موقع تاني.`, done: R`١٢ خانة صح، ومعلّم على خانة «من غير SameSite + فورم POST» إنها بتتبعت أول دقيقتين بس.` },
            { lvl: 'تطبيق', t: R`**ابني المعمل:** اعمل السيرفر بـ ٣ أسامي، واكتب جدول الدرس بإيدك من لوج السيرفر.`, done: R`الجدول بتاعك مطابق للي في الدرس، وفيه صف [[api.shop.test]] و [[Strict]] وصلت.` },
            { lvl: 'تطبيق', t: R`**صلّح:** endpoint [[GET /account/delete?confirm=1]] في موقعك القديم. اكتب صفحة على موقع تاني بتمسح حساب اليوزر بلينك، وبعدين صلّح الـ endpoint.`, done: R`قبل التصليح الحساب اتمسح من لينك من موقع تاني (والكوكي Lax)، وبعد ما بقى [[POST]] ومعاه فحص [[Sec-Fetch-Site]]: نفس اللينك رجع [[404]] أو [[405]]، وفورم POST من موقع تاني رجع [[403]].` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** test (بـ [[node:test]] و [[fetch]]) بيبعت POST لسيرفرك بـ [[sec-fetch-site: cross-site]] ومرة [[same-origin]] ومرة من غير، ويتأكد إن الأولى [[403]] والباقي [[200]].`, done: R`الاختبار بيعدّي، ولما شيلت سطر الفحص من السيرفر الاختبار الأول وقع. (Node [[fetch]] بيسمح تحط [[sec-fetch-site]] بإيدك، المتصفح لأ: اتجرّب.)` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** خلّي استثناء الدقيقتين يبان: اعمل login، وابعت الفورم من [[evil.test]] على طول، وبعد ٦٠ ثانية، وبعد ١٢٥ ثانية. الكوكي اللي من غير SameSite وصلت إمتى؟`, done: R`وصلت في أول مرتين ومراحتش في التالتة، وفي DevTools ثم Network ثم Cookies (مع «show filtered out») ظهرت متمنعة بسبب SameSite في المرة التالتة.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميل بيقول «حطينا CORS بـ origin بتاعنا بس، يبقى مفيش CSRF». اكتبله ٤ سطور بالمعمل.`, done: R`السطور فيها: الفورم HTML مش محتاج CORS أصلًا، والـ [[fetch]] بـ [[mode: "no-cors"]] اتبعت ووصل السيرفر (لوج المعمل)، و CORS بيمنع قراية الرد بس، والحماية SameSite و [[Sec-Fetch-Site]]/[[Origin]] أو token.` },
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
            { lvl: 'سريع', t: R`**مراجعة:** في Console: [[localStorage.setItem("n", 5)]] وبعدين [[typeof localStorage.getItem("n")]]، و [[localStorage.setItem("cart", { id: 1 })]] وبعدين [[getItem("cart")]]، و [[getItem("nope")]].`, done: R`طلع [[string]]، و [[[object Object]]]، و [[null]] (اتجرّبوا في Chrome 156). وعارف إن الحل [[JSON.stringify]] و [[JSON.parse]].` },
            { lvl: 'تطبيق', t: R`**ابني (draft):** فورم «اكتب تعليق» بيحفظ المسودة في localStorage مع كل كتابة، ويرجّعها لما الصفحة تفتح، ويمسحها بعد الإرسال. ومتحفظش حقل الباسورد أو رقم الكارت أبدًا.`, done: R`ريفريش في نص الكتابة بيرجّع النص، وبعد إرسال المسودة اختفت من Application، ولما مسحت المفتاح من Application يدوي الفورم فتح فاضي من غير error.` },
            { lvl: 'تطبيق', t: R`**فك JWT:** خد أي JWT (من jwt.io أو اعمله بـ [[node]]) وفكّه بسطر الدرس، واحسب هيخلص إمتى بـ [[new Date(payload.exp * 1000)]].`, done: R`عندك الـ payload كـ object، وتاريخ الانتهاء بتوقيتك، وكاتب إن أي حد معاه التوكن يقدر يقرا ده (مش مشفّر).` },
            { lvl: 'تطبيق', t: R`**قيس الحد:** في Console احفظ [[localStorage.setItem("big", "a".repeat(6 * 1024 * 1024))]]. وبعدين امسح واحفظ قِطع كل واحدة [["a".repeat(524288)]] بمفاتيح مختلفة لحد ما يقع.`, done: R`طلع [[QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'big' exceeded the quota.]]، وفي المعمل ٩ قِطع عدّوا والعاشرة وقعت (يعني الحد حوالي ٥ مليون حرف للموقع كله، Chrome 156). وكتبت [[try/catch]] حوالين [[setItem]].` },
            { lvl: 'تحدي', t: R`**قارن:** نفس الموقع في تابين: [[sessionStorage.setItem("x", 1)]] في الأول، واقراه في التاني. وبعدين [[localStorage]]. وبعدين افتح تاب تالت بـ «Duplicate tab».`, done: R`[[sessionStorage]] مش ظاهر في التاب التاني، و [[localStorage]] ظاهر، والتاب الـ Duplicate واخد **نسخة** من sessionStorage بتاع الأول. وكاتب ده بيفرق إزاي في سلة شرا.` },
            { lvl: 'تحدي', t: R`**اشرحها (أمان):** ليه توكن في localStorage أخطر من كوكي HttpOnly لو حصل XSS؟ وإيه اللي HttpOnly مش هيحميك منه؟ ٤ سطور.`, done: R`كاتب إن أي سكربت بيقرا [[localStorage]] ويبعته بره (التوكن اتسرق ويتستخدم من أي جهاز)، والكوكي HttpOnly مش بتتقري بس الـ XSS يقدر يبعت طلبات من الصفحة وهي مفتوحة. والحل الحقيقي منع الـ XSS نفسه (CSP، درس «Content Security Policy»).` },
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
            { lvl: 'سريع', t: R`**مراجعة:** قبل ما تعمل Clear site data، اكتب في Console قيمة [[document.cookie]] و [[localStorage.length]] و [[(await caches.keys()).length]]. اعمل Clear، واكتبهم تاني.`, done: R`الـ ٣ قيم قبل وبعد مكتوبة، وبعد المسح [[""]] و [[0]] و [[0]]، والموقع رجع يطلب login.` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الموقع في نافذة Incognito وفي نافذة عادية بعد Clear site data. فرق إيه؟ (الإضافات، والكوكيز بتاعة مواقع تانية، والـ service worker).`, done: R`كاتب ٣ فروق على الأقل، ومنهم إن Incognito معظم الإضافات مقفولة فيه، و Clear بيمسح الموقع ده بس.` },
            { lvl: 'تحدي', t: R`**ابني:** endpoint [[/logout]] بيرجّع header [[Clear-Site-Data: "cookies", "storage"]]. اعمل login (كوكي و localStorage)، وروح [[/logout]].`, done: R`بعد [[/logout]] الكوكي والـ localStorage فاضيين في Application من غير ما الـ JavaScript يمسح حاجة، وكاتب إن الـ header ده بيشتغل على HTTPS أو localhost بس (من MDN).` },
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
            { lvl: 'سريع', t: R`**مراجعة:** اكتب ٣ حاجات بتقع على [[file://]] وبتشتغل على [[http://localhost]]، وأمر سيرفر واحد بـ Python وواحد بـ Node.`, done: R`الحاجات: service worker، و [[fetch]] لملف جنبها، و [[<script type="module">]]، والأمرين مقفولين على [[127.0.0.1]].` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس [[index.html]] اللي فيه [[fetch("data.json")]]: افتحه بالدبل كليك، وبعدين من السيرفر. اكتب رسالة Console في الأولى بالنص.`, done: R`الأولى فيها رسالة CORS على [[file://]] (أو [[origin 'null']])، والتانية البيانات ظهرت، وفي Network على السيرفر [[200]] لـ [[data.json]].` },
            { lvl: 'تحدي', t: R`**ابني:** سيرفر static بـ [[node:http]] في ٢٥ سطر: بيخدم الفولدر، وبيحط [[Content-Type]] صح لـ html و css و js و json و svg، وبيرد [[404]] لملف مش موجود، وبيرفض [[../]] (path traversal).`, done: R`الموقع بيفتح، والـ module scripts شغالة (لو الـ Content-Type غلط بتقع برسالة MIME في Console)، و [[curl --path-as-is http://127.0.0.1:8791/../package.json]] بيرجّع [[403]] أو [[404]] مش الملف.` },
          ],
        }
      ]
    },
    {
      t: "ابعت طلبات بنفسك",
      l: 3,
      n: "",
      projects: [
        { lvl: 'صغير', t: R`مجموعة طلبات API بـ curl`, what: R`ملف [[api.http.sh]] فيه دوال bash لكل endpoint في مشروعك ([[login]] و [[me]] و [[orders]]) بتقرا التوكن من متغير بيئة، وكل واحدة بتطبع الـ status والوقت. من دروس «curl -i / -v» و «Copy as cURL».`, done: R`[[source api.http.sh && me]] بيطبع اليوزر، ومفيش توكن مكتوب في الملف، وكل دالة بتطبع [[HTTP 401]] واضحة لو التوكن مش موجود.` },
        { lvl: 'صغير', t: R`[[fetch]] بـ timeout و retry في Console`, what: R`Snippet فيه دالة [[api(path, opts)]] بـ [[AbortSignal.timeout]] و retry على [[5xx]] بـ backoff، تستخدمها من Console على موقعك. من درس «fetch من Console».`, done: R`على endpoint بطيء بيطبع [[TimeoutError: signal timed out]]، وعلى [[503]] مرتين وبعدين [[200]] بيرجّع البيانات، و Network فيه ٣ طلبات.` },
        { lvl: 'متوسط', t: R`محوّل Copy as cURL لسكربت`, what: R`أداة بتاخد أمر Copy as cURL، وتشيل الـ headers اللي مالهاش لازمة، وتستبدل الكوكي والتوكن بمتغيرات بيئة، وتطلّع نسخة bash و PowerShell و [[fetch]]. من درس «Copy as cURL».`, done: R`على أمر حقيقي النسخ التلاتة بيرجّعوا نفس الرد، ومفيش قيمة كوكي في الناتج، والـ headers قلّت للي لازم بس.` },
        { lvl: 'متوسط', t: R`smoke test بعد النشر`, what: R`سكربت بيطلب ١٠ endpoints و صفحات بعد كل نشر، ويتأكد من الـ status والـ content-type ووقت أقل من حد، ويطبع جدول، ويخرج [[1]] لو أي حاجة وقعت. من دروس الوحدة و «التعديل وصل؟ curl و grep».`, done: R`على السيرفر السليم كله أخضر و exit [[0]]، ولما وقفت الـ API بيطلّع [[502]] للـ endpoints دي و exit [[1]]، وشغال في bash و PowerShell.` },
        { lvl: 'كبير', t: R`عميل API صغير بتاعك (زي Postman مصغّر)`, what: R`CLI بيقرا ملف YAML أو JSON فيه طلبات (method و URL و headers و body) ومتغيرات لكل بيئة (dev و staging)، ويشغّل طلب أو كله، ويحفظ قيم من الرد (توكن الـ login) للطلبات اللي بعده، ويطبع الرد ملوّن، وبيعمل assertions بسيطة ([[status == 200]]).`, done: R`سلسلة login ثم me ثم create order بتشتغل بأمر واحد والتوكن بيتنقل لوحده، و assertion واقع بيوقّف ويطبع الفرق، والأسرار من متغيرات بيئة مش من الملف.`, ext: R`زوّد import لـ HAR أو Copy as cURL، وتقرير JUnit عشان يشتغل في CI.` },
        { lvl: 'فكرة', t: R`أداة «اعمل الطلب ده تاني» لفريق الدعم`, what: R`أداة بتاخد طلب فاشل من يوزر (HAR أو cURL منسوخ)، وتشيل البيانات الحساسة، وتعيده على staging، وتقارن الرد. انت بتختار الواجهة.`, done: R`طلب حقيقي فاشل اتعاد واتشاف نفس الخطأ، ومفيش توكن يوزر اتخزّن ولا اتطبع، وفيه README للدعم الفني.`, ext: R`زوّد زرار «افتح issue» بيحط الطلب المتنضّف والرد في issue جاهز.` },
      ],
      items: [
        {
          cmd: "fetch من Console",
          title: "أسرع طريقة تجرب API",
          desc: "الطلب بيتبعت كأنه من الصفحة نفسها، يعني بالكوكيز بتاعتك. لو انت عامل login على موقعك، تقدر تكلّم الـ API بتاعه كيوزر مسجّل من غير ما تجيب توكن. لو بتكلّم دومين تاني، قواعد CORS هتطبق. Shift+Enter بتنزل سطر جديد في Console من غير ما تنفّذ.",
          example: R`await fetch("/api/me").then(r => r.json())

await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "test", email: "test@example.com" })
}).then(r => r.json())`,
          try: "اعمل GET و POST للـ API بتاعك من Console وشوفهم ظاهرين في Network.",
          flag: "console",
          deep: {
            why: "عايز تجرّب API endpoint بسرعة من غير Postman. والطلب بييجي من الـ browser session، فالـ cookies والـ auth موجودين.",
            how: R`أي JavaScript بتكتبه في Console بيتنفّذ في context الصفحة الحالية. لو انت logged in، الطلب بيتبعت بكوكياتك أوتوماتيك.

[[await fetch(...)]] بيشتغل في Console. بعد [[.then(r => r.json())]] بيفتح الناتج كـ object تقدر تعدّيه.

الطلب بيظهر في تاب Network عادي، فتقدر تشوف كل تفاصيله.

Shift+Enter بينزّلك سطر جديد من غير تنفيذ، عشان تكتب كود متعدد الأسطر.`,
            when: "تجرّب endpoint جديد. تبعث بيانات معينة وتشوف الرد. تتأكد إن الـ auth شغال.",
            mistakes: "تستخدمه لطلبات مهمة وتنسى إنهم بيتنفّذوا فعلًا. DELETE في Console بيمسح فعلًا."
          },
          teach: R`## الأول: الطلب بيطلع من الصفحة نفسها

لما تكتب [[fetch]] في Console، الطلب بيتبعت كأن الصفحة هي اللي عملته: نفس الـ origin، ونفس الكوكيز. فلو انت logged in، الـ API هيعاملك كيوزر مسجّل. المثالين اتشغّلوا في Console في Chrome على صفحة على [[http://127.0.0.1:8791]] و API محلي بـ Express.

---

## ١. الـ GET: [[await fetch("/api/me").then(r => r.json())]]

من جوه لبرة:

1. [[fetch("/api/me")]]: ابعت GET (الافتراضي) لـ [[/api/me]] على نفس الموقع. بيرجّع **Promise** (وعد بنتيجة هتيجي بعدين).
2. [[.then(r => r.json())]]: لما الرد ييجي، سمّيه [[r]] واقرا الـ body كـ JSON. وده كمان Promise.
3. [[await]]: استنى لحد ما كله يخلص وهات النتيجة.

~~~text الناتج
{id: 42, name: 'Ali', role: 'user'}
~~~

ومن غير [[await]]:

~~~text fetch("/api/me").then(r => r.json())
Promise {<pending>}
~~~

بتاخد الـ Promise نفسه مش القيمة. فـ [[await]] هو اللي بيطلّع النتيجة.

---

## ٢. الـ POST سطر سطر

~~~javascript Console
await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "test", email: "test@example.com" })
}).then(r => r.json())
~~~

اكتبه بـ Shift+Enter بين السطور، و Enter في الآخر.

| السطر | معناه |
|---|---|
| [[fetch("/api/users", {]] | الـ URL، وبعده object إعدادات الطلب |
| [[method: "POST",]] | نوع الطلب (الافتراضي GET) |
| [[headers: { "Content-Type": "application/json" },]] | قول للسيرفر «البودي JSON» |
| [[body: JSON.stringify({...})]] | البودي لازم نص، فـ [[JSON.stringify]] بيحوّل الـ object لنص JSON |
| [[}).then(r => r.json())]] | قفلة الإعدادات والـ fetch، وبعدين اقرا الرد JSON |

~~~text الناتج
{id: 7, name: 'test', email: 'test@example.com'}
~~~

الـ API رجّع الـ user الجديد ومعاه [[id]]، والـ status كان [[201]] (شفته بـ [[r.status]] في طلب تاني).

[[JSON.stringify]] لوحده:

~~~text JSON.stringify({ name: "test" })
'{"name":"test"}'
~~~

---

## ٣. جربت أشيل الـ Content-Type

~~~javascript Console
await fetch("/api/users", { method: "POST", body: JSON.stringify({ name: "no header" }) }).then(r => r.json())
~~~

~~~text الناتج
{id: 9}
~~~

الطلب نجح بس الاسم **ضاع**. من غير الـ header، المتصفح بيبعت النص بنوع [[text/plain]]، و [[express.json()]] بيقرا الـ body بس لو النوع [[application/json]]، فالسيرفر شاف body فاضي. ده خطأ صامت: مفيش error، بس الداتا مش وصلت.

## الخلاصة

- [[fetch]] من Console = من الصفحة، بكوكيزك وبقواعد CORS بتاعتها.
- [[await]] عشان تشوف القيمة مش [[Promise]].
- POST بـ JSON محتاج التلاتة: [[method]] و [[Content-Type]] و [[JSON.stringify]].
- الطلبات دي حقيقية: POST بيعمل، و DELETE بيمسح.`,
          lines: [
            "GET وحوّل الرد JSON. [[await]] شغال في Console مباشرة.",
            "POST لنفس الـ API.",
            "[[method: \"POST\"]] نوع الطلب: من غيره [[fetch]] بيبعت GET، والسيرفر هيرجّع الليستة بدل ما ينشئ حاجة.",
            "قول للسيرفر إن البودي JSON، وإلا ممكن يتجاهله.",
            "البودي لازم يتحوّل لنص بـ stringify.",
            "[[.then(r => r.json())]] حوّل الرد لـ object. لو السيرفر رجّع HTML (صفحة خطأ) هنا بالظبط هيطلع [[Unexpected token '<']]."
          ],
          sol: R`الـ GET بيرجع البيانات مباشرة في Console (object أو array)، والـ POST بيرجع اللي الـ API بيرجعه بعد الإنشاء (غالبًا الـ object الجديد ومعاه [[id]]). وفي تاب Network (فلتر Fetch/XHR) هتلاقي الطلبين، وفي عمود Initiator مكتوب حاجة زي [[VM123:1]] يعني جايين من Console.

دوس على الـ POST: في Payload هتلاقي [[{"name":"test","email":"test@example.com"}]]، والـ status [[201]] لو الـ API مكتوب صح. لو رجع [[400]] أو [[415]] غالبًا نسيت [[Content-Type: application/json]] فالسيرفر مقراش الـ body. ولو الـ GET رجع [[401]] وانت عامل login، يبقى الـ API على دومين تاني والكوكي ما اتبعتتش (محتاج [[credentials: "include"]]).`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من دماغك [[fetch]] بـ POST و JSON (التلات حاجات اللي لازم تبقى موجودة)، وشغّله على أي API تجريبي عندك، ولاقي الطلب في Network وعمود Initiator.`, done: R`الطلب اتبعت بـ [[method]] و [[Content-Type: application/json]] و [[JSON.stringify]]، والـ Initiator مكتوب فيه حاجة زي [[VM123:1]] (يعني من Console).` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[const r = fetch("/api/me"); r.status]]. هيطبع إيه؟ وبعدين [[(await fetch("/api/me")).status]]؟`, done: R`الأول [[undefined]] (لأن [[r]] لسه [[Promise]] مش [[Response]])، والتاني الرقم. وكاتب إن [[await]] شغال في Console من غير [[async]] بس مش في ملف عادي.` },
            { lvl: 'تطبيق', t: R`**ابني:** دالة [[api(path, body)]] في Console بتبعت GET لو مفيش body و POST بـ JSON لو فيه، وترمي error فيه الـ status لو [[!res.ok]]، وترجّع JSON أو [[null]] لو [[204]].`, done: R`[[await api("/api/me")]] بيرجّع object، و [[await api("/nope")]] بيرمي [[HTTP 404]]، و DELETE بـ [[204]] بيرجّع [[null]] من غير [[Unexpected end of JSON input]].` },
            { lvl: 'تطبيق', t: R`**timeout و إلغاء:** endpoint بيستنى ٣ ثواني. ابعتله [[fetch(url, { signal: AbortSignal.timeout(1000) })]]، ومرة تانية بـ [[AbortController]] و [[abort()]] على طول.`, done: R`الأولى [[TimeoutError: signal timed out]] والتانية [[AbortError: signal is aborted without reason]] (اتجرّبوا في Chrome 156)، والطلب في Network مكتوب [[(canceled)]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ٥ طلبات ورا بعض بـ [[await]] في loop، وبعدين نفس الـ ٥ بـ [[Promise.all]]، على endpoint بيستنى ٥٠٠ms. قيس بـ [[performance.now()]].`, done: R`الـ loop حوالي ٢٥٠٠ms و [[Promise.all]] حوالي ٥٠٠ms، وفي Waterfall الأولى درجات سلّم والتانية عمود واحد.` },
            { lvl: 'تحدي', t: R`**صلّح:** [[fetch("/api/save", { method: "POST", body: { name: "x" } })]] والسيرفر بيقول البودي فاضي. بص في Payload، واكتب ليه، وصلّحه.`, done: R`Payload كان [[[object Object]]] و [[Content-Type: text/plain;charset=UTF-8]]، والتصليح [[JSON.stringify]] و [[Content-Type: application/json]]، والسيرفر استلم [[{"name":"x"}]].` },
          ],
        },
        {
          cmd: "Copy as cURL",
          title: "خد أي طلب وكرره من الترمنال",
          desc: "كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL. الطلب هيتنسخ بكل الـ headers والكوكيز والبودي، فتلصقه في الترمنال وتعدّل فيه اللي انت عايزه. على ويندوز اختار «(bash)» لو هتشغّله في Git Bash أو WSL، أو «Copy as PowerShell». وخد بالك: الأمر المنسوخ فيه الكوكيز والتوكن بتوعك، فمتبعتهوش لحد ومتحطهوش في issue على GitHub.",
          example: R`curl 'https://example.com/api/orders' -H 'accept: application/json' -H 'cookie: session=...' --compressed
curl -i 'https://example.com/api/orders?page=2' -H 'cookie: session=...'`,
          try: "انسخ طلب من موقعك، وشغّله في الترمنال، وغيّر فيه page أو أي parameter.",
          flag: "term",
          deep: {
            why: "لاقيت طلب في Network فيه مشكلة وعايز تجرّبه من الترمنال. Copy as cURL بيحوّله لأمر جاهز بكل الـ headers والكوكيز.",
            how: R`كليك يمين على أي طلب في Network ثم Copy ثم Copy as cURL (bash). الأمر فيه: الـ URL، وكل الـ headers، والـ body لو POST.

تلصقه في الترمنال وتشغّله. تقدر تعدّل: الـ URL، أو قيمة header، أو الـ body.

تحذير: الأمر بيتضمن cookies وTokens الـ session الحقيقية. متبعتهوش في رسايل أو تحطه على GitHub.`,
            when: "Bug في API وعايز تعزله. تشارك الطلب مع backend developer.",
            mistakes: "تنسى تغيير الكوكيز والتوكنات قبل ما تشارك."
          },
          teach: R`## الأول: الطلب كله في أمر واحد

Copy as cURL في Network بيحوّل الطلب لأمر [[curl]] فيه كل حاجة: الـ URL والـ method والـ headers والكوكيز والبودي. مكان الأمر في القايمة من Chrome DevTools docs. والأوامر اللي تحت اتشغّلت بـ [[curl.exe]] في PowerShell 7 على API محلي.

---

## ١. السطر الأول

~~~bash
curl 'https://example.com/api/orders' -H 'accept: application/json' -H 'cookie: session=...' --compressed
~~~

| الحتة | معناها |
|---|---|
| [[curl 'URL']] | الطلب، و GET لأن مفيش [[-X]] ولا بودي |
| [[-H 'accept: application/json']] | header: «عايز الرد JSON» |
| [[-H 'cookie: session=...']] | الكوكي بتاعتك. ده اللي بيخلي الطلب «logged in» |
| [[--compressed]] | اطلب رد مضغوط (gzip أو br) وفكّه، زي المتصفح |

الأمر الحقيقي بيبقى أطول بكتير ([[user-agent]] و [[referer]] و [[sec-ch-ua]]...)، ومعظمهم ممكن تمسحه.

جربته على السيرفر المحلي:

~~~powershell
curl.exe 'http://127.0.0.1:8791/api/orders' -H 'accept: application/json' -H 'cookie: session=s3cr3t' --compressed
~~~

~~~text الناتج
{"page":1,"orders":[{"id":11,"total":250},{"id":12,"total":90}]}
~~~

## ٢. السطر التاني: عدّلت فيه

~~~powershell
curl.exe -i 'http://127.0.0.1:8791/api/orders?page=2' -H 'cookie: session=s3cr3t'
~~~

~~~text الناتج
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 64

{"page":2,"orders":[{"id":21,"total":250},{"id":22,"total":90}]}
~~~

- [[?page=2]]: query parameter، والـ API رجّع الصفحة التانية.
- [[-i]]: اطبع headers الرد قبل البودي، فتشوف الـ status.
- الـ URL جوه علامات تنصيص عشان [[?]] و [[&]] ليهم معنى في الـ shell.

---

## ٣. أنهي نسخة تنسخ

| هتشغّله في | اختار |
|---|---|
| Git Bash أو WSL أو لينكس أو ماك | Copy as cURL (bash) |
| CMD | Copy as cURL (cmd) |
| PowerShell | Copy as PowerShell (بيطلع [[Invoke-WebRequest]]) أو نسخة bash مع [[curl.exe]] في PowerShell 7 |

الفرق في علامات التنصيص: bash بيستخدم [['...']]، و CMD مبيفهمش الـ single quotes.

## الخلاصة

- Copy as cURL = نفس الطلب بالظبط، تعدّل فيه وتعيده.
- فيه كوكيز وتوكن حقيقيين: متشاركهوش من غير ما تمسحهم.
- لو رجع 401 بعد شوية، الـ session خلصت، انسخه تاني.`,
          lines: [
            "اللي بيطلع من Copy as cURL: الـ URL، وكل header ([[-H]]) بما فيهم الكوكي، و [[--compressed]] يقبل رد مضغوط.",
            "نفس الطلب بعد ما عدّلت فيه: صفحة تانية، و [[-i]] عشان تشوف الـ status."
          ],
          sol: R`في Network كليك يمين على الطلب ثم Copy ثم Copy as cURL (bash). هتلاقي أمر طويل فيه [[-H 'cookie: ...']] و headers كتير. الصقه في الترمنال، المفروض يرجع نفس الـ JSON اللي شايفه في Preview.

غيّر [[page=1]] لـ [[page=2]] في الـ URL (خليه جوه علامات التنصيص عشان [[&]] و [[?]]) وشغّله، هتاخد الصفحة اللي بعدها. زوّد [[-i]] عشان تشوف الـ status.

لو رجعلك [[401]] بعد شوية، الكوكي أو الـ token خلصوا، انسخ الطلب تاني. ولو الناتج رموز غريبة يبقى نسيت [[--compressed]]. وعلى ويندوز اختار «Copy as cURL (cmd)» أو شغّله من Git Bash/WSL لأن علامات التنصيص مختلفة.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** انسخ أي طلب API بـ Copy as cURL (bash)، والصقه في محرر، وعلّم على: الـ URL، والـ headers اللي مالهاش لازمة، والكوكي.`, done: R`عارف تشيل [[sec-ch-ua]] و [[sec-fetch-*]] و [[user-agent]] والطلب لسه بيشتغل، والكوكي متعلّم عليها كـ «سر».` },
            { lvl: 'تطبيق', t: R`**صغّره:** خد الأمر المنسوخ وشيل header ورا header لحد ما تلاقي أقل أمر لسه بيرجّع نفس الرد. اكتب الـ headers اللي طلعت لازمة.`, done: R`الأمر النهائي ٢–٣ headers بس (غالبًا [[cookie]] أو [[authorization]] و [[content-type]])، ونفس الـ status والـ body.` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الطلب Copy as cURL (bash) و Copy as cURL (cmd) و Copy as PowerShell و Copy as fetch. شغّل كل واحد في المكان الصح.`, done: R`الأربعة رجّعوا نفس الرد، وكاتب الفرق في علامات التنصيص: bash بـ [[']]، و cmd بـ [[^]] والدبل، و PowerShell بيستخدم [[Invoke-WebRequest]] و [[-WebSession]].` },
            { lvl: 'تحدي', t: R`**ابني:** سكربت [[replay.sh]] بياخد الأمر المنسوخ من ملف، ويشيل الكوكي ويحط مكانها [[$SESSION]] من متغير بيئة، ويشغّله ٣ مرات ويطبع الـ status والوقت بـ [[-w]].`, done: R`مفيش كوكي مكتوبة في السكربت ([[grep -c session= replay.sh]] = [[0]])، والسكربت بيطبع ٣ سطور فيهم الـ status والوقت.` },
            { lvl: 'تحدي', t: R`**اشرحها (أمان):** زميل حط Copy as cURL في issue عام على GitHub. اكتب الخطوات بالترتيب اللي لازم تتعمل دلوقتي.`, done: R`الخطوات: امسح أو عدّل الـ issue، و logout من كل الأجهزة أو اعمل revoke للـ session والتوكن من السيرفر (المسح من GitHub مش كفاية لأن حد ممكن يكون نسخه)، وبعدين امسح الكوكي من الأمر قبل أي مشاركة.` },
          ],
        },
        {
          cmd: "curl -i / -v",
          title: "ابعت واقرا الرد كامل",
          desc: "[[-i]] بيطبع الـ headers والبودي، و [[-v]] بيطبع كمان الطلب اللي اتبعت نفسه والـ TLS handshake. [[-H]] بيزوّد header، و [[-d]] بيبعت البودي (ومعاه بيبقى POST لوحده)، و [[-X]] بيغيّر الـ method. ولو الرد JSON وصّله بـ [[jq]] يطلع منسّق. وده أسرع طريقة تعرف الغلط في السيرفر ولا في المتصفح: لو curl رجّع نفس الرد، المتصفح بريء.",
          example: R`curl -i https://api.github.com/users/octocat
curl -s https://api.github.com/users/octocat | jq '{name, public_repos}'
curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret"}'
curl -H "Authorization: Bearer $TOKEN" https://example.com/api/me`,
          try: "اعمل طلب login غلط للـ API بتاعك بـ curl -i، واقرا الـ status والـ body.",
          flag: "term",
          deep: {
            why: "تجرّب API من الترمنال وتقرا الـ status والـ headers والـ body في مكان واحد.",
            how: R`[[-i]] بيطبع الـ response headers قبل الـ body. أول سطر دايمًا الـ status. مفيد لما تشوف السيرفر بيرجع إيه بالظبط.

[[-v]] (verbose) أقوى: بيطبع الطلب (السطور بتبدأ بـ [[>]]) والرد ([[<]]) وتفاصيل الاتصال. مفيد جدًا لـ debugging HTTPS.

[[-s]] بيخفي شريط التحميل. [[-o /dev/null]] برمي الـ body. [[| jq]] بيعرض الـ JSON منسّق.

لو بتبعت JSON: علامات تنصيص مهمة، single quotes بره والـ JSON جواه.`,
            when: "تجرّب API endpoint. تتأكد من الـ headers. تكتب سكربت health check.",
            mistakes: "على ويندوز في CMD، single quotes غير مدعومة. استخدم double quotes."
          },
          teach: R`## الأول: curl بيوريك قد إيه من الكلام

| الفلاج | بيطبع إيه |
|---|---|
| (من غير حاجة) | البودي بس |
| [[-i]] (include) | headers الرد + البودي |
| [[-v]] (verbose) | الاتصال + الطلب اللي اتبعت + headers الرد + البودي |
| [[-s]] (silent) | يشيل شريط التحميل |

الأمثلة اتشغّلت: الـ GitHub في [[docker run --rm ubuntu:24.04]] (curl 8.5.0 و jq 1.7)، والـ login و [[-v]] على API محلي بـ [[curl.exe]] (8.21.0) في ويندوز.

---

## ١. [[curl -i https://api.github.com/users/octocat]]

~~~text الناتج (أول سطور، لينكس)
HTTP/2 200
content-type: application/json; charset=utf-8
cache-control: public, max-age=60, s-maxage=60
x-ratelimit-limit: 60
x-ratelimit-remaining: 57
...

{
  "login": "octocat",
  ...
~~~

[[x-ratelimit-remaining: 57]] معناها: من غير توكن مسموحلك ٦٠ طلب في الساعة، وفاضل ٥٧. حاجة زي دي مش هتشوفها من غير [[-i]].

## ٢. [[curl -s https://api.github.com/users/octocat | jq '{name, public_repos}']]

- [[-s]]: من غير شريط التحميل، عشان ميتلخبطش مع الـ JSON.
- [[| jq]]: ابعت الرد لـ [[jq]]، برنامج بيقرا JSON.
- [['{name, public_repos}']]: اعمل object جديد فيه المفتاحين دول بس.

~~~text الناتج
{
  "name": "The Octocat",
  "public_repos": 8
}
~~~

## ٣. الـ POST: login بباسورد غلط

~~~bash
curl -i -X POST https://example.com/api/login -H "Content-Type: application/json" -d '{"email":"a@b.com","password":"secret"}'
~~~

| الحتة | معناها |
|---|---|
| [[-X POST]] | الـ method |
| [[-H "Content-Type: application/json"]] | البودي JSON |
| [[-d '...']] | البودي (data). الـ JSON جواه double quotes، فبرّه single quotes |

على API محلي:

~~~text الناتج
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37

{"error":"Invalid email or password"}
~~~

### على ويندوز: علامات التنصيص

جربت نفس السطر بالظبط بـ [[curl.exe]]:

| الشِل | النتيجة |
|---|---|
| PowerShell 7 | [[401]]: اشتغل زي bash |
| Windows PowerShell 5.1 | [[400 Bad Request]]: الـ double quotes جوه الـ JSON اتشالت قبل ما توصل لـ curl، والسيرفر قال [[SyntaxError: Expected property name]] |
| CMD | لازم double quotes بره و [[\"]] جوه: [[-d "{\"email\":\"a@b.com\",\"password\":\"secret\"}"]]، وكده رجع 401 |

## ٤. [[curl -H "Authorization: Bearer $TOKEN" URL]]

- [[Authorization: Bearer ...]]: الطريقة المعتادة تبعت توكن.
- [[$TOKEN]]: الـ shell بيحط قيمة المتغير [[TOKEN]] مكانه قبل ما curl يشتغل. اعمله الأول بـ [[TOKEN=abc123]] (في bash) أو [[$env:TOKEN = "abc123"]] واكتب [[$env:TOKEN]] (في PowerShell). وكده التوكن مش مكتوب في الأمر نفسه فمش هيبان في الـ history.

---

## ٥. [[-v]]: الطلب نفسه

~~~text curl.exe -v http://127.0.0.1:8791/api/me (ويندوز)
*   Trying 127.0.0.1:8791...
* Established connection to 127.0.0.1 (127.0.0.1 port 8791) from 127.0.0.1 port 65505
* using HTTP/1.x
> GET /api/me HTTP/1.1
> Host: 127.0.0.1:8791
> User-Agent: curl/8.21.0
> Accept: */*
>
* Request completely sent off
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 36
<
* Connection #0 to host 127.0.0.1:8791 left intact
{"id":42,"name":"Ali","role":"user"}
~~~

| أول السطر | معناه |
|---|---|
| [[*]] | معلومات curl عن الاتصال |
| [[>]] | اللي curl **بعته** |
| [[<]] | اللي السيرفر **رده** |

السطر الفاضي بعد [[>]] و [[<]] هو الفاصل بين الـ headers والبودي في HTTP نفسه.

## الخلاصة

- [[-i]] للـ status والـ headers، [[-v]] لما عايز تشوف اللي اتبعت كمان.
- [[-X]] الـ method، [[-H]] header، [[-d]] البودي، و [[| jq]] للـ JSON.
- على ويندوز: PowerShell 7 زي bash، و 5.1 بيبوّظ الـ JSON، و CMD محتاج [[\"]].`,
          lines: [
            "GET مع الـ headers والـ status قبل البودي.",
            "الرد JSON، خد منه حقلين بس بـ jq.",
            "POST بـ JSON: [[-X POST]] النوع، و [[-H]] نوع المحتوى، و [[-d]] البودي بين single quotes.",
            "طلب بتوكن في header الـ Authorization، والتوكن من متغير."
          ],
          sol: R`جربتها على API محلي بباسورد غلط:

[[HTTP/1.1 401 Unauthorized]]
[[Content-Type: application/json]]
وبعد السطر الفاضي الـ body: [[{"error":"Invalid email or password"}]]

ده الصح: [[401]] (أو [[400]] لو الـ body نفسه ناقص) ورسالة عامة متقولش هل الإيميل موجود ولا لأ. لو رجعلك [[200]] ومعاه [[{"success":false}]] ده تصميم وحش لأن أي client أو monitoring هيفتكره نجح. ولو [[500]] يبقى فيه exception في الكود مع الباسورد الغلط، افتح logs. ولو [[404]] يبقى الـ route غلط أو ناقصه prefix زي [[/api/v1]].`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** على أي موقع، شغّل [[curl -I]] و [[curl -i]] و [[curl -v]] واكتب الفرق في سطر لكل واحد.`, done: R`[[-I]] بيبعت [[HEAD]] ويطبع الـ headers بس، و [[-i]] بيبعت GET ويطبع الـ headers والبودي، و [[-v]] بيطبع كمان الطلب بعلامة [[>]] وتفاصيل الاتصال بـ [[*]].` },
            { lvl: 'تطبيق', t: R`**ابني:** سطر [[curl -s -o /dev/null -w]] بيطبع: الـ status، و [[time_namelookup]]، و [[time_connect]]، و [[time_starttransfer]]، و [[time_total]]، و [[size_download]] لموقعك.`, done: R`السطر بيطبع ٦ أرقام، وعارف إن [[time_starttransfer]] ناقص [[time_connect]] تقريبًا = وقت السيرفر (زي TTFB في Timing).` },
            { lvl: 'تطبيق', t: R`**قارن:** نفس الـ POST بـ JSON في bash وفي PowerShell 5.1 بـ [[curl.exe]]. اكتب نسخة PowerShell اللي بتشتغل، وليه [[curl]] من غير [[.exe]] في 5.1 بيطلع حاجة تانية.`, done: R`النسختين رجّعوا نفس الرد، وكاتب إن [[curl]] في 5.1 alias لـ [[Invoke-WebRequest]]، والـ JSON في PowerShell محتاج [[--data-raw '{\"a\":1}']] أو ملف بـ [[-d "@body.json"]].` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[curl --help all]] (أو [[man curl]]) لاقي الخيار اللي بيعمل retry لو السيرفر رد [[503]]، والخيار اللي بيخلّي curl يخرج بكود غلط على [[4xx]]/[[5xx]].`, done: R`[[--retry 3]] و [[--fail]] (أو [[--fail-with-body]])، وجرّبت إن [[curl --fail URL/nope; echo $?]] بيطبع [[22]].` },
            { lvl: 'تحدي', t: R`**قارن (HTTP/2):** [[curl -sI --http1.1 URL]] و [[curl -sI --http2 URL]] على موقع HTTPS. أول سطر بيتغيّر إزاي؟ (درس «HTTP/2 و HTTP/3»).`, done: R`الأول [[HTTP/1.1 200 OK]] والتاني [[HTTP/2 200]] من غير كلمة OK، وأسماء الـ headers في HTTP/2 كلها small letters (اتجرّب بـ curl 8.14 في Alpine). ولو [[curl]] بتاعك قال [[option --http2: the installed libcurl version does not support this]] (ده اللي طلع من curl بتاع ويندوز و Git Bash)، جرّب من WSL أو Docker.` },
          ],
        }
      ]
    }
]);

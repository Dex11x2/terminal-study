// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "فحص الموقع من بره",
      l: 3,
      n: "اللي جوجل والمهاجمين والأدوات بيشوفوه. اعمل الفحص ده لمواقعك انت أو المواقع اللي عندك إذن تختبرها",
      projects: [
        { lvl: 'صغير', t: R`تقرير headers الأمان`, what: R`سكربت بياخد دومين ويطبع الـ security headers (HSTS و CSP و X-Frame-Options و nosniff و Referrer-Policy) وتاريخ انتهاء الشهادة، ويدّي درجة بسيطة. من دروس «Security headers و SSL» و «Content Security Policy».`, done: R`على موقعين بيطلّع جدولين ودرجتين، والشهادة اللي فاضلها أقل من ١٤ يوم بتتعلّم أحمر، والدومين الغلط بيطلّع رسالة مش crash.` },
        { lvl: 'صغير', t: R`فاحص SEO لصفحة`, what: R`سكربت بيطبع title وطوله، و description، و og:image وهل بترجع [[200]]، و canonical، و noindex، و robots.txt و sitemap. من درس «SEO من الترمنال».`, done: R`على ٣ صفحات بيطلع جدول، وصفحة فيها [[noindex]] متعلّمة، و og:image مكسورة بتتكتب [[404]].` },
        { lvl: 'متوسط', t: R`CSP من Report-Only لـ enforce`, what: R`على موقع عندك: حط CSP Report-Only، واعمل endpoint يجمّع التقارير، وصلّح كل مخالفة (انقل inline لملفات، hash أو nonce للباقي)، وبعد أسبوع حوّلها enforce. من درس «Content Security Policy».`, done: R`ملخص التقارير قبل وبعد (عدد المخالفات لكل directive)، وصفر مخالفات قبل التحويل، و Console نضيف على كل الصفحات بعد enforce.` },
        { lvl: 'متوسط', t: R`مراقب «التعديل وصل؟»`, what: R`سكربت بعد كل نشر بيستنى الموقع يرد، ويتأكد إن نص أو hash ملف معيّن اتغيّر فعلًا (مش كاش)، وإن مفيش [[http://]] ولا CSP errors جديدة في الصفحة الرئيسية. من دروس «التعديل وصل؟ curl و grep» و «Mixed content و HTTPS».`, done: R`بعد نشر حقيقي بيقول «وصل» ومعاه الوقت، ولو الـ CDN لسه بيرجّع القديم بيستنى ويعيد لحد حد أقصى ويقول «لسه قديم»، و exit code صح.` },
        { lvl: 'كبير', t: R`أداة «تشخيص موقع» كاملة`, what: R`نسخة متينة من [[check.mjs]] بتاع «مشروع تشخيص موقع بطيء ومكسور» لأي موقع: لستة صفحات من sitemap، والفحوصات الـ ٧ لكل صفحة على مقاسين، و ٣ قياسات والوسط، و lint للـ HTML المنزّل، وتقرير HTML وملف JSON، و exit code للـ CI، ولوج، و timeout لكل صفحة.`, done: R`على المعمل المكسور بتطلّع الـ ٨ مشاكل، وعلى المتصلّح صفر، وعلى موقع ٢٠ صفحة بتخلص في أقل من ٥ دقايق، وصفحة بتقع مبتوقفش الباقي، وتشغيلها مرتين بيطلّع نفس النتيجة.`, ext: R`زوّد فحص headers الأمان و SEO لكل صفحة، وصفحة تاريخ بتوري الأرقام بتتحسن ولا بتسوء من نشر لنشر.` },
        { lvl: 'فكرة', t: R`خدمة «فحص موقعك في ٥ دقايق»`, what: R`صفحة بيحط فيها حد رابط موقعه (مع موافقة إنه بتاعه)، وتشغّل فحوصات التاب كله (أداء، وأمان، و SEO، و mixed content، و layout على الموبايل) وتطلّع تقرير بلغة بسيطة لصاحب محل مش مبرمج. انت بتحدد الفحوصات والشكل.`, done: R`٣ مواقع حقيقية (بإذن أصحابها) اتفحصت، والتقرير مفهوم لحد مش تقني (سألته)، وفيه rate limit عشان الخدمة متتستخدمش لفحص مواقع الناس من غير إذن.`, ext: R`زوّد إعادة فحص شهرية وإيميل بالتغيير، وخليها مصدر دخل صغير (فحص مجاني وتقرير مفصّل بفلوس).` },
      ],
      items: [
        {
          cmd: "Security headers و SSL",
          title: "الحماية الأساسية",
          desc: "[[Strict-Transport-Security]] بيجبر HTTPS، و [[Content-Security-Policy]] بيحدد السكربتات المسموحة، و [[X-Frame-Options]] بيمنع الموقع يتحط جوه iframe. أول أمر بيطبع اللي موجود منهم. ولتقرير كامل: securityheaders.com بيدّي درجة للـ headers، و ssllabs.com/ssltest بيفحص الشهادة وإعدادات الـ SSL.",
          example: R`curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy"`,
          try: "افحص موقعك على securityheaders.com، وضيف ناقص واحد في Nginx بـ [[add_header]].",
          flag: "term",
          deep: {
            why: "موقعك محتاج يبعت headers معينة تقول للمتصفح «فعّل الحماية». بدونها حتى لو الكود تمام، المتصفح مش هيفعّل بعض الحمايات.",
            how: R`Security headers هي response headers بيبعتها السيرفر:

[[Strict-Transport-Security]] (HSTS) بيقول للمتصفح «استخدم HTTPS دايمًا»، يمنع SSL stripping.

[[Content-Security-Policy]] بيحدد من أين يُسمح بتحميل scripts. أقوى حماية ضد XSS.

[[X-Frame-Options: DENY]] بيمنع الموقع يتحط جوه iframe على موقع تاني (clickjacking).

[[X-Content-Type-Options: nosniff]] بيمنع المتصفح يخمّن نوع الملف.

securityheaders.com بيدّيك درجة. مع Nginx بتضيفها بـ [[add_header]].`,
            when: "بعد ما ترفع موقع: افحصه على securityheaders.com. واستهدف درجة A.",
            mistakes: "CSP بياخد وقت عشان تضبطه. ابدأ بـ report-only mode يجمعلك violations من غير ما يمنع حاجة."
          },
          teach: R`## الأول: الـ headers دي تعليمات حماية للمتصفح

السيرفر بيبعتها مع الرد، والمتصفح بيشغّل حمايات معينة لما يشوفها. لو مش موجودة، الحماية مش شغالة. المثال بيشوف أنهي موجود. اتشغّل في [[docker run --rm ubuntu:24.04]] على [[example.com]] و [[api.github.com]]، وعلى سيرفر محلي.

---

## ١. الأمر

~~~bash
curl -sI https://example.com | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer-policy"
~~~

- [[curl -sI]]: الـ headers بس من غير شريط تحميل.
- [[| grep -iE "a|b|c"]]: سيب السطور اللي فيها أي واحدة من الكلمات، من غير فرق capital و small.

~~~text الناتج على example.com
(ولا سطر)
exit=1
~~~

[[grep]] مطلعش حاجة وخرج بـ exit code [[1]] (يعني «ملقتش»). example.com مش باعت ولا header أمان من الخمسة. نفس الأمر على api.github.com:

~~~text الناتج على api.github.com
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
X-Frame-Options: deny
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
Content-Security-Policy: default-src 'none'
~~~

---

## ٢. كل header بيعمل إيه

| الـ header | القيمة في github | معناها |
|---|---|---|
| [[Strict-Transport-Security]] (HSTS) | [[max-age=31536000; includeSubdomains; preload]] | سنة كاملة متفتحش الموقع ده غير بـ HTTPS، وكل الـ subdomains كمان |
| [[X-Frame-Options]] | [[deny]] | ممنوع أي موقع يحطني جوه iframe (ضد clickjacking) |
| [[X-Content-Type-Options]] | [[nosniff]] | صدّق الـ Content-Type، متخمّنش نوع الملف |
| [[Referrer-Policy]] | [[strict-origin-when-cross-origin]] (آخر قيمة بتكسب) | لمواقع تانية ابعت الدومين بس من غير المسار |
| [[Content-Security-Policy]] | [[default-src 'none']] | مسموح تحمّل إيه ومنين. [['none']] = ولا حاجة (ده API مش صفحة، فمحتاجش يحمّل حاجة) |

## ٣. على سيرفرك

أضفت ٤ منهم في Express وجربت نفس الفكرة بـ PowerShell:

~~~text curl.exe -sI http://127.0.0.1:8791/secure | Select-String ...
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
~~~

وفي Nginx (من الـ docs، مش متجرّب هنا) كل واحد سطر [[add_header]] في الـ [[server]] block، و [[always]] في الآخر عشان يتبعت حتى مع ردود الـ errors.

## الخلاصة

- [[curl -sI | grep]] بيوريك الموجود، واللي مش ظاهر ناقص.
- ابدأ بـ [[X-Content-Type-Options: nosniff]] و [[X-Frame-Options]] و HSTS. و CSP آخر حاجة وبـ Report-Only الأول.
- securityheaders.com يدّيك درجة، و ssllabs.com/ssltest للشهادة.`,
          lines: ["الـ headers بس، وفلتر على headers الأمان الخمسة. اللي مش ظاهر يبقى ناقص."],
          sol: R`securityheaders.com هيديك درجة من F لـ A+ وقايمة Missing Headers. موقع Nginx جديد من غير إعدادات غالبًا بياخد F أو D. أسهل واحد تضيفه وتقفل بيه ثغرة حقيقية:

[[add_header X-Content-Type-Options "nosniff" always;]]

حطه في الـ [[server]] block، واعمل [[sudo nginx -t]] (المفروض [[syntax is ok]] و [[test is successful]]) وبعدين [[sudo systemctl reload nginx]]، وشغّل أمر الـ curl تاني: السطر هيظهر.

لو ما ظهرش: فيه [[add_header]] تاني جوه [[location]] (ولما location فيها add_header بتلغي كل اللي ورثته من server)، أو الرد error ونسيت [[always]]. سيب CSP للآخر وابدأها بـ [[Content-Security-Policy-Report-Only]] لأنها بتكسر سكربتات. (مقدرتش أجرّب Nginx حقيقي هنا.)`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** شغّل سطر الدرس على موقعك واكتب جدول: الـ header، وموجود ولا لأ، وبيحمي من إيه في نص سطر.`, done: R`الجدول فيه الـ ٥ headers، والناقص متعلّم عليه ومعاه المهاجم اللي بيستغله (clickjacking، أو sniffing، أو downgrade لـ http).` },
            { lvl: 'تطبيق', t: R`**ابني:** سيرفر Node (أو بلوك nginx) بيحط الـ ٥ headers لكل رد، وبعدين اختبر بسطر الدرس، وجرّب تحط الصفحة جوه [[<iframe>]] من صفحة على بورت تاني.`, done: R`السطر بيطبع الـ ٥، والـ iframe فاضي وفي Console رسالة إن الصفحة رفضت تتعرض في frame ([[X-Frame-Options]] أو [[frame-ancestors]]).` },
            { lvl: 'تطبيق', t: R`**الشهادة:** [[openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates -issuer -ext subjectAltName]] على موقعك.`, done: R`عندك تاريخ الانتهاء، والجهة اللي أصدرت، والأسماء اللي في الشهادة، وكاتب كام يوم فاضل.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه [[Strict-Transport-Security: max-age=31536000; includeSubDomains]] ممكن يكسر subdomain لسه على http؟ وليه تبدأ بـ [[max-age]] صغير؟ ٤ سطور.`, done: R`كاتب إن المتصفح بيفتكر القاعدة سنة ومبيقبلش http لأي subdomain، فأي subdomain مالوش شهادة بيقع، ومفيش زرار «تخطّي» للمستخدم، فتبدأ بـ ٣٠٠ ثانية وتكبّر.` },
          ],
        },
        {
          cmd: "Content Security Policy",
          title: "CSP: السكربت مش شغال والرسالة بتقول violates the following Content Security Policy directive: تقراها، وتسمح بـ hash أو nonce، وتجرّب بـ Report-Only",
          desc: R`**Content-Security-Policy** (CSP) header بيقول للمتصفح «السكربتات والصور والـ fetch مسموحة من فين بس». لو حصل XSS وحد حقن [[<script>]] في صفحتك، الـ CSP بيمنعه يشتغل. والتمن: أي سكربت inline (حتى بتاعك)، وأي [[onclick=""]]، وأي [[eval]]، بيتمنعوا لحد ما تسمح بيهم. ولما ده يحصل Console بيكتب سطر أحمر فيه **السبب والحل**: [[Executing inline script violates the following Content Security Policy directive 'script-src 'self''. Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required...]]. الـ hash اللي في الرسالة هو بالظبط اللي تحطه في الـ header عشان السكربت ده بالذات يشتغل.

٣ طرق تسمح: **انقل الكود لملف** ([[script-src 'self']] بيسمح بيه)، أو **hash** للسكربت الـ inline ([[openssl dgst -sha256 -binary | openssl base64]] بيطلّع نفس الرقم)، أو **nonce** عشوائي جديد مع كل رد على السيرفر و [[nonce="..."]] على كل [[<script>]]. وقبل ما تقفل على موقع شغّال: [[Content-Security-Policy-Report-Only]] بيكتب المخالفات في Console ويبعتها لـ [[report-uri]] **من غير ما يمنع** حاجة. وفخ اتقاس: CSP بـ [[nonce]] لوحده بيمنع كمان ملفات [[<script src>]] اللي من غير nonce حتى لو من نفس الموقع.`,
          example: R`Content-Security-Policy: script-src 'self'
Content-Security-Policy: script-src 'self' 'sha256-zGiH9C4oJq+7evMPu/gfItAWocUyL9EP8dsJ7tDCutM='
Content-Security-Policy: script-src 'nonce-r4nd0m'
Content-Security-Policy-Report-Only: script-src 'self'; report-uri /csp-report
echo -n "document.body.dataset.boot='ok'" | openssl dgst -sha256 -binary | openssl base64
document.addEventListener("securitypolicyviolation", e => console.log(e.violatedDirective, e.blockedURI, e.disposition))
curl -sI https://example.com | grep -i "^content-security-policy"`,
          lines: [
            R`أبسط سياسة مفيدة: السكربتات من نفس الموقع بس ([[self]] = نفس الـ scheme والدومين والبورت). أي [[<script>]] inline، أو [[onclick]] في الـ HTML، أو [[eval]]، أو سكربت من دومين تاني، بيتمنع. باقي الأنواع (صور، CSS، fetch) مفيش عليها قيود لأن مفيش [[default-src]].`,
            R`نفس الكلام ومعاه سكربت inline واحد بعينه مسموح: [[sha256-...]] هو hash لنص السكربت **بالظبط** (من بعد [[<script>]] لحد [[</script>]]، بالمسافات). لو غيّرت حرف في السكربت، الـ hash يتغيّر ويتمنع تاني. الرقم ده Chrome كتبه بنفسه في رسالة المنع.`,
            R`nonce: السيرفر بيولّد قيمة عشوائية مع **كل رد** ويحطها في الـ header وفي [[<script nonce="r4nd0m">]]. المهاجم مش عارف القيمة فسكربته المحقون مش هيشتغل. وخد بالك: هنا مفيش [[self]]، فـ [[<script src="/app.js">]] من غير nonce اتمنع هو كمان (اتجرّب). [[r4nd0m]] هنا للمعمل بس: في الحقيقة قيمة جديدة عشوائية كل مرة.`,
            R`Report-Only: نفس السياسة، بس المتصفح **مبيمنعش**: بيكتب في Console [[The policy is report-only, so the violation has been logged but no further action has been taken.]] وبيبعت POST بـ JSON ([[application/csp-report]]) لـ [[report-uri]]. كده تعرف إيه اللي هيتكسر قبل ما تقفل.`,
            R`احسب الـ hash بنفسك: [[echo -n]] من غير سطر جديد في الآخر (لأن السطر الجديد جزء من النص)، و [[openssl dgst -sha256 -binary]] الـ hash كـ bytes، و [[openssl base64]] يحوّلها. الناتج هنا [[zGiH9C4oJq+7evMPu/gfItAWocUyL9EP8dsJ7tDCutM=]]، نفس اللي Chrome كتبه.`,
            R`من جوه الصفحة: event [[securitypolicyviolation]] بيتنادى مع كل مخالفة، وفيه [[violatedDirective]] (زي [[script-src-elem]] أو [[script-src-attr]] أو [[img-src]])، و [[blockedURI]] ([[inline]] أو [[eval]] أو الرابط)، و [[disposition]] ([[enforce]] = اتمنع، [[report]] = Report-Only). ممكن تبعته لسيرفرك.`,
            R`من بره: موقعك بيرجّع CSP أصلًا؟ وإيه هي؟ [[grep -i]] بيمسك الاتنين (العادي و [[-report-only]]) لأنهم بيبدأوا بنفس الكلمة، و [[^]] عشان يمسك اسم الـ header في أول السطر بس مش كلمة جوه header تاني.`,
          ],
          try: R`اعمل سيرفر Node بيرجّع نفس الصفحة (سكربت inline، و [[<script src="/app.js">]]، و زرار [[onclick]]، و [[eval]]، وصورة من دومين تاني) بـ ٥ سياسات: [[script-src 'self']]، وبعدها مع الـ hash اللي Chrome طبعه، و nonce بس، و Report-Only بـ [[report-uri]]، و [[default-src 'self'; img-src 'self']]. لكل واحدة اقرا Console، وشوف أنهي حاجة اشتغلت، وفي Report-Only اطبع اللي وصل لـ [[/csp-report]].`,
          deep: {
            why: R`XSS (سكربت محقون في صفحتك من تعليق أو اسم يوزر أو parameter) بيقدر يعمل أي حاجة اليوزر يقدر يعملها: يسرق التوكن من localStorage، يبعت طلبات، يغيّر الصفحة. تصليح كل مكان بيطبع بيانات صح هو الحل الأول، و CSP هو الشبكة التانية: حتى لو فيه ثغرة نسيتها، السكربت المحقون مش هيشتغل لأنه inline أو من دومين مش مسموح.`,
            how: R`المتصفح بيقرا الـ header مع الصفحة، ولكل حاجة الصفحة عايزة تحمّلها أو تشغّلها بيشوف الـ directive المناسب: [[script-src-elem]] لـ [[<script>]]، و [[script-src-attr]] لـ [[onclick]] وأخواتها، و [[img-src]] و [[connect-src]] (fetch و WebSocket) و [[style-src]] و [[font-src]] و [[frame-src]]... لو الـ directive مش مكتوب بيرجع لـ [[script-src]] وبعدين [[default-src]] (Chrome بيقول ده في الرسالة: [[Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback.]]). سكربت inline بيعدّي لو فيه [[unsafe-inline]] (وده بيلغي الحماية)، أو hash بتاع نصه موجود، أو nonce بتاعه مطابق. الـ hashes مبتنطبقش على [[onclick]] إلا مع [[unsafe-hashes]] (Chrome كاتب ده في الرسالة). وأي مخالفة: سطر في Console، و event [[securitypolicyviolation]]، و report لـ [[report-uri]] أو [[report-to]] لو موجودين. و Report-Only نفس الحسابات بالظبط بس من غير منع، وتقدر تبعت الاتنين مع بعض (سياسة شغالة، وسياسة أشد بتتجرّب).`,
            when: R`أي موقع فيه login أو بيانات يوزرز. ابدأ بـ Report-Only على الإنتاج أسبوع، واقرا التقارير، وصلّح (انقل الـ inline لملفات، وشيل [[onclick]] واستخدم [[addEventListener]])، وبعدين حوّلها لـ enforce. ولو الـ framework بيعمل سكربتات inline (Next.js بيعمل)، nonce من الـ middleware هو الطريق: درس «CSP nonce» في تاب Next.js. و [[frame-ancestors]] (مين يقدر يحطك في iframe) جزء من CSP وبديل [[X-Frame-Options]] (درس «Security headers و SSL»).`,
            mistakes: R`تحط [[unsafe-inline]] عشان «كله يشتغل» (السكربت المحقون inline برضه، فالحماية راحت). تستخدم nonce ثابت في كل الردود (المهاجم يشوفه ويستخدمه). تنسى إن nonce لوحده بيمنع ملفاتك من غير nonce. تحسب الـ hash بـ [[echo]] من غير [[-n]] (السطر الجديد بيغيّر الـ hash). تحط CSP في [[<meta>]] وتفتكر [[frame-ancestors]] و [[report-uri]] شغالين (مبيشتغلوش في meta، من MDN). تكتب [[default-src 'self']] فجأة على موقع شغّال فالصور والخطوط والـ analytics من بره يقعوا كلهم مرة واحدة (في المعمل: [[Loading the image ... violates ... "img-src 'self'"]]). أو تقفل وتمشي من غير ما تفتح Console على كل الصفحات.`
          },
          teach: R`## الأول: CSP بيمنع إيه

اتجرّب كله في Chrome 156 (headless) على سيرفر Node 24 محلي، والرسايل من DevTools Protocol بالنص (نفس اللي Console بيعرضه).

الصفحة فيها ٥ حاجات، وكل سياسة بنشوف أنهي فيهم اشتغل:

~~~html الصفحة
<script>document.body.dataset.boot='ok'</script>
<script src="/app.js"></script>                     <!-- بيكتب dataset.file -->
<button onclick="this.dataset.c=1">x</button>
<img src="https://cdn.test/logo.png">
<script>try { eval('1+1') } catch (e) { console.log('eval:', e.message) }</script>
~~~

وعلشان نشوف المخالفات من جوه الصفحة كمان:

~~~javascript
document.addEventListener("securitypolicyviolation", e =>
  console.log("VIOLATION", e.violatedDirective, e.blockedURI, e.disposition));
~~~

---

## ١. [[script-src 'self']]

~~~text اللي اشتغل
{"file":"ok","clicked":"no"}
~~~

[[app.js]] (ملف من نفس الموقع) اشتغل. السكربت الـ inline لأ ([[boot]] مش موجود)، والزرار لأ. والرسايل:

~~~text Console
Executing inline script violates the following Content Security Policy directive 'script-src 'self''. Either the 'unsafe-inline' keyword, a hash ('sha256-zGiH9C4oJq+7evMPu/gfItAWocUyL9EP8dsJ7tDCutM='), or a nonce ('nonce-...') is required to enable inline execution. The action has been blocked.
Executing inline event handler violates the following Content Security Policy directive 'script-src 'self''. Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution. Note that hashes do not apply to event handlers, style attributes and javascript: navigations unless the 'unsafe-hashes' keyword is present. The action has been blocked.
~~~

اقرا الرسالة كده:

| الحتة | معناها |
|---|---|
| [[Executing inline script]] | إيه اللي اتمنع (سكربت جوه الـ HTML) |
| [['script-src 'self'']] | أنهي directive اتخالف، وقيمته |
| [[a hash ('sha256-zGiH...')]] | الـ hash بتاع السكربت ده بالظبط: انسخه |
| [[inline event handler]] | [[onclick]] وأخواتها: الـ hash مش هينفع هنا (إلا بـ [[unsafe-hashes]]) |
| [[The action has been blocked.]] | اتمنع فعلًا (مش Report-Only) |

كل سكربت inline ليه سطر لوحده وليه hash مختلف (الصفحة فيها ٣، فـ ٣ رسايل بـ ٣ hashes).

---

## ٢. سمحت بسكربت واحد بالـ hash

نسخت الـ hash من الرسالة للـ header: [[script-src 'self' 'sha256-zGiH9C4oJq+7evMPu/gfItAWocUyL9EP8dsJ7tDCutM=']]

~~~text اللي اشتغل
{"boot":"ok","file":"ok","clicked":"no"}
~~~

[[boot]] اشتغل، والاتنين التانيين (بـ hashes تانية) لسه ممنوعين، والزرار لسه ممنوع. ونفس الرقم من الترمنال:

~~~text echo -n "document.body.dataset.boot='ok'" | openssl dgst -sha256 -binary | openssl base64
zGiH9C4oJq+7evMPu/gfItAWocUyL9EP8dsJ7tDCutM=
~~~

(وبـ Node: [[crypto.createHash("sha256").update(text).digest("base64")]]، نفس الناتج.)

---

## ٣. nonce بس: فخ

[[script-src 'nonce-r4nd0m']]، والسكربتات الـ inline عليها [[nonce="r4nd0m"]]:

~~~text اللي اشتغل
{"boot":"ok","clicked":"no"}
~~~

~~~text Console
Loading the script 'http://127.0.0.1:8098/app.js' violates the following Content Security Policy directive: "script-src 'nonce-r4nd0m'". Note that 'script-src-elem' was not explicitly set, so 'script-src' is used as a fallback. The action has been blocked.
eval: Evaluating a string as JavaScript violates the following Content Security Policy directive because 'unsafe-eval' is not an allowed source of script: script-src 'nonce-r4nd0m'".
VIOLATION script-src-elem http://127.0.0.1:8098/app.js enforce
VIOLATION script-src-attr inline enforce
VIOLATION script-src eval enforce
~~~

الـ inline اللي عليه nonce اشتغل، بس **[[app.js]] اتمنع** رغم إنه من نفس الموقع: مفيش [[self]] في السياسة، ومفيش nonce على الـ tag بتاعه. يا إما [[nonce]] على كل [[<script src>]] كمان، يا إما [[script-src 'self' 'nonce-...']]. و [[eval]] اتمنع لأن مفيش [[unsafe-eval]] (ورسالته بتيجي كـ exception جوه الكود، مش سطر لوحده).

والـ nonce لازم يتولّد **جديد مع كل رد** (16 bytes عشوائية base64 مثلًا: [[crypto.randomBytes(16).toString("base64")]]). nonce ثابت = مفيش حماية.

---

## ٤. Report-Only: جرّب من غير ما تكسر

[[Content-Security-Policy-Report-Only: script-src 'self'; report-uri /csp-report]]

~~~text اللي اشتغل
{"boot":"ok","file":"ok","clicked":"1"}
~~~

**كله اشتغل** (حتى الزرار)، والرسايل بقت info بدل error:

~~~text Console
Executing inline script violates the following Content Security Policy directive 'script-src 'self''. ... The policy is report-only, so the violation has been logged but no further action has been taken.
~~~

وده اللي وصل السيرفر على [[/csp-report]] (واحد من ٦):

~~~json POST /csp-report (content-type: application/csp-report)
{"csp-report":{"document-uri":"http://127.0.0.1:8098/ro","referrer":"","violated-directive":"script-src-elem","effective-directive":"script-src-elem","original-policy":"script-src 'self'; report-uri /csp-report","disposition":"report","blocked-uri":"inline","line-number":1,"column-number":15,"source-file":"http://127.0.0.1:8098/ro","status-code":200,"script-sample":""}}
~~~

[[line-number]] و [[column-number]] بيقولوك مكان السكربت في الصفحة، فتعرف تصلّح إيه. سيب Report-Only على الإنتاج أسبوع، واجمع التقارير، وصلّح، وبعدين حوّلها [[Content-Security-Policy]].

---

## ٥. [[default-src 'self']]: بيقفل كل حاجة

~~~text Console (من ضمن الرسايل)
Executing inline script violates the following Content Security Policy directive 'default-src 'self''. ... Note also that 'script-src' was not explicitly set, so 'default-src' is used as a fallback. The action has been blocked.
Loading the image 'https://cdn.test/logo.png' violates the following Content Security Policy directive: "img-src 'self'". The action has been blocked.
~~~

[[default-src]] هو الاحتياطي لكل الأنواع. سياسة كاملة لموقع عادي شكلها كده (عدّل الدومينات):

~~~text
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...'; img-src 'self' https://cdn.shop.example data:; connect-src 'self' https://api.shop.example; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
~~~

---

## ٦. تشوفه فين في DevTools

- **Console:** السطور الحمرا (أو info في Report-Only) بالنص اللي فوق.
- **Network ثم الصفحة نفسها ثم Headers:** الـ CSP في Response Headers. والطلب اللي اتمنع (صورة أو سكربت) بيبان أحمر وسببه [[csp]].
- **Issues** (Command Menu ثم Show Issues): بيجمّع مخالفات CSP بالعنصر والسطر.
- **Network ثم Override headers:** غيّر الـ CSP على جهازك وجرّب سياسة جديدة من غير ما تلمس السيرفر (درس «Overrides»).

## الخلاصة

- CSP بيمنع السكربتات المحقونة، والتمن: inline و [[onclick]] و [[eval]] بيتمنعوا.
- رسالة Console فيها الـ directive والـ hash الجاهز.
- الحل: انقل لملفات، أو hash لسكربت ثابت، أو nonce جديد مع كل رد (ومعاه [[self]] أو nonce على كل الملفات).
- ابدأ بـ Report-Only و [[report-uri]]، وبعدين enforce.
- نفس الـ header في nginx بـ [[add_header ... always]]، و Next.js بـ nonce في درس «CSP nonce».`,
          sol: R`[[script-src 'self']]: [[app.js]] بس اشتغل، و ٣ رسايل [[Executing inline script ... The action has been blocked.]] (لكل سكربت hash مختلف)، ورسالة [[inline event handler]] للزرار.

مع الـ hash: السكربت ده اشتغل والباقي لأ. بـ nonce بس: الـ inline اللي عليه nonce اشتغل و [[app.js]] **اتمنع** ([[Loading the script ... violates ... "script-src 'nonce-r4nd0m'"]])، و [[eval]] رمى [[Evaluating a string as JavaScript violates...]].

Report-Only: كله اشتغل والرسايل فيها [[The policy is report-only]]، و [[/csp-report]] استقبل ٦ تقارير JSON ([[script-src-elem]] و [[script-src-attr]] و [[script-src]] لـ eval). و [[default-src 'self'; img-src 'self']]: الصورة من [[cdn.test]] اتمنعت بـ [[Loading the image ... violates ... "img-src 'self'"]].`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب ٣ طرق تخلّي سكربت inline يشتغل مع CSP، وأنهي واحدة مينفعش تستخدمها وليه، والفرق بين [[Content-Security-Policy]] و [[-Report-Only]].`, done: R`الطرق: ملف، و hash، و nonce، و [[unsafe-inline]] ممنوعة لأنها بتسمح للمحقون كمان، و Report-Only بيكتب بس ومبيمنعش.` },
            { lvl: 'تطبيق', t: R`**اقرا رسالة:** خد أول رسالة CSP من قسم ١، وطلّع منها: إيه اللي اتمنع، والـ directive، والـ hash، وحط الـ hash في السياسة وجرّب.`, done: R`السكربت ده بقى شغّال، و Console فيه رسالتين بس (للسكربتين التانيين)، والـ hash اللي حسبته بـ [[openssl]] مطابق.` },
            { lvl: 'تطبيق', t: R`**ابني:** سيرفر Node بيولّد nonce جديد مع كل طلب بـ [[crypto.randomBytes(16)]]، ويحطه في الـ header وفي كل [[<script>]] في الصفحة (inline وملفات).`, done: R`ريفريش مرتين: الـ nonce في Response Headers مختلف كل مرة، ومفيش ولا رسالة CSP، ولو حقنت [[<script>alert(1)</script>]] من غير nonce من Elements أو من parameter، مبيشتغلش ورسالته في Console.` },
            { lvl: 'تطبيق', t: R`**صلّح:** صفحة فيها ٤ زراير [[onclick="..."]] وعليها [[script-src 'self']]. انقلهم لـ [[addEventListener]] في ملف، من غير [[unsafe-hashes]].`, done: R`مفيش رسايل [[inline event handler]] في Console، والزراير الـ ٤ شغالين، و [[grep -c "onclick=" index.html]] = [[0]].` },
            { lvl: 'تحدي', t: R`**ابني (تقارير):** endpoint [[/csp-report]] بيحفظ كل تقرير سطر JSON في ملف، وسكربت بيلخّص: كل [[violated-directive]] و [[blocked-uri]] وعددهم، متترتب. شغّل Report-Only على صفحاتك واجمع.`, done: R`الملخص فيه جدول (زي [[script-src-elem inline 3]] و [[img-src https://cdn... 12]])، وبعد ما صلّحت أكتر سطر وعملت ريفريش، عدده بقى صفر.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ليه CSP مش بديل عن escaping البيانات في الـ HTML؟ اكتب ٣ أمثلة لـ XSS أو حقن الـ CSP مش بيمنعهم أو بيقلل أثرهم بس (مثلًا [[<a href>]] لموقع تاني، أو [[<form action>]]، أو CSS).`, done: R`الأمثلة فيها حاجة زي لينك مزيف أو فورم بيبعت لموقع تاني (إلا لو [[form-action]])، أو تعديل نص الصفحة، وكاتب إن CSP طبقة تانية والأولى escaping والـ sanitizing.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import crypto from "node:crypto";
import http from "node:http";
const inline = "document.body.dataset.boot='ok'";
const hash = crypto.createHash("sha256").update(inline).digest("base64");
console.log("hash:", hash);
console.log("matches Chrome:", hash === "zGiH9C4oJq+7evMPu/gfItAWocUyL9EP8dsJ7tDCutM=");
console.log("with newline:", crypto.createHash("sha256").update(inline + "\n").digest("base64") === hash);
const srv = http.createServer((req, res) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  res.setHeader("content-security-policy", "script-src 'self' 'nonce-" + nonce + "'");
  res.end('<script nonce="' + nonce + '">' + inline + "</script>");
}).listen(0, "127.0.0.1", async () => {
  const url = "http://127.0.0.1:" + srv.address().port;
  const a = await fetch(url), b = await fetch(url);
  const n1 = a.headers.get("content-security-policy").match(/nonce-([^']+)/)[1];
  const n2 = b.headers.get("content-security-policy").match(/nonce-([^']+)/)[1];
  console.log("nonce in body:", (await a.text()).includes('nonce="' + n1 + '"'));
  console.log("new nonce each response:", n1 !== n2);
  srv.close();
});`, expect: [R`hash: zGiH9C4oJq+7evMPu/gfItAWocUyL9EP8dsJ7tDCutM=`, R`matches Chrome: true`, R`with newline: false`, R`nonce in body: true`, R`new nonce each response: true`] },
          ],
        },
        {
          cmd: "SEO من الترمنال",
          title: "اللي جوجل بيقراه",
          desc: "الـ title والـ description وصورة og اللي بتظهر لما حد يشير اللينك، و robots.txt اللي بيقول لجوجل يدخل فين، و sitemap. لو الأوامر دي طلعت فاضية وانت شايف الكلام في المتصفح، يبقى المحتوى بيترسم بـ JavaScript، وده اللي بيفرق فيه SSR.",
          example: R`curl -s https://example.com | grep -iE "<title|name=\"description\"|property=\"og:"
curl -s https://example.com/robots.txt
curl -sI https://example.com/sitemap.xml`,
          try: "شغّلهم على موقعك واتأكد إن كل صفحة ليها title و description مختلفين.",
          flag: "term",
          deep: {
            why: "جوجل بيقرا الـ HTML زي curl مش زي المتصفح. الـ title والـ description لازم يكونوا في الـ source.",
            how: R`[[curl -s]] بيجيب الـ source، و[[grep]] بيلاقي السطور المهمة. [[<title>]] في تاب المتصفح وفي نتايج جوجل. [[name="description"]] الوصف تحت العنوان. [[property="og:]] بيظهر لما حد يشارك الـ link.

لو الـ grep طلع فاضي، الـ content بيتعمل بـ JavaScript (CSR) وجوجل ممكن ما يقراهوش بسهولة. الحل SSR أو static generation.

[[robots.txt]] بيقول لـ crawlers إيه اللي يدخلوا فيه. [[sitemap.xml]] خريطة بكل صفحات الموقع.`,
            when: "بعد كل إصدار: اتأكد إن الـ meta tags صح. ولما حد بيشارك الموقع والصورة مش بتظهر.",
            mistakes: "تفتح الموقع في المتصفح وتشوف الـ title وتفتكر جوجل شايفه. استخدم curl للتأكيد دايمًا."
          },
          teach: R`## الأول: curl بيشوف زي الـ crawler

الـ crawler (برنامج جوجل أو واتساب اللي بيقرا الصفحات) بيبدأ بالـ HTML اللي السيرفر بعته، زي [[curl]]، مش زي متصفحك اللي بيشغّل JavaScript. فلو الكلام مش في ناتج curl، فيه احتمال كبير الـ bot ميشوفهوش. اتشغّل في [[docker run --rm ubuntu:24.04]] على example.com، وعلى سيرفر محلي فيه صفحة SSR وصفحة SPA.

---

## ١. السطر الأول

~~~bash
curl -s https://example.com | grep -iE "<title|name=\"description\"|property=\"og:"
~~~

| الحتة | معناها |
|---|---|
| [[curl -s URL]] | هات الـ HTML بسكوت |
| [[<title]] | عنوان الصفحة (التاب ونتايج جوجل) |
| [[name=\"description\"]] | الوصف تحت العنوان في جوجل. [[\"]] علامة تنصيص جوه النص |
| [[property=\"og:]] | Open Graph: العنوان والصورة لما حد يشارك اللينك |

~~~text الناتج على example.com
<!doctype html><html lang=en><head><meta charset=utf-8>...<title>Example Domain</title><style>...</style></head><body>...</body></html>
~~~

(اختصرت السطر.) الصفحة كلها سطر واحد، فـ grep طبعه كله عشان فيه [[<title]]. ومفيهوش description ولا og، يعني لو حد شارك اللينك هيظهر العنوان بس من غير وصف ولا صورة.

على صفحة SSR محلية:

~~~text الناتج
<html><head><meta charset="utf-8"><title>Shop</title>
<meta name="description" content="Fresh deals every day">
<meta property="og:title" content="Shop">
<meta property="og:image" content="https://example.com/og.png">
~~~

وعلى صفحة SPA بنفس المحتوى، اللي React بيحط الـ description فيها بعد التحميل: سطر [[<title>Shop</title>]] بس.

## ٢. [[curl -s https://example.com/robots.txt]]

robots.txt ملف نص في جذر الموقع بيقول لكل crawler يدخل فين. على example.com رجع **نفس صفحة الـ HTML**، ولما سألت عن الـ status:

~~~text curl -s -o /dev/null -w "%{http_code} %{content_type}"
404 text/html; charset=utf-8
~~~

يعني مفيش robots.txt، والسيرفر رجّع صفحة 404 بـ HTML. وده لازم تاخد بالك منه: [[curl -s]] مش بيقولك الـ status. ([[-o /dev/null]] ارمي البودي، و [[-w]] اطبع معلومات عن الرد.) على السيرفر المحلي:

~~~text الناتج
User-agent: *
Disallow: /admin/
Sitemap: http://127.0.0.1:8791/sitemap.xml
~~~

- [[User-agent: *]]: القواعد دي لكل الـ crawlers.
- [[Disallow: /admin/]]: متدخلش هنا. ([[Disallow: /]] لوحدها = متدخلش الموقع كله.)
- [[Sitemap:]]: مكان الـ sitemap.

## ٣. [[curl -sI https://example.com/sitemap.xml]]

~~~text الناتج على example.com
HTTP/2 404
~~~

~~~text الناتج على السيرفر المحلي
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8
~~~

[[-I]] هنا لأننا عايزين نعرف «موجود ولا لأ» بس، فالسطر الأول كفاية.

## الخلاصة

- اللي مش في [[curl -s]] ممكن جوجل والـ bots ميشوفوهوش بسهولة.
- كل صفحة: title و description مختلفين، و og:image للمشاركة.
- [[curl -s]] بيخبّي الـ status، فاسأل بـ [[-I]] أو [[-w "%{http_code}"]].`,
          lines: [
            "هات الصفحة زي ما جوجل بيشوفها، وطلّع الـ title والـ description و Open Graph. لو فاضي، المحتوى بيتعمل بـ JavaScript.",
            "ملف robots.txt: إيه اللي مسموح للـ crawlers.",
            "الـ sitemap موجود؟ (200 يعني موجود)."
          ],
          sol: R`على صفحة مظبوطة أمر الـ grep بيطلّع سطور فيها [[<title>...]] و [[<meta name="description" content="...">]] و [[<meta property="og:title" ...>]] و [[og:image]]. كرره على ٣ صفحات مختلفة (الرئيسية ومقال ومنتج) ولازم الـ title والـ description يختلفوا في كل واحدة.

الغلط الأشهر في SPA: كل الصفحات بترجّع نفس الـ title، أو grep مش بيلاقي description خالص لأن React بيحطها بعد التحميل. [[robots.txt]] المفروض يرجع نص فيه [[Sitemap: https://...]] ومفيهوش [[Disallow: /]] (دي بتمنع جوجل من الموقع كله، وبتتنسي من staging). و [[curl -sI .../sitemap.xml]] لازم يرجع [[200]]، لو [[404]] اعمل واحد.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** شغّل السطور التلاتة على موقعك، واكتب: الـ title، والـ description، وصورة og، وفيه robots.txt ولا لأ، و sitemap بيرجّع كام.`, done: R`كل الخانات مكتوبة، وأي حاجة ناقصة متعلّم عليها، وعارف إن [[curl]] شايف اللي الـ crawler شايفه.` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت بياخد لستة URLs ويطبع لكل واحد: الـ status، وطول الـ title، وفيه description ولا لأ، وفيه [[<link rel="canonical">]] ولا لأ، وفيه [[noindex]] ولا لأ.`, done: R`السكربت بيطبع جدول، وصفحة حطيت فيها [[<meta name="robots" content="noindex">]] ظهرت متعلّمة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** نفس الصفحة بـ [[curl -A "Googlebot"]] وبـ [[curl -A "WhatsApp/2"]] وبـ [[curl]] عادي: الـ HTML متطابق؟ (بعض المواقع بترجّع حاجة مختلفة حسب الـ User-Agent).`, done: R`بـ [[diff]] بين التلات ردود: لو متطابقين كتبت كده، ولو لأ كتبت الفرق، وعارف إن رد مختلف لجوجل عن الناس اسمه cloaking وجوجل بيعاقب عليه.` },
          ],
        },
        {
          cmd: "أدوات جوجل",
          title: "إزاي جوجل شايف موقعك",
          desc: "ابحث في جوجل بـ [[site:example.com]] تعرف أنهي صفحات متسجلة عنده. Google Search Console (بعد ما تثبت إن الدومين بتاعك) هي أهم أداة: URL Inspection بيوريك الصفحة زي ما Googlebot شافها ولو فيها مشكلة. و Rich Results Test بيختبر الـ structured data (JSON-LD). و PageSpeed Insights للأداء.",
          example: R`site:example.com
site:example.com inurl:blog
search.google.com/search-console
search.google.com/test/rich-results
pagespeed.web.dev`,
          try: "سجّل موقع من مواقعك في Search Console، واعمل URL Inspection لصفحة جديدة.",
          flag: "keys",
          deep: {
            why: "جوجل هو أهم زائر لموقعك. محتاج تعرف إزاي هو شايفه، وإيه الصفحات اللي عنده.",
            how: R`[[site:example.com]] في Google Search بيعرض الصفحات اللي جوجل عنده. لو صفحة مهمة مش ظاهرة، جوجل مش وصل إليها أو فيها مشكلة.

Google Search Console: بتثبّت إنك صاحب الموقع، وبيوريك الـ impressions والـ clicks والـ position في نتايج البحث.

URL Inspection: بتحط URL وبيوريك Googlebot شايفه إيه. لو Googlebot مش قادر يشوف المحتوى (SPA من غير SSR) بيقولك.

Rich Results Test: لو فيه structured data (JSON-LD)، بيتحقق إنه صح وهيظهر كـ rich result.`,
            when: "بعد إطلاق الموقع. كل شهر تشوف اللي الناس بيبحثوا عنه. لما صفحة مهمة مش في جوجل.",
            mistakes: "تستنى جوجل يلاقي موقعك لوحده. ابعت sitemap في Search Console على طول."
          },
          teach: R`## الأول: الأدوات دي بتسأل جوجل نفسه

curl بيوريك اللي **ممكن** جوجل يشوفه، والأدوات دي بتوريك اللي جوجل **شافه فعلًا**. كلها مواقع على النت محتاجة حساب جوجل أو موقع حقيقي، فالشرح هنا من Google Search Central docs ومش متجرّب من الجهاز ده.

---

## ١. [[site:example.com]]

بتكتبه في خانة بحث جوجل العادية. [[site:]] معناها «النتايج من الدومين ده بس». النتايج = الصفحات اللي جوجل عامل لها index (فهرسة) تقريبًا. العدد اللي بيظهر تقريبي، فمتعتمدش عليه كرقم دقيق.

## ٢. [[site:example.com inurl:blog]]

[[inurl:blog]] = الـ URL فيه كلمة blog. الاتنين مع بعض: «صفحات الموقع ده اللي في قسم الـ blog». مفيد تشوف قسم معين اتفهرس ولا لأ.

## ٣. [[search.google.com/search-console]]

Google Search Console. لازم تثبت إن الموقع بتاعك:

| النوع | بيغطي | التأكيد |
|---|---|---|
| Domain | الدومين كله بكل الـ subdomains و http و https | TXT record في الـ DNS |
| URL prefix | الـ URL ده بس (مثلًا https://www) | ملف HTML أو meta tag أو Google Analytics |

وجواه: **URL Inspection** (حالة صفحة واحدة: متفهرسة؟ وآخر مرة Googlebot زارها؟ وشكلها زي ما شافها)، و **Performance** (الكلمات اللي ظهرت بيها، والظهور والضغطات)، و **Sitemaps** (تبعت الـ sitemap).

## ٤. [[search.google.com/test/rich-results]]

بيختبر الـ structured data: كود JSON-LD في الصفحة بيوصف المحتوى (منتج بسعر، مقال، أسئلة شائعة). لو صح، الصفحة ممكن تظهر في جوجل بشكل مميز (نجوم، سعر). بتديه URL أو كود.

## ٥. [[pagespeed.web.dev]]

PageSpeed Insights: بيشغّل Lighthouse من سيرفرات جوجل، **وفوقه** بيانات زوار حقيقيين من Chrome (CrUX) لو موقعك عليه زيارات كفاية. ده المكان اللي هتلاقي فيه INP الحقيقي، اللي Lighthouse لوحده مش بيقيسه.

| الأداة | بتجاوب على |
|---|---|
| [[site:]] | جوجل عنده إيه من موقعي؟ |
| Search Console | صفحة معينة متفهرسة؟ والناس بتلاقيني بإيه؟ |
| Rich Results Test | الـ structured data بتاعتي صح؟ |
| PageSpeed Insights | سرعتي في المعمل وعند الزوار الحقيقيين |

## الخلاصة

- [[site:]] نظرة سريعة، و Search Console هو المرجع الحقيقي.
- ابعت الـ sitemap في Search Console أول ما الموقع يطلع.
- PageSpeed Insights = Lighthouse + بيانات زوار حقيقيين.`,
          sol: R`في Search Console: Add property، واختار Domain (بيتأكد بـ TXT record في الـ DNS) أو URL prefix (بيتأكد بملف HTML أو meta tag). بعد التأكيد حط لينك الصفحة الجديدة في خانة البحث فوق (URL Inspection).

الغالب هتشوف [[URL is not on Google]] لصفحة جديدة، وده طبيعي. دوس Test Live URL عشان تتأكد إن جوجل قادر يوصلها (لازم يقول [[URL is available to Google]])، وبعدين Request Indexing. بعد أيام ارجع هتلاقيها [[URL is on Google]].

لو قالك [[Excluded by 'noindex' tag]] أو [[Blocked by robots.txt]] ده غلط عندك مش عند جوجل. وخد بالك إن البيانات في Performance بتاخد يومين تلاتة تظهر لموقع جديد.`,
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** ابحث بـ [[site:]] على موقعك، وبعدين [[site:]] مع [[inurl:]] على فولدر، واكتب العدد التقريبي في كل واحد.`, done: R`الرقمين مكتوبين، وصفحة قديمة أو مش المفروض تتفهرس (staging أو admin) لو ظهرت متعلّم عليها.` },
            { lvl: 'تطبيق', t: R`**Rich Results:** حط JSON-LD لـ [[Product]] أو [[Article]] في صفحة، واختبرها في Rich Results Test، وصلّح أي error أو warning.`, done: R`الاختبار بيقول إن الصفحة eligible من غير errors، وعارف تفرّق بين error بيمنع النتيجة و warning مش بيمنعها.` },
            { lvl: 'تحدي', t: R`**قارن:** PageSpeed Insights على صفحتك: قسم بيانات المستخدمين الحقيقيين (CrUX) وقسم Lighthouse تحته. اكتب LCP و INP و CLS من الاتنين، وليه مختلفين.`, done: R`الأرقام مكتوبة (ولو الموقع جديد ومفيش CrUX كتبت كده)، وكاتب إن الأول p75 لزيارات حقيقية في ٢٨ يوم والتاني زيارة معملية واحدة (درس «Core Web Vitals (LCP/INP)»).` },
          ],
        },
        {
          cmd: "التعديل وصل؟ curl و grep",
          title: "اتأكد إن التعديل وصل للسيرفر من غير متصفح: شغّل في الخلفية، استنى الجاهزية، و curl و grep",
          desc: R`بدل ما تفتح المتصفح بعد كل تعديل وتسأل «هو اتحدّث ولا ده كاش؟»، اسأل السيرفر نفسه: شغّل [[npm run dev > dev.log 2>&1 &]] (اللوج في ملف والترمنال فاضي)، واستنى لحد ما اللوج يقول [[Ready in]] **أو** خطأ (حلقة [[until grep -q ...]] بحد أقصى للوقت)، وبعدين [[curl -w]] يطبع الكود والوقت والحجم، و [[grep -oE]] يدوّر على النص أو اللون الجديد في الرد نفسه.

ولما الصفحة ترجع [[500]]: الإجابة في اللوج مش في المتصفح ([[grep -aiE "error|⨯" dev.log | tail -5]]). والفخاخ اللي اتقابلت: [[Ready in]] بيتطبع **قبل** ما الصفحة تتبني (أول طلب ممكن ياخد ثواني أو دقيقة)، والخطأ ساعات بيتكتب على stderr فلو مجمعتش [[2>&1]] مش هتشوفه، واللوج فيه ألوان فـ [[grep]] بيقول [[binary file matches]].`,
          example: R`# Linux and Mac (and Git Bash):
npm run dev > dev.log 2>&1 &
timeout 60 bash -c 'until grep -aqE "Ready in|Error|Another next dev" dev.log; do sleep 1; done'
curl -s -o /dev/null -w "HTTP: %{http_code}\nTIME: %{time_total}s\nSIZE: %{size_download}\n" http://localhost:3000/ar
curl -s http://localhost:3000/en | grep -oE "(We build|Services)" | sort -u
curl -s -o /dev/null -w "ROOT: %{http_code} -> %{redirect_url}\n" http://localhost:3000/
curl -sL -o /dev/null -w "FINAL: %{http_code} %{url_effective} redirects=%{num_redirects}\n" http://localhost:3000/
grep -aiE "error|⨯" dev.log | tail -5
sed -E 's/\x1b\[([0-9;]*)m//g' dev.log | tail -50
# Windows (PowerShell):
curl.exe -s -o NUL -w "HTTP: %{http_code}\nTIME: %{time_total}s\n" http://localhost:3000/ar
(curl.exe -s http://localhost:3000/en | Select-String -Pattern 'We build|Services' -AllMatches).Matches.Value | Sort-Object -Unique
Select-String -Path dev.log -Pattern 'Ready in|Error' -Quiet`,
          lines: [
            R`شغّل سيرفر الـ dev في الخلفية ([[&]] في الآخر)، وكل اللي بيطبعه يروح [[dev.log]]: [[>]] الطبيعي (stdout)، و [[2>&1]] الأخطاء (stderr) في نفس الملف. من غير [[2>&1]] الأخطاء بتضيع.`,
            R`استنى لحد ما اللوج فيه «جاهز» أو «خطأ». [[until ...; do sleep 1; done]] بيعيد كل ثانية لحد ما [[grep -q]] يلاقي (و [[-q]] من غير طباعة، و [[-a]] اعتبر الملف نص حتى لو فيه ألوان). و [[timeout 60]] بيقفل الحلقة بعد ٦٠ ثانية بدل ما تستنى للأبد.`,
            R`اطلب الصفحة ورمي الـ body ([[-o /dev/null]])، واطبع حاجات عن الطلب بـ [[-w]]: كود الحالة، والوقت الكلي بالثواني، وحجم اللي اتحمّل بالبايت. [[\n]] سطر جديد.`,
            R`هات الصفحة الإنجليزي ودوّر فيها على النصين. [[-o]] الجزء اللي طابق بس، و [[sort -u]] كل واحد مرة. لو النص الجديد ظهر، التعديل وصل للسيرفر.`,
            R`[[/]] بيحوّل؟ [[%{redirect_url}]] بيطبع المكان اللي السيرفر قال روح له، و curl **مش بيروح** (من غير [[-L]]). فبتشوف التحويل نفسه.`,
            R`نفس الطلب بس [[-L]] بيمشي ورا التحويلات. [[%{url_effective}]] آخر رابط وصل له، و [[%{num_redirects}]] عدد التحويلات في السكة.`,
            R`لما حاجة ترجع 500: آخر ٥ سطور فيها [[error]] أو علامة [[⨯]] (اللي Next بيحطها قبل الأخطاء). [[-i]] من غير فرق capital و small.`,
            R`اللوج فيه أكواد ألوان (حرف ESC وبعده رقم اللون وحرف m، زي اللي بيلوّن [[⨯]] بالأحمر). [[sed]] بيشيلها عشان يتقري ويتعمله [[grep]] عادي، و [[-E]] regex موسّع فالقوسين [[( )]] مجموعة، و [[tail -50]] آخر ٥٠ سطر. (في الشرح نفس الأمر من غير [[-E]] ومن غير القوسين، والاتنين طلّعوا نفس الناتج في GNU sed.)`,
            R`PowerShell: [[curl.exe]] (مش [[curl]] اللي ممكن يبقى alias لـ [[Invoke-WebRequest]] في 5.1)، و [[NUL]] هو [[/dev/null]] بتاع ويندوز.`,
            R`PowerShell: [[Select-String -AllMatches]] بيلاقي كل المرات في الرد، و [[.Matches.Value]] النصوص نفسها، و [[Sort-Object -Unique]] كل واحد مرة.`,
            R`PowerShell: هل اللوج فيه «جاهز» أو «خطأ»؟ [[-Quiet]] بيرجّع [[True]] أو [[False]] بس، فينفع في [[while]].`,
          ],
          try: R`على مشروع Next عندك: شغّل dev في الخلفية باللوج، واستنى بالحلقة، و [[curl -w]] على الصفحة الرئيسية مرتين ورا بعض وقارن [[TIME]]. وبعدين غيّر كلمة في الصفحة واثبت بـ [[curl | grep]] إنها وصلت. وبعدين اكسر الصفحة ([[throw new Error("test")]]) واقرا الخطأ من اللوج بـ [[grep]] من غير ما تفتح المتصفح.`,
          flag: "term",
          teach: R`## العَرَض

بعد كل تعديل بتفتح المتصفح وتعمل refresh وتبص. ولما مش بيظهر، مش عارف: التعديل موصلش؟ ولا السيرفر لسه بيبني؟ ولا المتصفح جايب نسخة قديمة؟ ولا الصفحة وقعت وانت شايف صفحة الخطأ بتاعة Next؟ الدرس ده بيشيل المتصفح من المعادلة: السيرفر نفسه هو اللي يجاوب.

---

## المعمل

مشروع Next 16.4.4: صفحة [[/[lang]]] بتعرض [[We build stores]] و [[Services]] بالإنجليزي و [[بنبني متاجر]] و [[خدماتنا]] بالعربي، و [[/]] بيحوّل لـ [[/ar]] من [[next.config.mjs]]:

~~~js next.config.mjs
export default {
  async redirects() { return [{ source: "/", destination: "/ar", permanent: false }]; },
};
~~~

واتجرّب في [[docker run node:22-slim]] (لينكس) وفي Git Bash و PowerShell 7.6 و 5.1 على ويندوز 11.

---

## ١. شغّل في الخلفية، واللوج في ملف

~~~bash
npm run dev > dev.log 2>&1 &
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[> dev.log]] | اللي البرنامج بيطبعه عادي (stdout) يروح الملف بدل الشاشة |
| [[2>&1]] | الأخطاء (stderr، رقم 2) تروح لنفس مكان stdout (رقم 1) |
| [[&]] | شغّله في الخلفية وارجعلي الـ prompt على طول |

ليه [[2>&1]] مهمة بالذات؟ لأن Next بيكتب [[Ready in]] على stdout، وبعض الأخطاء على stderr. جربناها على ويندوز بـ [[Start-Process]] وكل واحد في ملف لوحده، والمشروع فيه سيرفر شغّال أصلًا:

~~~text dev2.log (stdout)
▲ Next.js 16.4.4 (Turbopack)
- Local:         http://localhost:4312
✓ Ready in 339ms
~~~

~~~text dev2.err (stderr)
⨯ Another next dev server is already running.
...
or run taskkill /PID 12120 /F to stop it and start a new one.
~~~

اللي بيبص على stdout بس شاف [[Ready in]] وكمّل، و [[curl]] رجّع [[000]] (مفيش سيرفر على 4312، اتقفل بعد الرسالة). نفس الملف = نفس الحكاية بالترتيب.

> وفي Next 16 فيه لوج تاني بيتكتب لوحده من غير ما تعمل حاجة: [[.next/dev/logs/next-development.log]]، كل سطر JSON فيه [[timestamp]] و [[source]] ([[Server]] أو [[Browser]]) و [[level]]. يعني [[grep '"level":"ERROR"' .next/dev/logs/next-development.log]] بيجيب الأخطاء، وأخطاء المتصفح (زي hydration) بتتسجّل هناك كمان بـ [[source":"Browser]].

---

## ٢. استنى الجاهزية، بحد أقصى

~~~bash
timeout 60 bash -c 'until grep -aqE "Ready in|Error|Another next dev" dev.log; do sleep 1; done'
~~~

- [[until COND; do ...; done]]: كرر لحد ما الشرط ينجح. والشرط هنا [[grep]] لقى واحدة من التلات كلمات.
- ليه [[Error]] و [[Another next dev]] مع [[Ready in]]؟ لأن لو السيرفر فشل، [[Ready in]] ممكن ميجيش أبدًا، فتستنى للأبد. استنى «جاهز **أو** فشل»، وبعدين افحص أنهي واحد.
- [[timeout 60]]: لو مفيش ولا واحدة خلال ٦٠ ثانية اقفل. جربناه على كلمة مش موجودة: خرج بعد ٥ ثواني ([[timeout 5]]) ورقم الخروج [[124]] (رقم [[timeout]] لما الوقت يخلص).
- [[-a]]: من غيرها [[grep]] على لوج Next طبع [[grep: /tmp/dev.log: binary file matches]] بدل السطر، لأن اللوج فيه أكواد ألوان فاتفهم ملف binary.

وفي PowerShell:

~~~powershell
$t = 0
while (-not (Select-String -Path dev.log -Pattern 'Ready in|Error' -Quiet -ErrorAction SilentlyContinue) -and $t -lt 60) { Start-Sleep 1; $t++ }
~~~

[[$t]] عدّاد بيمنع الانتظار للأبد. واشتغلت في 7.6 و 5.1.

والماك معندوش [[timeout]] من غير تسطيب (من وثائق macOS: بييجي مع [[brew install coreutils]] باسم [[gtimeout]]). الشكل اللي بيشتغل في أي bash من غير أدوات زيادة: عدّاد.

~~~bash
for i in $(seq 1 60); do grep -aqE "Ready in|Error" dev.log && break; sleep 1; done
~~~

[[seq 1 60]] بيطبع الأرقام من 1 لـ 60، والحلقة بتلف عليهم، و [[&& break]] بيخرج أول ما [[grep]] يلاقي. جربناه في الكونتينر على كلمة مش موجودة بـ [[seq 1 3]]: خلص بعد ٣ لفّات ([[i=3]]).

### فخ: [[Ready in]] مش معناها إن الصفحة جاهزة

~~~text dev.log (لينكس، أول تشغيل)
▲ Next.js 16.4.4 (Turbopack)
- Local:         http://localhost:3000
✓ Ready in 442ms
...
It looks like you're trying to use TypeScript but do not have the required package(s) installed.
Installing dependencies
...
 GET /ar 200 in 678ms (next.js: 542ms, application-code: 136ms)
~~~

~~~text curl -w (أول طلب)
HTTP: 200
TIME: 84.933839s
SIZE: 9547
~~~

[[Ready in 442ms]] = السيرفر بيسمع. الصفحة نفسها بتتبني مع **أول طلب**. وفي المرة دي Next لقى ملفات [[.tsx]] ومفيش [[typescript]] متسطب، فسطّبه بنفسه، والطلب الأول خد ٨٥ ثانية. التاني على نفس الصفحة: [[TIME: 0.045515s]]. فـ [[curl]] أول مرة محتاج [[--max-time]] كبير (أو اعمل طلب «تسخين» وتجاهل وقته).

---

## ٣. [[curl -w]]: الكود والوقت والحجم

~~~bash
curl -s -o /dev/null -w "HTTP: %{http_code}\nTIME: %{time_total}s\nSIZE: %{size_download}\n" http://localhost:3000/ar
~~~

~~~text الناتج (التاني)
HTTP: 200
TIME: 0.045515s
SIZE: 9547
~~~

| المتغير | معناه |
|---|---|
| [[%{http_code}]] | كود الرد. [[000]] = مفيش رد خالص (السيرفر مش شغّال أو البورت غلط) |
| [[%{time_total}]] | الطلب كله بالثواني |
| [[%{size_download}]] | حجم الـ body بالبايت. لو فجأة صغر جدًا (زي [[217]]) يبقى غالبًا ده سيرفر تاني أو صفحة خطأ |

وعلى ويندوز في PowerShell بـ [[curl.exe -s -o NUL -w ...]]: [[HTTP: 200]] و [[TIME: 0.045538s]] و [[SIZE: 13601]]. وعلى نفس الجهاز [[curl localhost:3000]] رجّع **217 بايت** من سيرفر تاني مش بتاعنا خالص كان ماسك 3000 (درس «dev server قديم و .next» في تاب Next).

---

## ٤. التعديل وصل؟ دوّر على النص نفسه

~~~bash
curl -s http://localhost:3000/en | grep -oE "(We build|Services)" | sort -u
~~~

~~~text الناتج
Services
We build
~~~

الاتنين موجودين في الـ HTML اللي السيرفر بعته. لو غيّرت [[We build]] لـ [[We craft]]، نفس الأمر بـ [[We craft]] لازم يلاقيها. ولو التعديل في الـ CSS، دوّر في ملف الـ CSS نفسه:

~~~bash
CSS_URL=$(curl -s http://localhost:3000/ar | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1)
curl -s "http://localhost:3000$CSS_URL" | grep -oE "(6366f1|0ea5e9)" | sort -u
~~~

ولو عايز تستنى لحد ما الـ build يلقط التعديل (بعد الحفظ بثانية أو اتنين):

~~~bash
timeout 30 bash -c 'until curl -s "http://localhost:3000$0" | grep -q 0ea5e9; do sleep 1; done' "$CSS_URL" && echo arrived
~~~

([[$0]] جوه [[bash -c]] هو أول argument بعد النص: [[$CSS_URL]].)

وللإنتاج: بعد [[npm run build]] الـ CSS في [[.next/static/chunks/*.css]] باسم مبني على المحتوى:

~~~text grep -oE "0ea5e9|22c55e|6366f1" .next/static/chunks/*.css | sort | uniq -c
      1 0ea5e9
      1 22c55e
~~~

القديم ([[6366f1]]) مش موجود خالص في البناء الجديد.

---

## ٥. التحويلات: [[%{redirect_url}]] و [[-L]]

~~~text curl -s -o /dev/null -w "ROOT: %{http_code} -> %{redirect_url}\n" http://localhost:3000/
ROOT: 307 -> http://localhost:3000/ar
~~~

[[307]] = تحويل مؤقت ([[permanent: false]])، والمتصفح هيروح [[/ar]]. curl من غير [[-L]] وقف عند التحويل ووراك هو رايح فين.

~~~text curl -sL -o /dev/null -w "FINAL: ..." http://localhost:3000/
FINAL: 200 http://localhost:3000/ar redirects=1
~~~

[[-L]] مشي وراه: تحويل واحد ووصل لـ 200. لو [[redirects]] طلع رقم كبير أو curl قال [[Maximum (50) redirects followed]]، عندك loop.

وفي PowerShell 7: [[Invoke-WebRequest http://localhost:3000/ -MaximumRedirection 0 -SkipHttpErrorCheck]] و [[.StatusCode]] و [[.Headers.Location]] طلّعوا [[307 -> /ar]] (الـ Location هنا نسبي زي ما السيرفر بعته). و [[-SkipHttpErrorCheck]] مش موجود في 5.1، فهناك استخدم [[curl.exe]].

---

## ٦. الصفحة رجعت 500: اللوج هو اللي يقول

كسرنا الصفحة بـ [[throw new Error("missing dictionary: fr")]] لو اللغة [[fr]]:

~~~text curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://localhost:3000/fr
HTTP: 500
~~~

~~~text grep -aiE "error|⨯" dev.log | tail -5
⨯ Error: missing dictionary: fr
> 3 |   if (lang === "fr") throw new Error("missing dictionary: fr");
~~~

ولو عايز السياق كله:

~~~text sed 's/\x1b\[[0-9;]*m//g' dev.log | tail -12
    at Home (app/[lang]/page.tsx:3:28)
  1 | export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  2 |   const { lang } = await params;
> 3 |   if (lang === "fr") throw new Error("missing dictionary: fr");
    |                            ^
...
  digest: '3587257851'
}
 GET /fr 500 in 88ms (next.js: 14ms, application-code: 74ms)
~~~

الملف والسطر والعمود ([[page.tsx:3:28]])، والسطر نفسه، و [[^]] تحت مكان الخطأ. و [[digest]] رقم بيظهر للمستخدم في الإنتاج بدل الرسالة (عشان متكشفش تفاصيل)، فلما حد يبعتلك الرقم ده تدوّر عليه في لوج السيرفر.

| الحتة في [[sed]] | معناها |
|---|---|
| [[\x1b]] | حرف ESC (رقمه 27) اللي بيبدأ بيه كود اللون |
| الباقي | قوس مربع مفتوح (عليه backslash عشان يتقري حرف عادي)، وبعده أرقام وفواصل منقوطة بأي عدد، وبعدين حرف [[m]]. زي كود الأحمر: 31 وبعدها m |
| [[s/.../ /g]] | استبدله بولا حاجة، كل مرة في السطر |

---

## البدايل وليه الطريقة دي

| البديل | امتى ينفع | ليه مش هو الأساس هنا |
|---|---|---|
| تفتح المتصفح | تشوف الشكل نفسه | الكاش والإضافات والتاب القديم بيدخلوا في الإجابة |
| [[sleep 10]] بدل الحلقة | سكربت سريع | يا كتير (وقت ضايع) يا قليل (أول build بطيء)، ومبيعرفش لو السيرفر وقع |
| تستنى البورت يفتح ([[nc -z]]) | سيرفر غير Next | البورت بيفتح قبل الصفحة ما تتبني، زي [[Ready in]] بالظبط |
| Playwright | تختبر سلوك وتفاعل | تقيل على سؤال «النص وصل؟» |

## الخلاصة

| السؤال | الأمر |
|---|---|
| شغّل واحفظ اللوج | [[npm run dev > dev.log 2>&1 &]] |
| استنى | [[timeout 60 bash -c 'until grep -aqE "Ready in\|Error" dev.log; do sleep 1; done']] |
| الصفحة شغّالة؟ | [[curl -s -o /dev/null -w "%{http_code}"]] |
| التعديل وصل؟ | [[curl -s URL \| grep -oE "النص"]] |
| بيحوّل لفين؟ | [[-w "%{redirect_url}"]]، و [[-L]] تمشي وراه |
| وقعت ليه؟ | [[grep -aiE "error\|⨯" dev.log \| tail -5]] |

> [[Ready in]] = السيرفر بيسمع، مش الصفحة جاهزة. والحكم النهائي [[curl]] على الصفحة نفسها.`,
          deep: {
            why: R`السؤال «التعديل وصل؟» محتاج إجابة من مصدر واحد مضمون. المتصفح مش مضمون (كاش، تاب قديم، سيرفر تاني، إضافات). [[curl]] بيكلّم السيرفر مباشرة، والأوامر نفسها تنفع في سكربت أو CI أو بعد deploy على سيرفر مفيهوش شاشة. وبتوفّر وقت: سطر واحد بدل ٣٠ ثانية تبص على صفحة.`,
            how: R`[[&]] بيشغّل البرنامج كـ job في الخلفية والـ shell بيكمّل. [[until]] بيشغّل الشرط، ولو رقم خروجه مش صفر بيشغّل الجسم ويرجع. [[grep -q]] بيخرج 0 لما يلاقي. [[timeout N cmd]] بيبعت SIGTERM بعد N ثانية ويرجّع 124. و [[curl -w]] بيطبع متغيرات بعد ما الطلب يخلص (فيه عشرات: [[time_connect]] و [[time_starttransfer]] و [[remote_ip]] وغيرهم في [[man curl]]). و Next dev بيبني كل route أول ما حد يطلبه، فأول طلب = build لـ route ده، والباقي من الكاش.`,
            when: R`بعد أي تعديل عايز تتأكد إنه وصل (نص، أو لون، أو redirect، أو header). وفي سكربت بيشغّل السيرفر ويختبره ويقفله (CI بسيط أو smoke test بعد النشر: نفس [[curl -w]] على الدومين الحقيقي). ولما الصفحة بتقع ومش عايز تفتح المتصفح على سيرفر بعيد.`,
            mistakes: R`[[> dev.log]] من غير [[2>&1]] فالأخطاء تضيع. حلقة [[until]] من غير [[timeout]] فتستنى للأبد لو السيرفر وقع. تستنى [[Ready in]] بس. [[grep]] من غير [[-a]] على لوج ملوّن. تتحكم على أول طلب ([[TIME]] كبير) إن الموقع بطيء. [[curl]] من غير [[-L]] وتستغرب إن الـ body فاضي (ده تحويل). وفي PowerShell 5.1 [[curl]] = [[Invoke-WebRequest]]، فاكتب [[curl.exe]].`
          },
          sol: R`أول [[curl -w]]: [[TIME]] كبير (أول build للـ route)، والتاني أقل من ثانية بكتير ([[0.04s]] في المعمل). بعد ما غيّرت الكلمة وحفظت: [[curl -s URL | grep -oE "الكلمة الجديدة"]] بيطبعها (ممكن تحتاج ثانية بعد الحفظ، ولو مطبعتش جرّب تاني أو استخدم حلقة [[until]]).

بعد [[throw new Error("test")]]: [[curl -w "%{http_code}"]] بيطبع [[500]]، و [[grep -aiE "error|⨯" dev.log | tail -5]] بيطبع [[⨯ Error: test]] والسطر اللي فيه الـ throw، وأمر [[sed]] اللي بيشيل الألوان (اللي في المثال) مع [[tail -20]] بيوري الملف ورقم السطر و [[GET /... 500 in ...]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من غير ما تشغّل: [[curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/]] طبع [[307 http://localhost:3000/ar]]. إيه اللي هيطبعه نفس الأمر بـ [[-L]] و [[%{url_effective}]] بدل [[%{redirect_url}]]؟ اكتب توقعك وبعدين جرّب على أي موقع بيحوّل.`, done: R`توقعت [[200 http://localhost:3000/ar]] (أو اللي يقابلها في موقعك)، وطابق التشغيل، وتقدر تقول الفرق بين [[redirect_url]] و [[url_effective]] في جملة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[smoke.sh]]: بيشغّل [[npm run dev]] في الخلفية باللوج، ويستنى بـ [[timeout]]، ويطلب ٣ صفحات ويطبع لكل واحدة الكود والوقت، ويطبع [[FAIL]] ويخرج بـ 1 لو أي واحدة مش 200، وفي الآخر يقفل السيرفر اللي شغّله هو بس ([[kill $PID]] بـ [[$!]]).`, done: R`على مشروع سليم بيطبع ٣ سطور [[200]] ويخرج 0، ولو كسرت صفحة بيطبع [[FAIL /اسم-الصفحة 500]] ويخرج 1، وبعد ما يخلص البورت فاضي.` },
            { lvl: 'تطبيق', t: R`**صلّح:** السكربت ده اللي بيعلّق ساعات: [[npm run dev > dev.log & until grep -q "Ready in" dev.log; do sleep 1; done; curl -s localhost:3000 | grep -c "Hello"]]. فيه ٣ مشاكل على الأقل (الأخطاء رايحة فين، والانتظار للأبد، والألوان). اكتب النسخة المصلّحة واختبرها والسيرفر بيقع (مثلًا والبورت مشغول بـ [[-p]]).`, done: R`النسخة المصلّحة فيها [[2>&1]] و [[timeout]] و [[-a]] و [[Error]] في الشرط، ولما البورت مشغول بتخرج في أقل من دقيقة وبتطبع سطر [[EADDRINUSE]] من اللوج.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** خد [[.next/dev/logs/next-development.log]] من مشروعك بعد شوية تجارب، واكتب أمر (بـ [[grep]] أو [[node -e]] أو [[jq]] لو عندك) بيطبع آخر ٣ أخطاء: الوقت، والمصدر ([[Server]] أو [[Browser]])، وأول سطر من الرسالة.`, done: R`الأمر بيطبع ٣ سطور كل واحد فيه [[timestamp]] و [[Server]] أو [[Browser]] وأول سطر من الخطأ، وبيتغيّر لو عملت خطأ جديد وشغّلته تاني.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** على صفحة واحدة، قيس [[time_total]] لأول طلب بعد ما تشغّل السيرفر، وبعدين ٥ طلبات ورا بعض، وبعدين بعد ما تعدّل الصفحة. اطبع جدول بـ [[curl -w]] واشرح ليه الأول مختلف.`, done: R`عندك ٧ أرقام: الأول أكبر بكتير، والـ ٥ قريبين من بعض، واللي بعد التعديل أكبر شوية، وكاتب سبب كل واحد في جملة (build أول طلب، كاش، recompile).` },
            { lvl: 'تحدي', t: R`**ابني:** نفس [[smoke.sh]] بس PowerShell: [[Start-Process]] بـ [[-RedirectStandardOutput]] و [[-RedirectStandardError]] (لازم ملفين مختلفين)، وحلقة [[while]] بعدّاد على **الملفين**، و [[curl.exe -w]]، و [[Stop-Process]] في الآخر. اختبره والبورت مشغول وشوف أنهي ملف فيه الخطأ.`, done: R`السكربت بيشتغل في 7 و 5.1، والبورت مشغول بيخرج برسالة فيها السطر اللي جه من ملف الـ stderr، ومن غير مشكلة بيطبع [[200]].` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > dev.js <<'EOF'
const http = require("http");
console.log("starting...");
setTimeout(() => {
  http.createServer((q, s) => {
    if (q.url === "/") { s.writeHead(307, { Location: "/ar" }); return s.end(); }
    if (q.url === "/fr") { console.error("\x1b[31m⨯ Error: missing dictionary: fr\x1b[39m"); s.writeHead(500); return s.end("err"); }
    s.end(q.url === "/en" ? "<h1>We build stores</h1><a>Services</a>" : "<h1>ar</h1>");
  }).listen(18940, "127.0.0.1", () => console.log("\x1b[32m✓\x1b[39m Ready in 12ms"));
}, 1500);
EOF
node dev.js > dev.log 2>&1 &
PID=$!
for i in $(seq 1 20); do grep -aqE "Ready in|Error" dev.log && break; sleep 1; done; grep -aq "Ready in" dev.log && echo "ready"
curl -s -o /dev/null -w "HTTP: %{http_code}\n" http://127.0.0.1:18940/ar
curl -s http://127.0.0.1:18940/en | grep -oE "(We build|Services)" | sort -u
curl -s -o /dev/null -w "ROOT: %{http_code} -> %{redirect_url}\n" http://127.0.0.1:18940/
curl -sL -o /dev/null -w "FINAL: %{http_code} redirects=%{num_redirects}\n" http://127.0.0.1:18940/
curl -s -o /dev/null -w "FR: %{http_code}\n" http://127.0.0.1:18940/fr
sleep 1
grep -aiE "error|⨯" dev.log | sed -E 's/\x1b\[([0-9;]*)m//g' | tail -1
kill $PID; wait $PID 2>/dev/null; sleep 1`, expect: [R`ready`, R`HTTP: 200`, R`Services`, R`We build`, R`ROOT: 307 -> http://127.0.0.1:18940/ar`, R`FINAL: 200 redirects=1`, R`FR: 500`, R`⨯ Error: missing dictionary: fr`] },
            { os: [R`ubuntu`, R`windows`], sh: R`bash`, run: R`echo 'still starting' > dev.log
timeout 2 bash -c 'until grep -aqE "Ready in|Error" dev.log; do sleep 1; done'; echo "timeout-exit=$?"`, expect: [R`timeout-exit=124`] },
          ],
        },
        {
          cmd: "اللقطة ناقصة: 591px وفيديو مؤقت",
          title: "«الـ screenshot مش واضح والصور ناقصة»: المعاينة كانت بعرض موبايل، والفيديو من رابط مؤقت",
          desc: R`صورة الصفحة طالعة ناقصة: مفيش فيديو في الـ hero، والمعرض اختفى. قبل ما تصلّح أي CSS، اسأل سؤالين بالترتيب: (١) **اللقطة اتاخدت بعرض كام؟** معاينة بعرض 591px بتشتغل عليها قواعد الموبايل ([[max-width: 767px]])، فالحاجات اللي بتستخبى على الموبايل هتستخبى. صوّر بـ 1440 الأول. (٢) **الفيديو جاي منين؟** لو رابط خارجي مؤقت (CDN برابط موقّع، أو رابط مولّد من أداة AI)، افحصه بـ [[curl -sI]]: [[200]] أو [[206]] تمام، [[403]] يبقى انتهى.

وفي تاب Network هتلاقي [[net::ERR_ABORTED]] على طلبات الفيديو حتى وهو شغّال: ده طبيعي (المتصفح بيلغي طلب ويطلب حتة تانية من الملف بـ [[Range]])، والحكم الحقيقي [[readyState]] (4 = جاهز). والحل الدائم: نزّل الفيديو عندك ([[curl -o public/hero.mp4]]) واربطه [[/hero.mp4]]، وصغّره، ومتحمّلوش على الموبايل لو مستخبي.`,
          example: R`curl -sI --max-time 20 "$VIDEO_URL" | head -20
curl -s -r 0-1 -o /dev/null -w "range: %{http_code} %{size_download}\n" "$VIDEO_URL"
curl -s --max-time 120 -o public/hero.mp4 "$VIDEO_URL" && file public/hero.mp4
ffmpeg -i public/hero.mp4 -c copy -movflags +faststart public/hero-fast.mp4
node shot.js 1440 http://localhost:3000/ hero-1440.png
# في Console المتصفح:
document.querySelectorAll("video").forEach(v => console.log(v.currentSrc.split("?")[0], v.readyState, v.networkState, v.error && v.error.code))`,
          lines: [
            R`اطلب الـ headers بس ([[-I]] = طلب [[HEAD]]) من غير شريط ([[-s]])، و [[--max-time 20]] متستناش أكتر من ٢٠ ثانية. أول سطر فيه الكود ([[200]] أو [[403]])، وتحته [[Content-Type]] و [[Content-Length]] و [[Accept-Ranges]].`,
            R`اطلب أول ٢ بايت بس ([[-r 0-1]]). لو رد [[206]] و [[2]]، السيرفر بيدعم الطلب بالحتت (Range)، وده اللي المتصفح محتاجه عشان يقدّم ويأخّر في الفيديو.`,
            R`نزّل الملف عندك في [[public/]] (وهو لسه شغّال)، و [[&&]] لو نجح افحص نوعه بـ [[file]]: لازم يقول [[ISO Media, MP4]] مش HTML أو XML (صفحة خطأ اتحفظت بامتداد mp4).`,
            R`انقل جزء الفهرس ([[moov]]) لأول الملف من غير ما تعيد الضغط ([[-c copy]])، فالمتصفح يبدأ التشغيل من أول حتة بدل ما يروح لآخر الملف الأول.`,
            R`صوّر الصفحة بعرض 1440 بسكربت Playwright (اللي في الشرح). ده العرض اللي بيوري تخطيط الديسكتوب.`,
            R`في Console: لكل [[<video>]] اطبع الرابط من غير الـ query، و [[readyState]] (4 = عنده داتا كفاية يشتغل)، و [[networkState]] (3 = ملقاش مصدر)، وكود الخطأ لو فيه (4 = المصدر مرفوض).`,
          ],
          try: R`ابني المعمل اللي في الشرح (صفحة فيها hero بفيديو، و «CDN» صغير بيرد [[403]] بعد وقت معيّن). صوّر الصفحة بعرض 591 و 1440 وقارن. وبعدين خلّي الرابط ينتهي وصوّر تاني، واقرا [[readyState]] و [[curl -sI]]. وفي الآخر نزّل الفيديو في [[public/]] واتأكد إن الصفحة شغّالة من غير الـ CDN.`,
          flag: "term",
          teach: R`## العَرَض

حد بعتلك (أو أداة بتاخد لقطات أوتوماتيك) صورة من الموقع: «الـ screenshot مش واضح، والصور ناقصة». الـ hero فاضي (مربع أسود أو مفيش خالص)، والمعرض اللي تحته مش موجود. وعلى جهازك الموقع شكله سليم.

---

## المعمل

صفحة فيها hero بعمودين: كلام وفيديو (عنصرين [[<video>]] فوق بعض لعمل crossfade، والاتنين بنفس الرابط)، وتحتها معرض صور. وعلى الموبايل الفيديو والمعرض بيستخبوا:

~~~css
.hero { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 767px) {
  .hero { grid-template-columns: 1fr; }
  .media, .gallery { display: none; }
}
~~~

والفيديو جاي من «CDN» عملناه بـ Node على [[127.0.0.1:8932]] بيحاكي الرابط الموقّع: [[/media/hero.mp4?Expires=<وقت>&Signature=...]]، وبعد [[Expires]] بيرد [[403]]. (ده محاكاة لسلوك الروابط الموقّعة، والنص بالظبط بيختلف من خدمة للتانية.) والفيديو ملف MP4 حجمه 15,070,719 بايت (حوالي ١٥ ميجا، زي الـ ١٦ في الحالة الأصلية)، اتعمل بـ [[ffmpeg]] 9.0.2. واللقطات بـ Playwright 1.64.1 (باكدج [[playwright-core]]) على Chrome 156 المتسطب على الجهاز، على ويندوز 11.

~~~js shot.js
const { chromium } = require("playwright-core");
const [w, url, out] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: +w, height: 900 } });
  page.on("requestfailed", r => console.log("FAILED", r.failure().errorText));
  page.on("response", r => { if (r.url().includes("hero.mp4")) console.log("RESP", r.status(), r.request().headers().range || "-"); });
  await page.goto(url);
  await page.waitForTimeout(4000);
  console.log(await page.evaluate(() => JSON.stringify({
    media: getComputedStyle(document.querySelector(".media")).display,
    videos: [...document.querySelectorAll("video")].map(v => v.readyState),
  })));
  await page.screenshot({ path: out });
  await browser.close();
})();
~~~

- [[channel: "chrome"]]: استخدم Chrome المتسطب على الجهاز بدل ما Playwright ينزّل متصفح خاص بيه (مفيش [[npx playwright install]]).
- [[viewport]]: عرض وطول الصفحة. ده اللي بتشوفه الـ media queries.
- [[requestfailed]] و [[response]]: اطبع كل طلب فشل وسببه، وكل رد للفيديو بكوده والـ [[Range]] اللي اتطلب.
- [[waitForTimeout(4000)]]: ٤ ثواني عشان الفيديو يلحق يحمّل قبل اللقطة.

---

## ١. السؤال الأول: اللقطة اتاخدت بعرض كام؟

~~~text node shot.js 591 ... hero-591.png
{"media":"none", ...}
~~~

~~~text node shot.js 1440 ... hero-1440.png
{"media":"block", ...}
~~~

عرض المعاينة كان **591px**. 591 أقل من 767، فقاعدة الموبايل اشتغلت: الفيديو والمعرض [[display: none]]. «الصور ناقصة» مش bug، ده تصميم الموبايل. ولقطة 1440 فيها الاتنين.

وده بيحصل كتير مع: نافذة معاينة جوه IDE أو أداة، أو متصفح مش مكبّر، أو لقطة من موبايل. والـ media query بتشوف عرض الـ viewport (الصفحة نفسها) مش الشاشة. فأول حاجة: اعرف العرض ([[innerWidth]] في Console، أو حجم الصورة نفسها)، وصوّر بعرض ديسكتوب واضح (1440) قبل ما تحكم.

---

## ٢. السؤال التاني: الفيديو نفسه جاي منين؟

صورة 1440 فيها مكان الفيديو. بس لو كان مربع أسود، نروح للفيديو:

~~~text curl -sI --max-time 20 "$VIDEO_URL" | head -20   (والرابط لسه شغّال)
HTTP/1.1 200 OK
Content-Type: video/mp4
Accept-Ranges: bytes
Content-Length: 15070719
~~~

| السطر | معناه |
|---|---|
| [[200 OK]] | الملف موجود والرابط شغّال |
| [[Content-Type: video/mp4]] | نوعه فيديو فعلًا، مش صفحة خطأ |
| [[Accept-Ranges: bytes]] | بيقبل طلبات بالحتت ([[Range]])، فالمتصفح يقدر يقدّم ويأخّر |
| [[Content-Length: 15070719]] | ١٥ ميجا. ومع عنصرين [[<video>]] بنفس الرابط ممكن يتحمّل أكتر من مرة |

~~~text curl -s -r 0-1 -o /dev/null -w "range: %{http_code} %{size_download}\n" "$VIDEO_URL"
range: 206 2
~~~

[[206 Partial Content]] و ٢ بايت بالظبط: الـ Range شغّال.

### نفس الرابط بعد ما انتهى

~~~text curl -sI "$OLD_URL" | head -3
HTTP/1.1 403 Forbidden
Content-Type: application/xml
~~~

[[403]] والنوع [[application/xml]] (رسالة خطأ من الـ CDN، مش فيديو). وفي المتصفح:

~~~text shot.js بعد انتهاء الرابط
RESP 403 bytes=0-
RESP 403 bytes=0-
{"width":1440,"media":"block","videos":[{"readyState":0,"networkState":3,"error":4},{"readyState":0,"networkState":3,"error":4}]}
~~~

| الرقم | معناه (من مواصفة HTML) |
|---|---|
| [[readyState: 0]] | HAVE_NOTHING: مفيش ولا بايت يتعرض |
| [[networkState: 3]] | NETWORK_NO_SOURCE: ملقاش مصدر ينفع |
| [[error.code: 4]] | MEDIA_ERR_SRC_NOT_SUPPORTED: المصدر اترفض |
| [[readyState: 4]] | HAVE_ENOUGH_DATA: عنده كفاية يشتغل للآخر. ده اللي عايزه |

والصورة: مربع أسود مكان الفيديو. ده **السبب الحقيقي** في الحالة الأصلية: الفيديو كان رابط مولّد من أداة AI على CDN، ومعاه توقيع بينتهي. اشتغل يوم التسليم، ووقف بعدها.

---

## ٣. والـ [[net::ERR_ABORTED]] اللي في Network؟ (مش هو السبب)

والرابط **شغّال**، ده اللي ظهر:

~~~text node shot.js 1440 ... (والرابط شغّال)
RESP 206 bytes=0-
RESP 206 bytes=0-
FAILED net::ERR_ABORTED
FAILED net::ERR_ABORTED
RESP 206 bytes=15040512-
RESP 206 bytes=3145728-
{"media":"block","videos":[4,4]}
~~~

طلبين اتلغوا و [[readyState]] = 4 للاتنين: الفيديو شغّال. اللي حصل: كل عنصر [[<video>]] طلب الملف من أوله ([[bytes=0-]])، والمتصفح لقى إن «فهرس» الملف ([[moov]]) مش في الأول، فلغى الطلب وطلب آخر الملف ([[bytes=15040512-]]) يقرا الفهرس، وبعدين كمّل من النص. الإلغاء ده هو [[ERR_ABORTED]]. يعني **طبيعي** ومش علامة فشل، وفي الحالة الأصلية اتشاف على نسخة الـ crossfade التانية بالظبط.

وبعد ما نقلنا الفهرس لأول الملف:

~~~bash
ffmpeg -i hero.mp4 -c copy -movflags +faststart hero-fast.mp4
~~~

~~~text node shot.js 1440 ... (hero-fast)
RESP 206 bytes=0-
RESP 206 bytes=0-
FAILED net::ERR_ABORTED
{"media":"block","videos":[4,4]}
~~~

الطلب لآخر الملف اختفى، وفضل إلغاء واحد (العنصر التاني اكتفى باللي اتجاب). نفس الحجم (15,070,719) لأن [[-c copy]] مبيعيدش الضغط.

> والفخ العكسي: سيرفر **مبيدعمش** Range (بيرد [[200]] بالملف كله على أي طلب). جربناه بسيرفر Node بسيط: ٦ طلبات [[ERR_ABORTED]] وكل طلب [[200]] من الأول. الفيديو اشتغل في الآخر، بس بتحميل مكرر. عشان كده [[curl -r 0-1]] لازم يرجّع [[206]].

---

## ٤. الحل: الفيديو عندك

~~~bash
curl -s --max-time 120 -o public/hero.mp4 "$VIDEO_URL" && file public/hero.mp4
~~~

~~~text الناتج
public/hero.mp4: ISO Media, MP4 Base Media v1 [ISO 14496-12:2003]
~~~

| الحتة | ليه |
|---|---|
| [[--max-time 120]] | ١٥ ميجا على نت بطيء ممكن تاخد وقت، بس متعلّقش للأبد |
| [[-o public/hero.mp4]] | في Next، أي حاجة في [[public/]] بتتقدّم من [[/]]: الملف ده = [[/hero.mp4]] |
| [[file]] | اتأكد إنه فيديو. لو الرابط كان انتهى، [[curl -s]] هيحفظ رسالة الـ [[403]] (XML) باسم [[hero.mp4]] من غير ما يقول حاجة. ([[curl -f]] بيخرج بخطأ بدل ما يحفظ صفحة الخطأ) |

وبعدين في الكود [[src="/hero.mp4"]]. ونتأكد إن Next بيقدّمه صح:

~~~text curl -sI http://localhost:4311/hero.mp4
HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Content-Type: video/mp4
Content-Length: 15070719
~~~

و [[curl -r 0-1]] رجّع [[206 2]]. يعني Next 16.4 بيدعم Range للملفات في [[public/]].

### صغّره، ومتحمّلوش على الموبايل لو مستخبي

قسنا البايتات اللي الـ «CDN» بعتها في ٤ ثواني:

| الحالة | اتبعت |
|---|---|
| 1440، عنصرين [[<video>]] | 15.6 MB |
| 591، والفيديو [[display: none]] | **7.6 MB** (مستخبي واتحمّل برضه) |
| 591، و [[src]] بيتحط بس لو [[matchMedia("(min-width: 768px)").matches]] | 0 MB (ولا طلب) |

~~~js
if (matchMedia("(min-width: 768px)").matches)
  document.querySelectorAll(".media video").forEach(v => v.src = "/hero.mp4");
~~~

[[display: none]] مبيمنعش التحميل مع [[autoplay]]. [[matchMedia]] بيسأل نفس سؤال الـ media query من JavaScript، فالموبايل مش بيطلب حاجة.

وإعادة الضغط ([[ffmpeg -i hero.mp4 -c:v libx264 -crf 28 -preset veryfast -movflags +faststart -an hero-small.mp4]]) نزّلت الملف التجريبي من 15,070,719 لـ 3,510,238 بايت. الرقم ده لفيديو تجريبي (testsrc2)، والفيديو الحقيقي هيختلف، فقيس على ملفك. و [[-an]] بيشيل الصوت (hero [[muted]] أصلًا).

### وفي git؟

ملف ١٥ ميجا في الريبو بيتنسخ مع كل clone، وكل نسخة جديدة منه بتفضل في التاريخ للأبد. ملف أو اتنين مقبول. لو هيتغيّر كتير أو أكبر، [[git lfs]] (درس في تاب git) أو CDN **انت** اللي متحكم فيه (رابط ثابت مش موقّع بوقت).

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تصلّح الـ CSS عشان المعرض يظهر في 591 | ده تصميم الموبايل المقصود. المشكلة في عرض اللقطة |
| تجدّد الرابط المؤقت وتحطه تاني | هينتهي تاني. أي أصل أساسي (hero، لوجو، خط) لازم يبقى عندك أو على رابط ثابت |
| تتجاهل الـ [[ERR_ABORTED]] كلها | لو الرابط بيرد [[403]] هتتجاهل السبب الحقيقي. افحص الكود و [[readyState]] |
| [[preload="none"]] على الموبايل | جربناه مع [[autoplay]] على 591: العنصرين طلبوا الفيديو برضه ([[autoplay]] بيغلب). [[matchMedia]] اتقاس ومطلبش حاجة |

## إزاي تتأكد إنها اتحلت

- لقطة 1440 فيها الفيديو، و [[readyState]] = 4 للعنصرين.
- [[grep -rnE "Expires=|Signature=|X-Amz" app components]] (أو اسم الدومين الخارجي) مبيطلّعش حاجة (جربناه على ملف فيه رابط موقّع: طلّع [[app/tmp.ts:1:...]]): مفيش أصل أساسي على رابط موقّع.
- [[curl -sI http://localhost:3000/hero.mp4]]: [[200]] و [[video/mp4]].

## إزاي متتكررش

- أي رابط فيه [[Expires]] أو [[Signature]] أو [[X-Amz-]] = مؤقت. نزّله أول ما تاخده.
- كل لقطة مكتوب جنبها العرض. وصوّر الاتنين: 390 و 1440.
- قدّر الحجم قبل ما تحط فيديو: [[Content-Length]] × عدد عناصر [[<video>]] اللي بتحمّله.

## الخلاصة

| السؤال | إزاي تعرف |
|---|---|
| ناقص عشان الموبايل؟ | عرض اللقطة أقل من الـ breakpoint. صوّر 1440 |
| الرابط شغّال؟ | [[curl -sI]]: [[200]] أو [[206]]. [[403]] = انتهى |
| الفيديو شغّال في الصفحة؟ | [[readyState]] = 4 |
| [[ERR_ABORTED]] مشكلة؟ | لو [[readyState]] = 4، لأ |
| الحل الدائم | [[curl -o public/hero.mp4]] و [[file]] و [[src="/hero.mp4"]] |`,
          deep: {
            why: R`الشكوى «اللقطة ناقصة» فيها مشكلتين مختلفتين خالص متلخبطين في بعض: واحدة مش مشكلة (عرض موبايل)، وواحدة مشكلة حقيقية هتكسر الموقع لكل الزوار (رابط بينتهي). من غير ترتيب، هتصلّح CSS سليم وتسيب الرابط اللي هيوقع.`,
            how: R`المتصفح بيحمّل الفيديو بطلبات [[Range]]: يبدأ بـ [[bytes=0-]]، ولو الفهرس ([[moov]]) في آخر الملف (الافتراضي في كتير من برامج التصدير) بيلغي ويطلب آخر الملف، فيظهر [[ERR_ABORTED]]. و [[-movflags +faststart]] بيحط الفهرس في الأول. والروابط الموقّعة (signed URLs) بيبقى فيها وقت انتهاء وتوقيع محسوب على الرابط والوقت، فالـ CDN بيرفض بعد الوقت ([[403]]) ومينفعش تغيّر الوقت من غير ما التوقيع يبوظ. و [[display: none]] بيخفي الرسم بس، مش بيلغي تحميل عنصر [[<video autoplay>]].`,
            when: R`أي لقطة شاشة جاية من أداة أو زميل أو CI، وأي مرة تستخدم صورة أو فيديو من رابط خارجي (أداة AI، أو S3 أو CloudFront موقّع، أو Google Drive). وقبل أي تسليم: دوّر في الكود على روابط مؤقتة.`,
            mistakes: R`تصلّح CSS على لقطة 591 فتكسر الموبايل. تفتكر [[ERR_ABORTED]] هو السبب وتسيب الـ [[403]]. تنزّل الفيديو بـ [[curl -s]] بعد ما الرابط انتهى فتحفظ XML باسم mp4. عنصرين [[<video>]] بنفس الملف الكبير من غير ما تحسب الحجم. [[display: none]] وتفتكر الموبايل مش بيحمّل. وتحط ملفات كبيرة كتير في git من غير ما تفكر في LFS.`
          },
          sol: R`لقطة 591: الفيديو والمعرض مش موجودين ([[media: none]])، و 1440: موجودين. والرابط شغّال: [[curl -sI]] بيرد [[200]] و [[video/mp4]]، و [[readyState]] = 4، وفي Network طلبين [[ERR_ABORTED]] وده طبيعي.

بعد ما الرابط ينتهي: [[curl -sI]] بيرد [[403 Forbidden]] و [[application/xml]]، و [[readyState]] = 0 و [[networkState]] = 3 و [[error.code]] = 4، ولقطة 1440 فيها مربع أسود.

بعد [[curl -s --max-time 120 -o public/hero.mp4 "$VIDEO_URL"]] (والرابط لسه شغّال) و [[src="/hero.mp4"]]: [[file]] بيقول [[ISO Media, MP4]]، و [[curl -sI localhost:3000/hero.mp4]] بيرد [[200]] و [[Accept-Ranges: bytes]]، والفيديو شغّال حتى والـ CDN مقفول.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** صفحة فيها [[@media (max-width: 767px) { .gallery { display: none } }]]. لقطة اتاخدت بعرض 591، وتانية 768، وتالتة 767. المعرض هيظهر في أنهي لقطة؟ وبعدين صوّر التلاتة واتأكد.`, done: R`كتبت إنه هيظهر في 768 بس، والتلات لقطات أكدت (أو [[getComputedStyle]] رجّع [[none]] في 591 و 767 و [[grid]] أو [[block]] في 768).` },
            { lvl: 'تطبيق', t: R`**ابني:** «CDN» صغير بـ Node بيقدّم ملف فيديو برابط فيه [[?Expires=]] ويرد [[403]] بعده، ويدعم [[Range]]. اختبره بـ [[curl -sI]] و [[curl -r 0-1]] قبل وبعد الانتهاء.`, done: R`قبل الانتهاء: [[200]] و [[Accept-Ranges: bytes]]، و [[-r 0-1]] بيرد [[206]] و [[2]] بايت. بعده: [[403]] للاتنين.` },
            { lvl: 'تطبيق', t: R`**صلّح:** الأمر ده: [[curl -s -o public/hero.mp4 "$VIDEO_URL"]] اتشغّل بعد ما الرابط انتهى، والصفحة فيها فيديو أسود. اكتشف إيه اللي اتحفظ فعلًا ([[file]] و [[head -c 200]])، واكتب نسخة من الأمر بتفشل بصوت عالي بدل ما تحفظ صفحة خطأ.`, done: R`[[file]] قال XML أو text مش MP4، والنسخة المصلّحة فيها [[-f]] (أو بتفحص [[%{http_code}]]) ورقم خروجها مش صفر لما الرابط منتهي، ومبتسيبش ملف مكانه.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** على المعمل، احسب البايتات اللي اتحمّلت للفيديو في ٤ ثواني بعرض 591 والفيديو [[display: none]]، وبعدين بعد ما تحط [[src]] بـ [[matchMedia]] بس. استخدم لوج السيرفر أو Network.`, done: R`عندك رقمين: الأول أكبر من صفر (ميجات)، والتاني صفر ومفيش ولا طلب [[.mp4]] في Network.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** اعرف من [[man ffmpeg]] أو وثائق ffmpeg يعني إيه [[faststart]]، وبعدين اعمل فيديو بـ [[ffmpeg -f lavfi -i testsrc2=size=1280x720:rate=30 -t 10]] مرة من غير و مرة بـ [[-movflags +faststart]]، وعدّ طلبات [[ERR_ABORTED]] لكل واحد في Playwright.`, done: R`عندك رقمين: من غير faststart فيه طلب لآخر الملف ([[bytes=<رقم كبير>-]]) وإلغاءات أكتر، وبـ faststart الطلب ده اختفى. وكاتب في سطر faststart بيعمل إيه.` },
            { lvl: 'تحدي', t: R`**ابني:** [[find-temp-urls.sh]]: بيدوّر في فولدرات الكود على روابط مؤقتة ([[Expires=]] و [[Signature=]] و [[X-Amz-]] و [[token=]]) ويطبع الملف والسطر، ولكل رابط يعمل [[curl -sI --max-time 10]] ويطبع الكود. ويخرج بـ 1 لو لقى أي رابط مؤقت.`, done: R`على مشروع فيه رابط موقّع واحد: بيطبع [[ملف:سطر]] والكود ([[200]] أو [[403]]) ويخرج 1، وعلى مشروع نضيف بيخرج 0 من غير طباعة.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > cdn.js <<'EOF'
const http = require("http");
const body = Buffer.alloc(5000, 7);
http.createServer((q, s) => {
  const exp = Number(new URL(q.url, "http://x").searchParams.get("Expires"));
  if (!exp || Date.now() / 1000 > exp) { s.writeHead(403, { "Content-Type": "application/xml" }); return s.end("<Error>Request has expired</Error>"); }
  const m = /bytes=(\d+)-(\d*)/.exec(q.headers.range || "");
  if (m) { const a = +m[1], b = m[2] ? +m[2] : body.length - 1; s.writeHead(206, { "Content-Type": "video/mp4", "Accept-Ranges": "bytes", "Content-Range": "bytes " + a + "-" + b + "/" + body.length }); return s.end(body.subarray(a, b + 1)); }
  s.writeHead(200, { "Content-Type": "video/mp4", "Accept-Ranges": "bytes", "Content-Length": body.length }); s.end(q.method === "HEAD" ? undefined : body);
}).listen(18950, "127.0.0.1");
EOF
node cdn.js & PID=$!
sleep 1
FUTURE=$(( $(date +%s) + 600 ))
curl -sI "http://127.0.0.1:18950/hero.mp4?Expires=$FUTURE&Signature=x" | head -1
curl -s -r 0-1 -o /dev/null -w "range: %{http_code} %{size_download}\n" "http://127.0.0.1:18950/hero.mp4?Expires=$FUTURE&Signature=x"
curl -sI "http://127.0.0.1:18950/hero.mp4?Expires=1700000000&Signature=x" | head -1
curl -sf -o old.mp4 "http://127.0.0.1:18950/hero.mp4?Expires=1700000000&Signature=x"; echo "curl -f exit=$?"
kill $PID; wait $PID 2>/dev/null; sleep 1`, expect: [R`HTTP/1.1 200 OK`, R`range: 206 2`, R`HTTP/1.1 403 Forbidden`, R`curl -f exit=22`] },
          ],
        },
        {
          cmd: "مشروع تشخيص موقع بطيء ومكسور",
          title: "ابني موقع فيه ٨ أخطاء بإيدك وشخّصها بـ DevTools واحدة واحدة: LCP من ٢٤٠٠ لـ ٨٩٦ms، و CLS من ٠٫٤٧ لصفر، و INP من ٣١٢ لـ ٢٤ms",
          desc: R`مشروع كامل بيجمع التاب كله: بتبني موقع صغير لمخبز (اسمه مخترع) **فيه أخطاء متعمّدة** من اللي بتتقابل في مواقع حقيقية، وبتشخّصه زي ما هتشخّص موقع زبون بيقول «الموقع بطيء، وبيتنطط، والزرار بيعلّق، والـ modal تحت الـ menu، وعلى الموبايل فيه سكرول جانبي، وبعد شوية بيتقل». الأخطاء: صورة hero من غير مقاس (CLS)، وخط في ملف CSS بطيء بيمنع الرسم، و z-index بيخسر عشان [[transform]] على الأب، وعنصر أعرض من الشاشة على الموبايل، و memory leak من listener، و [[fetch]] لـ [[http://]] من صفحة https (mixed content)، وسكربت inline ضد الـ CSP، و handler تقيل (INP).

الترتيب اللي بتمشي بيه: **Console الأول** (٢ أخطاء أمان بالنص وبيقولوا السبب)، وبعدين **Network** (مين بطيء ومين اتمنع)، وبعدين **الأرقام** (FCP و LCP و CLS و INP بسطور [[PerformanceObserver]])، وبعدين **Elements** (الـ z-index)، و **Device Toolbar** (الـ overflow)، و **Memory** (الـ leak). وكل تصليح بتقيس بعده. وفي الآخر سكربتين بيمنعوا الأخطاء دي ترجع: [[lint.mjs]] من غير متصفح، و [[check.mjs]] بـ Chrome و DevTools Protocol بيطبع PASS/FAIL ويخرج بـ [[1]]. الأرقام الحقيقية من المعمل (Chrome 156): FCP **١٥٨٤ ← ١٩٦ms**، و LCP **٢٤٠٠ ← ٨٩٦ms**، و CLS **٠٫٤٦٧٦ ← ٠**، و INP **٣١٢ ← ٢٤ms**، و DOM nodes بعد ٣٠ فتحة **+٦٣٠ ← +٠**.`,
          example: R`openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 7 -subj "/CN=shop.test" -addext "subjectAltName=DNS:shop.test,DNS:cdn.test"
node server.mjs
chrome --user-data-dir="$HOME/shop-lab-profile" --host-resolver-rules="MAP *.test 127.0.0.1" --ignore-certificate-errors https://shop.test:8443/broken/
node lint.mjs site/broken
node measure.mjs broken
node check.mjs broken || echo "not ready"
node check.mjs fixed && echo "ship it"`,
          lines: [
            R`شهادة self-signed صالحة ٧ أيام للاسمين [[shop.test]] و [[cdn.test]] ([[subjectAltName]] هو اللي المتصفح بيقراه، مش [[CN]]). [[-nodes]] من غير باسورد على المفتاح. في Git Bash على ويندوز حط قبلها [[MSYS_NO_PATHCONV=1]]: من غيرها Git Bash بيحوّل [[/CN=shop.test]] لمسار ويقع بـ [[subject name is expected to be in the format /type0=value0...]] (اتقابل في المعمل).`,
            R`السيرفر (في الشرح): https على [[8443]] للموقع، و http على [[8080]] لـ «CDN» قديم، وأي رابط بيبدأ بـ [[/slow/]] بيتأخر (١٥٠٠ms للـ CSS و ٨٠٠ms للباقي) عشان نقلّد سيرفر بعيد.`,
            R`Chrome بـ profile لوحده ([[--user-data-dir]]: من غيره لو Chrome مفتوح الـ flags بتتجاهل)، و [[--host-resolver-rules]] بيودّي أي [[*.test]] لجهازك (بدل ما تعدّل [[hosts]] وانت أدمن)، و [[--ignore-certificate-errors]] عشان الشهادة بتاعتك (للمعمل بس). على ويندوز: [[& "$env:ProgramFiles\Google\Chrome\Application\chrome.exe" --user-data-dir="$env:TEMP\shop-lab" ...]]، وعلى لينكس [[google-chrome]]، وعلى الماك [[open -na "Google Chrome" --args ...]]. اتجرّبت الـ flags دي بـ [[--headless=new --dump-dom]] ورجعت الصفحة.`,
            R`فحص سريع من غير متصفح (في الشرح): بيدوّر في الـ HTML والـ CSS والـ JS على الأنماط اللي سببت الأخطاء (img من غير مقاس، و lazy على أول صورة، و inline script، و [[http://]]، و [[106vw]]، و listener من غير remove). على النسخة المكسورة طلّع ٩ مشاكل وخرج بـ [[1]].`,
            R`القياس الكامل: نفس [[check.mjs]] (في الشرح) بس بيطبع التفاصيل بدل PASS/FAIL: الـ shifts وعناصرها، وأحداث الضغطة، ومستطيل الـ modal، والـ heap قبل وبعد، وعدد الـ detached من الـ heap snapshot (الجزء ده بالكود في الخطوة ٩). ده نفس اللي بتعمله بإيدك في DevTools، بس في ثواني وبنفس الطريقة كل مرة.`,
            R`[[check.mjs]] بيحوّل القياسات لـ ٧ فحوصات PASS/FAIL ويخرج بـ [[1]] لو أي واحد وقع، فـ [[||]] بيطبع «not ready». ده اللي تحطه في CI قبل النشر.`,
            R`نفس الفحص على النسخة المتصلّحة: الـ ٧ PASS، وخرج بـ [[0]]، فـ [[&&]] طبع «ship it».`,
          ],
          try: R`ابني المعمل خطوة خطوة زي الشرح: الشهادة، والسيرفر، والنسخة المكسورة (٣ ملفات). افتحها في Chrome بالـ flags وامشي على الخطوات من ١ لـ ٧ وانت مش بتبص على التصليح: اكتب كل مشكلة لقيتها، وأنهي أداة لقيتها، والرقم قبل. وبعدين صلّح واحدة واحدة واكتب الرقم بعد. وفي الآخر شغّل [[check.mjs]] على نسختك.`,
          deep: {
            why: R`الزبون عمره ما هيقولك «CLS عالي». هيقول «الموقع بيتنطط» و «الزرار مش بيرد» و «بيتقل». الشغل الحقيقي هو إنك تحوّل الشكوى لرقم، والرقم لعنصر أو سطر، والسطر لتصليح، والتصليح لرقم جديد. والمشروع ده بيدرّبك على الترتيب ده على موقع انت عارف أخطاؤه، فلما تقابل موقع حقيقي متعرفش أخطاؤه، الطريقة نفسها هتلاقيها.`,
            how: R`كل خطأ هنا بيظهر في أداة معيّنة: الأمان (CSP و mixed content) Console بيكتبه بالنص والسبب، فبيتشاف الأول ومن غير أي قياس. البطء (خط بيمنع الرسم، وصورة ١٫٨ ميجا) بيبان في Network كعمود طويل في الـ Waterfall وفي FCP و LCP. الحركة (CLS) بيبان في [[layout-shift]] ومعاه العناصر. الرد على الضغط (INP) في [[event]] entries ومعاه وقت الـ handler. الـ z-index بيبان في Elements و Computed ([[transform]] على الأب بيعمل stacking context جديد وكمان containing block للـ [[position: fixed]]). الـ overflow بـ [[getBoundingClientRect]] على عرض ٣٦٠. والـ leak في Memory و Performance monitor. و [[check.mjs]] بيعمل نفس الأسئلة دي من DevTools Protocol: [[Log.entryAdded]] للـ Console، و [[PerformanceObserver]] للأرقام، و [[elementFromPoint]] للـ z-index، و [[HeapProfiler]] و [[Performance.getMetrics]] للذاكرة.`,
            when: R`أي موقع زبون أو موقعك قبل ما تسلّمه، وبعد أي redesign، ولما حد يبعت شكوى. و [[check.mjs]] بعد التسليم في CI على كل push. وكل خطوة هنا ليها درس في التاب لو عايز تتعمق: «قراءة الأخطاء»، و «Mixed content و HTTPS»، و «Content Security Policy»، و «Network»، و «Core Web Vitals (LCP/INP)»، و «صيغ الصور WebP و AVIF»، و «Elements»، و «Device Toolbar»، و «Memory و heap snapshot».`,
            mistakes: R`تبدأ تصلّح أول حاجة شفتها قبل ما تجمع كل الأعراض (هتصلّح عرض وتسيب السبب). تقيس مرة واحدة (LCP في المعمل اتراوح بين ٢٤٠٠ و ٢٥٧٢ms لنفس النسخة). تقيس على عرض ديسكتوب بس (على ٤١٢ عنصر الـ LCP كان صورة كارت مش الـ hero). تصلّح الـ overflow بـ [[overflow-x: hidden]] على [[html, body]] (بيكسر الـ sticky: اتقاس في تمارين درس «Elements»). تحط [[z-index: 99999]] بدل ما تفهم الـ stacking context. تحط [[unsafe-inline]] عشان CSP يسكت. أو تصلّح ٥ حاجات مرة واحدة فمتعرفش أنهي واحدة عملت الفرق.`
          },
          teach: R`## الصورة الكبيرة

**بنبني إيه:** موقع صفحة واحدة لمخبز مخترع اسمه «مخبز السنبلة»: header فيه زرار السلة، وصورة hero، وعنوان، وشريط عرض، وكارتين منتجات (كل كارت فيه «ضيف للسلة» و «التفاصيل» اللي بيفتح modal فيه معرض)، وسطر «المخزون» بيتجاب من API.

**لمين:** ليك انت كمتدرّب. الموقع معمول **مكسور قصد** بـ ٨ أخطاء، وبعدين نسخة متصلّحة، وأداتين فحص.

~~~text الأجزاء وإزاي البيانات بتمشي
 Chrome (DevTools)                      server.mjs (Node 24)
 ┌───────────────────────┐   https    ┌──────────────────────────────┐
 │ https://shop.test:8443│ ─────────▶ │ :8443  static من site/       │
 │   /broken/  /fixed/   │            │        /slow/* بيتأخر         │
 │                       │            │        CSP: script-src 'self' │
 │   fetch stock ────────┼── http ──▶ │ :8080  «CDN» قديم (http بس)  │
 └───────────┬───────────┘            │ :8099  لوج الطلبات            │
             │ DevTools Protocol      └──────────────────────────────┘
 ┌───────────┴───────────┐
 │ measure.mjs / check.mjs│  (playwright-core + Chrome المتسطّب)
 └───────────────────────┘
~~~

---

## ليه الأدوات دي تحديدًا؟

| الحاجة | اخترنا | البدايل | ليه ده هنا | إمتى البديل |
|---|---|---|---|---|
| السيرفر | [[node:https]] و [[node:http]] من غير مكتبات | Express، أو nginx، أو [[npx serve]] | ٢١ سطر، وبنتحكم في التأخير والـ headers لكل رابط | nginx لو عايز تقلّد الإنتاج بالظبط |
| HTTPS محلي | [[openssl req -x509]] | mkcert (بيعمل شهادة المتصفح بيثق فيها) | openssl موجود في Git Bash ولينكس والماك، ومش محتاج تسطيب | mkcert لو هتشتغل محلي كتير ومش عايز [[--ignore-certificate-errors]] |
| أسامي وهمية | [[--host-resolver-rules]] | ملف [[hosts]] | مش محتاج أدمن، وبيأثر على Chrome ده بس | [[hosts]] لو أدوات تانية (curl) محتاجة الاسم |
| اسم الـ «CDN» | [[cdn.test]] مش [[127.0.0.1]] | [[localhost:8080]] | [[http://127.0.0.1]] مش بيتحسب mixed content (اتجرّب)، فالخطأ مكانش هيبان | — |
| القياس الأوتوماتيك | [[playwright-core]] بـ [[channel: "chrome"]] | Puppeteer، أو Lighthouse CI | مبينزّلش متصفح (بيستخدم Chrome المتسطّب)، وفيه CDP session للـ heap والـ metrics | Lighthouse CI لو عايز التقرير الكامل والدرجات |
| الأرقام | [[PerformanceObserver]] بإيدنا | مكتبة [[web-vitals]] | من غير مكتبات، وبنشوف العنصر والـ handler | [[web-vitals]] في موقع حقيقي بيبعت أرقام اليوزرز |

---

## الهيكل

~~~text
shop-lab/
├── key.pem, cert.pem        الشهادة المحلية
├── server.mjs               السيرفر (٣ بورتات)
├── lint.mjs                 فحص من غير متصفح
├── measure.mjs              بيقيس كل حاجة ويطبعها
├── check.mjs                ٧ فحوصات PASS/FAIL و exit code
└── site/
    ├── fonts.css            @font-face من غير font-display (بيتجاب من /slow/)
    ├── fonts/brand.ttf      خط عربي (أي ملف ttf عندك)
    ├── img/                 hero.png و hero.jpg و hero.webp و hero.avif و card.jpg
    ├── api/stock.json       المخزون على نفس الموقع (للنسخة المتصلّحة)
    ├── broken/              index.html و style.css و app.js
    └── fixed/               index.html و style.css و boot.js و app.js
~~~

الصور اتعملت بـ sharp (درس «صيغ الصور WebP و AVIF»)، والخط نسخة من خط عربي TTF عندي (٨٩٨ كيلو)، وأي خط عندك ينفع.

---

## الخطوة ٠: ابني المعمل

~~~javascript server.mjs
import https from "node:https"; import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const root = path.resolve("site");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".ttf": "font/ttf", ".json": "application/json" };
const log = [];
function serve(req, res) {
  const u = new URL(req.url, "https://x");
  let p = u.pathname, delay = 0;
  if (p.startsWith("/slow/")) { p = p.slice(5); delay = p.endsWith(".css") ? 1500 : 800; }
  if (p.endsWith("/")) p += "index.html";
  log.push(req.method + " " + req.url + " accept=" + (req.headers.accept || ""));
  const file = path.join(root, p);
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404, { "content-type": "text/plain" }); return res.end("not found"); }
  const h = { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" };
  if (p.endsWith(".html")) h["content-security-policy"] = "script-src 'self'";
  setTimeout(() => { res.writeHead(200, h); fs.createReadStream(file).pipe(res); }, delay);
}
https.createServer({ key: fs.readFileSync("key.pem"), cert: fs.readFileSync("cert.pem") }, serve).listen(8443, "127.0.0.1");
http.createServer((req, res) => { res.writeHead(200, { "content-type": "application/json", "access-control-allow-origin": "*" }); res.end('{"bread":12,"croissant":0}'); }).listen(8080, "127.0.0.1");
http.createServer((req, res) => { res.end(log.join("\n")); }).listen(8099, "127.0.0.1");
~~~

- [[/slow/]]: أي رابط بيبدأ بيها بيتخدم من نفس الملف بعد تأخير، عشان نقلّد سيرفر بعيد أو ملف تقيل.
- [[!file.startsWith(root)]]: يمنع [[../]] يطلع بره [[site/]].
- [[cache-control: no-store]]: كل ريفريش يجيب من جديد، فالقياسات متتأثرش بالكاش.
- CSP على كل HTML: [[script-src 'self']] (زي موقع حقيقي حد حط فيه CSP قبل كده).
- بورت [[8099]]: لوج الطلبات، تشوفه بـ [[curl -s localhost:8099]].

~~~html site/broken/index.html
<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>مخبز السنبلة</title>
<link rel="stylesheet" href="/broken/style.css">
<link rel="stylesheet" href="/slow/fonts.css">
</head>
<body>
<header class="top">مخبز السنبلة <button id="cart">السلة (0)</button></header>
<main class="wrap">
  <img class="hero" src="/slow/img/hero.png" loading="lazy" alt="عيش طازة">
  <h1>عيش بلدي طازة كل يوم</h1>
  <div class="promo">خصم ٢٠٪ على الكرواسون لحد الخميس</div>
  <section class="cards">
    <article class="card"><img src="/img/card.jpg" alt="كرواسون"><h2>كرواسون</h2><button class="add">ضيف للسلة</button> <button class="more">التفاصيل</button></article>
    <article class="card"><img src="/img/card.jpg" alt="عيش فينو"><h2>عيش فينو</h2><button class="add">ضيف للسلة</button> <button class="more">التفاصيل</button></article>
    <div id="modal" class="modal" hidden><div class="box"><p id="modal-text"></p><button id="close">اقفل</button></div></div>
  </section>
  <p id="stock">المخزون: بيتحمّل...</p>
</main>
<script>window.analyticsReady = true; document.getElementById('cart').dataset.ready = 'yes';</script>
<script src="/broken/app.js"></script>
</body>
</html>
~~~

~~~css site/broken/style.css
body { margin: 0; font-family: "Brand", sans-serif; }
.top { position: sticky; top: 0; z-index: 100; background: #5a2e12; color: #fff; padding: 12px 16px; display: flex; justify-content: space-between; }
.wrap { padding: 0 16px; }
.hero { width: 100%; display: block; }
.promo { width: 106vw; background: #f3d9a4; padding: 8px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; transform: translateY(0); transition: transform .3s; }
.card img { width: 100%; display: block; }
.modal { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,.6); display: grid; place-items: center; }
.modal[hidden] { display: none; }
.box { background: #fff; padding: 24px; border-radius: 8px; }
.gallery { display: grid; grid-template-columns: repeat(5, 60px); gap: 4px; } .gallery img { width: 60px; height: 45px; object-fit: cover; }
~~~

~~~text site/fonts.css (بيتجاب من /slow/fonts.css)
@font-face { font-family: "Brand"; src: url("/slow/fonts/brand.ttf") format("truetype"); }
~~~

~~~javascript site/broken/app.js
let count = 0;
const cart = document.getElementById("cart");
document.querySelectorAll(".add").forEach(b => b.addEventListener("click", () => {
  const end = performance.now() + 300;          // «بنحسب العروض»: شغل تقيل على الـ main thread
  while (performance.now() < end) {}
  cart.textContent = "السلة (" + (++count) + ")";
}));
const modal = document.getElementById("modal");
document.querySelectorAll(".more").forEach(b => b.addEventListener("click", () => {
  const panel = document.createElement("div");
  panel.className = "gallery";
  panel.innerHTML = '<img src="/img/card.jpg" alt="">'.repeat(20);
  const history = Array.from({ length: 20000 }, (_, i) => ({ i, at: Date.now() }));
  window.addEventListener("resize", () => { panel.style.width = innerWidth + "px"; history.length; });
  modal.querySelector(".box").prepend(panel);
  document.getElementById("modal-text").textContent = b.parentElement.querySelector("h2").textContent;
  modal.hidden = false;
}));
document.getElementById("close").addEventListener("click", () => {
  modal.querySelector(".gallery").remove();
  modal.hidden = true;
});
fetch("http://cdn.test:8080/stock.json").then(r => r.json())
  .then(s => { document.getElementById("stock").textContent = "المخزون: " + s.bread + " رغيف"; })
  .catch(e => { document.getElementById("stock").textContent = "المخزون: مش متاح"; console.error("stock failed:", e.message); });
~~~

حاول متقراش الكود ده تدوّر على الأخطاء. اقفله وابدأ من الشكاوى.

---

## الخطوة ١: الشكاوى

«الموقع بيفتح أبيض شوية. الصورة بتيجي متأخرة والكلام بيتنطط لتحت. لما أدوس "ضيف للسلة" بيعلّق لحظة. "التفاصيل" بيطلع تحت الـ menu ومش مغطّي الصفحة. على الموبايل الصفحة بتتحرك يمين وشمال. المخزون دايمًا "مش متاح". ولو قعدت أقلّب في التفاصيل شوية الصفحة بتتقل. وكمان الـ analytics مش بيسجّل حاجة.»

٨ شكاوى. ولسه مش عارفين هما كام سبب.

---

## الخطوة ٢: Console الأول

افتح DevTools قبل الريفريش (عشان يسجّل من الأول)، و [[Ctrl+Shift+R]]:

~~~text Console (Chrome 156)
Executing inline script violates the following Content Security Policy directive 'script-src 'self''. Either the 'unsafe-inline' keyword, a hash ('sha256-RZYJwEqN2iYwf5JgH+L43xnxWmoc1SQljTLJBwopguI='), or a nonce ('nonce-...') is required to enable inline execution. The action has been blocked.
Mixed Content: The page at 'https://shop.test:8443/broken/' was loaded over HTTPS, but requested an insecure resource 'http://cdn.test:8080/stock.json'. This request has been blocked; the content must be served over HTTPS.
stock failed: Failed to fetch
Failed to load resource: the server responded with a status of 404 (Not Found)
~~~

| الرسالة | الشكوى اللي بتشرحها | الدرس |
|---|---|---|
| [[Executing inline script violates ... CSP]] | «الـ analytics مش بيسجّل»: السكربت الـ inline مااشتغلش أصلًا | «Content Security Policy» |
| [[Mixed Content ... has been blocked]] | «المخزون مش متاح» | «Mixed content و HTTPS» |
| [[stock failed: Failed to fetch]] | نتيجة للي فوقه، مش سبب جديد | «قراءة الأخطاء» |
| [[404]] | دوس عليها: [[/favicon.ico]]. مالهاش علاقة بأي شكوى | — |

شكوتين اتحلوا من غير ولا قياس. وخد بالك: [[Failed to fetch]] لوحده مكانش هيقولك السبب (نفس الرسالة لما النت قاطع أو CORS). السطر اللي **قبله** هو السبب.

---

## الخطوة ٣: Network

[[Ctrl+Shift+R]] و Network مفتوح:

~~~text الطلبات (Status و الملف و النوع)
200 /broken/            document
200 /broken/style.css   stylesheet
200 /broken/app.js      script
200 /img/card.jpg       image
200 /slow/fonts.css     stylesheet   ← ١٫٥ ثانية
200 /slow/img/hero.png  image        ← ١٫٨ ميجا
200 /slow/fonts/brand.ttf font
(failed) http://cdn.test:8080/stock.json   mixed-content
~~~

- [[fonts.css]] **stylesheet** في [[<head>]]: المتصفح مش بيرسم ولا حاجة لحد ما كل الـ CSS اللي في الـ head يوصل. ده تفسير «بيفتح أبيض شوية». والخط نفسه بيتطلب **بعد** ما الـ CSS ده يوصل (Initiator بتاعه [[fonts.css]])، فيتأخر أكتر.
- [[hero.png]]: ١٧٩٥ كيلو PNG لصورة فوتوغرافية. وفي Initiator/Timing هتلاقيه اتطلب متأخر (عليه [[loading="lazy"]]).
- [[stock.json]] أحمر: اتمنع (ده اللي Console قاله).

---

## الخطوة ٤: الأرقام

الصق سطور [[PerformanceObserver]] من درس «Core Web Vitals (LCP/INP)» في Snippet، وشغّله بعد الريفريش، ودوس «ضيف للسلة» مرة:

~~~text measure.mjs broken (نفس السطور، عرض 1366)
load(ms) 2379 paint {"first-paint":1584,"first-contentful-paint":1584}
LCP 2400 hero hero.png
CLS 0.4676 [[0.4676,2362,"cards,H1,promo"]]
INP 312 [["pointerdown",312,0],["pointerup",312,0],["click",312,300]]
~~~

- **FCP ١٥٨٤ms**: أول رسمة بعد ١٫٥ ثانية = وقت [[fonts.css]] بالظبط. ده «بيفتح أبيض».
- **LCP ٢٤٠٠ms** والعنصر [[hero hero.png]]: الصورة التقيلة.
- **CLS ٠٫٤٦٧٦** من shift واحد عند ٢٣٦٢ms، والعناصر [[cards]] و [[H1]] و [[promo]]: لما الصورة وصلت (من غير مقاس) زقت كل اللي تحتها. ده «الكلام بيتنطط».
- **INP ٣١٢ms** و processing الـ click [[300]]: الـ handler نفسه بياخد ٣٠٠ms. ده «بيعلّق لحظة».

تقيس تاني: LCP طلع ٢٥٧٢ في مرة تانية. خد أكتر من قياس.

---

## الخطوة ٥: Elements (الـ modal)

دوس «التفاصيل». الـ modal ظاهر جوه منطقة الكروت بس، والـ header فوقه. في Console:

~~~javascript Console
document.elementFromPoint(200, 20)                            // نقطة جوه الـ header
document.querySelector(".modal").getBoundingClientRect()
~~~

~~~text measure.mjs
modal open: element at header = top modal rect [16,132,1334,585] viewport 1366x768
~~~

النقطة دي رجّعت [[.top]] (الـ header) مش الـ modal، والـ modal مستطيل [[16,132,1334,585]] بدل الشاشة كلها. مع إن [[z-index: 9999]] و [[position: fixed; inset: 0]]!

اختار الـ modal في Elements واطلع لأهله واحد واحد، وفي Computed دوّر على [[transform]]: الـ [[section.cards]] عليه [[transform: translateY(0)]] (من حركة «تظهر وانت بتعمل scroll» حد زوّدها). [[transform]] بيعمل حاجتين:

1. **stacking context جديد:** الـ [[z-index: 9999]] بقى جوه الـ section بس. الـ section نفسه [[z-index: auto]] في نفس مستوى الصفحة، والـ header [[100]]، فالـ header فوق الـ section كله بكل اللي جواه.
2. **containing block للـ fixed:** [[position: fixed]] بقى بالنسبة للـ section مش الشاشة، عشان كده الـ modal أخد مقاس الـ section.

---

## الخطوة ٦: Device Toolbar (الموبايل)

[[Ctrl+Shift+M]]، عرض 360:

~~~text measure.mjs + snippets
360px: scrollWidth 414 clientWidth 360
snippet A (scrollWidth>clientWidth): ["html","body","main.wrap"]
snippet B (rect wider than viewport): ["div.promo -54..344"]
~~~

- الصفحة أعرض من الشاشة بـ ٥٤px.
- السطر المشهور (A) طلّع **الأهالي** بس.
- سطر [[getBoundingClientRect]] (B) طلّع المتسبب: [[div.promo]] من [[-54]] لـ [[344]]: طالع من الشمال لأن الصفحة RTL. وفي Computed: [[width: 381.6px]] = [[106vw]].

---

## الخطوة ٧: Memory (بيتقل مع الوقت)

Performance monitor، وافتح واقفل «التفاصيل» ٣٠ مرة:

~~~text measure.mjs
heap before {"heapMB":2.24,"nodes":97,"listeners":19} after 30 opens {"heapMB":22.96,"nodes":727,"listeners":49}
detached in snapshot: [["<div class=\"gallery\">",31]]
~~~

+٦٣٠ node و +٣٠ listener و ١٠ أضعاف الـ heap. snapshot ثم Comparison ثم [[Detached]] ثم Retainers: [[resize]] listener على [[window]] بيتسجّل مع كل فتحة. (التفاصيل في درس «Memory و heap snapshot».)

---

## الخلاصة قبل التصليح: ٨ شكاوى = ٨ أسباب

| الشكوى | السبب | الأداة اللي كشفته |
|---|---|---|
| أبيض في الأول | [[fonts.css]] بطيء في [[<head>]] | Network + FCP |
| الصورة متأخرة | PNG ١٫٨ ميجا و [[lazy]] | Network + LCP |
| بيتنطط | صورة من غير [[width]]/[[height]] | CLS + sources |
| الزرار بيعلّق | handler ٣٠٠ms | INP + processing |
| الـ modal تحت الـ menu | [[transform]] على الأب | Elements + Computed |
| سكرول جانبي | [[width: 106vw]] | Device Toolbar + Console |
| المخزون مش متاح | [[http://]] من صفحة https | Console |
| الـ analytics | سكربت inline ضد CSP | Console |
| بيتقل مع الوقت | listener مش بيتشال | Memory |

(٩ صفوف لـ ٨ أخطاء: «الصورة متأخرة» و «بيتنطط» نفس الصورة بس سببين مختلفين.)

---

## الخطوة ٨: التصليح، واحدة واحدة

كل تصليح لوحده، وبعده قيس. النسخة المتصلّحة كاملة في [[site/fixed/]]:

**١. CSP:** السكربت الـ inline اتنقل لملف [[/fixed/boot.js]]، و [[<script src="/fixed/boot.js"></script>]] مكانه. ([[script-src 'self']] بيسمح بيه، ومن غير ما نضعف السياسة.)

**٢. Mixed content:** [[fetch("/api/stock.json")]]: نسبي، على نفس الموقع الـ https.

**٣. الخط:** شيلنا [[<link href="/slow/fonts.css">]]، وحطينا الـ [[@font-face]] جوه [[style.css]] بـ [[font-display: swap]]، و [[<link rel="preload" href="/slow/fonts/brand.ttf" as="font" type="font/ttf" crossorigin>]] عشان يبدأ ينزل بدري.

**٤. صورة الـ hero:**

~~~html
<picture>
  <source srcset="/slow/img/hero.avif" type="image/avif">
  <source srcset="/slow/img/hero.webp" type="image/webp">
  <img class="hero" src="/slow/img/hero.jpg" width="1600" height="900" fetchpriority="high" alt="عيش طازة">
</picture>
~~~

و [[.hero { width: 100%; height: auto; }]]. (لسه على [[/slow/]] بنفس التأخير ٨٠٠ms، عشان المقارنة تبقى عادلة: اللي اتغيّر الحجم والأولوية والمقاس بس.) وصور الكروت: [[width="400" height="300" loading="lazy"]].

**٥. INP:** حدّث الزرار الأول، والشغل التقيل في [[setTimeout(..., 0)]] بعده.

**٦. z-index:** الـ modal اتنقل بره [[section.cards]] لآخر [[<body>]]، والأرقام بقت tokens: [[--z-header: 100; --z-modal: 200]] (مش [[9999]]: الرقم الكبير مكانش المشكلة).

**٧. Overflow:** شيلنا [[width: 106vw]] من [[.promo]] (عنصر block بياخد العرض المتاح لوحده). مش [[overflow-x: hidden]] على [[body]].

**٨. Leak:** [[AbortController]] و [[{ signal: ctrl.signal }]] على الـ listener، و [[ctrl.abort()]] في القفلة.

---

## الخطوة ٩: فحوصات تمنعها ترجع

### من غير متصفح: [[lint.mjs]]

~~~javascript lint.mjs
import fs from "node:fs";
import path from "node:path";

export function lint({ html, css, js }) {
  const issues = [];
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  for (const t of imgs) if (!/\bwidth=/.test(t) || !/\bheight=/.test(t)) issues.push("CLS: img without width/height: " + t.slice(0, 45));
  if (imgs[0] && /loading="lazy"/.test(imgs[0])) issues.push("LCP: first image is lazy");
  if (/<script>\s*\S/.test(html)) issues.push("CSP: inline <script> (script-src 'self' blocks it)");
  for (const m of (html + css + js).matchAll(/["'(]http:\/\/[^"')\s]+/g)) issues.push("Mixed content: " + m[0].slice(1));
  if (/<link rel="stylesheet" href="[^"]*font/.test(html)) issues.push("Font: separate render-blocking font CSS");
  for (const m of css.matchAll(/@font-face\s*{[^}]*}/g)) if (!/font-display/.test(m[0])) issues.push("Font: @font-face without font-display");
  for (const m of css.matchAll(/width:\s*1\d\dvw/g)) issues.push("Overflow: " + m[0]);
  const adds = (js.match(/window\.addEventListener\(/g) || []).length;
  const removes = (js.match(/removeEventListener|signal:/g) || []).length;
  if (adds > removes) issues.push("Leak?: window.addEventListener x" + adds + " without remove/signal");
  return issues;
}

const dir = process.argv[2];
if (dir) {
  const read = f => fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), "utf8") : "";
  const issues = lint({ html: read("index.html"), css: read("style.css"), js: read("app.js") });
  for (const i of issues) console.log(i);
  console.log(issues.length + " issue(s) in " + dir);
  process.exit(issues.length ? 1 : 0);
}
~~~

~~~text node lint.mjs site/broken ; node lint.mjs site/fixed
CLS: img without width/height: <img class="hero" src="/slow/img/hero.png" lo
CLS: img without width/height: <img src="/img/card.jpg" alt="كرواسون">
CLS: img without width/height: <img src="/img/card.jpg" alt="عيش فينو">
LCP: first image is lazy
CSP: inline <script> (script-src 'self' blocks it)
Mixed content: http://cdn.test:8080/stock.json
Font: separate render-blocking font CSS
Overflow: width: 106vw
Leak?: window.addEventListener x1 without remove/signal
9 issue(s) in site/broken
0 issue(s) in site/fixed
~~~

ده فحص بالأنماط (regex): سريع، ومش محتاج متصفح، بس مش بيفهم الـ z-index ولا الـ INP ولا أي حاجة بتحصل وقت التشغيل. عشان كده فيه التاني.

### بـ Chrome: [[check.mjs]]

~~~javascript check.mjs
import { chromium } from "playwright-core";
const v = process.argv[2] || "fixed";
const browser = await chromium.launch({ channel: "chrome", args: ["--host-resolver-rules=MAP *.test 127.0.0.1"] });
const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1366, height: 768 } });
await ctx.addInitScript(() => {
  window.__m = { cls: 0, lcp: 0, inp: 0 };
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) __m.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver(l => { __m.lcp = l.getEntries().at(-1).startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (e.interactionId) __m.inp = Math.max(__m.inp, e.duration); }).observe({ type: "event", buffered: true, durationThreshold: 16 });
});
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Log.enable");
const problems = [];
cdp.on("Log.entryAdded", e => { if (e.entry.source === "security") problems.push(e.entry.text.slice(0, 60)); });
await page.goto("https://shop.test:8443/" + v + "/", { waitUntil: "load" });
await page.waitForTimeout(1500);
await page.click(".add"); await page.waitForTimeout(300);
await page.click(".more");
const onTop = await page.evaluate(() => document.elementFromPoint(200, 20).closest(".modal") !== null);
await page.click("#close");
const metric = async n => { await cdp.send("HeapProfiler.collectGarbage"); return (await cdp.send("Performance.getMetrics")).metrics.find(x => x.name === n).value; };
await cdp.send("Performance.enable");
const nodes0 = await metric("Nodes");
for (let i = 0; i < 30; i++) { await page.click(".more"); await page.click("#close"); }
const nodes1 = await metric("Nodes");
await page.setViewportSize({ width: 360, height: 740 }); await page.waitForTimeout(300);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
const m = await page.evaluate(() => __m);
const checks = [
  ["LCP <= 2500ms", m.lcp <= 2500, Math.round(m.lcp)],
  ["CLS <= 0.1", m.cls <= 0.1, m.cls.toFixed(4)],
  ["INP <= 200ms", m.inp <= 200, Math.round(m.inp)],
  ["no CSP / mixed content", problems.length === 0, problems.length],
  ["modal above header", onTop, onTop],
  ["no overflow at 360px", overflow === 0, overflow + "px"],
  ["no DOM leak (30 opens)", nodes1 - nodes0 === 0, "+" + (nodes1 - nodes0) + " nodes"],
];
for (const [name, ok, val] of checks) console.log((ok ? "PASS " : "FAIL ") + name.padEnd(24) + " " + val);
await browser.close();
process.exit(checks.every(c => c[1]) ? 0 : 1);
~~~

- [[addInitScript]]: السطور بتتحط **قبل** أي سكربت في الصفحة، فمفيش entry بيفوتنا.
- [[newCDPSession]]: اتصال DevTools Protocol بنفس الصفحة، زي ما DevTools بيعمل. [[Log.entryAdded]] بيجيب رسايل Console اللي المتصفح نفسه بيكتبها (CSP و Mixed Content مش [[console.log]]، فـ [[page.on("console")]] مش هيجيبهم كلهم).
- [[source === "security"]]: CSP و mixed content الاتنين نوعهم [[security]].
- [[HeapProfiler.collectGarbage]] قبل كل قراية: نفس زرار الزبالة في Memory.

~~~text node check.mjs broken ; node check.mjs fixed
FAIL LCP <= 2500ms            2572
FAIL CLS <= 0.1               0.4676
FAIL INP <= 200ms             312
FAIL no CSP / mixed content   2
FAIL modal above header       false
FAIL no overflow at 360px     54px
FAIL no DOM leak (30 opens)   +630 nodes
exit=1
PASS LCP <= 2500ms            1144
PASS CLS <= 0.1               0.0000
PASS INP <= 200ms             40
PASS no CSP / mixed content   0
PASS modal above header       true
PASS no overflow at 360px     0px
PASS no DOM leak (30 opens)   +0 nodes
exit=0
~~~

### و [[measure.mjs]]: نفس الكلام بالتفاصيل

نفس [[check.mjs]] بالظبط، بس بيطبع القيم نفسها (اللي في الخطوات ٤ لـ ٧) بدل PASS/FAIL. الجزء الوحيد الجديد فيه عدّ الـ detached من الـ heap snapshot:

~~~javascript measure.mjs (الجزء بتاع الـ snapshot)
let chunks = "";
cdp.on("HeapProfiler.addHeapSnapshotChunk", e => chunks += e.chunk);
await cdp.send("HeapProfiler.takeHeapSnapshot", { reportProgress: false });
const snap = JSON.parse(chunks), f = snap.snapshot.meta.node_fields, nf = f.length;
const di = f.indexOf("detachedness"), ni = f.indexOf("name"), counts = {};
for (let i = 0; i < snap.nodes.length; i += nf) if (snap.nodes[i + di] === 2) { const n = snap.strings[snap.nodes[i + ni]]; counts[n] = (counts[n] || 0) + 1; }
console.log("detached in snapshot:", JSON.stringify(Object.entries(counts)));
~~~

- الـ snapshot بيوصل حتت ([[addHeapSnapshotChunk]])، فبنجمعها نص واحد ونعمله [[JSON.parse]] (ده نفس ملف [[.heapsnapshot]] اللي Memory بيحفظه).
- [[nodes]] array أرقام مسطّحة: كل [[node_fields.length]] رقم = node واحد، و [[detachedness]] قيمته [[2]] = detached.

(الـ LCP بيتغيّر من تشغيل لتشغيل: ٢٤٠٠ و ٢٥٧٢ للمكسورة، و ٨٩٦ و ١١٤٤ للمتصلّحة. الحد ٢٥٠٠ بيعدّي أو يقع حسب الحظ في المكسورة، عشان كده في CI بتقيس ٣ مرات وتاخد الوسط.)

---

## قبل وبعد

| | قبل | بعد |
|---|---|---|
| FCP | ١٥٨٤ms | ١٩٦ms |
| LCP | ٢٤٠٠–٢٥٧٢ms ([[hero.png]]) | ٨٩٦–١١٤٤ms ([[hero.avif]]) |
| CLS | ٠٫٤٦٧٦ | ٠ |
| INP | ٣١٢ms | ٢٤–٤٠ms |
| أخطاء أمان في Console | ٢ | ٠ |
| الـ modal فوق الـ header | لأ | آه، ومغطّي الشاشة [[0,0,1366,768]] |
| العرض على ٣٦٠ | ٤١٤px | ٣٦٠px |
| بعد ٣٠ فتحة | +٦٣٠ node، والـ heap ٢٫٢٤ ← ٢٢٫٩٦ ميجا، و ٣١ detached | +٠ node، والـ heap ١٫٤٩ ← ١٫٦٠ ميجا، و ٠ detached |
| المخزون | «مش متاح» | «١٢ رغيف» |

### وعلى موبايل بطيء

نفس النسختين على عرض ٤١٢، و latency 150ms و ١٫٦ ميجابت تنزيل (قريب من Slow 4G)، و CPU أبطأ ٤ مرات:

~~~text
broken  load 15707ms  transferred 2661 KB  CLS 0.2214
fixed   load  5518ms  transferred  919 KB  CLS 0.0066
~~~

وحاجتين مكانوش باينين على الديسكتوب:

- **عنصر الـ LCP اتغيّر:** على ٤١٢ صورة الكارت ([[card.jpg]]، ١٠٨٣٠٠ بكسل مربع) بقت أكبر من الـ hero (اللي ارتفاعها أقل على الشاشة الضيقة)، فالـ LCP بقى الكارت. يعني «صورة الـ LCP» بتختلف حسب المقاس، فقيس على الاتنين.
- **الحاجة التقيلة الجاية الخط:** من الـ ٩١٩ كيلو اللي فاضلين، ٨٩٨ هما ملف الخط TTF. والـ [[swap]] عمل shift صغير ([[0.0066]]) لما الخط اتبدّل. الخطوة الجاية (من الـ docs، مااتعملتش هنا): حوّله WOFF2 واعمل subset للحروف العربي واللاتيني اللي بتستخدمها بس (أداة [[pyftsubset]] من fonttools)، وظبّط [[size-adjust]] في [[@font-face]] للخط الاحتياطي عشان الـ shift يبقى صفر.

---

## الأمان والأداء في المشروع نفسه

- الشهادة والـ [[--ignore-certificate-errors]] للمعمل بس. متستخدمش الـ profile ده للتصفح العادي.
- السيرفر على [[127.0.0.1]] بس، مش [[0.0.0.0]]: محدش على الشبكة يوصله.
- [[check.mjs]] بياخد حوالي ١٠ ثواني (٣٠ فتحة modal و GC). في CI شغّله على النسخة المبنية بعد الـ build.

---

## بعد ما يخلص

**يكبر إزاي:**

- **صفحات أكتر:** خلّي [[check.mjs]] ياخد لستة URLs (أو [[sitemap.xml]]) والفحوصات لكل صفحة.
- **أرقام اليوزرز الحقيقيين:** مكتبة [[web-vitals]] في الموقع بتبعت LCP و INP و CLS لـ endpoint عندك، وتحسب الـ p75 كل يوم (درس «Core Web Vitals (LCP/INP)»).
- **CI:** GitHub Actions بيشغّل [[lint.mjs]] على كل push و [[check.mjs]] بعد النشر على staging، والـ job يقع لو أي FAIL.
- **تقرير HTML** بالأرقام قبل وبعد وصور الشاشة على ٣ مقاسات (درس «playwright screenshot»).

**بيتكلّف كام:** المعمل صفر (Node و Chrome على جهازك). لو حطيت [[check.mjs]] في GitHub Actions على ريبو عام: مجاني. ولو بتبيعه كخدمة «فحص موقع» لزباين: سيرفر صغير (VPS بحوالي ٥ دولار في الشهر) يكفي يشغّل Chrome headless لكام موقع في اليوم.

**خليه بتاعك:** خد موقع حقيقي عندك (أو موقع عملته قبل كده)، وطبّق نفس الخطوات من ١ لـ ٧ واكتب الجدول قبل وبعد. أو زوّد أخطاء جديدة للمعمل من درس «Elements» (sticky بايظ من [[overflow]] على الأب) و «Performance و Coverage» (أبيض قبل الـ dark mode)، وزوّد لكل واحد فحص في [[check.mjs]].

## الخلاصة

- الترتيب: Console، وبعدين Network، وبعدين الأرقام، وبعدين Elements و Device Toolbar و Memory.
- كل شكوى = رقم = عنصر أو سطر = تصليح = رقم جديد.
- صلّح واحدة واحدة وقيس بعد كل واحدة، وقيس أكتر من مرة وعلى أكتر من مقاس.
- [[lint.mjs]] بيمسك الأنماط بسرعة، و [[check.mjs]] بيمسك اللي بيحصل وقت التشغيل، والاتنين بيخرجوا بـ [[1]] في CI.`,
          sol: R`لو مشيت بالترتيب هتلاقي نفس الـ ٨ أسباب اللي في جدول «الخلاصة قبل التصليح»، والأرقام قريبة من دي (هتختلف شوية حسب جهازك): FCP حوالي ١٫٦ ثانية، و LCP حوالي ٢٫٤–٢٫٦ ثانية بعنصر [[img.hero]] و [[hero.png]]، و CLS حوالي [[0.47]] ومعاه [[cards]] و [[H1]] و [[promo]]، و INP حوالي ٣١٠ms و processing ٣٠٠ms، و [[elementFromPoint]] في الـ header بيرجّع الـ header، و [[scrollWidth]] على ٣٦٠ = [[414]]، و +٦٣٠ node بعد ٣٠ فتحة و ٣١ [[Detached <div class="gallery">]].

بعد التصليحات: FCP حوالي ٢٠٠ms، و LCP أقل من ١٫٢ ثانية بـ [[hero.avif]]، و CLS [[0]]، و INP أقل من ٥٠ms، وصفر رسايل أمان، والمخزون «١٢ رغيف»، و [[node check.mjs fixed]] بيطبع ٧ PASS ويخرج بـ [[0]]. ولو LCP المكسورة طلع عندك أقل من ٢٥٠٠ في مرة، فده التذبذب الطبيعي: الفحوصات التانية كلها FAIL برضه.`,
          flag: "term",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الـ ٨ أخطاء، وجنب كل واحد الأداة اللي بتكشفه أسرع، والترتيب اللي بتمشي بيه في التشخيص وليه Console الأول.`, done: R`الـ ٨ صح، وكل واحد جنبه أداة (Console و Network و CLS/INP و Elements و Device Toolbar و Memory)، وكاتب إن Console بيقول الأمان بالنص من غير قياس.` },
            { lvl: 'تطبيق', t: R`**ابني المعمل وشخّص:** ابني النسخة المكسورة من الشرح، وامشي على الخطوات ٢ لـ ٧ بإيدك في DevTools (مش بـ [[measure.mjs]])، واملى جدول الشكاوى والأسباب.`, done: R`جدولك فيه الـ ٨ أسباب، وكل واحد معاه رقم قسته انت (FCP و LCP و CLS و INP و scrollWidth و nodes)، وكلهم قريبين من أرقام الدرس.` },
            { lvl: 'تطبيق', t: R`**صلّح وقيس واحدة واحدة:** صلّح الأخطاء بالترتيب اللي في الخطوة ٨، وبعد كل تصليح شغّل [[check.mjs]] وسجّل أنهي FAIL بقى PASS.`, done: R`عندك ٨ صفوف (تصليح ← الفحص اللي اتغيّر)، وفي الآخر ٧ PASS و exit [[0]]، ومفيش تصليح «صلّح» فحص مالوش علاقة بيه.` },
            { lvl: 'تطبيق', t: R`**زوّد خطأ للمعمل:** ضيف للنسخة المكسورة sticky header جوه [[<div style="overflow: hidden">]]، وزوّد فحص في [[check.mjs]]: بعد [[scrollTo(0, 800)]] الـ header [[top]] بتاعه [[0]].`, done: R`الفحص الجديد FAIL على المكسورة (الـ top [[-800]] زي ما اتقاس في تمارين درس «Elements»)، و PASS بعد ما شيلت الـ [[overflow]] أو حوّلته [[clip]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس (موبايل بطيء):** شغّل القياس على عرض ٤١٢ مع latency 150ms و ١٫٦ ميجابت و CPU 4x ([[Network.emulateNetworkConditions]] و [[Emulation.setCPUThrottlingRate]]) للنسختين. عنصر الـ LCP إيه؟ وأكبر ملف فاضل إيه؟`, done: R`عنصر الـ LCP على ٤١٢ صورة الكارت مش الـ hero (زي المعمل)، والـ load حوالي ١٥٫٧ ← ٥٫٥ ثانية، والملف الأكبر في النسخة المتصلّحة هو الخط، وكاتب الخطوة الجاية (WOFF2 و subset).` },
            { lvl: 'تحدي', t: R`**ابني (CI):** workflow بيشغّل السيرفر في الخلفية، ويستنى يبقى جاهز ([[curl]] في loop بـ timeout)، ويشغّل [[lint.mjs]] و [[check.mjs]] ٣ مرات ويحكم على الوسط في LCP، ويقع لو أي FAIL.`, done: R`على النسخة المتصلّحة الـ job أخضر، ولما رجّعت سطر [[loading="lazy"]] على الـ hero الـ job وقع عند [[lint.mjs]] برسالة [[LCP: first image is lazy]].` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`function lint({ html, css, js }) {
  const issues = [];
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  for (const t of imgs) if (!/\bwidth=/.test(t) || !/\bheight=/.test(t)) issues.push("CLS: img without width/height");
  if (imgs[0] && /loading="lazy"/.test(imgs[0])) issues.push("LCP: first image is lazy");
  if (/<script>\s*\S/.test(html)) issues.push("CSP: inline <script>");
  for (const m of (html + css + js).matchAll(/["'(]http:\/\/[^"')\s]+/g)) issues.push("Mixed content: " + m[0].slice(1));
  if (/<link rel="stylesheet" href="[^"]*font/.test(html)) issues.push("Font: separate render-blocking font CSS");
  for (const m of css.matchAll(/@font-face\s*{[^}]*}/g)) if (!/font-display/.test(m[0])) issues.push("Font: @font-face without font-display");
  for (const m of css.matchAll(/width:\s*1\d\dvw/g)) issues.push("Overflow: " + m[0]);
  const adds = (js.match(/window\.addEventListener\(/g) || []).length;
  const removes = (js.match(/removeEventListener|signal:/g) || []).length;
  if (adds > removes) issues.push("Leak?: window.addEventListener x" + adds);
  return issues;
}
const broken = {
  html: '<link rel="stylesheet" href="/slow/fonts.css"><img class="hero" src="/slow/img/hero.png" loading="lazy" alt=""><img src="/img/card.jpg" alt=""><script>window.analyticsReady = true;</script>',
  css: ".promo { width: 106vw; }",
  js: 'window.addEventListener("resize", () => {}); fetch("http://cdn.test:8080/stock.json");',
};
const fixed = {
  html: '<img class="hero" src="/slow/img/hero.jpg" width="1600" height="900" fetchpriority="high" alt=""><img src="/img/card.jpg" width="400" height="300" loading="lazy" alt=""><script src="/fixed/boot.js"></script>',
  css: '@font-face { font-family: "Brand"; src: url("/slow/fonts/brand.ttf"); font-display: swap; } .promo { padding: 8px; }',
  js: 'window.addEventListener("resize", () => {}, { signal: ctrl.signal }); fetch("/api/stock.json");',
};
for (const [name, site] of [["broken", broken], ["fixed", fixed]]) {
  const issues = lint(site);
  issues.forEach(i => console.log("  " + i));
  console.log(name + ": " + issues.length + " issue(s)");
}`, expect: [R`LCP: first image is lazy`, R`Mixed content: http://cdn.test:8080/stock.json`, R`Overflow: width: 106vw`, R`broken: 8 issue(s)`, R`fixed: 0 issue(s)`] },
          ],
        }
      ]
    }
]);

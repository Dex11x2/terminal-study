// تكملة تاب web: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/web/01.js (شرح حقول الدرس في أوله)
MORE("web", [
    {
      t: "فحص الموقع من بره",
      l: 3,
      n: "اللي جوجل والمهاجمين والأدوات بيشوفوه. اعمل الفحص ده لمواقعك انت أو المواقع اللي عندك إذن تختبرها",
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

لو ما ظهرش: فيه [[add_header]] تاني جوه [[location]] (ولما location فيها add_header بتلغي كل اللي ورثته من server)، أو الرد error ونسيت [[always]]. سيب CSP للآخر وابدأها بـ [[Content-Security-Policy-Report-Only]] لأنها بتكسر سكربتات. (مقدرتش أجرّب Nginx حقيقي هنا.)`
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

الغلط الأشهر في SPA: كل الصفحات بترجّع نفس الـ title، أو grep مش بيلاقي description خالص لأن React بيحطها بعد التحميل. [[robots.txt]] المفروض يرجع نص فيه [[Sitemap: https://...]] ومفيهوش [[Disallow: /]] (دي بتمنع جوجل من الموقع كله، وبتتنسي من staging). و [[curl -sI .../sitemap.xml]] لازم يرجع [[200]]، لو [[404]] اعمل واحد.`
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

لو قالك [[Excluded by 'noindex' tag]] أو [[Blocked by robots.txt]] ده غلط عندك مش عند جوجل. وخد بالك إن البيانات في Performance بتاخد يومين تلاتة تظهر لموقع جديد.`
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
            { lvl: 'سريع', t: R`من غير ما تشغّل: [[curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/]] طبع [[307 http://localhost:3000/ar]]. إيه اللي هيطبعه نفس الأمر بـ [[-L]] و [[%{url_effective}]] بدل [[%{redirect_url}]]؟ اكتب توقعك وبعدين جرّب على أي موقع بيحوّل.`, done: R`توقعت [[200 http://localhost:3000/ar]] (أو اللي يقابلها في موقعك)، وطابق التشغيل، وتقدر تقول الفرق بين [[redirect_url]] و [[url_effective]] في جملة.` },
            { lvl: 'تطبيق', t: R`ابني [[smoke.sh]]: بيشغّل [[npm run dev]] في الخلفية باللوج، ويستنى بـ [[timeout]]، ويطلب ٣ صفحات ويطبع لكل واحدة الكود والوقت، ويطبع [[FAIL]] ويخرج بـ 1 لو أي واحدة مش 200، وفي الآخر يقفل السيرفر اللي شغّله هو بس ([[kill $PID]] بـ [[$!]]).`, done: R`على مشروع سليم بيطبع ٣ سطور [[200]] ويخرج 0، ولو كسرت صفحة بيطبع [[FAIL /اسم-الصفحة 500]] ويخرج 1، وبعد ما يخلص البورت فاضي.` },
            { lvl: 'تطبيق', t: R`صلّح السكربت ده اللي بيعلّق ساعات: [[npm run dev > dev.log & until grep -q "Ready in" dev.log; do sleep 1; done; curl -s localhost:3000 | grep -c "Hello"]]. فيه ٣ مشاكل على الأقل (الأخطاء رايحة فين، والانتظار للأبد، والألوان). اكتب النسخة المصلّحة واختبرها والسيرفر بيقع (مثلًا والبورت مشغول بـ [[-p]]).`, done: R`النسخة المصلّحة فيها [[2>&1]] و [[timeout]] و [[-a]] و [[Error]] في الشرط، ولما البورت مشغول بتخرج في أقل من دقيقة وبتطبع سطر [[EADDRINUSE]] من اللوج.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية: خد [[.next/dev/logs/next-development.log]] من مشروعك بعد شوية تجارب، واكتب أمر (بـ [[grep]] أو [[node -e]] أو [[jq]] لو عندك) بيطبع آخر ٣ أخطاء: الوقت، والمصدر ([[Server]] أو [[Browser]])، وأول سطر من الرسالة.`, done: R`الأمر بيطبع ٣ سطور كل واحد فيه [[timestamp]] و [[Server]] أو [[Browser]] وأول سطر من الخطأ، وبيتغيّر لو عملت خطأ جديد وشغّلته تاني.` },
            { lvl: 'تحدي', t: R`قارن وقيس: على صفحة واحدة، قيس [[time_total]] لأول طلب بعد ما تشغّل السيرفر، وبعدين ٥ طلبات ورا بعض، وبعدين بعد ما تعدّل الصفحة. اطبع جدول بـ [[curl -w]] واشرح ليه الأول مختلف.`, done: R`عندك ٧ أرقام: الأول أكبر بكتير، والـ ٥ قريبين من بعض، واللي بعد التعديل أكبر شوية، وكاتب سبب كل واحد في جملة (build أول طلب، كاش، recompile).` },
            { lvl: 'تحدي', t: R`نفس [[smoke.sh]] بس PowerShell: [[Start-Process]] بـ [[-RedirectStandardOutput]] و [[-RedirectStandardError]] (لازم ملفين مختلفين)، وحلقة [[while]] بعدّاد على **الملفين**، و [[curl.exe -w]]، و [[Stop-Process]] في الآخر. اختبره والبورت مشغول وشوف أنهي ملف فيه الخطأ.`, done: R`السكربت بيشتغل في 7 و 5.1، والبورت مشغول بيخرج برسالة فيها السطر اللي جه من ملف الـ stderr، ومن غير مشكلة بيطبع [[200]].` },
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
            { lvl: 'سريع', t: R`اقرا وتوقّع: صفحة فيها [[@media (max-width: 767px) { .gallery { display: none } }]]. لقطة اتاخدت بعرض 591، وتانية 768، وتالتة 767. المعرض هيظهر في أنهي لقطة؟ وبعدين صوّر التلاتة واتأكد.`, done: R`كتبت إنه هيظهر في 768 بس، والتلات لقطات أكدت (أو [[getComputedStyle]] رجّع [[none]] في 591 و 767 و [[grid]] أو [[block]] في 768).` },
            { lvl: 'تطبيق', t: R`ابني «CDN» صغير بـ Node بيقدّم ملف فيديو برابط فيه [[?Expires=]] ويرد [[403]] بعده، ويدعم [[Range]]. اختبره بـ [[curl -sI]] و [[curl -r 0-1]] قبل وبعد الانتهاء.`, done: R`قبل الانتهاء: [[200]] و [[Accept-Ranges: bytes]]، و [[-r 0-1]] بيرد [[206]] و [[2]] بايت. بعده: [[403]] للاتنين.` },
            { lvl: 'تطبيق', t: R`صلّح الأمر ده: [[curl -s -o public/hero.mp4 "$VIDEO_URL"]] اتشغّل بعد ما الرابط انتهى، والصفحة فيها فيديو أسود. اكتشف إيه اللي اتحفظ فعلًا ([[file]] و [[head -c 200]])، واكتب نسخة من الأمر بتفشل بصوت عالي بدل ما تحفظ صفحة خطأ.`, done: R`[[file]] قال XML أو text مش MP4، والنسخة المصلّحة فيها [[-f]] (أو بتفحص [[%{http_code}]]) ورقم خروجها مش صفر لما الرابط منتهي، ومبتسيبش ملف مكانه.` },
            { lvl: 'تطبيق', t: R`قيس: على المعمل، احسب البايتات اللي اتحمّلت للفيديو في ٤ ثواني بعرض 591 والفيديو [[display: none]]، وبعدين بعد ما تحط [[src]] بـ [[matchMedia]] بس. استخدم لوج السيرفر أو Network.`, done: R`عندك رقمين: الأول أكبر من صفر (ميجات)، والتاني صفر ومفيش ولا طلب [[.mp4]] في Network.` },
            { lvl: 'تحدي', t: R`دوّر بنفسك: اعرف من [[man ffmpeg]] أو وثائق ffmpeg يعني إيه [[faststart]]، وبعدين اعمل فيديو بـ [[ffmpeg -f lavfi -i testsrc2=size=1280x720:rate=30 -t 10]] مرة من غير و مرة بـ [[-movflags +faststart]]، وعدّ طلبات [[ERR_ABORTED]] لكل واحد في Playwright.`, done: R`عندك رقمين: من غير faststart فيه طلب لآخر الملف ([[bytes=<رقم كبير>-]]) وإلغاءات أكتر، وبـ faststart الطلب ده اختفى. وكاتب في سطر faststart بيعمل إيه.` },
            { lvl: 'تحدي', t: R`ابني [[find-temp-urls.sh]]: بيدوّر في فولدرات الكود على روابط مؤقتة ([[Expires=]] و [[Signature=]] و [[X-Amz-]] و [[token=]]) ويطبع الملف والسطر، ولكل رابط يعمل [[curl -sI --max-time 10]] ويطبع الكود. ويخرج بـ 1 لو لقى أي رابط مؤقت.`, done: R`على مشروع فيه رابط موقّع واحد: بيطبع [[ملف:سطر]] والكود ([[200]] أو [[403]]) ويخرج 1، وعلى مشروع نضيف بيخرج 0 من غير طباعة.` },
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
        }
      ]
    }
]);

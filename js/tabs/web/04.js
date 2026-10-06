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
        }
      ]
    }
]);

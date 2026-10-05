// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "DNS و Cloudflare",
      l: 2,
      n: "الدومين بيشاور على مين، وإيه اللي بيحصل للطلب قبل ما يوصل سيرفرك",
      items: [
        {
          cmd: "Route 53",
          title: "الدومين يشاور على CloudFront أو load balancer",
          desc: R`Route 53 هو الـ DNS بتاع AWS: بتعمل hosted zone للدومين (٠.٥ دولار في الشهر)، وتحط الـ nameservers بتوعه عند المسجّل، وتضيف records.

الميزة الخاصة alias record: زي CNAME بس بيشتغل على الدومين الرئيسي نفسه ([[example.com]] من غير www)، وبيشاور على CloudFront أو load balancer أو S3، والاستعلامات عليه ببلاش. تحذير: أي تغيير هنا بيغيّر مكان موقعك لكل الناس، فراجعه قبل ما تطبّقه.`,
          example: R`aws route53 list-hosted-zones --query "HostedZones[].[Id,Name]" --output table
aws route53 change-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --change-batch file://www.json
aws route53 list-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --query "ResourceRecordSets[].[Name,Type,TTL]" --output table
dig +short NS example.com
dig +short www.example.com`,
          try: R`اكتب [[www.json]] بتغيير [[UPSERT]] لسجل A alias: الـ [[Name]] هو [[www.example.com]]، والـ [[AliasTarget]] فيه [[DNSName]] بتاع الـ distribution، و [[HostedZoneId]] الثابت بتاع CloudFront ([[Z2FDTNDATAQYW2]])، و [[EvaluateTargetHealth]] بـ false. نفّذه، وتابع بـ [[dig]] لحد ما يرد.`,
          flag: "danger",
          deep: {
            why: "الدومين أول حاجة في رحلة كل طلب. لو غلطت فيه الموقع كله مش موجود حتى لو كل حاجة تانية سليمة. وفهمه بيخليك تنقل من سيرفر لسيرفر من غير ما حد يحس.",
            how: R`المسجّل (registrar) هو اللي اشتريت منه الدومين، و DNS provider هو اللي بيرد على «example.com فين؟»، وممكن يبقوا مكانين مختلفين. سجل الـ NS عند المسجّل بيقول «اسألوا الـ nameservers دول». ولما تنقل لـ Route 53 أو Cloudflare، بتغيّر الـ NS بس.

الـ records: [[A]] (عنوان IPv4)، و [[AAAA]] (IPv6)، و [[CNAME]] (اسم تاني، ومينفعش على الدومين الرئيسي)، و [[MX]] (الإيميل)، و [[TXT]] (توثيقات زي SPF و DKIM).

الـ alias خاص بـ Route 53: من برا بيبان A عادي، بس جوه بيتتبّع عنوان CloudFront أو الـ ALB لوحده لو اتغير. وفيه كمان routing policies: weighted (تقسيم نسبة بين عنوانين، مفيد في النقل التدريجي)، و latency، و failover مع health checks.

الـ TTL: كام ثانية الناس تحتفظ بالرد. قبل أي نقل نزّله لـ 60 قبلها بيوم، عشان التغيير ينتشر بسرعة، وبعد ما تستقر رجّعه 3600.

[[UPSERT]] يعني «اعمله لو مش موجود، وعدّله لو موجود». والـ change-batch بيتنفذ كله أو مفيش حاجة.`,
            when: "لما البنية على AWS وعايز alias على الدومين الرئيسي. ولو الـ DNS على Cloudflare، بتعمل نفس الحاجة هناك (CNAME flattening).",
            mistakes: "تغيّر الـ NS عند المسجّل قبل ما تنسخ كل الـ records القديمة (خصوصًا MX)، فالإيميل يقف. وتعمل CNAME على [[example.com]] نفسه. وتنقل والـ TTL لسه 86400، فنص الناس على السيرفر القديم يوم كامل. والتشخيص الكامل في تاب التشخيص: «الدومين بيشاور على مين»."
          },
          lines: [
            "الدومينات اللي على Route 53 ورقم كل zone.",
            "طبّق تغيير على الـ records من ملف (هنا www).",
            "اعرض الـ records: الاسم والنوع والـ TTL.",
            "مين الـ nameservers بتوع الدومين فعلًا.",
            "www بتشاور على إيه دلوقتي."
          ],
          sol: R`[[www.json]] تحت. [[change-resource-record-sets]] بيرجّع [[ChangeInfo]] فيه [[Status: PENDING]] و [[Id]]، وبعد أقل من دقيقة غالبًا [[get-change]] يقول [[INSYNC]]. بعدها [[dig +short www.example.com]] بيرجّع كذا IP (عناوين CloudFront، بتتغير)، ومش هترجّع اسم cloudfront.net زي الـ CNAME، لأن الـ alias بيتحل جوه Route 53.

لو [[dig]] مرجّعش حاجة، اتأكد إن [[dig +short NS example.com]] بيرجّع nameservers بتاعة [[awsdns]] نفس اللي في الـ hosted zone؛ لو لسه nameservers المسجّل القديم يبقى الـ zone ده محدش بيسأله. ولو الـ IPs رجعت بس فتح [[https://www.example.com]] طلّع [[403 ERROR The request could not be satisfied]]، يبقى الـ distribution ناقصه Alternate domain name [[www.example.com]] وشهادة ACM ليه (والشهادة لازم تبقى في us-east-1).

وأخطاء الـ JSON: [[InvalidChangeBatch]] لو كتبت [[TTL]] أو [[ResourceRecords]] مع alias (الـ alias ملوش TTL)، أو حطيت [[HostedZoneId]] بتاع الـ zone بتاعك بدل [[Z2FDTNDATAQYW2]].`,
          solCode: R`cat > www.json <<'EOF'
{
  "Comment": "www -> CloudFront",
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "www.example.com",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d111111abcdef8.cloudfront.net",
        "EvaluateTargetHealth": false
      }
    }
  }]
}
EOF
CHANGE=$(aws route53 change-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --change-batch file://www.json --query ChangeInfo.Id --output text)
aws route53 wait resource-record-sets-changed --id $CHANGE
dig +short www.example.com`
        },
        {
          cmd: "Cloudflare proxy و SSL",
          title: "السحابة البرتقاني و Full (strict)",
          desc: R`في Cloudflare كل سجل DNS يا رمادي (DNS only، الزائر بيروح لسيرفرك مباشرة) يا برتقاني (proxied، الزائر بيكلّم Cloudflare و Cloudflare بيكلّم سيرفرك)، والبرتقاني بيخبّي IP سيرفرك ويدّيك SSL وكاش و WAF وحماية DDoS.

وضع الـ SSL بيحدد الجزء التاني من السكة (من Cloudflare لسيرفرك): Flexible (HTTP من غير تشفير)، و Full (HTTPS من غير ما يتأكد من الشهادة)، و Full (strict) (HTTPS بشهادة سليمة). استخدم Full (strict) دايمًا.`,
          example: R`dig +short myapp.example.com
curl -sI https://myapp.example.com | grep -i -E "^server|cf-ray|cf-cache-status"
echo | openssl s_client -connect 203.0.113.10:443 -servername myapp.example.com 2>/dev/null | openssl x509 -noout -subject -issuer -enddate
curl -sIL --max-redirs 5 http://myapp.example.com | grep -i -E "^HTTP|^location"
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do sudo ufw allow from $ip to any port 80,443 proto tcp; done`,
          try: "خلّي السجل برتقاني وشوف [[dig]] بيرجّع IPs بتاعة Cloudflare مش سيرفرك. اتأكد إن السيرفر عليه شهادة سليمة بأمر openssl، وبعدين غيّر SSL mode لـ Full (strict) وافتح الموقع.",
          deep: {
            why: "Flexible بيدّي قفل أخضر للزائر وهو كذب: من Cloudflare لسيرفرك الكلام رايح نص عادي. وأشهر مشكلة: Flexible + سيرفر بيحوّل HTTP لـ HTTPS = redirect loop (ERR_TOO_MANY_REDIRECTS) ومحدش فاهم ليه.",
            how: R`مع البرتقاني، الـ DNS بيرجّع IPs بتاعة Cloudflare. الزائر بيعمل TLS مع Cloudflare بشهادتهم، و Cloudflare بيفتح اتصال تاني لسيرفرك حسب الـ mode.

Flexible: من Cloudflare لسيرفرك HTTP على 80. لو Nginx عندك بيعمل redirect لـ HTTPS: Cloudflare يطلب HTTP، ياخد redirect، يبعته للزائر، الزائر يطلب HTTPS من Cloudflare، و Cloudflare يطلب HTTP تاني... دايرة.

Full: HTTPS لسيرفرك بس بيقبل أي شهادة (حتى self-signed أو منتهية). Full (strict): لازم الشهادة سليمة وتطابق الاسم: Let's Encrypt (تاب VPS) أو Cloudflare Origin CA (شهادة مجانية لحد ١٥ سنة، و Cloudflare بس اللي بيثق فيها).

IP سيرفرك ممكن يتسرّب برضه: سجل رمادي قديم على نفس السيرفر (زي [[mail]] أو [[ftp]])، أو الإيميلات اللي السيرفر بيبعتها، أو مواقع بتحفظ تاريخ الـ DNS. عشان كده في الآخر اقفل 80 و 443 على السيرفر إلا من IPs بتاعة Cloudflare (الـ loop في المثال)، أو استخدم Cloudflare Tunnel ومتفتحش أي بورت خالص (تاب Node: cloudflared).

ولما السيرفر يبقى ورا Cloudflare، الـ IP اللي Nginx شايفه هو IP بتاع Cloudflare، ولازم [[CF-Connecting-IP]]: التفاصيل في تاب Nginx «IP الزائر ورا Cloudflare».`,
            when: "أي موقع على VPS بدومين: البرتقاني مع Full (strict) هما الإعداد الافتراضي المعقول.",
            mistakes: "Flexible عشان «مفيش شهادة على السيرفر» وبعدين redirect loop. وسجل برتقاني لحاجة مش HTTP (SSH أو Postgres أو SMTP)؛ الـ proxy العادي بيعدّي بورتات HTTP و HTTPS محددة بس. وتقفل ufw على IPs بتاعة Cloudflare وتنسى إن Docker بيفتح البورتات بعيد عن ufw."
          },
          lines: [
            "لو برتقاني، هيرجّع IPs بتاعة Cloudflare مش سيرفرك.",
            "الهيدرز: server: cloudflare و cf-ray معناها الطلب عدّى على Cloudflare.",
            "كلّم سيرفرك مباشرة واطبع الشهادة: مين أصدرها وبتخلص إمتى (لازم سليمة عشان strict).",
            "تابع الـ redirects: لو لفّت ٥ مرات، عندك loop.",
            "اسمح لـ 80 و 443 من IPs بتاعة Cloudflare بس (واقفل الباقي بعدها)."
          ],
          sol: R`مع السحابة البرتقاني، [[dig +short myapp.example.com]] بيرجّع IPs بتاعة Cloudflare (غالبًا بتبدأ بـ [[104.21.]] أو [[172.67.]])، مش IP سيرفرك. و [[curl -sI]] بيرجّع [[server: cloudflare]] و [[cf-ray: ...-CAI]] مثلًا (آخر ٣ حروف هي الـ data center اللي رد، و CAI يعني القاهرة) و [[cf-cache-status: DYNAMIC]] للـ HTML.

أمر openssl على IP السيرفر مباشرة المفروض يطبع [[subject=CN=myapp.example.com]] و [[issuer=C=US, O=Let's Encrypt, CN=...]] وتاريخ [[notAfter]] في المستقبل. لو ده سليم، Full (strict) يشتغل والموقع يفتح عادي. وأمر [[curl -sIL http://...]] المفروض يوري [[301]] لـ https وبعدين [[200]].

أخطاء شائعة: بعد Full (strict) الموقع يطلع Error 526 (Invalid SSL certificate)، وده لأن الشهادة على السيرفر self-signed أو منتهية أو اسمها مختلف. و [[ERR_TOO_MANY_REDIRECTS]] بيحصل لو الـ mode لسه Flexible والسيرفر بيحوّل HTTP لـ HTTPS، فالطلب يلف ما بينهم. و 521 أو 522 يعني Cloudflare مش واصل للسيرفر، غالبًا الفايروول بيقفل IPs بتاعة Cloudflare.`
        },
        {
          cmd: "Cloudflare cache و WAF",
          title: "كاش وحماية قبل ما الطلب يوصل سيرفرك",
          desc: R`Cloudflare افتراضي بيكاش الملفات الثابتة حسب الامتداد (صور و JS و CSS) ومش بيكاش HTML ولا JSON، و [[cf-cache-status]] بيقولك [[HIT]] أو [[MISS]] أو [[DYNAMIC]] (مش بيتكاش أصلًا) أو [[BYPASS]].

Cache Rules بتغيّر ده لمسارات معينة (كاش صفحات المدونة ساعة، و bypass لـ [[/api]] و [[/admin]]). و WAF بيوقف الطلبات الوحشة قبل ما توصل: قواعد جاهزة (managed)، وقواعد انت بتكتبها، و rate limiting.`,
          example: R`curl -sI https://myapp.example.com/assets/app.js | grep -i cf-cache-status
curl -sI https://myapp.example.com/api/me | grep -i cf-cache-status
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" \
  --data '{"files":["https://myapp.example.com/index.html"]}'`,
          try: R`اعمل Cache Rule: لو المسار بيبدأ بـ [[/blog/]] يبقى Eligible for cache و Edge TTL ساعة، وشوف [[cf-cache-status]] يتحول من DYNAMIC لـ HIT. واعمل WAF custom rule بـ Block على [[(http.request.uri.path contains "/wp-login.php")]] وجرّبها بـ curl.`,
          deep: {
            why: "البوتات بتضرب [[/wp-login.php]] و [[/.env]] على أي موقع حتى لو مش WordPress. وموجة ترافيك من إعلان ممكن توقّع سيرفر ١ جيجا. لو Cloudflare وقفهم أو رد من الكاش، سيرفرك مش هيحس.",
            how: R`قرار الكاش الافتراضي بالامتداد مش بالنوع: [[.js]] و [[.css]] و [[.png]] وغيرهم بيتكاشوا، و [[/]] و [[/about]] (HTML) لأ. ومدة الكاش في الـ edge بتحترم [[Cache-Control]] من سيرفرك لو موجود.

Cache Rules (بدل Page Rules القديمة): شرط (المسار، الدومين، الكوكيز) وإجراء: Eligible for cache أو Bypass، و Edge TTL، و Browser TTL. خلي بالك من الصفحات اللي فيها بيانات يوزر: لو كاشتها، يوزر يشوف صفحة يوزر تاني. القاعدة: bypass لو فيه كوكي session.

Purge: من الداشبورد أو الـ API. [[files]] لملفات بعينها، أو [[purge_everything]] للكل (هيضرب سيرفرك لحد ما الكاش يتملى تاني). والـ token يبقى API token بصلاحية Cache Purge على الـ zone دي بس، مش الـ Global API Key.

WAF: الخطة المجانية فيها Free Managed Ruleset للثغرات المشهورة. و custom rules بلغة زي [[(http.request.uri.path contains "/.env")]] بإجراء Block أو Managed Challenge. و rate limiting rule على [[/api/login]] (مثلًا ١٠ طلبات في الدقيقة لكل IP). وفيه Bot Fight Mode و Under Attack Mode للطوارئ.

وأي حاجة Cloudflare مش بيكاشها بتعدّي لسيرفرك عادي، فالكاش مش بديل عن إن التطبيق نفسه يبقى سريع.`,
            when: "أي موقع ورا Cloudflare: bypass للـ API والأدمن، وكاش للملفات الثابتة، وقاعدتين WAF للمسارات اللي البوتات بتحبها، و rate limit على login.",
            mistakes: "[[Cache Everything]] على الدومين كله فيوزر يشوف لوحة تحكم يوزر تاني. و purge everything مع كل deploy. و Global API Key في سكربت الـ CI بدل token محدود. وتعتمد على Cloudflare يحمي الـ login وانت مش عامل rate limiting في التطبيق نفسه."
          },
          lines: [
            "ملف ثابت: المفروض HIT بعد أول طلب.",
            "API: المفروض DYNAMIC (مش بيتكاش).",
            "امسح ملف معين من كاش Cloudflare بالـ API.",
            "token محدود بصلاحية purge، والـ body JSON.",
            "الملفات اللي عايز تمسحها."
          ],
          sol: R`قبل الـ Cache Rule: ملف [[app.js]] يرجّع [[cf-cache-status: HIT]] (بعد أول طلب MISS)، لأن Cloudflare بيكاش امتدادات static افتراضيًا، و [[/api/me]] يرجّع [[DYNAMIC]] (مش متكاش أصلًا). وصفحة [[/blog/post-1]] برضه [[DYNAMIC]] لأنها HTML. بعد الـ rule: أول طلب [[MISS]]، والتاني [[HIT]]، ولو الـ origin بعت [[Cache-Control: private]] أو [[Set-Cookie]] ممكن تلاقيها [[BYPASS]] أو [[DYNAMIC]] حسب إعدادات الـ rule.

الـ WAF: [[curl -sI https://myapp.example.com/wp-login.php]] يرجّع [[HTTP/2 403]] ومعاه [[cf-ray]]، والـ body صفحة Cloudflare فيها «Sorry, you have been blocked». وفي Security Events هتلاقي الطلب ده باسم الـ rule. والـ purge API يرجّع [[{"success":true,"errors":[],"messages":[],"result":{"id":"..."}}]].

الغلطة الشائعة: تعمل الـ Cache Rule على [[/blog/]] وصفحات فيها حاجة لليوزر المسجّل (زي اسمه في الـ header)، فيوزر يشوف اسم يوزر تاني. ولو [[cf-cache-status]] فضل [[DYNAMIC]] بعد الـ rule، يبقى الـ rule مش بيطابق (راجع الـ expression) أو السحابة رمادي (DNS only) فمفيش Cloudflare في النص أصلًا.`,
          solCode: R`# Cache Rule expression:
starts_with(http.request.uri.path, "/blog/")
# WAF custom rule expression (Action: Block):
(http.request.uri.path contains "/wp-login.php")
# التجربة:
curl -sI https://myapp.example.com/blog/post-1 | grep -i cf-cache-status
curl -sI https://myapp.example.com/blog/post-1 | grep -i cf-cache-status
curl -s -o /dev/null -w "%{http_code}\n" https://myapp.example.com/wp-login.php`
        }
      ]
    },
    {
      t: "Cloudflare للمطوّر: Pages و R2 و Workers و Tunnel",
      l: 2,
      n: "موقع Vite على الـ edge، وتخزين زي S3 من غير رسوم خروج، وكود صغير قبل سيرفرك، ومدخل للإنتاج من غير ما تفتح بورت",
      items: [
        {
          cmd: "Cloudflare Pages",
          title: "موقع Vite على Cloudflare: من git ولا من الترمنال",
          desc: R`موقع Vite أو React بعد [[npm run build]] مجرد فولدر [[dist]] فيه HTML و JS و CSS، و Cloudflare بيخدمه من الـ CDN بتاعه في كل مكان، والطلبات على الملفات الثابتة مجانية.

فيه طريقتين: Cloudflare Pages (تربط الريبو، وكل push يعمل build، وكل branch ليه preview URL، أو ترفع [[dist]] بـ [[wrangler pages deploy]])، أو Workers static assets (ملف [[wrangler.jsonc]] فيه [[assets]] وبعدين [[wrangler deploy]]). Cloudflare بقى بيقول إن المشاريع الجديدة تبدأ على Workers، و Pages لسه شغال ومدعوم للمشاريع الموجودة، والاتنين بيدّوك نفس النتيجة لموقع static.

ولو الموقع SPA فيه routing (React Router)، لازم تقول لـ Cloudflare «أي مسار مش ملف رجّع index.html»، وإلا [[/dashboard]] يطلع 404 لما حد يعمل refresh.`,
          example: R`npm create vite@latest my-site -- --template react-ts
cd my-site && npm i && npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name my-site --branch main
npx wrangler pages deploy dist --project-name my-site --branch feature-x
# أو Workers static assets: wrangler.jsonc زي الـ sol، وبعدين
npx wrangler deploy`,
          try: R`اعمل موقع Vite فيه React Router بصفحتين ([[/]] و [[/about]]). انشره بطريقة من الاتنين، وافتح [[/about]] مباشرة (مش من لينك جوه الموقع) واعمل refresh. لو طلع 404 صلّحه. وبعدين اربط دومين فرعي من الداشبورد ([[www.example.com]]).`,
          deep: {
            why: "موقع static على VPS معناه Nginx وشهادة وسيرفر لازم يفضل شغال، عشان حاجة ممكن تتخدم من CDN ببلاش تقريبًا. Cloudflare (زي Vercel و Netlify) بيخدمه من أقرب مكان لليوزر، مع HTTPS و preview لكل branch، وده مناسب جدًا لـ landing page أو dashboard بيكلّم API منفصل.",
            how: R`Pages من git: في الداشبورد Workers & Pages ثم Create، وتختار الريبو، و build command [[npm run build]]، و output directory [[dist]]. الـ branch الأساسي production، وأي branch تاني preview على [[BRANCH.my-site.pages.dev]].

Pages من الترمنال (Direct Upload): [[wrangler pages deploy dist]] بيرفع الفولدر كما هو. [[--branch main]] (أو الـ production branch بتاع المشروع) = production، وأي اسم تاني = preview. مفيد لو الـ build بيحصل في GitHub Actions.

Workers static assets: ملف [[wrangler.jsonc]] فيه [[name]] و [[compatibility_date]] و [[assets.directory = "./dist"]]. وتقدر تضيف [[main]] (Worker بكود) فيبقى عندك API و frontend في deploy واحد (درس [[Workers]]). وفي نسخ wrangler الجديدة، ممكن [[pages deploy]] لمشروع جديد يقترح عليك تروح Workers.

الـ SPA fallback: في Workers بتكتب [[not_found_handling: "single-page-application"]]. في Pages، لو مفيش [[404.html]] في الـ output، Pages بيعامل المشروع كـ SPA ويرجّع [[index.html]] للمسارات المش موجودة. والـ redirects والـ headers في ملفات [[_redirects]] و [[_headers]] جوه [[public/]].

متغيرات البيئة: Vite بيكتب [[import.meta.env.VITE_*]] جوه الـ JS وقت الـ build، فهي مش سر، وأي حاجة سرية تروح للـ API مش للـ frontend.`,
            when: "أي frontend static أو SPA: portfolio، landing، dashboard بيكلّم API على دومين تاني. لو محتاج SSR لـ Next.js بكل مميزاته، Vercel أو سيرفر Node أسهل (تاب Next.js).",
            mistakes: R`SPA من غير fallback فكل refresh على صفحة داخلية يطلع 404. وتحط مفتاح API سري في [[VITE_API_KEY]] فيطلع في الـ JS لأي حد. وتنسى إن الـ output directory لـ Vite هو [[dist]] مش [[build]] (ده CRA القديم). وتربط الدومين الرئيسي بـ CNAME وهو مش على Cloudflare DNS.`
          },
          lines: [
            "مشروع Vite جديد بـ React و TypeScript.",
            "سطّب وابني: الناتج في dist.",
            "اربط wrangler بحسابك (بيفتح المتصفح).",
            "ارفع dist كـ production على Pages (أول مرة بيعمل المشروع).",
            "نفس الفولدر كـ preview لـ branch تانية (URL لوحده).",
            "أو انشر كـ Worker بـ static assets حسب wrangler.jsonc."
          ],
          sol: R`بعد [[pages deploy]] هتاخد URL زي [[https://my-site.pages.dev]] (أو URL فيه hash لكل deploy)، وللـ preview [[https://feature-x.my-site.pages.dev]]. ولو استخدمت Workers هتاخد [[https://my-site.YOUR-SUBDOMAIN.workers.dev]].

اختبار الـ refresh: [[curl -I https://my-site.pages.dev/about]] المفروض يرجّع 200 ومحتواه هو [[index.html]]. لو رجّع 404، يبقى فيه [[404.html]] في [[dist]] (فـ Pages مبقاش يعتبره SPA)، أو في Workers ناقصك [[not_found_handling]].

الغلطة الشائعة التانية: الصفحة بيضا والـ console فيه 404 على [[/assets/index-abc.js]]، وده لأنك غيّرت [[base]] في [[vite.config.ts]] أو رفعت فولدر غير [[dist]].`,
          solCode: R`// wrangler.jsonc لطريقة Workers static assets
{
  "name": "my-site",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}`
        },
        {
          cmd: "R2",
          title: "R2: تخزين زي S3 بنفس الكود ومن غير رسوم خروج",
          desc: R`R2 تخزين ملفات (object storage) من Cloudflare بيتكلم نفس API بتاع S3، فبتستخدم [[@aws-sdk/client-s3]] زي ما هو، وبتغيّر 3 حاجات بس: الـ [[endpoint]] بقى [[https://ACCOUNT_ID.r2.cloudflarestorage.com]]، والـ [[region]] بقى [[auto]]، والمفاتيح من R2 API token.

الفرق الكبير في الفلوس: مفيش رسوم على الداتا اللي بتخرج (egress). في S3 كل جيجا بتنزل لليوزر بتتحاسب، وده ممكن يبقى أكبر بند في الفاتورة لموقع صور أو فيديو. وقت كتابة الدرس فيه free tier شهري (حوالي ١٠ جيجا تخزين وملايين من العمليات)، وبعدها بتدفع على التخزين والعمليات بس. راجع صفحة الأسعار.`,
          example: R`import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: "https://" + process.env.R2_ACCOUNT_ID + ".r2.cloudflarestorage.com",
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  requestChecksumCalculation: "WHEN_REQUIRED",
});

const put = new PutObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp", ContentType: "image/webp" });
const uploadUrl = await getSignedUrl(r2, put, { expiresIn: 300 });
const get = new GetObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp" });
const downloadUrl = await getSignedUrl(r2, get, { expiresIn: 3600 });
console.log(uploadUrl.split("?")[0]);
console.log(new URL(downloadUrl).searchParams.get("X-Amz-Expires"));`,
          try: R`من غير حساب حتى: سطّب [[@aws-sdk/client-s3]] و [[@aws-sdk/s3-request-presigner]] في فولدر تجربة، وشغّل الملف بمتغيرات وهمية ([[R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef]] وأي مفاتيح). التوقيع بيتحسب على جهازك فمش محتاج نت. وبعدين لو عندك حساب: اعمل bucket و R2 API token بصلاحية Object Read & Write على الـ bucket ده بس، وارفع ملف فعلًا بـ [[curl -X PUT --upload-file]] على الـ uploadUrl.`,
          flag: "script",
          deep: {
            why: "ملفات المستخدمين مكانها object storage مش ديسك السيرفر (عشان تقدر تكبّر وتنقل). و S3 هو المعيار، بس رسوم الخروج بتفاجئ الناس: موقع بيعرض صور كتير ممكن يدفع على الترافيك أكتر من التخزين. R2 بيشيل البند ده، ولأنه بيتكلم S3 API، النقل منه وإليه تغيير إعدادات مش إعادة كتابة.",
            how: R`الكود هو هو اللي في درس [[presigned URL]]: السيرفر بيعمل رابط موقّع مؤقت، والمتصفح بيرفع عليه مباشرة بـ PUT، فالملف مبيعديش على سيرفرك. [[getSignedUrl]] بيحسب التوقيع محليًا بالمفتاح السري، ومبيكلّمش R2 خالص.

المفاتيح: من R2 في الداشبورد، Manage API tokens، واعمل token بصلاحية على bucket معين. هيدّيك Access Key ID و Secret Access Key (دول اللي بيدخلوا الـ SDK). والـ Account ID موجود في الداشبورد.

العرض للناس: الـ bucket خاص افتراضيًا. يا إما presigned GET زي المثال (لملفات خاصة)، يا إما تربط custom domain بالـ bucket ([[files.example.com]]) فيبقى public ومعاه كاش Cloudflare، ودي أحسن للصور العامة. وفيه [[r2.dev]] URL للتجربة بس (عليه rate limit ومفيش كاش).

الـ CORS: المتصفح بيرفع على دومين R2 مش دومينك، فلازم CORS policy على الـ bucket تسمح بـ [[PUT]] من [[https://myapp.example.com]] وبالـ header [[Content-Type]].

من جوه Worker مش محتاج SDK: بتعمل binding للـ bucket وتستخدم [[env.BUCKET.put()]] و [[env.BUCKET.get()]] (درس [[Workers]]).

فرق عن S3: مفيش regions بالمعنى ده (فيه location hint)، وبعض مميزات S3 مش موجودة أو مختلفة (زي بعض إعدادات الـ ACL والـ events). و [[requestChecksumCalculation: "WHEN_REQUIRED"]] في المثال مهمة: نسخ SDK v3 الجديدة بتحسب checksum افتراضيًا، وفي الـ presigned PUT بتحط في الرابط [[x-amz-checksum-crc32]] محسوب على body فاضي (قيمته [[AAAAAA==]])، فأي ملف حقيقي يترفع عليه يترفض لأن الـ checksum مش مطابق.`,
            when: "صور ومرفقات المستخدمين، والباك أب (Coolify و Dokploy بيدعموه كـ S3)، وأي ملفات بتتنزل كتير. S3 يفضل أحسن لو كل حاجة تانية على AWS ومحتاج events لـ Lambda وصلاحيات IAM.",
            mistakes: R`endpoint غلط (بتحط bucket في الـ host بإيدك أو تنسى الـ Account ID)، أو [[region: "us-east-1"]] بدل [[auto]]. و token بصلاحية على كل الـ buckets. ومفاتيح R2 في كود الـ frontend بدل presigned URL. وتستخدم [[r2.dev]] في الإنتاج. وتنسى الـ CORS فالرفع من المتصفح يفشل برسالة CORS مع إن الـ URL سليم.`
          },
          lines: [
            "الـ client والأوامر من AWS SDK زي S3 بالظبط.",
            "دالة الروابط الموقّعة.",
            "client جديد لـ R2.",
            "R2 مفيهوش regions، فـ auto.",
            "الـ endpoint بتاع حسابك على R2.",
            "مفاتيح R2 API token من متغيرات البيئة.",
            "من غيرها SDK v3 بيحط [[x-amz-checksum-crc32]] لجسم فاضي في رابط الـ PUT، فالرفع بملف حقيقي يفشل. كده الـ checksum بيتحسب بس لما العملية تطلبه.",
            "قفلة.",
            "أمر رفع لمسار معين بنوع ملف معين.",
            "رابط رفع صالح ٥ دقايق.",
            "أمر تنزيل لنفس الملف.",
            "رابط تنزيل صالح ساعة.",
            "اطبع الرابط من غير التوقيع.",
            "اطبع مدة صلاحية رابط التنزيل من الـ query."
          ],
          sol: R`بالمتغيرات الوهمية الناتج:

[[https://myapp-uploads.0123456789abcdef0123456789abcdef.r2.cloudflarestorage.com/avatars/42.webp]]
[[3600]]

لاحظ إن الـ SDK حط اسم الـ bucket في أول الـ host لوحده (virtual-hosted style)، ومفيش أي طلب اتبعت لـ R2: التوقيع اتحسب على جهازك، فحتى مفاتيح غلط بتطلّع رابط، بس الرفع عليه هيرجّع 403 [[SignatureDoesNotMatch]] أو [[InvalidAccessKeyId]].

مع حساب حقيقي: [[curl -X PUT -H "Content-Type: image/webp" --upload-file a.webp "UPLOAD_URL"]] يرجّع 200، والملف يظهر في الـ bucket. لو رجّع 403 [[SignatureDoesNotMatch]] مع مفاتيح صح، غالبًا الـ Content-Type اللي بعته مختلف عن اللي في [[PutObjectCommand]]، لأنه جزء من التوقيع.`,
          solCode: R`npm init -y && npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef R2_ACCESS_KEY_ID=test R2_SECRET_ACCESS_KEY=test node r2.mjs
curl -X PUT -H "Content-Type: image/webp" --upload-file avatar.webp "UPLOAD_URL_FROM_THE_SCRIPT"`
        },
        {
          cmd: "Workers",
          title: "Workers: كود صغير بيرد من أقرب مكان لليوزر",
          desc: R`Worker دالة JavaScript بتاخد [[Request]] وترجّع [[Response]] (نفس Web APIs اللي في المتصفح و Node 18+)، وبتشتغل على سيرفرات Cloudflare في كل مكان، من غير cold start تقريبًا لأنها isolates مش containers.

الـ [[env]] فيه المتغيرات والأسرار والـ bindings: bucket R2، أو KV، أو قاعدة D1، أو Durable Objects. والـ binding معناه إن الـ Worker بيكلّم الخدمة من غير مفاتيح ولا SDK.

وقت كتابة الدرس الخطة المجانية فيها حد يومي للطلبات (حوالي ١٠٠ ألف) ووقت CPU قليل لكل طلب، والخطة المدفوعة بتبدأ بـ ٥ دولار في الشهر. راجع الأرقام قبل ما تعتمد عليها.`,
          example: R`export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/hello") {
      const country = request.cf?.country ?? "unknown";
      return Response.json({ hello: env.GREETING, country });
    }
    if (url.pathname.startsWith("/files/")) {
      const obj = await env.BUCKET.get(url.pathname.slice(7));
      if (!obj) return new Response("not found", { status: 404 });
      return new Response(obj.body, { headers: { "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream" } });
    }
    return new Response("not found", { status: 404 });
  },
};`,
          try: R`من غير حساب: احفظ الـ Worker في [[worker.mjs]]، واعمل [[test.mjs]] بيعمل import ليه وبينادي [[worker.fetch(new Request(...), env, {})]] بـ env وهمي فيه [[GREETING]] و [[BUCKET]] بدالة [[get]] بترجّع object لمفتاح واحد بس. جرّب ٤ مسارات. وبعدين بحساب: [[npm create cloudflare@latest]]، و [[npx wrangler dev]]، و [[npx wrangler deploy]].`,
          flag: "script",
          deep: {
            why: "حاجات كتير صغيرة مش محتاجة سيرفر: redirect حسب البلد، أو API صغير بيقرا من R2 أو KV، أو webhook receiver، أو حماية endpoint بتوكن قبل ما يوصل سيرفرك. Worker بيعمل ده قريب من اليوزر، وتقريبًا ببلاش لحجم صغير، ومن غير سيرفر تحدّثه.",
            how: R`الـ Worker ES module بيعمل [[export default]] لـ object فيه [[fetch]]. Cloudflare بيناديها مع كل طلب بـ ٣ حاجات: [[request]] (Request عادي ومعاه [[request.cf]] فيه البلد والمدينة وغيرهم)، و [[env]]، و [[ctx]] ([[ctx.waitUntil(promise)]] تكمّل شغل بعد ما الرد يتبعت، زي لوج أو analytics).

الـ runtime مش Node: مفيش [[fs]] ولا process طويل، والكود بيشتغل لكل طلب لوحده وبحد CPU. وفيه [[nodejs_compat]] flag بيدّيك جزء كبير من Node APIs (زي [[Buffer]] و [[crypto]])، بس مش كل المكتبات بتشتغل.

الإعداد في [[wrangler.jsonc]]: [[main]] (ملف الكود)، و [[vars]] (متغيرات عادية)، و [[r2_buckets]] بـ [[binding: "BUCKET"]] و [[bucket_name]]، والأسرار بـ [[wrangler secret put NAME]] مش في الملف.

[[wrangler dev]] بيشغّل الـ Worker على جهازك بـ workerd (نفس الـ runtime) وبـ R2 و KV محليين. و [[wrangler deploy]] بينشره على [[NAME.SUBDOMAIN.workers.dev]] أو على route في دومينك. و [[wrangler tail]] لايف لوجات.

ولأنه Request و Response عاديين، تقدر تختبر الـ handler في Node مباشرة زي التجربة، أو بـ Vitest ومعاه pool خاص بـ Workers.`,
            when: "منطق خفيف قريب من اليوزر، و APIs صغيرة على R2 أو KV أو D1، وتحويلات على الطلب قبل سيرفرك، والـ webhooks. مش مكان شغل تقيل على CPU، ولا مكتبات Node بتعتمد على الديسك أو native modules.",
            mistakes: R`تفتكر إن الـ Worker Node فتعمل [[import fs]] أو تحط connection pool لـ Postgres في متغير global وتتوقع إنه يعيش (للقواعد فيه Hyperdrive). وتحط أسرار في [[vars]] جوه [[wrangler.jsonc]] اللي على GitHub. وتنسى [[await]] لشغل مش مهم بدل [[ctx.waitUntil]] فالرد يستنى. وتقرا [[obj.body]] مرتين (stream بيتقري مرة واحدة).`
          },
          lines: [
            "الـ Worker بيصدّر object فيه دوال الأحداث.",
            "fetch: بتتنادى مع كل طلب HTTP.",
            "اقرا المسار من الـ URL.",
            "مسار API صغير.",
            "البلد من بيانات Cloudflare (مش موجودة في الاختبار المحلي).",
            "رد JSON فيه متغير من env.",
            "قفلة.",
            "مسار ملفات من R2.",
            "هات الملف من الـ bucket عن طريق الـ binding بالمفتاح اللي بعد /files/.",
            "مش موجود: 404.",
            "رجّع الملف stream بنوعه المتخزن.",
            "قفلة.",
            "أي مسار تاني: 404.",
            "قفلة fetch.",
            "قفلة الـ object."
          ],
          sol: R`بـ env وهمي فيه [[GREETING: "ahlan"]] و bucket بيرجّع ملف لـ [[a.txt]] بس، الناتج:

[[/api/hello 200 application/json {"hello":"ahlan","country":"unknown"}]]
[[/files/a.txt 200 text/plain hi from r2]]
[[/files/b.txt 404 text/plain;charset=UTF-8 not found]]
[[/x 404 text/plain;charset=UTF-8 not found]]

[[country]] بـ [[unknown]] لأن [[request.cf]] مش موجود برا Cloudflare. بعد [[wrangler deploy]] هتلاقي البلد الحقيقية (زي [[EG]]).

الغلطة الشائعة: [[TypeError: Cannot read properties of undefined (reading 'get')]]، وده لأن [[env.BUCKET]] مش موجود: اسم الـ binding في [[wrangler.jsonc]] مختلف عن اللي في الكود، أو نسيت تعدّي env في الاختبار.`,
          solCode: R`// test.mjs
import worker from "./worker.mjs";
const env = {
  GREETING: "ahlan",
  BUCKET: { get: async (k) => (k === "a.txt" ? { body: "hi from r2", httpMetadata: { contentType: "text/plain" } } : null) },
};
for (const p of ["/api/hello", "/files/a.txt", "/files/b.txt", "/x"]) {
  const r = await worker.fetch(new Request("https://myapp.example.workers.dev" + p), env, {});
  console.log(p, r.status, r.headers.get("content-type"), await r.text());
}`
        },
        {
          cmd: "Cloudflare Tunnel",
          title: "السيرفر في الإنتاج من غير ولا بورت مفتوح",
          desc: R`Cloudflare Tunnel بيقلب الاتجاه: بدل ما الناس توصل لسيرفرك على 80 و 443، برنامج [[cloudflared]] على السيرفر بيفتح اتصال طالع لـ Cloudflare، والطلبات بترجع عليه. فالفايروول يقفل كل البورتات الداخلة (إلا SSH، أو حتى SSH كمان)، و IP السيرفر مبيبقاش له لازمة للزائر.

للتجربة على جهازك فيه درس [[cloudflared]] في «تاب Node». هنا نسخة الإنتاج: tunnel بيتدار من الداشبورد بـ token، و [[cloudflared]] شغال كـ service أو container، وكل hostname بيروح لخدمة داخلية.`,
          example: R`# ~/.cloudflared/config.yml (لو بتدير الـ tunnel من ملف مش من الداشبورد)
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /etc/cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
ingress:
  - hostname: api.example.com
    service: http://localhost:3000
  - hostname: app.example.com
    service: http://localhost:8080
  - service: http_status:404`,
          try: R`على VPS فيه API شغال على [[localhost:3000]]: من الداشبورد (Zero Trust ثم Networks ثم Tunnels) اعمل tunnel، وخد أمر التسطيب بالـ token وشغّله على السيرفر ([[sudo cloudflared service install TOKEN]]). ضيف Public hostname [[api.example.com]] على [[http://localhost:3000]]. بعدين اقفل 80 و 443 في ufw، واتأكد إن الموقع لسه شغال من برا، وإن [[curl http://SERVER_IP]] ما بيردش.`,
          flag: "script",
          deep: {
            why: "كل بورت مفتوح باب بيتفحص طول اليوم. ولما السيرفر ورا Cloudflare proxy عادي، لسه ممكن حد يلاقي الـ IP ويضربه مباشرة ويعدّي WAF و rate limiting (درس [[Cloudflare proxy و SSL]]). مع Tunnel مفيش باب أصلًا. وكمان بيحل مشكلة سيرفر في البيت أو ورا NAT من غير IP ثابت.",
            how: R`[[cloudflared]] بيفتح كذا اتصال طالع (outbound) لأقرب data centers بتوع Cloudflare. الزائر بيطلب [[api.example.com]]، الـ DNS بيشاور على [[TUNNEL_ID.cfargotunnel.com]] (CNAME برتقاني)، و Cloudflare بيبعت الطلب في الـ tunnel، و [[cloudflared]] بيوصّله لـ [[localhost:3000]].

طريقتين للإدارة: remotely-managed (من الداشبورد، والسيرفر عليه token بس، وده الأسهل والمنصوح بيه) أو locally-managed (ملف [[config.yml]] زي المثال، وملف credentials JSON من [[cloudflared tunnel create]]).

الـ [[ingress]] بيتقري من فوق لتحت، وأول قاعدة hostname بتطابق بتكسب، والقاعدة الأخيرة لازم تبقى catch-all من غير hostname (هنا 404)، وإلا [[cloudflared]] يرفض يشتغل. وتقدر تتحقق بـ [[cloudflared tunnel ingress validate]].

التشغيل الدايم: [[cloudflared service install]] بيعمل systemd service. أو في Docker Compose: container [[cloudflare/cloudflared]] بأمر [[tunnel run]] ومتغير [[TUNNEL_TOKEN]]، وعلى نفس الشبكة فالـ service يبقى [[http://api:3000]] (اسم الـ container)، ومتعملش [[ports:]] للـ API خالص.

ومع Cloudflare Access تحط تسجيل دخول (Google أو إيميل OTP) قبل hostname زي [[admin.example.com]] أو لوحة Coolify، فمحدش يوصل للصفحة أصلًا من غير ما يثبت هو مين.`,
            when: "أي سيرفر إنتاج صغير ورا Cloudflare، ولوحات التحكم الداخلية (Grafana و Coolify و pgAdmin)، والسيرفرات اللي ورا NAT. مش مناسب لو الترافيك مش HTTP (زي UDP لألعاب) من غير إعدادات إضافية.",
            mistakes: R`تعمل الـ tunnel وتسيب 80 و 443 مفتوحين، فالفايدة الأمنية راحت. وتنسى الـ catch-all في [[ingress]]. و [[ports: "3000:3000"]] في compose فالـ API مفتوح على الـ IP برضه. وتحط [[localhost]] في الـ service والـ cloudflared جوه container (الـ localhost بتاعه هو الـ container نفسه). وتحط الـ token في ملف على GitHub: الـ token ده يقدر يشغّل الـ tunnel من أي جهاز.`
          },
          lines: [
            "رقم الـ tunnel (من cloudflared tunnel create).",
            "ملف المفاتيح بتاعه.",
            "قواعد التوجيه، بالترتيب.",
            "الطلبات على api.example.com...",
            "...تروح للـ API على البورت ٣٠٠٠ محليًا.",
            "والـ frontend على دومين تاني...",
            "...على ٨٠٨٠.",
            "أي حاجة تانية: 404 (لازم تبقى آخر قاعدة)."
          ],
          sol: R`بعد التسطيب، [[systemctl status cloudflared]] يقول [[active (running)]]، والداشبورد يوري الـ tunnel بحالة [[HEALTHY]]. و [[dig +short api.example.com]] يرجّع IPs بتاعة Cloudflare، و [[curl -sI https://api.example.com/healthz]] يرجّع 200 ومعاه [[cf-ray]].

بعد [[sudo ufw delete allow 80/tcp]] و [[sudo ufw delete allow 443/tcp]]: الموقع لسه شغال من برا (لأن الاتصال طالع من السيرفر)، و [[curl -m 5 http://SERVER_IP]] يعمل timeout.

الغلطات الشائعة: [[502 Bad Gateway]] من Cloudflare، ولوج [[cloudflared]] فيه [[connection refused]]، وده لأن الـ API مش شغال أو بيسمع على بورت تاني أو cloudflared في container وانت كاتب localhost. أو [[1033]] (Argo Tunnel error)، وده معناه إن مفيش [[cloudflared]] متصل بالـ tunnel ده دلوقتي.`,
          solCode: R`# docker-compose.yml: الـ API من غير أي ports، و cloudflared بيوصله بالاسم
services:
  api:
    build: .
    environment:
      - PORT=3000
  tunnel:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=$__{TUNNEL_TOKEN}
    restart: unless-stopped
# وفي الداشبورد: Public hostname api.example.com على http://api:3000`
        }
      ]
    },
    {
      t: "منصات جاهزة للفرق الصغيرة",
      l: 2,
      n: "push والموقع يطلع، وقاعدة بيانات من غير سيرفر، بس افهم الحدود قبل ما تتفاجئ",
      items: [
        {
          cmd: "vercel",
          title: "Next.js على منصة جاهزة: preview و env والحدود",
          desc: R`Vercel بيبني Next.js مع كل push: الـ branch الرئيسي production، وأي branch أو PR تاني preview بـ URL لوحده، والصفحات والـ API routes بتشتغل Functions والملفات الثابتة على الـ CDN.

متغيرات البيئة ليها ٣ بيئات (Production و Preview و Development)، وأي تغيير فيها بيتطبق على الـ deploy الجاي بس. ولازم تعرف الحدود: مدة الدالة (٥ دقايق افتراضي)، وجسم الطلب ٤.٥ ميجا، وخطة Hobby للاستخدام الشخصي غير التجاري بس.`,
          example: R`npm i -g vercel
vercel link
vercel env add DATABASE_URL production
vercel env pull .env.local
vercel
vercel --prod
vercel logs https://myapp-abc123.vercel.app`,
          try: "اربط مشروع Next.js من GitHub، واعمل branch فيه تعديل صغير وافتح PR: هتلاقي تعليق فيه URL الـ preview. غيّر متغير بيئة وافتح الـ preview القديم: لسه بالقيمة القديمة.",
          deep: {
            why: "لـ Next.js، Vercel أسهل طريقة: مفيش Dockerfile ولا Nginx ولا SSL. بس الناس بتتفاجئ: فاتورة Pro، أو رفع ملف ١٠ ميجا بيقع، أو كل query بطيئة، أو متغير جديد مش باين.",
            how: R`كل deploy نسخة ثابتة مستقلة بـ URL خاص، والدومين بيشاور على آخر production. عشان كده الـ rollback لحظي (Instant Rollback)، وعشان كده تغيير متغير بيئة مش بيأثر على deploy قديم: المتغيرات بتتقرا وقت الـ build (خصوصًا [[NEXT_PUBLIC_*]] اللي بتتكتب جوه الـ JS نفسه).

الـ preview بياخد متغيرات Preview، فخلّي فيها قاعدة بيانات تجربة مش الإنتاج. Neon مثلًا بيعمل branch من القاعدة لكل preview.

الـ Functions افتراضي بتشتغل في region واحدة في أمريكا ([[iad1]]). لو القاعدة في فرانكفورت، كل query بتعدّي الأطلنطي. غيّر region الدوال لأقرب واحدة للقاعدة ([[fra1]]) من إعدادات المشروع أو [[vercel.json]].

الحدود المهمة: مدة الدالة ٣٠٠ ثانية افتراضي (Pro يقدر يوصل ٨٠٠). جسم الطلب والرد ٤.٥ ميجا، فرفع الملفات يبقى presigned لـ S3 أو storage. مفيش ديسك دايم: أي ملف تكتبه بيروح. والـ WebSockets الطويلة والشغل الخلفي التقيل مش مكانهم.

Netlify نفس الفكرة تقريبًا: deploy previews، ومتغيرات بيئة لكل context، و [[netlify deploy --prod]].`,
            when: "Next.js أو frontend لفريق صغير عايز يركز على المنتج. وقارن السعر مع VPS لما الترافيك يكبر.",
            mistakes: "مشروع لعميل بيدفع على خطة Hobby. و preview متوصل بقاعدة الإنتاج فأي تجربة بتكتب في الداتا الحقيقية. وتنسى تغيّر region الدوال. وتحط سر في متغير بيبدأ بـ [[NEXT_PUBLIC_]] فيطلع في الـ JS لأي حد يفتح الموقع."
          },
          lines: [
            "سطّب الـ CLI.",
            "اربط الفولدر ده بمشروع على Vercel.",
            "ضيف متغير لبيئة الـ production (بيسألك عن القيمة).",
            "نزّل متغيرات Development لملف محلي.",
            "deploy كـ preview (URL لوحده).",
            "deploy للـ production.",
            "لوجات deploy معين."
          ],
          sol: R`بعد ربط الريبو وفتح الـ PR، Vercel bot بيكتب تعليق على الـ PR فيه جدول بالـ Status (Building ثم Ready) ولينك Preview زي [[https://myapp-git-feature-x-yourteam.vercel.app]]، وكل push جديد على الـ branch بيعمل preview جديد ويحدّث التعليق. والـ Checks في الـ PR فيها Vercel كـ check.

بعد ما تغيّر متغير بيئة للـ Preview من الداشبورد أو بـ [[vercel env]]، الـ preview القديم هيفضل بالقيمة القديمة. ده مقصود: كل deployment immutable، والمتغيرات بتتقري وقت الـ build (و [[NEXT_PUBLIC_*]] بتتكتب جوه الـ JS نفسه). عشان تاخد القيمة الجديدة لازم deployment جديد: push تاني أو Redeploy من الداشبورد.

الغلطة الشائعة: تغيّر المتغير في Production بس وتستغرب إن الـ preview مش شايفه (كل environment ليه قيم لوحده). أو تنسى تعمل [[vercel env pull]] تاني فالـ [[.env.local]] على جهازك بالقيمة القديمة. وتانية: [[vercel logs]] مبيعرضش لوجات قديمة كتير على الخطة المجانية، فلو مش لاقي خطأ امبارح، ده سبب محتمل.`
        },
        {
          cmd: "Supabase / Neon",
          title: "Postgres مُدار من غير AWS ومن غير سيرفر",
          desc: R`Supabase و Neon بيدّوك Postgres حقيقي بـ connection string وخطة مجانية، و Supabase معاه Auth و Storage و Realtime، و Neon قاعدة بس بتنام لما محدش يستخدمها وبتعمل branch من القاعدة في ثواني.

أهم حاجة تفهمها: فيه connection string مباشر (للـ migrations والسيرفرات الدايمة) وواحد عن طريق pooler (للـ serverless وأي حاجة بتفتح اتصالات كتير).`,
          example: R`DATABASE_URL="postgresql://postgres.abcdefghijklmnop:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.abcdefghijklmnop.supabase.co:5432/postgres"
NEON_POOLED_URL="postgresql://app:YOUR_PASSWORD@ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
NEON_DIRECT_URL="postgresql://app:YOUR_PASSWORD@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require"`,
          try: "افتح مشروع Supabase أو Neon مجاني في فرانكفورت، وخد الاتنين. شغّل migration بالمباشر، والتطبيق بالـ pooler. وشغّل [[SELECT count(*) FROM pg_stat_activity;]] وانت بتضرب الـ API بـ ٥٠ طلب، وقارن بين الطريقتين.",
          flag: "script",
          deep: {
            why: "لمشروع صغير أو MVP، RDS غالي ومعقد (VPC و security groups وباك أب). Supabase أو Neon بيدّوك قاعدة في دقيقة. بس لو مفهمتش الـ pooling، أول ضغط على دوال serverless هيخلّص الاتصالات والقاعدة تقفل الباب.",
            how: R`كل اتصال Postgres عملية على السيرفر بتاكل رام، والعدد محدود (عشرات في الخطط الصغيرة). سيرفر Node دايم بيفتح pool فيه ١٠ اتصالات ويعيد استخدامهم. لكن ١٠٠ دالة serverless في نفس اللحظة = ١٠٠ اتصال.

الـ pooler (Supavisor في Supabase، و PgBouncer في Neon) بيقف في النص: آلاف الاتصالات من ناحية التطبيق، وعدد قليل حقيقي للقاعدة. في transaction mode (Supabase بورت 6543، و Neon الهوست اللي فيه [[-pooler]]) الاتصال الحقيقي بيرجع للـ pool بعد كل transaction. والتمن: مفيش حاجة بتعيش بين transactions (named prepared statements و [[SET]] و [[LISTEN]])، فلو الـ ORM بيستخدم prepared statements لازم تقفلها.

الـ migrations محتاجة session كاملة، فتروح على المباشر. في Supabase المباشر ([[db.REF.supabase.co:5432]]) على IPv6 بس إلا لو دفعت add-on، ولو شبكتك IPv4 استخدم session mode على الـ pooler بورت 5432. وإعداد الاتنين مع Prisma في تاب «SQL و Prisma».

Neon: الـ compute بينام بعد ٥ دقايق من غير استخدام، وأول طلب بعدها بياخد جزء من الثانية زيادة. والـ branching بيعمل نسخة من القاعدة من غير ما ينسخ الداتا فعلًا (copy-on-write)، فتدّي كل preview قاعدته.

Supabase المجاني: المشروع بيتوقف (pause) لو مفيش نشاط أسبوع، ومفيش باك أب تلقائي تعتمد عليه. للإنتاج خطة مدفوعة أو باك أب بإيدك ([[pg_dump]]).`,
            when: "MVP، ومشاريع صغيرة ومتوسطة، ومع Vercel. انقل لـ RDS لما تحتاج VPC خاصة أو تحكم أكتر أو الحجم يكبر.",
            mistakes: "migrations على الـ pooler في transaction mode فتقع بأخطاء prepared statements أو locks غريبة. ومشروع إنتاج على الخطة المجانية لحد ما يتوقف في أجازة. واستخدام [[service_role]] key بتاع Supabase في كود الـ frontend: ده بيعدّي كل الـ RLS. والقاعدة في region والتطبيق في region تانية."
          },
          lines: [
            "Supabase عن طريق الـ pooler (بورت 6543، transaction mode): للتطبيق والدوال.",
            "Supabase مباشر (5432): للـ migrations.",
            "Neon عن طريق الـ pooler: الهوست فيه -pooler.",
            "Neon مباشر: نفس الهوست من غير -pooler، للـ migrations."
          ],
          sol: R`الأرقام بتفرق حسب الإعدادات، بس الشكل المتوقع: [[pg_stat_activity]] فيه أصلًا صفوف كتير من المنصة نفسها (خصوصًا Supabase: خدمات زي Auth و Realtime و PostgREST)، فقارن باتصالات يوزر التطبيق بس بالـ query اللي تحت. وانت بتضرب ٥٠ طلب: بالـ direct URL من تطبيق serverless، الرقم بيطلع مع عدد النسخ اللي اشتغلت (كل نسخة ليها pool لوحدها)، وممكن يوصل للحد وتاخد [[too many connections]] أو [[remaining connection slots are reserved]]. بالـ pooler، عدد اتصالات Postgres الحقيقية بيفضل صغير وثابت تقريبًا، لأن الـ pooler (Supavisor أو PgBouncer في Neon) بيوزّع الطلبات على عدد قليل من الاتصالات.

والـ migration بالمباشر: [[prisma migrate deploy]] المفروض يعدّي على [[DIRECT_URL]] (أو [[NEON_DIRECT_URL]]). لو شغّلته على الـ pooler في transaction mode ممكن يقف أو يفشل، لأن الـ migrations محتاجة session كاملة (locks و prepared statements).

الغلطة الأشهر: التطبيق بـ Prisma على بورت 6543 من غير [[?pgbouncer=true]]، فيطلع [[prepared statement "s0" already exists]] بشكل عشوائي تحت الضغط. وتانية: تحط الـ pooler URL في [[directUrl]] بالغلط فالـ migrate يفشل.`,
          solCode: R`SELECT usename, application_name, state, count(*)
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY 1, 2, 3
ORDER BY 4 DESC;
# في ترمنال تاني، ٥٠ طلب مع بعض:
seq 50 | xargs -P 50 -I{} curl -s -o /dev/null https://myapp.example.com/api/items`
        }
      ]
    },
    {
      t: "منصات جاهزة للباك إند",
      l: 2,
      n: "API و Postgres و worker من GitHub من غير ما تدير سيرفر: Render و Railway و Fly.io، أو PaaS على الـ VPS بتاعك، وإمتى الحساب يقلب",
      items: [
        {
          cmd: "render.yaml",
          title: "Render: API و Postgres و worker في ملف واحد",
          desc: R`Render بيشغّل الباك إند بتاعك من الريبو: web service (API ليه URL)، و background worker (من غير بورت، بيسحب jobs)، و cron job، و Postgres و Key Value (زي Redis) مُدارين، وكل ده ممكن يتوصف في ملف [[render.yaml]] (اسمه عندهم Blueprint) في جذر الريبو.

الملف بيربط الخدمات ببعض: [[fromDatabase]] بيحط connection string القاعدة في متغير البيئة لوحده، و [[preDeployCommand]] بيشغّل الـ migrations قبل ما النسخة الجديدة تستقبل ترافيك. وكل push على الـ branch بيعمل deploy.

الخطة المجانية للتجربة بس (الأرقام وقت كتابة الدرس وممكن تتغير، راجع صفحة الأسعار): الـ web service المجاني بينام بعد حوالي ربع ساعة من غير ترافيك وأول طلب بعدها بياخد ثواني، و Postgres المجاني بيتمسح بعد حوالي ٣٠ يوم. والـ worker و preDeployCommand محتاجين خطة مدفوعة.`,
          example: R`# render.yaml في جذر الريبو
services:
  - type: web
    name: shop-api
    runtime: node
    region: frankfurt
    plan: starter
    buildCommand: npm ci && npm run build
    preDeployCommand: npx prisma migrate deploy
    startCommand: node dist/server.js
    healthCheckPath: /healthz
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
  - type: worker
    name: shop-worker
    runtime: node
    region: frankfurt
    plan: starter
    buildCommand: npm ci && npm run build
    startCommand: node dist/worker.js
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
databases:
  - name: shop-db
    region: frankfurt
    plan: basic-256mb`,
          try: R`خد مشروع Express فيه [[/healthz]] وملف worker بسيط (حلقة بتطبع كل ١٠ ثواني وبتقرا من القاعدة). حط [[render.yaml]] زي المثال، وفي الداشبورد اختار New ثم Blueprint ووصّله بالريبو. بعد أول deploy: افتح لوجات الـ worker وشوف إنه وصل للقاعدة، وغيّر حاجة في الكود واعمل push وتابع الـ deploy التاني.`,
          flag: "script",
          deep: {
            why: "أغلب الناس بتعرف تنشر frontend على Vercel، بس أول ما يبقى عندها Express أو FastAPI ومعاه Postgres و worker بيبعت إيميلات، بتتنقل على طول لـ VPS وتقعد أسبوع في Nginx و systemd و SSL. منصة زي Render بتديك الـ ٣ حاجات دول في ملف واحد، و SSL ودومين ولوجات وباك أب للقاعدة جاهزين.",
            how: R`كل خدمة في [[services]] ليها [[type]]: [[web]] بياخد بورت من متغير [[PORT]] اللي Render بيحطه (فلازم تطبيقك يسمع على [[process.env.PORT]] وعلى [[0.0.0.0]])، و [[worker]] نفس الكود بس من غير بورت ولا URL، و [[cron]] بياخد [[schedule]]، و [[keyvalue]] لـ Redis-compatible.

[[runtime: node]] معناها Render هيبني بنفسه ([[buildCommand]]). ولو عندك Dockerfile اكتب [[runtime: docker]] وهو يبني الـ image (تاب Docker)، ودي أحسن عشان نفس الـ image تشتغل في أي حتة لما تنقل.

[[preDeployCommand]] بيشتغل بعد الـ build وقبل التبديل. لو فشل، النسخة القديمة بتفضل شغالة. ده المكان الصح لـ [[prisma migrate deploy]] (تاب «SQL و Prisma»)، مش جوه [[startCommand]]: لو عندك نسختين من الـ API، الاتنين هيحاولوا يعملوا migrate في نفس الوقت.

[[healthCheckPath]]: Render مش هيبعت ترافيك للنسخة الجديدة غير لما المسار ده يرد 200، وده اللي بيدّيك deploy من غير downtime.

[[fromDatabase]] بـ [[connectionString]] بيحط الـ internal URL: الخدمات والقاعدة في نفس الـ region بيتكلموا على شبكة Render الخاصة. عشان كده حط كله في نفس الـ [[region]]. و [[generateValue: true]] بيعمل سر عشوائي مرة واحدة. والأسرار اللي انت عارف قيمتها (مفتاح Stripe) اكتبها [[sync: false]] وحط قيمتها من الداشبورد، متكتبهاش في الملف.

الفلوس (تقريبي ومتغير): فيه اشتراك للـ workspace، وكل خدمة ليها instance بسعر شهري ثابت، والقاعدة بسعر حسب حجمها. يعني API + worker + قاعدة = ٣ بنود، وده اللي بيخلّي الفاتورة تكبر أسرع من VPS لما الخدمات تزيد (درس [[PaaS ولا VPS: الحساب]]).`,
            when: "باك إند Node أو Python لفريق صغير أو فريلانسر، خصوصًا لو محتاج worker و cron، ومحدش عايز يبقى sysadmin. والخطة المجانية للديمو والبورتفوليو بس.",
            mistakes: R`تحط مشروع عميل حقيقي على Postgres المجاني وتتفاجئ إنه اتمسح بعد شهر. والتطبيق يسمع على [[localhost]] أو بورت ثابت ٣٠٠٠ فالـ deploy يفشل في health check. و [[prisma migrate deploy]] جوه [[startCommand]]. والقاعدة في [[oregon]] (الافتراضي) والـ API في فرانكفورت. والملفات اللي اليوزر بيرفعها تتحفظ على ديسك الـ instance: بتتمسح مع كل deploy، فاستخدم S3 أو R2. وفي الانترفيو: «إيه الفرق بين web service و worker؟» الـ worker مفيش حد بيكلّمه من برا، هو اللي بيسحب الشغل من queue.`
          },
          lines: [
            "كل الخدمات اللي مش قواعد بيانات.",
            "خدمة web: ليها URL وبتستقبل HTTP.",
            "اسمها، وبيبقى جزء من الـ URL.",
            "Render هيبني بـ Node من غير Dockerfile.",
            "قريب من مصر وأوروبا (الافتراضي أمريكا).",
            "خطة مدفوعة صغيرة: مبتنامش.",
            "أمر البناء.",
            "الـ migrations قبل ما النسخة الجديدة تاخد ترافيك.",
            "أمر التشغيل.",
            "مسار بيرد 200 لما التطبيق يبقى جاهز.",
            "متغيرات البيئة.",
            "DATABASE_URL.",
            "جاي من القاعدة اللي تحت.",
            "اسمها.",
            "الـ connection string الداخلي.",
            "سر للتوكنات.",
            "Render بيولّده عشوائي مرة واحدة.",
            "خدمة worker: من غير بورت ولا URL.",
            "اسمها.",
            "نفس الـ runtime.",
            "نفس الـ region عشان الشبكة الداخلية.",
            "خطة مدفوعة (الـ worker مش مجاني).",
            "نفس البناء.",
            "بس بيشغّل ملف الـ worker.",
            "متغيراتها.",
            "نفس القاعدة.",
            "من القاعدة.",
            "اسمها.",
            "الـ connection string.",
            "قواعد البيانات المُدارة.",
            "اسم القاعدة اللي الخدمات بتشاور عليه.",
            "نفس الـ region.",
            "أصغر خطة مدفوعة (باك أب ومبتتمسحش)."
          ],
          sol: R`بعد ما الـ Blueprint يخلص هتلاقي ٣ حاجات في المشروع: [[shop-api]] بـ URL على [[onrender.com]]، و [[shop-worker]] من غير URL، و [[shop-db]]. افتح [[https://shop-api-xxxx.onrender.com/healthz]] المفروض يرد 200، ولوجات الـ worker المفروض تطبع سطرها كل ١٠ ثواني ومعاه نتيجة من القاعدة (زي عدد الطلبات).

ولما تعمل push هتلاقي deploy جديد للخدمتين، وفي لوج الـ API سطر [[prisma migrate deploy]] قبل التشغيل. والموقع مش هيقع وانت بتنشر، لأن النسخة القديمة بتفضل شغالة لحد ما [[/healthz]] في الجديدة يرد.

الغلطات الشائعة: الـ deploy يفضل «In progress» وبعدين يفشل بـ timeout، وده غالبًا لأن التطبيق بيسمع على بورت ثابت بدل [[process.env.PORT]]. أو الـ worker يقع بـ [[ECONNREFUSED]]، وده لأنك كاتب DATABASE_URL بإيدك من جهازك بدل [[fromDatabase]]. ولو اخترت [[plan: free]] للـ worker هتلاقي الـ Blueprint بيرفض، لأن الـ workers مش مجانية.`,
          solCode: R`// src/server.ts
import express from "express";
const app = express();
app.get("/healthz", (_req, res) => res.send("ok"));
app.listen(Number(process.env.PORT ?? 3000), "0.0.0.0");

// src/worker.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
setInterval(async () => {
  const count = await prisma.order.count();
  console.log(JSON.stringify({ msg: "worker tick", orders: count }));
}, 10_000);`
        },
        {
          cmd: "railway",
          title: "Railway: خدمات ومتغيرات بتشاور على بعض",
          desc: R`Railway بيشتغل بفكرة مشروع فيه خدمات جنب بعض على canvas: خدمة من ريبو GitHub أو Docker image، وقاعدة Postgres أو Redis بزرار واحد، وكلهم على شبكة خاصة جوه المشروع.

المتغيرات بتشاور على بعض بـ reference variables: [[DATABASE_URL=$__{{Postgres.DATABASE_URL}}]] معناها «خد قيمة DATABASE_URL من خدمة اسمها Postgres»، فلو القاعدة اتغيرت، المتغير يتحدّث لوحده. والـ worker مجرد خدمة تانية من نفس الريبو بـ start command مختلف.

الفلوس بالاستخدام الفعلي (CPU و RAM بالثانية + الديسك + الترافيك الخارج)، مش بسعر ثابت لكل خدمة. وقت كتابة الدرس: فيه trial بكريدت صغير، وخطة Hobby بـ ٥ دولار في الشهر وجواها ٥ دولار استخدام. الأرقام بتتغير، فراجع صفحة الأسعار.`,
          example: R`npm i -g @railway/cli
railway login
railway init --name shop
railway add --database postgres
railway add --service api --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
railway add --service worker --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
railway up --service api
railway variables --service api
railway logs --service worker
railway run npx prisma migrate dev`,
          try: R`اعمل مشروع على Railway فيه Postgres وخدمتين (api و worker) من نفس الريبو. في إعدادات الـ worker غيّر الـ start command لـ [[node dist/worker.js]]، وفي الـ api حط pre-deploy command بـ [[npx prisma migrate deploy]]. بعدين من إعدادات الـ api اعمل Generate Domain وافتح [[/healthz]]، وشوف في الـ Metrics أد إيه كل خدمة بتاكل RAM.`,
          deep: {
            why: "Railway أسرع طريقة تشغّل بيها كذا خدمة بتكلم بعض (API و worker و Postgres و Redis) من غير YAML كتير. وطريقة الفلوس بالاستخدام بتبقى أرخص لمشروع صغير فاضي معظم الوقت، وأغلى لو خدمة بتاكل RAM على طول.",
            how: R`المشروع فيه environments (زي production و staging)، وكل environment فيه نسخة من كل الخدمات بمتغيراتها. وممكن تفعّل PR environments: نسخة كاملة لكل PR.

الخدمة بتتبني بـ Railpack (البنّاء بتاعهم اللي بيعرف Node و Python وغيرهم لوحده) أو بـ Dockerfile لو موجود في الريبو. وإعداداتها (start command و pre-deploy command و health check) من الداشبورد أو من ملف [[railway.json]] أو [[railway.toml]] في الريبو.

الشبكة الخاصة: كل خدمة ليها اسم داخلي زي [[api.railway.internal]]، والـ worker يقدر يكلّم الـ API عليه من غير ما يطلع على النت. والقاعدة بتدّي متغيرين: [[DATABASE_URL]] (داخلي، ببلاش ترافيك) و [[DATABASE_PUBLIC_URL]] (للوصول من جهازك، وبيتحاسب كترافيك خارج).

الـ CLI: [[railway init]] مشروع جديد، [[railway link]] يربط الفولدر بمشروع موجود، [[railway add]] يضيف قاعدة أو خدمة، [[railway up]] يرفع الفولدر الحالي ويبني (من غير GitHub)، و [[railway run CMD]] بيشغّل أمر على جهازك بمتغيرات الخدمة، مفيد لـ migration أو script سريع.

الخدمة مش بتنام لوحدها. فيه خيار serverless (أو «App Sleeping») بيوقّفها لو مفيش ترافيك، بس مش مناسب لـ worker.`,
            when: "MVP أو مشروع جانبي فيه كذا خدمة، أو فريق صغير عايز staging و PR previews للباك إند من غير شغل. ولو الـ RAM بتاع الخدمات ثابت وعالي على طول، احسبها مقابل VPS.",
            mistakes: R`تكتب connection string القاعدة كنص ثابت بدل reference variable، فلما القاعدة تتغير الخدمة تقع. وتستخدم [[DATABASE_PUBLIC_URL]] من جوه الخدمات فتدفع ترافيك على كل query وتبقى أبطأ. وتفتكر إن الـ ٥ دولار حد أقصى: لو الاستخدام عدّاها بتدفع الزيادة، فحط usage limit من الإعدادات. وتنسى إن [[railway run]] بيشغّل على جهازك بمتغيرات الإنتاج، فـ [[prisma migrate reset]] كده بيمسح قاعدة الإنتاج.`
          },
          lines: [
            "سطّب الـ CLI.",
            "سجّل دخول (بيفتح المتصفح).",
            "مشروع جديد اسمه shop، والفولدر اتربط بيه.",
            "ضيف Postgres مُدار (اسم الخدمة Postgres).",
            "خدمة api، و DATABASE_URL بتشاور على القاعدة (علامات ' عشان الشل ميفسّرش $).",
            "خدمة worker بنفس المتغير.",
            "ارفع الكود وابنيه على خدمة api.",
            "اعرض متغيرات الـ api بقيمها النهائية.",
            "لوجات الـ worker.",
            "شغّل أمر على جهازك بمتغيرات الخدمة المربوطة."
          ],
          sol: R`في الـ canvas هتشوف ٣ مربعات: Postgres و api و worker، وخطوط بين القاعدة والخدمتين (بسبب الـ reference variables). [[railway variables --service api]] المفروض يطلّع [[DATABASE_URL]] بقيمة فيها [[postgres.railway.internal]]، يعني الشبكة الداخلية.

بعد Generate Domain، [[/healthz]] يرد 200. وفي لوجات الـ api تلاقي خطوة pre-deploy فيها [[prisma migrate deploy]] وبعدها [[All migrations have been successfully applied]] أو [[No pending migrations to apply]]. والـ Metrics المفروض توريك استهلاك صغير (عشرات الميجات RAM للـ worker)، وده اللي بتدفعه فعلًا.

الغلطات الشائعة: الـ worker بيشتغل كـ API تاني ويطبع [[listening on 3000]]، لأنك مغيّرتش الـ start command فخد [[npm start]]. أو قيمة المتغير طالعة [[$__{{Postgres.DATABASE_URL}}]] كنص حرفي، لأن اسم خدمة القاعدة مش [[Postgres]] بالظبط (الاسم حساس لحالة الحروف).`,
          solCode: R`// railway.json في جذر الريبو (إعدادات الـ api)
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "startCommand": "node dist/server.js",
    "preDeployCommand": ["npx prisma migrate deploy"],
    "healthcheckPath": "/healthz"
  }
}`
        },
        {
          cmd: "fly launch",
          title: "Fly.io: containers قريبة من اليوزر، و volumes، و regions",
          desc: R`Fly.io بياخد الـ Docker image بتاعتك ويشغّلها كـ Machines (VMs صغيرة بتقوم في ثواني) في أي region تختارها. [[fly launch]] بيقرا المشروع، ويعمل [[fly.toml]] و Dockerfile لو مش موجود، ويعمل الـ app.

الـ Machine ديسكها بيتمسح مع كل deploy. لو محتاج داتا تعيش (SQLite مثلًا) بتعمل volume: ديسك مربوط بـ Machine واحدة في region واحدة. وبتقدر تفصل الـ web عن الـ worker بـ [[processes]] في نفس الـ app.

مفيش free tier للحسابات الجديدة وقت كتابة الدرس: بتدفع بالثانية على الـ Machines الشغالة، وبالجيجا على الـ volumes حتى لو الـ Machine واقفة. الـ Machine الصغيرة جدًا بدولارات قليلة في الشهر، بس راجع صفحة الأسعار.`,
          example: R`# fly.toml (fly launch بيعمله، وده بعد التعديل)
app = "shop-api"
primary_region = "fra"

[build]

[deploy]
  release_command = "npx prisma migrate deploy"

[processes]
  app = "node dist/server.js"
  worker = "node dist/worker.js"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"`,
          try: R`اعمل [[fly launch]] على مشروع Express، واقبل الـ Dockerfile اللي بيعمله، وخلّي [[primary_region]] أقرب region ليك. ضيف [[processes]] زي المثال، وشغّل [[fly secrets set DATABASE_URL=...]] وبعدين [[fly deploy]]. بعدين: [[fly status]] (كام Machine لكل process)، و [[fly scale count app=2]]، و [[fly logs]]. وجرّب تسيب الموقع ربع ساعة من غير طلبات وشوف [[fly status]].`,
          flag: "script",
          deep: {
            why: "لو المستخدمين في أكتر من قارة، أو محتاج WebSockets أو process شغال على طول، Fly بيشغّل container حقيقي قريب منهم، مش function ليها حد أقصى للوقت. والـ Machines اللي بتقف لما مفيش ترافيك بتخلي مشروع صغير يتكلف قليل.",
            how: R`[[fly launch]] بيسألك عن الاسم والـ region، ويقترح Postgres أو Redis، ويكتب [[fly.toml]]. وبعدها [[fly deploy]] بيبني الـ image (على builder عندهم أو جهازك) ويعمل rolling update.

[[release_command]] بيشتغل مرة واحدة في Machine مؤقتة قبل تحديث الباقي، ولو فشل الـ deploy بيقف. ده مكان الـ migrations.

[[processes]]: كل سطر بيعمل مجموعة Machines بأمر مختلف من نفس الـ image. و [[http_service.processes = ["app"]]] معناها بس مجموعة app بتستقبل HTTP. وتكبّر كل مجموعة لوحدها: [[fly scale count worker=2]].

[[auto_stop_machines = "stop"]]: الـ proxy بتاع Fly بيوقّف الـ Machines لما مفيش طلبات، ويقوّمها مع أول طلب (حوالي ثانية أو أقل). و [[min_machines_running = 1]] بيسيب واحدة صاحية في الـ primary region. ده بيأثر على الـ web بس، والـ worker مبيستقبلش HTTP فمش بيتوقف بالطريقة دي.

الـ volumes: [[fly volumes create data --size 1 --region fra]] وبعدين في [[fly.toml]] قسم [[[mounts]]] فيه [[source = "data"]] و [[destination = "/data"]]. الـ volume في region واحدة ومربوط بـ Machine واحدة، ومفيش مشاركة بين Machines ولا replication تلقائي. عشان كده Machine بـ volume = حاجة واحدة لو وقعت وقعت، و Fly بيعمل snapshots يومية (والتخزين بتاعها بقى بيتحاسب). لو محتاج قاعدة بجد استخدم Postgres مُدار (من Fly أو Neon أو Supabase) بدل ما تدير Postgres على volume بنفسك.

الـ regions: [[fly platform regions]] بيعرضهم. [[fly scale count 2 --region fra,ams]] بيوزّع Machines. الطلب بيروح لأقرب Machine شغالة (Anycast)، بس لو القاعدة في fra والـ Machine في سنغافورة، كل query هتعدّي نص الكرة الأرضية. فابدأ region واحدة جنب القاعدة.`,
            when: "API أو WebSockets أو app محتاج process طويل وقريب من اليوزر، وانت مرتاح مع Docker. ولو كل اللي عندك API بسيط وقاعدة، Render أو Railway أبسط.",
            mistakes: R`تعمل volume وتفتكر إنه باك أب أو إنه بيتشارك بين Machines. وتعمل [[fly scale count 3]] لـ app عليه volume فيتعمل ٣ volumes فاضية مختلفة، وكل Machine بداتا مختلفة. و [[min_machines_running = 0]] لـ API محتاج يرد بسرعة. وتنسى إن الـ volumes والـ IPv4 المخصص بيتحاسبوا حتى لو الـ Machines واقفة. والتطبيق يسمع على بورت غير [[internal_port]] فالـ health check يفشل.`
          },
          lines: [
            "اسم الـ app (والدومين هيبقى shop-api.fly.dev).",
            "الـ region الأساسية: فرانكفورت.",
            "البناء: فاضي يعني استخدم الـ Dockerfile اللي في الريبو.",
            "إعدادات الـ deploy.",
            "Machine مؤقتة بتشغّل الـ migrations قبل التحديث.",
            "مجموعات processes من نفس الـ image.",
            "مجموعة app: السيرفر.",
            "مجموعة worker: شغل الخلفية.",
            "الـ HTTP من برا.",
            "البورت اللي التطبيق بيسمع عليه جوه الـ container.",
            "حوّل HTTP لـ HTTPS.",
            "وقّف الـ Machines لما مفيش ترافيك.",
            "قوّمها مع أول طلب.",
            "سيب واحدة صاحية دايمًا.",
            "بس مجموعة app بتاخد HTTP.",
            "مقاس الـ Machine.",
            "CPU مشترك واحد.",
            "نص جيجا رام."
          ],
          sol: R`بعد [[fly deploy]] المفروض [[fly status]] يوريك Machines في مجموعتين: [[app]] و [[worker]]، كلهم في [[fra]]. و [[https://shop-api.fly.dev/healthz]] يرد 200. وفي [[fly logs]] هتلاقي سطر الـ release_command ([[prisma migrate deploy]]) قبل ما الـ Machines تتحدّث.

بعد [[fly scale count app=2]] هتلاقي ٢ app و ١ worker. ولو سبت الموقع من غير طلبات ربع ساعة، [[fly status]] هيوريك Machine من الاتنين حالتها [[stopped]] والتانية [[started]] (بسبب [[min_machines_running = 1]])، والـ worker لسه [[started]].

الغلطات الشائعة: الـ deploy يطلع [[instance refused connection]] أو ما يعدّيش الـ health check، لأن التطبيق بيسمع على ٣٠٠٠ والـ [[internal_port]] ٨٠٨٠: خلي التطبيق يقرا [[PORT]] أو غيّر الرقم. أو الـ worker مش ظاهر خالص، لأنك نسيت [[processes = ["app"]]] في [[http_service]] فالاتنين بقوا web.`,
          solCode: R`fly launch --no-deploy
fly secrets set DATABASE_URL="postgresql://app:YOUR_PASSWORD@db.example.com:5432/shop?sslmode=require"
fly deploy
fly status
fly scale count app=2
fly logs`
        },
        {
          cmd: "Coolify / Dokploy",
          title: "PaaS على الـ VPS بتاعك: تجربة Render بسعر سيرفر",
          desc: R`Coolify و Dokploy برامج open source بتسطّبها على VPS بتاعك، فيبقى عندك داشبورد زي Render: تربط ريبو GitHub، وكل push يعمل build و deploy، و SSL تلقائي بـ Let's Encrypt، وقواعد بيانات بزرار، وباك أب للقاعدة على S3 أو R2.

من جوه بيستخدموا Docker (والـ Dockerfile أو Nixpacks أو Docker Compose بتاعك)، و Traefik كـ reverse proxy بياخد الدومين ويعمل الشهادة. يعني نفس اللي بتعمله بإيدك في تاب VPS وتاب Docker وتاب Nginx، بس بداشبورد.

البرنامج نفسه ببلاش، وبتدفع تمن السيرفر بس. وكل واحد ليه نسخة cloud مدفوعة لو مش عايز تدير لوحة التحكم نفسها. الحد الأدنى المكتوب في الدوكس حوالي ٢ جيجا رام و ٣٠ جيجا ديسك، والـ build نفسه بياكل رام، فسيرفر ٤ جيجا أريح.`,
          example: R`ssh root@203.0.113.10
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
curl -sSL https://dokploy.com/install.sh | sh
docker ps --format "table {{.Names}}\t{{.Status}}"
sudo ufw allow 22,80,443/tcp
dig +short api.example.com`,
          try: R`على VPS جديد فاضي (Ubuntu LTS، ٤ جيجا لو تقدر)، سطّب واحد بس من الاتنين. افتح اللوحة (Coolify على بورت 8000، و Dokploy على 3000)، واعمل حساب الأدمن فورًا. اربط GitHub، واعمل Postgres، وانشر API من ريبو فيه Dockerfile على [[api.example.com]] (سجل A بيشاور على السيرفر). وبعدين فعّل الباك أب المجدول للقاعدة على bucket في R2 أو S3.`,
          flag: "danger",
          deep: {
            why: "الـ PaaS المدفوعة بتبقى غالية لما الخدمات تكتر: ٥ خدمات صغيرة = ٥ instances. على VPS بـ ١٥ دولار تقدر تشغّل الـ ٥ ومعاهم Postgres و Redis. Coolify و Dokploy بيدّوك راحة push-to-deploy و SSL والباك أب من غير ما تكتب Nginx config ولا systemd unit، وده طريق شائع جدًا للفريلانسرز والشركات الصغيرة.",
            how: R`سكربت التسطيب بيسطّب Docker ويشغّل اللوحة نفسها كـ containers. بعد كده، أي app بتضيفه بيتبني image ويشتغل container، و Traefik بيقرا الـ labels بتاعته ويوجّه الدومين ليه ويطلب شهادة.

Coolify: أقدم وأكبر، فيه كتالوج خدمات جاهزة كبير (Plausible و n8n و MinIO وغيرهم بزرار)، ويقدر يدير كذا سيرفر من لوحة واحدة عن طريق SSH. Dokploy: أخف وأحدث، ومبني على Docker Swarm فبيقدر يوزّع على كذا سيرفر، وتجربته قريبة من Vercel. الاتنين بيقروا Docker Compose بتاعك كما هو.

الـ build على نفس السيرفر اللي بيخدم اليوزرز. build لـ Next.js ممكن ياخد ١.٥ جيجا رام، فعلى سيرفر ٢ جيجا الموقع يبطأ أو الـ OOM killer يقتل حاجة. الحل: سيرفر أكبر، أو swap، أو تبني الـ image في GitHub Actions وتخلي اللوحة تسحبها من registry (تاب GitHub Actions).

اللي لسه عليك انت: تحديث نظام التشغيل (unattended-upgrades في تاب VPS)، والفايروول، وتحديث اللوحة نفسها، ومراقبة الديسك (الـ images القديمة بتتراكم)، وباك أب برا السيرفر. لو السيرفر الواحد وقع، كل حاجة وقعت.

تحذير أمان: اللوحة فيها صلاحية root على السيرفر عمليًا. اعمل حساب الأدمن أول ما تفتحها (أول واحد يفتح الصفحة بيبقى الأدمن)، وحط لوحة التحكم على دومين بـ HTTPS، ولو تقدر اقفل بورت اللوحة إلا من IP بتاعك أو وراه Cloudflare Access.`,
            when: "عندك كذا مشروع صغير أو عملاء، وعايز push-to-deploy بسعر VPS، وعندك حد يعرف أساسيات Linux لو حاجة باظت. مش أول اختيار لو محدش في الفريق عمره فتح ترمنال.",
            mistakes: R`تسطّب وتسيب صفحة التسجيل مفتوحة على [[http://IP:8000]] فحد تاني يسجّل أدمن قبلك. والقاعدة على نفس السيرفر والباك أب على نفس الديسك. وسيرفر ١ جيجا وكل build يوقّع الموقع. وتنسى إن Docker بيفتح البورتات بعيد عن ufw (تاب Docker)، فقاعدة عملتلها public port تبقى مفتوحة للنت. وتفتكر إن «زي Render» معناها «مُدار»: التحديثات والأمان لسه عليك.`
          },
          lines: [
            "ادخل السيرفر الجديد.",
            "سكربت تسطيب Coolify الرسمي (Docker + اللوحة على بورت 8000).",
            "أو سكربت Dokploy الرسمي (اللوحة على بورت 3000). اختار واحد بس.",
            "اتأكد إن containers اللوحة شغالة.",
            "SSH والويب بس (وافتكر إن Docker بيعدّي ufw في البورتات اللي بيفتحها).",
            "اتأكد إن الدومين بيشاور على السيرفر قبل ما تطلب شهادة."
          ],
          sol: R`بعد التسطيب، [[docker ps]] المفروض يوريك containers اللوحة: في Coolify أسماء زي [[coolify]] و [[coolify-db]] و [[coolify-redis]] و [[coolify-proxy]] (ده Traefik)، وفي Dokploy أسماء زي [[dokploy]] و [[dokploy-postgres]] و [[dokploy-redis]] و [[dokploy-traefik]].

بعد ما تنشر الـ API، [[curl -I https://api.example.com/healthz]] يرجّع [[HTTP/2 200]]، والشهادة من Let's Encrypt ([[openssl s_client]] زي درس [[Cloudflare proxy و SSL]]). وبعد أول باك أب مجدول هتلاقي ملف dump في الـ bucket.

الغلطات الشائعة: الشهادة مش بتطلع والمتصفح بيقول [[TRAEFIK DEFAULT CERT]]، وده لأن الـ DNS لسه مش بيشاور على السيرفر، أو السجل برتقاني في Cloudflare والـ SSL mode مش Full (strict). أو الـ build بيقف في النص ولوج السيرفر فيه [[Out of memory: Killed process]]، والحل رام أكبر أو swap أو build برا السيرفر.`
        },
        {
          cmd: "PaaS ولا VPS: الحساب",
          title: "الفاتورة كبرت: تفضل على PaaS ولا تنقل؟",
          desc: R`المقارنة الصح مش «٨٠ دولار مقابل ٢٠»، هي فلوس + وقت: الـ PaaS بتاخد فلوس أكتر ووقت أقل، والـ VPS فلوس أقل ووقت أكتر (تحديثات، وباك أب، ومشاكل الساعة ٢ بالليل). والوقت ده ليه سعر حتى لو انت اللي بتعمله.

السكربت ده بيحسب التكلفة الكاملة بسعر ساعتك. الأرقام تقريبية للتوضيح بس: عدّلها بأسعار المنصات النهارده وبالوقت اللي بتصرفه فعلًا.`,
          example: R`const HOURLY = Number(process.argv[2] ?? 15);
const setups = {
  "PaaS (Render/Railway)": { bill: { api: 25, worker: 25, postgres: 20, redis: 10 }, opsHours: 0.5 },
  "VPS + Coolify": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 3 },
  "VPS بإيدك": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 5 },
};
const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);
for (const [name, s] of Object.entries(setups)) {
  const cash = sum(s.bill);
  const time = s.opsHours * HOURLY;
  console.log(name.padEnd(22), "فلوس", cash, "+ وقت", time, "=", cash + time, "دولار");
}`,
          try: R`احفظه [[cost.mjs]] وشغّله بـ [[node cost.mjs 5]] و [[node cost.mjs 15]] و [[node cost.mjs 40]]. وبعدين حط أرقامك الحقيقية: فاتورة المنصة من آخر شهر، وسعر VPS يكفي نفس الخدمات، وكام ساعة في الشهر فعلًا بتصرفها على السيرفر. عند أنهي سعر ساعة الاختيار بيقلب؟`,
          flag: "script",
          deep: {
            why: "أغلب قرارات النقل بتتاخد غلط في الاتجاهين: حد ينقل من PaaS لـ VPS عشان يوفر ٥٠ دولار ويصرف ١٠ ساعات في الشهر على الصيانة، أو شركة تفضل تدفع آلاف على منصة وكان ممكن سيرفرين يكفوا. الحساب البسيط ده بيخلّي القرار أرقام مش إحساس.",
            how: R`ليه الـ PaaS بتغلى مع الكبر: كل خدمة instance بسعر، وكل قاعدة بسعر، والترافيك الخارج بيتحاسب. ٥ خدمات صغيرة على PaaS ممكن تكلف أضعاف سيرفر واحد يشيلهم. وعلى الناحية التانية، أول ٢-٣ خدمات على PaaS غالبًا أرخص من وقتك.

إمتى الحساب بيقلب لـ VPS (أو VPS + Coolify): فاتورة المنصة بقت أكبر من سيرفرين كويسين + ساعتين شغل، والترافيك ثابت ومتوقع، وفيه حد في الفريق مرتاح مع Linux. وإمتى تفضل على PaaS: الفريق صغير ووقته أغلى من الفرق، أو محتاج previews و autoscaling و Postgres بـ PITR من غير ما تبنيهم.

وفيه حل وسط كتير بيعمله الناس: الـ API والـ workers على VPS بـ Coolify، والقاعدة تفضل مُدارة (Neon أو Supabase أو RDS)، لأن القاعدة هي أصعب حاجة تديرها صح (باك أب واسترجاع مجرّب).

إزاي تبقى جاهز للنقل من أول يوم: Dockerfile لكل خدمة (فتشتغل في أي حتة)، وكل الإعدادات متغيرات بيئة (مفيش حاجة في داشبورد بس)، والملفات في S3 أو R2 مش على ديسك، والـ migrations في الكود، والدومين عندك في Cloudflare مش عند المنصة.

خطوات النقل نفسها: شغّل كل حاجة على الجديد جنب القديم، واعمل [[pg_dump]] من القاعدة القديمة و [[pg_restore]] على الجديدة وجرّب عليها، ونزّل الـ TTL قبلها بيوم (درس [[Route 53]])، وبعدين في وقت هادي: وقّف الكتابة (maintenance mode)، و dump أخير، و restore، وغيّر الـ DNS، وسيب القديم شغال أسبوع لو احتجت ترجع. تفاصيل الـ dump والـ restore في تاب PostgreSQL.`,
            when: "كل ما فاتورة المنصة تزيد بشكل ملحوظ، أو تيجي تضيف خدمة جديدة، أو وقت الصيانة على VPS يبدأ ياكل من وقت المنتج.",
            mistakes: R`تحسب الفلوس بس وتعتبر وقتك ببلاش. وتنقل القاعدة من غير ما تجرّب الـ restore قبلها. وتنقل وانت معتمد على حاجات خاصة بالمنصة (cron من الداشبورد، أو متغيرات مش مكتوبة في أي حتة، أو ملفات على ديسك الـ instance). وفي الانترفيو: «امتى تنقل من Heroku-like PaaS لـ infrastructure بتاعتك؟» الإجابة الكويسة فيها التكلفة الكاملة، ومين هيدير، وخطة نقل من غير downtime وخطة رجوع.`
          },
          lines: [
            "سعر ساعتك من أول argument (الافتراضي ١٥ دولار).",
            "٣ طرق لتشغيل نفس المشروع.",
            "PaaS: ٤ بنود (API و worker وقاعدة و Redis)، ونص ساعة شغل في الشهر.",
            "VPS + Coolify: سيرفر وباك أب وتخزين برا، و ٣ ساعات صيانة.",
            "VPS بإيدك: نفس الفلوس، ووقت أكتر (Nginx و systemd بإيدك).",
            "قفلة.",
            "دالة بتجمع البنود.",
            "لكل طريقة:",
            "الفلوس اللي بتدفعها.",
            "تمن وقتك.",
            "اطبع الاتنين والمجموع.",
            "قفلة الحلقة."
          ],
          sol: R`الناتج بسعر ساعة ٥ دولار: PaaS حوالي [[82.5]]، و VPS + Coolify [[35]]، و VPS بإيدك [[45]]. يعني السيرفر أرخص بفرق كبير.

بسعر ١٥: PaaS [[87.5]]، و Coolify [[65]]، و VPS بإيدك [[95]]. هنا الـ VPS بإيدك بقى أغلى من الـ PaaS، و Coolify لسه أرخص.

بسعر ٤٠: PaaS [[100]]، و Coolify [[140]]، و VPS بإيدك [[220]]. الـ PaaS بقت الأرخص فعلًا.

والحل (الـ solCode) بياخد أرقامك من الـ argv: [[node break-even.mjs]] بالافتراضي بيطلّع [[PaaS: 87.5 | VPS: 80 | الـ VPS أرخص]] و [[الاختيار بيقلب عند سعر ساعة 17.1 دولار]]. ولو فاتورة الـ PaaS ١٢٠ والـ VPS ٢٠ بـ ٣ ساعات ([[node break-even.mjs 30 120 20 3]]) نقطة القلب بتبقى ٤٠ دولار.

الفكرة: كل ما وقتك يغلى، الـ PaaS تكسب. وكل ما الخدمات تكتر (زوّد بنود في الـ PaaS بس وشوف)، الـ VPS يكسب. ولو لقيت إن الـ PaaS دايمًا أغلى مهما غيّرت سعر الساعة، راجع إنك حاسب ساعات صيانة الـ VPS بأمانة: تحديثات وباك أب واسترجاع مجرّب ومراقبة، مش «ولا حاجة، هو شغال لوحده».`,
          solCode: R`// break-even.mjs: هات الفاتورة والساعات من argv بدل ما تكتبها في الكود
const [, , hourly = "15", paasBill = "80", vpsBill = "20", vpsHours = "4"] = process.argv;
const h = Number(hourly);
const paas = Number(paasBill) + 0.5 * h;
const vps = Number(vpsBill) + Number(vpsHours) * h;
console.log("PaaS:", paas, "| VPS:", vps, "|", paas < vps ? "خليك على PaaS" : "الـ VPS أرخص");
const breakEven = (Number(paasBill) - Number(vpsBill)) / (Number(vpsHours) - 0.5);
console.log("الاختيار بيقلب عند سعر ساعة", breakEven.toFixed(1), "دولار");`
        }
      ]
    },
    {
      t: "Containers في الـ cloud",
      l: 3,
      n: "نفس الـ image اللي بتبنيها لـ Docker، بس AWS هو اللي يشغّلها ويكبّرها",
      items: [
        {
          cmd: "ECR",
          title: "ارفع الـ image لـ registry جوه حسابك",
          desc: R`ECR هو Docker registry خاص جوه حساب AWS، و ECS و Lambda و EC2 بيسحبوا منه بالـ role من غير باسوردات.

بتعمل repository، وتسجّل دخول Docker بتوكن مؤقت (١٢ ساعة)، وتعمل tag و push. وحط lifecycle policy تمسح الـ images القديمة، لأن التخزين بيتحاسب بالجيجا.`,
          example: R`aws ecr create-repository --repository-name myapp-api --image-scanning-configuration scanOnPush=true
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
docker build --platform linux/amd64 -t myapp-api:1.4.0 .
docker tag myapp-api:1.4.0 123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0
docker push 123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0
aws ecr describe-images --repository-name myapp-api --query "imageDetails[].[imageTags[0],imageSizeInBytes]" --output table`,
          try: R`اكتب [[keep-last-20.json]] وطبّقه بـ [[aws ecr put-lifecycle-policy --repository-name myapp-api --lifecycle-policy-text file://keep-last-20.json]]: قاعدة بـ [[imageCountMoreThan]] قيمتها 20 و action من نوع [[expire]]. وشوف نتيجة الفحص بـ [[aws ecr describe-image-scan-findings]].`,
          deep: {
            why: "ECS أو EKS محتاجين يسحبوا الـ image من مكان. Docker Hub فيه rate limits، والـ image العامة أي حد عارف الاسم يشوفها. ECR جوه حسابك، والسحب منه بالـ role، وفي نفس الـ region فالسحب سريع ومن غير egress.",
            how: R`[[get-login-password]] بيطلّع token مؤقت (١٢ ساعة) بالهوية اللي انت شغال بيها، والـ pipe بيدّيه لـ [[docker login]] على الـ stdin عشان ميظهرش في history الترمنال. واليوزر دايمًا [[AWS]].

اسم الـ image كامل: [[ACCOUNT.dkr.ecr.REGION.amazonaws.com/REPO:TAG]]. [[docker tag]] بيدّي نفس الـ image الاسم ده، و push بيرفع الطبقات اللي مش موجودة بس.

[[--platform linux/amd64]]: لو بتبني على Mac بـ Apple Silicon، الـ image هتطلع ARM افتراضي وهتقع على Fargate x86 بـ [[exec format error]]. يا تبني amd64، يا تشغّل Fargate على ARM64 (Graviton، وأرخص). التفاصيل في تاب Docker (buildx و --platform).

[[scanOnPush]] بيفحص الـ image على ثغرات معروفة في الباكدجات. والـ tags: متعتمدش على [[latest]]، استخدم رقم نسخة أو الـ commit SHA، وممكن تفعّل tag immutability عشان محدش يكتب فوق tag موجود.

والـ lifecycle policy بتمسح لوحدها حسب قواعد: عدد، أو عمر، أو images من غير tag.`,
            when: "أي container هيشتغل على ECS أو EKS أو Lambda (container image).",
            mistakes: "تبني على Mac M1 وترفع وتستغرب [[exec format error]]. وتكتب [[docker login -p TOKEN]] فيفضل في الـ history. وتستخدم [[:latest]] في الـ task definition فمش عارف إيه اللي شغال ومفيش rollback واضح. وتنسى الـ lifecycle وتلاقي مئات الـ images بتتحاسب."
          },
          lines: [
            "اعمل repository، وافحص كل image على ثغرات أول ما تترفع.",
            "سجّل دخول Docker على ECR بتوكن مؤقت (عن طريق الـ stdin مش في الأمر).",
            "ابني للمعالج اللي Fargate هيشغّل عليه.",
            "ادّيها الاسم الكامل بتاع ECR.",
            "ارفعها.",
            "اعرض الـ images المرفوعة وحجمها."
          ],
          sol: R`الـ [[keep-last-20.json]] تحت. [[put-lifecycle-policy]] بيرجّع [[registryId]] و [[repositoryName]] و [[lifecyclePolicyText]] (نفس الـ JSON). والقاعدة مش بتمسح فورًا: ECR بيطبّقها في الخلفية خلال ساعات، فلو عايز تشوف هتمسح إيه قبلها شغّل الـ preview اللي تحت.

[[describe-image-scan-findings]] محتاج [[--image-id imageTag=1.4.0]]، وبيرجّع [[imageScanStatus.status: COMPLETE]] و [[findingSeverityCounts]] زي [[{"HIGH": 2, "MEDIUM": 7, "LOW": 12}]]. الأرقام بتفرق حسب الـ base image: [[node:22-alpine]] أو [[distroless]] غالبًا أقل بكتير من [[node:22]] الكامل، وده سبب كويس تصغّر الـ image.

أخطاء شائعة: [[ScanNotFoundException]] يعني الـ image اترفعت قبل ما تفعّل [[scanOnPush]] أو لسه الفحص شغال (استنى أو [[aws ecr start-image-scan]]). و [[InvalidParameterException]] على الـ policy غالبًا [[countNumber]] مكتوب كنص [["20"]] بدل رقم، أو [[tagStatus]] بـ [[tagged]] من غير [[tagPrefixList]]. وخلي بالك إن [[tagStatus: any]] بيعدّ كل الـ images، فلو عندك tag اسمه [[prod]] قديم ممكن يتمسح؛ لو ده خطر اعمل قاعدة بأولوية أعلى تحميه.`,
          solCode: R`cat > keep-last-20.json <<'EOF'
{
  "rules": [{
    "rulePriority": 1,
    "description": "keep last 20 images",
    "selection": { "tagStatus": "any", "countType": "imageCountMoreThan", "countNumber": 20 },
    "action": { "type": "expire" }
  }]
}
EOF
aws ecr put-lifecycle-policy --repository-name myapp-api --lifecycle-policy-text file://keep-last-20.json
aws ecr start-lifecycle-policy-preview --repository-name myapp-api
aws ecr get-lifecycle-policy-preview --repository-name myapp-api --query "previewResults[].[imageTags[0],action.type]" --output table
aws ecr describe-image-scan-findings --repository-name myapp-api --image-id imageTag=1.4.0 --query "[imageScanStatus.status,imageScanFindings.findingSeverityCounts]"`
        },
        {
          cmd: "ECS Fargate",
          title: "شغّل containers من غير ما تدير سيرفرات",
          desc: R`ECS بيشغّل containers ويخلّيها شغالة ويكبّرها، و Fargate معناه مفيش EC2 تديرها: بتقول «container بنص CPU و ١ جيجا» وخلاص، والوحدات هي task definition (وصف الـ container) و service (عايز كام نسخة دايمًا) و cluster.

أسهل طريقة دلوقتي ECS Express Mode: أمر واحد بـ image و roles يعمل service على Fargate و load balancer و URL و autoscaling. و App Runner اتقفل للعملاء الجداد من أبريل ٢٠٢٦، و AWS بتنصح بـ Express Mode بداله. تحذير: الـ load balancer والـ tasks بيتحاسبوا بالساعة لحد ما تمسحهم.`,
          example: R`aws ecs create-express-gateway-service \
  --service-name myapp-api \
  --execution-role-arn arn:aws:iam::123456789012:role/ecsTaskExecutionRole \
  --infrastructure-role-arn arn:aws:iam::123456789012:role/ecsInfrastructureRoleForExpressServices \
  --primary-container '{"image":"123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0","containerPort":3000}' \
  --health-check-path /health \
  --scaling-target '{"minTaskCount":1,"maxTaskCount":4}'
aws ecs list-clusters`,
          try: "لو عندك image على ECR، اعمل الـ service بالأمر ده وافتح الـ URL اللي بيطلع في الكونسول. بعدين افتح الـ service وشوف كل اللي اتعمل: load balancer و target group و security groups و autoscaling. وامسحها لما تخلص.",
          flag: "danger",
          deep: {
            why: "بين VPS (انت بتدير كل حاجة) و Kubernetes (قوي ومعقد جدًا)، ECS Fargate هو النص المعقول على AWS: containers بتتدار وبتكبر، من غير سيرفرات ولا control plane تدفع عليه أو تفهمه.",
            how: R`الـ task definition وصف شبه compose: الـ image، والـ CPU والرام، والبورت، ومتغيرات البيئة، والـ [[secrets]] (ARN من Parameter Store أو Secrets Manager)، واللوجات (الـ driver [[awslogs]] بيودّيها CloudWatch).

فيه دورين لازم تفرق بينهم: الـ execution role بيستخدمه ECS نفسه عشان يسحب الـ image ويقرا الأسرار ويكتب اللوجات. والـ task role بيستخدمه الكود بتاعك جوه الـ container (يرفع على S3 مثلًا). الخلط بينهم أشهر سبب لـ AccessDenied.

الـ service بتقول «عايز N نسخ من الـ task دي ورا load balancer». لو نسخة فشلت في الـ health check بتتقتل ويتعمل غيرها. والـ deploy: revision جديدة من الـ task definition، والـ service بتقوّم النسخ الجديدة وتستنى الـ health check قبل ما تقفل القديمة (rolling). ولو الجديدة فضلت تفشل، الـ circuit breaker بيرجّع للقديمة.

في Fargate كل task ليها network interface و IP في الـ subnet و security group، وبتدفع على الـ vCPU والرام بالثانية. Express Mode بيعمل كل ده من أمر واحد، وتقدر بعدين تعدّل أي جزء كـ ECS عادي.

VPS بـ Docker Compose أرخص بكتير لمشروع صغير. Fargate بيكسب لما تحتاج أكتر من نسخة، و autoscaling، ونشر من غير توقف، ومن غير ما تحدّث سيرفرات.`,
            when: "API أو worker في container ومحتاج أكتر من نسخة أو autoscaling، والفريق مش عايز يدير سيرفرات ولا Kubernetes.",
            mistakes: "الخلط بين execution role و task role. وتسيب الـ health check على [[/]] وهو بيرجّع redirect أو 404 فالـ tasks تفضل تتقتل. وتشغّل الـ tasks في private subnet من غير NAT ولا VPC endpoints فمش قادرة تسحب الـ image. والتطبيق بيسمع على [[localhost]] جوه الـ container بدل [[0.0.0.0]] (تاب Docker)."
          },
          lines: [
            "اعمل service بأمر واحد (الأمر مكمّل في السطور اللي تحته).",
            "اسم الـ service.",
            "الـ role اللي ECS بيسحب بيه الـ image ويكتب اللوجات.",
            "الـ role اللي بيعمل بيه الـ load balancer والشبكة و autoscaling في حسابك.",
            "الـ image من ECR والبورت اللي التطبيق بيسمع عليه.",
            "المسار اللي الـ load balancer بيسأله: التطبيق عايش؟",
            "من نسخة لـ ٤ حسب الضغط.",
            "اعرض الـ clusters في الـ region."
          ],
          sol: R`الأمر بيرجّع [[service]] فيه [[serviceArn]] و [[status]]، والـ URL في [[activeConfigurations[0].ingressPaths[0].endpoint]] (نفس اللي بيظهر في الكونسول). أول ما الـ deployment يخلص (دقايق)، [[curl https://ENDPOINT/health]] يرجّع 200 من الـ container بتاعك. و [[list-clusters]] هيوري [[arn:aws:ecs:eu-central-1:123456789012:cluster/default]] لأن الـ express mode بيستخدم الـ cluster الافتراضي لو محددتش.

في الكونسول هتلاقي الحاجات اللي اتعملت لوحدها: task definition، و service، و Application Load Balancer بـ listener على HTTPS، و target group بالـ health check على [[/health]]، و security groups (واحدة للـ ALB وواحدة للـ tasks بتقبل من الـ ALB بس)، و autoscaling بين 1 و 4 tasks، و log group في CloudWatch. ده بالظبط الشغل اللي كان محتاج عشرات الأوامر.

أخطاء شائعة: الـ tasks تفضل تقوم وتقع، وفي Events [[CannotPullContainerError]] (الـ execution role ناقصها صلاحيات ECR، أو الـ image مبنية لـ arm64 والـ task على x86)، أو [[failed ELB health checks]] (الـ app مش بترد 200 على [[/health]]، أو بتسمع على [[localhost]] بدل [[0.0.0.0]]، أو البورت مش 3000). والمسح مهم: الـ ALB لوحده بيتحاسب بالساعة، فامسح بـ [[delete-express-gateway-service]] واتأكد إن الـ ALB اختفى.`,
          solCode: R`aws ecs describe-express-gateway-service --service-arn arn:aws:ecs:eu-central-1:123456789012:service/default/myapp-api --query "service.activeConfigurations[0].ingressPaths[0].endpoint" --output text
aws ecs delete-express-gateway-service --service-arn arn:aws:ecs:eu-central-1:123456789012:service/default/myapp-api
aws elbv2 describe-load-balancers --query "LoadBalancers[].[LoadBalancerName,State.Code]" --output table`
        }
      ]
    },
    {
      t: "Kubernetes: الأساسيات",
      l: 3,
      n: "بتوصف الحالة اللي عايزها في YAML، و k8s يفضل يصلّح لحد ما الواقع يطابقها",
      items: [
        {
          cmd: "kubectl",
          title: "k8s بيحل إيه، وإمتى متستخدموش",
          desc: R`Kubernetes بيشغّل containers على مجموعة سيرفرات (nodes) ويخلّيها زي ما وصفتها: عدد النسخ، وإعادة التشغيل لو وقعت، والتوزيع، والشبكة بينهم، والـ deploy التدريجي، وانت بتكلّمه بـ [[kubectl]].

بس هو تقيل: شبكات، و ingress، وشهادات، و RBAC، وتحديثات للـ cluster نفسه. لمشروع بـ ٢ أو ٣ خدمات وفريق صغير، Docker Compose على VPS أو ECS أسهل بكتير. k8s بيكسب لما يبقى عندك خدمات كتير وفريق يقدر يديره.`,
          example: R`kind create cluster --name dev
kubectl get nodes
kubectl get pods -A
kubectl describe pod api-7d9f8c6b5-x2x4q
kubectl logs -f deploy/api
kubectl exec -it deploy/api -- sh
kubectl rollout undo deployment/api`,
          try: "سطّب kind (Kubernetes جوه Docker) واعمل cluster. شغّل [[kubectl create deployment web --image=nginx:alpine --replicas=3]]، وامسح pod بـ [[kubectl delete pod]] وشوف k8s بيعمل غيره في ثانية بـ [[kubectl get pods -w]].",
          deep: {
            why: "لما يبقى عندك ٣٠ خدمة على ٢٠ سيرفر، مينفعش حد يدخل SSH ويقرر مين يشتغل فين. k8s بيعمل ده لوحده، وبيدّي كل الفرق نفس الطريقة للـ deploy والإعدادات والمراقبة. وعشان كده بيتسأل عنه كتير في الانترفيوهات.",
            how: R`الفكرة الأساسية: desired state. انت بتقول «عايز ٣ نسخ من api بالـ image دي» (YAML)، والـ control plane بيخزّنها، و controllers بتلف طول الوقت: «شغال كام؟ ٢؟ اعمل واحدة». ده اللي بيخلّي الـ pod اللي اتمسح يرجع.

الـ pod أصغر وحدة: container واحد أو أكتر بيشاركوا الشبكة. وهو مؤقت: بيموت ويتعمل غيره باسم و IP جديد. عشان كده مبتتعاملش مع pods مباشرة.

الـ Deployment بيدير مجموعة pods متشابهة ويعمل rolling update: يقوّم الجديد ويستنى الـ readiness وبعدين يقفل القديم. و [[rollout undo]] بيرجّع الـ revision اللي قبلها.

[[describe]] أهم أمر في التشخيص. فوق هتلاقي حالة كل container: [[State: Waiting]] بـ [[Reason: ImagePullBackOff]] (مش قادر يسحب الـ image) أو [[CrashLoopBackOff]] (بيقوم ويقع)، أو [[Last State: Terminated]] بـ [[Reason: OOMKilled]] (عدّى حد الرام). وفي آخر الـ output الـ Events بتقولك اللي حصل: [[FailedScheduling]] والـ pod فاضل [[Pending]] (مفيش node فيها مكان)، أو [[Failed]] و [[BackOff]] (فشل سحب الـ image، أو «Back-off restarting failed container»).

محليًا: kind أو minikube أو k3d أو Kubernetes جوه Docker Desktop. وفي الـ cloud: EKS على AWS (بتدفع على الـ control plane بالساعة غير الـ nodes)، أو GKE، أو k3s على VPS لو عايز تتعلم.`,
            when: "فرق كبيرة، وخدمات كتير، ومحتاجين نفس المنصة على أكتر من cloud. متستخدموش لمشروع لوحدك عشان الـ CV: الوقت اللي هتصرفه على الـ cluster وقت مش في المنتج.",
            mistakes: "تتعامل مع pod باسمه في سكربتات وهو بيتغير. وتعدّل حاجة بـ [[kubectl edit]] على الإنتاج ومتكتبهاش في الـ YAML، فأول [[apply]] يرجّعها. وتفتكر إن k8s بيحل مشاكل التطبيق نفسه: تطبيق بيقع كل شوية هيفضل يقع، بس بسرعة (CrashLoopBackOff)."
          },
          lines: [
            "اعمل cluster محلي جوه Docker للتجربة.",
            "السيرفرات (nodes) في الـ cluster.",
            "كل الـ pods في كل الـ namespaces.",
            "تفاصيل pod والـ Events في الآخر: أول مكان تشخّص فيه.",
            "تابع لوجات الـ deployment اللي اسمه api.",
            "ادخل ترمنال جوه واحد من الـ pods.",
            "ارجع للنسخة اللي قبل كده."
          ],
          sol: R`[[kind create cluster]] بيطبع خطوات بعلامات صح وفي الآخر [[Set kubectl context to "kind-dev"]]. و [[kubectl get nodes]] يطبع [[dev-control-plane Ready control-plane]]. بعد [[create deployment]]، [[kubectl get pods]] يوري ٣ pods أساميهم زي [[web-7c5b8d9f6-abcde]] وحالتهم [[Running]].

في [[get pods -w]] بعد ما تمسح pod هتشوف في ثانية أو اتنين: الـ pod القديم [[Terminating]]، وواحد جديد باسم مختلف [[Pending]] ثم [[ContainerCreating]] ثم [[Running]]. العدد بيرجع ٣ لوحده لأن الـ ReplicaSet شايف «المطلوب ٣، والموجود ٢»، مش لأن حد عمل restart للـ pod القديم؛ ده pod جديد خالص باسم و IP جداد.

أخطاء شائعة: [[kind: command not found]] أو [[Cannot connect to the Docker daemon]] (kind محتاج Docker شغال). و [[ImagePullBackOff]] لو كتبت اسم image غلط. ولو [[kubectl]] بيكلّم cluster تاني (مثلًا شغل)، شوف [[kubectl config current-context]] قبل ما تمسح أي حاجة. (ملحوظة: في بيئة التجهيز هنا kind نفسه مقدرش يقوم جوه container، فالناتج ده من الشكل المعروف لـ kind، مش من تشغيل هنا.)`,
          solCode: R`kind create cluster --name dev
kubectl create deployment web --image=nginx:alpine --replicas=3
kubectl get pods -o wide
kubectl delete pod $(kubectl get pods -l app=web -o name | head -1 | cut -d/ -f2)
kubectl get pods -w
kind delete cluster --name dev`
        },
        {
          cmd: "Deployment YAML",
          title: "اوصف: عايز ٣ نسخ من الـ API، و k8s يتصرف",
          desc: R`الـ Deployment بيقول «اعمل ٣ pods من الـ image دي وعلّمهم بـ label [[app: api]]»، والـ Service بيدّي اسم ثابت داخل الـ cluster ويوزّع الطلبات على أي pod عليه نفس الـ label وجاهز.

و [[kubectl apply -f]] بيبعت الوصف، و k8s يعمل الفرق بين اللي موجود واللي انت عايزه.`,
          example: R`apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
        - name: api
          image: ghcr.io/myorg/myapp-api:1.4.0
          envFrom: [{ configMapRef: { name: api-config } }, { secretRef: { name: api-secrets } }]
          readinessProbe: { httpGet: { path: /health, port: 3000 } }
          resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }`,
          try: R`اعمل الـ ConfigMap والـ Secret الأول (الدرس الجاي) أو شيل سطر envFrom. احفظه في [[k8s/api.yaml]] (غيّر الـ image لـ [[nginx:alpine]]، والبورت لـ 80، ومسار الـ readinessProbe لـ [[/]] للتجربة، لأن nginx مفيهوش [[/health]]) و [[kubectl apply -f k8s/]]. اعمل Service بـ [[kubectl expose deployment api --port 80 --target-port 80]] وجرّبه بـ [[kubectl port-forward svc/api 8080:80]] وافتح localhost:8080.`,
          flag: "script",
          deep: {
            why: "بدل ما توصف «خطوات» (شغّل، استنى، شغّل التاني)، بتوصف «النتيجة». ده بيخلّي الـ deploy والـ rollback وإعادة بناء الـ cluster كله مجرد [[apply]] لنفس الملفات من Git.",
            how: R`[[selector]] لازم يطابق الـ [[labels]] اللي في الـ template: ده اللي بيربط الـ Deployment بالـ pods بتوعه. ونفس الـ labels هي اللي الـ Service بيدوّر بيها.

[[readinessProbe]]: k8s ميبعتش ترافيك لـ pod إلا لما [[/health]] يرد 200، وده اللي بيخلّي الـ rolling update من غير توقف. وفيه [[livenessProbe]]: لو فشل، k8s يعيد تشغيل الـ container. خليه بسيط ومتربطهوش بقاعدة البيانات، وإلا لو القاعدة وقعت كل الـ pods هتفضل تتعاد.

[[resources.requests]]: اللي الـ scheduler بيحجزه على الـ node ([[100m]] = عُشر CPU). و [[limits.memory]]: لو الـ container عدّاه يتقتل OOMKilled. ومن غير requests الـ scheduler بيرص pods أكتر من اللي السيرفر يستحمله.

الـ Service: [[kind: Service]] و [[selector: { app: api }]] و [[ports: [{ port: 80, targetPort: 3000 }] ]]. بيدّي اسم DNS داخلي [[api.default.svc.cluster.local]] (أو [[api]] من نفس الـ namespace)، ويوزّع على الـ pods الجاهزة بس. النوع الافتراضي ClusterIP (من جوه بس)، و LoadBalancer بيطلب load balancer حقيقي من الـ cloud (بفلوس).

وللنت: Ingress (قواعد host و path لـ Services، ومحتاج ingress controller). بس ingress-nginx المشهور اتوقف تطويره في مارس ٢٠٢٦، والاتجاه دلوقتي Gateway API ([[Gateway]] و [[HTTPRoute]]) كبديل رسمي.`,
            when: "أي تطبيق stateless على k8s. قواعد البيانات على k8s موضوع أصعب بكتير (StatefulSets)، وغالبًا الأحسن قاعدة مُدارة برا الـ cluster.",
            mistakes: "selector مش مطابق للـ labels فالـ Service مش لاقي pods. ومفيش readinessProbe فالترافيك بيروح لـ pod لسه بيقوم ويطلع 502 مع كل deploy. و liveness بتسأل قاعدة البيانات. ومن غير resources، pod واحد ياكل رام الـ node كله ويوقّع الباقي."
          },
          lines: [
            "نسخة الـ API اللي فيها Deployment.",
            "النوع: Deployment.",
            "اسمه api.",
            "المواصفات.",
            "عايز ٣ نسخ شغالين دايمًا.",
            "الـ pods بتوعي هما اللي عليهم app: api.",
            "قالب كل pod.",
            "كل pod بيتعلّم app: api.",
            "مواصفات الـ pod.",
            "الـ containers.",
            "container اسمه api.",
            "الـ image بنسخة محددة (مش latest).",
            "متغيرات البيئة من ConfigMap و Secret (الدرس الجاي).",
            "متبعتش ترافيك غير لما /health يرد.",
            "احجز عُشر CPU و ١٢٨ ميجا، واقتله لو عدّى ٢٥٦ ميجا."
          ],
          sol: R`الملف بعد التعديلات تحت (من غير envFrom). [[kubectl apply -f k8s/]] يطبع [[deployment.apps/api created]]، و [[kubectl get deploy api]] يوري [[READY 3/3]] بعد ما الـ readinessProbe تعدّي. [[expose]] يطبع [[service/api exposed]]، و [[port-forward]] يطبع [[Forwarding from 127.0.0.1:8080 -> 80]]، و [[http://localhost:8080]] يفتح صفحة [[Welcome to nginx!]].

جرّب كمان تغيّر [[replicas]] لـ 5 وتعمل apply تاني: هيطبع [[deployment.apps/api configured]] ويقوم ٢ زيادة، لأن الـ YAML «حالة مطلوبة» مش أمر.

أخطاء شائعة: [[READY 0/3]] والـ pods [[Running]] بس مش Ready، وده لأن الـ readinessProbe لسه على [[/health]] أو بورت 3000 فـ nginx بيرجّع 404 أو مفيش حد بيسمع. و [[CreateContainerConfigError]] يعني سبت [[envFrom]] والـ ConfigMap أو الـ Secret مش موجودين. و [[selector does not match template labels]] لو غيّرت الـ label في مكان واحد بس. الملف ده عدّى من [[kubeconform -strict]].`,
          solCode: R`apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
        - name: api
          image: nginx:alpine
          ports: [{ containerPort: 80 }]
          readinessProbe: { httpGet: { path: /, port: 80 } }
          resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }`
        },
        {
          cmd: "ConfigMap و Secret",
          title: "الإعدادات والأسرار في k8s",
          desc: R`ConfigMap للإعدادات العادية (NODE_ENV و LOG_LEVEL) و Secret للأسرار (DATABASE_URL و API keys)، والاتنين بيتحطوا في الـ pod كمتغيرات بيئة ([[envFrom]]) أو كملفات.

خد بالك: الـ Secret في k8s مش متشفّر، هو base64 بس، وأي حد عنده صلاحية يقرا الـ Secrets يفكّه في ثانية. والـ pods مبتاخدش القيم الجديدة لوحدها: لازم restart.`,
          example: R`kubectl create configmap api-config --from-literal=NODE_ENV=production --from-literal=LOG_LEVEL=info
kubectl create secret generic api-secrets --from-env-file=.env.production
kubectl get secret api-secrets -o jsonpath='{.data.DATABASE_URL}' | base64 -d
kubectl create secret generic api-secrets --from-env-file=.env.production --dry-run=client -o yaml | kubectl apply -f -
kubectl rollout restart deployment/api
kubectl rollout status deployment/api`,
          try: "اعمل الـ ConfigMap والـ Secret، وطبّق Deployment الدرس اللي فات، وادخل pod واكتب [[env | grep LOG_LEVEL]]. غيّر LOG_LEVEL في الـ ConfigMap وادخل تاني: لسه القديم. اعمل rollout restart وشوف.",
          deep: {
            why: "الـ image لازم تبقى واحدة لكل البيئات (dev و staging و prod)، والفرق في الإعدادات بس. ومينفعش الأسرار تبقى جوه الـ image أو في YAML على Git.",
            how: R`[[--from-literal]] قيمة قيمة، و [[--from-env-file]] بياخد ملف [[KEY=VALUE]] كله. و [[envFrom]] في الـ Deployment بيحوّل كل مفتاح لمتغير بيئة.

الـ Secret متخزّن في etcd (قاعدة بيانات الـ cluster) كـ base64، و base64 تحويل مش تشفير: [[base64 -d]] بيرجّعه. عشان كده: فعّل encryption at rest في الـ cluster (EKS بيدعمه بـ KMS)، واقفل صلاحية قراية الـ secrets بـ RBAC، ومترفعش YAML فيه Secrets على Git. والبدائل: External Secrets Operator بيسحب من AWS Secrets Manager أو Parameter Store، أو Sealed Secrets بيخلّيك تحط نسخة متشفّرة في Git.

المتغيرات بتتقرا وقت ما الـ container يقوم بس. تعديل الـ ConfigMap مش بيوصل للـ pods الشغالة كمتغيرات (لو متركّب كملف بيتحدّث بعد شوية، بس التطبيق لازم يعيد قراية الملف). عشان كده [[rollout restart]] بيعمل rolling update بنفس الـ image.

[[create]] بيفشل لو الحاجة موجودة. و [[--dry-run=client -o yaml | kubectl apply -f -]] بيولّد الـ YAML ويطبّقه، فينفع يتكرر في سكربت (يعمل أو يعدّل).`,
            when: "أي إعداد بيختلف بين البيئات. والأسرار الحقيقية في الإنتاج الأحسن تيجي من Secrets Manager عن طريق operator.",
            mistakes: "تفتكر إن Secret متشفّر فتحط الـ YAML بتاعه على GitHub. وتعدّل ConfigMap وتستنى التطبيق يتغير. وتطبع الـ env كله في لوج بداية التطبيق فالأسرار تبقى في نظام اللوجات. وملف [[.env.production]] نفسه فاضل على جهاز حد أو في Git."
          },
          lines: [
            "إعدادات عادية بقيم مباشرة.",
            "الأسرار من ملف env.",
            "دليل إن الـ Secret مش متشفّر: base64 بيرجّع القيمة.",
            "حدّث الـ Secret لو موجود (بدل ما create يفشل).",
            "أعد تشغيل الـ pods تدريجي عشان ياخدوا القيم الجديدة.",
            "استنى لحد ما الـ rollout يخلص وشوف نجح ولا لأ."
          ],
          sol: R`أول مرة: [[kubectl exec deploy/api -- env | grep LOG_LEVEL]] يطبع [[LOG_LEVEL=info]]. بعد ما تغيّر الـ ConfigMap لـ [[debug]] (بالأمر اللي تحت)، نفس الأمر لسه يطبع [[LOG_LEVEL=info]]: متغيرات البيئة بتتقري مرة واحدة وقت ما الـ container يبدأ، والـ pod الشغال مش هيعرف إن الـ ConfigMap اتغير. بعد [[rollout restart]]، [[rollout status]] يطبع [[deployment "api" successfully rolled out]]، والـ pods الجديدة تطبع [[LOG_LEVEL=debug]].

و [[get secret ... | base64 -d]] بيطبع الـ DATABASE_URL نفسه، يعني الـ Secret مش مشفّر، ده base64 بس: أي حد عنده صلاحية [[get secrets]] يقراه. ده الفرق اللي بيتسأل عليه في الانترفيو.

أخطاء شائعة: تعمل [[kubectl create configmap]] تاني عشان تغيّر القيمة فتاخد [[AlreadyExists]]؛ الطريقة هي [[--dry-run=client -o yaml | kubectl apply -f -]]. و [[.env.production]] فيه سطر بعلامات تنصيص، فالقيمة تتخزن بالتنصيص نفسه. ولو [[env]] مطبعش المتغير خالص، الـ Deployment مفيهوش [[envFrom]] أو اسم الـ ConfigMap فيه مختلف.`,
          solCode: R`kubectl create configmap api-config --from-literal=NODE_ENV=production --from-literal=LOG_LEVEL=debug --dry-run=client -o yaml | kubectl apply -f -
kubectl exec deploy/api -- env | grep LOG_LEVEL
kubectl rollout restart deployment/api
kubectl rollout status deployment/api
kubectl exec deploy/api -- env | grep LOG_LEVEL`
        }
      ]
    }
]);
